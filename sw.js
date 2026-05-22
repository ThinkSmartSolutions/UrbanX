/* UrbanX Service Worker v4.3 — 20260522
   - Ucide cache-ul v4.0, v4.1, v4.2
   - index.html: no-store (mereu proaspăt)
   - JS/CSS: network-first cu timeout 4s
   - GeoJSON/JSON data: network-first
*/
const CACHE = 'urbanx-v4.3';
const OLD_CACHES = ['urbanx-v4.0','urbanx-v4.1','urbanx-v4.2','mapbox-tiles'];

/* Redirect căi greșite și la nivel SW */
const PATH_FIX = {
  '/UrbanX/data/municipii-iasi/pug.geojson':       '/UrbanX/js/data/municipiul-iasi/pug.geojson',
  '/UrbanX/data/municipii-iasi/reguli.json':        '/UrbanX/js/data/municipiul-iasi/reguli.json',
  '/UrbanX/data/municipii-iasi/cadastru_index.json':'/UrbanX/js/data/municipiul-iasi/meta.json',
  '/UrbanX/data/municipii-suceava/pug.geojson':     '/UrbanX/js/data/municipiul-suceava/pug.geojson',
  '/UrbanX/data/municipii-suceava/reguli.json':     '/UrbanX/js/data/municipiul-suceava/reguli.json',
  '/UrbanX/gGis_pug_iasi.geojson':                 '/UrbanX/js/data/municipiul-iasi/pug.geojson',
  '/UrbanX/qGis_pug_iasi.geojson':                 '/UrbanX/js/data/municipiul-iasi/pug.geojson',
  '/UrbanX/qGis_pug.iasi.geojson':                 '/UrbanX/js/data/municipiul-iasi/pug.geojson',
  '/UrbanX/cadastru_index.json':                   '/UrbanX/js/data/municipiul-iasi/meta.json',
};

function fixUrl(url) {
  var u = new URL(url);
  var fixed = PATH_FIX[u.pathname];
  if (fixed) return new URL(fixed, u.origin).href;
  /* prefix js/data/iasi/ → municipiul-iasi/ */
  if (u.pathname.includes('/js/data/iasi/')) {
    u.pathname = u.pathname.replace('/js/data/iasi/', '/js/data/municipiul-iasi/');
    return u.href;
  }
  return url;
}

self.addEventListener('install', e => {
  console.log('[SW v4.3] Install');
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  console.log('[SW v4.3] Activate — șterg cache vechi');
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => OLD_CACHES.includes(k) || (k.startsWith('urbanx-') && k !== CACHE))
        .map(k => { console.log('[SW v4.3] Șterg:', k); return caches.delete(k); }))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = fixUrl(req.url);
  const fixedReq = url !== req.url ? new Request(url, { method: req.method, headers: req.headers, mode: req.mode === 'navigate' ? 'same-origin' : req.mode, credentials: req.credentials, redirect: req.redirect }) : req;
  const pathname = new URL(url).pathname;

  /* index.html: no-store mereu */
  if (pathname === '/UrbanX/' || pathname === '/UrbanX/index.html') {
    e.respondWith(fetch(fixedReq, { cache: 'no-store' }).catch(() => caches.match(fixedReq)));
    return;
  }

  /* JS/CSS/GeoJSON/JSON: network-first cu timeout 4s */
  if (/\.(js|css|geojson|json)(\?|$)/.test(pathname)) {
    e.respondWith(
      Promise.race([
        fetch(fixedReq).then(r => {
          if (r.ok && (pathname.endsWith('.js') || pathname.endsWith('.css'))) {
            const clone = r.clone();
            caches.open(CACHE).then(c => c.put(fixedReq, clone));
          }
          return r;
        }),
        new Promise((_, reject) => setTimeout(() => reject('timeout'), 4000))
      ]).catch(() => caches.match(fixedReq))
    );
    return;
  }

  /* Mapbox tiles: cache-first */
  if (url.includes('mapbox') || url.includes('tiles')) {
    e.respondWith(
      caches.match(req).then(cached => cached || fetch(req).then(r => {
        const clone = r.clone();
        caches.open(CACHE).then(c => c.put(req, clone));
        return r;
      }))
    );
    return;
  }

  /* Rest: network */
  e.respondWith(fetch(fixedReq));
});
