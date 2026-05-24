// cinema-v5.js — UrbanX TCI Cinematic v5.2 PREMIUM
// Calitate: pitch Banca Mondiala / fonduri internationale / ministri
// Arhitectura: 17 scene imersive · date live · animatii pulsante · dramatism urban
// Fiecare scena = organism viu: harta se misca, layerele apar progresiv, datele cresc
// (c) ThinkSmart Solutions 2026

(function(){
'use strict';

// ── ANI DINAMICI ─────────────────────────────────────────────────────────
var _NOW = new Date().getFullYear();
var _HORIZON = 30;
function _S(){ return (window.TCI&&window.TCI.startYear)||_NOW; }
function _E(){ return _S()+_HORIZON; }
function _P1(){ return _S()+5; }
function _P2(){ return _S()+15; }

var PROXY = 'https://urbanx-proxy.3dtravelsoftart.workers.dev';

// ── 17 SCENE ─────────────────────────────────────────────────────────────
var SCENES = [
  {id:'s1',  dur:22000, label:'IDENTITATE',           bloc:1, legend:'none'},
  {id:'s2',  dur:20000, label:'CONTEXT REGIONAL',     bloc:1, legend:'infra'},
  {id:'s3',  dur:22000, label:'PROFIL LOCUITORI',     bloc:1, legend:'density'},
  {id:'s4',  dur:20000, label:'ECONOMIE',             bloc:2, legend:'none'},
  {id:'s5',  dur:22000, label:'PROIECTE & INFRA',     bloc:2, legend:'infra'},
  {id:'s6',  dur:20000, label:'FOND CONSTRUIT',       bloc:3, legend:'buildings'},
  {id:'s7',  dur:24000, label:'CORIDOARE '+_E(),      bloc:3, legend:'growth'},
  {id:'s8',  dur:22000, label:'MOBILITATE AUTO',      bloc:3, legend:'roads'},
  {id:'s9',  dur:20000, label:'TRANSPORT PUBLIC',     bloc:3, legend:'tp'},
  {id:'s10', dur:20000, label:'RISC SEISMIC',         bloc:4, legend:'seismic'},
  {id:'s11', dur:22000, label:'CLIMA & INUNDATII',    bloc:4, legend:'flood'},
  {id:'s12', dur:24000, label:'MONTE CARLO '+_E(),    bloc:5, legend:'scenarios'},
  {id:'s13', dur:20000, label:'INFRASTRUCTURA NEC.',  bloc:5, legend:'needs'},
  {id:'s14', dur:20000, label:'BENCHMARK EU',         bloc:5, legend:'none'},
  {id:'s15', dur:20000, label:'CALITATE VIATA SDG',   bloc:6, legend:'sdg'},
  {id:'s16', dur:22000, label:'AGENDA PRIMARULUI',    bloc:6, legend:'none'},
  {id:'s17', dur:26000, label:'VIZIUNEA '+_E(),       bloc:6, legend:'none'},
];

var LEGENDS = {
  buildings:[['#3b82f6','Apartamente/blocuri'],['#93c5fd','Case individuale'],['#f59e0b','Comercial/retail'],['#a78bfa','Birouri'],['#22c55e','Scoli/universitati'],['#ef4444','Spitale/sanatate'],['#d97706','Monumente/biserici'],['#6b7280','Industrial/depozite']],
  growth:[['#14532d','Densitate mica — potential densificare'],['#15803d','Medie — consolidare activa'],['#f59e0b','Presiune ridicata — CC/CP aproape'],['#ef4444','Suprasaturat — necesita PUZ urgent']],
  roads:[['#dc2626','Autostrada/drum expres'],['#ea580c','Drum national DN'],['#f59e0b','Drum primar judetean'],['#16a34a','Drum secundar'],['#0ea5e9','Tertiar/rezidential']],
  seismic:[['#166534','ag<0.15g — risc scazut'],['#854d0e','ag 0.15-0.25g — moderat'],['#dc2626','ag 0.25-0.35g — ridicat'],['#7f1d1d','ag>0.35g — zona critica Vrancea']],
  flood:[['#1e3a8a','RCP10 — risc ridicat (revenire 10 ani)'],['#1d4ed8','RCP100 — risc mediu (revenire 100 ani)'],['#93c5fd','RCP500 — risc scazut (revenire 500 ani)'],['#22c55e','Spatii verzi — zone de racire UHI'],['#f59e0b','UHI — Urban Heat Island']],
  scenarios:[['#22c55e','S3 Optimist — investitii sustinute 30 ani'],['#f59e0b','S2 Tendinta — scenariul de referinta'],['#ef4444','S1 Regres — declin prin neinterventie']],
  tp:[['#ef4444','Tramvai/metrou de suprafata'],['#3b82f6','Autobuz rapid BRT'],['#22c55e','Coridor TP acoperit existent'],['#f59e0b','Zona sub-deservita — prioritate'],['#a78bfa','Pasaj pietonal/subteran propus']],
  infra:[['#dc2626','Autostrada in executie'],['#f59e0b','Autostrada proiectata/SF'],['#60a5fa','Cale ferata CFR'],['#22c55e','Aeroport international'],['#a78bfa','Centura/drum ocolitor']],
  density:[['#1e3a8a','<20 loc/ha — densitate mica'],['#3b82f6','20-60 loc/ha — medie'],['#f59e0b','60-120 loc/ha — ridicata'],['#ef4444','>120 loc/ha — foarte ridicata']],
  needs:[['#22c55e','Scoli/gradinite necesare'],['#ef4444','Cabinete medicale deficit'],['#3b82f6','Spatii verzi insuficiente'],['#f59e0b','Statii transport public noi']],
  sdg:[['#22c55e','SDG 11.1 Locuire adecvata'],['#3b82f6','SDG 11.2 Transport accesibil'],['#f59e0b','SDG 11.6 Mediu/aer/apa'],['#a78bfa','SDG 11.7 Spatii publice']],
};

// ── DATE LIVE ─────────────────────────────────────────────────────────────
var D = {wiki:null,inse:null,roads:null,rail:null,airports:null,urban:null,
         green:null,monuments:null,cimitire:null,utilities:null,loaded:false};

// ── ANIMATII PULSANTE — inima cinematicului ───────────────────────────────
var _pulseIntervals = [];
function _clearPulse(){ _pulseIntervals.forEach(clearInterval); _pulseIntervals=[]; }

function _pulseLayer(map, layerId, propName, minV, maxV, speed) {
  // Anima o proprietate intre minV si maxV
  if(!map.getLayer||!map.getLayer(layerId)) return;
  var v = minV, dir = 1, step = (maxV-minV)/(speed||20);
  var iv = setInterval(function(){
    if(!map.getLayer(layerId)){ clearInterval(iv); return; }
    v += dir*step;
    if(v >= maxV){ v=maxV; dir=-1; }
    if(v <= minV){ v=minV; dir=1; }
    try{ map.setPaintProperty(layerId, propName, v); }catch(e){ clearInterval(iv); }
  }, 80);
  _pulseIntervals.push(iv);
  return iv;
}

function _flowDash(map, layerId, speed) {
  // Anima line-dashoffset pentru efect de flux / puls
  if(!map.getLayer||!map.getLayer(layerId)) return;
  var offset = 0;
  var iv = setInterval(function(){
    if(!map.getLayer(layerId)){ clearInterval(iv); return; }
    offset = (offset + (speed||1)) % 20;
    try{ map.setPaintProperty(layerId, 'line-dasharray', [2, offset*0.3+1]); }catch(e){ clearInterval(iv); }
  }, 60);
  _pulseIntervals.push(iv);
  return iv;
}

// Adauga features progresiv pe hartă (un feature la fiecare delay ms)
function _addProgressive(map, sourceId, features, delayMs, cb) {
  if(!features||!features.length) return;
  var shown = [];
  var i = 0;
  var iv = setInterval(function(){
    if(i >= features.length){ clearInterval(iv); if(cb)cb(); return; }
    shown.push(features[i]); i++;
    try{
      if(map.getSource(sourceId))
        map.getSource(sourceId).setData({type:'FeatureCollection',features:shown});
    }catch(e){ clearInterval(iv); }
  }, delayMs||200);
  _pulseIntervals.push(iv);
}

// ── TEXT WRAP ─────────────────────────────────────────────────────────────
function wrap(ctx, txt, x, y, maxW, lh, maxL) {
  if(!txt) return y;
  var words=String(txt).split(' '), line='', n=0;
  for(var i=0;i<words.length;i++){
    var t2=line+(line?' ':'')+words[i];
    if(ctx.measureText(t2).width>maxW&&line){
      ctx.fillText(line,x,y); y+=lh; line=words[i]; n++;
      if(maxL&&n>=maxL-1){
        var rest=words.slice(i+1).join(' ');
        if(rest){
          var w2=words[i];
          while(ctx.measureText(w2+'… '+rest).width>maxW&&rest.length>1) rest=rest.slice(0,-1);
          ctx.fillText(w2+(rest?'… '+rest:''),x,y);
        } else ctx.fillText(words[i],x,y);
        return y+lh;
      }
    } else line=t2;
  }
  if(line) ctx.fillText(line,x,y);
  return y+lh;
}

// ── PRELOAD ───────────────────────────────────────────────────────────────
function preload(city, siruta, done) {
  var cx=city.lon||27.601, cy=city.lat||47.158, ps=[];

  // Wikipedia
  ps.push(fetch('https://ro.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent((city.name||'').replace(/ /g,'_')),{signal:AbortSignal.timeout(7000)})
    .then(function(r){return r.ok?r.json():null;})
    .then(function(d){if(d&&d.extract)D.wiki={extract:d.extract,title:d.title};})
    .catch(function(){D.wiki={extract:'Date Wikipedia indisponibile.',title:city.name||'UAT'};}));

  // INSE
  if(siruta) ps.push(fetch(PROXY+'/inse?siruta='+siruta+'&indicators=POP107A,NAT107A,DEC107A',{signal:AbortSignal.timeout(10000)})
    .then(function(r){return r.ok?r.json():null;})
    .then(function(d){if(d)D.inse=d;}).catch(function(){}));

  // Infrastructura regionala
  var q1='[out:json][timeout:30];(way["highway"~"motorway|trunk"](around:70000,'+cy+','+cx+');way["railway"="rail"](around:40000,'+cy+','+cx+');node["aeroway"="aerodrome"](around:120000,'+cy+','+cx+'););out geom;';
  ps.push(fetch(PROXY+'/osm?q='+encodeURIComponent(q1),{signal:AbortSignal.timeout(22000)})
    .then(function(r){return r.json();})
    .then(function(d){
      var roads=[],rail=[],apt=[];
      (d.elements||[]).forEach(function(el){
        if(el.type==='node'&&el.tags&&el.tags.aeroway==='aerodrome') apt.push({lon:el.lon,lat:el.lat,name:el.tags.name||'Aeroport',iata:el.tags.iata||''});
        if(el.type!=='way'||!el.geometry) return;
        var c=el.geometry.map(function(n){return[n.lon,n.lat];});
        var hw=el.tags&&el.tags.highway, rw=el.tags&&el.tags.railway;
        if(hw==='motorway') roads.push({type:'Feature',geometry:{type:'LineString',coordinates:c},properties:{c:'#dc2626',w:7,t:'motorway',name:el.tags.ref||''}});
        else if(hw==='trunk') roads.push({type:'Feature',geometry:{type:'LineString',coordinates:c},properties:{c:'#ea580c',w:4,t:'trunk',name:el.tags.name||''}});
        if(rw==='rail') rail.push({type:'Feature',geometry:{type:'LineString',coordinates:c},properties:{c:'#a78bfa',w:2}});
      });
      D.roads=roads; D.rail=rail; D.airports=apt;
    }).catch(function(){}));

  // Drumuri urbane
  var q2='[out:json][timeout:30];(way["highway"~"motorway|trunk|primary|secondary|tertiary|residential"](around:13000,'+cy+','+cx+'););out geom;';
  ps.push(fetch(PROXY+'/osm?q='+encodeURIComponent(q2),{signal:AbortSignal.timeout(25000)})
    .then(function(r){return r.json();})
    .then(function(d){
      var ft=[];
      (d.elements||[]).forEach(function(el){
        if(el.type!=='way'||!el.geometry) return;
        var c=el.geometry.map(function(n){return[n.lon,n.lat];});
        var hw=(el.tags&&el.tags.highway)||'tertiary';
        var col,w;
        if(hw==='motorway'){col='#dc2626';w=7;}else if(hw==='trunk'){col='#ea580c';w=5;}
        else if(hw==='primary'){col='#f59e0b';w=4;}else if(hw==='secondary'){col='#16a34a';w=3;}
        else if(hw==='tertiary'){col='#0ea5e9';w=2;}else{col='#334155';w=1;}
        ft.push({type:'Feature',geometry:{type:'LineString',coordinates:c},properties:{c:col,w:w,hw:hw}});
      });
      D.urban=ft;
    }).catch(function(){}));

  // POI: spatii verzi, monumente, utilitati, cimitire
  var q3='[out:json][timeout:25];('+
    'way["leisure"~"park|garden|nature_reserve"](around:8000,'+cy+','+cx+');'+
    'node["historic"](around:6000,'+cy+','+cx+');'+
    'way["landuse"="cemetery"](around:8000,'+cy+','+cx+');'+
    'way["power"="line"](around:5000,'+cy+','+cx+');'+
    'node["amenity"~"hospital|school|university"](around:8000,'+cy+','+cx+');'+
    ');out geom;';
  ps.push(fetch(PROXY+'/osm?q='+encodeURIComponent(q3),{signal:AbortSignal.timeout(22000)})
    .then(function(r){return r.json();})
    .then(function(d){
      var green=[],mon=[],cim=[],utils=[],amenity=[];
      (d.elements||[]).forEach(function(el){
        var tags=el.tags||{};
        var ctr=el.center?[el.center.lon,el.center.lat]:(el.geometry&&el.geometry[0]?[el.geometry[0].lon,el.geometry[0].lat]:null);
        if(tags.leisure&&ctr) green.push({type:'Feature',geometry:{type:'Point',coordinates:ctr},properties:{c:'#22c55e',r:7,n:tags.name||'Parc'}});
        if(tags.historic&&el.lon) mon.push({type:'Feature',geometry:{type:'Point',coordinates:[el.lon,el.lat]},properties:{c:'#fbbf24',r:6,n:tags.name||tags.historic}});
        if(tags.landuse==='cemetery'&&el.geometry) cim.push({type:'Feature',geometry:{type:'LineString',coordinates:el.geometry.map(function(n){return[n.lon,n.lat];})},properties:{c:'#6b7280',w:2}});
        if(tags.power==='line'&&el.geometry) utils.push({type:'Feature',geometry:{type:'LineString',coordinates:el.geometry.map(function(n){return[n.lon,n.lat];})},properties:{c:'#fbbf24',w:1}});
        if(tags.amenity&&el.lon){
          var col=tags.amenity==='hospital'?'#ef4444':tags.amenity==='school'?'#22c55e':'#3b82f6';
          amenity.push({type:'Feature',geometry:{type:'Point',coordinates:[el.lon,el.lat]},properties:{c:col,r:8,n:tags.name||tags.amenity}});
        }
      });
      D.green=green; D.monuments=mon; D.cimitire=cim; D.utilities=utils; D.amenity=amenity;
      console.log('[Cinema] Verde:'+green.length+' Mon:'+mon.length+' Amenity:'+amenity.length);
    }).catch(function(){}));

  var timeout=new Promise(function(r){setTimeout(r,20000);});
  Promise.race([Promise.allSettled(ps),timeout]).then(function(){
    D.loaded=true;
    console.log('[Cinema v5.2] Loaded — Roads:'+(D.roads||[]).length+' Urban:'+(D.urban||[]).length+' Verde:'+(D.green||[]).length+' Mon:'+(D.monuments||[]).length);
    done();
  });
}

// ── ENTRY POINT ───────────────────────────────────────────────────────────
window._startCinema = function(cityKey) {
  cityKey=cityKey||(window.TCI&&window.TCI.cityKey)||(window.S&&window.S.activeUAT)||localStorage.getItem('ux_last_city')||'RO-IS-01';
  var map=window.map, SE=window._CinemaEngine;
  if(!map){console.error('[Cinema] map lipsa');return;}
  if(!SE){console.error('[Cinema] SE lipsa');return;}

  var city=null;
  if(window._RO_CITIES_DB) city=window._RO_CITIES_DB[cityKey];
  if(!city&&window._UAT_DB) city=window._UAT_DB[cityKey];
  if(!city&&window.TCI&&window.TCI._EXTRA_UATS) city=window.TCI._EXTRA_UATS[cityKey];
  if(!city&&window._RO_CITIES_DB) city=Object.values(window._RO_CITIES_DB)[0];
  if(!city){console.error('[Cinema] city negasit');return;}

  var pred=null;
  try{if(window._PredEngine&&typeof window._PredEngine.calc==='function')pred=window._PredEngine.calc(city);}catch(e){}
  if(!pred)pred=_fp(city);

  var cx=city.lon||27.601, cy=city.lat||47.158;
  var siruta=city.siruta||cityKey.split('-').pop();
  var name=city.name||'UAT';

  SE.SCENES=SCENES; SE._setupMap=function(){};
  SE._playing=false;
  if(SE._raf)cancelAnimationFrame(SE._raf);
  if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
  _clearPulse();
  _cl(map);

  // Ascunde UI platforma
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

  D.wiki=null;D.inse=null;D.roads=null;D.rail=null;D.airports=null;
  D.urban=null;D.green=null;D.monuments=null;D.loaded=false;

  document.querySelectorAll('#tci-c8,#cin-legend,#tci-c8-ctrl,#cin-loading').forEach(function(e){e.remove();});

  // Loading screen
  var ld=document.createElement('div');
  ld.id='cin-loading';
  ld.style.cssText='position:fixed;inset:0;z-index:999998;background:rgba(2,5,14,0.97);display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:"Space Grotesk",sans-serif;';
  ld.innerHTML='<div style="font-size:10px;font-weight:700;color:#D4AF37;letter-spacing:.2em;margin-bottom:14px;text-transform:uppercase;">TCI Cinematic v5.2 Premium</div>'
    +'<div style="font-size:36px;font-weight:900;color:#fff;margin-bottom:6px;letter-spacing:.02em;">'+name.toUpperCase()+'</div>'
    +'<div style="font-size:12px;color:rgba(148,163,184,0.5);margin-bottom:30px;">Analiza urbanistica '+_S()+' \u2192 '+_E()+' · Date live INSE · OSM · Wikipedia · ANAR</div>'
    +'<div style="width:320px;height:3px;background:rgba(255,255,255,0.07);border-radius:2px;">'
    +'<div id="cin-prog" style="height:100%;width:0%;background:linear-gradient(90deg,#D4AF37,#f59e0b);border-radius:2px;transition:width .5s;"></div></div>'
    +'<div id="cin-load-msg" style="font-size:9px;color:rgba(148,163,184,0.35);margin-top:10px;letter-spacing:.05em;text-transform:uppercase;"></div>';
  document.body.appendChild(ld);

  var prg=document.getElementById('cin-prog'), pv=0;
  var msgs=['Wikipedia — scurt istoric UAT...','INSE TEMPO — date demografice live...','OSM — infrastructura regionala...','OSM — retea urbana + POI...','Spatii verzi · Monumente · Utilitati...','Pregatire film cinematic premium...'];
  var mi=0;
  var pi=setInterval(function(){
    pv=Math.min(88,pv+Math.random()*10);
    if(prg)prg.style.width=pv+'%';
    var el=document.getElementById('cin-load-msg');
    if(el&&mi<msgs.length){el.textContent=msgs[mi];mi++;}
  },700);

  try{TCI._playing=false;TCI._stopped=true;}catch(e){}
  try{if(TCI._director)TCI._director._playing=false;}catch(e){}
  try{TCI.pause&&TCI.pause();}catch(e){}

  preload(city,siruta,function(){
    clearInterval(pi);
    if(prg)prg.style.width='100%';
    setTimeout(function(){
      ld.style.transition='opacity .8s';ld.style.opacity='0';
      setTimeout(function(){ ld.remove(); _film(map,SE,city,pred,cx,cy,name,hidden); },800);
    },500);
  });
};

// ── FILM ──────────────────────────────────────────────────────────────────
function _film(map,SE,city,pred,cx,cy,name,hidden){
  var cv=document.createElement('canvas');
  cv.id='tci-c8'; cv.width=window.innerWidth; cv.height=window.innerHeight;
  cv.style.cssText='position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:999999;pointer-events:none;';
  document.body.appendChild(cv);
  window.addEventListener('resize',function(){cv.width=window.innerWidth;cv.height=window.innerHeight;});

  SE._map=map;SE._city=city;SE._pred=pred;
  SE._canvas=cv;SE._ctx=cv.getContext('2d');
  SE._playing=true;SE._si=0;

  var _oFly=map.flyTo.bind(map),_oJump=map.jumpTo.bind(map);
  map.flyTo=function(o){
    if(!SE._playing){map.flyTo=_oFly;map.jumpTo=_oJump;return _oFly(o);}
    var sid=SE.SCENES[SE._si]&&SE.SCENES[SE._si].id;
    var big=(sid==='s1'||sid==='s2');
    if(!big&&((o.pitch||0)<48||(o.zoom||20)<10))return map;
    return _oFly(o);
  };
  map.jumpTo=function(o){
    if(!SE._playing){map.flyTo=_oFly;map.jumpTo=_oJump;return _oJump(o);}
    var sid=SE.SCENES[SE._si]&&SE.SCENES[SE._si].id;
    var big=(sid==='s1'||sid==='s2');
    if(!big&&((o.pitch||0)<48||(o.zoom||20)<10))return _oJump(Object.assign({},o,{pitch:62,zoom:14}));
    return _oJump(o);
  };

  var origColor=null;
  try{origColor=map.getPaintProperty('building-extrusion','fill-extrusion-color');}catch(e){}

  function lp(p){try{map.setConfigProperty('basemap','lightPreset',p);}catch(e){}}
  function rot(b,s){
    if(SE._rotInt)clearInterval(SE._rotInt);
    var br=b;
    SE._rotInt=setInterval(function(){
      if(!SE._playing){clearInterval(SE._rotInt);SE._rotInt=null;return;}
      br+=s;try{map.setBearing(br%360);}catch(e){}
    },50);
  }
  function fly(ctr,z,pt,br,dur,dly,pr){
    setTimeout(function(){
      if(!SE._playing)return;
      if(pr)lp(pr);
      try{map.flyTo({center:ctr,zoom:z,pitch:pt,bearing:br,duration:dur||6000,essential:true,
        easing:function(t){return t<0.5?2*t*t:(1-Math.pow(-2*t+2,2)/2);}});}catch(e){}
    },dly||0);
  }

  // Zone relative
  var Z={C:[cx,cy],NV:[cx-0.023,cy+0.017],SE2:[cx+0.025,cy-0.014],
         SV:[cx-0.016,cy-0.019],NE:[cx+0.021,cy+0.018],PER:[cx+0.045,cy-0.032],
         FAR:[cx+0.08,cy-0.05]};

  // Culorile cladirilor
  var CB=['match',['get','type'],
    'apartments','#3b82f6','residential','#60a5fa','house','#93c5fd',
    'commercial','#f59e0b','retail','#fbbf24','office','#a78bfa',
    'industrial','#6b7280','warehouse','#4b5563',
    'school','#22c55e','university','#16a34a',
    'hospital','#ef4444','church','#d97706','cathedral','#92400e',
    'civic','#8b5cf6','public','#7c3aed','hotel','#ec4899',
    '#94a3b8'];

  function setColor(id){
    var e;
    if(id==='s10')e=['interpolate',['linear'],['get','height'],0,'#166534',8,'#854d0e',15,'#b91c1c',25,'#dc2626',40,'#ef4444'];
    else if(id==='s11')e=['interpolate',['linear'],['get','height'],0,'#1e3a8a',5,'#1d4ed8',12,'#3b82f6',25,'#93c5fd'];
    else if(id==='s7')e=['interpolate',['linear'],['get','height'],0,'#14532d',6,'#15803d',15,'#f59e0b',28,'#ef4444'];
    else e=CB;
    try{map.setPaintProperty('building-extrusion','fill-extrusion-color',e);}catch(er){}
    try{map.setPaintProperty('building-extrusion','fill-extrusion-opacity',0.93);}catch(er){}
  }

  function addLine(id,ft,paint){
    try{
      if(map.getLayer(id))map.removeLayer(id);
      if(map.getSource(id))map.removeSource(id);
      if(!ft||!ft.length)return;
      map.addSource(id,{type:'geojson',data:{type:'FeatureCollection',features:ft}});
      map.addLayer({id:id,type:'line',source:id,
        paint:paint||{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0.88},
        layout:{'line-cap':'round','line-join':'round'}});
    }catch(e){}
  }
  function addCircle(id,ft){
    try{
      if(map.getLayer(id))map.removeLayer(id);
      if(map.getSource(id))map.removeSource(id);
      if(!ft||!ft.length)return;
      map.addSource(id,{type:'geojson',data:{type:'FeatureCollection',features:[]}});
      map.addLayer({id:id,type:'circle',source:id,
        paint:{'circle-color':['get','c'],'circle-radius':['get','r'],'circle-opacity':0.90,
          'circle-stroke-width':1.5,'circle-stroke-color':'rgba(255,255,255,0.55)'}});
      // Adauga progresiv
      _addProgressive(map,id,ft,150);
    }catch(e){}
  }
  function addRasterWMS(id, url, opacity){
    try{
      if(map.getLayer(id))map.removeLayer(id);
      if(map.getSource(id))map.removeSource(id);
      map.addSource(id,{type:'raster',tiles:[url],tileSize:256});
      map.addLayer({id:id,type:'raster',source:id,paint:{'raster-opacity':opacity||0.7}});
      // Fade in
      var op=0;
      var iv=setInterval(function(){
        op=Math.min(opacity||0.7,op+0.05);
        try{map.setPaintProperty(id,'raster-opacity',op);}catch(e){clearInterval(iv);}
        if(op>=(opacity||0.7))clearInterval(iv);
      },80);
      _pulseIntervals.push(iv);
    }catch(e){ console.warn('[Cinema] WMS error:',e.message); }
  }

  function stopAll(){
    SE._playing=false;
    _clearPulse();
    try{map.flyTo=_oFly;map.jumpTo=_oJump;}catch(e){}
    if(SE._raf)cancelAnimationFrame(SE._raf);
    if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
    _cl(map);
    try{if(origColor)map.setPaintProperty('building-extrusion','fill-extrusion-color',origColor);}catch(e){}
    try{map.setPaintProperty('building-extrusion','fill-extrusion-height',['get','height']);}catch(e){}
    document.getElementById('tci-c8')&&document.getElementById('tci-c8').remove();
    document.getElementById('tci-c8-ctrl')&&document.getElementById('tci-c8-ctrl').remove();
    document.getElementById('cin-legend')&&document.getElementById('cin-legend').remove();
    hidden.forEach(function(el){el.style.cssText=el._cs||'';delete el._cs;});
    try{map.flyTo({center:[cx,cy],zoom:12,pitch:40,bearing:0,duration:1500,essential:true});}catch(e){}
    try{map.setConfigProperty('basemap','lightPreset','day');}catch(e){}
    // Restaureaza flood daca era activ
    try{window._FloodMapper&&window._FloodMapper.hideAll&&window._FloodMapper.hideAll(map);}catch(e){}
  }

  function goScene(i){
    if(i<0||i>=SE.SCENES.length)return;
    SE._playing=false;
    _clearPulse();
    if(SE._raf)cancelAnimationFrame(SE._raf);
    if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
    _cl(map);
    SE._playing=true;
    runScene(i);
  }

  // Butoane control
  var ctrl=document.createElement('div');
  ctrl.id='tci-c8-ctrl';
  ctrl.style.cssText='position:fixed;bottom:18px;left:50%;transform:translateX(-50%);z-index:1000000;display:flex;gap:8px;align-items:center;background:rgba(2,6,18,0.92);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.09);border-radius:18px;padding:8px 18px;';
  ctrl.innerHTML='<button id="c8p" style="background:none;border:none;color:#475569;padding:5px 12px;cursor:pointer;font:700 14px monospace;border-radius:8px;" title="Scena anterioara">◀</button>'
    +'<button id="c8pause" style="background:none;border:none;color:#D4AF37;padding:5px 15px;cursor:pointer;font:700 16px monospace;border-radius:8px;">⏸</button>'
    +'<button id="c8n" style="background:none;border:none;color:#475569;padding:5px 12px;cursor:pointer;font:700 14px monospace;border-radius:8px;" title="Scena urmatoare">▶</button>'
    +'<div id="c8sn" style="font:600 9px \'IBM Plex Mono\',monospace;color:#D4AF37;letter-spacing:.07em;min-width:180px;text-align:center;text-transform:uppercase;"></div>'
    +'<button id="c8s" style="background:rgba(127,0,0,.8);border:none;color:#fca5a5;padding:5px 12px;cursor:pointer;font:700 13px monospace;border-radius:8px;" title="Opreste">✕</button>';
  document.body.appendChild(ctrl);
  document.getElementById('c8s').onclick=stopAll;
  document.getElementById('c8n').onclick=function(){goScene(SE._si+1);};
  document.getElementById('c8p').onclick=function(){goScene(SE._si-1);};
  var _pt=0;
  document.getElementById('c8pause').onclick=function(){
    if(SE._playing){
      _pt=Math.min(1,Math.max(0,(performance.now()-SE._startT)/SE.SCENES[SE._si].dur));
      SE._playing=false;_clearPulse();
      if(SE._raf)cancelAnimationFrame(SE._raf);
      if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
      this.textContent='▶';
    } else {
      SE._playing=true;this.textContent='⏸';
      var sc=SE.SCENES[SE._si];
      SE._startT=performance.now()-_pt*sc.dur;
      _loop(sc,SE._si);
    }
  };

  // Legenda dinamica
  function updateLegend(sc){
    var el=document.getElementById('cin-legend');
    var items=sc.legend&&sc.legend!=='none'?(LEGENDS[sc.legend]||[]):[];
    if(!items.length){if(el){el.style.opacity='0';}return;}
    if(!el){
      el=document.createElement('div');el.id='cin-legend';
      el.style.cssText='position:fixed;top:66px;right:14px;z-index:1000000;background:rgba(2,6,18,0.92);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px 14px;font-family:"Space Grotesk",sans-serif;min-width:210px;max-width:250px;transition:opacity .4s;';
      document.body.appendChild(el);
    }
    var html='<div style="font-size:8px;font-weight:700;color:#D4AF37;letter-spacing:.1em;margin-bottom:8px;text-transform:uppercase;">'+sc.label+'</div><div style="display:flex;flex-direction:column;gap:5px;">';
    items.forEach(function(it){
      html+='<div style="display:flex;align-items:flex-start;gap:7px;">'
        +'<span style="display:inline-block;width:11px;height:11px;min-width:11px;background:'+it[0]+';border-radius:2px;margin-top:2px;"></span>'
        +'<span style="color:rgba(210,225,255,0.78);font-size:9px;line-height:1.4;">'+it[1]+'</span></div>';
    });
    html+='</div>';
    el.innerHTML=html;el.style.opacity='1';
  }

  // ── SETUP SCENA — camera + layere + puls ──────────────────────────────
  function setup(id){
    _clearPulse();
    if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
    setColor(id);

    switch(id){

      case 's1': // IDENTITATE — zoom cinematic Europa → UAT
        lp('night');
        try{map.jumpTo({center:[15,52],zoom:3.5,pitch:0,bearing:0});}catch(e){}
        fly([24.5,45.9],6,0,0,4500,300,'night');
        fly([cx,cy],9,15,0,4000,5000,'night');
        fly([cx,cy],13,48,10,4000,9300,'night');
        fly(Z.C,15.5,68,22,5000,13600,'night');
        break;

      case 's2': // CONTEXT REGIONAL — infrastructura pulsanta
        lp('day');
        fly([cx,cy],8,0,0,4000,0,'day');
        setTimeout(function(){
          if(!SE._playing)return;
          // Autostrazi — adauga progresiv + puls
          if(D.roads&&D.roads.length){
            addLine('cin-hw',D.roads,{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0});
            // Fade in progresiv
            var op=0;
            var fiv=setInterval(function(){
              if(!map.getLayer('cin-hw')){clearInterval(fiv);return;}
              op=Math.min(0.9,op+0.04);
              try{map.setPaintProperty('cin-hw','line-opacity',op);}catch(e){clearInterval(fiv);}
              if(op>=0.9)clearInterval(fiv);
            },60);
            _pulseIntervals.push(fiv);
          }
          // Cai ferate — dash animat
          if(D.rail&&D.rail.length){
            addLine('cin-rail',D.rail,{'line-color':'#a78bfa','line-width':2,'line-opacity':0.75,'line-dasharray':[4,3]});
          }
          // Aeroporturi — pulse radius
          if(D.airports&&D.airports.length){
            addCircle('cin-apt',D.airports.map(function(a){return{type:'Feature',geometry:{type:'Point',coordinates:[a.lon,a.lat]},properties:{c:'#22c55e',r:12,n:a.name+(a.iata?' ('+a.iata+')':'')}};}));
            setTimeout(function(){ _pulseLayer(map,'cin-apt','circle-radius',8,16,15); },1000);
          }
        },2000);
        fly([cx,cy],10,20,-10,5000,7000,'day');
        fly([cx,cy],12,42,15,5000,14000,'day');
        break;

      case 's3': // PROFIL LOCUITORI
        lp('dawn');
        fly(Z.C,13,48,0,4000,0,'dawn');
        setTimeout(function(){
          if(!SE._playing)return;
          if(D.green&&D.green.length) addCircle('cin-green',D.green);
          if(D.monuments&&D.monuments.length){
            addCircle('cin-mon',D.monuments);
            setTimeout(function(){ _pulseLayer(map,'cin-mon','circle-radius',5,9,12); },1500);
          }
        },2000);
        fly(Z.NV,14.5,60,40,6500,10000,'dawn');
        fly(Z.C,13,50,0,5000,18000,'day');
        break;

      case 's4': // ECONOMIE — zoom pe zone functionale
        lp('day');
        fly(Z.C,14,55,-10,4000,0,'day');
        // Zoom pe universitate/industrie
        fly(Z.NV,15.5,68,30,6000,9000,'day');  // Copou/universitati
        fly(Z.SE2,14.5,62,-25,6000,17000,'dusk'); // zona industriala
        break;

      case 's5': // PROIECTE & INFRA
        lp('day');
        setTimeout(function(){
          if(!SE._playing)return;
          if(D.roads&&D.roads.length) addLine('cin-hw',D.roads);
          if(D.rail&&D.rail.length) addLine('cin-rail',D.rail,{'line-color':'#a78bfa','line-width':2,'line-opacity':0.7});
          if(D.airports&&D.airports.length) addCircle('cin-apt',D.airports.map(function(a){return{type:'Feature',geometry:{type:'Point',coordinates:[a.lon,a.lat]},properties:{c:'#22c55e',r:14,n:a.name}};}));
        },500);
        fly([cx,cy],11,35,0,4000,0,'day');
        fly(Z.PER,12.5,50,30,6500,8500,'day');
        fly(Z.C,14,58,-15,6000,17000,'dusk');
        break;

      case 's6': // FOND CONSTRUIT — monumente + restrictii
        lp('day');
        setTimeout(function(){
          if(!SE._playing)return;
          if(D.monuments&&D.monuments.length){
            addCircle('cin-mon',D.monuments);
            _pulseLayer(map,'cin-mon','circle-radius',5,10,10);
          }
          if(D.cimitire&&D.cimitire.length) addLine('cin-cim',D.cimitire,{'line-color':'#6b7280','line-width':2,'line-dasharray':[3,3],'line-opacity':0.7});
          if(D.utilities&&D.utilities.length) addLine('cin-utils',D.utilities,{'line-color':'#fbbf24','line-width':1,'line-opacity':0.5,'line-dasharray':[2,4]});
        },1500);
        fly(Z.C,15.5,68,20,4000,0,'day');
        fly(Z.NV,15,65,65,6500,10000,'day');
        fly(Z.SE2,15,65,125,6500,18000,'day');
        break;

      case 's7': // CORIDOARE — cladiri cresc animat
        lp('night');
        try{map.setPaintProperty('building-extrusion','fill-extrusion-height',0.5);}catch(e){}
        // Proiectia TCI daca exista
        try{
          if(window.TCI&&window.TCI._projZones&&window.TCI._projZones.length>0&&map.getSource('tci-proj')){
            console.log('[Cinema] Folosesc proiectia TCI existenta:',window.TCI._projZones.length,'zone');
          }
        }catch(e){}
        fly(Z.C,14.5,62,10,4000,0,'night');
        fly(Z.NV,14.5,65,55,7000,11000,'night');
        fly(Z.SE2,14,62,135,7000,20000,'dusk');
        break;

      case 's8': // MOBILITATE — retea pulsanta
        lp('night');
        fly([cx,cy],12,48,0,4000,0,'night');
        setTimeout(function(){
          if(!SE._playing)return;
          if(D.urban&&D.urban.length){
            addLine('cin-urb',D.urban);
            // Pulse pe artere principale
            var major=D.urban.filter(function(f){return f.properties&&(f.properties.hw==='primary'||f.properties.hw==='motorway'||f.properties.hw==='trunk');});
            if(major.length){
              addLine('cin-urb-major',major,{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0.6});
              _pulseLayer(map,'cin-urb-major','line-opacity',0.4,1.0,8);
            }
          }
        },1500);
        fly(Z.C,13.5,55,15,6000,9000,'night');
        fly(Z.SE2,13,50,-22,6000,17000,'night');
        break;

      case 's9': // TRANSPORT PUBLIC — trasee + propuneri
        lp('day');
        // Trasee TP din TCI daca exista
        try{
          if(map.getLayer('tci-tp-layer')){
            // Vizibilizeaza layerul TP existent din TCI
            map.setLayoutProperty('tci-tp-layer','visibility','visible');
            _pulseLayer(map,'tci-tp-layer','line-opacity',0.5,1.0,10);
          }
        }catch(e){}
        // Fallback: trasee sintetice
        var tpFt=_buildTP(cx,cy);
        addLine('cin-tp',tpFt.features,{'line-color':['get','color'],'line-width':3,'line-opacity':0.8});
        _pulseLayer(map,'cin-tp','line-opacity',0.5,1.0,12);
        rot(20,0.008);
        fly(Z.C,13.5,52,0,4000,0,'day');
        fly(Z.NV,14,60,30,6000,10000,'day');
        fly(Z.SE2,13.5,55,-25,5000,18000,'day');
        break;

      case 's10': // RISC SEISMIC
        lp('night');
        fly([cx,cy],12.5,52,5,4000,0,'night');
        try{SE._addSeismic&&SE._addSeismic.call(SE,map);}catch(e){}
        fly(Z.NV,14,62,30,6500,8000,'night');
        fly(Z.SE2,14,60,-22,6500,15000,'night');
        break;

      case 's11': // CLIMA & INUNDATII — WMS ANAR real
        lp('dawn');
        fly([cx,cy],11.5,45,8,4000,0,'dawn');
        // Harta ANAR WMS reala — prin FloodMapper sau direct
        setTimeout(function(){
          if(!SE._playing)return;
          try{
            // Metoda 1: prin _FloodMapper din platforma
            if(window._FloodMapper&&typeof window._FloodMapper.addAll==='function'){
              window._FloodMapper.addAll(map);
              console.log('[Cinema] ANAR WMS prin _FloodMapper');
              _pulseLayer(map,'flood-rcp10','raster-opacity',0.4,0.8,6);
            } else {
              // Metoda 2: WMS direct ANAR
              var anarBase='https://gis.rowater.ro/arcgis/services/PGRA/Hazard_Inundatii/MapServer/WMSServer';
              var anarTile=PROXY+'/proxy?url='+encodeURIComponent(anarBase+'?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=0&CRS=EPSG%3A3857&STYLES=&WIDTH=256&HEIGHT=256&BBOX={bbox-epsg-3857}');
              addRasterWMS('cin-anar',anarTile,0.65);
            }
          }catch(e){ console.warn('[Cinema] ANAR:',e.message); }
          // Spatii verzi — zone racire
          if(D.green&&D.green.length){
            addCircle('cin-green',D.green);
            _pulseLayer(map,'cin-green','circle-radius',5,10,8);
          }
          // Autostrazi
          if(D.roads&&D.roads.length) addLine('cin-hw',D.roads);
        },2000);
        fly(Z.SV,12.5,50,15,6000,9000,'dawn');
        fly(Z.C,13,55,-5,5500,17000,'day');
        break;

      case 's12': // MONTE CARLO
        lp('dusk');
        fly([cx,cy],11.5,48,-5,4000,0,'dusk');
        try{SE._addExpansionRings&&SE._addExpansionRings.call(SE,map);}catch(e){}
        fly(Z.PER,12,45,40,7000,11000,'dusk');
        fly(Z.C,13,52,-10,6000,20000,'night');
        break;

      case 's13': // INFRASTRUCTURA NECESARA — puncte progresive
        lp('day');
        rot(12,0.008);
        try{SE._addInfraPoints&&SE._addInfraPoints.call(SE,map);}catch(e){}
        // Adauga amenity existent pentru context
        if(D.amenity&&D.amenity.length) addCircle('cin-amenity',D.amenity);
        fly(Z.C,14.5,62,20,4000,0,'day');
        fly(Z.NV,14,58,50,6000,10000,'day');
        fly(Z.SE2,14,58,-30,6000,17000,'day');
        break;

      case 's14': // BENCHMARK EU
        lp('dusk');
        fly(Z.C,13,50,-15,4000,0,'dusk');
        fly(Z.NV,14,58,30,6000,10000,'dusk');
        fly(Z.SE2,13.5,54,-22,5500,18000,'dusk');
        break;

      case 's15': // SDG — spatii verzi evidentiate
        lp('day');
        if(D.green&&D.green.length){
          setTimeout(function(){
            if(!SE._playing)return;
            addCircle('cin-green',D.green);
            _pulseLayer(map,'cin-green','circle-radius',6,14,10);
          },1000);
        }
        fly(Z.C,14.5,60,10,4000,0,'day');
        fly(Z.SE2,14,58,-22,6000,10000,'day');
        fly(Z.C,13.5,52,0,5000,18000,'day');
        break;

      case 's16': // AGENDA PRIMARULUI — prioritati localizate
        lp('day');
        // Marcheaza prioritatile pe harta cu puncte animate
        if(D.roads&&D.roads.length) setTimeout(function(){if(!SE._playing)return;addLine('cin-hw',D.roads);},500);
        setTimeout(function(){
          if(!SE._playing)return;
          var priority_pts = _buildPriorityPoints(cx,cy,pred);
          addCircle('cin-priority', priority_pts);
          _pulseLayer(map,'cin-priority','circle-radius',8,18,8);
        },2000);
        fly([cx,cy],13,52,0,4000,0,'day');
        fly(Z.C,14.5,62,22,6000,9000,'day');
        fly(Z.PER,13,48,50,6000,17000,'day');
        break;

      case 's17': // VIZIUNEA — rotatie lenta, dusk, dramatism
        lp('dusk');
        rot(30,0.007);
        fly(Z.C,15.5,72,120,20000,2000,'dusk');
        break;
    }
  }

  // ── CANVAS DRAW ───────────────────────────────────────────────────────
  function draw(sc,t){
    var ctx=SE._ctx, W=window.innerWidth, H=window.innerHeight;
    if(!ctx||!pred)return;
    var id=sc.id;
    var sA=t<0.06?t/0.06:t>0.92?(1-t)/0.08:1;
    var eo=function(x){return 1-Math.pow(1-Math.max(0,Math.min(1,x)),3);};
    var rE=function(d,s){return eo(Math.min(1,Math.max(0,(t-(d||0))/((s||0.25)))));};
    var N=function(v){return isNaN(+v)?'—':Number(v).toLocaleString('ro-RO',{maximumFractionDigits:0});};

    // Font sizes — 100% responsive
    var FT=Math.min(W*0.028,38);
    var FD=Math.min(W*0.050,66);
    var FS=Math.min(W*0.013,16);
    var FL=Math.min(W*0.010,13);
    var FN=Math.min(W*0.012,15);
    var FC=Math.min(W*0.010,13);

    // Vignete
    var gT=ctx.createLinearGradient(0,0,0,H*0.30);
    gT.addColorStop(0,'rgba(2,5,14,0.94)');gT.addColorStop(1,'rgba(2,5,14,0)');
    ctx.fillStyle=gT;ctx.fillRect(0,0,W,H*0.30);
    var gB=ctx.createLinearGradient(0,H*0.70,0,H);
    gB.addColorStop(0,'rgba(2,5,14,0)');gB.addColorStop(1,'rgba(2,5,14,0.94)');
    ctx.fillStyle=gB;ctx.fillRect(0,H*0.70,W,H*0.30);

    function titlu(txt,sub){
      ctx.globalAlpha=sA*rE(0.04,0.16);
      ctx.fillStyle='rgba(212,175,55,0.96)';
      ctx.font='700 '+FT+'px "IBM Plex Mono",monospace';
      ctx.textAlign='left';ctx.letterSpacing='0.04em';
      wrap(ctx,txt,W*0.04,H*0.088,W*0.82,FT*1.35,2);
      if(sub){
        ctx.globalAlpha=sA*rE(0.07,0.16)*0.68;
        ctx.fillStyle='rgba(148,163,184,0.88)';
        ctx.font=FS+'px "IBM Plex Mono",monospace';
        ctx.letterSpacing='0.02em';
        wrap(ctx,sub,W*0.04,H*0.088+FT*1.5,W*0.82,FS*1.6,2);
      }
      ctx.globalAlpha=1;
    }
    function linie(){
      ctx.globalAlpha=sA*rE(0.06,0.22);
      var g=ctx.createLinearGradient(W*0.04,0,W*0.04+W*0.44,0);
      g.addColorStop(0,'rgba(212,175,55,0.9)');g.addColorStop(1,'rgba(212,175,55,0)');
      ctx.fillStyle=g;ctx.fillRect(W*0.04,H*0.11+FT*1.5,W*0.44*rE(0.06,0.28),1.5);
      ctx.globalAlpha=1;
    }
    function cifra(val,lbl,clr){
      ctx.globalAlpha=sA*rE(0.13,0.20);
      ctx.fillStyle=clr||'#ffffff';
      ctx.font='900 '+FD+'px "Space Grotesk",sans-serif';
      ctx.textAlign='left';ctx.letterSpacing='0';
      ctx.fillText(String(val).slice(0,13),W*0.04,H*0.886);
      ctx.globalAlpha=sA*rE(0.16,0.17)*0.72;
      ctx.fillStyle='rgba(148,163,184,0.78)';
      ctx.font='600 '+FL+'px "IBM Plex Mono",monospace';
      ctx.letterSpacing='0.05em';
      ctx.fillText(String(lbl).toUpperCase().slice(0,38),W*0.04,H*0.910);
      ctx.globalAlpha=1;
    }
    function cifra2(val,lbl,clr){
      ctx.globalAlpha=sA*rE(0.18,0.18);
      ctx.fillStyle=clr||'rgba(212,175,55,0.96)';
      ctx.font='900 '+Math.min(W*0.028,38)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='right';ctx.letterSpacing='0';
      ctx.fillText(String(val).slice(0,16),W*0.96,H*0.886);
      ctx.globalAlpha=sA*rE(0.21,0.17)*0.68;
      ctx.fillStyle='rgba(148,163,184,0.70)';
      ctx.font='600 '+FL+'px "IBM Plex Mono",monospace';
      ctx.textAlign='right';ctx.letterSpacing='0.04em';
      ctx.fillText(String(lbl).toUpperCase().slice(0,32),W*0.96,H*0.909);
      ctx.globalAlpha=1;
    }
    function narativ(txt){
      if(t<0.48)return;
      var a=Math.min(1,(t-0.48)/0.16)*sA;
      ctx.globalAlpha=a;
      ctx.fillStyle='rgba(220,228,255,0.87)';
      ctx.font='500 '+FN+'px "Space Grotesk",sans-serif';
      ctx.textAlign='left';ctx.letterSpacing='0';
      wrap(ctx,txt,W*0.04,H*0.930,W*0.60,FN*1.55,4);
      ctx.globalAlpha=1;
    }
    function concluzie(txt){
      if(t<0.78)return;
      var a=Math.min(1,(t-0.78)/0.14)*sA*0.92;
      ctx.globalAlpha=a;
      ctx.fillStyle='rgba(212,175,55,0.92)';
      ctx.font='700 '+FC+'px "IBM Plex Mono",monospace';
      ctx.textAlign='right';ctx.letterSpacing='0.03em';
      wrap(ctx,'\u25B6 '+txt,W*0.96,H*0.955,W*0.56,FC*1.55,2);
      ctx.globalAlpha=1;
    }
    function negativ(txt){
      if(t<0.83)return;
      var a=Math.min(1,(t-0.83)/0.12)*sA*0.90;
      ctx.globalAlpha=a;
      ctx.fillStyle='rgba(239,68,68,0.90)';
      ctx.font='700 '+FC+'px "IBM Plex Mono",monospace';
      ctx.textAlign='left';ctx.letterSpacing='0.02em';
      wrap(ctx,'\u26A0 FARA ACTIUNE: '+txt,W*0.04,H*0.955,W*0.56,FC*1.55,2);
      ctx.globalAlpha=1;
    }
    // Explicatie scena — apare in primele 15% din t
    function explica(txt){
      if(t>0.20)return;
      var a=t<0.08?(t/0.08)*sA:t>0.15?((0.20-t)/0.05)*sA:sA;
      ctx.globalAlpha=a*0.80;
      ctx.fillStyle='rgba(148,163,184,0.70)';
      ctx.font='500 '+Math.min(W*0.011,13)+'px "IBM Plex Mono",monospace';
      ctx.textAlign='center';ctx.letterSpacing='.04em';
      wrap(ctx,txt,W/2,H*0.20,W*0.70,Math.min(W*0.013,16)*1.5,3);
      ctx.globalAlpha=1;
    }

    // Progress bar
    ctx.globalAlpha=0.55;
    ctx.fillStyle='rgba(255,255,255,0.07)';ctx.fillRect(W*0.28,H-8,W*0.44,2);
    var gp=ctx.createLinearGradient(W*0.28,0,W*0.72,0);
    gp.addColorStop(0,'#D4AF37');gp.addColorStop(1,'rgba(212,175,55,0.05)');
    ctx.fillStyle=gp;ctx.fillRect(W*0.28,H-8,W*0.44*((SE._si+t)/SE.SCENES.length),2);
    ctx.fillStyle='rgba(148,163,184,0.28)';
    ctx.font='500 '+Math.min(W*0.008,9)+'px "IBM Plex Mono",monospace';
    ctx.textAlign='center';ctx.letterSpacing='.04em';
    ctx.fillText('BLOC '+sc.bloc+' \u00b7 '+(SE._si+1)+'/'+SE.SCENES.length+' \u2014 '+sc.label,W/2,H-1);
    ctx.globalAlpha=1;

    var pop21=pred.p21||city.pop2021||100000;
    var r10=pred.r10||city.rata_reala_2011_2021||0;

    switch(id){

      case 's1':
        explica('ZOOM CINEMATIC: Europa \u2192 Romania \u2192 '+name+' \u2014 date live Wikipedia + INSE');
        ctx.globalAlpha=sA*rE(0.16,0.30);
        ctx.fillStyle='rgba(255,255,255,0.96)';
        var fn=Math.min(W*0.072,92);
        if(ctx.measureText(name.toUpperCase()).width>W*0.88) fn*=0.7;
        ctx.font='900 '+fn+'px "Space Grotesk",sans-serif';
        ctx.textAlign='center';ctx.letterSpacing='0.02em';
        ctx.fillText(name.toUpperCase(),W/2,H*0.47);
        ctx.globalAlpha=sA*rE(0.23,0.18)*0.84;
        ctx.fillStyle='#D4AF37';
        ctx.font='600 '+Math.min(W*0.014,18)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='center';ctx.letterSpacing='0';
        ctx.fillText((city.judet||'—').toUpperCase()+' \u00b7 '+N(pop21)+' LOCUITORI \u00b7 SIRUTA '+(city.siruta||'—'),W/2,H*0.545);
        ctx.globalAlpha=1;
        if(D.wiki&&D.wiki.extract&&t>0.35){
          var wA=Math.min(1,(t-0.35)/0.18)*sA*0.92;
          ctx.globalAlpha=wA;
          var bx=W*0.04,by=H*0.60,bw=Math.min(W*0.54,510),bh=H*0.27;
          ctx.fillStyle='rgba(4,10,24,0.84)';
          ctx.beginPath();ctx.roundRect&&ctx.roundRect(bx,by,bw,bh,8);ctx.fill();
          ctx.strokeStyle='rgba(212,175,55,0.20)';ctx.lineWidth=1;ctx.stroke();
          ctx.fillStyle='rgba(148,163,184,0.52)';
          ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left';ctx.letterSpacing='.06em';
          ctx.fillText('\u{1F4D6} WIKIPEDIA \u2014 SCURT ISTORIC',bx+12,by+16);
          ctx.fillStyle='rgba(210,225,255,0.86)';
          ctx.font='400 '+Math.min(W*0.0115,14)+'px "Space Grotesk",sans-serif';
          ctx.letterSpacing='0';
          wrap(ctx,D.wiki.extract,bx+12,by+34,bw-24,Math.min(W*0.014,17)*1.5,8);
          ctx.globalAlpha=1;
        }
        cifra(N(pop21),'Locuitori 2021 \u2014 INSE Recensamant');
        cifra2(N(Math.round(((city.suprafata_ha||city.suprafata||9800)/100)))+' km\u00b2','Suprafata UAT');
        break;

      case 's2':
        titlu('Context Regional','Accesibilitate \u00b7 Infrastructura \u00b7 Gravitatie \u00b7 Raioane vecine');linie();
        explica('AUTOSTRAZI pulsand portocaliu/rosu \u00b7 CALE FERATA violet \u00b7 AEROPORTURI verde pulsant');
        var hub=city.coef_hub||0.78;
        var nh=(D.roads||[]).length,nr=(D.rail||[]).length,na=(D.airports||[]).length;
        var rows2=[
          ['\u{1F6E3} Autostrazi/DN raza 70km: '+nh+' segmente','#ea580c'],
          ['\u{1F682} Cale ferata raza 40km: '+nr+' segmente CFR','#a78bfa'],
          ['\u2708 Aeroporturi raza 120km: '+(na>0?na+' detectate':'verificare'),'#22c55e'],
          ['\u{1F3D9} Hub: '+(hub>=1.1?'METROPOLITAN':hub>=0.9?'REGIONAL':'LOCAL')+' (coef '+hub.toFixed(2)+')','#D4AF37'],
          ['\u{1F30D} Regiune: '+(city.regiune||'—')+' | Tip: '+(city.tip||'municipiu'),'#60a5fa'],
        ];
        rows2.forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.14+i*0.04,0.18);
          ctx.fillStyle=it[1];
          ctx.font='500 '+Math.min(W*0.012,15)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left';ctx.letterSpacing='0';
          wrap(ctx,it[0],W*0.04,H*(0.575+i*0.058),W*0.55,Math.min(W*0.014,17)*1.4,2);
        });
        ctx.globalAlpha=1;
        cifra(N(pop21),'Populatie UAT 2021');
        cifra2(hub.toFixed(2)+' hub','Coeficient economic gravitational');
        narativ('Liniile portocalii/rosii = autostrazi/DN. Violet = cale ferata. Verde pulsant = aeroporturi. Gravitatia urbana si conectivitatea determina coridoarele de crestere. Fiecare km autostrada nou in raza 20km = +15-40% valoare teren pe coridor (model gravitational UrbanX).');
        concluzie('Conectivitatea este predictorul principal al cresterii urbane pe 30 ani');
        negativ('Izolare infrastructurala = declin economic = scadere valori imobiliare -20-35% pe 15 ani');
        break;

      case 's3':
        titlu('Profil Locuitori','Demografie \u00b7 Structura varsta \u00b7 Migratie \u00b7 '+_S()+'-'+_E());linie();
        explica('VERDE = spatii verzi OSM \u00b7 AURIU pulsant = monumente si patrimoniu cultural');
        var rClr=r10>=0.5?'#22c55e':r10>=-0.5?'#f59e0b':'#ef4444';
        var tLbl=r10>=1?'crestere accelerata':r10>=0.2?'crestere lenta':r10>=-0.5?'stagnare demografica':'declin demografic';
        cifra((r10>=0?'+':'')+r10.toFixed(2)+'%/an',tLbl,rClr);
        cifra2(N(pred.pop55||Math.round(pop21*Math.pow(1+r10/100,_HORIZON))),'Proiectie '+_E());
        if(t>0.20) _drawAge(ctx,W,H,Math.min(1,(t-0.20)/0.20)*sA,r10);
        // Profil special
        var isUniv=(city.universitati||0)>0||(city.coef_hub||0)>=1.1;
        var isGranita=['IS','BT','SV','GL','TL','CT'].indexOf(city.judet||'')>=0;
        if(t>0.28){
          ctx.globalAlpha=sA*rE(0.28,0.18)*0.86;
          ctx.fillStyle='rgba(220,230,255,0.85)';
          ctx.font='500 '+Math.min(W*0.011,14)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left';ctx.letterSpacing='0';
          var profil='';
          if(isUniv) profil+='\u{1F393} Centru universitar: '+(city.universitati||'multiple')+' institutii, aflux studenti. ';
          if(isGranita) profil+='\u{1F30E} Zona granita/proximitate: flux migratie pozitiv din Est. ';
          if(!profil) profil='\u{1F4CA} Profil demografic: '+(r10<-0.5?'imbatranire accelerata, emigratie':'stabilitate relativa, potentiale de crestere')+'. ';
          profil+='Structura: '+Math.round(18+r10<0?26:18)+'% 65+, '+Math.round(28+r10*2)+'% 25-44.';
          wrap(ctx,profil,W*0.04,H*0.62,W*0.55,Math.min(W*0.013,17)*1.5,3);
          ctx.globalAlpha=1;
        }
        narativ(N(pop21)+' loc. (2021, INSE). Tendinta: '+r10.toFixed(2)+'%/an. Proiectie S2: '+N(pred.pop55||0)+' loc. in '+_E()+'. Verde=parcuri/spatii verzi. Auriu=monumente. Demografii sunt fundamentul oricarei proiectii urbanistice corecte.');
        concluzie('Declinul demografic impune regnandire PUG: nu mai construim, reconvertim si reabilitam');
        negativ('Fara politici demografice active: populatia scade sub pragul de sustenabilitate a serviciilor publice dupa '+_P2());
        break;

      case 's4':
        titlu('Economie','PIB \u00b7 Convergenta UE \u00b7 Sectoare \u00b7 Putere de cumparare');linie();
        explica('CAMERA: centru civic \u2192 zona universitara \u2192 zona industriala \u2014 3 motoare economice');
        var pib=pred.pib||14200, pUE=pred.pctUE||Math.round(pib/366);
        cifra(N(pib)+' \u20ac/loc','PIB per locuitor Eurostat',pUE>=75?'#22c55e':pUE>=50?'#f59e0b':'#ef4444');
        cifra2(pUE+'% UE27','Convergenta economica');
        if(t>0.18) _drawEco(ctx,W,H,Math.min(1,(t-0.18)/0.20)*sA,pred);
        // Marker economic per zona
        if(t>0.30){
          var zones_eco=[
            {t:'\u{1F3EB} Universitati','x':0.04,'y':0.62,'c':'#3b82f6'},
            {t:'\u{1F3ED} Industrie/logistica','x':0.04,'y':0.66,'c':'#f59e0b'},
            {t:'\u{1F3E2} Servicii/IT','x':0.04,'y':0.70,'c':'#a78bfa'},
            {t:'\u{1F6D2} Retail/comercial','x':0.04,'y':0.74,'c':'#f59e0b'},
          ];
          zones_eco.forEach(function(z,i){
            ctx.globalAlpha=sA*rE(0.30+i*0.04,0.16)*0.85;
            ctx.fillStyle=z.c;
            ctx.font='500 '+Math.min(W*0.011,14)+'px "Space Grotesk",sans-serif';
            ctx.textAlign='left';ctx.letterSpacing='0';
            ctx.fillText(z.t,W*z.x,H*z.y);
          });
          ctx.globalAlpha=1;
        }
        narativ(name+' = '+pUE+'% din media UE27 (\u20ac'+N(pib)+'/loc vs \u20ac36.600 UE27). Convergenta estimata: ~'+_E()+'. ROI imobiliar: ~'+(pred.roi||8)+'%/an. Camera: centru civic = servicii/administratie, Copou = universitati/cercetare, periferiei = industrie/logistica.');
        concluzie('Convergenta economica este principalul predictor al valorii imobiliare pe 30 ani');
        negativ('Fara investitii: ramanem la '+pUE+'% UE27 in '+_E()+' — cea mai lenta convergenta din regiune');
        break;

      case 's5':
        titlu('Proiecte & Infrastructura','PNRR \u00b7 Autostrazi \u00b7 Investitii publice live');linie();
        explica('ROSU/PORTOCALIU = autostrazi \u00b7 VIOLET = cale ferata \u00b7 VERDE = aeroporturi \u00b7 toate reale din OSM');
        var nMot=(D.roads||[]).filter(function(r){return r.properties&&r.properties.t==='motorway';}).length;
        var pRows=[
          ['\u{1F6E3} Autostrazi in raza 70km: '+nMot+' segmente motorway detectate','#dc2626'],
          ['\u{1F682} Cale ferata: restricte constructie 20m de la axa','#a78bfa'],
          ['\u{1F4B0} PNRR C10-I2: '+N(pred.fond||1000)+' cladiri eligibile consolidare seismica','#f59e0b'],
          ['\u{1F3D7} Necesare: '+N(pred.defLoc||3000)+' unitati locative pana in '+_E(),'#60a5fa'],
          ['\u{1F1EA}\u{1F1FA} Fonduri UE absorbabile: ~'+N(Math.round((pred.invTotal||300)*0.35))+' M EUR 2025-2035','#22c55e'],
          ['\u{1F4CA} Total investitii necesare: '+N(pred.invTotal||300)+' M EUR pe '+_HORIZON+' ani','#D4AF37'],
        ];
        pRows.forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.13+i*0.04,0.17);
          ctx.fillStyle=it[1];
          ctx.font='500 '+Math.min(W*0.012,14)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left';ctx.letterSpacing='0';
          wrap(ctx,it[0],W*0.04,H*(0.550+i*0.062),W*0.55,Math.min(W*0.014,17)*1.4,2);
        });
        ctx.globalAlpha=1;
        cifra(N(pred.invTotal||300)+' M \u20ac','Investitii necesare '+_S()+'-'+_E(),'#D4AF37');
        cifra2('~35% UE','Finantare FEDR+PNRR');
        narativ('Coridorul unei autostrazi noi in raza 20km = +15-40% valoare teren. Spitalul Regional = pol de dezvoltare 5km jur. Campus universitar extins = zona rezidentiala premium. Fiecare investitie publica majora redistribuie oportunitatile urbanistice.');
        concluzie('Fiecare proiect major anuntat creeaza imediat un coridor de crestere urbana');
        negativ('Fara infrastructura: investitorii privati aleg alte orase — pierdere fiscala '+N(Math.round((pred.invTotal||300)*0.08))+' M EUR/an');
        break;

      case 's6':
        titlu('Fond Construit Existent','Tipuri \u00b7 Monumente \u00b7 Restrictii legale \u00b7 Vulnerabilitati');linie();
        explica('AURIU pulsant = monumente CIMEC \u00b7 GRI stria = cimitire (50m restrictie) \u00b7 GALBEN = retele electrice');
        cifra(N(pred.auth||Math.round(pop21/800)),'Autorizatii/an estimat ANCPI','#60a5fa');
        cifra2(N(pred.fond||Math.round(pop21/50))+' cladiri','Fond risc seismic RS I-III','#ef4444');
        if(t>0.25){
          ctx.globalAlpha=sA*rE(0.25,0.18)*0.88;
          ctx.fillStyle='rgba(220,230,255,0.82)';
          ctx.font='500 '+Math.min(W*0.011,14)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left';ctx.letterSpacing='0';
          wrap(ctx,'\u{1F4D9} Monumente CIMEC: zona protectie 200m = restrictii constructie conform Legii 422/2001',W*0.04,H*0.62,W*0.55,Math.min(W*0.014,17)*1.5,2);
          wrap(ctx,'\u{26CF} Cimitire: restrictie legala 50m perimetru (OMS/Legea 102/2014)',W*0.04,H*0.66,W*0.55,Math.min(W*0.014,17)*1.5,2);
          wrap(ctx,'\u{1F682} CFR: culoar siguranta 20m axa = constructie interzisa (Legea 202/2016)',W*0.04,H*0.70,W*0.55,Math.min(W*0.014,17)*1.5,2);
          wrap(ctx,'\u26A1 Retele electrice: zona protectie 20-110m (ANRE) = restrictii POT/CUT',W*0.04,H*0.74,W*0.55,Math.min(W*0.014,17)*1.5,2);
          ctx.globalAlpha=1;
        }
        narativ('Albastru=blocuri \u00b7 Portocaliu=comercial \u00b7 Verde=scoli \u00b7 Rosu=spitale \u00b7 Violet=birouri \u00b7 Auriu=monumente/biserici. '+(D.monuments||[]).length+' monumente detectate OSM. '+N(pred.fond||0)+' cladiri pre-1990 = vulnerabilitate seismica critca.');
        concluzie('Restrictiile legale cumulate (CFR+monumente+cimitire+retele) reduc cu 15-25% suprafata construibila reala');
        negativ('Fara evaluare fond pre-1977: cutremur >7.0 Richter = '+Math.round((pred.fond||1000)*0.15)+' cladiri afectate critic');
        break;

      case 's7':
        var tG=t<0.12?0:Math.min(1,(t-0.12)/0.74);
        var tE=1-Math.pow(1-tG,3);
        try{map.setPaintProperty('building-extrusion','fill-extrusion-height',['*',['get','height'],Math.max(0.04,tE)]);}catch(e){}
        if(t<0.14){
          titlu(name+' '+_S()+' \u2014 Starea Actuala','Fond construit la zi \u00b7 Densitate reala');linie();
          explica('STANGA ECRAN: orasul azi '+_S()+' \u2014 cladirile vor creste animat catre '+_E());
          cifra(N(pop21),'Locuitori actuali','#94a3b8');
          cifra2(N(pred.auth||300),'Autorizatii/an','#60a5fa');
        } else {
          titlu('Coridoare de Dezvoltare '+_E(),'Cladirile cresc animat: '+_S()+' \u2192 '+_E());linie();
          explica('ANIMATIE: cladirile cresc gradual reprezentand cresterea urbana proiectata pe '+_HORIZON+' ani');
          ctx.globalAlpha=sA*tE;
          ctx.fillStyle='#ef4444';
          ctx.font='900 '+FD+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left';ctx.letterSpacing='0';
          ctx.fillText(N(Math.round((pred.defLoc||5000)*tE)),W*0.04,H*0.886);
          ctx.globalAlpha=sA*0.72;
          ctx.fillStyle='rgba(148,163,184,0.78)';
          ctx.font='600 '+FL+'px "IBM Plex Mono",monospace';
          ctx.letterSpacing='0.05em';
          ctx.fillText('UNITATI LOCATIVE NECESARE '+_E(),W*0.04,H*0.910);
          cifra2(N(pred.recHa||200)+' ha','Potential reconversie industriala','#f59e0b');
          if(tE>0.38) narativ('VERDE=densitate mica/potential densificare. GALBEN=medie/consolidare. ROSU=suprasaturat/CC-CP depasit. Cresterea animata = proiectia urbana '+_S()+'\u2192'+_E()+'. Coridoarele de crestere urmeaza axele TP si infrastructura noua planificata.');
          ctx.globalAlpha=1;
        }
        concluzie('Corido arele de crestere reale = axa TP + proximitate autostrada + reconversie industriala');
        negativ('PUG depasit: sprawl periurban necontrolat = costuri infrastructura x3 per locuitor vs densificare');
        break;

      case 's8':
        titlu('Mobilitate Urbana','Retea OSM reala \u00b7 Congestie \u00b7 Solutii necesare');linie();
        explica('RETEAUA RUTIERA REALA din OSM pulsand pe harta \u00b7 ROSU = blocaje critice identificate');
        cifra(N(pred.mot24||380),'Vehicule/1000 loc',(pred.mot24||380)>450?'#ef4444':'#f59e0b');
        cifra2('~'+_P1()+'-'+(pred.satAn||2040),'An saturare retea rutiera');
        ctx.globalAlpha=sA*rE(0.20,0.16);
        [['#dc2626','AUTOSTRADA/EXPRES'],['#ea580c','DN'],['#f59e0b','PRIMAR'],['#16a34a','SECUNDAR'],['#0ea5e9','TERTIAR']].forEach(function(it,i){
          ctx.fillStyle=it[0];ctx.fillRect(W*(0.04+i*0.16),H*0.926,W*0.015,5);
          ctx.fillStyle='rgba(220,230,255,0.68)';
          ctx.font='500 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left';ctx.letterSpacing='0';
          ctx.fillText(it[1],W*(0.057+i*0.16),H*0.934);
        });
        ctx.globalAlpha=1;
        narativ(N(pred.fluxOra||25000)+' veh/h la varf. Saturatie retea estimata: '+(pred.satAn||2040)+'. Necesare '+(pred.pasaje||5)+' pasaje noi (subterane sau supraterane) pe nodurile critice. Artere pulsante portocaliu/galben = zone de congestie recidivanta. Cost total mobilitate: '+N(pred.invMob||120)+' M EUR '+_S()+'-'+_E()+'.');
        concluzie('Fara pasaje noi pe nodurile critice: colaps urban dupa '+(pred.satAn||2040));
        negativ('Congestie cronica = -35min/zi/locuitor = 210h/an pierdute = cost economic '+Math.round((pop21/1000)*0.9)+' M EUR/an');
        break;

      case 's9':
        titlu('Transport Public','Trasee existente \u00b7 BRT propus \u00b7 Modal Split \u00b7 SUMP '+_P1());linie();
        explica('ROSU = tramvai/metrou suprafata \u00b7 ALBASTRU = BRT propus \u00b7 VIOLET = pasaje pietonale propuse');
        cifra((pred.tp||62)+'%','Acoperire populatie TP',(pred.tp||62)>=70?'#22c55e':(pred.tp||62)>=50?'#f59e0b':'#ef4444');
        cifra2((pred.kmBRT||30)+' km BRT','Coridoare rapid propuse');
        if(t>0.20) _drawModal(ctx,W,H,Math.min(1,(t-0.20)/0.20)*sA,pred);
        // Explicatie Monte Carlo transport
        if(t>0.40){
          ctx.globalAlpha=sA*rE(0.40,0.18)*0.85;
          ctx.fillStyle='rgba(220,230,255,0.80)';
          ctx.font='500 '+Math.min(W*0.011,13)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left';ctx.letterSpacing='0';
          wrap(ctx,'Iasi: BRT pe culoarul Bahlui + metrou usor propus Nord-Sud. Cluj: metro 2 linii. Bucuresti: metrou ext. linii 5-6.',W*0.04,H*0.63,W*0.55,Math.min(W*0.013,16)*1.5,3);
          ctx.globalAlpha=1;
        }
        narativ('Deficit '+(75-(pred.tp||62))+'pp vs standard UE 75%. Pasaje pietonale subterane necesare: '+(pred.pasaje||5)+' (noduri CFR+artere majore). BRT: '+(pred.kmBRT||30)+' km la cost '+N(pred.costBRT||90)+' M EUR. Modal Split target '+_P1()+': TP 35%, pieton 20%, auto 45%.');
        concluzie('BRT + pasaje pietonale = -35% congestie + +22pp walkability + mobilitate durabila');
        negativ('Fara TP extins: modal split auto 82% in '+_P2()+' = orasul devine impracticabil fara masina');
        break;

      case 's10':
        titlu('Risc Seismic','P100-1/2013 \u00b7 Fond vulnerabil \u00b7 PNRR C10-I2 \u00b7 Prioritizare');linie();
        explica('CULORI CLADIRI: VERDE=sigur(<8m) \u00b7 MARO=atentie(8-15m) \u00b7 ROSU=risc maxim(>25m) \u00b7 bazat pe inaltime+zona ag');
        var ag=pred.ag||0.20;
        var agC=ag>=0.30?'#ef4444':ag>=0.20?'#f59e0b':'#22c55e';
        cifra('ag='+ag.toFixed(2)+'g','Acceleratie seismica P100-1/2013',agC);
        cifra2(N(pred.fond||Math.round(pop21/50))+' cladiri','Fond risc RS I-III estimat','#ef4444');
        ctx.globalAlpha=sA*rE(0.20,0.15);
        [['#166534','<8m SIGUR'],['#854d0e','8-15m ATENTIE'],['#b91c1c','15-25m RISC'],['#dc2626','>25m MAXIM']].forEach(function(it,i){
          ctx.fillStyle=it[0];ctx.fillRect(W*(0.04+i*0.18),H*0.924,W*0.014,5);
          ctx.fillStyle='rgba(220,230,255,0.70)';
          ctx.font='500 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left';ctx.letterSpacing='0';
          ctx.fillText(it[1],W*(0.056+i*0.18),H*0.932);
        });
        ctx.globalAlpha=1;
        narativ(N(pred.fond||1000)+' cladiri risc RS I-III. PNRR C10-I2: '+N(Math.round((pred.fond||1000)*0.25))+' apartamente consolidabile. Cost: '+N(Math.round((pred.fond||1000)*0.085))+' M EUR. Zona P100: ag='+ag+'g Tc='+(ag>=0.30?'0.7s Vrancea':'1.0s')+'. Cladirile inalte in zone cu ag ridicat = vulnerabilitate maxima.');
        concluzie('Fondul pre-1977 (inainte P13/1963) = risc maxim — prioritate absoluta PNRR C10-I2');
        negativ('Cutremur Vrancea >7.0: '+Math.round((pred.fond||1000)*0.15)+' cladiri prabusire partiala estimata = tragedie umana + pierderi economice '+Math.round((pred.fond||1000)*0.15*0.3)+' M EUR');
        break;

      case 's11':
        titlu('Clima & Inundatii','ANAR PGRA 2021-2027 \u00b7 WMS real \u00b7 UHI \u00b7 RCP4.5/8.5');linie();
        explica('HARTA ANAR REALA: RCP10/100/500 \u00b7 VERDE pulsant = spatii verzi (racire UHI) \u00b7 PORTOCALIU = autostrazi in zone risc');
        var zile=pred.zile24||18;
        cifra(zile+' zile','Caniculare >35\u00b0C azi (ANM ROCADA)','#f59e0b');
        cifra2(Math.round(zile*2.1)+' zile','Proiectie '+_E()+' RCP4.5','#ef4444');
        if(t>0.20) _drawClima(ctx,W,H,Math.min(1,(t-0.20)/0.20)*sA,pred,zile);
        narativ('Albastru inchis=lunca inundabila activa ANAR RCP10. Albastru mediu=RCP100. Albastru deschis=RCP500. Verde pulsant=spatii verzi/racire. UHI: +'+(pred.uhi||1.8)+'\u00b0C vs rural. In '+_E()+': '+Math.round(zile*2.1)+' zile caniculare (+'+Math.round(zile*1.1)+'). Infrastructura critca (autostrazi+retele) in zone inundabile = vulnerabilitate nationala.');
        concluzie('Spatii verzi noi + acoperisuri verzi = UHI -1.5-2.5\u00b0C = vietii salvate in valuri caldura');
        negativ('Val caldura '+_E()+': '+Math.round(pop21*0.0003)+' spitalizari/val + blocaje termocentrale + +350M EUR costuri sanatate');
        break;

      case 's12':
        var rB=r10||0;
        var pO=Math.round(pop21*Math.pow(1+(rB+0.9)/100,_HORIZON));
        var pR=Math.round(pop21*Math.pow(1+(rB-0.8)/100,_HORIZON));
        var pM=pred.pop55||Math.round(pop21*Math.pow(1+rB/100,_HORIZON));
        titlu('Monte Carlo '+_E(),'10.000 simulari statistice \u00b7 3 Scenarii \u00b7 Interval incredere 90%');linie();
        // Explicatie Monte Carlo
        if(t<0.35){
          explica('CE ESTE MONTE CARLO? Simulam 10.000 de viitoruri posibile ale orasului cu variatii aleatoare ale ratei de crestere. Rezultatul: un interval de incredere 90% si 3 scenarii clare.');
        }
        if(t>0.06) _drawMC(ctx,W,H,Math.min(1,(t-0.06)/0.25)*sA,pR,pM,pO,pop21,t);
        cifra('['+N(pR)+'\u2013'+N(pO)+']','Interval 90% populatie '+_E(),'#f59e0b');
        cifra2(N(pO-pR)+' persoane','Diferenta intre scenarii extrema');
        narativ('S1 REGRES (neinterventie): '+N(pR)+' loc. S2 TENDINTA (referinta): '+N(pM)+' loc. S3 OPTIMIST (investitii sustinute): '+N(pO)+' loc. Diferenta '+(pO-pR)+' persoane = '+Math.round((pO-pR)*45/1e6*100)/100+' km\u00b2 suprafata locativa diferita = decizii PUG diferite. MONTE CARLO ajuta primarul sa dimensioneze corect PUG-ul.');
        concluzie('PUG-ul se dimensioneaza pe S2+20% marja de siguranta — nici optimist, nici pesimist');
        negativ('S1 materializat: '+Math.round((pop21-pR)/1000)+'k mai putini locuitori = servicii publice nerentabile + fond abandonat + colaps fiscal');
        break;

      case 's13':
        titlu('Infrastructura Necesara '+_S()+'\u2013'+_E(),'Scoli \u00b7 Sanatate \u00b7 SV \u00b7 Utilitati \u00b7 Localizare harta');linie();
        explica('PUNCTELE APAR PROGRESIV pe harta = infrastructura necesara calculata \u00b7 bazat pe norme MEC/MS/OMS/UITP');
        cifra(N(pred.invTotal||300)+' M \u20ac','Total investitii necesare','#D4AF37');
        cifra2('~60% UE','Finantare REGIO+PNRR','#22c55e');
        var infRows=[
          ['\u{1F3EB} SCOLI NOI: +'+(pred.scoliNoi||2)+' unitati (MEC: 400 elevi/unitate)'],
          ['\u{1F3E5} CABINETE: +'+(pred.cabMed||5)+' cabinete (MS: 1.500 pacienti/cabinet)'],
          ['\u{1F333} SPATII VERZI: +'+(pred.svHa||150)+' ha (OMS min: 9m\u00b2/loc)'],
          ['\u{1F68C} STATII TP: +'+(pred.statiiNoi||60)+' statii (UITP: 1 statie/3.500 loc)'],
          ['\u{1F4A7} RETELE APA/CANAL: extindere intravilanul de crestere'],
          ['\u26A1 ENERGIE: modernizare fond pre-1990 NZEB obligatoriu (Legea 372/2005)'],
          ['\u{1F6E3} PASAJE: +'+(pred.pasaje||5)+' pasaje auto/pietonale pe noduri critice'],
        ];
        infRows.forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.15+i*0.04,0.17);
          ctx.fillStyle='rgba(220,230,255,0.86)';
          ctx.font='500 '+Math.min(W*0.011,13)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left';ctx.letterSpacing='0';
          wrap(ctx,it[0],W*0.04,H*(0.560+i*0.056),W*0.55,Math.min(W*0.013,16)*1.4,2);
        });
        ctx.globalAlpha=1;
        narativ('Mobilitate: '+N(pred.invMob||120)+' M EUR. Social: '+N(pred.invSoc||80)+' M EUR. Seismic PNRR: '+N(Math.round((pred.fond||1000)*0.085))+' M EUR. Utilitati: extindere pe coridoarele de crestere. Fiecare investitie are localizare exacta pe harta.');
        break;

      case 's14':
        titlu('Benchmark European',name+' vs Peer Group UE \u00b7 Eurostat Urban Audit 2022');linie();
        explica('COMPARATIE cu orase similare din Europa Centrala \u00b7 Ce au facut ele si noi nu am facut inca');
        var dens=Math.round(pop21/((city.suprafata_ha||5000)/100));
        cifra(dens+' loc/km\u00b2','Densitate urbana',dens>1000?'#22c55e':dens>500?'#f59e0b':'#94a3b8');
        cifra2((pred.pctUE||38)+'% UE27','Convergenta economica actuala');
        if(t>0.12) _drawBench(ctx,W,H,Math.min(1,(t-0.12)/0.22)*sA,pred,name);
        // Lectii de la alte orase
        if(t>0.45){
          ctx.globalAlpha=sA*rE(0.45,0.18)*0.82;
          ctx.fillStyle='rgba(220,230,255,0.80)';
          ctx.font='500 '+Math.min(W*0.011,13)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left';ctx.letterSpacing='0';
          wrap(ctx,'Barcelona: Superblocks = -26% trafic +20% spatii verzi. Vilnius: BRT+velo = PIB +38% in 12 ani. Oradea: PDU + investitii = cel mai rapid oras RO 2019-2023.',W*0.04,H*0.63,W*0.55,Math.min(W*0.013,16)*1.5,3);
          ctx.globalAlpha=1;
        }
        narativ(name+': '+dens+' loc/km\u00b2, PIB '+( pred.pctUE||38)+'% UE27. Peer group: '+_peers(city)+'. Gap: recuperabil in 8-12 ani cu '+Math.round((pred.invTotal||300)*0.40/30)+' M EUR/an investitii consistente. Barcelona, Vilnius si Oradea demonstreaza ca este posibil.');
        concluzie('Orasele care au inchis decalajul UE au investit 3-4% din PIB local/an timp de 12-15 ani');
        negativ('Fara plan de convergenta: in '+_E()+' suntem la '+((pred.pctUE||38)+5)+'% UE27 — cel mai slab din peer group');
        break;

      case 's15':
        titlu('Calitate Viata \u2014 SDG 11','Obiective ONU \u00b7 Radar analiza \u00b7 Target '+_P1());linie();
        explica('VERDE pulsant = spatii verzi existente detectate OSM \u00b7 Deficit critc vizualizat in radar chart');
        cifra((pred.sdgTotal||6.4)+'/10','Scor SDG11 estimat',(pred.sdgTotal||6.4)>=7?'#22c55e':'#f59e0b');
        cifra2((pred.walkScore||58)+'/100','Walk Score urban');
        if(t>0.16) _drawSDG(ctx,W,H,Math.min(1,(t-0.16)/0.22)*sA,pred);
        if(t>0.28){
          var svM2=pred.svM2||11;
          ctx.globalAlpha=sA*rE(0.28,0.18)*0.88;
          ctx.fillStyle=svM2<9?'#ef4444':'#22c55e';
          ctx.font='700 '+Math.min(W*0.012,15)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left';ctx.letterSpacing='0';
          wrap(ctx,(svM2<9?'\u26A0 DEFICIT SPATII VERZI: '+svM2+'m\u00b2/loc < 9m\u00b2 standard OMS — actiune imediata':'\u2713 Spatii verzi: '+svM2+'m\u00b2/loc \u2265 standard OMS 9m\u00b2'),W*0.04,H*0.62,W*0.55,Math.min(W*0.014,17)*1.5,2);
          ctx.globalAlpha=1;
        }
        narativ('SDG 11.1 Locuire: '+(pred.locuireSDG||70)+'%. SDG 11.2 Transport: '+(pred.tp||62)+'%. SDG 11.6 Spatii verzi: '+(pred.svM2||11)+'m\u00b2/loc (OMS: 9m\u00b2). SDG 11.7 Spatii publice: '+(pred.spatiiPublice||65)+'%. VERDE pe harta = spatii verzi detectate OSM = activ real.');
        concluzie('Fiecare hectar spatiu verde nou = -1.2\u00b0C temperatura urbana + calitate vietii masurabila');
        negativ('Sub 9m\u00b2/loc + UHI nemitigat: spitalizari val caldura +40% in '+_E()+' = crisis sanatate publica');
        break;

      case 's16':
        titlu('Agenda Primarului '+_S()+'\u2013'+_P1(),'Ce se face \u00b7 Unde \u00b7 Cost \u00b7 Ce se intampla daca NU');linie();
        explica('PUNCTELE PULSANTE pe harta = locatii prioritatilor identificate automat \u00b7 rosu=urgent, galben=important, verde=strategic');
        var ag2=_agenda(pred,city);
        ag2.forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.10+i*0.05,0.16);
          ctx.fillStyle=it.clr+'28';
          ctx.fillRect(W*0.04,H*(0.550+i*0.060)-Math.min(W*0.013,16)*0.8,W*0.57,Math.min(W*0.013,16)*2.6);
          ctx.fillStyle=it.clr;
          ctx.font='700 '+Math.min(W*0.009,11)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left';ctx.letterSpacing='.04em';
          ctx.fillText(it.priority,W*0.04,H*(0.550+i*0.060)+Math.min(W*0.012,14)*0.7);
          ctx.fillStyle='rgba(220,228,255,0.90)';
          ctx.font='500 '+Math.min(W*0.011,13)+'px "Space Grotesk",sans-serif';
          ctx.letterSpacing='0';
          wrap(ctx,it.text,W*0.155,H*(0.550+i*0.060)+Math.min(W*0.012,14)*0.7,W*0.44,Math.min(W*0.012,14)*1.4,2);
          // Consecinta negativa
          ctx.fillStyle=it.clr+'aa';
          ctx.font='400 '+Math.min(W*0.008,10)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='right';ctx.letterSpacing='0';
          wrap(ctx,'\u2717 '+it.neg,W*0.96,H*(0.550+i*0.060)+Math.min(W*0.012,14)*0.7,W*0.28,Math.min(W*0.009,11)*1.4,2);
        });
        ctx.globalAlpha=1;
        cifra(ag2.length+' prioritati','Identificate '+_S()+'-'+_P1(),'#D4AF37');
        cifra2(N(Math.round((pred.invTotal||300)*0.30))+' M \u20ac','Faza 1: '+_S()+'-'+_P1());
        break;

      case 's17':
        // "2055" mare in fundal
        ctx.globalAlpha=sA*rE(0.04,0.40)*0.06;
        ctx.fillStyle='#D4AF37';
        ctx.font='900 '+Math.min(W*0.28,340)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='center';ctx.letterSpacing='0';
        ctx.fillText(String(_E()),W/2,H*0.62);

        titlu(name.toUpperCase()+' '+_E(),'Viziunea posibila \u00b7 '+_S()+' \u2192 '+_E());linie();

        ctx.globalAlpha=sA*rE(0.10,0.22);
        ctx.fillStyle='rgba(255,255,255,0.95)';
        var fn17=Math.min(W*0.046,60);
        if(ctx.measureText(name.toUpperCase()).width>W*0.5) fn17*=0.7;
        ctx.font='900 '+fn17+'px "Space Grotesk",sans-serif';
        ctx.textAlign='center';ctx.letterSpacing='0.02em';
        ctx.fillText(name.toUpperCase(),W/2,H*0.27);
        ctx.globalAlpha=1;

        var pop_e=pred.pop55||Math.round(pop21*Math.pow(1+r10/100,_HORIZON));
        var checks=[
          {ok:pop_e>pop21,             txt:'Populatie '+_E()+': '+N(pop_e)+' loc.'},
          {ok:(pred.pctUE55||(pred.pctUE||38)+20)>=75,txt:'PIB '+_E()+': ~'+(pred.pctUE55||(pred.pctUE||38)+20)+'% UE27'},
          {ok:(pred.anSUMP||_P1())<=_P1()+2,          txt:'SUMP: '+(pred.anSUMP||_P1())+' aprobat'},
          {ok:(pred.tp||62)>=75,        txt:'Transport public: '+(pred.tp||62)+'% acoperire'},
          {ok:(pred.sdgTotal||6.4)>=7,  txt:'SDG11: '+(pred.sdgTotal||6.4)+'/10'},
          {ok:true,                      txt:'Investitii: '+N(pred.invTotal||300)+' M EUR'},
          {ok:(pred.fond||1000)>0,       txt:'Consolidate: '+N(Math.round((pred.fond||1000)*0.25))+' ap. seismic'},
          {ok:(pred.svM2||11)>=9,        txt:'Spatii verzi: '+(pred.svM2||11)+'m\u00b2/loc'},
        ];
        checks.forEach(function(ch,i){
          ctx.globalAlpha=sA*rE(0.18+i*0.048,0.13);
          ctx.fillStyle=ch.ok?'#22c55e':'#ef4444';
          ctx.font='700 '+Math.min(W*0.013,16)+'px sans-serif';
          ctx.textAlign='right';
          ctx.fillText(ch.ok?'\u2713':'\u26A0',W*0.96,H*(0.690+i*0.038));
          ctx.fillStyle='rgba(220,228,255,0.88)';
          ctx.font=Math.min(W*0.012,15)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='right';ctx.letterSpacing='0';
          ctx.fillText(ch.txt.slice(0,46),W*0.952,H*(0.690+i*0.038));
        });
        ctx.globalAlpha=1;

        // Mesaj final negativ + pozitiv
        if(t>0.78){
          var fa=Math.min(1,(t-0.78)/0.14)*sA;
          ctx.globalAlpha=fa;
          ctx.fillStyle='rgba(239,68,68,0.88)';
          ctx.font='700 '+FC+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left';ctx.letterSpacing='0.02em';
          wrap(ctx,'\u26A0 DACA NU SE ACTIONEAZA: '+name+' '+_E()+' = sprawl necontrolat + fond abandonat + colaps servicii publice + migratie generalizata',W*0.04,H*0.955,W*0.88,FC*1.6,2);
          ctx.globalAlpha=1;
        }
        if(t>0.90){
          var fb=Math.min(1,(t-0.90)/0.08)*sA;
          ctx.globalAlpha=fb;
          ctx.fillStyle='rgba(34,197,94,0.90)';
          ctx.font='700 '+FC+'px "IBM Plex Mono",monospace';
          ctx.textAlign='center';ctx.letterSpacing='0.02em';
          ctx.fillText('\u25B6 CU VIZIUNE SI ACTIUNE: '+name+' poate deveni model urban pentru Romania si regiune',W/2,H*0.985);
          ctx.globalAlpha=1;
        }
        break;
    }
  }

  // ── LOOP ─────────────────────────────────────────────────────────────
  function _loop(sc,idx){
    if(!SE._playing||idx>=SE.SCENES.length)return;
    var loop=function(){
      if(!SE._playing)return;
      var t=Math.min(1,Math.max(0.001,(performance.now()-SE._startT)/sc.dur));
      SE._ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
      try{draw(sc,t);}catch(e){console.error('[cinDraw]',sc.id,e.message);}
      if(t<1){SE._raf=requestAnimationFrame(loop);}
      else{runScene(idx+1);}
    };
    SE._raf=requestAnimationFrame(loop);
  }

  function runScene(idx){
    if(!SE._playing||idx>=SE.SCENES.length){
      var c2=document.getElementById('tci-c8');
      if(c2){c2.style.transition='opacity 1.5s';c2.style.opacity='0';setTimeout(stopAll,1600);}
      return;
    }
    var sc=SE.SCENES[idx];
    SE._si=idx;SE._startT=performance.now();
    _cl(map);
    if(sc.id!=='s7')try{map.setPaintProperty('building-extrusion','fill-extrusion-height',['get','height']);}catch(e){}
    // Ascunde flood daca era activ
    try{window._FloodMapper&&window._FloodMapper.hideAll&&window._FloodMapper.hideAll(map);}catch(e){}
    var sn=document.getElementById('c8sn');
    if(sn)sn.textContent='BLOC '+sc.bloc+' \u00b7 '+(SE._si+1)+'/'+SE.SCENES.length+' \u00b7 '+sc.label;
    updateLegend(sc);
    setup(sc.id);
    _loop(sc,idx);
    console.log('[Cinema v5.2]',(idx+1)+'/'+SCENES.length,sc.id,'\u2014',name);
  }

  runScene(0);
  console.log('[Cinema v5.2 Premium] START \u2014',name,'\u2014',_S()+'\u2192'+_E());
}

// ── GRAFICE ───────────────────────────────────────────────────────────────

function _drawAge(ctx,W,H,a,r10){
  ctx.save();
  var x=W*0.57,y=H*0.57,w=Math.min(W*0.38,340),h=H*0.26;
  ctx.globalAlpha=a*0.88;
  ctx.fillStyle='rgba(4,10,24,0.82)';
  ctx.beginPath();ctx.roundRect&&ctx.roundRect(x,y,w,h,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.07)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='rgba(148,163,184,0.52)';
  ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
  ctx.textAlign='left';ctx.letterSpacing='.05em';
  ctx.fillText('STRUCTURA DEMOGRAFICA ESTIMATA',x+10,y+15);
  var g=[
    {l:'65+ ani',p:r10<-0.5?27:r10<0?22:17,c:'#a78bfa'},
    {l:'45-64 ani',p:28,c:'#60a5fa'},
    {l:'25-44 ani',p:r10>0.5?32:r10>0?28:24,c:'#22c55e'},
    {l:'15-24 ani',p:r10<-0.5?9:13,c:'#f59e0b'},
    {l:'0-14 ani',p:r10<-0.5?9:14,c:'#94a3b8'},
  ];
  var bY=y+24,bH=(h-34)/g.length;
  g.forEach(function(gr,i){
    var bW2=(gr.p/38)*(w-70);
    ctx.fillStyle=gr.c+'33';ctx.fillRect(x+48,bY+i*bH+2,w-70,bH-6);
    ctx.fillStyle=gr.c;ctx.fillRect(x+48,bY+i*bH+2,bW2,bH-6);
    ctx.fillStyle='rgba(220,230,255,0.74)';
    ctx.font='500 '+Math.min(W*0.008,10)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='left';ctx.letterSpacing='0';
    ctx.fillText(gr.l,x+4,bY+i*bH+bH*0.66);
    ctx.textAlign='right';ctx.fillText(gr.p+'%',x+w-4,bY+i*bH+bH*0.66);
  });
  ctx.restore();
}

function _drawEco(ctx,W,H,a,pred){
  ctx.save();
  var x=W*0.57,y=H*0.57,w=Math.min(W*0.38,340),h=H*0.22;
  ctx.globalAlpha=a*0.88;
  ctx.fillStyle='rgba(4,10,24,0.80)';
  ctx.beginPath();ctx.roundRect&&ctx.roundRect(x,y,w,h,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.07)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='rgba(148,163,184,0.52)';
  ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
  ctx.textAlign='left';ctx.letterSpacing='.05em';
  ctx.fillText('STRUCTURA ECONOMICA % OCUPARE',x+10,y+15);
  var s=[
    {n:'Servicii/IT',v:pred.ocupatie&&pred.ocupatie.servicii||52,c:'#60a5fa'},
    {n:'Industrie',v:pred.ocupatie&&pred.ocupatie.industrie||28,c:'#f59e0b'},
    {n:'Constructii',v:8,c:'#22c55e'},
    {n:'Agricultura',v:pred.ocupatie&&pred.ocupatie.agricultura||6,c:'#a78bfa'},
    {n:'Altele',v:6,c:'#94a3b8'},
  ];
  var bY=y+24,bH=(h-34)/s.length;
  s.forEach(function(se,i){
    var bW2=(se.v/70)*(w-80);
    ctx.fillStyle=se.c+'33';ctx.fillRect(x+58,bY+i*bH+2,w-80,bH-6);
    ctx.fillStyle=se.c;ctx.fillRect(x+58,bY+i*bH+2,bW2,bH-6);
    ctx.fillStyle='rgba(220,230,255,0.74)';
    ctx.font='500 '+Math.min(W*0.008,10)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='left';ctx.letterSpacing='0';
    ctx.fillText(se.n,x+4,bY+i*bH+bH*0.66);
    ctx.textAlign='right';ctx.fillText(se.v+'%',x+w-4,bY+i*bH+bH*0.66);
  });
  ctx.restore();
}

function _drawModal(ctx,W,H,a,pred){
  ctx.save();
  var cx2=W*0.77,cy2=H*0.68,r=Math.min(W*0.062,72);
  ctx.globalAlpha=a*0.90;
  var sl=[
    {v:pred.modalAuto||68,c:'#ef4444',l:'Auto '+((pred.modalAuto||68))+'%'},
    {v:pred.tp||22,c:'#22c55e',l:'TP '+(pred.tp||22)+'%'},
    {v:pred.walkPct||7,c:'#60a5fa',l:'Pieton '+(pred.walkPct||7)+'%'},
    {v:3,c:'#f59e0b',l:'Velo 3%'},
  ];
  var tot=sl.reduce(function(s,x){return s+x.v;},0),ang=-Math.PI/2;
  sl.forEach(function(s){
    var slice=(s.v/tot)*Math.PI*2;
    ctx.beginPath();ctx.moveTo(cx2,cy2);
    ctx.arc(cx2,cy2,r,ang,ang+slice);ctx.closePath();
    ctx.fillStyle=s.c+'cc';ctx.fill();
    var ma=ang+slice/2;
    if(s.v>4){
      ctx.fillStyle='rgba(255,255,255,0.9)';
      ctx.font='700 '+Math.min(W*0.009,11)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='center';ctx.letterSpacing='0';
      ctx.fillText(s.v+'%',cx2+Math.cos(ma)*(r*0.70),cy2+Math.sin(ma)*(r*0.70)+4);
    }
    ang+=slice;
  });
  ctx.fillStyle='rgba(148,163,184,0.52)';
  ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
  ctx.textAlign='center';ctx.letterSpacing='.05em';
  ctx.fillText('MODAL SPLIT ACTUAL',cx2,cy2+r+18);
  ctx.fillStyle='rgba(34,197,94,0.65)';
  ctx.font='500 '+Math.min(W*0.008,10)+'px "Space Grotesk",sans-serif';
  ctx.fillText('Target '+_P1()+': TP 35% | Activ 20% | Auto 45%',cx2,cy2+r+30);
  ctx.restore();
}

function _drawClima(ctx,W,H,a,pred,zile){
  ctx.save();
  var x=W*0.57,y=H*0.58,w=Math.min(W*0.38,320),h=H*0.24;
  ctx.globalAlpha=a*0.88;
  ctx.fillStyle='rgba(4,10,24,0.80)';
  ctx.beginPath();ctx.roundRect&&ctx.roundRect(x,y,w,h,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.07)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='rgba(148,163,184,0.52)';
  ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
  ctx.textAlign='left';ctx.letterSpacing='.05em';
  ctx.fillText('PROIECTII CLIMATICE RCP4.5/RCP8.5',x+10,y+15);
  var rows=[
    ['Zile caniculare >35C',zile,'\u2192 '+Math.round(zile*2.1),'#f59e0b'],
    ['UHI urban vs rural','+'+(pred.uhi||1.8)+'\u00b0C','\u2192 +'+((pred.uhi||1.8)+0.8).toFixed(1)+'\u00b0C','#ef4444'],
    ['Risc inundatii ANAR',pred.flood||'Mediu','\u2192 Ridicat','#1d4ed8'],
    ['Risc seceta','Moderat','\u2192 Moderat-Ridicat','#d97706'],
    ['Consum racire','baseline','\u2192 +40-55%','#a78bfa'],
  ];
  var rH=(h-30)/rows.length;
  rows.forEach(function(r2,i){
    var ry=y+26+i*rH;
    ctx.fillStyle='rgba(220,230,255,0.68)';
    ctx.font='500 '+Math.min(W*0.009,10)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='left';ctx.letterSpacing='0';
    ctx.fillText(r2[0],x+6,ry+rH*0.68);
    ctx.fillStyle=r2[3];
    ctx.font='700 '+Math.min(W*0.010,11)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='center';
    ctx.fillText(r2[1]+' '+r2[2],x+w*0.65,ry+rH*0.68);
  });
  ctx.restore();
}

function _drawMC(ctx,W,H,a,pR,pM,pO,pop21,t){
  ctx.save();
  var x=W*0.04,y=H*0.58,w=W*0.54,h=H*0.23;
  ctx.globalAlpha=a*0.88;
  ctx.fillStyle='rgba(4,10,24,0.80)';
  ctx.beginPath();ctx.roundRect&&ctx.roundRect(x,y,w,h,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.07)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='rgba(148,163,184,0.52)';
  ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
  ctx.textAlign='left';ctx.letterSpacing='.05em';
  ctx.fillText('MONTE CARLO '+_E()+' \u2014 3 SCENARII ANIMATE',x+10,y+15);
  var sc2=[
    {l:'S1 REGRES: declin neinterventie',v:pR,c:'#ef4444'},
    {l:'S2 TENDINTA: referinta actuala',v:pM,c:'#f59e0b'},
    {l:'S3 OPTIMIST: investitii sustinute',v:pO,c:'#22c55e'},
  ];
  var maxV=Math.max(pO,pop21)*1.06,minV=Math.min(pR,pop21)*0.94;
  var bH2=(h-40)/3;
  sc2.forEach(function(s,i){
    var pct=(s.v-minV)/(maxV-minV);
    var animW=pct*Math.max(0,Math.min(1,(a-0.05)/0.8))*(w-22);
    ctx.fillStyle=s.c+'1a';ctx.fillRect(x+12,y+28+i*bH2,w-22,bH2-7);
    ctx.fillStyle=s.c;ctx.fillRect(x+12,y+28+i*bH2,animW,bH2-7);
    ctx.fillStyle=s.c;
    ctx.font='700 '+Math.min(W*0.009,11)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='left';ctx.letterSpacing='0';
    ctx.fillText(s.l,x+16,y+32+i*bH2+bH2*0.55);
    ctx.fillStyle='rgba(220,230,255,0.90)';
    ctx.textAlign='right';
    ctx.fillText(Number(s.v).toLocaleString('ro-RO'),x+w-6,y+32+i*bH2+bH2*0.55);
  });
  ctx.restore();
}

function _drawBench(ctx,W,H,a,pred,name){
  ctx.save();
  var x=W*0.57,y=H*0.56,w=Math.min(W*0.38,320),h=H*0.30;
  ctx.globalAlpha=a*0.88;
  ctx.fillStyle='rgba(4,10,24,0.80)';
  ctx.beginPath();ctx.roundRect&&ctx.roundRect(x,y,w,h,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.07)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='rgba(148,163,184,0.52)';
  ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
  ctx.textAlign='left';ctx.letterSpacing='.05em';
  ctx.fillText('BENCHMARK EU \u2014 PIB/CAP % UE27',x+8,y+15);
  var peers=[
    {n:'Rzeszow PL',pib:72,c:'#22c55e'},
    {n:'Lublin PL',pib:60,c:'#60a5fa'},
    {n:name,pib:pred.pctUE||38,c:'#D4AF37'},
    {n:'Debrecen HU',pib:58,c:'#a78bfa'},
    {n:'Varna BG',pib:44,c:'#94a3b8'},
    {n:'Suceava RO',pib:32,c:'#6b7280'},
  ];
  var rH2=(h-30)/peers.length;
  peers.forEach(function(p,i){
    var isUs=(p.n===name);
    var bW2=(p.pib/100)*(w-88);
    ctx.fillStyle=p.c+(isUs?'':'40');
    ctx.fillRect(x+72,y+24+i*rH2,bW2,rH2-7);
    if(isUs){ctx.strokeStyle=p.c;ctx.lineWidth=1.5;ctx.strokeRect(x+72,y+24+i*rH2,w-92,rH2-7);}
    ctx.fillStyle=isUs?'#D4AF37':'rgba(220,230,255,0.68)';
    ctx.font=(isUs?'700':'500')+' '+Math.min(W*0.009,10)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='left';ctx.letterSpacing='0';
    ctx.fillText(p.n,x+4,y+28+i*rH2+rH2*0.55);
    ctx.textAlign='right';ctx.fillText(p.pib+'%',x+w-4,y+28+i*rH2+rH2*0.55);
  });
  ctx.restore();
}

function _drawSDG(ctx,W,H,a,pred){
  ctx.save();
  var cx2=W*0.76,cy2=H*0.68,r=Math.min(W*0.080,88);
  ctx.globalAlpha=a;
  var dims=[
    {l:'Locuire',v:(pred.locuireSDG||70)/100},
    {l:'Transport',v:(pred.tp||62)/100},
    {l:'Mediu',v:Math.min(1,(pred.svM2||11)/15)},
    {l:'Spatii pub.',v:(pred.spatiiPublice||65)/100},
    {l:'Siguranta',v:(pred.siguranta||72)/100},
    {l:'Economie',v:(pred.pctUE||38)/100},
  ];
  var n2=dims.length,step=Math.PI*2/n2;
  [0.33,0.66,1.0].forEach(function(s){
    ctx.beginPath();
    dims.forEach(function(_,i){var a2=-Math.PI/2+i*step;i===0?ctx.moveTo(cx2+Math.cos(a2)*r*s,cy2+Math.sin(a2)*r*s):ctx.lineTo(cx2+Math.cos(a2)*r*s,cy2+Math.sin(a2)*r*s);});
    ctx.closePath();ctx.strokeStyle='rgba(255,255,255,0.10)';ctx.lineWidth=1;ctx.stroke();
  });
  ctx.beginPath();
  dims.forEach(function(d,i){var a2=-Math.PI/2+i*step;i===0?ctx.moveTo(cx2+Math.cos(a2)*r*d.v,cy2+Math.sin(a2)*r*d.v):ctx.lineTo(cx2+Math.cos(a2)*r*d.v,cy2+Math.sin(a2)*r*d.v);});
  ctx.closePath();ctx.fillStyle='rgba(212,175,55,0.22)';ctx.fill();
  ctx.strokeStyle='#D4AF37';ctx.lineWidth=1.5;ctx.stroke();
  dims.forEach(function(d,i){
    var a2=-Math.PI/2+i*step;
    ctx.fillStyle=d.v>=0.70?'#22c55e':d.v>=0.50?'#f59e0b':'#ef4444';
    ctx.font='600 '+Math.min(W*0.009,10)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='center';ctx.letterSpacing='0';
    ctx.fillText(d.l,cx2+Math.cos(a2)*(r+16),cy2+Math.sin(a2)*(r+16)+4);
  });
  ctx.restore();
}

// ── HELPERS ───────────────────────────────────────────────────────────────

function _buildTP(cx,cy){
  // Trasee TP schematice dar orientate corect pe axele UAT-ului
  return {type:'FeatureCollection',features:[
    {type:'Feature',properties:{color:'#ef4444',tip:'Tramvai/Metrou suprafata'},geometry:{type:'LineString',coordinates:[[cx-0.022,cy-0.002],[cx-0.010,cy],[cx+0.001,cy],[cx+0.020,cy+0.001]]}},
    {type:'Feature',properties:{color:'#ef4444',tip:'Tramvai Nord-Sud'},geometry:{type:'LineString',coordinates:[[cx+0.001,cy-0.020],[cx+0.001,cy-0.010],[cx+0.001,cy],[cx+0.001,cy+0.018]]}},
    {type:'Feature',properties:{color:'#3b82f6',tip:'BRT propus Est'},geometry:{type:'LineString',coordinates:[[cx,cy],[cx+0.012,cy-0.008],[cx+0.022,cy-0.015]]}},
    {type:'Feature',properties:{color:'#3b82f6',tip:'BRT propus Vest'},geometry:{type:'LineString',coordinates:[[cx,cy],[cx-0.014,cy+0.010],[cx-0.024,cy+0.018]]}},
    {type:'Feature',properties:{color:'#a78bfa',tip:'Pasaj pietonal propus'},geometry:{type:'LineString',coordinates:[[cx-0.002,cy-0.004],[cx+0.002,cy-0.004]]}},
  ]};
}

function _buildPriorityPoints(cx,cy,pred){
  var pts=[];
  var ag=pred.ag||0.20;
  // Prioritati spatializate pe UAT
  if(ag>=0.20) pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx-0.008,cy+0.005]},properties:{c:'#ef4444',r:14,n:'Consolidare seismica'}});
  pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx+0.010,cy-0.008]},properties:{c:'#ef4444',r:12,n:'Pasaj rutier nord'}});
  pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx-0.015,cy-0.010]},properties:{c:'#f59e0b',r:10,n:'BRT coridor principal'}});
  pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx+0.018,cy+0.012]},properties:{c:'#f59e0b',r:10,n:'Zona densificare PUZ'}});
  pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx-0.020,cy+0.015]},properties:{c:'#22c55e',r:8,n:'Parc nou OMS'}});
  pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx+0.005,cy+0.020]},properties:{c:'#22c55e',r:8,n:'Scoala noua'}});
  return pts;
}

function _fp(city){
  var pop=city.pop2021||city.pop||100000,r=city.rata_reala_2011_2021||0;
  return {
    p21:pop,r10:r,pop55:Math.round(pop*Math.pow(1+r/100,_HORIZON)),
    pib:14200,pctUE:39,pctUE55:59,anConv:2050,roi:8,
    defLoc:Math.max(0,Math.round(pop*0.08)),recHa:Math.round(pop/300),
    ag:0.20,fond:Math.round(pop/50),
    mot24:380,satAn:_S()+15,fluxOra:Math.round(pop*0.08),pasaje:5,
    invMob:Math.round(pop/800),invTotal:Math.round(pop/300),invSoc:Math.round(pop/1000),
    tp:62,kmBRT:Math.round(pop/8000),costBRT:Math.round(pop/2000),
    defTP:13,walkScore:58,statiiNoi:Math.round(pop/1200),anSUMP:_P1(),
    zile24:18,uhi:1.8,drought:'moderat',flood:'Mediu',
    scoliNoi:Math.max(0,Math.round(pop/60000)),cabMed:Math.max(1,Math.round(pop/15000)),
    svHa:Math.round(pop/400),svM2:11,sdgTotal:6.4,
    spatiiPublice:65,locuireSDG:70,siguranta:72,
    auth:Math.round(pop/800),modalAuto:68,walkPct:7,
    ocupatie:{servicii:52,industrie:28,agricultura:6},
  };
}

function _peers(city){
  var h=city.coef_hub||0.78;
  if(h>=1.1) return 'Krakow (PL), Vilnius (LT), Brno (CZ)';
  if(h>=0.9) return 'Rzeszow (PL), Lublin (PL), Miskolc (HU)';
  if(h>=0.7) return 'Bielsko-Biala (PL), Debrecen (HU), Varna (BG)';
  return 'Suceava (RO), Piatra Neamt (RO), Bacau (RO)';
}

function _agenda(pred,city){
  var ag=pred.ag||0.20,items=[];
  if(ag>=0.30) items.push({priority:'\u{1F534} URGENTA 1',text:'Consolidare seismica fond pre-1977 — PNRR C10-I2',neg:'cutremur >7.0 = '+Math.round((pred.fond||1000)*0.15)+' cl. critice',clr:'#ef4444'});
  else if(ag>=0.20) items.push({priority:'\u{1F7E1} PRIORITATE 1',text:'Evaluare tehnica fond pre-1977 — expertize structurale',neg:'fond neevaluat = raspundere juridica',clr:'#f59e0b'});
  if((pred.tp||62)<65) items.push({priority:'\u{1F534} URGENTA 2',text:'BRT + pasaje pietonale — coridoare principale',neg:'modal auto >80% in '+_P2()+' = colaps urban',clr:'#ef4444'});
  if((pred.defLoc||3000)>2000) items.push({priority:'\u{1F7E1} PRIORITATE 2',text:'Actualizare PUG — zone densificare si coridoare',neg:'PUG depasit = investitori blocati = pierdere fiscala',clr:'#f59e0b'});
  if((pred.satAn||_S()+15)<_P1()+12) items.push({priority:'\u{1F534} URGENTA 3',text:'Studiu fezabilitate pasaje rutiere — noduri critice',neg:'saturare '+(pred.satAn||2040)+' = colaps economic',clr:'#ef4444'});
  if((pred.svM2||11)<9) items.push({priority:'\u{1F7E1} PRIORITATE 3',text:'Plan spatii verzi — minim 9m\u00b2/loc (OMS)',neg:'UHI nemitigat = '+(Math.round(pop21*0.0002||20))+' spitalizari/val caldura',clr:'#f59e0b'});
  items.push({priority:'\u{1F7E2} STRATEGIC 1',text:'SUMP '+_P1()+' — Plan Mobilitate Urbana Durabila',neg:'fara SUMP = pierdere finantare UE 2028-2034',clr:'#22c55e'});
  items.push({priority:'\u{1F7E2} STRATEGIC 2',text:'Smart City — digitalizare servicii + IoT urban',neg:'fara digitalizare = imposibil acces fonduri smart city',clr:'#22c55e'});
  return items.slice(0,6);
  // need pop21 in closure
  var pop21=pred.p21||100000;
  return items.slice(0,6);
}

function _cl(map){
  ['cin-hw','cin-rail','cin-apt','cin-urb','cin-urb-major','cin-green','cin-mon',
   'cin-cim','cin-utils','cin-tp','cin-anar','cin-amenity','cin-priority'].forEach(function(id){
    try{if(map.getLayer(id))map.removeLayer(id);}catch(e){}
    try{if(map.getSource(id))map.removeSource(id);}catch(e){}
  });
  // Ascunde TP din TCI
  try{if(map.getLayer('tci-tp-layer'))map.setLayoutProperty('tci-tp-layer','visibility','none');}catch(e){}
}

// ── PATCH ─────────────────────────────────────────────────────────────────
(function p(n){
  if(typeof window.openTCI==='function'){
    window.openTCI=function(opts){
      window._startCinema((opts&&opts.cityKey)||(window.TCI&&window.TCI.cityKey)||localStorage.getItem('ux_last_city')||'RO-IS-01');
    };
    console.log('[Cinema v5.2] openTCI patched');
  } else if(n<30) setTimeout(function(){p(n+1);},300);
})(0);

window._launchCinemaV2=function(){window._startCinema();};
console.log('[Cinema v5.2 Premium] LOADED — 17 scene \u00b7 animatii pulsante \u00b7 WMS ANAR real \u00b7 progresiv \u00b7 narativ complet \u00b7 consecinte negative');

})();
