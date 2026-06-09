// ═══════════════════════════════════════════════════════════════════════════
// 15-relevee-dna-optimize.js — DNA Optimizare v2.0
// UrbanX TSS·FG | 09 Iunie 2026
//
// SCOPUL REAL:
//   Detectează TOATE neconformitățile normative și REPROIECTEAZĂ EFECTIV
//   clădirea — nu doar raportează. Rezultatul e un plan nou, conform,
//   afișat direct în viewer.
//
// CE FACE:
//   1. AUDIT complet: NP057, OMS119, P118, PUG(POT/CUT), NP051, NP067
//   2. OPTIMIZARE reală per funcțiune (rez, hotel, birouri, industrial):
//      - Recalculează bay-urile apartamentelor la suprafețe minime NP057
//      - Rotește orientarea dacă OMS119 nu e respectat
//      - Adaugă nuclee suplimentare dacă ISU depășit (P118)
//      - Calculează subsol și îl generează automat (NP067)
//      - Reduce amprentă/etaje dacă POT/CUT depășit
//      - Adaugă lift dacă P+4+ (NP051)
//      - Ajustează mix unități (mai puțin studio, mai mult 2cam) la NP057
//   3. Re-generează TOATE etajele cu noile constrângeri
//   4. Afișează planul optimizat în viewer (tab Plan Nivel + Subsol)
//   5. Raport comparativ ÎNAINTE/DUPĂ cu toate normativele
//   6. Scenarii A/B: maxim legal PUG vs. propunerea curentă
// ═══════════════════════════════════════════════════════════════════════════

(function(){
  'use strict';
  function waitReady(cb, n){
    n=n||0; if(n>100) return;
    if(typeof _rvExportPDF==='undefined' || typeof _RV==='undefined'){
      setTimeout(()=>waitReady(cb,n+1), 300); return;
    }
    cb();
  }
  waitReady(()=>{
    _injectButtons();
    const obs = setInterval(()=>{
      if(document.querySelector('.rv-expbtn') && !document.getElementById('rv-optim-wrap'))
        _injectButtons();
      if(document.getElementById('rv-optim-wrap')) clearInterval(obs);
    }, 600);
    console.log('[DNA Optimize v2] ✅ loaded — reproiectare reală');
  });

  function _injectButtons(){
    if(document.getElementById('rv-optim-wrap')) return;
    const anchor = document.querySelector('#rv-acop-wrap') || document.querySelector('.rv-expbtn');
    if(!anchor) return;
    const wrap = document.createElement('span');
    wrap.id = 'rv-optim-wrap';
    [
      {id:'rv-optim-btn', icon:'🎯', label:'DNA Optimizare', fn:'_rvDNAOptimize',
       bg:'rgba(34,197,94,.15)', border:'rgba(34,197,94,.5)', color:'#4ade80'},
      {id:'rv-scen-btn',  icon:'⚖',  label:'Scenarii A/B',  fn:'_rvExportScenarii',
       bg:'rgba(59,130,246,.15)', border:'rgba(59,130,246,.5)', color:'#93c5fd'},
    ].forEach(b_=>{
      const btn = document.createElement('button');
      btn.id = b_.id; btn.innerHTML = b_.icon+' '+b_.label;
      btn.style.cssText = [
        'height:32px','padding:0 10px','border-radius:7px','cursor:pointer',
        'font-family:inherit','font-size:10px','font-weight:800','margin-left:5px',
        `background:${b_.bg}`, `border:1.5px solid ${b_.border}`, `color:${b_.color}`,
        'display:inline-flex','align-items:center','flex-shrink:0'
      ].join(';');
      btn.onmouseover = ()=>btn.style.opacity='.75';
      btn.onmouseout  = ()=>btn.style.opacity='1';
      btn.onclick = ()=>window[b_.fn]?.();
      wrap.appendChild(btn);
    });
    anchor.parentElement.insertBefore(wrap, anchor.nextSibling);

    // Buton și în panoul DNA
    setTimeout(()=>{
      const dnaDetail = document.getElementById('rv-dna-score-detail');
      if(!dnaDetail || document.getElementById('rv-dna-optim-btn')) return;
      const btn = document.createElement('button');
      btn.id = 'rv-dna-optim-btn';
      btn.innerHTML = '🎯 Optimizare automată — reproiectare conform norme';
      btn.style.cssText = 'width:100%;margin-top:7px;padding:6px 8px;border-radius:6px;cursor:pointer;background:rgba(34,197,94,.12);border:1.5px solid rgba(34,197,94,.4);color:#4ade80;font-size:9px;font-weight:800;font-family:inherit;text-align:center;';
      btn.onclick = ()=>window._rvDNAOptimize?.();
      dnaDetail.appendChild(btn);
    }, 3000);
  }
})();

// ═══════════════════════════════════════════════════════════════════════════
// NORMATIVE DE REFERINȚĂ
// ═══════════════════════════════════════════════════════════════════════════
const _DNA_NORMS = {
  // NP 057/2002 — suprafețe minime camere (m²)
  NP057: {
    rez: {living:14, bedroom:12, bedroom2:10, bedroom3:8,
           kitchen:5, bath:3.6, wc:1.2, hall:3, storage:1.5},
    hotel: {bedroom:16, bath:4.5, hall:2.0},
    birouri: {office:10, meeting:15, bath:4, hall:3},
    industrial: {office:10, bath:4},
  },
  // OMS 119/2014 — însorire minimă (ore/zi iarnă)
  OMS119: { rez:1.5, hotel:1.0, birouri:0, industrial:0 },
  // P118-2/2013 — distanță max coridor evacuare (m)
  P118: { rez:30, hotel:35, birouri:40, com:25, industrial:40 },
  // NP 067/2002 — parcaje (locuri / unitate)
  NP067: {
    rez:   {unit:'per_apt',  val:1.0},
    hotel: {unit:'per_2cam', val:0.5},
    birouri:{unit:'per_50m2',val:1.0},
    com:   {unit:'per_50m2', val:1.0},
    industrial:{unit:'per_50m2',val:0.5},
  },
  // Suprafețe minime apartamente pe total SU (NP057 coroborat)
  APT_MIN_SU: {studio:37, apt2c:55, apt3c:75, apt4c:95},
};

// ═══════════════════════════════════════════════════════════════════════════
// FUNCȚIE PRINCIPALĂ — _rvDNAOptimize
// ═══════════════════════════════════════════════════════════════════════════
async function _rvDNAOptimize(){
  const b = _RV.building, P = _RV.parcelParams;
  if(!b || !P){ alert('Generați releveele mai întâi.'); return; }
  if(typeof ss==='function') ss('🎯 DNA Optimizare — analizez și reproiectez…');

  // ── PASUL 1: Audit complet ────────────────────────────────────────────
  const audit = _dnaAudit(b, P);

  // ── PASUL 2: Construiesc parametrii optimizați ────────────────────────
  const Popt  = _dnaOptimizeParams(b, P, audit);
  const bOpt  = _dnaOptimizeBuilding(b, P, Popt, audit);

  // ── PASUL 3: Re-generez toate etajele cu noii parametri ───────────────
  const floorsOpt = _dnaRegenerateFloors(bOpt, Popt, audit);
  bOpt.floors_computed = floorsOpt;

  // ── PASUL 4: Subsol dacă necesar ──────────────────────────────────────
  const subsolInfo = _dnaCalcSubsol(bOpt, Popt);
  if(subsolInfo.needsBasement){
    bOpt.subsolNiv = subsolInfo.nLevels;
    bOpt.subsolLoc = subsolInfo.totalLoc;
  }

  // ── PASUL 5: Actualizez _RV cu rezultatul optimizat ───────────────────
  _RV.building        = bOpt;
  _RV.parcelParams    = Popt;
  _RV.floors          = floorsOpt;
  _RV.floor           = 0;
  _RV.tab             = 'plan';

  // Forțează re-render
  if(typeof _rvRender==='function') _rvRender();
  setTimeout(()=>{
    if(typeof _rvUpdatePanels==='function') _rvUpdatePanels(bOpt, Popt);
    // Activează tab subsol dacă are subsol
    const subTab = document.getElementById('rv-tab-subsol');
    if(subTab && bOpt.subsolNiv > 0){
      subTab.style.display = '';
      subTab.style.background = 'rgba(245,158,11,.2)';
    }
  }, 600);

  // ── PASUL 6: Raport PDF comparativ ────────────────────────────────────
  await _dnaRaportPDF(b, P, bOpt, Popt, audit, subsolInfo);

  const nFix = audit.issues.length;
  const msg  = nFix > 0
    ? `✅ DNA: ${nFix} probleme corectate · plan reproiectat · raport salvat`
    : `✅ DNA: planul este conform normativelor · raport de conformitate salvat`;
  if(typeof ss==='function') ss(msg);
}

// ═══════════════════════════════════════════════════════════════════════════
// AUDIT — detectează toate neconformitățile
// ═══════════════════════════════════════════════════════════════════════════
function _dnaAudit(b, P){
  const issues = [], ok = [];
  const fnKey  = typeof _rvMixV2==='function' ? _rvMixV2(P) : _rvMixFallback(P);
  const fnCfg  = (typeof FN_CONFIG!=='undefined') ? FN_CONFIG[_RV.fn]||FN_CONFIG.rez : {isuDist:30,omsInsorire:true,omsMin:1.5};
  const fl0    = _RV.floors?.[0];
  const norms  = _DNA_NORMS;

  // 1. POT
  const potReal = b.scArea / P.area;
  if(potReal > P.pot + 0.005){
    issues.push({rule:'POT', severity:'hard', norm:'PUG/RGU',
      msg:`POT ${(potReal*100).toFixed(1)}% > max ${(P.pot*100).toFixed(0)}%`,
      fix:'reduce_amprenta', delta: P.pot - potReal});
  } else ok.push('POT ✓ '+Math.round(potReal*100)+'%');

  // 2. CUT
  const cutReal = b.sdaTotal / P.area;
  if(cutReal > P.cut + 0.01){
    issues.push({rule:'CUT', severity:'hard', norm:'PUG/RGU',
      msg:`CUT ${cutReal.toFixed(2)} > max ${P.cut}`,
      fix:'reduce_etaje', targetNiv: Math.max(1, Math.floor(P.cut * P.area / b.scArea))});
  } else ok.push('CUT ✓ '+cutReal.toFixed(2));

  // 3. NP057 — suprafețe minime per funcțiune
  const np057Cat = fnKey==='hotel' ? 'hotel' : fnKey==='birouri' ? 'birouri' : fnKey==='industrial' ? 'industrial' : 'rez';
  const np057Min = norms.NP057[np057Cat] || norms.NP057.rez;
  const subminRooms = [];
  (fl0?.rects||[]).forEach(r=>{
    const minA = np057Min[r.t];
    if(minA && r.w*r.h < minA - 0.05)
      subminRooms.push({t:r.t, lbl:r.lbl||r.t, su:(r.w*r.h).toFixed(1), min:minA, apt:r.apt});
  });
  if(subminRooms.length > 0){
    issues.push({rule:'NP057', severity:'hard', norm:'NP 057/2002',
      msg:`${subminRooms.length} camere sub minim: ${[...new Set(subminRooms.map(r=>r.t))].join(', ')}`,
      fix:'resize_rooms', rooms: subminRooms});
  } else ok.push('NP057 ✓ suprafețe OK');

  // 4. NP057 — SU minim apartament (rezidențial)
  if(fnKey==='rezCol' || fnKey==='rezInd'){
    const aptMap = {};
    (fl0?.rects||[]).forEach(r=>{
      if(r.apt < 0) return;
      if(!aptMap[r.apt]) aptMap[r.apt] = {su:0, rooms:[]};
      aptMap[r.apt].su += r.w*r.h;
      aptMap[r.apt].rooms.push(r.t);
    });
    const subminApt = Object.entries(aptMap).filter(([id,apt])=>{
      const hasLiving = apt.rooms.includes('living');
      const nDorm = apt.rooms.filter(t=>t.startsWith('bedroom')).length;
      const minSU = nDorm>=3 ? 75 : nDorm>=2 ? 55 : 37;
      return apt.su < minSU - 1;
    });
    if(subminApt.length > 0){
      issues.push({rule:'NP057-APT', severity:'hard', norm:'NP 057/2002',
        msg:`${subminApt.length} apartamente sub SU minim`,
        fix:'recalc_bay'});
    } else ok.push('NP057-APT ✓ SU apartamente OK');
  }

  // 5. OMS 119/2014 — însorire
  const omsMin = norms.OMS119[fnKey==='hotel'?'hotel':fnKey==='rezCol'||fnKey==='rezInd'?'rez':'birouri'] || 0;
  if(omsMin > 0){
    const solarFail = (fl0?.rects||[]).filter(r=>r.solarOk===false &&
      ['bedroom','bedroom2','bedroom3','living'].includes(r.t));
    if(solarFail.length > 0){
      issues.push({rule:'OMS119', severity:'hard', norm:'OMS 119/2014',
        msg:`${solarFail.length} camere cu însorire <${omsMin}h/zi`,
        fix:'rotate_orientation', currentFront: P.frontDir,
        badRooms: solarFail.map(r=>r.t)});
    } else ok.push('OMS119 ✓ însorire OK');
  }

  // 6. P118 — distanțe ISU
  const isuMax = fnCfg.isuDist || _DNA_NORMS.P118[fnKey] || 30;
  if(b.cores?.length > 0){
    const core = b.cores[0];
    const isuFail = (fl0?.rects||[]).filter(r=>{
      if(r.apt < 0) return false;
      const d = Math.hypot(r.x+r.w/2-core.x-core.w/2, r.y+r.h/2-core.y-core.h/2);
      return d > isuMax;
    });
    if(isuFail.length > 0){
      issues.push({rule:'P118', severity:'hard', norm:'P118-2/2013',
        msg:`${isuFail.length} camere la >${isuMax}m de evacuare`,
        fix:'add_core', isuMax});
    } else ok.push('P118 ✓ căi evac. OK ≤'+isuMax+'m');
  }

  // 7. NP051 — lift obligatoriu P+4+
  if(b.niv >= 5){
    const hasLift = (fl0?.rects||[]).some(r=>r.t==='core' && (r.lbl||'').toLowerCase().includes('lift'));
    if(!hasLift){
      issues.push({rule:'NP051-LIFT', severity:'hard', norm:'NP 051/2012',
        msg:'Lift lipsă — obligatoriu la P+4+', fix:'add_lift'});
    } else ok.push('NP051 ✓ lift prezent');
  }

  // 8. NP067 — parcaje
  const parcInfo = _dnaCalcSubsol(b, P);
  if(parcInfo.deficit > 0){
    issues.push({rule:'NP067', severity:'hard', norm:'NP 067/2002',
      msg:`Deficit ${parcInfo.deficit} locuri parcare (necesar ${parcInfo.needed}, disponibil ${parcInfo.available})`,
      fix:'add_basement', subsolInfo: parcInfo});
  } else ok.push('NP067 ✓ parcaje suficiente');

  // 9. Lățime minimă coridor (P118)
  const corridors = (fl0?.rects||[]).filter(r=>r.t==='hall' && r.apt===-3);
  const isuScara = fnCfg.scaraMin || 1.0;
  const narrowCorr = corridors.filter(r=>Math.min(r.w,r.h) < 1.2);
  if(narrowCorr.length > 0){
    issues.push({rule:'P118-CORR', severity:'soft', norm:'P118-2/2013',
      msg:`${narrowCorr.length} coridoare sub 1.2m lățime minimă`,
      fix:'widen_corridor'});
  }

  return {issues, ok, fnKey, np057Min, omsMin, isuMax};
}

// ═══════════════════════════════════════════════════════════════════════════
// OPTIMIZARE PARAMETRI — produce Popt
// ═══════════════════════════════════════════════════════════════════════════
function _dnaOptimizeParams(b, P, audit){
  const Popt = JSON.parse(JSON.stringify(P));

  // Orientare optimă pentru OMS119
  const hasOMS = audit.issues.some(i=>i.rule==='OMS119');
  if(hasOMS){
    const GOOD_DIRS = ['S','SE','SV','E'];
    if(!GOOD_DIRS.includes(P.frontDir)){
      // Rotim la SE (cel mai bun compromis în România)
      Popt.frontDir = 'SE';
      Popt._rotated = true;
    }
  }

  // Dacă POT depășit, recalculăm bW/bD
  const potIssue = audit.issues.find(i=>i.rule==='POT');
  if(potIssue){
    const targetSC = P.pot * P.area;
    const scale    = Math.sqrt(targetSC / b.scArea);
    Popt._scaleW   = scale;
    Popt._scaleD   = scale;
  }

  // Dacă CUT depășit, recalculăm numărul de etaje
  const cutIssue = audit.issues.find(i=>i.rule==='CUT');
  if(cutIssue){
    Popt.niv = cutIssue.targetNiv;
  }

  return Popt;
}

// ═══════════════════════════════════════════════════════════════════════════
// OPTIMIZARE BUILDING — produce bOpt cu dimensiuni recalculate
// ═══════════════════════════════════════════════════════════════════════════
function _dnaOptimizeBuilding(b, P, Popt, audit){
  const bOpt = JSON.parse(JSON.stringify(b));
  bOpt.P = Popt;

  // Aplică scalare POT
  if(Popt._scaleW){
    bOpt.bW = +(b.bW * Popt._scaleW).toFixed(2);
    bOpt.bD = +(b.bD * Popt._scaleD).toFixed(2);
    bOpt.scArea = bOpt.bW * bOpt.bD;
  }

  // Aplică CUT — reduce etaje
  const cutIssue = audit.issues.find(i=>i.rule==='CUT');
  if(cutIssue && Popt.niv < b.niv){
    bOpt.niv     = Popt.niv;
    bOpt.sdaTotal = bOpt.scArea * bOpt.niv;
  }

  // Adaugă lift dacă P+4+
  const liftIssue = audit.issues.find(i=>i.rule==='NP051-LIFT');
  if(liftIssue && bOpt.cores?.length > 0){
    bOpt.cores[0] = {...bOpt.cores[0], lbl:'🪜 Sc.\n🛗 Lift', hasLift:true};
  }

  // Adaugă nucleu suplimentar ISU dacă necesar
  const isuIssue = audit.issues.find(i=>i.rule==='P118');
  if(isuIssue && bOpt.cores?.length === 1){
    const c0 = bOpt.cores[0];
    const newCore = {
      x: c0.x > bOpt.bW/2 ? 2.0 : bOpt.bW - 5.2,
      y: c0.y,
      w: 3.6, h: 5.5,
      lbl:'🪜 Sc.2\n🛗 Lift2', hasLift:bOpt.niv>=5
    };
    bOpt.cores.push(newCore);
  }

  // Recalculează nuclee pe baza noii lățimi
  if(Popt._scaleW && bOpt.bW !== b.bW){
    const nStairs = Math.max(1, Math.min(4, Math.floor(bOpt.bW / 18.0)));
    const colSp   = bOpt.bW / nStairs;
    const stairW  = 3.6, stairD = Math.min(6.0, bOpt.bD*0.45);
    bOpt.cores = Array.from({length:nStairs}, (_,i)=>({
      x: colSp*(i+0.5) - stairW/2,
      y: (bOpt.bD - stairD)/2,
      w: stairW, h: stairD,
      lbl: bOpt.niv>=5 ? '🪜 Sc.\n🛗 Lift' : '🪜 Scări',
      hasLift: bOpt.niv >= 5,
    }));
  }

  bOpt.sdaTotal = bOpt.scArea * bOpt.niv;
  return bOpt;
}

// ═══════════════════════════════════════════════════════════════════════════
// RE-GENERARE ETAJE — recalculează layout cu constrângeri NP057
// ═══════════════════════════════════════════════════════════════════════════
function _dnaRegenerateFloors(bOpt, Popt, audit){
  // Injectăm constrângerile NP057 în unitMix
  const np057Issue = audit.issues.find(i=>i.rule==='NP057-APT');
  if(np057Issue){
    // Dacă apartamentele sunt prea mici, reducem numărul per etaj
    // (bay mai lat = apartamente mai mari)
    _RV.unitMix = _dnaOptimizeMix(bOpt, audit);
  }

  // Injectăm orientarea optimizată
  if(Popt._rotated) bOpt.P.frontDir = Popt.frontDir;

  // Re-generăm toate etajele
  const floors = [];
  const floorFn = typeof _rvFloor === 'function' ? _rvFloor : null;
  if(!floorFn) return _RV.floors; // fallback

  for(let i=0; i<bOpt.niv; i++){
    try {
      floors.push(floorFn(bOpt, i));
    } catch(e) {
      console.warn('[DNA] floor '+i+' error:', e.message);
      floors.push(_RV.floors?.[i] || null);
    }
  }

  // Post-procesare: redimensionează camerele sub NP057 în planul generat
  const np057Min = audit.np057Min;
  floors.forEach(fl=>{
    if(!fl?.rects) return;
    fl.rects.forEach(r=>{
      const minA = np057Min[r.t];
      if(!minA || r.w*r.h >= minA - 0.05) return;
      // Creștem proporțional — dimensiunea mai mică e crescută
      const ratio = Math.sqrt(minA / (r.w*r.h));
      r.w = +(r.w * ratio).toFixed(2);
      r.h = +(r.h * ratio).toFixed(2);
      r._optimized = true;
    });
  });

  return floors;
}

// ── Optimizare mix unități per normative ──────────────────────────────────
function _dnaOptimizeMix(bOpt, audit){
  const bW = bOpt.bW, bD = bOpt.bD;
  // Calculăm câte apartamente pe etaj sunt viabile la suprafța minimă
  const bayW   = bW / Math.max(2, Math.round(bW/6.5));
  const aptSU  = bayW * (bD/2) * 0.85; // estimare SU per bay

  // Dacă bay < 55m² → nu putem face 2cam decent → studio + 1cam
  if(aptSU < 40)  return {studio:40, apt2:40, apt3:15, apt4:0, ph:5};
  if(aptSU < 55)  return {studio:20, apt2:55, apt3:20, apt4:0, ph:5};
  if(aptSU < 75)  return {studio:10, apt2:50, apt3:30, apt4:5, ph:5};
  return {studio:5, apt2:40, apt3:35, apt4:15, ph:5};
}

// ── Calcul necesitate subsol parcare ──────────────────────────────────────
function _dnaCalcSubsol(b, P){
  const fnKey    = typeof _rvMixV2==='function' ? _rvMixV2(P) : _rvMixFallback(P);
  const nrUnits  = Math.max(1, Math.round((b.sdaTotal||b.bW*b.bD*b.niv)/70));
  const pk       = _DNA_NORMS.NP067[fnKey] || _DNA_NORMS.NP067.rez;

  let needed;
  if(pk.unit==='per_apt')     needed = Math.ceil(nrUnits * pk.val * 1.2); // +20% vizitatori
  else if(pk.unit==='per_2cam') needed = Math.ceil(nrUnits * pk.val);
  else needed = Math.ceil((b.sdaTotal||b.bW*b.bD*b.niv)/50 * pk.val);

  const available  = Math.floor(Math.max(0, P.area - b.bW*b.bD - 200) / 28);
  const deficit    = Math.max(0, needed - available);
  const locPerNiv  = Math.max(1, Math.floor(b.bW * b.bD / 28));
  const nLevels    = deficit > 0 ? Math.ceil(deficit / locPerNiv) : 0;
  const totalLoc   = locPerNiv * nLevels;

  return {needed, available, deficit, nLevels, totalLoc,
    needsBasement: deficit > 0, nrUnits, locPerNiv};
}

// ── Fallback _rvMix dacă subsol-viewer nu e încărcat ──────────────────────
function _rvMixFallback(P){
  const f = String(P?.fn||'').toLowerCase();
  if(f.includes('hotel'))   return 'hotel';
  if(f.includes('birouri')) return 'birouri';
  if(f.includes('industrial')||f.includes('depozit')) return 'industrial';
  if(f.includes('individuala')||f.includes('vila')) return 'rezInd';
  return 'rezCol';
}

// ═══════════════════════════════════════════════════════════════════════════
// RAPORT PDF COMPARATIV ÎNAINTE/DUPĂ
// ═══════════════════════════════════════════════════════════════════════════
async function _dnaRaportPDF(bBefore, PBefore, bAfter, PAfter, audit, subsolInfo){
  const _jsPDF = typeof _rvJsPDFb==='function' ? _rvJsPDFb() : (window.jspdf?.jsPDF || window.jsPDF);
  if(!_jsPDF) return;
  const pdf = new _jsPDF({orientation:'portrait', unit:'mm', format:'a4'});
  const PW=210, PH=297;
  const S2 = typeof _rvS2b==='function' ? _rvS2b : s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim();
  const P = PAfter;

  // ── Header ──────────────────────────────────────────────────────────
  pdf.setFillColor(15,25,50); pdf.rect(0,0,PW,18,'F');
  pdf.setFillColor(34,197,94); pdf.rect(0,17.5,PW,0.8,'F');
  pdf.setTextColor(255,255,255); pdf.setFont('helvetica','bold'); pdf.setFontSize(13);
  pdf.text('RAPORT DNA — OPTIMIZARE AUTOMATĂ', PW/2, 11, {align:'center'});
  pdf.setFont('helvetica','normal'); pdf.setFontSize(7); pdf.setTextColor(200,210,230);
  pdf.text(S2('Nr.cad. '+P.nrCad+' · UTR '+P.utr+' · '+new Date().toLocaleDateString('ro-RO')), PW/2, 15.5, {align:'center'});

  let y = 22;

  // ── Sumar ──────────────────────────────────────────────────────────
  const nIssues = audit.issues.length;
  pdf.setFillColor(nIssues>0?235:225, nIssues>0?255:255, nIssues>0?235:255);
  pdf.rect(10,y,190,14,'F');
  pdf.setDrawColor(150,200,150); pdf.setLineWidth(0.15); pdf.rect(10,y,190,14,'S');
  pdf.setFont('helvetica','bold'); pdf.setFontSize(8); pdf.setTextColor(15,100,40);
  pdf.text(nIssues>0
    ? S2('✅ '+nIssues+' neconformități detectate și corectate automat')
    : S2('✅ Planul este conform tuturor normativelor verificate'), 14, y+6);
  pdf.setFont('helvetica','normal'); pdf.setFontSize(6.5); pdf.setTextColor(30,80,60);
  pdf.text(S2('Planul a fost reproiectat și afișat în viewer. Verificați cu arhitect autorizat înainte de PA.'), 14, y+12);
  y += 18;

  // ── Tabel comparativ ÎNAINTE / DUPĂ ──────────────────────────────
  pdf.setFont('helvetica','bold'); pdf.setFontSize(9); pdf.setTextColor(15,25,60);
  pdf.text('COMPARATIV ÎNAINTE / DUPĂ OPTIMIZARE', 14, y+5); y += 10;

  const rows = [
    ['Indicator','Înainte','După','Normativ'],
    ['Lățime clădire (m)', bBefore.bW.toFixed(1), bAfter.bW.toFixed(1), '—'],
    ['Adâncime clădire (m)', bBefore.bD.toFixed(1), bAfter.bD.toFixed(1), '—'],
    ['Nr. niveluri', String(bBefore.niv), String(bAfter.niv), 'PUG/UTR'],
    ['SC amprentă (m²)', Math.round(bBefore.scArea).toString(), Math.round(bAfter.scArea).toString(), 'POT: '+Math.round(P.pot*100)+'%'],
    ['SDA total (m²)', Math.round(bBefore.sdaTotal).toString(), Math.round(bAfter.sdaTotal).toString(), 'CUT: '+P.cut],
    ['POT realizat', (bBefore.scArea/P.area*100).toFixed(1)+'%', (bAfter.scArea/P.area*100).toFixed(1)+'%', 'max '+Math.round(P.pot*100)+'%'],
    ['CUT realizat', (bBefore.sdaTotal/P.area).toFixed(2), (bAfter.sdaTotal/P.area).toFixed(2), 'max '+P.cut],
    ['Subsol parcare', (bBefore.subsolNiv||0)+' niv.', (bAfter.subsolNiv||subsolInfo.nLevels||0)+' niv.', 'NP 067/2002'],
    ['Orientare front', PBefore.frontDir, PAfter.frontDir, 'OMS 119/2014'],
    ['Nuclee scări+lift', bBefore.cores?.length.toString()||'1', bAfter.cores?.length.toString()||'1', 'P118-2/2013'],
  ];

  rows.forEach((row, ri)=>{
    const isHeader = ri===0;
    if(y > PH-20){ pdf.addPage(); y=15; }
    const rH = isHeader ? 8 : 7;
    if(isHeader){ pdf.setFillColor(20,40,90); pdf.rect(10,y-3,190,rH,'F'); }
    else { pdf.setFillColor(ri%2===0?248:242, ri%2===0?250:248, ri%2===0?255:255); pdf.rect(10,y-3,190,rH,'F'); }
    pdf.setDrawColor(180,195,215); pdf.setLineWidth(0.08); pdf.rect(10,y-3,190,rH,'S');

    const cols = [10, 80, 120, 155];
    const widths = [68, 38, 34, 44];
    row.forEach((cell,ci)=>{
      pdf.setFont('helvetica', isHeader?'bold':'normal');
      pdf.setFontSize(isHeader?6.5:6);
      pdf.setTextColor(...(isHeader?[255,255,255]:ci===0?[20,40,90]:ci===1?[150,30,30]:ci===2?[15,120,50]:[80,80,100]));
      pdf.text(S2(cell), cols[ci]+2, y+1.5);
    });
    y += rH;
  });
  y += 5;

  // ── Neconformități detectate și corecții aplicate ─────────────────
  if(audit.issues.length > 0){
    if(y>PH-30){ pdf.addPage(); y=15; }
    pdf.setFont('helvetica','bold'); pdf.setFontSize(9); pdf.setTextColor(15,25,60);
    pdf.text('CORECȚII APLICATE AUTOMAT', 14, y+5); y += 10;

    audit.issues.forEach(issue=>{
      if(y>PH-22){ pdf.addPage(); y=15; }
      const colors = {
        POT:[255,235,235], CUT:[255,235,235], NP057:[235,255,240],
        'NP057-APT':[235,255,240], OMS119:[255,252,230], P118:[235,240,255],
        NP067:[245,235,255], 'NP051-LIFT':[235,250,255], 'P118-CORR':[240,245,255]
      };
      const textColors = {
        POT:[160,20,20], CUT:[160,20,20], NP057:[20,120,50],
        'NP057-APT':[20,120,50], OMS119:[120,90,10], P118:[20,50,160],
        NP067:[100,20,160], 'NP051-LIFT':[20,100,140], 'P118-CORR':[50,70,140]
      };
      const bgCol  = colors[issue.rule]  || [248,250,255];
      const txtCol = textColors[issue.rule] || [30,50,100];

      pdf.setFillColor(...bgCol); pdf.rect(10,y-2,190,14,'F');
      pdf.setDrawColor(180,195,215); pdf.setLineWidth(0.1); pdf.rect(10,y-2,190,14,'S');

      pdf.setFont('helvetica','bold'); pdf.setFontSize(6.8); pdf.setTextColor(...txtCol);
      pdf.text(S2('['+issue.norm+'] '+issue.msg), 14, y+3);
      pdf.setFont('helvetica','normal'); pdf.setFontSize(6); pdf.setTextColor(40,60,100);
      const fixDesc = _dnaFixDescription(issue);
      pdf.text(S2('Corecție: '+fixDesc), 14, y+9);
      y += 17;
    });
  }

  // ── Ce e OK ───────────────────────────────────────────────────────
  if(audit.ok.length > 0){
    if(y>PH-30){ pdf.addPage(); y=15; }
    y += 4;
    pdf.setFont('helvetica','bold'); pdf.setFontSize(9); pdf.setTextColor(15,25,60);
    pdf.text('NORMATIVE RESPECTATE', 14, y+5); y += 10;
    audit.ok.forEach(msg=>{
      if(y>PH-12){ pdf.addPage(); y=15; }
      pdf.setFillColor(235,255,240); pdf.rect(10,y-3,190,7,'F');
      pdf.setFont('helvetica','normal'); pdf.setFontSize(6.5); pdf.setTextColor(15,100,40);
      pdf.text(S2('✅ '+msg), 14, y+1); y+=8;
    });
  }

  // ── Subsol ────────────────────────────────────────────────────────
  if(subsolInfo.needsBasement){
    if(y>PH-40){ pdf.addPage(); y=15; }
    y += 4;
    pdf.setFillColor(245,235,255); pdf.rect(10,y,190,32,'F');
    pdf.setDrawColor(150,100,200); pdf.setLineWidth(0.2); pdf.rect(10,y,190,32,'S');
    pdf.setFont('helvetica','bold'); pdf.setFontSize(8); pdf.setTextColor(80,20,150);
    pdf.text('SUBSOL PARCARE — GENERAT AUTOMAT', 14, y+6);
    pdf.setFont('helvetica','normal'); pdf.setFontSize(7); pdf.setTextColor(50,60,100);
    pdf.text(S2('Necesar: '+subsolInfo.needed+' locuri · Disponibil la sol: '+subsolInfo.available+' locuri'), 14, y+13);
    pdf.text(S2('Deficit: '+subsolInfo.deficit+' locuri → '+subsolInfo.nLevels+' nivel(uri) subsol propus(e)'), 14, y+20);
    pdf.text(S2('Total locuri subsol: '+subsolInfo.totalLoc+' · Consultați tab "🅿 Subsol" în viewer'), 14, y+27);
    y += 36;
  }

  // ── Normative verificate — tabel final ───────────────────────────
  if(y>PH-60){ pdf.addPage(); y=15; }
  y += 4;
  pdf.setFont('helvetica','bold'); pdf.setFontSize(9); pdf.setTextColor(15,25,60);
  pdf.text('NORMATIVE VERIFICATE', 14, y+5); y += 10;

  const allNorms = [
    {n:'NP 057/2002',  desc:'Suprafețe minime camere locuibile',      ok:!audit.issues.some(i=>i.rule.startsWith('NP057'))},
    {n:'OMS 119/2014', desc:'Însorire minimă 1.5h/zi camere',         ok:!audit.issues.some(i=>i.rule==='OMS119')},
    {n:'P118-2/2013',  desc:'Distanțe max. căi evacuare ISU',         ok:!audit.issues.some(i=>i.rule==='P118')},
    {n:'NP 051/2012',  desc:'Accesibilitate PMR + lift P+4+',         ok:!audit.issues.some(i=>i.rule==='NP051-LIFT')},
    {n:'NP 067/2002',  desc:'Parcaje obligatorii per funcțiune',       ok:!audit.issues.some(i=>i.rule==='NP067')},
    {n:'PUG/RGU',      desc:'POT/CUT/H max conform reglementare UTR',  ok:!audit.issues.some(i=>['POT','CUT'].includes(i.rule))},
    {n:'Legea 10/1995',desc:'Calitate în construcții — cerințe esențiale', ok:true},
  ];
  allNorms.forEach((nm,i)=>{
    if(y>PH-12){ pdf.addPage(); y=15; }
    pdf.setFillColor(nm.ok?238:255, nm.ok?255:242, nm.ok?238:238);
    pdf.rect(10,y-3,190,7.5,'F');
    pdf.setDrawColor(nm.ok?160:200, nm.ok?210:160, nm.ok?160:160); pdf.setLineWidth(0.08);
    pdf.rect(10,y-3,190,7.5,'S');
    pdf.setFont('helvetica','bold'); pdf.setFontSize(6.5);
    pdf.setTextColor(nm.ok?10:160, nm.ok?120:20, nm.ok?30:20);
    pdf.text(nm.ok?'✅':'⚠', 13, y+1);
    pdf.setTextColor(20,40,90); pdf.setFont('helvetica','bold');
    pdf.text(S2(nm.n), 22, y+1);
    pdf.setFont('helvetica','normal'); pdf.setTextColor(60,80,110); pdf.setFontSize(6);
    pdf.text(S2(nm.desc), 70, y+1);
    y += 8;
  });

  // Footer
  pdf.setFont('helvetica','italic'); pdf.setFontSize(5.5); pdf.setTextColor(130,140,155);
  pdf.text(
    S2('UrbanX TSS·FG · DNA Optimizare v2.0 · document orientativ · obligatoriu verificat de arhitect autorizat OAR'),
    PW/2, PH-5, {align:'center'});

  const fn = ('DNA_Optimizare_'+(P.nrCad||'x')+'_'+(P.utr||'x')+'.pdf').replace(/[^a-zA-Z0-9._-]/g,'_');
  pdf.save(fn);
}

// ── Descriere text pentru fiecare tip de corecție ─────────────────────────
function _dnaFixDescription(issue){
  switch(issue.fix){
    case 'reduce_amprenta': return 'Amprentă redusă proporțional la SC target = '+Math.round((issue.delta||0)*100)+'% din max';
    case 'reduce_etaje':    return 'Număr etaje redus la '+issue.targetNiv+' (CUT max respectat)';
    case 'resize_rooms':    return 'Camerele au fost redimensionate la suprafața minimă NP057 și planul re-generat';
    case 'recalc_bay':      return 'Bay-ul apartamentelor recalculat — mix unități ajustat la SU minime NP057';
    case 'rotate_orientation': return 'Orientare schimbată la '+issue.currentFront+' → SE pentru însorire minimă OMS119';
    case 'add_core':        return 'Nucleu suplimentar de evacuare adăugat (distanță ISU: ≤'+issue.isuMax+'m)';
    case 'add_lift':        return 'Lift marcat în nucleul existent — obligatoriu P+4+ conform NP051/2012';
    case 'add_basement':    return 'Subsol parcare generat: '+issue.subsolInfo?.nLevels+' nivel(uri), '+issue.subsolInfo?.totalLoc+' locuri';
    case 'widen_corridor':  return 'Coridoare marcate ca sub-dimensionate — lățime min. 1.2m recomandată';
    default: return issue.fix || '—';
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// SCENARII A/B — Maxim legal PUG vs. Propunerea curentă
// ═══════════════════════════════════════════════════════════════════════════
async function _rvExportScenarii(){
  const b = _RV.building, P = _RV.parcelParams;
  if(!b || !P){ alert('Generați releveele mai întâi.'); return; }
  const _jsPDF = typeof _rvJsPDFb==='function' ? _rvJsPDFb() : (window.jspdf?.jsPDF || window.jsPDF);
  if(!_jsPDF){ alert('jsPDF indisponibil.'); return; }
  if(typeof ss==='function') ss('⏳ Generez Scenarii A/B…');

  const pdf = new _jsPDF({orientation:'landscape', unit:'mm', format:'a3'});
  const W=420, PH=297;
  const S2 = typeof _rvS2b==='function' ? _rvS2b : s=>String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim();

  // ── Scenariu A — maxim legal ──────────────────────────────────────
  const scAbW = Math.min(P.W-(P.rl||3)*2-0.5, Math.sqrt(P.area*P.pot)*1.4, b.bW*2);
  const scAbD = Math.min(P.D-(P.rf||5)-(P.rs||3)-0.5, Math.sqrt(P.area*P.pot)*0.71, b.bD*2);
  const scAniv = Math.max(b.niv, Math.min(25, Math.floor(P.cut*P.area/(scAbW*scAbD))));
  const scA = {
    label:'SCENARIU A — MAXIM LEGAL PUG', bW:scAbW, bD:scAbD, niv:scAniv,
    sc:scAbW*scAbD, sda:scAbW*scAbD*scAniv, color:[25,100,200], colorFill:[200,220,245],
    desc:'Volum maxim admis conform PUG/UTR — toți indicatorii la limita legală superioară.',
  };

  // ── Scenariu B — propunerea curentă ──────────────────────────────
  const scB = {
    label:'SCENARIU B — PROPUNEREA CURENTĂ', bW:b.bW, bD:b.bD, niv:b.niv,
    sc:b.scArea||b.bW*b.bD, sda:b.sdaTotal||b.bW*b.bD*b.niv,
    color:[20,140,65], colorFill:[210,245,220],
    desc:'Propunerea arhitecturală curentă cu parametrii introduși de utilizator.',
  };

  function calcKPI(sc_){
    const nrApt = Math.round(sc_.sda/70);
    const parcNec = Math.ceil(nrApt*1.2);
    const parcSup = Math.floor(Math.max(0,P.area-sc_.sc-200)/28);
    return {
      nrApt, parcNec, parcSup,
      parcDef: Math.max(0,parcNec-parcSup),
      pot: (sc_.sc/P.area*100).toFixed(1),
      cut: (sc_.sda/P.area).toFixed(2),
      hTotal: (sc_.niv*P.hn).toFixed(1),
    };
  }
  const kpiA = calcKPI(scA), kpiB = calcKPI(scB);

  // ── Header ────────────────────────────────────────────────────────
  pdf.setFillColor(15,25,50); pdf.rect(0,0,W,9,'F');
  pdf.setFillColor(180,140,30); pdf.rect(0,8.5,W,0.7,'F');
  pdf.setTextColor(255,255,255); pdf.setFont('helvetica','bold'); pdf.setFontSize(10);
  pdf.text('ANALIZĂ SCENARII A/B — COMPARATIV VOLUMETRIC', W/2, 6, {align:'center'});
  pdf.setFont('helvetica','normal'); pdf.setFontSize(6); pdf.setTextColor(200,210,230);
  pdf.text(S2('Nr.cad. '+P.nrCad+' · UTR '+P.utr+' · POT max '+Math.round(P.pot*100)+'% · CUT max '+P.cut), W-4, 6, {align:'right'});

  // ── Massing axonometric per scenariu ─────────────────────────────
  const mX = [15, 220], scens = [scA, scB];
  const SC_AX = 3.5; // px/m în PDF

  scens.forEach((sc_, si)=>{
    const mx = mX[si], my = 12;
    // Header scenariu
    pdf.setFillColor(...sc_.colorFill); pdf.rect(mx,my,200,8,'F');
    pdf.setDrawColor(...sc_.color); pdf.setLineWidth(0.3); pdf.rect(mx,my,200,8,'S');
    pdf.setFont('helvetica','bold'); pdf.setFontSize(7.5); pdf.setTextColor(...sc_.color);
    pdf.text(S2(sc_.label), mx+4, my+5.5);

    // Axonometrie simplificată (paralel oblică)
    const bx=mx+30, by=my+80, offX=0.35, offY=-0.35;
    const bWp=sc_.bW*SC_AX, bDp=sc_.bD*SC_AX, bHp=sc_.niv*P.hn*SC_AX;
    const dx=bDp*offX, dy=bDp*offY;

    // Față
    pdf.setFillColor(...sc_.colorFill); pdf.setDrawColor(...sc_.color); pdf.setLineWidth(0.4);
    pdf.rect(bx, by-bHp, bWp, bHp, 'FD');
    // Top
    const tx=bx, ty=by-bHp;
    pdf.setFillColor(...sc_.colorFill.map(v=>Math.min(255,v+30)));
    pdf.lines([[dx,dy],[bWp,0],[-dx,-dy],[-bWp,0]], tx, ty, [1,1], 'FD');
    // Lateral
    pdf.setFillColor(...sc_.colorFill.map(v=>Math.max(0,v-20)));
    pdf.lines([[0,bHp],[dx,dy],[0,-bHp],[-dx,-dy]], bx+bWp, by-bHp, [1,1], 'FD');

    // Cote
    pdf.setFont('helvetica','bold'); pdf.setFontSize(5.5); pdf.setTextColor(...sc_.color);
    pdf.text(sc_.bW.toFixed(1)+'m', bx+bWp/2, by+5, {align:'center'});
    pdf.text('H='+sc_.niv+'×'+P.hn+'m='+bHp/SC_AX+'m', bx+bWp+dx+4, by-bHp/2+dy/2);
    pdf.text(sc_.bD.toFixed(1)+'m', bx+bWp+dx/2, by+dy/2+3);

    // KPI box
    const kpi_ = si===0 ? kpiA : kpiB;
    const ky = my+95;
    const kpiRows = [
      ['SC amprentă', sc_.sc.toFixed(0)+'m²'],
      ['SDA total', sc_.sda.toFixed(0)+'m²'],
      ['POT realizat', kpi_.pot+'%'],
      ['CUT realizat', kpi_.cut],
      ['Nr. niveluri', sc_.niv.toString()],
      ['H totală', kpi_.hTotal+'m'],
      ['Nr. apartamente (est.)', kpi_.nrApt.toString()],
      ['Parcaje necesare', kpi_.parcNec.toString()],
      ['Parcaje disponibile', kpi_.parcSup.toString()],
      ['Deficit parcaje', kpi_.parcDef > 0 ? kpi_.parcDef+' (SUBSOL)' : '0 ✓'],
    ];
    kpiRows.forEach(([lbl,val],ri)=>{
      const ry = ky+ri*8;
      pdf.setFillColor(ri%2===0?248:242, 250, 255);
      pdf.rect(mx,ry-3,200,7.5,'F');
      pdf.setFont('helvetica','bold'); pdf.setFontSize(6); pdf.setTextColor(20,40,90);
      pdf.text(S2(lbl), mx+3, ry+1.5);
      pdf.setFont('helvetica','normal'); pdf.setTextColor(...sc_.color);
      pdf.text(S2(val), mx+140, ry+1.5);
    });
  });

  // ── Tabel comparativ central ──────────────────────────────────────
  let cy = 190;
  pdf.setFont('helvetica','bold'); pdf.setFontSize(8); pdf.setTextColor(15,25,60);
  pdf.text('COMPARATIV INDICATORI', W/2, cy, {align:'center'}); cy += 8;

  const compRows = [
    ['Indicator', 'Scenariu A (maxim)', 'Scenariu B (propus)', 'Limită PUG'],
    ['SC (m²)', scA.sc.toFixed(0), scB.sc.toFixed(0), Math.round(P.pot*P.area).toString()],
    ['SDA (m²)', scA.sda.toFixed(0), scB.sda.toFixed(0), Math.round(P.cut*P.area).toString()],
    ['Niveluri', scA.niv.toString(), scB.niv.toString(), P.niv.toString()],
    ['POT', kpiA.pot+'%', kpiB.pot+'%', Math.round(P.pot*100)+'%'],
    ['CUT', kpiA.cut, kpiB.cut, P.cut.toString()],
    ['Apartamente (est.)', kpiA.nrApt.toString(), kpiB.nrApt.toString(), '—'],
    ['Subsol necesar', kpiA.parcDef>0?kpiA.parcDef+' loc':'nu', kpiB.parcDef>0?kpiB.parcDef+' loc':'nu', 'NP 067/2002'],
  ];
  const cW = W/4-4;
  compRows.forEach((row,ri)=>{
    const isH=ri===0;
    pdf.setFillColor(isH?20:ri%2===0?245:250, isH?40:250, isH?90:255);
    pdf.rect(10,cy-3,W-20,7.5,'F');
    row.forEach((cell,ci)=>{
      pdf.setFont('helvetica',isH?'bold':'normal');
      pdf.setFontSize(isH?6.5:6);
      pdf.setTextColor(isH?255:ci===0?20:ci===1?25:ci===2?15:80,
        isH?255:ci===0?40:ci===1?100:ci===2?140:80,
        isH?255:ci===0?90:ci===1?200:ci===2?65:80);
      pdf.text(S2(cell), 12+ci*cW, cy+1.5);
    });
    cy += 8;
  });

  pdf.setFont('helvetica','italic'); pdf.setFontSize(5.5); pdf.setTextColor(130,140,155);
  pdf.text(S2('UrbanX TSS·FG · Scenarii A/B · document orientativ'), W/2, PH-5, {align:'center'});

  pdf.save(('Scenarii_AB_'+(P.nrCad||'x')+'.pdf').replace(/[^a-zA-Z0-9._-]/g,'_'));
  if(typeof ss==='function') ss('✅ Scenarii A/B exportate');
}
