import { useEffect } from 'react';
import { getPerformanceSettings } from '@/lib/performance';

/**
 * Performance optimization component for better Core Web Vitals
 */
export default function PerformanceOptimizer() {
  useEffect(() => {
    const settings = getPerformanceSettings();

    // Reduce animations for users who prefer reduced motion
    if (settings.prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0s');
      document.documentElement.style.setProperty('--transition-duration', '0s');
    }

    // Optimize for low-end devices
    if (settings.isLowEndDevice) {
      // Reduce complex animations and effects
      document.documentElement.classList.add('low-performance-mode');
    }

    // Preconnect to external domains for faster loading
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://storage.googleapis.com' // For the Google Maps iframe
    ];

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // DNS prefetch for external resources
    const dnsPrefetchDomains = [
      'https://maps.googleapis.com'
    ];

    dnsPrefetchDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

  }, []);

  return null;
}