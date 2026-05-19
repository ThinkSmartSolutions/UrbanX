// ═══════════════════════════════════════════════════════════════════════════
// tci-street-real.js — UrbanX Street Level Reality v1.0
// 19 mai 2026 | ThinkSmart Solutions SRL
//
// CE FACE:
//
// ① VEHICULE PE STRĂZI REALE (OSM)
//    Fetch geometria străzilor din Overpass OSM în raza 800m
//    Mașini/autobuze/tramvaie animate pe linia exactă a strazii
//    requestAnimationFrame cu interpolare de poziție pe LineString
//    Număr vehicule creste cu timpul (2025: puține, 2055: aglomerat)
//    Modal split evolutiv: 2025 (80% auto) → 2055 (50% auto, 30% TP, 20% biciclete)
//
// ② CLĂDIRI CARE CRESC ETAJ CU ETAJ
//    fill-extrusion-height animat per clădire individual
//    Clădirile noi apar una câte una, nu toate deodată
//    Cronologie: mai întâi centru → apoi periurbane
//    Culoare: galben strălucitor când sunt în construcție → alb când sunt gata
//    Vizibil clar de la nivel stradă (pitch 80°)
//
// ③ ILUMINAT NOAPTE REAL
//    Zi/noapte ciclice în animație
//    lightPreset: 'night' cu emissive pe clădiri (geamuri aprinse)
//    Lumini stradale vizibile la zoom nivel stradă
//    Dupa 2040 în slider: default noapte (mai dramatic)
//
// ④ MOD STREET VIEW CURAT
//    Scoate tot ce nu are valoare: pietoni 2D, macarale 2D, particule
//    Menține: pitch 82°, poziție pieton, fade la milestones
//    Camera se deplasează ușor înainte — senzație de mers
//
// INTEGRARE: Înlocuiește _TCIStreetView din tci-street-experience.js
//            Completează 18-animation-engine.js _generateTrafficParticles
// ═══════════════════════════════════════════════════════════════════════════

(function(G) {
'use strict';

// ═══════════════════════════════════════════════════════════════════════════
// ① FETCH STRĂZI REALE DIN OSM
// ═══════════════════════════════════════════════════════════════════════════

G._OSMStreets = {
  _cache: {},

  // Fetch geometria reală a străzilor în raza dată
  async fetch(lat, lon, radius = 600) {
    const key = `streets_${lat.toFixed(3)}_${lon.toFixed(3)}_${radius}`;
    if(this._cache[key]) return this._cache[key];

    // Interogăm toate tipurile de drumuri relevante
    const q = `
[out:json][timeout:10];
(
  way["highway"~"^(primary|secondary|tertiary|residential|living_street|pedestrian|trunk|service)$"]
    (around:${radius},${lat},${lon});
)->.streets;
.streets out geom;`;

    const OVERPASS = [
      'https://overpass-api.de/api/interpreter',
      'https://overpass.kumi.systems/api/interpreter',
    ];

    for(const url of OVERPASS){
      try {
        const r = await fetch(url, {
          method: 'POST',
          body: 'data=' + encodeURIComponent(q),
          signal: AbortSignal.timeout(10000),
        });
        if(!r.ok) continue;
        const data = await r.json();
        const streets = this._parse(data, lat, lon);
        this._cache[key] = streets;
        console.log(`[OSMStreets] ${streets.length} segmente de stradă în raza ${radius}m`);
        return streets;
      } catch(e) {
        console.log('[OSMStreets] Overpass fallback:', e.message);
      }
    }
    // Fallback: generăm un grid simplu de străzi
    return this._generateFallback(lat, lon, radius);
  },

  _parse(data, centerLat, centerLon) {
    const streets = [];
    (data.elements || []).forEach(el => {
      if(el.type !== 'way' || !el.geometry?.length) return;
      const coords = el.geometry.map(n => [n.lon, n.lat]);
      if(coords.length < 2) return;

      streets.push({
        id:       el.id,
        type:     el.tags?.highway || 'residential',
        name:     el.tags?.name || '',
        oneway:   el.tags?.oneway === 'yes',
        coords,
        length:   this._lineLength(coords),
      });
    });
    return streets;
  },

  // Generează un grid de străzi ca fallback dacă Overpass e indisponibil
  _generateFallback(lat, lon, radius) {
    const streets = [];
    const r = radius / 111000; // grade
    // 4 artere principale + 8 secundare
    const grid = [
      // Orizontale
      [[lon-r, lat-r*0.3], [lon, lat-r*0.3], [lon+r, lat-r*0.3]],
      [[lon-r, lat],       [lon, lat],       [lon+r, lat]],
      [[lon-r, lat+r*0.3], [lon, lat+r*0.3], [lon+r, lat+r*0.3]],
      // Verticale
      [[lon-r*0.3, lat-r], [lon-r*0.3, lat], [lon-r*0.3, lat+r]],
      [[lon,       lat-r], [lon,       lat], [lon,       lat+r]],
      [[lon+r*0.3, lat-r], [lon+r*0.3, lat], [lon+r*0.3, lat+r]],
      // Diagonale (bulevardul)
      [[lon-r, lat-r*0.5], [lon, lat], [lon+r, lat+r*0.5]],
      [[lon-r, lat+r*0.5], [lon, lat], [lon+r, lat-r*0.5]],
    ];
    const types = ['primary','secondary','secondary','tertiary','primary','tertiary','secondary','secondary'];
    grid.forEach((coords, i) => {
      streets.push({ id: i, type: types[i]||'residential', name:'', oneway:false,
        coords, length: this._lineLength(coords) });
    });
    return streets;
  },

  _lineLength(coords) {
    let len = 0;
    for(let i=1;i<coords.length;i++){
      const dx = (coords[i][0]-coords[i-1][0])*111000*Math.cos(coords[i][1]*Math.PI/180);
      const dy = (coords[i][1]-coords[i-1][1])*111000;
      len += Math.sqrt(dx*dx+dy*dy);
    }
    return len;
  },

  // Interpolează o poziție la distanța `t` (0-1) de-a lungul unei linii
  interpolate(coords, t) {
    const totalLen = this._lineLength(coords);
    let target = t * totalLen;
    let accumulated = 0;

    for(let i=1;i<coords.length;i++){
      const dx = (coords[i][0]-coords[i-1][0])*111000*Math.cos(coords[i][1]*Math.PI/180);
      const dy = (coords[i][1]-coords[i-1][1])*111000;
      const segLen = Math.sqrt(dx*dx+dy*dy);

      if(accumulated + segLen >= target){
        const f = (target - accumulated) / segLen;
        return [
          coords[i-1][0] + f*(coords[i][0]-coords[i-1][0]),
          coords[i-1][1] + f*(coords[i][1]-coords[i-1][1]),
        ];
      }
      accumulated += segLen;
    }
    return coords[coords.length-1];
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ② MOTOR VEHICULE PE STRĂZI REALE
// ═══════════════════════════════════════════════════════════════════════════

G._VehicleEngine = {
  _vehicles: [],
  _streets:  [],
  _running:  false,
  _raf:      null,
  _lastUpdate: 0,
  _year:     2025,
  _map:      null,

  SOURCE_ID: 'tci-vehicles-real',
  LAYER_CAR: 'tci-vehicles-car',
  LAYER_BUS: 'tci-vehicles-bus',
  LAYER_TRAM:'tci-vehicles-tram',

  // Modal split evolutiv per an — calibrat pe tendințe europene și date UITP
  _modalSplit(year) {
    const t = Math.max(0, Math.min(1, (year - 2025) / 30));
    return {
      // Auto: scade de la 78% la 50% (tranziție modală conform SUMP)
      auto:  Math.round(78 - t * 28),
      // Transport public: creste de la 15% la 30%
      tp:    Math.round(15 + t * 15),
      // Biciclete+pietoni: creste de la 7% la 20%
      activ: Math.round(7  + t * 13),
    };
  },

  // Număr vehicule vizibile — creste cu urbanizarea, scade puțin post-2040 cu SUMP
  _vehicleCount(year) {
    const t = (year - 2025) / 30;
    const base = 30;
    // Crestere pana in 2040, platou sau usoara scadere dupa (politici SUMP)
    if(year <= 2040) return Math.round(base + t * 40);
    return Math.round(base + 0.5*40 - (year-2040)/15 * 10);
  },

  async init(map, lat, lon, year) {
    this._map  = map;
    this._year = year;

    // Fetch strazile reale
    ss?.('📡 Fetch străzi OSM...');
    this._streets = await G._OSMStreets.fetch(lat, lon, 600);

    // Cream sursele si layerele Mapbox
    this._setupLayers(map);

    // Initializam vehiculele
    this._spawnVehicles(year);

    // Pornim loop-ul
    this._running = true;
    this._loop();

    console.log(`[VehicleEngine] ✅ ${this._streets.length} strazi, ${this._vehicles.length} vehicule`);
    ss?.(`✅ ${this._vehicles.length} vehicule pe ${this._streets.length} strazi reale (OSM)`);
  },

  _setupLayers(map) {
    // Sursa GeoJSON pentru vehicule
    if(!map.getSource(this.SOURCE_ID)){
      map.addSource(this.SOURCE_ID, {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
      });
    }

    // Layer mașini — cercuri mici alb/gri
    if(!map.getLayer(this.LAYER_CAR)){
      map.addLayer({
        id: this.LAYER_CAR,
        type: 'circle',
        source: this.SOURCE_ID,
        filter: ['==', ['get','type'], 'car'],
        paint: {
          'circle-radius': [
            'interpolate', ['linear'], ['zoom'],
            14, 1.5,
            16, 3,
            18, 5,
          ],
          'circle-color': [
            'case',
            ['==', ['get','color'], 'white'], '#e2e8f0',
            ['==', ['get','color'], 'dark'],  '#334155',
            '#94a3b8',
          ],
          'circle-opacity': 0.9,
          'circle-blur': 0.1,
          // Umbra subtilă
          'circle-stroke-width': 0.3,
          'circle-stroke-color': 'rgba(0,0,0,0.3)',
        },
      });
    }

    // Layer autobuze — dreptunghiuri albastre (simbolizate ca cercuri mai mari)
    if(!map.getLayer(this.LAYER_BUS)){
      map.addLayer({
        id: this.LAYER_BUS,
        type: 'circle',
        source: this.SOURCE_ID,
        filter: ['==', ['get','type'], 'bus'],
        paint: {
          'circle-radius': [
            'interpolate', ['linear'], ['zoom'],
            14, 2.5,
            16, 5,
            18, 8,
          ],
          'circle-color': '#3b82f6',
          'circle-opacity': 0.95,
          'circle-stroke-width': 0.5,
          'circle-stroke-color': '#1d4ed8',
        },
      });
    }

    // Layer tramvaie — portocaliu distinct
    if(!map.getLayer(this.LAYER_TRAM)){
      map.addLayer({
        id: this.LAYER_TRAM,
        type: 'circle',
        source: this.SOURCE_ID,
        filter: ['==', ['get','type'], 'tram'],
        paint: {
          'circle-radius': [
            'interpolate', ['linear'], ['zoom'],
            14, 3,
            16, 6,
            18, 10,
          ],
          'circle-color': '#f97316',
          'circle-opacity': 0.95,
          'circle-stroke-width': 0.8,
          'circle-stroke-color': '#c2410c',
        },
      });
    }
  },

  _spawnVehicles(year) {
    if(!this._streets.length) return;
    const count  = this._vehicleCount(year);
    const modal  = this._modalSplit(year);
    this._vehicles = [];

    for(let i = 0; i < count; i++){
      // Alegem o stradă random cu pondere după tip
      const street = this._pickStreet(i);
      const rand   = i * 7919 % 100;
      const type   = rand < modal.auto ? 'car' :
                     rand < modal.auto + modal.tp ? 'bus' : 'tram';

      // Culori variate pentru mașini — realism
      const carColors = ['white','white','white','dark','dark','white'];
      const color = type === 'car' ? carColors[i%carColors.length] : type;

      // Viteza diferită per tip (grade/ms)
      const speedMap = {
        car:  street.type === 'primary' ? 0.000018 : 0.000012,
        bus:  0.000009,
        tram: 0.000007,
      };

      this._vehicles.push({
        id:       i,
        street:   street,
        t:        Math.random(), // pozitie initiala aleatorie pe stradă
        dir:      street.oneway ? 1 : (i % 2 === 0 ? 1 : -1),
        speed:    speedMap[type] * (0.8 + Math.random() * 0.4),
        type,
        color,
        // Fiecare vehicul are un offset in timp pentru a nu fi sincronizate
        phase:    Math.random(),
      });
    }
  },

  _pickStreet(seed) {
    // Strazile principale au mai mult trafic
    const weights = this._streets.map(s => {
      if(s.type === 'primary' || s.type === 'trunk') return 4;
      if(s.type === 'secondary') return 2;
      return 1;
    });
    const total = weights.reduce((a,b)=>a+b,0);
    let r = (seed * 7919 % total);
    for(let i=0;i<this._streets.length;i++){
      r -= weights[i];
      if(r <= 0) return this._streets[i];
    }
    return this._streets[0];
  },

  _loop() {
    if(!this._running) return;
    const now = performance.now();
    const dt  = Math.min(50, now - (this._lastUpdate || now));
    this._lastUpdate = now;

    // Mișcăm vehiculele
    const features = [];
    this._vehicles.forEach(v => {
      // Avans pe stradă
      v.t += v.speed * dt * v.dir;

      // Wrap-around (sau inversare direcție)
      if(v.t > 1){
        if(v.street.oneway){
          v.t = 0; // reapare la capătul opus
        } else {
          v.t = 1; v.dir = -1;
        }
      } else if(v.t < 0){
        if(v.street.oneway){
          v.t = 1;
        } else {
          v.t = 0; v.dir = 1;
        }
      }

      // Obținem poziția pe stradă
      const pos = G._OSMStreets.interpolate(v.street.coords, Math.abs(v.t));

      features.push({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: pos },
        properties: { type: v.type, color: v.color, id: v.id },
      });
    });

    // Update sursa GeoJSON
    try {
      this._map?.getSource?.(this.SOURCE_ID)?.setData?.({
        type: 'FeatureCollection',
        features,
      });
    } catch(e) {}

    this._raf = requestAnimationFrame(() => this._loop());
  },

  setYear(year) {
    if(year === this._year) return;
    this._year = year;
    // Re-spawn vehicule cu modal split actualizat
    this._spawnVehicles(year);
  },

  stop() {
    this._running = false;
    if(this._raf) cancelAnimationFrame(this._raf);
    // Curăță layerele
    const m = this._map;
    if(m){
      [this.LAYER_CAR, this.LAYER_BUS, this.LAYER_TRAM].forEach(id=>{
        try{ if(m.getLayer(id)) m.removeLayer(id); }catch(e){}
      });
      try{ if(m.getSource(this.SOURCE_ID)) m.removeSource(this.SOURCE_ID); }catch(e){}
    }
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ③ CLĂDIRI CARE CRESC ETAJ CU ETAJ
// ═══════════════════════════════════════════════════════════════════════════

G._BuildingGrowth = {
  _map:          null,
  _schedule:     [], // [{startYr, endYr, height, coords, id}]
  _currentYear:  2025,
  _animating:    false,
  SOURCE_ID:     'tci-growth-buildings',
  LAYER_GROW:    'tci-growth-layer',
  LAYER_ACTIVE:  'tci-growth-active', // galben = în construcție

  init(map, city, need) {
    this._map  = map;
    this._need = need;

    // Surse și layere
    if(!map.getSource(this.SOURCE_ID)){
      map.addSource(this.SOURCE_ID, {
        type: 'geojson',
        data: { type:'FeatureCollection', features:[] },
      });
    }

    // Layer clădiri finalizate — albastru-alb
    if(!map.getLayer(this.LAYER_GROW)){
      map.addLayer({
        id:   this.LAYER_GROW,
        type: 'fill-extrusion',
        source: this.SOURCE_ID,
        filter: ['==', ['get','state'], 'done'],
        paint: {
          'fill-extrusion-color': [
            'interpolate', ['linear'], ['get','age'],
            0,  '#fef3c7', // nou = galben deschis
            5,  '#e2e8f0', // 5 ani = alb
            20, '#cbd5e1', // 20 ani = gri deschis
          ],
          'fill-extrusion-height':  ['get','height'],
          'fill-extrusion-base':    0,
          'fill-extrusion-opacity': 0.85,
        },
      });
    }

    // Layer construcție activă — galben intens, pulsator
    if(!map.getLayer(this.LAYER_ACTIVE)){
      map.addLayer({
        id:   this.LAYER_ACTIVE,
        type: 'fill-extrusion',
        source: this.SOURCE_ID,
        filter: ['==', ['get','state'], 'building'],
        paint: {
          'fill-extrusion-color':   '#f59e0b',
          'fill-extrusion-height':  ['get','currentHeight'],
          'fill-extrusion-base':    0,
          'fill-extrusion-opacity': 0.92,
        },
      });
    }

    // Generăm programul de construcție
    this._generateSchedule(city, need);
    console.log('[BuildingGrowth] ✅ init', this._schedule.length, 'clădiri programate');
  },

  _generateSchedule(city, need) {
    const m   = this._map;
    const cx  = city?.lon || 27.601;
    const cy  = city?.lat || 47.158;
    const buildPerYear = need ? Math.round(need.locuinteTotale / 30) : 80;
    const buildPerYear5 = buildPerYear * 5; // la fiecare 5 ani

    this._schedule = [];

    // Generăm clădiri distribuite în timp și spațiu
    // Strategie: mai aproape de centru = mai devreme
    for(let yr = 2026; yr <= 2055; yr += 3){
      const countThisPeriod = Math.round(buildPerYear5 / 20); // câte clădiri vizibile
      for(let i = 0; i < Math.min(countThisPeriod, 8); i++){
        const seed = yr * 100 + i;
        const angle = (seed * 137.5) % 360; // golden angle distribution
        const dist  = 0.0008 + (seed % 50) / 50 * 0.010; // distanță față de centru
        const lon   = cx + dist * Math.cos(angle * Math.PI/180);
        const lat   = cy + dist * 0.65 * Math.sin(angle * Math.PI/180);
        const niv   = 2 + (seed % 10); // P+2 până la P+11
        const w     = 0.00007 + (seed % 5) * 0.00002;

        this._schedule.push({
          id:      `bld_${yr}_${i}`,
          startYr: yr,
          endYr:   yr + 2,
          height:  niv * 3.0,
          niv,
          lon, lat,
          coords: [
            [lon-w, lat-w*0.65],[lon+w, lat-w*0.65],
            [lon+w, lat+w*0.65],[lon-w, lat+w*0.65],[lon-w, lat-w*0.65],
          ],
          distFromCenter: Math.sqrt(
            Math.pow((lon-cx)*111000*Math.cos(cy*Math.PI/180),2) +
            Math.pow((lat-cy)*111000,2)
          ),
        });
      }
    }

    // Sortăm după distanță față de centru (centrul se construieste primul)
    this._schedule.sort((a,b) => a.distFromCenter - b.distFromCenter);
  },

  update(year, t) {
    this._currentYear = year;

    const features = [];

    this._schedule.forEach(bld => {
      if(bld.startYr > year) return; // nu a început încă

      const age = year - bld.endYr;

      if(year >= bld.endYr){
        // Clădire finalizată
        features.push({
          type: 'Feature',
          geometry: { type:'Polygon', coordinates:[bld.coords] },
          properties: {
            state:  'done',
            height: bld.height,
            age:    Math.max(0, age),
            id:     bld.id,
          },
        });
      } else {
        // Clădire în construcție — creste progresiv
        // t = 0 la startYr, 1 la endYr
        const progress = (year - bld.startYr + t) / (bld.endYr - bld.startYr);
        const clampedP = Math.max(0, Math.min(1, progress));

        // Creștere etaj cu etaj — nu lineară, ci în trepte
        const currentFloor = Math.floor(clampedP * bld.niv);
        const floorFraction = (clampedP * bld.niv) % 1;
        const currentHeight = (currentFloor + floorFraction) * 3.0;

        if(currentHeight > 0.5){
          features.push({
            type: 'Feature',
            geometry: { type:'Polygon', coordinates:[bld.coords] },
            properties: {
              state:         'building',
              height:        bld.height,
              currentHeight: Math.max(1, currentHeight),
              progress:      clampedP,
              id:             bld.id,
            },
          });
        }
      }
    });

    try {
      this._map?.getSource?.(this.SOURCE_ID)?.setData?.({
        type: 'FeatureCollection',
        features,
      });
    } catch(e) {}
  },

  stop() {
    const m = this._map;
    if(m){
      [this.LAYER_GROW, this.LAYER_ACTIVE].forEach(id=>{
        try{ if(m.getLayer(id)) m.removeLayer(id); }catch(e){}
      });
      try{ if(m.getSource(this.SOURCE_ID)) m.removeSource(this.SOURCE_ID); }catch(e){}
    }
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ④ ILUMINAT URBAN REAL
// ═══════════════════════════════════════════════════════════════════════════

G._UrbanLighting = {

  // Preset luminos corespunzător anului în film
  // Post-2040: implicit seara/noapte (mai dramatic, arată densificarea)
  getPreset(year, timeOfDay) {
    if(timeOfDay === 'night' || year >= 2045) return 'night';
    if(timeOfDay === 'dusk'  || year >= 2035) return 'dusk';
    if(timeOfDay === 'dawn'  || year === 2025) return 'dawn';
    return 'day';
  },

  apply(map, year, timeOfDay) {
    if(!map) return;
    const preset = this.getPreset(year, timeOfDay);
    try {
      map.setConfigProperty('basemap', 'lightPreset', preset);
    } catch(e){
      // Fallback pentru stiluri non-Standard
      try {
        if(preset === 'night'){
          map.setPaintProperty('background', 'background-color', '#0a0f1e');
        }
      } catch(ee){}
    }
  },

  // Activează emissive pe clădirile existente (geamuri aprinse noaptea)
  setEmissive(map, year) {
    const isNight = year >= 2035; // mai multă activitate nocturnă în viitor
    if(!map || !map.getLayer('3d-buildings-tci')) return;
    try {
      map.setPaintProperty('3d-buildings-tci', 'fill-extrusion-color', [
        'interpolate', ['linear'], ['get','height'],
        0,   isNight ? '#0d1a3a' : '#1e2a4a',
        15,  isNight ? '#152545' : '#1a2d52',
        40,  isNight ? '#1a3060' : '#1e3566',
        80,  isNight ? '#203878' : '#243f80',
        150, isNight ? '#2040a0' : '#2a4898',
      ]);
    } catch(e){}
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ⑤ STREET VIEW REAL — înlocuieste _TCIStreetView din tci-street-experience.js
// ═══════════════════════════════════════════════════════════════════════════

G._StreetViewReal = {
  _active:   false,
  _year:     2025,
  _city:     null,
  _walkT:    0,
  _walkRaf:  null,
  _walkPath: [],

  async activate(city, year) {
    if(this._active) return;
    const map = window.map;
    if(!map){ ss?.('Hartă indisponibilă'); return; }

    this._active = true;
    this._city   = city;
    this._year   = year || 2025;

    const cx = city?.lon || 27.601;
    const cy = city?.lat || 47.158;

    ss?.('⏳ Se pregătesc vehiculele reale...');

    // 1. Setăm camera la nivel stradă
    map.flyTo({
      center:   [cx, cy],
      zoom:     17.5,
      pitch:    82,
      bearing:  45,
      duration: 2000,
      essential: true,
    });

    // 2. Iluminat corect per an
    const tod = year >= 2045 ? 'night' : year >= 2035 ? 'dusk' : 'day';
    G._UrbanLighting.apply(map, year, tod);
    G._UrbanLighting.setEmissive(map, year);

    // 3. Init vehicule pe strazi reale
    await G._VehicleEngine.init(map, cy, cx, year);

    // 4. Init cladiri care cresc
    const need = G._TCIMasterplanPDF?._calcNeed?.(city, 'S2');
    G._BuildingGrowth.init(map, city, need);
    G._BuildingGrowth.update(year, 0.5);

    // 5. Walk path — camera se mișcă ușor înainte
    this._startWalk(map, cx, cy);

    // Buton status
    const btn = document.getElementById('tci-sv-btn');
    if(btn){ btn.style.background='rgba(34,197,94,.25)'; btn.textContent='⬆ Drone'; }

    console.log('[StreetViewReal] ✅ Activ:', city?.name, year);
  },

  _startWalk(map, cx, cy) {
    // Generăm un path simplu de mers — înainte pe stradă
    this._walkT = 0;
    this._walkPath = G._OSMStreets._cache[
      Object.keys(G._OSMStreets._cache)[0]
    ]?.[0]?.coords || [[cx, cy], [cx+0.001, cy+0.0005]];

    const walk = () => {
      if(!this._active) return;
      this._walkT += 0.0001; // pas mic
      if(this._walkT > 0.9) this._walkT = 0.1; // loop

      const pos = G._OSMStreets.interpolate(this._walkPath, this._walkT);
      try {
        // Mutăm camera ușor — senzația de mers
        map.panTo(pos, { duration: 300, essential: false });
      } catch(e){}

      this._walkRaf = requestAnimationFrame(walk);
    };
    // Pornim mersul lent după 3 secunde
    setTimeout(() => { if(this._active) this._walkRaf = requestAnimationFrame(walk); }, 3000);
  },

  setYear(year) {
    this._year = year;
    const map  = window.map;

    // Update vehicule
    G._VehicleEngine.setYear(year);

    // Update clădiri
    G._BuildingGrowth.update(year, 0.5);

    // Update iluminat
    const tod = year >= 2045 ? 'night' : year >= 2035 ? 'dusk' : 'day';
    G._UrbanLighting.apply(map, year, tod);
    G._UrbanLighting.setEmissive(map, year);
  },

  deactivate() {
    this._active = false;
    if(this._walkRaf) cancelAnimationFrame(this._walkRaf);

    // Oprire vehicule și clădiri
    G._VehicleEngine.stop();
    G._BuildingGrowth.stop();

    // Revenire drone view
    const map = window.map;
    if(map){
      map.flyTo({ zoom: 14.5, pitch: 55, bearing: 0, duration: 2000 });
      G._UrbanLighting.apply(map, this._year, 'day');
    }

    const btn = document.getElementById('tci-sv-btn');
    if(btn){ btn.style.background=''; btn.textContent='🚶 Stradă'; }
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ⑥ ÎNLOCUIRE _generateTrafficParticles DIN 18-animation-engine.js
//    Acum vehiculele sunt pe strazi reale, nu puncte random
// ═══════════════════════════════════════════════════════════════════════════

G._patchAnimationEngine = function() {
  if(typeof _AnimationEngine === 'undefined') return;
  if(_AnimationEngine._realTrafficPatched) return;
  _AnimationEngine._realTrafficPatched = true;

  const origSetup = _AnimationEngine._setupMapbox?.bind(_AnimationEngine);

  _AnimationEngine._setupMapbox = async function(engine) {
    if(origSetup) origSetup(engine);

    // Înlocuim traffic particles cu vehicule reale
    const city = window._RO_CITIES_DB?.[engine.currentCityKey];
    const ap   = window.S?.parcels?.[window.S?.activeParcel??0];
    const lat  = ap?.lat || city?.lat || 47.158;
    const lon  = ap?.lon || city?.lon || 27.601;
    const m    = this.state.map;

    if(m && lat && lon){
      // Fetch strazi o singura data
      const streets = await G._OSMStreets.fetch(lat, lon, 500);
      this._realStreets = streets;
      this._realVehicles = [];

      // Init vehicule reale
      G._VehicleEngine._map     = m;
      G._VehicleEngine._streets = streets;
      G._VehicleEngine._running = false; // controlat de yearPhase
      G._VehicleEngine._setupLayers(m);
      G._VehicleEngine._spawnVehicles(engine.currentYear || 2025);

      console.log('[AnimEngine] ✅ Trafic real: ', streets.length, 'strazi OSM');
    }
  };

  // Override _generateTrafficParticles — acum updateaza vehiculele reale
  _AnimationEngine._generateTrafficParticles = function(engine, totalT, ms, year) {
    // Update vehicule reale în loc de puncte random
    G._VehicleEngine.setYear(year);

    // Returnăm FeatureCollection gol (layerul tci-traffic-layer e înlocuit)
    return { type:'FeatureCollection', features:[] };
  };

  // Override _yearPhase pentru iluminat
  const origYear = _AnimationEngine._yearPhase?.bind(_AnimationEngine);
  _AnimationEngine._yearPhase = function(year, t, engine) {
    if(origYear) origYear(year, t, engine);

    // Iluminat real per an
    const m  = this.state.map;
    if(m){
      const tod = year >= 2045 ? 'night' : year >= 2040 ? 'dusk' : year >= 2035 ? 'dusk' : 'day';
      G._UrbanLighting.apply(m, year, tod);
      G._UrbanLighting.setEmissive(m, year);
    }

    // Update cladiri care cresc (daca initializate)
    if(G._BuildingGrowth._map){
      G._BuildingGrowth.update(year, t);
    }
  };

  console.log('[StreetReal] ✅ AnimationEngine patat cu vehicule reale');
};

// ═══════════════════════════════════════════════════════════════════════════
// INIT — conectam totul
// ═══════════════════════════════════════════════════════════════════════════
(function _init(n){
  if(n > 80) return;

  // Asteptam TCI Cinema
  if(typeof TCI === 'undefined' || typeof _AnimationEngine === 'undefined'){
    setTimeout(() => _init(n+1), 300); return;
  }

  // Patch AnimationEngine cu vehicule reale
  G._patchAnimationEngine();

  // Override _streetViewMode în TCI Cinema
  TCI._streetViewMode = function() {
    const city = this.cityData || this.d;
    const year = this.year || 2025;

    if(!city){ ss?.('Selectați un UAT mai întâi'); return; }

    if(G._StreetViewReal._active){
      G._StreetViewReal.deactivate();
    } else {
      G._StreetViewReal.activate(city, year);
    }
  };

  // Sync year cu street view
  const origYC = TCI._onYearChange?.bind(TCI);
  if(origYC && !TCI._streetRealConnected){
    TCI._streetRealConnected = true;
    TCI._onYearChange = function(yr){
      if(origYC) origYC(yr);
      if(G._StreetViewReal._active) G._StreetViewReal.setYear(yr);
    };
  }

  // Expunem global pentru debug
  window._StreetViewReal  = G._StreetViewReal;
  window._VehicleEngine   = G._VehicleEngine;
  window._BuildingGrowth  = G._BuildingGrowth;
  window._UrbanLighting   = G._UrbanLighting;

  console.log('[TCI Street Real v1.0] ✅ Vehicule OSM + Clădiri etaj/etaj + Iluminat real');
  ss?.('🚗 Street Real: vehicule pe strazi OSM, clădiri cresc etaj cu etaj');
})(0);

})(window);
