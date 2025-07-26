import { Request, Response, NextFunction } from 'express';

// Mobile-first optimization middleware
export const mobileFirstOptimization = (req: Request, res: Response, next: NextFunction) => {
  const userAgent = req.headers['user-agent']?.toLowerCase() || '';
  const isMobile = /mobile|android|iphone|ipad|ipod|blackberry|windows phone/.test(userAgent);
  
  if (isMobile) {
    // Critical mobile optimization headers
    res.setHeader('X-Mobile-Optimized', 'true');
    res.setHeader('Viewport-Fit', 'cover');
    
    // DNS prefetch for critical resources
    const dnsPrefetchHints = [
      '<https://fonts.googleapis.com>; rel=dns-prefetch',
      '<https://www.googletagmanager.com>; rel=dns-prefetch',
      '<https://fonts.gstatic.com>; rel=preconnect; crossorigin'
    ];
    
    // Resource hints for mobile performance
    if (req.url === '/' || req.url === '/index.html') {
      const resourceHints = [
        ...dnsPrefetchHints,
        '</images/header_logo.png>; rel=preload; as=image; fetchpriority=high',
        '</images/hero_image_canva_optimized.webp>; rel=preload; as=image; type=image/webp; fetchpriority=high',
        '</src/index.css>; rel=preload; as=style'
      ];
      
      res.setHeader('Link', resourceHints.join(', '));
    }
    
    // Mobile-specific performance headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  }
  
  next();
};

// Critical resource prioritization
export const criticalResourcePriority = (req: Request, res: Response, next: NextFunction) => {
  const url = req.url;
  
  // Prioritize critical resources for mobile
  if (url.includes('index.css') || url.includes('header_logo') || url.includes('hero_image')) {
    res.setHeader('Priority', 'high');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // Lower priority for non-critical resources
  if (url.includes('footer') || url.includes('testimonial') || url.includes('background')) {
    res.setHeader('Priority', 'low');
    res.setHeader('Cache-Control', 'public, max-age=2592000'); // 30 days
  }
  
  next();
};