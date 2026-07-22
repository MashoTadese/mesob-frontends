// ============================================================
// MESOB - Services Section
// Window cards → click window → see services
// Click a service → see requirements, steps, fee, time
// ============================================================

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import {
  FaIdCard, FaHandHoldingUsd, FaBriefcase,
  FaMapMarkedAlt, FaChartLine, FaFileSignature, FaEnvelopeOpenText,
  FaCog, FaUserCheck, FaBuilding, FaMoneyBillWave,
  FaCheckCircle, FaTimes, FaArrowLeft, FaClock,
  FaMoneyBill, FaListOl, FaClipboardList,
} from 'react-icons/fa';
import { SERVICE_WINDOWS } from '../utils/windows';
import { getRequirements } from '../utils/requirements';

const WINDOW_ICONS = {
  1: <FaIdCard className="w-7 h-7 text-white" />,
  2: <FaHandHoldingUsd className="w-7 h-7 text-white" />,
  3: <FaEnvelopeOpenText className="w-7 h-7 text-white" />,
  4: <FaBuilding className="w-7 h-7 text-white" />,
  5: <FaUserCheck className="w-7 h-7 text-white" />,
  6: <FaBriefcase className="w-7 h-7 text-white" />,
  7: <FaFileSignature className="w-7 h-7 text-white" />,
  8: <FaChartLine className="w-7 h-7 text-white" />,
  9: <FaMapMarkedAlt className="w-7 h-7 text-white" />,
  10: <FaMoneyBillWave className="w-7 h-7 text-white" />,
  11: <FaCog className="w-7 h-7 text-white" />,
};




const getServiceText = (svc, lang) => {
  const match = svc.match(/\(([^)]+)\)$/);
  const en = match ? match[1] : svc;
  return lang === 'or' ? svc : en;
};

// ── Service Requirements Detail View ──
const ServiceDetail = ({ serviceName, serviceEN, onBack, onClose }) => {
  const { t } = useTranslation();
  const reqs = getRequirements(serviceEN);

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>

      {/* Navigation row */}
      <div className="flex items-center justify-between mb-5">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:gap-2 transition-all">
          <FaArrowLeft className="w-3 h-3" /> {t('serviceDetail.back')}
        </button>
        <button onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: '#1E3578' }}>
          <FaTimes className="w-3 h-3" /> {t('serviceDetail.close')}
        </button>
      </div>

      {/* Service name */}
      <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4 mb-5">
        <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">{t('serviceDetail.serviceLabel')}</p>
        <h4 className="font-bold text-dark font-heading text-base leading-tight">{serviceEN}</h4>
        {serviceName !== serviceEN && (
          <p className="text-gray-500 text-xs mt-1">{serviceName}</p>
        )}
      </div>

      {reqs ? (
        <div className="flex flex-col gap-5">
          {/* Processing time + Fee */}
          <div className="grid grid-cols-2 gap-3">
            <div className="card p-4 border border-gray-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EEF1FB' }}>
                <FaClock className="w-4 h-4" style={{ color: '#1E3578' }} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{t('serviceDetail.processingTime')}</p>
                <p className="text-sm font-bold text-dark mt-0.5">{reqs.processingTime}</p>
              </div>
            </div>
            <div className="card p-4 border border-gray-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFF8E1' }}>
                <FaMoneyBill className="w-4 h-4" style={{ color: '#B8860B' }} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{t('serviceDetail.fee')}</p>
                <p className="text-sm font-bold text-dark mt-0.5">{reqs.fee}</p>
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div className="card p-5 border border-gray-100">
            <p className="text-sm font-bold text-dark flex items-center gap-2 mb-4 font-heading">
              <FaClipboardList className="w-4 h-4 text-primary" /> {t('serviceDetail.requiredDocs')}
            </p>
            <div className="flex flex-col gap-2.5">
              {reqs.requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-3 p-2.5 bg-gray-50 rounded-xl">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: '#1E3578' }}>
                    {i + 1}
                  </div>
                  <span className="text-sm text-gray-700 leading-relaxed">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="card p-5 border border-gray-100">
            <p className="text-sm font-bold text-dark flex items-center gap-2 mb-4 font-heading">
              <FaListOl className="w-4 h-4 text-primary" /> {t('serviceDetail.steps')}
            </p>
            <div className="flex flex-col gap-2">
              {reqs.steps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white shadow-sm" style={{ backgroundColor: '#F5C400', color: '#0F1F5C' }}>
                    {i + 1}
                  </div>
                  <span className="text-sm text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visit window note */}
          <div className="text-center py-3 px-4 rounded-xl text-xs text-gray-500" style={{ backgroundColor: '#F8F9FF', border: '1px solid #EEF1FB' }}>
            📍 {t('serviceDetail.visitNote')} <strong className="text-primary">{reqs.window}</strong> {t('serviceDetail.visitNote2')}
          </div>
        </div>
      ) : (
        <div className="card p-6 border border-gray-100 text-center">
          <div className="text-4xl mb-3">📋</div>
          <p className="text-gray-600 text-sm font-medium mb-1">{t('serviceDetail.contactStaff')}</p>
          <p className="text-gray-400 text-xs">{t('serviceDetail.contactStaffSub')}</p>
        </div>
      )}

      {/* Bottom buttons */}
      <div className="flex gap-2 mt-5 pt-4 border-t border-gray-100">
        <button onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border border-gray-200 text-gray-600 hover:bg-gray-50">
          <FaArrowLeft className="w-3 h-3" /> {t('serviceDetail.back')}
        </button>
        <button onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg text-white transition-all hover:opacity-90"
          style={{ backgroundColor: '#1E3578' }}>
          <FaTimes className="w-3 h-3" /> {t('serviceDetail.close')}
        </button>
      </div>
    </motion.div>
  );
};

// ── Window Modal ──
const WindowModal = ({ win, onClose, lang }) => {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState(null);

  if (!win) return null;

  // Pick right title per language
  const modalTitle = lang === 'am' ? (win.titleAM || win.titleEN) :
                     lang === 'or' ? (win.title || win.titleEN) :
                     win.titleEN || win.nameEN;

  const getEN = (svc) => {
    const match = svc.match(/\(([^)]+)\)$/);
    return match ? match[1] : svc;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(15,31,92,0.65)', backdropFilter: 'blur(4px)' }}
      onClick={() => { if (!selectedService) onClose(); }}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden"
        style={{ maxHeight: '88vh' }} onClick={(e) => e.stopPropagation()}>

        {/* Modal header */}
        <div className="px-7 py-5 flex items-center gap-4"
          style={{ background: 'linear-gradient(135deg, #0F1F5C, #1E3578)' }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'rgba(245,196,0,0.2)', border: '1.5px solid rgba(245,196,0,0.5)' }}>
            {WINDOW_ICONS[win.id]}
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: '#F5C400' }}>{win.nameEN}</p>
            <h3 className="font-bold text-white font-heading text-lg leading-tight">{modalTitle}</h3>
            <p className="text-white/60 text-xs mt-0.5">{win.services.length} {t('servicesPage.serviceCategoryLabel')}</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {/* Modal body — white background matching site theme */}
        <div className="overflow-y-auto px-7 py-5" style={{ maxHeight: 'calc(88vh - 100px)', backgroundColor: '#ffffff' }}>
          <AnimatePresence mode="wait">
            {selectedService ? (
              <ServiceDetail
                key="detail"
                serviceName={selectedService.display}
                serviceEN={selectedService.en}
                onBack={() => setSelectedService(null)}
                onClose={onClose}
              />
            ) : (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="text-xs text-gray-400 mb-4 flex items-center gap-2">
                  <span style={{ color: '#1E3578' }}>👆</span>
                  {t('serviceDetail.clickHint')}
                </p>
                <div className="flex flex-col gap-2">
                  {win.services.map((svc, i) => {
                    const displayText = getServiceText(svc, lang);
                    const enText = getEN(svc);
                    const hasReqs = getRequirements(enText) !== null;
                    return (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        onClick={() => setSelectedService({ display: svc, en: enText })}
                        className="flex items-center justify-between gap-3 p-3.5 rounded-xl text-left transition-all group w-full border border-gray-100 hover:border-primary-200 hover:bg-primary-50"
                        style={{ backgroundColor: '#F8F9FF' }}
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <FaCheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                          <span className="text-sm text-gray-700 leading-relaxed group-hover:text-primary transition-colors">{displayText}</span>
                        </div>
                        {hasReqs && (
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 whitespace-nowrap"
                            style={{ backgroundColor: '#1E3578', color: '#fff' }}>
                            Requirements →
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Close button at bottom of service list */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={onClose}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: '#1E3578' }}
                  >
                    <FaTimes className="w-3 h-3" /> Close
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Main Services Section ──
const ServicesSection = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const [selected, setSelected] = useState(null);
  const total = SERVICE_WINDOWS.reduce((s, w) => s + w.services.length, 0);

  // Pick the right title based on language
  const getWindowTitle = (win) => {
    if (currentLang === 'am' && win.titleAM) return win.titleAM;
    if (currentLang === 'or' && win.title) return win.title;
    return win.titleEN || win.nameEN;
  };

  return (
    <section className="py-20 bg-light" aria-label="Services">
      <div className="section-container">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 text-primary text-xs font-semibold rounded-full mb-4 border border-primary-100">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            {t('services.badge')}
          </span>
          <h2 className="section-title">{t('servicesPage.hero')}</h2>
          <p className="section-subtitle">{t('servicesPage.heroSub', { count: SERVICE_WINDOWS.length, total })}</p>
          <div className="flex flex-wrap justify-center gap-8 mt-6">
            {[
              { value: SERVICE_WINDOWS.length, label: t('servicesPage.windows') },
              { value: `${total}+`, label: t('servicesPage.totalServices') },
              { value: '8:00–5:00', label: t('servicesPage.workingDays') },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold font-heading text-primary">{s.value}</p>
                <p className="text-gray-500 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Window cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICE_WINDOWS.map((win, index) => (
            <motion.div key={win.id}
              initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setSelected(win)}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-200 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 cursor-pointer group"
              role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setSelected(win)}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md" style={{ backgroundColor: '#1E3578' }}>
                {WINDOW_ICONS[win.id] || <FaBuilding className="w-7 h-7 text-white" />}
              </div>
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3" style={{ backgroundColor: '#FFF8E1', color: '#B8860B' }}>
                {win.services.length} {t('servicesPage.serviceCategoryLabel')}
              </span>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#1E3578' }}>{win.name.toUpperCase()}</p>
              <h3 className="font-bold text-dark font-heading text-base leading-snug group-hover:text-primary transition-colors">
                {getWindowTitle(win)}
              </h3>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-gray-400 text-xs mt-6">📌 {t('servicesPage.clickHint')}</p>
      </div>

      <AnimatePresence>
        {selected && <WindowModal win={selected} onClose={() => setSelected(null)} lang={currentLang} />}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;
