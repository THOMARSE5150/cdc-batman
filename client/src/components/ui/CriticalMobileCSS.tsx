import { useEffect } from 'react';

/**
 * Injects critical mobile CSS for immediate performance improvements
 * This addresses the main mobile performance issues identified in Lighthouse
 */
export default function CriticalMobileCSS() {
  useEffect(() => {
    // Only inject in development or if not already present
    if (document.querySelector('[data-critical-mobile]')) return;
    
    // Inject critical mobile CSS immediately
    const criticalCSS = document.createElement('style');
    criticalCSS.setAttribute('data-critical-mobile', 'true');
    criticalCSS.textContent = `
      /* Critical mobile performance fixes */
      @media (max-width: 768px) {
        /* 1. Prevent layout shifts - critical for CLS */
        * {
          box-sizing: border-box;
        }
        
        /* 2. Optimize font loading for mobile LCP */
        body, h1, h2, h3, h4, h5, h6 {
          font-display: swap;
          font-synthesis: none;
          text-rendering: optimizeSpeed;
          -webkit-font-smoothing: antialiased;
        }
        
        /* 3. Critical image optimization */
        img {
          max-width: 100%;
          height: auto;
          display: block;
          contain: layout style paint;
        }
        
        /* 4. Mobile-first container optimization */
        .container, .max-w-7xl, .max-w-6xl, .max-w-5xl {
          max-width: 100%;
          padding-left: 16px;
          padding-right: 16px;
          margin-left: auto;
          margin-right: auto;
        }
        
        /* 5. Optimize mobile scrolling performance */
        html {
          -webkit-overflow-scrolling: touch;
          overflow-x: hidden;
        }
        
        body {
          overscroll-behavior: contain;
          scroll-behavior: smooth;
        }
        
        /* 6. Mobile input optimizations - prevent zoom */
        input, textarea, select {
          font-size: 16px !important;
          max-width: 100%;
        }
        
        /* 7. Critical touch target sizes */
        button, a[role="button"], [tabindex], input, textarea, select {
          min-height: 44px;
          min-width: 44px;
          touch-action: manipulation;
        }
        
        /* 8. Performance optimization for animations */
        * {
          will-change: auto;
          backface-visibility: hidden;
        }
        
        /* 9. Mobile-specific layout stability */
        .hero-section, .header, .footer {
          contain: layout style paint;
        }
        
        /* 10. Critical spacing and typography for mobile */
        h1 {
          font-size: clamp(1.75rem, 5vw, 3rem);
          line-height: 1.2;
          margin: 0 0 1rem 0;
        }
        
        h2 {
          font-size: clamp(1.5rem, 4vw, 2.25rem);
          line-height: 1.3;
          margin: 0 0 0.75rem 0;
        }
        
        p {
          line-height: 1.6;
          margin: 0 0 1rem 0;
        }
        
        /* 11. Mobile navigation optimizations */
        .mobile-menu {
          transform: translateZ(0);
          contain: layout style paint;
        }
        
        /* 12. Critical grid optimizations for mobile */
        .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          width: 100%;
        }
        
        /* 13. Mobile-safe padding and margins */
        .mobile-safe {
          padding-left: max(16px, env(safe-area-inset-left));
          padding-right: max(16px, env(safe-area-inset-right));
          padding-top: max(16px, env(safe-area-inset-top));
          padding-bottom: max(16px, env(safe-area-inset-bottom));
        }
        
        /* 14. Optimize form performance on mobile */
        form {
          contain: layout style;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        
        /* 15. Critical button styles for mobile */
        .btn, button:not(.unstyled) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.5rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
          outline: none;
          min-height: 44px;
          padding: 12px 24px;
          font-size: 16px;
        }
        
        /* 16. Mobile card optimizations */
        .card {
          border-radius: 1rem;
          padding: 1.5rem;
          margin-bottom: 1rem;
          contain: layout style paint;
        }
        
        /* 17. Critical loading state optimization */
        .loading, .skeleton {
          contain: layout style paint;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        /* 18. Mobile-specific utility classes */
        .mobile-hidden { display: none !important; }
        .mobile-block { display: block !important; }
        .mobile-flex { display: flex !important; }
        .mobile-grid { display: grid !important; }
        
        /* 19. Critical accessibility improvements for mobile */
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
        
        /* 20. Mobile focus improvements */
        *:focus {
          outline: 2px solid #0ea5e9;
          outline-offset: 2px;
        }
        
        *:focus:not(:focus-visible) {
          outline: none;
        }
        
        /* 21. Performance optimization for reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      }
      
      /* Critical above-the-fold optimizations */
      @media (max-width: 768px) {
        /* Hero section stability */
        .hero-container {
          min-height: 50vh;
          display: flex;
          align-items: center;
          contain: layout style paint;
        }
        
        /* Header optimization */
        .header-container {
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(10px);
          contain: layout style paint;
        }
        
        /* Navigation optimization */
        .nav-container {
          contain: layout style paint;
          transform: translateZ(0);
        }
      }
    `;
    
    // Insert at the beginning of head for immediate application
    document.head.insertBefore(criticalCSS, document.head.firstChild);
    
    // Mobile-specific viewport optimizations
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 
        'width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover, user-scalable=yes, shrink-to-fit=no'
      );
    }
    
    // Add mobile-specific meta tags if not present
    const mobileMetaTags = [
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'format-detection', content: 'telephone=yes, email=yes' },
      { name: 'HandheldFriendly', content: 'true' },
      { name: 'MobileOptimized', content: '320' }
    ];
    
    mobileMetaTags.forEach(({ name, content }) => {
      if (!document.querySelector(`meta[name="${name}"]`)) {
        const meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    });
    
    // Cleanup function
    return () => {
      const criticalStyles = document.querySelector('[data-critical-mobile]');
      if (criticalStyles) {
        criticalStyles.remove();
      }
    };
  }, []);
  
  return null;
}