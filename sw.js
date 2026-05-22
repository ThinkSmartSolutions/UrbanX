/* UrbanX SW v4.3f */
const CACHE='urbanx-v4.3f';
const OLD=['urbanx-v4.0','urbanx-v4.1','urbanx-v4.2','urbanx-v4.3','urbanx-v4.3e','mapbox-tiles'];

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

self.addEventListener('install',e=>{console.log('[SW v4.3f] Install');self.skipWaiting();});

self.addEventListener('activate',e=>{
  console.log('[SW v4.3f] Activate');
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.filter(k=>OLD.includes(k)||(k.startsWith('urbanx-')&&k!==CACHE))
        .map(k=>{console.log('[SW v4.3f] Sterg:',k);return caches.delete(k);})
    )).then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const url=fix(e.request.url);
  const req=url!==e.request.url
    ?new Request(url,{headers:e.request.headers,credentials:e.request.credentials,redirect:e.request.redirect})
    :e.request;
  const path=new URL(url).pathname;

  if(path==='/UrbanX/'||path==='/UrbanX/index.html'){
    e.respondWith(fetch(req,{cache:'no-store'}).catch(()=>caches.match(req)));
    return;
  }

  if(/\.(js|css|geojson|json)(\?|$)/.test(path)){
    e.respondWith(
      fetch(req,{cache:'no-store'}).then(r=>{
        if(r.ok && r.status===200){
          /* clone INAINTE de a returna */
          const clone=r.clone();
          caches.open(CACHE).then(ch=>ch.put(req,clone));
        }
        return r;
      }).catch(()=>caches.match(req))
    );
    return;
  }

  if(url.includes('mapbox')){
    e.respondWith(
      caches.match(req).then(cached=>{
        if(cached) return cached;
        return fetch(req).then(r=>{
          if(r.ok){const clone=r.clone();caches.open(CACHE).then(ch=>ch.put(req,clone));}
          return r;
        });
      })
    );
    return;
  }

  e.respondWith(fetch(req));
});
