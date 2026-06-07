import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroBanner from './HeroBanner';
import ChairmanMessage from './ChairmanMessage';
import LatestAnnouncements from './LatestAnnouncements';
import UpcomingEvents from './UpcomingEvents';
import QuickNavigation from './QuickNavigation';
import SocialActivitiesHighlights from './SocialActivitiesHighlights';
import RecentGallery from './RecentGallery';
import FeaturedVideos from './FeaturedVideos';
import DonationCTA from './DonationCTA';
import Sponsors from './Sponsors';
import './Home.css';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Dongri Cha Raja | Home - Sarvajani Ganesh Utsav Mandal</title>
        <meta name="description" content="Welcome to Dongri Cha Raja - Mumbai's most revered Ganesh Mandal. Experience divine blessings, cultural programs, and community service." />
        <meta name="keywords" content="Dongri Cha Raja, Ganesh Mandal, Ganeshotsav, Mumbai Ganesh Festival" />
        <link rel="canonical" href="https://dongricharaja.org/" />
      </Helmet>

      <main className="home-page">
        <HeroBanner />
        <ChairmanMessage />
        <LatestAnnouncements />
        <UpcomingEvents />
        <QuickNavigation />
        <SocialActivitiesHighlights />
        <RecentGallery />
        <FeaturedVideos />
        <DonationCTA />
        <Sponsors />
      </main>
    </>
  );
};

export default Home;