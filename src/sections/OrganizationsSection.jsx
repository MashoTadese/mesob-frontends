// MESOB - Organizations Section
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaFileContract, FaGlobe, FaCoins, FaIndustry, FaMapMarked, FaBalanceScale, FaHandsHelping, FaBriefcase, FaArrowRight, FaCheckCircle, FaSearch, FaPhoneAlt, FaTimes } from 'react-icons/fa';
import { ORGANIZATIONS, COLOR_MAP } from '../utils/constants';

const ICON_MAP = { FaFileContract, FaGlobe, FaCoins, FaIndustry, FaMapMarked, FaBalanceScale, FaHandsHelping, FaBriefcase };

const OrgModal = ({ org, onClose }) => {
  const { t } = useTranslation();
  const Icon = ICON_MAP[org.icon] || FaFileContract;
  const colors = COLOR_MAP[org.color] || COLOR_MAP.primary;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(15,31,92,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose} role="dialog" aria-modal="true">
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-primary-100"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start gap-4 mb-5">
          <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-8 h-8 ${colors.icon}`} />
          </div>
          <div className="flex-1">
            <span className={`badge ${colors.badge} text-xs font-bold mb-1`}>{org.shortName}</span>
            <h3 className="text-lg font-bold text-dark font-heading leading-tight">{org.name}</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 transition-colors flex-shrink-0">
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

const OrganizationsSection = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = ORGANIZATIONS.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
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

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-10">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input type="search" placeholder={t('organizations.searchPlaceholder')} value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
            aria-label="Search organizations" />
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((org, index) => {
              const Icon = ICON_MAP[org.icon] || FaFileContract;
              const colors = COLOR_MAP[org.color] || COLOR_MAP.primary;
              return (
                <motion.div key={org.id} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.05 }}
                  onClick={() => setSelected(org)} className="card border border-gray-100 hover:border-primary-200 hover:-translate-y-1 transition-all cursor-pointer group overflow-hidden"
                  role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setSelected(org)}>
                  <div className={`h-1.5 ${colors.bg} group-hover:bg-primary transition-colors`} />
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
                        <Icon className={`w-6 h-6 ${colors.icon}`} />
                      </div>
                      <span className={`badge ${colors.badge} text-xs font-bold`}>{org.shortName}</span>
                    </div>
                    <h3 className="font-bold text-dark font-heading text-sm mb-2 group-hover:text-primary transition-colors leading-snug">{org.name}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{org.description}</p>
                    <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-primary">
                      {t('organizations.viewDetails')} <FaArrowRight className="w-3 h-3" />
                    </div>
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

export default OrganizationsSection;
