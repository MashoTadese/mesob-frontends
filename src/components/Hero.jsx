// ============================================================
// MESOB - Hero Section
// Full-screen image slideshow with blue overlay + rotating mottos
// ============================================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaCheckCircle, FaUsers, FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import partnerLogo from '../assets/Image/Home/logo.png';
import heroPicture from '../assets/Image/Home/picture.jpg';

// Import all 7 images
import img1 from '../assets/Image/back.jpg';
import img2 from '../assets/Image/s.jpg';
import img3 from '../assets/Image/sl.jpg';
import img4 from '../assets/Image/Sp.jpg';
import img5 from '../assets/Image/su.jpg';
import img6 from '../assets/Image/sul.jpg';
import img7 from '../assets/Image/sululta.jpg';

// Smooth scroll helper
const scrollTo = (id) => { const el = document.getElementById(id); if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top, behavior: 'smooth' }); } };

// Slideshow images
const SLIDES = [img1, img2, img3, img4, img5, img6, img7];

// Rotating mottos — trilingual (EN / AM / OR)
const MOTTOS = {
  en: [
    { headline: 'All Government Services, One Location.', sub: '180+ federal services available at MESOB Sululta Branch — no more running between offices.' },
    { headline: 'Your Identity. Your Rights. Simplified.', sub: 'Apply for your National ID, Passport, and Civil Registration documents in minutes.' },
    { headline: 'Business Registration Made Easy.', sub: 'Start your business legally in days — trade licenses, tax registration, and investment permits.' },
    { headline: 'Fast. Transparent. Citizen-First.', sub: 'Digital queuing, real-time updates, and professional staff — serving you with dignity.' },
    { headline: 'Land, Property & Legal Services.', sub: 'Title deeds, land certificates, notary services, and document authentication under one roof.' },
    { headline: 'Serving Sululta with Excellence.', sub: 'MESOB Sululta Branch — where modern government meets the needs of every citizen.' },
    { headline: 'Digital Ethiopia Starts Here.', sub: "Part of Africa's first unified government service platform — MESOB." },
  ],
  am: [
    { headline: 'ሁሉም የመንግስት አገልግሎቶች፣ በአንድ ቦታ።', sub: '180+ የፌዴራል አገልግሎቶች በMESOB ሱሉልታ ቅርንጫፍ — ወደ ብዙ ቢሮዎች መሮጥ አያስፈልግም።' },
    { headline: 'ማንነትዎ። መብትዎ። ቀለል ብሎ።', sub: 'ብሔራዊ መታወቂያ፣ ፓስፖርት እና የሲቪል ምዝገባ ሰነዶችን በደቂቃዎች ያውጡ።' },
    { headline: 'የንግድ ምዝገባ ቀለል ብሏል።', sub: 'ንግድዎን በሕጋዊ መንገድ በቀናት ይጀምሩ — የንግድ ፈቃዶች፣ የግብር ምዝገባ እና የኢንቨስትመንት ፈቃዶች።' },
    { headline: 'ፈጣን። ግልጽ። ዜጎችን ያማከለ።', sub: 'ዲጂታል ወረፋ፣ ወቅታዊ ዝማኔዎች እና ሙያዊ ሰራተኞች — በክብር ያገለግሉዎታል።' },
    { headline: 'የመሬት፣ ንብረትና ህጋዊ አገልግሎቶች።', sub: 'የቦታ ሰነዶች፣ የመሬት ምስክር ወረቀቶች፣ የኖታሪ አገልግሎቶች — ሁሉም በአንድ ቦታ።' },
    { headline: 'ሱሉልታን በልህቀት እናገለግላለን።', sub: 'MESOB ሱሉልታ ቅርንጫፍ — ዘምናዊ መንግስት ለሁሉም ዜጎች የሚቀርብበት ቦታ።' },
    { headline: 'ዲጂታል ኢትዮጵያ ከዚህ ይጀምራል።', sub: 'የአፍሪካ የመጀመሪያ አንድ ወጥ የመንግስት አገልግሎት ፕላትፎርም አካል — MESOB።' },
  ],
  or: [
    { headline: "Tajaajilota Mootummaa Hunda, Bakka Tokkotti.", sub: "Tajaajilota federaalaa 180+ MESOB Damee Sululta — biiroo hedduutti deemuun dhaabbate." },
    { headline: "Eenyummaa Kee. Mirga Kee. Salphatti.", sub: "Eenyummaa Biyyoolessaa, Paaspoortii fi Sanadoota Sivilii daqiiqaawwan muraasa keessatti fudhattadhu." },
    { headline: "Galmee Daldalaaf Salphaa Ta'e.", sub: "Daldalaa kee seeraan guyyoota muraasa keessatti jalqabi — hayyama daldalaa, galmee gibiraa fi hayyama invastimantii." },
    { headline: "Ariitii. Ifa. Lammiilee Dursa Kenna.", sub: "Tartiiba dijitaalaa, haaroomsaa yeroo dhugaa fi hojjattoota ogeessota — kabajaan si tajaajilu." },
    { headline: "Tajaajila Lafa, Qabiyyee fi Seeraa.", sub: "Waraqaalee qabeenyaa, sanadoota lafa, tajaajila notaarii — hundi bakka tokkotti." },
    { headline: "Sululta Baayyinaan Tajaajilaa.", sub: "MESOB Damee Sululta — mootummaan ammayyaan barbaachisoo lammii hunda guutuu." },
    { headline: "Itoophiyaan Dijitaalaan Asirraa Eegali.", sub: "Kutaa platform tajaajila mootummaa gamtaa Afriikaa keessaa jalqabaa — MESOB." },
  ],
};

const Hero = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Pick mottos based on current language
  const mottos = MOTTOS[currentLang] || MOTTOS.en;

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const motto = mottos[current % mottos.length];

  // Search: scroll to services section and store query for filtering
  const handleSearch = () => {
    const q = searchQuery.trim();
    if (!q) {
      scrollTo('services');
      return;
    }
    // Store in sessionStorage so ServicesSection can read it
    sessionStorage.setItem('mesob_search', q);
    scrollTo('services');
    // Dispatch event so ServicesSection can react immediately
    window.dispatchEvent(new CustomEvent('mesob_search', { detail: q }));
  };

  const handleSearchKey = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" aria-label="Hero section">

      {/* ── BACKGROUND SLIDESHOW ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${SLIDES[current]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          aria-hidden="true"
        />
      </AnimatePresence>

      {/* ── MESOB BLUE OVERLAY — reduced opacity so images show clearly ── */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, rgba(15,31,92,0.65) 0%, rgba(30,53,120,0.60) 50%, rgba(30,58,138,0.55) 100%)' }}
      />

      {/* ── Gold accent line at top ── */}
      <div className="absolute top-0 left-0 right-0 h-1 z-10" style={{ background: 'linear-gradient(90deg, #F5C400, #FFE54D, #F5C400)' }} />

      {/* ── Dot grid ── */}
      <div className="absolute inset-0 opacity-5 z-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      {/* ── CONTENT ── */}
      <div className="relative z-20 section-container w-full py-24 pt-36 md:pt-28">
        <div className="flex flex-col items-center text-center text-white max-w-4xl mx-auto">

          {/* Logos row — new logo on left, MESOB logo in center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-7 flex items-center justify-center gap-6"
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ boxShadow: '0 0 0 4px rgba(245,196,0,0.5)', overflow: 'hidden' }}>
              <img
                src={partnerLogo}
                alt="Partner Logo"
                className="w-full h-full rounded-full"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <img
              src="/logo.png"
              alt="MESOB Official Logo"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full"
              style={{ objectFit: 'cover', boxShadow: '0 0 0 4px rgba(245,196,0,0.5), 0 0 40px rgba(245,196,0,0.2)' }}
            />
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ boxShadow: '0 0 0 4px rgba(245,196,0,0.5), 0 0 40px rgba(245,196,0,0.2)', overflow: 'hidden' }}>
              <img
                src={heroPicture}
                alt="Sululta Branch"
                className="w-full h-full"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 border"
              style={{ backgroundColor: 'rgba(245,196,0,0.15)', borderColor: 'rgba(245,196,0,0.4)', color: '#FFE54D' }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#F5C400' }} />
              {t('hero.badge')}
            </span>
          </motion.div>

          {/* ── ROTATING HEADLINE ── */}
          <div className="min-h-[100px] md:min-h-[80px] flex items-center justify-center mb-4 w-full">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`headline-${current}`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="text-3xl md:text-5xl xl:text-6xl font-bold font-heading leading-tight"
              >
                {motto.headline.split(' ').map((word, i, arr) => {
                  // Highlight last word in gold
                  if (i === arr.length - 1) {
                    return <span key={i} style={{ color: '#F5C400' }}>{word} </span>;
                  }
                  return <span key={i}>{word} </span>;
                })}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* ── ROTATING SUBTITLE ── */}
          <div className="min-h-[56px] flex items-center justify-center mb-8 w-full">
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${current}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-base md:text-xl max-w-2xl leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                {motto.sub}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-2xl mb-8"
          >
            <div
              className="flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <FaSearch className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.6)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKey}
                placeholder={currentLang === 'am' ? 'አገልግሎቶች እና ተቋማትን ይፈልጉ' : currentLang === 'or' ? 'Tajaajilota fi dhaabbilee barbaadi' : 'Search for Services and Institutions'}
                className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-sm"
                aria-label="Search services"
              />
              <button
                onClick={handleSearch}
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 font-bold"
                style={{ backgroundColor: '#F5C400' }}
                aria-label="Search"
              >
                <FaSearch className="w-3.5 h-3.5" style={{ color: '#0F1F5C' }} />
              </button>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center mb-10"
          >
            <button onClick={() => scrollTo("services")} className="inline-flex items-center gap-2.5 px-8 py-4 font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 text-sm" style={{ backgroundColor: "#F5C400", color: "#0F1F5C" }}>
              {t('hero.bookBtn')} <FaArrowRight className="w-4 h-4" /></button>
            <button onClick={() => scrollTo("organizations")} className="inline-flex items-center gap-2.5 px-8 py-4 font-semibold rounded-2xl border-2 hover:-translate-y-0.5 transition-all duration-200 text-sm" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff", backgroundColor: "rgba(255,255,255,0.1)" }}>
              {t('hero.exploreBtn')} <FaArrowRight className="w-4 h-4" /></button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {[
              { icon: <FaCheckCircle />, label: t('hero.badge1') },
              { icon: <FaUsers />,       label: t('hero.badge3') },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
                <span style={{ color: '#F5C400' }}>{b.icon}</span>
                {b.label}
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* ── SLIDE INDICATORS ── */}
      <div className="absolute bottom-20 left-0 right-0 z-20 flex justify-center gap-2" aria-label="Slide indicators">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? '28px' : '8px',
              height: '8px',
              backgroundColor: i === current ? '#F5C400' : 'rgba(255,255,255,0.4)',
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Bottom wave ── */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white" aria-hidden="true">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
