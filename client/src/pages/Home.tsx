import { useEffect } from "react";
import HeroSectionOriginal from "@/components/sections/HeroSectionOriginal";
import { SEO } from "@/components/ui/SEO";
import { addStructuredData, generateSimpleLocalBusinessStructuredData } from "@/lib/structuredData";
import CriticalPerformanceOptimizer from "@/components/performance/CriticalPerformanceOptimizer";
import ImageOptimizer from "@/components/performance/ImageOptimizer";
import BundleOptimizer from "@/components/performance/BundleOptimizer";
import PerformanceMonitor from "@/components/performance/PerformanceMonitor";
import { 
  LazyWrapper, 
  LazyAboutSection, 
  LazyServicesPreview, 
  LazyLocationsPreview, 
  LazyClientDiversitySection, 
  LazyFeesSection, 
  LazyHalaxyIntegration 
} from "@/components/performance/LazyComponentLoader";

export default function Home() {
  useEffect(() => {
    // Add structured data for the homepage - LocalBusiness schema
    const structuredData = generateSimpleLocalBusinessStructuredData();
    addStructuredData(structuredData);
  }, []);

  return (
    <>
      <CriticalPerformanceOptimizer />
      <ImageOptimizer />
      <BundleOptimizer />
      <PerformanceMonitor />
      <SEO
        title="Melbourne Counselling | Accredited Mental Health Social Worker | Celia Dunsmore Counselling"
        description="Professional counselling services by Celia Dunsmore, Accredited Mental Health Social Worker in Melbourne's inner north, providing support for anxiety, depression and trauma."
        canonicalPath="/"
      />
      
      {/* Critical above-the-fold content - loaded immediately */}
      <HeroSectionOriginal />
      
      {/* Below-the-fold content - lazy loaded to reduce initial bundle */}
      <LazyWrapper fallbackHeight="300px" priority="high">
        <LazyAboutSection />
      </LazyWrapper>
      
      <LazyWrapper fallbackHeight="400px" priority="normal">
        <LazyServicesPreview />
      </LazyWrapper>
      
      <LazyWrapper fallbackHeight="300px" priority="normal">
        <LazyLocationsPreview />
      </LazyWrapper>
      
      <LazyWrapper fallbackHeight="350px" priority="low">
        <LazyClientDiversitySection />
      </LazyWrapper>
      
      <LazyWrapper fallbackHeight="250px" priority="low">
        <LazyFeesSection />
      </LazyWrapper>
      
      <LazyWrapper fallbackHeight="200px" priority="low">
        <LazyHalaxyIntegration />
      </LazyWrapper>
    </>
  );
}
