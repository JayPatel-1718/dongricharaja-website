import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import './RecentGallery.css';

const RecentGallery = () => {
  const { galleryPhotos } = useData();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);

  const photos = galleryPhotos.slice(0, 4);

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

        <div className="gallery-simple-grid">
          {photos.length > 0 ? photos.map((photo, index) => (
            <div
              key={photo.id}
              className="gallery-card"
              onClick={() => openLightbox(photo)}
              role="button"
              tabIndex={0}
              aria-label={`View ${photo.title}`}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(photo)}
            >
              <div
                className="gallery-card-bg"
                style={{
                  backgroundImage: `url(${photo.src || photo.image})`,
                  backgroundColor: 'var(--royal-dark)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="gallery-card-overlay" />
              <div className="gallery-card-content">
                <div className="gallery-category-badge">
                  <i className={photo.icon || "fas fa-camera"}></i>
                  {photo.category}
                </div>
              </div>
              <div className="gallery-card-hover">
                <div className="gallery-zoom-icon">
                  <i className="fas fa-expand-alt"></i>
                </div>
                <div className="gallery-card-info">
                  <h3>{photo.title}</h3>
                  <p>{photo.date || 'Recent'}</p>
                </div>
              </div>
            </div>
          )) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--royal-light)' }}>
              <i className="fas fa-camera" style={{ fontSize: '32px', opacity: 0.5, marginBottom: '16px' }} />
              <p>New gallery photos will appear here soon.</p>
            </div>
          )}
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
              style={{ 
                backgroundImage: `url(${activePhoto.src || activePhoto.image})`,
                backgroundColor: 'var(--royal-dark)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}
            />
            <div className="lightbox-info">
              <div className="lightbox-category">
                <i className={activePhoto.icon || "fas fa-camera"}></i> {activePhoto.category}
              </div>
              <h3>{activePhoto.title}</h3>
              <p>{activePhoto.date || 'Recent'}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RecentGallery;