// tci-cinematic-scenes.js — UrbanX TCI Cinematic v8.0 IMERSIV
// ThinkSmart Solutions SRL | 23 mai 2026
// REGULA #1: Harta animata 3D = actor. Canvas = minim. Zero carduri. Zero liste.
// REGULA #2: Fiecare scena = miscare camera + transformare vizuala pe harta.
// REGULA #3: O cifra. Un titlu. O emotie. Atat.
(function(G){
'use strict';

const N=(v,d=0)=>isNaN(+v)?'—':Number(v).toLocaleString('ro-RO',{minimumFractionDigits:d,maximumFractionDigits:d});
const ss=(m)=>{try{window.showSnackbar?.(m);}catch(e){}console.log('[Cinema v8]',m);};
const eo=(t)=>1-Math.pow(1-Math.max(0,Math.min(1,t)),3);
const ei=(t)=>t*t*t;
const PROXY='https://urbanx-proxy.3dtravelsoftart.workers.dev';
const INSE_USER='office@think-ss.eu';
const INSE_PASS='7Jpu!m.2NiNFiVQ';

// ── MOTOR PREDICTII v8 ──────────────────────────────────────────────────────
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
    const rRef=hub>=1.5?0.9:hub>=1.2?0.45:hub>=1.0?0.1:r10;
    const pop55=Math.round(p21*Math.pow(1+rRef/100,34));
    const deltaP=pop55-p21;
    const UE27=36600, pctUE=Math.round(pib/UE27*100);
    const rPIB=3.8+(hub-1.0)*1.4;
    const pib55=Math.round(pib*Math.pow(1+rPIB/100,31));
    const pctUE55=Math.round(pib55/(UE27*Math.pow(1.015,31))*100);
    const anConv=pctUE>=75?2025:2024+Math.round(Math.log(75/pctUE*100)/Math.log(1+rPIB/100));
    const natalitate=Math.round(8+hub*1.5), mortalit=Math.round(12-hub*1.2);
    const sporNat=natalitate-mortalit;
    const migNeta=Math.round(r10*p21/100-(hub>=1.2?-200:500));
    const salariu=Math.round(pib*0.52/12);
    const somaj=Math.round(Math.max(2,12-hub*4));
    const ocupare=Math.round(55+hub*8);
    const ocupatie={servicii:Math.round(35+hub*12),industrie:Math.round(28-hub*5),comert:Math.round(18+hub*3),constructii:Math.round(8+auth/100),agricultura:Math.round(Math.max(2,11-hub*6))};
    const defLoc=Math.max(0,Math.round(deltaP*35/90));
    const mot24=Math.round(390+(pib-9000)/500);
    const satAn=Math.min(2075,Math.round(2024+(640-mot24)/((Math.min(710,mot24*1.30)-mot24)/31)));
    const fluxOra=Math.round(p21*mot24/1000*0.08);
    const pasaje=Math.round(hub*2+p21/100000*1.5);
    const kmOcol=Math.ceil(hub*12);
    const defTP=Math.max(0,75-tp);
    const kmBRT=Math.round(hub*8+p21/50000*5);
    const costBRT=Math.round(kmBRT*3.5);
    const statiiNoi=Math.max(0,Math.round(pop55/800-p21*tp/100/800));
    const anSUMP=2025+Math.round(defTP/5);
    const walkScore=Math.min(85,Math.round(40+hub*15+tp*0.3));
    const scoliNoi=Math.max(0,Math.round(Math.max(0,deltaP)*0.14/400));
    const cabMed=Math.max(0,Math.round(Math.max(0,deltaP)/1800));
    const svHa=Math.max(0,Math.round((pop55*9-p21*sv)/10000));
    const invMob=Math.round(p21/1000*0.45*hub*10)/10;
    const invSoc=Math.round(p21/1000*0.28*hub*10)/10;
    const invTotal=Math.round(invMob+invSoc+p21/1000*0.12);
    const zile24=Math.max(5,Math.round(30-(lat-44)*4));
    const sdgTotal=Math.round(((Math.min(10,Math.round(sv/9*10)))+(Math.min(10,Math.round(tp/75*10)))+(Math.min(10,Math.round(pctUE/100*10)))+(Math.min(10,Math.round((1-fond/(p21*0.02))*10))))/4*10)/10;
    const recHa=Math.round(sup*0.04*hub);
    const agenda=[
      {lbl:'Transport Public',score:defTP,c:'#60a5fa'},
      {lbl:'Fond Seismic',score:fond/50,c:'#ef4444'},
      {lbl:'Spatii Verzi',score:svHa/2,c:'#22c55e'},
      {lbl:'Servicii Sociale',score:Math.abs(r10)*10,c:'#f59e0b'},
      {lbl:'Investitii',score:Math.max(0,75-pctUE),c:'#a78bfa'},
    ].sort((a,b)=>b.score-a.score);
    const trendClr=r10>0.5?'#22c55e':r10>0?'#4ade80':r10>-1?'#f59e0b':'#ef4444';
    const trendLbl=r10>0.5?'CRESTE':r10>0?'STABIL':r10>-1?'STAGNEAZA':'DECADE';
    return {p21,p11,r10,rRef,pop55,deltaP,natalitate,mortalit,sporNat,migNeta,salariu,somaj,
      ocupare,ocupatie,pib,pib55,pctUE,pctUE55,rPIB,anConv,defLoc,auth,recHa,sup,mot24,
      satAn,fluxOra,pasaje,kmOcol,tp,defTP,kmBRT,costBRT,statiiNoi,anSUMP,walkScore,
      scoliNoi,cabMed,svHa,invMob,invSoc,invTotal,zile24,ag,fond,sdgTotal,hub,sv,
      agenda,trendClr,trendLbl,gradNoi2:Math.max(0,Math.round(Math.max(0,deltaP)*0.14/200))};
  },
  // INSE TEMPO live — populatie, rata, somaj per UAT
  // ── INSE LIVE DATA ENGINE ──────────────────────────────────────────────
  // API INSE TEMPO — structura confirmata:
  // POP107D: Populatia dupa domiciliu pe grupe varsta, sexe, judete, localitati
  // dimensionsMap[0] = grupe varsta (options[0].label='Total')
  // dimensionsMap[1] = SIRUTA/localitati  
  // details.nomJud=3, details.nomLoc=4, details.matSiruta=1
  // Query date reale: POST cu JSON body catre /tempo-ins/matrix/{matrice}/data

  async fetchINSE(siruta){
    try{
      // Step 1: metadata matrice (confirmat functional)
      const params=new URLSearchParams({matrice:'POP107D',user:INSE_USER,pass:INSE_PASS,lang:'ro'});
      const r=await fetch(`${PROXY}/inse?${params}`,{signal:AbortSignal.timeout(12000)});
      if(!r.ok)return null;
      const d=await r.json();
      if(d.error)return null;
      console.log('[v8] INSE metadata OK');

      // Step 2: gaseste nomItemId pentru SIRUTA
      const locDim=d.dimensionsMap?.[1];
      const loc=locDim?.options?.find(o=>
        o.label?.includes(String(siruta))||
        String(o.nomItemId)===String(siruta)
      );
      if(loc){
        console.log('[v8] INSE loc gasit:',loc.label,'nomItemId:',loc.nomItemId);
        d._locItemId=loc.nomItemId;
        d._locLabel=loc.label;
      }

      // Step 3: fetch date reale (populatie totala) pentru acest UAT
      const dataParams=new URLSearchParams({
        matrice:'POP107D',user:INSE_USER,pass:INSE_PASS,lang:'ro',
        // Cod 'Total' varste = nomItemId 1, sexe Total, ultimul an
        arr:`[1,${loc?.nomItemId||0},0,0]`
      });
      const r2=await fetch(`${PROXY}/inse?${dataParams}`,{signal:AbortSignal.timeout(10000)});
      if(r2.ok){
        const d2=await r2.json();
        if(d2&&!d2.error){d._dataRaw=d2;console.log('[v8] INSE date reale OK');}
      }
      return d;
    }catch(e){console.warn('[v8] INSE:',e.message);return null;}
  },

  // Extrage populatia reala din raspuns INSE si imbogateste _pred
  _enrichPredFromINSE(pred, inseData){
    if(!inseData)return pred;
    try{
      // Daca avem date reale, actualizam p21
      const raw=inseData._dataRaw;
      if(raw?.data?.[0]?.val){
        const popReal=parseInt(raw.data[0].val);
        if(popReal>1000){
          console.log('[v8] INSE pop reala:',popReal,'vs estimat:',pred.p21);
          pred.p21=popReal;
          pred.p21_inse=true; // flag ca e real
        }
      }
      // Metadata utila
      if(inseData.ultimaActualizare)pred.inseActualizare=inseData.ultimaActualizare;
      if(inseData._locLabel)pred.inseLabel=inseData._locLabel;
    }catch(e){}
    return pred;
  }
};

// ── SCENE ENGINE v8 IMERSIV ─────────────────────────────────────────────────
G._SceneEngine={
  _playing:false,_raf:null,_startT:0,_si:0,
  _city:null,_pred:null,_canvas:null,_ctx:null,_map:null,
  _rotInt:null,_hiddenEls:[],_pugGeo:null,_reguli:null,
  _wikiText:'',_gf:null,_assetsReady:false,_inseData:null,

  SCENES:[
    {id:'s1',  dur:14000, label:'IDENTITATE'},
    {id:'s2',  dur:16000, label:'ORASUL AZI'},
    {id:'s3',  dur:18000, label:'POPULATIA'},
    {id:'s4',  dur:18000, label:'ECONOMIA'},
    {id:'s5',  dur:22000, label:'2055 — UNDE CRESTE'},
    {id:'s6',  dur:16000, label:'TRAFICUL'},
    {id:'s7',  dur:16000, label:'TRANSPORT PUBLIC'},
    {id:'s8',  dur:16000, label:'RISCUL SEISMIC'},
    {id:'s9',  dur:16000, label:'INUNDATII & CLIMA'},
    {id:'s10', dur:18000, label:'PROIECTIE 2055'},
    {id:'s11', dur:16000, label:'CE CONSTRUIM'},
    {id:'s12', dur:20000, label:'VIZIUNEA 2055'},
  ],

  async launch(cityKey){
    const map=window.map;
    if(!map){ss('Harta indisponibila');return;}
    this._map=map;
    const db=window._RO_CITIES_DB||{};
    this._city=db[cityKey]||Object.values(db)[0]||{name:'Municipiu',lat:45.5,lon:25.0,pop2021:100000,pop2011:100000,pib_eur_cap:9000,regiune:'C',tip:'municipiu',coef_hub:1.0,suprafata_ha:5000,spatii_verzi_mp_loc:10,acoperire_transport:55};
    this._pred=_PRED.calc(this._city);
    this._pugGeo=null;this._reguli=null;this._wikiText='';this._assetsReady=false;
    this._hideUI();
    this._canvas=this._mkCanvas();this._ctx=this._canvas.getContext('2d');
    this._mkCtrl();
    this._si=0;this._playing=true;
    // Async — nu blocheaza startul
    this._loadAssets(this._city);
    const siruta=this._city.siruta||'';
    _PRED.fetchINSE(siruta).then(d=>{
      if(!d)return;
      this._inseData=d;
      // Imbogateste _pred cu date reale INSE
      this._pred=_PRED._enrichPredFromINSE(this._pred,d);
      ss('📊 INSE live: '+(d._locLabel||siruta||'date incarcate'));
    });
    this._runScene(0);
    ss('🎬 '+this._city.name+' — Cinema v8');
  },

  async _loadAssets(city){
    try{
      const r=await fetch('https://ro.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(city.name),{signal:AbortSignal.timeout(5000)});
      if(r.ok){const d=await r.json();this._wikiText=d.extract?d.extract.slice(0,180)+'...':'';}
    }catch(e){}
    try{
      const reg=window._PUG_REGISTRY||{};
      const id=city.id||city.name?.toLowerCase().replace(/\s+/g,'-').replace(/[ăâ]/g,'a').replace(/[îí]/g,'i').replace(/[șş]/g,'s').replace(/[țţ]/g,'t');
      const slug=Object.keys(reg).find(k=>reg[k].id===id);
      const pugUrl=reg[slug]?.pugFile||'data/municipiul-iasi/pug.geojson';
      const rulesUrl=reg[slug]?.rulesFile||pugUrl.replace('pug.geojson','reguli.json');
      const [r1,r2]=await Promise.all([fetch(pugUrl).catch(()=>null),fetch(rulesUrl).catch(()=>null)]);
      if(r1?.ok)this._pugGeo=await r1.json();
      if(r2?.ok)this._reguli=await r2.json();
      this._assetsReady=true;
      console.log('[v8] PUG:',this._pugGeo?.features?.length||0,'UTR');
    }catch(e){console.warn('[v8] assets:',e.message);}
  },

  _mkCanvas(){
    document.getElementById('tci-c8')?.remove();
    const c=document.createElement('canvas');c.id='tci-c8';
    const dpr=window.devicePixelRatio||1;
    c.style.cssText='position:fixed;top:0;left:0;z-index:95000;width:100vw;height:100vh;pointer-events:none;';
    c.width=window.innerWidth*dpr;c.height=window.innerHeight*dpr;
    c.getContext('2d').scale(dpr,dpr);
    document.body.appendChild(c);return c;
  },

  _mkCtrl(){
    document.getElementById('tci-c8-ctrl')?.remove();
    const d=document.createElement('div');d.id='tci-c8-ctrl';
    d.style.cssText='position:fixed;bottom:28px;right:20px;z-index:96000;display:flex;gap:8px;';
    d.innerHTML=`
      <button id="c8-prev" style="background:rgba(0,0,0,.55);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.6);padding:10px 16px;border-radius:10px;cursor:pointer;font:600 12px/1 monospace;backdrop-filter:blur(8px)">◀</button>
      <button id="c8-skip" style="background:rgba(0,0,0,.55);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.6);padding:10px 18px;border-radius:10px;cursor:pointer;font:600 12px/1 monospace;backdrop-filter:blur(8px)">▶</button>
      <button id="c8-stop" style="background:rgba(180,0,0,.45);border:1px solid rgba(255,80,80,.3);color:#ff9999;padding:10px 14px;border-radius:10px;cursor:pointer;font:600 12px/1 monospace;backdrop-filter:blur(8px)">✕</button>`;
    document.body.appendChild(d);
    document.getElementById('c8-prev').onclick=()=>{if(this._si>0){this._cleanLayers();if(this._raf)cancelAnimationFrame(this._raf);this._runScene(this._si-1);}};
    document.getElementById('c8-skip').onclick=()=>{if(this._si<this.SCENES.length-1){this._cleanLayers();if(this._raf)cancelAnimationFrame(this._raf);this._runScene(this._si+1);}};
    document.getElementById('c8-stop').onclick=()=>this.stop();
  },

  _hideUI(){
    this._hiddenEls=[];
    ['#panel','#panel-tabs','#panel-body','#topbar','#wx-topbar','#info-drawer','#utr-drawer',
     '#info-drawer-backdrop','#ux-gdpr-footer','#tci-adv-menu','#viz-menu','#rapoarte-menu',
     '#analize-menu','#cancel-parcel-btn','#btnPDF','.mapboxgl-ctrl-bottom-left','.mapboxgl-ctrl-bottom-right']
    .forEach(s=>{document.querySelectorAll(s).forEach(e=>{if(!e.dataset.c8h){e.dataset.c8h=e.style.cssText;e.style.setProperty('display','none','important');this._hiddenEls.push(e);}});});
    document.querySelectorAll('nav,[id*="topbar"],[id*="toolbar"]').forEach(e=>{if(!e.dataset.c8h){e.dataset.c8h=e.style.cssText;e.style.setProperty('display','none','important');this._hiddenEls.push(e);}});
  },
  _restoreUI(){this._hiddenEls.forEach(e=>{e.style.cssText=e.dataset.c8h||'';delete e.dataset.c8h;});this._hiddenEls=[];},

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
        try{this._draw(scene.id,t);}catch(e){console.warn('[v8]',scene.id,e.message);}
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
    document.getElementById('tci-c8')?.remove();
    document.getElementById('tci-c8-ctrl')?.remove();
    this._cleanLayers();this._restoreUI();
    try{window.map?.flyTo({zoom:13,pitch:0,bearing:0,duration:1500,essential:true});}catch(e){}
  },

  _finish(){
    this._playing=false;
    if(this._raf)cancelAnimationFrame(this._raf);
    if(this._rotInt){clearInterval(this._rotInt);this._rotInt=null;}
    document.getElementById('tci-c8-ctrl')?.remove();
    const c=document.getElementById('tci-c8');
    if(c){c.style.transition='opacity 1.5s';c.style.opacity='0';setTimeout(()=>c.remove(),1600);}
    this._cleanLayers();
    setTimeout(()=>this._restoreUI(),1000);
    try{window.map?.flyTo({zoom:13,pitch:45,bearing:0,duration:2000,essential:true});window.map?.setConfigProperty?.('basemap','lightPreset','day');}catch(e){}
    ss('✅ '+this._city?.name);
  },

  // ── MAPBOX SETUP — camera e naratorul ──────────────────────────────────────
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
      case 's1':
        // Zoom in dramatic din z=8 (tara) la z=14 (oras), pitch creste 0→60
        try{map.jumpTo({center:[cx,cy],zoom:8,pitch:0,bearing:0});}catch(e){}
        try{map.setConfigProperty('basemap','lightPreset','night');}catch(e){}
        setTimeout(()=>fly(13.5,58,15,6000,'night'),300);
        break;
      case 's2':
        // Orbita lenta 360 la pitch 55 — vede intregul oras 3D
        try{map.jumpTo({center:[cx,cy],zoom:13,pitch:55,bearing:-30});}catch(e){}
        try{map.setConfigProperty('basemap','lightPreset','day');}catch(e){}
        setTimeout(()=>fly(13.5,58,30,4000,'day'),200);
        this._rot(map,30,0.025);
        onIdle(()=>this._addBuildings(map));
        break;
      case 's3':
        // Zoom in pe densitate rezidentiala, pitch 45, dawn
        fly(12.5,45,-10,3000,'dawn');
        onIdle(()=>this._addDensityHeat(map));
        break;
      case 's4':
        // Cladiri 3D standard colorate, zi, pitch 55
        fly(13.5,55,20,3000,'day');
        onIdle(()=>this._addBuildings(map));
        break;
      case 's5':
        // Bare 3D PUG cresc animat, rotatie lenta, noapte — SCENA CHEIE
        try{map.jumpTo({center:[cx,cy],zoom:11,pitch:50,bearing:0});}catch(e){}
        try{map.setConfigProperty('basemap','lightPreset','night');}catch(e){}
        setTimeout(()=>{try{map.flyTo({center:[cx,cy],zoom:12,pitch:60,bearing:20,duration:5000,essential:true});}catch(e){}},500);
        this._add3DGrowth(map);
        this._rot(map,20,0.018);
        break;
      case 's6':
        // Trafic pulsand, pitch 42, noapte — linii vii
        fly(13,42,0,2500,'night');
        onIdle(()=>this._addTrafficPulse(map));
        break;
      case 's7':
        // Acoperire TP expand din centru, zi
        fly(13,40,0,2500,'day');
        onIdle(()=>this._addTransitExpand(map));
        break;
      case 's8':
        // Heatmap seismic pulsand, noapte — dramatic
        fly(12,35,0,2500,'night');
        onIdle(()=>this._addSeismicHeat(map));
        break;
      case 's9':
        // Zona inundabila creste animat, dawn
        fly(12,30,5,2500,'dawn');
        onIdle(()=>this._addFloodExpand(map));
        break;
      case 's10':
        // 3 inele extindere 2011/2021/2035/2055 apar succesiv, dusk
        fly(11,45,-5,3000,'dusk');
        onIdle(()=>this._addExpansionRings(map));
        break;
      case 's11':
        // Puncte infrastructura flash pe harta, zi
        fly(13,50,15,2500,'day');
        onIdle(()=>this._addInfraPoints(map));
        break;
      case 's12':
        // Rotatie sunset, cladiri la maxim, dramatic
        try{map.jumpTo({center:[cx,cy],zoom:11,pitch:55,bearing:0});}catch(e){}
        try{map.setConfigProperty('basemap','lightPreset','dusk');}catch(e){}
        setTimeout(()=>fly(12.5,62,45,6000,'dusk'),500);
        onIdle(()=>{this._addBuildings(map);this._add3DGrowthFull(map);});
        this._rot(map,45,0.012);
        break;
    }
  },

  // ── LAYERS 3D ─────────────────────────────────────────────────────────────
  _safeAdd(map,srcId,srcDef,lyrDef){
    try{
      if(map.getLayer(lyrDef.id))map.removeLayer(lyrDef.id);
      if(map.getSource(srcId))map.removeSource(srcId);
      map.addSource(srcId,srcDef);map.addLayer(lyrDef);
    }catch(e){console.warn('[v8] layer err:',lyrDef.id,e.message);}
  },

  // Bare 3D din PUG — cresc animat cu t
  _add3DGrowth(map){
    const geo=this._pugGeo,reg=this._reguli||{},pred=this._pred;
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5;
    let features=[];
    if(geo?.features?.length>0){
      geo.features.slice(0,800).forEach(f=>{
        const u=f.properties?.utr_cod||f.properties?.cod_utr||'';
        const rv=reg[u]||{};
        const cut=parseFloat(rv.CUT||rv.cut||0)||0;
        const pr=u.startsWith('CC')||u.startsWith('CP')?0.95:u.startsWith('CM')||u.startsWith('CB')?0.75:u.startsWith('LC')||u.startsWith('LB')?0.58:u.startsWith('LA')||u.startsWith('LL')?0.42:u.startsWith('AI')||u.startsWith('AA')?0.65:0.30;
        const hFinal=Math.max(4,(cut||pr*4.5)*(12+pred.hub*7));
        const c=pr>0.80?'#ff3366':pr>0.65?'#ff8c00':pr>0.45?'#4a90d9':'#22c55e';
        features.push({...f,properties:{...f.properties,hFinal,h:0.5,c,pr}});
      });
    }else{
      // Fallback geometric realist — mai multe zone cu densitati diferite
      const zones=[
        {r:0.004,h:80,c:'#ff3366',label:'CBD'},
        {r:0.009,h:55,c:'#ff8c00',label:'Semi-central N'},
        {r:0.009,h:50,c:'#ff8c00',label:'Semi-central S',ang:180},
        {r:0.018,h:35,c:'#4a90d9',label:'Rezidential'},
        {r:0.028,h:22,c:'#4a90d9',label:'Rezidential ext.'},
        {r:0.042,h:12,c:'#22c55e',label:'Periferie'},
        {r:0.060,h:6,c:'#22c55e',label:'Extravilan'},
      ];
      zones.forEach((z,zi)=>{
        const n=64,outer=[],inner=[];
        const offLon=(z.ang?Math.cos(z.ang*Math.PI/180)*z.r*0.5:0);
        const offLat=(z.ang?Math.sin(z.ang*Math.PI/180)*z.r*0.3:0);
        const rcx=cx+offLon,rcy=cy+offLat;
        for(let i=0;i<=n;i++){
          const a=(i/n)*Math.PI*2;
          outer.push([rcx+Math.cos(a)*z.r*1.4,rcy+Math.sin(a)*z.r]);
        }
        features.push({type:'Feature',geometry:{type:'Polygon',coordinates:[outer]},properties:{hFinal:z.h,h:0.5,c:z.c,pr:z.h/80}});
      });
    }
    this._gf=features;
    this._safeAdd(map,'v8-gr',{type:'geojson',data:{type:'FeatureCollection',features}},{
      id:'v8-gr-l',type:'fill-extrusion',source:'v8-gr',
      paint:{
        'fill-extrusion-color':['get','c'],
        'fill-extrusion-height':['coalesce',['get','h'],1],
        'fill-extrusion-base':0,
        'fill-extrusion-opacity':0.88,
        'fill-extrusion-ambient-occlusion-intensity':0.4
      }
    });
    ['utr-fill','utr-line'].forEach(id=>{try{if(map.getLayer(id))map.setLayoutProperty(id,'visibility','none');}catch(e){}});
  },

  // Varianta la h maxim (pentru scena finala)
  _add3DGrowthFull(map){
    if(!this._gf)this._add3DGrowth(map);
    setTimeout(()=>{
      try{
        const src=map.getSource('v8-gr');
        if(!src)return;
        src.setData({type:'FeatureCollection',features:this._gf.map(f=>({...f,properties:{...f.properties,h:f.properties.hFinal}}))});
      }catch(e){}
    },2000);
  },

  // Update animat bare 3D cu t
  _updateGrowth(t){
    const map=this._map;if(!map||!this._gf)return;
    try{
      const src=map.getSource('v8-gr');if(!src)return;
      const te=eo(t);
      src.setData({type:'FeatureCollection',features:this._gf.map(f=>({...f,properties:{...f.properties,h:Math.max(0.5,(f.properties.hFinal||20)*te)}}))});
    }catch(e){}
  },

  // Cladiri standard Mapbox colorate pe tip UTR
  _addBuildings(map){
    if(!this._pugGeo?.features?.length)return;
    const reg=this._reguli||{};
    const features=this._pugGeo.features.slice(0,600).map(f=>{
      const u=f.properties?.utr_cod||'';
      const rv=reg[u]||{};
      const rh=parseInt(rv.RH?.replace(/[^0-9]/g,'')||'3');
      const h=Math.max(4,rh*3.8);
      const c=h>40?'#c0c8d8':h>20?'#d4d9e3':'#e8eaed';
      return{...f,properties:{...f.properties,h,c}};
    });
    this._safeAdd(map,'v8-bld',{type:'geojson',data:{type:'FeatureCollection',features}},{
      id:'v8-bld-l',type:'fill-extrusion',source:'v8-bld',
      paint:{
        'fill-extrusion-color':['get','c'],
        'fill-extrusion-height':['coalesce',['get','h'],4],
        'fill-extrusion-base':0,
        'fill-extrusion-opacity':0.7,
        'fill-extrusion-ambient-occlusion-intensity':0.35
      }
    });
  },

  // Heatmap densitate — 2D dar animat
  _addDensityHeat(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5;
    if(this._pugGeo?.features?.length){
      this._safeAdd(map,'v8-ht',{type:'geojson',data:this._pugGeo},{
        id:'v8-ht-l',type:'heatmap',source:'v8-ht',
        paint:{
          'heatmap-weight':['interpolate',['linear'],['coalesce',['to-number',['get','suprafata_mp'],null],['to-number',['get','SUPRAFATA'],null],5000],500,0,50000,1],
          'heatmap-intensity':['interpolate',['linear'],['zoom'],10,1,15,3],
          'heatmap-color':['interpolate',['linear'],['heatmap-density'],0,'rgba(0,0,255,0)',0.2,'#22c55e',0.4,'#f59e0b',0.7,'#ef4444',1,'#ff0066'],
          'heatmap-radius':['interpolate',['linear'],['zoom'],10,15,14,30],
          'heatmap-opacity':0.75
        }
      });
    } else {
      // Fallback: heatmap din puncte generate
      const cx2=cx,cy2=cy;
      const pts=[];
      for(let i=0;i<200;i++){
        const a=Math.random()*Math.PI*2,r=Math.random()*0.04;
        const w=1-r/0.04;
        pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx2+Math.cos(a)*r*1.4,cy2+Math.sin(a)*r]},properties:{w}});
      }
      this._safeAdd(map,'v8-ht',{type:'geojson',data:{type:'FeatureCollection',features:pts}},{
        id:'v8-ht-l',type:'heatmap',source:'v8-ht',
        paint:{
          'heatmap-weight':['get','w'],
          'heatmap-intensity':2,
          'heatmap-color':['interpolate',['linear'],['heatmap-density'],0,'rgba(0,0,255,0)',0.2,'#22c55e',0.5,'#f59e0b',0.8,'#ef4444',1,'#ff0066'],
          'heatmap-radius':25,
          'heatmap-opacity':0.8
        }
      });
    }
  },

  // Trafic pulsand — linii animate prin data update
  _addTrafficPulse(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5;
    const artere=[];
    // 8 radiale cu culori trafic
    [0,45,90,135,180,225,270,315].forEach((deg,i)=>{
      const rad=deg*Math.PI/180,r=0.055;
      const c=i<3?'#ef4444':i<5?'#f59e0b':'#22c55e';
      const w=i<3?7:i<5?5:3;
      artere.push({type:'Feature',geometry:{type:'LineString',coordinates:[[cx,cy],[cx+Math.cos(rad)*r*1.6,cy+Math.sin(rad)*r]]},properties:{c,w,idx:i}});
    });
    // Centura
    const n=80,r=0.06,ring=[];
    for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;ring.push([cx+Math.cos(a)*r*1.7,cy+Math.sin(a)*r]);}
    artere.push({type:'Feature',geometry:{type:'LineString',coordinates:ring},properties:{c:'#a855f7',w:6,idx:8}});
    this._gfTr=artere;
    this._safeAdd(map,'v8-tr',{type:'geojson',data:{type:'FeatureCollection',features:artere}},{
      id:'v8-tr-l',type:'line',source:'v8-tr',
      paint:{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0.92,'line-blur':0.5},
      layout:{'line-cap':'round','line-join':'round'}
    });
  },

  // Update puls trafic
  _updateTraffic(t){
    const map=this._map;if(!map||!this._gfTr)return;
    try{
      const src=map.getSource('v8-tr');if(!src)return;
      const pulse=0.5+0.5*Math.sin(t*Math.PI*8);
      src.setData({type:'FeatureCollection',features:this._gfTr.map(f=>{
        const isPulse=f.properties.idx<3;
        return{...f,properties:{...f.properties,w:isPulse?f.properties.w*(0.7+pulse*0.6):f.properties.w}};
      })});
    }catch(e){}
  },

  // Transport public — cerc expand din centru
  _addTransitExpand(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5,pred=this._pred;
    const linii=[];
    const tR=pred.tp/100*0.07;
    const n=64,ring=[];
    for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;ring.push([cx+Math.cos(a)*tR*1.5,cy+Math.sin(a)*tR]);}
    linii.push({type:'Feature',geometry:{type:'LineString',coordinates:ring},properties:{c:'#3b82f6',w:4}});
    [0,90,180,270].slice(0,Math.min(4,Math.ceil(pred.kmBRT/8))).forEach(deg=>{
      const rad=deg*Math.PI/180;
      linii.push({type:'Feature',geometry:{type:'LineString',coordinates:[[cx-Math.cos(rad)*0.05,cy-Math.sin(rad)*0.032],[cx+Math.cos(rad)*0.05,cy+Math.sin(rad)*0.032]]},properties:{c:'#a855f7',w:8}});
    });
    this._gfTp=linii;
    this._safeAdd(map,'v8-tp',{type:'geojson',data:{type:'FeatureCollection',features:linii}},{
      id:'v8-tp-l',type:'line',source:'v8-tp',
      paint:{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0.85},
      layout:{'line-cap':'round'}
    });
  },

  // Seismic heatmap pulsand
  _addSeismicHeat(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5,pred=this._pred;
    const c=pred.ag>=0.30?'#ff0000':pred.ag>=0.20?'#ff8c00':'#22c55e';
    // Zona seismica ca fill
    const r=0.12*(pred.ag/0.25),n=72,ring=[];
    for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;ring.push([cx+Math.cos(a)*r*1.5,cy+Math.sin(a)*r]);}
    this._safeAdd(map,'v8-sei',{type:'geojson',data:{type:'Feature',geometry:{type:'Polygon',coordinates:[ring]},properties:{}}},{
      id:'v8-sei-l',type:'fill',source:'v8-sei',paint:{'fill-color':c,'fill-opacity':0.28}
    });
    // UTR-uri vulnerabile din PUG
    if(this._pugGeo?.features?.length){
      const ft=this._pugGeo.features.filter(f=>{const u=f.properties?.utr_cod||'';return u.startsWith('LA')||u.startsWith('LB')||u.startsWith('LL');}).slice(0,400);
      if(ft.length){
        this._safeAdd(map,'v8-risc',{type:'geojson',data:{type:'FeatureCollection',features:ft}},{
          id:'v8-risc-l',type:'fill',source:'v8-risc',paint:{'fill-color':'#ff0000','fill-opacity':0.45}
        });
      }
    }
  },

  // Zona inundabila expand
  _addFloodExpand(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5;
    // Zona inundabila de-a lungul vaii (orientata est-vest)
    const coords=[[cx-0.09,cy-0.010],[cx-0.05,cy-0.016],[cx-0.01,cy-0.009],[cx+0.03,cy-0.005],[cx+0.07,cy-0.012],[cx+0.09,cy+0.005],[cx+0.07,cy+0.022],[cx+0.03,cy+0.018],[cx-0.01,cy+0.013],[cx-0.05,cy+0.012],[cx-0.09,cy+0.010]];
    this._gfFlood=coords;
    this._safeAdd(map,'v8-fl',{type:'geojson',data:{type:'Feature',geometry:{type:'Polygon',coordinates:[coords]},properties:{}}},{
      id:'v8-fl-l',type:'fill',source:'v8-fl',paint:{'fill-color':'#1d4ed8','fill-opacity':0.55}
    });
    // Autostrada si centura
    const roads=[[cx-0.15,cy+0.020],[cx,cy+0.008],[cx+0.15,cy+0.020]];
    this._safeAdd(map,'v8-aut',{type:'geojson',data:{type:'Feature',geometry:{type:'LineString',coordinates:roads},properties:{}}},{
      id:'v8-aut-l',type:'line',source:'v8-aut',paint:{'line-color':'#fbbf24','line-width':5,'line-opacity':0.9}
    });
  },

  // Inele extindere intravilan
  _addExpansionRings(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5;
    const rings=[
      {rm:0.78,col:'#94a3b8',op:0.25,w:2,yr:2011},
      {rm:1.00,col:'#60a5fa',op:0.40,w:3,yr:2021},
      {rm:1.18,col:'#f59e0b',op:0.50,w:4,yr:2035},
      {rm:1.40,col:'#ef4444',op:0.65,w:6,yr:2055},
    ];
    const ft=rings.map(ring=>{
      const n=80,r=0.075*ring.rm,coords=[];
      for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;coords.push([cx+Math.cos(a)*r*1.65,cy+Math.sin(a)*r]);}
      return{type:'Feature',geometry:{type:'LineString',coordinates:coords},properties:{c:ring.col,op:ring.op,w:ring.w,yr:ring.yr}};
    });
    this._safeAdd(map,'v8-ex',{type:'geojson',data:{type:'FeatureCollection',features:ft}},{
      id:'v8-ex-l',type:'line',source:'v8-ex',
      paint:{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':['get','op'],'line-dasharray':[6,3]},
      layout:{'line-cap':'round'}
    });
  },

  // Puncte infrastructura necesara
  _addInfraPoints(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5,pred=this._pred;
    const pts=[
      {lon:cx+0.01,lat:cy+0.018,c:'#60a5fa',r:16,type:'tp'},
      {lon:cx-0.025,lat:cy-0.012,c:'#ef4444',r:13,type:'seismic'},
      {lon:cx+0.030,lat:cy-0.008,c:'#22c55e',r:14,type:'verde'},
      {lon:cx+0.015,lat:cy+0.025,c:'#60a5fa',r:10,type:'scoala'},
      {lon:cx-0.010,lat:cy+0.010,c:'#f59e0b',r:11,type:'social'},
      {lon:cx-0.035,lat:cy+0.005,c:'#a855f7',r:12,type:'brt'},
    ];
    this._safeAdd(map,'v8-inf',{type:'geojson',data:{type:'FeatureCollection',features:pts.map(p=>({type:'Feature',geometry:{type:'Point',coordinates:[p.lon,p.lat]},properties:{c:p.c,r:p.r}}))}},{
      id:'v8-inf-l',type:'circle',source:'v8-inf',
      paint:{'circle-radius':['get','r'],'circle-color':['get','c'],'circle-opacity':0.9,'circle-stroke-width':3,'circle-stroke-color':'rgba(255,255,255,0.5)','circle-blur':0.1}
    });
  },

  _cleanLayers(){
    const map=this._map;if(!map)return;
    ['v8-gr-l','v8-gr','v8-bld-l','v8-bld','v8-ht-l','v8-ht',
     'v8-tr-l','v8-tr','v8-tp-l','v8-tp','v8-sei-l','v8-sei','v8-risc-l','v8-risc',
     'v8-fl-l','v8-fl','v8-aut-l','v8-aut','v8-ex-l','v8-ex','v8-inf-l','v8-inf',
     // cleanup v6/v7 layers
     'v6-gr-l','v6-gr','v6-bld-l','v6-bld','v6-den-l','v6-den','v6-tr-l','v6-tr',
     'v7-gr-l','v7-gr','v7-bld-l','v7-bld','v7-den-l','v7-den','v7-tr-l','v7-tr',
    ].forEach(id=>{try{if(map.getLayer(id))map.removeLayer(id);}catch(e){} try{if(map.getSource(id))map.removeSource(id);}catch(e){}});
    ['utr-fill','utr-line','utr-lbl'].forEach(id=>{try{if(map.getLayer(id))map.setLayoutProperty(id,'visibility','visible');}catch(e){}});
    this._gf=null;this._gfTr=null;this._gfTp=null;
  },

  _rot(map,b0,spd){
    if(this._rotInt)clearInterval(this._rotInt);
    let b=b0;
    this._rotInt=setInterval(()=>{
      if(!this._playing){clearInterval(this._rotInt);this._rotInt=null;return;}
      b+=spd;try{map.setBearing(b%360);}catch(e){}
    },50);
  },

  // ── CANVAS DRAW — MINIMAL, IMERSIV ────────────────────────────────────────
  // REGULA: Canvas e aproape invizibil. Harta e tot.
  // Per scena: gradient subtil + 1 titlu + 1 cifra + progress bar jos
  _draw(id,t){
    const ctx=this._ctx,W=window.innerWidth,H=window.innerHeight;
    const city=this._city,pred=this._pred,name=city?.name||'UAT';
    if(!ctx||!pred)return;

    const rev=(d,s=0.25)=>Math.min(1,Math.max(0,(t-d)/s));
    const rE=(d,s=0.25)=>eo(rev(d,s));
    // Fade in la inceput, fade out la sfarsit
    const sA=t<0.08?t/0.08:t>0.90?Math.max(0,(1-t)/0.10):1;
    const al=(a)=>{ctx.globalAlpha=Math.max(0,Math.min(1,a));};

    // Gradient negru sus (15%) si jos (12%) — harta vizibila 73%
    const vignette=()=>{
      const gT=ctx.createLinearGradient(0,0,0,H*0.18);
      gT.addColorStop(0,'rgba(2,5,14,0.82)');gT.addColorStop(1,'rgba(2,5,14,0)');
      ctx.fillStyle=gT;al(1);ctx.fillRect(0,0,W,H*0.18);
      const gB=ctx.createLinearGradient(0,H*0.80,0,H);
      gB.addColorStop(0,'rgba(2,5,14,0)');gB.addColorStop(1,'rgba(2,5,14,0.75)');
      ctx.fillStyle=gB;ctx.fillRect(0,H*0.80,W,H*0.20);
    };

    // Titlu scurt sus stanga
    const titlu=(txt,sub='')=>{
      al(sA*rE(0.06,0.22));
      ctx.fillStyle='rgba(212,175,55,0.9)';
      ctx.font=`600 ${W*0.0072}px "IBM Plex Mono",monospace`;
      ctx.textAlign='left';ctx.letterSpacing='0.15em';
      ctx.fillText(txt.toUpperCase(),W*0.048,H*0.095);
      if(sub){
        al(sA*rE(0.10,0.22)*0.65);
        ctx.fillStyle='rgba(148,163,184,0.75)';
        ctx.font=`${W*0.0058}px "IBM Plex Mono",monospace`;
        ctx.fillText(sub,W*0.048,H*0.124);
      }
    };

    // Linie aurie subtila sub titlu
    const linieAur=()=>{
      al(sA*rE(0.08,0.3));
      const g=ctx.createLinearGradient(W*0.048,0,W*0.35,0);
      g.addColorStop(0,'rgba(212,175,55,0.8)');g.addColorStop(1,'rgba(212,175,55,0)');
      ctx.fillStyle=g;ctx.fillRect(W*0.048,H*0.132,W*0.30*rE(0.08,0.35),1.5);
    };

    // Cifra cheie dramatica — stanga jos deasupra progress
    const cifra=(val,lbl2,clr='#ffffff')=>{
      al(sA*rE(0.18,0.28));
      ctx.fillStyle=clr;
      ctx.font=`900 ${W*0.072}px "Space Grotesk",sans-serif`;
      ctx.textAlign='left';
      ctx.fillText(val,W*0.048,H*0.82);
      al(sA*rE(0.22,0.22)*0.7);
      ctx.fillStyle='rgba(148,163,184,0.7)';
      ctx.font=`${W*0.0062}px "IBM Plex Mono",monospace`;
      ctx.fillText(lbl2.toUpperCase(),W*0.048,H*0.845);
    };

    // Cifra secundara dreapta jos
    const cifra2=(val,lbl2,clr='rgba(212,175,55,0.9)')=>{
      al(sA*rE(0.28,0.25));
      ctx.fillStyle=clr;
      ctx.font=`900 ${W*0.042}px "Space Grotesk",sans-serif`;
      ctx.textAlign='right';
      ctx.fillText(val,W*0.952,H*0.82);
      al(sA*rE(0.32,0.22)*0.6);
      ctx.fillStyle='rgba(148,163,184,0.65)';
      ctx.font=`${W*0.006}px "IBM Plex Mono",monospace`;
      ctx.textAlign='right';
      ctx.fillText(lbl2.toUpperCase(),W*0.952,H*0.843);
    };

    // Mesaj narativ — apare la t>0.65, 2-3 randuri max
    const narativ=(txt,clr='rgba(220,228,255,0.80)')=>{
      if(t<0.62)return;
      const fa=Math.min(1,(t-0.62)/0.18)*sA;
      al(fa);
      ctx.fillStyle=clr;
      ctx.font=`500 ${W*0.0068}px "Space Grotesk",sans-serif`;
      ctx.textAlign='left';
      // Wrap text
      const words=txt.split(' '),maxW=W*0.55;
      let line='',y=H*0.73;
      words.forEach(w=>{
        const test=line+w+' ';
        if(ctx.measureText(test).width>maxW&&line){
          ctx.fillText(line.trim(),W*0.048,y);y+=H*0.030;line=w+' ';
        }else line=test;
      });
      if(line)ctx.fillText(line.trim(),W*0.048,y);
    };

    // Progress bar jos centru — minimal
    const prog=()=>{
      al(0.50);
      ctx.fillStyle='rgba(255,255,255,0.10)';ctx.fillRect(W*0.25,H-16,W*0.50,2);
      const g=ctx.createLinearGradient(W*0.25,0,W*0.75,0);
      g.addColorStop(0,'#D4AF37');g.addColorStop(1,'rgba(212,175,55,0.4)');
      ctx.fillStyle=g;ctx.fillRect(W*0.25,H-16,W*0.50*((this._si+t)/this.SCENES.length),2);
      ctx.fillStyle='rgba(148,163,184,0.40)';
      ctx.font=`${W*0.0055}px "IBM Plex Mono",monospace`;
      ctx.textAlign='center';
      ctx.fillText(`${this._si+1} / ${this.SCENES.length}`,W/2,H-4);
      al(1);
    };

    // ── DRAW SCENA ────────────────────────────────────────────────────────
    al(1);vignette();

    switch(id){

    case 's1':{
      // IDENTITATE — zoom in dramatic, numele orasului apare
      titlu(name,'Romania · '+((city.tip||'municipiu')));
      linieAur();
      // Numele urias centru
      al(sA*rE(0.20,0.35));
      ctx.fillStyle='rgba(255,255,255,0.92)';
      ctx.font=`900 ${Math.min(W*0.10,130)}px "Space Grotesk",sans-serif`;
      ctx.textAlign='center';
      ctx.fillText(name.toUpperCase(),W*0.50,H*0.50);
      // Subtext
      al(sA*rE(0.32,0.30)*0.7);
      ctx.fillStyle='#D4AF37';
      ctx.font=`600 ${W*0.014}px "Space Grotesk",sans-serif`;
      ctx.textAlign='center';
      ctx.fillText('JUD. '+(city.judet||'—').toUpperCase()+' · REG. '+(city.regiune||'—'),W*0.50,H*0.565);
      // Cifre sus dreapta discrete
      al(sA*rE(0.40,0.25)*0.75);
      ctx.fillStyle='rgba(148,163,184,0.7)';
      ctx.font=`${W*0.007}px "IBM Plex Mono",monospace`;
      ctx.textAlign='right';
      ctx.fillText(N(pred.p21)+' LOCUITORI',W*0.952,H*0.095);
      ctx.fillText(N(Math.round(pred.sup/100))+' KM²',W*0.952,H*0.122);
      ctx.fillText(N(pred.pib)+' EUR/LOC',W*0.952,H*0.149);
      if(this._wikiText&&t>0.55){
        al(sA*rE(0.55,0.20)*0.5);
        ctx.fillStyle='rgba(180,195,220,0.65)';
        ctx.font=`italic ${W*0.006}px "IBM Plex Mono",monospace`;
        ctx.textAlign='center';
        const w2=this._wikiText.slice(0,160);
        ctx.fillText(w2,W*0.50,H*0.635);
      }
      break;
    }

    case 's2':{
      // ORASUL AZI — orbita, harta vorbeste
      titlu(name+' · Orasul azi','Vedere 3D · '+new Date().getFullYear());
      linieAur();
      cifra(N(pred.p21),'Locuitori');
      cifra2(N(Math.round(pred.sup/100))+' km²','Suprafata');
      narativ('Acesta este '+name+'. '+N(pred.p21)+' de oameni. '+N(Math.round(pred.sup/100))+' km². Un oras care se transforma.');
      break;
    }

    case 's3':{
      // POPULATIA — heatmap densitate, tensiune demografica
      titlu('Populatia','Densitate · Migratie · Tendinte');
      linieAur();
      const trendTxt=pred.r10>0.5?'creste accelerat':pred.r10>0?'creste moderat':pred.r10>-1?'stagnează':'decade';
      cifra((pred.r10>=0?'+':'')+pred.r10.toFixed(2)+'%/an',pred.trendLbl,pred.trendClr);
      cifra2(N(pred.pop55),'Populatie 2055 estimata');
      narativ(`${name} ${trendTxt}. ${pred.migNeta<0?Math.abs(pred.migNeta)+' persoane pleaca anual':pred.migNeta+' persoane vin anual'}. Fara masuri, in 2055 vom fi ${N(pred.pop55)}.`);
      break;
    }

    case 's4':{
      // ECONOMIA — cladiri 3D, PIB, convergenta
      titlu('Economia','PIB · Convergenta UE · Sectoare');
      linieAur();
      cifra(N(pred.pib)+' €','PIB pe locuitor',pred.pctUE>=75?'#22c55e':'#f59e0b');
      cifra2(pred.pctUE+'% din UE27','Convergenta');
      narativ(`${name} produce ${N(pred.pib)} EUR per locuitor — ${pred.pctUE}% din media europeana. La ritmul actual, convergenta totala: ~${pred.anConv}.`);
      break;
    }

    case 's5':{
      // CORIDOARE 2055 — bare 3D cresc — SCENA PRINCIPALA
      this._updateGrowth(t);
      titlu('Unde creste orasul','Bare 3D din PUG real · Presiune zonala');
      linieAur();
      // Numar animat — creste cu t
      const defAnim=Math.round(pred.defLoc*eo(t));
      cifra(N(defAnim)+' unitati','Deficit locuinte 2055','#ef4444');
      cifra2(N(pred.recHa)+' ha','Potential reconversie');
      narativ(`${N(pred.defLoc)} unitati locative noi necesare pana in 2055. Zonele rosii = presiune maxima. Verde = spatiu disponibil.`);
      break;
    }

    case 's6':{
      // TRAFICUL — linii pulsand
      this._updateTraffic(t);
      titlu('Traficul','Presiune · Saturation · Solutii');
      linieAur();
      cifra(N(pred.mot24),'Vehicule/1000 locuitori',pred.mot24>500?'#ef4444':'#f59e0b');
      cifra2('~'+pred.satAn,'An saturare retea');
      narativ(`${N(pred.fluxOra)} vehicule/ora la varf. Saturatia retelei: ~${pred.satAn}. Fara centura si pasaje, orasul se blocheaza.`);
      break;
    }

    case 's7':{
      // TRANSPORT PUBLIC
      titlu('Transport public','Acoperire · BRT · SUMP');
      linieAur();
      cifra(pred.tp+'%','Populatie acoperita',pred.tp>=70?'#22c55e':pred.tp>=50?'#f59e0b':'#ef4444');
      cifra2(pred.kmBRT+' km BRT','Necesar');
      narativ(`${pred.tp}% din populatie are acces la transport public. Standard european: 75%. Deficit: ${pred.defTP} puncte procentuale. BRT necesar: ${pred.kmBRT} km.`);
      break;
    }

    case 's8':{
      // RISC SEISMIC
      const agC=pred.ag>=0.30?'#ef4444':pred.ag>=0.20?'#f59e0b':'#22c55e';
      titlu('Riscul seismic','Acceleratie seismica · Fond vulnerabil');
      linieAur();
      cifra('ag='+pred.ag.toFixed(2)+'g','Acceleratie seismica P100',agC);
      cifra2(N(pred.fond)+' cladiri','Fond risc RS I-III');
      narativ(`${N(pred.fond)} cladiri la risc seismic. Fara interventie, in 2045 vor fi ${N(Math.round(pred.fond*1.12))}. PNRR poate reabilita ${Math.round(pred.fond*0.25)} apartamente.`);
      break;
    }

    case 's9':{
      // INUNDATII & CLIMA
      titlu('Clima & inundatii','Zone de risc · Adapatare · Cost');
      linieAur();
      cifra(pred.zile24+' zile/an','Caniculare >35°C actual','#f59e0b');
      cifra2(Math.round(pred.zile24*2.2)+' zile','Proiectie 2055');
      narativ(`In 2055, ${name} va avea ${Math.round(pred.zile24*2.2)} zile caniculare pe an. Costul adaptarii: ${N(Math.round(pred.p21/10000*1.8))} M EUR. Costul inactiunii: de 4.5× mai mult.`);
      break;
    }

    case 's10':{
      // PROIECTIE 2055 — inele extindere
      titlu('Proiectie 2055','3 Scenarii · Intravilan · Populatie');
      linieAur();
      const rB=pred.rRef;
      const popOpt=Math.round(pred.p21*Math.pow(1+(rB+0.9)/100,34));
      const popReg=Math.round(pred.p21*Math.pow(1+(rB-0.8)/100,34));
      cifra(N(pred.pop55),'Tendinta (S2)','#f59e0b');
      cifra2('['+N(popReg)+' — '+N(popOpt)+']','Interval 90% probabilitate');
      narativ(`In cel mai bun scenariu: ${N(popOpt)} locuitori. In cel mai rau: ${N(popReg)}. Diferenta: ${N(popOpt-popReg)} oameni si ${N(Math.round((popOpt-popReg)*35/90))} unitati locative.`);
      break;
    }

    case 's11':{
      // CE CONSTRUIM
      titlu('Ce construim pana in 2055','Investitii necesare · Infrastructura');
      linieAur();
      cifra(N(pred.invTotal)+' M €','Investitii necesare total','#D4AF37');
      cifra2('~60% EU','Finantare europeana disponibila');
      // Flash puncte
      if(t>0.15){
        al(sA*rE(0.15,0.3)*0.85);
        const items=[['🏫','+'+(pred.scoliNoi||0)+' scoli'],['🏥','+'+pred.cabMed+' cabinete'],['🌳','+'+pred.svHa+' ha verzi'],['🚌','+'+pred.statiiNoi+' statii']];
        items.forEach((it,i)=>{
          al(sA*rE(0.20+i*0.08,0.2)*0.9);
          ctx.font=`${W*0.016}px sans-serif`;ctx.textAlign='left';ctx.fillText(it[0],W*(0.048+i*0.23),H*0.73);
          ctx.fillStyle='rgba(220,230,255,0.85)';ctx.font=`700 ${W*0.0072}px "Space Grotesk",sans-serif`;ctx.fillText(it[1],W*(0.048+i*0.23),H*0.755);
        });
      }
      narativ(`${N(pred.invTotal)} M EUR necesari pana in 2055. Uniunea Europeana acopera ~60%. Fara planificare azi, costul creste exponential.`);
      break;
    }

    case 's12':{
      // VIZIUNEA 2055 — scena finala, harta roteste, cladiri la maxim
      // Watermark 2055 ultra-subtil
      al(sA*rE(0.05,0.5)*0.06);
      ctx.fillStyle='#D4AF37';
      ctx.font=`900 ${W*0.32}px "Space Grotesk",sans-serif`;
      ctx.textAlign='center';
      ctx.fillText('2055',W*0.50,H*0.65);
      al(1);
      titlu(name+' · 2055','Viziunea posibila');
      linieAur();
      const sub2=pred.rRef>0.5?'UN ORAS IN CRESTERE CARE ALEGE INTELIGENT':pred.rRef>0?'UN ORAS CARE DEVINE MOTOR REGIONAL':'UN ORAS CARE ALEGE CALITATEA';
      al(sA*rE(0.18,0.30));
      ctx.fillStyle='#D4AF37';ctx.font=`700 ${W*0.010}px "Space Grotesk",sans-serif`;ctx.textAlign='center';ctx.letterSpacing='0.12em';
      ctx.fillText(sub2,W*0.50,H*0.175);
      // Concluzii check — dreapta jos
      al(sA*rE(0.30,0.30));
      const checks=[
        {ok:pred.pop55>pred.p21,txt:'Pop. 2055: '+N(pred.pop55)},
        {ok:pred.pctUE55>=75,txt:'PIB: '+pred.pctUE55+'% din UE'},
        {ok:pred.anSUMP<=2035,txt:'SUMP: ~'+pred.anSUMP},
        {ok:pred.sdgTotal>=6,txt:'SDG11: '+pred.sdgTotal+'/10'},
      ];
      checks.forEach((c2,i)=>{
        al(sA*rE(0.32+i*0.08,0.22));
        ctx.fillStyle=c2.ok?'#22c55e':'#f59e0b';
        ctx.font=`700 ${W*0.014}px sans-serif`;ctx.textAlign='right';
        ctx.fillText(c2.ok?'✓':'◎',W*0.952,H*(0.72+i*0.048));
        ctx.fillStyle='rgba(220,228,255,0.80)';
        ctx.font=`${W*0.007}px "Space Grotesk",sans-serif`;ctx.textAlign='right';
        ctx.fillText(c2.txt,W*0.942,H*(0.72+i*0.048));
      });
      // Footer
      al(sA*rE(0.70,0.25)*0.45);
      ctx.fillStyle='rgba(148,163,184,0.5)';ctx.font=`${W*0.0055}px "IBM Plex Mono",monospace`;ctx.textAlign='center';
      ctx.fillText('UrbanX · ThinkSmart Solutions SRL · © 2026 · Date orientative',W*0.50,H*0.970);
      break;
    }

    } // end switch

    prog();
    // Film grain minimal
    ctx.save();al(0.010);
    for(let i=0;i<60;i++){ctx.fillStyle=Math.random()>.5?'#fff':'#000';ctx.fillRect(Math.random()*W,Math.random()*H,1,1);}
    ctx.restore();al(1);
  },

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
  console.log('[TCI Cinematic v8.0] ✅ Imersiv — harta e actorul');
  const patch=(n)=>{
    if(typeof TCI!=='undefined'&&typeof window.openTCI==='function'){
      const orig=window.openTCI;
      window.openTCI=function(opts){
        if(opts?.mode==='cinema_v2'||opts?.scenes||window._preferCinemaV2){
          G._SceneEngine.launch(opts?.cityKey||G._SceneEngine._getCityKey());
        }else{orig?.(opts);}
      };
      window._switchToCinemaV2=()=>{window._preferCinemaV2=true;ss('🎬 Cinema v8 activ');};
      window._switchToTCIClassic=()=>{window._preferCinemaV2=false;ss('📊 Clasic activ');};
    }else if(n<40)setTimeout(()=>patch(n+1),500);
  };
  patch(0);
  ss('🎬 TCI v8.0 — imersiv · harta vie · orice UAT · INSE live');
})();

})(window);
