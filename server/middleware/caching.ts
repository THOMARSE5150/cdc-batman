import { Request, Response, NextFunction } from 'express';

// Aggressive caching strategy for mobile performance
export const staticCacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const url = req.url;
  
  // Cache static assets aggressively
  if (url.match(/\.(js|css|png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|eot)$/)) {
    // Cache for 1 year
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('Expires', new Date(Date.now() + 31536000 * 1000).toUTCString());
  }
  
  // Cache HTML with shorter duration but enable revalidation
  else if (url.endsWith('.html') || url === '/' || !url.includes('.')) {
    res.setHeader('Cache-Control', 'public, max-age=300, must-revalidate');
    res.setHeader('ETag', `"${Date.now()}"`);
  }
  
  // Add mobile-specific optimizations
  if (req.headers['user-agent']?.toLowerCase().includes('mobile')) {
    res.setHeader('Vary', 'User-Agent');
    res.setHeader('X-Mobile-Optimized', 'true');
  }
  
  next();
};

// Service Worker cache headers
export const serviceWorkerCacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.url === '/sw.js' || req.url.includes('service-worker')) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Service-Worker-Allowed', '/');
  }
  next();
};