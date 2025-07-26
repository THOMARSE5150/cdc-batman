import { useState, useRef, useEffect } from 'react';
import { useLazyLoad } from '@/hooks/use-lazy-load';
import { generateSrcSet } from '@/lib/imageOptimizer';
import { useDeferredLoading } from '@/hooks/use-deferred-loading';
import { getPerformanceSettings } from '@/lib/performance';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  loadingClassName?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

export default function OptimizedImage({
  src, 
  alt,
  className = '',
  width,
  height,
  loadingClassName = 'animate-pulse bg-gray-200',
  priority = false,
  sizes = '100vw',
  quality = 80
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const isVisible = useLazyLoad(imgRef);
  const shouldRender = priority || useDeferredLoading(500);
  const shouldLoad = (priority || isVisible) && shouldRender;
  const performanceSettings = getPerformanceSettings();
  
  // Reset loaded state when the source changes
  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [src]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setError(true);
    console.error(`Failed to load image: ${src}`);
  };

  // Generate srcSet for responsive images
  const srcSet = generateSrcSet(src);
  
  // Use lower quality images on low-end devices
  const imgSrc = performanceSettings.isLowEndDevice && !src.endsWith('.svg') 
    ? `${src}?quality=${quality - 20}` 
    : `${src}?quality=${quality}`;

  const imageStyle = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
    height: height ? (typeof height === 'number' ? `${height}px` : height) : 'auto',
    display: isLoaded ? 'block' : 'none',
  };

  const placeholderStyle = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
    height: height ? (typeof height === 'number' ? `${height}px` : height) : '200px',
    display: isLoaded ? 'none' : 'block',
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !error && (
        <div 
          className={`${loadingClassName}`} 
          style={placeholderStyle}
        />
      )}
      
      {shouldLoad && !error && (
        <img
          src={imgSrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={imageStyle}
          className={className}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
        />
      )}
      
      {error && (
        <div className="flex items-center justify-center bg-gray-100 text-gray-500 text-sm p-4 rounded" style={placeholderStyle}>
          Failed to load image
        </div>
      )}
    </div>
  );
}