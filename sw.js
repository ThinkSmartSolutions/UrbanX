/* UrbanX Service Worker v4.3e — 20260522
   Ucide cache v4.0/4.1/4.2/4.3
   Iasi: data/municipiul-iasi/ (root)
   Suceava: js/data/municipiul-suceava/
*/
const CACHE = 'urbanx-v4.3e';
const OLD = ['urbanx-v4.0','urbanx-v4.1','urbanx-v4.2','urbanx-v4.3','mapbox-tiles'];

function fixUrl(url) {
  try {
    var u = new URL(url);
    var p = u.pathname;
    /* Iasi - variante gresite */
    if (/\/data\/municipii[_-]iasi\//i.test(p))
      return url.replace(/\/data\/municipii[_-]iasi\//i, '/data/municipiul-iasi/');
    if (/\/js\/data\/(iasi|municipiul-iasi)\//i.test(p))
      return url.replace(/\/js\/data\/(iasi|municipiul-iasi)\//i, '/data/municipiul-iasi/');
    if (/\/[gq][Gg]is[_.]pug[_.]?iasi/i.test(p))
      return url.replace(/\/[gq][Gg]is[_.]pug[_.]?iasi[^?]*/i, '/data/municipiul-iasi/pug.geojson');
    if (p.endsWith('/cadastru_index.json') && !p.includes('/data/'))
      return url.replace('/cadastru_index.json', '/data/municipiul-iasi/cadastru_index.json');
    /* Suceava - variante gresite */
    if (/\/data\/municipii[_-]suceava\//i.test(p))
      return url.replace(/\/data\/municipii[_-]suceava\//i, '/js/data/municipiul-suceava/');
  } catch(e) {}
  return url;
}

self.addEventListener('install', e => {
  console.log('[SW v4.3e] Install');
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  console.log('[SW v4.3e] Activate — sterg cache vechi');
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => OLD.includes(k) || (k.startsWith('urbanx-') && k !== CACHE))
          .map(k => { console.log('[SW v4.3e] Sterg:', k); return caches.delete(k); })
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  /* Ignora POST/PUT/DELETE - nu se pot pune in cache */
  if (req.method !== 'GET') return;

  const fixed = fixUrl(req.url);
  const useReq = fixed !== req.url ? new Request(fixed, {
    headers: req.headers,
    credentials: req.credentials,
    redirect: req.redirect
  }) : req;

  const path = new URL(fixed).pathname;

  /* index.html: mereu de la network */
  if (path === '/UrbanX/' || path === '/UrbanX/index.html') {
    e.respondWith(fetch(useReq, { cache: 'no-store' }).catch(() => caches.match(req)));
    return;
  }

  /* JS/CSS/JSON/GeoJSON: network-first */
  if (/\.(js|css|geojson|json)(\?|$)/.test(path)) {
    e.respondWith(
      fetch(useReq, { cache: 'no-store' })
        .then(r => {
          if (r.ok && r.status === 200) {
            const clone = r.clone();
            caches.open(CACHE).then(c => c.put(useReq, clone));
          }
          return r;
        })
        .catch(() => caches.match(useReq) || caches.match(req))
    );
    return;
  }

  /* Mapbox tiles: cache-first */
  if (fixed.includes('mapbox') || fixed.includes('tiles')) {
    e.respondWith(
      caches.match(req).then(cached =>
        cached || fetch(req).then(r => {
          if (r.ok) caches.open(CACHE).then(c => c.put(req, r.clone()));
          return r;
        })
      )
    );
    return;
  }

  e.respondWith(fetch(useReq));
});
