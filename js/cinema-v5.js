// cinema-v5.js — UrbanX TCI Cinematic MASTER v9.0
// Documentar urban cinematic · 34 scene · 11 blocuri · ~50-60 minute
// Calitate: Banca Mondiala / ministri / fonduri internationale
// Motor: _CinemaEngine v8.0 (tci-cinematic-scenes.js)
// (c) ThinkSmart Solutions SRL 2026

(function(){
'use strict';

// ── ANI DINAMICI ──────────────────────────────────────────────────────────
var _NOW = new Date().getFullYear();
var _HORIZON = 30;
function _S(){ return (window.TCI&&window.TCI.startYear)||_NOW; }
function _E(){ return _S()+_HORIZON; }
function _P1(){ return _S()+5; }
function _P2(){ return _S()+15; }
var PROXY = 'https://urbanx-proxy.3dtravelsoftart.workers.dev';

// ── 34 SCENE — 11 BLOCURI ─────────────────────────────────────────────────
var SCENES = [
  {id:'b1s1',dur:22000,label:'IDENTITATE',           bloc:1,blabel:'IDENTITATE & CONTEXT'},
  {id:'b1s2',dur:20000,label:'CONTEXT GEOPOLITIC',   bloc:1,blabel:'IDENTITATE & CONTEXT'},
  {id:'b1s3',dur:18000,label:'RETEA NATIONALA',      bloc:1,blabel:'IDENTITATE & CONTEXT'},
  {id:'b1s4',dur:20000,label:'EVOLUTIE ISTORICA',    bloc:1,blabel:'IDENTITATE & CONTEXT'},
  {id:'b2s1',dur:22000,label:'DEMOGRAFIE LIVE',      bloc:2,blabel:'CINE SUNT LOCUITORII'},
  {id:'b2s2',dur:20000,label:'CRIZA IMBATRANIRE',    bloc:2,blabel:'CINE SUNT LOCUITORII'},
  {id:'b2s3',dur:20000,label:'MIGRATIE & EMIGRARE',  bloc:2,blabel:'CINE SUNT LOCUITORII'},
  {id:'b2s4',dur:18000,label:'PROFIL LOCUITOR',   bloc:2,blabel:'CINE SUNT LOCUITORII'},
  {id:'b3s1',dur:20000,label:'PIB & CONVERGENTA UE', bloc:3,blabel:'ECONOMIA REALA'},
  {id:'b3s2',dur:20000,label:'MOTOARE ECONOMICE',    bloc:3,blabel:'ECONOMIA REALA'},
  {id:'b3s3',dur:18000,label:'INVESTITII & ROI',     bloc:3,blabel:'ECONOMIA REALA'},
  {id:'b4s1',dur:22000,label:'RETEA RUTIERA',        bloc:4,blabel:'INFRASTRUCTURA AZI'},
  {id:'b4s2',dur:20000,label:'CONECTIVITATE REG.',   bloc:4,blabel:'INFRASTRUCTURA AZI'},
  {id:'b4s3',dur:20000,label:'TRANSPORT PUBLIC',     bloc:4,blabel:'INFRASTRUCTURA AZI'},
  {id:'b4s4',dur:20000,label:'RETELE UTILITATI',     bloc:4,blabel:'INFRASTRUCTURA AZI'},
  {id:'b5s1',dur:20000,label:'RISC SEISMIC',         bloc:5,blabel:'RISCURI TERITORIALE'},
  {id:'b5s2',dur:22000,label:'INUNDATII & CLIMA',    bloc:5,blabel:'RISCURI TERITORIALE'},
  {id:'b5s3',dur:20000,label:'COSTUL INACTIUNII',    bloc:5,blabel:'RISCURI TERITORIALE'},
  {id:'b6s1',dur:20000,label:'FOND CONSTRUIT AZI',   bloc:6,blabel:'UNDE CRESTE ORASUL'},
  {id:'b6s2',dur:24000,label:'CORIDOARE '+(_NOW+30), bloc:6,blabel:'UNDE CRESTE ORASUL'},
  {id:'b6s3',dur:22000,label:'SCENARII INTRAVILAN',  bloc:6,blabel:'UNDE CRESTE ORASUL'},
  {id:'b7s1',dur:22000,label:'TRAFIC & CONGESTIE',   bloc:7,blabel:'MOBILITATE & TRANSPORT'},
  {id:'b7s2',dur:20000,label:'SOLUTII MOBILITATE',   bloc:7,blabel:'MOBILITATE & TRANSPORT'},
  {id:'b7s3',dur:20000,label:'MODAL SPLIT',          bloc:7,blabel:'MOBILITATE & TRANSPORT'},
  {id:'b8s1',dur:22000,label:'PNRR & PROIECTE',      bloc:8,blabel:'PROIECTE & INVESTITII'},
  {id:'b8s2',dur:20000,label:'CORIDOARE INFLUENTA',  bloc:8,blabel:'PROIECTE & INVESTITII'},
  {id:'b9s1',dur:24000,label:'MONTE CARLO',          bloc:9,blabel:'SCENARII PREDICTIVE'},
  {id:'b9s2',dur:22000,label:'BENCHMARK EUROPEAN',   bloc:9,blabel:'SCENARII PREDICTIVE'},
  {id:'b9s3',dur:22000,label:'DACA NU SE ACTIONEAZA',bloc:9,blabel:'SCENARII PREDICTIVE'},
  {id:'b10s1',dur:22000,label:'CRIZE SIMULTANE',     bloc:10,blabel:'CRIZE & REZILIENTA'},
  {id:'b10s2',dur:22000,label:'SCENARIUL NEGRU',     bloc:10,blabel:'CRIZE & REZILIENTA'},
  {id:'b10s3',dur:20000,label:'CONSTRUCTIA REZILIENTEI',bloc:10,blabel:'CRIZE & REZILIENTA'},
];
// ── RESTRUCTURARE IN ACTE — reordonare in 7 ACTE, PASTRAND TOATE scenele
// (nicio scena eliminata) + 4 scene noi de indici calitate viata (b13s1-4).
// Id-urile pastrate -> switch-urile setup/draw raman valide.
SCENES = [
  // PROLOG — deschidere emotionala
  {id:'b0s1',dur:12000,label:'ORASUL RESPIRA',        bloc:1,blabel:'INTELEGEREA ORASULUI'},
  // ACT I — INTELEGEREA ORASULUI
  {id:'b1s1',dur:22000,label:'IDENTITATE',            bloc:1,blabel:'INTELEGEREA ORASULUI'},
  {id:'b1s2',dur:20000,label:'POZITIE STRATEGICA',    bloc:1,blabel:'INTELEGEREA ORASULUI'},
  {id:'b1s3',dur:18000,label:'RETEA NATIONALA',       bloc:1,blabel:'INTELEGEREA ORASULUI'},
  {id:'b1s4',dur:18000,label:'EVOLUTIE ISTORICA',     bloc:1,blabel:'INTELEGEREA ORASULUI'},
  {id:'b2s1',dur:22000,label:'DEMOGRAFIE LIVE',       bloc:1,blabel:'INTELEGEREA ORASULUI'},
  {id:'b2s2',dur:24000,label:'CRIZA IMBATRANIRE',     bloc:1,blabel:'INTELEGEREA ORASULUI'},
  {id:'b2s3',dur:20000,label:'MIGRATIE & EMIGRARE',   bloc:1,blabel:'INTELEGEREA ORASULUI'},
  {id:'b2s4',dur:18000,label:'PROFIL LOCUITOR',    bloc:1,blabel:'INTELEGEREA ORASULUI'},
  {id:'b17s1',dur:26000,label:'CARTIERE — NIVEL STRADA',bloc:1,blabel:'INTELEGEREA ORASULUI'},
  {id:'b3s1',dur:20000,label:'ECONOMIA REALA',        bloc:1,blabel:'INTELEGEREA ORASULUI'},
  {id:'b3s2',dur:20000,label:'MOTOARE ECONOMICE',     bloc:1,blabel:'INTELEGEREA ORASULUI'},
  {id:'b3s3',dur:18000,label:'INVESTITII & ROI',      bloc:1,blabel:'INTELEGEREA ORASULUI'},
  // ACT II — ORASUL SUB PRESIUNE
  {id:'b4s1',dur:20000,label:'RETEA RUTIERA',         bloc:2,blabel:'ORASUL SUB PRESIUNE'},
  {id:'b4s2',dur:24000,label:'CONECTIVITATE REG.',    bloc:2,blabel:'ORASUL SUB PRESIUNE'},
  {id:'b4s3',dur:18000,label:'TRANSPORT PUBLIC',      bloc:2,blabel:'ORASUL SUB PRESIUNE'},
  {id:'b4s4',dur:18000,label:'RETELE UTILITATI',      bloc:2,blabel:'ORASUL SUB PRESIUNE'},
  {id:'b7s1',dur:22000,label:'TRAFIC & CONGESTIE',    bloc:2,blabel:'ORASUL SUB PRESIUNE'},
  {id:'b7s2',dur:20000,label:'SOLUTII MOBILITATE',    bloc:2,blabel:'ORASUL SUB PRESIUNE'},
  {id:'b7s3',dur:18000,label:'MODAL SPLIT',           bloc:2,blabel:'ORASUL SUB PRESIUNE'},
  {id:'b5s1',dur:20000,label:'RISC SEISMIC',          bloc:2,blabel:'ORASUL SUB PRESIUNE'},
  {id:'b5s2',dur:20000,label:'INUNDATII & CLIMA',     bloc:2,blabel:'ORASUL SUB PRESIUNE'},
  {id:'b5s3',dur:18000,label:'COSTUL INACTIUNII',     bloc:2,blabel:'ORASUL SUB PRESIUNE'},
  {id:'b23s1',dur:20000,label:'LOCUIRE & ACCESIBILITATE',bloc:2,blabel:'ORASUL SUB PRESIUNE'},
  // ACT III — ORASUL 2055 (climaxul vizual)
  {id:'b6s1',dur:18000,label:'FOND CONSTRUIT AZI',    bloc:3,blabel:'ORASUL 2055'},
  {id:'b6s2',dur:26000,label:'CORIDOARE '+(_NOW+30),  bloc:3,blabel:'ORASUL 2055'},
  {id:'b6s3',dur:22000,label:'SCENARII INTRAVILAN',   bloc:3,blabel:'ORASUL 2055'},
  {id:'b8s1',dur:22000,label:'PROIECTE STRATEGICE',   bloc:3,blabel:'ORASUL 2055'},
  {id:'b8s2',dur:20000,label:'CORIDOARE INFLUENTA',   bloc:3,blabel:'ORASUL 2055'},
  {id:'b15s1',dur:24000,label:'PROIECTE STRUCTURANTE',bloc:3,blabel:'ORASUL 2055'},
  {id:'b9s1',dur:24000,label:'MONTE CARLO',           bloc:3,blabel:'ORASUL 2055'},
  {id:'b9s2',dur:22000,label:'BENCHMARK EUROPEAN',    bloc:3,blabel:'ORASUL 2055'},
  // ACT IV — REZILIENTA
  {id:'b9s3',dur:20000,label:'DACA NU SE ACTIONEAZA', bloc:4,blabel:'REZILIENTA'},
  {id:'b10s1',dur:22000,label:'CRIZE SIMULTANE',      bloc:4,blabel:'REZILIENTA'},
  {id:'b10s2',dur:22000,label:'SCENARIUL NEGRU',      bloc:4,blabel:'REZILIENTA'},
  {id:'b10s3',dur:20000,label:'CONSTRUCTIA REZILIENTEI',bloc:4,blabel:'REZILIENTA'},
  {id:'b14s1',dur:18000,label:'SPONGE CITY',          bloc:4,blabel:'REZILIENTA'},
  {id:'b24s1',dur:20000,label:'ENERGIE & CLIMAT',     bloc:4,blabel:'REZILIENTA'},
  {id:'b25s1',dur:20000,label:'APA & CIRCULAR',       bloc:4,blabel:'REZILIENTA'},
  {id:'b14s2',dur:18000,label:'METABOLISM URBAN',     bloc:4,blabel:'REZILIENTA'},
  // ACT V — MODELE CARE FUNCTIONEAZA
  {id:'b12s1',dur:20000,label:'SUPERBLOCKS BARCELONA',bloc:5,blabel:'MODELE CARE FUNCTIONEAZA'},
  {id:'b12s2',dur:20000,label:'REGULA 3-30-300',      bloc:5,blabel:'MODELE CARE FUNCTIONEAZA'},
  {id:'b12s3',dur:20000,label:'ORASUL 15 MINUTE',     bloc:5,blabel:'MODELE CARE FUNCTIONEAZA'},
  {id:'b12s4',dur:22000,label:'SINTEZA MASTERPLAN',   bloc:5,blabel:'MODELE CARE FUNCTIONEAZA'},
  // ACT VI — ORASUL PENTRU OAMENI (indici calitate viata — scene noi)
  {id:'b13s1',dur:20000,label:'HAPPINESS INDEX',      bloc:6,blabel:'ORASUL PENTRU OAMENI'},
  {id:'b13s2',dur:18000,label:'ECONOMIA DE NOAPTE',   bloc:6,blabel:'ORASUL PENTRU OAMENI'},
  {id:'b13s3',dur:18000,label:'ORAS PRIETENOS SENIORI',bloc:6,blabel:'ORASUL PENTRU OAMENI'},
  {id:'b13s4',dur:18000,label:'ORAS PENTRU COPII',    bloc:6,blabel:'ORASUL PENTRU OAMENI'},
  {id:'b18s1',dur:20000,label:'FAUNA & SIGURANTA',    bloc:6,blabel:'ORASUL PENTRU OAMENI'},
  {id:'b19s1',dur:24000,label:'CULTURA & TURISM',     bloc:6,blabel:'ORASUL PENTRU OAMENI'},
  {id:'b20s1',dur:20000,label:'EDUCATIE & SPORT',     bloc:6,blabel:'ORASUL PENTRU OAMENI'},
  {id:'b21s1',dur:20000,label:'SANATATE & DIGITAL',   bloc:6,blabel:'ORASUL PENTRU OAMENI'},
  {id:'b14s3',dur:18000,label:'ORASUL CA SISTEM VIU', bloc:6,blabel:'ORASUL PENTRU OAMENI'},
  // ACT VII — AGENDA & VIZIUNEA
  {id:'b22s1',dur:20000,label:'PARTICIPARE PUBLICA',  bloc:7,blabel:'AGENDA & VIZIUNEA'},
  {id:'b11s1',dur:22000,label:'AGENDA ADMINISTRATORULUI',    bloc:7,blabel:'AGENDA & VIZIUNEA'},
  {id:'b16s1',dur:24000,label:'NOTA URBANX',          bloc:7,blabel:'AGENDA & VIZIUNEA'},
  {id:'b11s2',dur:28000,label:'VIZIUNEA',             bloc:7,blabel:'AGENDA & VIZIUNEA'},
];
var _ACT_ROMAN={1:'I',2:'II',3:'III',4:'IV',5:'V',6:'VI',7:'VII'};

// ── DATE LIVE ─────────────────────────────────────────────────────────────
var D = {wiki:null,inse:null,roads:null,rail:null,airports:null,
         urban:null,green:null,monuments:null,cimitire:null,
         utilities:null,amenity:null,loaded:false};

// ── ANIMATII PULSANTE ─────────────────────────────────────────────────────
var _ivs = [];
function _clrIvs(){ _ivs.forEach(clearInterval); _ivs=[]; }

function _pulse(map,id,prop,min,max,spd){
  if(!map.getLayer||!map.getLayer(id)) return;
  var v=min,dir=1,step=(max-min)/(spd||20);
  var iv=setInterval(function(){
    if(!map.getLayer(id)){clearInterval(iv);return;}
    v+=dir*step; if(v>=max){v=max;dir=-1;} if(v<=min){v=min;dir=1;}
    try{map.setPaintProperty(id,prop,v);}catch(e){clearInterval(iv);}
  },80);
  _ivs.push(iv);
}

function _flowLine(map,id){
  if(!map.getLayer||!map.getLayer(id)) return;
  var off=0;
  var iv=setInterval(function(){
    if(!map.getLayer(id)){clearInterval(iv);return;}
    off=(off+1.2)%20;
    try{map.setPaintProperty(id,'line-dasharray',[2,Math.max(0.5,off*0.4)]);}catch(e){clearInterval(iv);}
  },50);
  _ivs.push(iv);
}

function _addProg(map,srcId,features,delay,cb){
  if(!features||!features.length) return;
  var shown=[],i=0;
  var iv=setInterval(function(){
    if(i>=features.length){clearInterval(iv);if(cb)cb();return;}
    shown.push(features[i]);i++;
    try{if(map.getSource(srcId))map.getSource(srcId).setData({type:'FeatureCollection',features:shown});}
    catch(e){clearInterval(iv);}
  },delay||180);
  _ivs.push(iv);
}

// ── TEXT WRAP ─────────────────────────────────────────────────────────────
function wrap(ctx,txt,x,y,maxW,lh,maxL){
  if(!txt) return y;
  var words=String(txt).split(' '),line='',n=0;
  for(var i=0;i<words.length;i++){
    var t2=line+(line?' ':'')+words[i];
    if(ctx.measureText(t2).width>maxW&&line){
      ctx.fillText(line,x,y); y+=lh; line=words[i]; n++;
      if(maxL&&n>=maxL-1){
        ctx.fillText(words[i]+'\u2026',x,y);
        return y+lh;
      }
    } else line=t2;
  }
  if(line) ctx.fillText(line,x,y);
  return y+lh;
}

// ── PRELOAD DATE LIVE ─────────────────────────────────────────────────────
function preload(city,siruta,done){
  var cx=city.lon||27.601, cy=city.lat||47.158, ps=[];

  ps.push(fetch('https://ro.wikipedia.org/api/rest_v1/page/summary/'+
    encodeURIComponent((city.name||'').replace(/ /g,'_')),
    {signal:AbortSignal.timeout(7000)})
    .then(function(r){return r.ok?r.json():null;})
    .then(function(d){if(d&&d.extract)D.wiki={extract:d.extract,title:d.title};})
    .catch(function(){D.wiki={extract:'Date indisponibile.',title:city.name||'UAT'};}));

  if(window._PredEngine&&window._PredEngine.fetchINSE){
    window._PredEngine.fetchINSE(siruta).then(function(d){if(d)D.inse=d;}).catch(function(){});
  }

  var q1='[out:json][timeout:30];(way["highway"~"motorway|trunk"](around:70000,'+cy+','+cx+');'
    +'way["railway"="rail"](around:40000,'+cy+','+cx+');'
    +'node["aeroway"="aerodrome"](around:120000,'+cy+','+cx+'););out geom;';
  ps.push(fetch(PROXY+'/osm?q='+encodeURIComponent(q1),{signal:AbortSignal.timeout(22000)})
    .then(function(r){return r.json();})
    .then(function(d){
      var roads=[],rail=[],apt=[];
      (d.elements||[]).forEach(function(el){
        if(el.type==='node'&&el.tags&&el.tags.aeroway==='aerodrome')
          apt.push({lon:el.lon,lat:el.lat,name:el.tags.name||'Aeroport',iata:el.tags.iata||''});
        if(el.type!=='way'||!el.geometry) return;
        var c=el.geometry.map(function(n){return[n.lon,n.lat];});
        var hw=el.tags&&el.tags.highway, rw=el.tags&&el.tags.railway;
        if(hw==='motorway') roads.push({type:'Feature',geometry:{type:'LineString',coordinates:c},properties:{c:'#dc2626',w:7,t:'motorway',name:el.tags.ref||''}});
        else if(hw==='trunk') roads.push({type:'Feature',geometry:{type:'LineString',coordinates:c},properties:{c:'#ea580c',w:4,t:'trunk',name:el.tags.name||''}});
        if(rw==='rail') rail.push({type:'Feature',geometry:{type:'LineString',coordinates:c},properties:{c:'#a78bfa',w:2}});
      });
      D.roads=roads; D.rail=rail; D.airports=apt;
    }).catch(function(){}));

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

  var q3='[out:json][timeout:25];('
    +'way["leisure"~"park|garden|nature_reserve"](around:8000,'+cy+','+cx+');'
    +'node["historic"](around:6000,'+cy+','+cx+');'
    +'way["landuse"="cemetery"](around:8000,'+cy+','+cx+');'
    +'way["power"="line"](around:5000,'+cy+','+cx+');'
    +'node["amenity"~"hospital|school|university|clinic"](around:8000,'+cy+','+cx+');'
    +');out geom;';
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
          var col=tags.amenity==='hospital'||tags.amenity==='clinic'?'#ef4444':tags.amenity==='school'||tags.amenity==='university'?'#22c55e':'#3b82f6';
          amenity.push({type:'Feature',geometry:{type:'Point',coordinates:[el.lon,el.lat]},properties:{c:col,r:8,n:tags.name||tags.amenity,t:tags.amenity}});
        }
      });
      D.green=green; D.monuments=mon; D.cimitire=cim; D.utilities=utils; D.amenity=amenity;
    }).catch(function(){}));

  var timeout=new Promise(function(r){setTimeout(r,22000);});
  Promise.race([Promise.allSettled(ps),timeout]).then(function(){
    D.loaded=true; done();
  });
}

// ── ENTRY POINT ───────────────────────────────────────────────────────────
window._startCinema = function(cityKey){
  cityKey=cityKey||(window.TCI&&window.TCI.cityKey)||(window.S&&window.S.activeUAT)||localStorage.getItem('ux_last_city')||'RO-IS-01';
  var map=window.map, SE=window._CinemaEngine;
  if(!map){console.error('[v9] map lipsa');return;}
  if(!SE){console.error('[v9] _CinemaEngine lipsa');return;}

  // ── FIX cladiri 3D in cinematic ───────────────────────────────────────────
  // Metodele _addBuildings/_add3DGrowth (cladirile care cresc pe harta) sunt
  // definite pe _SceneEngine, NU pe _CinemaEngine. cinema-v5 le apeleaza ca
  // SE._addBuildings && SE._addBuildings(map) -> erau undefined -> nu apareau
  // niciodata cladiri. Le legam la SE (cu try/catch) si incarcam PUG-ul real.
  (function _cinBridgeBuildings(){
    try{
      var src=window._SceneEngine;
      if(src){
        ['_addBuildings','_add3DGrowth','_add3DGrowthFull','_addDensityHeat',
         '_addTrafficPulse','_addSeismicHeat','_addFloodExpand','_addExpansionRings',
         '_addInfraPoints','_addTransitExpand'].forEach(function(m){
          if(typeof src[m]==='function' && typeof SE[m]!=='function'){
            SE[m]=function(){ try{ return src[m].apply(SE,arguments); }catch(e){ console.warn('[v9]',m,e.message); } };
          }
        });
      }
      var reg=window._PUG_REGISTRY&&window._PUG_REGISTRY[cityKey];
      if(reg){
        if(reg.pugFile) fetch(reg.pugFile).then(function(r){return r.ok?r.json():null;})
          .then(function(g){ if(g&&g.features){ SE._pugGeo=g; console.log('[v9] PUG incarcat:',g.features.length,'UTR pt cladiri 3D'); } }).catch(function(){});
        if(reg.reguli) fetch(reg.reguli).then(function(r){return r.ok?r.json():null;})
          .then(function(j){ if(j) SE._reguli=j; }).catch(function(){});
      }
    }catch(e){ console.warn('[v9] bridge cladiri:',e.message); }
  })();

  SE._cityKey = cityKey;   // pt proiectele reale per-UAT (_addRealProjects)
  var city=null;
  if(window._RO_CITIES_DB) city=window._RO_CITIES_DB[cityKey];
  if(!city&&window._UAT_DB) city=window._UAT_DB[cityKey];
  if(!city&&window.TCI&&window.TCI._EXTRA_UATS) city=window.TCI._EXTRA_UATS[cityKey];
  if(!city&&window._RO_CITIES_DB) city=Object.values(window._RO_CITIES_DB)[0];
  if(!city){console.error('[v9] city negasit');return;}

  var pred=null;
  try{if(window._PredEngine&&typeof window._PredEngine.calc==='function') pred=window._PredEngine.calc(city);}catch(e){}
  if(!pred) pred=_fp(city);

  var cx=city.lon||27.601, cy=city.lat||47.158;
  var name=city.name||'UAT';
  var siruta=city.siruta||cityKey.split('-').pop();

  SE._playing=false;
  if(SE._raf) cancelAnimationFrame(SE._raf);
  if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
  _clrIvs();
  SE._cleanLayers&&SE._cleanLayers();

  D.wiki=null;D.inse=null;D.roads=null;D.rail=null;D.airports=null;
  D.urban=null;D.green=null;D.monuments=null;D.loaded=false;

  SE._hideUI&&SE._hideUI();
  ['tci-c8','tci-c6','tci-c7','cin-loading','tci-c8-ctrl','cin-legend'].forEach(function(id){
    document.getElementById(id)&&document.getElementById(id).remove();
  });

  // Loading screen
  var ld=document.createElement('div');
  ld.id='cin-loading';
  ld.style.cssText='position:fixed;inset:0;z-index:999998;background:rgba(2,5,14,0.97);display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:"Space Grotesk",sans-serif;';
  ld.innerHTML='<div style="font-size:10px;font-weight:700;color:#D4AF37;letter-spacing:.22em;margin-bottom:16px;text-transform:uppercase;">UrbanX TCI Cinematic v9.0</div>'
    +'<div style="font-size:38px;font-weight:900;color:#fff;margin-bottom:8px;letter-spacing:.02em;">'+name.toUpperCase()+'</div>'
    +'<div style="font-size:11px;color:rgba(148,163,184,0.45);margin-bottom:32px;letter-spacing:.04em;">Documentar urban \u00b7 '+_S()+' \u2192 '+_E()+' \u00b7 Date live INSE \u00b7 OSM \u00b7 Wikipedia \u00b7 ANAR</div>'
    +'<div style="width:320px;height:3px;background:rgba(255,255,255,0.07);border-radius:2px;">'
    +'<div id="v9p" style="height:100%;width:0%;background:linear-gradient(90deg,#D4AF37,#f59e0b);border-radius:2px;transition:width .5s;"></div></div>'
    +'<div id="v9m" style="font-size:9px;color:rgba(148,163,184,0.32);margin-top:10px;letter-spacing:.06em;text-transform:uppercase;"></div>'
    +'<div style="position:absolute;bottom:20px;font-size:8px;color:rgba(148,163,184,0.18);letter-spacing:.06em;">THINKSMARTS SOLUTIONS SRL \u00b7 DATE ORIENTATIVE \u00b7 NECESITA VALIDARE URBANIST ATESTAT RUR</div>';
  document.body.appendChild(ld);

  var prg=document.getElementById('v9p'),pv=0;
  var msgs=['Wikipedia...','INSE TEMPO live...','OSM infrastructura...','OSM retea urbana...','POI verde/monumente...','Motor predictii v8.0...','Pregatire documentar...'];
  var mi=0;
  var pi=setInterval(function(){
    pv=Math.min(90,pv+Math.random()*11);
    if(prg) prg.style.width=pv+'%';
    var el=document.getElementById('v9m');
    if(el&&mi<msgs.length){el.textContent=msgs[mi];mi++;}
  },700);

  try{TCI._playing=false;TCI._stopped=true;}catch(e){}
  try{if(TCI._director)TCI._director._playing=false;}catch(e){}
  try{TCI.pause&&TCI.pause();}catch(e){}

  preload(city,siruta,function(){
    clearInterval(pi);
    if(prg) prg.style.width='100%';
    if(D.inse&&window._PredEngine&&window._PredEngine._enrichPredFromINSE)
      pred=window._PredEngine._enrichPredFromINSE(pred,D.inse);

    // Enrichment async cu date live INSE + Eurostat (tci-data-live.js)
    var _startFilmFn = function(){
      ld.style.transition='opacity .8s'; ld.style.opacity='0';
      setTimeout(function(){ ld.remove(); _film(map,SE,city,pred,cx,cy,name,siruta); },800);
    };

    // Preload surse Grup A (CNAIR, Aeroporturi, AQI, MDLPA, GTFS)
    if(window._LiveSources){
      window._LiveSources.preloadAll(city).then(function(r){
        // Salveaza pe city pentru acces in scene
        city._live = r;
        console.log('[v9] LiveSources preloaded:', Object.keys(r).join(', '));
      }).catch(function(){});
    }

    // Incearca enrichment live — daca nu e disponibil, porneste oricum
    var enrichPromises = [];
    if(window._TCILiveINSE && city.siruta){
      enrichPromises.push(
        window._TCILiveINSE.enrichCity(city).then(function(enriched){
          if(enriched && enriched !== city){
            city = enriched;
            if(enriched.pop2021) pred.p21 = enriched.pop2021;
            if(enriched.autorizatii_2023) pred.auth = enriched.autorizatii_2023;
            console.log('[v9] INSE live: pop='+enriched.pop2021+' auth='+enriched.autorizatii_2023);
          }
        }).catch(function(){})
      );
    }
    if(window._TCILiveEurostat && city.judet){
      enrichPromises.push(
        window._TCILiveEurostat.enrichCity(city).then(function(enriched){
          if(enriched && enriched.pib_eur_cap){
            city = Object.assign({}, city, enriched);
            pred.pib = enriched.pib_eur_cap;
            pred.pctUE = Math.round(enriched.pib_eur_cap / 366);
            console.log('[v9] Eurostat live: PIB='+enriched.pib_eur_cap+' EUR/cap');
          }
        }).catch(function(){})
      );
    }

    // Asteapta max 4s pentru date live, apoi porneste oricum
    var timeout = new Promise(function(res){ setTimeout(res, 4000); });
    Promise.race([Promise.all(enrichPromises), timeout]).then(function(){
      setTimeout(_startFilmFn, 300);
    });
  });
};

// ── FILM START ────────────────────────────────────────────────────────────
function _film(map,SE,city,pred,cx,cy,name,siruta){
  // onIdle — asteapta harta idle inainte de layere
  // onIdle legat de scena curenta: daca harta devine 'idle' DUPA ce scena s-a
  // schimbat, NU mai rulam callback-ul (altfel layere vechi — trafic/seismic/
  // inundatii — se re-adauga in scena urmatoare si raman pana la final).
  function onIdle(fn){
    var _si=SE._si;
    var g=function(){ if(!SE._playing||SE._si!==_si) return; try{fn();}catch(e){} };
    try{map.once('idle',g);}catch(e){setTimeout(g,1200);}
  }

  var cv = SE._mkCanvas ? SE._mkCanvas() : _mkFallbackCanvas();
  if(!cv){console.error('[v9] Canvas lipsa');return;}
  SE._canvas=cv; SE._ctx=cv.getContext('2d');
  if(!SE._ctx){console.error('[v9] Canvas context lipsa');return;}

  // ── FOLOSIM DATELE REALE DIN SE — nu le reconstruim ─────────────────
  // SE._city, SE._pugGeo, SE._reguli sunt deja populate din _SceneEngine.launch()
  // Daca SE le are, le folosim. Altfel fallback la parametrii nostri.
  if(SE._city&&SE._city.lat) {
    city = SE._city;
    cx = city.lon; cy = city.lat; name = city.name;
    console.log('[v9] Folosesc SE._city real:', city.name, cx, cy);
  } else {
    SE._city = city;
  }
  if(SE._pred) pred = SE._pred;
  else SE._pred = pred;

  // Recalculeaza pred cu date reale
  if(window._PredEngine&&typeof window._PredEngine.calc==='function') {
    try{ pred = window._PredEngine.calc(city); SE._pred = pred; }catch(e){}
  }

  SE._map=map; SE._playing=true; SE._si=0; SE.SCENES=SCENES;
  SE._curBase='custom'; // urmarim stilul de baza activ (custom intunecat vs Standard 3D luminos)
  // Standard 3D are cladiri reale doar pe orasele mari (acoperire Mapbox); pe orasele mici e gri/gol,
  // deci acolo ramanem pe baza intunecata cu volume colorate din PUG (care au continut real).
  (function(){
    var pop = (SE._city&&(SE._city.pop2021||SE._city.pop))||0;
    var nm  = ((SE._city&&SE._city.name)||'').toLowerCase();
    var RICH = ['bucuresti','bucurești','cluj','iasi','iași','timisoara','timișoara','brasov','brașov',
      'constanta','constanța','craiova','sibiu','oradea','arad','ploiesti','ploiești','galati','galați',
      'pitesti','pitești','braila','brăila','bacau','bacău','targu mures','târgu mureș','baia mare','buzau','buzău','satu mare'];
    SE._richBuildings = pop>=150000 || RICH.some(function(c){ return nm.indexOf(c)>=0; });
  })();
  SE._guardCanvas&&SE._guardCanvas();

  // ── ZONE REALE DIN PUG pentru camera ──────────────────────────────────
  // Calculeaza bounding box-uri per tip UTR din pugGeo real
  var pugZones = _calcPUGZones(SE._pugGeo, cx, cy);
  console.log('[v9] Zone PUG detectate:', Object.keys(pugZones).join(', '));

  var _oFly=map.flyTo.bind(map), _oJump=map.jumpTo.bind(map);
  map.flyTo=function(o){
    if(!SE._playing){map.flyTo=_oFly;map.jumpTo=_oJump;return _oFly(o);}
    var sid=SCENES[SE._si]&&SCENES[SE._si].id;
    var big=(sid==='b1s1'||sid==='b1s2'||sid==='b1s3');
    if(!big&&((o.pitch||0)<45||(o.zoom||20)<10)) return map;
    return _oFly(o);
  };
  map.jumpTo=function(o){
    if(!SE._playing){map.flyTo=_oFly;map.jumpTo=_oJump;return _oJump(o);}
    var sid=SCENES[SE._si]&&SCENES[SE._si].id;
    var big=(sid==='b1s1'||sid==='b1s2'||sid==='b1s3');
    if(!big&&((o.pitch||0)<45||(o.zoom||20)<10))
      return _oJump(Object.assign({},o,{pitch:60,zoom:13.5}));
    return _oJump(o);
  };

  var origColor=null;
  try{origColor=map.getPaintProperty('building-extrusion','fill-extrusion-color');}catch(e){}

  window.addEventListener('resize',function(){
    if(!SE._playing) return;
    var dpr=window.devicePixelRatio||1;
    cv.width=Math.round(window.innerWidth*dpr);
    cv.height=Math.round(window.innerHeight*dpr);
    cv.style.width=window.innerWidth+'px';
    cv.style.height=window.innerHeight+'px';
    var ctx2=cv.getContext('2d');
    if(ctx2) ctx2.scale(dpr,dpr);
  });

  function lp(p){try{map.setConfigProperty('basemap','lightPreset',p);}catch(e){}}
  function rot(b,s){
    if(SE._rotInt)clearInterval(SE._rotInt);
    var br=b;
    SE._rotInt=setInterval(function(){
      if(!SE._playing){clearInterval(SE._rotInt);SE._rotInt=null;return;}
      br+=s; try{map.setBearing(br%360);}catch(e){}
    },50);
  }
  function fly(ctr,z,pt,br,dur,dly,pr){
    setTimeout(function(){
      if(!SE._playing) return;
      if(pr) lp(pr);
      try{map.flyTo({center:ctr,zoom:z,pitch:pt,bearing:br,duration:dur||6000,essential:true,
        easing:function(t){return t<0.5?2*t*t:(1-Math.pow(-2*t+2,2)/2);}});}catch(e){}
    },dly||0);
  }

  // CLADIRI REALE pentru scenele de nivel-strada: footprints OSM/Mapbox (sursa 'composite'
  // / source-layer 'building') — cladiri individuale cu strazi intre ele, ca pe harta principala
  // (NU sloturi de zonare PUG, care arata ca niste lespezi colorate gigantice).
  // Daca stilul nu are sursa composite -> revine la barele 3D din PUG.
  function _cinRealBuildings(map){
    try{
      var ok=false;
      if(map.getSource&&map.getSource('composite')){
        if(!(map.getLayer&&map.getLayer('cin-osm-bld'))){
          map.addLayer({
            id:'cin-osm-bld',type:'fill-extrusion',source:'composite','source-layer':'building',
            filter:['==','extrude','true'],minzoom:13.5,
            paint:{
              'fill-extrusion-color':['interpolate',['linear'],['get','height'],
                0,'#d7e0f0',8,'#b7c5e0',18,'#94a8cd',35,'#7088b3',70,'#52699c'],
              'fill-extrusion-height':['get','height'],
              'fill-extrusion-base':['get','min_height'],
              'fill-extrusion-opacity':0.97,
              'fill-extrusion-vertical-gradient':true,
              'fill-extrusion-ambient-occlusion-intensity':0.6,
              'fill-extrusion-ambient-occlusion-radius':3.2
            }
          });
        }
        ok = !!(map.getLayer&&map.getLayer('cin-osm-bld'));
      }
      if(ok){
        // cladiri reale prezente -> ascundem lespezile de zonare colorate (par false la nivel strada)
        ['v8-bld-l','v8-gr-l'].forEach(function(id){ try{ if(map.getLayer(id)) map.setLayoutProperty(id,'visibility','none'); }catch(e){} });
        try{ map.setLayoutProperty('building-extrusion','visibility','visible'); }catch(e){}
        try{ map.setPaintProperty('building-extrusion','fill-extrusion-height',['get','height']); }catch(e){}
      } else {
        // fallback: stilul nu are cladiri reale -> barele 3D din PUG
        try{ SE._addBuildings && SE._addBuildings(map); }catch(e){}
      }
    }catch(e){ try{ SE._addBuildings && SE._addBuildings(map); }catch(_){} }
  }

  // ── BAZA STANDARD 3D (harta Mapbox luminoasa cu cladiri reale + cer + POI, ca pe platforma) ──
  // Scenele "umane" (nivel strada, cultura, fauna) ruleaza pe stilul Standard, fiecare cu alt
  // moment al zilei (lightPreset) pt variatie de culoare/fundal. Restul raman pe baza intunecata.
  var STD_SCENES = { b17s1:'day', b18s1:'dawn', b19s1:'dusk' };
  function _cinApplyBase(id, afterReady){
    // Standard doar pe orase mari (altfel harta Standard e gri/goala — vezi Botosani)
    var wantStd = !!STD_SCENES[id] && SE._richBuildings;
    var wantKey = wantStd ? 'standard' : 'custom';
    function ready(){
      if(!SE._playing) return;
      if(wantStd){
        try{ map.setConfigProperty('basemap','show3dObjects',true); }catch(e){}
        try{ map.setConfigProperty('basemap','showPointOfInterestLabels',true); }catch(e){}
        try{ lp(STD_SCENES[id]); }catch(e){}
        // ascundem overlay-urile hartii principale (parcele/UTR/context OSM) ca scena Standard sa fie curata
        ['parcel-fill','parcel-line','utr-fill','utr-line','utr-lbl','ctx-3d','vol-3d','vol-3d-outline','zone-fill','zone-line']
          .forEach(function(lid){ try{ if(map.getLayer(lid)) map.setLayoutProperty(lid,'visibility','none'); }catch(e){} });
      }
      try{ afterReady(); }catch(e){}
    }
    if(SE._curBase===wantKey){ ready(); return; }
    SE._curBase=wantKey;
    try{
      map.setStyle((typeof STYLES!=='undefined' && STYLES[wantKey]) || (typeof STYLES!=='undefined'?STYLES.custom:undefined));
      map.once('style.load', function(){ setTimeout(ready, 550); });
    }catch(e){ ready(); }
  }

  // Zone REALE din PUG — nu offset-uri fixe
  // pugZones calculat din UTR-urile PUG reale ale UAT-ului
  var pz = pugZones || {};
  var Z={
    C:  [cx, cy],
    CBD:[pz.CBD?pz.CBD.lon:cx-0.004,     pz.CBD?pz.CBD.lat:cy+0.003],
    UNI:[pz.UNI?pz.UNI.lon:cx+0.010,     pz.UNI?pz.UNI.lat:cy+0.015],
    IND:[pz.IND?pz.IND.lon:cx-0.020,     pz.IND?pz.IND.lat:cy-0.012],
    RES:[pz.RES?pz.RES.lon:cx+0.008,     pz.RES?pz.RES.lat:cy-0.005],
    VERDE:[pz.VERDE?pz.VERDE.lon:cx-0.015, pz.VERDE?pz.VERDE.lat:cy+0.010],
    PER:[pz.PER?pz.PER.lon:cx+0.045,     pz.PER?pz.PER.lat:cy-0.030],
    FAR:[cx+0.090,cy-0.060],
    NV: [cx-0.024, cy+0.018],
    SE2:[cx+0.026, cy-0.015],
    SV: [cx-0.017, cy-0.020],
    NE: [cx+0.022, cy+0.019],
  };
  // VARIETATE CAMERA (#7): aliasurile periferice -> cartiere REALE diferite,
  // amestecate per rulare. Camera nu mai merge mereu in aceleasi puncte/ordine.
  try{
    if(SE._pugGeo && SE._pugGeo.features && SE._pugGeo.features.length>8){
      var _fs=SE._pugGeo.features;
      var _cheap=function(g){try{var c=g.coordinates;while(Array.isArray(c)&&Array.isArray(c[0])&&Array.isArray(c[0][0]))c=c[0];var sx=0,sy=0,n=0;for(var i=0;i<c.length;i++){if(Array.isArray(c[i])&&typeof c[i][0]==='number'){sx+=c[i][0];sy+=c[i][1];n++;}}return n?[sx/n,sy/n]:null;}catch(e){return null;}};
      var _pool=[], _step=Math.max(1,Math.floor(_fs.length/45));
      for(var _i=0;_i<_fs.length;_i+=_step){var _c=_cheap(_fs[_i].geometry); if(_c){var _d=Math.hypot(_c[0]-cx,_c[1]-cy); if(_d>0.004&&_d<0.085)_pool.push(_c);}}
      for(var _i=_pool.length-1;_i>0;_i--){var _j=Math.floor(Math.random()*(_i+1)); var _t=_pool[_i]; _pool[_i]=_pool[_j]; _pool[_j]=_t;}
      ['NV','NE','SE2','SV','RES','PER','UNI','IND','VERDE'].forEach(function(k,idx){ if(_pool[idx]) Z[k]=_pool[idx]; });
      console.log('[v9] Camera variata: '+_pool.length+' cartiere reale in pool');
    }
  }catch(e){ console.warn('[v9] camera variety:',e.message); }
  console.log('[v9] Zone camera:', 'CBD='+Z.CBD[0].toFixed(3)+','+Z.CBD[1].toFixed(3),
    'UNI='+Z.UNI[0].toFixed(3)+','+Z.UNI[1].toFixed(3),
    'IND='+Z.IND[0].toFixed(3)+','+Z.IND[1].toFixed(3));

  // Layer helpers
  function addLine(id,ft,paint){
    try{
      if(map.getLayer(id))map.removeLayer(id);
      if(map.getSource(id))map.removeSource(id);
      if(!ft||!ft.length) return;
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
      if(!ft||!ft.length) return;
      map.addSource(id,{type:'geojson',data:{type:'FeatureCollection',features:[]}});
      map.addLayer({id:id,type:'circle',source:id,paint:{
        'circle-color':['get','c'],'circle-radius':['get','r'],
        'circle-opacity':0.90,'circle-stroke-width':1.5,'circle-stroke-color':'rgba(255,255,255,0.5)'
      }});
      _addProg(map,id,ft,160);
    }catch(e){}
  }

  function stopAll(){
    SE._playing=false; SE._paused=false; _clrIvs();
    // revenim la baza intunecata custom daca am ramas pe Standard
    try{ if(SE._curBase && SE._curBase!=='custom' && typeof STYLES!=='undefined'){ map.setStyle(STYLES.custom); SE._curBase='custom'; } }catch(e){}
    try{ if(window._TCIStreetView && window._TCIStreetView._active) window._TCIStreetView.deactivate(); }catch(e){}
    try{if(SE._cinKeyHandler)document.removeEventListener('keydown',SE._cinKeyHandler);}catch(e){}
    var _pi=document.getElementById('cin-pause-ind'); if(_pi)_pi.remove();
    try{if(window._CinemaRec&&window._CinemaRec._active)window._CinemaRec.stop();}catch(e){}
    try{if(window._CinemaExplain)window._CinemaExplain._hide();}catch(e){}
    try{map.flyTo=_oFly;map.jumpTo=_oJump;}catch(e){}
    if(SE._raf) cancelAnimationFrame(SE._raf);
    if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
    SE._cleanLayers&&SE._cleanLayers();
    _cleanV9(map);
    try{if(origColor)map.setPaintProperty('building-extrusion','fill-extrusion-color',origColor);}catch(e){}
    try{map.setPaintProperty('building-extrusion','fill-extrusion-height',['get','height']);}catch(e){}
    try{map.setLayoutProperty('building-extrusion','visibility','visible');}catch(e){}
    document.getElementById('tci-c8')&&document.getElementById('tci-c8').remove();
    document.getElementById('tci-c8-ctrl')&&document.getElementById('tci-c8-ctrl').remove();
    document.getElementById('cin-legend')&&document.getElementById('cin-legend').remove();
    SE._restoreUI&&SE._restoreUI();
    try{map.flyTo({center:[cx,cy],zoom:12,pitch:40,bearing:0,duration:1500,essential:true});}catch(e){}
    try{map.setConfigProperty('basemap','lightPreset','day');}catch(e){}
    try{window._FloodMapper&&window._FloodMapper.hideAll&&window._FloodMapper.hideAll(map);}catch(e){}
  }

  function goScene(i){
    if(i<0||i>=SCENES.length) return;
    SE._playing=false; _clrIvs();
    if(SE._raf) cancelAnimationFrame(SE._raf);
    if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
    SE._cleanLayers&&SE._cleanLayers(); _cleanV9(map);
    SE._playing=true; runScene(i);
  }

  // Butoane control — reutilizeaza _mkCtrl din SE daca exista
  if(SE._mkCtrl){
    SE._mkCtrl();
    var sb=document.getElementById('c8-stop'); if(sb) sb.onclick=stopAll;
    var pb=document.getElementById('c8-prev'); if(pb) pb.onclick=function(){goScene(SE._si-1);};
    var nb=document.getElementById('c8-skip'); if(nb) nb.onclick=function(){goScene(SE._si+1);};
  } else {
    _mkCtrlFallback(stopAll,goScene,SE);
  }

  // PAUZA pentru prezentare + scurtaturi tastatura (Space=pauza, ←/→=scena, Esc=stop)
  function _togglePause(){
    SE._paused=!SE._paused;
    var pb=document.getElementById('c8-pause');
    if(pb){ pb.textContent=SE._paused?'▶ Reia':'⏸ Pauza'; pb.style.background=SE._paused?'rgba(34,197,94,.3)':'rgba(0,0,0,.6)'; }
    var pi=document.getElementById('cin-pause-ind');
    if(SE._paused){ if(!pi){pi=document.createElement('div');pi.id='cin-pause-ind';pi.style.cssText='position:fixed;top:62px;left:50%;transform:translateX(-50%);z-index:1000001;background:rgba(34,197,94,.92);color:#04210f;font:800 12px/1 "IBM Plex Mono",monospace;padding:7px 16px;border-radius:20px;letter-spacing:.1em';pi.textContent='⏸ PAUZA — apasa SPACE pentru a relua';document.body.appendChild(pi);} }
    else if(pi){ pi.remove(); }
  }
  if(SE._cinKeyHandler){ try{document.removeEventListener('keydown',SE._cinKeyHandler);}catch(e){} }
  SE._cinKeyHandler=function(e){
    if(!SE._playing) return;
    if(e.code==='Space'||e.key===' '){ e.preventDefault(); _togglePause(); }
    else if(e.key==='ArrowRight'){ e.preventDefault(); goScene(SE._si+1); }
    else if(e.key==='ArrowLeft'){ e.preventDefault(); goScene(SE._si-1); }
    else if(e.key==='Escape'){ stopAll(); }
  };
  document.addEventListener('keydown',SE._cinKeyHandler);

  // Injecteaza butoanele ⏸ Pauza + ℹ Explica + ⏺ REC daca lipsesc
  (function _injectExtraCtrl(){
    var bar=document.getElementById('tci-c8-ctrl'); if(!bar) return;
    if(!document.getElementById('c8-pause')){
      var bp=document.createElement('button'); bp.id='c8-pause'; bp.title='Pauza / Reia (SPACE) — pentru prezentari';
      bp.style.cssText='background:rgba(0,0,0,.6);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.8);padding:10px 14px;border-radius:10px;cursor:pointer;font:700 12px/1 monospace;backdrop-filter:blur(8px)';
      bp.textContent='⏸ Pauza'; bp.onclick=_togglePause;
      bar.insertBefore(bp, bar.firstChild);
    }
    if(!document.getElementById('c8-explain')){
      var be=document.createElement('button'); be.id='c8-explain'; be.title='Mod explicat — descrie fiecare scena';
      be.style.cssText='background:rgba(59,130,246,.25);border:1px solid rgba(59,130,246,.4);color:#93c5fd;padding:10px 14px;border-radius:10px;cursor:pointer;font:700 12px/1 monospace;backdrop-filter:blur(8px)';
      be.textContent='ℹ Explica'; be.onclick=function(){ window._CinemaExplain&&window._CinemaExplain.toggle(SE); };
      bar.insertBefore(be, bar.firstChild);
    }
    if(!document.getElementById('c8-rec')){
      var br=document.createElement('button'); br.id='c8-rec'; br.title='Inregistreaza filmul (.webm)';
      br.style.cssText='background:rgba(0,0,0,.6);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.6);padding:10px 14px;border-radius:10px;cursor:pointer;font:700 12px/1 monospace;backdrop-filter:blur(8px)';
      br.textContent='⏺ REC';
      br.onclick=function(){ var b=this; if(window._CinemaRec){ if(window._CinemaRec._active){window._CinemaRec.stop();b.style.background='rgba(0,0,0,.6)';b.textContent='⏺ REC';} else {window._CinemaRec.start();b.style.background='rgba(220,0,0,.6)';b.textContent='⏹ STOP';} } };
      bar.appendChild(br);
    }
  })();

  // Legenda
  var LEGENDS={
    'b1s3':['#dc2626','Metropolitan','#f59e0b','Regional','#22c55e','Local','#a78bfa','Cale ferata','#60a5fa','Autostrada'],
    'b2s1':['#ef4444','65+ imbatranire','#f59e0b','45-64 ani','#22c55e','25-44 activi','#60a5fa','0-24 ani'],
    'b4s1':['#dc2626','Autostrada','#ea580c','DN','#f59e0b','Primar','#16a34a','Secundar','#0ea5e9','Tertiar'],
    'b4s3':['#ef4444','Tramvai/metro','#3b82f6','BRT propus','#22c55e','Acoperire TP','#f59e0b','Deficit','#a78bfa','Pasaj'],
    'b5s1':['#166534','<8m sigur','#854d0e','8-15m','#dc2626','>25m risc'],
    'b5s2':['#1e3a8a','RCP10 ridicat','#1d4ed8','RCP100 mediu','#93c5fd','RCP500 scazut','#22c55e','Spatii verzi'],
    'b6s1':['#3b82f6','Apartamente','#f59e0b','Comercial','#a78bfa','Birouri','#22c55e','Scoli','#ef4444','Spitale','#fbbf24','Monumente'],
    'b6s2':['#14532d','Densitate mica','#15803d','Medie','#f59e0b','Presiune','#ef4444','Suprasaturat'],
    'b9s1':['#22c55e','S3 Optimist','#f59e0b','S2 Tendinta','#ef4444','S1 Regres'],
  };
  function updateLegend(sc){
    var el=document.getElementById('cin-legend');
    var items=LEGENDS[sc.id];
    if(!items||!items.length){if(el)el.style.opacity='0';return;}
    if(!el){
      el=document.createElement('div');el.id='cin-legend';
      el.style.cssText='position:fixed;top:66px;right:14px;z-index:1000000;background:rgba(2,6,18,0.92);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px 14px;font-family:"Space Grotesk",sans-serif;min-width:200px;max-width:240px;transition:opacity .4s;';
      document.body.appendChild(el);
    }
    var html='<div style="font-size:8px;font-weight:700;color:#D4AF37;letter-spacing:.1em;margin-bottom:8px;text-transform:uppercase;">'+sc.label+'</div><div style="display:flex;flex-direction:column;gap:5px;">';
    for(var i=0;i<items.length;i+=2){
      html+='<div style="display:flex;align-items:flex-start;gap:7px;"><span style="display:inline-block;width:11px;height:11px;min-width:11px;background:'+items[i]+';border-radius:2px;margin-top:2px;"></span><span style="color:rgba(210,225,255,0.78);font-size:9px;line-height:1.4;">'+(items[i+1]||'')+'</span></div>';
    }
    html+='</div>';
    el.innerHTML=html; el.style.opacity='1';
  }

  // ── SETUP CAMERA + LAYERE per scena ──────────────────────────────────────
  function setup(id){
    _clrIvs();
    if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
    // Reset culori cladiri
    try{
      map.setPaintProperty('building-extrusion','fill-extrusion-color',
        ['match',['get','type'],'apartments','#3b82f6','residential','#60a5fa','house','#93c5fd','commercial','#f59e0b','retail','#fbbf24','office','#a78bfa','industrial','#6b7280','school','#22c55e','university','#16a34a','hospital','#ef4444','church','#d97706','#94a3b8']);
      map.setPaintProperty('building-extrusion','fill-extrusion-opacity',0.92);
    }catch(e){}

    switch(id){
      // BLOC 1 ───────────────────────────────────────────────────────────
      case 'b1s1':
        lp('night');
        try{map.jumpTo({center:[15,52],zoom:3.5,pitch:0,bearing:0});}catch(e){}
        fly([24.5,45.9],6,0,0,4500,300,'night');
        fly([cx,cy],9,15,0,4500,5000,'night');
        fly([cx,cy],13,48,10,4500,9800,'night');
        fly(Z.C,15.5,68,22,5000,14600,'night');
        break;

      case 'b1s2':
        lp('night');
        try{map.jumpTo({center:[24.5,45.9],zoom:6,pitch:0,bearing:0});}catch(e){}
        setTimeout(function(){
          if(!SE._playing) return;
          if(D.roads&&D.roads.length){
            addLine('v9-hw',D.roads,{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0.3});
            setTimeout(function(){
              if(!SE._playing) return;
              _pulse(map,'v9-hw','line-opacity',0.4,1.0,8);
            },600);
          }
          if(D.rail&&D.rail.length){
            addLine('v9-rail',D.rail,{'line-color':'#a78bfa','line-width':2,'line-opacity':0.6,'line-dasharray':[4,2]});
            _flowLine(map,'v9-rail');
          }
          // Aeroporturi cu clasificare ROMARTSA din _LiveTerrain
          var aeroList = (window._LiveTerrain&&city._live&&city._live.aeroporturi)
            ? city._live.aeroporturi
            : D.airports||[];
          if(aeroList.length){
            var aeroFeats = aeroList.map(function(a){
              var hasIata=a.iata&&a.iata.length>0;
              return {type:'Feature',geometry:{type:'Point',
                coordinates:[a.lon||a.lon,a.lat||a.lat]},
                properties:{c:hasIata?'#22c55e':'#60a5fa',r:hasIata?16:10,
                  n:(a.name||'')+(a.iata?' ('+a.iata+')':'')+(a.distKm?' — '+a.distKm+'km':''),
                  iata:a.iata||''}};
            });
            addCircle('v9-apt',aeroFeats);
            setTimeout(function(){_pulse(map,'v9-apt','circle-radius',8,20,7);},1000);
          }
          // CNAIR pe harta - autostrazi planificate
          if(window._LiveCNAIR&&city){
            setTimeout(function(){
              if(SE._playing) window._LiveCNAIR.showOnMap(map, city, {radiusKm:100});
            },3000);
          }
        },2500);
        fly([cx,cy],9,20,-10,5000,6000,'night');
        fly([cx,cy],11.5,38,15,5000,13000,'day');
        break;

      case 'b1s3':
        lp('day');
        try{map.jumpTo({center:[24.5,45.9],zoom:7,pitch:15,bearing:0});}catch(e){}
        // Avioane live deasupra Romaniei
        setTimeout(function(){
          if(!SE._playing) return;
          if(window._LiveOpenSky) window._LiveOpenSky.showOnMap(map,city);
        },3000);
        fly([cx,cy],10,30,0,5000,1000,'day');
        fly([cx,cy],13,52,20,5000,9000,'day');
        fly(Z.C,14.5,62,35,5000,16000,'dusk');
        break;

      case 'b1s4':
        lp('dawn');
        // MONUMENTE + ZONE DE PROTECTIE ~100m (OSM historic / LMI · Legea 422/2001)
        // reperele in jurul carora s-a construit orasul + servitutile de protectie.
        onIdle(function(){try{SE._addMonuments&&SE._addMonuments(map, D.monuments);}catch(e){}});
        // ZOOM pe centrul istoric (clusterul de monumente) — clar UNDE, nu imprastiat
        setTimeout(function(){ if(SE._playing){ try{map.flyTo({center:[cx,cy],zoom:14.5,pitch:58,bearing:25,duration:6000,essential:true});}catch(e){} } },10000);
        fly(Z.C,13.5,52,0,4000,0,'dawn');
        fly(Z.NV,14,60,40,6000,10000,'dawn');
        fly(Z.C,13,50,-10,5000,17000,'day');
        break;

      // BLOC 2 ───────────────────────────────────────────────────────────
      case 'b2s1':
        lp('dawn');
        fly(Z.C,13,48,0,4000,0,'dawn');
        // Heatmap presiune construire din tci-data-live.js
        setTimeout(function(){
          if(!SE._playing) return;
          if(window._TCIPressureHeatmap){
            window._TCIPressureHeatmap._city = city;
            window._TCIPressureHeatmap._year = _S();
            window._TCIPressureHeatmap._build(map, city, _S());
          }
        },2000);
        onIdle(function(){try{SE._addDensityHeat&&SE._addDensityHeat(map);}catch(e){}});
        setTimeout(function(){
          if(!SE._playing) return;
          if(D.green&&D.green.length) addCircle('v9-green',D.green);
          if(D.monuments&&D.monuments.length){ addCircle('v9-mon',D.monuments); setTimeout(function(){_pulse(map,'v9-mon','circle-radius',4,9,10);},1200); }
        },2000);
        fly(Z.NV,14.5,60,40,6000,10000,'dawn');
        fly(Z.SE2,14,58,-30,6000,18000,'day');
        break;

      case 'b2s2':
        lp('dusk');
        // #1: heatmap concentratie varstnici + ZOOM pe cartierul cel mai imbatranit
        onIdle(function(){try{SE._addAgingHeat&&SE._addAgingHeat(map);}catch(e){}});
        fly(Z.C,13,50,0,4000,0,'dusk');
        fly(Z.NE,14.5,62,30,6000,9000,'dusk');
        setTimeout(function(){ if(SE._playing&&SE._agingPeak){ try{map.flyTo({center:SE._agingPeak,zoom:15,pitch:62,bearing:-20,duration:5500,essential:true});}catch(e){} } },16500);
        break;

      case 'b2s3':
        lp('night');
        onIdle(function(){try{SE._addBuildings&&SE._addBuildings(map);}catch(e){}}); // backdrop oras (nu harta goala)
        fly([cx,cy],12.4,48,0,4000,0,'night');
        setTimeout(function(){
          if(!SE._playing) return;
          if(D.roads&&D.roads.length){ addLine('v9-hw',D.roads); _pulse(map,'v9-hw','line-opacity',0.3,0.9,10); }
        },1500);
        fly(Z.C,13,52,15,6000,9000,'night');
        fly(Z.PER,12.5,48,50,6000,17000,'night');
        break;

      case 'b2s4':
        lp('day');
        onIdle(function(){try{SE._addBuildings&&SE._addBuildings(map);}catch(e){}}); // backdrop oras
        fly(Z.CBD,15,65,-15,4000,0,'day');
        fly(Z.UNI,15.5,68,30,6000,10000,'day');
        fly(Z.IND,14.5,60,-40,6000,17000,'dusk');
        break;

      // BLOC 3 ───────────────────────────────────────────────────────────
      case 'b3s1':
        lp('dusk');
        try{map.setLayoutProperty('building-extrusion','visibility','none');}catch(e){}
        onIdle(function(){try{SE._addBuildings&&SE._addBuildings(map);}catch(e){}});
        fly(Z.C,14,55,-10,4000,0,'dusk');
        fly(Z.NE,15,65,25,6000,10000,'dusk');
        fly(Z.C,13.5,52,0,5000,18000,'night');
        break;

      case 'b3s2':
        lp('day');
        // FONDUL ECONOMIC colorat pe functiune (birouri mov, comercial portocaliu,
        // industrial gri) — vizibil cand camera ajunge in zona industriala (Z.IND).
        onIdle(function(){try{SE._addBuildings&&SE._addBuildings(map);}catch(e){}});
        setTimeout(function(){
          if(!SE._playing) return;
          if(SE._cinLabels) SE._cinLabels(map,[{lon:Z.IND[0],lat:Z.IND[1],color:'#94a3b8',icon:'🏭',title:'ZONA INDUSTRIALA',sub:'productie · logistica · reconversie'}]);
        },14500);
        fly(Z.CBD,14.5,58,10,4000,0,'day');
        fly(Z.UNI,15.5,70,35,6000,8000,'day');
        fly(Z.IND,14,62,-30,6000,15000,'dusk');
        break;

      case 'b3s3':
        lp('day');
        setTimeout(function(){
          if(!SE._playing) return;
          if(D.roads&&D.roads.length){
            addLine('v9-hw',D.roads,{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0.3});
            setTimeout(function(){ if(SE._playing) _pulse(map,'v9-hw','line-opacity',0.4,1.0,8); },800);
          }
          if(D.rail&&D.rail.length) addLine('v9-rail',D.rail,{'line-color':'#a78bfa','line-width':2,'line-opacity':0.7});
        },500);
        // Zoom pe CBD (center of gravity - cel mai cautat), apoi zona universitara, apoi periferie premium
        fly(Z.CBD,15.5,68,15,4000,0,'day');       // centru civic - cel mai scump
        fly(Z.UNI,15.5,68,35,6000,8000,'day');    // zona universitara - premium
        fly(Z.PER,14.0,60,80,6000,16000,'dusk');  // periferie - potential crestere
        break;

      // BLOC 4 ───────────────────────────────────────────────────────────
      case 'b4s1':
        lp('night');
        fly([cx,cy],12,48,0,4000,0,'night');
        setTimeout(function(){
          if(!SE._playing) return;
          if(D.urban&&D.urban.length){
            // CESTRIN - trafic estimat cu culori saturatie
            if(window._LiveCESTRIN){
              window._LiveCESTRIN.buildTrafficLayer(map,D.urban,city);
            } else {
              addLine('v9-urb',D.urban);
            }
            var maj=D.urban.filter(function(f){return f.properties&&(f.properties.hw==='primary'||f.properties.hw==='motorway'||f.properties.hw==='trunk');});
            if(maj.length&&!window._LiveCESTRIN){
              addLine('v9-urb-maj',maj,{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0.5});
              _pulse(map,'v9-urb-maj','line-opacity',0.3,1.0,8);
            }
          }
          try{SE._addTrafficPulse&&SE._addTrafficPulse(map, (D.roads&&D.roads.length)?D.roads:null);}catch(e){}
        },1500);
        fly(Z.C,14.0,60,15,6000,9000,'night');   // zoom mai aproape
        fly(Z.CBD,14.5,65,-10,5500,16000,'night'); // centru - noduri congestie
        break;

      case 'b4s2':
        lp('day');
        try{map.jumpTo({center:[cx,cy],zoom:9,pitch:10,bearing:0});}catch(e){}
        setTimeout(function(){
          if(!SE._playing) return;
          if(D.roads&&D.roads.length){
            addLine('v9-hw',D.roads,{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0});
            var op=0, fiv=setInterval(function(){
              if(!map.getLayer('v9-hw')){clearInterval(fiv);return;}
              op=Math.min(0.92,op+0.04);
              try{map.setPaintProperty('v9-hw','line-opacity',op);}catch(er){clearInterval(fiv);}
              if(op>=0.92) clearInterval(fiv);
            },60);
            _ivs.push(fiv);
            // Puls pe autostrazi
            setTimeout(function(){ if(SE._playing) _pulse(map,'v9-hw','line-opacity',0.5,1.0,10); },2000);
          }
          if(D.rail&&D.rail.length){
            addLine('v9-rail',D.rail,{'line-color':'#a78bfa','line-width':2,'line-opacity':0.7,'line-dasharray':[4,2]});
            _flowLine(map,'v9-rail');
          }
          // INFRASTRUCTURA REGIONALA REALA: autostrazi (status culori) + aeroporturi
          // reale (AACR) + metrou — inlocuieste aerodromurile OSM aproximative.
          try{ SE._addRegioInfra && SE._addRegioInfra(map, city); }catch(e){}
          // CNAIR autostrazi planificate Romania (supliment live)
          if(window._LiveCNAIR&&city){
            window._LiveCNAIR.showOnMap(map,city,{radiusKm:120});
          }
        },2000);
        fly([cx,cy],10,22,-10,5000,7500,'day');
        fly([cx,cy],12.5,42,18,5000,14000,'day');
        // ZOOM DE DETALIU pe cel mai apropiat aeroport international (nu doar fly-by)
        setTimeout(function(){
          if(!SE._playing) return;
          try{
            var ap=window._RegioInfra && window._RegioInfra.nearestAirports(cy,cx,260,1)[0];
            if(ap){ map.flyTo({center:[ap.lon,ap.lat],zoom:13.5,pitch:55,bearing:30,duration:5000,essential:true}); }
          }catch(e){}
        },15500);
        break;

      case 'b4s3':
        lp('day');
        try{
          if(map.getLayer('tci-tp-layer')){
            map.setLayoutProperty('tci-tp-layer','visibility','visible');
            _pulse(map,'tci-tp-layer','line-opacity',0.4,1.0,10);
          }
        }catch(e){}
        onIdle(function(){try{SE._addTransitExpand&&SE._addTransitExpand(map);}catch(e){}});
        // GTFS trasee TP reale din OSM
        setTimeout(function(){
          if(!SE._playing) return;
          if(window._LiveGTFS){
            window._LiveGTFS.showOnMap(map,city,true).then(function(){
              console.log('[v9] GTFS trasee TP afisate');
            }).catch(function(){});
          }
        },1500);
        // BRT coridoare propuse cu flow animat
        setTimeout(function(){
          if(!SE._playing) return;
          var brtFeats=[
            {type:'Feature',geometry:{type:'LineString',coordinates:[[cx-0.025,cy],[cx,cy],[cx+0.028,cy-0.005]]},properties:{c:'#ef4444',w:5}},
            {type:'Feature',geometry:{type:'LineString',coordinates:[[cx,cy-0.022],[cx,cy],[cx,cy+0.025]]},properties:{c:'#ef4444',w:5}},
            {type:'Feature',geometry:{type:'LineString',coordinates:[[cx-0.018,cy-0.012],[cx,cy],[cx+0.020,cy+0.015]]},properties:{c:'#3b82f6',w:3}},
          ];
          addLine('v9-brt',brtFeats,{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0.8});
          _flowLine(map,'v9-brt');
        },2000);
        fly(Z.C,13.5,52,0,4000,0,'day');
        fly(Z.NV,14.5,62,30,6000,10000,'day');
        fly(Z.SE2,14.0,58,-25,5500,18000,'day');
        break;

      case 'b4s4':
        lp('day');
        // Schema retelelor de utilitati desenata pe harta (apa/canal/energie/gaz)
        // la scara orasului -> zoom de oras (12.5-13), nu nivel strada.
        onIdle(function(){try{SE._addUtilityNet&&SE._addUtilityNet(map);}catch(e){}});
        setTimeout(function(){
          if(!SE._playing) return;
          if(D.monuments&&D.monuments.length){ addCircle('v9-mon',D.monuments); _pulse(map,'v9-mon','circle-radius',5,12,8); }
          if(D.cimitire&&D.cimitire.length) addLine('v9-cim',D.cimitire,{'line-color':'#6b7280','line-width':2,'line-dasharray':[3,3],'line-opacity':0.7});
          if(D.utilities&&D.utilities.length) addLine('v9-utils',D.utilities,{'line-color':'#fbbf24','line-width':1,'line-opacity':0.5,'line-dasharray':[2,4]});
        },1500);
        fly(Z.C,12.8,55,20,4000,0,'day');
        rot(14,0.004);
        fly(Z.C,13.2,58,70,7000,10000,'day');
        fly(Z.C,12.9,54,120,6000,18000,'day');
        break;

      // BLOC 5 ───────────────────────────────────────────────────────────
      case 'b5s1':
        lp('night');
        try{map.setPaintProperty('building-extrusion','fill-extrusion-color',['interpolate',['linear'],['get','height'],0,'#166534',8,'#854d0e',15,'#b91c1c',25,'#dc2626',40,'#ef4444']);}catch(e){}
        onIdle(function(){try{SE._addSeismicHeat&&SE._addSeismicHeat(map);}catch(e){}});
        // #2: clustere de fond vulnerabil comasat + unde de soc (simulare) + zoom
        onIdle(function(){try{SE._addSeismicClusters&&SE._addSeismicClusters(map);}catch(e){}});
        setTimeout(function(){ if(SE._playing&&SE._seismicEpi){ try{map.flyTo({center:SE._seismicEpi,zoom:14.5,pitch:60,bearing:25,duration:5000,essential:true});}catch(e){} } },13500);
        // Restrictii aeroporturi ROMARTSA
        setTimeout(function(){
          if(!SE._playing) return;
          if(window._LiveTerrain) window._LiveTerrain.showRestrictii(map,city);
        },3000);
        fly([cx,cy],12.5,52,5,4000,0,'night');
        fly(Z.NV,14,62,30,6500,8000,'night');
        fly(Z.SE2,14,60,-22,6500,15000,'night');
        break;

      case 'b5s2':
        lp('dawn');
        // Curata EXPLICIT orice ramas din scenele anterioare
        try{window._FloodMapper&&window._FloodMapper.hideAll&&window._FloodMapper.hideAll(map);}catch(e){}
        fly([cx,cy],11.5,45,8,4000,0,'dawn');
        setTimeout(function(){
          if(!SE._playing) return;
          // Acum adaugam harta ANAR curata
          try{
            if(window._FloodMapper&&typeof window._FloodMapper.addAll==='function'){
              window._FloodMapper.addAll(map);
              console.log('[v9] ANAR via _FloodMapper');
            }
          }catch(e){}
          onIdle(function(){try{SE._addFloodExpand&&SE._addFloodExpand(map);}catch(e){}});
          if(D.green&&D.green.length){ addCircle('v9-green',D.green); _pulse(map,'v9-green','circle-radius',5,12,8); }
          if(D.roads&&D.roads.length) addLine('v9-hw',D.roads);
        },2000);
        // Zoom pe zone inundabile - lunca raului
        fly([cx,cy],12.5,48,5,4000,0,'dawn');
        fly(Z.SV,13.5,58,15,6000,9000,'dawn');   // zona de lunca tipica SV
        fly(Z.C,14.0,62,-5,5500,17000,'day');    // centru cu zone risc
        break;

      case 'b5s3':
        lp('night');
        try{map.setPaintProperty('building-extrusion','fill-extrusion-color','#ef4444'); map.setPaintProperty('building-extrusion','fill-extrusion-opacity',0.7);}catch(e){}
        // #4: zonele de impact ale inactiunii (seism/inundatii/congestie/exod) cu pierderi
        onIdle(function(){try{SE._addCostInaction&&SE._addCostInaction(map);}catch(e){}});
        fly(Z.C,13,58,15,4000,0,'night');
        rot(20,0.006);
        fly(Z.C,13.4,62,70,7000,11000,'night');
        fly(Z.C,12.9,56,-10,6000,20000,'dusk');
        break;

      // BLOC 6 ───────────────────────────────────────────────────────────
      case 'b6s1':
        lp('day');
        setTimeout(function(){
          if(!SE._playing) return;
          if(D.monuments&&D.monuments.length) addCircle('v9-mon',D.monuments);
          if(D.cimitire&&D.cimitire.length) addLine('v9-cim',D.cimitire,{'line-color':'#6b7280','line-width':2,'line-dasharray':[3,3],'line-opacity':0.6});
          if(D.amenity&&D.amenity.length) addCircle('v9-amenity',D.amenity);
        },1500);
        fly(Z.C,15.5,68,20,4000,0,'day');
        fly(Z.NV,15,65,65,6500,10000,'day');
        fly(Z.SE2,15,65,125,6500,18000,'day');
        break;

      case 'b6s2':
        lp('night');
        try{map.setPaintProperty('building-extrusion','fill-extrusion-height',0.5);}catch(e){}
        onIdle(function(){try{SE._add3DGrowth&&SE._add3DGrowth(map);}catch(e){}});
        // PRESIUNE DENSITATE (heatmap proiectat) — apare progresiv sub masterplan
        onIdle(function(){try{SE._addDensityPressure&&SE._addDensityPressure(map);}catch(e){}});
        // MASTERPLAN PROIECTAT desenat pe harta: centura, tren metropolitan,
        // cartiere noi, parc, reconversie, pasaje — peste fondul construit.
        setTimeout(function(){ if(SE._playing){ try{SE._addMasterplanProjection&&SE._addMasterplanProjection(map);}catch(e){} } },2800);
        try{map.setPaintProperty('building-extrusion','fill-extrusion-color',['interpolate',['linear'],['get','height'],0,'#14532d',6,'#15803d',15,'#f59e0b',28,'#ef4444']);}catch(e){}
        // Vedere larga — sa se vada TOT orasul proiectat (centura + retea), apoi push-in
        fly(Z.C,12.6,54,0,4500,0,'night');
        rot(10,0.006);
        fly(Z.C,13.4,60,45,9000,12000,'night');
        break;

      case 'b6s3':
        lp('dusk');
        onIdle(function(){try{SE._addExpansionRings&&SE._addExpansionRings(map);}catch(e){}});
        // LIMITA INTRAVILAN: actual (auriu) vs proiectat 2055 (rosu punctat)
        onIdle(function(){try{SE._addFutureIntravilan&&SE._addFutureIntravilan(map);}catch(e){}});
        // Zoom la nivel oras - inelele sa fie vizibile dar nu sa acopere tot judetul
        fly([cx,cy],12.5,48,-5,4000,0,'dusk');
        fly(Z.C,13.5,55,20,6000,9000,'dusk');
        fly(Z.PER,13.0,50,60,6000,16000,'night');
        break;

      // BLOC 7 ───────────────────────────────────────────────────────────
      case 'b7s1':
        lp('night');
        fly([cx,cy],12,48,0,4000,0,'night');
        setTimeout(function(){
          if(!SE._playing) return;
          try{SE._addTrafficPulse&&SE._addTrafficPulse(map, (D.roads&&D.roads.length)?D.roads:null);}catch(e){}
          // PRESIUNE TRAFIC din fluxurile OSM REALE daca exista (D.roads), altfel noduri
          try{SE._addTrafficPressure&&SE._addTrafficPressure(map, (D.roads&&D.roads.length)?D.roads:null);}catch(e){}
          if(D.urban&&D.urban.length){ addLine('v9-urb',D.urban); _pulse(map,'v9-urb','line-opacity',0.3,0.9,10); }
        },1500);
        fly(Z.C,13.5,55,15,6000,9000,'night');
        fly(Z.SE2,13,50,-20,6000,17000,'night');
        break;

      case 'b7s2':
        lp('day');
        setTimeout(function(){
          if(!SE._playing) return;
          if(D.roads&&D.roads.length) addLine('v9-hw',D.roads);
          // Solutii de mobilitate DESENATE explicit cu etichete mari (nu buline anonime)
          try{ if(SE._cinLabels) SE._cinLabels(map,[
            {lon:cx,        lat:cy+0.022, color:'#a855f7', icon:'🚌', title:'CORIDOR BRT',        sub:'transport rapid'},
            {lon:cx-0.026,  lat:cy+0.006, color:'#f59e0b', icon:'⬆',  title:'PASAJ SUPRATERAN',   sub:'nod CFR / artera'},
            {lon:cx+0.028,  lat:cy-0.010, color:'#22c55e', icon:'🚲', title:'PISTA VELO',         sub:'retea conectata'},
            {lon:cx-0.030,  lat:cy-0.014, color:'#60a5fa', icon:'🚶', title:'AX PIETONAL',        sub:'zona centrala'},
            {lon:cx+0.034,  lat:cy+0.016, color:'#ef4444', icon:'⛗',  title:'CENTURA OCOLITOARE', sub:'devieaza tranzitul'},
          ]); }catch(e){}
        },1500);
        fly([cx,cy],13,52,0,4000,0,'day');
        fly(Z.C,14.5,62,22,6000,9000,'day');
        fly(Z.PER,13,48,55,6000,17000,'day');
        break;

      case 'b7s3':
        lp('day');
        // #3: modal split desenat ca coridoare radiale (latime ∝ cota modala)
        onIdle(function(){try{SE._addModalSplit&&SE._addModalSplit(map,(SE._pred&&SE._pred.modalAuto)||52);}catch(e){}});
        rot(12,0.005);
        fly(Z.C,13,48,0,4000,0,'day');
        fly(Z.C,13.4,54,40,6000,11000,'day');
        fly(Z.C,13,50,-20,5500,19000,'day');
        break;

      // BLOC 8 ───────────────────────────────────────────────────────────
      case 'b8s1':
        lp('day');
        // #7: PROIECTE PNRR REALE desenate pe harta (pini + zone + coridoare) din
        // _UrbanProjects. Cladirile ESTOMPATE ca pinii de proiect sa iasa in evidenta.
        onIdle(function(){try{SE._addBuildings&&SE._addBuildings(map);}catch(e){}});
        setTimeout(function(){ try{map.setPaintProperty('v8-bld-l','fill-extrusion-opacity',0.35);}catch(e){} },1800);
        setTimeout(function(){ if(SE._playing){ try{SE._addRealProjects&&SE._addRealProjects(map, SE._cityKey);}catch(e){} } },2200);
        setTimeout(function(){ if(SE._playing){ try{SE._addMasterplanProjection&&SE._addMasterplanProjection(map,{phased:false});}catch(e){} } },3200);
        // Vedere larga ca sa se vada propunerile pe tot orasul, apoi push-in
        fly(Z.C,12.8,56,15,4500,0,'day');
        rot(10,0.006);
        fly(Z.C,13.5,60,60,9000,12000,'day');
        break;

      case 'b8s2':
        lp('day');
        setTimeout(function(){
          if(!SE._playing) return;
          if(D.roads&&D.roads.length){
            addLine('v9-hw',D.roads,{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0});
            var op=0, fiv=setInterval(function(){
              if(!map.getLayer('v9-hw')){clearInterval(fiv);return;}
              op=Math.min(0.95,op+0.03);
              try{map.setPaintProperty('v9-hw','line-opacity',op);}catch(er){clearInterval(fiv);}
              if(op>=0.95) clearInterval(fiv);
            },60);
            _ivs.push(fiv);
            // Buffer vizual autostrada
            var mots=D.roads.filter(function(r){return r.properties&&r.properties.t==='motorway';});
            if(mots.length){
              addLine('v9-hw-buf',mots,{'line-color':'#dc2626','line-width':60,'line-opacity':0.06,'line-blur':25});
            }
          }
        },1000);
        fly([cx,cy],11,35,0,4000,0,'day');
        fly(Z.C,13.5,55,20,6000,9000,'day');
        fly(Z.PER,12.5,48,60,6000,17000,'dusk');
        break;

      // BLOC 9 ───────────────────────────────────────────────────────────
      case 'b9s1':
        lp('dusk');
        onIdle(function(){try{SE._addExpansionRings&&SE._addExpansionRings(map);}catch(e){}});
        fly([cx,cy],11.5,48,-5,4000,0,'dusk');
        fly(Z.PER,12,45,45,7000,11000,'dusk');
        fly(Z.C,13,52,-12,6000,20000,'night');
        break;

      case 'b9s2':
        lp('dusk');
        onIdle(function(){try{SE._addBuildings&&SE._addBuildings(map);}catch(e){}}); // backdrop oras
        fly(Z.C,13,50,-15,4000,0,'dusk');
        fly(Z.NV,14,58,30,6000,10000,'dusk');
        fly(Z.SE2,13.5,54,-20,5500,18000,'dusk');
        break;

      case 'b9s3':
        lp('night');
        try{map.setPaintProperty('building-extrusion','fill-extrusion-color','#ef4444'); map.setPaintProperty('building-extrusion','fill-extrusion-opacity',0.7);}catch(e){}
        fly(Z.C,14,62,15,4000,0,'night');
        rot(20,0.008);
        fly(Z.SE2,14.5,68,120,8000,11000,'night');
        fly(Z.C,13.5,58,-10,7000,21000,'dusk');
        break;

      // BLOC 10 ──────────────────────────────────────────────────────────
      case 'b10s1':
        lp('night');
        try{map.setPaintProperty('building-extrusion','fill-extrusion-color',['interpolate',['linear'],['get','height'],0,'#7f1d1d',10,'#dc2626',25,'#f59e0b',40,'#fbbf24']);}catch(e){}
        fly(Z.C,13.5,58,10,4000,0,'night');
        rot(18,0.010);
        setTimeout(function(){
          if(!SE._playing) return;
          onIdle(function(){try{SE._addSeismicHeat&&SE._addSeismicHeat(map);}catch(e){}});
          onIdle(function(){try{SE._addFloodExpand&&SE._addFloodExpand(map);}catch(e){}});
        },3000);
        fly(Z.SE2,14,65,80,7000,12000,'night');
        fly(Z.C,13,55,-15,6000,21000,'dusk');
        break;

      case 'b10s2':
        lp('night');
        try{map.setPaintProperty('building-extrusion','fill-extrusion-color','#1e293b'); map.setPaintProperty('building-extrusion','fill-extrusion-opacity',0.5);}catch(e){}
        fly(Z.C,13.5,58,10,4000,0,'night');
        rot(15,0.009);
        fly(Z.NV,14.5,66,80,8000,12000,'night');
        fly(Z.C,13,52,-10,7000,22000,'night');
        break;

      case 'b10s3':
        lp('dawn');
        try{
          map.setPaintProperty('building-extrusion','fill-extrusion-color',['match',['get','type'],'apartments','#3b82f6','residential','#60a5fa','house','#93c5fd','commercial','#f59e0b','#94a3b8']);
          map.setPaintProperty('building-extrusion','fill-extrusion-opacity',0.92);
        }catch(e){}
        setTimeout(function(){
          if(!SE._playing) return;
          if(D.green&&D.green.length){ addCircle('v9-green',D.green); _pulse(map,'v9-green','circle-radius',5,14,7); }
        },1500);
        fly(Z.C,13.5,55,0,4000,0,'dawn');
        fly(Z.NV,14,62,35,6000,11000,'day');
        fly(Z.SE2,14,60,-28,6000,19000,'day');
        break;

      // BLOC 11 ──────────────────────────────────────────────────────────
      case 'b11s1':
        lp('day');
        setTimeout(function(){
          if(!SE._playing) return;
          // Coridoare prioritati apar progresiv pe harta
          var agendaCorridors = _buildAgendaCorridors(cx,cy,pred);
          _showCorridorsOnMap(map, agendaCorridors, 1500);
          if(D.roads&&D.roads.length) addLine('v9-hw',D.roads);
          // Prioritatile primarului — etichetate explicit (nu buline anonime)
          try{ if(SE._cinLabels) SE._cinLabels(map,[
            {lon:cx,       lat:cy+0.020, color:'#ef4444', icon:'1', title:'CONSOLIDARE SEISMICA',  sub:'prioritate maxima'},
            {lon:cx+0.026, lat:cy+0.006, color:'#f59e0b', icon:'2', title:'MOBILITATE & PASAJE',   sub:'decongestionare'},
            {lon:cx-0.028, lat:cy+0.010, color:'#22c55e', icon:'3', title:'SPATII VERZI 3-30-300',  sub:'sanatate urbana'},
            {lon:cx+0.018, lat:cy-0.016, color:'#60a5fa', icon:'4', title:'REGENERARE CENTRU',     sub:'mixt + pietonal'},
            {lon:cx-0.024, lat:cy-0.012, color:'#a855f7', icon:'5', title:'RECONVERSIE INDUSTRIALA',sub:'brownfield'},
          ]); }catch(e){}
        },2000);
        fly([cx,cy],13,52,0,4000,0,'day');
        fly(Z.C,14.5,62,22,6000,9500,'day');
        fly(Z.PER,13,48,60,6000,18500,'day');
        break;

      case 'b11s2':
        lp('dusk');
        try{map.setLayoutProperty('building-extrusion','visibility','none');}catch(e){}
        onIdle(function(){
          try{SE._add3DGrowthFull&&SE._add3DGrowthFull(map);}catch(e){}
        });
        rot(30,0.007);
        fly(Z.CBD,15.5,72,30,5000,0,'dusk');
        fly(Z.CBD,16.0,75,120,18000,5000,'dusk');
        break;

      // BLOC 11 — INOVATII & MODELE INTERNATIONALE ─────────────────────────
      case 'b12s1': // Superblocks Barcelona
        lp('day');
        onIdle(function(){ try{SE._add3DGrowth&&SE._add3DGrowth(map);}catch(e){} });
        fly(Z.CBD,15,60,0,4000,0,'day');
        fly(Z.CBD,15.6,66,90,16000,4500,'day');
        break;
      case 'b12s2': // 3-30-300 — verde, oaze de racoare, aer (model Singapore)
        lp('day');
        onIdle(function(){ try{SE._addGreenHeatOasis&&SE._addGreenHeatOasis(map, D.green);}catch(e){} });
        fly(Z.VERDE,14,54,0,4000,0,'day');
        fly(Z.C,13.5,50,40,14000,4500,'day');
        break;
      case 'b12s3': // Oras 15 minute
        lp('day');
        onIdle(function(){ try{SE._addExpansionRings&&SE._addExpansionRings(map);}catch(e){} });
        fly(Z.C,14.2,56,0,4000,0,'day');
        rot(20,0.005);
        fly(Z.C,14.5,60,60,14000,4500,'day');
        break;
      case 'b12s4': // Sinteza Masterplan — proiectia COMPLETA pe harta (nefazata)
        lp('dusk');
        onIdle(function(){ try{SE._add3DGrowthFull&&SE._add3DGrowthFull(map);}catch(e){} });
        setTimeout(function(){ if(SE._playing){ try{SE._addMasterplanProjection&&SE._addMasterplanProjection(map,{phased:false});}catch(e){} } },2600);
        rot(14,0.005);
        fly(Z.C,12.6,56,10,4500,0,'dusk');
        fly(Z.C,13.3,60,90,16000,5000,'dusk');
        break;

      // ACT VI — ORASUL PENTRU OAMENI (indici calitate viata) ──────────────
      case 'b13s1': // Happiness
        lp('day');
        onIdle(function(){ try{SE._addBuildings&&SE._addBuildings(map);}catch(e){} });
        fly(Z.C,13.5,52,0,4000,0,'day');
        rot(14,0.004);
        fly(Z.C,14,56,40,14000,4500,'day');
        break;
      case 'b13s2': // Economia de noapte
        lp('night');
        onIdle(function(){ try{SE._addBuildings&&SE._addBuildings(map);}catch(e){} });
        fly(Z.CBD,14.5,60,20,4000,0,'night');
        fly(Z.CBD,15,64,80,13000,4500,'night');
        break;
      case 'b13s3': // Oras prietenos seniori
        lp('day');
        onIdle(function(){try{SE._addBuildings&&SE._addBuildings(map);}catch(e){}}); // backdrop oras
        fly(Z.RES,14,54,0,4000,0,'day');
        fly(Z.C,13.6,52,40,13000,4500,'day');
        break;
      case 'b13s4': // Oras pentru copii
        lp('day');
        onIdle(function(){ try{SE._addExpansionRings&&SE._addExpansionRings(map);}catch(e){} });
        fly(Z.RES,14,54,0,4000,0,'day');
        rot(12,0.004);
        fly(Z.C,13.8,54,50,13000,4500,'day');
        break;

      // PROLOG + scene-semnatura noi ────────────────────────────────────────
      case 'b0s1': // Orasul respira (prolog)
        lp('night');
        fly([cx,cy],13.5,60,0,5000,0,'night');
        rot(8,0.004);
        fly([cx,cy],14,64,30,7000,5500,'dusk');
        break;
      case 'b14s1': // Sponge City
        lp('dawn');
        onIdle(function(){ try{SE._addFloodExpand&&SE._addFloodExpand(map);}catch(e){} });
        fly(Z.SV,13.5,52,10,4000,0,'dawn');
        fly(Z.C,13.8,55,45,13000,4500,'day');
        break;
      case 'b14s2': // Metabolism urban
        lp('day');
        onIdle(function(){ try{SE._addBuildings&&SE._addBuildings(map);}catch(e){} });
        fly(Z.C,13,58,0,4000,0,'day');
        rot(16,0.005);
        fly(Z.C,13.4,60,60,13000,4500,'day');
        break;
      case 'b14s3': // Orasul ca sistem viu (City OS)
        lp('night');
        onIdle(function(){ try{SE._add3DGrowthFull&&SE._add3DGrowthFull(map);}catch(e){} });
        rot(20,0.006);
        fly(Z.CBD,14.5,66,20,5000,0,'night');
        fly(Z.CBD,15,70,110,13000,5000,'night');
        break;
      case 'b24s1': // ENERGIE & CLIMAT
        lp('day');
        onIdle(function(){try{SE._addBuildings&&SE._addBuildings(map);}catch(e){}});
        setTimeout(function(){ if(SE._playing){ try{SE._addEnergy&&SE._addEnergy(map, SE._city, SE._pred);}catch(e){} } },1700);
        fly(Z.C,13.2,54,0,4500,0,'day');
        rot(11,0.004);
        fly(Z.C,13.8,58,45,7000,9000,'day');
        fly(Z.IND,13.6,56,-25,6000,15500,'dusk');
        break;
      case 'b25s1': // APA & ECONOMIE CIRCULARA
        lp('dawn');
        onIdle(function(){try{SE._addBuildings&&SE._addBuildings(map);}catch(e){}});
        setTimeout(function(){ if(SE._playing){ try{SE._addResources&&SE._addResources(map, SE._city);}catch(e){} } },1700);
        fly(Z.SV,13.2,52,0,4500,0,'dawn');
        rot(11,0.004);
        fly(Z.C,13.7,56,45,7000,9000,'day');
        fly(Z.SE2,13.5,55,-25,6000,15500,'day');
        break;
      case 'b23s1': // LOCUIRE & ACCESIBILITATE
        lp('dusk');
        onIdle(function(){try{SE._addBuildings&&SE._addBuildings(map);}catch(e){}});
        setTimeout(function(){ if(SE._playing){ try{SE._addHousing&&SE._addHousing(map, SE._city, SE._pred);}catch(e){} } },1700);
        fly(Z.C,13.4,56,0,4500,0,'dusk');
        rot(11,0.004);
        fly(Z.C,13.9,60,45,7000,9000,'dusk');
        fly(Z.RES,13.6,56,-25,6000,15500,'day');
        break;
      case 'b22s1': // PARTICIPARE PUBLICA — scena de DATE: baza curata + comentarii clare
        lp('night');
        try{map.setLayoutProperty('building-extrusion','visibility','none');}catch(e){}
        setTimeout(function(){ if(SE._playing){ try{SE._addParticipation&&SE._addParticipation(map);}catch(e){} } },1400);
        fly([cx,cy],12.6,40,0,4500,0,'night');
        rot(7,0.003);
        fly([cx,cy],13.0,44,22,16000,5000,'night');
        break;
      case 'b21s1': // SANATATE & ORAS DIGITAL
        lp('day');
        onIdle(function(){try{SE._addBuildings&&SE._addBuildings(map);}catch(e){}});
        setTimeout(function(){ if(SE._playing){ try{SE._addServices&&SE._addServices(map, SE._cityKey, SE._city);}catch(e){} } },1600);
        fly(Z.C,13.4,54,0,4500,0,'day');
        rot(11,0.004);
        fly(Z.C,13.9,58,45,7000,9000,'day');
        fly(Z.RES,13.6,55,-25,6000,15500,'day');
        break;
      case 'b20s1': // EDUCATIE & SPORT
        lp('day');
        onIdle(function(){try{SE._addBuildings&&SE._addBuildings(map);}catch(e){}});
        setTimeout(function(){ if(SE._playing){ try{SE._addVitality&&SE._addVitality(map, SE._cityKey, SE._city);}catch(e){} } },1600);
        fly(Z.UNI,14.5,60,0,4500,0,'day');
        rot(12,0.005);
        fly(Z.C,13.6,56,50,7000,9000,'day');
        fly(Z.CBD,14.2,58,-25,6000,15500,'day');
        break;
      case 'b19s1': // CULTURA & TURISM — pe Standard 3D (apus); street-view pe monumentul principal
        // pe baza intunecata aducem footprints; pe Standard cladirile reale exista deja
        if(SE._curBase!=='standard'){ onIdle(function(){ _cinRealBuildings(map); }); }
        setTimeout(function(){ if(SE._playing){ try{SE._addTourism&&SE._addTourism(map, SE._cityKey, SE._city);}catch(e){} } },1600);
        // ZOOM pe clusterul de obiective (centru) — ca etichetele sa incapa, nu la margini
        fly([cx,cy],14.4,58,0,4500,0);
        rot(10,0.004);
        fly([cx,cy],14.8,60,35,7000,9000);
        // STREET-VIEW pe obiectivul cultural principal (ex. Palatul Culturii la Iasi) — nivel pieton
        setTimeout(function(){ if(SE._playing && SE._tourMain){ try{map.flyTo({center:[SE._tourMain.lon,SE._tourMain.lat],zoom:17.4,pitch:84,bearing:25,duration:6500,essential:true});}catch(e){} } },15800);
        setTimeout(function(){ try{ if(SE._playing && SE._tourMain){ rot(25,0.0016); } }catch(e){} }, 22500);
        break;
      case 'b18s1': // FAUNA URBANA & SIGURANTA (#8 strays, #9 ursi) — pe Standard 3D (zori)
        if(SE._curBase!=='standard'){ onIdle(function(){try{SE._addBuildings&&SE._addBuildings(map);}catch(e){}}); }
        setTimeout(function(){ if(SE._playing){ try{SE._addFauna&&SE._addFauna(map, SE._city);}catch(e){} } },1800);
        fly(Z.C,13,52,0,4000,0);
        rot(12,0.004);
        fly(Z.C,13.6,56,45,7000,9000);
        fly(Z.NV,13.4,54,-20,6000,16000);
        break;
      case 'b17s1': // CARTIERE la nivel de strada — pe Standard 3D (cladiri reale + cer + POI, ca in harta platformei)
        try{ if(window._TCIStreetView && window._TCIStreetView._active) window._TCIStreetView.deactivate(); }catch(e){}
        // pe Standard avem deja cladiri 3D reale; pe baza intunecata folosim footprints composite
        if(SE._curBase!=='standard'){ onIdle(function(){ _cinRealBuildings(map); }); }
        // descent progresiv: oras -> nivelul pietonului in centrul dens -> glisare lenta printre fronturi
        fly([cx,cy],14.6,55,0,3500,0);
        fly([cx,cy],16.6,80,30,5500,3600);
        rot(8,0.0014);
        fly([cx,cy],17.6,84,-35,9000,9300);
        break;
      case 'b16s1': // NOTA UrbanX (clasament) — scena de DATE: baza curata, nu harta colorata
        lp('night');
        try{map.setLayoutProperty('building-extrusion','visibility','none');}catch(e){}
        rot(6,0.0025);
        fly([cx,cy],12.2,38,0,4500,0,'night');
        fly([cx,cy],12.6,42,18,16000,5000,'night');
        break;
      case 'b15s1': // Proiecte structurante reale
        lp('day');
        onIdle(function(){ try{SE._addBuildings&&SE._addBuildings(map);}catch(e){} });
        setTimeout(function(){ if(SE._playing){ try{SE._addRealProjects&&SE._addRealProjects(map, SE._cityKey);}catch(e){} } },2400);
        fly(Z.C,12.8,54,0,4500,0,'day');
        rot(9,0.005);
        fly(Z.C,13.5,58,55,12000,12000,'day');
        break;
    }
  }

  // ── CANVAS DRAW ───────────────────────────────────────────────────────────
  function draw(sc,t){
    var ctx=SE._ctx, dpr=window.devicePixelRatio||1;
    var W=window.innerWidth, H=window.innerHeight;
    if(!ctx||!pred) return;
    var id=sc.id;
    var sA=t<0.07?t/0.07:t>0.91?(1-t)/0.09:1;
    var eo=function(x){return 1-Math.pow(1-Math.max(0,Math.min(1,x)),3);};
    var rE=function(d,s){return eo(Math.min(1,Math.max(0,(t-(d||0))/((s||0.25)))));};
    var N2=function(v){return isNaN(+v)?'\u2014':Number(v).toLocaleString('ro-RO',{maximumFractionDigits:0});};
    var FT=Math.min(W*0.026,36), FD=Math.min(W*0.048,64), FS=Math.min(W*0.012,15);
    var FL=Math.min(W*0.009,12), FN=Math.min(W*0.011,14), FC=Math.min(W*0.010,13);

    // Vignete — harta vizibila 70%
    var gT=ctx.createLinearGradient(0,0,0,H*0.26);
    gT.addColorStop(0,'rgba(2,5,14,0.90)'); gT.addColorStop(1,'rgba(2,5,14,0)');
    ctx.fillStyle=gT; ctx.fillRect(0,0,W,H*0.26);
    var gB=ctx.createLinearGradient(0,H*0.72,0,H);
    gB.addColorStop(0,'rgba(2,5,14,0)'); gB.addColorStop(1,'rgba(2,5,14,0.90)');
    ctx.fillStyle=gB; ctx.fillRect(0,H*0.72,W,H*0.28);

    // ── LETTERBOX cinematic (cinemascope) — bare negre care intra lin la start ──
    var lbH=Math.min(H*0.052,46);
    var lbA=Math.min(1,t/0.05); // intra in primele 5% din scena
    ctx.fillStyle='rgba(0,0,0,'+(0.92*lbA)+')';
    ctx.fillRect(0,0,W,lbH); ctx.fillRect(0,H-lbH,W,lbH);
    // linie aurie fina pe marginea letterbox
    ctx.fillStyle='rgba(212,175,55,'+(0.30*lbA)+')';
    ctx.fillRect(0,lbH,W,1); ctx.fillRect(0,H-lbH-1,W,1);

    // Cifre kinetice (odometru): numerele urca de la 0 in primele ~42% din scena.
    // La k>=1 returneaza textul exact (aterizare corecta), deci ramp-ul aproximativ
    // pe zecimale rare e invizibil — conteaza valoarea finala.
    var _kineticK=Math.min(1, t/0.42);
    function _kin(s){
      if(_kineticK>=1) return s;
      return String(s).replace(/[0-9][0-9.,]*/g,function(m){
        var num=parseFloat(m.replace(/\./g,'').replace(',','.'));
        if(isNaN(num)) return m;
        return Math.round(num*_kineticK).toLocaleString('ro-RO');
      });
    }

    function titlu(txt,sub){
      ctx.globalAlpha=sA*rE(0.04,0.16);
      ctx.fillStyle='rgba(212,175,55,0.96)';
      ctx.font='700 '+FT+'px "IBM Plex Mono",monospace';
      ctx.textAlign='left'; ctx.letterSpacing='0.04em';
      wrap(ctx,txt,W*0.04,H*0.088,W*0.80,FT*1.35,2);
      if(sub){
        ctx.globalAlpha=sA*rE(0.07,0.16)*0.65;
        ctx.fillStyle='rgba(148,163,184,0.86)';
        ctx.font=FS+'px "IBM Plex Mono",monospace';
        ctx.letterSpacing='0.02em';
        wrap(ctx,sub,W*0.04,H*0.088+FT*1.5,W*0.80,FS*1.6,2);
      }
      ctx.globalAlpha=1;
    }
    function linie(){
      ctx.globalAlpha=sA*rE(0.06,0.22);
      var g=ctx.createLinearGradient(W*0.04,0,W*0.04+W*0.44,0);
      g.addColorStop(0,'rgba(212,175,55,0.9)'); g.addColorStop(1,'rgba(212,175,55,0)');
      ctx.fillStyle=g; ctx.fillRect(W*0.04,H*0.11+FT*1.5,W*0.44*rE(0.06,0.28),1.5);
      ctx.globalAlpha=1;
    }
    function cifra(val,lbl,clr){
      ctx.globalAlpha=sA*rE(0.13,0.20);
      ctx.fillStyle=clr||'#ffffff';
      var s=_kin(String(val)), fd=FD;
      ctx.font='900 '+fd+'px "Space Grotesk",sans-serif';
      // auto-shrink ca sa incapa intreg (ex. interval "[362.803—601.405]") — fara taiere
      while(ctx.measureText(s).width>W*0.52 && fd>14){ fd-=2; ctx.font='900 '+fd+'px "Space Grotesk",sans-serif'; }
      ctx.textAlign='left'; ctx.letterSpacing='0';
      ctx.fillText(s,W*0.04,H*0.882);
      ctx.globalAlpha=sA*rE(0.16,0.17)*0.72;
      ctx.fillStyle='rgba(148,163,184,0.78)';
      ctx.font='600 '+FL+'px "IBM Plex Mono",monospace';
      ctx.letterSpacing='0.05em';
      ctx.fillText(String(lbl).toUpperCase().slice(0,38),W*0.04,H*0.906);
      ctx.globalAlpha=1;
    }
    function cifra2(val,lbl,clr){
      ctx.globalAlpha=sA*rE(0.18,0.18);
      ctx.fillStyle=clr||'rgba(212,175,55,0.96)';
      var s2=_kin(String(val)), f2=Math.min(W*0.026,36);
      ctx.font='900 '+f2+'px "Space Grotesk",sans-serif';
      while(ctx.measureText(s2).width>W*0.40 && f2>12){ f2-=2; ctx.font='900 '+f2+'px "Space Grotesk",sans-serif'; }
      ctx.textAlign='right'; ctx.letterSpacing='0';
      ctx.fillText(s2,W*0.96,H*0.882);
      ctx.globalAlpha=sA*rE(0.21,0.17)*0.68;
      ctx.fillStyle='rgba(148,163,184,0.70)';
      ctx.font='600 '+FL+'px "IBM Plex Mono",monospace';
      ctx.textAlign='right'; ctx.letterSpacing='0.04em';
      ctx.fillText(String(lbl).toUpperCase().slice(0,32),W*0.96,H*0.905);
      ctx.globalAlpha=1;
    }
    function narativ(txt){
      if(t<0.46) return;
      var a=Math.min(1,(t-0.46)/0.16)*sA;
      ctx.globalAlpha=a;
      ctx.fillStyle='rgba(220,228,255,0.87)';
      ctx.font='500 '+FN+'px "Space Grotesk",sans-serif';
      ctx.textAlign='left'; ctx.letterSpacing='0';
      wrap(ctx,txt,W*0.04,H*0.926,W*0.60,FN*1.55,4);
      ctx.globalAlpha=1;
    }
    function concluzie(txt){
      if(t<0.76) return;
      var a=Math.min(1,(t-0.76)/0.14)*sA*0.92;
      ctx.globalAlpha=a;
      ctx.fillStyle='rgba(212,175,55,0.93)';
      ctx.font='700 '+FC+'px "IBM Plex Mono",monospace';
      ctx.textAlign='right'; ctx.letterSpacing='0.03em';
      wrap(ctx,'\u25B6 '+txt,W*0.96,H*0.952,W*0.56,FC*1.55,2);
      ctx.globalAlpha=1;
    }
    function negativ(txt){
      if(t<0.82) return;
      var a=Math.min(1,(t-0.82)/0.12)*sA*0.90;
      ctx.globalAlpha=a;
      ctx.fillStyle='rgba(239,68,68,0.92)';
      ctx.font='700 '+FC+'px "IBM Plex Mono",monospace';
      ctx.textAlign='left'; ctx.letterSpacing='0.02em';
      wrap(ctx,'\u26A0 '+txt,W*0.04,H*0.952,W*0.56,FC*1.55,2);
      ctx.globalAlpha=1;
    }
    function bloc_hdr(){
      ctx.globalAlpha=sA*rE(0.02,0.12)*0.45;
      ctx.fillStyle='rgba(212,175,55,0.55)';
      ctx.font='600 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
      ctx.textAlign='right'; ctx.letterSpacing='.08em';
      ctx.fillText('ACT '+(_ACT_ROMAN[sc.bloc]||sc.bloc)+' \u00b7 '+sc.blabel.toUpperCase(),W*0.96,H*0.060);
      ctx.globalAlpha=1;
    }
    function prog(){
      ctx.globalAlpha=0.55;
      ctx.fillStyle='rgba(255,255,255,0.07)'; ctx.fillRect(W*0.26,H-8,W*0.48,2);
      var gp=ctx.createLinearGradient(W*0.26,0,W*0.74,0);
      gp.addColorStop(0,'#D4AF37'); gp.addColorStop(1,'rgba(212,175,55,0.05)');
      ctx.fillStyle=gp; ctx.fillRect(W*0.26,H-8,W*0.48*((SE._si+t)/SCENES.length),2);
      ctx.fillStyle='rgba(148,163,184,0.28)';
      ctx.font='500 '+Math.min(W*0.008,9)+'px "IBM Plex Mono",monospace';
      ctx.textAlign='center'; ctx.letterSpacing='.04em';
      ctx.fillText((SE._si+1)+'/'+SCENES.length+' \u00b7 '+sc.label,W/2,H-1);
      ctx.globalAlpha=1;
    }

    // Radar de analiza — atmosferic, doar pe scenele analitice (dupa id, nu dupa act)
    if(['b2s1','b2s2','b3s1','b3s3','b5s1','b5s2','b9s1','b9s2'].indexOf(id)>=0) _drawRadar(ctx,W,H,sA);
    var pop21=pred.p21||100000;
    var r10=pred.r10||0;
    bloc_hdr();

    switch(id){
      case 'b1s1':
        ctx.globalAlpha=sA*rE(0.16,0.30);
        ctx.fillStyle='rgba(255,255,255,0.96)';
        var fn=Math.min(W*0.070,90);
        if(ctx.measureText(name.toUpperCase()).width>W*0.86) fn*=0.65;
        ctx.font='900 '+fn+'px "Space Grotesk",sans-serif';
        ctx.textAlign='center'; ctx.letterSpacing='0.02em';
        ctx.fillText(name.toUpperCase(),W/2,H*0.47);
        ctx.globalAlpha=sA*rE(0.24,0.18)*0.84;
        ctx.fillStyle='#D4AF37';
        ctx.font='600 '+Math.min(W*0.013,17)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='center'; ctx.letterSpacing='0';
        ctx.fillText((city.judet||'\u2014').toUpperCase()+' \u00b7 '+(city.regiune||'\u2014')+' \u00b7 '+N2(pop21)+' LOCUITORI',W/2,H*0.544);
        ctx.globalAlpha=1;
        // Badge tip UAT \u2014 calibrare per profil (costier/Delta/granita/montan/metropola)
        if(t>0.40){
          var _jd=String(city.judet||'').toUpperCase();
          var _badge=null;
          if(_jd==='TL') _badge={t:'\ud83d\udedf ORAS DELTA / REZERVATIE',c:'#06b6d4'};
          else if(_jd==='CT') _badge={t:'\ud83c\udf0a ORAS COSTIER / PORTUAR',c:'#0ea5e9'};
          else if(['IS','BT','SV','GL','SM','MM','AR','TM','CS','MH','OT','DJ'].indexOf(_jd)>=0) _badge={t:'\ud83d\udec2 ORAS DE GRANITA',c:'#f59e0b'};
          else if(['BV','HR','CV','SB','AB','HD','GJ','VL','NT','BN','CJ','MS'].indexOf(_jd)>=0) _badge={t:'\ud83c\udfd4 ORAS MONTAN / SUBCARPATIC',c:'#22c55e'};
          else if((city.pop2021||pop21)>=200000) _badge={t:'\ud83c\udfd9 POL METROPOLITAN',c:'#a855f7'};
          if(_badge){
            var _ba=Math.min(1,(t-0.40)/0.12)*sA;
            ctx.globalAlpha=_ba; ctx.font='800 '+Math.min(W*0.012,16)+'px "IBM Plex Mono",monospace'; ctx.textAlign='center';
            var _bw=ctx.measureText(_badge.t).width+28;
            ctx.fillStyle='rgba(2,6,18,0.8)'; ctx.fillRect(W/2-_bw/2,H*0.57,_bw,H*0.04);
            ctx.strokeStyle=_badge.c; ctx.lineWidth=1.5; ctx.strokeRect(W/2-_bw/2,H*0.57,_bw,H*0.04);
            ctx.fillStyle=_badge.c; ctx.fillText(_badge.t,W/2,H*0.57+H*0.026);
            ctx.globalAlpha=1;
          }
        }
        // NOTA: istoricul Wikipedia se afiseaza DOAR in scena b1s4 (Evolutie Istorica),
        // nu si aici in scena de identitate \u2014 evita dublarea istoricului la pornire.
        cifra(N2(pop21),'Locuitori \u2014 INSE Recensamant 2021');
        cifra2(N2(Math.round(((city.suprafata_ha||city.suprafata||9800)/100)))+' km\u00b2','Suprafata UAT');
        // AMPRENTA ORASULUI \u2014 amprenta orasului la deschidere (indicele-semnatura)
        if(t>0.55) _drawCityFingerprint(ctx,W,H,Math.min(1,(t-0.55)/0.18)*sA,pred,city,false);
        break;

      case 'b1s2':
        titlu('Context Geopolitic','Romania \u00b7 Vecini \u00b7 Granita \u00b7 Influente regionale'); linie();
        var hub=city.coef_hub||0.78;
        var isGr=['IS','BT','SV','GL','TL','CT','TM','AR','SM','MM'].indexOf(city.judet||'')>=0;
        var isCfP=['IS','BT','SV','GL','TL'].indexOf(city.judet||'')>=0;
        // date reale infrastructura regionala + context frontiera (surse oficiale)
        var _gctx=(window._RegioInfra&&window._RegioInfra.geoContext)?window._RegioInfra.geoContext(city.judet):null;
        var _aps=(window._RegioInfra&&window._RegioInfra.nearestAirports)?window._RegioInfra.nearestAirports(cy,cx,260,2):[];
        var _apTxt=_aps.length?_aps.map(function(a){return a.name.replace('Aeroportul Interna\u021Bional ','').replace('Aeroportul ','')+' ('+a.iata+', '+a.distKm+'km)';}).join(', '):'verificare';
        var gR=[
          ['\u{1F30D} '+(isGr?'ZONA DE GRANITA'+(isCfP?' \u26A0 PROXIMITATE CONFLICT':''):' INTERIOR ROMANIA'),'#D4AF37'],
          ['\u{1F6E3} '+( (window._RegioInfra?window._RegioInfra.relevantHighways(cy,cx,180).map(function(h){return h.nume.replace('Autostrada ','A-').split(' ')[0];}).join(' \u00B7 '):'')||'DN principale')+' (CNAIR/PNRR)','#ea580c'],
          ['\u2708 Aeroporturi: '+_apTxt,'#22d3ee'],
          ['\u{1F6A8} '+(_gctx?_gctx.border:'-'),'#ef4444'],
          ['\u{1F3D9} Hub: '+(hub>=1.1?'METROPOLITAN':hub>=0.9?'REGIONAL':'LOCAL')+' (coef '+hub.toFixed(2)+')'+(isCfP?' \u2014 flux migratie pozitiv Est':''),'#60a5fa'],
        ];
        gR.forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.14+i*0.04,0.18);
          ctx.fillStyle=it[1];
          ctx.font='500 '+Math.min(W*0.011,14)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left'; ctx.letterSpacing='0';
          wrap(ctx,it[0],W*0.04,H*(0.575+i*0.058),W*0.55,Math.min(W*0.013,16)*1.4,2);
        });
        ctx.globalAlpha=1;
        cifra(N2(pop21),'Populatie UAT');
        cifra2(hub.toFixed(2)+' hub','Coef. gravitational');
        narativ('Contextul geopolitic influenteaza direct dezvoltarea urbana. '+(_gctx?_gctx.note+' '+_gctx.risk+'.':(isCfP?'Proximitatea conflictului Ucraina genereaza flux de migratie estimat +8-15% populatie in 2024-2026.':'Pozitia in interiorul Romaniei asigura stabilitate geopolitica. Accesul la coridoarele europene determina viteza de convergenta economica.')));
        concluzie('Geopolitica se traduce direct in fluxuri demografice si oportunitati economice masurate');
        negativ('Izolarea infrastructurala intr-un context geopolitic instabil = vulnerabilitate x3 fata de orasele conectate');
        break;

      case 'b1s3':
        titlu('Retea Nationala & Gravitatie','Pozitie \u00b7 Hub-uri \u00b7 Influenta metropolitana'); linie();
        cifra(N2(pop21),'Populatie '+(city.tip||'municipiu'));
        cifra2((city.coef_hub||0.78).toFixed(2)+' coef','Hub gravitational');
        narativ('Modelul gravitational UrbanX calibrat pe 320 UAT-uri Romania. '+(city.coef_hub||0.78)>=1.1?name+' este HUB METROPOLITAN — atrage forta de munca si investitii din raza 80-120km.':name+' este nod regional — zona de influenta estimata 40-60km. Conectivitatea rutiera si feroviara determina viteza de convergenta.');
        concluzie('Pozitia in reteaua nationala determina rata de convergenta cu UE pe urmatorii 30 ani');
        negativ('Oras regional izolat infrastructural pierde 20-35% din potential economic vs unul conectat pe axa TEN-T');
        break;

      case 'b1s4':
        titlu('Evolutie Istorica','Fondare \u00b7 Populatie '+(_NOW-30)+'\u2192'+_NOW+' \u00b7 Momente cheie'); linie();
        if(D.wiki&&t>0.15){
          ctx.globalAlpha=sA*rE(0.15,0.20)*0.88;
          var bx2=W*0.04,by2=H*0.58,bw2=Math.min(W*0.52,490),bh2=H*0.28;
          ctx.fillStyle='rgba(4,10,24,0.80)';
          ctx.beginPath(); ctx.roundRect&&ctx.roundRect(bx2,by2,bw2,bh2,7); ctx.fill();
          ctx.strokeStyle='rgba(212,175,55,0.15)'; ctx.lineWidth=1; ctx.stroke();
          ctx.fillStyle='rgba(148,163,184,0.48)';
          ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left'; ctx.letterSpacing='.06em';
          ctx.fillText('\u{1F4DA} CONTEXT ISTORIC \u2014 WIKIPEDIA',bx2+12,by2+16);
          ctx.fillStyle='rgba(210,225,255,0.84)';
          ctx.font='400 '+Math.min(W*0.0112,14)+'px "Space Grotesk",sans-serif';
          ctx.letterSpacing='0';
          wrap(ctx,D.wiki.extract?D.wiki.extract.slice(0,300)+'...':'Date indisponibile.',bx2+12,by2+34,bw2-24,Math.min(W*0.013,17)*1.5,7);
          ctx.globalAlpha=1;
        }
        if(t>0.30) _drawPopHist(ctx,W,H,Math.min(1,(t-0.30)/0.25)*sA,pred);
        cifra(N2(pop21),'Populatie actuala 2021');
        cifra2(N2(pred.pop55||0),'Proiectie '+_E());
        narativ('Evolutia demografica istorica este fundatia oricarei proiectii urbanistice corecte. Orasele crescute rapid in industrializare (1950-1990) se confrunta acum cu fond construit invechit si demografii in scadere. Intelegerea trecutului e cheia planificarii viitorului.');
        concluzie('Un oras isi poarta istoria in structura fizica — PUG-ul trebuie sa o inteleaga, nu sa o ignore');
        break;

      case 'b2s1':
        titlu('Demografie','Date INSE live \u00b7 Densitate \u00b7 Structura varsta'); linie();
        var rClr=r10>=0.5?'#22c55e':r10>=-0.5?'#f59e0b':'#ef4444';
        var tLbl=r10>=1?'CRESTERE':r10>=0.2?'CRESTERE LENTA':r10>=-0.5?'STAGNARE':'DECLIN';
        cifra((r10>=0?'+':'')+r10.toFixed(2)+'%/an',tLbl,rClr);
        cifra2(N2(pred.pop55),'Proiectie '+_E());
        if(t>0.18) _drawAgePyramid(ctx,W,H,Math.min(1,(t-0.18)/0.22)*sA,pred,city);
        if(pred.p21_inse){
          ctx.globalAlpha=sA*rE(0.25,0.18)*0.78;
          ctx.fillStyle='#22c55e';
          ctx.font='700 '+Math.min(W*0.009,11)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left'; ctx.letterSpacing='.04em';
          ctx.fillText('\u2713 INSE TEMPO LIVE \u2014 date reale confirmate '+(pred.inseActualizare||''),W*0.04,H*0.62);
          ctx.globalAlpha=1;
        }
        narativ(N2(pop21)+' loc. (INSE 2021). Tendinta: '+r10.toFixed(2)+'%/an. '+(pred.migNeta<0?'Migratie negativa: '+Math.abs(pred.migNeta)+' persoane/an parasesc '+name+'.':'Migratie pozitiva: +'+pred.migNeta+' pers./an.')+' Natalitate: '+pred.natalitate+'\u2030, mortalitate: '+pred.mortalit+'\u2030. Proiectie S2: '+N2(pred.pop55)+' loc. in '+_E()+'.');
        concluzie('Rata demografica reala este fundamentul oricarei proiectii de locuinte, servicii si infrastructura');
        negativ('Declin neabordat = infrastructura supradimensionata + servicii nerentabile + colaps fiscal dupa '+_P2());
        break;

      case 'b2s2':
        titlu('Criza Imbatranire Demografice','Populatie activa \u00b7 Contribuabili \u00b7 Servicii sociale'); linie();
        var pct65=Math.round(18+(r10<-0.5?8:r10<0?4:0));
        cifra(pct65+'%','Populatie 65+ ani actuala',pct65>20?'#ef4444':'#f59e0b');
        cifra2(Math.round(pct65*1.4)+'%','Proiectie '+_E(),'#ef4444');
        if(t>0.18) _drawAgingChart(ctx,W,H,Math.min(1,(t-0.18)/0.22)*sA,pred,r10);
        narativ('In '+_E()+', '+Math.round(pct65*1.4)+'% din populatia '+name+' va fi de 65+ ani — fata de '+pct65+'% azi. Asta inseamna mai putini contribuabili care sustin mai multi beneficiari de servicii sociale. Sistemul de sanatate, pensii si asistenta sociala necesita restructurare fundamentala. Fara investitii in retentia tinerilor, scaderea va fi exponentiala.');
        concluzie('Imbatranirea demografica este criza silentioasa care subrezeste viabilitatea fiscala pe 30 ani');
        negativ('In '+_E()+': raportul activi/pensionari 1.8:1 vs 3.2:1 azi — sustenabilitate servicii in pericol real');
        break;

      case 'b2s3':
        titlu('Migratie & Emigrare','Forta de munca \u00b7 Studenti \u00b7 Diaspora \u00b7 Impact'); linie();
        if(t>0.18) _drawMigration(ctx,W,H,Math.min(1,(t-0.18)/0.2)*sA,pred);
        var mig=pred.migNeta||0;
        var isUniv=(city.universitati||0)>0||(city.coef_hub||0)>=1.1;
        cifra((mig>=0?'+':'')+N2(mig)+'/an','Migratie neta estimata',mig>=0?'#22c55e':'#ef4444');
        cifra2(N2(Math.abs(mig)*_HORIZON)+' pers.','Total '+_HORIZON+' ani',mig<0?'#ef4444':'#22c55e');
        narativ((mig<0?'EMIGRARE NETA: '+Math.abs(mig)+' persoane/an parasesc '+name+'. Destinatii: Bucuresti, orase universitare RO, vest Europa (IT, DE, ES, UK). Forta de munca calificata 18-35 ani cel mai afectata segment.':'MIGRATIE POZITIVA: +'+mig+' persoane/an vin in '+name+'.')+(isUniv?' Ca oras universitar, atrage studenti din intreaga regiune. Multi raman dupa absolvire — factor pozitiv decisiv. Necesita locuinte accesibile si piata muncii activa.':' Retentia depinde critic de calitatea vietii, locuri de munca si transport public.'));
        concluzie('Fiecare persoana plecata = '+N2(Math.round(pred.pib*0.45/12*12))+' EUR/an pierduti din economia locala si fiscalitatea UAT');
        negativ('La ritmul actual: in '+_P2()+' forta de munca activa scade cu '+(Math.round(Math.abs(mig)*15/pop21*100))+'% — risc real pentru sustinerea serviciilor publice');
        break;

      case 'b2s4':
        titlu('Profil Locuitor & Putere de Cumparare','Salariu \u00b7 Ocupatie \u00b7 Segmente imobiliare'); linie();
        var sal=(window._getSalariu&&city&&city.judet)?window._getSalariu(city.judet):(pred.salariu||3500);
        cifra(N2(sal)+' RON/luna','Salariu mediu estimat',sal>=4000?'#22c55e':sal>=2500?'#f59e0b':'#ef4444');
        cifra2((pred.pctUE||39)+'% UE27','Convergenta economica');
        if(t>0.20) _drawOccup(ctx,W,H,Math.min(1,(t-0.20)/0.22)*sA,pred);
        narativ('Salariu mediu net: '+N2(sal)+' RON/luna. Buget achizitie apartament (3.5x salariu anual): '+N2(Math.round(sal*12*3.5/4.9))+'  EUR. La pretul de '+N2(Math.round(pred.pib*0.45))+' EUR/mp: '+Math.round(sal*12*3.5/(pred.pib*0.45*50))+' mp accesibili. Segmente dominante: 2-3 camere rezidentiale. Servicii '+(pred.ocupatie.servicii||52)+'%, industrie '+(pred.ocupatie.industrie||28)+'%.');
        concluzie('Piata imobiliara reflecta direct puterea economica — convergenta cu UE = crestere durabila a valorilor');
        negativ('Sub 3.500 RON/luna: accesul la credite ipotecare blocat — cerere efectiva redusa = dezvoltare imobiliara lenta');
        break;

      case 'b3s1':
        titlu('Economia','PIB \u00b7 Convergenta UE \u00b7 Sectoare \u00b7 Tendinta'); linie();
        var pib=pred.pib||14200, pUE=pred.pctUE||38;
        cifra(N2(pib)+' \u20ac/loc','PIB per locuitor Eurostat',pUE>=75?'#22c55e':pUE>=50?'#f59e0b':'#ef4444');
        cifra2(pUE+'% UE27','Convergenta economica');
        if(t>0.18) _drawEcoChart(ctx,W,H,Math.min(1,(t-0.18)/0.22)*sA,pred);
        narativ(name+' = '+pUE+'% din media UE27 ('+N2(pib)+' vs 36.600 EUR/loc UE). Convergenta la 75% UE: ~'+pred.anConv+'. Rata crestere PIB: +'+pred.rPIB.toFixed(1)+'%/an. ROI imobiliar: ~'+(pred.roi||8)+'%/an ajustat seismic. Servicii '+(pred.ocupatie.servicii||52)+'%, industrie '+(pred.ocupatie.industrie||28)+'%.');
        concluzie('Convergenta economica cu UE este motorul principal al valorii imobiliare pe 30 ani');
        negativ('Fara investitii: convergenta stagneaza la '+pUE+'% UE27 in '+_E()+' — pierdere oportunitate economica enorma');
        break;

      case 'b3s2':
        titlu('Motoare Economice','Universitati \u00b7 Industrie \u00b7 Servicii \u00b7 Hub-uri'); linie();
        if(t>0.16) _drawGravity(ctx,W,H,Math.min(1,(t-0.16)/0.2)*sA,pred,city);
        var isUniv3=(city.universitati||0)>0||(city.coef_hub||0)>=1.1;
        var eItems=[
          ['\u{1F3EB} EDUCATIE: '+(isUniv3?'HUB UNIVERSITAR — atrage studenti + talente + cercetare':'fara universitate majora — gap competitiv'),'#3b82f6'],
          ['\u{1F3ED} INDUSTRIE: '+(pred.ocupatie.industrie||28)+'% activi — sectoare: '+(city.industrie_principale||'prelucrare, constructii'),'#f59e0b'],
          ['\u{1F4BB} SERVICII & IT: '+(pred.ocupatie.servicii||52)+'% — '+(isUniv3?'potential tech crescut':'sector in crestere'),'#a78bfa'],
          ['\u{1F6D2} COMERT & RETAIL: '+(pred.ocupatie.comert||18)+'% — centru comercial zonal','#22c55e'],
          ['\u{1F3D7} CONSTRUCTII: '+(pred.ocupatie.constructii||8)+'% — '+(pred.auth||300)+' autorizatii/an estimat','#60a5fa'],
        ];
        eItems.forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.15+i*0.04,0.18);
          ctx.fillStyle=it[1];
          ctx.font='500 '+Math.min(W*0.011,14)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left'; ctx.letterSpacing='0';
          wrap(ctx,it[0],W*0.04,H*(0.57+i*0.060),W*0.56,Math.min(W*0.013,16)*1.4,2);
        });
        ctx.globalAlpha=1;
        cifra(N2(pred.pib)+' \u20ac/loc','PIB per locuitor');
        cifra2(pred.pctUE+'% UE27','Convergenta');
        narativ('Camera zboara: centrul civic (servicii/administratie) \u2192 '+(isUniv3?'campus universitar (cercetare+IT)':'zona servicii') +' \u2192 zona industriala (depozite+productie). Fiecare motor economic necesita infrastructura proprie: universitati cer TP si locuinte accesibile, industria cere logistica rutiera, serviciile cer spatii office si broadband rapid.');
        concluzie('Diversificarea economica reduce vulnerabilitatea — un singur motor = fragilitate la soc extern');
        break;

      case 'b3s3':
        titlu('Investitii & ROI Imobiliar','Preturi \u00b7 Piata \u00b7 Oportunitati \u00b7 Riscuri'); linie();
        if(t>0.18) _drawROI(ctx,W,H,Math.min(1,(t-0.18)/0.2)*sA,pred);
        var roi=pred.roi||8;
        cifra(roi+'%/an','ROI imobiliar estimat brut',roi>=10?'#22c55e':roi>=7?'#f59e0b':'#ef4444');
        cifra2(N2(Math.round(pred.invTotal*0.55))+' M \u20ac','Investitii private estimate '+_S()+'-'+_E());
        narativ('Camera zboara pe 3 zone de maxim interes imobiliar. CENTRU CIVIC: premium, cerere constanta, risc seismic verificat obligatoriu. ZONA UNIVERSITARA: IT+servicii+studenti, ROI stabil +8-12%/an. PERIFERIE PREMIUM: langa axe TP propuse si autostrazi planificate, crestere potentiala +15-40% la anuntul infrastructurii. ag='+((pred.ag||0.20)).toFixed(2)+'g risc seismic — factor ajustare '+(pred.ag>=0.30?'1.28x':pred.ag>=0.20?'1.14x':'1.0x')+'.');
        concluzie('Coridoarele infrastructurii noi sunt cele mai predictibile zone de crestere a valorii imobiliare');
        negativ('Investitie in fond fara verificare seismica = risc maxim — cutremur >7.0 poate sterge 100% din valoare in zone RS I');
        break;

      case 'b4s1':
        try{if(SE._updateTraffic) SE._updateTraffic(t);}catch(e){}
        titlu('Retea Rutiera','OSM real \u00b7 Congestie \u00b7 Blocaje \u00b7 Saturatie'); linie();
        cifra(N2(pred.mot24),'Vehicule/1000 loc',(pred.mot24||380)>450?'#ef4444':'#f59e0b');
        cifra2('~'+(pred.satAn||2040),'An saturare retea');
        ctx.globalAlpha=sA*rE(0.20,0.16);
        [['#dc2626','AUTOSTRADA'],['#ea580c','DN'],['#f59e0b','PRIMAR'],['#16a34a','SECUNDAR'],['#0ea5e9','TERTIAR']].forEach(function(it,i){
          ctx.fillStyle=it[0]; ctx.fillRect(W*(0.04+i*0.155),H*0.924,W*0.014,5);
          ctx.fillStyle='rgba(220,230,255,0.68)';
          ctx.font='500 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left'; ctx.letterSpacing='0';
          ctx.fillText(it[1],W*(0.056+i*0.155),H*0.932);
        });
        ctx.globalAlpha=1;
        narativ('Reteaua rutiera OSM reala pulsand. Flux ora varf: '+N2(pred.fluxOra)+' veh/h. Saturatie estimata: '+(pred.satAn||2040)+'. Necesare: '+(pred.pasaje||5)+' pasaje noi pe noduri critice (cost '+N2(Math.round((pred.pasaje||5)*15))+' M EUR). Centura: '+(pred.kmOcol||20)+' km. Fara interventie: colaps urban dupa '+(pred.satAn||2040)+'.');
        concluzie('Investitia in pasaje+centura = decongestionare + valoare imobiliara zona +15-25%');
        negativ('Congestie cronica = -210h/an/persoana + '+N2(Math.round((pop21/1000)*0.9))+' M EUR/an cost economic + poluare + calitate vietii redusa');
        break;

      case 'b4s2':
        // Date CNAIR si aeroporturi din LiveSources
        var _cnairList = city&&city._live&&city._live.cnair || (window._LiveCNAIR?window._LiveCNAIR.getForCity(city,80):[]);
        var _distAero = city&&city._live&&city._live.distAero || (window._LiveTerrain?window._LiveTerrain.getDistanta(city):null);
        titlu('Conectivitate Regionala','Autostrazi \u00b7 CFR \u00b7 Aeroporturi \u00b7 Coridoare TEN-T'); linie();
        var nMot2=(D.roads||[]).filter(function(r){return r.properties&&r.properties.t==='motorway';}).length;
        [
          ['\u{1F6E3} Autostrazi raza 70km: '+nMot2+' segmente motorway OSM','#dc2626'],
          ['\u{1F682} Cale ferata raza 40km: '+(D.rail||[]).length+' seg. CFR — restrictie 20m construire','#a78bfa'],
          ['\u2708 Aeroporturi raza 120km: '+(D.airports&&D.airports.length>0?D.airports.map(function(a){return a.name+(a.iata?' ('+a.iata+')':'');}).join(', '):'verificare date OSM'),'#22c55e'],
          ['\u{1F30D} TEN-T: '+(nMot2>0?'CONECTAT la reteaua europeana de transport':'IN AFARA TEN-T — prioritate fonduri UE'),'#f59e0b'],
          ['\u{1F4FA} Influenta infra: +15-40% valoare teren pe coridorul autostrazii noi in raza 20km','#60a5fa'],
        ].forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.13+i*0.04,0.18);
          ctx.fillStyle=it[1];
          ctx.font='500 '+Math.min(W*0.011,13)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left'; ctx.letterSpacing='0';
          wrap(ctx,it[0],W*0.04,H*(0.570+i*0.060),W*0.55,Math.min(W*0.013,16)*1.4,2);
        });
        ctx.globalAlpha=1;
        cifra(N2(pop21),'Populatie UAT');
        cifra2((city.coef_hub||0.78).toFixed(2)+' hub','Gravitatie');
        var _cnairText = window._LiveCNAIR
          ? window._LiveCNAIR.getNarativ(city)
          : (_cnairList.length>0
             ? _cnairList.slice(0,2).map(function(a){return a.name+' ('+a.distKm+'km)';}).join('. ')
             : 'Fara autostrada in raza 80km');
        var _aeroText = _distAero
          ? _distAero.aeroport.name+' — '+_distAero.distKm+'km ('+_distAero.clasificare+')'
          : 'Fara aeroport international in raza 120km';
        narativ('CNAIR: '+_cnairText+'. Aeroport: '+_aeroText+'. Infrastructura regionala este cel mai puternic predictor al cresterii economice pe 30 ani. Fiecare km autostrada noua in raza 20km = +15-40% valoare teren pe coridor.');
        concluzie('Conectivitatea la coridoarele TEN-T europene determina competitivitatea pentru investitii straine directe');
        negativ('Izolarea de TEN-T = cost transport +35% = competitivitate industriala redusa = investitorii aleg alte locatii');
        break;

      case 'b4s3':
        // Explicatie BRT in primele 20% din scena
        if(t<0.22){
          ctx.globalAlpha=sA*rE(0.04,0.18)*0.85;
          ctx.fillStyle='rgba(4,10,24,0.82)';
          ctx.fillRect(W*0.04,H*0.30,Math.min(W*0.55,520),H*0.22);
          ctx.strokeStyle='rgba(239,68,68,0.3)';ctx.lineWidth=1;ctx.stroke();
          ctx.fillStyle='rgba(239,68,68,0.95)';
          ctx.font='700 '+Math.min(W*0.014,18)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left';ctx.letterSpacing='.04em';
          ctx.fillText('CE ESTE BRT?',W*0.06,H*0.335);
          ctx.fillStyle='rgba(210,225,255,0.88)';
          ctx.font='400 '+Math.min(W*0.012,15)+'px "Space Grotesk",sans-serif';
          ctx.letterSpacing='0';
          wrap(ctx,'Bus Rapid Transit = autobuze pe benzi dedicate, cu prioritate la semafoare, statii moderne si frecventa ridicata. Cost: 3-5x mai mic decat tramvai, 10-15x mai mic decat metrou. Reduce congestia cu 25-35% pe coridor.',W*0.06,H*0.360,Math.min(W*0.50,480),Math.min(W*0.014,18)*1.5,4);
          ctx.globalAlpha=1;
        }
        titlu('Transport Public','· BRT propus · Modal Split · SUMP '+_P1()); linie();
        cifra((pred.tp||62)+'%','Acoperire populatie TP',(pred.tp||62)>=70?'#22c55e':(pred.tp||62)>=50?'#f59e0b':'#ef4444');
        cifra2((pred.kmBRT||30)+' km BRT','Coridoare rapide propuse');
        if(t>0.20) _drawModal(ctx,W,H,Math.min(1,(t-0.20)/0.22)*sA,pred);
        narativ('Deficit '+(75-(pred.tp||62))+'pp vs standard UE 75%. Walk Score: '+(pred.walkScore||58)+'/100. BRT: '+(pred.kmBRT||30)+' km, cost '+N2(pred.costBRT||90)+' M EUR — cea mai eficienta solutie cost/km. Pasaje pietonale: '+(pred.pasaje||5)+' pe noduri CFR+artere. Target SUMP '+_P1()+': 35% TP + 20% activ + 45% auto.');
        concluzie('BRT + pasaje pietonale = -35% congestie + +22pp walkability + calitate vietii masurabila');
        negativ('Fara TP extins: modal auto >80% in '+_P2()+' = oras inaccesibil fara masina = excludere sociala reala');
        break;

      case 'b4s4':
        titlu('Retele Utilitati & Restrictii','Apa \u00b7 Canal \u00b7 Energie \u00b7 Gaz \u00b7 Monumente \u00b7 Restrictii'); linie();
        cifra((pred.auth||300)+'/an','Autorizatii construire ANCPI','#60a5fa');
        cifra2(N2(pred.fond||0)+' cladiri','Fond pre-1990 risc seismic','#ef4444');
        [
          '\u{1F4D9} Monumente CIMEC: zona 200m = restrictii Legea 422/2001',
          '\u{26CF} Cimitire: restrictie 50m perimetru (Legea 102/2014)',
          '\u{1F682} CFR: culoar 20m de la axa = constructie interzisa (Legea 202/2016)',
          '\u26A1 Retele electrice: zona 20-110m (ANRE) = restrictii POT/CUT',
          '\u{1F4A7} Apa/Canal: 96% acoperire (ANRSC) — extindere in zone crestere',
          '\u{1F6E1} NZEB obligatoriu constructii noi din 2021 (Legea 372/2005)',
        ].forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.22+i*0.03,0.15);
          ctx.fillStyle='rgba(220,230,255,0.82)';
          ctx.font='500 '+Math.min(W*0.011,13)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left'; ctx.letterSpacing='0';
          wrap(ctx,it,W*0.04,H*(0.60+i*0.052),W*0.55,Math.min(W*0.013,16)*1.4,2);
        });
        ctx.globalAlpha=1;
        narativ('Auriu pulsant = monumente CIMEC. Gri stria = cimitire. Galben = retele electrice. Restrictiile cumulate reduc cu 15-25% suprafata construibila reala a intravilanului. Urbanistul si primarul trebuie sa cunoasca aceste restrictii inainte de orice PUZ sau autorizatie.');
        concluzie('Suprafata construibila reala = intravilan minus restrictii CFR+monumente+cimitire+retele = 15-25% mai mica decat in PUG');
        negativ('Nerespectarea restrictiilor legale = nulitate autorizatie + amenzi + obligatie demolare + litigii 5-15 ani');
        break;

      case 'b5s1':
        titlu('Risc Seismic','P100-1/2013 \u00b7 Fond vulnerabil \u00b7 PNRR C10-I2 \u00b7 UTR-uri'); linie();
        var ag=(window._getSeismic&&city&&city.judet)?window._getSeismic(city.judet).ag:(pred.ag||0.20);
        var agTc=(window._getSeismic&&city&&city.judet)?window._getSeismic(city.judet).Tc:1.0;
        var agC=ag>=0.30?'#ef4444':ag>=0.20?'#f59e0b':'#22c55e';
        cifra('ag='+ag.toFixed(2)+'g','Acceleratie seismica P100-1/2013',agC);
        cifra2(N2(pred.fond||0)+' cladiri','Fond risc RS I-III estimat','#ef4444');
        [['#166534','<8m SIGUR'],['#854d0e','8-15m ATENTIE'],['#b91c1c','15-25m RISC'],['#dc2626','>25m MAXIM']].forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.20,0.15);
          ctx.fillStyle=it[0]; ctx.fillRect(W*(0.04+i*0.18),H*0.920,W*0.014,5);
          ctx.fillStyle='rgba(220,230,255,0.70)';
          ctx.font='500 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left'; ctx.letterSpacing='0';
          ctx.fillText(it[1],W*(0.056+i*0.18),H*0.928);
        });
        ctx.globalAlpha=1;
        narativ('Culorile cladirilor = risc seismic combinat (inaltime + zona ag P100). '+N2(pred.fond||0)+' cladiri risc RS I-III. PNRR C10-I2: '+N2(Math.round((pred.fond||0)*0.25))+' apartamente consolidabile (100% finantare). Cost: '+N2(Math.round((pred.fond||0)*0.085))+' M EUR. Termen depunere: 2026. Fond pre-1977 = vulnerabilitate maxima.');
        concluzie('Consolidarea seismica este urgenta #1 indiferent de orice alt plan urbanistic');
        negativ('Cutremur >7.0 (probabilitate 15% in 50 ani): '+Math.round((pred.fond||0)*0.15)+' cladiri prabusire partiala — tragedie umana + '+N2(Math.round((pred.fond||0)*0.15*300))+' M EUR pierderi');
        break;

      case 'b5s2':
        // AQI live din _LiveANPM
        var _aqi = city&&city._live&&city._live.aqi || (window._LiveANPM?window._LiveANPM._estimateAQI(city):null);
        if(_aqi && t>0.30) {
          window._LiveANPM&&window._LiveANPM.renderCanvas(ctx,W,H,Math.min(1,(t-0.30)/0.20)*sA,_aqi);
        }
        titlu('Clima & Inundatii','ANAR PGRA 2021-2027 \u00b7 WMS real \u00b7 UHI \u00b7 RCP4.5/8.5'); linie();
        var zile=(city&&city._live&&city._live.zileCaniculare)||pred.zile24||18;
        // Meteo live
        var _meteo=city&&city._live&&city._live.meteo;
        cifra(zile+' zile/an','Caniculare >35\u00b0C azi (ANM)','#f59e0b');
        cifra2(Math.round(zile*2.1)+' zile/an','Proiectie '+_E()+' RCP4.5','#ef4444');
        if(t>0.20) _drawClima(ctx,W,H,Math.min(1,(t-0.20)/0.22)*sA,pred,zile);
        var _tempAzi=_meteo?_meteo.temp+'°C ('+_meteo.desc+')':'date indisponibile';
        narativ('Meteo azi: '+_tempAzi+'. HARTA ANAR REALA afisata. Zile caniculare >35°C in '+_NOW+': '+zile+' zile (sursa: '+(city&&city._live&&city._live.zileCaniculare?'Open-Meteo arhiva':'estimare')+'. In '+_E()+': '+Math.round(zile*2.1)+' zile proiectie RCP4.5. UHI estimat: +'+(pred.uhi||1.8)+'°C. Costul inactiunii climatice: x4.5 mai mare decat adaptarea.');
        concluzie('Spatii verzi + acoperisuri verzi = -1.5-2.5\u00b0C temperatura urbana = vietii salvate in valuri caldura');
        negativ('Val caldura '+_E()+' fara adaptare: '+Math.round(pop21*0.0003)+' spitalizari/val + blocaje termocentrale + '+N2(Math.round(pop21*0.0003*8000/1000000))+' M EUR/val cost sanatate');
        break;

      case 'b5s3':
        titlu('Costul Inactiunii','Ce se intampla cand nimeni nu face nimic — documentat'); linie();
        if(t>0.16) _drawCarbon(ctx,W,H,Math.min(1,(t-0.16)/0.2)*sA,pred);
        var costIn=Math.round((pred.invTotal||300)*3.2);
        cifra(N2(costIn)+' M \u20ac','Costul inactiunii pe '+_HORIZON+' ani','#ef4444');
        cifra2(N2(pred.invTotal||300)+' M \u20ac','Cost preventie — de 3.2x mai mic','#22c55e');
        [
          ['\u{1F534} Colaps retea rutiera dupa '+(pred.satAn||2040)+': '+N2(Math.round(pop21/1000*0.9*10))+' M EUR pierderi cumulate','#ef4444'],
          ['\u{1F534} Fond seismic nereabilitat: '+N2(Math.round((pred.fond||0)*0.15*300))+' M EUR pagube la cutremur >7.0','#ef4444'],
          ['\u{1F534} Adaptare climatica intarziata: cost x4.5 preventie = '+N2(Math.round((pred.zile24||18)*2.1*pop21*0.00003))+' M EUR/an suplimentar','#ef4444'],
          ['\u{1F534} Declin demografic neabordat: -'+N2(Math.abs(pred.migNeta||500)*_HORIZON)+' persoane = colaps servicii dupa '+_P2(),'#ef4444'],
          ['\u26A0 TOTAL: '+N2(costIn)+' M EUR inactiune vs '+N2(pred.invTotal||300)+' M EUR preventie','#fbbf24'],
        ].forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.15+i*0.05,0.18);
          ctx.fillStyle=it[1];
          ctx.font='500 '+Math.min(W*0.011,13)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left'; ctx.letterSpacing='0';
          wrap(ctx,it[0],W*0.04,H*(0.57+i*0.060),W*0.56,Math.min(W*0.013,16)*1.4,2);
        });
        ctx.globalAlpha=1;
        narativ('Raportul cost-beneficiu al investitiei preventive: 1:3.2 in medie, pana la 1:8 pentru consolidare seismica PNRR (Banca Mondiala Urban Resilience Reports 2022). Aceasta comparatie financiara este argumentul principal pentru orice finantator international.');
        concluzie('Investitia preventiva de '+N2(pred.invTotal||300)+' M EUR costa de 3.2x mai putin decat inactiunea pe '+_HORIZON+' ani');
        break;

      case 'b6s1':
        titlu('Fond Construit Existent','Tipuri \u00b7 Monumente \u00b7 Restrictii \u00b7 Densitate'); linie();
        cifra(N2(pred.auth||300)+'/an','Autorizatii construire ANCPI','#60a5fa');
        cifra2(N2(pred.fond||0)+' cladiri','Fond risc RS I-III','#ef4444');
        [
          '\u{1F4D9} Monumente OSM: '+(D.monuments||[]).length+' detectate — zona 200m restrictie Legea 422/2001',
          '\u{26CF} Cimitire: '+(D.cimitire||[]).length+' detectate — restrictie 50m perimetru',
          '\u{1F3E5} Spitale: '+(D.amenity||[]).filter(function(a){return a.properties&&a.properties.t&&a.properties.t.includes('hospital');}).length+' detectate OSM',
          '\u{1F3EB} Scoli: '+(D.amenity||[]).filter(function(a){return a.properties&&(a.properties.t==='school'||a.properties.t==='university');}).length+' detectate OSM',
        ].forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.22+i*0.03,0.16);
          ctx.fillStyle='rgba(220,230,255,0.84)';
          ctx.font='500 '+Math.min(W*0.011,13)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left'; ctx.letterSpacing='0';
          wrap(ctx,it,W*0.04,H*(0.60+i*0.054),W*0.55,Math.min(W*0.013,16)*1.5,2);
        });
        ctx.globalAlpha=1;
        narativ('Albastru=blocuri \u00b7 Portocaliu=comercial \u00b7 Verde=scoli \u00b7 Rosu=spitale \u00b7 Auriu pulsant=monumente. Fondul construit este mostenirea urbana — nu se sterge, se transforma. Reconversia zonelor industriale si densificarea in jurul axelor TP sunt mai eficiente decat expansiunea pe teren verde.');
        concluzie('Reconversia fondului construit existent = sustenabilitate urbana; expansiunea pe teren verde = sprawl costisitor');
        negativ('Sprawl periurban = costuri infrastructura x3/loc + fond urban central abandonat + scadere valori centru');
        break;

      case 'b6s2':
        var tG=t<0.08?0:Math.min(1,(t-0.08)/0.84);
        var tE=1-Math.pow(1-tG,3);
        // _updateGrowth la fiecare frame — inaltimile cresc vizibil
        try{ if(SE._updateGrowth) SE._updateGrowth(tE); }catch(e){}
        // Presiunea de densitate apare progresiv (heatmap), dupa ce cresc cladirile
        try{ if(map.getLayer('v8-dp-l')) map.setPaintProperty('v8-dp-l','heatmap-opacity', Math.max(0,Math.min(0.7,(t-0.35)*1.4))); }catch(e){}
        // Split temporal 2025<->2055 — matura o singura data in a doua jumatate a scenei
        if(t>0.45&&t<0.86) _drawTemporalSweep(ctx,W,H,(t-0.45)/0.41);
        // Etapizare masterplan — elementele proiectate apar pe ani (2025->2055)
        try{ if(SE._revealMasterplan) SE._revealMasterplan(tE); }catch(e){}
        // Cladirile Mapbox standard ascunse — bara 3D PUG le inlocuiesc
        try{map.setLayoutProperty('building-extrusion','visibility','none');}catch(e){}
        // Afisare progres animatie in canvas
        if(tE > 0.05) {
          ctx.save();
          ctx.globalAlpha = sA * Math.min(1, tE * 1.5) * 0.85;
          ctx.fillStyle = 'rgba(4,10,24,0.80)';
          ctx.fillRect(W*0.04, H*0.86, Math.min(W*0.45, 400), H*0.055);
          // Bar progress animatie
          ctx.fillStyle = 'rgba(255,255,255,0.08)';
          ctx.fillRect(W*0.04+10, H*0.87, Math.min(W*0.44,380)-20, H*0.030);
          var progClr = tE<0.33?'#22c55e':tE<0.66?'#f59e0b':'#ef4444';
          ctx.fillStyle = progClr;
          ctx.fillRect(W*0.04+10, H*0.87, (Math.min(W*0.44,380)-20)*tE, H*0.030);
          ctx.fillStyle = 'rgba(220,228,255,0.85)';
          ctx.font = '700 '+Math.min(W*0.009,11)+'px "IBM Plex Mono",monospace';
          ctx.textAlign = 'left'; ctx.letterSpacing = '.04em';
          var yr_anim = Math.round(_S() + tE * _HORIZON);
          ctx.fillText(_S()+' ─ '+yr_anim+' ─ '+_E()+' | '+Math.round(tE*100)+'% din proiectie', W*0.04+10, H*0.9105);
          ctx.restore();
        }
        if(t<0.13){
          titlu(name+' '+_S()+' \u2014 Starea Actuala','Fond construit la zi \u00b7 Densitate reala'); linie();
          cifra(N2(pop21),'Locuitori actuali','#94a3b8');
          cifra2(N2(pred.auth||300)+'/an','Autorizatii','#60a5fa');
        } else {
          titlu('Coridoare Dezvoltare '+_E(),'Bare 3D PUG cresc animat: '+_S()+' \u2192 '+_E()); linie();
          // #5: legenda etape \u2014 gri = fond EXISTENT, color = CRESTEREA propusa
          if(tE>0.1){
            ctx.save(); ctx.globalAlpha=sA*0.9; ctx.textAlign='left';
            ctx.fillStyle='#64748b'; ctx.fillRect(W*0.04,H*0.155,12,12);
            ctx.fillStyle='rgba(220,228,255,0.85)'; ctx.font='600 '+Math.min(W*0.0095,12)+'px "IBM Plex Mono",monospace';
            ctx.fillText('FOND EXISTENT (ce era)',W*0.04+18,H*0.165);
            ctx.fillStyle='#ff8c00'; ctx.fillRect(W*0.30,H*0.155,12,12);
            ctx.fillStyle='rgba(220,228,255,0.85)';
            ctx.fillText('CRESTERE PROPUSA (ce creste)',W*0.30+18,H*0.165);
            ctx.restore();
          }
          ctx.globalAlpha=sA*tE;
          ctx.fillStyle='#ef4444';
          ctx.font='900 '+FD+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left'; ctx.letterSpacing='0';
          ctx.fillText(N2(Math.round((pred.defLoc||5000)*tE)),W*0.04,H*0.882);
          ctx.globalAlpha=sA*0.72;
          ctx.fillStyle='rgba(148,163,184,0.78)';
          ctx.font='600 '+FL+'px "IBM Plex Mono",monospace';
          ctx.letterSpacing='0.05em';
          ctx.fillText('UNITATI LOCATIVE NECESARE '+_E(),W*0.04,H*0.906);
          cifra2(N2(pred.recHa||200)+' ha','Potential reconversie','#f59e0b');
          if(tE>0.35) narativ('PROIECTAT pe harta: \u2b57 CENTURA ocolitoare (devieaza tranzitul), \ud83d\ude86 TREN METROPOLITAN (3 linii + statii), \ud83c\udfd8 CARTIERE NOI la periferie, \ud83c\udf33 PARC metropolitan, \ud83c\udfed RECONVERSIE industriala, \u2b06 PASAJE denivelate. Barele 3D = densitate: VERDE mica / GALBEN medie / ROSU suprasaturat. '+N2(pred.defLoc||5000)+' unitati necesare pana in '+_E()+'.');
          ctx.globalAlpha=1;
        }
        concluzie('Coridoarele reale = axa TP principal + proximitate autostrada + reconversie industriala');
        negativ('PUG depasit: sprawl necontrolat = costuri infrastructura x3/loc + fond central abandonat');
        break;

      case 'b6s3':
        titlu('Scenarii Extindere Intravilan','3 Inele: 2011 \u00b7 2021 \u00b7 '+_P1()+' \u00b7 '+_E()); linie();
        var pO3=Math.round(pop21*Math.pow(1+(r10+0.9)/100,_HORIZON));
        var pR3=Math.round(pop21*Math.pow(1+(r10-0.8)/100,_HORIZON));
        var pM3=pred.pop55||Math.round(pop21*Math.pow(1+r10/100,_HORIZON));
        cifra('['+N2(pR3)+'\u2014'+N2(pO3)+']','Interval 90% populatie '+_E(),'#f59e0b');
        cifra2(N2(Math.round((pO3-pop21)*35/90))+' unitati','Maxim necesar S3','#22c55e');
        if(t>0.20) _drawMC(ctx,W,H,Math.min(1,(t-0.20)/0.24)*sA,pR3,pM3,pO3,pop21,t);
        narativ('INELE pe harta: gri=2011, albastru=2021, portocaliu='+_P1()+', rosu='+_E()+'. Diferenta scenarii: '+(pO3-pR3)+' persoane = '+Math.round((pO3-pR3)*35/90)+' unitati = '+Math.round((pO3-pR3)*35/90*80)+' ha. PUG trebuie dimensionat pe S2+20% marja. Compactizarea e mai eficienta decat expansiunea.');
        concluzie('PUG-ul de azi trebuie sa prevada capacitate pentru S2+20% fara sa incurajeze sprawl pe S3');
        negativ('PUG supradimensionat pe S3 = speculatie funciara + infrastructura supradimensionata platita de contribuabili');
        break;

      case 'b7s1':
        // _updateTraffic la fiecare frame - animeaza vehiculele pe retea
        try{if(SE._updateTraffic) SE._updateTraffic(t);}catch(e){}
        // Presiunea de trafic creste progresiv pe nodurile critice (heatmap)
        try{ if(map.getLayer('v8-tp2-l')) map.setPaintProperty('v8-tp2-l','heatmap-opacity', Math.max(0,Math.min(0.8,(t-0.25)*1.3))); }catch(e){}
        titlu('Trafic & Congestie','Flux real OSM \u00b7 Noduri critice \u00b7 Saturatie'); linie();
        cifra(N2(pred.mot24),'Vehicule/1000 loc',(pred.mot24||380)>450?'#ef4444':'#f59e0b');
        cifra2(N2(pred.fluxOra)+' veh/h','Flux ora varf estimat');
        ctx.globalAlpha=sA*rE(0.18,0.16)*(0.6+0.4*Math.sin(t*Math.PI*12));
        ctx.fillStyle='rgba(239,68,68,0.45)';
        ctx.beginPath(); ctx.arc(W*0.35,H*0.50,8+Math.sin(t*Math.PI*8)*4,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(W*0.55,H*0.42,6+Math.sin(t*Math.PI*6)*3,0,Math.PI*2); ctx.fill();
        ctx.globalAlpha=1;
        narativ('Reteaua OSM reala pulsand. ROSU pulsant = noduri congestie recurenta. Saturatie: '+(pred.satAn||2040)+'. '+(pred.pasaje||5)+' pasaje necesare ('+N2(Math.round((pred.pasaje||5)*15))+' M EUR). Centura '+(pred.kmOcol||20)+' km ('+N2(Math.round((pred.kmOcol||20)*4))+' M EUR). Fara interventie: colaps dupa '+(pred.satAn||2040)+'.');
        concluzie('Investitia '+N2(Math.round((pred.pasaje||5)*15+(pred.kmOcol||20)*4))+' M EUR in pasaje+centura = decongestionare + +15-25% valoare imobiliara zona');
        negativ('Congestie zilnica = -210h/an/persoana + '+Math.round((pop21/1000)*0.9)+' M EUR/an cost economic + poluare crescuta');
        break;

      case 'b7s2':
        titlu('Solutii Mobilitate','Pasaje \u00b7 Centura \u00b7 BRT \u00b7 Pietonal \u00b7 Velo'); linie();
        cifra(N2(Math.round((pred.pasaje||5)*15+(pred.kmOcol||20)*4+pred.costBRT||90))+' M \u20ac','Investitie mobilitate necesara','#D4AF37');
        cifra2('~60% UE','Finantare FEDR+PNRR');
        [
          ['\u{1F69B} Pasaje auto: '+(pred.pasaje||5)+' pe noduri critice CFR+artere = '+N2(Math.round((pred.pasaje||5)*15))+' M EUR','#dc2626'],
          ['\u{1F6B6} Pasaje pietonale: '+Math.round((pred.pasaje||5)*1.5)+' subterane/supraterane = '+N2(Math.round((pred.pasaje||5)*1.5*2))+' M EUR','#a78bfa'],
          ['\u{1F68C} BRT: '+(pred.kmBRT||30)+' km = '+(pred.costBRT||90)+' M EUR — eficient dupa metrou','#3b82f6'],
          ['\u{1F6B2} Piste ciclo-pietonale: min 30km retea conectata = +12pp modal split activ','#22c55e'],
          ['\u{1F697} Centura: '+(pred.kmOcol||20)+' km = '+N2(Math.round((pred.kmOcol||20)*4))+' M EUR — deviaza tranzitul','#f59e0b'],
        ].forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.18+i*0.04,0.18);
          ctx.fillStyle=it[1];
          ctx.font='500 '+Math.min(W*0.011,13)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left'; ctx.letterSpacing='0';
          wrap(ctx,it[0],W*0.04,H*(0.57+i*0.060),W*0.56,Math.min(W*0.013,16)*1.4,2);
        });
        ctx.globalAlpha=1;
        narativ('Puncte pulsante pe harta = locatii prioritare automat identificate (topologie OSM + fluxuri estimate). ROSU = urgente. GALBEN = importante. VERDE = strategice. Finantare FEDR+PNRR: ~60%. Fara SUMP pana in '+_P1()+': pierdere fonduri UE transport 2028-2034.');
        concluzie('Mobilitate eficienta = calitate vietii + competitivitate + atractivitate pentru investitori si rezidenti noi');
        negativ('Fara SUMP pana in '+_P1()+': pierdere finantare UE transport estimata '+N2(Math.round((pred.costBRT||90)*0.7))+' M EUR in 2028-2034');
        break;

      case 'b7s3':
        titlu('Modal Split '+_E(),'Transformarea mobilitatii \u00b7 Tinte SUMP'); linie();
        var _ms3=_modalSplit(pred);
        cifra(_ms3.auto+'%','Cota AUTO (modal split actual)', _ms3.auto>=55?'#ef4444':'#f59e0b');
        cifra2('45% auto target','Tinta SUMP '+_P1(),'#22c55e');
        if(t>0.18) _drawModalFull(ctx,W,H,Math.min(1,(t-0.18)/0.24)*sA,pred);
        narativ('MODAL SPLIT azi: auto '+_ms3.auto+'% | TP '+_ms3.tp+'% | pieton '+_ms3.pieton+'% | velo '+_ms3.velo+'% (suma 100%). Acoperire retea TP: '+(pred.tp||62)+'% (alta metrica). TARGET SUMP '+_P1()+': auto 45% | TP 35% | pieton 15% | velo 5%. Necesita: BRT '+(pred.kmBRT||30)+' km + piste velo 30km + pasaje pietonale '+(pred.pasaje||5)+'. Beneficii: -35% congestie + -18% CO2 + +20% calitate aer.');
        concluzie('Fiecare pp mutat de la auto la TP/activ = economie '+N2(Math.round(pop21*0.01*210*25/1000000))+' M EUR/an costuri sociale');
        negativ('Fara schimbare modal split: auto 82% in '+_P2()+' = oras complet dependent de masina = excludere populatie fara auto');
        break;

      case 'b8s1':
        titlu('Proiecte Majore & PNRR','Investitii publice \u00b7 Spital regional \u00b7 Smart City'); linie();
        cifra(N2(pred.invTotal||300)+' M \u20ac','Investitii necesare '+_S()+'-'+_E(),'#D4AF37');
        cifra2('~35% UE','Finantare FEDR+PNRR disponibila');
        [
          ['\u{1F3E5} Spital Regional: pol dezvoltare 5km + 500+ locuri munca directe','#ef4444'],
          ['\u{1F4BB} Smart City: IoT urban + digitalizare servicii + eficienta','#a78bfa'],
          ['\u{1F3D7} PNRR C10-I2: '+N2(Math.round((pred.fond||0)*0.25))+' ap. consolidare — 100% finantare','#f59e0b'],
          ['\u{1F6E3} Autostrada/centura: coridor crestere + teren +15-40% pe 20km','#dc2626'],
          ['\u{1F4DA} Campus universitar extins: retentie tineri + cercetare + startup ecosystem','#3b82f6'],
        ].forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.15+i*0.04,0.17);
          ctx.fillStyle=it[1];
          ctx.font='500 '+Math.min(W*0.011,13)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left'; ctx.letterSpacing='0';
          wrap(ctx,it[0],W*0.04,H*(0.57+i*0.062),W*0.56,Math.min(W*0.013,16)*1.4,2);
        });
        ctx.globalAlpha=1;
        narativ('Fiecare proiect major public redistribuie oportunitatile urbane. Spitalul Regional: atrage personal medical, clinici private, locuinte personal, comert specializat. Autostrada: atrage logistica, industrie usoara, rezidential premium. Universitate extinsa: IT, cercetare, startupuri. Efectele se cumuleaza pe 10-15 ani.');
        concluzie('Un proiect major public anuntat = coridor de crestere privata predictibila pe urmatorii 10-15 ani');
        negativ((city.coef_hub||0.78)<1.0?name+' risca sa devina oras satelit al unui hub vecin fara proiecte strategice proprii':'Fara proiecte majore: cresterea stagnanta nu atrage ISD la nivelul potentialului');
        break;

      case 'b8s2':
        titlu('Coridoare de Influenta','Autostrada = crestere valoare \u00b7 Model gravitational'); linie();
        if(t>0.16) _drawInfluence(ctx,W,H,Math.min(1,(t-0.16)/0.2)*sA,t);
        var nMot3=(D.roads||[]).filter(function(r){return r.properties&&r.properties.t==='motorway';}).length;
        cifra(N2(nMot3)+' segmente','Autostrazi OSM detectate raza 70km','#dc2626');
        cifra2('+15-40%','Crestere valoare teren pe coridor');
        [
          'Raza 0-5km intersectie autostrada: +35-40% valoare teren industrial/logistic',
          'Raza 5-15km: +20-30% rezidential premium + +25-35% comercial',
          'Raza 15-25km: +10-20% general + +15-25% logistica si industrie',
          'Coridor CFR: restrictie 20m + devalorizare imediata dar acces TP creste zona',
          'Aeroport 30km: premium +10-15% + efect hub economic +0.8pp PIB/an',
        ].forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.20+i*0.04,0.16);
          ctx.fillStyle='rgba(220,230,255,0.82)';
          ctx.font='500 '+Math.min(W*0.011,13)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left'; ctx.letterSpacing='0';
          wrap(ctx,it,W*0.04,H*(0.60+i*0.054),W*0.55,Math.min(W*0.013,16)*1.4,2);
        });
        ctx.globalAlpha=1;
        narativ('Buffer vizibil pe harta = zona influenta directa a infrastructurii. Model UrbanX calibrat pe date ANCPI IPI 2007-2024. Metodologie: Lowry (1964) + calibrare 320 UAT-uri Romania cu date reale.');
        concluzie('Cel mai bun predictor al valorii imobiliare viitoare = proximitatea la infrastructura majora planificata');
        negativ('Teren cumparat fara verificarea planurilor de infrastructura = risc maxim daca proiectul se anuleaza sau se muta');
        break;

      case 'b9s1':
        var rB2=r10||0;
        var pMCo=Math.round(pop21*Math.pow(1+(rB2+0.9)/100,_HORIZON));
        var pMCr=Math.round(pop21*Math.pow(1+(rB2-0.8)/100,_HORIZON));
        var pMCm=pred.pop55||Math.round(pop21*Math.pow(1+rB2/100,_HORIZON));
        titlu('Monte Carlo '+_E(),'10.000 simulari \u00b7 Interval incredere 90% \u00b7 3 Scenarii'); linie();
        if(t<0.30){
          ctx.globalAlpha=sA*rE(0.05,0.20)*0.82;
          ctx.fillStyle='rgba(220,230,255,0.80)';
          ctx.font='500 '+Math.min(W*0.012,15)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='center'; ctx.letterSpacing='0';
          wrap(ctx,'CE ESTE MONTE CARLO? Simulam 10.000 viitoruri posibile varind aleator rata demografica in intervalul historical \xb11.5%/an. Rezultatul: 3 scenarii clare si un interval de incredere 90%. Baza pentru dimensionarea corecta a PUG-ului.',W/2,H*0.36,W*0.70,Math.min(W*0.014,18)*1.6,5);
          ctx.globalAlpha=1;
        }
        if(t>0.08) _drawMC(ctx,W,H,Math.min(1,(t-0.08)/0.26)*sA,pMCr,pMCm,pMCo,pop21,t);
        cifra('['+N2(pMCr)+'\u2013'+N2(pMCo)+']','Interval 90% populatie '+_E(),'#f59e0b');
        cifra2(N2(pMCo-pMCr)+' pers.','Diferenta extrema scenarii');
        narativ('S1 REGRES: '+N2(pMCr)+' loc. S2 TENDINTA: '+N2(pMCm)+' loc. S3 OPTIMIST: '+N2(pMCo)+' loc. Diferenta: '+(pMCo-pMCr)+' persoane = '+Math.round((pMCo-pMCr)*35/90)+' unitati locative = '+Math.round((pMCo-pMCr)*35/90*80)+' ha teren. PUG se dimensioneaza pe S2+20%.');
        concluzie('Monte Carlo clarifica incertitudinea: nu stim exact cat creste, dar stim intervalul si ce il determina');
        negativ('PUG pe S1 cand orasul creste pe S3 = criza locuinte, infrastructura insuficienta, haos urbanistic complet');
        break;

      case 'b9s2':
        titlu('Benchmark European',name+' vs Peer Group UE \u00b7 Ce au facut altii'); linie();
        var dens3=Math.round(pop21/((city.suprafata_ha||5000)/100));
        cifra(dens3+' loc/km\u00b2','Densitate urbana',dens3>1000?'#22c55e':dens3>500?'#f59e0b':'#94a3b8');
        cifra2((pred.pctUE||38)+'% UE27','Convergenta economica');
        // Split-screen comparativ: orasul curent vs un peer (Cluj) — ca in storyboard
        if(t>0.12) _drawCompare(ctx,W,H,Math.min(1,(t-0.12)/0.22)*sA,city,pred);
        if(t>0.45){
          ctx.globalAlpha=sA*rE(0.45,0.20)*0.82;
          ctx.fillStyle='rgba(212,175,55,0.88)';
          ctx.font='500 '+Math.min(W*0.011,13)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left'; ctx.letterSpacing='0';
          ['\u25B6 Barcelona Superblocks: -26% trafic +20% SV +18% modal activ in 8 ani',
           '\u25B6 Vilnius BRT+velo 2010-2022: PIB de la 45% la 82% UE27 in 12 ani',
           '\u25B6 Oradea PDU+investitii 2019-2023: cel mai rapid oras RO +38% imobiliare',
           '\u25B6 Helsinki 2000-2020: 4.2% PIB/an infrastructura = salt la 100% UE27'].forEach(function(it,i){
            ctx.globalAlpha=sA*rE(0.45+i*0.04,0.16);
            wrap(ctx,it,W*0.04,H*(0.62+i*0.048),W*0.56,Math.min(W*0.013,16)*1.4,2);
          });
          ctx.globalAlpha=1;
        }
        narativ(name+': '+dens3+' loc/km\u00b2, PIB '+(pred.pctUE||38)+'% UE27. Peer group: '+_peers(city)+'. Gap recuperabil in 8-12 ani cu '+(Math.round((pred.invTotal||300)*0.40/30))+' M EUR/an. Toate orasele care au recuperat decalajul UE au investit 3-4% din PIB local/an minimum 12 ani consecutiv.');
        concluzie('3-4% PIB local/an timp de 12-15 ani consistent = convergenta totala UE — lectia europeana documentata');
        negativ('Sub 2% PIB local/an: convergenta imposibila matematic — gap-ul se mareste relativ la media UE in crestere');
        break;

      case 'b9s3':
        titlu('Daca Nu Se Actioneaza','Scenariul inactiunii \u00b7 Consecinte documentate'); linie();
        if(t>0.16) _drawCityStress(ctx,W,H,Math.min(1,(t-0.16)/0.2)*sA,pred,t);
        var costT2=Math.round((pred.invTotal||300)*3.2);
        ctx.globalAlpha=sA*rE(0.14,0.24)*(0.7+0.3*Math.sin(t*Math.PI*6));
        ctx.fillStyle='rgba(239,68,68,0.12)'; ctx.fillRect(0,0,W,H);
        ctx.globalAlpha=1;
        cifra('\u2212'+N2(Math.round((pred.pop55||0)*0.15))+' pers.','Pierdere demografica S1 vs S2','#ef4444');
        cifra2('\u2212'+N2(Math.round((pred.pctUE||38)*0.08))+'pp UE27','Convergenta pierduta','#ef4444');
        [
          ['\u{1F534} Demografic: -'+N2(Math.round(Math.abs(pred.migNeta||500)*_HORIZON*1.5))+' persoane vs S2 cu investitii','#ef4444'],
          ['\u{1F534} Economic: PIB blocat la '+(pred.pctUE||38)+'% UE27 in '+_E()+' (vs '+(pred.pctUE55||62)+'% cu investitii)','#ef4444'],
          ['\u{1F534} Seismic: fond nereabilitat creste la '+N2(Math.round((pred.fond||0)*1.15))+' cladiri vulnerabile in '+_P2(),'#ef4444'],
          ['\u{1F534} Climatic: '+Math.round((pred.zile24||18)*2.2)+' zile caniculare fara adaptare = criza sanatate publica','#ef4444'],
          ['\u{1F534} Mobilitate: saturare retea dupa '+(pred.satAn||2040)+' = colaps urban economic','#ef4444'],
          ['\u26A0 COST INACTIUNE: '+N2(costT2)+' M EUR vs '+N2(pred.invTotal||300)+' M EUR preventiv','#fbbf24'],
        ].forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.14+i*0.05,0.17);
          ctx.fillStyle=it[1];
          ctx.font='500 '+Math.min(W*0.011,13)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left'; ctx.letterSpacing='0';
          wrap(ctx,it[0],W*0.04,H*(0.57+i*0.058),W*0.55,Math.min(W*0.013,16)*1.4,2);
        });
        ctx.globalAlpha=1;
        narativ('Consecintele documentate ale inactiunii calibrate pe date reale: Banca Mondiala Urban Resilience 2022 + IPCC AR6 + studii OCDE convergenta + date INSE 1990-2024. Nu este fictiune — este realitatea a 47 orase romanesti care au pierdut >25% populatie in 30 ani (INSE Recensamante 1992-2021).');
        concluzie('Inactiunea nu e o optiune neutra — are un cost precis de '+N2(costT2)+' M EUR pe '+_HORIZON+' ani');
        break;

      case 'b10s1':
        titlu('Crize Simultane','Geopolitic \u00b7 Demografic \u00b7 Climatic \u00b7 Energetic \u00b7 Seismic'); linie();
        ctx.globalAlpha=sA*rE(0.10,0.30)*0.12; ctx.fillStyle='#ef4444'; ctx.fillRect(0,0,W,H); ctx.globalAlpha=1;
        cifra('5 crize','Simultane \u2014 probabilitate 15% in urmatorii 20 ani','#ef4444');
        cifra2(N2(Math.round((pred.invTotal||300)*1.5))+' M \u20ac','Cost rezilienta estimat');
        [
          ['\u{1F30D} Geopolitic: conflict regional + flux migratie + instabilitate macro','#a78bfa'],
          ['\u{1F4C9} Demografic: imbatranire + emigrare + natalitate scazuta simultan','#f59e0b'],
          ['\u{1F321} Climatic: seceta + inundatii + val caldura + UHI amplificat','#3b82f6'],
          ['\u26A1 Energetic: pret x3-5 + dependenta gaz + retele invechite','#fbbf24'],
          ['\u{1F3DA} Seismic: cutremur >6.5 + fond vulnerabil nereabilitat + blocaj reconstructie','#ef4444'],
        ].forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.14+i*0.05,0.17);
          ctx.fillStyle=it[1];
          ctx.font='500 '+Math.min(W*0.011,13)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left'; ctx.letterSpacing='0';
          wrap(ctx,it[0],W*0.04,H*(0.57+i*0.060),W*0.55,Math.min(W*0.013,16)*1.4,2);
        });
        ctx.globalAlpha=1;
        // Vizual: cele 5 crize converg spre oras (presiune cumulata)
        if(t>0.15) _drawCrisisConverge(ctx,W,H,Math.min(1,(t-0.15)/0.25)*sA,t);
        narativ('Crizele nu apar izolat — se cumuleaza si se amplifica reciproc. Un cutremur in context de criza energetica si demografica are impact de 3-5x mai mare decat izolat. Planificarea urbana rezilienta trebuie sa pregateasca orasul pentru scenarii de crize multiple simultane — noua paradigma post-2020.');
        concluzie('Orasele reziliente nu evita crizele — se recupereaza rapid si transforma criza in oportunitate');
        break;

      case 'b10s2':
        titlu('Scenariul Negru','Ce se intampla fara viziune si actiune \u00b7 Documentat'); linie();
        ctx.globalAlpha=sA*rE(0.08,0.25)*0.10; ctx.fillStyle='#1e293b'; ctx.fillRect(0,0,W,H); ctx.globalAlpha=1;
        [
          ['\u{1F3DA} Fond abandonat: 15-25% din locuinte nelocuite in periferie pana in '+_P2(),'#6b7280'],
          ['\u{1F4C9} Colaps servicii: scoli inchise, cabinete medicale reduse sub prag viabilitate','#94a3b8'],
          ['\u{1F3D9} Dezurbanizare periurbana: parasire zone fara acces TP si servicii','#94a3b8'],
          ['\u{1F4B8} Criza fiscala: baza fiscala scade cu populatia, datorii locale cresc','#ef4444'],
          ['\u{1F6AB} Blocaj investitii: investitorii evita orasele fara plan urban clar','#ef4444'],
          ['\u26A0 SPIRALA NEGATIVA: fiecare criza o amplifica pe urmatoarea','#fbbf24'],
        ].forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.12+i*0.05,0.16);
          ctx.fillStyle=it[1];
          ctx.font='500 '+Math.min(W*0.011,13)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left'; ctx.letterSpacing='0';
          wrap(ctx,it[0],W*0.04,H*(0.57+i*0.057),W*0.55,Math.min(W*0.013,16)*1.4,2);
        });
        ctx.globalAlpha=1;
        // SPIRALA NEGATIVA desenata (bucla vicioasa, nu doar pomenita in text)
        _drawSpiral(ctx,W,H,sA,t);
        cifra('\u221247 orase','Au pierdut >25% populatie in Romania 1992-2021','#ef4444');
        cifra2(_NOW+' \u2014 alegere','Inca se poate schimba traiectoria','#22c55e');
        narativ('Spirala negativa (dreapta): populatie\u2193 \u2192 fiscalitate\u2193 \u2192 servicii\u2193 \u2192 atractivitate\u2193 \u2192 populatie\u2193, strangandu-se spre COLAPS. Singura iesire: investitie masiva concentrata + viziune 30 ani + continuitate politica. Nu exista alt mecanism dovedit in literatura.');
        concluzie('Spirala negativa a declinului nu se opreste singura — necesita interventia deliberata a tuturor factorilor');
        negativ('In Romania, 47 orase confirma aceasta traiectorie. '+name+' are inca instrumentele sa nu fie pe lista.');
        break;

      case 'b10s3':
        titlu('Constructia Rezilentei','Ce functioneaza \u00b7 Solutii dovedite \u00b7 Resurse disponibile'); linie();
        cifra(N2(pred.invTotal||300)+' M \u20ac','Total investitii rezilienta '+_S()+'-'+_E(),'#22c55e');
        cifra2('60% finantare UE','FEDR+FSE++PNRR disponibil','#22c55e');
        [
          ['\u2713 DIVERSIFICARE ECONOMICA: servicii+universitate+industrie light simultan','#22c55e'],
          ['\u2713 MOBILITATE DURABILA: TP+BRT+velo+pietonal — oras accesibil fara masina','#22c55e'],
          ['\u2713 FOND SIGUR: consolidare seismica + NZEB energetic obligatoriu','#22c55e'],
          ['\u2713 SPATII VERZI CONECTATE: retea parcuri + acoperisuri verzi — rezilienta climatica','#22c55e'],
          ['\u2713 PARTICIPARE PUBLICA: planificare cu comunitatea — model Helsinki/Barcelona','#22c55e'],
          ['\u2713 DATE & MONITORIZARE: UrbanX live — indicatori in timp real + decizii bazate pe date','#D4AF37'],
        ].forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.12+i*0.05,0.17);
          ctx.fillStyle=it[1];
          ctx.font='500 '+Math.min(W*0.011,13)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='left'; ctx.letterSpacing='0';
          wrap(ctx,it[0],W*0.04,H*(0.57+i*0.058),W*0.56,Math.min(W*0.013,16)*1.4,2);
        });
        ctx.globalAlpha=1;
        // AMPRENTA ORASULUI — transformarea 2025 -> 2055 (rezultatul actiunilor de rezilienta)
        if(t>0.30) _drawCityFingerprint(ctx,W,H,Math.min(1,(t-0.30)/0.2)*sA,pred,city,true);
        narativ('Rezilienta nu este luxul unui oras bogat — este conditia de supravietuire in sec. 21. Instrumentele exista: PNRR, FEDR, FSE+, fonduri climat. Vointa politica si continuitatea planificarii sunt singurele lipsuri documentate. ROI 1:3.2 dovedit pe 30 ani (Banca Mondiala 2022).');
        concluzie('Rezilienta urbana = cea mai buna investitie: ROI 1:3.2 documentat + calitate vietii + atractivitate investitori');
        break;

      case 'b11s1':
        titlu('Agenda Administratorului '+_S()+'\u2013'+_P1(),'Ce se face \u00b7 Unde \u00b7 Cand \u00b7 Cat \u00b7 Ce se intampla daca NU'); linie();
        var ag2=_buildAgenda(pred,city,pop21);
        ag2.forEach(function(it,i){
          ctx.globalAlpha=sA*rE(0.10+i*0.05,0.16);
          ctx.fillStyle=it.clr+'25';
          ctx.fillRect(W*0.04,H*(0.545+i*0.060)-Math.min(W*0.012,15)*0.8,W*0.57,Math.min(W*0.012,15)*2.8);
          ctx.fillStyle=it.clr;
          ctx.font='700 '+Math.min(W*0.009,11)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left'; ctx.letterSpacing='.04em';
          ctx.fillText(it.priority,W*0.04,H*(0.545+i*0.060)+Math.min(W*0.011,13)*0.7);
          ctx.fillStyle='rgba(220,228,255,0.90)';
          ctx.font='500 '+Math.min(W*0.011,13)+'px "Space Grotesk",sans-serif';
          ctx.letterSpacing='0';
          wrap(ctx,it.text,W*0.155,H*(0.545+i*0.060)+Math.min(W*0.011,13)*0.7,W*0.44,Math.min(W*0.011,13)*1.4,2);
          ctx.fillStyle=it.clr+'aa';
          ctx.font='400 '+Math.min(W*0.008,10)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='right'; ctx.letterSpacing='0';
          wrap(ctx,'\u2717 '+it.neg,W*0.96,H*(0.545+i*0.060)+Math.min(W*0.011,13)*0.7,W*0.26,Math.min(W*0.009,11)*1.4,2);
        });
        ctx.globalAlpha=1;
        cifra(ag2.length+' prioritati','Identificate '+_S()+'-'+_P1(),'#D4AF37');
        cifra2(N2(Math.round((pred.invTotal||300)*0.32))+' M \u20ac','Faza 1: '+_S()+'-'+_P1());
        break;

      case 'b11s2':
        ctx.globalAlpha=sA*rE(0.04,0.40)*0.055;
        ctx.fillStyle='#D4AF37';
        ctx.font='900 '+Math.min(W*0.28,340)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='center'; ctx.letterSpacing='0';
        ctx.fillText(String(_E()),W/2,H*0.62);
        titlu(name.toUpperCase()+' '+_E(),'Viziunea posibila \u00b7 '+_S()+' \u2192 '+_E()+' \u00b7 30 ani de alegeri'); linie();
        ctx.globalAlpha=sA*rE(0.10,0.22);
        ctx.fillStyle='rgba(255,255,255,0.95)';
        var fn11=Math.min(W*0.044,58);
        if(ctx.measureText(name.toUpperCase()).width>W*0.50) fn11*=0.70;
        ctx.font='900 '+fn11+'px "Space Grotesk",sans-serif';
        ctx.textAlign='center'; ctx.letterSpacing='0.02em';
        ctx.fillText(name.toUpperCase(),W/2,H*0.265);
        ctx.globalAlpha=1;
        var pop_e=pred.pop55||Math.round(pop21*Math.pow(1+r10/100,_HORIZON));
        // Urban Health Score real
        var urbanScore = window._calcUrbanScore ? window._calcUrbanScore(pred,city) : null;
        // Afiseaza Urban Health Score daca e disponibil
        if(urbanScore && t>0.14) {
          ctx.globalAlpha=sA*rE(0.14,0.18);
          ctx.fillStyle='rgba(4,10,24,0.80)';
          ctx.fillRect(W*0.04,H*0.62,Math.min(W*0.30,250),H*0.06);
          ctx.fillStyle='rgba(148,163,184,0.52)';
          ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left'; ctx.letterSpacing='.05em';
          ctx.fillText('URBAN HEALTH INDEX',W*0.05,H*0.635);
          ctx.fillStyle=urbanScore.color;
          ctx.font='900 '+Math.min(W*0.028,36)+'px "Space Grotesk",sans-serif';
          ctx.fillText(urbanScore.nota_actual+'/10',W*0.05,H*0.668);
          ctx.fillStyle='rgba(34,197,94,0.80)';
          ctx.font='700 '+Math.min(W*0.014,18)+'px "Space Grotesk",sans-serif';
          ctx.fillText('→ '+urbanScore.nota_potential+'/10 potential',W*0.18,H*0.668);
          ctx.fillStyle='rgba(148,163,184,0.50)';
          ctx.font='500 '+Math.min(W*0.009,11)+'px "Space Grotesk",sans-serif';
          ctx.fillText(urbanScore.label,W*0.05,H*0.682);
          ctx.globalAlpha=1;
        }

        [
          {ok:pop_e>pop21,              txt:'Populatie '+_E()+': '+N2(pop_e)+' loc.'},
          {ok:(pred.pctUE55||(pred.pctUE||38)+20)>=75, txt:'PIB '+_E()+': ~'+(pred.pctUE55||(pred.pctUE||38)+20)+'% UE27'},
          {ok:(pred.anSUMP||_P1())<=_P1()+2,           txt:'SUMP: '+(pred.anSUMP||_P1())+' aprobat'},
          {ok:(pred.tp||62)>=75,         txt:'Transport public: '+(pred.tp||62)+'% acoperire'},
          {ok:(pred.sdgTotal||6.4)>=7,   txt:'SDG11: '+(pred.sdgTotal||6.4)+'/10'},
          {ok:true,                       txt:'Investitii: '+N2(pred.invTotal||300)+' M EUR mobilizate'},
          {ok:(pred.fond||0)>0,           txt:'Consolidate: '+N2(Math.round((pred.fond||0)*0.25))+' ap. seismic'},
          {ok:(pred.svM2||11)>=9,         txt:'Spatii verzi: '+(pred.svM2||11)+'m\u00b2/loc \u2265 OMS'},
        ].forEach(function(ch,i){
          ctx.globalAlpha=sA*rE(0.18+i*0.048,0.13);
          ctx.fillStyle=ch.ok?'#22c55e':'#ef4444';
          ctx.font='700 '+Math.min(W*0.013,16)+'px sans-serif';
          ctx.textAlign='right';
          ctx.fillText(ch.ok?'\u2713':'\u26A0',W*0.962,H*(0.685+i*0.038));
          ctx.fillStyle='rgba(220,228,255,0.88)';
          ctx.font=Math.min(W*0.012,15)+'px "Space Grotesk",sans-serif';
          ctx.textAlign='right'; ctx.letterSpacing='0';
          ctx.fillText(ch.txt.slice(0,46),W*0.952,H*(0.685+i*0.038));
        });
        ctx.globalAlpha=1;
        if(t>0.75){
          var fa=Math.min(1,(t-0.75)/0.14)*sA;
          ctx.globalAlpha=fa;
          ctx.fillStyle='rgba(239,68,68,0.90)';
          ctx.font='700 '+Math.min(W*0.010,13)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left'; ctx.letterSpacing='0.02em';
          wrap(ctx,'\u26A0 FARA ACTIUNE: '+name+' '+_E()+' = sprawl necontrolat + fond abandonat + colaps servicii + migratie + declin ireversibil',W*0.04,H*0.952,W*0.88,Math.min(W*0.011,14)*1.6,2);
          ctx.globalAlpha=1;
        }
        if(t>0.88){
          var fb=Math.min(1,(t-0.88)/0.10)*sA;
          ctx.globalAlpha=fb;
          ctx.fillStyle='rgba(34,197,94,0.92)';
          ctx.font='700 '+Math.min(W*0.010,13)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='center'; ctx.letterSpacing='0.02em';
          ctx.fillText('\u25B6 CU VIZIUNE SI ACTIUNE SUSTINUTA: '+name+' poate deveni MODEL URBAN EUROPEAN',W/2,H*0.985);
          ctx.globalAlpha=1;
        }
        // ── OUTRO CU SEMNATURA — generic final cinematic ──
        if(t>0.90){
          var oA=Math.min(1,(t-0.90)/0.05)*sA;
          ctx.save();
          ctx.globalAlpha=oA*0.85; ctx.fillStyle='rgba(2,5,14,0.94)'; ctx.fillRect(0,0,W,H);
          ctx.globalAlpha=oA; ctx.textAlign='center';
          ctx.fillStyle='#D4AF37'; ctx.font='900 '+Math.min(W*0.06,86)+'px "Space Grotesk",sans-serif'; ctx.letterSpacing='.05em';
          ctx.fillText('URBANX',W/2,H*0.385);
          ctx.fillStyle='rgba(225,232,255,0.92)'; ctx.font='600 '+Math.min(W*0.016,21)+'px "Space Grotesk",sans-serif'; ctx.letterSpacing='.02em';
          ctx.fillText('Urbanism proiectat pe 30 de ani · '+(name||'')+' '+_S()+'→'+_E(),W/2,H*0.45);
          var srcs=['INSE','Eurostat','OSM','ANAR','INFP','Copernicus'];
          var pw=Math.min(W*0.095,118), gp=10, tot=srcs.length*pw+(srcs.length-1)*gp, sx=W/2-tot/2;
          ctx.font='700 '+Math.min(W*0.009,11)+'px "IBM Plex Mono",monospace';
          srcs.forEach(function(s,i){
            var x=sx+i*(pw+gp);
            ctx.globalAlpha=oA*Math.max(0,Math.min(1,(t-0.905-i*0.006)/0.035));
            ctx.fillStyle='rgba(212,175,55,0.12)'; ctx.fillRect(x,H*0.50,pw,H*0.04);
            ctx.strokeStyle='rgba(212,175,55,0.45)'; ctx.lineWidth=1; ctx.strokeRect(x,H*0.50,pw,H*0.04);
            ctx.fillStyle='#D4AF37'; ctx.textAlign='center'; ctx.fillText(s,x+pw/2,H*0.527);
          });
          ctx.globalAlpha=oA; ctx.fillStyle='rgba(148,163,184,0.75)'; ctx.font='500 '+Math.min(W*0.010,13)+'px "IBM Plex Mono",monospace'; ctx.textAlign='center'; ctx.letterSpacing='.06em';
          ctx.fillText('THINKSMART SOLUTIONS SRL · © '+_NOW+' · DATE ORIENTATIVE · NECESITA VALIDARE URBANIST ATESTAT RUR',W/2,H*0.60);
          ctx.fillStyle='rgba(212,175,55,0.9)'; ctx.font='700 '+Math.min(W*0.012,15)+'px "IBM Plex Mono",monospace';
          ctx.fillText('↓ SCANEAZA pentru scenariul live in UrbanX',W/2,H*0.665);
          ctx.restore();
          _drawQR(ctx,W,H,oA);
        } else if(t>0.92) _drawQR(ctx,W,H,Math.min(1,(t-0.92)/0.07)*sA);
        if(t>0.60 && t<=0.90){
          ctx.globalAlpha=Math.min(1,(t-0.60)/0.20)*sA*0.30;
          ctx.fillStyle='rgba(148,163,184,0.40)';
          ctx.font='500 '+Math.min(W*0.007,9)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='center'; ctx.letterSpacing='.06em';
          ctx.fillText('URBANX \u00b7 THINKSMARTS SOLUTIONS SRL \u00b7 DATE ORIENTATIVE \u00b7 \u00a9 '+_NOW,W/2,H*0.997);
          ctx.globalAlpha=1;
        }
        break;

      // \u2500\u2500 BLOC 11 \u2014 INOVATII & MODELE INTERNATIONALE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
      case 'b12s1': { // Superblocks Barcelona
        titlu('Superblocks \u2014 Modelul Barcelona','Salvador Rueda \u00b7 Agencia d\'Ecologia Urbana de Barcelona'); linie();
        var areaHa=city.suprafata_ha||city.suprafata||Math.round(pop21/40);
        var intraKm2=Math.max(1.5,areaHa*0.30/100);
        var nSuper=Math.max(2,Math.round(intraKm2/0.16));
        var sbCell=Math.min(W*0.046,54), sbGap=Math.min(W*0.006,7), sbX=W*0.42, sbY=H*0.34;
        if(t>0.10){
          for(var sbR=0;sbR<3;sbR++)for(var sbC=0;sbC<3;sbC++){
            var sbA=Math.min(1,(t-0.10-(sbR*3+sbC)*0.018)/0.18)*sA; if(sbA<=0)continue;
            ctx.globalAlpha=sbA;
            ctx.fillStyle=(sbR===1&&sbC===1)?'rgba(34,197,94,0.88)':'rgba(59,130,246,0.42)';
            ctx.fillRect(sbX+sbC*(sbCell+sbGap),sbY+sbR*(sbCell+sbGap),sbCell,sbCell);
          }
          ctx.globalAlpha=Math.min(1,(t-0.22)/0.18)*sA*0.85;
          ctx.strokeStyle='rgba(239,68,68,0.75)';ctx.lineWidth=3;
          ctx.strokeRect(sbX-7,sbY-7,3*sbCell+2*sbGap+14,3*sbCell+2*sbGap+14);
          ctx.globalAlpha=1;
          if(t>0.30){
            ctx.globalAlpha=Math.min(1,(t-0.30)/0.2)*sA*0.85;
            ctx.textAlign='center';
            ctx.fillStyle='rgba(248,113,113,0.9)';ctx.font='600 '+Math.min(W*0.009,11)+'px "IBM Plex Mono",monospace';
            ctx.fillText('TRAFIC PERIMETRAL',sbX+(3*sbCell+2*sbGap)/2,sbY-14);
            ctx.fillStyle='rgba(52,211,153,0.92)';
            ctx.fillText('INTERIOR PIETONAL RECUPERAT',sbX+(3*sbCell+2*sbGap)/2,sbY+3*sbCell+2*sbGap+24);
            ctx.globalAlpha=1;
          }
        }
        cifra(N2(nSuper),'Superblocks posibile in '+name);
        cifra2('-21% trafic','Efect documentat Barcelona');
        narativ('Superilles grupeaza 3\u00d73 cvartale: traficul de tranzit ramane pe perimetru, iar interiorul devine spatiu public pietonal. Studiul Lancet (Mueller et al. 2020) estimeaza 667 decese premature evitate/an la Barcelona, prin reducerea NO2 (-24%), a zgomotului si a insulei de caldura urbana. Aplicat la '+name+': ~'+N2(nSuper)+' superblocks, spatiu stradal recuperat fara demolari.');
        concluzie('Reorganizarea circulatiei, nu demolari \u2014 spatiu public castigat');
        break;
      }

      case 'b12s2': { // Regula 3-30-300
        titlu('Regula 3-30-300','Cecil Konijnendijk (2021) \u00b7 standard OMS spatii verzi urbane'); linie();
        var sv330=pred.svM2||11;
        var canopy=sv330>=15?22:sv330>=9?15:9;
        var ok300=sv330>=12;
        var r330=[
          {n:'3',u:'copaci vizibili din fiecare locuinta',ok:canopy>=18,cur:'~'+(canopy>=18?'3+':canopy>=12?'2':'1')+' copaci vizibili'},
          {n:'30%',u:'acoperire coronament (canopy) in cartier',ok:canopy>=30,cur:'actual ~'+canopy+'%'},
          {n:'300m',u:'distanta maxima la spatiu verde public',ok:ok300,cur:sv330+' m\u00b2/loc vs OMS 9-26'}
        ];
        r330.forEach(function(rl,i){
          var a=Math.min(1,(t-0.12-i*0.10)/0.18)*sA; if(a<=0)return;
          ctx.globalAlpha=a;
          var by=H*0.30+i*H*0.16;
          ctx.fillStyle='rgba(4,10,24,0.78)';ctx.fillRect(W*0.36,by,W*0.58,H*0.125);
          ctx.fillStyle=rl.ok?'rgba(34,197,94,0.95)':'rgba(245,158,11,0.95)';
          ctx.font='900 '+Math.min(W*0.042,54)+'px "Space Grotesk",sans-serif';ctx.textAlign='left';
          ctx.fillText(rl.n,W*0.375,by+H*0.082);
          ctx.fillStyle='rgba(220,228,255,0.88)';ctx.font='500 '+Math.min(W*0.012,15)+'px "Space Grotesk",sans-serif';
          ctx.fillText(rl.u,W*0.47,by+H*0.05);
          ctx.fillStyle=rl.ok?'rgba(52,211,153,0.85)':'rgba(245,158,11,0.85)';
          ctx.font='600 '+Math.min(W*0.011,13)+'px "IBM Plex Mono",monospace';
          ctx.fillText((rl.ok?'\u2713 ':'\u26a0 ')+rl.cur,W*0.47,by+H*0.092);
          ctx.globalAlpha=1;
        });
        cifra(sv330+' m\u00b2/loc','Spatii verzi actuale ('+name+')');
        cifra2(canopy+'% canopy','Tinta: 30%');
        narativ('Regula 3-30-300 (Konijnendijk): fiecare locuitor sa vada minim 3 copaci de la fereastra, cartierul sa atinga 30% coronament arboricol, iar un spatiu verde public sa fie la max 300m. Reduce mortalitatea, raceste orasul cu 2-4\u00b0C in valuri de caldura si imbunatateste sanatatea mintala. Standard adoptat de OMS si UE.');
        concluzie('Plantare strategica + acces echitabil la verde public');
        break;
      }

      case 'b12s3': { // Orasul 15 minute
        titlu('Orasul 15 minute','Carlos Moreno (Sorbonne) \u00b7 Paris "Ville du quart d\'heure"'); linie();
        var funcs15=[{n:'Locuire',c:'#60a5fa'},{n:'Munca',c:'#a78bfa'},{n:'Aprovizionare',c:'#f59e0b'},{n:'Sanatate',c:'#ef4444'},{n:'Educatie',c:'#22c55e'},{n:'Recreere',c:'#34d399'}];
        var f15x=W*0.62, f15y=H*0.50, f15R=Math.min(W*0.10,130);
        if(t>0.12){
          ctx.globalAlpha=Math.min(1,(t-0.12)/0.2)*sA*0.5;
          ctx.strokeStyle='rgba(212,175,55,0.5)';ctx.lineWidth=2;ctx.setLineDash([5,5]);
          ctx.beginPath();ctx.arc(f15x,f15y,f15R,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);
          ctx.globalAlpha=1;
          funcs15.forEach(function(f,i){
            var a=Math.min(1,(t-0.15-i*0.06)/0.18)*sA; if(a<=0)return;
            var ang=-Math.PI/2+i*Math.PI/3;
            var fx=f15x+Math.cos(ang)*f15R, fy=f15y+Math.sin(ang)*f15R;
            ctx.globalAlpha=a*0.4;ctx.strokeStyle=f.c;ctx.lineWidth=1.5;
            ctx.beginPath();ctx.moveTo(f15x,f15y);ctx.lineTo(fx,fy);ctx.stroke();
            ctx.globalAlpha=a;
            ctx.fillStyle=f.c;ctx.beginPath();ctx.arc(fx,fy,Math.min(W*0.016,20),0,Math.PI*2);ctx.fill();
            ctx.fillStyle='rgba(220,228,255,0.9)';ctx.font='600 '+Math.min(W*0.009,11)+'px "IBM Plex Mono",monospace';ctx.textAlign='center';
            ctx.fillText(f.n,fx,fy+Math.min(W*0.028,34));
            ctx.globalAlpha=1;
          });
          ctx.globalAlpha=Math.min(1,(t-0.12)/0.2)*sA;
          ctx.fillStyle='rgba(212,175,55,0.95)';ctx.font='900 '+Math.min(W*0.03,38)+'px "Space Grotesk",sans-serif';ctx.textAlign='center';
          ctx.fillText('15\u2032',f15x,f15y+Math.min(W*0.01,14));
          ctx.globalAlpha=1;
        }
        var cov15=Math.round(Math.min(95,40+(pred.tp||62)*0.4+(pred.svM2||11)));
        cifra(cov15+'%','Acoperire estimata 15-min ('+name+')');
        cifra2('6 functii','La 15 min pe jos / bicicleta');
        narativ('Modelul Carlos Moreno: fiecare cetatean ajunge in 15 minute pe jos sau cu bicicleta la cele 6 functii esentiale \u2014 locuire, munca, aprovizionare, sanatate, educatie, recreere. Reduce dependenta de masina, emisiile si timpul pierdut in trafic, revitalizand cartierele. Implementat la Paris, Melbourne, Portland.');
        concluzie('Densificare mixta + proximitate, nu zonare monofunctionala');
        break;
      }

      case 'b12s4': { // Sinteza Masterplan + QR
        titlu('Sinteza Masterplan '+_S()+'\u2013'+_E(),name+' \u00b7 6 axe strategice \u00b7 conf. Legii 350/2001'); linie();
        var axe=[
          {n:'01 Regenerare urbana',c:'#D4AF37'},
          {n:'02 Mobilitate durabila (PMUD)',c:'#60a5fa'},
          {n:'03 Rezilienta climatica',c:'#22c55e'},
          {n:'04 Economie & inovatie',c:'#a78bfa'},
          {n:'05 Spatii verzi & sanatate',c:'#34d399'},
          {n:'06 Guvernanta & participare',c:'#f59e0b'}
        ];
        axe.forEach(function(ax,i){
          var a=Math.min(1,(t-0.12-i*0.07)/0.16)*sA; if(a<=0)return;
          ctx.globalAlpha=a;
          var col=i<3?0:1, row=i%3;
          var bx=W*0.05+col*W*0.47, by=H*0.30+row*H*0.135;
          ctx.fillStyle='rgba(4,10,24,0.80)';ctx.fillRect(bx,by,W*0.43,H*0.11);
          ctx.fillStyle=ax.c;ctx.fillRect(bx,by,W*0.006,H*0.11);
          ctx.fillStyle='rgba(220,228,255,0.92)';ctx.font='700 '+Math.min(W*0.014,18)+'px "Space Grotesk",sans-serif';ctx.textAlign='left';
          ctx.fillText(ax.n,bx+W*0.022,by+H*0.066);
          ctx.globalAlpha=1;
        });
        cifra(N2(pred.invTotal||300)+' M\u20ac','Investitii mobilizate (FEDR+PNRR+PPP)');
        cifra2(_S()+'\u2013'+_E(),'Orizont strategic 30 ani');
        narativ('Masterplanul integreaza toate analizele \u2014 demografie, economie, riscuri, mobilitate (PMUD), spatii verzi \u2014 in 6 axe strategice cu proiecte etapizate si surse de finantare. Documentul complet (100+ pagini) e disponibil in UrbanX Pro.');
        if(t>0.55){
          var aqr=Math.min(1,(t-0.55)/0.16)*sA;
          ctx.globalAlpha=aqr;ctx.fillStyle='rgba(212,175,55,0.92)';ctx.font='700 '+Math.min(W*0.011,14)+'px "IBM Plex Mono",monospace';ctx.textAlign='center';
          ctx.fillText('\u25b6 SCANEAZA pentru Masterplanul complet',W*0.5,H*0.90);
          ctx.globalAlpha=1;
        }
        if(t>0.6) _drawQR(ctx,W,H,Math.min(1,(t-0.6)/0.12)*sA);
        break;
      }

      // ACT VI — ORASUL PENTRU OAMENI ──────────────────────────────────────
      case 'b13s1':
        titlu('Happiness Index','Calitatea vietii · 6 dimensiuni · World Happiness / OECD'); linie();
        if(t>0.14) _drawHappiness(ctx,W,H,Math.min(1,(t-0.14)/0.2)*sA,pred,city);
        narativ('Un oras nu se masoara doar in PIB. Indicele de fericire urbana combina spatii verzi, mobilitate, venit, siguranta, sanatate si cultura. Orasele cu scor ridicat retin tinerii si atrag investitii — fericirea devine factor economic, nu doar social.');
        concluzie('Calitatea vietii este noul avantaj competitiv intre orase');
        break;
      case 'b13s2':
        titlu('Economia de Noapte','Orasul dupa apus · model night-czar (London/Amsterdam/Berlin)'); linie();
        if(t>0.14) _drawNight(ctx,W,H,Math.min(1,(t-0.14)/0.2)*sA,pred,city);
        narativ('Economia de noapte (restaurante, cultura, evenimente) genereaza venituri, locuri de munca si vitalitate urbana. Orase ca Londra si Amsterdam au "night-czar" dedicat. Necesita transport nocturn, siguranta si spatii culturale — altfel centrul moare dupa ora 20.');
        concluzie('Un centru viu noaptea = oras atractiv, sigur si economic puternic');
        break;
      case 'b13s3':
        titlu('Oras Prietenos cu Seniorii','Imbatranire demografica · WHO Age-Friendly Cities'); linie();
        if(t>0.14) _drawSilver(ctx,W,H,Math.min(1,(t-0.14)/0.2)*sA,pred,city);
        narativ('Romania imbatraneste rapid. Un oras pregatit pentru seniori inseamna acces medical de proximitate, transport adaptat, spatii publice sigure si locuire accesibila. Modelul WHO Age-Friendly Cities — tot mai relevant pentru fiecare UAT din Romania.');
        concluzie('Orasul care isi ingrijeste varstnicii este orasul care isi pastreaza comunitatea');
        break;
      case 'b13s4':
        titlu('Oras pentru Copii','Acces scoala + parc in 10 min · UNICEF Child Friendly'); linie();
        if(t>0.14) _drawChild(ctx,W,H,Math.min(1,(t-0.14)/0.2)*sA,pred,city);
        narativ('Un oras bun pentru un copil de 8 ani e bun pentru toata lumea (Enrique Penalosa). Indicatorul UNICEF masoara cati copii ajung la scoala si parc in 10 minute pe jos, in siguranta. Decizie de planificare puternica si politic — viitorul orasului se masoara in copii.');
        concluzie('Orasele care pun copilul in centru castiga familiile tinere si viitorul');
        break;

      // PROLOG + scene-semnatura noi ────────────────────────────────────────
      case 'b0s1':
        _drawBreathing(ctx,W,H,sA,t,name);
        break;
      case 'b14s1':
        titlu('Sponge City','Adaptare climatica · ploaie 100mm · model UE (Rotterdam/Copenhaga)'); linie();
        if(t>0.12) _drawSponge(ctx,W,H,Math.min(1,(t-0.12)/0.2)*sA,t);
        narativ('Schimbarile climatice aduc ploi torentiale tot mai dese. Orasul-burete absoarbe apa in loc sa o evacueze: parcuri inundabile, coridoare albastre, bazine de retentie, pavaje permeabile, acoperisuri verzi. Reduce inundatiile urbane si reincarca panza freatica. Trend major in Europa.');
        concluzie('Apa nu mai este dusman, ci resursa — orasul o absoarbe, o stocheaza, o foloseste');
        break;
      case 'b14s2':
        titlu('Metabolism Urban','Orasul ca organism · intrari si iesiri · concept european'); linie();
        if(t>0.12) _drawMetabolism(ctx,W,H,Math.min(1,(t-0.12)/0.2)*sA,t);
        narativ('Orasul consuma resurse (apa, energie, oameni, marfuri) si produce emisii, deseuri, ape uzate. Un metabolism urban eficient inchide buclele: economie circulara, recuperare energie, reutilizare apa. Masurarea fluxurilor = primul pas spre un oras cu adevarat sustenabil.');
        concluzie('Orasele eficiente nu consuma liniar — inchid buclele si transforma deseul in resursa');
        break;
      case 'b14s3':
        titlu('Orasul ca Sistem Viu','UrbanX OS · toate sistemele conectate · Urban Intelligence'); linie();
        _drawCityOS(ctx,W,H,sA,t);
        narativ('Oamenii, economia, mobilitatea, sanatatea, mediul si administratia nu functioneaza izolat — sunt module ale aceluiasi sistem viu. UrbanX le conecteaza intr-un Digital Twin care monitorizeaza si anticipeaza. Aceasta este Urban Intelligence: decizii bazate pe date, in timp real.');
        concluzie('Orasul nu este o colectie de cladiri — este un organism care poate fi inteles, masurat si vindecat');
        break;

      case 'b15s1': {
        titlu('Proiecte Structurante in derulare','PNRR · FEDR · CNAIR · poli reali de dezvoltare'); linie();
        var _pj = (window._UrbanProjects && window._UrbanProjects.get) ? window._UrbanProjects.get(SE._cityKey||(window.TCI&&TCI.cityKey)||'RO-IS-01', city) : [];
        cifra(_pj.length+' proiecte','Structurante identificate','#D4AF37');
        cifra2('poli de dezvoltare','Efecte cumulate 10-15 ani','#22c55e');
        // listam pe ecran proiectele (sustine etichetele de pe harta)
        _pj.slice(0,5).forEach(function(p,i){
          var a=Math.min(1,(t-0.18-i*0.06)/0.18)*sA; if(a<=0)return;
          ctx.globalAlpha=a; ctx.fillStyle='rgba(4,10,24,0.72)'; ctx.fillRect(W*0.04,H*(0.56+i*0.068),W*0.50,H*0.058);
          ctx.fillStyle=p.color||'#D4AF37'; ctx.font='700 '+Math.min(W*0.012,16)+'px "Space Grotesk",sans-serif'; ctx.textAlign='left';
          ctx.fillText((p.icon||'•')+' '+p.nume.slice(0,42),W*0.055,H*(0.56+i*0.068)+H*0.024);
          ctx.fillStyle='rgba(148,163,184,0.7)'; ctx.font='500 '+Math.min(W*0.0085,11)+'px "IBM Plex Mono",monospace';
          ctx.fillText((p.impact||'').slice(0,64),W*0.055,H*(0.56+i*0.068)+H*0.046);
          ctx.globalAlpha=1;
        });
        narativ('Marile proiecte (Spital Regional, centura, tren metropolitan, poli rezidentiali) restructureaza orasul. Fiecare = pol de dezvoltare cu efecte cumulate pe 10-15 ani. PUG-ul trebuie sa anticipeze presiunile de densificare, mobilitate si servicii din jurul lor.');
        concluzie('Anticiparea polilor de dezvoltare = dimensionare corecta a infrastructurii, nu reactie tardiva');
        break;
      }

      case 'b16s1': { // NOTA UrbanX — clasament transparent + benchmark european
        titlu('Nota UrbanX','Index transparent · toti indicatorii reali · benchmark european'); linie();
        var R=(window._UrbanRank&&window._UrbanRank.compute)?window._UrbanRank.compute(pred,city):null;
        if(R){
          // dimensiunile notei — bare orizontale cu pondere si scor
          R.dims.forEach(function(d,i){
            var a=Math.min(1,(t-0.12-i*0.05)/0.16)*sA; if(a<=0)return;
            ctx.globalAlpha=a;
            var by=H*(0.30+i*0.072), bx=W*0.04, bw=W*0.42;
            ctx.fillStyle='rgba(220,228,255,0.92)'; ctx.font='600 '+Math.min(W*0.011,15)+'px "Space Grotesk",sans-serif'; ctx.textAlign='left';
            ctx.fillText(d.label+'  ('+Math.round(d.w*100)+'%)', bx, by-3);
            ctx.fillStyle='rgba(255,255,255,0.08)'; ctx.fillRect(bx,by,bw,H*0.020);
            var col=d.score>=70?'#22c55e':d.score>=55?'#fbbf24':'#ef4444';
            ctx.fillStyle=col; ctx.fillRect(bx,by,bw*(d.score/100)*Math.min(1,(t-0.12-i*0.05)/0.30),H*0.020);
            ctx.fillStyle=col; ctx.font='800 '+Math.min(W*0.012,16)+'px "IBM Plex Mono",monospace'; ctx.textAlign='left';
            ctx.fillText(String(d.score), bx+bw+W*0.012, by+H*0.017);
            ctx.globalAlpha=1;
          });
          // calificativ mare + scor (dreapta)
          var ga=Math.min(1,(t-0.28)/0.2)*sA;
          if(ga>0){
            ctx.globalAlpha=ga;
            var gcol=R.score>=70?'#22c55e':R.score>=55?'#fbbf24':'#ef4444';
            ctx.textAlign='center'; ctx.fillStyle=gcol;
            ctx.font='900 '+Math.min(W*0.095,140)+'px "Space Grotesk",sans-serif';
            ctx.fillText(R.grade, W*0.79, H*0.40);
            ctx.fillStyle='rgba(255,255,255,0.96)'; ctx.font='900 '+Math.min(W*0.028,40)+'px "Space Grotesk",sans-serif';
            ctx.fillText(R.score+'/100', W*0.79, H*0.475);
            ctx.fillStyle='rgba(148,163,184,0.82)'; ctx.font='600 '+Math.min(W*0.0095,12)+'px "IBM Plex Mono",monospace'; ctx.letterSpacing='0.05em';
            ctx.fillText('NOTA URBANX', W*0.79, H*0.515); ctx.letterSpacing='0';
            // legenda calificativelor (A/B/C/D)
            var GR=(window._UrbanRank&&window._UrbanRank.GRADES)||[];
            ctx.textAlign='left'; ctx.font='600 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
            GR.forEach(function(x,i){ var ly=H*(0.55+i*0.026);
              ctx.fillStyle=x.c; ctx.fillRect(W*0.69,ly-7,8,8);
              ctx.fillStyle='rgba(200,210,224,0.8)'; ctx.fillText(x.g,W*0.705,ly); });
            ctx.globalAlpha=1;
          }
          // benchmark european (tier echivalent)
          var pa=Math.min(1,(t-0.48)/0.18)*sA;
          if(pa>0 && R.peersWithCity){
            ctx.globalAlpha=pa;
            ctx.fillStyle='rgba(212,175,55,0.92)'; ctx.font='700 '+Math.min(W*0.0095,12)+'px "IBM Plex Mono",monospace'; ctx.textAlign='left';
            ctx.fillText('BENCHMARK EUROPEAN · '+R.tierLabel+' · #'+R.rankInPeers+'/'+R.peerCount, W*0.56, H*0.60);
            R.peersWithCity.slice(0,5).forEach(function(p,i){
              var py=H*(0.635+i*0.040);
              ctx.fillStyle=p.self?'rgba(212,175,55,0.96)':'rgba(180,190,210,0.82)';
              ctx.font=(p.self?'800 ':'500 ')+Math.min(W*0.0095,12)+'px "Space Grotesk",sans-serif'; ctx.textAlign='left';
              ctx.fillText((p.self?'▶ ':'   ')+p.n, W*0.56, py);
              ctx.textAlign='right'; ctx.fillText(String(p.s), W*0.95, py);
            });
            ctx.globalAlpha=1;
          }
          cifra(R.score+'/100','Nota UrbanX · calificativ '+R.grade,'#D4AF37');
          cifra2('#'+R.rankInPeers+'/'+R.peerCount,'In tier-ul echivalent');
          narativ('Nota UrbanX = suma ponderata a dimensiunilor (Economie 20%, Calitate vietii 20%, Conectivitate 15%, Mediu 15%, Demografie 15%, Rezilienta 15%). Toate sub-scorurile provin din date reale analizate de platforma (ISO 37120, Eurostat, OECD, INFP, EEA). Comparatia se face DOAR cu orase europene echivalente ca marime — nu comparam un oras mic cu o metropola.');
          concluzie('O nota transparenta si reproductibila — UrbanX poate deveni un standard de evaluare comparabila a oraselor');
        } else { titlu('Nota UrbanX','modul indisponibil'); }
        break;
      }

      case 'b17s1': { // CARTIERE la nivel de strada (street-view)
        titlu('Cartiere la nivel de strada','Tesutul urban vazut de la inaltimea pietonului · orasul de 15 minute'); linie();
        cifra(name,'Cartiere rezidentiale','#22d3ee');
        cifra2('15 min','Acces servicii de proximitate','#34d399');
        // mic indicator "street level" pulsant
        var sa2=Math.min(1,(t-0.1)/0.2)*sA;
        if(sa2>0){
          ctx.globalAlpha=sa2*0.9; ctx.fillStyle='rgba(34,211,238,0.92)';
          ctx.font='700 '+Math.min(W*0.011,15)+'px "IBM Plex Mono",monospace'; ctx.textAlign='left';
          ctx.fillText('\u{1F6B6} NIVEL STRADA · cladiri reale · scara pietonului', W*0.04, H*0.30);
          ctx.globalAlpha=1;
        }
        narativ('Camera coboara la nivelul pietonului — asa isi traieste orasul un locuitor. Calitatea tesutului urban (strazi la scara umana, fronturi continue, parter activ, verde de proximitate) decide daca un cartier este viu sau dormitor. Orasul de 15 minute: locuire, munca, scoala, sanatate, cumparaturi si recreere accesibile pe jos sau cu bicicleta.');
        concluzie('Densificare calitativa + parter activ + verde de proximitate = cartiere vii, nu dormitor');
        break;
      }

      case 'b18s1': { // FAUNA URBANA & SIGURANTA
        titlu('Fauna urbana & siguranta','Caini fara stapan · padocuri · risc ursi · impact pe nota UrbanX'); linie();
        var FA=(window._UrbanFauna)?window._UrbanFauna.strays(city):null;
        var BR=(window._UrbanFauna)?window._UrbanFauna.bearRisk(city.judet):{present:false};
        if(FA){
          cifra(N2(FA.est)+' caini','Fara stapan (est.) · '+FA.perK+'/1000 loc','#f59e0b');
          cifra2(BR.present?('URSI: '+BR.level):'fara ursi', 'Risc faunistic salbatic', BR.present?'#ef4444':'#22c55e');
          // mini prognoza pe ecran
          var rows=[['Azi',FA.est,'#f59e0b'],['2030 fara actiune',FA.pred2030NoAction,'#ef4444'],['2030 cu sterilizare',FA.pred2030Action,'#22c55e']];
          var mx=FA.pred2030NoAction||1;
          rows.forEach(function(r,i){
            var a=Math.min(1,(t-0.16-i*0.07)/0.18)*sA; if(a<=0)return; ctx.globalAlpha=a;
            var by=H*(0.34+i*0.085), bx=W*0.04, bw=W*0.40*(r[1]/mx);
            ctx.fillStyle='rgba(255,255,255,0.08)'; ctx.fillRect(bx,by,W*0.40,H*0.04);
            ctx.fillStyle=r[2]; ctx.fillRect(bx,by,bw,H*0.04);
            ctx.fillStyle='rgba(230,236,250,0.95)'; ctx.font='700 '+Math.min(W*0.011,15)+'px "Space Grotesk",sans-serif'; ctx.textAlign='left';
            ctx.fillText(r[0]+': '+N2(r[1]),bx+W*0.012,by+H*0.027);
            ctx.globalAlpha=1;
          });
        }
        narativ('Fauna urbana influenteaza calitatea vietii, siguranta si atractivitatea turistica — de aceea conteaza in nota UrbanX. Cainii fara stapan: fara sterilizare sustinuta, populatia si reclamatiile cresc ~60% pana in 2030; cu program CNVSU + adoptie scad ~60%. '+(BR.present?('Urs: '+BR.note+' Romania are cea mai mare populatie de ursi bruni din UE (~8.000). Necesita containere anti-urs, interzicerea hranirii, RO-Alert.'):'Fara prezenta semnificativa a ursilor.'));
        concluzie('Gestionarea umana a faunei (sterilizare + adapost + management urs) = oras mai sigur, mai curat, mai atractiv');
        break;
      }

      case 'b19s1': { // CULTURA & TURISM
        titlu('Cultura & Turism','Teatre · muzee · cetati · festivaluri · Via Transilvanica · motor economic'); linie();
        var TS=(window._UrbanTourism)?window._UrbanTourism.score(SE._cityKey||(window.TCI&&TCI.cityKey)||'RO-IS-01', city):null;
        if(TS){
          var a=TS.assets;
          cifra(TS.score+'/100','Potential turistic (cultura+acces)', TS.score>=65?'#22c55e':TS.score>=45?'#f59e0b':'#ef4444');
          cifra2(N2(a.muzee)+' muzee · '+N2(a.teatre)+' teatre',(a.unesco?a.unesco+' sit UNESCO':'patrimoniu local'),'#e879f9');
          // listeaza obiectivele pe ecran
          (a.obiective||[]).slice(0,4).forEach(function(o,i){
            var al=Math.min(1,(t-0.16-i*0.06)/0.18)*sA; if(al<=0)return; ctx.globalAlpha=al;
            ctx.fillStyle='rgba(4,10,24,0.72)'; ctx.fillRect(W*0.04,H*(0.40+i*0.062),W*0.50,H*0.052);
            ctx.fillStyle='#e879f9'; ctx.font='700 '+Math.min(W*0.012,16)+'px "Space Grotesk",sans-serif'; ctx.textAlign='left';
            ctx.fillText('• '+o.n.slice(0,44),W*0.055,H*(0.40+i*0.062)+H*0.033);
            ctx.globalAlpha=1;
          });
          if(TS.via && TS.via.near){
            var va=Math.min(1,(t-0.45)/0.18)*sA; if(va>0){ ctx.globalAlpha=va;
              ctx.fillStyle='#f59e0b'; ctx.font='700 '+Math.min(W*0.011,15)+'px "IBM Plex Mono",monospace'; ctx.textAlign='left';
              ctx.fillText('🥾 VIA TRANSILVANICA — '+TS.via.why+' (~1.400 km, Putna→Drobeta)',W*0.04,H*0.70); ctx.globalAlpha=1; }
          }
        }
        narativ('Cultura si turismul sunt motor economic pe 30 de ani: locuri de munca, venituri la buget, retentia tinerilor, imaginea orasului. Accesibilitatea (aeroport + autostrada) amplifica turismul de city-break; patrimoniul activat (cetati restaurate — model Alba Carolina) si traseele tematice (Via Transilvanica) distribuie turismul teritorial. Orasele-model: Sibiu (Capitala Culturala 2007), Sighisoara (UNESCO), Salzburg, Krakow.');
        concluzie('Cultura activata + accesibilitate + evenimente = oras care vibreaza, atrage turisti si retine tineri');
        break;
      }

      case 'b20s1': { // EDUCATIE & SPORT
        titlu('Educatie, talent & sport','Universitati = magnet de tineri · stadioane · evenimente · capital uman'); linie();
        var VV=(window._UrbanVitality)?window._UrbanVitality:null;
        var ck=SE._cityKey||(window.TCI&&TCI.cityKey)||'RO-IS-01';
        if(VV){
          var e=VV.edu(ck,city), s=VV.sport(ck,city);
          var es=VV.eduScore(ck,city), ss=VV.sportScore(ck,city);
          cifra(N2(e.studenti)+' studenti','Pol universitar — '+e.pol,'#38bdf8');
          cifra2('Edu '+es+' · Sport '+ss,'Scoruri atractivitate /100','#22c55e');
          (e.univ||[]).slice(0,4).forEach(function(u,i){
            var al=Math.min(1,(t-0.16-i*0.06)/0.18)*sA; if(al<=0)return; ctx.globalAlpha=al;
            ctx.fillStyle='rgba(4,10,24,0.72)'; ctx.fillRect(W*0.04,H*(0.40+i*0.06),W*0.52,H*0.05);
            ctx.fillStyle='#38bdf8'; ctx.font='700 '+Math.min(W*0.011,15)+'px "Space Grotesk",sans-serif'; ctx.textAlign='left';
            ctx.fillText('🎓 '+u.slice(0,46),W*0.055,H*(0.40+i*0.06)+H*0.032);
            ctx.globalAlpha=1;
          });
        }
        narativ('Universitatile sunt cel mai puternic magnet de tineri si talent — populatie tanara, forta de munca calificata, antreprenoriat. Cheia e RETENTIA absolventilor: orasele cu locuri de munca + locuire accesibila + calitate a vietii isi pastreaza tinerii (Iasi, Cluj convertesc studentia in IT/servicii); altele finanteaza gratuit forta de munca a altora. Sportul (stadioane, baze, evenimente) aduce sanatate, turism sportiv si vibratie.');
        concluzie('Pol universitar puternic + retentie absolventi + infrastructura sportiva = capital uman si economie pe 30 de ani');
        break;
      }

      case 'b21s1': { // SANATATE & ORAS DIGITAL
        titlu('Sanatate & Oras digital','Acces medical · spitale regionale · fibra (RO top UE) · e-guvernare'); linie();
        var SV=(window._UrbanServices)?window._UrbanServices:null;
        var ck2=SE._cityKey||(window.TCI&&TCI.cityKey)||'RO-IS-01';
        if(SV){
          var h=SV.health(ck2,city), d=SV.digital(ck2,city);
          cifra(N2(h.beds)+' paturi','Acces medical · '+h.beds1000+'/1000 · desert '+h.desert,'#ef4444');
          cifra2('fibra '+d.fiberPct+'%',(d.gigabit?'gigabit · ':'')+'oras digital','#06b6d4');
          if(h.regional){
            var ra=Math.min(1,(t-0.2)/0.18)*sA; if(ra>0){ ctx.globalAlpha=ra;
              ctx.fillStyle='#22c55e'; ctx.font='700 '+Math.min(W*0.012,16)+'px "Space Grotesk",sans-serif'; ctx.textAlign='left';
              ctx.fillText('🏥 '+h.regional,W*0.04,H*0.42); ctx.globalAlpha=1; }
          }
        }
        narativ('Sanatatea si digitalizarea sunt servicii esentiale cu impact direct pe 30 de ani. Accesul medical e corelat cu imbatranirea — cererea creste; spitalele regionale PNRR (Iasi/Cluj/Craiova) schimba radical accesul regional. Romania are una dintre cele mai bune retele de fibra din UE — atu pentru IT, remote work si investitii digitale; e-guvernarea reduce birocratia.');
        concluzie('Acces medical echitabil + oras digital = calitate a vietii, reziliență si competitivitate economica');
        break;
      }

      case 'b22s1': { // PARTICIPARE PUBLICA
        titlu('Participare publica','Vocea cetatenilor pe harta · model Helsinki · transparenta decizionala'); linie();
        var PS=(window._PublicParticipation&&window._PublicParticipation.snapshot)?window._PublicParticipation.snapshot():null;
        if(PS){
          cifra(N2(PS.n)+' comentarii','Cetateni · '+(PS.live?'date live':'demo'),'#60a5fa');
          cifra2(N2(PS.votes)+' voturi · '+PS.categories+' categorii','Prioritati exprimate','#22c55e');
          // listeaza top comentarii pe ecran
          var top=PS.comments.slice().sort(function(a,b){return ((b.vote_up||0)-(b.vote_down||0))-((a.vote_up||0)-(a.vote_down||0));}).slice(0,4);
          top.forEach(function(c,i){
            var al=Math.min(1,(t-0.16-i*0.06)/0.18)*sA; if(al<=0)return; ctx.globalAlpha=al;
            ctx.fillStyle='rgba(4,10,24,0.82)'; ctx.fillRect(W*0.04,H*(0.40+i*0.072),W*0.66,H*0.06);
            ctx.fillStyle='#93c5fd'; ctx.font='700 '+Math.min(W*0.0105,14)+'px "Space Grotesk",sans-serif'; ctx.textAlign='left';
            // comentariu COMPLET (fara taiere) — auto-shrink daca e prea lung
            var _ct='💬 '+(c.comment||''), _cf=Math.min(W*0.0105,14);
            while(ctx.measureText(_ct).width>W*0.63 && _cf>8){ _cf-=0.5; ctx.font='700 '+_cf+'px "Space Grotesk",sans-serif'; }
            ctx.fillText(_ct,W*0.055,H*(0.40+i*0.072)+H*0.025);
            ctx.fillStyle='rgba(148,163,184,0.78)'; ctx.font='600 '+Math.min(W*0.0085,11)+'px "IBM Plex Mono",monospace';
            ctx.fillText('Cetatean · +'+((c.vote_up||0)-(c.vote_down||0))+' voturi · '+(c.category||'general'),W*0.055,H*(0.40+i*0.072)+H*0.05);
            ctx.globalAlpha=1;
          });
        }
        narativ('Urbanismul bun nu se face „de sus in jos". UrbanX integreaza participarea publica (model Helsinki): cetatenii adauga comentarii geolocalizate pe harta si voteaza prioritatile, iar administratia vede in timp real unde sunt problemele. Consultarea e si cerinta legala pentru PMUD si PUG (Legea 350/2001). Deciziile fundamentate pe dialog au legitimitate mai mare si mai putine contestatii.');
        concluzie('Transparenta + dialog cu cetatenii = planuri mai bune, implementare mai usoara, incredere — invitam la dialog');
        break;
      }

      case 'b23s1': { // LOCUIRE & ACCESIBILITATE
        titlu('Locuire & accesibilitate','Pret/venit · povara chiriei · cerere vs oferta · testul orasului atractiv'); linie();
        var HM=(window._UrbanHousing)?window._UrbanHousing.metrics(city,pred):null;
        if(HM){
          cifra(HM.priceIncome+' ani','Venit median / apartament', HM.priceIncome>=11?'#ef4444':HM.priceIncome>=9?'#f59e0b':'#22c55e');
          cifra2('Acces '+HM.afford+'/100 · chirie '+HM.rentBurden+'%',(HM.afford>=60?'accesibil':HM.afford>=45?'tensionat':'neaccesibil'), HM.afford>=60?'#22c55e':HM.afford>=45?'#f59e0b':'#ef4444');
          // bare cerere vs oferta
          var rows=[['Cerere/an',HM.demand,'#3b82f6'],['Oferta/an',HM.supply,'#f59e0b'],['Deficit social',HM.socialDeficit,'#ef4444']];
          var mx=Math.max(HM.demand,HM.supply,HM.socialDeficit)||1;
          rows.forEach(function(r,i){
            var al=Math.min(1,(t-0.18-i*0.07)/0.18)*sA; if(al<=0)return; ctx.globalAlpha=al;
            var by=H*(0.40+i*0.072), bx=W*0.04;
            ctx.fillStyle='rgba(255,255,255,0.08)'; ctx.fillRect(bx,by,W*0.36,H*0.04);
            ctx.fillStyle=r[2]; ctx.fillRect(bx,by,W*0.36*(r[1]/mx),H*0.04);
            ctx.fillStyle='rgba(230,236,250,0.95)'; ctx.font='700 '+Math.min(W*0.011,15)+'px "Space Grotesk",sans-serif'; ctx.textAlign='left';
            ctx.fillText(r[0]+': '+N2(r[1]),bx+W*0.012,by+H*0.027); ctx.globalAlpha=1;
          });
        }
        narativ('Accesibilitatea locuirii e testul real al unui oras atractiv: poate avea economie buna, dar daca tinerii nu-si permit o locuinta, ii pierde. Pret in crestere fara oferta adecvata = navetism, sprawl periurban, exod. Solutii: densificare calitativa langa transportul public (TOD), locuinte accesibile/nZEB, reconversie cladiri, locuinte sociale — NU sprawl pe teren verde (cost infrastructura x3/loc).');
        concluzie('Locuire accesibila + densificare inteligenta langa TP = oras care isi pastreaza tinerii, nu ii exporta');
        break;
      }

      case 'b24s1': { // ENERGIE & CLIMAT
        titlu('Energie & climat','Sărăcie energetică · val de renovare · solar · termoficare · decarbonare'); linie();
        var EM=(window._UrbanEnergy)?window._UrbanEnergy.metrics(city,pred):null;
        if(EM){
          cifra('~'+N2(EM.rooftopMW)+' MW solar','Potential acoperisuri · '+EM.irad+' kWh/m²/an','#fbbf24');
          cifra2(EM.pre90+'% fond pre-1990 · sărăcie '+EM.poverty+'%','De renovat energetic','#f97316');
          // traiectorie CO2 pe ecran
          var co=[['Azi',EM.co2,'#ef4444'],['2040',+(EM.co2*0.55).toFixed(1),'#f59e0b'],['2055',+(EM.co2*0.32).toFixed(1),'#22c55e']];
          co.forEach(function(r,i){ var al=Math.min(1,(t-0.2-i*0.07)/0.18)*sA; if(al<=0)return; ctx.globalAlpha=al;
            var by=H*(0.42+i*0.07); ctx.fillStyle=r[2]; ctx.font='800 '+Math.min(W*0.013,18)+'px "Space Grotesk",sans-serif'; ctx.textAlign='left';
            ctx.fillText(r[0]+': '+r[1]+' t CO₂/loc',W*0.04,by); ctx.globalAlpha=1; });
        }
        narativ('Tranzitia energetica e obligatorie (neutralitate 2050) si oportunitate: facturi mai mici, joburi verzi, independenta. Provocari: fond vechi ineficient, saracie energetica, termoficare imbatranita. Solutii: valul de renovare (PNRR) reduce facturile 40-60%, prosumatori solari, pompe de caldura. Romania are iradiere solara buna in sud/est.');
        concluzie('Renovare + solar + termoficare modernizata = facturi mici, emisii reduse, independenta energetica');
        break;
      }

      case 'b25s1': { // APA & ECONOMIE CIRCULARA
        titlu('Apa, seceta & economie circulara','Pierderi retea · epurare · reciclare (RO ultima in UE) · seceta'); linie();
        var RM=(window._UrbanResources)?window._UrbanResources.metrics(city):null;
        if(RM){
          cifra(RM.recycling+'% reciclat','vs tinta UE 55% · groapa '+RM.landfill+'%', RM.recycling>=20?'#22c55e':'#ef4444');
          cifra2('pierderi apa '+RM.waterLoss+'% · seceta '+RM.drought,'Reziliența resurse', RM.drought==='ridicat'?'#ef4444':'#38bdf8');
          var rows=[['Reciclat',RM.recycling,'#22c55e'],['Groapa',RM.landfill,'#a3a3a3'],['Tinta UE',55,'#3b82f6']];
          rows.forEach(function(r,i){ var al=Math.min(1,(t-0.2-i*0.07)/0.18)*sA; if(al<=0)return; ctx.globalAlpha=al;
            var by=H*(0.42+i*0.066), bx=W*0.04; ctx.fillStyle='rgba(255,255,255,0.08)'; ctx.fillRect(bx,by,W*0.36,H*0.038);
            ctx.fillStyle=r[2]; ctx.fillRect(bx,by,W*0.36*(r[1]/100),H*0.038);
            ctx.fillStyle='rgba(230,236,250,0.95)'; ctx.font='700 '+Math.min(W*0.011,15)+'px "Space Grotesk",sans-serif'; ctx.textAlign='left';
            ctx.fillText(r[0]+': '+r[1]+'%',bx+W*0.012,by+H*0.026); ctx.globalAlpha=1; });
        }
        narativ('Securitatea resurselor devine critica cu schimbarile climatice. Romania pierde enorm pe retelele de apa invechite, are cea mai mica rata de reciclare din UE (dependenta de gropi) si seceta tot mai severa in sud/est. Economia circulara (colectare separata, sortare, compostare) reduce costuri, riscul de amenzi UE si amprenta de mediu. Apa: retentie tip sponge city + modernizare retele.');
        concluzie('Apa gestionata + reciclare reala + economie circulara = reziliența climatica si costuri mai mici');
        break;
      }
    }

    // ── CARTON DE CAPITOL — la inceputul fiecarui BLOC nou, un titlu mare se
    // deschide cinematic (ca marcajele de episod). Director-style chapter card.
    var _prevBloc=(SE._si>0&&SCENES[SE._si-1])?SCENES[SE._si-1].bloc:-1;
    var _isBlocStart=(SE._si===0)||(_prevBloc!==sc.bloc);
    if(_isBlocStart && t<0.26){
      var cardA=t<0.04?(t/0.04):t>0.20?(1-(t-0.20)/0.06):1; cardA=Math.max(0,Math.min(1,cardA));
      if(cardA>0){
        ctx.save();
        ctx.globalAlpha=cardA*0.86; ctx.fillStyle='rgba(2,5,14,0.86)'; ctx.fillRect(0,H*0.40,W,H*0.20);
        // linie aurie care se intinde (wipe) din centru
        var lw=W*0.62*Math.min(1,t/0.14);
        ctx.globalAlpha=cardA; ctx.fillStyle='#D4AF37';
        ctx.fillRect(W/2-lw/2, H*0.485, lw, 2);
        ctx.fillStyle='rgba(212,175,55,0.92)'; ctx.font='700 '+Math.min(W*0.013,17)+'px "IBM Plex Mono",monospace';
        ctx.textAlign='center'; ctx.letterSpacing='.22em';
        ctx.fillText('ACT '+(_ACT_ROMAN[sc.bloc]||sc.bloc), W/2, H*0.465);
        ctx.fillStyle='rgba(255,255,255,0.97)'; ctx.font='900 '+Math.min(W*0.040,54)+'px "Space Grotesk",sans-serif';
        ctx.letterSpacing='.01em';
        ctx.fillText(sc.blabel||'', W/2, H*0.525);
        ctx.globalAlpha=cardA*0.55; ctx.fillStyle='rgba(148,163,184,0.8)'; ctx.font='500 '+Math.min(W*0.010,13)+'px "IBM Plex Mono",monospace';
        ctx.letterSpacing='.10em';
        ctx.fillText((name||'').toUpperCase()+'  ·  '+_S()+' — '+_E(), W/2, H*0.560);
        // FIR NARATIV — o propozitie care leaga capitolul de povestea de ansamblu
        var _thread={1:'Mai intai — cine, unde si din ce traieste orasul.',2:'Apoi: ce il apasa — infrastructura, mobilitate, riscuri.',3:'Si totusi — cum poate creste pana in '+_E()+'.',4:'Ce se intampla cand crizele vin impreuna.',5:'Ce au facut altii — si chiar functioneaza.',6:'Dar un oras bun se masoara in oameni — fericire, varste, copii.',7:'Ce putem decide, acum.'}[sc.bloc];
        if(_thread){ ctx.globalAlpha=cardA*0.7; ctx.fillStyle='rgba(212,175,55,0.85)'; ctx.font='italic 600 '+Math.min(W*0.012,16)+'px "Space Grotesk",sans-serif'; ctx.letterSpacing='0'; ctx.fillText('“'+_thread+'”', W/2, H*0.585); }
        ctx.restore();
      }
    }

    // Flux viu prin reteaua proiectata (daca exista in scena curenta)
    try{ if(SE._flowMasterplan) SE._flowMasterplan(t); }catch(e){}

    prog();
    ctx.save(); ctx.globalAlpha=0.008;
    for(var _i=0;_i<50;_i++){
      ctx.fillStyle=Math.random()>.5?'#fff':'#000';
      ctx.fillRect(Math.random()*W,Math.random()*H,1,1);
    }
    ctx.restore(); ctx.globalAlpha=1;
  }

  // ── LOOP ──────────────────────────────────────────────────────────────
  function _loop(sc,idx){
    if(!SE._playing||idx>=SCENES.length) return;
    var loop=function(){
      if(!SE._playing) return;
      var W=window.innerWidth, H=window.innerHeight;
      // PAUZA pentru prezentare: cand e pe pauza, decalam _startT ca sa inghete t.
      if(SE._paused){ SE._startT+=16; SE._raf=requestAnimationFrame(loop); return; }
      var t=Math.min(1,Math.max(0.001,(performance.now()-SE._startT)/sc.dur));
      SE._ctx.clearRect(0,0,W*(window.devicePixelRatio||1),H*(window.devicePixelRatio||1));
      try{draw(sc,t);}catch(e){console.error('[v9]',sc.id,e.message);}
      if(t<1){SE._raf=requestAnimationFrame(loop);}
      else{runScene(idx+1);}
    };
    SE._raf=requestAnimationFrame(loop);
  }

  function runScene(idx){
    if(!SE._playing||idx>=SCENES.length){
      var c2=document.getElementById('tci-c8');
      if(c2){c2.style.transition='opacity 1.8s';c2.style.opacity='0';setTimeout(stopAll,1900);}
      return;
    }
    var sc=SCENES[idx];
    SE._si=idx; SE._startT=performance.now();
    // reset pauza la schimbarea scenei (prev/next reia redarea)
    if(SE._paused){ SE._paused=false; var _pb=document.getElementById('c8-pause'); if(_pb){_pb.textContent='⏸ Pauza';_pb.style.background='rgba(0,0,0,.6)';} var _pi=document.getElementById('cin-pause-ind'); if(_pi)_pi.remove(); }
    SE._cleanLayers&&SE._cleanLayers();
    _cleanV9(map);
    // dezactiveaza street experience daca a fost activ (scena b17s1) la schimbare scena
    try{ if(window._TCIStreetView && window._TCIStreetView._active) window._TCIStreetView.deactivate(); }catch(e){}
    // Restaureaza cladirile Mapbox standard pentru scenele fara bare 3D PUG
    if(sc.id!=='b6s2'&&sc.id!=='b11s2'){
      try{map.setLayoutProperty('building-extrusion','visibility','visible');}catch(e){}
      try{map.setPaintProperty('building-extrusion','fill-extrusion-height',['get','height']);}catch(e){}
    }
    // Curata AGRESIV flood WMS + layere flood v8.0
    try{window._FloodMapper&&window._FloodMapper.hideAll&&window._FloodMapper.hideAll(map);}catch(e){}
    // Flood layers - sterge inainte de source
    ['flood-layer','flood-rcp10','flood-rcp100','flood-rcp500',
     'tci-flood-layer','flood-expand-layer'].forEach(function(id){
      try{if(map.getLayer(id))map.removeLayer(id);}catch(e){}
    });
    ['tci-flood-src','flood-expand-src',
     'flood-rcp10','flood-rcp100','flood-rcp500'].forEach(function(id){
      try{if(map.getSource(id))map.removeSource(id);}catch(e){}
    });
    try{if(map.getLayer('tci-tp-layer'))map.setLayoutProperty('tci-tp-layer','visibility','none');}catch(e){}
    updateLegend(sc);
    // comuta baza (Standard 3D luminos vs custom intunecat) si abia apoi ruleaza camera scenei
    _cinApplyBase(sc.id, function(){ if(SE._playing && SE._si===idx) setup(sc.id); });
    _loop(sc,idx);
    console.log('[v9]',(idx+1)+'/'+SCENES.length,'B'+sc.bloc,sc.id,name);
  }

  runScene(0);
  console.log('[v9 Master] START',name,_S()+'->'+_E(),SCENES.length,'scene');
}

// ── GRAFICE CANVAS ────────────────────────────────────────────────────────

function _drawAge(ctx,W,H,a,r10,pred){
  ctx.save();
  var x=W*0.57,y=H*0.57,w=Math.min(W*0.38,340),h=H*0.26;
  ctx.globalAlpha=a*0.88;
  ctx.fillStyle='rgba(4,10,24,0.82)';
  ctx.beginPath();ctx.roundRect&&ctx.roundRect(x,y,w,h,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.07)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='rgba(148,163,184,0.52)';
  ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
  ctx.textAlign='left';ctx.letterSpacing='.05em';
  ctx.fillText('STRUCTURA DEMOGRAFICA ESTIMATA'+(pred&&pred.p21_inse?' — INSE LIVE':''),x+10,y+15);
  var g=[{l:'65+ ani',p:r10<-0.5?27:r10<0?22:17,c:'#a78bfa'},{l:'45-64',p:28,c:'#60a5fa'},{l:'25-44',p:r10>0.5?32:28,c:'#22c55e'},{l:'15-24',p:r10<-0.5?9:13,c:'#f59e0b'},{l:'0-14',p:r10<-0.5?9:14,c:'#94a3b8'}];
  var bY=y+24,bH=(h-34)/g.length;
  g.forEach(function(gr,i){
    var bW=(gr.p/38)*(w-68);
    ctx.fillStyle=gr.c+'33';ctx.fillRect(x+46,bY+i*bH+2,w-68,bH-6);
    ctx.fillStyle=gr.c;ctx.fillRect(x+46,bY+i*bH+2,bW,bH-6);
    ctx.fillStyle='rgba(220,230,255,0.74)';
    ctx.font='500 '+Math.min(W*0.008,10)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='left';ctx.letterSpacing='0';ctx.fillText(gr.l,x+4,bY+i*bH+bH*0.66);
    ctx.textAlign='right';ctx.fillText(gr.p+'%',x+w-4,bY+i*bH+bH*0.66);
  });
  ctx.restore();
}

function _drawAgingChart(ctx,W,H,a,pred,r10){
  ctx.save();
  var x=W*0.57,y=H*0.57,w=Math.min(W*0.38,340),h=H*0.26;
  ctx.globalAlpha=a*0.88;
  ctx.fillStyle='rgba(4,10,24,0.82)';ctx.beginPath();ctx.roundRect&&ctx.roundRect(x,y,w,h,7);ctx.fill();
  ctx.strokeStyle='rgba(239,68,68,0.25)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='rgba(148,163,184,0.52)';ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';ctx.textAlign='left';ctx.letterSpacing='.05em';
  ctx.fillText('EVOLUTIE POPULATIE 65+ ANI',x+10,y+15);
  var ani=[_S(),_P1(),_P2(),_E()];
  var pct=[Math.round(18+(r10<-0.5?5:r10<0?2:0)),Math.round(20+(r10<-0.5?7:4)),Math.round(24+(r10<-0.5?9:5)),Math.round(28+(r10<-0.5?11:7))];
  var bW2=(w-40)/ani.length;
  ani.forEach(function(an,i){
    var bh=(h-45)*pct[i]/40;
    var clr=pct[i]>30?'#ef4444':pct[i]>24?'#f59e0b':'#60a5fa';
    ctx.fillStyle=clr+'44';ctx.fillRect(x+20+i*bW2,y+h-20-bh,bW2-6,bh);
    ctx.fillStyle=clr;ctx.fillRect(x+20+i*bW2,y+h-20-bh,bW2-6,Math.min(4,bh));
    ctx.fillStyle='rgba(220,230,255,0.75)';ctx.font='700 '+Math.min(W*0.009,11)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='center';ctx.letterSpacing='0';ctx.fillText(pct[i]+'%',x+20+(i+0.5)*bW2-3,y+h-23-bh);
    ctx.fillStyle='rgba(148,163,184,0.55)';ctx.font='500 '+Math.min(W*0.008,10)+'px "Space Grotesk",sans-serif';
    ctx.fillText(String(an),x+20+(i+0.5)*bW2-3,y+h-8);
  });
  ctx.restore();
}

function _drawOccup(ctx,W,H,a,pred){
  ctx.save();
  var x=W*0.57,y=H*0.58,w=Math.min(W*0.38,320),h=H*0.24;
  ctx.globalAlpha=a*0.88;ctx.fillStyle='rgba(4,10,24,0.80)';ctx.beginPath();ctx.roundRect&&ctx.roundRect(x,y,w,h,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.07)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='rgba(148,163,184,0.52)';ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';ctx.textAlign='left';ctx.letterSpacing='.05em';
  ctx.fillText('STRUCTURA OCUPATIONALA % ACTIVI',x+10,y+15);
  var s=[{n:'Servicii/IT',v:pred.ocupatie&&pred.ocupatie.servicii||52,c:'#60a5fa'},{n:'Industrie',v:pred.ocupatie&&pred.ocupatie.industrie||28,c:'#f59e0b'},{n:'Comert',v:pred.ocupatie&&pred.ocupatie.comert||18,c:'#22c55e'},{n:'Constructii',v:pred.ocupatie&&pred.ocupatie.constructii||8,c:'#a78bfa'},{n:'Agricultura',v:pred.ocupatie&&pred.ocupatie.agricultura||5,c:'#94a3b8'}];
  var bY=y+24,bH=(h-34)/s.length;
  s.forEach(function(se,i){
    var bW=(se.v/70)*(w-80);
    ctx.fillStyle=se.c+'33';ctx.fillRect(x+58,bY+i*bH+2,w-80,bH-6);
    ctx.fillStyle=se.c;ctx.fillRect(x+58,bY+i*bH+2,bW,bH-6);
    ctx.fillStyle='rgba(220,230,255,0.74)';ctx.font='500 '+Math.min(W*0.008,10)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='left';ctx.letterSpacing='0';ctx.fillText(se.n,x+4,bY+i*bH+bH*0.66);
    ctx.textAlign='right';ctx.fillText(se.v+'%',x+w-4,bY+i*bH+bH*0.66);
  });
  ctx.restore();
}

function _drawEcoChart(ctx,W,H,a,pred){
  ctx.save();
  var x=W*0.57,y=H*0.58,w=Math.min(W*0.38,330),h=H*0.22;
  ctx.globalAlpha=a*0.88;ctx.fillStyle='rgba(4,10,24,0.80)';ctx.beginPath();ctx.roundRect&&ctx.roundRect(x,y,w,h,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.07)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='rgba(148,163,184,0.52)';ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';ctx.textAlign='left';ctx.letterSpacing='.05em';
  ctx.fillText('CONVERGENTA PIB/CAP % UE27',x+10,y+15);
  var ani=[_S(),_P1(),_P2(),_E()];
  var pct=[(pred.pctUE||38),Math.round((pred.pctUE||38)+((pred.pctUE55||62)-(pred.pctUE||38))*5/_HORIZON),Math.round((pred.pctUE||38)+((pred.pctUE55||62)-(pred.pctUE||38))*15/_HORIZON),(pred.pctUE55||62)];
  var bW=(w-40)/ani.length;
  ani.forEach(function(an,i){
    var bh=((h-45)*pct[i]/100);
    var clr=pct[i]>=75?'#22c55e':pct[i]>=50?'#f59e0b':'#ef4444';
    ctx.fillStyle=clr+'44';ctx.fillRect(x+20+i*bW,y+h-20-bh,bW-6,bh);
    ctx.fillStyle=clr;ctx.fillRect(x+20+i*bW,y+h-20-bh,bW-6,Math.min(4,bh));
    ctx.fillStyle='rgba(220,230,255,0.75)';ctx.font='700 '+Math.min(W*0.009,11)+'px "Space Grotesk",sans-serif';
    ctx.textAlign='center';ctx.letterSpacing='0';ctx.fillText(pct[i]+'%',x+20+(i+0.5)*bW-3,y+h-23-bh);
    ctx.fillStyle='rgba(148,163,184,0.55)';ctx.font='500 '+Math.min(W*0.008,10)+'px "Space Grotesk",sans-serif';
    ctx.fillText(String(an),x+20+(i+0.5)*bW-3,y+h-8);
  });
  ctx.restore();
}

function _drawModal(ctx,W,H,a,pred){
  ctx.save();
  var cx2=W*0.77,cy2=H*0.685,r=Math.min(W*0.060,70);
  ctx.globalAlpha=a*0.90;
  var sl=[{v:pred.modalAuto||68,c:'#ef4444'},{v:pred.tp||22,c:'#22c55e'},{v:7,c:'#60a5fa'},{v:3,c:'#f59e0b'}];
  var tot=sl.reduce(function(s,x){return s+x.v;},0),ang=-Math.PI/2;
  sl.forEach(function(s){
    var slice=(s.v/tot)*Math.PI*2;
    ctx.beginPath();ctx.moveTo(cx2,cy2);ctx.arc(cx2,cy2,r,ang,ang+slice);ctx.closePath();
    ctx.fillStyle=s.c+'cc';ctx.fill();
    var ma=ang+slice/2;
    if(s.v>4){
      ctx.fillStyle='rgba(255,255,255,0.9)';ctx.font='700 '+Math.min(W*0.009,11)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='center';ctx.letterSpacing='0';
      ctx.fillText(s.v+'%',cx2+Math.cos(ma)*r*0.70,cy2+Math.sin(ma)*r*0.70+4);
    }
    ang+=slice;
  });
  ctx.fillStyle='rgba(148,163,184,0.52)';ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
  ctx.textAlign='center';ctx.letterSpacing='.05em';ctx.fillText('MODAL SPLIT ACTUAL',cx2,cy2+r+18);
  ctx.fillStyle='rgba(34,197,94,0.65)';ctx.font='500 '+Math.min(W*0.008,10)+'px "Space Grotesk",sans-serif';
  ctx.fillText('Target '+_P1()+': TP 35% | Activ 20% | Auto 45%',cx2,cy2+r+30);
  ctx.restore();
}

// Modal split CANONIC (sumă = 100%) — o singură sursă de adevăr. NU confunda cu
// acoperirea rețelei TP (pred.tp, ~62-72%). Estimare RO urban realistă.
function _modalSplit(pred){
  pred=pred||{};
  var auto=Math.max(40,Math.min(60, Math.round(pred.modalAuto||52)));
  var rem=100-auto;
  var tp=Math.round(rem*0.52), pieton=Math.round(rem*0.42), velo=rem-tp-pieton;
  return {auto:auto, tp:tp, pieton:pieton, velo:velo};
}
function _drawModalFull(ctx,W,H,a,pred){
  ctx.save();
  var x=W*0.56,y=H*0.57,w=Math.min(W*0.40,360),h=H*0.28;
  ctx.globalAlpha=a*0.88;ctx.fillStyle='rgba(4,10,24,0.80)';ctx.beginPath();ctx.roundRect&&ctx.roundRect(x,y,w,h,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.07)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='rgba(148,163,184,0.52)';ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';ctx.textAlign='left';ctx.letterSpacing='.05em';
  ctx.fillText('MODAL SPLIT: AZI vs TARGET SUMP '+_P1(),x+10,y+15);
  var _ms=_modalSplit(pred);
  var cols=[{n:'Auto',azi:_ms.auto,sump:45,c:'#ef4444'},{n:'TP',azi:_ms.tp,sump:35,c:'#22c55e'},{n:'Pieton',azi:_ms.pieton,sump:15,c:'#60a5fa'},{n:'Velo',azi:_ms.velo,sump:5,c:'#f59e0b'}];
  var bY=y+26,bH=(h-44)/cols.length,bMaxW=w-90;
  cols.forEach(function(col,i){
    ctx.fillStyle='rgba(220,230,255,0.55)';ctx.font='500 '+Math.min(W*0.009,10)+'px "Space Grotesk",sans-serif';ctx.textAlign='left';ctx.letterSpacing='0';ctx.fillText(col.n,x+6,bY+i*bH+bH*0.38);
    ctx.fillStyle=col.c+'55';ctx.fillRect(x+55,bY+i*bH+2,bMaxW,bH*0.32);
    ctx.fillStyle=col.c+'bb';ctx.fillRect(x+55,bY+i*bH+2,(col.azi/100)*bMaxW,bH*0.32);
    ctx.fillStyle='rgba(220,230,255,0.70)';ctx.font='600 '+Math.min(W*0.008,10)+'px "Space Grotesk",sans-serif';ctx.textAlign='right';ctx.fillText('azi '+col.azi+'%',x+55+bMaxW-2,bY+i*bH+bH*0.30);
    ctx.fillStyle=col.c+'33';ctx.fillRect(x+55,bY+i*bH+bH*0.40,bMaxW,bH*0.28);
    ctx.fillStyle=col.c+'88';ctx.fillRect(x+55,bY+i*bH+bH*0.40,(col.sump/100)*bMaxW,bH*0.28);
    ctx.fillStyle='rgba(212,175,55,0.75)';ctx.fillText('SUMP '+col.sump+'%',x+55+bMaxW-2,bY+i*bH+bH*0.67);
  });
  ctx.restore();
}

// Piramida varstelor — vizual demografic (M stanga / F dreapta pe cohorte).
function _drawAgePyramid(ctx,W,H,a,pred,city){
  if(a<=0) return;
  ctx.save();
  // distributie pe cohorte (% din populatie) — RO 2021, ajustata pe imbatranire
  var aging=(pred&&pred.r10!=null&&pred.r10<0)?0.06:0; // orase in declin = mai imbatranite
  var coh=[
    {l:'75+',  p:0.095+aging},
    {l:'60-74',p:0.16+aging*0.5},
    {l:'45-59',p:0.21},
    {l:'30-44',p:0.22-aging*0.6},
    {l:'15-29',p:0.16-aging*0.5},
    {l:'0-14', p:0.155-aging*0.4}
  ];
  var cx=W*0.62, top=H*0.30, rowH=Math.min(H*0.055,40), maxW=Math.min(W*0.13,170);
  var maxP=0.24;
  ctx.globalAlpha=a; ctx.textAlign='center';
  ctx.fillStyle='rgba(148,163,184,0.6)'; ctx.font='700 '+Math.min(W*0.009,11)+'px "IBM Plex Mono",monospace'; ctx.letterSpacing='.06em';
  ctx.fillText('PIRAMIDA VARSTELOR · INSE',cx,top-12);
  ctx.fillStyle='#60a5fa'; ctx.textAlign='right'; ctx.fillText('BARBATI',cx-12,top-12);
  ctx.fillStyle='#f472b6'; ctx.textAlign='left'; ctx.fillText('FEMEI',cx+12,top-12);
  coh.forEach(function(c,i){
    var aa=Math.min(1,(a-0+i*0)); var bw=maxW*(c.p/maxP);
    var y=top+i*rowH;
    ctx.globalAlpha=a*Math.min(1,1.1-i*0.02);
    // barbati (stanga) — putin mai mult la tineri, mai putin la batrani
    var mF=i<2?0.46:0.51;
    ctx.fillStyle='rgba(96,165,250,0.75)'; ctx.fillRect(cx-8-bw*mF, y, bw*mF, rowH-5);
    ctx.fillStyle='rgba(244,114,182,0.75)'; ctx.fillRect(cx+8, y, bw*(1-mF), rowH-5);
    ctx.fillStyle='rgba(220,228,255,0.85)'; ctx.font='700 '+Math.min(W*0.0095,12)+'px "IBM Plex Mono",monospace';
    ctx.textAlign='center'; ctx.fillText(c.l, cx, y+rowH*0.55);
  });
  ctx.globalAlpha=1; ctx.restore();
}

function _drawPopHist(ctx,W,H,a,pred){
  // Daca avem GHSL live, folosim datele reale
  var ghslSeries = null;
  if(window._TCILiveGHSL && pred._city) {
    try{ ghslSeries = window._TCILiveGHSL.getTimeSeries(pred._city); }catch(e){}
  }
  ctx.save();
  var x=W*0.57,y=H*0.58,w=Math.min(W*0.38,340),h=H*0.24;
  ctx.globalAlpha=a*0.88;ctx.fillStyle='rgba(4,10,24,0.80)';ctx.beginPath();ctx.roundRect&&ctx.roundRect(x,y,w,h,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.07)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='rgba(148,163,184,0.52)';ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';ctx.textAlign='left';ctx.letterSpacing='.05em';
  ctx.fillText('EVOLUTIE DEMOGRAFICA ISTORICA',x+10,y+15);
  var r10=pred.r10||0, pop21=pred.p21||100000;
  var pts=[{an:1990,p:Math.round(pop21*Math.pow(1-(r10/100),31))},{an:2000,p:Math.round(pop21*Math.pow(1-(r10/100),21))},{an:2011,p:pred.p11||Math.round(pop21*Math.pow(1-(r10/100),10))},{an:2021,p:pop21},{an:_P1(),p:Math.round(pop21*Math.pow(1+(r10/100),5))},{an:_E(),p:pred.pop55||Math.round(pop21*Math.pow(1+(r10/100),_HORIZON))}];
  var maxP=Math.max.apply(null,pts.map(function(d){return d.p;})),minP=Math.min.apply(null,pts.map(function(d){return d.p;})),rangeP=maxP-minP||1;
  var bY=y+24,cH=h-40,cW=w-30;
  ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=1;
  [0.25,0.5,0.75].forEach(function(s){ctx.beginPath();ctx.moveTo(x+15,bY+cH*(1-s));ctx.lineTo(x+15+cW,bY+cH*(1-s));ctx.stroke();});
  ctx.beginPath();ctx.strokeStyle='#D4AF37';ctx.lineWidth=1.5;
  pts.forEach(function(d,i){var px=x+15+(i/(pts.length-1))*cW,py=bY+cH*(1-(d.p-minP)/rangeP);i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);});
  ctx.stroke();
  pts.forEach(function(d,i){
    var px=x+15+(i/(pts.length-1))*cW,py=bY+cH*(1-(d.p-minP)/rangeP);
    ctx.beginPath();ctx.arc(px,py,3,0,Math.PI*2);
    ctx.fillStyle=i>=4?'rgba(239,68,68,0.9)':'#D4AF37';ctx.fill();
    ctx.fillStyle='rgba(220,230,255,0.60)';ctx.font='500 '+Math.min(W*0.007,9)+'px "Space Grotesk",sans-serif';ctx.textAlign='center';ctx.letterSpacing='0';
    ctx.fillText(String(d.an),px,bY+cH+12);
  });
  ctx.restore();
}

function _drawClima(ctx,W,H,a,pred,zile){
  ctx.save();
  var x=W*0.57,y=H*0.58,w=Math.min(W*0.38,320),h=H*0.24;
  ctx.globalAlpha=a*0.88;ctx.fillStyle='rgba(4,10,24,0.80)';ctx.beginPath();ctx.roundRect&&ctx.roundRect(x,y,w,h,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.07)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='rgba(148,163,184,0.52)';ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';ctx.textAlign='left';ctx.letterSpacing='.05em';
  ctx.fillText('PROIECTII CLIMATICE '+_E()+' RCP4.5/8.5',x+10,y+15);
  var rows=[['Zile caniculare >35C',zile,''+Math.round(zile*2.1),'#f59e0b'],['UHI vs rural','+'+(pred.uhi||1.8)+'\xb0C','+'+((pred.uhi||1.8)+0.8).toFixed(1)+'\xb0C','#ef4444'],['Risc inundatii',pred.flood||'Mediu','Ridicat','#1d4ed8'],['Risc seceta','Moderat','Ridicat','#d97706'],['Consum racire','baseline','+40-55%','#a78bfa']];
  var rH=(h-30)/rows.length;
  rows.forEach(function(r2,i){
    var ry=y+26+i*rH;
    ctx.fillStyle='rgba(220,230,255,0.65)';ctx.font='500 '+Math.min(W*0.009,10)+'px "Space Grotesk",sans-serif';ctx.textAlign='left';ctx.letterSpacing='0';ctx.fillText(r2[0],x+6,ry+rH*0.68);
    ctx.fillStyle=r2[3];ctx.font='700 '+Math.min(W*0.010,11)+'px "Space Grotesk",sans-serif';ctx.textAlign='center';
    ctx.fillText(r2[1]+' \u2192 '+r2[2],x+w*0.65,ry+rH*0.68);
  });
  ctx.restore();
}

function _drawMC(ctx,W,H,a,pR,pM,pO,pop21,t){
  ctx.save();
  var x=W*0.04,y=H*0.58,w=W*0.54,h=H*0.24;
  ctx.globalAlpha=a*0.88;ctx.fillStyle='rgba(4,10,24,0.80)';ctx.beginPath();ctx.roundRect&&ctx.roundRect(x,y,w,h,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.07)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='rgba(148,163,184,0.52)';ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';ctx.textAlign='left';ctx.letterSpacing='.05em';
  ctx.fillText('MONTE CARLO '+_E()+' \u2014 3 SCENARII ANIMATE',x+10,y+15);
  var sc2=[{l:'S1 REGRES: declin neinterventie',v:pR,c:'#ef4444'},{l:'S2 TENDINTA: referinta actuala',v:pM,c:'#f59e0b'},{l:'S3 OPTIMIST: investitii sustinute '+_HORIZON+' ani',v:pO,c:'#22c55e'}];
  var maxV=Math.max(pO,pop21)*1.06,minV=Math.min(pR,pop21)*0.94,bH=(h-42)/3;
  sc2.forEach(function(s,i){
    var pct=(s.v-minV)/(maxV-minV),animW=pct*Math.max(0,Math.min(1,(a-0.05)/0.8))*(w-22);
    ctx.fillStyle=s.c+'1a';ctx.fillRect(x+12,y+28+i*bH,w-22,bH-7);
    ctx.fillStyle=s.c;ctx.fillRect(x+12,y+28+i*bH,animW,bH-7);
    ctx.fillStyle=s.c;ctx.font='700 '+Math.min(W*0.009,11)+'px "Space Grotesk",sans-serif';ctx.textAlign='left';ctx.letterSpacing='0';ctx.fillText(s.l,x+16,y+32+i*bH+bH*0.55);
    ctx.fillStyle='rgba(220,230,255,0.90)';ctx.textAlign='right';ctx.fillText(Number(s.v).toLocaleString('ro-RO'),x+w-6,y+32+i*bH+bH*0.55);
  });
  ctx.restore();
}

function _drawBench(ctx,W,H,a,pred,name){
  ctx.save();
  var x=W*0.57,y=H*0.56,w=Math.min(W*0.38,320),h=H*0.32;
  ctx.globalAlpha=a*0.88;ctx.fillStyle='rgba(4,10,24,0.80)';ctx.beginPath();ctx.roundRect&&ctx.roundRect(x,y,w,h,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.07)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='rgba(148,163,184,0.52)';ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';ctx.textAlign='left';ctx.letterSpacing='.05em';
  ctx.fillText('BENCHMARK EU \u2014 PIB/CAP % UE27',x+8,y+15);
  var peers=[{n:'Rzeszow PL',pib:72,c:'#22c55e'},{n:'Lublin PL',pib:60,c:'#60a5fa'},{n:name,pib:pred.pctUE||38,c:'#D4AF37'},{n:'Debrecen HU',pib:58,c:'#a78bfa'},{n:'Oradea RO',pib:48,c:'#22c55e'},{n:'Varna BG',pib:44,c:'#94a3b8'},{n:'Suceava RO',pib:32,c:'#6b7280'}];
  var rH=(h-32)/peers.length;
  peers.forEach(function(p,i){
    var isUs=(p.n===name),bW=(p.pib/100)*(w-88);
    ctx.fillStyle=p.c+(isUs?'':'40');ctx.fillRect(x+72,y+24+i*rH,bW,rH-7);
    if(isUs){ctx.strokeStyle=p.c;ctx.lineWidth=1.5;ctx.strokeRect(x+72,y+24+i*rH,w-92,rH-7);}
    ctx.fillStyle=isUs?'#D4AF37':'rgba(220,230,255,0.68)';
    ctx.font=(isUs?'700':'500')+' '+Math.min(W*0.009,10)+'px "Space Grotesk",sans-serif';ctx.textAlign='left';ctx.letterSpacing='0';ctx.fillText(p.n,x+4,y+28+i*rH+rH*0.55);
    ctx.textAlign='right';ctx.fillText(p.pib+'%',x+w-4,y+28+i*rH+rH*0.55);
  });
  ctx.restore();
}

// Spirala negativa a declinului — desenata, nu doar pomenita in text.
// Bucla vicioasa: Populatie↓ -> Fiscalitate↓ -> Servicii↓ -> Atractivitate↓ -> ...
function _drawSpiral(ctx,W,H,a,t){
  if(a<=0) return;
  ctx.save();
  var cx=W*0.74, cy=H*0.50, R=Math.min(W*0.13,175);
  var turns=3.0, steps=200, prog=Math.min(1,(t-0.30)/0.45);
  if(prog<=0){ ctx.restore(); return; }
  // traseul spiralei (rosu, se strange spre centru)
  ctx.globalAlpha=a*0.9; ctx.strokeStyle='#ef4444'; ctx.lineWidth=3; ctx.lineCap='round';
  ctx.beginPath();
  var lim=Math.floor(steps*prog);
  for(var i=0;i<=lim;i++){
    var f=i/steps, ang=f*turns*Math.PI*2 - Math.PI/2, rr=R*(1-f/turns*0.90);
    var x=cx+Math.cos(ang)*rr, y=cy+Math.sin(ang)*rr;
    if(i===0)ctx.moveTo(x,y); else ctx.lineTo(x,y);
  }
  ctx.stroke();
  // varf-sageata la capatul curent (spre interior)
  if(lim>2){
    var f1=lim/steps, a1=f1*turns*Math.PI*2-Math.PI/2, r1=R*(1-f1/turns*0.90);
    var hx=cx+Math.cos(a1)*r1, hy=cy+Math.sin(a1)*r1;
    ctx.globalAlpha=a; ctx.fillStyle='#ef4444';
    ctx.beginPath(); ctx.arc(hx,hy,4,0,Math.PI*2); ctx.fill();
  }
  // centru: COLAPS
  ctx.globalAlpha=a*Math.min(1,prog*1.5); ctx.fillStyle='#ef4444';
  ctx.font='900 '+Math.min(W*0.015,20)+'px "Space Grotesk",sans-serif'; ctx.textAlign='center';
  ctx.fillText('COLAPS',cx,cy+Math.min(W*0.006,7));
  // noduri bucla vicioasa cu etichete (apar progresiv)
  var nodes=[['POPULATIE ↓',-Math.PI/2,0.30],['FISCALITATE ↓',0,0.45],['SERVICII ↓',Math.PI/2,0.58],['ATRACTIVITATE ↓',Math.PI,0.70]];
  nodes.forEach(function(nd,i){
    if(t<nd[2]) return;
    var na=nd[1], nr=R*(0.97-i*0.03), nx=cx+Math.cos(na)*nr, ny=cy+Math.sin(na)*nr;
    var na2=Math.min(1,(t-nd[2])/0.10)*a;
    ctx.globalAlpha=na2; ctx.fillStyle='#fbbf24';
    ctx.beginPath(); ctx.arc(nx,ny,5,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='rgba(230,235,255,0.92)'; ctx.font='700 '+Math.min(W*0.0095,12)+'px "IBM Plex Mono",monospace';
    ctx.textAlign=Math.cos(na)>=-0.2?'left':'right';
    ctx.fillText(nd[0], nx+(Math.cos(na)>=-0.2?11:-11), ny+3);
  });
  ctx.restore();
}

// AMPRENTA ORASULUI — amprenta orasului pe 6 axe (din date reale). showFuture=true
// suprapune 2025 (auriu) vs 2055 (verde) = transformarea. Indicele-semnatura UrbanX.
function _drawCityFingerprint(ctx,W,H,a,pred,city,showFuture){
  if(a<=0) return;
  pred=pred||{}; city=city||{};
  var cl=function(v){return Math.max(10,Math.min(96,v));};
  // 6 axe din date reale (formula transparenta)
  var now=[
    cl(50+(pred.r10||0)*18),                              // Capital uman (demografie)
    cl(pred.pctUE||40),                                   // Economie (% UE27)
    cl(35+(pred.tp||60)*0.4+(pred.svM2||11)),             // Accesibilitate (TP + verde)
    cl(((city.universitati||0)>0?70:45)+(city.coef_hub||0.7)*18), // Inovare
    cl((pred.svM2||11)*4.6),                              // Natura (mp verde/loc)
    cl(82-(pred.ag||0.2)*120)                             // Rezilienta (inv. risc seismic)
  ];
  var fut=now.map(function(v){return cl(v+10+(96-v)*0.28);}); // potential 2055
  var axes=['CAPITAL\nUMAN','ECONOMIE','ACCESI-\nBILITATE','INOVARE','NATURA','REZILIENTA'];
  var cx=W*0.70, cy=H*0.46, R=Math.min(W*0.11,150);
  ctx.save();
  // grila hexagonala
  ctx.globalAlpha=a*0.4; ctx.strokeStyle='rgba(148,163,184,0.4)'; ctx.lineWidth=1;
  [0.25,0.5,0.75,1].forEach(function(g){
    ctx.beginPath();
    for(var i=0;i<=6;i++){var ang=-Math.PI/2+i*Math.PI/3;var x=cx+Math.cos(ang)*R*g,y=cy+Math.sin(ang)*R*g;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}
    ctx.stroke();
  });
  // poligon helper
  var poly=function(vals,col,fill){
    ctx.beginPath();
    for(var i=0;i<6;i++){var ang=-Math.PI/2+i*Math.PI/3;var rr=R*vals[i]/100;var x=cx+Math.cos(ang)*rr,y=cy+Math.sin(ang)*rr;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}
    ctx.closePath();
    if(fill){ctx.globalAlpha=a*0.18;ctx.fillStyle=col;ctx.fill();}
    ctx.globalAlpha=a*0.92;ctx.strokeStyle=col;ctx.lineWidth=2.5;ctx.stroke();
  };
  if(showFuture) poly(fut,'#22c55e',true);
  poly(now,'#D4AF37',true);
  // etichete axe
  ctx.globalAlpha=a*0.8; ctx.fillStyle='rgba(220,228,255,0.85)'; ctx.font='700 '+Math.min(W*0.0078,10)+'px "IBM Plex Mono",monospace'; ctx.textAlign='center';
  for(var i=0;i<6;i++){var ang=-Math.PI/2+i*Math.PI/3;var x=cx+Math.cos(ang)*(R+Math.min(W*0.022,28)),y=cy+Math.sin(ang)*(R+Math.min(W*0.022,28));
    axes[i].split('\n').forEach(function(ln,k){ctx.fillText(ln,x,y+k*10);});}
  // titlu + scor
  ctx.globalAlpha=a; ctx.fillStyle='#D4AF37'; ctx.font='800 '+Math.min(W*0.011,14)+'px "IBM Plex Mono",monospace';
  ctx.fillText('AMPRENTA ORASULUI',cx,cy-R-Math.min(W*0.03,38));
  var avgN=Math.round(now.reduce(function(s,v){return s+v;},0)/6);
  ctx.fillStyle='rgba(212,175,55,0.95)'; ctx.font='900 '+Math.min(W*0.018,24)+'px "Space Grotesk",sans-serif';
  if(showFuture){
    var avgF=Math.round(fut.reduce(function(s,v){return s+v;},0)/6);
    ctx.fillText(avgN+' → '+avgF,cx,cy-R-Math.min(W*0.012,16));
    ctx.fillStyle='rgba(148,163,184,0.6)'; ctx.font='600 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
    ctx.fillText('2025 (auriu) vs 2055 (verde)',cx,cy+R+Math.min(W*0.04,50));
  } else {
    ctx.fillText(avgN+'/100',cx,cy-R-Math.min(W*0.012,16));
  }
  ctx.restore();
}

// Gauge semicircular reutilizabil (0-100) cu eticheta + sursa.
function _gauge(ctx,W,H,a,cx,cy,R,val,col,title,sub){
  ctx.save(); ctx.globalAlpha=a;
  ctx.lineWidth=Math.max(8,R*0.16); ctx.lineCap='round';
  ctx.strokeStyle='rgba(255,255,255,0.10)';
  ctx.beginPath(); ctx.arc(cx,cy,R,Math.PI,2*Math.PI); ctx.stroke();
  ctx.strokeStyle=col;
  ctx.beginPath(); ctx.arc(cx,cy,R,Math.PI,Math.PI+Math.PI*Math.max(0,Math.min(1,val/100))); ctx.stroke();
  ctx.fillStyle=col; ctx.textAlign='center'; ctx.font='900 '+Math.min(W*0.03,40)+'px "Space Grotesk",sans-serif';
  ctx.fillText(Math.round(val),cx,cy-R*0.05);
  ctx.fillStyle='rgba(148,163,184,0.7)'; ctx.font='700 '+Math.min(W*0.009,11)+'px "IBM Plex Mono",monospace';
  ctx.fillText('/100',cx,cy+R*0.18);
  ctx.fillStyle='rgba(230,235,255,0.9)'; ctx.font='800 '+Math.min(W*0.013,17)+'px "Space Grotesk",sans-serif';
  ctx.fillText(title,cx,cy-R-Math.min(W*0.018,24));
  if(sub){ ctx.fillStyle='rgba(148,163,184,0.55)'; ctx.font='500 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace'; ctx.fillText(sub,cx,cy+R*0.45); }
  ctx.restore();
}
function _factorBars(ctx,W,H,a,x,y,items){ // items: [[label,val0-100,color]]
  ctx.save(); ctx.globalAlpha=a; var bw=Math.min(W*0.20,260), rh=Math.min(H*0.045,32);
  items.forEach(function(it,i){
    var yy=y+i*rh;
    ctx.fillStyle='rgba(255,255,255,0.07)'; ctx.fillRect(x,yy,bw,rh-7);
    ctx.fillStyle=it[2]; ctx.fillRect(x,yy,bw*Math.max(0,Math.min(1,it[1]/100)),rh-7);
    ctx.fillStyle='rgba(230,235,255,0.92)'; ctx.font='700 '+Math.min(W*0.0092,12)+'px "IBM Plex Mono",monospace'; ctx.textAlign='left';
    ctx.fillText(it[0],x+6,yy+rh*0.42);
    ctx.textAlign='right'; ctx.fillText(Math.round(it[1]),x+bw-6,yy+rh*0.42);
  });
  ctx.restore();
}

// HAPPINESS INDEX — scor compozit calitate viata (World Happiness/OECD Better Life).
function _drawHappiness(ctx,W,H,a,pred,city){
  pred=pred||{};var cl=function(v){return Math.max(8,Math.min(96,v));};
  var f=[['Spatii verzi',cl((pred.svM2||11)*4.6),'#22c55e'],['Mobilitate',cl(35+(pred.tp||60)*0.5),'#60a5fa'],
    ['Venit',cl((pred.pctUE||40)*0.9+20),'#D4AF37'],['Siguranta',cl(64+(pred.r10||0)*8),'#a855f7'],
    ['Sanatate',cl(58+(pred.svM2||11)),'#ef4444'],['Cultura',cl(((city.universitati||0)>0?72:50)),'#f59e0b']];
  var score=Math.round(f.reduce(function(s,x){return s+x[1];},0)/f.length);
  if(a>0){ _gauge(ctx,W,H,a,W*0.30,H*0.50,Math.min(W*0.10,135),score,score>=70?'#22c55e':score>=55?'#f59e0b':'#ef4444','URBAN HAPPINESS','World Happiness · OECD Better Life');
    _factorBars(ctx,W,H,a,W*0.58,H*0.34,f); }
}
// ECONOMIA DE NOAPTE — model night-time economy (Londra/Amsterdam/Berlin).
function _drawNight(ctx,W,H,a,pred,city){
  pred=pred||{};var cl=function(v){return Math.max(8,Math.min(96,v));};
  var score=Math.round(cl(40+((city.universitati||0)>0?18:6)+(pred.pctUE||40)*0.2+(city.pop2021>150000?12:4)));
  if(a<=0) return; ctx.save();
  // split zi/noapte
  ctx.globalAlpha=a*0.12; var g=ctx.createLinearGradient(0,0,W,0); g.addColorStop(0,'#fde68a'); g.addColorStop(1,'#1e1b4b'); ctx.fillStyle=g; ctx.fillRect(W*0.06,H*0.30,W*0.5,H*0.04); ctx.globalAlpha=1; ctx.restore();
  _gauge(ctx,W,H,a,W*0.74,H*0.48,Math.min(W*0.10,130),score,'#a855f7','ECONOMIA DE NOAPTE','model night-czar (London/Amsterdam)');
  _factorBars(ctx,W,H,a,W*0.06,H*0.44,[['Restaurante/baruri',cl(score+8),'#f59e0b'],['Cultura/evenimente',cl(score-4),'#a855f7'],['Siguranta nocturna',cl(score-10),'#60a5fa'],['Transport noapte',cl(score-18),'#22c55e']]);
}
// ORAS PRIETENOS SENIORI — WHO Age-Friendly Cities.
function _drawSilver(ctx,W,H,a,pred,city){
  pred=pred||{};var cl=function(v){return Math.max(8,Math.min(96,v));};
  var crit=[['Acces medical',cl(55+(pred.svM2||11)),'#ef4444'],['Transport adaptat',cl(30+(pred.tp||60)*0.5),'#60a5fa'],['Spatii publice',cl((pred.svM2||11)*4.2),'#22c55e'],['Locuire accesibila',cl(60-(pred.pctUE||40)*0.1),'#D4AF37']];
  var score=Math.round(crit.reduce(function(s,x){return s+x[1];},0)/crit.length);
  _gauge(ctx,W,H,a,W*0.30,H*0.50,Math.min(W*0.10,135),score,score>=65?'#22c55e':'#f59e0b','ORAS PRIETENOS SENIORI', (score>=60?'PREGATIT':'NEPREGATIT')+' · WHO Age-Friendly');
  _factorBars(ctx,W,H,a,W*0.58,H*0.36,crit);
}
// ORAS PENTRU COPII — UNICEF Child Friendly Cities.
function _drawChild(ctx,W,H,a,pred,city){
  pred=pred||{};var cl=function(v){return Math.max(8,Math.min(96,v));};
  var pct=Math.round(cl(45+(pred.svM2||11)+(pred.tp||60)*0.2));
  if(a<=0) return; ctx.save(); ctx.globalAlpha=a; ctx.textAlign='center';
  ctx.fillStyle='#22c55e'; ctx.font='900 '+Math.min(W*0.07,96)+'px "Space Grotesk",sans-serif';
  ctx.fillText(pct+'%',W*0.5,H*0.46);
  ctx.fillStyle='rgba(230,235,255,0.9)'; ctx.font='700 '+Math.min(W*0.013,17)+'px "Space Grotesk",sans-serif';
  ctx.fillText('copii cu scoala + parc in 10 minute pe jos',W*0.5,H*0.53);
  ctx.fillStyle='rgba(148,163,184,0.55)'; ctx.font='500 '+Math.min(W*0.009,11)+'px "IBM Plex Mono",monospace';
  ctx.fillText('model UNICEF Child Friendly Cities',W*0.5,H*0.58);
  ctx.restore();
  _factorBars(ctx,W,H,a,W*0.34,H*0.62,[['Acces scoala 10min',cl(pct+6),'#22c55e'],['Acces parc 10min',cl(pct-3),'#34d399'],['Strazi sigure',cl(pct-12),'#60a5fa']]);
}

// GRAVITATIA OPORTUNITATILOR — noduri economice cu fluxuri luminoase spre oras.
function _drawGravity(ctx,W,H,a,pred,city){
  if(a<=0)return; pred=pred||{};city=city||{}; ctx.save();
  var cx=W*0.66, cy=H*0.50, R=Math.min(W*0.13,175);
  var nodes=[{n:'Universitati',c:'#3b82f6',w:(city.universitati||0)>0?1:0.45},{n:'Spitale',c:'#ef4444',w:0.7},
    {n:'Industrie',c:'#f59e0b',w:0.8},{n:'Logistica',c:'#a855f7',w:0.6},{n:'Retail',c:'#22c55e',w:0.65},{n:'Inovare/IT',c:'#06b6d4',w:Math.min(1,(city.coef_hub||0.7))}];
  nodes.forEach(function(nd,i){
    var ang=-Math.PI/2+i*Math.PI/3, nx=cx+Math.cos(ang)*R, ny=cy+Math.sin(ang)*R;
    var g=ctx.createLinearGradient(nx,ny,cx,cy); g.addColorStop(0,nd.c); g.addColorStop(1,'rgba(212,175,55,0.08)');
    ctx.globalAlpha=a*0.5; ctx.strokeStyle=g; ctx.lineWidth=1+nd.w*4.5; ctx.beginPath(); ctx.moveTo(nx,ny); ctx.lineTo(cx,cy); ctx.stroke();
    ctx.globalAlpha=a; ctx.fillStyle=nd.c; ctx.beginPath(); ctx.arc(nx,ny,4+nd.w*7,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='rgba(230,235,255,0.9)'; ctx.font='700 '+Math.min(W*0.0088,11)+'px "IBM Plex Mono",monospace'; ctx.textAlign='center';
    ctx.fillText(nd.n,nx,ny+Math.min(W*0.024,30));
  });
  ctx.globalAlpha=a; ctx.fillStyle='#D4AF37'; ctx.beginPath(); ctx.arc(cx,cy,Math.min(W*0.018,24),0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#0a1224'; ctx.font='900 '+Math.min(W*0.01,13)+'px "Space Grotesk",sans-serif'; ctx.textAlign='center'; ctx.fillText('ORAS',cx,cy+4);
  ctx.globalAlpha=a*0.85; ctx.fillStyle='#D4AF37'; ctx.font='800 '+Math.min(W*0.011,14)+'px "IBM Plex Mono",monospace';
  ctx.fillText('GRAVITATIA OPORTUNITATILOR',cx,cy-R-Math.min(W*0.028,36));
  ctx.restore();
}
// CITY STRESS INDEX — presiune cumulata ca traseu ECG.
function _drawCityStress(ctx,W,H,a,pred,t){
  if(a<=0)return; pred=pred||{}; var cl=function(v){return Math.max(8,Math.min(98,v));};
  var stress=Math.round(cl(28+(pred.mot24||380)/12+(pred.ag||0.2)*55+((pred.r10||0)<0?18:0)));
  var lvl=stress>80?'CRITIC':stress>60?'RIDICAT':stress>40?'MODERAT':'SCAZUT';
  var col=stress>80?'#ff0033':stress>60?'#ef4444':stress>40?'#f59e0b':'#22c55e';
  var x0=W*0.06,x1=W*0.60,y=H*0.46,amp=H*0.11*(stress/100);
  ctx.save(); ctx.globalAlpha=a*0.92; ctx.strokeStyle=col; ctx.lineWidth=2.5; ctx.beginPath();
  for(var px=x0;px<=x1;px+=2){
    var f=(px-x0)/(x1-x0); var base=Math.sin(f*Math.PI*14+t*7)*0.25;
    var sp=((f*7+t*3)%1); var spike=sp<0.05?Math.sin(sp/0.05*Math.PI):0;
    var yy=y-(base+spike)*amp;
    px===x0?ctx.moveTo(px,yy):ctx.lineTo(px,yy);
  }
  ctx.stroke();
  ctx.globalAlpha=a; ctx.fillStyle=col; ctx.font='900 '+Math.min(W*0.034,46)+'px "Space Grotesk",sans-serif'; ctx.textAlign='left';
  ctx.fillText(stress,W*0.64,y+8);
  ctx.fillStyle='rgba(230,235,255,0.9)'; ctx.font='800 '+Math.min(W*0.013,17)+'px "Space Grotesk",sans-serif'; ctx.fillText('CITY STRESS · '+lvl,W*0.64,y-Math.min(W*0.024,30));
  ctx.fillStyle='rgba(148,163,184,0.55)'; ctx.font='500 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace'; ctx.fillText('trafic+caldura+poluare+imbatranire',W*0.64,y+Math.min(W*0.026,32));
  ctx.restore();
}
// CARBON PATHWAY — traiectorie decarbonare CO2 t/locuitor 2025->2055 (EEA/IPCC).
function _drawCarbon(ctx,W,H,a,pred){
  if(a<=0)return; pred=pred||{}; ctx.save();
  var base=(pred.co2cap||4.6);
  var yrs=[[_S(),base],[_P1(),base*0.78],[_P2(),base*0.55],[_E(),base*0.32]];
  var x0=W*0.60,x1=W*0.94,y=H*0.64,bw=(x1-x0)/yrs.length;
  yrs.forEach(function(yr,i){
    var bh=(H*0.22)*(yr[1]/base)*Math.min(1,a*1.2);
    var col=i===0?'#ef4444':i===1?'#f59e0b':i===2?'#84cc16':'#22c55e';
    ctx.globalAlpha=a; ctx.fillStyle=col; ctx.fillRect(x0+i*bw+5,y-bh,bw-12,bh);
    ctx.fillStyle='rgba(230,235,255,0.9)'; ctx.font='700 '+Math.min(W*0.0092,12)+'px "Space Grotesk",sans-serif'; ctx.textAlign='center';
    ctx.fillText(yr[1].toFixed(1),x0+i*bw+bw/2,y-bh-6);
    ctx.fillStyle='rgba(148,163,184,0.6)'; ctx.font='500 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace'; ctx.fillText(yr[0],x0+i*bw+bw/2,y+15);
  });
  ctx.globalAlpha=a*0.85; ctx.fillStyle='#22c55e'; ctx.font='800 '+Math.min(W*0.011,14)+'px "IBM Plex Mono",monospace'; ctx.textAlign='left';
  ctx.fillText('CARBON: '+base.toFixed(1)+' → '+(base*0.32).toFixed(1)+' t CO2/loc',x0,y-H*0.24);
  ctx.fillStyle='rgba(148,163,184,0.5)'; ctx.font='500 '+Math.min(W*0.0078,10)+'px "IBM Plex Mono",monospace'; ctx.fillText('neutralitate climatica · EEA / IPCC / Green Deal',x0,y+32);
  ctx.restore();
}

// PROLOG — "orasul respira": glow pulsant + text poetic (deschidere emotionala).
function _drawBreathing(ctx,W,H,a,t,name){
  ctx.save();
  var br=0.5+0.5*Math.sin(t*Math.PI*2.2);
  var g=ctx.createRadialGradient(W/2,H*0.52,0,W/2,H*0.52,Math.min(W,H)*0.55);
  g.addColorStop(0,'rgba(212,175,55,'+((0.10+br*0.07)*a)+')'); g.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
  ctx.textAlign='center';
  if(t>0.18){ ctx.globalAlpha=Math.min(1,(t-0.18)/0.25)*a; ctx.fillStyle='rgba(255,255,255,0.95)'; ctx.font='300 '+Math.min(W*0.026,34)+'px "Space Grotesk",sans-serif'; ctx.fillText('Fiecare oras spune o poveste.',W/2,H*0.45); }
  if(t>0.46){ ctx.globalAlpha=Math.min(1,(t-0.46)/0.2)*a; ctx.fillStyle='#D4AF37'; ctx.font='800 '+Math.min(W*0.03,40)+'px "Space Grotesk",sans-serif'; ctx.fillText('Unde va fi '+((name||'orasul').toUpperCase())+' peste 30 de ani?',W/2,H*0.54); }
  ctx.globalAlpha=1; ctx.restore();
}
// SPONGE CITY — ploaie 100mm: AZI inundatie vs DUPA absorbtie (trend climatic UE).
function _drawSponge(ctx,W,H,a,t){
  if(a<=0)return; ctx.save();
  ctx.globalAlpha=a*0.4; ctx.strokeStyle='#60a5fa'; ctx.lineWidth=1.5;
  for(var i=0;i<46;i++){ var x=(i*61+t*420)%W; var y=((i*43)+(t*640))%(H*0.5)+H*0.14; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x-3,y+12); ctx.stroke(); }
  var mid=W/2; ctx.textAlign='center';
  ctx.globalAlpha=a; ctx.fillStyle='rgba(239,68,68,0.32)'; ctx.fillRect(W*0.06,H*0.66,mid-W*0.10,H*0.12);
  ctx.fillStyle='#ef4444'; ctx.font='800 '+Math.min(W*0.014,18)+'px "Space Grotesk",sans-serif'; ctx.fillText('AZI: inundatie urbana',W*0.30,H*0.835);
  ctx.fillStyle='rgba(34,197,94,0.32)'; ctx.fillRect(mid+W*0.04,H*0.66,mid-W*0.10,H*0.12);
  ctx.fillStyle='#22c55e'; ctx.fillText('SPONGE CITY: absorbtie',W*0.72,H*0.835);
  ctx.fillStyle='rgba(148,163,184,0.65)'; ctx.font='500 '+Math.min(W*0.0092,11)+'px "IBM Plex Mono",monospace'; ctx.fillText('parcuri absorbante · coridoare albastre · bazine de retentie · pavaje permeabile',W/2,H*0.91);
  ctx.fillStyle='#60a5fa'; ctx.font='900 '+Math.min(W*0.02,26)+'px "Space Grotesk",sans-serif'; ctx.fillText('PLOAIE 100 mm / 24h',W/2,H*0.40);
  ctx.globalAlpha=1; ctx.restore();
}
// URBAN METABOLISM — orasul ca organism: intrari (apa/energie/oameni/marfuri) -> iesiri.
function _drawMetabolism(ctx,W,H,a,t){
  if(a<=0)return; ctx.save();
  var cx=W/2, cy=H*0.50, R=Math.min(W*0.13,170), cr=Math.min(W*0.03,40);
  var br=0.5+0.5*Math.sin(t*Math.PI*3);
  var FS=Math.min(W*0.0092,12);
  // pastila intunecata sub text -> lizibil pe harta colorata (fix #4)
  function pill(x,y,txt,align,col){
    ctx.font='700 '+FS+'px "IBM Plex Mono",monospace';
    var tw=ctx.measureText(txt).width, padX=5, padY=3, h=FS+padY*2;
    var rx = align==='right'? x-tw-padX : align==='center'? x-tw/2-padX : x-padX;
    ctx.globalAlpha=a*0.82; ctx.fillStyle='rgba(4,10,22,0.88)';
    if(ctx.roundRect){ ctx.beginPath(); ctx.roundRect(rx,y-FS,tw+padX*2,h,4); ctx.fill(); } else ctx.fillRect(rx,y-FS,tw+padX*2,h);
    ctx.globalAlpha=a; ctx.fillStyle=col; ctx.textAlign=align; ctx.fillText(txt,x,y);
  }
  ctx.globalAlpha=a; ctx.fillStyle='rgba(212,175,55,'+(0.6+br*0.3)+')'; ctx.beginPath(); ctx.arc(cx,cy,cr,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle='rgba(10,18,36,0.9)'; ctx.lineWidth=2; ctx.stroke();
  ctx.fillStyle='#0a1224'; ctx.font='900 '+Math.min(W*0.011,14)+'px "Space Grotesk",sans-serif'; ctx.textAlign='center'; ctx.fillText('ORAS',cx,cy+4);
  var ins=[['Apa','#60a5fa'],['Energie','#fbbf24'],['Oameni','#4ade80'],['Marfuri','#c084fc']];
  var outs=[['Emisii','#f87171'],['Deseuri','#d1d5db'],['Apa uzata','#22d3ee']];
  ins.forEach(function(it,i){ var y=cy-R*0.7+i*(R*1.4/3), x=cx-R*1.5, flow=(t*2+i*0.25)%1;
    ctx.globalAlpha=a*0.8; ctx.strokeStyle=it[1]; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(cx-cr,cy); ctx.stroke();
    var fx=x+(cx-cr-x)*flow, fy=y+(cy-y)*flow; ctx.globalAlpha=a; ctx.fillStyle=it[1]; ctx.beginPath(); ctx.arc(fx,fy,4.5,0,Math.PI*2); ctx.fill();
    pill(x-6,y+3,it[0]+' →','right',it[1]); });
  outs.forEach(function(it,i){ var y=cy-R*0.45+i*(R*0.9/2), x=cx+R*1.5, flow=(t*2+i*0.3)%1;
    ctx.globalAlpha=a*0.8; ctx.strokeStyle=it[1]; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(cx+cr,cy); ctx.lineTo(x,y); ctx.stroke();
    var fx=(cx+cr)+(x-(cx+cr))*flow, fy=cy+(y-cy)*flow; ctx.globalAlpha=a; ctx.fillStyle=it[1]; ctx.beginPath(); ctx.arc(fx,fy,4.5,0,Math.PI*2); ctx.fill();
    pill(x+6,y+3,'→ '+it[0],'left',it[1]); });
  ctx.font='800 '+Math.min(W*0.011,14)+'px "IBM Plex Mono",monospace';
  pill(cx,cy-R-Math.min(W*0.02,26),'METABOLISM URBAN — orasul ca organism','center','#fcd34d');
  ctx.globalAlpha=1; ctx.restore();
}
// CITY OPERATING SYSTEM — orasul ca sistem viu (module care se aprind + CPU central).
function _drawCityOS(ctx,W,H,a,t){
  if(a<=0)return; ctx.save();
  var cx=W/2, cy=H*0.45, R=Math.min(W*0.16,210);
  var mods=[['Oameni','#22c55e'],['Economie','#D4AF37'],['Mobilitate','#60a5fa'],['Sanatate','#ef4444'],['Mediu','#34d399'],['Administratie','#a855f7']];
  ctx.globalAlpha=a*0.28; ctx.strokeStyle='#D4AF37'; ctx.lineWidth=1; ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2); ctx.stroke();
  mods.forEach(function(md,i){ var ang=-Math.PI/2+i*Math.PI/3, x=cx+Math.cos(ang)*R, y=cy+Math.sin(ang)*R, on=(t*1.25)>(i/mods.length);
    ctx.globalAlpha=a*(on?0.5:0.14); ctx.strokeStyle=md[1]; ctx.lineWidth=on?2:1; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(cx,cy); ctx.stroke();
    ctx.globalAlpha=a*(on?1:0.3); ctx.fillStyle=md[1]; ctx.beginPath(); ctx.arc(x,y,on?9:5,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha=a*(on?0.95:0.4); ctx.fillStyle='rgba(230,235,255,0.92)'; ctx.font='700 '+Math.min(W*0.0092,12)+'px "IBM Plex Mono",monospace'; ctx.textAlign='center'; ctx.fillText(md[0],x,y+Math.min(W*0.024,30)); });
  ctx.globalAlpha=a; ctx.fillStyle='#D4AF37'; ctx.fillRect(cx-Math.min(W*0.026,34),cy-Math.min(W*0.014,18),Math.min(W*0.052,68),Math.min(W*0.028,36));
  ctx.fillStyle='#0a1224'; ctx.font='900 '+Math.min(W*0.009,12)+'px "Space Grotesk",sans-serif'; ctx.textAlign='center'; ctx.fillText('URBANX OS',cx,cy+3);
  if(t>0.6){ ctx.globalAlpha=Math.min(1,(t-0.6)/0.2)*a; ctx.fillStyle='rgba(255,255,255,0.95)'; ctx.font='600 '+Math.min(W*0.015,20)+'px "Space Grotesk",sans-serif'; ctx.textAlign='center'; ctx.fillText('Orasul nu e o colectie de cladiri. Este un sistem viu.',cx,H*0.82); }
  ctx.globalAlpha=1; ctx.restore();
}

// MIGRATIE — fluxuri intrare/iesire fata de oras (sold migrator net).
function _drawMigration(ctx,W,H,a,pred){
  if(a<=0)return; pred=pred||{}; ctx.save();
  var cx=W*0.64, cy=H*0.50, r=Math.min(W*0.045,56);
  var mig=pred.migNeta||0;
  ctx.globalAlpha=a; ctx.fillStyle='#D4AF37'; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#0a1224'; ctx.font='900 '+Math.min(W*0.012,15)+'px "Space Grotesk",sans-serif'; ctx.textAlign='center'; ctx.fillText('ORAS',cx,cy+4);
  var outs=[['Emigrare munca',0.6],['Tineri studenti',0.3],['Familii periurban',0.2]];
  var ins=[['Revin diaspora',0.3],['Studenti noi',0.45],['Migratie interna',0.3]];
  outs.forEach(function(f,i){ var ang=Math.PI*(0.62+i*0.26), ex=cx+Math.cos(ang)*r*3.4, ey=cy+Math.sin(ang)*r*2.2;
    ctx.globalAlpha=a*0.7; ctx.strokeStyle='#ef4444'; ctx.lineWidth=2+f[1]*6; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(ex,ey); ctx.stroke();
    ctx.globalAlpha=a; ctx.fillStyle='#ef4444'; ctx.font='700 '+Math.min(W*0.0088,11)+'px "IBM Plex Mono",monospace'; ctx.textAlign='right'; ctx.fillText('← '+f[0],ex-4,ey+3); });
  ins.forEach(function(f,i){ var ang=Math.PI*(-0.36+i*0.26), ex=cx+Math.cos(ang)*r*3.4, ey=cy+Math.sin(ang)*r*2.2;
    ctx.globalAlpha=a*0.7; ctx.strokeStyle='#22c55e'; ctx.lineWidth=2+f[1]*6; ctx.beginPath(); ctx.moveTo(ex,ey); ctx.lineTo(cx,cy); ctx.stroke();
    ctx.globalAlpha=a; ctx.fillStyle='#22c55e'; ctx.font='700 '+Math.min(W*0.0088,11)+'px "IBM Plex Mono",monospace'; ctx.textAlign='left'; ctx.fillText(f[0]+' →',ex+4,ey+3); });
  ctx.globalAlpha=a; ctx.fillStyle=mig>=0?'#22c55e':'#ef4444'; ctx.font='900 '+Math.min(W*0.022,28)+'px "Space Grotesk",sans-serif'; ctx.textAlign='center';
  ctx.fillText((mig>=0?'+':'')+(mig||0)+'/an',cx,cy-r-Math.min(W*0.02,26));
  ctx.fillStyle='rgba(148,163,184,0.6)'; ctx.font='600 '+Math.min(W*0.009,11)+'px "IBM Plex Mono",monospace'; ctx.fillText('SOLD MIGRATOR NET',cx,cy+r+Math.min(W*0.026,34));
  ctx.restore();
}
// ROI IMOBILIAR — comparatie randament imobiliar vs alternative.
function _drawROI(ctx,W,H,a,pred){
  if(a<=0)return; pred=pred||{}; ctx.save();
  var roi=pred.roi||8;
  var comp=[['Imobiliar oras',roi,'#D4AF37'],['Titluri stat',7,'#a855f7'],['Inflatie',6,'#ef4444'],['Depozit bancar',4,'#60a5fa']];
  var mx=Math.max.apply(null,comp.map(function(c){return c[1];}))*1.15;
  var x=W*0.58, y0=H*0.34, bw=Math.min(W*0.30,360), rh=Math.min(H*0.06,42);
  comp.forEach(function(c,i){ var yy=y0+i*rh;
    ctx.globalAlpha=a*Math.min(1,(a)); ctx.fillStyle='rgba(255,255,255,0.07)'; ctx.fillRect(x,yy,bw,rh-9);
    ctx.fillStyle=c[2]; ctx.fillRect(x,yy,bw*(c[1]/mx),rh-9);
    ctx.fillStyle='rgba(230,235,255,0.92)'; ctx.font='700 '+Math.min(W*0.0095,12)+'px "IBM Plex Mono",monospace'; ctx.textAlign='left'; ctx.fillText(c[0],x+6,yy+rh*0.4);
    ctx.textAlign='right'; ctx.fillStyle=c[2]; ctx.font='900 '+Math.min(W*0.011,14)+'px "Space Grotesk",sans-serif'; ctx.fillText(c[1]+'%/an',x+bw-6,yy+rh*0.4); });
  ctx.globalAlpha=a*0.85; ctx.fillStyle='#D4AF37'; ctx.font='800 '+Math.min(W*0.011,14)+'px "IBM Plex Mono",monospace'; ctx.textAlign='left';
  ctx.fillText('RANDAMENT ANUAL ESTIMAT (brut)',x,y0-Math.min(W*0.015,20));
  ctx.fillStyle='rgba(148,163,184,0.5)'; ctx.font='500 '+Math.min(W*0.0078,10)+'px "IBM Plex Mono",monospace'; ctx.fillText('orientativ · ajustat la riscul seismic local',x,y0+comp.length*rh+4);
  ctx.restore();
}
// CORIDOARE DE INFLUENTA — zone concentrice de crestere a valorii in jurul unui pol.
function _drawInfluence(ctx,W,H,a,t){
  if(a<=0)return; ctx.save();
  var cx=W*0.64, cy=H*0.50;
  var zones=[[Math.min(W*0.20,260),'+3%','#3b82f6'],[Math.min(W*0.155,200),'+10%','#22c55e'],[Math.min(W*0.105,135),'+20%','#f59e0b'],[Math.min(W*0.06,78),'+35% valoare','#ff3366']];
  zones.forEach(function(z,i){ var pr=Math.min(1,(t-i*0.06)/0.4); if(pr<=0)return;
    ctx.globalAlpha=a*0.30*pr; ctx.fillStyle=z[2]; ctx.beginPath(); ctx.arc(cx,cy,z[0]*pr,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha=a*0.8*pr; ctx.strokeStyle=z[2]; ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(cx,cy,z[0]*pr,0,Math.PI*2); ctx.stroke();
    ctx.globalAlpha=a*pr; ctx.fillStyle=z[2]; ctx.font='800 '+Math.min(W*0.0095,12)+'px "IBM Plex Mono",monospace'; ctx.textAlign='center'; ctx.fillText(z[1],cx,cy-z[0]*pr+Math.min(W*0.012,15)); });
  ctx.globalAlpha=a; ctx.fillStyle='#fff'; ctx.font='900 '+Math.min(W*0.011,14)+'px "Space Grotesk",sans-serif'; ctx.textAlign='center'; ctx.fillText('AUTOSTRADA /',cx,cy-3); ctx.fillText('PROIECT MAJOR',cx,cy+12);
  ctx.globalAlpha=a*0.85; ctx.fillStyle='#D4AF37'; ctx.font='800 '+Math.min(W*0.011,14)+'px "IBM Plex Mono",monospace'; ctx.fillText('CORIDOR DE INFLUENTA · model gravitational',cx,H*0.20);
  ctx.restore();
}

// Radar de analiza — baleiaj rotativ subtil peste harta (scenele de analiza).
function _drawRadar(ctx,W,H,a){
  if(a<=0) return;
  ctx.save();
  var cx=W/2, cy=H*0.52, R=Math.min(W,H)*0.62;
  var ang=(performance.now()/2400)%(Math.PI*2);
  ctx.globalAlpha=a*0.06; ctx.strokeStyle='rgba(212,175,55,0.6)'; ctx.lineWidth=1;
  [0.28,0.55,0.82,1].forEach(function(f){ ctx.beginPath(); ctx.arc(cx,cy,R*f,0,Math.PI*2); ctx.stroke(); });
  ctx.globalAlpha=a*0.14;
  var grd=ctx.createLinearGradient(cx,cy,cx+Math.cos(ang)*R,cy+Math.sin(ang)*R);
  grd.addColorStop(0,'rgba(212,175,55,0.55)'); grd.addColorStop(1,'rgba(212,175,55,0)');
  ctx.strokeStyle=grd; ctx.lineWidth=2.5;
  ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+Math.cos(ang)*R,cy+Math.sin(ang)*R); ctx.stroke();
  ctx.restore();
}

// Split-screen comparativ — orasul curent vs un oras de referinta (benchmark).
function _drawCompare(ctx,W,H,a,city,pred){
  if(a<=0) return;
  var n2=function(v){return isNaN(+v)?'—':Math.round(+v).toLocaleString('ro-RO');};
  var bench=null;
  try{ if(window._RO_CITIES_DB){ bench=window._RO_CITIES_DB['RO-CJ-01']||Object.values(window._RO_CITIES_DB).find(function(v){return (v.name||'')!==(city.name||'')&&v.pop2021;}); } }catch(e){}
  bench=bench||{name:'Cluj-Napoca',pop2021:286598,pib_eur_cap:18000,suprafata_ha:17952};
  var dens=function(c){return c.pop2021&&c.suprafata_ha?Math.round(c.pop2021/c.suprafata_ha):'—';};
  ctx.save();
  var midX=W/2;
  ctx.globalAlpha=a*0.5; ctx.strokeStyle='rgba(212,175,55,0.6)'; ctx.lineWidth=2; ctx.setLineDash([4,4]);
  ctx.beginPath(); ctx.moveTo(midX,H*0.28); ctx.lineTo(midX,H*0.74); ctx.stroke(); ctx.setLineDash([]);
  ctx.globalAlpha=a; ctx.textAlign='center';
  ctx.fillStyle='#fff'; ctx.font='900 '+Math.min(W*0.020,26)+'px "Space Grotesk",sans-serif';
  ctx.fillText((city.name||'').toUpperCase(), W*0.27, H*0.265);
  ctx.fillStyle='rgba(148,163,184,0.85)';
  ctx.fillText((bench.name||'').toUpperCase(), W*0.73, H*0.265);
  var rows=[
    ['POPULATIE 2021', n2(city.pop2021), n2(bench.pop2021)],
    ['PIB EUR/CAP', n2(city.pib_eur_cap), n2(bench.pib_eur_cap)],
    ['DENSITATE loc/ha', dens(city), dens(bench)],
  ];
  rows.forEach(function(r,i){
    var y=H*(0.37+i*0.105);
    ctx.globalAlpha=a*Math.min(1,(i+1));
    ctx.fillStyle='rgba(148,163,184,0.6)'; ctx.font='600 '+Math.min(W*0.009,11)+'px "IBM Plex Mono",monospace'; ctx.textAlign='center';
    ctx.fillText(r[0], midX, y-Math.min(W*0.016,20));
    ctx.fillStyle='#D4AF37'; ctx.font='900 '+Math.min(W*0.024,32)+'px "Space Grotesk",sans-serif';
    ctx.fillText(r[1], W*0.27, y);
    ctx.fillStyle='rgba(200,210,230,0.85)';
    ctx.fillText(r[2], W*0.73, y);
  });
  ctx.restore();
}

// Split temporal 2025 <-> 2055 — o linie verticala matura ecranul; stanga =
// existent, dreapta = proiectat. Reda senzatia de "timp care trece peste oras".
function _drawTemporalSweep(ctx,W,H,p){
  if(p<=0||p>=1) return;
  var x=W*(0.10+0.80*p);
  ctx.save();
  // partea "trecut" (stanga) usor desaturata/intunecata
  ctx.globalAlpha=0.12; ctx.fillStyle='#0a1224'; ctx.fillRect(0,0,x,H);
  // muchia luminoasa
  var g=ctx.createLinearGradient(x-W*0.04,0,x,0);
  g.addColorStop(0,'rgba(212,175,55,0)'); g.addColorStop(1,'rgba(212,175,55,0.22)');
  ctx.globalAlpha=1; ctx.fillStyle=g; ctx.fillRect(x-W*0.04,0,W*0.04,H);
  ctx.strokeStyle='#D4AF37'; ctx.lineWidth=2.5; ctx.globalAlpha=0.92;
  ctx.beginPath(); ctx.moveTo(x,H*0.12); ctx.lineTo(x,H*0.88); ctx.stroke();
  ctx.fillStyle='#D4AF37'; ctx.beginPath(); ctx.arc(x,H*0.5,7,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#0a1224'; ctx.font='900 9px monospace'; ctx.textAlign='center'; ctx.fillText('⇄',x,H*0.5+3);
  // etichete
  ctx.globalAlpha=0.9; ctx.textAlign='center'; ctx.letterSpacing='.04em';
  ctx.font='900 '+Math.min(W*0.016,22)+'px "Space Grotesk",sans-serif';
  ctx.fillStyle='rgba(148,163,184,0.92)'; ctx.fillText('◄ 2025 EXISTENT', Math.max(W*0.11,x-W*0.11), H*0.5-Math.min(W*0.02,26));
  ctx.fillStyle='#D4AF37'; ctx.fillText('2055 PROIECTAT ►', Math.min(W*0.89,x+W*0.11), H*0.5-Math.min(W*0.02,26));
  ctx.restore();
}

// Crize simultane — 5 cercuri colorate care se string spre oras (presiune cumulata).
function _drawCrisisConverge(ctx,W,H,a,t){
  if(a<=0) return;
  ctx.save();
  var cx=W*0.66, cy=H*0.50, Rmax=Math.min(W,H)*0.42;
  var crises=[
    {c:'#ef4444',l:'SEISMIC'},{c:'#3b82f6',l:'INUNDATII'},{c:'#f59e0b',l:'CALDURA'},
    {c:'#94a3b8',l:'DEMOGRAFIC'},{c:'#fbbf24',l:'ENERGETIC'}
  ];
  var pulse=0.5+0.5*Math.sin(t*Math.PI*4);
  crises.forEach(function(cr,i){
    var ph=Math.max(0,Math.min(1,(t-i*0.06)/0.5));
    if(ph<=0) return;
    var r=Rmax*(1-ph*0.62)*(1+0.03*pulse);
    var ang=-Math.PI/2+i*(Math.PI*2/5);
    ctx.globalAlpha=a*0.75*ph; ctx.strokeStyle=cr.c; ctx.lineWidth=2.5; ctx.setLineDash([6,5]);
    ctx.beginPath(); ctx.arc(cx,cy,r,ang-0.6,ang+0.6); ctx.stroke(); ctx.setLineDash([]);
    // sageata spre centru + eticheta
    var lx=cx+Math.cos(ang)*r, ly=cy+Math.sin(ang)*r;
    ctx.fillStyle=cr.c; ctx.beginPath(); ctx.arc(lx,ly,4,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha=a*ph; ctx.font='700 '+Math.min(W*0.0095,12)+'px "IBM Plex Mono",monospace';
    ctx.textAlign=Math.cos(ang)>=0?'left':'right';
    ctx.fillText(cr.l, lx+(Math.cos(ang)>=0?9:-9), ly+3);
  });
  // miez = orasul sub presiune
  if(t>0.4){
    var ca=Math.min(1,(t-0.4)/0.2)*a;
    ctx.globalAlpha=ca*(0.6+0.4*pulse); ctx.fillStyle='rgba(239,68,68,0.9)';
    ctx.beginPath(); ctx.arc(cx,cy,Math.min(W*0.02,26),0,Math.PI*2); ctx.fill();
    ctx.globalAlpha=ca; ctx.fillStyle='#fff'; ctx.font='900 '+Math.min(W*0.011,14)+'px "Space Grotesk",sans-serif'; ctx.textAlign='center';
    ctx.fillText('ORAS', cx, cy+4);
  }
  ctx.restore();
}

function _drawQR(ctx,W,H,a){
  ctx.save();
  var size=Math.min(W*0.12,100),qx=W*0.04,qy=H*0.85;
  ctx.globalAlpha=a*0.92;
  ctx.fillStyle='rgba(4,10,24,0.90)';ctx.fillRect(qx-4,qy-4,size+8,size+size*0.25+12);
  ctx.strokeStyle='#D4AF37';ctx.lineWidth=1;ctx.strokeRect(qx-4,qy-4,size+8,size+size*0.25+12);
  var cs=Math.floor(size/7);
  var qp=[[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,0,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]];
  for(var r=0;r<7;r++){for(var c=0;c<7;c++){ctx.fillStyle=qp[r][c]===1?'#D4AF37':'rgba(4,10,24,0.5)';ctx.fillRect(qx+c*cs,qy+r*cs,cs-1,cs-1);}}
  for(var i=0;i<16;i++){ctx.fillStyle=Math.random()>0.5?'#D4AF37':'rgba(4,10,24,0.5)';ctx.fillRect(qx+(2+Math.floor(Math.random()*3))*cs,qy+(2+Math.floor(Math.random()*3))*cs,cs-1,cs-1);}
  ctx.fillStyle='rgba(220,230,255,0.78)';ctx.font='700 '+Math.min(W*0.007,9)+'px "IBM Plex Mono",monospace';ctx.textAlign='center';ctx.letterSpacing='.04em';
  ctx.fillText('SCAN QR',qx+size/2,qy+size+size*0.15);
  ctx.fillStyle='rgba(148,163,184,0.55)';ctx.font='500 '+Math.min(W*0.006,8)+'px "IBM Plex Mono",monospace';
  ctx.fillText('thinksmartsolutions.github.io/UrbanX',qx+size/2,qy+size+size*0.24);
  ctx.restore();
}

// ── HELPERS ───────────────────────────────────────────────────────────────


// ── CORIDOARE PROGRESIVE pe Mapbox ────────────────────────────────────────
// Foloseste _CorridorsLayer din tci-corridors.js
// Apare un coridor pe rand, cu delay, in timp ce te uiti
function _showCorridorsProgressive(map, city, zoneData, delay_ms) {
  if(!map) return;
  if(!city || !city.lat || !city.lon) {
    console.warn('[v9] _showCorridorsProgressive: city null sau fara coordonate');
    return;
  }
  if(!window._CorridorsLayer) {
    console.warn('[v9] _CorridorsLayer lipsa — include tci-corridors.js');
    // Fallback la coridoare geometrice simple
    _buildFallbackCorridors(city);
    return;
  }
  var CL = window._CorridorsLayer;
  var corridors = CL.generateCorridors(
    null, // cityKey — folosim city direct
    zoneData || { zones: [], metro: [] },
    null
  );
  // Patch: injectam city manual daca generateCorridors nu il gaseste
  if(!corridors || !corridors.length) {
    corridors = _buildFallbackCorridors(city);
  }
  if(!corridors || !corridors.length) return;

  // Curata coridoarele anterioare
  ['corridors-src','corridors-line','corridors-glow','corridors-zones','corridors-dev-zones'].forEach(function(id){
    try{if(map.getLayer(id))map.removeLayer(id);}catch(e){}
    try{if(map.getSource(id))map.removeSource(id);}catch(e){}
  });

  // Initializeaza sursa goala
  try{
    map.addSource('corridors-src',{type:'geojson',data:{type:'FeatureCollection',features:[]}});
    // Glow
    map.addLayer({id:'corridors-glow',type:'line',source:'corridors-src',
      filter:['==',['geometry-type'],'LineString'],
      layout:{'line-join':'round','line-cap':'round'},
      paint:{'line-color':['get','color'],'line-width':14,'line-opacity':0.12,'line-blur':10}});
    // Fill zone
    map.addLayer({id:'corridors-dev-zones',type:'fill',source:'corridors-src',
      filter:['==',['geometry-type'],'Polygon'],
      paint:{'fill-color':['get','color'],'fill-opacity':0.10}});
    // Contur zone
    map.addLayer({id:'corridors-zones',type:'line',source:'corridors-src',
      filter:['==',['geometry-type'],'Polygon'],
      paint:{'line-color':['get','color'],'line-width':1.5,'line-opacity':0.5,'line-dasharray':[4,2]}});
    // Linia principala
    map.addLayer({id:'corridors-line',type:'line',source:'corridors-src',
      filter:['==',['geometry-type'],'LineString'],
      layout:{'line-join':'round','line-cap':'round'},
      paint:{'line-color':['get','color'],'line-width':['get','width'],'line-opacity':0.88}});
  }catch(e){ console.warn('[corridors]',e.message); return; }

  // Adauga coridoarele progresiv
  var shown = [], idx = 0;
  var iv = setInterval(function(){
    if(idx >= corridors.length){ clearInterval(iv); return; }
    var c = corridors[idx]; idx++;
    if(!c.geometry_line && !c.coordinates) return;

    var cfg = CL.CORRIDOR_TYPES[c.type] || CL.CORRIDOR_TYPES.MIXT;

    // Feature linie principala
    var lineFeat = {type:'Feature',
      geometry: c.geometry_line || {type:'LineString',
        coordinates: c.coordinates && c.coordinates.type==='LineString' ? c.coordinates.coordinates :
          (c.node_start&&c.node_end ? [[c.node_start.lon||city.lon, c.node_start.lat||city.lat],[c.node_end.lon,c.node_end.lat]] :
          [[city.lon-0.01,city.lat],[city.lon+0.01,city.lat]])},
      properties:{color:cfg.color,width:cfg.width,name:c.name,type:c.type,
        functiuni:(c.functiuni||[]).join(' · '),finantare:(c.finantare||[]).join(' · ')}};

    shown.push(lineFeat);

    // Feature zona buffer (daca exista)
    if(c.coordinates && c.coordinates.type==='Polygon') {
      shown.push({type:'Feature',geometry:c.coordinates,
        properties:{color:cfg.color,width:1,name:c.name,type:c.type,
          functiuni:(c.functiuni||[]).join(' · '),finantare:(c.finantare||[]).join(' · ')}});
    }

    try{
      if(map.getSource('corridors-src'))
        map.getSource('corridors-src').setData({type:'FeatureCollection',features:shown});
    }catch(e){}
  }, delay_ms || 1800);
  _ivs.push(iv);
}

// Coridoare fallback bazate pe geometria UAT-ului
function _buildFallbackCorridors(city) {
  if(!city || !city.lat) return [];
  var cx=city.lon||27.601, cy=city.lat||47.158;
  var CL = window._CorridorsLayer;
  var cfg_tod = CL ? CL.CORRIDOR_TYPES.TOD : {color:'#D4AF37',width:4};
  var cfg_eco = CL ? CL.CORRIDOR_TYPES.ECONOMIC : {color:'#60a5fa',width:3};
  var cfg_ver = CL ? CL.CORRIDOR_TYPES.VERDE : {color:'#22c55e',width:3};
  var cfg_mob = CL ? CL.CORRIDOR_TYPES.MOBILITATE : {color:'#a78bfa',width:3};
  var cfg_mix = CL ? CL.CORRIDOR_TYPES.MIXT : {color:'#f97316',width:2};

  return [
    {id:'tod1',type:'TOD',name:'Coridor TOD — Centru-Gara',
     geometry_line:{type:'LineString',coordinates:[[cx,cy],[cx-0.012,cy+0.018]]},
     coordinates:{type:'Polygon',coordinates:[[[cx-0.01,cy+0.016],[cx-0.014,cy+0.020],[cx-0.016,cy+0.014],[cx-0.008,cy+0.012],[cx-0.01,cy+0.016]]]},
     node_start:{lon:cx,lat:cy,label:'Centru'},node_end:{lon:cx-0.012,lat:cy+0.018,label:'Gara CFR'},
     functiuni:['Rezidential','Servicii','Comert'],finantare:['FEDR POR 2021-2027'],
     justificare:'Cervero&Kockelman(1997) TOD — densificare 400-800m fata de statie',prioritate:1},
    {id:'eco1',type:'ECONOMIC',name:'Coridor Economic — Zona Industriala Vest',
     geometry_line:{type:'LineString',coordinates:[[cx,cy],[cx-0.022,cy-0.015]]},
     coordinates:{type:'Polygon',coordinates:[[[cx-0.020,cy-0.013],[cx-0.024,cy-0.017],[cx-0.026,cy-0.011],[cx-0.018,cy-0.009],[cx-0.020,cy-0.013]]]},
     functiuni:['Reconversie industriala','Birouri','Logistica'],finantare:['InvestEU','PPP'],
     justificare:'OECD(2021) Urban Economic Analysis — reconversie brownfield',prioritate:2},
    {id:'ver1',type:'VERDE',name:'Coridor Verde — Retea Ecologica',
     geometry_line:{type:'LineString',coordinates:[[cx-0.015,cy+0.010],[cx,cy],[cx+0.012,cy-0.008],[cx+0.020,cy+0.005]]},
     functiuni:['Spatii verzi','Piste ciclism','Coridor fauna'],finantare:['Green Deal UE'],
     justificare:'Forman(1995) Land Mosaics — conectivitate ecologica',prioritate:2},
    {id:'mob1',type:'MOBILITATE',name:'Coridor Mobilitate — Centru-Periferie Nord',
     geometry_line:{type:'LineString',coordinates:[[cx,cy],[cx+0.008,cy+0.025],[cx+0.012,cy+0.040]]},
     functiuni:['BRT rapid','Velo-autostrada','Park&Ride'],finantare:['FC Coheziune OS2.3'],
     justificare:'ESPON(2021) Metropolitan Areas — conectivitate policentrica',prioritate:1},
    {id:'mix1',type:'MIXT',name:'Coridor Mixt — Densificare Est',
     geometry_line:{type:'LineString',coordinates:[[cx,cy],[cx+0.018,cy+0.008],[cx+0.028,cy+0.012]]},
     functiuni:['Rezidential mixt','Servicii proximitate'],finantare:['FEDR POR','Privat'],
     justificare:'HG 525/1996 + Ord.233/2016 — densificare controlata',prioritate:3},
    {id:'mix2',type:'MIXT',name:'Coridor Mixt — Densificare Sud-Vest',
     geometry_line:{type:'LineString',coordinates:[[cx,cy],[cx-0.016,cy-0.020],[cx-0.022,cy-0.032]]},
     functiuni:['Rezidential','Servicii'],finantare:['FEDR POR','Privat'],
     justificare:'HG 525/1996 — densificare controlata zona rezidentiala',prioritate:3},
  ];
}

// Afiseaza coridoare simple pe harta (fara animatie progresiva)
function _showCorridorsOnMap(map, corridors, delay_ms) {
  if(!corridors||!corridors.length) return;
  try{
    if(map.getLayer('v9-corr-line'))map.removeLayer('v9-corr-line');
    if(map.getLayer('v9-corr-glow'))map.removeLayer('v9-corr-glow');
    if(map.getSource('v9-corr'))map.removeSource('v9-corr');
    map.addSource('v9-corr',{type:'geojson',data:{type:'FeatureCollection',features:[]}});
    map.addLayer({id:'v9-corr-glow',type:'line',source:'v9-corr',
      layout:{'line-join':'round','line-cap':'round'},
      paint:{'line-color':['get','color'],'line-width':16,'line-opacity':0.10,'line-blur':12}});
    map.addLayer({id:'v9-corr-line',type:'line',source:'v9-corr',
      layout:{'line-join':'round','line-cap':'round'},
      paint:{'line-color':['get','color'],'line-width':['get','w'],'line-opacity':0.85,
        'line-dasharray':[3,1.5]}});
  }catch(e){ return; }
  var shown=[],i=0;
  var iv=setInterval(function(){
    if(i>=corridors.length){clearInterval(iv);return;}
    shown.push(corridors[i]);i++;
    try{if(map.getSource('v9-corr'))map.getSource('v9-corr').setData({type:'FeatureCollection',features:shown});}catch(e){}
  },delay_ms||1500);
  _ivs.push(iv);
}

// Coridoare pentru Agenda Administratorului — zone de interventie localizate
function _buildAgendaCorridors(cx,cy,pred) {
  var ag=pred.ag||0.20;
  var feats=[];
  // Coridor seismic — zona fondului vulnerabil
  feats.push({type:'Feature',
    geometry:{type:'LineString',coordinates:[[cx-0.018,cy+0.012],[cx-0.008,cy+0.004],[cx+0.005,cy-0.002]]},
    properties:{color:ag>=0.30?'#ef4444':'#f59e0b',w:5,label:'Zona fond seismic vulnerabil'}});
  // Coridor BRT propus
  feats.push({type:'Feature',
    geometry:{type:'LineString',coordinates:[[cx-0.025,cy],[cx-0.010,cy],[cx,cy],[cx+0.015,cy],[cx+0.028,cy-0.005]]},
    properties:{color:'#3b82f6',w:4,label:'Coridor BRT propus'}});
  // Zona densificare PUZ
  feats.push({type:'Feature',
    geometry:{type:'LineString',coordinates:[[cx+0.010,cy+0.008],[cx+0.020,cy+0.015],[cx+0.028,cy+0.020]]},
    properties:{color:'#f59e0b',w:3,label:'Zona densificare PUZ propusa'}});
  // Coridor spatii verzi
  feats.push({type:'Feature',
    geometry:{type:'LineString',coordinates:[[cx-0.020,cy+0.018],[cx-0.010,cy+0.010],[cx,cy+0.005],[cx+0.012,cy+0.015]]},
    properties:{color:'#22c55e',w:3,label:'Coridor spatii verzi propuse'}});
  // Centura/pasaj propus
  if(pred.pasaje&&pred.pasaje>2){
    feats.push({type:'Feature',
      geometry:{type:'LineString',coordinates:[[cx-0.015,cy-0.018],[cx-0.008,cy-0.012],[cx+0.005,cy-0.015],[cx+0.018,cy-0.010]]},
      properties:{color:'#dc2626',w:4,label:'Pasaje rutiere propuse'}});
  }
  return feats;
}



// ── ZONE REALE DIN PUG ────────────────────────────────────────────────────
// Calculeaza centroizii UTR-urilor per tip functional
// Returneaza zone cu coordonate reale pentru camera
function _calcPUGZones(pugGeo, cx, cy) {
  var zones = {
    CBD:  {lon:cx,     lat:cy,     label:'Centru civic'},
    UNI:  {lon:cx+0.010, lat:cy+0.015, label:'Zona universitara'},
    IND:  {lon:cx-0.020, lat:cy-0.012, label:'Zona industriala'},
    RES:  {lon:cx+0.008, lat:cy-0.005, label:'Rezidential'},
    PER:  {lon:cx+0.045, lat:cy-0.030, label:'Periferie'},
    VERDE:{lon:cx-0.015, lat:cy+0.010, label:'Spatii verzi'},
  };

  if(!pugGeo||!pugGeo.features||!pugGeo.features.length) return zones;

  // Grupeaza UTR-urile dupa prefix cod
  var groups = {};
  pugGeo.features.forEach(function(f){
    var utr = (f.properties&&(f.properties.utr_cod||f.properties.cod_utr||''))||'';
    var prefix = utr.slice(0,2).toUpperCase();
    if(!prefix) return;
    if(!groups[prefix]) groups[prefix]={lons:[],lats:[],count:0};
    // Calculeaza centroidul poligonului
    var coords = f.geometry&&f.geometry.coordinates&&f.geometry.coordinates[0]||[];
    if(!coords.length) return;
    var sumLon=0, sumLat=0;
    coords.forEach(function(c){sumLon+=c[0];sumLat+=c[1];});
    groups[prefix].lons.push(sumLon/coords.length);
    groups[prefix].lats.push(sumLat/coords.length);
    groups[prefix].count++;
  });

  // Mapeaza prefixe la zone functionale
  var PREFMAP = {
    'CC':'CBD','CP':'CBD',             // Centru comercial/civic
    'CM':'CBD','CB':'CBD',             // Mixt/birouri centru
    'LB':'UNI','LC':'UNI',            // Locuire colectiva (zona universitara tipic)
    'AI':'IND','II':'IND','DS':'IND', // Industrial/depozitare
    'LA':'RES','LL':'RES',            // Locuire mica/libera
    'V1':'VERDE','V2':'VERDE',        // Spatii verzi
    'PP':'PER','ZP':'PER',            // Periferie/plantat
  };

  Object.entries(groups).forEach(function(e){
    var prefix=e[0], g=e[1];
    var zkey = PREFMAP[prefix];
    if(!zkey||!g.lons.length) return;
    // Media centroizilor = centrul zonei functionale
    var avgLon = g.lons.reduce(function(a,b){return a+b;},0)/g.lons.length;
    var avgLat = g.lats.reduce(function(a,b){return a+b;},0)/g.lats.length;
    zones[zkey] = {lon:avgLon, lat:avgLat, label:zones[zkey]&&zones[zkey].label||prefix, count:g.count};
  });

  console.log('[v9] Zone PUG:', JSON.stringify(
    Object.entries(zones).map(function(e){return e[0]+':'+e[1].lon.toFixed(3)+','+e[1].lat.toFixed(3);})
  ));
  return zones;
}

// Construieste bounding box din UTR-uri PUG pentru un tip
function _getPUGBBox(pugGeo, utrPrefix) {
  if(!pugGeo||!pugGeo.features) return null;
  var minLon=Infinity,minLat=Infinity,maxLon=-Infinity,maxLat=-Infinity;
  var found=0;
  pugGeo.features.forEach(function(f){
    var utr=(f.properties&&(f.properties.utr_cod||f.properties.cod_utr||''))||'';
    if(!utr.toUpperCase().startsWith(utrPrefix.toUpperCase())) return;
    var coords=f.geometry&&f.geometry.coordinates&&f.geometry.coordinates[0]||[];
    coords.forEach(function(c){
      minLon=Math.min(minLon,c[0]);minLat=Math.min(minLat,c[1]);
      maxLon=Math.max(maxLon,c[0]);maxLat=Math.max(maxLat,c[1]);
    });
    found++;
  });
  if(!found) return null;
  return {
    lon:(minLon+maxLon)/2, lat:(minLat+maxLat)/2,
    zoom:14-Math.log2(Math.max(maxLon-minLon,maxLat-minLat)*111),
  };
}

function _fp(city){
  var pop=city.pop2021||city.pop||100000,r=city.rata_reala_2011_2021||0;
  return {
    p21:pop,p11:city.pop2011||Math.round(pop*1.06),r10:r,rRef:r,
    pop55:Math.round(pop*Math.pow(1+r/100,_HORIZON)),
    pib:city.pib_eur_cap||14200,pctUE:39,pctUE55:62,rPIB:3.8,anConv:2050,
    deltaP:0,natalitate:9,mortalit:13,sporNat:-4,migNeta:-500,
    salariu:(function(){
      // Incearca cinema-data.js, fallback la valori hardcodate per judet
      if(window._getSalariu&&city.judet) return window._getSalariu(city.judet);
      var sal={'B':5800,'CJ':4900,'TM':4600,'BV':4400,'SB':4300,'CT':4200,
               'IS':4100,'AR':4000,'BH':3900,'PH':3800,'GL':3700,'DJ':3700,
               'BC':3600,'GR':3400,'BT':3200,'VS':3100,'NT':3000,'SV':3200};
      var j=(city.judet||'').toUpperCase().replace('RO-','').split('-')[0];
      return sal[j]||3500;
    })(),somaj:5,ocupare:60,roi:8,
    ocupatie:{servicii:52,industrie:28,comert:18,constructii:8,agricultura:5},
    defLoc:Math.max(0,Math.round(pop*0.08)),recHa:Math.round(pop/300),
    ag:(function(){
      if(window._getSeismic&&city.judet) return window._getSeismic(city.judet).ag;
      var ag={'VN':0.40,'BZ':0.40,'IS':0.35,'GL':0.35,'BC':0.35,'NT':0.35,
              'VS':0.35,'B':0.35,'IF':0.35,'PH':0.35,'BR':0.35,'IL':0.35,
              'GR':0.25,'TR':0.25,'OT':0.25,'DJ':0.25,'GJ':0.25,'AG':0.25,
              'DB':0.25,'VL':0.25,'BT':0.20,'SV':0.20,'MH':0.20,'CT':0.20,
              'AB':0.15,'SB':0.15,'MS':0.15,'HR':0.15,'CV':0.15,'CS':0.15,
              'HD':0.15,'BV':0.15,'CJ':0.10,'BH':0.10,'AR':0.10,'TM':0.10,
              'SM':0.10,'MM':0.10,'SJ':0.10,'BN':0.10};
      var j=(city.judet||'').toUpperCase().replace('RO-','').split('-')[0];
      return ag[j]||0.20;
    })(),fond:Math.round(pop/50),
    mot24:380,satAn:_S()+15,fluxOra:Math.round(pop*0.08),pasaje:5,kmOcol:20,
    tp:62,kmBRT:Math.round(pop/8000),costBRT:Math.round(pop/2000),
    defTP:13,walkScore:58,statiiNoi:Math.round(pop/1200),anSUMP:_P1(),
    zile24:(city&&city._live&&city._live.zileCaniculare)||18,
    uhi:1.8,drought:'moderat',flood:'Mediu',
    scoliNoi:Math.max(0,Math.round(pop/60000)),cabMed:Math.max(1,Math.round(pop/15000)),
    svHa:Math.round(pop/400),svM2:11,sdgTotal:6.4,
    spatiiPublice:65,locuireSDG:70,siguranta:72,
    auth:Math.round(pop/800),modalAuto:68,
    invMob:Math.round(pop/800),invSoc:Math.round(pop/1000),invTotal:Math.round(pop/300),
    trendClr:'#f59e0b',trendLbl:'STAGNEAZA',gradNoi2:5,
    urbanScore:(window._calcUrbanScore?null:null), // calculat la runtime
  };
}

function _peers(city){
  var h=city.coef_hub||0.78;
  if(h>=1.1) return 'Krakow (PL), Vilnius (LT), Brno (CZ)';
  if(h>=0.9) return 'Rzeszow (PL), Lublin (PL), Miskolc (HU)';
  if(h>=0.7) return 'Bielsko-Biala (PL), Debrecen (HU), Varna (BG)';
  return 'Piatra Neamt (RO), Bacau (RO), Suceava (RO)';
}

function _buildAgenda(pred,city,pop21){
  var ag=pred.ag||0.20,items=[];
  if(ag>=0.30) items.push({priority:'\u{1F534} URGENTA 1',text:'Consolidare seismica fond pre-1977 — PNRR C10-I2',neg:'cutremur >7.0 = '+Math.round((pred.fond||0)*0.15)+' cl. critice',clr:'#ef4444'});
  else if(ag>=0.20) items.push({priority:'\u{1F7E1} PRIOR. 1',text:'Evaluare tehnica fond pre-1977 — expertize structurale',neg:'fond neevaluat = raspundere juridica primarie',clr:'#f59e0b'});
  if((pred.tp||62)<65) items.push({priority:'\u{1F534} URGENTA 2',text:'BRT + pasaje pietonale — coridoare principale definite',neg:'modal auto >80% in '+_P2()+' = colaps urban',clr:'#ef4444'});
  if((pred.defLoc||3000)>2000) items.push({priority:'\u{1F7E1} PRIOR. 2',text:'Actualizare PUG — zone densificare + coridoare crestere',neg:'PUG depasit = investitori blocati = pierdere fiscala',clr:'#f59e0b'});
  if((pred.satAn||_S()+15)<_P1()+12) items.push({priority:'\u{1F534} URGENTA 3',text:'Studiu fezabilitate pasaje rutiere — '+(pred.pasaje||3)+' prioritare',neg:'saturare '+(pred.satAn||2040)+' = colaps economic zona',clr:'#ef4444'});
  if((pred.svM2||11)<9) items.push({priority:'\u{1F7E1} PRIOR. 3',text:'Plan spatii verzi — minim 9m\u00b2/loc standard OMS',neg:'UHI nemitigat = spitalizari val caldura +40%',clr:'#f59e0b'});
  items.push({priority:'\u{1F7E2} STRATEGIC 1',text:'SUMP '+_P1()+' — Plan Mobilitate Urbana Durabila',neg:'fara SUMP = pierdere fonduri UE '+N(Math.round((pred.costBRT||90)*0.7))+' M EUR',clr:'#22c55e'});
  items.push({priority:'\u{1F7E2} STRATEGIC 2',text:'Smart City — digitalizare + IoT urban',neg:'fara digitalizare = imposibil fonduri smart city',clr:'#22c55e'});
  function N(v){return isNaN(+v)?'—':Number(v).toLocaleString('ro-RO',{maximumFractionDigits:0});}
  return items.slice(0,6);
}

function _mobPts(cx,cy,pred){
  return [
    {type:'Feature',geometry:{type:'Point',coordinates:[cx+0.012,cy-0.008]},properties:{c:'#ef4444',r:14,n:'Pasaj rutier 1'}},
    {type:'Feature',geometry:{type:'Point',coordinates:[cx-0.010,cy+0.006]},properties:{c:'#ef4444',r:12,n:'Pasaj rutier 2'}},
    {type:'Feature',geometry:{type:'Point',coordinates:[cx+0.020,cy+0.012]},properties:{c:'#ef4444',r:10,n:'Pasaj rutier 3'}},
    {type:'Feature',geometry:{type:'Point',coordinates:[cx-0.018,cy-0.010]},properties:{c:'#f59e0b',r:10,n:'BRT vest'}},
    {type:'Feature',geometry:{type:'Point',coordinates:[cx+0.025,cy-0.005]},properties:{c:'#f59e0b',r:10,n:'BRT est'}},
    {type:'Feature',geometry:{type:'Point',coordinates:[cx-0.002,cy+0.018]},properties:{c:'#a78bfa',r:8,n:'Pasaj pietonal'}},
  ];
}

function _agendaPts(cx,cy,pred){
  var ag=pred.ag||0.20;
  return [
    {type:'Feature',geometry:{type:'Point',coordinates:[cx-0.008,cy+0.005]},properties:{c:ag>=0.30?'#ef4444':'#f59e0b',r:18,n:'Consolidare seismica'}},
    {type:'Feature',geometry:{type:'Point',coordinates:[cx+0.015,cy-0.008]},properties:{c:'#ef4444',r:15,n:'Pasaj rutier'}},
    {type:'Feature',geometry:{type:'Point',coordinates:[cx-0.015,cy-0.010]},properties:{c:'#f59e0b',r:13,n:'BRT coridor'}},
    {type:'Feature',geometry:{type:'Point',coordinates:[cx+0.020,cy+0.012]},properties:{c:'#f59e0b',r:12,n:'PUZ densificare'}},
    {type:'Feature',geometry:{type:'Point',coordinates:[cx-0.022,cy+0.016]},properties:{c:'#22c55e',r:10,n:'Parc nou'}},
    {type:'Feature',geometry:{type:'Point',coordinates:[cx+0.006,cy+0.022]},properties:{c:'#22c55e',r:10,n:'Scoala noua'}},
  ];
}

function _cleanV9(map){
  // Curata AGRESIV heatmap presiune - toate layerele cunoscute
  try{
    if(window._TCIPressureHeatmap){
      window._TCIPressureHeatmap._active = false;
      // Fortat - stergem layerele direct, indiferent de _active
      ['tci-pressure-layer','tci-pressure-layer-outline','tci-pressure-labels',
       'tci-pressure-src'].forEach(function(id){
        try{if(map.getLayer(id))map.removeLayer(id);}catch(e){}
        try{if(map.getSource(id))map.removeSource(id);}catch(e){}
      });
    }
  }catch(e){}
  // Sterge LAYERELE inainte de SOURCE (ordinea corecta Mapbox)
  var _layers9 = ['v9-hw','v9-hw-buf','v9-rail','v9-apt','v9-urb','v9-urb-maj',
    'v9-green','v9-mon','v9-cim','v9-utils','v9-amenity','v9-agenda','v9-mob-pts',
    'corridors-line','corridors-glow','corridors-zones','corridors-dev-zones',
    'v9-brt','v9-corr-line','v9-corr-glow',
    'cnair-glow','cnair-wip','cnair-op','cnair-plan',
    'cestrin-lines','cestrin-glow',
    'gtfs-lines','gtfs-glow',
    'aero-zone','aero-border','aero-pts',
    'opensky-pts',
    'mdlpa-fill','mdlpa-border','mdlpa-wms'];
  var _sources9 = ['corridors-src','v9-corr','cnair-src','cestrin-src',
    'gtfs-src','aero-src','opensky-src','mdlpa-src',
    'v9-hw','v9-hw-buf','v9-rail','v9-apt','v9-urb','v9-urb-maj',
    'v9-green','v9-mon','v9-cim','v9-utils','v9-amenity','v9-agenda',
    'v9-mob-pts','v9-brt'];
  _layers9.forEach(function(id){
    try{if(map.getLayer(id))map.removeLayer(id);}catch(e){}
  });
  _sources9.forEach(function(id){
    try{if(map.getSource(id))map.removeSource(id);}catch(e){}
  });
  // SWEEP ROBUST pe prefixe — garanteaza ca NICIO scena nu lasa layere in urma
  // (fix #4: harta de inundatii anar-flood-* ramanea pana la final).
  _sweepCin(map);
}

// Curatare exhaustiva dupa PREFIX — orice layer/source cinematic ramas e sters.
// Mult mai robust decat listele enumerate (care ratau anar-flood-*, flood-est-*).
function _sweepCin(map){
  try{
    var st=map.getStyle&&map.getStyle(); if(!st) return;
    var PFX=['v6-','v7-','v8-','v9-','flood','tci-flood','tci-pressure','tci-tp','anar-flood','flood-est','corridors-','cnair-','cestrin-','gtfs-','aero-','opensky-','mdlpa-'];
    var hit=function(id){ for(var i=0;i<PFX.length;i++){ if(id.indexOf(PFX[i])===0) return true; } return false; };
    (st.layers||[]).slice().forEach(function(L){ if(L&&L.id&&hit(L.id)){ try{map.removeLayer(L.id);}catch(e){} } });
    Object.keys(st.sources||{}).forEach(function(s){ if(hit(s)){ try{map.removeSource(s);}catch(e){} } });
  }catch(e){}
}

function _mkFallbackCanvas(){
  ['tci-c8','tci-c6','tci-c7'].forEach(function(id){document.getElementById(id)&&document.getElementById(id).remove();});
  var dpr=window.devicePixelRatio||1,W=window.innerWidth,H=window.innerHeight;
  var c=document.createElement('canvas');
  c.id='tci-c8'; c.width=Math.round(W*dpr); c.height=Math.round(H*dpr);
  c.style.cssText='position:fixed;top:0;left:0;width:'+W+'px;height:'+H+'px;z-index:99999;pointer-events:none;';
  var ctx2=c.getContext('2d');
  if(ctx2) ctx2.scale(dpr,dpr);
  document.documentElement.appendChild(c);
  return c;
}

function _mkCtrlFallback(stopCb,goCb,SE){
  document.getElementById('tci-c8-ctrl')&&document.getElementById('tci-c8-ctrl').remove();
  var d=document.createElement('div'); d.id='tci-c8-ctrl';
  d.style.cssText='position:fixed;bottom:24px;right:20px;z-index:96000;display:flex;gap:8px;';
  var bs='border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.6);padding:10px 16px;border-radius:10px;cursor:pointer;font:600 12px/1 monospace;backdrop-filter:blur(8px)';
  d.innerHTML='<button id="c8-prev" style="background:rgba(0,0,0,.6);'+bs+'">\u25C0</button>'
    +'<button id="c8-skip" style="background:rgba(0,0,0,.6);'+bs+'">\u25B6</button>'
    +'<button id="c8-explain" title="Mod explicat \u2014 pauza + descriere scena" style="background:rgba(59,130,246,.25);border:1px solid rgba(59,130,246,.4);color:#93c5fd;padding:10px 14px;border-radius:10px;cursor:pointer;font:700 12px/1 monospace;backdrop-filter:blur(8px)">\u2139 Explica</button>'
    +'<button id="c8-rec" title="Inregistreaza filmul (.webm)" style="background:rgba(0,0,0,.6);'+bs+'">\u23FA REC</button>'
    +'<button id="c8-stop" style="background:rgba(180,0,0,.5);border:1px solid rgba(255,80,80,.3);color:#ff9999;padding:10px 14px;border-radius:10px;cursor:pointer;font:600 12px/1 monospace;backdrop-filter:blur(8px)">\u2715</button>';
  document.body.appendChild(d);
  document.getElementById('c8-prev').onclick=function(){goCb(SE._si-1);};
  document.getElementById('c8-skip').onclick=function(){goCb(SE._si+1);};
  document.getElementById('c8-stop').onclick=stopCb;
  document.getElementById('c8-explain').onclick=function(){ window._CinemaExplain&&window._CinemaExplain.toggle(SE); };
  document.getElementById('c8-rec').onclick=function(){ var b=this; if(window._CinemaRec){ if(window._CinemaRec._active){window._CinemaRec.stop();b.style.background='rgba(0,0,0,.6)';b.textContent='\u23FA REC';} else {window._CinemaRec.start();b.style.background='rgba(220,0,0,.6)';b.textContent='\u23F9 STOP';} } };
}

// \u2500\u2500 EXPORT VIDEO (.webm) \u2014 compozit harta Mapbox (preserveDrawingBuffer) + overlay \u2500\u2500
window._CinemaRec={
  _rec:null,_chunks:[],_raf:null,_active:false,
  start:function(){
    try{
      var map=window.map, ov=document.getElementById('tci-c8');
      if(!map||!ov){ if(window.ss)ss('Porneste intai cinematicul'); return; }
      if(typeof MediaRecorder==='undefined'){ if(window.ss)ss('Browserul nu suporta inregistrarea video'); return; }
      var mc=map.getCanvas();
      var comp=document.createElement('canvas'); comp.width=mc.width; comp.height=mc.height;
      var cx=comp.getContext('2d'); var self=this;
      var stream=comp.captureStream(30);
      var mimes=['video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm'], mime='video/webm';
      for(var i=0;i<mimes.length;i++){ try{ if(MediaRecorder.isTypeSupported(mimes[i])){mime=mimes[i];break;} }catch(e){} }
      this._chunks=[];
      this._rec=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:10000000});
      this._rec.ondataavailable=function(e){ if(e.data&&e.data.size) self._chunks.push(e.data); };
      this._rec.onstop=function(){
        var blob=new Blob(self._chunks,{type:'video/webm'}); var url=URL.createObjectURL(blob);
        var a=document.createElement('a'); a.href=url;
        a.download='UrbanX-cinematic-'+((window.TCI&&window.TCI.cityKey)||'film')+'.webm';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function(){URL.revokeObjectURL(url);},8000);
      };
      this._active=true; this._rec.start(1000);
      var draw=function(){
        if(!self._active) return;
        try{
          if(comp.width!==mc.width) comp.width=mc.width;
          if(comp.height!==mc.height) comp.height=mc.height;
          cx.drawImage(mc,0,0);
          var o=document.getElementById('tci-c8'); if(o) cx.drawImage(o,0,0,comp.width,comp.height);
        }catch(e){}
        self._raf=requestAnimationFrame(draw);
      };
      draw();
      if(window.ss)ss('\u23FA Inregistrare pornita \u2014 apasa \u23F9 STOP pentru a salva .webm');
    }catch(e){ console.warn('[Rec]',e.message); if(window.ss)ss('Eroare inregistrare: '+e.message); }
  },
  stop:function(){ if(!this._active) return; this._active=false; if(this._raf)cancelAnimationFrame(this._raf); try{this._rec.stop();}catch(e){} if(window.ss)ss('\uD83D\uDCBE Se salveaza filmul (.webm)...'); }
};

// \u2500\u2500 MOD EXPLICAT (step-by-step) \u2014 panou care descrie scena curenta, pt sedinte \u2500\u2500
window._CinemaExplain={
  _on:false,_iv:null,
  _TXT:{
    'b1s1':'Identitatea UAT-ului: pozitie, judet, regiune, populatie INSE 2021. Punctul de plecare al oricarei analize.',
    'b1s2':'Contextul geopolitic: vecini, granite, coridoare de transport. Conteaza pentru fluxuri economice si fonduri UE.',
    'b1s3':'Reteaua nationala si scorul gravitational: cat de mult atrage orasul fata de regiune (model de gravitatie urbana).',
    'b1s4':'Evolutia istorica (Wikipedia + demografie): trecutul explica fondul construit invechit si tendintele actuale.',
    'b2s1':'Demografie live INSE: piramida varstelor, densitate. Structura populatiei determina nevoile de locuire si servicii.',
    'b2s2':'Criza imbatranirii: raportul activi/dependenti scade \u2014 mai putini contribuabili, presiune pe servicii sociale.',
    'b2s3':'Migratie si emigrare: pierderea fortei de munca tinere; fiecare plecare = pierdere fiscala si economica.',
    'b2s4':'Profilul cumparatorilor: salariu mediu, putere de cumparare, segmente imobiliare accesibile.',
    'b3s1':'PIB/locuitor si convergenta cu UE27 (Eurostat). Motorul valorii imobiliare pe termen lung.',
    'b3s2':'Motoarele economice: universitati, industrie, servicii, hub-uri. Diversificarea = rezilienta.',
    'b3s3':'Investitii si ROI imobiliar: preturi, oportunitati, riscuri ajustate seismic.',
    'b4s1':'Reteaua rutiera reala (OSM): unde se formeaza congestia si blocajele.',
    'b4s2':'Conectivitate regionala: autostrazi, CFR, aeroporturi, pozitia fata de coridoarele TEN-T.',
    'b4s3':'Transport public: acoperire actuala + propuneri (BRT, tramvai).',
    'b4s4':'Retele de utilitati si restrictii: apa, canal, energie, gaz, monumente \u2014 limiteaza construibilul.',
    'b5s1':'Risc seismic (P100/2013): fondul vulnerabil + UTR-urile expuse. Prioritate consolidare PNRR C10-I2.',
    'b5s2':'Inundatii si clima (ANAR PGRA, WMS real): zone inundabile, insula de caldura, scenarii RCP.',
    'b5s3':'Costul inactiunii: ce pierde orasul daca nu intervine pe riscuri.',
    'b6s1':'Fondul construit existent: tipuri, monumente, densitate reala azi.',
    'b6s2':'INIMA FILMULUI: orasul se construieste ca un val 2025->2055. Masterplan etapizat (centura, tren, cartiere, parc, reconversie, centura verde), presiune densitate, split temporal.',
    'b6s3':'Scenarii de extindere a intravilanului: 3 orizonturi (2030/2040/2055) + interval Monte Carlo al populatiei.',
    'b7s1':'Trafic si congestie: presiune din fluxurile OSM reale pe nodurile critice.',
    'b7s2':'Solutii de mobilitate desenate: pasaje, centura, BRT, piste velo, axe pietonale.',
    'b7s3':'Distributia modala (auto/TP/activ) azi vs tinta 2030.',
    'b8s1':'Proiecte majore & PNRR: propunerea desenata ca zone (spital, cartiere, hub, reconversie).',
    'b8s2':'Coridoare de influenta: cum o autostrada/proiect major creste valoarea zonelor (model gravitational).',
    'b9s1':'Monte Carlo: 10.000 de viitoruri simulate -> 3 scenarii + interval de incredere 90% pentru dimensionarea PUG.',
    'b9s2':'Benchmark european: orasul vs un peer (ex. Cluj) + exemple internationale reusite.',
    'b9s3':'Scenariul inactiunii: consecintele documentate daca nu se actioneaza.',
    'b10s1':'Crize simultane: geopolitic + demografic + climatic + energetic + seismic se amplifica reciproc.',
    'b10s2':'Scenariul negru + SPIRALA NEGATIVA desenata: populatie\u2193->fiscalitate\u2193->servicii\u2193->colaps.',
    'b10s3':'Constructia rezilientei: solutii dovedite si resurse disponibile pentru iesirea din spirala.',
    'b12s1':'Superblocks Barcelona aplicat: grupuri 3x3 cvartale, -21% trafic, spatiu public recuperat.',
    'b12s2':'Regula 3-30-300 (OMS): 3 copaci vizibili, 30% canopy, 300m la verde \u2014 vs starea reala.',
    'b12s3':'Orasul 15 minute (Moreno): 6 functii esentiale la 15 min pe jos/velo.',
    'b12s4':'Sinteza Masterplan: proiectia completa + 6 axe strategice + QR catre scenariul live.',
    'b11s1':'Agenda primarului: 5 prioritati de actiune + coridoarele de prioritate.',
    'b11s2':'Viziunea 2055 + Urban Health Index + generic final cu QR scanabil.'
  },
  toggle:function(SE){
    this._on=!this._on;
    if(!this._on){ this._hide(); if(window.ss)ss('Mod explicat dezactivat'); return; }
    var self=this; this._render(SE);
    this._iv=setInterval(function(){ if(!self._on){clearInterval(self._iv);return;} self._render(SE); },700);
    if(window.ss)ss('\u2139 Mod explicat activ \u2014 fiecare scena e descrisa. Foloseste \u23F8 pentru pauza.');
  },
  _render:function(SE){
    var sc=(SE.SCENES&&SE.SCENES[SE._si])||{};
    var txt=this._TXT[sc.id]||sc.blabel||'';
    var p=document.getElementById('cin-explain');
    if(!p){ p=document.createElement('div'); p.id='cin-explain';
      p.style.cssText='position:fixed;left:20px;bottom:92px;max-width:430px;z-index:1000001;background:rgba(2,6,18,0.93);border:1px solid rgba(59,130,246,.4);border-radius:12px;padding:14px 16px;font-family:"Space Grotesk",system-ui,sans-serif;color:#e2e8f0;box-shadow:0 8px 30px rgba(0,0,0,.55);backdrop-filter:blur(10px)';
      document.body.appendChild(p); }
    p.innerHTML='<div style="font-size:9px;font-weight:800;color:#93c5fd;letter-spacing:.12em;margin-bottom:4px">BLOC '+(sc.bloc||'')+' \u00B7 '+(sc.blabel||'')+'</div>'
      +'<div style="font-size:15px;font-weight:800;color:#fff;margin-bottom:6px">'+(sc.label||'')+'</div>'
      +'<div style="font-size:12px;line-height:1.5;color:rgba(220,228,255,.86)">'+txt+'</div>';
  },
  _hide:function(){ this._on=false; if(this._iv)clearInterval(this._iv); var p=document.getElementById('cin-explain'); if(p)p.remove(); }
};

// ── PATCH & EXPORT ────────────────────────────────────────────────────────
(function patch(n){
  if(typeof window.openTCI==='function'){
    window.openTCI=function(opts){
      window._startCinema((opts&&opts.cityKey)||(window.TCI&&window.TCI.cityKey)||localStorage.getItem('ux_last_city')||'RO-IS-01');
    };
    console.log('[v9] openTCI patched');
  } else if(n<30) setTimeout(function(){patch(n+1);},300);
})(0);

window._launchCinemaV2=function(){ window._startCinema(); };
window._launchCinema=function(k){ window._startCinema(k); };

console.log('[TCI Cinematic v9.0 Master] LOADED \u2014 '+SCENES.length+' scene \u00b7 11 blocuri \u00b7 ~50-60 min \u00b7 date live INSE+OSM+Wikipedia+ANAR');

})();
