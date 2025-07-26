import { useState, useEffect, useRef } from 'react';
import { useMobileImageOptimization } from '@/hooks/use-mobile-optimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

/**
 * High-performance image component with mobile optimization
 * Includes lazy loading, WebP support, and responsive sizing
 */
export default function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  priority = false,
  sizes = '100vw',
  quality = 85
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);
  
  const { 
    getOptimalImageSize, 
    getOptimalImageQuality, 
    shouldUseWebP, 
    shouldLazyLoad 
  } = useMobileImageOptimization();

  useEffect(() => {
    // Generate optimized image source
    const originalSize = { width: width || 800, height: height || 600 };
    const optimalSize = getOptimalImageSize(originalSize);
    const optimalQuality = getOptimalImageQuality();
    const useWebP = shouldUseWebP();
    
    // Generate srcset for different screen densities
    const generateSrcSet = () => {
      const baseUrl = src.split('.').slice(0, -1).join('.');
      const extension = useWebP ? 'webp' : 'jpg';
      
      return [
        `${baseUrl}-${Math.round(optimalSize.width * 0.5)}w.${extension} 0.5x`,
        `${baseUrl}-${optimalSize.width}w.${extension} 1x`,
        `${baseUrl}-${Math.round(optimalSize.width * 1.5)}w.${extension} 1.5x`,
        `${baseUrl}-${Math.round(optimalSize.width * 2)}w.${extension} 2x`
      ].join(', ');
    };

    // Use original src if optimization not needed
    const optimizedSrc = src.includes('http') ? src : 
      `${src}?w=${optimalSize.width}&h=${optimalSize.height}&q=${optimalQuality}&f=${useWebP ? 'webp' : 'jpg'}`;
    
    setCurrentSrc(optimizedSrc);
  }, [src, width, height, quality, getOptimalImageSize, getOptimalImageQuality, shouldUseWebP]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!shouldLazyLoad || priority) {
      return;
    }

    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imgElement = entry.target as HTMLImageElement;
            const dataSrc = imgElement.getAttribute('data-src');
            if (dataSrc) {
              imgElement.src = dataSrc;
              imgElement.removeAttribute('data-src');
            }
            observer.unobserve(imgElement);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    observer.observe(img);

    return () => {
      if (img) {
        observer.unobserve(img);
      }
    };
  }, [shouldLazyLoad, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
    // Fallback to original image
    if (imgRef.current && src !== currentSrc) {
      imgRef.current.src = src;
    }
  };

  // Loading placeholder
  const LoadingPlaceholder = () => (
    <div 
      className={`bg-gray-200 animate-pulse ${className}`}
      style={{ 
        width: width || '100%', 
        height: height || 'auto',
        aspectRatio: width && height ? `${width}/${height}` : undefined
      }}
    >
      <div className="flex items-center justify-center h-full text-gray-400">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );

  if (error) {
    return <LoadingPlaceholder />;
  }

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && <LoadingPlaceholder />}
      <img
        ref={imgRef}
        src={priority || !shouldLazyLoad ? currentSrc : undefined}
        data-src={!priority && shouldLazyLoad ? currentSrc : undefined}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        style={{
          maxWidth: '100%',
          height: 'auto',
          objectFit: 'cover',
          display: isLoaded ? 'block' : 'none'
        }}
      />
    </div>
  );
}

/**
 * Background image component optimized for mobile performance
 */
export function OptimizedBackgroundImage({ 
  src, 
  alt, 
  children, 
  className = '',
  overlay = false 
}: { 
  src: string; 
  alt: string; 
  children?: React.ReactNode; 
  className?: string;
  overlay?: boolean;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { shouldUseWebP, getOptimalImageQuality } = useMobileImageOptimization();

  useEffect(() => {
    const img = new Image();
    const quality = getOptimalImageQuality();
    const format = shouldUseWebP() ? 'webp' : 'jpg';
    const optimizedSrc = src.includes('http') ? src : 
      `${src}?q=${quality}&f=${format}`;
    
    img.onload = () => setIsLoaded(true);
    img.src = optimizedSrc;
  }, [src, shouldUseWebP, getOptimalImageQuality]);

  return (
    <div 
      className={`relative ${className}`}
      style={{
        backgroundImage: isLoaded ? `url(${src})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {overlay && (
        <div className="absolute inset-0 bg-black/20" />
      )}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}