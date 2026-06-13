import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import './Admin.css';

const AdminDashboard = () => {
  const { announcements, galleryPhotos, events, news, donations } = useData();

  const totalDonated = useMemo(() =>
    donations.reduce((sum, d) => sum + (d.amountPaid || 0), 0),
  [donations]);

  const stats = [
    { label: 'Announcements', value: announcements.length, icon: 'fas fa-bullhorn', color: 'orange', link: '/admin/announcements' },
    { label: 'Gallery Images', value: galleryPhotos.length, icon: 'fas fa-images', color: 'blue', link: '/admin/gallery' },
    { label: 'Events Listed', value: events.length, icon: 'fas fa-calendar-days', color: 'purple', link: '/admin/events' },
    { label: 'News Articles', value: news.length, icon: 'fas fa-newspaper', color: 'green', link: '/admin/news' },
    { label: 'Total Donations', value: `₹${totalDonated.toLocaleString('en-IN')}`, icon: 'fas fa-hand-holding-heart', color: 'yellow', link: '/admin/donations' },
    { label: 'Donors', value: donations.length, icon: 'fas fa-users', color: 'red', link: '/admin/donations' },
  ];

  const quickActions = [
    { label: 'Add Announcement', icon: 'fas fa-plus', link: '/admin/announcements', color: 'orange' },
    { label: 'Upload Gallery Image', icon: 'fas fa-image', link: '/admin/gallery', color: 'blue' },
    { label: 'Add Event', icon: 'fas fa-calendar-plus', link: '/admin/events', color: 'purple' },
    { label: 'Add News', icon: 'fas fa-pen', link: '/admin/news', color: 'green' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h2><i className="fas fa-chart-pie" /> Dashboard Overview</h2>
          <p>Welcome back, Administrator. Here's a snapshot of your website content.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="admin-stats-grid">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.link}
            className="admin-stat-card"
            style={{ textDecoration: 'none' }}
          >
            <div className={`admin-stat-icon ${s.color}`}>
              <i className={s.icon} />
            </div>
            <div className="admin-stat-info">
              <div className="admin-stat-value">{s.value}</div>
              <div className="admin-stat-label">{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', flexWrap: 'wrap' }}>
        {/* Quick Actions */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3><i className="fas fa-bolt" /> Quick Actions</h3>
          </div>
          <div className="admin-card-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {quickActions.map((a) => (
              <Link
                key={a.label}
                to={a.link}
                className="admin-btn admin-btn-outline"
                style={{ justifyContent: 'flex-start', textDecoration: 'none' }}
              >
                <i className={a.icon} style={{ color: `var(--admin-${a.color === 'orange' ? 'accent' : a.color === 'purple' ? '#a855f7' : a.color})` }} />
                {a.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Donations */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3><i className="fas fa-hand-holding-heart" /> Recent Donations</h3>
            <Link to="/admin/donations" className="admin-btn admin-btn-outline admin-btn-sm">
              View All
            </Link>
          </div>
          <div>
            {donations.length === 0 ? (
              <div className="admin-empty-state" style={{ padding: '30px' }}>
                <i className="fas fa-inbox" style={{ fontSize: '28px' }} />
                <p>No donations recorded yet.</p>
              </div>
            ) : (
              donations.slice(0, 4).map((d, i) => (
                <div key={i} className="admin-activity-item" style={{ padding: '12px 20px' }}>
                  <div className="admin-activity-dot admin-stat-icon green" style={{ width: '32px', height: '32px', fontSize: '13px' }}>
                    <i className="fas fa-rupee-sign" />
                  </div>
                  <div className="admin-activity-content">
                    <h4>{d.donorName || 'Anonymous'}</h4>
                    <p>₹{(d.amountPaid || 0).toLocaleString('en-IN')} — {d.fundName || 'General'}</p>
                  </div>
                  <span className="admin-badge admin-badge-green" style={{ marginLeft: 'auto' }}>
                    PAID
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Latest Announcements preview */}
      <div className="admin-card" style={{ marginTop: '20px' }}>
        <div className="admin-card-header">
          <h3><i className="fas fa-bullhorn" /> Current Announcements</h3>
          <Link to="/admin/announcements" className="admin-btn admin-btn-primary admin-btn-sm">
            <i className="fas fa-cog" /> Manage
          </Link>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {announcements.slice(0, 5).map((a) => (
                <tr key={a.id}>
                  <td style={{ fontWeight: 500 }}>{a.title}</td>
                  <td>
                    <span className={`admin-badge ${
                      a.type === 'important' ? 'admin-badge-red' :
                      a.type === 'donate' ? 'admin-badge-green' :
                      a.type === 'opportunity' ? 'admin-badge-blue' :
                      'admin-badge-orange'
                    }`}>{a.tag}</span>
                  </td>
                  <td style={{ color: 'var(--admin-text-muted)' }}>{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
