const CACHE = "palabrasb1-v1";
const ASSETS = [
  "/B1.html",
  "/styles.css",
  "/manifest-b1.json",
  "/icon-b1.svg",
  "/DataB1.json"
];

// Instalacion: guarda todos los recursos en cache
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activacion: elimina caches viejos de B1 (no toca caches de otras apps)
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k.startsWith("palabrasb1-") && k !== CACHE)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch: red primero, actualiza cache; si falla usa cache (offline)
self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(e.request, copy));
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
