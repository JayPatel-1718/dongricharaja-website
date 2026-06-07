import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navGroups = [
    {
      label: 'About',
      icon: 'fas fa-info-circle',
      children: [
        { path: '/about-us', label: 'About Us', icon: 'fas fa-om', desc: 'Our history & mission' },
        { path: '/committee', label: 'Committee', icon: 'fas fa-users', desc: 'Meet our leadership' },
      ]
    },
    {
      label: 'Festival',
      icon: 'fas fa-gopuram',
      children: [
        { path: '/ganeshotsav', label: 'Ganeshotsav', icon: 'fas fa-dharmachakra', desc: 'Festival schedule & rituals' },
        { path: '/events', label: 'Events', icon: 'fas fa-calendar-alt', desc: 'Upcoming celebrations' },
        { path: '/gallery', label: 'Gallery', icon: 'fas fa-images', desc: 'Photos & videos' },
      ]
    },
    {
      label: 'Community',
      icon: 'fas fa-hands-helping',
      children: [
        { path: '/social-activities', label: 'Social Activities', icon: 'fas fa-heart', desc: 'Our seva initiatives' },
        { path: '/news', label: 'News', icon: 'fas fa-newspaper', desc: 'Latest updates' },
        { path: '/devotee-services', label: 'Devotee Services', icon: 'fas fa-hand-holding-heart', desc: 'Volunteer & seva' },
      ]
    },
    { path: '/donations', label: 'Donate', icon: 'fas fa-donate', single: true },
    { path: '/contact-us', label: 'Contact', icon: 'fas fa-envelope', single: true },
  ];

  const isGroupActive = (group) => {
    if (group.single) return location.pathname === group.path;
    return group.children?.some(c => location.pathname === c.path);
  };

  return (
    <>
      <nav
        className={`navbar ${scrolled ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}
        role="navigation"
        aria-label="Main navigation"
        ref={dropdownRef}
      >
        <div className="navbar-container container">
          {/* Logo */}
          <Link to="/" className="logo" aria-label="Dongri Cha Raja - Home">
            <div className="logo-icon">
              <i className="fas fa-om" aria-hidden="true"></i>
            </div>
            <div className="logo-text">
              <span className="logo-title">Dongri Cha Raja</span>
              <span className="logo-sub">Sarvajani Ganesh Utsav Mandal</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="nav-links" role="menubar">
            {navGroups.map((group, i) =>
              group.single ? (
                <Link
                  key={group.path}
                  to={group.path}
                  role="menuitem"
                  className={`nav-single ${location.pathname === group.path ? 'active' : ''} ${group.path === '/donations' ? 'nav-donate' : ''}`}
                >
                  <i className={group.icon} aria-hidden="true"></i>
                  {group.label}
                </Link>
              ) : (
                <div
                  key={i}
                  className={`nav-group ${isGroupActive(group) ? 'active' : ''} ${activeDropdown === i ? 'open' : ''}`}
                  onMouseEnter={() => setActiveDropdown(i)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  role="none"
                >
                  <button
                    className="nav-group-btn"
                    role="menuitem"
                    aria-expanded={activeDropdown === i}
                    aria-haspopup="true"
                    onClick={() => setActiveDropdown(activeDropdown === i ? null : i)}
                  >
                    <i className={group.icon} aria-hidden="true"></i>
                    {group.label}
                    <i className="fas fa-chevron-down nav-chevron" aria-hidden="true"></i>
                  </button>
                  <div className="nav-dropdown" role="menu" aria-label={group.label}>
                    <div className="dropdown-inner">
                      {group.children.map(child => (
                        <Link
                          key={child.path}
                          to={child.path}
                          role="menuitem"
                          className={`dropdown-item ${location.pathname === child.path ? 'active' : ''}`}
                        >
                          <div className="dropdown-icon">
                            <i className={child.icon} aria-hidden="true"></i>
                          </div>
                          <div>
                            <span className="dropdown-label">{child.label}</span>
                            <span className="dropdown-desc">{child.desc}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}
            <Link to="/devotee-services" className="btn-seva">
              <i className="fas fa-hand-holding-heart" aria-hidden="true"></i>
              Seva
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`hamburger ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`mobile-menu ${isOpen ? 'active' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="mobile-menu-inner">
            {navGroups.map((group, i) =>
              group.single ? (
                <Link
                  key={group.path}
                  to={group.path}
                  className={`mobile-link ${location.pathname === group.path ? 'active' : ''} ${group.path === '/donations' ? 'mobile-donate' : ''}`}
                >
                  <i className={group.icon} aria-hidden="true"></i>
                  {group.label}
                </Link>
              ) : (
                <div key={i} className="mobile-group">
                  <div className="mobile-group-label">
                    <i className={group.icon} aria-hidden="true"></i>
                    {group.label}
                  </div>
                  {group.children.map(child => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className={`mobile-link mobile-child ${location.pathname === child.path ? 'active' : ''}`}
                    >
                      <i className={child.icon} aria-hidden="true"></i>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )
            )}
            <Link to="/devotee-services" className="mobile-seva-btn">
              <i className="fas fa-hand-holding-heart"></i>
              Devotee Services & Seva
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;