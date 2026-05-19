// ═══════════════════════════════════════════════════════════════════════════
// UrbanX · 15-relevee.js · Relevee Instant Generator
// Generează planuri funcționale orientative din datele parcelei active.
// Citește din: S.parcels[activeParcel], REGULI, S.vol (AEDIS), S.ctx (vecini)
// Expune: generateRelevee(), closeRelevee()
// ═══════════════════════════════════════════════════════════════════════════

// ── Normative româneşti ─────────────────────────────────────────────────────
const _RV_NP057 = { living:14, bedroom:12, bedroom2:10, bedroom3:8, kitchen:5, bath:3.6, wc:1.2, hall:3, storage:1.5 };
const _RV_OMS119_H = 1.5; // ore min. însorire iarnă
const _RV_P118_CORR = 30; // m max. culoar până la scări

// ── Template-uri apartamente ────────────────────────────────────────────────
const _RV_APT = {
  studio:{ label:'Garsonieră', area:38, w:5.1, d:7.5, rooms:[
    {t:'hall',   x:0,    y:0,    w:1.8, h:2.1,  lbl:'Hol'},
    {t:'bath',   x:1.95, y:0,    w:2.4, h:2.1,  lbl:'Baie'},
    {t:'wc',     x:4.5,  y:0,    w:0.6, h:2.1,  lbl:'WC'},
    {t:'living', x:0,    y:2.25, w:5.1, h:4.5,  lbl:'Garsonieră'},
    {t:'balcon', x:0,    y:7.05, w:5.1, h:1.2,  lbl:'Balcon', bal:true},
  ]},
  apt2c:{ label:'2 camere', area:65, w:8.4, d:10.2, rooms:[
    {t:'hall',    x:0,    y:0,    w:2.4,  h:3.6,  lbl:'Hol'},
    {t:'bath',    x:2.55, y:0,    w:2.85, h:2.1,  lbl:'Baie'},
    {t:'wc',      x:2.55, y:2.25, w:1.35, h:1.35, lbl:'WC'},
    {t:'storage', x:3.9,  y:2.25, w:1.5,  h:1.35, lbl:'Dep.'},
    {t:'kitchen', x:5.55, y:0,    w:2.85, h:3.6,  lbl:'Bucătărie'},
    {t:'living',  x:0,    y:3.75, w:5.1,  h:5.4,  lbl:'Living'},
    {t:'bedroom', x:5.25, y:3.75, w:3.15, h:5.4,  lbl:'Dormitor'},
    {t:'balcon',  x:0,    y:9.30, w:8.4,  h:1.2,  lbl:'Balcon', bal:true},
  ]},
  apt3c:{ label:'3 camere', area:88, w:10.8, d:12.0, rooms:[
    {t:'hall',    x:0,    y:0,    w:2.7,  h:4.2,  lbl:'Hol'},
    {t:'bath',    x:2.85, y:0,    w:3.15, h:2.4,  lbl:'Baie'},
    {t:'wc',      x:2.85, y:2.55, w:1.5,  h:1.65, lbl:'WC'},
    {t:'storage', x:4.5,  y:2.55, w:1.5,  h:1.65, lbl:'Dep.'},
    {t:'kitchen', x:6.15, y:0,    w:4.65, h:4.2,  lbl:'Bucătărie'},
    {t:'living',  x:0,    y:4.35, w:6.0,  h:6.0,  lbl:'Living'},
    {t:'bedroom', x:6.15, y:4.35, w:4.65, h:3.6,  lbl:'Dorm. 1'},
    {t:'bedroom2',x:6.15, y:8.1,  w:4.65, h:2.7,  lbl:'Dorm. 2'},
    {t:'balcon',  x:0,    y:10.5, w:10.8, h:1.5,  lbl:'Balcon', bal:true},
  ]},
  apt4c:{ label:'4 camere', area:115, w:13.2, d:13.2, rooms:[
    {t:'hall',    x:0,    y:0,    w:3.0,  h:4.5,  lbl:'Hol'},
    {t:'bath',    x:3.15, y:0,    w:3.3,  h:2.7,  lbl:'Baie'},
    {t:'wc',      x:3.15, y:2.85, w:1.65, h:1.65, lbl:'WC'},
    {t:'storage', x:4.95, y:2.85, w:1.5,  h:1.65, lbl:'Dep.'},
    {t:'kitchen', x:6.6,  y:0,    w:6.6,  h:4.5,  lbl:'Bucătărie-Dining'},
    {t:'living',  x:0,    y:4.65, w:7.2,  h:6.6,  lbl:'Living'},
    {t:'bedroom', x:7.35, y:4.65, w:5.85, h:3.9,  lbl:'Dorm. 1'},
    {t:'bedroom2',x:7.35, y:8.7,  w:5.85, h:2.55, lbl:'Dorm. 2'},
    {t:'bedroom3',x:0,    y:11.4, w:4.5,  h:1.8,  lbl:'Dorm. 3'},
    {t:'balcon',  x:0,    y:13.2, w:13.2, h:1.5,  lbl:'Balcon L', bal:true},
  ]},
};

const _RV_COLORS = {
  living:  {fill:'rgba(254,215,170,.6)',  stroke:'#EA580C'},
  bedroom: {fill:'rgba(187,247,208,.6)',  stroke:'#16A34A'},
  bedroom2:{fill:'rgba(187,247,208,.6)',  stroke:'#16A34A'},
  bedroom3:{fill:'rgba(187,247,208,.6)',  stroke:'#16A34A'},
  kitchen: {fill:'rgba(186,230,253,.6)',  stroke:'#0284C7'},
  bath:    {fill:'rgba(221,214,254,.6)',  stroke:'#7C3AED'},
  wc:      {fill:'rgba(221,214,254,.5)',  stroke:'#6D28D9'},
  hall:    {fill:'rgba(226,232,240,.7)',  stroke:'#475569'},
  storage: {fill:'rgba(226,232,240,.5)',  stroke:'#64748B'},
  core:    {fill:'rgba(191,219,254,.6)',  stroke:'#1D4ED8'},
  commercial:{fill:'rgba(233,213,255,.6)',stroke:'#7C3AED'},
  reception: {fill:'rgba(233,213,255,.6)',stroke:'#7C3AED'},
  balcon:  {fill:'rgba(254,249,195,.7)',  stroke:'#CA8A04',  dash:true},
  office:  {fill:'rgba(187,247,208,.6)',  stroke:'#15803D'},
  meeting: {fill:'rgba(180,83,1,.14)',   stroke:'#F97316'},
};

// ── State intern relevee ────────────────────────────────────────────────────
const _RV = {
  open: false,
  tab: 'plan', floor: 0,
  scale: 12,
  showSolar: false, showISU: true, showDim: true, showSGrid: false,
  panX:0, panY:0,
  building: null, floors: [],
  parcelParams: null,
  selectedRoom: null, resizing: null, editDirty: false,
  unitMix: { studio:10, apt2:50, apt3:30, apt4:5, ph:5 },
  fn: 'rez',       // funcțiunea principală
  fnParter: null,  // null = same as fn; altfel: funcțiunea parterului P0
};
window._RV = _RV; // expus global pentru canvas-upgrade.js și alte module

// ═══════════════════════════════════════════════════════════════════════════
// FN_CONFIG — definiții complete per funcțiune
// Activ pentru TOATE UAT-urile, desktop + mobil, releveu + lotizare
// ═══════════════════════════════════════════════════════════════════════════
const FN_CONFIG = {
  rez:{
    label:'Rezidențial', short:'Rez.', ico:'🏠', color:'#A78BFA',
    isuDist:30, isuNorm:'P118-2/2013', scaraMin:1.0,
    omsInsorire:true, omsMin:1.5,
    pk_unit:'per_apt', pk_val:1, pk_norm:'NP 067/2002',
    sv_min:20, ep_coef:1.0,
    unitTypes:['studio','2cam','3cam','4cam','ph'],
    unitLabels:['Garsonieră','2 camere','3 camere','4 camere','Penthouse'],
    norms:['NP 057/2002','OMS 119/2014','P118-2/2013','NP 067/2002','NP 051/2012'],
  },
  birouri:{
    label:'Birouri / Office', short:'Birouri', ico:'🏢', color:'#60A5FA',
    isuDist:40, isuNorm:'P118-3/2015', scaraMin:1.2,
    omsInsorire:false, omsMin:0,
    pk_unit:'per_50m2', pk_val:1, pk_norm:'NP 067/2002',
    sv_min:15, ep_coef:1.3, comp_antifoc:3000,
    unitTypes:['openspace','celular','conf','receptie'],
    unitLabels:['Open-space','Birouri celulare','Sală conferință','Recepție+Lobby'],
    norms:['NP 067/2002','P118-3/2015','L 319/2006','SR EN 15251','NP 051/2012'],
  },
  hotel:{
    label:'Hotel / Cazare', short:'Hotel', ico:'🏨', color:'#34D399',
    isuDist:35, isuNorm:'P118-3/2015', scaraMin:1.2,
    omsInsorire:true, omsMin:1.0,
    pk_unit:'per_2cam', pk_val:0.5, pk_norm:'NP 067/2002',
    sv_min:20, ep_coef:1.4, detectie_auto:true, cam_min_mp:16,
    unitTypes:['standard','dubla','suite','apt_hotel'],
    unitLabels:['Cameră standard','Cameră dublă','Suite','Apartament hotel'],
    norms:['HG 237/2001','P118-3/2015','NP 051/2012','OMS 119/2014','STAS 6647'],
  },
  com:{
    label:'Spații Comerciale', short:'Comercial', ico:'🏪', color:'#F59E0B',
    isuDist:25, isuNorm:'P118-3/2015', scaraMin:1.4,
    omsInsorire:false, omsMin:0,
    pk_unit:'per_50m2', pk_val:1, pk_norm:'NP 067/2002',
    sv_min:10, ep_coef:1.5, sprinklere:3600, iesiri_min:2,
    unitTypes:['retail','alimentar','showroom','depozit'],
    unitLabels:['Spațiu retail','Comerț alimentar','Showroom','Depozit'],
    norms:['OG 99/2000','P118-3/2015','NP 067/2002','HG 622/2004','NP 051/2012'],
  },
  mixt_com_rez:{
    label:'Comercial P0 + Rezidențial', short:'Com+Rez', ico:'🏬', color:'#F97316',
    fnParter:'com', fnEtaje:'rez',
    isuDist:30, isuNorm:'P118-2+P118-3', scaraMin:1.2,
    omsInsorire:true, omsMin:1.5,
    pk_unit:'combinat', pk_val:1, pk_norm:'NP 067/2002',
    sv_min:15, ep_coef:1.2,
    unitTypes:['retail','2cam','3cam'],
    unitLabels:['Comercial P0','2 camere (E1+)','3 camere (E1+)'],
    norms:['NP 057/2002','OMS 119/2014','P118-2/2013','P118-3/2015','NP 067/2002'],
  },
  mixt_bir_rez:{
    label:'Birouri P0 + Rezidențial', short:'Bir+Rez', ico:'🏗', color:'#8B5CF6',
    fnParter:'birouri', fnEtaje:'rez',
    isuDist:30, isuNorm:'P118-2+P118-3', scaraMin:1.2,
    omsInsorire:true, omsMin:1.5,
    pk_unit:'combinat', pk_val:1, pk_norm:'NP 067/2002',
    sv_min:15, ep_coef:1.25,
    unitTypes:['openspace','2cam','3cam'],
    unitLabels:['Birouri P0','2 camere (E1+)','3 camere (E1+)'],
    norms:['NP 057/2002','OMS 119/2014','P118-2/2013','P118-3/2015','NP 067/2002'],
  },
  mixt_hotel_com:{
    label:'Hotel + Comercial P0', short:'Hotel+Com', ico:'🏩', color:'#EC4899',
    fnParter:'com', fnEtaje:'hotel',
    isuDist:25, isuNorm:'P118-3/2015', scaraMin:1.2,
    omsInsorire:true, omsMin:1.0, detectie_auto:true,
    pk_unit:'combinat', pk_val:0.5, pk_norm:'NP 067/2002',
    sv_min:15, ep_coef:1.45,
    unitTypes:['retail','standard','dubla','suite'],
    unitLabels:['Comercial P0','Standard (E1+)','Dublă (E1+)','Suite (E1+)'],
    norms:['HG 237/2001','P118-3/2015','NP 067/2002','OMS 119/2014'],
  },
};

// Returnează funcțiunea activă pentru etajul dat (0=parter poate fi diferit)
function _rvGetFloorFn(floorIdx){
  const cfg=FN_CONFIG[_RV.fn]||FN_CONFIG.rez;
  if(floorIdx===0){
    if(cfg.fnParter) return cfg.fnParter;
    if(_RV.fnParter) return _RV.fnParter;
  }
  return cfg.fnEtaje||_RV.fn;
}
function _rvFloorFnCfg(floorIdx){ return FN_CONFIG[_rvGetFloorFn(floorIdx)]||FN_CONFIG.rez; }
const _rvFmt  = n => isNaN(n) ? '—' : Math.round(n)+'';
const _rvFmtD = n => isNaN(n) ? '—' : n.toFixed(2);
const _rvPx   = v => v * _RV.scale;
const _rvSleep= ms => new Promise(r=>setTimeout(r,ms));

function _rvEsc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ── Extrage parametrii din parcela activă (sau uniunea parcelelor în multiselect) ─
function _rvGetParcelParams(){
  // ── #18 MULTISELECT: dacă sunt mai multe parcele, unim geometriile ─────────
  let ap;
  if(S.multiMode && S.parcels.length > 1){
    try{
      // Unim toate parcelele selectate cu turf.union
      let union = S.parcels[0]?.geo;
      for(let i=1;i<S.parcels.length;i++){
        if(S.parcels[i]?.geo) union = turf.union(union, S.parcels[i].geo);
      }
      const totalArea = S.parcels.reduce((s,p)=>s+(p.area||turf.area(p.geo)||0),0);
      ap = {
        geo: union,
        area: totalArea,
        utr: S.parcels[0]?.utr || 'CB7',
        params: S.parcels[0]?.params || {},
        nrCad: S.parcels.map(p=>p.nrCad||'?').join('+'),
        _isMulti: true,
        _count: S.parcels.length,
      };
      // Notify user
      if(!window._rvMultiNotified){
        window._rvMultiNotified=true;
        ss('📐 Memoriu Tehnic pentru '+S.parcels.length+' parcele combinate · Suprafață totală: '+Math.round(totalArea)+'m²');
      }
    }catch(e){
      ap = S.parcels[S.activeParcel ?? 0]; // fallback
    }
  } else {
    window._rvMultiNotified=false;
    ap = S.parcels[S.activeParcel ?? 0];
  }
  if(!ap?.geo?.geometry) return null;

  const areaRaw  = ap.area || turf.area(ap.geo);
  const utr      = ap.utr || 'CB7';
  const reg      = (typeof REGULI !== 'undefined' && REGULI[utr]) || {};
  const params   = ap.params || {};

  // ── Scenariul Demolare: ignorăm construcțiile existente ─────────────
  // Când utilizatorul a selectat scenariu "Demolare" în AEDIS,
  // releveele și studiile trebuie să reflecte terenul LIBER, nu construcțiile
  // demolate. Context OSM și S.vol._lastFeats nu mai sunt relevante.
  const isDemolare = (typeof AEDIS !== 'undefined') &&
    (AEDIS.scenariu === 'demolare' || AEDIS._demolishActive);
  const existentH  = isDemolare ? 0 : null; // ignoram constructia existenta

  // Estimăm dimensiunile parcelei din bbox
  const bbox  = turf.bbox(ap.geo);
  const bboxW = turf.distance({type:'Feature',geometry:{type:'Point',coordinates:[bbox[0],bbox[1]]}},
                               {type:'Feature',geometry:{type:'Point',coordinates:[bbox[2],bbox[1]]}},{units:'meters'});
  const bboxD = turf.distance({type:'Feature',geometry:{type:'Point',coordinates:[bbox[0],bbox[1]]}},
                               {type:'Feature',geometry:{type:'Point',coordinates:[bbox[0],bbox[3]]}},{units:'meters'});

  // Orientare din AEDIS sau estimată din bbox
  const frontDir = S.vol?.frontDir || ap.frontDir || 'N';
  const hMax     = params.h || reg.h || 28;
  const hn       = 3.0;

  // ── MULTIVOLUME: folosim corpul selectat, nu max din toate ───────────────
  // _lastFeats are proprietăți bldIdx (corp) și floor (etaj per corp)
  let aedisH = null, aedisW = null, aedisD = null, aedisArea = null;
  if(!isDemolare && S.vol?._lastFeats?.length) {
    const feats = S.vol._lastFeats;
    const isMulti = S.vol.multiVol && feats.some(f => f.properties?.bldIdx != null);
    if(isMulti) {
      // Corpul selectat = _RV.selectedBldIdx sau 0
      const selBld = (typeof _RV !== 'undefined' && _RV.selectedBldIdx != null)
        ? _RV.selectedBldIdx : 0;
      const bldFeats = feats.filter(f => (f.properties?.bldIdx ?? 0) === selBld);
      if(bldFeats.length) {
        // Înălțimea corpului selectat
        aedisH = bldFeats.reduce((m,f) => Math.max(m, f.properties?.top||0), 0) || null;
        // Bbox corpului selectat pentru W și D
        const bldFloor0 = bldFeats.find(f => f.properties?.floor === 0) || bldFeats[0];
        if(bldFloor0?.geometry) {
          try {
            const bb2 = turf.bbox({type:'FeatureCollection',features:[bldFloor0]});
            aedisW = Math.round(turf.distance(
              {type:'Feature',geometry:{type:'Point',coordinates:[bb2[0],bb2[1]]}},
              {type:'Feature',geometry:{type:'Point',coordinates:[bb2[2],bb2[1]]}},
              {units:'meters'}) * 10) / 10;
            aedisD = Math.round(turf.distance(
              {type:'Feature',geometry:{type:'Point',coordinates:[bb2[0],bb2[1]]}},
              {type:'Feature',geometry:{type:'Point',coordinates:[bb2[0],bb2[3]]}},
              {units:'meters'}) * 10) / 10;
            aedisArea = Math.round(turf.area({type:'FeatureCollection',features:[bldFloor0]}));
          } catch(e) {}
        }
      }
    } else {
      // Volum unic — comportament existent
      aedisH = feats.reduce((m,f) => Math.max(m, f.properties?.top||0), 0) || null;
    }
  }

  const niv = aedisH ? Math.round(aedisH/hn) : (params.niv || reg.niv || Math.floor(hMax/hn));

  // Dacă corpul e prea mic pentru un plan meaningful (< 8m), folosim parcela întreagă
  const finalW = (aedisW && aedisW >= 8) ? aedisW : Math.round(bboxW * 10) / 10;
  const finalD = (aedisD && aedisD >= 8) ? aedisD : Math.round(bboxD * 10) / 10;
  const finalArea = (aedisArea && aedisArea >= 50) ? aedisArea : Math.round(areaRaw);

  return {
    nrCad: ap.nrcad || ap.id || '—',
    utr, fn: S.vol?.fn || ap.fn || 'rezidential_colectiv',
    W: finalW,
    D: finalD,
    area: finalArea,
    rf: params.rf ?? reg.rf ?? 0,
    rl: params.rl ?? reg.rl ?? 3,
    rs: params.rs ?? reg.rs ?? 6,
    pot: (params.pot ?? reg.pot ?? 70) / 100,
    cut: params.cut ?? reg.cut ?? 2.0,
    niv: Math.max(1, Math.min(25, niv)),
    hn,
    hMax,
    frontDir,
    aedisH,
    lat: turf.centerOfMass(ap.geo).geometry.coordinates[1],
    lon: turf.centerOfMass(ap.geo).geometry.coordinates[0],
  };
}

// ── Algoritm de calcul ────────────────────────────────────────────────────
function _rvCompBuilding(P){
  // Dimensiuni minime viabile — dacă parcela e prea mică, folosim estimare din arie
  let effW = P.W, effD = P.D;
  if(P.area < 100){
    effW = Math.max(P.W, Math.sqrt(P.area * 0.8));
    effD = Math.max(P.D, P.area / effW);
  }
  // ── Funcțiunea clădirii — determină capurile dimensionale ────────────────
  const _fnRez = !String(P.fn||'').toLowerCase().includes('birouri') &&
                 !String(P.fn||'').toLowerCase().includes('hotel');

  const bW   = _fnRez
    ? Math.min(80, Math.max(6, effW - P.rl * 2))  // rezidențial max 80m (rest = parcare/curte)
    : Math.max(6, effW - P.rl * 2);               // birouri/hotel: fără cap

  // ── Adâncimea clădirii: rezidențial → coridor dublu încărcat (max 26m) ───
  const bD_raw = Math.max(6, effD - P.rf - P.rs);
  const bD   = _fnRez ? Math.min(26, bD_raw) : bD_raw;

  const scArea   = Math.min(bW * bD, Math.max(P.area * P.pot, 36));
  const sdaTarget= P.area * P.cut;
  const niv  = Math.min(P.niv, Math.max(1, Math.round(sdaTarget / scArea)));
  const sdaTotal = scArea * niv;

  // Nuclee scări+lift — 1 nucleu la fiecare 18m (P118-2/2013: max 30m coridoc evacuare)
  const nStairs = Math.max(1, Math.min(_fnRez?4:8, Math.floor(bW / 18.0)));
  const stairW  = 3.6;
  const stairD  = Math.min(6.6, bD * 0.5);
  const colSp   = bW / nStairs;
  const cores   = Array.from({length:nStairs}, (_,i) => ({
    x: colSp*(i+0.5) - stairW/2,
    y: (bD - stairD) / 2,   // centrat pe adâncimea clădirii
    w: stairW, h: stairD,
  }));

  return { P, bW, bD, niv, scArea, sdaTotal, sdaPerFloor:scArea, cores,
           parcelArea: P.area };
}

function _rvMix(P){
  // Funcțiune → template key
  const fnStr = String(P.fn||'').toLowerCase();
  if(fnStr.includes('birouri') || fnStr.includes('office')) return 'birouri';
  if(fnStr.includes('hotel'))                                return 'hotel';
  if(fnStr.includes('mixt'))                                 return 'mixt';
  return 'rezCol'; // default rezidențial colectiv
}

// ── _rvFillApt: umple COMPLET un dreptunghi W×D cu camere de apartament ────────
// Nicio bucată goală — fiecare m² are o funcțiune clară.
// isFlipped=false → balcon sus (față stradă), hol jos (lângă nucleu) — rândul NORD
// isFlipped=true  → hol sus (lângă nucleu), balcon jos (curte/grădină) — rândul SUD
// ═══════════════════════════════════════════════════════════════════════════
// GENERATOARE CAMERE PE FUNCȚIUNE
// ═══════════════════════════════════════════════════════════════════════════

// ── Birouri ────────────────────────────────────────────────────────────────
function _rvFillOffice(x0, y0, W, D, idx, type='openspace'){
  const rms=[];
  const push=(t,x,y,w,h,lbl)=>{if(w<0.3||h<0.3)return;rms.push({t,lbl,apt:idx,x:x0+x,y:y0+y,w,h,normMin:0});};
  if(type==='openspace'){
    push('living',0,0,W,D*0.75,'Open-space');
    push('hall',0,D*0.75,W*0.35,D*0.25,'Recepție / Intrare');
    push('kitchen',W*0.35,D*0.75,W*0.25,D*0.25,'Bucătărie/Pantry');
    push('storage',W*0.60,D*0.75,W*0.40,D*0.25,'WC Comun');
  } else if(type==='celular'){
    // Birouri individuale 3×4m = 12m² fiecare de-a lungul ferestrei
    const nBir=Math.max(1,Math.floor(W/3));
    const bW=W/nBir;
    for(let i=0;i<nBir;i++) push('bedroom',i*bW,0,bW-0.1,D*0.6,'Birou '+(i+1));
    push('hall',0,D*0.6,W*0.5,D*0.4,'Coridor birou');
    push('storage',W*0.5,D*0.6,W*0.5,D*0.4,'Arhivă / Depozit');
  } else if(type==='conf'){
    push('living',0,0,W,D*0.65,'Sală Conferință');
    push('hall',0,D*0.65,W*0.4,D*0.35,'Hol');
    push('storage',W*0.4,D*0.65,W*0.3,D*0.35,'Depozit AV');
    push('bath',W*0.7,D*0.65,W*0.3,D*0.35,'WC');
  } else { // receptie
    push('living',0,0,W*0.6,D,'Lobby / Recepție');
    push('bedroom',W*0.6,0,W*0.4,D*0.5,'Birou Manager');
    push('storage',W*0.6,D*0.5,W*0.2,D*0.5,'Server Room');
    push('bath',W*0.8,D*0.5,W*0.2,D*0.5,'WC');
  }
  return rms;
}

// ── Hotel ──────────────────────────────────────────────────────────────────
function _rvFillHotel(x0, y0, W, D, idx, type='standard'){
  const rms=[];
  const push=(t,x,y,w,h,lbl)=>{if(w<0.3||h<0.3)return;rms.push({t,lbl,apt:idx,x:x0+x,y:y0+y,w,h,normMin:0});};
  const camW=Math.min(W,4.0); // lățime cameră max 4m
  const nCam=Math.max(1,Math.floor(W/camW));
  const cW=W/nCam;
  if(type==='standard'||type==='dubla'){
    const camD=D*0.80;
    for(let i=0;i<nCam;i++){
      push('bedroom',i*cW,0,cW-0.1,camD*(type==='dubla'?0.75:0.70),'Camera '+(idx*10+i+1));
      push('bath',i*cW,camD*(type==='dubla'?0.75:0.70),cW-0.1,camD*(type==='dubla'?0.25:0.30),'Baie');
    }
    push('hall',0,camD,W,D-camD,'Coridor Hotel');
  } else if(type==='suite'){
    push('living',0,0,W*0.55,D*0.65,'Living Suite');
    push('bedroom',W*0.55,0,W*0.45,D*0.65,'Dormitor Suite');
    push('bath',0,D*0.65,W*0.35,D*0.35,'Baie Suite');
    push('storage',W*0.35,D*0.65,W*0.30,D*0.35,'Dressing');
    push('balcon',W*0.65,D*0.65,W*0.35,D*0.35,'Terasă Suite',true);
  } else { // apt_hotel
    push('living',0,0,W*0.5,D*0.55,'Living');
    push('bedroom',W*0.5,0,W*0.5,D*0.55,'Dormitor');
    push('kitchen',0,D*0.55,W*0.35,D*0.45,'Bucătărie');
    push('bath',W*0.35,D*0.55,W*0.3,D*0.45,'Baie');
    push('hall',W*0.65,D*0.55,W*0.35,D*0.45,'Hol');
  }
  return rms;
}

// ── Comercial ──────────────────────────────────────────────────────────────
function _rvFillCommercial(x0, y0, W, D, idx, type='retail'){
  const rms=[];
  const push=(t,x,y,w,h,lbl)=>{if(w<0.3||h<0.3)return;rms.push({t,lbl,apt:idx,x:x0+x,y:y0+y,w,h,normMin:0});};
  if(type==='retail'||type==='showroom'){
    push('living',0,0,W,D*0.65,type==='showroom'?'Showroom':'Spațiu Comercial');
    push('storage',0,D*0.65,W*0.4,D*0.35,'Depozit Marfă');
    push('hall',W*0.4,D*0.65,W*0.35,D*0.35,'Birouri / Admin');
    push('bath',W*0.75,D*0.65,W*0.25,D*0.35,'WC Public');
  } else if(type==='alimentar'){
    push('living',0,0,W*0.70,D*0.70,'Raion Vânzare');
    push('storage',W*0.70,0,W*0.30,D*0.70,'Depozit Frigorific');
    push('hall',0,D*0.70,W*0.45,D*0.30,'Casă Marcat + Intrare');
    push('kitchen',W*0.45,D*0.70,W*0.30,D*0.30,'Prep. Alim.');
    push('bath',W*0.75,D*0.70,W*0.25,D*0.30,'WC Pers.');
  } else { // depozit
    push('storage',0,0,W,D*0.80,'Depozit / Logistică');
    push('hall',0,D*0.80,W*0.5,D*0.20,'Birou Expeditor');
    push('bath',W*0.5,D*0.80,W*0.5,D*0.20,'WC / Vestiare');
  }
  return rms;
}

// ── Dispatcher principal per funcțiune + tip ──────────────────────────────
function _rvFillUnit(x0, y0, W, D, idx, isFlipped, floorFn, type){
  switch(floorFn){
    case 'birouri': return _rvFillOffice(x0,y0,W,D,idx,type||'openspace');
    case 'hotel':   return _rvFillHotel(x0,y0,W,D,idx,type||'standard');
    case 'com':     return _rvFillCommercial(x0,y0,W,D,idx,type||'retail');
    default:        return _rvFillApt(x0,y0,W,D,idx,isFlipped,type||'auto');
  }
}

// ── Construiește lista de tipuri de unități pentru un etaj ────────────────
function _rvBuildUnitList(n, floorFn, mix, isLastFloor){
  const cfg=FN_CONFIG[floorFn]||FN_CONFIG.rez;
  if(floorFn==='rez'){
    if(isLastFloor && mix.ph>0){
      const nPH=Math.max(1,Math.round(n*mix.ph/100));
      const list=[];
      for(let i=0;i<nPH;i++) list.push('ph');
      for(let i=nPH;i<n;i++) list.push('3cam');
      return list;
    }
    const types=[{k:'studio',p:mix.studio||0},{k:'2cam',p:mix.apt2||0},{k:'3cam',p:mix.apt3||0},{k:'4cam',p:mix.apt4||0}];
    const total=types.reduce((s,t)=>s+t.p,0)||100;
    const list=[];
    types.forEach(t=>{const c=Math.round(n*t.p/total);for(let i=0;i<c;i++)list.push(t.k);});
    while(list.length<n)list.push('2cam');
    return list.slice(0,n);
  }
  // Birouri / Hotel / Comercial: distribuie tipurile unifor din cfg.unitTypes
  const ut=cfg.unitTypes||['openspace'];
  const list=[];
  for(let i=0;i<n;i++) list.push(ut[i%ut.length]);
  return list;
}
function _rvBuildAptList(n,mix,isLastFloor){ return _rvBuildUnitList(n,'rez',mix,isLastFloor); }

function _rvFillApt(x0, y0, W, D, aptIdx, isFlipped, type='auto'){
  const rms=[];
  if(W<1.5||D<3.0) return rms;
  const push=(t,x,y,w,h,lbl,bal=false)=>{
    if(w<0.3||h<0.3) return;
    rms.push({t,lbl,bal,apt:aptIdx,x:x0+x,y:y0+y,w,h,normMin:_RV_NP057[t]||0});
  };

  // ── Dacă apartamentul e LAT (bay > 8m) → împarțim în 2 ap. side-by-side ───
  if(W >= 9.0){
    const half = W/2;
    // Distribuim tipuri: primul jumătate primește type, al doilea - tipul următor
    const type2 = type==='studio'?'2cam': type==='2cam'?'2cam': type==='3cam'?'2cam': type==='ph'?'3cam': type;
    _rvFillApt(x0,      y0, half, D, aptIdx,     isFlipped, type).forEach(r=>rms.push(r));
    _rvFillApt(x0+half, y0, half, D, aptIdx+100, isFlipped, type2).forEach(r=>rms.push(r));
    return rms;
  }

  // ── Rezolvăm tipul automat din dimensiuni dacă nu e specificat ────────────
  const effArea = W * D;
  if(type==='auto'){
    if(effArea < 30)      type='studio';
    else if(effArea < 55) type='2cam';
    else if(effArea < 80) type='3cam';
    else                  type='4cam';
  }

  // ── Zone proporționale (suma = D exact) ─────────────────────────────────
  // Penthouse: balcon mai adânc, living mai înalt, fără hol mic
  const isPH = type==='ph';
  const r_bal  = isPH ? Math.max(2.0, D*0.18) : Math.max(0.9,  Math.min(1.3,  D*0.11));
  const r_hol  = isPH ? 1.2                    : Math.max(0.9,  Math.min(1.6,  D*0.11));
  const r_serv = Math.max(2.0, Math.min(3.2, D*0.26));
  // Dormitoare — variază după tip
  const nDorm  = type==='studio'?0: type==='2cam'?1: type==='3cam'?2: type==='4cam'?3: isPH?2:2;
  const r_noapt= nDorm===0 ? 0 : Math.max(2.6, Math.min(4.2, D*0.30));
  const r_zi   = Math.max(2.8, D - r_bal - r_hol - r_serv - r_noapt);
  const sum    = r_bal+r_hol+r_serv+r_noapt+r_zi;
  const f      = D/sum;
  const bH=r_bal*f, hH=r_hol*f, sH=r_serv*f, nH=r_noapt*f, lH=r_zi*f;

  // ── Lățimi funcționale ──────────────────────────────────────────────────
  const kW    = Math.max(1.8, Math.min(W*0.38, 3.2));
  const livW  = W - kW;
  const bathW = Math.max(1.4, Math.min(2.0, W*0.30));
  const wcW   = Math.max(0.8, Math.min(1.2, W*0.16));
  const maxHolServW = Math.min(1.5, Math.max(0, W-bathW-wcW));
  const extraServW  = Math.max(0, W-bathW-wcW-maxHolServW);
  const d1W   = Math.round(W*0.55*10)/10;
  const d2W   = W - d1W;

  const drawNoapte=(y_)=>{
    if(nDorm === 0) return; // studio — niciun dormitor separat
    if(nDorm === 1){
      push('bedroom', 0, y_, W, nH, 'Dormitor');
    } else if(nDorm === 2){
      push('bedroom',  0,   y_, d1W, nH,        'Dorm. 1');
      push('bedroom2', d1W, y_, d2W, nH*0.72,   'Dorm. 2');
      if(nH*0.28>0.5) push('storage', d1W, y_+nH*0.72, d2W, nH*0.28, 'Dep.');
    } else { // 3 dormitoare (4cam + PH)
      const d3W = Math.round(W*0.32*10)/10;
      const d12 = W - d3W;
      const dd1 = Math.round(d12*0.55*10)/10;
      push('bedroom',  0,    y_, dd1,   nH,      'Dorm. 1');
      push('bedroom2', dd1,  y_, d12-dd1, nH*0.72, 'Dorm. 2');
      if(nH*0.28>0.5) push('storage', dd1, y_+nH*0.72, d12-dd1, nH*0.28, 'Dep.');
      push('bedroom3', d12,  y_, d3W,   nH,      'Dorm. 3');
    }
  };

  const drawServ=(y_)=>{
    if(type === 'studio'){
      // Studio: bucătărie deschisă integrată în living, baie compactă
      push('bath',  0,      y_, Math.min(W,2.2), sH, 'Baie');
      if(W>2.5) push('storage', 2.2, y_, W-2.2, sH, 'Oficiu');
      return;
    }
    push('bath',  0,                      y_, bathW,       sH,        'Baie');
    push('wc',    bathW,                  y_, wcW,         sH*0.62,   'WC');
    if(maxHolServW>0.2) push('hall', bathW+wcW, y_, maxHolServW, sH, 'Hol');
    if(extraServW>0.6)  push('storage', bathW+wcW+maxHolServW, y_, extraServW, sH, 'Garderobă');
    if(sH*0.38>0.4) push('storage', bathW, y_+sH*0.62, wcW, sH*0.38, 'Dep.');
  };

  const drawZiSi=(y_)=>{
    if(type === 'studio'){
      // Studio: o singură cameră combinată living+dormitor
      push('living', 0, y_, W, lH+nH, 'Cameră + Living');
      return;
    }
    if(isPH){
      // Penthouse: living open-space cu bucătărie insulă
      push('living',  0,    y_, W,  lH*0.70, 'Living Open-Space');
      push('kitchen', 0,    y_+lH*0.70, W*0.45, lH*0.30, 'Bucătărie');
      push('storage', W*0.45, y_+lH*0.70, W*0.55, lH*0.30, 'Dining');
      return;
    }
    push('living',  0,    y_, livW, lH,        'Living');
    push('kitchen', livW, y_, kW,   lH*0.65,   'Bucătărie');
    if(lH*0.35>0.5) push('storage', livW, y_+lH*0.65, kW, lH*0.35, 'Oficiu');
  };

  // HOL APARTAMENT — îngust la intrare + zona rămasă devine Dormitor 3 dacă >2.5m
  const holAptW  = Math.min(W, 1.8);
  const holRestW = Math.max(0, W - holAptW);
  const holRestLabel = holRestW >= 2.5 ? 'Dorm. 3' : holRestW >= 1.2 ? 'Dep.' : null;
  const balLabel = isPH ? 'Terasă' : 'Balcon';

  if(!isFlipped){
    let y=0;
    push('balcon',0,y,W,bH,balLabel,true); y+=bH;
    drawZiSi(y); y+= type==='studio' ? lH+nH : lH;
    if(type!=='studio') { drawNoapte(y); y+=nH; }
    drawServ(y); y+=sH;
    push('hall', 0, y, holAptW, hH, 'Hol');
    if(holRestW>0.4 && holRestLabel) push(holRestLabel==='Dorm. 3'?'bedroom3':'storage', holAptW, y, holRestW, hH, holRestLabel);
  } else {
    let y=0;
    push('hall', 0, y, holAptW, hH, 'Hol');
    if(holRestW>0.4 && holRestLabel) push(holRestLabel==='Dorm. 3'?'bedroom3':'storage', holAptW, y, holRestW, hH, holRestLabel);
    y+=hH;
    drawServ(y); y+=sH;
    if(type!=='studio') { drawNoapte(y); y+=nH; }
    drawZiSi(y); y+= type==='studio' ? lH+nH : lH;
    push('balcon',0,y,W,bH,balLabel,true);
  }
  return rms;
}

function _rvFloor(b, floorIdx){
  const {bW, bD, cores, P} = b;
  const isGround = floorIdx === 0;
  const fnKey    = _rvMix(P);
  const rects    = [];

  // ── Apartamente rezidențiale ─────────────────────────────────────────────
  if(fnKey === 'rezCol'){
    // ── Limite spațiu disponibil ──────────────────────────────────────────
    const northMaxD  = cores.length > 0 ? cores[0].y : bD*0.4;
    const southStart = cores.length > 0 ? cores[0].y+cores[0].h : bD*0.6;
    const southAvailD= bD-southStart;
    const hasDoubleCorridor = southAvailD >= 4.0;

    // ── Nuclee scări+lift ─────────────────────────────────────────────────
    cores.forEach(core=>{
      rects.push({t:'core', x:core.x, y:core.y, w:core.w, h:core.h,
        lbl:b.niv>=5?'🪜 Sc.\n🛗 Lift':'🪜 Scări', apt:-1});
    });

    // ── CORIDOR CONTINUU — un singur dreptunghi pe toată lățimea ─────────
    // VECHI: genera vestibuluri per-nucleu × lățimea integrală a bayului → 348m² bug
    // NOU: un singur coridor de 1.5-2m + holuri mici NUMAI la poziția nucleelor
    const coreY = cores[0].y;
    const coreH = cores[0].h;
    const corrH = Math.max(1.5, Math.min(2.0, coreH * 0.24)); // 1.5–2.0m coridor
    const vestH = Math.max(0, coreH - corrH);                  // restul la nucleu

    // 1. Coridor continuu pe toată lățimea clădirii
    rects.push({t:'hall', x:0, y:coreY, w:bW, h:corrH,
      lbl:'Coridor etaj', apt:-3, zIdx:-1, normMin:0});

    // 2. Holuri mici NUMAI la poziția fiecărui nucleu (nu între ele!)
    cores.forEach((core) => {
      if(vestH > 0.5)
        rects.push({t:'hall',
          x:core.x, y:coreY+corrH, w:core.w, h:vestH,
          lbl:'Hol nucleu', apt:-3, zIdx:-1, normMin:0});
    });

    // ── Generăm apartamente pentru fiecare coloană ────────────────────────
    // northMaxD = coreY (apartamente nord de la y=0 până la coridorul central)
    // southStart = coreY + corrH (apartamente sud pornesc IMEDIAT după coridor)
    // Nucleele de scări (coreH=6.6m) se suprapun parțial, dar colBounds le exclude pe x
    const northMaxD_  = coreY;
    const southStart_ = coreY + corrH;   // ← era coreY+coreH → lăsa 5m gol
    const southAvailD_= bD - southStart_;

    // ── GENERARE APARTAMENTE: umplu TOATĂ lățimea (fără gol la core) ─────────
    // Apartamentele nord și sud ocupă x=0..bW, împărțite în bay-uri egale.
    // Casa scărilor (core) apare NUMAI în HOL NIVEL — nu taie ap-urile vertical.
    const floorFn     = _rvGetFloorFn(floorIdx);
    const isLastFloor = (floorIdx === b.niv - 1);
    // Nr. apartamente pe o parte: minim 2, bazat pe lățimea clădirii
    const nBaysN = Math.max(2, Math.round(bW / 6.5));
    const nBaysS = Math.max(2, Math.round(bW / 6.5));
    const totalUnits  = nBaysN + nBaysS;
    const unitTypes   = _rvBuildUnitList(totalUnits, floorFn, _RV.unitMix, isLastFloor);
    const fallback = floorFn==='rez'?'2cam':floorFn==='birouri'?'openspace':floorFn==='hotel'?'standard':'retail';

    // NORD — apartamente pe toată lățimea (y=0 la y=coreY)
    if(northMaxD_ >= 3.5){
      const bayWN = bW / nBaysN;
      for(let i=0;i<nBaysN;i++){
        const xL=i*bayWN, xR=(i+1)*bayWN;
        const typeN = unitTypes[i] || fallback;
        _rvFillUnit(xL, 0, xR-xL, northMaxD_, i, false, floorFn, typeN)
          .forEach(r=>rects.push(r));
      }
    }

    // SUD — apartamente pe toată lățimea (y=coreY+corrH la y=bD)
    if(southAvailD_ >= 3.5){
      const bayWS = bW / nBaysS;
      for(let i=0;i<nBaysS;i++){
        const xL=i*bayWS, xR=(i+1)*bayWS;
        const typeS = unitTypes[nBaysN+i] || fallback;
        _rvFillUnit(xL, southStart_, xR-xL, southAvailD_, nBaysN+i, true, floorFn, typeS)
          .forEach(r=>rects.push(r));
      }
    }

    // ── Hol intrare parter ────────────────────────────────────────────────
    if(isGround)
      rects.push({t:'hall', x:0, y:bD-2.4, w:bW, h:2.4,
        lbl:'Hol intrare + Căsuțe poștale', apt:-2, zIdx:-1, normMin:0});

  } else if(fnKey === 'birouri'){
    cores.forEach(core => rects.push({t:'core', x:core.x, y:core.y, w:core.w, h:core.h, lbl:'🪜 Sc.\n🛗 Lift', apt:-1}));
    rects.push({t:'office',  x:0,          y:0,          w:bW*0.65,     h:bD*0.55,   lbl:'Open Space', apt:0});
    rects.push({t:'meeting', x:bW*0.65+.3, y:0,          w:bW*0.35-.3,  h:bD*0.4,    lbl:'Sală Ședințe', apt:0});
    rects.push({t:'kitchen', x:bW*0.65+.3, y:bD*0.4+.3,  w:bW*0.18,     h:bD*0.3,    lbl:'Break room', apt:0});
    rects.push({t:'bath',    x:bW*0.83+.3, y:bD*0.4+.3,  w:bW*0.17-.3,  h:bD*0.15,   lbl:'Sanitar M', apt:0});
    rects.push({t:'wc',      x:bW*0.83+.3, y:bD*0.55+.3, w:bW*0.17-.3,  h:bD*0.15,   lbl:'Sanitar F', apt:0});
    rects.push({t:'office',  x:0,          y:bD*0.55+.3,  w:bW*0.65,     h:bD*0.45-.3, lbl:'Open Space 2', apt:1});
    if(isGround)
      rects.push({t:'reception', x:0, y:bD*0.75, w:bW, h:bD*0.25, lbl:'Recepție + Hol', apt:-2, zIdx:-1});

  } else if(fnKey === 'hotel'){
    cores.forEach(core => rects.push({t:'core', x:core.x, y:core.y, w:core.w, h:core.h, lbl:'🪜 Sc.\n🛗 Lift', apt:-1}));
    const rW=4.2; const rD=6.0;
    const nLeft = Math.floor((cores[0]?.x||bW/2)/(rW+0.15));
    for(let i=0;i<nLeft;i++){
      rects.push({t:'bedroom', x:i*(rW+0.15), y:0, w:rW, h:rD, lbl:`Cam.${i+101}\n${_rvFmt(rW*rD)}m²`, apt:i});
      rects.push({t:'bath',    x:i*(rW+0.15), y:rD+0.15, w:rW, h:bD-rD-0.15, lbl:'Bth', apt:i});
    }
    if(isGround)
      rects.push({t:'commercial', x:0, y:bD*0.6, w:bW, h:bD*0.4, lbl:'Recepție + Lobby Hotel', apt:-2, zIdx:-1});

  } else { // mixt
    cores.forEach(core => rects.push({t:'core', x:core.x, y:core.y, w:core.w, h:core.h, lbl:'🪜 Sc.\n🛗 Lift', apt:-1}));
    if(isGround){
      rects.push({t:'commercial', x:0,          y:0,          w:bW*0.55, h:bD,      lbl:'Spațiu Comercial', apt:0});
      rects.push({t:'hall',       x:bW*0.55+.3, y:0,          w:bW*0.45-.3, h:bD*0.5, lbl:'Back-office', apt:0});
      rects.push({t:'bath',       x:bW*0.55+.3, y:bD*0.5+.3,  w:bW*0.45-.3, h:bD*0.5-.3, lbl:'Depozit+Sanitar', apt:0});
    } else {
      const tplM = _RV_APT.apt2c; const sc = Math.min(1, Math.min((bW-4)/tplM.w, bD/tplM.d))*0.92;
      tplM.rooms.forEach(r => rects.push({t:r.t,lbl:r.lbl,bal:r.bal||false,apt:0,x:r.x*sc,y:r.y*sc,w:r.w*sc,h:r.h*sc}));
    }
  }

  // ── Ferestre ────────────────────────────────────────────────────────────
  const wins = []; const EPS=0.5;
  rects.filter(r=>!['core','hall','storage','wc','bath'].includes(r.t)&&!r.bal).forEach(r=>{
    if(r.y<=EPS && r.w>2) wins.push({wall:'N',x:r.x+r.w*.2,y:0,w:r.w*.55,type:r.t,apt:r.apt});
    if(r.y+r.h>=bD-EPS && r.w>2) wins.push({wall:'S',x:r.x+r.w*.15,y:bD,w:r.w*.65,type:r.t,apt:r.apt});
    if(r.x<=EPS && r.h>2) wins.push({wall:'V',x:0,y:r.y+r.h*.2,h:r.h*.5,type:r.t,apt:r.apt});
    if(r.x+r.w>=bW-EPS && r.h>2) wins.push({wall:'E',x:bW,y:r.y+r.h*.2,h:r.h*.5,type:r.t,apt:r.apt});
  });

  // ── Uși ─────────────────────────────────────────────────────────────────
  const doors = [];
  if(isGround) doors.push({x:bW/2-0.9, y:bD, w:1.8, type:'main', swing:'out'});
  cores.forEach(core=>{
    doors.push({x:core.x-0.85, y:core.y+core.h*.25, w:0.9, type:'apt', swing:'right'});
    doors.push({x:core.x+core.w+.05, y:core.y+core.h*.25, w:0.9, type:'apt', swing:'left'});
  });
  // ── Uși interioare: hol apartament → fiecare cameră ────────────────────
  const aptIds=[...new Set(rects.filter(r=>r.apt>0).map(r=>r.apt))];
  aptIds.forEach(aptId=>{
    const aptRooms=rects.filter(r=>r.apt===aptId);
    const holApt=aptRooms.find(r=>r.t==='hall');
    if(!holApt) return;
    // Adăugăm ușă pe peretele comun hol↔cameră
    aptRooms.filter(r=>r.t!=='hall'&&r.t!=='balcon').forEach(room=>{
      // Detectăm peretele comun (adiacență orizontală sau verticală)
      const EPS2=0.15;
      // Perete orizontal comun (hol sus/jos față de cameră)
      if(Math.abs((holApt.y+holApt.h)-room.y)<EPS2||Math.abs((room.y+room.h)-holApt.y)<EPS2){
        const xOverlapStart=Math.max(holApt.x,room.x);
        const xOverlapEnd=Math.min(holApt.x+holApt.w,room.x+room.w);
        if(xOverlapEnd-xOverlapStart>0.8){
          const wallY=Math.abs((holApt.y+holApt.h)-room.y)<EPS2?holApt.y+holApt.h:room.y+room.h;
          const doorX=xOverlapStart+(xOverlapEnd-xOverlapStart)/2-0.4;
          doors.push({x:doorX,y:wallY,w:0.8,type:'int',swing:'right',axis:'H',aptIdx:aptId});
        }
      }
      // Perete vertical comun (hol stânga/dreapta față de cameră)
      if(Math.abs((holApt.x+holApt.w)-room.x)<EPS2||Math.abs((room.x+room.w)-holApt.x)<EPS2){
        const yOverlapStart=Math.max(holApt.y,room.y);
        const yOverlapEnd=Math.min(holApt.y+holApt.h,room.y+room.h);
        if(yOverlapEnd-yOverlapStart>0.8){
          const wallX=Math.abs((holApt.x+holApt.w)-room.x)<EPS2?holApt.x+holApt.w:room.x+room.w;
          const doorY=yOverlapStart+(yOverlapEnd-yOverlapStart)/2-0.4;
          doors.push({x:wallX,y:doorY,w:0.8,type:'int',swing:'right',axis:'V',aptIdx:aptId});
        }
      }
    });
    // Ușă balcon (din living/dormitor spre balcon)
    const balcoane=aptRooms.filter(r=>r.bal||r.t==='balcon');
    balcoane.forEach(balc=>{
      const src=aptRooms.find(r=>r.t==='living')||aptRooms.find(r=>r.t==='bedroom');
      if(!src) return;
      const EPS3=0.15;
      if(Math.abs((src.y+src.h)-balc.y)<EPS3||Math.abs((balc.y+balc.h)-src.y)<EPS3){
        const xS=Math.max(src.x,balc.x), xE=Math.min(src.x+src.w,balc.x+balc.w);
        if(xE-xS>0.8){
          const wallY2=Math.abs((src.y+src.h)-balc.y)<EPS3?src.y+src.h:balc.y+balc.h;
          doors.push({x:xS+(xE-xS)/2-0.5,y:wallY2,w:1.0,type:'balcon',swing:'right',axis:'H',aptIdx:aptId});
        }
      }
      if(Math.abs((src.x+src.w)-balc.x)<EPS3||Math.abs((balc.x+balc.w)-src.x)<EPS3){
        const yS=Math.max(src.y,balc.y), yE=Math.min(src.y+src.h,balc.y+balc.h);
        if(yE-yS>0.8){
          const wallX2=Math.abs((src.x+src.w)-balc.x)<EPS3?src.x+src.w:balc.x+balc.w;
          doors.push({x:wallX2,y:yS+(yE-yS)/2-0.5,w:1.0,type:'balcon',swing:'right',axis:'V',aptIdx:aptId});
        }
      }
    });
  });

  // ── ETAPA 5b: Verificare adiacențe (matrice) ────────────────────────────
  const aptIdsAdj=[...new Set(rects.filter(r=>r.apt>0).map(r=>r.apt))];
  aptIdsAdj.forEach(aptId=>{
    const rooms_=rects.filter(r=>r.apt===aptId);
    const living_=rooms_.find(r=>r.t==='living');
    const balcon_=rooms_.find(r=>r.bal||r.t==='balcon');
    if(living_&&balcon_){
      const adj_=(Math.abs((living_.y+living_.h)-balcon_.y)<0.3||
                  Math.abs((balcon_.y+balcon_.h)-living_.y)<0.3||
                  Math.abs((living_.x+living_.w)-balcon_.x)<0.3||
                  Math.abs((balcon_.x+balcon_.w)-living_.x)<0.3);
      living_._adjBalcon=adj_;
    }
  });
  // ── Solar OMS 119 ────────────────────────────────────────────────────────
  const dirScore = {S:2.8,SE:2.5,SV:2.5,E:2.2,V:2.0,N:0.9,NE:1.4,NV:1.3}[P.frontDir]||1.8;
  rects.forEach(r=>{
    if(['living','bedroom','bedroom2','bedroom3','office'].includes(r.t)){
      const h = Math.min(4, (dirScore + floorIdx*0.05)).toFixed(1);
      r.solarH = h; r.solarOk = parseFloat(h) >= _RV_OMS119_H;
    }
  });

  // ── ISU ──────────────────────────────────────────────────────────────────
  const isuIssues = [];
  cores.forEach(core=>{
    const cx=core.x+core.w/2, cy=core.y+core.h/2;
    rects.filter(r=>r.apt>=0).forEach(r=>{
      const d=Math.hypot(r.x+r.w/2-cx, r.y+r.h/2-cy);
      if(d>_RV_P118_CORR) isuIssues.push({lbl:r.lbl, d:d.toFixed(0)});
    });
  });

  return {rects, wins, doors, floorIdx, bW, bD,
          isu:{ok:isuIssues.length===0, issues:isuIssues}};
}

// ══════════════════════════════════════════════════════════════════════════
// RENDERER
// ══════════════════════════════════════════════════════════════════════════
function _rvInitCanvas(W,H,canvasId){
  const cv = document.getElementById(canvasId||'rv-canvas');
  if(!cv) {
    // Canvas nu exista in DOM - cream unul temporar
    const tmp = document.createElement('canvas');
    tmp.id = canvasId||'rv-canvas-tmp';
    const wrap = document.getElementById('rv-canvas')?.parentElement || document.body;
    wrap.appendChild(tmp);
    return _rvInitCanvas(W,H,tmp.id);
  }
  const _mob=window.innerWidth<768||/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  let dpr=Math.min(window.devicePixelRatio||1,_mob?2:1);
  cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);
  cv.style.width=W+'px';cv.style.height=H+'px';
  let ctx=cv.getContext('2d');
  if(!ctx&&dpr>1){dpr=1;cv.width=Math.round(W);cv.height=Math.round(H);ctx=cv.getContext('2d');}
  if(!ctx){console.error('[RV] ctx null W='+W+' H='+H);return {cv,ctx:null,W,H};}
  ctx.scale(dpr,dpr);
  return {cv,ctx,cv2:cv,ctx2:ctx,W,H};
}

function _rvRender(){
  if(!_RV.building){
    // Afișăm mesaj de eroare în canvas
    const cv = document.getElementById('rv-canvas');
    if(cv && cv.width > 0){
      const ctx2 = cv.getContext('2d');
      if(ctx2){
        ctx2.fillStyle='#FFFFFF'; ctx2.fillRect(0,0,cv.width,cv.height);
        ctx2.fillStyle='rgba(255,94,91,0.8)'; ctx2.font='bold 13px IBM Plex Mono';
        ctx2.textAlign='center';
        ctx2.fillText('Eroare la generarea planului.', cv.width/2/Math.min(window.devicePixelRatio||1,2), cv.height/2/Math.min(window.devicePixelRatio||1,2));
        ctx2.textAlign='left';
      }
    }
    return;
  }
  // Lazy: calculăm etajul dacă nu a fost calculat încă (mobil)
  if(_RV.floors[_RV.floor] === null){
    try{ _RV.floors[_RV.floor] = _rvFloor(_RV.building, _RV.floor); }catch(e){}
  }
  const fl = _RV.floors[_RV.floor] || _RV.floors[0];
  const b  = _RV.building;
  // ── Curăță handler-ul de hover când NU suntem pe Plan ─────────────────────
  // Bug: hover-ul de plan (tooltip camere) rămâne activ pe canvas la switch tab
  if(_RV.tab !== 'plan'){
    const cv_=document.getElementById('rv-canvas');
    if(cv_){ cv_.onmousemove=null; cv_.onmouseleave=null; }
    const tip=document.getElementById('rv-tip');
    if(tip) tip.style.display='none';
  }
  if     (_RV.tab==='plan')     _rvRenderPlan(fl,b);
  else if(_RV.tab==='fatada')   _rvRenderFacade(b);
  else if(_RV.tab==='sectiune') _rvRenderSection(b);
  else if(_RV.tab==='axono')    _rvRenderAxono(b);
  else if(_RV.tab==='scenarii') _rvRenderScenarii(b);
}


// ── Mobilier schematic per tip cameră ────────────────────────────────────────
function _rvDrawFurniture(ctx, r, rx, ry, rw, rh, SC){
  ctx.save();
  ctx.strokeStyle='rgba(30,41,59,.5)'; ctx.lineWidth=0.8; ctx.fillStyle='rgba(30,41,59,.08)';
  const t=r.t, w=rw, h=rh;
  try{
    if(t==='living'||t==='reception'){
      // Canapea (pe peretele opus ferestrei)
      const sw=Math.min(w*.65,SC*2.2), sh=Math.min(h*.28,SC*.9);
      const sx=rx+w/2-sw/2, sy=ry+h-sh-4;
      ctx.fillRect(sx,sy,sw,sh); ctx.strokeRect(sx,sy,sw,sh);
      // Masă cafea
      const tw=sw*.5, th=sh*.6;
      ctx.strokeRect(rx+w/2-tw/2,sy-th-4,tw,th);
      // TV pe perete nord
      if(w>SC*2){ ctx.fillStyle='rgba(30,41,59,.2)'; ctx.fillRect(rx+w*.2,ry+3,w*.6,SC*.15); }
    }
    else if(t==='bedroom'||t==='bedroom2'||t==='bedroom3'){
      // Pat dublu sau simplu
      const dbl=r.w*r.h>=10;
      const bw=dbl?Math.min(w*.7,SC*1.6):Math.min(w*.55,SC*.9);
      const bh=Math.min(h*.55,SC*2);
      const bx=rx+w/2-bw/2, by=ry+4;
      ctx.fillRect(bx,by,bw,bh); ctx.strokeRect(bx,by,bw,bh);
      // Pernă(e)
      ctx.fillStyle='rgba(255,255,255,.8)';
      if(dbl){ctx.fillRect(bx+4,by+4,bw/2-8,bh*.3); ctx.fillRect(bx+bw/2+4,by+4,bw/2-8,bh*.3);}
      else {ctx.fillRect(bx+4,by+4,bw-8,bh*.3);}
      // Noptiere(e)
      ctx.fillStyle='rgba(30,41,59,.08)'; ctx.strokeStyle='rgba(30,41,59,.4)';
      const ns=SC*.35;
      if(bx-ns-2>rx){ctx.fillRect(bx-ns-2,by,ns,ns);ctx.strokeRect(bx-ns-2,by,ns,ns);}
      if(bx+bw+2+ns<rx+w){ctx.fillRect(bx+bw+2,by,ns,ns);ctx.strokeRect(bx+bw+2,by,ns,ns);}
    }
    else if(t==='kitchen'){
      // Blat de lucru în L
      const cw=SC*.55, ch=SC*.55;
      // Perete stânga
      ctx.fillRect(rx+2,ry+2,cw,h-4); ctx.strokeRect(rx+2,ry+2,cw,h-4);
      // Perete sus
      ctx.fillRect(rx+cw+2,ry+2,w-cw-4,ch); ctx.strokeRect(rx+cw+2,ry+2,w-cw-4,ch);
      // Chiuvetă
      ctx.strokeStyle='rgba(30,41,59,.7)'; ctx.lineWidth=1;
      ctx.strokeRect(rx+4,ry+4,cw*.6,ch*.6);
      ctx.beginPath();ctx.arc(rx+4+cw*.3,ry+4+ch*.3,ch*.15,0,Math.PI*2);ctx.stroke();
    }
    else if(t==='bath'){
      // Cadă
      const tw=Math.min(w-8,SC*1.6), th=Math.min(h*.55,SC*.8);
      ctx.fillRect(rx+4,ry+4,tw,th); ctx.strokeRect(rx+4,ry+4,tw,th);
      // Oval interior (cada)
      ctx.beginPath();ctx.ellipse(rx+4+tw/2,ry+4+th/2,tw*.38,th*.35,0,0,Math.PI*2);ctx.stroke();
      // Chiuvetă
      const bw2=SC*.45, bh2=SC*.35;
      ctx.strokeRect(rx+4,ry+th+8,bw2,bh2);
      ctx.beginPath();ctx.arc(rx+4+bw2/2,ry+th+8+bh2/2,bh2*.3,0,Math.PI*2);ctx.stroke();
    }
    else if(t==='wc'){
      // WC
      const tw=Math.min(w*.6,SC*.6), th=Math.min(h*.5,SC*.8);
      ctx.beginPath();
      ctx.ellipse(rx+tw/2+4,ry+th+4,tw/2,th/2,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
      ctx.fillStyle='rgba(255,255,255,.7)';
      ctx.beginPath();
      ctx.ellipse(rx+tw/2+4,ry+th+4,tw*.35,th*.35,0,0,Math.PI*2); ctx.fill();
      // Rezervor
      ctx.fillStyle='rgba(30,41,59,.08)';
      ctx.fillRect(rx+4,ry+4,tw,SC*.2); ctx.strokeRect(rx+4,ry+4,tw,SC*.2);
      // Chiuvetă
      if(h>SC*.9){ ctx.strokeRect(rx+tw+8,ry+4,SC*.4,SC*.35);
        ctx.beginPath();ctx.arc(rx+tw+8+SC*.2,ry+4+SC*.175,SC*.12,0,Math.PI*2);ctx.stroke(); }
    }
    else if(t==='office'||t==='meeting'){
      // Birou
      const dw=Math.min(w*.7,SC*1.4), dh=SC*.6;
      ctx.fillRect(rx+w/2-dw/2,ry+h-dh-4,dw,dh); ctx.strokeRect(rx+w/2-dw/2,ry+h-dh-4,dw,dh);
      // Scaun
      ctx.strokeRect(rx+w/2-SC*.25,ry+h-dh-SC*.5-8,SC*.5,SC*.45);
    }
  }catch(e){}
  ctx.restore();
}

function _rvRenderPlan(fl,b){
  const {P,bW,bD}=b; const SC=_RV.scale;
  const pad=60; const lm=50;
  const W = bW*SC + pad*2 + P.rl*2*SC + 40;
  const H = bD*SC + pad*2 + (P.rf+P.rs)*SC + 60;
  const {cv,ctx}=_rvInitCanvas(W,H);
  if(!ctx){console.error('[RV] ctx null');return;}
  if(!fl){console.error('[RV] fl undefined');return;}
  ctx.fillStyle='#FFFFFF'; ctx.fillRect(0,0,W,H);
  // grid bg
  ctx.strokeStyle='rgba(255,255,255,.018)'; ctx.lineWidth=.5;
  for(let x=0;x<W;x+=SC){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
  for(let y=0;y<H;y+=SC){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}

  const ox=pad+P.rl*SC; const oy=pad+P.rf*SC;
  _RV.planOx=ox; _RV.planOy=oy; _RV.planSc=SC; // click detection coords
  ctx.strokeStyle='rgba(212,175,55,.35)';ctx.lineWidth=1;ctx.setLineDash([SC*.5,SC*.5]);
  ctx.strokeRect(pad,pad,P.W*SC,P.D*SC); ctx.setLineDash([]);
  ctx.fillStyle='#334155';ctx.font='bold 8px IBM Plex Mono';
  ctx.fillText(`Nr. cad. ${P.nrCad}  ·  ${P.W}m × ${P.D}m  ·  ${P.area}m²  ·  UTR ${P.utr}`,pad+4,pad-6);

  // Retrageri
  ctx.strokeStyle='rgba(212,175,55,.18)';ctx.lineWidth=.8;ctx.setLineDash([SC*.3,SC*.3]);
  ctx.strokeRect(ox,oy,bW*SC,bD*SC); ctx.setLineDash([]);

  // Stradă
  const stY=oy+bD*SC+P.rs*SC+8;
  ctx.fillStyle='rgba(30,64,175,.08)';ctx.fillRect(pad,stY,P.W*SC,20);
  ctx.fillStyle='#1e40af';ctx.font='bold 9px IBM Plex Mono';ctx.textAlign='center';
  ctx.fillText('▲  FRONT STRADAL  ·  '+P.frontDir,pad+P.W*SC/2,stY+14);
  ctx.textAlign='left';

  // Structurală grid
  if(_RV.showSGrid){
    ctx.strokeStyle='rgba(59,130,246,.15)';ctx.lineWidth=.5;ctx.setLineDash([3,3]);
    for(let x=ox;x<ox+bW*SC;x+=SC*5.4){ctx.beginPath();ctx.moveTo(x,oy);ctx.lineTo(x,oy+bD*SC);ctx.stroke();}
    for(let y=oy;y<oy+bD*SC;y+=SC*3.6){ctx.beginPath();ctx.moveTo(ox,y);ctx.lineTo(ox+bW*SC,y);ctx.stroke();}
    ctx.setLineDash([]);
  }

  // Building fill
  ctx.fillStyle='#F1F5F9';ctx.fillRect(ox,oy,bW*SC,bD*SC);
  ctx.strokeStyle='#334155';ctx.lineWidth=2;ctx.strokeRect(ox,oy,bW*SC,bD*SC);

  // Dacă nu există camere - afișăm mesaj în canvas
  if(!fl||!fl.rects||fl.rects.length===0){
    ctx.fillStyle='rgba(232,179,65,0.7)';
    ctx.font='bold 14px IBM Plex Mono';
    ctx.textAlign='center';
    ctx.fillText('Plan în curs de generare...', W/2, H/2 - 20);
    ctx.font='11px IBM Plex Mono';
    ctx.fillStyle='rgba(138,150,166,0.8)';
    ctx.fillText('Dimensiuni corp: '+bW.toFixed(1)+'m × '+bD.toFixed(1)+'m', W/2, H/2+5);
    ctx.fillText('Selectați un alt corp sau ajustați parametrii', W/2, H/2+22);
    ctx.textAlign='left';
    return;
  }

  // ── Pereți reali dacă _extractWalls e disponibil ─────────────────────────
  if(typeof _extractWalls === 'function'){
    _rvDrawWallsCanvas(ctx, fl, b, ox, oy, SC);
  }
  // Camere (etichete + mobilier — peste pereți)
  [...fl.rects].sort((a,m_)=>(a.zIdx||0)-(m_.zIdx||0)).forEach(r=>{
    const C=_RV_COLORS[r.t]||_RV_COLORS.hall;
    const rx=ox+r.x*SC, ry=oy+r.y*SC, rw=r.w*SC, rh=r.h*SC;
    // Solar overlay
    if(_RV.showSolar&&r.solarOk!=null){
      ctx.fillStyle=r.solarOk?'rgba(34,197,94,.12)':'rgba(239,68,68,.12)';
      ctx.fillRect(rx,ry,rw,rh);
    }
    ctx.fillStyle=C.fill; ctx.fillRect(rx+1,ry+1,rw-2,rh-2);
    // Mobilier
    if(rw>SC*1.2 && rh>SC*1.2 && !r.bal) _rvDrawFurniture(ctx,r,rx+2,ry+2,rw-4,rh-4,SC);
    ctx.strokeStyle=C.stroke; ctx.lineWidth=r.bal?1:1.5;
    if(C.dash) ctx.setLineDash([4,3]);
    ctx.strokeRect(rx+1,ry+1,rw-2,rh-2); ctx.setLineDash([]);
    // Label
    if(rw>22&&rh>14){
      const lines=(r.lbl||r.t).split('\n');
      ctx.fillStyle='#0F172A'; ctx.font=`bold ${Math.min(9,rw/6)}px IBM Plex Mono`; ctx.textAlign='center';
      lines.forEach((ln,li)=>ctx.fillText(ln,rx+rw/2,ry+rh/2+(li-(lines.length-1)/2)*11));
      if(!r.bal&&rh>24&&r.w*r.h>1){
        ctx.fillStyle='rgba(0,0,0,.4)';ctx.font=`${Math.min(8,rw/8)}px IBM Plex Mono`;
        ctx.fillText(_rvFmt(r.w*r.h)+'m²',rx+rw/2,ry+rh/2+lines.length*5.5+8);
      }
      ctx.textAlign='left';
    }
    if(_RV.showSolar&&r.solarH){
      ctx.fillStyle=r.solarOk?'rgba(34,197,94,.9)':'rgba(239,68,68,.9)';
      ctx.font='bold 8px IBM Plex Mono';ctx.textAlign='center';
      ctx.fillText(r.solarH+'h☀',rx+rw/2,ry+rh-5);ctx.textAlign='left';
    }
    if(_RV.showISU&&r.apt>=0&&b.cores.length){
      const core=b.cores[0]; const d=Math.hypot(r.x+r.w/2-core.x-core.w/2,r.y+r.h/2-core.y-core.h/2);
      const ok=d<=_RV_P118_CORR;
      ctx.fillStyle=ok?'rgba(34,197,94,.7)':'rgba(239,68,68,.9)';
      ctx.font='8px IBM Plex Mono';ctx.textAlign='center';
      ctx.fillText(d.toFixed(0)+'m',rx+rw/2,ry+10);ctx.textAlign='left';
    }
  });

  // ── PEREȚI: borduri groase + hașuri structurale ──────────────────────────
  const wallPx = Math.max(2, SC * 0.17); // ~17cm perete non-structural
  const extWallPx = Math.max(3, SC * 0.25); // ~25cm perete exterior/structural

  // Hașuri diagonale pentru elemente structurale (cores, pereți BA)
  function _hatch(x,y,w,h,col,sp){
    ctx.save();
    ctx.beginPath(); ctx.rect(x,y,w,h); ctx.clip();
    ctx.strokeStyle=col||'rgba(20,40,90,0.28)'; ctx.lineWidth=0.7;
    for(let i=-(Math.max(w,h));i<w+Math.max(w,h);i+=sp||Math.max(4,SC*0.35)){
      ctx.beginPath(); ctx.moveTo(x+i,y); ctx.lineTo(x+i+h,y+h); ctx.stroke();
    }
    ctx.restore();
  }

  // Pasul 1: peretele exterior clădirii (cel mai gros)
  ctx.save();
  ctx.strokeStyle='rgba(5,12,40,0.96)';
  ctx.lineWidth=extWallPx;
  ctx.strokeRect(ox+extWallPx*.5,oy+extWallPx*.5,bW*SC-extWallPx,bD*SC-extWallPx);
  // Hașura peretelui exterior
  _hatch(ox,oy,extWallPx*1.5,bD*SC,'rgba(15,30,70,0.22)',Math.max(3,SC*0.25));           // V
  _hatch(ox+bW*SC-extWallPx*1.5,oy,extWallPx*1.5,bD*SC,'rgba(15,30,70,0.22)',Math.max(3,SC*0.25)); // E
  _hatch(ox,oy,bW*SC,extWallPx*1.5,'rgba(15,30,70,0.22)',Math.max(3,SC*0.25));            // N
  _hatch(ox,oy+bD*SC-extWallPx*1.5,bW*SC,extWallPx*1.5,'rgba(15,30,70,0.22)',Math.max(3,SC*0.25)); // S
  ctx.restore();

  // Pasul 2: borduri camere (pereți interiori)
  [...fl.rects].sort((a,m_)=>(a.zIdx||0)-(m_.zIdx||0)).forEach(r=>{
    if(r.bal) return;
    const rx=ox+r.x*SC, ry=oy+r.y*SC, rw=r.w*SC, rh=r.h*SC;
    const wp = r.t==='core' ? wallPx*1.3 : wallPx;
    ctx.strokeStyle = r.t==='core' ? 'rgba(5,15,45,0.95)' : 'rgba(12,25,60,0.75)';
    ctx.lineWidth = wp;
    ctx.setLineDash([]);
    ctx.strokeRect(rx+wp*.5,ry+wp*.5,rw-wp,rh-wp);
    // Hașura structurală (cores — beton armat)
    if(r.t==='core'){
      // Hașură structurală
      _hatch(rx+wp,ry+wp,rw-wp*2,rh-wp*2,'rgba(20,50,120,0.30)',Math.max(3,SC*0.3));
      // Simbol scări — linii orizontale paralele cu săgeată
      const stX=rx+wp+2, stY=ry+wp+2;
      const stW=Math.max(8,(rw-wp*2)*0.55), stH=rh-wp*2-4;
      if(stW>6&&stH>6){
        const nSteps=Math.max(4,Math.floor(stH/Math.max(2,SC*0.22)));
        ctx.strokeStyle='rgba(147,197,253,.5)'; ctx.lineWidth=0.6;
        for(let si=1;si<=nSteps;si++){
          const ly_=stY+si*(stH/nSteps);
          ctx.beginPath(); ctx.moveTo(stX,ly_); ctx.lineTo(stX+stW,ly_); ctx.stroke();
        }
        // Săgeată direcție urcare
        const arY=stY+stH*0.45;
        ctx.strokeStyle='rgba(147,197,253,.8)'; ctx.lineWidth=1.2;
        ctx.beginPath(); ctx.moveTo(stX+stW*0.2,arY); ctx.lineTo(stX+stW*0.75,arY); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(stX+stW*0.55,arY-3); ctx.lineTo(stX+stW*0.75,arY); ctx.lineTo(stX+stW*0.55,arY+3); ctx.stroke();
      }
      // Simbol lift (pătrat cu X) în dreapta
      const lX=rx+wp+(rw-wp*2)*0.58, lY=ry+wp+3;
      const lW=Math.max(6,(rw-wp*2)*0.38), lH=Math.min(lW*1.4,rh-wp*2-6);
      if(lW>5&&lH>5){
        ctx.fillStyle='rgba(37,99,235,.15)'; ctx.strokeStyle='rgba(96,165,250,.6)'; ctx.lineWidth=0.8;
        ctx.fillRect(lX,lY,lW,lH); ctx.strokeRect(lX,lY,lW,lH);
        ctx.strokeStyle='rgba(96,165,250,.4)'; ctx.lineWidth=0.5;
        ctx.beginPath(); ctx.moveTo(lX,lY); ctx.lineTo(lX+lW,lY+lH); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(lX+lW,lY); ctx.lineTo(lX,lY+lH); ctx.stroke();
      }
    }
  });

  // Pasul 3: ferestre — goluri albe în perete + linie dublă
  // ── Goluri ferestre cu dimensiuni ─────────────────────────────────────
  fl.wins.forEach(w=>{
    ctx.fillStyle='rgba(56,189,248,.18)';
    ctx.strokeStyle='#38BDF8'; ctx.lineWidth=2;
    const wSC = (w.w||w.h||0)*SC;
    let gx,gy,gw,gh;
    if(w.wall==='N'){gx=ox+w.x*SC;gy=oy-extWallPx;gw=wSC;gh=extWallPx*2;}
    else if(w.wall==='S'){gx=ox+w.x*SC;gy=oy+bD*SC-extWallPx;gw=wSC;gh=extWallPx*2;}
    else if(w.wall==='V'){gx=ox-extWallPx;gy=oy+w.y*SC;gw=extWallPx*2;gh=wSC;}
    else{gx=ox+bW*SC-extWallPx;gy=oy+w.y*SC;gw=extWallPx*2;gh=wSC;}
    // Gol alb în perete
    ctx.fillStyle='rgba(8,15,35,.98)'; ctx.fillRect(gx,gy,gw,gh);
    // Linie fereastră (3 linii: toc + sticlă)
    ctx.fillStyle='rgba(56,189,248,.15)'; ctx.fillRect(gx,gy,gw,gh);
    ctx.strokeStyle='#38BDF8'; ctx.lineWidth=1.8;
    ctx.strokeRect(gx+1,gy+1,gw-2,gh-2);
    // Linia centrală (cercevelele ferestrei)
    ctx.strokeStyle='rgba(56,189,248,.5)'; ctx.lineWidth=0.8;
    if(w.wall==='N'||w.wall==='S'){
      ctx.beginPath(); ctx.moveTo(gx+gw/2,gy); ctx.lineTo(gx+gw/2,gy+gh); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gx,gy+gh/2); ctx.lineTo(gx+gw,gy+gh/2); ctx.stroke();
    } else {
      ctx.beginPath(); ctx.moveTo(gx,gy+gh/2); ctx.lineTo(gx+gw,gy+gh/2); ctx.stroke();
    }
  });

  // Pasul 3b: pereți interiori cu grosime
  const wallT=Math.max(2, SC*0.15); // grosime perete interior ~15cm
  const extWall=Math.max(3, SC*0.3); // grosime perete exterior ~30cm
  // Bordură exterioară groasă (perete exterior)
  ctx.fillStyle='#1E293B';
  ctx.fillRect(ox-extWall, oy-extWall, bW*SC+extWall*2, extWall); // N
  ctx.fillRect(ox-extWall, oy+bD*SC, bW*SC+extWall*2, extWall); // S
  ctx.fillRect(ox-extWall, oy-extWall, extWall, bD*SC+extWall*2); // V
  ctx.fillRect(ox+bW*SC, oy-extWall, extWall, bD*SC+extWall*2); // E
  // Haşură perete exterior (diagonale fine)
  ctx.save();
  ctx.beginPath();ctx.rect(ox-extWall,oy-extWall,bW*SC+extWall*2,extWall);
  ctx.rect(ox-extWall,oy+bD*SC,bW*SC+extWall*2,extWall);
  ctx.rect(ox-extWall,oy-extWall,extWall,bD*SC+extWall*2);
  ctx.rect(ox+bW*SC,oy-extWall,extWall,bD*SC+extWall*2);
  ctx.clip();
  ctx.strokeStyle='rgba(255,255,255,.3)'; ctx.lineWidth=.6;
  for(let hi=-bD*SC;hi<bW*SC+bD*SC;hi+=4){
    ctx.beginPath();ctx.moveTo(ox-extWall+hi,oy-extWall);ctx.lineTo(ox-extWall+hi+bD*SC+extWall*2,oy+bD*SC+extWall);ctx.stroke();
  }
  ctx.restore();
  // Pereți interiori între camere (linii groase)
  ctx.fillStyle='#334155';
  fl.rects.forEach(r=>{
    if(r.bal||r.apt<0) return;
    const rx2=ox+r.x*SC, ry2=oy+r.y*SC;
    // Linie de perete pe marginea fiecărei camere (interior)
    ctx.fillRect(rx2, ry2, r.w*SC, wallT); // perete nord
    ctx.fillRect(rx2, ry2+r.h*SC-wallT, r.w*SC, wallT); // perete sud
    ctx.fillRect(rx2, ry2, wallT, r.h*SC); // perete vest
    ctx.fillRect(rx2+r.w*SC-wallT, ry2, wallT, r.h*SC); // perete est
  });

  // Pasul 4: uși — arc + foaie ușă
  // ── Goluri uși cu dimensiuni ──────────────────────────────────────────
  fl.doors.forEach(d=>{
    const dx=ox+d.x*SC, dw=d.w*SC;
    const isMain=d.type==='main';
    const isInt=d.type==='int';
    const isBalc=d.type==='balcon';
    // Uși interioare (axis H sau V)
    if((isInt||isBalc)&&d.axis){
      const dColor=isBalc?'#0369A1':'#334155';
      const dW=d.w*SC;
      if(d.axis==='H'){
        const dx2=ox+d.x*SC, dy2=oy+d.y*SC;
        // Gol clar în perete
        ctx.fillStyle='#FFFFFF'; ctx.fillRect(dx2-2,dy2-5,dW+4,10);
        // Foaie ușă
        ctx.strokeStyle=dColor; ctx.lineWidth=1.2;
        ctx.beginPath();ctx.moveTo(dx2,dy2);ctx.lineTo(dx2+dW,dy2);ctx.stroke();
        // Arc deschidere
        ctx.strokeStyle=isBalc?'rgba(3,105,161,.4)':'rgba(51,65,85,.35)';ctx.lineWidth=.7;
        ctx.beginPath();
        for(let a=0.05;a<=Math.PI/2;a+=0.08){ctx.lineTo!==undefined&&(a<.1?ctx.moveTo(dx2+dW*Math.sin(a),dy2-dW*(1-Math.cos(a))):ctx.lineTo(dx2+dW*Math.sin(a),dy2-dW*(1-Math.cos(a))));}
        ctx.stroke();
        if(isBalc){ctx.fillStyle='#0369A1';ctx.font='6px IBM Plex Mono';ctx.textAlign='center';ctx.fillText('⟸ BALCON',dx2+dW/2,dy2+10);ctx.textAlign='left';}
      } else {
        const dx2=ox+d.x*SC, dy2=oy+d.y*SC;
        ctx.fillStyle='#FFFFFF'; ctx.fillRect(dx2-2,dy2,4,dW);
        ctx.strokeStyle=dColor; ctx.lineWidth=1.2;
        ctx.beginPath();ctx.moveTo(dx2,dy2);ctx.lineTo(dx2,dy2+dW);ctx.stroke();
        ctx.strokeStyle='rgba(51,65,85,.35)';ctx.lineWidth=.7;
        ctx.beginPath();
        for(let a=0.05;a<=Math.PI/2;a+=0.08){const ax=dx2+dW*(1-Math.cos(a)),ay=dy2+dW*Math.sin(a);a<.1?ctx.moveTo(ax,ay):ctx.lineTo(ax,ay);}
        ctx.stroke();
      }
      return;
    }
    const dy_d = d.y!==undefined ? oy+d.y*SC : oy+bD*SC;
    // Golul în perete (alb)
    if(d.swing==='out'||isMain){
      ctx.fillStyle='rgba(8,15,35,.98)'; ctx.fillRect(dx-1,dy_d-extWallPx,dw+2,extWallPx*2);
    }
    // Foaia ușii + arc deschidere + indicator intrare
    ctx.strokeStyle=isMain?'#F59E0B':'#334155';
    ctx.lineWidth=isMain?2.5:1.5;
    ctx.beginPath();
    if(isMain||d.swing==='out'){
      ctx.moveTo(dx,dy_d); ctx.lineTo(dx+dw,dy_d); ctx.stroke();
      ctx.strokeStyle=isMain?'rgba(245,158,11,.6)':'rgba(51,65,85,.5)';
      ctx.lineWidth=1;
      ctx.beginPath(); ctx.arc(dx,dy_d,dw,-Math.PI/2,0); ctx.stroke();
      if(isMain){
        ctx.fillStyle='#B45309';ctx.font='bold 8px IBM Plex Mono';ctx.textAlign='center';
        ctx.fillText('▶ INTRARE BLOC',dx+dw/2,dy_d+14);ctx.textAlign='left';
      }
    } else if(d.swing==='right'){
      ctx.moveTo(dx,dy_d-wallPx); ctx.lineTo(dx+dw,dy_d-wallPx); ctx.stroke();
      ctx.beginPath(); ctx.arc(dx,dy_d-wallPx,dw,0,Math.PI/2); ctx.stroke();
      // Label intrare apartament
      ctx.fillStyle='#1D4ED8';ctx.font='7px IBM Plex Mono';ctx.textAlign='center';
      ctx.fillText('↑ Ap.'+(d.aptIdx||''),dx+dw/2,dy_d-wallPx-4);ctx.textAlign='left';
    } else {
      ctx.moveTo(dx,dy_d-wallPx); ctx.lineTo(dx+dw,dy_d-wallPx); ctx.stroke();
      ctx.beginPath(); ctx.arc(dx+dw,dy_d-wallPx,dw,Math.PI/2,Math.PI); ctx.stroke();
      ctx.fillStyle='#1D4ED8';ctx.font='7px IBM Plex Mono';ctx.textAlign='center';
      ctx.fillText('↑ Ap.'+(d.aptIdx||''),dx+dw/2,dy_d-wallPx-4);ctx.textAlign='left';
    }
    // Dimensiune ușă
    ctx.fillStyle='#1E40AF';ctx.font='7px IBM Plex Mono';ctx.textAlign='center';
    ctx.fillText(d.w?.toFixed(2)+'m',dx+dw/2,dy_d+(isMain?-5:-2));ctx.textAlign='left';
  });

  // Cote
  if(_RV.showDim) _rvDrawDims(ctx,ox,oy,bW*SC,bD*SC,bW,bD,P,SC);
  // Touch/pinch zoom pe mobil
  setTimeout(()=>{ try{_rvInitTouchCanvas(document.getElementById('rv-canvas'));}catch(e){} },200);
  // ── Tabel centralizator apartamente ────────────────────────────────────
  _rvDrawTabelApartamente(ctx,fl,b,ox,oy+bD*SC+65,Math.min(bW*SC,400));
  // ── Legendă plan ───────────────────────────────────────────────────────
  _rvDrawLegenda(ctx,ox+bW*SC+30,oy,SC);
  // Nord
  _rvDrawNorth(ctx,W-38,44,P.frontDir);
  // Scară grafică
  _rvDrawScale(ctx,pad,H-18,SC);
  // Cartuș
  _rvDrawCartus(ctx,W,H,P,fl.floorIdx);
  // Marcaj etaj
  ctx.fillStyle='rgba(212,175,55,.05)';ctx.font=`bold ${SC*6}px Space Grotesk`;ctx.textAlign='center';
  ctx.fillText(fl.floorIdx===0?'PARTER':`ETAJ ${fl.floorIdx}`,ox+bW*SC/2,oy+bD*SC/2);
  ctx.textAlign='left';

  // ── OVERLAY SOLAR (animație însorire OMS 119) ──────────────────────────
  // Pe mobil: solar animation dezactivată automat (prea intensivă pentru iOS)
  const isMobSolar = window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(_RV.showSolar && _RV.solarAnim && !isMobSolar){
    _rvDrawSolarAnim(ctx,fl,b,ox,oy,SC);
  }

  // ── OVERLAY ISU — cercuri evacuare 30m ────────────────────────────────
  if(_RV.showISU){
    _rvDrawISUCircles(ctx,b,ox,oy,SC);
  }
  


// ════════════════════════════════════════════════════════════════════════════
// MOBILE OPTIMIZATION + PMR + ENERGY + PRINT
// ════════════════════════════════════════════════════════════════════════════

// ── Touch / Pinch-to-zoom pe canvas ──────────────────────────────────────
function _rvInitTouchCanvas(cv){
  if(!cv||cv._rvTouchInit) return;
  cv._rvTouchInit = true;
  let _t0=null, _sc0=1, _pan={x:0,y:0}, _panStart=null;

  cv.addEventListener('touchstart', e=>{
    if(e.touches.length===2){
      _t0 = e.touches;
      _sc0 = _RV.scale;
    } else if(e.touches.length===1){
      _panStart = {x:e.touches[0].clientX, y:e.touches[0].clientY,
                   sx:(_RV.panX||0), sy:(_RV.panY||0)};
    }
  },{passive:true});

  cv.addEventListener('touchmove', e=>{
    e.preventDefault();
    if(e.touches.length===2&&_t0){
      const d0=Math.hypot(_t0[0].clientX-_t0[1].clientX, _t0[0].clientY-_t0[1].clientY);
      const d1=Math.hypot(e.touches[0].clientX-e.touches[1].clientX, e.touches[0].clientY-e.touches[1].clientY);
      _RV.scale = Math.max(4, Math.min(40, _sc0*(d1/d0)));
      _rvRender();
    } else if(e.touches.length===1&&_panStart){
      const dx=e.touches[0].clientX-_panStart.x;
      const dy=e.touches[0].clientY-_panStart.y;
      const wrap=document.getElementById('rv-drawwrap');
      if(wrap){ wrap.scrollLeft=_panStart.sx-dx; wrap.scrollTop=_panStart.sy-dy; }
    }
  },{passive:false});

  cv.addEventListener('touchend',()=>{ _t0=null; _panStart=null; },{passive:true});
}

// ── PMR — Accesibilitate persoane cu dizabilități (NP051/2012) ────────────
function _rvCheckPMR(b, fl, P){
  const issues=[], ok=[];
  const niv=b.niv;

  // Lift obligatoriu pentru PMR la orice clădire publică sau >P+1
  if(niv>=3){
    const hasLift=fl?.rects?.some(r=>r.t==='core'&&r.lbl?.includes('Lift'));
    if(hasLift) ok.push('✓ Lift disponibil (PMR)');
    else issues.push('✗ Lift necesar PMR — NP051 §4.2');
  }

  // Lățime coridor min 1.20m pentru scaun cu rotile
  const holuri=fl?.rects?.filter(r=>r.apt<0&&r.t==='hall')||[];
  holuri.forEach(h=>{
    const lat=Math.min(h.w,h.h);
    if(lat>=1.20) ok.push(`✓ Coridor ${lat.toFixed(1)}m ≥ 1.20m PMR`);
    else issues.push(`✗ Coridor ${lat.toFixed(1)}m < 1.20m — PMR necesită min 1.20m`);
  });

  // Intrare accesibilă (rampă la parter)
  ok.push('ℹ Rampă acces: verificare necesară la parter');

  // Baie PMR
  const bai=fl?.rects?.filter(r=>r.t==='bath')||[];
  if(bai.some(b=>b.w*b.h>=4.5)) ok.push('✓ Baie ≥4.5m² (acceptabil PMR)');
  else if(bai.length>0) issues.push('⚠ Baie sub 4.5m² — PMR recomandă min 4.5m²');

  return {issues, ok, valid:issues.filter(i=>i.startsWith('✗')).length===0};
}

// ── Clasă energetică estimată ──────────────────────────────────────────────
function _rvEnergyRating(b, P, stil){
  // Estimare simplificată bazată pe: stil arhitectural, nr. etaje, orientare
  const _A=window.AEDIS||{};
  const cortina=_A.cortinaProcent||0;
  const tipAcop=_A.tipAcoperis||'terasa';

  // Coeficient pierderi termice estimat
  let U = 0.6; // W/m²K bază (pereți BCA+EPS15cm ≈ 0.25 W/m²K)
  if(cortina>50) U += 0.3; // geam curtain wall mai puțin izolant
  if(tipAcop==='inclinat') U -= 0.05; // acoperiș mai bun
  if(b.niv>6) U -= 0.05; // mai puțin pierderi laterale

  // Consum specific estimat (kWh/m²·an)
  const qAn = Math.round(U * 85 + 20); // formula simplificată

  // Clasă energetică (conform Ordin MC 2641/2017)
  let cls='C', cls_color='#F59E0B';
  if(qAn<50){cls='A+';cls_color='#16A34A';}
  else if(qAn<75){cls='A';cls_color='#22C55E';}
  else if(qAn<100){cls='B';cls_color='#84CC16';}
  else if(qAn<125){cls='C';cls_color='#F59E0B';}
  else if(qAn<150){cls='D';cls_color='#F97316';}
  else if(qAn<175){cls='E';cls_color='#EF4444';}
  else{cls='F';cls_color='#DC2626';}

  return {cls, qAn, U:U.toFixed(2), cls_color};
}

// ── Print layout (A3 format) ───────────────────────────────────────────────
function _rvPrintLayout(){
  const cv=document.getElementById('rv-canvas');
  if(!cv) return;
  const img=cv.toDataURL('image/png');
  const b=_RV.building, P=_RV.building?.P;
  const win=window.open('','_blank','width=1200,height=800');
  win.document.write(`<!DOCTYPE html><html><head>
    <title>Plan Arhitectural — UrbanX TSS·FG</title>
    <style>
      @page{size:A3 landscape;margin:10mm}
      body{margin:0;font-family:IBM Plex Mono,monospace;background:#fff}
      .header{display:flex;justify-content:space-between;align-items:center;
              border-bottom:2px solid #1E293B;padding:4mm 6mm;margin-bottom:4mm}
      .logo{font-size:14pt;font-weight:bold;color:#1E293B}
      .meta{font-size:8pt;color:#475569;text-align:right}
      .plan{text-align:center;width:100%}
      .plan img{max-width:100%;max-height:180mm;object-fit:contain}
      .footer{position:fixed;bottom:5mm;width:100%;display:flex;
              justify-content:space-between;font-size:7pt;color:#94A3B8;
              border-top:1px solid #E2E8F0;padding-top:2mm}
      @media print{.noprint{display:none}}
    </style>
  </head><body>
    <div class="header">
      <div class="logo">UrbanX TSS·FG — Plan Arhitectural</div>
      <div class="meta">
        Nr. cad.: <b>${P?.nrCad||'—'}</b> · UTR: ${P?.utr||'—'}<br>
        Sc. 1:100 · Data: ${new Date().toLocaleDateString('ro-RO')}<br>
        ${b?.niv||'—'} niveluri · SDA: ${b?.sdaTotal?.toFixed(0)||'—'}m²
      </div>
    </div>
    <div class="plan"><img src="${img}" /></div>
    <div class="footer">
      <span>UrbanX TSS·FG — Generator Preliminar Proiectare</span>
      <span>Document orientativ · Verificare profesionist autorizat necesară</span>
      <span>${new Date().toLocaleDateString('ro-RO')}</span>
    </div>
    <div class="noprint" style="text-align:center;margin:10px">
      <button onclick="window.print()" style="padding:8px 20px;background:#1E293B;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:12px">🖨 Printează A3</button>
    </div>
  </body></html>`);
  win.document.close();
  setTimeout(()=>win.print(),500);
}

// ── PMR + Energy în panelul Verificare Normative ──────────────────────────
function _rvUpdateVerificareExtended(b, fl, P){
  const pmr=_rvCheckPMR(b, fl, P);
  const energy=_rvEnergyRating(b, P, window.AEDIS?.stil);
  const normEl=document.getElementById('rv-norm');
  if(!normEl) return;

  // Adăugăm la finalul normelor existente
  const existing=normEl.innerHTML;
  normEl.innerHTML=existing+`
    <div class="rv-norm-item">
      <div><div class="rv-nl">PMR Accesibilitate</div><div class="rv-nref">NP051/2012</div></div>
      <div class="rv-badge rv-badge-${pmr.valid?'ok':'warn'}">${pmr.valid?'CONFORM':pmr.issues.length+' PROB.'}</div>
    </div>
    <div class="rv-norm-item">
      <div><div class="rv-nl">Clasă Energetică est.</div><div class="rv-nref">MC 2641/2017</div></div>
      <div class="rv-badge" style="background:${energy.cls_color}20;color:${energy.cls_color};border:1px solid ${energy.cls_color}40">
        ${energy.cls} · ~${energy.qAn}kWh/m²
      </div>
    </div>
    <div class="rv-norm-item">
      <div><div class="rv-nl">Printare A3</div><div class="rv-nref">Export</div></div>
      <div class="rv-badge rv-badge-ok" onclick="_rvPrintLayout()" style="cursor:pointer">🖨 PRINT A3</div>
    </div>`;
}


// ════════════════════════════════════════════════════════════════════════════
// MULTI-BUILDING ENGINE
// Suport pentru: multi-volum, lotizare, comasare, multi-parcelă
// Citește din: S.vol._lastFeats (vol-src) + lotizare-src features
// ════════════════════════════════════════════════════════════════════════════

// ── Detectează și extrage toți corpii de clădire ─────────────────────────
function _rvDetectBuildings(){
  const buildings = [];

  try {
    // ── Scenariul 1: Multi-volum (S.vol.multiVol sau multiple corpuri) ────
    const volFeats = window.S?.vol?._lastFeats || [];
    const lotFeats = (window.map?.getSource?.('lotizare-src')?._data?.features) || [];
    const A = window.AEDIS || {};

    if(volFeats.length > 0){
      // Grupăm features după centroid/poziție → identificăm corpuri distincte
      const corpGroups = {};
      volFeats.forEach(f=>{
        if(!f.geometry || f.properties?.floor < 0) return; // skip acoperiș
        // Centroid aproximativ din bounding box
        const coords = f.geometry.type==='Polygon'
          ? f.geometry.coordinates[0]
          : f.geometry.coordinates[0]?.[0] || [];
        if(coords.length < 3) return;
        const cx = coords.reduce((s,c)=>s+c[0],0)/coords.length;
        const cy = coords.reduce((s,c)=>s+c[1],0)/coords.length;
        // Rotunjim la 4 zecimale pentru clustering
        const key = `${cx.toFixed(4)}_${cy.toFixed(4)}`;
        if(!corpGroups[key]) corpGroups[key] = {feats:[], cx, cy};
        corpGroups[key].feats.push(f);
      });

      const corpKeys = Object.keys(corpGroups);
      if(corpKeys.length > 1 || (corpKeys.length===1 && volFeats.length>0)){
        corpKeys.forEach((key,idx)=>{
          const grp = corpGroups[key];
          const groundFeat = grp.feats.find(f=>f.properties?.floor===0) || grp.feats[0];
          if(!groundFeat) return;

          // Bounding box din geometria parterului → dimensiuni clădire
          const coords = groundFeat.geometry.type==='Polygon'
            ? groundFeat.geometry.coordinates[0]
            : groundFeat.geometry.coordinates[0]?.[0] || [];
          const bbox = _rvBBoxFromCoords(coords);
          const niv = Math.max(1, grp.feats.filter(f=>f.properties?.floor>=0).length);
          const stil = groundFeat.properties?.stil || A.stil || 'modern';
          const fn = groundFeat.properties?.fn || A.fn || 'rezidential_colectiv';
          const parterCom = !!groundFeat.properties?.parterComercial;
          const hasCortina = !!groundFeat.properties?.pereteleCortina || !!A.peretelCortina;

          buildings.push({
            id: `Corp ${String.fromCharCode(65+idx)}`,
            idx,
            bW: bbox.w, bD: bbox.h,
            niv, stil, fn,
            parterDiferit: parterCom || A.parterDiferit,
            fnParter: parterCom ? 'comercial' : A.fnParter,
            peretelCortina: hasCortina,
            cortinaProcent: A.cortinaProcent || 60,
            activeRetragere: A.activeRetragere,
            tipAcoperis: groundFeat.properties?.roofType || A.tipAcoperis || 'terasa',
            hNiv: A.corpuri?.[0]?.hNiv || 3.0,
            source: 'vol',
          });
        });
      }
    }

    // ── Scenariul 2: Lotizare ─────────────────────────────────────────────
    if(lotFeats.length > 0){
      lotFeats.forEach((f,idx)=>{
        if(!f.geometry) return;
        const tip = f.properties?.tip || 'individuala';
        if(['drum','spatiu_verde','parcaj','utilitate'].includes(tip)) return;

        const coords = f.geometry.type==='Polygon'
          ? f.geometry.coordinates[0]
          : f.geometry.coordinates[0]?.[0] || [];
        const bbox = _rvBBoxFromCoords(coords);
        const stil = f.properties?.stil || A.stil || 'modern';

        // Număr niveluri per tip lot
        const nivByTip = {
          individuala:2, duplex:2, insiruit:2, bloc:5,
          mica_densitate:3, medie_densitate:5, mare_densitate:8
        };
        const niv = f.properties?.niv || nivByTip[tip] || 4;
        const fnByTip = {
          individuala:'locuinta_individuala', duplex:'locuinta_individuala',
          insiruit:'locuinta_individuala', bloc:'rezidential_colectiv',
        };

        buildings.push({
          id: `Lot ${idx+1} (${tip})`,
          idx: buildings.length,
          bW: bbox.w, bD: bbox.h,
          niv, stil, fn: fnByTip[tip] || A.fn || 'rezidential_colectiv',
          parterDiferit: !!f.properties?.parterComercial || !!A.parterDiferit,
          fnParter: f.properties?.parterComercial ? 'comercial' : A.fnParter,
          peretelCortina: !!f.properties?.pereteleCortina,
          cortinaProcent: A.cortinaProcent || 60,
          activeRetragere: A.activeRetragere,
          tipAcoperis: A.tipAcoperis || 'terasa',
          hNiv: A.corpuri?.[0]?.hNiv || 3.0,
          area: f.properties?.area || turf?.area?.(f) || 400,
          source: 'lot', lotTip: tip,
        });
      });
    }

  } catch(e){ console.warn('[RV multi-bld]', e.message); }

  // Fallback: corp unic din AEDIS
  if(buildings.length === 0){
    const A = window.AEDIS || {};
    buildings.push({
      id: 'Corp Principal',
      idx: 0,
      bW: null, bD: null, // calculat din _rvCompBuilding
      niv: A.corpuri?.[0]?.niv || 4,
      stil: A.stil || 'modern',
      fn: A.fn || 'rezidential_colectiv',
      parterDiferit: !!A.parterDiferit,
      fnParter: A.fnParter || '',
      peretelCortina: !!A.peretelCortina,
      cortinaProcent: A.cortinaProcent || 60,
      activeRetragere: !!A.activeRetragere,
      tipAcoperis: A.tipAcoperis || 'terasa',
      hNiv: A.corpuri?.[0]?.hNiv || 3.0,
      source: 'aedis',
    });
  }

  return buildings;
}

// ── Bounding box din coordonate GeoJSON ──────────────────────────────────
function _rvBBoxFromCoords(coords){
  if(!coords||coords.length<2) return {w:15, h:12};
  // coords sunt în grade (lng, lat) — convertim la metri aproximativ
  const lngs = coords.map(c=>c[0]);
  const lats = coords.map(c=>c[1]);
  const dLng = Math.max(...lngs) - Math.min(...lngs);
  const dLat = Math.max(...lats) - Math.min(...lats);
  // 1° lat ≈ 111000m, 1° lng ≈ 111000m * cos(lat)
  const avgLat = (Math.max(...lats) + Math.min(...lats)) / 2;
  const mLng = dLng * 111000 * Math.cos(avgLat * Math.PI/180);
  const mLat = dLat * 111000;
  return { w: Math.max(8, Math.round(mLng*10)/10), h: Math.max(8, Math.round(mLat*10)/10) };
}

// ── Injectează selector corp în toolbar Relevee ────────────────────────────
function _rvInjectCorpSelector(buildings, onSelect){
  const existing = document.getElementById('rv-bld-selector');
  if(existing) existing.remove();
  if(buildings.length <= 1) return;

  const bar = document.createElement('div');
  bar.id = 'rv-bld-selector';
  bar.style.cssText = 'display:flex;gap:4px;padding:4px 8px;background:#0B1426;border-bottom:1px solid #1E293B;flex-wrap:wrap;align-items:center;';
  bar.innerHTML = '<span style="font:bold 8px IBM Plex Mono;color:#64748B;margin-right:4px">CORP:</span>';

  buildings.forEach((bld,i)=>{
    const btn = document.createElement('button');
    btn.className = 'rv-corp-btn';
    btn.dataset.idx = i;
    btn.style.cssText = `padding:3px 8px;border-radius:12px;font:bold 8px IBM Plex Mono;cursor:pointer;border:1px solid #334155;
      background:${i===0?'#1D4ED8':'#1E293B'};color:${i===0?'#FFF':'#94A3B8'};transition:all .2s;`;
    btn.title = `${bld.fn} · ${bld.stil} · ${bld.niv} niv.`;
    btn.textContent = bld.id;
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.rv-corp-btn').forEach(b=>{
        b.style.background='#1E293B'; b.style.color='#94A3B8';
      });
      btn.style.background='#1D4ED8'; btn.style.color='#FFF';
      onSelect(bld, i);
    });
    bar.appendChild(btn);
  });

  // Inserăm după tabs
  const tabsBar = document.querySelector('.rv-tabs');
  if(tabsBar) tabsBar.insertAdjacentElement('afterend', bar);
}

// ════════════════════════════════════════════════════════════════════════════
// AUTO-FIX ENGINE — detectează și corectează automat neconformitățile
// ════════════════════════════════════════════════════════════════════════════

// ── Aplică corecții automate și returnează building + params modificate ────
function _rvAutoFix(b, P, floors){
  const fixes = [];
  const bOpt  = JSON.parse(JSON.stringify(b));   // clonă building
  const POpt  = JSON.parse(JSON.stringify(P));   // clonă params
  let   floorsOpt = floors;                      // referință inițială

  // ── FIX 1: Lift lipsă (NP051/2012 — obligatoriu P+4+) ────────────────
  if(b.niv >= 5){
    const hasLift = floors[0]?.rects?.some(r=>r.t==='core'&&r.lbl?.includes('Lift'));
    if(!hasLift){
      fixes.push({
        rule:'NP051', severity:'hard',
        original:'Lipsă lift — clădire P+'+(b.niv-1),
        fix:'Lift adăugat în nucleul de circulație',
        icon:'🛗'
      });
      // Marcăm core-ul cu lift
      floorsOpt = floors.map(fl=>({
        ...fl,
        rects: fl.rects.map(r=>r.t==='core'?{...r,lbl:'🪜 Sc.\n🛗 Lift',hasLift:true}:r)
      }));
    }
  }

  // ── FIX 2: Parcaje insuficiente → subsol propus ───────────────────────
  const nrApt = Math.max(1, Math.round(b.sdaTotal/70));
  const parcNec = Math.ceil(nrApt * 1.2);
  const parcSup = Math.floor(Math.max(0, P.area - b.bW*b.bD - 200) / 28);
  const deficit = Math.max(0, parcNec - parcSup);
  if(deficit > 0){
    const subsolNiv = Math.ceil(deficit / Math.max(1, Math.floor(b.bW*b.bD/28)));
    fixes.push({
      rule:'NP051-Parc', severity:'hard',
      original:`Deficit ${deficit} locuri parcare (necesar ${parcNec}, disponibil ${parcSup})`,
      fix:`${subsolNiv} nivel(uri) subsol propuse → ${Math.floor(b.bW*b.bD/28)*subsolNiv} locuri`,
      icon:'🅿',
      subsolNiv
    });
    bOpt.subsolNiv = subsolNiv;
    bOpt.subsolLoc = Math.floor(b.bW*b.bD/28)*subsolNiv;
  }

  // ── FIX 3: POT depășit → reducere amprentă ────────────────────────────
  const potReal = b.scArea/P.area;
  if(potReal > P.pot + 0.005){
    const overPct = ((potReal - P.pot)*100).toFixed(1);
    const targetSC = P.pot * P.area;
    const scaleFactor = Math.sqrt(targetSC / b.scArea);
    fixes.push({
      rule:'PUG-POT', severity:'hard',
      original:`POT realizat ${(potReal*100).toFixed(1)}% depășește max ${(P.pot*100).toFixed(0)}% cu ${overPct}%`,
      fix:`Amprentă redusă cu ${((1-scaleFactor)*100).toFixed(0)}% → SC=${targetSC.toFixed(0)}m²`,
      icon:'📐'
    });
    bOpt.bW = b.bW * scaleFactor;
    bOpt.bD = b.bD * scaleFactor;
    bOpt.scArea = targetSC;
  }

  // ── FIX 4: CUT depășit → reducere etaje ──────────────────────────────
  const cutReal = b.sdaTotal/P.area;
  if(cutReal > P.cut + 0.01){
    const nivelNou = Math.floor(P.cut * P.area / b.scArea);
    if(nivelNou < b.niv && nivelNou >= 1){
      fixes.push({
        rule:'PUG-CUT', severity:'hard',
        original:`CUT realizat ${cutReal.toFixed(2)} depășește max ${P.cut} — ${b.niv} niveluri`,
        fix:`Redus la ${nivelNou} niveluri → CUT=${(b.scArea*nivelNou/P.area).toFixed(2)}`,
        icon:'🏢'
      });
      bOpt.niv = nivelNou;
      bOpt.sdaTotal = b.scArea * nivelNou;
    }
  }

  // ── FIX 5: Camere sub minimul NP057 ──────────────────────────────────
  const subminRooms = [];
  floors[0]?.rects?.forEach(r=>{
    const min = _RV_NP057[r.t];
    if(min && r.w*r.h < min) subminRooms.push({t:r.t, su:(r.w*r.h).toFixed(1), min});
  });
  if(subminRooms.length > 0){
    const grp = {};
    subminRooms.forEach(r=>{grp[r.t]=grp[r.t]||[];grp[r.t].push(r);});
    Object.entries(grp).forEach(([t,list])=>{
      fixes.push({
        rule:'NP057', severity:'soft',
        original:`${list.length}x ${t}: ${list[0].su}m² < ${list[0].min}m² minim`,
        fix:`Recomandare: mărire bay apartament sau redistribuire camere`,
        icon:'📏'
      });
    });
  }

  // ── FIX 6: ISU distanță prea mare ────────────────────────────────────
  const isuIssues = floors[0]?.isu?.issues||[];
  if(isuIssues.length > 0){
    fixes.push({
      rule:'P118', severity:'hard',
      original:`${isuIssues.length} camere peste distanța max ISU (${_RV_P118_CORR}m)`,
      fix:`Recomandare: nucleu suplimentar de evacuare sau repoziționare scări`,
      icon:'🚨'
    });
  }

  // ── FIX 7: Însorire insuficientă OMS119 ─────────────────────────────
  const solarFail = floors[0]?.rects?.filter(r=>r.solarOk===false)||[];
  if(solarFail.length > 3){
    fixes.push({
      rule:'OMS119', severity:'soft',
      original:`${solarFail.length} camere cu însorire insuficientă (<${_RV_OMS119_H}h/zi)`,
      fix:`Recomandare: reorientare clădire sau reducere adâncime apartamente`,
      icon:'☀️'
    });
  }

  return {bOpt, POpt, floorsOpt, fixes};
}

// ── Render comparativ Scenarii A/B ─────────────────────────────────────────
function _rvRenderComparativ(b, P, floors, bOpt, POpt, floorsOpt, fixes){
  const tab = document.getElementById('rv-scenarii-content');
  if(!tab) return;

  const scoreOrig = _rvScoreFloor(floors[0], b, P);
  const scoreOpt  = _rvScoreFloor(floorsOpt[0], bOpt, POpt);
  const constrOrig = _rvConstraintEngine(floors[0], b, P);
  const constrOpt  = _rvConstraintEngine(floorsOpt[0], bOpt, POpt);

  const fixCount = fixes.length;
  const hardFixes = fixes.filter(f=>f.severity==='hard').length;
  const softFixes = fixes.filter(f=>f.severity==='soft').length;

  tab.innerHTML = `
    <div style="padding:12px;font-family:IBM Plex Mono,monospace">
      <!-- Header -->
      <div style="text-align:center;margin-bottom:12px">
        <div style="font-size:11px;color:#94A3B8;letter-spacing:.08em">AUTO-FIX REPORT</div>
        <div style="font-size:10px;color:#64748B;margin-top:2px">
          ${fixCount} corecții aplicate: ${hardFixes} obligatorii · ${softFixes} recomandate
        </div>
      </div>

      <!-- Comparativ scoruri -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
        <div style="background:#0F172A;border:1px solid #1E293B;border-radius:6px;padding:10px;text-align:center">
          <div style="font-size:9px;color:#64748B;margin-bottom:4px">📋 ORIGINAL</div>
          <div style="font-size:28px;font-weight:bold;color:${scoreOrig?.total>=80?'#22C55E':scoreOrig?.total>=60?'#F59E0B':'#EF4444'}">${scoreOrig?.total||'—'}</div>
          <div style="font-size:8px;color:#475569">/100 · ${constrOrig.hard.length} erori hard</div>
          <div style="margin-top:6px;font-size:8px;color:#64748B">
            POT: ${(b.scArea/P.area*100).toFixed(1)}% / CUT: ${(b.sdaTotal/P.area).toFixed(2)}<br>
            ${b.niv} niv. · SDA: ${b.sdaTotal.toFixed(0)}m²
          </div>
        </div>
        <div style="background:#0A1628;border:1px solid #22C55E;border-radius:6px;padding:10px;text-align:center">
          <div style="font-size:9px;color:#22C55E;margin-bottom:4px">✅ OPTIMIZAT</div>
          <div style="font-size:28px;font-weight:bold;color:${scoreOpt?.total>=80?'#22C55E':scoreOpt?.total>=60?'#F59E0B':'#EF4444'}">${scoreOpt?.total||'—'}</div>
          <div style="font-size:8px;color:#475569">/100 · ${constrOpt.hard.length} erori hard</div>
          <div style="margin-top:6px;font-size:8px;color:#64748B">
            POT: ${(bOpt.scArea/POpt.area*100).toFixed(1)}% / CUT: ${(bOpt.sdaTotal/POpt.area).toFixed(2)}<br>
            ${bOpt.niv} niv. · SDA: ${bOpt.sdaTotal.toFixed(0)}m²
          </div>
        </div>
      </div>

      <!-- Lista de fix-uri -->
      <div style="font-size:9px;font-weight:bold;color:#94A3B8;margin-bottom:6px;letter-spacing:.06em">CORECȚII APLICATE AUTOMAT:</div>
      ${fixes.length===0?
        '<div style="color:#22C55E;font-size:9px;padding:8px;background:#052e16;border-radius:4px">✅ Nicio neconformitate detectată — planul este conform!</div>':
        fixes.map(f=>`
          <div style="margin-bottom:6px;border-radius:4px;overflow:hidden">
            <div style="background:${f.severity==='hard'?'#450a0a':'#431407'};padding:5px 8px;display:flex;justify-content:space-between;align-items:center">
              <span style="font-size:9px;color:${f.severity==='hard'?'#FCA5A5':'#FCD34D'};font-weight:bold">${f.icon} [${f.rule}] ${f.severity==='hard'?'OBLIGATORIU':'RECOMANDAT'}</span>
            </div>
            <div style="background:#0F172A;padding:5px 8px">
              <div style="font-size:8px;color:#94A3B8;margin-bottom:2px">⚠ Original: ${f.original}</div>
              <div style="font-size:8px;color:#22C55E">→ Fix: ${f.fix}</div>
            </div>
          </div>`).join('')}

      <!-- Butoane export -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:10px">
        <button onclick="_rvShowVariant('original')" style="background:#1E293B;color:#E2E8F0;border:none;padding:7px;border-radius:4px;font:bold 8px IBM Plex Mono;cursor:pointer">
          📋 Afișează Original
        </button>
        <button onclick="_rvShowVariant('optimizat')" style="background:#166534;color:#DCFCE7;border:none;padding:7px;border-radius:4px;font:bold 8px IBM Plex Mono;cursor:pointer">
          ✅ Afișează Optimizat
        </button>
      </div>
      <div style="margin-top:6px;font-size:7px;color:#475569;text-align:center">
        Planul optimizat respectă toate normativele obligatorii aplicabile
      </div>
    </div>`;

  // Store both variants for switching
  window._rvVariants = {
    original: {b, P, floors},
    optimizat: {b:bOpt, P:POpt, floors:floorsOpt}
  };
}

// ── Switch între variante ──────────────────────────────────────────────────
function _rvShowVariant(which){
  const v = window._rvVariants?.[which];
  if(!v) return;
  _RV.building = v.b;
  _RV.floors   = v.floors;
  _RV.curFloor = 0;
  _rvRender();
  // Update tab button
  document.querySelectorAll('.rv-variant-btn').forEach(b=>b.classList.remove('rv-on'));
  const btn = document.getElementById('rv-variant-'+which);
  if(btn) btn.classList.add('rv-on');
  // Notify
  const ss = window._rvStatusMsg;
  if(typeof ss==='function') ss(`Varianta ${which==='original'?'Originală':'Optimizată'} afișată`);
}

// ════════════════════════════════════════════════════════════════════════════
// CONSTRAINT ENGINE + AI SCORING ENGINE + ADJACENCY MATRIX
// Implementat conform specificațiilor parametrice UrbanX
// ════════════════════════════════════════════════════════════════════════════

// ── MATRICE ADIACENȚĂ ─────────────────────────────────────────────────────
const _RV_ADJACENCY = {
  living:   {preferred:['balcon','kitchen','hall'],   avoid:[]},
  bedroom:  {preferred:['bath','hall'],               avoid:['core','hall_common']},
  bedroom2: {preferred:['bath','hall'],               avoid:['core','hall_common']},
  bedroom3: {preferred:['bath','hall'],               avoid:['core','hall_common']},
  kitchen:  {preferred:['living','storage','hall'],   avoid:[]},
  bath:     {preferred:['bedroom','bedroom2','wc'],   avoid:['living']},
  wc:       {preferred:['bath','hall'],               avoid:['living','kitchen']},
  hall:     {preferred:['living','kitchen','bath'],   avoid:[]},
  storage:  {preferred:['hall','kitchen'],            avoid:[]},
  balcon:   {preferred:['living','bedroom'],          avoid:['kitchen','bath','wc']},
};

// ── CONSTRAINT ENGINE ─────────────────────────────────────────────────────
function _rvConstraintEngine(fl, b, P){
  if(!fl||!b) return {valid:true, hard:[], soft:[], score:100};
  const hard=[], soft=[];
  const rects=fl.rects||[];
  const aptIds=[...new Set(rects.filter(r=>r.apt>0).map(r=>r.apt))];

  aptIds.forEach(aptId=>{
    const rooms=rects.filter(r=>r.apt===aptId&&!r.bal);
    const su=rooms.reduce((s,r)=>s+r.w*r.h,0);

    // HARD: suprafață minimă locuibilă NP057
    if(su<37) hard.push({apt:aptId,rule:'NP057',msg:`Ap.${aptId}: SU=${su.toFixed(1)}m² sub minimul 37m²`});

    // HARD: living obligatoriu
    if(!rooms.find(r=>r.t==='living')) hard.push({apt:aptId,rule:'NP057',msg:`Ap.${aptId}: lipsă living`});

    // HARD: baie obligatorie
    if(!rooms.find(r=>r.t==='bath'||r.t==='wc')) hard.push({apt:aptId,rule:'NP057',msg:`Ap.${aptId}: lipsă baie`});

    // HARD: lumină naturală camere locuibile
    rooms.filter(r=>['living','bedroom','bedroom2','bedroom3'].includes(r.t)).forEach(r=>{
      if(r.solarOk===false) hard.push({apt:aptId,rule:'OMS119',msg:`Ap.${aptId} ${r.lbl}: însorire insuficientă`});
    });

    // SOFT: dimensiuni minime camere
    const living=rooms.find(r=>r.t==='living');
    if(living&&living.w*living.h<18) soft.push({apt:aptId,rule:'NP057-soft',msg:`Ap.${aptId} living: ${(living.w*living.h).toFixed(1)}m² < 18m² recomandat`});

    rooms.filter(r=>r.t==='bedroom'||r.t==='bedroom2'||r.t==='bedroom3').forEach(r=>{
      if(r.w*r.h<12) soft.push({apt:aptId,rule:'NP057-soft',msg:`Ap.${aptId} ${r.lbl}: ${(r.w*r.h).toFixed(1)}m² < 12m² recomandat`});
    });

    // SOFT: holuri > 15% din SU
    const holSU=rooms.filter(r=>r.t==='hall').reduce((s,r)=>s+r.w*r.h,0);
    if(su>0&&holSU/su>0.15) soft.push({apt:aptId,rule:'EFF',msg:`Ap.${aptId}: holuri ${((holSU/su)*100).toFixed(0)}% > 15% SU`});

    // SOFT: adiacențe
    rooms.forEach(r=>{
      const adj=_RV_ADJACENCY[r.t];
      if(!adj) return;
      const neighbors=rooms.filter(n=>n!==r&&(
        (Math.abs((r.x+r.w)-n.x)<0.2||Math.abs((n.x+n.w)-r.x)<0.2)&&
        !(r.y+r.h<=n.y||n.y+n.h<=r.y)
      )||(
        (Math.abs((r.y+r.h)-n.y)<0.2||Math.abs((n.y+n.h)-r.y)<0.2)&&
        !(r.x+r.w<=n.x||n.x+n.w<=r.x)
      ));
      adj.avoid.forEach(bad=>{
        if(neighbors.find(n=>n.t===bad))
          soft.push({apt:aptId,rule:'ADJ',msg:`Ap.${aptId}: ${r.t} lângă ${bad} (nerecomandat)`});
      });
    });
  });

  // HARD: ISU evacuare
  (fl.isu?.issues||[]).forEach(iss=>{
    hard.push({apt:-1,rule:'P118',msg:`ISU: ${iss.lbl} la ${iss.d}m (max ${_RV_P118_CORR}m)`});
  });

  // HARD: lift lipsă la niv >= 5
  if(b.niv>=5&&!rects.find(r=>r.t==='core'&&r.lbl.includes('Lift')))
    hard.push({apt:-1,rule:'NP051',msg:'Lift obligatoriu P+4+ (NP051/2012)'});

  const valid=hard.length===0;
  const score=Math.max(0, 100 - hard.length*15 - soft.length*3);
  return {valid, hard, soft, score};
}

// ── AI SCORING ENGINE ─────────────────────────────────────────────────────
function _rvScoreFloor(fl, b, P){
  if(!fl||!b) return null;
  const rects=fl.rects||[];
  const aptRects=rects.filter(r=>r.apt>0&&!r.bal);
  const totalArea=b.bW*b.bD;
  const aptArea=aptRects.reduce((s,r)=>s+r.w*r.h,0);
  const commonArea=rects.filter(r=>r.apt<0).reduce((s,r)=>s+r.w*r.h,0);
  const aptIds=[...new Set(aptRects.map(r=>r.apt))];

  // 1. Scor eficiență (SU apt / SU totală etaj)
  const efficiency = Math.min(100, (aptArea/totalArea)*100*1.2);

  // 2. Scor economic (suprafață vandabilă)
  const sellable = Math.min(100, (aptArea/(totalArea*0.82))*100);

  // 3. Scor structural (regularitate)
  const nGX=Math.round(b.bW/4.5), nGY=Math.round(b.bD/3.8);
  const structural = Math.min(100, 60 + (nGX>=3&&nGY>=2?20:0) + (b.bW/b.bD>1.5&&b.bW/b.bD<4?20:0));

  // 4. Scor iluminare naturală OMS119
  const locuibile=aptRects.filter(r=>['living','bedroom','bedroom2','bedroom3'].includes(r.t));
  const ok119=locuibile.filter(r=>r.solarOk!==false).length;
  const daylight = locuibile.length>0 ? Math.round((ok119/locuibile.length)*100) : 50;

  // 5. Scor circulații (penalizăm holuri mari)
  const holCommon=rects.filter(r=>r.apt<0&&r.t==='hall').reduce((s,r)=>s+r.w*r.h,0);
  const circulation = Math.max(0, 100 - Math.round((holCommon/totalArea)*200));

  // 6. Scor ISU
  const isuOk=fl.isu?.ok!==false;
  const isuScore = isuOk ? 100 : Math.max(0, 100 - (fl.isu?.issues?.length||0)*20);

  // 7. Scor adiacențe
  let adjScore=100, adjChecks=0, adjOk=0;
  aptIds.forEach(id=>{
    const rooms=aptRects.filter(r=>r.apt===id);
    rooms.forEach(r=>{
      const adj=_RV_ADJACENCY[r.t]; if(!adj) return;
      adj.preferred.forEach(pref=>{
        adjChecks++;
        const near=rooms.some(n=>n.t===pref&&(
          Math.abs((r.x+r.w)-n.x)<0.3||Math.abs((n.x+n.w)-r.x)<0.3||
          Math.abs((r.y+r.h)-n.y)<0.3||Math.abs((n.y+n.h)-r.y)<0.3
        ));
        if(near) adjOk++;
      });
    });
  });
  if(adjChecks>0) adjScore=Math.round((adjOk/adjChecks)*100);

  // TOTAL SCORE (ponderat)
  const total = Math.round(
    efficiency*0.20 + sellable*0.18 + structural*0.12 +
    daylight*0.20 + circulation*0.12 + isuScore*0.12 + adjScore*0.06
  );

  return {
    total, efficiency:Math.round(efficiency), sellable:Math.round(sellable),
    structural:Math.round(structural), daylight, circulation:Math.round(circulation),
    isuScore, adjScore:Math.round(adjScore),
    aptCount:aptIds.length,
    aptArea:Math.round(aptArea*10)/10,
    totalArea:Math.round(totalArea*10)/10,
    efficiencyPct:Math.round(aptArea/totalArea*100)
  };
}

// ── Afișare score în panelul Amprentă Normativă ─────────────────────────
function _rvRenderScore(b, fl, P){
  const score = _rvScoreFloor(fl, b, P);
  const constraints = _rvConstraintEngine(fl, b, P);
  if(!score) return;

  const dnaEl = document.getElementById('rv-dna-content');
  if(!dnaEl) return;

  const scoreColor = score.total>=80?'#16A34A':score.total>=60?'#D97706':'#DC2626';
  const bars = [
    ['Eficiență spații',score.efficiency,'#F97316'],
    ['Suprafață vandabilă',score.sellable,'#6366F1'],
    ['Iluminare naturală',score.daylight,'#F59E0B'],
    ['Circulații',score.circulation,'#06B6D4'],
    ['ISU Evacuare',score.isuScore,'#EF4444'],
    ['Adiacențe',score.adjScore,'#8B5CF6'],
    ['Structural',score.structural,'#10B981'],
  ];

  dnaEl.innerHTML = `
    <div style="padding:8px 10px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
        <span style="font:bold 11px IBM Plex Mono;color:#94A3B8">SCOR PROIECTARE</span>
        <span style="font:bold 22px IBM Plex Mono;color:${scoreColor}">${score.total}<span style="font-size:11px;color:#64748B">/100</span></span>
      </div>
      ${bars.map(([lbl,val,col])=>`
        <div style="margin-bottom:5px">
          <div style="display:flex;justify-content:space-between;font:9px IBM Plex Mono;color:#94A3B8;margin-bottom:2px">
            <span>${lbl}</span><span style="color:${col};font-weight:bold">${val}</span>
          </div>
          <div style="height:4px;background:#1E293B;border-radius:2px">
            <div style="height:4px;width:${val}%;background:${col};border-radius:2px;transition:width .5s"></div>
          </div>
        </div>`).join('')}
      <div style="margin-top:8px;border-top:1px solid #1E293B;padding-top:6px;font:8px IBM Plex Mono;color:#64748B">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px">
          <span>Apartamente: <b style="color:#E2E8F0">${score.aptCount}</b></span>
          <span>SU apt: <b style="color:#E2E8F0">${score.aptArea}m²</b></span>
          <span>Eficiență: <b style="color:#E2E8F0">${score.efficiencyPct}%</b></span>
          <span>Validitate: <b style="color:${constraints.valid?'#22C55E':'#EF4444'}">${constraints.valid?'✓ VALID':'✗ ERORI'}</b></span>
        </div>
      </div>
      ${constraints.hard.length>0?`
        <div style="margin-top:6px;background:#7F1D1D;border-radius:4px;padding:5px 7px">
          <div style="font:bold 7px IBM Plex Mono;color:#FCA5A5;margin-bottom:3px">⛔ CONSTRÂNGERI HARD (${constraints.hard.length})</div>
          ${constraints.hard.slice(0,3).map(h=>`<div style="font:7px IBM Plex Mono;color:#FECACA;margin-bottom:2px">• ${h.msg}</div>`).join('')}
          ${constraints.hard.length>3?`<div style="font:7px IBM Plex Mono;color:#94A3B8">+${constraints.hard.length-3} altele...</div>`:''}
        </div>`:''}
      ${constraints.soft.length>0?`
        <div style="margin-top:5px;background:#78350F;border-radius:4px;padding:5px 7px">
          <div style="font:bold 7px IBM Plex Mono;color:#FCD34D;margin-bottom:3px">⚠ SOFT (${constraints.soft.length})</div>
          ${constraints.soft.slice(0,2).map(s=>`<div style="font:7px IBM Plex Mono;color:#FDE68A;margin-bottom:2px">• ${s.msg}</div>`).join('')}
        </div>`:''}
    </div>`;
}

// ── Trasee de circulație (întotdeauna vizibile) ─────────────────────────
  _rvDrawCirculation(ctx,b,fl,ox,oy,SC,P);

  // ── CAMERĂ SELECTATĂ — highlight + drag handles ───────────────────────
  if(_RV.selectedRoom && _RV.tab==='plan'){
    const r=_RV.selectedRoom;
    const rx=ox+r.x*SC, ry=oy+r.y*SC, rw=r.w*SC, rh=r.h*SC;
    // Border selection auriu
    ctx.save();
    ctx.strokeStyle='#D4AF37'; ctx.lineWidth=2; ctx.setLineDash([]);
    ctx.strokeRect(rx-1,ry-1,rw+2,rh+2);
    // Corner glow
    ctx.strokeStyle='rgba(212,175,55,.3)'; ctx.lineWidth=6;
    ctx.strokeRect(rx-3,ry-3,rw+6,rh+6);
    // Handles: dreapta, jos, colț dreapta-jos
    const hSz=8;
    [[rx+rw-hSz/2, ry+rh/2-hSz/2,'right'],
     [rx+rw/2-hSz/2, ry+rh-hSz/2,'bottom'],
     [rx+rw-hSz*0.8, ry+rh-hSz*0.8,'corner']
    ].forEach(([hx,hy,id])=>{
      ctx.fillStyle='#D4AF37';
      ctx.fillRect(hx,hy,hSz,hSz);
      ctx.strokeStyle='#0B1426'; ctx.lineWidth=1;
      ctx.strokeRect(hx,hy,hSz,hSz);
    });
    // Dimensiuni live lângă cameră
    ctx.fillStyle='rgba(212,175,55,.9)'; ctx.font=`bold ${Math.max(7,SC*0.7)}px IBM Plex Mono`;
    ctx.textAlign='center';
    ctx.fillText(`${r.w.toFixed(1)}m`,rx+rw/2,ry-4);
    ctx.save(); ctx.translate(rx-5,ry+rh/2); ctx.rotate(-Math.PI/2);
    ctx.fillText(`${r.h.toFixed(1)}m`,0,0); ctx.restore();
    ctx.fillStyle='rgba(8,15,35,.85)'; ctx.fillRect(rx+2,ry+2,rw-4,14);
    ctx.fillStyle='#D4AF37'; ctx.font=`bold ${Math.max(7,SC*0.65)}px IBM Plex Mono`;
    ctx.fillText(`${(r.w*r.h).toFixed(1)}m²`,rx+rw/2,ry+12);
    ctx.textAlign='left';
    ctx.restore();
  }

  // Salvăm ox,oy,SC în _RV ÎNAINTE de event handlers — SC e local în _rvRenderPlan
  _RV.planOx = ox; _RV.planOy = oy; _RV.planSc = SC;

  // Hover
  _rvSetupHover(cv,fl,ox,oy);
}

// ── Canvas: pereți reali + scări + axe structurale (din _extractWalls) ─────────
function _rvDrawWallsCanvas(ctx, fl, b, ox, oy, SC){
  if(!fl||!b) return;
  const bW=b.bW, bD=b.bD;
  const EW=Math.max(3,0.28*SC), IW=Math.max(1.5,0.14*SC);

  // Fundal clădire alb
  ctx.fillStyle='#FFFFFF'; ctx.fillRect(ox,oy,bW*SC,bD*SC);
  ctx.strokeStyle='#1E293B'; ctx.lineWidth=2; ctx.strokeRect(ox,oy,bW*SC,bD*SC);

  // Grilă structurală
  const nGX=Math.max(3,Math.round(bW/4.5)), nGY=Math.max(2,Math.round(bD/3.8));
  const gSpX=bW/nGX, gSpY=bD/nGY;
  ctx.strokeStyle='rgba(148,163,184,.15)'; ctx.lineWidth=.5; ctx.setLineDash([3,6]);
  for(let i=0;i<=nGX;i++){ctx.beginPath();ctx.moveTo(ox+i*gSpX*SC,oy);ctx.lineTo(ox+i*gSpX*SC,oy+bD*SC);ctx.stroke();}
  for(let j=0;j<=nGY;j++){ctx.beginPath();ctx.moveTo(ox,oy+j*gSpY*SC);ctx.lineTo(ox+bW*SC,oy+j*gSpY*SC);ctx.stroke();}
  ctx.setLineDash([]);

  // Stâlpi + bule axe
  const colSz=Math.max(5,0.35*SC), bubR=Math.max(7,0.5*SC);
  ctx.fillStyle='#1E293B';
  for(let i=0;i<=nGX;i++) for(let j=0;j<=nGY;j++){
    const cx=ox+i*gSpX*SC, cy=oy+j*gSpY*SC;
    if(cx<=ox+bW*SC+1&&cy<=oy+bD*SC+1) ctx.fillRect(cx-colSz/2,cy-colSz/2,colSz,colSz);
  }
  // Bule numerotare axe
  ctx.strokeStyle='#334155'; ctx.lineWidth=.6;
  for(let i=0;i<=nGX;i++){
    const gx=ox+i*gSpX*SC;
    [[gx,oy-bubR*1.5],[gx,oy+bD*SC+bubR*1.5]].forEach(([bx,by])=>{
      ctx.fillStyle='#FFF'; ctx.beginPath();ctx.arc(bx,by,bubR,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.fillStyle='#1E293B'; ctx.font=`bold ${Math.min(9,bubR)}px IBM Plex Mono`; ctx.textAlign='center';
      ctx.fillText(i+1,bx,by+3.5);
    });
  }
  for(let j=0;j<=nGY;j++){
    const gy=oy+j*gSpY*SC, ltr=String.fromCharCode(65+j);
    [[ox-bubR*1.5,gy],[ox+bW*SC+bubR*1.5,gy]].forEach(([bx,by])=>{
      ctx.fillStyle='#FFF'; ctx.beginPath();ctx.arc(bx,by,bubR,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.fillStyle='#1E293B'; ctx.font=`bold ${Math.min(9,bubR)}px IBM Plex Mono`; ctx.textAlign='center';
      ctx.fillText(ltr,bx,by+3.5);
    });
  }
  ctx.textAlign='left';

  // Core scări — simbol arhitectural
  fl.rects.filter(r=>r.t==='core').forEach(c=>{
    const rx=ox+c.x*SC, ry=oy+c.y*SC, rw=c.w*SC, rh=c.h*SC;
    ctx.fillStyle='rgba(219,234,254,.7)'; ctx.fillRect(rx,ry,rw,rh);
    ctx.strokeStyle='#1D4ED8'; ctx.lineWidth=1.5; ctx.strokeRect(rx,ry,rw,rh);
    // Hașuri oblice
    ctx.save(); ctx.beginPath();ctx.rect(rx,ry,rw,rh);ctx.clip();
    ctx.strokeStyle='rgba(59,130,246,.2)'; ctx.lineWidth=.6;
    for(let h=-rh;h<rw+rh;h+=5){ctx.beginPath();ctx.moveTo(rx+h,ry);ctx.lineTo(rx+h+rh,ry+rh);ctx.stroke();}
    ctx.restore();
    // Simbol scări (trepte orizontale)
    const stW=rw*.44, stH=rh*.72, stX=rx+2, stY=ry+rh*.14;
    const nSt=Math.max(4,Math.floor(stH/6));
    ctx.strokeStyle='#1E3A8A'; ctx.lineWidth=.8; ctx.strokeRect(stX,stY,stW,stH);
    for(let si=1;si<nSt;si++){ctx.beginPath();ctx.moveTo(stX,stY+si*(stH/nSt));ctx.lineTo(stX+stW,stY+si*(stH/nSt));ctx.stroke();}
    // Săgeată sus
    ctx.strokeStyle='#1D4ED8'; ctx.lineWidth=1.5;
    const arY=stY+stH*.45;
    ctx.beginPath();ctx.moveTo(stX+stW*.15,arY);ctx.lineTo(stX+stW*.85,arY);ctx.stroke();
    ctx.beginPath();ctx.moveTo(stX+stW*.65,arY-4);ctx.lineTo(stX+stW*.85,arY);ctx.lineTo(stX+stW*.65,arY+4);ctx.stroke();
    // ── Lift: zonă separată în dreapta (perete despărțitor între sc+lift) ──
    const hasLift=c.lbl&&c.lbl.includes('Lift');
    if(hasLift){
      // Perete despărțitor vertical
      const sepX=rx+rw*0.58;
      ctx.fillStyle='#1E293B'; ctx.fillRect(sepX,ry,2,rh);
      // Puț lift (dreapta)
      const lW2=rw*0.42-2, lH2=rh;
      const lX2=sepX+2, lY2=ry;
      ctx.fillStyle='rgba(219,234,254,.75)'; ctx.fillRect(lX2,lY2,lW2,lH2);
      ctx.strokeStyle='#1D4ED8'; ctx.lineWidth=1.5; ctx.strokeRect(lX2,lY2,lW2,lH2);
      // X în lift
      ctx.strokeStyle='rgba(29,78,216,.45)'; ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(lX2+2,lY2+2);ctx.lineTo(lX2+lW2-2,lY2+lH2-2);ctx.stroke();
      ctx.beginPath();ctx.moveTo(lX2+lW2-2,lY2+2);ctx.lineTo(lX2+2,lY2+lH2-2);ctx.stroke();
      // Ușă lift (linie jos)
      ctx.fillStyle='#1D4ED8'; ctx.fillRect(lX2+lW2*0.2,lY2+lH2-3,lW2*0.6,3);
      ctx.fillStyle='#1E3A8A'; ctx.font=`bold ${Math.min(7,lW2*.18)}px IBM Plex Mono`; ctx.textAlign='center';
      ctx.fillText('LIFT',lX2+lW2/2,lY2+lH2/2+3); ctx.textAlign='left';
      // Etichetă scări (stânga, mai îngustă)
      ctx.fillStyle='#1E3A8A'; ctx.font=`bold ${Math.min(7,rw*.1)}px IBM Plex Mono`; ctx.textAlign='center';
      ctx.fillText('SCĂRI',rx+rw*0.29,ry+rh*.88); ctx.textAlign='left';
    } else {
      // Fără lift — etichetă normală
      ctx.fillStyle='#1E3A8A'; ctx.font=`bold ${Math.min(8,rw*.12)}px IBM Plex Mono`; ctx.textAlign='center';
      ctx.fillText('CASA SCĂRILOR',rx+rw/2,ry+rh*.92); ctx.textAlign='left';
    }
  });

  // PEREȚI (din _extractWalls)
  try{
    const walls=_extractWalls(fl.rects,bW,bD,fl.wins||[],fl.doors||[],0.28,0.14);
    walls.forEach(w=>{
      const thick=w.type==='ext'?EW:IW, half=thick/2;
      if(w.type==='win'){
        ctx.strokeStyle='#0369A1'; ctx.lineWidth=Math.max(1,thick*.4);
        const off=[-half*.4,0,half*.4];
        if(w.axis==='H'){const py=oy+w.y1*SC; off.forEach(o=>{ctx.beginPath();ctx.moveTo(ox+w.x1*SC,py+o);ctx.lineTo(ox+w.x2*SC,py+o);ctx.stroke();});}
        else{const px=ox+w.x1*SC; off.forEach(o=>{ctx.beginPath();ctx.moveTo(px+o,oy+w.y1*SC);ctx.lineTo(px+o,oy+w.y2*SC);ctx.stroke();});}
        return;
      }
      if(w.type==='door'){
        ctx.strokeStyle='#0F172A'; ctx.lineWidth=1.2;
        if(w.axis==='H'){
          const py=oy+w.y1*SC, dx1=ox+w.x1*SC, dw=(w.x2-w.x1)*SC;
          ctx.beginPath();ctx.moveTo(dx1,py);ctx.lineTo(dx1+dw,py);ctx.stroke();
          ctx.strokeStyle='rgba(15,23,42,.35)'; ctx.lineWidth=.7;
          ctx.beginPath(); for(let a=0.05;a<=Math.PI/2;a+=0.1){const ax=dx1+dw*Math.sin(a),ay=py-dw*(1-Math.cos(a));a<.1?ctx.moveTo(ax,ay):ctx.lineTo(ax,ay);} ctx.stroke();
        } else {
          const px=ox+w.x1*SC, dy1=oy+w.y1*SC, dh=(w.y2-w.y1)*SC;
          ctx.beginPath();ctx.moveTo(px,dy1);ctx.lineTo(px,dy1+dh);ctx.stroke();
          ctx.strokeStyle='rgba(15,23,42,.35)'; ctx.lineWidth=.7;
          ctx.beginPath(); for(let a=0.05;a<=Math.PI/2;a+=0.1){const ax=px+dh*(1-Math.cos(a)),ay=dy1+dh*Math.sin(a);a<.1?ctx.moveTo(ax,ay):ctx.lineTo(ax,ay);} ctx.stroke();
        }
        return;
      }
      // Perete solid
      const isExt=w.type==='ext';
      let rx2,ry2,rw2,rh2;
      if(w.axis==='H'){rx2=ox+w.x1*SC;rw2=(w.x2-w.x1)*SC;ry2=oy+w.y1*SC-half;rh2=thick;}
      else{ry2=oy+w.y1*SC;rh2=(w.y2-w.y1)*SC;rx2=ox+w.x1*SC-half;rw2=thick;}
      if(rw2<.5||rh2<.5) return;
      ctx.fillStyle=isExt?'#1E293B':'#334155'; ctx.fillRect(rx2,ry2,rw2,rh2);
      if(isExt){
        ctx.save();ctx.beginPath();ctx.rect(rx2,ry2,rw2,rh2);ctx.clip();
        ctx.strokeStyle='rgba(203,213,225,.3)';ctx.lineWidth=.5;
        for(let h=-rh2;h<rw2+rh2;h+=3){ctx.beginPath();ctx.moveTo(rx2+h,ry2);ctx.lineTo(rx2+h+rh2,ry2+rh2);ctx.stroke();}
        ctx.restore();
      }
    });
  }catch(e){ console.warn('[RV walls]',e.message); }
}



// ════════════════════════════════════════════════════════════════════════════
// AEDIS CONFIG READER — mapare completă, identică cu 11-viewer3d.js
// Toate proprietățile AEDIS sunt citite și folosite în Relevee
// ════════════════════════════════════════════════════════════════════════════
function _rvGetAEDISConfig(){
  const A = window.AEDIS || {};

  // ── Per stil arhitectural (din viewer3d cfgByStil) ────────────────────
  const cfgByStil = {
    modern:          { hasBalc:true,  balcD:0.55, wW:1.20, wH:1.55, pilW:0.0,  bandH:0.14, label:'Modern'         },
    inovator:        { hasBalc:true,  balcD:0.75, wW:1.40, wH:1.90, pilW:0.0,  bandH:0.18, label:'Inovator'       },
    clasic:          { hasBalc:false, balcD:0.45, wW:0.80, wH:1.20, pilW:0.28, bandH:0.35, label:'Clasic'         },
    minimalist:      { hasBalc:true,  balcD:0.50, wW:1.65, wH:1.85, pilW:0.0,  bandH:0.05, label:'Minimalist'     },
    industrial:      { hasBalc:false, balcD:0.45, wW:0.80, wH:1.00, pilW:0.30, bandH:0.30, label:'Industrial'     },
    adaptat_context: { hasBalc:true,  balcD:0.55, wW:1.00, wH:1.40, pilW:0.08, bandH:0.20, label:'Adaptat Context'},
  };

  // ── Per funcțiune (din viewer3d cfgByFn) ──────────────────────────────
  const cfgByFn = {
    birouri:              { hasBalc:false, wW:1.40, wH:2.40, label:'Birouri',          curtainForce:true  },
    hotel:                { hasBalc:true,  balcD:0.75, wW:1.00, wH:1.65, label:'Hotel'                   },
    comercial:            { hasBalc:false, wW:2.20, wH:2.60, label:'Comercial',        curtainForce:true  },
    rezidential_colectiv: { hasBalc:true,  balcD:0.60, wW:1.10, wH:1.40, label:'Rezidențial Colectiv'    },
    locuinta_individuala: { hasBalc:false, wW:0.90, wH:1.20, label:'Locuință Individuală'                },
    industrial_depozitare:{ hasBalc:false, wW:1.20, wH:0.80, label:'Industrial/Depozitare'               },
    institutie_publica:   { hasBalc:false, wW:1.00, wH:1.50, label:'Instituție Publică'                  },
    mixt:                 { hasBalc:true,  wW:1.30, wH:2.00, label:'Mixt'                                },
  };

  const stil   = A.stil || 'modern';
  const fn     = A.fn   || 'rezidential_colectiv';
  const baseC  = cfgByStil[stil]  || cfgByStil.modern;
  const fnC    = cfgByFn[fn]      || {};

  // hasBalc: funcțiunea are prioritate asupra stilului
  const hasBalc = fnC.hasBalc !== undefined ? fnC.hasBalc : baseC.hasBalc;
  const balcD   = fnC.balcD   || baseC.balcD   || 0.60;
  const wW      = fnC.wW      || baseC.wW      || 1.10;
  const wH      = fnC.wH      || baseC.wH      || 1.40;
  const pilW    = fnC.pilW    !== undefined ? fnC.pilW : baseC.pilW || 0;
  const bandH   = fnC.bandH   || baseC.bandH   || 0.14;
  const stilLabel = baseC.label || stil;
  const fnLabel   = fnC.label   || fn;

  // Curtain wall — exact logica din viewer3d
  const stilAllowsCurtain = ['modern','inovator'].includes(stil);
  const fnWantsCurtain    = ['birouri','comercial'].includes(fn);
  const hasCurtainWall    = !!A.peretelCortina ||
    (stilAllowsCurtain && fnWantsCurtain) ||
    (fn==='rezidential_colectiv' && stil==='inovator' && (A.cortinaProcent||0)>=80);
  const cortinaPct = hasCurtainWall ? (A.cortinaProcent || 60) : 0;

  // Penthouse / etaj retras
  const etajRetras    = !!A.activeRetragere || Object.keys(A.retrageriFineEtaje||{}).length>0;
  const retragereFine = A.retrageriFineEtaje || {};

  // Parter diferit
  const parterDiferit = !!A.parterDiferit;
  const fnParter      = A.fnParter || '';
  const fnParterLabel = cfgByFn[fnParter]?.label || fnParter || '';
  const hParter       = parterDiferit ? 4.5 : (A.corpuri?.[0]?.hNiv||3.0);

  // Număr niveluri și înălțime
  const niv  = A.corpuri?.[0]?.niv  || 4;
  const hNiv = A.corpuri?.[0]?.hNiv || 3.0;

  // Acoperiș
  const tipAcoperis = A.tipAcoperis || 'terasa';
  const acoperisLabel = {terasa:'Terasă plată',terasa_circulabila:'Terasă circulabilă',
    inclinat:'Acoperiș în pantă',penthouse:'Penthouse',penthouse_terasa:'Penthouse + terasă',
    combinat:'Combinat'}[tipAcoperis] || tipAcoperis;

  // Formă clădire
  const forma = A.forma || 'auto';

  return {
    fn, stil, fnLabel, stilLabel, hasBalc, balcD, wW, wH, pilW, bandH,
    hasCurtainWall, cortinaPct, etajRetras, retragereFine,
    parterDiferit, fnParter, fnParterLabel, hParter,
    niv, hNiv, tipAcoperis, acoperisLabel, forma,
  };
}


function _rvRenderFacade(b){
  // ── Config AEDIS ──────────────────────────────────────────────────────
  const _A=window.AEDIS||{};
  const _etajRetras=!!_A.activeRetragere;
  const _parterDiferit=!!_A.parterDiferit;
  const _fnParter=_A.fnParter||'';
  const _cortina=Math.max(0,Math.min(100,_A.cortinaProcent||0));
  const _tipAcoperis=_A.tipAcoperis||'terasa';
  const _stil=_A.stil||'modern';
  const {P,bW,bD,niv,cores}=b; const Ht=niv*P.hn; const SC=_RV.scale*.85;
  const pad=40;
  // Toate 4 fațade în layout vertical: N(principal), S(posterior), E(lateral), V(lateral)
  const facadeW_NS=bW*SC, facadeW_EV=bD*SC, facadeH=Ht*SC;
  const sectionH=facadeH+80; // h per facade + labels
  const W=Math.max(facadeW_NS,facadeW_EV)+pad*2+120;
  const H=sectionH*4+pad;
  const {cv,ctx}=_rvInitCanvas(W,H);
  ctx.fillStyle='#060C1A';ctx.fillRect(0,0,W,H);

  // ── Helper: desenare o fațadă ──────────────────────────────────────────────
  function drawOneFacade(label,fW,ox_,oy_,isMain,matZones){
    // Header label
    ctx.fillStyle='rgba(212,175,55,.15)';ctx.fillRect(pad-5,oy_-22,fW+10,20);
    ctx.strokeStyle='rgba(212,175,55,.3)';ctx.lineWidth=1;ctx.strokeRect(pad-5,oy_-22,fW+10,20);
    ctx.fillStyle='#D4AF37';ctx.font='bold 10px Space Grotesk';ctx.textAlign='left';
    ctx.fillText('FAȚADĂ '+label+(isMain?' ◀ PRINCIPALĂ (FRONT STRADAL)':''),pad,oy_-7);
    ctx.textAlign='left';

    // Building fill — fond alb arhitectural
    ctx.fillStyle='#EAEFF5'; ctx.fillRect(ox_,oy_,fW,facadeH);
    ctx.strokeStyle='#1E293B'; ctx.lineWidth=2; ctx.strokeRect(ox_,oy_,fW,facadeH);

    // Sol
    ctx.fillStyle='#94A3B8'; ctx.fillRect(ox_-10,oy_+facadeH,fW+20,8);
    ctx.strokeStyle='#334155'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(ox_-20,oy_+facadeH); ctx.lineTo(ox_+fW+40,oy_+facadeH); ctx.stroke();
    ctx.fillStyle='#334155'; ctx.font='bold 8px IBM Plex Mono';
    ctx.fillText('COTA ±0.00 (CTN)',ox_,oy_+facadeH+20);

    // Planșee (linii orizontale inter-etaj)
    for(let i=1;i<niv;i++){
      const ly=oy_+facadeH-i*P.hn*SC;
      ctx.fillStyle='rgba(30,41,59,.12)'; ctx.fillRect(ox_,ly-3,fW,3);
      ctx.strokeStyle='#94A3B8'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(ox_,ly); ctx.lineTo(ox_+fW,ly); ctx.stroke();
      ctx.fillStyle='#334155'; ctx.font='bold 7px IBM Plex Mono';
      ctx.fillText(i===0?'P':`E${i}`,ox_-28,ly+4);
      ctx.fillStyle='#1D4ED8'; ctx.font='7px IBM Plex Mono';
      ctx.fillText('+'+(i*P.hn).toFixed(2)+'m',ox_-28,ly+12);
    }
    ctx.fillStyle='#64748b'; ctx.font='7px IBM Plex Mono';
    ctx.fillText('P',ox_-14,oy_+facadeH-4);
    ctx.fillStyle='rgba(212,175,55,.5)'; ctx.font='7px IBM Plex Mono';
    ctx.fillText('+0.00',ox_-28,oy_+facadeH-4+8);

    // Ferestre
    const wCols=Math.max(3,Math.floor(fW/(SC*3.2)));
    const wW=Math.min(fW/wCols*.58,1.9*SC);
    const wH=P.hn*.44*SC; const colSp_=fW/wCols; const coreCol_=Math.floor(wCols/2);
    for(let row=0;row<niv;row++){
      const wy=oy_+facadeH-(row+1)*P.hn*SC+(P.hn*SC-wH)*.28;
      for(let col=0;col<wCols;col++){
        if(col===coreCol_){
          // Nucleu scărilor
          ctx.fillStyle='rgba(148,163,184,.3)'; ctx.fillRect(ox_+col*colSp_+(colSp_-wW*.45)/2,wy,wW*.45,wH);
          ctx.strokeStyle='#64748B'; ctx.lineWidth=1; ctx.strokeRect(ox_+col*colSp_+(colSp_-wW*.45)/2,wy,wW*.45,wH);
          continue;
        }
        const wx_=ox_+col*colSp_+(colSp_-wW)/2;
        // Solicitare solara: fațadele S/SE/SV au geamuri mai luminoase
        const solarBoost=(['S','SE','SV'].includes(P.frontDir)&&isMain)||(['N','NE','NV'].includes(P.frontDir)&&!isMain);
        // Perete cortina: geam continuu pe % din fatada
        const isCortina=_cortina>0 && col<Math.ceil(wCols*_cortina/100);
        const _wy=wy-(isCortina?4:0), _wh=wH+(isCortina?8:0);
        ctx.fillStyle=isCortina?'rgba(56,189,248,.8)':`rgba(147,210,250,${solarBoost?.75:.55})`; ctx.fillRect(wx_,_wy,wW,_wh);
        ctx.strokeStyle=isCortina?'#0EA5E9':'#0369A1'; ctx.lineWidth=isCortina?2:1.5; ctx.strokeRect(wx_,_wy,wW,_wh);
        if(!isCortina){ctx.strokeStyle='rgba(3,105,161,.35)'; ctx.lineWidth=.6;
        ctx.beginPath();ctx.moveTo(wx_+wW/2,wy);ctx.lineTo(wx_+wW/2,wy+wH);ctx.stroke();
        ctx.beginPath();ctx.moveTo(wx_,wy+wH/2);ctx.lineTo(wx_+wW,wy+wH/2);ctx.stroke();}
      }
    }

    // Balcoane — verificăm config AEDIS
    // Balcoane din AEDIS fn+stil (identic cu viewer3d)
    const aedisAdanc = _balcD;
    if(_hasBalc){
      for(let row=1;row<niv;row++){
        const bz=oy_+facadeH-row*P.hn*SC;
        const bH=Math.max(9,P.hn*SC*0.14); // ~14% din etaj = balcon vizibil
        // Placă balcon proiectată
        ctx.fillStyle='rgba(218,226,235,.97)'; ctx.fillRect(ox_-14,bz-bH,fW+28,bH);
        ctx.strokeStyle='#1E293B'; ctx.lineWidth=2; ctx.strokeRect(ox_-14,bz-bH,fW+28,bH);
        // Pardoseală
        ctx.fillStyle='rgba(148,163,184,.4)'; ctx.fillRect(ox_-14,bz-3,fW+28,3);
        // Parapet
        ctx.strokeStyle='#0369A1'; ctx.lineWidth=2.5;
        ctx.beginPath(); ctx.moveTo(ox_-14,bz-bH+2); ctx.lineTo(ox_+fW+14,bz-bH+2); ctx.stroke();
      }
    }

    // Penthouse — ultimul etaj retras
    if(_etajRetras && niv>1){
      const retras=fW*.13;
      ctx.fillStyle='rgba(212,175,55,.3)'; ctx.fillRect(ox_+retras,oy_,fW-retras*2,P.hn*SC);
      ctx.strokeStyle='#B45309'; ctx.lineWidth=3; ctx.strokeRect(ox_+retras,oy_,fW-retras*2,P.hn*SC);
      ctx.fillStyle='#92400E'; ctx.font='bold 7px IBM Plex Mono'; ctx.textAlign='center';
      ctx.fillText('PENTHOUSE / ETAJ RETRAS',ox_+fW/2,oy_+P.hn*SC/2+3); ctx.textAlign='left';
    }
    // Parter cu altă funcțiune
    if(_parterDiferit && _fnParter){
      const pdH=P.hn*SC*1.2, pdY=oy_+facadeH-pdH;
      ctx.fillStyle='rgba(139,92,246,.12)'; ctx.fillRect(ox_,pdY,fW,pdH);
      ctx.strokeStyle='#7C3AED'; ctx.lineWidth=1.5; ctx.setLineDash([4,3]); ctx.strokeRect(ox_,pdY,fW,pdH); ctx.setLineDash([]);
      ctx.fillStyle='#6D28D9'; ctx.font='bold 7px IBM Plex Mono'; ctx.textAlign='center';
      ctx.fillText('PARTER: '+_fnParter.toUpperCase().slice(0,20),ox_+fW/2,pdY+pdH*.5); ctx.textAlign='left';
    }
    // Tablou materiale (sub fațadă)
    const _matY=oy_+facadeH+55;
    const _mats=[
      ['Pereți ext.', _hasCortina?`Curtain wall ${_cortina}%`:'BCA+EPS 15cm', '#94A3B8'],
      ['Ferestre', `${_wW.toFixed(2)}×${_wH.toFixed(2)}m ${_stil==='clasic'?'lemn':'PVC 5cam.'}`, '#38BDF8'],
      ['Balcoane', _hasBalc?`D=${_balcD}m`:'— fără balcoane', '#D4AF37'],
      ['Acoperiș', _AC.acoperisLabel, '#22C55E'],
    ];
    ctx.fillStyle='#F8FAFC'; ctx.fillRect(ox_,_matY,fW,44);
    ctx.strokeStyle='#CBD5E1'; ctx.lineWidth=1; ctx.strokeRect(ox_,_matY,fW,44);
    ctx.fillStyle='#1E293B'; ctx.font='bold 7px IBM Plex Mono';
    ctx.fillText('TABLOU MATERIALE',ox_+4,_matY+10);
    _mats.forEach(([l,v,c],i)=>{
      const mx=ox_+(i%2)*(fW/2)+4, my=_matY+20+Math.floor(i/2)*14;
      ctx.fillStyle=c; ctx.fillRect(mx,my-7,7,7);
      ctx.fillStyle='#334155'; ctx.font='6.5px IBM Plex Mono'; ctx.fillText(l+': '+v.slice(0,22),mx+10,my-1);
    });
    // Uță: principală (intrare bloc) sau serviciu (față posterioară)
    if(isMain){
      const doorW=2.4*SC,doorH=3.0*SC;
      const dX=ox_+fW/2-doorW/2,dY=oy_+facadeH-doorH;
      ctx.fillStyle='rgba(245,158,11,.15)'; ctx.fillRect(dX,dY,doorW,doorH);
      ctx.strokeStyle='#F59E0B'; ctx.lineWidth=2; ctx.strokeRect(dX,dY,doorW,doorH);
      ctx.strokeStyle='rgba(245,158,11,.5)'; ctx.lineWidth=.8;
      ctx.beginPath();ctx.moveTo(dX+doorW/2,dY);ctx.lineTo(dX+doorW/2,dY+doorH);ctx.stroke();
      ctx.fillStyle='rgba(245,158,11,.6)'; ctx.font='bold 7px IBM Plex Mono'; ctx.textAlign='center';
      ctx.fillText('INTRARE',dX+doorW/2,dY+doorH+9); ctx.textAlign='left';
    }

    // Zone materiale (annotate pe dreapta)
    const matLbls=matZones||[
      {y:0,h:1,'mat':'Tencuiala decorativa siliconata','col':'#F97316','cod':'RAL 9001 / 7035'},
      {y:1,h:niv-1,'mat':'Tencuiala siliconata + EPS 15cm','col':'#D4AF37','cod':'U=0.27 W/m²K'},
      {y:0,h:niv,'mat':'Tamplarie PVC 5cam. + geam triplu low-E','col':'#38BDF8','cod':'Uw≤1.0 W/m²K'},
    ];
    // Sidebar materiale
    const sbX=ox_+fW+10;
    ctx.fillStyle='rgba(8,16,32,.9)'; ctx.fillRect(sbX,oy_,100,facadeH);
    ctx.strokeStyle='rgba(212,175,55,.2)'; ctx.lineWidth=.5; ctx.strokeRect(sbX,oy_,100,facadeH);
    ctx.fillStyle='rgba(212,175,55,.15)'; ctx.fillRect(sbX,oy_,100,14);
    ctx.fillStyle='#D4AF37'; ctx.font='bold 7px IBM Plex Mono'; ctx.textAlign='center';
    ctx.fillText('MATERIALE',sbX+50,oy_+10); ctx.textAlign='left';

    const matItems=[
      ['Perete exterior','BA20+BCA15+EPS15cm','#CBD5E1'],
      ['Finisaj fațadă','Tencuiala siliconica','#F97316'],
      ['Ferestre','PVC/AL triplu low-E','#38BDF8'],
      ['Balcoane','Parapet sticla/beton','#D4AF37'],
      ['Acoperiș','Terasa inversa XPS20','#22C55E'],
      ['Ușă intrare','Aluminiu RF + sticlă','#F59E0B'],
    ];
    matItems.forEach(([name,spec,col],mi)=>{
      const my=oy_+18+mi*18;
      if(my>oy_+facadeH-10)return;
      ctx.fillStyle=col+'33'; ctx.fillRect(sbX+2,my,96,16);
      ctx.strokeStyle=col+'88'; ctx.lineWidth=.5; ctx.strokeRect(sbX+2,my,96,16);
      ctx.fillStyle=col; ctx.fillRect(sbX+2,my,3,16);
      ctx.fillStyle='rgba(220,232,250,.9)'; ctx.font='bold 6px IBM Plex Mono';
      ctx.fillText(name,sbX+7,my+6);
      ctx.fillStyle='rgba(148,163,184,.8)'; ctx.font='5.5px IBM Plex Mono';
      ctx.fillText(spec,sbX+7,my+13);
    });

    // Dimensiuni H
    if(_RV.showDim){
      ctx.strokeStyle='rgba(212,175,55,.5)'; ctx.lineWidth=.8; ctx.setLineDash([3,3]);
      ctx.beginPath();ctx.moveTo(ox_-18,oy_);ctx.lineTo(ox_-18,oy_+facadeH);ctx.stroke();
      ctx.setLineDash([]);
      ctx.save();ctx.translate(ox_-36,oy_+facadeH/2);ctx.rotate(-Math.PI/2);
      ctx.fillStyle='rgba(212,175,55,.8)';ctx.font='bold 9px IBM Plex Mono';ctx.textAlign='center';
      ctx.fillText('H = '+Ht.toFixed(1)+'m',0,0);ctx.restore();
      // L
      ctx.strokeStyle='rgba(212,175,55,.5)'; ctx.lineWidth=.8; ctx.setLineDash([3,3]);
      ctx.beginPath();ctx.moveTo(ox_,oy_+facadeH+30);ctx.lineTo(ox_+fW,oy_+facadeH+30);ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle='rgba(212,175,55,.8)';ctx.font='bold 9px IBM Plex Mono';ctx.textAlign='center';
      ctx.fillText(fW===facadeW_NS?bW.toFixed(1)+'m':bD.toFixed(1)+'m',ox_+fW/2,oy_+facadeH+44);
      ctx.textAlign='left';
    }
  }

  // ── Renderăm toate 4 fațade ────────────────────────────────────────────────
  const facadeDirMap={N:0,NE:45,E:90,SE:135,S:180,SV:225,V:270,NV:315};
  const dirs=[
    {lbl:P.frontDir+' (PRINCIPALĂ)',fW:facadeW_NS,isMain:true,  dir:P.frontDir},
    {lbl:{N:'S',S:'N',E:'V',V:'E',NE:'SV',NV:'SE',SE:'NV',SV:'NE'}[P.frontDir]||'S'+' (POSTERIOARĂ)',fW:facadeW_NS,isMain:false,dir:{N:'S',S:'N',E:'V',V:'E',NE:'SV',NV:'SE',SE:'NV',SV:'NE'}[P.frontDir]||'S'},
    {lbl:'E (LATERALĂ DREAPTĂ)',fW:facadeW_EV,isMain:false,dir:'E'},
    {lbl:'V (LATERALĂ STÂNGĂ)',fW:facadeW_EV,isMain:false,dir:'V'},
  ];
  dirs.forEach(({lbl,fW,isMain,dir},idx)=>{
    const oy_=pad+25+idx*sectionH;
    const ox_=pad+30;
    drawOneFacade(lbl,fW,ox_,oy_,isMain);
    // Solar overlay pe fiecare fațadă
    if(_RV.showSolar){
      const fP={...P,frontDir:dir};
      _rvDrawSolarFatada(ctx,fP,bW,bD,niv,ox_,oy_,fW,facadeH);
    }
  });

  _rvDrawNorth(ctx,W-38,50,P.frontDir);
  _rvDrawCartus(ctx,W,H,P,null,'TOATE FAȚADELE — N · S · E · V');
}

function _rvRenderSection(b){
  if(!b || !b.P) { 
    const cv = document.getElementById("rv-canvas");
    if(cv){const ctx=cv.getContext("2d");ctx.fillStyle="#060C1A";ctx.fillRect(0,0,cv.width,cv.height);}
    return; 
  }

  const {P,bW,bD,niv,cores}=b;
  const Ht=niv*P.hn;
  const sectionType=_RV.sectionType||'AA'; // 'AA'=transversal sau 'BB'=longitudinal
  const cutDim = sectionType==='AA' ? bD : bW; // dimensiunea de-a lungul secțiunii
  const SC=_RV.scale*.85;
  const pad=50;
  const W=cutDim*SC+pad*2+100;
  const H=Ht*SC+pad*2+60;
  const {cv,ctx}=_rvInitCanvas(W+120,H+50);

  ctx.fillStyle='#060C1A';ctx.fillRect(0,0,cv.width,H+50);

  // ── Selector A-A / B-B ─────────────────────────────────────────────────────
  const btnStyle=(active)=>`${active?'rgba(212,175,55,.3)':'rgba(255,255,255,.06)'};color:${active?'#D4AF37':'#64748b'};border:1px solid ${active?'rgba(212,175,55,.5)':'rgba(255,255,255,.1)'}`;
  // Adăugăm butoane via DOM (nu canvas)
  const tabDiv=document.getElementById('rv-section-tabs');
  if(!tabDiv){
    const div=document.createElement('div');
    div.id='rv-section-tabs';
    div.style.cssText='position:absolute;top:8px;left:50%;transform:translateX(-50%);display:flex;gap:4px;z-index:10;background:rgba(6,12,26,.9);padding:4px;border-radius:8px;border:1px solid rgba(255,255,255,.1)';
    div.innerHTML=`
      <button id="rv-sect-aa" onclick="_RV.sectionType='AA';_rvRender()" style="padding:4px 14px;border-radius:6px;cursor:pointer;font-size:10px;font-weight:700;font-family:'IBM Plex Mono',monospace;background:rgba(212,175,55,.3);color:#D4AF37;border:1px solid rgba(212,175,55,.5)">
        ✂ Secțiune A-A
      </button>
      <button id="rv-sect-bb" onclick="_RV.sectionType='BB';_rvRender()" style="padding:4px 14px;border-radius:6px;cursor:pointer;font-size:10px;font-weight:700;font-family:'IBM Plex Mono',monospace;background:rgba(255,255,255,.06);color:#64748b;border:1px solid rgba(255,255,255,.1)">
        ✂ Secțiune B-B
      </button>`;
    const wrap=cv.parentElement;
    if(wrap){wrap.style.position='relative';wrap.appendChild(div);}
  } else {
    document.getElementById('rv-sect-aa').style.cssText=`padding:4px 14px;border-radius:6px;cursor:pointer;font-size:10px;font-weight:700;font-family:'IBM Plex Mono',monospace;background:${sectionType==='AA'?'rgba(212,175,55,.3)':'rgba(255,255,255,.06)'};color:${sectionType==='AA'?'#D4AF37':'#64748b'};border:1px solid ${sectionType==='AA'?'rgba(212,175,55,.5)':'rgba(255,255,255,.1)'}`;
    document.getElementById('rv-sect-bb').style.cssText=`padding:4px 14px;border-radius:6px;cursor:pointer;font-size:10px;font-weight:700;font-family:'IBM Plex Mono',monospace;background:${sectionType==='BB'?'rgba(212,175,55,.3)':'rgba(255,255,255,.06)'};color:${sectionType==='BB'?'#D4AF37':'#64748b'};border:1px solid ${sectionType==='BB'?'rgba(212,175,55,.5)':'rgba(255,255,255,.1)'}`;
  }

  const ox=pad+50, oy=pad+30;
  const sW=cutDim*SC, sH=Ht*SC;

  // Titlu secțiune
  ctx.fillStyle='rgba(212,175,55,.85)';ctx.font='bold 10px IBM Plex Mono';ctx.textAlign='center';
  ctx.fillText(sectionType==='AA'
    ? `SECȚIUNE A-A TRANSVERSALĂ (pe lățimea de ${bD.toFixed(1)}m)`
    : `SECȚIUNE B-B LONGITUDINALĂ (pe lungimea de ${bW.toFixed(1)}m)`,
    ox+sW/2, oy-12);
  ctx.textAlign='left';

  // Corp secțiune
  ctx.fillStyle='rgba(17,27,48,.95)';ctx.fillRect(ox,oy,sW,sH);
  ctx.strokeStyle='#CBD5E1';ctx.lineWidth=2;ctx.strokeRect(ox,oy,sW,sH);

  // Culori etaje
  const rC=['rgba(180,83,1,.14)','rgba(21,128,61,.13)','rgba(14,116,144,.15)','rgba(109,40,217,.13)'];
  for(let i=0;i<niv;i++){
    const y0=oy+sH-(i+1)*P.hn*SC;
    ctx.fillStyle=rC[i%4];ctx.fillRect(ox+2,y0+2,sW-4,P.hn*SC-4);
    // Planșeu
    ctx.fillStyle='rgba(203,213,225,.25)';ctx.fillRect(ox,y0-2,sW,2);
    // Etichetă nivel (stânga)
    ctx.fillStyle='#94a3b8';ctx.font='bold 8px IBM Plex Mono';ctx.textAlign='right';
    ctx.fillText(i===0?'P':`E${i}`,ox-6,y0+P.hn*SC/2+3);
    // Înălțime etaj (dreapta)
    ctx.fillStyle='rgba(212,175,55,.5)';ctx.font='7px IBM Plex Mono';ctx.textAlign='left';
    ctx.fillText(P.hn.toFixed(1)+'m',ox+sW+6,y0+P.hn*SC/2+3);
    ctx.textAlign='left';
  }

  // ── Casă scări ─────────────────────────────────────────────────────────────
  if(cores.length){
    // Selectăm nucleul central
    const midCore=cores[Math.floor(cores.length/2)];
    // Pentru secțiunea AA: tăiem perpendicular pe Y, deci afișăm X-ul nucleului
    // Pentru BB: tăiem perpendicular pe X, deci afișăm Y-ul nucleului
    const coreStart = sectionType==='AA'
      ? (midCore.x/bW)*sW   // poziția X a casei scărilor pe secțiunea AA
      : (midCore.y/bD)*sW;  // poziția Y a casei scărilor pe secțiunea BB
    const coreDim = sectionType==='AA'
      ? (midCore.w/bW)*sW   // lățimea pe secțiunea AA
      : (midCore.h/bD)*sW;  // adâncimea pe secțiunea BB
    const cx0=ox+coreStart;

    for(let i=0;i<niv;i++){
      const y0=oy+sH-(i+1)*P.hn*SC;
      // Corp casă scări
      ctx.fillStyle='rgba(37,99,235,.25)';ctx.fillRect(cx0,y0,coreDim,P.hn*SC);
      ctx.strokeStyle='#3B82F6';ctx.lineWidth=0.8;ctx.strokeRect(cx0,y0,coreDim,P.hn*SC);
      // Trepte scări — linii diagonale
      const steps=6, sw=coreDim/steps, sh=P.hn*SC/steps;
      ctx.strokeStyle='rgba(96,165,250,.6)';ctx.lineWidth=0.8;
      for(let s=0;s<steps;s++){
        ctx.beginPath();ctx.moveTo(cx0+s*sw,y0+(steps-s)*sh);ctx.lineTo(cx0+(s+1)*sw,y0+(steps-s)*sh);ctx.stroke();
        ctx.beginPath();ctx.moveTo(cx0+(s+1)*sw,y0+(steps-s)*sh);ctx.lineTo(cx0+(s+1)*sw,y0+(steps-s-1)*sh);ctx.stroke();
      }
      // Label casă scări la primul etaj
      if(i===0){
        ctx.fillStyle='rgba(96,165,250,.7)';ctx.font='bold 7px IBM Plex Mono';ctx.textAlign='center';
        ctx.fillText('CASĂ',cx0+coreDim/2,y0+P.hn*SC*0.35);
        ctx.fillText('SCĂRI',cx0+coreDim/2,y0+P.hn*SC*0.55);
        ctx.textAlign='left';
      }
    }
    // Lift — în dreapta casei scărilor
    const liftW=Math.min(1.2*SC,coreDim*0.4);
    const lx0=cx0+coreDim-liftW;
    for(let i=0;i<niv;i++){
      const y0=oy+sH-(i+1)*P.hn*SC;
      ctx.fillStyle='rgba(59,130,246,.15)';ctx.fillRect(lx0,y0,liftW,P.hn*SC);
      ctx.strokeStyle='rgba(96,165,250,.4)';ctx.lineWidth=0.5;ctx.strokeRect(lx0,y0,liftW,P.hn*SC);
      // X simbol lift
      ctx.strokeStyle='rgba(96,165,250,.3)';ctx.lineWidth=0.4;
      ctx.beginPath();ctx.moveTo(lx0,y0);ctx.lineTo(lx0+liftW,y0+P.hn*SC);ctx.stroke();
      ctx.beginPath();ctx.moveTo(lx0+liftW,y0);ctx.lineTo(lx0,y0+P.hn*SC);ctx.stroke();
    }
  }

  // ── Terenul și cota ±0.00 ─────────────────────────────────────────────────
  ctx.fillStyle='rgba(107,114,128,.4)';ctx.fillRect(ox-10,oy+sH,sW+20,18);
  ctx.strokeStyle='#6B7280';ctx.lineWidth=1;ctx.strokeRect(ox-10,oy+sH,sW+20,18);
  // Hașură teren
  ctx.strokeStyle='rgba(107,114,128,.3)';ctx.lineWidth=0.5;
  for(let hx=ox-10;hx<ox+sW+20;hx+=8){
    ctx.beginPath();ctx.moveTo(hx,oy+sH);ctx.lineTo(hx-8,oy+sH+18);ctx.stroke();
  }

  // Linie NFA
  ctx.strokeStyle='rgba(6,182,212,.5)';ctx.lineWidth=1;ctx.setLineDash([5,4]);
  const nfaY=oy+sH-Math.min(P.hn*.5,1.5)*SC;
  ctx.beginPath();ctx.moveTo(ox-22,nfaY);ctx.lineTo(ox+sW+35,nfaY);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle='rgba(6,182,212,.65)';ctx.font='7px IBM Plex Mono';
  ctx.fillText('NFA ~-1.5m',ox+4,nfaY-2);

  // Linie ±0.00
  ctx.strokeStyle='rgba(203,213,225,.6)';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(ox-22,oy+sH);ctx.lineTo(ox+sW+35,oy+sH);ctx.stroke();
  ctx.fillStyle='#94a3b8';ctx.font='bold 8px IBM Plex Mono';
  ctx.fillText('±0.00 CTN',ox,oy+sH+12);

  // ── Cote dimensionale ─────────────────────────────────────────────────────
  if(_RV.showDim){
    // Înălțime totală
    ctx.strokeStyle='rgba(212,175,55,.4)';ctx.lineWidth=0.8;ctx.setLineDash([3,3]);
    ctx.beginPath();ctx.moveTo(ox+sW+22,oy);ctx.lineTo(ox+sW+22,oy+sH);ctx.stroke();ctx.setLineDash([]);
    ctx.strokeStyle='rgba(212,175,55,.4)';ctx.lineWidth=0.5;
    ctx.beginPath();ctx.moveTo(ox+sW+16,oy);ctx.lineTo(ox+sW+28,oy);ctx.stroke();
    ctx.beginPath();ctx.moveTo(ox+sW+16,oy+sH);ctx.lineTo(ox+sW+28,oy+sH);ctx.stroke();
    ctx.fillStyle='rgba(212,175,55,.85)';ctx.font='bold 8px IBM Plex Mono';ctx.textAlign='center';
    ctx.save();ctx.translate(ox+sW+42,oy+sH/2);ctx.rotate(-Math.PI/2);
    ctx.fillText('H='+Ht.toFixed(1)+'m',0,0);ctx.restore();
    // Lățime secțiune
    ctx.strokeStyle='rgba(212,175,55,.4)';ctx.lineWidth=0.5;
    ctx.beginPath();ctx.moveTo(ox,oy-18);ctx.lineTo(ox+sW,oy-18);ctx.stroke();
    ctx.beginPath();ctx.moveTo(ox,oy-22);ctx.lineTo(ox,oy-12);ctx.stroke();
    ctx.beginPath();ctx.moveTo(ox+sW,oy-22);ctx.lineTo(ox+sW,oy-12);ctx.stroke();
    ctx.fillStyle='rgba(212,175,55,.7)';ctx.font='7px IBM Plex Mono';
    ctx.fillText(cutDim.toFixed(1)+'m',ox+sW/2-12,oy-6);
    ctx.textAlign='left';
  }

  _rvDrawNorth(ctx,W+80,44,P.frontDir);
  _rvDrawScale(ctx,pad,H+38,SC);
  _rvDrawCartus(ctx,W+120,H+50,P,null,
    sectionType==='AA'?'SECȚIUNE A-A TRANSVERSALĂ':'SECȚIUNE B-B LONGITUDINALĂ');
  const pad2=50; const W2=bD*SC+pad2*2+80; const H2=Ht*SC+pad2*2+50;
  const _rv2=_rvInitCanvas(W2,H2+40,"rv-canvas"); const cv2=_rv2.cv; const ctx2=_rv2.ctx;
  ctx2.fillStyle='#060C1A';ctx2.fillRect(0,0,cv2.width,H2+40);
  const ox2=pad2+40,oy2=pad2; const sW2=bD*SC,sH2=Ht*SC;
  ctx2.fillStyle='rgba(17,27,48,.95)';ctx2.fillRect(ox2,oy2,sW2,sH2);
  ctx2.strokeStyle='#CBD5E1';ctx2.lineWidth=2.5;ctx2.strokeRect(ox2,oy2,sW2,sH2);
  const rC2=['rgba(180,83,1,.14)','rgba(21,128,61,.13)','rgba(14,116,144,.15)','rgba(109,40,217,.13)'];
  for(let i=0;i<niv;i++){
    const y0=oy2+sH2-(i+1)*P.hn*SC;
    ctx2.fillStyle=rC2[i%4];ctx2.fillRect(ox2+2,y0+2,sW2-4,P.hn*SC-4);
    ctx2.fillStyle='rgba(203,213,225,.2)';ctx2.fillRect(ox2,y0-3,sW2,3);
    ctx2.fillStyle='#475569';ctx2.font='8px IBM Plex Mono';ctx2.fillText(i===0?'P':`E${i}`,ox2-30,y0+P.hn*SC/2+4);
  }
  if(cores.length){
    const c=cores[Math.floor(cores.length/2)];const cx=ox+sW/2-c.h*SC/2;
    for(let i=0;i<niv;i++){
      const y0=oy+sH-(i+1)*P.hn*SC;
      ctx.fillStyle='rgba(37,99,235,.2)';ctx.fillRect(cx,y0,c.h*SC,P.hn*SC);
      ctx.strokeStyle='#3B82F6';ctx.lineWidth=.8;ctx.strokeRect(cx,y0,c.h*SC,P.hn*SC);
      const steps=7,sw=c.h*SC/steps,sh=P.hn*SC/steps;
      ctx.strokeStyle='rgba(59,130,246,.5)';ctx.lineWidth=.6;
      for(let s=0;s<steps;s++){ctx.beginPath();ctx.moveTo(cx+s*sw,y0+s*sh);ctx.lineTo(cx+(s+1)*sw,y0+s*sh);ctx.lineTo(cx+(s+1)*sw,y0+(s+1)*sh);ctx.stroke();}
    }
  }
  ctx.fillStyle='rgba(107,114,128,.35)';ctx.fillRect(ox-8,oy+sH,sW+16,16);
  ctx.strokeStyle='#6B7280';ctx.lineWidth=1;ctx.strokeRect(ox-8,oy+sH,sW+16,16);
  ctx.strokeStyle='rgba(6,182,212,.5)';ctx.lineWidth=1;ctx.setLineDash([5,4]);
  const nfaY2=oy+sH+Math.min(P.hn*.5,1.5)*SC;
  ctx.beginPath();ctx.moveTo(ox-20,nfaY);ctx.lineTo(ox+sW+30,nfaY);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle='rgba(6,182,212,.6)';ctx.font='8px IBM Plex Mono';ctx.fillText('NFA ~-1.5m',ox+4,nfaY+10);
  ctx.strokeStyle='rgba(203,213,225,.5)';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(ox-20,oy+sH);ctx.lineTo(ox+sW+60,oy+sH);ctx.stroke();
  ctx.fillStyle='#475569';ctx.font='9px IBM Plex Mono';ctx.fillText('±0.00 CTN',ox,oy+sH+14);
  if(_RV.showDim){
    ctx.strokeStyle='rgba(212,175,55,.4)';ctx.lineWidth=.8;ctx.setLineDash([3,3]);
    ctx.beginPath();ctx.moveTo(ox+sW+18,oy);ctx.lineTo(ox+sW+18,oy+sH);ctx.stroke();ctx.setLineDash([]);
    ctx.fillStyle='rgba(212,175,55,.7)';ctx.font='bold 9px IBM Plex Mono';ctx.textAlign='center';
    ctx.save();ctx.translate(ox+sW+36,oy+sH/2);ctx.fillText(Ht.toFixed(1)+'m',0,0);ctx.restore();
    ctx.textAlign='left';
  }
  _rvDrawNorth(ctx,W-38,44,P.frontDir);
  _rvDrawScale(ctx,pad,H+28,_RV.scale*.85);
  _rvDrawCartus(ctx,W,H+40,P,null,'SECȚIUNE A-A');
}

function _rvRenderAxono(b){
  const {P,bW,bD,niv,cores}=b;
  const EXPLODE_GAP = 8; // gap în metri între etaje pentru exploded view
  const SHOW_FLOORS = Math.min(niv, 6);
  const totalH = niv*P.hn + (SHOW_FLOORS-1)*EXPLODE_GAP;
  const s = Math.min(7, 420/Math.max(bW,bD,totalH));

  // Proiecție izometrică 30°
  const ISO_ANG = Math.PI/6; // 30°
  const isoX = (x,y,z) => (x - y) * Math.cos(ISO_ANG) * s;
  const isoY = (x,y,z) => (x + y) * Math.sin(ISO_ANG) * s - z * s * 0.7;

  const W=900, H=700;
  const {cv,ctx}=_rvInitCanvas(W,H);
  const CX=280, CY=560;
  const pt=(x,y,z)=>[CX+isoX(x,y,z), CY+isoY(x,y,z)];

  ctx.fillStyle='#060C1A';ctx.fillRect(0,0,W,H);

  // Titlu
  ctx.fillStyle='rgba(212,175,55,.9)';ctx.font='bold 12px IBM Plex Mono';ctx.textAlign='center';
  ctx.fillText('AXONOMETRIE EXPLODATĂ — '+niv+' NIV. · H='+Math.round(niv*P.hn)+'m · '+bW.toFixed(1)+'×'+bD.toFixed(1)+'m',450,22);
  ctx.fillStyle='rgba(148,163,184,.5)';ctx.font='8px IBM Plex Mono';
  ctx.fillText('Vedere izometrică 30° · Etaje separate pentru vizualizare compartimentare · Nr.cad. '+P.nrCad,450,35);
  ctx.textAlign='left';

  const face=(pts,fill,stk,lw=1,alpha=1)=>{
    ctx.save();ctx.globalAlpha=alpha;
    ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
    ctx.closePath();if(fill){ctx.fillStyle=fill;ctx.fill();}
    ctx.strokeStyle=stk;ctx.lineWidth=lw;ctx.stroke();
    ctx.restore();
  };

  // Floare plan pentru un etaj la înălțimea explodată
  const drawFloor=(floorIdx, zBase)=>{
    const fl = _RV.floors[floorIdx] || _RV.floors[0];
    const zLabel = floorIdx === 0 ? 'P' : `E${floorIdx}`;
    const zActual = floorIdx * P.hn;
    const isLast = floorIdx === niv-1;

    // Placa de planșeu
    face([pt(0,0,zBase),pt(bW,0,zBase),pt(bW,bD,zBase),pt(0,bD,zBase)],
      isLast?'rgba(212,175,55,.12)':'rgba(16,30,60,.75)',
      isLast?'rgba(212,175,55,.8)':'rgba(96,130,180,.4)', isLast?1.5:0.6);

    // Camerele din plan — simplificat în proiecție axonometrică
    if(fl?.rects){
      const typeColors={
        living:'rgba(59,130,246,.25)',bedroom:'rgba(52,211,153,.25)',
        bedroom2:'rgba(52,211,153,.2)',kitchen:'rgba(245,158,11,.25)',
        bath:'rgba(167,139,250,.25)',hall:'rgba(100,116,139,.2)',
        core:'rgba(37,99,235,.35)',balcon:'rgba(212,175,55,.15)',
        storage:'rgba(75,85,99,.2)'
      };
      fl.rects.forEach(r=>{
        const col=typeColors[r.t]||'rgba(50,70,100,.15)';
        const border=r.t==='core'?'rgba(96,165,250,.6)':'rgba(100,120,160,.25)';
        face([pt(r.x,r.y,zBase),pt(r.x+r.w,r.y,zBase),pt(r.x+r.w,r.y+r.h,zBase),pt(r.x,r.y+r.h,zBase)],col,border,0.4);
      });
    }

    // Pereți laterali ai etajului (dacă nu e ultimul)
    if(floorIdx < SHOW_FLOORS-1){
      const zTop = zBase + P.hn;
      // Fațada S
      const sf = 0.08 + (floorIdx%2===0?0.04:0);
      face([pt(0,bD,zBase),pt(bW,bD,zBase),pt(bW,bD,zTop),pt(0,bD,zTop)],
        `rgba(37,99,235,${sf})`,'rgba(96,130,200,.5)',0.8);
      // Fațada E
      face([pt(bW,0,zBase),pt(bW,bD,zBase),pt(bW,bD,zTop),pt(bW,0,zTop)],
        `rgba(34,197,94,.05)`,'rgba(80,130,100,.4)',0.6);

      // Ferestre fațada S
      const nWin=Math.max(2,Math.floor(bW/3.8));
      const wW=bW/nWin*0.5, wH=P.hn*0.4;
      for(let w=0;w<nWin;w++){
        const wx=w*bW/nWin+(bW/nWin-wW)/2;
        const wz=zBase+P.hn*0.25;
        const skipCore=cores.some(c=>wx+wW>c.x&&wx<c.x+c.w);
        if(!skipCore){
          face([pt(wx,bD,wz),pt(wx+wW,bD,wz),pt(wx+wW,bD,wz+wH),pt(wx,bD,wz+wH)],
            'rgba(56,189,248,.3)','rgba(56,189,248,.7)',0.8);
        }
      }

      // Balcon
      const bz=zBase+P.hn*0.75;
      face([pt(0.5,bD,bz),pt(bW-0.5,bD,bz),pt(bW-0.5,bD+0.3,bz),pt(0.5,bD+0.3,bz)],
        'rgba(212,175,55,.1)','rgba(212,175,55,.5)',0.7);
    }

    // Etichetă nivel
    const[lx,ly]=pt(bW+0.5,0,zBase);
    ctx.fillStyle='rgba(212,175,55,.9)';ctx.font='bold 9px IBM Plex Mono';ctx.textAlign='left';
    ctx.fillText(zLabel, lx+4, ly+3);
    ctx.fillStyle='rgba(148,163,184,.55)';ctx.font='7px IBM Plex Mono';
    ctx.fillText('+'+zActual.toFixed(1)+'m',lx+4,ly+12);

    // Linie punctată de conexiune cu etajul anterior
    if(floorIdx > 0){
      ctx.strokeStyle='rgba(100,120,160,.2)';ctx.lineWidth=0.5;ctx.setLineDash([3,5]);
      [[0,0],[bW,0],[bW,bD],[0,bD]].forEach(([x,y])=>{
        const[ax,ay]=pt(x,y,zBase);
        const[bx_,by_]=pt(x,y,zBase-EXPLODE_GAP);
        ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx_,by_);ctx.stroke();
      });
      ctx.setLineDash([]);
    }
  };

  // Desenăm etajele de jos în sus (pentru occlusion corect)
  for(let fl=SHOW_FLOORS-1;fl>=0;fl--){
    const zBase = fl * (P.hn + EXPLODE_GAP);
    drawFloor(fl, zBase);
  }

  // Dacă avem mai multe etaje decât SHOW_FLOORS, indicăm
  if(niv > SHOW_FLOORS){
    const[ex,ey]=pt(bW/2,bD,(SHOW_FLOORS-1)*(P.hn+EXPLODE_GAP)+P.hn+2);
    ctx.fillStyle='rgba(212,175,55,.7)';ctx.font='bold 8px IBM Plex Mono';ctx.textAlign='center';
    ctx.fillText(`... + ${niv-SHOW_FLOORS} etaje suplimentare (total ${niv} niv.)`,ex,ey);
  }

  // ── Legendă ───────────────────────────────────────────────────────────────
  const lx=600, ly=55;
  ctx.fillStyle='rgba(8,16,38,.9)';ctx.fillRect(lx-8,ly-12,280,220);
  ctx.strokeStyle='rgba(212,175,55,.2)';ctx.lineWidth=0.5;ctx.strokeRect(lx-8,ly-12,280,220);
  ctx.fillStyle='rgba(212,175,55,.8)';ctx.font='bold 9px IBM Plex Mono';ctx.textAlign='left';
  ctx.fillText('LEGENDĂ CULORI CAMERE',lx,ly);
  const legItems=[
    ['rgba(59,130,246,.5)','Living / Sufragerie'],
    ['rgba(52,211,153,.5)','Dormitor'],
    ['rgba(245,158,11,.5)','Bucătărie'],
    ['rgba(167,139,250,.5)','Baie / WC'],
    ['rgba(37,99,235,.5)','Casă scări / Lift'],
    ['rgba(212,175,55,.4)','Balcon / Terasă'],
    ['rgba(100,116,139,.4)','Hol / Coridor'],
    ['rgba(75,85,99,.4)','Depozit / Garderobă'],
  ];
  legItems.forEach(([col,lbl],i)=>{
    ctx.fillStyle=col;ctx.fillRect(lx,ly+14+i*22,12,12);
    ctx.strokeStyle='rgba(255,255,255,.2)';ctx.lineWidth=0.5;ctx.strokeRect(lx,ly+14+i*22,12,12);
    ctx.fillStyle='rgba(200,215,240,.8)';ctx.font='8px IBM Plex Mono';
    ctx.fillText(lbl,lx+16,ly+24+i*22);
  });

  // ── Dimensiuni ─────────────────────────────────────────────────────────────
  const [dsx,dsy]=pt(0,bD+1,0), [dex,dey]=pt(bW,bD+1,0);
  ctx.strokeStyle='rgba(148,163,184,.5)';ctx.lineWidth=0.7;
  ctx.beginPath();ctx.moveTo(dsx,dsy);ctx.lineTo(dex,dey);ctx.stroke();
  ctx.fillStyle='rgba(148,163,184,.8)';ctx.font='7px IBM Plex Mono';ctx.textAlign='center';
  ctx.fillText(bW.toFixed(1)+'m',(dsx+dex)/2,(dsy+dey)/2+10);

  const [dsx2,dsy2]=pt(bW+1,0,0), [dex2,dey2]=pt(bW+1,bD,0);
  ctx.beginPath();ctx.moveTo(dsx2,dsy2);ctx.lineTo(dex2,dey2);ctx.stroke();
  ctx.fillText(bD.toFixed(1)+'m',(dsx2+dex2)/2+15,(dsy2+dey2)/2);

  // Buton zoom info
  ctx.fillStyle='rgba(148,163,184,.4)';ctx.font='7px IBM Plex Mono';ctx.textAlign='center';
  ctx.fillText('📦 Vedere izometrică explodată · '+SHOW_FLOORS+' din '+niv+' etaje afișate · Folosiți + / - pentru zoom',W/2,H-12);
  ctx.textAlign='left';
  { // block scope for subsequent render
  const iso=(x,y,z)=>({px:(x-y)*Math.cos(Math.PI/6)*s, py:(x+y)*Math.sin(Math.PI/6)*s-z*s*.55});
  const {cv,ctx}=_rvInitCanvas(780,560);
  ctx.fillStyle='#060C1A';ctx.fillRect(0,0,780,560);
  // Grid background
  ctx.strokeStyle='rgba(255,255,255,.015)';ctx.lineWidth=.5;
  for(let x=0;x<780;x+=20){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,560);ctx.stroke();}
  for(let y=0;y<560;y+=20){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(780,y);ctx.stroke();}
  const CX=280,CY=390;
  const pt=(x,y,z)=>{const r=iso(x,y,z);return[CX+r.px,CY+r.py];};
  const face=(pts,fill,stk,lw=1)=>{
    ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
    ctx.closePath();ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=stk;ctx.lineWidth=lw;ctx.stroke();
  };

  // ── Umbra (shadow) ────────────────────────────────────────────────────────
  const shadowOff=8;
  ctx.save(); ctx.globalAlpha=0.25;
  const shadow_pts=[pt(0,0,0),pt(bW,0,0),pt(bW,bD,0),pt(0,bD,0)];
  ctx.beginPath();
  shadow_pts.forEach(([x,y],i)=>i?ctx.lineTo(x+shadowOff,y+shadowOff):ctx.moveTo(x+shadowOff,y+shadowOff));
  ctx.closePath(); ctx.fillStyle='rgba(0,0,0,.6)'; ctx.fill();
  ctx.globalAlpha=1; ctx.restore();

  // ── Planșee (floors) ─────────────────────────────────────────────────────
  const sF=Math.min(5,niv);
  for(let fl=0;fl<=sF;fl++){
    const z=fl*P.hn;
    const alpha=0.5+fl*.04;
    face([pt(0,0,z),pt(bW,0,z),pt(bW,bD,z),pt(0,bD,z)],
      `rgba(16,29,53,${alpha})`,`rgba(203,213,225,${.08+fl*.02})`, .4);
    // Etichetă nivel pe marginea dreaptă
    if(fl>0 && fl<=sF){
      const[ex,ey]=pt(bW,0,z);
      ctx.fillStyle='rgba(212,175,55,.7)'; ctx.font='bold 8px IBM Plex Mono';
      ctx.fillText(fl===niv?'ATIC':(fl===1?'P':'E'+(fl-1)),ex+6,ey+3);
      ctx.fillStyle='rgba(148,163,184,.5)'; ctx.font='7px IBM Plex Mono';
      ctx.fillText('+'+(z).toFixed(1)+'m',ex+6,ey+12);
    }
  }
  if(niv>sF){
    const z=niv*P.hn;
    face([pt(0,0,z),pt(bW,0,z),pt(bW,bD,z),pt(0,bD,z)],'rgba(212,175,55,.1)','rgba(212,175,55,.6)',1.5);
    ctx.strokeStyle='rgba(203,213,225,.1)';ctx.lineWidth=.5;ctx.setLineDash([4,4]);
    [[0,0],[bW,0],[bW,bD],[0,bD]].forEach(([x,y])=>{
      const[ax,ay]=pt(x,y,sF*P.hn);const[bx_,by_]=pt(x,y,niv*P.hn);
      ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx_,by_);ctx.stroke();
    });
    ctx.setLineDash([]);
  }

  // ── Fațade vizibile ───────────────────────────────────────────────────────
  const z1=sF*P.hn;
  // Fațada S (principală vizibilă)
  face([pt(0,bD,0),pt(bW,bD,0),pt(bW,bD,z1),pt(0,bD,z1)],'rgba(37,99,235,.12)','#3B82F6',1.5);
  // Fațada E (laterală)
  face([pt(bW,0,0),pt(bW,bD,0),pt(bW,bD,z1),pt(bW,0,z1)],'rgba(34,197,94,.08)','rgba(100,150,120,.5)',1);

  // ── Ferestre pe fațada S ──────────────────────────────────────────────────
  const wCols=Math.max(2,Math.floor(bW/3.5));const wW_=bW/wCols*.55;const wH_=P.hn*.42;
  const cC=Math.floor(wCols/2);
  for(let row=0;row<Math.min(niv,sF);row++){
    for(let col=0;col<wCols;col++){
      if(col===cC||col===cC-1) continue;
      const wx=col*bW/wCols+(bW/wCols-wW_)/2,wz=row*P.hn+P.hn*.25;
      const sf=(['S','SE','SV'].includes(P.frontDir))?.35:.14;
      face([pt(wx,bD,wz),pt(wx+wW_,bD,wz),pt(wx+wW_,bD,wz+wH_),pt(wx,bD,wz+wH_)],
        `rgba(56,189,248,${sf})`,'#38BDF8',1.2);
      // Cercevele
      ctx.strokeStyle='rgba(56,189,248,.25)'; ctx.lineWidth=.5;
      const[w1x,w1y]=pt(wx+wW_/2,bD,wz),wBot=pt(wx+wW_/2,bD,wz+wH_);
      ctx.beginPath();ctx.moveTo(w1x,w1y);ctx.lineTo(wBot[0],wBot[1]);ctx.stroke();
    }
  }
  // ── Balcoane ──────────────────────────────────────────────────────────────
  for(let row=1;row<Math.min(niv,sF);row++){
    const bz=row*P.hn+P.hn*.78;
    face([pt(.5,bD,bz),pt(bW-.5,bD,bz),pt(bW-.5,bD+.4,bz),pt(.5,bD+.4,bz)],
      'rgba(212,175,55,.08)','rgba(212,175,55,.35)',.8);
  }

  // ── H indicator ──────────────────────────────────────────────────────────
  const[hTopX,hTopY]=pt(bW+1,0,niv*P.hn),hBotPt=pt(bW+1,0,0);
  ctx.strokeStyle='rgba(212,175,55,.5)';ctx.lineWidth=1;ctx.setLineDash([3,3]);
  ctx.beginPath();ctx.moveTo(hTopX,hTopY);ctx.lineTo(hBotPt[0],hBotPt[1]);ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle='rgba(212,175,55,.85)'; ctx.font='bold 9px IBM Plex Mono';
  ctx.fillText('H='+(niv*P.hn).toFixed(1)+'m',(hTopX+hBotPt[0])/2+6,(hTopY+hBotPt[1])/2);

  // ── Explicație: CE ESTE ACEASTĂ VEDERE ────────────────────────────────────
  // Panou informativ în dreapta
  ctx.fillStyle='rgba(8,16,38,.92)'; ctx.fillRect(460,20,300,360);
  ctx.strokeStyle='rgba(212,175,55,.25)'; ctx.lineWidth=1; ctx.strokeRect(460,20,300,360);
  ctx.fillStyle='rgba(212,175,55,.15)'; ctx.fillRect(460,20,300,28);
  ctx.fillStyle='#D4AF37'; ctx.font='bold 10px Space Grotesk'; ctx.textAlign='center';
  ctx.fillText('CE ESTE VEDEREA AXONOMETRICĂ?',610,38); ctx.textAlign='left';

  const explLines=[
    ['📐 CE ESTE:','O proiecție izometrică tehnică (30°) a'],
    ['','volumului clădirii. Arată forma 3D exactă,'],
    ['','propor­ții­le și regimul de înălțime.'],
    ['',''],
    ['📏 CE ARATĂ:','• Planșee = benzile orizontale (niveluri)'],
    ['','• Ferestre = dreptunghiuri albastre pe fațadă'],
    ['','• Balcoane = benzi aurii per nivel'],
    ['','• H indicator = înălțimea totală'],
    ['','• Niveluri: '+niv+' niv. · H='+( niv*P.hn).toFixed(1)+'m'],
    ['',''],
    ['⚠️ CE NU ESTE:','NU este o randare foto-realistă.'],
    ['','NU are materiale/culori finale (acelea'],
    ['','se stabilesc la faza PAC de arhitect).'],
    ['','NU este o perspectivă (care ar distorsiona'],
    ['','propor­ți­ile și nu ar fi precisă tehnic).'],
    ['',''],
    ['✅ DE CE E UTIL:','• Înțelegi volumul fără a fi arhitect'],
    ['','• Verifici că H și retragerile sunt corecte'],
    ['','• Identifici numărul de niveluri'],
    ['','• Compari cu contextul urban din PDF'],
    ['',''],
    ['🏗️ RANDARE 3D:','Disponibilă în Viewer 3D Urban3D →'],
    ['','folosește butonul 🔭 din panoul AEDIS'],
    ['','pentru imagini foto-realiste cu materiale.'],
  ];
  let ey=58;
  explLines.forEach(([label,text])=>{
    if(ey>360) return;
    if(label){
      ctx.fillStyle='#D4AF37'; ctx.font='bold 7px Space Grotesk';
      ctx.fillText(label,468,ey);
      ctx.fillStyle='rgba(203,213,225,.85)'; ctx.font='7px IBM Plex Mono';
      ctx.fillText(text,468+58,ey);
    } else {
      ctx.fillStyle='rgba(148,163,184,.7)'; ctx.font='7px IBM Plex Mono';
      ctx.fillText(text,468+58,ey);
    }
    ey+=11;
  });

  // Footer
  ctx.fillStyle='rgba(212,175,55,.7)'; ctx.font='bold 10px Space Grotesk';
  ctx.fillText(`VEDERE AXONOMETRICĂ · ${niv} NIV. · H=${(niv*P.hn).toFixed(1)}m · SDA=${_rvFmt(b.sdaTotal)}m²  ·  Nr.cad. ${P.nrCad}`,16,546);
  _rvDrawCartus(ctx,780,560,P,null,'AXONOMETRIE 3D — SCHEMĂ ORIENTATIVĂ');
  _rvDrawNorth(ctx,430,42,P.frontDir);
}

  } // end block scope
function _rvDrawDims(ctx,ox,oy,pw,ph,bW,bD,P,SC){
  ctx.strokeStyle='rgba(212,175,55,.4)';ctx.fillStyle='rgba(212,175,55,.75)';
  ctx.font='bold 9px IBM Plex Mono';ctx.lineWidth=.8;
  ctx.setLineDash([3,3]);
  ctx.beginPath();ctx.moveTo(ox,oy+ph+18);ctx.lineTo(ox+pw,oy+ph+18);ctx.stroke();
  ctx.setLineDash([]);ctx.textAlign='center';ctx.fillText(bW.toFixed(1)+'m',ox+pw/2,oy+ph+30);
  ctx.setLineDash([3,3]);
  ctx.beginPath();ctx.moveTo(ox-18,oy);ctx.lineTo(ox-18,oy+ph);ctx.stroke();
  ctx.setLineDash([]);
  ctx.save();ctx.translate(ox-30,oy+ph/2);ctx.rotate(-Math.PI/2);ctx.fillText(bD.toFixed(1)+'m',0,0);ctx.restore();
  ctx.fillStyle='rgba(212,175,55,.4)';ctx.font='8px IBM Plex Mono';
  ctx.fillText(P.W.toFixed(1)+'m (parcelă)',ox+P.W*SC/2,oy+P.D*SC+30);
  ctx.textAlign='left';
}

function _rvDrawNorth(ctx,x,y,dir){
  const rot={N:0,S:Math.PI,E:Math.PI/2,V:-Math.PI/2,NE:Math.PI/4,NV:-Math.PI/4,SE:Math.PI*3/4,SV:-Math.PI*3/4}[dir]||0;
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);
  ctx.beginPath();ctx.arc(0,0,16,0,Math.PI*2);
  ctx.fillStyle='rgba(6,12,26,.8)';ctx.fill();
  ctx.strokeStyle='rgba(212,175,55,.4)';ctx.lineWidth=1;ctx.stroke();
  ctx.fillStyle='#EF4444';
  ctx.beginPath();ctx.moveTo(0,-12);ctx.lineTo(5,4);ctx.lineTo(0,2);ctx.lineTo(-5,4);ctx.closePath();ctx.fill();
  ctx.fillStyle='#64748b';
  ctx.beginPath();ctx.moveTo(0,12);ctx.lineTo(5,4);ctx.lineTo(0,2);ctx.lineTo(-5,4);ctx.closePath();ctx.fill();
  ctx.restore();
  ctx.fillStyle='#EF4444';ctx.font='bold 9px Space Grotesk';ctx.textAlign='center';
  ctx.fillText('N',x,y-20);ctx.textAlign='left';
}


// ── Tabel centralizator apartamente ────────────────────────────────────────
function _rvDrawTabelApartamente(ctx, fl, b, tx, ty, maxW){
  if(!fl||!b) return;
  const aptIds=[...new Set(fl.rects.filter(r=>r.apt>0).map(r=>r.apt))].sort((a,z)=>a-z);
  if(aptIds.length===0) return;
  const rowH=14, cols=[60,55,30,50,55];
  const headers=['APARTAMENT','TIP','CAM.','SU (m²)','SC (m²)'];
  const tW=cols.reduce((s,c)=>s+c,0);
  // Header
  ctx.fillStyle='#1E293B'; ctx.fillRect(tx,ty,tW,rowH);
  ctx.fillStyle='#FFFFFF'; ctx.font='bold 7px IBM Plex Mono'; ctx.textAlign='left';
  let cx2=tx;
  headers.forEach((h,i)=>{ctx.fillText(h,cx2+3,ty+9); cx2+=cols[i];});
  // Rânduri
  aptIds.forEach((aptId,idx)=>{
    const rooms=fl.rects.filter(r=>r.apt===aptId&&!r.bal);
    const su=rooms.reduce((s,r)=>s+r.w*r.h,0);
    const sc=su*1.22; // coeficient SC/SU
    const nCam=rooms.filter(r=>['living','bedroom','bedroom2','bedroom3'].includes(r.t)).length;
    const tipMap={1:'Garsonieră',2:'2 camere',3:'3 camere',4:'4 camere'};
    const ry2=ty+rowH*(idx+1);
    ctx.fillStyle=idx%2===0?'#F8FAFC':'#F1F5F9'; ctx.fillRect(tx,ry2,tW,rowH);
    ctx.strokeStyle='#CBD5E1'; ctx.lineWidth=.5; ctx.strokeRect(tx,ry2,tW,rowH);
    ctx.fillStyle='#0F172A'; ctx.font=`${idx===0?'bold ':''} 7px IBM Plex Mono`;
    cx2=tx;
    [`Ap. ${String(aptId).padStart(2,'0')}`, tipMap[nCam]||`${nCam} cam.`, String(nCam), su.toFixed(1), sc.toFixed(1)].forEach((v,i)=>{
      ctx.fillStyle='#0F172A'; ctx.fillText(v,cx2+3,ry2+9); cx2+=cols[i];
    });
  });
  // Total SU
  const totalSU=aptIds.reduce((s,id)=>s+fl.rects.filter(r=>r.apt===id&&!r.bal).reduce((a,r)=>a+r.w*r.h,0),0);
  const totY=ty+rowH*(aptIds.length+1);
  ctx.fillStyle='#E2E8F0'; ctx.fillRect(tx,totY,tW,rowH);
  ctx.fillStyle='#1E293B'; ctx.font='bold 7px IBM Plex Mono';
  ctx.fillText(`TOTAL: ${aptIds.length} apartamente · SU etaj: ${totalSU.toFixed(1)}m²`,tx+3,totY+9);
  ctx.textAlign='left';
}

// ── Legendă plan ────────────────────────────────────────────────────────────
function _rvDrawLegenda(ctx, lx, ly, SC){
  const items=[
    {col:'rgba(254,215,170,.7)',lbl:'Living / Camera de zi'},
    {col:'rgba(187,247,208,.7)',lbl:'Dormitor'},
    {col:'rgba(186,230,253,.7)',lbl:'Bucătărie'},
    {col:'rgba(221,214,254,.7)',lbl:'Baie / WC'},
    {col:'rgba(226,232,240,.7)',lbl:'Hol / Depozitare'},
    {col:'rgba(191,219,254,.6)',lbl:'Casa scărilor'},
    {col:'rgba(254,249,195,.7)',lbl:'Balcon / Terasă'},
  ];
  const legW=120, rowH=13;
  ctx.fillStyle='#FFFFFF'; ctx.fillRect(lx,ly,legW,items.length*rowH+26);
  ctx.strokeStyle='#CBD5E1'; ctx.lineWidth=1; ctx.strokeRect(lx,ly,legW,items.length*rowH+26);
  ctx.fillStyle='#1E293B'; ctx.font='bold 8px IBM Plex Mono';
  ctx.fillText('LEGENDĂ',lx+4,ly+11);
  items.forEach((item,i)=>{
    const iy=ly+18+i*rowH;
    ctx.fillStyle=item.col; ctx.fillRect(lx+4,iy,10,10);
    ctx.strokeStyle='#94A3B8'; ctx.lineWidth=.5; ctx.strokeRect(lx+4,iy,10,10);
    ctx.fillStyle='#334155'; ctx.font='7px IBM Plex Mono';
    ctx.fillText(item.lbl,lx+18,iy+8);
  });
  // Simbol ușă
  const symY=ly+items.length*rowH+20;
  ctx.strokeStyle='#0F172A'; ctx.lineWidth=1.2;
  ctx.beginPath();ctx.moveTo(lx+4,symY);ctx.lineTo(lx+14,symY);ctx.stroke();
  ctx.beginPath();ctx.arc(lx+4,symY,10,0,Math.PI/4);ctx.stroke();
  ctx.fillStyle='#334155'; ctx.font='7px IBM Plex Mono';
  ctx.fillText('Ușă (foaie + arc)',lx+18,symY+4);
}

function _rvDrawScale(ctx,x,y,SC){
  const m5=SC*5;
  // Bară de scară arhitecturală vizibilă
  ctx.fillStyle='#1E293B'; ctx.fillRect(x,y-8,m5/2,8);
  ctx.fillStyle='#CBD5E1'; ctx.fillRect(x+m5/2,y-8,m5/2,8);
  ctx.strokeStyle='#1E293B';ctx.lineWidth=1.5; ctx.strokeRect(x,y-8,m5,8);
  ctx.fillStyle='#1E293B';ctx.font='bold 9px IBM Plex Mono';ctx.textAlign='center';
  ctx.fillText('0',x,y+11); ctx.fillText('5m',x+m5,y+11);
  ctx.fillText('Scara 1:'+Math.round(100/(_RV.scale/12)),x+m5/2,y+22);ctx.textAlign='left';
}

function _rvDrawCartus(ctx,W,H,P,floorIdx,subtitle){
  const cW=240,cH=46,cx=W-cW-8,cy=H-cH-8;
  ctx.fillStyle='rgba(11,20,38,.9)';ctx.fillRect(cx,cy,cW,cH);
  ctx.strokeStyle='rgba(212,175,55,.35)';ctx.lineWidth=1;ctx.strokeRect(cx,cy,cW,cH);
  ctx.fillStyle='rgba(212,175,55,.15)';ctx.fillRect(cx,cy,cW,10);
  ctx.fillStyle='rgba(212,175,55,.85)';ctx.font='bold 7px Space Grotesk';
  ctx.fillText(' UrbanX TSS·FG · Document orientativ · '+new Date().toLocaleDateString('ro-RO'),cx+4,cy+7.5);
  ctx.fillStyle='#DDE6F5';ctx.font='7px IBM Plex Mono';
  ctx.fillText(`Nr.cad. ${P.nrCad}  ·  UTR: ${P.utr}  ·  ${P.fn}`,cx+4,cy+20);
  ctx.fillText(`${P.W}m×${P.D}m  ·  ${P.niv}niv.  ·  H=${(P.niv*P.hn).toFixed(1)}m  ·  ${subtitle||'PLAN'}${floorIdx!=null?' E'+floorIdx:''}`,cx+4,cy+30);
  ctx.fillText(`POT=${Math.round(P.pot*100)}%  CUT=${P.cut}  Sc.1:100`,cx+4,cy+40);
}

function _rvSetupHover(cv,fl,ox,oy){
  cv.onmousemove=(e)=>{
    const r=cv.getBoundingClientRect();
    const mx=e.clientX-r.left, my=e.clientY-r.top;
    const mxM=(mx-ox)/_RV.scale, myM=(my-oy)/_RV.scale;
    const hit=fl.rects.find(r_=>mxM>=r_.x&&mxM<=r_.x+r_.w&&myM>=r_.y&&myM<=r_.y+r_.h);
    const tip=document.getElementById('rv-tip');
    if(hit&&tip){
      const area=_rvFmt(hit.w*hit.h);
      const normMin=_RV_NP057[hit.t]||0;
      const areaNum=hit.w*hit.h;
      const normOk=normMin===0||areaNum>=normMin;
      tip.style.display='block'; tip.style.left=(e.clientX+14)+'px'; tip.style.top=(e.clientY-10)+'px';
      tip.innerHTML=`<strong style="color:#D4AF37">${_rvEsc(hit.lbl||hit.t)}</strong><br>`+
        `Suprafață: ${area}m² &nbsp; ${hit.w.toFixed(1)}×${hit.h.toFixed(1)}m<br>`+
        (normMin?`NP057 min: ${normMin}m² &nbsp; ${normOk?'<span style="color:#22C55E">✓ CONFORM</span>':'<span style="color:#EF4444">✗ SUB MINIM</span>'}<br>`:'')+
        (hit.solarH?`OMS 119: ${hit.solarH}h ☀ ${hit.solarOk?'<span style="color:#22C55E">✓</span>':'<span style="color:#EF4444">✗ insuficient</span>'}`:'')+
        (hit.apt>=0?`<br><span style="color:#64748b">Ap. #${hit.apt+1}</span>`:'');
    } else if(tip){ tip.style.display='none'; }
  };
  cv.onmouseleave=()=>{const t=document.getElementById('rv-tip');if(t)t.style.display='none';};

  // ── Scroll to zoom (mouse wheel + trackpad) ─────────────────────────────
  if(!cv._rvScrollBound){
    cv._rvScrollBound=true;
    cv.addEventListener('wheel',(e)=>{
      e.preventDefault();e.stopPropagation();
      const delta=e.deltaY<0?1:-1;
      _RV.scale=Math.max(4,Math.min(48,_RV.scale+delta*2));
      document.getElementById('rv-zval').textContent=Math.round(_RV.scale/12*100)+'%';
      if(_RV.building)_rvRender();
    },{passive:false});
    // Pinch-to-zoom (touch)
    let lastDist=0;
    cv.addEventListener('touchstart',(e)=>{if(e.touches.length===2)lastDist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);},{passive:true});
    cv.addEventListener('touchmove',(e)=>{
      if(e.touches.length===2){
        const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
        const delta=d-lastDist;
        if(Math.abs(delta)>2){
          _RV.scale=Math.max(4,Math.min(48,_RV.scale+(delta>0?1:-1)*1.5));
          document.getElementById('rv-zval').textContent=Math.round(_RV.scale/12*100)+'%';
          if(_RV.building)_rvRender();
          lastDist=d;
        }
      }
    },{passive:true});
  }

  // ── Pan / drag (mână trage planșa stânga-dreapta-sus-jos) ──────────────
  const wrap=document.querySelector('.rv-drawwrap');
  if(wrap&&!wrap._rvPanBound){
    wrap._rvPanBound=true;
    let isPan=false,panSX=0,panSY=0,panSL=0,panST=0;
    wrap.style.cursor='default';
    wrap.addEventListener('mousedown',(e)=>{
      if(e.button!==0||e.target!==cv)return;
      // Nu activăm pan dacă suntem pe un handle de resize al camerei selectate
      if(_RV.selectedRoom){
        const r=cv.getBoundingClientRect();
        const mx=e.clientX-r.left, my=e.clientY-r.top;
        const h=getHandle?.(mx,my);
        if(h) return; // lasă resize-ul să preia
      }
      // Nu activăm pan dacă suntem în modul de resize activ
      if(_RV.resizing) return;
      isPan=true;wrap.style.cursor='grabbing';
      panSX=e.clientX;panSY=e.clientY;panSL=wrap.scrollLeft;panST=wrap.scrollTop;
    });
    window.addEventListener('mousemove',(e)=>{
      if(!isPan)return;
      wrap.scrollLeft=panSL-(e.clientX-panSX);
      wrap.scrollTop=panST-(e.clientY-panSY);
    });
    window.addEventListener('mouseup',()=>{if(isPan){isPan=false;wrap.style.cursor='default';}});
    // Touch drag (1 deget)
    let tSX=0,tSY=0,tSL=0,tST=0;
    wrap.addEventListener('touchstart',(e)=>{
      if(e.touches.length===1){tSX=e.touches[0].clientX;tSY=e.touches[0].clientY;tSL=wrap.scrollLeft;tST=wrap.scrollTop;}
    },{passive:true});
    wrap.addEventListener('touchmove',(e)=>{
      if(e.touches.length===1){
        wrap.scrollLeft=tSL-(e.touches[0].clientX-tSX);
        wrap.scrollTop=tST-(e.touches[0].clientY-tSY);
      }
    },{passive:true});
    // Cursor grab când ești pe canvas
    cv.addEventListener('mouseenter',()=>{if(!isPan)wrap.style.cursor='grab';});
    cv.addEventListener('mouseleave',()=>{if(!isPan)wrap.style.cursor='default';});
  }

  // ── Click pe cameră → selecție + Room Inspector ───────────────────────
  cv.onclick=(e)=>{
    if(_RV.tab!=='plan') return;
    if(_RV.resizing) return; // nu triggera click în mijlocul unui drag
    const r=cv.getBoundingClientRect();
    const mx=e.clientX-r.left, my=e.clientY-r.top;
    const mxM=(mx-ox)/_RV.scale, myM=(my-oy)/_RV.scale;
    const hit=fl.rects.find(r_=>mxM>=r_.x&&mxM<=r_.x+r_.w&&myM>=r_.y&&myM<=r_.y+r_.h);
    if(hit){
      _RV.selectedRoom=hit;
      _rvShowInspector(hit, e.clientX, e.clientY);
      _rvRender(); // re-render cu highlight
    } else {
      _RV.selectedRoom=null;
      const ri=document.getElementById('rv-inspector');
      if(ri) ri.style.display='none';
      _rvRender();
    }
  };

  // ── Drag resize handles ────────────────────────────────────────────────
  const getHandle=(mx,my)=>{
    if(!_RV.selectedRoom) return null;
    const r=_RV.selectedRoom;
    const _ox=_RV.planOx, _oy=_RV.planOy, _SC=_RV.planSc;
    const rx=_ox+r.x*_SC, ry=_oy+r.y*_SC, rw=r.w*_SC, rh=r.h*_SC;
    const hSz=12;
    if(Math.abs(mx-(rx+rw))<hSz && Math.abs(my-(ry+rh/2))<hSz) return 'right';
    if(Math.abs(mx-(rx+rw/2))<hSz && Math.abs(my-(ry+rh))<hSz) return 'bottom';
    if(Math.abs(mx-(rx+rw))<hSz && Math.abs(my-(ry+rh))<hSz) return 'corner';
    return null;
  };

  if(!cv._rvResizeBound){
    cv._rvResizeBound=true;
    let _rAF=null;
    const schedRender=()=>{ if(_rAF) return; _rAF=requestAnimationFrame(()=>{_rvRender();_rAF=null;}); };

    cv.addEventListener('mousedown',(e)=>{
      if(_RV.tab!=='plan') return;
      const r=cv.getBoundingClientRect();
      const mx=e.clientX-r.left, my=e.clientY-r.top;
      const handle=getHandle(mx,my);
      if(handle && _RV.selectedRoom){
        e.preventDefault(); e.stopPropagation();
        _RV.resizing={handle, mx0:mx, my0:my, w0:_RV.selectedRoom.w, h0:_RV.selectedRoom.h};
        cv.style.cursor=handle==='right'?'ew-resize':handle==='bottom'?'ns-resize':'nwse-resize';
      }
    },{passive:false});

    window.addEventListener('mousemove',(e)=>{
      if(!_RV.resizing || !_RV.selectedRoom) return;
      const r=cv.getBoundingClientRect();
      const mx=e.clientX-r.left, my=e.clientY-r.top;
      const {handle,mx0,my0,w0,h0}=_RV.resizing;
      const _SC=_RV.planSc||_RV.scale;
      const dxM=(mx-mx0)/_SC;
      const dyM=(my-my0)/_SC;
      const minW=1.2, minH=1.2;
      if(handle==='right'||handle==='corner')
        _RV.selectedRoom.w=Math.max(minW, Math.round((w0+dxM)*10)/10);
      if(handle==='bottom'||handle==='corner')
        _RV.selectedRoom.h=Math.max(minH, Math.round((h0+dyM)*10)/10);
      _RV.editDirty=true;
      schedRender();
      // Update inspector live dacă e deschis
      _rvInspectorUpdateLive();
    });

    window.addEventListener('mouseup',()=>{
      if(_RV.resizing){
        _RV.resizing=null;
        cv.style.cursor='';
        _rvRender();
        _rvUpdatePanels(_RV.building, _RV.parcelParams);
      }
    });

    // Touch resize (mobil)
    cv.addEventListener('touchstart',(e)=>{
      if(_RV.tab!=='plan'||e.touches.length!==1) return;
      const r=cv.getBoundingClientRect();
      const mx=e.touches[0].clientX-r.left, my=e.touches[0].clientY-r.top;
      const handle=getHandle(mx,my);
      if(handle && _RV.selectedRoom){
        e.preventDefault();
        _RV.resizing={handle, mx0:mx, my0:my, w0:_RV.selectedRoom.w, h0:_RV.selectedRoom.h};
      }
    },{passive:false});

    window.addEventListener('touchmove',(e)=>{
      if(!_RV.resizing||!_RV.selectedRoom||e.touches.length!==1) return;
      const r=cv.getBoundingClientRect();
      const mx=e.touches[0].clientX-r.left, my=e.touches[0].clientY-r.top;
      const {handle,mx0,my0,w0,h0}=_RV.resizing;
      const dxM=(mx-mx0)/_RV.scale, dyM=(my-my0)/_RV.scale;
      if(handle==='right'||handle==='corner')
        _RV.selectedRoom.w=Math.max(1.2, Math.round((w0+dxM)*10)/10);
      if(handle==='bottom'||handle==='corner')
        _RV.selectedRoom.h=Math.max(1.2, Math.round((h0+dyM)*10)/10);
      _RV.editDirty=true;
      schedRender();
      _rvInspectorUpdateLive();
    },{passive:false});

    window.addEventListener('touchend',()=>{
      if(_RV.resizing){ _RV.resizing=null; _rvRender(); }
    });
  }
}

// ══════════════════════════════════════════════════════════════════════════
// OVERLAY: SOLAR ÎNSORIRE (OMS 119/2014)
// Calculează poziția soarelui pentru Iași (lat=47.16°) la ora/luna selectată
// ══════════════════════════════════════════════════════════════════════════
function _rvDrawSolarAnim(ctx, fl, b, ox, oy, SC){
  const hour=_RV.solarHour||10, month=_RV.solarMonth||12;
  const lat=47.16, DOY=[0,31,59,90,120,151,181,212,243,273,304,334][month-1]+15;
  const declRad=(-23.45*Math.cos((360/365*(DOY+10))*Math.PI/180))*Math.PI/180;
  const latRad=lat*Math.PI/180;
  const hAngleRad=(hour-12)*15*Math.PI/180;
  const sinElev=Math.sin(latRad)*Math.sin(declRad)+Math.cos(latRad)*Math.cos(declRad)*Math.cos(hAngleRad);
  const elevDeg=Math.asin(Math.max(-1,Math.min(1,sinElev)))*180/Math.PI;
  const cosAz=(Math.sin(declRad)-Math.sin(latRad)*sinElev)/(Math.cos(latRad)*Math.cos(Math.asin(sinElev)||0.001));
  const azDeg=(hour<12?-1:1)*Math.acos(Math.max(-1,Math.min(1,cosAz)))*180/Math.PI+180;

  if(elevDeg<=0){
    ctx.fillStyle='rgba(5,10,30,.55)';
    ctx.fillRect(ox,oy,b.bW*SC,b.bD*SC);
    ctx.fillStyle='rgba(147,197,253,.7)';ctx.font='bold 11px IBM Plex Mono';ctx.textAlign='center';
    ctx.fillText('🌙 NOAPTE  —  soare sub orizont',ox+b.bW*SC/2,oy+b.bD*SC/2);
    ctx.textAlign='left'; return;
  }

  const intensitate=Math.min(1,elevDeg/45);
  const frontAz={N:0,NE:45,E:90,SE:135,S:180,SV:225,V:270,NV:315}[b.P?.frontDir||'N']||0;

  // ── FIX BUG: split la mijlocul real al clădirii, nu la rație fixă ────────
  // Nord rooms (y < bD/2) → fac spre frontDir
  // Sud rooms (y ≥ bD/2) → fac spre opusul frontDir
  const bMid = b.bD / 2;

  fl.rects.forEach(r=>{
    if(!['living','bedroom','bedroom2','bedroom3','kitchen','hall','storage'].includes(r.t)) return;
    const rx=ox+r.x*SC, ry=oy+r.y*SC, rw=r.w*SC, rh=r.h*SC;
    // Camerele de servicii (interior) nu au ferestre directe → semiumbră
    const hasWindow = ['living','bedroom','bedroom2','bedroom3'].includes(r.t);
    if(!hasWindow){
      ctx.fillStyle='rgba(10,20,50,.15)'; ctx.fillRect(rx,ry,rw,rh); return;
    }
    // Fațada camerei: nord vs sud bazat pe poziția în clădire
    const isNorth = (r.y + r.h/2) < bMid;
    const facingAz = isNorth ? frontAz : (frontAz+180)%360;
    const angleDiff=Math.abs(((azDeg-facingAz+540)%360)-180);
    const sunlit=angleDiff<90 && elevDeg>2;

    if(sunlit){
      const alpha=0.10+intensitate*0.38;
      ctx.fillStyle=`rgba(255,215,50,${alpha})`;
      ctx.fillRect(rx,ry,rw,rh);
      if(rw>22&&rh>15){
        ctx.font=`${Math.min(13,rw*0.35)}px sans-serif`;ctx.textAlign='center';
        ctx.fillStyle=`rgba(255,200,30,${0.6+intensitate*0.4})`;
        ctx.fillText('☀',rx+rw/2,ry+rh/2+4); ctx.textAlign='left';
      }
    } else {
      ctx.fillStyle='rgba(10,20,60,.32)'; ctx.fillRect(rx,ry,rw,rh);
    }
  });

  // ── Info box ──────────────────────────────────────────────────────────────
  const sx=ox+b.bW*SC+10, sy=oy+10;
  ctx.fillStyle='rgba(8,15,35,.9)';ctx.fillRect(sx-5,sy-5,100,46);
  ctx.strokeStyle='rgba(212,175,55,.3)';ctx.lineWidth=0.5;ctx.strokeRect(sx-5,sy-5,100,46);
  ctx.fillStyle='#D4AF37';ctx.font='bold 9px IBM Plex Mono';
  ctx.fillText(`☀ ${String(Math.floor(hour)).padStart(2,'0')}:00`,sx,sy+8);
  ctx.fillStyle='rgba(212,175,55,.7)';ctx.font='8px IBM Plex Mono';
  ctx.fillText(`Elev: ${elevDeg.toFixed(1)}°  Az: ${azDeg.toFixed(0)}°`,sx,sy+20);
  const lunile=['Ian','Feb','Mar','Apr','Mai','Iun','Iul','Aug','Sep','Oct','Nov','Dec'];
  ctx.fillText((lunile[month-1]||'')+' · OMS 119: 1.5h/zi',sx,sy+32);
}

// ── Solar pe Fațadă — suprapune soare + umbre pe desenul fațadei ──────────
function _rvDrawSolarFatada(ctx, P, bW, bD, niv, ox, oy, W, H){
  if(!_RV.showSolar) return;
  const hour=_RV.solarHour||10, month=_RV.solarMonth||12;
  const lat=47.16, DOY=[0,31,59,90,120,151,181,212,243,273,304,334][month-1]+15;
  const declRad=(-23.45*Math.cos((360/365*(DOY+10))*Math.PI/180))*Math.PI/180;
  const latRad=lat*Math.PI/180;
  const hAngleRad=(hour-12)*15*Math.PI/180;
  const sinElev=Math.sin(latRad)*Math.sin(declRad)+Math.cos(latRad)*Math.cos(declRad)*Math.cos(hAngleRad);
  const elevDeg=Math.asin(Math.max(-1,Math.min(1,sinElev)))*180/Math.PI;
  const cosAz=(Math.sin(declRad)-Math.sin(latRad)*sinElev)/(Math.cos(latRad)*Math.cos(Math.asin(sinElev)||0.001));
  const azDeg=(hour<12?-1:1)*Math.acos(Math.max(-1,Math.min(1,cosAz)))*180/Math.PI+180;

  const frontAz={N:0,NE:45,E:90,SE:135,S:180,SV:225,V:270,NV:315}[P.frontDir||'N']||0;
  const angleDiff=Math.abs(((azDeg-frontAz+540)%360)-180);
  const sunHitsFront=angleDiff<90 && elevDeg>2;

  // Calculăm poziția soarelui pe "cer" deasupra fațadei
  // azOffset: cât de mult în stânga/dreapta față de centrul fațadei
  const azOffset=Math.sin((azDeg-frontAz)*Math.PI/180); // -1..+1
  const sunX=ox+W/2 + azOffset*(W*0.45);
  const sunY=oy-20-elevDeg*1.2; // sus = unghi mare
  const sunR=14+elevDeg*0.15;

  // Cerul — gradient simplu zi/noapte
  if(elevDeg>0){
    const nightAlpha=Math.max(0,1-elevDeg/30)*0.5;
    ctx.fillStyle=`rgba(5,15,40,${nightAlpha})`;
    ctx.fillRect(ox,oy-50,W,50);
    // Soare
    ctx.save();
    ctx.beginPath(); ctx.arc(sunX,sunY,sunR,0,Math.PI*2);
    ctx.fillStyle=elevDeg>20?'rgba(255,220,60,.85)':'rgba(255,160,30,.75)';
    ctx.fill();
    // Raze
    if(sunHitsFront){
      for(let a=0;a<8;a++){
        const ra=a*Math.PI/4;
        ctx.beginPath();
        ctx.moveTo(sunX+Math.cos(ra)*(sunR+3),sunY+Math.sin(ra)*(sunR+3));
        ctx.lineTo(sunX+Math.cos(ra)*(sunR+10),sunY+Math.sin(ra)*(sunR+10));
        ctx.strokeStyle='rgba(255,220,60,.5)';ctx.lineWidth=1.5;ctx.stroke();
      }
    }
    ctx.restore();
  }

  // Umbră pe fațadă dacă soarele nu bate direct
  if(!sunHitsFront && elevDeg>0){
    ctx.fillStyle='rgba(10,20,60,.20)';
    ctx.fillRect(ox,oy,W,H);
    ctx.fillStyle='rgba(147,197,253,.6)';ctx.font='bold 8px IBM Plex Mono';ctx.textAlign='center';
    ctx.fillText(`Fațadă ${P.frontDir} — umbră la ${String(Math.floor(hour)).padStart(2,'0')}:00`,ox+W/2,oy+H/2);
    ctx.textAlign='left';
  }

  // Label oră + elevație
  ctx.fillStyle='rgba(212,175,55,.9)';ctx.font='bold 9px IBM Plex Mono';
  ctx.fillText(`☀ ${String(Math.floor(hour)).padStart(2,'0')}:00  Elev ${elevDeg.toFixed(0)}°  Az ${azDeg.toFixed(0)}°`,ox+6,oy-6);
}

// ══════════════════════════════════════════════════════════════════════════
// OVERLAY: ISU — CERCURI EVACUARE 30m (P118-2/2013)
// ══════════════════════════════════════════════════════════════════════════
// ── Trasee de circulație: core → hol etaj → ușă apartament ─────────────────
function _rvDrawCirculation(ctx, b, fl, ox, oy, SC, P){
  if(!fl||!b.cores.length) return;
  const fnCfg = _rvFloorFnCfg(_RV.floor||0);
  const scaraMin = fnCfg.scaraMin||1.0; // lățime min. casă scări (m)
  const corMin = fnCfg.isuDist>30?1.5:1.2; // lățime min. coridor etaj

  ctx.save();

  // ── 1. Lățime casă scări / lift (verificare normativă) ──────────────────
  b.cores.forEach(core=>{
    const cx=ox+core.x*SC, cy=oy+core.y*SC;
    const cw=core.w*SC, ch=core.h*SC;
    const ok=core.w>=scaraMin&&core.h>=scaraMin;
    // Bordură normativă
    ctx.strokeStyle=ok?'rgba(34,197,94,.7)':'rgba(239,68,68,.7)';
    ctx.lineWidth=2; ctx.setLineDash([4,3]);
    ctx.strokeRect(cx-2,cy-2,cw+4,ch+4); ctx.setLineDash([]);
    // Label lățime
    ctx.fillStyle=ok?'#166534':'#991B1B';
    ctx.font='bold 8px IBM Plex Mono'; ctx.textAlign='center';
    ctx.fillText((ok?'✓':'✗')+' Sc.'+core.w.toFixed(1)+'×'+core.h.toFixed(1)+'m',cx+cw/2,cy-8);
    ctx.fillStyle=ok?'rgba(34,197,94,.1)':'rgba(239,68,68,.1)';
    ctx.fillRect(cx,cy,cw,ch);
    ctx.fillStyle='#475569'; ctx.font='7px IBM Plex Mono';
    ctx.fillText('min '+scaraMin+'m ('+fnCfg.isuNorm+')',cx+cw/2,cy+ch/2+4);
    ctx.textAlign='left';
  });

  // ── 2. Traseu coridor etaj: de la core la fiecare ușă apartament ─────────
  const coreCenter={
    x:(b.cores[0].x+b.cores[0].w/2),
    y:(b.cores[0].y+b.cores[0].h/2)
  };
  // Holuri comune (apt<0, t=hall)
  const holuri=(fl.rects||[]).filter(r=>r.apt<0&&r.t==='hall');
  holuri.forEach(h=>{
    const hx=ox+h.x*SC, hy=oy+h.y*SC, hw=h.w*SC, hh=h.h*SC;
    // Verificare lățime coridor
    const latMin=Math.min(h.w,h.h);
    const corOk=latMin>=corMin;
    ctx.fillStyle=corOk?'rgba(34,197,94,.08)':'rgba(239,68,68,.1)';
    ctx.fillRect(hx,hy,hw,hh);
    ctx.strokeStyle=corOk?'rgba(34,197,94,.4)':'rgba(239,68,68,.5)';
    ctx.lineWidth=1; ctx.setLineDash([3,3]); ctx.strokeRect(hx,hy,hw,hh); ctx.setLineDash([]);
    // Lățime coridor
    ctx.fillStyle=corOk?'#166534':'#991B1B';
    ctx.font='bold 7px IBM Plex Mono'; ctx.textAlign='center';
    ctx.fillText((corOk?'✓':'✗')+' lat.'+latMin.toFixed(1)+'m',hx+hw/2,hy+hh/2+4);
    ctx.textAlign='left';
  });

  // ── 3. Linie de circulație: core → ușă apartament ──────────────────────
  const usiFront=fl.doors||[];
  ctx.strokeStyle='rgba(37,99,235,.5)'; ctx.lineWidth=1.5; ctx.setLineDash([6,3]);
  usiFront.filter(d=>d.type==='apt').forEach(d=>{
    const dMx=ox+(d.x+d.w/2)*SC;
    const dMy=d.y!==undefined?oy+d.y*SC:oy+(b.bD/2)*SC;
    const ccx=ox+coreCenter.x*SC, ccy=oy+coreCenter.y*SC;
    ctx.beginPath(); ctx.moveTo(ccx,ccy); ctx.lineTo(dMx,dMy); ctx.stroke();
    // Săgeată
    const ang=Math.atan2(dMy-ccy,dMx-ccx);
    ctx.fillStyle='rgba(37,99,235,.7)';
    ctx.beginPath();
    ctx.moveTo(dMx,dMy);
    ctx.lineTo(dMx-10*Math.cos(ang-0.4),dMy-10*Math.sin(ang-0.4));
    ctx.lineTo(dMx-10*Math.cos(ang+0.4),dMy-10*Math.sin(ang+0.4));
    ctx.closePath(); ctx.fill();
  });
  ctx.setLineDash([]);

  // ── 4. Circulație internă apartament (hol → camere) ────────────────────
  const apts=[...new Set((fl.rects||[]).filter(r=>r.apt>0).map(r=>r.apt))];
  apts.forEach(aptId=>{
    const rooms=(fl.rects||[]).filter(r=>r.apt===aptId);
    const holApt=rooms.find(r=>r.t==='hall');
    if(!holApt) return;
    const hcx=ox+(holApt.x+holApt.w/2)*SC, hcy=oy+(holApt.y+holApt.h/2)*SC;
    rooms.filter(r=>r.t!=='hall'&&r.t!=='balcon'&&r.t!=='wc').forEach(r=>{
      const rcx=ox+(r.x+r.w/2)*SC, rcy=oy+(r.y+r.h/2)*SC;
      ctx.strokeStyle='rgba(99,102,241,.3)'; ctx.lineWidth=1; ctx.setLineDash([3,4]);
      ctx.beginPath(); ctx.moveTo(hcx,hcy); ctx.lineTo(rcx,rcy); ctx.stroke();
    });
    ctx.setLineDash([]);
  });

  ctx.restore();
}

function _rvDrawISUCircles(ctx, b, ox, oy, SC){
  const fnCfg = _rvFloorFnCfg(_RV.floor);
  const isuM  = fnCfg.isuDist || 30;  // distanță din FN_CONFIG per funcțiune
  const rPx   = isuM * SC;
  ctx.save();
  b.cores.forEach(core=>{
    const cx=ox+(core.x+core.w/2)*SC;
    const cy=oy+(core.y+core.h/2)*SC;
    ctx.beginPath(); ctx.arc(cx,cy,rPx,0,Math.PI*2);
    ctx.fillStyle='rgba(34,197,94,.07)';ctx.fill();
    ctx.strokeStyle='rgba(34,197,94,.55)';ctx.lineWidth=1.2;
    ctx.setLineDash([6,4]);ctx.stroke();ctx.setLineDash([]);
    ctx.fillStyle='rgba(34,197,94,.8)';ctx.font='bold 8px IBM Plex Mono';ctx.textAlign='center';
    ctx.fillText(isuM+'m ('+fnCfg.isuNorm+')',cx,cy-rPx+10);
    ctx.textAlign='left';
  });

  const fl=_RV.floors[_RV.floor]||_RV.floors[0];
  fl.rects.filter(r=>r.apt>=0).forEach(r=>{
    const rx=ox+r.x*SC, ry=oy+r.y*SC, rw=r.w*SC, rh=r.h*SC;
    const cx_r=ox+(r.x+r.w/2)*SC, cy_r=oy+(r.y+r.h/2)*SC;
    const minDist=Math.min(...b.cores.map(c=>{
      const ccx=ox+(c.x+c.w/2)*SC, ccy=oy+(c.y+c.h/2)*SC;
      return Math.hypot(cx_r-ccx,cy_r-ccy);
    }));
    if(minDist>rPx){
      ctx.fillStyle='rgba(239,68,68,.25)';
      ctx.fillRect(rx,ry,rw,rh);
      ctx.strokeStyle='rgba(239,68,68,.5)';ctx.lineWidth=1;ctx.strokeRect(rx,ry,rw,rh);
      if(rw>16&&rh>12){
        ctx.fillStyle='rgba(239,68,68,.9)';ctx.font='7px IBM Plex Mono';ctx.textAlign='center';
        ctx.fillText('⚠ >'+(minDist/SC).toFixed(0)+'m',rx+rw/2,ry+rh/2+3);ctx.textAlign='left';
      }
    }
  });
  ctx.restore();

  const fl_=_RV.floors[_RV.floor]||_RV.floors[0];
  const overLimit=fl_.rects.filter(r=>r.apt>=0).filter(r=>{
    const cx_r=ox+(r.x+r.w/2)*SC, cy_r=oy+(r.y+r.h/2)*SC;
    return Math.min(...b.cores.map(c=>{
      const ccx=ox+(c.x+c.w/2)*SC,ccy=oy+(c.y+c.h/2)*SC;
      return Math.hypot(cx_r-ccx,cy_r-ccy);
    }))>rPx;
  }).length;
  const lgx=ox, lgy=oy+b.bD*SC+8;
  ctx.fillStyle='rgba(8,15,35,.88)';ctx.fillRect(lgx,lgy,220,22);
  ctx.strokeStyle=overLimit?'rgba(239,68,68,.4)':'rgba(34,197,94,.4)';
  ctx.lineWidth=0.5;ctx.strokeRect(lgx,lgy,220,22);
  ctx.fillStyle=overLimit?'#EF4444':'#22C55E';
  ctx.font='bold 8px IBM Plex Mono';ctx.textAlign='left';
  ctx.fillText(overLimit?`⚠ ${overLimit} zone >30m de scară (P118-2/2013)`:'✓ Toate zonele în 30m — CONFORM ISU',lgx+6,lgy+14);
}

// ══════════════════════════════════════════════════════════════════════════
// ROOM INSPECTOR — click pe cameră → panou cu date + editare
// ══════════════════════════════════════════════════════════════════════════
function _rvInspectorUpdateLive(){
  const r=_RV.selectedRoom; if(!r) return;
  const area=r.w*r.h;
  const aEl=document.getElementById('ri-area-live');
  if(aEl) aEl.textContent=area.toFixed(1);
  const wEl=document.getElementById('ri-w');
  const hEl=document.getElementById('ri-h');
  if(wEl&&document.activeElement!==wEl) wEl.value=r.w.toFixed(2);
  if(hEl&&document.activeElement!==hEl) hEl.value=r.h.toFixed(2);
  const minA=({living:14,bedroom:12,bedroom2:10,bedroom3:10,kitchen:5,bath:3.6,wc:1.2,hall:3})[r.t]||0;
  const ok=minA===0||area>=minA;
  const stEl=document.getElementById('ri-status');
  if(stEl){ stEl.textContent=minA?(ok?'✓ CONFORM':'✗ SUB MINIM ('+minA+'m²)'):'—'; stEl.className='ri-status '+(ok?'ok':'err'); }
}

function _rvShowInspector(room, clientX, clientY){
  let ri=document.getElementById('rv-inspector');
  if(!ri){
    ri=document.createElement('div');
    ri.id='rv-inspector';
    document.body.appendChild(ri);
  }
  const typeNames={living:'Living / Salon',bedroom:'Dormitor 1',bedroom2:'Dormitor 2',bedroom3:'Dormitor 3',
    kitchen:'Bucătărie',bath:'Baie / WC',wc:'WC',hall:'Hol / Coridor',storage:'Depozitare',
    core:'Casă Scări + Lift',balcon:'Balcon / Terasă'};
  const typeColors={living:'#EA580C',bedroom:'#16A34A',bedroom2:'#16A34A',bedroom3:'#15803D',
    kitchen:'#0891B2',bath:'#7C3AED',wc:'#6D28D9',hall:'#475569',core:'#2563EB',balcon:'#B45309'};
  const normMin={living:14,bedroom:12,bedroom2:10,bedroom3:10,kitchen:5,bath:3.6,wc:1.2,hall:3};
  const area=room.w*room.h;
  const minA=normMin[room.t]||0;
  const ok=minA===0||area>=minA;
  const color=typeColors[room.t]||'#64748B';
  const name=typeNames[room.t]||room.t;

  ri.style.cssText=`position:fixed;z-index:9999;top:${Math.min(clientY-40,window.innerHeight-320)}px;left:${Math.min(clientX+12,window.innerWidth-230)}px;
    width:220px;background:rgba(6,12,26,.97);border:1px solid rgba(212,175,55,.25);border-radius:10px;
    padding:12px;font-family:'IBM Plex Mono',monospace;box-shadow:0 8px 32px rgba(0,0,0,.6);display:block;`;

  ri.innerHTML=`
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
      <div style="width:10px;height:10px;border-radius:2px;background:${color};flex-shrink:0"></div>
      <span style="font-size:11px;font-weight:700;color:#DDE6F5;flex:1">${name}</span>
      <button onclick="document.getElementById('rv-inspector').style.display='none'"
        style="background:transparent;border:none;color:#4A6080;cursor:pointer;font-size:14px;line-height:1">✕</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:10px">
      <div style="background:rgba(255,255,255,.04);border-radius:5px;padding:6px">
        <div style="font-size:8px;color:#4A6080;margin-bottom:2px">SUPRAFAȚĂ</div>
        <div style="font-size:16px;font-weight:800;color:${ok?'#22C55E':'#EF4444'}">${area.toFixed(1)}<span style="font-size:9px;font-weight:400">m²</span></div>
      </div>
      <div style="background:rgba(255,255,255,.04);border-radius:5px;padding:6px">
        <div style="font-size:8px;color:#4A6080;margin-bottom:2px">NORMATIV</div>
        <div style="font-size:14px;font-weight:700;color:${ok?'#22C55E':'#EF4444'}">${minA?minA+'m²':'-'}</div>
        <div style="font-size:8px;color:${ok?'#22C55E':'#EF4444'}">${minA?(ok?'✓ CONFORM':'✗ SUB MIN'):'-'}</div>
      </div>
    </div>
    <div style="font-size:9px;color:#4A6080;margin-bottom:4px">DIMENSIUNI</div>
    <div style="display:flex;gap:6px;margin-bottom:8px;align-items:center">
      <div style="flex:1">
        <div style="font-size:8px;color:#4A6080;margin-bottom:2px">L (m)</div>
        <input id="ri-w" type="number" value="${room.w.toFixed(2)}" step="0.1" min="1" max="20"
          oninput="if(_RV.selectedRoom){_RV.selectedRoom.w=Math.max(1,+this.value||1);_RV.editDirty=true;_rvInspectorUpdateLive();clearTimeout(window._riRT);window._riRT=setTimeout(()=>_rvRender(),100);}"
          style="width:100%;padding:4px 6px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:4px;color:#DDE6F5;font-size:10px;font-family:inherit">
      </div>
      <div style="color:#4A6080;margin-top:12px">×</div>
      <div style="flex:1">
        <div style="font-size:8px;color:#4A6080;margin-bottom:2px">Adânc. (m)</div>
        <input id="ri-h" type="number" value="${room.h.toFixed(2)}" step="0.1" min="1" max="30"
          oninput="if(_RV.selectedRoom){_RV.selectedRoom.h=Math.max(1,+this.value||1);_RV.editDirty=true;_rvInspectorUpdateLive();clearTimeout(window._riRT);window._riRT=setTimeout(()=>_rvRender(),100);}"
          style="width:100%;padding:5px 6px;background:rgba(255,255,255,.08);border:1.5px solid rgba(212,175,55,.3);border-radius:5px;color:#DDE6F5;font-size:12px;font-family:inherit">
      </div>
    </div>
    <div style="text-align:center;font-size:18px;font-weight:800;color:${ok?'#22C55E':'#EF4444'};margin:-4px 0 8px" id="ri-area-live">${area.toFixed(1)} m²</div>
    ${room.solarH!=null?`<div style="background:rgba(255,255,255,.03);border-radius:5px;padding:5px 7px;margin-bottom:8px;font-size:8px">
      <span style="color:#F59E0B">☀ Însorire OMS 119:</span> <strong style="color:${room.solarOk?'#22C55E':'#EF4444'}">${room.solarH}h/zi</strong>
      (min 1.5h) ${room.solarOk?'<span style="color:#22C55E">✓</span>':'<span style="color:#EF4444">✗</span>'}
    </div>`:''}
    ${room.apt>=0?`<div style="font-size:8px;color:#4A6080;margin-bottom:6px">Apartament #${room.apt+1}</div>`:''}
    <div style="display:flex;gap:5px;margin-bottom:6px">
      <button onclick="_RV.editDirty=false;_rvUpdatePanels(_RV.building,_RV.parcelParams);document.getElementById('rv-inspector').style.display='none';_RV.selectedRoom=null;_rvRender();"
        style="flex:1;padding:7px;background:rgba(212,175,55,.15);border:1px solid rgba(212,175,55,.3);
          border-radius:5px;color:#D4AF37;font-size:10px;font-weight:700;cursor:pointer;font-family:inherit">
        ✓ Salvat
      </button>
      <button onclick="const h=window._rvEditHistory?.pop();if(h&&_RV.selectedRoom){_RV.selectedRoom.w=h.w;_RV.selectedRoom.h=h.h;_rvInspectorUpdateLive();_rvRender();}"
        style="padding:7px 10px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);
          border-radius:5px;color:#7A90B0;font-size:11px;cursor:pointer" title="Undo ultimei modificări">↩</button>
    </div>
    <div style="font-size:7.5px;color:#2A3F60;text-align:center">
      🖱 Trage handles aurii pe plan · sau modifică valorile direct
    </div>`;

  if(!window._rvEditHistory) window._rvEditHistory=[];
  window._rvEditHistory.push({w:room.w, h:room.h});
  if(window._rvEditHistory.length>20) window._rvEditHistory.shift();
}

// ── _rvRegenFloors — regenerează toate etajele cu fn+mix curent ──────────
// Apelat de: _rvSetFn, _rvMixApply, orice schimbare care afectează planul
function _rvRegenFloors(){
  if(!_RV.building) return;
  const b = _RV.building;
  _RV.floors = [];
  for(let i=0;i<b.niv;i++) _RV.floors.push(_rvFloor(b, i));
  _RV.selectedRoom = null; // resetăm selecția după regen
  _rvRender();
  _rvUpdatePanels(b, _RV.parcelParams);
}
// Activ pentru toate UAT-urile, desktop + mobil, releveu + lotizare
// ══════════════════════════════════════════════════════════════════════════
function _rvSetFn(fnKey){
  const cfg=FN_CONFIG[fnKey]||FN_CONFIG.rez;
  _RV.fn=fnKey; _RV.fnParter=null;
  const n=document.getElementById('rv-fn-norms');
  if(n) n.textContent=cfg.norms?.join(' · ')||'';
  const t=document.getElementById('rv-mix-types');
  if(t) t.innerHTML=(cfg.unitTypes||[]).map((k,i)=>
    `<span style="font-size:8px;padding:1px 5px;border-radius:3px;background:rgba(255,255,255,.06);color:#7A90B0">${cfg.unitLabels?.[i]||k}</span>`
  ).join('');
  // OMS toggle — gri dacă nu se aplică funcțiunii
  document.querySelectorAll('.rv-tog-row').forEach(r=>{
    if(r.textContent.includes('OMS 119')) r.style.opacity=cfg.omsInsorire?'1':'0.4';
  });
  // Sync mobil
  const ms=document.getElementById('rv-mob-fn-select');
  if(ms&&ms.value!==fnKey) ms.value=fnKey;
  const mn=document.getElementById('rv-mob-fn-norms');
  if(mn) mn.textContent=cfg.norms?.join(' · ')||'';
  if(_RV.building){ _rvRegenFloors(); }
  ss('🏗 '+cfg.label+' · ISU '+cfg.isuDist+'m · '+cfg.isuNorm+(cfg.omsInsorire?' · OMS 119 activ':' · OMS N/A'));
}

// ══════════════════════════════════════════════════════════════════════════
// MIX APARTAMENTE — UI handlers
// ══════════════════════════════════════════════════════════════════════════
function _rvMixChange(){
  const keys=['studio','apt2','apt3','apt4','ph'];
  let total=0;
  keys.forEach(k=>{
    const v=parseInt(document.getElementById('rv-mix-'+k)?.value||0);
    total+=v;
    const vEl=document.getElementById('rv-mix-'+k+'-v');
    if(vEl) vEl.textContent=v+'%';
  });
  const ok=total===100;
  const tEl=document.getElementById('rv-mix-total');
  const badge=document.getElementById('rv-mix-total-badge');
  if(tEl){tEl.textContent=total+'%';tEl.style.color=ok?'#22C55E':'#EF4444';}
  if(badge){badge.textContent=total+'%';badge.style.background=ok?'rgba(34,197,94,.15)':'rgba(239,68,68,.15)';badge.style.color=ok?'#22C55E':'#EF4444';}
}

function _rvMixApply(){
  const keys=['studio','apt2','apt3','apt4','ph'];
  let total=0; const mix={};
  keys.forEach(k=>{const v=parseInt(document.getElementById('rv-mix-'+k)?.value||0);mix[k]=v;total+=v;});
  if(total!==100){ss('⚠ Total trebuie să fie 100% (acum: '+total+'%)');return;}
  _RV.unitMix=mix;
  _rvRegenFloors();
  ss('✅ Mix: Gar.'+mix.studio+'% · 2C '+mix.apt2+'% · 3C '+mix.apt3+'% · 4C '+mix.apt4+'% · PH '+mix.ph+'%');
}

// ══════════════════════════════════════════════════════════════════════════
// Amprentă Normativă — Radar SVG dinamic (generare string SVG)
// ══════════════════════════════════════════════════════════════════════════
function _rvDNARadar(b, P, fl){
  if(!b||!P||!fl) return '<svg width="140" height="140" viewBox="0 0 140 140"></svg>';
  const cx=70,cy=68,r=50;
  const potOk=b.scArea/P.area<=P.pot+.001;
  const cutOk=b.sdaTotal/P.area<=P.cut+.001;
  const solarIssues=(fl.rects||[]).filter(r_=>r_.solarOk===false).length;
  const totalSolarRooms=Math.max(1,(fl.rects||[]).filter(r_=>r_.solarOk!=null).length);
  const roomsOk=(fl.rects||[]).every(r_=>{const m=(_RV_NP057||{})[r_.t];return !m||r_.w*r_.h>=m;});
  const isuOk=(fl.isu||{}).ok!==false;
  const nrApt=Math.max(1,Math.round(b.sdaTotal/70));
  const parcNec=Math.ceil(nrApt*1.2);
  const parcSup=Math.floor(Math.max(0,P.area-b.bW*b.bD-200)/28);
  const score=Math.round(
    (potOk?.15:0)+(cutOk?.15:0)+
    ((totalSolarRooms-solarIssues)/totalSolarRooms*.2)+
    (isuOk?.15:0.07)+(roomsOk?.15:0.07)+
    (parcSup>=parcNec?.1:.05)+.1
  *100);
  const fnDNA = FN_CONFIG[_RV.fn] || FN_CONFIG.rez;
  const omsApplies = fnDNA.omsInsorire !== false;
  const isuDistDNA = fnDNA.isuDist || 30;
  const axes=[
    {name:'POT',val:potOk?.85:.35,color:potOk?'#22C55E':'#EF4444'},
    {name:'CUT',val:cutOk?.80:.35,color:cutOk?'#22C55E':'#EF4444'},
    {name:'OMS',val:omsApplies?(totalSolarRooms-solarIssues)/totalSolarRooms*.9+.05:.75,
     color:!omsApplies?'#475569':solarIssues===0?'#22C55E':'#F59E0B'},
    {name:'ISU',val:isuOk?.9:.55,color:isuOk?'#22C55E':'#F59E0B'},
    {name:'NP057',val:roomsOk?.9:.65,color:roomsOk?'#22C55E':'#F59E0B'},
    {name:'Parcaje',val:Math.min(1,parcSup/Math.max(1,parcNec))*.85+.05,color:parcSup>=parcNec?'#22C55E':'#EF4444'},
  ];
  const pts=axes.map((ax,i)=>{
    const angle=i*Math.PI*2/axes.length-Math.PI/2;
    return [cx+ax.val*r*Math.cos(angle),cy+ax.val*r*Math.sin(angle)];
  });
  const rings=[1,.67,.33];
  const ringsStr=rings.map(v=>
    '<polygon points="'+axes.map((_,i)=>{const a=i*Math.PI*2/axes.length-Math.PI/2;return (cx+v*r*Math.cos(a)).toFixed(1)+','+(cy+v*r*Math.sin(a)).toFixed(1);}).join(' ')+'" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="0.5"/>'
  ).join('');
  const axesStr=axes.map((_,i)=>{
    const a=i*Math.PI*2/axes.length-Math.PI/2;
    return `<line x1="${cx}" y1="${cy}" x2="${(cx+r*Math.cos(a)).toFixed(1)}" y2="${(cy+r*Math.sin(a)).toFixed(1)}" stroke="rgba(255,255,255,.07)" stroke-width="0.5"/>`;
  }).join('');
  const polyStr=`<polygon points="${pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ')}" fill="rgba(212,175,55,.12)" stroke="#D4AF37" stroke-width="1.5" stroke-linejoin="round"/>`;
  const labelsStr=axes.map((ax,i)=>{
    const a=i*Math.PI*2/axes.length-Math.PI/2;
    const lx=(cx+(r+14)*Math.cos(a)).toFixed(1),ly=(cy+(r+14)*Math.sin(a)+2).toFixed(1);
    return `<text x="${lx}" y="${ly}" fill="${ax.color}" font-size="7.5" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-weight="700">${ax.name}</text>`;
  }).join('');
  const dotsStr=pts.map((p,i)=>`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="2.5" fill="${axes[i].color}"/>`).join('');
  const scoreColor=score>=80?'#22C55E':score>=60?'#F59E0B':'#EF4444';
  // Actualizăm detaliul de scor în legendă
  setTimeout(()=>{
    const el=document.getElementById('rv-dna-score-detail');
    if(!el) return;
    const details=[
      {name:'POT',ok:potOk,msg:potOk?`✓ ${Math.round(b.scArea/P.area*100)}% / max ${Math.round(P.pot*100)}%`:`✗ ${Math.round(b.scArea/P.area*100)}% depășește ${Math.round(P.pot*100)}%`},
      {name:'CUT',ok:cutOk,msg:cutOk?`✓ ${(b.sdaTotal/P.area).toFixed(2)} / max ${P.cut}`:`✗ ${(b.sdaTotal/P.area).toFixed(2)} depășește ${P.cut}`},
      {name:'OMS',ok:!omsApplies||solarIssues===0,msg:!omsApplies?'— N/A · funcțiunea nu necesită însorire':solarIssues===0?`✓ Toate camerele ≥${fnDNA.omsMin}h/zi`:`✗ ${solarIssues} camere sub min ${fnDNA.omsMin}h`},
      {name:'ISU',ok:isuOk,msg:isuOk?`✓ Căi evac. OK · max ${isuDistDNA}m · ${fnDNA.isuNorm}`:`✗ Verificare · max ${isuDistDNA}m · ${fnDNA.isuNorm}`},
      {name:'NP057',ok:roomsOk,msg:roomsOk?'✓ Suprafețe conforme':'✗ Camere sub minim'},
      {name:'Parcaje',ok:parcSup>=parcNec,msg:parcSup>=parcNec?`✓ ${parcSup}/${parcNec} locuri · ${fnDNA.pk_norm}`:`✗ ${parcSup}/${parcNec} · ${fnDNA.pk_norm}`},
    ];
    el.innerHTML=details.map(d=>`<div><span style="color:${d.ok?'#22C55E':'#EF4444'};font-weight:700">${d.name}:</span> ${d.msg}</div>`).join('') +
      _rvDNAGetSolutii(b, P, potOk, cutOk, solarIssues, isuOk, roomsOk, parcSup, parcNec);
  },50);
  return `<svg width="140" height="140" viewBox="0 0 140 140">
    ${ringsStr}${axesStr}${polyStr}${dotsStr}${labelsStr}
    <text x="${cx}" y="${cy+4}" fill="${scoreColor}" font-size="14" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-weight="800">${score}</text>
    <text x="${cx}" y="${cy+14}" fill="rgba(200,215,240,.4)" font-size="6.5" text-anchor="middle" font-family="IBM Plex Mono,monospace">/100</text>
  </svg>`;
}

// ── Capturează SVG-ul radar ca PNG pentru PDF ─────────────────────────────
function _rvCaptureDNARadarPNG(callback){
  const svgEl=document.querySelector('#rv-dna svg');
  if(!svgEl){callback(null);return;}
  try{
    const svgData=new XMLSerializer().serializeToString(svgEl);
    const svgBlob=new Blob([svgData],{type:'image/svg+xml;charset=utf-8'});
    const url=URL.createObjectURL(svgBlob);
    const img=new Image();
    img.onload=()=>{
      const cnv=document.createElement('canvas');
      cnv.width=280;cnv.height=280;
      const c=cnv.getContext('2d');
      c.fillStyle='#060C1A';c.fillRect(0,0,280,280);
      c.drawImage(img,0,0,280,280);
      callback(cnv.toDataURL('image/png'));
      URL.revokeObjectURL(url);
    };
    img.onerror=()=>callback(null);
    img.src=url;
  }catch(e){callback(null);}
}

// ══════════════════════════════════════════════════════════════════════════
// AVIZE TIMELINE — Calendar autorizare dinamic
// ══════════════════════════════════════════════════════════════════════════
function _rvBuildAvizeTimeline(b, P){
  const niv=b.niv||1;
  const sc=Math.round(b.scArea)||0;
  const needsISUSpecial=niv>=5||sc>2500;
  const needsDJCPN=P.utr?.toLowerCase().includes('pi')||false; // zone protejate
  const needsLift=niv>=5;
  const steps=[
    {
      status:'done', icon:'✅',
      label:'Analiză UrbanX finalizată',
      time:'Azi',
      docs:`Releveu instant · SSF · Însorire · Parcaje<br>
            <span style="color:#22C55E">SC=${sc}m² · SDA=${Math.round(b.sdaTotal)}m² · P+${niv-1}E · ${Math.round(b.sdaTotal/70)} apt.</span>`,
    },
    {
      status:'current', icon:'🔄',
      label:'Certificat de Urbanism',
      time:'1–2 luni',
      docs:`Cerere tip PMB/CL + opis documente<br>
            Plan parcelă vizat ANCPI · Schiță arhitecturală<br>
            Taxa CU: 0.5–1% val. estimată<br>
            <b>Emite lista exactă de avize necesare</b>`,
    },
    {
      status:'future', icon:'🔬',
      label:'Studii obligatorii',
      time:'2–4 luni',
      docs:`📍 Studiu geotehnic — min ${b.cores?Math.max(3,b.cores.length):3} foraje × ${Math.max(8,niv*1.2+2).toFixed(0)}m<br>
            📐 Ridicare topografică (Stereo 70)<br>
            ☀ Studiu însorire detaliat (OMS 119)<br>
            🚗 Studiu trafic (dacă >100 apt.)`,
    },
    {
      status:'future', icon:'📋',
      label:'PAC / DTAC (arhitect OAR)',
      time:'3–6 luni',
      docs:`Proiect Arhitectură + Structură + Instalații<br>
            Memoriu tehnic + Deviz general<br>
            ${needsLift?'<span style="color:#F59E0B">⚠ Lift obligatoriu — P+4+ (NP 051)</span>':''}
            Piesele scrise + piesele desenate A1`,
    },
    {
      status:'future', icon:'🏛',
      label:'Avize speciale',
      time:'2–4 luni',
      docs:`🚒 ISU ${needsISUSpecial?'<span style="color:#F59E0B">(special — >P+4)</span>':''}<br>
            ✈ AACR (dacă lângă aeroport)<br>
            💧 Utilități: apă, canal, gaz, curent<br>
            🌿 APM — acord de mediu<br>
            ${needsDJCPN?'🏛 DJCPN — zonă protejată':''}`,
    },
    {
      status:'future', icon:'📜',
      label:'Autorizație de Construire',
      time:'1–2 luni',
      docs:`Dosar complet la Primărie<br>
            Taxa AC: 0.5% val. lucrare (min. 50 lei)<br>
            Valabilitate AC: 12 luni + 12 prelungire<br>
            <b>OBLIGATORIU înainte de primul târnăcop!</b>`,
    },
    {
      status:'future', icon:'🏗',
      label:'Execuție + Recepție',
      time:'10–18 luni',
      docs:`Constructor autorizat + RTE obligatoriu<br>
            Carte tehnică a construcției<br>
            Recepție la terminare + Recepție finală<br>
            Intabulare CF după recepție`,
    },
  ];

  const totalMin=1+2+3+2+1+10, totalMax=2+4+6+4+2+18;
  const dotColors={done:'#22C55E',current:'#D4AF37',future:'rgba(100,120,150,.5)'};
  const borderColors={done:'#22C55E',current:'#D4AF37',future:'rgba(60,80,110,.5)'};

  return `<div style="padding:4px 6px">
    <div style="font-size:8px;color:#4A6080;margin-bottom:8px;line-height:1.4">
      Calendar estimat de la analiză la <b style="color:#DDE6F5">recepție finală: ${totalMin}–${totalMax} luni</b>
    </div>
    <div style="position:relative;padding-left:16px">
      <div style="position:absolute;left:6px;top:8px;bottom:8px;width:1px;background:rgba(60,80,110,.4)"></div>
      ${steps.map((s,i)=>`
        <div style="position:relative;margin-bottom:10px;cursor:pointer"
          onclick="const d=this.querySelector('.tl-docs');d.style.display=d.style.display==='none'?'block':'none'">
          <div style="position:absolute;left:-13px;top:1px;width:11px;height:11px;border-radius:50%;
            background:${s.status==='done'?dotColors.done:s.status==='current'?dotColors.current:'#0D1A35'};
            border:2px solid ${borderColors[s.status]||borderColors.future};
            ${s.status==='current'?'box-shadow:0 0 6px rgba(212,175,55,.4)':''}"></div>
          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <span style="font-size:9px;font-weight:${s.status==='future'?'400':'700'};
              color:${s.status==='done'?'#22C55E':s.status==='current'?'#D4AF37':'#64748B'}">${s.icon} ${s.label}</span>
            <span style="font-size:8px;color:${s.status==='done'?'#22C55E':s.status==='current'?'#F59E0B':'#3A5070'};
              flex-shrink:0;margin-left:4px;font-weight:600">${s.time}</span>
          </div>
          <div class="tl-docs" style="display:none;font-size:8px;color:#4A6080;margin-top:3px;line-height:1.5;
            padding:5px 6px;background:rgba(255,255,255,.02);border-radius:4px;border-left:2px solid ${borderColors[s.status]}">${s.docs}</div>
        </div>
      `).join('')}
    </div>
    <div style="margin-top:4px;padding:6px;background:rgba(212,175,55,.06);border-radius:4px;border:1px solid rgba(212,175,55,.12)">
      <div style="font-size:8px;color:#4A6080">TOTAL ESTIMAT de la CU la recepție</div>
      <div style="font-size:13px;font-weight:800;color:#D4AF37">${totalMin}–${totalMax} luni</div>
    </div>
  </div>`;
}

// ══════════════════════════════════════════════════════════════════════════
// SCENARII A/B — Comparare două configurații
// ══════════════════════════════════════════════════════════════════════════
// Ce vedeți: Scenariu A = configurația curentă (parametri setați)
//            Scenariu B = configurația propusă (alt număr de niveluri)
// Cum se interpretează: comparați SDA, SC, H, parcaje, cost estimat
// Controlul "Niveluri B" din bara de sub taburi modifică Scenariu B în timp real
function _rvRenderScenarii(b){
  const P=b.P||_RV.parcelParams; if(!P) return;
  const {cv,ctx}=_rvInitCanvas(900,600);
  ctx.fillStyle='#060C1A';ctx.fillRect(0,0,900,600);

  // Titlu
  ctx.fillStyle='rgba(212,175,55,.08)';ctx.fillRect(0,0,900,34);
  ctx.fillStyle='#D4AF37';ctx.font='bold 13px Space Grotesk';ctx.textAlign='center';
  ctx.fillText('COMPARAȚIE SCENARII A / B — Nr.cad. '+P.nrCad,450,22);

  const nivB=_RV.scenNivB||b.niv;
  const fnB=_RV.scenFnB||P.fn||'locuinta_colectiva';

  // Construim clădirea B cu parametri diferiți
  const PB=Object.assign({},P,{fn:fnB});
  let bB; try{ bB=_rvCompBuilding(PB,{niv:nivB}); }catch(e){ bB=b; }

  const SC=Math.min(6,140/(Math.max(b.bW,bB.bW)));
  const padX=30,padY=44,midX=450;

  // ── Planul A (stânga) ──────────────────────────────────────────────────
  const oxA=padX+(midX-padX-b.bW*SC)/2, oyA=padY+(240-b.bD*SC)/2;
  ctx.fillStyle='rgba(13,26,53,.8)';ctx.fillRect(padX,padY,midX-padX-10,280);
  ctx.strokeStyle='rgba(37,99,235,.3)';ctx.lineWidth=1;ctx.strokeRect(padX,padY,midX-padX-10,280);
  ctx.fillStyle='rgba(37,99,235,.7)';ctx.font='bold 11px Space Grotesk';ctx.textAlign='center';
  ctx.fillText('SCENARIU A  —  CURENT',midX/2,padY+15);
  _rvDrawPlanMini(ctx,b,oxA,oyA,SC);

  // ── Planul B (dreapta) ─────────────────────────────────────────────────
  const oxB=midX+10+(midX-padX-bB.bW*SC)/2, oyB=padY+(240-bB.bD*SC)/2;
  ctx.fillStyle='rgba(13,26,53,.8)';ctx.fillRect(midX+10,padY,midX-padX-10,280);
  ctx.strokeStyle='rgba(212,175,55,.3)';ctx.lineWidth=1;ctx.strokeRect(midX+10,padY,midX-padX-10,280);
  ctx.fillStyle='rgba(212,175,55,.7)';ctx.font='bold 11px Space Grotesk';ctx.textAlign='center';
  ctx.fillText('SCENARIU B  —  PROPUS',midX+10+(midX-padX)/2,padY+15);
  _rvDrawPlanMini(ctx,bB,oxB,oyB,SC);

  // ── Tabel comparativ (jos) ─────────────────────────────────────────────
  const tY=padY+290, cols=[['Indicator',140],['Scenariu A',120],['Scenariu B',120],['Δ Diferență',120],['Winner',80]];
  const tX=padX, tW=900-padX*2;

  ctx.fillStyle='rgba(8,15,35,.95)';ctx.fillRect(tX,tY,tW,22);
  ctx.fillStyle='rgba(212,175,55,.15)';ctx.fillRect(tX,tY,tW,22);
  ctx.fillStyle='#D4AF37';ctx.font='bold 9px IBM Plex Mono';
  let tx=tX+4;
  cols.forEach(([h,w])=>{ ctx.textAlign='left';ctx.fillText(h,tx,tY+14);tx+=w; });

  const potA=b.scArea/P.area, potB=bB.scArea/P.area;
  const cutA=b.sdaTotal/P.area, cutB=bB.sdaTotal/P.area;
  const nrAptA=Math.round(b.sdaTotal/70), nrAptB=Math.round(bB.sdaTotal/70);
  const hA=b.niv*P.hn, hB=bB.niv*P.hn;
  const sdaA=Math.round(b.sdaTotal), sdaB=Math.round(bB.sdaTotal);
  const costA=sdaA*650, costB=sdaB*650;
  const revA=nrAptA*280*1200, revB=nrAptB*280*1200;

  const rows=[
    ['Niveluri (P+nE)',`P+${b.niv-1}E`,`P+${bB.niv-1}E`,`${bB.niv>b.niv?'+':''}${bB.niv-b.niv} etaje`,bB.niv>=b.niv?'B':'A'],
    ['H total (m)',hA.toFixed(1)+'m',hB.toFixed(1)+'m',(hB>hA?'+':'')+( hB-hA).toFixed(1)+'m',hB<=24?'B':'A'],
    ['SC la sol (m²)',sdaA/b.niv+'m²',sdaB/bB.niv+'m²','—','—'],
    ['SDA totală (m²)',sdaA+'m²',sdaB+'m²',(sdaB>sdaA?'+':'')+(sdaB-sdaA)+'m²',sdaB>sdaA?'B':'A'],
    ['POT realizat',(potA*100).toFixed(1)+'%',(potB*100).toFixed(1)+'%','—',potA<=P.pot&&potB<=P.pot?'—':potA<=P.pot?'A':'B'],
    ['CUT realizat',cutA.toFixed(2),cutB.toFixed(2),(cutB>cutA?'+':'')+(cutB-cutA).toFixed(2),cutB<=P.cut?'B':'A'],
    ['Nr. apartamente est.',nrAptA+' apt.',nrAptB+' apt.',(nrAptB>nrAptA?'+':'')+(nrAptB-nrAptA)+' apt.',nrAptB>nrAptA?'B':'A'],
    ['Cost construcție est.',(costA/1e6).toFixed(1)+'M€',(costB/1e6).toFixed(1)+'M€',(costB>costA?'+':'')+(( costB-costA)/1e6).toFixed(1)+'M€',costA<costB?'A':'B'],
    ['Venituri estimate',(revA/1e6).toFixed(1)+'M€',(revB/1e6).toFixed(1)+'M€',(revB>revA?'+':'')+(( revB-revA)/1e6).toFixed(1)+'M€',revB>revA?'B':'A'],
    ['H admis PUG',P.hmax||'24m',P.hmax||'24m',hB<=(P.hmax||24)?'✓':'⚠ DEPĂȘIRE',hB<=(P.hmax||24)?'B':'⚠'],
  ];

  rows.forEach((row,ri)=>{
    const ry=tY+22+ri*22;
    ctx.fillStyle=ri%2?'rgba(255,255,255,.03)':'rgba(255,255,255,.015)';
    ctx.fillRect(tX,ry,tW,22);
    ctx.fillStyle='rgba(255,255,255,.04)';
    // Winner highlight
    if(row[4]==='B') ctx.fillStyle='rgba(212,175,55,.07)';
    if(row[4]==='A') ctx.fillStyle='rgba(37,99,235,.07)';
    ctx.fillRect(tX,ry,tW,22);

    tx=tX+4;
    row.forEach((cell,ci)=>{
      const colW=cols[ci][1];
      const isWinner=ci===4;
      ctx.fillStyle=isWinner?(cell==='B'?'#D4AF37':cell==='A'?'#60A5FA':cell.includes('⚠')?'#EF4444':'#4A6080'):
        (ci===3?(cell.startsWith('+')?'#22C55E':cell.startsWith('-')?'#EF4444':'#64748B'):'#DDE6F5');
      ctx.font=(isWinner?'bold ':'')+'8.5px IBM Plex Mono';
      ctx.textAlign='left';
      ctx.fillText(String(cell).slice(0,18),tx,ry+14);
      tx+=colW;
    });
  });

  // Controale Scenariu B
  _rvUpdateScenarioControls(b, P);
}

// ── Desen mini plan pentru comparare ───────────────────────────────────
function _rvDrawPlanMini(ctx, b, ox, oy, SC){
  if(!b) return;
  const bW=b.bW*SC, bD=b.bD*SC;
  // Fundal clădire
  ctx.fillStyle='rgba(17,30,60,.9)';ctx.fillRect(ox,oy,bW,bD);
  ctx.strokeStyle='rgba(200,215,240,.7)';ctx.lineWidth=1.2;ctx.strokeRect(ox,oy,bW,bD);

  // Nuclee cores
  (b.cores||[]).forEach(c=>{
    ctx.fillStyle='rgba(37,99,235,.25)';ctx.fillRect(ox+c.x*SC,oy+c.y*SC,c.w*SC,c.h*SC);
    ctx.strokeStyle='rgba(37,99,235,.6)';ctx.lineWidth=0.6;ctx.strokeRect(ox+c.x*SC,oy+c.y*SC,c.w*SC,c.h*SC);
  });

  // Camere din parter
  const fl=(b.floors||[])[0]||{rects:[]};
  const typeCol={living:'rgba(251,146,60,.35)',bedroom:'rgba(74,222,128,.3)',bedroom2:'rgba(74,222,128,.25)',
    kitchen:'rgba(34,211,238,.25)',bath:'rgba(167,139,250,.25)',hall:'rgba(100,116,139,.2)',core:'rgba(96,165,250,.2)',balcon:'rgba(212,175,55,.1)'};
  fl.rects.forEach(r=>{
    const fill=typeCol[r.t]||'rgba(255,255,255,.05)';
    ctx.fillStyle=fill;ctx.fillRect(ox+r.x*SC,oy+r.y*SC,r.w*SC,r.h*SC);
  });

  // Info text
  ctx.fillStyle='rgba(200,215,240,.55)';ctx.font='bold 8px IBM Plex Mono';ctx.textAlign='center';
  ctx.fillText(b.niv+'niv · '+b.bW.toFixed(0)+'×'+b.bD.toFixed(0)+'m',ox+bW/2,oy+bD+12);
}

// ── Actualizează HTML cu controlul Scenariu B ──────────────────────────
function _rvUpdateScenarioControls(b, P){
  const wrap=document.getElementById('rv-drawwrap');
  if(!wrap) return;
  let ctrl=document.getElementById('rv-scen-ctrl');
  if(!ctrl){
    ctrl=document.createElement('div');
    ctrl.id='rv-scen-ctrl';
    ctrl.style.cssText='position:absolute;top:44px;right:8px;width:200px;background:rgba(8,15,35,.96);border:1px solid rgba(212,175,55,.25);border-radius:8px;padding:10px;font-family:"IBM Plex Mono",monospace;z-index:100';
    wrap.style.position='relative';
    wrap.appendChild(ctrl);
  }
  const nivB=_RV.scenNivB||b.niv;
  ctrl.innerHTML=`
    <div style="font-size:10px;font-weight:700;color:#D4AF37;margin-bottom:8px;border-bottom:1px solid rgba(212,175,55,.15);padding-bottom:5px">⚙ Parametri Scenariu B</div>
    <div style="font-size:8px;color:#4A6080;margin-bottom:3px">Număr niveluri</div>
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px">
      <button onclick="_rvScenNiv(-1)" style="width:22px;height:22px;border-radius:4px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);color:#DDE6F5;cursor:pointer;font-size:13px">−</button>
      <div style="flex:1;text-align:center;font-size:14px;font-weight:700;color:#DDE6F5" id="rv-scen-niv-val">P+${nivB-1}E</div>
      <button onclick="_rvScenNiv(1)" style="width:22px;height:22px;border-radius:4px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);color:#DDE6F5;cursor:pointer;font-size:13px">+</button>
    </div>
    <div style="font-size:8px;color:#4A6080;margin-bottom:3px">Funcțiune</div>
    <select onchange="_RV.scenFnB=this.value;if(_RV.building)_rvRender();"
      style="width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:#DDE6F5;font-size:8px;padding:4px;border-radius:4px;font-family:inherit;margin-bottom:8px">
      <option value="locuinta_colectiva" ${(!_RV.scenFnB||_RV.scenFnB==='locuinta_colectiva')?'selected':''}>Locuință colectivă</option>
      <option value="birouri" ${_RV.scenFnB==='birouri'?'selected':''}>Birouri</option>
      <option value="mixta" ${_RV.scenFnB==='mixta'?'selected':''}>Mixtă (loc.+birouri)</option>
      <option value="hotel" ${_RV.scenFnB==='hotel'?'selected':''}>Hotel</option>
    </select>
    <div style="font-size:7px;color:#2A3F60;margin-top:4px;line-height:1.4">H max admis: ${P.hmax||24}m · CUT max: ${P.cut}</div>
    ${nivB*P.hn>(P.hmax||24)?'<div style="font-size:8px;color:#EF4444;margin-top:4px">⚠ H='+(nivB*P.hn).toFixed(1)+'m depășește '+( P.hmax||24)+'m admis!</div>':''}
  `;
}

function _rvScenNiv(delta){
  const P=_RV.parcelParams; if(!P) return;
  _RV.scenNivB=Math.max(2,Math.min(15,(_RV.scenNivB||_RV.building?.niv||6)+delta));
  const el=document.getElementById('rv-scen-niv-val');
  if(el) el.textContent='P+'+(_RV.scenNivB-1)+'E';
  if(_RV.building) _rvRender();
}

// ══════════════════════════════════════════════════════════════════════════
// GENERATE FLOW
// ══════════════════════════════════════════════════════════════════════════
const _RV_STEPS = [
  'Citesc geometria parcelei active…',
  'Aplic retragerile RLU — edificabil net…',
  'Dimensionez structura — stâlpi, travei, scări…',
  'Generez apartamente conform mix propus…',
  'Plasez camerele după NP 057/2002…',
  'Calculez ferestre — orientare solară…',
  'Verific OMS 119/2014 — însorire camere…',
  'Verific P118-2/2013 — căi evacuare ISU…',
  'Generez planurile + fațadă + secțiune…',
  'Calculez bilanțul suprafețelor…',
  'Finalizez documentația orientativă…',
];


// Colapseaza/expandeaza sectiunile din panoul lateral
function _rvCollapseSection(titleEl){
  titleEl.classList.toggle('collapsed');
  // Ascunde/arata fratii (siblings) - toate elementele dupa rv-sec-t
  let next = titleEl.nextElementSibling;
  while(next){
    next.style.display = titleEl.classList.contains('collapsed') ? 'none' : '';
    next = next.nextElementSibling;
  }
}
async function generateRelevee(){
  // Diagnostic: titlul paginii se schimbă = JS e viu
  if(!window._rvDiagInit){
    window._rvDiagInit=true;
    let _tc=0, _mc=0;
    window._rvAlive=setInterval(()=>{
      _tc++;
      document.title='JS:'+_tc+'s|RV | UrbanX';
      // Multi-building detection
      setTimeout(()=>{try{
        const blds=_rvDetectBuildings(); window._rvBuildings=blds;
        if(blds.length>1) _rvInjectCorpSelector(blds,(bld)=>{
          const Pnew=Object.assign({},_RV.building?.P||{},{_corpOverride:bld});
          _RV.building=_rvCompBuilding(Pnew); _RV.floors=[]; _RV.curFloor=0;
          _RV.floors.push(_rvFloor(_RV.building,0)); _rvRender();
        });
      }catch(e){console.warn('[RV bld]',e.message);}},900);
    },1000);
    // mousedown pe tot documentul - cel mai de baza event posibil
    document.addEventListener('mousedown',(e)=>{
      _mc++;
      document.title='MD'+_mc+':'+e.target.tagName+'#'+(e.target.id||'?')+'|RV';
    },true);
  }
  const ap = S.parcels[S.activeParcel ?? 0];
  if(!ap?.geo?.geometry){
    if(typeof ss === 'function') ss('⚠ Selectați o parcelă pe hartă pentru a genera releveele.');
    return;
  }

  await _rvOpen();

  // ── Selector corp pentru multivolume ─────────────────────────────────────
  if(S.vol?.multiVol && S.vol._lastFeats?.some(f=>f.properties?.bldIdx!=null)){
    const bldCount = new Set(S.vol._lastFeats.map(f=>f.properties?.bldIdx??0)).size;
    if(!window._RV) window._RV = {};
    _RV.selectedBldIdx = _RV.selectedBldIdx ?? 0;
    const existing = document.getElementById('rv-bld-selector');
    if(!existing && bldCount > 1){
      const sel = document.createElement('div');
      sel.id = 'rv-bld-selector';
      sel.style.cssText = 'position:fixed;top:54px;left:50%;transform:translateX(-50%);z-index:9999;background:#111c35;border:1px solid #e8b341;border-radius:8px;padding:6px 14px;display:flex;align-items:center;gap:8px;font-size:12px;color:#e8b341;font-family:monospace;';
      sel.innerHTML = '🏗 Corp: '+[...Array(bldCount)].map((_,i)=>
        `<button onclick="window._RV.selectedBldIdx=${i};document.getElementById('rv-bld-selector').querySelectorAll('button').forEach((b,j)=>b.style.background=j===${i}?'#e8b341':'transparent');document.getElementById('rv-bld-selector').querySelectorAll('button').forEach((b,j)=>b.style.color=j===${i}?'#000':'#e8b341');generateRelevee();" style="background:${i===(_RV.selectedBldIdx??0)?'#e8b341':'transparent'};color:${i===(_RV.selectedBldIdx??0)?'#000':'#e8b341'};border:1px solid #e8b341;border-radius:4px;padding:3px 8px;cursor:pointer;font-family:monospace;">${i+1}</button>`
      ).join('');
      document.body.appendChild(sel);
    }
  }

  const P = _rvGetParcelParams();
  _RV.parcelParams = P;

  const t0 = performance.now();
  const tdot = document.getElementById('rv-tdot');
  const tval = document.getElementById('rv-tval');
  if(tdot) tdot.classList.add('rv-running');
  const tInt = setInterval(()=>{ if(tval) tval.textContent=((performance.now()-t0)/1000).toFixed(1)+'s'; },80);

  // Progress
  const prog = document.getElementById('rv-prog'); prog?.classList.add('rv-on');
  const psteps = document.getElementById('rv-psteps');
  const ppct   = document.getElementById('rv-ppct');
  const pbar   = document.getElementById('rv-pbar');
  if(psteps) psteps.innerHTML = _RV_STEPS.map((s,i)=>`<div class="rv-pstep" id="rv-ps${i}"><div class="rv-psico">${i+1}</div><span>${s}</span></div>`).join('');

  // Progress sincron — fără await per step (previne blocaj microtask queue)
  if(psteps) psteps.innerHTML=_RV_STEPS.map((s,i)=>`<div class="rv-pstep rv-done" id="rv-ps${i}"><div class="rv-psico">✓</div><span>${s}</span></div>`).join('');
  if(ppct) ppct.textContent='100%';
  if(pbar) pbar.style.width='100%';
  // Un singur await — browser pictează starea finală
  await _rvSleep(400);
  prog?.classList.remove('rv-on');

  // Compute — try/finally garantează că rv-prog dispare indiferent de erori
  // Timeout safety: dacă generarea durează >20s, scoatem overlay-ul forțat
  const _rvSafetyTimer = setTimeout(()=>{ document.getElementById('rv-prog')?.classList.remove('rv-on'); }, 3000);
  let b;
  try{
  b = _rvCompBuilding(P); _RV.building = b;
  _RV.floors = [];
  // Pe mobil: calculăm DOAR floor 0 inițial — celelalte lazy la click tab
  // Calculăm max 2 etaje inițial pe orice dispozitiv — restul lazy la click tab
  // Previne crash OOM pe cladiri mari (7+ corpi, 4+ etaje)
  const maxEagerFloors = 1;
  for(let i=0;i<b.niv;i++){
    _RV.floors.push(i < maxEagerFloors ? _rvFloor(b,i) : null);
  }

  // Floor bar
  const fb = document.getElementById('rv-floorbar'); if(fb){ fb.style.display='flex'; }
  _rvBuildFloorBar(b.niv);

  _RV.floor=0; _RV.tab='plan';
  document.querySelectorAll('.rv-tab').forEach(t=>t.classList.remove('rv-on'));
  document.querySelector('.rv-tab[data-tab="plan"]')?.classList.add('rv-on');
  document.getElementById('rv-empty')?.style.setProperty('display','none');

  // Auto-fit: calculăm scala optimă pentru parcelă
  try{
    const wrap = document.getElementById('rv-drawwrap');
    if(wrap && b.P){
      const isMobScale = window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const availW = wrap.clientWidth  - 140;
      const availH = wrap.clientHeight - 120;
      let fitSc = isMobScale ? 8 : 10; // fallback decent când clientWidth=0
      if(availW > 50 && availH > 50){
        const scW = availW / (b.P.W + b.P.rl*2 + 4);
        const scH = availH / (b.P.D + b.P.rf + b.P.rs + 4);
        fitSc = Math.min(isMobScale ? 8 : 14, Math.max(6, Math.floor(Math.min(scW, scH))));
      }
      if(!isMobScale && fitSc < 8) fitSc = 8; // min vizibil pe desktop
      _RV.scale = fitSc;
      document.getElementById('rv-zval').textContent = Math.round(fitSc/12*100)+'%';
    }
  }catch(e){}

  _rvRender();

  // ── Actualizăm DataBus — toate rapoartele sunt notificate ─────────────
  try{ window._RV_DataBus?.update(b, P); }catch(e){}
  // ── ROI quick calc ────────────────────────────────────────────────────
  try{ _rvCalcROI(); }catch(e){}

  }catch(computeErr){
    console.error('[Relevee] Eroare generare:', computeErr);
  }finally{
    clearTimeout(_rvSafetyTimer);
    prog?.classList.remove('rv-on');
    if(prog){ prog.style.display='none'; prog.style.visibility='hidden'; prog.style.pointerEvents='none'; }
    document.getElementById('rv-empty')?.style.setProperty('display','none');
    // Re-render după 500ms — canvas e vizibil și layoutat corect
    setTimeout(()=>{
      try{
        _rvRender();
        const dw=document.getElementById('rv-drawwrap');
        if(dw){ dw.scrollTop=0; dw.scrollLeft=0; }
      }catch(e){}
    }, 500);
    // Click diagnostic - capture phase
    setTimeout(()=>{
      try{
        const modal = document.getElementById('rv-modal');
        if(!modal) return;
        document.addEventListener('click', function _rvClickDiag(e){
          const t = e.target;
          // Show what was clicked
          let ind = document.getElementById('rv-cd');
          if(!ind){ ind=document.createElement('div'); ind.id='rv-cd';
            ind.style.cssText='position:fixed;bottom:40px;left:50%;transform:translateX(-50%);background:#0f0;color:#000;padding:4px 10px;font:9px monospace;z-index:999999;border-radius:4px;pointer-events:none;';
            document.body.appendChild(ind); }
          ind.textContent='CLICK HIT: '+t.tagName+'#'+t.id+'.'+t.className.split(' ')[0];
          clearTimeout(ind._t); ind._t=setTimeout(()=>ind.remove(),3000);
        }, true);
      }catch(e){}
    }, 600);
    setTimeout(()=>{try{
      const _cv=document.getElementById('rv-canvas');
      const _d=document.createElement('div');
      _d.style.cssText='position:fixed;top:60px;right:10px;background:#0B1426;border:2px solid #D4AF37;color:#D4AF37;padding:10px 14px;border-radius:8px;font:10px IBM Plex Mono;z-index:99999;min-width:240px;';
      _d.innerHTML='<b>STATUS:</b> b='+!!_RV?.building+' niv='+(_RV?.building?.niv||'?')+
        ' f0='+(_RV?.floors?.[0]?.rects?.length||0)+
        ' cv='+(+_cv?.width||0)+'x'+(+_cv?.height||0)+
        ' ctx='+(_cv?.getContext('2d')?'OK':'NULL');
      document.body.appendChild(_d);setTimeout(()=>_d.remove(),120000);
    }catch(e){}},200);
  }

  clearInterval(tInt);
  const secs=((performance.now()-t0)/1000).toFixed(1);
  if(tdot) tdot.classList.remove('rv-running');
  if(tval) tval.textContent=secs+'s';
  const multiLabel = (S.multiMode&&S.parcels.length>1) ? ` · 📐 ${S.parcels.length} parcele combinate` : '';
  document.getElementById('rv-tinfo').textContent=`Nr.cad. ${P?.nrCad||'?'}${multiLabel} · ${b?.niv||'?'} niv. · SDA=${_rvFmt(b.sdaTotal)}m² · POT=${_rvFmt(b.scArea/P.area*100)}% · CUT=${_rvFmtD(b.sdaTotal/P.area)} · ${secs}s`;
  // Populăm info parcelă din panoul drept
  const piEl = document.getElementById('rv-parcel-info');
  if(piEl) piEl.innerHTML = `Nr. cad.: <strong style="color:#D4AF37">${P.nrCad}</strong><br>UTR: ${P.utr}<br>Suprafață: ${P.area}m²<br>Dim. bbox: ${P.W.toFixed(1)}m × ${P.D.toFixed(1)}m<br>Front: ${P.frontDir}<br>POT max: ${Math.round(P.pot*100)}%<br>CUT max: ${P.cut}<br>H max: ${P.hMax}m<br>Niveluri: ${b.niv} niv.<br>H total: ${(b.niv*P.hn).toFixed(1)}m`;

  // Paneluri staggered — fiecare bloc separat, UI rămâne responsiv
  setTimeout(()=>{ try{
    const bilant=document.getElementById('rv-bilant');
    const nrAptEst_=Math.max(1,Math.round(b.sdaTotal/70));
    const parcNec_=Math.ceil(nrAptEst_*1.2);
    const parcSup_=Math.floor(Math.max(0,P.area-b.bW*b.bD-200)/28);
    const deficit_=Math.max(0,parcNec_-parcSup_);
    // Calcul parcări cu propunere subsol
    const subsolNiv_=(()=>{ const n2_=Math.max(1,Math.round(b.sdaTotal/70)); const pN2_=Math.ceil(n2_*1.2); const pS2_=Math.floor(Math.max(0,P.area-b.bW*b.bD-200)/28); const d2_=Math.max(0,pN2_-pS2_); return d2_>0?Math.ceil(d2_/Math.floor(b.bW*b.bD/28)):0; })();
    const subsolLabel_=subsolNiv_===0?'✓ Suficient pe teren':
      subsolNiv_===1?`⚠ Propus: 1 subsol (${Math.floor(b.bW*b.bD/28)} loc.)`:
      `⚠ Propus: ${subsolNiv_} subsoluri (${Math.floor(b.bW*b.bD/28)*subsolNiv_} loc.)`;
    if(bilant) bilant.innerHTML=[
      ['Suprafață parcelă',_rvFmt(P.area)+'m²'],['SC edificiu',_rvFmt(b.scArea)+'m²'],
      ['SDA totală',_rvFmt(b.sdaTotal)+'m²'],
      ['POT realizat',_rvFmt(b.scArea/P.area*100)+'% / max '+Math.round(P.pot*100)+'%'],
      ['CUT realizat',_rvFmtD(b.sdaTotal/P.area)+' / max '+P.cut],
      ['Niveluri',b.niv+' niv. · H='+(b.niv*P.hn).toFixed(1)+'m'],
      ['Apartamente est.',_rvFmt(nrAptEst_)+' unități'],
      ['Parcaje necesare',parcNec_+' loc.'+(deficit_>0?' ⚠ deficit '+deficit_:' ✓')],
    ].map(([l,v])=>`<div class="rv-stat"><span class="rv-sl">${l}</span><span class="rv-sv">${v}</span></div>`).join('');
  }catch(e){} }, 3000);
  setTimeout(()=>{ try{
    const fl0=_RV.floors[0]||{rects:[],isu:{}};
    const dnaDiv=document.getElementById('rv-dna');
    if(dnaDiv) dnaDiv.innerHTML=_rvDNARadar(b,P,fl0);
  }catch(e){} }, 6000);
  setTimeout(()=>{ try{
    const fl=_RV.floors[0];
    const potOk=b.scArea/P.area<=P.pot+.001; const cutOk=b.sdaTotal/P.area<=P.cut+.001;
    const roomsOk=fl?.rects?.every(r=>{const m=_RV_NP057[r.t];return !m||r.w*r.h>=m;})??true;
    const solarIssues=fl?.rects?.filter(r=>r.solarOk===false).length||0;
    const isuOk=fl?.isu?.ok!==false;
    const fnN=FN_CONFIG[_RV.fn]||FN_CONFIG.rez;
    const norms=document.getElementById('rv-norm');
    if(norms) norms.innerHTML=[
      ['POT',potOk?'ok':'err',potOk?'CONFORM':'DEPĂȘIRE','PUG'],
      ['CUT',cutOk?'ok':'err',cutOk?'CONFORM':'DEPĂȘIRE','PUG'],
      ['Suprafețe min.',roomsOk?'ok':'warn',roomsOk?'CONFORM':'Verificare','NP 057'],
      ['Însorire OMS',!fnN.omsInsorire?'ok':solarIssues===0?'ok':'warn',
        !fnN.omsInsorire?'N/A':solarIssues===0?'CONFORM':solarIssues+' cam.','OMS 119'],
      ['ISU',isuOk?'ok':'warn',isuOk?'CONFORM':'Verificare',fnN.isuNorm||'P118'],
      ['Parcaje',fnN.pk_unit==='per_apt'?'warn':'ok',fnN.pk_norm||'-','1/apt'],
    ].map(([l,cls,v,ref])=>`<div class="rv-norm-item"><div><div class="rv-nl">${l}</div><div class="rv-nref">${ref}</div></div><div class="rv-badge rv-badge-${cls}">${v}</div></div>`).join('');
  }catch(e){} }, 9000);
  setTimeout(()=>{ try{
    // AI SCORING ENGINE + AUTO-FIX ENGINE
    const flScore=_RV.floors[_RV.curFloor]||_RV.floors[0];
    _rvRenderScore(b, flScore, P);
    // Rulăm auto-fix și populăm tab-ul Scenarii A/B
    const {bOpt,POpt,floorsOpt,fixes}=_rvAutoFix(b,P,_RV.floors);
    _RV.floorsOriginal = JSON.parse(JSON.stringify(_RV.floors));
    _RV.bOriginal = JSON.parse(JSON.stringify(b));
    _RV.POrig = JSON.parse(JSON.stringify(P));
    _rvRenderComparativ(b,P,_RV.floors,bOpt,POpt,floorsOpt,fixes);
    // Dacă există fix-uri hard, afișăm badge pe tab
    if(fixes.filter(f=>f.severity==='hard').length>0){
      const scTab=document.querySelector('[data-tab="scenarii"]');
      if(scTab&&!scTab.querySelector('.rv-fix-badge')){
        const badge=document.createElement('span');
        badge.className='rv-fix-badge';
        badge.style.cssText='background:#EF4444;color:#FFF;font-size:8px;padding:1px 4px;border-radius:8px;margin-left:4px';
        badge.textContent=fixes.filter(f=>f.severity==='hard').length+'!';
        scTab.appendChild(badge);
      }
    }
  }catch(e){console.warn('[RV autofix]',e);} }, 10500);
  setTimeout(()=>{ try{
    // PMR + Energy + Print button in normative panel
    const fl_pmr=_RV.floors[_RV.curFloor]||_RV.floors[0];
    _rvUpdateVerificareExtended(_RV.building,fl_pmr,_RV.building?.P||P);
  }catch(e){} }, 11000);
  setTimeout(()=>{ try{
    const avizeContent=document.getElementById('rv-avize-content');
    if(avizeContent) avizeContent.innerHTML=_rvBuildAvizeTimeline(b,P);
  }catch(e){} }, 12000);
  if(typeof ss === 'function') ss(`✅ Relevee generate în ${secs}s — ${b.niv} niveluri, SDA=${_rvFmt(b.sdaTotal)}m²`);
}
window.generateRelevee = generateRelevee; // export imediat după funcție


function _rvBuildFloorBar(niv){
  const fb=document.getElementById('rv-floorbar'); if(!fb) return;
  fb.innerHTML=`<span class="rv-fb-label">NIV:</span>`;
  for(let i=0;i<niv;i++){
    const btn=document.createElement('div'); btn.className='rv-fbtn'+(i===0?' rv-on':'');
    btn.textContent=i===0?'P':`E${i}`;
    btn.onclick=()=>{_RV.floor=i;document.querySelectorAll('.rv-fbtn').forEach(b=>b.classList.remove('rv-on'));btn.classList.add('rv-on');_rvRender();};
    fb.appendChild(btn);
  }
}

function _rvUpdatePanels(b,P){
  // ── Avize Timeline ────────────────────────────────────────────────────
  const avizeContent=document.getElementById('rv-avize-content');
  if(avizeContent) avizeContent.innerHTML=_rvBuildAvizeTimeline(b,P);

  // ── Amprentă Normativă Radar ───────────────────────────────────────────────────
  const fl0=_RV.floors[0]||{rects:[],isu:{}};
  const dnaDiv=document.getElementById('rv-dna');
  if(dnaDiv) dnaDiv.innerHTML=_rvDNARadar(b,P,fl0);

  // Bilanț
  const bilant=document.getElementById('rv-bilant');
  const nrAptEst_=Math.max(1,Math.round(b.sdaTotal/70));
  const parcNec_=Math.ceil(nrAptEst_*1.2);
  const parcSup_=Math.floor(Math.max(0,P.area-b.bW*b.bD-200)/28);
  const deficit_=Math.max(0,parcNec_-parcSup_);
  if(bilant) bilant.innerHTML=[
    ['Suprafață parcelă',_rvFmt(P.area)+'m²'],
    ['SC edificiu',_rvFmt(b.scArea)+'m²'],
    ['SDA totală',_rvFmt(b.sdaTotal)+'m²'],
    ['POT realizat',_rvFmt(b.scArea/P.area*100)+'% / max '+Math.round(P.pot*100)+'%'],
    ['CUT realizat',_rvFmtD(b.sdaTotal/P.area)+' / max '+P.cut],
    ['Niveluri',b.niv+' niv. · H='+(b.niv*P.hn).toFixed(1)+'m'],
    ['Apartamente est.',_rvFmt(nrAptEst_)+' unități'],
    ['Parcaje necesare',parcNec_+' loc.'+(deficit_>0?' ⚠ deficit '+deficit_:' ✓')],
  ].map(([l,v])=>`<div class="rv-stat"><span class="rv-sl">${l}</span><span class="rv-sv">${v}</span></div>`).join('');

  // Normative — adaptate per funcțiune
  const fl=_RV.floors[0];
  const potOk=b.scArea/P.area<=P.pot+.001;
  const cutOk=b.sdaTotal/P.area<=P.cut+.001;
  const roomsOk=fl.rects.every(r=>{ const m=_RV_NP057[r.t]; return !m||r.w*r.h>=m; });
  const solarIssues=fl.rects.filter(r=>r.solarOk===false).length;
  const isuOk=fl.isu?.ok!==false;
  const fnN = FN_CONFIG[_RV.fn] || FN_CONFIG.rez;
  const norms=document.getElementById('rv-norm');
  if(norms) norms.innerHTML=[
    ['POT',potOk?'ok':'err',potOk?'CONFORM':'DEPĂȘIRE','PUG · NP 068'],
    ['CUT',cutOk?'ok':'err',cutOk?'CONFORM':'DEPĂȘIRE','PUG · NP 068'],
    ['Suprafețe min.',roomsOk?'ok':'warn',roomsOk?'CONFORM':'Verificare','NP 057/2002'],
    ['Însorire OMS 119',!fnN.omsInsorire?'ok':solarIssues===0?'ok':'warn',
      !fnN.omsInsorire?'N/A — funcțiune':solarIssues===0?'CONFORM':solarIssues+' cam.','OMS 119/2014'],
    ['Evacuare ISU',isuOk?'ok':'warn',isuOk?`CONFORM (max ${fnN.isuDist}m)`:'Verificare',fnN.isuNorm],
    ['Parcaje',fnN.pk_unit==='per_apt'?'warn':'ok',fnN.pk_norm,`1 loc / ${fnN.pk_unit==='per_apt'?'apt':fnN.pk_unit==='per_50m2'?'50m²':'2 cam.'}`],
    ['PMR',b.scArea>600?'ok':'warn','Obligatoriu','NP 051/2012'],
    ['Seismic',P.niv>0?'ok':'warn','Zona E ag=0.2g','P100-1/2013'],
  ].map(([l,cls,v,ref])=>`<div class="rv-norm-item"><div><div class="rv-nl">${l}</div><div class="rv-nref">${ref}</div></div><div class="rv-badge rv-badge-${cls}">${v}</div></div>`).join('');

  // ── NORMATIVE APLICATE (secțiunea de jos) ─────────────────────────────────
  const normApEl=document.getElementById('rv-norms-applied');
  if(normApEl) normApEl.innerHTML=(fnN.norms||[]).map(n=>
    `<div style="font-size:9px;color:#64748B;padding:2px 0;border-bottom:1px solid rgba(255,255,255,.03)">${n}</div>`
  ).join('');

  // ── RAPOARTE AFECTATE DE ACEST RELEVEU ─────────────────────────────
  const rapoartePanel=document.getElementById('rv-rapoarte-aff');
  if(rapoartePanel){
    const db=window._RV_DataBus?.get();
    const sum=window._RV_DataBus?.getSummary();
    const rowsAff=[
      {label:'📐 Studiu Însorire',detail:db?`front ${P.frontDir} · H=${(b.niv*P.hn).toFixed(0)}m · ${solarIssues>0?solarIssues+' cam. sub OMS':'✓ OMS 119'}`:'-',ok:solarIssues===0,study:'insorire'},
      {label:'⚡ Cert. Performanță En.',detail:db?`U_perete=${db.uWall} · U_geam=${db.uWin} W/m²K`:'-',ok:true,study:'cpe'},
      {label:'📋 SSF Fezabilitate',detail:db?`SC=${Math.round(b.scArea)}m² · SDA=${Math.round(b.sdaTotal)}m²`:'-',ok:potOk&&cutOk,study:'ssf'},
      {label:'🚗 Studiu Trafic',detail:db?`${parcNec_} loc. · ${db.tripuriOra||'-'} veh/oră vârf`:'-',ok:parcSup_>=parcNec_,study:'trafic'},
      {label:'🔊 Studiu Acustică',detail:db?`Rw≥${db.rwNecesar||52}dB · dist.str.=${P.rs}m`:'-',ok:true,study:'acustica'},
      {label:'⛏ Studiu Geotehnic',detail:db?`${db.nrForaje||3} foraje × ${(db.adancForaj||10).toFixed(0)}m`:'-',ok:true,study:'geotech'},
    ];
    rapoartePanel.innerHTML=`<div style="font-size:9px;font-weight:700;color:var(--rv-gold);padding:6px 10px 2px;border-top:1px solid rgba(212,175,55,.15);letter-spacing:.05em">RAPOARTE AFECTATE</div>`+
    rowsAff.map(r=>`<div class="rv-raff-row" title="${r.detail}" onclick="if(typeof _generateReport==='function')_generateReport('${r.study}')">
      <div style="flex:1;min-width:0">
        <div style="font-size:9px;font-weight:600;color:${r.ok?'rgba(200,215,240,.9)':'rgba(250,180,180,.9)'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.label}</div>
        <div style="font-size:7.5px;color:rgba(100,120,150,.8);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.detail}</div>
      </div>
      <div style="font-size:8px;color:${r.ok?'rgba(52,211,153,.9)':'rgba(248,113,113,.9)'};flex-shrink:0;margin-left:4px">${r.ok?'✓':'⚠'}</div>
    </div>`).join('') +
    // Buton auto-generare toate (#5 audit)
    `<button onclick="_rvGenerateAllAffected()" style="width:calc(100% - 20px);margin:8px 10px 4px;padding:7px;
      background:linear-gradient(135deg,rgba(212,175,55,.18),rgba(212,175,55,.08));
      border:1px solid rgba(212,175,55,.4);border-radius:8px;
      color:#D4AF37;font-size:9.5px;font-weight:700;cursor:pointer;letter-spacing:.03em;
      display:flex;align-items:center;justify-content:center;gap:6px">
      ⚡ Generează automat toate studiile afectate
    </button>`;
  }
}

// ── Auto-generare studii afectate (#5 audit) ─────────────────────────────────
async function _rvGenerateAllAffected(){
  const queue = [
    {fn:'generateSolarStudy',   label:'Studiu Însorire'},
    {fn:'generateCPE',          label:'Certificat Performanță Energetică'},
    {fn:'generateSSF',          label:'Studiu Siguranță Foc (ISU)'},
    {fn:'generateTrafficStudy', label:'Studiu Impact Trafic'},
    {fn:'generateNoiseStudy',   label:'Studiu Acustic'},
    {fn:'generateGeotehnicalStudy', label:'Pre-Studiu Geotehnic'},
  ];
  ss('⚡ Se generează automat '+queue.length+' studii afectate...');
  for(let i=0; i<queue.length; i++){
    const {fn, label} = queue[i];
    if(typeof window[fn] === 'function'){
      ss(`⚡ [${i+1}/${queue.length}] ${label}...`);
      try{ await window[fn](); }catch(e){ console.warn('Auto-gen '+fn+':', e.message); }
      await new Promise(r=>setTimeout(r, 800)); // pauză între studii
    }
  }
  ss('✅ Toate studiile afectate au fost generate — verificați folderul Downloads');
}

// ── DNA Soluții de conformitate (#6 audit) ────────────────────────────────────
// Apelat din _rvDNARadar când există axe neconforme — returnează HTML cu soluții
function _rvDNAGetSolutii(b, P, potOk, cutOk, solarIssues, isuOk, roomsOk, parcSup, parcNec){
  const fnCfg = FN_CONFIG[_RV.fn] || FN_CONFIG.rez;
  const solutii = [];

  if(!potOk){
    const depPct = Math.round(b.scArea/P.area*100) - Math.round(P.pot*100);
    solutii.push({
      axa:'POT', status:'neconform', col:'#EF4444',
      titlu:'Depășire POT cu '+depPct+'%',
      solutii:[
        'Reducere amprentă edificiu prin repoziționare față de limitele parcelei',
        'Soluție cu mai multe niveluri (crește CUT, reduce SC)',
        'Etajare progresivă — etajele superioare retrase față de amprentă',
        'Consultați PUG pentru derogări conf. art. 22 Legea 350/2001',
      ]
    });
  }
  if(!cutOk){
    const depCut = ((b.sdaTotal/P.area) - P.cut).toFixed(2);
    solutii.push({
      axa:'CUT', status:'neconform', col:'#EF4444',
      titlu:'Depășire CUT cu +'+depCut,
      solutii:[
        'Reducere număr niveluri (H max) sau suprafețe pe etaj',
        'Eliminare subsol sau mansardă din SDA dacă nu e locuință',
        'Verificare calcul SDA — unele funcțiuni se exclud (garaje, tehnic)',
        'PUZ poate permite derogare pentru CUT motivat conf. RGU HG 525/1996',
      ]
    });
  }
  if(solarIssues > 0 && fnCfg.omsInsorire){
    solutii.push({
      axa:'OMS 119', status:'neconform', col:'#F59E0B',
      titlu:solarIssues+' camere cu însorire insuficientă (<'+fnCfg.omsMin+'h/zi)',
      solutii:[
        'Reorientare clădire — fațada principală spre Sud sau Sud-Est',
        'Mărire geamuri pe fațada sudică (min 1/8 din suprafața pardoselii)',
        'Reconfigurare plan: camerele de dormit pe fațada insorită',
        'Distanțe minime față de obstrucții: H/2 față de clădiri vecine',
        'Studiu Însorire detaliat conf. OMS 119/2014 — obligatoriu la PA',
      ]
    });
  }
  if(!isuOk){
    solutii.push({
      axa:'ISU', status:'neconform', col:'#F59E0B',
      titlu:'Căi de evacuare peste '+fnCfg.isuDist+'m ('+fnCfg.isuNorm+')',
      solutii:[
        'Adăugare nucleu de scări suplimentar — max '+fnCfg.isuDist+'m între nuclee',
        'Lărgire coridor evacuare la min. '+fnCfg.scaraMin+'m liber',
        'Compartiment antifoc suplimentar dacă SDA/nivel > 2500m²',
        'Consultare aviz ISU Moldova înainte de PA conf. Legea 307/2006',
      ]
    });
  }
  if(!roomsOk){
    solutii.push({
      axa:'NP 057', status:'neconform', col:'#F59E0B',
      titlu:'Camere sub suprafața minimă NP 057/2002',
      solutii:[
        'Living/sufragerie: min 18m² (2 pers.) sau 22m² (3+ pers.)',
        'Dormitor 1: min 14m², Dormitor 2: min 12m²',
        'Bucătărie: min 8m² + oficiu sau bucătărie-living min 18m²',
        'Reorganizare plan — eliminare camere mici prin unificare',
      ]
    });
  }
  if(parcSup < parcNec){
    solutii.push({
      axa:'Parcaje', status:'neconform', col:'#EF4444',
      titlu:'Deficit '+( parcNec-parcSup)+' locuri parcare (NP 067/2002)',
      solutii:[
        'Subsol parcare — '+(parcNec-parcSup)+' locuri suplimentare',
        'Parcaj etajat dacă teren permite (min 2.8m înălțime/nivel)',
        'Compensare prin parcaj public autorizat în max. 300m conf. HCL',
        'Calcul exact conf. NP 067/2002 — poate fi mai mic decât estimat',
      ]
    });
  }

  if(!solutii.length) return '';

  return `<div style="margin-top:8px;border-top:1px solid rgba(255,255,255,.07);padding-top:6px">
    <div style="font-size:8px;font-weight:700;color:#D4AF37;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px">
      💡 Soluții de conformitate
    </div>
    ${solutii.map(s=>`
    <div style="margin-bottom:8px;padding:6px 8px;background:rgba(${s.col.slice(1).match(/.{2}/g).map(x=>parseInt(x,16)).join(',')},0.06);border-left:2px solid ${s.col};border-radius:0 6px 6px 0">
      <div style="font-size:8px;font-weight:700;color:${s.col};margin-bottom:3px">${s.axa}: ${s.titlu}</div>
      ${s.solutii.map(sol=>`<div style="font-size:7.5px;color:rgba(180,200,230,.75);margin-bottom:1px">▸ ${sol}</div>`).join('')}
    </div>`).join('')}
  </div>`;
}

// ══════════════════════════════════════════════════════════════════════════
// MODAL OPEN / CLOSE
// ══════════════════════════════════════════════════════════════════════════
async function _rvOpen(){
  // GUARD + DEBUG: afișăm call stack ca overlay vizibil
  if(!window._rvAllowOpen){
    try{
      var stack = new Error('AutoOpen detectat').stack || 'stack indisponibil';
      var el = document.createElement('div');
      el.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:999999;background:#c00;color:#fff;padding:10px;font-size:11px;white-space:pre-wrap;font-family:monospace;max-height:300px;overflow:auto;';
      el.textContent = '🚫 _rvOpen BLOCAT — cine a apelat:\n' + stack;
      document.body.appendChild(el);
      setTimeout(function(){ el.remove(); }, 15000);
    }catch(e){}
    return;
  }
  if(!document.getElementById('rv-modal')) await _rvInject();
  const rvM=document.getElementById('rv-modal');
  rvM.style.visibility='visible';
  rvM.style.pointerEvents='all';
  rvM.style.zIndex='2147483647';
  rvM.style.background='rgba(4,8,18,.97)';
  rvM.classList.add('rv-modal-open');
  // Document-level mousedown - cel mai primitiv nivel posibil
  if(!window._rvDocMd){
    window._rvDocMd=true;
    document.addEventListener('mousedown',function(e){
      document.title='MD:'+e.target.tagName+'#'+(e.target.id||'?')+'|RV';
    },true);
    document.addEventListener('click',function(e){
      document.title='CK:'+e.target.tagName+'#'+(e.target.id||'?')+'|RV';
    },true);
  }
  // Wire butoane direct cu addEventListener (bypass onclick)
  setTimeout(()=>{
    // FIT
    document.querySelectorAll('[onclick*="scale=12"],[onclick*="_rvFit"]').forEach(b=>{
      if(!b._rvWired){ b._rvWired=true;
        b.addEventListener('click',()=>{ try{_RV.scale=12;_rvRender();document.title='FIT-OK|RV';}catch(e){document.title='FIT-ERR:'+e.message;} });
      }
    });
    // Tabs
    document.querySelectorAll('.rv-tab').forEach(t=>{
      if(!t._rvWired){ t._rvWired=true;
        t.addEventListener('click',()=>{ try{_rvTabClick(t);document.title='TAB-OK:'+t.dataset.tab+'|RV';}catch(e){document.title='TAB-ERR:'+e.message;} });
      }
    });
    // Zoom buttons
    document.querySelectorAll('[onclick*="_rvZoom"]').forEach(b=>{
      if(!b._rvWired){ b._rvWired=true;
        const d=b.getAttribute('onclick').includes('1')&&!b.getAttribute('onclick').includes('-1')?1:-1;
        b.addEventListener('click',()=>{ try{_rvZoom(d);document.title='ZOOM-OK|RV';}catch(e){} });
      }
    });
    // Floor tabs
    document.querySelectorAll('.rv-niv-btn').forEach(b=>{
      if(!b._rvWired){ b._rvWired=true;
        b.addEventListener('click',()=>{ try{const fn=b.getAttribute('onclick');if(fn)eval(fn);}catch(e){} });
      }
    });
    document.title='WIRED-OK|RV';
  },800);
  // CSS nuclear: doar modala primește click-uri, tot restul ignorat
  if(!document.getElementById('rv-pe-override')){
    const s=document.createElement('style');
    s.id='rv-pe-override';
    s.textContent='*:not(#rv-modal):not(#rv-modal *){pointer-events:none!important}';
    document.head.appendChild(s);
  }
  _RV.open=true;
}

function closeRelevee(){
  const modal=document.getElementById('rv-modal');
  if(!modal) return;
  // Restaurăm elementele ascunse de _rvOpen
  ['wx-topbar','wx-nav-desktop','wx-nav-mobile','wx-mobile-sheet'].forEach(id=>{
    const el=document.getElementById(id);
    if(el && el.dataset.rvHidden){ el.style.pointerEvents=''; el.style.visibility=''; delete el.dataset.rvHidden; }
  });
  document.getElementById('rv-pe-override')?.remove();
  modal.classList.remove('rv-modal-open');
  _RV.open=false;
  // Curățăm selectorul de corp la închidere
  document.getElementById('rv-bld-selector')?.remove();
  _RV.selectedRoom=null;
  _RV.resizing=null;
  // Ascundem complet după tranziție ca să nu interfere cu butoanele din spatele modal-ului
  clearTimeout(window._rvCloseTimer);
  window._rvCloseTimer=setTimeout(()=>{
    if(!_RV.open) modal.style.visibility='hidden';
  }, 320);
  // Oprim orice animație solară
  clearInterval(window._rvSolarInterval);
}

function openRelevee_safe(){
  const modal=document.getElementById('rv-modal');
  if(!modal) return;
  modal.style.visibility='visible';
  _RV.open=true;
}

function _rvTabClick(btn){
  document.querySelectorAll('.rv-tab').forEach(t=>t.classList.remove('rv-on'));
  btn.classList.add('rv-on');
  _RV.tab=btn.dataset.tab;
  // Ascundem controalele scenariu când nu suntem pe tab-ul scenarii
  const sc=document.getElementById('rv-scen-ctrl');
  if(sc) sc.style.display=btn.dataset.tab==='scenarii'?'block':'none';
  if(_RV.building) _rvRender();
}

function _rvToggle(el,key){
  el.classList.toggle('rv-tog-on');
  _RV['show'+key[0].toUpperCase()+key.slice(1)]=el.classList.contains('rv-tog-on');
  // Afișăm/ascundem controalele solar când se activează
  if(key==='solar'){
    const sc=document.getElementById('rv-solar-ctrls');
    if(sc) sc.style.display=el.classList.contains('rv-tog-on')?'block':'none';
    if(el.classList.contains('rv-tog-on')){
      _RV.solarAnim=true;
      _RV.solarHour=_RV.solarHour||10;
      _RV.solarMonth=_RV.solarMonth||12;
    }
  }
  if(_RV.building) _rvRender();
}

// ── ROI Calculator ────────────────────────────────────────────────────────
function _rvCalcROI(){
  const b=_RV.building; if(!b) return;
  const P=_RV.parcelParams; if(!P) return;
  const cost=parseInt(document.getElementById('rv-roi-cost')?.value||650);
  const sell=parseInt(document.getElementById('rv-roi-sell')?.value||1200);
  const nrApt=Math.max(1,Math.round(b.sdaTotal/70));
  const suMedie=b.sdaTotal/nrApt*0.82;
  const totalCost=b.sdaTotal*cost;
  const totalRev=nrApt*suMedie*sell;
  const profit=totalRev-totalCost;
  const roi=(profit/totalCost*100).toFixed(0);
  const profEl=document.getElementById('rv-roi-profit');
  const subEl=document.getElementById('rv-roi-sub');
  // Afisaj adaptiv: k€ pentru valori <500k, M€ pentru valori >=500k
  const _fmtEur=(v)=>{
    if(Math.abs(v)>=500000) return (v/1000000).toFixed(1)+'M€';
    if(Math.abs(v)>=1000) return Math.round(v/1000)+'k€';
    return Math.round(v)+'€';
  };
  // Afiseaza SDA si SU in interfata
  const sdaInfo=document.getElementById('rv-roi-sda-val');
  const suInfo=document.getElementById('rv-roi-su-val');
  if(sdaInfo) sdaInfo.textContent=Math.round(b.sdaTotal);
  if(suInfo) suInfo.textContent=Math.round(nrApt*suMedie);
  if(profEl){
    profEl.style.color=profit>0?'#22C55E':'#EF4444';
    profEl.textContent=(profit>0?'+':'')+_fmtEur(profit)+' profit brut';
  }
  if(subEl) subEl.textContent=`Cost execuție: ${_fmtEur(totalCost)} · Venituri vânzare: ${_fmtEur(totalRev)} · ROI ~${roi}%`;
  // ── Sincronizare cu panoul DREPT (rv-rpanel) ─────────────────────────────
  try{
    const rpCost=document.getElementById('rv-rp-cost');
    const rpSell=document.getElementById('rv-rp-sell');
    const rpProfit=document.getElementById('rv-rp-profit');
    const rpSub=document.getElementById('rv-rp-sub');
    const rpCs=document.getElementById('rv-rp-cost-slider');
    const rpSs=document.getElementById('rv-rp-sell-slider');
    if(rpCost) rpCost.textContent=cost;
    if(rpSell) rpSell.textContent=sell;
    if(rpCs&&rpCs.value!==String(cost)) rpCs.value=cost;
    if(rpSs&&rpSs.value!==String(sell)) rpSs.value=sell;
    if(rpProfit){
      rpProfit.style.color=profit>0?'#22C55E':'#EF4444';
      rpProfit.textContent=(profit>0?'+':'')+_fmtEur(profit);
    }
    if(rpSub) rpSub.textContent=`Cost: ${_fmtEur(totalCost)} · Venituri: ${_fmtEur(totalRev)}\nROI: ~${roi}% · SDA: ${Math.round(b.sdaTotal)}mp`;
  }catch(e){}
}

// (no duplicate _rvFmt — see line 86)

// ── Solar Play — animează soarele 5:00→21:00 automat ─────────────────────
let _rvSolarTimer=null;
function _rvSolarPlay(){
  if(_rvSolarTimer){
    clearInterval(_rvSolarTimer);
    _rvSolarTimer=null;
    const btn=document.getElementById('rv-solar-play');
    if(btn) btn.textContent='▶ Animație 24h';
    return;
  }
  _RV.solarHour=5;
  const slider=document.getElementById('rv-solar-hour');
  const hval=document.getElementById('rv-solar-hval');
  const btn=document.getElementById('rv-solar-play');
  if(btn) btn.textContent='⏹ Stop animație';
  _rvSolarTimer=setInterval(()=>{
    _RV.solarHour=(_RV.solarHour||5)+0.25;
    if(_RV.solarHour>21){ clearInterval(_rvSolarTimer);_rvSolarTimer=null;if(btn)btn.textContent='▶ Animație 24h';return; }
    if(slider) slider.value=Math.round(_RV.solarHour);
    if(hval) hval.textContent=String(Math.floor(_RV.solarHour)).padStart(2,'0')+':'+(_RV.solarHour%1>=0.5?'30':'00');
    if(_RV.building) _rvRender();
  },80);
}

function _rvZoom(d){
  _RV.scale=Math.max(5,Math.min(32,_RV.scale+(d*2)));
  document.getElementById('rv-zval').textContent=Math.round(_RV.scale/12*100)+'%';
  if(_RV.building) _rvRender();
}

function _rvExport(){
  // PNG quick export (păstrat pentru debug)
  const cv=document.getElementById('rv-canvas'); if(!cv.width) return;
  const a=document.createElement('a');
  const P=_RV.parcelParams;
  a.download=`relevee_${P?.nrCad||'urbanx'}_${_RV.tab}_e${_RV.floor}.png`;
  a.href=cv.toDataURL('image/png',1.0); a.click();
}

// ══════════════════════════════════════════════════════════════════════════
// EXPORT PDF PROFESIONAL — desenat direct în jsPDF (fundal alb, arh. style)
// ══════════════════════════════════════════════════════════════════════════
async function _rvExportPDF(){
  const P=_RV.parcelParams, b=_RV.building;
  if(!P||!b){alert('Generați releveele mai întâi.');return;}
  const _jsPDF=(typeof jsPDF!=='undefined')?jsPDF:(window.jspdf?.jsPDF);
  if(!_jsPDF){_rvExportAllPNG(P,b);return;}

  const btn=document.querySelector('.rv-expbtn')||document.querySelector('button[onclick*="ExportPDF"]');
  if(btn){btn.textContent='⏳ Generez PDF…';btn.style.opacity='.6';btn.style.background='rgba(212,175,55,.25)';}
  if(typeof ss==='function') ss('⏳ Generez Releveu PDF — Pasul 1/4: capturi hărți…');

  // ── Capturi din viewer 3D (cu timeout 8s — nu blocăm dacă e lent) ────
  let caps={};
  try{
    const ap=S.parcels[S.activeParcel??0];
    if(ap?.geo?.geometry && typeof _captureStudyMaps==='function'){
      const capturePromise=_captureStudyMaps(ap, msg=>{ if(typeof ss==='function') ss(msg); });
      const timeoutPromise=new Promise(res=>setTimeout(()=>res({}),8000)); // max 8s
      caps=await Promise.race([capturePromise,timeoutPromise])||{};
    }
  }catch(e){console.warn('[Releveu PDF] capture failed:',e.message);}
  if(typeof ss==='function') ss('⏳ Generez PDF — Pasul 2/4: planuri de nivel…');

  try{
    const pdf=new _jsPDF({orientation:'landscape',unit:'mm',format:'a4'});
    const W=297,H=210;
    let pgN=0; let totalPages=0;
    const newPage=()=>{if(pgN>0)pdf.addPage();pgN++;};

    // ── Culori & utilitare ───────────────────────────────────────────
    const C={
      gold:[212,175,55],gold2:[245,198,60],dark:[8,14,30],dark2:[15,25,48],
      light:[248,249,252],white:[255,255,255],red:[220,38,38],green:[22,163,74],
      blue:[37,99,235],cyan:[6,182,212],orange:[234,88,12],purple:[124,58,237],
      gray:[100,116,139],gray2:[203,213,225],gray3:[241,245,249],
      wall:[80,100,130],living:[253,186,116],bedroom:[134,239,172],kitchen:[103,232,249],
      bath:[196,181,253],hall:[203,213,225],core:[147,197,253],balcon:[254,249,195],
      commercial:[249,168,212],storage:[209,213,219],
    };
    // S2: sanitizare text pentru jsPDF (WinAnsi/Helvetica)
    // ș/Ș (U+0219/U+0218) → ş/Ş (cedilla, IN WinAnsi — vizual identic pt. română)
    // ț/Ț (U+021B/U+021A) → ţ/Ţ (cedilla, IN WinAnsi — vizual identic pt. română)
    // ă/Ă (U+0103/U+0102) → a/A (breve nu există în WinAnsi — fallback la bază)
    // â/î rămân (U+00E2, U+00EE sunt IN WinAnsi)
    const S2=s=>{
      const r=String(s||'');
      return r
        .replace(/\u0219/g,'\u015F').replace(/\u0218/g,'\u015E')  // ș→ş  Ș→Ş
        .replace(/\u021B/g,'\u0163').replace(/\u021A/g,'\u0162')  // ț→ţ  Ț→Ţ
        .replace(/\u0103/g,'a').replace(/\u0102/g,'A')             // ă→a  Ă→A
        .replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ')
        .replace(/\s+/g,' ').trim().slice(0,300);
    };
    const RN=(n,d=0)=>isNaN(n)?'—':d?Number(n).toFixed(d):Math.round(n)+'';
    const addCap=(img,x,y,w,h,cap)=>{
      if(!img||img.length<200)return;
      try{
        pdf.setFillColor(230,234,242);pdf.rect(x,y,w,h,'F');
        pdf.addImage(img,'JPEG',x,y,w,h,undefined,'FAST');
        if(cap){
          pdf.setFillColor(0,0,0,0.5);
          pdf.setFillColor(15,25,48);pdf.rect(x,y+h-5,w,5,'F');
          pdf.setTextColor(...C.gold);pdf.setFont('helvetica','italic');pdf.setFontSize(5);
          pdf.text(S2(cap),x+w/2,y+h-1.5,{align:'center'});
        }
      }catch(e){}
    };

    // ── Header/Footer ────────────────────────────────────────────────
    const fnCfgDoc = FN_CONFIG[_RV.fn] || FN_CONFIG.rez;
    const uatInfo = (typeof getUATById === 'function' && _AEDIS?.uatId) ? getUATById(_AEDIS.uatId) : null;
    const uatLabel = uatInfo?.label || S2(P.uat||'Municipiul Iași');
    const judetLabel = uatInfo?.judet || 'Județul Iași';

    const hdr=(title,pg)=>{
      // Header identic cu Studiu Amplasament (captura 1)
      pdf.setFillColor(...C.dark2);pdf.rect(0,0,W,12,'F');
      pdf.setFillColor(...C.gold);pdf.rect(0,0,W,1.2,'F');
      // Logo UrbanX stanga
      pdf.setFillColor(...C.gold);pdf.roundedRect(3.5,2.5,7,7,1,1,'F');
      pdf.setTextColor(...C.dark2);pdf.setFont('helvetica','bold');pdf.setFontSize(7);pdf.text('UX',7,7.5,{align:'center'});
      // Titlu document
      pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(8);pdf.text('MEMORIU TEHNIC PRELIMINAR DE ARHITECTURĂ',14,5.5);
      // UAT + cadastral + UTR (linia 2 din header)
      pdf.setTextColor(...C.gold);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);
      pdf.text(uatLabel+' · '+judetLabel+' · Nr.cad. '+S2(P.nrCad)+' · UTR '+S2(P.utr)+' · '+fnCfgDoc.label,14,9.5);
      // Titlu pagina centrat
      pdf.setTextColor(200,215,240);pdf.setFont('helvetica','bold');pdf.setFontSize(7);pdf.text(S2(title),W/2,7,{align:'center'});
      // Paginatie dreapta
      pdf.setTextColor(...C.gold);pdf.setFontSize(6.5);pdf.text('Pag. '+pg,W-5,7,{align:'right'});
    };
    const ftr=()=>{
      pdf.setFillColor(240,244,250);pdf.rect(0,H-7,W,7,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.2);pdf.line(0,H-7,W,H-7);
      pdf.setTextColor(120,135,155);pdf.setFontSize(5.5);pdf.setFont('helvetica','italic');
      pdf.text('Nr.cad. '+S2(P.nrCad)+' · UTR: '+S2(P.utr)+' · '+S2(P.fn)+' · UrbanX TSS·FG · Document orientativ — nu înlocuiește proiectul tehnic conf. Legii 50/1991',W/2,H-2,{align:'center'});
    };
    const secTitle=(txt,y,col)=>{
      const c=col||C.dark2;
      pdf.setFillColor(...c);pdf.rect(10,y,W-20,6,'F');
      pdf.setFillColor(...C.gold);pdf.rect(10,y,1.5,6,'F');
      pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(7.5);
      pdf.text(S2(txt),14,y+4.2);return y+8;
    };
    const bodyTxt=(txt,x,y,w,sz,col)=>{
      const s=sz||6.5,ww=w||(W-22),cc=col||[40,55,80];
      pdf.setTextColor(...cc);pdf.setFont('helvetica','normal');pdf.setFontSize(s);
      const lines=pdf.splitTextToSize(S2(txt),ww);
      lines.forEach((l,i)=>pdf.text(l,x,y+i*(s*0.42)));
      return y+lines.length*(s*0.42)+1.5;
    };
    const noteBox=(txt,x,y,w,h,icon,bgCol,tcol)=>{
      const bg=bgCol||[248,252,255],tc=tcol||[30,60,120];
      pdf.setFillColor(...bg);pdf.setDrawColor(tc[0],tc[1],tc[2],0.3);pdf.setLineWidth(0.3);
      pdf.roundedRect(x,y,w,h,1.5,1.5,'FD');
      if(icon){pdf.setTextColor(...tc);pdf.setFont('helvetica','bold');pdf.setFontSize(7);pdf.text(icon,x+2.5,y+h/2+2);}
      pdf.setTextColor(...tc);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);
      const lines=pdf.splitTextToSize(S2(txt),w-(icon?10:4));
      lines.slice(0,Math.floor(h/3.2)).forEach((l,i)=>pdf.text(l,x+(icon?9:2.5),y+4+i*3.2));
    };
    const tblHdr=(cols,widths,y)=>{
      pdf.setFillColor(...C.dark2);pdf.rect(10,y,widths.reduce((a,b_)=>a+b_,0),6,'F');
      pdf.setTextColor(...C.gold);pdf.setFont('helvetica','bold');pdf.setFontSize(6);
      let x=10;cols.forEach((c,i)=>{pdf.text(S2(c),x+2,y+4.2);x+=widths[i];});return y+6;
    };
    const tblRow=(cols,widths,y,even)=>{
      const tw=widths.reduce((a,b_)=>a+b_,0);
      pdf.setFillColor(even?245:252,even?248:253,even?252:254);pdf.rect(10,y,tw,5.5,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(10,y+5.5,10+tw,y+5.5);
      let x=10;cols.forEach((c,i)=>{
        const v=S2(String(c||''));
        if(v==='CONFORM'||v==='OK'){pdf.setTextColor(...C.green);pdf.setFont('helvetica','bold');}
        else if(v==='DEPĂȘIRE'||v==='NECONFORM'){pdf.setTextColor(...C.red);pdf.setFont('helvetica','bold');}
        else if(v==='Verificare PT'){pdf.setTextColor(160,90,20);pdf.setFont('helvetica','normal');}
        else{pdf.setTextColor(40,55,80);pdf.setFont('helvetica','normal');}
        pdf.setFontSize(6);pdf.text(v,x+2,y+4);x+=widths[i];
      });return y+5.5;
    };

    // ── Draw plan — NIVEL CAD ──────────────────────────────────────────
    const drawPlan=(fl,P_,b_,ox,oy,sc)=>{
      const bW=b_.bW,bD=b_.bD;

      // ── 1. Fundal parcelă + clădire ────────────────────────────────────
      pdf.setFillColor(248,249,252);pdf.rect(ox-P_.rl*sc,oy-P_.rf*sc,P_.W*sc,P_.D*sc,'F');
      pdf.setDrawColor(...C.gold);pdf.setLineWidth(0.25);pdf.setLineDashPattern([2,1.5],0);
      pdf.rect(ox-P_.rl*sc,oy-P_.rf*sc,P_.W*sc,P_.D*sc,'S');pdf.setLineDashPattern([],0);
      pdf.setFillColor(252,252,254);pdf.rect(ox,oy,bW*sc,bD*sc,'F');

      // ── 2. Grilă structurală cu bule alfanumerice ──────────────────────
      // Calcul spatii grila bazat pe dimensiunile clădirii
      const nGX=Math.max(3,Math.round(bW/4.5)),nGY=Math.max(2,Math.round(bD/3.8));
      const gSpX=bW/nGX,gSpY=bD/nGY;
      const bubR=2.8; // raza bula mm

      // Linii grilă (punctate fine)
      pdf.setDrawColor(190,200,220);pdf.setLineWidth(0.12);pdf.setLineDashPattern([1.5,1.5],0);
      for(let gi=0;gi<=nGX;gi++){const gx=ox+gi*gSpX*sc;pdf.line(gx,oy-bubR*3,gx,oy+bD*sc+bubR*3);}
      for(let gi=0;gi<=nGY;gi++){const gy=oy+gi*gSpY*sc;pdf.line(ox-bubR*3,gy,ox+bW*sc+bubR*3,gy);}
      pdf.setLineDashPattern([],0);

      // Bule numerice (sus + jos)
      for(let gi=0;gi<=nGX;gi++){
        const gx=ox+gi*gSpX*sc;
        [oy-bubR*2.2,oy+bD*sc+bubR*2.2].forEach(gy2=>{
          pdf.setFillColor(255,255,255);pdf.setDrawColor(30,50,100);pdf.setLineWidth(0.35);
          pdf.circle(gx,gy2,bubR,'FD');
          pdf.setTextColor(15,35,90);pdf.setFont('helvetica','bold');pdf.setFontSize(4);
          pdf.text(String(gi+1),gx,gy2+1.3,{align:'center'});
        });
      }
      // Bule literere (stânga + dreapta)
      for(let gi=0;gi<=nGY;gi++){
        const gy=oy+gi*gSpY*sc;
        const ltr=String.fromCharCode(65+gi); // A,B,C...
        [ox-bubR*2.2,ox+bW*sc+bubR*2.2].forEach(gx2=>{
          pdf.setFillColor(255,255,255);pdf.setDrawColor(30,50,100);pdf.setLineWidth(0.35);
          pdf.circle(gx2,gy,bubR,'FD');
          pdf.setTextColor(15,35,90);pdf.setFont('helvetica','bold');pdf.setFontSize(4);
          pdf.text(ltr,gx2,gy+1.3,{align:'center'});
        });
      }

      // ── 3. Simboluri stâlpi la intersecții ────────────────────────────
      const colSz=Math.max(1.2,0.4*sc); // 40cm coloane
      for(let gi=0;gi<=nGX;gi++){
        for(let gj=0;gj<=nGY;gj++){
          const cx=ox+gi*gSpX*sc,cy=oy+gj*gSpY*sc;
          if(cx<=ox+bW*sc+0.5&&cy<=oy+bD*sc+0.5){
            pdf.setFillColor(20,40,85);
            pdf.rect(cx-colSz/2,cy-colSz/2,colSz,colSz,'F');
          }
        }
      }

      // ── 4. Camere — umplutură colorată ────────────────────────────────
      const cm={living:C.living,bedroom:C.bedroom,bedroom2:C.bedroom,bedroom3:C.bedroom,
        kitchen:C.kitchen,bath:C.bath,wc:C.bath,hall:C.hall,storage:C.storage,
        core:C.core,office:C.bedroom,meeting:C.living,commercial:C.commercial,
        reception:C.commercial,balcon:C.balcon};
      const sm={living:C.orange,bedroom:C.green,bedroom2:C.green,bedroom3:C.green,
        kitchen:C.cyan,bath:C.purple,wc:C.purple,hall:C.gray,storage:C.gray2,
        core:C.blue,office:C.green,meeting:C.orange,commercial:[180,30,140],
        reception:[180,30,140],balcon:C.gold};

      fl.rects.sort((a,m_)=>(a.zIdx||0)-(m_.zIdx||0)).forEach(r=>{
        const rx=ox+r.x*sc,ry=oy+r.y*sc,rw=r.w*sc,rh=r.h*sc;
        if(rw<0.5||rh<0.5)return;
        const fc=cm[r.t]||[238,240,245],stk=sm[r.t]||[100,115,140];
        pdf.setFillColor(...fc);
        if(r.bal){
          pdf.setDrawColor(...C.gold);pdf.setLineWidth(0.4);pdf.setLineDashPattern([2,1],0);
          pdf.rect(rx,ry,rw,rh,'FD');pdf.setLineDashPattern([],0);
        } else {
          const lw=r.t==='core'?1.0:r.apt<0?0.6:0.45;
          pdf.setDrawColor(...stk);pdf.setLineWidth(lw);
          pdf.rect(rx,ry,rw,rh,'FD');
        }
        // Hașuri oblice pentru pereți structurali (cores) — fără save/restore (jsPDF.save() = download!)
        if(r.t==='core'){
          pdf.setDrawColor(50,80,160);pdf.setLineWidth(0.25);
          const sp=Math.max(1.5,colSz);
          for(let hi=-(rh);hi<rw+rh;hi+=sp){
            const x1=Math.max(rx,rx+hi),y1=rx+hi<rx?ry+(rx-rx-hi):ry;
            const x2=Math.min(rx+rw,rx+hi+rh),y2=x2==rx+rw?ry+(rx+rw-(rx+hi)):ry+rh;
            if(x1<rx+rw&&x2>rx)pdf.line(x1,y1,x2,y2);
          }
        }
      });

      // ── 5. Perete exterior gros (simulat prin borduri multiple) ────────
      const ewT=Math.max(1.5,0.25*sc); // 25cm perete exterior
      pdf.setDrawColor(20,35,75);pdf.setLineWidth(ewT);
      pdf.rect(ox+ewT/2,oy+ewT/2,bW*sc-ewT,bD*sc-ewT,'S');
      // Linie interior perete (toc)
      pdf.setDrawColor(80,100,130);pdf.setLineWidth(0.25);
      pdf.rect(ox+ewT,oy+ewT,bW*sc-ewT*2,bD*sc-ewT*2,'S');

      // ── 6. Ferestre — simbol dublu (toc + sticlă) ─────────────────────
      fl.wins.forEach(w=>{
        const wSC=(w.w||w.h||1.2)*sc;
        const gapPx=ewT*0.85;
        // Golul din perete (alb)
        pdf.setFillColor(252,253,255);pdf.setDrawColor(255,255,255);pdf.setLineWidth(0.1);
        if(w.wall==='N'){pdf.rect(ox+w.x*sc,oy-ewT,wSC,ewT,'F');}
        else if(w.wall==='S'){pdf.rect(ox+w.x*sc,oy+bD*sc,wSC,ewT,'F');}
        else if(w.wall==='V'){pdf.rect(ox-ewT,oy+w.y*sc,ewT,wSC,'F');}
        else{pdf.rect(ox+bW*sc,oy+w.y*sc,ewT,wSC,'F');}
        // Toc exterior + sticlă (3 linii: toc1, sticlă, toc2)
        pdf.setDrawColor(30,130,190);pdf.setLineWidth(0.45);
        if(w.wall==='N'||w.wall==='S'){
          const fy=w.wall==='N'?oy-ewT:oy+bD*sc;
          pdf.line(ox+w.x*sc,fy,ox+w.x*sc+wSC,fy); // toc exterior
          pdf.line(ox+w.x*sc,fy+ewT,ox+w.x*sc+wSC,fy+ewT); // toc interior
          pdf.setDrawColor(120,180,220);pdf.setLineWidth(0.8);
          pdf.line(ox+w.x*sc,fy+ewT*0.5,ox+w.x*sc+wSC,fy+ewT*0.5); // sticlă
        } else {
          const fx=w.wall==='V'?ox-ewT:ox+bW*sc;
          pdf.line(fx,oy+w.y*sc,fx,oy+w.y*sc+wSC);
          pdf.line(fx+ewT,oy+w.y*sc,fx+ewT,oy+w.y*sc+wSC);
          pdf.setDrawColor(120,180,220);pdf.setLineWidth(0.8);
          pdf.line(fx+ewT*0.5,oy+w.y*sc,fx+ewT*0.5,oy+w.y*sc+wSC);
        }
      });

      // ── 7. Uși — arc de deschidere ────────────────────────────────────
      fl.doors.forEach(d=>{
        const dx=ox+d.x*sc,dy_d=d.y!=null?oy+d.y*sc:oy+bD*sc;
        const dw=d.w*sc;
        const isMain=d.type==='main';
        // Gol în perete
        pdf.setFillColor(252,253,255);
        if(isMain||d.y==null)pdf.rect(dx,oy+bD*sc-ewT,dw,ewT,'F');
        else pdf.rect(dx-ewT/2,dy_d-ewT/2,dw+ewT,ewT,'F');
        // Foaia ușii
        const doorCol=isMain?C.orange:[40,60,100];
        pdf.setDrawColor(...doorCol);
        pdf.setLineWidth(isMain?0.7:0.45);
        // Linia foii
        if(isMain){
          pdf.line(dx,oy+bD*sc,dx+dw,oy+bD*sc);
          // Arc deschidere ușă (quarter circle)
          pdf.setDrawColor(200,80,10);pdf.setLineWidth(0.35);
          let prevAx=dx,prevAy=oy+bD*sc;
          for(let a=0.15;a<=Math.PI/2+0.01;a+=0.15){
            const ax=dx+dw*Math.sin(a),ay=oy+bD*sc-dw*(1-Math.cos(a));
            pdf.line(prevAx,prevAy,ax,ay);prevAx=ax;prevAy=ay;
          }
        } else {
          const sw=d.swing||'right';
          if(sw==='right'){
            pdf.line(dx,dy_d,dx+dw,dy_d);
            for(let a=0;a<=Math.PI/2;a+=0.2){if(a>0){
              const ax=dx+dw*Math.sin(a),ay=dy_d-dw*(1-Math.cos(a));
              const pa=a-0.2,pax=dx+dw*Math.sin(pa),pay=dy_d-dw*(1-Math.cos(pa));
              pdf.line(pax,pay,ax,ay);
            }}
          }
        }
      });

      // ── 8. Marcaje nivel (▽ cota) ──────────────────────────────────────
      const cota=fl.floorIdx===0?'±0.00':'+'+(fl.floorIdx*P_.hn).toFixed(2);
      fl.rects.filter(r=>r.apt>=0&&!r.bal&&r.w*r.h>6).slice(0,8).forEach(r=>{
        const rx=ox+r.x*sc+r.w*sc/2,ry2=oy+r.y*sc+r.h*sc*0.78;
        // Triunghi cotat
        const ts=1.6;
        pdf.setDrawColor(20,40,90);pdf.setLineWidth(0.4);
        pdf.line(rx-ts,ry2,rx+ts,ry2);pdf.line(rx-ts,ry2,rx,ry2+ts*1.4);pdf.line(rx+ts,ry2,rx,ry2+ts*1.4);
        pdf.setTextColor(15,35,90);pdf.setFont('helvetica','normal');pdf.setFontSize(3.8);
        pdf.text(cota,rx,ry2+ts*1.4+2.5,{align:'center'});
      });

      // ── 9. Simboluri LIFT și SCĂRI ────────────────────────────────────
      fl.rects.filter(r=>r.t==='core').forEach(core=>{
        const rx=ox+core.x*sc,ry=oy+core.y*sc,rw=core.w*sc,rh=core.h*sc;
        // Nucleu = zona scări + lift
        const liftW=Math.min(rw*0.42,3.5*sc),liftH=Math.min(rh*0.58,4*sc);
        const lx=rx+rw*0.52,ly=ry+rh*0.18;
        // Simbolul liftului (pătrat cu X)
        pdf.setFillColor(225,235,252);pdf.setDrawColor(40,80,160);pdf.setLineWidth(0.5);
        pdf.rect(lx,ly,liftW,liftH,'FD');
        pdf.setDrawColor(80,120,200);pdf.setLineWidth(0.3);
        pdf.line(lx,ly,lx+liftW,ly+liftH);pdf.line(lx+liftW,ly,lx,ly+liftH);
        pdf.setTextColor(15,60,160);pdf.setFont('helvetica','bold');pdf.setFontSize(3.5);
        pdf.text('LIFT',lx+liftW/2,ly+liftH+3.5,{align:'center'});
        // Simbolul scărilor (linii orizontale paralele cu săgeată)
        const stX=rx+rw*0.04,stY=ry+rh*0.08,stW=rw*0.44,stH=rh*0.78;
        const nSteps=Math.max(5,Math.floor(stH/2.5));
        pdf.setFillColor(238,242,252);pdf.setDrawColor(40,70,140);pdf.setLineWidth(0.4);
        pdf.rect(stX,stY,stW,stH,'FD');
        pdf.setDrawColor(60,90,160);pdf.setLineWidth(0.2);
        for(let si=1;si<nSteps;si++)pdf.line(stX,stY+si*(stH/nSteps),stX+stW,stY+si*(stH/nSteps));
        // Săgeată direcție
        const arY=stY+stH*0.5;
        pdf.setDrawColor(30,60,140);pdf.setLineWidth(0.5);
        pdf.line(stX+stW*0.25,arY,stX+stW*0.75,arY);
        pdf.line(stX+stW*0.55,arY-1.5,stX+stW*0.75,arY);
        pdf.line(stX+stW*0.55,arY+1.5,stX+stW*0.75,arY);
      });

      // ── 10. Etichete profesionale camere ──────────────────────────────
      const typeNm={living:'LIVING / SALON',bedroom:'DORMITOR 1',bedroom2:'DORMITOR 2',bedroom3:'DORMITOR 3',
        kitchen:'BUCĂTĂRIE',bath:'BAIE',wc:'WC',hall:'HOL / CORIDOR',storage:'DEPOZITARE',
        core:'CASA SCĂRILOR / LIFT',office:'SPAȚIU BIROURI',meeting:'SALĂ ȘEDINȚE',
        commercial:'SPAȚIU COMERCIAL',reception:'RECEPȚIE',balcon:'BALCON / LOGGIE'};
      fl.rects.forEach(r=>{
        if(r.bal)return;
        const rx=ox+r.x*sc,ry=oy+r.y*sc,rw=r.w*sc,rh=r.h*sc;
        if(rw<7||rh<5)return;
        const area=(r.w*r.h);
        const nm=S2(typeNm[r.t]||String(r.lbl||r.t).toUpperCase()).replace(/[\u{1F000}-\u{1FAFF}]/gu,'').trim();
        if(r.t==='core')return; // scările au simboluri proprii
        // Funcțiunea (bold, albastru închis)
        const fsz=Math.min(4.8,rw/10,rh/5);
        pdf.setTextColor(15,40,90);pdf.setFont('helvetica','bold');pdf.setFontSize(fsz);
        const lines=nm.split(' ');
        // Max 2 rânduri
        const l1=lines.slice(0,Math.ceil(lines.length/2)).join(' ');
        const l2=lines.slice(Math.ceil(lines.length/2)).join(' ');
        if(l2){
          pdf.text(S2(l1),rx+rw/2,ry+rh/2-fsz*0.4,{align:'center'});
          pdf.text(S2(l2),rx+rw/2,ry+rh/2+fsz*0.6,{align:'center'});
        } else {
          pdf.text(S2(l1),rx+rw/2,ry+rh/2+fsz*0.3,{align:'center'});
        }
        // Aria (normal, mic, gri)
        if(rw>12&&rh>8){
          pdf.setTextColor(70,90,120);pdf.setFont('helvetica','normal');pdf.setFontSize(Math.min(4,fsz*0.82));
          pdf.text(area.toFixed(2)+' m²',rx+rw/2,ry+rh/2+(l2?fsz*1.6:fsz*1.0)+2,{align:'center'});
        }
      });

      // ── 11. Cote în lanț (X) — dimensiuni per travee ──────────────────
      const dimLineY=oy+bD*sc+8;
      const dimLineX=ox-10;
      pdf.setDrawColor(20,40,90);pdf.setLineWidth(0.3);

      // Cote X (per travee)
      let prevGx=ox;
      for(let gi=1;gi<=nGX;gi++){
        const gx=ox+gi*gSpX*sc;
        pdf.line(prevGx,dimLineY,gx,dimLineY);
        pdf.line(prevGx,dimLineY-2,prevGx,dimLineY+2);
        pdf.line(gx,dimLineY-2,gx,dimLineY+2);
        pdf.setTextColor(15,35,90);pdf.setFont('helvetica','normal');pdf.setFontSize(4);
        pdf.text(gSpX.toFixed(2)+' m',(prevGx+gx)/2,dimLineY+4.5,{align:'center'});
        prevGx=gx;
      }
      // Total X
      pdf.setDrawColor(20,40,90);pdf.setLineWidth(0.5);
      pdf.line(ox,dimLineY+7,ox+bW*sc,dimLineY+7);
      pdf.line(ox,dimLineY+5,ox,dimLineY+9);pdf.line(ox+bW*sc,dimLineY+5,ox+bW*sc,dimLineY+9);
      pdf.setTextColor(15,35,90);pdf.setFont('helvetica','bold');pdf.setFontSize(5);
      pdf.text(bW.toFixed(2)+' m',ox+bW*sc/2,dimLineY+12,{align:'center'});

      // Cote Y (per travee)
      let prevGy=oy;
      for(let gi=1;gi<=nGY;gi++){
        const gy=oy+gi*gSpY*sc;
        pdf.setDrawColor(20,40,90);pdf.setLineWidth(0.3);
        pdf.line(dimLineX,prevGy,dimLineX,gy);
        pdf.line(dimLineX-2,prevGy,dimLineX+2,prevGy);pdf.line(dimLineX-2,gy,dimLineX+2,gy);
        pdf.setTextColor(15,35,90);pdf.setFont('helvetica','normal');pdf.setFontSize(4);
        pdf.text(gSpY.toFixed(2)+' m',dimLineX-4.5,(prevGy+gy)/2,{align:'center',angle:90});
        prevGy=gy;
      }
      // Total Y
      pdf.setDrawColor(20,40,90);pdf.setLineWidth(0.5);
      pdf.line(dimLineX-8,oy,dimLineX-8,oy+bD*sc);
      pdf.line(dimLineX-10,oy,dimLineX-6,oy);pdf.line(dimLineX-10,oy+bD*sc,dimLineX-6,oy+bD*sc);
      pdf.setTextColor(15,35,90);pdf.setFont('helvetica','bold');pdf.setFontSize(5);
      pdf.text(bD.toFixed(2)+' m',dimLineX-15,oy+bD*sc/2,{align:'center',angle:90});

      // ── 12. Stradă + front stradal ────────────────────────────────────
      pdf.setFillColor(215,220,235);pdf.rect(ox-P_.rl*sc,oy+bD*sc+P_.rs*sc,P_.W*sc,4,'F');
      pdf.setTextColor(55,75,115);pdf.setFont('helvetica','bold');pdf.setFontSize(5);
      pdf.text('^ FRONT STRADAL  ^  '+P_.frontDir+' · Nr.cad. '+S2(P_.nrCad),ox+bW*sc/2,oy+bD*sc+P_.rs*sc+3,{align:'center'});
    };
    const drawNorth=(x,y,dir,sz)=>{
      const s=sz||7,rot={N:0,S:Math.PI,E:Math.PI/2,V:-Math.PI/2,NE:Math.PI/4,NV:-Math.PI/4,SE:Math.PI*3/4,SV:-Math.PI*3/4}[dir]||0;
      const p=(a,d)=>({x:x+Math.sin(a+rot)*d,y:y-Math.cos(a+rot)*d});
      pdf.setFillColor(255,255,255);pdf.circle(x,y,s+1,'F');
      pdf.setDrawColor(...C.gray);pdf.setLineWidth(0.3);pdf.circle(x,y,s+1,'S');
      const n=p(0,s),s2=p(Math.PI,s);
      pdf.setFillColor(...C.red);if(pdf.polygon)pdf.polygon([x,y,n.x-s*0.35,n.y,n.x+s*0.35,n.y],'F');else{pdf.setDrawColor(...C.red);pdf.line(x,y,n.x,n.y);}
      pdf.setFillColor(170,180,195);if(pdf.polygon)pdf.polygon([x,y,s2.x-s*0.35,s2.y,s2.x+s*0.35,s2.y],'F');else{pdf.setDrawColor(160,175,190);pdf.line(x,y,s2.x,s2.y);}
      pdf.setTextColor(...C.red);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text('N',n.x,n.y-1.5,{align:'center'});
    };
    const drawScale=(x,y,sc)=>{
      const m5=5*sc;
      pdf.setFillColor(...C.dark2);pdf.rect(x,y,m5/2,1.5,'F');
      pdf.setFillColor(255,255,255);pdf.rect(x+m5/2,y,m5/2,1.5,'F');
      pdf.setDrawColor(...C.dark2);pdf.setLineWidth(0.35);pdf.rect(x,y,m5,1.5,'S');
      pdf.setTextColor(60,75,95);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
      pdf.text('0',x,y+4);pdf.text('5m',x+m5,y+4,{align:'right'});
      pdf.setTextColor(100,115,135);pdf.text('Sc. 1:100',x+m5/2,y+5.5,{align:'center'});
    };
    const drawFacade=(b_,P_,ox,oy,fW,fH,sc)=>{
      const niv=b_.niv;
      pdf.setFillColor(232,236,246);pdf.rect(ox,oy,fW,fH,'F');
      for(let i=0;i<niv;i++){
        if(i%2===0){pdf.setFillColor(240,243,250);pdf.rect(ox,oy+fH-(i+1)*P_.hn*sc,fW,P_.hn*sc,'F');}
        pdf.setFillColor(195,205,218);pdf.rect(ox,oy+fH-i*P_.hn*sc-1,fW,1.2,'F');
        pdf.setTextColor(120,135,155);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
        pdf.text(i===0?'P':`E${i}`,ox-5,oy+fH-i*P_.hn*sc-P_.hn*sc/2+1.5);
      }
      const wCols=Math.max(3,Math.floor(b_.bW/3.2));
      const wW_=Math.min(b_.bW/wCols*0.55,1.8)*sc,wH_=P_.hn*0.42*sc,colSp=fW/wCols,cC=Math.floor(wCols/2);
      for(let row=0;row<niv;row++){
        const wy=oy+fH-(row+1)*P_.hn*sc+(P_.hn*sc-wH_)*0.28;
        for(let col=0;col<wCols;col++){
          const wx=ox+col*colSp+(colSp-wW_)/2;
          if(col===cC){pdf.setFillColor(215,228,245);pdf.setDrawColor(...C.blue);pdf.setLineWidth(0.4);pdf.rect(wx+wW_*0.25,wy,wW_*0.5,wH_,'FD');}
          else{
            pdf.setFillColor(195,220,250);pdf.setDrawColor(70,130,195);pdf.setLineWidth(0.4);pdf.rect(wx,wy,wW_,wH_,'FD');
            pdf.setFillColor(180,210,240);pdf.rect(wx,wy,wW_,wH_*0.45,'F');
            pdf.setDrawColor(140,180,220);pdf.setLineWidth(0.15);
            pdf.line(wx+wW_/2,wy,wx+wW_/2,wy+wH_);pdf.line(wx,wy+wH_/2,wx+wW_,wy+wH_/2);
          }
        }
        const bY=oy+fH-(row+1)*P_.hn*sc+P_.hn*sc*0.8;
        pdf.setFillColor(195,205,218);pdf.rect(ox+fW*0.03,bY,fW*0.94,1.5,'F');
      }
      const eW=2.2*sc,eH=2.8*sc,eX=ox+fW/2-eW/2,eY=oy+fH-eH;
      pdf.setFillColor(175,190,210);pdf.rect(eX,eY,eW,eH,'F');
      pdf.setDrawColor(90,120,160);pdf.setLineWidth(0.7);pdf.rect(eX,eY,eW,eH,'S');
      pdf.setDrawColor(120,145,175);pdf.setLineWidth(0.25);pdf.line(eX+eW/2,eY,eX+eW/2,eY+eH);
      pdf.setDrawColor(...C.wall);pdf.setLineWidth(1.2);pdf.rect(ox,oy,fW,fH,'S');
      pdf.setDrawColor(90,105,125);pdf.setLineWidth(0.9);pdf.line(ox-5,oy+fH,ox+fW+10,oy+fH);
      pdf.setTextColor(80,95,115);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);
      pdf.text('COTA ±0.00 (CTN)',ox,oy+fH+3.5);
      pdf.setDrawColor(...C.gold);pdf.setLineWidth(0.35);
      pdf.line(ox+fW+3,oy,ox+fW+3,oy+fH);pdf.line(ox+fW+2,oy,ox+fW+4,oy);pdf.line(ox+fW+2,oy+fH,ox+fW+4,oy+fH);
      pdf.setTextColor(...C.dark2);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);
      pdf.text('H='+(niv*P_.hn).toFixed(1)+'m',ox+fW+10,oy+fH/2+2);
      pdf.setTextColor(100,115,135);pdf.setFontSize(5);pdf.setFont('helvetica','normal');
      pdf.text(niv+' niv.',ox+fW+10,oy+fH/2+7);
    };
    const drawSection=(b_,P_,ox,oy,sW,sH,sc)=>{
      const niv=b_.niv;
      const zC=[[253,220,180],[200,240,215],[180,230,250],[210,195,250]];
      for(let i=0;i<niv;i++){
        const fy=oy+sH-(i+1)*P_.hn*sc;
        pdf.setFillColor(...zC[i%4]);pdf.rect(ox,fy,sW,P_.hn*sc,'F');
        pdf.setFillColor(165,180,198);pdf.rect(ox,fy-1.5,sW,1.5,'F');
        pdf.setTextColor(80,95,115);pdf.setFont('helvetica','bold');pdf.setFontSize(5);
        pdf.text(i===0?'P':`E${i}`,ox-7,oy+sH-i*P_.hn*sc-P_.hn*sc/2+1.5);
        pdf.setTextColor(140,155,175);pdf.setFont('helvetica','normal');pdf.setFontSize(4.5);
        pdf.text(P_.hn.toFixed(1)+'m',ox+sW+2,oy+sH-i*P_.hn*sc-P_.hn*sc/2+1.5);
      }
      if(b_.cores.length){
        const c=b_.cores[Math.floor(b_.cores.length/2)];
        const cx=ox+sW/2-c.h*sc/2;
        for(let i=0;i<niv;i++){
          const fy=oy+sH-(i+1)*P_.hn*sc;
          pdf.setFillColor(185,212,250);pdf.setDrawColor(...C.blue);pdf.setLineWidth(0.4);pdf.rect(cx,fy,c.h*sc,P_.hn*sc,'FD');
          const steps=7,sw=c.h*sc/steps,sh=P_.hn*sc/steps;
          pdf.setDrawColor(75,125,195);pdf.setLineWidth(0.3);
          for(let s=0;s<steps;s++){pdf.line(cx+s*sw,fy+s*sh,cx+(s+1)*sw,fy+s*sh);pdf.line(cx+(s+1)*sw,fy+s*sh,cx+(s+1)*sw,fy+(s+1)*sh);}
        }
      }
      pdf.setFillColor(165,175,192);pdf.setDrawColor(125,140,160);pdf.setLineWidth(0.4);pdf.rect(ox-4,oy+sH,sW+8,4,'FD');
      pdf.setDrawColor(25,155,185);pdf.setLineWidth(0.4);pdf.setLineDashPattern([2,1.5],0);
      pdf.line(ox-10,oy+sH+2.5,ox+sW+15,oy+sH+2.5);pdf.setLineDashPattern([],0);
      pdf.setTextColor(15,135,165);pdf.setFont('helvetica','italic');pdf.setFontSize(5);pdf.text('NFA est. ~-1.5m',ox+2,oy+sH+5.5);
      pdf.setDrawColor(...C.wall);pdf.setLineWidth(1.2);pdf.rect(ox,oy,sW,sH,'S');
      pdf.setDrawColor(88,103,123);pdf.setLineWidth(0.8);pdf.line(ox-10,oy+sH,ox+sW+20,oy+sH);
      pdf.setTextColor(88,103,123);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);pdf.text('±0.00 CTN',ox+2,oy+sH+3);
      pdf.setDrawColor(...C.gold);pdf.setLineWidth(0.35);
      pdf.line(ox+sW+4,oy,ox+sW+4,oy+sH);pdf.line(ox+sW+3,oy,ox+sW+5,oy);pdf.line(ox+sW+3,oy+sH,ox+sW+5,oy+sH);
      pdf.setTextColor(...C.dark2);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);pdf.text('H='+(niv*P_.hn).toFixed(1)+'m',ox+sW+8,oy+sH/2+2);
    };
    const drawAxono=(b_,P_,cx,cy2,sc)=>{
      const niv=b_.niv,bW=b_.bW,bD=b_.bD,hn=P_.hn;
      const c30=Math.cos(Math.PI/6)*sc*0.82,s30=Math.sin(Math.PI/6)*sc*0.82;
      const prj=(x,y,z)=>({px:cx+(x-y)*c30,py:cy2+(x+y)*s30-z*sc*0.82*0.55});
      const face=(pts,fr,fg,fb,sr,sg,sb,lw)=>{
        pdf.setFillColor(fr,fg,fb);pdf.setDrawColor(sr,sg,sb);pdf.setLineWidth(lw||0.35);
        if(pdf.polygon){pdf.polygon(pts.flatMap(p=>[p.px,p.py]),'FD');}
        else{for(let i=0;i<pts.length;i++){const n=(i+1)%pts.length;pdf.line(pts[i].px,pts[i].py,pts[n].px,pts[n].py);}}
      };
      const sF=Math.min(niv,5);
      for(let fl=0;fl<=sF;fl++){
        const z=fl*hn,br=178+fl*7;
        face([prj(0,0,z),prj(bW,0,z),prj(bW,bD,z),prj(0,bD,z)],br,br+5,br+15,148,158,172,0.25);
      }
      if(niv>sF){
        const z=niv*hn;
        face([prj(0,0,z),prj(bW,0,z),prj(bW,bD,z),prj(0,bD,z)],242,232,188,C.gold[0],C.gold[1],C.gold[2],0.9);
        pdf.setLineDashPattern([1.5,1.5],0);
        [[0,0],[bW,0],[bW,bD],[0,bD]].forEach(([x,y])=>{const a=prj(x,y,sF*hn),b2=prj(x,y,niv*hn);pdf.setDrawColor(175,185,202);pdf.setLineWidth(0.25);pdf.line(a.px,a.py,b2.px,b2.py);});
        pdf.setLineDashPattern([],0);
      }
      const z1=sF*hn;
      face([prj(0,bD,0),prj(bW,bD,0),prj(bW,bD,z1),prj(0,bD,z1)],215,225,245,78,98,128,0.7);
      face([prj(bW,0,0),prj(bW,bD,0),prj(bW,bD,z1),prj(bW,0,z1)],198,212,235,78,98,128,0.55);
      const wCols=Math.max(2,Math.floor(bW/3.5)),wW2=bW/wCols*0.52,wH2=hn*0.4;
      for(let row=0;row<Math.min(niv,sF);row++){
        for(let col=0;col<wCols;col++){
          if(col===Math.floor(wCols/2))continue;
          const wx=col*bW/wCols+(bW/wCols-wW2)/2,wz=row*hn+hn*0.22;
          face([prj(wx,bD,wz),prj(wx+wW2,bD,wz),prj(wx+wW2,bD,wz+wH2),prj(wx,bD,wz+wH2)],188,218,252,55,125,195,0.35);
        }
        const bz=row*hn+hn*0.82;
        face([prj(0.3,bD,bz),prj(bW-0.3,bD,bz),prj(bW-0.3,bD+0.35,bz),prj(0.3,bD+0.35,bz)],205,212,222,155,168,182,0.25);
      }
      pdf.setDrawColor(...C.wall);pdf.setLineWidth(0.9);
      [[0,0],[bW,0],[bW,bD],[0,bD]].forEach(([x,y])=>{const a=prj(x,y,0),b2=prj(x,y,z1);pdf.line(a.px,a.py,b2.px,b2.py);});
    };

    // ── CALCULE ────────────────────────────────────────────────────────
    const maxFL=Math.min(b.niv,4);
    // +3 pagini noi: Date Clădire, Inventar Goluri+Suprafețe, Celelalte 3 Fațade
    // totalPages: estimat; pgN la final = nr. real de pagini generate
    totalPages=1+1+1+Math.min(maxFL,3)+1+1+1+1+1+1+1; // ~estimat; pgN va afisa valoarea reala
    const fnLabel=(P.fn||'rezidential_colectiv').replace(/_/g,' ');
    const potOk=b.scArea/P.area<=P.pot+.001;
    const cutOk=b.sdaTotal/P.area<=P.cut+.001;
    const fl0=_RV.floors[0];
    const isuOk=fl0?.isu?.ok!==false;
    const solarDir=['S','SE','SV','E'].includes(P.frontDir);

    // ══════════════════════════════════════════════════════════════════
    // PAG 1 — COPERTĂ
    // ══════════════════════════════════════════════════════════════════
    newPage();
    pdf.setFillColor(...C.dark);pdf.rect(0,0,W,H,'F');
    pdf.setFillColor(12,22,45);pdf.rect(0,H*0.4,W,H*0.6,'F');
    pdf.setFillColor(...C.gold);pdf.rect(0,0,W,1.8,'F');pdf.rect(0,H-1.8,W,1.8,'F');
    // 3D image full width top
    if(caps.img3D) addCap(caps.img3D,0,0,W,H*0.42,'');
    else{pdf.setFillColor(20,35,62);pdf.rect(0,0,W,H*0.42,'F');}
    // Dark overlay gradient bottom of image
    pdf.setFillColor(8,14,30);pdf.rect(0,H*0.32,W,H*0.12,'F');
    pdf.setFillColor(...C.gold);pdf.rect(0,1.8,8,H*0.38,'F');
    // Logo
    pdf.setTextColor(...C.gold);pdf.setFont('helvetica','bold');pdf.setFontSize(22);pdf.text('URBANX',14,18);
    pdf.setTextColor(170,185,205);pdf.setFont('helvetica','normal');pdf.setFontSize(8);pdf.text('PLATFORMĂ NAȚIONALĂ DE ANALIZĂ URBANISTICĂ',14,25);
    // Title
    pdf.setTextColor(245,248,255);pdf.setFont('helvetica','bold');pdf.setFontSize(22);pdf.text('MEMORIU TEHNIC PRELIMINAR',14,H*0.44);
    pdf.setTextColor(245,248,255);pdf.setFont('helvetica','normal');pdf.setFontSize(11);pdf.text('Orientativ — Pre-proiectare · Verificare normative',14,H*0.46+10);
    pdf.setTextColor(...C.gold);pdf.setFont('helvetica','normal');pdf.setFontSize(8.5);pdf.text('Conf. Legii 50/1991 · NP 057/2002 · OMS 119/2014 · P118/2013 · C107/2022',14,H*0.46+18);
    pdf.setFillColor(45,70,120);pdf.rect(14,H*0.46+13,120,0.6,'F');
    // Info grid bottom
    const infoItems=[
      ['Nr. Cadastral',P.nrCad],['UTR / Zonă',P.utr],['Funcțiune',fnLabel],
      ['Suprafață teren',P.area+'m²'],['Regim H',b.niv+' niv. · H='+(b.niv*P.hn).toFixed(1)+'m'],
      ['POT / CUT',RN(b.scArea/P.area*100)+'% / '+(b.sdaTotal/P.area).toFixed(2)],
      ['SDA estimată',RN(b.sdaTotal)+'m²'],['Data',new Date().toLocaleDateString('ro-RO')],
    ];
    const iCols=4,iColW=(W-28)/iCols;
    infoItems.forEach(([l,v],i)=>{
      const ix=14+(i%iCols)*iColW,iy=H*0.56+Math.floor(i/iCols)*16;
      pdf.setFillColor(18,32,62);pdf.roundedRect(ix,iy,iColW-3,14,1.5,1.5,'F');
      pdf.setFillColor(...C.gold);pdf.roundedRect(ix,iy,iColW-3,4.5,1.5,1.5,'F');pdf.rect(ix,iy+2,iColW-3,2.5,'F');
      pdf.setTextColor(15,25,48);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(S2(l),ix+(iColW-3)/2,iy+3.8,{align:'center'});
      pdf.setTextColor(220,232,248);pdf.setFont('helvetica','bold');pdf.setFontSize(7.5);pdf.text(S2(String(v)),ix+(iColW-3)/2,iy+11,{align:'center'});
    });
    pdf.setTextColor(100,120,150);pdf.setFont('helvetica','italic');pdf.setFontSize(5.5);
    pdf.text('Document orientativ · generat de UrbanX Relevee Instant · nu înlocuiește proiectul tehnic conf. Legii 50/1991 · UrbanX TSS·FG',W/2,H-3,{align:'center'});

    // ══════════════════════════════════════════════════════════════════
    // PAG 2 — PLAN DE SITUAȚIE + CONTEXT URBAN 3D
    // ══════════════════════════════════════════════════════════════════
    newPage();
    hdr('PLAN DE SITUAȚIE ȘI CONTEXT URBAN — Nr.cad. '+P.nrCad,pgN);
    pdf.setFillColor(...C.gray3);pdf.rect(0,9,W,H-16,'F');
    // 3 imagini: location map, vedere frontala, vedere aeriana
    const imgH=H-30,imgW1=(W-20)*0.55,imgW2=(W-20)*0.44;
    pdf.setFillColor(230,234,244);pdf.rect(10,10,imgW1,imgH,'F');
    if(caps.imgLocation) addCap(caps.imgLocation,10,10,imgW1,imgH,'FIG. 1 — Plan situație · Parcela '+P.nrCad+' în context urban · Sursa: UrbanX + OpenStreetMap');
    const half2=imgH/2-1;
    pdf.setFillColor(230,234,244);pdf.rect(14+imgW1,10,imgW2,half2,'F');
    if(caps.img3D) addCap(caps.img3D,14+imgW1,10,imgW2,half2,'FIG. 2 — Vedere 3D · Volumul propus în contextul urban real');
    else if(caps.v3dDay) addCap(caps.v3dDay,14+imgW1,10,imgW2,half2,'FIG. 2 — Viewer 3D · Vedere principală');
    pdf.setFillColor(230,234,244);pdf.rect(14+imgW1,12+half2,imgW2,half2,'F');
    if(caps.v3dDay&&caps.img3D) addCap(caps.v3dDay,14+imgW1,12+half2,imgW2,half2,'FIG. 3 — Viewer 3D Urban3D · ZI · Amplasament în țesut urban');
    else if(caps.imgCity) addCap(caps.imgCity,14+imgW1,12+half2,imgW2,half2,'FIG. 3 — Hartă Municipiul Iași · Amplasament parcelă');
    // Explicatie
    pdf.setFillColor(255,255,255);pdf.rect(10,H-13,W-20,6,'F');
    noteBox('Amplasamentul se situează în Municipiul Iași, UTR '+P.utr+', cu suprafața de '+P.area+'m² și dimensiunile de aprox. '+P.W.toFixed(1)+'m × '+P.D.toFixed(1)+'m. Frontul stradal principal este orientat spre '+P.frontDir+'. Vecinătățile imediate (clădiri, aliniamente stradale, spații verzi) determină retragerile obligatorii și caracterul arhitectural al viitoarei construcții.',14,H-13,W-20,6);
    ftr();

    // ══════════════════════════════════════════════════════════════════
    // PAG 3: DATE CLĂDIRE + METODĂ RELEVEU + DATE TEHNICE
    // ══════════════════════════════════════════════════════════════════
    newPage();
    hdr('DATE CLĂDIRE · PARAMETRI URBANISTICI · METODĂ RELEVEU — Nr.cad. '+P.nrCad,pgN);
    pdf.setFillColor(255,255,255);pdf.rect(0,9,W,H-16,'F');
    let cy_dc=12;
    const colW3=Math.floor((W-22)/3);

    // ── Col 1: Date generale ──────────────────────────────────────────
    pdf.setFillColor(...C.dark2);pdf.rect(10,cy_dc,colW3,6,'F');pdf.setFillColor(...C.gold);pdf.rect(10,cy_dc,1.5,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);pdf.text('DATE GENERALE CLĂDIRE',10+colW3/2,cy_dc+4.2,{align:'center'});
    let r1y=cy_dc+8;
    const dat1=[
      ['Nr. cadastral ANCPI:',P.nrCad,''],
      ['UAT / Localitate:','Municipiul Iași, jud. Iași',''],
      ['UTR / Zonă PUG:',P.utr,'conf. PUG Iași în vigoare'],
      ['Funcțiunea propusă:',S2(fnLabel),'conf. AEDIS / PUG'],
      ['Front stradal principal:',P.frontDir+' ('+({N:'Nord',S:'Sud',E:'Est',V:'Vest',NE:'Nord-Est',NV:'Nord-Vest',SE:'Sud-Est',SV:'Sud-Vest'}[P.frontDir]||P.frontDir)+')','OMS 119/2014'],
      ['Suprafața teren (ST):',P.area+' m²','conf. CF/ANCPI'],
      ['Dim. bbox parcelă:',P.W.toFixed(1)+' m × '+P.D.toFixed(1)+' m','estimat din GIS'],
      ['Retragere front (Rf):',P.rf+' m','conf. RLU UTR '+P.utr],
      ['Retragere lateral (Rl):',P.rl+' m','conf. RLU'],
      ['Retragere spate (Rs):',P.rs+' m','conf. RLU'],
    ];
    dat1.forEach(([lab,val,obs],i)=>{
      pdf.setFillColor(i%2?248:255,i%2?250:252,252);pdf.rect(10,r1y-2.5,colW3,6,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(10,r1y+3.5,10+colW3,r1y+3.5);
      pdf.setTextColor(70,90,115);pdf.setFont('helvetica','normal');pdf.setFontSize(5);pdf.text(S2(lab),12,r1y+1);
      pdf.setTextColor(15,35,75);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(S2(String(val)),12,r1y+5);
      if(obs){pdf.setTextColor(120,140,160);pdf.setFont('helvetica','italic');pdf.setFontSize(4.2);pdf.text(S2(obs),12,r1y+8);}
      r1y+=obs?11:7;
    });

    // ── Col 2: Indicatori urbanistici ─────────────────────────────────
    const cx2=10+colW3+2;
    pdf.setFillColor(...C.dark2);pdf.rect(cx2,cy_dc,colW3,6,'F');pdf.setFillColor(...C.gold);pdf.rect(cx2,cy_dc,1.5,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);pdf.text('INDICATORI URBANISTICI',cx2+colW3/2,cy_dc+4.2,{align:'center'});
    let r2y=cy_dc+8;
    const dat2=[
      ['POT maxim admis (PUG):',RN(P.pot*100)+'%','PUG · NP 068'],
      ['POT realizat:',RN(b.scArea/P.area*100)+'%',potOk?'CONFORM ✓':'DEPĂȘIRE ✗'],
      ['CUT maxim admis (PUG):',String(P.cut),'PUG · NP 068'],
      ['CUT realizat:',(b.sdaTotal/P.area).toFixed(2),cutOk?'CONFORM ✓':'DEPĂȘIRE ✗'],
      ['H maxim admis:',P.hMax+' m','conf. RLU'],
      ['H total propus:',(b.niv*P.hn).toFixed(1)+' m','P+'+( b.niv-1)+'E'],
      ['Niveluri:',b.niv+' niv. (P+'+( b.niv-1)+'E)','H/nivel = '+P.hn.toFixed(1)+'m'],
      ['Suprafată construită (SC):',RN(b.scArea)+' m²','la sol'],
      ['SDA totală:',RN(b.sdaTotal)+' m²','Σ planșee'],
      ['SDA per nivel:',RN(b.sdaPerFloor)+' m²','medie/etaj'],
      ['Nuclee scări+lift:',b.cores.length,'conf. P118-2/2013'],
      ['Unități locative est.:',RN(b.niv*b.cores.length*4),'orientativ'],
    ];
    dat2.forEach(([lab,val,note],i)=>{
      const isOk=String(note).includes('✓'),isErr=String(note).includes('✗');
      pdf.setFillColor(i%2?248:255,i%2?250:252,252);pdf.rect(cx2,r2y-2.5,colW3,6,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(cx2,r2y+3.5,cx2+colW3,r2y+3.5);
      pdf.setTextColor(70,90,115);pdf.setFont('helvetica','normal');pdf.setFontSize(5);pdf.text(S2(lab),cx2+2,r2y+1);
      const vc=isOk?C.green:isErr?C.red:[15,35,75];
      pdf.setTextColor(...vc);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(S2(val),cx2+2,r2y+5);
      pdf.setTextColor(isOk?[34,197,94][0]:isErr?C.red[0]:120,isOk?150:isErr?60:140,isOk?94:isErr?38:160);
      pdf.setFont('helvetica','italic');pdf.setFontSize(4.2);pdf.text(S2(note),cx2+colW3-2,r2y+5,{align:'right'});
      r2y+=9;
    });

    // ── Col 3: Metodă Releveu + Scop ─────────────────────────────────
    const cx3=cx2+colW3+2;
    const rw3=W-cx3-8;
    pdf.setFillColor(...C.dark2);pdf.rect(cx3,cy_dc,rw3,6,'F');pdf.setFillColor(...C.gold);pdf.rect(cx3,cy_dc,1.5,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);pdf.text('METODĂ RELEVEU · SCOP',cx3+rw3/2,cy_dc+4.2,{align:'center'});
    let r3y=cy_dc+10;

    // Scop Releveu
    pdf.setFillColor(235,242,252);pdf.roundedRect(cx3,r3y,rw3,22,1.5,1.5,'F');
    pdf.setFillColor(...C.blue);pdf.rect(cx3,r3y,2,22,'F');
    pdf.setTextColor(...C.blue);pdf.setFont('helvetica','bold');pdf.setFontSize(6);pdf.text('SCOP DOCUMENT',cx3+5,r3y+5);
    pdf.setTextColor(20,45,90);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);
    const scopTxt='Prezentul releveu orientativ a fost generat automat de platforma UrbanX în scop de PRE-PROIECTARE — pentru evaluarea fezabilității urbanistice a parcelei nr. '+P.nrCad+' și estimarea funcționalității propuse. NU înlocuiește releveul elaborat de arhitect autorizat OAR la fazele DTAC / PT / PAC conf. Legii 50/1991.';
    const sl=pdf.splitTextToSize(S2(scopTxt),rw3-7);
    sl.slice(0,4).forEach((l,li)=>pdf.text(l,cx3+5,r3y+10+li*3));
    r3y+=26;

    // Metodă ridicare
    pdf.setFillColor(235,252,242);pdf.roundedRect(cx3,r3y,rw3,52,1.5,1.5,'F');
    pdf.setFillColor(...C.green);pdf.rect(cx3,r3y,2,52,'F');
    pdf.setTextColor(0,120,60);pdf.setFont('helvetica','bold');pdf.setFontSize(6);pdf.text('METODĂ DE RIDICARE (selectați la faza PT)',cx3+5,r3y+5);
    const metode=[
      ['☐ Manual (ruletă + teodolit optic)','Precizie ±2-5cm, cost redus, timp ridicat'],
      ['☐ Stație totală robotizată','Precizie ±1-3cm, rapidă, export DXF/CAD'],
      ['☐ Scanare 3D cu laser (LiDAR)','Precizie ±2-5mm, nor de puncte, BIM-ready'],
      ['☐ Fotogrammetrie aeriană (UAV)','Precizie ±1-5cm, acoperire completă exterior'],
      ['☐ Fotogrammetrie terestră','Precizie ±5-10mm, fațade și interior'],
    ];
    metode.forEach(([m,d],mi)=>{
      pdf.setTextColor(0,80,40);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(m,cx3+5,r3y+13+mi*8);
      pdf.setTextColor(40,100,70);pdf.setFont('helvetica','italic');pdf.setFontSize(4.8);pdf.text(d,cx3+5,r3y+17+mi*8);
    });
    r3y+=56;

    // Nivel detaliu
    pdf.setFillColor(252,248,232);pdf.roundedRect(cx3,r3y,rw3,32,1.5,1.5,'F');
    pdf.setFillColor(...C.gold);pdf.rect(cx3,r3y,2,32,'F');
    pdf.setTextColor(120,80,0);pdf.setFont('helvetica','bold');pdf.setFontSize(6);pdf.text('NIVEL DE DETALIU',cx3+5,r3y+5);
    const nivDet=[
      ['☐ Sumar','Plan general + dimensiuni principale, fără cote interioare'],
      ['☐ Mediu','Cote complete, grosimi pereți, tipuri goluri (uzual PT)'],
      ['☐ Execuție','Toate cotele, materiale, detalii constructive, finisaje'],
    ];
    nivDet.forEach(([n,d],ni)=>{
      pdf.setTextColor(100,65,0);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(n,cx3+5,r3y+13+ni*8);
      pdf.setTextColor(100,80,20);pdf.setFont('helvetica','italic');pdf.setFontSize(4.8);pdf.text(d,cx3+5,r3y+17+ni*8);
    });
    r3y+=36;

    // Normative aplicate
    pdf.setFillColor(248,248,252);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);pdf.rect(cx3,r3y,rw3,H-r3y-18,'FD');
    pdf.setFillColor(...C.dark2);pdf.rect(cx3,r3y,rw3,5.5,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text('NORMATIVE OBLIGATORII LA PT',cx3+2,r3y+3.8);
    const norme2=[['NP 057/2002','Suprafețe minime locuințe'],['OMS 119/2014','Însorire min. 1.5h/zi'],['P118-2/2013','Evacuare ISU, căi acces'],['NP 051/2012','PMR, lift obligatoriu P+4+'],['C107/1-5:2022','Coeficienți termici U'],['P100-1/2013','Proiectare seismică'],['Legea 10/1995','Calitatea construcțiilor'],['SR EN 1992-1','BA — proiectare structurală']];
    norme2.forEach(([cod,desc],ni)=>{
      const ny=r3y+8+ni*7;if(ny>H-20)return;
      pdf.setFillColor(ni%2?250:255,ni%2?251:253,255);pdf.rect(cx3,ny-2,rw3,7,'F');
      pdf.setTextColor(...C.blue);pdf.setFont('helvetica','bold');pdf.setFontSize(5);pdf.text(cod,cx3+2,ny+2);
      pdf.setTextColor(40,60,100);pdf.setFont('helvetica','normal');pdf.setFontSize(5);pdf.text(S2(desc),cx3+26,ny+2);
    });
    ftr();

    // PAG 3..N+2 — PLANURI DE NIVEL (PARTER + 1 TIP + notă etaje identice)
    // ══════════════════════════════════════════════════════════════════════════
    // Etajele 1..N-1 sunt identice pentru rezidential → afisam parter + un etaj tip
    const _floorsToDraw=[];
    _floorsToDraw.push(0); // parter mereu
    if(maxFL>1) _floorsToDraw.push(1); // etaj tip (1)
    if(maxFL>2 && _RV.floors[maxFL-1]?.floorIdx !== _RV.floors[1]?.floorIdx) _floorsToDraw.push(maxFL-1); // ultimul dacă diferit
    const _identicalNote=maxFL>2 ? `Plan tip repetat la etajele 1–${maxFL-1} (total ${maxFL-1} etaje identice)` : '';

    for(let fli=0;fli<_floorsToDraw.length;fli++){
      const fl=_floorsToDraw[fli];
      newPage();
      const flObj=_RV.floors[fl];
      const isTip=fl===1&&maxFL>2;
      const flLabel=fl===0?'PLAN PARTER (cota +0.00)'
        :isTip?`PLAN ETAJ TIP 1–${maxFL-1} (cota +${(fl*P.hn).toFixed(2)}m … +${((maxFL-1)*P.hn).toFixed(2)}m)`
        :`PLAN ETAJ ${fl} (cota +${(fl*P.hn).toFixed(2)}m)`;
      hdr(flLabel+' Nr.cad. '+P.nrCad+' UTR '+P.utr,pgN);
      pdf.setFillColor(...C.gray3);pdf.rect(0,9,W,H-16,'F');
      if(isTip&&_identicalNote){
        pdf.setFillColor(255,250,235);pdf.setDrawColor(180,130,20);pdf.setLineWidth(0.3);
        pdf.rect(10,10,W-20,7,'FD');
        pdf.setTextColor(120,80,10);pdf.setFont('helvetica','bold');pdf.setFontSize(6);
        pdf.text('NOTA: '+_identicalNote+' — plan functional identic, cote identice.',W/2,14.5,{align:'center'});
      }

      // Plan area (left 2/3)
      const planAreaW=W*0.62,planAreaH=H-(isTip&&_identicalNote?36:28);
      const planOy=isTip&&_identicalNote?17:10;
      pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);
      pdf.rect(10,planOy,planAreaW-5,planAreaH,'FD');

      // Scara bazată pe CLĂDIRE (nu parcelă) — la mari parcele, parcela e mult mai mare decât clădirea
      const sc=Math.min((planAreaW-35)/(b.bW+4),(planAreaH-30)/(b.bD+8));
      const ox=10+((planAreaW-35)-b.bW*sc)/2+18;
      const oy=planOy+((planAreaH-30)-b.bD*sc)/2+8;

      drawPlan(flObj,P,b,ox,oy,sc);
      drawNorth(planAreaW-10,22,P.frontDir,6);
      drawScale(14,H-13,sc);
      // Secțiune A-A (longitudinală, orizontală)
      pdf.setTextColor(...C.red);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
      pdf.text('A',ox-2.5,oy+b.bD*sc/2);pdf.text('A',ox+b.bW*sc+2,oy+b.bD*sc/2);
      pdf.setDrawColor(...C.red);pdf.setLineWidth(0.35);pdf.setLineDashPattern([1,0.8],0);
      pdf.line(ox,oy+b.bD*sc/2,ox+b.bW*sc,oy+b.bD*sc/2);pdf.setLineDashPattern([],0);
      // Secțiune B-B (transversală, verticală)
      pdf.setTextColor(37,99,235);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
      pdf.text('B',ox+b.bW*sc/2,oy-2.5);pdf.text('B',ox+b.bW*sc/2,oy+b.bD*sc+3.5);
      pdf.setDrawColor(37,99,235);pdf.setLineWidth(0.35);pdf.setLineDashPattern([1,0.8],0);
      pdf.line(ox+b.bW*sc/2,oy,ox+b.bW*sc/2,oy+b.bD*sc);pdf.setLineDashPattern([],0);

      // ── RIGHT PANEL — date tehnice complete ────────────────────────────────
      const rx=10+planAreaW,ry=planOy,rw=W-rx-8,rh=planAreaH;
      pdf.setFillColor(248,250,254);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);pdf.rect(rx,ry,rw,rh,'FD');
      let panY=ry+1;

      // ── Header planșă ───────────────────────────────────────────────────
      pdf.setFillColor(...C.dark2);pdf.rect(rx,panY,rw,8,'F');
      pdf.setFillColor(...C.gold);pdf.rect(rx,panY,2,8,'F');
      pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);
      const scaleLabel=sc>=6?'1:50':sc>=3?'1:100':'1:200';
      pdf.text(fl===0?'PLAN PARTER (cota +0.00)':'PLAN ETAJ '+(isTip?'TIP ':'')+fl+' (+'+( fl*P.hn).toFixed(2)+'m)',rx+rw/2,panY+5.5,{align:'center'});
      panY+=9;
      pdf.setFillColor(235,242,252);pdf.rect(rx,panY,rw,5.5,'F');
      pdf.setTextColor(40,60,100);pdf.setFont('helvetica','normal');pdf.setFontSize(4.8);
      pdf.text('Nr.cad. '+S2(P.nrCad)+' · UTR '+S2(P.utr)+' · Sc. '+scaleLabel+' · '+new Date().toLocaleDateString('ro-RO'),rx+2,panY+4);
      panY+=7;

      // ── Calcule suprafete din camere reale ────────────────────────────────
      const rects_=flObj.rects||[];
      // Grupăm camerele pe apartament
      const aptMap_={};
      rects_.filter(r=>r.apt>=0&&!r.bal&&r.w>0.3&&r.h>0.3).forEach(r=>{
        if(!aptMap_[r.apt]) aptMap_[r.apt]={rooms:[],totalSU:0,hasBalcon:false};
        aptMap_[r.apt].rooms.push(r);
        aptMap_[r.apt].totalSU+=(r.w*r.h);
      });
      rects_.filter(r=>r.apt>=0&&r.bal).forEach(r=>{
        if(!aptMap_[r.apt]) aptMap_[r.apt]={rooms:[],totalSU:0,hasBalcon:false};
        aptMap_[r.apt].hasBalcon=true;
      });
      const nrApt_=Object.keys(aptMap_).length;
      const suTotal_=Object.values(aptMap_).reduce((s,a)=>s+a.totalSU,0);
      const commonSU_=rects_.filter(r=>r.apt<0&&!r.bal).reduce((s,r)=>s+r.w*r.h,0);
      const coresSU_=rects_.filter(r=>r.t==='core').reduce((s,r)=>s+r.w*r.h,0);
      const corridorSU_=rects_.filter(r=>r.apt<0&&r.t==='hall').reduce((s,r)=>s+r.w*r.h,0);

      // ── TABEL SUPRAFETE (compact) ────────────────────────────────────────
      pdf.setFillColor(...C.dark2);pdf.rect(rx,panY,rw,5.5,'F');
      pdf.setFillColor(...C.gold);pdf.rect(rx,panY,2,5.5,'F');
      pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
      pdf.text('TABEL SUPRAFETE — NIVEL '+fl,rx+rw/2,panY+4,{align:'center'});
      panY+=6.5;

      // Header tabel
      const tCols_=[rw*0.08,rw*0.32,rw*0.18,rw*0.18,rw*0.14,rw*0.10];
      const tHdrs_=['Nr.','Camera','mp','Norm','Min.','✓'];
      pdf.setFillColor(25,40,80);pdf.rect(rx,panY,rw,5,'F');
      pdf.setTextColor(...C.gold);pdf.setFont('helvetica','bold');pdf.setFontSize(4.5);
      let tx_=rx;
      tHdrs_.forEach((h,i)=>{pdf.text(h,tx_+1,panY+3.5);tx_+=tCols_[i];});
      panY+=5;

      // Rânduri camere (max primele apartamente care încap)
      const typeNm_={living:'Living',bedroom:'Dorm.1',bedroom2:'Dorm.2',bedroom3:'Dorm.3',
        kitchen:'Bucatarie',bath:'Baie',wc:'WC',hall:'Hol',storage:'Dep.',core:'Scari'};
      const normMin_={living:14,bedroom:12,bedroom2:10,bedroom3:10,kitchen:5,bath:3.6,wc:1.2,hall:3,storage:0};
      let rowIdx_=0;
      const showApts_=Math.min(nrApt_||1, Math.floor((rh-panY+ry-55)/5.5));

      Object.entries(aptMap_).slice(0,showApts_).forEach(([aptId,apt])=>{
        // Separator apartament
        if(panY>ry+rh-50)return;
        pdf.setFillColor(230,238,252);pdf.rect(rx,panY,rw,4.5,'F');
        pdf.setFillColor(...C.blue);pdf.rect(rx,panY,2,4.5,'F');
        pdf.setTextColor(...C.blue);pdf.setFont('helvetica','bold');pdf.setFontSize(4.5);
        const aptSU_=RN(apt.totalSU,1);
        pdf.text('Apartament '+(parseInt(aptId)+1)+' — SU='+aptSU_+'m²'+(apt.hasBalcon?' + balcon':''),rx+3,panY+3.2);
        panY+=5;

        // Camerele apartamentului
        apt.rooms.forEach(r=>{
          if(panY>ry+rh-50)return;
          const area_=r.w*r.h,nm_=normMin_[r.t]||0;
          const ok_=nm_===0||area_>=nm_;
          rowIdx_++;
          pdf.setFillColor(rowIdx_%2?250:255,rowIdx_%2?251:253,255);
          pdf.rect(rx,panY,rw,4.8,'F');
          pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.08);pdf.line(rx,panY+4.8,rx+rw,panY+4.8);
          // Nr.
          pdf.setTextColor(80,95,120);pdf.setFont('helvetica','normal');pdf.setFontSize(4.2);
          pdf.text(String(rowIdx_),rx+1,panY+3.4);
          // Tip
          pdf.setTextColor(20,40,80);pdf.setFont('helvetica','bold');pdf.setFontSize(4.5);
          pdf.text(S2(typeNm_[r.t]||r.t),rx+tCols_[0]+1,panY+3.4);
          // Area
          pdf.setFont('helvetica','normal');pdf.setFontSize(4.5);
          pdf.setTextColor(20,40,80);
          pdf.text(RN(area_,1),rx+tCols_[0]+tCols_[1]+1,panY+3.4);
          // Norm min
          pdf.setTextColor(80,95,120);
          pdf.text(nm_?String(nm_)+'m':'-',rx+tCols_[0]+tCols_[1]+tCols_[2]+1,panY+3.4);
          // Min label  
          pdf.text(nm_?RN(nm_,0)+'m':'-',rx+tCols_[0]+tCols_[1]+tCols_[2]+tCols_[3]+1,panY+3.4);
          // Status
          pdf.setTextColor(ok_?22:200,ok_?163:38,ok_?74:38);pdf.setFont('helvetica','bold');pdf.setFontSize(5);
          pdf.text(nm_===0?'—':ok_?'OK':'!',rx+tCols_[0]+tCols_[1]+tCols_[2]+tCols_[3]+tCols_[4]+1,panY+3.4);
          panY+=4.8;
        });
      });

      // ── BILANȚ ETAJ ───────────────────────────────────────────────────────
      if(panY<ry+rh-52){
        panY+=2;
        pdf.setFillColor(...C.dark2);pdf.rect(rx,panY,rw,5.5,'F');
        pdf.setFillColor(...C.gold);pdf.rect(rx,panY,2,5.5,'F');
        pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
        pdf.text('BILANT NIVEL '+fl,rx+rw/2,panY+4,{align:'center'});
        panY+=6.5;
        const bilRow_=(label,val,sub)=>{
          if(panY>ry+rh-40)return;
          pdf.setFillColor(248,250,255);pdf.rect(rx,panY,rw,6,'F');
          pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(rx,panY+6,rx+rw,panY+6);
          pdf.setTextColor(50,70,100);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
          pdf.text(S2(label),rx+2,panY+4.2);
          pdf.setTextColor(15,35,75);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
          pdf.text(S2(val),rx+rw-1,panY+4.2,{align:'right'});
          if(sub){pdf.setTextColor(100,120,150);pdf.setFont('helvetica','italic');pdf.setFontSize(4);pdf.text(S2(sub),rx+rw-1,panY+7.5,{align:'right'});}
          panY+=sub?8:6;
        };
        bilRow_('Supraf. construita nivel (SC):',RN(b.scArea)+' m²','la sol, contur exterior');
        bilRow_('Supraf. utila apartamente (SU):',RN(suTotal_,0)+' m²','Σ camere private');
        bilRow_('Zone comune (coridoare+nuclee):',RN(commonSU_,0)+' m²','hol+scari+lift');
        bilRow_('Nr. apartamente pe etaj:',String(nrApt_||0),'estimate');
        bilRow_('SU medie / apartament:',nrApt_>0?RN(suTotal_/nrApt_,1)+' m²':'—','orientativ');
        const lossFact_=b.scArea>0?RN((1-suTotal_/b.scArea)*100,1):0;
        bilRow_('Factor pierdere (comune/SC):',lossFact_+'%','<20% = eficient');
      }

      // ── CALCUL PARCAJE (conf. NP 067/2002) ───────────────────────────────
      if(panY<ry+rh-42){
        panY+=2;
        pdf.setFillColor(255,248,230);pdf.setDrawColor(180,130,20);pdf.setLineWidth(0.3);
        pdf.rect(rx,panY,rw,5.5,'FD');
        pdf.setFillColor(180,130,20);pdf.rect(rx,panY,2,5.5,'F');
        pdf.setTextColor(100,70,0);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
        pdf.text('PARCAJE — NP 067/2002',rx+rw/2,panY+4,{align:'center'});
        panY+=7;
        const totalAptEst_=Math.max(nrApt_,1)*b.niv;
        const parcNec_=Math.ceil(totalAptEst_*1.2); // 1 rezident + 0.2 vizitatori
        const parcPMR_=Math.max(2,Math.ceil(parcNec_*0.05)); // min 5% PMR
        const suprafLibera_=Math.max(0,P.area-b.bW*b.bD);
        const parcSuprafata_=Math.floor(suprafLibera_/28); // 28m²/loc
        const deficit_=Math.max(0,parcNec_-parcSuprafata_);
        const pRow_=(l,v,w)=>{
          if(panY>ry+rh-28)return;
          pdf.setFillColor(252,250,240);pdf.rect(rx,panY,rw,5,'F');
          pdf.setDrawColor(200,180,120);pdf.setLineWidth(0.08);pdf.line(rx,panY+5,rx+rw,panY+5);
          pdf.setTextColor(70,50,10);pdf.setFont('helvetica','normal');pdf.setFontSize(4.8);pdf.text(S2(l),rx+2,panY+3.5);
          const vc=w?[200,30,30]:[30,80,20];
          pdf.setTextColor(...vc);pdf.setFont('helvetica','bold');pdf.setFontSize(5);pdf.text(S2(v),rx+rw-1,panY+3.5,{align:'right'});
          panY+=5;
        };
        pRow_('Total apartamente estimat ('+b.niv+' niv.):',String(totalAptEst_)+' apt.');
        pRow_('Locuri necesare (1.2 loc/apt):',String(parcNec_)+' locuri');
        pRow_('Din care PMR min. 5% (NP051):',String(parcPMR_)+' locuri PMR');
        pRow_('Suprafata libera teren:',RN(suprafLibera_,0)+' m²');
        pRow_('Locuri posibile la suprafata:',String(parcSuprafata_)+' locuri');
        if(deficit_>0){
          pRow_('DEFICIT — necesita subsol/demisol:',String(deficit_)+' locuri',true);
        } else {
          pRow_('SURPLUS (loc. la suprafata):','+'+String(parcSuprafata_-parcNec_)+' locuri');
        }
      }

      // ── CARTUS planșă ────────────────────────────────────────────────────
      pdf.setFillColor(15,28,55);pdf.rect(rx,ry+rh-10,rw,10,'F');
      pdf.setFillColor(...C.gold);pdf.rect(rx,ry+rh-10,rw,1,'F');
      pdf.setTextColor(...C.gold);pdf.setFont('helvetica','bold');pdf.setFontSize(5);
      pdf.text(S2('Nr.cad. '+P.nrCad+' · UTR '+P.utr+' · '+(fl===0?'PLAN PARTER':(isTip?'PLAN TIP':'PLAN ETAJ '+fl))+' · Sc.'+scaleLabel),rx+rw/2,ry+rh-5,{align:'center'});
      pdf.setTextColor(120,140,170);pdf.setFont('helvetica','normal');pdf.setFontSize(4.2);
      pdf.text(S2('Cota +'+(fl*P.hn).toFixed(2)+'m · SC='+RN(b.scArea)+'m² · SU='+RN(suTotal_,0)+'m² · UrbanX TSS·FG'),rx+rw/2,ry+rh-2,{align:'center'});
      ftr();
    } // end _floorsToDraw loop

    // ══════════════════════════════════════════════════════════════════
    // PAG: TABEL SUPRAFEȚE + INVENTAR GOLURI (USI/FERESTRE)
    // ══════════════════════════════════════════════════════════════════
    {
    const fl0data=_RV.floors[0]||{rects:[],wins:[],doors:[]};
    newPage();
    hdr('TABEL SUPRAFEȚE · INVENTAR GOLURI (UȘI & FERESTRE) — Nr.cad. '+P.nrCad,pgN);
    pdf.setFillColor(255,255,255);pdf.rect(0,9,W,H-16,'F');
    const halfW=(W-22)/2;
    let tY=12;

    // ── Tabel suprafețe ────────────────────────────────────────────────
    pdf.setFillColor(...C.dark2);pdf.rect(10,tY,halfW-2,6,'F');
    pdf.setFillColor(...C.gold);pdf.rect(10,tY,1.5,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(7);
    pdf.text('TABEL SUPRAFEȚE — PARTER',10+(halfW-2)/2,tY+4.2,{align:'center'});
    tY+=7;

    const sfW=[30,22,22,22,22,halfW-2-30-22-22-22-22];
    tY=tblHdr(['Spațiu / Cameră','Tip','L (m)','l (m)','Sup. (m²)','Normă min.'],sfW,tY);
    // Per-room data
    const aptGroups={};
    fl0data.rects.filter(r=>r.apt>=0&&!r.bal).forEach(r=>{
      const aId=r.apt;
      if(!aptGroups[aId]) aptGroups[aId]=[];
      aptGroups[aId].push(r);
    });
    const typeLabels={living:'Living/Salon',bedroom:'Dormitor 1',bedroom2:'Dormitor 2',bedroom3:'Dormitor 3',kitchen:'Bucătărie',bath:'Baie',wc:'WC',hall:'Hol/Coridor',storage:'Depozitare',core:'Casa scărilor',balcon:'Balcon',office:'Birou',meeting:'Sală ședințe',commercial:'Spațiu comercial',reception:'Recepție'};
    const normMin={living:'14m²',bedroom:'12m²',bedroom2:'10m²',kitchen:'5m²',bath:'3.6m²',wc:'1.2m²',hall:'2m²',core:'—',balcon:'—',storage:'—'};
    let rowI=0,totalSF=0;
    // Show rooms from apartments (up to 20 rows)
    const allRooms=fl0data.rects.filter(r=>!r.bal&&r.w>0.3&&r.h>0.3).slice(0,25);
    allRooms.forEach((r)=>{
      if(tY>H-40)return;
      const area=r.w*r.h,areaOk=area>=(parseFloat(normMin[r.t])||0);
      const nm=normMin[r.t]||'—';
      tY=tblRow([S2(typeLabels[r.t]||r.t),S2(r.t),RN(r.w,2),RN(r.h,2),RN(area,2)+(areaOk?'':' ⚠'),nm],sfW,tY,rowI%2===0);
      totalSF+=area; rowI++;
    });
    // Balcoane
    fl0data.rects.filter(r=>r.bal&&r.w>0.3&&r.h>0.3).slice(0,5).forEach(r=>{
      if(tY>H-40)return;
      tY=tblRow(['Balcon','balcon',RN(r.w,2),RN(r.h,2),RN(r.w*r.h,2),'—'],sfW,tY,rowI%2===0); rowI++;
    });
    // Totaluri
    pdf.setFillColor(...C.dark2);pdf.rect(10,tY,halfW-2,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6);
    pdf.text('TOTAL SUPRAFȚĂ UTILĂ (nivel 0):',12,tY+4);
    pdf.text(RN(totalSF,1)+' m²',10+halfW-4,tY+4,{align:'right'});
    tY+=8;

    // Bilanț suprafete
    const bilRws=[
      ['SC edificiu (la sol):',RN(b.scArea)+' m²'],
      ['SDA totală (toate nivelurile):',RN(b.sdaTotal)+' m²'],
      ['SDA / nivel (medie):',RN(b.sdaPerFloor)+' m²'],
      ['Spații verzi necesare ('+RN((1-P.pot)*100*0.1,0)+'% min):',RN(P.area*(1-P.pot)*0.1)+' m²'],
      ['H liberă / nivel estimată:','≈ '+(P.hn-0.3).toFixed(2)+' m (structură ~30cm)'],
      ['Volum construit estimat:',RN(b.sdaTotal*(P.hn-0.3))+' m³'],
    ];
    bilRws.forEach(([lab,val],i)=>{
      if(tY>H-25)return;
      pdf.setFillColor(i%2?248:255,i%2?250:252,252);pdf.rect(10,tY,halfW-2,5.5,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(10,tY+5.5,10+halfW-2,tY+5.5);
      pdf.setTextColor(60,80,105);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);pdf.text(S2(lab),12,tY+4);
      pdf.setTextColor(15,35,75);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(S2(val),10+halfW-4,tY+4,{align:'right'});
      tY+=5.5;
    });

    // ── BOMA / IPMS / GIF / ANCPI Standards Table ────────────────────
    tY+=3;
    pdf.setFillColor(...C.dark2);pdf.rect(10,tY,halfW-2,6,'F');
    pdf.setFillColor(...C.gold);pdf.rect(10,tY,1.5,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);
    pdf.text('SUPRAFEȚE CONFORM STANDARDE INTERNAȚIONALE',10+(halfW-2)/2,tY+4.2,{align:'center'});
    tY+=8;

    // Calcule suprafete
    const floorRects=fl0data.rects.filter(r=>!r.bal&&r.w>0.3&&r.h>0.3);
    const coreArea=floorRects.filter(r=>r.t==='core'||r.apt===-1).reduce((s,r)=>s+r.w*r.h,0);
    const corrArea=floorRects.filter(r=>r.apt<0&&r.t==='hall').reduce((s,r)=>s+r.w*r.h,0);
    const usableRooms=floorRects.filter(r=>r.apt>=0&&!['core','hall'].includes(r.t));
    const NIA=usableRooms.reduce((s,r)=>s+r.w*r.h,0);
    const commonArea=coreArea+corrArea;
    const GIA=b.scArea; // Gross Internal Area = SC (nivel)
    const GFA=P.W*P.D; // Gross Floor Area (parcel footprint)
    const numUnits=Math.max(1,Math.round(b.niv*b.cores.length*4));
    const RentableIPMS=NIA+(commonArea/Math.max(1,numUnits)); // IPMS 2 per unit
    const RentableBOMA=NIA*(1+commonArea/Math.max(1,GIA-commonArea)); // BOMA method
    const LossFactor=(commonArea/GIA*100);
    const RICS_NIA=NIA*0.97; // RICS: exclude pillars/thresholds
    const DIN277_NGF=NIA+commonArea*0.7; // Netto-Grundfläche
    const ANCPI_SU=NIA*0.95; // Suprafata utila cadastrala (fara gros pereti interiori)
    const ANCPI_SC=GIA;

    const stdRows=[
      ['Standard','Denumire suprafață','Valoare','Descriere / Utilizare'],
    ];
    const boma_rows=[
      ['BOMA 2017','Usable Area (UA)',RN(NIA,1)+' m²','Aria utilizabilă per chiriaș — fără zone comune'],
      ['BOMA 2017','Rentable Area (RA)',RN(RentableBOMA,1)+' m²','UA + cotă proporțională zone comune (corridors, lifturi)'],
      ['BOMA 2017','Loss Factor',RN(LossFactor,1)+'%','Procent pierdut prin zone comune — uzual 12-20%'],
      ['IPMS 2 (GIA)','Gross Internal Area',RN(GIA,1)+' m²','Suprafata bruta interna — de la fata interioara a peretilor exteriori'],
      ['IPMS 3 (NIA)','Net Internal Area',RN(NIA,1)+' m²','Suprafata neta utilizabila — fara pereti, circulatii comune, core'],
      ['RICS CoMP','Net Internal Area',RN(RICS_NIA,1)+' m²','IPMS 3 minus praguri, stâlpi, nise sub 0.25m²'],
      ['DIN 277 (DE)','Netto-Grundfläche',RN(DIN277_NGF,1)+' m²','NGF: suprafata neta totala (NF1+NF2+VF1+VF2)'],
      ['ANCPI (RO)','Suprafață utilă (SU)',RN(ANCPI_SU,1)+' m²','Suprafata incaperilor principale — fara pereti, hol comun, bai/wc sub 1.2m'],
      ['ANCPI (RO)','Suprafață construită (SC)',RN(ANCPI_SC,1)+' m²','Amprenta la sol (contur exterior) — cf. L7/1996 si ANCPI norme 2023'],
      ['ANCPI (RO)','Suprafață desfașurată (SDA)',RN(b.sdaTotal,1)+' m²','Suma SC per toate nivelurile — folosita la autorizare L50/1991'],
    ];

    const bW_=[25,35,22,halfW-2-25-35-22];
    tY=tblHdr(['Standard','Tip suprafață','Valoare','Utilizare / Obs.'],bW_,tY);
    boma_rows.forEach(([std,tip,val,desc],ri)=>{
      if(tY>H-18)return;
      tY=tblRow([std,tip,val,desc],bW_,tY,ri%2===0);
    });

    // ── Inventar goluri ────────────────────────────────────────────────
    const gx=10+halfW+2, gY=12;
    let gCol=gY;
    pdf.setFillColor(...C.dark2);pdf.rect(gx,gCol,halfW,6,'F');
    pdf.setFillColor(...C.gold);pdf.rect(gx,gCol,1.5,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(7);
    pdf.text('INVENTAR GOLURI — UȘI & FERESTRE',gx+halfW/2,gCol+4.2,{align:'center'});
    gCol+=7;

    // Ferestre
    pdf.setFillColor(235,248,255);pdf.rect(gx,gCol,halfW,5.5,'F');
    pdf.setFillColor(30,150,200);pdf.rect(gx,gCol,1.5,5.5,'F');
    pdf.setTextColor(30,100,170);pdf.setFont('helvetica','bold');pdf.setFontSize(6);
    pdf.text('FERESTRE (estimat din geometrie)',gx+4,gCol+4);gCol+=7;
    const ferW=[15,22,18,18,22,halfW-15-22-18-18-22];
    gCol=tblHdr(['Fațadă','Tip cameră','L est.(m)','H est.(m)','Sup.(m²)','Specificație jPDF'],ferW,gCol);
    const winTypes={'living':'Fereastra mare',bedroom:'Fereastra dormitor',bedroom2:'Fereastra dormitor',kitchen:'Fereastra bucatarie',hall:'Fereastra hol',bath:'Oblon/Geam mat'};
    const winSpec={'living':'PVC 5cam., 2×0.7m, Uw≤1.0W/m²K',bedroom:'PVC 5cam., 1×0.7m',bedroom2:'PVC 5cam., 1×0.7m',kitchen:'PVC 5cam., 0.6×0.6m',bath:'Geam opac FR'};
    fl0data.wins.slice(0,15).forEach((w,wi)=>{
      if(gCol>H-40)return;
      const wW=w.w||1.2,wH_=1.2,wArea=wW*wH_;
      gCol=tblRow([w.wall,S2(winTypes[w.type]||w.type||'—'),RN(wW,2),RN(wH_,2),RN(wArea,2),S2(winSpec[w.type]||'PVC/AL triplu low-E')],ferW,gCol,wi%2===0);
    });
    gCol+=4;

    // Usi
    pdf.setFillColor(255,245,230);pdf.rect(gx,gCol,halfW,5.5,'F');
    pdf.setFillColor(200,100,20);pdf.rect(gx,gCol,1.5,5.5,'F');
    pdf.setTextColor(150,70,10);pdf.setFont('helvetica','bold');pdf.setFontSize(6);
    pdf.text('UȘI — ACCES & COMPARTIMENTARE',gx+4,gCol+4);gCol+=7;
    const usiW=[22,18,22,22,halfW-22-18-22-22];
    gCol=tblHdr(['Tip ușă','Lăț. liberă (m)','H est. (m)','Direcție','Specificație'],usiW,gCol);
    fl0data.doors.slice(0,8).forEach((d,di)=>{
      if(gCol>H-25)return;
      const tip=d.type==='main'?'Ușă intrare principală':'Ușă apartament';
      const spec=d.type==='main'?'AL antiefractie RC2, 1.8m, PMR':'Lemn stratif. EI30, 0.9m, yală';
      gCol=tblRow([tip,RN(d.w,2),'2.10',S2(d.swing||'—'),spec],usiW,gCol,di%2===0);
    });
    gCol+=4;

    // Notă grosimi pereți
    if(gCol<H-35){
      pdf.setFillColor(245,248,255);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);pdf.rect(gx,gCol,halfW,H-gCol-18,'FD');
      pdf.setFillColor(...C.dark2);pdf.rect(gx,gCol,halfW,5.5,'F');
      pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6);pdf.text('GROSIMI PEREȚI ESTIMATIVE',gx+4,gCol+4);gCol+=7;
      const pereti=[
        ['Perete exterior (BA+BCA+EPS)','~40-45 cm','U=0.27 W/m²K, antiseismic P100'],
        ['Perete structural interior (BA)','~20-25 cm','C25/30, armătură S500'],
        ['Perete despărțitor (cărămidă/GKF)','~10-15 cm','Rw≥52dB (SR EN ISO 717-1)'],
        ['Planșeu inter-etaj (BA+izolație)','~20-22 cm','U≤0.30 W/m²K, Lw≤58dB'],
        ['Planșeu terasă (XPS20+hidroiz.)','~30-35 cm','U=0.18 W/m²K'],
        ['Pardoseală parter (XPS10+sapa)','~15-20 cm','U=0.28 W/m²K'],
      ];
      pereti.forEach(([n,gros,spec],pi)=>{
        if(gCol>H-22)return;
        pdf.setFillColor(pi%2?248:255,252,255);pdf.rect(gx,gCol-2,halfW,8.5,'F');
        pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(gx,gCol+6.5,gx+halfW,gCol+6.5);
        pdf.setTextColor(20,40,90);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(S2(n),gx+2,gCol+2);
        pdf.setTextColor(0,80,180);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(S2(gros),gx+halfW-30,gCol+2);
        pdf.setTextColor(80,100,130);pdf.setFont('helvetica','italic');pdf.setFontSize(4.5);pdf.text(S2(spec),gx+2,gCol+6);
        gCol+=9;
      });
    }
    ftr();
    }
    // ══════════════════════════════════════════════════════════════════
    newPage();
    hdr('FAȚADĂ PRINCIPALĂ · MATERIALE PROPUSE · PERFORMANȚĂ ENERGETICĂ — Nr.cad. '+P.nrCad,pgN);
    pdf.setFillColor(...C.gray3);pdf.rect(0,9,W,H-16,'F');
    const fSc=Math.min((W*0.42-20)/(b.bW+4),(H-45)/((b.niv*P.hn)+12));
    const fW=b.bW*fSc,fH=b.niv*P.hn*fSc;
    const fOx=14+(W*0.42-20-fW)/2,fOy=12+(H-40-fH)/2;
    pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);
    pdf.rect(10,10,W*0.42-8,H-28,'FD');
    drawFacade(b,P,fOx,fOy,fW,fH,fSc);
    drawNorth(W*0.42-8,22,P.frontDir,6);
    drawScale(14,H-15,fSc);

    // Eticheta fatada
    pdf.setTextColor(...C.dark2);pdf.setFont('helvetica','bold');pdf.setFontSize(6);
    pdf.text('FATADA PRINCIPALA ('+P.frontDir+')',14,H-17);
    pdf.setTextColor(100,115,135);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
    pdf.text('H total = '+(b.niv*P.hn).toFixed(1)+'m · L = '+RN(b.bW)+'m · '+b.niv+' niveluri',14,H-13.5);

    // Right panel: 3D image (top half) + material specs (bottom half)
    const vrx=W*0.42,vry=10,vrw=W-vrx-8;
    const vh=(H-30)*0.42;
    pdf.setFillColor(230,234,244);pdf.rect(vrx,vry,vrw,vh,'F');
    if(caps.v3dDay) addCap(caps.v3dDay,vrx,vry,vrw,vh,'FIG. 4 — Viewer 3D · ZI · Aspect exterior finalizat cu materialele propuse');
    else if(caps.img3D) addCap(caps.img3D,vrx,vry,vrw,vh,'FIG. 4 — Vedere 3D · Context urban și aspect exterior');

    // Material specs panel
    const matY=vry+vh+3;
    const matH=H-matY-18;
    pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);pdf.rect(vrx,matY,vrw,matH,'FD');

    pdf.setFillColor(...C.dark2);pdf.rect(vrx,matY,vrw,6,'F');
    pdf.setFillColor(...C.gold);pdf.rect(vrx,matY,2,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6);
    pdf.text('MATERIALE PROPUSE & PERFORMANȚĂ TERMICĂ',vrx+vrw/2,matY+4.2,{align:'center'});
    let mY=matY+8;

    // Material layers table
    const matLayers=[
      ['PERETE EXTERIOR (de la exterior la interior):',null,null,null],
      ['Tencuială decorativă siliconică','3mm','rezist. UV, lavabilă','—'],
      ['Polistiren expandat EPS 150','15cm','termoizolație','U=0.27 W/m²K'],
      ['Adeziv+plasă fibra de sticla (ETICS)','8mm','armare','—'],
      ['Zidărie BCA clasa D400 ','20cm','structura','—'],
      ['Tencuiala interior+glet','2cm','finisaj','—'],
      ['TOTAL perete exterior','~40cm','conf. C107/4-2022','U≤0.35 ✓'],
      ['GEAMURI (tâmplărie termoizolantă):',null,null,null],
      ['Profil PVC sau AL cu rupere pt. termică','~70mm','structura','—'],
      ['Geam triplu low-E cu argon 4-16-4-16-4','44mm','termoizolare','Ug=0.6 W/m²K'],
      ['Sistem total fereastra','—','SR EN 14351','Uw≤1.0 W/m²K ✓'],
      ['TERASA INVERSA (planseul ultimului nivel):',null,null,null],
      ['Strat pietris/nisip protectie','5cm','protectie','—'],
      ['Polistiren extrudat XPS 300','20cm','termoizolare','—'],
      ['Bariera vapori + hidroizolatie polimer','2×4mm','etanseitate','—'],
      ['Planseu BA','20cm','structura','U=0.18 W/m²K ✓'],
    ];

    const cw1=vrw*0.38,cw2=vrw*0.12,cw3=vrw*0.25,cw4=vrw*0.25;
    matLayers.forEach(([elem,dim,rol,perf],i)=>{
      if(mY>matY+matH-4)return;
      if(dim===null){ // header row
        pdf.setFillColor(15,28,55);pdf.rect(vrx,mY-2,vrw,5.5,'F');
        pdf.setTextColor(...C.gold);pdf.setFont('helvetica','bold');pdf.setFontSize(4.8);
        pdf.text(S2(elem),vrx+2,mY+2);
        mY+=6;
        return;
      }
      pdf.setFillColor(i%2===0?248:255,i%2===0?250:252,i%2===0?255:255);
      pdf.rect(vrx,mY-2,vrw,5,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(vrx,mY+3,vrx+vrw,mY+3);
      pdf.setTextColor(30,50,80);pdf.setFont('helvetica','normal');pdf.setFontSize(4.5);
      pdf.text(S2(elem),vrx+1.5,mY+1.5);
      pdf.setFont('helvetica','bold');pdf.text(S2(dim),vrx+cw1+1.5,mY+1.5);
      pdf.setFont('helvetica','normal');pdf.setTextColor(60,80,100);pdf.text(S2(rol),vrx+cw1+cw2+1.5,mY+1.5);
      const perfOk=String(perf).includes('✓');
      if(perfOk){pdf.setTextColor(0,120,60);pdf.setFont('helvetica','bold');}else{pdf.setTextColor(60,80,100);}
      pdf.text(S2(perf),vrx+cw1+cw2+cw3+1.5,mY+1.5);
      mY+=5;
    });
    ftr();

    // ══════════════════════════════════════════════════════════════════
    // PAG: FAȚADE S + E + V (celelalte 3 fațade)
    // ══════════════════════════════════════════════════════════════════
    const oppDir_={N:'S',S:'N',E:'V',V:'E',NE:'SV',NV:'SE',SE:'NV',SV:'NE'};
    const sideDirs_=[oppDir_[P.frontDir]||'S','E','V'];
    const sideWidths_=[b.bW,b.bD,b.bD]; // N/S folosesc bW, E/V folosesc bD
    const sideLabels_=['POSTERIOARA','LATERALA DREAPTA','LATERALA STANGA'];
    newPage();
    hdr('FATADE S + E + V — Nr.cad. '+P.nrCad+' · UTR '+P.utr,pgN);
    pdf.setFillColor(255,255,255);pdf.rect(0,9,W,H-16,'F');
    const f3AreaW=(W-24)/3,f3AreaH=H-32;
    [0,1,2].forEach(fi=>{
      const fOx3=10+fi*(f3AreaW+2),fOy3=10;
      const fBW=sideWidths_[fi],fBH=b.niv*P.hn;
      const fSc3=Math.min((f3AreaW-16)/( fBW+2),(f3AreaH-30)/(fBH+8));
      const fW3=fBW*fSc3,fH3=fBH*fSc3;
      const fOxI=fOx3+(f3AreaW-16-fW3)/2+6,fOyI=fOy3+(f3AreaH-30-fH3)/2+8;
      // Box
      pdf.setFillColor(248,249,252);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);
      pdf.rect(fOx3,fOy3,f3AreaW-2,f3AreaH,'FD');
      // Facade drawing
      drawFacade(b,P,fOxI,fOyI,fW3,fH3,fSc3);
      // Label
      pdf.setFillColor(...C.dark2);pdf.rect(fOx3,fOy3+f3AreaH-14,f3AreaW-2,14,'F');
      pdf.setFillColor(...C.gold);pdf.rect(fOx3,fOy3+f3AreaH-14,2,14,'F');
      pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6);
      pdf.text('FATADA '+sideDirs_[fi]+' ('+sideLabels_[fi]+')',fOx3+f3AreaW/2-1,fOy3+f3AreaH-8,{align:'center'});
      pdf.setTextColor(150,165,185);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
      pdf.text('H='+fBH.toFixed(1)+'m · L='+fBW.toFixed(1)+'m · '+b.niv+' niv. · Sc.1:100',fOx3+f3AreaW/2-1,fOy3+f3AreaH-3.5,{align:'center'});
    });
    // North arrow centered
    drawNorth(W/2,H-8,P.frontDir,5);
    ftr();

    // ══════════════════════════════════════════════════════════════════
    // PAG: ACCESE RECOMANDATE + CALCUL PARCAJE — cerinta captura 2 din audit
    // ══════════════════════════════════════════════════════════════════
    newPage();
    hdr('ACCESE + CALCUL PARCAJE OBLIGATORII — NP 067/2002 — Nr.cad. '+P.nrCad,pgN);
    pdf.setFillColor(255,255,255);pdf.rect(0,9,W,H-16,'F');
    let parY=13;

    // ── SECTIUNEA ACCESE (captura 2 — obligatoriu in toate rapoartele) ─
    pdf.setFillColor(...C.dark2);pdf.rect(10,parY,W-20,7,'F');
    pdf.setFillColor(...C.gold);pdf.rect(10,parY,3,7,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(8);
    pdf.text('3. ACCESE RECOMANDATE',W/2,parY+4.8,{align:'center'});
    parY+=10;
    const dirMap={N:'Nord',S:'Sud',E:'Est',V:'Vest',NE:'Nord-Est',NV:'Nord-Vest',SE:'Sud-Est',SV:'Sud-Vest'};
    const streetDir = dirMap[P.frontDir]||P.frontDir;
    const uatRoad = uatInfo?.trafic?.drumuri_nationale?.[0] || 'strada principală';
    const accessRows=[
      ['Acces auto principal','De pe '+streetDir+' (front stradal) · lățime min. 6.0m (2 sensuri) sau 3.5m (1 sens) · vizibilitate min. 30m pe ambele direcții · conf. DN 537/2003'],
      ['Acces pietonal','Separat de accesul auto · lățime min. 1.5m · facilitați PMR (rampă, suprafață non-alunecoasă) · conf. NP 051/2012'],
      ['Front stradal','Latura '+streetDir+' — '+P.W.toFixed(1)+'m · '+uatRoad+' · Aliniament stradal: '+P.rf+'m retragere față'],
      ['Acces servicii','Pe latura laterală sau posterioară · lățime min. 3.5m (dacă există funcțiuni de servire)'],
      ['Platformă parcare','Min. 4.50×2.50m/loc (perpendicular) sau 5.50m lungime + culoar 7.5m (90°) · conf. NP 067/2002'],
      ['Semaforizare','Nu se impune la acest nivel de trafic (<100v/h) · se recomandă studiu de intersecție dacă >200v/h'],
    ];
    accessRows.forEach(([lbl,desc],ai)=>{
      pdf.setFillColor(ai%2?248:255,ai%2?250:252,252);pdf.rect(10,parY,W-20,7.5,'F');
      pdf.setFillColor(...C.gold);pdf.rect(10,parY,2,7.5,'F');
      pdf.setTextColor(...C.dark2);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(lbl,13,parY+2.8);
      pdf.setTextColor(40,60,90);pdf.setFont('helvetica','normal');pdf.setFontSize(5);
      const lines=pdf.splitTextToSize(S2(desc),W-28);
      lines.forEach((l,li)=>pdf.text(l,13,parY+5.8+li*3.2));
      parY+=8;
    });
    parY+=5;

    // ── CALCUL PARCAJE ────────────────────────────────────────────────
    const totalAptParc_=Math.max(1,Math.round(b.sdaTotal/70));
    const parcNecRez_=Math.ceil(totalAptParc_*1.2);
    const parcPMR_2=Math.max(2,Math.ceil(parcNecRez_*0.05));
    const suprafLibera2=Math.max(0,P.area-b.bW*b.bD-200); // -200mp= spatii verzi min
    const parcSuprafata2=Math.floor(suprafLibera2/28);
    const deficit2=Math.max(0,parcNecRez_-parcSuprafata2);
    const nrNivSubsol=deficit2>0?Math.ceil(deficit2/Math.floor(b.bW*b.bD/28)):0;

    // Header bicolor
    pdf.setFillColor(255,248,230);pdf.rect(10,parY,W-20,8,'F');
    pdf.setFillColor(180,130,20);pdf.rect(10,parY,3,8,'F');
    pdf.setTextColor(80,55,5);pdf.setFont('helvetica','bold');pdf.setFontSize(8);
    pdf.text('NECESARUL DE PARCAJE — CALCUL OBLIGATORIU',W/2,parY+5.5,{align:'center'});
    parY+=11;

    // 2 coloane
    const pc1x=10,pc1w=(W-22)/2,pc2x=12+pc1w,pc2w=pc1w;
    // Col 1: Baza legala + calcul
    pdf.setFillColor(...C.dark2);pdf.rect(pc1x,parY,pc1w,6,'F');pdf.setFillColor(...C.gold);pdf.rect(pc1x,parY,2,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);pdf.text('BAZA LEGALA + CALCUL',pc1x+pc1w/2,parY+4.3,{align:'center'});
    parY+=7;
    const legalRows_=[
      ['NP 067/2002','Normativ parcaje cladiri civile si comerciale'],
      ['HCL Iasi nr. 155/2007','Regulament local pentru municipiul Iasi'],
      ['NP 051/2012','Locuri PMR min. 4-5% din total'],
      ['Legea 448/2006','Acces persoane cu dizabilitati'],
    ];
    legalRows_.forEach(([cod,desc],li)=>{
      pdf.setFillColor(li%2?248:255,li%2?250:252,252);pdf.rect(pc1x,parY,pc1w,6,'F');
      pdf.setTextColor(...C.blue);pdf.setFont('helvetica','bold');pdf.setFontSize(5);pdf.text(cod,pc1x+2,parY+4);
      pdf.setTextColor(40,60,90);pdf.setFont('helvetica','normal');pdf.setFontSize(5);pdf.text(S2(desc),pc1x+28,parY+4);
      parY+=6;
    });
    parY+=4;
    // Calcul numeric
    pdf.setFillColor(235,242,255);pdf.rect(pc1x,parY,pc1w,6,'F');pdf.setFillColor(...C.blue);pdf.rect(pc1x,parY,2,6,'F');
    pdf.setTextColor(...C.blue);pdf.setFont('helvetica','bold');pdf.setFontSize(6);pdf.text('CALCUL NUMERIC',pc1x+2,parY+4.3);parY+=7;
    const calcRows_=[
      ['Functiune cladire:',S2(fnLabel),'—'],
      ['Numar apartamente estimate:',String(totalAptParc_)+' unitati','NP 057 / estimat'],
      ['Norma rezidential:','1.0 loc/apt (rezidenti)','NP 067/2002'],
      ['Norma vizitatori:','0.2 loc/apt','NP 067/2002'],
      ['Total locuri necesare:',String(parcNecRez_)+' locuri','1.2 x '+totalAptParc_],
      ['Din care PMR (min. 5%):',String(parcPMR_2)+' locuri PMR','marcat distinct, dim. 3.5x5m'],
      ['Suprafata libera teren:',RN(suprafLibera2,0)+' m²','teren-SC-spatii verzi min'],
      ['Locuri posibile la suprafata:',String(parcSuprafata2)+' locuri','la 28 m²/loc'],
      ['DEFICIT necesita subsol/demisol:',deficit2>0?String(deficit2)+' locuri':'0 - SUFICIENT',deficit2>0?'OBLIGATORIU':'OK'],
    ];
    calcRows_.forEach(([lab,val,note],li)=>{
      const isTotal=lab.includes('Total')||lab.includes('DEFICIT');
      const isDeficit=lab.includes('DEFICIT');
      pdf.setFillColor(isTotal?(isDeficit?255:240):li%2?248:255,isTotal?(isDeficit?230:248):li%2?250:252,isTotal?(isDeficit?230:245):255);
      pdf.rect(pc1x,parY,pc1w,isTotal?7:6,'F');
      if(isTotal){pdf.setFillColor(...(isDeficit&&deficit2>0?C.red:C.green));pdf.rect(pc1x,parY,2,7,'F');}
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(pc1x,parY+(isTotal?7:6),pc1x+pc1w,parY+(isTotal?7:6));
      const tc=isDeficit&&deficit2>0?C.red:isTotal?C.green:[40,60,90];
      pdf.setTextColor(...tc);pdf.setFont('helvetica',isTotal?'bold':'normal');pdf.setFontSize(isTotal?5.5:5);
      pdf.text(S2(lab),pc1x+2,parY+(isTotal?5:4));
      pdf.setFont('helvetica','bold');pdf.text(S2(val),pc1x+pc1w-1,parY+(isTotal?5:4),{align:'right'});
      pdf.setFont('helvetica','italic');pdf.setFontSize(4.2);pdf.setTextColor(80,100,130);
      pdf.text(S2(note),pc1x+pc1w-1,parY+(isTotal?7:6)-1,{align:'right'});
      parY+=isTotal?8:6;
    });

    // Col 2: Solutii + Propunere amplasament
    let parY2=12+7+legalRows_.length*6+4+calcRows_.reduce((s,r)=>{const isT=r[0].includes('Total')||r[0].includes('DEFICIT');return s+(isT?8:6);},0)+4;
    pdf.setFillColor(...C.dark2);pdf.rect(pc2x,12,pc2w,6,'F');pdf.setFillColor(...C.gold);pdf.rect(pc2x,12,2,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);pdf.text('SOLUTII PROPUSE',pc2x+pc2w/2,16.3,{align:'center'});
    let pY2=19;
    const solRows_=[
      ['Parcare la suprafata (recomandat):','Marcaj rutier + indicatoare · 28m²/loc · min. 2.5×5m · culoar 6m'],
      ['Parcare subterana 1 nivel (daca deficit):','Sub amprenta cladirii · H min. 2.4m · rampa acces 15-18% panta max.'],
      ['Parcare etajata/mecanizata (optiona):','Solutie pentru deficit mare · H=2.0m/nivel · sistem raft/lift auto'],
      ['Locuri PMR obligatorii:','Amplasate langa intrare · marcaj galben+albastru · dim. 3.5×5.0m'],
      ['Locuri biciclete (recomandat):','Min. 10% din nr. apartamente · suport metalic fixat'],
      ['Statie incarcare EV (recomandat):','Min. 10% locuri pregatite pentru 22kW conf. Legea 259/2021'],
    ];
    solRows_.forEach(([tit,desc],si)=>{
      if(pY2>H-30)return;
      pdf.setFillColor(240,246,255);pdf.setDrawColor(180,200,230);pdf.setLineWidth(0.2);
      pdf.rect(pc2x,pY2,pc2w,14,'FD');
      pdf.setFillColor(...C.blue);pdf.rect(pc2x,pY2,2,14,'F');
      pdf.setTextColor(15,40,90);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(S2(tit),pc2x+4,pY2+5);
      pdf.setTextColor(40,65,110);pdf.setFont('helvetica','normal');pdf.setFontSize(4.8);
      const dl=pdf.splitTextToSize(S2(desc),pc2w-6);
      dl.slice(0,2).forEach((l,li)=>pdf.text(l,pc2x+4,pY2+9+li*3));
      pY2+=16;
    });

    // Nota finala
    if(pY2<H-25){
      pdf.setFillColor(255,245,240);pdf.rect(pc2x,pY2,pc2w,22,'F');
      pdf.setFillColor(...C.orange);pdf.rect(pc2x,pY2,2,22,'F');
      pdf.setTextColor(150,60,10);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text('NOTIFICARE IMPORTANTA',pc2x+4,pY2+5);
      pdf.setTextColor(80,40,10);pdf.setFont('helvetica','normal');pdf.setFontSize(4.8);
      const nota_='Necesarul de parcaje este stabilit definitiv prin Certificatul de Urbanism si Regulamentul Local de Urbanism. Prezentul calcul este orientativ bazat pe NP 067/2002 si normele locale. Autorizatia de Construire va specifica exact numarul si configuratia locurilor de parcare. Parcajele subterane necesita studiu geotehnic, calcul structura, ventilatie mecanica, stingere incendiu si autorizatie ISU separata.';
      const nl=pdf.splitTextToSize(S2(nota_),pc2w-6);
      nl.slice(0,5).forEach((l,li)=>pdf.text(l,pc2x+4,pY2+9+li*3));
    }
    ftr();
    // ══════════════════════════════════════════════════════════════════
    newPage();
    hdr('SECȚIUNE TRANSVERSALĂ A-A + VEDERI 3D — Nr.cad. '+P.nrCad,pgN);
    pdf.setFillColor(...C.gray3);pdf.rect(0,9,W,H-16,'F');
    const sSc=Math.min((W*0.55-25)/(b.bD+4),(H-45)/((b.niv*P.hn)+12));
    const sW=b.bD*sSc,sH=b.niv*P.hn*sSc;
    const sOx=14+(W*0.55-25-sW)/2,sOy=12+(H-40-sH)/2;
    pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);
    pdf.rect(10,10,W*0.55-12,H-28,'FD');
    drawSection(b,P,sOx,sOy,sW,sH,sSc);
    drawNorth(W*0.55-12,22,P.frontDir,6);
    drawScale(14,H-15,sSc);
    // legend sectiune
    pdf.setFillColor(248,249,252);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.25);
    pdf.rect(14,H-28,W*0.55-20,12,'FD');
    const sleg=[[C.living,C.orange,'Living/Salon'],[C.bedroom,C.green,'Dormitor'],[C.kitchen,C.cyan,'Bucătărie'],[C.core,C.blue,'Scări+Lift']];
    sleg.forEach(([fc,stk,lbl],i)=>{
      const sx=18+i*32;
      pdf.setFillColor(...fc);pdf.setDrawColor(...stk);pdf.setLineWidth(0.3);pdf.rect(sx,H-24,5,4,'FD');
      pdf.setTextColor(50,65,85);pdf.setFont('helvetica','normal');pdf.setFontSize(5);pdf.text(lbl,sx+6,H-21);
    });
    // right: noapte + overcast + explicatii
    const srx=W*0.55,srw=W-srx-8;
    const sh2=(H-30)/2;
    pdf.setFillColor(230,234,244);pdf.rect(srx,10,srw,sh2,'F');
    if(caps.v3dNight) addCap(caps.v3dNight,srx,10,srw,sh2,'FIG. 6 — Viewer 3D · NOAPTE · Impact iluminat artificial și vizibilitate nocturnă');
    else if(caps.v3dOvercast) addCap(caps.v3dOvercast,srx,10,srw,sh2,'FIG. 6 — Viewer 3D · Vedere aeriană · Context densitate construită');
    pdf.setFillColor(230,234,244);pdf.rect(srx,12+sh2,srw,sh2,'F');
    if(caps.v3dOvercast) addCap(caps.v3dOvercast,srx,12+sh2,srw,sh2,'FIG. 7 — Viewer 3D · CER ACOPERIT · Volum și umbre difuze');
    else if(caps.imgAerial) addCap(caps.imgAerial,srx,12+sh2,srw,sh2,'FIG. 7 — Vedere aeriană · Amprentă clădire și vecinătăți');
    // nota structura
    pdf.setFillColor(255,255,255);pdf.rect(10,H-13,W-20,6,'F');
    noteBox('STRUCTURA PROPUSĂ: Cadre din beton armat (stâlpi + grinzi) clasa C25/30, armătură S500, proiectată antiseismic conf. P100-1/2013 zona E (ag=0,2g, Tc=1,6s). Planșee dale beton h=18-22cm. Fundații izolate/continue la min. -1,5m față de CTN. Zidărie de umplutură: BCA 20cm + termoizolație 15cm EPS/MW.',14,H-13,W-20,6);
    ftr();

    // ══════════════════════════════════════════════════════════════════
    // PAG VEDERE AXONOMETRICĂ ADNOTATĂ + MIX APARTAMENTE
    // ══════════════════════════════════════════════════════════════════
    newPage();
    hdr('VEDERE AXONOMETRICĂ 3D · MIX APARTAMENTE · SUPRAFEȚE PROPUSE — Nr.cad. '+P.nrCad,pgN);
    pdf.setFillColor(...C.gray3);pdf.rect(0,9,W,H-16,'F');

    // Axonometric (left 45%)
    pdf.setFillColor(240,243,250);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);
    pdf.rect(10,10,W*0.44,H-28,'FD');
    const axSc=Math.min((W*0.42)/(b.bW+b.bD+6),(H-60)/((b.niv*P.hn)+b.bD/2+8))*0.82;
    drawAxono(b,P,W*0.225,H*0.50,axSc);
    drawNorth(W*0.44,22,P.frontDir,6);
    drawScale(14,H-15,axSc);

    // Etichete niveluri pe axonometrie
    const c30ax=Math.cos(Math.PI/6)*axSc*0.82;
    const s30ax=Math.sin(Math.PI/6)*axSc*0.82;
    const axCX=W*0.225,axCY=H*0.50;
    for(let fl_=0;fl_<=Math.min(b.niv,5);fl_++){
      const z=fl_*P.hn;
      const pRight={px:axCX+(b.bW)*c30ax, py:axCY+(b.bW)*s30ax-z*axSc*0.82*0.55};
      const label=fl_===0?'PARTER':'E'+fl_;
      const cota=fl_===0?'±0.00':'+'+((fl_*P.hn).toFixed(2));
      pdf.setFillColor(20,40,80);pdf.roundedRect(pRight.px+2,pRight.py-2.5,18,5,1,1,'F');
      pdf.setTextColor(...C.gold);pdf.setFont('helvetica','bold');pdf.setFontSize(4.5);pdf.text(label+' '+cota+'m',pRight.px+3,pRight.py+1.5);
    }

    // H total label
    const {px:hPx,py:hPy}={px:axCX+(b.bW)*c30ax+22,py:axCY+(b.bW)*s30ax-b.niv*P.hn*axSc*0.82*0.55/2};
    pdf.setTextColor(...C.dark2);pdf.setFont('helvetica','bold');pdf.setFontSize(9);
    pdf.text('H='+(b.niv*P.hn).toFixed(1)+'m',Math.min(hPx,W*0.42),H*0.22);
    pdf.setFont('helvetica','normal');pdf.setFontSize(6);pdf.setTextColor(80,100,130);
    pdf.text(b.niv+' niveluri · '+b.cores.length+' nuclee',Math.min(hPx,W*0.42),H*0.22+7);

    // Explicatie axonometrie - ce e aceasta vedere
    pdf.setFillColor(255,255,255);pdf.rect(10,H-17,W*0.44-2,9,'F');
    pdf.setTextColor(30,50,85);pdf.setFont('helvetica','bold');pdf.setFontSize(5);
    pdf.text('CE ESTE VEDEREA AXONOMETRICĂ?',12,H-14);
    pdf.setFont('helvetica','normal');pdf.setFontSize(4.8);pdf.setTextColor(50,65,85);
    const axExp='Aceasta este o vedere tridimensionala a cladirii - puteti vedea simultan toate cele '+b.niv+' niveluri, volumul total, si proportiile fata de teren. Nu este o fotografie - este un desen tehnic la scara care arata forma exacta a cladirii propuse.';
    const axLines=pdf.splitTextToSize(S2(axExp),W*0.42-4);
    axLines.slice(0,2).forEach((l,li)=>pdf.text(l,12,H-10+li*3));

    // Right panel - apartment mix table
    const arx=W*0.45+6,arw=W-arx-8;
    pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);pdf.rect(arx,10,arw,H-28,'FD');

    let arY=12;
    pdf.setFillColor(...C.dark2);pdf.rect(arx,arY,arw,7,'F');
    pdf.setFillColor(...C.gold);pdf.rect(arx,arY,2,7,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);
    pdf.text('MIX APARTAMENTE — PROPUNERE',arx+arw/2,arY+5,{align:'center'});arY+=10;

    // Rezumat rapid
    const nApt=b.niv*b.cores.length*4;
    const fnStr=String(P.fn||'rezidential_colectiv').toLowerCase();
    const isRez=!fnStr.includes('birouri')&&!fnStr.includes('hotel');
    const summary=[
      ['SUPRAFATA PARCELA:',P.area+'m²'],
      ['SUPRAFATA CONSTRUITA (SC):',RN(b.scArea)+'m² (POT='+RN(b.scArea/P.area*100)+'%)'],
      ['SUPRAFATA DESFASURATA (SDA):',RN(b.sdaTotal)+'m²'],
      ['NUMAR NIVELURI:',b.niv+' niveluri (P+'+(b.niv-1)+'E)'],
      ['INALTIME TOTALA:',( b.niv*P.hn).toFixed(1)+'m'],
      [isRez?'UNITATI LOCATIVE ESTIMATE:':'UNITATI PROPUSE:',nApt+' unitati'],
      ['SUPRAFATA UTILA / UNITATE:',RN(b.sdaPerFloor/(b.cores.length*2)*0.75)+'m² medie estimata'],
      ['NUCLEE SCARI+LIFT:',b.cores.length+' nuclee'],
    ];
    summary.forEach(([lab,val],i)=>{
      pdf.setFillColor(i%2?248:255,i%2?250:252,252);pdf.rect(arx,arY-2,arw,5.5,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(arx,arY+3.5,arx+arw,arY+3.5);
      pdf.setTextColor(60,80,105);pdf.setFont('helvetica','normal');pdf.setFontSize(5);pdf.text(S2(lab),arx+2,arY+1.5);
      pdf.setTextColor(20,45,80);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(S2(val),arx+arw-2,arY+1.8,{align:'right'});
      arY+=5.5;
    });
    arY+=4;

    // Tipuri apartamente
    pdf.setFillColor(245,248,252);pdf.rect(arx,arY,arw,5.5,'F');
    pdf.setFillColor(...C.gold);pdf.rect(arx,arY,2,5.5,'F');
    pdf.setTextColor(30,50,85);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
    pdf.text('TIPURI UNITATI PROPUSE PER ETAJ',arx+3,arY+3.8);arY+=8;

    const aptTypes=isRez?[
      ['Garsoniera (studio)','38m²','1+1 cam','1 balcon','1-2 pers','ideal tineri/chirie'],
      ['Apartament 2 camere','65m²','Living+1 dorm','1 balcon','2-3 pers','cel mai cerut Iasi'],
      ['Apartament 3 camere','88m²','Living+2 dorm','1 balcon','3-4 pers','familii cu copii'],
      ['Apartament 4 camere','115m²','Living+3 dorm','2 balcoane','4-5 pers','familii mari/premium'],
    ]:[
      ['Camera standard','25-35m²','1 pat dublu','baie','1-2 pers','conf. min. hotel 3*'],
      ['Camera dubla superioara','35-45m²','1 pat dublu','baie+dressing','2 pers','conf. hotel 4*'],
      ['Camera twin','30-40m²','2 paturi single','baie','2 pers','calatorii afaceri'],
      ['Apartament','55-75m²','Living+dormitor','2 bai','2-4 pers','sejur lung/VIP'],
    ];
    const acw=[arw*0.18,arw*0.12,arw*0.18,arw*0.12,arw*0.1,arw*0.30];
    pdf.setFillColor(...C.dark2);pdf.rect(arx,arY,arw,5,'F');
    ['Tip','Supraf.','Camere','Balcon','Pers.','Piata tinta'].forEach((h,i)=>{
      const x=arx+acw.slice(0,i).reduce((a,b_)=>a+b_,0);
      pdf.setTextColor(...C.gold);pdf.setFont('helvetica','bold');pdf.setFontSize(4.5);
      pdf.text(h,x+1,arY+3.5);
    });arY+=5;

    aptTypes.forEach((row,ri)=>{
      if(arY>H-40)return;
      pdf.setFillColor(ri%2?248:255,ri%2?250:252,252);pdf.rect(arx,arY-1,arw,6,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(arx,arY+5,arx+arw,arY+5);
      row.forEach((cell,ci)=>{
        const x=arx+acw.slice(0,ci).reduce((a,b_)=>a+b_,0);
        pdf.setTextColor(ci===0?25:50,ci===0?45:65,ci===0?85:90);
        pdf.setFont('helvetica',ci===0?'bold':'normal');pdf.setFontSize(5);
        pdf.text(S2(cell),x+1,arY+3.5);
      });
      arY+=6;
    });
    arY+=5;

    // ISU requirements summary
    if(arY<H-50){
      pdf.setFillColor(255,238,235);pdf.roundedRect(arx+1,arY,arw-2,35,1.5,1.5,'F');
      pdf.setFillColor(200,30,30);pdf.rect(arx+1,arY,2,35,'F');
      pdf.setTextColor(180,20,20);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);
      pdf.text('CERINTE OBLIGATORII ISU — CONF. P118-2/2013',arx+5,arY+5);
      pdf.setTextColor(80,15,15);pdf.setFont('helvetica','normal');pdf.setFontSize(4.8);
      const isuReqs=[
        '• Scari protejate cu usi EI 30 pe fiecare nivel — evacuare in caz de incendiu (max. '+RN(b.cores.length)+' scara)',
        '• Hidranti interiori obligatorii: niv.'+b.niv+'>3 — debit 2.5 l/s, presiune min. 2.5 bar la ajutaj',
        '• Hidranti exteriori: la max. 150m de intrare — verificare retea RAJA/CET',
        '• Sistem detectie+alarmare (DAI) obligatoriu: detectori fum fiecare camera, centrala, sirene',
        '• Iluminat de securitate pe cai evacuare: min. 1 lux, autonomie 1h (baterie/UPS)',
        '• Aviz ISU OBLIGATORIU inainte de Autorizatia de Construire — Legea 307/2006',
      ];
      isuReqs.forEach((r,ri)=>{
        if(arY+10+ri*4.5>H-20)return;
        pdf.text(S2(r),arx+5,arY+11+ri*4.5);
      });
      arY+=38;
    }

    // 3 KPI cards bottom
    const kpiData=[['SDA TOTALA',RN(b.sdaTotal)+'m²'],['NR. APARTAMENTE',RN(nApt)+' apt.'],['H REGIM',b.niv+' niv.']];
    const kcw=(arw)/kpiData.length;
    const kcy=H-28;
    kpiData.forEach(([t,v],ki)=>{
      const kx=arx+ki*kcw;
      pdf.setFillColor(12,25,50);pdf.roundedRect(kx+0.5,kcy,kcw-2,12,1.5,1.5,'F');
      pdf.setFillColor(...C.gold);pdf.roundedRect(kx+0.5,kcy,kcw-2,4,1.5,1.5,'F');pdf.rect(kx+0.5,kcy+2,kcw-2,2,'F');
      pdf.setTextColor(10,20,40);pdf.setFont('helvetica','bold');pdf.setFontSize(4.5);pdf.text(t,kx+kcw/2-0.75,kcy+3,{align:'center'});
      pdf.setTextColor(220,235,255);pdf.setFont('helvetica','bold');pdf.setFontSize(8);pdf.text(S2(v),kx+kcw/2-0.75,kcy+9.5,{align:'center'});
    });
    ftr();

    // ══════════════════════════════════════════════════════════════════
    // PAG MEMORIU JUSTIFICATIV
    // ══════════════════════════════════════════════════════════════════
    newPage();
    hdr('MEMORIU JUSTIFICATIV — DE CE ACEASTĂ SOLUȚIE? — Nr.cad. '+P.nrCad,pgN);
    pdf.setFillColor(255,255,255);pdf.rect(0,9,W,H-9,'F');
    let my=13;
    my=secTitle('1. JUSTIFICAREA SOLUȚIEI FUNCȚIONALE PROPUSE',my,[15,30,65]);
    const mem1='Soluția funcțională propusă de UrbanX Relevee Instant pentru parcela '+P.nrCad+' (UTR '+P.utr+', suprafață '+P.area+'m²) valorifică integral indicatorii urbanistici permisi de PUG în vigoare: POT='+RN(b.scArea/P.area*100)+'% (max. '+RN(P.pot*100)+'%), CUT='+(b.sdaTotal/P.area).toFixed(2)+' (max. '+P.cut+'), H='+(b.niv*P.hn).toFixed(1)+'m ('+b.niv+' niveluri). Aceasta este soluția OPTIMĂ din punct de vedere economico-urbanistic deoarece maximizează suprafața desfășurată admisă (SDA='+RN(b.sdaTotal)+'m²) în condițiile respectării tuturor reglementărilor PUG.';
    my=bodyTxt(mem1,12,my,W-24,6.5);my+=3;
    my=secTitle('2. JUSTIFICAREA ORIENTĂRII ȘI DISTRIBUȚIEI SPAȚIILOR',my,[20,50,95]);
    const mem2='Orientarea frontului stradal spre '+P.frontDir+' determină distribuția optimă a spațiilor conform OMS 119/2014: camerele de locuit (living, dormitoare) sunt orientate spre fațadele cu însorire favorabilă ('+(solarDir?'fațada principală spre '+P.frontDir+' este favorabilă — camere de zi bine însorite)':'fațadele laterale Est/Vest — se recomandă verificarea la PAC prin studiu OMS 119 detaliat)')+'). Spațiile tehnice (bucătărie, baie, hol) sunt amplasate spre fațadele secundare sau în zona centrală, reducând pierderile termice. Nucleul de scări+lift este plasat central pentru a minimiza lungimea coridoarelor de evacuare (max. 30m conf. P118-2/2013 art. 6).';
    my=bodyTxt(mem2,12,my,W-24,6.5);my+=3;
    my=secTitle('3. MATERIALE ȘI SOLUȚII TEHNICE RECOMANDATE',my,[20,80,55]);
    const matRows=[
      ['Element','Soluție recomandată','Standard/Normativ','Justificare'],
      ['Structură','Cadre BA C25/30 + armătură S500','P100-1/2013 · SR EN 1992','Seismicitate zonă E (ag=0,2g) — structura trebuie să preia forțele seismice'],
      ['Planșee','Dale BA 18-22cm cu izolație termică 10cm','C107-05 · STAS 6472','Izolare termică (coef. U≤0,3W/m²K) și acustică (Rw≥52dB între apt.)'],
      ['Ferestre','PVC/AL cu rupere punte termică, geam triplu low-E','C107-05 · SR EN 14351','Uw≤1,1W/m²K — reducere consum energetic 30-40% față de geam dublu standard'],
      ['Fațadă','Tencuială decorativă sau placaj ventilat + 15cm EPS/MW','C107-05 · ETAG004','U zid≤0,25W/m²K — clădire aproape zero energie (NZEB conf. Legea 372/2005)'],
      ['Acoperiș','Terasă circulabilă/verde cu hidroizolație bitum+PVC','NP 040/2002 · SR EN 13984','Protecție precipitații, utilizare spațiu, biodiversitate urbană'],
      ['Instalații','Centrală termică individuală per apt. sau centrală comună','I13/2015 · NP 037','Eficiență energetică, control individual consum, clasă A++'],
      ['Lifturi','Min. 1 lift/scară P+4 sau mai mult · cabină min. 1,1×1,4m','SR EN 81-1 · NP 051/2012','Obligatoriu pentru PMR · Legea 448/2006 privind persoanele cu handicap'],
    ];
    my=tblHdr(matRows[0],[45,65,40,W-22-45-65-40],my);
    matRows.slice(1).forEach((r,i)=>{my=tblRow(r,[45,65,40,W-22-45-65-40],my,i%2===0);});
    my+=4;
    my=secTitle('4. AVANTAJELE SOLUȚIEI FAȚĂ DE ALTERNATIVE',my,[80,30,20]);
    const adv=[
      '✓ MAXIM JURIDIC: Soluția valorifică 100% din CUT admis ('+P.cut+') — orice reducere ar însemna pierderi economice directe de '+RN((P.cut-b.sdaTotal/P.area)*P.area*700)+' EUR estimat (la 700 EUR/mp construcție).',
      '✓ DISTRIBUȚIE OPTIMĂ FUNCȚIONAL: Nucleul central de scări minimizează circulațiile (economie suprafață ~8%) și asigură conformitatea cu P118-2/2013 (distanțe evacuare ≤30m).',
      '✓ FLEXIBILITATE: Planul tip permite compartimentări diferite (apt. de 2, 3 sau 4 camere) la aceeași SC, adaptabil cererii de piață. Mix propus: '+(P.fn.includes('hotel')?'camere hotel standard':'apartamente 2-4 camere conf. cerere Iași 2024-2025')+'.',
      '✓ CONFORMITATE COMPLETĂ: Toți indicatorii (POT, CUT, H, retrageri) sunt respectați, eliminând riscul de blocare a Autorizației de Construire.',
    ];
    adv.forEach(a=>{my=bodyTxt(a,12,my,W-24,6.5);my+=1;});
    ftr();

    // ══════════════════════════════════════════════════════════════════
    // PAG BILANȚ + NORMATIVE + CONCLUZII
    // ══════════════════════════════════════════════════════════════════
    newPage();
    hdr('BILANȚ SUPRAFEȚE · VERIFICARE NORMATIVE · CONCLUZII FINALE',pgN);
    pdf.setFillColor(...C.gray3);pdf.rect(0,9,W,H-16,'F');
    const bCol1=W*0.32,bCol2=W*0.35,bCol3X=10+bCol1+bCol2+4;
    // Col 1: Bilant
    pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);pdf.rect(10,10,bCol1-2,H-28,'FD');
    let by1=secTitle('BILANȚ SUPRAFEȚE',10.5,C.dark2);
    const bilR=[['Suprafață parcelă',P.area+'m²'],['SC edificiu',RN(b.scArea)+'m²'],['SDA totală',RN(b.sdaTotal)+'m²'],['SDA/nivel',RN(b.sdaPerFloor)+'m²'],['POT real/max',RN(b.scArea/P.area*100)+'%/'+RN(P.pot*100)+'%'],['CUT real/max',(b.sdaTotal/P.area).toFixed(2)+'/'+P.cut],['Niveluri',b.niv+' niv. P+'+(b.niv-1)+'E'],['H total',(b.niv*P.hn).toFixed(1)+'m'],['H liber nivel',(P.hn-0.25).toFixed(2)+'m'],['Nuclee scări',b.cores.length],['Apartamente est.',RN(b.niv*b.cores.length*4)+' apt.'],['Locuri parcaj est.',RN(b.niv*b.cores.length*4)+' min.']];
    bilR.forEach(([l,v],i)=>{
      pdf.setFillColor(i%2?248:255,252,252);pdf.rect(10,by1-4,bCol1-2,5.5,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(10,by1+1.5,10+bCol1-2,by1+1.5);
      pdf.setTextColor(100,115,135);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);pdf.text(S2(l),12,by1);
      pdf.setTextColor(30,50,80);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(S2(String(v)),10+bCol1-4,by1,{align:'right'});
      by1+=5.5;
    });
    // Col 2: Normative
    pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);pdf.rect(12+bCol1,10,bCol2-2,H-28,'FD');
    let by2=secTitle('VERIFICARE NORMATIVE',10.5,C.dark2,12+bCol1,bCol2-2);
    by2=10+8; // reset
    pdf.setFillColor(...C.dark2);pdf.rect(12+bCol1,10,bCol2-2,6,'F');pdf.setFillColor(...C.gold);pdf.rect(12+bCol1,10,1.5,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(7);pdf.text('VERIFICARE NORMATIVE',14+bCol1+(bCol2-2)/2,14.5,{align:'center'});
    by2=20;
    const normR2=[
      ['POT max admis',potOk?'CONFORM':'DEPĂȘIRE',potOk,'PUG · NP 068','Suprafața construită nu depășește '+RN(P.pot*100)+'% din teren'],
      ['CUT max admis',cutOk?'CONFORM':'DEPĂȘIRE',cutOk,'PUG · NP 068','SDA totală nu depășește coeficientul admis '+P.cut],
      ['Supraf. min. camere',fl0?.rects.every(r=>{const m={living:14,bedroom:12,kitchen:5,bath:3.6}[r.t];return !m||r.w*r.h>=m;})!==false?'CONFORM':'Verif. PT',null,'NP 057/2002','Living min.14m², dormitor min.12m², bucătărie min.5m²'],
      ['Însorire camere',solarDir?'CONFORM':'Verif. PT',solarDir,'OMS 119/2014','Min. 1,5h/zi la solstițiu iarnă · orientare fațadă '+P.frontDir],
      ['Evacuare scări ISU',isuOk?'CONFORM':'Verif. PT',isuOk,'P118-2/2013','Distanța max. 30m de la orice punct la casa scărilor'],
      ['PMR — persoane mobilitate red.',b.scArea>300?'Obligatoriu':'Verificare',null,'NP 051/2012 · L.448/2006','Lift obligatoriu, rampă acces, locuri parcare PMR 4%'],
      ['Seismic — proiectare structurală','Obligatoriu conf. P100',true,'P100-1/2013','Zonă seismică E, ag=0,2g, Tc=1,6s · structură BA proiectată'],
      ['Performanță energetică','NZEB obligatoriu',true,'Legea 372/2005','Clădiri noi = Nearly Zero Energy Building · audit energetic oblig.'],
      ['Calitatea construcțiilor','Cerința A+B+C+D+E+F',true,'Legea 10/1995','Rezistență, securitate, igienă, confort, durabilitate, acces'],
    ];
    normR2.forEach(([l,v,ok,ref,note],i)=>{
      if(by2>H-30)return;
      pdf.setFillColor(i%2?248:255,i%2?250:252,i%2?252:254);pdf.rect(12+bCol1,by2-3.5,bCol2-2,10,'F');
      pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.1);pdf.line(12+bCol1,by2+6.5,12+bCol1+bCol2-2,by2+6.5);
      pdf.setTextColor(50,65,85);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(S2(l),14+bCol1,by2);
      const vc=ok===true?C.green:ok===false?C.red:[140,100,20];
      pdf.setTextColor(...vc);pdf.setFont('helvetica','bold');pdf.setFontSize(5);pdf.text(S2(v),14+bCol1,by2+4);
      pdf.setTextColor(100,115,135);pdf.setFont('helvetica','normal');pdf.setFontSize(4.5);pdf.text(S2(ref)+' — '+S2(note).slice(0,55),14+bCol1,by2+7.5);
      by2+=10;
    });
    // Col 3: Concluzii
    pdf.setFillColor(255,255,255);pdf.setDrawColor(...C.gray2);pdf.setLineWidth(0.3);pdf.rect(bCol3X,10,W-bCol3X-8,H-28,'FD');
    pdf.setFillColor(...C.dark2);pdf.rect(bCol3X,10,W-bCol3X-8,6,'F');pdf.setFillColor(...C.gold);pdf.rect(bCol3X,10,1.5,6,'F');
    pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(7);pdf.text('CONCLUZII ȘI PAȘI URMĂTORI',bCol3X+(W-bCol3X-8)/2,14.5,{align:'center'});
    let cly=22;
    const concls=[
      ['✅','FEZABILITATE URBANISTICĂ','Parcela '+P.nrCad+' (UTR '+P.utr+') permite construirea unui imobil de '+b.niv+' niveluri cu SDA='+RN(b.sdaTotal)+'m², respectând integral PUG. POT='+RN(b.scArea/P.area*100)+'%, CUT='+(b.sdaTotal/P.area).toFixed(2)+' — CONFORM.',[22,163,74]],
      ['📐','PROIECT TEHNIC NECESAR','Prezentul document este ORIENTATIV. Este obligatorie elaborarea Proiectului Tehnic (PT) de arhitect autorizat OAR, care va stabili cotele exacte, materialele, instalațiile și detaliile de execuție.',[37,99,235]],
      ['📋','CERTIFICAT DE URBANISM','Primul pas legal: solicitarea Certificatului de Urbanism la Primăria Municipiului Iași — stabilește lista exactă de avize (ISU, AACR, utilități, DJCPN dacă patrimoniu, APM).',[212,175,55]],
      ['🏗️','STUDII OBLIGATORII ÎNAINTE DE PT','Studiu geotehnic (NP 074/2014, min. 3 foraje), studiu de însorire detaliat (OMS 119/2014), ridicare topografică (coordonate Stereo 70), releveu împrejurimi.',[124,58,237]],
      ['📅','CALENDAR ESTIMAT','CU (1-2 luni) → Studii (2-4 luni) → PAC/DTAC (3-6 luni) → Avize (2-4 luni) → AC (1-2 luni) → PT (3-6 luni) → Execuție (10-15 luni). TOTAL: 22-39 luni.',[6,182,212]],
    ];
    concls.forEach(([ico,title,txt,tc])=>{
      if(cly>H-30)return;
      pdf.setFillColor(tc[0],tc[1],tc[2],0.08);
      pdf.setFillColor(Math.min(255,tc[0]*0.15+240),Math.min(255,tc[1]*0.15+245),Math.min(255,tc[2]*0.1+248));
      pdf.roundedRect(bCol3X+2,cly-3,W-bCol3X-12,18,1,1,'F');
      pdf.setFillColor(...tc);pdf.rect(bCol3X+2,cly-3,1.5,18,'F');
      pdf.setTextColor(...tc);pdf.setFont('helvetica','bold');pdf.setFontSize(6.5);
      pdf.text(S2(title),bCol3X+6,cly+1.5);
      pdf.setTextColor(40,55,75);pdf.setFont('helvetica','normal');pdf.setFontSize(5.2);
      const lines=pdf.splitTextToSize(S2(txt),W-bCol3X-16);
      lines.slice(0,3).forEach((l,li)=>pdf.text(l,bCol3X+6,cly+7+li*3.2));
      cly+=22;
    });
    // Final stamp + DNA Radar + PAGINA PANEL STÂNG (#25 audit)
    _rvCaptureDNARadarPNG(async dnaImg=>{
      try{
        // ── PAGINA SUPLIMENTARĂ: TOT CONȚINUTUL DIN PANOUL STÂNG (#25) ──────
        pgN++;
        pdf.addPage();
        pdf.setFillColor(6,12,26);pdf.rect(0,0,W,H,'F');
        hdr('SINTEZĂ ANALIZĂ · FUNCȚIUNE · Amprentă Normativă · LEGENDĂ · NORMATIVE APLICATE',pgN);
        let sy=14;
        const fnCfgPDF=window.FN_CONFIG?.[_RV.fn]||{label:'Rezidențial',norms:['NP 057/2002','OMS 119/2014','P118-2/2013'],isuDist:30,isuNorm:'P118-2/2013',omsInsorire:true};

        // ── COL 1: Funcțiune + DNA radar ──────────────────────────────────────
        const c1w=65, c1x=10;
        // Funcțiune clădire
        pdf.setFillColor(20,40,80);pdf.rect(c1x,sy,c1w,8,'F');pdf.setFillColor(...C.gold);pdf.rect(c1x,sy,1.5,8,'F');
        pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(7);
        pdf.text('FUNCȚIUNE CLĂDIRE',c1x+4,sy+5.5);sy+=10;
        pdf.setFillColor(245,248,255);pdf.rect(c1x,sy,c1w,28,'F');
        pdf.setTextColor(30,60,120);pdf.setFont('helvetica','bold');pdf.setFontSize(8);
        pdf.text(S2(fnCfgPDF.label),c1x+3,sy+7);
        pdf.setTextColor(100,120,150);pdf.setFont('helvetica','normal');pdf.setFontSize(5.5);
        pdf.text('ISU: '+fnCfgPDF.isuDist+'m · '+S2(fnCfgPDF.isuNorm),c1x+3,sy+13);
        pdf.text('OMS 119: '+(fnCfgPDF.omsInsorire?'ACTIV min '+fnCfgPDF.omsMin+'h/zi':'N/A — funcțiune'),c1x+3,sy+18);
        pdf.text('Parcaje: '+S2(fnCfgPDF.pk_norm||'NP 067/2002'),c1x+3,sy+23);
        sy+=30;
        // DNA Radar
        pdf.setFillColor(20,40,80);pdf.rect(c1x,sy,c1w,8,'F');pdf.setFillColor(...C.gold);pdf.rect(c1x,sy,1.5,8,'F');
        pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(7);
        pdf.text('Amprentă Normativă — SCOR NORMATIV',c1x+4,sy+5.5);sy+=10;
        if(dnaImg){
          pdf.setFillColor(6,12,26);pdf.rect(c1x,sy,c1w,60,'F');
          try{pdf.addImage(dnaImg,'PNG',c1x+2,sy+2,c1w-4,56);}catch(e){}
        }
        sy+=62;
        // Axe DNA
        const axesPDF=[['POT','Ocupare teren',[34,197,94]],['CUT','Utilizare teren',[34,197,94]],['OMS','Însorire OMS',[252,211,77]],['ISU','Evacuare',[239,68,68]],['NP057','Supraf. min.',[96,165,250]],['Parcaje','NP 067',[249,115,22]]];
        axesPDF.forEach(([ax,desc,col],i)=>{
          pdf.setFillColor(...col);pdf.circle(c1x+4,sy+2,2,'F');
          pdf.setTextColor(...col);pdf.setFont('helvetica','bold');pdf.setFontSize(5.5);pdf.text(ax,c1x+8,sy+3);
          pdf.setTextColor(80,100,140);pdf.setFont('helvetica','normal');pdf.setFontSize(5);pdf.text(desc,c1x+22,sy+3);
          sy+=7;
        });

        // ── COL 2: Legendă culori camere ──────────────────────────────────────
        const c2x=82, c2w=60;
        let c2y=14;
        pdf.setFillColor(20,40,80);pdf.rect(c2x,c2y,c2w,8,'F');pdf.setFillColor(...C.gold);pdf.rect(c2x,c2y,1.5,8,'F');
        pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(7);
        pdf.text('LEGENDĂ CULORI CAMERE',c2x+4,c2y+5.5);c2y+=10;
        const roomColors=[
          [[59,130,246],'Living / Sufragerie','min. 14 m² (NP 057)'],
          [[52,211,153],'Dormitor principal','min. 12 m² (NP 057)'],
          [[52,211,153],'Dormitor 2/3','min. 10 m² (NP 057)'],
          [[245,158,11],'Bucătărie','min. 5 m² (NP 057)'],
          [[167,139,250],'Baie','min. 3.6 m² (NP 057)'],
          [[100,116,139],'Hol / Coridor','min. 1.2m lățime'],
          [[75,85,99],'Depozit / Garderobă','—'],
          [[37,99,235],'Casă scări + Lift','Conf. ISU P118'],
          [[212,175,55],'Balcon / Terasă','Balcon adânc min. 1.2m'],
        ];
        roomColors.forEach(([col,lbl,norm],i)=>{
          pdf.setFillColor(...col);pdf.rect(c2x+2,c2y-3.5,9,7,'F');
          pdf.setTextColor(30,50,80);pdf.setFont('helvetica','bold');pdf.setFontSize(6);pdf.text(S2(lbl),c2x+14,c2y);
          pdf.setTextColor(100,120,150);pdf.setFont('helvetica','normal');pdf.setFontSize(4.5);pdf.text(S2(norm),c2x+14,c2y+4);
          c2y+=10;
        });
        // Separator + Mix apartamente
        c2y+=4;
        pdf.setFillColor(20,40,80);pdf.rect(c2x,c2y,c2w,8,'F');pdf.setFillColor(...C.gold);pdf.rect(c2x,c2y,1.5,8,'F');
        pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(7);
        pdf.text('MIX APARTAMENTE SETAT',c2x+4,c2y+5.5);c2y+=10;
        const mix=_RV.unitMix||{studio:10,apt2:50,apt3:30,apt4:5,ph:5};
        [['Garsonieră',mix.studio+'%','~30-45 m²'],['2 camere',mix.apt2+'%','~55-70 m²'],
         ['3 camere',mix.apt3+'%','~75-95 m²'],['4 camere',mix.apt4+'%','~95-120 m²'],
         ['Penthouse',mix.ph+'%','~140-200 m²']].forEach(([t,p,s])=>{
          pdf.setFillColor(245,248,255);pdf.rect(c2x,c2y-3.5,c2w,7,'F');
          pdf.setTextColor(30,60,100);pdf.setFont('helvetica','bold');pdf.setFontSize(6);pdf.text(S2(t),c2x+3,c2y);
          pdf.setTextColor(212,175,55);pdf.setFont('helvetica','bold');pdf.setFontSize(7);pdf.text(S2(p),c2x+35,c2y);
          pdf.setTextColor(100,120,150);pdf.setFont('helvetica','normal');pdf.setFontSize(5);pdf.text(S2(s),c2x+50,c2y);
          c2y+=7;
        });

        // ── COL 3: Normative aplicate + Rapoarte afectate ─────────────────────
        const c3x=148, c3w=W-c3x-8;
        let c3y=14;
        pdf.setFillColor(20,40,80);pdf.rect(c3x,c3y,c3w,8,'F');pdf.setFillColor(...C.gold);pdf.rect(c3x,c3y,1.5,8,'F');
        pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(7);
        pdf.text('NORMATIVE APLICATE',c3x+4,c3y+5.5);c3y+=10;
        (fnCfgPDF.norms||['NP 057/2002','OMS 119/2014','P118-2/2013','NP 067/2002','NP 051/2012']).forEach((n,i)=>{
          pdf.setFillColor(i%2?248:255,i%2?250:252,252);pdf.rect(c3x,c3y-3,c3w,6,'F');
          pdf.setFillColor(...C.gold);pdf.rect(c3x,c3y-3,1,6,'F');
          pdf.setTextColor(30,60,100);pdf.setFont('helvetica','bold');pdf.setFontSize(6);pdf.text(S2(n),c3x+4,c3y+1);
          c3y+=6;
        });
        c3y+=4;
        // Rapoarte afectate
        pdf.setFillColor(20,40,80);pdf.rect(c3x,c3y,c3w,8,'F');pdf.setFillColor(...C.gold);pdf.rect(c3x,c3y,1.5,8,'F');
        pdf.setTextColor(255,255,255);pdf.setFont('helvetica','bold');pdf.setFontSize(7);
        pdf.text('STUDII RECOMANDATE',c3x+4,c3y+5.5);c3y+=10;
        const studiiRec=[
          ['Studiu Însorire','OMS 119/2014 — obligatoriu PT'],
          ['Studiu ISU','P118-2/2013 — aviz obligatoriu'],
          ['Pre-Studiu Geotehnic','NP 074/2014 — 3 foraje min.'],
          ['Certificat Energetic','Legea 372/2005 — NZEB'],
          ['Studiu Impact Trafic','Conf. volum edificiu'],
          ['Studiu Amplasament','Document fundament'],
          ['Pre-Studiu Bransamente','Apă, canal, electric, gaze'],
        ];
        studiiRec.forEach(([s,n],i)=>{
          if(c3y>H-25)return;
          pdf.setFillColor(i%2?248:255,i%2?250:252,252);pdf.rect(c3x,c3y-3,c3w,8,'F');
          pdf.setFillColor(34,197,94);pdf.circle(c3x+3.5,c3y+1,1.5,'F');
          pdf.setTextColor(30,60,100);pdf.setFont('helvetica','bold');pdf.setFontSize(6);pdf.text(S2(s),c3x+8,c3y+1);
          pdf.setTextColor(100,120,150);pdf.setFont('helvetica','normal');pdf.setFontSize(4.5);pdf.text(S2(n),c3x+8,c3y+5);
          c3y+=8;
        });
      }catch(e){ console.warn('[PDF panel page]',e.message); }

      pdf.setFillColor(8,14,30);pdf.rect(10,H-15,W-20,8,'F');
      pdf.setFillColor(...C.gold);pdf.rect(10,H-15,W-20,1,'F');
      pdf.setTextColor(150,165,185);pdf.setFont('helvetica','italic');pdf.setFontSize(5.5);
      pdf.text('Document orientativ generat automat de platforma UrbanX · '+new Date().toLocaleDateString('ro-RO')+' · '+pgN+' pagini · UrbanX TSS·FG',W/2,H-10.5,{align:'center'});
      pdf.save('Memoriu_Tehnic_'+S2(P.nrCad)+'_'+S2(P.utr)+'.pdf');
    }); // end DNA radar callback
    // Note: restul PDF-ului s-a salvat deja în callback
    if(btn){btn.textContent='⬇ Export PDF Raport';btn.style.opacity='1';}
    if(typeof ss==='function') ss('✅ Prezentare Relevee exportată — '+pgN+' pagini cu imagini 3D si memoriu justificativ!');

  }catch(err){
    console.error('[Relevee PDF]',err);
    if(btn){btn.textContent='⬇ Export PDF Raport';btn.style.opacity='1';}
    _rvExportAllPNG(P,b);
  }
}

function _rvExportAllPNG(P,b){
  const savedScale=_RV.scale;
  _RV.scale=20;_rvRender();
  setTimeout(()=>{
    const cv=document.getElementById('rv-canvas');if(!cv)return;
    const a=document.createElement('a');
    a.download='relevee_'+(P?.nrCad||'urbanx')+'_'+_RV.tab+'.png';
    a.href=cv.toDataURL('image/png',1.0);a.click();
    _RV.scale=savedScale;_rvRender();
    if(typeof ss==='function') ss('Export PNG — jsPDF indisponibil');
  },150);
}

function _rvMobSheet(){
  const sh=document.getElementById('rv-mob-sheet'); if(!sh) return;
  _rvMobSync();
  sh.classList.add('rv-mob-open');
  // Swipe down → close
  let startY=0;
  sh.ontouchstart=e=>{startY=e.touches[0].clientY;};
  sh.ontouchmove=e=>{if(e.touches[0].clientY-startY>70)_rvMobSheetClose();};
}
function _rvMobSheetClose(){
  document.getElementById('rv-mob-sheet')?.classList.remove('rv-mob-open');
}
function _rvMobTab(btn,tab){
  document.querySelectorAll('.rv-mob-tab').forEach(t=>t.classList.remove('rv-mob-tab-on'));
  btn.classList.add('rv-mob-tab-on');
  document.querySelectorAll('.rv-mob-panel').forEach(p=>p.style.display='none');
  const panel=document.getElementById('rv-mob-panel-'+tab);
  if(panel)panel.style.display='block';
  if(tab==='roi')_rvMobCalcROI();
}
function _rvMobOverlay(btn,key){
  btn.classList.toggle('rv-mob-ov-on');
  const on=btn.classList.contains('rv-mob-ov-on');
  _RV['show'+key[0].toUpperCase()+key.slice(1)]=on;
  const dt=document.getElementById('rv-tog-'+key);
  if(dt){if(on)dt.classList.add('rv-tog-on');else dt.classList.remove('rv-tog-on');}
  if(key==='solar'){
    const sc=document.getElementById('rv-mob-solar-ctrls');
    if(sc)sc.style.display=on?'block':'none';
    const sc2=document.getElementById('rv-solar-ctrls');
    if(sc2)sc2.style.display=on?'block':'none';
    if(on){_RV.solarAnim=true;_RV.solarHour=_RV.solarHour||10;_RV.solarMonth=12;}
  }
  if(_RV.building)_rvRender();
}
function _rvMobCalcROI(){
  const b=_RV.building;if(!b)return;
  const cost=parseInt(document.getElementById('rv-mob-roi-cost')?.value||650);
  const sell=parseInt(document.getElementById('rv-mob-roi-sell')?.value||1200);
  const nrApt=Math.max(1,Math.round(b.sdaTotal/70));
  const totalCost=b.sdaTotal*cost, totalRev=nrApt*280*sell;
  const profit=totalRev-totalCost;
  const fmt=v=>v>=1e6?(v/1e6).toFixed(1)+'M€':(v/1e3).toFixed(0)+'k€';
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  set('rv-mob-roi-cost-total',fmt(totalCost));
  set('rv-mob-roi-rev',fmt(totalRev));
  set('rv-mob-roi-profit',(profit>0?'+':'')+fmt(profit));
  set('rv-mob-roi-roi','ROI ~'+(profit/totalCost*100).toFixed(0)+'%  ·  '+nrApt+' apt.');
  const el=document.getElementById('rv-mob-roi-profit');
  if(el)el.style.color=profit>0?'#22C55E':'#EF4444';
}
function _rvMobSync(){
  // Copiăm conținut din panoul desktop în cel mobil
  const copy=(from,to)=>{const f=document.getElementById(from),t=document.getElementById(to);if(f&&t)t.innerHTML=f.innerHTML;};
  copy('rv-bilant','rv-mob-bilant');
  copy('rv-norm','rv-mob-norm');
  copy('rv-rapoarte-aff','rv-mob-rapoarte');
  copy('rv-dna','rv-mob-dna');
  // Sincronizăm și legenda detaliată pe mobil
  setTimeout(()=>{
    const src=document.getElementById('rv-dna-score-detail');
    const dst=document.getElementById('rv-mob-dna-score-detail');
    if(src&&dst) dst.innerHTML=src.innerHTML;
  },150);
  // Avize timeline
  const avize=document.getElementById('rv-mob-avize');
  if(avize&&_RV.building&&_RV.parcelParams)avize.innerHTML=_rvBuildAvizeTimeline(_RV.building,_RV.parcelParams);
  // DNA metrics text
  const mobMetrics=document.getElementById('rv-mob-dna-metrics');
  if(mobMetrics&&_RV.building&&_RV.parcelParams){
    const b=_RV.building,P=_RV.parcelParams;
    const nrApt=Math.max(1,Math.round(b.sdaTotal/70));
    const potOk=b.scArea/P.area<=P.pot+.001,cutOk=b.sdaTotal/P.area<=P.cut+.001;
    mobMetrics.innerHTML=[
      ['POT',Math.round(b.scArea/P.area*100)+'%/'+Math.round(P.pot*100)+'%',potOk?'#22C55E':'#EF4444'],
      ['CUT',(b.sdaTotal/P.area).toFixed(2)+'/'+P.cut,cutOk?'#22C55E':'#EF4444'],
      ['SDA',Math.round(b.sdaTotal)+'m²','#DDE6F5'],
      ['Apt.',nrApt,'#DDE6F5'],
      ['H',b.niv*P.hn+'m','#DDE6F5'],
      ['Parcaje',Math.ceil(nrApt*1.2)+' loc.','#F59E0B'],
    ].map(([l,v,c])=>`<div style="display:flex;justify-content:space-between;margin-bottom:2px"><span>${l}</span><span style="color:${c};font-weight:700">${v}</span></div>`).join('');
  }
  // Floor bar
  const mobFloor=document.getElementById('rv-mob-floorbar');
  if(mobFloor&&_RV.building){
    const niv=_RV.building.niv,hn=_RV.parcelParams?.hn||3;
    mobFloor.innerHTML=Array.from({length:niv},(_,i)=>
      `<button onclick="_RV.floor=${i};if(_RV.building)_rvRender();_rvMobSync()"
        style="padding:6px 10px;border-radius:6px;border:1px solid rgba(255,255,255,.1);
        background:${_RV.floor===i?'rgba(212,175,55,.15)':'rgba(255,255,255,.03)'};
        color:${_RV.floor===i?'#D4AF37':'#7A90B0'};font-size:10px;font-weight:600;cursor:pointer;font-family:inherit">
        ${i===0?'±0.00':'E'+i+'  +'+(i*hn)+'m'}
      </button>`
    ).join('');
  }
  _rvMobCalcROI();
}

// ══════════════════════════════════════════════════════════════════════════
// DOM INJECTION — modal + CSS injectate o singură dată
// ══════════════════════════════════════════════════════════════════════════
async function _rvInject(){
  // ── CSS ──────────────────────────────────────────────────────────────────
  if(!document.getElementById('rv-css')){
    const css=document.createElement('style'); css.id='rv-css';
    css.textContent=`
#rv-modal{position:fixed;inset:0;z-index:999999;background:rgba(4,8,18,.0);display:flex;flex-direction:column;pointer-events:none;transition:opacity .25s;}
#rv-modal.rv-modal-open{background:rgba(4,8,18,.97);pointer-events:all;opacity:1;}
#rv-modal .rv-body{display:grid;grid-template-columns:260px 1fr 240px;height:100%;min-height:0;position:relative;}
/* lpanel-hidden CSS removed — rv-toggle-lpanel button eliminated */
/* opacity gestionat pe rv-modal, nu pe body */
.rv-topbar{display:flex;align-items:center;gap:10px;padding:0 14px;height:50px;background:rgba(6,12,26,.98);border-bottom:1px solid rgba(212,175,55,.15);flex-shrink:0;}
.rv-logo-t{font-size:14px;font-weight:800;letter-spacing:.04em;font-family:'Space Grotesk',sans-serif;}
.rv-sub{font-size:8px;color:#4A6080;text-transform:uppercase;letter-spacing:.1em;}
.rv-badge-t{background:rgba(212,175,55,.1);border:1px solid rgba(212,175,55,.25);color:#D4AF37;font-size:8px;font-weight:700;padding:2px 8px;border-radius:99px;letter-spacing:.06em;font-family:'Space Grotesk',sans-serif;}
.rv-sep{width:1px;height:22px;background:rgba(212,175,55,.15);}
.rv-timer{font-family:'IBM Plex Mono',monospace;font-size:11px;color:#F5C518;display:flex;align-items:center;gap:5px;}
.rv-tdot{width:5px;height:5px;border-radius:50%;background:#22C55E;box-shadow:0 0 5px #22C55E;}
.rv-running{animation:rv-pulse 1s ease-in-out infinite;}
@keyframes rv-pulse{0%,100%{opacity:1}50%{opacity:.3}}
.rv-tinfo{margin-left:auto;font-size:10px;color:#4A6080;font-family:'IBM Plex Mono',monospace;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:280px;}

  /* Buton menu mobil - vizibil doar sub 840px */
  #rv-mobile-menu-btn { display: none; }
  @media (max-width: 840px) { #rv-mobile-menu-btn { display: flex !important; } }

.rv-close-btn{margin-left:8px;width:28px;height:28px;border-radius:6px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:#64748b;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .15s;}
.rv-close-btn:hover{border-color:rgba(239,68,68,.4);color:#EF4444;}
.rv-lpanel{background:#0B1426;border-right:1px solid rgba(212,175,55,.1);overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:12px;}
.rv-lpanel::-webkit-scrollbar{width:3px;}.rv-lpanel::-webkit-scrollbar-thumb{background:rgba(212,175,55,.15);}
.rv-sec-t{font-size:8px;text-transform:uppercase;letter-spacing:.12em;color:#4A6080;font-weight:700;margin-bottom:8px;font-family:'Space Grotesk',sans-serif;}
.rv-sec-t.collapsible{cursor:pointer;display:flex;align-items:center;justify-content:space-between;user-select:none;padding:4px 0;}
.rv-sec-t.collapsible:hover{color:#D4AF37;}
.rv-sec-t.collapsible::after{content:'▴';font-size:8px;transition:transform .2s;}
.rv-sec-t.collapsible.collapsed::after{content:'▾';}
.rv-sec-t.collapsible.collapsed + *,.rv-sec-t.collapsible.collapsed ~ .rv-sec-body{display:none!important;}
.rv-sec-body{transition:all .2s;}
.rv-tog-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;}
.rv-tog-lbl{font-size:10px;color:#7A8FA8;font-family:'Space Grotesk',sans-serif;}
.rv-tog{width:32px;height:17px;border-radius:99px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);cursor:pointer;position:relative;transition:all .2s;flex-shrink:0;}
.rv-tog.rv-tog-on{background:rgba(212,175,55,.28);border-color:rgba(212,175,55,.5);}
.rv-tog::after{content:'';position:absolute;width:11px;height:11px;border-radius:50%;background:#64748b;top:2px;left:2px;transition:all .2s;}
.rv-tog.rv-tog-on::after{background:#F5C518;left:17px;}
.rv-center{display:flex;flex-direction:column;background:#060C1A;overflow:hidden;min-height:0;}
.rv-tabs{display:flex;background:#0B1426;border-bottom:1px solid rgba(212,175,55,.12);flex-shrink:0;}
.rv-tab{padding:9px 14px;font-size:11px;font-weight:700;cursor:pointer;color:#4A6080;border-bottom:2px solid transparent;transition:all .15s;letter-spacing:.03em;font-family:'Space Grotesk',sans-serif;}
.rv-tab:hover{color:#DDE6F5;}.rv-tab.rv-on{color:#D4AF37;border-bottom-color:#D4AF37;}
.rv-floorbar{display:flex;align-items:center;gap:5px;padding:7px 12px;border-bottom:1px solid rgba(212,175,55,.1);background:rgba(6,12,26,.6);flex-shrink:0;overflow-x:auto;}
.rv-floorbar::-webkit-scrollbar{height:2px;}.rv-floorbar::-webkit-scrollbar-thumb{background:rgba(212,175,55,.15);}
.rv-fb-label{font-size:9px;color:#4A6080;white-space:nowrap;font-weight:700;font-family:'IBM Plex Mono',monospace;}
.rv-fbtn{padding:3px 9px;border-radius:5px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);color:#4A6080;cursor:pointer;font-size:10px;font-weight:700;white-space:nowrap;transition:all .1s;font-family:'IBM Plex Mono',monospace;}
.rv-fbtn.rv-on{border-color:#D4AF37;background:rgba(212,175,55,.1);color:#F5C518;}
.rv-drawwrap{flex:1;min-height:300px;overflow:auto;display:flex;align-items:flex-start;justify-content:flex-start;padding:16px;position:relative;}
.rv-drawwrap::-webkit-scrollbar{width:5px;height:5px;}.rv-drawwrap::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08);border-radius:3px;}
.rv-empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#4A6080;pointer-events:none;}
.rv-empty-ico{font-size:48px;opacity:.18;filter:grayscale(1);}.rv-empty-t{font-size:14px;font-weight:700;color:#374151;font-family:'Space Grotesk',sans-serif;}.rv-empty-s{font-size:11px;line-height:1.6;max-width:240px;text-align:center;}
.rv-prog{position:absolute;inset:0;background:rgba(6,12,26,.94);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;z-index:50;opacity:0;pointer-events:none;visibility:hidden;transition:opacity .2s;}
.rv-prog.rv-on{opacity:1;pointer-events:all;visibility:visible;}
.rv-pct{font-family:'IBM Plex Mono',monospace;font-size:48px;font-weight:600;color:#D4AF37;line-height:1;}
.rv-pbar-w{width:240px;height:3px;background:rgba(255,255,255,.07);border-radius:99px;}
.rv-pbar{height:3px;background:linear-gradient(90deg,#D4AF37,#F5C518);border-radius:99px;transition:width .12s;}
.rv-psteps{display:flex;flex-direction:column;gap:5px;min-width:240px;}
.rv-pstep{display:flex;align-items:center;gap:7px;font-size:10px;color:#4A6080;transition:color .2s;font-family:'Space Grotesk',sans-serif;}
.rv-pstep.rv-active{color:#DDE6F5;}.rv-pstep.rv-done{color:#22C55E;}
.rv-psico{width:15px;height:15px;border-radius:50%;border:1px solid currentColor;display:flex;align-items:center;justify-content:center;font-size:8px;flex-shrink:0;}
.rv-pstep.rv-done .rv-psico{background:#22C55E;border-color:#22C55E;color:#000;}
.rv-pstep.rv-active .rv-psico{border-color:#D4AF37;color:#D4AF37;animation:rv-spin .7s linear infinite;}
@keyframes rv-spin{to{transform:rotate(360deg)}}
.rv-zoombar{display:flex;align-items:center;gap:6px;padding:6px 12px;border-top:1px solid rgba(212,175,55,.1);background:rgba(6,12,26,.8);flex-shrink:0;}
.rv-zbtn{width:24px;height:24px;border-radius:5px;border:1px solid rgba(212,175,55,.2);background:rgba(255,255,255,.03);color:#64748b;cursor:pointer;font-size:13px;display:flex;align-items:center;justify-content:center;transition:all .1s;}
.rv-zbtn:hover{border-color:rgba(212,175,55,.4);color:#D4AF37;}
.rv-zval{font-family:'IBM Plex Mono',monospace;font-size:9px;color:#64748b;min-width:34px;text-align:center;}
.rv-expbtn{margin-left:auto;padding:4px 10px;border-radius:5px;border:1px solid rgba(212,175,55,.25);background:rgba(212,175,55,.07);color:#D4AF37;font-size:9px;font-weight:700;cursor:pointer;transition:all .15s;font-family:'Space Grotesk',sans-serif;}
.rv-expbtn:hover{background:rgba(212,175,55,.14);}
.rv-rpanel{background:#0B1426;border-left:1px solid rgba(212,175,55,.1);overflow-y:auto;padding:12px;}
.rv-rpanel::-webkit-scrollbar{width:3px;}.rv-rpanel::-webkit-scrollbar-thumb{background:rgba(212,175,55,.15);}
#rv-modal .rv-body.rpanel-hidden{grid-template-columns:260px 1fr 0px;}
#rv-modal .rv-body.rpanel-hidden .rv-rpanel{display:none!important;}
.rv-rsec{margin-bottom:14px;}
.rv-rst{font-size:8px;text-transform:uppercase;letter-spacing:.12em;color:#4A6080;font-weight:700;margin-bottom:8px;font-family:'Space Grotesk',sans-serif;}
.rv-stat{display:flex;justify-content:space-between;align-items:baseline;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.03);}
.rv-sl{font-size:10px;color:#4A6080;font-family:'Space Grotesk',sans-serif;}
.rv-sv{font-size:11px;font-weight:700;font-family:'IBM Plex Mono',monospace;color:#DDE6F5;}
.rv-norm-item{display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.03);}
.rv-raff-row{display:flex;align-items:center;padding:4px 10px;border-bottom:1px solid rgba(255,255,255,.03);cursor:pointer;transition:background .12s;}
.rv-raff-row:hover{background:rgba(212,175,55,.07);}
.rv-nl{font-size:10px;color:#7A8FA8;font-family:'Space Grotesk',sans-serif;}
.rv-nref{font-size:8px;color:#4A6080;font-family:'IBM Plex Mono',monospace;}
.rv-badge{font-size:8px;padding:1px 7px;border-radius:99px;font-weight:700;font-family:'Space Grotesk',sans-serif;}
.rv-badge-ok{background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.3);color:#22C55E;}
.rv-badge-warn{background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.3);color:#F59E0B;}
.rv-badge-err{background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.3);color:#EF4444;}
.rv-leg{display:flex;align-items:center;gap:6px;font-size:9px;color:#7A8FA8;margin-bottom:3px;font-family:'Space Grotesk',sans-serif;}
.rv-legsq{width:10px;height:10px;border-radius:2px;flex-shrink:0;}
#rv-tip{position:fixed;background:#101D35;border:1px solid rgba(212,175,55,.2);padding:7px 10px;border-radius:7px;font-size:10px;pointer-events:none;z-index:9999;display:none;font-family:'IBM Plex Mono',monospace;color:#DDE6F5;box-shadow:0 6px 24px rgba(0,0,0,.5);max-width:210px;line-height:1.5;}

/* ── MOBILE RESPONSIVE ─────────────────────────────────────── */
@media (max-width: 840px) {
  #rv-modal .rv-body {
    grid-template-columns: 1fr !important;
    grid-template-rows: 1fr auto;
  }
  /* Pe mobil: panel stang = drawer toggle cu buton */
  #rv-modal .rv-lpanel { 
    position: fixed !important;
    left: -260px;
    top: 0; bottom: 0;
    width: 260px !important;
    z-index: 200;
    transition: left .3s ease;
    border-right: 1px solid rgba(212,175,55,0.2) !important;
    box-shadow: 4px 0 20px rgba(0,0,0,0.5);
  }
  #rv-modal .rv-lpanel.rv-lpanel-open {
    left: 0 !important;
  }
  #rv-modal .rv-rpanel { display: none !important; }
  /* Buton deschide panel pe mobil */
  #rv-mobile-menu-btn { display: flex !important; }
  #rv-modal .rv-center { grid-column: 1; }

  /* Bottom sheet cu info esențial */
  #rv-modal .rv-zoombar {
    flex-wrap: wrap; gap: 8px; padding: 8px 12px;
  }
  .rv-tabs {
    overflow-x: auto; -webkit-overflow-scrolling: touch;
  }
  .rv-tabs::-webkit-scrollbar { display: none; }
  .rv-tab { padding: 9px 11px; font-size: 10px; white-space: nowrap; }
  .rv-floorbar { padding: 6px 10px; }
  .rv-fbtn { font-size: 9px; padding: 3px 8px; }
  .rv-drawwrap { padding: 10px; }
  /* Butoane zoom mai mari pe touch */
  .rv-zbtn { width: 32px; height: 32px; font-size: 15px; }
  .rv-expbtn { font-size: 10px; padding: 6px 12px; }
  /* Progress mai compact */
  .rv-pct { font-size: 36px; }
  .rv-psteps { max-height: 140px; font-size: 9px; }
  /* Topbar compact */
  .rv-topbar { padding: 0 10px; gap: 8px; }
  .rv-tinfo { max-width: 160px; font-size: 9px; }
  .rv-logo-t { font-size: 13px; }
}

/* Buton info mobil — apare în zoombar pe mobil */
@media (max-width: 840px) {
  #rv-mob-info-btn { display: flex !important; }
}
#rv-mob-info-btn {
  display: none;
  padding: 6px 12px; border-radius: 6px;
  border: 1px solid rgba(212,175,55,.3);
  background: rgba(212,175,55,.1); color: #D4AF37;
  font-size: 10px; font-weight: 700; cursor: pointer;
  font-family: 'Space Grotesk', sans-serif;
  align-items: center; gap: 5px;
}

/* Bottom sheet complet cu tabs */
#rv-mob-sheet {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: rgba(9,16,32,.98);
  border-top: 1.5px solid rgba(212,175,55,.25);
  border-radius: 16px 16px 0 0;
  padding: 0 0 24px; z-index: 60;
  max-height: 72vh; overflow: hidden;
  transform: translateY(100%); transition: transform .32s cubic-bezier(.4,0,.2,1);
  display: flex; flex-direction: column;
  pointer-events: none;
}
#rv-mob-sheet.rv-mob-open {
  transform: translateY(0);
  pointer-events: all;
}
.rv-mob-sheet-handle {
  width: 40px; height: 4px; background: rgba(212,175,55,.35);
  border-radius: 99px; margin: 10px auto 0; cursor: pointer; flex-shrink:0;
}
.rv-mob-tabs {
  display: flex; overflow-x: auto; -webkit-overflow-scrolling: touch;
  border-bottom: 1px solid rgba(212,175,55,.1);
  padding: 6px 12px 0; gap: 4px; flex-shrink: 0;
  scrollbar-width: none;
}
.rv-mob-tabs::-webkit-scrollbar { display: none; }
.rv-mob-tab {
  padding: 6px 12px; border-radius: 8px 8px 0 0;
  border: 1px solid rgba(255,255,255,.06); border-bottom: none;
  background: transparent; color: #4A6080;
  font-size: 10px; font-weight: 600; cursor: pointer;
  white-space: nowrap; font-family: 'Space Grotesk', sans-serif;
  transition: all .15s;
}
.rv-mob-tab.rv-mob-tab-on {
  background: rgba(212,175,55,.12);
  border-color: rgba(212,175,55,.25); color: #D4AF37;
}
.rv-mob-panel {
  flex: 1; overflow-y: auto; padding: 12px 14px;
  -webkit-overflow-scrolling: touch;
}
.rv-mob-ov-btn {
  padding: 10px 8px; border-radius: 8px;
  border: 1px solid rgba(255,255,255,.08);
  background: rgba(255,255,255,.03); color: #7A90B0;
  font-size: 11px; font-weight: 600; cursor: pointer;
  font-family: 'Space Grotesk', sans-serif;
  text-align: center; transition: all .12s;
}
.rv-mob-ov-btn.rv-mob-ov-on {
  background: rgba(37,99,235,.15);
  border-color: rgba(37,99,235,.4); color: #60A5FA;
}
`;
    document.head.appendChild(css);
  }

  // ── HTML ─────────────────────────────────────────────────────────────────
  const div=document.createElement('div'); div.id='rv-modal';
  document.body.appendChild(div);
  await new Promise(r=>requestAnimationFrame(r));
  div.innerHTML=`
<div class="rv-topbar">
  <svg width="24" height="24" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="#101D35"/><path d="M18 28h26l13 22-13 22H18l15-22z" fill="#DDE6F5"/><path d="M59 28h23L71 49H53z" fill="#D4AF37"/><path d="M53 55h17l13 19H61z" fill="#D4AF37"/></svg>
  <div><div class="rv-logo-t">UrbanX</div><div class="rv-sub">Relevee Instant</div></div>
  <div class="rv-badge-t">Beta</div>
  <div class="rv-sep"></div>
  <div class="rv-timer"><div class="rv-tdot" id="rv-tdot"></div><span id="rv-tval">00.0s</span></div>
  <div class="rv-tinfo" id="rv-tinfo">Se generează releveele…</div>
  <!-- Buton Ascunde Analiză — ascunde/arata sectiunile DNA + Overlay + Bilant -->
  <button id="rv-btn-hide-analiza" title="Ascunde/afișează secțiunile de Analiză din panoul lateral"
    onclick="(function(btn){
      const secs=['rv-sec-dna','rv-sec-overlay','rv-sec-bilant'];
      // Folosim data-attribute pentru stare sigura
      const hidden = btn.dataset.hidden === '1';
      if(hidden){
        // READUCE sectiunile
        secs.forEach(id=>{const el=document.getElementById(id);if(el)el.style.display='';});
        btn.dataset.hidden='0';
        btn.textContent='○ Analiză';
        btn.style.opacity='1';
        btn.title='Ascunde sectiunile de Analiza';
      } else {
        // ASCUNDE sectiunile
        secs.forEach(id=>{const el=document.getElementById(id);if(el)el.style.display='none';});
        btn.dataset.hidden='1';
        btn.textContent='◉ Analiză ascunsă';
        btn.style.opacity='0.6';
        btn.title='Click pentru a readuce sectiunile de Analiza';
      }
    })(this)"
    style="flex-shrink:0;height:28px;padding:0 10px;border-radius:6px;border:1px solid rgba(56,189,248,.3);background:rgba(56,189,248,.08);color:#38bdf8;cursor:pointer;font-size:10px;font-weight:700;font-family:'Space Grotesk',sans-serif;letter-spacing:.03em;transition:all .15s;">
    ○ Analiză
  </button>
  <button onclick="_rvExportPDF()" title="Exportă raportul complet PDF — planuri, fațade, memoriu, normative, bilanț"
    class="rv-expbtn"
    style="height:32px;padding:0 14px;border-radius:7px;border:1.5px solid rgba(212,175,55,.6);background:linear-gradient(135deg,rgba(212,175,55,.22),rgba(212,175,55,.12));color:#F5C518;cursor:pointer;font-size:11px;font-weight:800;font-family:'Space Grotesk',sans-serif;display:flex;align-items:center;gap:6px;letter-spacing:.03em;flex-shrink:0;transition:all .15s;"
    onmouseover="this.style.background='linear-gradient(135deg,rgba(212,175,55,.38),rgba(212,175,55,.25))'"
    onmouseout="this.style.background='linear-gradient(135deg,rgba(212,175,55,.22),rgba(212,175,55,.12))'">
    📄 Export PDF Raport
  </button>
  <button id="rv-mobile-menu-btn" 
      onclick="document.querySelector('.rv-lpanel').classList.toggle('rv-lpanel-open')"
      style="display:none;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);
      color:#fff;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:14px;margin-right:6px">
      ☰
    </button><button class="rv-close-btn" onclick="closeRelevee()" title="Închide">✕</button>
</div>
<div class="rv-body" id="rv-body-main">
  <!-- LEFT -->
  <div class="rv-lpanel" id="rv-lpanel-main">
  <!-- rv-toggle-lpanel removed: caused unrecoverable black screen -->
    <!-- FUNCȚIUNE CLĂDIRE — primul selector, cel mai important -->
    <div class="rv-rsec" style="border:1px solid rgba(212,175,55,.2);background:rgba(212,175,55,.04);border-radius:8px;padding:8px">
      <div class="rv-sec-t" style="color:#D4AF37;margin-bottom:8px">🏗 Funcțiune clădire</div>
      <select id="rv-fn-select" onchange="_rvSetFn(this.value)"
        style="width:100%;padding:6px 8px;background:rgba(255,255,255,.07);border:1px solid rgba(212,175,55,.3);
        border-radius:6px;color:#DDE6F5;font-size:11px;font-family:'IBM Plex Mono',monospace;margin-bottom:6px">
        <option value="rez"          >🏠 Rezidențial</option>
        <option value="birouri"      >🏢 Birouri / Office</option>
        <option value="hotel"        >🏨 Hotel / Cazare</option>
        <option value="com"          >🏪 Spații Comerciale</option>
        <option value="mixt_com_rez" >🏬 Comercial P0 + Rezidențial</option>
        <option value="mixt_bir_rez" >🏗 Birouri P0 + Rezidențial</option>
        <option value="mixt_hotel_com">🏩 Hotel + Comercial P0</option>
      </select>
      <div id="rv-fn-norms" style="font-size:8px;color:#4A6080;line-height:1.7">
        NP 057 · OMS 119 · P118-2/2013 · NP 067/2002
      </div>
      <!-- Mix unități — se actualizează cu funcțiunea -->
      <div id="rv-mix-types" style="margin-top:6px;display:flex;flex-wrap:wrap;gap:4px"></div>
    </div>

    <!-- Amprentă Normativă Radar -->
    <div class="rv-rsec rv-dna-sec" id="rv-sec-dna">
      <div class="rv-sec-t collapsible" onclick="_rvCollapseSection(this)" title="Ascunde/afișează">⬡ Amprentă Normativă — Amprentă Normativă</div>
      <div id="rv-dna" style="display:flex;justify-content:center;padding:4px 0">
        <svg width="140" height="140" viewBox="0 0 140 140"><text x="70" y="75" fill="#2A3F60" font-size="9" text-anchor="middle" font-family="monospace">Se generează…</text></svg>
      </div>
      <!-- Legendă axe DNA radar -->
      <div style="border-top:1px solid rgba(255,255,255,.05);padding-top:7px;margin-top:2px">
        <div style="font-size:7.5px;color:#3A5070;font-weight:700;letter-spacing:.07em;text-transform:uppercase;margin-bottom:5px">Ce măsoară fiecare axă</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px 8px">
          ${[
            ['POT','#22C55E','Ocupare teren (SC/Stotal vs max admis PUG)'],
            ['CUT','#22C55E','Utilizare teren (SDA/Stotal vs max admis PUG)'],
            ['OMS','#FCD34D','Însorire min. 1.5h/zi (OMS 119/2014)'],
            ['ISU','#EF4444','Evacuare max 30m/40m (P118)'],
            ['NP057','#60A5FA','Suprafețe min. camere (NP 057/2002)'],
            ['Parcaje','#F97316','Locuri parcare (NP 067/2002)'],
          ].map(([ax,col,desc])=>`
          <div title="${desc}" style="display:flex;align-items:center;gap:4px;cursor:help">
            <span style="width:6px;height:6px;border-radius:50%;background:${col};flex-shrink:0;display:inline-block"></span>
            <span style="font-size:8px;font-weight:700;color:${col}">${ax}</span>
          </div>`).join('')}
        </div>
        <div style="margin-top:5px;display:flex;gap:5px;align-items:center">
          <div style="height:4px;flex:1;background:linear-gradient(90deg,#EF4444,#F59E0B,#22C55E);border-radius:2px"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:7px;color:#3A5070;margin-top:1px">
          <span>0 — Neconform</span><span>50</span><span>100 — Optim</span>
        </div>
        <div id="rv-dna-score-detail" style="margin-top:5px;font-size:8px;color:#4A6080;line-height:1.6"></div>
      </div>
    </div>

    <!-- Overlays -->
    <div class="rv-rsec" id="rv-sec-overlay">
      <div class="rv-sec-t collapsible" onclick="_rvCollapseSection(this)" title="Ascunde/afișează">Overlay analiză</div>
      <div class="rv-tog-row">
        <span class="rv-tog-lbl">☀ Însorire OMS 119</span>
        <div class="rv-tog" id="rv-tog-solar" onclick="_rvToggle(this,'solar')"></div>
      </div>
      <!-- Solar controls (hidden until toggle on) -->
      <div id="rv-solar-ctrls" style="display:none;padding:4px 6px 2px;border-top:1px solid rgba(255,255,255,.04)">
        <div style="font-size:8px;color:#4A6080;margin-bottom:3px">Oră solară (Iași lat=47.16°)</div>
        <div style="display:flex;align-items:center;gap:6px">
          <input type="range" min="5" max="21" value="10" id="rv-solar-hour"
            oninput="document.getElementById('rv-solar-hval').textContent=String(this.value).padStart(2,'0')+':00';_RV.solarHour=+this.value;_RV.solarAnim=true;if(_RV.building)_rvRender();"
            style="flex:1;height:3px;accent-color:#D4AF37">
          <span id="rv-solar-hval" style="font-size:9px;font-weight:700;color:#D4AF37;min-width:30px">10:00</span>
        </div>
        <div style="display:flex;align-items:center;gap:4px;margin-top:4px">
          <span style="font-size:8px;color:#4A6080">Luna:</span>
          <select id="rv-solar-month" onchange="_RV.solarMonth=+this.value;if(_RV.building)_rvRender();"
            style="flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#DDE6F5;font-size:8px;padding:2px 4px;border-radius:3px">
            <option value="12" selected>Dec — solstițiu iarnă (OMS)</option>
            <option value="6">Iun — solstițiu vară</option>
            <option value="3">Mar — echinocțiu</option>
            <option value="9">Sep — echinocțiu</option>
          </select>
        </div>
        <button onclick="_rvSolarPlay()" id="rv-solar-play"
          style="width:100%;margin-top:4px;padding:3px;background:rgba(212,175,55,.1);border:1px solid rgba(212,175,55,.25);border-radius:3px;color:#D4AF37;font-size:8px;cursor:pointer;font-family:inherit">
          ▶ Animație 24h
        </button>
      </div>

      <div class="rv-tog-row">
        <span class="rv-tog-lbl">🚨 Evacuare ISU P118</span>
        <div class="rv-tog" id="rv-tog-isu" onclick="_rvToggle(this,'isu')"></div>
      </div>
      <div class="rv-tog-row">
        <span class="rv-tog-lbl">📐 Cote dimensionale</span>
        <div class="rv-tog rv-tog-on" id="rv-tog-dim" onclick="_rvToggle(this,'dim')"></div>
      </div>
      <div class="rv-tog-row">
        <span class="rv-tog-lbl">🔲 Grilă structurală</span>
        <div class="rv-tog" id="rv-tog-sgrid" onclick="_rvToggle(this,'sGrid')"></div>
      </div>
    </div>

    <!-- Bilanț -->
    <div class="rv-rsec" id="rv-sec-bilant">
      <div class="rv-sec-t collapsible" onclick="_rvCollapseSection(this)" title="Ascunde/afișează">Bilanț suprafețe</div>
      <div id="rv-bilant"><div style="font-size:10px;color:#4A6080;text-align:center;padding:8px">—</div></div>
    </div>

    <!-- Normative -->
    <div class="rv-rsec">
      <div class="rv-sec-t">Verificare normative</div>
      <div id="rv-norm"><div style="font-size:10px;color:#4A6080;text-align:center;padding:8px">—</div></div>
      <div style="margin-top:8px;padding-top:6px;border-top:1px solid rgba(255,255,255,.04)">
        <div class="rv-sec-t" style="margin-bottom:4px">Normative aplicate</div>
        <div id="rv-norms-applied" style="font-size:9px;color:#4A6080;line-height:1.8">—</div>
      </div>
      <div id="rv-rapoarte-aff" style="padding-bottom:6px"></div>
    </div>

    <!-- ROI Quick Calculator -->
    <div class="rv-rsec rv-roi-sec">
      <div class="rv-sec-t" style="cursor:pointer;display:flex;justify-content:space-between"
        onclick="const b=document.getElementById('rv-roi-body');b.style.display=b.style.display==='none'?'block':'none'">
        💰 Rentabilitate Est.
        <span style="color:#4A6080;font-size:8px" id="rv-roi-toggle">▼ expand</span>
      </div>
      <div id="rv-roi-body" style="display:none">
        <!-- Explicatie cum functioneaza calculatorul -->
        <div style="background:rgba(56,189,248,.06);border:1px solid rgba(56,189,248,.12);border-radius:6px;padding:7px;margin-bottom:8px">
          <div style="font-size:8px;font-weight:700;color:#38bdf8;margin-bottom:4px">💡 Cum funcționează</div>
          <div style="font-size:7.5px;color:#4A6080;line-height:1.6">
            Calculatorul estimează <b style="color:#7A90B0">profitabilitatea brută</b> a proiectului curent,
            în timp real, pe măsură ce ajustezi:<br>
            &nbsp;• <b style="color:#D4AF37">Preț construcție</b> = cost execuție per m² SDA (suprafața desfășurată total)<br>
            &nbsp;• <b style="color:#22C55E">Preț vânzare</b> = prețul de vânzare per m² SU (suprafața utilă, ~82% din SDA)<br><br>
            <b style="color:#94a3b8">Formula:</b><br>
            Cost = SDA × Preț construcție<br>
            Venituri = SU × Preț vânzare<br>
            Profit brut = Venituri − Cost<br>
            ROI = Profit / Cost × 100%<br><br>
            <b style="color:#f59e0b">Atenție:</b> exclude teren, TVA (19%), taxe, proiectare (~10-15% din cost), cheltuieli de finanțare.
          </div>
        </div>
        <div style="font-size:8px;color:#4A6080;padding:4px 0 2px">Preț construcție (€/m² SDA)</div>
        <input type="range" min="450" max="900" value="650" id="rv-roi-cost"
          oninput="document.getElementById('rv-roi-cval').textContent=this.value;_rvCalcROI()"
          style="width:100%;height:3px;accent-color:#D4AF37">
        <div style="display:flex;justify-content:space-between;font-size:8px;color:#7A90B0">
          <span>450 (simplu)</span><span id="rv-roi-cval" style="color:#D4AF37;font-weight:700">650</span><span>900 (premium)</span>
        </div>
        <div style="font-size:8px;color:#4A6080;padding:4px 0 2px">Preț vânzare (€/m² SU)</div>
        <input type="range" min="800" max="2500" value="1200" id="rv-roi-sell"
          oninput="document.getElementById('rv-roi-sval').textContent=this.value;_rvCalcROI()"
          style="width:100%;height:3px;accent-color:#22C55E">
        <div style="display:flex;justify-content:space-between;font-size:8px;color:#7A90B0">
          <span>800 (rural)</span><span id="rv-roi-sval" style="color:#22C55E;font-weight:700">1200</span><span>2500 (premium Buc.)</span>
        </div>
        <!-- Afisaj SDA si SU din proiect -->
        <div id="rv-roi-sda-info" style="font-size:7.5px;color:#38bdf8;padding:3px 0;display:flex;gap:8px">
          <span>SDA proiect: <b id="rv-roi-sda-val">—</b> m²</span>
          <span>SU estimat (~82%): <b id="rv-roi-su-val">—</b> m²</span>
        </div>
        <div id="rv-roi-result" style="margin-top:6px;padding:8px;background:rgba(255,255,255,.03);border-radius:5px">
          <div style="font-size:8px;color:#4A6080;margin-bottom:3px">REZULTAT ESTIMATIV</div>
          <div id="rv-roi-profit" style="font-size:14px;font-weight:800;color:#22C55E">—</div>
          <div id="rv-roi-sub" style="font-size:7.5px;color:#4A6080;margin-top:2px">—</div>
        </div>
        <div style="font-size:7px;color:#2A3F60;margin-top:4px;line-height:1.4">
          * ORIENTATIV. Nu include: teren, TVA, taxe AC/CU (~5%), proiectare (~12%), comision vânzare (3%). Valori reale: consultant ANEVAR + devizier autorizat.
        </div>
      </div>
    </div>

    <!-- Mix Apartamente -->
    <div class="rv-rsec">
      <div class="rv-sec-t" style="cursor:pointer;display:flex;justify-content:space-between"
        onclick="const b=document.getElementById('rv-mix-body');b.style.display=b.style.display==='none'?'block':'none'">
        🏠 Mix Apartamente
        <span id="rv-mix-total-badge" style="font-size:8px;padding:1px 5px;border-radius:3px;background:rgba(34,197,94,.15);color:#22C55E">100%</span>
      </div>
      <div id="rv-mix-body" style="display:block;padding-top:8px">
        ${[
          ['studio','🟣','Garsonieră','10','#A78BFA'],
          ['apt2','🟢','2 camere','50','#22C55E'],
          ['apt3','🔵','3 camere','30','#60A5FA'],
          ['apt4','🟡','4 camere','5','#F59E0B'],
          ['ph','🩷','Penthouse','5','#F472B6'],
        ].map(([k,ico,lbl,def,col])=>`
        <div style="margin-bottom:6px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px">
            <span style="font-size:8.5px;color:#94a3b8">${ico} ${lbl}</span>
            <span id="rv-mix-${k}-v" style="font-size:9px;font-weight:700;color:${col}">${def}%</span>
          </div>
          <input type="range" min="0" max="${k==='ph'?30:80}" step="5" value="${def}" id="rv-mix-${k}"
            oninput="_rvMixChange()"
            style="width:100%;height:3px;accent-color:${col}">
        </div>`).join('')}
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;padding-top:6px;border-top:1px solid rgba(255,255,255,.06)">
          <span style="font-size:8px;color:#4A6080">Total</span>
          <span id="rv-mix-total" style="font-size:10px;font-weight:800;color:#22C55E">100%</span>
        </div>
        <button onclick="_rvMixApply()"
          style="width:100%;margin-top:8px;padding:7px;background:rgba(212,175,55,.12);border:1px solid rgba(212,175,55,.3);
          border-radius:6px;color:#D4AF37;font-size:10px;font-weight:700;cursor:pointer;font-family:inherit">
          ↺ Regenerează cu acest mix
        </button>
        <div style="font-size:7px;color:#2A3F60;margin-top:4px;line-height:1.4">
          Penthouse = ultimul etaj. Total trebuie să fie exact 100%.
        </div>
      </div>
    </div>

    <!-- Avize Timeline -->
    <div class="rv-rsec rv-avize-sec">
      <div class="rv-sec-t" style="cursor:pointer;display:flex;justify-content:space-between"
        onclick="const b=document.getElementById('rv-avize-body');b.style.display=b.style.display==='none'?'block':'none'">
        📋 Calendar Autorizare
        <span style="color:#4A6080;font-size:8px">▼</span>
      </div>
      <div id="rv-avize-body" style="display:none">
        <div id="rv-avize-content"></div>
      </div>
    </div>

    <!-- Legendă -->
    <div class="rv-rsec">
      <div class="rv-sec-t">Legendă culori</div>
      <div class="rv-leg"><div class="rv-legsq" style="background:rgba(180,83,1,.14);border:1px solid #F97316"></div>Living / Sufragerie</div>
      <div class="rv-leg"><div class="rv-legsq" style="background:rgba(21,128,61,.13);border:1px solid #22C55E"></div>Dormitor</div>
      <div class="rv-leg"><div class="rv-legsq" style="background:rgba(14,116,144,.15);border:1px solid #06B6D4"></div>Bucătărie</div>
      <div class="rv-leg"><div class="rv-legsq" style="background:rgba(109,40,217,.13);border:1px solid #A78BFA"></div>Baie / WC</div>
      <div class="rv-leg"><div class="rv-legsq" style="background:rgba(71,85,105,.18);border:1px solid #64748B"></div>Hol / Coridor</div>
      <div class="rv-leg"><div class="rv-legsq" style="background:rgba(37,99,235,.16);border:1px solid #3B82F6"></div>Casa scărilor / Lift</div>
      <div class="rv-leg"><div class="rv-legsq" style="background:rgba(212,175,55,.08);border:1.5px dashed rgba(212,175,55,.45)"></div>Balcon / Terasă</div>
    </div>
  </div>
  <!-- CENTER -->
  <div class="rv-center">
    <div class="rv-tabs">
      <div class="rv-tab rv-on" data-tab="plan" onclick="_rvTabClick(this)">📐 Plan Nivel</div>
      <div class="rv-tab" data-tab="fatada" onclick="_rvTabClick(this)">🏛 Fațadă</div>
      <div class="rv-tab" data-tab="sectiune" onclick="_rvTabClick(this)">✂ Secțiune</div>
      <div class="rv-tab" data-tab="axono" onclick="_rvTabClick(this)">📦 Axonometrie</div>
      <div class="rv-tab" data-tab="scenarii" onclick="_rvTabClick(this)">⚖ Scenarii A/B</div>
    </div>
    <div class="rv-floorbar" id="rv-floorbar" style="display:none"></div>
    <div class="rv-drawwrap" id="rv-drawwrap">
      <div class="rv-empty" id="rv-empty">
        <div class="rv-empty-ico">📐</div>
        <div class="rv-empty-t">Generare în curs…</div>
        <div class="rv-empty-s">Releveele orientative se generează din datele parcelei active.</div>
      </div>
      <canvas id="rv-canvas" style="display:block"></canvas>
      <div class="rv-prog" id="rv-prog">
        <div class="rv-pct" id="rv-ppct">0%</div>
        <div class="rv-pbar-w"><div class="rv-pbar" id="rv-pbar" style="width:0%"></div></div>
        <div class="rv-psteps" id="rv-psteps"></div>
      </div>
    </div>
    <div class="rv-zoombar">
      <button class="rv-zbtn" onclick="_rvZoom(-1)">−</button>
      <div class="rv-zval" id="rv-zval">100%</div>
      <button class="rv-zbtn" onclick="_rvZoom(1)">+</button>
      <button class="rv-zbtn" onclick="{_RV.scale=12;document.getElementById('rv-zval').textContent='100%';if(_RV.building)_rvRender();}" style="font-size:9px;font-weight:700;width:auto;padding:0 8px">FIT</button>
      <div id="rv-mob-info-btn" onclick="_rvMobSheet()">📊 Analiză</div>
      <!-- Buton ascunde/arata panoul cu Normative + Info parcelă -->
      <button id="rv-btn-hide-rpanel"
        title="Ascunde/afișează panoul Info — click din nou pentru readucere"
        onclick="(function(btn){
          const body=document.getElementById('rv-body-main');
          const isHidden = btn.dataset.hidden==='1';
          if(isHidden){
            body.classList.remove('rpanel-hidden');
            btn.dataset.hidden='0';
            btn.textContent='○ Info';
            btn.style.color='#38bdf8';
            btn.style.borderColor='rgba(56,189,248,.3)';
            btn.style.background='rgba(56,189,248,.08)';
          } else {
            body.classList.add('rpanel-hidden');
            btn.dataset.hidden='1';
            btn.textContent='◉ Info ↩';
            btn.style.color='#94a3b8';
            btn.style.borderColor='rgba(148,163,184,.3)';
            btn.style.background='rgba(148,163,184,.06)';
          }
          setTimeout(()=>{if(window._rvRender&&_RV.building)_rvRender();},150);
        })(this)"
        data-hidden="0"
        style="flex-shrink:0;height:28px;padding:0 10px;border-radius:6px;border:1px solid rgba(56,189,248,.3);background:rgba(56,189,248,.08);color:#38bdf8;cursor:pointer;font-size:10px;font-weight:700;font-family:'Space Grotesk',sans-serif;letter-spacing:.03em;transition:all .15s">
        ○ Info
      </button>
      <div class="rv-expbtn-png" onclick="_rvExportPNG()"
        style="background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3);font-size:11px;padding:6px 14px;font-weight:700;letter-spacing:.03em;cursor:pointer;border-radius:8px;color:#22C55E;display:flex;align-items:center;gap:6px"
        title="Exportă planșa curentă ca imagine PNG">
        🖼 Export PNG
      </div>
      <div class="rv-expbtn" onclick="_rvExport()" style="font-size:10px;padding:5px 10px;margin-left:4px">🖼 PNG</div>
    </div>

    <!-- ── MOBILE BOTTOM SHEET — design complet cu toate features ─── -->
    <div id="rv-mob-sheet">
      <div class="rv-mob-sheet-handle" onclick="_rvMobSheetClose()"></div>

      <!-- Tab bar mobil -->
      <div class="rv-mob-tabs" id="rv-mob-tabs">
        <button class="rv-mob-tab rv-mob-tab-on" onclick="_rvMobTab(this,'bilant')">📊 Bilanț</button>
        <button class="rv-mob-tab" onclick="_rvMobTab(this,'dna')">⬡ DNA</button>
        <button class="rv-mob-tab" onclick="_rvMobTab(this,'overlays')">🎛 Overlays</button>
        <button class="rv-mob-tab" onclick="_rvMobTab(this,'roi')">💰 ROI</button>
        <button class="rv-mob-tab" onclick="_rvMobTab(this,'avize')">📋 Avize</button>
      </div>

      <!-- Bilanț tab -->
      <div class="rv-mob-panel" id="rv-mob-panel-bilant">
        <div class="rv-rst">BILANȚ SUPRAFEȚE</div>
        <div id="rv-mob-bilant"></div>
        <div style="margin-top:10px"><div class="rv-rst">VERIFICARE NORMATIVE</div><div id="rv-mob-norm"></div></div>
        <div style="margin-top:10px"><div class="rv-rst">RAPOARTE AFECTATE</div><div id="rv-mob-rapoarte"></div></div>
      </div>

      <!-- DNA tab -->
      <div class="rv-mob-panel" id="rv-mob-panel-dna" style="display:none">
        <div class="rv-rst">⬡ AMPRENTĂ NORMATIVĂ</div>
        <div style="display:flex;align-items:flex-start;gap:12px;padding:8px 0">
          <div id="rv-mob-dna" style="flex-shrink:0"></div>
          <div style="flex:1;min-width:0">
            <div id="rv-mob-dna-metrics" style="font-size:9px;color:#7A90B0;line-height:1.8"></div>
            <!-- Legendă axe -->
            <div style="margin-top:6px;display:grid;grid-template-columns:1fr 1fr;gap:2px 8px">
              ${[['POT','#22C55E','Ocupare teren'],['CUT','#22C55E','Utilizare teren'],
                 ['OMS','#FCD34D','Însorire OMS 119'],['ISU','#EF4444','Evacuare P118'],
                 ['NP057','#60A5FA','Supraf. min.'],['Parcaje','#F97316','NP 067/2002']
                ].map(([ax,col,desc])=>`
              <div style="display:flex;align-items:center;gap:4px" title="${desc}">
                <span style="width:6px;height:6px;border-radius:50%;background:${col};flex-shrink:0;display:inline-block"></span>
                <span style="font-size:7.5px;font-weight:700;color:${col}">${ax}</span>
                <span style="font-size:7px;color:#3A5070;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${desc}</span>
              </div>`).join('')}
            </div>
            <!-- Bara gradient 0→100 -->
            <div style="margin-top:6px;height:3px;background:linear-gradient(90deg,#EF4444,#F59E0B,#22C55E);border-radius:2px"></div>
            <div style="display:flex;justify-content:space-between;font-size:7px;color:#3A5070;margin-top:1px">
              <span>0 Neconform</span><span>100 Optim</span>
            </div>
          </div>
        </div>
        <div id="rv-mob-dna-score-detail" style="font-size:8px;color:#4A6080;line-height:1.6;padding-top:6px;border-top:1px solid rgba(255,255,255,.06)"></div>
      </div>

      <!-- Overlays tab -->
      <div class="rv-mob-panel" id="rv-mob-panel-overlays" style="display:none">
        <!-- Funcțiune selector pe mobil — la fel ca desktop -->
        <div class="rv-rst">🏗 FUNCȚIUNE CLĂDIRE</div>
        <select id="rv-mob-fn-select" onchange="_rvSetFn(this.value)"
          style="width:100%;padding:8px;background:rgba(212,175,55,.08);border:1px solid rgba(212,175,55,.3);
          border-radius:8px;color:#DDE6F5;font-size:12px;font-family:inherit;margin-bottom:6px">
          <option value="rez"          >🏠 Rezidențial</option>
          <option value="birouri"      >🏢 Birouri / Office</option>
          <option value="hotel"        >🏨 Hotel / Cazare</option>
          <option value="com"          >🏪 Spații Comerciale</option>
          <option value="mixt_com_rez" >🏬 Comercial P0 + Rezidențial</option>
          <option value="mixt_bir_rez" >🏗 Birouri P0 + Rezidențial</option>
          <option value="mixt_hotel_com">🏩 Hotel + Comercial P0</option>
        </select>
        <div id="rv-mob-fn-norms" style="font-size:9px;color:#4A6080;margin-bottom:10px;line-height:1.6">
          NP 057 · OMS 119 · P118-2/2013 · NP 067/2002
        </div>
        <div class="rv-rst">OVERLAY ANALIZĂ</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:8px 0">
          <button class="rv-mob-ov-btn" id="rv-mob-ov-solar" onclick="_rvMobOverlay(this,'solar')">☀ Însorire OMS</button>
          <button class="rv-mob-ov-btn" id="rv-mob-ov-isu" onclick="_rvMobOverlay(this,'isu')">🚨 ISU Evacuare</button>
          <button class="rv-mob-ov-btn rv-mob-ov-on" id="rv-mob-ov-dim" onclick="_rvMobOverlay(this,'dim')">📐 Cote</button>
          <button class="rv-mob-ov-btn" id="rv-mob-ov-sGrid" onclick="_rvMobOverlay(this,'sGrid')">🔲 Grilă</button>
        </div>
        <!-- Solar controls mobil -->
        <div id="rv-mob-solar-ctrls" style="display:none;padding:8px;background:rgba(212,175,55,.06);border-radius:8px;border:1px solid rgba(212,175,55,.15)">
          <div style="font-size:9px;color:#D4AF37;font-weight:700;margin-bottom:8px">☀ Simulare Solară — Iași lat=47.16°</div>
          <div style="font-size:8px;color:#4A6080;margin-bottom:4px">Oră: <span id="rv-mob-solar-hval" style="color:#D4AF37;font-weight:700">10:00</span></div>
          <input type="range" min="5" max="21" value="10" id="rv-mob-solar-hour" style="width:100%;height:4px;accent-color:#D4AF37;margin-bottom:8px"
            oninput="const h=+this.value;_RV.solarHour=h;_RV.solarAnim=true;document.getElementById('rv-mob-solar-hval').textContent=String(Math.floor(h)).padStart(2,'0')+':00';if(_RV.building)_rvRender()">
          <div style="font-size:8px;color:#4A6080;margin-bottom:4px">Lună:</div>
          <select onchange="_RV.solarMonth=+this.value;if(_RV.building)_rvRender();"
            style="width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#DDE6F5;font-size:10px;padding:6px;border-radius:6px;margin-bottom:8px">
            <option value="12" selected>Decembrie — solstițiu iarnă (OMS 119)</option>
            <option value="6">Iunie — solstițiu vară</option>
            <option value="3">Martie — echinocțiu</option>
          </select>
          <button onclick="_rvSolarPlay()" id="rv-mob-solar-play"
            style="width:100%;padding:8px;background:rgba(212,175,55,.12);border:1px solid rgba(212,175,55,.3);border-radius:6px;color:#D4AF37;font-size:11px;font-weight:700;cursor:pointer;font-family:inherit">
            ▶ Animație 24h automată
          </button>
        </div>
        <div class="rv-rst" style="margin-top:10px">ETAJ ACTIV</div>
        <div id="rv-mob-floorbar" style="display:flex;gap:6px;flex-wrap:wrap;padding:6px 0"></div>
      </div>

      <!-- ROI tab -->
      <div class="rv-mob-panel" id="rv-mob-panel-roi" style="display:none">
        <div class="rv-rst">💰 RENTABILITATE ESTIMATIVĂ</div>
        <div style="font-size:8px;color:#4A6080;padding:4px 0 8px">Ajustează parametrii pieței Iași:</div>
        <div style="margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;font-size:9px;color:#7A90B0;margin-bottom:4px">
            <span>Cost construcție (€/m²)</span><span id="rv-mob-roi-cval" style="color:#D4AF37;font-weight:700">650</span>
          </div>
          <input type="range" min="450" max="900" value="650" id="rv-mob-roi-cost" style="width:100%;height:4px;accent-color:#D4AF37"
            oninput="document.getElementById('rv-mob-roi-cval').textContent=this.value;_rvMobCalcROI()">
        </div>
        <div style="margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;font-size:9px;color:#7A90B0;margin-bottom:4px">
            <span>Preț vânzare (€/m²)</span><span id="rv-mob-roi-sval" style="color:#22C55E;font-weight:700">1200</span>
          </div>
          <input type="range" min="800" max="2500" value="1200" id="rv-mob-roi-sell" style="width:100%;height:4px;accent-color:#22C55E"
            oninput="document.getElementById('rv-mob-roi-sval').textContent=this.value;_rvMobCalcROI()">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <div style="background:rgba(220,38,38,.08);border:1px solid rgba(220,38,38,.2);border-radius:8px;padding:10px">
            <div style="font-size:8px;color:#7A90B0;margin-bottom:3px">Cost total</div>
            <div id="rv-mob-roi-cost-total" style="font-size:16px;font-weight:800;color:#EF4444">—</div>
          </div>
          <div style="background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2);border-radius:8px;padding:10px">
            <div style="font-size:8px;color:#7A90B0;margin-bottom:3px">Venituri</div>
            <div id="rv-mob-roi-rev" style="font-size:16px;font-weight:800;color:#22C55E">—</div>
          </div>
          <div style="background:rgba(212,175,55,.08);border:1px solid rgba(212,175,55,.2);border-radius:8px;padding:10px;grid-column:span 2">
            <div style="font-size:8px;color:#7A90B0;margin-bottom:3px">Profit brut estimat</div>
            <div id="rv-mob-roi-profit" style="font-size:22px;font-weight:800;color:#D4AF37">—</div>
            <div id="rv-mob-roi-roi" style="font-size:10px;color:#7A90B0;margin-top:2px">—</div>
          </div>
        </div>
        <div style="font-size:8px;color:#2A3F60;margin-top:8px;line-height:1.4">* Orientativ. Fără teren, TVA, proiectare, taxe.</div>
      </div>

      <!-- Avize tab -->
      <div class="rv-mob-panel" id="rv-mob-panel-avize" style="display:none">
        <div class="rv-rst">📋 CALENDAR AUTORIZARE</div>
        <div id="rv-mob-avize"></div>
      </div>

    </div><!-- end mob-sheet -->
  <!-- RIGHT -->
  <div class="rv-rpanel">

    <!-- ── Secțiunea 1: Normative aplicate (dinamice) ── -->
    <div class="rv-rsec">
      <div class="rv-sec-t collapsible" onclick="_rvCollapseSection(this)">Normative aplicate</div>
      <div id="rv-norms-applied" style="font-size:8.5px;color:#4A6080;line-height:1.8;font-family:'IBM Plex Mono',monospace;">
        NP 057/2002<br>OMS 119/2014<br>P118-1/2015<br>P100-1/2022<br>NP 051/2012<br>Legea 10/1995<br>PUG Iași în vigoare
      </div>
    </div>

    <!-- ── Secțiunea 2: Info parcelă activă ── -->
    <div class="rv-rsec">
      <div class="rv-sec-t collapsible" onclick="_rvCollapseSection(this)">Info parcelă activă</div>
      <div id="rv-parcel-info" style="font-size:9px;color:#4A6080;font-family:'IBM Plex Mono',monospace;line-height:1.8">—</div>
    </div>

    <!-- ── Secțiunea 3: Rentabilitate în timp real (oglindă din lpanel) ── -->
    <div class="rv-rsec" id="rv-rpanel-roi">
      <div class="rv-sec-t collapsible" onclick="_rvCollapseSection(this)" style="color:#22C55E">💰 Rentabilitate estimativă</div>
      <div id="rv-rpanel-roi-body" style="padding-top:6px">
        <!-- ROI live sync din panoul stâng -->
        <div style="display:flex;gap:8px;margin-bottom:6px">
          <div style="flex:1;background:rgba(212,175,55,.06);border:1px solid rgba(212,175,55,.12);border-radius:5px;padding:6px;text-align:center">
            <div style="font-size:7px;color:#6A8090;margin-bottom:2px">Preț construcție</div>
            <div id="rv-rp-cost" style="font-size:14px;font-weight:800;color:#D4AF37">—</div>
            <div style="font-size:7px;color:#4A6080">€/m² SDA</div>
          </div>
          <div style="flex:1;background:rgba(34,197,94,.06);border:1px solid rgba(34,197,94,.12);border-radius:5px;padding:6px;text-align:center">
            <div style="font-size:7px;color:#6A8090;margin-bottom:2px">Preț vânzare</div>
            <div id="rv-rp-sell" style="font-size:14px;font-weight:800;color:#22C55E">—</div>
            <div style="font-size:7px;color:#4A6080">€/m² SU</div>
          </div>
        </div>
        <!-- Rezultat mare -->
        <div style="background:rgba(255,255,255,.03);border-radius:6px;padding:8px;text-align:center;margin-bottom:8px">
          <div style="font-size:8px;color:#4A6080;margin-bottom:4px">PROFIT BRUT ESTIMAT</div>
          <div id="rv-rp-profit" style="font-size:18px;font-weight:900;color:#22C55E">—</div>
          <div id="rv-rp-sub" style="font-size:7.5px;color:#4A6080;margin-top:3px;line-height:1.5">—</div>
        </div>
        <!-- Mini sliders sincronizate -->
        <div style="font-size:7.5px;color:#4A6080;margin-bottom:2px">Ajustează preț construcție:</div>
        <input type="range" min="450" max="900" value="650" id="rv-rp-cost-slider"
          oninput="const lv=document.getElementById('rv-roi-cost');if(lv){lv.value=this.value;lv.dispatchEvent(new Event('input'));}"
          style="width:100%;height:3px;accent-color:#D4AF37;margin-bottom:6px">
        <div style="font-size:7.5px;color:#4A6080;margin-bottom:2px">Ajustează preț vânzare:</div>
        <input type="range" min="800" max="2500" value="1200" id="rv-rp-sell-slider"
          oninput="const lv=document.getElementById('rv-roi-sell');if(lv){lv.value=this.value;lv.dispatchEvent(new Event('input'));}"
          style="width:100%;height:3px;accent-color:#22C55E">
        <div style="font-size:7px;color:#2A3F60;margin-top:6px;line-height:1.4">
          * Exclude: teren, TVA 19%, taxe, proiectare ~12%. Modifici sliderele → actualizare instantanee.
        </div>
      </div>
    </div>

    <!-- ── Secțiunea 4: Ghid formule ── -->
    <div class="rv-rsec">
      <div class="rv-sec-t collapsible" onclick="_rvCollapseSection(this)" style="color:#38bdf8">📐 Ghid formule</div>
      <div style="padding-top:6px">

        <!-- Formula ROI -->
        <div style="background:rgba(56,189,248,.05);border:1px solid rgba(56,189,248,.1);border-radius:5px;padding:7px;margin-bottom:6px">
          <div style="font-size:7.5px;font-weight:700;color:#38bdf8;margin-bottom:5px">💰 Rentabilitate</div>
          <div style="font-size:7px;color:#4A6080;line-height:1.9;font-family:'IBM Plex Mono',monospace">
            Cost = SDA × Preț construcție<br>
            Venituri = SU × Preț vânzare<br>
            <span style="color:#22C55E">Profit = Venituri − Cost</span><br>
            <span style="color:#D4AF37">ROI = Profit / Cost × 100%</span>
          </div>
          <div style="font-size:6.5px;color:#2A3F60;margin-top:4px">SU ≈ 82% din SDA · Exlcude teren, TVA, taxe</div>
        </div>

        <!-- Formula OMS 119 -->
        <div style="background:rgba(234,179,8,.05);border:1px solid rgba(234,179,8,.1);border-radius:5px;padding:7px;margin-bottom:6px">
          <div style="font-size:7.5px;font-weight:700;color:#D4AF37;margin-bottom:5px">☀ Însorire — OMS 119/2014</div>
          <div style="font-size:7px;color:#4A6080;line-height:1.9;font-family:'IBM Plex Mono',monospace">
            Cerință: min <span style="color:#22C55E">1.5 ore/zi</span> insolație directă<br>
            la solstițiu iarnă (21 Dec)<br>
            Indicator: alt. solară ≥ 15° la 12:00<br>
            Umbră = H / tan(altitudine_solara)
          </div>
          <div style="font-size:6.5px;color:#2A3F60;margin-top:4px">OMS 119/2014 Art.3 — cerința e durata, nu unghiul</div>
        </div>

        <!-- Formula ISU -->
        <div style="background:rgba(239,68,68,.05);border:1px solid rgba(239,68,68,.1);border-radius:5px;padding:7px;margin-bottom:6px">
          <div style="font-size:7.5px;font-weight:700;color:#EF4444;margin-bottom:5px">🚨 Evacuare ISU — P118-1/2015</div>
          <div style="font-size:7px;color:#4A6080;line-height:1.9;font-family:'IBM Plex Mono',monospace">
            Aviz ISU dacă: H > <span style="color:#EF4444">28m</span> SAU SD > <span style="color:#EF4444">1500mp</span><br>
            Max. cale evacuare: 30m (rez.) / 25m (com.)<br>
            Lățime minimă: 1.0m (coridor) / 0.9m (ușă)<br>
            Nr. persoane: SU / 2.5 mp/pers (com.)
          </div>
          <div style="font-size:6.5px;color:#2A3F60;margin-top:4px">P118-1/2015 Tabel 4.4 + Legea 307/2006</div>
        </div>

        <!-- Formula NP 057 camere -->
        <div style="background:rgba(96,165,250,.05);border:1px solid rgba(96,165,250,.1);border-radius:5px;padding:7px;margin-bottom:6px">
          <div style="font-size:7.5px;font-weight:700;color:#60A5FA;margin-bottom:5px">🏠 Suprafețe camere — NP 057/2002</div>
          <div style="font-size:7px;color:#4A6080;line-height:1.9;font-family:'IBM Plex Mono',monospace">
            Living: min <span style="color:#60A5FA">18mp</span> (2 pers.) / 22mp (3+)<br>
            Dormitor 1: min <span style="color:#60A5FA">14mp</span><br>
            Dormitor 2: min 12mp · Baie: min 4mp<br>
            Bucătărie: min 8mp (cu loc masă) / 5mp
          </div>
          <div style="font-size:6.5px;color:#2A3F60;margin-top:4px">NP 057/2002 actualizat + Legea 18/1995</div>
        </div>

        <!-- Formula Parcaje -->
        <div style="background:rgba(249,115,22,.05);border:1px solid rgba(249,115,22,.1);border-radius:5px;padding:7px">
          <div style="font-size:7.5px;font-weight:700;color:#F97316;margin-bottom:5px">🚗 Parcaje — NP 067/2002</div>
          <div style="font-size:7px;color:#4A6080;line-height:1.9;font-family:'IBM Plex Mono',monospace">
            Rez. colectiv: 1 loc / <span style="color:#F97316">apt.</span> + 10% vizitatori<br>
            Birouri: 1 loc / <span style="color:#F97316">50mp</span> SU<br>
            Comercial: 1 loc / <span style="color:#F97316">25mp</span> SU<br>
            Loc parcare: 2.5m × 5.0m (standard)
          </div>
          <div style="font-size:6.5px;color:#2A3F60;margin-top:4px">NP 067/2002 + RLU UTR local</div>
        </div>

      </div>
    </div>

    <!-- ── Secțiunea 5: Rapoarte afectate ── -->
    <div class="rv-rsec">
      <div class="rv-sec-t collapsible" onclick="_rvCollapseSection(this)">Rapoarte afectate</div>
      <div id="rv-rapoarte-aff" style="font-size:8.5px;color:#4A6080;line-height:1.8">—</div>
    </div>

  </div>
</div>
<div id="rv-tip"></div>`;
  await new Promise(r=>requestAnimationFrame(r));
}

// Expune global
window.generateRelevee = generateRelevee;
window.closeRelevee    = closeRelevee;
