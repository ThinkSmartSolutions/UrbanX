/* UrbanX SW v4.4c */
const CACHE='urbanx-v4.4c';
const OLD=[
  'urbanx-v4.0','urbanx-v4.1','urbanx-v4.2','urbanx-v4.3',
  'urbanx-v4.3e','urbanx-v4.3f','urbanx-v4.3h','mapbox-tiles',
  'urbanx-v4.3i','urbanx-v4.3j'
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
  console.log('[SW v4.4c] Install');
  // Forteaza activarea imediata - inlocuieste orice SW vechi
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', e => {
  console.log('[SW v4.4c] Activate');
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE)
        .map(k => { console.log('[SW v4.4c] Sterg:', k); return caches.delete(k); })
    )).then(() => {
      console.log('[SW v4.4c] Claim clients');
      return self.clients.claim();
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
  // Network first, no cache - toate requesturile directe
  e.respondWith(
    fetch(req, {cache: 'no-store'}).catch(() => caches.match(e.request))
  );
});
