// tci-cinematic-scenes.js — UrbanX TCI Cinematic v6.0
// ThinkSmart Solutions SRL | 23 mai 2026
// ARHITECTURA CORECTA: Mapbox = actor principal. Canvas = titlu + date minime.
// Layerele se adauga dupa map idle. Zero text pe fundal negru.
(function(G){
'use strict';
const N=(v,d=0)=>isNaN(+v)?'—':Number(v).toLocaleString('ro-RO',{minimumFractionDigits:d,maximumFractionDigits:d});
const ss=(m)=>{try{window.showSnackbar?.(m);}catch(e){}console.log('[Cinema v6]',m);};
const eo=(t)=>1-Math.pow(1-Math.max(0,Math.min(1,t)),3);

// ── MOTOR PREDICTII ────────────────────────────────────────────────────────
const _PRED={
  calc(city){
    const p21=city.pop2021||100000,p11=city.pop2011||p21;
    const r10=city.rata_reala_2011_2021??((p21-p11)/p11/10*100);
    const pib=city.pib_eur_cap||9000,hub=city.coef_hub||1.0;
    const reg=city.regiune||'C',sup=city.suprafata_ha||Math.round(p21*0.025);
    const sv=city.spatii_verzi_mp_loc||10,tp=city.acoperire_transport||55;
    const ag=city.ag_seismic||(reg==='MN'||reg==='VR'?0.35:reg==='IS'||reg==='VS'?0.25:0.15);
    const lat=city.lat||45.5,fond=city.cladiri_risc||Math.round(p21*0.008);
    const auth=city.autorizatii_2023||Math.round(p21/1000*1.2);
    const rRef=hub>=1.5?0.9:hub>=1.2?0.45:hub>=1.0?0.1:r10;
    const pop55=Math.round(p21*Math.pow(1+rRef/100,34));
    const deltaP=pop55-p21;
    const UE27=36600,pctUE=Math.round(pib/UE27*100);
    const rPIB=3.8+(hub-1.0)*1.4;
    const pib55=Math.round(pib*Math.pow(1+rPIB/100,31));
    const pctUE55=Math.round(pib55/(UE27*Math.pow(1.015,31))*100);
    const defLoc=Math.max(0,Math.round(deltaP*35/90));
    const mot24=Math.round(390+(pib-9000)/500);
    const satAn=Math.min(2075,Math.round(2024+(640-mot24)/((Math.min(710,mot24*1.30)-mot24)/31)));
    const defTP=Math.max(0,75-tp);
    const kmBRT=Math.round(hub*8+p21/50000*5);
    const zile24=Math.max(5,Math.round(30-(lat-44)*4));
    const scoliNoi=Math.max(0,Math.round(Math.max(0,deltaP)*0.14/400));
    const cabMed=Math.max(0,Math.round(Math.max(0,deltaP)/1800));
    const svHa=Math.max(0,Math.round((pop55*9-p21*sv)/10000));
    const sdgTotal=Math.round(((Math.min(10,Math.round(sv/9*10)))+(Math.min(10,Math.round(tp/75*10)))+(Math.min(10,Math.round(pctUE/100*10)))+(Math.min(10,Math.round((1-fond/(p21*0.02))*10))))/4*10)/10;
    const invTotal=Math.round(p21/1000*0.85*hub*10)/10;
    const agenda=[
      {lbl:'Transport Public & SUMP',score:defTP,c:'#60a5fa'},
      {lbl:'Reabilitare Fond Seismic',score:fond/50,c:'#ef4444'},
      {lbl:'Spatii Verzi & Clima',score:svHa/2,c:'#22c55e'},
      {lbl:'Servicii Sociale',score:Math.abs(r10)*10,c:'#f59e0b'},
      {lbl:'Atragere Investitii',score:Math.max(0,75-pctUE),c:'#a78bfa'},
    ].sort((a,b)=>b.score-a.score);
    return {p21,p11,r10,rRef,pop55,deltaP,pib,pib55,pctUE,pctUE55,rPIB,
      defLoc,auth,mot24,satAn,defTP,kmBRT,zile24,scoliNoi,cabMed,svHa,
      sdgTotal,invTotal,fond,ag,tp,sv,hub,sup,agenda,
      trendClr:r10>0.5?'#22c55e':r10>0?'#4ade80':r10>-1?'#f59e0b':'#ef4444',
      trendLbl:r10>0.5?'CRESTERE ACCELERATA':r10>0?'CRESTERE MODERATA':r10>-1?'STABILIZARE':'DECLIN'};
  }
};

// ── SCENE ENGINE ──────────────────────────────────────────────────────────
G._SceneEngine={
  _playing:false,_raf:null,_startT:0,_si:0,
  _city:null,_pred:null,_canvas:null,_ctx:null,_map:null,
  _rotInt:null,_hiddenEls:[],_pugGeo:null,_reguli:null,_wikiText:'',_gf:null,

  SCENES:[
    {id:'s1', dur:16000, label:'Identitate'},
    {id:'s2', dur:20000, label:'Demografie & Profil'},
    {id:'s3', dur:18000, label:'Economie & Convergenta UE'},
    {id:'s4', dur:22000, label:'Coridoare 2055 — Bare 3D'},
    {id:'s5', dur:18000, label:'Mobilitate & Trafic OSM'},
    {id:'s6', dur:16000, label:'Transport Public'},
    {id:'s7', dur:16000, label:'Risc Seismic'},
    {id:'s8', dur:18000, label:'Clima & Inundatii'},
    {id:'s9', dur:18000, label:'Proiectie 2055'},
    {id:'s10',dur:16000, label:'Infrastructura Necesara'},
    {id:'s11',dur:16000, label:'Calitate Viata SDG11'},
    {id:'s12',dur:20000, label:'Viziunea 2055'},
  ],

  async launch(cityKey){
    const map=window.map;
    if(!map){ss('Harta indisponibila');return;}
    this._map=map;
    const db=window._RO_CITIES_DB||{};
    const city=db[cityKey]||Object.values(db)[0]||{name:'Municipiu',lat:45.5,lon:25.0,pop2021:100000,pop2011:100000,pib_eur_cap:9000,regiune:'C',tip:'municipiu',coef_hub:1.0,suprafata_ha:5000,spatii_verzi_mp_loc:10,acoperire_transport:55};
    this._city=city;this._pred=_PRED.calc(city);
    this._pugGeo=null;this._reguli=null;this._wikiText='';
    this._loadAssets(city);
    // Ascunde UI
    this._hideUI();
    // Canvas
    this._canvas=this._mkCanvas();this._ctx=this._canvas.getContext('2d');
    // Butoane control
    this._mkCtrl();
    this._si=0;this._playing=true;
    this._runScene(0);
    ss('🎬 TCI Cinematic v6 — '+city.name);
  },

  async _loadAssets(city){
    try{
      const reg=window._PUG_REGISTRY||{};
      const slug=Object.keys(reg).find(k=>{const id=city.id||city.name?.toLowerCase().replace(/\s+/g,'-').replace(/[ăâ]/g,'a').replace(/[îí]/g,'i').replace(/[șş]/g,'s').replace(/[țţ]/g,'t');return reg[k].id===id;});
      const pugUrl=reg[slug]?.pugFile||'data/municipiul-iasi/pug.geojson';
      const rulesUrl=reg[slug]?.rulesFile||pugUrl.replace('pug.geojson','reguli.json');
      const [r1,r2]=await Promise.all([fetch(pugUrl),fetch(rulesUrl)]);
      if(r1.ok)this._pugGeo=await r1.json();
      if(r2.ok)this._reguli=await r2.json();
      console.log('[v6] PUG:',this._pugGeo?.features?.length);
    }catch(e){console.warn('[v6] assets:',e.message);}
    try{
      const r=await fetch('https://ro.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(this._city.name),{signal:AbortSignal.timeout(5000)});
      if(r.ok){const d=await r.json();this._wikiText=d.extract?d.extract.slice(0,280)+'...':'';}
    }catch(e){}
  },

  _mkCanvas(){
    document.getElementById('tci-c6')?.remove();
    const c=document.createElement('canvas');c.id='tci-c6';
    const dpr=window.devicePixelRatio||1;
    c.style.cssText='position:fixed;top:0;left:0;z-index:95000;width:100vw;height:100vh;pointer-events:none;';
    c.width=window.innerWidth*dpr;c.height=window.innerHeight*dpr;
    c.getContext('2d').scale(dpr,dpr);document.body.appendChild(c);return c;
  },

  _mkCtrl(){
    document.getElementById('tci-c6-ctrl')?.remove();
    const d=document.createElement('div');d.id='tci-c6-ctrl';
    d.style.cssText='position:fixed;bottom:20px;right:20px;z-index:96000;display:flex;gap:8px;';
    d.innerHTML='<button id="c6-skip" style="background:rgba(10,15,30,.9);border:1px solid rgba(255,255,255,.2);color:#94a3b8;padding:8px 16px;border-radius:8px;cursor:pointer;font:13px monospace">▶ URMT.</button><button id="c6-stop" style="background:rgba(10,15,30,.9);border:1px solid rgba(255,255,255,.2);color:#ef4444;padding:8px 14px;border-radius:8px;cursor:pointer;font:13px monospace">✕ STOP</button>';
    document.body.appendChild(d);
    document.getElementById('c6-skip').onclick=()=>{
      if(this._si<this.SCENES.length-1){this._si++;this._startT=performance.now()-this.SCENES[this._si].dur+2500;}
    };
    document.getElementById('c6-stop').onclick=()=>this.stop();
  },

  _hideUI(){
    this._hiddenEls=[];
    const sels=['#panel','#panel-tabs','#panel-body','#topbar','#wx-topbar',
      '#info-drawer','#utr-drawer','#info-drawer-backdrop','#ux-gdpr-footer',
      '#tci-adv-menu','#viz-menu','#rapoarte-menu','#analize-menu',
      '#cancel-parcel-btn','#btnPDF','.mapboxgl-ctrl-bottom-left','.mapboxgl-ctrl-bottom-right'];
    sels.forEach(s=>{const e=document.querySelector(s);if(e){e.dataset.c6h=e.style.cssText;e.style.setProperty('display','none','important');this._hiddenEls.push(e);}});
    // Ascunde nav/topbar
    document.querySelectorAll('nav,[id*="topbar"],[id*="toolbar"]').forEach(e=>{
      if(!e.dataset.c6h){e.dataset.c6h=e.style.cssText;e.style.setProperty('display','none','important');this._hiddenEls.push(e);}
    });
  },
  _restoreUI(){
    this._hiddenEls.forEach(e=>{e.style.cssText=e.dataset.c6h||'';delete e.dataset.c6h;});
    this._hiddenEls=[];
  },

  _runScene(idx){
    if(!this._playing||idx>=this.SCENES.length){this._finish();return;}
    const scene=this.SCENES[idx];this._si=idx;this._startT=performance.now();
    // Setup harta pentru scena curenta
    this._setupMap(scene.id);
    const loop=()=>{
      if(!this._playing)return;
      const t=Math.min(1,(performance.now()-this._startT)/scene.dur);
      if(this._ctx&&this._canvas){
        this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height);
        try{this._draw(scene.id,t);}catch(e){console.warn('[v6]',e.message);}
      }
      if(t<1){this._raf=requestAnimationFrame(loop);}
      else{this._cleanLayers();this._runScene(idx+1);}
    };
    this._raf=requestAnimationFrame(loop);
  },

  stop(){
    this._playing=false;
    if(this._raf)cancelAnimationFrame(this._raf);
    if(this._rotInt){clearInterval(this._rotInt);this._rotInt=null;}
    document.getElementById('tci-c6')?.remove();
    document.getElementById('tci-c6-ctrl')?.remove();
    this._cleanLayers();this._restoreUI();
    try{window.map?.flyTo({zoom:13,pitch:0,bearing:0,duration:1500,essential:true});}catch(e){}
    ss('⏹ stop');
  },

  _finish(){
    this._playing=false;
    if(this._raf)cancelAnimationFrame(this._raf);
    if(this._rotInt){clearInterval(this._rotInt);this._rotInt=null;}
    document.getElementById('tci-c6-ctrl')?.remove();
    const c=document.getElementById('tci-c6');
    if(c){c.style.transition='opacity 1.2s';c.style.opacity='0';setTimeout(()=>c.remove(),1300);}
    this._cleanLayers();
    setTimeout(()=>this._restoreUI(),1000);
    try{window.map?.flyTo({zoom:13,pitch:45,bearing:0,duration:2000,essential:true});window.map?.setConfigProperty?.('basemap','lightPreset','day');}catch(e){}
    ss('✅ '+this._city?.name);
  },

  // ── MAPBOX SETUP ─────────────────────────────────────────────────────────
  _setupMap(id){
    const map=this._map;if(!map)return;
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5;
    if(this._rotInt){clearInterval(this._rotInt);this._rotInt=null;}
    const fly=(z,p,b,d,lp)=>{
      try{map.flyTo({center:[cx,cy],zoom:z,pitch:p,bearing:b,duration:d||3000,essential:true});}catch(e){}
      if(lp)try{map.setConfigProperty('basemap','lightPreset',lp);}catch(e){}
    };
    // Adauga layere dupa ce harta e idle
    const onIdle=(fn)=>{
      try{map.once('idle',fn);}catch(e){setTimeout(fn,1500);}
    };
    switch(id){
      case 's1':
        fly(11,0,0,3000,'night');
        break;
      case 's2':
        fly(12,45,10,3000,'dawn');
        onIdle(()=>this._addDensity(map));
        break;
      case 's3':
        fly(13.5,55,-20,2500,'day');
        onIdle(()=>this._addBuildings(map));
        break;
      case 's4':
        try{map.jumpTo({center:[cx,cy],zoom:10.5,pitch:55,bearing:10});}catch(e){}
        setTimeout(()=>{try{map.flyTo({center:[cx,cy],zoom:11.5,pitch:58,bearing:15,duration:3000,essential:true});}catch(e){}},200);
        try{map.setConfigProperty('basemap','lightPreset','night');}catch(e){}
        onIdle(()=>{this._add3DGrowth(map);this._rot(map,15,0.02);});
        break;
      case 's5':
        fly(13,42,0,2500,'night');
        onIdle(()=>this._addTraffic(map));
        break;
      case 's6':
        fly(13,40,-15,2500,'day');
        onIdle(()=>this._addTransit(map));
        break;
      case 's7':
        fly(12,35,0,2500,'night');
        onIdle(()=>this._addSeismic(map));
        break;
      case 's8':
        fly(12,30,0,2500,'dawn');
        onIdle(()=>{this._addFlood(map);this._addRoads(map);});
        break;
      case 's9':
        fly(11,45,-10,2500,'dusk');
        onIdle(()=>this._addRings(map));
        break;
      case 's10':
        fly(13,50,20,2500,'day');
        onIdle(()=>this._addDensity(map));
        break;
      case 's11':
        fly(13,45,5,2500,'day');
        onIdle(()=>this._addGreen(map));
        break;
      case 's12':
        try{map.jumpTo({center:[cx,cy],zoom:10.5,pitch:55,bearing:0});}catch(e){}
        setTimeout(()=>{try{map.flyTo({center:[cx,cy],zoom:11.5,pitch:60,bearing:25,duration:4000,essential:true});}catch(e){}},300);
        try{map.setConfigProperty('basemap','lightPreset','dusk');}catch(e){}
        onIdle(()=>{this._addBuildings(map);this._rot(map,25,0.015);});
        break;
    }
  },

  // ── LAYERS MAPBOX ────────────────────────────────────────────────────────
  _safeAdd(map,srcId,srcDef,lyrDef){
    try{
      if(map.getLayer(lyrDef.id))map.removeLayer(lyrDef.id);
      if(map.getSource(srcId))map.removeSource(srcId);
      map.addSource(srcId,srcDef);
      map.addLayer(lyrDef);
      console.log('[v6] Layer adaugat:',lyrDef.id);
    }catch(e){console.warn('[v6] addLayer err:',lyrDef.id,e.message);}
  },

  _add3DGrowth(map){
    const geo=this._pugGeo,reg=this._reguli||{},pred=this._pred;
    let features=[];
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5;
    if(geo?.features?.length>0){
      geo.features.slice(0,600).forEach(f=>{
        const u=f.properties?.utr_cod||f.properties?.cod_utr||'',rv=reg[u]||{};
        const cut=parseFloat(rv.CUT||rv.cut||0)||0;
        const pr=u.startsWith('CC')||u.startsWith('CP')?0.92:u.startsWith('CM')||u.startsWith('CB')?0.72:u.startsWith('LC')||u.startsWith('LB')?0.55:u.startsWith('LA')||u.startsWith('LL')?0.40:u.startsWith('AI')||u.startsWith('AA')?0.65:0.28;
        const h=Math.max(4,(cut||pr*4)*(10+pred.hub*6));
        const c=pr>0.75?'#ef4444':pr>0.55?'#f59e0b':pr>0.38?'#60a5fa':'#22c55e';
        features.push({...f,properties:{...f.properties,h,c,pr}});
      });
    }else{
      [[0.008,0.92,'#ef4444',60],[0.022,0.72,'#f59e0b',40],[0.042,0.55,'#60a5fa',25],[0.065,0.30,'#22c55e',12]].forEach(([r,pr,c,h])=>{
        const n=32,coords=[];for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;coords.push([cx+Math.cos(a)*r*1.5,cy+Math.sin(a)*r]);}
        features.push({type:'Feature',geometry:{type:'Polygon',coordinates:[coords]},properties:{h,c,pr}});
      });
    }
    this._gf=features;
    this._safeAdd(map,'v6-gr',{type:'geojson',data:{type:'FeatureCollection',features}},{
      id:'v6-gr-l',type:'fill-extrusion',source:'v6-gr',
      paint:{'fill-extrusion-color':['get','c'],'fill-extrusion-height':['get','h'],'fill-extrusion-base':0,'fill-extrusion-opacity':0.85}
    });
    // Ascunde UTR 2D daca exista
    ['utr-fill','utr-line'].forEach(lid=>{try{if(map.getLayer(lid))map.setLayoutProperty(lid,'visibility','none');}catch(e){}});
  },

  _updateGrowth(t){
    const map=this._map;if(!map||!this._gf)return;
    try{
      const src=map.getSource('v6-gr');if(!src)return;
      const te=eo(t);
      src.setData({type:'FeatureCollection',features:this._gf.map(f=>({...f,properties:{...f.properties,h:f.properties.h*te}}))});
    }catch(e){}
  },

  _addBuildings(map){
    if(!this._pugGeo?.features?.length)return;
    const reg=this._reguli||{};
    const features=this._pugGeo.features.slice(0,500).map(f=>{
      const u=f.properties?.utr_cod||'',rv=reg[u]||{};
      const rh=parseInt(rv.RH?.replace(/[^0-9]/g,'')||'3');
      const h=Math.max(4,rh*3.5);
      return{...f,properties:{...f.properties,h,c:h>35?'#94a3b8':h>20?'#cbd5e1':'#e2e8f0'}};
    });
    this._safeAdd(map,'v6-bld',{type:'geojson',data:{type:'FeatureCollection',features}},{
      id:'v6-bld-l',type:'fill-extrusion',source:'v6-bld',
      paint:{'fill-extrusion-color':['get','c'],'fill-extrusion-height':['get','h'],'fill-extrusion-base':0,'fill-extrusion-opacity':0.75}
    });
  },

  _addDensity(map){
    if(!this._pugGeo?.features?.length)return;
    this._safeAdd(map,'v6-den',{type:'geojson',data:this._pugGeo},{
      id:'v6-den-l',type:'fill',source:'v6-den',
      paint:{'fill-color':['case',['<',['get','suprafata_mp'],3000],'#ef4444',['<',['get','suprafata_mp'],8000],'#f59e0b',['<',['get','suprafata_mp'],20000],'#60a5fa','#22c55e'],'fill-opacity':0.45}
    });
  },

  _addTraffic(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5,r=0.045;
    const lines=[];
    [0,45,90,135,180,225,270,315].forEach((deg,i)=>{
      const rad=deg*Math.PI/180,c=i<3?'#ef4444':i<6?'#f59e0b':'#22c55e',w=i<3?5:i<6?3:2;
      lines.push({type:'Feature',geometry:{type:'LineString',coordinates:[[cx,cy],[cx+Math.cos(rad)*r*1.5,cy+Math.sin(rad)*r*0.8]]},properties:{c,w}});
    });
    const n=64,ring=[];for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;ring.push([cx+Math.cos(a)*r*1.8,cy+Math.sin(a)*r]);}
    lines.push({type:'Feature',geometry:{type:'LineString',coordinates:ring},properties:{c:'#a78bfa',w:4}});
    this._safeAdd(map,'v6-tr',{type:'geojson',data:{type:'FeatureCollection',features:lines}},{
      id:'v6-tr-l',type:'line',source:'v6-tr',
      paint:{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0.9},
      layout:{'line-cap':'round','line-join':'round'}
    });
  },

  _addTransit(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5,pred=this._pred;
    const tR=pred.tp/100*0.07,n=64,ring=[];
    for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;ring.push([cx+Math.cos(a)*tR*1.5,cy+Math.sin(a)*tR]);}
    const lines=[{type:'Feature',geometry:{type:'LineString',coordinates:ring},properties:{c:'#60a5fa',w:3,dash:false}}];
    [0,90,180,270].slice(0,Math.min(4,Math.ceil(pred.kmBRT/6))).forEach(deg=>{
      const rad=deg*Math.PI/180;
      lines.push({type:'Feature',geometry:{type:'LineString',coordinates:[[cx-Math.cos(rad)*0.055,cy-Math.sin(rad)*0.035],[cx+Math.cos(rad)*0.055,cy+Math.sin(rad)*0.035]]},properties:{c:'#a78bfa',w:6,dash:true}});
    });
    this._safeAdd(map,'v6-tp',{type:'geojson',data:{type:'FeatureCollection',features:lines}},{
      id:'v6-tp-l',type:'line',source:'v6-tp',
      paint:{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0.85},
      layout:{'line-cap':'round'}
    });
  },

  _addSeismic(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5,pred=this._pred;
    const c=pred.ag>=0.30?'#ef4444':pred.ag>=0.20?'#f59e0b':'#22c55e';
    const r=0.10*(pred.ag/0.25),n=64,ring=[];
    for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;ring.push([cx+Math.cos(a)*r*1.5,cy+Math.sin(a)*r]);}
    this._safeAdd(map,'v6-sei',{type:'geojson',data:{type:'Feature',geometry:{type:'Polygon',coordinates:[ring]},properties:{}}},{
      id:'v6-sei-l',type:'fill',source:'v6-sei',paint:{'fill-color':c,'fill-opacity':0.30}
    });
    // Heatmap clădiri risc pe UTR-uri dacă avem PUG
    if(this._pugGeo?.features?.length){
      const reg=this._reguli||{};
      const features=this._pugGeo.features.filter(f=>{
        const u=f.properties?.utr_cod||'';
        return u.startsWith('LA')||u.startsWith('LB')||u.startsWith('LL');
      }).slice(0,300).map(f=>({...f,properties:{...f.properties,risc:0.7}}));
      if(features.length>0){
        this._safeAdd(map,'v6-risc',{type:'geojson',data:{type:'FeatureCollection',features}},{
          id:'v6-risc-l',type:'fill',source:'v6-risc',
          paint:{'fill-color':'#ef4444','fill-opacity':0.35}
        });
      }
    }
  },

  _addFlood(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5;
    const fc=[[cx-0.07,cy-0.012],[cx-0.04,cy-0.018],[cx-0.01,cy-0.010],[cx+0.02,cy-0.006],[cx+0.06,cy-0.014],[cx+0.07,cy+0.006],[cx+0.06,cy+0.022],[cx+0.02,cy+0.018],[cx-0.01,cy+0.014],[cx-0.04,cy+0.010],[cx-0.07,cy+0.012]];
    this._safeAdd(map,'v6-fl',{type:'geojson',data:{type:'Feature',geometry:{type:'Polygon',coordinates:[fc]},properties:{}}},{
      id:'v6-fl-l',type:'fill',source:'v6-fl',paint:{'fill-color':'#3b82f6','fill-opacity':0.45}
    });
  },

  _addRoads(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5;
    const lines=[
      {type:'Feature',geometry:{type:'LineString',coordinates:[[cx-0.14,cy+0.022],[cx,cy+0.010],[cx+0.14,cy+0.022]]},properties:{c:'#fbbf24',w:5}},
    ];
    const n=72,r=0.07,ring=[];
    for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;ring.push([cx+Math.cos(a)*r*1.6,cy+Math.sin(a)*r]);}
    lines.push({type:'Feature',geometry:{type:'LineString',coordinates:ring},properties:{c:'#f97316',w:4}});
    this._safeAdd(map,'v6-rd',{type:'geojson',data:{type:'FeatureCollection',features:lines}},{
      id:'v6-rd-l',type:'line',source:'v6-rd',
      paint:{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0.92},
      layout:{'line-cap':'butt'}
    });
  },

  _addRings(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5,pred=this._pred;
    const rings=[{rm:0.82,col:'#94a3b8',op:0.2,yr:2011,w:2},{rm:1.00,col:'#60a5fa',op:0.3,yr:2021,w:3},{rm:1.14,col:'#f59e0b',op:0.4,yr:2035,w:3},{rm:1.30,col:'#ef4444',op:0.55,yr:2055,w:5}];
    const features=rings.map(ring=>{
      const n=72,r=0.07*ring.rm,coords=[];
      for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;coords.push([cx+Math.cos(a)*r*1.6,cy+Math.sin(a)*r]);}
      return{type:'Feature',geometry:{type:'LineString',coordinates:coords},properties:{c:ring.col,op:ring.op,w:ring.w,yr:ring.yr}};
    });
    this._safeAdd(map,'v6-in',{type:'geojson',data:{type:'FeatureCollection',features}},{
      id:'v6-in-l',type:'line',source:'v6-in',
      paint:{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':['get','op'],'line-dasharray':[5,3]},
      layout:{'line-cap':'round'}
    });
  },

  _addGreen(map){
    if(!this._pugGeo?.features?.length)return;
    const features=this._pugGeo.features.map(f=>{
      const u=f.properties?.utr_cod||'';
      const isG=u.startsWith('V')||u.startsWith('P')||u.startsWith('G');
      return{...f,properties:{...f.properties,c:isG?'#22c55e':'rgba(0,0,0,0)',isG}};
    });
    this._safeAdd(map,'v6-gn',{type:'geojson',data:{type:'FeatureCollection',features}},{
      id:'v6-gn-l',type:'fill',source:'v6-gn',
      paint:{'fill-color':['get','c'],'fill-opacity':['case',['get','isG'],0.65,0]}
    });
  },

  _cleanLayers(){
    const map=this._map;if(!map)return;
    ['v6-gr-l','v6-gr','v6-bld-l','v6-bld','v6-den-l','v6-den',
     'v6-tr-l','v6-tr','v6-tp-l','v6-tp','v6-sei-l','v6-sei','v6-risc-l','v6-risc',
     'v6-fl-l','v6-fl','v6-rd-l','v6-rd','v6-in-l','v6-in','v6-gn-l','v6-gn'
    ].forEach(id=>{
      try{if(map.getLayer(id))map.removeLayer(id);}catch(e){}
      try{if(map.getSource(id))map.removeSource(id);}catch(e){}
    });
    ['utr-fill','utr-line','utr-lbl'].forEach(id=>{
      try{if(map.getLayer(id))map.setLayoutProperty(id,'visibility','visible');}catch(e){}
    });
    this._gf=null;
  },

  _rot(map,b0,spd){
    if(this._rotInt)clearInterval(this._rotInt);
    let b=b0;
    this._rotInt=setInterval(()=>{
      if(!this._playing){clearInterval(this._rotInt);this._rotInt=null;return;}
      b+=spd;try{map.setBearing(b%360);}catch(e){}
    },50);
  },

  // ── CANVAS DRAW — minimal, elegant ────────────────────────────────────────
  _draw(id,t){
    const ctx=this._ctx,W=window.innerWidth,H=window.innerHeight;
    const city=this._city,pred=this._pred,name=city?.name||'UAT';
    if(!ctx)return;

    const rev=(d,s=0.25)=>Math.min(1,Math.max(0,(t-d)/s));
    const rE=(d,s=0.25)=>eo(rev(d,s));
    const sA=t<0.07?t/0.07:t>0.88?Math.max(0,(1-t)/0.12):1;
    const al=(a)=>{ctx.globalAlpha=Math.max(0,Math.min(1,a));};

    // Gradient sus subtil — lasă harta vizibilă
    const bgT=()=>{
      const g=ctx.createLinearGradient(0,0,0,H*0.22);
      g.addColorStop(0,'rgba(3,7,18,0.75)');g.addColorStop(1,'rgba(3,7,18,0)');
      ctx.fillStyle=g;ctx.fillRect(0,0,W,H*0.22);
    };
    // Gradient jos subtil
    const bgB=()=>{
      const g=ctx.createLinearGradient(0,H*0.78,0,H);
      g.addColorStop(0,'rgba(3,7,18,0)');g.addColorStop(1,'rgba(3,7,18,0.70)');
      ctx.fillStyle=g;ctx.fillRect(0,H*0.78,W,H*0.22);
    };
    // Card mic, transparent
    const card=(x,y,w,h)=>{
      ctx.save();ctx.fillStyle='rgba(5,10,28,0.72)';ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=1;
      const r=8;ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r);ctx.lineTo(x+w,y+h-r);ctx.arcTo(x+w,y+h,x+w-r,y+h,r);ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r);ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();
    };
    const lbl=(txt,x,y,clr='rgba(148,163,184,0.85)',sz=W*0.007)=>{ctx.fillStyle=clr;ctx.font=`${sz}px "IBM Plex Mono",monospace`;ctx.textAlign='left';ctx.fillText(txt,x,y);};
    const big=(txt,x,y,clr='#D4AF37',sz=W*0.05)=>{ctx.fillStyle=clr;ctx.font=`900 ${sz}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(txt,x,y);};
    const bar=(x,y,w,h,pct,clr)=>{ctx.fillStyle='rgba(255,255,255,0.07)';ctx.fillRect(x,y,w,h);ctx.fillStyle=clr;ctx.fillRect(x,y,w*Math.min(1,Math.max(0,pct)),h);};
    const gl=(x,y,wm,tr)=>{const w=wm*tr;const g=ctx.createLinearGradient(x,y,x+w,y);g.addColorStop(0,'#D4AF37');g.addColorStop(1,'rgba(212,175,55,0)');ctx.fillStyle=g;ctx.fillRect(x,y,w,2);};
    // Progress bar jos
    const prog=()=>{
      al(0.65);
      ctx.fillStyle='rgba(255,255,255,0.08)';ctx.fillRect(W*0.15,H-22,W*0.7,2);
      ctx.fillStyle='#D4AF37';ctx.fillRect(W*0.15,H-22,W*0.7*((this._si+t)/this.SCENES.length),2);
      ctx.fillStyle='rgba(148,163,184,0.6)';ctx.font=`${W*0.006}px "IBM Plex Mono",monospace`;ctx.textAlign='center';
      ctx.fillText(`${this.SCENES[this._si]?.label||''} · ${this._si+1}/${this.SCENES.length}`,W/2,H-6);
      al(1);
    };
    // Film grain
    const grain=()=>{ctx.save();al(0.015);for(let i=0;i<120;i++){ctx.fillStyle=Math.random()>.5?'#fff':'#000';ctx.fillRect(Math.random()*W,Math.random()*H,1,1);}ctx.restore();};

    al(sA);bgT();bgB();

    switch(id){
    case 's1':{
      // Titlu mare + date sus
      al(sA*rE(0.08,0.25));
      lbl(`${(city.tip||'municipiu').toUpperCase()} · JUD. ${(city.judet||'—').toUpperCase()} · REG. ${city.regiune||'—'}`,W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      al(sA*rE(0.10,0.3));
      gl(W*0.05,H*0.135,W*0.5,rE(0.10,0.35));
      al(sA*rE(0.12,0.3));
      ctx.fillStyle='#ffffff';ctx.font=`900 ${Math.min(W*0.085,110)}px "Space Grotesk",sans-serif`;ctx.textAlign='left';
      ctx.fillText(name.toUpperCase(),W*0.05,H*0.24);
      ctx.fillStyle='#D4AF37';ctx.font=`700 ${W*0.012}px "Space Grotesk",sans-serif`;
      ctx.fillText('România · '+(city.regiune||'—'),W*0.055,H*0.285);
      // Card date jos
      al(sA*rE(0.25,0.25));
      card(W*0.05,H*0.82,W*0.88,H*0.10);
      al(sA*rE(0.25,0.25));
      [[N(pred.p21),'LOCUITORI 2021',W*0.09],[Math.round((city.suprafata_ha||pred.sup)/100)+' KM²','SUPRAFATA',W*0.28],[N(city.pib_eur_cap||9000)+' EUR','PIB/LOCUITOR',W*0.50],[(city.tip||'—').toUpperCase(),'TIP UAT',W*0.72]].forEach(([v,l2,x])=>{
        lbl(l2,x,H*0.855,'#D4AF37',W*0.0058);
        big(v,x,H*0.895,'#ffffff',W*0.022);
      });
      // Wikipedia
      if(t>0.40&&this._wikiText){
        al(sA*rE(0.40,0.25));
        card(W*0.05,H*0.64,W*0.65,H*0.075);
        al(sA*rE(0.40,0.25));
        ctx.fillStyle='rgba(200,215,240,0.80)';ctx.font=`${W*0.0065}px "IBM Plex Mono",monospace`;ctx.textAlign='left';
        const words=this._wikiText.split(' ');let line='',y=H*0.67;
        words.forEach(w=>{const test=line+w+' ';if(ctx.measureText(test).width>W*0.60&&line){ctx.fillText(line.trim(),W*0.07,y);y+=H*0.028;line=w+' ';}else line=test;});
        if(line)ctx.fillText(line.trim(),W*0.07,y);
      }
      al(sA*rE(0.55,0.3)*0.6);
      lbl('SURSE: INSE · EUROSTAT · ANCPI · BNR · WIKIPEDIA',W*0.05,H*0.775,'rgba(100,130,170,0.55)',W*0.006);
      break;
    }
    case 's2':{
      // Demografie — card mic stanga sus, harta cu densitate in dreapta
      al(sA*rE(0.05,0.2));
      lbl('PORTRETUL COMUNITATII · HARTA: DENSITATE UTR',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.45,rE(0.05,0.3));
      ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';
      al(sA*rE(0.07,0.25));ctx.fillText(name+' · Demografie & Profil',W*0.05,H*0.185);
      // Card compact stanga
      al(sA*rE(0.12,0.25));
      card(W*0.04,H*0.22,W*0.40,H*0.62);
      al(sA*rE(0.12,0.25));
      lbl('POPULATIE 2021',W*0.07,H*0.28,'#D4AF37',W*0.0065);
      big(N(pred.p21),W*0.07,H*0.37,'#ffffff',W*0.042);
      lbl(pred.trendLbl,W*0.07,H*0.41,pred.trendClr,W*0.0072);
      lbl('RATA ANUALA 2011-2021',W*0.07,H*0.47,'rgba(148,163,184,0.7)',W*0.006);
      big((pred.r10>=0?'+':'')+pred.r10.toFixed(2)+'%/AN',W*0.07,H*0.55,pred.trendClr,W*0.028);
      lbl('POP.2011: '+N(pred.p11)+' · VAR: '+(pred.p21>pred.p11?'+':'')+N(pred.p21-pred.p11),W*0.07,H*0.60,'rgba(100,130,170,0.7)',W*0.006);
      lbl('NATALITATE: '+pred.natalitate+'‰ · SOMAJ: '+pred.somaj+'%',W*0.07,H*0.65,'rgba(148,163,184,0.7)',W*0.006);
      lbl('SALARIU MED: '+N(pred.salariu)+' EUR/LUN',W*0.07,H*0.70,'rgba(148,163,184,0.7)',W*0.006);
      lbl('MIGRAT NETA: '+(pred.migNeta>=0?'+':'')+N(pred.migNeta)+'/AN',W*0.07,H*0.75,'rgba(148,163,184,0.7)',W*0.006);
      // Prognoze jos
      al(sA*rE(0.40,0.25));
      card(W*0.04,H*0.87,W*0.90,H*0.085);
      al(sA*rE(0.40,0.25));
      [[N(pred.pop55),'POPULATIE 2055',W*0.07,pred.trendClr],['~'+pred.anConv,'CONV. UE27',W*0.28,'#D4AF37'],[N(pred.defLoc)+' UN.','DEFICIT LOC.',W*0.49,'#ef4444'],[pred.sdgTotal+'/10','SDG11',W*0.70,'#22c55e']].forEach(([v,l2,x,c])=>{
        lbl(l2,x,H*0.895,'rgba(148,163,184,0.65)',W*0.0058);big(v,x,H*0.930,c,W*0.020);
      });
      break;
    }
    case 's3':{
      al(sA*rE(0.05,0.2));
      lbl('ECONOMIE & PUTERE DE CUMPARARE · HARTA: CLADIRI 3D',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.45,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Context European',W*0.05,H*0.185);
      al(sA*rE(0.12,0.25));card(W*0.04,H*0.22,W*0.40,H*0.60);al(sA*rE(0.12,0.25));
      lbl('PIB/LOCUITOR ACTUAL',W*0.07,H*0.28,'rgba(148,163,184,0.7)',W*0.006);
      big(N(pred.pib)+' EUR',W*0.07,H*0.38,'#D4AF37',W*0.038);
      lbl('VS MEDIA UE27: 36.600 EUR',W*0.07,H*0.42,'rgba(148,163,184,0.7)',W*0.006);
      bar(W*0.07,H*0.45,W*0.34,H*0.012,pred.pctUE/100*rE(0.20,0.3),'#D4AF37');
      big(pred.pctUE+'%',W*0.07,H*0.55,pred.pctUE>=75?'#22c55e':'#f59e0b',W*0.040);
      lbl('DIN MEDIA UE27',W*0.07,H*0.59,'#D4AF37',W*0.007);
      if(pred.pctUE<75)lbl('CONVERGENTA ~'+pred.anConv,W*0.07,H*0.63,'rgba(148,163,184,0.7)',W*0.006);
      lbl('PIB 2055: '+N(pred.pib55)+' EUR ('+pred.pctUE55+'% UE)',W*0.07,H*0.68,'#22c55e',W*0.007);
      lbl('RATA CRESTERE PIB: +'+pred.rPIB.toFixed(1)+'%/AN',W*0.07,H*0.73,'rgba(148,163,184,0.7)',W*0.006);
      break;
    }
    case 's4':{
      // Bare 3D cresc animat pe hartă — acesta e momentul cheie
      this._updateGrowth(t);
      al(sA*rE(0.05,0.2));
      lbl('UNDE CRESTE ORASUL — BARE 3D DIN PUG REAL · CRESC IN TIMP REAL',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.55,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Predictie Dezvoltare 2055',W*0.05,H*0.185);
      // 4 numere sus
      al(sA*rE(0.10,0.2));card(W*0.04,H*0.22,W*0.90,H*0.075);al(sA*rE(0.10,0.2));
      [[N(Math.round(pred.defLoc*eo(t)))+' UN.','DEFICIT LOCUINTE 2055','#ef4444',W*0.07],
       [N(pred.recHa||Math.round(pred.sup*0.04*pred.hub))+' HA','RECONVERSIE','#f59e0b',W*0.30],
       [N(pred.auth),'AUTORIZATII 2023','#22c55e',W*0.52],
       [(pred.r10>=0?'+':'')+pred.r10.toFixed(2)+'%/AN','RITM CRESTERE','#60a5fa',W*0.73]
      ].forEach(([v,l2,c,x])=>{lbl(l2,x,H*0.255,'rgba(148,163,184,0.65)',W*0.0058);big(v,x,H*0.285,c,W*0.020);});
      // Legenda bare
      al(sA*rE(0.15,0.2));card(W*0.04,H*0.85,W*0.90,H*0.09);al(sA*rE(0.15,0.2));
      lbl('LEGENDA: ',W*0.07,H*0.885,'rgba(148,163,184,0.65)',W*0.006);
      [['#ef4444','MAJOR — CC/CP'],['#f59e0b','MEDIU — CM/CB'],['#60a5fa','MIC — LA/LB'],['#22c55e','RECONVERSIE']].forEach(([c,txt],i)=>{
        ctx.fillStyle=c;ctx.fillRect(W*(0.18+i*0.20),H*0.875,W*0.025,10);
        lbl(txt,W*(0.21+i*0.20),H*0.886,c,W*0.0062);
      });
      // Concluzie cand se termina animatia
      if(t>0.75){
        const ta=Math.min(1,(t-0.75)/0.18);al(sA*ta);
        card(W*0.04,H*0.318,W*0.90,H*0.055);al(sA*ta);
        const txt=pred.r10>0.5?`⚡ ${name}: crestere accelerata. ${N(pred.defLoc)} unitati locative necesare pana in 2055. Risc sprawl fara PUG actualizat.`:pred.r10>0?`⚡ ${name}: crestere moderata. Reconversia (${N(pred.recHa||0)} ha) acopera 40% din deficit. Densificarea centrului preferata expansiunii.`:`⚡ ${name}: declin/stabilizare. Prioritate reabilitare fond existent. ROI maxim pe reconversie centru.`;
        ctx.fillStyle='#D4AF37';ctx.font=`${W*0.0062}px "IBM Plex Mono",monospace`;ctx.textAlign='left';ctx.fillText(txt.slice(0,120),W*0.07,H*0.354);
      }
      break;
    }
    case 's5':{
      al(sA*rE(0.05,0.2));
      lbl('MOBILITATE AUTO · HARTA: TRAFIC OSM — ROSU/GALBEN/VERDE=FLUID · VIOLET=CENTURA',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.55,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Presiunea Traficului',W*0.05,H*0.185);
      al(sA*rE(0.12,0.25));card(W*0.04,H*0.22,W*0.42,H*0.54);al(sA*rE(0.12,0.25));
      lbl('GRAD MOTORIZARE',W*0.07,H*0.27,'#D4AF37',W*0.007);
      [[2024,pred.mot24,'rgba(148,163,184,0.9)',0.14],[2035,Math.min(660,Math.round(pred.mot24*1.18)),'#f59e0b',0.22],[2055,Math.min(710,Math.round(pred.mot24*1.30)),'#ef4444',0.30]].forEach(([yr,val,c,td],i)=>{
        al(sA*rE(td,0.2));lbl(yr+'',W*0.07,H*(0.325+i*0.085),'rgba(100,130,170,0.7)',W*0.006);big(N(Math.round(val)),W*0.15,H*(0.325+i*0.085),c,W*0.022);lbl('veh/1000',W*0.30,H*(0.325+i*0.085),c,W*0.006);bar(W*0.07,H*(0.340+i*0.085),W*0.36,H*0.012,val/710*rE(td+0.05,0.25),c);
      });
      al(sA*rE(0.38,0.25));lbl('AN SATURARE: ~'+pred.satAn,W*0.07,H*0.575,pred.satAn<=2040?'#ef4444':'#f59e0b',W*0.008);lbl('FLUX ORA VARF: '+N(pred.fluxOra)+' veh/h',W*0.07,H*0.620,'rgba(148,163,184,0.7)',W*0.007);
      // Card dreapta
      al(sA*rE(0.30,0.25));card(W*0.50,H*0.22,W*0.46,H*0.54);al(sA*rE(0.30,0.25));
      lbl('SOLUTII NECESARE',W*0.53,H*0.27,'#D4AF37',W*0.007);
      lbl('PASAJE DENIVELATE: '+pred.pasaje+' buc.',W*0.53,H*0.33,'rgba(200,215,240,0.85)',W*0.007);
      lbl('VARIANTE OCOLITOARE: ~'+Math.ceil(pred.hub*12)+' KM',W*0.53,H*0.375,'rgba(200,215,240,0.85)',W*0.007);
      lbl('CENTURA: '+(pred.hub>=1.4?'URGENTA':'RECOMANDATA'),W*0.53,H*0.420,pred.hub>=1.4?'#ef4444':'#f59e0b',W*0.008);
      lbl('COST TOTAL MOBILITATE: '+N(pred.invMob)+' M EUR',W*0.53,H*0.475,'#D4AF37',W*0.007);
      break;
    }
    case 's6':{
      al(sA*rE(0.05,0.2));
      lbl('TRANSPORT PUBLIC · HARTA: ALBASTRU=ACOPERIRE TP · VIOLET=BRT PROPUS',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.5,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Acoperire Transport',W*0.05,H*0.185);
      al(sA*rE(0.12,0.25));card(W*0.04,H*0.22,W*0.42,H*0.54);al(sA*rE(0.12,0.25));
      lbl('ACOPERIRE TP ACTUALA',W*0.07,H*0.28,'#60a5fa',W*0.007);
      big(pred.tp+'%',W*0.07,H*0.38,pred.tp>=70?'#22c55e':pred.tp>=50?'#f59e0b':'#ef4444',W*0.048);
      lbl('DIN POPULATIE ACOPERITA',W*0.07,H*0.42,'#D4AF37',W*0.007);
      bar(W*0.07,H*0.445,W*0.36,H*0.012,pred.tp/100*rE(0.22,0.3),pred.tp>=70?'#22c55e':pred.tp>=50?'#f59e0b':'#ef4444');
      lbl('DEFICIT: '+pred.defTP+'pp vs standard 75%',W*0.07,H*0.495,'rgba(148,163,184,0.7)',W*0.006);
      al(sA*rE(0.30,0.25));card(W*0.50,H*0.22,W*0.46,H*0.54);al(sA*rE(0.30,0.25));
      lbl('BRT NECESAR',W*0.53,H*0.28,'#a78bfa',W*0.007);
      big(pred.kmBRT+' KM',W*0.53,H*0.37,'#a78bfa',W*0.038);
      lbl('COST: '+N(pred.costBRT||Math.round(pred.kmBRT*3.5))+' M EUR',W*0.53,H*0.41,'rgba(148,163,184,0.7)',W*0.007);
      lbl('STATII NOI: '+N(pred.statiiNoi||0),W*0.53,H*0.46,'rgba(148,163,184,0.7)',W*0.007);
      lbl('SUMP ~'+pred.anSUMP,W*0.53,H*0.51,'#D4AF37',W*0.008);
      break;
    }
    case 's7':{
      al(sA*rE(0.05,0.2));
      lbl('RISC SEISMIC · HARTA: GRADIENT SEISMIC + CLADIRI VULNERABILE',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.5,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Fond Vulnerabil',W*0.05,H*0.185);
      const agC=pred.ag>=0.30?'#ef4444':pred.ag>=0.20?'#f59e0b':'#22c55e';
      al(sA*rE(0.12,0.25));card(W*0.04,H*0.22,W*0.42,H*0.55,agC+'22');al(sA*rE(0.12,0.25));
      lbl('ACCELERATIE SEISMICA P100',W*0.07,H*0.28,agC,W*0.007);
      big('ag='+pred.ag.toFixed(2)+'g',W*0.07,H*0.38,agC,W*0.042);
      lbl('FOND RISC RS I-III',W*0.07,H*0.43,'rgba(148,163,184,0.7)',W*0.007);
      big(N(pred.fond)+' CL.',W*0.07,H*0.53,'#ef4444',W*0.035);
      lbl('FARA INTERVENTIE 2045: '+N(Math.round(pred.fond*1.12))+' CL.',W*0.07,H*0.57,'#f59e0b',W*0.007);
      al(sA*rE(0.30,0.25));card(W*0.50,H*0.22,W*0.46,H*0.55);al(sA*rE(0.30,0.25));
      lbl('PNRR REABILITARE',W*0.53,H*0.28,'#22c55e',W*0.007);
      big(N(Math.round(pred.fond*0.25)),W*0.53,H*0.37,'#22c55e',W*0.038);lbl('APT. REABILITATE EST.',W*0.53,H*0.41,'#22c55e',W*0.006);
      big(N(Math.round(pred.fond*0.085))+' M',W*0.53,H*0.50,'#D4AF37',W*0.028);lbl('COST TOTAL EUR',W*0.53,H*0.54,'#D4AF37',W*0.006);
      lbl('AN ELIMINARE FOND: ~'+Math.round(2025+pred.fond/Math.max(1,pred.fond*0.25/10)),W*0.53,H*0.58,'rgba(148,163,184,0.7)',W*0.007);
      break;
    }
    case 's8':{
      al(sA*rE(0.05,0.2));
      lbl('CLIMA & INUNDATII · HARTA: ALBASTRU=INUNDABIL · GALBEN=AUTOSTRADA · PORTOCALIU=CENTURA',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.55,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Vulnerabilitate Climatica',W*0.05,H*0.185);
      al(sA*rE(0.12,0.25));card(W*0.04,H*0.22,W*0.42,H*0.55);al(sA*rE(0.12,0.25));
      lbl('ZILE CANICULARE >35°C',W*0.07,H*0.28,'#f59e0b',W*0.007);
      big(pred.zile24+' ZILE/AN',W*0.07,H*0.37,'#f59e0b',W*0.032);lbl('2024 ACTUAL',W*0.07,H*0.41,'rgba(148,163,184,0.7)',W*0.006);
      big(Math.round(pred.zile24*2.2)+' ZILE/AN',W*0.07,H*0.505,'#ef4444',W*0.032);lbl('2055 PROIECTIE RCP4.5',W*0.07,H*0.545,'rgba(148,163,184,0.7)',W*0.006);
      lbl('UHI: +'+Math.round(2+pred.hub*0.8)+'°C vs rural',W*0.07,H*0.585,'#f97316',W*0.007);
      al(sA*rE(0.30,0.25));card(W*0.50,H*0.22,W*0.46,H*0.55);al(sA*rE(0.30,0.25));
      lbl('COST ADAPTARE',W*0.53,H*0.28,'#22c55e',W*0.007);
      big(N(Math.round(pred.p21/10000*1.8))+' M EUR',W*0.53,H*0.37,'#22c55e',W*0.030);
      lbl('COST INACTIUNE ×4.5',W*0.53,H*0.42,'rgba(148,163,184,0.7)',W*0.007);
      big(N(Math.round(pred.p21/10000*1.8*4.5))+' M EUR',W*0.53,H*0.51,'#ef4444',W*0.030);
      lbl('ROI ADAPTARE: +350%',W*0.53,H*0.56,'#22c55e',W*0.008);
      break;
    }
    case 's9':{
      al(sA*rE(0.05,0.2));
      lbl('PROIECTIE 2055 · HARTA: INELE EXTINDERE INTRAVILAN 2011→2021→2035→2055',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.6,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Unde Suntem in 2055?',W*0.05,H*0.185);
      // 3 scenarii
      const rB=pred.rRef;
      [[rB-0.8,'S1 REGRES','#ef4444'],[rB,'S2 TENDINTA','#f59e0b'],[rB+0.9,'S3 OPTIMIST','#22c55e']].forEach(([r,lbl2,c],i)=>{
        const pop=Math.round(pred.p21*Math.pow(1+r/100,34));
        const delta=pop-pred.p21;
        al(sA*rE(0.12+i*0.12,0.25));card(W*(0.04+i*0.32),H*0.23,W*0.30,H*0.50);al(sA*rE(0.12+i*0.12,0.25));
        ctx.fillStyle=c;ctx.font=`900 ${W*0.016}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(lbl2,W*(0.07+i*0.32),H*0.285);
        lbl('POPULATIE 2055',W*(0.07+i*0.32),H*0.330,'rgba(148,163,184,0.7)',W*0.006);
        big(N(pop),W*(0.07+i*0.32),H*0.405,c,W*0.032);
        lbl((delta>=0?'+':'')+N(delta)+' vs 2021',W*(0.07+i*0.32),H*0.445,'rgba(200,215,240,0.8)',W*0.0065);
        lbl((r>=0?'+':'')+r.toFixed(2)+'%/an',W*(0.07+i*0.32),H*0.475,'rgba(100,130,170,0.6)',W*0.006);
        bar(W*(0.07+i*0.32),H*0.495,W*0.27,H*0.012,Math.max(0.2,pop/Math.round(pred.p21*Math.pow(1+(rB+0.9)/100,34)))*rE(0.15+i*0.12,0.3),c);
      });
      al(sA*rE(0.55,0.3));card(W*0.04,H*0.82,W*0.90,H*0.065);al(sA*rE(0.55,0.3));
      const pMin=Math.round(pred.p21*Math.pow(1+(rB-0.8)/100,34)),pMax=Math.round(pred.p21*Math.pow(1+(rB+0.9)/100,34));
      lbl('INTERVAL 90%: ['+N(pMin)+' — '+N(pMax)+'] LOC. · S2 TENDINTA: ~55%',W*0.07,H*0.862,'rgba(148,163,184,0.7)',W*0.007);
      break;
    }
    case 's10':{
      al(sA*rE(0.05,0.2));
      lbl('INFRASTRUCTURA NECESARA 2025-2055 · HARTA: DENSITATE ZONE',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.55,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText('Ce construim in '+name+' pana in 2055?',W*0.05,H*0.185);
      al(sA*rE(0.10,0.2));card(W*0.04,H*0.22,W*0.90,H*0.055);al(sA*rE(0.10,0.2));
      lbl('BAZA: '+(pred.deltaP>=0?'+':'')+N(pred.deltaP)+' LOC. · '+N(pred.p21)+' → '+N(pred.pop55)+' · 2021-2055 · MEC 400 EL/UN · MS 1800 PAC/CAB · OMS 9MP/LOC',W*0.07,H*0.255,'rgba(148,163,184,0.65)',W*0.0060);
      const items=[['🏫','SCOLI & GRADINITE',pred.scoliNoi+pred.gradNoi,'unitati','#60a5fa'],['🏥','CABINETE MED.',pred.cabMed,'cab.','#ef4444'],['🌳','SPATII VERZI',pred.svHa,'ha','#22c55e'],['🚌','STATII TP',pred.statiiNoi||0,'statii','#f59e0b'],['⚡','RETELE',Math.round(Math.max(0,pred.deltaP)/5000),'km','#D4AF37']];
      items.forEach((it,i)=>{
        const col=i%3,row=Math.floor(i/3);
        const x=W*(0.04+col*0.32),y=H*(0.30+row*0.28);
        al(sA*rE(0.15+i*0.06,0.2));card(x,y,W*0.30,H*0.24);al(sA*rE(0.15+i*0.06,0.2));
        ctx.font=`${W*0.018}px sans-serif`;ctx.textAlign='left';ctx.fillText(it[0],x+W*0.01,y+H*0.065);
        lbl(it[1],x+W*0.055,y+H*0.058,it[4],W*0.0060);
        big('+'+N(it[2]),x+W*0.01,y+H*0.155,it[4],W*0.030);
        lbl(it[3],x+W*0.01,y+H*0.195,'#D4AF37',W*0.006);
      });
      al(sA*rE(0.65,0.2));card(W*0.04,H*0.90,W*0.90,H*0.060);al(sA*rE(0.65,0.2));
      lbl('NECESAR: '+N(pred.invTotal)+' M EUR · MOB '+N(pred.invMob)+' · SOC '+N(pred.invSoc)+' · EU ACOPERA ~60%',W*0.07,H*0.937,'#D4AF37',W*0.0065);
      break;
    }
    case 's11':{
      al(sA*rE(0.05,0.2));
      lbl('CALITATE VIATA SDG11 · HARTA: SPATII VERZI COLORATE',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.5,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Locul Tau in Europa',W*0.05,H*0.185);
      // Spider SDG
      const ar=rE(0.12,0.35);al(sA*ar);
      const cxR=W*0.23,cyR=H*0.54,radR=H*0.20;
      const dims=[{l:'Spatii Verzi',s:Math.min(10,Math.round(pred.sv/9*10)),c:'#22c55e'},{l:'Transport',s:Math.min(10,Math.round(pred.tp/75*10)),c:'#60a5fa'},{l:'Economie',s:Math.min(10,Math.round(pred.pctUE/100*10)),c:'#D4AF37'},{l:'Seismic',s:Math.min(10,Math.round((1-pred.fond/(pred.p21*0.02))*10)),c:'#ef4444'}];
      [0.25,0.5,0.75,1.0].forEach(fr=>{ctx.strokeStyle=`rgba(255,255,255,${fr*0.06})`;ctx.lineWidth=1;ctx.beginPath();dims.forEach((d,i)=>{const a=(i/dims.length)*Math.PI*2-Math.PI/2,r=radR*fr;if(i===0)ctx.moveTo(cxR+r*Math.cos(a),cyR+r*Math.sin(a));else ctx.lineTo(cxR+r*Math.cos(a),cyR+r*Math.sin(a));});ctx.closePath();ctx.stroke();});
      ctx.fillStyle='rgba(212,175,55,0.18)';ctx.strokeStyle='#D4AF37';ctx.lineWidth=2;ctx.beginPath();
      dims.forEach((d,i)=>{const a=(i/dims.length)*Math.PI*2-Math.PI/2,r=radR*(d.s/10)*ar;if(i===0)ctx.moveTo(cxR+r*Math.cos(a),cyR+r*Math.sin(a));else ctx.lineTo(cxR+r*Math.cos(a),cyR+r*Math.sin(a));});ctx.closePath();ctx.fill();ctx.stroke();
      dims.forEach((d,i)=>{const a=(i/dims.length)*Math.PI*2-Math.PI/2,r=radR*(d.s/10)*ar;ctx.fillStyle=d.c;ctx.beginPath();ctx.arc(cxR+r*Math.cos(a),cyR+r*Math.sin(a),6,0,Math.PI*2);ctx.fill();lbl(d.l+' '+d.s+'/10',cxR+(radR+22)*Math.cos(a)-28,cyR+(radR+22)*Math.sin(a)+5,d.c,W*0.006);});
      al(sA*rE(0.38,0.25));big(pred.sdgTotal+'/10',cxR-W*0.04,cyR+H*0.035,pred.sdgTotal>=7?'#22c55e':pred.sdgTotal>=5?'#f59e0b':'#ef4444',W*0.048);lbl('SCOR SDG11',cxR-W*0.02,cyR+H*0.072,'#D4AF37',W*0.006);
      // Peers
      al(sA*rE(0.35,0.3));card(W*0.52,H*0.22,W*0.44,H*0.62);al(sA*rE(0.35,0.3));
      lbl('PEER GROUP EUROPEAN',W*0.55,H*0.27,'#a78bfa',W*0.007);
      const peers=pred.p21>200000?[{n:'Brno (CZ)',pib:22100,tp:72},{n:'Lodz (PL)',pib:16800,tp:68},{n:'Plovdiv (BG)',pib:12400,tp:61}]:pred.p21>80000?[{n:'Olomouc (CZ)',pib:18200,tp:65},{n:'Rzeszow (PL)',pib:14600,tp:62},{n:'Stara Zagora',pib:11200,tp:55}]:[{n:'Hradec Kr.',pib:17100,tp:63},{n:'Tarnow (PL)',pib:12800,tp:58},{n:'Vidin (BG)',pib:8400,tp:44}];
      [{n:name,pib:pred.pib,tp:pred.tp,self:true},...peers].forEach((p,i)=>{
        const y2=H*(0.325+i*0.085),cl=p.self?'#D4AF37':'rgba(200,215,240,0.8)';
        if(p.self){ctx.fillStyle='rgba(212,175,55,0.10)';ctx.fillRect(W*0.52,y2-H*0.020,W*0.44,H*0.042);}
        lbl(p.n,W*0.55,y2,cl,W*0.007);lbl(N(p.pib)+' €',W*0.74,y2,cl,W*0.006);lbl(p.tp+'% TP',W*0.87,y2,cl,W*0.006);
      });
      const bP=peers[0];al(sA*rE(0.60,0.25));lbl('GAP vs '+bP.n+': PIB +'+ N(bP.pib-pred.pib)+' € · TP +'+(bP.tp-pred.tp)+'pp',W*0.52,H*0.88,'#a78bfa',W*0.006);
      break;
    }
    case 's12':{
      // Viziunea 2055 — harta roteste, cladiri 3D la max
      const gBg=ctx.createRadialGradient(W/2,H,0,W/2,H,W*0.7);
      gBg.addColorStop(0,'rgba(15,8,3,0.35)');gBg.addColorStop(1,'rgba(3,7,18,0.55)');
      ctx.fillStyle=gBg;ctx.fillRect(0,0,W,H);
      // Watermark 2055
      al(sA*rE(0.05,0.4)*0.07);ctx.fillStyle='#D4AF37';ctx.font=`900 ${W*0.28}px "Space Grotesk",sans-serif`;ctx.textAlign='center';ctx.fillText('2055',W/2,H*0.62);
      al(sA);
      // Titlu centrat
      al(sA*rE(0.10,0.25));ctx.fillStyle='rgba(148,163,184,0.6)';ctx.font=`${W*0.008}px "IBM Plex Mono",monospace`;ctx.textAlign='center';ctx.fillText('VIZIUNEA 2055 — ORASUL POSIBIL',W/2,H*0.175);
      al(sA*rE(0.14,0.28));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.065}px "Space Grotesk",sans-serif`;ctx.fillText(name.toUpperCase(),W/2,H*0.285);
      ctx.fillStyle='#D4AF37';ctx.font=`700 ${W*0.012}px "Space Grotesk",sans-serif`;
      const sub=pred.rRef>0.5?'UN ORAS IN CRESTERE CARE ALEGE SA CREASCA INTELIGENT':pred.rRef>0?'UN ORAS CARE POATE DEVENI MOTOR REGIONAL':'UN ORAS CARE ALEGE CALITATEA, NU CANTITATEA';
      ctx.fillText(sub,W/2,H*0.330);
      // Linie
      al(sA*rE(0.20,0.25));const gl2=ctx.createLinearGradient(W*0.1,0,W*0.9,0);gl2.addColorStop(0,'rgba(212,175,55,0)');gl2.addColorStop(0.5,'#D4AF37');gl2.addColorStop(1,'rgba(212,175,55,0)');ctx.fillStyle=gl2;ctx.fillRect(W*0.1,H*0.355,W*0.8,2);
      // Agenda stanga
      al(sA*rE(0.22,0.28));card(W*0.04,H*0.38,W*0.38,H*0.48);al(sA*rE(0.22,0.28));
      lbl('AGENDA 2025-2030',W*0.07,H*0.425,'#D4AF37',W*0.007);
      pred.agenda.forEach((pr,i)=>{
        al(sA*rE(0.26+i*0.07,0.2));
        ctx.fillStyle=pr.c;ctx.font=`900 ${W*0.016}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText((i+1)+'.',W*0.07,H*(0.475+i*0.075));
        ctx.fillStyle='rgba(220,230,255,0.88)';ctx.font=`${W*0.011}px "Space Grotesk",sans-serif`;ctx.fillText(pr.lbl,W*0.10,H*(0.475+i*0.075));
        bar(W*0.07,H*(0.485+i*0.075),W*0.32,H*0.008,Math.min(1,pr.score/80)*rE(0.28+i*0.07,0.2),pr.c);
      });
      // Concluzii dreapta
      al(sA*rE(0.30,0.28));card(W*0.56,H*0.38,W*0.40,H*0.48);al(sA*rE(0.30,0.28));
      lbl('CU CE RAMANEM',W*0.59,H*0.425,'#D4AF37',W*0.007);
      [{ok:pred.pop55>pred.p21,txt:'Pop.2055: '+N(pred.pop55)+' ('+(pred.pop55>pred.p21?'CRESTERE':'SCADERE')+')'},{ok:pred.pctUE55>=75,txt:'PIB 2055: '+N(pred.pib55)+' EUR ('+pred.pctUE55+'% UE)'},{ok:pred.anSUMP<=2035,txt:'SUMP atingibil ~'+pred.anSUMP},{ok:pred.sdgTotal>=6,txt:'SDG11: '+pred.sdgTotal+'/10'},{ok:Math.round(2025+pred.fond/Math.max(1,pred.fond*0.25/10))<=2045,txt:'Fond seismic eliminat ~'+Math.round(2025+pred.fond/Math.max(1,pred.fond*0.25/10))}].forEach((c2,i)=>{
        al(sA*rE(0.34+i*0.06,0.2));
        ctx.fillStyle=c2.ok?'#22c55e':'#f59e0b';ctx.font=`700 ${W*0.016}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(c2.ok?'✓':'◎',W*0.59,H*(0.478+i*0.075));
        lbl(c2.txt,W*0.62,H*(0.480+i*0.075),'rgba(220,230,255,0.88)',W*0.0065);
      });
      // Footer
      al(sA*rE(0.65,0.3));ctx.fillStyle='rgba(212,175,55,0.15)';ctx.fillRect(0,H*0.912,W,H*0.088);ctx.fillStyle='#D4AF37';ctx.font=`${W*0.007}px "IBM Plex Mono",monospace`;ctx.textAlign='center';ctx.fillText('UrbanX TSS·FG · PLATFORMA NATIONALA URBANISM DIGITAL',W/2,H*0.942);ctx.fillStyle='rgba(148,163,184,0.5)';ctx.font=`${W*0.0058}px "IBM Plex Mono",monospace`;ctx.fillText('© 2026 ThinkSmart Solutions SRL · Valori orientative · '+name+' · '+new Date().toLocaleDateString('ro-RO'),W/2,H*0.970);
      break;
    }
    } // end switch
    prog();
    // grain minimal
    ctx.save();al(0.012);for(let i=0;i<80;i++){ctx.fillStyle=Math.random()>.5?'#fff':'#000';ctx.fillRect(Math.random()*W,Math.random()*H,1,1);}ctx.restore();
    al(1);
  }, // end _draw

  _getCityKey(){
    const f=typeof window.TCI!=='undefined'?window.TCI?.cityKey:null;
    const l=typeof localStorage!=='undefined'?localStorage.getItem('ux_last_city'):null;
    return f||l||Object.keys(window._RO_CITIES_DB||{})[0]||'RO-IS-01';
  }
};

// ── INIT ────────────────────────────────────────────────────────────────────
(function(){
  window._SceneEngine=G._SceneEngine;
  window._PredEngine=_PRED;
  console.log('[TCI Cinematic v6.0] ✅ Ready');
  const patch=(n)=>{
    if(typeof TCI!=='undefined'&&typeof window.openTCI==='function'){
      const orig=window.openTCI;
      window.openTCI=function(opts){if(opts?.mode==='cinema_v2'||opts?.scenes||window._preferCinemaV2){G._SceneEngine.launch(opts?.cityKey||G._SceneEngine._getCityKey());}else{orig?.(opts);}};
      window._switchToCinemaV2=()=>{window._preferCinemaV2=true;ss('🎬 Cinema v6 activ');};
      window._switchToTCIClassic=()=>{window._preferCinemaV2=false;ss('📊 TCI Clasic activ');};
    }else if(n<40)setTimeout(()=>patch(n+1),500);
  };
  patch(0);
  ss('🎬 TCI Cinematic v6.0 — harta animata · layere Mapbox reale · 12 scene');
})();

})(window);
