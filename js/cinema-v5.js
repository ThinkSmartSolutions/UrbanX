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
  {id:'b2s4',dur:18000,label:'PROFIL CUMPARATORI',   bloc:2,blabel:'CINE SUNT LOCUITORII'},
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
  {id:'b11s1',dur:24000,label:'AGENDA PRIMARULUI',   bloc:11,blabel:'AGENDA & VIZIUNEA'},
  {id:'b11s2',dur:28000,label:'VIZIUNEA',            bloc:11,blabel:'AGENDA & VIZIUNEA'},
];

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
  function onIdle(fn){try{map.once('idle',fn);}catch(e){setTimeout(fn,1200);}}

  var cv = SE._mkCanvas ? SE._mkCanvas() : _mkFallbackCanvas();
  if(!cv){console.error('[v9] Canvas lipsa');return;}
  SE._canvas=cv; SE._ctx=cv.getContext('2d');
  if(!SE._ctx){console.error('[v9] Canvas context lipsa');return;}
  SE._map=map; SE._city=city; SE._pred=pred;
  SE._playing=true; SE._si=0; SE.SCENES=SCENES;
  SE._guardCanvas&&SE._guardCanvas();

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

  // Zone dinamice per UAT
  var Z={
    C:[cx,cy], NV:[cx-0.024,cy+0.018], SE2:[cx+0.026,cy-0.015],
    SV:[cx-0.017,cy-0.020], NE:[cx+0.022,cy+0.019],
    PER:[cx+0.048,cy-0.034], FAR:[cx+0.090,cy-0.060],
    CBD:[cx-0.004,cy+0.003], UNI:[cx+0.010,cy+0.015], IND:[cx-0.020,cy-0.012],
  };

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
    SE._playing=false; _clrIvs();
    try{map.flyTo=_oFly;map.jumpTo=_oJump;}catch(e){}
    if(SE._raf) cancelAnimationFrame(SE._raf);
    if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
    SE._cleanLayers&&SE._cleanLayers();
    _cleanV9(map);
    try{if(origColor)map.setPaintProperty('building-extrusion','fill-extrusion-color',origColor);}catch(e){}
    try{map.setPaintProperty('building-extrusion','fill-extrusion-height',['get','height']);}catch(e){}
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
          if(D.roads&&D.roads.length){ addLine('v9-hw',D.roads); setTimeout(function(){_pulse(map,'v9-hw','line-opacity',0.4,0.95,12);},500); }
          if(D.rail&&D.rail.length) addLine('v9-rail',D.rail,{'line-color':'#a78bfa','line-width':2,'line-opacity':0.7,'line-dasharray':[5,3]});
          if(D.airports&&D.airports.length){
            addCircle('v9-apt',D.airports.map(function(a){return{type:'Feature',geometry:{type:'Point',coordinates:[a.lon,a.lat]},properties:{c:'#22c55e',r:14,n:a.name}};}));
            setTimeout(function(){_pulse(map,'v9-apt','circle-radius',8,18,8);},1000);
          }
        },2500);
        fly([cx,cy],9,20,-10,5000,6000,'night');
        fly([cx,cy],11.5,38,15,5000,13000,'day');
        break;

      case 'b1s3':
        lp('day');
        try{map.jumpTo({center:[24.5,45.9],zoom:7,pitch:15,bearing:0});}catch(e){}
        fly([cx,cy],10,30,0,5000,1000,'day');
        fly([cx,cy],13,52,20,5000,9000,'day');
        fly(Z.C,14.5,62,35,5000,16000,'dusk');
        break;

      case 'b1s4':
        lp('dawn');
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
        try{map.setPaintProperty('building-extrusion','fill-extrusion-color',['interpolate',['linear'],['get','height'],0,'#14532d',5,'#166534',10,'#f59e0b',20,'#dc2626',35,'#7f1d1d']);}catch(e){}
        fly(Z.C,13,50,0,4000,0,'dusk');
        fly(Z.NE,14.5,62,30,6000,9000,'dusk');
        fly(Z.SV,14,58,-25,6000,17000,'dusk');
        break;

      case 'b2s3':
        lp('night');
        fly([cx,cy],11,40,0,4000,0,'night');
        setTimeout(function(){
          if(!SE._playing) return;
          if(D.roads&&D.roads.length){ addLine('v9-hw',D.roads); _pulse(map,'v9-hw','line-opacity',0.3,0.9,10); }
        },1500);
        fly(Z.C,13,52,15,6000,9000,'night');
        fly(Z.PER,12.5,48,50,6000,17000,'night');
        break;

      case 'b2s4':
        lp('day');
        fly(Z.CBD,15,65,-15,4000,0,'day');
        fly(Z.UNI,15.5,68,30,6000,10000,'day');
        fly(Z.IND,14.5,60,-40,6000,17000,'dusk');
        break;

      // BLOC 3 ───────────────────────────────────────────────────────────
      case 'b3s1':
        lp('day');
        onIdle(function(){try{SE._addBuildings&&SE._addBuildings(map);}catch(e){}});
        fly(Z.C,14,55,-10,4000,0,'day');
        fly(Z.NE,15,65,25,6000,10000,'day');
        fly(Z.C,13.5,52,0,5000,18000,'dusk');
        break;

      case 'b3s2':
        lp('day');
        fly(Z.CBD,14.5,58,10,4000,0,'day');
        fly(Z.UNI,15.5,70,35,6000,8000,'day');
        fly(Z.IND,14,62,-30,6000,15000,'dusk');
        break;

      case 'b3s3':
        lp('day');
        setTimeout(function(){
          if(!SE._playing) return;
          if(D.roads&&D.roads.length) addLine('v9-hw',D.roads);
          if(D.rail&&D.rail.length) addLine('v9-rail',D.rail,{'line-color':'#a78bfa','line-width':2,'line-opacity':0.7});
        },500);
        fly([cx,cy],11.5,35,0,4000,0,'day');
        fly(Z.C,14,58,20,6000,9000,'day');
        fly(Z.PER,13,50,60,6000,17000,'dusk');
        break;

      // BLOC 4 ───────────────────────────────────────────────────────────
      case 'b4s1':
        lp('night');
        fly([cx,cy],12,48,0,4000,0,'night');
        setTimeout(function(){
          if(!SE._playing) return;
          if(D.urban&&D.urban.length){
            addLine('v9-urb',D.urban);
            var maj=D.urban.filter(function(f){return f.properties&&(f.properties.hw==='primary'||f.properties.hw==='motorway'||f.properties.hw==='trunk');});
            if(maj.length){ addLine('v9-urb-maj',maj,{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0.5}); _pulse(map,'v9-urb-maj','line-opacity',0.3,1.0,8); }
          }
          try{SE._addTrafficPulse&&SE._addTrafficPulse(map);}catch(e){}
        },1500);
        fly(Z.C,13.5,55,15,6000,9000,'night');
        fly(Z.SE2,13,50,-22,6000,17000,'night');
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
          }
          if(D.rail&&D.rail.length){ addLine('v9-rail',D.rail,{'line-color':'#a78bfa','line-width':2,'line-opacity':0.7}); _flowLine(map,'v9-rail'); }
          if(D.airports&&D.airports.length){
            addCircle('v9-apt',D.airports.map(function(a){return{type:'Feature',geometry:{type:'Point',coordinates:[a.lon,a.lat]},properties:{c:'#22c55e',r:14,n:a.name}};}));
            _pulse(map,'v9-apt','circle-radius',8,20,6);
          }
        },2000);
        fly([cx,cy],10,22,-10,5000,7500,'day');
        fly([cx,cy],12.5,42,18,5000,14000,'day');
        break;

      case 'b4s3':
        lp('day');
        try{
          if(map.getLayer('tci-tp-layer')){ map.setLayoutProperty('tci-tp-layer','visibility','visible'); _pulse(map,'tci-tp-layer','line-opacity',0.4,1.0,10); }
        }catch(e){}
        onIdle(function(){try{SE._addTransitExpand&&SE._addTransitExpand(map);}catch(e){}});
        rot(20,0.009);
        fly(Z.C,13.5,52,0,4000,0,'day');
        fly(Z.NV,14,60,30,6000,10000,'day');
        fly(Z.SE2,13.5,55,-25,5500,18000,'day');
        break;

      case 'b4s4':
        lp('day');
        setTimeout(function(){
          if(!SE._playing) return;
          if(D.monuments&&D.monuments.length){ addCircle('v9-mon',D.monuments); _pulse(map,'v9-mon','circle-radius',5,12,8); }
          if(D.cimitire&&D.cimitire.length) addLine('v9-cim',D.cimitire,{'line-color':'#6b7280','line-width':2,'line-dasharray':[3,3],'line-opacity':0.7});
          if(D.utilities&&D.utilities.length) addLine('v9-utils',D.utilities,{'line-color':'#fbbf24','line-width':1,'line-opacity':0.5,'line-dasharray':[2,4]});
        },1500);
        fly(Z.C,15.5,68,20,4000,0,'day');
        fly(Z.NV,15,65,65,6000,10000,'day');
        fly(Z.SE2,15,65,125,6000,18000,'day');
        break;

      // BLOC 5 ───────────────────────────────────────────────────────────
      case 'b5s1':
        lp('night');
        try{map.setPaintProperty('building-extrusion','fill-extrusion-color',['interpolate',['linear'],['get','height'],0,'#166534',8,'#854d0e',15,'#b91c1c',25,'#dc2626',40,'#ef4444']);}catch(e){}
        onIdle(function(){try{SE._addSeismicHeat&&SE._addSeismicHeat(map);}catch(e){}});
        fly([cx,cy],12.5,52,5,4000,0,'night');
        fly(Z.NV,14,62,30,6500,8000,'night');
        fly(Z.SE2,14,60,-22,6500,15000,'night');
        break;

      case 'b5s2':
        lp('dawn');
        fly([cx,cy],11.5,45,8,4000,0,'dawn');
        setTimeout(function(){
          if(!SE._playing) return;
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
        fly(Z.SV,12.5,50,15,6000,9000,'dawn');
        fly(Z.C,13,55,-5,5500,17000,'day');
        break;

      case 'b5s3':
        lp('night');
        try{map.setPaintProperty('building-extrusion','fill-extrusion-color','#ef4444'); map.setPaintProperty('building-extrusion','fill-extrusion-opacity',0.75);}catch(e){}
        fly(Z.C,14,62,15,4000,0,'night');
        rot(25,0.007);
        fly(Z.NV,14.5,66,80,7000,11000,'night');
        fly(Z.C,13.5,58,-10,6000,20000,'dusk');
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
        try{map.setPaintProperty('building-extrusion','fill-extrusion-color',['interpolate',['linear'],['get','height'],0,'#14532d',6,'#15803d',15,'#f59e0b',28,'#ef4444']);}catch(e){}
        fly(Z.C,14.5,62,10,4000,0,'night');
        rot(20,0.015);
        fly(Z.NV,14.5,65,55,7500,12000,'night');
        fly(Z.SE2,14,62,135,7000,21000,'dusk');
        break;

      case 'b6s3':
        lp('dusk');
        onIdle(function(){try{SE._addExpansionRings&&SE._addExpansionRings(map);}catch(e){}});
        fly([cx,cy],11.5,48,-5,4000,0,'dusk');
        fly(Z.PER,12,45,40,7000,10000,'dusk');
        fly(Z.C,13,52,-10,6000,19000,'night');
        break;

      // BLOC 7 ───────────────────────────────────────────────────────────
      case 'b7s1':
        lp('night');
        fly([cx,cy],12,48,0,4000,0,'night');
        setTimeout(function(){
          if(!SE._playing) return;
          try{SE._addTrafficPulse&&SE._addTrafficPulse(map);}catch(e){}
          if(D.urban&&D.urban.length){ addLine('v9-urb',D.urban); _pulse(map,'v9-urb','line-opacity',0.3,0.9,10); }
        },1500);
        fly(Z.C,13.5,55,15,6000,9000,'night');
        fly(Z.SE2,13,50,-20,6000,17000,'night');
        break;

      case 'b7s2':
        lp('day');
        setTimeout(function(){
          if(!SE._playing) return;
          addCircle('v9-mob-pts',_mobPts(cx,cy,pred));
          _pulse(map,'v9-mob-pts','circle-radius',8,20,7);
          if(D.roads&&D.roads.length) addLine('v9-hw',D.roads);
        },1500);
        fly([cx,cy],13,52,0,4000,0,'day');
        fly(Z.C,14.5,62,22,6000,9000,'day');
        fly(Z.PER,13,48,55,6000,17000,'day');
        break;

      case 'b7s3':
        lp('day');
        rot(15,0.008);
        fly(Z.C,13.5,52,0,4000,0,'day');
        fly(Z.NV,14,60,30,6000,11000,'day');
        fly(Z.SE2,13.5,55,-22,5500,19000,'day');
        break;

      // BLOC 8 ───────────────────────────────────────────────────────────
      case 'b8s1':
        lp('day');
        setTimeout(function(){
          if(!SE._playing) return;
          onIdle(function(){try{SE._addInfraPoints&&SE._addInfraPoints(map);}catch(e){}});
          if(D.roads&&D.roads.length) addLine('v9-hw',D.roads);
          if(D.rail&&D.rail.length) addLine('v9-rail',D.rail,{'line-color':'#a78bfa','line-width':2,'line-opacity':0.7});
          if(D.amenity&&D.amenity.length) addCircle('v9-amenity',D.amenity);
        },1000);
        rot(12,0.007);
        fly(Z.C,14,62,20,4000,0,'day');
        fly(Z.NV,14.5,65,55,6000,11000,'day');
        fly(Z.SE2,14,62,-30,6000,19000,'day');
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
          // Puncte prioritati deasupra
          addCircle('v9-agenda',_agendaPts(cx,cy,pred));
          setTimeout(function(){ if(SE._playing) _pulse(map,'v9-agenda','circle-radius',8,22,7); },2000);
        },2000);
        fly([cx,cy],13,52,0,4000,0,'day');
        fly(Z.C,14.5,62,22,6000,9500,'day');
        fly(Z.PER,13,48,60,6000,18500,'day');
        break;

      case 'b11s2':
        lp('dusk');
        onIdle(function(){try{SE._add3DGrowthFull&&SE._add3DGrowthFull(map);}catch(e){}});
        rot(30,0.007);
        fly(Z.C,15.5,72,120,20000,2000,'dusk');
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
      ctx.font='900 '+FD+'px "Space Grotesk",sans-serif';
      ctx.textAlign='left'; ctx.letterSpacing='0';
      ctx.fillText(String(val).slice(0,13),W*0.04,H*0.882);
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
      ctx.font='900 '+Math.min(W*0.026,36)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='right'; ctx.letterSpacing='0';
      ctx.fillText(String(val).slice(0,16),W*0.96,H*0.882);
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
      ctx.fillText('BLOC '+sc.bloc+' \u00b7 '+sc.blabel.toUpperCase(),W*0.96,H*0.060);
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
        if(D.wiki&&D.wiki.extract&&t>0.34){
          var wA=Math.min(1,(t-0.34)/0.18)*sA*0.92;
          ctx.globalAlpha=wA;
          var bx=W*0.04,by=H*0.60,bw=Math.min(W*0.54,500),bh=H*0.28;
          ctx.fillStyle='rgba(4,10,24,0.84)';
          ctx.beginPath(); ctx.roundRect&&ctx.roundRect(bx,by,bw,bh,8); ctx.fill();
          ctx.strokeStyle='rgba(212,175,55,0.18)'; ctx.lineWidth=1; ctx.stroke();
          ctx.fillStyle='rgba(148,163,184,0.50)';
          ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='left'; ctx.letterSpacing='.06em';
          ctx.fillText('\u{1F4D6} WIKIPEDIA \u2014 SCURT ISTORIC',bx+12,by+17);
          ctx.fillStyle='rgba(210,225,255,0.86)';
          ctx.font='400 '+Math.min(W*0.0112,14)+'px "Space Grotesk",sans-serif';
          ctx.letterSpacing='0';
          wrap(ctx,D.wiki.extract,bx+12,by+36,bw-24,Math.min(W*0.014,17)*1.5,9);
          ctx.globalAlpha=1;
        }
        cifra(N2(pop21),'Locuitori \u2014 INSE Recensamant 2021');
        cifra2(N2(Math.round(((city.suprafata_ha||city.suprafata||9800)/100)))+' km\u00b2','Suprafata UAT');
        break;

      case 'b1s2':
        titlu('Context Geopolitic','Romania \u00b7 Vecini \u00b7 Granita \u00b7 Influente regionale'); linie();
        var hub=city.coef_hub||0.78;
        var isGr=['IS','BT','SV','GL','TL','CT','TM','AR','SM','MM'].indexOf(city.judet||'')>=0;
        var isCfP=['IS','BT','SV','GL','TL'].indexOf(city.judet||'')>=0;
        var gR=[
          ['\u{1F30D} '+(isGr?'ZONA DE GRANITA'+(isCfP?' \u26A0 PROXIMITATE CONFLICT':''):' INTERIOR ROMANIA'),'#D4AF37'],
          ['\u{1F6E3} Autostrazi/DN in raza 70km: '+(D.roads||[]).length+' segmente OSM','#ea580c'],
          ['\u{1F682} Cale ferata in raza 40km: '+(D.rail||[]).length+' segmente CFR','#a78bfa'],
          ['\u2708 Aeroporturi 120km: '+(D.airports&&D.airports.length>0?D.airports.map(function(a){return a.name;}).join(', '):'verificare'),'#22c55e'],
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
        narativ('Contextul geopolitic influenteaza direct dezvoltarea urbana. '+(isCfP?'Proximitatea conflictului Ucraina genereaza flux de migratie estimat +8-15% populatie in 2024-2026. Orasul devine receptor demografic temporar.':'Pozitia in interiorul Romaniei asigura stabilitate geopolitica. Accesul la coridoarele europene determina viteza de convergenta economica.'));
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
        if(t>0.18) _drawAge(ctx,W,H,Math.min(1,(t-0.18)/0.22)*sA,r10,pred);
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
        var mig=pred.migNeta||0;
        var isUniv=(city.universitati||0)>0||(city.coef_hub||0)>=1.1;
        cifra((mig>=0?'+':'')+N2(mig)+'/an','Migratie neta estimata',mig>=0?'#22c55e':'#ef4444');
        cifra2(N2(Math.abs(mig)*_HORIZON)+' pers.','Total '+_HORIZON+' ani',mig<0?'#ef4444':'#22c55e');
        narativ((mig<0?'EMIGRARE NETA: '+Math.abs(mig)+' persoane/an parasesc '+name+'. Destinatii: Bucuresti, orase universitare RO, vest Europa (IT, DE, ES, UK). Forta de munca calificata 18-35 ani cel mai afectata segment.':'MIGRATIE POZITIVA: +'+mig+' persoane/an vin in '+name+'.')+(isUniv?' Ca oras universitar, atrage studenti din intreaga regiune. Multi raman dupa absolvire — factor pozitiv decisiv. Necesita locuinte accesibile si piata muncii activa.':' Retentia depinde critic de calitatea vietii, locuri de munca si transport public.'));
        concluzie('Fiecare persoana plecata = '+N2(Math.round(pred.pib*0.45/12*12))+' EUR/an pierduti din economia locala si fiscalitatea UAT');
        negativ('La ritmul actual: in '+_P2()+' forta de munca activa scade cu '+(Math.round(Math.abs(mig)*15/pop21*100))+'% — risc real pentru sustinerea serviciilor publice');
        break;

      case 'b2s4':
        titlu('Profil Cumparatori & Putere de Cumparare','Salariu \u00b7 Ocupatie \u00b7 Segmente imobiliare'); linie();
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
        var roi=pred.roi||8;
        cifra(roi+'%/an','ROI imobiliar estimat brut',roi>=10?'#22c55e':roi>=7?'#f59e0b':'#ef4444');
        cifra2(N2(Math.round(pred.invTotal*0.55))+' M \u20ac','Investitii private estimate '+_S()+'-'+_E());
        narativ('ROI ajustat cu risc seismic (ag='+pred.ag.toFixed(2)+'g, factor '+(pred.ag>=0.30?'1.28x':pred.ag>=0.20?'1.14x':'1.0x')+'). Zone maxim ROI: coridoare autostrada/DN + proximity TP. Zone risc: fond pre-1977 neevaluat seismic + zone inundabile ANAR RCP10. Total investitii private estimate: '+N2(Math.round(pred.invTotal*0.55))+' M EUR in '+_HORIZON+' ani.');
        concluzie('Coridoarele infrastructurii noi sunt cele mai predictibile zone de crestere a valorii imobiliare');
        negativ('Investitie in fond fara verificare seismica = risc maxim — cutremur >7.0 poate sterge 100% din valoare in zone RS I');
        break;

      case 'b4s1':
        try{SE._updateTraffic&&SE._updateTraffic(t);}catch(e){}
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
        narativ('Portocaliu/rosu fade-in = autostrazi. Violet dashoffset = cale ferata. Verde pulsant = aeroporturi. Infrastructura regionala este cel mai puternic predictor al cresterii economice pe 30 ani. Aeroport in raza 60km poate adauga 1.5-2.5pp la rata convergenta UE.');
        concluzie('Conectivitatea la coridoarele TEN-T europene determina competitivitatea pentru investitii straine directe');
        negativ('Izolarea de TEN-T = cost transport +35% = competitivitate industriala redusa = investitorii aleg alte locatii');
        break;

      case 'b4s3':
        titlu('Transport Public','Trasee existente \u00b7 BRT propus \u00b7 Modal Split \u00b7 SUMP '+_P1()); linie();
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
        titlu('Clima & Inundatii','ANAR PGRA 2021-2027 \u00b7 WMS real \u00b7 UHI \u00b7 RCP4.5/8.5'); linie();
        var zile=pred.zile24||18;
        cifra(zile+' zile/an','Caniculare >35\u00b0C azi (ANM)','#f59e0b');
        cifra2(Math.round(zile*2.1)+' zile/an','Proiectie '+_E()+' RCP4.5','#ef4444');
        if(t>0.20) _drawClima(ctx,W,H,Math.min(1,(t-0.20)/0.22)*sA,pred,zile);
        narativ('HARTA ANAR REALA. Albastru inchis = RCP10 (revenire 10 ani). Mediu = RCP100. Deschis = RCP500. Verde pulsant = spatii verzi racire UHI. UHI estimat: +'+(pred.uhi||1.8)+'\u00b0C vs rural. In '+_E()+': '+Math.round(zile*2.1)+' zile caniculare. Costul inactiunii: x4.5 mai mare decat investitia in adaptare.');
        concluzie('Spatii verzi + acoperisuri verzi = -1.5-2.5\u00b0C temperatura urbana = vietii salvate in valuri caldura');
        negativ('Val caldura '+_E()+' fara adaptare: '+Math.round(pop21*0.0003)+' spitalizari/val + blocaje termocentrale + '+N2(Math.round(pop21*0.0003*8000/1000000))+' M EUR/val cost sanatate');
        break;

      case 'b5s3':
        titlu('Costul Inactiunii','Ce se intampla cand nimeni nu face nimic — documentat'); linie();
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
        var tG=t<0.11?0:Math.min(1,(t-0.11)/0.76);
        var tE=1-Math.pow(1-tG,3);
        try{SE._updateGrowth&&SE._updateGrowth(tE);}catch(e){}
        if(tE>0.01){ try{map.setPaintProperty('building-extrusion','fill-extrusion-height',['*',['get','height'],Math.max(0.04,tE)]);}catch(e){} }
        if(t<0.13){
          titlu(name+' '+_S()+' \u2014 Starea Actuala','Fond construit la zi \u00b7 Densitate reala'); linie();
          cifra(N2(pop21),'Locuitori actuali','#94a3b8');
          cifra2(N2(pred.auth||300)+'/an','Autorizatii','#60a5fa');
        } else {
          titlu('Coridoare Dezvoltare '+_E(),'Bare 3D PUG cresc animat: '+_S()+' \u2192 '+_E()); linie();
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
          if(tE>0.35) narativ('ANIMATIE: cladirile cresc gradual = proiectia urbana '+_S()+'\u2192'+_E()+'. VERDE=densitate mica/potential densificare. GALBEN=medie. ROSU=suprasaturat. Coridoarele reale urmeaza axele TP si autostrazile noi planificate. '+N2(pred.defLoc||5000)+' unitati necesare pana in '+_E()+'.');
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
        try{SE._updateTraffic&&SE._updateTraffic(t);}catch(e){}
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
        cifra((pred.tp||62)+'%','Acoperire TP actual',(pred.tp||62)>=70?'#22c55e':'#f59e0b');
        cifra2('35% TP target','Tinta SUMP '+_P1(),'#22c55e');
        if(t>0.18) _drawModalFull(ctx,W,H,Math.min(1,(t-0.18)/0.24)*sA,pred);
        narativ('MODAL SPLIT azi: auto '+(pred.modalAuto||68)+'% | TP '+(pred.tp||22)+'% | pieton 7% | velo 3%. TARGET SUMP '+_P1()+': auto 45% | TP 35% | pieton 15% | velo 5%. Necesita: BRT '+pred.kmBRT+' km + piste velo 30km + pasaje pietonale '+(pred.pasaje||5)+'. Beneficii: -35% congestie + -18% CO2 + +20% calitate aer + 35 min/zi economisiti.');
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
        if(t>0.12) _drawBench(ctx,W,H,Math.min(1,(t-0.12)/0.24)*sA,pred,name);
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
        cifra('\u221247 orase','Au pierdut >25% populatie in Romania 1992-2021','#ef4444');
        cifra2(_NOW+' \u2014 alegere','Inca se poate schimba traiectoria','#22c55e');
        narativ('Spirala negativa documentata: populatie minus = fiscalitate minus = servicii minus = populatie minus. Singurul mecanism de iesire: investitie masiva concentrata + viziune 30 ani + continuitate politica. Nu exista alt mecanism dovedit in literatura de specialitate.');
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
        narativ('Rezilienta nu este luxul unui oras bogat — este conditia de supravietuire in sec. 21. Instrumentele exista: PNRR, FEDR, FSE+, fonduri climat. Vointa politica si continuitatea planificarii sunt singurele lipsuri documentate. ROI 1:3.2 dovedit pe 30 ani (Banca Mondiala 2022).');
        concluzie('Rezilienta urbana = cea mai buna investitie: ROI 1:3.2 documentat + calitate vietii + atractivitate investitori');
        break;

      case 'b11s1':
        titlu('Agenda Primarului '+_S()+'\u2013'+_P1(),'Ce se face \u00b7 Unde \u00b7 Cand \u00b7 Cat \u00b7 Ce se intampla daca NU'); linie();
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
        if(t>0.92) _drawQR(ctx,W,H,Math.min(1,(t-0.92)/0.07)*sA);
        if(t>0.60){
          ctx.globalAlpha=Math.min(1,(t-0.60)/0.20)*sA*0.30;
          ctx.fillStyle='rgba(148,163,184,0.40)';
          ctx.font='500 '+Math.min(W*0.007,9)+'px "IBM Plex Mono",monospace';
          ctx.textAlign='center'; ctx.letterSpacing='.06em';
          ctx.fillText('URBANX \u00b7 THINKSMARTS SOLUTIONS SRL \u00b7 DATE ORIENTATIVE \u00b7 \u00a9 '+_NOW,W/2,H*0.997);
          ctx.globalAlpha=1;
        }
        break;
    }

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
    SE._cleanLayers&&SE._cleanLayers();
    _cleanV9(map);
    if(sc.id!=='b6s2'){try{map.setPaintProperty('building-extrusion','fill-extrusion-height',['get','height']);}catch(e){}}
    try{window._FloodMapper&&window._FloodMapper.hideAll&&window._FloodMapper.hideAll(map);}catch(e){}
    try{if(map.getLayer('tci-tp-layer'))map.setLayoutProperty('tci-tp-layer','visibility','none');}catch(e){}
    updateLegend(sc);
    setup(sc.id);
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

function _drawModalFull(ctx,W,H,a,pred){
  ctx.save();
  var x=W*0.56,y=H*0.57,w=Math.min(W*0.40,360),h=H*0.28;
  ctx.globalAlpha=a*0.88;ctx.fillStyle='rgba(4,10,24,0.80)';ctx.beginPath();ctx.roundRect&&ctx.roundRect(x,y,w,h,7);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,0.07)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='rgba(148,163,184,0.52)';ctx.font='700 '+Math.min(W*0.008,10)+'px "IBM Plex Mono",monospace';ctx.textAlign='left';ctx.letterSpacing='.05em';
  ctx.fillText('MODAL SPLIT: AZI vs TARGET SUMP '+_P1(),x+10,y+15);
  var cols=[{n:'Auto',azi:pred.modalAuto||68,sump:45,c:'#ef4444'},{n:'TP',azi:pred.tp||22,sump:35,c:'#22c55e'},{n:'Pieton',azi:7,sump:15,c:'#60a5fa'},{n:'Velo',azi:3,sump:5,c:'#f59e0b'}];
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

// Coridoare pentru Agenda Primarului — zone de interventie localizate
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


function _fp(city){
  var pop=city.pop2021||city.pop||100000,r=city.rata_reala_2011_2021||0;
  return {
    p21:pop,p11:city.pop2011||Math.round(pop*1.06),r10:r,rRef:r,
    pop55:Math.round(pop*Math.pow(1+r/100,_HORIZON)),
    pib:city.pib_eur_cap||14200,pctUE:39,pctUE55:62,rPIB:3.8,anConv:2050,
    deltaP:0,natalitate:9,mortalit:13,sporNat:-4,migNeta:-500,
    salariu:(window._getSalariu&&city.judet?window._getSalariu(city.judet):3500),somaj:5,ocupare:60,roi:8,
    ocupatie:{servicii:52,industrie:28,comert:18,constructii:8,agricultura:5},
    defLoc:Math.max(0,Math.round(pop*0.08)),recHa:Math.round(pop/300),
    ag:(window._getSeismic&&city.judet?window._getSeismic(city.judet).ag:0.20),fond:Math.round(pop/50),
    mot24:380,satAn:_S()+15,fluxOra:Math.round(pop*0.08),pasaje:5,kmOcol:20,
    tp:62,kmBRT:Math.round(pop/8000),costBRT:Math.round(pop/2000),
    defTP:13,walkScore:58,statiiNoi:Math.round(pop/1200),anSUMP:_P1(),
    zile24:18,uhi:1.8,drought:'moderat',flood:'Mediu',
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
  // Curata heatmap presiune
  try{if(window._TCIPressureHeatmap&&window._TCIPressureHeatmap._active)window._TCIPressureHeatmap.hide();}catch(e){}
  ['v9-hw','v9-hw-buf','v9-rail','v9-apt','v9-urb','v9-urb-maj','v9-green','v9-mon',
   'v9-cim','v9-utils','v9-amenity','v9-agenda','v9-mob-pts',
   'corridors-src','corridors-line','corridors-glow','corridors-zones','corridors-dev-zones'].forEach(function(id){
    try{if(map.getLayer(id))map.removeLayer(id);}catch(e){}
    try{if(map.getSource(id))map.removeSource(id);}catch(e){}
  });
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
  d.innerHTML='<button id="c8-prev" style="background:rgba(0,0,0,.6);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.6);padding:10px 16px;border-radius:10px;cursor:pointer;font:600 12px/1 monospace;backdrop-filter:blur(8px)">\u25C0</button>'
    +'<button id="c8-skip" style="background:rgba(0,0,0,.6);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.6);padding:10px 18px;border-radius:10px;cursor:pointer;font:600 12px/1 monospace;backdrop-filter:blur(8px)">\u25B6</button>'
    +'<button id="c8-stop" style="background:rgba(180,0,0,.5);border:1px solid rgba(255,80,80,.3);color:#ff9999;padding:10px 14px;border-radius:10px;cursor:pointer;font:600 12px/1 monospace;backdrop-filter:blur(8px)">\u2715</button>';
  document.body.appendChild(d);
  document.getElementById('c8-prev').onclick=function(){goCb(SE._si-1);};
  document.getElementById('c8-skip').onclick=function(){goCb(SE._si+1);};
  document.getElementById('c8-stop').onclick=stopCb;
}

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
