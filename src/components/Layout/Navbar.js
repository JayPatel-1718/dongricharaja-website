import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setLangOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setLangOpen(false);
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
      label: t('navbar.about'),
      icon: 'fas fa-info-circle',
      children: [
        { path: '/about-us', label: t('navbar.aboutUs'), icon: 'fas fa-om', desc: t('navbar.aboutUsDesc') },
        { path: '/committee', label: t('navbar.committee'), icon: 'fas fa-users', desc: t('navbar.committeeDesc') },
      ]
    },
    {
      label: t('navbar.festival'),
      icon: 'fas fa-gopuram',
      children: [
        { path: '/ganeshotsav', label: t('navbar.ganeshotsav'), icon: 'fas fa-dharmachakra', desc: t('navbar.ganeshotsavDesc') },
        { path: '/events', label: t('navbar.events'), icon: 'fas fa-calendar-alt', desc: t('navbar.eventsDesc') },
        { path: '/gallery', label: t('navbar.gallery'), icon: 'fas fa-images', desc: t('navbar.galleryDesc') },
      ]
    },
    {
      label: t('navbar.community'),
      icon: 'fas fa-hands-helping',
      children: [
        { path: '/social-activities', label: t('navbar.socialActivities'), icon: 'fas fa-heart', desc: t('navbar.socialActivitiesDesc') },
        { path: '/news', label: t('navbar.news'), icon: 'fas fa-newspaper', desc: t('navbar.newsDesc') },
        { path: '/devotee-services', label: t('navbar.devoteeServices'), icon: 'fas fa-hand-holding-heart', desc: t('navbar.devoteeServicesDesc') },
      ]
    },
    { path: '/donations', label: t('navbar.donate'), icon: 'fas fa-donate', single: true },
    { path: '/contact-us', label: t('navbar.contact'), icon: 'fas fa-envelope', single: true },
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
          <Link to="/" className="logo" aria-label={`${t('logo.title')} - Home`}>
            <div className="logo-icon">
              <i className="fas fa-om" aria-hidden="true"></i>
            </div>
            <div className="logo-text">
              <span className="logo-title">{t('logo.title')}</span>
              <span className="logo-sub">{t('logo.subtitle')}</span>
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

            {/* Premium Language Dropdown Selector */}
            <div className="lang-switcher-container">
              <button
                className={`lang-switcher-btn ${langOpen ? 'active' : ''}`}
                onClick={() => setLangOpen(!langOpen)}
                aria-expanded={langOpen}
                aria-haspopup="true"
                aria-label="Select Language"
              >
                <i className="fas fa-globe" aria-hidden="true"></i>
                <span>{language === 'en' ? 'EN' : language === 'hi' ? 'हिं' : 'मरा'}</span>
                <i className={`fas fa-chevron-down lang-chevron ${langOpen ? 'open' : ''}`} aria-hidden="true"></i>
              </button>
              {langOpen && (
                <div className="lang-dropdown animate-fade-in" role="menu">
                  <button
                    role="menuitem"
                    className={`lang-option ${language === 'en' ? 'selected' : ''}`}
                    onClick={() => { setLanguage('en'); setLangOpen(false); }}
                  >
                    <span className="lang-flag">EN</span> English
                  </button>
                  <button
                    role="menuitem"
                    className={`lang-option ${language === 'hi' ? 'selected' : ''}`}
                    onClick={() => { setLanguage('hi'); setLangOpen(false); }}
                  >
                    <span className="lang-flag">हिं</span> हिंदी (Hindi)
                  </button>
                  <button
                    role="menuitem"
                    className={`lang-option ${language === 'mr' ? 'selected' : ''}`}
                    onClick={() => { setLanguage('mr'); setLangOpen(false); }}
                  >
                    <span className="lang-flag">मरा</span> मराठी (Marathi)
                  </button>
                </div>
              )}
            </div>

            <Link to="/devotee-services" className="btn-seva">
              <i className="fas fa-hand-holding-heart" aria-hidden="true"></i>
              {t('navbar.seva')}
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

        {/* Mobile Menu - WITH INLINE STYLES TO PREVENT BLUR */}
        <div
          id="mobile-menu"
          className={`mobile-menu ${isOpen ? 'active' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="mobile-menu-inner">
            <Link
              to="/"
              className={`mobile-link ${location.pathname === '/' ? 'active' : ''} mobile-home-link`}
            >
              <i className="fas fa-home" aria-hidden="true"></i>
              {t('navbar.home')}
            </Link>
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
              {t('navbar.devoteeServicesShort')}
            </Link>

            {/* Mobile Language Selector */}
            <div className="mobile-lang-selector">
              <span className="mobile-lang-title">
                <i className="fas fa-globe"></i> Language / भाषा
              </span>
              <div className="mobile-lang-buttons">
                <button
                  className={`mobile-lang-btn ${language === 'en' ? 'active' : ''}`}
                  onClick={() => setLanguage('en')}
                >
                  English
                </button>
                <button
                  className={`mobile-lang-btn ${language === 'hi' ? 'active' : ''}`}
                  onClick={() => setLanguage('hi')}
                >
                  हिंदी
                </button>
                <button
                  className={`mobile-lang-btn ${language === 'mr' ? 'active' : ''}`}
                  onClick={() => setLanguage('mr')}
                >
                  मराठी
                </button>
              </div>
            </div>
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