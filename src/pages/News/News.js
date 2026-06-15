import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useData } from '../../context/DataContext';
import './News.css';

const News = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { news: newsList } = useData();


  return (
    <>
      <Helmet>
        <title>News & Press Bulletins | Dongri Cha Raja</title>
        <meta name="description" content="Read official press statements, media reports, and community updates from the Dongri Cha Raja Utsav Mandal." />
      </Helmet>

      <main className="news-page fade-in">
        {/* Premium Newspaper Hero */}
        <section className="page-hero news-page-hero">
          <div className="news-hero-highlight" />
          <div className="news-hero-texture" />
          <div className="news-hero-columns">
            {[...Array(5)].map((_, i) => <div key={i} className="news-col-divider" />)}
          </div>
          <div className="news-hero-glow" />
          <div className="page-hero-content">
            <div className="page-hero-eyebrow">
              <i className="fas fa-newspaper" /> Latest Updates
            </div>
            <h1>News &amp; Bulletins</h1>
            <p>Official press statements, media coverage, and community updates from Dongri Cha Raja Mandal.</p>
            <div className="page-hero-breadcrumb">
              <a href="/">Home</a>
              <i className="fas fa-chevron-right" />
              <span>News</span>
            </div>
          </div>
          <div className="page-hero-wave">
            <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,0 L1440,40 L1440,60 L0,60 Z" fill="var(--royal-dark, #0D0520)" />
            </svg>
          </div>
        </section>


        {/* News Grid */}
        <section className="section section-news-list">
          <div className="container">
            <h2 className="section-title text-center">Latest Bulletins</h2>
            <p className="section-subtitle">Official statements and announcements from the board</p>

            <div className="news-grid-layout mt-6">
              {newsList.map((news) => (
                <article key={news.id} className="card news-card-detailed">
                  <div className="news-badge-tag">{news.tag}</div>
                  <div className="news-icon-badge">
                    <i className={`fas ${news.icon}`}></i>
                  </div>
                  <div className="news-content-area">
                    <span className="news-date-span"><i className="far fa-calendar"></i> {news.date}</span>
                    <h3>{news.title}</h3>
                    <p className="mt-3">{news.desc}</p>
                    <button className="btn btn-outline btn-sm mt-4">
                      Read Full Article <i className="fas fa-chevron-right btn-arrow-icon"></i>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default News;
