import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import './DonationSuccess.css';

const BACKEND = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
const REDIRECT_SECONDS = 30;

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatDateTime(isoString) {
  if (!isoString) return '—';
  try {
    return new Date(isoString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return isoString;
  }
}

function formatAmount(amount) {
  return Number(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ── Component ──────────────────────────────────────────────────────────────────

const DonationSuccess = () => {
  const navigate  = useNavigate();
  const location  = useLocation();

  const [donation,       setDonation]       = useState(null);
  const [loading,        setLoading]         = useState(true);
  const [error,          setError]           = useState('');

  // PDF download state
  const [pdfError,       setPdfError]        = useState('');
  const [pdfDownloading, setPdfDownloading]  = useState(false);

  // Countdown state
  const [countdown,      setCountdown]       = useState(REDIRECT_SECONDS);
  const [autoRedirect,   setAutoRedirect]    = useState(true);
  const countdownRef = useRef(null);
  const redirectRef  = useRef(null);

  // ── 1. Load donation data ──────────────────────────────────────────────────

  const loadFromBackend = useCallback(async (receiptNo) => {
    try {
      const res = await fetch(`${BACKEND}/api/receipt/${receiptNo}`);
      if (!res.ok) throw new Error('Receipt not found. Please check your SMS/email link.');
      const data = await res.json();
      setDonation(data.donation);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Prefer state passed by Donations.js (fastest path, no extra fetch)
    if (location.state?.donation) {
      setDonation(location.state.donation);
      // Persist receipt number so page refresh works
      sessionStorage.setItem('dcr_last_receipt', location.state.donation.receiptNo);
      setLoading(false);
      return;
    }

    // Refresh / direct navigation – fall back to sessionStorage receipt number
    const saved = sessionStorage.getItem('dcr_last_receipt');
    if (saved) {
      loadFromBackend(saved);
      return;
    }

    // No data available at all
    setError('Donation data not found. If you just made a payment, please check your SMS for the receipt link.');
    setLoading(false);
  }, [location.state, loadFromBackend]);

  // ── 2. Countdown auto-redirect ─────────────────────────────────────────────

  useEffect(() => {
    if (!donation || !autoRedirect) return;

    countdownRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    redirectRef.current = setTimeout(() => {
      navigate('/', { replace: true });
    }, REDIRECT_SECONDS * 1000);

    return () => {
      clearInterval(countdownRef.current);
      clearTimeout(redirectRef.current);
    };
  }, [donation, autoRedirect, navigate]);

  const handleCancelRedirect = () => {
    clearInterval(countdownRef.current);
    clearTimeout(redirectRef.current);
    setAutoRedirect(false);
    toast.success('Auto-redirect cancelled. Take your time!');
  };

  // ── 3. Action handlers ─────────────────────────────────────────────────────

  const handleViewReceipt = () => {
    if (!donation?.receiptNo) return;
    window.open(`/receipt/${donation.receiptNo}`, '_blank', 'noopener,noreferrer');
  };

  const handleDownload = async () => {
    setPdfError('');

    if (!donation?.receiptUrl) {
      setPdfError('PDF is not available yet. Please try again in a moment or contact the mandal.');
      return;
    }

    setPdfDownloading(true);
    try {
      // Fetch the PDF as a blob so the browser downloads it instead of opening it
      const response = await fetch(donation.receiptUrl);
      if (!response.ok) throw new Error('Could not fetch the PDF file.');
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${donation.receiptNo || 'donation-receipt'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);

      toast.success('Receipt downloaded!');
    } catch {
      setPdfError('Download failed. Please try again or use the View Receipt button.');
    } finally {
      setPdfDownloading(false);
    }
  };

  const handleHome = () => navigate('/', { replace: true });

  // ── 4. Render states ───────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="ds-page ds-page--center">
        <Helmet><title>Processing… | Dongri Cha Raja</title></Helmet>
        <div className="ds-spinner-wrap">
          <div className="ds-spinner" />
          <p className="ds-spinner-text">Loading your receipt…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ds-page ds-page--center">
        <Helmet><title>Error | Dongri Cha Raja</title></Helmet>
        <div className="ds-error-card">
          <div className="ds-error-icon">⚠️</div>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button className="ds-btn ds-btn--primary" onClick={() => navigate('/donations')}>
            ← Back to Donations
          </button>
        </div>
      </div>
    );
  }

  // ── Countdown ring calculation ─────────────────────────────────────────────
  const RING_RADIUS    = 22;
  const RING_CIRCUM    = 2 * Math.PI * RING_RADIUS;
  const ringOffset     = autoRedirect
    ? RING_CIRCUM * (1 - countdown / REDIRECT_SECONDS)
    : RING_CIRCUM;

  // ── 5. Success render ──────────────────────────────────────────────────────

  return (
    <>
      <Helmet>
        <title>Donation Successful | Dongri Cha Raja</title>
        <meta name="description" content={`Thank you ${donation.donorName}! Your donation of ₹${donation.amountPaid} has been received. Receipt: ${donation.receiptNo}`} />
      </Helmet>

      <main className="ds-page">

        {/* ── Hero / Success card ───────────────────────────────────────── */}
        <section className="ds-hero">

          {/* Animated checkmark */}
          <div className="ds-check-wrap" aria-hidden="true">
            <svg className="ds-check-svg" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="ds-check-circle" cx="40" cy="40" r="36" stroke="#22c55e" strokeWidth="4" />
              <polyline className="ds-check-mark" points="24,42 35,53 56,30" stroke="#22c55e" strokeWidth="4.5"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="ds-heading">Donation Successful!</h1>
          <p className="ds-subheading">
            Thank you, <span className="ds-donor-name">{donation.donorName}</span>!<br />
            Your generous contribution to Dongri Cha Raja has been received.<br />
            <span className="ds-bless">🙏 May Lord Ganesha bless you and your family.</span>
          </p>
        </section>

        {/* ── Details card ─────────────────────────────────────────────── */}
        <section className="ds-card ds-card--details" aria-label="Donation Details">
          <div className="ds-card__header">
            <span className="ds-card__header-icon">🧾</span>
            <h2 className="ds-card__title">Donation Details</h2>
          </div>

          <div className="ds-info-grid">
            <div className="ds-info-row">
              <span className="ds-info-label">Donor Name</span>
              <span className="ds-info-value ds-info-value--bold">{donation.donorName}</span>
            </div>
            <div className="ds-info-row">
              <span className="ds-info-label">Donation Amount</span>
              <span className="ds-info-value ds-info-value--amount">₹{formatAmount(donation.amountPaid)}</span>
            </div>
            <div className="ds-info-row">
              <span className="ds-info-label">Receipt Number</span>
              <span className="ds-info-value ds-info-value--receipt">{donation.receiptNo}</span>
            </div>
            <div className="ds-info-row">
              <span className="ds-info-label">Transaction ID</span>
              <span className="ds-info-value ds-info-value--mono">{donation.txId}</span>
            </div>
            <div className="ds-info-row">
              <span className="ds-info-label">Payment Date &amp; Time</span>
              <span className="ds-info-value">{formatDateTime(donation.recordedAt) || donation.date}</span>
            </div>
            <div className="ds-info-row">
              <span className="ds-info-label">Payment Status</span>
              <span className="ds-badge ds-badge--paid">✓ PAID</span>
            </div>
          </div>
        </section>

        {/* ── Action buttons ────────────────────────────────────────────── */}
        <section className="ds-actions" aria-label="Receipt Actions">

          {/* View Receipt */}
          <button
            id="btn-view-receipt"
            className="ds-btn ds-btn--secondary"
            onClick={handleViewReceipt}
            title="View receipt in a new tab"
          >
            <span className="ds-btn__icon">📄</span>
            <span className="ds-btn__label">View Receipt</span>
          </button>

          {/* Download Receipt – PRIMARY */}
          <button
            id="btn-download-receipt"
            className="ds-btn ds-btn--primary"
            onClick={handleDownload}
            disabled={pdfDownloading}
            title="Download receipt PDF"
          >
            {pdfDownloading ? (
              <>
                <span className="ds-btn__spinner" aria-hidden="true" />
                <span className="ds-btn__label">Downloading…</span>
              </>
            ) : (
              <>
                <span className="ds-btn__icon">⬇️</span>
                <span className="ds-btn__label">Download Receipt</span>
              </>
            )}
          </button>

          {/* Back to Home */}
          <button
            id="btn-back-home"
            className="ds-btn ds-btn--ghost"
            onClick={handleHome}
            title="Go to homepage"
          >
            <span className="ds-btn__icon">🏠</span>
            <span className="ds-btn__label">Back to Home</span>
          </button>
        </section>

        {/* ── PDF error message ─────────────────────────────────────────── */}
        {pdfError && (
          <div className="ds-pdf-error" role="alert">
            <span className="ds-pdf-error__icon">⚠️</span>
            <p className="ds-pdf-error__text">{pdfError}</p>
            <button className="ds-btn ds-btn--retry" onClick={handleDownload}>
              Retry Download
            </button>
          </div>
        )}

        {/* ── Countdown banner ──────────────────────────────────────────── */}
        {autoRedirect ? (
          <div className="ds-countdown" role="status" aria-live="polite">
            <div className="ds-countdown__ring" aria-hidden="true">
              <svg width="56" height="56" viewBox="0 0 56 56">
                {/* Track */}
                <circle cx="28" cy="28" r={RING_RADIUS} fill="none"
                  stroke="rgba(200,134,10,0.2)" strokeWidth="3" />
                {/* Progress */}
                <circle cx="28" cy="28" r={RING_RADIUS} fill="none"
                  stroke="#c8860a" strokeWidth="3"
                  strokeDasharray={RING_CIRCUM}
                  strokeDashoffset={ringOffset}
                  strokeLinecap="round"
                  transform="rotate(-90 28 28)"
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
                <text x="28" y="33" textAnchor="middle"
                  fill="#e5c98a" fontSize="14" fontWeight="700" fontFamily="Inter, sans-serif">
                  {countdown}
                </text>
              </svg>
            </div>
            <div className="ds-countdown__text">
              <p>You will be automatically redirected to the Home page in <strong>{countdown}s</strong>.</p>
              <button
                id="btn-cancel-redirect"
                className="ds-countdown__cancel"
                onClick={handleCancelRedirect}
              >
                Cancel Auto-Redirect
              </button>
            </div>
          </div>
        ) : (
          <div className="ds-countdown ds-countdown--cancelled" role="status">
            <span className="ds-countdown__cancelled-icon">⏹</span>
            <p>Auto-redirect cancelled. You can leave whenever you're ready.</p>
          </div>
        )}

      </main>
    </>
  );
};

export default DonationSuccess;
