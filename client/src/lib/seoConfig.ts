// SEO Configuration for Mental Health Counselling Practice
export const seoConfig = {
  defaultTitle: "Celia Dunsmore | Accredited Mental Health Social Worker Brunswick & Coburg",
  titleTemplate: "%s | Celia Dunsmore",
  defaultDescription: "Accredited Mental Health Social Worker providing professional mental health counselling in Brunswick and Coburg Melbourne. Individual therapy, trauma recovery, and emotional wellbeing support with Medicare rebates.",
  siteUrl: import.meta.env.VITE_SITE_URL || 
    (import.meta.env.PROD 
      ? (import.meta.env.VITE_RAILWAY_PUBLIC_DOMAIN 
          ? `https://${import.meta.env.VITE_RAILWAY_PUBLIC_DOMAIN}` 
          : import.meta.env.VITE_REPLIT_DOMAINS 
            ? `https://${import.meta.env.VITE_REPLIT_DOMAINS}` 
            : "https://celiadunsmorecounselling.com.au")
      : "http://localhost:5000"),
  
  // Page-specific SEO configurations
  pages: {
    home: {
      title: "Celia Dunsmore Counselling | Brunswick & Melbourne | MH Social Worker",
      description: "Compassionate and professional counselling in Brunswick, Melbourne. Celia Dunsmore is an Accredited Mental Health Social Worker providing expert support.",
      keywords: "Accredited Mental Health Social Worker, Celia Dunsmore, Brunswick counsellor, Coburg counselling, Melbourne AMHSW, individual counselling, trauma therapy, anxiety counselling, Medicare rebates"
    },
    about: {
      title: "Meet Celia Dunsmore | Accredited Mental Health Social Worker Melbourne",
      description: "Learn about Celia Dunsmore's qualifications and approach as an Accredited Mental Health Social Worker providing compassionate counselling services in Brunswick and Coburg, Melbourne.",
      keywords: "Celia Dunsmore, Accredited Mental Health Social Worker, AMHSW, Brunswick counsellor, qualified therapist, professional counselling, Medicare provider"
    },
    services: {
      title: "Mental Health Counselling Services - Individual Therapy & Trauma Support",
      description: "Comprehensive mental health services including individual counselling, trauma therapy, anxiety treatment, and depression support. Medicare rebates available.",
      keywords: "individual counselling, trauma therapy, anxiety treatment, depression counselling, mental health services, Medicare rebates, telehealth"
    },
    locations: {
      title: "Counselling Locations in Brunswick & Online | Celia Dunsmore",
      description: "Find accessible counselling services in Brunswick, Victoria, or connect online. Conveniently located to support the Melbourne community.",
      keywords: "Brunswick counselling office, Coburg therapy centre, Melbourne mental health locations, accessible counselling"
    },
    contact: {
      title: "Contact & Book Appointment - Mental Health Counselling",
      description: "Book your mental health counselling appointment in Brunswick or Coburg. Call today or enquire online for professional therapy services.",
      keywords: "book counselling appointment, mental health booking, Brunswick therapy appointment, Coburg counselling contact"
    },
    fees: {
      title: "Counselling Fees & Rebates | Melbourne | Celia Dunsmore",
      description: "Transparent information on counselling fees, session costs, and available Medicare rebates for services in Melbourne.",
      keywords: "counselling fees, Medicare rebates, mental health care plan, affordable therapy, counselling costs"
    },
    faq: {
      title: "Frequently Asked Questions - Mental Health Counselling",
      description: "Common questions about mental health counselling, Medicare rebates, appointment booking, and what to expect during therapy sessions.",
      keywords: "counselling FAQ, mental health questions, therapy information, Medicare mental health, counselling process"
    }
  },

  // Location-specific SEO
  locations: {
    brunswick: {
      title: "Mental Health Counselling Brunswick - 503 Sydney Road",
      description: "Professional mental health counselling in Brunswick. Convenient location on Sydney Road with excellent public transport access and street parking.",
      keywords: "Brunswick mental health, Brunswick counsellor, Sydney Road therapy, Brunswick psychology, mental health Brunswick VIC",
      coordinates: { lat: -37.7749, lng: 144.9631 }
    },
    coburg_bell: {
      title: "Mental Health Counselling Coburg Bell Street - Professional Therapy",
      description: "Mental health counselling at our Coburg Bell Street location. On-site parking available with weekend appointments offered.",
      keywords: "Coburg mental health, Bell Street counselling, Coburg therapy, mental health Coburg VIC, weekend counselling",
      coordinates: { lat: -37.7559, lng: 144.9647 }
    },
    coburg_solana: {
      title: "Mental Health Counselling Coburg - Solana Psychology Partnership",
      description: "Professional counselling services at Solana Psychology centre in Coburg. First floor location with lift access near Coburg Station.",
      keywords: "Coburg psychology, Solana Psychology, mental health Coburg, Sydney Road counselling, professional therapy centre",
      coordinates: { lat: -37.7423, lng: 144.9631 }
    }
  },

  // Service-specific SEO
  services: {
    individual_counselling: {
      title: "Individual Counselling - One-on-One Therapy Sessions",
      description: "Personalized individual counselling for anxiety, depression, trauma, and emotional wellbeing. Professional one-on-one therapy in a safe environment.",
      keywords: "individual therapy, one-on-one counselling, personal therapy, private counselling sessions"
    },
    trauma_therapy: {
      title: "Trauma Therapy & Recovery - Specialized Counselling Support",
      description: "Trauma-informed counselling and recovery support. Specialized therapy for processing traumatic experiences in a safe, supportive environment.",
      keywords: "trauma therapy, trauma counselling, PTSD treatment, trauma recovery, trauma-informed care"
    },
    anxiety_treatment: {
      title: "Anxiety Counselling & Treatment - Professional Support",
      description: "Professional anxiety counselling and treatment. Learn coping strategies and manage anxiety symptoms with expert therapeutic support.",
      keywords: "anxiety therapy, anxiety treatment, anxiety counselling, panic disorder, stress management"
    }
  },

  // Social media and sharing
  social: {
    image: "/images/celia-profile.jpg",
    imageAlt: "Celia Dunsmore - Accredited Mental Health Social Worker",
    twitter: "@celiadunsmore", // Update with actual handle if available
    facebook: "celiadunsmorecounselling" // Update with actual page if available
  },

  // Business information
  business: {
    name: "Celia Dunsmore Counselling",
    phone: "+61438593071",
    email: "hello@celiadunsmorecounselling.com.au",
    primaryAddress: {
      street: "503 Sydney Road",
      city: "Brunswick",
      state: "VIC",
      postcode: "3056",
      country: "Australia"
    }
  }
};

// Generate page-specific meta tags
export function generatePageMeta(page: keyof typeof seoConfig.pages) {
  const pageConfig = seoConfig.pages[page];
  const baseUrl = seoConfig.siteUrl;
  
  return {
    title: pageConfig.title,
    description: pageConfig.description,
    keywords: pageConfig.keywords,
    canonical: `${baseUrl}/${page === 'home' ? '' : page}`,
    openGraph: {
      title: pageConfig.title,
      description: pageConfig.description,
      url: `${baseUrl}/${page === 'home' ? '' : page}`,
      image: `${baseUrl}${seoConfig.social.image}`,
      imageAlt: seoConfig.social.imageAlt
    }
  };
}

// Generate location-specific meta tags
export function generateLocationMeta(location: keyof typeof seoConfig.locations) {
  const locationConfig = seoConfig.locations[location];
  const baseUrl = seoConfig.siteUrl;
  
  return {
    title: locationConfig.title,
    description: locationConfig.description,
    keywords: locationConfig.keywords,
    canonical: `${baseUrl}/${location.replace('_', '-')}-counselling`,
    coordinates: locationConfig.coordinates,
    openGraph: {
      title: locationConfig.title,
      description: locationConfig.description,
      url: `${baseUrl}/${location.replace('_', '-')}-counselling`,
      image: `${baseUrl}${seoConfig.social.image}`,
      imageAlt: seoConfig.social.imageAlt
    }
  };
}