// cinema-launcher.js — UrbanX Cinema v5.0
// FUNDAMENT CONFIRMAT: jumpTo(15.5,72) + setPaintProperty('building-extrusion')
// Zero layere custom. Zero PUG loading. Cladirile Mapbox colorate direct.
(function(){
'use strict';

var SCENES = [
  {id:'intro',   dur:12000, label:'IAȘI — IDENTITATE'},
  {id:'oras3d',  dur:16000, label:'ORASUL AZI — 3D'},
  {id:'demo',    dur:16000, label:'POPULATIA'},
  {id:'eco',     dur:16000, label:'ECONOMIA'},
  {id:'crestere',dur:20000, label:'UNDE CRESTE 2055'},
  {id:'mobil',   dur:18000, label:'MOBILITATE'},
  {id:'tp',      dur:16000, label:'TRANSPORT PUBLIC'},
  {id:'seismic', dur:16000, label:'RISC SEISMIC'},
  {id:'inund',   dur:16000, label:'INUNDATII & CLIMA'},
  {id:'mc2055',  dur:18000, label:'MONTE CARLO 2055'},
  {id:'infra',   dur:16000, label:'CE CONSTRUIM'},
  {id:'viziune', dur:20000, label:'VIZIUNEA 2055'},
];

// Culorile sunt definite in setColor() dupa tipul real al cladirii

window._startCinema = function(cityKey) {
  cityKey = cityKey||window.TCI?.cityKey||localStorage.getItem('ux_last_city')||'RO-IS-01';
  var map = window.map;
  var SE  = window._CinemaEngine;
  if(!map||!SE){console.error('[Cinema] map sau SE lipsa');return;}

  // Suprascrie SCENES si _setupMap
  SE.SCENES = SCENES;
  SE._setupMap = function(){};

  SE._playing=false;
  if(SE._raf)cancelAnimationFrame(SE._raf);
  if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
  try{SE._cleanLayers.call(SE);}catch(e){}
  try{if(map.getLayer('cin-osm'))map.removeLayer('cin-osm');}catch(e){}
  try{if(map.getSource('cin-osm'))map.removeSource('cin-osm');}catch(e){}

  // Ascunde UI
  var hidden=[];
  ['#panel','#panel-tabs','#panel-body','#topbar','#mob-sheet','#utr-drawer',
   '#info-drawer','#ux-gdpr-footer','.mapboxgl-ctrl-bottom-left',
   '.mapboxgl-ctrl-bottom-right','nav','#tci-adv-menu','#viz-menu',
   '#rapoarte-menu','#analize-menu'].forEach(function(sel){
    document.querySelectorAll(sel).forEach(function(el){
      if(!el._cs)el._cs=el.style.cssText;
      el.style.setProperty('display','none','important');
      hidden.push(el);
    });
  });

  // Canvas
  document.querySelectorAll('#tci-c8,#tci-c6,#tci-c7').forEach(function(e){e.remove();});
  var cv=document.createElement('canvas');
  cv.id='tci-c8';cv.width=window.innerWidth;cv.height=window.innerHeight;
  cv.style.cssText='position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:999999;pointer-events:none;';
  document.body.appendChild(cv);

  SE._map=map;
  SE._city=(window._RO_CITIES_DB||{})[cityKey]||Object.values(window._RO_CITIES_DB||{})[0];
  SE._pred=window._PredEngine.calc(SE._city);
  SE._canvas=cv;SE._ctx=cv.getContext('2d');
  SE._playing=true;SE._si=0;

  var cx=SE._city.lon||27.601, cy=SE._city.lat||47.158;
  var pred=SE._pred, name=SE._city.name||'UAT';

  // Opreste TCI director care reseteaza camera
  try{TCI._playing=false;TCI._stopped=true;}catch(e){}
  try{if(TCI._director){TCI._director._playing=false;}}catch(e){}
  try{TCI.pause?.();}catch(e){}

  // Override flyTo/jumpTo — blocheaza apelurile cu pitch<60 sau zoom<14 din TCI
  var _oFly=map.flyTo.bind(map), _oJump=map.jumpTo.bind(map);
  map.flyTo=function(o){
    if(!SE._playing){map.flyTo=_oFly;map.jumpTo=_oJump;return _oFly(o);}
    var sid=SE.SCENES[SE._si]?.id;
    var isIntro=(sid==='intro'||sid==='oras3d');
    if(!isIntro&&((o.pitch||0)<60||(o.zoom||20)<14))return map;
    return _oFly(o);
  };
  map.jumpTo=function(o){
    if(!SE._playing){map.flyTo=_oFly;map.jumpTo=_oJump;return _oJump(o);}
    if((o.pitch||0)<60||(o.zoom||20)<14)return _oJump(Object.assign({},o,{pitch:72,zoom:15.5}));
    return _oJump(o);
  };

  // Butoane
  document.getElementById('tci-c8-ctrl')?.remove();
  // Legenda cladiri
  document.getElementById('cin-legend')?.remove();
  var leg=document.createElement('div');
  leg.id='cin-legend';
  leg.style.cssText='position:fixed;top:80px;right:16px;z-index:1000000;background:rgba(2,6,18,0.82);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 14px;font-family:"Space Grotesk",sans-serif;font-size:12px;color:#e2e8f0;min-width:160px;';
  leg.innerHTML='<div style="font-size:10px;font-weight:700;color:#D4AF37;letter-spacing:.1em;margin-bottom:6px">TIPURI CLADIRI</div>'
    +'<div style="display:flex;flex-direction:column;gap:3px">'
    +'<div><span style="display:inline-block;width:10px;height:10px;background:#3b82f6;border-radius:2px;margin-right:6px"></span>Apartamente</div>'
    +'<div><span style="display:inline-block;width:10px;height:10px;background:#93c5fd;border-radius:2px;margin-right:6px"></span>Case</div>'
    +'<div><span style="display:inline-block;width:10px;height:10px;background:#f59e0b;border-radius:2px;margin-right:6px"></span>Comercial</div>'
    +'<div><span style="display:inline-block;width:10px;height:10px;background:#a78bfa;border-radius:2px;margin-right:6px"></span>Birouri</div>'
    +'<div><span style="display:inline-block;width:10px;height:10px;background:#22c55e;border-radius:2px;margin-right:6px"></span>Scoli</div>'
    +'<div><span style="display:inline-block;width:10px;height:10px;background:#ef4444;border-radius:2px;margin-right:6px"></span>Spitale</div>'
    +'<div><span style="display:inline-block;width:10px;height:10px;background:#d97706;border-radius:2px;margin-right:6px"></span>Biserici</div>'
    +'<div><span style="display:inline-block;width:10px;height:10px;background:#6b7280;border-radius:2px;margin-right:6px"></span>Industrial</div>'
    +'</div>';
  document.body.appendChild(leg);

  var ctrl=document.createElement('div');
  ctrl.id='tci-c8-ctrl';
  ctrl.style.cssText='position:fixed;bottom:24px;right:20px;z-index:1000000;display:flex;gap:8px;';
  ctrl.innerHTML='<button id="c8p" style="background:rgba(0,0,0,.8);border:1px solid rgba(255,255,255,.15);color:#fff;padding:10px 18px;border-radius:10px;cursor:pointer;font:700 13px monospace">◀</button>'
    +'<button id="c8pause" style="background:rgba(0,0,0,.8);border:1px solid rgba(255,255,255,.15);color:#fff;padding:10px 16px;border-radius:10px;cursor:pointer;font:700 13px monospace">⏸</button>'
    +'<button id="c8n" style="background:rgba(0,0,0,.8);border:1px solid rgba(255,255,255,.15);color:#fff;padding:10px 18px;border-radius:10px;cursor:pointer;font:700 13px monospace">▶</button>'
    +'<button id="c8s" style="background:rgba(150,0,0,.8);border:1px solid rgba(255,60,60,.3);color:#ffaaaa;padding:10px 14px;border-radius:10px;cursor:pointer;font:700 13px monospace">✕</button>';
  document.body.appendChild(ctrl);

  // Culoarea originala a cladirilor
  var origColor = null;
  try{origColor=map.getPaintProperty('building-extrusion','fill-extrusion-color');}catch(e){}

  function stopAll(){
    SE._playing=false;
    // Restaureaza flyTo/jumpTo originale
    try{map.flyTo=_oFly;map.jumpTo=_oJump;}catch(e){}
    if(SE._raf)cancelAnimationFrame(SE._raf);
    if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
    try{SE._cleanLayers.call(SE);}catch(e){}
    try{if(map.getLayer('cin-osm'))map.removeLayer('cin-osm');}catch(e){}
    try{if(map.getSource('cin-osm'))map.removeSource('cin-osm');}catch(e){}
    // Restaureaza culoarea originala
    try{if(origColor)map.setPaintProperty('building-extrusion','fill-extrusion-color',origColor);}catch(e){}
    document.getElementById('tci-c8')?.remove();
    document.getElementById('tci-c8-ctrl')?.remove();
    document.getElementById('cin-legend')?.remove();
    hidden.forEach(function(el){el.style.cssText=el._cs||'';delete el._cs;});
    try{map.flyTo({center:[cx,cy],zoom:13,pitch:45,bearing:0,duration:1500,essential:true});}catch(e){}
    try{map.setConfigProperty('basemap','lightPreset','day');}catch(e){}
  }

  function goScene(i){
    if(i<0||i>=SE.SCENES.length)return;
    SE._playing=false;
    if(SE._raf)cancelAnimationFrame(SE._raf);
    if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
    try{SE._cleanLayers.call(SE);}catch(e){}
    try{if(map.getLayer('cin-osm'))map.removeLayer('cin-osm');}catch(e){}
    try{if(map.getSource('cin-osm'))map.removeSource('cin-osm');}catch(e){}
    SE._playing=true;
    runScene(i);
  }

  document.getElementById('c8s').onclick=stopAll;
  var _pausedT = 0; // t-ul la care s-a apăsat pauza
  document.getElementById('c8pause').onclick=function(){
    if(SE._playing){
      // PAUZA
      _pausedT = Math.min(1,Math.max(0.001,(performance.now()-SE._startT)/SE.SCENES[SE._si].dur));
      SE._playing=false;
      if(SE._raf)cancelAnimationFrame(SE._raf);
      if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
      document.getElementById('c8pause').textContent='▶';
    } else {
      // PLAY — reporneste de la t-ul salvat
      SE._playing=true;
      document.getElementById('c8pause').textContent='⏸';
      var scene=SE.SCENES[SE._si];
      // Recalculeaza startT astfel incat t sa fie _pausedT
      SE._startT = performance.now() - _pausedT * scene.dur;
      var loop2=function(){
        if(!SE._playing)return;
        var t=Math.min(1,Math.max(0.001,(performance.now()-SE._startT)/scene.dur));
        SE._ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
        if(scene.id==='crestere'){
          var tG=t<0.15?0:Math.min(1,(t-0.15)/0.70);
          var tE=1-Math.pow(1-tG,3);
          try{map.setPaintProperty('building-extrusion','fill-extrusion-height',['*',['get','height'],Math.max(0.05,tE)]);}catch(e){}
        }
        try{cinDraw(scene.id,t,SE._ctx,window.innerWidth,window.innerHeight,pred,name,SE);}catch(e){}
        if(t<1){SE._raf=requestAnimationFrame(loop2);}
        else{goScene(SE._si+1);}
      };
      SE._raf=requestAnimationFrame(loop2);
    }
  };
  document.getElementById('c8n').onclick=function(){goScene(SE._si+1);};
  document.getElementById('c8p').onclick=function(){goScene(SE._si-1);};

  function lp(p){try{map.setConfigProperty('basemap','lightPreset',p);}catch(e){}}
  function rot(b0,spd){
    if(SE._rotInt)clearInterval(SE._rotInt);
    var b=b0;
    SE._rotInt=setInterval(function(){
      if(!SE._playing){clearInterval(SE._rotInt);SE._rotInt=null;return;}
      b+=spd;try{map.setBearing(b%360);}catch(e){}
    },50);
  }
  // Culori dupa tipul real al cladirii din OSM
  var COLOR_BY_TYPE = ['match',['get','type'],
    'apartments','#3b82f6',        // albastru - bloc apartamente
    'residential','#60a5fa',       // albastru deschis - casa
    'house','#93c5fd',             // albastru pal - casa individuala
    'commercial','#f59e0b',        // portocaliu - comercial
    'retail','#fbbf24',            // galben - retail
    'office','#a78bfa',            // violet - birouri
    'industrial','#6b7280',        // gri - industrial
    'warehouse','#4b5563',         // gri inchis - depozit
    'school','#22c55e',            // verde - scoala
    'university','#16a34a',        // verde inchis - universitate
    'hospital','#ef4444',          // rosu - spital
    'church','#d97706',            // maro - biserica
    'cathedral','#92400e',         // maro inchis - catedrala
    'civic','#8b5cf6',             // violet - civic/primarie
    'public','#7c3aed',            // violet inchis - public
    'hotel','#ec4899',             // roz - hotel
    'garage','#374151',            // gri foarte inchis - garaj
    'parking','#1f2937',           // aproape negru - parcare
    '#94a3b8'                      // default - gri albastru
  ];

  function setColor(sceneId){
    // Scenele speciale au culori tematice, restul dupa tip real
    if(sceneId==='seismic'){
      try{map.setPaintProperty('building-extrusion','fill-extrusion-color',
        ['interpolate',['linear'],['get','height'],
          0,'#166534', 8,'#854d0e', 15,'#b91c1c', 25,'#dc2626', 40,'#ef4444']);}catch(e){}
    } else if(sceneId==='inund'){
      try{map.setPaintProperty('building-extrusion','fill-extrusion-color',
        ['interpolate',['linear'],['get','height'],
          0,'#1e3a8a', 5,'#1d4ed8', 15,'#3b82f6', 30,'#93c5fd']);}catch(e){}
    } else if(sceneId==='crestere'){
      try{map.setPaintProperty('building-extrusion','fill-extrusion-color',
        ['interpolate',['linear'],['get','height'],
          0,'#14532d', 8,'#15803d', 20,'#f59e0b', 35,'#ef4444']);}catch(e){}
    } else {
      // Toate celelalte scene: culori reale dupa tipul cladirii
      try{map.setPaintProperty('building-extrusion','fill-extrusion-color',COLOR_BY_TYPE);}catch(e){}
    }
    try{map.setPaintProperty('building-extrusion','fill-extrusion-opacity',0.90);}catch(e){}
  }

  // OSM roads cache
  var _osmFt=null;
  function fetchOSM(cb){
    if(_osmFt){cb(_osmFt);return;}
    var q='[out:json][timeout:25];(way["highway"~"motorway|trunk|primary|secondary|tertiary"](around:8000,'+cy+','+cx+'););out geom;';
    fetch('https://urbanx-proxy.3dtravelsoftart.workers.dev/osm?q='+encodeURIComponent(q))
      .then(function(r){return r.json();})
      .then(function(d){
        var ft=[];
        (d.elements||[]).forEach(function(el){
          if(el.type!=='way'||!el.geometry)return;
          var coords=el.geometry.map(function(n){return[n.lon,n.lat];});
          var hw=(el.tags&&el.tags.highway)||'tertiary';
          var col,w;
          if(hw==='motorway'){col='#dc2626';w=10;}
          else if(hw==='trunk'){col='#ea580c';w=8;}
          else if(hw==='primary'){col='#f59e0b';w=6;}
          else if(hw==='secondary'){col='#16a34a';w=4;}
          else{col='#0ea5e9';w=2;}
          ft.push({type:'Feature',geometry:{type:'LineString',coordinates:coords},
            properties:{c:col,w:w,hw:hw}});
        });
        _osmFt=ft;cb(ft);
      }).catch(function(){cb([]);});
  }
  function addOSM(ft){
    if(!ft||!ft.length)return;
    try{
      if(map.getLayer('cin-osm'))map.removeLayer('cin-osm');
      if(map.getSource('cin-osm'))map.removeSource('cin-osm');
      map.addSource('cin-osm',{type:'geojson',data:{type:'FeatureCollection',features:ft}});
      map.addLayer({id:'cin-osm',type:'line',source:'cin-osm',
        paint:{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0.92},
        layout:{'line-cap':'round','line-join':'round'}
      });
    }catch(e){}
  }

  // Cartiere offset pentru zbor dinamic
  var offsets = [
    [cx, cy],
    [cx-0.018, cy+0.012],
    [cx+0.020, cy-0.010],
    [cx-0.010, cy-0.018],
    [cx+0.015, cy+0.015],
  ];

  // ── SETUP per scena: camera dinamica + culoare cladiri ──────────────────
  function setupScene(id){
    if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}

    // Culoare cladiri specifica scenei
    setColor(id);

    // Helper: dive 2D -> 3D pe un punct
    function dive(center, lpMode, delay, finalBearing){
      lp(lpMode||'night');
      delay = delay || 0;
      finalBearing = finalBearing || 20;
      setTimeout(function(){
        if(!SE._playing)return;
        // 1. Vedere de ansamblu 2D
        try{map.jumpTo({center:center,zoom:10,pitch:0,bearing:0});}catch(e){}
        // 2. Incepe sa coboare si sa incline
        setTimeout(function(){
          if(!SE._playing)return;
          try{map.flyTo({center:center,zoom:12.5,pitch:35,bearing:finalBearing*0.3,duration:3000,essential:true});}catch(e){}
        },300);
        // 3. Scufundare in 3D
        setTimeout(function(){
          if(!SE._playing)return;
          try{map.flyTo({center:center,zoom:15.5,pitch:72,bearing:finalBearing,duration:5000,essential:true});}catch(e){}
        },3500);
      }, delay);
    }

    switch(id){
      case 'intro':
        // Romania -> Moldova -> Iasi: zoom dramatic
        lp('night');
        try{map.jumpTo({center:[25,45.5],zoom:6,pitch:0,bearing:0});}catch(e){}
        setTimeout(function(){if(!SE._playing)return;try{map.flyTo({center:[27,47],zoom:9,pitch:0,bearing:0,duration:3000,essential:true});}catch(e){}},300);
        setTimeout(function(){if(!SE._playing)return;dive([cx,cy],'night',3500,20);},3500);
        break;

      case 'oras3d':
        // Vedere generala 2D -> scufundare pe centru -> zbor pe cartiere
        dive([cx,cy],'day',0,30);
        setTimeout(function(){if(!SE._playing)return;try{map.flyTo({center:offsets[1],zoom:15.5,pitch:72,bearing:90,duration:6000,essential:true});}catch(e){}},10000);
        setTimeout(function(){if(!SE._playing)return;try{map.flyTo({center:offsets[2],zoom:15.5,pitch:72,bearing:150,duration:5000,essential:true});}catch(e){}},17000);
        break;

      case 'demo':
        // Heatmap populatie: vedere 2D din sus -> coboara pe zone dense
        lp('dawn');
        try{map.jumpTo({center:[cx,cy],zoom:10,pitch:0,bearing:0});}catch(e){}
        setTimeout(function(){if(!SE._playing)return;try{map.flyTo({center:[cx,cy],zoom:12.5,pitch:30,bearing:0,duration:3000,essential:true});}catch(e){}},300);
        setTimeout(function(){if(!SE._playing)return;try{map.flyTo({center:offsets[3],zoom:14.5,pitch:62,bearing:-20,duration:5000,essential:true});}catch(e){}},4000);
        break;

      case 'eco':
        // Economie: vedere regionala 2D -> zona comerciala 3D
        dive([cx,cy],'day',0,50);
        setTimeout(function(){if(!SE._playing)return;rot(50,0.015);},9500);
        break;

      case 'crestere':
        // 2D overview -> scufundare -> cladiri cresc
        lp('night');
        try{map.jumpTo({center:[cx,cy],zoom:10,pitch:0,bearing:0});}catch(e){}
        try{map.setPaintProperty('building-extrusion','fill-extrusion-height',1);}catch(e){}
        try{map.setPaintProperty('building-extrusion','fill-extrusion-base',0);}catch(e){}
        setTimeout(function(){if(!SE._playing)return;try{map.flyTo({center:[cx,cy],zoom:13,pitch:40,bearing:10,duration:3000,essential:true});}catch(e){}},300);
        setTimeout(function(){if(!SE._playing)return;try{map.flyTo({center:[cx,cy],zoom:15.5,pitch:72,bearing:25,duration:5000,essential:true});}catch(e){}},4000);
        // Zbor pe cartiere in timp ce cresc cladirile
        setTimeout(function(){if(!SE._playing)return;try{map.flyTo({center:offsets[1],zoom:15.5,pitch:72,bearing:70,duration:7000,essential:true});}catch(e){}},10000);
        setTimeout(function(){if(!SE._playing)return;try{map.flyTo({center:offsets[2],zoom:15.5,pitch:72,bearing:120,duration:7000,essential:true});}catch(e){}},18000);
        break;
      case 'mobil':
        lp('night');
        try{map.jumpTo({center:[cx,cy],zoom:11.5,pitch:50,bearing:0});}catch(e){}
        setColor('mobil');
        // Fetch OSM cu radius mare - tot orasul
        var qMob='[out:json][timeout:30];(way["highway"~"motorway|trunk|primary|secondary|tertiary|residential"](around:12000,'+cy+','+cx+'););out geom;';
        fetch('https://urbanx-proxy.3dtravelsoftart.workers.dev/osm?q='+encodeURIComponent(qMob))
          .then(function(r){return r.json();})
          .then(function(d){
            if(!SE._playing)return;
            var ft=[];
            (d.elements||[]).forEach(function(el){
              if(el.type!=='way'||!el.geometry)return;
              var coords=el.geometry.map(function(n){return[n.lon,n.lat];});
              var hw=(el.tags&&el.tags.highway)||'residential';
              var col,w;
              if(hw==='motorway'){col='#dc2626';w=8;}
              else if(hw==='trunk'){col='#ea580c';w=6;}
              else if(hw==='primary'){col='#f59e0b';w=5;}
              else if(hw==='secondary'){col='#16a34a';w=3;}
              else if(hw==='tertiary'){col='#0ea5e9';w=2;}
              else{col='#334155';w=1;}
              ft.push({type:'Feature',geometry:{type:'LineString',coordinates:coords},
                properties:{c:col,w:w,hw:hw}});
            });
            console.log('[Cinema] OSM roads:',ft.length);
            if(ft.length>0){
              try{
                if(map.getLayer('cin-osm'))map.removeLayer('cin-osm');
                if(map.getSource('cin-osm'))map.removeSource('cin-osm');
                map.addSource('cin-osm',{type:'geojson',data:{type:'FeatureCollection',features:ft}});
                map.addLayer({id:'cin-osm',type:'line',source:'cin-osm',
                  paint:{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0.92,'line-blur':0.3},
                  layout:{'line-cap':'round','line-join':'round'}
                });
              }catch(e){console.warn('OSM layer:',e);}
            }
            setTimeout(function(){
              if(!SE._playing)return;
              try{map.flyTo({center:[cx,cy],zoom:12.5,pitch:58,bearing:15,duration:5000,essential:true});}catch(e){}
            },300);
          }).catch(function(e){console.warn('OSM fetch:',e);});
        break;
      case 'tp':
        lp('day');
        rot(20,0.015);
        try{SE._addTransit&&SE._addTransit.call(SE,map);}catch(e){}
        break;
      case 'seismic':
        lp('night');
        try{map.jumpTo({center:[cx,cy],zoom:13,pitch:58,bearing:0});}catch(e){}
        try{SE._addSeismic&&SE._addSeismic.call(SE,map);}catch(e){}
        // Cladirile inalte = mai vulnerabile la seismic
        try{map.setPaintProperty('building-extrusion','fill-extrusion-color',
          ['interpolate',['linear'],['get','height'],
            0,'#166534', 5,'#14532d', 10,'#713f12', 15,'#b45309', 25,'#dc2626', 40,'#ef4444']);}catch(e){}
        setTimeout(function(){if(!SE._playing)return;try{map.flyTo({center:offsets[1],zoom:14,pitch:65,bearing:30,duration:5000,essential:true});}catch(e){}},3000);
        break;
      case 'inund':
        lp('dawn');
        try{map.jumpTo({center:[cx,cy],zoom:11.5,pitch:48,bearing:5});}catch(e){}
        setColor('inund');
        try{SE._addFlood&&SE._addFlood.call(SE,map);}catch(e){}
        try{SE._addRoads&&SE._addRoads.call(SE,map);}catch(e){}
        // Zoom lent spre zona de risc
        setTimeout(function(){
          if(!SE._playing)return;
          try{map.flyTo({center:[cx,cy],zoom:12.5,pitch:55,bearing:10,duration:5000,essential:true});}catch(e){}
        },2000);
        break;
      case 'mc2055':
        lp('dusk');
        try{map.jumpTo({center:[cx,cy],zoom:11,pitch:50,bearing:-5});}catch(e){}
        setColor('mc2055');
        try{SE._addExpansionRings&&SE._addExpansionRings.call(SE,map);}catch(e){}
        break;
      case 'infra':
        lp('day');
        rot(20,0.015);
        try{SE._addInfraPoints&&SE._addInfraPoints.call(SE,map);}catch(e){}
        break;
      case 'viziune':
        lp('dusk');
        rot(30,0.010);
        setTimeout(function(){
          if(!SE._playing)return;
          try{map.flyTo({center:[cx,cy],zoom:15.5,pitch:72,bearing:120,duration:16000,essential:true});}catch(e){}
        },2000);
        break;
    }
  }


  // ── CANVAS OVERLAY per scena ─────────────────────────────────────────
  function cinDraw(id,t,ctx,W,H,pred,name,SE){
    if(!ctx||!pred)return;
    var sA=t<0.06?t/0.06:t>0.92?(1-t)/0.08:1;
    var eo=function(x){return 1-Math.pow(1-Math.max(0,Math.min(1,x)),3);};
    var rE=function(d,s){return eo(Math.min(1,Math.max(0,(t-(d||0))/((s||0.25)))));};
    var N=function(v){return isNaN(+v)?'—':Number(v).toLocaleString('ro-RO',{maximumFractionDigits:0});};
    var FS={t:Math.min(W*0.034,46),s:Math.min(W*0.016,20),d:Math.min(W*0.058,78),l:Math.min(W*0.011,14),n:Math.min(W*0.014,18)};

    // Vigneta sus
    var gT=ctx.createLinearGradient(0,0,0,H*0.22);
    gT.addColorStop(0,'rgba(2,5,14,0.90)');gT.addColorStop(1,'rgba(2,5,14,0)');
    ctx.fillStyle=gT;ctx.fillRect(0,0,W,H*0.22);
    // Vigneta jos
    var gB=ctx.createLinearGradient(0,H*0.78,0,H);
    gB.addColorStop(0,'rgba(2,5,14,0)');gB.addColorStop(1,'rgba(2,5,14,0.88)');
    ctx.fillStyle=gB;ctx.fillRect(0,H*0.78,W,H*0.22);

    function titlu(txt,sub){
      ctx.globalAlpha=sA*rE(0.05,0.20);
      ctx.fillStyle='rgba(212,175,55,0.95)';
      ctx.font='700 '+FS.t+'px "IBM Plex Mono",monospace';
      ctx.textAlign='left';ctx.letterSpacing='0.06em';
      ctx.fillText(txt.slice(0,38),W*0.04,H*0.09);
      if(sub){
        ctx.globalAlpha=sA*rE(0.08,0.20)*0.65;
        ctx.fillStyle='rgba(148,163,184,0.80)';
        ctx.font=FS.s+'px "IBM Plex Mono",monospace';
        ctx.fillText(sub.slice(0,52),W*0.04,H*0.09+FS.s*1.8);
      }
      ctx.globalAlpha=1;
    }
    function linie(){
      ctx.globalAlpha=sA*rE(0.07,0.28);
      var g=ctx.createLinearGradient(W*0.04,0,W*0.04+W*0.38,0);
      g.addColorStop(0,'rgba(212,175,55,0.9)');g.addColorStop(1,'rgba(212,175,55,0)');
      ctx.fillStyle=g;ctx.fillRect(W*0.04,H*0.108,W*0.38*rE(0.07,0.32),1.5);
      ctx.globalAlpha=1;
    }
    function cifra(val,lbl,clr){
      ctx.globalAlpha=sA*rE(0.15,0.25);
      ctx.fillStyle=clr||'#ffffff';
      ctx.font='900 '+FS.d+'px "Space Grotesk",sans-serif';
      ctx.textAlign='left';
      ctx.fillText(String(val).slice(0,11),W*0.04,H*0.885);
      ctx.globalAlpha=sA*rE(0.18,0.20)*0.65;
      ctx.fillStyle='rgba(148,163,184,0.72)';
      ctx.font='600 '+FS.l+'px "IBM Plex Mono",monospace';
      ctx.letterSpacing='0.08em';
      ctx.fillText(String(lbl).toUpperCase().slice(0,32),W*0.04,H*0.910);
      ctx.globalAlpha=1;
    }
    function cifra2(val,lbl,clr){
      ctx.globalAlpha=sA*rE(0.22,0.22);
      ctx.fillStyle=clr||'rgba(212,175,55,0.95)';
      ctx.font='900 '+Math.min(W*0.034,46)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='right';
      ctx.fillText(String(val).slice(0,13),W*0.96,H*0.885);
      ctx.globalAlpha=sA*rE(0.25,0.20)*0.60;
      ctx.fillStyle='rgba(148,163,184,0.65)';
      ctx.font='600 '+FS.l+'px "IBM Plex Mono",monospace';
      ctx.textAlign='right';
      ctx.fillText(String(lbl).toUpperCase().slice(0,26),W*0.96,H*0.908);
      ctx.globalAlpha=1;
    }
    function narativ(txt){
      if(t<0.55)return;
      ctx.globalAlpha=Math.min(1,(t-0.55)/0.18)*sA;
      ctx.fillStyle='rgba(220,228,255,0.82)';
      ctx.font='500 '+FS.n+'px "Space Grotesk",sans-serif';
      ctx.textAlign='left';
      var mW=W*0.54,words=txt.split(' '),line='',y=H*0.934,n=0;
      words.forEach(function(w){
        var test=line+(line?' ':'')+w;
        if(ctx.measureText(test).width>mW&&line&&n<2){ctx.fillText(line,W*0.04,y);y+=FS.n*1.4;line=w;n++;}
        else line=test;
      });
      if(n<2)ctx.fillText(line,W*0.04,y);
      ctx.globalAlpha=1;
    }
    // Progress
    ctx.globalAlpha=0.45;
    ctx.fillStyle='rgba(255,255,255,0.08)';ctx.fillRect(W*0.35,H-11,W*0.30,2);
    var gp=ctx.createLinearGradient(W*0.35,0,W*0.65,0);
    gp.addColorStop(0,'#D4AF37');gp.addColorStop(1,'rgba(212,175,55,0.15)');
    ctx.fillStyle=gp;ctx.fillRect(W*0.35,H-11,W*0.30*((SE._si+t)/SE.SCENES.length),2);
    ctx.fillStyle='rgba(148,163,184,0.35)';
    ctx.font='500 '+Math.min(W*0.009,11)+'px "IBM Plex Mono",monospace';
    ctx.textAlign='center';
    ctx.fillText((SE._si+1)+'/'+SE.SCENES.length+' — '+(SE.SCENES[SE._si]?.label||''),W/2,H-1);
    ctx.globalAlpha=1;

    switch(id){
    case 'intro':
      ctx.globalAlpha=sA*rE(0.20,0.40);
      ctx.fillStyle='rgba(255,255,255,0.94)';
      ctx.font='900 '+Math.min(W*0.085,108)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='center';
      ctx.fillText(name.toUpperCase(),W/2,H*0.48);
      ctx.globalAlpha=sA*rE(0.30,0.25)*0.78;
      ctx.fillStyle='#D4AF37';
      ctx.font='600 '+Math.min(W*0.016,21)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='center';
      ctx.fillText((SE._city?.judet||'—').toUpperCase()+' · '+N(pred.p21)+' LOCUITORI · '+(SE._city?.regiune||''),W/2,H*0.552);
      cifra(N(pred.p21),'Locuitori 2021');
      cifra2(N(Math.round((SE._city?.suprafata_ha||9800)/100))+' km²','Suprafata');
      break;
    case 'oras3d':
      titlu('Orasul Azi — 3D','Cladiri reale · Tipuri · Densitate');linie();
      cifra(N(pred.p21),'Locuitori 2021');
      cifra2(N(pred.pib||14200)+' €/loc','PIB per locuitor');
      narativ('Albastru=blocuri · Portocaliu=comercial · Verde=scoli · Violet=birouri · Rosu=spitale · Maro=biserici');
      break;
    case 'demo':
      titlu('Populatia','Densitate · Tendinta · 2055');linie();
      cifra((pred.r10>=0?'+':'')+pred.r10.toFixed(2)+'%/an',pred.trendLbl||'tendinta',pred.trendClr||'#f59e0b');
      cifra2(N(pred.pop55),'Estimat 2055');
      narativ(N(pred.p21)+' loc. in 2021. Tendinta: '+(pred.trendLbl||'stabila')+'. Proiectie 2055: '+N(pred.pop55)+' loc. ('+((pred.pop55>pred.p21?'+':'')+N(pred.pop55-pred.p21))+')');
      break;
    case 'eco':
      titlu('Economia','PIB · Convergenta UE · Sectoare');linie();
      cifra(N(pred.pib||14200)+' €','PIB per locuitor',(pred.pctUE||39)>=75?'#22c55e':'#f59e0b');
      cifra2((pred.pctUE||39)+'% UE27','Convergenta');
      narativ(name+' = '+(pred.pctUE||39)+'% din media UE27. Convergenta estimata ~'+(pred.anConv||2047)+'. Servicii '+(pred.ocupatie?.servicii||48)+'%, industrie '+(pred.ocupatie?.industrie||23)+'%.');
      break;
    case 'crestere':
      var tG=t<0.15?0:Math.min(1,(t-0.15)/0.70);
      var tE=1-Math.pow(1-tG,3);
      if(t<0.18){
        titlu('Iasi 2026 — Starea Actuala','Constructii existente');linie();
        cifra(N(pred.p21),'Locuitori actuali','#94a3b8');
        cifra2(N(pred.auth||430),'Autorizatii 2023','#60a5fa');
      } else {
        titlu('Unde Creste Orasul 2055','Presiune constructibila');linie();
        ctx.globalAlpha=sA*tE;
        ctx.fillStyle='#ef4444';
        ctx.font='900 '+FS.d+'px "Space Grotesk",sans-serif';
        ctx.textAlign='left';
        ctx.fillText(N(Math.round((pred.defLoc||5000)*tE)),W*0.04,H*0.885);
        ctx.globalAlpha=sA*0.65;
        ctx.fillStyle='rgba(148,163,184,0.72)';
        ctx.font='600 '+FS.l+'px "IBM Plex Mono",monospace';
        ctx.fillText('UNITATI LOCATIVE NECESARE 2055',W*0.04,H*0.910);
        cifra2(N(pred.recHa||390)+' ha','Potential reconversie','#f59e0b');
        if(tE>0.5)narativ('Verde=joase/potential densificare. Galben=medii. Rosu=inalte/presiune maxima CC/CP. '+(pred.defLoc||5000)+' unitati necesare.');
        ctx.globalAlpha=1;
      }
      break;
    case 'mobil':
      titlu('Mobilitate Urbana','Retea OSM reala · Congestie · Solutii');linie();
      cifra(N(pred.mot24||400),'Vehicule/1000 loc',(pred.mot24||400)>500?'#ef4444':'#f59e0b');
      cifra2('~'+(pred.satAn||2038),'An saturare retea');
      // Legenda artere
      ctx.globalAlpha=sA*rE(0.25,0.20);
      [['#dc2626','AUTOSTRADA'],['#ea580c','TRUNK'],['#f59e0b','PRIMAR'],['#16a34a','SECUNDAR'],['#0ea5e9','TERTIAR']].forEach(function(it,i){
        ctx.fillStyle=it[0];ctx.fillRect(W*(0.04+i*0.165),H*0.928,W*0.020,7);
        ctx.fillStyle='rgba(220,230,255,0.75)';
        ctx.font='500 '+Math.min(W*0.010,13)+'px "IBM Plex Mono",monospace';
        ctx.textAlign='left';
        ctx.fillText(it[1],W*(0.065+i*0.165),H*0.937);
      });
      ctx.globalAlpha=1;
      narativ(N(pred.fluxOra||28800)+' veh/h la varf. Saturatie ~'+(pred.satAn||2038)+'. '+(pred.pasaje||8)+' pasaje necesare. Cost: '+N(pred.invMob||162)+' M EUR.');
      break;
    case 'tp':
      titlu('Transport Public','Acoperire · BRT · SUMP');linie();
      cifra((pred.tp||72)+'%','Populatie acoperita',(pred.tp||72)>=70?'#22c55e':(pred.tp||72)>=50?'#f59e0b':'#ef4444');
      cifra2((pred.kmBRT||47)+' km BRT','Cost: '+N(pred.costBRT||165)+' M €');
      narativ('Deficit '+(pred.defTP||3)+'pp vs standard 75%. Walk Score: '+(pred.walkScore||72)+'/100. Statii noi: '+N(pred.statiiNoi||180)+'. SUMP: '+(pred.anSUMP||2026)+'.');
      break;
    case 'seismic':
      titlu('Risc Seismic','P100 · Fond vulnerabil · PNRR');linie();
      var agC=(pred.ag||0.25)>=0.30?'#ef4444':(pred.ag||0.25)>=0.20?'#f59e0b':'#22c55e';
      cifra('ag='+(pred.ag||0.25).toFixed(2)+'g','Acceleratie seismica P100',agC);
      cifra2(N(pred.fond||2885)+' cladiri','Fond risc RS I-III','#ef4444');
      // Legenda seismic
      ctx.globalAlpha=sA*rE(0.25,0.20);
      [['#166534','SIGUR (<8m)'],['#854d0e','ATENTIE (8-15m)'],['#dc2626','RISC (>25m)']].forEach(function(it,i){
        ctx.fillStyle=it[0];ctx.fillRect(W*(0.04+i*0.22),H*0.928,W*0.020,7);
        ctx.fillStyle='rgba(220,230,255,0.75)';
        ctx.font='500 '+Math.min(W*0.010,13)+'px "IBM Plex Mono",monospace';
        ctx.textAlign='left';
        ctx.fillText(it[1],W*(0.065+i*0.22),H*0.937);
      });
      ctx.globalAlpha=1;
      narativ(N(pred.fond||2885)+' cladiri la risc. PNRR: '+N(Math.round((pred.fond||2885)*0.25))+' apartamente reabilitabile. Cost: '+N(Math.round((pred.fond||2885)*0.085))+' M EUR.');
      break;
    case 'inund':
      titlu('Inundatii & Clima','Zone risc · Lunca · 2055');linie();
      cifra((pred.zile24||22)+' zile','Caniculare >35°C azi','#f59e0b');
      cifra2(Math.round((pred.zile24||22)*2.2)+' zile','Proiectie 2055','#ef4444');
      narativ('Zona albastra = lunca inundabila activa. Autostrada si centura marcate. In 2055: '+Math.round((pred.zile24||22)*2.2)+' zile caniculare (+'+Math.round((pred.zile24||22)*1.2)+').');
      break;
    case 'mc2055':
      var rB=pred.rRef||0.1;
      var pO=Math.round((pred.p21||360633)*Math.pow(1+(rB+0.9)/100,34));
      var pR=Math.round((pred.p21||360633)*Math.pow(1+(rB-0.8)/100,34));
      titlu('Monte Carlo 2055','3 Scenarii · Probabilitati');linie();
      [['S1 REGRES: '+N(pR)+' loc.','#ef4444',0.18],
       ['S2 TENDINTA: '+N(pred.pop55||373000)+' loc.','#f59e0b',0.28],
       ['S3 OPTIMIST: '+N(pO)+' loc.','#22c55e',0.38]].forEach(function(s,i){
        ctx.globalAlpha=sA*rE(s[2],0.20);
        ctx.fillStyle=s[1];
        ctx.font='700 '+Math.min(W*0.015,19)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='left';
        ctx.fillText(s[0],W*0.04,H*(0.80+i*0.036));
      });
      ctx.globalAlpha=1;
      cifra('['+N(pR)+'–'+N(pO)+']','Interval 90%','#f59e0b');
      narativ('Diferenta intre scenarii: '+N(pO-pR)+' persoane. Decizia de azi determina scenariul. S3 necesita investitii de '+N(pred.invTotal||311)+' M EUR.');
      break;
    case 'infra':
      titlu('Ce Construim 2025–2055','Scoli · Cabinete · SV · Retele');linie();
      cifra(N(pred.invTotal||311)+' M €','Total investitii','#D4AF37');
      cifra2('~60% UE','Finantare','#22c55e');
      [['🏫 SCOLI: +'+(pred.scoliNoi||2),0.16],['🏥 CABINETE: +'+(pred.cabMed||7),0.24],
       ['🌳 SPATII VERZI: +'+(pred.svHa||280)+' ha',0.32],['🚌 STATII TP: +'+(pred.statiiNoi||180),0.40]].forEach(function(it,i){
        ctx.globalAlpha=sA*rE(it[1],0.16);
        ctx.fillStyle='rgba(220,230,255,0.82)';
        ctx.font='600 '+Math.min(W*0.013,16)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='left';
        ctx.fillText(it[0],W*0.04,H*(0.78+i*0.034));
      });
      ctx.globalAlpha=1;
      narativ('Mobilitate: '+N(pred.invMob||162)+' M EUR. Social: '+N(pred.invSoc||100)+' M EUR. Finantare UE ~60% prin REGIO+PNRR.');
      break;
    case 'viziune':
      ctx.globalAlpha=sA*rE(0.05,0.5)*0.055;
      ctx.fillStyle='#D4AF37';
      ctx.font='900 '+Math.min(W*0.26,320)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='center';
      ctx.fillText('2055',W/2,H*0.62);
      titlu(name+' 2055','Viziunea posibila');linie();
      ctx.globalAlpha=sA*rE(0.14,0.28);
      ctx.fillStyle='rgba(255,255,255,0.93)';
      ctx.font='900 '+Math.min(W*0.050,65)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='center';
      ctx.fillText(name.toUpperCase(),W/2,H*0.27);
      [{ok:(pred.pop55||373000)>(pred.p21||360633),txt:'Pop 2055: '+N(pred.pop55||373000)+' loc.'},
       {ok:(pred.pctUE55||62)>=75,txt:'PIB 2055: '+(pred.pctUE55||62)+'% UE27'},
       {ok:(pred.anSUMP||2026)<=2035,txt:'SUMP: ~'+(pred.anSUMP||2026)},
       {ok:(pred.sdgTotal||6.8)>=6,txt:'SDG11: '+(pred.sdgTotal||6.8)+'/10'},
       {ok:true,txt:'Investitii: '+N(pred.invTotal||311)+' M EUR'}
      ].forEach(function(ch,i){
        ctx.globalAlpha=sA*rE(0.26+i*0.06,0.16);
        ctx.fillStyle=ch.ok?'#22c55e':'#f59e0b';
        ctx.font='700 '+Math.min(W*0.015,19)+'px sans-serif';
        ctx.textAlign='right';
        ctx.fillText(ch.ok?'✓':'◎',W*0.96,H*(0.72+i*0.036));
        ctx.fillStyle='rgba(220,228,255,0.85)';
        ctx.font=Math.min(W*0.013,16)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='right';
        ctx.fillText(ch.txt.slice(0,42),W*0.950,H*(0.72+i*0.036));
      });
      ctx.globalAlpha=1;
      break;
    }
  }

  // ── RENDER LOOP ──────────────────────────────────────────────────────
  function runScene(idx){
    if(!SE._playing||idx>=SE.SCENES.length){
      var c2=document.getElementById('tci-c8');
      if(c2){c2.style.transition='opacity 1.5s';c2.style.opacity='0';setTimeout(stopAll,1600);}
      return;
    }
    var scene=SE.SCENES[idx];
    SE._si=idx;SE._startT=performance.now();

    // Curata DOAR layerele noastre - nu cleanLayers care strica stilul
    try{if(map.getLayer('cin-osm'))map.removeLayer('cin-osm');}catch(e){}
    try{if(map.getSource('cin-osm'))map.removeSource('cin-osm');}catch(e){}
    // Restaureaza inaltimea normala a cladirilor
    try{map.setPaintProperty('building-extrusion','fill-extrusion-height',['get','height']);}catch(e){}

    setupScene(scene.id);

    var loop=function(){
      if(!SE._playing)return;
      var t=Math.min(1,Math.max(0.001,(performance.now()-SE._startT)/scene.dur));
      SE._ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
      // Anima inaltimea cladirilor pentru scena crestere
      if(scene.id==='crestere'){
        var tG=t<0.15?0:Math.min(1,(t-0.15)/0.70);
        var tE=1-Math.pow(1-tG,3);
        try{map.setPaintProperty('building-extrusion','fill-extrusion-height',
          ['*',['get','height'],Math.max(0.05,tE)]);}catch(e){}
      }
      // Overlay canvas cu date per scena
      try{cinDraw(scene.id,t,SE._ctx,window.innerWidth,window.innerHeight,pred,name,SE);}catch(e){console.error('[cinDraw ERROR]',scene.id,e.message,e.stack?.split('\n')[1]);}
      if(t<1){SE._raf=requestAnimationFrame(loop);}
      else{runScene(idx+1);}
    };
    SE._raf=requestAnimationFrame(loop);
    console.log('[Cinema v5]',idx,scene.id);
  }

  runScene(0);
  console.log('[Cinema v5.0] START —',name);
};

// Patch openTCI dupa load
function _patchOpenTCI(n){
  if(typeof window.openTCI==='function'){
    window.openTCI=function(opts){
      window._startCinema(opts?.cityKey||window.TCI?.cityKey||localStorage.getItem('ux_last_city')||'RO-IS-01');
    };
    console.log('[Cinema v5] openTCI patched');
  }else if(n<30)setTimeout(function(){_patchOpenTCI(n+1);},300);
}
if(document.readyState==='complete'){_patchOpenTCI(0);}
else{window.addEventListener('load',function(){_patchOpenTCI(0);});}

window._launchCinemaV2=function(){window._startCinema();};
console.log('[Cinema Launcher v5.0] ✅ building-extrusion coloring · jumpTo 15.5/72');
})();
