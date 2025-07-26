import { useEffect } from 'react';

/**
 * Mobile Image Optimizer
 * Addresses the 100 KiB image delivery savings identified in Lighthouse
 * Implements modern image formats, lazy loading, and responsive sizing for mobile
 */
export default function MobileImageOptimizer() {
  useEffect(() => {
    // Only run on mobile devices
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    // Skip if already optimized
    if (document.querySelector('[data-images-optimized]')) return;

    const imageOptimizations = {
      // 1. Convert to WebP with fallbacks
      implementWebPSupport: () => {
        // Test WebP support
        const webp = new Image();
        webp.onload = webp.onerror = () => {
          const supportsWebP = webp.height === 2;
          
          if (supportsWebP) {
            // Replace image sources with WebP versions
            const images = document.querySelectorAll('img');
            images.forEach((img) => {
              const src = img.src;
              if (src && !src.includes('.webp') && !src.includes('data:')) {
                // Create WebP version with mobile optimization
                const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                
                // Create a new image element to test WebP availability
                const testImg = new Image();
                testImg.onload = () => {
                  img.src = webpSrc;
                };
                testImg.onerror = () => {
                  // Keep original if WebP version doesn't exist
                };
                testImg.src = webpSrc;
              }
            });
          }
        };
        webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
      },

      // 2. Implement aggressive lazy loading
      implementLazyLoading: () => {
        const images = document.querySelectorAll('img');
        
        if ('IntersectionObserver' in window) {
          const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                
                // Load the image
                if (img.dataset.src) {
                  img.src = img.dataset.src;
                  img.removeAttribute('data-src');
                }
                
                // Add loading animation
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = () => {
                  img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
              }
            });
          }, {
            rootMargin: '50px 0px',
            threshold: 0.01
          });

          images.forEach((img, index) => {
            // Don't lazy load the hero image (LCP element)
            if (index === 0 || img.closest('.hero-section')) {
              img.setAttribute('loading', 'eager');
              img.setAttribute('fetchpriority', 'high');
              return;
            }

            // Set up lazy loading for other images
            const currentSrc = img.src;
            img.dataset.src = currentSrc;
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+';
            img.setAttribute('loading', 'lazy');
            
            imageObserver.observe(img);
          });
        } else {
          // Fallback for browsers without IntersectionObserver
          images.forEach((img, index) => {
            if (index > 0 && !img.closest('.hero-section')) {
              img.setAttribute('loading', 'lazy');
            }
          });
        }
      },

      // 3. Add responsive image sizing
      addResponsiveSizing: () => {
        const images = document.querySelectorAll('img');
        images.forEach((img) => {
          // Add responsive sizes attribute
          if (!img.hasAttribute('sizes')) {
            img.setAttribute('sizes', '(max-width: 768px) 100vw, 50vw');
          }

          // Add mobile-optimized dimensions to prevent layout shift
          if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
            const computedStyle = window.getComputedStyle(img);
            const aspectRatio = parseFloat(computedStyle.aspectRatio) || 1;
            
            // Set responsive dimensions
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.aspectRatio = aspectRatio.toString();
          }

          // Add containment for performance
          img.style.contain = 'layout style paint';
          
          // Add decoding optimization
          img.setAttribute('decoding', 'async');
        });
      },

      // 4. Optimize image compression and format
      optimizeImageFormat: () => {
        const images = document.querySelectorAll('img');
        images.forEach((img) => {
          const src = img.src;
          if (src && !src.includes('data:') && !src.includes('?')) {
            // Add mobile-specific query parameters for optimization
            const mobileParams = '?w=800&q=80&f=auto&fit=cover';
            
            // Update src for mobile optimization
            if (src.includes('/images/')) {
              img.dataset.mobileOptimized = src + mobileParams;
              
              // Test if the optimized version exists
              const testImg = new Image();
              testImg.onload = () => {
                img.src = img.dataset.mobileOptimized!;
              };
              testImg.src = img.dataset.mobileOptimized!;
            }
          }
        });
      },

      // 5. Implement image preloading for critical images
      preloadCriticalImages: () => {
        const criticalImages = [
          '/images/celia-portrait-optimized.webp',
          '/images/header_logo.png'
        ];

        criticalImages.forEach((src, index) => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = src;
          link.as = 'image';
          
          if (src.includes('.webp')) {
            link.type = 'image/webp';
          }
          
          // Highest priority for LCP image
          if (index === 0) {
            link.setAttribute('fetchpriority', 'high');
            link.setAttribute('importance', 'high');
          }
          
          document.head.appendChild(link);
        });
      },

      // 6. Add image error handling and fallbacks
      addImageErrorHandling: () => {
        const images = document.querySelectorAll('img');
        images.forEach((img) => {
          img.addEventListener('error', () => {
            // If WebP fails, try original format
            if (img.src.includes('.webp')) {
              const fallbackSrc = img.src.replace('.webp', '.jpg');
              img.src = fallbackSrc;
            }
            
            // Add error state styling
            img.style.opacity = '0.5';
            img.style.filter = 'grayscale(100%)';
          });

          img.addEventListener('load', () => {
            // Remove any error styling
            img.style.opacity = '';
            img.style.filter = '';
            
            // Add loaded state
            img.classList.add('image-loaded');
          });
        });
      }
    };

    // Apply all image optimizations
    imageOptimizations.preloadCriticalImages();
    imageOptimizations.implementWebPSupport();
    imageOptimizations.implementLazyLoading();
    imageOptimizations.addResponsiveSizing();
    imageOptimizations.optimizeImageFormat();
    imageOptimizations.addImageErrorHandling();

    // Mark as optimized
    document.documentElement.setAttribute('data-images-optimized', 'true');

    // Add mobile-specific image CSS
    const imageCSS = document.createElement('style');
    imageCSS.textContent = `
      /* Mobile image optimizations */
      @media (max-width: 768px) {
        img {
          max-width: 100%;
          height: auto;
          display: block;
          contain: layout style paint;
          image-rendering: auto;
        }
        
        .hero-section img {
          object-fit: cover;
          object-position: center;
          width: 100%;
          aspect-ratio: 3/4;
        }
        
        .image-loaded {
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        /* Optimize image containers */
        .image-container {
          position: relative;
          overflow: hidden;
          contain: layout style paint;
        }
        
        /* Loading placeholder */
        img[data-src] {
          background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      }
    `;
    document.head.appendChild(imageCSS);

    console.log('📸 Mobile images optimized - targeting 100 KiB savings');

  }, []);

  return null;
}