import { useEffect } from 'react';

/**
 * Critical resource loader for mobile performance optimization
 * Aggressively preloads and optimizes critical path resources
 */
export default function CriticalResourceLoader() {
  useEffect(() => {
    // Skip if already loaded
    if (document.querySelector('[data-critical-resources-loaded]')) return;

    const optimizations = {
      // 1. Preload critical fonts with font-display: swap
      loadCriticalFonts: () => {
        const fontOptimizations = document.createElement('style');
        fontOptimizations.textContent = `
          @font-face {
            font-family: 'system-ui-optimized';
            src: local('system-ui'), local('-apple-system'), local('BlinkMacSystemFont');
            font-display: swap;
            unicode-range: U+0020-007F;
          }
          
          body, h1, h2, h3, h4, h5, h6 {
            font-family: 'system-ui-optimized', system-ui, -apple-system, sans-serif;
            font-display: swap;
          }
        `;
        document.head.appendChild(fontOptimizations);
      },

      // 2. Optimize critical images for LCP
      optimizeCriticalImages: () => {
        // Preload hero image with high priority
        const heroImagePreload = document.createElement('link');
        heroImagePreload.rel = 'preload';
        heroImagePreload.as = 'image';
        heroImagePreload.href = '/images/celia-portrait-optimized.webp';
        heroImagePreload.type = 'image/webp';
        heroImagePreload.setAttribute('fetchpriority', 'high');
        document.head.appendChild(heroImagePreload);

        // Preload logo for header
        const logoPreload = document.createElement('link');
        logoPreload.rel = 'preload';
        logoPreload.as = 'image';
        logoPreload.href = '/images/header_logo.png';
        logoPreload.setAttribute('fetchpriority', 'high');
        document.head.appendChild(logoPreload);
      },

      // 3. Inline critical CSS for immediate rendering
      inlineCriticalCSS: () => {
        const criticalCSS = document.createElement('style');
        criticalCSS.setAttribute('data-critical-inline', 'true');
        criticalCSS.textContent = `
          /* Critical above-the-fold styles for FCP < 1.8s */
          .hero-section {
            background: linear-gradient(135deg, #f0f7f7 0%, #ffffff 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            contain: layout style paint;
          }
          
          .hero-text-primary {
            color: #1f2937;
            font-weight: 700;
            line-height: 1.15;
            margin: 0;
          }
          
          .hero-text-accent {
            background: linear-gradient(to right, #0ea5e9, #0284c7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .btn-primary {
            background: #0ea5e9;
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.75rem;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            transition: background-color 0.2s;
          }
          
          .btn-primary:hover {
            background: #0284c7;
          }
          
          @media (max-width: 768px) {
            .hero-section {
              padding: 5rem 1rem 2rem;
              min-height: 100svh;
            }
            
            .grid-mobile {
              display: block;
            }
            
            .text-mobile-center {
              text-align: center;
            }
            
            .mb-mobile-8 {
              margin-bottom: 2rem;
            }
          }
        `;
        
        // Insert at beginning for immediate application
        document.head.insertBefore(criticalCSS, document.head.firstChild);
      },

      // 4. Optimize viewport and meta tags
      optimizeViewportMeta: () => {
        // Optimize viewport for mobile performance
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
          viewport.setAttribute('content', 
            'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=yes'
          );
        }

        // Add performance hints
        const performanceHints = [
          { name: 'format-detection', content: 'telephone=no' },
          { name: 'mobile-web-app-capable', content: 'yes' },
          { name: 'mobile-web-app-status-bar-style', content: 'default' }
        ];

        performanceHints.forEach(hint => {
          if (!document.querySelector(`meta[name="${hint.name}"]`)) {
            const meta = document.createElement('meta');
            meta.name = hint.name;
            meta.content = hint.content;
            document.head.appendChild(meta);
          }
        });
      },

      // 5. Reduce JavaScript execution time
      optimizeJavaScriptExecution: () => {
        // Defer non-critical scripts
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
          if (!script.hasAttribute('async') && !script.hasAttribute('defer')) {
            // Only defer if not critical
            if (!script.src.includes('main.tsx') && !script.src.includes('vite')) {
              script.setAttribute('defer', 'true');
            }
          }
        });

        // Optimize event listeners for mobile
        if (window.innerWidth < 768) {
          // Use passive listeners for better scroll performance
          const passiveEvents = ['touchstart', 'touchmove', 'scroll', 'wheel'];
          const originalAddEventListener = EventTarget.prototype.addEventListener;
          
          EventTarget.prototype.addEventListener = function(type, listener, options) {
            if (passiveEvents.includes(type) && typeof options !== 'object') {
              options = { passive: true };
            } else if (typeof options === 'object' && options !== null) {
              options.passive = true;
            }
            return originalAddEventListener.call(this, type, listener, options);
          };
        }
      }
    };

    // Apply optimizations in performance-critical order
    optimizations.optimizeViewportMeta();
    optimizations.inlineCriticalCSS();
    optimizations.loadCriticalFonts();
    optimizations.optimizeCriticalImages();
    optimizations.optimizeJavaScriptExecution();

    // Mark as loaded
    document.documentElement.setAttribute('data-critical-resources-loaded', 'true');

    // Cleanup function
    return () => {
      const criticalStyles = document.querySelector('[data-critical-inline]');
      if (criticalStyles) criticalStyles.remove();
    };
  }, []);

  return null;
}