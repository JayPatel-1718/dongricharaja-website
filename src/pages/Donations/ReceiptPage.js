import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import './ReceiptPage.css';

const BACKEND = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const ReceiptPage = () => {
  const { receiptId } = useParams();
  const [donation, setDonation] = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchReceipt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiptId]);

  const fetchReceipt = async () => {
    try {
      const res = await fetch(`${BACKEND}/api/receipt/${receiptId}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error('Receipt not found. Please check the link.');
        throw new Error('Failed to load receipt. Please try again.');
      }
      const data = await res.json();
      setDonation(data.donation);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!donation?.receiptUrl) {
      toast.error('PDF not available yet. Please contact the mandal.');
      return;
    }
    window.open(donation.receiptUrl, '_blank');
  };

  const handlePrint = () => window.print();

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Receipt link copied!');
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) return (
    <div className="receipt-page receipt-page--loading">
      <div className="receipt-spinner" />
      <p>Loading your receipt…</p>
    </div>
  );

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) return (
    <div className="receipt-page receipt-page--error">
      <Helmet><title>Receipt Not Found | Dongri Cha Raja</title></Helmet>
      <div className="receipt-error-card">
        <i className="fas fa-exclamation-circle" />
        <h2>Oops!</h2>
        <p>{error}</p>
        <Link to="/donations" className="btn btn-primary">Back to Donations</Link>
      </div>
    </div>
  );

  // ── Success state ──────────────────────────────────────────────────────────
  return (
    <>
      <Helmet>
        <title>Receipt {donation.receiptNo} | Dongri Cha Raja</title>
        <meta name="description" content={`Official donation receipt for ${donation.donorName} – Dongri Cha Raja.`} />
      </Helmet>

      <div className="receipt-page fade-in">

        {/* ── Action bar (hidden on print) ── */}
        <div className="receipt-action-bar no-print">
          <Link to="/donations" className="receipt-back-link">
            <i className="fas fa-arrow-left" /> Back to Donations
          </Link>
          <div className="receipt-action-btns">
            <button className="rp-btn rp-btn--outline" onClick={handleCopy}>
              <i className="fas fa-link" /> Copy Link
            </button>
            <button className="rp-btn rp-btn--outline" onClick={handlePrint}>
              <i className="fas fa-print" /> Print
            </button>
            <button className="rp-btn rp-btn--primary" onClick={handleDownload} disabled={!donation.receiptUrl}>
              <i className="fas fa-download" /> Download PDF
            </button>
          </div>
        </div>

        {/* ── Receipt card ─────────────────────────────────────────────── */}
        <div className="rp-card" id="receipt-print-area">

          {/* Top gold strip */}
          <div className="rp-strip" />

          {/* Header */}
          <div className="rp-header">
            <div className="rp-logo-circle">
              <i className="fas fa-om" />
            </div>
            <div className="rp-org">
              <h1 className="rp-org__name">DONGRI CHA RAJA</h1>
              <p className="rp-org__sub">SARVAJANI GANESH UTSAV MANDAL</p>
              <p className="rp-org__meta">
                Reg. No. E-12435 (Mumbai) &nbsp;·&nbsp; 80G Approved
              </p>
              <p className="rp-org__address">
                Dongri Main Street, Mumbai – 400009, Maharashtra, India
              </p>
            </div>
          </div>

          <div className="rp-divider rp-divider--gold" />

          {/* Title band */}
          <div className="rp-title-band">
            OFFICIAL DONATION RECEIPT &nbsp;—&nbsp;
            <span>Section 80G of the Income Tax Act, 1961</span>
          </div>

          {/* Meta grid */}
          <div className="rp-meta-grid">
            <div className="rp-meta-item">
              <span className="rp-meta-label">Receipt No</span>
              <span className="rp-meta-value rp-meta-value--accent">{donation.receiptNo}</span>
            </div>
            <div className="rp-meta-item">
              <span className="rp-meta-label">Date</span>
              <span className="rp-meta-value">{donation.date}</span>
            </div>
            <div className="rp-meta-item">
              <span className="rp-meta-label">Payment ID</span>
              <span className="rp-meta-value rp-meta-value--mono">{donation.txId}</span>
            </div>
            <div className="rp-meta-item">
              <span className="rp-meta-label">Status</span>
              <span className="rp-badge rp-badge--paid">✓ PAID</span>
            </div>
          </div>

          <div className="rp-divider" />

          {/* Donor details table */}
          <table className="rp-table">
            <tbody>
              <tr>
                <td className="rp-table__label">Received with thanks from</td>
                <td className="rp-table__value rp-table__value--bold">{donation.donorName}</td>
              </tr>
              <tr>
                <td className="rp-table__label">Mobile Number</td>
                <td className="rp-table__value">{donation.donorPhone}</td>
              </tr>
              {donation.donorEmail && (
                <tr>
                  <td className="rp-table__label">Email Address</td>
                  <td className="rp-table__value">{donation.donorEmail}</td>
                </tr>
              )}
              <tr>
                <td className="rp-table__label">Purpose / Fund</td>
                <td className="rp-table__value">General Donation – Ganeshotsav</td>
              </tr>
            </tbody>
          </table>

          {/* Amount highlight */}
          <div className="rp-amount-box">
            <span className="rp-amount-label">Total Amount Contributed</span>
            <span className="rp-amount-value">
              ₹{Number(donation.amountPaid).toLocaleString('en-IN')}
            </span>
          </div>

          <div className="rp-divider" />

          {/* Footer note */}
          <p className="rp-note">
            We gratefully acknowledge your generous contribution. This donation will be used
            exclusively for charitable objectives and the grand Ganeshotsav celebrations.
          </p>
          <p className="rp-note rp-note--small">
            * This is a computer-generated certificate and is valid without a physical signature.
            The trust claims tax exemption under Section 80G of the Income Tax Act, 1961.
          </p>

          {/* Signatures */}
          <div className="rp-signatures">
            <div className="rp-sig">
              <span className="rp-sig__name">Madhusudan Sharda Mahadev Amre</span>
              <span className="rp-sig__role">Trust President</span>
            </div>
            <div className="rp-seal">
              <span className="rp-seal__line1">DONGRI CHA RAJA</span>
              <span className="rp-seal__line2">TRUST SEAL</span>
              <span className="rp-seal__line3">APPROVED</span>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="rp-strip" />
        </div>

        {/* Thank you banner (hidden on print) */}
        <div className="rp-thankyou no-print">
          <i className="fas fa-heart" />
          <p>
            Thank you, <strong>{donation.donorName}</strong>!
            May Lord Ganesha bless you and your family. 🙏
          </p>
        </div>

      </div>
    </>
  );
};

export default ReceiptPage;
