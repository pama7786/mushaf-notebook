const V = 'mnb-202611010742';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'firebase-config.js', 'icons/icon-192.png', 'icons/icon-512.png',
  'quran.json', 'qiraat10.json', 'shatibi.json', 'roots.json', 'qrec.json'];
const DATA_HOSTS = ['cdn.jsdelivr.net', 'api.quran.com', 'api.alquran.cloud'];
const LIBS = ['fonts.googleapis.com', 'fonts.gstatic.com', 'unpkg.com', 'www.gstatic.com'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
async function cacheFirst(req, ign) {
  const hit = await caches.match(req, {ignoreSearch: !!ign}); if (hit) return hit;
  const res = await fetch(req); if (res && (res.ok || res.type === 'opaque')) { const c = await caches.open(V); c.put(req, res.clone()); } return res;
}
async function networkFirst(req) {
  try { const res = await fetch(req); if (res && res.ok) { const c = await caches.open(V); c.put(req, res.clone()); } return res; }
  catch { return (await caches.match(req, {ignoreSearch: true})) || caches.match('index.html'); }
}
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    if (req.mode === 'navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('firebase-config.js')) { e.respondWith(networkFirst(req)); return; }
    e.respondWith(cacheFirst(req, true)); return;
  }
  if (DATA_HOSTS.includes(url.hostname) && (url.hostname !== 'cdn.jsdelivr.net' || url.pathname.includes('/quran-api'))) { e.respondWith(cacheFirst(req)); return; }
  if (LIBS.includes(url.hostname) && !url.pathname.includes('/v1/') && !url.hostname.includes('firestore')) e.respondWith(cacheFirst(req));
});
