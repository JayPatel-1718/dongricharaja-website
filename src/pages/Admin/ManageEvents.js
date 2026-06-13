import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import './Admin.css';

const BLANK = {
  title: '', category: 'spiritual', date: '', time: '', location: '', desc: ''
};

const CATEGORIES = [
  { value: 'spiritual', label: 'Spiritual', badge: 'admin-badge-orange' },
  { value: 'cultural', label: 'Cultural', badge: 'admin-badge-purple' },
  { value: 'community', label: 'Community', badge: 'admin-badge-blue' },
];

const ManageEvents = () => {
  const { events, addEvent, editEvent, deleteEvent } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saved, setSaved] = useState(false);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');

  const openAdd = () => { setEditingId(null); setForm(BLANK); setShowModal(true); setSaved(false); };
  const openEdit = (item) => { setEditingId(item.id); setForm({ ...item }); setShowModal(true); setSaved(false); };
  const closeModal = () => { setShowModal(false); setEditingId(null); setForm(BLANK); };
  const handleChange = (e) => { const { name, value } = e.target; setForm(prev => ({ ...prev, [name]: value })); };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    if (editingId !== null) editEvent(editingId, form);
    else addEvent(form);
    setSaved(true);
    setTimeout(closeModal, 600);
  };

  const filtered = events.filter(ev => {
    const matchSearch = ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.location.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'all' || ev.category === catFilter;
    return matchSearch && matchCat;
  });

  const catBadge = (cat) => CATEGORIES.find(c => c.value === cat)?.badge || 'admin-badge-gray';

  return (
    <div>
      <div className="admin-page-header">
        <div className="admin-page-header-left">
          <h2><i className="fas fa-calendar-days" /> Events</h2>
          <p>Manage events calendar — changes reflect on the Events page immediately.</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={openAdd}>
          <i className="fas fa-calendar-plus" /> Add Event
        </button>
      </div>

      {/* Search & Filter */}
      <div className="admin-card" style={{ marginBottom: '16px' }}>
        <div className="admin-card-body" style={{ padding: '12px 16px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="admin-search-bar" style={{ maxWidth: '260px' }}>
            <i className="fas fa-search" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['all', ...CATEGORIES.map(c => c.value)].map(cat => (
              <button
                key={cat}
                className={`admin-btn admin-btn-sm ${catFilter === cat ? 'admin-btn-primary' : 'admin-btn-outline'}`}
                onClick={() => setCatFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--admin-text-muted)' }}>
            {filtered.length} event{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Event Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7}>
                  <div className="admin-empty-state">
                    <i className="fas fa-calendar-xmark" />
                    <h3>No events found</h3>
                    <p>Try a different search or add a new event.</p>
                  </div>
                </td></tr>
              ) : filtered.map((ev, idx) => (
                <tr key={ev.id}>
                  <td style={{ color: 'var(--admin-text-muted)' }}>{idx + 1}</td>
                  <td style={{ fontWeight: 600, maxWidth: '200px' }}>{ev.title}</td>
                  <td><span className={`admin-badge ${catBadge(ev.category)}`}>{ev.category}</span></td>
                  <td style={{ color: 'var(--admin-text-muted)', whiteSpace: 'nowrap' }}>{ev.date}</td>
                  <td style={{ color: 'var(--admin-text-muted)', whiteSpace: 'nowrap' }}>{ev.time}</td>
                  <td style={{ color: 'var(--admin-text-muted)' }}>{ev.location}</td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => openEdit(ev)}>
                        <i className="fas fa-pen" /> Edit
                      </button>
                      {deleteConfirm === ev.id ? (
                        <>
                          <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => { deleteEvent(ev.id); setDeleteConfirm(null); }}>
                            <i className="fas fa-check" /> Yes
                          </button>
                          <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => setDeleteConfirm(null)}>No</button>
                        </>
                      ) : (
                        <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => setDeleteConfirm(ev.id)}>
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
              <h3><i className={editingId ? 'fas fa-pen' : 'fas fa-calendar-plus'} /> {editingId ? 'Edit Event' : 'Add New Event'}</h3>
              <button className="admin-modal-close" onClick={closeModal}><i className="fas fa-times" /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Event Title *</label>
                  <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Grand Maha Aarti" required />
                </div>
                <div className="admin-form-group">
                  <label>Description</label>
                  <textarea name="desc" value={form.desc} onChange={handleChange} placeholder="Describe the event..." rows={3} />
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Category</label>
                    <select name="category" value={form.category} onChange={handleChange}>
                      {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label>Location</label>
                    <input name="location" value={form.location} onChange={handleChange} placeholder="Main Pandal" />
                  </div>
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Date</label>
                    <input name="date" value={form.date} onChange={handleChange} placeholder="Sept 19, 2026" />
                  </div>
                  <div className="admin-form-group">
                    <label>Time</label>
                    <input name="time" value={form.time} onChange={handleChange} placeholder="7:00 PM" />
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-btn admin-btn-outline" onClick={closeModal}>Cancel</button>
                <button type="submit" className={`admin-btn ${saved ? 'admin-btn-success' : 'admin-btn-primary'}`}>
                  {saved ? <><i className="fas fa-check" /> Saved!</> : <><i className="fas fa-save" /> {editingId ? 'Update' : 'Add'} Event</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
