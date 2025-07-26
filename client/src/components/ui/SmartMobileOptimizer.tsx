import { useEffect } from 'react';

/**
 * Smart Mobile Optimizer - Only applies optimizations on actual mobile devices
 * Uses user agent detection and viewport size to ensure desktop is never affected
 */
export default function SmartMobileOptimizer() {
  useEffect(() => {
    // Comprehensive mobile detection
    const isMobileDevice = () => {
      // Check user agent for mobile devices
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      
      // Check viewport size
      const isMobileViewport = window.innerWidth <= 768;
      
      // Check for touch capability
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Only optimize if ALL conditions indicate mobile
      return isMobileUA && isMobileViewport && isTouchDevice;
    };

    // Only proceed if this is genuinely a mobile device
    if (!isMobileDevice()) {
      console.log('🖥️ Desktop detected - skipping mobile optimizations');
      return;
    }

    // Skip if already optimized
    if (document.querySelector('[data-smart-mobile-optimized]')) return;

    console.log('📱 Mobile device detected - applying targeted optimizations');

    const smartOptimizations = {
      // 0. Add mobile-only resource preloads
      addMobileCriticalPreloads: () => {
        // Hero image preload for LCP optimization
        const heroImagePreload = document.createElement('link');
        heroImagePreload.rel = 'preload';
        heroImagePreload.href = '/images/celia-portrait-optimized.webp';
        heroImagePreload.as = 'image';
        heroImagePreload.type = 'image/webp';
        heroImagePreload.setAttribute('fetchpriority', 'high');
        heroImagePreload.setAttribute('data-mobile-optimization', 'true');
        document.head.insertBefore(heroImagePreload, document.head.firstChild);

        // Logo preload for immediate header rendering
        const logoPreload = document.createElement('link');
        logoPreload.rel = 'preload';
        logoPreload.href = '/images/header_logo.png';
        logoPreload.as = 'image';
        logoPreload.setAttribute('fetchpriority', 'high');
        logoPreload.setAttribute('data-mobile-optimization', 'true');
        document.head.insertBefore(logoPreload, document.head.children[1]);

        // Mobile-only page prefetches
        const mobilePrefetches = ['/meet-celia', '/services', '/contact'];
        mobilePrefetches.forEach(href => {
          const prefetch = document.createElement('link');
          prefetch.rel = 'prefetch';
          prefetch.href = href;
          prefetch.setAttribute('data-mobile-optimization', 'true');
          document.head.appendChild(prefetch);
        });

        // Mobile app meta tags
        const mobileMetaTags = [
          { name: 'mobile-web-app-capable', content: 'yes' },
          { name: 'mobile-web-app-status-bar-style', content: 'default' }
        ];

        mobileMetaTags.forEach(({ name, content }) => {
          const meta = document.createElement('meta');
          meta.name = name;
          meta.content = content;
          meta.setAttribute('data-mobile-optimization', 'true');
          document.head.appendChild(meta);
        });
      },
      // 1. Mobile-only critical CSS
      injectMobileCriticalCSS: () => {
        const mobileCriticalCSS = document.createElement('style');
        mobileCriticalCSS.setAttribute('data-mobile-critical', 'true');
        mobileCriticalCSS.textContent = `
          /* Mobile-only critical optimizations */
          @media (max-width: 768px) and (pointer: coarse) {
            /* Ensure this only applies to touch devices */
            
            /* Critical layout stability */
            * { box-sizing: border-box; }
            
            /* Hero section optimization */
            .hero-section {
              min-height: 60vh;
              contain: layout style paint;
            }
            
            /* Image optimization */
            img {
              max-width: 100%;
              height: auto;
              contain: layout style paint;
              image-rendering: auto;
              decoding: async;
            }
            
            /* Touch optimization */
            button, a[role="button"], .btn {
              min-height: 44px;
              min-width: 44px;
              touch-action: manipulation;
            }
            
            /* Grid simplification */
            .grid-cols-2, .grid-cols-3, .grid-cols-4 {
              grid-template-columns: 1fr !important;
            }
            
            /* Text optimization */
            h1 { font-size: clamp(1.75rem, 5vw, 2.5rem); }
            h2 { font-size: clamp(1.5rem, 4vw, 2rem); }
            
            /* Remove expensive effects on mobile */
            .blur-xl, .blur-2xl, .blur-3xl,
            .backdrop-blur-xl, .backdrop-blur-2xl {
              filter: none !important;
              backdrop-filter: none !important;
            }
            
            /* Disable animations on mobile for performance */
            .animate-pulse, .animate-spin, .animate-bounce {
              animation: none !important;
            }
            
            .transition-all, .transition-colors, .transition-opacity {
              transition: none !important;
            }
          }
        `;
        document.head.appendChild(mobileCriticalCSS);
      },

      // 2. Mobile-only image lazy loading
      optimizeImagesForMobile: () => {
        const images = document.querySelectorAll('img');
        images.forEach((img, index) => {
          // Don't lazy load the hero image (LCP element)
          if (index === 0 || img.closest('.hero-section')) {
            img.setAttribute('loading', 'eager');
            img.setAttribute('fetchpriority', 'high');
          } else {
            img.setAttribute('loading', 'lazy');
          }
          
          img.setAttribute('decoding', 'async');
          
          // Add responsive sizing for mobile
          if (!img.hasAttribute('sizes')) {
            img.setAttribute('sizes', '(max-width: 768px) 100vw, 50vw');
          }
        });
      },

      // 3. Mobile-only JavaScript optimizations
      optimizeJavaScriptForMobile: () => {
        // Use passive listeners for better scroll performance
        const passiveEvents = ['touchstart', 'touchmove', 'scroll', 'wheel'];
        passiveEvents.forEach(eventType => {
          document.addEventListener(eventType, () => {}, { passive: true });
        });

        // Disable hover effects on touch devices
        document.documentElement.classList.add('touch-device');
        
        // Optimize form inputs to prevent zoom
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
          if (input.getAttribute('type') !== 'submit' && input.getAttribute('type') !== 'button') {
            input.style.fontSize = '16px'; // Prevent zoom on iOS
          }
        });
      },

      // 4. Mobile-only service worker (for repeat visits)
      implementMobileServiceWorker: () => {
        if ('serviceWorker' in navigator) {
          const swCode = `
            const MOBILE_CACHE = 'mobile-cache-v1';
            const urlsToCache = [
              '/',
              '/images/celia-portrait-optimized.webp',
              '/images/header_logo.png'
            ];

            self.addEventListener('install', event => {
              event.waitUntil(
                caches.open(MOBILE_CACHE)
                  .then(cache => cache.addAll(urlsToCache))
                  .then(() => self.skipWaiting())
              );
            });

            self.addEventListener('fetch', event => {
              if (event.request.destination === 'image' || event.request.url === '/') {
                event.respondWith(
                  caches.match(event.request)
                    .then(response => response || fetch(event.request))
                );
              }
            });

            self.addEventListener('activate', event => {
              event.waitUntil(self.clients.claim());
            });
          `;

          const blob = new Blob([swCode], { type: 'application/javascript' });
          const swUrl = URL.createObjectURL(blob);
          
          navigator.serviceWorker.register(swUrl).catch(() => {
            // Service worker failed, continue without it
          });
        }
      },

      // 5. Mobile-only viewport optimization
      optimizeViewportForMobile: () => {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
          viewport.setAttribute('content', 
            'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover'
          );
        }

        // Add mobile-specific meta tags
        const mobileMetaTags = [
          { name: 'mobile-web-app-capable', content: 'yes' },
          { name: 'apple-mobile-web-app-capable', content: 'yes' },
          { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
          { name: 'format-detection', content: 'telephone=yes' }
        ];

        mobileMetaTags.forEach(({ name, content }) => {
          if (!document.querySelector(`meta[name="${name}"]`)) {
            const meta = document.createElement('meta');
            meta.name = name;
            meta.content = content;
            document.head.appendChild(meta);
          }
        });
      }
    };

    // Apply optimizations with delay to ensure page is fully loaded
    setTimeout(() => {
      smartOptimizations.addMobileCriticalPreloads();
      smartOptimizations.injectMobileCriticalCSS();
      smartOptimizations.optimizeImagesForMobile();
      smartOptimizations.optimizeJavaScriptForMobile();
      smartOptimizations.implementMobileServiceWorker();
      smartOptimizations.optimizeViewportForMobile();

      // Mark as optimized
      document.documentElement.setAttribute('data-smart-mobile-optimized', 'true');
      
      console.log('📱 Smart mobile optimizations applied successfully');
    }, 1000);

  }, []);

  return null;
}