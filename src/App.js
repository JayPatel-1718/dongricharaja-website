import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import './styles/PageHeroes.css';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import ScrollToTop from './components/Layout/ScrollToTop';

import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import Committee from './pages/Committee/Committee';
import Ganeshotsav from './pages/Ganeshotsav/Ganeshotsav';
import SocialActivities from './pages/SocialActivities/SocialActivities';
import Events from './pages/Events/Events';
import News from './pages/News/News';
import Gallery from './pages/Gallery/Gallery';
import Donations from './pages/Donations/Donations';
import DonationSuccess from './pages/Donations/DonationSuccess';
import ReceiptPage from './pages/Donations/ReceiptPage';
import ContactUs from './pages/ContactUs/ContactUs';
import DevoteeServices from './pages/DevoteeServices/DevoteeServices';

import AdminLogin from './pages/Admin/AdminLogin';
import AdminLayout from './pages/Admin/AdminLayout';
import ProtectedRoute from './pages/Admin/ProtectedRoute';

const PublicLayout = () => (
  <div className="app-container">
    <ScrollToTop />
    <Navbar />
    <div className="navbar-spacer"></div>
    <Outlet />
    <Footer />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Routes>
          {/* Public Routes with Navbar and Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/committee" element={<Committee />} />
            <Route path="/ganeshotsav" element={<Ganeshotsav />} />
            <Route path="/social-activities" element={<SocialActivities />} />
            <Route path="/events" element={<Events />} />
            <Route path="/news" element={<News />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/donation-success" element={<DonationSuccess />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/devotee-services/*" element={<DevoteeServices />} />
          </Route>

          {/* Receipt Page – standalone, no Navbar/Footer */}
          <Route path="/receipt/:receiptId" element={<ReceiptPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;