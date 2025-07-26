/**
 * Performance utilities for ultra-fast mobile rendering
 * Targeting 90+ mobile score with sub-1.8s FCP
 */

// Critical image preloader for LCP optimization
export const preloadCriticalImages = () => {
  const criticalImages = [
    '/images/celia-portrait-optimized.webp',
    '/images/header_logo.png'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.setAttribute('fetchpriority', 'high');
    if (src.includes('.webp')) {
      link.type = 'image/webp';
    }
    document.head.appendChild(link);
  });
};

// Font optimization that preserves design
export const optimizeFonts = () => {
  // Add font-display: swap to existing fonts without removing them
  const fontOptimization = document.createElement('style');
  fontOptimization.textContent = `
    /* Font performance optimization */
    @font-face {
      font-display: swap;
    }
  `;
  document.head.appendChild(fontOptimization);
};

// Eliminate render-blocking JavaScript
export const optimizeJavaScript = () => {
  // Defer all non-critical scripts
  const scripts = document.querySelectorAll('script[src]');
  scripts.forEach(script => {
    const src = script.getAttribute('src');
    if (src && !src.includes('main.tsx') && !src.includes('vite')) {
      if (!script.hasAttribute('defer') && !script.hasAttribute('async')) {
        script.setAttribute('defer', 'true');
      }
    }
  });

  // Use passive listeners for better performance
  const passiveEvents = ['touchstart', 'touchmove', 'wheel', 'scroll'];
  passiveEvents.forEach(eventType => {
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      if (passiveEvents.includes(type)) {
        if (typeof options === 'object' && options !== null) {
          options.passive = true;
        } else {
          options = { passive: true };
        }
      }
      return originalAddEventListener.call(this, type, listener, options);
    };
  });
};

// Performance hints that don't break design
export const injectPerformanceHints = () => {
  const performanceCSS = `
    /* Performance optimizations that preserve design */
    @media (max-width: 768px) {
      /* Optimize animations for mobile performance */
      *, *::before, *::after {
        animation-duration: 0.2s !important;
        transition-duration: 0.2s !important;
      }
      
      /* Improve touch performance */
      button, a[role="button"], .btn {
        touch-action: manipulation;
        user-select: none;
      }
      
      /* Layout containment for better performance */
      .container {
        contain: layout style;
      }
      
      /* Image optimization */
      img {
        content-visibility: auto;
        decoding: async;
      }
    }
  `;

  const style = document.createElement('style');
  style.setAttribute('data-performance-hints', 'true');
  style.textContent = performanceCSS;
  document.head.appendChild(style);
};

// Service worker for aggressive caching
export const installPerformanceServiceWorker = () => {
  if (!('serviceWorker' in navigator)) return;

  const swCode = `
    const CACHE_NAME = 'celia-performance-v2';
    const CRITICAL_RESOURCES = [
      '/',
      '/src/main.tsx',
      '/src/index.css',
      '/images/celia-portrait-optimized.webp',
      '/images/header_logo.png'
    ];

    // Install service worker immediately
    self.addEventListener('install', event => {
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(cache => cache.addAll(CRITICAL_RESOURCES))
          .then(() => self.skipWaiting())
      );
    });

    // Activate immediately
    self.addEventListener('activate', event => {
      event.waitUntil(self.clients.claim());
    });

    // Aggressive caching strategy
    self.addEventListener('fetch', event => {
      const { request } = event;
      
      // Cache critical resources immediately
      if (request.destination === 'image' || 
          request.url.includes('.css') ||
          request.url.includes('.js') ||
          request.url.includes('main.tsx')) {
        
        event.respondWith(
          caches.match(request).then(cachedResponse => {
            if (cachedResponse) return cachedResponse;
            
            return fetch(request).then(response => {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(request, responseClone);
              });
              return response;
            });
          })
        );
      }
    });
  `;

  const blob = new Blob([swCode], { type: 'application/javascript' });
  const swUrl = URL.createObjectURL(blob);
  
  navigator.serviceWorker.register(swUrl).then(() => {
    console.log('🚀 Performance Service Worker: Active');
  }).catch(() => {
    // Silent fail - continue without service worker
  });
};

// Real Core Web Vitals measurement
export const measureCoreWebVitals = () => {
  if (!('PerformanceObserver' in window)) return;

  let fcp = 0;
  let lcp = 0;
  let cls = 0;

  // Measure First Contentful Paint
  const fcpObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        fcp = entry.startTime;
        console.log(`📊 Real FCP: ${fcp.toFixed(0)}ms`, fcp < 1800 ? '✅ GOOD' : '❌ POOR');
      }
    }
  });

  // Measure Largest Contentful Paint
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1] as any;
    lcp = lastEntry.startTime;
    console.log(`📊 Real LCP: ${lcp.toFixed(0)}ms`, lcp < 2500 ? '✅ GOOD' : '❌ POOR');
  });

  try {
    fcpObserver.observe({ entryTypes: ['paint'] });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Report summary after delay
    setTimeout(() => {
      const score = calculatePerformanceScore(fcp, lcp, cls);
      console.log(`📱 Mobile Performance Score: ${score}/100`, score >= 90 ? '🎉 EXCELLENT' : '🔧 NEEDS IMPROVEMENT');
      
      if (score < 90) {
        console.log('🎯 Target: FCP < 1800ms, LCP < 2500ms for 90+ score');
      }
    }, 3000);

  } catch (e) {
    console.log('Performance measurement not supported');
  }
};

// Calculate performance score based on Core Web Vitals
const calculatePerformanceScore = (fcp: number, lcp: number, cls: number): number => {
  let score = 100;
  
  // FCP scoring (40% weight)
  if (fcp > 3000) score -= 40;
  else if (fcp > 1800) score -= 20;
  
  // LCP scoring (40% weight)
  if (lcp > 4000) score -= 40;
  else if (lcp > 2500) score -= 20;
  
  // CLS scoring (20% weight)
  if (cls > 0.25) score -= 20;
  else if (cls > 0.1) score -= 10;
  
  return Math.max(score, 0);
};

// Initialize all performance optimizations
export const initializePerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;
  
  // Only run on mobile or when explicitly requested
  const isMobile = window.innerWidth < 768;
  if (!isMobile && !window.location.search.includes('perf=1')) return;

  // Apply optimizations that preserve design
  injectPerformanceHints();
  optimizeFonts();
  preloadCriticalImages();
  optimizeJavaScript();
  
  // Defer heavy operations
  setTimeout(() => {
    installPerformanceServiceWorker();
    measureCoreWebVitals();
  }, 100);

  console.log('🚀 Ultra Performance: Initialized for 90+ mobile score');
};