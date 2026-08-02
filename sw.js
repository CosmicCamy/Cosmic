const CACHE_NAME = 'cosmic-player-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './Cosmic.png'
];

// Install the service worker and cache your app files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activate worker and clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Fetch event listener to allow the app to work background/offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
