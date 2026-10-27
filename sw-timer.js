const CACHE = "timer-v2";
const SOUNDS = ["campana", "gong", "ding-dong", "fanfarria", "marimba", "digital",
  "despertador", "pitido", "doble-pitido", "tick", "tick-grave", "tick-agudo", "tick-madera"].map((s) => "/sounds/" + s + ".mp3");
const ASSETS = [
  "/timer.html",
  "/timer.js",
  "/styles.css",
  "/manifest-timer.json",
  "/icon-timer.svg",
  "/config.js",
  "/auth.js",
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js",
  ...SOUNDS
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k.startsWith("timer-") && k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Network first for app files so updates land; cache first for the immutable sounds.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  const key = url.origin === location.origin ? url.pathname : url.href;
  if (!ASSETS.includes(key)) return;

  if (SOUNDS.includes(key)) {
    e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
    return;
  }
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
