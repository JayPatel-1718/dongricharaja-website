import React from 'react';
import { Link } from 'react-router-dom';
import './QuickNavigation.css';

const QuickNavigation = () => {
  const navItems = [
    {
      icon: "fas fa-dharmachakra",
      title: "Ganeshotsav",
      desc: "Festival schedule",
      path: "/ganeshotsav",
      gradient: "linear-gradient(135deg, #E68200, #B55D00)"
    },
    {
      icon: "fas fa-hand-holding-heart",
      title: "Donate Online",
      desc: "80G tax exemption",
      path: "/donations",
      gradient: "linear-gradient(135deg, #8B0000, #5A0000)"
    },
    {
      icon: "fas fa-user-plus",
      title: "Volunteer",
      desc: "Join our team",
      path: "/devotee-services",
      gradient: "linear-gradient(135deg, #2E7D32, #1B5E20)"
    },
    {
      icon: "fas fa-calendar-check",
      title: "Event Schedule",
      desc: "Upcoming events",
      path: "/events",
      gradient: "linear-gradient(135deg, #1565C0, #0D47A1)"
    },
    {
      icon: "fas fa-hands-praying",
      title: "Seva Registration",
      desc: "Book your seva",
      path: "/devotee-services",
      gradient: "linear-gradient(135deg, #6A1B9A, #4A148C)"
    },
    {
      icon: "fas fa-images",
      title: "Photo Gallery",
      desc: "Festival memories",
      path: "/gallery",
      gradient: "linear-gradient(135deg, #D84315, #BF360C)"
    }
  ];

  return (
    <section className="quick-nav-section" id="quick-nav">
      <div className="quick-nav-bg" />
      <div className="container">
        <div className="quick-nav-header">
          <div className="quick-nav-eyebrow">
            <i className="fas fa-compass"></i> Explore
          </div>
          <h2 className="quick-nav-title">Quick Access</h2>
          <p className="quick-nav-subtitle">Find what you need in just one click</p>
        </div>
        <div className="quick-nav-grid">
          {navItems.map((item, index) => (
            <Link to={item.path} key={index} className="qnav-card">
              <div className="qnav-icon" style={{ background: item.gradient }}>
                <i className={item.icon}></i>
              </div>
              <div className="qnav-info">
                <span className="qnav-title">{item.title}</span>
                <span className="qnav-desc">{item.desc}</span>
              </div>
              <div className="qnav-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickNavigation;