import React from 'react';
import { Helmet } from 'react-helmet-async';

interface LocalBusinessSchemaProps {
  name?: string;
  description?: string;
  url?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  services?: Array<{
    name: string;
    description: string;
  }>;
}

const LocalBusinessSchema: React.FC<LocalBusinessSchemaProps> = ({
  name = "Celia Dunsmore Counselling",
  description = "Professional counselling services by Celia Dunsmore, Accredited Mental Health Social Worker in Melbourne. Support for anxiety, depression and trauma.",
  url = "https://celiadunsmorecounselling.com.au",
  telephone = "+61438593071",
  email = "hello@celiadunsmorecounselling.com.au",
  address = {
    streetAddress: "503 Sydney Road",
    addressLocality: "Brunswick",
    addressRegion: "VIC",
    postalCode: "3056",
    addressCountry: "AU"
  },
  geo = {
    latitude: -37.7698,
    longitude: 144.9631
  },
  openingHours = ["Mo 10:00-17:00", "Tu 10:00-17:00", "We 10:00-17:00", "Th 10:00-17:00", "Fr 10:00-17:00"],
  services = [
    {
      name: "Anxiety Counselling",
      description: "Professional support for anxiety disorders with evidence-based therapeutic approaches."
    },
    {
      name: "Depression Counselling", 
      description: "Compassionate support to navigate through depression and rediscover meaning and joy."
    },
    {
      name: "Trauma Recovery",
      description: "Safe therapeutic space to process and recover from traumatic experiences."
    }
  ]
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": url,
    name,
    description,
    url,
    telephone,
    email,
    address: {
      "@type": "PostalAddress",
      ...address
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude
    },
    priceRange: "$$",
    image: `${url}/images/celia-portrait-optimized.webp`,
    sameAs: [
      "https://www.halaxy.com/profile/counsellor/ms-celia-dunsmore-counsellor/brunswick"
    ],
    openingHours,
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: geo.latitude,
        longitude: geo.longitude
      },
      geoRadius: "20000"
    },
    provider: {
      "@type": "Person",
      name: "Celia Dunsmore",
      jobTitle: "Accredited Mental Health Social Worker",
      image: `${url}/images/celia-portrait-optimized.webp`,
      sameAs: [
        "https://www.halaxy.com/profile/counsellor/ms-celia-dunsmore-counsellor/brunswick"
      ]
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Mental Health Services",
      itemListElement: services.map(service => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description
        }
      }))
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData, null, 2)}
      </script>
    </Helmet>
  );
};

export default LocalBusinessSchema;