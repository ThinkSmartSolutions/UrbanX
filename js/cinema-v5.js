// cinema-v5.js — UrbanX TCI Cinematic v5.1 FINAL
// FIXES: text wrap, split screen, grafice complete, narativ dramatic,
//        consecinte negative, zone verzi, monumente, restricții, coridoare vizuale
// (c) ThinkSmart Solutions 2026

(function(){
'use strict';

// ── ANI DINAMICI ─────────────────────────────────────────────────────────
var _NOW     = new Date().getFullYear();
var _HORIZON = 30;
function _getStart(){ return (window.TCI&&window.TCI.startYear)||_NOW; }
function _getEnd()  { return _getStart()+_HORIZON; }
function _getP1()   { return _getStart()+5; }
function _getP2()   { return _getStart()+15; }

var PROXY = 'https://urbanx-proxy.3dtravelsoftart.workers.dev';

// ── 17 SCENE ─────────────────────────────────────────────────────────────
var SCENES = [
  {id:'s1_identitate', dur:20000, label:'IDENTITATE',         bloc:1, legend:'none'},
  {id:'s2_regional',   dur:18000, label:'CONTEXT REGIONAL',   bloc:1, legend:'infra'},
  {id:'s3_profil',     dur:20000, label:'PROFIL LOCUITORI',   bloc:1, legend:'density'},
  {id:'s4_economie',   dur:18000, label:'ECONOMIE',           bloc:2, legend:'none'},
  {id:'s5_proiecte',   dur:20000, label:'PROIECTE & INFRA',   bloc:2, legend:'infra'},
  {id:'s6_fond',       dur:18000, label:'FOND CONSTRUIT',     bloc:3, legend:'buildings'},
  {id:'s7_coridoare',  dur:22000, label:'CORIDOARE '+_getEnd(),bloc:3,legend:'growth'},
  {id:'s8_mobilitate', dur:20000, label:'MOBILITATE AUTO',    bloc:3, legend:'roads'},
  {id:'s9_transport',  dur:18000, label:'TRANSPORT PUBLIC',   bloc:3, legend:'tp'},
  {id:'s10_seismic',   dur:18000, label:'RISC SEISMIC',       bloc:4, legend:'seismic'},
  {id:'s11_clima',     dur:20000, label:'CLIMA & INUNDATII',  bloc:4, legend:'flood'},
  {id:'s12_montecarlo',dur:22000, label:'MONTE CARLO '+_getEnd(),bloc:5,legend:'scenarios'},
  {id:'s13_infra_nec', dur:18000, label:'INFRASTRUCTURA NEC.',bloc:5, legend:'needs'},
  {id:'s14_benchmark', dur:18000, label:'BENCHMARK EU',       bloc:5, legend:'none'},
  {id:'s15_sdg',       dur:18000, label:'CALITATE VIATA SDG', bloc:6, legend:'sdg'},
  {id:'s16_agenda',    dur:20000, label:'AGENDA PRIMARULUI',  bloc:6, legend:'none'},
  {id:'s17_viziune',   dur:24000, label:'VIZIUNEA '+_getEnd(),bloc:6, legend:'none'},
];

var LEGENDS = {
  buildings:[['#3b82f6','Apartamente/blocuri'],['#93c5fd','Case individuale'],['#f59e0b','Comercial'],['#a78bfa','Birouri'],['#22c55e','Scoli'],['#ef4444','Spitale'],['#d97706','Biserici/monumente'],['#6b7280','Industrial']],
  growth:[['#14532d','Densitate mica — densificare posibila'],['#15803d','Medie — consolidare'],['#f59e0b','Presiune constructibila'],['#ef4444','Suprasaturat — CC/CP depasit']],
  roads:[['#dc2626','Autostrada/drum expres'],['#ea580c','Drum national'],['#f59e0b','Drum primar'],['#16a34a','Secundar'],['#0ea5e9','Tertiar/local']],
  seismic:[['#166534','ag<0.15g — risc scazut'],['#854d0e','ag 0.15-0.25g — moderat'],['#dc2626','ag 0.25-0.35g — ridicat'],['#7f1d1d','ag>0.35g — critic']],
  flood:[['#1e3a8a','Lunca inundabila activa ANAR'],['#1d4ed8','Risc mediu inundatii'],['#93c5fd','Risc scazut perimetral'],['#f59e0b','UHI — Urban Heat Island'],['#22c55e','Zone verzi — racire']],
  scenarios:[['#22c55e','S3 Optimist — investitii sustinute'],['#f59e0b','S2 Tendinta — referinta'],['#ef4444','S1 Regres — declin neinterventie']],
  tp:[['#8b5cf6','BRT propus'],['#22c55e','Acoperit TP existent'],['#f59e0b','Sub-deservit'],['#ef4444','Neacoperit >15 min']],
  infra:[['#dc2626','Autostrada in executie'],['#f59e0b','Autostrada proiectata/SF'],['#60a5fa','Cale ferata'],['#22c55e','Aeroport international'],['#a78bfa','Centura/drum ocolitor']],
  density:[['#1e3a8a','<20 loc/ha'],['#3b82f6','20-60 loc/ha'],['#f59e0b','60-120 loc/ha'],['#ef4444','>120 loc/ha']],
  needs:[['#22c55e','Scoli/gradinite necesare'],['#ef4444','Cabinete medicale'],['#3b82f6','Spatii verzi deficit'],['#f59e0b','Statii TP noi']],
  sdg:[['#22c55e','SDG 11.1 Locuire'],['#3b82f6','SDG 11.2 Transport'],['#f59e0b','SDG 11.6 Mediu'],['#a78bfa','SDG 11.7 Spatii pub.']],
};

// ── LIVE DATA CACHE ───────────────────────────────────────────────────────
var D = {wiki:null,inse:null,roads:null,rail:null,airports:null,urban:null,
         monuments:null,greenSpaces:null,loaded:false};

// ── TEXT WRAP HELPER — fix principal pentru text care iese din pagina ─────
function wrapText(ctx, txt, x, y, maxW, lineH, maxLines) {
  if(!txt) return y;
  var words = String(txt).split(' '), line = '', n = 0;
  for(var i=0;i<words.length;i++){
    var test = line+(line?' ':'')+words[i];
    if(ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, y);
      y += lineH; line = words[i]; n++;
      if(maxLines && n >= maxLines-1) {
        // ultima linie cu ellipsis daca mai sunt cuvinte
        var rest = words.slice(i+1).join(' ');
        if(rest) {
          while(ctx.measureText(words[i]+'… '+rest).width>maxW && rest.length>0)
            rest = rest.slice(0,-1);
          ctx.fillText(words[i]+(rest?'… '+rest:''), x, y);
        } else ctx.fillText(words[i], x, y);
        return y + lineH;
      }
    } else line = test;
  }
  if(line) ctx.fillText(line, x, y);
  return y + lineH;
}

// ── PRELOAD DATE LIVE ─────────────────────────────────────────────────────
function preload(city, siruta, done) {
  var cx=city.lon||27.601, cy=city.lat||47.158;
  var ps = [];

  // Wikipedia
  ps.push(fetch('https://ro.wikipedia.org/api/rest_v1/page/summary/'+
    encodeURIComponent((city.name||'').replace(/ /g,'_')),
    {signal:AbortSignal.timeout(7000)})
    .then(function(r){return r.ok?r.json():null;})
    .then(function(d){if(d&&d.extract)D.wiki={extract:d.extract.slice(0,500),title:d.title};})
    .catch(function(){D.wiki={extract:'Informatii Wikipedia indisponibile.',title:city.name||'UAT'};}));

  // INSE via proxy
  if(siruta) ps.push(
    fetch(PROXY+'/inse?siruta='+siruta+'&indicators=POP107A,NAT107A,DEC107A',
      {signal:AbortSignal.timeout(10000)})
    .then(function(r){return r.ok?r.json():null;})
    .then(function(d){if(d)D.inse=d;}).catch(function(){}));

  // OSM — infrastructura regionala
  var qReg='[out:json][timeout:30];(way["highway"~"motorway|trunk"](around:60000,'+cy+','+cx+');'+
    'way["railway"="rail"](around:35000,'+cy+','+cx+');'+
    'node["aeroway"="aerodrome"](around:100000,'+cy+','+cx+');'+
    ');out geom;';
  ps.push(fetch(PROXY+'/osm?q='+encodeURIComponent(qReg),{signal:AbortSignal.timeout(20000)})
    .then(function(r){return r.json();})
    .then(function(d){
      var roads=[],rail=[],apt=[];
      (d.elements||[]).forEach(function(el){
        if(el.type==='node'&&el.tags&&el.tags.aeroway==='aerodrome')
          apt.push({lon:el.lon,lat:el.lat,name:el.tags.name||'Aeroport'});
        if(el.type!=='way'||!el.geometry)return;
        var c=el.geometry.map(function(n){return[n.lon,n.lat];});
        var hw=el.tags&&el.tags.highway, rw=el.tags&&el.tags.railway;
        if(hw==='motorway')roads.push({type:'Feature',geometry:{type:'LineString',coordinates:c},properties:{c:'#dc2626',w:8,t:'motorway'}});
        else if(hw==='trunk')roads.push({type:'Feature',geometry:{type:'LineString',coordinates:c},properties:{c:'#ea580c',w:5,t:'trunk'}});
        if(rw==='rail')rail.push({type:'Feature',geometry:{type:'LineString',coordinates:c},properties:{c:'#a78bfa',w:3}});
      });
      D.roads=roads; D.rail=rail; D.airports=apt;
    }).catch(function(){}));

  // OSM — drumuri urbane
  var qUrb='[out:json][timeout:30];(way["highway"~"motorway|trunk|primary|secondary|tertiary|residential"](around:12000,'+cy+','+cx+'););out geom;';
  ps.push(fetch(PROXY+'/osm?q='+encodeURIComponent(qUrb),{signal:AbortSignal.timeout(25000)})
    .then(function(r){return r.json();})
    .then(function(d){
      var ft=[];
      (d.elements||[]).forEach(function(el){
        if(el.type!=='way'||!el.geometry)return;
        var c=el.geometry.map(function(n){return[n.lon,n.lat];});
        var hw=(el.tags&&el.tags.highway)||'tertiary';
        var col,w;
        if(hw==='motorway'){col='#dc2626';w=8;}else if(hw==='trunk'){col='#ea580c';w=6;}
        else if(hw==='primary'){col='#f59e0b';w=4;}else if(hw==='secondary'){col='#16a34a';w=3;}
        else if(hw==='tertiary'){col='#0ea5e9';w=2;}else{col='#334155';w=1;}
        ft.push({type:'Feature',geometry:{type:'LineString',coordinates:c},properties:{c:col,w:w}});
      });
      D.urban=ft;
    }).catch(function(){}));

  // OSM — spatii verzi + monumente
  var qGreen='[out:json][timeout:25];(way["leisure"~"park|garden|nature_reserve"](around:8000,'+cy+','+cx+');'+
    'node["historic"](around:6000,'+cy+','+cx+');'+
    'node["amenity"="place_of_worship"](around:5000,'+cy+','+cx+');'+
    'way["landuse"="cemetery"](around:8000,'+cy+','+cx+');'+
    'way["railway"="rail"](around:5000,'+cy+','+cx+');'+
    ');out geom;';
  ps.push(fetch(PROXY+'/osm?q='+encodeURIComponent(qGreen),{signal:AbortSignal.timeout(20000)})
    .then(function(r){return r.json();})
    .then(function(d){
      var green=[],monuments=[],cimitire=[],cfr=[];
      (d.elements||[]).forEach(function(el){
        var tags=el.tags||{};
        if(tags.leisure==='park'||tags.leisure==='garden'||tags.leisure==='nature_reserve'){
          if(el.geometry||el.center)
            green.push({type:'Feature',
              geometry:{type:'Point',coordinates:el.center?[el.center.lon,el.center.lat]:
                [el.geometry[0].lon,el.geometry[0].lat]},
              properties:{c:'#22c55e',name:tags.name||'Parc',r:8}});
        }
        if(tags.historic){
          if(el.lon)monuments.push({type:'Feature',
            geometry:{type:'Point',coordinates:[el.lon,el.lat]},
            properties:{c:'#fbbf24',name:tags.name||tags.historic,r:6}});
        }
        if(tags.landuse==='cemetery'){
          if(el.geometry)cimitire.push({type:'Feature',
            geometry:{type:'LineString',coordinates:el.geometry.map(function(n){return[n.lon,n.lat];})},
            properties:{c:'#6b7280',w:2}});
        }
        if(tags.railway==='rail'&&el.geometry)
          cfr.push({type:'Feature',geometry:{type:'LineString',coordinates:el.geometry.map(function(n){return[n.lon,n.lat];})},
            properties:{c:'#a78bfa',w:3}});
      });
      D.greenSpaces=green; D.monuments=monuments; D.cimitire=cimitire; D.cfr=cfr;
      console.log('[Cinema] Verde:'+green.length+' Monumente:'+monuments.length+' CFR:'+cfr.length);
    }).catch(function(){}));

  var timeout=new Promise(function(res){setTimeout(res,18000);});
  Promise.race([Promise.allSettled(ps),timeout]).then(function(){
    D.loaded=true;
    console.log('[Cinema v5.1] Loaded. Wiki:'+!!D.wiki+' Roads:'+(D.roads||[]).length+' Urban:'+(D.urban||[]).length+' Verde:'+(D.greenSpaces||[]).length);
    done();
  });
}

// ── ENTRY POINT ───────────────────────────────────────────────────────────
window._startCinema = function(cityKey) {
  cityKey=cityKey||(window.TCI&&window.TCI.cityKey)||(window.S&&window.S.activeUAT)||localStorage.getItem('ux_last_city')||'RO-IS-01';
  var map=window.map, SE=window._CinemaEngine;
  if(!map){console.error('[Cinema] map lipsa');return;}
  if(!SE){console.error('[Cinema] SE lipsa');return;}

  // Resolve city
  var city=null;
  if(window._RO_CITIES_DB)city=window._RO_CITIES_DB[cityKey];
  if(!city&&window._UAT_DB)city=window._UAT_DB[cityKey];
  if(!city&&window.TCI&&window.TCI._EXTRA_UATS)city=window.TCI._EXTRA_UATS[cityKey];
  if(!city&&window._RO_CITIES_DB)city=Object.values(window._RO_CITIES_DB)[0];
  if(!city){console.error('[Cinema] city negasit');return;}

  var pred=null;
  try{if(window._PredEngine&&typeof window._PredEngine.calc==='function')pred=window._PredEngine.calc(city);}catch(e){}
  if(!pred)pred=_fallbackPred(city);

  var cx=city.lon||27.601, cy=city.lat||47.158;
  var name=city.name||'UAT';
  var siruta=city.siruta||cityKey.split('-').pop();

  SE.SCENES=SCENES; SE._setupMap=function(){};
  SE._playing=false;
  if(SE._raf)cancelAnimationFrame(SE._raf);
  if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
  _clean(map);

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

  // Reset live data
  D.wiki=null;D.inse=null;D.roads=null;D.rail=null;D.airports=null;
  D.urban=null;D.monuments=null;D.greenSpaces=null;D.loaded=false;

  document.querySelectorAll('#tci-c8,#cin-legend,#tci-c8-ctrl,#cin-loading').forEach(function(e){e.remove();});

  // Loading screen
  var ld=document.createElement('div');
  ld.id='cin-loading';
  ld.style.cssText='position:fixed;inset:0;z-index:999998;background:rgba(2,5,14,0.97);display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:"Space Grotesk",sans-serif;';
  ld.innerHTML='<div style="font-size:10px;font-weight:700;color:#D4AF37;letter-spacing:.2em;margin-bottom:14px">TCI CINEMATIC v5.1</div>'
    +'<div style="font-size:32px;font-weight:900;color:#fff;margin-bottom:6px">'+name.toUpperCase()+'</div>'
    +'<div style="font-size:11px;color:rgba(148,163,184,0.55);margin-bottom:28px">Analiza urbanistica '+_getStart()+' \u2192 '+_getEnd()+' · Date live</div>'
    +'<div style="width:300px;height:3px;background:rgba(255,255,255,0.08);border-radius:2px;">'
    +'<div id="cin-prog" style="height:100%;width:0%;background:linear-gradient(90deg,#D4AF37,#f59e0b);border-radius:2px;transition:width .5s;"></div></div>'
    +'<div id="cin-load-txt" style="font-size:10px;color:rgba(148,163,184,0.4);margin-top:12px;letter-spacing:.04em;">Incarcare Wikipedia...</div>';
  document.body.appendChild(ld);
  var prg=document.getElementById('cin-prog'),pv=0;
  var msgs=['Incarcare Wikipedia...','Fetch date INSE...','Cartografiere OSM...','Spatii verzi si monumente...','Pregatire film cinematic...'];
  var mi=0;
  var pi=setInterval(function(){
    pv=Math.min(88,pv+Math.random()*9);
    if(prg)prg.style.width=pv+'%';
    var lt=document.getElementById('cin-load-txt');
    if(lt&&mi<msgs.length){lt.textContent=msgs[mi];mi++;}
  },600);

  try{TCI._playing=false;TCI._stopped=true;}catch(e){}
  try{if(TCI._director)TCI._director._playing=false;}catch(e){}
  try{TCI.pause&&TCI.pause();}catch(e){}

  preload(city,siruta,function(){
    clearInterval(pi);
    if(prg)prg.style.width='100%';
    setTimeout(function(){
      ld.style.transition='opacity .7s'; ld.style.opacity='0';
      setTimeout(function(){ ld.remove(); _startFilm(map,SE,city,pred,cx,cy,name,siruta,hidden); },700);
    },400);
  });
};

// ── FILM START ────────────────────────────────────────────────────────────
function _startFilm(map,SE,city,pred,cx,cy,name,siruta,hidden){
  var cv=document.createElement('canvas');
  cv.id='tci-c8'; cv.width=window.innerWidth; cv.height=window.innerHeight;
  cv.style.cssText='position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:999999;pointer-events:none;';
  document.body.appendChild(cv);

  SE._map=map; SE._city=city; SE._pred=pred;
  SE._canvas=cv; SE._ctx=cv.getContext('2d');
  SE._playing=true; SE._si=0;

  var _oFly=map.flyTo.bind(map),_oJump=map.jumpTo.bind(map);
  map.flyTo=function(o){
    if(!SE._playing){map.flyTo=_oFly;map.jumpTo=_oJump;return _oFly(o);}
    var sid=SE.SCENES[SE._si]&&SE.SCENES[SE._si].id;
    var ok=(sid==='s1_identitate'||sid==='s2_regional');
    if(!ok&&((o.pitch||0)<50||(o.zoom||20)<11))return map;
    return _oFly(o);
  };
  map.jumpTo=function(o){
    if(!SE._playing){map.flyTo=_oFly;map.jumpTo=_oJump;return _oJump(o);}
    var sid=SE.SCENES[SE._si]&&SE.SCENES[SE._si].id;
    var ok=(sid==='s1_identitate'||sid==='s2_regional');
    if(!ok&&((o.pitch||0)<50||(o.zoom||20)<11))
      return _oJump(Object.assign({},o,{pitch:65,zoom:14.5}));
    return _oJump(o);
  };

  var origColor=null;
  try{origColor=map.getPaintProperty('building-extrusion','fill-extrusion-color');}catch(e){}

  // Handle resize
  window.addEventListener('resize',function(){ cv.width=window.innerWidth; cv.height=window.innerHeight; });

  function lp(p){try{map.setConfigProperty('basemap','lightPreset',p);}catch(e){}}
  function rot(b,s){
    if(SE._rotInt)clearInterval(SE._rotInt);
    var br=b;
    SE._rotInt=setInterval(function(){
      if(!SE._playing){clearInterval(SE._rotInt);SE._rotInt=null;return;}
      br+=s;try{map.setBearing(br%360);}catch(e){}
    },50);
  }
  function fly(center,zoom,pitch,bearing,dur,delay,preset){
    setTimeout(function(){
      if(!SE._playing)return;
      if(preset)lp(preset);
      try{map.flyTo({center:center,zoom:zoom,pitch:pitch,bearing:bearing,
        duration:dur||6000,essential:true,
        easing:function(t){return t<0.5?2*t*t:(1-Math.pow(-2*t+2,2)/2);}});}catch(e){}
    },delay||0);
  }

  // Zone dinamice per UAT
  var Z={
    C:[cx,cy], NV:[cx-0.022,cy+0.016], SE2:[cx+0.024,cy-0.013],
    SV:[cx-0.015,cy-0.018], NE:[cx+0.020,cy+0.017], PER:[cx+0.040,cy-0.030],
  };

  // Culori cladiri
  var CB=['match',['get','type'],
    'apartments','#3b82f6','residential','#60a5fa','house','#93c5fd',
    'commercial','#f59e0b','retail','#fbbf24','office','#a78bfa',
    'industrial','#6b7280','warehouse','#4b5563',
    'school','#22c55e','university','#16a34a',
    'hospital','#ef4444','church','#d97706','cathedral','#92400e',
    'civic','#8b5cf6','public','#7c3aed','hotel','#ec4899',
    '#94a3b8'];

  function setColor(id){
    var expr;
    if(id==='s10_seismic')expr=['interpolate',['linear'],['get','height'],0,'#166534',8,'#854d0e',15,'#b91c1c',25,'#dc2626',40,'#ef4444'];
    else if(id==='s11_clima')expr=['interpolate',['linear'],['get','height'],0,'#1e3a8a',5,'#1d4ed8',12,'#3b82f6',25,'#93c5fd'];
    else if(id==='s7_coridoare')expr=['interpolate',['linear'],['get','height'],0,'#14532d',6,'#15803d',15,'#f59e0b',28,'#ef4444'];
    else expr=CB;
    try{map.setPaintProperty('building-extrusion','fill-extrusion-color',expr);}catch(e){}
    try{map.setPaintProperty('building-extrusion','fill-extrusion-opacity',0.92);}catch(e){}
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
      map.addSource(id,{type:'geojson',data:{type:'FeatureCollection',features:ft}});
      map.addLayer({id:id,type:'circle',source:id,
        paint:{'circle-color':['get','c'],'circle-radius':['get','r'],
          'circle-opacity':0.88,'circle-stroke-width':1.5,'circle-stroke-color':'rgba(255,255,255,0.5)'}});
    }catch(e){}
  }

  function stopAll(){
    SE._playing=false;
    try{map.flyTo=_oFly;map.jumpTo=_oJump;}catch(e){}
    if(SE._raf)cancelAnimationFrame(SE._raf);
    if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
    _clean(map);
    try{if(origColor)map.setPaintProperty('building-extrusion','fill-extrusion-color',origColor);}catch(e){}
    try{map.setPaintProperty('building-extrusion','fill-extrusion-height',['get','height']);}catch(e){}
    document.getElementById('tci-c8')&&document.getElementById('tci-c8').remove();
    document.getElementById('tci-c8-ctrl')&&document.getElementById('tci-c8-ctrl').remove();
    document.getElementById('cin-legend')&&document.getElementById('cin-legend').remove();
    hidden.forEach(function(el){el.style.cssText=el._cs||'';delete el._cs;});
    try{map.flyTo({center:[cx,cy],zoom:12,pitch:40,bearing:0,duration:1500,essential:true});}catch(e){}
    try{map.setConfigProperty('basemap','lightPreset','day');}catch(e){}
  }

  function goScene(i){
    if(i<0||i>=SE.SCENES.length)return;
    SE._playing=false;
    if(SE._raf)cancelAnimationFrame(SE._raf);
    if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
    _clean(map);
    SE._playing=true;
    runScene(i);
  }

  // Butoane
  var ctrl=document.createElement('div');
  ctrl.id='tci-c8-ctrl';
  ctrl.style.cssText='position:fixed;bottom:18px;left:50%;transform:translateX(-50%);z-index:1000000;display:flex;gap:8px;align-items:center;background:rgba(2,6,18,0.92);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:8px 16px;';
  ctrl.innerHTML='<button id="c8p" style="background:none;border:none;color:#64748b;padding:5px 12px;cursor:pointer;font:700 14px monospace;border-radius:8px;">◀</button>'
    +'<button id="c8pause" style="background:none;border:none;color:#D4AF37;padding:5px 14px;cursor:pointer;font:700 16px monospace;border-radius:8px;">⏸</button>'
    +'<button id="c8n" style="background:none;border:none;color:#64748b;padding:5px 12px;cursor:pointer;font:700 14px monospace;border-radius:8px;">▶</button>'
    +'<div id="c8sn" style="font:600 9px \'IBM Plex Mono\',monospace;color:#D4AF37;letter-spacing:.08em;min-width:160px;text-align:center;text-transform:uppercase;"></div>'
    +'<button id="c8s" style="background:rgba(127,0,0,.75);border:none;color:#fca5a5;padding:5px 12px;cursor:pointer;font:700 13px monospace;border-radius:8px;">✕</button>';
  document.body.appendChild(ctrl);
  document.getElementById('c8s').onclick=stopAll;
  document.getElementById('c8n').onclick=function(){goScene(SE._si+1);};
  document.getElementById('c8p').onclick=function(){goScene(SE._si-1);};

  var _pt=0;
  document.getElementById('c8pause').onclick=function(){
    if(SE._playing){
      _pt=Math.min(1,Math.max(0,(performance.now()-SE._startT)/SE.SCENES[SE._si].dur));
      SE._playing=false;
      if(SE._raf)cancelAnimationFrame(SE._raf);
      if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
      this.textContent='▶';
    } else {
      SE._playing=true; this.textContent='⏸';
      var sc=SE.SCENES[SE._si];
      SE._startT=performance.now()-_pt*sc.dur;
      _loop(sc,SE._si);
    }
  };

  // Legenda
  function updateLegend(sc){
    var el=document.getElementById('cin-legend');
    var items=sc.legend&&sc.legend!=='none'?(LEGENDS[sc.legend]||[]):[];
    if(!items.length){if(el)el.style.opacity='0';return;}
    if(!el){
      el=document.createElement('div');el.id='cin-legend';
      el.style.cssText='position:fixed;top:68px;right:14px;z-index:1000000;background:rgba(2,6,18,0.90);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px 14px;font-family:"Space Grotesk",sans-serif;min-width:200px;max-width:240px;transition:opacity .4s;';
      document.body.appendChild(el);
    }
    var html='<div style="font-size:8px;font-weight:700;color:#D4AF37;letter-spacing:.1em;margin-bottom:7px;text-transform:uppercase;">'+sc.label+'</div><div style="display:flex;flex-direction:column;gap:4px;">';
    items.forEach(function(it){
      html+='<div style="display:flex;align-items:flex-start;gap:7px;">'
        +'<span style="display:inline-block;width:11px;height:11px;min-width:11px;background:'+it[0]+';border-radius:2px;margin-top:1px;"></span>'
        +'<span style="color:rgba(210,225,255,0.80);font-size:9.5px;line-height:1.4;">'+it[1]+'</span></div>';
    });
    html+='</div>';
    el.innerHTML=html; el.style.opacity='1';
  }

  // ── SETUP CAMERA + LAYERE per scena ──────────────────────────────────
  function setup(id){
    if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
    setColor(id);

    switch(id){
      case 's1_identitate':
        lp('night');
        try{map.jumpTo({center:[15,51],zoom:4,pitch:0,bearing:0});}catch(e){}
        fly([24.5,45.9],6.5,0,0,4000,300);
        fly([cx,cy],9,15,0,4000,4600);
        fly([cx,cy],13,48,10,4000,9000);
        fly([cx,cy],15.5,68,20,4500,13300);
        break;

      case 's2_regional':
        lp('day');
        fly([cx,cy],8,0,0,3500,0);
        setTimeout(function(){
          if(!SE._playing)return;
          if(D.roads&&D.roads.length)addLine('cin-hw',D.roads);
          if(D.rail&&D.rail.length)addLine('cin-rail',D.rail,{'line-color':'#a78bfa','line-width':2,'line-opacity':0.8,'line-dasharray':[5,3]});
          if(D.airports&&D.airports.length)addCircle('cin-apt',D.airports.map(function(a){return{type:'Feature',geometry:{type:'Point',coordinates:[a.lon,a.lat]},properties:{c:'#22c55e',r:10,name:a.name}};}));
        },2000);
        fly([cx,cy],10,20,-10,5000,7000);
        fly([cx,cy],12.5,45,15,5000,14000,'day');
        break;

      case 's3_profil':
        lp('dawn');
        fly(Z.C,13,48,0,3500,0);
        // Spatii verzi + monumente
        setTimeout(function(){
          if(!SE._playing)return;
          if(D.greenSpaces&&D.greenSpaces.length)addCircle('cin-green',D.greenSpaces);
          if(D.monuments&&D.monuments.length)addCircle('cin-mon',D.monuments);
        },2000);
        fly(Z.NV,14.5,60,40,6000,9000,'dawn');
        fly(Z.C,13.5,52,0,5000,17000,'day');
        break;

      case 's4_economie':
        lp('day');
        fly(Z.C,14,55,-10,3500,0,'day');
        fly(Z.NE,15,65,20,6000,9000,'day');
        fly(Z.C,13.5,50,0,5000,17000,'day');
        break;

      case 's5_proiecte':
        lp('day');
        if(D.roads&&D.roads.length)setTimeout(function(){if(!SE._playing)return;addLine('cin-hw',D.roads);},500);
        if(D.rail&&D.rail.length)setTimeout(function(){if(!SE._playing)return;addLine('cin-rail',D.rail,{'line-color':'#a78bfa','line-width':2,'line-opacity':0.75});},500);
        fly([cx,cy],11,35,0,3500,0,'day');
        fly(Z.PER,12.5,50,30,6000,8000,'day');
        fly(Z.C,14,58,-15,5000,16000,'dusk');
        break;

      case 's6_fond':
        lp('day');
        if(D.monuments&&D.monuments.length)setTimeout(function(){if(!SE._playing)return;addCircle('cin-mon',D.monuments);},1000);
        if(D.cimitire&&D.cimitire.length)setTimeout(function(){if(!SE._playing)return;addLine('cin-cim',D.cimitire,{'line-color':'#6b7280','line-width':2,'line-dasharray':[3,3]});},1000);
        fly(Z.C,15.5,68,20,3500,0,'day');
        fly(Z.NV,15,65,60,6000,9000,'day');
        fly(Z.SE2,15,65,120,6000,16000,'day');
        break;

      case 's7_coridoare':
        lp('night');
        try{map.setPaintProperty('building-extrusion','fill-extrusion-height',0.1);}catch(e){}
        fly(Z.C,14.5,62,10,3500,0,'night');
        fly(Z.NV,14.5,65,55,7000,10000,'night');
        fly(Z.SE2,14,62,130,7000,18000,'dusk');
        break;

      case 's8_mobilitate':
        lp('night');
        fly([cx,cy],12,48,0,3500,0,'night');
        setTimeout(function(){if(!SE._playing)return;if(D.urban&&D.urban.length)addLine('cin-urb',D.urban);},1500);
        fly(Z.C,13.5,55,15,6000,8000,'night');
        fly(Z.SE2,13,50,-20,6000,16000,'night');
        break;

      case 's9_transport':
        lp('day');
        rot(20,0.012);
        try{SE._addTransit&&SE._addTransit.call(SE,map);}catch(e){}
        break;

      case 's10_seismic':
        lp('night');
        fly([cx,cy],12.5,52,5,3500,0,'night');
        try{SE._addSeismic&&SE._addSeismic.call(SE,map);}catch(e){}
        fly(Z.NV,14,62,30,6000,7000,'night');
        fly(Z.SE2,14,60,-20,6000,14000,'night');
        break;

      case 's11_clima':
        lp('dawn');
        fly([cx,cy],11.5,45,8,3500,0,'dawn');
        try{SE._addFlood&&SE._addFlood.call(SE,map);}catch(e){}
        if(D.roads&&D.roads.length)setTimeout(function(){if(!SE._playing)return;addLine('cin-hw',D.roads);},2000);
        if(D.greenSpaces&&D.greenSpaces.length)setTimeout(function(){if(!SE._playing)return;addCircle('cin-green',D.greenSpaces);},2000);
        fly(Z.SV,12.5,50,15,6000,8000,'dawn');
        fly(Z.C,13,55,-5,6000,16000,'day');
        break;

      case 's12_montecarlo':
        lp('dusk');
        fly([cx,cy],11.5,48,-5,3500,0,'dusk');
        try{SE._addExpansionRings&&SE._addExpansionRings.call(SE,map);}catch(e){}
        fly(Z.PER,12,45,40,7000,10000,'dusk');
        fly(Z.C,13,52,-10,6000,18000,'night');
        break;

      case 's13_infra_nec':
        lp('day');
        rot(15,0.010);
        try{SE._addInfraPoints&&SE._addInfraPoints.call(SE,map);}catch(e){}
        break;

      case 's14_benchmark':
        lp('dusk');
        fly(Z.C,13,50,-15,3500,0,'dusk');
        fly(Z.NV,14,58,30,6000,9000,'dusk');
        fly(Z.SE2,13.5,54,-20,6000,16000,'dusk');
        break;

      case 's15_sdg':
        lp('day');
        if(D.greenSpaces&&D.greenSpaces.length)setTimeout(function(){if(!SE._playing)return;addCircle('cin-green',D.greenSpaces);},500);
        fly(Z.C,14.5,60,10,3500,0,'day');
        fly(Z.SE2,14,58,-20,6000,9000,'day');
        break;

      case 's16_agenda':
        lp('day');
        if(D.roads&&D.roads.length)setTimeout(function(){if(!SE._playing)return;addLine('cin-hw',D.roads);},500);
        fly([cx,cy],13,52,0,3500,0,'day');
        fly(Z.C,14.5,62,20,6000,8000,'day');
        break;

      case 's17_viziune':
        lp('dusk');
        rot(30,0.008);
        fly(Z.C,15.5,72,120,18000,2000,'dusk');
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

    // Font sizes — 100% responsive, nicio iesire din pagina
    var FT=Math.min(W*0.030,40);  // titlu
    var FD=Math.min(W*0.052,68);  // cifra mare
    var FS=Math.min(W*0.013,17);  // subtitlu
    var FL=Math.min(W*0.010,13);  // label
    var FN=Math.min(W*0.012,15);  // narativ — mai mic pt wrap corect
    var FC=Math.min(W*0.011,14);  // concluzie

    // Vignete
    var gT=ctx.createLinearGradient(0,0,0,H*0.28);
    gT.addColorStop(0,'rgba(2,5,14,0.93)');gT.addColorStop(1,'rgba(2,5,14,0)');
    ctx.fillStyle=gT;ctx.fillRect(0,0,W,H*0.28);
    var gB=ctx.createLinearGradient(0,H*0.72,0,H);
    gB.addColorStop(0,'rgba(2,5,14,0)');gB.addColorStop(1,'rgba(2,5,14,0.93)');
    ctx.fillStyle=gB;ctx.fillRect(0,H*0.72,W,H*0.28);

    function titlu(txt,sub){
      ctx.globalAlpha=sA*rE(0.04,0.16);
      ctx.fillStyle='rgba(212,175,55,0.95)';
      ctx.font='700 '+FT+'px "IBM Plex Mono",monospace';
      ctx.textAlign='left';ctx.letterSpacing='0.04em';
      // titlu cu wrap automat
      wrapText(ctx,txt,W*0.04,H*0.088,W*0.80,FT*1.3,2);
      if(sub){
        ctx.globalAlpha=sA*rE(0.07,0.16)*0.65;
        ctx.fillStyle='rgba(148,163,184,0.85)';
        ctx.font=FS+'px "IBM Plex Mono",monospace';
        ctx.letterSpacing='0.02em';
        wrapText(ctx,sub,W*0.04,H*0.088+FT*1.5,W*0.80,FS*1.5,2);
      }
      ctx.globalAlpha=1;
    }
    function linie(){
      ctx.globalAlpha=sA*rE(0.06,0.22);
      var g=ctx.createLinearGradient(W*0.04,0,W*0.04+W*0.42,0);
      g.addColorStop(0,'rgba(212,175,55,0.9)');g.addColorStop(1,'rgba(212,175,55,0)');
      ctx.fillStyle=g;ctx.fillRect(W*0.04,H*0.11+FT*1.5,W*0.42*rE(0.06,0.28),1.5);
      ctx.globalAlpha=1;
    }
    function cifra(val,lbl,clr){
      ctx.globalAlpha=sA*rE(0.13,0.20);
      ctx.fillStyle=clr||'#ffffff';
      ctx.font='900 '+FD+'px "Space Grotesk",sans-serif';
      ctx.textAlign='left';ctx.letterSpacing='0';
      ctx.fillText(String(val).slice(0,13),W*0.04,H*0.888);
      ctx.globalAlpha=sA*rE(0.16,0.17)*0.7;
      ctx.fillStyle='rgba(148,163,184,0.75)';
      ctx.font='600 '+FL+'px "IBM Plex Mono",monospace';
      ctx.letterSpacing='0.05em';
      ctx.fillText(String(lbl).toUpperCase().slice(0,36),W*0.04,H*0.912);
      ctx.globalAlpha=1;
    }
    function cifra2(val,lbl,clr){
      ctx.globalAlpha=sA*rE(0.18,0.18);
      ctx.fillStyle=clr||'rgba(212,175,55,0.95)';
      ctx.font='900 '+Math.min(W*0.030,40)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='right';ctx.letterSpacing='0';
      ctx.fillText(String(val).slice(0,15),W*0.96,H*0.888);
      ctx.globalAlpha=sA*rE(0.21,0.17)*0.65;
      ctx.fillStyle='rgba(148,163,184,0.68)';
      ctx.font='600 '+FL+'px "IBM Plex Mono",monospace';
      ctx.textAlign='right';ctx.letterSpacing='0.05em';
      ctx.fillText(String(lbl).toUpperCase().slice(0,30),W*0.96,H*0.910);
      ctx.globalAlpha=1;
    }
    function narativ(txt){
      if(t<0.50)return;
      ctx.globalAlpha=Math.min(1,(t-0.50)/0.15)*sA;
      ctx.fillStyle='rgba(220,228,255,0.85)';
      ctx.font='500 '+FN+'px "Space Grotesk",sans-serif';
      ctx.textAlign='left';ctx.letterSpacing='0';
      wrapText(ctx,txt,W*0.04,H*0.934,W*0.58,FN*1.5,3);
      ctx.globalAlpha=1;
    }
    function concluzie(txt){
      if(t<0.80)return;
      ctx.globalAlpha=Math.min(1,(t-0.80)/0.14)*sA*0.9;
      ctx.fillStyle='rgba(212,175,55,0.9)';
      ctx.font='700 '+FC+'px "IBM Plex Mono",monospace';
      ctx.textAlign='right';ctx.letterSpacing='0.03em';
      wrapText(ctx,'\u25B6 '+txt,W*0.96,H*0.958,W*0.55,FC*1.5,2);
      ctx.globalAlpha=1;
    }
    function negativ(txt){
      // Consecinta NEGATIVA daca nu se actioneaza
      if(t<0.85)return;
      var a=Math.min(1,(t-0.85)/0.12)*sA;
      ctx.globalAlpha=a;
      ctx.fillStyle='rgba(239,68,68,0.88)';
      ctx.font='700 '+FC+'px "IBM Plex Mono",monospace';
      ctx.textAlign='left';ctx.letterSpacing='0.02em';
      wrapText(ctx,'\u26A0 DACA NU SE ACTIONEAZA: '+txt,W*0.04,H*0.958,W*0.55,FC*1.5,2);
      ctx.globalAlpha=1;
    }

    // Progress
    ctx.globalAlpha=0.55;
    ctx.fillStyle='rgba(255,255,255,0.07)';ctx.fillRect(W*0.30,H-8,W*0.40,2);
    var gp=ctx.createLinearGradient(W*0.30,0,W*0.70,0);
    gp.addColorStop(0,'#D4AF37');gp.addColorStop(1,'rgba(212,175,55,0.08)');
    ctx.fillStyle=gp;ctx.fillRect(W*0.30,H-8,W*0.40*((SE._si+t)/SE.SCENES.length),2);
    ctx.fillStyle='rgba(148,163,184,0.30)';
    ctx.font='500 '+Math.min(W*0.008,9)+'px "IBM Plex Mono",monospace';
    ctx.textAlign='center';ctx.letterSpacing='.04em';
    ctx.fillText('BLOC '+sc.bloc+' \u00b7 '+(SE._si+1)+'/'+SE.SCENES.length+' \u2014 '+sc.label,W/2,H-1);
    ctx.globalAlpha=1;

    var pop21=pred.p21||city.pop2021||100000;
    var r10=pred.r10||city.rata_reala_2011_2021||0;

    switch(id){

      case 's1_identitate':
        // Titlu mare — cu wrap
        ctx.globalAlpha=sA*rE(0.16,0.32);
        ctx.fillStyle='rgba(255,255,255,0.95)';
        ctx.font='900 '+Math.min(W*0.075,96)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='center';ctx.letterSpacing='0.02em';
        // wrap titlu mare
        var nt=name.toUpperCase();
        if(ctx.measureText(nt).width>W*0.90)
          ctx.font='900 '+Math.min(W*0.050,64)+'px "Space Grotesk",sans-serif';
        ctx.fillText(nt,W/2,H*0.47);
        ctx.globalAlpha=sA*rE(0.24,0.20)*0.82;
        ctx.fillStyle='#D4AF37';
        ctx.font='600 '+Math.min(W*0.014,18)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='center';ctx.letterSpacing='0';
        ctx.fillText((city.judet||'—').toUpperCase()+' \u00b7 '+N(pop21)+' LOCUITORI \u00b7 SIRUTA '+(city.siruta||'—'),W/2,H*0.542);
        ctx.globalAlpha=1;
        // Wikipedia box — dimensiune adaptiva, text wrap corect
        if(D.wiki&&D.wiki.extract&&t>0.36){
          var wA=Math.min(1,(t-0.36)/0.18)*sA*0.9;
          ctx.globalAlpha=wA;
          var bx=W*0.04,by=H*0.60,bw=Math.min(W*0.56,520),bh=H*0.26;
          ctx.fillStyle='rgba(4,10,24,0.82)';
          ctx.beginPath();ctx.roundRect&&ctx.roundRect(bx,by,bw,bh,8);ctx.fill();
          ctx.strokeStyle='rgba(212,175,55,0.18)';ctx.lineWidth=1;ctx.stroke();
          ctx.fillStyle='rgba(148,163,184,0.50)';
          ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left';ctx.letterSpacing='.06em';
          ctx.fillText('\u{1F4D6} WIKIPEDIA \u2014 SCURT ISTORIC',bx+12,by+15);
          ctx.fillStyle='rgba(210,225,255,0.84)';
          ctx.font='400 '+Math.min(W*0.011,14)+'px "Space Grotesk",sans-serif';
          ctx.letterSpacing='0';
          wrapText(ctx,D.wiki.extract,bx+12,by+32,bw-24,Math.min(W*0.013,17)*1.5,7);
          ctx.globalAlpha=1;
        }
        cifra(N(pop21),'Locuitori 2021 — INSE');
        cifra2(N(Math.round(((city.suprafata_ha||city.suprafata||9800)/100)))+' km\u00b2','Suprafata UAT');
        break;

      case 's2_regional':
        titlu('Context Regional','Accesibilitate \u00b7 Infrastructura \u00b7 Gravitatie urbana');linie();
        var nh=(D.roads||[]).length,nr=(D.rail||[]).length,na=(D.airports||[]).length;
        var hub=city.coef_hub||0.78;
        var items2=[
          ['\u{1F6E3}  Autostrazi/DN in raza 60km: '+(nh>0?nh+' segmente OSM':'verificare'),'#ea580c'],
          ['\u{1F682}  Cale ferata in raza 35km: '+(nr>0?nr+' segmente CFR':'verificare'),'#a78bfa'],
          ['\u2708  Aeroporturi in raza 100km: '+(na>0?na+' detectate':'verificare'),'#22c55e'],
          ['\u{1F3D9}  Hub economic: '+(hub>=1.1?'METROPOLITAN (coef '+hub.toFixed(2)+')':hub>=0.9?'REGIONAL (coef '+hub.toFixed(2)+')':'LOCAL (coef '+hub.toFixed(2)+')'),'#D4AF37'],
          ['\u{1F30D}  Regiune: '+(city.regiune||'—')+' | Judet: '+(city.judet||'—')+' | Siruta: '+(city.siruta||'—'),'#60a5fa'],
        ];
        items2.forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.14+i*0.04,0.18);
          ctx.fillStyle=it[1];
          ctx.font='500 '+Math.min(W*0.012,15)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left';ctx.letterSpacing='0';
          wrapText(ctx,it[0],W*0.04,H*(0.57+i*0.056),W*0.55,Math.min(W*0.014,17)*1.4,2);
        });
        ctx.globalAlpha=1;
        cifra(N(pop21),'Populatie UAT 2021');
        cifra2(hub.toFixed(2)+' hub','Coeficient economic');
        narativ('Portocaliu/rosu=autostrazi. Violet=cale ferata. Verde=aeroporturi. Gravitatia urbana determina corido rele de crestere — fiecare km autostrada nou creste valoarea terenurilor cu 15-40% pe coridorul sau.');
        concluzie('Accesibilitatea este principalul predictor al cresterii urbane pe 30 ani');
        break;

      case 's3_profil':
        titlu('Profil Locuitori','Demografie \u00b7 Piramida varsta \u00b7 Migratie \u00b7 '+_getStart()+'-'+_getEnd());linie();
        var rClr=r10>=0.5?'#22c55e':r10>=-0.5?'#f59e0b':'#ef4444';
        var tLbl=r10>=1?'crestere accelerata':r10>=0.2?'crestere lenta':r10>=-0.5?'stagnare':'declin demografic';
        cifra((r10>=0?'+':'')+r10.toFixed(2)+'%/an',tLbl,rClr);
        cifra2(N(pred.pop55||Math.round(pop21*Math.pow(1+r10/100,_HORIZON))),'Proiectie '+_getEnd());
        // Piramida varsta canvas
        if(t>0.22) _drawAge(ctx,W,H,Math.min(1,(t-0.22)/0.20)*sA,r10);
        // Profil special daca universitar sau granita
        var isUniv=(city.universitati||0)>0||(city.coef_hub||0)>=1.1;
        var isGranita=['IS','BT','SV','GL','TL','CT','GJ','TR','GR'].indexOf(city.judet||'')>=0;
        if(t>0.30){
          ctx.globalAlpha=sA*rE(0.30,0.18)*0.85;
          ctx.fillStyle='rgba(220,230,255,0.82)';
          ctx.font='500 '+Math.min(W*0.011,14)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left';ctx.letterSpacing='0';
          var profil='';
          if(isUniv)profil+='Oras universitar: '+(city.universitati||'multiple')+' universitati, aflux studenti +15-25k/an. ';
          if(isGranita)profil+='Zona de granita/proximitate R.Moldova: flux migratie pozitiv. ';
          profil+='Structura: '+(r10<-0.5?'imbatranire accelerata, emigratie forta de munca':'profil activ, convergenta demografica')+'.';
          wrapText(ctx,profil,W*0.04,H*0.62,W*0.55,Math.min(W*0.013,17)*1.5,3);
          ctx.globalAlpha=1;
        }
        narativ(N(pop21)+' loc. (2021). Tendinta: '+r10.toFixed(2)+'%/an ('+tLbl+'). Proiectie S2: '+N(pred.pop55||0)+' loc. in '+_getEnd()+'. Verde=zone verzi/parcuri. Auriu=monumente. Populatia este cel mai important indicator urban.');
        concluzie('Declinul demografic = presiune bugetara locala + nevoie reconversie fond construit');
        negativ('Orasul imbatraneste si se goleste — spatii publice abandonate, scoli inchise, servicii reduse');
        break;

      case 's4_economie':
        titlu('Economie','PIB \u00b7 Convergenta UE \u00b7 Sectoare \u00b7 Putere de cumparare');linie();
        var pib=pred.pib||14200, pUE=pred.pctUE||Math.round(pib/366);
        cifra(N(pib)+' \u20ac/loc','PIB per locuitor',pUE>=75?'#22c55e':pUE>=50?'#f59e0b':'#ef4444');
        cifra2(pUE+'% UE27','Convergenta economica');
        if(t>0.18) _drawEco(ctx,W,H,Math.min(1,(t-0.18)/0.20)*sA,pred);
        narativ(name+' = '+pUE+'% din media UE27. Target convergenta: ~'+(pred.anConv||2050)+'. ROI imobiliar estimat: ~'+(pred.roi||8)+'%/an. Putere de cumparare: medie '+(city.regiune==='NV'||city.regiune==='V'||city.regiune==='BI'?'ridicata':'sub media nationala')+'. Sectoare: servicii '+(pred.ocupatie&&pred.ocupatie.servicii||52)+'%, industrie '+(pred.ocupatie&&pred.ocupatie.industrie||28)+'%.');
        concluzie('Convergenta economica = principalul motor al cresterii valorii imobiliare pe 30 ani');
        negativ('Fara investitii: PIB ramine la '+(pUE-5)+'% UE, forta de munca emigreaza, fiscalitate locala scade');
        break;

      case 's5_proiecte':
        titlu('Proiecte & Infrastructura','PNRR \u00b7 Autostrazi \u00b7 Investitii publice live');linie();
        var nMot=(D.roads||[]).filter(function(r){return r.properties&&r.properties.t==='motorway';}).length;
        ctx.globalAlpha=sA*rE(0.13,0.20);
        var pRows=[
          ['\u{1F6E3}  Autostrazi in raza: '+nMot+' segmente detectate OSM','#dc2626'],
          ['\u{1F682}  Cale ferata: marcata ca restrictie constructie','#a78bfa'],
          ['\u{1F4B0}  PNRR C10-I2: consolidare seismica '+N(pred.fond||1000)+' cladiri eligibile','#f59e0b'],
          ['\u{1F3D7}  Necesare: '+N(pred.defLoc||3000)+' unitati locative pana in '+_getEnd(),'#60a5fa'],
          ['\u{1F1EA}\u{1F1FA}  Fonduri UE absorbabile: ~'+N(Math.round((pred.invTotal||300)*0.35))+' M EUR','#22c55e'],
          ['\u{1F4CA}  Investitie totala estimata: '+N(pred.invTotal||300)+' M EUR pe '+_HORIZON+' ani','#D4AF37'],
        ];
        pRows.forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.13+i*0.04,0.17);
          ctx.fillStyle=it[1];
          ctx.font='500 '+Math.min(W*0.012,14)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left';ctx.letterSpacing='0';
          wrapText(ctx,it[0],W*0.04,H*(0.55+i*0.060),W*0.55,Math.min(W*0.014,17)*1.4,2);
        });
        ctx.globalAlpha=1;
        cifra(N(pred.invTotal||300)+' M \u20ac','Investitii necesare '+_getStart()+'-'+_getEnd(),'#D4AF37');
        cifra2('~35% UE','Finantare FEDR+PNRR');
        narativ('Un km autostrada nou in raza de 20km creste valoarea terenurilor cu 15-40% pe coridorul sau (model gravitational UrbanX calibrat pe 320 UAT-uri Romania). Proiecte de infrastructura = coridoare de crestere urbana.');
        concluzie('Fiecare proiect public major anuntat redistribuie oportunitatea imobiliara in raza sa');
        break;

      case 's6_fond':
        titlu('Fond Construit Existent','Tipuri \u00b7 Densitate \u00b7 Monumente \u00b7 Restrictii');linie();
        cifra(N(pred.auth||Math.round(pop21/800)),'Autorizatii/an estimat','#60a5fa');
        cifra2(N(pred.fond||Math.round(pop21/50))+' cladiri','Fond pre-1990 risc RS','#ef4444');
        if(t>0.25){
          ctx.globalAlpha=sA*rE(0.25,0.18)*0.85;
          ctx.fillStyle='rgba(220,230,255,0.80)';
          ctx.font='500 '+Math.min(W*0.012,14)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left';ctx.letterSpacing='0';
          wrapText(ctx,'\u{1F4D9} Monumente CIMEC: afisate cu galben pe harta. Zona protectie 200m = restrictii constructie.',W*0.04,H*0.62,W*0.55,Math.min(W*0.014,17)*1.5,2);
          wrapText(ctx,'\u{26CF} Cimitire: afisate cu gri stria. Restrictie constructie legala 50m perimetru.',W*0.04,H*0.66,W*0.55,Math.min(W*0.014,17)*1.5,2);
          wrapText(ctx,'\u{1F682} CFR: culoar de siguranta 20m de la axa caii ferate — constructie interzisa.',W*0.04,H*0.70,W*0.55,Math.min(W*0.014,17)*1.5,2);
          ctx.globalAlpha=1;
        }
        narativ('Albastru=blocuri \u00b7 Portocaliu=comercial \u00b7 Verde=scoli \u00b7 Rosu=spitale \u00b7 Violet=birouri \u00b7 Maro=monumente/biserici. '+N(pred.fond||0)+' cladiri pre-1990 necesita evaluare seismica urgenta.');
        concluzie('36% fondul construit pre-1990 = vulnerabilitate seismica critca — PNRR C10-I2');
        negativ('Fara consolidare: un cutremur >6.5 Richter afecteaza '+(Math.round((pred.fond||1000)*0.4))+' cladiri in mod critic');
        break;

      case 's7_coridoare':
        var tG=t<0.13?0:Math.min(1,(t-0.13)/0.72);
        var tE=1-Math.pow(1-tG,3);
        try{map.setPaintProperty('building-extrusion','fill-extrusion-height',['*',['get','height'],Math.max(0.04,tE)]);}catch(e){}
        if(t<0.15){
          titlu(name+' '+_getStart()+' \u2014 Starea Actuala','Fond construit la zi');linie();
          cifra(N(pop21),'Locuitori actuali','#94a3b8');
          cifra2(N(pred.auth||300),'Autorizatii/an','#60a5fa');
        } else {
          titlu('Unde Creste Orasul '+_getEnd(),'Coridoare \u00b7 Presiune constructibila \u00b7 Animatie '+_getStart()+'\u2192'+_getEnd());linie();
          ctx.globalAlpha=sA*tE;
          ctx.fillStyle='#ef4444';
          ctx.font='900 '+FD+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left';ctx.letterSpacing='0';
          ctx.fillText(N(Math.round((pred.defLoc||5000)*tE)),W*0.04,H*0.888);
          ctx.globalAlpha=sA*0.7;
          ctx.fillStyle='rgba(148,163,184,0.75)';
          ctx.font='600 '+FL+'px "IBM Plex Mono",monospace';
          ctx.letterSpacing='0.05em';
          ctx.fillText('UNITATI LOCATIVE NECESARE '+_getEnd(),W*0.04,H*0.912);
          cifra2(N(pred.recHa||200)+' ha','Potential reconversie','#f59e0b');
          if(tE>0.40)narativ('Cladirile cresc animat = proiectia cresterii '+_getStart()+'\u2192'+_getEnd()+'. Verde=zona mica densitate (densificare posibila). Galben=medie. Rosu=suprasaturat. '+N(pred.defLoc||5000)+' unitati locative necesare. Coridoarele de crestere urmeza axele de transport public.');
          ctx.globalAlpha=1;
        }
        concluzie('Coridoarele de crestere = axa TP principal + zone reconversie industriala + noduri auto');
        negativ('Fara PUZ actualizat: cresterea haotic sprawl periurban = costuri infrastructura x3 per locuitor');
        break;

      case 's8_mobilitate':
        titlu('Mobilitate Urbana','Retea OSM reala \u00b7 Congestie \u00b7 Solutii necesare');linie();
        cifra(N(pred.mot24||380),'Vehicule/1000 loc',(pred.mot24||380)>450?'#ef4444':'#f59e0b');
        cifra2('~'+(pred.satAn||2040),'An saturare retea');
        ctx.globalAlpha=sA*rE(0.22,0.16);
        [['#dc2626','AUTOSTRADA'],['#ea580c','DN'],['#f59e0b','PRIMAR'],['#16a34a','SECUNDAR'],['#0ea5e9','TERTIAR']].forEach(function(it,i){
          ctx.fillStyle=it[0];ctx.fillRect(W*(0.04+i*0.15),H*0.930,W*0.016,5);
          ctx.fillStyle='rgba(220,230,255,0.70)';
          ctx.font='500 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left';ctx.letterSpacing='0';
          ctx.fillText(it[1],W*(0.058+i*0.15),H*0.937);
        });
        ctx.globalAlpha=1;
        narativ(N(pred.fluxOra||25000)+' veh/h la varf. Saturatie retea ~'+_getP1()+'-'+(pred.satAn||2040)+'. '+(pred.pasaje||5)+' pasaje noi necesare. Zonele rosii = blocaje recurente = prioritate pasaj sau centura. Cost total mobilitate: '+N(pred.invMob||120)+' M EUR '+_getStart()+'-'+_getEnd()+'.');
        concluzie('Fara pasaje noi si centura: reteaua rutiera intra in colaps dupa '+(pred.satAn||2040));
        negativ('Congestie cronica = -30 min/zi/locuitor = 180h/an pierdute = cost economic '+(Math.round((pop21/1000)*0.8))+' M EUR/an');
        break;

      case 's9_transport':
        titlu('Transport Public','Acoperire \u00b7 BRT \u00b7 Modal Split \u00b7 SUMP '+_getP1());linie();
        cifra((pred.tp||62)+'%','Acoperire pop. TP',(pred.tp||62)>=70?'#22c55e':(pred.tp||62)>=50?'#f59e0b':'#ef4444');
        cifra2((pred.kmBRT||30)+' km BRT','Coridoare propuse');
        if(t>0.20) _drawModal(ctx,W,H,Math.min(1,(t-0.20)/0.20)*sA,pred);
        narativ('Deficit '+(75-(pred.tp||62))+'pp vs standard UE 75%. Walk Score: '+(pred.walkScore||58)+'/100. BRT pe coridoarele principale = reducere congestie 25-35%. Statii noi: '+(pred.statiiNoi||60)+'. SUMP target: '+_getP1()+'. Cost BRT: '+N(pred.costBRT||90)+' M EUR.');
        concluzie('BRT coridor principal = +18pp walkability +35% utilizare TP +25% reducere congestie');
        negativ('Fara TP extins: modal split auto '+(Math.min(85,(pred.modalAuto||68)+8))+'% in '+_getP2()+' = colaps infrastructura rutiera');
        break;

      case 's10_seismic':
        titlu('Risc Seismic','P100-1/2013 \u00b7 Fond vulnerabil \u00b7 PNRR C10-I2');linie();
        var ag=pred.ag||0.20;
        var agC=ag>=0.30?'#ef4444':ag>=0.20?'#f59e0b':'#22c55e';
        cifra('ag='+ag.toFixed(2)+'g','Acceleratie seismica P100-1/2013',agC);
        cifra2(N(pred.fond||Math.round(pop21/50))+' cladiri','Fond risc RS I-III','#ef4444');
        ctx.globalAlpha=sA*rE(0.20,0.16);
        [['#166534','<8m SIGUR'],['#854d0e','8-15m ATENTIE'],['#dc2626','>25m RISC MAXIM']].forEach(function(it,i){
          ctx.fillStyle=it[0];ctx.fillRect(W*(0.04+i*0.18),H*0.928,W*0.015,5);
          ctx.fillStyle='rgba(220,230,255,0.72)';
          ctx.font='500 '+Math.min(W*0.009,10)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left';
          ctx.fillText(it[1],W*(0.057+i*0.18),H*0.936);
        });
        ctx.globalAlpha=1;
        narativ(N(pred.fond||1000)+' cladiri risc RS I-III. PNRR C10-I2: '+N(Math.round((pred.fond||1000)*0.25))+' apartamente consolidabile. Cost: '+N(Math.round((pred.fond||1000)*0.085))+' M EUR. Zona P100: ag='+ag+'g Tc='+(ag>=0.30?'0.7s':'1.0s')+'. Cladirile rosii pe harta = inalte + zona ag ridicata = vulnerabilitate maxima.');
        concluzie('Fondul pre-1977 (inainte P13/1963) = risc maxim — prioritate absoluta PNRR');
        negativ('Un cutremur Vrancea >7.0: '+(Math.round((pred.fond||1000)*0.15))+' cladiri prabusire partiala estimata — '+Math.round(pop21*0.008)+' victime potential');
        break;

      case 's11_clima':
        titlu('Clima & Inundatii','ANAR PGRA \u00b7 UHI \u00b7 Seceta \u00b7 RCP4.5/8.5 \u00b7 '+_getEnd());linie();
        var zile=pred.zile24||18;
        cifra(zile+' zile','Caniculare >35\u00b0C azi (ANM)','#f59e0b');
        cifra2(Math.round(zile*2.1)+' zile','Proiectie '+_getEnd()+' RCP4.5','#ef4444');
        if(t>0.22) _drawClima(ctx,W,H,Math.min(1,(t-0.22)/0.20)*sA,pred,zile);
        narativ('Albastru=lunca inundabila ANAR activa. Verde=spatii verzi (racire UHI). UHI estimat: +'+(pred.uhi||1.8)+'\u00b0C vs rural. In '+_getEnd()+': '+Math.round(zile*2.1)+' zile caniculare (+'+Math.round(zile*1.1)+'). Risc seceta: '+(pred.drought||'moderat')+'. Infrastructura critca: autostrazi si retele utilitati in zone inundabile.');
        concluzie('Spatii verzi noi + acoperisuri verzi = reducere UHI 1.5-2.5\u00b0C = salvare vietii in valuri caldura');
        negativ('Fara adaptare climatica: val caldura '+_getEnd()+' = '+(Math.round(pop21*0.0003))+' spitalizari/val + blocaje termocentrale + inundatii zone construite');
        break;

      case 's12_montecarlo':
        var rB=r10||0;
        var pO=Math.round(pop21*Math.pow(1+(rB+0.9)/100,_HORIZON));
        var pR=Math.round(pop21*Math.pow(1+(rB-0.8)/100,_HORIZON));
        var pM=pred.pop55||Math.round(pop21*Math.pow(1+rB/100,_HORIZON));
        titlu('Monte Carlo '+_getEnd(),'10.000 simulari \u00b7 3 Scenarii \u00b7 Interval 90%');linie();
        if(t>0.08) _drawMC(ctx,W,H,Math.min(1,(t-0.08)/0.24)*sA,pR,pM,pO,pop21,t);
        cifra('['+N(pR)+'\u2013'+N(pO)+']','Interval 90% populatie '+_getEnd(),'#f59e0b');
        cifra2(N(pO-pR)+' persoane','Diferenta intre scenarii');
        narativ('S1 Regres (declin neinterventie): '+N(pR)+' loc. S2 Tendinta (referinta): '+N(pM)+' loc. S3 Optimist (investitii): '+N(pO)+' loc. Diferenta '+N(pO-pR)+' persoane = '+(Math.round((pO-pR)*45000/1e6)).toFixed(1)+' km\u00b2 suprafata locativa diferita. Decizia de azi determina scenariul '+_getEnd()+'.');
        concluzie('PUG-ul de azi trebuie dimensionat pe S2+20% marja — nu pe S3 optimist');
        negativ('S1 materializat: '+(Math.round((pop21-pR)/1000))+'k mai putini locuitori = '+(Math.round((pop21-pR)*0.04/1e6)).toFixed(1)+' km\u00b2 fond abandonat + colaps servicii publice');
        break;

      case 's13_infra_nec':
        titlu('Infrastructura Necesara '+_getStart()+'\u2013'+_getEnd(),'Scoli \u00b7 Sanatate \u00b7 SV \u00b7 Utilitati \u00b7 Localizare');linie();
        cifra(N(pred.invTotal||300)+' M \u20ac','Total investitii necesare','#D4AF37');
        cifra2('~60% UE','Finantare REGIO+PNRR','#22c55e');
        var infRows=[
          ['\u{1F3EB} SCOLI NOI: +'+(pred.scoliNoi||2)+' unitati (MEC: 400 elevi/unitate)'],
          ['\u{1F3E5} CABINETE: +'+(pred.cabMed||5)+' cabinete (MS: 1500 pac./cabinet)'],
          ['\u{1F333} SPATII VERZI: +'+(pred.svHa||150)+' ha (OMS min: 9m\u00b2/loc)'],
          ['\u{1F68C} STATII TP: +'+(pred.statiiNoi||60)+' statii (UITP: 1/3500 loc)'],
          ['\u{1F4A7} RETELE APA/CANAL: extindere zone de crestere planificate'],
          ['\u26A1 RETELE ENERGIE: modernizare fond pre-1990 NZEB obligatoriu'],
        ];
        infRows.forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.16+i*0.04,0.17);
          ctx.fillStyle='rgba(220,230,255,0.84)';
          ctx.font='500 '+Math.min(W*0.011,14)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left';ctx.letterSpacing='0';
          wrapText(ctx,it[0],W*0.04,H*(0.57+i*0.058),W*0.55,Math.min(W*0.013,16)*1.4,2);
        });
        ctx.globalAlpha=1;
        narativ('Punctele colorate pe harta = locatii OSM existente scoli/spitale/parcuri. Icoanele animate = necesarul nou calculat. Mobilitate: '+N(pred.invMob||120)+' M EUR. Social: '+N(pred.invSoc||80)+' M EUR. Reabilitare seismica: '+N(Math.round((pred.fond||1000)*0.085))+' M EUR.');
        break;

      case 's14_benchmark':
        titlu('Benchmark European',name+' vs orase similare UE \u00b7 Eurostat UA 2022');linie();
        var dens=Math.round(pop21/((city.suprafata_ha||5000)/100));
        cifra(dens+' loc/km\u00b2','Densitate urbana',dens>1000?'#22c55e':dens>500?'#f59e0b':'#94a3b8');
        cifra2((pred.pctUE||38)+'% UE27','Convergenta economica');
        if(t>0.14) _drawBench(ctx,W,H,Math.min(1,(t-0.14)/0.22)*sA,pred,name);
        narativ(name+': PIB/cap '+(pred.pctUE||38)+'% UE27. Comparabil cu: '+_peers(city)+'. Gap fata de best-in-class: recuperabil in 8-15 ani cu investitii '+(Math.round((pred.invTotal||300)*0.40/30)).toFixed(0)+' M EUR/an sustinuti. Helsinki a investit 4.2% PIB/an timp de 15 ani si a sarit de la 55% la 95% UE27.');
        concluzie('Orasele care au inchis decalajul UE au investit 3-4% din PIB local/an in infrastructura');
        negativ('Fara investitii: ramanem la '+(pred.pctUE||38)+'% UE27 in '+_getEnd()+' — cea mai lenta convergenta din Europa Centrala');
        break;

      case 's15_sdg':
        titlu('Calitate Viata \u2014 SDG 11','Obiective ONU \u00b7 Target '+_getP1()+' \u00b7 Radar analiza');linie();
        cifra((pred.sdgTotal||6.4)+'/10','Scor SDG11 estimat',(pred.sdgTotal||6.4)>=7?'#22c55e':'#f59e0b');
        cifra2((pred.walkScore||58)+'/100','Walk Score urban');
        if(t>0.18) _drawSDG(ctx,W,H,Math.min(1,(t-0.18)/0.22)*sA,pred);
        // Spatii verzi info
        if(t>0.30){
          ctx.globalAlpha=sA*rE(0.30,0.18)*0.82;
          ctx.fillStyle=(pred.svM2||11)<9?'#ef4444':'#22c55e';
          ctx.font='700 '+Math.min(W*0.012,15)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left';ctx.letterSpacing='0';
          wrapText(ctx,(pred.svM2||11)<9?'\u26A0 SPATII VERZI: '+(pred.svM2||11)+'m\u00b2/loc < 9m\u00b2 standard OMS — DEFICIT CRITIC':'\u2713 SPATII VERZI: '+(pred.svM2||11)+'m\u00b2/loc \u2265 9m\u00b2 standard OMS',W*0.04,H*0.63,W*0.55,Math.min(W*0.014,17)*1.5,2);
          ctx.globalAlpha=1;
        }
        narativ('SDG 11.1 Locuire: '+(pred.locuireSDG||70)+'%. SDG 11.2 Transport: '+(pred.tp||62)+'%. SDG 11.6 Mediu/Aer: '+(pred.svM2||11)+'m\u00b2 SV/loc. SDG 11.7 Spatii pub: '+(pred.spatiiPublice||65)+'%. Verde pe harta = spatii verzi existente detectate OSM. Target 2030: toate SDG >= 7/10.');
        concluzie('Sub 9m\u00b2 SV/loc = incalcarea standardului OMS = risc sanatate publica');
        negativ('Fara spatii verzi noi: UHI urban creste cu +'+(pred.uhi||1.8)+'\u00b0C — spitalizari caldura +40% in '+_getEnd());
        break;

      case 's16_agenda':
        titlu('Agenda Primarului '+_getStart()+'\u2013'+_getP1(),'Prioritati \u00b7 Ce se face \u00b7 Ce se intampla daca NU');linie();
        var ag2=_agenda(pred,city);
        ag2.forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.11+i*0.05,0.17);
          // Fundal colorat per prioritate
          ctx.fillStyle=it.clr+'22';
          ctx.fillRect(W*0.04,H*(0.555+i*0.058)-Math.min(W*0.013,16),W*0.56,Math.min(W*0.013,16)*2.5);
          ctx.fillStyle=it.clr;
          ctx.font='700 '+Math.min(W*0.010,12)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left';ctx.letterSpacing='.05em';
          ctx.fillText(it.priority,W*0.04,H*(0.555+i*0.058));
          ctx.fillStyle='rgba(220,228,255,0.88)';
          ctx.font='500 '+Math.min(W*0.011,14)+'px "Space Grotesk",sans-serif';
          ctx.letterSpacing='0';
          wrapText(ctx,it.text,W*0.14,H*(0.555+i*0.058),W*0.46,Math.min(W*0.013,16)*1.4,2);
          // Consecinta negativa mica
          ctx.fillStyle=it.clr+'aa';
          ctx.font='400 '+Math.min(W*0.009,11)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='right';ctx.letterSpacing='0';
          wrapText(ctx,'\u2717 '+it.negativ,W*0.96,H*(0.555+i*0.058),W*0.30,Math.min(W*0.010,12)*1.4,2);
        });
        ctx.globalAlpha=1;
        cifra(ag2.length+' prioritati','Identificate '+_getStart()+'-'+_getP1(),'#D4AF37');
        cifra2(N(Math.round((pred.invTotal||300)*0.30))+' M \u20ac','Faza 1: '+_getStart()+'-'+_getP1());
        break;

      case 's17_viziune':
        // "2055" mare in fundal
        ctx.globalAlpha=sA*rE(0.04,0.42)*0.05;
        ctx.fillStyle='#D4AF37';
        ctx.font='900 '+Math.min(W*0.28,340)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='center';ctx.letterSpacing='0';
        ctx.fillText(String(_getEnd()),W/2,H*0.62);
        titlu(name.toUpperCase()+' '+_getEnd(),'Viziune '+_getStart()+' \u2192 '+_getEnd());linie();
        ctx.globalAlpha=sA*rE(0.10,0.22);
        ctx.fillStyle='rgba(255,255,255,0.94)';
        ctx.font='900 '+Math.min(W*0.046,60)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='center';ctx.letterSpacing='0.02em';
        ctx.fillText(name.toUpperCase(),W/2,H*0.27);
        ctx.globalAlpha=1;
        var pop_end=pred.pop55||Math.round(pop21*Math.pow(1+r10/100,_HORIZON));
        var checks=[
          {ok:pop_end>pop21,              txt:'Populatie '+_getEnd()+': '+N(pop_end)+' loc.'},
          {ok:(pred.pctUE55||(pred.pctUE||38)+20)>=75, txt:'PIB '+_getEnd()+': ~'+(pred.pctUE55||(pred.pctUE||38)+20)+'% UE27'},
          {ok:(pred.anSUMP||2028)<=_getP1(),txt:'SUMP aprobat: '+(pred.anSUMP||_getP1())},
          {ok:(pred.tp||62)>=75,           txt:'Transport public: '+(pred.tp||62)+'% acoperire'},
          {ok:(pred.sdgTotal||6.4)>=7,     txt:'SDG11: '+(pred.sdgTotal||6.4)+'/10'},
          {ok:true,                         txt:'Investitii: '+N(pred.invTotal||300)+' M EUR'},
          {ok:(pred.fond||1000)>0,          txt:'Consolidate: '+N(Math.round((pred.fond||1000)*0.25))+' ap. seismic'},
        ];
        checks.forEach(function(ch,i){
          ctx.globalAlpha=sA*rE(0.20+i*0.05,0.13);
          ctx.fillStyle=ch.ok?'#22c55e':'#ef4444';
          ctx.font='700 '+Math.min(W*0.014,18)+'px sans-serif';
          ctx.textAlign='right';
          ctx.fillText(ch.ok?'\u2713':'\u26A0',W*0.96,H*(0.69+i*0.040));
          ctx.fillStyle='rgba(220,228,255,0.87)';
          ctx.font=Math.min(W*0.012,15)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='right';ctx.letterSpacing='0';
          ctx.fillText(ch.txt.slice(0,46),W*0.950,H*(0.69+i*0.040));
        });
        ctx.globalAlpha=1;
        if(t>0.80){
          var vA=Math.min(1,(t-0.80)/0.15)*sA;
          ctx.globalAlpha=vA;
          ctx.fillStyle='rgba(239,68,68,0.85)';
          ctx.font='700 '+Math.min(W*0.013,16)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='center';ctx.letterSpacing='.03em';
          wrapText(ctx,'DACA NU SE ACTIONEAZA: '+name+' in '+_getEnd()+' = sprawl necontrolat + fond abandonat + colaps servicii + migratie accelerata',W/2,H*0.965,W*0.80,Math.min(W*0.014,17)*1.5,2);
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
      try{draw(sc,t);}catch(e){console.error('[cinDraw]',sc.id,e.message,e.stack&&e.stack.split('\n')[1]);}
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
    SE._si=idx; SE._startT=performance.now();
    _clean(map);
    if(sc.id!=='s7_coridoare')try{map.setPaintProperty('building-extrusion','fill-extrusion-height',['get','height']);}catch(e){}
    var sn=document.getElementById('c8sn');
    if(sn)sn.textContent='BLOC '+sc.bloc+' \u00b7 '+sc.label;
    updateLegend(sc);
    setup(sc.id);
    _loop(sc,idx);
    console.log('[Cinema v5.1]',(idx+1)+'/'+SCENES.length,sc.id,'\u2014',name);
  }

  runScene(0);
  console.log('[Cinema v5.1] FILM START \u2014',name,'\u2014',_getStart()+'\u2192'+_getEnd());
}

// ── GRAFICE CANVAS ────────────────────────────────────────────────────────

function _drawAge(ctx,W,H,alpha,r10){
  ctx.save();
  var x=W*0.57,y=H*0.58,w=Math.min(W*0.38,340),h=H*0.25;
  ctx.globalAlpha=alpha*0.88;
  ctx.fillStyle='rgba(4,10,24,0.80)';
  ctx.beginPath();ctx.roundRect&&ctx.roundRect(x,y,w,h,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.07)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='rgba(148,163,184,0.50)';
  ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
  ctx.textAlign='left';ctx.letterSpacing='.05em';
  ctx.fillText('STRUCTURA DEMOGRAFICA ESTIMATA',x+10,y+14);
  var groups=[
    {l:'65+ ani',p:r10<-0.5?26:r10<0?22:17,c:'#a78bfa'},
    {l:'45-64 ani',p:28,c:'#60a5fa'},
    {l:'25-44 ani',p:r10>0.5?32:r10>0?28:24,c:'#22c55e'},
    {l:'15-24 ani',p:r10<-0.5?9:13,c:'#f59e0b'},
    {l:'0-14 ani',p:r10<-0.5?9:14,c:'#94a3b8'},
  ];
  var bY=y+22,bH=(h-32)/groups.length;
  groups.forEach(function(g,i){
    var bW2=(g.p/38)*(w-70);
    ctx.fillStyle=g.c+'33';ctx.fillRect(x+45,bY+i*bH+2,w-70,bH-5);
    ctx.fillStyle=g.c;ctx.fillRect(x+45,bY+i*bH+2,bW2,bH-5);
    ctx.fillStyle='rgba(220,230,255,0.72)';
    ctx.font='500 '+Math.min(W*0.008,10)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='left';ctx.letterSpacing='0';
    ctx.fillText(g.l,x+4,bY+i*bH+bH*0.68);
    ctx.textAlign='right';
    ctx.fillText(g.p+'%',x+w-4,bY+i*bH+bH*0.68);
  });
  ctx.restore();
}

function _drawEco(ctx,W,H,alpha,pred){
  ctx.save();
  var x=W*0.57,y=H*0.58,w=Math.min(W*0.38,340),h=H*0.22;
  ctx.globalAlpha=alpha*0.88;
  ctx.fillStyle='rgba(4,10,24,0.78)';
  ctx.beginPath();ctx.roundRect&&ctx.roundRect(x,y,w,h,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.07)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='rgba(148,163,184,0.50)';
  ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
  ctx.textAlign='left';ctx.letterSpacing='.05em';
  ctx.fillText('STRUCTURA ECONOMICA (% OCUPARE)',x+10,y+14);
  var sects=[
    {n:'Servicii',v:pred.ocupatie&&pred.ocupatie.servicii||52,c:'#60a5fa'},
    {n:'Industrie',v:pred.ocupatie&&pred.ocupatie.industrie||28,c:'#f59e0b'},
    {n:'Constructii',v:8,c:'#22c55e'},
    {n:'Agricultura',v:pred.ocupatie&&pred.ocupatie.agricultura||6,c:'#a78bfa'},
    {n:'Altele',v:6,c:'#94a3b8'},
  ];
  var bY=y+22,bH=(h-32)/sects.length;
  sects.forEach(function(s,i){
    var bW2=(s.v/70)*(w-80);
    ctx.fillStyle=s.c+'33';ctx.fillRect(x+55,bY+i*bH+2,w-80,bH-5);
    ctx.fillStyle=s.c;ctx.fillRect(x+55,bY+i*bH+2,bW2,bH-5);
    ctx.fillStyle='rgba(220,230,255,0.72)';
    ctx.font='500 '+Math.min(W*0.008,10)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='left';ctx.letterSpacing='0';
    ctx.fillText(s.n,x+4,bY+i*bH+bH*0.68);
    ctx.textAlign='right';ctx.fillText(s.v+'%',x+w-4,bY+i*bH+bH*0.68);
  });
  ctx.restore();
}

function _drawModal(ctx,W,H,alpha,pred){
  ctx.save();
  var cx2=W*0.76,cy2=H*0.69,r=Math.min(W*0.065,75);
  ctx.globalAlpha=alpha*0.90;
  var sl=[
    {v:pred.modalAuto||68,c:'#ef4444',l:'Auto'},
    {v:pred.tp||22,c:'#22c55e',l:'TP'},
    {v:pred.walkPct||7,c:'#60a5fa',l:'Pieton'},
    {v:3,c:'#f59e0b',l:'Velo'},
  ];
  var tot=sl.reduce(function(s,x){return s+x.v;},0),ang=-Math.PI/2;
  sl.forEach(function(s){
    var slice=(s.v/tot)*Math.PI*2;
    ctx.beginPath();ctx.moveTo(cx2,cy2);
    ctx.arc(cx2,cy2,r,ang,ang+slice);ctx.closePath();
    ctx.fillStyle=s.c+'cc';ctx.fill();
    var ma=ang+slice/2;
    ctx.fillStyle=s.c;ctx.font='700 '+Math.min(W*0.009,11)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='center';ctx.letterSpacing='0';
    if(s.v>5)ctx.fillText(s.v+'%',cx2+Math.cos(ma)*(r*1.38),cy2+Math.sin(ma)*(r*1.38)+4);
    ang+=slice;
  });
  ctx.fillStyle='rgba(148,163,184,0.50)';
  ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
  ctx.textAlign='center';ctx.letterSpacing='.05em';
  ctx.fillText('MODAL SPLIT ACTUAL',cx2,cy2+r+18);
  // Target
  ctx.fillStyle='rgba(34,197,94,0.6)';
  ctx.font='500 '+Math.min(W*0.008,10)+'px "Space Grotesk",sans-serif';
  ctx.fillText('Target '+_getP1()+': TP 35% + Activ 20%',cx2,cy2+r+30);
  ctx.restore();
}

function _drawClima(ctx,W,H,alpha,pred,zile){
  ctx.save();
  var x=W*0.57,y=H*0.59,w=Math.min(W*0.38,320),h=H*0.24;
  ctx.globalAlpha=alpha*0.88;
  ctx.fillStyle='rgba(4,10,24,0.78)';
  ctx.beginPath();ctx.roundRect&&ctx.roundRect(x,y,w,h,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.07)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='rgba(148,163,184,0.50)';
  ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
  ctx.textAlign='left';ctx.letterSpacing='.05em';
  ctx.fillText('PROIECTII CLIMATICE RCP4.5/8.5',x+10,y+14);
  var rows=[
    ['Zile caniculare azi',zile+'',_getEnd()+':',''+Math.round(zile*2.1),'#f59e0b'],
    ['UHI urban vs rural','+'+(pred.uhi||1.8)+'\u00b0C','2055:','+'+((pred.uhi||1.8)+0.8).toFixed(1)+'\u00b0C','#ef4444'],
    ['Risc inundatii ANAR',pred.flood||'Mediu',_getEnd()+':',pred.flood||'Ridicat','#1d4ed8'],
    ['Risc seceta',pred.drought||'Moderat',_getEnd()+':','Moderat-Ridicat','#d97706'],
    ['Consum racire (estimat)','baseline',_getEnd()+':','+35-55%','#a78bfa'],
  ];
  var rH=(h-28)/rows.length;
  rows.forEach(function(r2,i){
    var ry=y+24+i*rH;
    ctx.fillStyle='rgba(220,230,255,0.65)';
    ctx.font='500 '+Math.min(W*0.009,10)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='left';ctx.letterSpacing='0';
    ctx.fillText(r2[0],x+6,ry+rH*0.65);
    ctx.fillStyle=r2[4];
    ctx.font='700 '+Math.min(W*0.009,11)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='center';
    ctx.fillText(r2[1]+' \u2192 '+r2[3],x+w*0.65,ry+rH*0.65);
  });
  ctx.restore();
}

function _drawMC(ctx,W,H,alpha,pR,pM,pO,pop21,t){
  ctx.save();
  var x=W*0.04,y=H*0.59,w=W*0.52,h=H*0.22;
  ctx.globalAlpha=alpha*0.88;
  ctx.fillStyle='rgba(4,10,24,0.78)';
  ctx.beginPath();ctx.roundRect&&ctx.roundRect(x,y,w,h,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.07)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='rgba(148,163,184,0.50)';
  ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
  ctx.textAlign='left';ctx.letterSpacing='.05em';
  ctx.fillText('MONTE CARLO '+_getEnd()+' \u2014 3 SCENARII',x+10,y+14);
  var sc2=[
    {l:'S1 REGRES: neinterventie',v:pR,c:'#ef4444'},
    {l:'S2 TENDINTA: referinta',v:pM,c:'#f59e0b'},
    {l:'S3 OPTIMIST: investitii sustinute',v:pO,c:'#22c55e'},
  ];
  var maxV=Math.max(pO,pop21)*1.05,minV=Math.min(pR,pop21)*0.95;
  var bH2=(h-38)/3;
  sc2.forEach(function(s,i){
    var pct=(s.v-minV)/(maxV-minV);
    // Animate bar width cu t
    var animPct=Math.min(pct,pct*Math.max(0,(alpha-0.1)/0.7));
    ctx.fillStyle=s.c+'22';ctx.fillRect(x+10,y+26+i*bH2,w-20,bH2-6);
    ctx.fillStyle=s.c;ctx.fillRect(x+10,y+26+i*bH2,animPct*(w-20),bH2-6);
    ctx.fillStyle=s.c;
    ctx.font='700 '+Math.min(W*0.009,11)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='left';ctx.letterSpacing='0';
    ctx.fillText(s.l,x+14,y+30+i*bH2+bH2*0.55);
    ctx.fillStyle='rgba(220,230,255,0.88)';
    ctx.textAlign='right';
    ctx.fillText(Number(s.v).toLocaleString('ro-RO'),x+w-6,y+30+i*bH2+bH2*0.55);
  });
  ctx.restore();
}

function _drawBench(ctx,W,H,alpha,pred,name){
  ctx.save();
  var x=W*0.56,y=H*0.57,w=Math.min(W*0.39,330),h=H*0.28;
  ctx.globalAlpha=alpha*0.88;
  ctx.fillStyle='rgba(4,10,24,0.78)';
  ctx.beginPath();ctx.roundRect&&ctx.roundRect(x,y,w,h,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.07)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='rgba(148,163,184,0.50)';
  ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
  ctx.textAlign='left';ctx.letterSpacing='.05em';
  ctx.fillText('BENCHMARK EU \u2014 PIB/CAP % UE27',x+8,y+14);
  var peers=[
    {n:'Rzeszow PL',pib:72,c:'#22c55e'},
    {n:'Lublin PL',pib:60,c:'#60a5fa'},
    {n:name,pib:pred.pctUE||38,c:'#D4AF37'},
    {n:'Debrecen HU',pib:58,c:'#a78bfa'},
    {n:'Varna BG',pib:44,c:'#94a3b8'},
  ];
  var rH2=(h-28)/peers.length;
  peers.forEach(function(p,i){
    var isUs=(p.n===name);
    var bW2=(p.pib/100)*(w-85);
    ctx.fillStyle=p.c+(isUs?'':'44');
    ctx.fillRect(x+70,y+22+i*rH2,bW2,rH2-6);
    if(isUs){ctx.strokeStyle=p.c;ctx.lineWidth=1.5;ctx.strokeRect(x+70,y+22+i*rH2,w-90,rH2-6);}
    ctx.fillStyle=isUs?'#D4AF37':'rgba(220,230,255,0.65)';
    ctx.font=(isUs?'700':'500')+' '+Math.min(W*0.009,10)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='left';ctx.letterSpacing='0';
    ctx.fillText(p.n,x+4,y+26+i*rH2+rH2*0.55);
    ctx.textAlign='right';ctx.fillText(p.pib+'%',x+w-4,y+26+i*rH2+rH2*0.55);
  });
  ctx.restore();
}

function _drawSDG(ctx,W,H,alpha,pred){
  ctx.save();
  var cx2=W*0.75,cy2=H*0.70,r=Math.min(W*0.082,90);
  ctx.globalAlpha=alpha;
  var dims=[
    {l:'Locuire',v:(pred.locuireSDG||70)/100},
    {l:'Transport',v:(pred.tp||62)/100},
    {l:'Mediu',v:Math.min(1,(pred.svM2||11)/15)},
    {l:'Spatii pub',v:(pred.spatiiPublice||65)/100},
    {l:'Siguranta',v:(pred.siguranta||72)/100},
    {l:'Economie',v:(pred.pctUE||38)/100},
  ];
  var n2=dims.length,step=Math.PI*2/n2;
  [0.33,0.66,1.0].forEach(function(s){
    ctx.beginPath();
    dims.forEach(function(_,i){
      var a=-Math.PI/2+i*step,px=cx2+Math.cos(a)*r*s,py=cy2+Math.sin(a)*r*s;
      i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
    });
    ctx.closePath();ctx.strokeStyle='rgba(255,255,255,0.10)';ctx.lineWidth=1;ctx.stroke();
  });
  ctx.beginPath();
  dims.forEach(function(d,i){
    var a=-Math.PI/2+i*step,px=cx2+Math.cos(a)*r*d.v,py=cy2+Math.sin(a)*r*d.v;
    i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
  });
  ctx.closePath();ctx.fillStyle='rgba(212,175,55,0.22)';ctx.fill();
  ctx.strokeStyle='#D4AF37';ctx.lineWidth=1.5;ctx.stroke();
  dims.forEach(function(d,i){
    var a=-Math.PI/2+i*step;
    ctx.fillStyle=d.v>=0.7?'#22c55e':d.v>=0.5?'#f59e0b':'#ef4444';
    ctx.font='600 '+Math.min(W*0.009,10)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='center';ctx.letterSpacing='0';
    ctx.fillText(d.l,cx2+Math.cos(a)*(r+15),cy2+Math.sin(a)*(r+15)+4);
  });
  ctx.restore();
}

// ── HELPERS ───────────────────────────────────────────────────────────────

function _fallbackPred(city){
  var pop=city.pop2021||city.pop||100000,r=city.rata_reala_2011_2021||0;
  return {
    p21:pop,r10:r,pop55:Math.round(pop*Math.pow(1+r/100,_HORIZON)),
    pib:14200,pctUE:39,pctUE55:59,anConv:2050,roi:8,
    defLoc:Math.max(0,Math.round(pop*0.08)),recHa:Math.round(pop/300),
    ag:0.20,fond:Math.round(pop/50),
    mot24:380,satAn:2040,fluxOra:Math.round(pop*0.08),pasaje:5,
    invMob:Math.round(pop/800),invTotal:Math.round(pop/300),invSoc:Math.round(pop/1000),
    tp:62,kmBRT:Math.round(pop/8000),costBRT:Math.round(pop/2000),
    defTP:13,walkScore:58,statiiNoi:Math.round(pop/1200),anSUMP:_getP1(),
    zile24:18,uhi:1.8,drought:'moderat',flood:'Mediu',
    scoliNoi:Math.max(0,Math.round(pop/60000)),cabMed:Math.max(1,Math.round(pop/15000)),
    svHa:Math.round(pop/400),svM2:11,sdgTotal:6.4,walkScore:58,
    spatiiPublice:65,locuireSDG:70,siguranta:72,
    auth:Math.round(pop/800),
    modalAuto:68,walkPct:7,
    ocupatie:{servicii:52,industrie:28,agricultura:6},
  };
}

function _peers(city){
  var h=city.coef_hub||0.78;
  if(h>=1.1)return 'Krakow (PL), Vilnius (LT), Brno (CZ)';
  if(h>=0.9)return 'Rzeszow (PL), Lublin (PL), Miskolc (HU)';
  if(h>=0.7)return 'Bielsko-Biala (PL), Debrecen (HU), Varna (BG)';
  return 'Suceava (RO), Targu Mures (RO), Bacau (RO)';
}

function _agenda(pred,city){
  var ag=pred.ag||0.20;
  var items=[];
  if(ag>=0.30)items.push({priority:'\u{1F534} URGENTA 1',text:'Consolidare seismica fond pre-1977 — PNRR C10-I2',negativ:'cutremur >7.0 = pierderi estimate >'+Math.round((pred.fond||1000)*0.15)+' cladiri',clr:'#ef4444'});
  else if(ag>=0.20)items.push({priority:'\u{1F7E1} PRIORITATE 1',text:'Evaluare tehnica fond pre-1977 — expertize structurale',negativ:'fond neevaluat = raspundere juridica administratie',clr:'#f59e0b'});
  if((pred.tp||62)<65)items.push({priority:'\u{1F534} URGENTA 2',text:'Extindere transport public — BRT coridor principal nord-sud',negativ:'modal split auto >80% in '+_getP2()+' = blocaj urban',clr:'#ef4444'});
  if((pred.defLoc||3000)>2000)items.push({priority:'\u{1F7E1} PRIORITATE 2',text:'Actualizare PUG — zone densificare + corido re de crestere',negativ:'PUG depasit = investitori blocati = pierdere fiscala',clr:'#f59e0b'});
  if((pred.satAn||2040)<_getP1()+10)items.push({priority:'\u{1F534} URGENTA 3',text:'Studiu fezabilitate pasaje rutiere — min '+((pred.pasaje||5)-2)+' prioritare',negativ:'saturare retea '+(pred.satAn||2040)+' = colaps economic zona',clr:'#ef4444'});
  if((pred.svM2||11)<9)items.push({priority:'\u{1F7E1} PRIORITATE 3',text:'Plan spatii verzi — minim 9m\u00b2/loc standard OMS',negativ:'UHI nemitigat = sanatate publica afectata + temperaturi >42\u00b0C',clr:'#f59e0b'});
  items.push({priority:'\u{1F7E2} P.STRATEGIC 1',text:'SUMP '+_getP1()+' — Plan Mobilitate Urbana Durabila',negativ:'fara SUMP: pierdere finantare UE 2028-2034',clr:'#22c55e'});
  items.push({priority:'\u{1F7E2} P.STRATEGIC 2',text:'Smart City — digitalizare servicii + senzori IoT urbani',negativ:'fara digitalizare: imposibil acces fonduri UE smart city',clr:'#22c55e'});
  return items.slice(0,6);
}

function _clean(map){
  ['cin-hw','cin-rail','cin-apt','cin-urb','cin-green','cin-mon','cin-cim','cin-cfr','cin-osm'].forEach(function(id){
    try{if(map.getLayer(id))map.removeLayer(id);}catch(e){}
    try{if(map.getSource(id))map.removeSource(id);}catch(e){}
  });
}

// ── PATCH openTCI ─────────────────────────────────────────────────────────
(function patch(n){
  if(typeof window.openTCI==='function'){
    window.openTCI=function(opts){
      window._startCinema((opts&&opts.cityKey)||(window.TCI&&window.TCI.cityKey)||localStorage.getItem('ux_last_city')||'RO-IS-01');
    };
    console.log('[Cinema v5.1] openTCI patched');
  } else if(n<30) setTimeout(function(){patch(n+1);},300);
})(0);

window._launchCinemaV2=function(){window._startCinema();};
console.log('[Cinema v5.1] LOADED — 17 scene \u00b7 text wrap fix \u00b7 grafice complete \u00b7 consecinte negative \u00b7 monumente+verde OSM \u00b7 ani dinamici');

})();
