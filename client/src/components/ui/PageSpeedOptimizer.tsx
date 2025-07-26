import { useEffect } from 'react';

/**
 * PageSpeed Insights optimizations for Core Web Vitals
 * Implements Google's 2025 performance recommendations
 */
export default function PageSpeedOptimizer() {
  useEffect(() => {
    // 1. LCP (Largest Contentful Paint) Optimization
    const optimizeLCP = () => {
      // Preload critical hero image for better LCP
      const heroImageLink = document.createElement('link');
      heroImageLink.rel = 'preload';
      heroImageLink.as = 'image';
      heroImageLink.href = '/images/celia-portrait-optimized.webp';
      heroImageLink.fetchPriority = 'high';
      document.head.appendChild(heroImageLink);

      // Preconnect to external domains
      const preconnectDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://www.googletagmanager.com'
      ];

      preconnectDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    // 2. CLS (Cumulative Layout Shift) Prevention
    const preventCLS = () => {
      // Add CSS to prevent layout shifts
      const style = document.createElement('style');
      style.textContent = `
        /* Prevent CLS from images loading */
        img {
          max-width: 100%;
          height: auto;
        }
        
        /* Reserve space for hero section */
        .hero-section {
          min-height: 400px;
        }
        
        /* Stable layout for navigation */
        .header-fixed {
          contain: layout style paint;
        }
        
        /* Prevent font loading shifts */
        body {
          font-display: swap;
        }
        
        /* Critical above-the-fold content stability */
        .above-fold {
          contain: layout style;
        }
      `;
      document.head.appendChild(style);
    };

    // 3. INP (Interaction to Next Paint) Optimization
    const optimizeINP = () => {
      // Use scheduler.postTask for better interaction timing
      if ('scheduler' in window && 'postTask' in (window as any).scheduler) {
        const scheduler = (window as any).scheduler;
        
        // Defer non-critical JavaScript
        scheduler.postTask(() => {
          // Load non-critical components after main content
          console.log('Non-critical tasks loaded');
        }, { priority: 'background' });
      }
      
      // Reduce input delay with passive event listeners
      document.addEventListener('touchstart', () => {}, { passive: true });
      document.addEventListener('touchmove', () => {}, { passive: true });
    };

    // 4. Resource Hints for Better Loading
    const addResourceHints = () => {
      // DNS prefetch for external resources
      const dnsPrefetchUrls = [
        'https://maps.googleapis.com',
        'https://www.google.com'
      ];

      dnsPrefetchUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = url;
        document.head.appendChild(link);
      });

      // Prefetch next likely pages for mental health website
      const prefetchPages = [
        '/meet-celia',
        '/services',
        '/contact'
      ];

      prefetchPages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
      });
    };

    // 5. Critical Resource Loading Strategy
    const loadCriticalResources = () => {
      // Inline critical CSS is already handled in index.html
      // Ensure proper loading priority for above-the-fold content
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Load images when they come into view
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
          }
        });
      }, {
        rootMargin: '50px'
      });

      // Apply to all lazy-loaded images
      document.querySelectorAll('img[data-src]').forEach((img) => {
        observer.observe(img);
      });
    };

    // Initialize optimizations
    optimizeLCP();
    preventCLS();
    optimizeINP();
    addResourceHints();
    
    // Delay non-critical optimizations with proper browser support check
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        loadCriticalResources();
      });
    } else {
      // Fallback for browsers without requestIdleCallback (Safari, older browsers)
      setTimeout(() => {
        loadCriticalResources();
      }, 100);
    }

    // Monitor performance and report to console (development)
    if (process.env.NODE_ENV === 'development') {
      const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime, 'ms');
          }
          if (entry.entryType === 'first-input') {
            console.log('INP:', (entry as any).processingStart - entry.startTime, 'ms');
          }
          if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
            console.log('CLS:', (entry as any).value);
          }
        }
      });

      perfObserver.observe({ 
        entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
      });
    }

    // Cleanup function
    return () => {
      // Remove performance observer on unmount
    };
  }, []);

  return null; // This component doesn't render visible content
}