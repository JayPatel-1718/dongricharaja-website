import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import './Admin.css';

const ManageSettings = () => {
  const { settings, updateSettings, resetAllToDefaults } = useData();
  const [password, setPassword] = useState({ current: '', newPw: '', confirm: '' });
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState('');
  const [resetConfirm, setResetConfirm] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const [heroStats, setHeroStats] = useState({ ...settings.heroStats });
  const [statsSaved, setStatsSaved] = useState(false);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPwError('');
    setPwSuccess('');
    if (password.current !== settings.adminPassword) {
      setPwError('Current password is incorrect.');
      return;
    }
    if (password.newPw.length < 3) {
      setPwError('New password must be at least 3 characters.');
      return;
    }
    if (password.newPw !== password.confirm) {
      setPwError('New passwords do not match.');
      return;
    }
    updateSettings({ adminPassword: password.newPw });
    setPwSuccess('Password updated successfully!');
    setPassword({ current: '', newPw: '', confirm: '' });
  };

  const handleStatsSave = (e) => {
    e.preventDefault();
    updateSettings({ heroStats });
    setStatsSaved(true);
    setTimeout(() => setStatsSaved(false), 2000);
  };

  const handleReset = () => {
    resetAllToDefaults();
    setResetConfirm(false);
    setResetDone(true);
    setTimeout(() => setResetDone(false), 3000);
  };

  return (
    <div>
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h2><i className="fas fa-gear" /> Settings</h2>
          <p>Configure admin password, hero stats, and site-wide settings.</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Hero Stats */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3><i className="fas fa-chart-bar" /> Hero Section Stats</h3>
          </div>
          <form onSubmit={handleStatsSave}>
            <div className="admin-card-body">
              <p style={{ fontSize: '13px', color: 'var(--admin-text-muted)', marginBottom: '20px' }}>
                These numbers appear in the stats bar on the hero banner of the homepage.
              </p>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label><i className="fas fa-history" /> Years of Legacy</label>
                  <input
                    value={heroStats.yearsLegacy}
                    onChange={e => setHeroStats(p => ({ ...p, yearsLegacy: e.target.value }))}
                    placeholder="50+"
                  />
                </div>
                <div className="admin-form-group">
                  <label><i className="fas fa-users" /> Devotees Yearly</label>
                  <input
                    value={heroStats.devotees}
                    onChange={e => setHeroStats(p => ({ ...p, devotees: e.target.value }))}
                    placeholder="2.5M+"
                  />
                </div>
              </div>
              <div className="admin-form-group" style={{ marginTop: '14px', maxWidth: '260px' }}>
                <label><i className="fas fa-heart" /> Seva Programs</label>
                <input
                  value={heroStats.sevaPrograms}
                  onChange={e => setHeroStats(p => ({ ...p, sevaPrograms: e.target.value }))}
                  placeholder="100+"
                />
              </div>
              <div style={{ marginTop: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button type="submit" className={`admin-btn ${statsSaved ? 'admin-btn-success' : 'admin-btn-primary'}`}>
                  {statsSaved ? <><i className="fas fa-check" /> Saved!</> : <><i className="fas fa-save" /> Save Stats</>}
                </button>
                {statsSaved && (
                  <span style={{ fontSize: '13px', color: 'var(--admin-success)' }}>
                    ✓ Stats updated on the homepage.
                  </span>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Change Password */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3><i className="fas fa-lock" /> Change Admin Password</h3>
          </div>
          <form onSubmit={handlePasswordChange}>
            <div className="admin-card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '420px' }}>
                <div className="admin-form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={password.current}
                    onChange={e => setPassword(p => ({ ...p, current: e.target.value }))}
                    placeholder="Enter current password"
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={password.newPw}
                    onChange={e => setPassword(p => ({ ...p, newPw: e.target.value }))}
                    placeholder="Enter new password"
                    required
                  />
                </div>
                <div className="admin-form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={password.confirm}
                    onChange={e => setPassword(p => ({ ...p, confirm: e.target.value }))}
                    placeholder="Re-enter new password"
                    required
                  />
                </div>
                {pwError && (
                  <div className="admin-error-msg">
                    <i className="fas fa-circle-exclamation" /> {pwError}
                  </div>
                )}
                {pwSuccess && (
                  <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', padding: '10px 14px', color: '#86efac', fontSize: '13px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <i className="fas fa-check-circle" /> {pwSuccess}
                  </div>
                )}
                <button type="submit" className="admin-btn admin-btn-primary" style={{ alignSelf: 'flex-start' }}>
                  <i className="fas fa-key" /> Update Password
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Reset to Defaults */}
        <div className="admin-card" style={{ border: '1px solid rgba(239,68,68,0.2)' }}>
          <div className="admin-card-header">
            <h3><i className="fas fa-rotate-left" style={{ color: 'var(--admin-danger)' }} /> Reset to Defaults</h3>
          </div>
          <div className="admin-card-body">
            <p style={{ fontSize: '13px', color: 'var(--admin-text-muted)', marginBottom: '16px' }}>
              This will reset ALL content (announcements, gallery, events, news) back to the original sample data. 
              <strong style={{ color: '#fca5a5' }}> This action cannot be undone.</strong>
            </p>
            {resetDone && (
              <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', padding: '10px 14px', color: '#86efac', fontSize: '13px', marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <i className="fas fa-check-circle" /> All content has been reset to default values.
              </div>
            )}
            {resetConfirm ? (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#fca5a5' }}>
                  <i className="fas fa-triangle-exclamation" /> Are you absolutely sure?
                </span>
                <button className="admin-btn admin-btn-danger" onClick={handleReset}>
                  <i className="fas fa-check" /> Yes, Reset Everything
                </button>
                <button className="admin-btn admin-btn-outline" onClick={() => setResetConfirm(false)}>
                  Cancel
                </button>
              </div>
            ) : (
              <button className="admin-btn admin-btn-danger" onClick={() => setResetConfirm(true)}>
                <i className="fas fa-rotate-left" /> Reset All Content to Defaults
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSettings;
