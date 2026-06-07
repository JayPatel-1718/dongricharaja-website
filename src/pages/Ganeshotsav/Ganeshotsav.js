import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './Ganeshotsav.css';

const Ganeshotsav = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ritualsSchedule = [
    { day: "Day 1", date: "Sept 19, 2026", ritual: "Prana Pratishtha Puja", time: "8:00 AM", desc: "Invoking the divine presence of Lord Ganesha inside the idol. Followed by grand morning aarti." },
    { day: "Day 3", date: "Sept 21, 2026", ritual: "Bhajan Sandhya", time: "8:00 PM", desc: "Devotional songs and singing session led by renowned traditional bhajan groups." },
    { day: "Day 5", date: "Sept 23, 2026", ritual: "Chhappan Bhog Seva", time: "12:00 PM", desc: "Offering of 56 organic traditional delicacies to Bappa, followed by distribution of Mahaprasad." },
    { day: "Day 8", date: "Sept 26, 2026", ritual: "Maha Satyanarayan Puja", time: "4:00 PM", desc: "Grand community prayers for wellness, peace, and prosperity of the city." },
    { day: "Day 10", date: "Sept 28, 2026", ritual: "Anant Chaturdashi Immersion", time: "9:00 AM", desc: "The grand farewell procession of Dongri Cha Raja towards Girgaon Chowpatty." }
  ];

  const highlights = [
    { title: "Eco-Friendly Ganesha", desc: "Our idol is crafted entirely using natural clay (Shadu mati) and organic water-soluble colors, ensuring zero water pollution during Visarjan." },
    { title: "Legacy of 50+ Years", desc: "Experience the unique traditional decorations themed around ancient Indian palaces and historical temples of Maharashtra." },
    { title: "24/7 Live Webcast", desc: "Devotees who cannot travel to Mumbai can seek virtual darshan through our high-definition live streaming portal." },
    { title: "Annadanam (Free Meals)", desc: "A continuous Langar serving fresh, pure vegetarian meals to over 10,000 devotees daily throughout the ten-day festival." }
  ];

  return (
    <>
      <Helmet>
        <title>Ganeshotsav 2026 | Dongri Cha Raja</title>
        <meta name="description" content="View the official Ganeshotsav festival daily schedule, timing of Maha Aarti, Pandal highlights, and directions to visit." />
      </Helmet>
      
      <main className="ganeshotsav-page fade-in">
        {/* Banner */}
        <section className="ganeshotsav-banner">
          <div className="banner-overlay"></div>
          <div className="container">
            <h1>Ganeshotsav 2026</h1>
            <p>Celebrate the Divine Festival of faith, heritage, and devotion</p>
          </div>
        </section>

        {/* Introduction */}
        <section className="section section-intro">
          <div className="container grid grid-cols-2">
            <div className="intro-text">
              <h2 className="section-title">The Legend of Dongri Cha Raja</h2>
              <p className="lead-text">A symbol of Mumbai's historic culture, unifying devotees since 1974.</p>
              <p>Known as the "King of Dongri", this deity holds a special place in the hearts of millions. Devotees believe that praying here with an earnest heart fulfills all wishes (Navas).</p>
              <p>The pandal itself represents an architectural masterpiece, designed by renowned artists using eco-friendly materials to replicate majestic temple heritage. We place utmost emphasis on maintaining a spiritual, serene, and clean environment for a seamless darshan experience.</p>
            </div>
            <div className="intro-highlights">
              <div className="highlights-box dark-glass-card">
                <h3>Key Highlights</h3>
                <ul className="highlights-list">
                  {highlights.map((hl, idx) => (
                    <li key={idx}>
                      <strong>{hl.title}:</strong> {hl.desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section className="section section-schedule">
          <div className="container">
            <h2 className="section-title text-center">Rituals & Puja Schedule</h2>
            <p className="section-subtitle">Plan your visit to join in the special pujas and high aarti events</p>
            
            <div className="schedule-table-card card mt-6">
              <div className="table-responsive">
                <table className="schedule-table">
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Date</th>
                      <th>Ritual / Program</th>
                      <th>Time</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ritualsSchedule.map((item, idx) => (
                      <tr key={idx}>
                        <td><span className="day-badge">{item.day}</span></td>
                        <td className="font-semibold">{item.date}</td>
                        <td className="ritual-name">{item.ritual}</td>
                        <td className="time-col"><i className="far fa-clock"></i> {item.time}</td>
                        <td>{item.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Directions */}
        <section className="section section-directions">
          <div className="container grid grid-cols-2">
            <div className="directions-details">
              <h2 className="section-title">How to Reach the Pandal</h2>
              <p>The Dongri Cha Raja Pandal is located in the heart of South Mumbai and is well connected by rail and road networks.</p>
              
              <ul className="route-guide">
                <li>
                  <i className="fas fa-train route-icon"></i>
                  <div>
                    <strong>By Central Railway</strong>
                    <span>Get down at <strong>Sandhurst Road Railway Station</strong> (Central Line). The pandal is a 10-minute walk from the station.</span>
                  </div>
                </li>
                <li>
                  <i className="fas fa-train-subway route-icon"></i>
                  <div>
                    <strong>By Western / Harbour Railway</strong>
                    <span>Get down at <strong>Chhatrapati Shivaji Maharaj Terminus (CSMT)</strong> or <strong>Masjid Bunder Station</strong>. Take a taxi/cab directly to Dongri (approx. 10-15 mins).</span>
                  </div>
                </li>
                <li>
                  <i className="fas fa-car route-icon"></i>
                  <div>
                    <strong>By Road / Taxi</strong>
                    <span>Navigate to "Dongri, Mumbai - 400009". Access during festival days may be restricted for heavy vehicles. Dedicated parking is available at nearby BMC parking lots.</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="directions-map">
              <div className="map-placeholder card">
                <i className="fas fa-map-location-dot map-logo-icon"></i>
                <h3>Interactive Location Map</h3>
                <p className="mt-2">Pandal Address: Dongri High Street, Dongri, Mumbai - 400009</p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-outline mt-4"
                >
                  <i className="fas fa-map-marker-alt"></i> Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Ganeshotsav;
