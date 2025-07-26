/**
 * Performance optimizations for improving page load times
 */

// Track if this is the first page load
let isFirstLoad = true;

// Get a simplified animation based on device performance 
export function getPerformanceSettings() {
  const isInitialLoad = isFirstLoad;
  isFirstLoad = false;
  
  const isLowEndDevice = checkIfLowEndDevice();
  const isMobileDevice = window.innerWidth < 768;
  const useSimplifiedAnimations = isInitialLoad || isLowEndDevice || isMobileDevice;
  
  return {
    isInitialLoad,
    isLowEndDevice,
    isMobileDevice,
    useSimplifiedAnimations,
    animationDuration: useSimplifiedAnimations ? 0.2 : 0.4,
    enableParallax: !isLowEndDevice && !isMobileDevice,
    useLightShadows: isLowEndDevice || isMobileDevice,
    enableIntersectionAnimations: !isLowEndDevice && !isMobileDevice,
    useProgressiveLoading: true,
    useReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    imageSizes: {
      thumbnail: isMobileDevice ? 320 : 480,
      preview: isMobileDevice ? 480 : 720,
      full: isMobileDevice ? 720 : 1080
    }
  };
}

// Add mobile optimization utilities
export const mobileOptimizations = {
  useFastDom: true,
  deferNonCritical: true,
  optimizeImages: true,
  minifyResponses: true,
  cacheStrategy: 'network-first',
  compression: true
};

// Function to check if the device is low-end
function checkIfLowEndDevice(): boolean {
  // Check available deviceMemory (only available in some browsers)
  if ('deviceMemory' in navigator) {
    const memory = (navigator as any).deviceMemory;
    if (memory && memory < 4) {
      return true;
    }
  }
  
  // Check hardware concurrency (number of CPU cores)
  if ('hardwareConcurrency' in navigator) {
    if (navigator.hardwareConcurrency < 4) {
      return true;
    }
  }
  
  // Check if connection is slow
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection && 
        (connection.effectiveType === 'slow-2g' || 
         connection.effectiveType === '2g' ||
         connection.saveData)) {
      return true;
    }
  }
  
  // Use a combination of factors if the above APIs aren't available
  const userAgent = navigator.userAgent;
  
  // Check for older mobile devices
  if (/Android.*Mobile|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    // Additional checks for older devices could be added here
    // This is a simplistic check
    if (/Android 4|Android 5|OS 9_|OS 10_|OS 11_/i.test(userAgent)) {
      return true;
    }
  }
  
  return false;
}