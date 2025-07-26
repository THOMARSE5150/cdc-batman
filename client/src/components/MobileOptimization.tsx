import React, { useEffect } from 'react';

// Mobile optimization component to fix JavaScript errors and improve performance
const MobileOptimization: React.FC = () => {
  useEffect(() => {
    // Fix for potential JavaScript errors on mobile
    const handleError = (event: ErrorEvent) => {
      // Log error but don't show to user
      console.error('JS Error:', event.error);
      
      // Prevent error from breaking the app
      event.preventDefault();
      return true;
    };

    // Fix for unhandled promise rejections
    const handlePromiseRejection = (event: PromiseRejectionEvent) => {
      console.error('Promise rejection:', event.reason);
      event.preventDefault();
    };

    // Add error handlers
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handlePromiseRejection);

    // Mobile performance optimizations
    if (typeof window !== 'undefined') {
      // Disable hover effects on touch devices to improve performance
      if ('ontouchstart' in window) {
        document.documentElement.classList.add('touch-device');
        
        // Add CSS to disable hover effects on touch
        const style = document.createElement('style');
        style.textContent = `
          .touch-device *:hover {
            -webkit-tap-highlight-color: transparent;
          }
          .touch-device .hover\\:scale-105:hover {
            transform: none !important;
          }
          .touch-device .hover\\:shadow-lg:hover {
            box-shadow: none !important;
          }
        `;
        document.head.appendChild(style);
      }

      // Optimize images for mobile
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        if (!img.loading) {
          img.loading = 'lazy';
        }
        if (!img.decoding) {
          img.decoding = 'async';
        }
      });

      // Preload critical resources
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          // Preload critical pages
          const criticalLinks = ['/services', '/contact', '/meet-celia'];
          criticalLinks.forEach(link => {
            const linkElement = document.createElement('link');
            linkElement.rel = 'prefetch';
            linkElement.href = link;
            document.head.appendChild(linkElement);
          });
        });
      }

      // Service Worker for caching (if supported)
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
              console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
              console.log('SW registration failed: ', registrationError);
            });
        });
      }
    }

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handlePromiseRejection);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default MobileOptimization;