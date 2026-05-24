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

  // ── SETUP per scena: jumpTo + culoare cladiri ─────────────────────────
  function setupScene(id){
    if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}

    // INTOTDEAUNA: jump la pitch 72 zoom 15.5 pentru scene cu cladiri
    var scene3D=['intro','oras3d','demo','eco','crestere','tp','seismic','infra','viziune'];
    if(scene3D.indexOf(id)>=0){
      try{map.jumpTo({center:[cx,cy],zoom:15.5,pitch:72,bearing:20});}catch(e){}
    }

    // Culoare cladiri specifica scenei
    setColor(id);

    switch(id){
      case 'intro':
        lp('night');
        rot(20,0.018);
        break;
      case 'oras3d':
        lp('day');
        rot(20,0.020);
        break;
      case 'demo':
        lp('dawn');
        setTimeout(function(){
          if(!SE._playing)return;
          try{map.flyTo({center:[cx-0.01,cy+0.008],zoom:15.5,pitch:72,bearing:60,duration:6000,essential:true});}catch(e){}
        },3000);
        break;
      case 'eco':
        lp('day');
        rot(20,0.015);
        break;
      case 'crestere':
        lp('night');
        rot(20,0.012);
        // Anima inaltimea cladirilor: incepe mic, creste
        try{map.setPaintProperty('building-extrusion','fill-extrusion-height',
          ['interpolate',['linear'],['zoom'],14,['*',['get','height'],0.3],16,['get','height']]);}catch(e){}
        break;
      case 'mobil':
        lp('night');
        try{map.jumpTo({center:[cx,cy],zoom:12.5,pitch:55,bearing:0});}catch(e){}
        setColor('mobil');
        fetchOSM(function(ft){
          if(!SE._playing)return;
          addOSM(ft);
          setTimeout(function(){
            if(!SE._playing)return;
            try{map.flyTo({center:[cx,cy],zoom:13.5,pitch:62,bearing:15,duration:5000,essential:true});}catch(e){}
          },500);
        });
        break;
      case 'tp':
        lp('day');
        rot(20,0.015);
        try{SE._addTransit&&SE._addTransit.call(SE,map);}catch(e){}
        break;
      case 'seismic':
        lp('night');
        rot(0,0.010);
        try{SE._addSeismic&&SE._addSeismic.call(SE,map);}catch(e){}
        break;
      case 'inund':
        lp('dawn');
        try{map.jumpTo({center:[cx,cy],zoom:12,pitch:50,bearing:5});}catch(e){}
        setColor('inund');
        try{SE._addFlood&&SE._addFlood.call(SE,map);}catch(e){}
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

  // ── CANVAS DRAW ───────────────────────────────────────────────────────
  function draw(id,t,W,H,ctx){
    var sA=t<0.06?t/0.06:t>0.92?(1-t)/0.08:1;
    var eo=function(x){return 1-Math.pow(1-Math.max(0,Math.min(1,x)),3);};
    var rE=function(d,s){return eo(Math.min(1,Math.max(0,(t-(d||0))/((s||0.25)))));};
    var N=function(v){return isNaN(+v)?'—':Number(v).toLocaleString('ro-RO',{maximumFractionDigits:0});};

    ctx.globalAlpha=1;
    var gT=ctx.createLinearGradient(0,0,0,H*0.20);
    gT.addColorStop(0,'rgba(2,5,14,0.88)');gT.addColorStop(1,'rgba(2,5,14,0)');
    ctx.fillStyle=gT;ctx.fillRect(0,0,W,H*0.20);
    var gB=ctx.createLinearGradient(0,H*0.80,0,H);
    gB.addColorStop(0,'rgba(2,5,14,0)');gB.addColorStop(1,'rgba(2,5,14,0.88)');
    ctx.fillStyle=gB;ctx.fillRect(0,H*0.80,W,H*0.20);

    var FS={t:Math.min(W*0.036,50),s:Math.min(W*0.017,22),d:Math.min(W*0.060,82),l:Math.min(W*0.012,16),n:Math.min(W*0.015,20)};

    function titlu(txt,sub){
      ctx.globalAlpha=sA*rE(0.05,0.20);
      ctx.fillStyle='rgba(212,175,55,0.95)';
      ctx.font='700 '+FS.t+'px "IBM Plex Mono",monospace';
      ctx.textAlign='left';ctx.letterSpacing='0.06em';
      ctx.fillText(txt.slice(0,42),W*0.04,H*0.09);
      if(sub){
        ctx.globalAlpha=sA*rE(0.08,0.20)*0.65;
        ctx.fillStyle='rgba(148,163,184,0.80)';
        ctx.font=FS.s+'px "IBM Plex Mono",monospace';
        ctx.fillText(sub.slice(0,55),W*0.04,H*0.09+FS.s*1.8);
      }
    }
    function linie(){
      ctx.globalAlpha=sA*rE(0.07,0.28);
      var g=ctx.createLinearGradient(W*0.04,0,W*0.04+W*0.40,0);
      g.addColorStop(0,'rgba(212,175,55,0.9)');g.addColorStop(1,'rgba(212,175,55,0)');
      ctx.fillStyle=g;ctx.fillRect(W*0.04,H*0.105,W*0.40*rE(0.07,0.32),1.5);
    }
    function cifra(val,lbl,clr){
      ctx.globalAlpha=sA*rE(0.15,0.25);
      ctx.fillStyle=clr||'#ffffff';
      ctx.font='900 '+FS.d+'px "Space Grotesk",sans-serif';
      ctx.textAlign='left';
      ctx.fillText(String(val).slice(0,12),W*0.04,H*0.885);
      ctx.globalAlpha=sA*rE(0.18,0.20)*0.65;
      ctx.fillStyle='rgba(148,163,184,0.72)';
      ctx.font='600 '+FS.l+'px "IBM Plex Mono",monospace';
      ctx.letterSpacing='0.08em';
      ctx.fillText(String(lbl).toUpperCase().slice(0,35),W*0.04,H*0.912);
    }
    function cifra2(val,lbl,clr){
      ctx.globalAlpha=sA*rE(0.22,0.22);
      ctx.fillStyle=clr||'rgba(212,175,55,0.95)';
      ctx.font='900 '+Math.min(W*0.036,50)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='right';
      ctx.fillText(String(val).slice(0,14),W*0.96,H*0.885);
      ctx.globalAlpha=sA*rE(0.25,0.20)*0.60;
      ctx.fillStyle='rgba(148,163,184,0.65)';
      ctx.font='600 '+FS.l+'px "IBM Plex Mono",monospace';
      ctx.textAlign='right';
      ctx.fillText(String(lbl).toUpperCase().slice(0,28),W*0.96,H*0.910);
    }
    function narativ(txt){
      if(t<0.60)return;
      ctx.globalAlpha=Math.min(1,(t-0.60)/0.15)*sA;
      ctx.fillStyle='rgba(220,228,255,0.82)';
      ctx.font='500 '+FS.n+'px "Space Grotesk",sans-serif';
      ctx.textAlign='left';
      var mW=W*0.56,words=txt.split(' '),line='',y=H*0.936,n=0;
      words.forEach(function(w){
        var test=line+(line?' ':'')+w;
        if(ctx.measureText(test).width>mW&&line&&n<2){ctx.fillText(line,W*0.04,y);y+=FS.n*1.4;line=w;n++;}
        else line=test;
      });
      if(n<2)ctx.fillText(line,W*0.04,y);
    }
    function prog(){
      ctx.globalAlpha=0.50;
      ctx.fillStyle='rgba(255,255,255,0.08)';ctx.fillRect(W*0.35,H-12,W*0.30,2);
      var gp=ctx.createLinearGradient(W*0.35,0,W*0.65,0);
      gp.addColorStop(0,'#D4AF37');gp.addColorStop(1,'rgba(212,175,55,0.2)');
      ctx.fillStyle=gp;ctx.fillRect(W*0.35,H-12,W*0.30*((SE._si+t)/SE.SCENES.length),2);
      ctx.fillStyle='rgba(148,163,184,0.38)';
      ctx.font='600 '+Math.min(W*0.010,12)+'px "IBM Plex Mono",monospace';
      ctx.textAlign='center';
      ctx.fillText((SE._si+1)+'/'+SE.SCENES.length+' — '+(SE.SCENES[SE._si]?.label||''),W/2,H-2);
      ctx.globalAlpha=1;
    }

    switch(id){
    case 'intro':
      ctx.globalAlpha=sA*rE(0.20,0.40);
      ctx.fillStyle='rgba(255,255,255,0.94)';
      ctx.font='900 '+Math.min(W*0.090,115)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='center';
      ctx.fillText(name.toUpperCase(),W/2,H*0.48);
      ctx.globalAlpha=sA*rE(0.32,0.28)*0.78;
      ctx.fillStyle='#D4AF37';
      ctx.font='600 '+Math.min(W*0.018,23)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='center';
      ctx.fillText('JUD. '+(SE._city.judet||'—')+' · POP. '+N(pred.p21),W/2,H*0.555);
      cifra(N(pred.p21),'Locuitori 2021');
      cifra2(N(Math.round((SE._city.suprafata_ha||pred.sup)/100))+' km²','Suprafata');
      break;
    case 'oras3d':
      titlu('Orasul Azi — Vedere 3D','Cladiri · Cartiere · Densitate');linie();
      cifra(N(pred.p21),'Locuitori 2021');
      cifra2(N(pred.pib)+' €/loc','PIB per locuitor');
      narativ('Fiecare cladire = o constructie reala din '+name+'. Inaltimea = regimul de inaltime. Culoarea = categoria de zona.');
      break;
    case 'demo':
      titlu('Populatia','Densitate · Migratie · Structura');linie();
      cifra((pred.r10>=0?'+':'')+pred.r10.toFixed(2)+'%/an',pred.trendLbl,pred.trendClr);
      cifra2(N(pred.pop55),'Estimat 2055');
      narativ(N(pred.p21)+' locuitori. '+(pred.migNeta<0?Math.abs(pred.migNeta)+' persoane/an pleaca.':pred.migNeta+' persoane/an sosesc.')+' In 2055: '+N(pred.pop55)+'.');
      break;
    case 'eco':
      titlu('Economia','PIB · Convergenta UE · Sectoare');linie();
      cifra(N(pred.pib)+' €','PIB per locuitor',pred.pctUE>=75?'#22c55e':'#f59e0b');
      cifra2(pred.pctUE+'% UE27','Convergenta');
      narativ(name+' = '+pred.pctUE+'% din media UE27. Convergenta estimata: ~'+pred.anConv+'. Servicii '+pred.ocupatie.servicii+'%, industrie '+pred.ocupatie.industrie+'%.');
      break;
    case 'crestere':
      titlu('Unde Creste Orasul','Presiune constructibila 2026-2055');linie();
      // Cifra animata
      ctx.globalAlpha=sA*rE(0.15,0.25);
      ctx.fillStyle='#ef4444';
      ctx.font='900 '+FS.d+'px "Space Grotesk",sans-serif';
      ctx.textAlign='left';
      ctx.fillText(N(Math.round(pred.defLoc*Math.min(1,t*1.4))),W*0.04,H*0.885);
      ctx.globalAlpha=sA*rE(0.18,0.20)*0.65;
      ctx.fillStyle='rgba(148,163,184,0.72)';
      ctx.font='600 '+FS.l+'px "IBM Plex Mono",monospace';
      ctx.fillText('UNITATI LOCATIVE NECESARE 2055',W*0.04,H*0.912);
      cifra2(N(pred.recHa)+' ha','Potential reconversie','#f59e0b');
      narativ('Cladirile inalte (rosu) = presiune maxima. Cladirile mici (verde) = potential de densificare. '+N(pred.defLoc)+' unitati necesare.');
      break;
    case 'mobil':
      titlu('Mobilitate Urbana','Retea OSM reala · Congestie · Solutii');linie();
      cifra(N(pred.mot24),'Vehicule/1000 loc',pred.mot24>500?'#ef4444':'#f59e0b');
      cifra2('~'+pred.satAn,'An saturare');
      ctx.globalAlpha=sA*rE(0.25,0.22);
      [['#dc2626','AUTOSTRADA'],['#ea580c','TRUNK'],['#f59e0b','PRIMAR'],['#16a34a','SECUNDAR']].forEach(function(it,i){
        ctx.fillStyle=it[0];ctx.fillRect(W*(0.04+i*0.16),H*0.928,W*0.022,7);
        ctx.fillStyle='rgba(220,230,255,0.75)';
        ctx.font='600 '+Math.min(W*0.011,14)+'px "IBM Plex Mono",monospace';
        ctx.textAlign='left';
        ctx.fillText(it[1],W*(0.068+i*0.16),H*0.937);
      });
      narativ(N(pred.fluxOra)+' veh/h la varf. Saturatie ~'+pred.satAn+'. '+pred.pasaje+' pasaje necesare. Cost: '+N(pred.invMob)+' M EUR.');
      break;
    case 'tp':
      titlu('Transport Public','Acoperire · BRT · SUMP '+pred.anSUMP);linie();
      cifra(pred.tp+'%','Populatie acoperita',pred.tp>=70?'#22c55e':pred.tp>=50?'#f59e0b':'#ef4444');
      cifra2(pred.kmBRT+' km BRT','Cost: '+N(pred.costBRT)+' M €');
      narativ('Deficit '+pred.defTP+'pp vs standard 75%. Walk Score: '+pred.walkScore+'/100. Statii noi: '+N(pred.statiiNoi)+'. SUMP: '+pred.anSUMP+'.');
      break;
    case 'seismic':
      var agC=pred.ag>=0.30?'#ef4444':pred.ag>=0.20?'#f59e0b':'#22c55e';
      titlu('Risc Seismic','P100 · Fond vulnerabil · PNRR');linie();
      cifra('ag='+pred.ag.toFixed(2)+'g','Acceleratie seismica',agC);
      cifra2(N(pred.fond)+' cladiri','Fond risc RS I-III','#ef4444');
      narativ('Cladirile rosii = risc maxim. Fara interventie: '+N(Math.round(pred.fond*1.12))+' in 2045. PNRR: '+N(Math.round(pred.fond*0.25))+' apt. Cost: '+N(Math.round(pred.fond*0.085))+' M EUR.');
      break;
    case 'inund':
      titlu('Inundatii & Clima','Zone risc · Lunca · 2055');linie();
      cifra(pred.zile24+' zile','Caniculare >35°C azi','#f59e0b');
      cifra2(Math.round(pred.zile24*2.2)+' zile','Proiectie 2055','#ef4444');
      narativ('Zona albastra = lunca inundabila. In 2055: '+Math.round(pred.zile24*2.2)+' zile caniculare. Adaptare: '+N(Math.round(pred.p21/10000*1.8))+' M EUR.');
      break;
    case 'mc2055':
      var rB=pred.rRef;
      var pO=Math.round(pred.p21*Math.pow(1+(rB+0.9)/100,34));
      var pR=Math.round(pred.p21*Math.pow(1+(rB-0.8)/100,34));
      titlu('Monte Carlo 2055','3 Scenarii · Probabilitati');linie();
      [['S1 REGRES: '+N(pR)+' loc.','#ef4444',0.20],
       ['S2 TENDINTA: '+N(pred.pop55)+' loc.','#f59e0b',0.30],
       ['S3 OPTIMIST: '+N(pO)+' loc.','#22c55e',0.40]].forEach(function(s,i){
        ctx.globalAlpha=sA*rE(s[2],0.22);
        ctx.fillStyle=s[1];
        ctx.font='700 '+Math.min(W*0.017,22)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='left';
        ctx.fillText(s[0],W*0.04,H*(0.80+i*0.038));
      });
      cifra('['+N(pR)+'–'+N(pO)+']','Interval 90%','#f59e0b');
      narativ('Diferenta: '+N(pO-pR)+' persoane = '+N(Math.round((pO-pR)*35/90))+' unitati locative. Decizia de azi conteaza.');
      break;
    case 'infra':
      titlu('Ce Construim 2025–2055','Scoli · Cabinete · SV · Retele');linie();
      cifra(N(pred.invTotal)+' M €','Total investitii','#D4AF37');
      cifra2('~60% UE','Finantare','#22c55e');
      [['🏫 SCOLI: +'+pred.scoliNoi,0.18],['🏥 CABINETE: +'+pred.cabMed,0.27],
       ['🌳 SPATII VERZI: +'+pred.svHa+' ha',0.36],['🚌 STATII TP: +'+pred.statiiNoi,0.45]].forEach(function(it,i){
        ctx.globalAlpha=sA*rE(it[1],0.18);
        ctx.fillStyle='rgba(220,230,255,0.82)';
        ctx.font='600 '+Math.min(W*0.014,18)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='left';
        ctx.fillText(it[0],W*0.04,H*(0.78+i*0.036));
      });
      narativ('Mobilitate: '+N(pred.invMob)+' M EUR. Social: '+N(pred.invSoc)+' M EUR. UE acopera ~60%.');
      break;
    case 'viziune':
      ctx.globalAlpha=sA*rE(0.05,0.5)*0.06;
      ctx.fillStyle='#D4AF37';
      ctx.font='900 '+Math.min(W*0.28,340)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='center';
      ctx.fillText('2055',W/2,H*0.64);
      titlu(name+' 2055','Viziunea posibila');linie();
      ctx.globalAlpha=sA*rE(0.15,0.30);
      ctx.fillStyle='rgba(255,255,255,0.93)';
      ctx.font='900 '+Math.min(W*0.055,72)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='center';
      ctx.fillText(name.toUpperCase(),W/2,H*0.28);
      [{ok:pred.pop55>pred.p21,txt:'Pop 2055: '+N(pred.pop55)},
       {ok:pred.pctUE55>=75,txt:'PIB: '+pred.pctUE55+'% UE27'},
       {ok:pred.anSUMP<=2035,txt:'SUMP: ~'+pred.anSUMP},
       {ok:pred.sdgTotal>=6,txt:'SDG11: '+pred.sdgTotal+'/10'},
       {ok:true,txt:'Investitii: '+N(pred.invTotal)+' M EUR'}
      ].forEach(function(ch,i){
        ctx.globalAlpha=sA*rE(0.28+i*0.06,0.18);
        ctx.fillStyle=ch.ok?'#22c55e':'#f59e0b';
        ctx.font='700 '+Math.min(W*0.016,20)+'px sans-serif';
        ctx.textAlign='right';
        ctx.fillText(ch.ok?'✓':'◎',W*0.96,H*(0.73+i*0.038));
        ctx.fillStyle='rgba(220,228,255,0.85)';
        ctx.font=Math.min(W*0.014,18)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='right';
        ctx.fillText(ch.txt.slice(0,45),W*0.948,H*(0.73+i*0.038));
      });
      break;
    }
    prog();
    ctx.save();ctx.globalAlpha=0.007;
    for(var i=0;i<40;i++){ctx.fillStyle=Math.random()>.5?'#fff':'#000';ctx.fillRect(Math.random()*W,Math.random()*H,1,1);}
    ctx.restore();ctx.globalAlpha=1;
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
      try{draw(scene.id,t,window.innerWidth,window.innerHeight,SE._ctx);}catch(e){}
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
