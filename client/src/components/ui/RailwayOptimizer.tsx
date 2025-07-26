import { useEffect } from 'react';

/**
 * Railway deployment specific optimizations
 * Ensures optimal performance on Railway platform
 */
export default function RailwayOptimizer() {
  useEffect(() => {
    // Detect Railway environment
    const isRailway = window.location.hostname.includes('railway.app') || 
                     window.location.hostname.includes('up.railway.app') ||
                     process.env.NODE_ENV === 'production';

    if (!isRailway) return;

    // Railway-specific optimizations
    const railwayOptimizations = document.createElement('style');
    railwayOptimizations.setAttribute('data-railway-optimizations', 'true');
    railwayOptimizations.textContent = `
      /* Railway deployment optimizations */
      
      /* 1. Container-specific optimizations */
      .container {
        max-width: 100% !important;
        overflow-x: hidden;
      }
      
      /* 2. Image optimization for Railway CDN */
      img {
        loading: lazy;
        decoding: async;
        image-rendering: auto;
      }
      
      /* 3. Network-aware optimizations */
      @media (max-width: 768px) {
        /* Mobile-first for Railway deployment */
        .grid-cols-2, .grid-cols-3, .grid-cols-4 {
          grid-template-columns: 1fr !important;
        }
        
        /* Reduce spacing for mobile */
        .p-8 { padding: 1rem !important; }
        .p-6 { padding: 1rem !important; }
        .gap-8 { gap: 1rem !important; }
        .gap-6 { gap: 1rem !important; }
        
        /* Touch-friendly buttons */
        button, a[role="button"] {
          min-height: 44px !important;
          min-width: 44px !important;
          padding: 12px 16px !important;
        }
        
        /* Typography optimization */
        h1 { font-size: clamp(1.75rem, 5vw, 2.5rem) !important; }
        h2 { font-size: clamp(1.5rem, 4vw, 2rem) !important; }
        h3 { font-size: clamp(1.25rem, 3vw, 1.75rem) !important; }
        
        /* Form optimization */
        input, textarea, select {
          font-size: 16px !important;
          padding: 12px !important;
        }
      }
      
      /* 4. Performance optimizations for Railway */
      * {
        box-sizing: border-box;
      }
      
      .hero-section, .header, .footer {
        contain: layout style paint;
      }
      
      /* 5. Railway-specific loading optimizations */
      .loading-skeleton {
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.4),
          transparent
        );
        animation: shimmer 1.5s infinite;
      }
      
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      
      /* 6. Critical path optimization */
      .above-fold {
        contain: layout style;
        will-change: auto;
      }
      
      /* 7. Memory optimization */
      .complex-animation {
        animation: none !important;
      }
      
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
        }
      }
    `;

    document.head.appendChild(railwayOptimizations);

    // Railway-specific meta optimizations
    const addRailwayMeta = () => {
      // Add Railway-specific viewport optimization
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 
          'width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover, user-scalable=yes'
        );
      }

      // Add Railway deployment meta
      if (!document.querySelector('meta[name="deployment-platform"]')) {
        const meta = document.createElement('meta');
        meta.name = 'deployment-platform';
        meta.content = 'railway';
        document.head.appendChild(meta);
      }
    };

    addRailwayMeta();

    // Performance monitoring for Railway
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            const lcp = entry.startTime;
            if (lcp > 2500) {
              console.log('⚠️ Railway LCP needs improvement:', lcp.toFixed(2), 'ms');
            }
          }
        }
      });

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Observer not supported
      }
    }

    // Cleanup
    return () => {
      const railwayStyles = document.querySelector('[data-railway-optimizations]');
      if (railwayStyles) {
        railwayStyles.remove();
      }
    };
  }, []);

  return null;
}