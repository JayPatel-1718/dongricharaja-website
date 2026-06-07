import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import './Events.css';

const Events = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const eventsList = [
    { id: 1, title: "Grand Maha Aarti", category: "spiritual", date: "Sept 19, 2026", time: "7:00 PM", location: "Main Pandal", desc: "Witness the magnificent evening group aarti with traditional musical accompaniments." },
    { id: 2, title: "Prana Pratishtha Puja", category: "spiritual", date: "Sept 19, 2026", time: "8:00 AM", location: "Main Pandal", desc: "Invoking the divine soul inside the clay Ganesha idol, marking the official opening." },
    { id: 3, title: "Bhajan Sandhya Concert", category: "cultural", date: "Sept 21, 2026", time: "8:00 PM", location: "Cultural Hall", desc: "A night of serene traditional bhajan recitals by national vocal performers." },
    { id: 4, title: "Inter-School Drawing Contest", category: "cultural", date: "Sept 22, 2026", time: "10:00 AM", location: "Community Hall", desc: "Art competition for young students on themes of nature and mythology." },
    { id: 5, title: "Blood Donation Camp", category: "community", date: "Sept 23, 2026", time: "9:00 AM - 5:00 PM", location: "Medical Seva Wing", desc: "Our annual community health collection campaign in partnership with KEM Hospital." },
    { id: 6, title: "Youth Leadership Seminar", category: "community", date: "Sept 24, 2026", time: "4:00 PM", location: "Seminar Auditorium", desc: "Interactive session on career guidelines, social responsibility, and civic duty." },
    { id: 7, title: "Chhappan Bhog Seva", category: "spiritual", date: "Sept 25, 2026", time: "12:00 PM", location: "Main Pandal", desc: "A sacred offering of 56 visual items to Lord Ganesha, followed by public lunch." },
    { id: 8, title: "Dhol Tasha Pathak Performance", category: "cultural", date: "Sept 27, 2026", time: "6:00 PM", location: "Pandal Gateway Plaza", desc: "Energizing traditional drumming performance by the mandal's local youth group." }
  ];

  const handleReminder = (title) => {
    toast.success(`Reminder set for "${title}"! We will notify you 30m before the event.`);
  };

  const filteredEvents = eventsList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || item.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <>
      <Helmet>
        <title>Upcoming Events Schedule | Dongri Cha Raja</title>
        <meta name="description" content="Search and browse upcoming Ganeshotsav activities, daily puja routines, cultural nights, and medical drives." />
      </Helmet>

      <main className="events-page fade-in">
        {/* Banner */}
        <section className="events-banner">
          <div className="banner-overlay"></div>
          <div className="container">
            <h1>Events Calendar</h1>
            <p>Participate in our religious, social, and cultural programs</p>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="section section-controls">
          <div className="container">
            <div className="controls-row card">
              <div className="search-box">
                <i className="fas fa-search search-icon"></i>
                <input 
                  type="text" 
                  placeholder="Search programs or locations..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="filter-tabs">
                <button 
                  className={activeTab === "all" ? "tab active" : "tab"} 
                  onClick={() => setActiveTab("all")}
                >
                  All Programs
                </button>
                <button 
                  className={activeTab === "spiritual" ? "tab active" : "tab"} 
                  onClick={() => setActiveTab("spiritual")}
                >
                  Spiritual
                </button>
                <button 
                  className={activeTab === "cultural" ? "tab active" : "tab"} 
                  onClick={() => setActiveTab("cultural")}
                >
                  Cultural
                </button>
                <button 
                  className={activeTab === "community" ? "tab active" : "tab"} 
                  onClick={() => setActiveTab("community")}
                >
                  Community
                </button>
              </div>
            </div>

            {/* Events Grid */}
            <div className="events-grid mt-8">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <div key={event.id} className="card event-card-detailed">
                    <div className="event-badge-category" data-cat={event.category}>
                      {event.category}
                    </div>
                    <div className="event-body-detailed">
                      <div className="event-date-side">
                        <i className="far fa-calendar-days"></i>
                        <span>{event.date}</span>
                      </div>
                      <h3>{event.title}</h3>
                      <p className="mt-2">{event.desc}</p>
                      
                      <div className="event-meta-info mt-4">
                        <span><i className="far fa-clock text-primary"></i> {event.time}</span>
                        <span><i className="fas fa-map-marker-alt text-primary"></i> {event.location}</span>
                      </div>
                    </div>
                    <div className="event-action-side">
                      <button 
                        className="btn btn-outline btn-sm"
                        onClick={() => handleReminder(event.title)}
                      >
                        <i className="far fa-bell"></i> Set Reminder
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-events card text-center p-8">
                  <i className="fas fa-calendar-xmark empty-icon"></i>
                  <h3>No events match your criteria</h3>
                  <p>Try searching for a different keyword or checking other filter categories.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Events;
