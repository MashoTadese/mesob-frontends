// MESOB - About Section
// About text loaded from API (admin can update via admin panel)
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaBullseye, FaEye, FaHandshake, FaCheckCircle, FaStar, FaTimes } from 'react-icons/fa';
import { STATISTICS } from '../utils/constants';
import directorPhoto from '../assets/Image/Director/Deraje Dhaba.jpg';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top, behavior: 'smooth' }); }
};

const AboutSection = () => {
  const { t } = useTranslation();
  const [apiContent, setApiContent] = useState(null);
  const [selectedMVV, setSelectedMVV] = useState(null);

  // Fetch admin-set content from API
  useEffect(() => {
    fetch(API_URL + '/content')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.success && data.data) setApiContent(data.data);
      })
      .catch(function() {});
  }, []);

  // Always use i18n for paragraphs (trilingual support)
  // DB content (from admin About Us page) is ignored for paragraphs since locale handles translations
  const para1      = t('aboutPage.para1');
  const para2      = t('aboutPage.para2');
  const para3      = t('aboutPage.para3');
  const highlights = (apiContent && apiContent.highlights && apiContent.highlights.length)
    ? apiContent.highlights
    : [t('aboutPage.highlight1'), t('aboutPage.highlight2'), t('aboutPage.highlight3'), t('aboutPage.highlight4')];

  const leadership = [
    { name: t('aboutPage.directorName'),      title: t('aboutPage.branchDirector'),  initials: 'DD', color: '#1E3578', photo: directorPhoto },
    { name: t('aboutPage.deputyManagerName'), title: t('aboutPage.deputyManager'),   initials: 'TB', color: '#2563eb', photo: null },
    { name: t('aboutPage.headDigitalName'),   title: t('aboutPage.headDigital'),     initials: 'DB', color: '#7c3aed', photo: null },
  ];
  const mvv = [
    { icon: <FaBullseye className="w-7 h-7 text-white" />, label: t('aboutPage.mission'),    text: t('aboutPage.missionText'),    style: { background: 'linear-gradient(135deg, #0F1F5C, #1E3578)' } },
    { icon: <FaEye className="w-7 h-7 text-white" />,      label: t('aboutPage.vision'),     text: t('aboutPage.visionText'),     style: { background: 'linear-gradient(135deg, #1a1a2e, #2d2d4e)' } },
    { icon: <FaHandshake className="w-7 h-7 text-white" />,label: t('aboutPage.objectives'), text: t('aboutPage.objectivesText'), style: { background: 'linear-gradient(135deg, #0F1F5C, #1E3578)' } },
  ];

  return (
    <section className="py-20 bg-white" aria-label="About">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 text-primary text-xs font-semibold rounded-full mb-4 border border-primary-100">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />{t('aboutPage.whoWe')}
          </span>
          <h2 className="section-title">
            MESOB Sululta — <span className="text-gradient">{t('aboutPage.modernPortal')}</span>
          </h2>
          <p className="section-subtitle">{t('aboutPage.pageSubtitle')}</p>
        </div>

        {/* Intro + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-16">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-gray-600 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: para1 }} />
            <p className="text-gray-600 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: para2 }} />
            <p className="text-gray-600 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: para3 }} />
            <div className="flex flex-col gap-3">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <FaCheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-gray-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="grid grid-cols-2 gap-4">
              {STATISTICS.map((stat) => (
                <div key={stat.id} className="card p-6 border border-gray-100 text-center hover:-translate-y-1 transition-transform">
                  <p className="text-4xl font-bold text-primary font-heading mb-1">{stat.value}</p>
                  <p className="text-gray-500 text-sm">{t(stat.labelKey)}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 p-4 bg-primary-50 border border-primary-100 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <FaStar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-dark text-sm font-heading">{t('aboutPage.openBadgeTitle')}</p>
                <p className="text-gray-500 text-xs mt-0.5">{t('aboutPage.openBadgeDesc')}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* MVV */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {mvv.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-white rounded-2xl p-8 shadow-xl relative overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform"
              style={item.style}
              onClick={() => setSelectedMVV(item)}
              role="button" tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedMVV(item)}
            >
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #F5C400, #FFE54D)' }} />
              <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mb-5">{item.icon}</div>
              <h3 className="text-xl font-bold font-heading mb-3">{item.label}</h3>
              <p className="text-white/80 text-sm leading-relaxed line-clamp-3">{item.text}</p>
              <span className="inline-flex items-center gap-1 mt-4 text-xs font-semibold opacity-70">
                Read more →
              </span>
            </motion.div>
          ))}
        </div>

        {/* MVV Modal */}
        <AnimatePresence>
          {selectedMVV && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ backgroundColor: 'rgba(15,31,92,0.7)', backdropFilter: 'blur(4px)' }}
              onClick={() => setSelectedMVV(null)}>
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="px-7 py-6 flex items-center gap-4 text-white"
                  style={selectedMVV.style}>
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #F5C400, #FFE54D)' }} />
                  <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0">
                    {selectedMVV.icon}
                  </div>
                  <h3 className="font-bold text-white text-xl font-heading flex-1">{selectedMVV.label}</h3>
                  <button onClick={() => setSelectedMVV(null)}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                    <FaTimes className="w-4 h-4" />
                  </button>
                </div>
                {/* Body */}
                <div className="px-7 py-6">
                  <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">{selectedMVV.text}</p>
                </div>
                {/* Footer */}
                <div className="px-7 py-5 border-t border-gray-100 flex justify-center">
                  <button onClick={() => setSelectedMVV(null)}
                    className="px-8 py-2.5 rounded-xl font-semibold text-sm text-white transition-all"
                    style={{ backgroundColor: '#0F1F5C' }}>
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Leadership */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 text-primary text-xs font-semibold rounded-full mb-4 border border-primary-100">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />{t('aboutPage.leadershipBadge')}
          </span>
          <h2 className="section-title">{t('aboutPage.leadershipTitle')}</h2>
          <p className="section-subtitle">{t('aboutPage.leadershipSubtitle')}</p>
        </div>

        <div className="flex flex-col items-center gap-6 mb-14">
          {/* Director — centered on top, larger */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="card p-8 border-2 text-center hover:-translate-y-1 transition-transform w-72"
            style={{ borderColor: '#F5C400' }}>
            <img src={leadership[0].photo} alt={leadership[0].name} className="w-28 h-28 rounded-full mx-auto mb-4 object-cover shadow-md border-4 border-primary-100" />
            <h4 className="font-bold text-dark font-heading text-base mb-1">{leadership[0].name}</h4>
            <p className="text-gray-500 text-sm mb-2">{leadership[0].title}</p>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
              style={{ backgroundColor: '#F5C400', color: '#0F1F5C' }}>
              ★ {t('aboutPage.branchDirector')}
            </span>
          </motion.div>

          {/* Other team members — row below, centered */}
          <div className="flex justify-center gap-6 w-full max-w-2xl flex-wrap">
            {leadership.slice(1).map((person, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card p-6 border border-gray-100 text-center hover:-translate-y-1 transition-transform w-56">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold font-heading"
                  style={{ backgroundColor: person.color }}>
                  {person.initials}
                </div>
                <h4 className="font-bold text-dark font-heading text-sm mb-1">{person.name}</h4>
                <p className="text-gray-500 text-xs">{person.title}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-3xl px-8 py-12 text-white text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0F1F5C 0%, #1E3578 60%, #1E3A8A 100%)' }}>
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #F5C400, #FFE54D, #F5C400)' }} />
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-3">{t('aboutPage.ctaTitle')}</h2>
          <p className="text-white/75 mb-7 max-w-lg mx-auto">{t('aboutPage.ctaSub')}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => scrollTo('services')}
              className="inline-flex items-center gap-2 px-6 py-3 font-bold rounded-xl text-sm hover:-translate-y-0.5 transition-all shadow-lg"
              style={{ backgroundColor: '#F5C400', color: '#0F1F5C' }}>
              {t('aboutPage.browseServices')}
            </button>
            <button onClick={() => scrollTo('contact')}
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl text-sm border-2 border-white/40 text-white hover:bg-white/10 transition-all">
              {t('aboutPage.contactUs')}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
