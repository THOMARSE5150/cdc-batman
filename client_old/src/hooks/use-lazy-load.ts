import { useState, useEffect } from 'react';

/**
 * Hook to lazy load images or components when they enter viewport
 * @param {string} elementRef - Reference to the element to observe
 * @param {Object} options - IntersectionObserver options
 * @returns {boolean} - Whether the element is visible
 */
export function useLazyLoad(
  elementRef: React.RefObject<HTMLElement>,
  options = { threshold: 0.1, rootMargin: '100px' }
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Once loaded, unobserve the element
        if (elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      }
    }, options);

    observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef, options]);

  return isVisible;
}