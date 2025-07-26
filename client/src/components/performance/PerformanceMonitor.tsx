import { useEffect } from 'react';

/**
 * Performance Monitor - Real-time performance tracking and optimization
 * Monitors Core Web Vitals and applies dynamic optimizations
 */
export default function PerformanceMonitor() {
  useEffect(() => {
    // Skip if already monitoring
    if (document.querySelector('[data-performance-monitoring]')) return;

    const isMobile = window.innerWidth <= 768;
    
    console.log(`📊 Performance Monitor: ${isMobile ? 'Mobile' : 'Desktop'} tracking active`);

    const performanceTracking = {
      // 1. Track Core Web Vitals
      trackCoreWebVitals: () => {
        // Track LCP (Largest Contentful Paint)
        if ('PerformanceObserver' in window) {
          try {
            const lcpObserver = new PerformanceObserver((entryList) => {
              const lcpEntries = entryList.getEntries();
              const lastLCP = lcpEntries[lcpEntries.length - 1];
              
              if (lastLCP) {
                const lcpTime = lastLCP.startTime;
                console.log(`📊 LCP: ${lcpTime.toFixed(2)}ms`);
                
                // Alert if LCP is too slow
                if (lcpTime > 2500) {
                  console.warn(`🐌 LCP Warning: ${lcpTime.toFixed(2)}ms (target: <2.5s)`);
                  // Apply emergency optimizations
                  performanceTracking.applyEmergencyOptimizations();
                }
              }
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // Track FID (First Input Delay)
            const fidObserver = new PerformanceObserver((entryList) => {
              const fidEntries = entryList.getEntries();
              fidEntries.forEach(entry => {
                const fidTime = entry.processingStart - entry.startTime;
                console.log(`📊 FID: ${fidTime.toFixed(2)}ms`);
                
                if (fidTime > 100) {
                  console.warn(`🐌 FID Warning: ${fidTime.toFixed(2)}ms (target: <100ms)`);
                }
              });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });

            // Track CLS (Cumulative Layout Shift)
            const clsObserver = new PerformanceObserver((entryList) => {
              let clsScore = 0;
              entryList.getEntries().forEach(entry => {
                if (!entry.hadRecentInput) {
                  clsScore += entry.value;
                }
              });
              
              if (clsScore > 0.1) {
                console.warn(`📊 CLS Warning: ${clsScore.toFixed(3)} (target: <0.1)`);
              }
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });

          } catch (error) {
            console.log('📊 Performance Observer not fully supported:', error);
          }
        }
      },

      // 2. Track FCP (First Contentful Paint)
      trackFCP: () => {
        if ('PerformanceObserver' in window) {
          try {
            const fcpObserver = new PerformanceObserver((entryList) => {
              const fcpEntries = entryList.getEntries();
              fcpEntries.forEach(entry => {
                const fcpTime = entry.startTime;
                console.log(`📊 FCP: ${fcpTime.toFixed(2)}ms`);
                
                if (fcpTime > 1800) {
                  console.warn(`📱 FCP Warning: ${fcpTime.toFixed(2)}ms (target: <1.8s)`);
                }
              });
            });
            fcpObserver.observe({ entryTypes: ['paint'] });
          } catch (error) {
            console.log('📊 FCP tracking failed:', error);
          }
        }
      },

      // 3. Monitor resource loading
      trackResourcePerformance: () => {
        if ('PerformanceObserver' in window) {
          const resourceObserver = new PerformanceObserver((entryList) => {
            entryList.getEntries().forEach(entry => {
              const resource = entry as PerformanceResourceTiming;
              
              // Flag slow resources
              if (resource.duration > 1000) {
                console.warn(`🐌 Slow resource: ${resource.name} (${resource.duration.toFixed(2)}ms)`);
              }
              
              // Track critical resource timing
              if (resource.name.includes('hero') || 
                  resource.name.includes('logo') || 
                  resource.name.includes('critical')) {
                console.log(`📊 Critical resource: ${resource.name} loaded in ${resource.duration.toFixed(2)}ms`);
              }
            });
          });
          resourceObserver.observe({ entryTypes: ['resource'] });
        }
      },

      // 4. Apply emergency optimizations when performance is poor (no visual changes)
      applyEmergencyOptimizations: () => {
        console.log('🚨 Applying emergency performance optimizations (design preserved)');
        
        // Only apply performance optimizations, don't change visual design
        const emergencyCSS = document.createElement('style');
        emergencyCSS.setAttribute('data-emergency-optimizations', 'true');
        emergencyCSS.textContent = `
          /* Emergency performance optimizations - design preserved */
          img {
            image-rendering: auto;
            decoding: async;
          }
          
          /* Optimize font rendering */
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `;
        document.head.appendChild(emergencyCSS);
        
        // Defer non-critical scripts only
        document.querySelectorAll('script[src]').forEach(script => {
          const src = script.getAttribute('src') || '';
          if (src.includes('analytics') || src.includes('gtag') || src.includes('facebook')) {
            script.setAttribute('defer', 'true');
          }
        });
      },

      // 5. Dynamic performance adjustments
      applyDynamicOptimizations: () => {
        // Monitor connection speed
        if ('connection' in navigator) {
          const connection = (navigator as any).connection;
          
          if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            console.log('🐌 Slow connection detected - applying performance optimizations (design preserved)');
            
            // Only defer loading of non-critical images, don't hide them
            document.querySelectorAll('img').forEach(img => {
              const src = img.getAttribute('src') || '';
              if (!src.includes('logo') && !src.includes('hero') && !src.includes('critical')) {
                img.setAttribute('loading', 'lazy');
                img.setAttribute('decoding', 'async');
              }
            });
          }
        }
        
        // Monitor battery status
        if ('getBattery' in navigator) {
          (navigator as any).getBattery().then((battery: any) => {
            if (battery.level < 0.2) {
              console.log('🔋 Low battery detected - reducing animations');
              document.documentElement.style.setProperty('--animation-duration', '0s');
            }
          });
        }
      },

      // 6. Performance reporting
      reportPerformance: () => {
        // Send performance data to service worker for caching decisions
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
          const perfData = {
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            connection: (navigator as any).connection?.effectiveType || 'unknown',
            memory: (performance as any).memory ? {
              used: (performance as any).memory.usedJSHeapSize,
              total: (performance as any).memory.totalJSHeapSize,
              limit: (performance as any).memory.jsHeapSizeLimit
            } : null
          };
          
          navigator.serviceWorker.controller.postMessage({
            type: 'PERFORMANCE_LOG',
            data: perfData
          });
        }
      }
    };

    // Initialize all tracking
    performanceTracking.trackCoreWebVitals();
    performanceTracking.trackFCP();
    performanceTracking.trackResourcePerformance();
    performanceTracking.applyDynamicOptimizations();
    
    // Report performance periodically
    setInterval(performanceTracking.reportPerformance, 30000);

    // Mark as monitoring
    document.documentElement.setAttribute('data-performance-monitoring', 'true');
    console.log('📊 Performance monitoring initialized');

  }, []);

  return null;
}