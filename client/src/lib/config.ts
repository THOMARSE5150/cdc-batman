/**
 * Site Configuration
 * Update these values when deploying to different platforms
 */

// Get the current environment
const isProduction = import.meta.env.PROD;
const isDevelopment = import.meta.env.DEV;

// Railway-compatible site URL detection
const getRailwayUrl = () => {
  // Check for Railway-specific environment variables that Railway automatically sets
  if (import.meta.env.VITE_RAILWAY_PUBLIC_DOMAIN) {
    return `https://${import.meta.env.VITE_RAILWAY_PUBLIC_DOMAIN}`;
  }
  // Fallback to NEXT_PUBLIC format that Railway prefers
  if (import.meta.env.VITE_NEXT_PUBLIC_SITE_URL) {
    return import.meta.env.VITE_NEXT_PUBLIC_SITE_URL;
  }
  // Replit domains for development
  if (import.meta.env.VITE_REPLIT_DOMAINS) {
    return `https://${import.meta.env.VITE_REPLIT_DOMAINS}`;
  }
  return null;
};

// Site URLs based on deployment platform
export const siteConfig = {
  // Main site URL - Railway-compatible detection
  siteUrl: isProduction 
    ? (getRailwayUrl() || 'https://celiadunsmorecounselling.com.au')
    : (getRailwayUrl() || 'http://localhost:5000'),
    
  // API base URL
  apiUrl: isProduction 
    ? (getRailwayUrl() ? `${getRailwayUrl()}/api` : 'https://celiadunsmorecounselling.com.au/api')
    : (getRailwayUrl() ? `${getRailwayUrl()}/api` : 'http://localhost:5000/api'),
    
  // Contact information
  contact: {
    phone: '+61438593071',
    email: 'info@celiadunsmorecounselling.com.au',
  },
  
  // Business information
  business: {
    name: 'Celia Dunsmore Counselling',
    description: 'Compassionate and professional counselling in Brunswick, Melbourne',
    address: {
      street: '503 Sydney Road',
      suburb: 'Brunswick',
      state: 'VIC',
      postcode: '3056',
      country: 'Australia'
    }
  },
  
  // Booking configuration
  booking: {
    halaxyUrl: 'https://www.halaxy.com/profile/practitioner/celia-dunsmore/book',
    directBookingAvailable: true
  },
  
  // Social media and external links
  social: {
    // Add social media links here when available
  }
};

// Export individual values for convenience
export const { siteUrl, apiUrl, contact, business, booking } = siteConfig;

export default siteConfig;