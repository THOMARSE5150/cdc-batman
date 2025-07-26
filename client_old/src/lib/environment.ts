// Environment configuration for static deployment detection

// Function to detect if we're running in a static environment (no backend APIs)
export function isStaticEnvironment(): boolean {
  // Check for environment variable set during build time
  if (import.meta.env.VITE_STATIC_DEPLOYMENT === 'true') {
    return true;
  }

  // In development, we're definitely not in a static environment
  if (import.meta.env.DEV === true || process.env.NODE_ENV === 'development') {
    // However, allow static mode testing in development with URL param
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('static') === 'true') {
      return true;
    }
    return false;
  }

  // For production, check if we're deployed on static hosting
  // These are common domains/subdomains used by static hosting providers
  if (typeof window !== 'undefined') {
    const { hostname, href } = window.location;
    
    // Check for common static hosting domains
    if (
      hostname.includes('.netlify.app') ||
      hostname.includes('.vercel.app') ||
      hostname.includes('.pages.dev') ||
      hostname.includes('.github.io') ||
      hostname.includes('.replit.app') ||
      hostname.includes('celiadunsmoorecounselling.com') ||
      hostname.includes('celiadunsmoorecounselling.com.au')
    ) {
      return true;
    }
    
    // If deployed to a domain with a specific static path
    if (href.includes('/static/') || href.includes('/static-site/')) {
      return true;
    }
    
    // For testing purposes in production, you can add a URL parameter ?static=true
    if (new URLSearchParams(window.location.search).get('static') === 'true') {
      return true;
    }
    
    // Check if we're in a mobile app WebView context
    if (window.navigator.userAgent.includes('wv') || 
        window.navigator.userAgent.includes('Mobile') && 
        !window.navigator.userAgent.includes('Chrome')) {
      return true;
    }
  }

  // Try to detect if we're in a static file deployment
  // This is a little tricky but helpful for automatic detection
  try {
    if (typeof window !== 'undefined') {
      // Check for existence of a file that would only exist in a static build
      const staticIndicatorScript = document.querySelector('script[src*="static/js"]');
      if (staticIndicatorScript) {
        return true;
      }
    }
  } catch (e) {
    console.warn('Error checking for static indicator:', e);
  }

  // Default to dynamic environment unless explicitly specified
  return false;
}

// Function to check if API endpoints are available
export async function checkApiAvailability(): Promise<boolean> {
  try {
    // Try to ping a simple API endpoint with a short timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);
    
    const response = await fetch('/api/test-json', {
      signal: controller.signal,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.log('API availability check failed:', error);
    return false;
  }
}

// Global cached API availability state
let cachedApiAvailable: boolean | null = null;

// Function to get or check API availability
export async function getApiAvailability(): Promise<boolean> {
  if (cachedApiAvailable === null) {
    cachedApiAvailable = await checkApiAvailability();
  }
  return cachedApiAvailable;
}

// Helper to determine if we should use static versions of components
export async function shouldUseStaticComponents(): Promise<boolean> {
  if (isStaticEnvironment()) {
    return true;
  }
  
  // Even in dynamic environments, use static if API is unavailable
  const apiAvailable = await getApiAvailability();
  return !apiAvailable;
}