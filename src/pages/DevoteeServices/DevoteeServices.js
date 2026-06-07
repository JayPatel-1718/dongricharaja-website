import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-hot-toast';
import './DevoteeServices.css';

const DevoteeServices = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState("vip");
  const [isProcessing, setIsProcessing] = useState(false);

  // VIP Pass State
  const [vipForm, setVipForm] = useState({
    name: "",
    email: "",
    phone: "",
    members: "2",
    date: "2026-09-19",
    slot: "Morning (8:00 AM - 12:00 PM)"
  });
  const [generatedPass, setGeneratedPass] = useState(null);

  // Seva State
  const [sevaForm, setSevaForm] = useState({
    name: "",
    gotra: "",
    sevaType: "Abhishek Puja",
    date: "2026-09-19"
  });

  // Volunteer State
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    email: "",
    phone: "",
    skill: "Crowd Control"
  });

  const handleVipChange = (e) => {
    const { name, value } = e.target;
    setVipForm(prev => ({ ...prev, [name]: value }));
  };

  const handleVipSubmit = (e) => {
    e.preventDefault();
    if (!vipForm.name.trim() || !vipForm.phone.trim()) {
      toast.error("Please fill in your name and phone number.");
      return;
    }

    setIsProcessing(true);
    toast.loading("Booking VIP Darshan slot...", { id: "vip" });

    setTimeout(() => {
      setIsProcessing(false);
      const ticketId = "DCR-VIP-" + Math.floor(10000 + Math.random() * 90000);
      setGeneratedPass({
        ...vipForm,
        ticketId,
        bookingDate: new Date().toLocaleDateString('en-IN')
      });
      toast.success("VIP Pass booked successfully! Download your pass below.", { id: "vip" });
    }, 1500);
  };

  const handleSevaSubmit = (e) => {
    e.preventDefault();
    if (!sevaForm.name.trim()) {
      toast.error("Please enter devotee name.");
      return;
    }
    setIsProcessing(true);
    toast.loading("Registering Seva...", { id: "seva" });

    setTimeout(() => {
      setIsProcessing(false);
      toast.success(`Seva "${sevaForm.sevaType}" registered successfully! We will mail the details.`, { id: "seva" });
      setSevaForm({ name: "", gotra: "", sevaType: "Abhishek Puja", date: "2026-09-19" });
    }, 1200);
  };

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    if (!volunteerForm.name.trim() || !volunteerForm.phone.trim()) {
      toast.error("Please enter your name and phone number.");
      return;
    }
    setIsProcessing(true);
    toast.loading("Submitting Volunteer Application...", { id: "volunteer" });

    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Application received! Our volunteer captains will contact you soon.", { id: "volunteer" });
      setVolunteerForm({ name: "", email: "", phone: "", skill: "Crowd Control" });
    }, 1200);
  };

  return (
    <>
      <Helmet>
        <title>Devotee Services Portal | Dongri Cha Raja</title>
        <meta name="description" content="Book VIP Darshan passes, register for seva, apply as a volunteer, and view real-time queue crowd trackers." />
      </Helmet>

      <main className="services-page fade-in">
        {/* Banner */}
        <section className="services-banner">
          <div className="banner-overlay"></div>
          <div className="container">
            <h1>Devotee Services</h1>
            <p>Access virtual bookings, volunteer lists, and real-time Pandal feeds</p>
          </div>
        </section>

        {/* Dashboard Tabs Layout */}
        <section className="section section-services-dashboard">
          <div className="container">
            <div className="dashboard-grid-layout">
              {/* Sidebar Menu */}
              <div className="dashboard-sidebar card">
                <h3>Services Directory</h3>
                <nav className="dashboard-nav mt-4">
                  <button 
                    className={activeTab === "vip" ? "nav-item-btn active" : "nav-item-btn"}
                    onClick={() => setActiveTab("vip")}
                  >
                    <i className="fas fa-ticket-alt"></i> VIP Darshan Pass
                  </button>
                  <button 
                    className={activeTab === "seva" ? "nav-item-btn active" : "nav-item-btn"}
                    onClick={() => setActiveTab("seva")}
                  >
                    <i className="fas fa-gopuram"></i> Puja & Seva Booking
                  </button>
                  <button 
                    className={activeTab === "volunteer" ? "nav-item-btn active" : "nav-item-btn"}
                    onClick={() => setActiveTab("volunteer")}
                  >
                    <i className="fas fa-people-carry-box"></i> Register as Volunteer
                  </button>
                  <button 
                    className={activeTab === "tracker" ? "nav-item-btn active" : "nav-item-btn"}
                    onClick={() => setActiveTab("tracker")}
                  >
                    <i className="fas fa-video"></i> Live Crowd Tracker
                  </button>
                </nav>
              </div>

              {/* Main Content Area */}
              <div className="dashboard-main-content">
                {/* 1. VIP PASS BOOKING */}
                {activeTab === "vip" && (
                  <div className="dashboard-panel-view fade-in">
                    <div className="panel-header-desc">
                      <h2>VIP Darshan Pass</h2>
                      <p>Book priority queue access for your family during Ganeshotsav. Skip long lines and get close to the deity.</p>
                    </div>

                    {!generatedPass ? (
                      <div className="card panel-card-form mt-6">
                        <form onSubmit={handleVipSubmit}>
                          <div className="form-group">
                            <label>Primary Devotee Name *</label>
                            <input 
                              type="text" 
                              name="name"
                              value={vipForm.name}
                              onChange={handleVipChange}
                              placeholder="Enter your name" 
                              className="form-control"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 mt-3" style={{ gap: '16px' }}>
                            <div className="form-group">
                              <label>Phone Number *</label>
                              <input 
                                type="tel" 
                                name="phone"
                                value={vipForm.phone}
                                onChange={handleVipChange}
                                placeholder="10-digit number" 
                                className="form-control"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Email Address</label>
                              <input 
                                type="email" 
                                name="email"
                                value={vipForm.email}
                                onChange={handleVipChange}
                                placeholder="yourname@gmail.com" 
                                className="form-control"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 mt-3" style={{ gap: '16px' }}>
                            <div className="form-group">
                              <label>Number of Members</label>
                              <select 
                                name="members" 
                                value={vipForm.members}
                                onChange={handleVipChange}
                                className="form-control"
                              >
                                <option value="1">1 Person</option>
                                <option value="2">2 People</option>
                                <option value="3">3 People</option>
                                <option value="4">4 People</option>
                                <option value="5">5 People (Max)</option>
                              </select>
                            </div>
                            
                            <div className="form-group">
                              <label>Preferred Date</label>
                              <input 
                                type="date" 
                                name="date"
                                min="2026-09-19"
                                max="2026-09-28"
                                value={vipForm.date}
                                onChange={handleVipChange}
                                className="form-control"
                              />
                            </div>

                            <div className="form-group">
                              <label>Preferred Time Slot</label>
                              <select 
                                name="slot" 
                                value={vipForm.slot}
                                onChange={handleVipChange}
                                className="form-control"
                              >
                                <option value="Morning (8:00 AM - 12:00 PM)">Morning (8am - 12pm)</option>
                                <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12pm - 4pm)</option>
                                <option value="Evening (4:00 PM - 8:00 PM)">Evening (4pm - 8pm)</option>
                                <option value="Night (8:00 PM - 12:00 AM)">Night (8pm - 12am)</option>
                              </select>
                            </div>
                          </div>

                          <button 
                            type="submit" 
                            className="btn btn-primary mt-6"
                            style={{ width: '100%' }}
                            disabled={isProcessing}
                          >
                            {isProcessing ? "Processing Booking..." : "Submit Pass Booking"}
                          </button>
                        </form>
                      </div>
                    ) : (
                      <div className="pass-output-area mt-6">
                        <div className="ticket-card-visual">
                          <div className="ticket-header-block">
                            <i className="fas fa-om ticket-logo"></i>
                            <div>
                              <h4>DONGRI CHA RAJA</h4>
                              <span>VIP DARSHAN PASS · 2026</span>
                            </div>
                          </div>
                          
                          <div className="ticket-body-block">
                            <div className="ticket-detail">
                              <span className="lbl">Devotee Name</span>
                              <span className="val">{generatedPass.name}</span>
                            </div>
                            <div className="ticket-detail">
                              <span className="lbl">Members Slot</span>
                              <span className="val">{generatedPass.members} Pax</span>
                            </div>
                            <div className="ticket-detail">
                              <span className="lbl">Preferred Date</span>
                              <span className="val">{new Date(generatedPass.date).toLocaleDateString('en-IN', {day:'numeric', month:'short'})}</span>
                            </div>
                            <div className="ticket-detail">
                              <span className="lbl">Time Slot</span>
                              <span className="val">{generatedPass.slot}</span>
                            </div>
                            <div className="ticket-detail full-width">
                              <span className="lbl">Pass Reference Code</span>
                              <span className="val font-semibold text-primary">{generatedPass.ticketId}</span>
                            </div>
                          </div>

                          <div className="ticket-barcode-block">
                            <div className="mock-barcode-lines">
                              {Array.from({ length: 30 }).map((_, i) => (
                                <div 
                                  key={i} 
                                  className="barcode-line" 
                                  style={{ width: Math.random() > 0.4 ? '3px' : '1.5px', marginRight: Math.random() > 0.5 ? '2px' : '1px' }}
                                ></div>
                              ))}
                            </div>
                            <span className="barcode-number">{generatedPass.ticketId}</span>
                          </div>
                        </div>

                        <div className="buttons-row mt-6">
                          <button className="btn btn-primary" onClick={() => window.print()}>
                            <i className="fas fa-print"></i> Print Ticket Pass
                          </button>
                          <button className="btn btn-outline" onClick={() => setGeneratedPass(null)}>
                            Book Another Pass
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. SEVA PUJA BOOKING */}
                {activeTab === "seva" && (
                  <div className="dashboard-panel-view fade-in">
                    <div className="panel-header-desc">
                      <h2>Puja & Seva Bookings</h2>
                      <p>Book online sevas to offer prayers directly in your family name. The prasad package will be shipped directly to your billing address.</p>
                    </div>

                    <div className="card panel-card-form mt-6">
                      <form onSubmit={handleSevaSubmit}>
                        <div className="form-group">
                          <label>Devotee Name *</label>
                          <input 
                            type="text" 
                            placeholder="Enter Name for Sankalpa"
                            value={sevaForm.name}
                            onChange={(e) => setSevaForm(prev => ({ ...prev, name: e.target.value }))}
                            className="form-control"
                            required
                          />
                        </div>

                        <div className="form-group mt-3">
                          <label>Gotra (Optional)</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Kashyap"
                            value={sevaForm.gotra}
                            onChange={(e) => setSevaForm(prev => ({ ...prev, gotra: e.target.value }))}
                            className="form-control"
                          />
                        </div>

                        <div className="grid grid-cols-2 mt-3" style={{ gap: '16px' }}>
                          <div className="form-group">
                            <label>Seva / Offering Type</label>
                            <select 
                              value={sevaForm.sevaType}
                              onChange={(e) => setSevaForm(prev => ({ ...prev, sevaType: e.target.value }))}
                              className="form-control"
                            >
                              <option value="Abhishek Puja">Sankalpa Abhishek Puja (₹501)</option>
                              <option value="Modak Archana">108 Modak Archana Seva (₹1001)</option>
                              <option value="Pushpa Puja">Grand Garland Flower Seva (₹1501)</option>
                              <option value="Annadanam Seva">Mahaprasad Lunch Support (₹2501)</option>
                            </select>
                          </div>
                          
                          <div className="form-group">
                            <label>Date of Offering</label>
                            <input 
                              type="date" 
                              min="2026-09-19"
                              max="2026-09-28"
                              value={sevaForm.date}
                              onChange={(e) => setSevaForm(prev => ({ ...prev, date: e.target.value }))}
                              className="form-control"
                            />
                          </div>
                        </div>

                        <button 
                          type="submit" 
                          className="btn btn-primary mt-6"
                          style={{ width: '100%' }}
                        >
                          <i className="fas fa-hands-praying"></i> Register Seva & Proceed
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* 3. VOLUNTEER SIGNUP */}
                {activeTab === "volunteer" && (
                  <div className="dashboard-panel-view fade-in">
                    <div className="panel-header-desc">
                      <h2>Volunteer Registration</h2>
                      <p>Be part of the massive operation. Support crowd flows, medical stations, or prasad kitchens during Ganeshotsav.</p>
                    </div>

                    <div className="card panel-card-form mt-6">
                      <form onSubmit={handleVolunteerSubmit}>
                        <div className="form-group">
                          <label>Full Name *</label>
                          <input 
                            type="text" 
                            placeholder="Enter your name"
                            value={volunteerForm.name}
                            onChange={(e) => setVolunteerForm(prev => ({ ...prev, name: e.target.value }))}
                            className="form-control"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 mt-3" style={{ gap: '16px' }}>
                          <div className="form-group">
                            <label>Phone Number *</label>
                            <input 
                              type="tel" 
                              placeholder="10-digit number"
                              value={volunteerForm.phone}
                              onChange={(e) => setVolunteerForm(prev => ({ ...prev, phone: e.target.value }))}
                              className="form-control"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>Email Address</label>
                            <input 
                              type="email" 
                              placeholder="yourname@gmail.com"
                              value={volunteerForm.email}
                              onChange={(e) => setVolunteerForm(prev => ({ ...prev, email: e.target.value }))}
                              className="form-control"
                            />
                          </div>
                        </div>

                        <div className="form-group mt-3">
                          <label>Interested Department / Skill</label>
                          <select 
                            value={volunteerForm.skill}
                            onChange={(e) => setVolunteerForm(prev => ({ ...prev, skill: e.target.value }))}
                            className="form-control"
                          >
                            <option value="Crowd Control">Darshan Queue Crowd Management</option>
                            <option value="Medical Seva">First Aid & Medical Camps Seva</option>
                            <option value="Langar Seva">Annadanam Langar Food Services</option>
                            <option value="Logistics">Prasad Packing & Pandal Logistics</option>
                            <option value="Social Media">Official Media Coverage & Photography</option>
                          </select>
                        </div>

                        <button 
                          type="submit" 
                          className="btn btn-primary mt-6"
                          style={{ width: '100%' }}
                        >
                          <i className="fas fa-handshake"></i> Apply as Volunteer
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* 4. LIVE CROWD TRACKER */}
                {activeTab === "tracker" && (
                  <div className="dashboard-panel-view fade-in">
                    <div className="panel-header-desc">
                      <h2>Real-time Crowd & Queue Tracker</h2>
                      <p>View current queue lengths and estimated waiting times to plan your physical visit.</p>
                    </div>

                    <div className="tracker-panels mt-6">
                      {/* Metric Indicator */}
                      <div className="queue-status-card card text-center">
                        <span className="lbl text-sm">Darshan Waiting Time</span>
                        <div className="pulse-wrapper mt-2">
                          <span className="pulse-dot"></span>
                          <span className="waiting-val text-3xl font-extrabold">45 Mins</span>
                        </div>
                        <p className="secondary-info mt-2">Queue status: <strong>NORMAL FLOW</strong>. Best time to visit is now.</p>
                      </div>

                      {/* Mock Camera Feeds */}
                      <div className="camera-grid mt-6">
                        <div className="camera-feed-card card">
                          <div className="video-viewport-mock">
                            <span className="camera-id">CAM 01: PANDAL ENTRANCE GATE</span>
                            <div className="scanline"></div>
                            <div className="recording-dot"></div>
                            <i className="fas fa-users video-crowd-icon"></i>
                            <div className="dummy-overlay-feed">LIVE STREAM FEED SIMULATION</div>
                          </div>
                          <div className="card-body py-3">
                            <h4 className="font-semibold">Pandal Gateway Line</h4>
                            <span className="text-xs text-gray">Crowd density: <strong>MEDIUM (approx 350 devotees)</strong></span>
                          </div>
                        </div>

                        <div className="camera-feed-card card">
                          <div className="video-viewport-mock dark-view">
                            <span className="camera-id">CAM 02: INNER SABHA MANDAP</span>
                            <div className="scanline"></div>
                            <div className="recording-dot"></div>
                            <i className="fas fa-gopuram video-crowd-icon"></i>
                            <div className="dummy-overlay-feed">LIVE STREAM FEED SIMULATION</div>
                          </div>
                          <div className="card-body py-3">
                            <h4 className="font-semibold">Main Throne Darshan Stage</h4>
                            <span className="text-xs text-gray">Flow status: <strong>STEADY (Moving queue)</strong></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default DevoteeServices;
