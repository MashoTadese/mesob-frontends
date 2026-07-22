// ============================================================
// MESOB - Home Page
// Sections: Hero, Stats, About, Services, Organizations, Testimonials, FAQ
// Removed: Departments, Appointment, Queue, News
// ============================================================

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FaArrowRight, FaCheckCircle, FaEye,
  FaBullseye, FaHandshake,
  FaFileContract, FaGlobe, FaCoins, FaIndustry,
  FaMapMarked, FaBalanceScale, FaHandsHelping, FaBriefcase,
} from 'react-icons/fa';

import Hero            from '../components/Hero';
import StatisticCard   from '../components/StatisticCard';
import TestimonialCard from '../components/TestimonialCard';
import FAQAccordion    from '../components/FAQAccordion';
const scrollTo = (id) => { const el = document.getElementById(id); if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top, behavior: 'smooth' }); } };

import {
  STATISTICS, ORGANIZATIONS,
  TESTIMONIALS, FAQS,
} from '../utils/constants';

// Most requested services — matching Shashemene MESOB style
const MOST_REQUESTED = [
  {
    id: 1,
    title: 'Waraqaa Eenyummaa Jirataa',
    titleEN: 'Resident ID Card',
    desc: 'Galmee, Kaardii Kennuu fi Haaromsa hojii barbadootaaf',
    emoji: '🪪',
    window: 1,
    windowName: 'Fooddaa 1ffaa',
  },
  {
    id: 2,
    title: 'Hayyama Daldalaa',
    titleEN: 'Trade License',
    desc: 'Hayyama daldalaa kennuu, haaromsuu, fooyyessuu fi haquu',
    emoji: '📄',
    window: 6,
    windowName: 'Fooddaa 6ffaa',
  },
  {
    id: 3,
    title: 'PLC Hundeeffamaa',
    titleEN: 'Private Limited Company',
    desc: 'Daldaala Dhuunfaa Itti Gaafatamummaa Isaa Murtaa\'e Mirkaneessuu',
    emoji: '🏢',
    window: 7,
    windowName: 'Fooddaa 7ffaa',
  },
  {
    id: 4,
    title: 'Galmeessaa fi Kenna Kaartaa Lafaa',
    titleEN: 'Land Certificate',
    desc: 'Galmeessaa fi Kenna Kaartaa qabbiyyee fi ragaalee lafaa',
    emoji: '🗺️',
    window: 9,
    windowName: 'Fooddaa 9ffaa',
  },
  {
    id: 5,
    title: 'Sassabbii Galii / TIN',
    titleEN: 'Tax / Revenue Services',
    desc: 'Lakkoofsa kaffalaa Gibiraa (TIN) fi kaffaltii gibiraa',
    emoji: '🧾',
    window: 10,
    windowName: 'Fooddaa 10ffaa',
  },
  {
    id: 6,
    title: 'Inshuraansii Fayyaa Hawaasaa',
    titleEN: 'Community Health Insurance',
    desc: 'Inshuraansii fayyaa hawaasaa kennuu fi haaromsuu',
    emoji: '🏥',
    window: 2,
    windowName: 'Fooddaa 2ffaa',
  },
];

const ICON_MAP = {
  FaFileContract, FaGlobe, FaCoins, FaIndustry,
  FaMapMarked, FaBalanceScale, FaHandsHelping, FaBriefcase,
};

const SectionHeader = ({ badge, title, subtitle }) => (
  <div className="text-center mb-12">
    {badge && (
      <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 text-primary text-xs font-semibold rounded-full mb-4 border border-primary-100">
        <span className="w-1.5 h-1.5 bg-primary rounded-full" />
        {badge}
      </span>
    )}
    <h2 className="section-title">{title}</h2>
    {subtitle && <p className="section-subtitle">{subtitle}</p>}
  </div>
);

const HomePage = () => {
  const { t } = useTranslation();
  const featuredOrgs        = ORGANIZATIONS.slice(0, 4);
  const featuredFaqs        = FAQS.slice(0, 5);

  return (
    <>
      {/* HERO */}
      <Hero />

      {/* STATISTICS */}
      <StatisticCard stats={STATISTICS} />

      {/* ABOUT PREVIEW */}
      <section className="section-padding bg-light" id="about-preview" aria-labelledby="about-heading">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 text-primary text-xs font-semibold rounded-full mb-5 border border-primary-100">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                {t('about.badge')}
              </span>
              <h2 id="about-heading" className="section-title mb-5">
                {t('about.heading1')}{' '}
                <span className="text-gradient">{t('about.heading2')}</span>{' '}
                {t('about.heading3')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                MESOB (Modern Ethiopian Services for Organized Benefit) is Ethiopia's first unified one-stop government service platform — bringing 180+ federal services under one roof at the Sululta Branch.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Citizens no longer need to travel to multiple offices. Every service — from ID and passport to business licenses and land certificates — is available in one modern, digital facility.
              </p>

              {/* MVV cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: <FaBullseye className="w-5 h-5 text-primary" />, label: t('about.mission'), text: t('about.missionText') },
                  { icon: <FaEye className="w-5 h-5" style={{ color: '#F5C400' }} />, label: t('about.vision'), text: t('about.visionText') },
                  { icon: <FaHandshake className="w-5 h-5 text-primary" />, label: t('about.values'), text: t('about.valuesText') },
                ].map((item, i) => (
                  <div key={i} className="card p-4 border border-gray-100">
                    <div className="w-9 h-9 bg-primary-50 rounded-xl flex items-center justify-center mb-3">{item.icon}</div>
                    <p className="font-bold text-sm text-dark font-heading mb-1">{item.label}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              <Link to="/about" className="btn-primary mt-8 inline-flex">
                {t('about.learnMore')} <FaArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Right: info card */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div
                className="rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #0F1F5C 0%, #1E3578 60%, #1E3A8A 100%)' }}
              >
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #F5C400, #FFE54D)' }} />
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F5C400' }}>
                      <span className="font-bold text-lg" style={{ color: '#0F1F5C' }}>M</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm">MESOB Sululta Branch</p>
                      <p className="text-white/60 text-xs">One-Stop Service Center</p>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold font-heading mb-2">
                    Serving Citizens <span style={{ color: '#F5C400' }}>Since July 2026</span>
                  </h3>
                  <p className="text-white/70 text-sm mb-6">Africa's first integrated government service platform — modern, efficient, and fully digital.</p>
                  {[
                    '180+ Government Services in One Place',
                    '24 Federal Organizations Under One Roof',
                    'Multilingual Service (EN / AM / OR)',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 mb-3">
                      <FaCheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-white/80">{item}</span>
                    </div>
                  ))}
                  <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                    {[
                      { label: 'Est.', value: 'July 2026' },
                      { label: 'Services',     value: '180+' },
                      { label: 'Orgs',         value: '24+' },
                    ].map((s, i) => (
                      <div key={i}>
                        <p className="text-white/60 text-xs">{s.label}</p>
                        <p className="text-2xl font-bold font-heading" style={{ color: '#F5C400' }}>{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MOST REQUESTED SERVICES — like Shashemene MESOB */}
      <section className="section-padding bg-white" id="featured-services" aria-labelledby="services-heading">
        <div className="section-container">
          <SectionHeader
            badge={t('services.badge')}
            title="Irra Deddebiin Gaafataman"
            subtitle="Most Frequently Requested Services — click to go directly to the window that handles it."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MOST_REQUESTED.map((svc, index) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="card border border-gray-100 hover:border-primary-200 hover:-translate-y-1 transition-all group p-5 flex flex-col"
              >
                {/* Emoji + window badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{svc.emoji}</div>
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                    style={{ backgroundColor: '#EEF1FB', color: '#1E3578' }}
                  >
                    Window {svc.window}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-dark font-heading text-base mb-0.5 group-hover:text-primary transition-colors">
                  {svc.titleEN}
                </h3>
                <p className="text-xs font-medium mb-2" style={{ color: '#1E3578' }}>
                  {svc.title}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{svc.desc}</p>

                {/* Go to window */}
                <Link
                  to={`/services#window-${svc.window}`}
                  className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all hover:scale-105"
                  style={{ backgroundColor: '#F5C400', color: '#0F1F5C' }}
                >
                  {svc.windowName} — View Services
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button onClick={() => scrollTo("services")} className="btn-secondary inline-flex">
              View All Services by Window <FaArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      </section>

      {/* ORGANIZATIONS PREVIEW */}
      <section className="section-padding bg-light" id="organizations-preview" aria-labelledby="orgs-heading">
        <div className="section-container">
          <SectionHeader
            badge="Federal Organizations"
            title="Organizations at MESOB"
            subtitle="24 federal institutions operating under one roof — all accessible at the Sululta Branch."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredOrgs.map((org, index) => {
              const Icon = ICON_MAP[org.icon] || FaFileContract;
              return (
                <motion.div
                  key={org.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="card p-5 border border-gray-100 hover:border-primary-200 hover:-translate-y-1 transition-all group"
                >
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="inline-block px-2.5 py-0.5 bg-primary-100 text-primary text-xs font-bold rounded-full mb-2">
                    {org.shortName}
                  </span>
                  <h4 className="font-bold text-sm text-dark font-heading leading-snug mb-2 group-hover:text-primary transition-colors">
                    {org.name}
                  </h4>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{org.description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <button onClick={() => scrollTo("organizations")} className="btn-secondary inline-flex">
              View All Organizations <FaArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F1F5C 0%, #1E3578 60%, #1E3A8A 100%)' }}
        aria-labelledby="testimonials-heading"
      >
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #F5C400, #FFE54D, #F5C400)' }} />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="section-container relative z-10">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white/90 text-xs font-semibold rounded-full mb-4 border border-white/20">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              {t('testimonials.badge')}
            </span>
            <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold font-heading text-white mb-3">
              {t('testimonials.heading')}
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">{t('testimonials.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((item, index) => (
              <TestimonialCard key={item.id} testimonial={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-light" id="faq" aria-labelledby="faq-heading">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              badge={t('faq.badge')}
              title={t('faq.heading')}
              subtitle={t('faq.subtitle')}
            />
            <FAQAccordion faqs={featuredFaqs} />
            <div className="text-center mt-8">
              <p className="text-gray-500 text-sm mb-4">{t('faq.cantFind')}</p>
              <Link to="/contact" className="btn-primary inline-flex">
                {t('faq.contactSupport')} <FaArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 bg-white" aria-label="Call to action">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl px-8 py-12 md:px-14 md:py-16 text-white text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0F1F5C 0%, #1E3578 60%, #1E3A8A 100%)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #F5C400, #FFE54D, #F5C400)' }} />
            <div className="absolute top-0 right-0 w-56 h-56 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold font-heading mb-4">
                Ready to Access Government Services?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Visit MESOB Sululta Branch — all 180+ government services, 24 organizations, one location.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button onClick={() => scrollTo("services")} className="inline-flex items-center gap-2 px-8 py-4 font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm"
                  style={{ backgroundColor: '#F5C400', color: '#0F1F5C' }}
                >
                  Browse Services <FaArrowRight className="w-4 h-4" /></button>
                <button onClick={() => scrollTo("contact")} className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl border border-white/30 hover:bg-white/20 hover:-translate-y-0.5 transition-all text-sm"
                >
                  Get Directions <FaArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
