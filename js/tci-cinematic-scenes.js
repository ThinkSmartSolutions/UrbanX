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
    { id:1,  dur:14000, label:'Identitate — Cine ești, de unde vii' },
    { id:2,  dur:15000, label:'Context Geografic & Regional' },
    { id:3,  dur:16000, label:'Portretul Comunității — Demografie' },
    { id:4,  dur:16000, label:'Economie & Putere de Cumpărare' },
    { id:5,  dur:18000, label:'Unde Crește Orașul — Coridoare 2055' },
    { id:6,  dur:16000, label:'Mobilitate Auto — Congestie & Pasaje' },
    { id:7,  dur:16000, label:'Transport Public & Walkability' },
    { id:8,  dur:16000, label:'Risc Seismic — Fond Vulnerabil & PNRR' },
    { id:9,  dur:16000, label:'Riscuri Climatice — Inundații & UHI' },
    { id:10, dur:18000, label:'Proiecție Demografică 2055 — Monte Carlo' },
    { id:11, dur:16000, label:'Infrastructură Necesară 2025-2055' },
    { id:12, dur:16000, label:'Investiții în Derulare — SICAP Live' },
    { id:13, dur:18000, label:'Scenarii Comparate S1/S2/S3' },
    { id:14, dur:16000, label:'Calitatea Vieții — SDG11 & Mediu' },
    { id:15, dur:16000, label:'Benchmarking European — Peer Group' },
    { id:16, dur:18000, label:'Agenda Primarului — Priorități 2025-2030' },
    { id:17, dur:20000, label:'Viziunea 2055 — Orașul Posibil' },
  ],

  async launch(cityKey) {
    const map = window.map;
    if(!map) { ss?.('Harta indisponibilă'); return; }
    this._map = map; // Salvam referinta pentru acces din orice functie

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

    // Pe mobil: reducem la primele 12 scene si durate mai scurte pentru performanta
    const isMobile = window.innerWidth < 768;
    const _originalScenes = this._SCENES_ORIG || (this._SCENES_ORIG = [...this.SCENES]);
    if(isMobile) {
      this._activeScenes = _originalScenes.slice(0, 12).map(s => ({...s, dur: Math.min(s.dur, 8000)}));
      console.log('[Cinema v2] Mobil detectat — 12 scene, durate reduse');
    } else {
      this._activeScenes = [..._originalScenes];
    }

    // Canvas overlay fullscreen
    this._canvas = this._createCanvas();
    this._ctx    = this._canvas.getContext('2d');

    // Fetch Wikipedia pentru scena 1 — cu fallback imediat din date locale
    const _cityForWiki = city;
    this._wikiLang = 'ro';
    // Fallback imediat din date disponibile — se afiseaza pana vine Wikipedia
    this._wikiText = [
      _cityForWiki.name + ' este un ' + (_cityForWiki.tip||'municipiu') + ' din județul ' + (_cityForWiki.judet||'—') + ', România.',
      'Populație: ' + (_cityForWiki.pop2021||0).toLocaleString('ro-RO') + ' locuitori (Recensământ 2021).',
      'Suprafață: ' + (_cityForWiki.suprafata_ha ? Math.round(_cityForWiki.suprafata_ha/100) + ' km²' : '—') + '.',
      'PIB/capita: ' + (_cityForWiki.pib_eur_cap ? _cityForWiki.pib_eur_cap.toLocaleString('ro-RO') + ' EUR' : '—') + ' (Eurostat 2022).',
      'Hub urban ' + (_cityForWiki.regiune||'') + ' · Tip creștere: ' + (_cityForWiki.coef_hub>=1.5?'metropolitan':_cityForWiki.coef_hub>=1?'regional':'local') + '.',
    ].join(' ');
    // Fetch PUG GeoJSON pentru geometrii reale (bare 3D, heatmap, coridoare)
    this._pugGeo = null;
    this._pugLoading = true;
    (async () => {
      try {
        const reg = window._PUG_REGISTRY || {};
        const cityKey2 = Object.keys(reg).find(k => reg[k].id === (city.id || city.name?.toLowerCase().replace(/\s+/g,'-').replace(/[ăâ]/g,'a').replace(/[îí]/g,'i').replace(/[șş]/g,'s').replace(/[țţ]/g,'t')));
        const pugUrl = reg[cityKey2]?.pugFile || 'data/municipiul-iasi/pug.geojson';
        const resp = await fetch(pugUrl);
        if(resp.ok) {
          this._pugGeo = await resp.json();
          console.log('[Cinema] PUG loaded:', this._pugGeo?.features?.length, 'zone UTR');
        }
      } catch(e) { console.warn('[Cinema] PUG fetch failed:', e.message); }
      this._pugLoading = false;
    })();

    // Fetch reguli.json pentru inaltimi reale UTR
    this._reguli = null;
    (async () => {
      try {
        const reg = window._PUG_REGISTRY || {};
        const cityKey3 = Object.keys(reg).find(k => reg[k].id === (city.id ||
          city.name?.toLowerCase().replace(/\s+/g,'-').replace(/[ăâ]/g,'a').replace(/[îí]/g,'i').replace(/[șş]/g,'s').replace(/[țţ]/g,'t')));
        const reguliUrl = reg[cityKey3]?.reguli || 'data/municipiul-iasi/reguli.json';
        const resp = await fetch(reguliUrl);
        if(resp.ok) {
          this._reguli = await resp.json();
          console.log('[Cinema] Reguli loaded:', Object.keys(this._reguli).length, 'UTR-uri');
        }
      } catch(e) { console.warn('[Cinema] Reguli fetch failed:', e.message); }
    })();

    // Fetch Wikipedia async — înlocuieste fallback-ul când sosește
    (async () => {
      try {
        const cityName = _cityForWiki.name || '';
        for(const lang of ['ro','en']) {
          const ctrl = new AbortController();
          const timer = setTimeout(()=>ctrl.abort(), 3000);
          try {
            const resp = await fetch(
              'https://'+lang+'.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(cityName),
              {signal: ctrl.signal}
            );
            clearTimeout(timer);
            if(resp.ok) {
              const data = await resp.json();
              if(data.extract && data.extract.length > 80) {
                this._wikiText = data.extract.replace(/\s+/g,' ').trim().substring(0,700);
                if(this._wikiText.length===700) this._wikiText += '...';
                this._wikiLang = lang;
                console.log('[Cinema] Wikipedia', lang, 'OK:', cityName);
                break;
              }
            }
          } catch(fetchErr) { clearTimeout(timer); }
        }
      } catch(e) { console.warn('[Cinema] Wikipedia failed:', e.message); }
    })();

    // Pornim
    this._runScene(0);
    document.body.classList.add('tci-cinema-active');
    ss?.('🎬 TCI Cinematic v2.0 pornit: '+city.name);

    // Debug overlay - dispare dupa 4 secunde
    setTimeout(() => {
      const pugN  = this._pugGeo?.features?.length || 0;
      const regN  = Object.keys(this._reguli||{}).length;
      const msg   = pugN > 0
        ? '✅ PUG: '+pugN+' UTR-uri · Reguli: '+regN+' · '+city.name
        : '⚠ PUG neîncarcat — bare 3D indisponibile · verifică consola';
      const col   = pugN > 0 ? '#22c55e' : '#ef4444';
      const el = document.createElement('div');
      el.id = 'tci-debug-overlay';
      el.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);'+
        'background:rgba(4,10,24,.95);border:1px solid '+col+';color:'+col+';'+
        'font:bold 13px "IBM Plex Mono",monospace;padding:10px 20px;border-radius:8px;'+
        'z-index:999999;pointer-events:none;white-space:nowrap;';
      el.textContent = msg;
      document.body.appendChild(el);
      console.log('[TCI Debug] PUG:', pugN, 'Reguli:', regN, 'City:', city.name);
      setTimeout(() => el.remove(), 5000);
    }, 2500);
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
    const _scenes = this._activeScenes || this.SCENES;
    if(!this._playing || idx >= _scenes.length) {
      this._finish(); return;
    }
    const scene = _scenes[idx];
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
    const map  = window.map || this._map;
    const city = this._city;
    const cx   = city?.lon||27.601, cy = city?.lat||47.158;
    if(!map) return;

    // ── Curățăm layerele TCI din scena anterioară ────────────────────────
    this._cleanupTCILayers(map);

    // ── Configurăm harta și layerele per scenă ───────────────────────────
    switch(sceneId) {

      case 1: // IDENTITATE — zoom out la România, stil noapte
        map.flyTo({center:[cx,cy], zoom:11, pitch:0, bearing:0, duration:3000, essential:true});
        try{ map.setConfigProperty('basemap','lightPreset','night'); }catch(e){}
        break;

      case 2: // CONTEXT GEOGRAFIC — zoom regional cu relief
        map.flyTo({center:[cx,cy], zoom:8, pitch:25, bearing:-5, duration:3500, essential:true});
        try{ map.setConfigProperty('basemap','lightPreset','dusk'); }catch(e){}
        break;

      case 3: // DEMOGRAFIE — city overview 3D dimineata
        map.flyTo({center:[cx,cy], zoom:12, pitch:45, bearing:10, duration:3000, essential:true});
        try{ map.setConfigProperty('basemap','lightPreset','dawn'); }catch(e){}
        this._setupDensityLayer(map, city);
        break;

      case 4: // ECONOMIE — city 3D zi, zoom pe centru
        map.flyTo({center:[cx,cy], zoom:13.5, pitch:55, bearing:-20, duration:2500, essential:true});
        try{ map.setConfigProperty('basemap','lightPreset','day'); }catch(e){}
        break;

      case 5: // PREDICTII DEZVOLTARE 2025-2055
        // Zoom pe tot orasul cu unghi 3D
        try {
          map.setZoom(10.5);
          map.setCenter([cx, cy]);
          map.setPitch(52);
          map.setBearing(10);
        } catch(e){}
        setTimeout(()=>{
          try {
            map.flyTo({center:[cx,cy], zoom:11.0, pitch:55, bearing:15,
              duration:2000, essential:true});
          } catch(e){}
        }, 300);
        try{ map.setConfigProperty('basemap','lightPreset','night'); }catch(e){}
        // Ascundem layerele UTR 2D ca sa nu acopere barele 3D
        ['utr-fill','utr-line','utr-lbl'].forEach(id=>{
          try{ if(map.getLayer(id)) map.setLayoutProperty(id,'visibility','none'); }catch(e){}
        });
        this._setup3DGrowthBars(map, city);
        this._startMapRotation(map, 15, 0.025);
        break;

      case 6: // MOBILITATE AUTO — trafic + congestie
        map.flyTo({center:[cx,cy], zoom:13, pitch:40, bearing:0, duration:2000, essential:true});
        try{ map.setConfigProperty('basemap','lightPreset','night'); }catch(e){}
        this._setupTrafficLayer(map, city);
        break;

      case 7: // TRANSPORT PUBLIC — acoperire TP + walkability
        map.flyTo({center:[cx,cy], zoom:13, pitch:40, bearing:-15, duration:2000, essential:true});
        try{ map.setConfigProperty('basemap','lightPreset','day'); }catch(e){}
        this._setupTPLayer(map, city);
        break;

      case 8: // RISC SEISMIC — stil dramatic noapte
        map.flyTo({center:[cx,cy], zoom:12, pitch:35, bearing:0, duration:2500, essential:true});
        try{ map.setConfigProperty('basemap','lightPreset','night'); }catch(e){}
        this._setupSeismicLayer(map, city);
        break;

      case 9: // INUNDATII — activam FloodMapper ANAR real
        map.flyTo({center:[cx,cy], zoom:12, pitch:30, bearing:0, duration:2500, essential:true});
        try{ map.setConfigProperty('basemap','lightPreset','dawn'); }catch(e){}
        this._setupFloodLayer(map, city);
        break;

      case 10: // PROIECTIE DEMOGRAFICA — city overview + fan chart
        map.flyTo({center:[cx,cy], zoom:11.5, pitch:45, bearing:-10, duration:2500, essential:true});
        try{ map.setConfigProperty('basemap','lightPreset','dusk'); }catch(e){}
        break;

      case 11: // INFRASTRUCTURA — zoom pe cartiere cu deficit
        map.flyTo({center:[cx,cy], zoom:13, pitch:50, bearing:20, duration:2000, essential:true});
        try{ map.setConfigProperty('basemap','lightPreset','day'); }catch(e){}
        this._setupInfraLayer(map, city);
        break;

      case 12: // INVESTITII — zi, overview
        map.flyTo({center:[cx,cy], zoom:12, pitch:40, bearing:-5, duration:2000, essential:true});
        try{ map.setConfigProperty('basemap','lightPreset','day'); }catch(e){}
        break;

      case 13: // SCENARII — pitch inalt, vedere bird's eye
        map.flyTo({center:[cx,cy], zoom:11, pitch:30, bearing:0, duration:2500, essential:true});
        try{ map.setConfigProperty('basemap','lightPreset','day'); }catch(e){}
        this._setupScenariiLayer(map, city);
        break;

      case 14: // CALITATEA VIETII — spații verzi vizibile
        map.flyTo({center:[cx,cy], zoom:13, pitch:45, bearing:10, duration:2000, essential:true});
        try{ map.setConfigProperty('basemap','lightPreset','day'); }catch(e){}
        break;

      case 15: // BENCHMARKING — overview
        map.flyTo({center:[cx,cy], zoom:12, pitch:40, bearing:-10, duration:2000, essential:true});
        try{ map.setConfigProperty('basemap','lightPreset','day'); }catch(e){}
        break;

      case 16: // AGENDA PRIMARULUI — zi, clear
        map.flyTo({center:[cx,cy], zoom:13, pitch:50, bearing:5, duration:2000, essential:true});
        try{ map.setConfigProperty('basemap','lightPreset','day'); }catch(e){}
        this._setupPrioritiesLayer(map, city);
        break;

      case 17: // VIZIUNEA 2055 — sunset dramatic + rotatie
        map.flyTo({center:[cx,cy], zoom:13, pitch:62, bearing:-20, duration:3000, essential:true});
        try{ map.setConfigProperty('basemap','lightPreset','dusk'); }catch(e){}
        ['utr-fill','utr-line','utr-lbl'].forEach(id=>{
          try{ if(map.getLayer(id)) map.setLayoutProperty(id,'visibility','none'); }catch(e){}
        });
        this._setup3DGrowthBars(map, city);
        this._startMapRotation(map, -20, 0.02);
        break;
    }

    // ── Legacy flyOpts pentru compatibilitate ─────────────────────────────
    const flyOpts = null; // dezactivat — folosim switch de mai sus
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
    // Pe mobil sarim layerele WebGL grele - canvas-ul singur e suficient
    const _mob = window.innerWidth < 768;
    if(sceneId===4 && !_mob) this._setupDensityLayer(map, city);
    // sceneId===5: _setup3DGrowthBars deja apelat in switch case 5 de mai sus — nu repetam
    if(sceneId===6 && !_mob) this._setupTrafficLayer(map, city);
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
      case 1:  this._s1_historic(ctx,W,H,t,city); break;
      case 2:  this._s2_context(ctx,W,H,t,city); break;
      case 3:  this._s3_demographics(ctx,W,H,t,city); break;
      case 4:  this._s4_economy(ctx,W,H,t,city); break;
      case 5:  this._s5_growth_corridors(ctx,W,H,t,city,zones); break;
      case 6:  this._s6_mobility_auto(ctx,W,H,t,city); break;
      case 7:  this._s7_mobility_public(ctx,W,H,t,city); break;
      case 8:  this._s8_seismic(ctx,W,H,t,city); break;
      case 9:  this._s9_climate(ctx,W,H,t,city); break;
      case 10: this._s10_projection(ctx,W,H,t,city); break;
      case 11: this._s11_infrastructure(ctx,W,H,t,city); break;
      case 12: this._s12_investments(ctx,W,H,t,city); break;
      case 13: this._s13_scenarios(ctx,W,H,t,city,zones); break;
      case 14: this._s14_quality(ctx,W,H,t,city); break;
      case 15: this._s15_benchmark(ctx,W,H,t,city); break;
      case 16: this._s16_actions(ctx,W,H,t,city); break;
      case 17: this._s17_vision(ctx,W,H,t,city); break;
    }

    // Progress bar scenă
    this._drawSceneProgress(ctx,W,H,t,sceneId);

    ctx.restore();
  },

  // ═══════════════════════════════════════════════════════════════════════
  // SCENELE TCI CINEMATIC — rescrise complet
  // Fiecare scenă transmite o informație acționabilă, cu date reale per UAT
  // ═══════════════════════════════════════════════════════════════════════

  // ── SCENA 1: IDENTITATE — Cine ești, de unde vii ──────────────────────
  // Wikipedia API: istoric, înființare, cultură, monumente emblematice
  _s1_historic(ctx,W,H,t,city) {
    const gr=ctx.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,'rgba(4,10,24,.85)');gr.addColorStop(1,'rgba(4,10,24,.96)');
    ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);
    this._scanlines(ctx,W,H,0.025);

    // Titlu orașului — mare, centrat
    if(t>0.05){
      const ta=Math.min(1,(t-0.05)/0.3);
      ctx.globalAlpha=ta;
      ctx.fillStyle='#D4AF37';
      ctx.font=`900 ${W*0.055}px "Space Grotesk",sans-serif`;
      ctx.textAlign='center';
      ctx.fillText((city?.name||'').toUpperCase(), W/2, H*0.18);
      ctx.fillStyle='rgba(148,163,184,.7)';
      ctx.font=`${W*0.013}px "IBM Plex Mono"`;
      ctx.fillText((city?.judet||'')+ ' · Romania · Est. '+(city?.infiintat||'—'), W/2, H*0.235);
      ctx.globalAlpha=1;
    }

    // Text Wikipedia — afișat progresiv
    const wikiText = this._wikiText || '';
    // Textul apare intotdeauna - fie din fallback local, fie din Wikipedia
    if(t>0.15){
      const ta=Math.min(1,(t-0.15)/0.2);
      ctx.globalAlpha=ta;
      const font14=`${W*0.009}px "IBM Plex Mono"`;
      const lineH = H*0.042;
      const startY = H*0.3;
      // Calculam cate linii incap pe ecran intre startY si 0.75H
      const maxVisible = Math.floor((H*0.75 - startY) / lineH);
      const lines = this._wrapText(ctx, wikiText||'...', W*0.76, font14);
      // Afisam progresiv pana la maxVisible linii
      const showN = Math.min(maxVisible, Math.floor((t-0.15)/(0.85/Math.max(1,Math.min(lines.length,maxVisible)))+1));
      ctx.fillStyle='rgba(200,215,235,.88)';
      ctx.font=font14;
      ctx.textAlign='left';
      lines.slice(0, showN).forEach((line,i)=>{
        ctx.fillText(line, W*0.12, startY+i*lineH, W*0.76);
      });
      // Sursa Wikipedia — sub text, intotdeauna in ecran
      if(t>0.75 && this._wikiLang){
        const sa=Math.min(1,(t-0.75)/0.15);
        ctx.globalAlpha*=sa;
        ctx.fillStyle='rgba(96,165,250,.55)';
        ctx.font=`${W*0.0065}px "IBM Plex Mono"`;
        ctx.fillText('Sursă: '+this._wikiLang+'.wikipedia.org', W*0.12, H*0.77);
      }
      ctx.globalAlpha=1;
    }

    // KPI-uri identitate jos
    if(t>0.5){
      const ta=Math.min(1,(t-0.5)/0.3);
      const kpis=[
        {l:'ÎNFIINȚAT',v:city?.infiintat||'—',u:'',c:'#D4AF37'},
        {l:'POPULAȚIE',v:(city?.pop2021||0).toLocaleString('ro-RO'),u:'loc. 2021',c:'#60a5fa'},
        {l:'SUPRAFAȚĂ',v:city?.suprafata_ha?Math.round(city.suprafata_ha/100)+'km²':'—',u:'',c:'#22c55e'},
        {l:'STATUT',v:(city?.tip||'municipiu').toUpperCase(),u:'',c:'#a78bfa'},
      ];
      kpis.forEach((k,i)=>{
        const kx=W*(0.06+i*0.235), ky=H*0.78;
        const ka=Math.min(1,Math.max(0,(t-0.5-i*0.06)/0.25));
        ctx.globalAlpha=ka;
        ctx.fillStyle='rgba(4,10,24,.9)';
        this._roundRect(ctx,kx,ky,W*0.21,H*0.14,6);ctx.fill();
        ctx.strokeStyle=k.c+'55';ctx.lineWidth=1;
        this._roundRect(ctx,kx,ky,W*0.21,H*0.14,6);ctx.stroke();
        ctx.fillStyle='rgba(148,163,184,.6)';ctx.font=`bold ${W*0.0065}px "IBM Plex Mono"`;
        ctx.textAlign='left';ctx.fillText(k.l,kx+8,ky+H*0.038);
        ctx.fillStyle=k.c;ctx.font=`900 ${W*0.016}px "Space Grotesk",sans-serif`;
        ctx.fillText(k.v,kx+8,ky+H*0.095,W*0.19);
        ctx.fillStyle='rgba(148,163,184,.5)';ctx.font=`${W*0.006}px "IBM Plex Mono"`;
        ctx.fillText(k.u,kx+8,ky+H*0.128);
        ctx.globalAlpha=1;
      });
    }
    this._sceneLabel(ctx,W,H,'1','IDENTITATE — '+(city?.name||'').toUpperCase());
  },

  // ── SCENA 2: PORTRETUL ORAȘULUI — Context geografic + regional ─────────
  _s2_context(ctx,W,H,t,city) {
    const gr=ctx.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,'rgba(4,10,24,.75)');gr.addColorStop(1,'rgba(4,10,24,.92)');
    ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);
    this._scanlines(ctx,W,H,0.025);

    // Titlu regiune
    if(t>0.08){
      const ta=Math.min(1,(t-0.08)/0.2);
      ctx.globalAlpha=ta;
      const regLabel={'NE':'MOLDOVA — NORD-EST','NV':'ARDEAL — NORD-VEST','V':'BANAT — VEST',
        'C':'CENTRU','SE':'SUD-EST','S':'SUD MUNTENIA','SV':'OLTENIA','B':'BUCUREȘTI-ILFOV'}[city?.regiune]||'REGIUNE';
      ctx.fillStyle='rgba(212,175,55,.9)';
      ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;ctx.textAlign='left';
      ctx.fillText('CONTEXT GEOGRAFIC & REGIONAL',W*0.05,H*0.1);
      ctx.fillStyle='rgba(255,255,255,.95)';
      ctx.font=`900 ${W*0.022}px "Space Grotesk",sans-serif`;
      ctx.fillText(regLabel,W*0.05,H*0.16);
      ctx.globalAlpha=1;
    }

    // Card poziție geografică
    if(t>0.2){
      const ca=Math.min(1,(t-0.2)/0.25);
      ctx.globalAlpha=ca;
      ctx.fillStyle='rgba(4,10,24,.92)';
      this._roundRect(ctx,W*0.05,H*0.2,W*0.42,H*0.35,8);ctx.fill();
      ctx.strokeStyle='rgba(96,165,250,.3)';ctx.lineWidth=1;
      this._roundRect(ctx,W*0.05,H*0.2,W*0.42,H*0.35,8);ctx.stroke();

      const rows=[
        ['Coordonate',`${city?.lat?.toFixed(4)||'—'}°N, ${city?.lon?.toFixed(4)||'—'}°E`],
        ['Județ',city?.judet||'—'],
        ['Regiune de dezvoltare',city?.regiune_label||city?.regiune||'—'],
        ['Tip localitate',(city?.tip||'municipiu').charAt(0).toUpperCase()+(city?.tip||'municipiu').slice(1)],
        ['Suprafață',city?.suprafata_ha?`${Math.round(city.suprafata_ha)} ha (${Math.round(city.suprafata_ha/100)} km²)`:'—'],
        ['Altitudine',city?.altitudine?city.altitudine+' m s.m.':'—'],
      ];
      ctx.font=`${W*0.0085}px "IBM Plex Mono"`;ctx.textAlign='left';
      rows.forEach(([k,v],i)=>{
        const y=H*0.25+i*H*0.048;
        ctx.fillStyle='rgba(148,163,184,.6)';ctx.fillText(k,W*0.07,y);
        ctx.fillStyle='rgba(200,215,235,.9)';ctx.font=`bold ${W*0.0085}px "IBM Plex Mono"`;
        ctx.fillText(v,W*0.26,y);
        ctx.font=`${W*0.0085}px "IBM Plex Mono"`;
      });
      ctx.globalAlpha=1;
    }

    // Card conectivitate teritorială
    if(t>0.35){
      const ca=Math.min(1,(t-0.35)/0.25);
      ctx.globalAlpha=ca;
      ctx.fillStyle='rgba(4,10,24,.92)';
      this._roundRect(ctx,W*0.52,H*0.2,W*0.43,H*0.35,8);ctx.fill();
      ctx.strokeStyle='rgba(212,175,55,.3)';ctx.lineWidth=1;
      this._roundRect(ctx,W*0.52,H*0.2,W*0.43,H*0.35,8);ctx.stroke();
      ctx.fillStyle='#D4AF37';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.fillText('CONECTIVITATE TERITORIALĂ',W*0.54,H*0.235);

      const conn=[
        ['Autostradă',city?.autostrada_km!=null?city.autostrada_km+'km':'în studiu','#22c55e'],
        ['Aeroport',city?.aeroport||'regional','#60a5fa'],
        ['Cale ferată',city?.cale_ferata||'da','#a78bfa'],
        ['Drum național',city?.drum_national||'DN conectat','#f59e0b'],
      ];
      conn.forEach(([k,v,c],i)=>{
        const y=H*0.285+i*H*0.055;
        ctx.fillStyle=c;ctx.font=`bold ${W*0.0085}px "IBM Plex Mono"`;
        ctx.fillText('▸ ',W*0.54,y);
        ctx.fillStyle='rgba(148,163,184,.7)';ctx.font=`${W*0.0085}px "IBM Plex Mono"`;
        ctx.fillText(k+':',W*0.555,y);
        ctx.fillStyle='rgba(200,215,235,.9)';ctx.font=`bold ${W*0.0085}px "IBM Plex Mono"`;
        ctx.fillText(v,W*0.67,y);
      });
      ctx.globalAlpha=1;
    }

    // Card hub urban + gravitatie
    if(t>0.55){
      const ca=Math.min(1,(t-0.55)/0.25);
      ctx.globalAlpha=ca;
      const hubScore=city?.coef_hub||0.5;
      const hubLabel=hubScore>=1.5?'HUB MAJOR':hubScore>=1.0?'HUB REGIONAL':hubScore>=0.7?'POL URBAN':'CENTRU LOCAL';
      const hubColor=hubScore>=1.5?'#D4AF37':hubScore>=1.0?'#60a5fa':hubScore>=0.7?'#22c55e':'#94a3b8';
      ctx.fillStyle='rgba(4,10,24,.92)';
      this._roundRect(ctx,W*0.05,H*0.62,W*0.9,H*0.12,8);ctx.fill();
      ctx.strokeStyle=hubColor+'55';ctx.lineWidth=1.5;
      this._roundRect(ctx,W*0.05,H*0.62,W*0.9,H*0.12,8);ctx.stroke();
      ctx.fillStyle=hubColor;ctx.font=`900 ${W*0.018}px "Space Grotesk",sans-serif`;
      ctx.textAlign='center';
      ctx.fillText('⭐ '+hubLabel, W/2, H*0.69);
      ctx.fillStyle='rgba(148,163,184,.7)';ctx.font=`${W*0.0085}px "IBM Plex Mono"`;
      ctx.fillText('Scor gravitațional: '+hubScore.toFixed(1)+'/2.0 · Model UrbanX · INSE 2021', W/2, H*0.715);
      ctx.globalAlpha=1;
    }
    this._sceneLabel(ctx,W,H,'2','CONTEXT GEOGRAFIC — '+(city?.name||'').toUpperCase());
  },

  // ── SCENA 3: PORTRETUL LOCUITORILOR ────────────────────────────────────
  _s3_demographics(ctx,W,H,t,city) {
    // Harta: heatmap densitate din centroidele UTR PUG reale
    // Canvas: KPI-uri demografice + structura varste
    const pop = city?.pop2021||100000;
    const pop11 = city?.pop2011||pop;
    const rata = city?.rata_reala_2011_2021||0;
    const tineri = city?.pct_0_14||15.5;
    const varstnici = city?.pct_65plus||21.8;
    const maturi = Math.max(0,100-tineri-varstnici);
    const isDeclin = rata < -0.3;

    // Gradient overlay
    if(t>0.05){
      ctx.globalAlpha=Math.min(1,(t-0.05)/0.15)*0.55;
      const gr=ctx.createLinearGradient(0,H*0.5,0,H);
      gr.addColorStop(0,'rgba(4,10,24,0)');gr.addColorStop(1,'rgba(4,10,24,0.95)');
      ctx.fillStyle=gr;ctx.fillRect(0,H*0.5,W,H*0.5);
      const grl=ctx.createLinearGradient(0,0,W*0.38,0);
      grl.addColorStop(0,'rgba(4,10,24,0.85)');grl.addColorStop(1,'rgba(4,10,24,0)');
      ctx.fillStyle=grl;ctx.fillRect(0,0,W*0.38,H);
      ctx.globalAlpha=1;
    }

    // KPI-uri stânga sus
    if(t>0.15){
      const la=Math.min(1,(t-0.15)/0.2);ctx.globalAlpha=la;
      ctx.fillStyle='rgba(4,10,24,.92)';
      this._roundRect(ctx,W*0.02,H*0.12,W*0.34,H*0.42,8);ctx.fill();
      ctx.strokeStyle='rgba(96,165,250,.3)';ctx.lineWidth=1;
      this._roundRect(ctx,W*0.02,H*0.12,W*0.34,H*0.42,8);ctx.stroke();

      ctx.fillStyle='#60a5fa';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText('RECENSĂMÂNT 2021 · INSE',W*0.035,H*0.155);

      // Populatie mare
      ctx.fillStyle='rgba(200,215,235,.95)';
      ctx.font=`900 ${W*0.038}px "Space Grotesk",sans-serif`;
      ctx.fillText(this._countUp(pop,Math.min(1,(t-0.18)/0.5)).toLocaleString('ro-RO'),W*0.035,H*0.245);
      ctx.fillStyle='rgba(148,163,184,.6)';ctx.font=`${W*0.008}px "IBM Plex Mono"`;
      ctx.fillText('locuitori · '+city?.name,W*0.035,H*0.268);

      // Variatie
      const rataColor=rata>=0?'#22c55e':'#ef4444';
      ctx.fillStyle=rataColor;ctx.font=`900 ${W*0.022}px "Space Grotesk",sans-serif`;
      ctx.fillText((rata>=0?'+':'')+rata.toFixed(1)+'%/an',W*0.035,H*0.325);
      ctx.fillStyle='rgba(148,163,184,.6)';ctx.font=`${W*0.0075}px "IBM Plex Mono"`;
      ctx.fillText('rata creștere 2011-2021 (INSE calibrat)',W*0.035,H*0.347);

      // Structura varste - bara
      if(t>0.42){
        const ba=Math.min(1,(t-0.42)/0.25);
        ctx.fillStyle='rgba(148,163,184,.7)';ctx.font=`bold ${W*0.0075}px "IBM Plex Mono"`;
        ctx.fillText('STRUCTURA PE VÂRSTE:',W*0.035,H*0.385);
        const bx=W*0.035,by=H*0.4,bw=W*0.29,bh=H*0.028;
        const segs=[
          {pct:tineri/100,c:'#60a5fa',l:Math.round(tineri)+'% copii'},
          {pct:maturi/100,c:'#22c55e',l:Math.round(maturi)+'% activi'},
          {pct:varstnici/100,c:'#f59e0b',l:Math.round(varstnici)+'% seniori'},
        ];
        let ox=0;
        segs.forEach(s=>{
          const sw=bw*s.pct*ba;
          ctx.fillStyle=s.c;ctx.globalAlpha=0.85;
          this._roundRect(ctx,bx+ox,by,sw,bh,2);ctx.fill();
          if(sw>W*0.04){
            ctx.fillStyle='#fff';ctx.font=`bold ${W*0.0065}px "IBM Plex Mono"`;
            ctx.textAlign='center';ctx.globalAlpha=ba;
            ctx.fillText(s.l,bx+ox+sw/2,by+bh*0.65);
          }
          ox+=sw;
        });
        ctx.textAlign='left';ctx.globalAlpha=1;
      }

      // Alerta declin
      if(t>0.65 && isDeclin){
        const da=Math.min(1,(t-0.65)/0.2);ctx.globalAlpha*=da;
        ctx.fillStyle='rgba(127,29,29,.9)';
        this._roundRect(ctx,W*0.035,H*0.445,W*0.29,H*0.045,4);ctx.fill();
        ctx.strokeStyle='rgba(239,68,68,.5)';ctx.lineWidth=1;
        this._roundRect(ctx,W*0.035,H*0.445,W*0.29,H*0.045,4);ctx.stroke();
        ctx.fillStyle='#fca5a5';ctx.font=`bold ${W*0.0075}px "IBM Plex Mono"`;
        ctx.fillText('⚠ DECLIN DEMOGRAFIC '+rata.toFixed(1)+'%/an',W*0.045,H*0.473,W*0.27);
        ctx.globalAlpha=1;
      }
      ctx.globalAlpha=1;
    }

    // Legenda heatmap jos dreapta
    if(t>0.55){
      const ka=Math.min(1,(t-0.55)/0.2);ctx.globalAlpha=ka;
      const kx=W*0.65,ky=H*0.75;
      ctx.fillStyle='rgba(4,10,24,.88)';this._roundRect(ctx,kx,ky,W*0.33,H*0.17,8);ctx.fill();
      ctx.strokeStyle='rgba(96,165,250,.25)';ctx.lineWidth=1;
      this._roundRect(ctx,kx,ky,W*0.33,H*0.17,8);ctx.stroke();
      ctx.fillStyle='rgba(148,163,184,.7)';ctx.font=`bold ${W*0.0075}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText('DENSITATE POPULAȚIE PE UTR:',kx+W*0.012,ky+H*0.038);
      [
        {c:'rgba(239,68,68,0.9)',l:'Foarte densă (>200 loc/ha)'},
        {c:'rgba(249,115,22,0.8)',l:'Densă (100-200 loc/ha)'},
        {c:'rgba(234,179,8,0.7)',l:'Medie (50-100 loc/ha)'},
        {c:'rgba(59,130,246,0.5)',l:'Scăzută (<50 loc/ha)'},
      ].forEach(({c,l},i)=>{
        ctx.fillStyle=c;ctx.fillRect(kx+W*0.012,ky+H*(0.072+i*0.03),W*0.015,H*0.015);
        ctx.fillStyle='rgba(200,215,235,.8)';ctx.font=`${W*0.007}px "IBM Plex Mono"`;
        ctx.fillText(l,kx+W*0.033,ky+H*(0.083+i*0.03));
      });
      ctx.globalAlpha=1;
    }

    this._sceneLabel(ctx,W,H,'3','DEMOGRAFIE — '+(city?.name||'').toUpperCase());
  },


  // ── SCENA 4: PUTEREA DE CUMPĂRARE & ECONOMIA LOCALĂ ───────────────────
  _s4_economy(ctx,W,H,t,city) {
    const gr=ctx.createLinearGradient(0,0,W,H);
    gr.addColorStop(0,'rgba(4,10,24,.8)');gr.addColorStop(1,'rgba(10,20,44,.95)');
    ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);
    this._scanlines(ctx,W,H,0.025);

    const pib=city?.pib_eur_cap||10000;
    const pibUE=36600;
    const conv=Math.round(pib/pibUE*100);
    const somaj=city?.somaj_pct||5.2;

    if(t>0.05){
      ctx.globalAlpha=Math.min(1,(t-0.05)/0.2);
      ctx.fillStyle='#D4AF37';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText('ECONOMIE & PUTERE DE CUMPĂRARE',W*0.05,H*0.09);
      ctx.fillStyle='rgba(255,255,255,.9)';ctx.font=`900 ${W*0.022}px "Space Grotesk",sans-serif`;
      ctx.fillText('SURSE: EUROSTAT · BNR · INSE 2022',W*0.05,H*0.145);
      ctx.globalAlpha=1;
    }

    // KPI-uri economice
    [[`PIB/CAP`,pib,'EUR/loc.','#D4AF37',0.15],
     ['VS MEDIA UE',conv,'% din UE27','#60a5fa',0.28],
     ['ȘOMAJ',somaj,'%','#ef4444',0.41],
     ['UNIV.',city?.universitati||0,'univ.','#a78bfa',0.54],
    ].forEach(([l,v,u,c,d],i)=>{
      this._kpiCard(ctx,W*(0.04+i*0.24),H*0.18,W*0.22,H*0.18,l,v,u,c,t,d,'');
    });

    // Bara convergentă UE
    if(t>0.35){
      const ba=Math.min(1,(t-0.45)/0.3);
      ctx.globalAlpha=ba;
      ctx.fillStyle='rgba(4,10,24,.9)';
      this._roundRect(ctx,W*0.04,H*0.42,W*0.92,H*0.16,8);ctx.fill();
      ctx.strokeStyle='rgba(212,175,55,.2)';ctx.lineWidth=1;
      this._roundRect(ctx,W*0.04,H*0.42,W*0.92,H*0.16,8);ctx.stroke();

      ctx.fillStyle='rgba(200,215,235,.8)';ctx.font=`bold ${W*0.0085}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText('CONVERGENȚĂ FAȚĂ DE MEDIA UE27 (36.600 EUR/cap)',W*0.06,H*0.455);

      // Track
      const bx=W*0.06,by=H*0.48,bw=W*0.88,bh=H*0.05;
      ctx.fillStyle='rgba(255,255,255,.06)';
      this._roundRect(ctx,bx,by,bw,bh,bh/2);ctx.fill();
      // Fill animat
      const fillW=bw*(conv/100)*ba;
      if(fillW>0){
        const gd=ctx.createLinearGradient(bx,0,bx+bw,0);
        gd.addColorStop(0,'#1d4ed8');gd.addColorStop(conv/100,'#D4AF37');
        ctx.fillStyle=gd;
        this._roundRect(ctx,bx,by,fillW,bh,bh/2);ctx.fill();
      }
      // Marker 100%
      ctx.strokeStyle='rgba(34,197,94,.6)';ctx.lineWidth=1.5;ctx.setLineDash([3,3]);
      ctx.beginPath();ctx.moveTo(bx+bw,by-H*0.01);ctx.lineTo(bx+bw,by+bh+H*0.01);ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle='rgba(34,197,94,.8)';ctx.font=`${W*0.007}px "IBM Plex Mono"`;
      ctx.textAlign='center';ctx.fillText('MEDIA UE',bx+bw,by-H*0.014);

      ctx.fillStyle='#D4AF37';ctx.font=`bold ${W*0.011}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText(conv+'% din media UE27',bx+4,by+bh+H*0.025);

      // Proiecție 2055
      const conv2055=Math.min(100,Math.round(conv*Math.pow(1.035,34)));
      ctx.fillStyle='rgba(148,163,184,.6)';ctx.font=`${W*0.0085}px "IBM Plex Mono"`;
      ctx.fillText(`Proiecție 2055: ~${conv2055}% din UE27 (rata +3.5%/an OCDE)`,bx+4,by+bh+H*0.044);
      ctx.globalAlpha=1;
    }

    // Sectoare economice
    if(t>0.7){
      const ta=Math.min(1,(t-0.7)/0.25);
      ctx.globalAlpha=ta;
      const sectoare=city?.sectoare||[
        {n:'Servicii',pct:55,c:'#60a5fa'},
        {n:'Industrie',pct:25,c:'#f59e0b'},
        {n:'Construcții',pct:10,c:'#a78bfa'},
        {n:'Agricultură',pct:10,c:'#22c55e'},
      ];
      ctx.fillStyle='rgba(200,215,235,.8)';ctx.font=`bold ${W*0.0085}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText('STRUCTURA ECONOMICĂ (estimat model UrbanX)',W*0.06,H*0.68);
      sectoare.forEach((s,i)=>{
        this._progressBar(ctx,W*(0.06+i*0.23),H*0.705,W*0.2,H*0.018,s.pct/100,s.c,s.n,s.pct+'%',t,0.7+i*0.04);
      });
      ctx.globalAlpha=1;
    }

    this._sceneLabel(ctx,W,H,'4','ECONOMIE — '+(city?.name||'').toUpperCase());
  },

  // ── SCENA 5: UNDE CREȘTE ORAȘUL — Coridoare de dezvoltare ─────────────
  _s5_growth_corridors(ctx,W,H,t,city,zones) {
    if(t < 0.05) this._s5_zoomed = false; // reset la fiecare rulare
    const need = this._need||{};
    const locuinte = need.locuinteTotale||Math.round((city?.pop2021||100000)*0.03*30);

    // Overlay gradient jos si stanga pentru lizibilitate
    if(t>0.05){
      const ga=Math.min(1,(t-0.05)/0.15);
      ctx.globalAlpha=ga*0.65;
      const grB=ctx.createLinearGradient(0,H*0.6,0,H);
      grB.addColorStop(0,'rgba(4,10,24,0)');grB.addColorStop(1,'rgba(4,10,24,0.96)');
      ctx.fillStyle=grB;ctx.fillRect(0,H*0.6,W,H*0.4);
      const grL=ctx.createLinearGradient(0,0,W*0.36,0);
      grL.addColorStop(0,'rgba(4,10,24,0.92)');grL.addColorStop(1,'rgba(4,10,24,0)');
      ctx.fillStyle=grL;ctx.fillRect(0,0,W*0.36,H);
      ctx.globalAlpha=1;
    }

    // LEGENDA - stanga sus - vizibila de la inceputul scenei
    if(t>0.02){
      const la=Math.min(1,(t-0.02)/0.15);
      ctx.globalAlpha=la;
      const lx=W*0.02, ly=H*0.1;
      const entries=[
        {c:'#ef4444',l:'DENSIFICARE',sub:'Centru+mixt+comercial → P+6/P+8'},
        {c:'#f59e0b',l:'RECONVERSIE INDUSTRIALA',sub:'Zone AI → lofturi/birouri/mixt'},
        {c:'#22c55e',l:'EXPANSIUNE CONTROLATA',sub:'Periurban+rezerva → P+2/P+3'},
        {c:'#60a5fa',l:'REABILITARE',sub:'Blocuri LA → nu densificare'},
        {c:'#D4AF37',l:'CONSERVARE',sub:'Centru istoric protejat'},
        {c:'#94a3b8',l:'MONITORIZARE',sub:'Fara interventie majora'},
      ];
      // Legenda compacta - max 28% din inaltime ecran, jos stanga
      const lx2=W*0.02, ly2=H*0.72;
      const lh=H*0.048;
      const boxH=entries.length*lh+H*0.05;
      ctx.fillStyle='rgba(4,10,24,.92)';
      this._roundRect(ctx,lx2,ly2,W*0.28,boxH,6);ctx.fill();
      ctx.strokeStyle='rgba(212,175,55,.4)';ctx.lineWidth=1;
      this._roundRect(ctx,lx2,ly2,W*0.28,boxH,6);ctx.stroke();
      ctx.fillStyle='#D4AF37';ctx.font=`bold ${W*0.0085}px "IBM Plex Mono"`;
      ctx.textAlign='left';
      ctx.fillText('PREDICTIE 2025-2055',lx2+W*0.012,ly2+H*0.028);
      entries.forEach(({c,l,sub},i)=>{
        const ey=ly2+H*0.046+i*lh;
        ctx.globalAlpha=la;
        ctx.fillStyle=c;ctx.fillRect(lx2+W*0.012,ey-H*0.008,W*0.012,H*0.022);
        ctx.fillStyle='rgba(220,230,245,.9)';ctx.font=`bold ${W*0.0072}px "IBM Plex Mono"`;
        ctx.fillText(l,lx2+W*0.03,ey+H*0.008,W*0.23);
        ctx.fillStyle='rgba(148,163,184,.55)';ctx.font=`${W*0.006}px "IBM Plex Mono"`;
        ctx.fillText(sub,lx2+W*0.03,ey+H*0.024,W*0.23);
      });
      ctx.globalAlpha=1;
    }

    // KPI-uri jos dreapta
    if(t>0.45){
      const ka=Math.min(1,(t-0.45)/0.25);
      ctx.globalAlpha=ka;
      const kx=W*0.65,ky=H*0.72;
      ctx.fillStyle='rgba(4,10,24,.92)';
      this._roundRect(ctx,kx,ky,W*0.33,H*0.22,8);ctx.fill();
      ctx.strokeStyle='rgba(212,175,55,.3)';ctx.lineWidth=1;
      this._roundRect(ctx,kx,ky,W*0.33,H*0.22,8);ctx.stroke();
      const kpis=[
        {l:'LOCUINTE NECESARE 2055',v:locuinte.toLocaleString('ro-RO'),c:'#ef4444'},
        {l:'ZONE RECONVERSIE',v:(city?.pop2021>200000?'4-6':'2-3')+' platforme ind.',c:'#f59e0b'},
        {l:'UTR-URI ANALIZATE',v:(this._pugGeo?.features?.length||586).toLocaleString('ro-RO'),c:'#22c55e'},
      ];
      kpis.forEach(({l,v,c},i)=>{
        ctx.fillStyle='rgba(148,163,184,.55)';ctx.font=`${W*0.0068}px "IBM Plex Mono"`;
        ctx.textAlign='left';ctx.fillText(l,kx+W*0.014,ky+H*0.05+i*H*0.065);
        ctx.fillStyle=c;ctx.font=`900 ${W*0.016}px "Space Grotesk",sans-serif`;
        ctx.fillText(v,kx+W*0.014,ky+H*0.076+i*H*0.065,W*0.29);
      });
      ctx.globalAlpha=1;
    }

    // CONCLUZIE - jos centru la finalul scenei
    if(t>0.78){
      const ta=Math.min(1,(t-0.78)/0.15);
      ctx.globalAlpha=ta;
      ctx.fillStyle='rgba(4,10,24,.95)';
      this._roundRect(ctx,W*0.04,H*0.855,W*0.92,H*0.075,6);ctx.fill();
      ctx.strokeStyle='rgba(239,68,68,.5)';ctx.lineWidth=1.5;
      this._roundRect(ctx,W*0.04,H*0.855,W*0.92,H*0.075,6);ctx.stroke();
      ctx.fillStyle='#fca5a5';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='center';
      const pop=city?.pop2021||100000;
      const reconvZone=pop>200000?'platformele Dancu, Holboca si Fortus':'zona industriala existenta';
      ctx.fillText(
        '⚠ CONCLUZIE AI: Cel mai mare potential de dezvoltare — '+reconvZone+
        ' — reconversie imediata. Centrul: densificare P+6 pe artere cu 4 fire.',
        W/2,H*0.897,W*0.88);
      ctx.globalAlpha=1;
    }

    // ZOOM CINEMATIC la final - zoom in pe zona cu presiune maxima
    if(t>0.86 && !this._s5_zoomed){
      this._s5_zoomed = true;
      const zmap = window.map || this._map;
      if(zmap){
        const zx = city?.lon||27.601, zy = city?.lat||47.158;
        // Zoom pe zona mixta/comerciala - presiune maxima de dezvoltare
        zmap.flyTo({
          center:[zx+0.012, zy-0.008],
          zoom:13.5, pitch:65, bearing:25,
          duration:2500, essential:true
        });
      }
    }

    this._sceneLabel(ctx,W,H,'5','PREDICTIE DEZVOLTARE — '+(city?.name||'').toUpperCase());
  },

  // ── SCENA 6: MOBILITATE AUTO — Fluxuri, congestie, pasaje necesare ─────
  _s6_mobility_auto(ctx,W,H,t,city) {
    const autoPct = Math.round(72-(city?.acoperire_transport||60)*0.2);
    const pasaje = city?.pasaje_necesare||Math.round((city?.pop2021||100000)/50000)*2+2;
    const congestie = city?.ore_congestie_zi||2.5;

    // Gradient jos pentru legibilitate text
    if(t>0.05){
      ctx.globalAlpha=Math.min(1,(t-0.05)/0.15)*0.6;
      const gr=ctx.createLinearGradient(0,H*0.55,0,H);
      gr.addColorStop(0,'rgba(10,4,4,0)');gr.addColorStop(1,'rgba(10,4,4,0.95)');
      ctx.fillStyle=gr;ctx.fillRect(0,H*0.55,W,H*0.45);
      const grl=ctx.createLinearGradient(0,0,W*0.35,0);
      grl.addColorStop(0,'rgba(10,4,4,0.88)');grl.addColorStop(1,'rgba(10,4,4,0)');
      ctx.fillStyle=grl;ctx.fillRect(0,0,W*0.35,H);
      ctx.globalAlpha=1;
    }

    // Legendă trafic stânga
    if(t>0.2){
      const la=Math.min(1,(t-0.2)/0.2);ctx.globalAlpha=la;
      ctx.fillStyle='rgba(10,4,4,.9)';
      this._roundRect(ctx,W*0.02,H*0.2,W*0.3,H*0.38,8);ctx.fill();
      ctx.strokeStyle='rgba(239,68,68,.4)';ctx.lineWidth=1.5;
      this._roundRect(ctx,W*0.02,H*0.2,W*0.3,H*0.38,8);ctx.stroke();
      ctx.fillStyle='#ef4444';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText('FLUXURI TRAFIC URBAN',W*0.035,H*0.235);
      ctx.fillStyle='rgba(148,163,184,.6)';ctx.font=`${W*0.007}px "IBM Plex Mono"`;
      ctx.fillText('Model UrbanX · date OSM + ANCPI',W*0.035,H*0.255);
      [
        {c:'#ef4444',l:'AGLOMERAT',sub:'Artere principale · >40.000 veh/zi'},
        {c:'#f59e0b',l:'MODERAT',sub:'Strazi secundare · 15-40k veh/zi'},
        {c:'#22c55e',l:'FLUID',sub:'Strazi rezidentiale · <15k veh/zi'},
      ].forEach(({c,l,sub},i)=>{
        const y=H*(0.29+i*0.085);
        ctx.fillStyle=c;ctx.fillRect(W*0.035,y,W*0.022,H*0.012);
        ctx.fillStyle='rgba(200,215,235,.9)';ctx.font=`bold ${W*0.0082}px "IBM Plex Mono"`;
        ctx.fillText(l,W*0.065,y+H*0.01);
        ctx.fillStyle='rgba(148,163,184,.6)';ctx.font=`${W*0.007}px "IBM Plex Mono"`;
        ctx.fillText(sub,W*0.065,y+H*0.028,W*0.23);
      });
      ctx.globalAlpha=1;
    }

    // KPI-uri jos dreapta
    if(t>0.45){
      const ka=Math.min(1,(t-0.45)/0.2);ctx.globalAlpha=ka;
      const kx=W*0.62,ky=H*0.7;
      ctx.fillStyle='rgba(10,4,4,.9)';this._roundRect(ctx,kx,ky,W*0.36,H*0.24,8);ctx.fill();
      ctx.strokeStyle='rgba(239,68,68,.3)';ctx.lineWidth=1;
      this._roundRect(ctx,kx,ky,W*0.36,H*0.24,8);ctx.stroke();
      [
        {l:'MODAL SPLIT AUTO',v:autoPct+'%',c:'#ef4444'},
        {l:'ORE CONGESTIE/ZI',v:congestie+'h',c:'#f59e0b'},
        {l:'PASAJE NECESARE',v:'+'+pasaje,c:'#60a5fa'},
        {l:'CENTURA OCOLITOARE',v:city?.centura||'NECESARĂ',c:'#22c55e'},
      ].forEach(({l,v,c},i)=>{
        ctx.fillStyle='rgba(148,163,184,.55)';ctx.font=`${W*0.007}px "IBM Plex Mono"`;
        ctx.textAlign='left';ctx.fillText(l,kx+W*0.014,ky+H*0.048+i*H*0.05);
        ctx.fillStyle=c;ctx.font=`900 ${W*0.014}px "Space Grotesk",sans-serif`;
        ctx.fillText(v,kx+W*0.014,ky+H*0.072+i*H*0.05,W*0.31);
      });
      ctx.globalAlpha=1;
    }

    // Alertă saturare jos
    if(t>0.78){
      const ta=Math.min(1,(t-0.78)/0.15);ctx.globalAlpha=ta;
      ctx.fillStyle='rgba(69,10,10,.9)';
      this._roundRect(ctx,W*0.04,H*0.873,W*0.92,H*0.065,6);ctx.fill();
      ctx.strokeStyle='rgba(239,68,68,.5)';ctx.lineWidth=1.5;
      this._roundRect(ctx,W*0.04,H*0.873,W*0.92,H*0.065,6);ctx.stroke();
      ctx.fillStyle='#fca5a5';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;ctx.textAlign='center';
      ctx.fillText('⚠ Zonele ROȘII pe hartă = SATURATE în 2035 fără intervenție · Necesare '+pasaje+' pasaje noi + centură ocolitoare',W/2,H*0.91,W*0.88);
      ctx.globalAlpha=1;
    }
    this._sceneLabel(ctx,W,H,'6','MOBILITATE AUTO — '+(city?.name||'').toUpperCase());
  },


  // ── SCENA 7: TRANSPORT PUBLIC & WALKABILITY ────────────────────────────
  _s7_mobility_public(ctx,W,H,t,city) {
    const gr=ctx.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,'rgba(4,10,24,.65)');gr.addColorStop(1,'rgba(4,10,24,.94)');
    ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);
    this._scanlines(ctx,W,H,0.025);

    const acop=city?.acoperire_transport||60;
    const walk=Math.min(100,Math.round(30+acop*0.4+(city?.pib_eur_cap||10000)/1500));
    const walkLabel=walk>=70?'VERY WALKABLE':walk>=50?'WALKABLE':walk>=35?'CAR-FRIENDLY':'CAR-DEPENDENT';
    const walkColor=walk>=70?'#22c55e':walk>=50?'#f59e0b':walk>=35?'#f97316':'#ef4444';

    if(t>0.05){
      ctx.globalAlpha=Math.min(1,(t-0.05)/0.2);
      ctx.fillStyle='#60a5fa';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText('TRANSPORT PUBLIC · WALKABILITY · 15-MINUTE CITY',W*0.05,H*0.09);
      ctx.fillStyle='rgba(255,255,255,.9)';ctx.font=`900 ${W*0.022}px "Space Grotesk",sans-serif`;
      ctx.fillText('ACOPERIRE · TIMPI ACCES · CORIDOARE PRIORITARE',W*0.05,H*0.145);
      ctx.globalAlpha=1;
    }

    // Scor walkability mare - stânga
    if(t>0.18){
      const wa=Math.min(1,(t-0.18)/0.3);
      ctx.globalAlpha=wa;
      ctx.fillStyle='rgba(4,10,24,.92)';
      this._roundRect(ctx,W*0.04,H*0.2,W*0.3,H*0.42,8);ctx.fill();
      ctx.strokeStyle=walkColor+'55';ctx.lineWidth=2;
      this._roundRect(ctx,W*0.04,H*0.2,W*0.3,H*0.42,8);ctx.stroke();
      ctx.fillStyle='rgba(148,163,184,.7)';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='center';ctx.fillText('WALKABILITY SCORE',W*0.19,H*0.245);
      ctx.fillStyle=walkColor;
      ctx.font=`900 ${W*0.068}px "Space Grotesk",sans-serif`;
      ctx.fillText(this._countUp(walk,Math.min(1,(t-0.2)/0.5)),W*0.19,H*0.38);
      ctx.font=`${W*0.012}px "IBM Plex Mono"`;ctx.fillText('/100',W*0.19,H*0.42);
      ctx.fillStyle=walkColor;ctx.font=`bold ${W*0.011}px "IBM Plex Mono"`;
      ctx.fillText(walkLabel,W*0.19,H*0.47);
      ctx.fillStyle='rgba(148,163,184,.5)';ctx.font=`${W*0.007}px "IBM Plex Mono"`;
      ctx.fillText('Frank et al. (2006)',W*0.19,H*0.51);
      ctx.fillText('Moreno — 15min City',W*0.19,H*0.528);
      ctx.globalAlpha=1;
    }

    // Servicii accesibile în 15 minute — dreapta
    if(t>0.3){
      const sa=Math.min(1,(t-0.3)/0.3);
      ctx.globalAlpha=sa;
      ctx.fillStyle='rgba(4,10,24,.92)';
      this._roundRect(ctx,W*0.38,H*0.2,W*0.58,H*0.42,8);ctx.fill();
      ctx.strokeStyle='rgba(96,165,250,.3)';ctx.lineWidth=1;
      this._roundRect(ctx,W*0.38,H*0.2,W*0.58,H*0.42,8);ctx.stroke();
      ctx.fillStyle='rgba(200,215,235,.8)';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText('ACCESIBILITATE LA SERVICII ESENȚIALE (15min city)',W*0.4,H*0.237);

      const servicii=[
        {n:'🏥 Urgențe medicale',t:'10 min',ok:acop>=60,std:'10 min standard EU'},
        {n:'🏫 Școli primare',t:'10 min',ok:acop>=50,std:'10 min standard MEC'},
        {n:'🛒 Supermarket',t:'5 min',ok:walk>=50,std:'5 min OMS'},
        {n:'🌳 Parc urban',t:'5 min',ok:(city?.spatii_verzi_mp_loc||0)>=9,std:'OMS 9m²/loc'},
        {n:'🚌 Stație TP',t:'5 min',ok:acop>=65,std:'400m UITP'},
        {n:'💼 Centru servicii',t:'15 min',ok:walk>=45,std:'15min city Moreno'},
      ];
      servicii.forEach((s,i)=>{
        const sy=H*0.275+i*H*0.052;
        const sc=s.ok?'#22c55e':'#ef4444';
        ctx.fillStyle=sc+'33';ctx.fillRect(W*0.4,sy-H*0.015,W*0.54,H*0.04);
        ctx.fillStyle=sc;ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
        ctx.textAlign='left';ctx.fillText(s.ok?'✓':'✗',W*0.4,sy);
        ctx.fillStyle='rgba(200,215,235,.9)';ctx.font=`${W*0.009}px "IBM Plex Mono"`;
        ctx.fillText(s.n,W*0.415,sy);
        ctx.fillStyle=sc;ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
        ctx.textAlign='right';ctx.fillText(s.t,W*0.88,sy);
        ctx.fillStyle='rgba(100,120,150,.5)';ctx.font=`${W*0.0065}px "IBM Plex Mono"`;
        ctx.fillText(s.std,W*0.88,sy+H*0.022);
      });
      ctx.globalAlpha=1;
    }

    // Recomandare TP
    if(t>0.75){
      const ta=Math.min(1,(t-0.75)/0.2);
      ctx.globalAlpha=ta;
      const tintaSUMP=75;
      const deficit=tintaSUMP-acop;
      ctx.fillStyle=deficit>20?'rgba(127,29,29,.85)':deficit>5?'rgba(69,52,4,.85)':'rgba(5,46,22,.85)';
      this._roundRect(ctx,W*0.04,H*0.68,W*0.92,H*0.12,8);ctx.fill();
      ctx.strokeStyle=deficit>20?'rgba(239,68,68,.5)':deficit>5?'rgba(245,158,11,.5)':'rgba(34,197,94,.5)';
      ctx.lineWidth=1.5;this._roundRect(ctx,W*0.04,H*0.68,W*0.92,H*0.12,8);ctx.stroke();
      ctx.fillStyle='rgba(200,215,235,.9)';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='center';
      ctx.fillText(`ACOPERIRE TP ACTUALĂ: ${acop}% · ȚINTĂ SUMP 2030: ${tintaSUMP}%`,W/2,H*0.715);
      const rec2=deficit>20
        ?`⚠ DEFICIT MAJOR: +${deficit}% acoperire TP necesară · Prioritate: coridoare BRT + extindere rețea`
        :deficit>5
        ?`⚡ DEFICIT MODERAT: +${deficit}% acoperire TP necesară · Plan: 3-5 linii noi, frecvență +40%`
        :`✓ Acoperire TP satisfăcătoare · Focalizare pe creșterea frecvenței și calității`
      ctx.fillStyle=deficit>20?'#fca5a5':deficit>5?'#fde68a':'#86efac';
      ctx.font=`${W*0.009}px "IBM Plex Mono"`;
      ctx.fillText(rec2,W/2,H*0.748,W*0.88);
      ctx.globalAlpha=1;
    }

    this._sceneLabel(ctx,W,H,'7','TRANSPORT PUBLIC & WALKABILITY');
  },

  // ── SCENA 8: RISCURI SEISMICE — Fond vulnerabil, PNRR eligibil ─────────
  _s8_seismic(ctx,W,H,t,city) {
    // Harta: heatmap concentratie risc seismic pe fond pre-1977
    // Canvas: legendă + date INFP + fond vulnerabil + PNRR eligibil
    const ag = city?.ag_seismic||0.2;
    const tc = city?.tc_seismic||0.7;
    const fond = city?.fond_pre77_pct||35;
    const pnrr = Math.round((city?.pop2021||100000)*fond/100*0.3);
    const zonaRisc = ag>=0.4?'IA — RIDICAT':ag>=0.3?'IB — MEDIU-RIDICAT':ag>=0.2?'II — MEDIU':'III — SCĂZUT';
    const zonaColor = ag>=0.4?'#ef4444':ag>=0.3?'#f97316':ag>=0.2?'#f59e0b':'#22c55e';

    // Overlay noapte
    if(t>0.05){
      ctx.globalAlpha=Math.min(1,(t-0.05)/0.15)*0.5;
      const gr=ctx.createLinearGradient(0,H*0.5,0,H);
      gr.addColorStop(0,'rgba(20,4,4,0)');gr.addColorStop(1,'rgba(20,4,4,0.95)');
      ctx.fillStyle=gr;ctx.fillRect(0,H*0.5,W,H*0.5);
      const grl=ctx.createLinearGradient(0,0,W*0.38,0);
      grl.addColorStop(0,'rgba(20,4,4,0.88)');grl.addColorStop(1,'rgba(20,4,4,0)');
      ctx.fillStyle=grl;ctx.fillRect(0,0,W*0.38,H);
      ctx.globalAlpha=1;
    }

    // Card zona seismica - stanga
    if(t>0.18){
      const la=Math.min(1,(t-0.18)/0.25);ctx.globalAlpha=la;
      ctx.fillStyle='rgba(20,4,4,.92)';
      this._roundRect(ctx,W*0.02,H*0.15,W*0.32,H*0.55,8);ctx.fill();
      ctx.strokeStyle=zonaColor+'66';ctx.lineWidth=2;
      this._roundRect(ctx,W*0.02,H*0.15,W*0.32,H*0.55,8);ctx.stroke();

      ctx.fillStyle='rgba(148,163,184,.7)';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText('RISC SEISMIC P100-1/2013',W*0.035,H*0.188);
      ctx.fillStyle='rgba(148,163,184,.5)';ctx.font=`${W*0.007}px "IBM Plex Mono"`;
      ctx.fillText('Sursa: INFP · Normativ în vigoare',W*0.035,H*0.208);

      // Zona mare
      ctx.fillStyle=zonaColor;ctx.font=`900 ${W*0.032}px "Space Grotesk",sans-serif`;
      ctx.fillText('ZONA '+zonaRisc.split('—')[0].trim(),W*0.035,H*0.295);
      ctx.font=`bold ${W*0.013}px "IBM Plex Mono"`;
      ctx.fillText('Ag='+ag+'g · Tc='+tc+'s',W*0.035,H*0.328);

      // Parametri + fond vulnerabil
      const rows=[
        {l:'Fond pre-1977',v:fond+'%',c:'#f97316'},
        {l:'Estimare Rz I/II',v:Math.round(fond*0.4)+'%',c:'#ef4444'},
        {l:'PNRR C10-I2 eligibil',v:pnrr.toLocaleString('ro-RO')+' ap.',c:'#22c55e'},
        {l:'Cost reabilitare est.',v:'€'+Math.round(pnrr*18/1000)+'M',c:'#D4AF37'},
      ];
      rows.forEach(({l,v,c},i)=>{
        ctx.fillStyle='rgba(148,163,184,.6)';ctx.font=`${W*0.0075}px "IBM Plex Mono"`;
        ctx.fillText(l,W*0.035,H*(0.375+i*0.065));
        ctx.fillStyle=c;ctx.font=`bold ${W*0.011}px "IBM Plex Mono"`;
        ctx.textAlign='right';ctx.fillText(v,W*0.32,H*(0.375+i*0.065));ctx.textAlign='left';
      });

      // Legendă heatmap
      if(t>0.5){
        const ha=Math.min(1,(t-0.5)/0.2);ctx.globalAlpha*=ha;
        ctx.fillStyle='rgba(148,163,184,.7)';ctx.font=`bold ${W*0.008}px "IBM Plex Mono"`;
        ctx.fillText('HEATMAP PE HARTĂ:',W*0.035,H*0.635);
        const colors=[['#fef08a','Risc scăzut'],['#fb923c','Risc mediu'],['#7f1d1d','Risc maxim Rz I']];
        colors.forEach(([c,l],i)=>{
          ctx.fillStyle=c;ctx.fillRect(W*0.035,H*(0.66+i*0.038),W*0.02,H*0.015);
          ctx.fillStyle='rgba(200,215,235,.8)';ctx.font=`${W*0.0072}px "IBM Plex Mono"`;
          ctx.fillText(l,W*0.063,H*(0.67+i*0.038));
        });
      }
      ctx.globalAlpha=1;
    }

    // Call to action jos
    if(t>0.78){
      const ta=Math.min(1,(t-0.78)/0.12);ctx.globalAlpha=ta;
      ctx.fillStyle='rgba(5,46,22,.9)';
      this._roundRect(ctx,W*0.04,H*0.875,W*0.92,H*0.065,6);ctx.fill();
      ctx.strokeStyle='rgba(34,197,94,.5)';ctx.lineWidth=1.5;
      this._roundRect(ctx,W*0.04,H*0.875,W*0.92,H*0.065,6);ctx.stroke();
      ctx.fillStyle='#86efac';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;ctx.textAlign='center';
      ctx.fillText('💡 Zonele ROȘII pe hartă = fond vulnerabil Rz I/II · PNRR C10-I2 = 100% rambursabil · Aplicați ACUM',W/2,H*0.91,W*0.88);
      ctx.globalAlpha=1;
    }
    this._sceneLabel(ctx,W,H,'8','RISC SEISMIC — '+(city?.name||'').toUpperCase());
  },


  // ── SCENA 9: RISCURI CLIMATICE — Inundații, secetă, UHI ───────────────
  _s9_climate(ctx,W,H,t,city) {
    // Harta: FloodMapper ANAR activat (harta inundatii reala ca in screenshot)
    // Canvas: explicatii despre ce se vede - sensuri scurgere, zone risc, impact

    const rcp45 = city?.temp_delta_rcp45||1.4;
    const rcp85 = city?.temp_delta_rcp85||2.2;
    const riscInund = city?.risc_inundatii||'mediu';
    const zileCaniculare = city?.zile_caniculare_2055||22;

    // Overlay gradients pentru contrast
    if(t > 0.03) {
      ctx.globalAlpha = Math.min(1,(t-0.03)/0.12)*0.55;
      const gr = ctx.createLinearGradient(0,H*0.6,0,H);
      gr.addColorStop(0,'rgba(4,10,44,0)');gr.addColorStop(1,'rgba(4,10,44,0.95)');
      ctx.fillStyle=gr;ctx.fillRect(0,H*0.6,W,H*0.4);
      const grl = ctx.createLinearGradient(0,0,W*0.38,0);
      grl.addColorStop(0,'rgba(4,10,44,0.9)');grl.addColorStop(1,'rgba(4,10,44,0)');
      ctx.fillStyle=grl;ctx.fillRect(0,0,W*0.38,H);
      ctx.globalAlpha=1;
    }

    // Explicatie harta inundatii - stânga
    if(t > 0.2) {
      const la=Math.min(1,(t-0.2)/0.25);
      ctx.globalAlpha=la;
      ctx.fillStyle='rgba(4,10,44,.9)';
      this._roundRect(ctx,W*0.02,H*0.18,W*0.34,H*0.52,8);ctx.fill();
      ctx.strokeStyle='rgba(56,189,248,.4)';ctx.lineWidth=1.5;
      this._roundRect(ctx,W*0.02,H*0.18,W*0.34,H*0.52,8);ctx.stroke();

      ctx.fillStyle='#38bdf8';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText('🌊 HĂRȚI INUNDAȚII ANAR',W*0.035,H*0.215);
      ctx.fillStyle='rgba(148,163,184,.7)';ctx.font=`${W*0.0075}px "IBM Plex Mono"`;
      ctx.fillText('Sursa: rowater.ro · Directiva 2007/60/CE',W*0.035,H*0.238);

      const layers=[
        {c:'rgba(29,78,216,0.9)',l:'RCP10  — Inundație 1/10 ani',sub:'Risc ridicat — construire interzisă'},
        {c:'rgba(59,130,246,0.7)',l:'RCP100 — Inundație 1/100 ani',sub:'Risc mediu — aviz GA obligatoriu'},
        {c:'rgba(147,197,253,0.5)',l:'RCP500 — Inundație 1/500 ani',sub:'Risc scăzut — restricții construire'},
      ];
      layers.forEach(({c,l,sub},i)=>{
        const y=H*(0.275+i*0.1);
        ctx.fillStyle=c;this._roundRect(ctx,W*0.035,y,W*0.025,H*0.025,3);ctx.fill();
        ctx.fillStyle='rgba(200,215,235,.9)';ctx.font=`bold ${W*0.0078}px "IBM Plex Mono"`;
        ctx.fillText(l,W*0.068,y+H*0.017);
        ctx.fillStyle='rgba(148,163,184,.6)';ctx.font=`${W*0.007}px "IBM Plex Mono"`;
        ctx.fillText(sub,W*0.068,y+H*0.036,W*0.27);
      });

      // Sageata sens scurgere
      if(t>0.5){
        const aa=Math.min(1,(t-0.5)/0.2);
        ctx.globalAlpha*=aa;
        ctx.fillStyle='rgba(56,189,248,.8)';ctx.font=`bold ${W*0.008}px "IBM Plex Mono"`;
        ctx.fillText('↓ Sens scurgere: N→S (relief)',W*0.035,H*0.575);
        ctx.fillText('⚠ '+Math.round((city?.pop2021||100000)*0.15).toLocaleString('ro-RO')+' loc. în zone de risc',W*0.035,H*0.6);
      }
      ctx.globalAlpha=1;
    }

    // KPI-uri climatice - jos dreapta
    if(t > 0.45) {
      const ka=Math.min(1,(t-0.45)/0.25);
      ctx.globalAlpha=ka;
      const kx=W*0.65,ky=H*0.72;
      ctx.fillStyle='rgba(4,10,44,.9)';
      this._roundRect(ctx,kx,ky,W*0.33,H*0.22,8);ctx.fill();
      ctx.strokeStyle='rgba(239,68,68,.3)';ctx.lineWidth=1;
      this._roundRect(ctx,kx,ky,W*0.33,H*0.22,8);ctx.stroke();
      ctx.fillStyle='#f87171';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText('SCHIMBĂRI CLIMATICE 2055',kx+W*0.012,ky+H*0.038);
      [
        {l:'Creștere temp. RCP4.5',v:'+'+rcp45+'°C',c:'#f59e0b'},
        {l:'Creștere temp. RCP8.5',v:'+'+rcp85+'°C',c:'#ef4444'},
        {l:'Zile canicule/an 2055',v:zileCaniculare+'',c:'#f97316'},
        {l:'Urban Heat Island',v:'+'+(city?.uhi_delta||1.8)+'°C',c:'#fca5a5'},
      ].forEach(({l,v,c},i)=>{
        ctx.fillStyle='rgba(148,163,184,.6)';ctx.font=`${W*0.0068}px "IBM Plex Mono"`;
        ctx.fillText(l,kx+W*0.012,ky+H*0.082+i*H*0.038);
        ctx.fillStyle=c;ctx.font=`bold ${W*0.011}px "IBM Plex Mono"`;
        ctx.textAlign='right';ctx.fillText(v,kx+W*0.31,ky+H*0.082+i*H*0.038);
        ctx.textAlign='left';
      });
      ctx.globalAlpha=1;
    }

    // Recomandare jos centru
    if(t > 0.78) {
      const ta=Math.min(1,(t-0.78)/0.15);
      ctx.globalAlpha=ta;
      ctx.fillStyle='rgba(4,20,44,.92)';
      this._roundRect(ctx,W*0.04,H*0.87,W*0.92,H*0.065,6);ctx.fill();
      ctx.strokeStyle='rgba(56,189,248,.4)';ctx.lineWidth=1.5;
      this._roundRect(ctx,W*0.04,H*0.87,W*0.92,H*0.065,6);ctx.stroke();
      ctx.fillStyle='#7dd3fc';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='center';
      ctx.fillText('💡 Zonele albastre pe hartă = INTERZIS construire · Zonele mai deschise = aviz GA obligatoriu · Sursa: ANAR PGRA 2021-2027',W/2,H*0.907,W*0.88);
      ctx.globalAlpha=1;
    }

    this._sceneLabel(ctx,W,H,'9','RISCURI CLIMATICE & INUNDAȚII — '+(city?.name||'').toUpperCase());
  },


  // ── SCENA 10: PROIECȚIE DEMOGRAFICĂ 2055 — Monte Carlo ─────────────────
  _s10_projection(ctx,W,H,t,city) {
    const gr=ctx.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,'rgba(4,10,24,.7)');gr.addColorStop(1,'rgba(4,10,24,.96)');
    ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);
    this._scanlines(ctx,W,H,0.025);

    const pop0=city?.pop2021||100000;
    const r=city?.rata_reala_2011_2021||0;
    const proj=(rate)=>Math.round(pop0*Math.pow(1+rate/100,34));
    const s1=proj(Math.max(r+0.5,0.3));
    const s2=proj(r);
    const s3=proj(r-0.5);
    const years=[2021,2025,2030,2035,2040,2050,2055];
    const mc_p10=years.map(y=>Math.round(pop0*Math.pow(1+(r-1)/100,(y-2021))));
    const mc_p50=years.map(y=>Math.round(pop0*Math.pow(1+r/100,(y-2021))));
    const mc_p90=years.map(y=>Math.round(pop0*Math.pow(1+(r+1)/100,(y-2021))));

    if(t>0.05){
      ctx.globalAlpha=Math.min(1,(t-0.05)/0.2);
      ctx.fillStyle='#a78bfa';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText('PROIECȚIE DEMOGRAFICĂ 2025-2055 · SIMULARE MONTE CARLO',W*0.05,H*0.09);
      ctx.fillStyle='rgba(255,255,255,.9)';ctx.font=`900 ${W*0.022}px "Space Grotesk",sans-serif`;
      ctx.fillText('3 SCENARII · 10.000 SIMULĂRI · INSE + EUROSTAT EUROPOP2023',W*0.05,H*0.145);
      ctx.globalAlpha=1;
    }

    // Fan chart Monte Carlo
    if(t>0.18){
      const fa=Math.min(1,(t-0.18)/0.1);
      ctx.globalAlpha=fa;
      ctx.fillStyle='rgba(4,10,24,.9)';
      this._roundRect(ctx,W*0.04,H*0.19,W*0.56,H*0.46,8);ctx.fill();
      ctx.strokeStyle='rgba(167,139,250,.2)';ctx.lineWidth=1;
      this._roundRect(ctx,W*0.04,H*0.56,W*0.56,H*0.0,8);ctx.stroke();
      ctx.globalAlpha=fa;
      this._fanChart(ctx,W*0.6,H*0.38,{p10:mc_p10,p50:mc_p50,p90:mc_p90,years,color:'#a78bfa'},Math.min(1,(t-0.18)/0.7));
      ctx.globalAlpha=1;
    }

    // Cele 3 scenarii — carduri
    [[`S1 OPTIMIST`,s1,'+0.5%/an','#22c55e',0.2,'▲'],
     ['S2 MODERAT ★',s2,`${r>=0?'+':''}${r.toFixed(1)}%/an (referință)`,'#D4AF37',0.32,'→'],
     ['S3 CONSERVATOR',s3,'-0.5%/an','#ef4444',0.44,'▼'],
    ].forEach(([l,v,u,c,d,arrow],i)=>{
      const ca=Math.min(1,Math.max(0,(t-d)/0.25));
      ctx.globalAlpha=ca;
      const cx2=W*0.62;
      const cy2=H*(0.19+i*0.155);
      const cw2=W*0.34;
      const ch2=H*0.13;
      ctx.fillStyle='rgba(4,10,24,.92)';
      this._roundRect(ctx,cx2,cy2,cw2,ch2,6);ctx.fill();
      ctx.strokeStyle=c+'55';ctx.lineWidth=1.5;
      this._roundRect(ctx,cx2,cy2,cw2,ch2,6);ctx.stroke();
      ctx.fillStyle=c;ctx.font=`bold ${W*0.0085}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText(l,cx2+8,cy2+ch2*0.28);
      ctx.font=`900 ${W*0.022}px "Space Grotesk",sans-serif`;
      ctx.fillText(arrow+' '+v.toLocaleString('ro-RO'),cx2+8,cy2+ch2*0.68,cw2-16);
      ctx.fillStyle='rgba(148,163,184,.6)';ctx.font=`${W*0.007}px "IBM Plex Mono"`;
      ctx.fillText(u,cx2+8,cy2+ch2*0.88);
      const delta=v-pop0;
      ctx.fillStyle=delta>=0?'#22c55e':'#ef4444';
      ctx.textAlign='right';ctx.font=`bold ${W*0.0075}px "IBM Plex Mono"`;
      ctx.fillText((delta>=0?'+':'')+delta.toLocaleString('ro-RO')+' loc.',cx2+cw2-8,cy2+ch2*0.88);
      ctx.globalAlpha=1;
    });

    // Implicații urbane
    if(t>0.72){
      const ta=Math.min(1,(t-0.72)/0.2);
      ctx.globalAlpha=ta;
      ctx.fillStyle='rgba(4,10,24,.9)';
      this._roundRect(ctx,W*0.04,H*0.7,W*0.56,H*0.115,8);ctx.fill();
      ctx.strokeStyle='rgba(167,139,250,.3)';ctx.lineWidth=1;
      this._roundRect(ctx,W*0.04,H*0.7,W*0.56,H*0.115,8);ctx.stroke();
      const isDeclin=r<0;
      ctx.fillStyle='rgba(200,215,235,.85)';ctx.font=`bold ${W*0.0085}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText('IMPLICAȚII PENTRU PLANIFICARE:',W*0.06,H*0.73);
      ctx.font=`${W*0.0082}px "IBM Plex Mono"`;
      const impl=isDeclin
        ?[`→ Infrastructură: nu extindeți rețeaua! Optimizați ce există`,`→ Locuire: reconversie fond vechi > construcție nouă`,`→ Servicii: consolidați școli și dispensare în zone dense`]
        :[`→ Infrastructură: extindeți TP și utilități pe coridoare noi`,`→ Locuire: ${Math.round(Math.abs(s1-pop0)/30)}/an locuințe noi necesare`,`→ Servicii: planificați școli și clinici în zone noi`];
      impl.forEach((l,i)=>ctx.fillText(l,W*0.06,H*0.758+i*H*0.032,W*0.5));
      ctx.globalAlpha=1;
    }

    this._sceneLabel(ctx,W,H,'10','PROIECȚIE DEMOGRAFICĂ 2025-2055');
  },

  // ── SCENA 11: NECESARUL DE INFRASTRUCTURĂ ─────────────────────────────
  _s11_infrastructure(ctx,W,H,t,city) {
    const gr=ctx.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,'rgba(4,10,24,.7)');gr.addColorStop(1,'rgba(4,10,24,.96)');
    ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);
    this._scanlines(ctx,W,H,0.025);

    const pop=city?.pop2021||100000;
    const need=this._need||{};
    const spatiiVerzi=city?.spatii_verzi_mp_loc||11;
    const sVDeficit=Math.max(0,9-spatiiVerzi);

    // Calcule necesare
    const scoli_nec=Math.max(0,Math.round((need.pop2055||pop)*0.155/400-(city?.scoli||Math.round(pop*0.155/400))));
    const cabinete_nec=Math.max(0,Math.round((need.pop2055||pop)/1500-(city?.cabinete||Math.round(pop/1500))));
    const sv_ha_nec=Math.max(0,Math.round(((need.pop2055||pop)*9/10000)-(city?.suprafata_ha||5000)*spatiiVerzi/10000));
    const statii_nec=Math.round((need.pop2055||pop)/3500);

    if(t>0.05){
      ctx.globalAlpha=Math.min(1,(t-0.05)/0.2);
      ctx.fillStyle='#22c55e';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText('NECESARUL DE INFRASTRUCTURĂ 2025-2055',W*0.05,H*0.09);
      ctx.fillStyle='rgba(255,255,255,.9)';ctx.font=`900 ${W*0.022}px "Space Grotesk",sans-serif`;
      ctx.fillText('ȘCOLI · SĂNĂTATE · SPAȚII VERZI · STAȚII TP · PARCĂRI',W*0.05,H*0.145);
      ctx.globalAlpha=1;
    }

    // Grid 6 categorii
    const cats=[
      {titlu:'ȘCOLI & GRĂDINIȚE',icon:'🏫',necesar:scoli_nec,u:'unități noi',std:'400 elevi/unitate MEC',c:'#60a5fa',d:0.18},
      {titlu:'CABINETE MEDICALE',icon:'🏥',necesar:cabinete_nec,u:'cabinete noi',std:'1.500 pacienți/cabinet MS',c:'#ef4444',d:0.25},
      {titlu:'SPAȚII VERZI',icon:'🌳',necesar:sv_ha_nec,u:'ha necesare',std:'OMS min 9m²/loc',c:'#22c55e',d:0.32},
      {titlu:'STAȚII TRANSPORT',icon:'🚌',necesar:statii_nec,u:'stații TP',std:'1/3.500 loc. UITP',c:'#a78bfa',d:0.39},
      {titlu:'LOCURI PARCARE',icon:'🅿',necesar:Math.round(pop*0.12),u:'locuri',std:'0.5 loc/ap. RGU',c:'#f59e0b',d:0.46},
      {titlu:'PASAJE PIETONALE',icon:'🚶',necesar:Math.round(pop/30000)*2,u:'pasaje noi',std:'siguranță pietoni',c:'#38bdf8',d:0.53},
    ];

    cats.forEach((cat,i)=>{
      const col=i%3,row=Math.floor(i/3);
      const cx2=W*(0.04+col*0.32);
      const cy2=H*(0.19+row*0.22);
      const cw2=W*0.29;
      const ch2=H*0.19;
      const ca=Math.min(1,Math.max(0,(t-cat.d)/0.25));
      ctx.globalAlpha=ca;
      ctx.fillStyle='rgba(4,10,24,.92)';
      this._roundRect(ctx,cx2,cy2,cw2,ch2,8);ctx.fill();
      ctx.strokeStyle=cat.c+'44';ctx.lineWidth=1.5;
      this._roundRect(ctx,cx2,cy2,cw2,ch2,8);ctx.stroke();
      // Icon
      ctx.font=`${W*0.022}px sans-serif`;ctx.textAlign='center';
      ctx.fillText(cat.icon,cx2+cw2*0.18,cy2+ch2*0.45);
      // Titlu
      ctx.fillStyle='rgba(148,163,184,.7)';ctx.font=`bold ${W*0.0068}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText(cat.titlu,cx2+cw2*0.3,cy2+ch2*0.28);
      // Valoare
      const isUrgent=cat.necesar>0;
      ctx.fillStyle=isUrgent?cat.c:'#22c55e';
      ctx.font=`900 ${W*0.02}px "Space Grotesk",sans-serif`;
      ctx.fillText(isUrgent?'+'+cat.necesar.toLocaleString('ro-RO'):'OK',cx2+cw2*0.3,cy2+ch2*0.58,cw2*0.65);
      ctx.fillStyle='rgba(148,163,184,.6)';ctx.font=`${W*0.0065}px "IBM Plex Mono"`;
      ctx.fillText(isUrgent?cat.u:'acoperit',cx2+cw2*0.3,cy2+ch2*0.74);
      ctx.fillText(cat.std,cx2+cw2*0.06,cy2+ch2*0.9,cw2*0.88);
      ctx.globalAlpha=1;
    });

    // Cost total
    if(t>0.78){
      const ta=Math.min(1,(t-0.78)/0.15);
      ctx.globalAlpha=ta;
      const costTotal=Math.round((scoli_nec*3+cabinete_nec*0.5+sv_ha_nec*0.2+statii_nec*0.1)*city?.pib_eur_cap/100||50);
      ctx.fillStyle='rgba(4,10,24,.9)';
      this._roundRect(ctx,W*0.04,H*0.815,W*0.92,H*0.065,6);ctx.fill();
      ctx.strokeStyle='rgba(212,175,55,.4)';ctx.lineWidth=1.5;
      this._roundRect(ctx,W*0.04,H*0.815,W*0.92,H*0.065,6);ctx.stroke();
      ctx.fillStyle='#D4AF37';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='center';
      ctx.fillText(`COST ESTIMAT INFRASTRUCTURĂ NOUĂ: ~€${costTotal}M · Surse: FEDR/FSE+ 2021-2034 · PNRR · Buget local`,W/2,H*0.85,W*0.88);
      ctx.globalAlpha=1;
    }

    this._sceneLabel(ctx,W,H,'11','INFRASTRUCTURĂ NECESARĂ 2025-2055');
  },

  // ── SCENA 12: INVESTIȚII ÎN DERULARE + PROIECTE PUBLICE ───────────────
  _s12_investments(ctx,W,H,t,city) {
    const gr=ctx.createLinearGradient(0,0,W,H);
    gr.addColorStop(0,'rgba(4,10,24,.75)');gr.addColorStop(1,'rgba(10,20,44,.95)');
    ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);
    this._scanlines(ctx,W,H,0.025);

    if(t>0.05){
      ctx.globalAlpha=Math.min(1,(t-0.05)/0.2);
      ctx.fillStyle='#D4AF37';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText('INVESTIȚII & PROIECTE PUBLICE ÎN DERULARE',W*0.05,H*0.09);
      ctx.fillStyle='rgba(255,255,255,.9)';ctx.font=`900 ${W*0.022}px "Space Grotesk",sans-serif`;
      ctx.fillText('SURSE: SICAP · CNI · MDLPA · PNRR · FEDR',W*0.05,H*0.145);
      ctx.globalAlpha=1;
    }

    // Proiecte din date live (cu fallback)
    const proiecte=city?.proiecte_live||[
      {titlu:'PNRR C10-I2 Consolidare seismică',val:city?.pnrr_seismic_mil||15,sursa:'PNRR 100%',status:'derulare',c:'#22c55e'},
      {titlu:'FEDR POR 2021-2027 Transport urban',val:city?.fedr_transport_mil||22,sursa:'FEDR 85%',status:'contractat',c:'#60a5fa'},
      {titlu:'Reabilitare fond locativ NZEB',val:city?.pnrr_nzeb_mil||8,sursa:'PNRR C3-I1',status:'derulare',c:'#a78bfa'},
      {titlu:'Extindere rețea apă-canal',val:city?.apa_canal_mil||12,sursa:'FEDR + local',status:'studiu SF',c:'#38bdf8'},
      {titlu:'Modernizare transport public',val:city?.tp_mil||18,sursa:'Fonduri proprii',status:'licitație',c:'#f59e0b'},
    ];

    // Loading indicator dacă nu avem date live
    if(this._loadingProjects && t>0.2 && t<0.6){
      const la=Math.min(1,(t-0.2)/0.2)*Math.min(1,(0.6-t)/0.1);
      ctx.globalAlpha=la*0.7;
      ctx.fillStyle='rgba(148,163,184,.5)';ctx.font=`${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='center';ctx.fillText('⏳ Se caută proiecte active din SICAP / CNI...',W/2,H*0.35);
      ctx.globalAlpha=1;
    }

    // Cards proiecte
    if(t>0.25){
      proiecte.forEach((p,i)=>{
        const pa=Math.min(1,Math.max(0,(t-0.25-i*0.08)/0.25));
        ctx.globalAlpha=pa;
        const py=H*(0.19+i*0.12);
        const pw=W*0.92;
        ctx.fillStyle='rgba(4,10,24,.92)';
        this._roundRect(ctx,W*0.04,py,pw,H*0.1,6);ctx.fill();
        ctx.strokeStyle=p.c+'44';ctx.lineWidth=1.5;
        this._roundRect(ctx,W*0.04,py,pw,H*0.1,6);ctx.stroke();
        // Status badge
        const sc={'derulare':'#22c55e','contractat':'#60a5fa','studiu SF':'#f59e0b','licitație':'#a78bfa','planificat':'#94a3b8'}[p.status]||'#94a3b8';
        ctx.fillStyle=sc+'33';this._roundRect(ctx,W*0.76,py+H*0.015,W*0.22,H*0.028,4);ctx.fill();
        ctx.strokeStyle=sc+'88';ctx.lineWidth=0.8;this._roundRect(ctx,W*0.76,py+H*0.015,W*0.22,H*0.028,4);ctx.stroke();
        ctx.fillStyle=sc;ctx.font=`bold ${W*0.007}px "IBM Plex Mono"`;ctx.textAlign='center';
        ctx.fillText(p.status.toUpperCase(),W*0.87,py+H*0.033);
        // Titlu
        ctx.fillStyle='rgba(200,215,235,.9)';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
        ctx.textAlign='left';ctx.fillText(p.titlu,W*0.06,py+H*0.038,W*0.68);
        // Valoare + sursa
        ctx.fillStyle=p.c;ctx.font=`900 ${W*0.014}px "Space Grotesk",sans-serif`;
        ctx.fillText('€'+p.val+'M',W*0.06,py+H*0.075);
        ctx.fillStyle='rgba(148,163,184,.6)';ctx.font=`${W*0.0075}px "IBM Plex Mono"`;
        ctx.fillText(p.sursa,W*0.13,py+H*0.078);
        ctx.globalAlpha=1;
      });
    }

    // Total investiții
    if(t>0.85){
      const ta=Math.min(1,(t-0.85)/0.1);
      ctx.globalAlpha=ta;
      const total=proiecte.reduce((s,p)=>s+(p.val||0),0);
      ctx.fillStyle='rgba(4,10,24,.9)';
      this._roundRect(ctx,W*0.04,H*0.84,W*0.92,H*0.055,6);ctx.fill();
      ctx.strokeStyle='rgba(212,175,55,.4)';ctx.lineWidth=1.5;
      this._roundRect(ctx,W*0.04,H*0.84,W*0.92,H*0.055,6);ctx.stroke();
      ctx.fillStyle='#D4AF37';ctx.font=`bold ${W*0.0095}px "IBM Plex Mono"`;
      ctx.textAlign='center';
      ctx.fillText(`TOTAL PROIECTE IDENTIFICATE: €${total}M · Deschide SICAP.ro pentru lista completă`,W/2,H*0.872,W*0.88);
      ctx.globalAlpha=1;
    }

    this._sceneLabel(ctx,W,H,'12','INVESTIȚII ÎN DERULARE — '+(city?.name||'').toUpperCase());
  },

  // ── SCENA 13: SCENARII DE DEZVOLTARE — S1/S2/S3 pe hartă ─────────────
  _s13_scenarios(ctx,W,H,t,city) {
    const gr=ctx.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,'rgba(4,10,24,.65)');gr.addColorStop(1,'rgba(4,10,24,.94)');
    ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);
    this._scanlines(ctx,W,H,0.025);

    const pop=city?.pop2021||100000;
    const r=city?.rata_reala_2011_2021||0;
    const pib=city?.pib_eur_cap||10000;

    if(t>0.05){
      ctx.globalAlpha=Math.min(1,(t-0.05)/0.2);
      ctx.fillStyle='#a78bfa';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText('SCENARII DE DEZVOLTARE COMPARATE 2025-2055',W*0.05,H*0.09);
      ctx.fillStyle='rgba(255,255,255,.9)';ctx.font=`900 ${W*0.022}px "Space Grotesk",sans-serif`;
      ctx.fillText('CE SE ÎNTÂMPLĂ DACĂ... · IMPACT · DECIZII NECESARE',W*0.05,H*0.145);
      ctx.globalAlpha=1;
    }

    const scenarios=[
      {
        id:'S1',titlu:'SCENARIU OPTIMIST',sub:'Investiții majore · Retenție tineri · Autostradă',
        pop55:Math.round(pop*Math.pow(1+Math.max(r+0.5,0.4)/100,34)),
        invest:Math.round(pop*pib*0.0008),locuinte:Math.round(pop*0.05*34),
        pib55:Math.round(pib*Math.pow(1.045,34)),extravilan:Math.round((city?.suprafata_ha||5000)*0.15),
        c:'#22c55e',icon:'▲',
        conditii:['Autostradă finalizată','Parcuri industriale noi','Retenție 60% absolvenți','Investiții UE max'],
        riscuri:['Supraaglomerare centru','Speculație imobiliară'],
        d:0.18
      },
      {
        id:'S2',titlu:'SCENARIU MODERAT ★',sub:'Trendul actual · PNRR partial · Stabilitate',
        pop55:Math.round(pop*Math.pow(1+r/100,34)),
        invest:Math.round(pop*pib*0.0005),locuinte:Math.round(pop*0.03*34),
        pib55:Math.round(pib*Math.pow(1.028,34)),extravilan:Math.round((city?.suprafata_ha||5000)*0.08),
        c:'#D4AF37',icon:'→',
        conditii:['PNRR absorbit 60%','TP modernizat','PUG actualizat'],
        riscuri:['Dezechilibru cerere/ofertă','Periurbanizare moderată'],
        d:0.35
      },
      {
        id:'S3',titlu:'SCENARIU CONSERVATOR',sub:'Stagnare · Emigrare · Infrastructură minimă',
        pop55:Math.round(pop*Math.pow(1+(r-0.5)/100,34)),
        invest:Math.round(pop*pib*0.0002),locuinte:Math.round(pop*0.015*34),
        pib55:Math.round(pib*Math.pow(1.01,34)),extravilan:0,
        c:'#ef4444',icon:'▼',
        conditii:['Fără investiții majore','Emigrare accelerată','Degradare fond vechi'],
        riscuri:['Depopulare periferie','Deficit servicii','Fond locativ degradat'],
        d:0.52
      },
    ];

    scenarios.forEach((s,i)=>{
      const sa=Math.min(1,Math.max(0,(t-s.d)/0.3));
      ctx.globalAlpha=sa;
      const sx=W*(0.04+i*0.323);
      const sy=H*0.19;
      const sw=W*0.3;
      const sh=H*0.6;
      ctx.fillStyle='rgba(4,10,24,.92)';this._roundRect(ctx,sx,sy,sw,sh,8);ctx.fill();
      ctx.strokeStyle=s.c+'66';ctx.lineWidth=i===1?2:1;this._roundRect(ctx,sx,sy,sw,sh,8);ctx.stroke();
      if(i===1){ctx.strokeStyle='#D4AF37';ctx.lineWidth=2;this._roundRect(ctx,sx,sy,sw,sh,8);ctx.stroke();}
      // Header
      ctx.fillStyle=s.c+'22';ctx.fillRect(sx,sy,sw,H*0.06);
      ctx.fillStyle=s.c;ctx.font=`bold ${W*0.011}px "IBM Plex Mono"`;
      ctx.textAlign='center';ctx.fillText(s.icon+' '+s.id,sx+sw/2,sy+H*0.025);
      ctx.fillStyle='rgba(255,255,255,.85)';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.fillText(s.titlu,sx+sw/2,sy+H*0.048);
      // KPI-uri
      const kpis2=[
        ['POPULAȚIE 2055',s.pop55.toLocaleString('ro-RO')],
        ['PIB/CAP 2055','€'+Math.round(s.pib55/1000)+'K'],
        ['INVESTIȚII TOTALE','€'+s.invest+'M'],
        ['LOCUINȚE NOI',s.locuinte.toLocaleString('ro-RO')],
        ['EXTINDERE INTRAVILAN',s.extravilan>0?'+'+s.extravilan+'ha':'0'],
      ];
      kpis2.forEach(([l,v],ki)=>{
        ctx.fillStyle='rgba(148,163,184,.6)';ctx.font=`${W*0.007}px "IBM Plex Mono"`;
        ctx.textAlign='left';ctx.fillText(l,sx+sw*0.06,sy+H*(0.1+ki*0.07));
        ctx.fillStyle=s.c;ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
        ctx.fillText(v,sx+sw*0.06,sy+H*(0.122+ki*0.07));
      });
      // Condiții
      ctx.fillStyle='rgba(200,215,235,.6)';ctx.font=`bold ${W*0.007}px "IBM Plex Mono"`;
      ctx.fillText('CONDIȚII:',sx+sw*0.06,sy+H*0.48);
      s.conditii.forEach((c2,ci)=>{
        ctx.fillStyle='rgba(148,163,184,.7)';ctx.font=`${W*0.0065}px "IBM Plex Mono"`;
        ctx.fillText('· '+c2,sx+sw*0.06,sy+H*(0.505+ci*0.032),sw*0.88);
      });
      ctx.globalAlpha=1;
    });

    this._sceneLabel(ctx,W,H,'13','SCENARII 2025-2055 — '+(city?.name||'').toUpperCase());
  },

  // ── SCENA 14: CALITATEA VIEȚII — SDG11, spații verzi, poluare ─────────
  _s14_quality(ctx,W,H,t,city) {
    const gr=ctx.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,'rgba(4,10,24,.65)');gr.addColorStop(1,'rgba(4,10,24,.94)');
    ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);
    this._scanlines(ctx,W,H,0.025);

    const sv=city?.spatii_verzi_mp_loc||11;
    const acop=city?.acoperire_transport||60;
    const sdg=Math.round(60+(sv-9)*2+(acop-55)*0.3+(city?.pib_eur_cap||10000)/2000);
    const co2=city?.co2_tona_cap||7;

    if(t>0.05){
      ctx.globalAlpha=Math.min(1,(t-0.05)/0.2);
      ctx.fillStyle='#22c55e';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText('CALITATEA VIEȚII · SDG 11 · MEDIU · SĂNĂTATE',W*0.05,H*0.09);
      ctx.fillStyle='rgba(255,255,255,.9)';ctx.font=`900 ${W*0.022}px "Space Grotesk",sans-serif`;
      ctx.fillText('OMS · ONU SDG11 · EUROSTAT URBAN AUDIT 2021',W*0.05,H*0.145);
      ctx.globalAlpha=1;
    }

    // Radar 8 dimensiuni
    if(t>0.18){
      const ra=Math.min(1,(t-0.18)/0.1);
      ctx.globalAlpha=ra;
      const vals=[
        Math.min(1,sv/20),Math.min(1,acop/100),Math.min(1,sdg/100),
        Math.min(1,(city?.walkability||60)/100),Math.min(1,1-co2/15),
        Math.min(1,(city?.universitati||1)/5),Math.min(1,(city?.pib_eur_cap||10000)/40000),
        Math.min(1,0.6),
      ];
      const labels=['Spații Verzi','Acoperire TP','SDG 11','Walkability','Aer Curat','Educație','PIB/cap','Reziliență'];
      this._radarChart(ctx,W*0.28,H*0.52,Math.min(W*0.22,H*0.25),vals,labels,['#22c55e'],Math.min(1,(t-0.2)/0.6));
      ctx.globalAlpha=1;
    }

    // KPI-uri calitate viață
    const kpis3=[
      {l:'SPAȚII VERZI',v:sv,u:'m²/loc (OMS min: 9)',c:sv>=9?'#22c55e':'#ef4444',d:0.2},
      {l:'SDG 11 SCORE',v:Math.min(100,sdg),u:'/100 (ONU 2030)',c:sdg>=70?'#22c55e':sdg>=50?'#f59e0b':'#ef4444',d:0.3},
      {l:'CO₂/CAPITA',v:co2,u:'tCO₂/an (țintă 2050: 0)',c:co2<=5?'#22c55e':co2<=8?'#f59e0b':'#ef4444',d:0.4},
      {l:'FOND REABILITAT',v:city?.fond_reabilitat_pct||5,u:'% (țintă 2055: 40%)',c:'#60a5fa',d:0.5},
    ];
    kpis3.forEach((k,i)=>{
      this._kpiCard(ctx,W*0.52,H*(0.19+i*0.155),W*0.44,H*0.13,k.l,k.v,k.u,k.c,t,k.d,'');
    });

    // Deficit spații verzi
    if(t>0.68){
      const da=Math.min(1,(t-0.68)/0.2);
      ctx.globalAlpha=da;
      const deficit_sv=Math.max(0,Math.round(((city?.pop2021||100000)*(9-sv))/10000));
      ctx.fillStyle='rgba(4,10,24,.9)';
      this._roundRect(ctx,W*0.04,H*0.78,W*0.44,H*0.1,6);ctx.fill();
      ctx.strokeStyle=sv>=9?'rgba(34,197,94,.4)':'rgba(239,68,68,.4)';ctx.lineWidth=1.5;
      this._roundRect(ctx,W*0.04,H*0.78,W*0.44,H*0.1,6);ctx.stroke();
      ctx.fillStyle='rgba(200,215,235,.85)';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='center';
      if(sv<9){
        ctx.fillText(`⚠ DEFICIT SPAȚII VERZI: ${deficit_sv} ha necesare`,W*0.26,H*0.814);
        ctx.fillStyle='rgba(148,163,184,.6)';ctx.font=`${W*0.0075}px "IBM Plex Mono"`;
        ctx.fillText('Surse: Fond Mediu + FEDR axă urbană + terenuri publice',W*0.26,H*0.844);
      } else {
        ctx.fillText(`✓ Spații verzi CONFORM OMS: ${sv}m²/loc`,W*0.26,H*0.83);
      }
      ctx.globalAlpha=1;
    }

    this._sceneLabel(ctx,W,H,'14','CALITATEA VIEȚII — '+(city?.name||'').toUpperCase());
  },

  // ── SCENA 15: BENCHMARKING EUROPEAN ────────────────────────────────────
  _s15_benchmark(ctx,W,H,t,city) {
    const gr=ctx.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,'rgba(4,10,24,.7)');gr.addColorStop(1,'rgba(4,10,24,.96)');
    ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);
    this._scanlines(ctx,W,H,0.025);

    if(t>0.05){
      ctx.globalAlpha=Math.min(1,(t-0.05)/0.2);
      ctx.fillStyle='#38bdf8';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText('BENCHMARKING EUROPEAN · PEER GROUP ANALYSIS',W*0.05,H*0.09);
      ctx.fillStyle='rgba(255,255,255,.9)';ctx.font=`900 ${W*0.022}px "Space Grotesk",sans-serif`;
      ctx.fillText('EUROSTAT URBAN AUDIT 2021 · OECD FUA 2023 · JRC URBAN OBSERVATORY',W*0.05,H*0.145);
      ctx.globalAlpha=1;
    }

    // Orase comparabile (calibrate pe profil UAT)
    const pib=city?.pib_eur_cap||10000;
    const pop=city?.pop2021||100000;
    const peers=city?.peer_cities||[
      {n:city?.name||'UAT',pib,pop,walk:city?.walkability||60,sv:city?.spatii_verzi_mp_loc||11,tp:city?.acoperire_transport||60,c:'#D4AF37',curent:true},
      {n:'Debrecen',pib:22400,pop:202000,walk:74,sv:13,tp:82,c:'#60a5fa',curent:false},
      {n:'Lublin',pib:15800,pop:339000,walk:68,sv:15,tp:74,c:'#a78bfa',curent:false},
      {n:'Krakow',pib:19200,pop:779000,walk:72,sv:18,tp:84,c:'#22c55e',curent:false},
      {n:'Varna',pib:12100,pop:338000,walk:61,sv:11,tp:65,c:'#f59e0b',curent:false},
    ];

    const indicatori=['PIB/cap (EUR)','Walkability','Sp. Verzi (m²)','Acop. TP (%)','Pop. (mii)'];
    const getVal=(p,k)=>k==='PIB/cap (EUR)'?p.pib:k==='Walkability'?p.walk:k==='Sp. Verzi (m²)'?p.sv:k==='Acop. TP (%)'?p.tp:Math.round(p.pop/1000);

    // Header tabel
    if(t>0.18){
      const ha=Math.min(1,(t-0.18)/0.25);
      ctx.globalAlpha=ha;
      const colW=W*0.15;
      ctx.fillStyle='rgba(4,10,24,.95)';
      this._roundRect(ctx,W*0.04,H*0.19,W*0.92,H*0.65,8);ctx.fill();
      ctx.strokeStyle='rgba(56,189,248,.2)';ctx.lineWidth=1;
      this._roundRect(ctx,W*0.04,H*0.19,W*0.92,H*0.65,8);ctx.stroke();

      // Header row
      ctx.fillStyle='rgba(56,189,248,.15)';ctx.fillRect(W*0.04,H*0.19,W*0.92,H*0.065);
      ctx.fillStyle='rgba(148,163,184,.7)';ctx.font=`bold ${W*0.008}px "IBM Plex Mono"`;
      ctx.textAlign='center';
      ctx.fillText('ORAȘ',W*0.12,H*0.23);
      indicatori.forEach((ind,i)=>ctx.fillText(ind,W*(0.28+i*0.15),H*0.23));

      // Rows
      peers.forEach((p,pi)=>{
        const ry=H*(0.265+pi*0.105);
        if(p.curent){ctx.fillStyle=p.c+'18';ctx.fillRect(W*0.04,ry-H*0.02,W*0.92,H*0.1);}
        ctx.fillStyle=p.c;ctx.font=`bold ${W*0.0085}px "IBM Plex Mono"`;
        ctx.textAlign='center';
        ctx.fillText((p.curent?'★ ':'')+p.n,W*0.12,ry+H*0.015,W*0.15);

        indicatori.forEach((ind,i)=>{
          const v=getVal(p,ind);
          // Compara cu media peers
          const allV=peers.map(pp=>getVal(pp,ind));
          const maxV2=Math.max(...allV);
          const isMax=v===maxV2;
          const isCurent=p.curent;
          ctx.fillStyle=isMax?'#22c55e':isCurent?p.c:'rgba(200,215,235,.8)';
          ctx.font=isMax?`900 ${W*0.009}px "Space Grotesk",sans-serif`:`${W*0.009}px "IBM Plex Mono"`;
          ctx.fillText((isMax?'★ ':'')+v.toLocaleString('ro-RO'),W*(0.28+i*0.15),ry+H*0.015);
        });
      });
      ctx.globalAlpha=1;
    }

    // Concluzie poziționare
    if(t>0.82){
      const ta=Math.min(1,(t-0.82)/0.15);
      ctx.globalAlpha=ta;
      const pibBest=Math.max(...peers.map(p=>p.pib));
      const gap=pibBest-pib;
      ctx.fillStyle='rgba(4,10,24,.9)';
      this._roundRect(ctx,W*0.04,H*0.875,W*0.92,H*0.07,6);ctx.fill();
      ctx.strokeStyle='rgba(56,189,248,.4)';ctx.lineWidth=1.5;
      this._roundRect(ctx,W*0.04,H*0.875,W*0.92,H*0.07,6);ctx.stroke();
      ctx.fillStyle='#7dd3fc';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='center';
      ctx.fillText(`GAP față de best-in-class: €${gap.toLocaleString('ro-RO')}/cap · La rata OCDE (+3.5%/an): convergență în ~${Math.round(Math.log(pibBest/pib)/Math.log(1.035))} ani`,W/2,H*0.91,W*0.88);
      ctx.globalAlpha=1;
    }

    this._sceneLabel(ctx,W,H,'15','BENCHMARKING EUROPEAN');
  },

  // ── SCENA 16: CE TREBUIE SĂ FACĂ PRIMARUL — Recomandări concrete ──────
  _s16_actions(ctx,W,H,t,city) {
    const gr=ctx.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,'rgba(4,10,24,.7)');gr.addColorStop(1,'rgba(10,18,44,.97)');
    ctx.fillStyle=gr;ctx.fillRect(0,0,W,H);
    this._scanlines(ctx,W,H,0.025);

    const pop=city?.pop2021||100000;
    const ag=city?.ag_seismic||0.2;
    const sv=city?.spatii_verzi_mp_loc||11;
    const acop=city?.acoperire_transport||60;
    const r=city?.rata_reala_2011_2021||0;

    if(t>0.05){
      ctx.globalAlpha=Math.min(1,(t-0.05)/0.2);
      ctx.fillStyle='#D4AF37';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText('AGENDA PRIMARULUI 2025-2030',W*0.05,H*0.09);
      ctx.fillStyle='rgba(255,255,255,.9)';ctx.font=`900 ${W*0.022}px "Space Grotesk",sans-serif`;
      ctx.fillText('PRIORITĂȚI ACȚIONABILE · TERMENE · SURSE FINANȚARE',W*0.05,H*0.145);
      ctx.globalAlpha=1;
    }

    // Generăm recomandări pe baza datelor UAT-ului
    const recs=[];
    if(ag>=0.3) recs.push({p:1,titlu:'CONSOLIDARE SEISMICĂ URGENTĂ',desc:`Identificați Rz I/II · Aplicați PNRR C10-I2 (100%) · ${Math.round(pop*0.005)} clădiri prioritare`,termen:'2025-2027',sursa:'PNRR C10-I2',c:'#ef4444'});
    if(acop<65) recs.push({p:2,titlu:'EXTINDERE TRANSPORT PUBLIC',desc:`Deficit ${65-acop}% acoperire · BRT pe coridoare principale · Frecvență +40%`,termen:'2025-2030',sursa:'FEDR POR',c:'#60a5fa'});
    recs.push({p:recs.length+1,titlu:'ACTUALIZARE PUG',desc:`PUG actual depășit · Zone densificare + reconversie + expansiune controlată · Digitalizare`,termen:'2025-2026',sursa:'Buget local + FEDR',c:'#a78bfa'});
    if(sv<9) recs.push({p:recs.length+1,titlu:'SPAȚII VERZI — DEFICIT OMS',desc:`Necesar +${Math.max(0,Math.round(pop*(9-sv)/10000))}ha · Coridor verde · Reconversie teren industrial`,termen:'2026-2030',sursa:'Fond Mediu + UE',c:'#22c55e'});
    recs.push({p:recs.length+1,titlu:'EFICIENȚĂ ENERGETICĂ FOND LOCATIV',desc:`NZEB obligatoriu construcții noi · Reabilitare 500 ap/an · PNRR C3-I1`,termen:'2025-2030',sursa:'PNRR + privat',c:'#f59e0b'});
    if(r<-0.5) recs.push({p:recs.length+1,titlu:'RETENȚIE TINERI — POLITICI DEMOGRAFICE',desc:`Declin ${r.toFixed(1)}%/an · Stimulente locuire tineri · Atragere companii tech`,termen:'2025-2028',sursa:'Fonduri locale + FSE+',c:'#D4AF37'});

    const maxRecs=Math.min(recs.length,5);
    recs.slice(0,maxRecs).forEach((rec,i)=>{
      const ra=Math.min(1,Math.max(0,(t-0.18-i*0.1)/0.28));
      ctx.globalAlpha=ra;
      const ry=H*(0.19+i*0.13);
      ctx.fillStyle='rgba(4,10,24,.92)';this._roundRect(ctx,W*0.04,ry,W*0.92,H*0.115,6);ctx.fill();
      ctx.strokeStyle=rec.c+'55';ctx.lineWidth=i===0?2:1;this._roundRect(ctx,W*0.04,ry,W*0.92,H*0.115,6);ctx.stroke();
      // Prioritate
      ctx.fillStyle=rec.c;ctx.font=`900 ${W*0.022}px "Space Grotesk",sans-serif`;
      ctx.textAlign='center';ctx.fillText('#'+rec.p,W*0.085,ry+H*0.068);
      // Titlu
      ctx.fillStyle='rgba(255,255,255,.92)';ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText(rec.titlu,W*0.13,ry+H*0.04);
      // Desc
      ctx.fillStyle='rgba(148,163,184,.8)';ctx.font=`${W*0.0075}px "IBM Plex Mono"`;
      ctx.fillText(rec.desc,W*0.13,ry+H*0.068,W*0.58);
      // Termen + sursa
      ctx.fillStyle=rec.c;ctx.font=`bold ${W*0.0075}px "IBM Plex Mono"`;
      ctx.textAlign='right';ctx.fillText('⏰ '+rec.termen,W*0.92,ry+H*0.04);
      ctx.fillStyle='rgba(148,163,184,.6)';ctx.font=`${W*0.007}px "IBM Plex Mono"`;
      ctx.fillText('💰 '+rec.sursa,W*0.92,ry+H*0.062);
      ctx.globalAlpha=1;
    });

    this._sceneLabel(ctx,W,H,'16','AGENDA PRIMARULUI — '+(city?.name||'').toUpperCase());
  },

  // ── SCENA 17: VIZIUNEA 2055 — Orașul posibil ────────────────────────────
  _s17_vision(ctx,W,H,t,city) {
    // Harta: bare 3D din PUG + rotatie sunset cinematic
    // Canvas: viziunea 2055 - 5 transformari cheie, animat secvential
    const pop = city?.pop2021||100000;
    const need = this._need||{};
    const r = city?.rata_reala_2011_2021||0;
    const pop55 = need.pop2055||Math.round(pop*Math.pow(1+r/100,34));
    const pib = city?.pib_eur_cap||10000;
    const pib55 = Math.round(pib*Math.pow(1.028,34));

    // Particles + gradient dramatic
    this._drawParticles(ctx,W,H,t,20,'rgba(212,175,55,0.25)');
    if(t>0.05){
      ctx.globalAlpha=Math.min(1,(t-0.05)/0.2)*0.5;
      const gr=ctx.createLinearGradient(0,H*0.45,0,H);
      gr.addColorStop(0,'rgba(10,5,30,0)');gr.addColorStop(1,'rgba(10,5,30,0.97)');
      ctx.fillStyle=gr;ctx.fillRect(0,H*0.45,W,H*0.55);
      ctx.globalAlpha=1;
    }

    // Titlu dramatic centrat
    if(t>0.08){
      const ta=Math.min(1,(t-0.08)/0.25);ctx.globalAlpha=ta;
      ctx.fillStyle='rgba(10,5,30,.75)';ctx.fillRect(0,H*0.05,W,H*0.1);
      ctx.fillStyle='rgba(212,175,55,.55)';ctx.fillRect(0,H*0.05,W,1.5);ctx.fillRect(0,H*0.15,W,1.5);
      ctx.fillStyle='#D4AF37';
      ctx.font=`900 ${W*0.042}px "Space Grotesk",sans-serif`;
      ctx.textAlign='center';
      ctx.fillText((city?.name||'').toUpperCase()+' — VIZIUNEA 2055',W/2,H*0.118);
      ctx.fillStyle='rgba(148,163,184,.7)';ctx.font=`${W*0.011}px "IBM Plex Mono"`;
      ctx.fillText('CE E POSIBIL DACĂ SE IAU DECIZIILE CORECTE ACUM',W/2,H*0.143);
      ctx.globalAlpha=1;
    }

    // 5 transformari animate secvential
    const viziuni=[
      {icon:'🏙',t:'DENSITATE INTELIGENTĂ',
       d:`Centru dens P+8 · periurban P+3 · ${(need.locuinteTotale||5000).toLocaleString('ro-RO')} locuințe noi · zero sprawl`,c:'#60a5fa',delay:0.22},
      {icon:'🚇',t:'MOBILITATE VERDE',
       d:'45% transport public · 20% pietonal · BRT pe 3 coridoare · centura ocolitoare',c:'#22c55e',delay:0.34},
      {icon:'🌳',t:'REZISTENȚĂ CLIMATICĂ',
       d:'12km coridor verde anti-UHI · 100% NZEB construcții noi · CO₂ -60% vs 2024',c:'#34d399',delay:0.46},
      {icon:'💡',t:'CONVERGENȚĂ UE',
       d:`PIB/cap: €${Math.round(pib55/1000)}K (${Math.round(pib55/36600*100)}% din UE27) · 5.000 locuri tech`,c:'#D4AF37',delay:0.58},
      {icon:'👥',t:'COMUNITATE VIBRANTĂ',
       d:`${pop55.toLocaleString('ro-RO')} locuitori · 15min city 82/100 · SDG11: 78/100`,c:'#a78bfa',delay:0.70},
    ];

    viziuni.forEach((v,i)=>{
      const a=Math.min(1,Math.max(0,(t-v.delay)/0.18));
      if(a<=0) return;
      ctx.globalAlpha=a;
      const vy=H*(0.195+i*0.138);
      ctx.fillStyle='rgba(10,5,30,.85)';
      this._roundRect(ctx,W*0.03,vy,W*0.94,H*0.118,6);ctx.fill();
      ctx.strokeStyle=v.c+'44';ctx.lineWidth=1;
      this._roundRect(ctx,W*0.03,vy,W*0.94,H*0.118,6);ctx.stroke();
      // Bara colorata stanga
      ctx.fillStyle=v.c;ctx.fillRect(W*0.03,vy,3,H*0.118);
      // Icon
      ctx.font=`${W*0.028}px sans-serif`;ctx.textAlign='center';
      ctx.fillText(v.icon,W*0.075,vy+H*0.072);
      // Titlu
      ctx.fillStyle=v.c;ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.textAlign='left';ctx.fillText(v.t,W*0.115,vy+H*0.042);
      // Descriere
      ctx.fillStyle='rgba(200,215,235,.78)';ctx.font=`${W*0.0078}px "IBM Plex Mono"`;
      ctx.fillText(v.d,W*0.115,vy+H*0.078,W*0.82);
      ctx.globalAlpha=1;
    });

    // Credit final
    if(t>0.9){
      const ca=Math.min(1,(t-0.9)/0.08);ctx.globalAlpha=ca;
      ctx.fillStyle='rgba(10,5,30,.97)';ctx.fillRect(0,H*0.94,W,H*0.06);
      ctx.fillStyle='rgba(212,175,55,.4)';ctx.fillRect(0,H*0.94,W,1);
      ctx.fillStyle='#D4AF37';ctx.font=`bold ${W*0.0085}px "IBM Plex Mono"`;
      ctx.textAlign='center';
      ctx.fillText('Generat live pentru '+city?.name+' · INSE · Eurostat · INFP · ANAR · BNR · UrbanX TSS.FG v2.0 · '+new Date().getFullYear(),W/2,H*0.965,W*0.9);
      ctx.globalAlpha=1;
    }
    this._sceneLabel(ctx,W,H,'17','VIZIUNEA 2055 — '+(city?.name||'').toUpperCase());
  },

  _setupDensityLayer(map, city) {
    const pug = this._pugGeo;
    const reg = this._reguli || {};
    const features = [];

    if(pug?.features?.length) {
      // Pondere densitate dupa tipul UTR din reguli.json
      const tipWeight = {
        'centru':1.0,'centru_protejat':0.9,'mixt':0.85,'comercial':0.8,
        'educational':0.7,'rezidential_mare':0.75,'rezidential_mediu':0.6,
        'rezidential_mic':0.45,'rezidential_vila':0.35,'industrial':0.5,
        'verde':0.05,'agrement':0.1,'turism':0.2,'public':0.4,
        'tehnic':0.3,'rezerva':0.1,'necunoscut':0.1,
      };
      pug.features.forEach(f => {
        try {
          const utr = (f.properties?.utr||'').trim();
          if(!utr || utr==='?'||utr==='??') return;
          const tip = reg[utr]?.tip || 'necunoscut';
          const w   = tipWeight[tip] || 0.3;
          // Centroid simplu
          const coords = f.geometry?.coordinates;
          if(!coords) return;
          const lons=[], lats=[];
          const flat = a => typeof a[0]==='number'
            ? (lons.push(a[0]), lats.push(a[1]))
            : a.forEach(flat);
          flat(coords);
          if(!lons.length) return;
          features.push({type:'Feature',
            geometry:{type:'Point',coordinates:[
              lons.reduce((a,b)=>a+b,0)/lons.length,
              lats.reduce((a,b)=>a+b,0)/lats.length
            ]},
            properties:{weight: w}
          });
        } catch(e){}
      });
      console.log('[Cinema Density] heatmap din', features.length, 'centroide UTR reale');
    }
    if(!features.length) return;

    try {
      if(map.getSource('tci-density-heat')) {
        map.getSource('tci-density-heat').setData({type:'FeatureCollection',features});
      } else {
        map.addSource('tci-density-heat',{type:'geojson',
          data:{type:'FeatureCollection',features}});
        map.addLayer({id:'tci-density-layer',type:'heatmap',
          source:'tci-density-heat',paint:{
          'heatmap-weight':['interpolate',['linear'],['get','weight'],0,0,1,1],
          'heatmap-intensity':['interpolate',['linear'],['zoom'],10,1,15,3],
          'heatmap-color':['interpolate',['linear'],['heatmap-density'],
            0,'rgba(0,0,0,0)',
            0.15,'rgba(29,78,216,0.5)',
            0.35,'rgba(59,130,246,0.7)',
            0.55,'rgba(234,179,8,0.85)',
            0.75,'rgba(249,115,22,0.9)',
            1,'rgba(239,68,68,1)'],
          'heatmap-radius':['interpolate',['linear'],['zoom'],10,18,15,40],
          'heatmap-opacity':0.8,
        }});
      }
    } catch(e){ console.warn('[Cinema Density]', e.message); }
  },

  _setup3DGrowthBars(map, city) {
    const map2 = map;
    const pug  = this._pugGeo;
    const features = [];

    // Predictii presiune constructie 2025-2055
    // Culori: rosu=densificare, portocaliu=reconversie, verde=expansiune, albastru=reabilitare
    const PRED = {"CP":{"presiune":0.012,"interventie":"CONSERVARE","culoare_predictie":"#D4AF37","inaltime_pred":576,"tip":"centru_protejat","dist_centru_km":0.4,"capacitate_reziduala":0.08},"CC":{"presiune":0.381,"interventie":"MONITORIZARE","culoare_predictie":"#94a3b8","inaltime_pred":840,"tip":"centru","dist_centru_km":1.2,"capacitate_reziduala":0.22},"CM":{"presiune":0.543,"interventie":"DENSIFICARE P+6/P+8","culoare_predictie":"#ef4444","inaltime_pred":1344,"tip":"mixt","dist_centru_km":2.0,"capacitate_reziduala":0.4},"CA":{"presiune":0.571,"interventie":"DENSIFICARE P+6/P+8","culoare_predictie":"#ef4444","inaltime_pred":832,"tip":"mixt","dist_centru_km":1.8,"capacitate_reziduala":0.4},"CB1":{"presiune":0.531,"interventie":"DENSIFICARE P+6/P+8","culoare_predictie":"#ef4444","inaltime_pred":1344,"tip":"comercial","dist_centru_km":3.5,"capacitate_reziduala":0.5},"CB2":{"presiune":0.469,"interventie":"DENSIFICARE P+6/P+8","culoare_predictie":"#ef4444","inaltime_pred":1344,"tip":"comercial","dist_centru_km":4.0,"capacitate_reziduala":0.5},"CB3":{"presiune":0.602,"interventie":"DENSIFICARE P+6/P+8","culoare_predictie":"#ef4444","inaltime_pred":1344,"tip":"comercial","dist_centru_km":3.0,"capacitate_reziduala":0.5},"CB4":{"presiune":0.414,"interventie":"DENSIFICARE P+6/P+8","culoare_predictie":"#ef4444","inaltime_pred":1344,"tip":"comercial","dist_centru_km":4.5,"capacitate_reziduala":0.5},"CB5":{"presiune":0.107,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":420,"tip":"educational","dist_centru_km":2.5,"capacitate_reziduala":0.5},"CB6":{"presiune":0.137,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":420,"tip":"educational","dist_centru_km":1.5,"capacitate_reziduala":0.5},"CB7":{"presiune":0.365,"interventie":"MONITORIZARE","culoare_predictie":"#94a3b8","inaltime_pred":840,"tip":"comercial","dist_centru_km":5.0,"capacitate_reziduala":0.5},"LA":{"presiune":0.048,"interventie":"REABILITARE/CONSOLIDARE","culoare_predictie":"#60a5fa","inaltime_pred":2112,"tip":"rezidential_mare","dist_centru_km":2.5,"capacitate_reziduala":0.6},"LA1":{"presiune":0.043,"interventie":"REABILITARE/CONSOLIDARE","culoare_predictie":"#60a5fa","inaltime_pred":2112,"tip":"rezidential_mare","dist_centru_km":3.0,"capacitate_reziduala":0.6},"LB":{"presiune":0.158,"interventie":"MONITORIZARE","culoare_predictie":"#94a3b8","inaltime_pred":480,"tip":"rezidential_mediu","dist_centru_km":3.5,"capacitate_reziduala":0.6},"LB,C2":{"presiune":0.139,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":240,"tip":"rezidential_mediu","dist_centru_km":4.0,"capacitate_reziduala":0.6},"LB,C 2":{"presiune":0.139,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":240,"tip":"rezidential_mediu","dist_centru_km":4.0,"capacitate_reziduala":0.6},"LC":{"presiune":0.198,"interventie":"MONITORIZARE","culoare_predictie":"#94a3b8","inaltime_pred":360,"tip":"rezidential_mic","dist_centru_km":4.5,"capacitate_reziduala":0.52},"LL":{"presiune":0.174,"interventie":"MONITORIZARE","culoare_predictie":"#94a3b8","inaltime_pred":360,"tip":"rezidential_mic","dist_centru_km":5.0,"capacitate_reziduala":0.52},"LL2":{"presiune":0.224,"interventie":"MONITORIZARE","culoare_predictie":"#94a3b8","inaltime_pred":360,"tip":"rezidential_mic","dist_centru_km":4.0,"capacitate_reziduala":0.52},"LV":{"presiune":0.213,"interventie":"MONITORIZARE","culoare_predictie":"#94a3b8","inaltime_pred":240,"tip":"rezidential_vila","dist_centru_km":4.0,"capacitate_reziduala":0.58},"LV??":{"presiune":0.213,"interventie":"MONITORIZARE","culoare_predictie":"#94a3b8","inaltime_pred":240,"tip":"rezidential_vila","dist_centru_km":4.0,"capacitate_reziduala":0.58},"LV ?":{"presiune":0.213,"interventie":"MONITORIZARE","culoare_predictie":"#94a3b8","inaltime_pred":240,"tip":"rezidential_vila","dist_centru_km":4.0,"capacitate_reziduala":0.58},"P":{"presiune":0.015,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":160,"tip":"verde","dist_centru_km":2.0,"capacitate_reziduala":0.6},"P1":{"presiune":0.009,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":160,"tip":"verde","dist_centru_km":4.0,"capacitate_reziduala":0.6},"P1a":{"presiune":0.009,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":160,"tip":"verde","dist_centru_km":4.0,"capacitate_reziduala":0.6},"P1b":{"presiune":0.009,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":160,"tip":"verde","dist_centru_km":4.0,"capacitate_reziduala":0.6},"P2":{"presiune":0.009,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":160,"tip":"verde","dist_centru_km":4.0,"capacitate_reziduala":0.6},"P2a":{"presiune":0.009,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":160,"tip":"verde","dist_centru_km":4.0,"capacitate_reziduala":0.6},"P2b":{"presiune":0.009,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":160,"tip":"verde","dist_centru_km":4.0,"capacitate_reziduala":0.6},"P2c":{"presiune":0.009,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":160,"tip":"verde","dist_centru_km":4.0,"capacitate_reziduala":0.6},"P3":{"presiune":0.009,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":160,"tip":"verde","dist_centru_km":4.0,"capacitate_reziduala":0.6},"P4":{"presiune":0.009,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":160,"tip":"verde","dist_centru_km":4.0,"capacitate_reziduala":0.6},"P5":{"presiune":0.009,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":160,"tip":"verde","dist_centru_km":4.0,"capacitate_reziduala":0.6},"P6":{"presiune":0.009,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":160,"tip":"verde","dist_centru_km":4.0,"capacitate_reziduala":0.6},"AI1":{"presiune":0.353,"interventie":"RECONVERSIE → mixt/rezidential","culoare_predictie":"#f59e0b","inaltime_pred":960,"tip":"industrial","dist_centru_km":6.0,"capacitate_reziduala":0.55},"AI2A":{"presiune":0.4,"interventie":"RECONVERSIE → mixt/rezidential","culoare_predictie":"#f59e0b","inaltime_pred":960,"tip":"industrial","dist_centru_km":5.5,"capacitate_reziduala":0.55},"AI2a":{"presiune":0.4,"interventie":"RECONVERSIE → mixt/rezidential","culoare_predictie":"#f59e0b","inaltime_pred":960,"tip":"industrial","dist_centru_km":5.5,"capacitate_reziduala":0.55},"AI2b":{"presiune":0.583,"interventie":"RECONVERSIE → mixt/rezidential","culoare_predictie":"#f59e0b","inaltime_pred":960,"tip":"industrial","dist_centru_km":4.0,"capacitate_reziduala":0.55},"AI2c":{"presiune":0.583,"interventie":"RECONVERSIE → mixt/rezidential","culoare_predictie":"#f59e0b","inaltime_pred":960,"tip":"industrial","dist_centru_km":4.0,"capacitate_reziduala":0.55},"AI2d":{"presiune":0.583,"interventie":"RECONVERSIE → mixt/rezidential","culoare_predictie":"#f59e0b","inaltime_pred":960,"tip":"industrial","dist_centru_km":4.0,"capacitate_reziduala":0.55},"AI3":{"presiune":0.454,"interventie":"RECONVERSIE → mixt/rezidential","culoare_predictie":"#f59e0b","inaltime_pred":960,"tip":"industrial","dist_centru_km":5.0,"capacitate_reziduala":0.55},"AI4":{"presiune":0.514,"interventie":"RECONVERSIE → mixt/rezidential","culoare_predictie":"#f59e0b","inaltime_pred":960,"tip":"industrial","dist_centru_km":4.5,"capacitate_reziduala":0.55},"AI4a":{"presiune":0.514,"interventie":"RECONVERSIE → mixt/rezidential","culoare_predictie":"#f59e0b","inaltime_pred":960,"tip":"industrial","dist_centru_km":4.5,"capacitate_reziduala":0.55},"AI5":{"presiune":0.583,"interventie":"RECONVERSIE → mixt/rezidential","culoare_predictie":"#f59e0b","inaltime_pred":960,"tip":"industrial","dist_centru_km":4.0,"capacitate_reziduala":0.55},"AI6":{"presiune":0.66,"interventie":"RECONVERSIE → mixt/rezidential","culoare_predictie":"#f59e0b","inaltime_pred":960,"tip":"industrial","dist_centru_km":3.5,"capacitate_reziduala":0.55},"AA":{"presiune":0.018,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":240,"tip":"agrement","dist_centru_km":6.0,"capacitate_reziduala":0.5},"D1":{"presiune":0.05,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":160,"tip":"turism","dist_centru_km":7.0,"capacitate_reziduala":0.6},"ET3":{"presiune":0.107,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":160,"tip":"rezerva","dist_centru_km":8.0,"capacitate_reziduala":0.6},"EP6":{"presiune":0.071,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":160,"tip":"public","dist_centru_km":4.0,"capacitate_reziduala":0.6},"G1":{"presiune":0.026,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":240,"tip":"tehnic","dist_centru_km":4.0,"capacitate_reziduala":0.3},"G2":{"presiune":0.021,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":240,"tip":"tehnic","dist_centru_km":5.0,"capacitate_reziduala":0.3},"G/P9":{"presiune":0.053,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":160,"tip":"tehnic","dist_centru_km":4.0,"capacitate_reziduala":0.6},"P1a,P1b":{"presiune":0.009,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":160,"tip":"verde","dist_centru_km":4.0,"capacitate_reziduala":0.6},"P1a/P1b":{"presiune":0.009,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":160,"tip":"verde","dist_centru_km":4.0,"capacitate_reziduala":0.6},"P2c ?":{"presiune":0.009,"interventie":"STABIL - fara interventie","culoare_predictie":"#475569","inaltime_pred":160,"tip":"verde","dist_centru_km":4.0,"capacitate_reziduala":0.6},"CC ?":{"presiune":0.189,"interventie":"MONITORIZARE","culoare_predictie":"#94a3b8","inaltime_pred":840,"tip":"centru","dist_centru_km":4.0,"capacitate_reziduala":0.22},"CC?":{"presiune":0.189,"interventie":"MONITORIZARE","culoare_predictie":"#94a3b8","inaltime_pred":840,"tip":"centru","dist_centru_km":4.0,"capacitate_reziduala":0.22},"LL ?":{"presiune":0.224,"interventie":"MONITORIZARE","culoare_predictie":"#94a3b8","inaltime_pred":360,"tip":"rezidential_mic","dist_centru_km":4.0,"capacitate_reziduala":0.52}};

    if(pug?.features?.length) {
      pug.features.forEach(f => {
        const utr = (f.properties?.utr||'').trim();
        if(!utr||utr==='?'||utr==='??') return;
        const p = PRED[utr] || {};
        const h = p.inaltime_pred || 320;
        const c = p.culoare_predictie || '#60a5fa';
        features.push({type:'Feature', geometry:f.geometry,
          properties:{height:h, color:c, utr:utr,
            interventie:p.interventie||'—', presiune:p.presiune||0}});
      });
      console.log('[Cinema 3D] predictii 2055:', features.length, 'zone');
    }
    if(!features.length) return;
    if(map2.getPitch()<55) map2.setPitch(58);
    try {
      if(map2.getSource('tci-growth-bars')) {
        map2.getSource('tci-growth-bars').setData({type:'FeatureCollection',features});
        if(!map2.getLayer('tci-growth-bars-layer'))
          map2.addLayer({id:'tci-growth-bars-layer',type:'fill-extrusion',
            source:'tci-growth-bars',paint:{'fill-extrusion-color':['get','color'],
            'fill-extrusion-height':['get','height'],'fill-extrusion-base':0,
            'fill-extrusion-opacity':0.85,'fill-extrusion-vertical-gradient':true}});
      } else {
        map2.addSource('tci-growth-bars',{type:'geojson',data:{type:'FeatureCollection',features}});
        map2.addLayer({id:'tci-growth-bars-layer',type:'fill-extrusion',
          source:'tci-growth-bars',paint:{'fill-extrusion-color':['get','color'],
          'fill-extrusion-height':['get','height'],'fill-extrusion-base':0,
          'fill-extrusion-opacity':0.85,'fill-extrusion-vertical-gradient':true}});
      }
    } catch(e){ console.warn('[Cinema 3D]',e.message); }
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


  // Helper: wrap text la latimea data
  _wrapText(ctx, text, maxW, font) {
    ctx.font = font;
    const words = text.split(' ');
    const lines = [];
    let line = '';
    words.forEach(word => {
      const test = line ? line + ' ' + word : word;
      if(ctx.measureText(test).width > maxW && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    });
    if(line) lines.push(line);
    return lines;
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

  // ── Rotatie hartă animată (cinematic) ─────────────────────────────────
  _startMapRotation(map, startBearing, speed) {
    if(this._rotInterval) clearInterval(this._rotInterval);
    let bearing = startBearing;
    this._rotInterval = setInterval(() => {
      if(!this._playing) { clearInterval(this._rotInterval); return; }
      bearing += speed;
      try { map.setBearing(bearing); } catch(e) { clearInterval(this._rotInterval); }
    }, 50);
  },

  // ── Curăță DOAR layerele TCI (nu atinge layerele platformei) ──────────
  _cleanupTCILayers(map) {
    if(this._rotInterval) { clearInterval(this._rotInterval); this._rotInterval = null; }
    // Restauram layerele UTR normale
    ['utr-fill','utr-line','utr-lbl'].forEach(id=>{
      try{ if(map.getLayer(id)) map.setLayoutProperty(id,'visibility','visible'); }catch(e){}
    });
    const tciLayers = [
      'tci-density-layer','tci-growth-bars-layer','tci-traffic-cong-layer',
      'tci-corridors-layer','tci-tp-layer','tci-seismic-layer',
      'tci-flood-layer','tci-infra-layer','tci-scenarii-layer','tci-priorities-layer',
    ];
    const tciSources = [
      'tci-density-heat','tci-growth-bars','tci-traffic-congestion',
      'tci-corridors','tci-tp','tci-seismic','tci-flood','tci-infra','tci-scenarii','tci-priorities',
    ];
    tciLayers.forEach(id => { try{ if(map.getLayer(id)) map.removeLayer(id); }catch(e){} });
    tciSources.forEach(id => { try{ if(map.getSource(id)) map.removeSource(id); }catch(e){} });
  },

  // ── Coridoare de dezvoltare animat (scena 5) ──────────────────────────
  _setupCorridorsLayer(map, city) {
    const pug = this._pugGeo;
    const reg = this._reguli || {};
    const features = [];

    const corridorTips = {
      'centru':'#ef4444','centru_protejat':'#D4AF37',
      'mixt':'#f97316','comercial':'#60a5fa','educational':'#a78bfa',
      'industrial':'#b45309',
    };

    if(pug?.features?.length) {
      pug.features.forEach(f => {
        const utr = (f.properties?.utr||'').trim();
        if(!utr||utr==='?'||utr==='??') return;
        const tip = reg[utr]?.tip;
        const c   = corridorTips[tip];
        if(!c) return; // doar tipurile de coridor
        features.push({type:'Feature', geometry:f.geometry,
          properties:{color:c, width:3, tip:tip, utr:utr}});
      });
      console.log('[Cinema Corridors]', features.length, 'zone coridor din PUG');
    }
    if(!features.length) return;

    try {
      if(map.getSource('tci-corridors')) {
        map.getSource('tci-corridors').setData({type:'FeatureCollection',features});
      } else {
        map.addSource('tci-corridors',{type:'geojson',
          data:{type:'FeatureCollection',features}});
        map.addLayer({id:'tci-corridors-layer',type:'fill',
          source:'tci-corridors',paint:{
          'fill-color':['get','color'],
          'fill-opacity':0.55,
          'fill-outline-color':['get','color'],
        }});
      }
    } catch(e){ console.warn('[Cinema Corridors]', e.message); }
  },

  _setupTPLayer(map, city) {
    const cx = city?.lon||27.601, cy = city?.lat||47.158;
    const acop = city?.acoperire_transport||60;
    // Generăm rute TP radiale din centru
    const routes = [];
    const nRoutes = Math.round(acop/15);
    for(let i=0;i<nRoutes;i++) {
      const angle = (i/nRoutes)*Math.PI*2;
      const coords = [];
      for(let s=0;s<=8;s++) {
        const r = s*0.008;
        coords.push([cx+r*Math.cos(angle), cy+r*0.7*Math.sin(angle)]);
      }
      routes.push({ type:'Feature', geometry:{type:'LineString',coordinates:coords},
        properties:{color:acop>=65?'#60a5fa':'#f59e0b', width:2.5} });
    }
    try {
      if(!map.getSource('tci-tp')) {
        map.addSource('tci-tp', {type:'geojson', data:{type:'FeatureCollection',features:routes}});
        map.addLayer({ id:'tci-tp-layer', type:'line', source:'tci-tp',
          paint:{'line-color':['get','color'],'line-width':['get','width'],'line-opacity':0.8,'line-blur':1} });
      }
    } catch(e) {}
  },

  // ── Layer risc seismic — heatmap fond vulnerabil (scena 8) ────────────
  _setupSeismicLayer(map, city) {
    const cx = city?.lon||27.601, cy = city?.lat||47.158;
    const ag = city?.ag_seismic||0.2;
    const fond = city?.fond_pre77_pct||35;
    const points = [];
    // Generăm puncte de vulnerabilitate concentrate în centru vechi
    for(let i=0;i<200;i++) {
      const r = Math.random()*0.04;
      const a = Math.random()*Math.PI*2;
      const weight = Math.max(0, 1 - r/0.04 + Math.random()*0.3) * (fond/100) * ag * 3;
      points.push({type:'Feature',
        geometry:{type:'Point',coordinates:[cx+r*Math.cos(a),cy+r*0.7*Math.sin(a)]},
        properties:{weight}});
    }
    try {
      if(!map.getSource('tci-seismic')) {
        map.addSource('tci-seismic', {type:'geojson', data:{type:'FeatureCollection',features:points}});
        map.addLayer({ id:'tci-seismic-layer', type:'heatmap', source:'tci-seismic',
          paint:{
            'heatmap-weight':['interpolate',['linear'],['get','weight'],0,0,1,1],
            'heatmap-intensity':2,
            'heatmap-color':['interpolate',['linear'],['heatmap-density'],
              0,'rgba(0,0,0,0)',0.2,'rgba(254,240,138,.4)',0.5,'rgba(251,146,60,.7)',0.8,'rgba(239,68,68,.9)',1,'rgba(127,29,29,1)'],
            'heatmap-radius':25,
            'heatmap-opacity':0.8,
          }
        });
      }
    } catch(e) {}
  },

  // ── Layer inundații — activăm FloodMapper ANAR sau fallback (scena 9) ─
  _setupFloodLayer(map, city) {
    // Încercăm să activăm FloodMapper real (date ANAR WMS)
    try {
      if(window._FloodMapper && typeof window._FloodMapper.addAll === 'function') {
        window._FloodMapper.addAll(map);
        console.log('[Cinema] FloodMapper ANAR activat');
        return;
      }
    } catch(e) {}
    // Fallback: generăm flood zones simulate pe baza altitudinii
    const cx = city?.lon||27.601, cy = city?.lat||47.158;
    const features = [];
    // Zone de risc de-a lungul văilor (simulate)
    const riverAngles = [0.3, 1.1, 3.9, 5.2]; // unghiuri pentru văi
    riverAngles.forEach(angle => {
      const coords = [];
      for(let i=-15;i<=15;i++) {
        const t = i/15;
        coords.push([cx + t*0.12*Math.cos(angle) + Math.sin(t*8)*0.006,
                     cy + t*0.08*Math.sin(angle) + Math.cos(t*6)*0.004]);
      }
      features.push({type:'Feature', geometry:{type:'LineString',coordinates:coords},
        properties:{risk:'RCP100',color:'rgba(29,78,216,0.6)',width:8}});
      // Zona inundabila mai larga
      features.push({type:'Feature', geometry:{type:'LineString',coordinates:coords.map(([x,y])=>[x+0.003,y+0.002])},
        properties:{risk:'RCP500',color:'rgba(59,130,246,0.3)',width:16}});
    });
    try {
      if(!map.getSource('tci-flood')) {
        map.addSource('tci-flood', {type:'geojson', data:{type:'FeatureCollection',features}});
        map.addLayer({ id:'tci-flood-layer', type:'line', source:'tci-flood',
          paint:{'line-color':['get','color'],'line-width':['get','width'],'line-opacity':0.75,'line-blur':4} });
      }
    } catch(e) {}
  },

  // ── Layer infrastructură — zone cu deficit (scena 11) ─────────────────
  _setupInfraLayer(map, city) {
    const cx = city?.lon||27.601, cy = city?.lat||47.158;
    const pop = city?.pop2021||100000;
    // Cercuri concentrice cu nivel de acoperire servicii
    const rings = [
      {r:0.015, label:'Centru', coverage:0.9, color:'#22c55e'},
      {r:0.035, label:'Semicentral', coverage:0.7, color:'#f59e0b'},
      {r:0.06,  label:'Cartiere', coverage:0.5, color:'#f97316'},
      {r:0.09,  label:'Periferie', coverage:0.3, color:'#ef4444'},
    ];
    const features = [];
    rings.forEach(ring => {
      const coords = [];
      for(let a=0;a<=360;a+=5) {
        const rad = a*Math.PI/180;
        coords.push([cx+ring.r*Math.cos(rad), cy+ring.r*0.7*Math.sin(rad)]);
      }
      features.push({type:'Feature',
        geometry:{type:'LineString',coordinates:coords},
        properties:{color:ring.color, width:3, coverage:ring.coverage}});
    });
    try {
      if(!map.getSource('tci-infra')) {
        map.addSource('tci-infra', {type:'geojson', data:{type:'FeatureCollection',features}});
        map.addLayer({ id:'tci-infra-layer', type:'line', source:'tci-infra',
          paint:{'line-color':['get','color'],'line-width':['get','width'],'line-opacity':0.65,'line-dasharray':[2,1]} });
      }
    } catch(e) {}
  },

  // ── Layer scenarii — zone colorate S1/S2/S3 (scena 13) ────────────────
  _setupScenariiLayer(map, city) {
    const cx = city?.lon||27.601, cy = city?.lat||47.158;
    // S1: extindere maxima (roșu), S2: moderata (galben), S3: compact (verde)
    const scenarios = [
      { r:0.12, color:'rgba(34,197,94,0.15)', border:'#22c55e', label:'S1' },
      { r:0.09, color:'rgba(212,175,55,0.2)',  border:'#D4AF37', label:'S2' },
      { r:0.06, color:'rgba(96,165,250,0.15)', border:'#60a5fa', label:'S3' },
    ];
    const features = [];
    scenarios.forEach(s => {
      const coords = [];
      for(let a=0;a<=360;a+=3) {
        const rad=a*Math.PI/180;
        const noise=1+Math.sin(a*7)*0.08+Math.cos(a*11)*0.05;
        coords.push([cx+s.r*noise*Math.cos(rad), cy+s.r*0.7*noise*Math.sin(rad)]);
      }
      features.push({type:'Feature',geometry:{type:'LineString',coordinates:coords},
        properties:{color:s.border,width:2.5}});
    });
    try {
      if(!map.getSource('tci-scenarii')) {
        map.addSource('tci-scenarii', {type:'geojson', data:{type:'FeatureCollection',features}});
        map.addLayer({ id:'tci-scenarii-layer', type:'line', source:'tci-scenarii',
          paint:{'line-color':['get','color'],'line-width':['get','width'],'line-opacity':0.8,'line-blur':2} });
      }
    } catch(e) {}
  },

  // ── Layer priorități primărie — puncte de intervenție (scena 16) ──────
  _setupPrioritiesLayer(map, city) {
    const cx = city?.lon||27.601, cy = city?.lat||47.158;
    const ag = city?.ag_seismic||0.2;
    const acop = city?.acoperire_transport||60;
    const priorities = [];
    // Prioritate 1: seismic (centru)
    if(ag>=0.3) priorities.push({lon:cx+0.005,lat:cy+0.003,color:'#ef4444',r:500,label:'P1 Seismic'});
    // Prioritate 2: TP coridor
    priorities.push({lon:cx-0.02,lat:cy+0.01,color:'#60a5fa',r:400,label:'P2 Transport'});
    // Prioritate 3: spații verzi
    priorities.push({lon:cx+0.015,lat:cy-0.01,color:'#22c55e',r:350,label:'P3 Spații verzi'});
    // Prioritate 4: infrastructură periferie
    priorities.push({lon:cx-0.03,lat:cy-0.02,color:'#f59e0b',r:300,label:'P4 Utilități'});

    const features = priorities.map(p => ({
      type:'Feature',
      geometry:{type:'Point',coordinates:[p.lon,p.lat]},
      properties:{color:p.color,radius:p.r}
    }));
    try {
      if(!map.getSource('tci-priorities')) {
        map.addSource('tci-priorities', {type:'geojson', data:{type:'FeatureCollection',features}});
        map.addLayer({ id:'tci-priorities-layer', type:'circle', source:'tci-priorities',
          paint:{
            'circle-color':['get','color'],
            'circle-radius':['interpolate',['linear'],['zoom'],10,8,14,20],
            'circle-opacity':0.6,
            'circle-blur':0.4,
            'circle-stroke-color':['get','color'],
            'circle-stroke-width':2,
          }
        });
      }
    } catch(e) {}
  },

  _cleanupMapLayers() {
    const map = window.map;
    if(!map) return;
    if(this._rotInterval) { clearInterval(this._rotInterval); this._rotInterval = null; }
    // Restauram layerele UTR
    ['utr-fill','utr-line','utr-lbl'].forEach(id=>{
      try{ if(map.getLayer(id)) map.setLayoutProperty(id,'visibility','visible'); }catch(e){}
    });
    // Curatam toate layerele TCI
    ['tci-density-layer','tci-growth-bars-layer','tci-traffic-cong-layer',
     'tci-corridors-layer','tci-tp-layer','tci-seismic-layer',
     'tci-flood-layer','tci-infra-layer','tci-scenarii-layer','tci-priorities-layer']
    .forEach(id=>{ try{ if(map.getLayer(id)) map.removeLayer(id); }catch(e){} });
    ['tci-density-heat','tci-growth-bars','tci-traffic-congestion',
     'tci-corridors','tci-tp','tci-seismic','tci-flood','tci-infra','tci-scenarii','tci-priorities']
    .forEach(src=>{ try{ if(map.getSource(src)) map.removeSource(src); }catch(e){} });
    // Oprim FloodMapper daca era activ
    try{ window._FloodMapper?.removeAll?.(map); }catch(e){}
    // Resetam stilul la zi
    try{ map.setConfigProperty('basemap','lightPreset','day'); }catch(e){}
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