const CACHE = "plan30-v1";
const ASSETS = [
  "/plan.html",
  "/styles.css",
  "/manifest-plan.json",
  "/icon-plan.svg",
  "/plan.js",
  "/config.js",
  "/auth.js",
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"
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
      Promise.all(
        keys
          .filter((k) => k.startsWith("plan30-") && k !== CACHE)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// --- IndexedDB helpers (para leer/escribir fechas de uso y notificación) ---
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

// Periodic Background Sync: recordatorio a las 18:00 si no practicó hoy
self.addEventListener("periodicsync", (e) => {
  if (e.tag === "recordatorio-aleman-plan") {
    e.waitUntil(
      (async () => {
        const now = new Date();
        // Solo actuar entre las 18:00 y 20:00
        if (now.getHours() < 18 || now.getHours() >= 20) return;

        const hoy = now.toDateString();
        const db = await abrirUsageDB();

        // Si el usuario ya usó la app hoy, no notificar
        if (await getMeta(db, "lastUsed-plan") === hoy) return;

        // Si ya se notificó hoy, no repetir
        if (await getMeta(db, "lastNotified-plan") === hoy) return;

        await self.registration.showNotification("Plan 30 días", {
          body: "¡Todavía no revisaste tu día de hoy!",
          icon: "/icon-plan.svg",
          badge: "/icon-plan.svg",
          tag: "recordatorio-plan",
          renotify: true,
          data: { url: "/plan.html" }
        });
        await setMeta(db, "lastNotified-plan", hoy);
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
      icon: "/icon-plan.svg",
      badge: "/icon-plan.svg",
      tag: "recordatorio-push",
      renotify: true,
      data: { url: data.url || "/plan.html" },
    })
  );
});

// Al hacer clic en la notificación, abre la app
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: "window" }).then((cs) => {
      const url = (e.notification.data && e.notification.data.url) || "/plan.html";
      const open = cs.find((c) => c.url.includes("plan.html") && "focus" in c);
      if (open) return open.focus();
      return clients.openWindow(url);
    })
  );
});

// Fetch: red primero, actualiza caché; si falla usa caché (offline)
// Solo cachea GET de assets propios — ignora POST/API calls
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (!ASSETS.some((a) => url.pathname === a)) return;

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
