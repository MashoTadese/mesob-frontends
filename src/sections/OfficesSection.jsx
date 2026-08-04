// ============================================================
// MESOB - Organizations Section
// Static data from constants.js
// ============================================================
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import civilServicesLogo from '../assets/Image/civil services.png';
import tradeOfficeLogo from '../assets/Image/Trade  office.jpg';
import buusaGonofaaLogo from '../assets/Image/coopeartive office(buusaa gonofaa).png';
import energyWaterLogo from '../assets/Image/Energy and water office.png';
import galiiRevenueLogo from '../assets/Image/Galii(revenue).png';
import educationOfficeLogo from '../assets/Image/Education office.png';
import healthOfficeLogo from '../assets/Image/Health office.jpg';
import communicationLogo from '../assets/Image/Communication.png';
import envProtectionLogo from '../assets/Image/Environmental protection Authority.png';
import culturalTourismLogo from '../assets/Image/cultural and tourism.png';
import psmqnLogo from '../assets/Image/PSMQN.png';
import agricultureLogo from '../assets/Image/Agriculture office.png';
import scienceTechLogo from '../assets/Image/Science and technology.png';
import justiceAttorneyLogo from '../assets/Image/justice attorney office.jpg';
import landLogo from '../assets/Image/land.jpg';
import financialServiceLogo from '../assets/Image/Financial service.png';
import constructionLogo from '../assets/Image/constraction.png';
import socialAffairsLogo from '../assets/Image/social affairs office.jpg';
import administrationLogo from '../assets/Image/Administration.jpg';
import investmentLogo from '../assets/Image/investement.png';
import houseOfficeLogo from '../assets/Image/House office.jpg';
import policeLogo from '../assets/Image/police.jpg';
import transportationLogo from '../assets/Image/Transportation.jpg';
import chuoLogo from '../assets/Image/CHUO.jpg';
import {
  FaFileContract, FaGlobe, FaCoins, FaIndustry, FaMapMarked,
  FaBalanceScale, FaHandsHelping, FaBriefcase, FaBuilding,
  FaCheckCircle, FaSearch, FaPhoneAlt, FaTimes,
  FaTint, FaHospital, FaStore, FaBolt, FaMedkit, FaCog,
  FaBroadcastTower, FaCar, FaSeedling, FaMoneyBillWave,
  FaLaptopCode, FaHardHat, FaGraduationCap, FaHome,
  FaLeaf, FaMap, FaHandshake, FaPiggyBank,
  FaPaintBrush, FaShieldAlt, FaChartLine,
} from 'react-icons/fa';
import { ORGANIZATIONS, COLOR_MAP } from '../utils/constants';

// Map logo filenames → imported assets
const LOGO_MAP = {
  'civil services.png': civilServicesLogo,
  'Trade  office.jpg': tradeOfficeLogo,
  'coopeartive office(buusaa gonofaa).png': buusaGonofaaLogo,
  'Energy and water office.png': energyWaterLogo,
  'Galii(revenue).png': galiiRevenueLogo,
  'Education office.png': educationOfficeLogo,
  'Health office.jpg': healthOfficeLogo,
  'Communication.png': communicationLogo,
  'Environmental protection Authority.png': envProtectionLogo,
  'cultural and tourism.png': culturalTourismLogo,
  'PSMQN.png': psmqnLogo,
  'Agriculture office.png': agricultureLogo,
  'Science and technology.png': scienceTechLogo,
  'justice attorney office.jpg': justiceAttorneyLogo,
  'land.jpg': landLogo,
  'Financial service.png': financialServiceLogo,
  'constraction.png': constructionLogo,
  'social affairs office.jpg': socialAffairsLogo,
  'Administration.jpg': administrationLogo,
  'investement.png': investmentLogo,
  'House office.jpg': houseOfficeLogo,
  'police.jpg': policeLogo,
  'Transportation.jpg': transportationLogo,
  'CHUO.jpg': chuoLogo,
};

const ICON_MAP = {
  FaFileContract, FaGlobe, FaCoins, FaIndustry, FaMapMarked,
  FaBalanceScale, FaHandsHelping, FaBriefcase, FaBuilding,
  FaTint, FaHospital, FaStore, FaBolt, FaMedkit, FaCog,
  FaBroadcastTower, FaCar, FaSeedling, FaMoneyBillWave,
  FaLaptopCode, FaHardHat, FaGraduationCap, FaHome,
  FaLeaf, FaMap, FaHandshake, FaPiggyBank,
  FaPaintBrush, FaShieldAlt, FaChartLine,
};

const OrgModal = ({ org, onClose }) => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const Icon   = ICON_MAP[org.icon] || FaBuilding;
  const colors = COLOR_MAP[org.color] || COLOR_MAP.primary;
  const displayName = currentLang === 'am' && org.nameAM ? org.nameAM
                    : currentLang === 'or' && org.nameOR ? org.nameOR
                    : org.name;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(15,31,92,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose} role="dialog" aria-modal="true">
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-primary-100"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start gap-4 mb-5">
          <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden" style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}>
            {org.logo && LOGO_MAP[org.logo]
              ? <img src={LOGO_MAP[org.logo]} alt={org.shortName} className="w-full h-full rounded-full" style={{ objectFit: 'cover' }} />
              : <Icon className={`w-8 h-8 ${colors.icon}`} />
            }
          </div>
          <div className="flex-1">
            <span className={`badge ${colors.badge} text-xs font-bold mb-1`}>{org.shortName}</span>
            <h3 className="text-lg font-bold text-dark font-heading leading-tight">{displayName}</h3>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-colors flex-shrink-0">
            <FaTimes className="w-4 h-4" />
          </button>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-5">{org.description}</p>
        <div className="mb-5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t('orgPage.servicesProvided')}</p>
          <div className="flex flex-col gap-2">
            {org.services.map((s, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <FaCheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-gray-700">{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-primary-50 rounded-2xl p-4 flex items-center gap-3 border border-primary-100">
          <FaPhoneAlt className="w-4 h-4 text-primary flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500">{t('orgPage.forInquiries')} {org.shortName}</p>
            <p className="text-sm font-semibold text-primary">+251 11 551 2345 (Ext: {100 + org.id})</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const OfficesSection = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const [search,   setSearch]   = useState('');
  const [selected, setSelected] = useState(null);

  // Pick name based on current language
  const getOrgName = (org) => {
    if (currentLang === 'am' && org.nameAM) return org.nameAM;
    if (currentLang === 'or' && org.nameOR) return org.nameOR;
    return org.name;
  };

  const filtered = ORGANIZATIONS.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
    (o.nameOR && o.nameOR.toLowerCase().includes(search.toLowerCase())) ||
    (o.nameAM && o.nameAM.toLowerCase().includes(search.toLowerCase())) ||
    o.shortName.toLowerCase().includes(search.toLowerCase()) ||
    o.services.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section className="py-20 bg-light" aria-label="Organizations">
      <div className="section-container">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 text-primary text-xs font-semibold rounded-full mb-4 border border-primary-100">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />{t('organizations.badge')}
          </span>
          <h2 className="section-title">{t('organizations.heading')}</h2>
          <p className="section-subtitle">{t('organizations.subtitle')}</p>
        </div>

        <div className="relative max-w-xl mx-auto mb-10">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input type="search" placeholder={t('organizations.searchPlaceholder')} value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
            aria-label="Search organizations" />
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((org, index) => {
              const Icon   = ICON_MAP[org.icon] || FaBuilding;
              const colors = COLOR_MAP[org.color] || COLOR_MAP.primary;
              return (
                <motion.div key={org.id}
                  initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.05 }}
                  onClick={() => setSelected(org)}
                  className="cursor-pointer group overflow-hidden hover:-translate-y-1 transition-all rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg"
                  style={{ backgroundColor: '#EEF1FB' }}
                  role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setSelected(org)}>
                  <div className="p-6 flex flex-col items-center text-center">
                    {/* Logo/Icon — centered circle */}
                    <div className="w-32 h-32 rounded-full flex items-center justify-center mb-4 overflow-hidden flex-shrink-0" style={{ background: 'transparent' }}>
                      {org.logo && LOGO_MAP[org.logo]
                        ? <img src={LOGO_MAP[org.logo]} alt={org.shortName} className="w-full h-full rounded-full" style={{ objectFit: 'contain' }} />
                        : <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.7)' }}><Icon className={`w-10 h-10 ${colors.icon}`} /></div>
                      }
                    </div>
                    {/* Name */}
                    <h3 className="font-bold text-dark font-heading text-sm leading-snug group-hover:text-primary transition-colors">{getOrgName(org)}</h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-dark font-heading mb-2">{t('orgPage.noResults')}</h3>
            <p className="text-gray-500 text-sm mb-5">{t('orgPage.noResultsDesc')}</p>
            <button onClick={() => setSearch('')} className="btn-secondary text-sm px-5 py-2.5">{t('orgPage.clearSearch')}</button>
          </div>
        )}
      </div>

      {selected && <OrgModal org={selected} onClose={() => setSelected(null)} />}
    </section>
  );
};

export default OfficesSection;
