// ═══════════════════════════════════════════════════════════════════════════
// URBANX — SERVICE WORKER (cache API + assets offline)
// Etapa 4B: Cache INSE/Eurostat/BNR + offline mode
// ═══════════════════════════════════════════════════════════════════════════

const CACHE_VERSION  = 'urbanx-v3.3';
const CACHE_STATIC   = 'urbanx-static-v3.3';
const CACHE_API      = 'urbanx-api-v3.3';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24h pentru API

// Assets statice de cache la install
// Calea relativa corecta per deployment
const _SW_BASE = self.location.pathname.replace('/sw.js','');
const STATIC_ASSETS = [
  _SW_BASE + '/', _SW_BASE + '/index.html',
  '/wx-styles.css',
  '/js/00-packages.js',
  '/js/09-pdf-engine.js',
  '/js/10-studies.js',
  '/js/16-projects.js',
  '/js/17-projection-engine.js',
  '/js/18-animation-engine.js',
  '/js/19-ux-polish.js',
  '/js/20-uats-database.js',
  '/js/21-cloud-sync.js',
];

// Domenii API care se cacheaza
const API_DOMAINS = [
  'statistici.insse.ro',
  'ec.europa.eu/eurostat',
  'www.bnr.ro',
  'api.anthropic.com',
];

// ── INSTALL ────────────────────────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_STATIC).then(cache => {
      // Cache toate asseturile statice
      return Promise.allSettled(
        STATIC_ASSETS.map(url =>
          cache.add(url).catch(e => console.warn('[SW] Nu s-a putut cacha:', url, e.message))
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: curata cache vechi ──────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_STATIC && k !== CACHE_API)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim().then(() => console.log('[SW] UrbanX activ')))
  );
});

// ── FETCH: strategie diferita per tip request ──────────────────────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // API calls: cache-first cu expiry
  if(API_DOMAINS.some(d => url.hostname.includes(d.split('/')[0]))) {
    event.respondWith(handleAPIRequest(event.request));
    return;
  }

  // Assets statice: cache-first
  if(STATIC_ASSETS.some(a => url.pathname === a || url.pathname.endsWith('.css'))) {
    event.respondWith(handleStaticRequest(event.request));
    return;
  }

  // Altele: network-first
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request)
    )
  );
});

// ── Handler API cu cache 24h ───────────────────────────────────────────────
async function handleAPIRequest(request) {
  const cache = await caches.open(CACHE_API);
  const cacheKey = new Request(request.url);

  // Verifica cache
  const cached = await cache.match(cacheKey);
  if(cached) {
    // Verifica expiry (X-Cache-Time header)
    const cacheTime = parseInt(cached.headers.get('X-Cache-Time') || '0');
    const age = Date.now() - cacheTime;
    if(age < CACHE_DURATION) {
      console.log('[SW] Cache hit:', request.url.slice(-60));
      return cached;
    }
  }

  // Fetch live
  try {
    const response = await fetch(request);
    if(response.ok) {
      // Adauga timestamp si salveaza in cache
      const headers = new Headers(response.headers);
      headers.set('X-Cache-Time', Date.now().toString());
      headers.set('X-Cached-URL', request.url);
      const responseToCache = new Response(await response.clone().arrayBuffer(), {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
      await cache.put(cacheKey, responseToCache);
      console.log('[SW] Cached API:', request.url.slice(-60));
    }
    return response;
  } catch(e) {
    // Offline: returna cache vechi chiar daca expirat
    if(cached) {
      console.log('[SW] Offline - returning stale cache:', request.url.slice(-60));
      return cached;
    }
    return new Response(JSON.stringify({ error: 'Offline - no cache available' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// ── Handler assets statice ────────────────────────────────────────────────
async function handleStaticRequest(request) {
  const cached = await caches.match(request);
  if(cached) return cached;

  try {
    const response = await fetch(request);
    if(response.ok) {
      const cache = await caches.open(CACHE_STATIC);
      await cache.put(request, response.clone());
    }
    return response;
  } catch(e) {
    return new Response('Offline', { status: 503 });
  }
}

// ── Background Sync: retry failed requests ────────────────────────────────
self.addEventListener('sync', event => {
  if(event.tag === 'sync-projects') {
    event.waitUntil(syncProjects());
  }
});

async function syncProjects() {
  // Trimite proiectele pending la cloud cand se reconecteaza
  const clients = await self.clients.matchAll();
  clients.forEach(client => client.postMessage({ type: 'SW_SYNC_COMPLETE' }));
}

// ── Message handler: force update ─────────────────────────────────────────
self.addEventListener('message', event => {
  if(event.data?.type === 'SKIP_WAITING') self.skipWaiting();
  if(event.data?.type === 'CLEAR_API_CACHE') {
    caches.delete(CACHE_API).then(() =>
      event.source?.postMessage({ type: 'API_CACHE_CLEARED' })
    );
  }
  if(event.data?.type === 'GET_CACHE_STATS') {
    Promise.all([
      caches.open(CACHE_STATIC).then(c => c.keys()),
      caches.open(CACHE_API).then(c => c.keys()),
    ]).then(([staticKeys, apiKeys]) => {
      event.source?.postMessage({
        type: 'CACHE_STATS',
        static: staticKeys.length,
        api: apiKeys.length,
      });
    });
  }
});


// ── Network-first pentru JS: fișierele se schimbă la orice deploy ─────────
// Adăugat pentru a preveni servirea versiunilor vechi din cache
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if(url.pathname.endsWith('.js') && url.origin === self.location.origin) {
    event.respondWith(
      fetch(event.request).then(response => {
        if(response.ok) {
          caches.open(CACHE_STATIC).then(c => c.put(event.request, response.clone()));
        }
        return response;
      }).catch(() => caches.match(event.request))
    );
  }
}, true); // capture phase — override handler-ul de mai sus pentru .js
