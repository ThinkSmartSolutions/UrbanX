/* UrbanX SW v4.7 — cleanup agresiv + network-only forțat */
const CACHE='urbanx-v4.7';
const OLD=[
  'urbanx-v4.0','urbanx-v4.1','urbanx-v4.2','urbanx-v4.3',
  'urbanx-v4.3e','urbanx-v4.3f','urbanx-v4.3h','mapbox-tiles',
  'urbanx-v4.3i','urbanx-v4.3j','urbanx-v4.4','urbanx-v4.5','urbanx-v4.6'
];

function fix(url){
  try{
    var p=new URL(url).pathname;
    if(/\/data\/municipii.iasi\//i.test(p)) return url.replace(/\/data\/municipii.iasi\//i,'/data/municipiul-iasi/');
    if(/\/js\/data\/(iasi|municipiul-iasi)\//i.test(p)) return url.replace(/\/js\/data\/(iasi|municipiul-iasi)\//i,'/data/municipiul-iasi/');
    if(/\/[gq]gis.pug.iasi/i.test(p)) return url.replace(/\/[gq]gis.pug.iasi[^?]*/i,'/data/municipiul-iasi/pug.geojson');
    if(/\/data\/municipii.suceava\//i.test(p)) return url.replace(/\/data\/municipii.suceava\//i,'/js/data/municipiul-suceava/');
  }catch(e){}
  return url;
}

self.addEventListener('install', e => {
  console.log('[SW v4.7] Install — forțez skipWaiting');
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', e => {
  console.log('[SW v4.7] Activate — cleanup TOATE cache-urile vechi');
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      // Sterg TOATE cache-urile care NU sunt v4.7 (inclusiv v4.5, v4.6)
      keys.filter(k => k !== CACHE)
        .map(k => { console.log('[SW v4.7] Sterg cache vechi:', k); return caches.delete(k); })
    )).then(() => {
      console.log('[SW v4.7] Claim clients');
      return self.clients.claim();
    }).then(() => {
      // Forțează reload pe toate ferestrele active pentru a primi codul nou
      return self.clients.matchAll({ type: 'window' }).then(clients => {
        clients.forEach(client => {
          console.log('[SW v4.7] Forțez reload client:', client.url);
          try { client.navigate(client.url); } catch(e){}
        });
      });
    })
  );
});

self.addEventListener('fetch', e => {
  if(e.request.method !== 'GET') return;
  const url = fix(e.request.url);
  const req = url !== e.request.url
    ? new Request(url, {
        headers: e.request.headers,
        credentials: e.request.credentials,
        redirect: e.request.redirect
      })
    : e.request;
  // Network only - ZERO cache. Dacă eșuează network, cache fallback
  e.respondWith(
    fetch(req, {cache: 'no-store'}).catch(() => caches.match(e.request))
  );
});

// Mesaj pentru a primi comenzi de la client (unregister forțat din pagină)
self.addEventListener('message', e => {
  if(e.data && e.data.type === 'SKIP_WAITING'){
    self.skipWaiting();
  }
  if(e.data && e.data.type === 'CLEAR_CACHE'){
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))));
  }
});
