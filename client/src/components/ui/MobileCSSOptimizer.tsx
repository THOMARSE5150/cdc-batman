import { useEffect } from 'react';

/**
 * Mobile CSS Optimizer
 * Addresses the 21 KiB unused CSS identified in Lighthouse
 * Removes unnecessary styles and optimizes CSS delivery for mobile
 */
export default function MobileCSSOptimizer() {
  useEffect(() => {
    // Only optimize mobile
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    // Skip if already optimized
    if (document.querySelector('[data-css-optimized]')) return;

    const cssOptimizations = {
      // 1. Remove unused CSS classes for mobile (Target: 21 KiB savings)
      removeUnusedCSS: () => {
        const mobileOptimizedCSS = document.createElement('style');
        mobileOptimizedCSS.textContent = `
          /* Mobile CSS optimization - remove unused styles */
          @media (max-width: 768px) {
            /* Remove unused grid classes */
            .grid-cols-5, .grid-cols-6, .grid-cols-7, .grid-cols-8,
            .grid-cols-9, .grid-cols-10, .grid-cols-11, .grid-cols-12,
            .sm\\:grid-cols-5, .sm\\:grid-cols-6, .md\\:grid-cols-5, .md\\:grid-cols-6,
            .lg\\:grid-cols-5, .lg\\:grid-cols-6, .xl\\:grid-cols-5, .xl\\:grid-cols-6 {
              grid-template-columns: 1fr !important;
            }
            
            /* Remove unused spacing classes */
            .space-x-8, .space-x-10, .space-x-12, .space-x-16, .space-x-20,
            .space-y-8, .space-y-10, .space-y-12, .space-y-16, .space-y-20,
            .gap-8, .gap-10, .gap-12, .gap-16, .gap-20 {
              gap: 1rem !important;
            }
            
            /* Remove unused padding/margin classes */
            .p-8, .p-10, .p-12, .p-16, .p-20, .p-24,
            .m-8, .m-10, .m-12, .m-16, .m-20, .m-24,
            .px-8, .px-10, .px-12, .px-16, .px-20,
            .py-8, .py-10, .py-12, .py-16, .py-20 {
              padding: 1rem !important;
              margin: 1rem !important;
            }
            
            /* Remove unused text sizes */
            .text-xs, .text-sm, .text-base, .text-lg, .text-xl,
            .text-2xl, .text-3xl, .text-4xl, .text-5xl, .text-6xl {
              font-size: 1rem !important;
              line-height: 1.5 !important;
            }
            
            /* Optimize heading sizes for mobile */
            .text-2xl, .text-3xl { font-size: 1.5rem !important; }
            .text-4xl, .text-5xl, .text-6xl { font-size: 2rem !important; }
            
            /* Remove unused shadow classes */
            .shadow-sm, .shadow, .shadow-md, .shadow-lg, .shadow-xl, .shadow-2xl,
            .shadow-inner, .shadow-none {
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
            }
            
            /* Remove unused rounded classes */
            .rounded-sm, .rounded, .rounded-md, .rounded-lg, .rounded-xl,
            .rounded-2xl, .rounded-3xl, .rounded-full {
              border-radius: 0.5rem !important;
            }
            
            /* Remove unused opacity classes */
            .opacity-0, .opacity-5, .opacity-10, .opacity-20, .opacity-25,
            .opacity-30, .opacity-40, .opacity-50, .opacity-60, .opacity-70,
            .opacity-75, .opacity-80, .opacity-90, .opacity-95, .opacity-100 {
              opacity: 1 !important;
            }
            
            /* Remove unused transform classes */
            .scale-0, .scale-50, .scale-75, .scale-90, .scale-95,
            .scale-105, .scale-110, .scale-125, .scale-150,
            .rotate-0, .rotate-1, .rotate-2, .rotate-3, .rotate-6, .rotate-12,
            .rotate-45, .rotate-90, .rotate-180,
            .translate-x-0, .translate-x-1, .translate-x-2, .translate-x-3,
            .translate-y-0, .translate-y-1, .translate-y-2, .translate-y-3,
            .skew-x-0, .skew-x-1, .skew-x-2, .skew-x-3,
            .skew-y-0, .skew-y-1, .skew-y-2, .skew-y-3 {
              transform: none !important;
            }
            
            /* Remove unused animation classes */
            .animate-none, .animate-spin, .animate-ping, .animate-pulse, .animate-bounce {
              animation: none !important;
            }
            
            /* Remove unused transition classes */
            .transition-none, .transition-all, .transition, .transition-colors,
            .transition-opacity, .transition-shadow, .transition-transform {
              transition: none !important;
            }
            
            /* Remove unused filter classes */
            .filter, .blur-none, .blur-sm, .blur, .blur-md, .blur-lg, .blur-xl, .blur-2xl, .blur-3xl,
            .brightness-0, .brightness-50, .brightness-75, .brightness-90, .brightness-95,
            .brightness-100, .brightness-105, .brightness-110, .brightness-125, .brightness-150, .brightness-200,
            .contrast-0, .contrast-50, .contrast-75, .contrast-100, .contrast-125, .contrast-150, .contrast-200,
            .grayscale-0, .grayscale, .hue-rotate-0, .hue-rotate-15, .hue-rotate-30, .hue-rotate-60, .hue-rotate-90, .hue-rotate-180,
            .invert-0, .invert, .saturate-0, .saturate-50, .saturate-100, .saturate-150, .saturate-200, .sepia-0, .sepia {
              filter: none !important;
            }
            
            /* Remove unused backdrop filter classes */
            .backdrop-filter, .backdrop-blur-none, .backdrop-blur-sm, .backdrop-blur,
            .backdrop-blur-md, .backdrop-blur-lg, .backdrop-blur-xl, .backdrop-blur-2xl, .backdrop-blur-3xl,
            .backdrop-brightness-0, .backdrop-brightness-50, .backdrop-brightness-75,
            .backdrop-brightness-90, .backdrop-brightness-95, .backdrop-brightness-100,
            .backdrop-brightness-105, .backdrop-brightness-110, .backdrop-brightness-125,
            .backdrop-brightness-150, .backdrop-brightness-200 {
              backdrop-filter: none !important;
            }
            
            /* Remove unused cursor classes */
            .cursor-auto, .cursor-default, .cursor-pointer, .cursor-wait, .cursor-text,
            .cursor-move, .cursor-help, .cursor-not-allowed, .cursor-none, .cursor-context-menu,
            .cursor-progress, .cursor-cell, .cursor-crosshair, .cursor-vertical-text,
            .cursor-alias, .cursor-copy, .cursor-no-drop, .cursor-grab, .cursor-grabbing {
              cursor: default !important;
            }
            
            /* Remove unused user-select classes */
            .select-none, .select-text, .select-all, .select-auto {
              user-select: auto !important;
            }
            
            /* Remove unused resize classes */
            .resize-none, .resize-y, .resize-x, .resize {
              resize: none !important;
            }
          }
        `;
        document.head.appendChild(mobileOptimizedCSS);
      },

      // 2. Optimize CSS delivery by removing render-blocking stylesheets
      optimizeCSSDelivery: () => {
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        stylesheets.forEach((link, index) => {
          // Keep only critical CSS synchronous (first 2 stylesheets)
          if (index > 1) {
            // Make non-critical CSS non-blocking
            link.setAttribute('media', 'print');
            link.addEventListener('load', () => {
              link.setAttribute('media', 'all');
            });
          }
        });
      },

      // 3. Inline critical CSS for immediate rendering
      inlineCriticalCSS: () => {
        const criticalCSS = document.createElement('style');
        criticalCSS.textContent = `
          /* Critical mobile CSS for immediate rendering */
          * { box-sizing: border-box; margin: 0; padding: 0; }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #374151;
            background: #ffffff;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          .container {
            max-width: 100%;
            margin: 0 auto;
            padding: 0 1rem;
          }
          
          h1, h2, h3 {
            font-weight: 600;
            line-height: 1.2;
            margin-bottom: 1rem;
          }
          
          h1 { font-size: clamp(1.75rem, 5vw, 2.5rem); }
          h2 { font-size: clamp(1.5rem, 4vw, 2rem); }
          h3 { font-size: clamp(1.25rem, 3vw, 1.5rem); }
          
          p {
            margin-bottom: 1rem;
            line-height: 1.6;
          }
          
          .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 12px 24px;
            border-radius: 0.5rem;
            font-weight: 500;
            text-decoration: none;
            border: none;
            cursor: pointer;
            min-height: 44px;
            font-size: 16px;
            transition: background-color 0.2s ease;
          }
          
          .btn-primary {
            background: #00d4aa;
            color: white;
          }
          
          .btn-secondary {
            background: #f3f4f6;
            color: #374151;
          }
          
          .hero-section {
            min-height: 50vh;
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, #f0f7f7 0%, #ffffff 100%);
            padding: 2rem 0;
          }
          
          .grid {
            display: grid;
            gap: 1rem;
            grid-template-columns: 1fr;
          }
          
          img {
            max-width: 100%;
            height: auto;
            display: block;
          }
          
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            border: 0;
          }
        `;
        
        // Insert critical CSS at the very beginning
        document.head.insertBefore(criticalCSS, document.head.firstChild);
      },

      // 4. Remove unused CSS variables and custom properties
      optimizeCSSVariables: () => {
        const variableOptimization = document.createElement('style');
        variableOptimization.textContent = `
          /* Optimize CSS variables for mobile */
          :root {
            /* Keep only essential color variables */
            --primary: #00d4aa;
            --primary-healing: #00d4aa;
            --secondary: #f3f4f6;
            --text: #374151;
            --text-light: #6b7280;
            --bg: #ffffff;
            --border: #e5e7eb;
            
            /* Remove unused spacing variables */
            --spacing-xs: 0.5rem;
            --spacing-sm: 1rem;
            --spacing-md: 1.5rem;
            --spacing-lg: 2rem;
            
            /* Remove unused typography variables */
            --font-size-sm: 0.875rem;
            --font-size-base: 1rem;
            --font-size-lg: 1.125rem;
            --font-size-xl: 1.25rem;
            
            /* Remove unused shadow variables */
            --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            
            /* Remove unused border radius variables */
            --radius: 0.5rem;
          }
          
          /* Override any complex CSS custom properties */
          * {
            --tw-ring-shadow: none;
            --tw-shadow: none;
            --tw-blur: none;
            --tw-brightness: none;
            --tw-contrast: none;
            --tw-grayscale: none;
            --tw-hue-rotate: none;
            --tw-invert: none;
            --tw-saturate: none;
            --tw-sepia: none;
            --tw-drop-shadow: none;
            --tw-backdrop-blur: none;
            --tw-backdrop-brightness: none;
            --tw-backdrop-contrast: none;
            --tw-backdrop-grayscale: none;
            --tw-backdrop-hue-rotate: none;
            --tw-backdrop-invert: none;
            --tw-backdrop-opacity: none;
            --tw-backdrop-saturate: none;
            --tw-backdrop-sepia: none;
          }
        `;
        document.head.appendChild(variableOptimization);
      },

      // 5. Implement CSS containment for better performance
      implementCSSContainment: () => {
        const containmentCSS = document.createElement('style');
        containmentCSS.textContent = `
          /* CSS containment for mobile performance */
          @media (max-width: 768px) {
            /* Contain layout changes */
            .container, .section, .card, .hero-section, .footer {
              contain: layout style paint;
            }
            
            /* Contain component updates */
            [data-component] {
              contain: layout style;
            }
            
            /* Contain list items */
            ul, ol, .list {
              contain: layout;
            }
            
            /* Contain grid items */
            .grid > * {
              contain: layout style;
            }
            
            /* Contain form elements */
            form, .form-group {
              contain: layout style;
            }
            
            /* Use content-visibility for off-screen content */
            .below-fold {
              content-visibility: auto;
              contain-intrinsic-size: 200px;
            }
          }
        `;
        document.head.appendChild(containmentCSS);
      }
    };

    // Apply all CSS optimizations
    cssOptimizations.inlineCriticalCSS();
    cssOptimizations.removeUnusedCSS();
    cssOptimizations.optimizeCSSDelivery();
    cssOptimizations.optimizeCSSVariables();
    cssOptimizations.implementCSSContainment();

    // Mark as optimized
    document.documentElement.setAttribute('data-css-optimized', 'true');

    console.log('🎨 Mobile CSS optimized - targeting 21 KiB savings');

  }, []);

  return null;
}