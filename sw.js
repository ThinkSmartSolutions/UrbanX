// ═══════════════════════════════════════════════════════════════════════════
// URBANX — SERVICE WORKER v4.0 (network-first pentru JS, cache pentru API)
// Fix: versiunile vechi nu mai sunt servite din cache pentru fișiere JS
// ═══════════════════════════════════════════════════════════════════════════

const CACHE_VERSION = 'urbanx-v4.0';
const CACHE_STATIC  = 'urbanx-static-v4.0';
const CACHE_API     = 'urbanx-api-v4.0';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24h pentru API

// Domenii API care se cacheaza (24h)
const API_DOMAINS = [
  'statistici.insse.ro',
  'ec.europa.eu',
  'corsproxy.io',
];

// ── INSTALL: cache minim (fără JS — JS mereu din network) ─────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then(cache => cache.addAll([]).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: șterge cache-uri vechi ─────────────────────────────────────
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
      .then(() => console.log('[SW] UrbanX v4.0 activ — JS mereu din network'))
  );
});

// ── FETCH: strategie unică, clară ────────────────────────────────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;

  // 1. Fișiere JS și HTML: MEREU din network (nu cache)
  //    Asta garantează că ?v=20260516 aduce mereu versiunea nouă
  if(isSameOrigin && (
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.css')
  )) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cacheaza pentru offline fallback (nu pentru a servi versiuni vechi)
          if(response.ok && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_STATIC).then(c => {
              // Stocam cu query string inclus — cheia exactă
              c.put(event.request, clone);
            }).catch(() => {});
          }
          return response;
        })
        .catch(() => {
          // Offline: încearcă din cache ca fallback
          return caches.match(event.request)
            .then(cached => cached || new Response('Offline', {status: 503}));
        })
    );
    return;
  }

  // 2. API-uri externe (INSE, Eurostat etc.): cache 24h
  if(API_DOMAINS.some(d => url.hostname.includes(d))) {
    event.respondWith(handleAPIRequest(event.request));
    return;
  }

  // 3. Altele (imagini, fonturi, etc.): cache-first cu fallback network
  if(isSameOrigin) {
    event.respondWith(
      caches.match(event.request)
        .then(cached => cached || fetch(event.request).then(response => {
          if(response.ok) {
            caches.open(CACHE_STATIC).then(c => c.put(event.request, response.clone())).catch(()=>{});
          }
          return response;
        }))
        .catch(() => new Response('Offline', {status: 503}))
    );
    return;
  }

  // 4. Cross-origin: network direct
  event.respondWith(fetch(event.request).catch(() => new Response('Offline', {status: 503})));
});

// ── Handler API cu cache 24h ──────────────────────────────────────────────
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
        status: response.status,
        statusText: response.statusText,
        headers,
      });
      await cache.put(cacheKey, toCache);
    }
    return response;
  } catch(e) {
    if(cached) return cached;
    return new Response(JSON.stringify({error: 'Offline'}), {
      status: 503,
      headers: {'Content-Type': 'application/json'},
    });
  }
}

// ── Message handler ───────────────────────────────────────────────────────
// FIX: Răspundem ÎNTOTDEAUNA pe event.ports[0] dacă există.
// Altfel Chrome aruncă: "A listener indicated an asynchronous response by
// returning true, but the message channel closed before a response was received"
self.addEventListener('message', event => {
  // Helper: răspunde pe portul MessageChannel dacă pagina l-a transmis
  const respond = (data) => {
    try {
      if(event.ports && event.ports[0])
        event.ports[0].postMessage(data || {type:'OK'});
    } catch(e) { /* portul poate fi deja închis */ }
  };

  if(event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
    respond({type:'SKIP_WAITING_DONE'});
    return;
  }

  if(event.data?.type === 'CLEAR_CACHE') {
    event.waitUntil(
      Promise.all([caches.delete(CACHE_STATIC), caches.delete(CACHE_API)])
        .then(() => {
          try { event.source?.postMessage({type:'CACHE_CLEARED'}); } catch(e){}
          respond({type:'CACHE_CLEARED'});
        })
        .catch(e => respond({type:'ERROR', message: e.message}))
    );
    return;
  }

  // Orice alt mesaj: acknowledge imediat pentru a nu lăsa portul deschis
  respond({type:'RECEIVED', received: event.data?.type || 'unknown'});
});
