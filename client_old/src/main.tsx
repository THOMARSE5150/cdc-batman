import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Preload critical assets
const preloadCriticalAssets = () => {
  const criticalImages = [
    '/images/celia-portrait-optimized.webp',
    '/images/logo.png'
  ];
  
  criticalImages.forEach(imagePath => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = imagePath;
    document.head.appendChild(link);
  });
};

// Preload critical fonts
const preloadFonts = () => {
  const fontFiles = [
    '/fonts/inter-var.woff2'
  ];
  
  fontFiles.forEach(fontPath => {
    if (fontPath) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.href = fontPath;
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  });
};

// Array of direct paths that should redirect to the home page
const directAccessPaths = ["/booking", "/fees", "/faq", "/services", "/client-diversity", "/meet-celia", "/contact"];

// Ensure we're going to the home page if the user accesses these specific pages directly
if (directAccessPaths.includes(window.location.pathname) && !window.location.search && !window.location.hash) {
  // Don't redirect if coming from a user navigation (check referrer)
  if (!document.referrer || new URL(document.referrer).host !== window.location.host) {
    // Redirect to the homepage
    window.history.replaceState({}, "", "/");
  }
}

// Execute preloading
preloadCriticalAssets();
preloadFonts();

createRoot(document.getElementById("root")!).render(<App />);
