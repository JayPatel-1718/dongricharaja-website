import React from 'react';

const UpcomingEventCard = () => {
  return (
    <div className="card">
      <div className="card-icon"><i className="fas fa-bell"></i></div>
      <h3>Grand Aarti & Darshan</h3>
      <div className="event-date">
        <i className="far fa-calendar-alt"></i> Sept 19, 2026 · 7:00 PM
      </div>
      <p className="body-text" style={{margin: '12px 0'}}>
        Join thousands of devotees for the grand evening aarti of Dongri Cha Raja. 
        Spiritual vibrations & divine dhuni.
      </p>
      <button className="btn-outline" style={{marginTop: 12}}>
        <i className="far fa-bell"></i> Set Reminder
      </button>
    </div>
  );
};

export default UpcomingEventCard;