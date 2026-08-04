// ============================================================
// MESOB - Gallery Section (home page preview — 8 photos)
// Full gallery at /gallery
// ============================================================
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { FaTimes, FaChevronLeft, FaChevronRight, FaImages, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const CATEGORIES = ['All', 'General', 'Events', 'Services', 'Offices', 'Community'];

const GallerySection = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const navigate = useNavigate();
  const [photos, setPhotos]           = useState([]);
  const [filtered, setFiltered]       = useState([]);
  const [activeCategory, setCategory] = useState('All');
  const [lightbox, setLightbox]       = useState(null); // index of open photo
  const [loading, setLoading]         = useState(true);
  const PREVIEW_COUNT = 8; // show only 8 on home page

  useEffect(() => {
    fetch(API + '/gallery')
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setPhotos(data.data);
          setFiltered(data.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFiltered(photos);
    } else {
      setFiltered(photos.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, photos]);

  // Keyboard navigation for lightbox
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

  if (!loading && photos.length === 0) return null;

  return (
    <section className="py-20 bg-white" aria-label="Gallery" id="gallery">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 text-primary text-xs font-semibold rounded-full mb-4 border border-primary-100">
            <FaImages className="w-3 h-3" />
            {t('gallery.badge')}
          </span>
          <h2 className="section-title">{t('gallery.heading')}</h2>
          <p className="section-subtitle">{t('gallery.subtitle')}</p>
        </div>

        {/* Category filter */}
        {photos.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {CATEGORIES.filter(cat =>
              cat === 'All' || photos.some(p => p.category === cat)
            ).map(cat => (
              <button key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                }`}>
                {cat === 'All' ? t('gallery.all') : cat}
              </button>
            ))}
          </div>
        )}

        {/* Photo grid — show only first 8 */}
          {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <>
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <AnimatePresence>
              {filtered.slice(0, PREVIEW_COUNT).map((photo, i) => (
                <motion.div key={photo._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
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

          {/* View Full Gallery button */}
          {photos.length > PREVIEW_COUNT && (
            <div className="text-center mt-8">
              <button
                onClick={() => navigate('/gallery')}
                className="inline-flex items-center gap-2 px-6 py-3 font-bold rounded-xl text-sm transition-all shadow-md hover:-translate-y-0.5"
                style={{ backgroundColor: '#1E3578', color: '#fff' }}>
                {t('gallery.viewAll')} <FaArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
          </>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && filtered[lightbox] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
              onClick={() => setLightbox(null)}>

              {/* Close */}
              <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                onClick={() => setLightbox(null)}>
                <FaTimes className="w-5 h-5" />
              </button>

              {/* Prev */}
              {filtered.length > 1 && (
                <button className="absolute left-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                  onClick={(e) => { e.stopPropagation(); setLightbox(i => (i - 1 + filtered.length) % filtered.length); }}>
                  <FaChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Next */}
              {filtered.length > 1 && (
                <button className="absolute right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                  onClick={(e) => { e.stopPropagation(); setLightbox(i => (i + 1) % filtered.length); }}>
                  <FaChevronRight className="w-5 h-5" />
                </button>
              )}

              {/* Image */}
              <motion.div
                key={lightbox}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}>
                <img
                  src={getImgSrc(filtered[lightbox].imageUrl)}
                  alt={getTitle(filtered[lightbox]) || 'Gallery'}
                  className="max-w-full max-h-[75vh] rounded-2xl object-contain shadow-2xl"
                />
                {getTitle(filtered[lightbox]) && (
                  <p className="text-white text-sm font-medium mt-3 text-center px-4">
                    {getTitle(filtered[lightbox])}
                  </p>
                )}
                <p className="text-white/40 text-xs mt-1">{lightbox + 1} / {filtered.length}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GallerySection;
