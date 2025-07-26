import { lazy, Suspense, ComponentType } from 'react';

/**
 * Lazy Component Loader - Reduces initial bundle size
 * Implements intelligent code splitting to eliminate unused JavaScript
 */

// Lazy load heavy components that aren't critical for LCP
export const LazyAboutSection = lazy(() => 
  import('@/components/sections/AboutSection')
);

export const LazyServicesPreview = lazy(() => 
  import('@/components/sections/ServicesPreview')
);

export const LazyLocationsPreview = lazy(() => 
  import('@/components/sections/LocationsPreview')
);

export const LazyClientDiversitySection = lazy(() => 
  import('@/components/sections/ClientDiversitySection')
);

export const LazyFeesSection = lazy(() => 
  import('@/components/sections/FeesSection')
);

export const LazyHalaxyIntegration = lazy(() => 
  import('@/components/sections/HalaxyIntegration')
);

// Lightweight loading placeholder
const SectionSkeleton = ({ height = "200px" }: { height?: string }) => (
  <div 
    className="animate-pulse bg-gray-100 rounded-lg mx-auto max-w-6xl"
    style={{ height }}
    role="status"
    aria-label="Loading content..."
  >
    <div className="h-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
  </div>
);

// Wrapper component for lazy sections with optimized loading
interface LazyWrapperProps {
  children: React.ReactNode;
  fallbackHeight?: string;
  priority?: 'high' | 'normal' | 'low';
}

export const LazyWrapper = ({ children, fallbackHeight = "200px", priority = 'normal' }: LazyWrapperProps) => {
  // Different loading strategies based on priority
  const getLoadingDelay = () => {
    switch (priority) {
      case 'high': return 0;
      case 'normal': return 100;
      case 'low': return 300;
      default: return 100;
    }
  };

  return (
    <Suspense 
      fallback={
        <div style={{ minHeight: fallbackHeight }}>
          <SectionSkeleton height={fallbackHeight} />
        </div>
      }
    >
      <div style={{ animationDelay: `${getLoadingDelay()}ms` }}>
        {children}
      </div>
    </Suspense>
  );
};

// Hook for conditional component loading based on viewport
export const useConditionalLazyLoad = () => {
  const isMobile = window.innerWidth <= 768;
  const isSlowConnection = navigator.connection && 
    (navigator.connection as any).effectiveType === 'slow-2g' || 
    (navigator.connection as any).effectiveType === '2g';

  return {
    shouldLazyLoad: isMobile || isSlowConnection,
    loadPriority: isSlowConnection ? 'low' : isMobile ? 'normal' : 'high'
  };
};