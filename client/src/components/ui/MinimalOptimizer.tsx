import { useEffect } from 'react';

/**
 * Minimal performance optimizer for real mobile performance gains
 * Focuses only on essential optimizations without heavy monitoring
 */
export default function MinimalOptimizer() {
  useEffect(() => {
    // Skip if already optimized
    if (document.querySelector('[data-minimal-optimized]')) return;

    // 1. Remove render-blocking resources
    const removeBlockingResources = () => {
      // Defer non-critical stylesheets
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      stylesheets.forEach((link) => {
        if (!link.getAttribute('media')) {
          link.setAttribute('media', 'print');
          link.addEventListener('load', () => {
            link.setAttribute('media', 'all');
          });
        }
      });
    };

    // 2. Optimize images for mobile
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        // Add loading optimization
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        
        // Add decoding optimization
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
        
        // Add image rendering optimization
        img.style.imageRendering = 'auto';
      });
    };

    // 3. Add critical mobile viewport meta
    const optimizeViewport = () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 
          'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover'
        );
      }
    };

    // 4. Minimize JavaScript execution
    const optimizeJavaScript = () => {
      // Disable heavy animations on mobile
      if (window.innerWidth < 768) {
        const style = document.createElement('style');
        style.setAttribute('data-minimal-optimized', 'true');
        style.textContent = `
          @media (max-width: 768px) {
            *, *::before, *::after {
              animation-duration: 0.1s !important;
              transition-duration: 0.1s !important;
            }
            
            .animate-pulse, .animate-spin, .animate-bounce {
              animation: none !important;
            }
            
            .blur-xl, .blur-2xl, .blur-3xl {
              filter: none !important;
            }
            
            .backdrop-blur-xl, .backdrop-blur-2xl, .backdrop-blur-3xl {
              backdrop-filter: none !important;
            }
          }
        `;
        document.head.appendChild(style);
      }
    };

    // 5. Optimize critical rendering path
    const optimizeCriticalPath = () => {
      // Preload critical resources
      const criticalImages = [
        '/images/celia-portrait-optimized.webp',
        '/images/header_logo.png'
      ];

      criticalImages.forEach((src) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Apply optimizations in order
    optimizeViewport();
    optimizeCriticalPath();
    optimizeImages();
    optimizeJavaScript();
    
    // Defer non-critical optimizations
    setTimeout(() => {
      removeBlockingResources();
    }, 100);

    // Mark as optimized
    document.documentElement.setAttribute('data-minimal-optimized', 'true');
  }, []);

  return null;
}