// ============================================================
// MESOB - i18n Configuration
// English | Amharic | Afaan Oromo
// ============================================================
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en';
import am from './locales/am';
import or_om from './locales/or';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      am: { translation: am },
      or: { translation: or_om },
    },
    fallbackLng: 'or',
    lng: localStorage.getItem('mesob_lang') || 'or',
    debug: false,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'mesob_lang',
    },
  });

export default i18n;
