import compression from 'compression';
import { Request, Response, NextFunction } from 'express';

// Advanced compression middleware for mobile optimization
export const compressionMiddleware = compression({
  level: 9, // Maximum compression
  threshold: 1024, // Only compress files larger than 1KB
  filter: (req: Request, res: Response) => {
    // Don't compress if the request includes a cache-control directive to not transform
    if (req.headers['cache-control'] && req.headers['cache-control'].includes('no-transform')) {
      return false;
    }

    // Compress all text-based responses
    const contentType = res.getHeader('content-type') as string;
    if (contentType) {
      return /text|json|javascript|css|xml|svg/.test(contentType);
    }

    return compression.filter(req, res);
  }
});

// Brotli compression for modern browsers
export const brotliMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const acceptEncoding = req.headers['accept-encoding'] || '';
  
  if (acceptEncoding.includes('br')) {
    res.setHeader('Content-Encoding', 'br');
  } else if (acceptEncoding.includes('gzip')) {
    res.setHeader('Content-Encoding', 'gzip');
  }
  
  next();
};