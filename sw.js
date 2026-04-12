const CACHE = "palabrasb2-v3";
const ASSETS = [
  "/palabrasB2.html",
  "/styles.css",
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

// Periodic Background Sync: recordatorio diario de práctica
self.addEventListener("periodicsync", (e) => {
  if (e.tag === "recordatorio-aleman-b2") {
    e.waitUntil(
      self.registration.showNotification("Alemán B2", {
        body: "¡5 minutos de práctica hoy! Mantén tu racha.",
        icon: "/icon.svg",
        badge: "/icon.svg",
        tag: "recordatorio-b2",
        renotify: true,
        data: { url: "/palabrasB2.html" }
      })
    );
  }
});

// Al hacer clic en la notificación, abre la app
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: "window" }).then((cs) => {
      const url = (e.notification.data && e.notification.data.url) || "/palabrasB2.html";
      const open = cs.find((c) => c.url.includes("palabrasB2") && "focus" in c);
      if (open) return open.focus();
      return clients.openWindow(url);
    })
  );
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
