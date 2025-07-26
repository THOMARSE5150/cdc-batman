/**
 * Site URL utility for domain-aware configuration
 * Uses environment variables to provide correct URLs for different environments
 */

export const getSiteUrl = (): string => {
  // Railway-compatible URL detection
  if (import.meta.env.VITE_NEXT_PUBLIC_SITE_URL) {
    return import.meta.env.VITE_NEXT_PUBLIC_SITE_URL;
  }
  if (import.meta.env.VITE_RAILWAY_PUBLIC_DOMAIN) {
    return `https://${import.meta.env.VITE_RAILWAY_PUBLIC_DOMAIN}`;
  }
  return import.meta.env.VITE_SITE_URL || "https://celiadunsmorecounselling.com.au";
};

export const getAbsoluteUrl = (path: string): string => {
  const baseUrl = getSiteUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

// Common site URLs for easy access
export const siteUrls = {
  home: () => getSiteUrl(),
  about: () => getAbsoluteUrl('/meet-celia'),
  services: () => getAbsoluteUrl('/services'),
  locations: () => getAbsoluteUrl('/locations'),
  diversity: () => getAbsoluteUrl('/client-diversity'),
  contact: () => getAbsoluteUrl('/contact'),
  faq: () => getAbsoluteUrl('/faq'),
  fees: () => getAbsoluteUrl('/fees'),
};