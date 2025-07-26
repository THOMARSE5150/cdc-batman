import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  mobileSrc?: string; // Optional mobile-optimized version
  placeholder?: string;
  width?: number;
  height?: number;
}

/**
 * High-performance lazy loading image component optimized for mobile
 * Implements intersection observer and responsive loading
 */
export default function LazyImage({ 
  src, 
  alt, 
  className, 
  mobileSrc, 
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+',
  width,
  height
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Check if device is mobile and use mobile-optimized image if available
    const isMobile = window.innerWidth < 768;
    const targetSrc = (isMobile && mobileSrc) ? mobileSrc : src;

    if (!imgRef.current) return;

    // Set up intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          setImageSrc(targetSrc);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading when 50px away from viewport
        threshold: 0.1
      }
    );

    observer.observe(imgRef.current);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src, mobileSrc]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    // Fallback to original src if mobile version fails
    if (mobileSrc && imageSrc === mobileSrc) {
      setImageSrc(src);
      setHasError(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          'transition-opacity duration-300 ease-in-out',
          isLoaded ? 'opacity-100' : 'opacity-0',
          hasError && 'opacity-50',
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        decoding="async"
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined,
          backgroundColor: '#f3f4f6' // Light gray background while loading
        }}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className={cn(
            'absolute inset-0 bg-gray-100 animate-pulse',
            'flex items-center justify-center text-gray-400'
          )}
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined
          }}
        >
          <svg
            className="w-8 h-8"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className={cn(
          'absolute inset-0 bg-gray-100',
          'flex items-center justify-center text-gray-500'
        )}>
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
}