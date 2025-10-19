const CACHE_NAME = 'goldgain-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/signup.html',
  '/login.html',
  '/dashboard.html',
  '/tasks.html',
  '/membership.html',
  '/referrals.html',
  '/withdraw.html',
  '/profile.html',
  '/support.html',
  '/css/styles.css',
  '/js/app.js',
  '/icon-192x192.png',
  '/icon-512x512.png',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
