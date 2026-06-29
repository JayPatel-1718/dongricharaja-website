/**
 * storageService.js
 * Uploads a PDF buffer to Firebase Storage via the REST API.
 * Falls back to saving the file locally under server/public/receipts/ if the upload fails.
 *
 * Returns a public URL to the stored PDF.
 */
const fs   = require('fs');
const path = require('path');

const FIREBASE_BUCKET  = 'dongri-cha-raja.appspot.com';
const FIREBASE_API_KEY = 'AIzaSyBlzNwhMzQY-Wm29HR_tje-PbuwcyYsYXQ';

// Ensure the local fallback directory exists
const LOCAL_DIR = path.join(__dirname, '..', 'public', 'receipts');
if (!fs.existsSync(LOCAL_DIR)) {
  fs.mkdirSync(LOCAL_DIR, { recursive: true });
}

/**
 * Upload pdfBuffer to Firebase Storage.
 * @param {Buffer}  pdfBuffer   - Raw PDF bytes
 * @param {string}  receiptNo   - e.g. DCR-2026-000001
 * @param {string}  serverBaseUrl - e.g. http://localhost:5000  (used only for fallback URLs)
 * @returns {Promise<{ url: string, storage: 'firebase'|'local' }>}
 */
async function uploadReceiptPDF(pdfBuffer, receiptNo, serverBaseUrl) {
  const filename   = `${receiptNo}.pdf`;
  const objectPath = `receipts/${filename}`;
  const encodedPath = encodeURIComponent(objectPath);

  const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_BUCKET}/o?name=${encodedPath}&key=${FIREBASE_API_KEY}`;

  try {
    const response = await fetch(uploadUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/pdf' },
      body:    pdfBuffer,
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Firebase Storage upload failed (${response.status}): ${errText}`);
    }

    const meta          = await response.json();
    const downloadToken = meta.downloadTokens;

    // Public download URL (works without firebase-admin)
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_BUCKET}/o/${encodedPath}?alt=media&token=${downloadToken}`;

    console.log(`[Storage] Receipt uploaded to Firebase Storage: ${publicUrl}`);
    return { url: publicUrl, storage: 'firebase' };

  } catch (err) {
    // ── FALLBACK: save locally and serve via Express static ──────────
    console.warn('[Storage] Firebase upload failed, saving locally:', err.message);

    const localPath = path.join(LOCAL_DIR, filename);
    fs.writeFileSync(localPath, pdfBuffer);

    const localUrl = `${serverBaseUrl}/receipts/${filename}`;
    console.log(`[Storage] Receipt saved locally at: ${localUrl}`);
    return { url: localUrl, storage: 'local' };
  }
}

module.exports = { uploadReceiptPDF };
