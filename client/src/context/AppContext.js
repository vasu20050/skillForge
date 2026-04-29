import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const translations = {
  en: {
    dashboard: 'Dashboard',
    learn: 'Learn',
    marketplace: 'Marketplace',
    leaderboard: 'Leaderboard',
    wallet: 'Wallet',
    profile: 'Profile',
    login: 'Login',
    joinNow: 'Join Now',
    welcome: 'Welcome',
    available: 'Available',
    credits: 'Credits',
    skills: 'Skills',
    neuralPath: 'Neural Pathfinding',
    escrowTracker: 'Shield Escrow Tracker',
    fastTrack: 'Fast-Track Internship'
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    learn: 'सीखें',
    marketplace: 'मार्केटप्लेस',
    leaderboard: 'लीडरबोर्ड',
    wallet: 'वॉलेट',
    profile: 'प्रोफ़ाइल',
    login: 'लॉगिन',
    joinNow: 'अभी जुड़ें',
    welcome: 'स्वागत है',
    available: 'उपलब्ध',
    credits: 'क्रेडिट',
    skills: 'कौशल',
    neuralPath: 'न्यूरल पाथफाइंडिंग',
    escrowTracker: 'शील्ड एस्क्रो ट्रैकर',
    fastTrack: 'फास्ट-ट्रैक इंटर्नशिप'
  },
  es: {
    dashboard: 'Panel',
    learn: 'Aprender',
    marketplace: 'Mercado',
    leaderboard: 'Clasificación',
    wallet: 'Billetera',
    profile: 'Perfil',
    login: 'Iniciar sesión',
    joinNow: 'Únete ahora',
    welcome: 'Bienvenido',
    available: 'Disponible',
    credits: 'Créditos',
    skills: 'Habilidades',
    neuralPath: 'Ruta Neuronal',
    escrowTracker: 'Rastreador de Escrow',
    fastTrack: 'Pasantía Rápida'
  }
};

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  
  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, toggleTheme, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
