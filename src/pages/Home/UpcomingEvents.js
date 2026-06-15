import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import './UpcomingEvents.css';

const DEFAULT_EVENTS = [
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

const getCategoryStyles = (category) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('spiritual')) return { icon: 'fas fa-fire', colorClass: 'ec-orange' };
  if (cat.includes('cultural')) return { icon: 'fas fa-music', colorClass: 'ec-crimson' };
  if (cat.includes('competition')) return { icon: 'fas fa-trophy', colorClass: 'ec-blue' };
  if (cat.includes('procession')) return { icon: 'fas fa-water', colorClass: 'ec-green' };
  return { icon: 'fas fa-calendar', colorClass: 'ec-blue' };
};

const formatFirebaseEvent = (ev) => {
  // If date is YYYY-MM-DD
  let dayNum = "??";
  let month = "???";
  let year = "????";
  
  if (ev.date) {
    const d = new Date(ev.date);
    if (!isNaN(d.getTime())) {
      dayNum = d.getDate().toString();
      month = d.toLocaleString('default', { month: 'short' });
      year = d.getFullYear().toString();
    } else {
      // Fallback if they typed a string like "19 Sept 2026"
      const parts = ev.date.split(' ');
      if (parts.length >= 3) {
        dayNum = parts[0];
        month = parts[1];
        year = parts[2];
      } else {
        dayNum = "01";
        month = ev.date;
      }
    }
  }

  const styles = getCategoryStyles(ev.category);

  return {
    id: ev.id,
    title: ev.title,
    dayNum,
    month,
    year,
    time: ev.time || "",
    location: ev.location || "",
    category: ev.category || "Event",
    icon: styles.icon,
    colorClass: styles.colorClass,
    spots: ev.spots || "Join Us"
  };
};

const UpcomingEvents = () => {
  const { events: dbEvents } = useData();

  // Use database events if they exist, otherwise fallback to default hardcoded ones
  const displayEvents = dbEvents && dbEvents.length > 0 
    ? dbEvents.map(formatFirebaseEvent)
    : DEFAULT_EVENTS;

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
          {displayEvents.map((event) => (
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