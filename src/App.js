import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import Committee from './pages/Committee/Committee';
import Ganeshotsav from './pages/Ganeshotsav/Ganeshotsav';
import SocialActivities from './pages/SocialActivities/SocialActivities';
import Events from './pages/Events/Events';
import News from './pages/News/News';
import Gallery from './pages/Gallery/Gallery';
import Donations from './pages/Donations/Donations';
import ContactUs from './pages/ContactUs/ContactUs';
import DevoteeServices from './pages/DevoteeServices/DevoteeServices';
import ScrollToTop from './components/Layout/ScrollToTop';

function App() {
  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar />
      <div className="navbar-spacer"></div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/committee" element={<Committee />} />
        <Route path="/ganeshotsav" element={<Ganeshotsav />} />
        <Route path="/social-activities" element={<SocialActivities />} />
        <Route path="/events" element={<Events />} />
        <Route path="/news" element={<News />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/devotee-services/*" element={<DevoteeServices />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;