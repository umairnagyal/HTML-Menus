/* Service worker · Birreria Oktoberfest menù
   HTML/JS/CSS: network-first (così gli aggiornamenti del menù arrivano subito).
   Immagini e font: cache-first.                                              */
const VERSION = "okt-menu-v4";
const CORE = ["./", "./index.html", "./assets/css/style.css", "./assets/js/menu-fallback.js", "./assets/js/app.js", "./data/menu.json", "./assets/img/logo-card.webp", "./assets/img/wordmark.webp", "./assets/css/fonts.css", "./assets/fonts/barlow-condensed-700.woff2", "./assets/fonts/inter-variable.woff2"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin || /\/(api|admin)\//.test(url.pathname)) return; // pannello e API: mai in cache
  const isAsset = /\.(webp|png|jpg|jpeg|svg|woff2?|ttf)$/i.test(url.pathname) || url.hostname.endsWith("gstatic.com");
  if (isAsset) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok && (url.origin === location.origin || res.type === "cors")) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => hit)));
    return;
  }
  e.respondWith(fetch(req).then(res => {
    if (res.ok && url.origin === location.origin) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req).then(hit => hit || (req.mode === "navigate" ? caches.match("./index.html") : undefined))));
});
