/**
 * Utility functions to generate structured data for SEO
 * This doesn't change website content, only adds machine-readable metadata
 */

interface StructuredDataProps {
  url: string;
  name?: string;
  description?: string;
  imageUrl?: string;
}

/**
 * Generate structured data for LocalBusiness schema
 */
export function generateLocalBusinessStructuredData({
  url,
  name = "Celia Dunsmore Counselling",
  description = "Professional counselling services by Celia Dunsmore, Accredited Mental Health Social Worker.",
  imageUrl,
}: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": url,
    name,
    description,
    url,
    telephone: "", // Intentionally left blank per privacy and ethics considerations
    email: "", // Intentionally left blank per privacy and ethics considerations
    address: {
      "@type": "PostalAddress",
      addressLocality: "Geelong",
      addressRegion: "VIC",
      addressCountry: "AU"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -38.1499, // Geelong general area, not specific location
      longitude: 144.3617 // Geelong general area, not specific location
    },
    priceRange: "$$",
    image: imageUrl || "",
  };

  return structuredData;
}

/**
 * Generate structured data for ProfessionalService schema
 */
export function generateProfessionalServiceStructuredData({
  url,
  name = "Celia Dunsmore Counselling",
  description = "Professional counselling services by Celia Dunsmore, Accredited Mental Health Social Worker.",
  imageUrl,
}: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": url,
    name,
    description,
    url,
    serviceType: "Mental Health Counselling",
    telephone: "", // Intentionally left blank per privacy and ethics considerations
    provider: {
      "@type": "Person",
      name: "Celia Dunsmore",
      jobTitle: "Accredited Mental Health Social Worker",
      image: imageUrl || "",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: -38.1499, // Geelong general area, not specific location 
        longitude: 144.3617 // Geelong general area, not specific location
      },
      geoRadius: "30000" // 30km radius
    }
  };

  return structuredData;
}

/**
 * Add structured data to the page
 */
export function addStructuredData(data: any) {
  if (typeof window === "undefined") return;
  
  // Check if a JSON-LD script already exists
  let script = document.querySelector('script[type="application/ld+json"]');
  
  // If it exists, update it
  if (script) {
    script.textContent = JSON.stringify(data);
  } 
  // Otherwise, create a new script element
  else {
    script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }
}