import React, { useState, useRef } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import { useData } from '../../context/DataContext';
import './Admin.css';

const BLANK = { tag: 'Announcement', title: '', date: '', desc: '', icon: 'fa-bullhorn', imageUrl: '' };

const TAGS = ['Announcement', 'Press Release', 'Media Coverage', 'General News'];

const ICONS = [
  'fa-bullhorn', 'fa-newspaper', 'fa-photo-film', 'fa-paintbrush',
  'fa-heart', 'fa-star', 'fa-book', 'fa-calendar', 'fa-trophy', 'fa-handshake',
];

const tagBadge = (tag) => ({
  'Announcement':   'admin-badge-orange',
  'Press Release':  'admin-badge-blue',
  'Media Coverage': 'admin-badge-purple',
  'General News':   'admin-badge-green',
})[tag] || 'admin-badge-gray';

const ManageNews = () => {
  const { news, addNews, editNews, deleteNews } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saved, setSaved] = useState(false);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileUpload = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setUploading(true);
    setUploadProgress(0);
    const storageRef = ref(storage, `news/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadProgress(pct);
      },
      (error) => {
        console.error("Upload error", error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setForm(prev => ({ ...prev, imageUrl: downloadURL }));
          setUploading(false);
          setUploadProgress(0);
        });
      }
    );
  };

  const openAdd = () => { setEditingId(null); setForm(BLANK); setShowModal(true); setSaved(false); };
  const openEdit = (item) => { setEditingId(item.id); setForm({ ...item }); setShowModal(true); setSaved(false); };
  const closeModal = () => { setShowModal(false); setEditingId(null); setForm(BLANK); };
  const handleChange = (e) => { const { name, value } = e.target; setForm(prev => ({ ...prev, [name]: value })); };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    if (editingId !== null) editNews(editingId, form);
    else addNews(form);
    setSaved(true);
    setTimeout(closeModal, 600);
  };

  const filtered = news.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h2><i className="fas fa-newspaper" /> News & Articles</h2>
          <p>Manage press releases and announcements — reflects on the News page.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          <i className="fas fa-pen" /> Add News Article
        </button>
      </div>

      {/* Search */}
      <div className="admin-card" style={{ marginBottom: '16px' }}>
        <div className="admin-card-body" style={{ padding: '12px 16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div className="admin-search-bar">
            <i className="fas fa-search" />
            <input type="text" placeholder="Search news..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--admin-text-muted)' }}>
            {filtered.length} article{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Tag</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5}>
                  <div className="admin-empty-state">
                    <i className="fas fa-newspaper" />
                    <h3>No news articles found</h3>
                    <p>Click "Add News Article" to create one.</p>
                  </div>
                </td></tr>
              ) : filtered.map((n, idx) => (
                <tr key={n.id}>
                  <td style={{ color: 'var(--admin-text-muted)' }}>{idx + 1}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <i className={`fas ${n.icon}`} style={{ color: 'var(--admin-accent)', fontSize: '14px', width: '16px' }} />
                      <div>
                        <div style={{ fontWeight: 600 }}>{n.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--admin-text-muted)', marginTop: '2px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {n.desc}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td><span className={`admin-badge ${tagBadge(n.tag)}`}>{n.tag}</span></td>
                  <td style={{ color: 'var(--admin-text-muted)', whiteSpace: 'nowrap' }}>{n.date}</td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => openEdit(n)}>
                        <i className="fas fa-pen" /> Edit
                      </button>
                      {deleteConfirm === n.id ? (
                        <>
                          <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => { deleteNews(n.id); setDeleteConfirm(null); }}>
                            <i className="fas fa-check" /> Yes
                          </button>
                          <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => setDeleteConfirm(null)}>No</button>
                        </>
                      ) : (
                        <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => setDeleteConfirm(n.id)}>
                          <i className="fas fa-trash" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3><i className={editingId ? 'fas fa-pen' : 'fas fa-plus'} /> {editingId ? 'Edit Article' : 'Add News Article'}</h3>
              <button className="admin-modal-close" onClick={closeModal}><i className="fas fa-times" /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Title *</label>
                  <input name="title" value={form.title} onChange={handleChange} placeholder="Article headline" required />
                </div>
                <div className="admin-form-group">
                  <label>Description *</label>
                  <textarea name="desc" value={form.desc} onChange={handleChange} placeholder="Full article content..." rows={4} required />
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Tag</label>
                    <select name="tag" value={form.tag} onChange={handleChange}>
                      {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label>Date</label>
                    <input name="date" value={form.date} onChange={handleChange} placeholder="August 15, 2026" />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Icon (FontAwesome)</label>
                  <select name="icon" value={form.icon} onChange={handleChange}>
                    {ICONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                </div>
                
                <div className="admin-form-group" style={{ marginTop: '16px' }}>
                  <label>Attachment Image (Optional)</label>
                  <div 
                    className="admin-file-drop" 
                    style={{ position: 'relative', overflow: 'hidden' }}
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      style={{ display: 'none' }} 
                      accept="image/*"
                      onChange={e => handleFileUpload(e.target.files[0])}
                    />
                    
                    {uploading ? (
                      <div className="admin-upload-progress">
                        <div className="admin-upload-spinner"><i className="fas fa-spinner fa-spin" /></div>
                        <div className="admin-upload-text">Uploading {uploadProgress}%...</div>
                        <div className="admin-upload-bar-bg">
                          <div className="admin-upload-bar-fill" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                      </div>
                    ) : form.imageUrl ? (
                      <div style={{ position: 'relative', width: '100%', height: '120px', borderRadius: '8px', overflow: 'hidden' }}>
                        <img src={form.imageUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button 
                          type="button" 
                          onClick={(e) => { e.stopPropagation(); setForm(p => ({...p, imageUrl: ''})) }}
                          style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.7)', color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer' }}
                        >
                          <i className="fas fa-times" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="admin-file-icon"><i className="fas fa-cloud-arrow-up" /></div>
                        <div className="admin-file-text">Click to upload an image</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className={`admin-btn ${saved ? 'admin-btn-success' : 'admin-btn-primary'}`}>
                  {saved ? <><i className="fas fa-check" /> Saved!</> : <><i className="fas fa-save" /> {editingId ? 'Update' : 'Add'} Article</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNews;
