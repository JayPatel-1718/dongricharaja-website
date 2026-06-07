import React from 'react';
import { Link } from 'react-router-dom';
import './Sponsors.css';

const Sponsors = () => {
  const sponsors = [
    { id: 1, name: "Reliance Foundation", type: "Gold Sponsor", icon: "fas fa-gem", color: "#FFD700" },
    { id: 2, name: "HDFC Bank", type: "Silver Sponsor", icon: "fas fa-university", color: "#C0C0C0" },
    { id: 3, name: "Tata Trust", type: "Community Partner", icon: "fas fa-handshake", color: "#E68200" },
    { id: 4, name: "Maharashtra Tourism", type: "Government Partner", icon: "fas fa-landmark", color: "#1565C0" },
    { id: 5, name: "Star Sports", type: "Media Partner", icon: "fas fa-broadcast-tower", color: "#E53935" },
    { id: 6, name: "BookMyShow", type: "Tech Partner", icon: "fas fa-ticket-alt", color: "#E91E63" }
  ];

  return (
    <section className="sponsors-section" id="sponsors">
      <div className="container">
        <div className="sponsors-header">
          <div className="section-eyebrow-dark">
            <i className="fas fa-star"></i> Our Partners
          </div>
          <h2 className="section-title-dark">Sponsors & Supporters</h2>
          <p className="sponsors-subtitle">
            Grateful to our valued sponsors who make Ganeshotsav possible year after year.
          </p>
        </div>

        <div className="sponsors-ticker-wrapper">
          <div className="sponsors-ticker">
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <div key={index} className="sponsor-card">
                <div className="sponsor-icon" style={{ '--sponsor-color': sponsor.color }}>
                  <i className={sponsor.icon}></i>
                </div>
                <div className="sponsor-info">
                  <p className="sponsor-name">{sponsor.name}</p>
                  <p className="sponsor-type">{sponsor.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sponsor-cta-box">
          <div className="sponsor-cta-text">
            <i className="fas fa-handshake sponsor-cta-icon"></i>
            <div>
              <h3>Become a Sponsor for Ganeshotsav 2026</h3>
              <p>Associate your brand with Mumbai's most celebrated Ganesh festival. Reach millions of devotees.</p>
            </div>
          </div>
          <Link to="/contact-us" className="btn-become-sponsor">
            <i className="fas fa-envelope"></i>
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;