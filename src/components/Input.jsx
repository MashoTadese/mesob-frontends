// ============================================================
// MESOB - Reusable Input Component
// ============================================================

import React, { forwardRef } from 'react';

const Input = forwardRef(
  (
    {
      label, name, type = 'text', placeholder, value, onChange, onBlur,
      error, touched, required = false, disabled = false, icon = null,
      iconPosition = 'left', helpText, className = '', ...props
    },
    ref
  ) => {
    const hasError = touched && error;
    const inputId = `input-${name}`;
    const baseInputClasses = 'w-full px-4 py-3 border rounded-xl text-dark placeholder-gray-400 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed';
    const stateClasses = hasError ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-primary hover:border-primary-300';
    const iconPaddingClass = icon && iconPosition === 'left' ? 'pl-11' : icon && iconPosition === 'right' ? 'pr-11' : '';

    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{icon}</div>
          )}
          <input
            ref={ref} id={inputId} name={name} type={type} placeholder={placeholder}
            value={value} onChange={onChange} onBlur={onBlur} disabled={disabled}
            required={required} aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={hasError ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
            className={`${baseInputClasses} ${stateClasses} ${iconPaddingClass}`}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{icon}</div>
          )}
        </div>
        {hasError && (
          <p id={`${inputId}-error`} className="text-sm text-red-500 flex items-center gap-1" role="alert">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        {helpText && !hasError && (
          <p id={`${inputId}-help`} className="text-xs text-gray-500">{helpText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export const Textarea = forwardRef(
  ({ label, name, placeholder, value, onChange, onBlur, error, touched, required = false, disabled = false, rows = 4, helpText, className = '', ...props }, ref) => {
    const hasError = touched && error;
    const inputId = `textarea-${name}`;
    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
            {label}{required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref} id={inputId} name={name} placeholder={placeholder} value={value}
          onChange={onChange} onBlur={onBlur} disabled={disabled} rows={rows}
          required={required} aria-invalid={hasError ? 'true' : 'false'}
          className={`w-full px-4 py-3 border rounded-xl text-dark placeholder-gray-400 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent resize-none disabled:bg-gray-50 disabled:cursor-not-allowed ${hasError ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-primary hover:border-primary-300'}`}
          {...props}
        />
        {hasError && <p className="text-sm text-red-500" role="alert">{error}</p>}
        {helpText && !hasError && <p className="text-xs text-gray-500">{helpText}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export const Select = forwardRef(
  ({ label, name, value, onChange, onBlur, error, touched, required = false, disabled = false, options = [], placeholder = 'Select an option', className = '', ...props }, ref) => {
    const hasError = touched && error;
    const inputId = `select-${name}`;
    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
            {label}{required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref} id={inputId} name={name} value={value} onChange={onChange} onBlur={onBlur}
          disabled={disabled} required={required} aria-invalid={hasError ? 'true' : 'false'}
          className={`w-full px-4 py-3 border rounded-xl text-dark bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent appearance-none cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed ${hasError ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-primary hover:border-primary-300'} ${value === '' ? 'text-gray-400' : 'text-dark'}`}
          {...props}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {hasError && <p className="text-sm text-red-500" role="alert">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';

export default Input;
