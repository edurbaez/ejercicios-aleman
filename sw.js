const CACHE = "palabrasb2-v1";
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

// Fetch: responde desde caché, si falla va a la red
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
