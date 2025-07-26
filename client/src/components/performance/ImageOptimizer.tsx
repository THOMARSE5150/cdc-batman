import { useEffect } from 'react';

/**
 * Image Optimizer - Targets LCP and image delivery improvements
 * Addresses "Improve image delivery" warning from PageSpeed insights
 */
export default function ImageOptimizer() {
  useEffect(() => {
    // Skip if already optimized
    if (document.querySelector('[data-images-optimized]')) return;

    const isMobile = window.innerWidth <= 768;
    
    console.log(`🖼️ Image Optimizer: ${isMobile ? 'Mobile' : 'Desktop'} mode`);

    const imageOptimizations = {
      // 1. Optimize critical LCP images immediately
      optimizeLCPImages: () => {
        // Critical images that affect LCP
        const lcpImageSources = [
          '/images/celia-portrait-optimized.webp',
          '/images/hero_image_canva_optimized.webp',
          '/assets/celia-logo-new.png',
          '/images/header_logo.png'
        ];

        lcpImageSources.forEach((src, index) => {
          // High priority preload
          const preload = document.createElement('link');
          preload.rel = 'preload';
          preload.href = src;
          preload.as = 'image';
          preload.setAttribute('fetchpriority', 'high');
          
          if (src.includes('.webp')) {
            preload.type = 'image/webp';
          }
          
          // Insert immediately for critical path
          document.head.insertBefore(preload, document.head.firstChild);
        });

        // Also add WebP format hints
        const webpSupport = document.createElement('meta');
        webpSupport.httpEquiv = 'Accept-CH';
        webpSupport.content = 'DPR, Viewport-Width, Width';
        document.head.appendChild(webpSupport);
      },

      // 2. Apply lazy loading to non-critical images
      implementLazyLoading: () => {
        // Use intersection observer for better performance
        if ('IntersectionObserver' in window) {
          const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                if (img.dataset.src) {
                  img.src = img.dataset.src;
                  img.removeAttribute('data-src');
                }
                if (img.dataset.srcset) {
                  img.srcset = img.dataset.srcset;
                  img.removeAttribute('data-srcset');
                }
                observer.unobserve(img);
              }
            });
          }, {
            rootMargin: '50px 0px',
            threshold: 0.01
          });

          // Apply to all images except critical ones
          setTimeout(() => {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
              const src = img.getAttribute('src') || '';
              const isLCP = src.includes('hero') || 
                           src.includes('celia-portrait') || 
                           src.includes('logo');
              
              if (!isLCP && src) {
                img.setAttribute('data-src', src);
                img.removeAttribute('src');
                img.setAttribute('loading', 'lazy');
                img.setAttribute('decoding', 'async');
                imageObserver.observe(img);
              }
            });
          }, 500);
        }
      },

      // 3. Optimize image rendering
      optimizeImageRendering: () => {
        const optimizeImageCSS = document.createElement('style');
        optimizeImageCSS.setAttribute('data-image-optimization', 'true');
        optimizeImageCSS.textContent = `
          /* Image optimization CSS */
          img {
            max-width: 100%;
            height: auto;
            image-rendering: auto;
            decoding: async;
          }
          
          /* LCP image optimization */
          .hero-image, .celia-portrait, .header-logo {
            image-rendering: auto;
            decoding: sync;
            loading: eager;
            fetchpriority: high;
          }
          
          /* Mobile image optimizations */
          @media (max-width: 768px) {
            img {
              image-rendering: -webkit-optimize-contrast;
              image-rendering: auto;
            }
            
            /* Prevent layout shift */
            .hero-image {
              aspect-ratio: 16/9;
              object-fit: cover;
            }
            
            .celia-portrait {
              aspect-ratio: 4/5;
              object-fit: cover;
            }
          }
          
          /* Desktop image optimizations */
          @media (min-width: 1025px) {
            .hero-image {
              image-rendering: high-quality;
            }
          }
          
          /* Prevent cumulative layout shift */
          .image-container {
            position: relative;
            overflow: hidden;
          }
          
          .image-placeholder {
            background: linear-gradient(90deg, #f0f0f0 25%, transparent 37%, #f0f0f0 63%);
            background-size: 400% 100%;
            animation: shimmer 1.5s ease-in-out infinite;
          }
          
          @keyframes shimmer {
            0% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `;
        document.head.appendChild(optimizeImageCSS);
      },

      // 4. Responsive image optimization
      implementResponsiveImages: () => {
        setTimeout(() => {
          const images = document.querySelectorAll('img');
          images.forEach(img => {
            const src = img.getAttribute('src') || '';
            
            // Add responsive attributes for better mobile performance
            if (!img.hasAttribute('sizes')) {
              if (isMobile) {
                img.setAttribute('sizes', '100vw');
              } else {
                img.setAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw');
              }
            }
            
            // Add WebP srcset if not present
            if (src.includes('.jpg') || src.includes('.png')) {
              const webpSrc = src.replace(/\.(jpg|png)$/, '.webp');
              if (!img.srcset && !img.getAttribute('data-srcset')) {
                img.setAttribute('data-srcset', `${webpSrc} 1x, ${src} 1x`);
              }
            }
          });
        }, 100);
      },

      // 5. Critical image preloading with priority hints
      preloadCriticalImages: () => {
        const criticalImages = [
          { 
            src: '/images/hero_image_canva_optimized.webp', 
            priority: 'high',
            media: '(max-width: 768px)'
          },
          { 
            src: '/images/celia-portrait-optimized.webp', 
            priority: 'high',
            media: '(min-width: 769px)'
          },
          { 
            src: '/assets/celia-logo-new.png', 
            priority: 'high' 
          }
        ];

        criticalImages.forEach(({ src, priority, media }) => {
          const preload = document.createElement('link');
          preload.rel = 'preload';
          preload.href = src;
          preload.as = 'image';
          preload.setAttribute('fetchpriority', priority);
          
          if (media) {
            preload.media = media;
          }
          
          if (src.includes('.webp')) {
            preload.type = 'image/webp';
          }
          
          document.head.appendChild(preload);
        });
      }
    };

    // Apply all image optimizations
    imageOptimizations.optimizeLCPImages();
    imageOptimizations.implementLazyLoading();
    imageOptimizations.optimizeImageRendering();
    imageOptimizations.implementResponsiveImages();
    imageOptimizations.preloadCriticalImages();

    // Mark as optimized
    document.documentElement.setAttribute('data-images-optimized', 'true');
    console.log('🖼️ Image optimizations applied for LCP improvement');

  }, []);

  return null;
}