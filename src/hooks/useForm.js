// ============================================================
// MESOB - Custom Hook: useForm
// ============================================================

import { useState, useCallback } from 'react';

/**
 * Generic form state management hook
 * @param {Object} initialValues - initial form values
 * @param {Function} validate - optional validation function
 */
const useForm = (initialValues = {}, validate = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  // Handle blur (mark as touched)
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    // Validate on blur if validate function provided
    if (validate) {
      const validationErrors = validate(values);
      setErrors((prev) => ({ ...prev, [name]: validationErrors[name] || '' }));
    }
  }, [values, validate]);

  // Set a specific field value programmatically
  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Set a specific error
  const setFieldError = useCallback((name, error) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Validate all fields
  const validateAll = useCallback(() => {
    if (!validate) return true;
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return Object.keys(validationErrors).length === 0;
  }, [values, validate]);

  // Handle form submission
  const handleSubmit = useCallback(
    (onSubmit) => async (e) => {
      e?.preventDefault();
      const isValid = validateAll();
      if (!isValid) return;
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validateAll]
  );

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
    setIsSubmitting,
  };
};

export default useForm;
