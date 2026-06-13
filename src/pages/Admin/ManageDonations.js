import React, { useMemo, useState } from 'react';
import { useData } from '../../context/DataContext';
import './Admin.css';

const ManageDonations = () => {
  const { donations, clearDonations } = useData();
  const [search, setSearch] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const filtered = donations.filter(d =>
    (d.donorName || '').toLowerCase().includes(search.toLowerCase()) ||
    (d.donorEmail || '').toLowerCase().includes(search.toLowerCase()) ||
    (d.txId || '').toLowerCase().includes(search.toLowerCase())
  );

  const totalAmount = useMemo(() => donations.reduce((s, d) => s + (d.amountPaid || 0), 0), [donations]);
  const avgAmount = donations.length ? Math.round(totalAmount / donations.length) : 0;

  const fundTotals = useMemo(() => {
    const map = {};
    donations.forEach(d => {
      map[d.fundName] = (map[d.fundName] || 0) + (d.amountPaid || 0);
    });
    return map;
  }, [donations]);

  const handleExportCSV = () => {
    if (!donations.length) return;
    const headers = ['Receipt No', 'TX ID', 'Donor Name', 'Email', 'Phone', 'PAN', 'Fund', 'Amount (₹)', 'Date'];
    const rows = donations.map(d => [
      d.receiptNo, d.txId, d.donorName, d.donorEmail, d.donorPhone, d.donorPan,
      d.fundName, d.amountPaid, d.date
    ]);
    const csv = [headers, ...rows].map(r => r.map(v => `"${v || ''}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `donations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h2><i className="fas fa-hand-holding-heart" /> Donations Tracker</h2>
          <p>View and track all donations submitted through the website's donation form.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
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

      {/* Summary Stats */}
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
        {Object.entries(fundTotals).map(([fund, total]) => (
          <div key={fund} className="admin-donation-stat">
            <span className="amount" style={{ fontSize: '16px' }}>₹{total.toLocaleString('en-IN')}</span>
            <span className="label" style={{ fontSize: '10px' }}>{fund}</span>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="admin-card" style={{ marginBottom: '16px' }}>
        <div className="admin-card-body" style={{ padding: '12px 16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div className="admin-search-bar">
            <i className="fas fa-search" />
            <input type="text" placeholder="Search by name, email or TX ID..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--admin-text-muted)' }}>
            {filtered.length} record{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Donor</th>
                <th>Fund</th>
                <th>Amount</th>
                <th>PAN</th>
                <th>Date</th>
                <th>TX ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8}>
                  <div className="admin-empty-state">
                    <i className="fas fa-hand-holding-heart" />
                    <h3>{donations.length === 0 ? 'No donations yet' : 'No results found'}</h3>
                    <p>{donations.length === 0 ? 'Donations submitted via the website will appear here automatically.' : 'Try a different search term.'}</p>
                  </div>
                </td></tr>
              ) : filtered.map((d, idx) => (
                <tr key={idx}>
                  <td style={{ color: 'var(--admin-text-muted)' }}>{idx + 1}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{d.donorName || '—'}</div>
                    <div style={{ fontSize: '11px', color: 'var(--admin-text-muted)' }}>{d.donorEmail}</div>
                  </td>
                  <td style={{ maxWidth: '140px', color: 'var(--admin-text-muted)', fontSize: '12px' }}>{d.fundName}</td>
                  <td style={{ fontWeight: 700, color: '#86efac' }}>₹{(d.amountPaid || 0).toLocaleString('en-IN')}</td>
                  <td style={{ fontFamily: 'monospace', color: 'var(--admin-text-muted)', fontSize: '12px' }}>{d.donorPan || '—'}</td>
                  <td style={{ color: 'var(--admin-text-muted)', whiteSpace: 'nowrap', fontSize: '12px' }}>{d.date}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--admin-text-muted)' }}>{d.txId}</td>
                  <td><span className="admin-badge admin-badge-green">PAID</span></td>
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
