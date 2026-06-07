import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './News.css';

const News = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const newsList = [
    {
      id: 1,
      tag: "Announcement",
      title: "Volunteer Registrations Open for Ganeshotsav 2026",
      date: "August 15, 2026",
      desc: "Join our dedicated service team. Applications are now open online for devotees wishing to volunteer across crowd management, medical camps, and social services.",
      icon: "fa-bullhorn"
    },
    {
      id: 2,
      tag: "Press Release",
      title: "Mandal Donates ₹5 Lakhs for Advanced Pediatric Ward Equipment",
      date: "July 24, 2026",
      desc: "In line with our community service mission, the trust executive board has approved a financial grant to install crucial ICU monitors at the local public pediatric clinic.",
      icon: "fa-newspaper"
    },
    {
      id: 3,
      tag: "Media Coverage",
      title: "Dongri Cha Raja Golden Jubilee Album Released Digitally",
      date: "June 10, 2026",
      desc: "A collection of 50 years of memorable photos, stories, and archives is now available for download on our portal, summarizing our journey since foundation in 1974.",
      icon: "fa-photo-film"
    },
    {
      id: 4,
      tag: "General News",
      title: "Eco-Friendly Clay Idol Crafting Nearing Completion",
      date: "June 02, 2026",
      desc: "Our resident sculptors confirm that the 2026 clay Ganesha idol is in its final touch-up phase. Organic marigold and turmeric pigments will be used for decoration.",
      icon: "fa-paintbrush"
    }
  ];

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
