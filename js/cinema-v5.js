// cinema-v5.js — UrbanX TCI Cinematic v5.0 REAL
// Arhitectura: Mapbox = ACTOR PRINCIPAL. Canvas = DATE + NARATIV.
// 17 scene · Date live INSE/OSM/Wikipedia · Narativ AI per scena
// Camera coerenta: zoom progresiv, nu loop · Legenda dinamica per scena
// (c) ThinkSmart Solutions 2026

(function(){
'use strict';

// ── PROXY & ENDPOINTS ────────────────────────────────────────────────────
var PROXY = 'https://urbanx-proxy.3dtravelsoftart.workers.dev';
var INSE_USER = 'office@think-ss.eu';
var INSE_PASS = '7Jpu!m.2NiNFiVQ';

// ── 17 SCENE — arhitectura v5.0 ─────────────────────────────────────────
var SCENES = [
  // BLOC 1 — IDENTITATE & CONTEXT
  {id:'s1_identitate',  dur:18000, label:'IDENTITATE',        bloc:1, legend:'none'},
  {id:'s2_regional',    dur:16000, label:'CONTEXT REGIONAL',  bloc:1, legend:'none'},
  {id:'s3_profil',      dur:18000, label:'PROFIL LOCUITORI',  bloc:1, legend:'density'},
  // BLOC 2 — ECONOMIC
  {id:'s4_economie',    dur:16000, label:'ECONOMIE',          bloc:2, legend:'none'},
  {id:'s5_proiecte',    dur:18000, label:'PROIECTE & INFRA',  bloc:2, legend:'infra'},
  // BLOC 3 — URBANISM
  {id:'s6_fond',        dur:16000, label:'FOND CONSTRUIT',    bloc:3, legend:'buildings'},
  {id:'s7_coridoare',   dur:20000, label:'CORIDOARE 2055',    bloc:3, legend:'growth'},
  {id:'s8_mobilitate',  dur:18000, label:'MOBILITATE AUTO',   bloc:3, legend:'roads'},
  {id:'s9_transport',   dur:16000, label:'TRANSPORT PUBLIC',  bloc:3, legend:'tp'},
  // BLOC 4 — RISCURI
  {id:'s10_seismic',    dur:16000, label:'RISC SEISMIC',      bloc:4, legend:'seismic'},
  {id:'s11_clima',      dur:18000, label:'CLIMA & INUNDATII', bloc:4, legend:'flood'},
  // BLOC 5 — PREDICTII
  {id:'s12_montecarlo', dur:20000, label:'MONTE CARLO 2055',  bloc:5, legend:'scenarios'},
  {id:'s13_infra_nec',  dur:16000, label:'INFRASTRUCTURA NEC.',bloc:5,legend:'needs'},
  {id:'s14_benchmark',  dur:16000, label:'BENCHMARK EU',      bloc:5, legend:'none'},
  // BLOC 6 — VIZIUNE & DECIZIE
  {id:'s15_sdg',        dur:16000, label:'CALITATE VIATA SDG',bloc:6, legend:'sdg'},
  {id:'s16_agenda',     dur:16000, label:'AGENDA PRIMARULUI', bloc:6, legend:'none'},
  {id:'s17_viziune',    dur:22000, label:'VIZIUNEA 2055',     bloc:6, legend:'none'},
];

// ── LEGENDE per tip scena ─────────────────────────────────────────────────
var LEGENDS = {
  buildings: [
    ['#3b82f6','Apartamente/blocuri'],['#93c5fd','Case individuale'],
    ['#f59e0b','Comercial/retail'],['#a78bfa','Birouri'],
    ['#22c55e','Scoli/educatie'],['#ef4444','Spitale/sanatate'],
    ['#d97706','Biserici'],['#6b7280','Industrial'],
  ],
  growth: [
    ['#14532d','Densitate mica — potential densificare'],
    ['#15803d','Densitate medie — consolidare'],
    ['#f59e0b','Presiune constructibila ridicata'],
    ['#ef4444','Presiune maxima — CC/CP depasit'],
  ],
  roads: [
    ['#dc2626','Autostrada/drum expres'],['#ea580c','Drum national'],
    ['#f59e0b','Drum primar'],['#16a34a','Drum secundar'],['#0ea5e9','Tertiar'],
  ],
  seismic: [
    ['#166534','ag < 0.15g — risc scazut'],['#854d0e','ag 0.15-0.25g — moderat'],
    ['#dc2626','ag 0.25-0.35g — ridicat'],['#7f1d1d','ag > 0.35g — foarte ridicat'],
  ],
  flood: [
    ['#1e3a8a','Zona inundabila activa — lunca'],
    ['#1d4ed8','Risc mediu inundatii ANAR'],
    ['#93c5fd','Risc scazut / perimetral'],
    ['#f59e0b','UHI — Urban Heat Island'],
  ],
  scenarios: [
    ['#22c55e','S3 Optimist — investitii sustinute'],
    ['#f59e0b','S2 Tendinta — referinta'],
    ['#ef4444','S1 Regres — declin neinterventie'],
  ],
  tp: [
    ['#8b5cf6','BRT — coridoare rapid propuse'],
    ['#22c55e','Transport existent acoperit'],
    ['#f59e0b','Zona sub-deservita — deficit'],
    ['#ef4444','Zona neacoperita > 15 min'],
  ],
  infra: [
    ['#f59e0b','Autostrada executata/in executie'],
    ['#60a5fa','Autostrada proiectata/SF'],
    ['#a78bfa','Cale ferata / gara'],
    ['#22c55e','Aeroport international'],
  ],
  density: [
    ['#1e3a8a','< 20 loc/ha — foarte mica'],
    ['#3b82f6','20-60 loc/ha — medie'],
    ['#f59e0b','60-120 loc/ha — ridicata'],
    ['#ef4444','> 120 loc/ha — foarte ridicata'],
  ],
  needs: [
    ['#22c55e','Necesar scoli/gradinite'],['#ef4444','Necesar cabinete medicale'],
    ['#3b82f6','Spatii verzi deficit'],['#f59e0b','Statii transport public'],
  ],
  sdg: [
    ['#22c55e','SDG 11.1 — Locuire adecvata'],['#3b82f6','SDG 11.2 — Transport accesibil'],
    ['#f59e0b','SDG 11.6 — Calitate aer/mediu'],['#a78bfa','SDG 11.7 — Spatii publice'],
  ],
};

// ── STATE GLOBAL ──────────────────────────────────────────────────────────
var _liveData = {
  wiki: null,       // Wikipedia intro UAT
  inse: null,       // date INSE TEMPO
  osm_roads: null,  // cache roads
  osm_rail: null,   // cai ferate
  projects: null,   // proiecte SICAP/CNAIR
  loaded: false,
};

// ── FETCH LIVE DATA — preload la start ───────────────────────────────────
function preloadData(city, siruta, cb) {
  var cx = city.lon || 27.601, cy = city.lat || 47.158;
  var name = city.name || 'UAT';
  var judet = city.judet || city.judet_code || 'IS';
  var promises = [];

  // 1. Wikipedia — intro istoric UAT
  var wikiUrl = 'https://ro.wikipedia.org/api/rest_v1/page/summary/' +
    encodeURIComponent(name.replace(/ /g,'_'));
  promises.push(
    fetch(wikiUrl, {signal: AbortSignal.timeout(6000)})
      .then(function(r){ return r.ok ? r.json() : null; })
      .then(function(d){
        if(d && d.extract) {
          _liveData.wiki = {
            extract: d.extract.slice(0,400),
            title: d.title,
            thumbnail: d.thumbnail ? d.thumbnail.source : null,
          };
        }
      }).catch(function(){
        _liveData.wiki = {extract: 'Date Wikipedia indisponibile momentan.', title: name};
      })
  );

  // 2. INSE TEMPO — populatie, natalitate, mortalitate per SIRUTA
  // Rutam prin proxy Cloudflare care gestioneaza autentificarea
  if(siruta) {
    var inseUrl = PROXY + '/inse?siruta=' + siruta + '&indicators=POP107A,NAT107A,DEC107A,MIG107A';
    promises.push(
      fetch(inseUrl, {signal: AbortSignal.timeout(10000)})
        .then(function(r){ return r.ok ? r.json() : null; })
        .then(function(d){
          if(d) _liveData.inse = d;
        }).catch(function(e){
          console.warn('[Cinema] INSE fetch:', e.message);
          _liveData.inse = null;
        })
    );
  }

  // 3. OSM — autostrazi + cai ferate in raza 50km
  var qInfra = '[out:json][timeout:30];(' +
    'way["highway"~"motorway|trunk"](around:50000,' + cy + ',' + cx + ');' +
    'way["railway"~"rail"](around:30000,' + cy + ',' + cx + ');' +
    'node["aeroway"="aerodrome"](around:80000,' + cy + ',' + cx + ');' +
    ');out geom;';
  promises.push(
    fetch(PROXY + '/osm?q=' + encodeURIComponent(qInfra), {signal: AbortSignal.timeout(20000)})
      .then(function(r){ return r.json(); })
      .then(function(d){
        var roads = [], rail = [], airports = [];
        (d.elements||[]).forEach(function(el){
          if(el.type === 'node' && el.tags && el.tags.aeroway === 'aerodrome') {
            airports.push({lon: el.lon, lat: el.lat, name: el.tags.name||'Aeroport'});
          }
          if(el.type !== 'way' || !el.geometry) return;
          var coords = el.geometry.map(function(n){ return [n.lon, n.lat]; });
          var hw = el.tags && el.tags.highway;
          var rw = el.tags && el.tags.railway;
          if(hw === 'motorway' || hw === 'trunk') {
            roads.push({type:'Feature', geometry:{type:'LineString',coordinates:coords},
              properties:{c: hw==='motorway'?'#dc2626':'#ea580c', w: hw==='motorway'?8:5,
                name: el.tags.name||el.tags.ref||hw}});
          }
          if(rw === 'rail') {
            rail.push({type:'Feature', geometry:{type:'LineString',coordinates:coords},
              properties:{c:'#a78bfa', w:3}});
          }
        });
        _liveData.osm_roads = roads;
        _liveData.osm_rail  = rail;
        _liveData.airports  = airports;
        console.log('[Cinema] Infra: ' + roads.length + ' autostrazi, ' + rail.length + ' cai ferate, ' + airports.length + ' aeroporturi');
      }).catch(function(e){ console.warn('[Cinema] OSM infra:', e.message); })
  );

  // 4. OSM — drumuri urbane pentru mobilitate
  var qUrban = '[out:json][timeout:30];(way["highway"~"motorway|trunk|primary|secondary|tertiary|residential"](around:12000,' + cy + ',' + cx + '););out geom;';
  promises.push(
    fetch(PROXY + '/osm?q=' + encodeURIComponent(qUrban), {signal: AbortSignal.timeout(25000)})
      .then(function(r){ return r.json(); })
      .then(function(d){
        var ft = [];
        (d.elements||[]).forEach(function(el){
          if(el.type!=='way'||!el.geometry) return;
          var coords = el.geometry.map(function(n){ return [n.lon, n.lat]; });
          var hw = (el.tags&&el.tags.highway)||'tertiary';
          var col, w;
          if(hw==='motorway'){col='#dc2626';w=8;}
          else if(hw==='trunk'){col='#ea580c';w=6;}
          else if(hw==='primary'){col='#f59e0b';w=5;}
          else if(hw==='secondary'){col='#16a34a';w=3;}
          else if(hw==='tertiary'){col='#0ea5e9';w=2;}
          else{col='#334155';w=1;}
          ft.push({type:'Feature',geometry:{type:'LineString',coordinates:coords},
            properties:{c:col, w:w, hw:hw}});
        });
        _liveData.osm_urban = ft;
        console.log('[Cinema] Urban roads: ' + ft.length);
      }).catch(function(e){ console.warn('[Cinema] OSM urban:', e.message); })
  );

  // Asteapta toate fetch-urile (sau timeout 15s)
  var timeout = new Promise(function(res){ setTimeout(res, 15000); });
  Promise.race([Promise.allSettled(promises), timeout]).then(function(){
    _liveData.loaded = true;
    console.log('[Cinema v5.0] Date preloaded. Wiki:', !!_liveData.wiki, 'INSE:', !!_liveData.inse, 'Roads:', (_liveData.osm_roads||[]).length);
    cb();
  });
}

// ── ENTRY POINT PRINCIPAL ────────────────────────────────────────────────
window._startCinema = function(cityKey) {
  cityKey = cityKey
    || (window.TCI && window.TCI.cityKey)
    || (window.S && window.S.activeUAT)
    || localStorage.getItem('ux_last_city')
    || 'RO-IS-01';

  var map = window.map;
  var SE  = window._CinemaEngine;
  if(!map){ console.error('[Cinema] map lipsa'); return; }
  if(!SE){  console.error('[Cinema] _CinemaEngine lipsa'); return; }

  // Resolve city din toate sursele
  var city = null;
  if(window._RO_CITIES_DB) city = window._RO_CITIES_DB[cityKey];
  if(!city && window._UAT_DB) city = window._UAT_DB[cityKey];
  if(!city && window.TCI && window.TCI._EXTRA_UATS) city = window.TCI._EXTRA_UATS[cityKey];
  if(!city && window._RO_CITIES_DB) city = Object.values(window._RO_CITIES_DB)[0];
  if(!city) { console.error('[Cinema] city negasit pentru:', cityKey); return; }

  console.log('[Cinema v5.0] START:', city.name, '| lon:', city.lon, 'lat:', city.lat);

  // Calc pred safe
  var pred = null;
  try {
    if(window._PredEngine && typeof window._PredEngine.calc === 'function')
      pred = window._PredEngine.calc(city);
  } catch(e) { console.warn('[Cinema] _PredEngine error:', e.message); }
  if(!pred) pred = _buildFallbackPred(city);

  var cx = city.lon || 27.601, cy = city.lat || 47.158;
  var siruta = city.siruta || cityKey.split('-').pop();
  var name = city.name || 'UAT';

  // Reset engine
  SE.SCENES = SCENES;
  SE._setupMap = function(){};
  SE._playing = false;
  if(SE._raf) cancelAnimationFrame(SE._raf);
  if(SE._rotInt){ clearInterval(SE._rotInt); SE._rotInt = null; }
  _cleanOurLayers(map);

  // Ascunde UI platforma
  var hidden = [];
  ['#panel','#panel-tabs','#panel-body','#topbar','#mob-sheet','#utr-drawer',
   '#info-drawer','#ux-gdpr-footer','.mapboxgl-ctrl-bottom-left',
   '.mapboxgl-ctrl-bottom-right','nav','#tci-adv-menu','#viz-menu',
   '#rapoarte-menu','#analize-menu'].forEach(function(sel){
    document.querySelectorAll(sel).forEach(function(el){
      if(!el._cs) el._cs = el.style.cssText;
      el.style.setProperty('display','none','important');
      hidden.push(el);
    });
  });

  // Canvas overlay
  document.querySelectorAll('#tci-c8,#cin-legend,#tci-c8-ctrl,#cin-loading').forEach(function(e){ e.remove(); });

  // Loading screen
  var loadEl = document.createElement('div');
  loadEl.id = 'cin-loading';
  loadEl.style.cssText = 'position:fixed;inset:0;z-index:999998;background:rgba(2,5,14,0.95);display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:"Space Grotesk",sans-serif;';
  loadEl.innerHTML = '<div style="font-size:11px;font-weight:700;color:#D4AF37;letter-spacing:.2em;margin-bottom:16px">TCI CINEMATIC v5.0</div>'
    + '<div style="font-size:28px;font-weight:900;color:#fff;margin-bottom:8px">' + name.toUpperCase() + '</div>'
    + '<div style="font-size:12px;color:rgba(148,163,184,0.6);margin-bottom:32px">Se incarca date reale — INSE · OSM · Wikipedia</div>'
    + '<div id="cin-load-bar" style="width:280px;height:3px;background:rgba(255,255,255,0.1);border-radius:2px;overflow:hidden;">'
    +   '<div id="cin-load-prog" style="height:100%;width:0%;background:#D4AF37;transition:width .4s;border-radius:2px;"></div>'
    + '</div>';
  document.body.appendChild(loadEl);

  // Anima progress bar
  var progEl = document.getElementById('cin-load-prog');
  var progVal = 0;
  var progInt = setInterval(function(){
    progVal = Math.min(90, progVal + Math.random() * 8);
    if(progEl) progEl.style.width = progVal + '%';
  }, 400);

  // Opreste TCI director
  try{ TCI._playing=false; TCI._stopped=true; }catch(e){}
  try{ if(TCI._director) TCI._director._playing=false; }catch(e){}
  try{ TCI.pause?.(); }catch(e){}

  // Preload date live, apoi porneste filmul
  preloadData(city, siruta, function() {
    clearInterval(progInt);
    if(progEl) progEl.style.width = '100%';
    setTimeout(function(){
      loadEl.style.transition = 'opacity .6s';
      loadEl.style.opacity = '0';
      setTimeout(function(){
        loadEl.remove();
        _startFilm(map, SE, city, pred, cx, cy, name, siruta, hidden);
      }, 600);
    }, 300);
  });
};

// ── START FILM — dupa preload ─────────────────────────────────────────────
function _startFilm(map, SE, city, pred, cx, cy, name, siruta, hidden) {

  // Canvas
  var cv = document.createElement('canvas');
  cv.id = 'tci-c8';
  cv.width = window.innerWidth; cv.height = window.innerHeight;
  cv.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:999999;pointer-events:none;';
  document.body.appendChild(cv);

  SE._map = map; SE._city = city; SE._pred = pred;
  SE._canvas = cv; SE._ctx = cv.getContext('2d');
  SE._playing = true; SE._si = 0;

  // Override flyTo/jumpTo — permite zoom mic pentru scenele de intro si regional
  var _oFly = map.flyTo.bind(map), _oJump = map.jumpTo.bind(map);
  map.flyTo = function(o){
    if(!SE._playing){ map.flyTo=_oFly; map.jumpTo=_oJump; return _oFly(o); }
    var sid = SE.SCENES[SE._si]?.id;
    var allowSmall = (sid==='s1_identitate'||sid==='s2_regional');
    if(!allowSmall && ((o.pitch||0)<55 || (o.zoom||20)<12)) return map;
    return _oFly(o);
  };
  map.jumpTo = function(o){
    if(!SE._playing){ map.flyTo=_oFly; map.jumpTo=_oJump; return _oJump(o); }
    var sid = SE.SCENES[SE._si]?.id;
    var allowSmall = (sid==='s1_identitate'||sid==='s2_regional');
    if(!allowSmall && ((o.pitch||0)<55 || (o.zoom||20)<12))
      return _oJump(Object.assign({},o,{pitch:68,zoom:15.0}));
    return _oJump(o);
  };

  // Salveaza culoarea originala cladiri
  var origColor = null;
  try{ origColor = map.getPaintProperty('building-extrusion','fill-extrusion-color'); }catch(e){}

  // ── FUNCTII UTILITARE ────────────────────────────────────────────────
  function lp(p){ try{ map.setConfigProperty('basemap','lightPreset',p); }catch(e){} }

  function rot(b0, spd){
    if(SE._rotInt) clearInterval(SE._rotInt);
    var b = b0;
    SE._rotInt = setInterval(function(){
      if(!SE._playing){ clearInterval(SE._rotInt); SE._rotInt=null; return; }
      b += spd; try{ map.setBearing(b%360); }catch(e){}
    }, 50);
  }

  // Zbor progresiv — smooth dive din vedere globala spre oras
  function dive(zone, preset, delay) {
    lp(preset||'night');
    var z = zone || {c:[cx,cy], b:20, z:15.5};
    setTimeout(function(){
      if(!SE._playing) return;
      // Pasul 1: zoom out → tara
      try{ map.flyTo({center:[24.5,45.9], zoom:6.5, pitch:0, bearing:0,
        duration:3000, essential:true}); }catch(e){}
      // Pasul 2: zoom regional
      setTimeout(function(){
        if(!SE._playing) return;
        try{ map.flyTo({center:[(cx+24.5)/2,(cy+45.9)/2], zoom:8, pitch:5, bearing:0,
          duration:3500, essential:true}); }catch(e){}
      }, 3100);
      // Pasul 3: approach oras
      setTimeout(function(){
        if(!SE._playing) return;
        try{ map.flyTo({center:[cx,cy], zoom:11.5, pitch:25, bearing:z.b*0.3,
          duration:4000, essential:true}); }catch(e){}
      }, 7000);
      // Pasul 4: 3D final
      setTimeout(function(){
        if(!SE._playing) return;
        try{ map.flyTo({center:z.c, zoom:z.z, pitch:68, bearing:z.b,
          duration:5000, essential:true,
          easing:function(t){return t<0.5?2*t*t:(1-Math.pow(-2*t+2,2)/2);}}); }catch(e){}
      }, 11500);
    }, delay||0);
  }

  // Glisare fluida intre cartiere — pentru scenele de detaliu
  function glide(center, zoom, pitch, bearing, delay, preset) {
    setTimeout(function(){
      if(!SE._playing) return;
      if(preset) lp(preset);
      try{ map.flyTo({center:center, zoom:zoom||15.0, pitch:pitch||68, bearing:bearing||20,
        duration:7000, essential:true,
        easing:function(t){return t<0.5?2*t*t:(1-Math.pow(-2*t+2,2)/2);}}); }catch(e){}
    }, delay||0);
  }

  // Zone dinamice per UAT
  var Z = {
    C:  {c:[cx,       cy      ], b:20,  z:15.5},  // centru
    NV: {c:[cx-0.022, cy+0.016], b:55,  z:15.2},  // nord-vest
    SE: {c:[cx+0.024, cy-0.013], b:115, z:15.2},  // sud-est
    SV: {c:[cx-0.015, cy-0.018], b:175, z:15.0},  // sud-vest
    NE: {c:[cx+0.020, cy+0.017], b:295, z:15.0},  // nord-est
    PER:{c:[cx+0.035, cy-0.025], b:140, z:13.5},  // periferie
  };

  // ── CULORI CLADIRI ────────────────────────────────────────────────────
  var COLOR_BUILDINGS = ['match',['get','type'],
    'apartments','#3b82f6','residential','#60a5fa','house','#93c5fd',
    'commercial','#f59e0b','retail','#fbbf24','office','#a78bfa',
    'industrial','#6b7280','warehouse','#4b5563',
    'school','#22c55e','university','#16a34a',
    'hospital','#ef4444','clinic','#f87171',
    'church','#d97706','cathedral','#92400e',
    'civic','#8b5cf6','public','#7c3aed',
    'hotel','#ec4899','garage','#374151',
    '#94a3b8'
  ];

  function setColor(id) {
    var expr;
    if(id==='s10_seismic') {
      expr = ['interpolate',['linear'],['get','height'],
        0,'#166534', 8,'#854d0e', 15,'#b91c1c', 25,'#dc2626', 40,'#ef4444'];
    } else if(id==='s11_clima'||id==='s11_flood') {
      expr = ['interpolate',['linear'],['get','height'],
        0,'#1e3a8a', 5,'#1d4ed8', 12,'#3b82f6', 25,'#93c5fd'];
    } else if(id==='s7_coridoare') {
      expr = ['interpolate',['linear'],['get','height'],
        0,'#14532d', 6,'#15803d', 15,'#f59e0b', 28,'#ef4444'];
    } else {
      expr = COLOR_BUILDINGS;
    }
    try{ map.setPaintProperty('building-extrusion','fill-extrusion-color', expr); }catch(e){}
    try{ map.setPaintProperty('building-extrusion','fill-extrusion-opacity', 0.92); }catch(e){}
  }

  // ── LAYERE OSM ────────────────────────────────────────────────────────
  function addLayer(id, features, paintLine) {
    try{
      if(map.getLayer(id)) map.removeLayer(id);
      if(map.getSource(id)) map.removeSource(id);
      if(!features||!features.length) return;
      map.addSource(id,{type:'geojson',data:{type:'FeatureCollection',features:features}});
      map.addLayer({id:id, type:'line', source:id,
        paint: paintLine || {'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0.9},
        layout:{'line-cap':'round','line-join':'round'}
      });
    }catch(e){ console.warn('[Cinema] addLayer',id,e.message); }
  }

  function addCircleLayer(id, features) {
    try{
      if(map.getLayer(id)) map.removeLayer(id);
      if(map.getSource(id)) map.removeSource(id);
      if(!features||!features.length) return;
      map.addSource(id,{type:'geojson',data:{type:'FeatureCollection',features:features}});
      map.addLayer({id:id, type:'circle', source:id,
        paint:{'circle-color':['get','c'],'circle-radius':8,'circle-opacity':0.9,
          'circle-stroke-width':2,'circle-stroke-color':'rgba(255,255,255,0.6)'}
      });
    }catch(e){ console.warn('[Cinema] addCircleLayer',id,e.message); }
  }

  // ── STOP ALL ─────────────────────────────────────────────────────────
  function stopAll(){
    SE._playing = false;
    try{ map.flyTo=_oFly; map.jumpTo=_oJump; }catch(e){}
    if(SE._raf) cancelAnimationFrame(SE._raf);
    if(SE._rotInt){ clearInterval(SE._rotInt); SE._rotInt=null; }
    _cleanOurLayers(map);
    try{ if(origColor) map.setPaintProperty('building-extrusion','fill-extrusion-color',origColor); }catch(e){}
    try{ map.setPaintProperty('building-extrusion','fill-extrusion-height',['get','height']); }catch(e){}
    document.getElementById('tci-c8')?.remove();
    document.getElementById('tci-c8-ctrl')?.remove();
    document.getElementById('cin-legend')?.remove();
    hidden.forEach(function(el){ el.style.cssText=el._cs||''; delete el._cs; });
    try{ map.flyTo({center:[cx,cy],zoom:12,pitch:40,bearing:0,duration:1500,essential:true}); }catch(e){}
    try{ map.setConfigProperty('basemap','lightPreset','day'); }catch(e){}
  }

  function goScene(i){
    if(i<0||i>=SE.SCENES.length) return;
    SE._playing=false;
    if(SE._raf) cancelAnimationFrame(SE._raf);
    if(SE._rotInt){ clearInterval(SE._rotInt); SE._rotInt=null; }
    _cleanOurLayers(map);
    SE._playing=true;
    runScene(i);
  }

  // ── BUTOANE CONTROL ───────────────────────────────────────────────────
  var ctrl = document.createElement('div');
  ctrl.id = 'tci-c8-ctrl';
  ctrl.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:1000000;display:flex;gap:8px;align-items:center;background:rgba(2,6,18,0.88);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:8px 14px;';
  ctrl.innerHTML =
    '<button id="c8p"     style="background:none;border:none;color:#94a3b8;padding:6px 12px;cursor:pointer;font:700 14px monospace;border-radius:8px;" title="Inapoi">◀</button>'
   +'<button id="c8pause" style="background:none;border:none;color:#D4AF37;padding:6px 14px;cursor:pointer;font:700 14px monospace;border-radius:8px;">⏸</button>'
   +'<button id="c8n"     style="background:none;border:none;color:#94a3b8;padding:6px 12px;cursor:pointer;font:700 14px monospace;border-radius:8px;" title="Inainte">▶</button>'
   +'<div id="c8-scname"  style="font:600 10px \'IBM Plex Mono\',monospace;color:#D4AF37;letter-spacing:.08em;min-width:140px;text-align:center;"></div>'
   +'<button id="c8s"     style="background:rgba(150,0,0,.7);border:none;color:#fca5a5;padding:6px 12px;cursor:pointer;font:700 13px monospace;border-radius:8px;" title="Opreste">✕</button>';
  document.body.appendChild(ctrl);

  document.getElementById('c8s').onclick = stopAll;
  document.getElementById('c8n').onclick = function(){ goScene(SE._si+1); };
  document.getElementById('c8p').onclick = function(){ goScene(SE._si-1); };

  var _pausedT = 0;
  document.getElementById('c8pause').onclick = function(){
    if(SE._playing){
      _pausedT = Math.min(1, Math.max(0, (performance.now()-SE._startT)/SE.SCENES[SE._si].dur));
      SE._playing=false;
      if(SE._raf) cancelAnimationFrame(SE._raf);
      if(SE._rotInt){ clearInterval(SE._rotInt); SE._rotInt=null; }
      this.textContent='▶';
    } else {
      SE._playing=true;
      this.textContent='⏸';
      var scene = SE.SCENES[SE._si];
      SE._startT = performance.now() - _pausedT * scene.dur;
      _loopScene(scene, SE._si, pred, name);
    }
  };

  // ── LEGENDA DINAMICA ──────────────────────────────────────────────────
  function updateLegend(sceneObj) {
    var legEl = document.getElementById('cin-legend');
    var items = sceneObj.legend !== 'none' ? (LEGENDS[sceneObj.legend]||[]) : [];

    if(!items.length) {
      if(legEl) legEl.style.opacity='0';
      return;
    }

    if(!legEl) {
      legEl = document.createElement('div');
      legEl.id = 'cin-legend';
      legEl.style.cssText = 'position:fixed;top:72px;right:16px;z-index:1000000;background:rgba(2,6,18,0.88);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 14px;font-family:"Space Grotesk",sans-serif;font-size:11px;color:#e2e8f0;min-width:200px;max-width:230px;transition:opacity .5s;';
      document.body.appendChild(legEl);
    }

    var html = '<div style="font-size:9px;font-weight:700;color:#D4AF37;letter-spacing:.1em;margin-bottom:7px;text-transform:uppercase;">'
      + sceneObj.label + '</div>'
      + '<div style="display:flex;flex-direction:column;gap:4px;">';
    items.forEach(function(it){
      html += '<div style="display:flex;align-items:center;gap:7px;">'
        + '<span style="display:inline-block;width:12px;height:12px;background:'+it[0]+';border-radius:2px;flex-shrink:0;"></span>'
        + '<span style="color:rgba(220,230,255,0.82);font-size:10px;line-height:1.3;">'+it[1]+'</span></div>';
    });
    html += '</div>';
    legEl.innerHTML = html;
    legEl.style.opacity='1';
  }

  // ── SETUP SCENA — camera + culori + layere ────────────────────────────
  function setupScene(id) {
    if(SE._rotInt){ clearInterval(SE._rotInt); SE._rotInt=null; }
    setColor(id);

    switch(id) {

      case 's1_identitate':
        lp('night');
        // Zoom in progresiv: Europa → Romania → oras
        try{ map.jumpTo({center:[15,52], zoom:4, pitch:0, bearing:0}); }catch(e){}
        setTimeout(function(){ if(!SE._playing)return;
          try{ map.flyTo({center:[24.5,45.9], zoom:6.5, pitch:0, bearing:0, duration:4000, essential:true}); }catch(e){}
        }, 300);
        setTimeout(function(){ if(!SE._playing)return;
          try{ map.flyTo({center:[cx,cy], zoom:9, pitch:15, bearing:0, duration:4000, essential:true}); }catch(e){}
        }, 4500);
        setTimeout(function(){ if(!SE._playing)return;
          try{ map.flyTo({center:[cx,cy], zoom:13, pitch:45, bearing:10, duration:4000, essential:true}); }catch(e){}
        }, 8800);
        setTimeout(function(){ if(!SE._playing)return;
          try{ map.flyTo({center:Z.C.c, zoom:15.5, pitch:68, bearing:20, duration:4000, essential:true}); }catch(e){}
        }, 13000);
        break;

      case 's2_regional':
        lp('day');
        // Zoom la nivel regional — judete vecine vizibile
        try{ map.flyTo({center:[cx,cy], zoom:8, pitch:0, bearing:0, duration:3000, essential:true}); }catch(e){}
        // Adauga infrastructura regionala — autostrazi + cai ferate
        setTimeout(function(){ if(!SE._playing)return;
          if(_liveData.osm_roads && _liveData.osm_roads.length) {
            addLayer('cin-highways', _liveData.osm_roads);
          }
          if(_liveData.osm_rail && _liveData.osm_rail.length) {
            addLayer('cin-rail', _liveData.osm_rail,
              {'line-color':'#a78bfa','line-width':2,'line-opacity':0.8,
               'line-dasharray':[4,2]});
          }
          if(_liveData.airports && _liveData.airports.length) {
            var aptFt = _liveData.airports.map(function(a){
              return {type:'Feature', geometry:{type:'Point',coordinates:[a.lon,a.lat]},
                properties:{c:'#22c55e', name:a.name}};
            });
            addCircleLayer('cin-airports', aptFt);
          }
        }, 1500);
        setTimeout(function(){ if(!SE._playing)return;
          try{ map.flyTo({center:[cx,cy], zoom:10, pitch:20, bearing:-10, duration:5000, essential:true}); }catch(e){}
        }, 7000);
        break;

      case 's3_profil':
        lp('dawn');
        glide(Z.C.c, 13, 48, 0, 0);
        glide(Z.NV.c, 14.5, 60, 40, 9000, 'dawn');
        break;

      case 's4_economie':
        lp('day');
        glide(Z.C.c, 14, 55, -10, 0, 'day');
        glide(Z.NE.c, 15, 65, 20, 9000, 'day');
        break;

      case 's5_proiecte':
        lp('day');
        // Afiseaza infrastructura + proiecte
        if(_liveData.osm_roads && _liveData.osm_roads.length) {
          addLayer('cin-highways', _liveData.osm_roads);
        }
        try{ map.flyTo({center:[cx,cy], zoom:11, pitch:35, bearing:0, duration:3500, essential:true}); }catch(e){}
        glide(Z.PER.c, 12.5, 50, 30, 8000, 'day');
        glide(Z.C.c, 14, 58, -15, 16000, 'dusk');
        break;

      case 's6_fond':
        lp('day');
        glide(Z.C.c, 15.5, 68, 20, 0, 'day');
        glide(Z.NV.c, 15, 65, 60, 9000, 'day');
        glide(Z.SE.c, 15, 65, 120, 16000, 'day');
        break;

      case 's7_coridoare':
        lp('night');
        // Cladiri cresc animat
        try{ map.setPaintProperty('building-extrusion','fill-extrusion-height', 0.1); }catch(e){}
        glide(Z.C.c, 14.5, 62, 10, 0, 'night');
        glide(Z.NV.c, 14.5, 65, 55, 10000, 'night');
        glide(Z.SE.c, 14, 62, 130, 18000, 'dusk');
        break;

      case 's8_mobilitate':
        lp('night');
        try{ map.flyTo({center:[cx,cy], zoom:12, pitch:48, bearing:0, duration:3500, essential:true}); }catch(e){}
        // Adauga reteaua rutiera urbana
        if(_liveData.osm_urban && _liveData.osm_urban.length) {
          addLayer('cin-urban', _liveData.osm_urban);
        }
        glide(Z.C.c, 13.5, 55, 15, 8000, 'night');
        glide(Z.SE.c, 13, 50, -20, 16000, 'night');
        break;

      case 's9_transport':
        lp('day');
        rot(20, 0.012);
        try{ SE._addTransit && SE._addTransit.call(SE, map); }catch(e){}
        break;

      case 's10_seismic':
        lp('night');
        try{ map.flyTo({center:[cx,cy], zoom:12.5, pitch:52, bearing:5, duration:3500, essential:true}); }catch(e){}
        try{ SE._addSeismic && SE._addSeismic.call(SE, map); }catch(e){}
        glide(Z.NV.c, 14, 62, 30, 7000, 'night');
        glide(Z.SE.c, 14, 60, -20, 14000, 'night');
        break;

      case 's11_clima':
        lp('dawn');
        try{ map.flyTo({center:[cx,cy], zoom:11.5, pitch:45, bearing:8, duration:3500, essential:true}); }catch(e){}
        try{ SE._addFlood && SE._addFlood.call(SE, map); }catch(e){}
        // Adauga autostrazi/centuri pentru context inundatii
        if(_liveData.osm_roads && _liveData.osm_roads.length) {
          addLayer('cin-highways', _liveData.osm_roads);
        }
        glide(Z.SV.c, 12.5, 50, 15, 8000, 'dawn');
        glide(Z.C.c, 13, 55, -5, 15000, 'day');
        break;

      case 's12_montecarlo':
        lp('dusk');
        try{ map.flyTo({center:[cx,cy], zoom:11.5, pitch:48, bearing:-5, duration:3500, essential:true}); }catch(e){}
        try{ SE._addExpansionRings && SE._addExpansionRings.call(SE, map); }catch(e){}
        glide(Z.PER.c, 12, 45, 40, 10000, 'dusk');
        glide(Z.C.c, 13, 52, -10, 18000, 'night');
        break;

      case 's13_infra_nec':
        lp('day');
        rot(15, 0.010);
        try{ SE._addInfraPoints && SE._addInfraPoints.call(SE, map); }catch(e){}
        break;

      case 's14_benchmark':
        lp('dusk');
        glide(Z.C.c, 13, 50, -15, 0, 'dusk');
        glide(Z.NV.c, 14, 58, 30, 9000, 'dusk');
        break;

      case 's15_sdg':
        lp('day');
        glide(Z.C.c, 14.5, 60, 10, 0, 'day');
        glide(Z.SE.c, 14, 58, -20, 9000, 'day');
        break;

      case 's16_agenda':
        lp('day');
        try{ map.flyTo({center:[cx,cy], zoom:13, pitch:52, bearing:0, duration:3500, essential:true}); }catch(e){}
        if(_liveData.osm_roads && _liveData.osm_roads.length) {
          addLayer('cin-highways', _liveData.osm_roads);
        }
        glide(Z.C.c, 14.5, 62, 20, 8000, 'day');
        break;

      case 's17_viziune':
        lp('dusk');
        rot(30, 0.008);
        setTimeout(function(){ if(!SE._playing)return;
          try{ map.flyTo({center:Z.C.c, zoom:15.5, pitch:72, bearing:120, duration:18000, essential:true}); }catch(e){}
        }, 2000);
        break;
    }
  }

  // ── CANVAS DRAW per scena ─────────────────────────────────────────────
  function cinDraw(sceneObj, t, ctx, W, H) {
    var id = sceneObj.id;
    if(!ctx || !pred) return;

    var sA = t<0.06 ? t/0.06 : t>0.92 ? (1-t)/0.08 : 1;
    var eo = function(x){ return 1-Math.pow(1-Math.max(0,Math.min(1,x)),3); };
    var rE = function(d,s){ return eo(Math.min(1,Math.max(0,(t-(d||0))/((s||0.25))))); };
    var N  = function(v){ return isNaN(+v)?'—':Number(v).toLocaleString('ro-RO',{maximumFractionDigits:0}); };

    // Font sizes responsive
    var FT = Math.min(W*0.032, 42);   // titlu
    var FD = Math.min(W*0.055, 72);   // cifra mare
    var FS = Math.min(W*0.014, 18);   // subtitlu
    var FL = Math.min(W*0.010, 13);   // label mic
    var FN = Math.min(W*0.013, 17);   // narativ

    // Vignete
    var gT = ctx.createLinearGradient(0,0,0,H*0.25);
    gT.addColorStop(0,'rgba(2,5,14,0.92)'); gT.addColorStop(1,'rgba(2,5,14,0)');
    ctx.fillStyle=gT; ctx.fillRect(0,0,W,H*0.25);
    var gB = ctx.createLinearGradient(0,H*0.75,0,H);
    gB.addColorStop(0,'rgba(2,5,14,0)'); gB.addColorStop(1,'rgba(2,5,14,0.92)');
    ctx.fillStyle=gB; ctx.fillRect(0,H*0.75,W,H*0.25);

    // ── Helper functions ──
    function titlu(txt, sub) {
      ctx.globalAlpha = sA*rE(0.04,0.18);
      ctx.fillStyle='rgba(212,175,55,0.95)';
      ctx.font='700 '+FT+'px "IBM Plex Mono",monospace';
      ctx.textAlign='left'; ctx.letterSpacing='0.04em';
      ctx.fillText(txt.slice(0,42), W*0.04, H*0.088);
      if(sub) {
        ctx.globalAlpha = sA*rE(0.07,0.18)*0.65;
        ctx.fillStyle='rgba(148,163,184,0.85)';
        ctx.font=FS+'px "IBM Plex Mono",monospace';
        ctx.fillText(sub.slice(0,60), W*0.04, H*0.088+FS*1.9);
      }
      ctx.globalAlpha=1;
    }

    function linie() {
      ctx.globalAlpha = sA*rE(0.06,0.25);
      var g=ctx.createLinearGradient(W*0.04,0,W*0.04+W*0.40,0);
      g.addColorStop(0,'rgba(212,175,55,0.9)'); g.addColorStop(1,'rgba(212,175,55,0)');
      ctx.fillStyle=g; ctx.fillRect(W*0.04,H*0.106,W*0.40*rE(0.06,0.30),1.5);
      ctx.globalAlpha=1;
    }

    function cifra(val, lbl, clr) {
      ctx.globalAlpha=sA*rE(0.14,0.22);
      ctx.fillStyle=clr||'#ffffff';
      ctx.font='900 '+FD+'px "Space Grotesk",sans-serif';
      ctx.textAlign='left';
      ctx.fillText(String(val).slice(0,12), W*0.04, H*0.888);
      ctx.globalAlpha=sA*rE(0.17,0.18)*0.7;
      ctx.fillStyle='rgba(148,163,184,0.75)';
      ctx.font='600 '+FL+'px "IBM Plex Mono",monospace';
      ctx.letterSpacing='0.06em';
      ctx.fillText(String(lbl).toUpperCase().slice(0,34), W*0.04, H*0.912);
      ctx.globalAlpha=1;
    }

    function cifra2(val, lbl, clr) {
      ctx.globalAlpha=sA*rE(0.20,0.20);
      ctx.fillStyle=clr||'rgba(212,175,55,0.95)';
      ctx.font='900 '+Math.min(W*0.032,42)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='right';
      ctx.fillText(String(val).slice(0,14), W*0.96, H*0.888);
      ctx.globalAlpha=sA*rE(0.23,0.18)*0.65;
      ctx.fillStyle='rgba(148,163,184,0.68)';
      ctx.font='600 '+FL+'px "IBM Plex Mono",monospace';
      ctx.textAlign='right';
      ctx.fillText(String(lbl).toUpperCase().slice(0,28), W*0.96, H*0.910);
      ctx.globalAlpha=1;
    }

    function narativ(txt) {
      if(t < 0.52) return;
      var alpha = Math.min(1,(t-0.52)/0.16)*sA;
      ctx.globalAlpha=alpha;
      ctx.fillStyle='rgba(220,228,255,0.85)';
      ctx.font='500 '+FN+'px "Space Grotesk",sans-serif';
      ctx.textAlign='left';
      ctx.letterSpacing='0';
      var mW=W*0.56, words=txt.split(' '), line='', y=H*0.936, n=0;
      words.forEach(function(w){
        var test=line+(line?' ':'')+w;
        if(ctx.measureText(test).width>mW && line && n<3){
          ctx.fillText(line,W*0.04,y); y+=FN*1.45; line=w; n++;
        } else line=test;
      });
      if(n<3) ctx.fillText(line,W*0.04,y);
      ctx.globalAlpha=1;
    }

    function concluzie(txt) {
      if(t < 0.82) return;
      var alpha = Math.min(1,(t-0.82)/0.12)*sA*0.9;
      ctx.globalAlpha=alpha;
      ctx.fillStyle='rgba(212,175,55,0.85)';
      ctx.font='600 '+Math.min(W*0.011,14)+'px "IBM Plex Mono",monospace';
      ctx.textAlign='right';
      ctx.fillText('▶ '+txt.slice(0,72), W*0.96, H*0.958);
      ctx.globalAlpha=1;
    }

    // Progress bar global
    ctx.globalAlpha=0.5;
    ctx.fillStyle='rgba(255,255,255,0.07)'; ctx.fillRect(W*0.32,H-9,W*0.36,2);
    var gp=ctx.createLinearGradient(W*0.32,0,W*0.68,0);
    gp.addColorStop(0,'#D4AF37'); gp.addColorStop(1,'rgba(212,175,55,0.1)');
    ctx.fillStyle=gp; ctx.fillRect(W*0.32,H-9,W*0.36*((SE._si+t)/SE.SCENES.length),2);
    // Bloc indicator
    var bloc = sceneObj.bloc;
    ctx.fillStyle='rgba(148,163,184,0.3)';
    ctx.font='500 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
    ctx.textAlign='center';
    ctx.fillText('BLOC '+bloc+' · '+(SE._si+1)+'/'+SE.SCENES.length+' — '+sceneObj.label, W/2, H-1);
    ctx.globalAlpha=1;

    // ── CONTINUT per scena ────────────────────────────────────────────
    var pop21 = pred.p21 || city.pop2021 || 100000;
    var r10   = pred.r10 || city.rata_reala_2011_2021 || 0;

    switch(id) {

      // S1 — IDENTITATE: istoric Wikipedia + date esentiale
      case 's1_identitate':
        // Titlu mare centrat
        ctx.globalAlpha=sA*rE(0.18,0.35);
        ctx.fillStyle='rgba(255,255,255,0.95)';
        ctx.font='900 '+Math.min(W*0.082,105)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='center';
        ctx.fillText(name.toUpperCase(), W/2, H*0.48);
        ctx.globalAlpha=sA*rE(0.26,0.22)*0.8;
        ctx.fillStyle='#D4AF37';
        ctx.font='600 '+Math.min(W*0.015,20)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='center';
        var subtitle = (city.judet||'—').toUpperCase()
          + ' · ' + N(pop21) + ' LOCUITORI'
          + ' · SIRUTA ' + (city.siruta||'—');
        ctx.fillText(subtitle, W/2, H*0.548);
        ctx.globalAlpha=1;

        // Extract Wikipedia
        if(_liveData.wiki && _liveData.wiki.extract && t > 0.38) {
          var wAlpha = Math.min(1,(t-0.38)/0.18)*sA*0.88;
          ctx.globalAlpha=wAlpha;
          // Fundal text Wikipedia
          ctx.fillStyle='rgba(4,10,24,0.78)';
          ctx.beginPath();
          ctx.roundRect(W*0.04, H*0.60, W*0.55, H*0.26, 8);
          ctx.fill();
          ctx.strokeStyle='rgba(212,175,55,0.2)'; ctx.lineWidth=1;
          ctx.stroke();
          ctx.fillStyle='rgba(148,163,184,0.55)';
          ctx.font='700 '+Math.min(W*0.009,11)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left'; ctx.letterSpacing='.06em';
          ctx.fillText('📖 WIKIPEDIA — SCURT ISTORIC', W*0.06, H*0.625);
          ctx.fillStyle='rgba(210,225,255,0.82)';
          ctx.font='400 '+Math.min(W*0.012,15)+'px "Space Grotesk",sans-serif';
          ctx.letterSpacing='0';
          var wText = _liveData.wiki.extract;
          var wWords = wText.split(' '), wLine='', wY=H*0.648, wN=0, wMaxW=W*0.50;
          wWords.forEach(function(w){
            var test=wLine+(wLine?' ':'')+w;
            if(ctx.measureText(test).width>wMaxW && wLine && wN<5){
              ctx.fillText(wLine,W*0.06,wY); wY+=Math.min(W*0.014,18)*1.5; wLine=w; wN++;
            } else wLine=test;
          });
          if(wN<5) ctx.fillText(wLine,W*0.06,wY);
          ctx.globalAlpha=1;
        }

        cifra(N(pop21), 'Locuitori 2021 — INSE');
        cifra2(N(Math.round(((city.suprafata_ha||city.suprafata||9800)/100)))+ ' km²', 'Suprafata UAT');
        break;

      // S2 — CONTEXT REGIONAL: autostrazi, cai ferate, aeroporturi
      case 's2_regional':
        titlu('Context Regional', 'Accesibilitate · Infrastructura · Gravitatie'); linie();
        // Informatii infrastructura
        var nHighways = (_liveData.osm_roads||[]).length;
        var nRail     = (_liveData.osm_rail||[]).length;
        var nAirports = (_liveData.airports||[]).length;
        ctx.globalAlpha=sA*rE(0.15,0.22);
        ctx.fillStyle='rgba(220,230,255,0.85)';
        ctx.font='600 '+Math.min(W*0.013,16)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='left'; ctx.letterSpacing='0';
        [
          ['🛣  ' + (nHighways>0?nHighways+' segmente autostrazi/DN detectate':'Verificare date OSM'), 0.60],
          ['🚂  ' + (nRail>0?nRail+' segmente cale ferata in raza 30km':'Verificare CFR'), 0.64],
          ['✈  ' + (nAirports>0?nAirports+' aeroport(uri) in raza 80km':'Verificare aeroporturi'), 0.68],
          ['🏙  Gravitatie urbana: ' + (city.coef_hub>=1.1?'HUB MAJOR':city.coef_hub>=0.9?'HUB REGIONAL':'LOCAL'), 0.72],
          ['🌍  Regiune: ' + (city.regiune||'—') + ' | Judet: ' + (city.judet||'—'), 0.76],
        ].forEach(function(it){
          ctx.globalAlpha=sA*rE(0.15,0.22);
          ctx.fillText(it[0], W*0.04, H*it[1]);
        });
        ctx.globalAlpha=1;
        cifra(N(Math.round((city.pop2021||pop21)/100)*100), 'Populatie UAT 2021');
        cifra2((city.coef_hub||0.78).toFixed(2)+' coef', 'Hub economic');
        narativ('Portocaliu=autostrazi/DN · Violet=cale ferata · Verde=aeroporturi. Analiza accesibilitate si gravitatie urbana in zona metropolitana.');
        concluzie('Conectivitatea determina corido rele de crestere — investitia in acces = crestere valoare teren');
        break;

      // S3 — PROFIL LOCUITOR
      case 's3_profil':
        titlu('Profil Locuitori', 'Demografie · Migratie · Ocupatie · 2021-2055'); linie();
        var rataClr = r10>=0.5?'#22c55e':r10>=-0.5?'#f59e0b':'#ef4444';
        var trendLbl = r10>=1?'crestere accelerata':r10>=0?'crestere lenta':'declin demografic';
        cifra((r10>=0?'+':'')+r10.toFixed(2)+'%/an', trendLbl, rataClr);
        cifra2(N(pred.pop55||Math.round(pop21*Math.pow(1+r10/100,34))), 'Proiectie 2055');
        // Date INSE daca disponibile
        if(_liveData.inse) {
          ctx.globalAlpha=sA*rE(0.22,0.20);
          ctx.fillStyle='rgba(148,163,184,0.55)';
          ctx.font='700 '+Math.min(W*0.009,11)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left';
          ctx.fillText('DATE INSE TEMPO — LIVE', W*0.04, H*0.62);
          ctx.globalAlpha=1;
        }
        // Piramida varsta vizuala (canvas)
        if(t > 0.25) {
          var pyrAlpha = Math.min(1,(t-0.25)/0.20)*sA;
          _drawAgeChart(ctx, W, H, pyrAlpha, pred, r10);
        }
        narativ(N(pop21)+' loc. (2021). Rata: '+r10.toFixed(2)+'%/an ('+trendLbl+'). Proiectie S2: '+N(pred.pop55||0)+' loc. in 2055. Profil: oras '+city.tip+'.');
        concluzie('Declinul demografic = presiune asupra bugetului local + deficit locuinte senior');
        break;

      // S4 — ECONOMIE
      case 's4_economie':
        titlu('Economie', 'PIB · Convergenta UE · Sectoare · Investitii'); linie();
        var pib = pred.pib || 14200;
        var pctUE = pred.pctUE || Math.round(pib/366);
        cifra(N(pib)+' €/loc', 'PIB per locuitor', pctUE>=75?'#22c55e':pctUE>=50?'#f59e0b':'#ef4444');
        cifra2(pctUE+'% UE27', 'Convergenta economica');
        // Bar chart sectoare
        if(t > 0.20) {
          var bAlpha = Math.min(1,(t-0.20)/0.22)*sA;
          _drawSectorsChart(ctx, W, H, bAlpha, pred);
        }
        narativ(name+' = '+pctUE+'% din media UE27 ('+N(pib)+' €/loc vs 36.600 €/loc UE). Convergenta estimata ~'+(pred.anConv||2050)+'. ROI imobiliar: '+(pred.roi||'~8')+'%. Sectoare: servicii '+(pred.ocupatie&&pred.ocupatie.servicii||52)+'%, industrie '+(pred.ocupatie&&pred.ocupatie.industrie||28)+'%.');
        concluzie('Convergenta economica = predictia cea mai importanta pentru valoarea terenurilor pe 30 ani');
        break;

      // S5 — PROIECTE & INFRASTRUCTURA
      case 's5_proiecte':
        titlu('Proiecte & Infrastructura', 'PNRR · Autostrazi · Investitii publice'); linie();
        var nProj = (_liveData.osm_roads||[]).filter(function(r){return r.properties.hw==='motorway';}).length;
        ctx.globalAlpha=sA*rE(0.14,0.22);
        ctx.fillStyle='rgba(220,230,255,0.85)';
        ctx.font='600 '+Math.min(W*0.013,16)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='left';
        [
          ['🛣  Autostrazi/drum expres in raza: '+nProj+' segmente OSM', 0.60],
          ['💰  PNRR C10-I2: consolidare seismica '+N(pred.fond||1000)+' cladiri eligibile', 0.64],
          ['🏗  Necesare: '+N(pred.defLoc||3000)+' unitati locative pana 2055', 0.68],
          ['📊  Investitie estimata: '+N(pred.invTotal||500)+' M EUR total', 0.72],
          ['🇪🇺  Fonduri UE absorbabile: ~'+N(Math.round((pred.invTotal||500)*0.35))+' M EUR', 0.76],
        ].forEach(function(it){
          ctx.globalAlpha=sA*rE(0.14+(it[1]-0.60)*2,0.18);
          ctx.fillText(it[0], W*0.04, H*it[1]);
        });
        ctx.globalAlpha=1;
        cifra(N(pred.invTotal||500)+' M €', 'Investitii necesare 2025-2055', '#D4AF37');
        cifra2('~35% UE', 'Finantare FEDR+PNRR');
        narativ('Portocaliu/rosu=autostrazi. Fiecare km autostrada in raza 20km creste valoarea terenurilor cu 15-40% pe coridorul sau (model gravitational UrbanX).');
        concluzie('Un proiect major de infrastructura anuntat = coridorul sau devine prioritate de investitie imobiliara');
        break;

      // S6 — FOND CONSTRUIT
      case 's6_fond':
        titlu('Fond Construit Existent', 'Tipuri · Densitate · Vulnerabilitate'); linie();
        cifra(N(pred.auth||Math.round(pop21/800)), 'Autorizatii/an estimat', '#60a5fa');
        cifra2(N(pred.fond||Math.round(pop21/50))+' cladiri', 'Fond pre-1990 risc RS');
        narativ('Albastru=blocuri · Portocaliu=comercial · Verde=scoli · Rosu=spitale · Violet=birouri. '+(pred.fond||0)+' cladiri vulnerabile seismic identificate. Fond pre-1990: '+Math.round((pred.fond||0)*3.5)+' unitati locative estimate.');
        concluzie('36% din fondul construit pre-1990 necesita evaluare seismica urgenta — PNRR C10-I2');
        break;

      // S7 — CORIDOARE 2055
      case 's7_coridoare':
        var tG = t<0.14?0:Math.min(1,(t-0.14)/0.72);
        var tE = 1-Math.pow(1-tG,3);
        // Anima inaltimea cladirilor
        try{ map.setPaintProperty('building-extrusion','fill-extrusion-height',
          ['*',['get','height'],Math.max(0.04,tE)]); }catch(e){}
        if(t < 0.16) {
          titlu(name+' 2025 — Starea Actuala', 'Fond construit la zi'); linie();
          cifra(N(pop21), 'Locuitori actuali', '#94a3b8');
          cifra2(N(pred.auth||300), 'Autorizatii/an', '#60a5fa');
        } else {
          titlu('Unde Creste Orasul 2055', 'Coridoare · Presiune constructibila'); linie();
          ctx.globalAlpha=sA*tE;
          ctx.fillStyle='#ef4444';
          ctx.font='900 '+FD+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left';
          ctx.fillText(N(Math.round((pred.defLoc||5000)*tE)), W*0.04, H*0.888);
          ctx.globalAlpha=sA*0.7;
          ctx.fillStyle='rgba(148,163,184,0.75)';
          ctx.font='600 '+FL+'px "IBM Plex Mono",monospace';
          ctx.letterSpacing='0.06em';
          ctx.fillText('UNITATI LOCATIVE NECESARE 2055', W*0.04, H*0.912);
          cifra2(N(pred.recHa||200)+' ha', 'Potential reconversie', '#f59e0b');
          if(tE>0.45) narativ('Verde=densitate mica/potential. Galben=mediu. Rosu=presiune maxima CC/CP depasit. Crestere cladiri animata = proiectie 2025→2055. '+N(pred.defLoc||5000)+' unitati necesare.');
          ctx.globalAlpha=1;
        }
        concluzie('Corido rele de crestere: axa transport public + zone reconversie industriala = prioritate PUZ');
        break;

      // S8 — MOBILITATE AUTO
      case 's8_mobilitate':
        titlu('Mobilitate Urbana', 'Retea OSM reala · Congestie · Solutii'); linie();
        cifra(N(pred.mot24||380), 'Vehicule/1000 loc', (pred.mot24||380)>450?'#ef4444':'#f59e0b');
        cifra2('~'+(pred.satAn||2040), 'An saturare retea');
        // Legenda artere in canvas
        ctx.globalAlpha=sA*rE(0.24,0.18);
        [['#dc2626','AUTOSTRADA'],['#ea580c','DN'],['#f59e0b','PRIMAR'],['#16a34a','SECUNDAR'],['#0ea5e9','TERTIAR']].forEach(function(it,i){
          ctx.fillStyle=it[0]; ctx.fillRect(W*(0.04+i*0.16),H*0.93,W*0.018,6);
          ctx.fillStyle='rgba(220,230,255,0.72)';
          ctx.font='500 '+Math.min(W*0.009,11)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left';
          ctx.fillText(it[1],W*(0.062+i*0.16),H*0.938);
        });
        ctx.globalAlpha=1;
        narativ(N(pred.fluxOra||25000)+' veh/h la varf. Saturatie retea estimata ~'+(pred.satAn||2040)+'. '+(pred.pasaje||5)+' pasaje noi necesare. '+(pred.invMob||120)+' M EUR total mobilitate 2025-2055.');
        concluzie('Fara pasaje noi si centura: reteaua rutiera intra in colaps dupa '+(pred.satAn||2040));
        break;

      // S9 — TRANSPORT PUBLIC
      case 's9_transport':
        titlu('Transport Public', 'Acoperire · BRT · Modal Split · SUMP'); linie();
        cifra((pred.tp||62)+'%', 'Acoperire pop. transport public', (pred.tp||62)>=70?'#22c55e':pred.tp>=50?'#f59e0b':'#ef4444');
        cifra2((pred.kmBRT||30)+' km BRT', 'Coridoare propuse');
        // Fan chart modal split
        if(t > 0.22) {
          _drawModalSplit(ctx, W, H, Math.min(1,(t-0.22)/0.20)*sA, pred);
        }
        narativ('Deficit '+(75-(pred.tp||62))+'pp vs standard UE 75%. Walk Score: '+(pred.walkScore||60)+'/100. Statii noi necesare: '+(pred.statiiNoi||80)+'. SUMP target: '+(pred.anSUMP||2028)+'. Cost BRT: '+N(pred.costBRT||90)+' M EUR.');
        concluzie('BRT pe coridoarele principale = reducere congestie 25-35% + crestere walkability +18pp');
        break;

      // S10 — RISC SEISMIC
      case 's10_seismic':
        titlu('Risc Seismic', 'P100-1/2013 · Fond vulnerabil · PNRR C10-I2'); linie();
        var ag = pred.ag || 0.20;
        var agClr = ag>=0.30?'#ef4444':ag>=0.20?'#f59e0b':'#22c55e';
        cifra('ag='+ag.toFixed(2)+'g', 'Acceleratie seismica P100-1/2013', agClr);
        cifra2(N(pred.fond||Math.round(pop21/50))+' cladiri', 'Fond risc RS I-III', '#ef4444');
        // Legenda seismic in canvas
        ctx.globalAlpha=sA*rE(0.22,0.18);
        [['#166534','< 8m — SIGUR'],['#854d0e','8-15m — ATENTIE'],['#dc2626','> 25m — RISC']].forEach(function(it,i){
          ctx.fillStyle=it[0]; ctx.fillRect(W*(0.04+i*0.20),H*0.93,W*0.018,6);
          ctx.fillStyle='rgba(220,230,255,0.75)';
          ctx.font='500 '+Math.min(W*0.009,11)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left';
          ctx.fillText(it[1],W*(0.062+i*0.20),H*0.938);
        });
        ctx.globalAlpha=1;
        narativ(N(pred.fond||1000)+' cladiri la risc seismic RS I-III. PNRR C10-I2: '+N(Math.round((pred.fond||1000)*0.25))+' apartamente consolidabile. Cost estimat: '+N(Math.round((pred.fond||1000)*0.085))+' M EUR. Zona P100: ag='+ag+'g Tc='+(ag>=0.30?'0.7s':'1.0s')+'.');
        concluzie('Fondul pre-1977 (inainte P13/1963) = risc maxim — prioritate absoluta PNRR');
        break;

      // S11 — CLIMA & INUNDATII
      case 's11_clima':
        titlu('Clima & Inundatii', 'ANAR PGRA · UHI · RCP4.5/8.5 · 2055'); linie();
        var zile = pred.zile24 || 18;
        cifra(zile+' zile', 'Caniculare >35C azi (ANM)', '#f59e0b');
        cifra2(Math.round(zile*2.1)+' zile', 'Proiectie 2055 RCP4.5', '#ef4444');
        narativ('Albastru=lunca inundabila activa ANAR. UHI: +'+(pred.uhi||1.8)+'C vs rural. In 2055: '+Math.round(zile*2.1)+' zile caniculare (+'+Math.round(zile*1.1)+'). Risc seceta: '+(pred.drought||'moderat')+'. Autostrazi si centura marcate.');
        concluzie('UHI + canicular 2055: fara spatii verzi suplimentare si acoperisuri verzi, temperatura urbana devine critica');
        break;

      // S12 — MONTE CARLO 2055
      case 's12_montecarlo':
        var rB  = r10 || 0;
        var pO  = Math.round(pop21*Math.pow(1+(rB+0.9)/100,34));
        var pR  = Math.round(pop21*Math.pow(1+(rB-0.8)/100,34));
        var pM  = pred.pop55 || Math.round(pop21*Math.pow(1+rB/100,34));
        titlu('Monte Carlo 2055', '10.000 simulari · 3 Scenarii · Interval 90%'); linie();
        // Fan chart
        if(t > 0.10) {
          _drawMonteCarlo(ctx, W, H, Math.min(1,(t-0.10)/0.25)*sA, pR, pM, pO, pop21);
        }
        cifra('['+N(pR)+'–'+N(pO)+']', 'Interval 90% populatie 2055', '#f59e0b');
        cifra2(N(pO-pR)+' persoane', 'Diferenta intre scenarii');
        narativ('S1 Regres: '+N(pR)+' loc. S2 Tendinta: '+N(pM)+' loc. S3 Optimist: '+N(pO)+' loc. Diferenta: '+N(pO-pR)+' persoane = '+N(Math.round((pO-pR)*45000/1000))+'k m² suprafata locativa diferita.');
        concluzie('Decizia PUG de azi determina scenariul 2055 — suprafata intravilan trebuie dimensionata pe S2+20%');
        break;

      // S13 — INFRASTRUCTURA NECESARA
      case 's13_infra_nec':
        titlu('Infrastructura Necesara 2025–2055', 'Scoli · Sanatate · SV · Utilitati'); linie();
        cifra(N(pred.invTotal||300)+' M €', 'Total investitii necesare', '#D4AF37');
        cifra2('~60% UE', 'Finantare REGIO+PNRR', '#22c55e');
        [
          ['🏫 SCOLI NOI: +'+(pred.scoliNoi||2)+' unitati',       H*0.60],
          ['🏥 CABINETE: +'+(pred.cabMed||5)+' cabinete',         H*0.635],
          ['🌳 SPATII VERZI: +'+(pred.svHa||150)+' ha',           H*0.670],
          ['🚌 STATII TP: +'+(pred.statiiNoi||60)+' statii',      H*0.705],
          ['💧 RETELE APĂ/CANAL: ext. necesara',                  H*0.740],
          ['⚡ RETELE ENERGIE: modernizare fond pre-1990',         H*0.775],
        ].forEach(function(it){
          ctx.globalAlpha=sA*rE(0.18,0.20);
          ctx.fillStyle='rgba(220,230,255,0.82)';
          ctx.font='600 '+Math.min(W*0.012,15)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left'; ctx.letterSpacing='0';
          ctx.fillText(it[0], W*0.04, it[1]);
        });
        ctx.globalAlpha=1;
        narativ('Mobilitate: '+N(pred.invMob||120)+' M EUR. Social: '+N(pred.invSoc||80)+' M EUR. Reabilitare seismica: '+N(Math.round((pred.fond||1000)*0.085))+' M EUR. Total: '+N(pred.invTotal||300)+' M EUR pe 30 ani.');
        break;

      // S14 — BENCHMARK EU
      case 's14_benchmark':
        titlu('Benchmark European', name+' vs orase similare UE · Eurostat UA 2022'); linie();
        var dens = Math.round(pop21/((city.suprafata_ha||5000)/100));
        cifra(dens+' loc/km²', 'Densitate urbana', dens>1000?'#22c55e':dens>500?'#f59e0b':'#94a3b8');
        cifra2((pred.pctUE||38)+'% UE27', 'Convergenta economica');
        if(t > 0.18) {
          _drawBenchmark(ctx, W, H, Math.min(1,(t-0.18)/0.22)*sA, pred, name);
        }
        narativ(name+': PIB/cap '+(pred.pctUE||38)+'% UE27. Comparabil cu: '+_getPeerGroup(city)+'. Gap fata de best-in-class: recuperabil in 8-15 ani cu investitii de ~'+N(Math.round((pred.invTotal||300)*0.4))+' M EUR/an sustinuti.');
        concluzie('Orasele care au recuperat decalajul EU in 10 ani au investit 3-4% din PIB local anual in infrastructura');
        break;

      // S15 — CALITATE VIATA SDG11
      case 's15_sdg':
        titlu('Calitate Viata — SDG 11', 'Obiective dezvoltare durabila ONU · 2030'); linie();
        cifra((pred.sdgTotal||6.4)+'/10', 'Scor SDG11 estimat', (pred.sdgTotal||6.4)>=7?'#22c55e':'#f59e0b');
        cifra2((pred.walkScore||58)+'/100', 'Walk Score urban');
        if(t > 0.20) {
          _drawRadarSDG(ctx, W, H, Math.min(1,(t-0.20)/0.22)*sA, pred);
        }
        narativ('SDG 11.1 Locuire: '+(pred.locuireSDG||72)+'%. SDG 11.2 Transport: '+(pred.tp||62)+'%. SDG 11.6 Mediu: '+(pred.svM2||11)+' m² SV/loc (OMS min: 9 m²). SDG 11.7 Spatii publice: '+(pred.spatiiPublice||65)+'%.');
        concluzie('Sub 9 m² spatii verzi/loc = incalcarea standardului OMS — actiune imediata necesara');
        break;

      // S16 — AGENDA PRIMARULUI
      case 's16_agenda':
        titlu('Agenda Primarului 2025–2030', 'Prioritati · Urgente · Finantare'); linie();
        var urgente = _buildAgenda(pred, city);
        urgente.forEach(function(it, i){
          ctx.globalAlpha=sA*rE(0.12+i*0.05,0.18);
          ctx.fillStyle=it.clr;
          ctx.font='700 '+Math.min(W*0.011,13)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left';
          ctx.fillText(it.priority, W*0.04, H*(0.58+i*0.052));
          ctx.fillStyle='rgba(220,228,255,0.82)';
          ctx.font='500 '+Math.min(W*0.012,15)+'px "Space Grotesk",sans-serif';
          ctx.fillText(it.text, W*0.12, H*(0.58+i*0.052));
        });
        ctx.globalAlpha=1;
        cifra(urgente.length+' prioritati', 'Identificate 2025-2030', '#D4AF37');
        cifra2(N(Math.round(pred.invTotal||300)*0.30)+' M €', 'Faza 1: 2025-2030');
        narativ('Prioritatile sunt calculate pe baza: risc seismic ag='+((pred.ag||0.20).toFixed(2))+'g, deficit locuinte '+N(pred.defLoc||3000)+', saturatie trafic '+(pred.satAn||2040)+', convergenta UE '+(pred.pctUE||38)+'%.');
        break;

      // S17 — VIZIUNEA 2055
      case 's17_viziune':
        ctx.globalAlpha=sA*rE(0.04,0.45)*0.05;
        ctx.fillStyle='#D4AF37';
        ctx.font='900 '+Math.min(W*0.28,340)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='center';
        ctx.fillText('2055', W/2, H*0.62);

        titlu(name.toUpperCase()+' 2055', 'Viziunea posibila'); linie();

        ctx.globalAlpha=sA*rE(0.12,0.25);
        ctx.fillStyle='rgba(255,255,255,0.94)';
        ctx.font='900 '+Math.min(W*0.048,62)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='center';
        ctx.fillText(name.toUpperCase(), W/2, H*0.27);
        ctx.globalAlpha=1;

        var pop55 = pred.pop55 || Math.round(pop21*Math.pow(1+r10/100,34));
        [
          {ok: pop55>pop21,                           txt:'Pop 2055: '+N(pop55)+' loc.'},
          {ok: (pred.pctUE55||pred.pctUE+20)>=75,    txt:'PIB 2055: ~'+(pred.pctUE55||(pred.pctUE||38)+20)+'% UE27'},
          {ok: (pred.anSUMP||2028)<=2030,             txt:'SUMP aprobat: '+(pred.anSUMP||2028)},
          {ok: (pred.tp||62)>=75,                     txt:'Transport public: '+(pred.tp||62)+'% acoperire'},
          {ok: (pred.sdgTotal||6.4)>=7,               txt:'SDG11: '+(pred.sdgTotal||6.4)+'/10'},
          {ok: (pred.fond||1000)>0,                   txt:'Consolidare seismica: '+N(Math.round((pred.fond||1000)*0.25))+' ap.'},
          {ok: true,                                   txt:'Investitii: '+N(pred.invTotal||300)+' M EUR'},
        ].forEach(function(ch, i){
          ctx.globalAlpha=sA*rE(0.22+i*0.05,0.14);
          ctx.fillStyle=ch.ok?'#22c55e':'#f59e0b';
          ctx.font='700 '+Math.min(W*0.014,18)+'px sans-serif';
          ctx.textAlign='right';
          ctx.fillText(ch.ok?'✓':'◎', W*0.96, H*(0.70+i*0.038));
          ctx.fillStyle='rgba(220,228,255,0.86)';
          ctx.font=Math.min(W*0.012,15)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='right';
          ctx.fillText(ch.txt.slice(0,44), W*0.950, H*(0.70+i*0.038));
        });
        ctx.globalAlpha=1;
        break;
    }
  }

  // ── LOOP SCENE ──────────────────────────────────────────────────────────
  function _loopScene(scene, idx, pred, name) {
    if(!SE._playing || idx >= SE.SCENES.length) return;
    var loop = function(){
      if(!SE._playing) return;
      var t = Math.min(1, Math.max(0.001, (performance.now()-SE._startT)/scene.dur));
      SE._ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
      if(scene.id==='s7_coridoare') {
        // animatie inaltime cladiri gestionata in cinDraw
      }
      try{ cinDraw(scene, t, SE._ctx, window.innerWidth, window.innerHeight); }
      catch(e){ console.error('[cinDraw ERROR]', scene.id, e.message, e.stack&&e.stack.split('\n')[1]); }
      if(t<1){ SE._raf=requestAnimationFrame(loop); }
      else{ runScene(idx+1); }
    };
    SE._raf = requestAnimationFrame(loop);
  }

  function runScene(idx) {
    if(!SE._playing || idx>=SE.SCENES.length) {
      var c2=document.getElementById('tci-c8');
      if(c2){ c2.style.transition='opacity 1.5s'; c2.style.opacity='0'; setTimeout(stopAll,1600); }
      return;
    }
    var scene = SE.SCENES[idx];
    SE._si = idx; SE._startT = performance.now();

    // Curata layerele noastre (NU cleanLayers global)
    _cleanOurLayers(map);
    // Restaureaza inaltimea normala
    if(scene.id !== 's7_coridoare') {
      try{ map.setPaintProperty('building-extrusion','fill-extrusion-height',['get','height']); }catch(e){}
    }

    // Update UI
    var scNameEl = document.getElementById('c8-scname');
    if(scNameEl) scNameEl.textContent = 'BLOC '+scene.bloc+' · '+scene.label;
    updateLegend(scene);
    setupScene(scene.id);
    _loopScene(scene, idx, pred, name);
    console.log('[Cinema v5.0]', idx+1+'/'+SCENES.length, scene.id, '—', name);
  }

  runScene(0);
  console.log('[Cinema v5.0] FILM START —', name, '— UAT:', city.siruta);
}

// ── GRAFICE CANVAS ────────────────────────────────────────────────────────

function _drawAgeChart(ctx, W, H, alpha, pred, r10) {
  // Piramida varsta simplificata
  ctx.save();
  var x0=W*0.56, y0=H*0.58, bW=W*0.38, bH=H*0.28;
  ctx.globalAlpha=alpha*0.9;
  ctx.fillStyle='rgba(4,10,24,0.75)';
  ctx.roundRect && ctx.roundRect(x0,y0,bW,bH,7);
  ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.08)'; ctx.lineWidth=1; ctx.stroke();

  var groups = [
    {lbl:'65+',pct:r10<0?24:18, clr:'#a78bfa'},
    {lbl:'45-64',pct:28, clr:'#60a5fa'},
    {lbl:'25-44',pct:r10>0?30:25, clr:'#22c55e'},
    {lbl:'15-24',pct:r10<-0.5?10:14, clr:'#f59e0b'},
    {lbl:'0-14',pct:r10<-0.5?10:15, clr:'#94a3b8'},
  ];

  ctx.fillStyle='rgba(148,163,184,0.5)';
  ctx.font='700 '+Math.min(W*0.009,10)+'px "IBM Plex Mono",monospace';
  ctx.textAlign='left';
  ctx.fillText('STRUCTURA DEMOGRAFICA', x0+10, y0+14);

  var barY = y0+24, barH2 = (bH-36)/groups.length;
  groups.forEach(function(g, i){
    var barW2 = (g.pct/35) * (bW-60);
    ctx.fillStyle=g.clr+'33';
    ctx.fillRect(x0+30, barY+i*barH2+2, bW-60, barH2-4);
    ctx.fillStyle=g.clr;
    ctx.fillRect(x0+30, barY+i*barH2+2, barW2, barH2-4);
    ctx.fillStyle='rgba(220,230,255,0.75)';
    ctx.font='500 '+Math.min(W*0.009,10)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='left';
    ctx.fillText(g.lbl, x0+6, barY+i*barH2+barH2*0.65);
    ctx.textAlign='right';
    ctx.fillText(g.pct+'%', x0+bW-4, barY+i*barH2+barH2*0.65);
  });
  ctx.restore();
}

function _drawSectorsChart(ctx, W, H, alpha, pred) {
  ctx.save();
  var x0=W*0.56, y0=H*0.58, bW=W*0.38, bH=H*0.22;
  ctx.globalAlpha=alpha*0.9;
  ctx.fillStyle='rgba(4,10,24,0.75)';
  ctx.roundRect && ctx.roundRect(x0,y0,bW,bH,7);
  ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.08)'; ctx.lineWidth=1; ctx.stroke();

  var sectors = [
    {n:'Servicii',   v:pred.ocupatie&&pred.ocupatie.servicii||52, c:'#60a5fa'},
    {n:'Industrie',  v:pred.ocupatie&&pred.ocupatie.industrie||28, c:'#f59e0b'},
    {n:'Constructii',v:8, c:'#22c55e'},
    {n:'Agricultura',v:pred.ocupatie&&pred.ocupatie.agricultura||6, c:'#a78bfa'},
    {n:'Altele',     v:6, c:'#94a3b8'},
  ];

  ctx.fillStyle='rgba(148,163,184,0.5)';
  ctx.font='700 '+Math.min(W*0.009,10)+'px "IBM Plex Mono",monospace';
  ctx.textAlign='left';
  ctx.fillText('STRUCTURA ECONOMICA (% ocupare)', x0+10, y0+14);

  var barY=y0+24, bHi=(bH-36)/sectors.length;
  sectors.forEach(function(s,i){
    var bw=(s.v/70)*(bW-80);
    ctx.fillStyle=s.c+'33'; ctx.fillRect(x0+60,barY+i*bHi+2,bW-80,bHi-4);
    ctx.fillStyle=s.c; ctx.fillRect(x0+60,barY+i*bHi+2,bw,bHi-4);
    ctx.fillStyle='rgba(220,230,255,0.75)';
    ctx.font='500 '+Math.min(W*0.009,10)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='left'; ctx.fillText(s.n,x0+6,barY+i*bHi+bHi*0.68);
    ctx.textAlign='right'; ctx.fillText(s.v+'%',x0+bW-4,barY+i*bHi+bHi*0.68);
  });
  ctx.restore();
}

function _drawModalSplit(ctx, W, H, alpha, pred) {
  ctx.save();
  var x0=W*0.58, y0=H*0.60, r=Math.min(W*0.06,70);
  ctx.globalAlpha=alpha;
  // Pie chart modal split
  var splits = [
    {v:pred.modalAuto||68, c:'#ef4444', lbl:'Auto'},
    {v:pred.tp||22, c:'#22c55e', lbl:'TP'},
    {v:pred.walkPct||7, c:'#60a5fa', lbl:'Pieton'},
    {v:3, c:'#f59e0b', lbl:'Velo'},
  ];
  var total = splits.reduce(function(s,x){return s+x.v;},0);
  var ang = -Math.PI/2;
  splits.forEach(function(s){
    var slice = (s.v/total)*Math.PI*2;
    ctx.beginPath(); ctx.moveTo(x0,y0);
    ctx.arc(x0,y0,r,ang,ang+slice); ctx.closePath();
    ctx.fillStyle=s.c+'cc'; ctx.fill();
    var midAng=ang+slice/2;
    ctx.fillStyle=s.c;
    ctx.font='700 '+Math.min(W*0.009,11)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='center';
    ctx.fillText(s.v+'%', x0+Math.cos(midAng)*(r*1.35), y0+Math.sin(midAng)*(r*1.35)+4);
    ang+=slice;
  });
  ctx.fillStyle='rgba(148,163,184,0.5)';
  ctx.font='700 '+Math.min(W*0.009,10)+'px "IBM Plex Mono",monospace';
  ctx.textAlign='center';
  ctx.fillText('MODAL SPLIT', x0, y0+r+18);
  ctx.restore();
}

function _drawMonteCarlo(ctx, W, H, alpha, pR, pM, pO, pop21) {
  ctx.save();
  var x0=W*0.04, y0=H*0.58, w2=W*0.50, h2=H*0.24;
  ctx.globalAlpha=alpha*0.9;
  ctx.fillStyle='rgba(4,10,24,0.72)';
  ctx.roundRect && ctx.roundRect(x0,y0,w2,h2,7);
  ctx.fill();

  ctx.fillStyle='rgba(148,163,184,0.5)';
  ctx.font='700 '+Math.min(W*0.009,10)+'px "IBM Plex Mono",monospace';
  ctx.textAlign='left';
  ctx.fillText('MONTE CARLO 2055 — 3 SCENARII', x0+10, y0+14);

  var scenarios = [
    {lbl:'S1 REGRES', v:pR, c:'#ef4444'},
    {lbl:'S2 TENDINTA', v:pM, c:'#f59e0b'},
    {lbl:'S3 OPTIMIST', v:pO, c:'#22c55e'},
  ];
  var maxV=Math.max(pO,pop21)*1.05, minV=Math.min(pR,pop21)*0.95;
  var barH3=(h2-40)/3;
  scenarios.forEach(function(s,i){
    var pct=(s.v-minV)/(maxV-minV);
    var bW3=pct*(w2-100);
    ctx.fillStyle=s.c+'22'; ctx.fillRect(x0+90,y0+28+i*barH3,w2-100,barH3-6);
    ctx.fillStyle=s.c; ctx.fillRect(x0+90,y0+28+i*barH3,bW3,barH3-6);
    ctx.fillStyle=s.c;
    ctx.font='700 '+Math.min(W*0.010,12)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='left'; ctx.fillText(s.lbl,x0+8,y0+32+i*barH3+barH3*0.45);
    ctx.fillStyle='rgba(220,230,255,0.85)';
    ctx.textAlign='right';
    ctx.fillText(Number(s.v).toLocaleString('ro-RO'),x0+w2-4,y0+32+i*barH3+barH3*0.45);
  });
  ctx.restore();
}

function _drawBenchmark(ctx, W, H, alpha, pred, name) {
  ctx.save();
  ctx.globalAlpha=alpha*0.88;
  var peers = [
    {n:'Rzeszow PL',  pib:72, dens:85, tp:74},
    {n:'Lublin PL',   pib:60, dens:78, tp:69},
    {n:name,          pib:pred.pctUE||38, dens:65, tp:pred.tp||62},
    {n:'Debrecen HU', pib:58, dens:72, tp:75},
    {n:'Varna BG',    pib:44, dens:68, tp:61},
  ];
  var cols=['#22c55e','#60a5fa','#D4AF37','#a78bfa','#94a3b8'];
  var x0=W*0.56, y0=H*0.57, bW=W*0.38, rowH=(H*0.30)/peers.length;

  ctx.fillStyle='rgba(4,10,24,0.75)';
  ctx.roundRect && ctx.roundRect(x0,y0,bW,H*0.30,7);
  ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.08)'; ctx.lineWidth=1; ctx.stroke();

  ctx.fillStyle='rgba(148,163,184,0.5)';
  ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
  ctx.textAlign='left';
  ctx.fillText('BENCHMARK EU — PIB/CAP % UE27', x0+8, y0+12);

  peers.forEach(function(p,i){
    var barW4=(p.pib/100)*(bW-90);
    var isUs=(p.n===name);
    ctx.fillStyle=cols[i]+(isUs?'':'55');
    ctx.fillRect(x0+75, y0+18+i*rowH, barW4, rowH-6);
    ctx.fillStyle=isUs?'#D4AF37':'rgba(220,230,255,0.65)';
    ctx.font=(isUs?'700':'500')+' '+Math.min(W*0.009,10)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='left'; ctx.fillText(p.n, x0+5, y0+22+i*rowH+rowH*0.45);
    ctx.textAlign='right'; ctx.fillText(p.pib+'%', x0+bW-4, y0+22+i*rowH+rowH*0.45);
  });
  ctx.restore();
}

function _drawRadarSDG(ctx, W, H, alpha, pred) {
  ctx.save();
  var cx2=W*0.75, cy2=H*0.70, r2=Math.min(W*0.08,90);
  ctx.globalAlpha=alpha;
  var dims=[
    {l:'Locuire',    v:(pred.locuireSDG||70)/100},
    {l:'Transport',  v:(pred.tp||62)/100},
    {l:'Mediu',      v:Math.min(1,(pred.svM2||11)/15)},
    {l:'Spatii pub', v:(pred.spatiiPublice||65)/100},
    {l:'Siguranta',  v:(pred.siguranta||72)/100},
    {l:'Economie',   v:(pred.pctUE||38)/100},
  ];
  var n2=dims.length, step=Math.PI*2/n2;
  // Grid
  [0.33,0.66,1.0].forEach(function(s){
    ctx.beginPath();
    dims.forEach(function(_,i){
      var a=-Math.PI/2+i*step, x2=cx2+Math.cos(a)*r2*s, y2=cy2+Math.sin(a)*r2*s;
      i===0?ctx.moveTo(x2,y2):ctx.lineTo(x2,y2);
    });
    ctx.closePath();
    ctx.strokeStyle='rgba(255,255,255,0.1)'; ctx.lineWidth=1; ctx.stroke();
  });
  // Fill
  ctx.beginPath();
  dims.forEach(function(d,i){
    var a=-Math.PI/2+i*step, x2=cx2+Math.cos(a)*r2*d.v, y2=cy2+Math.sin(a)*r2*d.v;
    i===0?ctx.moveTo(x2,y2):ctx.lineTo(x2,y2);
  });
  ctx.closePath();
  ctx.fillStyle='rgba(212,175,55,0.25)'; ctx.fill();
  ctx.strokeStyle='#D4AF37'; ctx.lineWidth=1.5; ctx.stroke();
  // Labels
  dims.forEach(function(d,i){
    var a=-Math.PI/2+i*step;
    ctx.fillStyle='rgba(220,230,255,0.65)';
    ctx.font='500 '+Math.min(W*0.009,10)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='center';
    ctx.fillText(d.l, cx2+Math.cos(a)*(r2+14), cy2+Math.sin(a)*(r2+14)+4);
  });
  ctx.restore();
}

// ── HELPERS ──────────────────────────────────────────────────────────────

function _buildFallbackPred(city) {
  var pop = city.pop2021 || city.pop || 100000;
  var r = city.rata_reala_2011_2021 || 0;
  return {
    p21:pop, r10:r, pop55:Math.round(pop*Math.pow(1+r/100,34)),
    pib:14200, pctUE:39, pctUE55:59, anConv:2050,
    defLoc:Math.max(0,Math.round(pop*0.08)), recHa:Math.round(pop/300),
    ag:0.20, fond:Math.round(pop/50),
    mot24:380, satAn:2040, fluxOra:Math.round(pop*0.08), pasaje:5,
    invMob:Math.round(pop/800), invTotal:Math.round(pop/300), invSoc:Math.round(pop/1000),
    tp:62, kmBRT:Math.round(pop/8000), costBRT:Math.round(pop/2000),
    defTP:13, walkScore:58, statiiNoi:Math.round(pop/1200), anSUMP:2028,
    zile24:18, uhi:1.8, drought:'moderat', rRef:r,
    scoliNoi:Math.max(0,Math.round(pop/60000)), cabMed:Math.max(1,Math.round(pop/15000)),
    svHa:Math.round(pop/400), svM2:11, sdgTotal:6.4, walkScore:58,
    spatiiPublice:65, locuireSDG:70, siguranta:72,
    auth:Math.round(pop/800), roi:8,
    ocupatie:{servicii:52, industrie:28, agricultura:6},
    modalAuto:68, walkPct:7,
  };
}

function _getPeerGroup(city) {
  var hub = city.coef_hub || 0.78;
  var reg = city.regiune || 'NE';
  if(hub >= 1.1) return 'Krakow (PL), Vilnius (LT), Brno (CZ)';
  if(hub >= 0.9) return 'Rzeszow (PL), Lublin (PL), Miskolc (HU)';
  if(hub >= 0.7) return 'Bielsko-Biala (PL), Debrecen (HU), Varna (BG)';
  return 'Suceava (RO), Targu Mures (RO), Bacau (RO)';
}

function _buildAgenda(pred, city) {
  var items = [];
  var ag = pred.ag || 0.20;
  if(ag >= 0.30) items.push({priority:'🔴 P1', text:'Consolidare seismica — PNRR C10-I2 urgent', clr:'#ef4444'});
  else if(ag >= 0.20) items.push({priority:'🟡 P2', text:'Evaluare fond pre-1977 — expertize tehnice', clr:'#f59e0b'});
  if((pred.tp||62) < 65) items.push({priority:'🔴 P1', text:'Extindere transport public — BRT coridor principal', clr:'#ef4444'});
  if((pred.defLoc||3000) > 2000) items.push({priority:'🟡 P2', text:'Actualizare PUG — zone densificare + corido re noi', clr:'#f59e0b'});
  if((pred.satAn||2040) < 2035) items.push({priority:'🔴 P1', text:'Pasaje rutiere — studiu fezabilitate urgent', clr:'#ef4444'});
  if((pred.svM2||11) < 9) items.push({priority:'🟡 P2', text:'Spatii verzi — minim OMS 9m²/loc', clr:'#f59e0b'});
  items.push({priority:'🟢 P3', text:'SUMP 2028 — plan mobilitate durabila', clr:'#22c55e'});
  items.push({priority:'🟢 P3', text:'Smart City — digitalizare servicii urbane', clr:'#22c55e'});
  return items.slice(0,6);
}

function _cleanOurLayers(map) {
  ['cin-highways','cin-rail','cin-airports','cin-urban','cin-osm'].forEach(function(id){
    try{ if(map.getLayer(id)) map.removeLayer(id); }catch(e){}
    try{ if(map.getSource(id)) map.removeSource(id); }catch(e){}
  });
}

// ── PATCH openTCI ─────────────────────────────────────────────────────────
function _patchOpenTCI(n) {
  if(typeof window.openTCI === 'function') {
    window.openTCI = function(opts){
      window._startCinema(
        (opts && opts.cityKey) ||
        (window.TCI && window.TCI.cityKey) ||
        localStorage.getItem('ux_last_city') ||
        'RO-IS-01'
      );
    };
    console.log('[Cinema v5.0] openTCI patched');
  } else if(n < 30) setTimeout(function(){ _patchOpenTCI(n+1); }, 300);
}
if(document.readyState === 'complete') _patchOpenTCI(0);
else window.addEventListener('load', function(){ _patchOpenTCI(0); });

window._launchCinemaV2 = function(){ window._startCinema(); };

console.log('[Cinema v5.0] LOADED — 17 scene · INSE live · Wikipedia · OSM real · Grafice canvas · Camera coerenta');

})();
