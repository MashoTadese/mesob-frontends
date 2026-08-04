// ============================================================
// MESOB - Services Section
// Window cards → click window → see services
// Click a service → see requirements, steps, fee, time
// Data loaded from API (admin-editable), falls back to static file
// ============================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import {
  FaIdCard, FaHandHoldingUsd, FaBriefcase,
  FaMapMarkedAlt, FaChartLine, FaFileSignature, FaEnvelopeOpenText,
  FaCog, FaUserCheck, FaBuilding,
  FaCheckCircle, FaTimes, FaArrowLeft, FaClock,
  FaMoneyBill, FaListOl, FaClipboardList, FaSpinner, FaEnvelope,
} from 'react-icons/fa';
import { SERVICE_WINDOWS as STATIC_WINDOWS } from '../utils/windows';
import { getRequirements as getRequirementsStatic } from '../utils/requirements';
import Button from '../components/Button';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Floor name translations
const FLOOR_NAMES = {
  'Ground Floor': { en: 'Ground Floor', am: 'የታችኛው ፎቅ',    or: 'Cimdaa'       },
  '1st Floor':    { en: '1st Floor',    am: '1ኛ ፎቅ',        or: 'Darbii 1ffaa' },
  '2nd Floor':    { en: '2nd Floor',    am: '2ኛ ፎቅ',        or: 'Darbii 2ffaa' },
  '3rd Floor':    { en: '3rd Floor',    am: '3ኛ ፎቅ',        or: 'Darbii 3ffaa' },
  '4th Floor':    { en: '4th Floor',    am: '4ኛ ፎቅ',        or: 'Darbii 4ffaa' },
  '5th Floor':    { en: '5th Floor',    am: '5ኛ ፎቅ',        or: 'Darbii 5ffaa' },
};

const getFloorName = (floor, lang) => {
  if (!floor) return '';
  const f = FLOOR_NAMES[floor];
  if (!f) return floor;
  return f[lang] || f.en;
};
// Maps each Oromo service string → English name
const STATIC_EN_MAP = {};
STATIC_WINDOWS.forEach((w) => {
  (w.services || []).forEach((svc) => {
    const dashIdx = svc.lastIndexOf(' - ');
    if (dashIdx !== -1) {
      const after = svc.slice(dashIdx + 3).trim();
      if (!after.includes(')')) { STATIC_EN_MAP[svc] = after; return; }
    }
    const lo = svc.lastIndexOf('('), lc = svc.lastIndexOf(')');
    if (lo !== -1 && lc > lo) { STATIC_EN_MAP[svc] = svc.slice(lo + 1, lc).trim(); return; }
    STATIC_EN_MAP[svc] = svc;
  });
});

// Also map Excel raw Oromo strings → English (these come from the DB seed)
// Pattern: partial Oromo text → English equivalent
const EXCEL_OR_TO_EN = {
  'Xalayaa deggarsaa adda addaa walitti hidhamiinsa gabaa oomisha qonnaa fi industrii uumuu daldaltootaaf kennuu': 'Support Letter for Traders - Market Linkage',
  'Inshuraansii fayyaa hawaasaa kennuu': 'Community Health Insurance Issuance',
  'Inshuraansii fayyaa hawaasaa haaromsuu': 'Community Health Insurance Renewal',
  'Deeggersa wldaalee IMX paakeejiwwan deggersaa akka argatan haala mijeessu': 'IMX Association Support Packages',
  "waldaalee IMX Investimentiitti ce'aniif waraqaa ragaa kennuu": 'Certificate for IMX to Investment',
  'Deggersa aaddaa addaa waldaalee fi walitti hidhamiinsa gabaa WHG uumu kennuu': 'Various Support Letters',
  'Xalayaa deeggarsaa adda addaa kennuu': 'Various Support Letters',
  'Xalayaa deeggarsa adda addaa kennuu': 'Various Support Letters',
  'Deeggarsa Hayyama barjaalee kennuu': 'Billboard License Support',
  'Xalayaa hayyama beeksiisa sagalee kennuu': 'Audio Advertisement Permit Letter',
  "Deggarsaa Qonnaan bulaa investimentiitti ce'uu fi W/hidhaminsa gabaa kennuu": 'Farmer Investment Transition Support',
  "Xalayaa Deeggarsaa Kaafamtoota Misoomaa Invastimantii ce'anii fi dhimmota biroof kennuu": 'Displaced Persons Investment Support Letter',
  'Xalayaa Deegarsa Barsiisoota fi Hoggantoota': 'Support Letter for Teachers & Managers',
  "Deegarsa Bu'uuraalee Misooma (Ibsaa,Daandii ,Bishaanii)Kennuu": 'Infrastructure Support - Electricity, Road, Water',
  'Komii adda addaa keessuumeessuu': 'Various Complaints Handling',
  'Iyyannoo adda addaa keessuumeessuu': 'Various Petitions Handling',
  'Komii hojjattoota mootummaa Keessumeessuu': 'Government Employees Complaints',
  'Komii kaafamtoota Misoomaa Hiikuu': 'Development Displaced Persons Complaint Resolution',
  'Tajaajila jijjiirraa barsiisotaa/hooggantoota manneen barnootaa': 'Teacher/School Manager Transfer',
  'Ragaa barnootaa sadarkaa naannoo (kutaa 6ffaa fi 8ffaa) bade kennuu': 'Lost Regional Certificate Grade 6 & 8',
  'Hayyama Gahumsa Manneen Barnoota Dhuunfaa fi miti mootummaa Kennuu, Haaromsuu, Kan bade bakka buusuufi deebisuu (Mana Barnootaa BSTDfi sadarkaa tokkoffaa 1-8)': 'Private/NGO School License',
  'Hayyama suphaa mana mootummaa kennuu': 'Government House Repair Permit',
  'Kaffaltii kiraa mana mootummaa fi dhuunfaa raawwachiisuu': 'Govt/Private House Rent Payment',
  'Heyyamaa Tajaajila Qalmaa Kennuu(Lakk.Qeera Kennuu)': 'Slaughter Service License',
  'Hayyama manneen yaalaa dhuunfaa kennuu': 'Private Clinic License Issuance',
  'Hayyama manneen yaalaa dhuunfaa haaromsuu': 'Private Clinic License Renewal',
  'Galmee fi mirkaneessa Gahumsaa Industrii konistraakshinii (fooda booda)': 'Construction Industry Competence Registration',
  'Waraqaa qulqullinaa gahumsa ogummaa fayyaa kennuu': 'Health Professional Competence Certificate',
  'Waraqaa qulqullinaa gahumsa ogummaa fayyaa haaromsuu': 'Health Professional Certificate Renewal',
  'Waraqaa qulqullinaa gahumsa dhaabbilee daldalaa kennuu': 'Commercial Establishment Competence Certificate',
  'Waraqaa qulqullinaa gahumsa dhaabilee daldalaa haaromsuu': 'Commercial Establishment Certificate Renewal',
  'Hayyama gahumsa ogummaa dhaabilee aadaa kennuu, haaromsuu, haquu': 'Cultural Institution Professional License',
  'Lakkoosfa kaffalaa Gibiraa(TIN)': 'Tax Identification Number (TIN)',
  'Sassabbii galii Idilee': 'Regular Revenue Collection',
  'Sassaabbii galii M/Qopheessaa': 'Withholding Revenue Collection',
  'Murtii Gibiraa, kaffaltii VAT,TOT fi withholding  galmeessuu': 'Tax Assessment - VAT, TOT, Withholding',
  'Deggersa maxxansa nagahee  kafalaa gibiraa kennuu': 'Tax Receipt Printing Support',
  'Cost shareing  clearance': 'Debt Clearance Certificate',
  "Waraqaaa qulqullina idaa irraa bilisa ta'u ibsu": 'Debt Clearance Certificate',
  'Gabaasa ooditii /Audit Report/': 'Audit Report',
  'Herreega': 'Revenue Accounting',
  'Gumaataa fi galii buusaa gonofaa sassaabuu': 'Voluntary Contribution Collection',
  'sassabbii galii Abba Alangaa': 'Legal Affairs Revenue Collection',
  'Sassaabii galii geejjibaa raawwachuu': 'Transport Revenue Collection',
  'Galii Bishaanii dhugaatii': 'Drinking Water Revenue',
};

// Merge Excel map into static map
Object.keys(EXCEL_OR_TO_EN).forEach((oromo) => {
  STATIC_EN_MAP[oromo] = EXCEL_OR_TO_EN[oromo];
  // Also map with leading numbers stripped
  STATIC_EN_MAP[oromo.replace(/^\d+\.\s*/, '')] = EXCEL_OR_TO_EN[oromo];
});

// Amharic lookup — maps English service name → Amharic
const STATIC_AM_MAP = {
  'Support Letter for Traders - Market Linkage':'ለነጋዴዎች የድጋፍ ደብዳቤ','Community Health Insurance Issuance':'የጤና ኢንሹራንስ መስጠት','Community Health Insurance Renewal':'የጤና ኢንሹራንስ ማደስ','IMX Association Support Packages':'የIMX ማህበር ፓኬጆች','Certificate for IMX to Investment':'ለIMX ወደ ኢንቨስትመንት ምስክር','Various Support Letters':'ልዩ ልዩ የድጋፍ ደብዳቤዎች','Billboard License Support':'የቦርድ ፈቃድ ድጋፍ','Audio Advertisement Permit Letter':'የድምጽ ማስታወቂያ ፈቃድ','Farmer Investment Transition Support':'ለገበሬ ኢንቨስትመንት ሽግግር','Displaced Persons Investment Support Letter':'ለተፈናቀሉ ኢንቨስትመንት ድጋፍ','Support Letter for Teachers & Managers':'ለአስተማሪዎችና ሃላፊዎች ደብዳቤ','Infrastructure Support - Electricity, Road, Water':'የመሰረተ ልማት ድጋፍ','Various Complaints Handling':'ልዩ ልዩ ቅሬታዎች','Various Petitions Handling':'ልዩ ልዩ አቤቱታዎች','Government Employees Complaints':'የመንግስት ሰራተኞች ቅሬታ','Development Displaced Persons Complaint Resolution':'ለልማት ተፈናቅለው ቅሬታ','Teacher/School Manager Transfer':'የአስተማሪ ዝውውር','Lost Regional Certificate Grade 6 & 8':'የጠፋ ሰርተፊኬት','Private/NGO School License':'የግል ት/ቤት ፈቃድ','Government House Repair Permit':'የቤት ጥገና ፈቃድ','Govt/Private House Rent Payment':'የቤት ኪራይ ክፍያ','Slaughter Service License':'የፍሰቻ አገልግሎት ፈቃድ','Private Clinic License Issuance':'የግል ክሊኒክ ፈቃድ','Private Clinic License Renewal':'የግል ክሊኒክ ፈቃድ ማደስ','Design Review & Project Control':'የዲዛይን ግምገማ','Plan Coordination':'የዕቅድ ቅንጅት','Construction Industry Competence Registration':'የህንፃ ኢንዱስትሪ ብቃት ምዝገባ','Health Professional Competence Certificate':'የጤና ሙያ ብቃት','Health Professional Certificate Renewal':'የጤና ሙያ ምስክር ማደስ','Commercial Establishment Competence Certificate':'የንግድ ተቋም ብቃት','Commercial Establishment Certificate Renewal':'የንግድ ተቋም ምስክር ማደስ','Cultural Institution Professional License':'የባህል ተቋም ፈቃድ','Trade License - New, Renewal, Amendment, Cancellation':'የንግድ ፈቃድ','Trade Name Registration':'የንግድ ስም ምዝገባ','Resident ID Issuance':'የነዋሪ መታወቂያ ማውጣት','New Customer Reception & Water Bill':'አዲስ ደንበኛ የውሃ ቢል','IMX Association Legal Status':'የIMX ማህበር ህጋዊ ሁኔታ','Job Seeker Registration & Card Issuance':'የስራ ፈላጊ ምዝገባ','Job Seeker Card Renewal':'የስራ ፈላጊ ካርድ ማደስ','Driving License Renewal':'የሹፌርነት ፈቃድ ማደስ','New Driving License':'አዲስ የሹፌርነት ፈቃድ','Vehicle Deployment Permit':'የተሽከርካሪ አሰፋፈር ፈቃድ','Tax Identification Number (TIN)':'የግብር መለያ ቁጥር','Regular Revenue Collection':'መደበኛ ገቢ አሰባሰብ','Debt Clearance Certificate':'የዕዳ ነፃ ምስክር','Audit Report':'የኦዲት ሪፖርት','Revenue Accounting':'የገቢ ሒሳብ','Transport Revenue Collection':'የትራንስፖርት ገቢ','Drinking Water Revenue':'የጠጣር ውሃ ገቢ','Compensation Payment Expert x2':'ካሳ ክፍያ ባለሙያ x2','Project Payment Expert x2':'የፕሮጀክት ክፍያ ባለሙያ x2','Development Displaced Persons Loan Expert x1':'ብድር ባለሙያ x1','Various Service Payment Expert x2':'ልዩ ልዩ አገልግሎት ክፍያ ባለሙያ x2','Procurement & Service Expert x2':'የግዥ እና አገልግሎት ባለሙያ x2',
};

// Cache all DB requirements once loaded
let DB_REQUIREMENTS = null;

// Fetch all requirements from DB once, cache result
async function fetchRequirementsDB() {
  if (DB_REQUIREMENTS !== null) return DB_REQUIREMENTS;
  try {
    const res  = await fetch((process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + '/requirements');
    const data = await res.json();
    if (data.success && data.data) {
      DB_REQUIREMENTS = data.data; // array of requirement docs
    } else {
      DB_REQUIREMENTS = [];
    }
  } catch {
    DB_REQUIREMENTS = [];
  }
  return DB_REQUIREMENTS;
}

// Look up requirements for a service — DB first, static fallback
function getRequirementsFromCache(serviceName) {
  if (DB_REQUIREMENTS && DB_REQUIREMENTS.length > 0) {
    const name = serviceName.toLowerCase();
    const found = DB_REQUIREMENTS.find((r) =>
      r.serviceName.toLowerCase() === name ||
      name.includes(r.serviceName.toLowerCase()) ||
      r.serviceName.toLowerCase().includes(name)
    );
    if (found) return found;
  }
  return getRequirementsStatic(serviceName);
}

const WINDOW_ICONS = {
  1: <FaIdCard className="w-7 h-7 text-white" />,
  2: <FaEnvelope className="w-7 h-7 text-white" />,
  3: <FaEnvelopeOpenText className="w-7 h-7 text-white" />,
  4: <FaBuilding className="w-7 h-7 text-white" />,
  5: <FaUserCheck className="w-7 h-7 text-white" />,
  6: <FaBriefcase className="w-7 h-7 text-white" />,
  7: <FaFileSignature className="w-7 h-7 text-white" />,
  8: <FaChartLine className="w-7 h-7 text-white" />,
  9: <FaMapMarkedAlt className="w-7 h-7 text-white" />,
  10: <FaHandHoldingUsd className="w-7 h-7 text-white" />,
  11: <FaCog className="w-7 h-7 text-white" />,
};

// Extract display text for a service string based on language
const getServiceText = (svc, lang, servicesEN, servicesAM, index) => {
  // 1. Use DB language arrays if populated AND have correct translation
  if (lang === 'am' && servicesAM && servicesAM[index] && servicesAM[index] !== svc) return servicesAM[index];
  if (lang === 'en' && servicesEN && servicesEN[index] && servicesEN[index] !== svc) return servicesEN[index];
  // 2. Afaan Oromo — always return full string
  if (lang === 'or') return svc;
  // 3. Try exact lookup in static EN map
  const cleanSvc = svc.replace(/^\d+[.)]\s*/, '').trim();
  if (STATIC_EN_MAP[svc]) return lang === 'am' ? (STATIC_AM_MAP[STATIC_EN_MAP[svc]] || STATIC_EN_MAP[svc]) : STATIC_EN_MAP[svc];
  if (STATIC_EN_MAP[cleanSvc]) return lang === 'am' ? (STATIC_AM_MAP[STATIC_EN_MAP[cleanSvc]] || STATIC_EN_MAP[cleanSvc]) : STATIC_EN_MAP[cleanSvc];
  // 4. Try partial match in static EN map
  const svcLower = cleanSvc.toLowerCase();
  for (const key of Object.keys(STATIC_EN_MAP)) {
    const keyClean = key.replace(/^\d+[.)]\s*/, '').toLowerCase();
    if (svcLower.includes(keyClean.slice(0, 20)) || keyClean.includes(svcLower.slice(0, 20))) {
      const en = STATIC_EN_MAP[key];
      return lang === 'am' ? (STATIC_AM_MAP[en] || en) : en;
    }
  }
  // 5. Extract English part from bilingual string format
  const dashIdx = svc.lastIndexOf(' - ');
  if (dashIdx !== -1) {
    const afterDash = svc.slice(dashIdx + 3).trim();
    if (!afterDash.includes(')')) return afterDash;
  }
  const lastOpen = svc.lastIndexOf('(');
  const lastClose = svc.lastIndexOf(')');
  if (lastOpen !== -1 && lastClose > lastOpen) {
    return svc.slice(lastOpen + 1, lastClose).trim();
  }
  // 6. Return cleaned string — strip leading numbers
  return cleanSvc;
};

// Extract English name for requirements lookup
const getEN = (svc) => {
  const dashIdx = svc.lastIndexOf(' - ');
  if (dashIdx !== -1) {
    const afterDash = svc.slice(dashIdx + 3).trim();
    if (!afterDash.includes(')')) return afterDash;
  }
  const lastOpen = svc.lastIndexOf('(');
  if (lastOpen === -1) return svc;
  const lastClose = svc.lastIndexOf(')');
  if (lastClose <= lastOpen) return svc;
  return svc.slice(lastOpen + 1, lastClose).trim();
};

// ── Service Requirements Detail View ──
const ServiceDetail = ({ serviceName, serviceEN, onBack }) => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const reqs = getRequirementsFromCache(serviceEN);

  // Pick the right language field, fall back to English
  const pickField = (reqs, field) => {
    if (!reqs) return null;
    const suffix = currentLang === 'am' ? 'AM' : currentLang === 'or' ? 'OR' : 'EN';
    // Try trilingual field first, then legacy field, then English
    return reqs[field + suffix] || reqs[field + 'EN'] || reqs[field] || null;
  };

  const processingTime = reqs ? pickField(reqs, 'processingTime') : null;
  const fee            = reqs ? pickField(reqs, 'fee') : null;
  const requirements   = reqs ? (pickField(reqs, 'requirements') || []) : [];
  const steps          = reqs ? (pickField(reqs, 'steps') || []) : [];
  const window         = reqs ? reqs.window : null;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>

      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
        <button onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300">
          <FaArrowLeft className="w-3.5 h-3.5" />
          {t('serviceDetail.back')}
        </button>
        <span className="text-gray-300 text-lg">|</span>
        <span className="text-xs text-gray-400 font-medium flex-1">{t('serviceDetail.requiredDocs')}</span>
      </div>

      <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4 mb-5">
        <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">{t('serviceDetail.serviceLabel')}</p>
        <h4 className="font-bold text-dark font-heading text-base leading-tight">{serviceEN}</h4>
        {serviceName !== serviceEN && (
          <p className="text-gray-500 text-xs mt-1">{serviceName}</p>
        )}
      </div>

      {reqs ? (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="card p-4 border border-gray-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EEF1FB' }}>
                <FaClock className="w-4 h-4" style={{ color: '#1E3578' }} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{t('serviceDetail.processingTime')}</p>
                <p className="text-sm font-bold text-dark mt-0.5">{processingTime}</p>
              </div>
            </div>
            <div className="card p-4 border border-gray-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFF8E1' }}>
                <FaMoneyBill className="w-4 h-4" style={{ color: '#B8860B' }} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{t('serviceDetail.fee')}</p>
                <p className="text-sm font-bold text-dark mt-0.5">{fee}</p>
              </div>
            </div>
          </div>

          <div className="card p-5 border border-gray-100">
            <p className="text-sm font-bold text-dark flex items-center gap-2 mb-4 font-heading">
              <FaClipboardList className="w-4 h-4 text-primary" /> {t('serviceDetail.requiredDocs')}
            </p>
            <div className="flex flex-col gap-2.5">
              {requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-3 p-2.5 bg-gray-50 rounded-xl">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold text-white" style={{ backgroundColor: '#1E3578' }}>
                    {i + 1}
                  </div>
                  <span className="text-sm text-gray-700 leading-relaxed">{req}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5 border border-gray-100">
            <p className="text-sm font-bold text-dark flex items-center gap-2 mb-4 font-heading">
              <FaListOl className="w-4 h-4 text-primary" /> {t('serviceDetail.steps')}
            </p>
            <div className="flex flex-col gap-2">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white shadow-sm" style={{ backgroundColor: '#F5C400', color: '#0F1F5C' }}>
                    {i + 1}
                  </div>
                  <span className="text-sm text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center py-3 px-4 rounded-xl text-xs text-gray-500" style={{ backgroundColor: '#F8F9FF', border: '1px solid #EEF1FB' }}>
            📍 {t('serviceDetail.visitNote')} <strong className="text-primary">{window}</strong> {t('serviceDetail.visitNote2')}
          </div>
        </div>
      ) : (
        <div className="card p-6 border border-gray-100 text-center">
          <div className="text-4xl mb-3">📋</div>
          <p className="text-gray-600 text-sm font-medium mb-1">{t('serviceDetail.contactStaff')}</p>
          <p className="text-gray-400 text-xs">{t('serviceDetail.contactStaffSub')}</p>
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-gray-100">
        <Button
          variant="outline"
          size="sm"
          icon={<FaArrowLeft className="w-3.5 h-3.5" />}
          iconPosition="left"
          onClick={onBack}
        >
          {t('serviceDetail.back')}
        </Button>
      </div>
    </motion.div>
  );
};

// ── Window Modal ──
const WindowModal = ({ win, onClose }) => {
  const { t } = useTranslation();
  const { currentLang: lang } = useLanguage(); // read directly — always reactive
  const [selectedService, setSelectedService] = useState(null);

  if (!win) return null;

  const modalTitle = lang === 'am' ? (win.titleAM || win.titleEN) :
                     lang === 'or' ? (win.title || win.titleEN) :
                     win.titleEN || win.nameEN;

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
            {WINDOW_ICONS[win.id] || <FaBuilding className="w-7 h-7 text-white" />}
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: '#F5C400' }}>{win.nameEN}</p>
            <h3 className="font-bold text-white font-heading text-lg leading-tight">{modalTitle}</h3>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-white/60 text-xs">{(win.services || []).length} {t('servicesPage.serviceCategoryLabel')}</p>
              {win.floor && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: 'rgba(245,196,0,0.2)', color: '#F5C400' }}>
                  🏢 {getFloorName(win.floor, lang)}
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {/* Modal body */}
        <div className="overflow-y-auto px-7 py-5" style={{ maxHeight: 'calc(88vh - 100px)', backgroundColor: '#ffffff' }}>
          <AnimatePresence mode="wait">
            {selectedService ? (
              <ServiceDetail
                key="detail"
                serviceName={selectedService.display}
                serviceEN={selectedService.en}
                onBack={() => setSelectedService(null)}
              />
            ) : (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="text-xs text-gray-400 mb-4 flex items-center gap-2">
                  <span style={{ color: '#1E3578' }}>👆</span>
                  {t('serviceDetail.clickHint')}
                </p>
                <div className="flex flex-col gap-2">
                  {(win.services || []).map((svc, i) => {
                    const displayText = getServiceText(svc, lang, win.servicesEN, win.servicesAM, i);
                    // Use DB servicesEN first (most accurate), fall back to parsing the OR string
                    const enText = (win.servicesEN && win.servicesEN[i] && win.servicesEN[i] !== svc)
                      ? win.servicesEN[i]
                      : getEN(svc);
                    const hasReqs = getRequirementsFromCache(enText) !== null;
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
                          <span className="text-[10px] font-semibold text-primary flex-shrink-0 whitespace-nowrap opacity-60 group-hover:opacity-100 transition-opacity">
                            {t('serviceDetail.reqBadge')} →
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
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

  // Fetch windows from API (admin-editable), fall back to static file
  const [windows, setWindows] = useState(STATIC_WINDOWS);
  const [loading, setLoading] = useState(true);
  const [, setReqsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Pre-load all requirements from DB into cache on mount
  useEffect(() => {
    fetchRequirementsDB().then(() => setReqsLoaded(true));
  }, []);

  // Listen for search from Hero search bar
  useEffect(() => {
    const stored = sessionStorage.getItem('mesob_search');
    if (stored) { setSearchQuery(stored); sessionStorage.removeItem('mesob_search'); }

    const handler = (e) => setSearchQuery(e.detail || '');
    window.addEventListener('mesob_search', handler);
    return () => window.removeEventListener('mesob_search', handler);
  }, []);

  useEffect(() => {
    fetch(API + '/services')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          // Map DB shape (windowId) back to frontend shape (id)
          const mapped = data.data.map((w) => ({
            id:         w.windowId,
            name:       w.name,
            nameEN:     w.nameEN,
            nameAM:     w.nameAM  || '',
            title:      w.title,
            titleEN:    w.titleEN,
            titleAM:    w.titleAM,
            floor:      w.floor   || '',
            services:   w.services   || [],
            servicesEN: w.servicesEN || [],
            servicesAM: w.servicesAM || [],
          }));
          setWindows(mapped);
        }
        // No DB data yet — keep STATIC_WINDOWS
      })
      .catch(() => { /* keep static defaults on error */ })
      .finally(() => setLoading(false));
  }, []);

  const total = windows.reduce((s, w) => s + (w.services ? w.services.length : 0), 0);

  // Flat list of individual matching services for search results
  const searchResults = searchQuery.trim()
    ? windows.flatMap((w) =>
        (w.services || [])
          .filter((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((s) => ({ svc: s, win: w }))
      )
    : [];

  const getWindowTitle = (win) => {
    if (currentLang === 'am' && win.titleAM) return win.titleAM;
    if (currentLang === 'or' && win.title) return win.title;
    return win.titleEN || win.nameEN;
  };

  // Get the window name label in current language
  const getWindowName = (win) => {
    if (currentLang === 'am' && win.nameAM) return win.nameAM;
    return win.name || win.nameEN || '';
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
          <p className="section-subtitle">{t('servicesPage.heroSub', { count: windows.length, total })}</p>
          <div className="flex flex-wrap justify-center gap-8 mt-6">
            {[
              { value: windows.length, label: t('servicesPage.windows') },
              { value: `${total}+`,    label: t('servicesPage.totalServices') },
              { value: '8:00–5:00',    label: t('servicesPage.workingDays') },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold font-heading text-primary">{s.value}</p>
                <p className="text-gray-500 text-xs">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Search bar inside services section */}
          <div className="relative max-w-xl mx-auto mt-8">
            <FaCheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" style={{ color: '#1E3578' }} />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('serviceDetail.clickHint')}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white"
              aria-label="Search services"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-semibold">
                ✕ Clear
              </button>
            )}
          </div>
        </div>

        {/* Loading spinner */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <FaSpinner className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}

        {/* Search results — flat list of matching individual services */}
        {!loading && searchQuery.trim() && (
          <div>
            <p className="text-sm text-gray-500 mb-5 text-center">
              {searchResults.length > 0
                ? `Found ${searchResults.length} service${searchResults.length > 1 ? 's' : ''} matching "${searchQuery}"`
                : `No services found for "${searchQuery}"`}
            </p>
            {searchResults.length > 0 && (
              <div className="flex flex-col gap-3 max-w-3xl mx-auto">
                {searchResults.map((item, i) => {
                  const displayText = getServiceText(item.svc, currentLang, item.win.servicesEN, item.win.servicesAM, windows.flatMap(w => w.services).indexOf(item.svc));
                  const enText      = getEN(item.svc);
                  const hasReqs     = getRequirementsFromCache(enText) !== null;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="bg-white rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-sm transition-all overflow-hidden"
                    >
                      <div className="flex items-center gap-4 p-4">
                        {/* Window icon */}
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm" style={{ backgroundColor: '#1E3578' }}>
                          {WINDOW_ICONS[item.win.id] || <FaBuilding className="w-5 h-5 text-white" />}
                        </div>
                        {/* Service info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-dark leading-snug">{displayText}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {item.win.nameEN} — {getWindowTitle(item.win)}
                            {item.win.floor && <span className="ml-2">🏢 {getFloorName(item.win.floor, currentLang)}</span>}
                          </p>
                        </div>
                        {/* Requirements button */}
                        {hasReqs ? (
                          <button
                            onClick={() => { setSelected(item.win); }}
                            className="text-xs font-semibold text-white px-3 py-1.5 rounded-lg flex-shrink-0 transition-all hover:opacity-90"
                            style={{ backgroundColor: '#1E3578' }}
                          >
                            {t('serviceDetail.reqBadge')} →
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelected(item.win)}
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 transition-all"
                            style={{ backgroundColor: '#F8F9FF', color: '#1E3578', border: '1px solid #EEF1FB' }}
                          >
                            View Window →
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Window cards — shown when no search */}
        {!loading && !searchQuery.trim() && (
          <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {windows.map((win, index) => (
              <motion.div key={win.id || index}
                initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelected(win)}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-200 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 cursor-pointer group"
                role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setSelected(win)}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md" style={{ backgroundColor: '#1E3578' }}>
                  {WINDOW_ICONS[win.id] || <FaBuilding className="w-7 h-7 text-white" />}
                </div>
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3" style={{ backgroundColor: '#FFF8E1', color: '#B8860B' }}>
                  {(win.services || []).length} {t('servicesPage.serviceCategoryLabel')}
                </span>
                {win.floor && (
                  <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2 ml-1" style={{ backgroundColor: '#EEF1FB', color: '#1E3578' }}>
                    🏢 {getFloorName(win.floor, currentLang)}
                  </span>
                )}
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#1E3578' }}>
                  {getWindowName(win).toUpperCase()}
                </p>
                <h3 className="font-bold text-dark font-heading text-base leading-snug group-hover:text-primary transition-colors">
                  {getWindowTitle(win)}
                </h3>
              </motion.div>
            ))}
          </div>
          </>
        )}

        <p className="text-center text-gray-400 text-xs mt-6">📌 {t('servicesPage.clickHint')}</p>
      </div>

      <AnimatePresence>
        {selected && <WindowModal win={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;
