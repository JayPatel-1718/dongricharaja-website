import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Suppress known harmless Firebase abort errors during navigation/hot-reload
window.addEventListener('unhandledrejection', event => {
  if (event.reason && event.reason.message && event.reason.message.includes('The user aborted a request')) {
    event.preventDefault();
  }
});

root.render(
  <HelmetProvider>
    <LanguageProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <App />
      </BrowserRouter>
    </LanguageProvider>
  </HelmetProvider>
);