import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';

// Image optimization middleware for mobile performance
export const imageOptimizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const url = req.url;
  
  // Only process image requests
  if (!url.match(/\.(png|jpg|jpeg|webp|svg)$/)) {
    return next();
  }
  
  const userAgent = req.headers['user-agent']?.toLowerCase() || '';
  const isMobile = /mobile|android|iphone|ipad|ipod|blackberry|windows phone/.test(userAgent);
  const supportsWebP = req.headers.accept?.includes('image/webp');
  
  if (isMobile && supportsWebP) {
    // Try to serve WebP version for mobile devices
    const webpPath = url.replace(/\.(png|jpg|jpeg)$/, '.webp');
    const fullWebpPath = path.join(process.cwd(), 'public', webpPath);
    
    if (fs.existsSync(fullWebpPath)) {
      req.url = webpPath;
      res.setHeader('Content-Type', 'image/webp');
      res.setHeader('Vary', 'Accept');
    }
  }
  
  // Set aggressive caching for images
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.setHeader('Expires', new Date(Date.now() + 31536000 * 1000).toUTCString());
  
  next();
};

// Image preloading headers for critical images
export const criticalImageHeaders = (req: Request, res: Response, next: NextFunction) => {
  if (req.url === '/' || req.url === '/index.html') {
    const preloadHeaders = [
      '</images/header_logo.png>; rel=preload; as=image; fetchpriority=high',
      '</images/celia-portrait-optimized.webp>; rel=preload; as=image; type=image/webp; fetchpriority=high'
    ];
    
    res.setHeader('Link', preloadHeaders.join(', '));
  }
  
  next();
};