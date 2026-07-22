// MESOB - About Section
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaBullseye, FaEye, FaHandshake, FaCheckCircle, FaStar } from 'react-icons/fa';
import { STATISTICS } from '../utils/constants';
import directorPhoto from '../assets/Image/Director/Deraje Dhaba.jpg';

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top, behavior: 'smooth' }); }
};

const AboutSection = () => {
  const { t } = useTranslation();

  const leadership = [
    { name: 'Ato Derajje Dhaba',    title: 'Branch Director',            initials: 'DD', color: '#1E3578', photo: directorPhoto },
    { name: 'Ato Tesfaye Bekele',   title: 'Deputy Manager, Operations', initials: 'TB', color: '#2563eb', photo: null },
    { name: 'W/ro Selamawit Girma', title: 'Head of Digital Services',   initials: 'SG', color: '#7c3aed', photo: null },
    { name: 'W/ro Hiwot Alemu',     title: 'Customer Experience Lead',   initials: 'HA', color: '#0d9488', photo: null },
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
            Ethiopia's Modern <span className="text-gradient">{t('aboutPage.modernPortal')}</span>
          </h2>
          <p className="section-subtitle">{t('aboutPage.pageSubtitle')}</p>
        </div>

        {/* Intro + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-16">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-gray-600 leading-relaxed mb-4">{t('aboutPage.para1')}</p>
            <p className="text-gray-600 leading-relaxed mb-4">{t('aboutPage.para2')}</p>
            <p className="text-gray-600 leading-relaxed mb-8">{t('aboutPage.para3')}</p>
            <div className="flex flex-col gap-3">
              {[t('aboutPage.highlight1'), t('aboutPage.highlight2'), t('aboutPage.highlight3'), t('aboutPage.highlight4')].map((item, i) => (
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
                  <p className="text-gray-500 text-sm">{stat.label}</p>
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
              className="text-white rounded-2xl p-8 shadow-xl relative overflow-hidden" style={item.style}>
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #F5C400, #FFE54D)' }} />
              <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mb-5">{item.icon}</div>
              <h3 className="text-xl font-bold font-heading mb-3">{item.label}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Leadership */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 text-primary text-xs font-semibold rounded-full mb-4 border border-primary-100">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />{t('aboutPage.leadershipBadge')}
          </span>
          <h2 className="section-title">{t('aboutPage.leadershipTitle')}</h2>
          <p className="section-subtitle">{t('aboutPage.leadershipSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {leadership.map((person, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-6 border border-gray-100 text-center hover:-translate-y-1 transition-transform">
              {person.photo ? (
                <img src={person.photo} alt={person.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover shadow-md border-4 border-primary-100" />
              ) : (
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold font-heading"
                  style={{ backgroundColor: person.color }}>
                  {person.initials}
                </div>
              )}
              <h4 className="font-bold text-dark font-heading text-sm mb-1">{person.name}</h4>
              <p className="text-gray-500 text-xs">{person.title}</p>
              {i === 0 && (
                <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                  style={{ backgroundColor: '#F5C400', color: '#0F1F5C' }}>
                  ★ Branch Director
                </span>
              )}
            </motion.div>
          ))}
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
