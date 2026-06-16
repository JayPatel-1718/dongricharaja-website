import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useData } from '../../context/DataContext';
import '../Committee/Committee.css';
import './Gallery.css';

const Gallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { galleryPhotos: photos } = useData();
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredPhotos = activeFilter === "all" 
    ? photos 
    : photos.filter(p => p.category === activeFilter);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const navigateLightbox = (direction, e) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const nextIdx = (lightboxIndex + direction + filteredPhotos.length) % filteredPhotos.length;
    setLightboxIndex(nextIdx);
  };

  return (
    <>
      <Helmet>
        <title>Photo Gallery | Dongri Cha Raja</title>
        <meta name="description" content="View historical and recent photos of Ganeshotsav celebrations, decorations, VIP visits, and community outreach drives." />
      </Helmet>

      <main className="gallery-page fade-in">
        {/* Banner */}
        <section className="gallery-banner">
          <div className="banner-overlay"></div>
          <div className="container">
            <h1>Photo Gallery</h1>
            <p>Capturing the divine moments of faith, festivity, and charity</p>
          </div>
        </section>

        {/* Filter Controls */}
        <section className="section section-gallery-wall">
          <div className="container">
            <div className="gallery-filters card">
              <button 
                className={activeFilter === "all" ? "filter-btn active" : "filter-btn"} 
                onClick={() => setActiveFilter("all")}
              >
                All Photos
              </button>
              <button 
                className={activeFilter === "festival" ? "filter-btn active" : "filter-btn"} 
                onClick={() => setActiveFilter("festival")}
              >
                Festival (Darshan)
              </button>
              <button 
                className={activeFilter === "seva" ? "filter-btn active" : "filter-btn"} 
                onClick={() => setActiveFilter("seva")}
              >
                Social Activities (Seva)
              </button>
              <button 
                className={activeFilter === "deco" ? "filter-btn active" : "filter-btn"} 
                onClick={() => setActiveFilter("deco")}
              >
                Decorations
              </button>
              <button 
                className={activeFilter === "vip" ? "filter-btn active" : "filter-btn"} 
                onClick={() => setActiveFilter("vip")}
              >
                VIP Visits
              </button>
            </div>

            {/* Photo Grid */}
            <div className="gallery-masonry-grid mt-8">
              {filteredPhotos.map((photo, index) => (
                <div 
                  key={photo.id} 
                  className="gallery-card-item card"
                  onClick={() => openLightbox(index)}
                >
                  <div className="image-container-gallery">
                    <img 
                      src={photo.src} 
                      alt={photo.title}
                      onError={(e) => {
                        // Fallback placeholder if image fails or isn't generated yet
                        e.target.src = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'300' height%3D'200' viewBox%3D'0 0 300 200'%3E%3Crect width%3D'100%25' height%3D'100%25' fill%3D'%23EDE5D9'%2F%3E%3Ctext x%3D'50%25' y%3D'50%25' font-family%3D'Georgia' font-size%3D'16' fill%3D'%238B0000' text-anchor%3D'middle' dy%3D'.3em'%3E" + encodeURIComponent(photo.title) + "%3C%2Ftext%3E%3C%2Fsvg%3E";
                      }}
                    />
                    <div className="gallery-hover-overlay">
                      <i className="fas fa-expand-alt zoom-icon-gallery"></i>
                      <h4>{photo.title}</h4>
                      <span>{photo.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && (
          <div className="lightbox-modal" onClick={closeLightbox}>
            <button className="lightbox-close" onClick={closeLightbox}>
              <i className="fas fa-times"></i>
            </button>
            
            <button className="lightbox-prev" onClick={(e) => navigateLightbox(-1, e)}>
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
              <img 
                src={filteredPhotos[lightboxIndex].src} 
                alt={filteredPhotos[lightboxIndex].title}
                onError={(e) => {
                  e.target.src = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg' width%3D'800' height%3D'600' viewBox%3D'0 0 800 600'%3E%3Crect width%3D'100%25' height%3D'100%25' fill%3D'%231C0A35'%3E%3C%2Frect%3E%3Ctext x%3D'50%25' y%3D'50%25' font-family%3D'Georgia' font-size%3D'24' fill%3D'%23FFAC40' text-anchor%3D'middle' dy%3D'.3em'%3E" + encodeURIComponent(filteredPhotos[lightboxIndex].title) + "%3C%2Ftext%3E%3C%2Fsvg%3E";
                }}
              />
              <div className="lightbox-caption">
                <h3>{filteredPhotos[lightboxIndex].title}</h3>
                <p>{filteredPhotos[lightboxIndex].caption}</p>
              </div>
            </div>
            
            <button className="lightbox-next" onClick={(e) => navigateLightbox(1, e)}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}
      </main>
    </>
  );
};

export default Gallery;
