import { useEffect } from 'react';

/**
 * Mobile Critical Resource Loader
 * Aggressively preloads critical resources for faster LCP on mobile
 * Addresses LCP request discovery and network dependency tree issues
 */
export default function MobileCriticalResourceLoader() {
  useEffect(() => {
    // Only optimize mobile
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    // Skip if already loaded
    if (document.querySelector('[data-critical-loaded]')) return;

    const loadCriticalResources = () => {
      // 1. Preload hero image with highest priority
      const heroImagePreload = document.createElement('link');
      heroImagePreload.rel = 'preload';
      heroImagePreload.href = '/images/celia-portrait-optimized.webp';
      heroImagePreload.as = 'image';
      heroImagePreload.type = 'image/webp';
      heroImagePreload.setAttribute('fetchpriority', 'high');
      heroImagePreload.setAttribute('importance', 'high');
      document.head.insertBefore(heroImagePreload, document.head.firstChild);

      // 2. Preload logo for immediate header rendering
      const logoPreload = document.createElement('link');
      logoPreload.rel = 'preload';
      logoPreload.href = '/images/header_logo.png';
      logoPreload.as = 'image';
      logoPreload.setAttribute('fetchpriority', 'high');
      document.head.insertBefore(logoPreload, document.head.children[1]);

      // 3. Early connection to external resources
      const criticalConnections = [
        { href: 'https://fonts.googleapis.com', crossorigin: true },
        { href: 'https://fonts.gstatic.com', crossorigin: true }
      ];

      criticalConnections.forEach(connection => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = connection.href;
        if (connection.crossorigin) link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });

      // 4. DNS prefetch for faster lookups
      const dnsPrefetches = [
        '//fonts.googleapis.com',
        '//fonts.gstatic.com'
      ];

      dnsPrefetches.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
      });

      // 5. Prefetch critical CSS resources
      const criticalCSS = document.createElement('link');
      criticalCSS.rel = 'prefetch';
      criticalCSS.href = '/src/index.css';
      criticalCSS.as = 'style';
      document.head.appendChild(criticalCSS);

      // 6. Module preload for critical JavaScript
      const modulePreload = document.createElement('link');
      modulePreload.rel = 'modulepreload';
      modulePreload.href = '/src/main.tsx';
      document.head.appendChild(modulePreload);

      // Mark as loaded
      document.documentElement.setAttribute('data-critical-loaded', 'true');
    };

    // Load immediately for critical path optimization
    loadCriticalResources();

    // Optimize font loading specifically for mobile
    const optimizeFonts = () => {
      // Add font-display: swap to prevent FOIT
      const fontOptimization = document.createElement('style');
      fontOptimization.textContent = `
        /* Critical font optimization for mobile LCP */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          font-display: swap !important;
        }
        
        body, h1, h2, h3, h4, h5, h6 {
          font-display: swap;
          font-synthesis: none;
          text-rendering: optimizeSpeed;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `;
      document.head.appendChild(fontOptimization);
    };

    optimizeFonts();

    // Critical viewport optimization for mobile
    const optimizeViewport = () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 
          'width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0, viewport-fit=cover, user-scalable=yes'
        );
      }

      // Add mobile web app meta tags
      const mobileMetaTags = [
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'Celia Dunsmore Counselling' },
        { name: 'theme-color', content: '#00d4aa' },
        { name: 'msapplication-TileColor', content: '#00d4aa' }
      ];

      mobileMetaTags.forEach(({ name, content }) => {
        if (!document.querySelector(`meta[name="${name}"]`)) {
          const meta = document.createElement('meta');
          meta.name = name;
          meta.content = content;
          document.head.appendChild(meta);
        }
      });
    };

    optimizeViewport();

    console.log('🚀 Critical resources preloaded for mobile LCP optimization');

  }, []);

  return null;
}