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

// Culori per scena pentru building-extrusion
var SCENE_COLORS = {
  'intro':   ['interpolate',['linear'],['get','height'],0,'#1e293b',10,'#334155',30,'#475569',60,'#64748b'],
  'oras3d':  ['interpolate',['linear'],['get','height'],0,'#1e3a5f',5,'#1d4ed8',15,'#2563eb',30,'#3b82f6',60,'#60a5fa'],
  'demo':    ['interpolate',['linear'],['get','height'],0,'#14532d',5,'#166534',15,'#15803d',30,'#16a34a'],
  'eco':     ['interpolate',['linear'],['get','height'],0,'#713f12',5,'#92400e',15,'#b45309',30,'#d97706',60,'#f59e0b'],
  'crestere':['interpolate',['linear'],['get','height'],0,'#052e16',5,'#14532d',10,'#166534',20,'#15803d',35,'#f59e0b',50,'#ef4444',80,'#dc2626'],
  'mobil':   ['interpolate',['linear'],['get','height'],0,'#1e1b4b',5,'#312e81',15,'#3730a3',30,'#4338ca',60,'#6366f1'],
  'tp':      ['interpolate',['linear'],['get','height'],0,'#0c4a6e',5,'#075985',15,'#0369a1',30,'#0284c7',60,'#38bdf8'],
  'seismic': ['interpolate',['linear'],['get','height'],0,'#450a0a',5,'#7f1d1d',10,'#991b1b',20,'#b91c1c',35,'#dc2626',50,'#ef4444'],
  'inund':   ['interpolate',['linear'],['get','height'],0,'#172554',5,'#1e3a8a',15,'#1d4ed8',30,'#2563eb'],
  'mc2055':  ['interpolate',['linear'],['get','height'],0,'#2e1065',5,'#4a044e',15,'#701a75',30,'#86198f',60,'#a21caf'],
  'infra':   ['interpolate',['linear'],['get','height'],0,'#0f2417',5,'#14532d',15,'#166534',30,'#15803d',60,'#22c55e'],
  'viziune': ['interpolate',['linear'],['get','height'],0,'#1c1917',5,'#44403c',15,'#78716c',30,'#d97706',60,'#f59e0b',80,'#fbbf24'],
};

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
    if((o.pitch||0)<60||(o.zoom||20)<14)return map;
    return _oFly(o);
  };
  map.jumpTo=function(o){
    if(!SE._playing){map.flyTo=_oFly;map.jumpTo=_oJump;return _oJump(o);}
    if((o.pitch||0)<60||(o.zoom||20)<14)return _oJump(Object.assign({},o,{pitch:72,zoom:15.5}));
    return _oJump(o);
  };

  // Butoane
  document.getElementById('tci-c8-ctrl')?.remove();
  var ctrl=document.createElement('div');
  ctrl.id='tci-c8-ctrl';
  ctrl.style.cssText='position:fixed;bottom:24px;right:20px;z-index:1000000;display:flex;gap:8px;';
  ctrl.innerHTML='<button id="c8p" style="background:rgba(0,0,0,.8);border:1px solid rgba(255,255,255,.15);color:#fff;padding:10px 18px;border-radius:10px;cursor:pointer;font:700 13px monospace">◀</button>'
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
  function setColor(sceneId){
    var col=SCENE_COLORS[sceneId]||SCENE_COLORS['oras3d'];
    try{map.setPaintProperty('building-extrusion','fill-extrusion-color',col);}catch(e){}
    // Asigura ca cladirile sunt vizibile
    try{map.setPaintProperty('building-extrusion','fill-extrusion-opacity',0.95);}catch(e){}
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

    switch(id){
      case 'intro':
        lp('night');
        try{map.jumpTo({center:[cx,cy],zoom:7,pitch:0,bearing:0});}catch(e){}
        setTimeout(function(){if(!SE._playing)return;try{map.flyTo({center:[cx,cy],zoom:12,pitch:55,bearing:15,duration:5000,essential:true});}catch(e){}},300);
        setTimeout(function(){if(!SE._playing)return;try{map.flyTo({center:[cx,cy],zoom:15.5,pitch:72,bearing:30,duration:5000,essential:true});}catch(e){}rot(30,0.018);},6000);
        break;
      case 'oras3d':
        lp('day');
        try{map.jumpTo({center:[cx,cy],zoom:15.5,pitch:72,bearing:0});}catch(e){}
        rot(0,0.020);
        setTimeout(function(){if(!SE._playing)return;try{map.flyTo({center:offsets[1],zoom:15.5,pitch:72,bearing:60,duration:6000,essential:true});}catch(e){}},4000);
        setTimeout(function(){if(!SE._playing)return;try{map.flyTo({center:offsets[2],zoom:15.5,pitch:72,bearing:120,duration:5000,essential:true});}catch(e){}},11000);
        break;
      case 'demo':
        lp('dawn');
        try{map.jumpTo({center:[cx,cy],zoom:12,pitch:50,bearing:0});}catch(e){}
        setTimeout(function(){if(!SE._playing)return;try{map.flyTo({center:[cx,cy],zoom:13.5,pitch:58,bearing:-15,duration:4000,essential:true});}catch(e){}},500);
        setTimeout(function(){if(!SE._playing)return;try{map.flyTo({center:offsets[3],zoom:14,pitch:62,bearing:20,duration:5000,essential:true});}catch(e){}},6000);
        break;
      case 'eco':
        lp('day');
        try{map.jumpTo({center:[cx,cy],zoom:14,pitch:65,bearing:20});}catch(e){}
        rot(20,0.015);
        setTimeout(function(){if(!SE._playing)return;try{map.flyTo({center:offsets[4],zoom:15,pitch:68,bearing:80,duration:6000,essential:true});}catch(e){}},4000);
        break;
      case 'crestere':
        lp('night');
        try{map.jumpTo({center:[cx,cy],zoom:15.5,pitch:72,bearing:10});}catch(e){}
        rot(10,0.012);
        // Cladirile pornesc mici
        try{map.setPaintProperty('building-extrusion','fill-extrusion-height',1);}catch(e){}
        try{map.setPaintProperty('building-extrusion','fill-extrusion-base',0);}catch(e){}
        // Zbor lent pe cartiere in timp ce cresc
        setTimeout(function(){if(!SE._playing)return;try{map.flyTo({center:offsets[1],zoom:15.5,pitch:72,bearing:50,duration:8000,essential:true});}catch(e){}},5000);
        setTimeout(function(){if(!SE._playing)return;try{map.flyTo({center:offsets[2],zoom:15.5,pitch:72,bearing:100,duration:7000,essential:true});}catch(e){}},14000);
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


  // ── RENDER LOOP ──────────────────────────────────────────────────────
  function runScene(idx){
    if(!SE._playing||idx>=SE.SCENES.length){
      var c2=document.getElementById('tci-c8');
      if(c2){c2.style.transition='opacity 1.5s';c2.style.opacity='0';setTimeout(stopAll,1600);}
      return;
    }
    var scene=SE.SCENES[idx];
    SE._si=idx;SE._startT=performance.now();

    try{SE._cleanLayers.call(SE);}catch(e){}
    try{if(map.getLayer('cin-osm'))map.removeLayer('cin-osm');}catch(e){}
    try{if(map.getSource('cin-osm'))map.removeSource('cin-osm');}catch(e){}

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
      try{SE._draw.call(SE,scene.id,t);}catch(e){console.warn('[Cinema]',scene.id,e.message);}
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
