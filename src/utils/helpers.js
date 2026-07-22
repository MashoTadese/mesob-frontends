// ============================================================
// MESOB - Helper Utilities
// ============================================================

/**
 * Format a date string to a readable format
 * @param {string} dateStr - ISO date string
 * @returns {string} formatted date
 */
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format a date to relative time (e.g., "2 days ago")
 * @param {string} dateStr - ISO date string
 * @returns {string} relative time
 */
export const timeAgo = (dateStr) => {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

/**
 * Truncate text to a given length
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncate = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Generate initials from a name
 * @param {string} name
 * @returns {string}
 */
export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validate Ethiopian phone number
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  const re = /^(\+251|0)(9|7)\d{8}$/;
  return re.test(phone.replace(/\s/g, ''));
};

/**
 * Generate a random queue number
 * @returns {string}
 */
export const generateQueueNumber = () => {
  const prefix = 'Q';
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `${prefix}-${num}`;
};

/**
 * Capitalize the first letter of a string
 * @param {string} str
 * @returns {string}
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Scroll to top of page
 */
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Debounce function
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Get status color class based on queue status
 * @param {string} status
 * @returns {string}
 */
export const getStatusColor = (status) => {
  const map = {
    waiting: 'bg-yellow-100 text-yellow-700',
    serving: 'bg-green-100 text-green-700',
    completed: 'bg-gray-100 text-gray-600',
    cancelled: 'bg-red-100 text-red-700',
  };
  return map[status?.toLowerCase()] || 'bg-gray-100 text-gray-600';
};

/**
 * Get status label
 * @param {string} status
 * @returns {string}
 */
export const getStatusLabel = (status) => {
  const map = {
    waiting: 'Waiting',
    serving: 'Now Serving',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };
  return map[status?.toLowerCase()] || 'Unknown';
};
