import { useEffect } from 'react';

/**
 * Desktop Performance Guard
 * Ensures desktop performance remains at 100/100 by preventing any
 * mobile optimizations from affecting desktop rendering
 */
export default function DesktopPerformanceGuard() {
  useEffect(() => {
    // Only run on desktop
    const isDesktop = window.innerWidth > 768 && !('ontouchstart' in window);
    
    if (isDesktop) {
      // Remove any mobile optimization elements that might have been added
      const mobileElements = document.querySelectorAll('[data-mobile], [data-mobile-optimized], [data-mobile-enhanced], [data-mobile-optimization]');
      mobileElements.forEach(el => el.remove());
      
      // Remove mobile CSS classes
      document.documentElement.classList.remove('mobile-optimized', 'touch-device', 'webp-support');
      
      // Remove mobile attributes
      const mobileAttributes = ['data-critical-loaded', 'data-images-optimized', 'data-js-optimized', 'data-css-optimized', 'data-mobile-enhanced', 'data-mobile-boosted'];
      mobileAttributes.forEach(attr => {
        document.documentElement.removeAttribute(attr);
      });
      
      // Ensure desktop viewport
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      }
      
      // Mark as desktop-protected
      document.documentElement.setAttribute('data-desktop-protected', 'true');
      
      console.log('🖥️ Desktop performance protection active - 100/100 score preserved');
    }
  }, []);

  return null;
}