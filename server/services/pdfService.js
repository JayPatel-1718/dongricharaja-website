/**
 * pdfService.js
 * Generates a professional, branded donation receipt PDF using PDFKit.
 * Returns a Buffer that can be saved to disk or uploaded to Firebase Storage.
 */
const PDFDocument = require('pdfkit');

/**
 * @param {Object} donation
 * @param {string} donation.receiptNo
 * @param {string} donation.donorName
 * @param {string} donation.donorPhone
 * @param {string} donation.donorEmail
 * @param {number} donation.amountPaid
 * @param {string} donation.txId       - Razorpay Payment ID
 * @param {string} donation.orderId    - Razorpay Order ID
 * @param {string} donation.date
 * @param {string} donation.recordedAt
 * @returns {Promise<Buffer>}
 */
function generateReceiptPDF(donation) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50,
        info: {
          Title: `Donation Receipt – ${donation.receiptNo}`,
          Author: 'Dongri Cha Raja Sarvajani Ganesh Utsav Mandal',
          Subject: 'Official Donation Receipt',
        }
      });

      const chunks = [];
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // ─── COLOUR PALETTE ───────────────────────────────────────────────
      const DARK_RED   = '#6b0000';
      const GOLD       = '#c8860a';
      const LIGHT_GOLD = '#f5e6c3';
      const GREY       = '#555555';
      const LIGHT_GREY = '#f7f7f7';

      // ─── TOP GOLD BAR ────────────────────────────────────────────────
      doc.rect(0, 0, doc.page.width, 8).fill(GOLD);

      // ─── HEADER ──────────────────────────────────────────────────────
      doc.moveDown(0.5);

      // Mandal name
      doc.fontSize(18)
         .fillColor(DARK_RED)
         .font('Helvetica-Bold')
         .text('DONGRI CHA RAJA', { align: 'center' });

      doc.fontSize(11)
         .fillColor(GOLD)
         .font('Helvetica-Bold')
         .text('SARVAJANI GANESH UTSAV MANDAL', { align: 'center' });

      doc.fontSize(8)
         .fillColor(GREY)
         .font('Helvetica')
         .text('Registered Charitable Trust · Reg No. E-12435 (Mumbai) · 80G Approved', { align: 'center' });

      doc.fontSize(8)
         .text('Dongri Main Street, Mumbai – 400009, Maharashtra, India', { align: 'center' });

      // Gold separator line
      doc.moveDown(0.6);
      doc.moveTo(50, doc.y).lineTo(doc.page.width - 50, doc.y).lineWidth(2).strokeColor(GOLD).stroke();

      // ─── RECEIPT TITLE BOX ───────────────────────────────────────────
      doc.moveDown(0.5);
      const titleBoxY = doc.y;
      doc.rect(50, titleBoxY, doc.page.width - 100, 26).fill(LIGHT_GOLD);
      doc.fontSize(11)
         .fillColor(DARK_RED)
         .font('Helvetica-Bold')
         .text('OFFICIAL DONATION RECEIPT  (Under Section 80G of Income Tax Act)', 50, titleBoxY + 7, {
           width: doc.page.width - 100, align: 'center'
         });
      doc.y = titleBoxY + 34;

      // ─── RECEIPT META ─────────────────────────────────────────────────
      doc.moveDown(0.6);
      const metaY = doc.y;
      const metaLeft  = 55;
      const metaRight = doc.page.width / 2 + 10;

      doc.fontSize(9).fillColor(GREY).font('Helvetica');

      doc.text('Receipt No:', metaLeft, metaY);
      doc.font('Helvetica-Bold').fillColor(DARK_RED).text(donation.receiptNo, metaLeft + 80, metaY);

      doc.font('Helvetica').fillColor(GREY).text('Date:', metaRight, metaY);
      doc.font('Helvetica-Bold').fillColor('#333').text(donation.date, metaRight + 40, metaY);

      doc.moveDown(0.4);
      const metaY2 = doc.y;
      doc.font('Helvetica').fillColor(GREY).text('Payment ID:', metaLeft, metaY2);
      doc.font('Helvetica').fillColor('#333').text(donation.txId, metaLeft + 80, metaY2, { width: 220 });

      doc.font('Helvetica').fillColor(GREY).text('Status:', metaRight, metaY2);
      doc.font('Helvetica-Bold').fillColor('#15803d').text('PAID ✓', metaRight + 40, metaY2);

      doc.moveDown(0.4);
      const metaY3 = doc.y;
      doc.font('Helvetica').fillColor(GREY).text('Order ID:', metaLeft, metaY3);
      doc.font('Helvetica').fillColor('#333').text(donation.orderId, metaLeft + 80, metaY3, { width: 220 });

      // Thin separator
      doc.moveDown(0.8);
      doc.moveTo(50, doc.y).lineTo(doc.page.width - 50, doc.y).lineWidth(0.5).strokeColor('#cccccc').stroke();

      // ─── DONOR DETAILS TABLE ─────────────────────────────────────────
      doc.moveDown(0.6);
      doc.fontSize(10).fillColor(DARK_RED).font('Helvetica-Bold').text('DONOR INFORMATION', 55);
      doc.moveDown(0.4);

      const rows = [
        ['Received with thanks from', donation.donorName],
        ['Mobile Number',              donation.donorPhone],
        ...(donation.donorEmail ? [['Email Address', donation.donorEmail]] : []),
        ['Purpose / Fund',             'General Donation – Ganeshotsav'],
      ];

      rows.forEach((row, i) => {
        const rowY = doc.y;
        if (i % 2 === 0) {
          doc.rect(50, rowY - 3, doc.page.width - 100, 20).fill(LIGHT_GREY);
        }
        doc.fontSize(9).fillColor(GREY).font('Helvetica').text(row[0] + ':', 60, rowY, { width: 190 });
        doc.font('Helvetica-Bold').fillColor('#1a1a1a').text(row[1], 260, rowY, { width: 280 });
        doc.y = rowY + 20;
      });

      // ─── AMOUNT HIGHLIGHT ────────────────────────────────────────────
      doc.moveDown(0.6);
      const amtBoxY = doc.y;
      doc.rect(50, amtBoxY, doc.page.width - 100, 36).fill(LIGHT_GOLD).stroke(GOLD);

      doc.fontSize(11).fillColor(GREY).font('Helvetica').text(
        'Total Amount Contributed:', 60, amtBoxY + 11
      );
      const amtFormatted = `\u20B9${Number(donation.amountPaid).toLocaleString('en-IN')}`;
      doc.fontSize(15).fillColor(DARK_RED).font('Helvetica-Bold').text(
        amtFormatted, 60, amtBoxY + 8, { align: 'right', width: doc.page.width - 120 }
      );
      doc.y = amtBoxY + 44;

      // ─── THANK YOU MESSAGE ───────────────────────────────────────────
      doc.moveDown(0.8);
      doc.moveTo(50, doc.y).lineTo(doc.page.width - 50, doc.y).lineWidth(0.5).strokeColor('#cccccc').stroke();
      doc.moveDown(0.5);
      doc.fontSize(9).fillColor(GREY).font('Helvetica-Oblique')
         .text(
           'We gratefully acknowledge your generous contribution. This donation will be used exclusively for charitable objectives and the grand Ganeshotsav celebrations organized by the Mandal.',
           55, doc.y, { width: doc.page.width - 110, align: 'center' }
         );

      doc.moveDown(0.4);
      doc.fontSize(9).fillColor(GREY).font('Helvetica')
         .text(
           '* This is a computer-generated receipt and is valid without a physical signature. The trust claims tax exemption under Section 80G of the Income Tax Act, 1961.',
           55, doc.y, { width: doc.page.width - 110, align: 'center' }
         );

      // ─── SIGNATURES ──────────────────────────────────────────────────
      doc.moveDown(1.5);
      const sigY = doc.y;

      doc.fontSize(10).fillColor('#1a1a1a').font('Helvetica-Bold')
         .text('Madhusudan Sharda Mahadev Amre', 55, sigY);
      doc.fontSize(8).fillColor(GREY).font('Helvetica')
         .text('Trust President', 55, sigY + 14);

      // Seal (right side)
      const sealX = doc.page.width - 170;
      doc.rect(sealX, sigY - 5, 120, 44).dash(3).strokeColor(GOLD).lineWidth(1.5).stroke();
      doc.undash();
      doc.fontSize(7).fillColor(GOLD).font('Helvetica-Bold')
         .text('DONGRI CHA RAJA', sealX + 4, sigY + 3, { width: 112, align: 'center' });
      doc.fontSize(7).fillColor(GREY).font('Helvetica')
         .text('TRUST SEAL', sealX + 4, sigY + 16, { width: 112, align: 'center' });
      doc.fontSize(6).fillColor('#888').text('APPROVED', sealX + 4, sigY + 28, { width: 112, align: 'center' });

      // ─── BOTTOM GOLD BAR ─────────────────────────────────────────────
      doc.rect(0, doc.page.height - 8, doc.page.width, 8).fill(GOLD);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { generateReceiptPDF };
