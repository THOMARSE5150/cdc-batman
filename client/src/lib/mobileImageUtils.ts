/**
 * Mobile image optimization utilities for better Core Web Vitals
 */

interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  lazy?: boolean;
  priority?: boolean;
}

interface OptimizedImageResult {
  src: string;
  srcSet: string;
  sizes: string;
  width?: number;
  height?: number;
  loading: 'lazy' | 'eager';
  decoding: 'async' | 'sync';
  fetchPriority?: 'high' | 'low' | 'auto';
}

/**
 * Generates optimized image parameters for mobile devices
 */
export function optimizeImageForMobile(
  baseSrc: string,
  options: ImageOptimizationOptions = {}
): OptimizedImageResult {
  const {
    width = 800,
    height,
    quality = 85,
    format = 'webp',
    lazy = true,
    priority = false
  } = options;

  // Check if device is mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024 && window.innerWidth >= 768;

  // Adjust quality and dimensions based on device and connection
  const connection = typeof navigator !== 'undefined' ? (navigator as any).connection : null;
  const isSlowConnection = connection && (
    connection.effectiveType === 'slow-2g' || 
    connection.effectiveType === '2g'
  );

  let optimizedWidth = width;
  let optimizedQuality = quality;

  // Mobile-specific optimizations
  if (isMobile) {
    optimizedWidth = Math.min(width, 480); // Cap mobile images at 480px
    optimizedQuality = isSlowConnection ? 60 : 75; // Lower quality for mobile
  } else if (isTablet) {
    optimizedWidth = Math.min(width, 768);
    optimizedQuality = isSlowConnection ? 70 : 80;
  }

  // Generate responsive srcSet
  const generateSrcSet = () => {
    const densities = [1, 1.5, 2];
    const breakpoints = isMobile ? [320, 480, 640] : [480, 768, 1024, 1280];
    
    return breakpoints.map(bp => {
      const scaledWidth = Math.min(bp, optimizedWidth);
      return `${getOptimizedImageUrl(baseSrc, {
        width: scaledWidth,
        quality: optimizedQuality,
        format
      })} ${scaledWidth}w`;
    }).join(', ');
  };

  // Generate sizes attribute for responsive images
  const generateSizes = () => {
    if (isMobile) {
      return '(max-width: 480px) 100vw, (max-width: 768px) 90vw, 480px';
    }
    return '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px';
  };

  const optimizedHeight = height ? Math.round((height / width) * optimizedWidth) : undefined;

  return {
    src: getOptimizedImageUrl(baseSrc, {
      width: optimizedWidth,
      height: optimizedHeight,
      quality: optimizedQuality,
      format
    }),
    srcSet: generateSrcSet(),
    sizes: generateSizes(),
    width: optimizedWidth,
    height: optimizedHeight,
    loading: priority ? 'eager' : (lazy ? 'lazy' : 'eager'),
    decoding: 'async',
    fetchPriority: priority ? 'high' : 'auto'
  };
}

/**
 * Generates optimized image URL with query parameters
 */
function getOptimizedImageUrl(
  baseSrc: string, 
  options: { width?: number; height?: number; quality?: number; format?: string }
): string {
  // For now, return the base source as we don't have an image optimization service
  // In production, this would integrate with services like Cloudinary, ImageKit, or Vercel
  
  // If we had an image optimization service, it would look like:
  // const params = new URLSearchParams();
  // if (options.width) params.set('w', options.width.toString());
  // if (options.height) params.set('h', options.height.toString());
  // if (options.quality) params.set('q', options.quality.toString());
  // if (options.format) params.set('f', options.format);
  // return `${baseSrc}?${params.toString()}`;
  
  return baseSrc;
}

/**
 * Checks if WebP is supported by the browser
 */
export function supportsWebP(): boolean {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

/**
 * Gets the optimal image format for the current browser
 */
export function getOptimalImageFormat(): 'webp' | 'jpeg' {
  return supportsWebP() ? 'webp' : 'jpeg';
}

/**
 * Preloads critical images for better LCP
 */
export function preloadCriticalImages(imageSources: string[]): void {
  if (typeof window === 'undefined') return;

  imageSources.forEach((src, index) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    
    // Set priority for first image
    if (index === 0) {
      link.setAttribute('fetchpriority', 'high');
    }
    
    document.head.appendChild(link);
  });
}

/**
 * Lazy loads images when they enter the viewport
 */
export function setupImageLazyLoading(): void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px' // Start loading 50px before entering viewport
  });

  // Observe all images with data-src
  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });
}

/**
 * Optimizes existing images on the page for mobile
 */
export function optimizePageImages(): void {
  if (typeof window === 'undefined') return;

  const images = document.querySelectorAll('img');
  const isMobile = window.innerWidth < 768;

  if (!isMobile) return;

  images.forEach((img) => {
    // Add mobile-optimized loading attributes
    if (!img.hasAttribute('loading')) {
      img.loading = 'lazy';
    }
    
    if (!img.hasAttribute('decoding')) {
      img.decoding = 'async';
    }

    // Add mobile-friendly CSS classes
    img.classList.add('max-w-full', 'h-auto');

    // Optimize image dimensions for mobile
    const currentWidth = img.naturalWidth || img.width;
    if (currentWidth > 480) {
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
    }
  });
}