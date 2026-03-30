const CACHE = "palabrasb2-v2";
const ASSETS = [
  "/palabrasB2.html",
  "/manifest.json",
  "/icon.svg",
  "/DATA.json"
];

// Instalación: guarda todos los recursos en caché
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activación: elimina cachés viejos
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: red primero, actualiza caché; si falla usa caché (offline)
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
