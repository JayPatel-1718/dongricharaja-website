import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeroBanner.css';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      title: "Ganeshotsav 2026",
      subtitle: "Welcome to Dongri Cha Raja",
      description: "Experience divine blessings at Mumbai's most revered Ganesh Mandal. Join us for 10 days of unparalleled spiritual celebration.",
      image: "/images/dongri_cha_raja_idol.jpg",
      bgFallback: "linear-gradient(135deg, #8B3C1C 0%, #F67900 40%, #1C0A35 100%)",
      tag: "🪔 Est. 1974 · 50 Glorious Years",
      btnPrimary: { label: "View Schedule", icon: "fas fa-calendar-alt", to: "/ganeshotsav" },
      btnSecondary: { label: "Live Darshan", icon: "fas fa-video", to: "/devotee-services" }
    },
    {
      title: "Grand Maha Aarti",
      subtitle: "Witness the Divine",
      description: "Experience the spectacular evening Maha Aarti with thousands of devotees. A spiritually transcending experience every evening at 7 PM.",
      image: "/images/maha_aarti_gathering.jpg",
      bgFallback: "linear-gradient(135deg, #1C0A35 0%, #DD6A00 100%)",
      tag: "✨ Daily at 7:00 PM",
      btnPrimary: { label: "Aarti Schedule", icon: "fas fa-dharmachakra", to: "/ganeshotsav" },
      btnSecondary: { label: "Join Online", icon: "fas fa-globe", to: "/devotee-services" }
    },
    {
      title: "Community Seva",
      subtitle: "Seva is Our Mission",
      description: "Join our transformative social activities including blood donation camps, health checkups, and free educational support programs.",
      image: "/images/community_service_seva.jpg",
      bgFallback: "linear-gradient(135deg, #1C0A35 0%, #8B0000 100%)",
      tag: "❤️ 10,000+ Lives Touched",
      btnPrimary: { label: "Our Initiatives", icon: "fas fa-hands-helping", to: "/social-activities" },
      btnSecondary: { label: "Volunteer Now", icon: "fas fa-user-plus", to: "/devotee-services" }
    }
  ];

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 6000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  return (
    <section className="hero-banner" aria-label="Hero Slideshow">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentSlide ? 'active' : ''} ${isTransitioning ? 'transitioning' : ''}`}
          style={{ backgroundImage: `url(${slide.image}), ${slide.bgFallback}` }}
          aria-hidden={index !== currentSlide}
        >
          <div className="hero-overlay" />
          <div className="hero-particles">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="particle" style={{ '--delay': `${i * 0.3}s`, '--x': `${Math.random() * 100}%` }} />
            ))}
          </div>
          <div className="container hero-content">
            <div className="hero-text">
              <div className="hero-tag">{slide.tag}</div>
              <div className="hero-badge">
                <i className="fas fa-dharmachakra spin-slow"></i>
                <span>{slide.title}</span>
              </div>
              <h1 className="hero-headline">{slide.subtitle}</h1>
              <p className="hero-desc">{slide.description}</p>
              <div className="hero-buttons">
                <Link to={slide.btnPrimary.to} className="btn-hero-primary">
                  <i className={slide.btnPrimary.icon}></i>
                  {slide.btnPrimary.label}
                </Link>
                <Link to={slide.btnSecondary.to} className="btn-hero-outline">
                  <i className={slide.btnSecondary.icon}></i>
                  {slide.btnSecondary.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Stats Bar */}
      <div className="hero-stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon"><i className="fas fa-history"></i></div>
              <div className="stat-info">
                <span className="stat-number">50+</span>
                <span className="stat-label">Years of Legacy</span>
              </div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-icon"><i className="fas fa-users"></i></div>
              <div className="stat-info">
                <span className="stat-number">2.5M+</span>
                <span className="stat-label">Devotees Yearly</span>
              </div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-icon"><i className="fas fa-eye"></i></div>
              <div className="stat-info">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Live Darshan</span>
              </div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-icon"><i className="fas fa-heart"></i></div>
              <div className="stat-info">
                <span className="stat-number">100+</span>
                <span className="stat-label">Seva Programs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Controls */}
      <div className="hero-controls" role="tablist" aria-label="Slideshow navigation">
        {slides.map((_, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
            className={`control-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Arrow Nav */}
      <button className="hero-arrow hero-arrow-prev" onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)} aria-label="Previous slide">
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="hero-arrow hero-arrow-next" onClick={() => goToSlide((currentSlide + 1) % slides.length)} aria-label="Next slide">
        <i className="fas fa-chevron-right"></i>
      </button>
    </section>
  );
};

export default HeroBanner;