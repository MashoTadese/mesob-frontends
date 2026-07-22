// ============================================================
// MESOB - Reusable Button Component
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';

/**
 * @param {'primary' | 'secondary' | 'gold' | 'ghost' | 'danger'} variant
 * @param {'sm' | 'md' | 'lg'} size
 * @param {boolean} loading - show loading spinner
 * @param {boolean} fullWidth
 * @param {React.ReactNode} icon - icon to show before label
 * @param {string} iconPosition - 'left' | 'right'
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  icon = null,
  iconPosition = 'left',
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) => {
  // Variant styles
  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-600 focus:ring-primary shadow-md hover:shadow-lg',
    secondary:
      'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white focus:ring-primary',
    gold:
      'bg-gold text-white hover:bg-gold-600 focus:ring-gold shadow-md hover:shadow-lg',
    ghost:
      'bg-transparent text-primary hover:bg-primary-50 focus:ring-primary border border-transparent',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md hover:shadow-lg',
    outline:
      'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-400',
  };

  // Size styles
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none';

  const widthClass = fullWidth ? 'w-full' : '';

  const combinedClasses = [
    baseStyles,
    variants[variant],
    sizes[size],
    widthClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={combinedClasses}
      whileHover={{ scale: disabled || loading ? 1 : 1.02, y: disabled || loading ? 0 : -1 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98, y: 0 }}
      {...props}
    >
      {/* Loading Spinner */}
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}

      {/* Left Icon */}
      {!loading && icon && iconPosition === 'left' && (
        <span className="flex-shrink-0" aria-hidden="true">{icon}</span>
      )}

      {/* Label */}
      <span>{children}</span>

      {/* Right Icon */}
      {!loading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0" aria-hidden="true">{icon}</span>
      )}
    </motion.button>
  );
};

export default Button;
