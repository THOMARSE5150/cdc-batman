import { useEffect } from "react";

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const metrics: PerformanceMetrics = {};
        
        // Largest Contentful Paint
        if (entry.entryType === 'largest-contentful-paint') {
          metrics.lcp = entry.startTime;
        }
        
        // First Input Delay
        if (entry.entryType === 'first-input') {
          metrics.fid = (entry as any).processingStart - entry.startTime;
        }
        
        // Cumulative Layout Shift
        if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
          metrics.cls = (entry as any).value;
        }
        
        // First Contentful Paint
        if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
          metrics.fcp = entry.startTime;
        }
        
        // Log metrics for monitoring (in production, send to analytics)
        if (process.env.NODE_ENV === 'development') {
          console.log('Performance Metrics:', metrics);
        }
      }
    });

    // Observe relevant performance entries
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift', 'paint'] });

    // Monitor page load times
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const metrics: PerformanceMetrics = {
        ttfb: navigation.responseStart - navigation.requestStart,
      };
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Page Load Metrics:', metrics);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}