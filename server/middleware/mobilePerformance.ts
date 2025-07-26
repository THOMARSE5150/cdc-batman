import { Request, Response, NextFunction } from 'express';
import { detectDevice, getMobileOptimizationLevel, getCriticalResourcesForDevice } from '../utils/mobileDetection';

/**
 * Safari-compatible mobile performance optimization middleware
 * Focuses on critical resource prioritization without compression issues
 */

// Advanced mobile-first resource prioritization
export const mobileResourcePriority = (req: Request, res: Response, next: NextFunction) => {
  const deviceInfo = detectDevice(req);
  const optimizationLevel = getMobileOptimizationLevel(deviceInfo);

  if (deviceInfo.isMobile && req.url === '/') {
    const criticalResources = getCriticalResourcesForDevice(deviceInfo);
    
    // Build Link header for critical resources
    const linkHeaders = [
      ...criticalResources.map(resource => 
        resource.endsWith('.webp') 
          ? `<${resource}>; rel=preload; as=image; type=image/webp; fetchpriority=high`
          : `<${resource}>; rel=preload; as=${resource.endsWith('.css') ? 'style' : 'image'}; fetchpriority=high`
      ),
      '<https://fonts.googleapis.com>; rel=preconnect; crossorigin',
      '<https://fonts.gstatic.com>; rel=preconnect; crossorigin'
    ];

    res.setHeader('Link', linkHeaders.join(', '));

    // Advanced mobile performance headers
    res.setHeader('X-Mobile-Optimized', 'true');
    res.setHeader('X-Device-Type', deviceInfo.isMobile ? 'mobile' : 'desktop');
    res.setHeader('X-Optimization-Level', optimizationLevel);
    res.setHeader('X-Browser', deviceInfo.browser);
    res.setHeader('Timing-Allow-Origin', '*');
    
    // Performance hints for mobile browsers
    if (deviceInfo.browser === 'safari') {
      res.setHeader('X-WebKit-Optimized', 'true');
    }
  }

  next();
};

// Critical CSS injection for mobile
export const criticalMobileCSS = (req: Request, res: Response, next: NextFunction) => {
  if (req.url === '/' && req.headers['user-agent']?.toLowerCase().includes('mobile')) {
    const originalSend = res.send;
    
    res.send = function(data: any) {
      if (typeof data === 'string' && data.includes('<head>')) {
        const criticalCSS = `
          <style data-critical-mobile>
            /* Critical mobile-first styles for FCP optimization */
            body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
            .loading { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; }
            #root { min-height: 100vh; }
            .hero-section { background: linear-gradient(135deg, #4EB3A5 0%, #2A6B63 100%); min-height: 60vh; }
            .container { max-width: 100%; padding: 0 1rem; margin: 0 auto; }
            header { height: 64px; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); }
            @media (max-width: 768px) {
              .text-5xl { font-size: 2rem; }
              .text-xl { font-size: 1.125rem; }
              .p-8 { padding: 1.5rem; }
            }
          </style>
        `;
        
        data = data.replace('<head>', `<head>${criticalCSS}`);
      }
      return originalSend.call(this, data);
    };
  }
  
  next();
};

// Performance monitoring headers
export const performanceHeaders = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  
  // Set headers before response starts
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Response-Time-Start', startTime.toString());
  
  next();
};

// Mobile cache optimization
export const mobileCacheStrategy = (req: Request, res: Response, next: NextFunction) => {
  const isMobile = req.headers['user-agent']?.toLowerCase().includes('mobile');
  
  if (isMobile) {
    // Aggressive caching for mobile static assets
    if (req.url.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$/)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (req.url === '/') {
      res.setHeader('Cache-Control', 'public, max-age=300, must-revalidate');
    }
  }
  
  next();
};