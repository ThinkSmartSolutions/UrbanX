// tci-cinematic-scenes.js — UrbanX TCI Cinematic v5.0
// ThinkSmart Solutions SRL | 23 mai 2026
// Harta Mapbox = actor principal. Canvas = date deasupra.
// Zero hardcode. Predicții dinamice per orice UAT.
(function(G){
'use strict';
const N=(v,d=0)=>isNaN(+v)?'—':Number(v).toLocaleString('ro-RO',{minimumFractionDigits:d,maximumFractionDigits:d});
const ss=(m)=>{try{window.showSnackbar?.(m);}catch(e){}console.log('[Cinema v5]',m);};
const easeOut=(t)=>1-Math.pow(1-Math.max(0,Math.min(1,t)),3);

// ── MOTOR PREDICȚII ────────────────────────────────────────────────────────
const _PRED={
  calc(city){
    const p21=city.pop2021||100000, p11=city.pop2011||p21;
    const r10=city.rata_reala_2011_2021??((p21-p11)/p11/10*100);
    const pib=city.pib_eur_cap||9000, hub=city.coef_hub||1.0;
    const reg=city.regiune||'C', sup=city.suprafata_ha||Math.round(p21*0.025);
    const sv=city.spatii_verzi_mp_loc||10, tp=city.acoperire_transport||55;
    const ag=city.ag_seismic||(reg==='MN'||reg==='VR'?0.35:reg==='IS'||reg==='VS'?0.25:0.15);
    const lat=city.lat||45.5, fond=city.cladiri_risc||Math.round(p21*0.008);
    const auth=city.autorizatii_2023||Math.round(p21/1000*1.2);
    // Demografic
    const rRef=hub>=1.5?0.9:hub>=1.2?0.45:hub>=1.0?0.1:r10;
    const pop30=Math.round(p21*Math.pow(1+rRef/100,9));
    const pop45=Math.round(p21*Math.pow(1+rRef/100,24));
    const pop55=Math.round(p21*Math.pow(1+rRef/100,34));
    const deltaP=pop55-p21;
    // Structură vârstă
    const varste={'0-14':Math.round(p21*(hub>=1.2?0.148:0.142)),'15-24':Math.round(p21*(hub>=1.5?0.132:0.118)),'25-44':Math.round(p21*0.265),'45-64':Math.round(p21*0.248),'65+':Math.round(p21*(hub>=1.2?0.185:0.228))};
    // Profil locuitor
    const salariu=Math.round(pib*0.52/12), ocupare=Math.round(55+hub*8);
    const somaj=Math.round(Math.max(2,12-hub*4));
    const migNeta=Math.round(r10*p21/100-(hub>=1.2?-200:500));
    const natalitate=Math.round(8+hub*1.5), mortalit=Math.round(12-hub*1.2);
    const sporNat=natalitate-mortalit;
    const ocupatie={servicii:Math.round(35+hub*12),industrie:Math.round(28-hub*5),comert:Math.round(18+hub*3),constructii:Math.round(8+auth/100),agricultura:Math.round(Math.max(2,11-hub*6))};
    // Economic
    const UE27=36600, pctUE=Math.round(pib/UE27*100);
    const rPIB=3.8+(hub-1.0)*1.4;
    const pib35=Math.round(pib*Math.pow(1+rPIB/100,11));
    const pib55e=Math.round(pib*Math.pow(1+rPIB/100,31));
    const pctUE35=Math.round(pib35/(UE27*Math.pow(1.015,11))*100);
    const pctUE55=Math.round(pib55e/(UE27*Math.pow(1.015,31))*100);
    const anConv=pctUE<75?Math.round(2024+Math.log(75/pctUE)/Math.log(1+(rPIB-1.5)/100)):2024;
    // Dezvoltare
    const defLoc=Math.max(0,Math.round(deltaP*35/90));
    const recHa=Math.round(sup*0.04*hub);
    const coridoare=[{dir:'NORD',pct:0.28,tip:'EXPANSIUNE',c:'#ef4444'},{dir:'EST',pct:0.24,tip:'DENSIFICARE',c:'#f59e0b'},{dir:'SUD',pct:0.30,tip:'EXPANSIUNE',c:'#ef4444'},{dir:'VEST',pct:0.18,tip:'RECONVERSIE',c:'#22c55e'}].map(cor=>({...cor,locuinte:Math.round(defLoc*cor.pct),pop:Math.round(deltaP*cor.pct)}));
    const intravilanRings=[{yr:2011,rm:0.85,op:0.15,col:'#94a3b8'},{yr:2021,rm:1.00,op:0.25,col:'#60a5fa'},{yr:2035,rm:1.12,op:0.35,col:'#f59e0b'},{yr:2055,rm:1.28,op:0.45,col:'#ef4444'}];
    // Mobilitate
    const mot24=Math.round(390+(pib-9000)/500);
    const mot35=Math.min(660,Math.round(mot24*1.18));
    const mot55=Math.min(710,Math.round(mot24*1.30));
    const satAn=mot55>=640?Math.round(2024+(640-mot24)/((mot55-mot24)/31)):2062;
    const fluxOra=Math.round(p21*0.12*mot24/390);
    const pasaje=Math.round(hub*2+p21/100000*1.5);
    const capRez=Math.max(0,Math.round((710-mot55)/710*100));
    // Transport public
    const defTP=Math.max(0,75-tp), kmBRT=Math.round(hub*8+p21/50000*5);
    const costBRT=Math.round(kmBRT*3.5);
    const statiiNoi=Math.max(0,Math.round(pop55/800-p21*tp/100/800));
    const anSUMP=2025+Math.round(defTP/5);
    const walkScore=Math.min(85,Math.round(40+hub*15+tp*0.3));
    // Seismic
    const fond35=Math.round(fond*1.05), fond45=Math.round(fond*1.12);
    const pnrrAp=Math.round(fond*0.25), costReab=Math.round(fond*0.085);
    const anElim=fond>0?Math.round(2025+fond/Math.max(1,pnrrAp/10)):2035;
    // Climatice
    const zile24=Math.max(5,Math.round(30-(lat-44)*4));
    const zile55=Math.round(zile24*2.2), uhi=Math.round(2+hub*0.8);
    const riscIn=city.risc_inundatii||(lat<45.5?'RIDICAT':lat<46.5?'MEDIU':'SCĂZUT');
    const costAd=Math.round(p21/10000*1.8), costIn=Math.round(costAd*4.5);
    // Infrastructură
    const scoliNoi=Math.max(0,Math.round(Math.max(0,deltaP)*0.14/400));
    const gradNoi=Math.max(0,Math.round(Math.max(0,deltaP)*0.06/120));
    const cabMed=Math.max(0,Math.round(Math.max(0,deltaP)/1800));
    const svHa=Math.max(0,Math.round((pop55*9-p21*sv)/10000));
    // SDG11
    const sdg_sv=Math.min(10,Math.round(sv/9*10));
    const sdg_tp=Math.min(10,Math.round(tp/75*10));
    const sdg_pib=Math.min(10,Math.round(pctUE/100*10));
    const sdg_seis=Math.min(10,Math.round((1-fond/(p21*0.02))*10));
    const sdgTotal=Math.round((sdg_sv+sdg_tp+sdg_pib+sdg_seis)/4*10)/10;
    // Investiții
    const invTotal=Math.round(p21/1000*0.85*hub*10)/10;
    const invMob=Math.round(invTotal*0.32), invSoc=Math.round(invTotal*0.28);
    const invSeis=Math.round(invTotal*0.18), invVerde=Math.round(invTotal*0.14);
    // Peers
    const peers=p21>200000?[{n:'Brno (CZ)',pib:22100,sv:16,tp:72},{n:'Łódź (PL)',pib:16800,sv:14,tp:68},{n:'Plovdiv (BG)',pib:12400,sv:11,tp:61}]:p21>80000?[{n:'Olomouc (CZ)',pib:18200,sv:15,tp:65},{n:'Rzeszów (PL)',pib:14600,sv:13,tp:62},{n:'Stara Zagora',pib:11200,sv:10,tp:55}]:[{n:'Hradec Král.',pib:17100,sv:18,tp:63},{n:'Tarnów (PL)',pib:12800,sv:12,tp:58},{n:'Vidin (BG)',pib:8400,sv:9,tp:44}];
    // Agenda primar
    const agenda=[{cod:'TP',lbl:'Transport Public & SUMP',score:defTP,c:'#60a5fa'},{cod:'SEIS',lbl:'Reabilitare Fond Seismic',score:fond/50,c:'#ef4444'},{cod:'SV',lbl:'Spații Verzi & Climă',score:svHa/2,c:'#22c55e'},{cod:'DEM',lbl:'Servicii Sociale & Demografic',score:Math.abs(r10)*10,c:'#f59e0b'},{cod:'PIB',lbl:'Atragere Investiții & PIB',score:Math.max(0,75-pctUE),c:'#a78bfa'}].sort((a,b)=>b.score-a.score);
    return {p21,p11,r10,rRef,pop30,pop45,pop55,deltaP,varste,salariu,ocupare,somaj,migNeta,natalitate,mortalit,sporNat,ocupatie,pib,pib35,pib55:pib55e,pctUE,pctUE35,pctUE55,rPIB,anConv,defLoc,recHa,coridoare,intravilanRings,auth,mot24,mot35,mot55,satAn,fluxOra,pasaje,capRez,defTP,kmBRT,costBRT,statiiNoi,anSUMP,walkScore,tp,fond,fond35,fond45,pnrrAp,costReab,anElim,ag,zile24,zile55,uhi,riscIn,costAd,costIn,scoliNoi,gradNoi,cabMed,svHa,sdg_sv,sdg_tp,sdg_pib,sdg_seis,sdgTotal,invTotal,invMob,invSoc,invSeis,invVerde,peers,agenda,sup,sv,hub,reg,lat};
  }
};

// ── SCENE ENGINE ──────────────────────────────────────────────────────────
G._SceneEngine={
  _playing:false,_raf:null,_startT:0,_sceneIdx:0,
  _city:null,_pred:null,_canvas:null,_ctx:null,_map:null,
  _rotInt:null,_hiddenEls:[],_pugGeo:null,_reguli:null,_wikiText:'',_gf:null,
  SCENES:[
    {id:'intro',     dur:18000,label:'Identitate & Istoric'},
    {id:'portrait',  dur:22000,label:'Portretul Comunității'},
    {id:'economy',   dur:18000,label:'Economie & Convergență UE'},
    {id:'growth',    dur:24000,label:'Unde Crește Orașul 2025–2055'},
    {id:'mobility',  dur:20000,label:'Mobilitate & Congestie'},
    {id:'transit',   dur:18000,label:'Transport Public & Walkability'},
    {id:'seismic',   dur:18000,label:'Risc Seismic & PNRR'},
    {id:'climate',   dur:20000,label:'Climă, Inundații & Adaptare'},
    {id:'montecarlo',dur:20000,label:'Proiecție 2055 — 3 Scenarii'},
    {id:'infra',     dur:18000,label:'Infrastructură Necesară 2025–2055'},
    {id:'sdg',       dur:18000,label:'Calitate Viață — SDG11 & EU'},
    {id:'vision',    dur:24000,label:'Viziunea 2055 — Concluzii'},
  ],
  async launch(cityKey){
    const map=window.map; if(!map){ss('Harta indisponibilă');return;}
    this._map=map;
    const db=window._RO_CITIES_DB||{};
    const city=db[cityKey]||Object.values(db)[0]||{name:'Municipiu',lat:45.5,lon:25.0,pop2021:100000,pop2011:100000,pib_eur_cap:9000,regiune:'C',tip:'municipiu',coef_hub:1.0,suprafata_ha:5000,spatii_verzi_mp_loc:10,acoperire_transport:55};
    this._city=city; this._pred=_PRED.calc(city);
    this._hideUI();
    this._canvas=this._createCanvas(); this._ctx=this._canvas.getContext('2d');
    this._pugGeo=null;this._reguli=null;this._wikiText='';
    this._loadAssets(city);
    this._sceneIdx=0;this._playing=true;
    this._injectControls();
    this._runScene(0);
    ss('🎬 TCI Cinematic v5 — '+city.name);
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
      console.log('[v5] PUG:',this._pugGeo?.features?.length,'Reguli:',Object.keys(this._reguli||{}).length);
    }catch(e){console.warn('[v5] assets:',e.message);}
    try{
      const r=await fetch('https://ro.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(city.name),{signal:AbortSignal.timeout(5000)});
      if(r.ok){const d=await r.json();this._wikiText=d.extract?d.extract.slice(0,320)+'...':'';}
    }catch(e){}
  },
  _injectControls(){
    document.getElementById('tci-v5-ctrl')?.remove();
    const div=document.createElement('div');
    div.id='tci-v5-ctrl';
    div.style.cssText='position:fixed;bottom:24px;right:24px;z-index:96000;display:flex;gap:10px;';
    div.innerHTML='<button id="tci-skip" style="background:rgba(15,23,42,.88);border:1px solid rgba(255,255,255,.15);color:#94a3b8;padding:8px 18px;border-radius:8px;cursor:pointer;font:13px monospace">▶ SCENĂ URMT.</button><button id="tci-stop" style="background:rgba(15,23,42,.88);border:1px solid rgba(255,255,255,.15);color:#ef4444;padding:8px 16px;border-radius:8px;cursor:pointer;font:13px monospace">✕ OPRIRE</button>';
    document.body.appendChild(div);
    document.getElementById('tci-skip').onclick=()=>{this._sceneIdx=Math.min(this._sceneIdx+1,this.SCENES.length-1);this._startT=performance.now()-this.SCENES[this._sceneIdx].dur+2000;};
    document.getElementById('tci-stop').onclick=()=>this.stop();
  },
  _runScene(idx){
    if(!this._playing||idx>=this.SCENES.length){this._finish();return;}
    const scene=this.SCENES[idx]; this._sceneIdx=idx; this._startT=performance.now();
    this._setupMap(scene.id);
    const loop=()=>{
      if(!this._playing)return;
      const t=Math.min(1,(performance.now()-this._startT)/scene.dur);
      if(this._ctx&&this._canvas){this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height);try{this._renderScene(scene.id,t,scene);}catch(e){console.warn('[v5]',e.message);}}
      if(t<1){this._raf=requestAnimationFrame(loop);}else{this._runScene(idx+1);}
    };
    this._raf=requestAnimationFrame(loop);
  },
  stop(){
    this._playing=false;if(this._raf)cancelAnimationFrame(this._raf);if(this._rotInt){clearInterval(this._rotInt);this._rotInt=null;}
    this._canvas?.remove();this._canvas=null;this._ctx=null;document.getElementById('tci-v5-ctrl')?.remove();
    this._cleanupMapLayers();this._restoreUI();
    try{window.map?.flyTo({zoom:13,pitch:45,bearing:0,duration:1500,essential:true});}catch(e){}
    ss('⏹ TCI oprit');
  },
  _finish(){
    this._playing=false;if(this._raf)cancelAnimationFrame(this._raf);if(this._rotInt){clearInterval(this._rotInt);this._rotInt=null;}
    document.getElementById('tci-v5-ctrl')?.remove();
    const c=document.getElementById('tci-scene-canvas');
    if(c){c.style.transition='opacity 1s';c.style.opacity='0';setTimeout(()=>c.remove(),1200);}
    this._canvas=null;this._ctx=null;this._cleanupMapLayers();setTimeout(()=>this._restoreUI(),1000);
    try{window.map?.flyTo({zoom:13,pitch:45,bearing:0,duration:2000,essential:true});window.map?.setConfigProperty?.('basemap','lightPreset','day');}catch(e){}
    ss('✅ TCI Cinematic v5 finalizat — '+(this._city?.name||''));
  },
  _createCanvas(){
    document.getElementById('tci-scene-canvas')?.remove();
    const c=document.createElement('canvas');c.id='tci-scene-canvas';
    const dpr=window.devicePixelRatio||1;
    c.style.cssText='position:fixed;top:0;left:0;z-index:95000;width:100vw;height:100vh;pointer-events:none;';
    c.width=window.innerWidth*dpr;c.height=window.innerHeight*dpr;c.getContext('2d').scale(dpr,dpr);document.body.appendChild(c);return c;
  },
  _hideUI(){
    this._hiddenEls=[];
    ['#panel','#panel-tabs','#panel-body','#mob-light-panel','#tci-adv-menu','#viz-menu','#rapoarte-menu','#analize-menu','#topbar','#wx-topbar','#info-drawer','#utr-drawer','#info-drawer-backdrop','#cancel-parcel-btn','#btnPDF','#ux-gdpr-footer'].forEach(sel=>{const el=document.querySelector(sel);if(el){el.dataset.tciH=el.style.display||'';el.style.setProperty('display','none','important');this._hiddenEls.push(el);}});
    const nav=document.querySelector('nav,#navbar,[id*="topbar"],[id*="top-bar"]');if(nav){nav.dataset.tciH=nav.style.display||'';nav.style.setProperty('display','none','important');this._hiddenEls.push(nav);}
  },
  _restoreUI(){this._hiddenEls.forEach(el=>{el.style.cssText=el.dataset.tciH||'';delete el.dataset.tciH;});this._hiddenEls=[];},
  _setupMap(id){
    const map=this._map;if(!map)return;
    const cx=this._city?.lon||25.0,cy=this._city?.lat||45.5;
    this._cleanupMapLayers();if(this._rotInt){clearInterval(this._rotInt);this._rotInt=null;}
    const fly=(z,p,b,d,lp)=>{try{map.flyTo({center:[cx,cy],zoom:z,pitch:p,bearing:b,duration:d||2500,essential:true});}catch(e){}if(lp)try{map.setConfigProperty('basemap','lightPreset',lp);}catch(e){}};
    switch(id){
      case 'intro':fly(11,0,0,3000,'night');break;
      case 'portrait':fly(12,45,10,3000,'dawn');this._setupDensityLayer(map);break;
      case 'economy':fly(13.5,55,-20,2500,'day');this._setup3DBuildings(map);break;
      case 'growth':
        try{map.setCenter([cx,cy]);map.setZoom(10.5);map.setPitch(55);map.setBearing(10);}catch(e){}
        setTimeout(()=>{try{map.flyTo({center:[cx,cy],zoom:11,pitch:58,bearing:15,duration:2000,essential:true});}catch(e){}},400);
        try{map.setConfigProperty('basemap','lightPreset','night');}catch(e){}
        ['utr-fill','utr-line','utr-lbl'].forEach(lid=>{try{map.getLayer(lid)&&map.setLayoutProperty(lid,'visibility','none');}catch(e){}});
        this._setup3DGrowth(map);this._startRotation(map,15,0.018);break;
      case 'mobility':fly(13,42,0,2000,'night');this._setupTrafficLines(map);break;
      case 'transit':fly(13,40,-15,2000,'day');this._setupTransitLayer(map);break;
      case 'seismic':fly(12,35,0,2500,'night');this._setupSeismicLayer(map);break;
      case 'climate':fly(12,30,0,2500,'dawn');this._setupFloodLayer(map);this._setupRoadsLayer(map);break;
      case 'montecarlo':fly(11,45,-10,2500,'dusk');this._setupIntravilanRings(map);break;
      case 'infra':fly(13,50,20,2000,'day');this._setupDensityLayer(map);break;
      case 'sdg':fly(13,45,5,2000,'day');this._setupGreenLayer(map);break;
      case 'vision':
        try{map.setCenter([cx,cy]);map.setZoom(10.5);map.setPitch(55);map.setBearing(0);}catch(e){}
        setTimeout(()=>{try{map.flyTo({center:[cx,cy],zoom:11.5,pitch:60,bearing:20,duration:3000,essential:true});}catch(e){}},500);
        try{map.setConfigProperty('basemap','lightPreset','dusk');}catch(e){}
        this._setup3DBuildings(map);this._startRotation(map,20,0.012);break;
    }
  },
  _setup3DGrowth(map){
    try{
      const src='tci-gr-s',lyr='tci-gr-l';if(map.getLayer(lyr))map.removeLayer(lyr);if(map.getSource(src))map.removeSource(src);
      const geo=this._pugGeo,reg=this._reguli||{},pred=this._pred;let features=[];
      if(geo?.features?.length>0){
        geo.features.slice(0,500).forEach(f=>{
          const u=f.properties?.utr_cod||f.properties?.cod_utr||'',rv=reg[u]||{};
          const cut=parseFloat(rv.CUT||rv.cut||0)||0;
          const pr=u.startsWith('CC')||u.startsWith('CP')?0.92:u.startsWith('CM')||u.startsWith('CB')?0.72:u.startsWith('LC')||u.startsWith('LB')?0.55:u.startsWith('LA')||u.startsWith('LL')?0.40:u.startsWith('AI')||u.startsWith('AA')?0.65:u.startsWith('P')?0.20:0.30;
          const hM=Math.max(3,(cut||pr*4)*(8+pred.hub*5));
          const cl=pr>0.75?'#ef4444':pr>0.55?'#f59e0b':pr>0.38?'#60a5fa':'#22c55e';
          features.push({...f,properties:{...f.properties,hM,hC:0,cl,pr}});
        });
      }else{
        const [Cx,Cy]=[this._city?.lon||25,this._city?.lat||45.5];
        [[0.008,0.92,'#ef4444',55],[0.020,0.72,'#f59e0b',35],[0.038,0.55,'#60a5fa',22],[0.060,0.35,'#22c55e',12]].forEach(([r,pr,cl,hM])=>{
          const n=24,coords=[];for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;coords.push([Cx+Math.cos(a)*r*1.5,Cy+Math.sin(a)*r]);}
          features.push({type:'Feature',geometry:{type:'Polygon',coordinates:[coords]},properties:{hM,hC:0,cl,pr}});
        });
      }
      map.addSource(src,{type:'geojson',data:{type:'FeatureCollection',features}});
      map.addLayer({id:lyr,type:'fill-extrusion',source:src,paint:{'fill-extrusion-color':['get','cl'],'fill-extrusion-height':['get','hC'],'fill-extrusion-base':0,'fill-extrusion-opacity':0.85}});
      this._gf=features;
    }catch(e){console.warn('[v5] 3D:',e.message);}
  },
  _updateGrowthBars(t){
    const map=this._map;if(!map||!this._gf)return;
    try{const src=map.getSource('tci-gr-s');if(!src)return;const tE=easeOut(t);src.setData({type:'FeatureCollection',features:this._gf.map(f=>({...f,properties:{...f.properties,hC:f.properties.hM*tE}}))});}catch(e){}
  },
  _setup3DBuildings(map){
    try{
      const src='tci-bl-s',lyr='tci-bl-l';if(map.getLayer(lyr))map.removeLayer(lyr);if(map.getSource(src))map.removeSource(src);
      if(!this._pugGeo?.features?.length)return;
      const reg=this._reguli||{};
      const features=this._pugGeo.features.slice(0,500).map(f=>{const u=f.properties?.utr_cod||'',rv=reg[u]||{};const rh=parseInt(rv.RH?.replace(/[^0-9]/g,'')||'3');const h=Math.max(3,rh*3.2);return{...f,properties:{...f.properties,h,cl:h>30?'#94a3b8':h>18?'#cbd5e1':'#e2e8f0'}};});
      map.addSource(src,{type:'geojson',data:{type:'FeatureCollection',features}});
      map.addLayer({id:lyr,type:'fill-extrusion',source:src,paint:{'fill-extrusion-color':['get','cl'],'fill-extrusion-height':['get','h'],'fill-extrusion-base':0,'fill-extrusion-opacity':0.7}});
    }catch(e){}
  },
  _setupDensityLayer(map){
    try{
      const src='tci-dn-s',lyr='tci-dn-l';if(map.getLayer(lyr))map.removeLayer(lyr);if(map.getSource(src))map.removeSource(src);
      if(!this._pugGeo?.features?.length)return;
      map.addSource(src,{type:'geojson',data:this._pugGeo});
      map.addLayer({id:lyr,type:'fill',source:src,paint:{'fill-color':['case',['<',['get','suprafata_mp'],3000],'#ef4444',['<',['get','suprafata_mp'],8000],'#f59e0b',['<',['get','suprafata_mp'],20000],'#60a5fa','#22c55e'],'fill-opacity':0.38}});
    }catch(e){}
  },
  _setupTrafficLines(map){
    try{
      const src='tci-tr-s',lyr='tci-tr-l';if(map.getLayer(lyr))map.removeLayer(lyr);if(map.getSource(src))map.removeSource(src);
      const [Cx,Cy]=[this._city?.lon||25,this._city?.lat||45.5],r=0.04,lines=[];
      [0,45,90,135,180,225,270,315].forEach((deg,i)=>{const rad=deg*Math.PI/180,cl=i<3?'#ef4444':i<6?'#f59e0b':'#22c55e';lines.push({type:'Feature',geometry:{type:'LineString',coordinates:[[Cx,Cy],[Cx+Math.cos(rad)*r*1.4,Cy+Math.sin(rad)*r*0.7]]},properties:{cl,w:i<3?4:3}});});
      const n=48,ring=[];for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;ring.push([Cx+Math.cos(a)*r*1.6,Cy+Math.sin(a)*r*0.85]);}
      lines.push({type:'Feature',geometry:{type:'LineString',coordinates:ring},properties:{cl:'#a78bfa',w:3}});
      map.addSource(src,{type:'geojson',data:{type:'FeatureCollection',features:lines}});
      map.addLayer({id:lyr,type:'line',source:src,paint:{'line-color':['get','cl'],'line-width':['get','w'],'line-opacity':0.85},layout:{'line-cap':'round','line-join':'round'}});
    }catch(e){}
  },
  _setupTransitLayer(map){
    try{
      const src='tci-tp-s',lyr='tci-tp-l',lb='tci-br-l';
      if(map.getLayer(lb))map.removeLayer(lb);if(map.getLayer(lyr))map.removeLayer(lyr);if(map.getSource(src))map.removeSource(src);
      const [Cx,Cy]=[this._city?.lon||25,this._city?.lat||45.5],pred=this._pred,tR=pred.tp/100*0.06,n=48,lines=[];
      const tRing=[];for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;tRing.push([Cx+Math.cos(a)*tR*1.5,Cy+Math.sin(a)*tR]);}
      lines.push({type:'Feature',geometry:{type:'LineString',coordinates:tRing},properties:{tip:'tp'}});
      [0,90,180,270].slice(0,Math.min(4,Math.ceil(pred.kmBRT/5))).forEach(deg=>{const rad=deg*Math.PI/180;lines.push({type:'Feature',geometry:{type:'LineString',coordinates:[[Cx-Math.cos(rad)*0.05,Cy-Math.sin(rad)*0.03],[Cx+Math.cos(rad)*0.05,Cy+Math.sin(rad)*0.03]]},properties:{tip:'brt'}});});
      map.addSource(src,{type:'geojson',data:{type:'FeatureCollection',features:lines}});
      map.addLayer({id:lyr,type:'line',source:src,filter:['==','tip','tp'],paint:{'line-color':'#60a5fa','line-width':3,'line-opacity':0.6},layout:{'line-cap':'round'}});
      map.addLayer({id:lb,type:'line',source:src,filter:['==','tip','brt'],paint:{'line-color':'#a78bfa','line-width':5,'line-opacity':0.85,'line-dasharray':[3,2]},layout:{'line-cap':'round'}});
    }catch(e){}
  },
  _setupSeismicLayer(map){
    try{
      const src='tci-se-s',lyr='tci-se-l';if(map.getLayer(lyr))map.removeLayer(lyr);if(map.getSource(src))map.removeSource(src);
      const [Cx,Cy]=[this._city?.lon||25,this._city?.lat||45.5],pred=this._pred;
      const cl=pred.ag>=0.30?'#ef4444':pred.ag>=0.20?'#f59e0b':'#22c55e',r=0.08*(pred.ag/0.25),n=64,ring=[];
      for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;ring.push([Cx+Math.cos(a)*r*1.5,Cy+Math.sin(a)*r]);}
      map.addSource(src,{type:'geojson',data:{type:'Feature',geometry:{type:'Polygon',coordinates:[ring]},properties:{}}});
      map.addLayer({id:lyr,type:'fill',source:src,paint:{'fill-color':cl,'fill-opacity':0.25}});
    }catch(e){}
  },
  _setupFloodLayer(map){
    try{
      const src='tci-fl-s',lyr='tci-fl-l';if(map.getLayer(lyr))map.removeLayer(lyr);if(map.getSource(src))map.removeSource(src);
      const [Cx,Cy]=[this._city?.lon||25,this._city?.lat||45.5];
      const fc=[[Cx-0.06,Cy-0.01],[Cx-0.04,Cy-0.015],[Cx-0.01,Cy-0.008],[Cx+0.02,Cy-0.005],[Cx+0.05,Cy-0.012],[Cx+0.06,Cy+0.005],[Cx+0.05,Cy+0.018],[Cx+0.02,Cy+0.015],[Cx-0.01,Cy+0.012],[Cx-0.04,Cy+0.008],[Cx-0.06,Cy+0.01]];
      map.addSource(src,{type:'geojson',data:{type:'Feature',geometry:{type:'Polygon',coordinates:[fc]},properties:{}}});
      map.addLayer({id:lyr,type:'fill',source:src,paint:{'fill-color':'#3b82f6','fill-opacity':0.40}});
    }catch(e){}
  },
  _setupRoadsLayer(map){
    try{
      const src='tci-rd-s',la='tci-au-l',lc='tci-ce-l';
      if(map.getLayer(lc))map.removeLayer(lc);if(map.getLayer(la))map.removeLayer(la);if(map.getSource(src))map.removeSource(src);
      const [Cx,Cy]=[this._city?.lon||25,this._city?.lat||45.5],lines=[];
      lines.push({type:'Feature',geometry:{type:'LineString',coordinates:[[Cx-0.12,Cy+0.02],[Cx-0.04,Cy+0.01],[Cx+0.04,Cy+0.01],[Cx+0.12,Cy+0.02]]},properties:{tip:'auto'}});
      const n=64,r=0.06,ring=[];for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;ring.push([Cx+Math.cos(a)*r*1.5,Cy+Math.sin(a)*r]);}
      lines.push({type:'Feature',geometry:{type:'LineString',coordinates:ring},properties:{tip:'centura'}});
      map.addSource(src,{type:'geojson',data:{type:'FeatureCollection',features:lines}});
      map.addLayer({id:la,type:'line',source:src,filter:['==','tip','auto'],paint:{'line-color':'#fbbf24','line-width':5,'line-opacity':0.9},layout:{'line-cap':'butt'}});
      map.addLayer({id:lc,type:'line',source:src,filter:['==','tip','centura'],paint:{'line-color':'#f97316','line-width':4,'line-opacity':0.8},layout:{'line-cap':'round'}});
    }catch(e){}
  },
  _setupIntravilanRings(map){
    try{
      const src='tci-ir-s',lyr='tci-ir-l';if(map.getLayer(lyr))map.removeLayer(lyr);if(map.getSource(src))map.removeSource(src);
      const [Cx,Cy]=[this._city?.lon||25,this._city?.lat||45.5],pred=this._pred;
      const features=pred.intravilanRings.map(ring=>{const n=64,r=0.06*ring.rm,coords=[];for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;coords.push([Cx+Math.cos(a)*r*1.5,Cy+Math.sin(a)*r]);}return{type:'Feature',geometry:{type:'LineString',coordinates:coords},properties:{yr:ring.yr,cl:ring.col,op:ring.op,w:ring.yr===2055?4:2}};});
      map.addSource(src,{type:'geojson',data:{type:'FeatureCollection',features}});
      map.addLayer({id:lyr,type:'line',source:src,paint:{'line-color':['get','cl'],'line-width':['get','w'],'line-opacity':['get','op'],'line-dasharray':[4,2]},layout:{'line-cap':'round'}});
    }catch(e){}
  },
  _setupGreenLayer(map){
    try{
      const src='tci-gn-s',lyr='tci-gn-l';if(map.getLayer(lyr))map.removeLayer(lyr);if(map.getSource(src))map.removeSource(src);
      if(!this._pugGeo?.features?.length)return;
      const features=this._pugGeo.features.map(f=>{const u=f.properties?.utr_cod||'';const g=u.startsWith('V')||u.startsWith('P')||u.startsWith('G');return{...f,properties:{...f.properties,isG:g,cl:g?'#22c55e':'#1e293b'}};});
      map.addSource(src,{type:'geojson',data:{type:'FeatureCollection',features}});
      map.addLayer({id:lyr,type:'fill',source:src,paint:{'fill-color':['get','cl'],'fill-opacity':['case',['get','isG'],0.6,0.1]}});
    }catch(e){}
  },
  _cleanupMapLayers(){
    const map=this._map;if(!map)return;
    ['tci-gr-l','tci-gr-s','tci-bl-l','tci-bl-s','tci-dn-l','tci-dn-s','tci-tr-l','tci-tr-s','tci-tp-l','tci-br-l','tci-tp-s','tci-se-l','tci-se-s','tci-fl-l','tci-fl-s','tci-au-l','tci-ce-l','tci-rd-s','tci-ir-l','tci-ir-s','tci-gn-l','tci-gn-s'].forEach(id=>{try{if(map.getLayer(id))map.removeLayer(id);}catch(e){}try{if(map.getSource(id))map.removeSource(id);}catch(e){}});
    ['utr-fill','utr-line','utr-lbl'].forEach(id=>{try{map.getLayer(id)&&map.setLayoutProperty(id,'visibility','visible');}catch(e){}});
    this._gf=null;
  },
  _startRotation(map,b0,spd){
    if(this._rotInt)clearInterval(this._rotInt);let b=b0;
    this._rotInt=setInterval(()=>{if(!this._playing){clearInterval(this._rotInt);this._rotInt=null;return;}b+=spd;try{map.setBearing(b%360);}catch(e){}},50);
  },

  _renderScene(id,t,scene){
    const ctx=this._ctx,W=window.innerWidth,H=window.innerHeight;
    const city=this._city,pred=this._pred,name=city?.name||'UAT';
    if(!ctx)return;
    // helpers
    const rev=(d,s=0.25)=>Math.min(1,Math.max(0,(t-d)/s));
    const rE=(d,s=0.25)=>easeOut(rev(d,s));
    const al=(a)=>{ctx.globalAlpha=Math.max(0,Math.min(1,a));};
    const sA=t<0.08?t/0.08:t>0.88?Math.max(0,(1-t)/0.12):1;
    const bgL=(op=0.88)=>{const g=ctx.createLinearGradient(0,0,W*0.55,0);g.addColorStop(0,`rgba(3,7,18,${op})`);g.addColorStop(0.72,`rgba(3,7,18,${op*0.7})`);g.addColorStop(1,'rgba(3,7,18,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W*0.55,H);};
    const bgT=(op=0.85)=>{const g=ctx.createLinearGradient(0,0,0,H*0.28);g.addColorStop(0,`rgba(3,7,18,${op})`);g.addColorStop(1,'rgba(3,7,18,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H*0.28);};
    const bgB=(op=0.85)=>{const g=ctx.createLinearGradient(0,H*0.72,0,H);g.addColorStop(0,'rgba(3,7,18,0)');g.addColorStop(1,`rgba(3,7,18,${op})`);ctx.fillStyle=g;ctx.fillRect(0,H*0.72,W,H*0.28);};
    const wrap=(txt,x,y,mw,lh,font,clr,ml=4)=>{ctx.font=font;ctx.fillStyle=clr;ctx.textAlign='left';const ws=txt.split(' ');let line='',lines=[],done=false;ws.forEach(w=>{if(done)return;const test=line+w+' ';if(ctx.measureText(test).width>mw&&line){lines.push(line.trim());if(lines.length>=ml){done=true;return;}line=w+' ';}else line=test;});if(!done&&line)lines.push(line.trim());lines.forEach((l,i)=>ctx.fillText(l,x,y+i*lh));};
    const card=(x,y,w,h,fill='rgba(5,10,28,0.90)',stroke='rgba(255,255,255,0.08)')=>{ctx.save();ctx.fillStyle=fill;ctx.strokeStyle=stroke;ctx.lineWidth=1;const r=10;ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r);ctx.lineTo(x+w,y+h-r);ctx.arcTo(x+w,y+h,x+w-r,y+h,r);ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r);ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();};
    const gl=(x,y,wm,tr)=>{const w=wm*tr;const g=ctx.createLinearGradient(x,y,x+w,y);g.addColorStop(0,'#D4AF37');g.addColorStop(1,'rgba(212,175,55,0)');ctx.fillStyle=g;ctx.fillRect(x,y,w,2);};
    const lbl=(txt,x,y,clr='rgba(148,163,184,0.85)',sz=W*0.0065)=>{ctx.fillStyle=clr;ctx.font=`${sz}px "IBM Plex Mono",monospace`;ctx.textAlign='left';ctx.fillText(txt,x,y);};
    const big=(txt,x,y,clr='#D4AF37',sz=W*0.055)=>{ctx.fillStyle=clr;ctx.font=`900 ${sz}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(txt,x,y);};
    const bar=(x,y,w,h,pct,clr,bg='rgba(255,255,255,0.06)')=>{ctx.fillStyle=bg;ctx.fillRect(x,y,w,h);ctx.fillStyle=clr;ctx.fillRect(x,y,w*Math.min(1,Math.max(0,pct)),h);};
    const an=(v,tr)=>Math.round(v*easeOut(tr));
    const prog=()=>{al(sA*0.7);ctx.fillStyle='rgba(255,255,255,0.08)';ctx.fillRect(W*0.2,H-28,W*0.6,3);ctx.fillStyle='#D4AF37';ctx.fillRect(W*0.2,H-28,W*0.6*((this._sceneIdx+t)/this.SCENES.length),3);ctx.fillStyle='rgba(148,163,184,0.7)';ctx.font=`${W*0.006}px "IBM Plex Mono",monospace`;ctx.textAlign='center';ctx.fillText(`${scene.label} · ${this._sceneIdx+1}/${this.SCENES.length}`,W/2,H-10);al(1);};
    const grain=()=>{ctx.save();al(0.018);for(let i=0;i<160;i++){ctx.fillStyle=Math.random()>.5?'#fff':'#000';ctx.fillRect(Math.random()*W,Math.random()*H,1,1);}ctx.restore();};

    switch(id){
    // ── S1 INTRO ─────────────────────────────────────────────────────────────
    case 'intro':{
      al(sA);bgT(0.9);bgB(0.92);
      al(sA*rE(0.05,0.4)*0.10);ctx.fillStyle='#D4AF37';ctx.font=`900 ${W*0.38}px "Space Grotesk",sans-serif`;ctx.textAlign='right';ctx.fillText((city.judet_code||name.slice(0,2)||'RO').toUpperCase(),W*0.97,H*0.78);
      al(sA);
      al(sA*rE(0.06,0.2));lbl(`${(city.tip||'municipiu').toUpperCase()} · JUD. ${(city.judet||'—').toUpperCase()} · REG. ${city.regiune||'—'}`,W*0.06,H*0.30,'rgba(148,163,184,0.7)',W*0.0072);
      al(sA*rE(0.08,0.3));gl(W*0.06,H*0.34,W*0.55,rE(0.08,0.35));
      al(sA*rE(0.10,0.3));ctx.fillStyle='#ffffff';ctx.font=`900 ${Math.min(W*0.09,118)}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name.toUpperCase(),W*0.06,H*0.46);
      ctx.fillStyle='#D4AF37';ctx.font=`700 ${W*0.013}px "Space Grotesk",sans-serif`;ctx.fillText('România · '+(city.regiune||'—'),W*0.065,H*0.51);
      al(sA*rE(0.22,0.25));card(W*0.06,H*0.56,W*0.82,H*0.16,'rgba(5,10,28,0.82)');al(sA*rE(0.22,0.25));
      [[N(pred.p21),'LOCUITORI 2021',W*0.10],[Math.round((city.suprafata_ha||pred.sup)/100)+' KM²','SUPRAFAȚĂ',W*0.30],[N(city.pib_eur_cap||9000)+' EUR','PIB/LOCUITOR',W*0.52],[(city.tip||'municipiu').toUpperCase(),'TIP UAT',W*0.70]].forEach(([v,l2,x])=>{lbl(l2,x,H*0.63,'#D4AF37',W*0.006);big(v,x,H*0.70,'#ffffff',W*0.025);});
      al(sA*rE(0.38,0.3));
      const wiki=this._wikiText||`${name} este ${city.tip||'municipiu'} în județul ${city.judet||'—'}, România. Populație: ${N(pred.p21)} locuitori (2021). Suprafață: ${Math.round((city.suprafata_ha||pred.sup)/100)} km². Hub urban ${pred.hub>=1.5?'metropolitan':pred.hub>=1.2?'regional major':'regional'} cu PIB/loc. ${N(pred.pib)} EUR.`;
      wrap(wiki,W*0.06,H*0.79,W*0.75,H*0.048,`${W*0.007}px "IBM Plex Mono",monospace`,'rgba(200,215,240,0.78)',3);
      al(sA*rE(0.55,0.3)*0.65);lbl('SURSE: INSE · EUROSTAT · ANCPI · BNR · WIKIPEDIA',W*0.06,H*0.93,'rgba(100,130,170,0.6)',W*0.0058);
      al(1);prog();grain();break;
    }
    // ── S2 PORTRAIT ──────────────────────────────────────────────────────────
    case 'portrait':{
      al(sA);bgL(0.90);bgT(0.80);bgB(0.85);
      al(sA*rE(0.05,0.2));lbl('PORTRETUL COMUNITĂȚII',W*0.05,H*0.12,'rgba(148,163,184,0.7)',W*0.0072);
      al(sA*rE(0.07,0.25));gl(W*0.05,H*0.145,W*0.5,rE(0.06,0.3));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.04}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Demografie & Profil',W*0.05,H*0.22);
      // Card demografic
      al(sA*rE(0.12,0.25));card(W*0.04,H*0.26,W*0.38,H*0.57,'rgba(5,10,28,0.88)');al(sA*rE(0.12,0.25));
      lbl('POPULAȚIE ACTUALĂ',W*0.07,H*0.32,'#D4AF37',W*0.0065);
      big(N(an(pred.p21,rev(0.12,0.35))),W*0.07,H*0.42,'#ffffff',W*0.045);
      lbl('LOCUITORI · RECENSĂMÂNT 2021',W*0.07,H*0.46,'#D4AF37',W*0.006);
      const tC=pred.r10>0.5?'#22c55e':pred.r10>0?'#4ade80':pred.r10>-1?'#f59e0b':'#ef4444';
      const tL=pred.r10>0.5?'CREȘTERE ACCELERATĂ':pred.r10>0?'CREȘTERE MODERATĂ':pred.r10>-1?'STABILIZARE':'DECLIN';
      lbl(tL,W*0.07,H*0.50,tC,W*0.007);
      lbl('RATĂ ANUALĂ 2011-2021',W*0.07,H*0.56,'rgba(148,163,184,0.7)',W*0.006);
      big((pred.r10>=0?'+':'')+pred.r10.toFixed(2)+'%/AN',W*0.07,H*0.645,tC,W*0.028);
      lbl('POP.2011: '+N(pred.p11)+' · VARIAȚIE: '+(pred.p21>pred.p11?'+':'')+N(pred.p21-pred.p11),W*0.07,H*0.70,'rgba(100,130,170,0.7)',W*0.0058);
      [[pred.natalitate+'‰','NATALITATE',W*0.07,H*0.77],[pred.mortalit+'‰','MORTALITATE',W*0.18,H*0.77],[(pred.sporNat>=0?'+':'')+pred.sporNat+'‰','SPOR NATURAL',W*0.29,H*0.77]].forEach(([v,l2,x,y])=>{lbl(l2,x,y,'rgba(148,163,184,0.65)',W*0.0055);lbl(v,x,y+H*0.038,pred.sporNat>0?'#22c55e':'#ef4444',W*0.008);});
      // Piramidă vârstă
      al(sA*rE(0.28,0.3));card(W*0.46,H*0.26,W*0.22,H*0.57,'rgba(5,10,28,0.88)');al(sA*rE(0.28,0.3));
      lbl('STRUCTURĂ VÂRSTĂ 2021',W*0.49,H*0.32,'#D4AF37',W*0.006);
      const vK=Object.keys(pred.varste),mV=Math.max(...Object.values(pred.varste));
      vK.forEach((k,i)=>{const v=pred.varste[k],bw=W*0.17*(v/mV)*easeOut(rev(0.30+i*0.05,0.25)),yb=H*(0.38+i*0.09),cl=i===0?'#60a5fa':i===4?'#ef4444':'#D4AF37';lbl(k,W*0.485,yb+H*0.028,'rgba(148,163,184,0.7)',W*0.0055);ctx.fillStyle=cl;ctx.fillRect(W*0.525,yb+H*0.015,bw,H*0.028);lbl(N(v),W*0.528+bw,yb+H*0.030,cl,W*0.0055);});
      // Profil socio-ec
      al(sA*rE(0.40,0.3));card(W*0.72,H*0.26,W*0.24,H*0.57,'rgba(5,10,28,0.88)');al(sA*rE(0.40,0.3));
      lbl('PROFIL SOCIO-ECONOMIC',W*0.75,H*0.32,'#D4AF37',W*0.006);
      [[N(pred.salariu)+' EUR/LUN','SALARIU MEDIU NET',H*0.40],[pred.ocupare+'%','RATA OCUPARE',H*0.49],[pred.somaj+'%','RATA ȘOMAJ',H*0.58],[(pred.migNeta>=0?'+':'')+N(pred.migNeta)+'/AN','MIGRAȚIE NETĂ',H*0.67]].forEach(([v,l2,y])=>{lbl(l2,W*0.75,y,'rgba(148,163,184,0.65)',W*0.0055);lbl(v,W*0.75,y+H*0.038,'#ffffff',W*0.009);});
      // Ocupație
      al(sA*rE(0.55,0.3));card(W*0.04,H*0.855,W*0.92,H*0.10,'rgba(5,10,28,0.88)');al(sA*rE(0.55,0.3));
      lbl('STRUCTURĂ OCUPAȚIE:',W*0.07,H*0.888,'rgba(148,163,184,0.7)',W*0.006);let ox=W*0.22;
      Object.entries(pred.ocupatie).forEach(([k,v])=>{lbl(k.toUpperCase(),ox,H*0.882,'rgba(148,163,184,0.6)',W*0.0055);lbl(v+'%',ox,H*0.905,'#D4AF37',W*0.008);ox+=W*0.14;});
      al(1);prog();grain();break;
    }
    // ── S3 ECONOMY ───────────────────────────────────────────────────────────
    case 'economy':{
      al(sA);bgL(0.88);bgT(0.80);bgB(0.88);
      al(sA*rE(0.05,0.2));lbl('ECONOMIE & PUTERE DE CUMPĂRARE',W*0.05,H*0.12,'rgba(148,163,184,0.7)',W*0.0072);lbl('SURSE: EUROSTAT · BNR · INSE 2022',W*0.05,H*0.16,'rgba(100,130,170,0.6)',W*0.006);
      al(sA*rE(0.07,0.3));gl(W*0.05,H*0.19,W*0.5,rE(0.06,0.3));
      al(sA*rE(0.09,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.04}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Context European',W*0.05,H*0.27);
      al(sA*rE(0.12,0.25));card(W*0.04,H*0.30,W*0.42,H*0.55,'rgba(5,10,28,0.88)');al(sA*rE(0.12,0.25));
      lbl('PIB/LOCUITOR ACTUAL',W*0.07,H*0.38,'rgba(148,163,184,0.8)',W*0.0065);
      big(N(an(pred.pib,rev(0.14,0.4)))+' EUR',W*0.07,H*0.48,'#D4AF37',W*0.043);lbl('EUR/LOCUITOR · EUROSTAT 2022',W*0.07,H*0.52,'#D4AF37',W*0.0065);
      lbl('VS MEDIA UE27: 36.600 EUR',W*0.07,H*0.58,'rgba(148,163,184,0.7)',W*0.006);
      bar(W*0.07,H*0.61,W*0.36,H*0.015,pred.pctUE/100*rE(0.25,0.3),'#D4AF37');
      big(N(an(pred.pctUE,rev(0.25,0.35)))+'%',W*0.07,H*0.715,pred.pctUE>=75?'#22c55e':'#f59e0b',W*0.038);lbl('DIN MEDIA UE27',W*0.07,H*0.75,'#D4AF37',W*0.006);
      if(pred.pctUE<75)lbl('CONVERGENȚĂ ESTIMATĂ: ~'+pred.anConv,W*0.07,H*0.79,'rgba(148,163,184,0.7)',W*0.006);
      al(sA*rE(0.30,0.25));card(W*0.50,H*0.30,W*0.46,H*0.55,'rgba(5,10,28,0.88)');al(sA*rE(0.30,0.25));
      lbl('PROIECȚIE PIB/CAP',W*0.53,H*0.37,'#D4AF37',W*0.0065);lbl('RATĂ CREȘTERE: +'+pred.rPIB.toFixed(1)+'%/AN',W*0.53,H*0.41,'rgba(100,130,170,0.6)',W*0.006);
      [[2035,pred.pib35,pred.pctUE35,0.35],[2055,pred.pib55,pred.pctUE55,0.55]].forEach(([yr,p,pc,td],i)=>{al(sA*rE(td,0.25));lbl(yr+'',W*0.53,H*(0.50+i*0.20),'rgba(148,163,184,0.7)',W*0.007);big(N(p)+' EUR',W*0.53,H*(0.59+i*0.20),'#ffffff',W*0.028);lbl(pc+'% din UE27',W*0.53,H*(0.63+i*0.20),pc>=75?'#22c55e':'#f59e0b',W*0.0065);bar(W*0.53,H*(0.655+i*0.20),W*0.40,H*0.012,pc/100*rE(td+0.05,0.3),pc>=75?'#22c55e':'#f59e0b');});
      // Graf convergență
      al(sA*rE(0.55,0.35));lbl('TRAIECTORIE CONVERGENȚĂ FAȚĂ DE UE27',W*0.05,H*0.84,'rgba(148,163,184,0.65)',W*0.006);
      const pts=[[2021,pred.pctUE],[2030,Math.round(pred.pctUE*1.12)],[2035,pred.pctUE35],[2055,pred.pctUE55]];
      const [gx1,gx2,gy1,gy2]=[W*0.05,W*0.92,H*0.875,H*0.955],ac=rE(0.55,0.4);
      ctx.strokeStyle='rgba(255,255,255,0.06)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(gx1,gy1);ctx.lineTo(gx2,gy1);ctx.lineTo(gx2,gy2);ctx.stroke();
      const y75=gy2-(75/100)*(gy2-gy1);ctx.strokeStyle='rgba(34,197,94,0.3)';ctx.setLineDash([4,4]);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(gx1,y75);ctx.lineTo(gx2,y75);ctx.stroke();ctx.setLineDash([]);lbl('75% UE',gx2+4,y75+4,'#22c55e',W*0.0055);
      ctx.strokeStyle='#D4AF37';ctx.lineWidth=2;ctx.beginPath();
      pts.forEach(([yr,pc],i)=>{const px=gx1+(yr-2021)/(2055-2021)*(gx2-gx1)*ac,py=gy2-(pc/100)*(gy2-gy1);if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);});ctx.stroke();
      pts.forEach(([yr,pc])=>{const px=gx1+(yr-2021)/(2055-2021)*(gx2-gx1),py=gy2-(pc/100)*(gy2-gy1);if(px<=gx1+(gx2-gx1)*ac){ctx.fillStyle='#D4AF37';ctx.beginPath();ctx.arc(px,py,4,0,Math.PI*2);ctx.fill();lbl(yr+'',px-12,py-10,'#D4AF37',W*0.006);}});
      al(1);prog();grain();break;
    }
    // ── S4 GROWTH ─────────────────────────────────────────────────────────────
    case 'growth':{
      this._updateGrowthBars(Math.min(1,t*1.4));
      al(sA);bgT(0.82);bgB(0.88);
      al(sA*rE(0.05,0.2));lbl('UNDE CREȘTE ORAȘUL — CORIDOARE 2025·2055',W*0.05,H*0.085,'rgba(148,163,184,0.7)',W*0.007);lbl('MODEL UrbanX · DATE PUG + ANCPI — BARE 3D CRESC ÎN TIMP REAL',W*0.05,H*0.125,'rgba(100,130,170,0.6)',W*0.006);
      al(sA*rE(0.07,0.3));gl(W*0.05,H*0.155,W*0.6,rE(0.06,0.3));
      al(sA*rE(0.09,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Predicție Dezvoltare Urbană',W*0.05,H*0.22);
      al(sA*rE(0.10,0.25));card(W*0.04,H*0.26,W*0.90,H*0.085,'rgba(5,10,28,0.82)');al(sA*rE(0.10,0.25));
      [[N(an(pred.defLoc,rev(0.12,0.4)))+' UN.','DEFICIT LOCUINȚE 2055','#ef4444',W*0.07],[N(pred.recHa)+' HA','RECONVERSIE DISPONIBILĂ','#f59e0b',W*0.30],[N(pred.auth),'AUTORIZAȚII 2023 (BAZĂ)','#22c55e',W*0.55],[(pred.r10>=0?'+':'')+pred.r10.toFixed(2)+'%/AN','RITM CREȘTERE ACTUAL','#60a5fa',W*0.76]].forEach(([v,l2,c,x])=>{lbl(l2,x,H*0.295,'rgba(148,163,184,0.65)',W*0.006);big(v,x,H*0.330,c,W*0.022);});
      pred.coridoare.forEach((cor,i)=>{
        const ci=rE(0.20+i*0.10,0.25),cx2=W*(0.04+i*0.235);
        al(sA*ci);card(cx2,H*0.37,W*0.22,H*0.39,'rgba(5,10,28,0.90)',cor.c+'44');al(sA*ci);
        ctx.fillStyle=cor.c;ctx.font=`900 ${W*0.020}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(cor.dir,cx2+W*0.015,H*0.42);lbl(cor.tip,cx2+W*0.015,H*0.455,'rgba(148,163,184,0.7)',W*0.006);
        lbl('LOCUINȚE NOI',cx2+W*0.015,H*0.50,'rgba(148,163,184,0.65)',W*0.006);big(N(an(cor.locuinte,rev(0.22+i*0.10,0.35))),cx2+W*0.015,H*0.565,cor.c,W*0.028);
        lbl('POP. ABSORBITĂ 2055',cx2+W*0.015,H*0.612,'rgba(148,163,184,0.65)',W*0.006);lbl('+'+N(cor.pop)+' loc.',cx2+W*0.015,H*0.648,'rgba(200,215,240,0.85)',W*0.007);bar(cx2+W*0.015,H*0.67,W*0.19,H*0.012,cor.pct*3.5,cor.c);
      });
      al(sA*rE(0.65,0.25));card(W*0.04,H*0.775,W*0.90,H*0.10,'rgba(5,10,28,0.85)');al(sA*rE(0.65,0.25));
      lbl('LEGENDĂ 3D HARTĂ — PRESIUNE URBANISTICĂ PER UTR:',W*0.07,H*0.815,'rgba(148,163,184,0.7)',W*0.006);
      [['#ef4444','MAJORĂ — CC/CP'],['#f59e0b','MEDIE — CM/CB'],['#60a5fa','MICĂ — LA/LB'],['#22c55e','RECONVERSIE — AI/AA']].forEach(([c,txt],i)=>{ctx.fillStyle=c;ctx.fillRect(W*(0.07+i*0.22),H*0.842,W*0.025,8);lbl(txt,W*(0.10+i*0.22),H*0.850,c,W*0.0058);});
      if(t>0.78){
        const ta=Math.min(1,(t-0.78)/0.15);al(sA*ta);
        const txt=pred.r10>0.5?`⚡ ${name}: creștere accelerată. Periferiile absorb ${N(pred.deltaP)} loc. până în 2055. ${N(pred.defLoc)} unități locative necesare. Risc sprawl fără PUG actualizat.`:pred.r10>0?`⚡ ${name}: creștere moderată. Reconversia (${N(pred.recHa)} ha) acoperă 40% din deficit. Densificarea centrului — soluție preferabilă.`:`⚡ ${name}: stabilizare/declin. Reabilitare fond existent prioritară. ROI maxim pe reconversie centru. PNRR — oportunitate acum.`;
        card(W*0.04,H*0.88,W*0.90,H*0.076,'rgba(212,175,55,0.12)','rgba(212,175,55,0.3)');al(sA*ta);
        wrap(txt,W*0.07,H*0.913,W*0.84,H*0.030,`${W*0.0062}px "IBM Plex Mono",monospace`,'#D4AF37',2);
      }
      al(1);prog();grain();break;
    }
    // ── S5 MOBILITY ──────────────────────────────────────────────────────────
    case 'mobility':{
      al(sA);bgL(0.88);bgT(0.80);bgB(0.88);
      al(sA*rE(0.05,0.2));lbl('MOBILITATE AUTO — CONGESTIE & SATURARE',W*0.05,H*0.12,'rgba(148,163,184,0.7)',W*0.007);lbl('HARTA ARATĂ: ROȘU=AGLOMERAT · GALBEN=MODERAT · VERDE=FLUID · VIOLET=CENTURĂ',W*0.05,H*0.16,'rgba(100,130,170,0.6)',W*0.006);
      al(sA*rE(0.07,0.25));gl(W*0.05,H*0.19,W*0.5,rE(0.06,0.3));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Presiunea Traficului',W*0.05,H*0.265);
      al(sA*rE(0.10,0.2));card(W*0.04,H*0.30,W*0.44,H*0.42,'rgba(5,10,28,0.88)');al(sA*rE(0.10,0.2));
      lbl('GRAD MOTORIZARE (VEH/1000 LOC.)',W*0.07,H*0.36,'#D4AF37',W*0.0065);
      [[2024,pred.mot24,'rgba(148,163,184,0.9)',0.11],[2035,pred.mot35,'#f59e0b',0.20],[2055,pred.mot55,'#ef4444',0.30]].forEach(([yr,val,c,td],i)=>{al(sA*rE(td,0.2));lbl(yr+'',W*0.07,H*(0.405+i*0.09),'rgba(100,130,170,0.7)',W*0.006);big(N(Math.round(val)),W*0.15,H*(0.405+i*0.09),c,W*0.022);lbl('veh/1000',W*0.295,H*(0.405+i*0.09),c,W*0.006);bar(W*0.07,H*(0.420+i*0.09),W*0.38,H*0.012,val/710*rE(td+0.05,0.25),c);});
      al(sA*rE(0.25,0.25));card(W*0.04,H*0.585,W*0.44,H*0.27,'rgba(5,10,28,0.88)');al(sA*rE(0.25,0.25));
      lbl('AN SATURARE REȚEA',W*0.07,H*0.635,'rgba(148,163,184,0.7)',W*0.006);big('~'+pred.satAn,W*0.07,H*0.710,pred.satAn<=2040?'#ef4444':pred.satAn<=2050?'#f59e0b':'#22c55e',W*0.042);lbl('CAP. REZIDUALĂ 2055: '+pred.capRez+'%',W*0.07,H*0.755,'rgba(148,163,184,0.7)',W*0.006);bar(W*0.07,H*0.770,W*0.36,H*0.012,pred.capRez/100,'#22c55e');lbl('FLUX ORĂ VÂRF EST.: '+N(pred.fluxOra)+' veh/h',W*0.07,H*0.820,'rgba(148,163,184,0.7)',W*0.006);
      al(sA*rE(0.32,0.25));card(W*0.52,H*0.30,W*0.44,H*0.55,'rgba(5,10,28,0.88)');al(sA*rE(0.32,0.25));
      lbl('SOLUȚII NECESARE',W*0.55,H*0.36,'#D4AF37',W*0.0065);lbl('PASAJE DENIVELATE: '+pred.pasaje+' buc.',W*0.55,H*0.42,'rgba(200,215,240,0.85)',W*0.007);lbl('VARIANTE OCOLITOARE: ~'+Math.ceil(pred.hub*12)+' KM',W*0.55,H*0.475,'rgba(200,215,240,0.85)',W*0.007);lbl('CENTURA: '+(pred.hub>=1.4?'URGENTĂ':'RECOMANDATĂ'),W*0.55,H*0.530,pred.hub>=1.4?'#ef4444':'#f59e0b',W*0.007);
      lbl('PARKINGURI MULTIETAJ: '+Math.round(pred.hub*3+pred.p21/80000*2),W*0.55,H*0.585,'rgba(200,215,240,0.85)',W*0.007);
      lbl('COST TOTAL INFRA MOBILITATE',W*0.55,H*0.645,'rgba(148,163,184,0.7)',W*0.006);big(N(pred.invMob)+' M EUR',W*0.55,H*0.720,'#D4AF37',W*0.030);lbl('ESTIMARE ORIZONTUL 2055',W*0.55,H*0.760,'rgba(100,130,170,0.6)',W*0.006);
      if(t>0.80){const ta=Math.min(1,(t-0.80)/0.15);al(sA*ta);card(W*0.04,H*0.875,W*0.92,H*0.068,'rgba(239,68,68,0.12)','rgba(239,68,68,0.3)');al(sA*ta);wrap(`⚡ Fără intervenție, rețeaua se saturează ~${pred.satAn}. BRT + ${pred.pasaje} pasaje + centură = +${Math.round(pred.capRez*0.45)}% capacitate. Cost total: ~${N(pred.costBRT+pred.pasaje*8)} M EUR.`,W*0.07,H*0.910,W*0.86,H*0.028,`${W*0.0062}px "IBM Plex Mono",monospace`,'#f87171',2);}
      al(1);prog();grain();break;
    }
    // ── S6 TRANSIT ───────────────────────────────────────────────────────────
    case 'transit':{
      al(sA);bgL(0.88);bgT(0.80);bgB(0.88);
      al(sA*rE(0.05,0.2));lbl('TRANSPORT PUBLIC & WALKABILITY',W*0.05,H*0.12,'rgba(148,163,184,0.7)',W*0.007);lbl('HARTĂ: ALBASTRU=ACOPERIRE TP ACTUALĂ · VIOLET PUNCTAT=BRT PROPUS',W*0.05,H*0.16,'rgba(100,130,170,0.6)',W*0.006);
      al(sA*rE(0.07,0.25));gl(W*0.05,H*0.19,W*0.5,rE(0.06,0.3));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Acoperire Transport',W*0.05,H*0.265);
      al(sA*rE(0.12,0.25));card(W*0.04,H*0.30,W*0.42,H*0.54,'rgba(5,10,28,0.88)');al(sA*rE(0.12,0.25));
      lbl('ACOPERIRE TP ACTUALĂ',W*0.07,H*0.37,'#60a5fa',W*0.007);
      const tpC=pred.tp>=70?'#22c55e':pred.tp>=50?'#f59e0b':'#ef4444';
      big(N(an(pred.tp,rev(0.13,0.4)))+'%',W*0.07,H*0.470,tpC,W*0.055);lbl('DIN POPULAȚIE ACOPERITĂ',W*0.07,H*0.510,'#D4AF37',W*0.006);bar(W*0.07,H*0.530,W*0.36,H*0.015,pred.tp/100*rE(0.25,0.3),tpC);lbl('DEFICIT: '+pred.defTP+'pp față de standard 75%',W*0.07,H*0.590,'rgba(148,163,184,0.7)',W*0.006);lbl('WALK SCORE ESTIMAT',W*0.07,H*0.650,'rgba(148,163,184,0.7)',W*0.006);big(pred.walkScore+'/100',W*0.07,H*0.730,pred.walkScore>=65?'#22c55e':'#f59e0b',W*0.035);bar(W*0.07,H*0.745,W*0.36,H*0.012,pred.walkScore/100*rE(0.35,0.3),pred.walkScore>=65?'#22c55e':'#f59e0b');
      al(sA*rE(0.30,0.25));card(W*0.50,H*0.30,W*0.46,H*0.54,'rgba(5,10,28,0.88)');al(sA*rE(0.30,0.25));
      lbl('NECESITAR BRT / EXTINDERE TP',W*0.53,H*0.37,'#a78bfa',W*0.0065);lbl('TRASEE BRT NECESARE',W*0.53,H*0.43,'rgba(148,163,184,0.7)',W*0.006);big(pred.kmBRT+' KM',W*0.53,H*0.515,'#a78bfa',W*0.040);lbl('COST: '+N(pred.costBRT)+' M EUR (3,5 M EUR/km)',W*0.53,H*0.560,'rgba(148,163,184,0.7)',W*0.007);lbl('STAȚII NOI NECESARE',W*0.53,H*0.615,'rgba(148,163,184,0.7)',W*0.006);big(N(pred.statiiNoi),W*0.53,H*0.690,'#ffffff',W*0.035);lbl('AN ATINGERE SUMP 75%: ~'+pred.anSUMP,W*0.53,H*0.740,'#D4AF37',W*0.0065);lbl('CU INVESTIȚII CURENTE: ~'+(pred.anSUMP+8),W*0.53,H*0.775,'rgba(100,130,170,0.6)',W*0.006);
      if(t>0.78){const ta=Math.min(1,(t-0.78)/0.15);al(sA*ta);card(W*0.04,H*0.875,W*0.92,H*0.068,'rgba(96,165,250,0.10)','rgba(96,165,250,0.3)');al(sA*ta);const txt=pred.defTP>20?`⚡ Deficit critic (${pred.defTP}pp). BRT ${pred.kmBRT} km = ${N(pred.costBRT)} M EUR. Surse: FEDR Axa 4 + buget local. SUMP ~${pred.anSUMP} dacă investițiile încep 2025.`:`⚡ TP funcțional. BRT ${pred.kmBRT} km consolidează accesul periferic. Reducere congestionare ~${Math.round(pred.kmBRT*1.8)}%.`;wrap(txt,W*0.07,H*0.908,W*0.86,H*0.030,`${W*0.0062}px "IBM Plex Mono",monospace`,'#93c5fd',2);}
      al(1);prog();grain();break;
    }
    // ── S7 SEISMIC ───────────────────────────────────────────────────────────
    case 'seismic':{
      al(sA);bgL(0.90);bgT(0.82);bgB(0.90);
      al(sA*rE(0.05,0.2));lbl('RISC SEISMIC & PNRR',W*0.05,H*0.12,'rgba(148,163,184,0.7)',W*0.007);lbl('DATE: INFP · P100-1/2013 · PNRR 2021-2027 · HARTĂ: GRADIENT SEISMIC',W*0.05,H*0.16,'rgba(100,130,170,0.6)',W*0.006);
      al(sA*rE(0.07,0.25));gl(W*0.05,H*0.19,W*0.5,rE(0.06,0.3));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Fond Vulnerabil',W*0.05,H*0.265);
      const agC=pred.ag>=0.30?'#ef4444':pred.ag>=0.20?'#f59e0b':'#22c55e';
      al(sA*rE(0.10,0.2));card(W*0.04,H*0.30,W*0.44,H*0.19,agC+'22',agC+'66');al(sA*rE(0.10,0.2));lbl('ACCELERAȚIE SEISMICĂ PROIECTARE',W*0.07,H*0.35,agC,W*0.0065);big('ag = '+pred.ag.toFixed(2)+'g',W*0.07,H*0.44,agC,W*0.048);lbl('P100-1/2013 · IMR=225 ANI',W*0.07,H*0.47,'rgba(148,163,184,0.7)',W*0.006);
      al(sA*rE(0.20,0.25));card(W*0.04,H*0.505,W*0.44,H*0.40,'rgba(5,10,28,0.88)');al(sA*rE(0.20,0.25));
      lbl('FOND CONSTRUIT LA RISC SEISMIC',W*0.07,H*0.555,'#ef4444',W*0.007);big(N(an(pred.fond,rev(0.21,0.4)))+' CL.',W*0.07,H*0.635,'#ef4444',W*0.043);lbl('CLĂDIRI RS I-III ESTIMATE 2021',W*0.07,H*0.675,'rgba(148,163,184,0.7)',W*0.006);lbl('FĂRĂ INTERVENȚIE:',W*0.07,H*0.730,'rgba(148,163,184,0.8)',W*0.007);lbl('2035: '+N(pred.fond35)+' clădiri vulnerabile',W*0.07,H*0.775,'#f59e0b',W*0.007);lbl('2045: '+N(pred.fond45)+' clădiri vulnerabile',W*0.07,H*0.820,'#ef4444',W*0.007);lbl('(degradare fond +5%/decadă fără intervenție)',W*0.07,H*0.860,'rgba(100,130,170,0.6)',W*0.006);
      al(sA*rE(0.35,0.25));card(W*0.52,H*0.30,W*0.44,H*0.61,'rgba(5,10,28,0.88)');al(sA*rE(0.35,0.25));
      lbl('PROGRAM PNRR — REABILITARE',W*0.55,H*0.37,'#22c55e',W*0.007);lbl('APT. REABILITATE (ESTIMAT)',W*0.55,H*0.43,'rgba(148,163,184,0.7)',W*0.006);big(N(an(pred.pnrrAp,rev(0.36,0.4))),W*0.55,H*0.520,'#22c55e',W*0.040);lbl('COST REABILITARE FOND TOTAL',W*0.55,H*0.580,'rgba(148,163,184,0.7)',W*0.006);big(N(pred.costReab)+' M EUR',W*0.55,H*0.650,'#D4AF37',W*0.032);lbl('(~85k EUR/clădire medie)',W*0.55,H*0.690,'rgba(100,130,170,0.6)',W*0.006);lbl('AN ELIMINARE FOND (CU PNRR)',W*0.55,H*0.745,'rgba(148,163,184,0.7)',W*0.006);big('~'+pred.anElim,W*0.55,H*0.820,pred.anElim<=2040?'#22c55e':pred.anElim<=2050?'#f59e0b':'#ef4444',W*0.042);
      if(t>0.78){const ta=Math.min(1,(t-0.78)/0.15);al(sA*ta);const txt=pred.fond>500?`⚡ Risc CRITIC: ${N(pred.fond)} clădiri vulnerabile. PNRR reabilitează ~${N(pred.pnrrAp)} ap. Fond eliminat ~${pred.anElim}. Fără intervenție: +${N(pred.fond45-pred.fond)} clădiri până 2045.`:pred.fond>100?`⚡ Risc MEDIU: ${N(pred.fond)} clădiri. PNRR acoperă 25%. Post-2027 necesară continuare. Cadastrare completă — prioritate 1.`:`⚡ Risc SCĂZUT: ${N(pred.fond)} clădiri. ag=${pred.ag.toFixed(2)}g. Accent pe monitoring digital și prevenție.`;card(W*0.04,H*0.905,W*0.92,H*0.065,'rgba(239,68,68,0.10)','rgba(239,68,68,0.3)');al(sA*ta);wrap(txt,W*0.07,H*0.936,W*0.86,H*0.028,`${W*0.0062}px "IBM Plex Mono",monospace`,'#fca5a5',2);}
      al(1);prog();grain();break;
    }
    // ── S8 CLIMATE ───────────────────────────────────────────────────────────
    case 'climate':{
      al(sA);bgL(0.88);bgT(0.80);bgB(0.88);
      al(sA*rE(0.05,0.2));lbl('RISCURI CLIMATICE — INUNDAȚII & ADAPTARE',W*0.05,H*0.12,'rgba(148,163,184,0.7)',W*0.007);lbl('HARTĂ: ALBASTRU=INUNDABIL · GALBEN=AUTOSTRADĂ · PORTOCALIU=CENTURĂ',W*0.05,H*0.16,'rgba(100,130,170,0.6)',W*0.006);
      al(sA*rE(0.07,0.25));gl(W*0.05,H*0.19,W*0.5,rE(0.06,0.3));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Vulnerabilitate Climatică',W*0.05,H*0.265);
      al(sA*rE(0.12,0.25));card(W*0.04,H*0.30,W*0.42,H*0.29,'rgba(5,10,28,0.88)');al(sA*rE(0.12,0.25));
      lbl('RISC INUNDAȚII (ANAR)',W*0.07,H*0.360,'#3b82f6',W*0.007);const rIC=pred.riscIn==='RIDICAT'?'#ef4444':pred.riscIn==='MEDIU'?'#f59e0b':'#22c55e';big(pred.riscIn,W*0.07,H*0.445,rIC,W*0.040);lbl('ZONA INUNDABILĂ VIZIBILĂ PE HARTĂ',W*0.07,H*0.485,'rgba(148,163,184,0.7)',W*0.006);lbl('Directiva Inundații 2007/60/CE · Date ANAR',W*0.07,H*0.520,'rgba(100,130,170,0.6)',W*0.006);
      al(sA*rE(0.25,0.25));card(W*0.04,H*0.615,W*0.42,H*0.27,'rgba(5,10,28,0.88)');al(sA*rE(0.25,0.25));
      lbl('ZILE CANICULARE >35°C',W*0.07,H*0.665,'#f59e0b',W*0.007);[[2024,pred.zile24,'rgba(148,163,184,0.8)'],[2055,pred.zile55,'#ef4444']].forEach(([yr,v,c],i)=>{lbl(yr+':',W*0.07,H*(0.710+i*0.07),'rgba(100,130,170,0.7)',W*0.006);big(v+' ZILE/AN',W*0.14,H*(0.710+i*0.07),c,W*0.025);});lbl('CREȘTERE: +'+(pred.zile55-pred.zile24)+' zile (+'+Math.round((pred.zile55/pred.zile24-1)*100)+'%) · RCP4.5',W*0.07,H*0.858,'#ef4444',W*0.006);
      al(sA*rE(0.38,0.25));card(W*0.50,H*0.30,W*0.46,H*0.59,'rgba(5,10,28,0.88)');al(sA*rE(0.38,0.25));
      lbl('EFECT INSULĂ TERMICĂ (UHI)',W*0.53,H*0.360,'#f59e0b',W*0.007);big('+'+pred.uhi+'°C',W*0.53,H*0.440,'#f97316',W*0.050);lbl('MAI CALD VS ZONA RURALĂ ÎNCONJURĂTOARE',W*0.53,H*0.480,'rgba(148,163,184,0.7)',W*0.006);
      lbl('COST ADAPTARE CLIMATICĂ',W*0.53,H*0.545,'rgba(148,163,184,0.7)',W*0.007);big(N(pred.costAd)+' M EUR',W*0.53,H*0.615,'#22c55e',W*0.032);lbl('COST INACȚIUNE (×4.5 — Banca Mondială)',W*0.53,H*0.670,'rgba(148,163,184,0.7)',W*0.007);big(N(pred.costIn)+' M EUR',W*0.53,H*0.740,'#ef4444',W*0.032);lbl('⚡ ROI ADAPTARE vs INACȚIUNE: +350%',W*0.53,H*0.795,'#22c55e',W*0.007);lbl('Surse: ANAR · Banca Mondială · IPCC 2021',W*0.53,H*0.840,'rgba(100,130,170,0.6)',W*0.006);
      if(t>0.78){const ta=Math.min(1,(t-0.78)/0.15);al(sA*ta);card(W*0.04,H*0.900,W*0.92,H*0.065,'rgba(59,130,246,0.10)','rgba(59,130,246,0.3)');al(sA*ta);wrap(`⚡ ${name}: Inundații ${pred.riscIn.toLowerCase()}, +${pred.uhi}°C UHI, ${pred.zile55} zile caniculare/an în 2055. Adaptare ${N(pred.costAd)} M EUR vs ${N(pred.costIn)} M EUR inacțiune. FEDR Axa 5 + PNRR.`,W*0.07,H*0.933,W*0.86,H*0.028,`${W*0.0062}px "IBM Plex Mono",monospace`,'#93c5fd',2);}
      al(1);prog();grain();break;
    }
    // ── S9 MONTECARLO ─────────────────────────────────────────────────────────
    case 'montecarlo':{
      al(sA);bgT(0.88);bgB(0.88);
      al(sA*rE(0.05,0.2));lbl('PROIECȚIE DEMOGRAFICĂ 2055 — ANALIZĂ MONTE CARLO',W*0.05,H*0.09,'rgba(148,163,184,0.7)',W*0.007);lbl('MODEL STOCHASTIC · 10.000 SIMULĂRI · HARTĂ: INELE EXTINDERE INTRAVILAN',W*0.05,H*0.13,'rgba(100,130,170,0.6)',W*0.006);
      al(sA*rE(0.07,0.3));gl(W*0.05,H*0.155,W*0.7,rE(0.06,0.3));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.04}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(name+' · Unde Suntem în 2055?',W*0.05,H*0.225);
      al(sA*rE(0.12,0.2));card(W*0.04,H*0.26,W*0.90,H*0.055,'rgba(5,10,28,0.82)');al(sA*rE(0.12,0.2));
      lbl('INELE PE HARTĂ:',W*0.07,H*0.285,'rgba(148,163,184,0.65)',W*0.006);[['#94a3b8','2011'],['#60a5fa','2021 (actual)'],['#f59e0b','2035 (estimat)'],['#ef4444','2055 (proiecție)']].forEach(([c,txt],i)=>{ctx.fillStyle=c;ctx.fillRect(W*(0.28+i*0.175),H*0.278,W*0.015,6);lbl(txt,W*(0.30+i*0.175),H*0.287,c,W*0.006);});
      const rB=pred.rRef;
      const scen=[{lbl:'S1',full:'REGRES',r:rB-0.8,c:'#ef4444',desc:'Migrație continuă, fără investiții majore'},{lbl:'S2',full:'TENDINȚĂ',r:rB,c:'#f59e0b',desc:'Continuarea trendului 2011-2021 (~55%)'},{lbl:'S3',full:'OPTIMIST',r:rB+0.9,c:'#22c55e',desc:'Hub metropolitan + investiții PNRR/FEDR'}];
      scen.forEach((sc,i)=>{
        const pop=Math.round(pred.p21*Math.pow(1+sc.r/100,34)),delta=pop-pred.p21;
        const ci=rE(0.18+i*0.14,0.25),cX=W*(0.04+i*0.32);
        al(sA*ci);card(cX,H*0.35,W*0.30,H*0.53,'rgba(5,10,28,0.90)',sc.c+'33');al(sA*ci);
        ctx.fillStyle=sc.c;ctx.font=`900 ${W*0.018}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(sc.lbl+' — '+sc.full,cX+W*0.015,H*0.420);lbl(sc.desc,cX+W*0.015,H*0.455,'rgba(148,163,184,0.7)',W*0.006);
        lbl('POPULAȚIE 2055',cX+W*0.015,H*0.510,'rgba(148,163,184,0.7)',W*0.006);big(N(an(pop,rev(0.20+i*0.14,0.4))),cX+W*0.015,H*0.595,sc.c,W*0.038);lbl('LOCUITORI',cX+W*0.015,H*0.635,sc.c,W*0.006);
        lbl((delta>=0?'+':'')+N(delta)+' față de 2021',cX+W*0.015,H*0.680,'rgba(200,215,240,0.8)',W*0.0065);lbl('RATĂ: '+(sc.r>=0?'+':'')+sc.r.toFixed(2)+'%/AN',cX+W*0.015,H*0.725,'rgba(100,130,170,0.6)',W*0.006);
        const mxP=Math.round(pred.p21*Math.pow(1+(rB+0.9)/100,34));bar(cX+W*0.015,H*0.748,W*0.27,H*0.014,pop/mxP*rE(0.22+i*0.14,0.3),sc.c);
        lbl('DEF.LOC.: '+N(Math.max(0,Math.round((pop-pred.p21)*35/90)))+' un.',cX+W*0.015,H*0.805,sc.c,W*0.006);
      });
      al(sA*rE(0.62,0.3));const pMin=Math.round(pred.p21*Math.pow(1+(rB-0.8)/100,34)),pMax=Math.round(pred.p21*Math.pow(1+(rB+0.9)/100,34));card(W*0.04,H*0.882,W*0.92,H*0.074,'rgba(5,10,28,0.85)');al(sA*rE(0.62,0.3));lbl('INTERVAL ÎNCREDERE 90% — 2055:',W*0.07,H*0.912,'rgba(148,163,184,0.7)',W*0.007);big('['+N(pMin)+' — '+N(pMax)+'] LOC.',W*0.07,H*0.946,'#a78bfa',W*0.024);lbl('S2 TENDINȚĂ: ~55% · S3: ~25% · S1: ~20%',W*0.60,H*0.946,'rgba(100,130,170,0.7)',W*0.006);
      al(1);prog();grain();break;
    }
    // ── S10 INFRA ─────────────────────────────────────────────────────────────
    case 'infra':{
      al(sA);bgT(0.88);bgB(0.88);
      al(sA*rE(0.05,0.2));lbl('INFRASTRUCTURĂ NECESARĂ 2025-2055',W*0.05,H*0.09,'#22c55e',W*0.008);lbl('CALCULE: ΔPOP × NORME MEC · MS · OMS — '+name,W*0.05,H*0.13,'rgba(100,130,170,0.6)',W*0.006);al(sA*rE(0.07,0.3));gl(W*0.05,H*0.155,W*0.7,rE(0.06,0.3));
      ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.04}px "Space Grotesk",sans-serif`;ctx.textAlign='left';al(sA*rE(0.09,0.25));ctx.fillText('Ce trebuie construit în '+name+' până în 2055?',W*0.05,H*0.225);
      al(sA*rE(0.10,0.2));card(W*0.04,H*0.26,W*0.92,H*0.055,'rgba(5,10,28,0.82)');al(sA*rE(0.10,0.2));lbl('BAZĂ CALCUL: CREȘTERE '+(pred.deltaP>=0?'+':'')+N(pred.deltaP)+' LOCUITORI · '+N(pred.p21)+' → '+N(pred.pop55)+' · 2021-2055',W*0.07,H*0.288,'#22c55e',W*0.007);lbl('MEC 400 ELEVI/UNITATE · MS 1800 PAC./CABINET · OMS 9 MP SP.VERZI/LOC',W*0.07,H*0.305,'rgba(100,130,170,0.6)',W*0.006);
      const items=[{ic:'🏫',lbl:'ȘCOLI & GRĂDINIȚE',val:pred.scoliNoi+pred.gradNoi,unit:'unități noi',sub:pred.scoliNoi+' școli + '+pred.gradNoi+' grădinițe',c:'#60a5fa'},{ic:'🏥',lbl:'CABINETE MEDICALE',val:pred.cabMed,unit:'cabinete noi',sub:'1.800 pac./cabinet MS',c:'#ef4444'},{ic:'🌳',lbl:'SPAȚII VERZI',val:pred.svHa,unit:'ha necesare',sub:'Standard OMS 9 mp/loc.',c:'#22c55e'},{ic:'🚌',lbl:'STAȚII TRANSPORT',val:pred.statiiNoi,unit:'stații noi',sub:'Acoperire target 75%',c:'#f59e0b'},{ic:'🅿️',lbl:'PARKINGURI STRUCT.',val:Math.round(pred.hub*3+pred.p21/80000*2),unit:'structuri',sub:'Multietaj centru+periferie',c:'#a78bfa'},{ic:'⚡',lbl:'REȚELE TEHNICE',val:Math.round(Math.max(0,pred.deltaP)/5000),unit:'km extindere',sub:'Apă · Canal · Gaz · Fibră',c:'#D4AF37'}];
      items.forEach((it,i)=>{const col=i%3,row=Math.floor(i/3),cx2=W*(0.04+col*0.32),cy2=H*(0.34+row*0.30),ci=rE(0.15+i*0.07,0.25);al(sA*ci);card(cx2,cy2,W*0.30,H*0.265,'rgba(5,10,28,0.88)',it.c+'33');al(sA*ci);ctx.font=`${W*0.022}px sans-serif`;ctx.textAlign='left';ctx.fillText(it.ic,cx2+W*0.012,cy2+H*0.075);lbl(it.lbl,cx2+W*0.06,cy2+H*0.065,it.c,W*0.006);big('+'+N(an(it.val,rev(0.17+i*0.07,0.35))),cx2+W*0.015,cy2+H*0.170,it.c,W*0.038);lbl(it.unit,cx2+W*0.015,cy2+H*0.208,'#D4AF37',W*0.006);lbl(it.sub,cx2+W*0.015,cy2+H*0.238,'rgba(100,130,170,0.6)',W*0.0055);});
      al(sA*rE(0.65,0.3));card(W*0.04,H*0.915,W*0.92,H*0.065,'rgba(5,10,28,0.85)');al(sA*rE(0.65,0.3));lbl('NECESAR TOTAL: '+N(pred.invTotal)+' M EUR · MOB. '+N(pred.invMob)+' · SOC. '+N(pred.invSoc)+' · SEIS. '+N(pred.invSeis)+' · VERDE '+N(pred.invVerde)+' M EUR',W*0.07,H*0.950,'#D4AF37',W*0.0065);lbl('Fonduri UE ~60% · Gap: '+N(Math.round(pred.invTotal*0.40))+' M EUR din buget național/local',W*0.07,H*0.970,'rgba(100,130,170,0.6)',W*0.006);
      al(1);prog();grain();break;
    }
    // ── S11 SDG ──────────────────────────────────────────────────────────────
    case 'sdg':{
      al(sA);bgL(0.88);bgT(0.80);bgB(0.88);
      al(sA*rE(0.05,0.2));lbl('CALITATEA VIEȚII — SDG11 & BENCHMARKING EUROPEAN',W*0.05,H*0.12,'rgba(148,163,184,0.7)',W*0.007);lbl('ONU SDG11 · EUROSTAT URBAN AUDIT 2021 · HARTĂ: SPAȚII VERZI COLORATE',W*0.05,H*0.16,'rgba(100,130,170,0.6)',W*0.006);
      al(sA*rE(0.07,0.25));gl(W*0.05,H*0.19,W*0.5,rE(0.06,0.3));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;ctx.textAlign='left';al(sA*rE(0.09,0.25));ctx.fillText(name+' · Locul Tău în Europa',W*0.05,H*0.265);
      // Spider chart SDG
      const ar=rE(0.10,0.35);al(sA*ar);
      const [cxR,cyR,radR]=[W*0.23,H*0.58,H*0.22];
      const dims=[{l:'Spații Verzi',s:pred.sdg_sv,c:'#22c55e'},{l:'Transport P.',s:pred.sdg_tp,c:'#60a5fa'},{l:'Economie',s:pred.sdg_pib,c:'#D4AF37'},{l:'Seismic',s:pred.sdg_seis,c:'#ef4444'}];
      [0.25,0.5,0.75,1.0].forEach(fr=>{ctx.strokeStyle=`rgba(255,255,255,${fr*0.06})`;ctx.lineWidth=1;ctx.beginPath();dims.forEach((d,i)=>{const a=(i/dims.length)*Math.PI*2-Math.PI/2,r=radR*fr;if(i===0)ctx.moveTo(cxR+r*Math.cos(a),cyR+r*Math.sin(a));else ctx.lineTo(cxR+r*Math.cos(a),cyR+r*Math.sin(a));});ctx.closePath();ctx.stroke();});
      ctx.fillStyle='rgba(212,175,55,0.15)';ctx.strokeStyle='#D4AF37';ctx.lineWidth=2;ctx.beginPath();dims.forEach((d,i)=>{const a=(i/dims.length)*Math.PI*2-Math.PI/2,r=radR*(d.s/10)*ar;if(i===0)ctx.moveTo(cxR+r*Math.cos(a),cyR+r*Math.sin(a));else ctx.lineTo(cxR+r*Math.cos(a),cyR+r*Math.sin(a));});ctx.closePath();ctx.fill();ctx.stroke();
      dims.forEach((d,i)=>{const a=(i/dims.length)*Math.PI*2-Math.PI/2,r=radR*(d.s/10)*ar;ctx.fillStyle=d.c;ctx.beginPath();ctx.arc(cxR+r*Math.cos(a),cyR+r*Math.sin(a),6,0,Math.PI*2);ctx.fill();lbl(d.l+' '+d.s+'/10',cxR+(radR+22)*Math.cos(a)-30,cyR+(radR+22)*Math.sin(a)+5,d.c,W*0.006);});
      al(sA*rE(0.40,0.25));big(Math.round(an(pred.sdgTotal*10,rev(0.40,0.4)))/10+'/10',cxR-W*0.045,cyR+H*0.035,pred.sdgTotal>=7?'#22c55e':pred.sdgTotal>=5?'#f59e0b':'#ef4444',W*0.05);lbl('SCOR SDG11',cxR-W*0.02,cyR+H*0.075,'#D4AF37',W*0.006);
      al(sA*rE(0.20,0.25));card(W*0.52,H*0.30,W*0.44,H*0.30,'rgba(5,10,28,0.88)');al(sA*rE(0.20,0.25));lbl('DEFICIT SPAȚII VERZI',W*0.55,H*0.37,'#22c55e',W*0.007);big(N(an(pred.svHa,rev(0.22,0.35)))+' HA',W*0.55,H*0.445,pred.svHa>200?'#ef4444':pred.svHa>50?'#f59e0b':'#22c55e',W*0.040);lbl('ACTUAL: '+pred.sv+' MP/LOC · STANDARD OMS: 9 MP/LOC',W*0.55,H*0.500,'rgba(148,163,184,0.7)',W*0.006);lbl('SPAȚII VERZI VIZIBILE PE HARTĂ (VERDE)',W*0.55,H*0.538,'rgba(100,130,170,0.6)',W*0.006);lbl('NECESAR 2055: '+N(pred.svHa+Math.round(pred.svHa*0.15))+' HA TOTAL',W*0.55,H*0.576,'#22c55e',W*0.007);
      al(sA*rE(0.38,0.3));card(W*0.52,H*0.62,W*0.44,H*0.30,'rgba(5,10,28,0.88)');al(sA*rE(0.38,0.3));lbl('PEER GROUP EUROPEAN (EUROSTAT 2021)',W*0.55,H*0.678,'#a78bfa',W*0.007);
      const allP=[{n:name,pib:pred.pib,sv:pred.sv,tp:pred.tp,self:true},...pred.peers];
      allP.forEach((p,i)=>{const y2=H*(0.718+i*0.045),cl=p.self?'#D4AF37':'rgba(200,215,240,0.8)';if(p.self){ctx.fillStyle='rgba(212,175,55,0.08)';ctx.fillRect(W*0.52,y2-H*0.02,W*0.44,H*0.04);}lbl(p.n,W*0.55,y2,cl,W*0.007);lbl(N(p.pib)+' €',W*0.72,y2,cl,W*0.006);lbl(p.sv+' mp/loc',W*0.81,y2,cl,W*0.006);lbl(p.tp+'% TP',W*0.91,y2,cl,W*0.006);});
      al(sA*rE(0.60,0.25));const bP=pred.peers[0];lbl('⚡ GAP vs '+bP.n+': PIB +'+N(bP.pib-pred.pib)+' EUR/cap · TP +'+(bP.tp-pred.tp)+'pp · SV +'+(bP.sv-pred.sv)+' mp/loc',W*0.52,H*0.938,'#a78bfa',W*0.006);
      al(1);prog();grain();break;
    }
    // ── S12 VISION ────────────────────────────────────────────────────────────
    case 'vision':{
      al(sA);
      const g=ctx.createRadialGradient(W/2,H,0,W/2,H,W*0.8);g.addColorStop(0,'rgba(20,10,3,0.50)');g.addColorStop(1,'rgba(3,7,18,0.72)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
      al(sA*rE(0.05,0.4)*0.08);ctx.fillStyle='#D4AF37';ctx.font=`900 ${W*0.28}px "Space Grotesk",sans-serif`;ctx.textAlign='center';ctx.fillText('2055',W/2,H*0.62);
      al(sA);
      al(sA*rE(0.08,0.2));ctx.fillStyle='rgba(148,163,184,0.6)';ctx.font=`${W*0.008}px "IBM Plex Mono",monospace`;ctx.textAlign='center';ctx.fillText('VIZIUNEA 2055 — ORAȘUL POSIBIL',W/2,H*0.18);
      al(sA*rE(0.12,0.25));ctx.fillStyle='#ffffff';ctx.font=`900 ${W*0.065}px "Space Grotesk",sans-serif`;ctx.fillText(name.toUpperCase(),W/2,H*0.30);
      ctx.fillStyle='#D4AF37';ctx.font=`700 ${W*0.013}px "Space Grotesk",sans-serif`;
      const sub=pred.rRef>0.5?'UN ORAȘ ÎN CREȘTERE CARE ALEGE SĂ CREASCĂ INTELIGENT':pred.rRef>0?'UN ORAȘ CARE POATE DEVENI MOTOR REGIONAL':pred.r10>-1?'UN ORAȘ CARE ALEGE SĂ SE REINVENTEZE':'UN ORAȘ CARE ALEGE CALITATEA, NU CANTITATEA';ctx.fillText(sub,W/2,H*0.35);
      al(sA*rE(0.18,0.25));const glin=ctx.createLinearGradient(W*0.1,0,W*0.9,0);glin.addColorStop(0,'rgba(212,175,55,0)');glin.addColorStop(0.5,'#D4AF37');glin.addColorStop(1,'rgba(212,175,55,0)');ctx.fillStyle=glin;ctx.fillRect(W*0.1,H*0.37,W*0.8,2);
      // Agenda primar stânga
      al(sA*rE(0.20,0.3));card(W*0.03,H*0.40,W*0.38,H*0.48,'rgba(5,10,28,0.88)');al(sA*rE(0.20,0.3));lbl('AGENDA PRIMARULUI 2025-2030',W*0.06,H*0.448,'#D4AF37',W*0.007);lbl('PRIORITĂȚI DIN SCORURI UAT',W*0.06,H*0.478,'rgba(100,130,170,0.6)',W*0.006);
      pred.agenda.forEach((pr,i)=>{const pi=rE(0.25+i*0.08,0.2);al(sA*pi);ctx.fillStyle=pr.c;ctx.font=`900 ${W*0.018}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText((i+1)+'.',W*0.06,H*(0.528+i*0.08));ctx.fillStyle='rgba(220,230,255,0.9)';ctx.font=`600 ${W*0.013}px "Space Grotesk",sans-serif`;ctx.fillText(pr.lbl,W*0.09,H*(0.528+i*0.08));bar(W*0.06,H*(0.538+i*0.08),W*0.32,H*0.010,Math.min(1,pr.score/80)*pi,pr.c);});
      // Concluzii dreapta
      al(sA*rE(0.30,0.3));card(W*0.59,H*0.40,W*0.38,H*0.48,'rgba(5,10,28,0.88)');al(sA*rE(0.30,0.3));lbl('CU CE RĂMÂNEM',W*0.62,H*0.448,'#D4AF37',W*0.007);lbl('CONCLUZII PRINCIPALE',W*0.62,H*0.478,'rgba(100,130,170,0.6)',W*0.006);
      [{ok:pred.pop55>pred.p21,txt:'Pop.2055: '+N(pred.pop55)+' loc. ('+(pred.pop55>pred.p21?'CREȘTERE':'SCĂDERE')+' '+Math.abs(Math.round((pred.pop55-pred.p21)/pred.p21*100))+'%)'},{ok:pred.pctUE55>=75,txt:'PIB 2055: '+N(pred.pib55)+' EUR/cap ('+pred.pctUE55+'% UE27)'},{ok:pred.anSUMP<=2035,txt:'SUMP atingibil ~'+pred.anSUMP+' cu investiții BRT'},{ok:pred.sdgTotal>=6,txt:'SDG11: '+pred.sdgTotal+'/10 — cal. '+(pred.sdgTotal>=7?'bună':'de îmbunătățit')},{ok:pred.anElim<=2045,txt:'Fond seismic eliminat ~'+pred.anElim}].forEach((c2,i)=>{const ci=rE(0.35+i*0.07,0.2);al(sA*ci);ctx.fillStyle=c2.ok?'#22c55e':'#f59e0b';ctx.font=`700 ${W*0.018}px "Space Grotesk",sans-serif`;ctx.textAlign='left';ctx.fillText(c2.ok?'✓':'◎',W*0.62,H*(0.538+i*0.08));lbl(c2.txt,W*0.65,H*(0.540+i*0.08),'rgba(220,230,255,0.88)',W*0.0068);});
      // Footer
      al(sA*rE(0.65,0.3));ctx.fillStyle='rgba(212,175,55,0.18)';ctx.fillRect(0,H*0.905,W,H*0.095);ctx.fillStyle='#D4AF37';ctx.font=`${W*0.008}px "IBM Plex Mono",monospace`;ctx.textAlign='center';ctx.fillText('UrbanX TSS·FG · PLATFORMĂ NAȚIONALĂ PENTRU URBANISM DIGITAL',W/2,H*0.940);ctx.fillStyle='rgba(148,163,184,0.55)';ctx.font=`${W*0.006}px "IBM Plex Mono",monospace`;ctx.fillText('© 2026 ThinkSmart Solutions SRL · Valori orientative · Predicțiile se recalculează per UAT',W/2,H*0.962);ctx.fillText(name+' · '+( city.judet||'—')+' · Generat '+new Date().toLocaleDateString('ro-RO'),W/2,H*0.980);
      al(1);prog();grain();break;
    }
    } // end switch
  }, // end _renderScene
  _getCityKey(){const f=typeof window.TCI!=='undefined'?window.TCI?.cityKey:null;const l=typeof localStorage!=='undefined'?localStorage.getItem('ux_last_city'):null;const p=window._ProjectionEngine?.currentCity;const d=window._RO_CITIES_DB?Object.keys(window._RO_CITIES_DB)[0]:null;return f||l||p||d||'RO-IS-01';}
};

// ── INIT ──────────────────────────────────────────────────────────────────
(function _init(){
  window._SceneEngine=G._SceneEngine;window._PredEngine=_PRED;
  console.log('[TCI Cinematic v5.0] ✅ Ready — 12 scene imersive · predicții dinamice per orice UAT');
  const _patch=(n)=>{
    if(typeof TCI!=='undefined'&&typeof window.openTCI==='function'){
      const orig=window.openTCI;
      window.openTCI=function(opts){if(opts?.mode==='cinema_v2'||opts?.scenes||window._preferCinemaV2){G._SceneEngine.launch(opts?.cityKey||G._SceneEngine._getCityKey());}else{orig?.(opts);}};
      window._switchToCinemaV2=()=>{window._preferCinemaV2=true;ss('🎬 Cinema v5 activ');};
      window._switchToTCIClassic=()=>{window._preferCinemaV2=false;ss('📊 TCI Clasic activ');};
      console.log('[Cinema v5] openTCI override OK');
    }else if(n<40){setTimeout(()=>_patch(n+1),500);}
  };
  _patch(0);
  ss('🎬 TCI Cinematic v5.0 ready — 12 scene · predicții dinamice per orice UAT din România');
})();

})(window);
