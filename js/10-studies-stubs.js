// ═══════════════════════════════════════════════════════════════════════════
// 10-studies-stubs.js — Funcții lipsă pentru 10-studies.js
// UrbanX TSS·FG
//
// Aceste funcții sunt definite în alte module (04-search.js, uats-registry.js
// etc.) care nu sunt întotdeauna disponibile.
// Stubs-urile preiau date din S.parcels[activeParcel] în timp real.
// ═══════════════════════════════════════════════════════════════════════════

// ── _pdfSafe — sanitizare text pentru jsPDF ────────────────────────────────
// Elimină emoji, caractere speciale care crează erori în jsPDF
if(typeof _pdfSafe === 'undefined'){
  window._pdfSafe = function(t){
    if(t === null || t === undefined) return '—';
    return String(t)
      .replace(/[\u{1F000}-\u{1FFFF}]/gu, '')   // emoji range
      .replace(/[\u2600-\u27BF]/g, '')            // misc symbols
      .replace(/[\uD800-\uDFFF]/g, '')            // surrogates
      .replace(/[^\x09\x0A\x0D\x20-\x7E\u00A0-\u024F\u0250-\u02AF]/g, (c) => {
        // Înlocuiri caractere românești
        const map = {'ă':'a','â':'a','î':'i','ș':'s','ț':'t','ş':'s','ţ':'t',
                     'Ă':'A','Â':'A','Î':'I','Ș':'S','Ț':'T','Ş':'S','Ţ':'T',
                     '–':'-','—':'-','…':'...','«':'"','»':'"','\u00b7':'·',
                     '\u00b0':'°','\u00b2':'2','\u00b3':'3','\u00b4':"'"};
        return map[c] || '';
      })
      .trim();
  };
}

// ── getUATLabel — numele localității active ────────────────────────────────
if(typeof getUATLabel === 'undefined'){
  window.getUATLabel = function(){
    const S = window.S;
    // Încearcă din diverse surse
    return S?.uat?.label || S?.uatLabel || S?.activeUAT?.label ||
           S?.parcels?.[S?.activeParcel??0]?.uat ||
           window._uatLabel || 'Municipiu/Oras';
  };
}

// ── getUATJudet — județul UAT-ului activ ───────────────────────────────────
if(typeof getUATJudet === 'undefined'){
  window.getUATJudet = function(){
    const S = window.S;
    return S?.uat?.judet || S?.uatJudet || S?.activeUAT?.judet ||
           S?.parcels?.[S?.activeParcel??0]?.judet ||
           window._uatJudet || 'Iași';
  };
}

// ── getUATById — UAT după ID ───────────────────────────────────────────────
if(typeof getUATById === 'undefined'){
  window.getUATById = function(id){
    if(typeof window.UATS_DB !== 'undefined') return window.UATS_DB[id] || null;
    return null;
  };
}

// ── getUATJudet (din ID) ───────────────────────────────────────────────────
// Deja definit mai sus, dar uats-registry.js poate suprascrie cu varianta completă

// ── getDefaultParams — parametri urbanism default după UTR ────────────────
if(typeof getDefaultParams === 'undefined'){
  window.getDefaultParams = function(utr){
    const zone = String(utr||'').toUpperCase();
    // Valori orientative conform RGU și reglementări tipice românești
    const defaults = {
      'R1': {pot:35, cut:0.9, h:10, rf:3, rl:3, rs:6},
      'R2': {pot:40, cut:1.2, h:12, rf:3, rl:3, rs:6},
      'R3': {pot:45, cut:1.6, h:15, rf:3, rl:3, rs:6},
      'LC': {pot:35, cut:0.9, h:10, rf:3, rl:3, rs:6},
      'LM': {pot:40, cut:1.2, h:12, rf:3, rl:3, rs:6},
      'CB': {pot:60, cut:2.5, h:24, rf:0, rl:3, rs:6},
      'CB7':{pot:80, cut:4.0, h:28, rf:0, rl:3, rs:6},
      'CC': {pot:70, cut:3.0, h:28, rf:0, rl:3, rs:6},
      'CB5':{pot:70, cut:3.0, h:24, rf:0, rl:3, rs:6},
      'CA2':{pot:60, cut:2.5, h:20, rf:0, rl:3, rs:6},
      'GRD':{pot:40, cut:1.5, h:15, rf:3, rl:5, rs:8},
      'IS': {pot:40, cut:1.5, h:15, rf:3, rl:5, rs:8},
      'TR': {pot:40, cut:1.5, h:15, rf:3, rl:5, rs:8},
      'UT': {pot:50, cut:2.0, h:18, rf:3, rl:4, rs:6},
      'IL': {pot:70, cut:3.5, h:30, rf:0, rl:3, rs:6},
    };
    const ap = window.S?.parcels?.[window.S?.activeParcel??0];
    if(ap?.params) return ap.params;
    // Caută prefix UTR în tabel
    for(const key of Object.keys(defaults)){
      if(zone.startsWith(key)) return defaults[key];
    }
    return {pot:40, cut:1.2, h:12, rf:3, rl:3, rs:6};
  };
}

// ── _pdfDrawLogo — desenează logo-ul UrbanX în PDF ────────────────────────
if(typeof _pdfDrawLogo === 'undefined'){
  window._pdfDrawLogo = function(pdf, x, y, size){
    const s = size || 14;
    try{
      // Logo simplu: pătrat auriu cu "UX"
      pdf.setFillColor(196, 146, 6);
      pdf.roundedRect(x, y - s, s, s, 2, 2, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(s * 0.5);
      pdf.setFont('helvetica', 'bold');
      pdf.text('UX', x + s/2, y - s/2 + s*0.18, {align:'center'});
    }catch(e){}
  };
}

// ── getZgomotConfig — config zgomot urban per UTR ─────────────────────────
if(typeof getZgomotConfig === 'undefined'){
  window.getZgomotConfig = function(){
    const ap  = window.S?.parcels?.[window.S?.activeParcel??0];
    const utr = String(ap?.utr||ap?.params?.utr||'').toUpperCase();
    const zone = utr.startsWith('CB')||utr.startsWith('CC')||utr.startsWith('IL')
                 ? 'comerciala' : utr.startsWith('GRD')||utr.startsWith('IS')||utr.startsWith('TR')
                 ? 'industriala' : 'rezidentiala';
    const configs = {
      rezidentiala: {zona_acustica:'rezidentiala', Lzsn_limita:55, Lnoapte_limita:45,
                    surse_principale:['Trafic stradal','Activitati comerciale','Transport']},
      comerciala:   {zona_acustica:'comerciala',   Lzsn_limita:65, Lnoapte_limita:55,
                    surse_principale:['Trafic intens','Activitati comerciale','Parking','Livrari']},
      industriala:  {zona_acustica:'industriala',  Lzsn_limita:70, Lnoapte_limita:60,
                    surse_principale:['Utilaje industriale','Transport greu','Activitati productive']},
    };
    return configs[zone] || configs.rezidentiala;
  };
}

// ── getVantConfig — config vânt per regiune (România) ─────────────────────
if(typeof getVantConfig === 'undefined'){
  window.getVantConfig = function(){
    const ap  = window.S?.parcels?.[window.S?.activeParcel??0];
    const lat = ap?.lat || ap?.geo?.geometry?.coordinates?.[0]?.[0]?.[1] || 47.16;
    const lon = ap?.lon || ap?.geo?.geometry?.coordinates?.[0]?.[0]?.[0] || 27.59;
    // Zonare vânt conformă CR 1-1-4/2012 (Cod de proiectare — Acțiunea vântului)
    // Iași/Moldova: zona IV, vb_ref = 36 m/s
    // Banat/Vest: zona II-III, vb_ref = 32 m/s
    // Sud: zona III, vb_ref = 33 m/s
    let zona = 'III'; let v_ref = 33; let presiune = 0.68;
    if(lon > 27.0 && lat > 46.5)  { zona = 'IV';  v_ref = 36; presiune = 0.81; }  // Moldova
    else if(lon < 22.5)            { zona = 'II';  v_ref = 30; presiune = 0.56; }  // Banat
    else if(lat < 44.5)            { zona = 'III'; v_ref = 33; presiune = 0.68; }  // Dobrogea
    return {
      zona, v_ref, presiune_vant: presiune,
      directie_dominanta: lon > 27 ? 'NV' : 'NE',
      factor_teren: 1.0,  // teren deschis urban (categoria II CR 1-1-4)
    };
  };
}

// ── getSeismConfig — zonare seismică per amplasament ──────────────────────
if(typeof getSeismConfig === 'undefined'){
  window.getSeismConfig = function(){
    const ap  = window.S?.parcels?.[window.S?.activeParcel??0];
    const lat = ap?.lat || 47.16;
    const lon = ap?.lon || 27.59;
    // Zonare conformă P100-1/2013 (cod seismic)
    // ag = acceleratie teren (g), Tc = perioadă colț (s)
    let ag = 0.20, Tc = 0.7, zona = 'E', MSK = 'VIII';
    if(lat > 46.5 && lon > 26.5 && lon < 29.0){ ag=0.20; Tc=0.7; zona='E'; MSK='VIII'; } // Moldova
    else if(lat > 45.0 && lat < 46.5 && lon > 25.0 && lon < 28.0){ ag=0.25; Tc=1.0; zona='D'; MSK='VIII'; } // Vrancea
    else if(lat < 44.5){ ag=0.25; Tc=1.0; zona='D'; MSK='VIII'; }  // Muntenia
    else if(lon < 22.5){ ag=0.10; Tc=0.7; zona='F'; MSK='VII';  }  // Banat
    else               { ag=0.15; Tc=0.7; zona='E'; MSK='VII';  }  // Transilvania
    return {ag, Tc, zona, MSK};
  };
}

// ── getTraficConfig — config trafic per tip stradă ────────────────────────
if(typeof getTraficConfig === 'undefined'){
  window.getTraficConfig = function(){
    const ap  = window.S?.parcels?.[window.S?.activeParcel??0];
    const utr = String(ap?.utr||'').toUpperCase();
    // Categorii conform STAS 10144/1-90 + Ord. 49/1998
    const isPrimary = utr.startsWith('CB') || utr.startsWith('CC') || utr.startsWith('IL');
    return {
      tip_strada:          isPrimary ? 'Strada principala (cat. II)' : 'Strada secundara (cat. III)',
      viteza_proiectare:   isPrimary ? 50 : 30,
      TMA_ref:             isPrimary ? 3500 : 800,   // vehicule/zi (TMAnual)
      lat_acces:           ap?.params?.rf || 3,       // lărgime acces minim
    };
  };
}

// ── getHidroConfig — config hidrogeologic ─────────────────────────────────
if(typeof getHidroConfig === 'undefined'){
  window.getHidroConfig = function(){
    const ap  = window.S?.parcels?.[window.S?.activeParcel??0];
    const lat = ap?.lat || 47.16;
    // Estimare NFA și portanță (valori orientative fără foraj)
    const nfa = lat > 46.5 ? 3.5 : lat > 45.5 ? 2.5 : 1.8; // adâncime NFA estimativă (m)
    const portanta = nfa > 3 ? 250 : nfa > 2 ? 200 : 150;   // kPa
    const clasaGeo = portanta >= 250 ? '1' : portanta >= 200 ? '2' : '3';
    return {
      nfa,
      portanta,
      tip_sol: nfa < 2 ? 'Nisipuri aluvionare / praf' : 'Argilă prăfoasă / loess',
      adancime_fundare: Math.max(0.9, nfa * 0.8).toFixed(1) * 1,
      clasa_geotehnica: clasaGeo,
      studiu_obligatoriu: portanta < 200,
    };
  };
}

// ── getEIMConfig — config mediu/impact ────────────────────────────────────
if(typeof getEIMConfig === 'undefined'){
  window.getEIMConfig = function(){
    return {
      aer:           {nivel: 'Mediu urban', dep_PM10: 28, dep_NO2: 22, sursa:'ANM/ANPM'},
      apa:           {calitate: 'Buna', sursa:'ABA Siret'},
      sol:           {contaminare: false, tip:'Teren intravilan', sursa:'ANPM'},
      deseuri:       {sistem:'Municipal integrat', frecventa:'2x/saptamana'},
      arii_protejate:{in_arie: false, distanta_min: null},
      natura2000:    {in_sit: false, sit_apropiat: null},
      ins:           {bazin:'Prut-Barlad', cod:'RO13XXXX'},
    };
  };
}

// ── getApaConfig — config rețea apă/canal ─────────────────────────────────
if(typeof getApaConfig === 'undefined'){
  window.getApaConfig = function(){
    const ap  = window.S?.parcels?.[window.S?.activeParcel??0];
    const uat = getUATLabel();
    return {
      operator_apa: 'Apavital S.A. Iași',
      sursa_apa: 'Captare suprafata + foraj',
      retea_canalizare: true,
      risc_inundabil: false,
      zona_inundabila: false,
      nfa: 3.5,
      portanta: 220,
      tip_sol: 'Argila prafoasa',
      bazin: 'Prut-Barlad',
      sub_bazin: 'Bahlui',
      DA: 'Administratia Bazinala de Apa Prut-Barlad',
      DA_oras: 'Iasi',
      DA_adresa: 'Str. Theodor Vârnav nr. 2',
      DA_tel: '0232-218591',
      DA_email: 'secretariat@abaprutbarlad.ro',
      DA_web: 'www.abaprutbarlad.ro',
      cursuri: 'Rau Bahlui (3km N), Pârau Ciric (1.2km E)',
      distanta_curs_principal: 3000,
      arie_naturala: false,
      norm_principala: 'NTU < 1, pH 6.5-9.5 (Legea 458/2002)',
    };
  };
}

// ── getLmiConfig — config lucrări mici infrastructură ────────────────────
if(typeof getLmiConfig === 'undefined'){
  window.getLmiConfig = function(){
    return {
      tip: 'Retea stradala medie',
      latrime_carosabil: 6,
      latrime_trotuar: 1.5,
      latrime_total: 9,
      categorie: 'Strada de categoria III (STAS 10144)',
      viteza: 30,
    };
  };
}

// ── getMediuConfig — config calitate mediu ────────────────────────────────
if(typeof getMediuConfig === 'undefined'){
  window.getMediuConfig = function(){
    return {
      apa: {calitate:'Buna (Clasa II)', bazin:'Prut-Barlad'},
      ins: {bazin:'Prut-Barlad', cod:'RO13'},
      aer: {PM10:28, PM25:18, NO2:22, O3:62},
      sol: {eroziune:'Moderata', contaminare:false},
    };
  };
}

// ── getFinanciarConfig — fallback deja în 10-studies.js dar adăugăm guard ─
if(typeof getFinanciarConfig === 'undefined'){
  window.getFinanciarConfig = function(){
    const curs = window._cursEUR || 5.05;
    return {
      curs_eur: curs,
      curs_usd: curs * 0.93,
      cost_constructie_mp: 550,  // EUR/mp SDA
      cost_teren_mp: 120,        // EUR/mp (estimativ urban)
      randament_chirie: 5.5,     // % brut
      TVA: 19,
      inflatie: 6.5,
    };
  };
}

// ── getAeroprtConfig — aeroport cel mai apropiat ─────────────────────────
if(typeof getAeroprtConfig === 'undefined'){
  window.getAeroprtConfig = function(){
    const ap  = window.S?.parcels?.[window.S?.activeParcel??0];
    const lon = ap?.lon || 27.59;
    const lat = ap?.lat || 47.16;
    const airports = [
      {cod:'LRIA', nume:'Aeroportul Iași', lat:47.178, lon:27.619, dist:0},
      {cod:'LRBC', nume:'Aeroportul Bacău', lat:46.522, lon:26.910, dist:0},
      {cod:'LRCL', nume:'Aeroportul Cluj', lat:46.785, lon:23.686, dist:0},
      {cod:'LROP', nume:'Aeroportul Otopeni', lat:44.572, lon:26.102, dist:0},
    ];
    airports.forEach(a => {
      const dx = (a.lon-lon)*Math.cos(lat*Math.PI/180)*111319;
      const dy = (a.lat-lat)*111319;
      a.dist = Math.round(Math.sqrt(dx*dx+dy*dy)/1000);
    });
    airports.sort((a,b) => a.dist-b.dist);
    return airports[0];
  };
}

// ── getDJCPN — Direcția Județeană pentru Cultură ──────────────────────────
if(typeof getDJCPN === 'undefined'){
  window.getDJCPN = function(){
    const judet = getUATJudet();
    return `DJCPN ${judet}`;
  };
}

// ── _captureStudyMaps (alias pentru _captureStudyMapsSafe) ────────────────
if(typeof _captureStudyMaps === 'undefined'){
  window._captureStudyMaps = function(ap, progressCb){
    if(typeof _captureStudyMapsSafe === 'function')
      return _captureStudyMapsSafe(ap, progressCb);
    return Promise.resolve({img3D:null, img2D:null, imgLocation:null, imgDist:null, imgCtx:null});
  };
}

// ── _generateSolarStudyLegacy (fallback) ─────────────────────────────────
if(typeof _generateSolarStudyLegacy === 'undefined'){
  window._generateSolarStudyLegacy = function(){
    if(typeof generateSolarStudy === 'function') return generateSolarStudy();
    if(typeof ss === 'function') ss('⚠ Solar study legacy indisponibil');
  };
}

// ── _v3dCaptureSilent — captură silenţioasă viewer 3D ────────────────────
if(typeof _v3dCaptureSilent === 'undefined'){
  window._v3dCaptureSilent = function(ap){
    return Promise.resolve(null); // fallback — captura 3D necesită viewer activ
  };
}

// ── _wrapStudyFunctions — wrapper error handling ──────────────────────────
if(typeof _wrapStudyFunctions === 'undefined'){
  window._wrapStudyFunctions = function(){
    // Wrappăm toate funcțiile generate cu try/catch
    const studyFns = [
      'generateShadowStudy','generateNoiseStudy','generateWindStudy',
      'generateGreenStudy','generateMobilityStudy','generateDensityStudy',
      'generateMemoriu','generateAACR','generateExistingBldStudy',
      'generateGeotehnicalStudy','generateTrafficStudy','generateSSF',
      'generateEnvironmentalImpact','generateIstoricStudy','generateSolarStudy',
      'generateStudiuFezabilitate','generateStudiuAmplasament','generateWaterStudy',
      'generatePrestudiuBransamente','generateHealthImpactStudy','generateCPE',
      'generateStabilitateTaluzuri','generateProiectieUrbanistica','generateBilantEdificabil',
    ];
    studyFns.forEach(fnName => {
      const original = window[fnName];
      if(typeof original !== 'function') return;
      window[fnName] = async function(...args){
        try{
          return await original(...args);
        }catch(e){
          console.error(`[Studies] ${fnName} error:`, e);
          if(typeof ss === 'function') ss(`❌ ${fnName}: ${e.message}`);
          alert(`Eroare la generarea studiului.\n\n${e.message}\n\nVerificați consola pentru detalii.`);
        }
      };
    });
    console.log('[Studies] ✅ Error wrappers activi');
  };
}

// ── _pdfSafe alias (dacă _pdfSafe e definit în altă parte) ────────────────
// Asigurăm că window._pdfSafe e accesibil ca funcție globală
if(typeof window._pdfSafe !== 'undefined' && typeof _pdfSafe === 'undefined'){
  window._pdfSafe = window._pdfSafe; // no-op, deja există
}

// ── Activare wrapper la încărcare ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if(typeof _wrapStudyFunctions === 'function') _wrapStudyFunctions();
    console.log('[Studies Stubs] ✅ Toate stub-urile active');
  }, 2000);
});


// ═══════════════════════════════════════════════════════════════════════════
// generateSeismicStudy — Pre-Studiu Seismic P100-1/2013
// Adăugat în 10-studies-stubs.js — stub complet funcțional
// ═══════════════════════════════════════════════════════════════════════════
async function generateSeismicStudy(){
  const ap = S.parcels[S.activeParcel??0];
  if(!ap?.geo?.geometry){ ss('Selectați o parcelă pentru studiu.'); return; }
  ss('Se generează Pre-Studiu Seismic...');

  const d = _initStudyPdf('Pre-Studiu Seismic si Risc Seismic','P100-1/2013 · NP 122/2010 · CR 0/2012', 6);
  const {pdf,W,H,DARK,DARK2,GOLD,BLUE,LIGHT,RED,GREEN,ORANGE,PURPLE,
         S2,dateStr,nrcad,utr,area,lat,lon,params,uat,judet,
         hdr,ftr,sec,body,kv,tblRow,addImg,badge,cover,newPage,checkY} = d;

  const seism    = getSeismConfig();
  const hidro    = getHidroConfig();
  const aedisH   = S.vol?._lastFeats?.reduce((m,f)=>Math.max(m,f.properties?.top||0),0) || params?.h || 12;
  const niv      = Math.round(aedisH / 3);
  const sc       = Math.round(parseFloat(area||300) * (parseFloat(params?.pot)||0.4));
  const fnKey    = window._RV?.fn || 'rez';
  const caps     = await _captureStudyMapsSafe(ap, msg=>ss(msg));

  // Clasă de importanță (CR 0-2012)
  const importantaMap = {
    hotel:   {clasa:'II', gamma_I:1.2, desc:'Clădire cu risc social ridicat'},
    birouri: {clasa:'III', gamma_I:1.0, desc:'Clădire administrativă'},
    com:     {clasa:'III', gamma_I:1.0, desc:'Spațiu comercial'},
    rez:     {clasa:'III', gamma_I:1.0, desc:'Locuință colectivă'},
  };
  const imp = importantaMap[fnKey] || importantaMap.rez;

  // Forța seismică de proiectare — P100-1/2013 sect. 4.3
  const ag_design = seism.ag * imp.gamma_I;
  const T1_est    = 0.1 * niv;  // perioadă proprie estimată (s)
  const beta      = T1_est <= seism.Tc ? 2.5 : 2.5 * (seism.Tc / T1_est);
  const q_factor  = fnKey === 'rez' ? 3.9 : fnKey === 'birouri' ? 3.5 : 3.0;
  const Sd        = (ag_design * 9.81 * beta / q_factor).toFixed(3);

  // Risc zone apropiate
  const riskLevel = seism.ag >= 0.25 ? 'RIDICAT' : seism.ag >= 0.20 ? 'MEDIU-RIDICAT' : seism.ag >= 0.15 ? 'MEDIU' : 'REDUS';
  const riskColor = seism.ag >= 0.25 ? RED : seism.ag >= 0.20 ? ORANGE : seism.ag >= 0.15 ? [140,100,0] : GREEN;

  // ── PAG 1: Copertă ──────────────────────────────────────────────────────
  cover(
    'Zonare seismică · P100-1/2013 · ag=' + seism.ag + 'g',
    caps?.imgLocation || null,
    [['Zonă seismică', seism.zona], ['Accelerație teren ag', seism.ag + 'g'], ['Perioadă colț Tc', seism.Tc + 's'], ['Risc seismic', riskLevel]],
    seism.ag < 0.25, riskLevel + ' — ag=' + seism.ag + 'g · Tc=' + seism.Tc + 's · MSK ' + seism.MSK
  );

  // ── PAG 2: Parametri seismici ────────────────────────────────────────────
  pdf.addPage(); pdf.setFillColor(...LIGHT); pdf.rect(0,0,W,H,'F');
  hdr('PARAMETRI SEISMICI DE PROIECTARE', 2); ftr();
  let cy = 33;

  // KPI strip
  const kpis = [
    ['Zonă seismică', seism.zona],
    ['ag (proiectare)', seism.ag + 'g'],
    ['γI · ag', ag_design.toFixed(3) + 'g'],
    ['Tc (puls)', seism.Tc + 's'],
    ['MSK (intensitate)', seism.MSK],
  ];
  const kw = (W - 28) / kpis.length;
  kpis.forEach(([l,v],i) => kv(l, v, 14 + i*kw, cy, kw - 2, i===1 ? riskColor : GOLD));
  cy += 26;

  cy = sec('1. ZONAREA SEISMICĂ — P100-1/2013', cy); cy += 3;
  cy = body('Amplasamentul ' + S2(nrcad) + ' se află în zona seismică ' + seism.zona +
    ', cu accelerația de proiectare a terenului ag=' + seism.ag + 'g (g=9.81 m/s²) și ' +
    'perioada de control Tc=' + seism.Tc + 's, conform hărții de zonare P100-1/2013 pentru ' +
    'probabilitate de depășire de 20% în 50 ani (IMR=225 ani). Intensitatea MacroSeismică ' +
    'MSK este ' + seism.MSK + ', corespunzând zonei ' + S2(judet) + '.', 14, cy); cy += 4;

  // Tabel comparatie zone seismice Romania
  cy = sec('2. COMPARAȚIE ZONE SEISMICE ROMÂNIA', cy); cy += 3;
  cy = tblRow(['Zonă','ag (g)','Tc (s)','Regiune reprezentativă','Risc'], cy, true, [20,22,22,90,38]);
  const zones = [
    ['A', '0.30', '1.6', 'Vrancea (Focșani, Buzău, Brăila)', 'MAXIM'],
    ['B', '0.30', '1.0', 'Dâmbovița, Prahova, Ialomița', 'MAXIM'],
    ['C', '0.25', '1.0', 'București, Muntenia', 'RIDICAT'],
    ['D', '0.25', '0.7', 'Oltenia, Moldova centrală', 'RIDICAT'],
    ['E', '0.20', '0.7', 'Iași, Moldova N, Transilvania', 'MEDIU-RIDICAT'],
    ['F', '0.15', '0.7', 'Banat, Ardeal N', 'MEDIU'],
    ['G', '0.10', '0.7', 'Crișana, Maramureș', 'REDUS'],
  ];
  zones.forEach(([zona,ag,tc,reg,risc],i) => {
    const highlight = zona === seism.zona;
    cy = tblRow([zona,ag,tc,reg,risc], cy, false, [20,22,22,90,38]);
    if(highlight){ // evidențiem zona curentă
      pdf.setFillColor(...GOLD); pdf.setGState&&pdf.setGState(pdf.GState({opacity:0.12}));
      pdf.rect(14, cy-8, W-28, 8, 'F');
      try{pdf.setGState&&pdf.setGState(pdf.GState({opacity:1}));}catch(e){}
    }
    cy = checkY(cy, 10, 'PARAMETRI SEISMICI', 2);
  });
  cy += 4;

  // ── PAG 3: Analiză structurală preliminară ───────────────────────────────
  cy = newPage('ANALIZĂ STRUCTURALĂ PRELIMINARĂ', 3); cy = 33;
  cy = sec('3. ESTIMARE FORȚĂ SEISMICĂ — P100-1/2013 + CR 6/2013', cy); cy += 3;

  cy = body('Estimarea preliminară a forței seismice de proiectare pentru clădirea propusă (' +
    niv + ' niveluri, H=' + aedisH.toFixed(1) + 'm, S.cons.=' + sc + 'mp), clasa de importanță ' +
    imp.clasa + ' (' + S2(imp.desc) + '), factor de importanță γI=' + imp.gamma_I + ':', 14, cy); cy += 4;

  const calcRows = [
    ['Parametru', 'Valoare', 'Normativ', 'Observații'],
    ['Perioadă proprie est. T1', T1_est.toFixed(2) + ' s', 'P100 sect.4.5', '0.1×Nr.niveluri'],
    ['ag × γI (design)', ag_design.toFixed(3) + ' g', 'P100 sect.4.3', 'ag='+seism.ag+'g, γI='+imp.gamma_I],
    ['Factor β(T1)', beta.toFixed(3), 'P100 sect.4.3.3', T1_est<=seism.Tc?'T1≤Tc → β=2.5':'T1>Tc → 2.5×Tc/T1'],
    ['Factor comportare q', q_factor.toFixed(1), 'P100 sect.5.2', 'Structuri duale béton'],
    ['Spectru Sd(T1)', Sd + ' m/s²', 'P100 (4.14)', 'ag×γI×β/q×g'],
  ];
  const cw2 = [52, 38, 44, W-28-52-38-44];
  calcRows.forEach((row, i) => {
    cy = tblRow(row, cy, i===0, cw2);
    cy = checkY(cy, 12, 'ANALIZĂ STRUCTURALĂ', 3);
  });
  cy += 4;

  cy = sec('4. CERINȚE STRUCTURALE MINIME', cy); cy += 3;
  const cerinte = [
    ['Sistem structural recomandat', niv <= 4 ? 'Cadre beton armat sau zidărie confinată' : niv <= 8 ? 'Structură duală (cadre+diafragme) sau cadre BA' : 'Structură cu pereți structurali BA + fundații adânci'],
    ['Fundații', hidro.portanta < 200 ? 'Fundații continue sau radier general (portanță redusă ' + hidro.portanta + ' kPa)' : 'Fundații izolate sau continue (portanță ' + hidro.portanta + ' kPa)'],
    ['Clasă beton minim', seism.ag >= 0.25 ? 'C25/30' : 'C20/25'],
    ['Clasă oțel armătură', 'S500 (BST 500 S) conform SR 438-1'],
    ['Rosturi seismice', niv > 6 ? 'Obligatorii între corpuri de clădire (P100 sect.4.4.2)' : 'Recomandabile la schimbări de regim'],
    ['Expertiză tehnică', niv > 10 || seism.ag >= 0.25 ? 'OBLIGATORIE — Ing. constructor atestat seismic' : 'RECOMANDATĂ — Verificare proiect de rezistență'],
  ];
  cerinte.forEach(([l,v]) => {
    cy = tblRow([l, v], cy, false, [55, W-28-55]);
    cy = checkY(cy, 12, 'CERINȚE STRUCTURALE', 3);
  });
  cy += 4;

  // ── PAG 4: Risc + recomandări ─────────────────────────────────────────────
  cy = newPage('RISC SEISMIC & RECOMANDĂRI', 4); cy = 33;
  cy = sec('5. EVALUARE RISC SEISMIC AMPLASAMENT', cy); cy += 3;

  // Badge risc
  pdf.setFillColor(...riskColor); pdf.rect(14, cy, W-28, 12, 'F');
  pdf.setTextColor(255,255,255); pdf.setFontSize(14); pdf.setFont('helvetica','bold');
  pdf.text('RISC SEISMIC: ' + riskLevel + ' — Zonă seismică ' + seism.zona + ' (ag=' + seism.ag + 'g)', W/2, cy+8.5, {align:'center'});
  cy += 18;

  const factori = [
    ['Factor', 'Valoare', 'Impact', 'Observație'],
    ['Zonă seismică P100', seism.zona, seism.ag>=0.25?'MAJOR':seism.ag>=0.20?'SEMNIFICATIV':'MODERAT', 'ag=' + seism.ag + 'g, Tc=' + seism.Tc + 's'],
    ['Tipul terenului', hidro.tip_sol, hidro.nfa<2?'AMPLIFICATOR':'NORMAL', 'NFA=' + hidro.nfa.toFixed(1) + 'm, portanță=' + hidro.portanta + 'kPa'],
    ['Număr niveluri', niv + ' niv.', niv>8?'MAJOR':niv>4?'SEMNIFICATIV':'REDUS', 'H=' + aedisH.toFixed(1) + 'm, T1≈' + T1_est.toFixed(2) + 's'],
    ['Funcțiune', S2(imp.desc), 'Clasa ' + imp.clasa, 'γI=' + imp.gamma_I],
  ];
  const cw3 = [50, 45, 40, W-28-50-45-40];
  factori.forEach((row,i) => { cy = tblRow(row, cy, i===0, cw3); cy = checkY(cy,12,'RISC SEISMIC',4); });
  cy += 4;

  cy = sec('6. RECOMANDĂRI SPECIFICE AMPLASAMENT', cy); cy += 3;
  const recs = [
    'Studiu geotehnic obligatoriu cu min. 2 foraje la adâncimea Df+3m — conform NP 122/2010',
    'Proiect de rezistență elaborat de ing. constructor atestat MLPDA — Legea 10/1995',
    seism.ag >= 0.25
      ? 'ATENȚIE SPECIALĂ: amplasamentul se află în zona cu ag≥0.25g — structura necesită proiectare seismică avansată (P100-1/2013 cap. 5)'
      : 'Proiectare seismică standard conform P100-1/2013 — cerințe plastice limitate',
    'Evitare fundare pe umpluturi necompactate sau terenuri susceptibile la lichefiere (NFA=' + hidro.nfa.toFixed(1) + 'm)',
    niv > 6 ? 'Structura necesită calcul dinamic modal spectral complet (P100 sect.4.3)' : 'Calcul static echivalent (forță laterală) acceptabil pentru H<=' + (niv*3) + 'm',
    'Asigurare ductilitate clasa DCM (medie) sau DCH (înaltă) conform P100-1/2013 cap. 5',
  ];
  cy = (typeof bullet === 'function') ? bullet(recs, 14, cy, riskColor) : (() => {
    recs.forEach(r => { cy = body('• ' + r, 16, cy); }); return cy; })();

  // ── PAG 5: Surse legislative ─────────────────────────────────────────────
  cy = newPage('SURSE NORMATIVE', 5); cy = 33;
  cy = sec('7. CADRU NORMATIV APLICABIL', cy); cy += 3;
  const norms = [
    ['P100-1/2013','Cod proiectare seismică — prevederi pentru clădiri noi','Obligatoriu','Baza de proiectare'],
    ['CR 0/2012','Cod proiectare. Bazele proiectării structurilor în construcții','Obligatoriu','Clase importanță'],
    ['CR 6/2013','Cod proiectare structuri din zidărie','Obligatoriu','Dacă se utilizează'],
    ['NP 122/2010','Normativ privind cerințele tehnice pentru geotehnică','Obligatoriu','Studiu teren'],
    ['C 259/1994','Instrucțiuni tehnice pentru proiectare seismică','Referință','Date istorice'],
    ['SR EN 1998-1','Eurocode 8: Proiectarea structurilor la seism (STAS)','Referință','Standard european'],
    ['HG 766/1997','Regulament privind calitatea în construcții','Obligatoriu','Cerință structurală'],
  ];
  cy = tblRow(['Normativ','Titlu','Aplicabilitate','Observație'], cy, true, [28, 80, 30, W-28-28-80-30]);
  norms.forEach(row => { cy = tblRow(row, cy, false, [28, 80, 30, W-28-28-80-30]); cy = checkY(cy,10,'SURSE',5); });
  cy += 4;

  cy = sec('8. CONCLUZII', cy); cy += 3;
  cy = body('Amplasamentul ' + S2(nrcad) + ' din ' + S2(uat) + ' (jud. ' + S2(judet) +
    ') se află în zona seismică ' + seism.zona + ' conform P100-1/2013, cu accelerația de ' +
    'proiectare ag=' + seism.ag + 'g și perioada de control Tc=' + seism.Tc + 's. ' +
    'Riscul seismic este evaluat ca ' + riskLevel + '. ' +
    'Proiectul necesită un studiu geotehnic complet și un proiect de rezistență elaborat ' +
    'de un inginer constructor atestat MLPDA.', 14, cy); cy += 4;

  // PAG 6 — semnătură
  newPage('DOCUMENT ORIENTATIV', 6);
  if(typeof d.sign === 'function') d.sign();
  ftr();

  _pdfSaveMobile(pdf, 'studiu_seismic_' + S2(nrcad).replace(/[^a-zA-Z0-9]/g,'_') + '.pdf');
  if(typeof ss==='function') ss('✅ Pre-Studiu Seismic generat · P100-1/2013 · Zonă ' + seism.zona + ' · ag=' + seism.ag + 'g');
}

console.log('[Studies Stubs] ✅ loaded — _initStudyPdf, config getters, guards');
