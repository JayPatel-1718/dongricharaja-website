import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import { useData } from '../../context/DataContext';
import './Events.css';

const Events = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const { events: eventsList } = useData();


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
