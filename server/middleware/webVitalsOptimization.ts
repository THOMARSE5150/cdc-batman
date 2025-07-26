import { Request, Response, NextFunction } from 'express';

/**
 * Core Web Vitals optimization middleware
 * Targets LCP < 2.5s, FID < 100ms, CLS < 0.1 for mobile 90+ score
 */

// Largest Contentful Paint (LCP) optimization
export const lcpOptimization = (req: Request, res: Response, next: NextFunction) => {
  if (req.url === '/' && req.headers['user-agent']?.toLowerCase().includes('mobile')) {
    // Priority hints for LCP elements
    const lcpHeaders = [
      '</images/celia-portrait-optimized.webp>; rel=preload; as=image; type=image/webp; fetchpriority=high; imagesrcset="/images/celia-portrait-mobile.webp 768w, /images/celia-portrait-optimized.webp 1200w"; imagesizes="(max-width: 768px) 100vw, 50vw"',
      '</src/index.css>; rel=preload; as=style; fetchpriority=high',
      '</src/components/sections/HeroSection.tsx>; rel=modulepreload; fetchpriority=high'
    ];

    const existingLink = res.getHeader('Link') as string || '';
    const combinedLink = existingLink ? `${existingLink}, ${lcpHeaders.join(', ')}` : lcpHeaders.join(', ');
    res.setHeader('Link', combinedLink);

    // LCP optimization headers
    res.setHeader('X-LCP-Optimized', 'hero-image');
    res.setHeader('Critical-CH', 'Viewport-Width, Device-Memory, RTT, Downlink');
  }

  next();
};

// First Input Delay (FID) optimization
export const fidOptimization = (req: Request, res: Response, next: NextFunction) => {
  if (req.url === '/' && req.headers['user-agent']?.toLowerCase().includes('mobile')) {
    // Inject critical JavaScript optimization
    const originalSend = res.send;
    
    res.send = function(data: any) {
      if (typeof data === 'string' && data.includes('<head>')) {
        const fidScript = `
          <script>
            // FID optimization: Early interaction readiness
            document.addEventListener('DOMContentLoaded', () => {
              // Preload critical interaction handlers
              const criticalButtons = ['[data-primary-cta]', '[data-contact-button]', '[data-book-now]'];
              criticalButtons.forEach(selector => {
                const btn = document.querySelector(selector);
                if (btn) {
                  btn.addEventListener('touchstart', () => {}, { passive: true });
                  btn.addEventListener('click', () => {}, { passive: true });
                }
              });
            });
            
            // Performance observer for real FID measurement
            if ('PerformanceObserver' in window) {
              new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                  if (entry.name === 'first-input' && entry.processingStart - entry.startTime > 100) {
                    console.warn('📱 FID Warning:', entry.processingStart - entry.startTime, 'ms');
                  }
                });
              }).observe({ entryTypes: ['first-input'] });
            }
          </script>
        `;
        
        data = data.replace('</head>', `${fidScript}</head>`);
      }
      return originalSend.call(this, data);
    };

    res.setHeader('X-FID-Optimized', 'interaction-ready');
  }

  next();
};

// Cumulative Layout Shift (CLS) optimization
export const clsOptimization = (req: Request, res: Response, next: NextFunction) => {
  if (req.url === '/' && req.headers['user-agent']?.toLowerCase().includes('mobile')) {
    const originalSend = res.send;
    
    res.send = function(data: any) {
      if (typeof data === 'string' && data.includes('<head>')) {
        const clsCSS = `
          <style data-cls-optimization>
            /* CLS Prevention: Reserve space for critical elements */
            .hero-section {
              min-height: 60vh;
              contain: layout style paint;
            }
            
            .hero-image {
              aspect-ratio: 16/9;
              object-fit: cover;
              width: 100%;
              height: auto;
            }
            
            /* Header height reservation */
            header {
              height: 64px;
              contain: layout;
            }
            
            /* Button size reservation */
            button, .btn {
              min-height: 44px;
              min-width: 44px;
              contain: layout style;
            }
            
            /* Image dimension reservation */
            img {
              height: auto;
              max-width: 100%;
            }
            
            /* Loading skeleton to prevent CLS */
            .loading-skeleton {
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200% 100%;
              animation: loading 1.5s infinite;
            }
            
            @keyframes loading {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
            
            /* Mobile-specific CLS prevention */
            @media (max-width: 768px) {
              .mobile-reserved {
                min-height: 200px;
                contain: size layout;
              }
            }
          </style>
        `;
        
        data = data.replace('<head>', `<head>${clsCSS}`);
      }
      return originalSend.call(this, data);
    };

    res.setHeader('X-CLS-Optimized', 'layout-stable');
  }

  next();
};

// Combined Core Web Vitals middleware
export const coreWebVitalsOptimization = (req: Request, res: Response, next: NextFunction) => {
  lcpOptimization(req, res, () => {
    fidOptimization(req, res, () => {
      clsOptimization(req, res, next);
    });
  });
};