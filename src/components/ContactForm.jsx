// ============================================================
// MESOB - Contact Form Component — Trilingual (EN / AM / OR)
// ============================================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FaUser, FaEnvelope, FaPhoneAlt, FaCommentAlt,
  FaCheckCircle, FaTimesCircle, FaPaperPlane,
} from 'react-icons/fa';
import Input, { Textarea, Select } from './Input';
import Button from './Button';
import { isValidEmail, isValidPhone } from '../utils/helpers';
import { contactAPI } from '../services/api';

const ContactForm = () => {
  const { t } = useTranslation();

  const SUBJECT_OPTIONS = [
    { value: 'general',   label: t('contact.subjects.general') },
    { value: 'services',  label: t('contact.subjects.services') },
    { value: 'issue',     label: t('contact.subjects.appointment') },
    { value: 'complaint', label: t('contact.subjects.complaint') },
    { value: 'suggestion',label: t('contact.subjects.suggestion') },
    { value: 'technical', label: t('contact.subjects.technical') },
  ];

  const validate = (values) => {
    const errors = {};
    if (!values.name?.trim())    errors.name    = t('contact.name') + ' is required';
    if (!values.email?.trim())   errors.email   = t('contact.emailLabel') + ' is required';
    else if (!isValidEmail(values.email)) errors.email = 'Invalid email address';
    if (values.phone && !isValidPhone(values.phone)) errors.phone = 'Invalid phone number';
    if (!values.subject)         errors.subject  = 'Please select a subject';
    if (!values.message?.trim()) errors.message  = t('contact.messageLabel') + ' is required';
    else if (values.message.trim().length < 20) errors.message = 'Message must be at least 20 characters';
    return errors;
  };

  const [values, setValues]   = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus]   = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errs = validate(values);
    setErrors((prev) => ({ ...prev, [name]: errs[name] || '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched(Object.keys(values).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setStatus(null);
    try {
      await contactAPI.submit(values);
      setStatus('success');
      setValues({ name: '', email: '', phone: '', subject: '', message: '' });
      setTouched({});
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
          <FaCheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-dark font-heading mb-2">{t('contact.successTitle')}</h3>
        <p className="text-gray-500 text-sm max-w-xs mb-5">{t('contact.successDesc')}</p>
        <Button variant="secondary" size="sm" onClick={() => setStatus(null)}>
          {t('contact.sendAnother')}
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label={t('contact.name')} name="name" placeholder={t('contact.namePlaceholder')}
            value={values.name} onChange={handleChange} onBlur={handleBlur}
            error={errors.name} touched={touched.name} required icon={<FaUser className="w-4 h-4" />} />
          <Input label={t('contact.emailLabel')} name="email" type="email" placeholder={t('contact.emailPlaceholder')}
            value={values.email} onChange={handleChange} onBlur={handleBlur}
            error={errors.email} touched={touched.email} required icon={<FaEnvelope className="w-4 h-4" />} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label={t('contact.phoneLabel')} name="phone" type="tel" placeholder={t('contact.phonePlaceholder')}
            value={values.phone} onChange={handleChange} onBlur={handleBlur}
            error={errors.phone} touched={touched.phone} icon={<FaPhoneAlt className="w-4 h-4" />} />
          <Select label={t('contact.subjectLabel')} name="subject"
            value={values.subject} onChange={handleChange} onBlur={handleBlur}
            error={errors.subject} touched={touched.subject} required
            options={SUBJECT_OPTIONS} placeholder={t('contact.subjectPlaceholder')} />
        </div>
        <Textarea label={t('contact.messageLabel')} name="message" placeholder={t('contact.messagePlaceholder')}
          value={values.message} onChange={handleChange} onBlur={handleBlur}
          error={errors.message} touched={touched.message} required rows={5}
          icon={<FaCommentAlt className="w-4 h-4" />} />

        {status === 'error' && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm"
            role="alert">
            <FaTimesCircle className="w-4 h-4 flex-shrink-0" />
            {t('contact.errorMsg')}
          </motion.div>
        )}

        <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}
          icon={<FaPaperPlane className="w-4 h-4" />}>
          {loading ? t('contact.sending') : t('contact.sendBtn')}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
