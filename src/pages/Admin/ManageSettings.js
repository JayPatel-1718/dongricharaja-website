import React, { useState, useEffect } from 'react';
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

  const [siteInfo, setSiteInfo] = useState(settings.siteInfo || {
    siteName: 'Dongri Cha Raja',
    contactPhone: '+91 22 2345 6789',
    contactEmail: 'info@dongricharaja.org',
    address: 'Dongri, Mumbai - 400009, Maharashtra, India'
  });
  const [socialLinks, setSocialLinks] = useState(settings.socialLinks || {
    facebook: 'https://www.facebook.com/share/1SAj1m6dkw/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/dongricharaja?igsh=MThsNjJ4djNzYzhlZg%3D%3D&utm_source=qr',
    youtube: 'https://youtube.com/c/dongricharaja',
    whatsapp: 'https://wa.me/919876543210'
  });
  
  const [siteInfoSaved, setSiteInfoSaved] = useState(false);
  const [socialLinksSaved, setSocialLinksSaved] = useState(false);

  useEffect(() => {
    if (settings.siteInfo) setSiteInfo(settings.siteInfo);
    if (settings.socialLinks) setSocialLinks(settings.socialLinks);
    if (settings.heroStats) setHeroStats(settings.heroStats);
  }, [settings]);

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

  const handleSiteInfoSave = (e) => {
    e.preventDefault();
    updateSettings({ siteInfo });
    setSiteInfoSaved(true);
    setTimeout(() => setSiteInfoSaved(false), 2000);
  };

  const handleSocialLinksSave = (e) => {
    e.preventDefault();
    updateSettings({ socialLinks });
    setSocialLinksSaved(true);
    setTimeout(() => setSocialLinksSaved(false), 2000);
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
          <p>Configure admin password, site info, social links, and hero stats.</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Site Info */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3><i className="fas fa-circle-info" /> Site Info</h3>
            </div>
            <form onSubmit={handleSiteInfoSave}>
              <div className="admin-card-body">
                <div className="admin-form-group">
                  <label>Site Name</label>
                  <input
                    value={siteInfo.siteName}
                    onChange={e => setSiteInfo(p => ({ ...p, siteName: e.target.value }))}
                    placeholder="Dongri Cha Raja"
                  />
                </div>
                <div className="admin-form-group" style={{ marginTop: '14px' }}>
                  <label>Contact Phone</label>
                  <input
                    value={siteInfo.contactPhone}
                    onChange={e => setSiteInfo(p => ({ ...p, contactPhone: e.target.value }))}
                    placeholder="+91 22 2345 6789"
                  />
                </div>
                <div className="admin-form-group" style={{ marginTop: '14px' }}>
                  <label>Contact Email</label>
                  <input
                    value={siteInfo.contactEmail}
                    onChange={e => setSiteInfo(p => ({ ...p, contactEmail: e.target.value }))}
                    placeholder="info@dongricharaja.org"
                  />
                </div>
                <div className="admin-form-group" style={{ marginTop: '14px' }}>
                  <label>Address</label>
                  <textarea
                    value={siteInfo.address}
                    onChange={e => setSiteInfo(p => ({ ...p, address: e.target.value }))}
                    placeholder="Dongri, Mumbai - 400009"
                    rows="3"
                  />
                </div>
                
                <div style={{ marginTop: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <button type="submit" className={`admin-btn ${siteInfoSaved ? 'admin-btn-success' : 'admin-btn-primary'}`}>
                    {siteInfoSaved ? <><i className="fas fa-check" /> Saved!</> : <><i className="fas fa-save" /> Save Info</>}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Social Links */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3><i className="fas fa-share-nodes" /> Social Media Links</h3>
            </div>
            <form onSubmit={handleSocialLinksSave}>
              <div className="admin-card-body">
                <div className="admin-form-group">
                  <label><i className="fab fa-facebook" style={{color: '#1877F2'}}/> Facebook URL</label>
                  <input
                    value={socialLinks.facebook}
                    onChange={e => setSocialLinks(p => ({ ...p, facebook: e.target.value }))}
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div className="admin-form-group" style={{ marginTop: '14px' }}>
                  <label><i className="fab fa-instagram" style={{color: '#E4405F'}}/> Instagram URL</label>
                  <input
                    value={socialLinks.instagram}
                    onChange={e => setSocialLinks(p => ({ ...p, instagram: e.target.value }))}
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div className="admin-form-group" style={{ marginTop: '14px' }}>
                  <label><i className="fab fa-youtube" style={{color: '#FF0000'}}/> YouTube Channel URL</label>
                  <input
                    value={socialLinks.youtube}
                    onChange={e => setSocialLinks(p => ({ ...p, youtube: e.target.value }))}
                    placeholder="https://youtube.com/c/..."
                  />
                </div>
                <div className="admin-form-group" style={{ marginTop: '14px' }}>
                  <label><i className="fab fa-whatsapp" style={{color: '#25D366'}}/> WhatsApp URL</label>
                  <input
                    value={socialLinks.whatsapp}
                    onChange={e => setSocialLinks(p => ({ ...p, whatsapp: e.target.value }))}
                    placeholder="https://wa.me/..."
                  />
                </div>

                <div style={{ marginTop: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <button type="submit" className={`admin-btn ${socialLinksSaved ? 'admin-btn-success' : 'admin-btn-primary'}`}>
                    {socialLinksSaved ? <><i className="fas fa-check" /> Saved!</> : <><i className="fas fa-save" /> Save Links</>}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

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
