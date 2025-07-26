import { useState, useEffect, useCallback } from 'react';

interface UseOptimizedScrollOptions {
  threshold?: number;
  throttle?: boolean;
}

/**
 * Optimized scroll hook with performance improvements
 * - Uses requestAnimationFrame for smooth performance
 * - Implements throttling to prevent excessive updates
 * - Properly cleans up event listeners
 */
export function useOptimizedScroll({ 
  threshold = 10, 
  throttle = true 
}: UseOptimizedScrollOptions = {}) {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > threshold;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  }, [isScrolled, threshold]);

  useEffect(() => {
    if (throttle) {
      let ticking = false;
      const throttledScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', throttledScroll, { passive: true });
      return () => window.removeEventListener('scroll', throttledScroll);
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, throttle]);

  return isScrolled;
}