import { lazy, Suspense } from 'react';

// Performance-optimized lazy loading with proper fallbacks
const LazyAboutSection = lazy(() => import('@/components/sections/AboutSection'));
const LazyServicesPreview = lazy(() => import('@/components/sections/ServicesPreview'));
const LazyLocationsPreview = lazy(() => import('@/components/sections/LocationsPreview'));
const LazyClientDiversitySection = lazy(() => import('@/components/sections/ClientDiversitySection'));
const LazyFeesSection = lazy(() => import('@/components/sections/FeesSection'));
const LazyHalaxyIntegration = lazy(() => import('@/components/sections/HalaxyIntegration'));

// Minimal fallback component
const SectionFallback = () => (
  <div className="w-full h-32 bg-gray-50 animate-pulse rounded-lg"></div>
);

interface LazyLoadOptimizerProps {
  children: React.ReactNode;
}

export default function LazyLoadOptimizer({ children }: LazyLoadOptimizerProps) {
  return (
    <Suspense fallback={<SectionFallback />}>
      {children}
    </Suspense>
  );
}

// Export individual lazy components
export {
  LazyAboutSection,
  LazyServicesPreview,
  LazyLocationsPreview,
  LazyClientDiversitySection,
  LazyFeesSection,
  LazyHalaxyIntegration,
  SectionFallback
};