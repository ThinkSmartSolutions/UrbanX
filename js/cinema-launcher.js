// cinema-launcher.js — UrbanX Cinema Launcher v3.0
// 20 scene. Pitch 65-72 pe toate. Harta 3D animata e actorul.
// Text: scurt, vizibil, in ecran. Harta: zoom aproape pe cartiere.
(function(){
'use strict';

// ── SCENE EXTINSE — 20 scene ──────────────────────────────────────────────
var SCENES_EXT = [
  {id:'s1',  dur:14000, label:'IDENTITATE'},
  {id:'s2',  dur:16000, label:'ROMANIA — ZOOM SPRE ORAS'},
  {id:'s3',  dur:18000, label:'ORASUL AZI — 3D'},
  {id:'s4',  dur:16000, label:'POPULATIA'},
  {id:'s5',  dur:16000, label:'MIGRATIE & TENDINTE'},
  {id:'s6',  dur:18000, label:'ECONOMIA'},
  {id:'s7',  dur:22000, label:'UNDE CRESTE ORASUL — BARE 3D'},
  {id:'s8',  dur:20000, label:'MOBILITATE — RETEA RUTIERA'},
  {id:'s9',  dur:18000, label:'CONGESTIONARE & SOLUTII'},
  {id:'s10', dur:18000, label:'TRANSPORT PUBLIC'},
  {id:'s11', dur:16000, label:'RISC SEISMIC'},
  {id:'s12', dur:16000, label:'CLADIRI VULNERABILE'},
  {id:'s13', dur:18000, label:'INUNDATII — ZONE DE RISC'},
  {id:'s14', dur:16000, label:'CLIMA 2055'},
  {id:'s15', dur:18000, label:'SPATII VERZI & SDG11'},
  {id:'s16', dur:18000, label:'PROIECTIE 2055 — 3 SCENARII'},
  {id:'s17', dur:16000, label:'INVESTITII NECESARE'},
  {id:'s18', dur:16000, label:'AGENDA PRIMARULUI'},
  {id:'s19', dur:20000, label:'VIZIUNEA 2055 — BARE 3D MAX'},
  {id:'s20', dur:14000, label:'CONCLUZIE'},
];

window._startCinema = function(cityKey) {
  cityKey = cityKey || window.TCI?.cityKey || localStorage.getItem('ux_last_city') || 'RO-IS-01';
  var SE = window._CinemaEngine;
  if (!SE) { console.error('[Cinema] lipsa _CinemaEngine'); return; }
  var map = window.map;
  if (!map) { console.error('[Cinema] lipsa map'); return; }

  // Override SCENES cu lista extinsa
  SE.SCENES = SCENES_EXT;

  SE._playing = false;
  if (SE._raf) cancelAnimationFrame(SE._raf);
  if (SE._rotInt) { clearInterval(SE._rotInt); SE._rotInt = null; }
  try{SE._cleanLayers.call(SE);}catch(e){}
  try{if(map.getLayer('v8-osm-l'))map.removeLayer('v8-osm-l');}catch(e){}
  try{if(map.getSource('v8-osm'))map.removeSource('v8-osm');}catch(e){}

  // Ascunde UI
  var hidden = [];
  ['#panel','#panel-tabs','#panel-body','#topbar','#mob-sheet','#utr-drawer',
   '#info-drawer','#ux-gdpr-footer','.mapboxgl-ctrl-bottom-left',
   '.mapboxgl-ctrl-bottom-right','nav','#tci-adv-menu'].forEach(function(sel){
    document.querySelectorAll(sel).forEach(function(el){
      if(!el._cs)el._cs=el.style.cssText;
      el.style.setProperty('display','none','important');
      hidden.push(el);
    });
  });

  // Canvas
  document.querySelectorAll('#tci-c8,#tci-c6,#tci-c7').forEach(function(e){e.remove();});
  var c = document.createElement('canvas');
  c.id='tci-c8'; c.width=window.innerWidth; c.height=window.innerHeight;
  c.style.cssText='position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:999999;pointer-events:none;';
  document.body.appendChild(c);

  SE._map=map;
  SE._city=(window._RO_CITIES_DB||{})[cityKey]||Object.values(window._RO_CITIES_DB||{})[0];
  SE._pred=window._PredEngine.calc(SE._city);
  SE._canvas=c; SE._ctx=c.getContext('2d');
  SE._playing=true; SE._si=0; SE._gf=null;

  var cx=SE._city.lon||27.601, cy=SE._city.lat||47.158;
  var name=SE._city.name||'UAT';
  var pred=SE._pred;

  // ── BUTOANE ──────────────────────────────────────────────────────────
  document.getElementById('tci-c8-ctrl')?.remove();
  var ctrl=document.createElement('div');
  ctrl.id='tci-c8-ctrl';
  ctrl.style.cssText='position:fixed;bottom:28px;right:20px;z-index:1000000;display:flex;gap:8px;';
  ctrl.innerHTML='<button id="c8p" style="background:rgba(0,0,0,.75);border:1px solid rgba(255,255,255,.2);color:#fff;padding:10px 18px;border-radius:10px;cursor:pointer;font:700 13px monospace">◀</button>'
    +'<button id="c8n" style="background:rgba(0,0,0,.75);border:1px solid rgba(255,255,255,.2);color:#fff;padding:10px 18px;border-radius:10px;cursor:pointer;font:700 13px monospace">▶</button>'
    +'<button id="c8s" style="background:rgba(160,0,0,.75);border:1px solid rgba(255,80,80,.3);color:#ffaaaa;padding:10px 14px;border-radius:10px;cursor:pointer;font:700 13px monospace">✕</button>';
  document.body.appendChild(ctrl);

  function stopAll(){
    SE._playing=false;
    if(SE._raf)cancelAnimationFrame(SE._raf);
    if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
    try{SE._cleanLayers.call(SE);}catch(e){}
    try{if(map.getLayer('v8-osm-l'))map.removeLayer('v8-osm-l');}catch(e){}
    try{if(map.getSource('v8-osm'))map.removeSource('v8-osm');}catch(e){}
    document.getElementById('tci-c8')?.remove();
    document.getElementById('tci-c8-ctrl')?.remove();
    hidden.forEach(function(el){el.style.cssText=el._cs||'';delete el._cs;});
    try{map.flyTo({center:[cx,cy],zoom:13,pitch:0,bearing:0,duration:1500,essential:true});}catch(e){}
    try{map.setConfigProperty('basemap','lightPreset','day');}catch(e){}
  }

  function jumpScene(i){
    if(i<0||i>=SE.SCENES.length)return;
    SE._playing=false;
    if(SE._raf)cancelAnimationFrame(SE._raf);
    if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
    try{SE._cleanLayers.call(SE);}catch(e){}
    try{if(map.getLayer('v8-osm-l'))map.removeLayer('v8-osm-l');}catch(e){}
    try{if(map.getSource('v8-osm'))map.removeSource('v8-osm');}catch(e){}
    SE._playing=true;
    runScene(i);
  }

  document.getElementById('c8s').onclick=stopAll;
  document.getElementById('c8n').onclick=function(){jumpScene(SE._si+1);};
  document.getElementById('c8p').onclick=function(){jumpScene(SE._si-1);};

  // ── HELPER CAMERA ────────────────────────────────────────────────────
  function lp(p){try{map.setConfigProperty('basemap','lightPreset',p);}catch(e){}}
  function fly(z,pitch,bearing,dur,center){
    try{map.flyTo({center:center||[cx,cy],zoom:z,pitch:pitch,bearing:bearing,duration:dur||4000,essential:true});}catch(e){}
  }
  function jump(z,pitch,bearing){
    try{map.jumpTo({center:[cx,cy],zoom:z,pitch:pitch,bearing:bearing});}catch(e){}
  }
  function rot(b0,spd){
    if(SE._rotInt)clearInterval(SE._rotInt);
    var b=b0;
    SE._rotInt=setInterval(function(){
      if(!SE._playing){clearInterval(SE._rotInt);SE._rotInt=null;return;}
      b+=spd;try{map.setBearing(b%360);}catch(e){}
    },50);
  }

  // ── OSM ROADS fetch ──────────────────────────────────────────────────
  function fetchOSMRoads(callback){
    var q='[out:json][timeout:25];(way["highway"~"motorway|trunk|primary|secondary|tertiary"](around:7000,'+cy+','+cx+'););out geom;';
    fetch('https://urbanx-proxy.3dtravelsoftart.workers.dev/osm?q='+encodeURIComponent(q))
      .then(function(r){return r.json();})
      .then(function(d){
        var ft=[];
        (d.elements||[]).forEach(function(el){
          if(el.type!=='way'||!el.geometry)return;
          var coords=el.geometry.map(function(n){return[n.lon,n.lat];});
          var hw=(el.tags&&el.tags.highway)||'tertiary';
          var col,w;
          if(hw==='motorway'||hw==='trunk'){col='#dc2626';w=9;}
          else if(hw==='primary'){col='#ea580c';w=6;}
          else if(hw==='secondary'){col='#d97706';w=4;}
          else{col='#16a34a';w=2;}
          ft.push({type:'Feature',geometry:{type:'LineString',coordinates:coords},properties:{c:col,w:w,hw:hw}});
        });
        if(callback)callback(ft);
      }).catch(function(){if(callback)callback([]);});
  }

  function addOSMLayer(features){
    if(!features||!features.length)return;
    try{
      if(map.getLayer('v8-osm-l'))map.removeLayer('v8-osm-l');
      if(map.getSource('v8-osm'))map.removeSource('v8-osm');
      map.addSource('v8-osm',{type:'geojson',data:{type:'FeatureCollection',features:features}});
      map.addLayer({id:'v8-osm-l',type:'line',source:'v8-osm',
        paint:{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0.92,'line-blur':0.3},
        layout:{'line-cap':'round','line-join':'round'}
      });
      console.log('[Cinema] OSM',features.length,'artere adaugate');
    }catch(e){console.warn('[Cinema] OSM layer err:',e.message);}
  }

  // ── SETUP CAMERA + LAYERS per scena ──────────────────────────────────
  function setupScene(id){
    switch(id){
      case 's1': // Identitate — noapte, zoom in dramatic
        jump(7,0,0); lp('night');
        setTimeout(function(){fly(14,62,20,8000);},300);
        break;

      case 's2': // Romania → Oras — zoom din context national
        jump(6,0,0); lp('dusk');
        setTimeout(function(){fly(9,30,0,3000);},200);
        setTimeout(function(){fly(13,55,10,4000);},3500);
        break;

      case 's3': // Orasul azi — orbita 3D pe cladiri reale
        jump(13,55,0); lp('day');
        setTimeout(function(){fly(15.5,72,30,6000);},300);
        setTimeout(function(){rot(30,0.020);},1500);
        break;

      case 's4': // Populatia — heatmap densitate, zbor pe zone dense
        jump(12,45,0); lp('dawn');
        try{SE._addDensityHeat&&SE._addDensityHeat.call(SE,map);}catch(e){}
        setTimeout(function(){fly(13.5,58,-15,4000);},300);
        break;

      case 's5': // Migratie — zoom pe zone de plecare/sosire
        jump(11,40,-5); lp('dawn');
        try{SE._addRings&&SE._addRings.call(SE,map);}catch(e){}
        setTimeout(function(){fly(12.5,55,5,4000);},300);
        break;

      case 's6': // Economia — cladiri 3D zi, zbor pe centru
        jump(13,55,20); lp('day');
        setTimeout(function(){fly(15,68,50,5000);},300);
        setTimeout(function(){rot(50,0.018);},1200);
        break;

      case 's7': // Unde creste orasul — BARE 3D CRESC ANIMAT
        jump(12,50,10); lp('night');
        try{SE._add3DGrowth.call(SE,map);}catch(e){console.warn('3DG:',e.message);}
        setTimeout(function(){fly(15.5,72,25,7000);},600);
        setTimeout(function(){rot(25,0.015);},1600);
        break;

      case 's8': // Mobilitate — retea OSM reala colorata
        jump(12,50,0); lp('night');
        fetchOSMRoads(function(ft){
          if(SE._playing)addOSMLayer(ft);
        });
        setTimeout(function(){fly(13.5,62,0,4000);},300);
        break;

      case 's9': // Congestionare — zoom pe noduri critice
        jump(13,55,0); lp('night');
        fetchOSMRoads(function(ft){
          // Coloreaza doar arterele aglomerate (motorway+primary)
          if(SE._playing)addOSMLayer(ft.filter(function(f){return f.properties.hw==='motorway'||f.properties.hw==='trunk'||f.properties.hw==='primary';}));
        });
        try{SE._addTrafficPulse&&SE._addTrafficPulse.call(SE,map);}catch(e){}
        setTimeout(function(){fly(14,65,15,4000);},300);
        break;

      case 's10': // Transport public — linii BRT, acoperire
        jump(12,50,0); lp('day');
        try{SE._addTransit&&SE._addTransit.call(SE,map);}catch(e){}
        setTimeout(function(){fly(13,60,-10,4000);},300);
        break;

      case 's11': // Risc seismic — heatmap seismic, noapte
        jump(11,40,0); lp('night');
        try{SE._addSeismic&&SE._addSeismic.call(SE,map);}catch(e){}
        setTimeout(function(){fly(12.5,58,0,4000);},300);
        break;

      case 's12': // Cladiri vulnerabile — zoom pe UTR-uri risc
        jump(13,55,0); lp('night');
        try{SE._addSeismic&&SE._addSeismic.call(SE,map);}catch(e){}
        setTimeout(function(){fly(14.5,68,20,5000);},300);
        setTimeout(function(){rot(20,0.015);},1500);
        break;

      case 's13': // Inundatii — zona albastra, autostrada
        jump(11,35,5); lp('dawn');
        try{SE._addFlood&&SE._addFlood.call(SE,map);}catch(e){}
        try{SE._addRoads&&SE._addRoads.call(SE,map);}catch(e){}
        setTimeout(function(){fly(12.5,52,5,4000);},300);
        break;

      case 's14': // Clima 2055 — UHI, zone canicula
        jump(11,38,0); lp('dusk');
        try{SE._addFlood&&SE._addFlood.call(SE,map);}catch(e){}
        setTimeout(function(){fly(13,55,10,4000);},300);
        break;

      case 's15': // Spatii verzi — SDG11
        jump(12,50,0); lp('day');
        try{SE._addGreen&&SE._addGreen.call(SE,map);}catch(e){}
        setTimeout(function(){fly(14,62,15,4000);},300);
        break;

      case 's16': // Proiectie 2055 — inele extindere intravilan
        jump(10,45,-5); lp('dusk');
        try{SE._addExpansionRings&&SE._addExpansionRings.call(SE,map);}catch(e){}
        setTimeout(function(){fly(11.5,55,-5,4000);},300);
        break;

      case 's17': // Investitii necesare — puncte pe harta
        jump(12,52,15); lp('day');
        try{SE._addInfraPoints&&SE._addInfraPoints.call(SE,map);}catch(e){}
        setTimeout(function(){fly(13.5,62,30,4000);},300);
        break;

      case 's18': // Agenda primarului
        jump(12,50,0); lp('dawn');
        try{SE._addAgenda&&SE._addAgenda.call(SE,map);}catch(e){}
        setTimeout(function(){fly(13,58,0,3000);},300);
        break;

      case 's19': // Viziunea 2055 — bare 3D maxim, sunset
        jump(12,55,0); lp('dusk');
        try{SE._add3DGrowth.call(SE,map);}catch(e){}
        setTimeout(function(){
          if(SE._gf&&map.getSource('v8-gr')){
            try{map.getSource('v8-gr').setData({type:'FeatureCollection',features:SE._gf.map(function(f){
              return Object.assign({},f,{properties:Object.assign({},f.properties,{h:f.properties.hFinal||f.properties.h||30})});
            })});}catch(e){}
          }
          fly(15.5,72,40,8000);
        },800);
        setTimeout(function(){rot(40,0.012);},2000);
        break;

      case 's20': // Concluzie — zoom out spre Romania
        jump(13,55,0); lp('dusk');
        setTimeout(function(){fly(7,20,0,6000);},500);
        break;
    }
  }

  // ── CANVAS DRAW OVERLAY ───────────────────────────────────────────────
  // Text scurt, vizibil, nu iese din ecran
  function drawOverlay(id, t, W, H, ctx){
    var sA = t<0.08?t/0.08:t>0.90?(1-t)/0.10:1;
    var rev=function(d,s){return Math.min(1,Math.max(0,(t-d)/(s||0.25)));};
    var eo=function(x){return 1-Math.pow(1-Math.max(0,Math.min(1,x)),3);};
    var rE=function(d,s){return eo(rev(d,s));};

    ctx.globalAlpha=1;

    // Gradient negru sus 18% — text vizibil
    var gT=ctx.createLinearGradient(0,0,0,H*0.20);
    gT.addColorStop(0,'rgba(2,5,14,0.88)');gT.addColorStop(1,'rgba(2,5,14,0)');
    ctx.fillStyle=gT; ctx.fillRect(0,0,W,H*0.20);

    // Gradient negru jos 15% — cifre vizibile
    var gB=ctx.createLinearGradient(0,H*0.82,0,H);
    gB.addColorStop(0,'rgba(2,5,14,0)');gB.addColorStop(1,'rgba(2,5,14,0.82)');
    ctx.fillStyle=gB; ctx.fillRect(0,H*0.82,W,H*0.18);

    // Titlu — font adaptat la latime ecran, max 60px
    var titleSz=Math.min(W*0.040,60);
    var subSz=Math.min(W*0.020,28);
    var dataSz=Math.min(W*0.058,80);
    var labelSz=Math.min(W*0.014,18);
    var narSz=Math.min(W*0.018,22);

    function titlu(txt, sub){
      ctx.globalAlpha=sA*eo(rev(0.06,0.22));
      ctx.fillStyle='rgba(212,175,55,0.95)';
      ctx.font='700 '+titleSz+'px "IBM Plex Mono",monospace';
      ctx.textAlign='left';
      ctx.letterSpacing='0.08em';
      // Wrap daca e prea lung
      var maxW=W*0.65;
      if(ctx.measureText(txt).width>maxW){
        var words=txt.split(' ');
        var line='';var y=H*0.085;
        words.forEach(function(w){
          var test=line+(line?'  ':'')+w;
          if(ctx.measureText(test).width>maxW&&line){
            ctx.fillText(line,W*0.04,y); y+=titleSz*1.2; line=w;
          }else line=test;
        });
        ctx.fillText(line,W*0.04,y);
        if(sub){
          ctx.globalAlpha=sA*eo(rev(0.10,0.22))*0.7;
          ctx.fillStyle='rgba(148,163,184,0.80)';
          ctx.font=subSz+'px "IBM Plex Mono",monospace';
          ctx.letterSpacing='0.05em';
          ctx.fillText(sub,W*0.04,y+subSz*1.5);
        }
      }else{
        ctx.fillText(txt,W*0.04,H*0.085);
        if(sub){
          ctx.globalAlpha=sA*eo(rev(0.10,0.22))*0.7;
          ctx.fillStyle='rgba(148,163,184,0.80)';
          ctx.font=subSz+'px "IBM Plex Mono",monospace';
          ctx.letterSpacing='0.05em';
          ctx.fillText(sub,W*0.04,H*0.085+subSz*1.6);
        }
      }
    }

    // Linie aurie sub titlu
    function linie(){
      ctx.globalAlpha=sA*eo(rev(0.08,0.30));
      var g=ctx.createLinearGradient(W*0.04,0,W*0.55,0);
      g.addColorStop(0,'rgba(212,175,55,0.9)');g.addColorStop(1,'rgba(212,175,55,0)');
      ctx.fillStyle=g;
      ctx.fillRect(W*0.04,H*0.108,W*0.45*eo(rev(0.08,0.35)),2);
    }

    // Cifra principala — jos stanga
    function cifra(val, lbl, clr){
      ctx.globalAlpha=sA*eo(rev(0.18,0.28));
      ctx.fillStyle=clr||'#ffffff';
      ctx.font='900 '+dataSz+'px "Space Grotesk",sans-serif';
      ctx.textAlign='left';
      // Trunchiaza daca e prea lung
      var maxW=W*0.48;
      var txt=String(val);
      while(ctx.measureText(txt).width>maxW&&txt.length>3)txt=txt.slice(0,-1)+'…';
      ctx.fillText(txt,W*0.04,H*0.88);
      ctx.globalAlpha=sA*eo(rev(0.22,0.22))*0.72;
      ctx.fillStyle='rgba(148,163,184,0.75)';
      ctx.font='600 '+labelSz+'px "IBM Plex Mono",monospace';
      ctx.fillText(String(lbl).toUpperCase(),W*0.04,H*0.908);
    }

    // Cifra secundara — jos dreapta
    function cifra2(val, lbl, clr){
      ctx.globalAlpha=sA*eo(rev(0.25,0.25));
      ctx.fillStyle=clr||'rgba(212,175,55,0.95)';
      ctx.font='900 '+Math.min(W*0.040,54)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='right';
      var maxW=W*0.44;
      var txt=String(val);
      while(ctx.measureText(txt).width>maxW&&txt.length>3)txt=txt.slice(0,-1)+'…';
      ctx.fillText(txt,W*0.96,H*0.88);
      ctx.globalAlpha=sA*eo(rev(0.28,0.22))*0.65;
      ctx.fillStyle='rgba(148,163,184,0.70)';
      ctx.font='600 '+labelSz+'px "IBM Plex Mono",monospace';
      ctx.textAlign='right';
      ctx.fillText(String(lbl).toUpperCase(),W*0.96,H*0.907);
    }

    // Narativ — apare la t>0.60, max 2 randuri, font adaptat
    function narativ(txt, clr){
      if(t<0.58)return;
      var fa=Math.min(1,(t-0.58)/0.18)*sA;
      ctx.globalAlpha=fa;
      ctx.fillStyle=clr||'rgba(220,228,255,0.85)';
      ctx.font='500 '+narSz+'px "Space Grotesk",sans-serif';
      ctx.textAlign='left';
      var maxW=W*0.62, words=txt.split(' '), line='', y=H*0.935, lines=0;
      words.forEach(function(w){
        var test=line+(line?' ':'')+w;
        if(ctx.measureText(test).width>maxW&&line){
          if(lines<2){ctx.fillText(line,W*0.04,y);y+=narSz*1.35;lines++;}
          line=w;
        }else line=test;
      });
      if(lines<2&&line)ctx.fillText(line,W*0.04,y);
    }

    // Progress bar
    function prog(){
      ctx.globalAlpha=0.55;
      ctx.fillStyle='rgba(255,255,255,0.10)';
      ctx.fillRect(W*0.3,H-14,W*0.4,2);
      var g2=ctx.createLinearGradient(W*0.3,0,W*0.7,0);
      g2.addColorStop(0,'#D4AF37');g2.addColorStop(1,'rgba(212,175,55,0.3)');
      ctx.fillStyle=g2;
      ctx.fillRect(W*0.3,H-14,W*0.4*((SE._si+t)/SE.SCENES.length),2);
      ctx.fillStyle='rgba(148,163,184,0.45)';
      ctx.font='600 '+Math.min(W*0.011,13)+'px "IBM Plex Mono",monospace';
      ctx.textAlign='center';
      ctx.fillText((SE._si+1)+' / '+SE.SCENES.length+' — '+(SE.SCENES[SE._si]?.label||''),W/2,H-3);
      ctx.globalAlpha=1;
    }

    var N=function(v,d){return isNaN(+v)?'—':Number(v).toLocaleString('ro-RO',{minimumFractionDigits:d||0,maximumFractionDigits:d||0});};

    // ── CONTINUT per scena ─────────────────────────────────────────────
    switch(id){

    case 's1':
      titlu(name,'Romania · '+((SE._city.tip||'municipiu').toUpperCase()));
      linie();
      // Numele oras — centru ecran
      ctx.globalAlpha=sA*eo(rev(0.18,0.35));
      ctx.fillStyle='rgba(255,255,255,0.94)';
      ctx.font='900 '+Math.min(W*0.095,120)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='center';
      ctx.fillText(name.toUpperCase(),W*0.50,H*0.50);
      ctx.globalAlpha=sA*eo(rev(0.30,0.28))*0.75;
      ctx.fillStyle='#D4AF37';
      ctx.font='700 '+Math.min(W*0.020,26)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='center';
      ctx.fillText('JUD. '+(SE._city.judet||'—')+' · REG. '+(SE._city.regiune||'—'),W*0.50,H*0.565);
      cifra(N(pred.p21),'Locuitori 2021');
      cifra2(N(Math.round((SE._city.suprafata_ha||pred.sup)/100))+' km²','Suprafata');
      break;

    case 's2':
      titlu(name+' — Context Regional','Romania · '+SE._city.regiune);
      linie();
      cifra(N(pred.p21),'Locuitori');
      cifra2(pred.hub>=1.4?'METROPOLA':pred.hub>=1.2?'POL REGIONAL':'ORAS MEDIU','Rang urban','#D4AF37');
      narativ(name+' este polul regional al '+SE._city.regiune+'. Zona de influenta: ~'+N(Math.round(pred.p21*1.8))+' persoane.');
      break;

    case 's3':
      titlu('Orasul Azi — 3D','Cladiri reale · UTR-uri · Densitate');
      linie();
      cifra(N(pred.p21),'Locuitori');
      cifra2(N(Math.round((SE._city.suprafata_ha||pred.sup)/100))+' km²','Suprafata');
      narativ('Densitate medie: '+N(Math.round(pred.p21/((SE._city.suprafata_ha||pred.sup)/100)))+' loc/km². Centrul produce '+pred.pctUE+'% din PIB-ul UE27.');
      break;

    case 's4':
      titlu('Populatia','Densitate · Distributie · Structura');
      linie();
      cifra((pred.r10>=0?'+':'')+pred.r10.toFixed(2)+'%/an', pred.trendLbl, pred.trendClr);
      cifra2(N(pred.pop55),'Estimat 2055');
      narativ(N(pred.p21)+' locuitori in 2021. Tendinta: '+pred.trendLbl.toLowerCase()+'. Natalitate '+pred.natalitate+'‰, mortalitate '+pred.mortalit+'‰.');
      break;

    case 's5':
      titlu('Migratie & Tendinte','Spor natural · Migratia neta · 2055');
      linie();
      cifra((pred.migNeta>=0?'+':'')+N(pred.migNeta)+'/an','Migratie neta',pred.migNeta>=0?'#22c55e':'#ef4444');
      cifra2(N(pred.defLoc)+' un.','Deficit locuinte 2055','#ef4444');
      narativ('Salariu mediu '+N(pred.salariu)+' EUR/luna. Somaj '+pred.somaj+'%. Ocupare '+pred.ocupare+'%.');
      break;

    case 's6':
      titlu('Economia','PIB · Convergenta UE · Sectoare');
      linie();
      cifra(N(pred.pib)+' €','PIB pe locuitor',pred.pctUE>=75?'#22c55e':'#f59e0b');
      cifra2(pred.pctUE+'% UE27','Convergenta');
      narativ(name+' produce '+N(pred.pib)+' EUR/loc — '+pred.pctUE+'% din media UE27. Convergenta estimata: ~'+pred.anConv+'. Servicii '+pred.ocupatie.servicii+'%, industrie '+pred.ocupatie.industrie+'%.');
      break;

    case 's7':
      // Bare 3D — update animat
      try{SE._updateGrowth&&SE._updateGrowth.call(SE,t);}catch(e){}
      titlu('Unde Creste Orasul','Bare 3D din PUG real · Presiune zonala');
      linie();
      cifra(N(Math.round(pred.defLoc*Math.min(1,t*1.2))),'Deficit locuinte 2055','#ef4444');
      cifra2(N(pred.recHa)+' ha','Potential reconversie','#f59e0b');
      narativ('Zonele rosii = presiune maxima (CC/CP). Galben = semidental. Albastru = rezidential. Verde = reconversie posibila.');
      break;

    case 's8':
      titlu('Mobilitate Urbana','Retea rutiera reala · OSM · Congestie');
      linie();
      cifra(N(pred.mot24),'Vehicule/1000 loc',pred.mot24>500?'#ef4444':'#f59e0b');
      cifra2('~'+pred.satAn,'An saturare retea');
      // Legenda culori
      ctx.globalAlpha=sA*eo(rev(0.30,0.25));
      [['#dc2626','MOTORWAY'],['#ea580c','PRIMAR'],['#d97706','SECUNDAR'],['#16a34a','TERTIAR']].forEach(function(it,i){
        ctx.fillStyle=it[0]; ctx.fillRect(W*0.04+i*W*0.15,H*0.935,W*0.025,8);
        ctx.fillStyle='rgba(220,230,255,0.75)';
        ctx.font='600 '+Math.min(W*0.013,16)+'px "IBM Plex Mono",monospace';
        ctx.textAlign='left';
        ctx.fillText(it[1],W*0.075+i*W*0.15,H*0.943);
      });
      narativ(N(pred.fluxOra)+' vehicule/ora la varf. '+N(pred.pasaje)+' pasaje necesare. Centura: '+(pred.hub>=1.4?'URGENTA':'recomandata')+'.');
      break;

    case 's9':
      titlu('Congestionare & Solutii','Artere critice · Interventii necesare');
      linie();
      cifra(N(pred.invMob)+' M €','Cost mobilitate','#D4AF37');
      cifra2(N(pred.kmOcol)+' km','Variante ocolitoare');
      narativ('Flux ora varf: '+N(pred.fluxOra)+' veh/h. Saturatie ~'+pred.satAn+'. Pasaje denivelate: '+pred.pasaje+'. Cost total mobilitate: '+N(pred.invMob)+' M EUR.');
      break;

    case 's10':
      titlu('Transport Public','Acoperire TP · BRT · SUMP');
      linie();
      cifra(pred.tp+'%','Populatie acoperita',pred.tp>=70?'#22c55e':pred.tp>=50?'#f59e0b':'#ef4444');
      cifra2(pred.kmBRT+' km','BRT necesar','#a855f7');
      narativ('Deficit '+pred.defTP+' pp vs standard 75%. '+N(pred.statiiNoi)+' statii noi necesare. Cost BRT: '+N(pred.costBRT)+' M EUR. SUMP tintit: ~'+pred.anSUMP+'.');
      break;

    case 's11':
      titlu('Risc Seismic','Acceleratie P100 · Fond vulnerabil · PNRR');
      linie();
      var agC=pred.ag>=0.30?'#ef4444':pred.ag>=0.20?'#f59e0b':'#22c55e';
      cifra('ag='+pred.ag.toFixed(2)+'g','Acceleratie seismica',agC);
      cifra2(N(pred.fond)+' cladiri','Fond risc RS I-III','#ef4444');
      narativ('Fara interventie, fondul la risc creste la '+N(Math.round(pred.fond*1.12))+' in 2045. PNRR poate reabilita '+N(Math.round(pred.fond*0.25))+' apartamente. Cost: '+N(Math.round(pred.fond*0.085))+' M EUR.');
      break;

    case 's12':
      titlu('Cladiri Vulnerabile','UTR-uri LA/LB/LL · Cartiere expuse');
      linie();
      cifra(N(Math.round(pred.fond*0.25)),'Reabilitabile PNRR','#22c55e');
      cifra2('~'+Math.round(2025+pred.fond/Math.max(1,pred.fond*0.25/10)),'An eliminare fond');
      narativ('Cartierele vechi cu blocuri P+4 din anii 60-80 au cel mai mare risc. Reabilitarea costa '+N(Math.round(pred.fond*0.085))+' M EUR total.');
      break;

    case 's13':
      titlu('Inundatii — Zone de Risc','ANAR · Lunca inundabila · Autostrazi');
      linie();
      cifra(pred.zile24+' zile','Caniculare >35°C actual','#f59e0b');
      cifra2(Math.round(pred.zile24*2.2)+' zile','Proiectie 2055','#ef4444');
      narativ('Zona inundabila activa in lunca raului. Autostrada si centura marcate. Risc crescut la precipitatii >50mm/h.');
      break;

    case 's14':
      titlu('Clima 2055','UHI · Valuri de caldura · Adaptare');
      linie();
      cifra('+'+Math.round(2+pred.hub*0.8)+'°C','UHI vs rural','#f97316');
      cifra2(N(Math.round(pred.p21/10000*1.8))+' M €','Cost adaptare','#22c55e');
      narativ(Math.round(pred.zile24*2.2)+' zile caniculare in 2055 vs '+pred.zile24+' azi. Cost inactiune: x4.5 mai mult — '+N(Math.round(pred.p21/10000*1.8*4.5))+' M EUR.');
      break;

    case 's15':
      titlu('Spatii Verzi & SDG11','OMS 9 mp/loc · Deficit · Prioritati');
      linie();
      cifra(pred.sv+' mp/loc','Spatii verzi actuale',pred.sv>=9?'#22c55e':'#ef4444');
      cifra2('+'+pred.svHa+' ha','Necesare pana in 2055','#22c55e');
      narativ('Standard OMS: 9 mp/loc. Deficit curent: '+(pred.sv<9?Math.round((9-pred.sv)*pred.p21/10000)+'00 mp':'indeplinit')+'. SDG11: '+pred.sdgTotal+'/10.');
      break;

    case 's16':
      titlu('Proiectie 2055 — 3 Scenarii','Regres · Tendinta · Optimist');
      linie();
      var rB=pred.rRef;
      var pOpt=Math.round(pred.p21*Math.pow(1+(rB+0.9)/100,34));
      var pReg=Math.round(pred.p21*Math.pow(1+(rB-0.8)/100,34));
      cifra(N(pred.pop55),'S2 Tendinta 2055','#f59e0b');
      cifra2('['+N(pReg)+'–'+N(pOpt)+']','Interval 90%');
      narativ('S1 Regres: '+N(pReg)+' loc. S2 Tendinta: '+N(pred.pop55)+' loc. S3 Optimist: '+N(pOpt)+' loc. Diferenta: '+N(pOpt-pReg)+' persoane.');
      break;

    case 's17':
      titlu('Investitii Necesare 2025–2055','Infrastructura · Servicii · Finantare EU');
      linie();
      cifra(N(pred.invTotal)+' M €','Total investitii','#D4AF37');
      cifra2('~60%','Finantare UE disponibila','#22c55e');
      narativ('Mobilitate: '+N(pred.invMob)+' M EUR. Social: '+N(pred.invSoc)+' M EUR. Scoli noi: '+pred.scoliNoi+'. Cabinete: '+pred.cabMed+'. Spatii verzi: +'+pred.svHa+' ha.');
      break;

    case 's18':
      titlu('Agenda Primarului 2025–2030','Prioritati · Urgente · Timeline');
      linie();
      var top=pred.agenda[0];
      cifra(top?top.lbl:'Prioritate 1','Urgenta maxima',top?top.c:'#ef4444');
      cifra2('2025–2030','Fereastra de actiune','#D4AF37');
      pred.agenda.slice(0,4).forEach(function(pr,i){
        ctx.globalAlpha=sA*eo(rev(0.20+i*0.08,0.20));
        ctx.fillStyle=pr.c;
        ctx.font='700 '+Math.min(W*0.016,20)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='left';
        ctx.fillText((i+1)+'. '+pr.lbl,W*0.04,H*(0.75+i*0.042));
      });
      break;

    case 's19':
      // Bare 3D la maxim
      titlu(name+' 2055','Viziunea posibila · Cladiri la potential maxim');
      // Watermark 2055
      ctx.globalAlpha=sA*eo(rev(0.05,0.5))*0.07;
      ctx.fillStyle='#D4AF37';
      ctx.font='900 '+Math.min(W*0.28,320)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='center';
      ctx.fillText('2055',W*0.5,H*0.65);
      linie();
      ctx.globalAlpha=sA*eo(rev(0.15,0.28));
      ctx.fillStyle='rgba(255,255,255,0.92)';
      ctx.font='900 '+Math.min(W*0.055,70)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='center';
      ctx.fillText(name.toUpperCase(),W*0.50,H*0.30);
      ctx.globalAlpha=sA*eo(rev(0.22,0.25))*0.8;
      ctx.fillStyle='#D4AF37';
      ctx.font='600 '+Math.min(W*0.018,22)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='center';
      var sub=pred.rRef>0.5?'UN ORAS IN CRESTERE CARE ALEGE INTELIGENT':pred.rRef>0?'UN ORAS CARE DEVINE MOTOR REGIONAL':'UN ORAS CARE ALEGE CALITATEA';
      ctx.fillText(sub,W*0.50,H*0.355);
      // Checklist jos dreapta
      [{ok:pred.pop55>pred.p21,txt:'Pop 2055: '+N(pred.pop55)},{ok:pred.pctUE55>=75,txt:'PIB: '+pred.pctUE55+'% UE'},{ok:pred.anSUMP<=2035,txt:'SUMP ~'+pred.anSUMP},{ok:pred.sdgTotal>=6,txt:'SDG11: '+pred.sdgTotal+'/10'}].forEach(function(ch,i){
        ctx.globalAlpha=sA*eo(rev(0.28+i*0.07,0.20));
        ctx.fillStyle=ch.ok?'#22c55e':'#f59e0b';
        ctx.font='700 '+Math.min(W*0.018,22)+'px sans-serif';
        ctx.textAlign='right';
        ctx.fillText(ch.ok?'✓':'◎',W*0.96,H*(0.74+i*0.040));
        ctx.fillStyle='rgba(220,228,255,0.85)';
        ctx.font=Math.min(W*0.015,18)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='right';
        ctx.fillText(ch.txt,W*0.952,H*(0.74+i*0.040));
      });
      break;

    case 's20':
      titlu('Concluzie','Un oras care stie unde merge');
      linie();
      cifra(N(pred.invTotal)+' M €','Investitii necesare','#D4AF37');
      cifra2(pred.sdgTotal+'/10','Scor SDG11');
      narativ(name+' in 2055: '+N(pred.pop55)+' locuitori, '+pred.pctUE55+'% din PIB UE27, SUMP ~'+pred.anSUMP+'. Totul incepe cu o decizie azi.');
      // Footer
      ctx.globalAlpha=sA*eo(rev(0.65,0.3))*0.45;
      ctx.fillStyle='rgba(148,163,184,0.5)';
      ctx.font=Math.min(W*0.011,13)+'px "IBM Plex Mono",monospace';
      ctx.textAlign='center';
      ctx.fillText('UrbanX · ThinkSmart Solutions SRL · © 2026 · Date orientative',W*0.5,H*0.970);
      break;
    }

    prog();
    // Film grain
    ctx.save();ctx.globalAlpha=0.008;
    for(var i=0;i<50;i++){ctx.fillStyle=Math.random()>.5?'#fff':'#000';ctx.fillRect(Math.random()*W,Math.random()*H,1,1);}
    ctx.restore();ctx.globalAlpha=1;
  }

  // ── RENDER LOOP ────────────────────────────────────────────────────────
  function runScene(idx){
    if(!SE._playing||idx>=SE.SCENES.length){
      var canvas=document.getElementById('tci-c8');
      if(canvas){canvas.style.transition='opacity 1.5s';canvas.style.opacity='0';setTimeout(stopAll,1600);}
      return;
    }
    var scene=SE.SCENES[idx];
    SE._si=idx; SE._startT=performance.now();

    setupScene(scene.id);

    var loop=function(){
      if(!SE._playing)return;
      var t=Math.min(1,Math.max(0.001,(performance.now()-SE._startT)/scene.dur));
      var W=window.innerWidth, H=window.innerHeight;
      SE._ctx.clearRect(0,0,W,H);
      try{drawOverlay(scene.id,t,W,H,SE._ctx);}catch(e){console.warn('[Cinema] draw err:',scene.id,e.message);}
      if(t<1){SE._raf=requestAnimationFrame(loop);}
      else{
        try{SE._cleanLayers.call(SE);}catch(e){}
        try{if(map.getLayer('v8-osm-l'))map.removeLayer('v8-osm-l');}catch(e){}
        try{if(map.getSource('v8-osm'))map.removeSource('v8-osm');}catch(e){}
        runScene(idx+1);
      }
    };
    SE._raf=requestAnimationFrame(loop);
    console.log('[Cinema v3]',idx,scene.id,name);
  }

  runScene(0);
  console.log('[Cinema v3] START —',name,cx,cy);
};

window._openTCICinema=window._startCinema;

// ── Aliases pentru toate butoanele din platforma ──────────────────────────
window._launchCinemaV2=function(){
  var k=window.TCI?.cityKey||localStorage.getItem('ux_last_city')||'RO-IS-01';
  window._startCinema(k);
};
window._switchToCinemaV2=function(){window._preferCinemaV2=true;};
// Patch openTCI sa foloseasca _startCinema cand e in mod cinema
var _origOpenTCI=window.openTCI;
window.openTCI=function(opts){
  if(window._preferCinemaV2||opts?.mode==='cinema_v2'){
    window._startCinema(opts?.cityKey||window.TCI?.cityKey||localStorage.getItem('ux_last_city')||'RO-IS-01');
  }else if(_origOpenTCI){
    _origOpenTCI(opts);
  }
};

console.log('[Cinema Launcher v3.0] ✅ 20 scene · 3D · _launchCinemaV2 activ');
})();
