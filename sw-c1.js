const CACHE = "palabrasc1-v1";
const ASSETS = ["/C1.html", "/styles.css", "/manifest-c1.json", "/icon-c1.svg", "/DataC1.json"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k.startsWith("palabrasc1-") && k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("push", (e) => {
  const data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || "¡Practica alemán! 🇩🇪", {
      body: data.body || "Es hora de tu sesión de estudio.",
      icon: "/icon-c1.svg",
      badge: "/icon-c1.svg",
      tag: "recordatorio-push",
      renotify: true,
      data: { url: data.url || "/C1.html" },
    })
  );
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: "window" }).then((cs) => {
      const url = (e.notification.data && e.notification.data.url) || "/C1.html";
      const open = cs.find((c) => c.url.includes("C1") && "focus" in c);
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
