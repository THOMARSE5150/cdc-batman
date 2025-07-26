/**
 * Utility functions for managing structured data (JSON-LD) in the application
 */

export interface StructuredData {
  "@context": string;
  "@type": string;
  [key: string]: any;
}

/**
 * Add structured data to the document head
 */
export function addStructuredData(data: StructuredData, id?: string): void {
  if (typeof document === 'undefined') return;

  const scriptId = id || `structured-data-${data['@type']?.toLowerCase() || 'default'}`;
  
  // Remove existing script if it exists
  const existingScript = document.getElementById(scriptId);
  if (existingScript) {
    existingScript.remove();
  }

  // Create new script element
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = scriptId;
  script.textContent = JSON.stringify(data);
  
  document.head.appendChild(script);
}

/**
 * Remove structured data from the document head
 */
export function removeStructuredData(id: string): void {
  if (typeof document === 'undefined') return;
  
  const script = document.getElementById(id);
  if (script) {
    script.remove();
  }
}

/**
 * Generate Article structured data for blog posts
 */
export function generateArticleStructuredData(article: {
  headline: string;
  description: string;
  author: string;
  publishDate: string;
  modifiedDate?: string;
  url: string;
  image?: string;
  keywords?: string[];
  category?: string;
}): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.headline,
    "description": article.description,
    "author": {
      "@type": "Person",
      "name": article.author,
      "jobTitle": "Accredited Mental Health Social Worker",
      "url": "https://celiadunsmorecounselling.com.au/meet-celia"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Celia Dunsmore Counselling",
      "url": "https://celiadunsmorecounselling.com.au",
      "logo": {
        "@type": "ImageObject",
        "url": "https://celiadunsmorecounselling.com.au/images/header_logo.png"
      }
    },
    "datePublished": article.publishDate,
    "dateModified": article.modifiedDate || article.publishDate,
    "url": article.url,
    ...(article.image && {
      "image": {
        "@type": "ImageObject",
        "url": article.image
      }
    }),
    ...(article.keywords && {
      "keywords": article.keywords.join(", ")
    }),
    ...(article.category && {
      "articleSection": article.category
    })
  };
}

/**
 * Generate FAQ structured data for better search visibility
 */
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generate Service structured data for therapy services
 */
export function generateServiceStructuredData(service: {
  name: string;
  description: string;
  provider: string;
  areaServed: string[];
  offers?: {
    price: string;
    priceCurrency: string;
    description: string;
  };
}): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Mental Health Services",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Person",
      "name": service.provider,
      "jobTitle": "Accredited Mental Health Social Worker"
    },
    "areaServed": service.areaServed.map(area => ({
      "@type": "Place",
      "name": area
    })),
    ...(service.offers && {
      "offers": {
        "@type": "Offer",
        "price": service.offers.price,
        "priceCurrency": service.offers.priceCurrency,
        "description": service.offers.description
      }
    })
  };
}

/**
 * Generate simple LocalBusiness structured data for the home page
 */
export function generateSimpleLocalBusinessStructuredData(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://celiadunsmorecounselling.com.au/#localbusiness",
    "name": "Celia Dunsmore Counselling",
    "alternateName": "Celia Dunsmore AMHSW",
    "description": "Professional counselling services provided by Celia Dunsmore, Accredited Mental Health Social Worker, specializing in anxiety, depression, trauma, and relationship counselling in Melbourne's inner north.",
    "url": "https://celiadunsmorecounselling.com.au",
    "telephone": "0438 593 071",
    "email": "hello@celiadunsmorecounselling.com.au",
    "priceRange": "$$",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "2A Hall Street",
        "addressLocality": "Brunswick",
        "addressRegion": "VIC",
        "postalCode": "3056",
        "addressCountry": "AU"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "81B Bell Street",
        "addressLocality": "Coburg",
        "addressRegion": "VIC",
        "postalCode": "3058", 
        "addressCountry": "AU"
      }
    ],
    "geo": [
      {
        "@type": "GeoCoordinates",
        "latitude": -37.7747,
        "longitude": 144.9574
      },
      {
        "@type": "GeoCoordinates",
        "latitude": -37.7559,
        "longitude": 144.9647
      }
    ],
    "areaServed": [
      {
        "@type": "Place",
        "name": "Brunswick, VIC"
      },
      {
        "@type": "Place", 
        "name": "Coburg, VIC"
      },
      {
        "@type": "Place",
        "name": "Melbourne's Inner North"
      }
    ],
    "openingHours": [
      "Mo-Fr 09:00-17:00"
    ],
    "paymentAccepted": ["Cash", "Medicare", "Private Health Insurance"],
    "currenciesAccepted": "AUD",
    "founder": {
      "@type": "Person",
      "name": "Celia Dunsmore",
      "jobTitle": "Accredited Mental Health Social Worker",
      "sameAs": [
        "https://celiadunsmorecounselling.com.au/meet-celia"
      ]
    },
    "employee": {
      "@type": "Person",
      "name": "Celia Dunsmore",
      "jobTitle": "Accredited Mental Health Social Worker"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": -37.7653,
        "longitude": 144.9611
      },
      "geoRadius": "20000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Counselling Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Anxiety Counselling",
            "description": "Professional anxiety management and treatment"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Depression Counselling",
            "description": "Evidence-based depression therapy and support"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Trauma Therapy",
            "description": "Specialized trauma recovery and EMDR therapy"
          }
        }
      ]
    }
  };
}