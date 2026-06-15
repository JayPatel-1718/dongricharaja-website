import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { collection, onSnapshot, doc, setDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

// ─── DEFAULT DATA (hardcoded fallbacks) ─────────────────────────────────────

const DEFAULT_SETTINGS = {
  adminPassword: '123',
  siteName: 'Dongri Cha Raja',
  heroStats: {
    yearsLegacy: '50+',
    devotees: '2.5M+',
    sevaPrograms: '100+'
  }
};

// ─── FIRESTORE HELPERS ─────────────────────────────────────────────────────────

const COLLECTIONS = {
  ANNOUNCEMENTS: 'announcements',
  GALLERY: 'gallery',
  EVENTS: 'events',
  NEWS: 'news',
  DONATIONS: 'donations',
  SETTINGS: 'settings',
};

// ─── CONTEXT ─────────────────────────────────────────────────────────────────

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [announcements, setAnnouncementsState] = useState([]);
  const [galleryPhotos, setGalleryState] = useState([]);
  const [events, setEventsState] = useState([]);
  const [news, setNewsState] = useState([]);
  const [donations, setDonationsState] = useState([]);
  const [settings, setSettingsState] = useState(DEFAULT_SETTINGS);

  // Setup Firestore listeners and initial populate
  useEffect(() => {
    // Populate default data if empty (Disabled to prevent getDocs abort errors during auth state change)
    // populateInitialData(COLLECTIONS.ANNOUNCEMENTS, DEFAULT_ANNOUNCEMENTS);
    // populateInitialData(COLLECTIONS.GALLERY, DEFAULT_GALLERY);
    // populateInitialData(COLLECTIONS.EVENTS, DEFAULT_EVENTS);
    // populateInitialData(COLLECTIONS.NEWS, DEFAULT_NEWS);
    // populateInitialData(COLLECTIONS.SETTINGS, DEFAULT_SETTINGS);

    // Listeners
    const unsubAnnouncements = onSnapshot(collection(db, COLLECTIONS.ANNOUNCEMENTS), (snap) => {
      setAnnouncementsState(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.warn('Announcements snapshot error:', error.message));
    
    const unsubGallery = onSnapshot(collection(db, COLLECTIONS.GALLERY), (snap) => {
      setGalleryState(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.warn('Gallery snapshot error:', error.message));

    const unsubEvents = onSnapshot(collection(db, COLLECTIONS.EVENTS), (snap) => {
      setEventsState(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.warn('Events snapshot error:', error.message));

    const unsubNews = onSnapshot(collection(db, COLLECTIONS.NEWS), (snap) => {
      setNewsState(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.warn('News snapshot error:', error.message));

    const unsubDonations = onSnapshot(collection(db, COLLECTIONS.DONATIONS), (snap) => {
      setDonationsState(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.warn('Donations snapshot error:', error.message));

    const unsubSettings = onSnapshot(doc(db, COLLECTIONS.SETTINGS, 'main'), (docSnap) => {
      if (docSnap.exists()) {
        setSettingsState(docSnap.data());
      }
    }, (error) => console.warn('Settings snapshot error:', error.message));

    return () => {
      unsubAnnouncements();
      unsubGallery();
      unsubEvents();
      unsubNews();
      unsubDonations();
      unsubSettings();
    };
  }, []);

  // ── Announcements ──
  const updateAnnouncements = useCallback(async (list) => {
    // Overwriting entire lists is complex in Firestore without a batch, typically we manage items
  }, []);
  const addAnnouncement = useCallback(async (item) => {
    await addDoc(collection(db, COLLECTIONS.ANNOUNCEMENTS), item);
  }, []);
  const editAnnouncement = useCallback(async (id, updated) => {
    await updateDoc(doc(db, COLLECTIONS.ANNOUNCEMENTS, id), updated);
  }, []);
  const deleteAnnouncement = useCallback(async (id) => {
    await deleteDoc(doc(db, COLLECTIONS.ANNOUNCEMENTS, id));
  }, []);

  // ── Gallery ──
  const updateGallery = useCallback(async (list) => {}, []);
  const addGalleryPhoto = useCallback(async (item) => {
    await addDoc(collection(db, COLLECTIONS.GALLERY), item);
  }, []);
  const editGalleryPhoto = useCallback(async (id, updated) => {
    await updateDoc(doc(db, COLLECTIONS.GALLERY, id), updated);
  }, []);
  const deleteGalleryPhoto = useCallback(async (id) => {
    await deleteDoc(doc(db, COLLECTIONS.GALLERY, id));
  }, []);

  // ── Events ──
  const updateEvents = useCallback(async (list) => {}, []);
  const addEvent = useCallback(async (item) => {
    await addDoc(collection(db, COLLECTIONS.EVENTS), item);
  }, []);
  const editEvent = useCallback(async (id, updated) => {
    await updateDoc(doc(db, COLLECTIONS.EVENTS, id), updated);
  }, []);
  const deleteEvent = useCallback(async (id) => {
    await deleteDoc(doc(db, COLLECTIONS.EVENTS, id));
  }, []);

  // ── News ──
  const updateNews = useCallback(async (list) => {}, []);
  const addNews = useCallback(async (item) => {
    await addDoc(collection(db, COLLECTIONS.NEWS), item);
  }, []);
  const editNews = useCallback(async (id, updated) => {
    await updateDoc(doc(db, COLLECTIONS.NEWS, id), updated);
  }, []);
  const deleteNews = useCallback(async (id) => {
    await deleteDoc(doc(db, COLLECTIONS.NEWS, id));
  }, []);

  // ── Donations ──
  const addDonation = useCallback(async (tx) => {
    await addDoc(collection(db, COLLECTIONS.DONATIONS), { ...tx, recordedAt: new Date().toISOString() });
  }, []);
  const clearDonations = useCallback(async () => {
    // To clear all, you'd need to fetch and delete each or manage via admin SDK
  }, []);

  // ── Settings ──
  const updateSettings = useCallback(async (updated) => {
    await setDoc(doc(db, COLLECTIONS.SETTINGS, 'main'), updated, { merge: true });
  }, []);

  // ── Reset all to defaults ──
  const resetAllToDefaults = useCallback(() => {
    console.warn("Reset to defaults disabled on Firebase migration.");
  }, []);

  const value = {
    announcements,
    galleryPhotos,
    events,
    news,
    donations,
    settings,
    // Announcements
    updateAnnouncements, addAnnouncement, editAnnouncement, deleteAnnouncement,
    // Gallery
    updateGallery, addGalleryPhoto, editGalleryPhoto, deleteGalleryPhoto,
    // Events
    updateEvents, addEvent, editEvent, deleteEvent,
    // News
    updateNews, addNews, editNews, deleteNews,
    // Donations
    addDonation, clearDonations,
    // Settings
    updateSettings,
    // Reset
    resetAllToDefaults,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};

export default DataContext;
