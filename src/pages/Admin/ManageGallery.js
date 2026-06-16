import React, { useState, useRef } from 'react';
import { uploadToImgBB } from '../../utils/uploadImage';
import { useData } from '../../context/DataContext';
import './Admin.css';

const BLANK = { title: '', category: 'festival', caption: '', src: '' };
const CATEGORIES = ['festival', 'seva', 'deco', 'vip', 'aarti', 'procession', 'other'];

const ManageGallery = () => {
  const { galleryPhotos, addGalleryPhoto, editGalleryPhoto, deleteGalleryPhoto } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saved, setSaved] = useState(false);
  const [filter, setFilter] = useState('all');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const openAdd = () => {
    setEditingId(null);
    setForm(BLANK);
    setShowModal(true);
    setSaved(false);
    setUploadProgress(0);
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
    setUploadProgress(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setUploading(true);
    setUploadProgress(10); // Initial progress state
    
    try {
      const url = await uploadToImgBB(file);
      setUploadProgress(100);
      setForm(prev => ({ ...prev, src: url }));
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.src.trim()) return;
    if (editingId !== null) {
      await editGalleryPhoto(editingId, form);
    } else {
      await addGalleryPhoto(form);
    }
    setSaved(true);
    setTimeout(closeModal, 700);
  };

  const handleDelete = async (photo) => {
    await deleteGalleryPhoto(photo.id);
    setDeleteConfirm(null);
  };

  const filtered = filter === 'all' ? galleryPhotos : galleryPhotos.filter(p => p.category === filter);

  const catBadge = (cat) => ({
    festival: 'admin-badge-orange', seva: 'admin-badge-blue',
    deco: 'admin-badge-purple', vip: 'admin-badge-yellow',
    aarti: 'admin-badge-red', procession: 'admin-badge-green',
  })[cat] || 'admin-badge-gray';

  return (
    <div>
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h2><i className="fas fa-images" /> Gallery Manager</h2>
          <p>Upload photos — they appear instantly on the Gallery page and Home section. All images stored securely in Firebase.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          <i className="fas fa-cloud-upload-alt" /> Upload Photo
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
              <h3>No images yet</h3>
              <p>Click "Upload Photo" to add your first image from your device.</p>
              <button className="admin-btn admin-btn-primary" onClick={openAdd} style={{ marginTop: '12px' }}>
                <i className="fas fa-cloud-upload-alt" /> Upload Photo
              </button>
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
                      e.target.src = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='100%25' height='100%25' fill='%231a2540'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='13' fill='%237a8599' text-anchor='middle' dy='.3em'%3ENo Preview%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                  <div className="admin-gallery-item-info">
                    <h4>{photo.title}</h4>
                    <span className={`admin-badge ${catBadge(photo.category)}`}>{photo.category}</span>
                  </div>
                  {photo.caption && (
                    <p style={{ fontSize: '11px', color: 'var(--admin-text-muted)', padding: '0 10px 6px', margin: 0 }}>{photo.caption}</p>
                  )}
                  <div className="admin-gallery-item-actions">
                    <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => openEdit(photo)} style={{ flex: 1 }}>
                      <i className="fas fa-pen" />
                    </button>
                    {deleteConfirm === photo.id ? (
                      <>
                        <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(photo)}>
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

      {/* Upload Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" style={{ maxWidth: '520px' }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>
                <i className={editingId ? 'fas fa-pen' : 'fas fa-cloud-upload-alt'} />
                {editingId ? 'Edit Photo Info' : 'Upload Gallery Photo'}
              </h3>
              <button className="admin-modal-close" onClick={closeModal}>
                <i className="fas fa-times" />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="admin-modal-body">
                {/* Drag & Drop Upload Zone */}
                {!editingId && (
                  <div
                    className={`gallery-upload-zone ${dragOver ? 'drag-over' : ''} ${form.src ? 'has-image' : ''}`}
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={e => handleFileUpload(e.target.files[0])}
                    />
                    {form.src ? (
                      <div className="upload-preview">
                        <img src={form.src} alt="preview" />
                        <div className="upload-preview-overlay">
                          <i className="fas fa-check-circle" />
                          <span>Uploaded! Click to change</span>
                        </div>
                      </div>
                    ) : uploading ? (
                      <div className="upload-progress-state">
                        <i className="fas fa-cloud-upload-alt upload-spin" />
                        <p>Uploading... {uploadProgress}%</p>
                        <div className="upload-progress-bar">
                          <div className="upload-progress-fill" style={{ width: `${uploadProgress}%` }} />
                        </div>
                      </div>
                    ) : (
                      <div className="upload-idle-state">
                        <i className="fas fa-cloud-upload-alt" />
                        <p><strong>Drag & drop</strong> or click to upload</p>
                        <span>PNG, JPG, WebP supported</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Edit: show current image */}
                {editingId && form.src && (
                  <div style={{ borderRadius: '10px', overflow: 'hidden', maxHeight: '180px', marginBottom: '16px' }}>
                    <img src={form.src} alt="current" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  </div>
                )}

                <div className="admin-form-group">
                  <label>Title *</label>
                  <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Grand Maha Aarti 2025" required />
                </div>
                <div className="admin-form-group">
                  <label>Category</label>
                  <select name="category" value={form.category} onChange={handleChange}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Caption <span style={{ color: 'var(--admin-text-muted)' }}>(optional)</span></label>
                  <textarea name="caption" value={form.caption} onChange={handleChange} placeholder="Describe the moment..." rows={2} />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-outline" onClick={closeModal}>Cancel</button>
                <button
                  type="submit"
                  className={`admin-btn ${saved ? 'admin-btn-success' : 'admin-btn-primary'}`}
                  disabled={uploading || (!form.src && !editingId)}
                >
                  {saved ? <><i className="fas fa-check" /> Saved!</> : <><i className="fas fa-save" /> {editingId ? 'Update Info' : 'Save to Gallery'}</>}
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
