import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import './LatestAnnouncements.css';

const LatestAnnouncements = () => {
  const { announcements } = useData();


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