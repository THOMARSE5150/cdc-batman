// Production optimizations for Railway deployment
export const productionOptimizations = {
  // Service Worker registration for caching
  registerServiceWorker: () => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('SW registered:', registration);
        } catch (error) {
          console.log('SW registration failed:', error);
        }
      });
    }
  },

  // Preload critical resources
  preloadCriticalResources: () => {
    const criticalResources = [
      '/images/header_logo.png',
      '/images/cdc_high_res_logo.png'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = resource;
      document.head.appendChild(link);
    });
  },

  // Optimize images for production
  optimizeImages: () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Add loading="lazy" for images below the fold
      if (!img.hasAttribute('loading')) {
        const rect = img.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
          img.setAttribute('loading', 'lazy');
        }
      }
    });
  },

  // Memory optimization
  enableMemoryOptimization: () => {
    // Clean up unused variables and objects
    if (typeof window !== 'undefined') {
      // Force garbage collection in development
      if (process.env.NODE_ENV === 'development' && 'gc' in window) {
        (window as any).gc();
      }
    }
  },

  // Performance monitoring
  initPerformanceMonitoring: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Log Core Web Vitals
      const logCWV = (name: string, value: number) => {
        console.log(`${name}: ${value}`);
        // Could send to analytics service
      };

      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            logCWV('LCP', entry.startTime);
          }
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'first-input') {
            logCWV('FID', (entry as any).processingStart - entry.startTime);
          }
        }
      }).observe({ entryTypes: ['first-input'] });
    }
  }
};

// Initialize all optimizations
export const initProductionOptimizations = () => {
  if (process.env.NODE_ENV === 'production') {
    productionOptimizations.registerServiceWorker();
    productionOptimizations.preloadCriticalResources();
    productionOptimizations.initPerformanceMonitoring();
    
    // Delayed optimizations
    setTimeout(() => {
      productionOptimizations.optimizeImages();
      productionOptimizations.enableMemoryOptimization();
    }, 1000);
  }
};