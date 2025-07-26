import { useEffect, useState } from 'react';

interface MobileMetrics {
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  fid: number | null;
  optimizationsApplied: string[];
  estimatedSavings: {
    images: number;
    javascript: number;
    css: number;
    total: number;
  };
}

/**
 * Mobile Performance Dashboard
 * Tracks and reports on the specific optimizations applied for mobile performance
 * Provides real-time feedback on progress toward 90+ mobile Lighthouse score
 */
export default function MobilePerformanceDashboard() {
  const [metrics, setMetrics] = useState<MobileMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    optimizationsApplied: [],
    estimatedSavings: {
      images: 0,
      javascript: 0,
      css: 0,
      total: 0
    }
  });

  useEffect(() => {
    // Only run on mobile devices and in development
    const isMobile = window.innerWidth <= 768;
    if (!isMobile || process.env.NODE_ENV !== 'development') return;

    const trackOptimizations = () => {
      const optimizations: string[] = [];
      let estimatedSavings = {
        images: 0,
        javascript: 0,
        css: 0,
        total: 0
      };

      // Check which optimizations are active
      if (document.querySelector('[data-critical-loaded]')) {
        optimizations.push('Critical Resource Preloading');
      }

      if (document.querySelector('[data-images-optimized]')) {
        optimizations.push('Image Optimization');
        estimatedSavings.images = 100; // 100 KiB from Lighthouse
      }

      if (document.querySelector('[data-js-optimized]')) {
        optimizations.push('JavaScript Optimization');
        estimatedSavings.javascript = 153; // 141 + 12 KiB from Lighthouse
      }

      if (document.querySelector('[data-css-optimized]')) {
        optimizations.push('CSS Optimization');
        estimatedSavings.css = 21; // 21 KiB from Lighthouse
      }

      if (document.querySelector('[data-mobile-enhanced]')) {
        optimizations.push('Mobile Performance Enhancement');
      }

      estimatedSavings.total = estimatedSavings.images + estimatedSavings.javascript + estimatedSavings.css;

      setMetrics(prev => ({
        ...prev,
        optimizationsApplied: optimizations,
        estimatedSavings
      }));
    };

    // Track Core Web Vitals if available
    const trackCoreWebVitals = () => {
      if ('web-vital' in window || 'webVitals' in window) {
        // Use Web Vitals library if available
        // Use Performance Observer directly since web-vitals is not installed
        usePerformanceObserver();
      } else {
        usePerformanceObserver();
      }
    };

    const usePerformanceObserver = () => {
      if ('PerformanceObserver' in window) {
        // Track LCP
        try {
          const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.log('LCP observation not supported');
        }

        // Track FCP
        try {
          const fcpObserver = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              if (entry.name === 'first-contentful-paint') {
                setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
              }
            }
          });
          fcpObserver.observe({ entryTypes: ['paint'] });
        } catch (e) {
          console.log('FCP observation not supported');
        }

        // Track CLS
        try {
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            }
            setMetrics(prev => ({ ...prev, cls: clsValue }));
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          console.log('CLS observation not supported');
        }
      }
    };

    // Initialize tracking
    trackOptimizations();
    trackCoreWebVitals();

    // Re-check optimizations periodically
    const interval = setInterval(trackOptimizations, 2000);

    // Log performance report
    setTimeout(() => {
      const report = {
        optimizationsApplied: metrics.optimizationsApplied,
        estimatedSavings: metrics.estimatedSavings,
        coreWebVitals: {
          fcp: metrics.fcp,
          lcp: metrics.lcp,
          cls: metrics.cls,
          fid: metrics.fid
        }
      };

      console.log('📱 MOBILE PERFORMANCE OPTIMIZATION REPORT');
      console.log('==========================================');
      console.log('🎯 Target: 72 → 90+ Lighthouse Mobile Score');
      console.log('');
      console.log('✅ Optimizations Applied:');
      report.optimizationsApplied.forEach(opt => {
        console.log(`   • ${opt}`);
      });
      console.log('');
      console.log('💾 Estimated Savings:');
      console.log(`   • Images: ${report.estimatedSavings.images} KiB`);
      console.log(`   • JavaScript: ${report.estimatedSavings.javascript} KiB`);
      console.log(`   • CSS: ${report.estimatedSavings.css} KiB`);
      console.log(`   • Total: ${report.estimatedSavings.total} KiB`);
      console.log('');
      console.log('⏱️ Core Web Vitals:');
      if (report.coreWebVitals.fcp) {
        console.log(`   • FCP: ${Math.round(report.coreWebVitals.fcp)}ms (target: <1800ms)`);
      }
      if (report.coreWebVitals.lcp) {
        console.log(`   • LCP: ${Math.round(report.coreWebVitals.lcp)}ms (target: <2500ms)`);
      }
      if (report.coreWebVitals.cls !== null) {
        console.log(`   • CLS: ${report.coreWebVitals.cls?.toFixed(3)} (target: <0.1)`);
      }
      if (report.coreWebVitals.fid) {
        console.log(`   • FID: ${Math.round(report.coreWebVitals.fid)}ms (target: <100ms)`);
      }
      console.log('');
      console.log('🚀 Next Steps:');
      console.log('   1. Test on mobile device or Chrome DevTools mobile simulation');
      console.log('   2. Run Lighthouse mobile audit to verify improvements');
      console.log('   3. Check network tab for actual resource savings');
      console.log('==========================================');
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // This component doesn't render anything visible
  return null;
}