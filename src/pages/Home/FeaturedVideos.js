import React, { useState } from 'react';
import './FeaturedVideos.css';

const FeaturedVideos = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  const videos = [
    {
      id: 1,
      title: "Ganeshotsav 2025 - Grand Celebration Highlights",
      youtubeId: "kXYiU_JCYtU",
      duration: "8:42",
      views: "1.2M views",
      date: "Sept 2025",
      category: "Festival Highlights",
      thumbnail: "/images/maha_aarti_gathering.jpg"
    },
    {
      id: 2,
      title: "Maha Aarti - Spectacular Evening Ceremony",
      youtubeId: "3JZ_D3ELwOQ",
      duration: "12:15",
      views: "856K views",
      date: "Sept 2025",
      category: "Aarti",
      thumbnail: "/images/dongri_cha_raja_idol.jpg"
    },
    {
      id: 3,
      title: "Idol Visarjan Procession 2025 - Ganpati Bappa Morya!",
      youtubeId: "L_jWHffIx5E",
      duration: "5:30",
      views: "642K views",
      date: "Sept 2025",
      category: "Visarjan",
      thumbnail: "/images/community_service_seva.jpg"
    }
  ];

  const openVideo = (video) => {
    setActiveVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setActiveVideo(null);
    document.body.style.overflow = '';
  };

  return (
    <section className="featured-videos-section" id="videos">
      <div className="container">
        <div className="section-header-centered">
          <div className="section-eyebrow-light">
            <i className="fab fa-youtube"></i> Official Channel
          </div>
          <h2 className="section-title-light">Featured Videos</h2>
          <p className="section-subtitle-light">
            Relive the magic of Ganeshotsav through our official video collection.
          </p>
        </div>

        <div className="videos-grid">
          {/* Featured (first) */}
          <div className="video-card video-card-featured" onClick={() => openVideo(videos[0])}>
            <div
              className="video-thumb"
              style={{ backgroundImage: `url(${videos[0].thumbnail}), linear-gradient(135deg, #1C0A35, #8B0000)` }}
            >
              <div className="video-thumb-overlay" />
              <div className="play-btn play-btn-large">
                <i className="fas fa-play"></i>
              </div>
              <div className="video-duration-badge">{videos[0].duration}</div>
              <div className="video-category-badge">{videos[0].category}</div>
            </div>
            <div className="video-info">
              <h3 className="video-title">{videos[0].title}</h3>
              <div className="video-meta">
                <span><i className="fas fa-eye"></i> {videos[0].views}</span>
                <span><i className="fas fa-calendar"></i> {videos[0].date}</span>
              </div>
            </div>
          </div>

          {/* Side videos */}
          <div className="videos-side">
            {videos.slice(1).map((video) => (
              <div key={video.id} className="video-card video-card-small" onClick={() => openVideo(video)}>
                <div
                  className="video-thumb video-thumb-small"
                  style={{ backgroundImage: `url(${video.thumbnail}), linear-gradient(135deg, #1C0A35, #8B0000)` }}
                >
                  <div className="video-thumb-overlay" />
                  <div className="play-btn">
                    <i className="fas fa-play"></i>
                  </div>
                  <div className="video-duration-badge">{video.duration}</div>
                </div>
                <div className="video-info">
                  <div className="video-category-inline">{video.category}</div>
                  <h3 className="video-title video-title-sm">{video.title}</h3>
                  <div className="video-meta">
                    <span><i className="fas fa-eye"></i> {video.views}</span>
                    <span><i className="fas fa-calendar"></i> {video.date}</span>
                  </div>
                </div>
              </div>
            ))}

            <a
              href="https://youtube.com/dongricharaja"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-youtube"
            >
              <i className="fab fa-youtube"></i>
              Visit Our YouTube Channel
              <i className="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="video-modal-backdrop" onClick={closeVideo} role="dialog" aria-modal="true" aria-label="Video player">
          <button className="video-modal-close" onClick={closeVideo} aria-label="Close video">
            <i className="fas fa-times"></i>
          </button>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="video-iframe-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="video-modal-info">
              <span className="modal-category">{activeVideo.category}</span>
              <h3>{activeVideo.title}</h3>
              <div className="video-meta-modal">
                <span><i className="fas fa-eye"></i> {activeVideo.views}</span>
                <span><i className="fas fa-clock"></i> {activeVideo.duration}</span>
                <span><i className="fas fa-calendar"></i> {activeVideo.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedVideos;