import { useEffect, useState } from 'react';

interface MobilePerformanceData {
  isMobile: boolean;
  isSlowConnection: boolean;
  deviceMemory: number;
  connectionType: string;
  effectiveType: string;
  prefersReducedMotion: boolean;
  supportsTouchEvents: boolean;
  pixelRatio: number;
  viewportWidth: number;
  viewportHeight: number;
}

/**
 * Hook for mobile performance detection and optimization
 * Provides real-time mobile performance metrics for optimization decisions
 */
export function useMobilePerformance(): MobilePerformanceData {
  const [performanceData, setPerformanceData] = useState<MobilePerformanceData>({
    isMobile: false,
    isSlowConnection: false,
    deviceMemory: 4,
    connectionType: 'unknown',
    effectiveType: 'unknown',
    prefersReducedMotion: false,
    supportsTouchEvents: false,
    pixelRatio: 1,
    viewportWidth: 0,
    viewportHeight: 0
  });

  useEffect(() => {
    const updatePerformanceData = () => {
      const isMobile = window.innerWidth < 768;
      const connection = (navigator as any).connection;
      const effectiveType = connection?.effectiveType || 'unknown';
      const isSlowConnection = effectiveType === 'slow-2g' || effectiveType === '2g';
      
      setPerformanceData({
        isMobile,
        isSlowConnection,
        deviceMemory: (navigator as any).deviceMemory || 4,
        connectionType: connection?.type || 'unknown',
        effectiveType,
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        supportsTouchEvents: 'ontouchstart' in window,
        pixelRatio: window.devicePixelRatio || 1,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight
      });
    };

    // Initial update
    updatePerformanceData();

    // Update on resize and connection change
    window.addEventListener('resize', updatePerformanceData);
    
    if ((navigator as any).connection) {
      (navigator as any).connection.addEventListener('change', updatePerformanceData);
    }

    return () => {
      window.removeEventListener('resize', updatePerformanceData);
      if ((navigator as any).connection) {
        (navigator as any).connection.removeEventListener('change', updatePerformanceData);
      }
    };
  }, []);

  return performanceData;
}

/**
 * Hook for optimizing images based on mobile performance
 */
export function useMobileImageOptimization() {
  const performance = useMobilePerformance();
  
  const getOptimalImageSize = (originalWidth: number, originalHeight: number) => {
    const { isMobile, isSlowConnection, deviceMemory, pixelRatio } = performance;
    
    let scaleFactor = 1;
    
    // Scale down for mobile devices
    if (isMobile) {
      scaleFactor *= 0.75;
    }
    
    // Scale down for slow connections
    if (isSlowConnection) {
      scaleFactor *= 0.6;
    }
    
    // Scale down for low memory devices
    if (deviceMemory < 4) {
      scaleFactor *= 0.8;
    }
    
    // Account for pixel ratio but cap it for performance
    const adjustedPixelRatio = Math.min(pixelRatio, 2);
    scaleFactor *= adjustedPixelRatio;
    
    return {
      width: Math.round(originalWidth * scaleFactor),
      height: Math.round(originalHeight * scaleFactor),
      quality: isSlowConnection ? 60 : (deviceMemory < 4 ? 75 : 85)
    };
  };

  const shouldLazyLoad = () => {
    return !performance.isSlowConnection; // Disable lazy loading on very slow connections
  };

  const getImageFormat = () => {
    // Use WebP for modern browsers, JPEG for older ones
    const supportsWebP = (() => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    })();

    return supportsWebP ? 'webp' : 'jpeg';
  };

  return {
    getOptimalImageSize,
    shouldLazyLoad,
    getImageFormat,
    ...performance
  };
}

/**
 * Hook for mobile-specific animation optimization
 */
export function useMobileAnimations() {
  const { prefersReducedMotion, isSlowConnection, deviceMemory } = useMobilePerformance();
  
  const shouldReduceAnimations = prefersReducedMotion || isSlowConnection || deviceMemory < 4;
  
  const getAnimationDuration = (defaultDuration: number) => {
    if (shouldReduceAnimations) {
      return Math.min(defaultDuration * 0.5, 200); // Cap at 200ms for reduced motion
    }
    return defaultDuration;
  };

  const getAnimationEasing = () => {
    return shouldReduceAnimations ? 'ease' : 'cubic-bezier(0.4, 0.0, 0.2, 1)';
  };

  return {
    shouldReduceAnimations,
    getAnimationDuration,
    getAnimationEasing
  };
}