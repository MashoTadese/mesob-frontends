// ============================================================
// MESOB - Navbar (Single Page smooth scroll)
// ============================================================

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaGlobe, FaChevronDown, FaSun, FaMoon } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import useScrollPosition from '../hooks/useScrollPosition';
import partnerLogo from '../assets/Image/Home/logo.png';

// Smooth scroll helper
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

// ── Language Switcher ──
const LanguageSwitcher = ({ mobile = false }) => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (mobile) {
    return (
      <div className="pt-2 border-t border-white/10">
        <p className="px-4 py-1 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
          <FaGlobe className="w-3 h-3" /> Language
        </p>
        <div className="flex gap-2 px-3 pt-1 pb-2">
          {LANGUAGES.map((lang) => (
            <button key={lang.code} onClick={() => changeLanguage(lang.code)}
              className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all border"
              style={currentLanguage.code === lang.code
                ? { backgroundColor: '#F5C400', color: '#0F1F5C', borderColor: '#F5C400' }
                : { backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}>
              <span className="block text-center">{lang.flag}</span>
              <span className="block text-center text-[10px] mt-0.5">{lang.nativeLabel}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none border"
        style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.1)' }}>
        <FaGlobe className="w-3.5 h-3.5" style={{ color: '#F5C400' }} />
        <span className="font-semibold" style={{ color: '#F5C400' }}>{currentLanguage.flag}</span>
        <span className="hidden xl:inline text-white/80 text-xs">{currentLanguage.nativeLabel}</span>
        <FaChevronDown className={`w-3 h-3 text-white/60 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }} transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 rounded-2xl shadow-xl py-2 z-50 overflow-hidden border"
            style={{ backgroundColor: '#1E3578', borderColor: 'rgba(245,196,0,0.3)' }}>
            <p className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Select Language
            </p>
            {LANGUAGES.map((lang) => (
              <button key={lang.code} onClick={() => { changeLanguage(lang.code); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
                style={currentLanguage.code === lang.code
                  ? { backgroundColor: 'rgba(245,196,0,0.2)', color: '#F5C400' }
                  : { color: 'rgba(255,255,255,0.8)' }}>
                <span className="w-8 h-5 rounded flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                  style={currentLanguage.code === lang.code
                    ? { backgroundColor: '#F5C400', color: '#0F1F5C' }
                    : { backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                  {lang.flag}
                </span>
                <div className="text-left">
                  <p className="leading-tight">{lang.nativeLabel}</p>
                  <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{lang.label}</p>
                </div>
                {currentLanguage.code === lang.code && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#F5C400' }} />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Main Navbar ──
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isScrolled } = useScrollPosition(50);
  const { t } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const { currentLang } = useLanguage();

  const navLinks = [
    { label: t('nav.home'),          id: 'home' },
    { label: t('nav.about'),         id: 'about' },
    { label: t('nav.services'),      id: 'services' },
    { label: t('nav.organizations'), id: 'organizations' },
    { label: currentLang === 'am' ? 'ዜናዎች' : currentLang === 'or' ? 'Oduu' : 'News', id: 'news' },
    { label: 'FAQ',                  id: 'faq' },
    { label: t('nav.complaint'),     id: 'complaint' },
    { label: t('nav.contact'),       id: 'contact' },
  ];
  useEffect(() => {
    const ids = ['home', 'about', 'services', 'organizations', 'news', 'faq', 'complaint', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (id) => {
    scrollTo(id);
    setMobileOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-xl' : ''}`}
      style={{ backgroundColor: '#1E3578' }} role="banner">

      {/* Main nav */}
      <nav className="section-container" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button onClick={() => handleNav('home')} className="flex items-center gap-3 focus:outline-none rounded-lg" aria-label="MESOB Home">
            <div className="w-10 h-10 flex-shrink-0">
              <img src="/logo.png" alt="MESOB Logo" className="w-10 h-10 rounded-full logo-spin" style={{ objectFit: 'cover' }} />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-base font-heading text-white leading-none">MESOB</span>
              <span className="text-[10px] font-medium leading-none hidden sm:block" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Sululta Branch
              </span>
            </div>
          </button>

          {/* Desktop nav — scroll buttons */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button onClick={() => handleNav(link.id)}
                  className="px-3.5 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-white/10 focus:outline-none"
                  style={{ color: activeSection === link.id ? '#F5C400' : 'rgba(255,255,255,0.85)' }}>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right: Language + Dark/Light toggle */}
          <div className="hidden lg:flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 rounded-lg transition-all hover:scale-110 focus:outline-none"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: '#F5C400' }}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
            </button>
            <img
              src={partnerLogo}
              alt="Partner Logo"
              className="w-9 h-9 rounded-full "
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden p-2 rounded-lg transition-colors focus:outline-none"
            style={{ color: '#fff', backgroundColor: 'rgba(255,255,255,0.1)' }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>
            {mobileOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t"
            style={{ backgroundColor: '#162B6E', borderColor: 'rgba(245,196,0,0.2)' }}>
            <div className="section-container py-3 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => handleNav(link.id)}
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-left transition-all"
                  style={{
                    color: activeSection === link.id ? '#F5C400' : 'rgba(255,255,255,0.85)',
                    backgroundColor: activeSection === link.id ? 'rgba(245,196,0,0.1)' : 'transparent',
                  }}>
                  {link.label}
                </button>
              ))}
              <LanguageSwitcher mobile />
              {/* Dark/Light toggle mobile */}
              <button
                onClick={toggleTheme}
                className="mx-1 mt-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl transition-all border border-white/20"
                style={{ color: '#F5C400', backgroundColor: 'rgba(255,255,255,0.08)' }}
              >
                {isDark ? <><FaSun className="w-4 h-4" /> Light Mode</> : <><FaMoon className="w-4 h-4" /> Dark Mode</>}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
