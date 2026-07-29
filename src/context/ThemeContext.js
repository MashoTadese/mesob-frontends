// ============================================================
// MESOB - Theme Context (Dark / Light Mode)
// On first visit: applies admin-set default from the API.
// After visitor manually toggles: their preference is kept.
// ============================================================
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('mesob_theme') === 'dark';
  });

  // On first visit of each session — fetch admin's default theme
  useEffect(() => {
    // sessionStorage resets on new browser session — so new visitors always get admin default
    var userChose = sessionStorage.getItem('mesob_theme_user_choice') === 'true';
    if (userChose) return;

    fetch(API + '/content')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.success) {
          var adminTheme = (data.data && data.data.site_default_theme) || 'light';
          var dark = adminTheme === 'dark';
          setIsDark(dark);
          localStorage.setItem('mesob_theme', adminTheme);
        }
      })
      .catch(function() {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    var root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('mesob_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('mesob_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    // Mark that this visitor manually chose a theme — respect it for this session
    sessionStorage.setItem('mesob_theme_user_choice', 'true');
    setIsDark(function(v) { return !v; });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
};

export default ThemeContext;
