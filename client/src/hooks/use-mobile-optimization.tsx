import { useEffect, useState } from 'react';
import { useMobilePerformance } from './use-mobile-performance';

interface MobileOptimizationState {
  isOptimizationActive: boolean;
  performanceLevel: 'high' | 'medium' | 'low';
  optimizationApplied: string[];
}

/**
 * Hook for applying dynamic mobile optimizations based on device capabilities
 */
export function useMobileOptimization() {
  const [optimizationState, setOptimizationState] = useState<MobileOptimizationState>({
    isOptimizationActive: false,
    performanceLevel: 'high',
    optimizationApplied: []
  });

  const { 
    isMobile, 
    isSlowConnection, 
    deviceMemory, 
    connectionType, 
    prefersReducedMotion 
  } = useMobilePerformance();

  useEffect(() => {
    if (!isMobile) return;

    const applyOptimizations = () => {
      const optimizations: string[] = [];

      // Determine performance level
      let performanceLevel: 'high' | 'medium' | 'low' = 'high';
      
      if (deviceMemory < 4 || isSlowConnection) {
        performanceLevel = 'low';
      } else if (deviceMemory < 6 || connectionType === '3g') {
        performanceLevel = 'medium';
      }

      // Check if optimizations already applied
      if (document.querySelector('[data-mobile-optimizations]')) return;
      
      // Apply CSS optimizations based on performance level
      const optimizationCSS = document.createElement('style');
      optimizationCSS.setAttribute('data-mobile-optimizations', 'true');
      
      let cssContent = '';

      // Low performance optimizations
      if (performanceLevel === 'low') {
        cssContent += `
          /* Low performance device optimizations */
          * {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            filter: none !important;
            backdrop-filter: none !important;
          }
          
          .blur, .backdrop-blur {
            backdrop-filter: none !important;
          }
          
          .shadow, .drop-shadow {
            box-shadow: none !important;
            filter: none !important;
          }
          
          .gradient {
            background: solid !important;
          }
        `;
        optimizations.push('disable-animations', 'disable-effects', 'simplified-styling');
      }

      // Medium performance optimizations
      if (performanceLevel === 'medium') {
        cssContent += `
          /* Medium performance device optimizations */
          * {
            animation-duration: 0.15s !important;
            transition-duration: 0.15s !important;
          }
          
          .complex-animation {
            animation: simple-fade 0.15s ease !important;
          }
          
          @keyframes simple-fade {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `;
        optimizations.push('reduced-animations', 'simplified-effects');
      }

      // Slow connection optimizations
      if (isSlowConnection) {
        cssContent += `
          /* Slow connection optimizations */
          .non-critical-image {
            display: none !important;
          }
          
          .decorative-element {
            display: none !important;
          }
          
          .background-image {
            background-image: none !important;
          }
        `;
        optimizations.push('hide-non-critical-images', 'remove-decorative-elements');
      }

      // Reduced motion optimizations
      if (prefersReducedMotion) {
        cssContent += `
          /* Reduced motion preferences */
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        `;
        optimizations.push('respect-reduced-motion');
      }

      // Apply mobile-specific layout optimizations
      cssContent += `
        /* Mobile layout optimizations */
        @media (max-width: 768px) {
          .container {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          
          .grid-cols-2, .grid-cols-3, .grid-cols-4 {
            grid-template-columns: 1fr !important;
          }
          
          .flex-row {
            flex-direction: column !important;
          }
          
          .text-sm {
            font-size: 1rem !important;
          }
          
          .gap-8, .gap-6 {
            gap: 1rem !important;
          }
          
          .p-8, .p-6 {
            padding: 1rem !important;
          }
          
          .m-8, .m-6 {
            margin: 1rem !important;
          }
        }
      `;
      optimizations.push('mobile-layout-optimization');

      // Apply critical performance fixes
      cssContent += `
        /* Critical mobile performance fixes */
        @media (max-width: 768px) {
          /* Force hardware acceleration for critical elements */
          .header, .nav, .hero, .main {
            transform: translateZ(0);
            contain: layout style paint;
          }
          
          /* Optimize image rendering */
          img {
            image-rendering: auto;
            image-rendering: crisp-edges;
            image-rendering: -webkit-optimize-contrast;
          }
          
          /* Optimize scrolling */
          .scroll-container {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
          }
          
          /* Optimize form inputs */
          input, textarea, select {
            font-size: 16px !important;
            transform: translateZ(0);
          }
          
          /* Optimize button interactions */
          button, [role="button"] {
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
          }
        }
      `;
      optimizations.push('hardware-acceleration', 'touch-optimization');

      optimizationCSS.textContent = cssContent;
      document.head.appendChild(optimizationCSS);

      setOptimizationState({
        isOptimizationActive: true,
        performanceLevel,
        optimizationApplied: optimizations
      });

      console.log(`📱 Applied mobile optimizations for ${performanceLevel} performance device:`, optimizations);
    };

    applyOptimizations();

    // Cleanup function
    return () => {
      const optimizationStyles = document.querySelector('[data-mobile-optimizations]');
      if (optimizationStyles) {
        optimizationStyles.remove();
      }
    };
  }, [isMobile, isSlowConnection, deviceMemory, connectionType, prefersReducedMotion]);

  return optimizationState;
}

/**
 * Hook for optimizing images based on mobile performance
 */
export function useMobileImageOptimization() {
  const { isMobile, isSlowConnection, deviceMemory } = useMobilePerformance();

  const getOptimalImageSize = (originalSize: { width: number; height: number }) => {
    if (!isMobile) return originalSize;

    let scaleFactor = 1;

    // Scale down for mobile
    scaleFactor *= 0.75;

    // Scale down for slow connections
    if (isSlowConnection) {
      scaleFactor *= 0.6;
    }

    // Scale down for low memory devices
    if (deviceMemory < 4) {
      scaleFactor *= 0.8;
    }

    return {
      width: Math.round(originalSize.width * scaleFactor),
      height: Math.round(originalSize.height * scaleFactor)
    };
  };

  const getOptimalImageQuality = () => {
    if (!isMobile) return 85;

    if (isSlowConnection) return 60;
    if (deviceMemory < 4) return 70;
    return 75;
  };

  const shouldUseWebP = () => {
    // Check WebP support
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  return {
    getOptimalImageSize,
    getOptimalImageQuality,
    shouldUseWebP,
    shouldLazyLoad: !isSlowConnection // Disable lazy loading on very slow connections
  };
}