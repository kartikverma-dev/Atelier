// Atelier Service Worker - Offline Cache v3.0
const CACHE_NAME = "atelier-offline-v3";
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/favicon.ico",
  "/brand/svg/favicon.svg",
  "/brand/svg/atelier-app-icon.svg",
  "/brand/png/app-icon-192.png",
  "/brand/png/app-icon-512.png",
  "/brand/png/app-icon-maskable-512.png",
  "/brand/png/apple-touch-icon.png",
  "/brand/svg/atelier-logo-horizontal-light.svg",
  "/brand/svg/atelier-logo-horizontal-dark.svg",
  "/brand/svg/atelier-logo-horizontal-light-sturdy.svg",
  "/brand/svg/atelier-logo-horizontal-dark-sturdy.svg",
  "/brand/svg/atelier-logo-horizontal-mono-black-sturdy.svg",
  "/brand/svg/atelier-logo-horizontal-mono-white-sturdy.svg",
  "/brand/svg/atelier-logo-stacked-light.svg",
  "/brand/svg/atelier-logo-stacked-dark.svg",
  "/brand/svg/atelier-logo-stacked-light-sturdy.svg",
  "/brand/svg/atelier-logo-stacked-dark-sturdy.svg",
  "/brand/svg/atelier-logo-stacked-mono-black-sturdy.svg",
  "/brand/svg/atelier-logo-stacked-mono-white-sturdy.svg",
  "/brand/svg/atelier-mark-light.svg",
  "/brand/svg/atelier-mark-dark.svg",
  "/brand/svg/atelier-mark-light-sturdy.svg",
  "/brand/svg/atelier-mark-dark-sturdy.svg",
  "/brand/svg/atelier-mark-mono-black-sturdy.svg",
  "/brand/svg/atelier-mark-mono-white-sturdy.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request)
        .then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            event.request.url.startsWith(self.location.origin)
          ) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and navigating to a page, serve cached root
          if (event.request.mode === "navigate") {
            return caches.match("/");
          }
          return null;
        });
    })
  );
});
