// cinema-launcher.js — UrbanX Cinema v4.0
// Porneste de la view-ul confirmat: zoom 15.5, pitch 72, cladiri 3D colorate
// Camera zboara de sus spre oras, pe cartiere, la nivel de strada
(function(){
'use strict';

var SCENES = [
  {id:'intro',    dur:12000, label:'IAȘI — IDENTITATE'},
  {id:'zoom_in',  dur:10000, label:'ZOOM SPRE ORAS'},
  {id:'azi_3d',   dur:18000, label:'ORASUL AZI — 3D'},
  {id:'cartiere', dur:16000, label:'CARTIERELE'},
  {id:'crestere', dur:22000, label:'UNDE CRESTE — 2026 → 2055'},
  {id:'mobil1',   dur:18000, label:'MOBILITATE — RETEA'},
  {id:'mobil2',   dur:16000, label:'CONGESTIONARE & SOLUTII'},
  {id:'tp',       dur:16000, label:'TRANSPORT PUBLIC'},
  {id:'seismic',  dur:16000, label:'RISC SEISMIC'},
  {id:'inund',    dur:16000, label:'INUNDATII'},
  {id:'clima',    dur:14000, label:'CLIMA 2055'},
  {id:'sdg',      dur:16000, label:'SPATII VERZI & SDG11'},
  {id:'mc2055',   dur:20000, label:'MONTE CARLO 2055'},
  {id:'infra',    dur:16000, label:'CE CONSTRUIM'},
  {id:'agenda',   dur:16000, label:'AGENDA PRIMARULUI'},
  {id:'viziune',  dur:22000, label:'VIZIUNEA 2055'},
];

window._startCinema = function(cityKey) {
  cityKey = cityKey||window.TCI?.cityKey||localStorage.getItem('ux_last_city')||'RO-IS-01';
  var SE = window._CinemaEngine;
  var map = window.map;
  if(!SE||!map){console.error('[Cinema] SE sau map lipsa');return;}

  SE.SCENES = SCENES;
  SE._playing = false;
  if(SE._raf)cancelAnimationFrame(SE._raf);
  if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
  try{SE._cleanLayers.call(SE);}catch(e){}
  try{if(map.getLayer('cin-osm'))map.removeLayer('cin-osm');}catch(e){}
  try{if(map.getSource('cin-osm'))map.removeSource('cin-osm');}catch(e){}

  // Ascunde TOT UI-ul
  var hidden=[];
  document.querySelectorAll('*').forEach(function(el){
    var id=el.id||'';
    var cls=el.className||'';
    if(id==='map'||id==='tci-c8'||id==='tci-c8-ctrl')return;
    if(el.tagName==='CANVAS'||el.tagName==='SCRIPT'||el.tagName==='STYLE')return;
    if(id.includes('panel')||id.includes('topbar')||id.includes('drawer')||
       id.includes('menu')||id.includes('sheet')||id.includes('gdpr')||
       id.includes('ctrl')||(typeof cls==='string'&&cls.includes('mapboxgl-ctrl'))||
       id.includes('mob')||id.includes('tci-adv')){
      if(!el._cs){el._cs=el.style.cssText;}
      el.style.setProperty('display','none','important');
      hidden.push(el);
    }
  });

  // Canvas fullscreen
  document.querySelectorAll('#tci-c8,#tci-c6,#tci-c7').forEach(function(e){e.remove();});
  var cv=document.createElement('canvas');
  cv.id='tci-c8';cv.width=window.innerWidth;cv.height=window.innerHeight;
  cv.style.cssText='position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:999999;pointer-events:none;';
  document.body.appendChild(cv);

  SE._map=map;
  SE._city=(window._RO_CITIES_DB||{})[cityKey]||Object.values(window._RO_CITIES_DB||{})[0];
  SE._pred=window._PredEngine.calc(SE._city);
  SE._canvas=cv;SE._ctx=cv.getContext('2d');
  SE._playing=true;SE._si=0;SE._gf=null;

  var cx=SE._city.lon||27.601, cy=SE._city.lat||47.158;
  var name=SE._city.name||'UAT';
  var pred=SE._pred;

  // Butoane control
  document.getElementById('tci-c8-ctrl')?.remove();
  var ctrl=document.createElement('div');
  ctrl.id='tci-c8-ctrl';
  ctrl.style.cssText='position:fixed;bottom:24px;right:20px;z-index:1000000;display:flex;gap:8px;';
  ctrl.innerHTML='<button id="c8p" style="background:rgba(0,0,0,.8);border:1px solid rgba(255,255,255,.15);color:#fff;padding:10px 18px;border-radius:10px;cursor:pointer;font:700 13px monospace">◀</button>'
    +'<button id="c8n" style="background:rgba(0,0,0,.8);border:1px solid rgba(255,255,255,.15);color:#fff;padding:10px 18px;border-radius:10px;cursor:pointer;font:700 13px monospace">▶</button>'
    +'<button id="c8s" style="background:rgba(150,0,0,.8);border:1px solid rgba(255,60,60,.3);color:#ffaaaa;padding:10px 14px;border-radius:10px;cursor:pointer;font:700 13px monospace">✕</button>';
  document.body.appendChild(ctrl);

  function stopAll(){
    SE._playing=false;
    if(SE._raf)cancelAnimationFrame(SE._raf);
    if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
    try{SE._cleanLayers.call(SE);}catch(e){}
    try{if(map.getLayer('cin-osm'))map.removeLayer('cin-osm');}catch(e){}
    try{if(map.getSource('cin-osm'))map.removeSource('cin-osm');}catch(e){}
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

  // ── HELPERS ──────────────────────────────────────────────────────────
  function lp(p){try{map.setConfigProperty('basemap','lightPreset',p);}catch(e){}}
  function rot(b0,spd){
    if(SE._rotInt)clearInterval(SE._rotInt);
    var b=b0;
    SE._rotInt=setInterval(function(){
      if(!SE._playing){clearInterval(SE._rotInt);SE._rotInt=null;return;}
      b+=spd;try{map.setBearing(b%360);}catch(e){}
    },50);
  }

  // Fetch OSM roads
  var _osmCache=null;
  function fetchOSM(cb){
    if(_osmCache){cb(_osmCache);return;}
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
        _osmCache=ft;
        cb(ft);
      }).catch(function(){cb([]);});
  }

  function addOSM(features){
    if(!features||!features.length)return;
    try{
      if(map.getLayer('cin-osm'))map.removeLayer('cin-osm');
      if(map.getSource('cin-osm'))map.removeSource('cin-osm');
      map.addSource('cin-osm',{type:'geojson',data:{type:'FeatureCollection',features:features}});
      map.addLayer({id:'cin-osm',type:'line',source:'cin-osm',
        paint:{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0.92,'line-blur':0.5},
        layout:{'line-cap':'round','line-join':'round'}
      });
    }catch(e){console.warn('[Cinema] OSM:',e.message);}
  }

  // Bara progress animata
  function add3D(startSmall){
    try{SE._add3DGrowth.call(SE,map);}catch(e){return;}
    if(startSmall&&SE._gf&&map.getSource('v8-gr')){
      try{map.getSource('v8-gr').setData({type:'FeatureCollection',
        features:SE._gf.map(function(f){
          return Object.assign({},f,{properties:Object.assign({},f.properties,{h:1})});
        })
      });}catch(e){}
    }
  }

  function update3D(progress){
    if(!SE._gf)return;
    try{
      var src=map.getSource('v8-gr');
      if(!src)return;
      var p=Math.max(0,Math.min(1,progress));
      src.setData({type:'FeatureCollection',
        features:SE._gf.map(function(f){
          var h=(f.properties.hFinal||f.properties.h||8)*p;
          return Object.assign({},f,{properties:Object.assign({},f.properties,{h:Math.max(0.5,h)})});
        })
      });
    }catch(e){}
  }

  // ── SETUP CAMERA per scena ────────────────────────────────────────────
  function setupCamera(id){
    if(SE._rotInt){clearInterval(SE._rotInt);SE._rotInt=null;}
    switch(id){
      case 'intro':
        // Jump direct la vedere 3D - fara zbor lung care se blocheaza
        lp('night');
        try{map.jumpTo({center:[cx,cy],zoom:15.5,pitch:72,bearing:0});}catch(e){}
        // Rotatie lenta din start
        rot(0,0.020);
        break;

      case 'zoom_in':
        lp('night');
        try{map.jumpTo({center:[cx,cy],zoom:15.5,pitch:72,bearing:25});}catch(e){}
        // Zbor subtil pe oras
        try{map.flyTo({center:[cx+0.01,cy-0.008],zoom:15.5,pitch:72,bearing:60,duration:8000,essential:true});}catch(e){}
        rot(25,0.015);
        break;

      case 'azi_3d':
        // VIEW-UL CONFIRMAT: jump direct la zoom 15.5 pitch 72
        lp('day');
        try{map.jumpTo({center:[cx,cy],zoom:15.5,pitch:72,bearing:10});}catch(e){}
        // Rotatie imediata
        rot(10,0.018);
        // Zbor subtil intre cartiere
        setTimeout(function(){
          if(!SE._playing)return;
          try{map.flyTo({center:[cx-0.01,cy+0.008],zoom:15.5,pitch:72,bearing:50,duration:6000,essential:true});}catch(e){}
        },3000);
        break;

      case 'cartiere':
        lp('day');
        try{map.jumpTo({center:[cx-0.02,cy+0.015],zoom:15,pitch:68,bearing:60});}catch(e){}
        setTimeout(function(){
          if(!SE._playing)return;
          try{map.flyTo({center:[cx,cy],zoom:15.5,pitch:72,bearing:120,duration:5000,essential:true});}catch(e){}
        },4000);
        setTimeout(function(){
          if(!SE._playing)return;
          try{map.flyTo({center:[cx+0.02,cy-0.015],zoom:15,pitch:68,bearing:200,duration:5000,essential:true});}catch(e){}
        },10000);
        break;

      case 'crestere':
        lp('night');
        try{map.jumpTo({center:[cx,cy],zoom:15.5,pitch:72,bearing:20});}catch(e){}
        // Apeleaza exact cum merge din consola, dupa idle
        // Apel direct — nu mai asteapta idle
        try{SE._add3DGrowth.call(SE,map);}catch(e){console.error('3D err:',e);}
        rot(20,0.015);
        // Bare la h=1 initial dupa 200ms
        setTimeout(function(){
          if(!SE._playing||!SE._gf)return;
          try{map.getSource('v8-gr').setData({type:'FeatureCollection',
            features:SE._gf.map(function(f){
              return Object.assign({},f,{properties:Object.assign({},f.properties,{h:1})});
            })});}catch(e){}
        },300);
        break;

      case 'mobil1':
        lp('night');
        try{map.jumpTo({center:[cx,cy],zoom:12.5,pitch:55,bearing:0});}catch(e){}
        fetchOSM(function(ft){
          if(!SE._playing)return;
          addOSM(ft);
          setTimeout(function(){
            if(!SE._playing)return;
            try{map.flyTo({center:[cx,cy],zoom:13.5,pitch:62,bearing:15,duration:4000,essential:true});}catch(e){}
          },500);
        });
        break;

      case 'mobil2':
        // Congestionare — zoom pe noduri critice
        lp('night');
        try{map.flyTo({center:[cx,cy],zoom:13,pitch:60,bearing:0,duration:3000,essential:true});}catch(e){}
        fetchOSM(function(ft){
          if(!SE._playing)return;
          // Doar artere aglomerate
          addOSM(ft.filter(function(f){
            return f.properties.hw==='motorway'||f.properties.hw==='trunk'||f.properties.hw==='primary';
          }));
        });
        break;

      case 'tp':
        lp('day');
        try{map.flyTo({center:[cx,cy],zoom:13,pitch:58,bearing:-10,duration:3000,essential:true});}catch(e){}
        try{SE._addTransit&&SE._addTransit.call(SE,map);}catch(e){}
        break;

      case 'seismic':
        lp('night');
        try{map.jumpTo({center:[cx,cy],zoom:13,pitch:55,bearing:0});}catch(e){}
        try{SE._addSeismic.call(SE,map);}catch(e){console.warn('seismic:',e);}
        break;

      case 'inund':
        lp('dawn');
        try{map.jumpTo({center:[cx,cy],zoom:12.5,pitch:50,bearing:5});}catch(e){}
        try{SE._addFlood.call(SE,map);}catch(e){console.warn('flood:',e);}
        try{SE._addRoads.call(SE,map);}catch(e){}
        break;

      case 'clima':
        lp('dusk');
        try{map.flyTo({center:[cx,cy],zoom:12,pitch:48,bearing:0,duration:3000,essential:true});}catch(e){}
        break;

      case 'sdg':
        lp('day');
        try{map.flyTo({center:[cx,cy],zoom:13.5,pitch:60,bearing:10,duration:3000,essential:true});}catch(e){}
        try{SE._addGreen&&SE._addGreen.call(SE,map);}catch(e){}
        break;

      case 'mc2055':
        // Monte Carlo — inele extindere intravilan
        lp('dusk');
        try{map.flyTo({center:[cx,cy],zoom:11,pitch:50,bearing:-5,duration:3000,essential:true});}catch(e){}
        try{SE._addExpansionRings&&SE._addExpansionRings.call(SE,map);}catch(e){}
        break;

      case 'infra':
        lp('day');
        try{map.flyTo({center:[cx,cy],zoom:13,pitch:58,bearing:20,duration:3000,essential:true});}catch(e){}
        try{SE._addInfraPoints&&SE._addInfraPoints.call(SE,map);}catch(e){}
        break;

      case 'agenda':
        lp('dawn');
        try{map.flyTo({center:[cx,cy],zoom:13,pitch:55,bearing:0,duration:3000,essential:true});}catch(e){}
        break;

      case 'viziune':
        lp('dusk');
        try{map.jumpTo({center:[cx,cy],zoom:15.5,pitch:72,bearing:30});}catch(e){}
        try{SE._add3DGrowth.call(SE,map);}catch(e){console.error('3D err:',e);}
        rot(30,0.010);
        setTimeout(function(){
          if(!SE._gf)return;
          try{map.getSource('v8-gr').setData({type:'FeatureCollection',
            features:SE._gf.map(function(f){
              return Object.assign({},f,{properties:Object.assign({},f.properties,{h:f.properties.hFinal||f.properties.h||20})});
            })});}catch(e){}
          try{map.flyTo({center:[cx,cy],zoom:15.5,pitch:72,bearing:120,duration:14000,essential:true});}catch(e){}
        },500);
        break;
    }
  }

  // ── CANVAS OVERLAY ────────────────────────────────────────────────────
  function draw(id,t,W,H,ctx){
    var sA=t<0.06?t/0.06:t>0.92?(1-t)/0.08:1;
    var eo=function(x){return 1-Math.pow(1-Math.max(0,Math.min(1,x)),3);};
    var rE=function(d,s){return eo(Math.min(1,Math.max(0,(t-(d||0))/((s||0.25)))));};
    var N=function(v){return isNaN(+v)?'—':Number(v).toLocaleString('ro-RO',{maximumFractionDigits:0});};

    ctx.globalAlpha=1;

    // Vigneta sus — mai subtila
    var gT=ctx.createLinearGradient(0,0,0,H*0.22);
    gT.addColorStop(0,'rgba(2,5,14,0.85)');gT.addColorStop(1,'rgba(2,5,14,0)');
    ctx.fillStyle=gT;ctx.fillRect(0,0,W,H*0.22);

    // Vigneta jos
    var gB=ctx.createLinearGradient(0,H*0.78,0,H);
    gB.addColorStop(0,'rgba(2,5,14,0)');gB.addColorStop(1,'rgba(2,5,14,0.85)');
    ctx.fillStyle=gB;ctx.fillRect(0,H*0.78,W,H*0.22);

    // Font sizes — se adapteaza la ecran, nu depasesc limita
    var FS={
      titlu: Math.min(W*0.038, 52),
      sub:   Math.min(W*0.018, 24),
      mare:  Math.min(W*0.062, 88),
      mic:   Math.min(W*0.013, 17),
      nar:   Math.min(W*0.016, 21),
    };

    function titlu(txt,sub){
      ctx.globalAlpha=sA*rE(0.05,0.20);
      ctx.fillStyle='rgba(212,175,55,0.95)';
      ctx.font='700 '+FS.titlu+'px "IBM Plex Mono",monospace';
      ctx.textAlign='left';
      ctx.letterSpacing='0.06em';
      ctx.fillText(txt.slice(0,45),W*0.04,H*0.09);
      if(sub){
        ctx.globalAlpha=sA*rE(0.08,0.20)*0.65;
        ctx.fillStyle='rgba(148,163,184,0.80)';
        ctx.font=FS.sub+'px "IBM Plex Mono",monospace';
        ctx.letterSpacing='0.04em';
        ctx.fillText(sub.slice(0,60),W*0.04,H*0.09+FS.sub*1.8);
      }
    }

    function linie(progress){
      ctx.globalAlpha=sA*rE(0.07,0.28);
      var g=ctx.createLinearGradient(W*0.04,0,W*0.04+W*0.42*(progress||1),0);
      g.addColorStop(0,'rgba(212,175,55,0.9)');g.addColorStop(1,'rgba(212,175,55,0)');
      ctx.fillStyle=g;
      ctx.fillRect(W*0.04,H*0.105,W*0.42*rE(0.07,0.32),1.5);
    }

    // Cifra mare jos-stanga — max 10 caractere
    function cifra(val,lbl,clr){
      ctx.globalAlpha=sA*rE(0.15,0.25);
      ctx.fillStyle=clr||'#ffffff';
      ctx.font='900 '+FS.mare+'px "Space Grotesk",sans-serif';
      ctx.textAlign='left';
      var txt=String(val).slice(0,12);
      ctx.fillText(txt,W*0.04,H*0.885);
      ctx.globalAlpha=sA*rE(0.18,0.20)*0.65;
      ctx.fillStyle='rgba(148,163,184,0.72)';
      ctx.font='600 '+FS.mic+'px "IBM Plex Mono",monospace';
      ctx.letterSpacing='0.08em';
      ctx.fillText(String(lbl).toUpperCase().slice(0,40),W*0.04,H*0.912);
    }

    // Cifra mica jos-dreapta
    function cifra2(val,lbl,clr){
      ctx.globalAlpha=sA*rE(0.22,0.22);
      ctx.fillStyle=clr||'rgba(212,175,55,0.95)';
      ctx.font='900 '+Math.min(W*0.038,52)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='right';
      ctx.fillText(String(val).slice(0,14),W*0.96,H*0.885);
      ctx.globalAlpha=sA*rE(0.25,0.20)*0.60;
      ctx.fillStyle='rgba(148,163,184,0.65)';
      ctx.font='600 '+FS.mic+'px "IBM Plex Mono",monospace';
      ctx.textAlign='right';
      ctx.fillText(String(lbl).toUpperCase().slice(0,30),W*0.96,H*0.910);
    }

    // Narativ — max 2 randuri, apare tardiv
    function narativ(txt){
      if(t<0.60)return;
      var fa=Math.min(1,(t-0.60)/0.15)*sA;
      ctx.globalAlpha=fa;
      ctx.fillStyle='rgba(220,228,255,0.82)';
      ctx.font='500 '+FS.nar+'px "Space Grotesk",sans-serif';
      ctx.textAlign='left';
      var mW=W*0.58, words=txt.split(' '), line='', y=H*0.936, n=0;
      words.forEach(function(w){
        var test=line+(line?' ':'')+w;
        if(ctx.measureText(test).width>mW&&line&&n<2){
          ctx.fillText(line,W*0.04,y);y+=FS.nar*1.4;line=w;n++;
        }else line=test;
      });
      if(n<2)ctx.fillText(line,W*0.04,y);
    }

    // Progress bar jos-centru
    function prog(){
      ctx.globalAlpha=0.50;
      ctx.fillStyle='rgba(255,255,255,0.08)';
      ctx.fillRect(W*0.35,H-12,W*0.30,2);
      var gp=ctx.createLinearGradient(W*0.35,0,W*0.65,0);
      gp.addColorStop(0,'#D4AF37');gp.addColorStop(1,'rgba(212,175,55,0.2)');
      ctx.fillStyle=gp;
      ctx.fillRect(W*0.35,H-12,W*0.30*((SE._si+t)/SE.SCENES.length),2);
      ctx.fillStyle='rgba(148,163,184,0.38)';
      ctx.font='600 '+Math.min(W*0.010,12)+'px "IBM Plex Mono",monospace';
      ctx.textAlign='center';
      ctx.fillText((SE._si+1)+'/'+SE.SCENES.length+' — '+(SE.SCENES[SE._si]?.label||''),W/2,H-2);
      ctx.globalAlpha=1;
    }

    // ── CONTINUT per scena ──────────────────────────────────────────────
    switch(id){

    case 'intro':
      // Nume oras mare centru, apare pe masura ce zboaram
      titlu(name,'Romania · '+(SE._city.regiune||'—')+' · '+(SE._city.tip||'municipiu').toUpperCase());
      linie();
      ctx.globalAlpha=sA*rE(0.25,0.40);
      ctx.fillStyle='rgba(255,255,255,0.93)';
      ctx.font='900 '+Math.min(W*0.088,115)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='center';
      ctx.fillText(name.toUpperCase(),W/2,H*0.48);
      ctx.globalAlpha=sA*rE(0.35,0.28)*0.78;
      ctx.fillStyle='#D4AF37';
      ctx.font='600 '+Math.min(W*0.018,23)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='center';
      ctx.fillText('JUD. '+(SE._city.judet||'—').toUpperCase()+' · POP. '+N(pred.p21)+' LOCUITORI',W/2,H*0.555);
      cifra(N(pred.p21),'Locuitori 2021');
      cifra2(N(Math.round((SE._city.suprafata_ha||pred.sup)/100))+' km²','Suprafata');
      break;

    case 'zoom_in':
      titlu(name+' — Vedere 3D','Zoom spre oras · Noapte');
      linie();
      cifra(N(pred.p21),'Locuitori');
      cifra2(pred.pctUE+'% UE27','Convergenta PIB');
      narativ('Camera coboara spre '+name+'. '+N(pred.p21)+' locuitori. '+N(Math.round((SE._city.suprafata_ha||pred.sup)/100))+' km².');
      break;

    case 'azi_3d':
      titlu('Orasul Azi — 3D','Cladiri reale din PUG · Cartiere · UTR-uri');
      linie();
      cifra(N(pred.p21),'Locuitori 2021');
      cifra2(N(pred.pib)+' €','PIB pe locuitor');
      narativ('Fiecare bloc reprezinta un UTR din PUG. Culoarea = tipul de zona: galben=comercial, roz=rezidential, violet=institutional, alb=mixt.');
      break;

    case 'cartiere':
      titlu('Cartierele','Distributie spatiala · Densitate · Functiuni');
      linie();
      cifra(N(Math.round(pred.p21/((SE._city.suprafata_ha||pred.sup)/100))),'Loc/km² densitate medie');
      cifra2(pred.ocupatie.servicii+'%','Economie servicii');
      narativ('Centrul dens, periferiile in expansiune. Cartierele rezidentiale concentreaza '+Math.round(pred.p21*0.65/1000)+'k locuitori.');
      break;

    case 'crestere':
      // Animatie 2026 → 2055: bare cresc
      var tAnim=t>0.25?Math.min(1,(t-0.25)/0.65):0;
      var tEased=1-Math.pow(1-tAnim,3);
      update3D(tEased);

      if(t<0.28){
        titlu('Iasi 2026 — Starea Actuala','Cladiri existente din PUG');
        linie();
        cifra(N(pred.p21),'Locuitori actuali','#94a3b8');
        cifra2(N(pred.auth),'Autorizatii 2023','#60a5fa');
        narativ('Aceasta este starea actuala a orasului. Fiecare bara = un UTR real din PUG.');
      } else {
        titlu('Unde Creste Orasul 2055','Bare 3D = potential constructibil · PUG real');
        linie(tEased);
        // Numar animat
        ctx.globalAlpha=sA*tEased;
        ctx.fillStyle='#ef4444';
        ctx.font='900 '+FS.mare+'px "Space Grotesk",sans-serif';
        ctx.textAlign='left';
        ctx.fillText(N(Math.round(pred.defLoc*tEased)),W*0.04,H*0.885);
        ctx.globalAlpha=sA*0.65;
        ctx.fillStyle='rgba(148,163,184,0.72)';
        ctx.font='600 '+FS.mic+'px "IBM Plex Mono",monospace';
        ctx.fillText('UNITATI LOCATIVE NECESARE 2055',W*0.04,H*0.912);
        cifra2(N(pred.recHa)+' ha','Potential reconversie','#f59e0b');
        if(tEased>0.5)narativ('Rosu/portocaliu=presiune maxima CC/CP. Albastru=rezidential. Verde=reconversie. '+N(pred.defLoc)+' unitati necesare pana in 2055.');
      }
      break;

    case 'mobil1':
      titlu('Mobilitate Urbana','Retea rutiera reala OSM · Tipuri artere');
      linie();
      cifra(N(pred.mot24),'Vehicule/1000 locuitori',pred.mot24>500?'#ef4444':'#f59e0b');
      cifra2('~'+pred.satAn,'An saturare retea');
      // Legenda culori artere
      ctx.globalAlpha=sA*rE(0.25,0.22);
      var leg=[['#dc2626','AUTOSTRADA'],['#ea580c','TRUNK'],['#f59e0b','PRIMAR'],['#16a34a','SECUNDAR'],['#0ea5e9','TERTIAR']];
      leg.forEach(function(it,i){
        ctx.fillStyle=it[0];ctx.fillRect(W*(0.04+i*W*0.115/W),H*0.928,W*0.022,7);
        ctx.fillStyle='rgba(220,230,255,0.75)';
        ctx.font='600 '+Math.min(W*0.012,14)+'px "IBM Plex Mono",monospace';
        ctx.textAlign='left';
        ctx.fillText(it[1],W*(0.067+i*W*0.115/W),H*0.936);
      });
      narativ(N(pred.fluxOra)+' veh/h la ora de varf. Saturatie ~'+pred.satAn+'. '+N(pred.pasaje)+' pasaje denivelate necesare.');
      break;

    case 'mobil2':
      titlu('Congestionare & Solutii','Artere critice · Interventii · Costuri');
      linie();
      cifra(N(pred.invMob)+' M €','Cost total mobilitate','#D4AF37');
      cifra2(N(pred.kmOcol)+' km','Variante ocolitoare');
      narativ('Artere principale suprasolicitate la ora de varf. Solutii: '+pred.pasaje+' pasaje, '+N(pred.kmOcol)+'km ocolitoare, BRT '+pred.kmBRT+'km. Total: '+N(pred.invMob)+' M EUR.');
      break;

    case 'tp':
      titlu('Transport Public','Acoperire · BRT · SUMP '+pred.anSUMP);
      linie();
      cifra(pred.tp+'%','Populatie acoperita',pred.tp>=70?'#22c55e':pred.tp>=50?'#f59e0b':'#ef4444');
      cifra2(pred.kmBRT+' km BRT','Necesar · Cost: '+N(pred.costBRT)+' M €');
      narativ('Deficit '+pred.defTP+'pp vs standard 75%. '+N(pred.statiiNoi)+' statii noi. Walk Score '+pred.walkScore+'/100. SUMP tinta: '+pred.anSUMP+'.');
      break;

    case 'seismic':
      var agC=pred.ag>=0.30?'#ef4444':pred.ag>=0.20?'#f59e0b':'#22c55e';
      titlu('Risc Seismic','P100 · Fond vulnerabil · PNRR');
      linie();
      cifra('ag='+pred.ag.toFixed(2)+'g','Acceleratie seismica P100',agC);
      cifra2(N(pred.fond)+' cladiri','Fond risc RS I-III','#ef4444');
      narativ(N(pred.fond)+' cladiri la risc. Fara interventie: '+N(Math.round(pred.fond*1.12))+' in 2045. PNRR: '+N(Math.round(pred.fond*0.25))+' apartamente, cost '+N(Math.round(pred.fond*0.085))+' M EUR.');
      break;

    case 'inund':
      titlu('Inundatii & Risc Hidric','Zone inundabile · Lunca · Infrastructura');
      linie();
      cifra(pred.zile24+' zile/an','Caniculare >35°C azi','#f59e0b');
      cifra2(Math.round(pred.zile24*2.2)+' zile','Proiectie 2055','#ef4444');
      narativ('Zona albastra = lunca inundabila activa. Autostrada si centura marcate. Risc major la precipitatii >50mm/h.');
      break;

    case 'clima':
      titlu('Clima 2055','UHI · Valuri caldura · Adaptare');
      linie();
      cifra('+'+Math.round(2+pred.hub*0.8)+'°C','Efect UHI vs rural','#f97316');
      cifra2(N(Math.round(pred.p21/10000*1.8))+' M €','Cost adaptare','#22c55e');
      narativ(Math.round(pred.zile24*2.2)+' zile caniculare in 2055 (azi: '+pred.zile24+'). Inactiunea costa de 4.5x mai mult: '+N(Math.round(pred.p21/10000*8.1))+' M EUR.');
      break;

    case 'sdg':
      titlu('Spatii Verzi & Calitate Vietii','OMS 9mp/loc · SDG11 · Deficit');
      linie();
      cifra(pred.sv+' mp/loc','Spatii verzi actuale',pred.sv>=9?'#22c55e':'#ef4444');
      cifra2('SDG11: '+pred.sdgTotal+'/10','Scor calitate viata',pred.sdgTotal>=7?'#22c55e':pred.sdgTotal>=5?'#f59e0b':'#ef4444');
      narativ('Standard OMS: 9 mp/loc. Deficit: +'+pred.svHa+' ha necesare pana in 2055. Transport: '+pred.tp+'%. Seismic: ag='+pred.ag.toFixed(2)+'g.');
      break;

    case 'mc2055':
      // Monte Carlo — 3 scenarii cu inele animate
      var rB=pred.rRef;
      var pOpt=Math.round(pred.p21*Math.pow(1+(rB+0.9)/100,34));
      var pReg=Math.round(pred.p21*Math.pow(1+(rB-0.8)/100,34));
      var pTend=pred.pop55;
      titlu('Monte Carlo 2055','3 Scenarii · Probabilitati · Intervale');
      linie();
      // Cele 3 scenarii afisate
      var sc=[
        {lbl:'S1 REGRES',val:N(pReg),c:'#ef4444',td:0.20},
        {lbl:'S2 TENDINTA',val:N(pTend),c:'#f59e0b',td:0.30},
        {lbl:'S3 OPTIMIST',val:N(pOpt),c:'#22c55e',td:0.40},
      ];
      sc.forEach(function(s,i){
        ctx.globalAlpha=sA*rE(s.td,0.22);
        ctx.fillStyle=s.c;
        ctx.font='700 '+Math.min(W*0.016,20)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='left';
        ctx.fillText(s.lbl+': '+s.val+' loc.',W*0.04,H*(0.78+i*0.040));
      });
      cifra('['+N(pReg)+'–'+N(pOpt)+']','Interval 90% probabilitate','#f59e0b');
      narativ('Diferenta intre scenarii: '+N(pOpt-pReg)+' persoane = '+N(Math.round((pOpt-pReg)*35/90))+' unitati locative. Decizia de azi determina scenariul.');
      break;

    case 'infra':
      titlu('Ce Construim 2025–2055','Scoli · Cabinete · Spatii verzi · Retele');
      linie();
      cifra(N(pred.invTotal)+' M €','Total investitii necesare','#D4AF37');
      cifra2('~60% UE','Finantare disponibila','#22c55e');
      var items2=[
        ['🏫','SCOLI: +'+pred.scoliNoi,0.20],
        ['🏥','CABINETE: +'+pred.cabMed,0.30],
        ['🌳','SPATII VERZI: +'+pred.svHa+' ha',0.40],
        ['🚌','STATII TP: +'+pred.statiiNoi,0.50],
      ];
      items2.forEach(function(it,i){
        ctx.globalAlpha=sA*rE(it[2],0.20);
        ctx.font=Math.min(W*0.015,19)+'px sans-serif';ctx.textAlign='left';
        ctx.fillText(it[0],W*0.04,H*(0.78+i*0.038));
        ctx.fillStyle='rgba(220,230,255,0.82)';
        ctx.font='600 '+Math.min(W*0.013,16)+'px "Space Grotesk",sans-serif';
        ctx.fillText(it[1],W*0.075,H*(0.782+i*0.038));
      });
      narativ('Mobilitate: '+N(pred.invMob)+' M EUR. Social: '+N(pred.invSoc)+' M EUR. UE acopera ~60% prin REGIO, PNRR, Coeziune.');
      break;

    case 'agenda':
      titlu('Agenda Primarului 2025–2030','Prioritati · Urgente · Finantare');
      linie();
      var top2=pred.agenda[0];
      cifra(top2?top2.lbl:'Prioritate 1','Urgenta #1',top2?top2.c:'#ef4444');
      cifra2('2025–2030','Fereastra actiune','#D4AF37');
      pred.agenda.slice(0,5).forEach(function(pr,i){
        ctx.globalAlpha=sA*rE(0.15+i*0.08,0.18);
        ctx.fillStyle=pr.c;
        ctx.font='700 '+Math.min(W*0.016,20)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='left';
        ctx.fillText((i+1)+'. '+pr.lbl,W*0.04,H*(0.76+i*0.038));
      });
      narativ('5 prioritati strategice. Investitie totala: '+N(pred.invTotal)+' M EUR. Termen: 2030 pentru masurile urgente.');
      break;

    case 'viziune':
      // Watermark 2055
      ctx.globalAlpha=sA*rE(0.05,0.5)*0.06;
      ctx.fillStyle='#D4AF37';
      ctx.font='900 '+Math.min(W*0.28,340)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='center';
      ctx.fillText('2055',W/2,H*0.64);

      titlu(name+' 2055','Viziunea posibila · Orasul inteligent');
      linie();

      ctx.globalAlpha=sA*rE(0.15,0.30);
      ctx.fillStyle='rgba(255,255,255,0.93)';
      ctx.font='900 '+Math.min(W*0.055,72)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='center';
      ctx.fillText(name.toUpperCase(),W/2,H*0.28);

      ctx.globalAlpha=sA*rE(0.22,0.25)*0.80;
      ctx.fillStyle='#D4AF37';
      ctx.font='600 '+Math.min(W*0.017,22)+'px "Space Grotesk",sans-serif';
      ctx.textAlign='center';
      var sub=pred.rRef>0.5?'UN ORAS IN CRESTERE CARE ALEGE INTELIGENT':
               pred.rRef>0?'UN ORAS CARE DEVINE MOTOR REGIONAL':
               'UN ORAS CARE ALEGE CALITATEA IN LOCUL CANTITATII';
      ctx.fillText(sub,W/2,H*0.335);

      [{ok:pred.pop55>pred.p21,txt:'Pop 2055: '+N(pred.pop55)+' ('+(pred.pop55>pred.p21?'+':'')+N(pred.pop55-pred.p21)+')'},
       {ok:pred.pctUE55>=75,txt:'PIB 2055: '+pred.pctUE55+'% din media UE27'},
       {ok:pred.anSUMP<=2035,txt:'SUMP implementat: ~'+pred.anSUMP},
       {ok:pred.sdgTotal>=6,txt:'SDG11: '+pred.sdgTotal+'/10 calitate viatai'},
       {ok:true,txt:'Investitii: '+N(pred.invTotal)+' M EUR planificate'}
      ].forEach(function(ch,i){
        ctx.globalAlpha=sA*rE(0.28+i*0.06,0.18);
        ctx.fillStyle=ch.ok?'#22c55e':'#f59e0b';
        ctx.font='700 '+Math.min(W*0.016,20)+'px sans-serif';
        ctx.textAlign='right';
        ctx.fillText(ch.ok?'✓':'◎',W*0.96,H*(0.73+i*0.038));
        ctx.fillStyle='rgba(220,228,255,0.85)';
        ctx.font=Math.min(W*0.014,18)+'px "Space Grotesk",sans-serif';
        ctx.textAlign='right';
        ctx.fillText(ch.txt.slice(0,50),W*0.948,H*(0.73+i*0.038));
      });

      ctx.globalAlpha=sA*rE(0.65,0.25)*0.40;
      ctx.fillStyle='rgba(148,163,184,0.45)';
      ctx.font=Math.min(W*0.010,12)+'px "IBM Plex Mono",monospace';
      ctx.textAlign='center';
      ctx.fillText('UrbanX · ThinkSmart Solutions SRL · © 2026 · Date orientative',W/2,H*0.972);
      break;
    }

    prog();

    // Film grain minimal
    ctx.save();ctx.globalAlpha=0.007;
    for(var i=0;i<40;i++){
      ctx.fillStyle=Math.random()>.5?'#fff':'#000';
      ctx.fillRect(Math.random()*W,Math.random()*H,1,1);
    }
    ctx.restore();ctx.globalAlpha=1;
  }

  // ── RENDER LOOP ──────────────────────────────────────────────────────
  function runScene(idx){
    if(!SE._playing||idx>=SE.SCENES.length){
      var c=document.getElementById('tci-c8');
      if(c){c.style.transition='opacity 1.5s';c.style.opacity='0';setTimeout(stopAll,1600);}
      return;
    }
    var scene=SE.SCENES[idx];
    SE._si=idx;SE._startT=performance.now();

    // Cleanup layers din scena anterioara
    try{SE._cleanLayers.call(SE);}catch(e){}
    try{if(map.getLayer('cin-osm'))map.removeLayer('cin-osm');}catch(e){}
    try{if(map.getSource('cin-osm'))map.removeSource('cin-osm');}catch(e){}

    // Dezactiveaza _setupMap din _CinemaEngine - il suprascrie cu pitch gresit
    var _origSetupMap = SE._setupMap;
    SE._setupMap = function(){};  // noop temporar

    setupCamera(scene.id);

    // Forteaza camera DUPA setupCamera
    var scene3D=['crestere','azi_3d','cartiere','zoom_in','intro','viziune'];
    if(scene3D.indexOf(scene.id)>=0){
      try{map.jumpTo({center:[cx,cy],zoom:15.5,pitch:72,bearing:20});}catch(e){}
    }

    // Restaureaza _setupMap pentru alte functii care il folosesc
    SE._setupMap = _origSetupMap;

    var _cameraSet=false;
    var loop=function(){
      if(!SE._playing)return;
      // Forteaza camera la primul frame
      if(!_cameraSet){
        _cameraSet=true;
        var s3D=['crestere','azi_3d','cartiere','zoom_in','intro','viziune'];
        if(s3D.indexOf(scene.id)>=0){
          try{map.jumpTo({center:[cx,cy],zoom:15.5,pitch:72,bearing:20});}catch(e){}
          try{SE._add3DGrowth.call(SE,map);}catch(e){}
        }
      }
      var t=Math.min(1,Math.max(0.001,(performance.now()-SE._startT)/scene.dur));
      var W=window.innerWidth,H=window.innerHeight;
      SE._ctx.clearRect(0,0,W,H);
      try{draw(scene.id,t,W,H,SE._ctx);}catch(e){console.warn('[Cinema]',scene.id,e.message);}
      if(t<1){SE._raf=requestAnimationFrame(loop);}
      else{runScene(idx+1);}
    };
    SE._raf=requestAnimationFrame(loop);
    console.log('[Cinema v4]',idx,scene.id,name);
  }

  runScene(0);
  console.log('[Cinema v4.0] START —',name);
};

// Patch openTCI dupa ce toate scripturile s-au incarcat
window._launchCinemaV2=function(){
  window._startCinema(window.TCI?.cityKey||localStorage.getItem('ux_last_city')||'RO-IS-01');
};

function _patchOpenTCI(attempt){
  if(typeof window.openTCI==='function'){
    var orig=window.openTCI;
    window.openTCI=function(opts){
      // Cinematicul nostru e default acum
      window._startCinema(opts?.cityKey||window.TCI?.cityKey||localStorage.getItem('ux_last_city')||'RO-IS-01');
    };
    console.log('[Cinema v4] openTCI patched ✅');
  } else if(attempt<30){
    setTimeout(function(){_patchOpenTCI(attempt+1);},300);
  }
}

// Asteapta DOM complet incarcat
if(document.readyState==='complete'){
  _patchOpenTCI(0);
}else{
  window.addEventListener('load',function(){_patchOpenTCI(0);});
}

console.log('[Cinema Launcher v4.0] ✅ 16 scene · 3D · buton activ');
})();
