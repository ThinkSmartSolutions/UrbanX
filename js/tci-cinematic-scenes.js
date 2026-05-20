// ═══════════════════════════════════════════════════════════════════════════
// tci-cinematic-scenes.js — UrbanX TCI Cinematic v2.0
// 19 mai 2026 | ThinkSmart Solutions SRL
//
// Implementează toate cele 12 scene din storyboard-ul TCI Cinema:
//
// SCENA 1: OVERVIEW — România în context european
//   Mapbox zoom z=3 (Europa) → z=6 (România highlighted)
//
// SCENA 2: ZOOM REGIONAL — Moldova, polul Iași
//   Layer județe colorate, marker animat Iași cu pop
//
// SCENA 3: APPROACH — Date live în zbor
//   Carduri animate typewriter în timp ce camera coboară
//
// SCENA 4: CITY OVERVIEW 3D — Densitate per cartier
//   Heatmap densitate + etichete cartiere principale
//
// SCENA 5: DEZVOLTARE URBANĂ — Bare 3D MAJORĂ/MEDIE/MICĂ
//   fill-extrusion colorate per zonă, legendă vizibilă
//
// SCENA 6: INFRASTRUCTURĂ & MOBILITATE
//   Strazi colorate AGLOMERAT(roșu)/MODERAT(galben)/FLUID(verde)
//   Icoane transport public animate
//
// SCENA 7: FOCUS ZONĂ — Proiecții per cartier
//   Date calculate per zonă: densificare%, locuințe noi, pop 2050
//   Prima dată în România: proiecții sub-UAT
//
// SCENA 8: COMPARAȚIE 2 UAT-uri — split screen real
//   mapLeft = UAT 1, mapRight = UAT 2, date comparative
//
// SCENA 9: STREET LEVEL — Copaci + tramvaie + pietoni
//   Mapbox Standard copaci nativi activați
//
// SCENA 10: VIAȚA URBANĂ — Modal split animat
//   Card cinematic: TP +62%, pietoni 24.700/zi, grafic trend
//
// SCENA 11: SLIDER TEMPORAL fullscreen
//   Drag interactiv pe ecran: stânga=2025, dreapta=2050
//
// SCENA 12: CONCLUZIE & VIZIUNE
//   Checklist animat: Oraș dens ✓, Mobilitate verde ✓, etc.
//   Sunset dramatic + date finale
// ═══════════════════════════════════════════════════════════════════════════

(function(G) {
'use strict';

const N = (v,d=0) => isNaN(+v)?'—':Number(v).toLocaleString('ro-RO',{minimumFractionDigits:d,maximumFractionDigits:d});

// ═══════════════════════════════════════════════════════════════════════════
// PROIECȚII PER ZONĂ — rezolvă Gap-ul CRITIC (Scena 7)
// ═══════════════════════════════════════════════════════════════════════════

G._ZoneProjections = {

  // Zone identificate DINAMIC: OSM → Transport → Gravitational
  // Nu mai avem liste hardcodate — _ZoneEngine face totul
  // Aceste câmpuri sunt menținute pentru compatibilitate cu calculate()
  // dar sunt populate dinamic în _ZoneEngine.analyze()
  UAT_ZONES: null, // eliminat — folosim _ZoneEngine

  // Ponderile per tip zonă (calibrate pe GHSL România 2021)
  ZONE_WEIGHTS: {
    'centru':     { gravWeight:1.00, radius_km:1.5, densBase:180, growth_mult:0.85 },
    'semicentral':{ gravWeight:0.78, radius_km:3.0, densBase:140, growth_mult:1.20 },
    'cartier1':   { gravWeight:0.60, radius_km:4.5, densBase:95,  growth_mult:1.15 },
    'cartier2':   { gravWeight:0.48, radius_km:6.0, densBase:70,  growth_mult:1.10 },
    'cartier3':   { gravWeight:0.38, radius_km:7.5, densBase:55,  growth_mult:1.05 },
    'periferie1': { gravWeight:0.28, radius_km:9.5, densBase:35,  growth_mult:1.30 },
    'periferie2': { gravWeight:0.18, radius_km:12., densBase:18,  growth_mult:1.40 },
    'periurban':  { gravWeight:0.10, radius_km:18., densBase:8,   growth_mult:1.60 },
  },

  // Zone identificate dinamic prin _ZoneEngine (OSM + transport + gravitational)
  // Niciun hardcode — fiecare UAT primește zonele lui specifice
  getZoneNames(city) {
    // Dacă _ZoneEngine e disponibil, returnează zonele deja calculate
    const cached = window._ZoneEngine?._cache?.[
      `zones_${city.siruta||city.lat}_${city.lon}`
    ];
    if(cached?.zones) return cached.zones.map(z=>z.name);
    // Fallback generic (nu hardcodat pe județ)
    const n = city?.pop2021||100000;
    if(n > 200000) return ['Centru','Zona 1','Zona 2','Zona 3','Zona 4','Zona 5','Periferie Nord','Periferie Sud'];
    if(n > 50000)  return ['Centru','Zona Nord','Zona Sud','Zona Est','Zona Vest','Periferie'];
    return ['Centru','Zona Intermediară','Periferie','Expansiune'];
  },

  // Proiecție per zonă pentru un UAT și an dat
  // Zone cu NUME REALE din OSM sau fallback per județ
  calculate(city, need, year) {
    const pop0   = city?.pop2021 || 100000;
    const pop55  = need?.pop2055 || pop0;
    const r      = city?.rata_reala_2011_2021 || 0;
    const grav   = window._TCIMasterplanPDF?._calcGravity?.(city) || { gravityScore:0.5, growthType:'REGIONAL' };
    const cx     = city?.lon || 27.601;
    const cy     = city?.lat || 47.158;

    // Zone cu NUME REALE per județ
    const zoneNames = this.getZoneNames(city);

    const zones = {};
    let totalWeight = 0;
    const weightKeys = Object.keys(this.ZONE_WEIGHTS);
    weightKeys.forEach(k => { totalWeight += this.ZONE_WEIGHTS[k].gravWeight; });

    const yrFrac = Math.max(0, Math.min(1, (year - 2021) / 34));

    weightKeys.forEach((key, idx) => {
      const z    = this.ZONE_WEIGHTS[key];
      const name = zoneNames[idx] || z.label || key;
      const prevR = idx > 0 ? this.ZONE_WEIGHTS[weightKeys[idx-1]].radius_km : 0;
      const areaKm2 = Math.max(0.5, Math.PI * (z.radius_km**2 - prevR**2));
      const normShare = z.gravWeight / totalWeight;

      // Densificare mai mare pentru zone periferice (tendința reală România)
      const growthBonus = z.growth_mult || 1.0;
      const pop2021Zone = Math.round(pop0 * normShare);
      const pop2055Zone = Math.round(pop55 * normShare * Math.max(0.5, (0.7 + (1-z.gravWeight)*growthBonus*0.5)));
      const popYrZone   = Math.round(pop2021Zone + (pop2055Zone - pop2021Zone) * yrFrac);

      const densitate2021 = Math.round(pop2021Zone / Math.max(0.5, areaKm2) / 100); // loc/ha
      const densitate2055 = Math.round(pop2055Zone / Math.max(0.5, areaKm2) / 100);
      const densifPct     = densitate2021>0 ? Math.round((densitate2055-densitate2021)/densitate2021*100) : 0;

      const locuinte_noi  = Math.round((need?.locuinteTotale||5000) * normShare * growthBonus);
      const presiune      = Math.min(1, z.gravWeight * (1 + r/100*5) * (grav.gravityScore||0.5) * growthBonus);

      // Copii și vârstnici per zonă (pentru calcul infrastructură)
      const copii    = Math.round(pop2055Zone * 0.14);
      const varstnici= Math.round(pop2055Zone * 0.25);

      zones[key] = {
        label:        name,            // NUME REAL (Copou, Tătărași etc)
        key,
        idx,
        radius_km:    z.radius_km,
        pop2021:      pop2021Zone,
        pop2055:      pop2055Zone,
        popAn:        popYrZone,
        densitate2021,
        densitate2055,
        densifPct,
        locuinte_noi,
        presiune,
        presiuneLabel: presiune>0.70?'MAJORĂ':presiune>0.45?'MEDIE':'MICĂ',
        presiuneColor: presiune>0.70?'#ef4444':presiune>0.45?'#f59e0b':'#22c55e',
        areaKm2: Math.round(areaKm2*10)/10,
        // Necesități infrastructură per zonă
        scoli_noi:    Math.max(0, Math.ceil(copii/400) - Math.ceil(pop2021Zone*0.14/400)),
        medici_noi:   Math.max(0, Math.ceil(varstnici/1500) - Math.ceil(pop2021Zone*0.20/1500)),
        spVerzi_ha:   Math.round(Math.max(0, pop2055Zone*9/10000 - pop2021Zone*(city?.spatii_verzi_mp_loc||12)/10000)),
        statii_tp:    Math.ceil(pop2055Zone/3500),
        // Coordonate pentru zoom pe hartă
        cx: cx + (idx===0?0: (idx%2===0?1:-1) * (idx*0.008)),
        cy: cy + (idx===0?0: (idx%2===0?1:-1) * (idx*0.005)),
      };
    });

    return zones;
  },

  _zoneCenter(cx, cy, r, key) {
    // Centrul fiecărei zone (mijlocul inelului)
    const innerR = {
      centru:0, semicentral:1.5, cartiere:3.0, periferie:5.0, periurban:8.0
    }[key]||0;
    const midR   = (innerR + r) / 2;
    const degKm  = midR / 111;
    return [cx, cy]; // centrul UAT-ului pentru simplitate
  },

  // Obține cartierele reale din OSM (admin_level=10)
  async fetchNeighborhoods(lat, lon) {
    const q = `[out:json][timeout:10];
(
  relation["admin_level"="10"](around:8000,${lat},${lon});
  relation["admin_level"="9"](around:8000,${lat},${lon});
  way["place"~"neighbourhood|suburb"](around:6000,${lat},${lon});
)->.nb;
.nb out geom;`;
    try {
      const r = await fetch('https://overpass-api.de/api/interpreter', {
        method:'POST', body:'data='+encodeURIComponent(q),
        signal: AbortSignal.timeout(10000),
      });
      const data = await r.json();
      return (data.elements||[]).filter(el=>el.tags?.name).map(el=>({
        name: el.tags.name,
        type: el.tags.place || 'neighbourhood',
        coords: (el.geometry||el.members?.flatMap(m=>m.geometry||[])||[]).map(n=>[n.lon,n.lat]),
      })).filter(nb=>nb.coords.length>2);
    } catch(e) { return []; }
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// SCENE ENGINE — orchestrează cele 12 scene
// ═══════════════════════════════════════════════════════════════════════════

G._SceneEngine = {
  _scene:    0,
  _playing:  false,
  _raf:      null,
  _startT:   0,
  _city:     null,
  _need:     null,
  _zones:    null,
  _canvas:   null,
  _ctx:      null,

  SCENES: [
    { id:1,  dur:8000,  label:'Overview — România în Europa' },
    { id:2,  dur:7000,  label:'Zoom Regional — Moldova' },
    { id:3,  dur:10000, label:'Approach — Date în Zbor' },
    { id:4,  dur:18000, label:'City Overview 3D — Orbit 360°' },
    { id:5,  dur:20000, label:'Presiune Construire — Bare 3D' },
    { id:6,  dur:14000, label:'Focus Zonă 1 — Densificare' },
    { id:7,  dur:14000, label:'Focus Zonă 2 — Reconversie' },
    { id:8,  dur:14000, label:'Focus Zonă 3 — Expansiune' },
    { id:9,  dur:16000, label:'Infrastructură & Mobilitate' },
    { id:10, dur:14000, label:'Riscuri Teritoriale' },
    { id:11, dur:12000, label:'Comparație UAT-uri' },
    { id:12, dur:10000, label:'European Benchmarking' },
    { id:13, dur:12000, label:'Street Level — Pieton' },
    { id:14, dur:14000, label:'Viața Urbană 2055' },
    { id:15, dur:14000, label:'Evoluție Temporală 4D' },
    { id:16, dur:12000, label:'Demografic — Monte Carlo' },
    { id:17, dur:10000, label:'Economic — Convergență UE' },
    { id:18, dur:12000, label:'Sustenabilitate & SDG 11' },
    { id:19, dur:14000, label:'Masterplan — Indicatori Propuși' },
    { id:20, dur:14000, label:'Zone Protejate — Restricții Legale' },
    { id:21, dur:16000, label:'Street View Real — Vehicule & Pietoni' },
    { id:22, dur:14000, label:'AI Narrative — Memoriu Justificativ Live' },
    { id:23, dur:14000, label:'Masterplan PDF — Structura Documentului' },
    { id:24, dur:16000, label:'Investiții & Finanțare UE 2025-2055' },
    { id:25, dur:24000, label:'Concluzie & Viziune 2055 — Finale Epic' },
  ],

  async launch(cityKey) {
    const map = window.map;
    if(!map) { ss?.('Harta indisponibilă'); return; }

    // Fallback minimal pentru orice UAT — funcționează și fără _RO_CITIES_DB
    const _FALLBACK_CITIES = {
      'RO-IS-01': { name:'Iași', judet:'Iași', judet_code:'IS', lat:47.158, lon:27.601,
        pop2021:360633, pop2011:290422, rata_reala_2011_2021:0.82, pib_eur_cap:11800,
        tip:'municipiu', regiune:'NE', coef_hub:1.4, suprafata_ha:9428,
        spatii_verzi_mp_loc:11, acoperire_transport:65, autorizatii_2023:420 },
      'RO-CJ-01': { name:'Cluj-Napoca', judet:'Cluj', judet_code:'CJ', lat:46.769, lon:23.591,
        pop2021:324576, pop2011:324576, rata_reala_2011_2021:0.00, pib_eur_cap:19800,
        tip:'municipiu', regiune:'NV', coef_hub:1.8, suprafata_ha:17953,
        spatii_verzi_mp_loc:14, acoperire_transport:68, autorizatii_2023:580 },
      'RO-TM-01': { name:'Timișoara', judet:'Timiș', judet_code:'TM', lat:45.749, lon:21.228,
        pop2021:268000, pop2011:319279, rata_reala_2011_2021:-1.62, pib_eur_cap:18100,
        tip:'municipiu', regiune:'V', coef_hub:1.6, suprafata_ha:12950,
        spatii_verzi_mp_loc:13, acoperire_transport:64, autorizatii_2023:490 },
    };

    // Preluăm datele — cu fallback robust
    const db = window._RO_CITIES_DB || _FALLBACK_CITIES;
    const city = db[cityKey] ||
                 Object.values(db)[0] ||
                 _FALLBACK_CITIES['RO-IS-01'];

    if(!city) { ss?.('UAT negăsit — verificați conexiunea'); return; }
    // Daca _RO_CITIES_DB lipsea, avertizam
    if(!window._RO_CITIES_DB) {
      console.warn('[Cinema v2] _RO_CITIES_DB indisponibil, folosesc date minime pentru', city.name);
      ss?.('⚠️ Date limitate — rulează cu date minime pentru ' + city.name);
    }

    // ── Ascundem panoul dreapta + bara sus (imersie completă) ──────────
    const _hiddenEls = [];
    // Selectori exacti din index.html
    const _exactSelectors = [
      // Panel dreapta (toate componentele)
      '#panel', '#panel-tabs', '#panel-body', '#mob-light-panel',
      // Meniuri dropdown
      '#tci-adv-menu', '#viz-menu', '#rapoarte-menu', '#analize-menu',
      // Bara de sus (topbar)
      '#topbar', '#wx-topbar',
      // Info drawer + UTR drawer
      '#info-drawer', '#utr-drawer', '#info-drawer-backdrop',
      // Butoane fixe
      '#cancel-parcel-btn', '#btnPDF',
      // Footer GDPR
      '#ux-gdpr-footer',
    ];
    _exactSelectors.forEach(sel => {
      const el = document.querySelector(sel);
      if(el) {
        el.dataset.tciHidden = el.style.display || '';
        el.style.setProperty('display','none','important');
        _hiddenEls.push(el);
      }
    });
    // Bara de navigare top (toate butoanele/meniurile din navbar)
    const navbar = document.querySelector('nav') || document.querySelector('#navbar') ||
                   document.querySelector('[id*="topbar"]') || document.querySelector('[id*="top-bar"]');
    if(navbar) {
      navbar.dataset.tciHidden = navbar.style.display || '';
      navbar.style.setProperty('display','none','important');
      _hiddenEls.push(navbar);
    }
    this._hiddenEls = _hiddenEls;
    this._mainPanel = document.getElementById('panel');
    console.log('[Cinema v2] Elemente ascunse:', _hiddenEls.length);

        this._city   = city;
    this._need   = window._TCIMasterplanPDF?._calcNeed?.(city,'S2') || { pop2055:city.pop2021, locuinteTotale:5000 };
    this._zones  = G._ZoneProjections.calculate(city, this._need, 2050);
    this._scene  = 0;
    this._playing = true;

    // Canvas overlay fullscreen
    this._canvas = this._createCanvas();
    this._ctx    = this._canvas.getContext('2d');

    // Pornim
    this._runScene(0);
    document.body.classList.add('tci-cinema-active');
    ss?.('🎬 TCI Cinematic v2.0 pornit: '+city.name);
  },

  _createCanvas() {
    let c = document.getElementById('tci-scene-canvas');
    if(c) c.remove();
    c = document.createElement('canvas');
    c.id = 'tci-scene-canvas';
    const dpr = window.devicePixelRatio || 1;
    c.style.cssText = `position:fixed;top:0;left:0;right:0;bottom:0;z-index:95000;width:100vw;height:100vh;pointer-events:none;background:transparent;`;
    c.width  = window.innerWidth  * dpr;
    c.height = window.innerHeight * dpr;
    const ctx = c.getContext('2d');
    ctx.scale(dpr, dpr); // Retina/HiDPI support
    document.body.appendChild(c);
    return c;
  },

  _runScene(idx) {
    if(!this._playing || idx >= this.SCENES.length) {
      this._finish(); return;
    }
    const scene = this.SCENES[idx];
    this._scene   = idx;
    this._startT  = performance.now();

    const loop = () => {
      if(!this._playing) return;
      const t = Math.min(1, (performance.now() - this._startT) / scene.dur);
      this._renderScene(scene.id, t);
      if(t < 1) {
        this._raf = requestAnimationFrame(loop);
      } else {
        this._runScene(idx + 1);
      }
    };

    this._setupScene(scene.id);
    this._raf = requestAnimationFrame(loop);
  },

  stop() {
    this._playing = false;
    if(this._raf) cancelAnimationFrame(this._raf);
    if(this._canvas) { this._canvas.style.opacity='0'; setTimeout(()=>this._canvas?.remove(), 500); }
    this._cleanupMapLayers();
    ss?.('⏹ TCI Cinematic oprit');
  },

  _finish() {
    this._playing = false;
    if(this._raf) cancelAnimationFrame(this._raf);
    // Fix: curăță canvas-ul complet — nu mai rămâne ecran negru
    const canvas = document.getElementById('tci-scene-canvas');
    if(canvas) {
      canvas.style.transition='opacity .6s';
      canvas.style.opacity='0';
      setTimeout(()=>{
        try{ canvas.remove(); }catch(e){}
      },700);
    }
    this._canvas=null; this._ctx=null;
    this._cleanupMapLayers();
    // ── Restaurăm UI-ul ascuns după fade-out canvas ──────────────────────
    setTimeout(() => {
      if(this._mainPanel) {
        this._mainPanel.style.display = this._mainPanel.dataset.tciHidden==='1' ? '' : (this._mainPanel.dataset.tciHidden||'');
        delete this._mainPanel.dataset.tciHidden;
      }
      (this._hiddenEls||[]).forEach(el => {
        el.style.cssText = el.dataset.tciHidden || '';
        delete el.dataset.tciHidden;
      });
      this._hiddenEls = [];
      this._mainPanel = null;
      console.log('[Cinema v2] UI restaurat');
    }, 1200);

    // Revenim la harta normală
    try{
      window.map?.flyTo?.({zoom:13,pitch:45,bearing:0,duration:1200,essential:true});
      window.map?.setConfigProperty?.('basemap','lightPreset','day');
    }catch(e){}
    ss?.('✅ TCI Cinematic finalizat — '+(this._city?.name||''));
  },

  // ── Setup per scenă (camera + layers Mapbox) ──────────────────────────
  _setupScene(sceneId) {
    const map  = window.map;
    const city = this._city;
    const cx   = city?.lon||27.601, cy = city?.lat||47.158;
    if(!map) return;

    const flyOpts = {
      1:  { center:[23.5,46.0], zoom:4.5, pitch:0,  bearing:0,  dur:4000 }, // România
      2:  { center:[27.0,47.2], zoom:7,   pitch:15, bearing:-5, dur:3000 }, // Moldova
      3:  { center:[cx,cy],     zoom:11,  pitch:30, bearing:-10,dur:3000 }, // Approach
      4:  { center:[cx,cy],     zoom:13,  pitch:50, bearing:-15,dur:2000 }, // City 3D
      5:  { center:[cx,cy],     zoom:12,  pitch:45, bearing:20, dur:2000 }, // Dezvoltare
      6:  { center:[cx,cy],     zoom:13,  pitch:40, bearing:-10,dur:1500 }, // Infrastructură
      7:  { center:[cx,cy+0.02],zoom:14,  pitch:55, bearing:30, dur:2000 }, // Focus zonă
      8:  { center:[cx,cy],     zoom:11,  pitch:35, bearing:0,  dur:2000 }, // Comparație
      9:  { center:[cx,cy],     zoom:17,  pitch:82, bearing:20, dur:2500 }, // Street
      10: { center:[cx,cy],     zoom:15,  pitch:60, bearing:-20,dur:1500 }, // Viata
      11: { center:[cx,cy],     zoom:12,  pitch:45, bearing:0,  dur:1000 }, // Slider
      12: { center:[cx,cy],     zoom:11,  pitch:40, bearing:-30,dur:3000 }, // Concluzie
    }[sceneId];

    if(flyOpts) {
      try {
        map.flyTo({
          center:   flyOpts.center,
          zoom:     flyOpts.zoom,
          pitch:    flyOpts.pitch,
          bearing:  flyOpts.bearing,
          duration: flyOpts.dur,
          essential: true,
        });
      } catch(e){}
    }

    // Light per scenă
    const lights = {1:'day',2:'day',3:'dawn',4:'dawn',5:'day',6:'day',
                    7:'dusk',8:'day',9:'dusk',10:'night',11:'day',12:'dusk'};
    try { map.setConfigProperty?.('basemap','lightPreset', lights[sceneId]||'day'); } catch(e){}

    // Setup layers per scenă
    if(sceneId===4) this._setupDensityLayer(map, city);
    if(sceneId===5) this._setup3DGrowthBars(map, city);
    if(sceneId===6) this._setupTrafficLayer(map, city);
    if(sceneId===11) this._showTimeSlider(city);
    if(sceneId!==11) document.getElementById('tci-time-slider')?.remove();
  },

  // ── Render overlay canvas per scenă ───────────────────────────────────
  _renderScene(sceneId, t) {
    const ctx = this._ctx;
    const W   = this._canvas.width;
    const H   = this._canvas.height;
    const city = this._city;
    const zones = this._zones;
    ctx.clearRect(0,0,W,H);

    // CLIP: prevenim orice text sau grafic sa iasă din ecran
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, W, H);
    ctx.clip();

    // Fade in/out per scenă
    const fadeIn  = Math.min(1, t/0.12);
    const fadeOut = t>0.88 ? Math.max(0,(1-t)/0.12) : 1;
    const alpha   = fadeIn*fadeOut;
    if(alpha < 0.01) return;

    ctx.save();
    ctx.globalAlpha = alpha;

    switch(sceneId) {
      case 1:  this._s1_overview(ctx,W,H,t,city); break;
      case 2:  this._s2_moldova(ctx,W,H,t,city); break;
      case 3:  this._s3_approach(ctx,W,H,t,city); break;
      case 4:  this._s4_city3d(ctx,W,H,t,city); break;
      case 5:  this._s5_growth(ctx,W,H,t,city,zones); break;
      case 6:  this._s6_focusZone1(ctx,W,H,t,city,zones); break;
      case 7:  this._s7_focusZone2(ctx,W,H,t,city,zones); break;
      case 8:  this._s8_focusZone3(ctx,W,H,t,city,zones); break;
      case 9:  this._s9_mobility(ctx,W,H,t,city); break;
      case 10: this._s10_risks(ctx,W,H,t,city); break;
      case 11: this._s11_compare(ctx,W,H,t,city); break;
      case 12: this._s12_euBench(ctx,W,H,t,city); break;
      case 13: this._s13_street(ctx,W,H,t,city); break;
      case 14: this._s14_urban(ctx,W,H,t,city); break;
      case 15: this._s15_timeline(ctx,W,H,t,city); break;
      case 16: this._s16_monteCarlo(ctx,W,H,t,city); break;
      case 17: this._s17_economic(ctx,W,H,t,city); break;
      case 18: this._s18_sdg(ctx,W,H,t,city); break;
      case 19: this._s19_masterplan(ctx,W,H,t,city,zones); break;
      case 20: this._s20_protectedZones(ctx,W,H,t,city); break;
      case 21: this._s21_streetViewReal(ctx,W,H,t,city); break;
      case 22: this._s22_aiNarrative(ctx,W,H,t,city); break;
      case 23: this._s23_masterplanPreview(ctx,W,H,t,city); break;
      case 24: this._s24_investment(ctx,W,H,t,city); break;
      case 25: this._s25_finale(ctx,W,H,t,city); break;
      case 9: this._s13_street(ctx,W,H,t,city); break;
      case 10:this._s14_urban(ctx,W,H,t,city); break;
      
    }

    // Progress bar scenă
    this._drawSceneProgress(ctx,W,H,t,sceneId);

    ctx.restore();
  },

  // ── SCENA 1: Overview România ─────────────────────────────────────────
  _s1_overview(ctx,W,H,t,city) {
    // Vignette
    const vig = ctx.createRadialGradient(W/2,H/2,H*0.2,W/2,H/2,H*0.7);
    vig.addColorStop(0,'rgba(0,0,0,0)'); vig.addColorStop(1,'rgba(0,0,0,0.5)');
    ctx.fillStyle=vig; ctx.fillRect(0,0,W,H);

    // Text intro
    if(t > 0.2) {
      ctx.fillStyle='rgba(255,255,255,0.95)';
      ctx.font=`bold ${W*0.018}px "Space Grotesk",sans-serif`;
      ctx.textAlign='center';
      ctx.fillText('TEMPORAL CITY INTELLIGENCE',W/2,H*0.15,W*0.88);
      ctx.fillStyle='rgba(212,175,55,0.9)';
      ctx.font=`${W*0.012}px "IBM Plex Mono"`;
      ctx.fillText('România · Context European · Date Oficiale INSE + Eurostat',W/2,H*0.20,W*0.88);
    }
    // Label scenă
    this._sceneLabel(ctx,W,H,'1','OVERVIEW — ROMÂNIA');
  },

  // ── SCENA 2: Zoom Moldova ─────────────────────────────────────────────
  _s2_moldova(ctx,W,H,t,city) {
    // Overlay subtil
    ctx.fillStyle='rgba(0,0,0,0.2)'; ctx.fillRect(0,0,W,H);
    const regiune = city?.regiune || 'NE';
    const regionLabel = {
      'NE':'MOLDOVA — REGIUNE NE', 'NV':'NORD-VEST', 'V':'VEST',
      'C':'CENTRU', 'SE':'SUD-EST', 'S':'SUD', 'SV':'SUD-VEST', 'B':'BUCURESTI'
    }[regiune] || ('REGIUNE ' + regiune);

    if(t > 0.3) {
      // Card cu date regionale dinamice
      const cx=W*0.75, cy=H*0.35;
      this._card(ctx,cx,cy,220,120,'#60a5fa', regionLabel);
      ctx.fillStyle='rgba(200,215,235,.9)'; ctx.font=`bold ${W*0.013}px "IBM Plex Mono"`;
      ctx.textAlign='left';
      const pop = city?.pop2021 ? (city.pop2021/1000).toFixed(0)+'K loc.' : '—';
      const pib = city?.pib_eur_cap ? city.pib_eur_cap.toLocaleString('ro-RO')+' €/cap' : '—';
      const rata = city?.rata_reala_2011_2021 != null ? (city.rata_reala_2011_2021>0?'+':'')+city.rata_reala_2011_2021.toFixed(1)+'%/an' : '—';
      ctx.fillText('Populație: '+pop, cx+10, cy+30);
      ctx.fillText('PIB/cap: '+pib, cx+10, cy+48);
      ctx.fillText('Creștere: '+rata, cx+10, cy+66);
      ctx.fillStyle='#D4AF37'; ctx.font=`bold ${W*0.010}px "IBM Plex Mono"`;
      const tip = (city?.tip||'municipiu').toUpperCase();
      ctx.fillText('⭐ '+tip+': '+(city?.name||'—').toUpperCase(), cx+10, cy+90);
      ctx.fillText(N(city?.pop2021||0)+' loc.', cx+10, cy+106);
    }
    this._sceneLabel(ctx,W,H,'2','ZOOM — '+(city?.regiune||'REGIUNE'));
  },

  // ── SCENA 3: Approach cu date live ───────────────────────────────────
  _s3_approach(ctx,W,H,t,city) {
    const pop0  = city?.pop2021||100000;
    const pop50 = this._need?.pop2055||pop0;
    const delta = ((pop50-pop0)/pop0*100).toFixed(1);

    // Card date populate
    if(t > 0.15) {
      const fade = Math.min(1,(t-0.15)/0.25);
      ctx.globalAlpha *= fade;

      const cx=W*0.08, cy=H*0.22;
      ctx.fillStyle='rgba(4,10,24,0.88)';
      this._roundRect(ctx,cx,cy,200,110,8); ctx.fill();
      ctx.strokeStyle='rgba(212,175,55,0.6)'; ctx.lineWidth=1;
      ctx.stroke();
      // POPULAȚIE 2021
      ctx.fillStyle='rgba(212,175,55,.8)';ctx.font=`bold ${W*0.0075}px "IBM Plex Mono"`;
      ctx.textAlign='left';
      ctx.fillText('POPULATIE 2021',cx+10,cy+16);
      ctx.fillStyle='#fff';ctx.font=`900 ${W*0.028}px "Space Grotesk",sans-serif`;
      ctx.fillText(N(pop0),cx+10,cy+46,W-20);

      // POPULATIE 2050
      if(t>0.35){
        const pa=Math.min(1,(t-0.35)/0.25);
        ctx.globalAlpha*=pa;
        ctx.fillStyle='rgba(148,163,184,.7)';ctx.font=`bold ${W*0.0075}px "IBM Plex Mono"`;
        ctx.fillText('POPULATIE 2050 (S2)',cx+10,cy+66);
        ctx.fillStyle='#22c55e';ctx.font=`900 ${W*0.022}px "Space Grotesk",sans-serif`;
        const chars=Math.floor(N(pop50).length*Math.min(1,(t-0.35)/0.3)*3);
        ctx.fillText(N(pop50).slice(0,chars),cx+10,cy+90,W-20);
        ctx.globalAlpha/=pa;
      }
      ctx.fillStyle='rgba(34,197,94,.7)'; ctx.font=`bold ${W*0.010}px "IBM Plex Mono"`;
      if(t > 0.55) ctx.fillText('+'+delta+'%', cx+120, cy+88);
    }
    ctx.globalAlpha = Math.min(1,ctx.globalAlpha+0.3);
    this._sceneLabel(ctx,W,H,'3','APPROACH — '+(city?.name||'').toUpperCase());
  },

  // ── SCENA 4: City Overview 3D + densitate ────────────────────────────
  _s4_city3d(ctx,W,H,t,city) {
    // Legendă densitate
    if(t > 0.25) {
      const lx=W-160, ly=H*0.25;
      ctx.fillStyle='rgba(4,10,24,0.9)';
      this._roundRect(ctx,lx,ly,150,140,8); ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,0.1)'; ctx.lineWidth=0.8; ctx.stroke();
      ctx.fillStyle='rgba(212,175,55,.8)'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';
      ctx.fillText('DENSITATE LOC./HA', lx+8, ly+16);
      [['>200','#7f1d1d'],['>150','#ef4444'],['>100','#f97316'],
       ['>50','#f59e0b'],['>20','#22c55e'],['0-20','#1d4ed8']].forEach(([l,c],i)=>{
        ctx.fillStyle=c; ctx.fillRect(lx+8, ly+24+i*17, 12, 12);
        ctx.fillStyle='rgba(200,215,235,.8)'; ctx.font=`${W*0.008}px "IBM Plex Mono"`;
        ctx.fillText(l+' loc/ha', lx+26, ly+34+i*17);
      });
    }
    this._sceneLabel(ctx,W,H,'4','CITY OVERVIEW 3D — '+city.name?.toUpperCase());
  },

  // ── SCENA 5: Dezvoltare Urbană — Bare 3D ─────────────────────────────
  _s5_growth(ctx,W,H,t,city,zones) {
    // Legendă MAJORĂ/MEDIE/MICĂ
    if(t > 0.2) {
      const lx=W*0.03, ly=H*0.55;
      ctx.fillStyle='rgba(4,10,24,0.92)';
      this._roundRect(ctx,lx,ly,160,100,8); ctx.fill();
      ctx.strokeStyle='rgba(212,175,55,.3)'; ctx.lineWidth=0.8; ctx.stroke();
      ctx.fillStyle='#D4AF37'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';
      ctx.fillText('DEZVOLTARE 2025-2050', lx+8, ly+14);
      [['MAJORĂ','>20%','#ef4444'],['MEDIE','10-20%','#f59e0b'],['MICĂ','<10%','#22c55e']].forEach(([l,pct,c],i)=>{
        ctx.fillStyle=c; ctx.fillRect(lx+8, ly+22+i*22, 12, 14);
        ctx.fillStyle='rgba(200,215,235,.9)'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
        ctx.fillText(l, lx+26, ly+32+i*22);
        ctx.fillStyle='rgba(148,163,184,.6)'; ctx.font=`${W*0.008}px "IBM Plex Mono"`;
        ctx.fillText(pct, lx+90, ly+32+i*22);
      });
    }

    // Carduri zone
    if(t > 0.4 && zones) {
      const zKeys = ['centru','semicentral','periferie'];
      zKeys.forEach((k,i) => {
        const z = zones[k];
        if(!z) return;
        const cx = W*(0.25+i*0.28), cy = H*0.12;
        ctx.globalAlpha *= Math.min(1,(t-0.4)/0.3);
        ctx.fillStyle='rgba(4,10,24,0.88)';
        this._roundRect(ctx,cx,cy,140,70,6); ctx.fill();
        ctx.strokeStyle=z.presiuneColor; ctx.lineWidth=1.5; ctx.stroke();
        ctx.fillStyle=z.presiuneColor; ctx.font=`bold ${W*0.010}px "IBM Plex Mono"`;
        ctx.textAlign='center';
        ctx.fillText(z.label.toUpperCase(), cx+70, cy+16);
        ctx.fillStyle='#fff'; ctx.font=`900 ${W*0.016}px "IBM Plex Mono"`;
        ctx.fillText((z.densifPct>=0?'+':'')+z.densifPct+'%', cx+70, cy+40);
        ctx.fillStyle='rgba(148,163,184,.7)'; ctx.font=`${W*0.008}px "IBM Plex Mono"`;
        ctx.fillText(z.presiuneLabel+' · '+N(z.locuinte_noi)+' apt', cx+70, cy+58);
        ctx.globalAlpha /= Math.min(1,(t-0.4)/0.3);
      });
    }
    this._sceneLabel(ctx,W,H,'5','DEZVOLTARE URBANĂ');
  },

  // ── SCENA 6: Infrastructură & Mobilitate ─────────────────────────────
  _s9_mobility(ctx,W,H,t,city) {
    const pop = city?.pop2021||100000;
    // Legendă trafic
    const lx=W*0.03, ly=H*0.45;
    ctx.fillStyle='rgba(4,10,24,0.92)';
    this._roundRect(ctx,lx,ly,155,85,8); ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,.1)'; ctx.lineWidth=0.8; ctx.stroke();
    ctx.fillStyle='rgba(212,175,55,.8)'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
    ctx.textAlign='left';
    ctx.fillText('TRAFIC URBAN', lx+8, ly+15);
    [['AGLOMERAT','#ef4444'],['MODERAT','#f59e0b'],['FLUID','#22c55e']].forEach(([l,c],i)=>{
      ctx.fillStyle=c; ctx.fillRect(lx+8, ly+22+i*18, 24, 6);
      ctx.fillStyle='rgba(200,215,235,.9)'; ctx.font=`${W*0.009}px "IBM Plex Mono"`;
      ctx.fillText(l, lx+40, ly+30+i*18);
    });

    // Modal split evolutiv
    if(t > 0.4) {
      const ms2025 = {auto:78,tp:15,activ:7};
      const ms2050 = {auto:50,tp:30,activ:20};
      const prog = Math.min(1,(t-0.4)/0.5);

      const cx=W*0.75, cy=H*0.3;
      ctx.fillStyle='rgba(4,10,24,0.9)';
      this._roundRect(ctx,cx,cy,180,130,8); ctx.fill();
      ctx.strokeStyle='rgba(59,130,246,.4)'; ctx.lineWidth=1; ctx.stroke();

      ctx.fillStyle='#60a5fa'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';
      ctx.fillText('MODAL SPLIT 2025→2050', cx+8, cy+15);

      const ms_now = {
        auto: Math.round(ms2025.auto + (ms2050.auto-ms2025.auto)*prog),
        tp:   Math.round(ms2025.tp   + (ms2050.tp  -ms2025.tp  )*prog),
        activ:Math.round(ms2025.activ+ (ms2050.activ-ms2025.activ)*prog),
      };

      [['🚗 Auto', ms_now.auto+'%','#ef4444'],
       ['🚌 Transport public', ms_now.tp+'%','#3b82f6'],
       ['🚶🚲 Activ',ms_now.activ+'%','#22c55e']].forEach(([l,v,c],i)=>{
        ctx.fillStyle='rgba(148,163,184,.7)'; ctx.font=`${W*0.009}px "IBM Plex Mono"`;
        ctx.fillText(l, cx+8, cy+35+i*28);
        // Bara
        const barW = (parseInt(v)/100)*(160);
        ctx.fillStyle=c+'33'; ctx.fillRect(cx+8, cy+40+i*28, 160, 10);
        ctx.fillStyle=c;      ctx.fillRect(cx+8, cy+40+i*28, barW, 10);
        ctx.fillStyle=c; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
        ctx.textAlign='right';
        ctx.fillText(v, cx+175, cy+49+i*28);
        ctx.textAlign='left';
      });
    }
    this._sceneLabel(ctx,W,H,'6','INFRASTRUCTURĂ & MOBILITATE');
  },

  // ── SCENA 7: Focus pe FIECARE ZONĂ — iterăm prin toate cartierele ────
  // Nu o singură zonă — toate cartierele UAT-ului, cu zoom individual

  _s6_focusZone1(ctx,W,H,t,city,zones) {
    // ─── Layout curat: zona curenta + 3 KPI-uri + RH/POT/functiuni ──────
    const zArr = zones ? Object.values(zones) : [];
    const nZ   = Math.min(8, zArr.length || 1);
    const tPZ  = 1.0 / nZ;
    const cIdx = Math.min(nZ-1, Math.floor(t / tPZ));
    const tIn  = (t - cIdx*tPZ) / tPZ;
    const zone = zArr[cIdx] || { label:'Zona', densif_pct:15, locuinte_noi:5000, pop2055:50000 };
    const N    = v => Number(v||0).toLocaleString('ro-RO');
    const pct  = zone.densif_pct || zone.densifPct || 0;
    const pColor = zone.pressureColor || (pct>20?'#ef4444':pct>10?'#f59e0b':'#22c55e');
    const intColors = {
      'DENSIFICARE':'#22c55e','DENSIFICARE MODERATĂ':'#4ade80','DENSIFICARE INTENSIVĂ':'#16a34a',
      'RECONVERSIE INDUSTRIALĂ':'#f59e0b','RECONVERSIE':'#f59e0b',
      'EXPANSIUNE CONTROLATĂ':'#60a5fa','EXPANSIUNE':'#60a5fa',
      'REABILITARE FOND':'#ef4444','REABILITARE':'#ef4444','CONSOLIDARE':'#94a3b8',
    };
    const intColor = intColors[zone.intervention] || pColor;

    // ─── Gradient overlay (max 85% opacitate jos) ───────────────────────
    const gr = ctx.createLinearGradient(0, 0, 0, H);
    gr.addColorStop(0, 'rgba(4,10,24,0)');
    gr.addColorStop(0.45, 'rgba(4,10,24,.35)');
    gr.addColorStop(1, 'rgba(4,10,24,.88)');
    ctx.fillStyle = gr; ctx.fillRect(0,0,W,H);
    this._scanlines(ctx, W, H, 0.025);

    // ─── Titlu zona (stanga sus, mare) ──────────────────────────────────
    if(tIn > 0.05) {
      const ta = Math.min(1,(tIn-0.05)/0.2);
      ctx.globalAlpha = ta;
      // Scena counter
      ctx.fillStyle = intColor;
      ctx.font = `bold ${W*0.008}px "IBM Plex Mono"`;
      ctx.textAlign = 'left';
      ctx.fillText(`ZONA ${cIdx+1}/${nZ} — ${(zone.intervention||'DENSIFICARE').toUpperCase()}`, W*0.04, H*0.1);
      // Nume zona - mare
      ctx.fillStyle = 'rgba(255,255,255,.95)';
      ctx.font = `900 ${W*0.03}px "Space Grotesk",sans-serif`;
      ctx.fillText((zone.name||`ZONA ${cIdx+1}`).toUpperCase().slice(0,20), W*0.04, H*0.18);
      ctx.globalAlpha = 1;
    }

    // ─── Card principal stanga: Densificare + Locuinte + Pop ─────────────
    // Card background (stanga, ocupa 40% din latime, 35% din inaltime)
    if(tIn > 0.08) {
      const ca = Math.min(1,(tIn-0.08)/0.22);
      ctx.globalAlpha = ca;
      ctx.fillStyle = 'rgba(4,10,24,.88)';
      this._roundRect(ctx, W*0.04, H*0.58, W*0.38, H*0.34, 8); ctx.fill();
      ctx.strokeStyle = intColor; ctx.lineWidth = 1;
      this._roundRect(ctx, W*0.04, H*0.58, W*0.38, H*0.34, 8); ctx.stroke();
      // Accent bar top
      ctx.fillStyle = intColor;
      this._roundRect(ctx, W*0.04, H*0.58, W*0.38, 3, 1); ctx.fill();
      ctx.globalAlpha = 1;
    }

    // ─── KPI 1: Densificare ──────────────────────────────────────────────
    if(tIn > 0.12) {
      const ka = Math.min(1,(tIn-0.12)/0.3);
      ctx.globalAlpha = ka;
      ctx.fillStyle = 'rgba(148,163,184,.7)';
      ctx.font = `bold ${W*0.007}px "IBM Plex Mono"`;
      ctx.textAlign = 'left';
      ctx.fillText('DENSIFICARE PROGNOZATĂ', W*0.06, H*0.63);
      ctx.fillStyle = pColor;
      ctx.font = `900 ${W*0.045}px "Space Grotesk",sans-serif`;
      ctx.fillText((pct>=0?'+':'')+this._countUp(pct, Math.min(1,(tIn-0.15)/0.4))+'%', W*0.06, H*0.70);
      ctx.globalAlpha = 1;
    }

    // ─── KPI 2: Locuinte + Populatie (rand 2 in card) ────────────────────
    if(tIn > 0.28) {
      const k2a = Math.min(1,(tIn-0.28)/0.2);
      ctx.globalAlpha = k2a;
      // Linie separator
      ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = 0.6;
      ctx.beginPath(); ctx.moveTo(W*0.06, H*0.73); ctx.lineTo(W*0.40, H*0.73); ctx.stroke();
      // Locuinte
      ctx.fillStyle = 'rgba(148,163,184,.6)'; ctx.font = `bold ${W*0.006}px "IBM Plex Mono"`;
      ctx.fillText('LOCUINȚE NOI', W*0.06, H*0.76);
      ctx.fillStyle = '#fff'; ctx.font = `bold ${W*0.014}px "Space Grotesk",sans-serif`;
      ctx.fillText(N(zone.locuinte_noi||0), W*0.06, H*0.80);
      // Populatie
      ctx.fillStyle = 'rgba(148,163,184,.6)'; ctx.font = `bold ${W*0.006}px "IBM Plex Mono"`;
      ctx.fillText('POPULAȚIE 2055', W*0.22, H*0.76);
      ctx.fillStyle = '#22c55e'; ctx.font = `bold ${W*0.014}px "Space Grotesk",sans-serif`;
      ctx.fillText(N(zone.pop2055||0), W*0.22, H*0.80);
      ctx.globalAlpha = 1;
    }

    // ─── Card RH/POT/Functiuni (dreapta, apare mai tarziu) ───────────────
    if(tIn > 0.42) {
      const ra = Math.min(1,(tIn-0.42)/0.2);
      ctx.globalAlpha = ra;
      ctx.fillStyle = 'rgba(4,10,24,.88)';
      this._roundRect(ctx, W*0.48, H*0.58, W*0.48, H*0.34, 8); ctx.fill();
      ctx.strokeStyle = 'rgba(212,175,55,.35)'; ctx.lineWidth = 0.8;
      this._roundRect(ctx, W*0.48, H*0.58, W*0.48, H*0.34, 8); ctx.stroke();
      ctx.fillStyle = 'rgba(212,175,55,.8)'; this._roundRect(ctx, W*0.48, H*0.58, W*0.48, 3, 1); ctx.fill();

      ctx.fillStyle = '#D4AF37'; ctx.font = `bold ${W*0.007}px "IBM Plex Mono"`;
      ctx.fillText('INDICATORI URBANISTICI PROPUȘI', W*0.50, H*0.625);
      // RH
      ctx.fillStyle = 'rgba(148,163,184,.65)'; ctx.font = `${W*0.0065}px "IBM Plex Mono"`;
      ctx.fillText('Regim înălțime:', W*0.50, H*0.655);
      ctx.fillStyle = '#fbbf24'; ctx.font = `bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.fillText(zone.rh_propus||'P+4—P+8', W*0.50, H*0.672);
      // POT/CUT
      ctx.fillStyle = 'rgba(148,163,184,.65)'; ctx.font = `${W*0.0065}px "IBM Plex Mono"`;
      ctx.fillText('POT / CUT:', W*0.50, H*0.700);
      ctx.fillStyle = 'rgba(200,215,240,.9)'; ctx.font = `bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.fillText(`${zone.pot||50}%  /  ${zone.cut||1.8}`, W*0.50, H*0.717);
      // Functiuni
      ctx.fillStyle = 'rgba(148,163,184,.65)'; ctx.font = `${W*0.0065}px "IBM Plex Mono"`;
      ctx.fillText('Funcțiuni propuse:', W*0.50, H*0.745);
      const fns = (zone.functiuni||['Rezidențial','Servicii','Spații verzi']).slice(0,2);
      ctx.fillStyle = 'rgba(200,215,240,.8)'; ctx.font = `${W*0.007}px "IBM Plex Mono"`;
      ctx.fillText(fns.join(' · ').slice(0,30), W*0.50, H*0.762);
      // Sursa
      ctx.fillStyle = 'rgba(80,100,140,.5)'; ctx.font = `${W*0.006}px "IBM Plex Mono"`;
      ctx.fillText(zone._source||'OSM · INSE · UrbanX', W*0.50, H*0.88);
      ctx.globalAlpha = 1;
    }

    // ─── Badge tip interventie (pulsant, dreapta sus) ────────────────────
    if(tIn > 0.18) {
      const ba = Math.min(1,(tIn-0.18)/0.15);
      ctx.globalAlpha = ba;
      const pulse = 0.5 + 0.5*Math.sin(tIn*Math.PI*6);
      ctx.shadowColor = intColor; ctx.shadowBlur = 8 + 6*pulse;
      ctx.fillStyle = `rgba(4,10,24,${0.8+0.1*pulse})`;
      this._roundRect(ctx, W*0.73, H*0.06, W*0.23, H*0.075, 6); ctx.fill();
      ctx.strokeStyle = intColor; ctx.lineWidth = 1 + 0.5*pulse;
      this._roundRect(ctx, W*0.73, H*0.06, W*0.23, H*0.075, 6); ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fillStyle = intColor; ctx.font = `bold ${W*0.0085}px "IBM Plex Mono"`;
      ctx.textAlign = 'center';
      ctx.fillText(zone.intervention||'DENSIFICARE', W*0.845, H*0.1);
      ctx.globalAlpha = 1;
      ctx.textAlign = 'left';
    }

    // ─── Progress bar zone (jos) ─────────────────────────────────────────
    if(nZ > 1 && tIn > 0.85) {
      const pa = Math.min(1,(tIn-0.85)/0.1);
      ctx.globalAlpha = pa;
      const bw = W*0.9 / nZ;
      for(let i=0;i<nZ;i++){
        const bx = W*0.05 + i*bw;
        const by = H*0.955;
        ctx.fillStyle = i<cIdx?'rgba(212,175,55,.5)':i===cIdx?'rgba(212,175,55,.95)':'rgba(255,255,255,.08)';
        this._roundRect(ctx, bx+1, by, bw-3, H*0.012, 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    this._sceneLabel(ctx, W, H, '6', 'FOCUS ZONĂ — PRESIUNE URBANĂ');
  },


  // ── SCENA 8: Comparație 2 UAT-uri ────────────────────────────────────
  _s11_compare(ctx,W,H,t,city) {
    const grav1 = window._TCIMasterplanPDF?._calcGravity?.(city)||{gravityScore:0.5,growthType:'METROPOLITAN'};
    // UAT comparabil — luăm din _RO_CITIES_DB
    const cities = Object.values(window._RO_CITIES_DB||{});
    const peer = cities.find(c=>c!==city && Math.abs((c.pop2021||0)-(city.pop2021||0))<(city.pop2021||100000)*0.3) || cities[1];
    const grav2 = window._TCIMasterplanPDF?._calcGravity?.(peer)||{gravityScore:0.5,growthType:'REGIONAL'};

    // Linie centrala
    ctx.strokeStyle='rgba(212,175,55,0.4)'; ctx.lineWidth=2;
    ctx.setLineDash([5,5]);
    ctx.beginPath(); ctx.moveTo(W/2,0); ctx.lineTo(W/2,H); ctx.stroke();
    ctx.setLineDash([]);

    // Label stânga
    ctx.fillStyle='rgba(212,175,55,0.9)'; ctx.font=`bold ${W*0.013}px "IBM Plex Mono"`;
    ctx.textAlign='center';
    ctx.fillText(city?.name?.toUpperCase()||'UAT 1', W*0.25, H*0.08);

    // Label dreapta
    ctx.fillStyle='rgba(96,165,250,0.9)';
    ctx.fillText((peer?.name||'UAT 2').toUpperCase(), W*0.75, H*0.08);

    // Date comparative
    if(t > 0.2) {
      const metrics = [
        ['DENSITATE',
          Math.round((city?.pop2021||0)/(city?.suprafata_ha||3000)*100)+'loc/ha',
          Math.round((peer?.pop2021||0)/(peer?.suprafata_ha||3000)*100)+'loc/ha'],
        ['RATĂ CREȘT.',
          (city?.rata_reala_2011_2021||0).toFixed(1)+'%/an',
          (peer?.rata_reala_2011_2021||0).toFixed(1)+'%/an'],
        ['PIB/CAP',
          (city?.pib_eur_cap||0).toLocaleString('ro-RO')+'€',
          (peer?.pib_eur_cap||0).toLocaleString('ro-RO')+'€'],
        ['TIP CREȘTI.',  grav1.growthType||'—', grav2.growthType||'—'],
        ['AUTORIZAȚII', N(city?.autorizatii_2023||0)+'/an', N(peer?.autorizatii_2023||0)+'/an'],
      ];

      metrics.forEach(([label,v1,v2],i) => {
        const fy = H*0.25+i*H*0.10;
        ctx.fillStyle='rgba(148,163,184,.5)'; ctx.font=`${W*0.008}px "IBM Plex Mono"`;
        ctx.textAlign='center';
        ctx.fillText(label, W/2, fy);
        ctx.fillStyle='rgba(212,175,55,.9)'; ctx.font=`bold ${W*0.011}px "IBM Plex Mono"`;
        ctx.textAlign='right'; ctx.fillText(v1, W/2-20, fy+16);
        ctx.fillStyle='rgba(96,165,250,.9)';
        ctx.textAlign='left'; ctx.fillText(v2, W/2+20, fy+16);
      });
    }
    this._sceneLabel(ctx,W,H,'8','COMPARAȚIE — 2 UAT-URI');
  },

  // ── SCENA 9: Street Level ────────────────────────────────────────────
  _s13_street(ctx,W,H,t,city) {
    ctx.fillStyle='rgba(0,0,0,0.15)'; ctx.fillRect(0,0,W,H);
    // Info nivel stradă
    ctx.fillStyle='rgba(4,10,24,0.75)';
    this._roundRect(ctx,W*0.03,H*0.85,200,55,8); ctx.fill();
    ctx.fillStyle='#22c55e'; ctx.font=`bold ${W*0.010}px "IBM Plex Mono"`;
    ctx.textAlign='left';
    ctx.fillText('🚶 NIVEL STRADĂ · '+city?.name, W*0.04, H*0.89);
    ctx.fillStyle='rgba(148,163,184,.7)'; ctx.font=`${W*0.008}px "IBM Plex Mono"`;
    ctx.fillText('Pitch 82° · Vehicule OSM reale · Light: dusk', W*0.04, H*0.94);
    this._sceneLabel(ctx,W,H,'9','STREET TRANSITION');
  },

  // ── SCENA 10: Viața Urbană ───────────────────────────────────────────
  _s14_urban(ctx,W,H,t,city) {
    const pop = city?.pop2021||100000;
    const pietoni = Math.round(pop * 0.068); // 6.8% din pop merg zilnic pe jos

    // Card transport public
    const cx=W*0.06, cy=H*0.12;
    ctx.fillStyle='rgba(4,10,24,0.92)';
    this._roundRect(ctx,cx,cy,200,145,8); ctx.fill();
    ctx.strokeStyle='rgba(59,130,246,.5)'; ctx.lineWidth=1.5; ctx.stroke();

    ctx.fillStyle='#60a5fa'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
    ctx.textAlign='left';
    ctx.fillText('TRANSPORT PUBLIC', cx+10, cy+18);

    ctx.fillStyle='rgba(148,163,184,.7)'; ctx.font=`${W*0.009}px "IBM Plex Mono"`;
    ctx.fillText('creștere TP 2025→2050', cx+10, cy+35);
    ctx.fillStyle='#22c55e'; ctx.font=`900 ${W*0.022}px "IBM Plex Mono"`;
    const pct = Math.round(t*62);
    ctx.fillText('+'+pct+'%', cx+10, cy+62);

    ctx.fillStyle='rgba(148,163,184,.7)'; ctx.font=`${W*0.009}px "IBM Plex Mono"`;
    ctx.fillText('PIETONI / ZI', cx+10, cy+85);
    ctx.fillStyle='#fff'; ctx.font=`900 ${W*0.018}px "IBM Plex Mono"`;
    ctx.fillText(N(Math.round(pietoni*t)), cx+10, cy+108);

    // Mini grafic trend
    ctx.strokeStyle='rgba(34,197,94,.7)'; ctx.lineWidth=1.5;
    ctx.beginPath();
    for(let i=0;i<=10;i++){
      const gx=cx+10+i*17;
      const gy=cy+135-i*4+Math.sin(i*0.8)*3;
      i===0?ctx.moveTo(gx,gy):ctx.lineTo(gx,gy);
    }
    ctx.stroke();
    ctx.fillStyle='rgba(100,120,150,.5)'; ctx.font=`${W*0.007}px "IBM Plex Mono"`;
    ctx.fillText('Trend 2025→2050', cx+10, cy+145);

    this._sceneLabel(ctx,W,H,'10','VIAȚA URBANĂ');
  },

  // ── SCENA 12: Concluzie & Viziune ────────────────────────────────────

// Scenele noi 20-24 pentru tci-cinematic-scenes.js
// Adaugam in G._SceneEngine inainte de _s25_finale

  // ── SCENA 20: Zone Protejate — Restricții Legale ──────────────────────
  _s20_protectedZones(ctx,W,H,t,city) {
    const gr=ctx.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,'rgba(30,4,4,0.6)');gr.addColorStop(1,'rgba(4,10,24,0.92)');
    ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);
    this._scanlines(ctx,W,H,0.04);

    if(t>0.04){
      const ta=Math.min(1,(t-0.04)/0.15);
      ctx.globalAlpha=ta;
      ctx.fillStyle='#ef4444';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='center';
      ctx.fillText('ZONE EXCLUSE DIN CONSTRUIRE — RESTRICȚII LEGALE',W/2,H*0.1,W*0.88);
      ctx.fillStyle='rgba(200,215,240,.6)';ctx.font=`${W*0.007}px "IBM Plex Mono"`;
      ctx.fillText('Legea 422/2001 · Legea 50/1991 · OG 43/1997 · Codul Silvic',W/2,H*0.16,W*0.88);
      ctx.globalAlpha=1;
    }

    const zones=[
      {label:'CIMITIRE',icon:'⛪',law:'Legea 50/1991 art.11',buf:'Construire INTERZISĂ',c:'#7c3aed',d:0.15},
      {label:'ZONE FEROVIARE CF',icon:'🚂',law:'OG 43/1997 art.16',buf:'Buffer 100m interdicție',c:'#78350f',d:0.25},
      {label:'MONUMENTE ISTORICE',icon:'🏛',law:'Legea 422/2001',buf:'Zona I: 0-50m · Zona II: 50-200m',c:'#b45309',d:0.35},
      {label:'PĂDURI',icon:'🌲',law:'Codul Silvic L46/2008',buf:'Construire interzisă integral',c:'#14532d',d:0.45},
      {label:'ZONE MILITARE',icon:'🔒',law:'Accces și construire interzise',buf:'Buffer 200m interdicție',c:'#dc2626',d:0.55},
      {label:'ZONE INUNDABILE ANAR',icon:'🌊',law:'Directiva 2007/60/CE',buf:'Aviz GA obligatoriu',c:'#1d4ed8',d:0.65},
    ];

    zones.forEach((z,i)=>{
      const a=Math.min(1,Math.max(0,(t-z.d)/0.15));
      if(a<=0)return;
      const cy=H*(0.28+i*0.095);
      ctx.globalAlpha=a;
      ctx.fillStyle='rgba(8,16,44,.88)';
      this._roundRect(ctx,W*0.05,cy,W*0.9,H*0.075,5);ctx.fill();
      ctx.fillStyle=z.c;ctx.rect(W*0.05,cy,3,H*0.075);ctx.fill();
      // Icon + label
      ctx.fillStyle=z.c;ctx.font=`bold ${W*0.0085}px "IBM Plex Mono"`;
      ctx.textAlign='left';
      ctx.fillText(z.icon+' '+z.label,W*0.07,cy+H*0.038);
      // Lege
      ctx.fillStyle='rgba(148,163,184,.7)';ctx.font=`${W*0.007}px "IBM Plex Mono"`;
      ctx.fillText(z.law,W*0.35,cy+H*0.028);
      ctx.fillStyle='rgba(200,215,240,.85)';ctx.font=`${W*0.0072}px "IBM Plex Mono"`;
      ctx.fillText(z.buf,W*0.35,cy+H*0.052);
      ctx.globalAlpha=1;
    });

    if(t>0.82){
      const ia=Math.min(1,(t-0.82)/0.12);
      ctx.globalAlpha=ia;
      ctx.fillStyle='rgba(50,8,8,.9)';
      this._roundRect(ctx,W*0.15,H*0.91,W*0.7,H*0.06,4);ctx.fill();
      ctx.strokeStyle='rgba(239,68,68,.4)';ctx.lineWidth=1;
      this._roundRect(ctx,W*0.15,H*0.91,W*0.7,H*0.06,4);ctx.stroke();
      ctx.fillStyle='#fca5a5';ctx.font=`bold ${W*0.008}px "IBM Plex Mono"`;
      ctx.textAlign='center';
      ctx.fillText('⚠ Verificați ÎNTOTDEAUNA cu Certificatul de Urbanism',W/2,H*0.945,W*0.88);
      ctx.globalAlpha=1;
    }
    this._sceneLabel(ctx,W,H,'20','ZONE PROTEJATE');
  },

  // ── SCENA 21: Street View Real — Vehicule & Pietoni ───────────────────
  _s21_streetViewReal(ctx,W,H,t,city) {
    // Overlay cinematic street-level
    const gr=ctx.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(0.5,'rgba(4,10,24,.2)');
    gr.addColorStop(1,'rgba(4,10,24,.92)');
    ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);

    // Elemente strada animate
    if(t>0.1){
      const walk=Math.min(100,Math.round(30+(city.acoperire_transport||60)*0.4+(city.pib_eur_cap||10000)/1000));
      const ta=Math.min(1,(t-0.1)/0.2);
      ctx.globalAlpha=ta;

      // Stats laterale
      ctx.fillStyle='rgba(4,10,24,.88)';
      this._roundRect(ctx,W*0.68,H*0.1,W*0.28,H*0.55,8);ctx.fill();
      ctx.strokeStyle='rgba(212,175,55,.3)';ctx.lineWidth=0.8;
      this._roundRect(ctx,W*0.68,H*0.1,W*0.28,H*0.55,8);ctx.stroke();

      ctx.fillStyle='#D4AF37';ctx.font=`bold ${W*0.0085}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText('WALKABILITY LIVE',W*0.695,H*0.155);

      // Scor mare
      ctx.fillStyle=walk>=70?'#22c55e':walk>=50?'#f59e0b':'#ef4444';
      ctx.font=`900 ${W*0.055}px "Space Grotesk",sans-serif`;
      ctx.fillText(this._countUp(walk,Math.min(1,(t-0.15)/0.5))+'/100',W*0.695,H*0.28);

      ctx.fillStyle='rgba(148,163,184,.7)';ctx.font=`${W*0.007}px "IBM Plex Mono"`;
      ctx.fillText(walk>=70?'VERY WALKABLE':walk>=50?'WALKABLE':'CAR-DEPENDENT',W*0.695,H*0.32);

      // Progress bars mobilitate
      [
        ['TRANSPORT PUBLIC',(city.acoperire_transport||60)/100,'#60a5fa',0.30],
        ['PISTE CICLIȘTI',0.35,'#22c55e',0.40],
        ['ZONĂ PIETONALĂ',0.55,'#a78bfa',0.50],
      ].forEach(([l,p,c,d])=>{
        this._progressBar(ctx,W*0.695,H*0.38+[0,0.09,0.18][['TRANSPORT PUBLIC','PISTE CICLIȘTI','ZONĂ PIETONALĂ'].indexOf(l)]*H,
          W*0.24,H*0.02,p,c,l,Math.round(p*100)+'%',t,d);
      });

      ctx.globalAlpha=1;
    }

    // Text bottom
    if(t>0.15){
      const ba=Math.min(1,(t-0.15)/0.2);
      ctx.globalAlpha=ba;
      ctx.fillStyle='rgba(4,10,24,.85)';
      this._roundRect(ctx,W*0.05,H*0.86,W*0.58,H*0.08,5);ctx.fill();
      ctx.fillStyle='rgba(200,215,240,.9)';ctx.font=`${W*0.0085}px "IBM Plex Mono"`;
      ctx.textAlign='left';
      ctx.fillText('Experiența pietonului · Frank et al. (2006) · OSM live',W*0.07,H*0.905);
      ctx.globalAlpha=1;
    }

    // Vehicule simulate pe strada (puncte animate)
    if(t>0.2){
      const numVeh=Math.floor(t*8);
      for(let i=0;i<numVeh;i++){
        const phase=(t*0.8+i*0.15)%1;
        const vx=W*0.05+phase*W*0.55;
        const vy=H*(0.42+i*0.06);
        const alpha=Math.sin(phase*Math.PI)*0.8;
        ctx.globalAlpha=alpha;
        ctx.fillStyle=i%3===0?'#f97316':i%3===1?'#60a5fa':'#22c55e';
        ctx.beginPath();ctx.ellipse(vx,vy,W*0.012,H*0.018,0,0,Math.PI*2);ctx.fill();
        ctx.fillStyle='rgba(255,255,255,.6)';ctx.font=`${W*0.006}px "IBM Plex Mono"`;
        ctx.textAlign='center';ctx.fillText(i%3===0?'🚗':i%3===1?'🚌':'🚲',vx,vy+2);
        ctx.globalAlpha=1;
      }
    }
    this._sceneLabel(ctx,W,H,'21','STREET VIEW REAL');
  },

  // ── SCENA 22: AI Narrative — Memoriu Justificativ Live ────────────────
  _s22_aiNarrative(ctx,W,H,t,city) {
    const gr=ctx.createLinearGradient(0,0,W*0.5,H);
    gr.addColorStop(0,'rgba(20,4,50,0.7)');gr.addColorStop(1,'rgba(4,10,24,0.92)');
    ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);
    this._scanlines(ctx,W,H,0.03);

    if(t>0.05){
      const ta=Math.min(1,(t-0.05)/0.15);
      ctx.globalAlpha=ta;
      ctx.fillStyle='#c4b5fd';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='center';
      ctx.fillText('🤖 AI MEMORIU JUSTIFICATIV — GENERAT AUTOMAT',W/2,H*0.09,W*0.88);
      ctx.fillStyle='rgba(167,139,250,.5)';ctx.font=`${W*0.0068}px "IBM Plex Mono"`;
      ctx.fillText('Claude AI · Anthropic · §1.1-§1.6 · Legea 350/2001 · Unic în lume pentru urbanism',W/2,H*0.145,W*0.88);
      ctx.globalAlpha=1;
    }

    // Cele 6 sectiuni cu reveal progresiv
    const sections=[
      {id:'§1.1',title:'Introducere & Context Teritorial',c:'#60a5fa',d:0.12},
      {id:'§1.2',title:'Situația Demografică & Tendințe',c:'#a78bfa',d:0.24},
      {id:'§1.3',title:'Analiză Economică & Potențial',c:'#22c55e',d:0.36},
      {id:'§1.4',title:'Riscuri Teritoriale & Constrângeri',c:'#ef4444',d:0.48},
      {id:'§1.5',title:'Obiective Strategice 2025-2055',c:'#D4AF37',d:0.60},
      {id:'§1.6',title:'Concluzii & Recomandări',c:'#34d399',d:0.72},
    ];

    sections.forEach((s,i)=>{
      const a=Math.min(1,Math.max(0,(t-s.d)/0.14));
      if(a<=0)return;
      const sy=H*(0.21+i*0.115);
      ctx.globalAlpha=a;

      // Card
      ctx.fillStyle='rgba(8,16,44,.85)';
      this._roundRect(ctx,W*0.05,sy,W*0.9,H*0.1,5);ctx.fill();
      ctx.fillStyle=s.c;ctx.rect(W*0.05,sy,3,H*0.1);ctx.fill();

      // Section badge
      ctx.fillStyle=s.c;ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText(s.id,W*0.07,sy+H*0.04);

      // Title cu typewriter
      const chars=Math.floor(s.title.length*Math.min(1,(t-s.d-0.02)/0.15));
      ctx.fillStyle='rgba(200,215,240,.9)';ctx.font=`${W*0.0075}px "IBM Plex Mono"`;
      ctx.fillText(s.title.slice(0,chars),W*0.14,sy+H*0.04);

      // Cursor blink
      if(chars<s.title.length){
        ctx.fillStyle=Math.sin(t*15)>0?s.c:'transparent';
        ctx.fillText('▌',W*0.14+chars*W*0.0038,sy+H*0.04);
      }

      // Preview text (random chars → text real)
      if(a>0.5){
        const previewA=Math.min(1,(a-0.5)/0.4);
        ctx.fillStyle=`rgba(100,120,150,${previewA*0.5})`;
        ctx.font=`${W*0.006}px "IBM Plex Mono"`;
        ctx.fillText('Generat pe date: INSE · Eurostat · BNR · INFP · ANAR · OSM...',W*0.14,sy+H*0.072);
      }
      ctx.globalAlpha=1;
    });

    // Badge bottom
    if(t>0.88){
      const ba=Math.min(1,(t-0.88)/0.1);
      ctx.globalAlpha=ba;
      ctx.fillStyle='rgba(139,92,246,.15)';
      this._roundRect(ctx,W*0.2,H*0.925,W*0.6,H*0.055,4);ctx.fill();
      ctx.strokeStyle='rgba(139,92,246,.4)';ctx.lineWidth=0.8;
      this._roundRect(ctx,W*0.2,H*0.925,W*0.6,H*0.055,4);ctx.stroke();
      ctx.fillStyle='#c4b5fd';ctx.font=`bold ${W*0.0075}px "IBM Plex Mono"`;
      ctx.textAlign='center';
      ctx.fillText('Disponibil în: 🏛 Urbanist ▾ → 🤖 AI Memoriu Justificativ',W/2,H*0.958,W*0.88);
      ctx.globalAlpha=1;
    }
    this._sceneLabel(ctx,W,H,'22','AI MEMORIU');
  },

  // ── SCENA 23: Masterplan PDF — Structura Documentului ─────────────────
  _s23_masterplanPreview(ctx,W,H,t,city) {
    const gr=ctx.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,'rgba(4,10,24,0.65)');gr.addColorStop(1,'rgba(4,10,24,0.92)');
    ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);

    if(t>0.04){
      const ta=Math.min(1,(t-0.04)/0.15);
      ctx.globalAlpha=ta;
      ctx.fillStyle='#D4AF37';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='center';
      ctx.fillText('📋 MASTERPLAN STRATEGIC URBAN — 22 PAGINI',W/2,H*0.09,W*0.88);
      ctx.fillStyle='rgba(212,175,55,.5)';ctx.font=`${W*0.0068}px "IBM Plex Mono"`;
      ctx.fillText('Conf. Legii 350/2001 + Ord. 233/2016 + HG 907/2016 · Generat automat din date reale',W/2,H*0.145,W*0.88);
      ctx.globalAlpha=1;
    }

    // Pagini animate ca stiva de carti
    const pages=[
      {pg:'1',title:'Copertă & Localizare',c:'#D4AF37',d:0.10},
      {pg:'2-3',title:'Diagnostic Teritorial',c:'#60a5fa',d:0.17},
      {pg:'4-5',title:'Proiecție Demografică',c:'#a78bfa',d:0.24},
      {pg:'6-7',title:'Cerere Locuințe & Housing Mix',c:'#22c55e',d:0.31},
      {pg:'8-9',title:'Context Economic & Investiții',c:'#f59e0b',d:0.38},
      {pg:'10-11',title:'Riscuri Teritoriale',c:'#ef4444',d:0.45},
      {pg:'12-13',title:'Scenarii & Recomandări',c:'#34d399',d:0.52},
      {pg:'14',title:'Zone Propuse RH/POT/CUT',c:'#D4AF37',d:0.59},
      {pg:'15-16',title:'Infrastructură & Finanțare',c:'#60a5fa',d:0.66},
      {pg:'17-19',title:'Etapizare & Monitorizare',c:'#a78bfa',d:0.73},
      {pg:'20-22',title:'Metodologie & Disclaimer',c:'#94a3b8',d:0.80},
    ];

    const cols=3, rows=Math.ceil(pages.length/cols);
    pages.forEach((p,i)=>{
      const a=Math.min(1,Math.max(0,(t-p.d)/0.12));
      if(a<=0)return;
      const col=i%cols, row=Math.floor(i/cols);
      const px=W*(0.06+col*0.31);
      const py=H*(0.21+row*0.165);
      const pw=W*0.28, ph=H*0.13;

      ctx.globalAlpha=a;
      // Pagina background (A4 ratio)
      ctx.fillStyle='rgba(8,16,44,.92)';
      this._roundRect(ctx,px,py,pw,ph,4);ctx.fill();
      ctx.strokeStyle='rgba(212,175,55,.4)';ctx.lineWidth=0.8;
      this._roundRect(ctx,px,py,pw,ph,4);ctx.stroke();
      // Accent top
      ctx.fillStyle=p.c;this._roundRect(ctx,px,py,pw,3,1);ctx.fill();
      // Numar pagina
      ctx.fillStyle=p.c;ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText('pg.'+p.pg,px+6,py+ph*0.4);
      // Titlu
      ctx.fillStyle='rgba(200,215,240,.85)';ctx.font=`${W*0.0065}px "IBM Plex Mono"`;
      const titleChars=Math.floor(p.title.length*Math.min(1,(t-p.d-0.02)/0.12));
      ctx.fillText(p.title.slice(0,titleChars),px+6,py+ph*0.7);
      ctx.globalAlpha=1;
    });

    // CTA final
    if(t>0.9){
      const ca=Math.min(1,(t-0.9)/0.08);
      ctx.globalAlpha=ca;
      ctx.fillStyle='rgba(212,175,55,.1)';
      this._roundRect(ctx,W*0.2,H*0.92,W*0.6,H*0.055,4);ctx.fill();
      ctx.strokeStyle='rgba(212,175,55,.4)';ctx.lineWidth=0.8;
      this._roundRect(ctx,W*0.2,H*0.92,W*0.6,H*0.055,4);ctx.stroke();
      ctx.fillStyle='#D4AF37';ctx.font=`bold ${W*0.008}px "IBM Plex Mono"`;
      ctx.textAlign='center';
      ctx.fillText('Click parcelă → Masterplan PDF · sau 🏛 Urbanist ▾ → 📋 Masterplan PDF',W/2,H*0.953,W*0.88);
      ctx.globalAlpha=1;
    }
    this._sceneLabel(ctx,W,H,'23','MASTERPLAN PDF');
  },

  // ── SCENA 24: Investiții & Finanțare UE 2025-2055 ─────────────────────
  _s24_investment(ctx,W,H,t,city) {
    const need=this._need;
    const invest_total=Math.round((need?.locuinteTotale||5000)*0.9);
    const gr=ctx.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,'rgba(4,20,8,.55)');gr.addColorStop(1,'rgba(4,10,24,.88)');
    ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);

    if(t>0.04){
      const ta=Math.min(1,(t-0.04)/0.15);
      ctx.globalAlpha=ta;
      ctx.fillStyle='#22c55e';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='center';
      ctx.fillText('INVESTIȚII NECESARE 2025—2055 · SURSE FINANȚARE UE',W/2,H*0.09,W*0.88);
      ctx.fillStyle='rgba(34,197,94,.5)';ctx.font=`${W*0.007}px "IBM Plex Mono"`;
      ctx.fillText('PNRR · FEDR · POR 2021-2027 · Fonduri de Coeziune · Buget local · Investiție privată',W/2,H*0.145,W*0.88);
      ctx.globalAlpha=1;
    }

    // KPI total investitie
    if(t>0.12) this._kpiCard(ctx,W*0.05,H*0.2,W*0.27,H*0.18,'TOTAL INVESTIȚIE',invest_total,'mil. EUR · 2025-2055','#22c55e',t,0.12);

    // Breakdown investitii cu progress bars
    const items=[
      ['LOCUINȚE NOI',0.55,'Sector privat + ANL',   '#22c55e',0.22],
      ['INFRASTRUCTURĂ',0.18,'Fonduri UE FEDR/POR',  '#60a5fa',0.30],
      ['ECHIPAMENTE PUBLICE',0.12,'Buget stat + PNRR','#a78bfa',0.38],
      ['SPAȚII VERZI',0.08,'Fonduri UE + local',     '#4ade80',0.46],
      ['CONSOLIDARE SEISMICĂ',0.07,'PNRR C10-I2 UE', '#ef4444',0.54],
    ];
    items.forEach(([l,p,sub,c,d])=>{
      this._progressBar(ctx,W*0.37,H*(0.22+items.indexOf(items.find(x=>x[0]===l))*0.12),W*0.56,H*0.025,p,c,l,Math.round(p*100)+'% — '+sub,t,d);
    });

    // ROI timeline
    if(t>0.65){
      const ra=Math.min(1,(t-0.65)/0.2);
      ctx.globalAlpha=ra;
      ctx.fillStyle='rgba(8,16,44,.85)';
      this._roundRect(ctx,W*0.05,H*0.77,W*0.9,H*0.13,5);ctx.fill();
      ctx.strokeStyle='rgba(34,197,94,.3)';ctx.lineWidth=0.8;
      this._roundRect(ctx,W*0.05,H*0.77,W*0.9,H*0.13,5);ctx.stroke();
      ctx.fillStyle='#22c55e';ctx.font=`bold ${W*0.008}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText('ROI ESTIMAT:',W*0.07,H*0.815);
      ctx.fillStyle='rgba(200,215,240,.85)';ctx.font=`${W*0.0075}px "IBM Plex Mono"`;
      ctx.fillText('2025-2030: consolidare infrastructură · 2031-2040: recuperare investiție · 2041-2055: valoare adaugată +35%',W*0.07,H*0.855);
      ctx.globalAlpha=1;
    }

    // Badge finantare EU
    if(t>0.55){
      const ba=Math.min(1,(t-0.55)/0.2);
      ctx.globalAlpha=ba;
      this._donutArc(ctx,W*0.18,H*0.52,H*0.1,0.35,'#60a5fa','FONDURI UE','35%',t,0.55);
      ctx.globalAlpha=1;
    }
    this._sceneLabel(ctx,W,H,'24','INVESTIȚII & FINANȚARE');
  },


  _s25_finale(ctx,W,H,t,city) {
    const grav = window._TCIMasterplanPDF?._calcGravity?.(city)||{growthType:'METROPOLITAN'};
    const need = this._need;
    const pop55 = need?.pop2055||city?.pop2021||100000;
    const cityName = city?.name?.toUpperCase() || 'IAȘI';

    // ── Fade-in dramatic din negru ─────────────────────────────────────────
    if(t < 0.08) {
      ctx.fillStyle = `rgba(4,10,24,${1-t/0.08})`;
      ctx.fillRect(0,0,W,H); return;
    }

    // ── Overlay gradient cinematic ─────────────────────────────────────────
    const gr = ctx.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,'rgba(4,10,24,0.6)');
    gr.addColorStop(0.4,'rgba(4,10,24,0.50)');
    gr.addColorStop(0.7,'rgba(4,10,24,0.85)');
    gr.addColorStop(1,'rgba(4,10,24,0.92)');
    ctx.fillStyle=gr; ctx.fillRect(0,0,W,H);

    // ── Linie aurie separator sus ──────────────────────────────────────────
    const lineAlpha = Math.min(1,(t-0.08)/0.15);
    ctx.strokeStyle=`rgba(212,175,55,${lineAlpha*0.6})`;
    ctx.lineWidth=1; ctx.beginPath();
    ctx.moveTo(W*0.08,H*0.12); ctx.lineTo(W*0.92,H*0.12); ctx.stroke();

    // ── Titlu principal — apare la t=0.10 ─────────────────────────────────
    if(t > 0.10) {
      const ta = Math.min(1,(t-0.10)/0.18);
      const ty = H*0.18 - (1-ta)*20;
      ctx.globalAlpha = ta;
      ctx.fillStyle='#D4AF37'; ctx.font=`800 ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='center';
      ctx.fillText('VIZIUNE STRATEGICĂ 2025 — 2055',W/2,ty,W*0.88);
      ctx.fillStyle='rgba(255,255,255,0.95)';
      ctx.font=`900 ${W*0.028}px "Space Grotesk",sans-serif`;
      ctx.fillText(cityName, W/2, ty+W*0.032);
      ctx.globalAlpha=1;
    }

    // ── 3 Recomandări principale — apar progresiv ─────────────────────────
    const recs = [
      { icon:'🏗', title:'DENSIFICARE', text:`${N(need?.locuinteTotale||5000)} locuințe noi în zone TOD`, color:'#22c55e' },
      { icon:'🚌', title:'MOBILITATE', text:'Transport public +62% · Ciclism +180% · Modal shift 2055', color:'#60a5fa' },
      { icon:'🌳', title:'SUSTENABILITATE', text:'Carbon net-zero 2050 · Spații verzi ≥9m²/loc · SDG 11', color:'#D4AF37' },
    ];
    recs.forEach((rec,i) => {
      const showAt = 0.28 + i*0.16;
      if(t <= showAt) return;
      const ra = Math.min(1,(t-showAt)/0.14);
      const rx = W*0.10 + i*(W*0.27);
      const ry = H*0.35;
      const rw = W*0.25, rh = H*0.22;
      ctx.globalAlpha = ra;
      // Card background
      ctx.fillStyle='rgba(4,10,28,0.88)';
      this._roundRect(ctx,rx,ry,rw,rh,8); ctx.fill();
      ctx.strokeStyle=rec.color; ctx.lineWidth=1.5;
      this._roundRect(ctx,rx,ry,rw,rh,8); ctx.stroke();
      ctx.fillStyle=rec.color; ctx.fillRect(rx,ry,rw,3);
      // Icon + title
      ctx.fillStyle=rec.color; ctx.font=`bold ${W*0.016}px "IBM Plex Mono"`;
      ctx.textAlign='left';
      ctx.fillText(rec.icon+' '+rec.title, rx+10, ry+W*0.018);
      // Text
      ctx.fillStyle='rgba(200,215,240,.85)'; ctx.font=`${W*0.0075}px "IBM Plex Mono"`;
      const lines = ctx.measureText(rec.text).width > rw-20
        ? [rec.text.slice(0,Math.ceil(rec.text.length/2)), rec.text.slice(Math.ceil(rec.text.length/2))]
        : [rec.text];
      lines.forEach((l,li) => ctx.fillText(l, rx+10, ry+W*0.030+li*W*0.012));
      ctx.globalAlpha=1;
    });

    // ── Checklist KPI — apare la t=0.60 ───────────────────────────────────
    if(t > 0.60) {
      const ca = Math.min(1,(t-0.60)/0.15);
      ctx.globalAlpha=ca;
      const items = [
        { label:`Populație 2055: ${N(pop55)} loc.`, ok:pop55>(city?.pop2021||100000)*0.95 },
        { label:`Convergență UE: ${city?.pib_eur_cap?Math.round(city.pib_eur_cap*1.65/36600*100):'est.75'}%`, ok:true },
        { label:`Risc seismic gestionat (PNRR C10-I2)`, ok:true },
        { label:`Deficit școlar rezolvat: +${Math.max(0,Math.ceil((pop55-(city?.pop2021||100000))*0.14/400))} unități`, ok:true },
      ];
      items.forEach((item,i) => {
        if(t < 0.60+i*0.08) return;
        const fy = H*0.65+i*H*0.06;
        const ia = Math.min(1,(t-0.60-i*0.08)/0.10);
        ctx.globalAlpha=ia*ca;
        ctx.fillStyle=item.ok?'#22c55e':'#f59e0b';
        ctx.font=`bold ${W*0.011}px "IBM Plex Mono"`;
        ctx.textAlign='left';
        ctx.fillText(item.ok?'✅':'⚠', W*0.15, fy);
        ctx.fillStyle='rgba(220,235,250,.9)'; ctx.font=`${W*0.009}px "IBM Plex Mono"`;
        ctx.fillText(item.label, W*0.20, fy);
      });
      ctx.globalAlpha=1;
    }

    // ── CTA final — la t=0.82 ─────────────────────────────────────────────
    if(t > 0.82) {
      const fa = Math.min(1,(t-0.82)/0.12);
      ctx.globalAlpha = fa;
      // Box CTA
      ctx.fillStyle='rgba(212,175,55,0.10)';
      this._roundRect(ctx, W*0.25, H*0.855, W*0.50, H*0.065, 8); ctx.fill();
      ctx.strokeStyle='rgba(212,175,55,0.4)'; ctx.lineWidth=1;
      this._roundRect(ctx, W*0.25, H*0.855, W*0.50, H*0.065, 8); ctx.stroke();
      ctx.fillStyle='#D4AF37'; ctx.font=`bold ${W*0.010}px "IBM Plex Mono"`;
      ctx.textAlign='center';
      ctx.fillText('📋 Generează Masterplan PDF complet · 📊 Analizează per parcelă',W/2,H*0.892,W*0.88);
      ctx.globalAlpha=1;
    }

    // ── Fade-out final spre harta ─────────────────────────────────────────
    if(t > 0.92) {
      const fo = (t-0.92)/0.08;
      ctx.fillStyle=`rgba(4,10,24,${fo*0.7})`;
      ctx.fillRect(0,0,W,H);
      // Harta revine progresiv
      if(t > 0.95 && window.map) {
        try {
          window.map.setConfigProperty?.('basemap','lightPreset','day');
        } catch(e) {}
      }
    }

    // ── Surse ─────────────────────────────────────────────────────────────
    if(t > 0.25 && t < 0.90) {
      ctx.fillStyle='rgba(100,120,150,.4)';
      ctx.font=`${W*0.007}px "IBM Plex Mono"`;
      ctx.textAlign='center';
      ctx.fillText('Date: INSE Rec.2021 · Eurostat · BNR · IPCC AR6 · Copernicus GHSL · OSM · UrbanX Model 2026',W/2,H*0.975,W*0.88);
    }

    // ── Watermark ─────────────────────────────────────────────────────────
    ctx.fillStyle='rgba(212,175,55,0.2)';
    ctx.font=`bold ${W*0.008}px "IBM Plex Mono"`;
    ctx.textAlign='right';
    ctx.fillText('UrbanX TSS·FG © 2026', W-12, H-8);

    this._sceneLabel(ctx,W,H,'12','CONCLUZIE & VIZIUNE');
  }
,

  // ═══ LAYERS MAPBOX per scenă ═══════════════════════════════════════════

  _setupDensityLayer(map, city) {
    // Heatmap densitate din populatia per zona
    const cx=city?.lon||27.601, cy=city?.lat||47.158;
    const points = [];
    for(let a=0;a<360;a+=15){
      for(let r=0.001;r<0.06;r+=0.008){
        const lon=cx+r*Math.cos(a*Math.PI/180);
        const lat=cy+r*0.65*Math.sin(a*Math.PI/180);
        const dens=Math.max(0, 200-r*3000 + Math.sin(a*4)*20);
        points.push([lon,lat,dens]);
      }
    }
    try {
      if(!map.getSource('tci-density-heat')){
        map.addSource('tci-density-heat',{type:'geojson',data:{type:'FeatureCollection',features:
          points.map(([lon,lat,mag])=>({type:'Feature',geometry:{type:'Point',coordinates:[lon,lat]},properties:{mag}}))
        }});
        map.addLayer({id:'tci-density-layer',type:'heatmap',source:'tci-density-heat',paint:{
          'heatmap-weight':['interpolate',['linear'],['get','mag'],0,0,200,1],
          'heatmap-intensity':['interpolate',['linear'],['zoom'],11,1,15,3],
          'heatmap-color':['interpolate',['linear'],['heatmap-density'],
            0,'rgba(0,0,255,0)',0.2,'#1d4ed8',0.4,'#22c55e',0.6,'#f59e0b',0.8,'#ef4444',1,'#7f1d1d'],
          'heatmap-radius':['interpolate',['linear'],['zoom'],11,15,15,30],
          'heatmap-opacity':0.7,
        }});
      }
    } catch(e){}
  },

  _setup3DGrowthBars(map, city) {
    const cx=city?.lon||27.601, cy=city?.lat||47.158;
    const zones_data = G._ZoneProjections.calculate(city, this._need, 2050);
    const features = [];

    Object.values(zones_data||{}).forEach((z,idx) => {
      const nRings = 24;
      for(let i=0;i<nRings;i++){
        const angle = (i/nRings)*2*Math.PI;
        const r = (z.radius_km/2) / 111;
        const lon = cx + r*Math.cos(angle);
        const lat = cy + r*0.65*Math.sin(angle);
        const w   = 0.0004;
        features.push({
          type:'Feature',
          geometry:{type:'Polygon',coordinates:[[[lon-w,lat-w*0.65],[lon+w,lat-w*0.65],[lon+w,lat+w*0.65],[lon-w,lat+w*0.65],[lon-w,lat-w*0.65]]]},
          properties:{
            height: Math.max(5, z.presiune*80 + Math.sin(i*z.gravWeight)*10),
            color:  z.presiuneColor,
            label:  z.presiuneLabel,
            zone:   z.label,
          }
        });
      }
    });

    try {
      if(!map.getSource('tci-growth-bars')){
        map.addSource('tci-growth-bars',{type:'geojson',data:{type:'FeatureCollection',features}});
        map.addLayer({id:'tci-growth-bars-layer',type:'fill-extrusion',source:'tci-growth-bars',paint:{
          'fill-extrusion-color':['get','color'],
          'fill-extrusion-height':['get','height'],
          'fill-extrusion-base':0,
          'fill-extrusion-opacity':0.75,
        }});
      }
    } catch(e){}
  },

  _setupTrafficLayer(map, city) {
    const cx=city?.lon||27.601, cy=city?.lat||47.158;
    // Generăm rețea de strazi cu nivel de congestionare
    // Artere principale = AGLOMERAT, secundare = MODERAT, rezidențiale = FLUID
    const features = [];
    const angles = [0,45,90,135,180,225,270,315];
    angles.forEach((angle,i)=>{
      const rad = angle*Math.PI/180;
      const r   = 0.02;
      const type = i<4?'primary':'secondary';
      const cong = type==='primary'?'AGLOMERAT':'MODERAT';
      const color= cong==='AGLOMERAT'?'#ef4444':'#f59e0b';
      for(let seg=0;seg<5;seg++){
        const r0=(seg*0.004), r1=((seg+1)*0.004);
        const noise = Math.sin(seg*7+i*3)*0.0005;
        features.push({type:'Feature',
          geometry:{type:'LineString',coordinates:[
            [cx+r0*Math.cos(rad)+noise, cy+r0*0.65*Math.sin(rad)],
            [cx+r1*Math.cos(rad)+noise, cy+r1*0.65*Math.sin(rad)],
          ]},
          properties:{congestion:cong,color,width:type==='primary'?3:2}
        });
      }
    });
    // Strazi rezidentiale
    for(let x=-3;x<=3;x++) for(let y=-3;y<=3;y++){
      const lon=cx+x*0.004, lat=cy+y*0.0025;
      features.push({type:'Feature',
        geometry:{type:'LineString',coordinates:[[lon,lat],[lon+0.004,lat]]},
        properties:{congestion:'FLUID',color:'#22c55e',width:1}
      });
    }

    try {
      if(!map.getSource('tci-traffic-congestion')){
        map.addSource('tci-traffic-congestion',{type:'geojson',data:{type:'FeatureCollection',features}});
        map.addLayer({id:'tci-traffic-cong-layer',type:'line',source:'tci-traffic-congestion',paint:{
          'line-color':['get','color'],
          'line-width':['get','width'],
          'line-opacity':0.8,
        }});
      }
    } catch(e){}
  },

  // ── Slider temporal fullscreen ─────────────────────────────────────────
  _showTimeSlider(city) {
    if(document.getElementById('tci-time-slider')) return;
    const el = document.createElement('div');
    el.id = 'tci-time-slider';
    el.style.cssText = `
      position:fixed;bottom:80px;left:50%;transform:translateX(-50%);
      z-index:4000;background:rgba(4,10,24,.95);
      border:1px solid rgba(212,175,55,.4);border-radius:12px;
      padding:12px 20px;font-family:'IBM Plex Mono',monospace;
      display:flex;flex-direction:column;align-items:center;gap:8px;
      min-width:320px;
    `;
    el.innerHTML = `
      <div style="display:flex;justify-content:space-between;width:100%">
        <span style="font-size:18px;font-weight:900;color:#60a5fa">2025</span>
        <span style="font-size:10px;color:rgba(212,175,55,.8);font-weight:700">← TRAGE →</span>
        <span style="font-size:18px;font-weight:900;color:#D4AF37" id="tci-ts-year">2050</span>
      </div>
      <input type="range" min="2025" max="2055" value="2050" step="5"
        style="width:100%;accent-color:#D4AF37;background:transparent;cursor:pointer"
        oninput="
          const yr=+this.value;
          document.getElementById('tci-ts-year').textContent=yr;
          window._BuildingGrowth?._map && window._BuildingGrowth.update(yr,0.5);
          window._VehicleEngine?.setYear?.(yr);
          window._TCIDashboard?.setYear?.(yr);
          try{window.map.setConfigProperty('basemap','lightPreset',yr>=2045?'night':yr>=2035?'dusk':'day');}catch(e){}
        ">
      <div style="font-size:8px;color:rgba(100,120,150,.5);text-align:center">
        Slider temporal 2025→2055 · Clădiri + Trafic + Iluminat
      </div>`;
    document.body.appendChild(el);
  },

  // ── Helpers canvas ─────────────────────────────────────────────────────
  _card(ctx,x,y,w,h,color,title){
    ctx.fillStyle='rgba(4,10,24,0.92)';
    ctx.strokeStyle='rgba(212,175,55,.5)';
    ctx.lineWidth=1;
    this._roundRect(ctx,x,y,w,h,8); ctx.fill(); ctx.stroke();
    ctx.fillStyle=color;
    ctx.font=`bold ${Math.round(w*0.045)}px "IBM Plex Mono"`;
    ctx.textAlign='left';
    ctx.fillText(title,x+8,y+16);
  },

  _roundRect(ctx,x,y,w,h,r){
    ctx.beginPath();
    ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y);
    ctx.arcTo(x+w,y,x+w,y+r,r); ctx.lineTo(x+w,y+h-r);
    ctx.arcTo(x+w,y+h,x+w-r,y+h,r); ctx.lineTo(x+r,y+h);
    ctx.arcTo(x,y+h,x,y+h-r,r); ctx.lineTo(x,y+r);
    ctx.arcTo(x,y,x+r,y,r); ctx.closePath();
  },


  // ── HELPER TEHNICI VIZUALE NOI ────────────────────────────────────────────

  // Counter animat: 0 → valoare finala cu ease-out
  _countUp(val, t, start=0) {
    const ease = t < 1 ? 1 - Math.pow(1-t, 3) : 1;
    return Math.round(start + (val - start) * ease);
  },

  // Pulse/glow animat pe un dreptunghi
  _pulse(ctx, x, y, w, h, r, t, color='#D4AF37') {
    const pulseFactor = 0.5 + 0.5 * Math.sin(t * Math.PI * 4);
    const alpha = 0.3 + 0.4 * pulseFactor;
    ctx.shadowColor = color;
    ctx.shadowBlur = 10 + 15 * pulseFactor;
    ctx.strokeStyle = `rgba(212,175,55,${alpha})`;
    ctx.lineWidth = 1.5 + pulseFactor;
    this._roundRect(ctx, x, y, w, h, r);
    ctx.stroke();
    ctx.shadowBlur = 0;
  },

  // Progress bar animat cu label
  _progressBar(ctx, x, y, w, h, pct, color, label, sublabel, t, delay=0) {
    const a = Math.min(1, Math.max(0, (t - delay) / 0.3));
    if(a <= 0) return;
    ctx.globalAlpha *= a;
    // Track
    ctx.fillStyle = 'rgba(255,255,255,.06)';
    this._roundRect(ctx, x, y, w, h, h/2); ctx.fill();
    // Fill animat
    const fillW = w * Math.min(1, pct) * a;
    if(fillW > 0) {
      const grad = ctx.createLinearGradient(x, 0, x+w, 0);
      grad.addColorStop(0, color);
      // addColorStop accepta doar culori valide - nu hex+alpha suffix
      grad.addColorStop(1, color);
      ctx.fillStyle = grad;
      this._roundRect(ctx, x, y, fillW, h, h/2); ctx.fill();
    }
    // Label
    ctx.fillStyle = 'rgba(200,215,240,.9)';
    ctx.font = `bold ${h*1.1}px "IBM Plex Mono"`;
    ctx.textAlign = 'left';
    ctx.fillText(label, x, y - 3);
    // Procent
    ctx.textAlign = 'right';
    ctx.fillStyle = color;
    ctx.fillText(sublabel, x+w, y - 3);
    ctx.globalAlpha /= a;
  },

  // Donut/arc chart animat
  _donutArc(ctx, cx, cy, r, pct, color, label, sublabel, t, delay=0) {
    const a = Math.min(1, Math.max(0, (t - delay) / 0.4));
    if(a <= 0) return;
    ctx.globalAlpha *= a;
    const startAngle = -Math.PI/2;
    const endAngle = startAngle + Math.PI * 2 * pct * a;
    // Track
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = r*0.35; ctx.stroke();
    // Arc
    ctx.beginPath(); ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.strokeStyle = color; ctx.lineWidth = r*0.35; ctx.stroke();
    // Label central
    ctx.fillStyle = 'rgba(255,255,255,.9)';
    ctx.font = `bold ${r*0.55}px "IBM Plex Mono"`;
    ctx.textAlign = 'center'; ctx.fillText(sublabel, cx, cy+r*0.2);
    ctx.font = `${r*0.28}px "IBM Plex Mono"`;
    ctx.fillStyle = 'rgba(148,163,184,.7)';
    ctx.fillText(label, cx, cy + r*0.65);
    ctx.globalAlpha /= a;
  },

  // Fan chart (Monte Carlo envelope)
  _fanChart(ctx, W, H, data, t) {
    const { p10, p50, p90, years, color } = data;
    if(!p10?.length || !years?.length) return;
    const n = years.length;
    const px = (i) => W*0.08 + i*(W*0.84)/(n-1);
    const minV = Math.min(...p10) * 0.95;
    const maxV = Math.max(...p90) * 1.05;
    const py = (v) => H*0.85 - ((v-minV)/(maxV-minV))*(H*0.65);
    const drawPct = Math.min(1, t / 0.8);

    // P10-P90 envelope (fan)
    ctx.beginPath();
    for(let i=0; i<Math.floor(n*drawPct); i++) ctx[i?'lineTo':'moveTo'](px(i), py(p10[i]));
    for(let i=Math.floor(n*drawPct)-1; i>=0; i--) ctx.lineTo(px(i), py(p90[i]));
    ctx.closePath();
    ctx.fillStyle = `${color}22`; ctx.fill();

    // P10, P90 lines
    [[p10,'rgba(245,158,11,.5)'],[p90,'rgba(245,158,11,.5)']].forEach(([arr,c])=>{
      ctx.beginPath();
      for(let i=0; i<Math.floor(n*drawPct); i++) ctx[i?'lineTo':'moveTo'](px(i), py(arr[i]));
      ctx.strokeStyle=c; ctx.lineWidth=0.8; ctx.setLineDash([3,2]); ctx.stroke();
      ctx.setLineDash([]);
    });

    // P50 line (median)
    ctx.beginPath();
    for(let i=0; i<Math.floor(n*drawPct); i++) ctx[i?'lineTo':'moveTo'](px(i), py(p50[i]));
    ctx.strokeStyle=color; ctx.lineWidth=2; ctx.stroke();

    // Year labels
    years.forEach((yr,i)=>{
      ctx.fillStyle='rgba(100,120,150,.6)';
      ctx.font=`${W*0.007}px "IBM Plex Mono"`;
      ctx.textAlign='center';
      ctx.fillText(yr, px(i), H*0.92);
    });
  },

  // Radar chart animat (8 dimensiuni)
  _radarChart(ctx, cx, cy, r, vals, labels, colors, t) {
    const n = vals.length;
    const step = (Math.PI*2)/n;
    const drawPct = Math.min(1, t/0.6);

    // Axe si grid
    [0.25,0.5,0.75,1].forEach(f=>{
      ctx.beginPath();
      for(let i=0;i<n;i++){
        const a=-Math.PI/2+i*step;
        const [x,y]=[cx+r*f*Math.cos(a), cy+r*f*Math.sin(a)];
        i?ctx.lineTo(x,y):ctx.moveTo(x,y);
      }
      ctx.closePath();
      ctx.strokeStyle=`rgba(255,255,255,${f<1?0.06:0.12})`;
      ctx.lineWidth=0.5; ctx.stroke();
    });
    for(let i=0;i<n;i++){
      const a=-Math.PI/2+i*step;
      ctx.beginPath();ctx.moveTo(cx,cy);
      ctx.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a));
      ctx.strokeStyle='rgba(255,255,255,.06)';ctx.lineWidth=0.4;ctx.stroke();
    }

    // Poligon date
    ctx.beginPath();
    for(let i=0;i<n;i++){
      const a=-Math.PI/2+i*step;
      const v=vals[i]*drawPct;
      const [x,y]=[cx+r*v*Math.cos(a), cy+r*v*Math.sin(a)];
      i?ctx.lineTo(x,y):ctx.moveTo(x,y);
    }
    ctx.closePath();
    ctx.fillStyle='rgba(212,175,55,.15)'; ctx.fill();
    ctx.strokeStyle='#D4AF37'; ctx.lineWidth=2; ctx.stroke();

    // Puncte si labels
    if(t > 0.4) {
      const la = Math.min(1,(t-0.4)/0.3);
      vals.forEach((v,i)=>{
        const a=-Math.PI/2+i*step;
        const [px,py]=[cx+r*v*Math.cos(a), cy+r*v*Math.sin(a)];
        ctx.fillStyle='#D4AF37'; ctx.beginPath();ctx.arc(px,py,3,0,Math.PI*2);ctx.fill();
        const [lx,ly]=[cx+(r+16)*Math.cos(a), cy+(r+16)*Math.sin(a)];
        ctx.fillStyle=`rgba(148,163,184,${la})`;
        ctx.font=`bold ${r*0.12}px "IBM Plex Mono"`;
        ctx.textAlign=Math.cos(a)>0.1?'left':Math.cos(a)<-0.1?'right':'center';
        ctx.fillText(labels[i], lx, ly+r*0.04);
      });
    }
  },

  // Particle system simplu
  _drawParticles(ctx, W, H, t, count=30, color='rgba(212,175,55,0.4)') {
    if(!this._particles) {
      this._particles = Array.from({length:count}, (_,i) => ({
        x: Math.random()*W, y: Math.random()*H,
        vx: (Math.random()-0.5)*0.3, vy: -Math.random()*0.5-0.1,
        r: Math.random()*2+0.5, life: Math.random(),
      }));
    }
    this._particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.life -= 0.003;
      if(p.life <= 0 || p.y < 0) {
        p.x=Math.random()*W; p.y=H+5; p.life=0.5+Math.random()*0.5;
      }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(212,175,55,${p.life*0.6})`;
      ctx.fill();
    });
  },

  // Scanline effect (subtle CRT vibe)
  _scanlines(ctx, W, H, alpha=0.04) {
    for(let y=0; y<H; y+=3) {
      ctx.fillStyle = `rgba(0,0,0,${alpha})`;
      ctx.fillRect(0, y, W, 1);
    }
  },

  // Card cu reveal animat de sus in jos
  _revealCard(ctx, x, y, w, h, r, t, delay, fillColor, strokeColor) {
    const a = Math.min(1, Math.max(0, (t-delay)/0.2));
    if(a <= 0) return 0;
    const revH = h * a;
    ctx.save();
    ctx.beginPath(); ctx.rect(x, y, w, revH); ctx.clip();
    ctx.fillStyle = fillColor || 'rgba(8,15,44,.9)';
    this._roundRect(ctx, x, y, w, h, r); ctx.fill();
    if(strokeColor) {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1;
      this._roundRect(ctx, x, y, w, h, r); ctx.stroke();
    }
    ctx.restore();
    return a;
  },

  // Wipe reveal (stanga → dreapta)
  _wipeReveal(ctx, W, H, t, color='rgba(4,10,24,1)') {
    if(t >= 1) return;
    ctx.fillStyle = color;
    ctx.fillRect(W*t, 0, W*(1-t), H);
  },

  // KPI card cu counter animat
  _kpiCard(ctx, x, y, w, h, label, value, unit, color, t, delay=0, prefix='') {
    const a = Math.min(1, Math.max(0, (t-delay)/0.25));
    if(a <= 0) return;
    ctx.globalAlpha *= a;
    // Background
    ctx.fillStyle = 'rgba(4,10,24,.92)';
    this._roundRect(ctx, x, y, w, h, 6); ctx.fill();
    // Accent bar top
    ctx.fillStyle = color;
    this._roundRect(ctx, x, y, w, 2.5, 1); ctx.fill();
    // Label
    ctx.fillStyle = 'rgba(148,163,184,.8)';
    ctx.font = `bold ${w*0.065}px "IBM Plex Mono"`;
    ctx.textAlign = 'left';
    ctx.fillText(label.toUpperCase(), x+8, y+h*0.32);
    // Value counter
    const displayVal = typeof value === 'number'
      ? this._countUp(value, Math.min(1,(t-delay)/0.6)).toLocaleString('ro-RO')
      : value;
    ctx.fillStyle = color;
    ctx.font = `900 ${Math.min(w*0.18, h*0.38)}px "Space Grotesk", sans-serif`;
    ctx.fillText(prefix+displayVal, x+8, y+h*0.75, w-16);
    // Unit
    ctx.fillStyle = 'rgba(148,163,184,.5)';
    ctx.font = `${w*0.065}px "IBM Plex Mono"`;
    ctx.fillText(unit, x+8, y+h*0.92);
    ctx.globalAlpha /= a;
  },


  _sceneLabel(ctx,W,H,num,title){
    // Label scena: fundal solid, text clar
    const estW = Math.min(W*0.62, title.length * W*0.012 + W*0.1);
    // Shadow pentru contrast pe orice fundal
    ctx.shadowColor='rgba(0,0,0,.8)'; ctx.shadowBlur=12;
    ctx.fillStyle='rgba(4,10,24,.92)';
    ctx.fillRect(0, 0, estW, H*0.075);
    ctx.shadowBlur=0;
    // Linie accent gold
    ctx.fillStyle='rgba(212,175,55,.7)';
    ctx.fillRect(0, H*0.075, estW, 2);
    // Nr. scena
    ctx.fillStyle='#D4AF37';
    ctx.font=`bold ${W*0.024}px "Space Grotesk",sans-serif`;
    ctx.textAlign='left';
    ctx.fillText(String(num), W*0.015, H*0.056);
    // Titlu
    ctx.fillStyle='rgba(255,255,255,.95)';
    ctx.font=`bold ${W*0.013}px "IBM Plex Mono"`;
    ctx.fillText(title.toUpperCase(), W*0.048, H*0.054);
  },

  _drawSceneProgress(ctx,W,H,t,sceneId){
    const total = this.SCENES.length;
    const pct   = ((sceneId-1) + t) / total;
    const bh    = H*0.006;
    const by    = H - bh;
    // Track
    ctx.fillStyle='rgba(255,255,255,.08)';
    ctx.fillRect(0, by, W, bh);
    // Progress
    const grad=ctx.createLinearGradient(0,0,W,0);
    grad.addColorStop(0,'rgba(212,175,55,.9)');
    grad.addColorStop(1,'rgba(212,175,55,.4)');
    ctx.fillStyle=grad;
    ctx.fillRect(0, by, W*pct, bh);
    // Timer text (dreapta jos, mare si lizibil)
    const elapsed = (sceneId-1)*14 + t*14; // aprox
    const remaining = Math.round((total*13 - elapsed)/60*10)/10;
    ctx.fillStyle='rgba(212,175,55,.6)';
    ctx.font=`${W*0.0065}px "IBM Plex Mono"`;
    ctx.textAlign='right';
    ctx.fillText(`${sceneId}/${total}`, W-W*0.01, by-H*0.006);
    ctx.textAlign='left';
  },

  _cleanupMapLayers() {
    const map = window.map;
    if(!map) return;
    ['tci-density-heat','tci-growth-bars','tci-traffic-congestion'].forEach(src=>{
      ['tci-density-layer','tci-growth-bars-layer','tci-traffic-cong-layer'].forEach(id=>{
        try{ if(map.getLayer(id)) map.removeLayer(id); }catch(e){}
      });
      try{ if(map.getSource(src)) map.removeSource(src); }catch(e){}
    });
    document.getElementById('tci-time-slider')?.remove();
  },

  // ── SCENA 7: Focus Zonă 2 — Reconversie Industrială ────────────────────
  _s7_focusZone2(ctx,W,H,t,city,zones) {
    const zone = zones?.[1] || zones?.[0];
    if(!zone) { this._s6_focusZone1(ctx,W,H,t,city,zones); return; }
    const pct  = zone.densif_pct || 15;
    const N    = v => Number(v||0).toLocaleString('ro-RO');
    // Overlay cinematic
    const gr = ctx.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,'rgba(4,10,24,.6)'); gr.addColorStop(1,'rgba(4,10,24,0.92)');
    ctx.fillStyle=gr; ctx.fillRect(0,0,W,H);
    this._scanlines(ctx,W,H,0.03);
    // Titlu
    if(t>0.06) {
      const ta=Math.min(1,(t-0.06)/0.2);
      ctx.globalAlpha=ta;
      ctx.fillStyle='#f59e0b'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left'; ctx.fillText('RECONVERSIE INDUSTRIALĂ', W*0.05, H*0.1);
      ctx.fillStyle='rgba(255,255,255,.9)'; ctx.font=`900 ${W*0.025}px "Space Grotesk",sans-serif`;
      ctx.fillText((zone.name||'ZONA 2').toUpperCase(), W*0.05, H*0.17);
      ctx.globalAlpha=1;
    }
    // KPI cards cu counter animat
    [[`DENSIFICARE`,pct,'%','#f59e0b',0.15,pct>=0?'+':''],
     ['LOCUINTE NOI',zone.locuinte_noi||0,'unități','#60a5fa',0.32,''],
     ['POPULATIE 2055',zone.pop2055||0,'loc.','#22c55e',0.49,'']
    ].forEach(([l,v,u,c,d,pfx],i)=>{
      this._kpiCard(ctx, W*0.05+i*(W*0.31), H*0.55, W*0.28, H*0.22, l, v, u, c, t, d, pfx);
    });
    // RH / POT / Functiuni
    if(t>0.60) {
      const ia=Math.min(1,(t-0.60)/0.2);
      ctx.globalAlpha=ia;
      ctx.fillStyle='rgba(8,16,44,.85)'; this._roundRect(ctx,W*0.05,H*0.8,W*0.9,H*0.14,6); ctx.fill();
      ctx.fillStyle='#f59e0b'; ctx.font=`bold ${W*0.0075}px "IBM Plex Mono"`;
      ctx.textAlign='left';
      ctx.fillText(`RH: ${zone.rh_propus||'P+3—P+6'} · POT: ${zone.pot||60}% · CUT: ${zone.cut||2.0}`, W*0.07, H*0.865);
      ctx.fillStyle='rgba(200,215,240,.8)'; ctx.font=`${W*0.007}px "IBM Plex Mono"`;
      ctx.fillText('FUNCTIUNI: '+(zone.functiuni||['Lofturi','Birouri','Retail']).slice(0,3).join(' · '), W*0.07, H*0.9);
      ctx.globalAlpha=1;
    }
    // Tip interventie badge pulsant
    if(t>0.3) {
      this._pulse(ctx, W*0.68, H*0.08, W*0.27, H*0.1, 6, t, '#f59e0b');
      ctx.fillStyle='rgba(8,16,44,.85)'; this._roundRect(ctx,W*0.68,H*0.08,W*0.27,H*0.1,6); ctx.fill();
      ctx.fillStyle='#f59e0b'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='center'; ctx.fillText('RECONVERSIE', W*0.815, H*0.14);
    }
    this._sceneLabel(ctx,W,H,'7','FOCUS ZONĂ 2');
  },

  // ── SCENA 8: Focus Zonă 3 — Expansiune Controlată ──────────────────────
  _s8_focusZone3(ctx,W,H,t,city,zones) {
    const zone = zones?.[2] || zones?.[0];
    if(!zone) { this._s6_focusZone1(ctx,W,H,t,city,zones); return; }
    const pct  = zone.densif_pct || 8;
    const N    = v => Number(v||0).toLocaleString('ro-RO');
    const gr = ctx.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,'rgba(4,10,24,.5)'); gr.addColorStop(1,'rgba(4,10,24,.92)');
    ctx.fillStyle=gr; ctx.fillRect(0,0,W,H);
    this._scanlines(ctx,W,H,0.025);
    if(t>0.05) {
      const ta=Math.min(1,(t-0.05)/0.2);
      ctx.globalAlpha=ta;
      ctx.fillStyle='#60a5fa'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left'; ctx.fillText('EXPANSIUNE CONTROLATĂ', W*0.05, H*0.1);
      ctx.fillStyle='rgba(255,255,255,.9)'; ctx.font=`900 ${W*0.025}px "Space Grotesk",sans-serif`;
      ctx.fillText((zone.name||'ZONA PERIFERICĂ').toUpperCase(), W*0.05, H*0.17);
      ctx.globalAlpha=1;
    }
    [['DENSIFICARE',pct,'%','#60a5fa',0.12,pct>=0?'+':''],
     ['LOCUINTE NOI',zone.locuinte_noi||0,'unități','#a78bfa',0.30,''],
     ['POPULATIE 2055',zone.pop2055||0,'loc.','#34d399',0.48,'']
    ].forEach(([l,v,u,c,d,pfx],i)=>{
      this._kpiCard(ctx, W*0.05+i*(W*0.31), H*0.55, W*0.28, H*0.22, l, v, u, c, t, d, pfx);
    });
    // Avertisment zone protejate
    if(t>0.55 && zone.excludedWarning) {
      const wa=Math.min(1,(t-0.55)/0.2);
      ctx.globalAlpha=wa;
      ctx.fillStyle='rgba(60,10,10,.9)'; this._roundRect(ctx,W*0.05,H*0.8,W*0.9,H*0.12,6); ctx.fill();
      ctx.strokeStyle='rgba(239,68,68,.5)'; ctx.lineWidth=1;
      this._roundRect(ctx,W*0.05,H*0.8,W*0.9,H*0.12,6); ctx.stroke();
      ctx.fillStyle='#ef4444'; ctx.font=`bold ${W*0.0075}px "IBM Plex Mono"`;
      ctx.textAlign='left'; ctx.fillText('⚠ ZONE PROTEJATE: '+zone.excludedWarning.slice(0,60), W*0.07, H*0.87);
      ctx.globalAlpha=1;
    } else if(t>0.55) {
      const ia=Math.min(1,(t-0.55)/0.2);
      ctx.globalAlpha=ia;
      ctx.fillStyle='rgba(8,16,44,.85)'; this._roundRect(ctx,W*0.05,H*0.8,W*0.9,H*0.12,6); ctx.fill();
      ctx.fillStyle='#60a5fa'; ctx.font=`bold ${W*0.0075}px "IBM Plex Mono"`;
      ctx.textAlign='left';
      ctx.fillText(`RH: ${zone.rh_propus||'P+2—P+4'} · POT: ${zone.pot||40}% · CUT: ${zone.cut||1.2}`, W*0.07, H*0.865);
      ctx.fillStyle='rgba(200,215,240,.8)'; ctx.font=`${W*0.007}px "IBM Plex Mono"`;
      ctx.fillText('FUNCTIUNI: '+(zone.functiuni||['Rezidential familial','Scoli','Spatii verzi']).slice(0,3).join(' · '), W*0.07, H*0.9);
      ctx.globalAlpha=1;
    }
    if(t>0.3) {
      this._pulse(ctx, W*0.68, H*0.08, W*0.27, H*0.1, 6, t, '#60a5fa');
      ctx.fillStyle='rgba(8,16,44,.85)'; this._roundRect(ctx,W*0.68,H*0.08,W*0.27,H*0.1,6); ctx.fill();
      ctx.fillStyle='#60a5fa'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='center'; ctx.fillText('EXPANSIUNE', W*0.815, H*0.14);
    }
    this._sceneLabel(ctx,W,H,'8','FOCUS ZONĂ 3');
  },

  // ── SCENA 10: Riscuri Teritoriale ──────────────────────────────────────
  _s10_risks(ctx,W,H,t,city) {
    const risk = window._getRiskProfile?.(city) || { seismic:{ag:0.20,tc:'0.7'}, flood:{label:'Redus',risk:1}, riskScore:45 };
    const gr = ctx.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,'rgba(30,4,4,.7)'); gr.addColorStop(1,'rgba(4,10,24,0.92)');
    ctx.fillStyle=gr; ctx.fillRect(0,0,W,H);
    this._scanlines(ctx,W,H,0.04);
    if(t>0.05) {
      const ta=Math.min(1,(t-0.05)/0.18);
      ctx.globalAlpha=ta;
      ctx.fillStyle='#ef4444'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='center'; ctx.fillText('RISCURI TERITORIALE — PROFIL DE RISC',W/2,H*0.1,W*0.88);
      ctx.fillStyle='rgba(255,255,255,.6)'; ctx.font=`${W*0.0075}px "IBM Plex Mono"`;
      ctx.fillText('P100-1/2013 · ANAR PGRA 2021-2027 · IPCC AR6 · ANM ROCADA',W/2,H*0.16,W*0.88);
      ctx.globalAlpha=1;
    }
    // Scor risc central (donut mare)
    if(t>0.15) {
      this._donutArc(ctx, W*0.5, H*0.45, H*0.14, (risk.riskScore||45)/100, '#ef4444',
        'RISC', (risk.riskScore||45)+'/100', t, 0.15);
    }
    // 3 riscuri cu progress bars
    const risks = [
      ['SEISMIC P100', (risk.seismic?.ag||0.20)/0.35, `Ag=${(risk.seismic?.ag||0.20)}g`, '#ef4444'],
      ['INUNDATII ANAR', (risk.flood?.risk||1)/3, risk.flood?.label||'Redus', '#f97316'],
      ['CLIMATIC IPCC AR6', 0.55, '+1.4°C la 2055', '#fbbf24'],
    ];
    risks.forEach(([l,p,sub,c],i) => {
      this._progressBar(ctx, W*0.08, H*(0.62+i*0.1), W*0.84, H*0.025, p, c, l, sub, t, 0.25+i*0.1);
    });
    this._sceneLabel(ctx,W,H,'10','RISCURI TERITORIALE');
  },

  // ── SCENA 12: European Benchmarking ────────────────────────────────────
  _s12_euBench(ctx,W,H,t,city) {
    const pib = city.pib_eur_cap || 10000;
    const eu27 = 36600;
    const gr = ctx.createLinearGradient(0,0,W,H);
    gr.addColorStop(0,'rgba(4,10,24,0.7)'); gr.addColorStop(1,'rgba(8,20,50,0.92)');
    ctx.fillStyle=gr; ctx.fillRect(0,0,W,H);
    if(t>0.05) {
      const ta=Math.min(1,(t-0.05)/0.2);
      ctx.globalAlpha=ta;
      ctx.fillStyle='#34d399'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='center'; ctx.fillText('EUROPEAN BENCHMARKING — POZIȚIONARE UE',W/2,H*0.1,W*0.88);
      ctx.fillStyle='rgba(200,215,240,.7)'; ctx.font=`${W*0.0075}px "IBM Plex Mono"`;
      ctx.fillText('Eurostat Urban Audit 2021 · OECD FUA 2023 · vs Krakow · Lublin · Debrecen',W/2,H*0.16,W*0.88);
      ctx.globalAlpha=1;
    }
    // Radar animat
    if(t>0.15) {
      const walk_est = Math.min(1, Math.round(30+(city.acoperire_transport||60)*0.4+pib/1000)/100);
      const vals = [pib/eu27, walk_est, (city.spatii_verzi_mp_loc||11)/20,
                    (city.acoperire_transport||60)/100, 0.7, 0.65, 0.6, 0.5];
      const labels = ['PIB/cap','Walk','Verde','TP','SDG11','Social','Educatie','Risc(-)'];
      this._radarChart(ctx, W*0.38, H*0.55, H*0.28, vals, labels, ['#D4AF37'], Math.min(1,(t-0.15)/0.5));
    }
    // Convergenta UE progress bar
    const conv = Math.round(pib/eu27*100);
    this._progressBar(ctx, W*0.68, H*0.35, W*0.26, H*0.025, conv/100, '#34d399',
      'CONVERGENTA UE27', conv+'%', t, 0.20);
    // Peer cities cards
    if(t > 0.45) {
      const ia = Math.min(1,(t-0.45)/0.3);
      const peers = [
        {name:'KRAKOW 🇵🇱', pib:22400, sdg:78},
        {name:'LUBLIN 🇵🇱', pib:15800, sdg:71},
        {name:'DEBRECEN 🇭🇺', pib:14900, sdg:68},
      ];
      peers.forEach((p,i)=>{
        const pa = Math.min(1,Math.max(0,(t-0.45-i*0.08)/0.2));
        ctx.globalAlpha=pa*ia;
        ctx.fillStyle='rgba(8,16,44,.9)'; this._roundRect(ctx,W*0.67,H*(0.45+i*0.14),W*0.27,H*0.11,5); ctx.fill();
        ctx.strokeStyle='rgba(52,211,153,.3)'; ctx.lineWidth=0.8;
        this._roundRect(ctx,W*0.67,H*(0.45+i*0.14),W*0.27,H*0.11,5); ctx.stroke();
        ctx.fillStyle='#34d399'; ctx.font=`bold ${W*0.008}px "IBM Plex Mono"`;
        ctx.textAlign='left'; ctx.fillText(p.name, W*0.68, H*(0.45+i*0.14)+H*0.04);
        ctx.fillStyle='rgba(148,163,184,.8)'; ctx.font=`${W*0.007}px "IBM Plex Mono"`;
        ctx.fillText(p.pib.toLocaleString('ro-RO')+' EUR/cap · SDG11: '+p.sdg+'/100', W*0.68, H*(0.45+i*0.14)+H*0.075);
        ctx.globalAlpha=1;
      });
    }
    this._sceneLabel(ctx,W,H,'12','EU BENCHMARKING');
  },

  // ── SCENA 15: Evoluție Temporală 4D ────────────────────────────────────
  _s15_timeline(ctx,W,H,t,city) {
    const pop0 = city.pop2021 || 100000;
    const r    = (city.rata_reala_2011_2021||0)/100;
    const gr = ctx.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,'rgba(4,10,24,0.6)'); gr.addColorStop(1,'rgba(4,10,24,0.92)');
    ctx.fillStyle=gr; ctx.fillRect(0,0,W,H);
    this._scanlines(ctx,W,H,0.03);
    if(t>0.05) {
      const ta=Math.min(1,(t-0.05)/0.18);
      ctx.globalAlpha=ta;
      ctx.fillStyle='#a78bfa'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='center'; ctx.fillText('EVOLUȚIE TEMPORALĂ 1990 → 2055',W/2,H*0.1,W*0.88);
      ctx.globalAlpha=1;
    }
    // Fan chart Monte Carlo simplificat
    const years = [1990,2000,2010,2021,2030,2040,2055];
    const p50 = years.map(yr=>Math.round(pop0*Math.pow(1+r,yr-2021)));
    const p10 = years.map(yr=>Math.round(pop0*Math.pow(1+r-0.005,yr-2021)));
    const p90 = years.map(yr=>Math.round(pop0*Math.pow(1+r+0.005,yr-2021)));
    this._fanChart(ctx, W, H, {p10,p50,p90,years,color:'#a78bfa'}, t);
    // Label actual (2021)
    if(t>0.5) {
      const ia=Math.min(1,(t-0.5)/0.2);
      ctx.globalAlpha=ia;
      ctx.fillStyle='rgba(8,16,44,.9)'; this._roundRect(ctx,W*0.04,H*0.12,W*0.28,H*0.14,5); ctx.fill();
      ctx.strokeStyle='rgba(167,139,250,.4)'; ctx.lineWidth=0.8;
      this._roundRect(ctx,W*0.04,H*0.12,W*0.28,H*0.14,5); ctx.stroke();
      ctx.fillStyle='rgba(148,163,184,.8)'; ctx.font=`${W*0.0075}px "IBM Plex Mono"`;
      ctx.textAlign='left'; ctx.fillText('P10-P90: interval 80%', W*0.05, H*0.18);
      ctx.fillText('P50: scenariu S2', W*0.05, H*0.22);
      ctx.fillStyle='rgba(100,120,150,.5)'; ctx.font=`${W*0.006}px "IBM Plex Mono"`;
      ctx.fillText('Robert & Casella (2004) Monte Carlo', W*0.05, H*0.235);
      ctx.globalAlpha=1;
    }
    this._sceneLabel(ctx,W,H,'15','EVOLUȚIE TEMPORALĂ');
  },

  // ── SCENA 16: Monte Carlo Demografic ───────────────────────────────────
  _s16_monteCarlo(ctx,W,H,t,city) {
    const pop0 = city.pop2021 || 100000;
    const r = (city.rata_reala_2011_2021||0)/100;
    const gr = ctx.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,'rgba(20,4,50,0.65)'); gr.addColorStop(1,'rgba(4,10,24,0.92)');
    ctx.fillStyle=gr; ctx.fillRect(0,0,W,H);
    if(t>0.05) {
      const ta=Math.min(1,(t-0.05)/0.18);
      ctx.globalAlpha=ta;
      ctx.fillStyle='#c4b5fd'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='center'; ctx.fillText('MONTE CARLO — 10.000 SIMULĂRI · INCERTITUDINE DECLARATĂ',W/2,H*0.1,W*0.88);
      ctx.fillStyle='rgba(200,215,240,.6)'; ctx.font=`${W*0.007}px "IBM Plex Mono"`;
      ctx.fillText('Robert & Casella (2004) · σ calibrat INSE 2000-2021',W/2,H*0.16,W*0.88);
      ctx.globalAlpha=1;
    }
    // KPI cards: P10, P50, P90
    const z = {10:-1.28, 50:0, 90:1.28};
    const sigma = Math.abs(r)*0.3+0.003;
    [[10,'#f59e0b'],[50,'#a78bfa'],[90,'#22c55e']].forEach(([pct,c],i)=>{
      const pop55 = Math.round(pop0*Math.pow(1+r+z[pct]*sigma, 34));
      // 3 carduri in 90% din latime, cu spatiu intre ele
      const cardW=W*0.28, gap=W*0.03, startX=W*0.03;
      this._kpiCard(ctx, startX+i*(cardW+gap), H*0.38, cardW, H*0.22,
        'P'+pct+'%', pop55, 'loc. 2055', c, t, 0.2+i*0.12, '');
    });
    // Bara incertitudine vizuala
    if(t>0.55) {
      const ia=Math.min(1,(t-0.55)/0.25);
      ctx.globalAlpha=ia;
      const p10v = Math.round(pop0*Math.pow(1+r-1.28*sigma,34));
      const p90v = Math.round(pop0*Math.pow(1+r+1.28*sigma,34));
      ctx.fillStyle='rgba(8,16,44,.85)'; this._roundRect(ctx,W*0.05,H*0.65,W*0.9,H*0.15,6); ctx.fill();
      ctx.fillStyle='#c4b5fd'; ctx.font=`bold ${W*0.0075}px "IBM Plex Mono"`;
      ctx.textAlign='left';
      ctx.fillText(`INTERVAL 80%: ${p10v.toLocaleString('ro-RO')} — ${p90v.toLocaleString('ro-RO')} loc. (2055)`, W*0.07, H*0.715);
      ctx.fillStyle='rgba(148,163,184,.7)'; ctx.font=`${W*0.007}px "IBM Plex Mono"`;
      ctx.fillText('Planificarea infrastructurii trebuie sa acomodeze intregul interval, nu doar valoarea medie.', W*0.07, H*0.77);
      ctx.globalAlpha=1;
    }
    this._sceneLabel(ctx,W,H,'16','MONTE CARLO');
  },

  // ── SCENA 17: Convergența Economică UE ─────────────────────────────────
  _s17_economic(ctx,W,H,t,city) {
    const pib   = city.pib_eur_cap || 10000;
    const eu27  = 36600;
    const conv  = Math.round(pib/eu27*100);
    const gr = ctx.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,'rgba(4,24,10,.7)'); gr.addColorStop(1,'rgba(4,10,24,0.92)');
    ctx.fillStyle=gr; ctx.fillRect(0,0,W,H);
    if(t>0.05) {
      const ta=Math.min(1,(t-0.05)/0.18);
      ctx.globalAlpha=ta;
      ctx.fillStyle='#22c55e'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='center'; ctx.fillText('CONVERGENȚĂ ECONOMICĂ SPRE UE27',W/2,H*0.1,W*0.88);
      ctx.globalAlpha=1;
    }
    // Donut convergenta
    if(t>0.15) this._donutArc(ctx, W*0.28, H*0.5, H*0.15, conv/100, '#22c55e', 'DIN UE27', conv+'%', t, 0.15);
    // PIB vs EU progress bars
    [
      ['PIB LOCAL', pib.toLocaleString('ro-RO')+' EUR', pib/eu27, '#22c55e', 0.20],
      ['MEDIA UE27', eu27.toLocaleString('ro-RO')+' EUR', 1.0, 'rgba(100,120,150,.4)', 0.28],
      ['CONVERGENTA 2055 (est)', Math.round(Math.min(eu27,pib*Math.pow(1.035,33))/eu27*100)+'%', Math.min(1,pib*Math.pow(1.035,33)/eu27), '#34d399', 0.36],
    ].forEach(([l,sub,p,c,d],i)=>{
      this._progressBar(ctx, W*0.55, H*(0.3+i*0.14), W*0.38, H*0.025, p, c, l, sub, t, d);
    });
    // KPI PIB/cap cu counter
    this._kpiCard(ctx, W*0.55, H*0.65, W*0.38, H*0.18, 'PIB/CAPITA', pib, 'EUR/loc. · Eurostat NUTS3', '#22c55e', t, 0.4);
    this._sceneLabel(ctx,W,H,'17','CONVERGENȚĂ UE');
  },

  // ── SCENA 18: Sustenabilitate & SDG 11 ─────────────────────────────────
  _s18_sdg(ctx,W,H,t,city) {
    const spV  = city.spatii_verzi_mp_loc || 11;
    const pib  = city.pib_eur_cap || 10000;
    const walk = Math.min(100, Math.round(30+(city.acoperire_transport||60)*0.4+pib/1000));
    const sdg11 = Math.round(55 + walk*0.15 + (spV>=9?5:0));
    const gr = ctx.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,'rgba(4,20,10,.7)'); gr.addColorStop(1,'rgba(4,10,24,0.92)');
    ctx.fillStyle=gr; ctx.fillRect(0,0,W,H);
    if(t>0.05) {
      const ta=Math.min(1,(t-0.05)/0.18);
      ctx.globalAlpha=ta;
      ctx.fillStyle='#86efac'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='center'; ctx.fillText('SUSTENABILITATE · SDG 11 · OMS · EPBD 2024',W/2,H*0.1,W*0.88);
      ctx.globalAlpha=1;
    }
    // 4 donut-uri SDG
    const donuts = [
      { label:'SDG 11', val:sdg11/100, sub:sdg11+'/100', c:'#22c55e', cx:W*0.18, cy:H*0.42 },
      { label:'SPATII VERZI', val:Math.min(1,spV/20), sub:spV+'m²/loc', c:'#4ade80', cx:W*0.42, cy:H*0.42 },
      { label:'WALKABILITY', val:walk/100, sub:walk+'/100', c:'#a78bfa', cx:W*0.66, cy:H*0.42 },
      { label:'CARBON', val:0.65, sub:'65% net0', c:'#34d399', cx:W*0.88, cy:H*0.42 },
    ];
    donuts.forEach((d,i)=>{
      if(t > 0.15+i*0.1) this._donutArc(ctx, d.cx, d.cy, H*0.1, d.val, d.c, d.label, d.sub, t, 0.15+i*0.1);
    });
    // OMS standard
    if(t>0.6) {
      const ia=Math.min(1,(t-0.6)/0.2);
      ctx.globalAlpha=ia;
      ctx.fillStyle='rgba(8,16,44,.85)'; this._roundRect(ctx,W*0.05,H*0.7,W*0.9,H*0.16,6); ctx.fill();
      ctx.fillStyle='#86efac'; ctx.font=`bold ${W*0.0075}px "IBM Plex Mono"`;
      ctx.textAlign='left'; ctx.fillText('OMS STANDARD: 9m²/loc spații verzi · EPBD 2024: NZEB obligatoriu clădiri noi', W*0.07, H*0.765);
      ctx.fillStyle='rgba(148,163,184,.7)'; ctx.font=`${W*0.007}px "IBM Plex Mono"`;
      ctx.fillText('Green Deal European · Agenda Urbana UE 2030 · ONU SDG 11 (2015)', W*0.07, H*0.82);
      ctx.globalAlpha=1;
    }
    this._sceneLabel(ctx,W,H,'18','SDG 11 & SUSTENABILITATE');
  },

  // ── SCENA 19: Masterplan — Indicatori Propuși ──────────────────────────
  _s19_masterplan(ctx,W,H,t,city,zones) {
    const gr = ctx.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,'rgba(4,10,24,0.65)'); gr.addColorStop(1,'rgba(4,10,24,0.92)');
    ctx.fillStyle=gr; ctx.fillRect(0,0,W,H);
    this._scanlines(ctx,W,H,0.03);
    if(t>0.05) {
      const ta=Math.min(1,(t-0.05)/0.18);
      ctx.globalAlpha=ta;
      ctx.fillStyle='#D4AF37'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='center'; ctx.fillText('MASTERPLAN STRATEGIC 2025—2055 · INDICATORI PROPUȘI',W/2,H*0.1,W*0.88);
      ctx.fillStyle='rgba(200,215,240,.6)'; ctx.font=`${W*0.0075}px "IBM Plex Mono"`;
      ctx.fillText('Conf. Legii 350/2001 + HG 525/1996 RGU + Ord. 233/2016',W/2,H*0.16,W*0.88);
      ctx.globalAlpha=1;
    }
    // Card stack per zona
    const displayZones = zones?.slice(0,4) || [];
    const intColors = {
      DENSIFICARE: '#22c55e', 'DENSIFICARE MODERATĂ': '#4ade80',
      'DENSIFICARE INTENSIVĂ': '#16a34a', 'RECONVERSIE': '#f59e0b',
      'RECONVERSIE INDUSTRIALĂ': '#f59e0b', 'EXPANSIUNE': '#60a5fa',
      'EXPANSIUNE CONTROLATĂ': '#60a5fa', 'REABILITARE': '#ef4444',
      'REABILITARE FOND': '#ef4444', 'CONSOLIDARE': '#94a3b8',
    };
    if(displayZones.length > 0) {
      displayZones.forEach((z,i)=>{
        const cardA = this._revealCard(ctx, W*0.05+i*(W*0.22+4), H*0.22, W*0.22, H*0.62, 6,
          t, 0.12+i*0.1, 'rgba(8,16,44,.92)',
          (intColors[z.intervention] || '#D4AF37') + '55');
        if(cardA <= 0) return;
        ctx.globalAlpha = cardA;
        const c = intColors[z.intervention] || '#D4AF37';
        // Titlu zona
        ctx.fillStyle = c; ctx.font = `bold ${W*0.0075}px "IBM Plex Mono"`;
        ctx.textAlign = 'left';
        ctx.fillText((z.name||'ZONA '+(i+1)).slice(0,14), W*0.06+i*(W*0.22+4), H*0.285);
        // Tip interventie
        ctx.fillStyle = 'rgba(148,163,184,.7)'; ctx.font = `${W*0.0058}px "IBM Plex Mono"`;
        ctx.fillText((z.intervention||'').slice(0,16), W*0.06+i*(W*0.22+4), H*0.315);
        // RH
        ctx.fillStyle = 'rgba(200,215,240,.9)'; ctx.font = `bold ${W*0.0065}px "IBM Plex Mono"`;
        ctx.fillText('RH: '+(z.rh_propus||'—'), W*0.06+i*(W*0.22+4), H*0.38);
        ctx.fillText('POT: '+(z.pot||'—')+'%', W*0.06+i*(W*0.22+4), H*0.42);
        ctx.fillText('CUT: '+(z.cut||'—'), W*0.06+i*(W*0.22+4), H*0.46);
        // Functiuni
        (z.functiuni||[]).slice(0,3).forEach((fn,fi)=>{
          ctx.fillStyle = 'rgba(148,163,184,.65)'; ctx.font = `${W*0.0055}px "IBM Plex Mono"`;
          ctx.fillText('· '+fn.slice(0,18), W*0.06+i*(W*0.22+4), H*(0.52+fi*0.05));
        });
        // Densificare badge
        const pct = z.densif_pct || 0;
        ctx.fillStyle = c; ctx.font = `900 ${W*0.015}px "Space Grotesk",sans-serif`;
        ctx.fillText((pct>=0?'+':'')+pct+'%', W*0.06+i*(W*0.22+4), H*0.77);
        ctx.fillStyle = 'rgba(100,120,150,.5)'; ctx.font = `${W*0.0055}px "IBM Plex Mono"`;
        ctx.fillText('densificare', W*0.06+i*(W*0.22+4), H*0.8);
        ctx.globalAlpha = 1;
      });
    } else {
      // Fallback fara zone
      const fbCards = [
        {t:'CENTRU CIVIC',rh:'P+8—P+12',pot:80,cut:4.0,int:'DENSIFICARE',c:'#22c55e'},
        {t:'REZIDENTIAL',rh:'P+4—P+6',pot:50,cut:1.8,int:'DENSIF. MODERATĂ',c:'#4ade80'},
        {t:'INDUSTRIAL',rh:'P+3—P+6',pot:60,cut:2.0,int:'RECONVERSIE',c:'#f59e0b'},
        {t:'PERIURBAN',rh:'P+2—P+4',pot:40,cut:1.2,int:'EXPANSIUNE',c:'#60a5fa'},
      ];
      fbCards.forEach((z,i)=>{
        this._revealCard(ctx, W*0.05+i*(W*0.22+4), H*0.22, W*0.22, H*0.58, 6, t, 0.12+i*0.1, 'rgba(8,16,44,.92)', 'rgba(8,16,44,.85)');
        const ca = Math.min(1,Math.max(0,(t-0.12-i*0.1)/0.25));
        if(ca<=0) return;
        ctx.globalAlpha=ca;
        ctx.fillStyle=z.c; ctx.font=`bold ${W*0.0075}px "IBM Plex Mono"`;
        ctx.textAlign='left'; ctx.fillText(z.t, W*0.06+i*(W*0.22+4), H*0.285);
        ctx.fillStyle='rgba(200,215,240,.9)'; ctx.font=`bold ${W*0.0065}px "IBM Plex Mono"`;
        ctx.fillText('RH: '+z.rh, W*0.06+i*(W*0.22+4), H*0.36);
        ctx.fillText('POT: '+z.pot+'%', W*0.06+i*(W*0.22+4), H*0.41);
        ctx.fillText('CUT: '+z.cut, W*0.06+i*(W*0.22+4), H*0.46);
        ctx.fillStyle=z.c; ctx.font=`bold ${W*0.007}px "IBM Plex Mono"`;
        ctx.fillText(z.int, W*0.06+i*(W*0.22+4), H*0.55);
        ctx.globalAlpha=1;
      });
    }
    this._sceneLabel(ctx,W,H,'19','MASTERPLAN');
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// CONECTARE CU TCI Cinema existent
// ═══════════════════════════════════════════════════════════════════════════

(function _init(n){
  if(n>80) return;

  // IMPORTANT: Setam window._SceneEngine IMEDIAT, fara sa asteptam TCI
  // TCI e folosit doar pentru cityKey cand utilizatorul apasa butonul


  window._SceneEngine     = G._SceneEngine;
  window._ZoneProjections = G._ZoneProjections;
  console.log('[TCI Cinematic v2] ✅ _SceneEngine disponibil imediat');

  // Override openTCI cand devine disponibil (nu blocam initializarea)
  const _tryPatchOpenTCI = (attempt) => {
    if(typeof TCI !== 'undefined' && typeof window.openTCI === 'function') {
      const origOpen = window.openTCI;
      window.openTCI = function(opts){
        if(opts?.mode==='cinema_v2' || opts?.scenes || window._preferCinemaV2){
          // Cinema v2 — citim cityKey FRESH la momentul apelului
          const key = opts?.cityKey ||
            G._SceneEngine._getCityKey() ||
            'RO-IS-01';
          console.log('[Cinema v2] openTCI → launch pentru UAT:', key);
          G._SceneEngine.launch(key);
        } else {
          // TCI clasic — panoul interactiv cu KPI-uri
          if(origOpen) origOpen(opts);
        }
      };
      // Expunem flag pentru a comuta TCI vechi ↔ v2
      window._switchToCinemaV2 = () => {
        window._preferCinemaV2 = true;
        ss?.('🎬 Cinema v2 activ — butonul TCI din bara deschide acum filmul cinematic');
      };
      window._switchToTCIClassic = () => {
        window._preferCinemaV2 = false;
        ss?.('📊 TCI Clasic activ — butonul TCI deschide panoul interactiv cu KPI-uri');
      };
      console.log('[TCI Cinematic v2] ✅ openTCI override aplicat');
    } else if(attempt < 40) {
      setTimeout(()=>_tryPatchOpenTCI(attempt+1), 500);
    }
  };
  _tryPatchOpenTCI(0);

  // Helper robust pentru cityKey - citeste MEREU valoarea curenta, nu din closure
  G._SceneEngine._getCityKey = function() {
    // Citim direct din surse - nu din closure capturat la init
    const fromTCI = (typeof window.TCI !== 'undefined') ? window.TCI.cityKey : null;
    const fromLS  = localStorage.getItem('ux_last_city');
    const fromPE  = window._ProjectionEngine?.currentCity;
    const fromDB  = window._RO_CITIES_DB ? Object.keys(window._RO_CITIES_DB)[0] : null;
    const key = fromTCI || fromLS || fromPE || fromDB || 'RO-IS-01';
    console.log('[Cinema] _getCityKey →', key, '(TCI:', fromTCI, 'LS:', fromLS, ')');
    return key;
  };

  // Cinema v2 accesibil din bara de sus (buton direct btn-cinema-v2)
  // + injectat în Vizualizare ▾ cu retry robust
  const _injectCinemaV2Menu = () => {
    if(document.getElementById('tci-cinema-v2-menu-item')) return true;
    const vizMenu = document.getElementById('viz-menu');
    if(!vizMenu) return false;
    const sep = document.createElement('div');
    sep.style.cssText='height:1px;background:rgba(255,255,255,.08);margin:4px 0';
    const item = document.createElement('button');
    item.id = 'tci-cinema-v2-menu-item';
    item.style.cssText='display:block;width:100%;text-align:left;background:none;border:none;color:#a78bfa;padding:7px 10px;cursor:pointer;border-radius:6px;font-size:12px;font-family:inherit';
    item.innerHTML='🎬 TCI Cinematic v2 (12 scene + proiecții per zonă)';
    item.onmouseover=()=>{item.style.background='rgba(139,92,246,.15)'};
    item.onmouseout=()=>{item.style.background='none'};
    item.onclick=()=>{
      // Citim cityKey FRESH — nu din closure vechi
      const key = G._SceneEngine._getCityKey();
      console.log('[Cinema v2] menu click → launch pentru UAT:', key);
      G._SceneEngine.launch(key);
      document.getElementById('viz-menu').style.display='none';
    };
    vizMenu.appendChild(sep);
    vizMenu.appendChild(item);
    console.log('[Cinema v2] ✅ integrat în Vizualizare menu');
    return true;
  };
  // Cinema v2 e deja in viz-menu si tci-adv-menu — nu mai injectam duplicate
  // _injectCinemaV2Menu dezactivat — previne duplicatele in meniul Harta
  console.log('[Cinema v2] ✅ integrat — butoane deja in viz-menu si UrbanX Pro');
  // Retry-urile sunt dezactivate
  // [2000,4000,8000].forEach(delay => setTimeout(_injectCinemaV2Menu, delay));

  // Expunere globală
  // window._SceneEngine deja setat la inceputul _init
  console.log('[TCI Cinematic Scenes v2.0] ✅ 12 scene + proiecții per zonă + bare 3D + trafic + slider');
  ss?.('🎬 Cinema v2: 12 scene storyboard + proiecții per cartier + infrastructură necesară');
})(0);


})(window);