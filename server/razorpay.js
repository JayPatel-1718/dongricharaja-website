/**
 * razorpay.js  –  Express router
 *
 * Endpoints:
 *   POST /api/create-razorpay-order   – create a Razorpay order
 *   POST /api/verify-payment          – verify signature, generate PDF, upload, send SMS
 *   POST /api/resend-sms              – admin: resend SMS receipt for a tx
 *   POST /api/regenerate-receipt      – admin: regenerate + re-upload PDF for a tx
 *   GET  /api/receipt/:receiptId      – public: fetch receipt data by receipt number
 */

const express        = require('express');
const Razorpay       = require('razorpay');
const crypto         = require('crypto');
const smsService     = require('./services/smsService');
const { generateReceiptPDF } = require('./services/pdfService');
const { uploadReceiptPDF }   = require('./services/storageService');
const router = express.Router();

// ── Constants ─────────────────────────────────────────────────────────────────
const FIRESTORE_API_KEY    = 'AIzaSyBlzNwhMzQY-Wm29HR_tje-PbuwcyYsYXQ';
const FIRESTORE_PROJECT_ID = 'dongri-cha-raja';
const FIRESTORE_BASE       = `https://firestore.googleapis.com/v1/projects/${FIRESTORE_PROJECT_ID}/databases/(default)/documents`;

// ── Razorpay client ───────────────────────────────────────────────────────────
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error('FATAL: RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set in server/.env');
  process.exit(1);
}

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Convert a Firestore REST document to a plain JS object. */
function parseFirestoreDoc(doc) {
  if (!doc || !doc.fields) return null;
  const result = { id: doc.name.split('/').pop() };
  for (const [key, val] of Object.entries(doc.fields)) {
    if (val.stringValue  !== undefined) result[key] = val.stringValue;
    else if (val.integerValue !== undefined) result[key] = parseInt(val.integerValue, 10);
    else if (val.doubleValue  !== undefined) result[key] = parseFloat(val.doubleValue);
    else if (val.booleanValue !== undefined) result[key] = val.booleanValue;
  }
  return result;
}

/** Read a single Firestore document by path. Returns null if not found. */
async function firestoreGet(collection, docId) {
  const url = `${FIRESTORE_BASE}/${collection}/${docId}?key=${FIRESTORE_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return parseFirestoreDoc(await res.json());
}

/** Write (create) a Firestore document with a custom documentId. */
async function firestoreCreate(collection, docId, fields) {
  const url = `${FIRESTORE_BASE}/${collection}?documentId=${docId}&key=${FIRESTORE_API_KEY}`;
  const res = await fetch(url, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ fields }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Firestore create failed: ${err}`);
  }
  return parseFirestoreDoc(await res.json());
}

/** Patch specific fields on an existing Firestore document. */
async function firestorePatch(collection, docId, fields) {
  const fieldPaths = Object.keys(fields).map(k => `updateMask.fieldPaths=${k}`).join('&');
  const url = `${FIRESTORE_BASE}/${collection}/${docId}?${fieldPaths}&key=${FIRESTORE_API_KEY}`;
  const res = await fetch(url, {
    method:  'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ fields }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Firestore patch failed: ${err}`);
  }
  return parseFirestoreDoc(await res.json());
}

/** Count documents in a Firestore collection and return the next receipt number. */
async function nextReceiptNumber() {
  const url = `${FIRESTORE_BASE}/donations?key=${FIRESTORE_API_KEY}&pageSize=5000&mask.fieldPaths=receiptNo`;
  const res  = await fetch(url);
  let count  = 0;
  if (res.ok) {
    const data = await res.json();
    count = (data.documents && Array.isArray(data.documents)) ? data.documents.length : 0;
  }
  return `DCR-2026-${String(count + 1).padStart(6, '0')}`;
}

/** Derive the server base URL from the request. */
function serverBaseUrl(req) {
  return process.env.SERVER_BASE_URL ||
    `${req.protocol}://${req.get('host')}`;
}

/** Derive the frontend base URL (for the receipt page link). */
function frontendBaseUrl() {
  return process.env.FRONTEND_BASE_URL || 'http://localhost:3000';
}

// ── Routes ────────────────────────────────────────────────────────────────────

/** POST /api/create-razorpay-order */
router.post('/create-razorpay-order', async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || isNaN(amount) || amount <= 0)
      return res.status(400).json({ error: 'A valid amount is required' });

    const order = await razorpay.orders.create({
      amount:  Math.round(amount * 100),
      currency: 'INR',
      receipt:  `rcpt_${Date.now()}`,
    });

    res.json({
      orderId:  order.id,
      amount:   order.amount,
      currency: order.currency,
      keyId:    process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error('[Order] create error:', err);
    res.status(500).json({ error: err.message });
  }
});

/** POST /api/verify-payment
 *  Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature,
 *          donorName, donorPhone, donorEmail, amountPaid }
 */
router.post('/verify-payment', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donorName,
      donorPhone,
      donorEmail,
      amountPaid,
    } = req.body;

    // ── 1. Basic validation ───────────────────────────────────────────
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature)
      return res.status(400).json({ error: 'Missing payment credentials' });
    if (!donorName || !donorPhone || !amountPaid)
      return res.status(400).json({ error: 'Missing donor information' });

    // ── 2. Verify Razorpay signature ──────────────────────────────────
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expected !== razorpay_signature)
      return res.status(400).json({ error: 'Invalid payment signature. Verification failed.' });

    // ── 3. Idempotency – return existing record for duplicate calls ───
    const existing = await firestoreGet('donations', razorpay_payment_id);
    if (existing) {
      console.log(`[Verify] Duplicate call for ${razorpay_payment_id}. Returning existing record.`);
      return res.json({ status: 'ok', message: 'Already verified', donation: existing });
    }

    // ── 4. Generate receipt number ────────────────────────────────────
    const receiptNo   = await nextReceiptNumber();
    const dateStr     = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const recordedAt  = new Date().toISOString();

    const donationBase = {
      receiptNo,
      donorName,
      donorPhone,
      donorEmail:  donorEmail || '',
      amountPaid:  parseFloat(amountPaid),
      txId:        razorpay_payment_id,
      orderId:     razorpay_order_id,
      date:        dateStr,
      recordedAt,
      status:      'PAID',
    };

    // ── 5. Generate PDF receipt ───────────────────────────────────────
    let receiptUrl    = '';
    let receiptStorage = 'none';
    let pdfError      = '';

    try {
      const pdfBuffer = await generateReceiptPDF(donationBase);

      // ── 6. Upload to Firebase Storage (with local fallback) ──────────
      const uploadResult = await uploadReceiptPDF(pdfBuffer, receiptNo, serverBaseUrl(req));
      receiptUrl    = uploadResult.url;
      receiptStorage = uploadResult.storage;
    } catch (pdfErr) {
      pdfError = pdfErr.message;
      console.error('[Verify] PDF/upload error:', pdfErr.message);
      // We do NOT abort – payment must be recorded regardless
    }

    // ── 7. Build the shareable receipt page URL ───────────────────────
    // The frontend page /receipt/:receiptId will use the receiptNo
    const receiptPageUrl = `${frontendBaseUrl()}/receipt/${receiptNo}`;

    // ── 8. Send SMS with receipt page link ────────────────────────────
    let smsStatus = 'Failed';
    let smsError  = '';
    try {
      const smsResult = await smsService.sendDonationReceipt({
        donorPhone,
        donorName,
        receiptNo,
        amountPaid,
        receiptUrl: receiptPageUrl,   // link to the receipt page
      });
      smsStatus = smsResult.success ? 'Sent' : 'Failed';
      if (!smsResult.success) smsError = smsResult.error || 'Unknown SMS error';
    } catch (smsErr) {
      smsError = smsErr.message;
      console.error('[Verify] SMS error:', smsErr.message);
    }

    // ── 9. Save full donation document to Firestore ───────────────────
    const fields = {
      receiptNo:      { stringValue: receiptNo },
      donorName:      { stringValue: donorName },
      donorPhone:     { stringValue: donorPhone },
      donorEmail:     { stringValue: donorEmail || '' },
      amountPaid:     { doubleValue: parseFloat(amountPaid) },
      txId:           { stringValue: razorpay_payment_id },
      orderId:        { stringValue: razorpay_order_id },
      date:           { stringValue: dateStr },
      recordedAt:     { stringValue: recordedAt },
      status:         { stringValue: 'PAID' },
      receiptUrl:     { stringValue: receiptUrl },
      receiptStorage: { stringValue: receiptStorage },
      pdfError:       { stringValue: pdfError },
      smsStatus:      { stringValue: smsStatus },
      smsError:       { stringValue: smsError },
    };

    const savedDoc = await firestoreCreate('donations', razorpay_payment_id, fields);

    res.json({
      status:   'ok',
      message:  'Payment verified, receipt generated, SMS sent.',
      donation: savedDoc,
    });

  } catch (err) {
    console.error('[Verify] Fatal error:', err);
    res.status(500).json({ error: err.message });
  }
});

/** GET /api/receipt/:receiptId  – fetch a donation by receipt number (public) */
router.get('/receipt/:receiptId', async (req, res) => {
  try {
    const { receiptId } = req.params;

    // Query Firestore by receiptNo using runQuery
    const queryUrl = `${FIRESTORE_BASE}:runQuery?key=${FIRESTORE_API_KEY}`;
    const queryBody = {
      structuredQuery: {
        from:  [{ collectionId: 'donations' }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'receiptNo' },
            op:    'EQUAL',
            value: { stringValue: receiptId },
          },
        },
        limit: 1,
      },
    };

    const queryRes = await fetch(queryUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(queryBody),
    });

    const results = await queryRes.json();
    const found   = results.find(r => r.document);
    if (!found) return res.status(404).json({ error: 'Receipt not found' });

    res.json({ status: 'ok', donation: parseFirestoreDoc(found.document) });
  } catch (err) {
    console.error('[Receipt] fetch error:', err);
    res.status(500).json({ error: err.message });
  }
});

/** POST /api/resend-sms  – admin: resend SMS for an existing tx */
router.post('/resend-sms', async (req, res) => {
  try {
    const { txId } = req.body;
    if (!txId) return res.status(400).json({ error: 'txId is required' });

    const donation = await firestoreGet('donations', txId);
    if (!donation) return res.status(404).json({ error: 'Donation not found' });

    const receiptPageUrl = `${frontendBaseUrl()}/receipt/${donation.receiptNo}`;

    const smsResult = await smsService.sendDonationReceipt({
      donorPhone: donation.donorPhone,
      donorName:  donation.donorName,
      receiptNo:  donation.receiptNo,
      amountPaid: donation.amountPaid,
      receiptUrl: receiptPageUrl,
    });

    const smsStatus = smsResult.success ? 'Sent' : 'Failed';
    const smsError  = smsResult.success ? '' : (smsResult.error || 'Unknown error');

    await firestorePatch('donations', txId, {
      smsStatus: { stringValue: smsStatus },
      smsError:  { stringValue: smsError },
    });

    res.json({ status: 'ok', smsStatus, smsError });
  } catch (err) {
    console.error('[Resend SMS] error:', err);
    res.status(500).json({ error: err.message });
  }
});

/** POST /api/regenerate-receipt  – admin: regenerate PDF + re-upload for a tx */
router.post('/regenerate-receipt', async (req, res) => {
  try {
    const { txId } = req.body;
    if (!txId) return res.status(400).json({ error: 'txId is required' });

    const donation = await firestoreGet('donations', txId);
    if (!donation) return res.status(404).json({ error: 'Donation not found' });

    const pdfBuffer    = await generateReceiptPDF(donation);
    const uploadResult = await uploadReceiptPDF(pdfBuffer, donation.receiptNo, serverBaseUrl(req));

    await firestorePatch('donations', txId, {
      receiptUrl:     { stringValue: uploadResult.url },
      receiptStorage: { stringValue: uploadResult.storage },
      pdfError:       { stringValue: '' },
    });

    res.json({
      status:     'ok',
      receiptUrl: uploadResult.url,
      storage:    uploadResult.storage,
    });
  } catch (err) {
    console.error('[Regenerate Receipt] error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
