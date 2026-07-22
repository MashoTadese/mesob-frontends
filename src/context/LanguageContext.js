// ============================================================
// MESOB - Language Context
// English | Amharic | Afaan Oromo
//
// LOGIC:
//   • First-time visitor → fetches admin's default language
//     from the API and applies it (e.g. Afaan Oromo)
//   • After visitor manually changes language → that choice
//     is saved and respected on future visits
// ============================================================
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext(null);

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const LANGUAGES = [
  { code: 'en', label: 'English',     nativeLabel: 'English',      flag: 'EN' },
  { code: 'am', label: 'Amharic',     nativeLabel: 'አማርኛ',         flag: 'AM' },
  { code: 'or', label: 'Afaan Oromo', nativeLabel: 'Afaan Oromoo', flag: 'OR' },
];

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();

  // Start with whatever is stored (or 'or' as hard fallback)
  const [currentLang, setCurrentLang] = useState(
    () => localStorage.getItem('mesob_lang') || 'or'
  );

  useEffect(() => {
    document.documentElement.setAttribute('lang', currentLang);
  }, [currentLang]);

  // On every mount: if user has NOT manually chosen a language,
  // always apply whatever the admin set as the site default.
  useEffect(() => {
    var userChose = localStorage.getItem('mesob_lang_user_choice') === 'true';
    if (userChose) return; // respect user's manual selection

    fetch(API + '/content')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.success) {
          var adminLang = (data.data && data.data.site_default_lang) || 'or';
          // Apply admin's default regardless of what's in localStorage
          i18n.changeLanguage(adminLang);
          localStorage.setItem('mesob_lang', adminLang);
          setCurrentLang(adminLang);
          document.documentElement.setAttribute('lang', adminLang);
        }
      })
      .catch(function () {
        // API not reachable — keep 'or' as fallback
        var stored = localStorage.getItem('mesob_lang') || 'or';
        i18n.changeLanguage(stored);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeLanguage = useCallback(
    (langCode) => {
      // User is actively choosing — remember their preference
      localStorage.setItem('mesob_lang_user_choice', 'true');
      localStorage.setItem('mesob_lang', langCode);
      i18n.changeLanguage(langCode);
      setCurrentLang(langCode);
      document.documentElement.setAttribute('lang', langCode);
    },
    [i18n]
  );

  const currentLanguage =
    LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{ currentLang, currentLanguage, changeLanguage, languages: LANGUAGES }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
};

export default LanguageContext;
