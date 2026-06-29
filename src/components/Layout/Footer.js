import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('success');
  const [showToast, setShowToast] = useState(false);

  const showToastNotification = (msg, type = 'success') => {
    setToastMsg(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      showToastNotification(t('footer.toastEmailReq'), 'error');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      showToastNotification(t('footer.toastEmailValid'), 'error');
      return;
    }
    showToastNotification(t('footer.toastSuccess'), 'success');
    setEmail('');
  };

  const quickLinks = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.aboutUs'), path: '/about-us' },
    { name: t('navbar.committee'), path: '/committee' },
    { name: t('navbar.ganeshotsav'), path: '/ganeshotsav' },
    { name: t('navbar.events'), path: '/events' },
    { name: t('navbar.gallery'), path: '/gallery' },
    { name: t('navbar.news'), path: '/news' },
    { name: t('navbar.contact'), path: '/contact-us' }
  ];

  const services = [
    { name: t('navbar.volunteerRegistration'), path: '/devotee-services/volunteer' },
    { name: t('navbar.sevaRegistration'), path: '/devotee-services/seva' },
    { name: t('navbar.donateOnline'), path: '/donations' },
    { name: t('navbar.competitionEntry'), path: '/devotee-services/competition' },
    { name: t('navbar.feedback'), path: '/devotee-services/feedback' },
    { name: t('navbar.socialActivities'), path: '/social-activities' }
  ];

  const socialLinks = [
    { icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/share/1SAj1m6dkw/?mibextid=wwXIfr', color: '#1877F2', label: 'Facebook' },
    { icon: 'fab fa-instagram', url: 'https://www.instagram.com/dongricharaja?igsh=MThsNjJ4djNzYzhlZg%3D%3D&utm_source=qr', color: '#E4405F', label: 'Instagram' },
    { icon: 'fab fa-youtube', url: 'https://youtube.com/dongricharaja', color: '#FF0000', label: 'YouTube' },
    { icon: 'fab fa-twitter', url: 'https://twitter.com/dongricharaja', color: '#1DA1F2', label: 'Twitter' },
    { icon: 'fab fa-whatsapp', url: 'https://wa.me/919876543210', color: '#25D366', label: 'WhatsApp' },
    { icon: 'fab fa-telegram', url: 'https://t.me/dongricharaja', color: '#26A5E4', label: 'Telegram' }
  ];

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div className={`footer-toast footer-toast-${toastType}`} role="alert" aria-live="polite">
          <i className={toastType === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}></i>
          <span>{toastMsg}</span>
        </div>
      )}

      <footer className="footer" role="contentinfo">
        {/* Top Wave */}
        <div className="footer-wave">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="currentColor"/>
          </svg>
        </div>

        <div className="footer-inner">
          <div className="container">
            <div className="footer-grid">
              {/* Brand Column */}
              <div className="footer-section footer-brand">
                <div className="footer-logo">
                  <div className="footer-logo-img-wrap">
                    <img
                      src="/images/logo.png"
                      alt="Dongricha Raja Sarvajanik Ganeshotsav Mandal Logo"
                      className="footer-logo-img"
                    />
                  </div>
                  <div>
                    <h3>{t('logo.title')}</h3>
                    <p>{t('logo.subtitle')}</p>
                  </div>
                </div>
                <p className="footer-description">
                  {t('footer.desc')}
                </p>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      style={{ '--hover-color': social.color }}
                      className="social-link"
                    >
                      <i className={social.icon}></i>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="footer-section">
                <h4>{t('footer.quickLinks')}</h4>
                <ul>
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>
                        <i className="fas fa-chevron-right" aria-hidden="true"></i>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="footer-section">
                <h4>{t('footer.devoteeServices')}</h4>
                <ul>
                  {services.map((service, index) => (
                    <li key={index}>
                      <Link to={service.path}>
                        <i className="fas fa-chevron-right" aria-hidden="true"></i>
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="footer-section">
                <h4>{t('footer.contactInfo')}</h4>
                <ul className="contact-info">
                  <li>
                    <div className="contact-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <strong>{t('footer.address')}</strong>
                      <span>
                        {t('footer.addressValue').split('\n').map((line, idx) => (
                          <React.Fragment key={idx}>
                            {line}
                            {idx < t('footer.addressValue').split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="contact-icon">
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <div>
                      <strong>{t('footer.phone')}</strong>
                      <a href="tel:+912223456789"><span>+91 22 2345 6789</span></a>
                    </div>
                  </li>
                  <li>
                    <div className="contact-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <strong>{t('footer.email')}</strong>
                      <a href="mailto:dongricharajamoryamaza@gmail.com"><span>dongricharajamoryamaza@gmail.com</span></a>
                    </div>
                  </li>
                  <li>
                    <div className="contact-icon whatsapp-icon">
                      <i className="fab fa-whatsapp"></i>
                    </div>
                    <div>
                      <strong>{t('footer.whatsapp')}</strong>
                      <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"><span>+91 98765 43210</span></a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div className="footer-newsletter">
              <div className="newsletter-content">
                <div className="newsletter-text">
                  <i className="fas fa-bell newsletter-icon"></i>
                  <div>
                    <h4>{t('footer.newsletterTitle')}</h4>
                    <p>{t('footer.newsletterSub')}</p>
                  </div>
                </div>
                <form className="newsletter-form" onSubmit={handleSubscribe} noValidate>
                  <div className="newsletter-input-wrapper">
                    <i className="fas fa-envelope newsletter-input-icon"></i>
                    <input
                      type="email"
                      id="footer-newsletter-email"
                      placeholder={t('footer.emailPlaceholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-label="Email address for newsletter"
                    />
                  </div>
                  <button type="submit" className="btn-subscribe">
                    {t('footer.subscribe')}
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            </div>

            {/* Bottom */}
            <div className="footer-bottom">
              <p>
                <i className="fas fa-om footer-bottom-om"></i>
                &copy; {currentYear} {t('footer.copyright')}
              </p>
              <div className="footer-bottom-links">
                <Link to="/legal/privacy-policy">{t('footer.privacy')}</Link>
                <span>·</span>
                <Link to="/legal/terms">{t('footer.terms')}</Link>
                <span>·</span>
                <Link to="/legal/refund-policy">{t('footer.refund')}</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;