import { useEffect } from "react";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesPreview from "@/components/sections/ServicesPreview";
import ClientDiversitySection from "@/components/sections/ClientDiversitySection";
import FeesSection from "@/components/sections/FeesSection";
import HalaxyIntegration from "@/components/sections/HalaxyIntegration";
import { SEO } from "@/components/ui/SEO";
import { addStructuredData, generateLocalBusinessStructuredData } from "@/lib/structuredData";

export default function Home() {
  useEffect(() => {
    // Add structured data for the homepage - LocalBusiness
    const url = window.location.href;
    const structuredData = generateLocalBusinessStructuredData({ url });
    addStructuredData(structuredData);
  }, []);

  return (
    <>
      <SEO
        title="Celia Dunsmore Counselling | Professional Mental Health Support"
        description="Professional counselling services by Celia Dunsmore, an Accredited Mental Health Social Worker in Geelong, providing support for mental health concerns."
        canonicalPath="/"
      />
      <HeroSection />
      <AboutSection />
      <ServicesPreview />
      <ClientDiversitySection />
      <FeesSection />
      <HalaxyIntegration />
    </>
  );
}
