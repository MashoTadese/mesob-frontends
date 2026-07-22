// ============================================================
// MESOB - Footer (Single Page scroll navigation)
// ============================================================
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaTwitter, FaTelegramPlane, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaChevronRight } from 'react-icons/fa';
import { CONTACT_INFO } from '../utils/constants';

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: t('nav.home'),          id: 'home' },
    { label: t('nav.about'),         id: 'about' },
    { label: t('nav.services'),      id: 'services' },
    { label: t('nav.organizations'), id: 'organizations' },
    { label: 'FAQ',                  id: 'faq' },
    { label: t('nav.complaint'),     id: 'complaint' },
    { label: t('nav.contact'),       id: 'contact' },
  ];

  const serviceLinks = [
    { label: t('serviceNames.nationalId'),       id: 'services' },
    { label: t('serviceNames.passportServices'), id: 'services' },
    { label: t('serviceNames.businessLicense'),  id: 'services' },
    { label: t('serviceNames.civilRegistration'),id: 'services' },
    { label: t('serviceNames.taxServices'),      id: 'services' },
    { label: t('serviceNames.documentAuth'),     id: 'services' },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />,     href: CONTACT_INFO.social.facebook, label: 'Facebook',  bg: 'hover:bg-blue-600' },
    { icon: <FaTwitter />,       href: CONTACT_INFO.social.twitter,  label: 'Twitter',   bg: 'hover:bg-sky-500' },
    { icon: <FaTelegramPlane />, href: CONTACT_INFO.social.telegram, label: 'Telegram',  bg: 'hover:bg-blue-500' },
    { icon: <FaYoutube />,       href: CONTACT_INFO.social.youtube,  label: 'YouTube',   bg: 'hover:bg-red-600' },
  ];

  return (
    <footer className="text-gray-300" style={{ backgroundColor: '#0F1F5C' }} role="contentinfo">
      <div className="h-1" style={{ background: 'linear-gradient(90deg, #F5C400, #FFE54D, #F5C400)' }} />

      <div className="section-container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <button onClick={() => scrollTo('home')} className="flex items-center gap-3 mb-5 group">
              <img src="/logo.png" alt="MESOB Logo" className="w-11 h-11 rounded-full logo-spin flex-shrink-0"
                style={{ objectFit: 'cover', boxShadow: '0 0 0 2px rgba(245,196,0,0.4)' }} />
              <div>
                <span className="block text-white font-bold text-lg font-heading leading-tight">MESOB</span>
                <span className="block text-gray-500 text-[10px]">Sululta Branch</span>
              </div>
            </button>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{t('footer.desc')}</p>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className={`w-9 h-9 bg-white/10 ${s.bg} text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all`}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 font-heading">{t('footer.quickLinks')}</h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button onClick={() => scrollTo(link.id)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group text-left">
                    <FaChevronRight className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" style={{ color: '#F5C400' }} />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 font-heading">{t('footer.ourServices')}</h3>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <button onClick={() => scrollTo(link.id)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group text-left">
                    <FaChevronRight className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" style={{ color: '#F5C400' }} />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 font-heading">{t('footer.contactUs')}</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#F5C400' }} />
                <span className="text-sm text-gray-400 leading-relaxed">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="w-4 h-4 flex-shrink-0" style={{ color: '#F5C400' }} />
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-sm text-gray-400 hover:text-white transition-colors">{CONTACT_INFO.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="w-4 h-4 flex-shrink-0" style={{ color: '#F5C400' }} />
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm text-gray-400 hover:text-white transition-colors">{CONTACT_INFO.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <FaClock className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#F5C400' }} />
                <div className="text-sm text-gray-400">
                  <p>{CONTACT_INFO.hours}</p>
                  <p>{CONTACT_INFO.hoursSat}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {currentYear} One Stop Service Center (MESOB) Sululta. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-5">
            <span className="text-gray-500 text-xs">{t('footer.privacy', { defaultValue: 'Privacy Policy' })}</span>
            <span className="text-gray-500 text-xs">{t('footer.terms', { defaultValue: 'Terms of Service' })}</span>
            <span className="text-gray-600 text-xs">🇪🇹 {t('footer.madeIn')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
