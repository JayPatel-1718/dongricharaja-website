import React from 'react';
import { Link } from 'react-router-dom';
import './LatestAnnouncements.css';

const LatestAnnouncements = () => {
  const announcements = [
    {
      id: 1,
      title: "Grand Opening Ceremony",
      date: "September 19, 2026",
      time: "7:00 PM",
      description: "Ganeshotsav 2026 inauguration with Maha Aarti and special cultural performances",
      type: "important",
      icon: "fas fa-fire",
      tag: "LIVE EVENT"
      },
    {
      id: 2,
      title: "Volunteers Required",
      date: "September 15, 2026",
      time: "Register by Aug 30",
      description: "Join our dedicated team of volunteers for festival arrangements and crowd management",
      type: "opportunity",
      icon: "fas fa-hands-holding",
      tag: "OPPORTUNITY"
    },
    {
      id: 3,
      title: "Annadanam Seva",
      date: "Sept 19–28, 2026",
      time: "12:00 PM & 7:00 PM",
      description: "Free wholesome meals served to all devotees throughout the 10-day festival",
      type: "service",
      icon: "fas fa-utensils",
      tag: "SEVA"
    },
    {
      id: 4,
      title: "Online Donation Portal Live",
      date: "Open Now",
      time: "24/7 Online",
      description: "Donate securely online and receive your 80G tax exemption certificate instantly",
      type: "donate",
      icon: "fas fa-hand-holding-heart",
      tag: "DONATE"
    }
  ];

  return (
    <section className="announcements-section" id="announcements">
      <div className="container">
        <div className="announcements-header">
          <div>
            <div className="ann-eyebrow">
              <i className="fas fa-bullhorn"></i>
              <span>Latest Updates</span>
            </div>
            <h2 className="ann-title">Announcements</h2>
          </div>
          <Link to="/news" className="btn-ann-all">
            View All <i className="fas fa-arrow-right"></i>
          </Link>
        </div>

        <div className="announcements-grid">
          {announcements.map((item) => (
            <div key={item.id} className={`announcement-card ann-type-${item.type}`}>
              <div className={`ann-icon-box ann-icon-${item.type}`}>
                <i className={item.icon}></i>
              </div>
              <div className="ann-body">
                <span className={`ann-tag ann-tag-${item.type}`}>{item.tag}</span>
                <h3 className="ann-card-title">{item.title}</h3>
                <p className="ann-desc">{item.description}</p>
                <div className="ann-meta">
                  <span><i className="far fa-calendar-alt"></i> {item.date}</span>
                  <span><i className="far fa-clock"></i> {item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestAnnouncements;