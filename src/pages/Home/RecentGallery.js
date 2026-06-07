import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RecentGallery.css';

const RecentGallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);

  const photos = [
    {
      id: 1,
      title: "Grand Aarti 2025",
      category: "Aarti",
      image: "/images/maha_aarti_gathering.jpg",
      bgColor: "linear-gradient(135deg, #F67900, #8B0000)",
      icon: "fas fa-fire",
      date: "Sept 2025"
    },
    {
      id: 2,
      title: "Dhol-Tasha Pathak",
      category: "Music",
      image: "/images/gallery_dhol_tasha.jpg",
      bgColor: "linear-gradient(135deg, #E53935, #880E4F)",
      icon: "fas fa-drum",
      date: "Sept 2025"
    },
    {
      id: 3,
      title: "Devotee Gathering",
      category: "Festival",
      image: "/images/community_service_seva.jpg",
      bgColor: "linear-gradient(135deg, #1C0A35, #4A148C)",
      icon: "fas fa-users",
      date: "Sept 2025"
    },
    {
      id: 4,
      title: "Idol Decoration",
      category: "Decor",
      image: "/images/dongri_cha_raja_idol.jpg",
      bgColor: "linear-gradient(135deg, #E68200, #1C0A35)",
      icon: "fas fa-star",
      date: "Sept 2025"
    }
  ];

  const openLightbox = (photo) => {
    setActivePhoto(photo);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setActivePhoto(null);
    document.body.style.overflow = '';
  };

  return (
    <section className="recent-gallery-section" id="gallery">
      <div className="container">
        <div className="section-header-row">
          <div>
            <div className="section-eyebrow">
              <i className="fas fa-images"></i> Captured Moments
            </div>
            <h2 className="section-title">Recent Gallery</h2>
            <p className="section-subtitle">Relive the magic of our festivals through these beautiful photographs.</p>
          </div>
          <Link to="/gallery" className="btn-view-all">
            <span>View Full Gallery</span>
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>

        <div className="gallery-masonry-grid">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={`gallery-card ${index === 0 ? 'gallery-card-wide' : ''}`}
              onClick={() => openLightbox(photo)}
              role="button"
              tabIndex={0}
              aria-label={`View ${photo.title}`}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(photo)}
            >
              <div
                className="gallery-card-bg"
                style={{
                  backgroundImage: `url(${photo.image}), ${photo.bgColor}`,
                }}
              />
              <div className="gallery-card-overlay" />
              <div className="gallery-card-content">
                <div className="gallery-category-badge">
                  <i className={photo.icon}></i>
                  {photo.category}
                </div>
              </div>
              <div className="gallery-card-hover">
                <div className="gallery-zoom-icon">
                  <i className="fas fa-expand-alt"></i>
                </div>
                <div className="gallery-card-info">
                  <h3>{photo.title}</h3>
                  <p>{photo.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && activePhoto && (
        <div className="lightbox-backdrop" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close lightbox">
            <i className="fas fa-times"></i>
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div
              className="lightbox-image"
              style={{ backgroundImage: `url(${activePhoto.image}), ${activePhoto.bgColor}` }}
            />
            <div className="lightbox-info">
              <div className="lightbox-category">
                <i className={activePhoto.icon}></i> {activePhoto.category}
              </div>
              <h3>{activePhoto.title}</h3>
              <p>{activePhoto.date}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RecentGallery;