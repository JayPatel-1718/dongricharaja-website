import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import './Admin.css';

const BLANK = {
  title: '', description: '', date: '', time: '',
  type: 'important', icon: 'fas fa-fire', tag: '', imageUrl: ''
};

const TYPE_OPTIONS = [
  { value: 'important', label: 'Important', badge: 'admin-badge-red' },
  { value: 'opportunity', label: 'Opportunity', badge: 'admin-badge-blue' },
  { value: 'service', label: 'Service / Seva', badge: 'admin-badge-orange' },
  { value: 'donate', label: 'Donate', badge: 'admin-badge-green' },
];

const ICON_OPTIONS = [
  'fas fa-fire', 'fas fa-hands-holding', 'fas fa-utensils',
  'fas fa-hand-holding-heart', 'fas fa-bullhorn', 'fas fa-star',
  'fas fa-gift', 'fas fa-music', 'fas fa-book', 'fas fa-heart',
];

const ManageAnnouncements = () => {
  const { announcements, addAnnouncement, editAnnouncement, deleteAnnouncement } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saved, setSaved] = useState(false);


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
    if (!form.title.trim() || !form.description.trim()) return;
    if (editingId !== null) {
      editAnnouncement(editingId, form);
    } else {
      addAnnouncement(form);
    }
    setSaved(true);
    setTimeout(closeModal, 600);
  };

  const handleDelete = (id) => {
    deleteAnnouncement(id);
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h2><i className="fas fa-bullhorn" /> Announcements</h2>
          <p>Manage homepage announcements — changes reflect immediately on the website.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          <i className="fas fa-plus" /> Add Announcement
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Tag / Type</th>
                <th>Date</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.length === 0 ? (
                <tr><td colSpan={6}>
                  <div className="admin-empty-state">
                    <i className="fas fa-bullhorn" />
                    <h3>No announcements yet</h3>
                    <p>Click "Add Announcement" to create one.</p>
                  </div>
                </td></tr>
              ) : announcements.map((a, idx) => (
                <tr key={a.id}>
                  <td style={{ color: 'var(--admin-text-muted)' }}>{idx + 1}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <i className={a.icon} style={{ color: 'var(--admin-accent)', fontSize: '14px', width: '16px' }} />
                      <span style={{ fontWeight: 600 }}>{a.title}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`admin-badge ${
                      a.type === 'important' ? 'admin-badge-red' :
                      a.type === 'donate'    ? 'admin-badge-green' :
                      a.type === 'opportunity' ? 'admin-badge-blue' :
                      'admin-badge-orange'
                    }`}>{a.tag || a.type}</span>
                  </td>
                  <td style={{ color: 'var(--admin-text-muted)' }}>{a.date}</td>
                  <td style={{ color: 'var(--admin-text-muted)' }}>{a.time}</td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => openEdit(a)}>
                        <i className="fas fa-pen" /> Edit
                      </button>
                      {deleteConfirm === a.id ? (
                        <>
                          <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(a.id)}>
                            <i className="fas fa-check" /> Confirm
                          </button>
                          <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => setDeleteConfirm(null)}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => setDeleteConfirm(a.id)}>
                          <i className="fas fa-trash" /> Delete
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
              <h3>
                <i className={editingId ? 'fas fa-pen' : 'fas fa-plus'} />
                {editingId ? 'Edit Announcement' : 'Add New Announcement'}
              </h3>
              <button className="admin-modal-close" onClick={closeModal}>
                <i className="fas fa-times" />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Title *</label>
                  <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Grand Opening Ceremony" required />
                </div>
                <div className="admin-form-group">
                  <label>Description *</label>
                  <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the announcement..." rows={3} required />
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Date</label>
                    <input type="date" name="date" value={form.date} onChange={handleChange} />
                  </div>
                  <div className="admin-form-group">
                    <label>Time</label>
                    <input type="time" name="time" value={form.time} onChange={handleChange} />
                  </div>
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Type</label>
                    <select name="type" value={form.type} onChange={handleChange}>
                      {TYPE_OPTIONS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label>Tag Label</label>
                    <input name="tag" value={form.tag} onChange={handleChange} placeholder="e.g. LIVE EVENT" />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Icon</label>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '4px' }}>
                    {ICON_OPTIONS.map(ic => (
                      <button
                        key={ic}
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, icon: ic }))}
                        style={{
                          width: '42px', height: '42px', borderRadius: '8px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', transition: 'all 0.2s',
                          background: form.icon === ic ? 'var(--admin-accent)' : 'var(--admin-bg-light)',
                          color: form.icon === ic ? '#fff' : 'var(--admin-text)',
                          border: form.icon === ic ? '2px solid var(--admin-accent)' : '1px solid var(--admin-border)',
                          outline: 'none'
                        }}
                      >
                        <i className={ic} style={{ fontSize: '18px' }} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className={`admin-btn ${saved ? 'admin-btn-success' : 'admin-btn-primary'}`}>
                  {saved ? <><i className="fas fa-check" /> Saved!</> : <><i className="fas fa-save" /> {editingId ? 'Update' : 'Add'} Announcement</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAnnouncements;
