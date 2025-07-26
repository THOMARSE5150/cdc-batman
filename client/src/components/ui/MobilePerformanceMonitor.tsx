import { useEffect, useState } from 'react';
import { useMobilePerformance } from '@/hooks/use-mobile-performance';

interface PerformanceMetrics {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  connectionType: string;
  performanceScore: number;
}

/**
 * Real-time mobile performance monitoring for optimization insights
 * Tracks Core Web Vitals specifically for mobile devices
 */
export default function MobilePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    deviceType: 'desktop',
    connectionType: 'unknown',
    performanceScore: 0
  });

  const { isMobile, connectionType, isSlowConnection } = useMobilePerformance();

  useEffect(() => {
    // Only monitor in development mode
    if (process.env.NODE_ENV !== 'development') return;

    let clsValue = 0;
    let clsEntries: any[] = [];

    // Determine device type
    const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
      const width = window.innerWidth;
      if (width < 768) return 'mobile';
      if (width < 1024) return 'tablet';
      return 'desktop';
    };

    const deviceType = getDeviceType();

    // Performance Observer for Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        
        setMetrics(prev => ({
          ...prev,
          lcp: lastEntry.startTime,
          deviceType,
          connectionType
        }));

        console.log('📱 Mobile LCP:', lastEntry.startTime.toFixed(2), 'ms');
      });

      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.log('LCP observer not supported');
      }

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fid = (entry as any).processingStart - entry.startTime;
          
          setMetrics(prev => ({
            ...prev,
            fid
          }));

          console.log('📱 Mobile FID:', fid.toFixed(2), 'ms');
        }
      });

      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.log('FID observer not supported');
      }

      // Cumulative Layout Shift (CLS)
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsEntries.push(entry);
            clsValue += (entry as any).value;
          }
        }

        setMetrics(prev => ({
          ...prev,
          cls: clsValue
        }));

        console.log('📱 Mobile CLS:', clsValue.toFixed(4));
      });

      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.log('CLS observer not supported');
      }

      // First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({
              ...prev,
              fcp: entry.startTime
            }));

            console.log('📱 Mobile FCP:', entry.startTime.toFixed(2), 'ms');
          }
        }
      });

      try {
        fcpObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.log('FCP observer not supported');
      }

      // Navigation timing for TTFB
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const navEntry = navigationEntries[0];
        const ttfb = navEntry.responseStart - navEntry.requestStart;
        
        setMetrics(prev => ({
          ...prev,
          ttfb
        }));

        console.log('📱 Mobile TTFB:', ttfb.toFixed(2), 'ms');
      }
    }

    // Calculate performance score efficiently with requestIdleCallback
    const calculatePerformanceScore = () => {
      const callback = () => {
        setMetrics(prev => {
          const { lcp, fid, cls, fcp, ttfb } = prev;
          
          let score = 100;
          
          // LCP scoring (mobile thresholds)
          if (lcp !== null) {
            if (lcp > 4000) score -= 30;
            else if (lcp > 2500) score -= 15;
          }
          
          // FID scoring (mobile thresholds) 
          if (fid !== null) {
            if (fid > 300) score -= 25;
            else if (fid > 100) score -= 10;
          }
          
          // CLS scoring (mobile thresholds)
          if (cls !== null) {
            if (cls > 0.25) score -= 25;
            else if (cls > 0.1) score -= 10;
          }
          
          // FCP scoring (mobile thresholds)
          if (fcp !== null) {
            if (fcp > 3000) score -= 15;
            else if (fcp > 1800) score -= 8;
          }
          
          // TTFB scoring (mobile thresholds)
          if (ttfb !== null) {
            if (ttfb > 800) score -= 15;
            else if (ttfb > 600) score -= 8;
          }
          
          // Connection penalty
          if (isSlowConnection) {
            score = Math.max(score - 10, 0);
          }
          
          return {
            ...prev,
            performanceScore: Math.max(score, 0)
          };
        });
      };
      
      // Use requestIdleCallback for better performance, fallback to timeout
      if ('requestIdleCallback' in window) {
        requestIdleCallback(callback, { timeout: 2000 });
      } else {
        setTimeout(callback, 1500);
      }
    };

    calculatePerformanceScore();

    // Mobile-specific performance recommendations (only in dev mode)
    if (isMobile && process.env.NODE_ENV === 'development') {
      const logRecommendations = () => {
        console.log('📱 MOBILE PERFORMANCE AUDIT RESULTS:');
        console.log('=====================================');
        console.log(`📊 Overall Mobile Score: ${metrics.performanceScore}/100`);
        
        if (metrics.performanceScore >= 95) {
          console.log('🎉 Excellent mobile performance!');
        } else if (metrics.performanceScore >= 80) {
          console.log('✅ Good mobile performance');
        } else {
          console.log('❌ Mobile performance needs improvement');
        }
      };
      
      // Use requestIdleCallback for logging
      if ('requestIdleCallback' in window) {
        requestIdleCallback(logRecommendations, { timeout: 3000 });
      } else {
        setTimeout(logRecommendations, 2000);
      }
    }

  }, [isMobile, connectionType, isSlowConnection]);

  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-3 rounded-lg text-xs max-w-xs mobile-performance-monitor">
      <div className="font-semibold mb-2">📱 Mobile Performance</div>
      <div className="space-y-1">
        <div>Device: {metrics.deviceType}</div>
        <div>Connection: {connectionType}</div>
        {metrics.lcp && <div>LCP: {metrics.lcp.toFixed(0)}ms</div>}
        {metrics.fid && <div>FID: {metrics.fid.toFixed(0)}ms</div>}
        {metrics.cls && <div>CLS: {metrics.cls.toFixed(3)}</div>}
        <div className={`font-semibold ${
          metrics.performanceScore >= 95 ? 'text-green-400' :
          metrics.performanceScore >= 80 ? 'text-yellow-400' : 'text-red-400'
        }`}>
          Score: {metrics.performanceScore}/100
        </div>
      </div>
    </div>
  );
}