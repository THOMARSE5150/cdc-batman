/**
 * Real-time mobile performance monitoring for Celia Dunsmore Counselling
 * Measures actual Core Web Vitals and sends to backend for analysis
 */

interface CoreWebVitals {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  fcp: number | null;
}

class MobilePerformanceMonitor {
  private vitals: CoreWebVitals = { lcp: null, fid: null, cls: null, fcp: null };
  private isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  constructor() {
    if (this.isMobile && 'PerformanceObserver' in window) {
      this.initializeObservers();
      this.measureFCP();
    }
  }

  private initializeObservers() {
    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
        this.vitals.lcp = lastEntry.startTime;
        
        if (this.vitals.lcp > 2500) {
          console.warn('📱 LCP Warning:', this.vitals.lcp.toFixed(2), 'ms (target: <2.5s)');
        } else {
          console.log('📱 LCP Good:', this.vitals.lcp.toFixed(2), 'ms');
        }
        
        this.sendVitalsIfComplete();
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.log('LCP observer not supported');
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fidEntry = entry as PerformanceEntry & { processingStart: number; startTime: number };
          this.vitals.fid = fidEntry.processingStart - fidEntry.startTime;
          
          if (this.vitals.fid > 100) {
            console.warn('📱 FID Warning:', this.vitals.fid.toFixed(2), 'ms (target: <100ms)');
          } else {
            console.log('📱 FID Good:', this.vitals.fid.toFixed(2), 'ms');
          }
          
          this.sendVitalsIfComplete();
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.log('FID observer not supported');
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const clsEntry = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
          if (!clsEntry.hadRecentInput) {
            clsValue += clsEntry.value;
          }
        }
        
        this.vitals.cls = clsValue;
        
        if (this.vitals.cls > 0.1) {
          console.warn('📱 CLS Warning:', this.vitals.cls.toFixed(3), '(target: <0.1)');
        } else {
          console.log('📱 CLS Good:', this.vitals.cls.toFixed(3));
        }
        
        this.sendVitalsIfComplete();
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.log('CLS observer not supported');
    }
  }

  private measureFCP() {
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.vitals.fcp = entry.startTime;
            
            if (this.vitals.fcp > 1800) {
              console.warn('📱 FCP Warning:', this.vitals.fcp.toFixed(2), 'ms (target: <1.8s)');
            } else {
              console.log('📱 FCP Good:', this.vitals.fcp.toFixed(2), 'ms');
            }
            
            this.sendVitalsIfComplete();
          }
        }
      });
      fcpObserver.observe({ entryTypes: ['navigation', 'paint'] });
    } catch (e) {
      console.log('FCP observer not supported');
    }
  }

  private sendVitalsIfComplete() {
    // Send vitals after we have LCP and FCP (most important for mobile score)
    if (this.vitals.lcp !== null && this.vitals.fcp !== null) {
      this.sendVitals();
    }
  }

  private async sendVitals() {
    if (!this.isMobile) return;

    try {
      const response = await fetch('/api/performance/vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...this.vitals,
          deviceType: 'mobile',
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          viewport: `${window.innerWidth}x${window.innerHeight}`,
          connection: (navigator as any).connection?.effectiveType || 'unknown'
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('📱 Performance Score:', result.score, '/100');
        
        if (result.issues?.length > 0) {
          console.warn('📱 Performance Issues:', result.issues);
        }
      }
    } catch (error) {
      console.log('Could not send performance metrics:', error);
    }
  }

  // Public method to get current vitals
  public getVitals(): CoreWebVitals {
    return { ...this.vitals };
  }

  // Calculate estimated performance score
  public calculateScore(): number {
    let score = 100;
    
    if (this.vitals.lcp && this.vitals.lcp > 2500) score -= 25;
    if (this.vitals.fid && this.vitals.fid > 100) score -= 20;
    if (this.vitals.cls && this.vitals.cls > 0.1) score -= 20;
    if (this.vitals.fcp && this.vitals.fcp > 1800) score -= 15;
    
    return Math.max(0, score);
  }
}

// Initialize monitor for mobile devices only
let performanceMonitor: MobilePerformanceMonitor | null = null;

export function initializeMobilePerformanceMonitor(): MobilePerformanceMonitor | null {
  if (typeof window === 'undefined') return null;
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile && !performanceMonitor) {
    performanceMonitor = new MobilePerformanceMonitor();
    console.log('📱 Mobile performance monitoring initialized');
  }
  
  return performanceMonitor;
}

export function getMobilePerformanceMonitor(): MobilePerformanceMonitor | null {
  return performanceMonitor;
}

// Auto-initialize on import for mobile devices
if (typeof window !== 'undefined') {
  initializeMobilePerformanceMonitor();
}