// ═══════════════════════════════════════════════════════════════════════════
// osm-mirror-fallback.js — UrbanX OSM/Overpass reziliență
// 16 iunie 2026
//
// Problema: serverul public overpass-api.de (si proxy-ul /osm care il foloseste)
// returneaza frecvent 429 (Too Many Requests) / 504 (Gateway Timeout) cand e
// supraincarcat. Rezultat vizibil: cladirile nu mai apar pe harta in cinematic,
// Science Layer / Zone Engine esueaza, datele OSM lipsesc.
//
// Solutie: un shim NEINVAZIV peste window.fetch care intercepteaza DOAR cererile
// Overpass (directe catre overpass-api.de SAU prin proxy /osm) si le reincearca
// pe mai multe mirror-uri pana cand una raspunde. Orice alta cerere trece neatinsa.
// Daca toate esueaza, intoarce {elements:[]} (raspuns gol valid) ca sa nu crape
// codul apelant. Are try/catch de siguranta: la orice eroare interna -> fetch original.
// ═══════════════════════════════════════════════════════════════════════════

(function(){
  'use strict';
  if(window._osmMirrorShim) return;
  window._osmMirrorShim = true;

  var PROXY = window._PROXY_URL || 'https://urbanx-proxy.3dtravelsoftart.workers.dev';
  // Mirror-uri Overpass cu CORS activ (ordonate dupa fiabilitate observata)
  var MIRRORS = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass.private.coffee/api/interpreter',
    'https://maps.mail.ru/osm/tools/overpass/api/interpreter'
  ];
  var PER_TRY_MS = 9000;

  var _orig = window.fetch.bind(window);

  function _url(input){ return (typeof input==='string') ? input : (input && input.url) || ''; }

  function _isOverpass(url){
    if(!url) return false;
    if(url.indexOf('overpass-api.de/api/interpreter') >= 0) return true;
    // proxy /osm (foloseste overpass in spate)
    if(url.indexOf('/osm') >= 0 && url.indexOf(PROXY) >= 0) return true;
    if(/[?&]q=/.test(url) && url.indexOf('/osm') >= 0) return true;
    return false;
  }

  function _extractQuery(url, init){
    var m = url.match(/[?&]q=([^&]*)/);
    if(m && url.indexOf('/osm') >= 0){ try{ return decodeURIComponent(m[1]); }catch(e){ return m[1]; } }
    if(init && init.body){
      var b = String(init.body);
      if(b.indexOf('data=') === 0){ try{ return decodeURIComponent(b.slice(5)); }catch(e){ return b.slice(5); } }
      return b;
    }
    return '';
  }

  function _to(ms){ try{ return AbortSignal.timeout(ms); }catch(e){ return undefined; } }

  window.fetch = function(input, init){
    try{
      var url = _url(input);
      if(!_isOverpass(url)) return _orig(input, init);
      var q = _extractQuery(url, init);
      if(!q) return _orig(input, init);

      // Secventa: proxy /osm intai, apoi mirror-uri directe.
      var eps = [ { proxy:true, url: PROXY + '/osm?q=' + encodeURIComponent(q) } ];
      MIRRORS.forEach(function(m){ eps.push({ proxy:false, url:m }); });

      var callerSignal = init && init.signal;
      var i = 0;
      function next(){
        if(callerSignal && callerSignal.aborted){
          return Promise.reject(new DOMException('Aborted','AbortError'));
        }
        if(i >= eps.length){
          // Toate au esuat — raspuns gol valid (codul apelant trateaza elements:[]).
          return Promise.resolve(new Response('{"elements":[]}', {
            status:200, headers:{'Content-Type':'application/json'}
          }));
        }
        var ep = eps[i++];
        var opts = ep.proxy
          ? { signal:_to(PER_TRY_MS) }
          : { method:'POST', body:'data=' + encodeURIComponent(q), signal:_to(PER_TRY_MS) };
        return _orig(ep.url, opts).then(function(resp){
          if(resp && resp.ok) return resp;
          return next();
        }).catch(function(){ return next(); });
      }
      return next();
    }catch(e){
      // Orice problema in shim -> comportament original, niciodata nu blocam fetch-ul.
      return _orig(input, init);
    }
  };

  console.log('[OSM Mirror Fallback] ✅ activ — proxy + ' + MIRRORS.length + ' mirror-uri Overpass');
})();
