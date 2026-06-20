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

// ── CARTIERE REALE per UAT (centre aproximative) — ca sa NUMIM clusterele (imbatranire, parcuri) ──
const _NBHD={
  'RO-IS-01':[{n:'Centru',lat:47.1585,lon:27.5875},{n:'Copou',lat:47.1900,lon:27.5750},{n:'Tătărași',lat:47.1720,lon:27.6050},{n:'Păcurari',lat:47.1660,lon:27.5560},{n:'Nicolina',lat:47.1450,lon:27.5790},{n:'Alexandru cel Bun',lat:47.1480,lon:27.5680},{n:'Dacia',lat:47.1530,lon:27.5980},{n:'Galata',lat:47.1380,lon:27.5650},{n:'Bucium',lat:47.1300,lon:27.6000},{n:'CUG',lat:47.1380,lon:27.6180},{n:'Tudor Vladimirescu',lat:47.1600,lon:27.6150},{n:'Canta',lat:47.1650,lon:27.5660},{n:'Sărărie',lat:47.1730,lon:27.5900},{n:'Podu Roș',lat:47.1500,lon:27.5950},{n:'Frumoasa',lat:47.1420,lon:27.5880},{n:'Bularga',lat:47.1560,lon:27.6230},{n:'Moara de Vânt',lat:47.1870,lon:27.5980},{n:'Aurel Vlaicu',lat:47.1620,lon:27.6210},{n:'Ciric',lat:47.1820,lon:27.6120},{n:'Mircea cel Bătrân',lat:47.1410,lon:27.6080},{n:'Zona Industrială',lat:47.1480,lon:27.6300},{n:'Gară',lat:47.1700,lon:27.5760}],
  'RO-SV-01':[{n:'Centru',lat:47.6510,lon:26.2550},{n:'Burdujeni',lat:47.6720,lon:26.2750},{n:'Ițcani',lat:47.6650,lon:26.2480},{n:'George Enescu',lat:47.6420,lon:26.2480},{n:'Obcini',lat:47.6480,lon:26.2300},{n:'Areni',lat:47.6470,lon:26.2580},{n:'Zamca',lat:47.6560,lon:26.2400},{n:'Cuza Vodă',lat:47.6440,lon:26.2620}],
  'RO-GL-01':[{n:'Centru',lat:45.4350,lon:28.0480},{n:'Mazepa',lat:45.4470,lon:28.0420},{n:'Țiglina I',lat:45.4280,lon:28.0350},{n:'Țiglina II',lat:45.4200,lon:28.0300},{n:'Micro 19',lat:45.4150,lon:28.0500},{n:'Dunărea',lat:45.4250,lon:28.0600},{n:'Siderurgiștilor',lat:45.4380,lon:28.0250},{n:'Aurel Vlaicu',lat:45.4320,lon:28.0560},{n:'Port',lat:45.4180,lon:28.0450}],
  'RO-BT-01':[{n:'Centru',lat:47.7480,lon:26.6650},{n:'Primăverii',lat:47.7400,lon:26.6550},{n:'Bucovina',lat:47.7550,lon:26.6720},{n:'Grivița',lat:47.7420,lon:26.6800},{n:'Parcul Tineretului',lat:47.7510,lon:26.6580},{n:'Săvenilor',lat:47.7560,lon:26.6500}],
  'RO-VS-01':[{n:'Centru',lat:46.6400,lon:27.7300},{n:'1 Decembrie',lat:46.6450,lon:27.7250},{n:'Gara',lat:46.6350,lon:27.7400},{n:'Traian',lat:46.6480,lon:27.7350},{n:'Bahlui',lat:46.6320,lon:27.7250}],
  'RO-NT-01':[{n:'Centru',lat:46.9280,lon:26.3700},{n:'Dărmănești',lat:46.9350,lon:26.3550},{n:'Mărăței',lat:46.9180,lon:26.3850},{n:'Precista',lat:46.9230,lon:26.3650},{n:'Vânători',lat:46.9120,lon:26.3680},{n:'Speranța',lat:46.9320,lon:26.3780}],
  'RO-CJ-01':[{n:'Centru',lat:46.7700,lon:23.5900},{n:'Mănăștur',lat:46.7560,lon:23.5560},{n:'Mărăști',lat:46.7780,lon:23.6080},{n:'Gheorgheni',lat:46.7640,lon:23.6160},{n:'Grigorescu',lat:46.7700,lon:23.5560},{n:'Zorilor',lat:46.7560,lon:23.5900},{n:'Andrei Mureșanu',lat:46.7600,lon:23.6020},{n:'Bună Ziua',lat:46.7470,lon:23.6160},{n:'Iris',lat:46.7920,lon:23.6080},{n:'Someșeni',lat:46.7850,lon:23.6450},{n:'Gruia',lat:46.7760,lon:23.5680},{n:'Dâmbul Rotund',lat:46.7880,lon:23.5900}],
  'RO-TM-01':[{n:'Cetate (Centru)',lat:45.7560,lon:21.2270},{n:'Iosefin',lat:45.7470,lon:21.2130},{n:'Fabric',lat:45.7600,lon:21.2480},{n:'Elisabetin',lat:45.7440,lon:21.2280},{n:'Mehala',lat:45.7650,lon:21.2100},{n:'Circumvalațiunii',lat:45.7640,lon:21.2330},{n:'Soarelui',lat:45.7350,lon:21.2350},{n:'Dâmbovița',lat:45.7380,lon:21.2150},{n:'Girocului',lat:45.7280,lon:21.2430},{n:'Aradului',lat:45.7720,lon:21.2330},{n:'Lipovei',lat:45.7720,lon:21.2480},{n:'Freidorf',lat:45.7280,lon:21.1900}],
  'RO-BV-01':[{n:'Centrul Istoric',lat:45.6420,lon:25.5890},{n:'Bartolomeu',lat:45.6680,lon:25.5800},{n:'Tractorul',lat:45.6620,lon:25.6050},{n:'Astra',lat:45.6300,lon:25.6120},{n:'Răcădău',lat:45.6230,lon:25.5950},{n:'Noua',lat:45.6120,lon:25.6300},{n:'Schei',lat:45.6330,lon:25.5780},{n:'Florilor',lat:45.6520,lon:25.6080},{n:'Valea Cetății',lat:45.6450,lon:25.6020},{n:'Stupini',lat:45.6900,lon:25.6050}],
  'RO-CT-01':[{n:'Centru / Peninsulă',lat:44.1730,lon:28.6580},{n:'Tomis Nord',lat:44.1950,lon:28.6380},{n:'Faleză Nord',lat:44.1880,lon:28.6500},{n:'Km 4-5',lat:44.1700,lon:28.6300},{n:'Coiciu',lat:44.1850,lon:28.6200},{n:'Anadalchioi',lat:44.2000,lon:28.6150},{n:'Inel I',lat:44.1780,lon:28.6250},{n:'Inel II',lat:44.1830,lon:28.6100},{n:'Mamaia',lat:44.2550,lon:28.6180}],
  'RO-DJ-01':[{n:'Centru',lat:44.3170,lon:23.7960},{n:'Brazda lui Novac',lat:44.3380,lon:23.7980},{n:'Rovine',lat:44.3300,lon:23.8200},{n:'Craiovița Nouă',lat:44.3180,lon:23.7600},{n:'Valea Roșie',lat:44.3260,lon:23.7780},{n:'1 Mai',lat:44.3420,lon:23.8050},{n:'Calea București',lat:44.3120,lon:23.8250}],
  'RO-B-01':[{n:'Centru',lat:44.4350,lon:26.1020},{n:'Drumul Taberei',lat:44.4180,lon:26.0350},{n:'Berceni',lat:44.3850,lon:26.1180},{n:'Titan',lat:44.4180,lon:26.1500},{n:'Pantelimon',lat:44.4420,lon:26.1480},{n:'Rahova',lat:44.4050,lon:26.0700},{n:'Militari',lat:44.4350,lon:26.0250},{n:'Băneasa',lat:44.5050,lon:26.0850},{n:'Aviației',lat:44.4800,lon:26.0950},{n:'Floreasca',lat:44.4700,lon:26.1050},{n:'Colentina',lat:44.4650,lon:26.1350},{n:'Crângași',lat:44.4530,lon:26.0500},{n:'Dristor',lat:44.4180,lon:26.1300},{n:'Giulești',lat:44.4500,lon:26.0350},{n:'Tei',lat:44.4600,lon:26.1150}]
};
function _nbhdName(cityKey, lon, lat){
  var list=_NBHD[cityKey]; if(!list||!list.length) return null;
  var best=null, bd=1e9;
  for(var i=0;i<list.length;i++){ var d=Math.hypot(list[i].lon-lon, list[i].lat-lat); if(d<bd){bd=d; best=list[i];} }
  return best? best.n : null;
}

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
G._CinemaEngine={
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
    // 1. Ascunde UI primul
    this._hideUI();
    // 2. Curata canvas vechi
    ['tci-c8','tci-c6','tci-c7'].forEach(id=>document.getElementById(id)?.remove());
    // 3. Creeaza canvas
    this._canvas=this._mkCanvas();
    this._ctx=this._canvas.getContext('2d');
    console.log('[v8] Canvas:', !!this._canvas, !!this._ctx);
    // 4. Protejeaza canvas cu MutationObserver
    this._guardCanvas();
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
    ['tci-c8','tci-c6','tci-c7'].forEach(id=>document.getElementById(id)?.remove());
    const c=document.createElement('canvas');
    c.id='tci-c8';
    const dpr=window.devicePixelRatio||1;
    const W=window.innerWidth,H=window.innerHeight;
    c.width=Math.round(W*dpr);
    c.height=Math.round(H*dpr);
    c.style.cssText=`position:fixed;top:0;left:0;width:${W}px;height:${H}px;z-index:99999;pointer-events:none;`;
    const ctx2=c.getContext('2d');
    if(ctx2)ctx2.scale(dpr,dpr);
    // Ataseaza la documentElement (html) nu body — evita stergerea de catre alte module
    document.documentElement.appendChild(c);
    console.log('[v8] Canvas creat:',c.width,'x',c.height,'z:99999 parent:html');
    return c;
  },

  _mkCtrl(){
    document.getElementById('tci-c8-ctrl')?.remove();
    const d=document.createElement('div');d.id='tci-c8-ctrl';
    d.style.cssText='position:fixed;bottom:28px;right:20px;z-index:96000;display:flex;gap:8px;';
    d.innerHTML=`
      <button id="c8-share" title="Copiază link de share — deschide direct filmul cinematic" style="background:rgba(59,130,246,.18);border:1px solid rgba(59,130,246,.4);color:#93c5fd;padding:10px 14px;border-radius:10px;cursor:pointer;font:600 12px/1 monospace;backdrop-filter:blur(8px)">🔗 Share</button>
      <button id="c8-prev" style="background:rgba(0,0,0,.55);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.6);padding:10px 16px;border-radius:10px;cursor:pointer;font:600 12px/1 monospace;backdrop-filter:blur(8px)">◀</button>
      <button id="c8-skip" style="background:rgba(0,0,0,.55);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.6);padding:10px 18px;border-radius:10px;cursor:pointer;font:600 12px/1 monospace;backdrop-filter:blur(8px)">▶</button>
      <button id="c8-stop" style="background:rgba(180,0,0,.45);border:1px solid rgba(255,80,80,.3);color:#ff9999;padding:10px 14px;border-radius:10px;cursor:pointer;font:600 12px/1 monospace;backdrop-filter:blur(8px)">✕</button>`;
    document.body.appendChild(d);
    document.getElementById('c8-prev').onclick=()=>{if(this._si>0){this._cleanLayers();if(this._raf)cancelAnimationFrame(this._raf);this._runScene(this._si-1);}};
    document.getElementById('c8-skip').onclick=()=>{if(this._si<this.SCENES.length-1){this._cleanLayers();if(this._raf)cancelAnimationFrame(this._raf);this._runScene(this._si+1);}};
    document.getElementById('c8-stop').onclick=()=>this.stop();
    var _sh=document.getElementById('c8-share');
    if(_sh) _sh.onclick=()=>{ try{ if(window._ShareManager&&window._ShareManager.generateCinema){ window._ShareManager.generateCinema(); } else { window.ss&&window.ss('Share indisponibil'); } }catch(e){} };
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
    const self=window._CinemaEngine; // referinta directa, nu this
    if(!self._playing||idx>=self.SCENES.length){self._finish();return;}
    const scene=self.SCENES[idx];
    self._si=idx;self._startT=performance.now();
    self._setupMap(scene.id);
    const loop=()=>{
      if(!self._playing)return;
      const t=Math.min(1,Math.max(0.001,(performance.now()-self._startT)/scene.dur));
      if(self._ctx&&self._canvas){
        self._ctx.clearRect(0,0,self._canvas.width,self._canvas.height);
        try{self._draw(scene.id,t);}catch(e){console.warn('[v8]',scene.id,e.message);}
      }
      if(t<1){self._raf=requestAnimationFrame(loop);}
      else{self._cleanLayers();self._runScene(idx+1);}
    };
    self._raf=requestAnimationFrame(loop);
  },

  stop(){
    this._playing=false;
    if(this._raf)cancelAnimationFrame(this._raf);
    if(this._rotInt){clearInterval(this._rotInt);this._rotInt=null;}
    if(this._canvasObserver){this._canvasObserver.disconnect();this._canvasObserver=null;}
    document.getElementById('tci-c8')?.remove();
    document.getElementById('tci-c8-ctrl')?.remove();
    this._cleanLayers();this._restoreUI();
    try{window.map?.flyTo({zoom:13,pitch:0,bearing:0,duration:1500,essential:true});}catch(e){}
  },

  _finish(){
    const self=window._CinemaEngine;
    self._playing=false;
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
    // EXISTENT vs PROPUS, cinematic:
    //  • cladirile REALE (composite OSM) raman ca fond GRI static = "ce este azi" (contextul).
    //  • peste ele, bare colorate pe zonele PUG se inalta IN UNDA (V->E), UNA CATE UNA, colorate pe
    //    potentialul de crestere = "ce se construieste". Animatia o face _updateGrowth(t) la fiecare frame.
    // (Inainte calea composite crestea uniform si instant + seta _gf=null -> unda nu rula niciodata.)
    if(map.getSource && map.getSource('composite')){
      try{
        var hExpr=['coalesce',['to-number',['get','height']],['*',['coalesce',['to-number',['get','levels']],3],3],8];
        if(!(map.getLayer && map.getLayer('cin-grow-base'))){
          map.addLayer({
            id:'cin-grow-base',type:'fill-extrusion',source:'composite','source-layer':'building',
            filter:['==','extrude','true'],minzoom:11,
            paint:{
              // GRI rece, gradat pe inaltime = fondul construit existent (neutru, nu concureaza barele color)
              'fill-extrusion-color':['interpolate',['linear'],hExpr,0,'#39434f',12,'#49566a',30,'#5d6e88'],
              'fill-extrusion-height':hExpr,
              'fill-extrusion-base':['coalesce',['to-number',['get','min_height']],0],
              'fill-extrusion-opacity':0.80,
              'fill-extrusion-vertical-gradient':true,
              'fill-extrusion-ambient-occlusion-intensity':0.5
            }
          });
        }
        // cladirile default + lespezile vechi ascunse (cin-grow-base le inlocuieste ca fond)
        ['v8-bld-l','utr-fill','utr-line','building-extrusion'].forEach(function(id){ try{ if(map.getLayer(id)) map.setLayoutProperty(id,'visibility','none'); }catch(e){} });
      }catch(e){ /* fara composite -> doar barele de zona */ }
    }
    const geo=this._pugGeo,reg=this._reguli||{},pred=this._pred;
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5;
    let features=[];
    // Pentru efectul "ghost -> living city": unda de crestere traverseaza orasul
    // V->E. Calculam longitudinea min/max ca sa dam fiecarei cladiri o faza (0..1).
    let _mnLon=cx-0.08,_mxLon=cx+0.08;
    try{ if(geo&&geo.features&&typeof turf!=='undefined'){ const bb=turf.bbox(geo); _mnLon=bb[0]; _mxLon=bb[2]; } }catch(e){}
    const _spanLon=Math.max(1e-6,_mxLon-_mnLon);
    const _flon=(g)=>{ try{ let c=g.coordinates; while(Array.isArray(c[0])) c=c[0]; return c[0]; }catch(e){ return cx; } };
    if(geo?.features?.length>0){
      // BARE VERTICALE (coloane), NU lespezi de zona: in fiecare zona PUG asezam un mini-grid de
      // bare patrate; inaltimea ∝ potential de dezvoltare, culoarea verde->rosu. Asa apar "barele
      // de crestere" ca in storyboard (padure de coloane), nu poligoane colorate plate.
      const coslat=Math.cos(cy*Math.PI/180)||0.7;
      const STEP=0.0017;       // pas grid ~130m
      // FUNCTIUNE -> forma+culoare distincte (nu toate la fel): central=lat&foarte inalt rosu,
      // comercial/mixt=portocaliu, colectiv=albastru subtire-inalt, individual=verde-albastrui SUBTIRE scund,
      // industrial=gri LAT scund, verde=verde plat. Asa se "citeste" functiunea din silueta.
      function _fnOf(u){
        if(u.startsWith('CC')||u.startsWith('CP')) return {w:0.00072,hm:1.7,c:'#ff3366'};
        if(u.startsWith('CM')||u.startsWith('CB')||u.startsWith('CA')) return {w:0.00058,hm:1.35,c:'#ff8c00'};
        if(u.startsWith('LC')||u.startsWith('LB')) return {w:0.00040,hm:1.15,c:'#4a90d9'};
        if(u.startsWith('LA')||u.startsWith('LL')) return {w:0.00028,hm:0.70,c:'#67c2a3'};
        if(u.startsWith('A')||u.startsWith('I')) return {w:0.00088,hm:0.45,c:'#9ca3af'};
        if(u.startsWith('V')||u.startsWith('S')) return {w:0.00090,hm:0.18,c:'#22c55e'};
        return {w:0.00044,hm:0.9,c:'#60a5fa'};
      }
      let _bi=0;
      geo.features.slice(0,800).forEach(f=>{
        const p=f.properties||{};
        const u=String(p.zf||p.utr||p.utr_cod||p.cod_utr||'').trim().toUpperCase();
        const rv=(reg.subzone&&reg.subzone[u])||reg[u]||{};
        const hmax=parseFloat(rv.hmax_m||rv.hmax||0)||0;
        const cut=parseFloat(rv.cut_baza||rv.CUT||rv.cut||0)||0;
        const hub=(pred&&pred.hub)||0.7;
        const fn=_fnOf(u);
        const pr=u.startsWith('CC')||u.startsWith('CP')?0.95:u.startsWith('CM')||u.startsWith('CB')||u.startsWith('CA')?0.75:u.startsWith('LC')||u.startsWith('LB')?0.58:u.startsWith('LA')||u.startsWith('LL')?0.42:u.startsWith('A')?0.62:(u.startsWith('V')||u.startsWith('S'))?0.12:0.30;
        const base=hmax>0?hmax:(cut>0?cut*9:pr*40);
        const hBaseFinal=Math.max(8,base*(2.6+hub*1.0)*fn.hm); // inaltime pe FUNCTIUNE + regulament
        const c=fn.c;
        // bbox + centroid zonei
        let cc=f.geometry&&f.geometry.coordinates; while(Array.isArray(cc)&&Array.isArray(cc[0])&&Array.isArray(cc[0][0])) cc=cc[0];
        if(!Array.isArray(cc)||cc.length<3) return;
        let mnx=1e9,mny=1e9,mxx=-1e9,mxy=-1e9,sx=0,sy=0,nn=0;
        cc.forEach(pt=>{ if(pt&&typeof pt[0]==='number'){ if(pt[0]<mnx)mnx=pt[0]; if(pt[0]>mxx)mxx=pt[0]; if(pt[1]<mny)mny=pt[1]; if(pt[1]>mxy)mxy=pt[1]; sx+=pt[0]; sy+=pt[1]; nn++; } });
        if(!nn) return;
        const ctrx=sx/nn, ctry=sy/nn;
        const w=(mxx-mnx)*0.62, h=(mxy-mny)*0.62;
        const nx=Math.max(1,Math.min(5,Math.round(w/STEP))), ny=Math.max(1,Math.min(5,Math.round(h/STEP)));
        for(let ix=0;ix<nx;ix++) for(let iy=0;iy<ny;iy++){
          // jitter pseudo-aleator (determinist) ca sa nu fie grid perfect + variatie de inaltime per bara
          _bi++; const j1=((_bi*131)%100)/100-0.5, j2=((_bi*197)%100)/100-0.5, jh=0.7+(((_bi*73)%100)/100)*0.6;
          const bx=ctrx+(nx>1?(ix/(nx-1)-0.5)*w:0)+j1*STEP*0.4, by=ctry+(ny>1?(iy/(ny-1)-0.5)*h:0)+j2*STEP*0.4;
          const BSx=fn.w/coslat, BSy=fn.w;
          const hFinal=hBaseFinal*jh;                              // inaltimi diferite, nu uniforme
          const hExist=pr>0.20?hFinal*(0.28+pr*0.18):hFinal*0.10;
          const wphase=Math.max(0,Math.min(1,(bx-_mnLon)/_spanLon));
          const sq=[[bx-BSx,by-BSy],[bx+BSx,by-BSy],[bx+BSx,by+BSy],[bx-BSx,by+BSy],[bx-BSx,by-BSy]];
          features.push({type:'Feature',geometry:{type:'Polygon',coordinates:[sq]},properties:{hFinal,hExist,h:0.5,c,pr,wphase}});
        }
      });
      // plafon perf (bare totale)
      if(features.length>1400){ const stp=Math.ceil(features.length/1400); features=features.filter((_,i)=>i%stp===0); }
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
    // NUMESTE zonele de crestere pe CARTIER (unde se densifica cel mai mult) — detaliu ancorat
    try{
      const _ck3=this._cityKey||(window.TCI&&window.TCI.cityKey)||'RO-IS-01';
      if(_NBHD[_ck3] && this._cinLabels){
        const fs2=features.slice().sort((a,b)=>(b.properties.pr||0)-(a.properties.pr||0));
        const dcl=[];
        for(let di=0; di<fs2.length && dcl.length<3; di++){
          if((fs2[di].properties.pr||0)<0.6) break;
          let gg=fs2[di].geometry.coordinates; while(Array.isArray(gg)&&Array.isArray(gg[0])) gg=gg[0];
          if(!gg||gg.length<2) continue;
          const nm=_nbhdName(_ck3,gg[0],gg[1]);
          if(dcl.every(c=>Math.hypot(c.lon-gg[0],c.lat-gg[1])>0.014) && (!nm||dcl.every(c=>c.n!==nm))) dcl.push({lon:gg[0],lat:gg[1],n:nm});
        }
        if(dcl.length) this._cinLabels(map, dcl.map((c,i)=>({lon:c.lon,lat:c.lat,color:'#ff8c00',icon:'🏗',
          title:(c.n?c.n.toUpperCase():'POL CREȘTERE'),sub:(i===0?'densificare maximă · ':'densificare · ')+'potențial ridicat'})));
      }
    }catch(e){}
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

  // Update animat bare 3D cu t — UNDA "ghost -> living city": frontul de crestere
  // traverseaza orasul V->E; fiecare cladire creste cand unda ii atinge faza.
  _updateGrowth(t){
    const map=this._map;if(!map||!this._gf)return;
    try{
      const src=map.getSource('v8-gr');if(!src)return;
      src.setData({type:'FeatureCollection',features:this._gf.map(f=>{
        const ph=f.properties.wphase||0;
        const lt=Math.max(0,Math.min(1,(t-ph*0.45)/0.55)); // fereastra de crestere locala
        const te=eo(lt);
        const h=Math.max(0.5,(f.properties.hFinal||20)*te);
        // #5: cat timp inaltimea <= fondul EXISTENT -> gri (ce era); peste -> color (ce creste)
        const hx=f.properties.hExist||0;
        const c=(h<=hx*1.05)?'#64748b':f.properties.c;
        return {...f,properties:{...f.properties,h,c}};
      })});
    }catch(e){}
  },

  // FOND ORAS = cladirile REALE ale stilului (NU lespezi de zonare PUG — acelea erau "mash-ul" gri
  // gratuit peste harta, pe care Florin il ura). Folosim building-extrusion (footprints reale) ca
  // textura discreta de oras; pe stiluri fara el, cladirile composite reale.
  _addBuildings(map){
    // sterge orice lespede veche
    try{ if(map.getLayer('v8-bld-l')) map.removeLayer('v8-bld-l'); if(map.getSource('v8-bld')) map.removeSource('v8-bld'); }catch(e){}
    var hExpr=['coalesce',['to-number',['get','height']],['*',['coalesce',['to-number',['get','levels']],3],3],10];
    var colExpr=['interpolate',['linear'],hExpr,0,'#2a3346',12,'#3a4660',28,'#4e5e7e',50,'#64769a'];
    try{
      if(map.getLayer('building-extrusion')){
        map.setLayoutProperty('building-extrusion','visibility','visible');
        map.setPaintProperty('building-extrusion','fill-extrusion-color',colExpr);
        map.setPaintProperty('building-extrusion','fill-extrusion-height',hExpr);
        map.setPaintProperty('building-extrusion','fill-extrusion-opacity',0.85);
        return;
      }
    }catch(e){}
    // fallback: cladiri composite reale (footprints OSM) daca stilul nu are building-extrusion
    try{
      if(map.getSource('composite') && !map.getLayer('cin-bld-real')){
        map.addLayer({id:'cin-bld-real',type:'fill-extrusion',source:'composite','source-layer':'building',
          filter:['==','extrude','true'],minzoom:11.5,
          paint:{'fill-extrusion-color':colExpr,'fill-extrusion-height':hExpr,
            'fill-extrusion-base':['coalesce',['to-number',['get','min_height']],0],
            'fill-extrusion-opacity':0.85,'fill-extrusion-vertical-gradient':true}});
      }
    }catch(e){}
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

  // Trafic pulsand — RETEAUA RUTIERA REALA (OSM) cand exista, altfel schematic.
  // Apare pe rand (din centru spre exterior) si pulseaza, ca reteaua feroviara.
  _addTrafficPulse(map, roads){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5;
    let artere=[];
    if(roads && roads.length){
      roads.slice(0,300).forEach(rd=>{
        const co=rd&&rd.geometry&&rd.geometry.coordinates; if(!co||co.length<2) return;
        const cls=String((rd.properties&&(rd.properties.t||rd.properties.highway))||'');
        const major=(cls.indexOf('motorway')>=0||cls.indexOf('trunk')>=0);
        const c=major?'#dc2626':cls.indexOf('primary')>=0?'#ea580c':cls.indexOf('secondary')>=0?'#f59e0b':'#16a34a';
        const w=major?6:cls.indexOf('primary')>=0?4:cls.indexOf('secondary')>=0?3:2;
        // distanta primului varf fata de centru (pt aparitie din centru spre exterior)
        const d=Math.hypot((co[0][0]-cx),(co[0][1]-cy));
        artere.push({type:'Feature',geometry:{type:'LineString',coordinates:co},properties:{c,w,major,d}});
      });
      artere.sort((a,b)=>a.properties.d-b.properties.d); // din centru spre periferie
    }
    if(!artere.length){
      // Fallback schematic DOAR cand OSM e jos (de evitat pozitii fixe altfel)
      [0,45,90,135,180,225,270,315].forEach((deg,i)=>{const rad=deg*Math.PI/180,r=0.055;artere.push({type:'Feature',geometry:{type:'LineString',coordinates:[[cx,cy],[cx+Math.cos(rad)*r*1.6,cy+Math.sin(rad)*r]]},properties:{c:i<3?'#ef4444':i<5?'#f59e0b':'#22c55e',w:i<3?7:i<5?5:3,major:i<3,d:i}});});
      const n=80,r=0.06,ring=[];for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;ring.push([cx+Math.cos(a)*r*1.7,cy+Math.sin(a)*r]);}artere.push({type:'Feature',geometry:{type:'LineString',coordinates:ring},properties:{c:'#a855f7',w:6,major:true,d:99}});
    }
    artere.forEach((f,i)=>{f.properties.idx=i;});
    this._gfTr=artere; this._trN=artere.length;
    this._safeAdd(map,'v8-tr',{type:'geojson',data:{type:'FeatureCollection',features:artere}},{
      id:'v8-tr-l',type:'line',source:'v8-tr',
      paint:{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':['coalesce',['get','_op'],0.06],'line-blur':0.5},
      layout:{'line-cap':'round','line-join':'round'}
    });
    // #6: PARTICULE (vehicule) care curg pe arterele majore — trafic realist.
    // Pe arterele aglomerate (rosu/portocaliu) sunt MULTE si LENTE (ambuteiaj);
    // pe cele libere (verde) putine si rapide.
    const parts=[];
    artere.forEach((f,fi)=>{
      const co=f.geometry.coordinates; if(!co||co.length<2) return;
      const major=f.properties.major, prim=f.properties.c==='#ea580c';
      const dense = major?7:prim?5:2;                 // densitate vehicule
      const spd = major?0.45:prim?0.7:1.1;            // viteza (aglomerat=lent)
      for(let k=0;k<dense;k++) parts.push({fi:fi, base:k/dense, spd:spd, c:f.properties.c});
    });
    this._trParts=parts;
    this._safeAdd(map,'v8-trp',{type:'geojson',data:{type:'FeatureCollection',features:[]}},{
      id:'v8-trp-l',type:'circle',source:'v8-trp',
      paint:{'circle-radius':['interpolate',['linear'],['zoom'],10,1.6,14,3.6],'circle-color':['get','c'],'circle-opacity':0.95,'circle-stroke-width':0.4,'circle-stroke-color':'#fff7e6'}
    });
  },

  // interpoleaza un punct la fractiunea p (0..1) de-a lungul unei polilinii
  _ptAlong(coords, p){
    if(!coords||coords.length<2) return coords&&coords[0];
    let total=0; const seg=[];
    for(let i=1;i<coords.length;i++){ const d=Math.hypot(coords[i][0]-coords[i-1][0],coords[i][1]-coords[i-1][1]); seg.push(d); total+=d; }
    if(total<=0) return coords[0];
    let target=p*total, acc=0;
    for(let i=0;i<seg.length;i++){ if(acc+seg[i]>=target){ const f=(target-acc)/(seg[i]||1); return [coords[i][0]+(coords[i+1][0]-coords[i][0])*f, coords[i][1]+(coords[i+1][1]-coords[i][1])*f]; } acc+=seg[i]; }
    return coords[coords.length-1];
  },

  // Update puls trafic — reteaua apare PE RAND (front din centru) + pulseaza arterele majore
  _updateTraffic(t){
    const map=this._map;if(!map||!this._gfTr)return;
    try{
      const src=map.getSource('v8-tr');if(!src)return;
      const N=this._gfTr.length||1; const front=t*N*1.25; // frontul de aparitie
      const pulse=0.55+0.45*Math.sin(t*Math.PI*8);
      src.setData({type:'FeatureCollection',features:this._gfTr.map((f,i)=>{
        const appeared=i<front;
        const op=!appeared?0.05:(f.properties.major?(0.5+pulse*0.45):0.5);
        return{...f,properties:{...f.properties,_op:op,w:f.properties.major&&appeared?f.properties.w*(0.85+pulse*0.4):f.properties.w}};
      })});
      // #6: misca particulele (vehicule) de-a lungul arterelor aparute
      const psrc=map.getSource('v8-trp');
      if(psrc && this._trParts){
        const N=this._gfTr.length||1; const front2=t*N*1.25;
        const feats=[];
        this._trParts.forEach(pt=>{
          if(pt.fi>=front2) return; // doar pe arterele deja aparute
          const co=this._gfTr[pt.fi] && this._gfTr[pt.fi].geometry.coordinates;
          let p=(pt.base + t*pt.spd*3.0)%1;
          const c=this._ptAlong(co,p);
          if(c&&c.length>=2) feats.push({type:'Feature',geometry:{type:'Point',coordinates:c},properties:{c:pt.c}});
        });
        psrc.setData({type:'FeatureCollection',features:feats});
      }
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
  // ── ETICHETE MARI pe harta (HTML markers) — citibile cand se proiecteaza intr-o
  // sala de sedinte. Nu depind de glyph-fonts Mapbox; redau emoji + text stilizat.
  _cinLabels(map, items){
    if(!map) return;
    this._cinMarkers = this._cinMarkers || [];
    this._cinMarkers.forEach(m=>{try{m.remove();}catch(e){}});
    this._cinMarkers = [];
    if(typeof mapboxgl==='undefined' || !mapboxgl.Marker) return;
    items.forEach(it=>{
      const el=document.createElement('div');
      el.style.cssText='display:flex;align-items:center;gap:8px;background:rgba(2,6,18,0.92);border:2px solid '+it.color+';border-radius:12px;padding:7px 13px;font-family:"Space Grotesk",system-ui,sans-serif;font-weight:800;font-size:15px;color:#fff;white-space:nowrap;box-shadow:0 6px 22px rgba(0,0,0,0.55);pointer-events:none;backdrop-filter:blur(4px);';
      el.innerHTML='<span style="font-size:19px;line-height:1">'+(it.icon||'')+'</span>'
        +'<span style="line-height:1.15">'+it.title
        +(it.sub?'<span style="display:block;font-size:10px;font-weight:600;color:'+it.color+';letter-spacing:.02em">'+it.sub+'</span>':'')
        +'</span>';
      try{
        const m=new mapboxgl.Marker({element:el, anchor:'bottom'}).setLngLat([it.lon,it.lat]).addTo(map);
        this._cinMarkers.push(m);
      }catch(e){}
    });
  },
  _clearCinLabels(){
    if(this._cinMarkers){ this._cinMarkers.forEach(m=>{try{m.remove();}catch(e){}}); this._cinMarkers=[]; }
  },

  // INELE de extindere intravilan — benzi PLINE, colorate, cu etichete MARI per an
  _addExpansionRings(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5;
    const rings=[
      {rm:0.62,col:'#94a3b8',yr:2011,label:'INTRAVILAN 2011'},
      {rm:0.88,col:'#60a5fa',yr:2021,label:'EXTINDERE 2021'},
      {rm:1.12,col:'#f59e0b',yr:2035,label:'PROIECTAT 2035'},
      {rm:1.40,col:'#ef4444',yr:2055,label:'SCENARIU 2055'},
    ];
    const ringPoly=(r)=>{const n=96,coords=[];for(let i=0;i<=n;i++){const a=(i/n)*Math.PI*2;coords.push([cx+Math.cos(a)*r*1.65,cy+Math.sin(a)*r]);}return coords;};
    const feats=[];
    for(let k=rings.length-1;k>=0;k--){
      const outer=ringPoly(0.075*rings[k].rm);
      const inner=k>0?ringPoly(0.075*rings[k-1].rm):null;
      const coords=inner?[outer,inner.slice().reverse()]:[outer];
      feats.push({type:'Feature',geometry:{type:'Polygon',coordinates:coords},properties:{c:rings[k].col}});
    }
    this._safeAdd(map,'v8-ex',{type:'geojson',data:{type:'FeatureCollection',features:feats}},{
      id:'v8-ex-l',type:'fill',source:'v8-ex',
      paint:{'fill-color':['get','c'],'fill-opacity':0.28}
    });
    if(!map.getLayer('v8-ex-line')){
      try{map.addLayer({id:'v8-ex-line',type:'line',source:'v8-ex',paint:{'line-color':['get','c'],'line-width':3,'line-opacity':0.92}});}catch(e){}
    }
    // Etichete mari pe marginea de nord a fiecarui inel
    this._cinLabels(map, rings.map(r=>({lon:cx, lat:cy+0.075*r.rm*1.03, color:r.col, icon:'', title:r.label, sub:''})));
  },

  // PROIECTE concrete pe harta — desenate explicit cu etichete mari (nu buline anonime)
  _addInfraPoints(map){
    const cx=this._city?.lon||25,cy=this._city?.lat||45.5;
    const items=[
      {dx:0.016, dy:0.022, color:'#22c55e', icon:'🌳', title:'PARC URBAN NOU',           sub:'spatiu verde public'},
      {dx:-0.032,dy:-0.013,color:'#9ca3af', icon:'🏭', title:'RECONVERSIE INDUSTRIALA',  sub:'brownfield → mixt'},
      {dx:0.036, dy:-0.007,color:'#ef4444', icon:'🏥', title:'SPITAL / SANATATE',        sub:'serviciu public'},
      {dx:-0.015,dy:0.015, color:'#a855f7', icon:'🚌', title:'CORIDOR BRT',              sub:'transport rapid'},
      {dx:0.022, dy:0.032, color:'#f59e0b', icon:'⬆',  title:'PASAJ SUPRATERAN',         sub:'nod critic CFR/artera'},
      {dx:-0.038,dy:0.005, color:'#60a5fa', icon:'🚆', title:'HUB INTERMODAL',           sub:'gara + transport public'},
    ];
    // Coridoare de dezvoltare — linii groase de la centru spre periferie
    const corr=[{a:30,c:'#a855f7'},{a:115,c:'#f59e0b'},{a:205,c:'#22c55e'},{a:300,c:'#60a5fa'}];
    const cf=corr.map(co=>{const rad=co.a*Math.PI/180;return{type:'Feature',geometry:{type:'LineString',coordinates:[[cx,cy],[cx+Math.cos(rad)*0.052*1.65,cy+Math.sin(rad)*0.052]]},properties:{c:co.c}};});
    this._safeAdd(map,'v8-inf',{type:'geojson',data:{type:'FeatureCollection',features:cf}},{
      id:'v8-inf-l',type:'line',source:'v8-inf',
      paint:{'line-color':['get','c'],'line-width':6,'line-opacity':0.45,'line-blur':1.5},layout:{'line-cap':'round'}
    });
    // Etichetele proiectelor — mari, citibile
    this._cinLabels(map, items.map(p=>({lon:cx+p.dx,lat:cy+p.dy,color:p.color,icon:p.icon,title:p.title,sub:p.sub})));
  },

  // ── MASTERPLAN PROIECTAT 30 ANI — urbanism DESENAT ca geometrie reala pe harta:
  // centura ocolitoare, retea tren metropolitan + statii, cartiere noi, parc,
  // reconversie industriala, pasaje denivelate. Dimensionat din extinderea reala UAT.
  _addMasterplanProjection(map, opts){
    if(!map) return;
    opts=opts||{};
    const phased = opts.phased!==false;     // implicit: etapizare animata (apar pe ani)
    const cx=this._city?.lon||25, cy=this._city?.lat||45.5;
    const pred=this._pred||{};
    const d2r=Math.PI/180;
    let R=0.05;
    try{
      if(this._pugGeo&&this._pugGeo.features&&typeof turf!=='undefined'){
        const bb=turf.bbox(this._pugGeo);
        R=Math.max(0.025, Math.min(0.13, Math.max(bb[2]-bb[0], bb[3]-bb[1])*0.5));
      }
    }catch(e){}
    const ls=1/Math.max(0.3,Math.cos(cy*Math.PI/180));
    const P=(ang,rad)=>[cx+Math.cos(ang)*rad*ls, cy+Math.sin(ang)*rad];
    const ringR=R*1.28;
    // Stare etapizare
    this._mpLayers=[]; this._mpMarkers=[]; this._mpRevealed={};
    if(this._clearCinLabels) this._clearCinLabels();
    const oi=(target)=>phased?0:target;                          // opacitate initiala
    const regL=(id,prop,target,ph)=>{ this._mpLayers.push({id:id,prop:prop,target:target,ph:ph}); };

    // 1. CENTURA OCOLITOARE (faza ~2030)
    const ring=[]; for(let i=0;i<=128;i++){ring.push(P((i/128)*Math.PI*2, ringR));}
    this._safeAdd(map,'v8-mp-ring',{type:'geojson',data:{type:'Feature',geometry:{type:'LineString',coordinates:ring},properties:{}}},{
      id:'v8-mp-ring-l',type:'line',source:'v8-mp-ring',
      paint:{'line-color':'#f59e0b','line-width':5,'line-opacity':oi(0.92),'line-dasharray':[2,1.2]},layout:{'line-cap':'round'}
    });
    regL('v8-mp-ring-l','line-opacity',0.92,0.10);

    // 2. RETEA TREN METROPOLITAN + statii (faza ~2034)
    const railDeg=[18,78,138], railFeats=[], stnFeats=[];
    railDeg.forEach(d=>{
      const a=d*d2r;
      railFeats.push({type:'Feature',geometry:{type:'LineString',coordinates:[P(a,ringR*0.98),[cx,cy],P(a+Math.PI,ringR*0.98)]},properties:{}});
      for(let s=1;s<=2;s++){ stnFeats.push({type:'Feature',geometry:{type:'Point',coordinates:P(a,ringR*0.98*s/2.2)},properties:{}}); stnFeats.push({type:'Feature',geometry:{type:'Point',coordinates:P(a+Math.PI,ringR*0.98*s/2.2)},properties:{}}); }
    });
    stnFeats.push({type:'Feature',geometry:{type:'Point',coordinates:[cx,cy]},properties:{}});
    this._safeAdd(map,'v8-mp-rail',{type:'geojson',data:{type:'FeatureCollection',features:railFeats}},{
      id:'v8-mp-rail-l',type:'line',source:'v8-mp-rail',
      paint:{'line-color':'#a855f7','line-width':3.5,'line-opacity':oi(0.92),'line-dasharray':[1,1]},layout:{'line-cap':'round'}
    });
    regL('v8-mp-rail-l','line-opacity',0.92,0.28);
    this._safeAdd(map,'v8-mp-stn',{type:'geojson',data:{type:'FeatureCollection',features:stnFeats}},{
      id:'v8-mp-stn-l',type:'circle',source:'v8-mp-stn',
      paint:{'circle-radius':5,'circle-color':'#ffffff','circle-stroke-width':3,'circle-stroke-color':'#a855f7','circle-opacity':oi(1),'circle-stroke-opacity':oi(1)}
    });
    regL('v8-mp-stn-l','circle-opacity',1,0.30); regL('v8-mp-stn-l','circle-stroke-opacity',1,0.30);

    // 3. ZONE proiectate: cartiere, parc, reconversie, pol economic (faze 2038-2046)
    const blob=(ang,rad,size)=>{const c=P(ang,rad),pts=[];for(let i=0;i<=28;i++){const a=(i/28)*Math.PI*2;const rr=size*(1+0.16*Math.sin(a*3+ang));pts.push([c[0]+Math.cos(a)*rr*ls,c[1]+Math.sin(a)*rr]);}return [pts];};
    const zones=[
      {ang:50*d2r,  rad:R*0.95, size:R*0.22, c:'#3b82f6', t:'CARTIER NOU NORD-EST',    sub:(Math.round((pred.locuinteTotale||4500)/3)||1500)+' locuinte', icon:'🏘', ph:0.44},
      {ang:200*d2r, rad:R*0.92, size:R*0.20, c:'#3b82f6', t:'CARTIER NOU SUD-VEST',    sub:'mixt rezidential',  icon:'🏘', ph:0.46},
      {ang:130*d2r, rad:R*0.70, size:R*0.18, c:'#22c55e', t:'PARC METROPOLITAN',       sub:'verde 3-30-300',    icon:'🌳', ph:0.56},
      {ang:330*d2r, rad:R*0.55, size:R*0.16, c:'#9ca3af', t:'RECONVERSIE INDUSTRIALA', sub:'brownfield → mixt', icon:'🏭', ph:0.66},
      {ang:285*d2r, rad:R*1.02, size:R*0.19, c:'#D4AF37', t:'POL ECONOMIC / LOGISTIC', sub:'langa centura',     icon:'🏢', ph:0.70},
    ];
    this._safeAdd(map,'v8-mp-zone',{type:'geojson',data:{type:'FeatureCollection',features:zones.map(z=>({type:'Feature',geometry:{type:'Polygon',coordinates:blob(z.ang,z.rad,z.size)},properties:{c:z.c}}))}},{
      id:'v8-mp-zone-l',type:'fill',source:'v8-mp-zone',
      paint:{'fill-color':['get','c'],'fill-opacity':oi(0.42)}
    });
    regL('v8-mp-zone-l','fill-opacity',0.42,0.44);
    if(!map.getLayer('v8-mp-zone-line')){try{map.addLayer({id:'v8-mp-zone-line',type:'line',source:'v8-mp-zone',paint:{'line-color':['get','c'],'line-width':2.5,'line-opacity':oi(0.95)}});}catch(e){}}
    regL('v8-mp-zone-line','line-opacity',0.95,0.44);

    // 3b. CORIDOR VERDE — banda continua de la parc spre periferie (faza ~2042)
    const greenCorr=[]; for(let i=0;i<=44;i++){ greenCorr.push(P((118+i*1.7)*d2r, R*0.66+i*R*0.013)); }
    this._safeAdd(map,'v8-mp-green',{type:'geojson',data:{type:'Feature',geometry:{type:'LineString',coordinates:greenCorr},properties:{}}},{
      id:'v8-mp-green-l',type:'line',source:'v8-mp-green',
      paint:{'line-color':'#16a34a','line-width':9,'line-opacity':oi(0.5),'line-blur':2},layout:{'line-cap':'round'}
    });
    regL('v8-mp-green-l','line-opacity',0.5,0.58);

    // 3c. CENTURA VERDE (model Frankfurt GrünGürtel) — inel verde lat + pene
    // verzi radiale (coridoare ecologice inter-urbane spre natura din jur). Faza ~2044.
    const gbR=ringR*0.92, gb=[]; for(let i=0;i<=96;i++){ gb.push(P((i/96)*Math.PI*2, gbR)); }
    this._safeAdd(map,'v8-mp-belt',{type:'geojson',data:{type:'Feature',geometry:{type:'LineString',coordinates:gb},properties:{}}},{
      id:'v8-mp-belt-l',type:'line',source:'v8-mp-belt',
      paint:{'line-color':'#16a34a','line-width':16,'line-opacity':oi(0.32),'line-blur':7},layout:{'line-cap':'round'}
    });
    regL('v8-mp-belt-l','line-opacity',0.32,0.60);
    const wedges=[45,135,225,315].map(deg=>{const a=deg*d2r;return{type:'Feature',geometry:{type:'LineString',coordinates:[P(a,gbR*0.55),P(a,ringR*1.45)]},properties:{}};});
    this._safeAdd(map,'v8-mp-gwedge',{type:'geojson',data:{type:'FeatureCollection',features:wedges}},{
      id:'v8-mp-gwedge-l',type:'line',source:'v8-mp-gwedge',
      paint:{'line-color':'#22c55e','line-width':11,'line-opacity':oi(0.30),'line-blur':5},layout:{'line-cap':'round'}
    });
    regL('v8-mp-gwedge-l','line-opacity',0.30,0.62);

    // 4. PASAJE denivelate (centura × cale ferata) (faza ~2050)
    this._safeAdd(map,'v8-mp-pass',{type:'geojson',data:{type:'FeatureCollection',features:railDeg.map(d=>({type:'Feature',geometry:{type:'Point',coordinates:P(d*d2r,ringR)},properties:{}}))}},{
      id:'v8-mp-pass-l',type:'circle',source:'v8-mp-pass',
      paint:{'circle-radius':7,'circle-color':'#ef4444','circle-stroke-width':2,'circle-stroke-color':'#ffffff','circle-opacity':oi(0.95)}
    });
    regL('v8-mp-pass-l','circle-opacity',0.95,0.80);

    // 5. ETICHETE MARI etapizate (apar la faza fiecarui element)
    const kmCentura=Math.round(2*Math.PI*ringR*111*Math.cos(cy*d2r));
    const addLbl=(lon,lat,color,icon,title,sub,ph)=>{
      if(typeof mapboxgl==='undefined'||!mapboxgl.Marker) return;
      const el=document.createElement('div');
      el.style.cssText='display:flex;align-items:center;gap:8px;background:rgba(2,6,18,0.92);border:2px solid '+color+';border-radius:12px;padding:7px 13px;font-family:"Space Grotesk",system-ui,sans-serif;font-weight:800;font-size:15px;color:#fff;white-space:nowrap;box-shadow:0 6px 22px rgba(0,0,0,0.55);pointer-events:none;backdrop-filter:blur(4px);transition:opacity .7s ease;'+(phased?'opacity:0;':'');
      el.innerHTML='<span style="font-size:19px;line-height:1">'+(icon||'')+'</span><span style="line-height:1.15">'+title+(sub?'<span style="display:block;font-size:10px;font-weight:600;color:'+color+';letter-spacing:.02em">'+sub+'</span>':'')+'</span>';
      try{ const m=new mapboxgl.Marker({element:el, anchor:'bottom'}).setLngLat([lon,lat]).addTo(map);
        this._cinMarkers=this._cinMarkers||[]; this._cinMarkers.push(m);
        this._mpMarkers.push({el:el, ph:ph}); }catch(e){}
    };
    addLbl(P(270*d2r,ringR)[0], P(270*d2r,ringR)[1], '#f59e0b','⭗','CENTURA OCOLITOARE', kmCentura+' km propusi', 0.12);
    addLbl(P(78*d2r,ringR*0.55)[0], P(78*d2r,ringR*0.55)[1], '#a855f7','🚆','TREN METROPOLITAN','3 linii + statii', 0.30);
    zones.forEach(z=>addLbl(P(z.ang,z.rad)[0], P(z.ang,z.rad)[1], z.c, z.icon, z.t, z.sub, z.ph));
    addLbl(P(150*d2r,R*0.95)[0], P(150*d2r,R*0.95)[1], '#16a34a','🌿','CORIDOR VERDE','retea ecologica', 0.58);
    addLbl(P(225*d2r,gbR)[0], P(225*d2r,gbR)[1], '#16a34a','🌳','CENTURA VERDE','model Frankfurt GrunGurtel', 0.60);
    addLbl(P(18*d2r,ringR)[0], P(18*d2r,ringR)[1], '#ef4444','⬆','PASAJ DENIVELAT','centura × cale ferata', 0.80);
  },

  // Flux animat prin reteaua proiectata (tren/centura/coridor verde) — "marching
  // ants": orasul proiectat pare VIU, energia curge prin retea. Apelat per-frame.
  _flowMasterplan(t){
    const map=this._map; if(!map) return;
    const seq=[[1,2,4],[2,2,3],[3,2,2],[4,2,1]];
    const d=seq[Math.floor(t*46)%seq.length];
    ['v8-mp-rail-l','v8-mp-green-l','v8-mp-ring-l'].forEach(function(id){
      try{ if(map.getLayer(id)) map.setPaintProperty(id,'line-dasharray',d); }catch(e){}
    });
  },

  // Reveleaza progresiv elementele masterplanului pe masura ce ruleaza timpul (t: 0..1)
  // Apelat din bucla scenei b6s2 -> urbanismul "se construieste" 2025->2055.
  _revealMasterplan(t){
    const map=this._map; if(!map||!this._mpLayers) return;
    this._mpRevealed=this._mpRevealed||{};
    this._mpLayers.forEach(L=>{
      const k=L.id+'|'+L.prop;
      if(t>=L.ph && !this._mpRevealed[k]){ this._mpRevealed[k]=true; try{map.setPaintProperty(L.id,L.prop,L.target);}catch(e){} }
    });
    if(this._mpMarkers){ this._mpMarkers.forEach(m=>{ if(m.el){ const o=(t>=m.ph)?'1':'0'; if(m.el.style.opacity!==o) m.el.style.opacity=o; } }); }
  },

  // Centroid ieftin (medie ring) — evitam turf per-feature pe mii de poligoane
  _cheapCentroid(g){
    try{ let c=g.coordinates;
      while(Array.isArray(c)&&Array.isArray(c[0])&&Array.isArray(c[0][0])) c=c[0];
      let sx=0,sy=0,n=0;
      for(let i=0;i<c.length;i++){ if(Array.isArray(c[i])&&typeof c[i][0]==='number'){sx+=c[i][0];sy+=c[i][1];n++;} }
      return n?[sx/n,sy/n]:null;
    }catch(e){return null;}
  },

  // ── PRESIUNE DENSITATE LOCUITORI (proiectata) — heatmap din zonele PUG ponderate
  // pe potentialul de densificare. Rosu = presiune maxima. Apare progresiv.
  _addDensityPressure(map){
    const geo=this._pugGeo, cx=this._city?.lon||25, cy=this._city?.lat||45.5;
    let pts=[];
    if(geo&&geo.features&&geo.features.length){
      geo.features.slice(0,900).forEach(f=>{
        const u=String((f.properties||{}).utr||'').toUpperCase();
        const w=u.startsWith('CC')||u.startsWith('CP')?1.0:u.startsWith('CM')||u.startsWith('CA')||u.startsWith('CB')?0.78:u.startsWith('LC')||u.startsWith('LB')?0.55:u.startsWith('LA')||u.startsWith('LL')?0.35:0.12;
        const c=this._cheapCentroid(f.geometry); if(!c)return;
        pts.push({type:'Feature',geometry:{type:'Point',coordinates:c},properties:{w:w}});
      });
    }
    if(!pts.length){ for(let i=0;i<48;i++){const ang=i/48*Math.PI*2,r=0.015+(i%6)*0.007;pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx+Math.cos(ang)*r*1.5,cy+Math.sin(ang)*r]},properties:{w:1-(i%6)*0.15}});} }
    this._safeAdd(map,'v8-dp',{type:'geojson',data:{type:'FeatureCollection',features:pts}},{
      id:'v8-dp-l',type:'heatmap',source:'v8-dp',
      paint:{'heatmap-weight':['get','w'],'heatmap-intensity':1.3,'heatmap-radius':32,'heatmap-opacity':0,
        'heatmap-color':['interpolate',['linear'],['heatmap-density'],0,'rgba(0,0,0,0)',0.25,'rgba(34,197,94,0.45)',0.5,'rgba(245,158,11,0.7)',0.78,'rgba(239,68,68,0.85)',1,'rgba(255,0,51,0.95)']}
    });
  },

  // ── PRESIUNE TRAFIC (proiectata) — daca avem reteaua OSM reala (roads), construim
  // heatmap-ul din fluxurile reale ponderate pe clasa drumului + proximitate centru.
  // Altfel fallback la nodurile critice radiale × centura.
  _addTrafficPressure(map, roads){
    const cx=this._city?.lon||25, cy=this._city?.lat||45.5;
    let pts=[];
    if(roads && roads.length){
      // FLUXURI OSM REALE — esantionam puncte de-a lungul arterelor
      roads.slice(0,500).forEach(rd=>{
        const co=rd&&rd.geometry&&rd.geometry.coordinates; if(!co||!co.length) return;
        const cls=String((rd.properties&&(rd.properties.t||rd.properties.highway))||'');
        const base=(cls.indexOf('motorway')>=0||cls.indexOf('trunk')>=0)?0.95:cls.indexOf('primary')>=0?0.72:cls.indexOf('secondary')>=0?0.5:0.38;
        for(let i=0;i<co.length;i+=2){
          if(!Array.isArray(co[i])||typeof co[i][0]!=='number') continue;
          const dx=(co[i][0]-cx),dy=(co[i][1]-cy),d=Math.sqrt(dx*dx+dy*dy);
          const prox=Math.max(0.12,1-d/0.07); // presiune mai mare spre centru
          pts.push({type:'Feature',geometry:{type:'Point',coordinates:co[i]},properties:{w:Math.min(1,base*prox)}});
        }
      });
    }
    if(!pts.length){
      // Fallback: noduri critice radiale × centura
      pts=[{type:'Feature',geometry:{type:'Point',coordinates:[cx,cy]},properties:{w:1}}];
      [0,45,90,135,180,225,270,315].forEach(deg=>{
        const a=deg*Math.PI/180;
        pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx+Math.cos(a)*0.018*1.5,cy+Math.sin(a)*0.018]},properties:{w:0.72}});
        pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx+Math.cos(a)*0.045*1.5,cy+Math.sin(a)*0.045]},properties:{w:0.5}});
      });
    }
    this._safeAdd(map,'v8-tp2',{type:'geojson',data:{type:'FeatureCollection',features:pts}},{
      id:'v8-tp2-l',type:'heatmap',source:'v8-tp2',
      paint:{'heatmap-weight':['get','w'],'heatmap-intensity':1.4,'heatmap-radius':40,'heatmap-opacity':0,
        'heatmap-color':['interpolate',['linear'],['heatmap-density'],0,'rgba(0,0,0,0)',0.3,'rgba(59,130,246,0.4)',0.55,'rgba(245,158,11,0.7)',0.8,'rgba(239,68,68,0.9)',1,'rgba(255,0,51,0.95)']}
    });
  },

  // ── LIMITA INTRAVILAN: actual (hull din PUG) vs PROIECTAT 2055 (buffer extins) ──
  _addFutureIntravilan(map){
    const geo=this._pugGeo, cx=this._city?.lon||25, cy=this._city?.lat||45.5;
    let curHull=null;
    try{
      if(geo&&geo.features&&typeof turf!=='undefined'){
        const pp=geo.features.slice(0,1500).map(f=>{const c=this._cheapCentroid(f.geometry);return c?turf.point(c):null;}).filter(Boolean);
        if(pp.length>=3) curHull=turf.convex(turf.featureCollection(pp));
      }
    }catch(e){}
    if(!curHull){ const r=0.05,ring=[];for(let i=0;i<=64;i++){const a=i/64*Math.PI*2;ring.push([cx+Math.cos(a)*r*1.5,cy+Math.sin(a)*r]);}curHull={type:'Feature',geometry:{type:'Polygon',coordinates:[ring]},properties:{}}; }
    // TREI ORIZONTURI simultan: 2030 / 2040 / 2055 — contururi nestate din hull-ul actual
    const horizons=[{km:0.6,yr:2030,c:'#fbbf24'},{km:1.1,yr:2040,c:'#f97316'},{km:1.6,yr:2055,c:'#ef4444'}];
    // banda de expansiune (cel mai mare orizont) umpluta subtil
    try{ const big=turf.buffer(curHull,1.6,{units:'kilometers'}); if(big) this._safeAdd(map,'v8-fi-fut',{type:'geojson',data:big},{id:'v8-fi-fut-fill',type:'fill',source:'v8-fi-fut',paint:{'fill-color':'#ef4444','fill-opacity':0.08}}); }catch(e){}
    horizons.forEach(h=>{
      try{
        const b=turf.buffer(curHull,h.km,{units:'kilometers'}); if(!b) return;
        this._safeAdd(map,'v8-fi-'+h.yr,{type:'geojson',data:b},{
          id:'v8-fi-'+h.yr+'-l',type:'line',source:'v8-fi-'+h.yr,
          paint:{'line-color':h.c,'line-width':2.6,'line-opacity':0.9,'line-dasharray':[3,2]},layout:{'line-cap':'round'}
        });
      }catch(e){}
    });
    // conturul actual — auriu solid, gros
    this._safeAdd(map,'v8-fi-cur',{type:'geojson',data:curHull},{
      id:'v8-fi-cur-l',type:'line',source:'v8-fi-cur',paint:{'line-color':'#D4AF37','line-width':3.8,'line-opacity':0.96},layout:{'line-cap':'round'}
    });
    this._cinLabels(map,[
      {lon:cx, lat:cy+0.044, color:'#D4AF37', icon:'▰', title:'INTRAVILAN ACTUAL', sub:'limita azi'},
      {lon:cx, lat:cy+0.062, color:'#fbbf24', icon:'⇢', title:'ORIZONT 2030', sub:'expansiune etapa 1'},
      {lon:cx, lat:cy+0.080, color:'#f97316', icon:'⇢', title:'ORIZONT 2040', sub:'expansiune etapa 2'},
      {lon:cx, lat:cy+0.098, color:'#ef4444', icon:'⇢', title:'ORIZONT 2055', sub:'limita maxima controlata'}
    ]);
  },

  // ── REȚELE UTILITĂȚI — schemă desenată pe hartă (apă/canal/energie/gaz) ca
  // arbori ramificați din centru, SCALATĂ la extinderea reală a orașului (PUG)
  // ca să fie vizibilă la orice zoom. Noduri = stații (tratare/epurare/substație).
  _addUtilityNet(map){
    const cx=this._city?.lon||25, cy=this._city?.lat||45.5;
    // scara adaptiva: raza ~ 0.42 din extinderea PUG (cu fallback)
    let R=0.045;
    try{
      const fs=(this._pugGeo&&this._pugGeo.features)||[];
      if(fs.length){
        let mnx=1e9,mny=1e9,mxx=-1e9,mxy=-1e9;
        for(let i=0;i<fs.length;i+=Math.max(1,Math.floor(fs.length/200))){
          const c=this._cheapCentroid(fs[i].geometry); if(c){ if(c[0]<mnx)mnx=c[0];if(c[0]>mxx)mxx=c[0];if(c[1]<mny)mny=c[1];if(c[1]>mxy)mxy=c[1]; }
        }
        if(mxx>mnx) R=Math.max(0.02, Math.min(0.085, Math.max(mxx-mnx,mxy-mny)*0.42));
      }
    }catch(e){}
    const latC=Math.cos(cy*Math.PI/180)||0.7, rx=R/latC, ry=R; // corectie aspect lon/lat
    const nets=[
      {c:'#3b82f6',ang:25, label:'APA',        icon:'💧', node:'Stație tratare'},
      {c:'#a855f7',ang:110,label:'CANALIZARE', icon:'♻',  node:'Stație epurare'},
      {c:'#fbbf24',ang:200,label:'ENERGIE',    icon:'⚡', node:'Substație 110kV'},
      {c:'#f97316',ang:290,label:'GAZ',        icon:'🔥', node:'SRM gaz'},
    ];
    const feats=[], nodes=[];
    nets.forEach(n=>{
      const a=n.ang*Math.PI/180;
      const tip=[cx+Math.cos(a)*rx, cy+Math.sin(a)*ry];
      feats.push({type:'Feature',geometry:{type:'LineString',coordinates:[[cx,cy],tip]},properties:{c:n.c}});
      // ramuri secundare la ~60% si la varf
      for(let b=-1;b<=1;b+=2){
        const ba=a+b*0.40, mid=[cx+Math.cos(a)*rx*0.6,cy+Math.sin(a)*ry*0.6];
        feats.push({type:'Feature',geometry:{type:'LineString',coordinates:[mid,[cx+Math.cos(ba)*rx*0.95,cy+Math.sin(ba)*ry*0.95]]},properties:{c:n.c}});
        const ba2=a+b*0.22;
        feats.push({type:'Feature',geometry:{type:'LineString',coordinates:[tip,[cx+Math.cos(ba2)*rx*1.18,cy+Math.sin(ba2)*ry*1.18]]},properties:{c:n.c}});
      }
      nodes.push({type:'Feature',geometry:{type:'Point',coordinates:tip},properties:{c:n.c}});
    });
    this._safeAdd(map,'v8-util',{type:'geojson',data:{type:'FeatureCollection',features:feats}},{
      id:'v8-util-l',type:'line',source:'v8-util',
      paint:{'line-color':['get','c'],'line-width':3.2,'line-opacity':0.85,'line-blur':0.3},layout:{'line-cap':'round'}
    });
    // nod central (sursa) + noduri statii la varfuri
    this._safeAdd(map,'v8-util-n',{type:'geojson',data:{type:'FeatureCollection',features:nodes.concat([{type:'Feature',geometry:{type:'Point',coordinates:[cx,cy]},properties:{c:'#e2e8f0'}}])}},{
      id:'v8-util-n-l',type:'circle',source:'v8-util-n',
      paint:{'circle-radius':6,'circle-color':['get','c'],'circle-opacity':0.95,'circle-stroke-width':2,'circle-stroke-color':'#0b1424'}
    });
    this._cinLabels(map, nets.map(n=>({lon:cx+Math.cos(n.ang*Math.PI/180)*rx, lat:cy+Math.sin(n.ang*Math.PI/180)*ry, color:n.c, icon:n.icon, title:n.label, sub:n.node})));
  },

  // ── PROIECTE STRUCTURANTE REALE pe harta (din _UrbanProjects per-UAT) ──
  _addRealProjects(map, cityKey){
    if(!map || !window._UrbanProjects) return;
    var f = window._UrbanProjects.buildFeatures(cityKey || this._cityKey || (window.TCI&&window.TCI.cityKey) || 'RO-IS-01', this._city||{});
    if(f.lines && f.lines.length){
      this._safeAdd(map,'v8-proj-line',{type:'geojson',data:{type:'FeatureCollection',features:f.lines}},{
        id:'v8-proj-line-l',type:'line',source:'v8-proj-line',
        paint:{'line-color':['get','c'],'line-width':5,'line-opacity':0.88,'line-blur':0.6,'line-dasharray':[2,1]},layout:{'line-cap':'round'}
      });
    }
    if(f.pts && f.pts.length){
      this._safeAdd(map,'v8-proj-pt',{type:'geojson',data:{type:'FeatureCollection',features:f.pts}},{
        id:'v8-proj-pt-l',type:'circle',source:'v8-proj-pt',
        paint:{'circle-radius':10,'circle-color':['get','c'],'circle-opacity':0.92,'circle-stroke-width':3,'circle-stroke-color':'#ffffff'}
      });
    }
    if(this._cinLabels) this._cinLabels(map, f.labels||[]);
  },

  // ── INFRASTRUCTURA REGIONALA REALA (autostrazi CNAIR + aeroporturi + metrou) ──
  // Status pe culori (verde=finalizat, portocaliu=executie, albastru=proiectare).
  _addRegioInfra(map, city){
    if(!window._RegioInfra) return;
    var f=window._RegioInfra.buildFeatures(city||this._city||{});
    if(f.lines && f.lines.length){
      this._safeAdd(map,'v8-ri-line',{type:'geojson',data:{type:'FeatureCollection',features:f.lines}},{
        id:'v8-ri-line-l',type:'line',source:'v8-ri-line',
        paint:{'line-color':['get','c'],'line-width':5,'line-opacity':0.9,'line-blur':0.5,'line-dasharray':[1.5,0.8]},layout:{'line-cap':'round','line-join':'round'}
      });
    }
    if(f.airportPts && f.airportPts.length){
      this._safeAdd(map,'v8-ri-apt',{type:'geojson',data:{type:'FeatureCollection',features:f.airportPts}},{
        id:'v8-ri-apt-l',type:'circle',source:'v8-ri-apt',
        paint:{'circle-radius':11,'circle-color':['get','c'],'circle-opacity':0.92,'circle-stroke-width':3,'circle-stroke-color':'#0b1424'}
      });
    }
    if(this._cinLabels) this._cinLabels(map, f.labels||[]);
  },

  // ── #1 CRIZA IMBATRANIRE — heatmap concentratie varstnici (fond colectiv vechi
  // = pondere 65+ mare; periferie noua = tineri). Localizeaza cartierul-varf.
  _addAgingHeat(map){
    const cx=this._city?.lon||27, cy=this._city?.lat||47;
    const fs=(this._pugGeo&&this._pugGeo.features)||[]; const pts=[]; let peak=[cx,cy], pw=0;
    if(fs.length){
      const step=Math.max(1,Math.floor(fs.length/650));
      for(let i=0;i<fs.length;i+=step){
        const c=this._cheapCentroid(fs[i].geometry); if(!c)continue;
        const u=String((fs[i].properties||{}).zf||(fs[i].properties||{}).utr||'').toUpperCase();
        let w=0.30;
        if(u.indexOf('LA')===0||u.indexOf('LL')===0) w=1.0;       // colectiv interbelic/vechi = varstnici
        else if(u.indexOf('CC')===0||u.indexOf('CP')===0) w=0.85; // centru vechi
        else if(u.indexOf('LC')===0||u.indexOf('LB')===0) w=0.7;
        else if(u.indexOf('L')===0) w=0.32;                       // periferie noua = tineri
        pts.push({type:'Feature',geometry:{type:'Point',coordinates:c},properties:{w}});
        if(w>pw){pw=w;peak=c;}
      }
    } else { for(let i=0;i<160;i++){const a=Math.random()*6.283,r=Math.random()*0.02;pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx+Math.cos(a)*r,cy+Math.sin(a)*r]},properties:{w:1-r/0.03}});} }
    this._safeAdd(map,'v8-age',{type:'geojson',data:{type:'FeatureCollection',features:pts}},{
      id:'v8-age-l',type:'heatmap',source:'v8-age',
      paint:{'heatmap-weight':['get','w'],'heatmap-intensity':['interpolate',['linear'],['zoom'],10,1.6,15,4],
        'heatmap-color':['interpolate',['linear'],['heatmap-density'],0,'rgba(0,0,0,0)',0.15,'rgba(96,165,250,0.55)',0.45,'rgba(245,158,11,0.80)',1,'rgba(168,85,247,0.95)'],
        'heatmap-radius':['interpolate',['linear'],['zoom'],10,28,15,70],'heatmap-opacity':0.9}
    });
    this._agingPeak=peak;
    // TOP-3 clustere DISTINCTE de imbatranire, NUMITE pe cartierul real (nu "CARTIER IMBATRANIT" generic)
    const _ck=this._cityKey||(window.TCI&&window.TCI.cityKey)||'RO-IS-01';
    const sorted=pts.slice().sort((a,b)=>b.properties.w-a.properties.w);
    const clusters=[];
    for(let si=0; si<sorted.length && clusters.length<3; si++){
      if(sorted[si].properties.w<0.6) break;
      const cc=sorted[si].geometry.coordinates;
      const nm=_nbhdName(_ck,cc[0],cc[1]);
      const farEnough=clusters.every(cl=>Math.hypot(cl.lon-cc[0],cl.lat-cc[1])>0.013);
      const nameFree=!nm||clusters.every(cl=>cl.n!==nm);   // nu repeta acelasi cartier
      if(farEnough && nameFree){ clusters.push({lon:cc[0],lat:cc[1],n:nm}); }
    }
    if(!clusters.length) clusters.push({lon:peak[0],lat:peak[1],n:_nbhdName(_ck,peak[0],peak[1])});
    this._agingClusters=clusters;
    const labs=clusters.map((cl,i)=>({lon:cl.lon,lat:cl.lat,color:'#a855f7',icon:'👵',
      title:(cl.n?cl.n.toUpperCase():'CARTIER ÎMBĂTRÂNIT'),sub:(i===0?'cel mai îmbătrânit · ':'')+'pondere 65+ ridicată · fond colectiv vechi'}));
    labs.push({lon:cx,lat:cy-0.03,color:'#60a5fa',icon:'👶',title:'PERIFERIE TÂNĂRĂ',sub:'familii tinere · cerere creșe/școli'});
    this._cinLabels(map,labs);
    return peak;
  },

  // ── #2 RISC SEISMIC — clustere de fond vulnerabil (colectiv vechi comasat) +
  // hull rosu + "unde de soc" concentrice (simulare) la cel mai dens cluster.
  _addSeismicClusters(map){
    const cx=this._city?.lon||27, cy=this._city?.lat||47;
    const fs=(this._pugGeo&&this._pugGeo.features)||[]; const hi=[];
    if(fs.length){
      const step=Math.max(1,Math.floor(fs.length/700));
      for(let i=0;i<fs.length;i+=step){
        const c=this._cheapCentroid(fs[i].geometry); if(!c)continue;
        const u=String((fs[i].properties||{}).zf||(fs[i].properties||{}).utr||'').toUpperCase();
        if(u.indexOf('LA')===0||u.indexOf('LL')===0||u.indexOf('LC')===0||u.indexOf('CC')===0||u.indexOf('CP')===0) hi.push(c);
      }
    }
    if(!hi.length){ for(let i=0;i<40;i++){const a=Math.random()*6.283,r=Math.random()*0.012;hi.push([cx+Math.cos(a)*r,cy+Math.sin(a)*r]);} }
    // punctele de fond vulnerabil — patrate rosii
    this._safeAdd(map,'v8-sc',{type:'geojson',data:{type:'FeatureCollection',features:hi.map(c=>({type:'Feature',geometry:{type:'Point',coordinates:c},properties:{}}))}},{
      id:'v8-sc-l',type:'circle',source:'v8-sc',
      paint:{'circle-radius':5,'circle-color':'#ef4444','circle-opacity':0.7,'circle-stroke-width':1,'circle-stroke-color':'#7f1d1d'}
    });
    // centrul clusterului (medie) — epicentru pt undele de soc
    let ex=0,ey=0; hi.forEach(c=>{ex+=c[0];ey+=c[1];}); ex/=hi.length; ey/=hi.length;
    this._seismicEpi=[ex,ey];
    // hull rosu transparent (zona comasata)
    try{
      if(typeof turf!=='undefined' && hi.length>=3){
        const hull=turf.convex(turf.featureCollection(hi.map(c=>turf.point(c))));
        if(hull) this._safeAdd(map,'v8-sc-h',{type:'geojson',data:hull},{id:'v8-sc-h-l',type:'fill',source:'v8-sc-h',paint:{'fill-color':'#ef4444','fill-opacity':0.14,'fill-outline-color':'#ef4444'}});
      }
    }catch(e){}
    // unde de soc concentrice (cercuri) — simulare miscare seismica
    const rings=[0.006,0.012,0.018].map(rad=>{ const ring=[]; for(let i=0;i<=48;i++){const a=i/48*6.283;ring.push([ex+Math.cos(a)*rad/Math.cos(ey*Math.PI/180),ey+Math.sin(a)*rad]);} return {type:'Feature',geometry:{type:'LineString',coordinates:ring},properties:{}}; });
    this._safeAdd(map,'v8-sc-w',{type:'geojson',data:{type:'FeatureCollection',features:rings}},{
      id:'v8-sc-w-l',type:'line',source:'v8-sc-w',paint:{'line-color':'#fca5a5','line-width':1.5,'line-opacity':0.55}
    });
    this._cinLabels(map,[{lon:ex,lat:ey,color:'#ef4444',icon:'🏚',title:'FOND VULNERABIL COMASAT',sub:'consolidare prioritară · PNRR C10-I2'}]);
  },

  // ── #3 MODAL SPLIT — coridoare radiale colorate, latime ∝ cota modala +
  // sageti de flux. Transmite vizual repartitia deplasarilor.
  // ROATA modal split (diagrama la centrul orasului) — NU trafic directional fals.
  // Spite SCURTE proportionale cu cota, cu nod central, clar etichetate.
  _addModalSplit(map, modalAuto){
    const cx=this._city?.lon||27, cy=this._city?.lat||47;
    // split CANONIC, suma 100% (consistent cu _drawModalFull / narativ)
    const auto=Math.max(40,Math.min(60, Math.round(modalAuto||52)));
    const rem=100-auto, tp=Math.round(rem*0.52), pieton=Math.round(rem*0.42), velo=rem-tp-pieton;
    const modes=[
      {c:'#ef4444',pct:auto,  label:'AUTO',            ang:45,  icon:'🚗'},
      {c:'#a78bfa',pct:tp,    label:'TRANSPORT PUBLIC',ang:135, icon:'🚌'},
      {c:'#3b82f6',pct:pieton,label:'PIETONAL',        ang:225, icon:'🚶'},
      {c:'#22c55e',pct:velo,  label:'BICICLETA',       ang:315, icon:'🚲'},
    ];
    const latC=Math.cos(cy*Math.PI/180)||0.7, feats=[];
    // spite SCURTE, lungime ∝ cota (max ~0.012°) — diagrama, nu drumuri
    modes.forEach(m=>{ const a=m.ang*Math.PI/180, R=0.004+(m.pct/100)*0.014;
      const tip=[cx+Math.cos(a)*R/latC, cy+Math.sin(a)*R];
      feats.push({type:'Feature',geometry:{type:'LineString',coordinates:[[cx,cy],tip]},properties:{c:m.c,w:Math.max(5,m.pct/3.5)}}); });
    this._safeAdd(map,'v8-modal',{type:'geojson',data:{type:'FeatureCollection',features:feats}},{
      id:'v8-modal-l',type:'line',source:'v8-modal',
      paint:{'line-color':['get','c'],'line-width':['get','w'],'line-opacity':0.9},layout:{'line-cap':'round'}
    });
    // nod central (orasul) — ca sa se vada ca e o diagrama centrata, nu flux
    this._safeAdd(map,'v8-modal-c',{type:'geojson',data:{type:'Feature',geometry:{type:'Point',coordinates:[cx,cy]},properties:{}}},{
      id:'v8-modal-c-l',type:'circle',source:'v8-modal-c',paint:{'circle-radius':7,'circle-color':'#e2e8f0','circle-stroke-width':2,'circle-stroke-color':'#0b1424'}
    });
    this._cinLabels(map, modes.map(m=>{ const a=m.ang*Math.PI/180, R=0.004+(m.pct/100)*0.014;
      return {lon:cx+Math.cos(a)*R/latC, lat:cy+Math.sin(a)*R, color:m.c, icon:m.icon, title:m.label, sub:m.pct+'% din deplasări'}; }));
  },

  // ── #4 COSTUL INACTIUNII — zone de impact (seismic/inundatii/congestie/exod)
  // cu pierderi estimate, cercuri rosii care "ard" (simulare degradare).
  _addCostInaction(map){
    const cx=this._city?.lon||27, cy=this._city?.lat||47;
    const latC=Math.cos(cy*Math.PI/180)||0.7;
    const impacts=[
      {dx: 0.0,  dy: 0.0,  c:'#ef4444', icon:'🏚', t:'SEISM — fond neconsolidat', loss:'−180 M€'},
      {dx:-0.03, dy:-0.02, c:'#3b82f6', icon:'🌊', t:'INUNDAȚII — lunca neamenajată', loss:'−45 M€/eveniment'},
      {dx: 0.035,dy: 0.01, c:'#f59e0b', icon:'🚗', t:'CONGESTIE — fără mobilitate', loss:'−2.400 ore/loc/an'},
      {dx: 0.0,  dy: 0.035,c:'#a855f7', icon:'📉', t:'EXOD — fără investiții', loss:'−12% populație 2055'},
    ];
    const pts=impacts.map(im=>({type:'Feature',geometry:{type:'Point',coordinates:[cx+im.dx/latC,cy+im.dy]},properties:{c:im.c}}));
    this._safeAdd(map,'v8-cost',{type:'geojson',data:{type:'FeatureCollection',features:pts}},{
      id:'v8-cost-l',type:'circle',source:'v8-cost',
      paint:{'circle-radius':['interpolate',['linear'],['zoom'],11,14,15,40],'circle-color':['get','c'],'circle-opacity':0.28,'circle-stroke-width':2,'circle-stroke-color':['get','c']}
    });
    this._cinLabels(map, impacts.map(im=>({lon:cx+im.dx/latC, lat:cy+im.dy, color:im.c, icon:im.icon, title:im.t, sub:'pierdere estimată: '+im.loss})));
  },

  // ── MONUMENTE & ZONE DE PROTECTIE — puncte (OSM historic / LMI) + zona-tampon
  // ~100m (servitute Legea 422/2001). Sursa: OSM historic; CIMEC/LMI = registru oficial.
  _addMonuments(map, monuments){
    var cx=this._city?.lon||27, cy=this._city?.lat||47;
    // DOAR cele mai apropiate ~8 monumente de centru (altfel cercuri imprastiate, confuz)
    var mon=(monuments&&monuments.length)?monuments.slice():null;
    if(mon){ mon.sort(function(a,b){var ca=a.geometry.coordinates,cb=b.geometry.coordinates;return (Math.hypot(ca[0]-cx,ca[1]-cy))-(Math.hypot(cb[0]-cx,cb[1]-cy));}); mon=mon.slice(0,8); }
    if(!mon){ mon=[]; var latC0=Math.cos(cy*Math.PI/180)||0.7; for(var i=0;i<5;i++){var a=i/5*6.283;mon.push({type:'Feature',geometry:{type:'Point',coordinates:[cx+Math.cos(a)*0.004/latC0,cy+Math.sin(a)*0.003]},properties:{n:'Monument'}});} }
    // ZONA DE PROTECTIE ~100m — cerc MIC (nu blob urias suprapus)
    this._safeAdd(map,'v8-monz',{type:'geojson',data:{type:'FeatureCollection',features:mon}},{
      id:'v8-monz-l',type:'circle',source:'v8-monz',
      paint:{'circle-radius':['interpolate',['exponential',2],['zoom'],11,4,14,12,16,40],'circle-color':'#f59e0b','circle-opacity':0.14,'circle-stroke-width':1,'circle-stroke-color':'#fbbf24'}
    });
    // MONUMENTELE (puncte aurii)
    this._safeAdd(map,'v8-mon2',{type:'geojson',data:{type:'FeatureCollection',features:mon}},{
      id:'v8-mon2-l',type:'circle',source:'v8-mon2',
      paint:{'circle-radius':5,'circle-color':'#fbbf24','circle-opacity':0.96,'circle-stroke-width':1.5,'circle-stroke-color':'#7c2d12'}
    });
    var labels=mon.slice(0,5).map(function(f){var c=f.geometry.coordinates;return {lon:c[0],lat:c[1],color:'#fbbf24',icon:'⛪',title:((f.properties&&f.properties.n)||'Monument').slice(0,24),sub:'zonă protecție ~100m (LMI/L.422)'};});
    if(this._cinLabels) this._cinLabels(map, labels);
  },

  // ── ENERGIE & CLIMAT — potential solar + fond de renovat + termoficare
  _addEnergy(map, city, pred){
    if(!window._UrbanEnergy) return;
    var f=window._UrbanEnergy.buildFeatures(city||this._city||{}, pred||this._pred||{});
    if(f.pts && f.pts.length){
      this._safeAdd(map,'v8-energy',{type:'geojson',data:{type:'FeatureCollection',features:f.pts}},{
        id:'v8-energy-l',type:'circle',source:'v8-energy',
        paint:{'circle-radius':['interpolate',['linear'],['zoom'],11,12,15,32],'circle-color':['get','c'],'circle-opacity':0.32,'circle-stroke-width':2,'circle-stroke-color':['get','c']}
      });
    }
    if(this._cinLabels) this._cinLabels(map, f.labels||[]);
  },
  // ── APA & ECONOMIE CIRCULARA — apa + deseuri + risc seceta
  _addResources(map, city){
    if(!window._UrbanResources) return;
    var f=window._UrbanResources.buildFeatures(city||this._city||{});
    if(f.pts && f.pts.length){
      this._safeAdd(map,'v8-res',{type:'geojson',data:{type:'FeatureCollection',features:f.pts}},{
        id:'v8-res-l',type:'circle',source:'v8-res',
        paint:{'circle-radius':['interpolate',['linear'],['zoom'],11,11,15,30],'circle-color':['get','c'],'circle-opacity':0.34,'circle-stroke-width':2,'circle-stroke-color':['get','c']}
      });
    }
    if(this._cinLabels) this._cinLabels(map, f.labels||[]);
  },

  // ── LOCUIRE & ACCESIBILITATE — presiune centru (scump) vs dezvoltare periferie
  _addHousing(map, city, pred){
    if(!window._UrbanHousing) return;
    var f=window._UrbanHousing.buildFeatures(city||this._city||{}, pred||this._pred||{});
    if(f.pts && f.pts.length){
      this._safeAdd(map,'v8-house',{type:'geojson',data:{type:'FeatureCollection',features:f.pts}},{
        id:'v8-house-l',type:'circle',source:'v8-house',
        paint:{'circle-radius':['interpolate',['linear'],['zoom'],11,12,15,34],'circle-color':['get','c'],'circle-opacity':0.3,'circle-stroke-width':2,'circle-stroke-color':['get','c']}
      });
    }
    if(this._cinLabels) this._cinLabels(map, f.labels||[]);
  },

  // ── PARTICIPARE PUBLICA — comentarii cetateni geolocalizate (transparenta)
  _addParticipation(map){
    if(!window._PublicParticipation || !window._PublicParticipation.snapshot) return;
    var s=window._PublicParticipation.snapshot();
    var CAT=window._PublicParticipation.CATEGORIES||{};
    var cx=this._city?.lon||27, cy=this._city?.lat||47;
    // comentariile demo sunt centrate pe Iasi (~47.16,27.60); le re-ancoram pe orasul curent
    var bx=27.60, by=47.16, pts=[], labels=[];
    s.comments.forEach(function(c,i){
      var lon=cx+((c.lon||bx)-bx), lat=cy+((c.lat||by)-by);
      var cat=CAT[c.category]||{color:'#94a3b8',icon:'💬',label:'General'};
      pts.push({type:'Feature',geometry:{type:'Point',coordinates:[lon,lat]},properties:{c:cat.color}});
      if(i<4) labels.push({lon:lon,lat:lat,color:cat.color,icon:cat.icon,title:(cat.label||'').toUpperCase(),sub:(c.comment||'').slice(0,38)+' (+'+((c.vote_up||0)-(c.vote_down||0))+')'});
    });
    this._safeAdd(map,'v8-part',{type:'geojson',data:{type:'FeatureCollection',features:pts}},{
      id:'v8-part-l',type:'circle',source:'v8-part',
      paint:{'circle-radius':['interpolate',['linear'],['zoom'],11,9,15,20],'circle-color':['get','c'],'circle-opacity':0.85,'circle-stroke-width':2.5,'circle-stroke-color':'#ffffff'}
    });
    this._partSnap=s;
    if(this._cinLabels) this._cinLabels(map, labels);
  },

  // ── SANATATE & ORAS DIGITAL — spital + hub digital
  _addServices(map, cityKey, city){
    if(!window._UrbanServices) return;
    var f=window._UrbanServices.buildFeatures(cityKey||this._cityKey||'RO-IS-01', city||this._city||{});
    if(f.pts && f.pts.length){
      this._safeAdd(map,'v8-srv',{type:'geojson',data:{type:'FeatureCollection',features:f.pts}},{
        id:'v8-srv-l',type:'circle',source:'v8-srv',
        paint:{'circle-radius':['interpolate',['linear'],['zoom'],11,8,15,18],'circle-color':['get','c'],'circle-opacity':0.9,'circle-stroke-width':2,'circle-stroke-color':'#f0fdfa'}
      });
    }
    if(this._cinLabels) this._cinLabels(map, f.labels||[]);
  },

  // ── EDUCATIE & SPORT — campus universitar + stadioane/arene
  _addVitality(map, cityKey, city){
    if(!window._UrbanVitality) return;
    var f=window._UrbanVitality.buildFeatures(cityKey||this._cityKey||'RO-IS-01', city||this._city||{});
    if(f.pts && f.pts.length){
      this._safeAdd(map,'v8-vit',{type:'geojson',data:{type:'FeatureCollection',features:f.pts}},{
        id:'v8-vit-l',type:'circle',source:'v8-vit',
        paint:{'circle-radius':['interpolate',['linear'],['zoom'],11,8,15,18],'circle-color':['get','c'],'circle-opacity':0.9,'circle-stroke-width':2,'circle-stroke-color':'#eef6ff'}
      });
    }
    if(this._cinLabels) this._cinLabels(map, f.labels||[]);
  },

  // ── CULTURA & TURISM — obiective (teatre/muzee/cetati) + Via Transilvanica
  _addTourism(map, cityKey, city){
    if(!window._UrbanTourism) return;
    var f=window._UrbanTourism.buildFeatures(cityKey||this._cityKey||'RO-IS-01', city||this._city||{});
    if(f.lines && f.lines.length){
      this._safeAdd(map,'v8-via',{type:'geojson',data:{type:'FeatureCollection',features:f.lines}},{
        id:'v8-via-l',type:'line',source:'v8-via',
        paint:{'line-color':['get','c'],'line-width':4,'line-opacity':0.9,'line-blur':0.4,'line-dasharray':[2,1.2]},layout:{'line-cap':'round'}
      });
    }
    if(f.pts && f.pts.length){
      this._safeAdd(map,'v8-cult',{type:'geojson',data:{type:'FeatureCollection',features:f.pts}},{
        id:'v8-cult-l',type:'circle',source:'v8-cult',
        paint:{'circle-radius':['interpolate',['linear'],['zoom'],11,7,15,16],'circle-color':['get','c'],'circle-opacity':0.92,'circle-stroke-width':2,'circle-stroke-color':'#fdf4ff'}
      });
    }
    this._tourMain=f.mainObj;
    if(this._cinLabels) this._cinLabels(map, f.labels||[]);
  },

  // ── #8/#9 FAUNA URBANA — hotspot-uri caini fara stapan + padocuri + risc ursi
  _addFauna(map, city){
    if(!window._UrbanFauna) return;
    var f=window._UrbanFauna.buildFeatures(city||this._city||{});
    if(f.pts && f.pts.length){
      this._safeAdd(map,'v8-fauna',{type:'geojson',data:{type:'FeatureCollection',features:f.pts}},{
        id:'v8-fauna-l',type:'circle',source:'v8-fauna',
        paint:{'circle-radius':['interpolate',['linear'],['zoom'],11,8,15,22],'circle-color':['get','c'],'circle-opacity':0.55,'circle-blur':0.4,'circle-stroke-width':2.5,'circle-stroke-color':['get','c']}
      });
    }
    if(this._cinLabels) this._cinLabels(map, f.labels||[]);
  },

  // ── VERDE + OAZE DE RACOARE + AER (model Singapore / regula 3-30-300) ──────
  // Insula de caldura urbana (heatmap rosu peste fondul construit dens) +
  // parcurile reale OSM ca OAZE DE RACOARE (verde, halo rece). Contrastul
  // rosu↔verde = modelul Singapore (coridoare verzi care racoresc orasul).
  _addGreenHeatOasis(map, green){
    const cx=this._city?.lon||25, cy=this._city?.lat||45.5;
    // 1) INSULA DE CALDURA — puncte ponderate pe intensitatea construita a UTR
    const hot=[];
    const fs=(this._pugGeo&&this._pugGeo.features)||[];
    if(fs.length){
      const step=Math.max(1,Math.floor(fs.length/600));
      for(let i=0;i<fs.length;i+=step){
        const c=this._cheapCentroid(fs[i].geometry); if(!c) continue;
        const u=String((fs[i].properties||{}).zf||(fs[i].properties||{}).utr||'').toUpperCase();
        // construit dens/central = caldura mare; verde/agricol = racoare
        let w=0.45;
        if(u.indexOf('CC')===0||u.indexOf('CP')===0||u.indexOf('CA')===0||u.indexOf('M')===0) w=1.0;     // central/mixt
        else if(u.indexOf('L')===0) w=0.8;                                                                  // locuire colectiva/individuala
        else if(u.indexOf('A')===0||u.indexOf('IS')===0) w=0.6;                                             // activitati/servicii
        else if(u.indexOf('V')===0||u.indexOf('TE')===0||u.indexOf('G')===0||u.indexOf('P')===0) w=0.08;   // verde/perdele/agro
        hot.push({type:'Feature',geometry:{type:'Point',coordinates:c},properties:{w}});
      }
    } else {
      for(let i=0;i<220;i++){ const a=Math.random()*Math.PI*2,r=Math.random()*0.04; hot.push({type:'Feature',geometry:{type:'Point',coordinates:[cx+Math.cos(a)*r*1.4,cy+Math.sin(a)*r]},properties:{w:1-r/0.05}}); }
    }
    this._safeAdd(map,'v8-uhi',{type:'geojson',data:{type:'FeatureCollection',features:hot}},{
      id:'v8-uhi-l',type:'heatmap',source:'v8-uhi',
      paint:{
        'heatmap-weight':['get','w'],
        'heatmap-intensity':['interpolate',['linear'],['zoom'],10,1,15,2.6],
        'heatmap-color':['interpolate',['linear'],['heatmap-density'],0,'rgba(0,0,0,0)',0.25,'rgba(250,204,21,0.35)',0.5,'rgba(249,115,22,0.6)',0.78,'rgba(239,68,68,0.82)',1,'rgba(190,18,60,0.92)'],
        'heatmap-radius':['interpolate',['linear'],['zoom'],10,18,14,38],
        'heatmap-opacity':0.0
      }
    });
    try{ map.setPaintProperty('v8-uhi-l','heatmap-opacity',0.78); }catch(e){}
    // 2) OAZE DE RACOARE — parcurile reale, halo rece + miez verde (parcurile NUMITE primele)
    const _gName=g=>(g.properties&&g.properties.n)||g.n||'';
    const _named=(green||[]).filter(g=>{const n=_gName(g); return n && !/^(parc|spatiu verde|spațiu verde)$/i.test(n.trim());});
    const _other=(green||[]).filter(g=>{const n=_gName(g); return !n || /^(parc|spatiu verde|spațiu verde)$/i.test(n.trim());});
    const gp=_named.concat(_other).slice(0,80);
    // expune parcurile numite pt camera (zoom pe parcuri reale)
    this._greenParks=_named.slice(0,5).map(g=>{const co=(g.geometry&&g.geometry.coordinates)||[g.lon,g.lat]; return {lon:co[0],lat:co[1],n:_gName(g)};});
    if(gp.length){
      const gf=gp.map(g=>{ const co=(g.geometry&&g.geometry.coordinates)||[g.lon,g.lat]; return {type:'Feature',geometry:{type:'Point',coordinates:co},properties:{n:(g.properties&&g.properties.n)||g.n||'Spatiu verde'}}; });
      // halo rece (efectul de racoare ~ -3..-7°C in jurul parcului)
      this._safeAdd(map,'v8-oasis-h',{type:'geojson',data:{type:'FeatureCollection',features:gf}},{
        id:'v8-oasis-h-l',type:'circle',source:'v8-oasis-h',
        paint:{'circle-radius':['interpolate',['linear'],['zoom'],11,18,15,46],'circle-color':'#22d3ee','circle-opacity':0.16,'circle-blur':1}
      });
      // miez verde
      this._safeAdd(map,'v8-oasis',{type:'geojson',data:{type:'FeatureCollection',features:gf}},{
        id:'v8-oasis-l',type:'circle',source:'v8-oasis',
        paint:{'circle-radius':['interpolate',['linear'],['zoom'],11,5,15,13],'circle-color':'#22c55e','circle-opacity':0.92,'circle-stroke-width':2,'circle-stroke-color':'#ecfdf5'}
      });
    }
    // 3) ETICHETE — cele mai mari parcuri + panou model 3-30-300 / norma UE aer
    const labels=[];
    gp.slice(0,4).forEach(g=>{ const co=(g.geometry&&g.geometry.coordinates)||[g.lon,g.lat]; if(co&&co.length>=2) labels.push({lon:co[0],lat:co[1],color:'#22c55e',icon:'🌳',title:((g.properties&&g.properties.n)||g.n||'Parc').slice(0,22),sub:'oaza de racoare −3..−7°C'}); });
    labels.push({lon:cx, lat:cy+0.052, color:'#ef4444', icon:'🌡', title:'INSULA DE CALDURA', sub:'fond construit dens = +4..+8°C vara'});
    labels.push({lon:cx, lat:cy-0.052, color:'#22d3ee', icon:'🍃', title:'REGULA 3-30-300', sub:'3 arbori vizibili · 30% canopy · 300 m la parc'});
    labels.push({lon:cx, lat:cy-0.070, color:'#a3e635', icon:'🌬', title:'AER — NORMA UE', sub:'PM2.5 tinta 10 µg/m³ (Dir. 2024/2881) vs 25 azi'});
    if(this._cinLabels) this._cinLabels(map, labels);
  },

  // Protejeaza canvas-ul — il re-adauga daca e sters de platforma
  _guardCanvas(){
    if(this._canvasObserver)this._canvasObserver.disconnect();
    const self=this;
    this._canvasObserver=new MutationObserver(()=>{
      if(!self._playing)return;
      if(!document.getElementById('tci-c8')){
        console.warn('[v8] Canvas sters — re-adaug');
        const c=self._canvas;
        if(c)document.documentElement.appendChild(c);
      }
    });
    this._canvasObserver.observe(document.body,{childList:true,subtree:false});
  },

  _cleanLayers(){
    const map=this._map;if(!map)return;
    if(this._clearCinLabels) this._clearCinLabels(); // sterge etichetele HTML la schimbarea scenei
    try{ if(this._growInt){ clearInterval(this._growInt); this._growInt=null; } }catch(e){}
    ['cin-grow-bld','cin-osm-bld','v8-gr-l','v8-gr','v8-bld-l','v8-bld','v8-ht-l','v8-ht',
     'v8-tr-l','v8-tr','v8-trp-l','v8-trp','v8-tp-l','v8-tp','v8-sei-l','v8-sei','v8-risc-l','v8-risc',
     'v8-fl-l','v8-fl','v8-aut-l','v8-aut','v8-ex-line','v8-ex-l','v8-ex','v8-inf-l','v8-inf',
     'v8-mp-ring-l','v8-mp-ring','v8-mp-rail-l','v8-mp-rail','v8-mp-stn-l','v8-mp-stn',
     'v8-mp-zone-line','v8-mp-zone-l','v8-mp-zone','v8-mp-green-l','v8-mp-green','v8-mp-pass-l','v8-mp-pass',
     'v8-dp-l','v8-dp','v8-tp2-l','v8-tp2','v8-fi-cur-l','v8-fi-cur','v8-fi-fut-fill','v8-fi-fut-l','v8-fi-fut',
     'v8-mp-belt-l','v8-mp-belt','v8-mp-gwedge-l','v8-mp-gwedge',
     'v8-fi-2030-l','v8-fi-2030','v8-fi-2040-l','v8-fi-2040','v8-fi-2055-l','v8-fi-2055','v8-util-l','v8-util','v8-util-n-l','v8-util-n',
     'v8-proj-line-l','v8-proj-line','v8-proj-pt-l','v8-proj-pt',
     'v8-uhi-l','v8-uhi','v8-oasis-h-l','v8-oasis-h','v8-oasis-l','v8-oasis',
     'v8-ri-line-l','v8-ri-line','v8-ri-apt-l','v8-ri-apt',
     'v8-age-l','v8-age','v8-sc-l','v8-sc','v8-sc-h-l','v8-sc-h','v8-sc-w-l','v8-sc-w','v8-modal-l','v8-modal','v8-modal-c-l','v8-modal-c','v8-cost-l','v8-cost','v8-fauna-l','v8-fauna','v8-via-l','v8-via','v8-cult-l','v8-cult','v8-vit-l','v8-vit','v8-srv-l','v8-srv','v8-part-l','v8-part','v8-house-l','v8-house','v8-energy-l','v8-energy','v8-res-l','v8-res','v8-monz-l','v8-monz','v8-mon2-l','v8-mon2',
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
  window._CinemaEngine=G._CinemaEngine;
  window._SceneEngine=G._CinemaEngine;
  window._PredEngine=_PRED;
  console.log('[TCI Cinematic v8.0] ✅ Imersiv — harta e actorul');
  // Nu mai patchuim openTCI - cauzeaza interceptari
  window._launchCinema = (k) => G._CinemaEngine['launch'](k||G._CinemaEngine._getCityKey());
  ss('🎬 TCI v8.0 — imersiv · harta vie · orice UAT · INSE live');
})();

})(window);
