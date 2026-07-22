// ============================================================
// MESOB - Custom Hook: useScrollPosition
// ============================================================

import { useState, useEffect } from 'react';

/**
 * Returns the current scroll Y position and whether the user has scrolled past a threshold
 * @param {number} threshold - scroll threshold in pixels
 */
const useScrollPosition = (threshold = 80) => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > threshold);
    };

    // Add event listener with passive flag for performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { scrollY, isScrolled };
};

export default useScrollPosition;
