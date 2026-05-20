// ═══════════════════════════════════════════════════════════════════════════
// URBANX — SERVICE WORKER v4.2
// index.html: NEVER cache — mereu din network
// JS/CSS: network-first (versionate cu ?v=)
// API: cache 24h
// ═══════════════════════════════════════════════════════════════════════════

const CACHE_STATIC  = 'urbanx-static-v4.2';
const CACHE_API     = 'urbanx-api-v4.2';
const CACHE_DURATION = 24 * 60 * 60 * 1000;

const API_DOMAINS = [
  'statistici.insse.ro',
  'ec.europa.eu',
  'corsproxy.io',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then(cache => cache.addAll([]).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_STATIC && k !== CACHE_API)
          .map(k => {
            console.log('[SW] Șterg cache vechi:', k);
            return caches.delete(k);
          })
      )
    ).then(() => self.clients.claim())
      .then(() => console.log('[SW] UrbanX v4.2 activ'))
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;

  // index.html și orice HTML: ÎNTOTDEAUNA din network, niciodată din cache
  if(isSameOrigin && (
    url.pathname === '/' ||
    url.pathname === '/UrbanX/' ||
    url.pathname.endsWith('/') ||
    url.pathname.endsWith('.html')
  )) {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // JS și CSS: network-first (versionate)
  if(isSameOrigin && (
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css')
  )) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if(response.ok) {
            const clone = response.clone();
            caches.open(CACHE_STATIC).then(c => c.put(event.request, clone)).catch(() => {});
          }
          return response;
        })
        .catch(() => caches.match(event.request)
          .then(cached => cached || new Response('Offline', {status: 503})))
    );
    return;
  }

  // API-uri externe: cache 24h
  if(API_DOMAINS.some(d => url.hostname.includes(d))) {
    event.respondWith(handleAPIRequest(event.request));
    return;
  }

  // Altele: cache-first
  if(isSameOrigin) {
    event.respondWith(
      caches.match(event.request)
        .then(cached => cached || fetch(event.request).then(response => {
          if(response.ok) {
            caches.open(CACHE_STATIC).then(c => c.put(event.request, response.clone())).catch(() => {});
          }
          return response;
        }))
        .catch(() => new Response('Offline', {status: 503}))
    );
    return;
  }

  event.respondWith(fetch(event.request).catch(() => new Response('Offline', {status: 503})));
});

async function handleAPIRequest(request) {
  const cache = await caches.open(CACHE_API);
  const cacheKey = new Request(request.url);
  const cached = await cache.match(cacheKey);
  if(cached) {
    const cacheTime = parseInt(cached.headers.get('X-Cache-Time') || '0');
    if(Date.now() - cacheTime < CACHE_DURATION) return cached;
  }
  try {
    const response = await fetch(request);
    if(response.ok) {
      const headers = new Headers(response.headers);
      headers.set('X-Cache-Time', Date.now().toString());
      const toCache = new Response(await response.clone().arrayBuffer(), {
        status: response.status, statusText: response.statusText, headers,
      });
      await cache.put(cacheKey, toCache);
    }
    return response;
  } catch(e) {
    if(cached) return cached;
    return new Response(JSON.stringify({error:'Offline'}), {
      status: 503, headers: {'Content-Type':'application/json'},
    });
  }
}

self.addEventListener('message', event => {
  const respond = (data) => {
    try {
      if(event.ports && event.ports[0]) event.ports[0].postMessage(data || {type:'OK'});
    } catch(e) {}
  };
  if(event.data?.type === 'SKIP_WAITING') { self.skipWaiting(); respond({type:'SKIP_WAITING_DONE'}); return; }
  if(event.data?.type === 'CLEAR_CACHE') {
    event.waitUntil(
      Promise.all([caches.delete(CACHE_STATIC), caches.delete(CACHE_API)])
        .then(() => { try { event.source?.postMessage({type:'CACHE_CLEARED'}); } catch(e){} respond({type:'CACHE_CLEARED'}); })
        .catch(e => respond({type:'ERROR', message: e.message}))
    );
    return;
  }
  respond({type:'RECEIVED', received: event.data?.type || 'unknown'});
});
