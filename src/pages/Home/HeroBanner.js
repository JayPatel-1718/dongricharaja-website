import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './HeroBanner.css';

const HeroBanner = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      title: t('hero.slide1.title'),
      subtitle: t('hero.slide1.subtitle'),
      description: t('hero.slide1.description'),
      image: "/images/dongri_cha_raja_idol.jpg",
      bgFallback: "linear-gradient(135deg, #8B3C1C 0%, #F67900 40%, #1C0A35 100%)",
      tag: t('hero.slide1.tag'),
      btnPrimary: { label: t('hero.slide1.btnPrimary'), icon: "fas fa-calendar-alt", to: "/ganeshotsav" },
      btnSecondary: { label: t('hero.slide1.btnSecondary'), icon: "fas fa-video", to: "/devotee-services" }
    },
    {
      title: t('hero.slide2.title'),
      subtitle: t('hero.slide2.subtitle'),
      description: t('hero.slide2.description'),
      image: "/images/maha_aarti_gathering.jpg",
      bgFallback: "linear-gradient(135deg, #1C0A35 0%, #DD6A00 100%)",
      tag: t('hero.slide2.tag'),
      btnPrimary: { label: t('hero.slide2.btnPrimary'), icon: "fas fa-dharmachakra", to: "/ganeshotsav" },
      btnSecondary: { label: t('hero.slide2.btnSecondary'), icon: "fas fa-globe", to: "/devotee-services" }
    },
    {
      title: t('hero.slide3.title'),
      subtitle: t('hero.slide3.subtitle'),
      description: t('hero.slide3.description'),
      image: "/images/community_service_seva.jpg",
      bgFallback: "linear-gradient(135deg, #1C0A35 0%, #8B0000 100%)",
      tag: t('hero.slide3.tag'),
      btnPrimary: { label: t('hero.slide3.btnPrimary'), icon: "fas fa-hands-helping", to: "/social-activities" },
      btnSecondary: { label: t('hero.slide3.btnSecondary'), icon: "fas fa-user-plus", to: "/devotee-services" }
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
          style={{ background: slide.bgFallback }}
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
              <img 
                 src="/images/hero-text-logo.png" 
                 alt="Dongricha Raja Typography" 
                 className="hero-text-logo-img" 
              />
              <div className="hero-badge" style={{display: 'none'}}>
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
            <div className="hero-image-container">
              <img src="/images/hero-ganesha.png" alt="Dongricha Raja Idol" className="hero-ganesha-img" />
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
                <span className="stat-label">{t('hero.yearsLegacy')}</span>
              </div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-icon"><i className="fas fa-users"></i></div>
              <div className="stat-info">
                <span className="stat-number">2.5M+</span>
                <span className="stat-label">{t('hero.devoteesYearly')}</span>
              </div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-icon"><i className="fas fa-eye"></i></div>
              <div className="stat-info">
                <span className="stat-number">24/7</span>
                <span className="stat-label">{t('hero.liveDarshan')}</span>
              </div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-icon"><i className="fas fa-heart"></i></div>
              <div className="stat-info">
                <span className="stat-number">100+</span>
                <span className="stat-label">{t('hero.sevaPrograms')}</span>
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