import React from 'react';
import { Link } from 'react-router-dom';
import './UpcomingEvents.css';

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: "Grand Maha Aarti",
      dayNum: "19",
      month: "Sept",
      year: "2026",
      time: "7:00 PM",
      location: "Main Pandal, Dongri",
      category: "Spiritual",
      icon: "fas fa-fire",
      colorClass: "ec-orange",
      spots: "Open to All"
    },
    {
      id: 2,
      title: "Bhajan Sandhya – Cultural Night",
      dayNum: "21",
      month: "Sept",
      year: "2026",
      time: "8:00 PM",
      location: "Cultural Hall",
      category: "Cultural",
      icon: "fas fa-music",
      colorClass: "ec-crimson",
      spots: "Limited Seating"
    },
    {
      id: 3,
      title: "Youth Talent Competition",
      dayNum: "23",
      month: "Sept",
      year: "2026",
      time: "4:00 PM",
      location: "Community Center",
      category: "Competition",
      icon: "fas fa-trophy",
      colorClass: "ec-blue",
      spots: "Register Now"
    },
    {
      id: 4,
      title: "Visarjan Procession",
      dayNum: "28",
      month: "Sept",
      year: "2026",
      time: "10:00 AM",
      location: "Dongri to Chowpatty",
      category: "Procession",
      icon: "fas fa-water",
      colorClass: "ec-green",
      spots: "All Welcome"
    }
  ];

  return (
    <section className="upcoming-events-section" id="upcoming-events">
      <div className="container">
        <div className="events-section-header">
          <div>
            <div className="events-eyebrow">
              <i className="fas fa-calendar-alt"></i>
              <span>What's Coming</span>
            </div>
            <h2 className="events-main-title">Upcoming Events</h2>
          </div>
          <Link to="/events" className="btn-events-all">
            View All Events <i className="fas fa-arrow-right"></i>
          </Link>
        </div>

        <div className="events-cards-grid">
          {events.map((event) => (
            <div key={event.id} className={`event-premium-card epc-${event.colorClass}`}>
              {/* Date + Icon Column */}
              <div className={`event-date-col edc-${event.colorClass}`}>
                <div className={`event-icon-circle eic-${event.colorClass}`}>
                  <i className={event.icon}></i>
                </div>
                <div className="event-date-display">
                  <span className="event-day-num">{event.dayNum}</span>
                  <span className={`event-month-abbr ema-${event.colorClass}`}>{event.month}</span>
                  <span className="event-year">{event.year}</span>
                </div>
              </div>

              {/* Info Column */}
              <div className="event-info-col">
                <div className={`event-cat-badge ecb-${event.colorClass}`}>
                  {event.category}
                </div>
                <h3 className="event-card-title">{event.title}</h3>
                <div className="event-details-list">
                  <div className="event-detail-row">
                    <i className="far fa-clock"></i>
                    <span>{event.time}</span>
                  </div>
                  <div className="event-detail-row">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="event-card-footer">
                  <span className="event-spots-label">
                    <i className="fas fa-users"></i>
                    {event.spots}
                  </span>
                  <Link to="/events" className={`btn-event-reg ber-${event.colorClass}`}>
                    Register <i className="fas fa-chevron-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;