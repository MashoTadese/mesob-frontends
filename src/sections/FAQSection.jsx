// ============================================================
// MESOB - FAQ Section
// FAQs loaded from API (admin-editable), falls back to static data
// ============================================================
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaArrowRight } from 'react-icons/fa';
import FAQAccordion from '../components/FAQAccordion';
import { FAQS as STATIC_FAQS } from '../utils/constants';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const FAQSection = () => {
  const { t } = useTranslation();
  const [faqs, setFaqs] = useState(STATIC_FAQS);

  useEffect(() => {
    fetch(API + '/content')
      .then((r) => r.json())
      .then((data) => {
        if (
          data.success &&
          data.data.faqs &&
          Array.isArray(data.data.faqs) &&
          data.data.faqs.length > 0
        ) {
          setFaqs(data.data.faqs);
        }
        // If no admin FAQs yet, keep static defaults
      })
      .catch(() => { /* keep static defaults on error */ });
  }, []);

  return (
    <section className="py-20 bg-light" aria-label="FAQ" id="faq">
      <div className="section-container max-w-3xl">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 text-primary text-xs font-semibold rounded-full mb-4 border border-primary-100">
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />{t('faq.badge')}
          </span>
          <h2 className="section-title">{t('faq.heading')}</h2>
          <p className="section-subtitle">{t('faq.subtitle')}</p>
        </div>
        <FAQAccordion faqs={faqs.slice(0, 10)} />
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm mb-4">{t('faq.cantFind')}</p>
          <button
            onClick={() => { const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary inline-flex"
          >
            {t('faq.contactSupport')} <FaArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
