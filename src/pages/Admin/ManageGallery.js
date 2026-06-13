import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import './Admin.css';

const BLANK = { title: '', category: 'festival', src: '', caption: '' };

const CATEGORIES = ['festival', 'seva', 'deco', 'vip', 'other'];

const ManageGallery = () => {
  const { galleryPhotos, addGalleryPhoto, editGalleryPhoto, deleteGalleryPhoto } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saved, setSaved] = useState(false);
  const [filter, setFilter] = useState('all');

  const openAdd = () => {
    setEditingId(null);
    setForm(BLANK);
    setShowModal(true);
    setSaved(false);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({ ...item });
    setShowModal(true);
    setSaved(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(BLANK);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.src.trim()) return;
    if (editingId !== null) {
      editGalleryPhoto(editingId, form);
    } else {
      addGalleryPhoto(form);
    }
    setSaved(true);
    setTimeout(closeModal, 600);
  };

  const filtered = filter === 'all' ? galleryPhotos : galleryPhotos.filter(p => p.category === filter);

  const catBadge = (cat) => ({
    festival: 'admin-badge-orange',
    seva: 'admin-badge-blue',
    deco: 'admin-badge-purple',
    vip: 'admin-badge-yellow',
  })[cat] || 'admin-badge-gray';

  return (
    <div>
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h2><i className="fas fa-images" /> Gallery</h2>
          <p>Add, remove or update gallery images — reflects on the Gallery page.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          <i className="fas fa-plus" /> Add Image
        </button>
      </div>

      {/* Filter tabs */}
      <div className="admin-card" style={{ marginBottom: '16px' }}>
        <div className="admin-card-body" style={{ padding: '12px 16px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: 'var(--admin-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Filter:</span>
          {['all', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              className={`admin-btn admin-btn-sm ${filter === cat ? 'admin-btn-primary' : 'admin-btn-outline'}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--admin-text-muted)' }}>
            {filtered.length} image{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-body">
          {filtered.length === 0 ? (
            <div className="admin-empty-state">
              <i className="fas fa-images" />
              <h3>No images found</h3>
              <p>Click "Add Image" to upload one.</p>
            </div>
          ) : (
            <div className="admin-gallery-grid">
              {filtered.map(photo => (
                <div key={photo.id} className="admin-gallery-item">
                  <img
                    className="admin-gallery-item-img"
                    src={photo.src}
                    alt={photo.title}
                    onError={e => {
                      e.target.src = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='100%25' height='100%25' fill='%231a2540'/%3E%3Ctext x='50%25' y='45%25' font-family='sans-serif' font-size='13' fill='%237a8599' text-anchor='middle'%3ENo Preview%3C/text%3E%3Ctext x='50%25' y='62%25' font-family='sans-serif' font-size='10' fill='%234a5568' text-anchor='middle'%3E${encodeURIComponent(photo.title)}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                  <div className="admin-gallery-item-info">
                    <h4>{photo.title}</h4>
                    <span className={`admin-badge ${catBadge(photo.category)}`}>{photo.category}</span>
                  </div>
                  <div className="admin-gallery-item-actions">
                    <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => openEdit(photo)} style={{ flex: 1 }}>
                      <i className="fas fa-pen" />
                    </button>
                    {deleteConfirm === photo.id ? (
                      <>
                        <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => { deleteGalleryPhoto(photo.id); setDeleteConfirm(null); }}>
                          <i className="fas fa-check" />
                        </button>
                        <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => setDeleteConfirm(null)}>
                          <i className="fas fa-times" />
                        </button>
                      </>
                    ) : (
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => setDeleteConfirm(photo.id)}>
                        <i className="fas fa-trash" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>
                <i className={editingId ? 'fas fa-pen' : 'fas fa-plus'} />
                {editingId ? 'Edit Image' : 'Add Gallery Image'}
              </h3>
              <button className="admin-modal-close" onClick={closeModal}>
                <i className="fas fa-times" />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Image URL *</label>
                  <input
                    name="src"
                    value={form.src}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg or /images/photo.jpg"
                    required
                  />
                </div>
                {form.src && (
                  <div style={{ borderRadius: '8px', overflow: 'hidden', maxHeight: '160px' }}>
                    <img
                      src={form.src}
                      alt="preview"
                      style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}
                <div className="admin-form-group">
                  <label>Title *</label>
                  <input name="title" value={form.title} onChange={handleChange} placeholder="Photo title" required />
                </div>
                <div className="admin-form-group">
                  <label>Category</label>
                  <select name="category" value={form.category} onChange={handleChange}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Caption</label>
                  <textarea name="caption" value={form.caption} onChange={handleChange} placeholder="Describe the image..." rows={2} />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className={`admin-btn ${saved ? 'admin-btn-success' : 'admin-btn-primary'}`}>
                  {saved ? <><i className="fas fa-check" /> Saved!</> : <><i className="fas fa-save" /> {editingId ? 'Update' : 'Add'} Image</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGallery;
