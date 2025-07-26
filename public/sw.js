/**
 * Service Worker for Performance Optimization
 * Implements aggressive caching for critical resources
 * Targets bundle size reduction and faster subsequent loads
 */

const CACHE_NAME = 'celia-counselling-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/src/index.css',
  '/src/main.tsx',
  '/images/celia-logo-new.png',
  '/images/header_logo.png',
  '/images/celia-portrait-optimized.webp',
  '/images/hero_image_canva_optimized.webp'
];

// Static assets to cache
const STATIC_ASSETS = [
  '/meet-celia',
  '/services',
  '/contact',
  '/fees',
  '/faq'
];

self.addEventListener('install', event => {
  console.log('[SW] Installing service worker for performance optimization');
  
  event.waitUntil(
    Promise.all([
      // Cache critical resources
      caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(CRITICAL_RESOURCES.filter(url => url));
      }),
      // Cache static assets
      caches.open(STATIC_CACHE).then(cache => {
        return cache.addAll(STATIC_ASSETS);
      })
    ]).then(() => {
      console.log('[SW] Critical resources cached for performance');
      return self.skipWaiting();
    }).catch(error => {
      console.log('[SW] Cache installation failed:', error);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE)
            .map(cacheName => caches.delete(cacheName))
        );
      }),
      // Take control immediately
      self.clients.claim()
    ])
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external domains
  if (url.origin !== location.origin) {
    return;
  }
  
  // Performance-first caching strategy
  if (isCriticalResource(request.url)) {
    // Critical resources: Cache first, then network
    event.respondWith(cacheFirst(request));
  } else if (isStaticAsset(request.url)) {
    // Static assets: Network first with cache fallback
    event.respondWith(networkFirst(request));
  } else if (isAPIRequest(request.url)) {
    // API requests: Network only
    event.respondWith(fetch(request));
  } else {
    // Other resources: Stale while revalidate
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Check if resource is critical for performance
function isCriticalResource(url) {
  return CRITICAL_RESOURCES.some(resource => url.includes(resource)) ||
         url.includes('.css') ||
         url.includes('.webp') ||
         url.includes('.png') ||
         url.includes('logo');
}

// Check if resource is a static asset
function isStaticAsset(url) {
  return STATIC_ASSETS.some(asset => url.includes(asset)) ||
         url.includes('.js') ||
         url.includes('.tsx') ||
         url.includes('.ts');
}

// Check if request is to API
function isAPIRequest(url) {
  return url.includes('/api/') || url.includes('webhook');
}

// Cache first strategy for critical resources
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Cache first failed:', error);
    return new Response('Resource unavailable', { status: 503 });
  }
}

// Network first strategy for static assets
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    throw new Error('Network response not ok');
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Resource unavailable', { status: 503 });
  }
}

// Stale while revalidate for other resources
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cachedResponse);
  
  return cachedResponse || fetchPromise;
}

// Performance monitoring
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'PERFORMANCE_LOG') {
    console.log('[SW] Performance data:', event.data.data);
  }
});