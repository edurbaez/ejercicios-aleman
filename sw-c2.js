const CACHE = "palabrasc2-v2";
const ASSETS = ["/C2.html", "/styles.css", "/manifest-c2.json", "/icon-c2.svg", "/DataC2.json", "/config.js", "/auth.js", "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k.startsWith("palabrasc2-") && k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

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

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (!ASSETS.some((a) => url.pathname === a)) return;
  e.respondWith(
    fetch(e.request).then((r) => {
      caches.open(CACHE).then((c) => c.put(e.request, r.clone()));
      return r;
    }).catch(() => caches.match(e.request))
  );
});
