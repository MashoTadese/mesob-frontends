// MESOB - Contact Section
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebookF, FaTwitter, FaTelegramPlane, FaYoutube } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';
import { CONTACT_INFO } from '../utils/constants';

const ContactSection = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: <FaFacebookF />, href: CONTACT_INFO.social.facebook, label: 'Facebook', bg: 'hover:bg-blue-600' },
    { icon: <FaTwitter />, href: CONTACT_INFO.social.twitter, label: 'Twitter', bg: 'hover:bg-sky-500' },
    { icon: <FaTelegramPlane />, href: CONTACT_INFO.social.telegram, label: 'Telegram', bg: 'hover:bg-blue-500' },
    { icon: <FaYoutube />, href: CONTACT_INFO.social.youtube, label: 'YouTube', bg: 'hover:bg-red-600' },
  ];

  const quickCards = [
    { icon: <FaPhoneAlt className="w-6 h-6 text-primary" />, title: t('contact.callUs'), info: CONTACT_INFO.phone, sub: t('contact.callSub'), href: `tel:${CONTACT_INFO.phone}` },
    { icon: <FaEnvelope className="w-6 h-6 text-primary" />, title: t('contact.emailUs'), info: CONTACT_INFO.email, sub: t('contact.emailSub'), href: `mailto:${CONTACT_INFO.email}` },
    { icon: <FaMapMarkerAlt className="w-6 h-6 text-primary" />, title: t('contact.visitUs'), info: t('contact.visitAddr'), sub: t('contact.visitSub'), href: '#contact' },
  ];

  return (
    <section className="py-20 bg-white" aria-label="Contact">
      <div className="section-container">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 text-primary text-xs font-semibold rounded-full mb-4 border border-primary-100">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />{t('contact.pageTitle')}
          </span>
          <h2 className="section-title">{t('contact.pageTitle')}</h2>
          <p className="section-subtitle">{t('contact.pageSubtitle')}</p>
        </div>

        {/* Quick cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {quickCards.map((item, i) => (
            <motion.a key={i} href={item.href} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="card p-6 border border-gray-100 flex items-start gap-4 hover:-translate-y-1 transition-transform group no-underline">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <div>
                <p className="font-bold text-dark font-heading text-sm mb-0.5">{item.title}</p>
                <p className="text-primary font-semibold text-sm">{item.info}</p>
                <p className="text-gray-400 text-xs mt-0.5">{item.sub}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Map + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: map + info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col gap-6">
            <div className="rounded-2xl overflow-hidden shadow-card h-72">
              <iframe title="MESOB Location" src={CONTACT_INFO.mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full" />
            </div>
            <div className="card p-6 border border-gray-100">
              <div className="flex flex-col gap-4">
                {[
                  { icon: <FaMapMarkerAlt className="w-4 h-4 flex-shrink-0" style={{ color: '#1E3578' }} />, value: CONTACT_INFO.address },
                  { icon: <FaPhoneAlt className="w-4 h-4 flex-shrink-0" style={{ color: '#1E3578' }} />, value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}` },
                  { icon: <FaEnvelope className="w-4 h-4 flex-shrink-0" style={{ color: '#1E3578' }} />, value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
                  { icon: <FaClock className="w-4 h-4 flex-shrink-0" style={{ color: '#1E3578' }} />, value: `${CONTACT_INFO.hours} | ${CONTACT_INFO.hoursSat}` },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">{item.icon}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-dark hover:text-primary transition-colors font-medium mt-1">{item.value}</a>
                    ) : (
                      <p className="text-sm text-dark font-medium mt-1">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-medium mb-3">{t('contact.followUs')}</p>
                <div className="flex gap-3">
                  {socialLinks.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                      className={`w-9 h-9 bg-gray-100 ${s.bg} text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-all`}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="card p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-dark font-heading mb-1">{t('contact.formTitle')}</h3>
              <p className="text-gray-500 text-sm mb-6">{t('contact.formSubtitle')}</p>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
