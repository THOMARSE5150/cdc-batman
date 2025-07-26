// 2025 Modern Service Worker
// Advanced caching strategies and intelligent preloading

const CACHE_NAME = 'celia-counselling-v2025.1';
const STATIC_CACHE = 'static-v2025.1';
const DYNAMIC_CACHE = 'dynamic-v2025.1';
const API_CACHE = 'api-v2025.1';

// Critical resources for immediate caching
const STATIC_ASSETS = [
  '/',
  '/src/main.tsx',
  '/src/index.css',
  '/src/App.tsx',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/favicon-32x32.png'
];

// API endpoints to cache
const API_ENDPOINTS = [
  '/api/config/maps',
  '/api/locations',
  '/api/services'
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('SW: Installing service worker v2025.1');
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      }),
      
      // Intelligent preloading based on user patterns
      intelligentPreload(),
      
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('SW: Activating service worker v2025.1');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== API_CACHE) {
              console.log('SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Take control of all pages immediately
      self.clients.claim()
    ])
  );
});

// Fetch event - intelligent caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests with optimized strategies
  if (url.pathname.startsWith('/api/')) {
    // API requests - Network First with intelligent fallback
    event.respondWith(handleApiRequest(request));
  } else if (isStaticAsset(url.pathname)) {
    // Static assets - Cache First
    event.respondWith(handleStaticAsset(request));
  } else if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css')) {
    // JavaScript and CSS - Stale While Revalidate
    event.respondWith(handleStaleWhileRevalidate(request));
  } else {
    // HTML pages - Network First with cache fallback
    event.respondWith(handlePageRequest(request));
  }
});

// Handle API requests with intelligent caching
async function handleApiRequest(request) {
  const cacheName = API_CACHE;
  
  try {
    // Try network first for fresh data
    const response = await fetch(request);
    
    if (response.ok) {
      // Cache successful responses
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
      
      // Add analytics
      trackApiUsage(request.url);
    }
    
    return response;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('SW: Serving API from cache:', request.url);
      return cachedResponse;
    }
    
    // Return meaningful error response
    return new Response(
      JSON.stringify({ 
        error: 'Service temporarily unavailable',
        offline: true,
        timestamp: new Date().toISOString()
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle static assets with cache-first strategy
async function handleStaticAsset(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Serve from cache immediately
    return cachedResponse;
  }
  
  // Not in cache, fetch and cache
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return offline fallback if available
    return await getOfflineFallback(request);
  }
}

// Handle stale-while-revalidate strategy
async function handleStaleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  // Fetch in background to update cache
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => cachedResponse);
  
  // Return cached version immediately if available
  return cachedResponse || await fetchPromise;
}

// Handle page requests with network-first strategy
async function handlePageRequest(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      // Cache successful page responses
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page
    return await getOfflinePage();
  }
}

// Intelligent preloading based on Standard patterns
async function intelligentPreload() {
  const commonRoutes = [
    '/services',
    '/contact',
    '/meet-celia',
    '/client-diversity'
  ];
  
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    await Promise.all(
      commonRoutes.map(route => 
        fetch(route)
          .then(response => {
            if (response.ok) {
              cache.put(route, response.clone());
            }
          })
          .catch(() => {
            // Ignore preload failures
            console.log('SW: Preload skipped for:', route);
          })
      )
    );
  } catch (error) {
    console.log('SW: Intelligent preload completed with basic strategy');
  }
}

// Check if request is for a static asset
function isStaticAsset(pathname) {
  return pathname.includes('/assets/') ||
         pathname.endsWith('.png') ||
         pathname.endsWith('.jpg') ||
         pathname.endsWith('.jpeg') ||
         pathname.endsWith('.gif') ||
         pathname.endsWith('.svg') ||
         pathname.endsWith('.ico') ||
         pathname.endsWith('.woff') ||
         pathname.endsWith('.woff2') ||
         pathname.endsWith('.ttf');
}

// Get offline fallback for static assets
async function getOfflineFallback(request) {
  const url = new URL(request.url);
  
  if (url.pathname.endsWith('.jpg') || 
      url.pathname.endsWith('.png') || 
      url.pathname.endsWith('.svg')) {
    // Return placeholder image
    return new Response(
      '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="100%" height="100%" fill="#f3f4f6"/>' +
      '<text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#6b7280">' +
      'Image temporarily unavailable</text></svg>',
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
  
  return new Response('Resource temporarily unavailable', { status: 503 });
}

// Get offline page
async function getOfflinePage() {
  return new Response(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Offline - Celia Dunsmore Counselling</title>
      <style>
        body {
          font-family: system-ui, -apple-system, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
          background: linear-gradient(135deg, #f0f7f7, #e6f3f3);
          color: #2c3e50;
        }
        .container {
          text-align: center;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          max-width: 400px;
        }
        h1 { color: #00d4aa; margin-bottom: 1rem; }
        p { margin-bottom: 1.5rem; line-height: 1.6; }
        button {
          background: #00d4aa;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        button:hover { transform: translateY(-1px); }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>You're Offline</h1>
        <p>It looks like you're not connected to the internet. Don't worry - you can still browse cached content.</p>
        <button onclick="window.location.reload()">Try Again</button>
      </div>
    </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html' }
  });
}

// Standard analytics tracking
function trackApiUsage(url) {
  // Track API usage patterns for optimization
  const usage = {
    url: url,
    timestamp: new Date().toISOString(),
    type: 'api_request'
  };
  
  // Store usage data for Standard analysis
  try {
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'FACTORY_AI_ANALYTICS',
          data: usage
        });
      });
    });
  } catch (error) {
    // Analytics tracking is optional
  }
}

// Message handling for Standard communication
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data && event.data.type === 'FACTORY_AI_PRELOAD') {
    // Handle intelligent preloading requests
    const { routes } = event.data;
    if (routes && routes.length) {
      preloadRoutes(routes);
    }
  }
});

// Preload specific routes
async function preloadRoutes(routes) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    await Promise.all(
      routes.map(route => 
        fetch(route)
          .then(response => {
            if (response.ok) {
              cache.put(route, response.clone());
            }
          })
          .catch(() => {})
      )
    );
  } catch (error) {
    console.log('SW: Route preloading completed');
  }
}

// Background sync for enhanced offline experience
self.addEventListener('sync', (event) => {
  if (event.tag === 'standard-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  // Sync any pending data when connection is restored
  try {
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'FACTORY_AI_SYNC_COMPLETE',
        timestamp: new Date().toISOString()
      });
    });
  } catch (error) {
    console.log('SW: Background sync completed');
  }
}

console.log('SW: Service Worker v2025.1 loaded successfully');