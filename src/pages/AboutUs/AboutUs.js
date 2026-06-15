import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './AboutUs.css';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const timelineEvents = [
    { year: "1974", title: "The Humble Beginning", desc: "Started by a group of passionate local youths with a small 2-foot clay idol, fostering community unity." },
    { year: "1988", title: "Silver Jubilee & Social Wings", desc: "Completed 15 years and launched the official charitable trust, opening free clinics and education support funds." },
    { year: "2002", title: "Going Eco-Friendly", desc: "Pioneered eco-friendly immersion guidelines and set up the first localized water recycling tanks." },
    { year: "2015", title: "Golden Era & Global Darshan", desc: "Introduced high-definition online live streaming, allowing millions of global devotees to seek blessings." },
    { year: "2024", title: "50 Years of Legacy", desc: "Celebrated our Grand Golden Jubilee, honored by state dignitaries for outstanding contributions to community welfare." }
  ];

  const coreValues = [
    { icon: "fa-om", title: "Pure Devotion", desc: "Preserving traditional Vedic rituals and cultural sanctity in every program." },
    { icon: "fa-hands-helping", title: "Seva (Service)", desc: "Directing festival proceeds to healthcare, blood drives, and student scholarships." },
    { icon: "fa-dharmachakra", title: "Unity & Harmony", desc: "Creating a welcoming space for devotees of all backgrounds without discrimination." },
    { icon: "fa-leaf", title: "Eco-Responsibility", desc: "Advocating for clay idols, organic colors, and paperless digital services." }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Dongri Cha Raja - 50+ Years of Legacy</title>
        <meta name="description" content="Learn about the rich history, foundation, and social legacy of Dongri Cha Raja Mandal since 1974." />
      </Helmet>
      
      <main className="about-page fade-in">
        {/* Premium Hero */}
        <section className="page-hero about-page-hero">
          <div className="about-hero-decor">
            <div className="about-hero-glow" />
            <div className="about-hero-rings">
              <div className="about-ring" />
              <div className="about-ring" />
              <div className="about-ring" />
              <div className="about-ring" />
            </div>
          </div>
          <div className="page-hero-content">
            <div className="page-hero-eyebrow">
              <i className="fas fa-dharmachakra" /> Est. 1974
            </div>
            <h1>Our Legacy &amp; History</h1>
            <p>Five decades of devotion, service, and unwavering community spirit in the heart of Mumbai.</p>
            <div className="page-hero-breadcrumb">
              <a href="/">Home</a>
              <i className="fas fa-chevron-right" />
              <span>About Us</span>
            </div>
          </div>
          <div className="page-hero-wave">
            <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--royal-dark, #0D0520)" />
            </svg>
          </div>
        </section>

        {/* Narrative Section */}
        <section className="section section-narrative">
          <div className="container grid grid-cols-2">
            <div className="narrative-text">
              <h2 className="section-title">Who We Are</h2>
              <p className="lead-text">
                For over five decades, the <strong>Dongri Cha Raja Sarvajani Ganesh Utsav Mandal</strong> has been a cornerstone of spiritual devotion and social progress in Mumbai.
              </p>
              <p>
                What began as a modest gathering of local families in 1974 has flourished into one of India’s most respected cultural and social welfare institutions. Every year, millions of devotees traverse distances to experience the divine aura of Dongri Cha Raja.
              </p>
              <p>
                Our mission extends far beyond the 10 days of Ganeshotsav. We operate year-round charitable initiatives, including mobile dispensaries, blood collection camps, disaster relief funds, and educational grants for underprivileged students.
              </p>
            </div>
            <div className="narrative-visual">
              <div className="about-image-card">
                <i className="fas fa-gopuram temple-icon"></i>
                <div className="stats-box">
                  <span className="stat-num">50+</span>
                  <span className="stat-lbl">Years of Devotion</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="section section-values">
          <div className="container">
            <h2 className="section-title text-center">Our Core Pillars</h2>
            <p className="section-subtitle">The principles that guide our mandal and community services</p>
            
            <div className="grid grid-cols-4 mt-6">
              {coreValues.map((val, idx) => (
                <div key={idx} className="card value-card">
                  <div className="value-icon">
                    <i className={`fas ${val.icon}`}></i>
                  </div>
                  <h3>{val.title}</h3>
                  <p>{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section section-timeline">
          <div className="container">
            <h2 className="section-title text-center">Historical Timeline</h2>
            <p className="section-subtitle">A journey of faith, unity, and progress</p>

            <div className="timeline-container mt-8">
              {timelineEvents.map((evt, idx) => (
                <div key={idx} className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content card">
                    <span className="timeline-year">{evt.year}</span>
                    <h3>{evt.title}</h3>
                    <p>{evt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards */}
        <section className="section section-awards">
          <div className="container text-center">
            <h2 className="section-title text-center">Awards & Recognition</h2>
            <p className="section-subtitle font-medium">Honored by the community and administration for social excellence</p>
            
            <div className="awards-flex">
              <div className="award-item">
                <i className="fas fa-award gold-trophy"></i>
                <h4>Best Social Work Mandal</h4>
                <span>Mumbai Police Department (2023)</span>
              </div>
              <div className="award-item">
                <i className="fas fa-trophy gold-trophy"></i>
                <h4>Most Eco-Friendly Pandal</h4>
                <span>BMC Green Initiative (2022)</span>
              </div>
              <div className="award-item">
                <i className="fas fa-medal gold-trophy"></i>
                <h4>Best Managed Crowd Control</h4>
                <span>Times Cultural Award (2024)</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutUs;
