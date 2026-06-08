import React, { createContext, useContext, useState } from 'react';
import en from '../locales/en';
import hi from '../locales/hi';
import mr from '../locales/mr';

const translations = { en, hi, mr };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Load from localStorage or default to 'en'
  const [language, setLanguageState] = useState(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return savedLanguage && ['en', 'hi', 'mr'].includes(savedLanguage) ? savedLanguage : 'en';
  });

  const setLanguage = (lang) => {
    if (['en', 'hi', 'mr'].includes(lang)) {
      setLanguageState(lang);
      localStorage.setItem('preferredLanguage', lang);
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        // Fallback to English translation if key not found
        let fallback = translations['en'];
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object') {
            fallback = fallback[fk];
          } else {
            fallback = null;
            break;
          }
        }
        return fallback || key;
      }
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
