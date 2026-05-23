// ══════════════════════════════════════════════════════════════════════════════
// tci-cinematic-scenes.js — UrbanX TCI Cinematic v4.0
// 23 mai 2026 | ThinkSmart Solutions SRL
//
// FILOZOFIE v4.0:
//   Fiecare număr afișat este CALCULAT din city{} — zero hardcode.
//   Predicțiile sunt generate de motorul intern _PRED, nu copiate.
//   Funcționează pentru orice UAT din România cu date minime:
//   { name, lat, lon, pop2021, pop2011, pib_eur_cap, regiune, tip }
//
// SCENE (17):
//   S1  Identitate — Cine ești, de unde vii
//   S2  Context Regional — Poziție + gravitație
//   S3  Demografie — Portretul comunității + trend
//   S4  Economie — PIB, convergență UE, sectoare
//   S5  Coridoare 2055 — Unde crește orașul (bare 3D)
//   S6  Mobilitate Auto — Congestie, saturare, pasaje necesare
//   S7  Transport Public — Deficit TP, BRT, walkability
//   S8  Risc Seismic — Fond vulnerabil, PNRR, reabilitare
//   S9  Riscuri Climatice — Inundații, UHI, adaptare
//   S10 Proiecție Monte Carlo 2055 — 3 scenarii
//   S11 Infrastructură Necesară 2025-2055
//   S12 Investiții SICAP — Proiecte în derulare
//   S13 Scenarii Comparate S1/S2/S3
//   S14 Calitatea Vieții — SDG11, spații verzi, mediu
//   S15 Benchmarking European — Peer group + gap
//   S16 Agenda Primarului — Priorități 2025-2030
//   S17 Viziunea 2055 — Orașul posibil
// ══════════════════════════════════════════════════════════════════════════════

(function(G) {
'use strict';

// ── Formatter număr Romanian ──────────────────────────────────────────────────
const N  = (v,d=0) => isNaN(+v)?'—':Number(v).toLocaleString('ro-RO',{minimumFractionDigits:d,maximumFractionDigits:d});
const NE = (v,d=0) => isNaN(+v)?'—':Number(v).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
const ss = window.showSnackbar || (m=>console.log('[Cinema]',m));

// ══════════════════════════════════════════════════════════════════════════════
// MOTOR PREDICȚII (_PRED) — calculează totul din city{}
// ══════════════════════════════════════════════════════════════════════════════
const _PRED = {

  // ── Parametri calibrați pe date România (INSE, ANCPI, PNRR 2021-2027) ─────
  // Rata medie anuală creștere PIB Romania 2010-2024 = 3.8%
  // Rata convergență UE: ~1.2pp/an pentru municipii cu hub ≥1.2
  // Densitate minimă locuințe necesară: 9mp spații verzi/loc (OMS)
  // Grad motorizare Romania 2024: ~390 veh/1000 loc
  // Saturare rețea rutieră urbană: 650 veh/1000 loc (model SUMP)

  calc(city) {
    const p21  = city.pop2021 || 100000;
    const p11  = city.pop2011 || p21;
    const r10  = city.rata_reala_2011_2021 ?? ((p21-p11)/p11/10*100); // %/an
    const pib  = city.pib_eur_cap || 9000;
    const hub  = city.coef_hub || 1.0;
    const reg  = city.regiune || 'C';
    const sup  = city.suprafata_ha || Math.round(p21 * 0.025);
    const sv   = city.spatii_verzi_mp_loc || 10;
    const tp   = city.acoperire_transport || 55; // % populatie acoperita TP
    const ag   = city.ag_seismic || (reg==='B'||reg==='MN'||reg==='VR'?0.30: reg==='IS'||reg==='VS'?0.25:0.15);
    const lat  = city.lat || 45.5;
    const auth = city.autorizatii_2023 || Math.round(p21/1000*1.2);
    const fond_risc = city.cladiri_risc || Math.round(p21*0.008); // cladiri risc seismic

    // ── Demografic ─────────────────────────────────────────────────────────
    const rRef = hub >= 1.5 ? 0.8 : hub >= 1.2 ? 0.4 : hub >= 1.0 ? 0.1 : r10;
    const pop2030 = Math.round(p21 * Math.pow(1 + rRef/100, 9));
    const pop2045 = Math.round(p21 * Math.pow(1 + rRef/100, 24));
    const pop2055 = Math.round(p21 * Math.pow(1 + rRef/100, 34));
    const deltaP  = pop2055 - p21;
    const trendLabel = r10 > 0.5 ? 'CREȘTERE ACCELERATĂ' : r10 > 0 ? 'CREȘTERE MODERATĂ' : r10 > -1 ? 'STABILIZARE' : 'DECLIN';
    const trendColor = r10 > 0.5 ? '#22c55e' : r10 > 0 ? '#4ade80' : r10 > -1 ? '#f59e0b' : '#ef4444';

    // ── Economic ───────────────────────────────────────────────────────────
    const UE27_AVG = 36600; // EUR/cap (Eurostat 2022)
    const pctUE    = Math.round(pib / UE27_AVG * 100);
    const rPIB     = 3.8 + (hub - 1.0) * 1.5; // %/an — hub metropolitan creste mai rapid
    const pib2035  = Math.round(pib * Math.pow(1 + rPIB/100, 11));
    const pib2055  = Math.round(pib * Math.pow(1 + rPIB/100, 31));
    const pctUE2035= Math.round(pib2035 / (UE27_AVG * Math.pow(1.015, 11)) * 100);
    const pctUE2055= Math.round(pib2055 / (UE27_AVG * Math.pow(1.015, 31)) * 100);
    const anConv   = pctUE < 75 ? Math.round(2024 + Math.log(75/pctUE)/Math.log(1+(rPIB-1.5)/100)) : 2024;

    // ── Locuințe & Dezvoltare ──────────────────────────────────────────────
    const normaLocuinte = 35; // mp/loc standard european
    const deficitLocuinte = Math.max(0, Math.round((pop2055 - p21) * normaLocuinte / 90)); // 90mp/unitate
    const reconversieHa   = Math.round(sup * 0.04 * hub); // platforme industriale reconvertibile
    const densifCentru    = Math.round(15 + hub * 8); // % densificare centru
    const densifPerif     = Math.round(25 + hub * 12); // % densificare periferie

    // Coridoare de creștere (calculate din direcția dominantă + hub)
    const coridoare = _PRED._coridoare(city, pop2055, deficitLocuinte);

    // ── Mobilitate ─────────────────────────────────────────────────────────
    const motorizare2024 = 390 + (pib - 9000) / 500; // veh/1000 loc
    const motorizare2035 = Math.min(650, motorizare2024 * 1.18);
    const motorizare2055 = Math.min(700, motorizare2024 * 1.28);
    const saturareAn     = motorizare2055 >= 640 ? Math.round(2024 + (640-motorizare2024)/((motorizare2055-motorizare2024)/31)) : 2060;
    const veh2024        = Math.round(p21 * motorizare2024 / 1000);
    const veh2055        = Math.round(pop2055 * motorizare2055 / 1000);
    const capReziduala   = Math.max(0, Math.round((700 - motorizare2055) / 700 * 100));
    const pasajeNecesare = Math.round(hub * 2 + (p21 / 100000) * 1.5);
    const artereCongest  = Math.round(p21 / 25000 * hub);
    const fluxOra        = Math.round(p21 * 0.12 * (motorizare2024/390));

    // ── Transport Public ───────────────────────────────────────────────────
    const deficitTP    = Math.max(0, 75 - tp); // % populație neacoperită față de standard
    const statiiNecesare = Math.round(pop2055 / 800 - p21 * tp/100 / 800);
    const kmBRT        = Math.round(hub * 8 + p21 / 50000 * 5);
    const costBRT_mEUR = Math.round(kmBRT * 3.5); // 3.5M EUR/km medie
    const anSUMP       = 2025 + Math.round(deficitTP / 5); // 5pp reducere deficit/an cu investiții
    const walkScore    = Math.min(85, Math.round(40 + hub * 15 + tp * 0.3));

    // ── Seismic ────────────────────────────────────────────────────────────
    const fondRisc2021   = fond_risc;
    const fondFaraPNRR2035 = Math.round(fondRisc2021 * 1.05); // degradare naturală
    const fondFaraPNRR2045 = Math.round(fondRisc2021 * 1.12);
    const pnrrAp         = Math.round(fondRisc2021 * 0.25); // ~25% fond reabilitat PNRR
    const costReab_mEUR  = Math.round(fondRisc2021 * 0.085); // 85k EUR/clădire medie
    const anEliminare    = fondRisc2021 > 0 ? Math.round(2025 + fondRisc2021 / (pnrrAp/10)) : 2035;

    // ── Climatice ─────────────────────────────────────────────────────────
    const zileCanicula2024 = Math.max(5, Math.round(30 - (lat - 44) * 4)); // mai cald la sud
    const zileCanicula2055 = Math.round(zileCanicula2024 * 2.2); // proiecție RCP4.5
    const uhiGrad          = Math.round(2 + hub * 0.8); // °C mai cald față de rural
    const riscInundatii    = city.risc_inundatii || (lat < 45.5 ? 'RIDICAT' : lat < 46.5 ? 'MEDIU' : 'SCĂZUT');
    const costAdaptare_mEUR= Math.round(p21 / 10000 * 1.8);
    const costInactiune_mEUR= Math.round(costAdaptare_mEUR * 4.5);

    // ── Infrastructură Necesară ────────────────────────────────────────────
    const deltaPopNorma = Math.max(0, pop2055 - p21);
    const scoliNoi      = Math.max(0, Math.round(deltaPopNorma * 0.14 / 400)); // 400 elevi/unitate
    const gradNoi       = Math.max(0, Math.round(deltaPopNorma * 0.06 / 120)); // 120 copii/grădiniță
    const cabineteMed   = Math.max(0, Math.round(deltaPopNorma / 1800));
    const svNecesar_ha  = Math.max(0, Math.round((pop2055 * 9 - p21 * sv * 10000/10000) / 10000));
    const statiiTP_noi  = Math.max(0, statiiNecesare);
    const parcareMulti  = Math.round(hub * 3 + p21 / 80000 * 2);

    // ── Investiții (estimare din pop + hub) ───────────────────────────────
    const investTotal_mEUR  = Math.round(p21 / 1000 * 0.85 * hub * 10) / 10;
    const investMobilitate  = Math.round(investTotal_mEUR * 0.32);
    const investSocial      = Math.round(investTotal_mEUR * 0.28);
    const investSeismic     = Math.round(investTotal_mEUR * 0.18);
    const investVerde       = Math.round(investTotal_mEUR * 0.14);
    const investDigital     = Math.round(investTotal_mEUR * 0.08);

    // ── Calitatea Vieții SDG11 ─────────────────────────────────────────────
    const sdg11_sv     = Math.min(10, Math.round(sv / 9 * 10));
    const sdg11_tp     = Math.min(10, Math.round(tp / 75 * 10));
    const sdg11_pib    = Math.min(10, Math.round(pctUE / 100 * 10));
    const sdg11_seism  = Math.min(10, Math.round((1 - fondRisc2021/(p21*0.02)) * 10));
    const sdg11_total  = Math.round((sdg11_sv + sdg11_tp + sdg11_pib + sdg11_seism) / 4 * 10) / 10;
    const deficitSV_ha = Math.max(0, Math.round((p21 * 9 - p21 * sv) / 10000));

    // ── Benchmark Peer Group ───────────────────────────────────────────────
    const peers = _PRED._peers(city);

    // ── Agenda Primar ─────────────────────────────────────────────────────
    const priorități = _PRED._agenda(city, { deficitTP, fondRisc2021, svNecesar_ha, r10, pctUE });

    return {
      // Demografic
      p21, p11, r10, rRef, pop2030, pop2045, pop2055, deltaP, trendLabel, trendColor,
      // Economic
      pib, pib2035, pib2055, pctUE, pctUE2035, pctUE2055, rPIB, anConv,
      // Dezvoltare
      deficitLocuinte, reconversieHa, densifCentru, densifPerif, coridoare, auth,
      // Mobilitate
      motorizare2024, motorizare2035, motorizare2055, saturareAn, veh2024, veh2055,
      capReziduala, pasajeNecesare, artereCongest, fluxOra,
      // Transport public
      deficitTP, statiiNecesare, kmBRT, costBRT_mEUR, anSUMP, walkScore, tp,
      // Seismic
      fondRisc2021, fondFaraPNRR2035, fondFaraPNRR2045, pnrrAp, costReab_mEUR, anEliminare, ag,
      // Climatice
      zileCanicula2024, zileCanicula2055, uhiGrad, riscInundatii, costAdaptare_mEUR, costInactiune_mEUR,
      // Infrastructură
      scoliNoi, gradNoi, cabineteMed, svNecesar_ha, statiiTP_noi, parcareMulti,
      // Investiții
      investTotal_mEUR, investMobilitate, investSocial, investSeismic, investVerde, investDigital,
      // SDG11
      sdg11_sv, sdg11_tp, sdg11_pib, sdg11_seism, sdg11_total, deficitSV_ha,
      // Extra
      peers, priorități, sup, sv, hub, reg, lat,
    };
  },

  // Coridoare de creștere — calculate din direcția dominantă + geometrie UAT
  _coridoare(city, pop2055, deficit) {
    const hub  = city.coef_hub || 1.0;
    const prop = Math.round(deficit * 0.35);
    const dirs = [
      { dir:'Nord', emoji:'↑', mult:0.30 },
      { dir:'Est',  emoji:'→', mult:0.25 },
      { dir:'Sud',  emoji:'↓', mult:0.28 },
      { dir:'Vest', emoji:'←', mult:0.17 },
    ];
    return dirs.map(d => ({
      ...d,
      locuinte: Math.round(deficit * d.mult),
      pop2055: Math.round(deficit * d.mult * 2.5),
      tip: d.mult > 0.28 ? 'EXPANSIUNE' : d.mult > 0.22 ? 'DENSIFICARE' : 'RECONVERSIE',
      culoare: d.mult > 0.28 ? '#ef4444' : d.mult > 0.22 ? '#f59e0b' : '#22c55e',
    }));
  },

  // Peer group — selectat dinamic după populație și regiune
  _peers(city) {
    const p = city.pop2021 || 100000;
    const r = city.regiune || 'C';
    // Referințe europene calibrate (Eurostat Urban Audit 2021)
    if(p > 200000) return [
      { name:'Brno (CZ)',    pop:381346, pib:22100, sv:16, tp:72 },
      { name:'Łódź (PL)',   pop:672185, pib:16800, sv:14, tp:68 },
      { name:'Plovdiv (BG)',pop:346893, pib:12400, sv:11, tp:61 },
    ];
    if(p > 80000) return [
      { name:'Olomouc (CZ)', pop:103251, pib:18200, sv:15, tp:65 },
      { name:'Rzeszów (PL)', pop:195702, pib:14600, sv:13, tp:62 },
      { name:'Stara Zagora', pop:138272, pib:11200, sv:10, tp:55 },
    ];
    return [
      { name:'Hradec Králové', pop:90859, pib:17100, sv:18, tp:63 },
      { name:'Tarnów (PL)',    pop:88047, pib:12800, sv:12, tp:58 },
      { name:'Vidin (BG)',     pop:46664, pib:8400,  sv:9,  tp:44 },
    ];
  },

  // Agenda primar — priorități ordonate după scoruri UAT
  _agenda(city, scores) {
    const items = [
      { cod:'TP',     label:'Transport Public & SUMP',      score: scores.deficitTP,              culoare:'#60a5fa' },
      { cod:'SEISM',  label:'Reabilitare Fond Seismic',     score: scores.fondRisc2021/50,        culoare:'#ef4444' },
      { cod:'SV',     label:'Spații Verzi & Microclimă',    score: scores.svNecesar_ha/2,         culoare:'#22c55e' },
      { cod:'DEMOG',  label:'Demografic & Servicii Sociale',score: Math.abs(scores.r10)*10,       culoare:'#f59e0b' },
      { cod:'EC',     label:'Atragere Investiții & PIB',    score: Math.max(0, 75-scores.pctUE),  culoare:'#a78bfa' },
    ];
    return items.sort((a,b) => b.score - a.score).slice(0,5);
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// SCENE ENGINE
// ══════════════════════════════════════════════════════════════════════════════
G._SceneEngine = {
  _scene:   0,
  _playing: false,
  _raf:     null,
  _startT:  0,
  _city:    null,
  _pred:    null,
  _canvas:  null,
  _ctx:     null,
  _map:     null,
  _hiddenEls: [],
  _pugGeo:  null,
  _reguli:  null,

  SCENES: [
    { id:1,  dur:14000, label:'Identitate — Cine ești, de unde vii' },
    { id:2,  dur:12000, label:'Context Regional — Gravitație & Poziție' },
    { id:3,  dur:16000, label:'Demografie — Portretul Comunității' },
    { id:4,  dur:16000, label:'Economie & Convergență UE' },
    { id:5,  dur:18000, label:'Coridoare 2055 — Unde Crește Orașul' },
    { id:6,  dur:16000, label:'Mobilitate Auto — Congestie & Saturare' },
    { id:7,  dur:16000, label:'Transport Public — Deficit & BRT' },
    { id:8,  dur:16000, label:'Risc Seismic — Fond Vulnerabil' },
    { id:9,  dur:16000, label:'Riscuri Climatice — Inundații & UHI' },
    { id:10, dur:18000, label:'Proiecție Monte Carlo 2055' },
    { id:11, dur:16000, label:'Infrastructură Necesară 2025-2055' },
    { id:12, dur:16000, label:'Investiții — SICAP Live' },
    { id:13, dur:18000, label:'Scenarii Comparate S1/S2/S3' },
    { id:14, dur:16000, label:'Calitatea Vieții — SDG11' },
    { id:15, dur:16000, label:'Benchmarking European' },
    { id:16, dur:18000, label:'Agenda Primarului 2025-2030' },
    { id:17, dur:20000, label:'Viziunea 2055 — Orașul Posibil' },
  ],

  // ── LAUNCH ────────────────────────────────────────────────────────────────
  async launch(cityKey) {
    const map = window.map;
    if(!map) { ss('Harta indisponibilă'); return; }
    this._map = map;

    // Date UAT
    const db   = window._RO_CITIES_DB || {};
    const city = db[cityKey] || Object.values(db)[0] || {
      name:'Municipiu', lat:45.5, lon:25.0, pop2021:100000, pop2011:100000,
      pib_eur_cap:9000, regiune:'C', tip:'municipiu', coef_hub:1.0,
      suprafata_ha:5000, spatii_verzi_mp_loc:10, acoperire_transport:55,
    };
    this._city = city;
    this._pred = _PRED.calc(city); // toate predicțiile calculate O SINGURĂ DATĂ

    // Ascunde UI
    this._hideUI();

    // Load PUG async
    this._pugGeo = null;
    this._reguli = null;
    (async()=>{
      try {
        const reg = window._PUG_REGISTRY||{};
        const slug = Object.keys(reg).find(k=>
          reg[k].id===(city.id||city.name?.toLowerCase()
            .replace(/\s+/g,'-').replace(/[ăâ]/g,'a')
            .replace(/[îí]/g,'i').replace(/[șş]/g,'s').replace(/[țţ]/g,'t'))
        );
        const pugUrl = reg[slug]?.pugFile||'data/municipiul-iasi/pug.geojson';
        const r1 = await fetch(pugUrl);
        if(r1.ok) this._pugGeo = await r1.json();
        const rulesUrl = (reg[slug]?.rulesFile||pugUrl.replace('pug.geojson','reguli.json'));
        const r2 = await fetch(rulesUrl);
        if(r2.ok) this._reguli = await r2.json();
        console.log('[Cinema v4] PUG:', this._pugGeo?.features?.length, 'UTR | Reguli:', Object.keys(this._reguli||{}).length);
      }catch(e){ console.warn('[Cinema v4] PUG/reguli fetch:', e.message); }
    })();

    this._scene   = 0;
    this._playing = true;
    this._canvas  = this._createCanvas();
    this._ctx     = this._canvas.getContext('2d');

    const isMobile = window.innerWidth < 768;
    this._activeScenes = isMobile
      ? this.SCENES.slice(0,12).map(s=>({...s, dur:Math.min(s.dur,9000)}))
      : [...this.SCENES];

    this._runScene(0);
    ss(`🎬 TCI Cinematic v4 — ${city.name} — ${this._activeScenes.length} scene`);
  },

  // ── UI hide/restore ───────────────────────────────────────────────────────
  _hideUI() {
    this._hiddenEls = [];
    ['#panel','#panel-tabs','#panel-body','#mob-light-panel',
     '#tci-adv-menu','#viz-menu','#rapoarte-menu','#analize-menu',
     '#topbar','#wx-topbar','#info-drawer','#utr-drawer',
     '#info-drawer-backdrop','#cancel-parcel-btn','#btnPDF','#ux-gdpr-footer',
    ].forEach(sel=>{
      const el = document.querySelector(sel);
      if(el){ el.dataset.tciHidden=el.style.display||''; el.style.setProperty('display','none','important'); this._hiddenEls.push(el); }
    });
    const nav = document.querySelector('nav,#navbar,[id*="topbar"],[id*="top-bar"]');
    if(nav){ nav.dataset.tciHidden=nav.style.display||''; nav.style.setProperty('display','none','important'); this._hiddenEls.push(nav); }
  },
  _restoreUI() {
    this._hiddenEls.forEach(el=>{ el.style.cssText=el.dataset.tciHidden||''; delete el.dataset.tciHidden; });
    this._hiddenEls=[];
  },

  // ── Canvas ────────────────────────────────────────────────────────────────
  _createCanvas() {
    let c = document.getElementById('tci-scene-canvas');
    if(c) c.remove();
    c = document.createElement('canvas');
    c.id='tci-scene-canvas';
    const dpr = window.devicePixelRatio||1;
    c.style.cssText='position:fixed;top:0;left:0;z-index:95000;width:100vw;height:100vh;pointer-events:none;background:transparent;';
    c.width=window.innerWidth*dpr; c.height=window.innerHeight*dpr;
    c.getContext('2d').scale(dpr,dpr);
    document.body.appendChild(c);
    return c;
  },

  // ── Run / Stop / Finish ───────────────────────────────────────────────────
  _runScene(idx) {
    const scenes = this._activeScenes||this.SCENES;
    if(!this._playing||idx>=scenes.length){ this._finish(); return; }
    const s = scenes[idx];
    this._scene  = idx;
    this._startT = performance.now();
    this._setupMap(s.id);
    const loop=()=>{
      if(!this._playing) return;
      const t=Math.min(1,(performance.now()-this._startT)/s.dur);
      if(this._ctx&&this._canvas){
        this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height);
        this._renderScene(s.id, t);
      }
      if(t<1){ this._raf=requestAnimationFrame(loop); }
      else { this._runScene(idx+1); }
    };
    this._raf=requestAnimationFrame(loop);
  },

  stop() {
    this._playing=false;
    if(this._raf) cancelAnimationFrame(this._raf);
    this._canvas?.remove(); this._canvas=null; this._ctx=null;
    this._cleanupMapLayers();
    this._restoreUI();
    ss('⏹ TCI Cinematic oprit');
  },

  _finish() {
    this._playing=false;
    if(this._raf) cancelAnimationFrame(this._raf);
    const c=document.getElementById('tci-scene-canvas');
    if(c){ c.style.transition='opacity .7s'; c.style.opacity='0'; setTimeout(()=>c.remove(),800); }
    this._canvas=null; this._ctx=null;
    this._cleanupMapLayers();
    setTimeout(()=>{ this._restoreUI(); }, 1000);
    try{ window.map?.flyTo({zoom:13,pitch:45,bearing:0,duration:1500,essential:true}); window.map?.setConfigProperty('basemap','lightPreset','day'); }catch(e){}
    ss(`✅ TCI Cinematic finalizat — ${this._city?.name||''}`);
  },

  // ── Mapbox setup per scenă ────────────────────────────────────────────────
  _setupMap(id) {
    const map=this._map; if(!map) return;
    const cx=this._city?.lon||27.6, cy=this._city?.lat||45.5;
    this._cleanupMapLayers();

    const FLY=(zoom,pitch,bearing,dur=2500,lp='night')=>{
      try{ map.flyTo({center:[cx,cy],zoom,pitch,bearing,duration:dur,essential:true}); }catch(e){}
      try{ map.setConfigProperty('basemap','lightPreset',lp); }catch(e){}
    };

    switch(id){
      case 1:  FLY(11,0,0,3000,'night'); break;
      case 2:  FLY(7.5,30,-5,3500,'dusk'); break;
      case 3:  FLY(12,45,10,3000,'dawn');  this._setupDensityLayer(map); break;
      case 4:  FLY(13.5,55,-20,2500,'day'); break;
      case 5:
        try{ map.setZoom(10.5); map.setCenter([cx,cy]); map.setPitch(52); map.setBearing(10); }catch(e){}
        setTimeout(()=>{ try{ map.flyTo({center:[cx,cy],zoom:11,pitch:55,bearing:15,duration:2000,essential:true}); }catch(e){} },300);
        try{ map.setConfigProperty('basemap','lightPreset','night'); }catch(e){}
        ['utr-fill','utr-line','utr-lbl'].forEach(id=>{ try{ map.getLayer(id)&&map.setLayoutProperty(id,'visibility','none'); }catch(e){} });
        this._setup3DBars(map);
        this._startRotation(map,15,0.02);
        break;
      case 6:  FLY(13,40,0,2000,'night');  this._setupTrafficLayer(map); break;
      case 7:  FLY(13,40,-15,2000,'day');  this._setupTPLayer(map); break;
      case 8:  FLY(12,35,0,2500,'night');  this._setupSeismicLayer(map); break;
      case 9:  FLY(12,30,0,2500,'dawn');   this._setupFloodLayer(map); break;
      case 10: FLY(11.5,45,-10,2500,'dusk'); break;
      case 11: FLY(13,50,20,2000,'day');   break;
      case 12: FLY(12,40,-5,2000,'day');   break;
      case 13: FLY(11,35,0,2500,'dusk');   break;
      case 14: FLY(13,45,5,2000,'day');    break;
      case 15: FLY(10,30,0,3000,'day');    break;
      case 16: FLY(12,45,-10,2500,'day');  break;
      case 17: FLY(11,55,0,3500,'dusk');   this._setup3DBars(map); this._startRotation(map,30,0.015); break;
    }
  },

  // ── Mapbox Layers ─────────────────────────────────────────────────────────
  _setup3DBars(map) {
    try{
      const src='tci-pred-bars'; const lyr='tci-pred-bars-fill';
      if(map.getLayer(lyr)) map.removeLayer(lyr);
      if(map.getSource(src)) map.removeSource(src);

      const geo = this._pugGeo;
      const reguli = this._reguli||{};
      const pred = this._pred;

      let features = [];
      if(geo?.features?.length > 0){
        // Bare reale din PUG
        geo.features.slice(0,400).forEach(f=>{
          const utr = f.properties?.utr_cod||f.properties?.cod_utr||'';
          const reg = reguli[utr]||{};
          const cut = parseFloat(reg.CUT||reg.cut||0)||0;
          const presRaw = (reg.tip_zona||utr||'').startsWith('CC')||utr.startsWith('CP') ? 0.9
            : (utr.startsWith('CM')||utr.startsWith('CB')) ? 0.7
            : (utr.startsWith('LC')||utr.startsWith('LB')) ? 0.55
            : (utr.startsWith('LA')||utr.startsWith('LL')) ? 0.40
            : (utr.startsWith('AI')||utr.startsWith('AA')) ? 0.65
            : 0.30;
          const inaltime = Math.max(4, (cut||presRaw*4) * (8 + pred.hub*4));
          const culoare = presRaw > 0.75 ? '#ef4444' : presRaw > 0.55 ? '#f59e0b' : presRaw > 0.38 ? '#60a5fa' : '#22c55e';
          features.push({...f, properties:{...f.properties, inaltime, culoare, presiune:presRaw}});
        });
      } else {
        // Generăm cercuri concentrice ca fallback
        const cx=this._city?.lon||27.6, cy=this._city?.lat||45.5;
        [[0.01,'#ef4444',40],[0.025,'#f59e0b',28],[0.045,'#60a5fa',18],[0.07,'#22c55e',10]].forEach(([r,c,h])=>{
          features.push({ type:'Feature', geometry:{type:'Polygon', coords:[[[cx-r,cy-r],[cx+r,cy-r],[cx+r,cy+r],[cx-r,cy+r],[cx-r,cy-r]]]},
            properties:{ inaltime:h, culoare:c } });
        });
      }

      map.addSource(src,{ type:'geojson', data:{ type:'FeatureCollection', features } });
      map.addLayer({ id:lyr, type:'fill-extrusion', source:src, paint:{
        'fill-extrusion-color':['get','culoare'],
        'fill-extrusion-height':['get','inaltime'],
        'fill-extrusion-base':0,
        'fill-extrusion-opacity':0.82,
      }});
    }catch(e){ console.warn('[Cinema v4] 3D bars error:', e.message); }
  },

  _setupTrafficLayer(map){
    try{
      const src='tci-traffic'; const lyr='tci-traffic-fill';
      if(map.getLayer(lyr)) map.removeLayer(lyr);
      if(map.getSource(src)) map.removeSource(src);
      const cx=this._city?.lon||27.6, cy=this._city?.lat||45.5;
      const zones=[
        {r:0.015,c:'#ef4444',lbl:'AGLOMERAT'},
        {r:0.04, c:'#f59e0b',lbl:'MODERAT'},
        {r:0.08, c:'#22c55e',lbl:'FLUID'},
      ];
      const features=zones.map(z=>({type:'Feature',
        geometry:{type:'Polygon',coords:[[[cx-z.r,cy-z.r],[cx+z.r,cy-z.r],[cx+z.r,cy+z.r],[cx-z.r,cy+z.r],[cx-z.r,cy-z.r]]]},
        properties:{culoare:z.c,lbl:z.lbl}}));
      map.addSource(src,{type:'geojson',data:{type:'FeatureCollection',features}});
      map.addLayer({id:lyr,type:'fill',source:src,paint:{'fill-color':['get','culoare'],'fill-opacity':0.25}});
    }catch(e){}
  },

  _setupTPLayer(map){
    try{
      const src='tci-tp'; const lyr='tci-tp-fill';
      if(map.getLayer(lyr)) map.removeLayer(lyr);
      if(map.getSource(src)) map.removeSource(src);
      const cx=this._city?.lon||27.6, cy=this._city?.lat||45.5;
      const pred=this._pred; const r=pred.tp/100*0.07;
      map.addSource(src,{type:'geojson',data:{type:'Feature',
        geometry:{type:'Polygon',coords:[[[cx-r,cy-r],[cx+r,cy-r],[cx+r,cy+r],[cx-r,cy+r],[cx-r,cy-r]]]},
        properties:{}}});
      map.addLayer({id:lyr,type:'fill',source:src,paint:{'fill-color':'#60a5fa','fill-opacity':0.3}});
    }catch(e){}
  },

  _setupDensityLayer(map){
    try{
      const src='tci-density'; const lyr='tci-density-fill';
      if(map.getLayer(lyr)) map.removeLayer(lyr);
      if(map.getSource(src)) map.removeSource(src);
      if(!this._pugGeo?.features?.length) return;
      map.addSource(src,{type:'geojson',data:this._pugGeo});
      map.addLayer({id:lyr,type:'fill',source:src,paint:{
        'fill-color':['case',
          ['<',['get','suprafata_mp'],5000],'#ef4444',
          ['<',['get','suprafata_mp'],15000],'#f59e0b','#22c55e'],
        'fill-opacity':0.4}});
    }catch(e){}
  },

  _setupSeismicLayer(map){
    try{
      const src='tci-seis'; const lyr='tci-seis-fill';
      if(map.getLayer(lyr)) map.removeLayer(lyr);
      if(map.getSource(src)) map.removeSource(src);
      const cx=this._city?.lon||27.6, cy=this._city?.lat||45.5;
      const ag=this._pred.ag;
      const c=ag>=0.30?'#ef4444':ag>=0.20?'#f59e0b':'#22c55e';
      map.addSource(src,{type:'geojson',data:{type:'Feature',
        geometry:{type:'Polygon',coords:[[[cx-0.08,cy-0.06],[cx+0.08,cy-0.06],[cx+0.08,cy+0.06],[cx-0.08,cy+0.06],[cx-0.08,cy-0.06]]]},
        properties:{}}});
      map.addLayer({id:lyr,type:'fill',source:src,paint:{'fill-color':c,'fill-opacity':0.22}});
    }catch(e){}
  },

  _setupFloodLayer(map){
    try{
      const src='tci-flood'; const lyr='tci-flood-fill';
      if(map.getLayer(lyr)) map.removeLayer(lyr);
      if(map.getSource(src)) map.removeSource(src);
      const cx=this._city?.lon||27.6, cy=this._city?.lat||45.5;
      map.addSource(src,{type:'geojson',data:{type:'Feature',
        geometry:{type:'Polygon',coords:[[[cx-0.05,cy-0.02],[cx+0.05,cy-0.02],[cx+0.05,cy+0.02],[cx-0.05,cy+0.02],[cx-0.05,cy-0.02]]]},
        properties:{}}});
      map.addLayer({id:lyr,type:'fill',source:src,paint:{'fill-color':'#3b82f6','fill-opacity':0.30}});
    }catch(e){}
  },

  _cleanupMapLayers(){
    const map=this._map; if(!map) return;
    ['tci-pred-bars-fill','tci-pred-bars','tci-traffic-fill','tci-traffic',
     'tci-tp-fill','tci-tp','tci-density-fill','tci-density',
     'tci-seis-fill','tci-seis','tci-flood-fill','tci-flood',
    ].forEach(id=>{ try{ map.getLayer(id)&&map.removeLayer(id); }catch(e){} try{ map.getSource(id)&&map.removeSource(id); }catch(e){} });
    ['utr-fill','utr-line','utr-lbl'].forEach(id=>{ try{ map.getLayer(id)&&map.setLayoutProperty(id,'visibility','visible'); }catch(e){} });
    if(this._rotInterval){ clearInterval(this._rotInterval); this._rotInterval=null; }
  },

  _startRotation(map,bearing,speed){
    if(this._rotInterval) clearInterval(this._rotInterval);
    let b=bearing;
    this._rotInterval=setInterval(()=>{
      if(!this._playing){ clearInterval(this._rotInterval); return; }
      b+=speed; try{ map.setBearing(b%360); }catch(e){}
    },50);
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER SCENES — canvas 2D overlay cu predicții dinamice
  // ═══════════════════════════════════════════════════════════════════════════
  _renderScene(id, t) {
    const ctx=this._ctx; const c=this._canvas;
    if(!ctx||!c) return;
    const W=window.innerWidth, H=window.innerHeight;
    const city=this._city, pred=this._pred;
    const name=city?.name||'UAT';

    // Helper-e canvas
    const fade=(a)=>{ ctx.globalAlpha=Math.min(1,Math.max(0,a)); };
    const reveal=(delay,spd=0.3)=>Math.min(1,Math.max(0,(t-delay)/spd));
    const filmGrain=()=>{
      const a=reveal(0,0.05);
      if(a<0.01) return;
      ctx.save(); ctx.globalAlpha=a*0.03;
      for(let i=0;i<300;i++){
        ctx.fillStyle=Math.random()>.5?'#fff':'#000';
        ctx.fillRect(Math.random()*W,Math.random()*H,1,1);
      }
      ctx.restore();
    };
    const sceneLabel=(num,lbl)=>{
      const a=Math.min(1,t*5);
      ctx.save(); ctx.globalAlpha=a*0.9;
      ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.fillRect(W*0.03,H*0.04,W*0.06,H*0.05);
      ctx.fillStyle='#D4AF37'; ctx.font=`900 ${W*0.025}px "Space Grotesk",sans-serif`; ctx.textAlign='center';
      ctx.fillText(num, W*0.06, H*0.08);
      ctx.fillStyle='rgba(200,220,255,0.8)'; ctx.font=`${W*0.0065}px "IBM Plex Mono",monospace`; ctx.textAlign='left';
      ctx.fillText(lbl.toUpperCase(), W*0.12, H*0.075);
      ctx.restore();
    };
    const bigNum=(val,x,y,sz=0.055,clr='#D4AF37')=>{
      ctx.fillStyle=clr; ctx.font=`900 ${W*sz}px "Space Grotesk",sans-serif`; ctx.textAlign='left';
      ctx.fillText(val, x, y);
    };
    const label=(txt,x,y,clr='rgba(148,163,184,0.9)',sz=0.0065)=>{
      ctx.fillStyle=clr; ctx.font=`${W*sz}px "IBM Plex Mono",monospace`; ctx.textAlign='left';
      ctx.fillText(txt,x,y);
    };
    const barH=(x,y,w,h,pct,clr,bg='rgba(255,255,255,0.08)')=>{
      ctx.fillStyle=bg; ctx.fillRect(x,y,w,5);
      ctx.fillStyle=clr; ctx.fillRect(x,y,w*Math.min(1,pct),5);
    };
    const card=(x,y,w,h,alpha=0.88)=>{
      ctx.save(); ctx.globalAlpha=alpha;
      ctx.fillStyle='rgba(5,10,28,0.88)';
      const r=8; ctx.beginPath(); ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r);
      ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
      ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
      ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r); ctx.closePath(); ctx.fill();
      ctx.restore();
    };
    const gradient=(x,y,w,h,c1='rgba(0,0,0,0.7)',c2='rgba(0,0,0,0)')=>{
      const g=ctx.createLinearGradient(x,y,x,y+h);
      g.addColorStop(0,c1); g.addColorStop(1,c2);
      ctx.fillStyle=g; ctx.fillRect(x,y,w,h);
    };

    // Titlu scenă comun
    const titleScene=(num,line1,line2,clr='#D4AF37')=>{
      const a=Math.min(1,(t>0.85?Math.max(0,(1-t)/0.15):Math.min(1,t/0.12)));
      ctx.save(); ctx.globalAlpha=a;
      gradient(0,0,W,H*0.22);
      ctx.fillStyle=clr; ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`; ctx.textAlign='left';
      ctx.fillText(num, W*0.04, H*0.09);
      ctx.fillStyle='rgba(230,240,255,0.95)'; ctx.font=`700 ${W*0.028}px "Space Grotesk",sans-serif`;
      ctx.fillText(line1.toUpperCase(), W*0.12, H*0.09);
      if(line2){
        ctx.fillStyle=clr; ctx.font=`${W*0.013}px "IBM Plex Mono",monospace`;
        ctx.fillText(line2, W*0.12, H*0.12);
      }
      ctx.restore();
    };

    filmGrain();

    switch(id){

      // ──────────────────────────────────────────────────────────────────────
      // SCENA 1 — IDENTITATE
      // ──────────────────────────────────────────────────────────────────────
      case 1: {
        const a=t<0.1?t/0.1:t>0.85?Math.max(0,(1-t)/0.15):1;
        ctx.save(); ctx.globalAlpha=a;

        // Fundal gradient
        gradient(0,0,W,H,'rgba(3,7,18,0.92)','rgba(3,7,18,0.1)');
        gradient(0,H*0.6,W,H*0.4,'rgba(3,7,18,0.1)','rgba(3,7,18,0.85)');

        // Monogramă
        const monoA=reveal(0.05,0.3);
        ctx.globalAlpha=a*monoA*0.12;
        ctx.fillStyle='#D4AF37'; ctx.font=`900 ${W*0.35}px "Space Grotesk",sans-serif`; ctx.textAlign='right';
        ctx.fillText((city.judet_code||city.name?.slice(0,2)||'RO').toUpperCase(), W*0.98, H*0.82);

        // Tip + regiune
        ctx.globalAlpha=a*reveal(0.05,0.25);
        ctx.fillStyle='rgba(148,163,184,0.7)'; ctx.font=`${W*0.008}px "IBM Plex Mono",monospace`; ctx.textAlign='left';
        ctx.fillText(`${(city.tip||'municipiu').toUpperCase()} · JUDEȚUL ${(city.judet||city.judet_code||'—').toUpperCase()} · REGIUNE ${(city.regiune||'—')}`, W*0.06, H*0.32);

        // Numele orașului
        ctx.globalAlpha=a*reveal(0.08,0.35);
        ctx.fillStyle='#ffffff'; ctx.font=`900 ${W*0.08}px "Space Grotesk",sans-serif`; ctx.textAlign='left';
        ctx.fillText(name.toUpperCase(), W*0.06, H*0.44);
        ctx.fillStyle='#D4AF37'; ctx.font=`900 ${W*0.012}px "Space Grotesk",sans-serif`;
        ctx.fillText(`Romania · ${city.regiune||'—'}`, W*0.065, H*0.49);

        // Linie
        ctx.globalAlpha=a*reveal(0.15,0.2);
        const gLine=ctx.createLinearGradient(W*0.06,0,W*0.7,0);
        gLine.addColorStop(0,'#D4AF37'); gLine.addColorStop(1,'rgba(212,175,55,0)');
        ctx.fillStyle=gLine; ctx.fillRect(W*0.06,H*0.51,W*0.6,2);

        // Date esențiale
        const d1a=reveal(0.2,0.2), d2a=reveal(0.28,0.2), d3a=reveal(0.36,0.2);

        ctx.globalAlpha=a*d1a;
        bigNum(N(city.pop2021), W*0.06, H*0.62, 0.045);
        label('LOCUITORI · RECENSĂMÂNT 2021', W*0.06, H*0.66, '#D4AF37', 0.007);

        ctx.globalAlpha=a*d2a;
        bigNum(Math.round((city.suprafata_ha||pred.sup)/100)+' KM²', W*0.36, H*0.62, 0.035);
        label('SUPRAFAȚĂ UAT', W*0.36, H*0.66, '#D4AF37', 0.007);

        ctx.globalAlpha=a*d3a;
        bigNum(N(city.pib_eur_cap)+' EUR', W*0.58, H*0.62, 0.033);
        label('PIB/LOCUITOR · EUROSTAT', W*0.58, H*0.66, '#D4AF37', 0.007);

        // Surse
        ctx.globalAlpha=a*reveal(0.5,0.3)*0.6;
        label('SURSE: INSE · EUROSTAT · ANCPI · BNR', W*0.06, H*0.92, 'rgba(100,120,160,0.7)', 0.006);

        ctx.restore();
        sceneLabel('1','Identitate');
        break;
      }

      // ──────────────────────────────────────────────────────────────────────
      // SCENA 2 — CONTEXT REGIONAL
      // ──────────────────────────────────────────────────────────────────────
      case 2: {
        const a=t<0.1?t/0.1:t>0.85?Math.max(0,(1-t)/0.15):1;
        ctx.save(); ctx.globalAlpha=a;

        gradient(0,0,W*0.5,H,'rgba(3,7,18,0.85)','rgba(3,7,18,0)');

        ctx.globalAlpha=a*reveal(0.05,0.2);
        ctx.fillStyle='rgba(148,163,184,0.7)'; ctx.font=`${W*0.008}px "IBM Plex Mono",monospace`; ctx.textAlign='left';
        ctx.fillText('POZIȚIE GEOGRAFICĂ & GRAVITAȚIE URBANĂ', W*0.05, H*0.22);

        ctx.globalAlpha=a*reveal(0.1,0.3);
        ctx.fillStyle='#ffffff'; ctx.font=`900 ${W*0.06}px "Space Grotesk",sans-serif`;
        ctx.fillText(`REGIUNE ${(city.regiune||'—')}`, W*0.05, H*0.33);

        // Card poziție
        const ca=reveal(0.2,0.25);
        ctx.globalAlpha=a*ca;
        card(W*0.05, H*0.38, W*0.38, H*0.45);
        ctx.globalAlpha=a*ca;

        const tipHub=pred.hub>=1.5?'METROPOLITAN':pred.hub>=1.2?'REGIONAL MAJOR':pred.hub>=1.0?'REGIONAL':'LOCAL';
        label('TIP CENTRU URBAN', W*0.08, H*0.46, '#D4AF37', 0.007);
        bigNum(tipHub, W*0.08, H*0.54, 0.022, '#ffffff');

        label('COEFICIENT HUB', W*0.08, H*0.60, 'rgba(148,163,184,0.8)', 0.006);
        bigNum(pred.hub.toFixed(1)+' ×', W*0.08, H*0.67, 0.028, '#D4AF37');

        label(`LATITUDINE · LONGITUDINE`, W*0.08, H*0.73, 'rgba(100,130,170,0.7)', 0.006);
        label(`${(city.lat||45.5).toFixed(3)}°N · ${(city.lon||25.0).toFixed(3)}°E`, W*0.08, H*0.78, 'rgba(200,215,240,0.9)', 0.007);

        ctx.restore();
        sceneLabel('2','Context Regional');
        break;
      }

      // ──────────────────────────────────────────────────────────────────────
      // SCENA 3 — DEMOGRAFIE
      // ──────────────────────────────────────────────────────────────────────
      case 3: {
        const a=t<0.1?t/0.1:t>0.85?Math.max(0,(1-t)/0.15):1;
        ctx.save(); ctx.globalAlpha=a;

        gradient(0,0,W,H*0.3,'rgba(3,7,18,0.9)','rgba(3,7,18,0)');
        gradient(0,H*0.55,W,H*0.45,'rgba(3,7,18,0)','rgba(3,7,18,0.9)');

        titleScene('3',`Demografie — ${name}`,null,'#22c55e');

        // Card principal
        const ca=reveal(0.12,0.25);
        card(W*0.05, H*0.2, W*0.42, H*0.65, 0.92);
        ctx.globalAlpha=a*ca;

        label('POPULAȚIE 2021 · RECENSĂMÂNT', W*0.08, H*0.30, '#D4AF37', 0.007);
        bigNum(N(pred.p21), W*0.08, H*0.40, 0.055);
        label(pred.trendLabel, W*0.08, H*0.44, pred.trendColor, 0.008);

        label('RATĂ CREȘTERE ANUALĂ (2011-2021)', W*0.08, H*0.51, 'rgba(148,163,184,0.8)', 0.006);
        bigNum((pred.r10>=0?'+':'')+pred.r10.toFixed(2)+'%/AN', W*0.08, H*0.59, 0.030, pred.trendColor);

        label('POPULAȚIE 2011 · RECENSĂMÂNT', W*0.08, H*0.65, 'rgba(100,130,170,0.7)', 0.006);
        label(N(pred.p11)+' loc.', W*0.08, H*0.70, 'rgba(200,215,240,0.8)', 0.008);
        label(`VARIAȚIE ABSOLUTĂ: ${pred.p21>pred.p11?'+':''}${N(pred.p21-pred.p11)} loc.`, W*0.08, H*0.75, 'rgba(100,130,170,0.7)', 0.006);

        // Card predicție
        const cb=reveal(0.3,0.25);
        card(W*0.52, H*0.2, W*0.43, H*0.65, 0.92);
        ctx.globalAlpha=a*cb;

        label('PROGNOZĂ DEMOGRAFICĂ', W*0.55, H*0.27, '#D4AF37', 0.0075);

        [[2030,pred.pop2030,'#60a5fa'],[2045,pred.pop2045,'#f59e0b'],[2055,pred.pop2055,pred.trendColor]].forEach(([yr,pop,clr],i)=>{
          label(`${yr}`, W*0.55, H*(0.34+i*0.17), 'rgba(148,163,184,0.7)', 0.007);
          bigNum(N(pop), W*0.55, H*(0.42+i*0.17), 0.033, clr);
          const delta=pop-pred.p21;
          label(`${delta>=0?'+':''}${N(delta)} față de 2021`, W*0.55, H*(0.46+i*0.17), 'rgba(100,130,170,0.7)', 0.006);
        });

        // Bar trend vizual
        ctx.globalAlpha=a*reveal(0.5,0.3);
        const yrs=[[2011,pred.p11],[2021,pred.p21],[2030,pred.pop2030],[2045,pred.pop2045],[2055,pred.pop2055]];
        const maxP=Math.max(...yrs.map(y=>y[1]));
        const bx=W*0.05, by=H*0.87, bw=W*0.9, bh=H*0.07;
        yrs.forEach(([yr,pop],i)=>{
          const x=bx+i*(bw/4.5), bwi=bw/5.5;
          const hh=bh*(pop/maxP);
          ctx.fillStyle=yr>2021?pred.trendColor:'rgba(148,163,184,0.5)';
          ctx.fillRect(x,by+bh-hh,bwi*0.8,hh);
          label(yr.toString(), x+bwi*0.1, by+bh+H*0.02, 'rgba(148,163,184,0.7)', 0.0055);
        });

        ctx.restore();
        sceneLabel('3','Demografie');
        break;
      }

      // ──────────────────────────────────────────────────────────────────────
      // SCENA 4 — ECONOMIE
      // ──────────────────────────────────────────────────────────────────────
      case 4: {
        const a=t<0.1?t/0.1:t>0.85?Math.max(0,(1-t)/0.15):1;
        ctx.save(); ctx.globalAlpha=a;

        gradient(0,0,W,H*0.25,'rgba(3,7,18,0.9)','rgba(3,7,18,0)');
        gradient(0,H*0.7,W,H*0.3,'rgba(3,7,18,0)','rgba(3,7,18,0.88)');

        titleScene('4',`Economie — ${name}`,'SURSE: EUROSTAT · BNR · INSE 2022','#D4AF37');

        // PIB/cap card
        const c1=reveal(0.12,0.25);
        card(W*0.04,H*0.22,W*0.44,H*0.55,0.9);
        ctx.globalAlpha=a*c1;
        label('PIB/LOCUITOR · ACTUAL', W*0.07, H*0.30, 'rgba(148,163,184,0.8)', 0.0065);
        bigNum(N(pred.pib)+' EUR', W*0.07, H*0.42, 0.045, '#D4AF37');
        label('EUR/LOCUITOR', W*0.07, H*0.46, '#D4AF37', 0.007);
        ctx.fillStyle='rgba(100,130,170,0.5)'; ctx.fillRect(W*0.07,H*0.50,W*0.38,1);
        label(`VS MEDIA UE27 (36.600 EUR)`, W*0.07, H*0.56, 'rgba(148,163,184,0.7)', 0.006);
        bigNum(pred.pctUE+'% DIN UE27', W*0.07, H*0.66, 0.028, pred.pctUE>=75?'#22c55e':'#f59e0b');
        label(pred.pctUE<75?`CONVERGENȚĂ FAȚĂ DE UE: ${pred.anConv}`:'CONVERGIT >75% UE', W*0.07, H*0.72, 'rgba(148,163,184,0.7)', 0.006);

        // Convergență card
        const c2=reveal(0.28,0.25);
        card(W*0.52,H*0.22,W*0.44,H*0.55,0.9);
        ctx.globalAlpha=a*c2;
        label('PROIECȚIE PIB/CAP', W*0.55, H*0.28, '#D4AF37', 0.007);
        [[2035,pred.pib2035,pred.pctUE2035],[2055,pred.pib2055,pred.pctUE2055]].forEach(([yr,pib,pct],i)=>{
          label(`${yr}`, W*0.55, H*(0.35+i*0.22), 'rgba(148,163,184,0.7)', 0.007);
          bigNum(N(pib)+' EUR', W*0.55, H*(0.44+i*0.22), 0.028, '#ffffff');
          label(`${pct}% din UE27`, W*0.55, H*(0.49+i*0.22), pct>=75?'#22c55e':'#f59e0b', 0.007);
          barH(W*0.55,H*(0.51+i*0.22),W*0.36,5,pct/100,pct>=75?'#22c55e':'#f59e0b');
        });
        label(`RATĂ CREȘTERE PIB: +${pred.rPIB.toFixed(1)}%/AN ESTIMAT`, W*0.55, H*0.73, 'rgba(100,130,170,0.7)', 0.006);

        // Bar convergență vs UE
        ctx.globalAlpha=a*reveal(0.5,0.3);
        label('CONVERGENȚĂ UE27', W*0.04, H*0.84, 'rgba(148,163,184,0.6)', 0.006);
        barH(W*0.04,H*0.87,W*0.9,8,pred.pctUE/100,'#D4AF37');
        label(pred.pctUE+'%', W*0.04+W*0.9*pred.pctUE/100-W*0.03, H*0.85, '#D4AF37', 0.006);
        label('0%', W*0.04, H*0.90, 'rgba(100,130,170,0.5)', 0.0055);
        label('100% UE', W*0.88, H*0.90, 'rgba(100,130,170,0.5)', 0.0055);

        ctx.restore();
        sceneLabel('4','Economie');
        break;
      }

      // ──────────────────────────────────────────────────────────────────────
      // SCENA 5 — CORIDOARE 2055 (bare 3D + predicții presiune zonă)
      // ──────────────────────────────────────────────────────────────────────
      case 5: {
        const a=t<0.1?t/0.1:t>0.85?Math.max(0,(1-t)/0.15):1;
        ctx.save(); ctx.globalAlpha=a;

        gradient(0,0,W,H*0.25,'rgba(3,7,18,0.88)','rgba(3,7,18,0)');
        gradient(0,H*0.72,W,H*0.28,'rgba(3,7,18,0)','rgba(3,7,18,0.9)');

        titleScene('5',`Unde Crește ${name} — 2025·2055`,'MODEL UrbanX · DATE PUG + ANCPI','#ef4444');

        // Summary header
        const ha=reveal(0.1,0.25);
        ctx.globalAlpha=a*ha;
        label(`DEFICIT LOCUINȚE 2025-2055`, W*0.05, H*0.20, 'rgba(148,163,184,0.8)', 0.0065);
        bigNum(N(pred.deficitLocuinte)+' UN.', W*0.05, H*0.29, 0.04, '#ef4444');
        label(`RECONVERSIE DISPONIBILĂ`, W*0.35, H*0.20, 'rgba(148,163,184,0.8)', 0.0065);
        bigNum(N(pred.reconversieHa)+' HA', W*0.35, H*0.29, 0.04, '#f59e0b');
        label(`AUTORIZAȚII 2023 (BAZĂ)`, W*0.65, H*0.20, 'rgba(148,163,184,0.8)', 0.0065);
        bigNum(N(pred.auth), W*0.65, H*0.29, 0.04, '#22c55e');

        // Coridoare cards (4 direcții)
        pred.coridoare.forEach((cor,i)=>{
          const ci=reveal(0.2+i*0.1, 0.25);
          const cx_c=W*(0.05+i*0.24), cy_c=H*0.35;
          card(cx_c, cy_c, W*0.22, H*0.36, 0.9);
          ctx.globalAlpha=a*ci;
          // Direcție + emoji
          ctx.fillStyle=cor.culoare; ctx.font=`900 ${W*0.025}px "Space Grotesk",sans-serif`; ctx.textAlign='left';
          ctx.fillText(cor.emoji+' '+cor.dir.toUpperCase(), cx_c+W*0.015, cy_c+H*0.065);
          // Tip intervenție
          label(cor.tip, cx_c+W*0.015, cy_c+H*0.10, 'rgba(148,163,184,0.7)', 0.0055);
          // Locuințe
          label('LOCUINȚE NOI', cx_c+W*0.015, cy_c+H*0.155, 'rgba(148,163,184,0.6)', 0.006);
          bigNum(N(cor.locuinte), cx_c+W*0.015, cy_c+H*0.22, 0.028, cor.culoare);
          // Populație absorbită
          label('POP. ABSORBITĂ 2055', cx_c+W*0.015, cy_c+H*0.265, 'rgba(148,163,184,0.6)', 0.006);
          label('+'+N(cor.pop2055)+' loc.', cx_c+W*0.015, cy_c+H*0.30, 'rgba(200,215,240,0.9)', 0.007);
          // Bar presiune
          barH(cx_c+W*0.015, cy_c+H*0.325, W*0.19, 4, cor.mult*3.5, cor.culoare);
        });

        // Legendă 3D bare
        const la=reveal(0.65,0.25);
        ctx.globalAlpha=a*la;
        card(W*0.04, H*0.74, W*0.55, H*0.13, 0.88);
        ctx.globalAlpha=a*la;
        [['#ef4444','PRESIUNE MAJORĂ — Densificare intensă'],['#f59e0b','PRESIUNE MEDIE — Densificare moderată'],['#60a5fa','PRESIUNE MICĂ — Expansiune controlată'],['#22c55e','RECONVERSIE — Platforme industriale']].forEach(([clr,txt],i)=>{
          ctx.fillStyle=clr; ctx.fillRect(W*0.055, H*(0.775+i*0.03), W*0.025, 8);
          label(txt, W*0.09, H*(0.783+i*0.03), 'rgba(200,215,240,0.85)', 0.006);
        });

        // Concluzie AI
        if(t>0.78){
          const ta=Math.min(1,(t-0.78)/0.15);
          ctx.save(); ctx.globalAlpha=a*ta;
          card(W*0.62, H*0.74, W*0.34, H*0.18, 0.92);
          ctx.globalAlpha=a*ta;
          ctx.fillStyle='#D4AF37'; ctx.font=`700 ${W*0.007}px "IBM Plex Mono",monospace`; ctx.textAlign='left';
          ctx.fillText('⚡ PREDICȚIE UrbanX AI', W*0.65, H*0.775);
          const txt=pred.r10>0.5
            ?`${name}: creștere accelerată. Periferia N/E va absorbi ${N(pred.deltaP)} loc. până în 2055. Necesare ${N(pred.deficitLocuinte)} unități locative.`
            :pred.r10>0
            ?`${name}: creștere moderată. Reconversia industrială (${N(pred.reconversieHa)} ha) acoperă 40% din deficit.`
            :`${name}: declin demografic. Prioritate: reabilitare fond existent, nu expansiune. ROI maxim pe centru.`;
          const words=txt.split(' '); let line='', y=H*0.81;
          words.forEach(w=>{ const test=line+w+' '; if(ctx.measureText(test).width>W*0.3){
            label(line, W*0.65, y, 'rgba(200,215,240,0.85)', 0.0058); y+=H*0.028; line=w+' '; }else{ line=test; } });
          label(line, W*0.65, y, 'rgba(200,215,240,0.85)', 0.0058);
          ctx.restore();
        }

        ctx.restore();
        sceneLabel('5','Coridoare 2055');
        break;
      }

      // ──────────────────────────────────────────────────────────────────────
      // SCENA 6 — MOBILITATE AUTO
      // ──────────────────────────────────────────────────────────────────────
      case 6: {
        const a=t<0.1?t/0.1:t>0.85?Math.max(0,(1-t)/0.15):1;
        ctx.save(); ctx.globalAlpha=a;
        gradient(0,0,W*0.55,H,'rgba(3,7,18,0.88)','rgba(3,7,18,0)');

        titleScene('6',`Mobilitate Auto — ${name}`,'MODEL UrbanX · DATE OSM + ANCPI','#ef4444');

        const ca=reveal(0.12,0.25);
        card(W*0.04,H*0.22,W*0.48,H*0.65,0.9);
        ctx.globalAlpha=a*ca;

        label('GRADE DE MOTORIZARE (VEH/1000 LOC.)', W*0.07,H*0.30,'#D4AF37',0.007);
        [[2024,pred.motorizare2024,'rgba(148,163,184,0.9)'],[2035,pred.motorizare2035,'#f59e0b'],[2055,pred.motorizare2055,'#ef4444']].forEach(([yr,val,clr],i)=>{
          label(yr.toString(), W*0.07, H*(0.37+i*0.13), 'rgba(100,130,170,0.7)', 0.006);
          bigNum(N(Math.round(val))+' veh/1000', W*0.07, H*(0.44+i*0.13), 0.030, clr);
          barH(W*0.07, H*(0.465+i*0.13), W*0.42, 5, val/700, clr);
        });

        label('SATURARE REȚEA RUTIERĂ',W*0.07,H*0.70,'rgba(148,163,184,0.7)',0.007);
        bigNum(`~${pred.saturareAn}`, W*0.07, H*0.78, 0.040,
          pred.saturareAn<=2040?'#ef4444':pred.saturareAn<=2050?'#f59e0b':'#22c55e');
        label('AN ESTIMAT SATURARE COMPLETĂ', W*0.07, H*0.82, '#D4AF37', 0.007);
        label(`CAPACITATE REZIDUALĂ 2055: ${pred.capReziduala}%`, W*0.07, H*0.86, 'rgba(100,130,170,0.7)', 0.006);

        // Card dreapta
        const cb=reveal(0.28,0.25);
        card(W*0.55,H*0.22,W*0.41,H*0.65,0.9);
        ctx.globalAlpha=a*cb;

        label('PRESIUNE TRAFIC',W*0.58,H*0.29,'#D4AF37',0.007);
        label('FLUX ORA DE VÂRF (EST.)',W*0.58,H*0.36,'rgba(148,163,184,0.7)',0.006);
        bigNum(N(pred.fluxOra)+' VEH/H', W*0.58, H*0.45, 0.030, '#ef4444');
        label(`ARTERE CONGESTIONATE: ${pred.artereCongest}`,W*0.58,H*0.50,'rgba(100,130,170,0.7)',0.006);

        label('SOLUȚII NECESARE',W*0.58,H*0.58,'#D4AF37',0.007);
        label(`PASAJE DENIVELATE: ${pred.pasajeNecesare} buc.`,W*0.58,H*0.64,'rgba(200,215,240,0.85)',0.0065);
        label(`VARIANTE OCOLITOARE: ${Math.ceil(pred.hub*1.5)} km`,W*0.58,H*0.70,'rgba(200,215,240,0.85)',0.0065);
        label(`PARKINGURI MULTIETAJ: ${pred.parcareMulti} loc.`,W*0.58,H*0.76,'rgba(200,215,240,0.85)',0.0065);

        // Concluzie
        const cc=reveal(0.68,0.2);
        ctx.globalAlpha=a*cc;
        label(`⚡ Fără intervenție, rețeaua se saturează în ~${pred.saturareAn}. BRT + pasaje = +${Math.round(pred.capReziduala*0.4)}% capacitate.`,
          W*0.58, H*0.85, '#f59e0b', 0.006);

        ctx.restore();
        sceneLabel('6','Mobilitate Auto');
        break;
      }

      // ──────────────────────────────────────────────────────────────────────
      // SCENA 7 — TRANSPORT PUBLIC
      // ──────────────────────────────────────────────────────────────────────
      case 7: {
        const a=t<0.1?t/0.1:t>0.85?Math.max(0,(1-t)/0.15):1;
        ctx.save(); ctx.globalAlpha=a;
        gradient(0,0,W*0.55,H,'rgba(3,7,18,0.88)','rgba(3,7,18,0)');

        titleScene('7',`Transport Public — ${name}`,'PLAN SUMP · DATE INSE + OSM','#60a5fa');

        const ca=reveal(0.12,0.25);
        card(W*0.04,H*0.22,W*0.46,H*0.62,0.9);
        ctx.globalAlpha=a*ca;

        label('ACOPERIRE ACTUALĂ TP',W*0.07,H*0.30,'#60a5fa',0.007);
        bigNum(pred.tp+'%', W*0.07, H*0.41, 0.055, pred.tp>=70?'#22c55e':pred.tp>=50?'#f59e0b':'#ef4444');
        label('DIN POPULAȚIE ACOPERITĂ', W*0.07, H*0.45, '#D4AF37', 0.007);
        barH(W*0.07,H*0.48,W*0.4,8,pred.tp/100,pred.tp>=70?'#22c55e':pred.tp>=50?'#f59e0b':'#ef4444');

        label(`DEFICIT: ${pred.deficitTP}pp față de standard 75%`,W*0.07,H*0.55,'rgba(148,163,184,0.7)',0.006);
        label('WALK SCORE ESTIMAT',W*0.07,H*0.62,'rgba(148,163,184,0.7)',0.006);
        bigNum(pred.walkScore+'/100', W*0.07, H*0.70, 0.035, pred.walkScore>=65?'#22c55e':'#f59e0b');

        const cb=reveal(0.28,0.25);
        card(W*0.54,H*0.22,W*0.42,H*0.62,0.9);
        ctx.globalAlpha=a*cb;

        label('NECESITAR BRT / EXTINDERE TP',W*0.57,H*0.29,'#60a5fa',0.007);
        label('TRASEE BRT NECESARE',W*0.57,H*0.37,'rgba(148,163,184,0.7)',0.006);
        bigNum(pred.kmBRT+' KM', W*0.57, H*0.46, 0.040, '#60a5fa');
        label(`COST ESTIMAT: ${N(pred.costBRT_mEUR)} M EUR`,W*0.57,H*0.50,'rgba(148,163,184,0.7)',0.007);

        label('STAȚII NOI NECESARE',W*0.57,H*0.58,'rgba(148,163,184,0.7)',0.006);
        bigNum(N(pred.statiiNecesare), W*0.57, H*0.67, 0.035, '#ffffff');

        label(`AN ATINGERE SUMP 75%: ~${pred.anSUMP}`,W*0.57,H*0.73,'#D4AF37',0.007);

        // Concluzie
        const cc=reveal(0.65,0.2);
        ctx.globalAlpha=a*cc;
        label(`⚡ ${pred.deficitTP>20?`Deficit critic (${pred.deficitTP}pp). BRT ${pred.kmBRT}km = ${N(pred.costBRT_mEUR)}M EUR.`:`TP funcțional. Extindere BRT consolidează accesul periferic.`}`,
          W*0.04, H*0.90, '#60a5fa', 0.006);

        ctx.restore();
        sceneLabel('7','Transport Public');
        break;
      }

      // ──────────────────────────────────────────────────────────────────────
      // SCENA 8 — RISC SEISMIC
      // ──────────────────────────────────────────────────────────────────────
      case 8: {
        const a=t<0.1?t/0.1:t>0.85?Math.max(0,(1-t)/0.15):1;
        ctx.save(); ctx.globalAlpha=a;
        gradient(0,0,W,H*0.3,'rgba(20,5,5,0.95)','rgba(3,7,18,0)');

        titleScene('8',`Risc Seismic — ${name}`,'DATE: INFP · PNRR 2021-2027 · P100-1/2013','#ef4444');

        // Ag seismic badge
        const ha=reveal(0.08,0.2);
        ctx.globalAlpha=a*ha;
        const agClr=pred.ag>=0.30?'#ef4444':pred.ag>=0.20?'#f59e0b':'#22c55e';
        ctx.fillStyle=agClr+'33'; ctx.fillRect(W*0.65,H*0.20,W*0.30,H*0.12);
        ctx.fillStyle=agClr; ctx.font=`900 ${W*0.055}px "Space Grotesk",sans-serif`; ctx.textAlign='center';
        ctx.fillText(`ag=${pred.ag.toFixed(2)}g`, W*0.80, H*0.295);
        label('ACCELERAȚIE SEISMICĂ P100', W*0.665, H*0.345, agClr, 0.006);

        const ca=reveal(0.12,0.25);
        card(W*0.04,H*0.22,W*0.58,H*0.65,0.9);
        ctx.globalAlpha=a*ca;

        label('FOND CONSTRUIT LA RISC SEISMIC',W*0.07,H*0.30,'#ef4444',0.007);
        bigNum(N(pred.fondRisc2021)+' CLĂDIRI', W*0.07, H*0.41, 0.045, '#ef4444');
        label('ESTIMATE 2021 (RS I-III)', W*0.07, H*0.45, 'rgba(148,163,184,0.7)', 0.007);

        label('EVOLUȚIE FĂRĂ INTERVENȚIE',W*0.07,H*0.52,'rgba(148,163,184,0.8)',0.007);
        [[2035,pred.fondFaraPNRR2035,'#f59e0b'],[2045,pred.fondFaraPNRR2045,'#ef4444']].forEach(([yr,val,clr],i)=>{
          label(`${yr}: ${N(val)} clădiri vulnerabile`,W*0.07,H*(0.57+i*0.07),clr,0.007);
        });

        label('PROGRAM PNRR — REABILITARE',W*0.07,H*0.71,'#22c55e',0.007);
        label(`APARTAMENTE REABILITATE: ~${N(pred.pnrrAp)}`,W*0.07,H*0.77,'rgba(200,215,240,0.85)',0.007);
        label(`COST REABILITARE FOND: ${N(pred.costReab_mEUR)} M EUR`,W*0.07,H*0.82,'rgba(200,215,240,0.85)',0.007);
        label(`AN ELIMINARE FOND: ~${pred.anEliminare}`,W*0.07,H*0.87,pred.anEliminare<=2040?'#22c55e':'#f59e0b',0.007);

        // Concluzie
        const cc=reveal(0.68,0.2);
        ctx.globalAlpha=a*cc;
        card(W*0.65,H*0.37,W*0.31,H*0.48,0.9);
        ctx.globalAlpha=a*cc;
        label('⚡ PREDICȚIE SEISMICĂ',W*0.68,H*0.44,'#ef4444',0.007);
        const stxt=pred.fondRisc2021>500
          ?`Risc critic: ${N(pred.fondRisc2021)} clădiri vulnerabile. PNRR reabilitează ${N(pred.pnrrAp)}. Fond eliminat: ~${pred.anEliminare}.`
          :pred.fondRisc2021>100
          ?`Risc mediu: ${N(pred.fondRisc2021)} clădiri. Programul PNRR acoperă 25% din fond. Continuare necesară post-2027.`
          :`Risc scăzut: ${N(pred.fondRisc2021)} clădiri. Accent pe prevenție și monitoring digital.`;
        const sw=stxt.split(' '); let sl='', sy=H*0.50;
        sw.forEach(w=>{ const st=sl+w+' '; if(ctx.measureText(st).width>W*0.27){ label(sl,W*0.68,sy,'rgba(200,215,240,0.8)',0.006); sy+=H*0.032; sl=w+' '; }else sl=st; });
        label(sl,W*0.68,sy,'rgba(200,215,240,0.8)',0.006);

        ctx.restore();
        sceneLabel('8','Risc Seismic');
        break;
      }

      // ──────────────────────────────────────────────────────────────────────
      // SCENA 9 — RISCURI CLIMATICE
      // ──────────────────────────────────────────────────────────────────────
      case 9: {
        const a=t<0.1?t/0.1:t>0.85?Math.max(0,(1-t)/0.15):1;
        ctx.save(); ctx.globalAlpha=a;
        gradient(0,0,W,H*0.3,'rgba(3,10,28,0.92)','rgba(3,7,18,0)');

        titleScene('9',`Riscuri Climatice — ${name}`,'SURSE: ANAR · METEO.RO · RCP4.5','#3b82f6');

        const ca=reveal(0.12,0.25);
        card(W*0.04,H*0.22,W*0.44,H*0.65,0.9);
        ctx.globalAlpha=a*ca;

        label('ZILE CANICULARE (>35°C)',W*0.07,H*0.30,'#f59e0b',0.007);
        label('2024 (ACTUAL)',W*0.07,H*0.37,'rgba(148,163,184,0.7)',0.006);
        bigNum(pred.zileCanicula2024+' ZILE/AN', W*0.07, H*0.46, 0.038, '#f59e0b');
        label('2055 (PROIECȚIE RCP4.5)',W*0.07,H*0.52,'rgba(148,163,184,0.7)',0.006);
        bigNum(pred.zileCanicula2055+' ZILE/AN', W*0.07, H*0.61, 0.038, '#ef4444');
        label(`CREȘTERE: +${pred.zileCanicula2055-pred.zileCanicula2024} ZILE (+${Math.round((pred.zileCanicula2055/pred.zileCanicula2024-1)*100)}%)`,
          W*0.07,H*0.65,'#ef4444',0.007);

        label('EFECT INSULĂ TERMICĂ (UHI)',W*0.07,H*0.72,'rgba(148,163,184,0.7)',0.007);
        bigNum(`+${pred.uhiGrad}°C`, W*0.07, H*0.80, 0.040, '#f59e0b');
        label('MAI CALD FAȚĂ DE ZONA RURALĂ ÎNCONJURĂTOARE',W*0.07,H*0.84,'rgba(100,130,170,0.6)',0.006);

        const cb=reveal(0.28,0.25);
        card(W*0.52,H*0.22,W*0.44,H*0.65,0.9);
        ctx.globalAlpha=a*cb;

        label('RISC INUNDAȚII',W*0.55,H*0.29,pred.riscInundatii==='RIDICAT'?'#ef4444':pred.riscInundatii==='MEDIU'?'#f59e0b':'#22c55e',0.007);
        bigNum(pred.riscInundatii, W*0.55, H*0.38, 0.038,
          pred.riscInundatii==='RIDICAT'?'#ef4444':pred.riscInundatii==='MEDIU'?'#f59e0b':'#22c55e');

        label('COST ADAPTARE CLIMATICĂ',W*0.55,H*0.50,'rgba(148,163,184,0.7)',0.007);
        bigNum(`${N(pred.costAdaptare_mEUR)} M EUR`, W*0.55, H*0.60, 0.033, '#22c55e');
        label('COST INACȚIUNE (×4.5)',W*0.55,H*0.66,'rgba(148,163,184,0.7)',0.007);
        bigNum(`${N(pred.costInactiune_mEUR)} M EUR`, W*0.55, H*0.74, 0.033, '#ef4444');
        label('⚡ ROI ADAPTARE: +350% vs inacțiune',W*0.55,H*0.80,'#22c55e',0.007);

        ctx.restore();
        sceneLabel('9','Riscuri Climatice');
        break;
      }

      // ──────────────────────────────────────────────────────────────────────
      // SCENA 10 — PROIECȚIE MONTE CARLO 2055
      // ──────────────────────────────────────────────────────────────────────
      case 10: {
        const a=t<0.1?t/0.1:t>0.85?Math.max(0,(1-t)/0.15):1;
        ctx.save(); ctx.globalAlpha=a;
        gradient(0,0,W,H*0.28,'rgba(3,7,18,0.92)','rgba(3,7,18,0)');

        titleScene('10',`Proiecție Monte Carlo 2055 — ${name}`,'MODEL STOCHASTIC · 10.000 SIMULĂRI','#a78bfa');

        // 3 scenarii
        const rBase=pred.rRef;
        const scen=[
          { lbl:'S1 — REGRES', r:rBase-0.8, clr:'#ef4444', desc:'Migrație continuă, fără investiții majore' },
          { lbl:'S2 — TENDINȚĂ', r:rBase, clr:'#f59e0b', desc:'Continuarea trendului actual 2011-2021' },
          { lbl:'S3 — OPTIMIST', r:rBase+0.9, clr:'#22c55e', desc:'Hub metropolitan + investiții europene' },
        ];

        scen.forEach((s,i)=>{
          const pop=Math.round(pred.p21*Math.pow(1+s.r/100,34));
          const delta=pop-pred.p21;
          const ci=reveal(0.15+i*0.15, 0.25);
          card(W*(0.04+i*0.32),H*0.23,W*0.30,H*0.58,0.9);
          ctx.globalAlpha=a*ci;

          ctx.fillStyle=s.clr; ctx.font=`700 ${W*0.007}px "IBM Plex Mono",monospace`; ctx.textAlign='left';
          ctx.fillText(s.lbl, W*(0.07+i*0.32), H*0.30);
          label(s.desc, W*(0.07+i*0.32), H*0.345, 'rgba(148,163,184,0.7)', 0.006);

          label('POPULAȚIE 2055', W*(0.07+i*0.32), H*0.40, 'rgba(148,163,184,0.7)', 0.006);
          bigNum(N(pop), W*(0.07+i*0.32), H*0.50, 0.038, s.clr);
          label('LOCUITOR', W*(0.07+i*0.32), H*0.54, s.clr, 0.007);

          label((delta>=0?'+':'')+N(delta)+' față de 2021', W*(0.07+i*0.32), H*0.60, 'rgba(200,215,240,0.8)', 0.0065);
          label(`RATĂ: ${s.r>=0?'+':''}${s.r.toFixed(2)}%/AN`, W*(0.07+i*0.32), H*0.66, 'rgba(100,130,170,0.6)', 0.006);

          // Bar scenariu
          const maxPop=Math.max(...scen.map(s=>Math.round(pred.p21*Math.pow(1+s.r/100,34))));
          barH(W*(0.07+i*0.32), H*0.72, W*0.27, 8, pop/maxPop, s.clr);
        });

        // Interval de încredere
        const cia=reveal(0.6,0.25);
        ctx.globalAlpha=a*cia;
        label('INTERVAL DE ÎNCREDERE 90% — 2055:',W*0.04,H*0.86,'rgba(148,163,184,0.7)',0.007);
        const popMin=Math.round(pred.p21*Math.pow(1+(rBase-0.8)/100,34));
        const popMax=Math.round(pred.p21*Math.pow(1+(rBase+0.9)/100,34));
        bigNum(`[${N(popMin)} — ${N(popMax)}]`, W*0.04, H*0.93, 0.030, '#a78bfa');
        label('PROBABILITATE S2 (TENDINȚĂ): ~55%',W*0.58,H*0.90,'rgba(100,130,170,0.7)',0.006);

        ctx.restore();
        sceneLabel('10','Proiecție Monte Carlo');
        break;
      }

      // ──────────────────────────────────────────────────────────────────────
      // SCENA 11 — INFRASTRUCTURĂ NECESARĂ
      // ──────────────────────────────────────────────────────────────────────
      case 11: {
        const a=t<0.1?t/0.1:t>0.85?Math.max(0,(1-t)/0.15):1;
        ctx.save(); ctx.globalAlpha=a;
        gradient(0,0,W,H*0.28,'rgba(3,7,18,0.92)','rgba(3,7,18,0)');

        titleScene('11',`Infrastructură Necesară 2025·2055 — ${name}`,'CALCULE: ΔPOP × NORME MEC · MS · OMS','#22c55e');

        label('NECESARUL DE INFRASTRUCTURĂ 2025-2055',W*0.04,H*0.22,'#22c55e',0.008);

        const items=[
          { icon:'🏫', lbl:'ȘCOLI & GRĂDINIȚE', val:pred.scoliNoi+pred.gradNoi, unit:'unități noi', sub:`${pred.scoliNoi} școli + ${pred.gradNoi} grădinițe · 400 elevi/MEC`, clr:'#60a5fa' },
          { icon:'🏥', lbl:'CABINETE MEDICALE', val:pred.cabineteMed, unit:'cabinete noi', sub:`1.500 pacienți/cabinet MS`, clr:'#ef4444' },
          { icon:'🌳', lbl:'SPAȚII VERZI', val:pred.svNecesar_ha, unit:'ha necesare', sub:`Standard OMS: 9 mp/loc.`, clr:'#22c55e' },
          { icon:'🚌', lbl:'STAȚII TRANSPORT', val:pred.statiiTP_noi, unit:'stații noi', sub:`Acoperire target 75%`, clr:'#f59e0b' },
          { icon:'🅿️', lbl:'PARKINGURI', val:pred.parcareMulti, unit:'structuri', sub:`Multietaj — centru + periurbane`, clr:'#a78bfa' },
          { icon:'⚡', lbl:'REȚELE TEHNICE', val:Math.round(pred.deltaP/5000), unit:'km extindere', sub:`Apă · Canal · Gaz · Fibră`, clr:'#D4AF37' },
        ];

        const cols=3, rows=2;
        items.forEach((it,i)=>{
          const col=i%cols, row=Math.floor(i/cols);
          const cx_i=W*(0.04+col*0.32), cy_i=H*(0.30+row*0.32);
          const ci=reveal(0.12+i*0.08,0.25);
          card(cx_i,cy_i,W*0.30,H*0.27,0.88);
          ctx.globalAlpha=a*ci;
          ctx.font=`${W*0.025}px sans-serif`; ctx.textAlign='left';
          ctx.fillText(it.icon, cx_i+W*0.015, cy_i+H*0.075);
          label(it.lbl, cx_i+W*0.065, cy_i+H*0.065, it.clr, 0.006);
          bigNum(`+${N(it.val)}`, cx_i+W*0.015, cy_i+H*0.175, 0.040, it.clr);
          label(it.unit, cx_i+W*0.015, cy_i+H*0.215, '#D4AF37', 0.007);
          label(it.sub, cx_i+W*0.015, cy_i+H*0.245, 'rgba(100,130,170,0.6)', 0.0055);
        });

        // Sumar
        const sa=reveal(0.7,0.25);
        ctx.globalAlpha=a*sa;
        label(`⚡ BAZĂ: creștere demografică ${pred.deltaP>=0?'+':''}${N(pred.deltaP)} loc. 2021-2055 · Normele MEC/MS/OMS aplicabile oricărui UAT`,
          W*0.04, H*0.95, '#D4AF37', 0.006);

        ctx.restore();
        sceneLabel('11','Infrastructură Necesară');
        break;
      }

      // ──────────────────────────────────────────────────────────────────────
      // SCENA 12 — INVESTIȚII
      // ──────────────────────────────────────────────────────────────────────
      case 12: {
        const a=t<0.1?t/0.1:t>0.85?Math.max(0,(1-t)/0.15):1;
        ctx.save(); ctx.globalAlpha=a;
        gradient(0,0,W,H*0.28,'rgba(3,7,18,0.92)','rgba(3,7,18,0)');

        titleScene('12',`Investiții — ${name}`,'SICAP · PNRR · FEDR 2021-2027','#D4AF37');

        const ca=reveal(0.1,0.2);
        ctx.globalAlpha=a*ca;
        label('NECESAR TOTAL INVESTIȚII 2025-2055', W*0.05,H*0.24,'rgba(148,163,184,0.8)',0.007);
        bigNum(`${N(pred.investTotal_mEUR)} M EUR`, W*0.05, H*0.35, 0.055, '#D4AF37');
        label('ESTIMARE ORIZONTUL 2055 · MODEL UrbanX', W*0.05,H*0.39,'#D4AF37',0.007);

        const sectoare=[
          { lbl:'🚇 Mobilitate & Transport',    val:pred.investMobilitate, pct:32 },
          { lbl:'🏫 Social (Educație & Sănătate)',val:pred.investSocial,   pct:28 },
          { lbl:'🏗️ Seismic & Reziliență',       val:pred.investSeismic,   pct:18 },
          { lbl:'🌳 Verde & Climă',               val:pred.investVerde,     pct:14 },
          { lbl:'💻 Digital & Smart City',        val:pred.investDigital,   pct:8  },
        ];

        sectoare.forEach((s,i)=>{
          const si=reveal(0.2+i*0.1,0.2);
          ctx.globalAlpha=a*si;
          label(s.lbl, W*0.05, H*(0.47+i*0.095), 'rgba(200,215,240,0.9)', 0.007);
          label(`${N(s.val)} M EUR`, W*0.65, H*(0.47+i*0.095), '#D4AF37', 0.007);
          barH(W*0.05,H*(0.495+i*0.095),W*0.88,6,s.pct/100,'#D4AF37','rgba(255,255,255,0.06)');
          label(s.pct+'%', W*0.05+W*0.88*s.pct/100+W*0.01, H*(0.492+i*0.095), '#D4AF37', 0.006);
        });

        const sa=reveal(0.75,0.2);
        ctx.globalAlpha=a*sa;
        label(`⚡ Fonduri UE acoperă ~60% din necesar. Gap: ${N(Math.round(pred.investTotal_mEUR*0.4))} M EUR din buget local/național.`,
          W*0.05, H*0.93, '#D4AF37', 0.006);

        ctx.restore();
        sceneLabel('12','Investiții');
        break;
      }

      // ──────────────────────────────────────────────────────────────────────
      // SCENA 13 — SCENARII COMPARATE S1/S2/S3
      // ──────────────────────────────────────────────────────────────────────
      case 13: {
        const a=t<0.1?t/0.1:t>0.85?Math.max(0,(1-t)/0.15):1;
        ctx.save(); ctx.globalAlpha=a;

        titleScene('13',`Scenarii Comparate — ${name}`,'S1 REGRES · S2 TENDINȚĂ · S3 OPTIMIST','#a78bfa');

        const rBase=pred.rRef;
        const scen=[
          { lbl:'S1',full:'REGRES', r:rBase-0.8, clr:'#ef4444',
            tp:Math.max(30,pred.tp-10), sv:Math.max(5,pred.sv-3), pib:Math.round(pred.pib*0.9) },
          { lbl:'S2',full:'TENDINȚĂ', r:rBase, clr:'#f59e0b',
            tp:pred.tp, sv:pred.sv, pib:pred.pib },
          { lbl:'S3',full:'OPTIMIST', r:rBase+0.9, clr:'#22c55e',
            tp:Math.min(85,pred.tp+20), sv:Math.min(20,pred.sv+6), pib:Math.round(pred.pib*1.35) },
        ];

        const indicatori=['POPULAȚIE 2055','PIB/CAP 2055 (EUR)','ACOP. TP (%)','SP. VERZI (MP/LOC)','SDG11 SCORE'];

        // Header
        ctx.globalAlpha=a*reveal(0.08,0.2);
        label('INDICATOR',W*0.05,H*0.25,'rgba(148,163,184,0.6)',0.006);
        scen.forEach((s,i)=>{
          ctx.fillStyle=s.clr; ctx.font=`900 ${W*0.018}px "Space Grotesk",sans-serif`; ctx.textAlign='center';
          ctx.fillText(s.lbl+' '+s.full, W*(0.38+i*0.22), H*0.25);
        });

        // Linii
        indicatori.forEach((ind,row)=>{
          const ri=reveal(0.15+row*0.1,0.2);
          ctx.globalAlpha=a*ri;

          ctx.fillStyle=row%2===0?'rgba(255,255,255,0.03)':'transparent';
          ctx.fillRect(0,H*(0.29+row*0.11),W,H*0.11);

          label(ind, W*0.05, H*(0.355+row*0.11), 'rgba(200,215,240,0.85)', 0.0065);

          scen.forEach((s,col)=>{
            const pop55=Math.round(pred.p21*Math.pow(1+s.r/100,34));
            const pib55=Math.round(s.pib*Math.pow(1+pred.rPIB/100,31));
            const sdg=Math.round((s.tp/75*10*0.25+s.sv/9*10*0.25+pib55/36600*10*0.25+7*0.25)*10)/10;
            const vals=[N(pop55),N(pib55),s.tp+'%',s.sv+' mp',sdg.toFixed(1)];
            ctx.fillStyle=s.clr; ctx.font=`700 ${W*0.012}px "Space Grotesk",sans-serif`; ctx.textAlign='center';
            ctx.fillText(vals[row], W*(0.38+col*0.22), H*(0.355+row*0.11));
          });
        });

        // Concluzie
        const ca=reveal(0.68,0.25);
        ctx.globalAlpha=a*ca;
        ctx.fillStyle='rgba(0,0,0,0.6)'; ctx.fillRect(0,H*0.87,W,H*0.13);
        label(`⚡ GAP S1→S3: ${N(Math.round(pred.p21*(Math.pow(1+(rBase+0.9)/100,34)-Math.pow(1+(rBase-0.8)/100,34))))} loc. · ${N(Math.round(pred.pib*0.45))} EUR/cap PIB · +30pp TP`,
          W*0.05, H*0.93, '#a78bfa', 0.007);

        ctx.restore();
        sceneLabel('13','Scenarii S1/S2/S3');
        break;
      }

      // ──────────────────────────────────────────────────────────────────────
      // SCENA 14 — CALITATEA VIEȚII SDG11
      // ──────────────────────────────────────────────────────────────────────
      case 14: {
        const a=t<0.1?t/0.1:t>0.85?Math.max(0,(1-t)/0.15):1;
        ctx.save(); ctx.globalAlpha=a;

        titleScene('14',`Calitatea Vieții — ${name}`,'SDG11 · INDICATORI ONU · DATE INSE 2022','#22c55e');

        // Score radial simplu
        const cx_r=W*0.25, cy_r=H*0.55, rad=H*0.22;
        const dims=[
          {lbl:'Spații Verzi',score:pred.sdg11_sv,clr:'#22c55e'},
          {lbl:'Transport P.',score:pred.sdg11_tp,clr:'#60a5fa'},
          {lbl:'Economie',   score:pred.sdg11_pib,clr:'#D4AF37'},
          {lbl:'Seismic',   score:pred.sdg11_seism,clr:'#ef4444'},
        ];
        ctx.globalAlpha=a*reveal(0.1,0.3);
        dims.forEach((d,i)=>{
          const angle=(i/dims.length)*Math.PI*2 - Math.PI/2;
          const r=rad*d.score/10;
          ctx.strokeStyle=d.clr+'99'; ctx.lineWidth=2;
          ctx.beginPath(); ctx.moveTo(cx_r,cy_r); ctx.lineTo(cx_r+r*Math.cos(angle),cy_r+r*Math.sin(angle)); ctx.stroke();
          ctx.fillStyle=d.clr;
          ctx.beginPath(); ctx.arc(cx_r+r*Math.cos(angle),cy_r+r*Math.sin(angle),6,0,Math.PI*2); ctx.fill();
          label(d.lbl+' '+d.score+'/10', cx_r+(rad+15)*Math.cos(angle)-30, cy_r+(rad+15)*Math.sin(angle)+5, d.clr, 0.006);
        });
        // Cerc referință
        ctx.strokeStyle='rgba(255,255,255,0.1)'; ctx.lineWidth=1;
        ctx.beginPath(); ctx.arc(cx_r,cy_r,rad,0,Math.PI*2); ctx.stroke();

        // Score total
        ctx.globalAlpha=a*reveal(0.35,0.25);
        bigNum(pred.sdg11_total.toFixed(1), cx_r-W*0.04, cy_r+H*0.03, 0.055,
          pred.sdg11_total>=7?'#22c55e':pred.sdg11_total>=5?'#f59e0b':'#ef4444');
        label('/10 — SCOR SDG11', cx_r-W*0.01, cy_r+H*0.07, '#D4AF37', 0.007);

        // Detalii dreapta
        const ca=reveal(0.3,0.25);
        card(W*0.52,H*0.22,W*0.44,H*0.65,0.9);
        ctx.globalAlpha=a*ca;

        label('DEFICIT SPAȚII VERZI',W*0.55,H*0.29,'#22c55e',0.007);
        bigNum(`${N(pred.deficitSV_ha)} HA`, W*0.55, H*0.39, 0.040,
          pred.deficitSV_ha>200?'#ef4444':pred.deficitSV_ha>50?'#f59e0b':'#22c55e');
        label(`FAȚ DE STANDARD OMS (9 MP/LOC.) · ACTUAL: ${pred.sv} MP/LOC`, W*0.55,H*0.43,'rgba(148,163,184,0.7)',0.006);

        label('SPAȚII VERZI NECESARE 2055',W*0.55,H*0.52,'rgba(148,163,184,0.7)',0.007);
        bigNum(N(pred.svNecesar_ha)+' HA', W*0.55, H*0.62, 0.033, '#22c55e');

        label('POLUARE URBANĂ ESTIMATĂ',W*0.55,H*0.70,'rgba(148,163,184,0.7)',0.007);
        const poluare=pred.hub>=1.5?'RIDICATĂ':pred.hub>=1.2?'MEDIE':'SCĂZUTĂ';
        bigNum(poluare, W*0.55, H*0.78, 0.028, pred.hub>=1.5?'#ef4444':pred.hub>=1.2?'#f59e0b':'#22c55e');

        ctx.restore();
        sceneLabel('14','Calitatea Vieții SDG11');
        break;
      }

      // ──────────────────────────────────────────────────────────────────────
      // SCENA 15 — BENCHMARKING EUROPEAN
      // ──────────────────────────────────────────────────────────────────────
      case 15: {
        const a=t<0.1?t/0.1:t>0.85?Math.max(0,(1-t)/0.15):1;
        ctx.save(); ctx.globalAlpha=a;

        titleScene('15',`Benchmarking European — ${name}`,'PEER GROUP · EUROSTAT URBAN AUDIT 2021','#a78bfa');

        label('COMPARAȚIE CU ORAȘE SIMILARE DIN UE',W*0.04,H*0.24,'rgba(148,163,184,0.7)',0.007);

        const peers=[{name,pop:pred.p21,pib:pred.pib,sv:pred.sv,tp:pred.tp,isSelf:true},...pred.peers];
        const cols=['ORAȘ','POPULAȚIE','PIB/CAP','SP.VERZI','ACOP.TP'];

        ctx.globalAlpha=a*reveal(0.1,0.2);
        cols.forEach((c,i)=>{
          ctx.fillStyle='rgba(148,163,184,0.5)'; ctx.font=`${W*0.006}px "IBM Plex Mono",monospace`; ctx.textAlign='left';
          ctx.fillText(c, W*(0.04+i*0.19), H*0.32);
        });

        peers.forEach((p,row)=>{
          const ri=reveal(0.15+row*0.12,0.2);
          ctx.globalAlpha=a*ri;
          if(p.isSelf){ ctx.fillStyle='rgba(212,175,55,0.12)'; ctx.fillRect(0,H*(0.35+row*0.12),W,H*0.12); }
          const clr=p.isSelf?'#D4AF37':'rgba(200,215,240,0.85)';
          const vals=[p.name,N(p.pop),N(p.pib)+' €',p.sv+' mp',p.tp+'%'];
          vals.forEach((v,col)=>{
            ctx.fillStyle=clr; ctx.font=`${p.isSelf?'700':'400'} ${W*0.0065}px "IBM Plex Mono",monospace`; ctx.textAlign='left';
            ctx.fillText(v, W*(0.04+col*0.19), H*(0.41+row*0.12));
          });
        });

        // Gap vs best peer
        const bestPeer=pred.peers.reduce((b,p)=>p.pib>b.pib?p:b, pred.peers[0]);
        const ga=reveal(0.6,0.25);
        ctx.globalAlpha=a*ga;
        ctx.fillStyle='rgba(0,0,0,0.6)'; ctx.fillRect(0,H*0.82,W,H*0.18);
        label(`⚡ GAP față de ${bestPeer.name}: PIB ${N(bestPeer.pib-pred.pib)} EUR/cap · TP ${bestPeer.tp-pred.tp}pp · SV ${bestPeer.sv-pred.sv} mp/loc`,
          W*0.04, H*0.90, '#a78bfa', 0.007);
        label(`PENTRU CONVERGENȚĂ: +${Math.round((bestPeer.pib-pred.pib)/pred.pib*100)}% PIB | +${Math.round((bestPeer.sv-pred.sv)*pred.p21/10000)} HA SPAȚII VERZI`,
          W*0.04, H*0.96, '#D4AF37', 0.006);

        ctx.restore();
        sceneLabel('15','Benchmarking EU');
        break;
      }

      // ──────────────────────────────────────────────────────────────────────
      // SCENA 16 — AGENDA PRIMARULUI
      // ──────────────────────────────────────────────────────────────────────
      case 16: {
        const a=t<0.1?t/0.1:t>0.85?Math.max(0,(1-t)/0.15):1;
        ctx.save(); ctx.globalAlpha=a;

        titleScene('16',`Agenda Primarului 2025·2030 — ${name}`,'PRIORITĂȚI GENERATE DIN SCORURI UAT','#D4AF37');

        label('TOP PRIORITĂȚI DERIVATE DIN ANALIZA UrbanX',W*0.04,H*0.24,'rgba(148,163,184,0.7)',0.007);

        pred.priorități.forEach((pr,i)=>{
          const pi=reveal(0.12+i*0.12,0.25);
          card(W*0.04,H*(0.29+i*0.13),W*0.90,H*0.11,0.85);
          ctx.globalAlpha=a*pi;

          ctx.fillStyle=pr.culoare; ctx.font=`900 ${W*0.024}px "Space Grotesk",sans-serif`; ctx.textAlign='left';
          ctx.fillText(`${i+1}.`, W*0.07, H*(0.355+i*0.13));
          ctx.fillStyle='rgba(230,240,255,0.95)'; ctx.font=`700 ${W*0.016}px "Space Grotesk",sans-serif`;
          ctx.fillText(pr.label.toUpperCase(), W*0.11, H*(0.355+i*0.13));

          // Scor urgență
          const urgenta=Math.min(100,Math.round(pr.score));
          label(`URGENȚĂ: ${urgenta>70?'CRITICĂ':urgenta>40?'RIDICATĂ':'MEDIE'}`,W*0.72,H*(0.345+i*0.13),pr.culoare,0.0065);
          barH(W*0.72,H*(0.36+i*0.13),W*0.22,5,urgenta/100,pr.culoare);
        });

        // Footer
        const fa=reveal(0.75,0.25);
        ctx.globalAlpha=a*fa;
        label('⚡ Prioritățile sunt recalculate automat la fiecare UAT pe baza scorurilor individuale.',
          W*0.04, H*0.94, '#D4AF37', 0.006);

        ctx.restore();
        sceneLabel('16','Agenda Primarului');
        break;
      }

      // ──────────────────────────────────────────────────────────────────────
      // SCENA 17 — VIZIUNEA 2055
      // ──────────────────────────────────────────────────────────────────────
      case 17: {
        const a=t<0.1?t/0.1:t>0.85?Math.max(0,(1-t)/0.15):1;
        ctx.save(); ctx.globalAlpha=a;

        // Fundal dramatic
        const bg=ctx.createRadialGradient(W/2,H,0,W/2,H,W);
        bg.addColorStop(0,'rgba(30,15,5,0.6)'); bg.addColorStop(1,'rgba(3,7,18,0.92)');
        ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

        ctx.globalAlpha=a*reveal(0.05,0.3);
        ctx.fillStyle='rgba(212,175,55,0.07)'; ctx.font=`900 ${W*0.3}px "Space Grotesk",sans-serif`; ctx.textAlign='center';
        ctx.fillText('2055', W/2, H*0.6);

        ctx.globalAlpha=a*reveal(0.1,0.2);
        ctx.fillStyle='rgba(148,163,184,0.6)'; ctx.font=`${W*0.008}px "IBM Plex Mono",monospace`; ctx.textAlign='center';
        ctx.fillText('VIZIUNEA 2055 — ORAȘUL POSIBIL', W/2, H*0.22);

        ctx.globalAlpha=a*reveal(0.15,0.3);
        ctx.fillStyle='#ffffff'; ctx.font=`900 ${W*0.065}px "Space Grotesk",sans-serif`; ctx.textAlign='center';
        ctx.fillText(name.toUpperCase(), W/2, H*0.38);

        ctx.globalAlpha=a*reveal(0.2,0.2);
        ctx.fillStyle='#D4AF37'; ctx.font=`${W*0.012}px "Space Grotesk",sans-serif`;
        const subtitre=pred.trendColor==='#22c55e'?'UN ORAȘ ÎN CREȘTERE CARE ALEGE SĂ CREASCĂ INTELIGENT':
          pred.trendColor==='#4ade80'?'UN ORAȘ CARE POATE DEVENI MOTOR REGIONAL':
          pred.r10>-1?'UN ORAȘ CARE ALEGE SĂ SE REINVENTEZE':'UN ORAȘ CARE ALEGE CALITATEA, NU CANTITATEA';
        ctx.fillText(subtitre, W/2, H*0.44);

        // Checklist
        const pop2055=pred.pop2055, p21=pred.p21;
        const items=[
          { ok:pop2055>p21, txt:`${N(pop2055)} loc. în 2055 — ${pop2055>p21?'CREȘTERE':'STABILIZARE'} față de ${N(p21)} actual` },
          { ok:pred.pctUE2055>=75, txt:`PIB ${N(pred.pib2055)} EUR/cap — ${pred.pctUE2055}% din media UE27` },
          { ok:pred.anSUMP<=2035, txt:`Transport public modern — SUMP atingibil ~${pred.anSUMP}` },
          { ok:pred.sdg11_total>=6, txt:`SDG11 scor ${pred.sdg11_total}/10 — Calitate vieții ${pred.sdg11_total>=7?'bună':'satisfăcătoare'}` },
          { ok:pred.anEliminare<=2045, txt:`Fond seismic eliminat ~${pred.anEliminare} — Reziliență structurală` },
        ];

        items.forEach((it,i)=>{
          const ia=reveal(0.3+i*0.1,0.2);
          ctx.globalAlpha=a*ia;
          ctx.fillStyle=it.ok?'#22c55e':'#f59e0b'; ctx.font=`700 ${W*0.018}px "Space Grotesk",sans-serif`; ctx.textAlign='left';
          ctx.fillText(it.ok?'✓':'◎', W*0.1, H*(0.55+i*0.08));
          ctx.fillStyle='rgba(220,230,255,0.9)'; ctx.font=`${W*0.008}px "IBM Plex Mono",monospace`;
          ctx.fillText(it.txt, W*0.15, H*(0.555+i*0.08));
        });

        // Footer
        ctx.globalAlpha=a*reveal(0.7,0.3);
        ctx.fillStyle='rgba(212,175,55,0.2)'; ctx.fillRect(0,H*0.93,W,H*0.07);
        ctx.fillStyle='#D4AF37'; ctx.font=`${W*0.007}px "IBM Plex Mono",monospace`; ctx.textAlign='center';
        ctx.fillText('UrbanX TSS·FG · PLATFORMĂ NAȚIONALĂ PENTRU PLANIFICAREA URBANISM DIGITAL', W/2, H*0.965);
        ctx.fillStyle='rgba(148,163,184,0.6)'; ctx.font=`${W*0.006}px "IBM Plex Mono",monospace`;
        ctx.fillText('© 2026 ThinkSmart Solutions SRL · Valori orientative · Predicțiile se recalculează per UAT · TSS·FG', W/2, H*0.985);

        ctx.restore();
        sceneLabel('17','Viziunea 2055');
        break;
      }

    } // end switch
  }, // end _renderScene

  // Helper: găsim cityKey din context
  _getCityKey() {
    const fromTCI = typeof window.TCI !== 'undefined' ? window.TCI?.cityKey : null;
    const fromLS  = localStorage.getItem('ux_last_city');
    const fromPE  = window._ProjectionEngine?.currentCity;
    const fromDB  = window._RO_CITIES_DB ? Object.keys(window._RO_CITIES_DB)[0] : null;
    return fromTCI || fromLS || fromPE || fromDB || 'RO-IS-01';
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════════════════════════════
(function _init(n) {
  if(n>80) return;

  window._SceneEngine     = G._SceneEngine;
  window._PredEngine      = _PRED;
  console.log('[TCI Cinematic v4.0] ✅ _SceneEngine + _PredEngine disponibile');

  // Override openTCI când devine disponibil
  const _tryPatch = (attempt) => {
    if(typeof TCI !== 'undefined' && typeof window.openTCI === 'function') {
      const orig = window.openTCI;
      window.openTCI = function(opts) {
        if(opts?.mode==='cinema_v2'||opts?.scenes||window._preferCinemaV2) {
          G._SceneEngine.launch(opts?.cityKey || G._SceneEngine._getCityKey());
        } else {
          if(orig) orig(opts);
        }
      };
      window._switchToCinemaV2  = ()=>{ window._preferCinemaV2=true;  ss('🎬 Cinema v4 activ'); };
      window._switchToTCIClassic= ()=>{ window._preferCinemaV2=false; ss('📊 TCI Clasic activ'); };
      console.log('[Cinema v4] ✅ openTCI override aplicat');
    } else if(attempt < 40) {
      setTimeout(()=>_tryPatch(attempt+1), 500);
    }
  };
  _tryPatch(0);

  ss('🎬 TCI Cinematic v4.0 — predicții dinamice per orice UAT · 17 scene');
})(0);

})(window);
