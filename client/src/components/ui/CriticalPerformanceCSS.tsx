import { useEffect } from 'react';

/**
 * Critical performance optimizations for mobile PageSpeed Insights
 * Targets LCP < 2.5s and FCP < 1.8s specifically
 */
export default function CriticalPerformanceCSS() {
  useEffect(() => {
    // Only inject once
    if (document.querySelector('[data-critical-performance]')) return;

    const criticalCSS = document.createElement('style');
    criticalCSS.setAttribute('data-critical-performance', 'true');
    criticalCSS.textContent = `
      /* Critical performance optimizations for mobile */
      
      /* 1. Prevent layout shifts - Critical for CLS */
      * {
        box-sizing: border-box;
      }
      
      html {
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: transparent;
      }
      
      body {
        margin: 0;
        padding: 0;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeSpeed;
      }
      
      /* 2. Critical font optimization for LCP */
      @font-face {
        font-family: system;
        font-style: normal;
        font-weight: 300;
        src: local(".SFNSText-Light"), local(".HelveticaNeueDeskInterface-Light"), local(".LucidaGrandeUI"), local("Segoe UI Light"), local("Ubuntu Light"), local("Roboto-Light"), local("DroidSans"), local("Tahoma");
      }
      
      /* 3. Immediate image optimization */
      img {
        max-width: 100%;
        height: auto;
        vertical-align: middle;
        font-style: italic;
        background-repeat: no-repeat;
        background-size: cover;
        shape-margin: 0.75rem;
      }
      
      /* 4. Critical layout optimization for mobile */
      @media (max-width: 768px) {
        /* Container optimization */
        .container, .max-w-7xl, .max-w-6xl, .max-w-5xl, .max-w-4xl {
          max-width: 100% !important;
          padding-left: 1rem !important;
          padding-right: 1rem !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
        
        /* Grid optimization */
        .grid-cols-2, .grid-cols-3, .grid-cols-4, .sm\\:grid-cols-2, .md\\:grid-cols-3, .lg\\:grid-cols-4 {
          grid-template-columns: 1fr !important;
        }
        
        /* Typography optimization for LCP */
        h1 {
          font-size: clamp(2rem, 6vw, 3rem) !important;
          line-height: 1.2 !important;
          margin: 0 0 1rem 0 !important;
        }
        
        h2 {
          font-size: clamp(1.5rem, 5vw, 2.25rem) !important;
          line-height: 1.3 !important;
          margin: 0 0 0.75rem 0 !important;
        }
        
        h3 {
          font-size: clamp(1.25rem, 4vw, 1.75rem) !important;
          line-height: 1.4 !important;
        }
        
        p {
          font-size: 1rem !important;
          line-height: 1.6 !important;
          margin: 0 0 1rem 0 !important;
        }
        
        /* Button optimization for touch */
        button, a[role="button"], .btn {
          min-height: 44px !important;
          min-width: 44px !important;
          padding: 12px 16px !important;
          font-size: 16px !important;
          touch-action: manipulation !important;
          -webkit-tap-highlight-color: transparent !important;
        }
        
        /* Input optimization */
        input, textarea, select {
          font-size: 16px !important;
          padding: 12px !important;
          border-radius: 8px !important;
          border: 1px solid #d1d5db !important;
        }
        
        /* Spacing optimization */
        .p-8, .p-6 { padding: 1rem !important; }
        .py-8, .py-6 { padding-top: 1rem !important; padding-bottom: 1rem !important; }
        .px-8, .px-6 { padding-left: 1rem !important; padding-right: 1rem !important; }
        .m-8, .m-6 { margin: 1rem !important; }
        .gap-8, .gap-6 { gap: 1rem !important; }
      }
      
      /* 5. Critical performance fixes */
      .hero-section {
        contain: layout style paint;
        will-change: auto;
      }
      
      .header-container {
        contain: layout style paint;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 50;
        height: 64px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
      
      /* 6. Disable expensive animations on mobile */
      @media (max-width: 768px) {
        *, *::before, *::after {
          animation-duration: 0.3s !important;
          animation-delay: 0s !important;
          transition-duration: 0.2s !important;
        }
        
        /* Disable complex animations */
        .animate-float, .animate-pulse-slow, .animate-shimmer {
          animation: none !important;
        }
        
        /* Disable expensive effects */
        .blur-3xl, .blur-2xl, .blur-xl {
          filter: none !important;
        }
        
        .backdrop-blur-3xl, .backdrop-blur-2xl, .backdrop-blur-xl {
          backdrop-filter: none !important;
        }
      }
      
      /* 7. Critical loading states */
      .loading-skeleton {
        background: #f3f4f6;
        background-image: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
        background-size: 200px 100%;
        background-repeat: no-repeat;
        animation: loading 1.5s infinite;
      }
      
      @keyframes loading {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }
      
      /* 8. Critical accessibility fixes */
      .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }
      
      /* 9. Focus optimization */
      *:focus {
        outline: 2px solid #0ea5e9 !important;
        outline-offset: 2px !important;
      }
      
      *:focus:not(:focus-visible) {
        outline: none !important;
      }
      
      /* 10. Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
    `;

    // Insert critical CSS at the beginning for immediate application
    document.head.insertBefore(criticalCSS, document.head.firstChild);

    // Cleanup
    return () => {
      const styles = document.querySelector('[data-critical-performance]');
      if (styles) styles.remove();
    };
  }, []);

  return null;
}