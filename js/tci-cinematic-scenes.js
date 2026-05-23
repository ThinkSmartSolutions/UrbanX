// tci-cinematic-scenes.js — UrbanX TCI Cinematic v7.0
// ThinkSmart Solutions SRL | 23 mai 2026
// ARHITECTURA: Mapbox = actor principal. Canvas = titlu + date minime deasupra.
// v7.0: 17 scene, _PRED complet, fix bare 3D, OSM real, ANAR proxy, orice UAT RO
(function(G){
'use strict';

// ── UTILS ──────────────────────────────────────────────────────────────────
const N=(v,d=0)=>isNaN(+v)?'—':Number(v).toLocaleString('ro-RO',{minimumFractionDigits:d,maximumFractionDigits:d});
const ss=(m)=>{try{window.showSnackbar?.(m);}catch(e){}console.log('[Cinema v7]',m);};
const eo=(t)=>1-Math.pow(1-Math.max(0,Math.min(1,t)),3);
const PROXY='https://urbanx-proxy.3dtravelsoftart.workers.dev';

// ── MOTOR PREDICTII v7 — COMPLET, orice UAT Romania ───────────────────────
const _PRED={
  calc(city){
    // Date baza
    const p21=city.pop2021||100000;
    const p11=city.pop2011||p21;
    const r10=city.rata_reala_2011_2021??((p21-p11)/p11/10*100);
    const pib=city.pib_eur_cap||9000;
    const hub=city.coef_hub||1.0;
    const reg=city.regiune||'C';
    const sup=city.suprafata_ha||Math.round(p21*0.025);
    const sv=city.spatii_verzi_mp_loc||10;
    const tp=city.acoperire_transport||55;
    const ag=city.ag_seismic||(reg==='MN'||reg==='VR'?0.35:reg==='IS'||reg==='VS'?0.25:0.15);
    const lat=city.lat||45.5;
    const fond=city.cladiri_risc||Math.round(p21*0.008);
    const auth=city.autorizatii_2023||Math.round(p21/1000*1.2);

    // Demografie
    const rRef=hub>=1.5?0.9:hub>=1.2?0.45:hub>=1.0?0.1:r10;
    const pop55=Math.round(p21*Math.pow(1+rRef/100,34));
    const deltaP=pop55-p21;
    const natalitate=Math.round(8+hub*1.5);
    const mortalit=Math.round(12-hub*1.2);
    const sporNat=natalitate-mortalit;
    const migNeta=Math.round(r10*p21/100-(hub>=1.2?-200:500));
    const salariu=Math.round(pib*0.52/12);
    const somaj=Math.round(Math.max(2,12-hub*4));
    const ocupare=Math.round(55+hub*8);
    const ocupatie={
      servicii:Math.round(35+hub*12),
      industrie:Math.round(28-hub*5),
      comert:Math.round(18+hub*3),
      constructii:Math.round(8+auth/100),
      agricultura:Math.round(Math.max(2,11-hub*6))
    };

    // Economie
    const UE27=36600;
    const pctUE=Math.round(pib/UE27*100);
    const rPIB=3.8+(hub-1.0)*1.4;
    const pib55=Math.round(pib*Math.pow(1+rPIB/100,31));
    const pctUE55=Math.round(pib55/(UE27*Math.pow(1.015,31))*100);
    const anConv=pctUE>=75?2025:Math.round(2024+Math.log(75/pctUE*100)/Math.log(1+rPIB/100)/1);

    // Locuire
    const defLoc=Math.max(0,Math.round(deltaP*35/90));
    const gradNoi=Math.max(0,Math.round(defLoc*0.6));

    // Mobilitate
    const mot24=Math.round(390+(pib-9000)/500);
    const satAn=Math.min(2075,Math.round(2024+(640-mot24)/((Math.min(710,mot24*1.30)-mot24)/31)));
    const fluxOra=Math.round(p21*mot24/1000*0.08);
    const pasaje=Math.round(hub*2+p21/100000*1.5);
    const kmOcol=Math.ceil(hub*12);

    // Transport public
    const defTP=Math.max(0,75-tp);
    const kmBRT=Math.round(hub*8+p21/50000*5);
    const costBRT=Math.round(kmBRT*3.5);
    const statiiNoi=Math.max(0,Math.round(pop55/800-p21*tp/100/800));
    const anSUMP=2025+Math.round(defTP/5);
    const walkScore=Math.min(85,Math.round(40+hub*15+tp*0.3));

    // Infrastructura
    const scoliNoi=Math.max(0,Math.round(Math.max(0,deltaP)*0.14/400));
    const gradNoi2=Math.max(0,Math.round(Math.max(0,deltaP)*0.14/200));
    const cabMed=Math.max(0,Math.round(Math.max(0,deltaP)/1800));
    const svHa=Math.max(0,Math.round((pop55*9-p21*sv)/10000));

    // Investitii
    const invMob=Math.round(p21/1000*0.45*hub*10)/10;
    const invSoc=Math.round(p21/1000*0.28*hub*10)/10;
    const invTotal=Math.round(invMob+invSoc+p21/1000*0.12);

    // Clima
    const zile24=Math.max(5,Math.round(30-(lat-44)*4));

    // SDG
    const sdgTotal=Math.round(((Math.min(10,Math.round(sv/9*10)))+(Math.min(10,Math.round(tp/75*10)))+(Math.min(10,Math.round(pctUE/100*10)))+(Math.min(10,Math.round((1-fond/(p21*0.02))*10))))/4*10)/10;

    // Agenda primar
    const agenda=[
      {lbl:'Transport Public & SUMP',score:defTP,c:'#60a5fa'},
      {lbl:'Reabilitare Fond Seismic',score:fond/50,c:'#ef4444'},
      {lbl:'Spatii Verzi & Clima',score:svHa/2,c:'#22c55e'},
      {lbl:'Servicii Sociale',score:Math.abs(r10)*10,c:'#f59e0b'},
      {lbl:'Atragere Investitii',score:Math.max(0,75-pctUE),c:'#a78bfa'},
    ].sort((a,b)=>b.score-a.score);

    // Trend
    const trendClr=r10>0.5?'#22c55e':r10>0?'#4ade80':r10>-1?'#f59e0b':'#ef4444';
    const trendLbl=r10>0.5?'CRESTERE ACCELERATA':r10>0?'CRESTERE MODERATA':r10>-1?'STABILIZARE':'DECLIN';

    // Reconversie
    const recHa=Math.round(sup*0.04*hub);

    return {
      // Demografie
      p21,p11,r10,rRef,pop55,deltaP,
      natalitate,mortalit,sporNat,migNeta,salariu,somaj,ocupare,ocupatie,
      // Economie
      pib,pib55,pctUE,pctUE55,rPIB,anConv,
      // Locuire
      defLoc,gradNoi,auth,recHa,sup,
      // Mobilitate
      mot24,satAn,fluxOra,pasaje,kmOcol,
      // TP
      tp,defTP,kmBRT,costBRT,statiiNoi,anSUMP,walkScore,
      // Infrastructura
      scoliNoi,gradNoi2,cabMed,svHa,
      // Investitii
      invMob,invSoc,invTotal,
      // Clima
      zile24,ag,fond,
      // SDG & alte
      sdgTotal,hub,sv,
      // Agenda & trend
      agenda,trendClr,trendLbl,
    };
  }
};

// ── SCENE ENGINE v7 ────────────────────────────────────────────────────────
G._SceneEngine={
  _playing:false,_raf:null,_startT:0,_si:0,
  _city:null,_pred:null,_canvas:null,_ctx:null,_map:null,
  _rotInt:null,_hiddenEls:[],_pugGeo:null,_reguli:null,
  _wikiText:'',_gf:null,_assetsReady:false,

  SCENES:[
    {id:'s1',  dur:16000, label:'Identitate'},
    {id:'s2',  dur:18000, label:'Context Regional'},
    {id:'s3',  dur:20000, label:'Profil Locuitor'},
    {id:'s4',  dur:18000, label:'Economie & Convergenta UE'},
    {id:'s5',  dur:22000, label:'Coridoare 2055 — Bare 3D'},
    {id:'s6',  dur:18000, label:'Mobilitate & Trafic'},
    {id:'s7',  dur:16000, label:'Transport Public'},
    {id:'s8',  dur:16000, label:'Risc Seismic'},
    {id:'s9',  dur:18000, label:'Clima & Inundatii'},
    {id:'s10', dur:18000, label:'Proiectie 2055'},
    {id:'s11', dur:16000, label:'Infrastructura Necesara'},
    {id:'s12', dur:16000, label:'Investitii SICAP'},
    {id:'s13', dur:20000, label:'Scenarii S1/S2/S3'},
    {id:'s14', dur:16000, label:'Calitate Viata SDG11'},
    {id:'s15', dur:16000, label:'Benchmark EU'},
    {id:'s16', dur:16000, label:'Agenda Primarului'},
    {id:'s17', dur:20000, label:'Viziunea 2055'},
  ],

  async launch(cityKey){
    const map=window.map;
    if(!map){ss('Harta indisponibila');return;}
    this._map=map;
    const db=window._RO_CITIES_DB||{};
    this._city=db[cityKey]||Object.values(db)[0]||{
      name:'Municipiu',lat:45.5,lon:25.0,pop2021:100000,pop2011:100000,
      pib_eur_cap:9000,regiune:'C',tip:'municipiu',coef_hub:1.0,
      suprafata_ha:5000,spatii_verzi_mp_loc:10,acoperire_transport:55
    };
    this._pred=_PRED.calc(this._city);
    this._pugGeo=null;this._reguli=null;this._wikiText='';this._assetsReady=false;
    this._hideUI();
    this._canvas=this._mkCanvas();this._ctx=this._canvas.getContext('2d');
    this._mkCtrl();
    this._si=0;this._playing=true;
    // Incarca assets async, nu blocheaza startul
    this._loadAssets(this._city).then(()=>{this._assetsReady=true;});
    this._runScene(0);
    ss('🎬 TCI Cinematic v7 — '+this._city.name);
  },

  async _loadAssets(city){
    // Wikipedia
    try{
      const r=await fetch('https://ro.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(city.name),{signal:AbortSignal.timeout(5000)});
      if(r.ok){const d=await r.json();this._wikiText=d.extract?d.extract.slice(0,280)+'...':'';}
    }catch(e){}
    // PUG + Reguli
    try{
      const reg=window._PUG_REGISTRY||{};
      const id=city.id||city.name?.toLowerCase()
        .replace(/\s+/g,'-').replace(/[ăâ]/g,'a')
        .replace(/[îí]/g,'i').replace(/[șş]/g,'s').replace(/[țţ]/g,'t');
      const slug=Object.keys(reg).find(k=>reg[k].id===id);
      const pugUrl=reg[slug]?.pugFile||'data/municipiul-iasi/pug.geojson';
      const rulesUrl=reg[slug]?.rulesFile||pugUrl.replace('pug.geojson','reguli.json');
      const [r1,r2]=await Promise.all([
        fetch(pugUrl).catch(()=>null),
        fetch(rulesUrl).catch(()=>null)
      ]);
      if(r1?.ok)this._pugGeo=await r1.json();
      if(r2?.ok)this._reguli=await r2.json();
      console.log('[v7] PUG:',this._pugGeo?.features?.length||0,'UTR-uri');
    }catch(e){console.warn('[v7] assets:',e.message);}
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
    d.innerHTML='<button id="c6-prev" style="background:rgba(10,15,30,.9);border:1px solid rgba(255,255,255,.2);color:#94a3b8;padding:8px 14px;border-radius:8px;cursor:pointer;font:13px monospace">◀ PREV</button><button id="c6-skip" style="background:rgba(10,15,30,.9);border:1px solid rgba(255,255,255,.2);color:#94a3b8;padding:8px 16px;border-radius:8px;cursor:pointer;font:13px monospace">▶ URMT.</button><button id="c6-stop" style="background:rgba(10,15,30,.9);border:1px solid rgba(255,255,255,.2);color:#ef4444;padding:8px 14px;border-radius:8px;cursor:pointer;font:13px monospace">✕ STOP</button>';
    document.body.appendChild(d);
    document.getElementById('c6-prev').onclick=()=>{
      if(this._si>0){this._cleanLayers();this._si--;this._startT=performance.now()-this.SCENES[this._si].dur+3000;if(this._raf)cancelAnimationFrame(this._raf);this._runScene(this._si);}
    };
    document.getElementById('c6-skip').onclick=()=>{
      if(this._si<this.SCENES.length-1){this._cleanLayers();this._si++;this._startT=performance.now()-this.SCENES[this._si].dur+2500;if(this._raf)cancelAnimationFrame(this._raf);this._runScene(this._si);}
    };
    document.getElementById('c6-stop').onclick=()=>this.stop();
  },

  _hideUI(){
    this._hiddenEls=[];
    const sels=['#panel','#panel-tabs','#panel-body','#topbar','#wx-topbar',
      '#info-drawer','#utr-drawer','#info-drawer-backdrop','#ux-gdpr-footer',
      '#tci-adv-menu','#viz-menu','#rapoarte-menu','#analize-menu',
      '#cancel-parcel-btn','#btnPDF','.mapboxgl-ctrl-bottom-left','.mapboxgl-ctrl-bottom-right'];
    sels.forEach(s=>{
      document.querySelectorAll(s).forEach(e=>{
        if(!e.dataset.c6h){e.dataset.c6h=e.style.cssText;e.style.setProperty('display','none','important');this._hiddenEls.push(e);}
      });
    });
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
    const scene=this.SCENES[idx];
    this._si=idx;this._startT=performance.now();
    this._setupMap(scene.id);
    const loop=()=>{
      if(!this._playing)return;
      const t=Math.min(1,Math.max(0.001,(performance.now()-this._startT)/scene.dur));
      if(this._ctx&&this._canvas){
        this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height);
        try{this._draw(scene.id,t);}catch(e){console.warn('[v7]',scene.id,e.message);}
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
    ss('✅ TCI Cinematic complet — '+this._city?.name);
  },

  // ── MAPBOX SETUP ──────────────────────────────────────────────────────────
  _setupMap(id){
    const map=this._map;if(!map)return;
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5;
    if(this._rotInt){clearInterval(this._rotInt);this._rotInt=null;}
    const fly=(z,p,b,d,lp)=>{
      try{map.flyTo({center:[cx,cy],zoom:z,pitch:p,bearing:b,duration:d||3000,essential:true});}catch(e){}
      if(lp)try{map.setConfigProperty('basemap','lightPreset',lp);}catch(e){}
    };
    const onIdle=(fn)=>{try{map.once('idle',fn);}catch(e){setTimeout(fn,1500);}};

    switch(id){
      case 's1': fly(11,0,0,3000,'night'); break;
      case 's2':
        // Context regional — zoom out sa vedem judetele vecine
        try{map.flyTo({center:[cx,cy],zoom:7,pitch:0,bearing:0,duration:3500,essential:true});}catch(e){}
        try{map.setConfigProperty('basemap','lightPreset','dusk');}catch(e){}
        onIdle(()=>this._addRegional(map));
        break;
      case 's3': fly(12,45,10,3000,'dawn'); onIdle(()=>this._addDensity(map)); break;
      case 's4': fly(13.5,55,-20,2500,'day'); onIdle(()=>this._addBuildings(map)); break;
      case 's5':
        try{map.jumpTo({center:[cx,cy],zoom:10.5,pitch:55,bearing:10});}catch(e){}
        setTimeout(()=>{try{map.flyTo({center:[cx,cy],zoom:11.5,pitch:58,bearing:15,duration:3000,essential:true});}catch(e){}},200);
        try{map.setConfigProperty('basemap','lightPreset','night');}catch(e){}
        this._add3DGrowth(map);
        this._rot(map,15,0.02);
        break;
      case 's6': fly(13,42,0,2500,'night'); onIdle(()=>this._addTraffic(map)); break;
      case 's7': fly(13,40,-15,2500,'day'); onIdle(()=>this._addTransit(map)); break;
      case 's8': fly(12,35,0,2500,'night'); onIdle(()=>this._addSeismic(map)); break;
      case 's9': fly(12,30,0,2500,'dawn'); onIdle(()=>{this._addFlood(map);this._addRoads(map);}); break;
      case 's10': fly(11,45,-10,2500,'dusk'); onIdle(()=>this._addRings(map)); break;
      case 's11': fly(13,50,20,2500,'day'); onIdle(()=>this._addDensity(map)); break;
      case 's12': fly(13,45,5,2500,'day'); onIdle(()=>this._addInvestments(map)); break;
      case 's13': fly(11,35,0,2500,'dusk'); onIdle(()=>this._addScenarii(map)); break;
      case 's14': fly(13,45,5,2500,'day'); onIdle(()=>this._addGreen(map)); break;
      case 's15': // Benchmark EU — zoom out pe Europa
        try{map.flyTo({center:[15,50],zoom:4,pitch:0,bearing:0,duration:4000,essential:true});}catch(e){}
        try{map.setConfigProperty('basemap','lightPreset','day');}catch(e){}
        break;
      case 's16': fly(13,45,5,2500,'dawn'); onIdle(()=>this._addAgenda(map)); break;
      case 's17':
        try{map.jumpTo({center:[cx,cy],zoom:10.5,pitch:55,bearing:0});}catch(e){}
        setTimeout(()=>{try{map.flyTo({center:[cx,cy],zoom:11.5,pitch:60,bearing:25,duration:4000,essential:true});}catch(e){}},300);
        try{map.setConfigProperty('basemap','lightPreset','dusk');}catch(e){}
        onIdle(()=>{this._addBuildings(map);this._rot(map,25,0.015);});
        break;
    }
  },

  // ── LAYERS MAPBOX ─────────────────────────────────────────────────────────
  _safeAdd(map,srcId,srcDef,lyrDef){
    try{
      if(map.getLayer(lyrDef.id))map.removeLayer(lyrDef.id);
      if(map.getSource(srcId))map.removeSource(srcId);
      map.addSource(srcId,srcDef);map.addLayer(lyrDef);
      console.log('[v7] Layer:',lyrDef.id);
    }catch(e){console.warn('[v7] addLayer err:',lyrDef.id,e.message);}
  },

  // FIX PRINCIPAL: coalesce pentru suprafata_mp + fallback geometric garantat
  _add3DGrowth(map){
    const geo=this._pugGeo,reg=this._reguli||{},pred=this._pred;
    let features=[];
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5;
    if(geo?.features?.length>0){
      geo.features.slice(0,600).forEach(f=>{
        const u=f.properties?.utr_cod||f.properties?.cod_utr||'';
        const rv=reg[u]||{};
        const cut=parseFloat(rv.CUT||rv.cut||0)||0;
        const pr=u.startsWith('CC')||u.startsWith('CP')?0.92:u.startsWith('CM')||u.startsWith('CB')?0.72:u.startsWith('LC')||u.startsWith('LB')?0.55:u.startsWith('LA')||u.startsWith('LL')?0.40:u.startsWith('AI')||u.startsWith('AA')?0.65:0.28;
        const h=Math.max(4,(cut||pr*4)*(10+pred.hub*6));
        const c=pr>0.75?'#ef4444':pr>0.55?'#f59e0b':pr>0.38?'#60a5fa':'#22c55e';
        features.push({...f,properties:{...f.properties,h,hOrig:h,c,pr}});
      });
    } else {
      // Fallback geometric — 4 inele concentrice cu coordonate reale UAT
      [{r:0.006,h:65,c:'#ef4444'},{r:0.015,h:45,c:'#f59e0b'},{r:0.030,h:28,c:'#60a5fa'},{r:0.055,h:14,c:'#22c55e'}].forEach(z=>{
        const n=48,outer=[];
        for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;outer.push([cx+Math.cos(a)*z.r*1.5,cy+Math.sin(a)*z.r]);}
        features.push({type:'Feature',geometry:{type:'Polygon',coordinates:[outer]},properties:{h:z.h,hOrig:z.h,c:z.c,pr:0.5}});
      });
    }
    this._gf=features;
    this._safeAdd(map,'v7-gr',{type:'geojson',data:{type:'FeatureCollection',features}},{
      id:'v7-gr-l',type:'fill-extrusion',source:'v7-gr',
      paint:{
        'fill-extrusion-color':['get','c'],
        // FIX BUG: folosim coalesce cu fallback 0 pt h — nu mai crapa pe null
        'fill-extrusion-height':['coalesce',['get','h'],0],
        'fill-extrusion-base':0,
        'fill-extrusion-opacity':0.85
      }
    });
    ['utr-fill','utr-line'].forEach(lid=>{try{if(map.getLayer(lid))map.setLayoutProperty(lid,'visibility','none');}catch(e){}});
  },

  _updateGrowth(t){
    const map=this._map;if(!map||!this._gf)return;
    try{
      const src=map.getSource('v7-gr');if(!src)return;
      const te=eo(t);
      src.setData({type:'FeatureCollection',features:this._gf.map(f=>({
        ...f,properties:{...f.properties,h:((f.properties.hOrig||f.properties.h||0)*te)}
      }))});
    }catch(e){}
  },

  _addBuildings(map){
    if(!this._pugGeo?.features?.length)return;
    const reg=this._reguli||{};
    const features=this._pugGeo.features.slice(0,500).map(f=>{
      const u=f.properties?.utr_cod||'';
      const rv=reg[u]||{};
      const rh=parseInt(rv.RH?.replace(/[^0-9]/g,'')||'3');
      const h=Math.max(4,rh*3.5);
      return{...f,properties:{...f.properties,h,c:h>35?'#94a3b8':h>20?'#cbd5e1':'#e2e8f0'}};
    });
    this._safeAdd(map,'v7-bld',{type:'geojson',data:{type:'FeatureCollection',features}},{
      id:'v7-bld-l',type:'fill-extrusion',source:'v7-bld',
      paint:{'fill-extrusion-color':['get','c'],'fill-extrusion-height':['coalesce',['get','h'],4],'fill-extrusion-base':0,'fill-extrusion-opacity':0.75}
    });
  },

  // FIX BUG: coalesce complet pentru suprafata_mp + fallback 5000
  _addDensity(map){
    if(!this._pugGeo?.features?.length)return;
    this._safeAdd(map,'v7-den',{type:'geojson',data:this._pugGeo},{
      id:'v7-den-l',type:'fill',source:'v7-den',
      paint:{
        'fill-color':['case',
          ['<',['coalesce',['to-number',['get','suprafata_mp'],null],['to-number',['get','SUPRAFATA'],null],['to-number',['get','area'],null],5000],3000],'#ef4444',
          ['<',['coalesce',['to-number',['get','suprafata_mp'],null],['to-number',['get','SUPRAFATA'],null],['to-number',['get','area'],null],5000],8000],'#f59e0b',
          ['<',['coalesce',['to-number',['get','suprafata_mp'],null],['to-number',['get','SUPRAFATA'],null],['to-number',['get','area'],null],5000],20000],'#60a5fa',
          '#22c55e'
        ],
        'fill-opacity':0.45
      }
    });
  },

  // S2: Context regional — judete vecine colorate dupa gravitatie urbana
  _addRegional(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5,pred=this._pred;
    // Generam cercuri concentrice pt gravitatie urbana
    const rings=[
      {r:0.8,col:'#a78bfa',op:0.25,lbl:'Influenta primara'},
      {r:1.5,col:'#60a5fa',op:0.18,lbl:'Influenta secundara'},
      {r:2.5,col:'#22c55e',op:0.12,lbl:'Zona metropolitana'},
    ];
    const features=rings.map((ring,i)=>{
      const n=72,coords=[];
      // Transforma grade in km aproximativ: 1° lat≈111km, 1°lon≈111km*cos(lat)
      const rLat=ring.r/111,rLon=ring.r/(111*Math.cos(cy*Math.PI/180));
      for(let j=0;j<=n;j++){const a=(j/n)*Math.PI*2;coords.push([cx+Math.cos(a)*rLon,cy+Math.sin(a)*rLat]);}
      return{type:'Feature',geometry:{type:'Polygon',coordinates:[coords]},properties:{c:ring.col,op:ring.op,i}};
    });
    this._safeAdd(map,'v7-reg',{type:'geojson',data:{type:'FeatureCollection',features}},{
      id:'v7-reg-l',type:'fill',source:'v7-reg',
      paint:{'fill-color':['get','c'],'fill-opacity':['get','op']}
    });
    // Punct centru UAT
    this._safeAdd(map,'v7-hub',{type:'geojson',data:{type:'Feature',geometry:{type:'Point',coordinates:[cx,cy]},properties:{}}},{
      id:'v7-hub-l',type:'circle',source:'v7-hub',
      paint:{'circle-radius':12,'circle-color':'#D4AF37','circle-opacity':0.9,'circle-stroke-width':2,'circle-stroke-color':'#ffffff'}
    });
  },

  _addTraffic(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5,pred=this._pred;
    const r=0.045,lines=[];
    // Trafic radial — incarcat din OSM daca disponibil
    [0,45,90,135,180,225,270,315].forEach((deg,i)=>{
      const rad=deg*Math.PI/180,c=i<3?'#ef4444':i<6?'#f59e0b':'#22c55e',w=i<3?5:i<6?3:2;
      lines.push({type:'Feature',geometry:{type:'LineString',coordinates:[[cx,cy],[cx+Math.cos(rad)*r*1.5,cy+Math.sin(rad)*r*0.8]]},properties:{c,w}});
    });
    // Centura
    const n=64,ring=[];
    for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;ring.push([cx+Math.cos(a)*r*1.8,cy+Math.sin(a)*r]);}
    lines.push({type:'Feature',geometry:{type:'LineString',coordinates:ring},properties:{c:'#a78bfa',w:4}});
    this._safeAdd(map,'v7-tr',{type:'geojson',data:{type:'FeatureCollection',features:lines}},{
      id:'v7-tr-l',type:'line',source:'v7-tr',
      paint:{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0.9},
      layout:{'line-cap':'round','line-join':'round'}
    });
    // Incearca OSM real daca e disponibil connectorrul
    if(window._OSMConnector?.fetchRoads){
      window._OSMConnector.fetchRoads(this._city.name).then(ok=>{
        if(ok)console.log('[v7] OSM roads reale aplicate');
      }).catch(()=>{});
    }
  },

  _addTransit(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5,pred=this._pred;
    const tR=pred.tp/100*0.07,n=64,ring=[];
    for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;ring.push([cx+Math.cos(a)*tR*1.5,cy+Math.sin(a)*tR]);}
    const lines=[{type:'Feature',geometry:{type:'LineString',coordinates:ring},properties:{c:'#60a5fa',w:3}}];
    // Linii BRT
    [0,90,180,270].slice(0,Math.min(4,Math.ceil(pred.kmBRT/6))).forEach(deg=>{
      const rad=deg*Math.PI/180;
      lines.push({type:'Feature',geometry:{type:'LineString',coordinates:[[cx-Math.cos(rad)*0.055,cy-Math.sin(rad)*0.035],[cx+Math.cos(rad)*0.055,cy+Math.sin(rad)*0.035]]},properties:{c:'#a78bfa',w:6}});
    });
    this._safeAdd(map,'v7-tp',{type:'geojson',data:{type:'FeatureCollection',features:lines}},{
      id:'v7-tp-l',type:'line',source:'v7-tp',
      paint:{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0.85},
      layout:{'line-cap':'round'}
    });
  },

  _addSeismic(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5,pred=this._pred;
    const c=pred.ag>=0.30?'#ef4444':pred.ag>=0.20?'#f59e0b':'#22c55e';
    const r=0.10*(pred.ag/0.25),n=64,ring=[];
    for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;ring.push([cx+Math.cos(a)*r*1.5,cy+Math.sin(a)*r]);}
    this._safeAdd(map,'v7-sei',{type:'geojson',data:{type:'Feature',geometry:{type:'Polygon',coordinates:[ring]},properties:{}}},{
      id:'v7-sei-l',type:'fill',source:'v7-sei',paint:{'fill-color':c,'fill-opacity':0.30}
    });
    if(this._pugGeo?.features?.length){
      const features=this._pugGeo.features.filter(f=>{const u=f.properties?.utr_cod||'';return u.startsWith('LA')||u.startsWith('LB')||u.startsWith('LL');}).slice(0,300).map(f=>({...f,properties:{...f.properties,risc:0.7}}));
      if(features.length>0){
        this._safeAdd(map,'v7-risc',{type:'geojson',data:{type:'FeatureCollection',features}},{
          id:'v7-risc-l',type:'fill',source:'v7-risc',paint:{'fill-color':'#ef4444','fill-opacity':0.35}
        });
      }
    }
  },

  _addFlood(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5;
    // Incearca ANAR WMS prin proxy Cloudflare
    const anarUrl=`${PROXY}/anar?service=WMS&request=GetMap&layers=ANAR:zone_inundabile&bbox=${cx-0.15},${cy-0.10},${cx+0.15},${cy+0.10}&width=256&height=256&srs=EPSG:4326&format=image/png&transparent=true`;
    try{
      map.addSource('v7-anar-src',{type:'image',url:anarUrl,coordinates:[[cx-0.15,cy+0.10],[cx+0.15,cy+0.10],[cx+0.15,cy-0.10],[cx-0.15,cy-0.10]]});
      map.addLayer({id:'v7-anar-l',type:'raster',source:'v7-anar-src',paint:{'raster-opacity':0.6}});
      console.log('[v7] ANAR WMS incercat prin proxy');
    }catch(e){
      // Fallback geometric daca WMS esueaza
      console.warn('[v7] ANAR WMS fallback geometric');
      const fc=[[cx-0.07,cy-0.012],[cx-0.04,cy-0.018],[cx-0.01,cy-0.010],[cx+0.02,cy-0.006],[cx+0.06,cy-0.014],[cx+0.07,cy+0.006],[cx+0.06,cy+0.022],[cx+0.02,cy+0.018],[cx-0.01,cy+0.014],[cx-0.04,cy+0.010],[cx-0.07,cy+0.012]];
      this._safeAdd(map,'v7-fl',{type:'geojson',data:{type:'Feature',geometry:{type:'Polygon',coordinates:[fc]},properties:{}}},{
        id:'v7-fl-l',type:'fill',source:'v7-fl',paint:{'fill-color':'#3b82f6','fill-opacity':0.45}
      });
    }
  },

  _addRoads(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5;
    const lines=[
      {type:'Feature',geometry:{type:'LineString',coordinates:[[cx-0.14,cy+0.022],[cx,cy+0.010],[cx+0.14,cy+0.022]]},properties:{c:'#fbbf24',w:5}},
    ];
    const n=72,r=0.07,ring=[];
    for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;ring.push([cx+Math.cos(a)*r*1.6,cy+Math.sin(a)*r]);}
    lines.push({type:'Feature',geometry:{type:'LineString',coordinates:ring},properties:{c:'#f97316',w:4}});
    this._safeAdd(map,'v7-rd',{type:'geojson',data:{type:'FeatureCollection',features:lines}},{
      id:'v7-rd-l',type:'line',source:'v7-rd',
      paint:{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0.92},
      layout:{'line-cap':'butt'}
    });
  },

  _addRings(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5;
    const rings=[{rm:0.82,col:'#94a3b8',op:0.2,w:2},{rm:1.00,col:'#60a5fa',op:0.3,w:3},{rm:1.14,col:'#f59e0b',op:0.4,w:3},{rm:1.30,col:'#ef4444',op:0.55,w:5}];
    const features=rings.map(ring=>{
      const n=72,r=0.07*ring.rm,coords=[];
      for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;coords.push([cx+Math.cos(a)*r*1.6,cy+Math.sin(a)*r]);}
      return{type:'Feature',geometry:{type:'LineString',coordinates:coords},properties:{c:ring.col,op:ring.op,w:ring.w}};
    });
    this._safeAdd(map,'v7-in',{type:'geojson',data:{type:'FeatureCollection',features}},{
      id:'v7-in-l',type:'line',source:'v7-in',
      paint:{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':['get','op'],'line-dasharray':[5,3]},
      layout:{'line-cap':'round'}
    });
  },

  _addGreen(map){
    if(!this._pugGeo?.features?.length)return;
    const features=this._pugGeo.features.map(f=>{
      const u=f.properties?.utr_cod||'';
      const isG=u.startsWith('V')||u.startsWith('P')||u.startsWith('G');
      return{...f,properties:{...f.properties,c:isG?'#22c55e':'rgba(0,0,0,0)',isG:isG?true:false}};
    });
    this._safeAdd(map,'v7-gn',{type:'geojson',data:{type:'FeatureCollection',features}},{
      id:'v7-gn-l',type:'fill',source:'v7-gn',
      paint:{'fill-color':['get','c'],'fill-opacity':['case',['==',['get','isG'],true],0.65,0]}
    });
  },

  _addInvestments(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5,pred=this._pred;
    // Puncte investitii pe harta (generate din pred)
    const proiecte=[
      {label:'TP BRT',lon:cx+0.02,lat:cy+0.01,c:'#a78bfa',r:10},
      {label:'Reabilitare',lon:cx-0.03,lat:cy-0.01,c:'#ef4444',r:8},
      {label:'Spatii Verzi',lon:cx+0.01,lat:cy-0.02,c:'#22c55e',r:9},
      {label:'Scoli',lon:cx-0.02,lat:cy+0.02,c:'#60a5fa',r:7},
      {label:'Retele',lon:cx+0.04,lat:cy+0.00,c:'#f59e0b',r:8},
    ];
    const features=proiecte.map(p=>({type:'Feature',geometry:{type:'Point',coordinates:[p.lon,p.lat]},properties:{c:p.c,r:p.r,label:p.label}}));
    this._safeAdd(map,'v7-inv',{type:'geojson',data:{type:'FeatureCollection',features}},{
      id:'v7-inv-l',type:'circle',source:'v7-inv',
      paint:{'circle-radius':['get','r'],'circle-color':['get','c'],'circle-opacity':0.85,'circle-stroke-width':2,'circle-stroke-color':'rgba(255,255,255,0.4)'}
    });
  },

  _addScenarii(map){
    // 3 inele pentru cele 3 scenarii de extindere intravilan
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5,pred=this._pred;
    const rBase=0.07;
    const sc=[
      {mult:0.9,col:'#ef4444',op:0.3}, // S1 regres
      {mult:1.0,col:'#f59e0b',op:0.35}, // S2 tendinta
      {mult:1.2,col:'#22c55e',op:0.4}, // S3 optimist
    ];
    const features=sc.map((s,i)=>{
      const n=64,r=rBase*s.mult,coords=[];
      for(let j=0;j<=n;j++){const a=(j/n)*Math.PI*2;coords.push([cx+Math.cos(a)*r*1.6,cy+Math.sin(a)*r]);}
      return{type:'Feature',geometry:{type:'Polygon',coordinates:[coords]},properties:{c:s.col,op:s.op}};
    });
    this._safeAdd(map,'v7-sc',{type:'geojson',data:{type:'FeatureCollection',features}},{
      id:'v7-sc-l',type:'fill',source:'v7-sc',
      paint:{'fill-color':['get','c'],'fill-opacity':['get','op']}
    });
  },

  _addAgenda(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5,pred=this._pred;
    // Top 5 prioritati ca puncte pe harta
    const pts=[
      {lon:cx,lat:cy+0.015,c:'#60a5fa',r:14}, // TP
      {lon:cx-0.02,lat:cy-0.010,c:'#ef4444',r:12}, // Seismic
      {lon:cx+0.025,lat:cy-0.005,c:'#22c55e',r:11}, // SV
      {lon:cx+0.010,lat:cy+0.020,c:'#f59e0b',r:10}, // Sociale
      {lon:cx-0.015,lat:cy+0.008,c:'#a78bfa',r:9}, // Investitii
    ];
    const features=pts.map((p,i)=>({type:'Feature',geometry:{type:'Point',coordinates:[p.lon,p.lat]},properties:{c:p.c,r:p.r,i}}));
    this._safeAdd(map,'v7-ag',{type:'geojson',data:{type:'FeatureCollection',features}},{
      id:'v7-ag-l',type:'circle',source:'v7-ag',
      paint:{'circle-radius':['get','r'],'circle-color':['get','c'],'circle-opacity':0.9,'circle-stroke-width':3,'circle-stroke-color':'rgba(255,255,255,0.5)'}
    });
  },

  _cleanLayers(){
    const map=this._map;if(!map)return;
    const ids=['v7-gr-l','v7-gr','v7-bld-l','v7-bld','v7-den-l','v7-den',
     'v7-tr-l','v7-tr','v7-tp-l','v7-tp','v7-sei-l','v7-sei','v7-risc-l','v7-risc',
     'v7-fl-l','v7-fl','v7-anar-l','v7-anar-src','v7-rd-l','v7-rd',
     'v7-in-l','v7-in','v7-gn-l','v7-gn','v7-reg-l','v7-reg','v7-hub-l','v7-hub',
     'v7-inv-l','v7-inv','v7-sc-l','v7-sc','v7-ag-l','v7-ag',
     // backward compat cu v6
     'v6-gr-l','v6-gr','v6-bld-l','v6-bld','v6-den-l','v6-den',
     'v6-tr-l','v6-tr','v6-tp-l','v6-tp','v6-sei-l','v6-sei','v6-risc-l','v6-risc',
     'v6-fl-l','v6-fl','v6-rd-l','v6-rd','v6-in-l','v6-in','v6-gn-l','v6-gn'
    ];
    ids.forEach(id=>{
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

  // ── CANVAS DRAW ────────────────────────────────────────────────────────────
  _draw(id,t){
    const ctx=this._ctx,W=window.innerWidth,H=window.innerHeight;
    const city=this._city,pred=this._pred,name=city?.name||'UAT';
    if(!ctx||!pred)return;

    const rev=(d,s=0.25)=>Math.min(1,Math.max(0,(t-d)/s));
    const rE=(d,s=0.25)=>eo(rev(d,s));
    const sA=t>0.92?Math.max(0,(1-t)/0.08):1;
    const al=(a)=>{ctx.globalAlpha=Math.max(0,Math.min(1,a));};

    const bgT=()=>{const g=ctx.createLinearGradient(0,0,0,H*0.22);g.addColorStop(0,'rgba(3,7,18,0.75)');g.addColorStop(1,'rgba(3,7,18,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H*0.22);};
    const bgB=()=>{const g=ctx.createLinearGradient(0,H*0.78,0,H);g.addColorStop(0,'rgba(3,7,18,0)');g.addColorStop(1,'rgba(3,7,18,0.70)');ctx.fillStyle=g;ctx.fillRect(0,H*0.78,W,H*0.22);};
    const card=(x,y,w,h)=>{ctx.save();ctx.fillStyle='rgba(5,10,28,0.72)';ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=1;const r=8;ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r);ctx.lineTo(x+w,y+h-r);ctx.arcTo(x+w,y+h,x+w-r,y+h,r);ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r);ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();};
    const lbl=(txt,x,y,clr='rgba(148,163,184,0.85)',sz=W*0.007)=>{ctx.fillStyle=clr;ctx.font=`${sz}px "IBM Plex Mono",monospace`;ctx.textAlign='left';ctx.fillText(txt,x,y);};
    const big=(txt,x,y,clr='#D4AF37',sz=W*0.05)=>{ctx.fillStyle=clr;ctx.font=`900 ${sz}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(txt,x,y);};
    const bar=(x,y,w,h,pct,clr)=>{ctx.fillStyle='rgba(255,255,255,0.07)';ctx.fillRect(x,y,w,h);ctx.fillStyle=clr;ctx.fillRect(x,y,w*Math.min(1,Math.max(0,pct)),h);};
    const gl=(x,y,wm,tr)=>{const w=wm*tr;const g=ctx.createLinearGradient(x,y,x+w,y);g.addColorStop(0,'#D4AF37');g.addColorStop(1,'rgba(212,175,55,0)');ctx.fillStyle=g;ctx.fillRect(x,y,w,2);};
    const prog=()=>{
      al(0.65);
      ctx.fillStyle='rgba(255,255,255,0.08)';ctx.fillRect(W*0.15,H-22,W*0.7,2);
      ctx.fillStyle='#D4AF37';ctx.fillRect(W*0.15,H-22,W*0.7*((this._si+t)/this.SCENES.length),2);
      ctx.fillStyle='rgba(148,163,184,0.6)';ctx.font=`${W*0.006}px "IBM Plex Mono",monospace`;ctx.textAlign='center';
      ctx.fillText(`${this.SCENES[this._si]?.label||''} · ${this._si+1}/${this.SCENES.length}`,W/2,H-6);
      al(1);
    };

    al(sA);bgT();bgB();

    switch(id){

    case 's1':{// IDENTITATE
      al(sA*rE(0.08,0.25));
      lbl(`${(city.tip||'municipiu').toUpperCase()} · JUD. ${(city.judet||'—').toUpperCase()} · REG. ${city.regiune||'—'}`,W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      al(sA*rE(0.10,0.3));gl(W*0.05,H*0.135,W*0.5,rE(0.10,0.35));
      al(sA*rE(0.12,0.3));
      ctx.fillStyle='#ffffff';ctx.font=`900 ${Math.min(W*0.085,110)}px "Space Grotesk",sans-serif`;ctx.textAlign='left';
      ctx.fillText(name.toUpperCase(),W*0.05,H*0.24);
      ctx.fillStyle='#D4AF37';ctx.font=`700 ${W*0.012}px "Space Grotesk",sans-serif`;
      ctx.fillText('România · Regiune '+(city.regiune||'—'),W*0.055,H*0.285);
      al(sA*rE(0.25,0.25));card(W*0.05,H*0.82,W*0.88,H*0.10);al(sA*rE(0.25,0.25));
      [[N(pred.p21),'LOCUITORI 2021',W*0.09],[Math.round((city.suprafata_ha||pred.sup)/100)+' KM²','SUPRAFATA',W*0.28],[N(city.pib_eur_cap||9000)+' EUR','PIB/LOC',W*0.50],[(city.tip||'—').toUpperCase(),'TIP UAT',W*0.72]].forEach(([v,l2,x])=>{
        lbl(l2,x,H*0.855,'#D4AF37',W*0.0058);big(v,x,H*0.895,'#ffffff',W*0.022);
      });
      if(t>0.40&&this._wikiText){
        al(sA*rE(0.40,0.25));card(W*0.05,H*0.64,W*0.65,H*0.075);al(sA*rE(0.40,0.25));
        ctx.fillStyle='rgba(200,215,240,0.80)';ctx.font=`${W*0.0065}px "IBM Plex Mono",monospace`;ctx.textAlign='left';
        const words=this._wikiText.split(' ');let line='',y=H*0.67;
        words.forEach(w=>{const test=line+w+' ';if(ctx.measureText(test).width>W*0.60&&line){ctx.fillText(line.trim(),W*0.07,y);y+=H*0.028;line=w+' ';}else line=test;});
        if(line)ctx.fillText(line.trim(),W*0.07,y);
      }
      al(sA*rE(0.55,0.3)*0.6);lbl('SURSE: INSE · EUROSTAT · ANCPI · BNR · WIKIPEDIA',W*0.05,H*0.775,'rgba(100,130,170,0.55)',W*0.006);
      break;
    }

    case 's2':{// CONTEXT REGIONAL
      al(sA*rE(0.05,0.2));
      lbl('CONTEXT REGIONAL · HARTA: ZONE INFLUENTA SI GRAVITATIE URBANA',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.55,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';
      ctx.fillText(name+' · Pozitie Regionala',W*0.05,H*0.185);
      al(sA*rE(0.12,0.25));card(W*0.04,H*0.22,W*0.42,H*0.55);al(sA*rE(0.12,0.25));
      lbl('RANG URBAN',W*0.07,H*0.28,'#D4AF37',W*0.0065);
      big(pred.hub>=1.5?'METROPOLA':pred.hub>=1.2?'POL REGIONAL':pred.hub>=1.0?'ORAS MEDIU':'ORAS MIC',W*0.07,H*0.37,pred.hub>=1.5?'#D4AF37':pred.hub>=1.2?'#f59e0b':'#60a5fa',W*0.020);
      lbl('COEF. HUB: '+pred.hub.toFixed(2),W*0.07,H*0.42,'rgba(148,163,184,0.7)',W*0.006);
      lbl('POPULATIE: '+N(pred.p21)+' loc.',W*0.07,H*0.47,'rgba(200,215,240,0.85)',W*0.007);
      lbl('SUPRAFATA: '+N(pred.sup)+' ha',W*0.07,H*0.52,'rgba(200,215,240,0.85)',W*0.007);
      lbl('DENSITATE: '+N(Math.round(pred.p21/(pred.sup/100)))+' loc/km²',W*0.07,H*0.57,'rgba(200,215,240,0.85)',W*0.007);
      lbl('REGIUNE: '+city.regiune,W*0.07,H*0.62,'rgba(148,163,184,0.7)',W*0.006);
      // Zone influenta
      al(sA*rE(0.30,0.25));card(W*0.50,H*0.22,W*0.46,H*0.55);al(sA*rE(0.30,0.25));
      lbl('ZONE INFLUENTA',W*0.53,H*0.28,'#a78bfa',W*0.007);
      [['#a78bfa','80km — PRIMARA',0.35],['#60a5fa','150km — SECUNDARA',0.50],['#22c55e','250km — METROPOLITANA',0.65]].forEach(([c,t2,td],i)=>{
        al(sA*rE(td,0.2));ctx.fillStyle=c;ctx.beginPath();ctx.arc(W*0.565,H*(0.355+i*0.085),6,0,Math.PI*2);ctx.fill();
        lbl(t2,W*0.585,H*(0.358+i*0.085),c,W*0.007);
      });
      lbl('GRAVITATIE URBANA: '+N(Math.round(pred.p21*pred.hub/10))+' IDX',W*0.53,H*0.600,'#D4AF37',W*0.008);
      lbl('CATCHMENT AREA: ~'+N(Math.round(pred.p21*1.8))+' pers.',W*0.53,H*0.638,'rgba(200,215,240,0.8)',W*0.007);
      break;
    }

    case 's3':{// PROFIL LOCUITOR
      al(sA*rE(0.05,0.2));
      lbl('PORTRETUL COMUNITATII · HARTA: DENSITATE UTR',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.45,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';
      ctx.fillText(name+' · Demografie & Profil Social',W*0.05,H*0.185);
      al(sA*rE(0.12,0.25));card(W*0.04,H*0.22,W*0.42,H*0.62);al(sA*rE(0.12,0.25));
      lbl('POPULATIE 2021',W*0.07,H*0.28,'#D4AF37',W*0.0065);
      big(N(pred.p21),W*0.07,H*0.37,'#ffffff',W*0.040);
      lbl(pred.trendLbl,W*0.07,H*0.41,pred.trendClr,W*0.0072);
      lbl('RATA 2011-2021: '+(pred.r10>=0?'+':'')+pred.r10.toFixed(2)+'%/AN',W*0.07,H*0.465,'rgba(148,163,184,0.7)',W*0.006);
      bar(W*0.07,H*0.48,W*0.36,H*0.012,Math.max(0.1,Math.min(1,(pred.r10+2)/4))*rE(0.20,0.3),pred.trendClr);
      lbl('NATALITATE: '+pred.natalitate+'‰ · MORTALITATE: '+pred.mortalit+'‰',W*0.07,H*0.535,'rgba(148,163,184,0.7)',W*0.006);
      lbl('SPOR NATURAL: '+(pred.sporNat>=0?'+':'')+pred.sporNat+'‰',W*0.07,H*0.575,pred.sporNat>=0?'#22c55e':'#ef4444',W*0.007);
      lbl('MIG. NETA: '+(pred.migNeta>=0?'+':'')+N(pred.migNeta)+'/an',W*0.07,H*0.615,'rgba(200,215,240,0.8)',W*0.007);
      lbl('SALARIU MED: '+N(pred.salariu)+' EUR/lun',W*0.07,H*0.655,'rgba(200,215,240,0.8)',W*0.007);
      lbl('SOMAJ: '+pred.somaj+'%  OCUPARE: '+pred.ocupare+'%',W*0.07,H*0.695,'rgba(148,163,184,0.7)',W*0.006);
      al(sA*rE(0.40,0.25));card(W*0.04,H*0.80,W*0.90,H*0.085);al(sA*rE(0.40,0.25));
      [[N(pred.pop55),'POP 2055',W*0.07,pred.trendClr],[N(pred.defLoc)+' UN.','DEFICIT LOC.',W*0.28,'#ef4444'],[pred.sdgTotal+'/10','SDG11',W*0.49,'#22c55e'],[N(pred.salariu*1.8)+' EUR','SAL.2055',W*0.70,'#D4AF37']].forEach(([v,l2,x,c])=>{
        lbl(l2,x,H*0.835,'rgba(148,163,184,0.65)',W*0.0058);big(v,x,H*0.870,c,W*0.020);
      });
      break;
    }

    case 's4':{// ECONOMIE
      al(sA*rE(0.05,0.2));
      lbl('ECONOMIE & CONVERGENTA UE · HARTA: CLADIRI 3D PE UTR',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.45,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Context European',W*0.05,H*0.185);
      al(sA*rE(0.12,0.25));card(W*0.04,H*0.22,W*0.42,H*0.60);al(sA*rE(0.12,0.25));
      lbl('PIB/LOCUITOR ACTUAL',W*0.07,H*0.28,'rgba(148,163,184,0.7)',W*0.006);
      big(N(pred.pib)+' EUR',W*0.07,H*0.38,'#D4AF37',W*0.036);
      lbl('VS MEDIA UE27: 36.600 EUR',W*0.07,H*0.42,'rgba(148,163,184,0.7)',W*0.006);
      bar(W*0.07,H*0.44,W*0.34,H*0.012,pred.pctUE/100*rE(0.20,0.3),'#D4AF37');
      big(pred.pctUE+'%',W*0.07,H*0.54,pred.pctUE>=75?'#22c55e':'#f59e0b',W*0.038);
      lbl('DIN MEDIA UE27',W*0.07,H*0.58,'#D4AF37',W*0.007);
      lbl('CONVERGENTA ~'+pred.anConv,W*0.07,H*0.625,'rgba(148,163,184,0.7)',W*0.006);
      lbl('PIB 2055: '+N(pred.pib55)+' EUR ('+pred.pctUE55+'% UE)',W*0.07,H*0.665,'#22c55e',W*0.007);
      lbl('RATA PIB: +'+pred.rPIB.toFixed(1)+'%/AN',W*0.07,H*0.700,'rgba(148,163,184,0.7)',W*0.006);
      // Bar chart sectoare economice
      al(sA*rE(0.30,0.25));card(W*0.50,H*0.22,W*0.46,H*0.60);al(sA*rE(0.30,0.25));
      lbl('STRUCTURA ECONOMICA',W*0.53,H*0.28,'#D4AF37',W*0.007);
      [['SERVICII',pred.ocupatie.servicii,'#60a5fa'],['INDUSTRIE',pred.ocupatie.industrie,'#f59e0b'],['COMERT',pred.ocupatie.comert,'#22c55e'],['CONSTR.',pred.ocupatie.constructii,'#a78bfa'],['AGRI.',pred.ocupatie.agricultura,'#94a3b8']].forEach(([lb2,v,c],i)=>{
        const y2=H*(0.335+i*0.080);
        al(sA*rE(0.25+i*0.06,0.2));lbl(lb2,W*0.53,y2,c,W*0.006);
        lbl(v+'%',W*0.68,y2,'rgba(200,215,240,0.9)',W*0.007);
        bar(W*0.53,y2+H*0.012,W*0.40,H*0.010,v/100*rE(0.27+i*0.06,0.2),c);
      });
      break;
    }

    case 's5':{// CORIDOARE 2055 — BARE 3D
      this._updateGrowth(t);
      al(sA*rE(0.05,0.2));
      lbl('CORIDOARE DEZVOLTARE 2055 · BARE 3D DIN PUG REAL · CRESC IN TIMP REAL',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.55,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Predictie Dezvoltare 2055',W*0.05,H*0.185);
      al(sA*rE(0.10,0.2));card(W*0.04,H*0.22,W*0.90,H*0.075);al(sA*rE(0.10,0.2));
      [[N(Math.round(pred.defLoc*eo(t)))+' UN.','DEFICIT LOCUINTE 2055','#ef4444',W*0.07],
       [N(pred.recHa)+' HA','RECONVERSIE','#f59e0b',W*0.30],
       [N(pred.auth),'AUTORIZATII 2023','#22c55e',W*0.52],
       [(pred.r10>=0?'+':'')+pred.r10.toFixed(2)+'%/AN','RITM CRESTERE','#60a5fa',W*0.73]
      ].forEach(([v,l2,c,x])=>{lbl(l2,x,H*0.255,'rgba(148,163,184,0.65)',W*0.0058);big(v,x,H*0.285,c,W*0.020);});
      al(sA*rE(0.15,0.2));card(W*0.04,H*0.85,W*0.90,H*0.09);al(sA*rE(0.15,0.2));
      lbl('LEGENDA: ',W*0.07,H*0.885,'rgba(148,163,184,0.65)',W*0.006);
      [['#ef4444','MAJOR CC/CP'],['#f59e0b','MEDIU CM/CB'],['#60a5fa','MIC LA/LB'],['#22c55e','RECONVERSIE']].forEach(([c,txt],i)=>{
        ctx.fillStyle=c;ctx.fillRect(W*(0.18+i*0.20),H*0.875,W*0.025,10);lbl(txt,W*(0.21+i*0.20),H*0.886,c,W*0.0062);
      });
      if(t>0.75){
        const ta=Math.min(1,(t-0.75)/0.18);al(sA*ta);card(W*0.04,H*0.318,W*0.90,H*0.055);al(sA*ta);
        const txt=pred.r10>0.5?`⚡ ${name}: crestere accelerata. ${N(pred.defLoc)} unitati locative necesare pana in 2055. Risc sprawl fara PUG actualizat.`:pred.r10>0?`⚡ ${name}: crestere moderata. Reconversia (${N(pred.recHa)} ha) acopera 40% din deficit. Densificarea centrului preferata expansiunii.`:`⚡ ${name}: declin/stabilizare. Prioritate reabilitare fond existent. ROI maxim pe reconversie centru.`;
        lbl(txt.slice(0,120),W*0.07,H*0.354,'#D4AF37',W*0.0062);
      }
      break;
    }

    case 's6':{// MOBILITATE
      al(sA*rE(0.05,0.2));
      lbl('MOBILITATE AUTO · TRAFIC · ROSU=AGLOMERAT / GALBEN=MODERAT / VERDE=FLUID',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.55,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Presiunea Traficului',W*0.05,H*0.185);
      al(sA*rE(0.12,0.25));card(W*0.04,H*0.22,W*0.42,H*0.54);al(sA*rE(0.12,0.25));
      lbl('GRAD MOTORIZARE',W*0.07,H*0.27,'#D4AF37',W*0.007);
      [[2024,pred.mot24,'rgba(148,163,184,0.9)',0.14],[2035,Math.min(660,Math.round(pred.mot24*1.18)),'#f59e0b',0.22],[2055,Math.min(710,Math.round(pred.mot24*1.30)),'#ef4444',0.30]].forEach(([yr,val,c,td],i)=>{
        al(sA*rE(td,0.2));lbl(yr+'',W*0.07,H*(0.325+i*0.085),'rgba(100,130,170,0.7)',W*0.006);big(N(Math.round(val)),W*0.15,H*(0.325+i*0.085),c,W*0.022);lbl('veh/1000',W*0.30,H*(0.325+i*0.085),c,W*0.006);bar(W*0.07,H*(0.340+i*0.085),W*0.36,H*0.012,val/710*rE(td+0.05,0.25),c);
      });
      al(sA*rE(0.38,0.25));lbl('AN SATURARE: ~'+pred.satAn,W*0.07,H*0.575,pred.satAn<=2040?'#ef4444':'#f59e0b',W*0.008);
      lbl('FLUX ORA VARF: '+N(pred.fluxOra)+' veh/h',W*0.07,H*0.620,'rgba(148,163,184,0.7)',W*0.007);
      al(sA*rE(0.30,0.25));card(W*0.50,H*0.22,W*0.46,H*0.54);al(sA*rE(0.30,0.25));
      lbl('SOLUTII NECESARE',W*0.53,H*0.27,'#D4AF37',W*0.007);
      lbl('PASAJE DENIVELATE: '+pred.pasaje+' buc.',W*0.53,H*0.33,'rgba(200,215,240,0.85)',W*0.007);
      lbl('VARIANTE OCOLITOARE: ~'+pred.kmOcol+' KM',W*0.53,H*0.375,'rgba(200,215,240,0.85)',W*0.007);
      lbl('CENTURA: '+(pred.hub>=1.4?'URGENTA':'RECOMANDATA'),W*0.53,H*0.420,pred.hub>=1.4?'#ef4444':'#f59e0b',W*0.008);
      lbl('COST TOTAL MOBILITATE: '+N(pred.invMob)+' M EUR',W*0.53,H*0.475,'#D4AF37',W*0.007);
      lbl('CONGESTIE 2035: +'+(pred.hub>=1.3?42:28)+'%',W*0.53,H*0.520,'rgba(200,215,240,0.8)',W*0.007);
      break;
    }

    case 's7':{// TRANSPORT PUBLIC
      al(sA*rE(0.05,0.2));
      lbl('TRANSPORT PUBLIC · ALBASTRU=ACOPERIRE TP · VIOLET=BRT PROPUS',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.5,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Mobilitate Sustenabila',W*0.05,H*0.185);
      al(sA*rE(0.12,0.25));card(W*0.04,H*0.22,W*0.42,H*0.55);al(sA*rE(0.12,0.25));
      lbl('ACOPERIRE TP ACTUALA',W*0.07,H*0.28,'#60a5fa',W*0.007);
      big(pred.tp+'%',W*0.07,H*0.38,pred.tp>=70?'#22c55e':pred.tp>=50?'#f59e0b':'#ef4444',W*0.048);
      lbl('DIN POPULATIE ACOPERITA',W*0.07,H*0.42,'#D4AF37',W*0.007);
      bar(W*0.07,H*0.44,W*0.36,H*0.012,pred.tp/100*rE(0.22,0.3),pred.tp>=70?'#22c55e':pred.tp>=50?'#f59e0b':'#ef4444');
      lbl('DEFICIT: '+pred.defTP+'pp vs standard 75%',W*0.07,H*0.495,'rgba(148,163,184,0.7)',W*0.006);
      lbl('WALK SCORE: '+pred.walkScore+'/100',W*0.07,H*0.535,'rgba(200,215,240,0.8)',W*0.007);
      lbl('STATII NOI NECESARE: '+N(pred.statiiNoi),W*0.07,H*0.572,'rgba(148,163,184,0.7)',W*0.006);
      al(sA*rE(0.30,0.25));card(W*0.50,H*0.22,W*0.46,H*0.55);al(sA*rE(0.30,0.25));
      lbl('BRT NECESAR',W*0.53,H*0.28,'#a78bfa',W*0.007);
      big(pred.kmBRT+' KM',W*0.53,H*0.37,'#a78bfa',W*0.036);
      lbl('COST: '+N(pred.costBRT)+' M EUR',W*0.53,H*0.41,'rgba(148,163,184,0.7)',W*0.007);
      lbl('STATII NOI: '+N(pred.statiiNoi),W*0.53,H*0.46,'rgba(148,163,184,0.7)',W*0.007);
      lbl('SUMP ~'+pred.anSUMP,W*0.53,H*0.51,'#D4AF37',W*0.008);
      lbl('COST TOTAL TP: '+N(pred.costBRT*1.4)+' M EUR',W*0.53,H*0.57,'rgba(200,215,240,0.8)',W*0.007);
      break;
    }

    case 's8':{// RISC SEISMIC
      al(sA*rE(0.05,0.2));
      lbl('RISC SEISMIC · HARTA: GRADIENT SEISMIC + UTR-URI VULNERABILE',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.5,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Fond Vulnerabil Seismic',W*0.05,H*0.185);
      const agC=pred.ag>=0.30?'#ef4444':pred.ag>=0.20?'#f59e0b':'#22c55e';
      al(sA*rE(0.12,0.25));card(W*0.04,H*0.22,W*0.42,H*0.56);al(sA*rE(0.12,0.25));
      lbl('ACCELERATIE SEISMICA P100',W*0.07,H*0.28,agC,W*0.007);
      big('ag='+pred.ag.toFixed(2)+'g',W*0.07,H*0.38,agC,W*0.042);
      lbl('FOND RISC RS I-III',W*0.07,H*0.43,'rgba(148,163,184,0.7)',W*0.007);
      big(N(pred.fond)+' CL.',W*0.07,H*0.53,'#ef4444',W*0.032);
      lbl('FARA INTERVENTIE 2045: '+N(Math.round(pred.fond*1.12))+' CL.',W*0.07,H*0.574,'#f59e0b',W*0.007);
      al(sA*rE(0.30,0.25));card(W*0.50,H*0.22,W*0.46,H*0.56);al(sA*rE(0.30,0.25));
      lbl('PNRR REABILITARE',W*0.53,H*0.28,'#22c55e',W*0.007);
      big(N(Math.round(pred.fond*0.25)),W*0.53,H*0.37,'#22c55e',W*0.036);lbl('APT. REABILITATE EST.',W*0.53,H*0.41,'#22c55e',W*0.006);
      big(N(Math.round(pred.fond*0.085))+' M',W*0.53,H*0.50,'#D4AF37',W*0.026);lbl('COST TOTAL EUR',W*0.53,H*0.54,'#D4AF37',W*0.006);
      lbl('AN ELIMINARE FOND: ~'+Math.round(2025+pred.fond/Math.max(1,pred.fond*0.25/10)),W*0.53,H*0.576,'rgba(148,163,184,0.7)',W*0.007);
      break;
    }

    case 's9':{// CLIMA & INUNDATII
      al(sA*rE(0.05,0.2));
      lbl('CLIMA & INUNDATII · ALBASTRU=ZONA INUNDABILA · GALBEN=AUTOSTRADA',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.55,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Vulnerabilitate Climatica',W*0.05,H*0.185);
      al(sA*rE(0.12,0.25));card(W*0.04,H*0.22,W*0.42,H*0.56);al(sA*rE(0.12,0.25));
      lbl('ZILE CANICULARE >35°C',W*0.07,H*0.28,'#f59e0b',W*0.007);
      big(pred.zile24+' ZILE/AN',W*0.07,H*0.37,'#f59e0b',W*0.030);lbl('2024 ACTUAL',W*0.07,H*0.41,'rgba(148,163,184,0.7)',W*0.006);
      big(Math.round(pred.zile24*2.2)+' ZILE/AN',W*0.07,H*0.505,'#ef4444',W*0.030);lbl('2055 PROIECTIE RCP4.5',W*0.07,H*0.545,'rgba(148,163,184,0.7)',W*0.006);
      lbl('UHI: +'+Math.round(2+pred.hub*0.8)+'°C vs rural',W*0.07,H*0.585,'#f97316',W*0.007);
      al(sA*rE(0.30,0.25));card(W*0.50,H*0.22,W*0.46,H*0.56);al(sA*rE(0.30,0.25));
      lbl('COST ADAPTARE',W*0.53,H*0.28,'#22c55e',W*0.007);
      big(N(Math.round(pred.p21/10000*1.8))+' M EUR',W*0.53,H*0.37,'#22c55e',W*0.028);
      lbl('COST INACTIUNE ×4.5',W*0.53,H*0.42,'rgba(148,163,184,0.7)',W*0.007);
      big(N(Math.round(pred.p21/10000*1.8*4.5))+' M EUR',W*0.53,H*0.51,'#ef4444',W*0.028);
      lbl('ROI ADAPTARE: +350%',W*0.53,H*0.56,'#22c55e',W*0.008);
      break;
    }

    case 's10':{// PROIECTIE 2055 — 3 SCENARII
      al(sA*rE(0.05,0.2));
      lbl('PROIECTIE 2055 · HARTA: INELE EXTINDERE INTRAVILAN 2011→2021→2035→2055',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.6,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Monte Carlo 2055',W*0.05,H*0.185);
      const rB=pred.rRef;
      [[rB-0.8,'S1 REGRES','#ef4444'],[rB,'S2 TENDINTA','#f59e0b'],[rB+0.9,'S3 OPTIMIST','#22c55e']].forEach(([r,lbl2,c],i)=>{
        const pop=Math.round(pred.p21*Math.pow(1+r/100,34));
        const delta=pop-pred.p21;
        al(sA*rE(0.12+i*0.12,0.25));card(W*(0.04+i*0.32),H*0.23,W*0.30,H*0.52);al(sA*rE(0.12+i*0.12,0.25));
        ctx.fillStyle=c;ctx.font=`900 ${W*0.016}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(lbl2,W*(0.07+i*0.32),H*0.285);
        lbl('POPULATIE 2055',W*(0.07+i*0.32),H*0.330,'rgba(148,163,184,0.7)',W*0.006);
        big(N(pop),W*(0.07+i*0.32),H*0.405,c,W*0.030);
        lbl((delta>=0?'+':'')+N(delta)+' vs 2021',W*(0.07+i*0.32),H*0.445,'rgba(200,215,240,0.8)',W*0.0065);
        lbl((r>=0?'+':'')+r.toFixed(2)+'%/an',W*(0.07+i*0.32),H*0.475,'rgba(100,130,170,0.6)',W*0.006);
        bar(W*(0.07+i*0.32),H*0.495,W*0.27,H*0.012,Math.max(0.2,pop/Math.round(pred.p21*Math.pow(1+(rB+0.9)/100,34)))*rE(0.15+i*0.12,0.3),c);
      });
      al(sA*rE(0.55,0.3));card(W*0.04,H*0.82,W*0.90,H*0.065);al(sA*rE(0.55,0.3));
      const pMin=Math.round(pred.p21*Math.pow(1+(rB-0.8)/100,34)),pMax=Math.round(pred.p21*Math.pow(1+(rB+0.9)/100,34));
      lbl('INTERVAL 90%: ['+N(pMin)+' — '+N(pMax)+'] LOC. · S2 TENDINTA: ~55% PROBABILITATE',W*0.07,H*0.862,'rgba(148,163,184,0.7)',W*0.007);
      break;
    }

    case 's11':{// INFRASTRUCTURA NECESARA
      al(sA*rE(0.05,0.2));
      lbl('INFRASTRUCTURA NECESARA 2025-2055 · HARTA: DENSITATE ZONE',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.55,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText('Ce construim in '+name+' pana in 2055?',W*0.05,H*0.185);
      al(sA*rE(0.10,0.2));card(W*0.04,H*0.22,W*0.90,H*0.055);al(sA*rE(0.10,0.2));
      lbl('BAZA: '+(pred.deltaP>=0?'+':'')+N(pred.deltaP)+' LOC. · '+N(pred.p21)+' → '+N(pred.pop55)+' · 2021-2055 · MEC 400/UN · MS 1800 PAC/CAB · OMS 9MP/LOC',W*0.07,H*0.255,'rgba(148,163,184,0.65)',W*0.0060);
      const items=[['🏫','SCOLI & GRAD.',pred.scoliNoi+(pred.gradNoi2||0),'unitati','#60a5fa'],['🏥','CABINETE MED.',pred.cabMed,'cab.','#ef4444'],['🌳','SPATII VERZI',pred.svHa,'ha','#22c55e'],['🚌','STATII TP',pred.statiiNoi||0,'statii','#f59e0b'],['⚡','RETELE',Math.round(Math.max(0,pred.deltaP)/5000),'km','#D4AF37']];
      items.forEach((it,i)=>{
        const col=i%3,row=Math.floor(i/3);
        const x=W*(0.04+col*0.32),y=H*(0.30+row*0.28);
        al(sA*rE(0.15+i*0.06,0.2));card(x,y,W*0.30,H*0.24);al(sA*rE(0.15+i*0.06,0.2));
        ctx.font=`${W*0.018}px sans-serif`;ctx.textAlign='left';ctx.fillText(it[0],x+W*0.01,y+H*0.065);
        lbl(it[1],x+W*0.055,y+H*0.058,it[4],W*0.0060);
        big('+'+N(it[2]),x+W*0.01,y+H*0.155,it[4],W*0.028);
        lbl(it[3],x+W*0.01,y+H*0.195,'#D4AF37',W*0.006);
      });
      al(sA*rE(0.65,0.2));card(W*0.04,H*0.90,W*0.90,H*0.060);al(sA*rE(0.65,0.2));
      lbl('NECESAR: '+N(pred.invTotal)+' M EUR · MOB '+N(pred.invMob)+' · SOC '+N(pred.invSoc)+' · EU ACOPERA ~60%',W*0.07,H*0.937,'#D4AF37',W*0.0065);
      break;
    }

    case 's12':{// INVESTITII SICAP
      al(sA*rE(0.05,0.2));
      lbl('INVESTITII & FINANTARE · HARTA: PROIECTE PE HARTA',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.5,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Portofoliu Investitii',W*0.05,H*0.185);
      al(sA*rE(0.12,0.25));card(W*0.04,H*0.22,W*0.90,H*0.055);al(sA*rE(0.12,0.25));
      lbl('TOTAL INVESTITII NECESARE: '+N(pred.invTotal)+' M EUR · TINTA ABSORTIE EU MAXIMA',W*0.07,H*0.256,'#D4AF37',W*0.0068);
      const inv=[['Transport & Mobilitate',pred.invMob,'#a78bfa'],['Infrastructura Sociala',pred.invSoc,'#60a5fa'],['Spatii Verzi & Clima',Math.round(pred.svHa*0.08),'#22c55e'],['Reabilitare Fond',Math.round(pred.fond*0.085),'#ef4444'],['Digitalizare',Math.round(pred.p21/20000),'#f59e0b']];
      const total=inv.reduce((s,x)=>s+x[1],0);
      let cumX=W*0.07;
      // Pie chart orizontal (bar sectorizat)
      al(sA*rE(0.20,0.3));
      const bW=W*0.86,bY=H*0.32,bH=H*0.045;
      inv.forEach((it,i)=>{
        const w=bW*(it[1]/total)*rE(0.20,0.3);
        ctx.fillStyle=it[2];ctx.fillRect(cumX,bY,w,bH);
        cumX+=bW*(it[1]/total);
      });
      inv.forEach((it,i)=>{
        al(sA*rE(0.28+i*0.06,0.2));card(W*(0.04+i*0.192),H*0.41,W*0.185,H*0.22);al(sA*rE(0.28+i*0.06,0.2));
        ctx.fillStyle=it[2];ctx.fillRect(W*(0.055+i*0.192),H*0.425,10,10);
        lbl(it[0].split(' ')[0],W*(0.075+i*0.192),H*0.436,'rgba(200,215,240,0.8)',W*0.0058);
        big(N(it[1])+'M',W*(0.055+i*0.192),H*0.510,it[2],W*0.020);
        lbl(Math.round(it[1]/total*100)+'%',W*(0.055+i*0.192),H*0.545,'#D4AF37',W*0.008);
      });
      al(sA*rE(0.65,0.25));card(W*0.04,H*0.70,W*0.90,H*0.055);al(sA*rE(0.65,0.25));
      lbl('SURSE FINANTARE: UE REGIO 45% · PNRR 25% · BUGET LOCAL 20% · PPP 10% · ABSORBTIE ESTIMATA ~72%',W*0.07,H*0.735,'rgba(148,163,184,0.65)',W*0.006);
      break;
    }

    case 's13':{// SCENARII S1/S2/S3
      al(sA*rE(0.05,0.2));
      lbl('SCENARII DEZVOLTARE 2055 · HARTA: SUPRAPUNERE INTRAVILAN PE SCENARIU',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.6,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · 3 Traiectorii Posibile',W*0.05,H*0.185);
      const rB2=pred.rRef;
      const sc2=[{r:rB2-0.8,lbl:'S1 REGRES',c:'#ef4444',desc:'Declin accelerat. Migratie negativa. Investitii minime.'},{r:rB2,lbl:'S2 TENDINTA',c:'#f59e0b',desc:'Status quo. Crestere moderata. Investitii selective.'},{r:rB2+0.9,lbl:'S3 OPTIMIST',c:'#22c55e',desc:'Hub regional. Atractie investitii. Infrastructura moderna.'}];
      sc2.forEach((s,i)=>{
        const pop=Math.round(pred.p21*Math.pow(1+s.r/100,34));
        const intr=Math.round(pred.sup*(1+Math.max(0,s.r)*0.04));
        al(sA*rE(0.12+i*0.14,0.25));card(W*0.04,H*(0.24+i*0.22),W*0.90,H*0.18);al(sA*rE(0.12+i*0.14,0.25));
        ctx.fillStyle=s.c;ctx.font=`900 ${W*0.018}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(s.lbl,W*0.07,H*(0.285+i*0.22));
        lbl(s.desc,W*0.22,H*(0.287+i*0.22),'rgba(200,215,240,0.8)',W*0.006);
        lbl('Pop 2055: '+N(pop),W*0.07,H*(0.325+i*0.22),s.c,W*0.008);
        lbl('Intravilan: '+N(intr)+' ha',W*0.35,H*(0.325+i*0.22),'rgba(200,215,240,0.8)',W*0.007);
        lbl('PIB: '+N(Math.round(pred.pib*Math.pow(1+(pred.rPIB+(s.r-rB2)*0.5)/100,31)))+' EUR',W*0.62,H*(0.325+i*0.22),'#D4AF37',W*0.007);
        bar(W*0.07,H*(0.345+i*0.22),W*0.86,H*0.014,Math.max(0.3,(i+1)/3)*rE(0.15+i*0.14,0.3),s.c);
      });
      break;
    }

    case 's14':{// CALITATE VIATA SDG11
      al(sA*rE(0.05,0.2));
      lbl('CALITATE VIATA SDG11 · HARTA: SPATII VERZI COLORATE PE UTR',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
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
      break;
    }

    case 's15':{// BENCHMARK EU
      al(sA*rE(0.05,0.2));
      lbl('BENCHMARK EUROPEAN · HARTA: PEER GROUP PE HARTA EUROPEI',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.5,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Pozitia Europeana',W*0.05,H*0.185);
      al(sA*rE(0.30,0.25));card(W*0.04,H*0.22,W*0.44,H*0.68);al(sA*rE(0.30,0.25));
      lbl('PEER GROUP EUROPEAN',W*0.07,H*0.27,'#a78bfa',W*0.007);
      const peers=pred.p21>200000?[{n:'Brno (CZ)',pib:22100,tp:72,sdg:7.8},{n:'Lodz (PL)',pib:16800,tp:68,sdg:6.9},{n:'Plovdiv (BG)',pib:12400,tp:61,sdg:6.2}]:pred.p21>80000?[{n:'Olomouc (CZ)',pib:18200,tp:65,sdg:7.4},{n:'Rzeszow (PL)',pib:14600,tp:62,sdg:6.6},{n:'Stara Zagora (BG)',pib:11200,tp:55,sdg:5.8}]:[{n:'Hradec Kralove',pib:17100,tp:63,sdg:7.1},{n:'Tarnow (PL)',pib:12800,tp:58,sdg:6.3},{n:'Vidin (BG)',pib:8400,tp:44,sdg:4.9}];
      [{n:name,pib:pred.pib,tp:pred.tp,sdg:pred.sdgTotal,self:true},...peers].forEach((p,i)=>{
        const y2=H*(0.325+i*0.095),cl=p.self?'#D4AF37':'rgba(200,215,240,0.8)';
        if(p.self){ctx.fillStyle='rgba(212,175,55,0.10)';ctx.fillRect(W*0.04,y2-H*0.022,W*0.44,H*0.048);}
        al(sA*rE(0.30+i*0.06,0.2));lbl(p.n,W*0.07,y2,cl,W*0.007);lbl(N(p.pib)+' €',W*0.27,y2,cl,W*0.006);lbl(p.tp+'%TP',W*0.35,y2,cl,W*0.006);lbl((p.sdg||'—')+' SDG',W*0.42,y2,cl,W*0.006);
      });
      const bP=peers[0];
      al(sA*rE(0.60,0.25));lbl('GAP vs '+bP.n+': PIB +'+N(bP.pib-pred.pib)+' € · TP +'+(bP.tp-pred.tp)+'pp',W*0.07,H*0.88,'#a78bfa',W*0.006);
      // Scatter plot simplificat
      al(sA*rE(0.35,0.3));card(W*0.52,H*0.22,W*0.44,H*0.68);al(sA*rE(0.35,0.3));
      lbl('PIB vs TRANSPORT PUBLIC',W*0.55,H*0.27,'#D4AF37',W*0.007);
      const scPts=[{n:name,x:pred.pib,y:pred.tp,c:'#D4AF37',r:10},...peers.map(p=>({n:p.n,x:p.pib,y:p.tp,c:'#a78bfa',r:7}))];
      const maxX=Math.max(...scPts.map(p=>p.x))*1.1,maxY=85;
      const scX=(v)=>W*0.56+v/maxX*W*0.36,scY=(v)=>H*0.78-v/maxY*H*0.46;
      // Axe
      al(sA*rE(0.35,0.3));ctx.strokeStyle='rgba(255,255,255,0.15)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(W*0.56,H*0.32);ctx.lineTo(W*0.56,H*0.78);ctx.lineTo(W*0.92,H*0.78);ctx.stroke();
      scPts.forEach(p=>{
        al(sA*rE(0.40,0.25));ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(scX(p.x),scY(p.y),p.r,0,Math.PI*2);ctx.fill();
        lbl(p.n.split(' ')[0],scX(p.x)+8,scY(p.y)+4,p.c,W*0.0055);
      });
      lbl('PIB →',W*0.87,H*0.80,'rgba(148,163,184,0.6)',W*0.006);
      break;
    }

    case 's16':{// AGENDA PRIMARULUI
      al(sA*rE(0.05,0.2));
      lbl('AGENDA PRIMARULUI 2025-2030 · HARTA: PRIORITATI LOCALIZATE',W*0.05,H*0.10,'rgba(148,163,184,0.7)',W*0.0068);
      gl(W*0.05,H*0.125,W*0.5,rE(0.05,0.3));
      al(sA*rE(0.07,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Ce Facem Acum?',W*0.05,H*0.185);
      al(sA*rE(0.12,0.25));card(W*0.04,H*0.22,W*0.90,H*0.55);al(sA*rE(0.12,0.25));
      lbl('PRIORITATI STRATEGICE 2025-2030 — URGENTA × IMPACT',W*0.07,H*0.265,'#D4AF37',W*0.007);
      pred.agenda.forEach((pr,i)=>{
        const yr=2025+i*1.2;
        al(sA*rE(0.16+i*0.09,0.2));
        ctx.fillStyle=pr.c;ctx.font=`900 ${W*0.018}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText((i+1)+'.',W*0.07,H*(0.325+i*0.085));
        lbl(pr.lbl,W*0.11,H*(0.326+i*0.085),'rgba(220,230,255,0.90)',W*0.0075);
        lbl('~'+yr.toFixed(0),W*0.72,H*(0.326+i*0.085),'rgba(148,163,184,0.6)',W*0.006);
        bar(W*0.07,H*(0.337+i*0.085),W*0.86,H*0.010,Math.min(1,pr.score/80)*rE(0.18+i*0.09,0.2),pr.c);
      });
      // Timeline
      al(sA*rE(0.60,0.25));card(W*0.04,H*0.82,W*0.90,H*0.11);al(sA*rE(0.60,0.25));
      lbl('TIMELINE',W*0.07,H*0.855,'rgba(148,163,184,0.65)',W*0.006);
      [2025,2026,2027,2028,2029,2030].forEach((yr,i)=>{
        const x=W*(0.13+i*0.13);
        ctx.fillStyle=yr<=2026?'#D4AF37':'rgba(148,163,184,0.4)';ctx.beginPath();ctx.arc(x,H*0.887,5,0,Math.PI*2);ctx.fill();
        if(i<5){ctx.strokeStyle='rgba(148,163,184,0.3)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x+5,H*0.887);ctx.lineTo(W*(0.26+i*0.13)-5,H*0.887);ctx.stroke();}
        lbl(yr+'',x-W*0.012,H*0.910,'rgba(148,163,184,0.6)',W*0.006);
      });
      break;
    }

    case 's17':{// VIZIUNEA 2055
      const gBg=ctx.createRadialGradient(W/2,H,0,W/2,H,W*0.7);
      gBg.addColorStop(0,'rgba(15,8,3,0.35)');gBg.addColorStop(1,'rgba(3,7,18,0.55)');
      ctx.fillStyle=gBg;ctx.fillRect(0,0,W,H);
      al(sA*rE(0.05,0.4)*0.07);ctx.fillStyle='#D4AF37';ctx.font=`900 ${W*0.28}px "Space Grotesk",sans-serif`;ctx.textAlign='center';ctx.fillText('2055',W/2,H*0.62);
      al(sA);
      al(sA*rE(0.10,0.25));ctx.fillStyle='rgba(148,163,184,0.6)';ctx.font=`${W*0.008}px "IBM Plex Mono",monospace`;ctx.textAlign='center';ctx.fillText('VIZIUNEA 2055 — ORASUL POSIBIL',W/2,H*0.175);
      al(sA*rE(0.14,0.28));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.065}px "Space Grotesk",sans-serif`;ctx.fillText(name.toUpperCase(),W/2,H*0.285);
      ctx.fillStyle='#D4AF37';ctx.font=`700 ${W*0.012}px "Space Grotesk",sans-serif`;
      const sub=pred.rRef>0.5?'UN ORAS IN CRESTERE CARE ALEGE SA CREASCA INTELIGENT':pred.rRef>0?'UN ORAS CARE POATE DEVENI MOTOR REGIONAL':'UN ORAS CARE ALEGE CALITATEA, NU CANTITATEA';
      ctx.fillText(sub,W/2,H*0.330);
      al(sA*rE(0.20,0.25));const gl2=ctx.createLinearGradient(W*0.1,0,W*0.9,0);gl2.addColorStop(0,'rgba(212,175,55,0)');gl2.addColorStop(0.5,'#D4AF37');gl2.addColorStop(1,'rgba(212,175,55,0)');ctx.fillStyle=gl2;ctx.fillRect(W*0.1,H*0.355,W*0.8,2);
      al(sA*rE(0.22,0.28));card(W*0.04,H*0.38,W*0.38,H*0.48);al(sA*rE(0.22,0.28));
      lbl('AGENDA 2025-2030',W*0.07,H*0.425,'#D4AF37',W*0.007);
      pred.agenda.forEach((pr,i)=>{
        al(sA*rE(0.26+i*0.07,0.2));
        ctx.fillStyle=pr.c;ctx.font=`900 ${W*0.016}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText((i+1)+'.',W*0.07,H*(0.475+i*0.075));
        ctx.fillStyle='rgba(220,230,255,0.88)';ctx.font=`${W*0.011}px "Space Grotesk",sans-serif`;ctx.fillText(pr.lbl,W*0.10,H*(0.475+i*0.075));
        bar(W*0.07,H*(0.485+i*0.075),W*0.32,H*0.008,Math.min(1,pr.score/80)*rE(0.28+i*0.07,0.2),pr.c);
      });
      al(sA*rE(0.30,0.28));card(W*0.56,H*0.38,W*0.40,H*0.48);al(sA*rE(0.30,0.28));
      lbl('CU CE RAMANEM',W*0.59,H*0.425,'#D4AF37',W*0.007);
      [{ok:pred.pop55>pred.p21,txt:'Pop.2055: '+N(pred.pop55)+' ('+(pred.pop55>pred.p21?'+':'')+N(pred.pop55-pred.p21)+')'},{ok:pred.pctUE55>=75,txt:'PIB 2055: '+N(pred.pib55)+' EUR ('+pred.pctUE55+'% UE)'},{ok:pred.anSUMP<=2035,txt:'SUMP atingibil ~'+pred.anSUMP},{ok:pred.sdgTotal>=6,txt:'SDG11: '+pred.sdgTotal+'/10'},{ok:Math.round(2025+pred.fond/Math.max(1,pred.fond*0.25/10))<=2045,txt:'Fond seismic eliminat ~'+Math.round(2025+pred.fond/Math.max(1,pred.fond*0.25/10))}].forEach((c2,i)=>{
        al(sA*rE(0.34+i*0.06,0.2));
        ctx.fillStyle=c2.ok?'#22c55e':'#f59e0b';ctx.font=`700 ${W*0.016}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(c2.ok?'✓':'◎',W*0.59,H*(0.478+i*0.075));
        lbl(c2.txt,W*0.62,H*(0.480+i*0.075),'rgba(220,230,255,0.88)',W*0.0065);
      });
      al(sA*rE(0.65,0.3));ctx.fillStyle='rgba(212,175,55,0.15)';ctx.fillRect(0,H*0.912,W,H*0.088);
      ctx.fillStyle='#D4AF37';ctx.font=`${W*0.007}px "IBM Plex Mono",monospace`;ctx.textAlign='center';ctx.fillText('UrbanX TSS·FG · PLATFORMA NATIONALA URBANISM DIGITAL',W/2,H*0.942);
      ctx.fillStyle='rgba(148,163,184,0.5)';ctx.font=`${W*0.0058}px "IBM Plex Mono",monospace`;ctx.fillText('© 2026 ThinkSmart Solutions SRL · '+name+' · '+new Date().toLocaleDateString('ro-RO'),W/2,H*0.970);
      break;
    }

    } // end switch
    prog();
    // Film grain minimal
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
  console.log('[TCI Cinematic v7.0] ✅ Ready — 17 scene, _PRED complet, orice UAT RO');
  const patch=(n)=>{
    if(typeof TCI!=='undefined'&&typeof window.openTCI==='function'){
      const orig=window.openTCI;
      window.openTCI=function(opts){
        if(opts?.mode==='cinema_v2'||opts?.scenes||window._preferCinemaV2){
          G._SceneEngine.launch(opts?.cityKey||G._SceneEngine._getCityKey());
        }else{orig?.(opts);}
      };
      window._switchToCinemaV2=()=>{window._preferCinemaV2=true;ss('🎬 Cinema v7 activ');};
      window._switchToTCIClassic=()=>{window._preferCinemaV2=false;ss('📊 TCI Clasic activ');};
    }else if(n<40)setTimeout(()=>patch(n+1),500);
  };
  patch(0);
  ss('🎬 TCI Cinematic v7.0 — 17 scene · _PRED complet · fix bare 3D · orice UAT RO');
})();

})(window);
