// Performance optimization utilities

export function deferNonCriticalScripts() {
  // Defer Google Analytics and other tracking scripts
  const scripts = document.querySelectorAll('script[data-category="analytics"]');
  scripts.forEach(script => {
    script.setAttribute('defer', 'true');
  });
}

export function optimizeImages() {
  // Add loading="lazy" to all non-critical images
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach((img, index) => {
    // First 2 images should be eager (hero and logo)
    if (index < 2) {
      img.setAttribute('loading', 'eager');
      img.setAttribute('fetchpriority', 'high');
    } else {
      img.setAttribute('loading', 'lazy');
    }
  });
}

export function preloadCriticalResources() {
  const criticalResources = [
    { href: '/images/header_logo.png', as: 'image' },
    { href: '/src/assets/images/hero_image_canva_optimized.webp', as: 'image' }
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.as === 'image') {
      link.setAttribute('fetchpriority', 'high');
    }
    document.head.appendChild(link);
  });
}

export function enablePerformanceObserver() {
  if ('PerformanceObserver' in window) {
    // Observe Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
        if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
          console.log('CLS:', entry.value);
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  }
}

export function optimizeScrolling() {
  // Use passive event listeners for scroll events
  let scrollTimeout: NodeJS.Timeout;
  
  const handleScroll = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // Scroll handling logic here
    }, 16); // ~60fps
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
    clearTimeout(scrollTimeout);
  };
}

export function initializePerformanceOptimizations() {
  // Run on page load
  window.addEventListener('load', () => {
    deferNonCriticalScripts();
    optimizeImages();
    enablePerformanceObserver();
  });

  // Run immediately for critical path
  preloadCriticalResources();
  
  // Cleanup function
  return optimizeScrolling();
}