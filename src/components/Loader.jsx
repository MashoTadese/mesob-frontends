// ============================================================
// MESOB - Loader Component
// ============================================================

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Full-screen page loader
 */
export const PageLoader = () => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    role="status"
    aria-label="Loading page"
  >
    <div className="flex flex-col items-center gap-6">
      {/* Logo / Brand */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl font-heading">M</span>
        </div>
        <span className="text-2xl font-bold text-primary font-heading">MESOB</span>
      </div>

      {/* Animated dots */}
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-primary rounded-full"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <p className="text-gray-500 text-sm">Loading, please wait...</p>
    </div>
  </div>
);

/**
 * Inline spinner
 */
export const Spinner = ({ size = 'md', color = 'primary', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  };

  const colorClasses = {
    primary: 'border-primary border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-400 border-t-transparent',
  };

  return (
    <div
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
};

/**
 * Card skeleton loader
 */
export const SkeletonCard = ({ count = 3 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="card p-6 animate-pulse">
        <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4" />
        <div className="h-4 bg-gray-200 rounded mb-2 w-3/4" />
        <div className="h-3 bg-gray-100 rounded mb-1" />
        <div className="h-3 bg-gray-100 rounded mb-1 w-5/6" />
        <div className="h-3 bg-gray-100 rounded w-4/6" />
      </div>
    ))}
  </div>
);

/**
 * Section loading skeleton
 */
export const SectionSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-3" />
    <div className="h-4 bg-gray-100 rounded w-64 mx-auto mb-12" />
    <SkeletonCard count={6} />
  </div>
);

const Loader = ({ fullScreen = false }) => {
  if (fullScreen) return <PageLoader />;
  return (
    <div className="flex items-center justify-center py-16">
      <Spinner size="lg" />
    </div>
  );
};

export default Loader;
