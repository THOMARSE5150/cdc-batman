/**
 * Performance optimization utilities
 */

interface PerformanceSettings {
  isLowEndDevice: boolean;
  prefersReducedMotion: boolean;
  connectionType: string;
  deviceMemory: number;
}

export function getPerformanceSettings(): PerformanceSettings {
  // Default settings for server-side rendering or unsupported browsers
  const defaults: PerformanceSettings = {
    isLowEndDevice: false,
    prefersReducedMotion: false,
    connectionType: 'unknown',
    deviceMemory: 4
  };

  if (typeof window === 'undefined') {
    return defaults;
  }

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false;

  // Detect low-end devices
  const deviceMemory = (navigator as any).deviceMemory || 4;
  const connectionType = (navigator as any).connection?.effectiveType || 'unknown';
  
  // Consider a device low-end if it has less than 4GB RAM or slow connection
  const isLowEndDevice = deviceMemory < 4 || connectionType === 'slow-2g' || connectionType === '2g';

  return {
    isLowEndDevice,
    prefersReducedMotion,
    connectionType,
    deviceMemory
  };
}

export function shouldUseOptimizedImages(): boolean {
  const settings = getPerformanceSettings();
  return settings.isLowEndDevice || settings.connectionType === 'slow-2g' || settings.connectionType === '2g';
}

export function getOptimalImageQuality(): number {
  const settings = getPerformanceSettings();
  
  if (settings.isLowEndDevice) {
    return 60; // Lower quality for performance
  }
  
  if (settings.connectionType === 'slow-2g' || settings.connectionType === '2g') {
    return 50; // Very low quality for slow connections
  }
  
  return 80; // Standard quality
}