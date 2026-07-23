// ============================================================
// MESOB - Complaint Section (fully i18n)
// ============================================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FaExclamationTriangle, FaUser, FaEnvelope, FaPhoneAlt,
  FaCheckCircle, FaTimesCircle, FaPaperPlane,
} from 'react-icons/fa';
import Input, { Select, Textarea } from '../components/Input';
import Button from '../components/Button';
import { isValidEmail, isValidPhone } from '../utils/helpers';
import { complaintAPI } from '../services/api';

const ComplaintSection = () => {
  const { t } = useTranslation();

  const DEPARTMENT_OPTIONS = [
    { value: 'window1',  label: t('complaintSection.w1') },
    { value: 'window2',  label: t('complaintSection.w2') },
    { value: 'window3',  label: t('complaintSection.w3') },
    { value: 'window4',  label: t('complaintSection.w4') },
    { value: 'window5',  label: t('complaintSection.w5') },
    { value: 'window6',  label: t('complaintSection.w6') },
    { value: 'window7',  label: t('complaintSection.w7') },
    { value: 'window8',  label: t('complaintSection.w8') },
    { value: 'window9',  label: t('complaintSection.w9') },
    { value: 'window10', label: t('complaintSection.w10') },
    { value: 'window11', label: t('complaintSection.w11') },
    { value: 'general',  label: t('complaintSection.wGeneral') },
  ];

  const TYPE_OPTIONS = [
    { value: 'delay',      label: t('complaintSection.typeDelay') },
    { value: 'conduct',    label: t('complaintSection.typeConduct') },
    { value: 'corruption', label: t('complaintSection.typeCorruption') },
    { value: 'missing',    label: t('complaintSection.typeMissing') },
    { value: 'wrong',      label: t('complaintSection.typeWrong') },
    { value: 'access',     label: t('complaintSection.typeAccess') },
    { value: 'other',      label: t('complaintSection.typeOther') },
  ];

  const validate = (v) => {
    const e = {};
    if (!v.anonymous && !v.fullName?.trim()) e.fullName = t('complaintSection.fullName') + ' is required';
    if (!v.anonymous && !v.email?.trim()) e.email = t('complaintSection.email') + ' is required';
    else if (!v.anonymous && !isValidEmail(v.email)) e.email = 'Invalid email address';
    if (v.phone && !isValidPhone(v.phone)) e.phone = 'Invalid phone number';
    if (!v.department) e.department = 'Please select a department/window';
    if (!v.type) e.type = 'Please select complaint type';
    if (!v.complaint?.trim()) e.complaint = 'Please describe your complaint';
    else if (v.complaint.trim().length < 30) e.complaint = 'Please provide more detail (min 30 characters)';
    return e;
  };

  const [values, setValues] = useState({ fullName: '', email: '', phone: '', department: '', type: '', complaint: '', anonymous: false });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setValues((p) => {
      const updated = { ...p, [name]: newValue };
      // When anonymous is checked, clear personal fields
      if (name === 'anonymous' && checked) {
        updated.fullName = '';
        updated.email    = '';
        updated.phone    = '';
      }
      return updated;
    });
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
    const errs = validate(values);
    setErrors((p) => ({ ...p, [name]: errs[name] || '' }));
  };

  const [refNumber, setRefNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched(Object.keys(values).reduce((a, k) => ({ ...a, [k]: true }), {}));
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      const res = await complaintAPI.submit(values);
      setRefNumber(res.data.refNumber || '');
      setStatus('success');
      setValues({ fullName: '', email: '', phone: '', department: '', type: '', complaint: '', anonymous: false });
      setTouched({});
    } catch (err) {
      console.error('Complaint submit error:', err.response?.data || err.message);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'success') {
    return (
      <section className="py-20 bg-white" id="complaint">
        <div className="section-container max-w-2xl">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-10">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-5">
              <FaCheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-dark font-heading mb-2">{t('complaintSection.successTitle')}</h3>
            <p className="text-gray-500 text-sm max-w-sm mb-2">{t('complaintSection.successDesc')}</p>
            <p className="text-gray-400 text-xs mb-2">{t('complaintSection.successNote')}</p>
            {refNumber && (
              <div className="bg-primary-50 border border-primary-100 rounded-xl px-5 py-3 mb-5">
                <p className="text-xs text-gray-500 mb-1">Your Reference Number</p>
                <p className="text-xl font-bold text-primary font-heading">{refNumber}</p>
                <p className="text-xs text-gray-400 mt-1">Save this number for your records</p>
              </div>
            )}
            <Button variant="secondary" size="sm" onClick={() => setStatus(null)}>
              {t('complaintSection.submitAnother')}
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-light" id="complaint" aria-label="Complaint">
      <div className="section-container max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 text-red-600 text-xs font-semibold rounded-full mb-4 border border-red-100">
            <FaExclamationTriangle className="w-3 h-3" />
            {t('complaintSection.badge')}
          </span>
          <h2 className="section-title">{t('complaintSection.title')}</h2>
          <p className="section-subtitle">{t('complaintSection.subtitle')}</p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { emoji: '🔒', title: t('complaintSection.confidential'), desc: t('complaintSection.confidentialDesc') },
            { emoji: '⚡', title: t('complaintSection.fastResponse'), desc: t('complaintSection.fastResponseDesc') },
            { emoji: '📊', title: t('complaintSection.tracked'), desc: t('complaintSection.trackedDesc') },
          ].map((item, i) => (
            <div key={i} className="card p-4 border border-gray-100 text-center">
              <div className="text-2xl mb-2">{item.emoji}</div>
              <p className="font-bold text-dark text-sm font-heading mb-1">{item.title}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="card p-8 border border-gray-100">
          <h3 className="text-lg font-bold text-dark font-heading mb-1">{t('complaintSection.formTitle')}</h3>
          <p className="text-gray-500 text-sm mb-6">{t('complaintSection.formSubtitle')}</p>

          <form onSubmit={handleSubmit} noValidate aria-label="Complaint form">
            {/* Anonymous toggle */}
            <label className="flex items-center gap-3 mb-6 cursor-pointer">
              <input type="checkbox" name="anonymous" checked={values.anonymous} onChange={handleChange}
                className="w-4 h-4 accent-primary rounded" />
              <div>
                <span className="text-sm font-semibold text-dark">{t('complaintSection.anonymous')}</span>
                <p className="text-xs text-gray-400">{t('complaintSection.anonymousDesc')}</p>
              </div>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Input label={t('complaintSection.fullName')} name="fullName" placeholder={t('complaintSection.fullName')}
                value={values.fullName} onChange={handleChange} onBlur={handleBlur}
                error={errors.fullName} touched={touched.fullName}
                required={!values.anonymous} disabled={values.anonymous}
                icon={<FaUser className="w-4 h-4" />} />
              <Input label={t('complaintSection.email')} name="email" type="email" placeholder="your@email.com"
                value={values.email} onChange={handleChange} onBlur={handleBlur}
                error={errors.email} touched={touched.email}
                required={!values.anonymous} disabled={values.anonymous}
                icon={<FaEnvelope className="w-4 h-4" />} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Input label={t('complaintSection.phone')} name="phone" type="tel" placeholder="09xxxxxxxxx"
                value={values.phone} onChange={handleChange} onBlur={handleBlur}
                error={errors.phone} touched={touched.phone} disabled={values.anonymous}
                icon={<FaPhoneAlt className="w-4 h-4" />} />
              <Select label={t('complaintSection.department')} name="department"
                value={values.department} onChange={handleChange} onBlur={handleBlur}
                error={errors.department} touched={touched.department}
                required options={DEPARTMENT_OPTIONS} placeholder={t('complaintSection.deptPlaceholder')} />
            </div>

            <div className="mb-4">
              <Select label={t('nav.complaint') + ' Type *'} name="type"
                value={values.type} onChange={handleChange} onBlur={handleBlur}
                error={errors.type} touched={touched.type}
                required options={TYPE_OPTIONS} placeholder={t('complaintSection.typePlaceholder')} />
            </div>

            <div className="mb-6">
              <Textarea label={t('complaintSection.complaintLabel')} name="complaint"
                placeholder={t('complaintSection.complaintPlaceholder')}
                value={values.complaint} onChange={handleChange} onBlur={handleBlur}
                error={errors.complaint} touched={touched.complaint} required rows={5} />
              <p className="text-xs text-gray-400 mt-1">{values.complaint.length} {t('complaintSection.charCount')}</p>
            </div>

            {status === 'error' && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm mb-4" role="alert">
                <FaTimesCircle className="w-4 h-4 flex-shrink-0" />
                {t('complaintSection.errorMsg')}
              </motion.div>
            )}

            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}
              icon={<FaPaperPlane className="w-4 h-4" />}>
              {loading ? t('complaintSection.submitting') : t('complaintSection.submitBtn')}
            </Button>

            <p className="text-center text-xs text-gray-400 mt-3">
              {t('complaintSection.footerNote')}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ComplaintSection;
