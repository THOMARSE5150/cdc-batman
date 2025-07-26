import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface StructuredDataProps {
  path: string;
}

const StructuredData: React.FC<StructuredDataProps> = ({ path }) => {
  const [location] = useLocation();
  
  useEffect(() => {
    // Only inject the structured data if the current location matches the expected path
    if (location === path) {
      // Find and remove any existing JSON-LD scripts for this path
      const existingScripts = document.querySelectorAll(`script[data-path="${path}"]`);
      existingScripts.forEach(script => script.remove());
      
      // Create and inject the new script
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-path', path);
      
      // Set the appropriate JSON-LD content based on the path
      let jsonLDContent = '';
      
      switch (path) {
        case '/':
          // LocalBusiness schema is now injected directly in public/index.html
          // Removing this to avoid duplicate structured data
          return;
          break;
          
        case '/meet-celia':
          // person.json (for about.html)
          jsonLDContent = `
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Celia Dunsmore",
            "jobTitle": "Accredited Mental Health Social Worker",
            "worksFor": {
              "@type": "Organization",
              "name": "Celia Dunsmore Counselling"
            },
            "url": "https://celiadunsmorecounselling.com.au/meet-celia",
            "image": "https://celiadunsmorecounselling.com.au/images/celia-profile.jpg",
            "description": "Celia Dunsmore is a qualified counsellor and accredited mental health social worker providing person-centred therapy in Melbourne's Inner North."
          }
          `;
          break;
          
        case '/faq':
          // faq.json
          jsonLDContent = `
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is counselling?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Counselling is a process where a trained professional helps you explore emotional difficulties and improve mental well-being."
                }
              },
              {
                "@type": "Question",
                "name": "Is counselling confidential?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, all counselling sessions are confidential except in circumstances where there is a risk of harm."
                }
              }
            ]
          }
          `;
          break;
          
        case '/services':
          // services.json
          jsonLDContent = `
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Mental Health Counselling",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Celia Dunsmore Counselling"
            },
            "areaServed": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Yarrawonga",
                "addressRegion": "VIC",
                "addressCountry": "AU"
              }
            },
            "url": "https://celiadunsmorecounselling.com.au/services",
            "description": "Compassionate mental health counselling services provided by an Accredited Mental Health Social Worker. Supporting emotional wellbeing, trauma recovery, and personal growth."
          }
          `;
          break;
          
        case '/client-diversity':
          // diversity.json
          jsonLDContent = `
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Celia Dunsmore Counselling",
            "url": "https://celiadunsmorecounselling.com.au/client-diversity",
            "policy": "We are committed to providing inclusive and non-judgmental support to individuals of all backgrounds, identities, and lived experiences.",
            "sameAs": [],
            "founder": {
              "@type": "Person",
              "name": "Celia Dunsmore"
            }
          }
          `;
          break;
          
        case '/fees':
          // fees.json
          jsonLDContent = `
          {
            "@context": "https://schema.org",
            "@type": "Offer",
            "url": "https://celiadunsmorecounselling.com.au/fees",
            "priceCurrency": "AUD",
            "price": "130.00",
            "eligibleCustomerType": "New and returning clients",
            "availability": "https://schema.org/InStock",
            "description": "Standard counselling session with Celia Dunsmore. Fee is $130 per 50-minute session. Medicare rebates may apply with a valid Mental Health Care Plan."
          }
          `;
          break;
          
        default:
          // No structured data for this path
          return;
      }
      
      script.textContent = jsonLDContent;
      document.head.appendChild(script);
    }
    
    // Cleanup function to remove script when component unmounts
    return () => {
      if (location === path) {
        const script = document.querySelector(`script[data-path="${path}"]`);
        if (script) {
          script.remove();
        }
      }
    };
  }, [location, path]);
  
  // This component doesn't render anything visually
  return null;
};

export default StructuredData;