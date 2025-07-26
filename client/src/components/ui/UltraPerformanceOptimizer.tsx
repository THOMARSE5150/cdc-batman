import { useEffect } from 'react';
import { initializePerformanceOptimizations } from '@/lib/performance-utils';

/**
 * Ultra Performance Optimizer for achieving 90+ mobile score
 * Implements aggressive optimizations targeting FCP < 1.8s
 */
export default function UltraPerformanceOptimizer() {
  useEffect(() => {
    // Only run on mobile devices
    if (window.innerWidth >= 768) return;
    
    // Skip if already optimized
    if (document.querySelector('[data-ultra-optimized]')) return;

    const ultraOptimizations = {
      // 1. Optimize without breaking design
      optimizeWithoutBreaking: () => {
        // Only add performance hints, don't override existing styles
        const performanceHints = document.createElement('style');
        performanceHints.setAttribute('data-performance-hints', 'true');
        performanceHints.textContent = `
          /* Performance optimizations that preserve design */
          @media (max-width: 768px) {
            /* Optimize animations for mobile performance */
            *, *::before, *::after {
              animation-duration: 0.2s !important;
              transition-duration: 0.2s !important;
            }
            
            /* Improve touch performance */
            button, a[role="button"], .btn {
              touch-action: manipulation;
              user-select: none;
            }
            
            /* Layout containment for better performance */
            .container {
              contain: layout style;
            }
            
            /* Image optimization */
            img {
              content-visibility: auto;
              decoding: async;
            }
          }
        `;
        
        document.head.appendChild(performanceHints);
      },

      // 2. Implement critical image optimization
      optimizeImages: () => {
        // Replace images with optimized versions immediately
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          // Add critical loading attributes
          img.setAttribute('loading', 'eager');
          img.setAttribute('decoding', 'async');
          img.setAttribute('fetchpriority', 'high');
          
          // Optimize hero image specifically
          if (img.src && img.src.includes('celia-portrait')) {
            img.style.aspectRatio = '3/4';
            img.style.objectFit = 'cover';
            img.style.width = '100%';
            img.style.height = 'auto';
          }
        });
      },

      // 3. Minimize JavaScript execution time
      minimizeJavaScript: () => {
        // Remove all non-essential JavaScript
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
          const src = script.getAttribute('src');
          if (src && !src.includes('main.tsx') && !src.includes('vite') && !src.includes('react')) {
            script.remove();
          }
        });

        // Optimize event handling
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            // Defer all non-critical operations
            const nonCriticalElements = document.querySelectorAll('[data-non-critical]');
            nonCriticalElements.forEach(el => el.remove());
          });
        }
      },

      // 4. Implement aggressive caching
      implementCaching: () => {
        // Service worker for immediate caching
        if ('serviceWorker' in navigator) {
          const swCode = `
            const CACHE_NAME = 'celia-ultra-v1';
            const CRITICAL_RESOURCES = [
              '/',
              '/images/celia-portrait-optimized.webp',
              '/images/header_logo.png'
            ];

            self.addEventListener('install', event => {
              event.waitUntil(
                caches.open(CACHE_NAME).then(cache => 
                  cache.addAll(CRITICAL_RESOURCES)
                )
              );
              self.skipWaiting();
            });

            self.addEventListener('fetch', event => {
              if (event.request.destination === 'image' || 
                  event.request.url.includes('.css') ||
                  event.request.url.includes('main.tsx')) {
                event.respondWith(
                  caches.match(event.request).then(response => 
                    response || fetch(event.request)
                  )
                );
              }
            });
          `;

          const blob = new Blob([swCode], { type: 'application/javascript' });
          const swUrl = URL.createObjectURL(blob);
          
          navigator.serviceWorker.register(swUrl).then(() => {
            console.log('🚀 Ultra Performance: Service worker active');
          }).catch(() => {
            // Silent fail
          });
        }
      },

      // 5. Optimize fonts without breaking design
      optimizeFonts: () => {
        // Add font-display: swap to existing fonts instead of replacing them
        const fontOptimization = document.createElement('style');
        fontOptimization.textContent = `
          /* Font performance optimization */
          @font-face {
            font-display: swap;
          }
        `;
        document.head.appendChild(fontOptimization);
      },

      // 6. Eliminate layout shifts
      preventLayoutShifts: () => {
        // Set explicit dimensions for all images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (!img.style.aspectRatio) {
            img.style.aspectRatio = '16/9';
            img.style.objectFit = 'cover';
          }
        });

        // Add container queries for responsive behavior
        const containerCSS = document.createElement('style');
        containerCSS.textContent = `
          .container {
            contain: layout style;
            max-width: 100%;
            margin: 0 auto;
            padding: 0 1rem;
          }
          
          @container (min-width: 768px) {
            .container {
              max-width: 1200px;
              padding: 0 2rem;
            }
          }
        `;
        document.head.appendChild(containerCSS);
      }
    };

    // Apply optimizations that preserve design
    ultraOptimizations.optimizeWithoutBreaking();
    ultraOptimizations.optimizeFonts();
    ultraOptimizations.optimizeImages();
    ultraOptimizations.preventLayoutShifts();
    ultraOptimizations.minimizeJavaScript();
    
    // Defer heavy operations
    setTimeout(() => {
      ultraOptimizations.implementCaching();
    }, 100);

    // Mark as optimized
    document.documentElement.setAttribute('data-ultra-optimized', 'true');

    console.log('🚀 Ultra Performance: Targeting sub-1.8s FCP');
    
    // Initialize comprehensive performance optimizations
    initializePerformanceOptimizations();

  }, []);

  return null;
}