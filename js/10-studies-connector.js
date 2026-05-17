// Copyright (c) 2024-2026 ThinkSmart Solutions SRL | contact@urbanx.ro | Utilizare conform LICENSE
// ═══════════════════════════════════════════════════════════════════════════
// 10-studies-connector.js — Interceptor date live pentru toate studiile
// UrbanX TSS·FG
//
// STRATEGIE:
//   1. _prefetchStudyContext(lat, lon) — fetch paralel toate sursele live
//   2. window._sCtx — context global disponibil în orice studiu
//   3. _wrapAllStudies() — wrappează fiecare generateXxx cu prefetch automat
//   4. _pdfInjectLiveDataSection() — secțiune PDF "Date live utilizate"
//
// Astfel studiile existente primesc datele fără a fi rescrise.
// ═══════════════════════════════════════════════════════════════════════════
// UrbanX TSS·FG — Studies Connector — Interceptor date live
// Copyright (c) 2024–2026 ThinkSmart Solutions SRL — Toate drepturile rezervate
// Proprietar: ThinkSmart Solutions SRL | contact@urbanx.ro | urbanx.ro
// Utilizare exclusiv conform termenilor de licență UrbanX. Redistribuire interzisă.

// ── Context global al studiului curent ────────────────────────────────────
window._sCtx = null;

// ── Prefetch paralel toate sursele live ───────────────────────────────────
window._prefetchStudyContext = async function(lat, lon, opts){
  opts = opts||{};
  if(typeof ss==='function') ss('⏳ Se obțin date live (elevație, seism, GHI, curs BNR)...');

  const [elevData, cursData] = await Promise.all([
    typeof _getElevation==='function' ? _getElevation(lat, lon).catch(()=>null) : Promise.resolve(null),
    typeof _getBNRRate==='function'   ? _getBNRRate('EUR').catch(()=>null)       : Promise.resolve(null),
  ]);

  // Date calculate (sincron, din coordonate — fără latență)
  const seism  = typeof getSeismConfig  ==='function' ? getSeismConfig()  : null;
  const vant   = typeof getVantConfig   ==='function' ? getVantConfig()   : null;
  const zgomot = typeof getZgomotConfig ==='function' ? getZgomotConfig() : null;
  const hidro  = typeof getHidroConfig  ==='function' ? getHidroConfig()  : null;
  const trafic = typeof getTraficConfig ==='function' ? getTraficConfig() : null;
  const eim    = typeof getEIMConfig    ==='function' ? getEIMConfig()    : null;
  const aeroport=typeof getAeroprtConfig==='function' ? getAeroprtConfig(): null;
  const hdd    = typeof _calcHDD        ==='function' ? _calcHDD(lat,lon) : null;
  const ghi    = typeof _calcSolarGHI   ==='function' ? _calcSolarGHI(lat,lon) : null;
  const ols    = typeof _calcAACROLS    ==='function' && opts.aacr
                 ? _calcAACROLS(lat, lon, elevData?.elev||80, opts.aedisH||12) : null;

  const ctx = {
    lat, lon,
    elev:    elevData?.elev    ?? null,
    elevSrc: elevData?.source  ?? 'neobținut',
    elevConf:elevData?.confidence ?? 0,
    curs:    cursData?.rate    ?? null,
    cursSrc: cursData ? 'BNR live' : 'fallback 5.05',
    seism, vant, zgomot, hidro, trafic, eim, aeroport, hdd, ghi, ols,
    dateStr: new Date().toLocaleDateString('ro-RO',{day:'2-digit',month:'long',year:'numeric'}),
    timeStr: new Date().toLocaleTimeString('ro-RO',{hour:'2-digit',minute:'2-digit'}),
    ts:      Date.now(),
  };

  window._sCtx = ctx;
  if(typeof ss==='function')
    ss('✅ Date live obținute: elev='+
      (ctx.elev!==null?ctx.elev.toFixed(1)+'m':'—')+
      ', seism='+ctx.seism?.zona+
      ', curs='+(ctx.curs?ctx.curs.toFixed(4):'5.05')+' RON/EUR'+
      ', GHI='+(ctx.ghi||'—')+' kWh/m²·an');
  return ctx;
};

// ── Secțiune PDF "Date live utilizate" ────────────────────────────────────
window._pdfInjectLiveDataSection = function(pdf, W, cy, ctx){
  if(!ctx) return cy;
  const DARK2=[11,24,50], GOLD=[196,146,6], NAVY=[14,36,72], LIGHT=[248,250,253];
  const GRAY2=[138,150,166], GOLD2=[228,182,48];
  const S2 = typeof _pdfSafe==='function' ? _pdfSafe : t=>String(t||'—');

  // Header secțiune
  pdf.setFillColor(...NAVY); pdf.rect(14, cy, W-28, 9, 'F');
  pdf.setFillColor(...GOLD); pdf.rect(14, cy, 3, 9, 'F');
  pdf.setFillColor(...GOLD2); pdf.rect(14, cy+9, W-28, 0.5, 'F');
  pdf.setTextColor(255,255,255); pdf.setFontSize(8.5); pdf.setFont('helvetica','bold');
  pdf.text('DATE LIVE UTILIZATE — TOATE VALORILE OBȚINUTE AUTOMAT LA DATA ELABORĂRII', 20, cy+6.2);
  cy += 14;

  // Grila KPI-uri live
  const kw4 = (W-28)/4;
  const kvSmall = (label, val, src, x, yy, w, accentCol)=>{
    pdf.setFillColor(...DARK2); pdf.rect(x, yy, w, 16, 'F');
    pdf.setFillColor(...(accentCol||GOLD)); pdf.rect(x, yy, w, 1.5, 'F');
    pdf.setTextColor(...(accentCol||GOLD2)); pdf.setFontSize(6); pdf.setFont('helvetica','bold');
    pdf.text(S2(label).toUpperCase(), x+2.5, yy+5.5);
    pdf.setTextColor(255,255,255); pdf.setFontSize(9); pdf.setFont('helvetica','bold');
    pdf.text(S2(String(val||'—')).substring(0,18), x+2.5, yy+11.5);
    pdf.setTextColor(...GRAY2); pdf.setFontSize(5); pdf.setFont('helvetica','normal');
    pdf.text(S2(src||'').substring(0,30), x+2.5, yy+14.5);
  };

  const items = [
    ['Cotă teren AMSL', ctx.elev!==null?(ctx.elev.toFixed(1)+'m'):'—',
      S2(ctx.elevSrc), [0,150,120]],
    ['Curs EUR/RON', ctx.curs?(ctx.curs.toFixed(4)+' RON'):'5.0500',
      ctx.cursSrc, ctx.curs?[14,100,50]:[168,76,4]],
    ['Zonă seismică', ctx.seism?('Zona '+ctx.seism.zona+' ag='+ctx.seism.ag+'g'):'—',
      'P100-1/2013', [200,80,20]],
    ['Grade-zile HDD', ctx.hdd?(ctx.hdd+' K·zile'):'—',
      'SR EN 15927-6 + INMH', [59,130,246]],
    ['GHI solar', ctx.ghi?(ctx.ghi+' kWh/m²·an'):'—',
      'PVGIS 5.3 (JRC)', [200,130,10]],
    ['Zonă vânt', ctx.vant?('Zona '+ctx.vant.zona+' vref='+ctx.vant.v_ref+'m/s'):'—',
      'CR 1-1-4/2012', [100,80,200]],
    ['Zgomot UTR', ctx.zgomot?('Lzsn≤'+ctx.zgomot.Lzsn_limita+'dB(A)'):'—',
      'SR 10009:2017', [150,60,60]],
    ['Data elaborare', ctx.dateStr+' '+ctx.timeStr,
      'Generare automată', [0,100,60]],
  ];

  items.forEach((item, i)=>{
    const col = i%4, row = Math.floor(i/4);
    kvSmall(item[0], item[1], item[2], 14+col*kw4, cy+row*20, kw4-2, item[3]);
  });
  cy += 44;

  // Disclaimer data
  pdf.setFillColor(14, 25, 50); pdf.rect(14, cy, W-28, 8, 'F');
  pdf.setFillColor(...GOLD); pdf.rect(14, cy, 2, 8, 'F');
  pdf.setTextColor(170,185,210); pdf.setFontSize(5.8); pdf.setFont('helvetica','normal');
  const disc = 'Date live UrbanX TSS·FG · Cotă '+
    (ctx.elev!==null?ctx.elev.toFixed(1)+'m AMSL ('+S2(ctx.elevSrc)+') · ':'elev. neobținut · ')+
    'Curs BNR: '+(ctx.curs?ctx.curs.toFixed(4):'5.0500')+' RON/EUR ('+ctx.cursSrc+') · '+
    'Seism P100-1/2013: Zona '+ctx.seism?.zona+', ag='+ctx.seism?.ag+'g · '+
    'Elaborat: '+ctx.dateStr+' '+ctx.timeStr+' · Document orientativ UrbanX TSS·FG';
  pdf.text(S2(disc), 17, cy+5.5, {maxWidth:W-32});
  cy += 11;
  return cy;
};

// ── Wrapper automat pentru fiecare studiu ─────────────────────────────────
window._wrapAllStudies = function(){
  // FIX: lista completă — adăugate generateAACR, CPE, PMR, Iluminat, REPA, ApePluviale
  const studyNames = [
    'generateShadowStudy','generateNoiseStudy','generateWindStudy',
    'generateGreenStudy','generateMobilityStudy','generateDensityStudy',
    'generateMemoriu','generateExistingBldStudy',
    'generateGeotehnicalStudy','generateTrafficStudy','generateSSF',
    'generateEnvironmentalImpact','generateIstoricStudy','generateSolarStudy',
    'generateStudiuAmplasament','generateStudiuFezabilitate','generateWaterStudy',
    'generatePrestudiuBransamente','generateHealthImpactStudy',
    'generateStabilitateTaluzuri','generateProiectieUrbanistica',
    'generateBilantEdificabil','generateSeismicStudy',
    // Adăugate în fix:
    'generateAACR','generateCPE',
    'generateStudiuPMR','generateStudiuIluminat','generateREPA','generateStudiuApePluviale',
  ];

  let wrapped = 0;
  studyNames.forEach(name=>{
    const orig = window[name];
    if(typeof orig !== 'function') return;
    window[name] = async function(...args){
      // Obținem coordonatele active
      const ap  = window.S?.parcels?.[window.S?.activeParcel??0];
      let lat=45.9, lon=24.9;
      try{
        if(ap?.geo?.geometry){
          const c=typeof turf!=='undefined'
            ?turf.centerOfMass(ap.geo).geometry.coordinates
            :ap.geo.geometry.coordinates[0][0];
          if(!isNaN(c[0])){ lon=c[0]; lat=c[1]; }
        }
      }catch(e){}

      // Prefetch cu timeout de 8s — dacă durează prea mult, continuăm cu _sCtx=null
      const aedisH=window.S?.vol?._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0)||12;
      try{
        await Promise.race([
          _prefetchStudyContext(lat, lon, { aacr: name==='generateAACR', aedisH }),
          new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout')), 8000))
        ]);
      }catch(e){
        if(e.message !== 'timeout') console.warn('[Connector] prefetch err:', e.message);
        // Continuăm cu datele parțiale deja în _sCtx
      }
      // Rulăm studiul original — _sCtx este populat (sau null la timeout)
      return orig.apply(this, args);
    };
    wrapped++;
  });
  console.log('[Connector] ✅ '+wrapped+'/'+studyNames.length+' studii wrapped cu prefetch live');
};

// ── Patch-uri specifice pentru studii care NU citesc cotă/seism ──────────
// Injectăm datele live ca globals care studiile le pot accesa

// PATCH: generateShadowStudy — adaugă cotă teren + seism
(function(){
  const orig = window.generateShadowStudy;
  if(!orig) return;
  window.generateShadowStudy = async function(){
    return orig.apply(this, arguments);
    // _sCtx.elev și _sCtx.seism sunt disponibile via window._sCtx
    // dar studiul nu le citește explicit — le injectăm prin _pdfInjectLiveDataSection
    // care se apelează la finalul wrap-ului
  };
})();

// PATCH PRINCIPAL: după fiecare studiu, adăugăm pagina "Date live"
// Folosim o abordare diferită: înainte de _pdfSaveMobile, injectăm pagina

// Override _pdfSaveMobile să adauge pagina de date live înainte de salvare
const _origPdfSaveMobile = window._pdfSaveMobile;
window._pdfSaveMobile = function(pdf, filename){
  if(window._sCtx && pdf){
    try{
      // Adăugăm pagina de date live ca ultima pagină
      pdf.addPage();
      const W = pdf.internal.pageSize.getWidth();
      const H = pdf.internal.pageSize.getHeight();
      const DARK=[5,14,30], GOLD=[196,146,6], LIGHT=[248,250,253];

      pdf.setFillColor(...LIGHT); pdf.rect(0,0,W,H,'F');

      // Header
      pdf.setFillColor(...DARK); pdf.rect(0,0,W,28,'F');
      pdf.setFillColor(...GOLD); pdf.rect(0,0,W,2.5,'F'); pdf.rect(0,27,W,1,'F');
      pdf.setTextColor(...GOLD); pdf.setFontSize(9); pdf.setFont('helvetica','bold');
      pdf.text('TRANSPARENȚĂ DATE — SURSE ȘI METODOLOGIE',W/2,18,{align:'center'});

      let cy = 33;
      cy = _pdfInjectLiveDataSection(pdf, W, cy, window._sCtx);

      // Tabel surse de date
      const S2 = typeof _pdfSafe==='function'?_pdfSafe:t=>String(t||'—');
      cy += 4;
      pdf.setFillColor(14,36,72); pdf.rect(14,cy,W-28,9,'F');
      pdf.setFillColor(...GOLD); pdf.rect(14,cy,3,9,'F');
      pdf.setTextColor(255,255,255); pdf.setFontSize(8.5); pdf.setFont('helvetica','bold');
      pdf.text('CATALOG SURSE DATE — ACTUALIZARE ȘI METODOLOGIE', 20, cy+6.2); cy+=14;

      const rows=[
        ['Cotă teren AMSL',S2(window._sCtx.elevSrc),'La fiecare generare','Mapbox/OpenTopo/SRTM'],
        ['Curs EUR/RON',window._sCtx.curs?window._sCtx.curs.toFixed(4)+' RON':'5.0500','Zilnic (BNR API)','BNR bnr.ro/api'],
        ['Zonare seismică','P100-1/2013 Zona '+S2(window._sCtx.seism?.zona),'La rev. standard (~5-10 ani)','MLPDA + INCERC'],
        ['Grade-zile HDD',S2(window._sCtx.hdd)+' K·zile','La rev. date climatice','INMH + SR EN 15927-6'],
        ['Iradiere solară GHI',S2(window._sCtx.ghi)+' kWh/m²·an','La rev. PVGIS (~2 ani)','JRC PVGIS 5.3'],
        ['Zonare vânt CR 1-1-4','Zona '+S2(window._sCtx.vant?.zona),'La rev. standard','INCERC + CR 1-1-4/2012'],
        ['Parametri UTR','Din PUG/CU emis de Primărie','La fiecare operație','ANCPI + Primărie locală'],
        ['Operatori utilități','Verificare ANRSC locală','Verificare manuală','ANRSC anrsc.ro'],
        ['Aeroporturi (OLS)','AIP Romania 2024','La rev. AIP (~6 luni)','ROMATSA romatsa.ro'],
        ['Costuri construcție','±30% estimare orientativă','Anual (INSSE)','INSSE ins.ro indici construcții'],
      ];

      const cw=[55,50,45,W-28-55-50-45];
      try{
        pdf.setFillColor(14,36,72); pdf.rect(14,cy-5.5,W-28,9,'F');
        pdf.setFillColor(...GOLD); pdf.rect(14,cy-5.5,3,9,'F');
        pdf.setTextColor(228,182,48); pdf.setFontSize(7.5); pdf.setFont('helvetica','bold');
        ['Categorie date','Valoare utilizată','Frecv. actualizare','Sursa'].forEach((t,i)=>{
          const x=14+cw.slice(0,i).reduce((a,b)=>a+b,0)+(i===0?5:3);
          pdf.text(t,x,cy);
        });
        cy+=4;
      }catch(e){}

      rows.forEach((row,ri)=>{
        const bg=ri%2===0?[248,250,253]:[240,244,250];
        pdf.setFillColor(...bg); pdf.rect(14,cy-5.5,W-28,8.5,'F');
        row.forEach((cell,ci)=>{
          const x=14+cw.slice(0,ci).reduce((a,b)=>a+b,0)+3;
          pdf.setTextColor(26,38,56); pdf.setFontSize(8); pdf.setFont('helvetica','normal');
          pdf.text(S2(String(cell||'—')).substring(0,40),x,cy);
        });
        cy+=8.5;
        if(cy>H-20){ pdf.addPage(); pdf.setFillColor(...LIGHT); pdf.rect(0,0,W,H,'F'); cy=20; }
      });

      cy+=6;
      // Disclaimer final
      pdf.setFillColor(5,14,30); pdf.rect(14,cy,W-28,20,'F');
      pdf.setFillColor(...GOLD); pdf.rect(14,cy,W-28,1.5,'F'); pdf.rect(14,cy,2,20,'F');
      pdf.setTextColor(170,185,210); pdf.setFontSize(6); pdf.setFont('helvetica','normal');
      const disc2='Document generat de UrbanX TSS·FG la '+S2(window._sCtx.dateStr)+' '+
        S2(window._sCtx.timeStr)+'. Toate valorile sunt orientative și trebuie verificate '+
        'cu specialiști autorizați înainte de utilizare în documentații tehnice (Legea 50/1991, '+
        'Legea 10/1995). Operatorii de utilități, parametrii PUG și alte date specifice UAT '+
        'se verifică la Primăria localității și la operatorii locali. '+
        'Data elaborare se actualizează automat la fiecare generare a documentului.';
      const discLines = pdf.splitTextToSize(disc2, W-32);
      discLines.forEach((l,li)=>{ pdf.text(l, 17, cy+6+li*5); });
    }catch(e){
      console.warn('[Connector] Eroare pagina date live:', e.message);
    }
  }
  // Salvăm PDF-ul original
  return _origPdfSaveMobile?.(pdf, filename);
};

// ── Activare la DOMContentLoaded ──────────────────────────────────────────
function _activateConnector(){
  setTimeout(()=>{
    _wrapAllStudies();
    console.log('[Connector] ✅ Interceptor activ — toate studiile folosesc date live');
  }, 3000); // delay pentru a permite încărcarea tuturor modulelor
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded', _activateConnector);
} else {
  _activateConnector();
}
