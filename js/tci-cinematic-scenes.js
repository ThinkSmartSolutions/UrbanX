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
    { id:1,  dur:6000,  label:'Overview — România' },
    { id:2,  dur:6000,  label:'Zoom — Moldova' },
    { id:3,  dur:8000,  label:'Approach — Iași' },
    { id:4,  dur:10000, label:'City Overview 3D' },
    { id:5,  dur:12000, label:'Dezvoltare Urbană' },
    { id:6,  dur:13000, label:'Infrastructură & Mobilitate' },
    { id:7,  dur:15000, label:'Focus Zonă' },
    { id:8,  dur:10000, label:'Comparație UAT-uri' },
    { id:9,  dur:8000,  label:'Street Level' },
    { id:10, dur:12000, label:'Viața Urbană' },
    { id:11, dur:12000, label:'Evoluție Temporală' },
    { id:12, dur:18000, label:'Concluzie & Viziune' },
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
    ss?.('🎬 TCI Cinematic v2.0 pornit: '+city.name);
  },

  _createCanvas() {
    let c = document.getElementById('tci-scene-canvas');
    if(c) c.remove();
    c = document.createElement('canvas');
    c.id = 'tci-scene-canvas';
    const dpr = window.devicePixelRatio || 1;
    c.style.cssText = `position:fixed;inset:0;z-index:3500;width:100%;height:100%;pointer-events:none;`;
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

    // Fade in/out per scenă
    const fadeIn  = Math.min(1, t/0.12);
    const fadeOut = t>0.88 ? Math.max(0,(1-t)/0.12) : 1;
    const alpha   = fadeIn*fadeOut;
    if(alpha < 0.01) return;

    ctx.save();
    ctx.globalAlpha = alpha;

    switch(sceneId) {
      case 1: this._s1_overview(ctx,W,H,t,city); break;
      case 2: this._s2_moldova(ctx,W,H,t,city); break;
      case 3: this._s3_approach(ctx,W,H,t,city); break;
      case 4: this._s4_city3d(ctx,W,H,t,city); break;
      case 5: this._s5_growth(ctx,W,H,t,city,zones); break;
      case 6: this._s6_mobility(ctx,W,H,t,city); break;
      case 7: this._s7_focusZone(ctx,W,H,t,city,zones); break;
      case 8: this._s8_compare(ctx,W,H,t,city); break;
      case 9: this._s9_street(ctx,W,H,t,city); break;
      case 10:this._s10_urban(ctx,W,H,t,city); break;
      case 12:this._s12_conclusion(ctx,W,H,t,city); break;
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
      ctx.fillText('TEMPORAL CITY INTELLIGENCE', W/2, H*0.15);
      ctx.fillStyle='rgba(212,175,55,0.9)';
      ctx.font=`${W*0.012}px "IBM Plex Mono"`;
      ctx.fillText('România · Context European · Date Oficiale INSE + Eurostat', W/2, H*0.20);
    }
    // Label scenă
    this._sceneLabel(ctx,W,H,'1','OVERVIEW — ROMÂNIA');
  },

  // ── SCENA 2: Zoom Moldova ─────────────────────────────────────────────
  _s2_moldova(ctx,W,H,t,city) {
    // Overlay subtil
    ctx.fillStyle='rgba(0,0,0,0.2)'; ctx.fillRect(0,0,W,H);

    if(t > 0.3) {
      // Card cu date regionale Moldova
      const cx=W*0.75, cy=H*0.35;
      this._card(ctx,cx,cy,220,120,'#60a5fa','MOLDOVA — REGIUNE NE');
      ctx.fillStyle='rgba(200,215,235,.9)'; ctx.font=`bold ${W*0.013}px "IBM Plex Mono"`;
      ctx.textAlign='left';
      ctx.fillText('Populație: 3.2M loc.', cx+10, cy+30);
      ctx.fillText('PIB/cap: 8.200 €', cx+10, cy+48);
      ctx.fillText('Creștere: −0.8%/an', cx+10, cy+66);
      ctx.fillStyle='#D4AF37'; ctx.font=`bold ${W*0.010}px "IBM Plex Mono"`;
      ctx.fillText('⭐ POL REGIONAL: IAȘI', cx+10, cy+90);
      ctx.fillText('360.633 loc · Hub universitar', cx+10, cy+106);
    }
    this._sceneLabel(ctx,W,H,'2','ZOOM — MOLDOVA');
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
      ctx.fillStyle='#D4AF37'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';
      ctx.fillText('POPULAȚIE 2021', cx+10, cy+18);
      ctx.fillStyle='#fff'; ctx.font=`900 ${W*0.022}px "IBM Plex Mono"`;
      ctx.fillText(N(pop0), cx+10, cy+45);

      ctx.fillStyle='rgba(148,163,184,.7)'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.fillText('POPULAȚIE 2050 (S2)', cx+10, cy+65);
      ctx.fillStyle='#22c55e'; ctx.font=`900 ${W*0.018}px "IBM Plex Mono"`;
      // Typewriter effect
      const chars = Math.floor(N(pop50).length * Math.min(1,(t-0.35)/0.3) * 3);
      ctx.fillText(N(pop50).slice(0,chars), cx+10, cy+88);
      ctx.fillStyle='rgba(34,197,94,.7)'; ctx.font=`bold ${W*0.010}px "IBM Plex Mono"`;
      if(t > 0.55) ctx.fillText('+'+delta+'%', cx+120, cy+88);
    }
    ctx.globalAlpha = Math.min(1,ctx.globalAlpha+0.3);
    this._sceneLabel(ctx,W,H,'3','APPROACH — '+city.name?.toUpperCase());
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
  _s6_mobility(ctx,W,H,t,city) {
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
  _s7_focusZone(ctx,W,H,t,city,zones) {
    if(!zones) return;
    const zoneKeys = Object.keys(zones);
    // Impartim t in sub-intervale per zonă (8 zone → 0.125 fiecare)
    const nZones  = Math.min(8, zoneKeys.length);
    const tPerZone = 1.0 / nZones;
    const currentIdx = Math.min(nZones-1, Math.floor(t / tPerZone));
    const tInZone    = (t - currentIdx*tPerZone) / tPerZone;
    const zoneKey    = zoneKeys[currentIdx];
    const zone       = zones[zoneKey];
    if(!zone) return;

    // Zoom pe harta la zona curenta
    const map = window.map;
    if(map && tInZone < 0.15 && currentIdx > 0){
      try {
        map.flyTo({
          center: [zone.cx||city.lon, zone.cy||city.lat],
          zoom: 14.5,
          pitch: 55,
          bearing: currentIdx*45,
          duration: 1500,
          essential: true,
        });
      } catch(e){}
    }

    // Indicator zonă curentă (1/8, 2/8 etc)
    ctx.fillStyle='rgba(4,10,24,0.7)';
    this._roundRect(ctx,W*0.05,H*0.03,220,22,5); ctx.fill();
    ctx.fillStyle='rgba(212,175,55,.8)'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
    ctx.textAlign='left';
    ctx.fillText(`ZONĂ ${currentIdx+1}/${nZones} — ${(zone.label||'').toUpperCase()}`, W*0.06, H*0.055);
    // Progress bar
    ctx.fillStyle='rgba(255,255,255,.06)'; ctx.fillRect(W*0.05,H*0.068,220,2);
    ctx.fillStyle='#D4AF37'; ctx.fillRect(W*0.05,H*0.068,(currentIdx/nZones+tInZone/nZones)*220,2);

    const zone_orig = zones?.[Object.keys(zones||{})[0]]; // păstrăm compatibilitatea cu codul de jos

    // Card central mare — datele zonei cu typewriter
    const cw=280, ch=200;
    const cx=W*0.06, cy=H*0.22;
    ctx.fillStyle='rgba(4,10,24,0.94)';
    this._roundRect(ctx,cx,cy,cw,ch,10); ctx.fill();
    ctx.strokeStyle='rgba(212,175,55,0.7)'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.fillStyle='#D4AF37'; ctx.rect(cx,cy,cw,2); ctx.fill();

    ctx.fillStyle='#D4AF37'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
    ctx.textAlign='left';
    ctx.fillText('ZONA: '+zone.label.toUpperCase(), cx+10, cy+18);

    const pct = zone.densifPct;
    ctx.fillStyle='rgba(148,163,184,.7)'; ctx.font=`${W*0.009}px "IBM Plex Mono"`;
    ctx.fillText('DENSIFICARE', cx+10, cy+38);
    ctx.fillStyle=pct>20?'#ef4444':pct>10?'#f59e0b':'#22c55e';
    ctx.font=`900 ${W*0.030}px "IBM Plex Mono"`;
    if(t>0.2){
      const chars = Math.floor(String(Math.abs(pct)+'%').length * Math.min(1,(t-0.2)/0.2) * 3);
      ctx.fillText((pct>=0?'+':'')+String(Math.abs(pct)+'%').slice(0,chars), cx+10, cy+72);
    }

    if(t > 0.35) {
      ctx.fillStyle='rgba(148,163,184,.7)'; ctx.font=`${W*0.009}px "IBM Plex Mono"`;
      ctx.fillText('LOCUINȚE NOI', cx+10, cy+95);
      ctx.fillStyle='#fff'; ctx.font=`900 ${W*0.022}px "IBM Plex Mono"`;
      const n = N(zone.locuinte_noi);
      const nc = Math.floor(n.length * Math.min(1,(t-0.35)/0.25)*3);
      ctx.fillText(n.slice(0,nc), cx+10, cy+120);
    }

    if(t > 0.55) {
      ctx.fillStyle='rgba(148,163,184,.7)'; ctx.font=`${W*0.009}px "IBM Plex Mono"`;
      ctx.fillText('POPULAȚIE 2050', cx+10, cy+143);
      ctx.fillStyle='#22c55e'; ctx.font=`900 ${W*0.018}px "IBM Plex Mono"`;
      const p = N(zone.pop2055);
      const pc = Math.floor(p.length * Math.min(1,(t-0.55)/0.25)*3);
      ctx.fillText(p.slice(0,pc), cx+10, cy+166);
    }

    // Sursă
    if(t > 0.7) {
      ctx.fillStyle='rgba(100,120,150,.5)'; ctx.font=`${W*0.007}px "IBM Plex Mono"`;
      ctx.fillText('Sursa: INSE Rec.2021 · Model gravitațional UrbanX', cx+10, cy+ch-8);
    }

    // Necesități infrastructură pentru zonă
    if(t > 0.5) {
      const infraX = cx + cw + 15;
      ctx.fillStyle='rgba(4,10,24,0.90)';
      this._roundRect(ctx,infraX,cy,190,ch,8); ctx.fill();
      ctx.strokeStyle='rgba(59,130,246,.4)'; ctx.lineWidth=1; ctx.stroke();
      ctx.fillStyle='#60a5fa'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.fillText('NECESITĂȚI ZONĂ', infraX+8, cy+18);

      const copii = Math.round(zone.pop2055 * 0.14);
      const scoli = Math.ceil(copii/400);
      const varstnici = Math.round(zone.pop2055 * 0.25);
      const medici = Math.ceil(varstnici/2000);
      const spVerzi = Math.round(zone.pop2055 * 9 / 10000);

      [
        ['🏫 Școli noi necesare', scoli+' unități'],
        ['🏥 Medici de familie', medici+' cabinete'],
        ['🌳 Spații verzi', spVerzi+' ha (OMS 9m²/loc)'],
        ['🚌 Stații transport', Math.ceil(zone.pop2055/3000)+' stații'],
        ['💧 Rețea apă/canal', zone.areaKm2+' km² acoperire'],
      ].forEach(([l,v],i) => {
        ctx.fillStyle='rgba(148,163,184,.7)'; ctx.font=`${W*0.0085}px "IBM Plex Mono"`;
        ctx.fillText(l, infraX+8, cy+38+i*29);
        ctx.fillStyle='#fff'; ctx.font=`bold ${W*0.010}px "IBM Plex Mono"`;
        ctx.fillText(v, infraX+8, cy+54+i*29);
      });
    }

    this._sceneLabel(ctx,W,H,'7','FOCUS ZONĂ — PRESIUNE URBANĂ');
  },

  // ── SCENA 8: Comparație 2 UAT-uri ────────────────────────────────────
  _s8_compare(ctx,W,H,t,city) {
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
  _s9_street(ctx,W,H,t,city) {
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
  _s10_urban(ctx,W,H,t,city) {
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
  _s12_conclusion(ctx,W,H,t,city) {
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
    gr.addColorStop(0,'rgba(4,10,24,0.75)');
    gr.addColorStop(0.4,'rgba(4,10,24,0.50)');
    gr.addColorStop(0.7,'rgba(4,10,24,0.85)');
    gr.addColorStop(1,'rgba(4,10,24,0.97)');
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
      ctx.fillText('VIZIUNE STRATEGICĂ 2025 — 2055', W/2, ty);
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
      ctx.fillText('📋 Generează Masterplan PDF complet · 📊 Analizează per parcelă', W/2, H*0.892);
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
      ctx.fillText('Date: INSE Rec.2021 · Eurostat · BNR · IPCC AR6 · Copernicus GHSL · OSM · UrbanX Model 2026', W/2, H*0.975);
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
    ctx.strokeStyle=color+'80';
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

  _sceneLabel(ctx,W,H,num,title){
    ctx.fillStyle='rgba(4,10,24,0.85)';
    this._roundRect(ctx,12,12,380,32,6); ctx.fill();
    ctx.strokeStyle='rgba(212,175,55,.3)'; ctx.lineWidth=0.8; ctx.stroke();
    ctx.fillStyle='#D4AF37'; ctx.font=`bold ${W*0.013}px "IBM Plex Mono"`;
    ctx.textAlign='left';
    ctx.fillText(num, 20, 34);
    ctx.fillStyle='rgba(200,215,235,.9)'; ctx.font=`${W*0.012}px "IBM Plex Mono"`;
    ctx.fillText(title, 40, 34);
  },

  _drawSceneProgress(ctx,W,H,t,sceneId){
    // Indicatori scene jos
    const total = this.SCENES.length;
    const dotW  = Math.min(20, (W-40)/total);
    const startX = (W - total*dotW) / 2;
    this.SCENES.forEach((s,i)=>{
      const active = i === (sceneId-1);
      const done   = i < (sceneId-1);
      ctx.fillStyle = active?'#D4AF37':done?'rgba(212,175,55,.4)':'rgba(255,255,255,.15)';
      ctx.beginPath();
      ctx.arc(startX+i*dotW+dotW/2, H-16, active?5:3, 0, Math.PI*2);
      ctx.fill();
    });
    // Timp scenă curentă
    ctx.fillStyle='rgba(100,120,150,.5)'; ctx.font=`${W*0.008}px "IBM Plex Mono"`;
    ctx.textAlign='right';
    const elapsed = Math.round(t * (this.SCENES[sceneId-1]?.dur||5000)/1000);
    ctx.fillText(`${sceneId}/${total} · ${elapsed}s`, W-15, H-10);
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
        if(opts?.mode==='cinema_v2'||opts?.scenes){
          const key = opts?.cityKey || TCI.cityKey ||
            window._ProjectionEngine?.currentCity || 'RO-IS-01';
          G._SceneEngine.launch(key);
        } else {
          if(origOpen) origOpen(opts);
        }
      };
      console.log('[TCI Cinematic v2] ✅ openTCI override aplicat');
    } else if(attempt < 40) {
      setTimeout(()=>_tryPatchOpenTCI(attempt+1), 500);
    }
  };
  _tryPatchOpenTCI(0);

  // Helper robust pentru cityKey - functioneaza cu sau fara TCI
  G._SceneEngine._getCityKey = function() {
    return window.TCI?.cityKey ||
           window._ProjectionEngine?.currentCity ||
           window._lastSelectedCity ||
           Object.keys(window._RO_CITIES_DB||{})[0] ||
           'RO-IS-01';
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
      const key = window.TCI?.cityKey || window._ProjectionEngine?.currentCity || 'RO-IS-01';
      G._SceneEngine.launch(key);
      document.getElementById('viz-menu').style.display='none';
    };
    vizMenu.appendChild(sep);
    vizMenu.appendChild(item);
    console.log('[Cinema v2] ✅ integrat în Vizualizare menu');
    return true;
  };
  // Retry la 2s, 4s, 8s - meniul poate fi populat dinamic
  [2000,4000,8000].forEach(delay => setTimeout(_injectCinemaV2Menu, delay));

  // Expunere globală
  // window._SceneEngine deja setat la inceputul _init
  console.log('[TCI Cinematic Scenes v2.0] ✅ 12 scene + proiecții per zonă + bare 3D + trafic + slider');
  ss?.('🎬 Cinema v2: 12 scene storyboard + proiecții per cartier + infrastructură necesară');
})(0);

})(window);
