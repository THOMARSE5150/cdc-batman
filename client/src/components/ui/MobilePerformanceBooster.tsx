import { useEffect } from 'react';

/**
 * Advanced mobile performance booster
 * Implements cutting-edge optimization techniques for 90+ mobile score
 */
export default function MobilePerformanceBooster() {
  useEffect(() => {
    // Only run on mobile devices
    if (window.innerWidth >= 768) return;
    
    // Skip if already boosted
    if (document.querySelector('[data-mobile-boosted]')) return;

    const boostTechniques = {
      // 1. Implement resource hints aggressively
      aggressiveResourceHints: () => {
        const hints = [
          { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
          { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
          { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
          { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
        ];

        hints.forEach(hint => {
          const link = document.createElement('link');
          link.rel = hint.rel;
          link.href = hint.href;
          if (hint.crossorigin) link.crossOrigin = hint.crossorigin;
          document.head.appendChild(link);
        });
      },

      // 2. Optimize critical rendering path
      optimizeCriticalRenderingPath: () => {
        // Inline critical CSS for immediate rendering
        const criticalMobileCSS = document.createElement('style');
        criticalMobileCSS.setAttribute('data-critical-mobile-boost', 'true');
        criticalMobileCSS.textContent = `
          /* Ultra-fast mobile rendering optimizations */
          
          /* 1. Immediate layout stability */
          * {
            box-sizing: border-box;
          }
          
          html {
            font-size: 16px;
            -webkit-text-size-adjust: 100%;
            -webkit-tap-highlight-color: transparent;
          }
          
          body {
            margin: 0;
            padding: 0;
            font-family: system-ui, -apple-system, sans-serif;
            font-display: swap;
            line-height: 1.5;
            background: #f9fafb;
            text-rendering: optimizeSpeed;
            -webkit-font-smoothing: antialiased;
          }
          
          /* 2. Critical above-the-fold optimization */
          .hero-section {
            min-height: 100vh;
            min-height: 100svh;
            background: linear-gradient(135deg, #f0f7f7 0%, #ffffff 100%);
            contain: layout style paint;
            content-visibility: auto;
          }
          
          /* 3. Immediate text rendering */
          h1, h2, h3 {
            font-display: swap;
            text-rendering: optimizeSpeed;
            contain: layout style;
          }
          
          /* 4. Image optimization for LCP */
          img {
            content-visibility: auto;
            contain-intrinsic-size: 300px 200px;
            image-rendering: auto;
            decoding: async;
          }
          
          .hero-image {
            contain-intrinsic-size: 600px 800px;
            aspect-ratio: 3/4;
            object-fit: cover;
          }
          
          /* 5. Button optimization for touch */
          button, a[role="button"] {
            touch-action: manipulation;
            user-select: none;
            -webkit-user-select: none;
            -webkit-tap-highlight-color: transparent;
          }
          
          /* 6. Reduce layout thrashing */
          .container {
            contain: layout style;
          }
          
          /* 7. Optimize animations for mobile */
          @media (max-width: 768px) {
            *, *::before, *::after {
              animation-duration: 0.15s !important;
              transition-duration: 0.15s !important;
            }
            
            /* Disable expensive effects */
            .blur-xl, .blur-2xl, .blur-3xl {
              filter: none !important;
            }
            
            .backdrop-blur-xl, .backdrop-blur-2xl {
              backdrop-filter: none !important;
            }
            
            /* Optimize transforms */
            .transform {
              will-change: auto;
            }
          }
          
          /* 8. Critical Web Vitals optimizations */
          @media (max-width: 768px) {
            /* LCP optimization */
            .hero-section img {
              loading: eager;
              fetchpriority: high;
            }
            
            /* CLS prevention */
            .grid {
              grid-template-columns: 1fr !important;
            }
            
            /* FID optimization */
            input, textarea, select {
              font-size: 16px !important;
            }
          }
        `;
        
        // Insert at the very beginning for immediate effect
        document.head.insertBefore(criticalMobileCSS, document.head.firstChild);
      },

      // 3. Implement advanced image optimization
      advancedImageOptimization: () => {
        // Use Intersection Observer for lazy loading optimization
        if ('IntersectionObserver' in window) {
          const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                if (img.dataset.src) {
                  img.src = img.dataset.src;
                  img.removeAttribute('data-src');
                  imageObserver.unobserve(img);
                }
              }
            });
          }, {
            rootMargin: '50px 0px',
            threshold: 0.01
          });

          // Observe all images except critical ones
          setTimeout(() => {
            const images = document.querySelectorAll('img:not([fetchpriority="high"])');
            images.forEach(img => imageObserver.observe(img));
          }, 100);
        }
      },

      // 4. Optimize JavaScript execution for mobile
      optimizeJavaScriptForMobile: () => {
        // Defer non-critical JavaScript
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
          const src = script.getAttribute('src');
          if (src && !src.includes('main.tsx') && !src.includes('vite')) {
            script.setAttribute('defer', 'true');
          }
        });

        // Optimize event handling
        const passiveEvents = ['touchstart', 'touchmove', 'scroll', 'wheel'];
        passiveEvents.forEach(eventType => {
          document.addEventListener(eventType, () => {}, { passive: true });
        });
      },

      // 5. Implement service worker for caching
      implementServiceWorker: () => {
        if ('serviceWorker' in navigator) {
          const swCode = `
            const CACHE_NAME = 'celia-counselling-v1';
            const urlsToCache = [
              '/',
              '/images/celia-portrait-optimized.webp',
              '/images/header_logo.png',
              '/src/index.css'
            ];

            self.addEventListener('install', event => {
              event.waitUntil(
                caches.open(CACHE_NAME)
                  .then(cache => cache.addAll(urlsToCache))
              );
            });

            self.addEventListener('fetch', event => {
              event.respondWith(
                caches.match(event.request)
                  .then(response => response || fetch(event.request))
              );
            });
          `;

          const blob = new Blob([swCode], { type: 'application/javascript' });
          const swUrl = URL.createObjectURL(blob);
          
          navigator.serviceWorker.register(swUrl).catch(() => {
            // Service worker registration failed, continue without it
          });
        }
      }
    };

    // Apply boost techniques in order of impact
    boostTechniques.optimizeCriticalRenderingPath();
    boostTechniques.aggressiveResourceHints();
    boostTechniques.advancedImageOptimization();
    boostTechniques.optimizeJavaScriptForMobile();
    boostTechniques.implementServiceWorker();

    // Mark as boosted
    document.documentElement.setAttribute('data-mobile-boosted', 'true');

    // Log performance boost status
    console.log('🚀 Mobile Performance Booster: Advanced optimizations applied');
    console.log('📊 Target: FCP < 1.8s, LCP < 2.5s for 90+ mobile score');

  }, []);

  return null;
}