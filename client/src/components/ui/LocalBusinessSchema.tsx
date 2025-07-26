import { useEffect } from "react";

interface LocationData {
  name: string;
  address: string;
  phone: string;
  coordinates: { lat: number; lng: number };
  hours?: Record<string, string>;
}

interface LocalBusinessSchemaProps {
  locations: LocationData[];
}

export default function LocalBusinessSchema({ locations }: LocalBusinessSchemaProps) {
  useEffect(() => {
    // Create comprehensive local business schema for each location
    locations.forEach((location, index) => {
      const schema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `#professional-service-${index}`,
        "name": "Celia Dunsmore Counselling",
        "alternateName": location.name,
        "description": "Professional counselling services by Celia Dunsmore, Accredited Mental Health Social Worker specializing in anxiety, depression, trauma, and mental health support.",
        "url": "https://celiadunsmorecounselling.com.au",
        "telephone": location.phone,
        "email": "info@celiadunsmorecounselling.com.au",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": location.address.split(',')[0],
          "addressLocality": location.address.includes('Brunswick') ? 'Brunswick' : 'Coburg',
          "addressRegion": "VIC",
          "postalCode": location.address.includes('Brunswick') ? '3056' : '3058',
          "addressCountry": "AU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": location.coordinates.lat,
          "longitude": location.coordinates.lng
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Melbourne"
          },
          {
            "@type": "State",
            "name": "Victoria"
          }
        ],
        "serviceType": [
          "Individual Counselling",
          "Anxiety Therapy",
          "Depression Treatment",
          "Trauma Therapy",
          "EMDR Therapy",
          "Telehealth Counselling"
        ],
        "provider": {
          "@type": "Person",
          "name": "Celia Dunsmore",
          "jobTitle": "Accredited Mental Health Social Worker",
          "qualifications": "Bachelor of Social Work, Accredited Mental Health Social Worker",
          "memberOf": {
            "@type": "Organization",
            "name": "Australian Association of Social Workers"
          }
        },
        "priceRange": "$$",
        "paymentAccepted": ["Medicare", "Private Health Insurance", "Private Pay"],
        "currenciesAccepted": "AUD",
        "openingHours": location.hours ? Object.entries(location.hours).map(([day, hours]) => 
          `${day.substring(0, 2)} ${hours}`
        ) : ["Mo-Fr 09:00-17:00"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Counselling Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Individual Counselling",
                "description": "One-on-one therapeutic support for mental health concerns"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "Telehealth Counselling",
                "description": "Online counselling sessions via secure video platform"
              }
            }
          ]
        }
      };

      // Add schema to document head
      const scriptId = `local-business-schema-${index}`;
      let existingScript = document.getElementById(scriptId);
      
      if (existingScript) {
        existingScript.textContent = JSON.stringify(schema);
      } else {
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      }
    });

    return () => {
      // Cleanup function
      locations.forEach((_, index) => {
        const script = document.getElementById(`local-business-schema-${index}`);
        if (script) {
          script.remove();
        }
      });
    };
  }, [locations]);

  return null;
}