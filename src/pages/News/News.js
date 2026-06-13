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
        {/* Banner */}
        <section className="news-banner">
          <div className="banner-overlay"></div>
          <div className="container">
            <h1>News & Announcements</h1>
            <p>Stay updated with our latest activities and press coverage</p>
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
