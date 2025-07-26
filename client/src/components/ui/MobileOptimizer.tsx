import { useEffect } from 'react';

/**
 * Mobile-specific performance optimizations for 95+ mobile score
 */
export default function MobileOptimizer() {
  useEffect(() => {
    // Mobile-specific performance optimizations
    const optimizeForMobile = () => {
      // 1. Optimize viewport for mobile
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (viewportMeta) {
        viewportMeta.setAttribute('content', 
          'width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover, user-scalable=yes'
        );
      }

      // 2. Reduce layout shifts on mobile
      const mobileAntiShiftCSS = document.createElement('style');
      mobileAntiShiftCSS.textContent = `
        /* Mobile-specific layout stability */
        @media (max-width: 768px) {
          * {
            box-sizing: border-box;
          }
          
          img {
            max-width: 100%;
            height: auto;
            display: block;
          }
          
          /* Prevent mobile keyboard layout shifts */
          .mobile-input-container {
            position: relative;
            contain: layout style paint;
          }
          
          /* Optimize button sizes for mobile touch */
          button, a, input, textarea, select {
            min-height: 44px;
            min-width: 44px;
          }
          
          /* Improve mobile scroll performance */
          body {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
          }
          
          /* Optimize mobile form interactions */
          input, textarea, select {
            font-size: 16px; /* Prevents zoom on iOS */
            border-radius: 8px;
            padding: 12px 16px;
          }
          
          /* Mobile-first animations */
          * {
            will-change: auto;
          }
          
          /* Reduce mobile animations for performance */
          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        }
        
        /* Enhanced mobile layout optimization */
        @media (max-width: 640px) {
          .container {
            padding-left: 16px;
            padding-right: 16px;
          }
          
          /* Mobile-safe areas for notched devices */
          .mobile-safe {
            padding-left: max(16px, env(safe-area-inset-left));
            padding-right: max(16px, env(safe-area-inset-right));
            padding-top: max(16px, env(safe-area-inset-top));
            padding-bottom: max(16px, env(safe-area-inset-bottom));
          }
          
          /* Optimize mobile grid layouts */
          .grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          /* Mobile hero optimizations */
          .hero-section {
            min-height: 400px;
            padding: 32px 16px;
          }
        }
        
        /* Ultra-mobile (phones in portrait) */
        @media (max-width: 375px) {
          .container {
            padding-left: 12px;
            padding-right: 12px;
          }
          
          h1 {
            font-size: 1.75rem;
            line-height: 1.2;
          }
          
          h2 {
            font-size: 1.5rem;
            line-height: 1.3;
          }
        }
      `;
      document.head.appendChild(mobileAntiShiftCSS);

      // 3. Mobile-specific preloading strategy
      if (window.innerWidth < 768) {
        // Preload smaller images for mobile
        const heroImage = document.createElement('link');
        heroImage.rel = 'preload';
        heroImage.as = 'image';
        heroImage.href = '/images/celia-portrait-mobile.webp'; // Mobile-optimized image
        heroImage.fetchPriority = 'high';
        document.head.appendChild(heroImage);

        // Delay non-critical mobile resources
        setTimeout(() => {
          // Load secondary mobile resources after critical content
          const secondaryImages = [
            '/images/logo-mobile.webp',
            '/images/services-mobile.webp'
          ];
          
          secondaryImages.forEach(src => {
            const img = new Image();
            img.src = src;
          });
        }, 1000);
      }

      // 4. Mobile touch optimizations
      const addMobileTouchOptimizations = () => {
        // Improve scroll performance
        document.body.style.touchAction = 'manipulation';
        
        // Add mobile-specific meta for better performance
        const mobileMetas = [
          { name: 'mobile-web-app-capable', content: 'yes' },
          { name: 'apple-touch-fullscreen', content: 'yes' },
          { name: 'format-detection', content: 'telephone=yes, email=yes' }
        ];
        
        mobileMetas.forEach(meta => {
          const existing = document.querySelector(`meta[name="${meta.name}"]`);
          if (!existing) {
            const metaTag = document.createElement('meta');
            metaTag.name = meta.name;
            metaTag.content = meta.content;
            document.head.appendChild(metaTag);
          }
        });
      };

      addMobileTouchOptimizations();

      // 5. Mobile-specific performance monitoring
      if (window.innerWidth < 768) {
        // Monitor mobile-specific metrics
        if ('PerformanceObserver' in window) {
          try {
            const observer = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                if (entry.entryType === 'largest-contentful-paint') {
                  console.log('Mobile LCP:', entry.startTime, 'ms');
                }
                if (entry.entryType === 'first-input') {
                  console.log('Mobile FID:', (entry as any).processingStart - entry.startTime, 'ms');
                }
              }
            });
            
            observer.observe({ 
              entryTypes: ['largest-contentful-paint', 'first-input'] 
            });
          } catch (e) {
            console.log('Performance monitoring not available');
          }
        }
      }
    };

    // 6. Mobile connection optimization
    const optimizeForConnection = () => {
      const connection = (navigator as any).connection;
      if (connection) {
        const effectiveType = connection.effectiveType;
        
        // Optimize for slow connections (common on mobile)
        if (effectiveType === 'slow-2g' || effectiveType === '2g') {
          // Reduce image quality for slow connections
          document.documentElement.classList.add('slow-connection');
          
          // Disable non-critical animations
          const slowConnectionCSS = document.createElement('style');
          slowConnectionCSS.textContent = `
            .slow-connection * {
              animation: none !important;
              transition: none !important;
            }
          `;
          document.head.appendChild(slowConnectionCSS);
        }
      }
    };

    // Initialize mobile optimizations
    optimizeForMobile();
    optimizeForConnection();

    // Re-optimize on orientation change
    const handleOrientationChange = () => {
      setTimeout(() => {
        optimizeForMobile();
      }, 100);
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  return null;
}