// ============================================================
// MESOB - News Section
// Shows ALL published news from admin panel
// Text, Image (uploaded), YouTube video
// ============================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FaTimes, FaCalendarAlt, FaNewspaper } from 'react-icons/fa';

const BASE = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL.replace('/api', '')
  : 'http://localhost:5000';

const API = BASE + '/api';

// ── Build correct image URL (handles both old and new paths) ──
function imgUrl(imageUrl) {
  if (!imageUrl) return '';
  // Already a full URL
  if (imageUrl.startsWith('http')) return imageUrl;
  // Both /uploads/... and /admin/uploads/... resolve via the backend
  return BASE + imageUrl;
}

// ── pick the right language field ──────────────────────────
function pick(item, field, lang) {
  const suffix = lang === 'am' ? 'AM' : lang === 'or' ? 'OR' : 'EN';
  return item[field + suffix] || item[field + 'EN'] || '';
}

function fmtDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
}

// ── News Detail Modal ───────────────────────────────────────
const NewsModal = ({ item, lang, onClose }) => {
  if (!item) return null;
  const title = pick(item, 'title', lang);
  const body  = pick(item, 'body',  lang);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(15,31,92,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl w-full shadow-2xl overflow-hidden"
        style={{ maxWidth: item.type === 'image' ? '860px' : '640px', maxHeight: '92vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-7 py-5 flex items-start justify-between gap-4"
          style={{ background: 'linear-gradient(135deg,#0F1F5C,#1E3578)' }}>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: 'rgba(245,196,0,0.2)', color: '#F5C400' }}>
                {item.category}
              </span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {fmtDate(item.publishedAt || item.createdAt)}
              </span>
            </div>
            <h2 className="font-bold text-white text-lg leading-snug font-heading">{title}</h2>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}
            aria-label="Close">
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(92vh - 120px)' }}>
          {/* Full image display */}
          {item.type === 'image' && item.imageUrl && (
            <div className="w-full bg-gray-50">
              <img
                src={imgUrl(item.imageUrl)}
                alt={title}
                className="w-full h-auto block"
                style={{ maxHeight: '65vh', objectFit: 'contain', margin: '0 auto', display: 'block', background: '#f8f9fc' }}
              />
            </div>
          )}

          {item.type === 'video' && item.videoUrl && (
            <div className="px-7 pt-6">
              <div className="rounded-2xl overflow-hidden"
                style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src={item.videoUrl}
                  title={title}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </div>
          )}

          {body ? (
            <div className="px-7 py-6">
              <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">{body}</p>
            </div>
          ) : (
            item.type === 'text' && (
              <div className="px-7 py-10 text-center text-gray-400 text-sm">
                No content available.
              </div>
            )
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── News Card ───────────────────────────────────────────────
const NewsCard = ({ item, lang, onClick, index }) => {
  const title = pick(item, 'title', lang);
  const body  = pick(item, 'body',  lang);

  const typeIcon  = item.type === 'image' ? '🖼️' : item.type === 'video' ? '▶️' : '📝';
  const typeColor = item.type === 'image'
    ? { bg: '#f0fdf4', color: '#059669' }
    : item.type === 'video'
    ? { bg: '#fff7ed', color: '#c2410c' }
    : { bg: '#f0f4ff', color: '#1E3578' };

  const ytId = item.videoUrl && item.videoUrl.includes('/embed/')
    ? item.videoUrl.split('/embed/')[1].split('?')[0]
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer group hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
      role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* Image thumbnail */}
      {item.type === 'image' && item.imageUrl && (
        <div className="w-full h-44 overflow-hidden">
          <img src={imgUrl(item.imageUrl)} alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      )}

      {/* Video thumbnail — YouTube poster */}
      {item.type === 'video' && ytId && (
        <div className="w-full h-44 overflow-hidden relative" style={{ background: '#0f1f5c' }}>
          <img
            src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: '#dc2626' }}>
              <svg className="w-6 h-6 text-white" style={{ marginLeft: '3px' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Text type — color bar */}
      {item.type === 'text' && (
        <div className="w-full h-2" style={{ background: 'linear-gradient(90deg,#1E3578,#F5C400)' }} />
      )}

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: typeColor.bg, color: typeColor.color }}>
            {typeIcon} {item.type}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: '#f9fafb', color: '#6b7280' }}>
            {item.category}
          </span>
        </div>

        <h3 className="font-bold text-dark font-heading text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        {body && (
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">{body}</p>
        )}

        <div className="flex items-center justify-between mt-auto">
          <span className="text-[11px] text-gray-400 flex items-center gap-1">
            <FaCalendarAlt className="w-3 h-3" />
            {fmtDate(item.publishedAt || item.createdAt)}
          </span>
          <span className="text-xs font-semibold" style={{ color: '#1E3578' }}>
            Read more →
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ── Skeleton loader card ─────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
    <div className="w-full h-44 bg-gray-100" />
    <div className="p-5">
      <div className="h-3 bg-gray-100 rounded w-1/3 mb-3" />
      <div className="h-4 bg-gray-100 rounded w-full mb-2" />
      <div className="h-3 bg-gray-100 rounded w-2/3" />
    </div>
  </div>
);

// ── Main Section ────────────────────────────────────────────
const NewsSection = () => {
  const { currentLang } = useLanguage();
  const [news,     setNews]     = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(API + '/news?limit=12')
      .then(function(r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function(data) {
        if (data.success) {
          setNews(data.data || []);
        } else {
          setError(true);
        }
      })
      .catch(function() { setError(true); })
      .finally(function() { setLoading(false); });
  }, []);

  // Always render the section — never hide it
  // (shows skeleton while loading, empty state if no news yet)
  const headingText = currentLang === 'am'
    ? 'የዕለቱ ዜናዎች'
    : currentLang === 'or'
    ? "Oduu Har'aa"
    : "Today's News";

  const subText = currentLang === 'am'
    ? 'ከ MESOB ሱሉልታ ቅርንጫፍ የቅርብ ጊዜ ዜናዎች'
    : currentLang === 'or'
    ? 'Oduu dhiyeenya MESOB Damee Sululta irraa'
    : 'Latest updates and announcements from MESOB Sululta Branch';

  const badgeText = currentLang === 'am' ? 'ዜናዎች' : currentLang === 'or' ? 'Oduu' : 'Latest News';

  return (
    <section className="py-20 bg-white" id="news" aria-label="News">
      <div className="section-container">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 text-primary text-xs font-semibold rounded-full mb-4 border border-primary-100">
            <FaNewspaper className="w-3 h-3" />
            {badgeText}
          </span>
          <h2 className="section-title">{headingText}</h2>
          <p className="section-subtitle">{subText}</p>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard /><SkeletonCard /><SkeletonCard />
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">📡</div>
            <p className="text-sm font-medium">Could not load news. Please try again later.</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && news.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-3">📰</div>
            <p className="text-sm font-medium">No news published yet. Check back soon.</p>
          </div>
        )}

        {/* News grid */}
        {!loading && !error && news.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map(function(item, i) {
              return (
                <NewsCard
                  key={item._id}
                  item={item}
                  lang={currentLang}
                  index={i}
                  onClick={function() { setSelected(item); }}
                />
              );
            })}
          </div>
        )}

      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <NewsModal
            item={selected}
            lang={currentLang}
            onClose={function() { setSelected(null); }}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default NewsSection;
