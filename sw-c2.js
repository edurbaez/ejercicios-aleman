const CACHE = "palabrasc2-v4";
const ASSETS = [
  "/C2.html",
  "/styles.css",
  "/manifest-c2.json",
  "/icon-c2.svg",
  "/DataC2.json",
  "/config.js",
  "/auth.js",
  "/shared-game.js",
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"
];

// Instalacion: guarda todos los recursos en cache
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activacion: elimina caches viejos de C2 (no toca caches de otras apps)
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k.startsWith("palabrasc2-") && k !== CACHE)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// --- IndexedDB helpers (para leer/escribir fechas de uso y notificacion) ---
function abrirUsageDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("sw-usage", 1);
    req.onupgradeneeded = (e) => {
      e.target.result.createObjectStore("meta", { keyPath: "key" });
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}
function getMeta(db, key) {
  return new Promise((resolve) => {
    const req = db.transaction("meta", "readonly").objectStore("meta").get(key);
    req.onsuccess = (e) => resolve(e.target.result ? e.target.result.value : null);
    req.onerror = () => resolve(null);
  });
}
function setMeta(db, key, value) {
  return new Promise((resolve) => {
    const tx = db.transaction("meta", "readwrite");
    tx.objectStore("meta").put({ key, value });
    tx.oncomplete = resolve;
    tx.onerror = resolve;
  });
}

// Periodic Background Sync: recordatorio a las 18:00 si no practico hoy
self.addEventListener("periodicsync", (e) => {
  if (e.tag === "recordatorio-aleman-c2") {
    e.waitUntil(
      (async () => {
        const now = new Date();
        // Solo actuar entre las 18:00 y 20:00
        if (now.getHours() < 18 || now.getHours() >= 20) return;

        const hoy = now.toDateString();
        const db = await abrirUsageDB();

        // Si el usuario ya uso la app hoy, no notificar
        if (await getMeta(db, "lastUsed-c2") === hoy) return;

        // Si ya se notifico hoy, no repetir
        if (await getMeta(db, "lastNotified-c2") === hoy) return;

        await self.registration.showNotification("Alemán C2", {
          body: "¡Todavía no practicaste hoy! 5 minutos bastan.",
          icon: "/icon-c2.svg",
          badge: "/icon-c2.svg",
          tag: "recordatorio-c2",
          renotify: true,
          data: { url: "/C2.html" }
        });
        await setMeta(db, "lastNotified-c2", hoy);
      })()
    );
  }
});

// Push notifications from server (Web Push API)
self.addEventListener("push", (e) => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || "¡Practica alemán! 🇩🇪", {
      body: data.body || "Es hora de tu sesión de estudio.",
      icon: "/icon-c2.svg",
      badge: "/icon-c2.svg",
      tag: "recordatorio-push",
      renotify: true,
      data: { url: data.url || "/C2.html" },
    })
  );
});

// Al hacer clic en la notificacion, abre la app
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: "window" }).then((cs) => {
      const url = (e.notification.data && e.notification.data.url) || "/C2.html";
      const open = cs.find((c) => c.url.includes("C2") && "focus" in c);
      if (open) return open.focus();
      return clients.openWindow(url);
    })
  );
});

// Fetch: red primero, actualiza cache; si falla usa cache (offline)
// Solo cachea GET de assets propios — ignora POST/API calls
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (!ASSETS.some((a) => url.pathname === a || url.href === a)) return;

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
