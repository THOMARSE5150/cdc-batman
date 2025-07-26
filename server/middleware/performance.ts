import { Request, Response, NextFunction } from 'express';

// Performance monitoring and optimization middleware
export const performanceMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  
  // Add performance headers early to avoid conflicts
  res.setHeader('X-Response-Time-Start', startTime.toString());
  
  // Override res.end to add performance metrics
  const originalEnd = res.end;
  res.end = function(chunk?: any, encoding?: BufferEncoding | (() => void), cb?: () => void) {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    // Only set headers if they haven't been sent yet
    if (!res.headersSent) {
      try {
        res.setHeader('X-Response-Time', `${responseTime}ms`);
        res.setHeader('Server-Timing', `total;dur=${responseTime}`);
      } catch (err) {
        // Headers already sent, just log the performance
        console.log(`📊 Performance: ${req.method} ${req.url} - ${responseTime}ms`);
      }
    }
    
    // Log slow requests for monitoring
    if (responseTime > 1000) {
      console.log(`🐌 Slow request: ${req.method} ${req.url} - ${responseTime}ms`);
    }
    
    return originalEnd.call(this, chunk, encoding as BufferEncoding, cb);
  };
  
  next();
};

// Mobile-specific optimization headers
export const mobileOptimizationHeaders = (req: Request, res: Response, next: NextFunction) => {
  const userAgent = req.headers['user-agent']?.toLowerCase() || '';
  const isMobile = /mobile|android|iphone|ipad|ipod|blackberry|windows phone/.test(userAgent);
  
  if (isMobile) {
    // DNS prefetch hints for mobile
    res.setHeader('Link', [
      '</images/header_logo.png>; rel=preload; as=image',
      '</images/celia-portrait-optimized.webp>; rel=preload; as=image; type=image/webp',
      '<https://fonts.googleapis.com>; rel=dns-prefetch',
      '<https://www.googletagmanager.com>; rel=dns-prefetch'
    ].join(', '));
    
    // Mobile-specific headers
    res.setHeader('X-UA-Compatible', 'IE=edge');
    res.setHeader('X-Mobile-Device', 'true');
  }
  
  next();
};