import { Request } from 'express';

/**
 * Advanced mobile device detection for performance optimization
 */

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLowEnd: boolean;
  browser: string;
  platform: string;
}

export function detectDevice(req: Request): DeviceInfo {
  const userAgent = req.headers['user-agent']?.toLowerCase() || '';
  
  // Mobile detection patterns
  const mobilePatterns = [
    /mobile/i, /android/i, /iphone/i, /ipad/i, /ipod/i,
    /blackberry/i, /windows phone/i, /webos/i, /opera mini/i
  ];
  
  const tabletPatterns = [
    /ipad/i, /android(?!.*mobile)/i, /tablet/i, /kindle/i, /silk/i
  ];
  
  const lowEndPatterns = [
    /android 4/i, /android 5/i, /windows phone/i, /opera mini/i
  ];
  
  const isMobile = mobilePatterns.some(pattern => pattern.test(userAgent));
  const isTablet = tabletPatterns.some(pattern => pattern.test(userAgent));
  const isLowEnd = lowEndPatterns.some(pattern => pattern.test(userAgent));
  
  // Browser detection
  let browser = 'unknown';
  if (userAgent.includes('chrome')) browser = 'chrome';
  else if (userAgent.includes('firefox')) browser = 'firefox';
  else if (userAgent.includes('safari')) browser = 'safari';
  else if (userAgent.includes('edge')) browser = 'edge';
  
  // Platform detection
  let platform = 'unknown';
  if (userAgent.includes('android')) platform = 'android';
  else if (userAgent.includes('iphone') || userAgent.includes('ipad')) platform = 'ios';
  else if (userAgent.includes('windows')) platform = 'windows';
  else if (userAgent.includes('mac')) platform = 'mac';
  
  return {
    isMobile: isMobile && !isTablet,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    isLowEnd,
    browser,
    platform
  };
}

export function getMobileOptimizationLevel(deviceInfo: DeviceInfo): 'high' | 'medium' | 'low' {
  if (deviceInfo.isLowEnd) return 'high';
  if (deviceInfo.isMobile) return 'medium';
  return 'low';
}

export function getCriticalResourcesForDevice(deviceInfo: DeviceInfo): string[] {
  const base = [
    '/images/header_logo.png',
    '/src/index.css'
  ];
  
  if (deviceInfo.isMobile) {
    return [
      ...base,
      '/images/celia-portrait-optimized.webp'
    ];
  }
  
  return base;
}