// ============================================================
// MESOB - Full Gallery Page (/gallery)
// ============================================================
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { FaTimes, FaChevronLeft, FaChevronRight, FaImages, FaArrowLeft } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const CATEGORIES = ['All', 'General', 'Events', 'Services', 'Offices', 'Community'];

const GalleryPage = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const navigate = useNavigate();
  const [photos, setPhotos]           = useState([]);
  const [filtered, setFiltered]       = useState([]);
  const [activeCategory, setCategory] = useState('All');
  const [lightbox, setLightbox]       = useState(null);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    fetch(API + '/gallery')
      .then(r => r.json())
      .then(data => { if (data.success) { setPhotos(data.data); setFiltered(data.data); } })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') setFiltered(photos);
    else setFiltered(photos.filter(p => p.category === activeCategory));
  }, [activeCategory, photos]);

  const handleKey = useCallback((e) => {
    if (lightbox === null) return;
    if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % filtered.length);
    if (e.key === 'ArrowLeft')  setLightbox(i => (i - 1 + filtered.length) % filtered.length);
    if (e.key === 'Escape')     setLightbox(null);
  }, [lightbox, filtered.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const getTitle = (photo) => {
    if (currentLang === 'am' && photo.titleAM) return photo.titleAM;
    if (currentLang === 'or' && photo.titleOR) return photo.titleOR;
    return photo.titleEN || '';
  };

  const getImgSrc = (url) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `http://localhost:5000${url}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-[62px]">
        {/* Hero banner */}
        <div className="bg-gradient-to-r from-primary to-blue-800 py-12 text-white text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white text-xs font-semibold rounded-full mb-4 border border-white/20">
            <FaImages className="w-3 h-3" />
            {t('gallery.badge')}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">{t('gallery.heading')}</h1>
          <p className="text-white/70 text-sm max-w-lg mx-auto">{t('gallery.subtitle')}</p>
          <p className="text-white/50 text-xs mt-2">{filtered.length} {t('gallery.photos')}</p>
        </div>

        <div className="section-container py-10">
          {/* Back button */}
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary mb-6 transition-colors">
            <FaArrowLeft className="w-3.5 h-3.5" /> {t('serviceDetail.back')}
          </button>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.filter(cat => cat === 'All' || photos.some(p => p.category === cat)).map(cat => (
              <button key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                }`}>
                {cat === 'All' ? 'All' : cat}
                {cat === 'All'
                  ? ` (${photos.length})`
                  : ` (${photos.filter(p => p.category === cat).length})`}
              </button>
            ))}
          </div>

          {/* Photo grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <FaImages className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>{t('gallery.noPhotos')}</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              <AnimatePresence>
                {filtered.map((photo, i) => (
                  <motion.div key={photo._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="relative group cursor-pointer rounded-2xl overflow-hidden aspect-square bg-gray-100 shadow-sm hover:shadow-lg transition-shadow"
                    onClick={() => setLightbox(i)}>
                    <img
                      src={getImgSrc(photo.imageUrl)}
                      alt={getTitle(photo) || 'Gallery'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {getTitle(photo) && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <p className="text-white text-xs font-semibold leading-tight">{getTitle(photo)}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
            onClick={() => setLightbox(null)}>
            <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 z-10"
              onClick={() => setLightbox(null)}>
              <FaTimes className="w-5 h-5" />
            </button>
            {filtered.length > 1 && (
              <>
                <button className="absolute left-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 z-10"
                  onClick={(e) => { e.stopPropagation(); setLightbox(i => (i - 1 + filtered.length) % filtered.length); }}>
                  <FaChevronLeft className="w-5 h-5" />
                </button>
                <button className="absolute right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 z-10"
                  onClick={(e) => { e.stopPropagation(); setLightbox(i => (i + 1) % filtered.length); }}>
                  <FaChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            <motion.div
              key={lightbox}
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              className="relative max-w-5xl max-h-[88vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}>
              <img
                src={getImgSrc(filtered[lightbox].imageUrl)}
                alt={getTitle(filtered[lightbox]) || 'Gallery'}
                className="max-w-full max-h-[78vh] rounded-2xl object-contain shadow-2xl"
              />
              {getTitle(filtered[lightbox]) && (
                <p className="text-white text-sm font-medium mt-3 text-center px-4">{getTitle(filtered[lightbox])}</p>
              )}
              <p className="text-white/40 text-xs mt-1">{lightbox + 1} / {filtered.length}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
