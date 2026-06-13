import React, { useState } from 'react';
import { NavLink, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import ManageAnnouncements from './ManageAnnouncements';
import ManageGallery from './ManageGallery';
import ManageEvents from './ManageEvents';
import ManageNews from './ManageNews';
import ManageDonations from './ManageDonations';
import ManageSettings from './ManageSettings';
import './Admin.css';

const navItems = [
  { to: '/admin/dashboard', icon: 'fas fa-chart-pie', label: 'Dashboard' },
  { to: '/admin/announcements', icon: 'fas fa-bullhorn', label: 'Announcements' },
  { to: '/admin/gallery', icon: 'fas fa-images', label: 'Gallery' },
  { to: '/admin/events', icon: 'fas fa-calendar-days', label: 'Events' },
  { to: '/admin/news', icon: 'fas fa-newspaper', label: 'News' },
  { to: '/admin/donations', icon: 'fas fa-hand-holding-heart', label: 'Donations' },
  { to: '/admin/settings', icon: 'fas fa-gear', label: 'Settings' },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  return (
    <div className="admin-layout">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-brand-icon">
            <i className="fas fa-om" />
          </div>
          <div className="admin-sidebar-brand-text">
            <span className="admin-sidebar-brand-name">Dongri Cha Raja</span>
            <span className="admin-sidebar-brand-sub">Admin Panel</span>
          </div>
        </div>

        <div className="admin-sidebar-divider" />

        <nav className="admin-sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `admin-nav-item${isActive ? ' active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <i className={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="admin-nav-item"
          >
            <i className="fas fa-external-link-alt" />
            <span>View Website</span>
          </a>
          <button className="admin-nav-item admin-logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        {/* Top Bar */}
        <header className="admin-topbar">
          <button
            className="admin-hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="fas fa-bars" />
          </button>
          <div className="admin-topbar-title">
            <i className="fas fa-shield-halved" />
            Admin Control Panel
          </div>
          <div className="admin-topbar-user">
            <div className="admin-avatar">
              <i className="fas fa-user-shield" />
            </div>
            <span>Administrator</span>
          </div>
        </header>

        {/* Page Content */}
        <div className="admin-content">
          <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="announcements" element={<ManageAnnouncements />} />
            <Route path="gallery" element={<ManageGallery />} />
            <Route path="events" element={<ManageEvents />} />
            <Route path="news" element={<ManageNews />} />
            <Route path="donations" element={<ManageDonations />} />
            <Route path="settings" element={<ManageSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
