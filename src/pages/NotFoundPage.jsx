// ============================================================
// MESOB - 404 Not Found Page (fully i18n)
// ============================================================

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaHome, FaArrowLeft, FaEnvelope } from 'react-icons/fa';

const NotFoundPage = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { label: t('nav.home'),          path: '/',              emoji: '🏠' },
    { label: t('nav.services'),      path: '/services',      emoji: '📋' },
    { label: t('nav.organizations'), path: '/organizations', emoji: '🏛️' },
    { label: t('nav.contact'),       path: '/contact',       emoji: '✉️' },
  ];

  return (
    <div className="min-h-screen bg-light flex flex-col items-center justify-center p-6 text-center">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 mb-12">
        <img src="/logo.png" alt="MESOB Logo" className="w-10 h-10 rounded-full logo-spin" style={{ objectFit: 'cover' }} />
        <span className="font-bold text-xl font-heading" style={{ color: '#1E3578' }}>MESOB</span>
      </Link>

      {/* 404 */}
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="mb-8">
        <div className="relative inline-block">
          <span className="text-[10rem] md:text-[14rem] font-black font-heading text-primary-100 leading-none select-none">404</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-bounce">😕</div>
          </div>
        </div>
      </motion.div>

      {/* Message */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="max-w-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-dark font-heading mb-3">{t('notFound.title')}</h1>
        <p className="text-gray-500 text-lg leading-relaxed mb-2">{t('notFound.desc')}</p>
        <p className="text-gray-400 text-sm mb-8">
          {t('notFound.errorCode')}: <code className="bg-gray-100 px-2 py-0.5 rounded text-primary font-mono">404</code>
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <Link to="/" className="btn-primary inline-flex">
            <FaHome className="w-4 h-4" /> {t('notFound.goHome')}
          </Link>
          <button onClick={() => window.history.back()} className="btn-secondary inline-flex">
            <FaArrowLeft className="w-4 h-4" /> {t('notFound.goBack')}
          </button>
        </div>

        <p className="text-gray-400 text-sm mb-4">{t('notFound.quickLinksTitle')}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {quickLinks.map((link) => (
            <Link key={link.path} to={link.path}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-primary-200 hover:text-primary hover:bg-primary-50 transition-all shadow-sm">
              <span>{link.emoji}</span>{link.label}
            </Link>
          ))}
        </div>
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="mt-12 text-gray-400 text-sm flex items-center gap-2">
        <FaEnvelope className="w-3.5 h-3.5" />
        {t('notFound.needHelp')}{' '}
        <a href="mailto:info@mesob.gov.et" className="text-primary hover:underline font-medium">
          {t('notFound.contactSupport')}
        </a>
      </motion.p>
    </div>
  );
};

export default NotFoundPage;
