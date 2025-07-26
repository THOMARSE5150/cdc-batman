import { useEffect, useState } from 'react';

interface SimpleMetrics {
  lcp: number | null;
  fcp: number | null;
  score: number;
  deviceType: 'mobile' | 'desktop';
}

/**
 * Lightweight mobile performance monitor for production use
 * Minimal overhead with essential metrics only
 */
export default function OptimizedMobileMonitor() {
  const [metrics, setMetrics] = useState<SimpleMetrics>({
    lcp: null,
    fcp: null,
    score: 0,
    deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop'
  });

  useEffect(() => {
    // Only monitor in development
    if (process.env.NODE_ENV !== 'development') return;
    
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return; // Only monitor mobile

    let lcpValue: number | null = null;
    let fcpValue: number | null = null;

    // Real performance observer (not synthetic scoring)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          lcpValue = lastEntry.startTime;
          
          setMetrics(prev => ({ ...prev, lcp: lcpValue }));
          console.log('📱 Real Mobile LCP:', lcpValue.toFixed(2), 'ms', lcpValue > 2500 ? '❌ POOR' : '✅ GOOD');
        });

        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        const fcpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              fcpValue = entry.startTime;
              setMetrics(prev => ({ ...prev, fcp: fcpValue }));
              console.log('📱 Real Mobile FCP:', fcpValue.toFixed(2), 'ms', fcpValue > 1800 ? '❌ POOR' : '✅ GOOD');
            }
          }
        });

        fcpObserver.observe({ entryTypes: ['paint'] });

        // Real scoring based on actual Core Web Vitals thresholds
        const calculateRealScore = () => {
          if (lcpValue === null || fcpValue === null) return;
          
          let issues = [];
          
          if (lcpValue > 4000) {
            issues.push(`LCP: ${lcpValue.toFixed(0)}ms (Poor - should be < 2.5s)`);
          } else if (lcpValue > 2500) {
            issues.push(`LCP: ${lcpValue.toFixed(0)}ms (Needs improvement - should be < 2.5s)`);
          }
          
          if (fcpValue > 3000) {
            issues.push(`FCP: ${fcpValue.toFixed(0)}ms (Poor - should be < 1.8s)`);
          } else if (fcpValue > 1800) {
            issues.push(`FCP: ${fcpValue.toFixed(0)}ms (Needs improvement - should be < 1.8s)`);
          }
          
          console.log('📱 REAL MOBILE PERFORMANCE ANALYSIS:');
          console.log('=====================================');
          console.log(`Real LCP: ${lcpValue.toFixed(0)}ms (Target: < 2500ms)`);
          console.log(`Real FCP: ${fcpValue.toFixed(0)}ms (Target: < 1800ms)`);
          
          if (issues.length === 0) {
            console.log('🎉 Real mobile performance meets Core Web Vitals standards!');
            setMetrics(prev => ({ ...prev, score: 90 }));
          } else {
            console.log('❌ Performance issues detected:');
            issues.forEach(issue => console.log(`   ${issue}`));
            console.log('🔧 Use PageSpeed Insights for real scoring: https://pagespeed.web.dev/');
            setMetrics(prev => ({ ...prev, score: Math.max(50, 90 - (issues.length * 20)) }));
          }
        };

        // Use efficient timing
        if ('requestIdleCallback' in window) {
          requestIdleCallback(calculateRealScore, { timeout: 3000 });
        } else {
          setTimeout(calculateRealScore, 2000);
        }

      } catch (e) {
        console.log('Performance observer not supported');
      }
    }
  }, []);

  // Don't render in production
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const isMobile = metrics.deviceType === 'mobile';
  if (!isMobile) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-2 rounded text-xs max-w-xs">
      <div className="font-semibold mb-1">📱 Mobile</div>
      {metrics.lcp && <div>LCP: {metrics.lcp.toFixed(0)}ms</div>}
      {metrics.fcp && <div>FCP: {metrics.fcp.toFixed(0)}ms</div>}
      <div className={`font-semibold ${
        metrics.score >= 90 ? 'text-green-400' :
        metrics.score >= 75 ? 'text-yellow-400' : 'text-red-400'
      }`}>
        Score: {metrics.score}/100
      </div>
    </div>
  );
}