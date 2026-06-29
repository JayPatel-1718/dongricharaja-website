import React, { useMemo, useState } from 'react';
import { useData } from '../../context/DataContext';
import { toast } from 'react-hot-toast';
import './Admin.css';

const BACKEND  = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
const FRONTEND = process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000';

const ManageDonations = () => {
  const { donations, clearDonations } = useData();
  const [search,          setSearch]          = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [loadingId,       setLoadingId]       = useState(null); // tracks which tx is processing

  // Search by name, email, phone, receipt no, or payment ID
  const filtered = donations.filter(d =>
    [d.donorName, d.donorEmail, d.donorPhone, d.receiptNo, d.txId]
      .some(v => (v || '').toLowerCase().includes(search.toLowerCase()))
  );

  const totalAmount = useMemo(() => donations.reduce((s, d) => s + (d.amountPaid || 0), 0), [donations]);
  const avgAmount   = donations.length ? Math.round(totalAmount / donations.length) : 0;

  // ── Helpers ──────────────────────────────────────────────────────────────
  const apiPost = async (endpoint, body, toastId) => {
    const res  = await fetch(`${BACKEND}/api/${endpoint}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `${endpoint} failed`);
    return data;
  };

  // ── Actions ───────────────────────────────────────────────────────────────
  const handleResendSMS = async (txId) => {
    setLoadingId(`sms-${txId}`);
    const toastId = toast.loading('Resending SMS…');
    try {
      const data = await apiPost('resend-sms', { txId }, toastId);
      if (data.smsStatus === 'Sent') {
        toast.success('SMS sent successfully!', { id: toastId });
      } else {
        toast.error(`SMS failed: ${data.smsError || 'Unknown error'}`, { id: toastId });
      }
    } catch (err) {
      toast.error(err.message, { id: toastId });
    } finally {
      setLoadingId(null);
    }
  };

  const handleRegeneratePDF = async (txId) => {
    setLoadingId(`pdf-${txId}`);
    const toastId = toast.loading('Regenerating PDF receipt…');
    try {
      const data = await apiPost('regenerate-receipt', { txId }, toastId);
      toast.success('Receipt regenerated!', { id: toastId });
      if (data.receiptUrl) window.open(data.receiptUrl, '_blank');
    } catch (err) {
      toast.error(err.message, { id: toastId });
    } finally {
      setLoadingId(null);
    }
  };

  const handleCopyLink = (receiptNo) => {
    const url = `${FRONTEND}/receipt/${receiptNo}`;
    navigator.clipboard.writeText(url);
    toast.success('Receipt link copied!');
  };

  const handleExportCSV = () => {
    if (!donations.length) return;
    const headers = ['Receipt No', 'TX ID', 'Donor', 'Phone', 'Email', 'Amount (₹)', 'Date', 'SMS', 'Receipt URL'];
    const rows    = donations.map(d => [
      d.receiptNo, d.txId, d.donorName, d.donorPhone, d.donorEmail,
      d.amountPaid, d.date, d.smsStatus, d.receiptUrl,
    ]);
    const csv  = [headers, ...rows].map(r => r.map(v => `"${v || ''}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `donations_${new Date().toISOString().split('T')[0]}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Header */}
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h2><i className="fas fa-hand-holding-heart" /> Donations Tracker</h2>
          <p>View and manage all verified Razorpay donations. Resend SMS receipts or regenerate PDFs anytime.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="admin-btn admin-btn-outline" onClick={handleExportCSV} disabled={!donations.length}>
            <i className="fas fa-file-csv" /> Export CSV
          </button>
          {showClearConfirm ? (
            <>
              <button className="admin-btn admin-btn-danger" onClick={() => { clearDonations(); setShowClearConfirm(false); }}>
                <i className="fas fa-check" /> Confirm Clear
              </button>
              <button className="admin-btn admin-btn-outline" onClick={() => setShowClearConfirm(false)}>Cancel</button>
            </>
          ) : (
            <button className="admin-btn admin-btn-danger" onClick={() => setShowClearConfirm(true)} disabled={!donations.length}>
              <i className="fas fa-trash" /> Clear All
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="admin-donation-stats">
        <div className="admin-donation-stat">
          <span className="amount">₹{totalAmount.toLocaleString('en-IN')}</span>
          <span className="label">Total Raised</span>
        </div>
        <div className="admin-donation-stat">
          <span className="amount">{donations.length}</span>
          <span className="label">Total Donors</span>
        </div>
        <div className="admin-donation-stat">
          <span className="amount">₹{avgAmount.toLocaleString('en-IN')}</span>
          <span className="label">Avg. Donation</span>
        </div>
        <div className="admin-donation-stat">
          <span className="amount">{donations.filter(d => d.smsStatus === 'Sent').length}</span>
          <span className="label">SMS Delivered</span>
        </div>
      </div>

      {/* Search */}
      <div className="admin-card" style={{ marginBottom: 16 }}>
        <div className="admin-card-body" style={{ padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
          <div className="admin-search-bar">
            <i className="fas fa-search" />
            <input
              type="text"
              placeholder="Search by name, phone, email, receipt no, or payment ID…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--admin-text-muted)' }}>
            {filtered.length} record{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Receipt</th>
                <th>Donor</th>
                <th>Amount</th>
                <th>Date</th>
                <th>SMS</th>
                <th>PDF</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8}>
                  <div className="admin-empty-state">
                    <i className="fas fa-hand-holding-heart" />
                    <h3>{donations.length === 0 ? 'No donations yet' : 'No results found'}</h3>
                    <p>{donations.length === 0
                      ? 'Verified donations appear here automatically.'
                      : 'Try a different search term.'}</p>
                  </div>
                </td></tr>
              ) : filtered.map((d, idx) => (
                <tr key={d.txId || idx}>
                  <td style={{ color: 'var(--admin-text-muted)', fontSize: 12 }}>{idx + 1}</td>

                  {/* Receipt column */}
                  <td>
                    <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#e09a20', fontSize: 12 }}>
                      {d.receiptNo || '—'}
                    </span>
                    {d.txId && (
                      <div style={{ fontSize: 10, color: 'var(--admin-text-muted)', fontFamily: 'monospace', marginTop: 2 }}>
                        {d.txId}
                      </div>
                    )}
                  </td>

                  {/* Donor column */}
                  <td>
                    <div style={{ fontWeight: 600 }}>{d.donorName || '—'}</div>
                    <div style={{ fontSize: 11, color: 'var(--admin-text-muted)' }}>
                      {d.donorPhone}
                      {d.donorEmail ? ` · ${d.donorEmail}` : ''}
                    </div>
                  </td>

                  <td style={{ fontWeight: 700, color: '#86efac' }}>
                    ₹{(d.amountPaid || 0).toLocaleString('en-IN')}
                  </td>

                  <td style={{ color: 'var(--admin-text-muted)', fontSize: 11, whiteSpace: 'nowrap' }}>
                    {d.date}
                  </td>

                  {/* SMS status + resend */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <span className={`admin-badge ${d.smsStatus === 'Sent' ? 'admin-badge-green' : 'admin-badge-red'}`}>
                        {d.smsStatus || 'Failed'}
                      </span>
                      <button
                        className="admin-btn admin-btn-outline admin-btn-sm"
                        style={{ padding: '2px 6px', fontSize: 10 }}
                        onClick={() => handleResendSMS(d.txId)}
                        disabled={loadingId === `sms-${d.txId}`}
                        title="Resend SMS receipt"
                      >
                        <i className={`fas ${loadingId === `sms-${d.txId}` ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`} /> Resend
                      </button>
                    </div>
                    {d.smsError && (
                      <div style={{ fontSize: 9, color: '#f87171', marginTop: 2, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={d.smsError}>
                        {d.smsError}
                      </div>
                    )}
                  </td>

                  {/* PDF status + regenerate */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <span className={`admin-badge ${d.receiptUrl ? 'admin-badge-green' : 'admin-badge-red'}`}>
                        {d.receiptUrl ? 'Ready' : 'Missing'}
                      </span>
                      <button
                        className="admin-btn admin-btn-outline admin-btn-sm"
                        style={{ padding: '2px 6px', fontSize: 10 }}
                        onClick={() => handleRegeneratePDF(d.txId)}
                        disabled={loadingId === `pdf-${d.txId}`}
                        title="Regenerate PDF receipt"
                      >
                        <i className={`fas ${loadingId === `pdf-${d.txId}` ? 'fa-spinner fa-spin' : 'fa-sync-alt'}`} /> Regen
                      </button>
                    </div>
                    {d.pdfError && (
                      <div style={{ fontSize: 9, color: '#f87171', marginTop: 2, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={d.pdfError}>
                        {d.pdfError}
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  <td>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {/* View receipt page */}
                      {d.receiptNo && (
                        <a
                          href={`/receipt/${d.receiptNo}`}
                          target="_blank"
                          rel="noreferrer"
                          className="admin-btn admin-btn-primary admin-btn-sm"
                          style={{ fontSize: 10, padding: '3px 8px', textDecoration: 'none' }}
                          title="View receipt page"
                        >
                          <i className="fas fa-eye" /> View
                        </a>
                      )}
                      {/* Download PDF */}
                      {d.receiptUrl && (
                        <a
                          href={d.receiptUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="admin-btn admin-btn-outline admin-btn-sm"
                          style={{ fontSize: 10, padding: '3px 8px', textDecoration: 'none' }}
                          title="Download PDF"
                        >
                          <i className="fas fa-download" /> PDF
                        </a>
                      )}
                      {/* Copy receipt link */}
                      {d.receiptNo && (
                        <button
                          className="admin-btn admin-btn-outline admin-btn-sm"
                          style={{ fontSize: 10, padding: '3px 8px' }}
                          onClick={() => handleCopyLink(d.receiptNo)}
                          title="Copy receipt page link"
                        >
                          <i className="fas fa-link" /> Link
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageDonations;
