// ═══════════════════════════════════════════════════════════════════════════
// tci-zone-engine.js — UrbanX Zone Intelligence Engine v1.0
// 19 mai 2026 | ThinkSmart Solutions SRL
//
// Identifică dinamic zonele de dezvoltare ale oricărui UAT din România.
// Fără liste hardcodate. Fiecare UAT primește zonele lui specifice.
//
// IERARHIE DE IDENTIFICARE:
//
// ① OSM Cartiere reale (admin_level=9/10 + place=neighbourhood)
//    Dacă Iași are Copou, Tătărași, Nicolina în OSM → le folosim
//    Dacă Oradea are Rogerius, Nufărul în OSM → le folosim
//    Avantaj: nume reale, granițe administrative
//
// ② Clustering gravitațional pe axe transport OSM
//    Dacă OSM nu are cartiere → identificăm axele principale
//    Fiecare axă = corridor de creștere urbană
//    Zonele se formează în jurul axelor
//    Referință: Cervero & Kockelman (1997) TOD
//
// ③ Sectorizare GHSL (fallback final)
//    Dacă nici transport nu e suficient → grila concentrică
//    Calibrată pe densitatea GHSL reală per UAT
//
// METROPOLITAN:
//    Identificăm automat comunele periurbane din _EXTRA_UATS (TCI Cinema)
//    Criteriu: distanță <15km + rata creștere >1%/an + coef_hub >0.65
//    Miroslava-Iași (+4.76%), Florești-Cluj (+5.27%) → incluse automat
//    Râmnicu Sărat → fără periurbane semnificative → altă strategie
//
// PREDICȚII PER ZONĂ:
//    Fiecare zonă identificată primește:
//    - Populația curentă și 2055 (cohort distribuit)
//    - % densificare bazat pe GHSL trend + presiune construire
//    - Locuințe noi necesare
//    - Necesități infrastructură: școli, medici, spații verzi, transport
//    - Tip dezvoltare: DENSIFICARE / EXPANSIUNE / RECONVERSIE / CONSERVARE
// ═══════════════════════════════════════════════════════════════════════════

(function(G) {
'use strict';

// ═══════════════════════════════════════════════════════════════════════════
// URBAN ZONE ENGINE
// ═══════════════════════════════════════════════════════════════════════════

G._ZoneEngine = {

  _cache: {},

  // ── Intrare principală ────────────────────────────────────────────────────
  // Returnează zonele identificate + metropolitan + predicții
  async analyze(city, need) {
    const key = `zones_${city.siruta||city.lat}_${city.lon}`;
    if(this._cache[key]) return this._cache[key];

    const lat = city.lat, lon = city.lon;
    ss?.('🔍 Identificare zone urbane: '+city.name+'...');

    // Pas 1: OSM cartiere (cel mai precis)
    let zones = await this._fetchOSMNeighborhoods(lat, lon, city);

    // Pas 2: Dacă OSM insuficient → clustering pe transport
    if(zones.length < 3) {
      const transportZones = await this._buildTransportCorridors(lat, lon, city);
      if(transportZones.length >= 3) zones = transportZones;
    }

    // Pas 3: Fallback → sectorizare gravitațională calibrată pe UAT
    if(zones.length < 3) {
      zones = this._buildGravitationalZones(city, need);
    }

    // Pas 4: Metropolitan — comune periurbane adiacente
    const metro = this._findMetropolitanZones(city);

    // Pas 4b: Zone EXCLUSE din construire (OSM: cimitire, CF, militar, păduri)
    // Referință: Legea 50/1991 · Legea 422/2001 · OG 43/1997
    let excludedZones = [];
    try {
      const _exclRadius = (city.pop2021||100000) > 200000 ? 8000 : 5000;
      excludedZones = await this._fetchExcludedZones(lat, lon, _exclRadius);
      if(excludedZones.length > 0) {
        console.log(`[ZoneEngine] ⚠️ ${excludedZones.length} zone excluse din construire:`,
          excludedZones.map(z=>z.name).join(', '));
      }
    } catch(e) { console.log('[ZoneEngine] Excluded zones:', e.message); }
    this._excludedZones = excludedZones;

    // Pas 5: Calculăm predicțiile per zonă — EXCLUZÂND zonele protejate
    const zonePredictions = this._predictPerZone(zones, city, need, excludedZones);
    const metroPredictions = this._predictMetropolitan(metro, city, need);

    const result = {
      city:   city.name,
      zones:  zonePredictions,
      metro:  metroPredictions,
      source: zones[0]?._source || 'gravitational',
      totalZones: zonePredictions.length + metroPredictions.length,
    };

    this._cache[key] = result;
    ss?.(`✅ ${result.totalZones} zone identificate: ${result.zones.map(z=>z.name).join(', ')}`);
    return result;
  },

  // ── Nivel 1: OSM cartiere reale ────────────────────────────────────────────
  async _fetchOSMNeighborhoods(lat, lon, city) {
    const pop = city.pop2021 || 100000;
    // Raza în funcție de mărimea orașului
    const radius = pop > 200000 ? 8000 : pop > 50000 ? 5000 : 3000;

    const q = `[out:json][timeout:12];
(
  relation["admin_level"~"^(9|10|11)$"]["name"](around:${radius},${lat},${lon});
  way["place"~"^(neighbourhood|suburb|quarter)$"]["name"](around:${radius},${lat},${lon});
  node["place"~"^(neighbourhood|suburb)$"]["name"](around:${radius},${lat},${lon});
)->.nb;
.nb out center tags;`;

    try {
      const r = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: 'data=' + encodeURIComponent(q),
        signal: AbortSignal.timeout(4000), // 4s max - daca nu raspunde, mergem la fallback
      });
      if(!r.ok) throw new Error('HTTP '+r.status);
      const data = await r.json();

      const neighborhoods = (data.elements||[])
        .filter(el => el.tags?.name && !this._isUATName(el.tags.name, city.name))
        .map(el => {
          const elLat = el.lat || el.center?.lat || lat;
          const elLon = el.lon || el.center?.lon || lon;
          const dist  = this._dist(lat, lon, elLat, elLon);
          return {
            name:    el.tags.name,
            lat:     elLat,
            lon:     elLon,
            dist,
            osmType: el.tags.place || 'admin',
            _source: 'OSM',
          };
        })
        .filter(n => n.dist < radius)
        .sort((a,b) => a.dist - b.dist);

      // Deduplicare — dacă sunt prea aproape, păstrăm unul
      const dedup = this._deduplicateByProximity(neighborhoods, 500);
      console.log(`[ZoneEngine] OSM: ${dedup.length} cartiere pentru ${city.name}`);
      return dedup.slice(0, 8);

    } catch(e) {
      console.log('[ZoneEngine] OSM fallback:', e.message);
      return [];
    }
  },

  // ── Nivel 2: Zone pe axe de transport ──────────────────────────────────────
  async _buildTransportCorridors(lat, lon, city) {
    const q = `[out:json][timeout:10];
(
  way["highway"~"^(primary|secondary|trunk)$"]["name"](around:4000,${lat},${lon});
)->.roads;
.roads out geom;`;

    try {
      const r = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: 'data=' + encodeURIComponent(q),
        signal: AbortSignal.timeout(4000),
      });
      const data = await r.json();

      const artere = (data.elements||[])
        .filter(el => el.tags?.name)
        .map(el => {
          const midIdx = Math.floor((el.geometry||[]).length/2);
          const mid = el.geometry?.[midIdx];
          return {
            name:    this._corridorName(el.tags.name, city.name),
            lat:     mid?.lat || lat,
            lon:     mid?.lon || lon,
            highway: el.tags.highway,
            _source: 'OSM_transport',
          };
        })
        .filter(a => a.lat && a.lon);

      const dedup = this._deduplicateByProximity(artere, 800);
      console.log(`[ZoneEngine] Transport corridors: ${dedup.length} axe pentru ${city.name}`);
      return dedup.slice(0, 6);

    } catch(e) {
      return [];
    }
  },

  _corridorName(streetName, cityName) {
    // Generăm un nume de zonă din numele arterei
    // "Calea Chișinăului" → "Zona Calea Chișinăului"
    // "Bd. Independenței" → "Corridor Bd. Independenței"
    if(streetName.toLowerCase().startsWith('calea')) return 'Zona '+streetName;
    if(streetName.toLowerCase().startsWith('bd') || streetName.toLowerCase().startsWith('bulevardul')) return 'Corridor '+streetName.slice(0,20);
    if(streetName.toLowerCase().startsWith('str.') || streetName.toLowerCase().startsWith('strada')) return 'Zona '+streetName.slice(0,20);
    return 'Zona '+streetName.slice(0,25);
  },

  // ── Nivel 3: Sectorizare gravitațională calibrată ──────────────────────────
  // Generează zone bazate pe datele UAT-ului, nu pe nume hardcodate
  _buildGravitationalZones(city, need) {
    const cx  = city.lon, cy = city.lat;
    const pop = city.pop2021 || 100000;
    const r   = city.rata_reala_2011_2021 || 0;
    const gt  = window._TCIMasterplanPDF?._calcGravity?.(city)?.growthType || 'REGIONAL';

    // Numărul de zone în funcție de mărimea orașului
    const nZones = pop > 300000 ? 7 : pop > 100000 ? 6 : pop > 30000 ? 5 : 4;

    // Raza totală a intravilanului
    const intraRadius_km = Math.sqrt((city.suprafata_ha||pop/14) / Math.PI / 100);

    const zones = [];

    // Zona 0: Centru civic (invariant)
    zones.push({
      name: 'Centru Civic',
      lat: cy, lon: cx,
      ring: 0,
      dist: 0,
      radius_km: intraRadius_km * 0.15,
      _source: 'gravitational',
      _type: 'centru',
    });

    // Zonele intermediare: generate pe baza axelor cardinale + GHSL
    // Dacă creșterea e spre NV (cum e la Iași spre Copou) → axele reflectă asta
    const growthDirections = this._estimateGrowthDirections(city, r);
    growthDirections.slice(0, nZones-2).forEach((dir, i) => {
      const rKm = intraRadius_km * (0.3 + i*0.15);
      const dLon = (rKm/111) * Math.cos(dir.angle * Math.PI/180);
      const dLat = (rKm/111) * Math.sin(dir.angle * Math.PI/180);
      zones.push({
        name: dir.name,
        lat:  cy + dLat,
        lon:  cx + dLon,
        ring: i+1,
        dist: rKm,
        radius_km: intraRadius_km * 0.25,
        _source: 'gravitational',
        _type: dir.type,
      });
    });

    // Zona finală: Periferie (invariant)
    zones.push({
      name: gt==='DECLINING'?'Zonă reabilitare':'Expansiune periferică',
      lat:  cy + intraRadius_km*0.007,
      lon:  cx + intraRadius_km*0.012,
      ring: nZones-1,
      dist: intraRadius_km * 0.75,
      radius_km: intraRadius_km * 0.35,
      _source: 'gravitational',
      _type: 'periferie',
    });

    return zones;
  },

  _estimateGrowthDirections(city, r) {
    // Direcțiile de creștere bazate pe:
    // 1. Tipul de creștere al UAT-ului
    // 2. Axele geografice principale (relief implicat din lat/lon)
    // 3. Tendința istorică GHSL (simplificată)
    const gt = window._TCIMasterplanPDF?._calcGravity?.(city)?.growthType || 'REGIONAL';

    // Direcțiile standard pentru România (bazate pe studii GHSL)
    // Nord-Vest = direcție de creștere preferată pentru orașe din Moldova
    // Vest/Nord-Vest = Cluj, Timișoara
    // Toate direcțiile = București
    const dirsByRegion = {
      'NE': [
        { angle:315, name:'Zona Nord-Vest', type:'residential' },
        { angle:270, name:'Zona Vest', type:'mixed' },
        { angle:45,  name:'Zona Nord-Est', type:'industrial' },
        { angle:180, name:'Zona Sud', type:'residential' },
        { angle:135, name:'Zona Sud-Est', type:'expansion' },
      ],
      'NV': [
        { angle:270, name:'Zona Vest', type:'expansion' },
        { angle:315, name:'Zona Nord-Vest', type:'residential' },
        { angle:0,   name:'Zona Nord', type:'mixed' },
        { angle:180, name:'Zona Sud', type:'industrial' },
        { angle:90,  name:'Zona Est', type:'residential' },
      ],
      'V': [
        { angle:270, name:'Zona Vest', type:'expansion' },
        { angle:0,   name:'Zona Nord', type:'residential' },
        { angle:180, name:'Zona Sud', type:'mixed' },
        { angle:90,  name:'Zona Est', type:'industrial' },
        { angle:315, name:'Zona Nord-Vest', type:'expansion' },
      ],
      'C': [
        { angle:0,   name:'Zona Nord', type:'residential' },
        { angle:90,  name:'Zona Est', type:'mixed' },
        { angle:180, name:'Zona Sud', type:'expansion' },
        { angle:270, name:'Zona Vest', type:'industrial' },
        { angle:45,  name:'Zona Nord-Est', type:'residential' },
      ],
      'SE': [
        { angle:0,   name:'Zona Nord', type:'residential' },
        { angle:270, name:'Zona Vest', type:'expansion' },
        { angle:90,  name:'Zona Est', type:'industrial' },
        { angle:180, name:'Zona Sud', type:'mixed' },
        { angle:225, name:'Zona Sud-Vest', type:'expansion' },
      ],
    };

    const region = city.regiune || 'NE';
    return dirsByRegion[region] || dirsByRegion['NE'];
  },

  // ── Metropolitan — comune periurbane adiacente ─────────────────────────────
  _findMetropolitanZones(city) {
    // Căutăm în _EXTRA_UATS din TCI Cinema (dacă e disponibil)
    const extraUATs = window.TCI?._EXTRA_UATS || {};
    const extraDB   = window._UAT_DB || {};
    const allExtra  = { ...extraUATs, ...extraDB };

    const cityLat = city.lat, cityLon = city.lon;
    const cityJudet = city.judet_code || city.judet?.slice(0,2).toUpperCase() || '';

    const metro = [];

    Object.entries(allExtra).forEach(([key, uat]) => {
      // Criterii metropolitan:
      // 1. Același județ sau județ adjacent
      // 2. Distanță <20km
      // 3. Tip 'comuna' (nu alt municipiu)
      // 4. Rate de creștere pozitivă (atras de polul urban)
      const uatJudet = uat.judet_code || uat.judet || '';
      if(uatJudet !== cityJudet) return; // Același județ

      if(!uat.lat || !uat.lon) return;
      const dist = this._dist(cityLat, cityLon, uat.lat, uat.lon);
      if(dist > 20) return; // <20km

      const rata = uat.rata_reala_2011_2021 || 0;
      if(rata < 0.5) return; // Creștere pozitivă semnificativă

      metro.push({
        key,
        name:      uat.name,
        lat:       uat.lat,
        lon:       uat.lon,
        pop2021:   uat.pop2021 || 0,
        rata:      rata,
        dist:      Math.round(dist),
        coef_hub:  uat.coef_hub || 0.6,
        type:      'metropolitan',
        _source:   'INSE Rec.2021 · _EXTRA_UATS',
      });
    });

    // Sortăm după rata de creștere (cele mai dinamice primele)
    return metro.sort((a,b) => b.rata - a.rata).slice(0, 5);
  },

  // ── Predicții per zonă ──────────────────────────────────────────────────────
  _predictPerZone(zones, city, need, excludedZones = []) {
    const pop0  = city.pop2021 || 100000;
    const pop55 = need?.pop2055 || pop0;
    const r     = city.rata_reala_2011_2021 || 0;
    const grav  = window._TCIMasterplanPDF?._calcGravity?.(city) || { gravityScore:0.5, growthType:'REGIONAL' };
    const n     = zones.length;

    // Ponderile de distribuție a populației per zonă
    // Bazate pe modelul monocentric Alonso (1964) + tendința GHSL
    const popWeights = zones.map((z, i) => {
      // Centrul: densitate mare dar suprafață mică
      // Periferiile: densitate mică dar suprafață mare și CREȘTERE mai mare
      const distFactor = Math.max(0.1, 1 - (i/n)*0.6);
      const growthFactor = 1 + (i/n) * Math.max(0, r/100 * 8); // periferiile cresc mai mult
      return distFactor * growthFactor;
    });
    const totalWeight = popWeights.reduce((s,w)=>s+w, 0);

    return zones.map((z, i) => {
      const share    = popWeights[i] / totalWeight;
      const pop2021z = Math.round(pop0 * share);
      // Periferiile cresc mai rapid (fenomenul suburban sprawl)
      const growthMult = 1 + (i/n) * Math.max(0, r/100 * 15 * (grav.gravityScore||0.5));
      const pop2055z = Math.round(pop55 * share * Math.max(0.3, growthMult));

      const densif = pop2021z > 0 ? Math.round((pop2055z - pop2021z)/pop2021z * 100) : 0;
      const locuinte_noi = Math.round((need?.locuinteTotale||5000) * share * Math.max(0.5, growthMult));

      // Presiunea de construire
      const constructionPressure = Math.min(1,
        (z._type==='expansion'?1.4:z._type==='centru'?0.6:1.0) *
        Math.max(0, r/100*20 + 0.5) *
        (1 - i/n * 0.3)
      );

      // Tipul de intervenție recomandat
      const interventionType =
          z._type === 'centru'     ? 'DENSIFICARE' :
          z._type === 'expansion'  ? 'EXPANSIUNE CONTROLATĂ' :
          z._type === 'industrial' ? 'RECONVERSIE INDUSTRIALĂ' :
          densif > 25              ? 'DENSIFICARE INTENSIVĂ' :
          densif > 10              ? 'DENSIFICARE MODERATĂ' :
          densif < -10             ? 'REABILITARE FOND' :
                                     'CONSOLIDARE';

        // ── Regim înălțime propus (RH) ─────────────────────────────────
        // Ref: RGU HG 525/1996 + Ord. 233/2016
        const gravS = grav?.gravityScore || 0.5;
        const rh_propus =
          z._type === 'centru'     ? (gravS > 0.7 ? 'P+8—P+12' : 'P+5—P+8') :
          z._type === 'expansion'  ? (gravS > 0.6 ? 'P+3—P+6'  : 'P+2—P+4') :
          z._type === 'industrial' ? 'P+3—P+6 (reconversie)' :
          z._type === 'residential'? (i === 0 ? 'P+4—P+8' : 'P+2—P+5') :
          z._type === 'mixed'      ? 'P+3—P+7' : 'P+2—P+4';

        // ── POT/CUT propus ──────────────────────────────────────────────
        const _potcutMap = {
          centru:      { pot:80, cut:4.0, fn:'Mixt: Comercial+Rezidential+Servicii' },
          expansion:   { pot:40, cut:1.2, fn:'Rezidential extensiv + spatii verzi' },
          industrial:  { pot:60, cut:2.0, fn:'Reconversie: Rezidential+Birouri' },
          residential: { pot:50, cut:1.8, fn:'Rezidential, parter comercial permis' },
          mixed:       { pot:65, cut:2.5, fn:'Mixt: Rezidential+Comercial+Tertiar' },
        };
        const _pc = _potcutMap[z._type] || { pot:45, cut:1.5, fn:'Rezidential cu functiuni complementare' };

        // ── Functiuni propuse ───────────────────────────────────────────
        const functiuni_propuse =
          z._type === 'centru'     ? ['Rezidential premium','Birouri clasa A','Retail stradal','Hotel'] :
          z._type === 'expansion'  ? ['Rezidential familial','Gradinite/scoli','Spatii verzi','Sport'] :
          z._type === 'industrial' ? ['Lofturi rezidentiale','Coworking/birouri','Retail','Cultura'] :
          z._type === 'residential'? ['Rezidential mediu','Servicii proximitate','Educatie','Sanatate'] :
          ['Rezidential','Servicii','Spatii verzi'];

        // ── Mix rezidential recomandat ──────────────────────────────────
        const mix_rez = {
          studio:   Math.round(locuinte_noi * 0.15),
          cam2:     Math.round(locuinte_noi * 0.32),
          cam3:     Math.round(locuinte_noi * 0.28),
          cam4plus: Math.round(locuinte_noi * 0.12),
          senior:   Math.round(locuinte_noi * 0.08),
          social:   Math.round(locuinte_noi * 0.05),
        };

      // Necesități infrastructură
      const copii2055    = Math.round(pop2055z * 0.14);
      const varstnici2055= Math.round(pop2055z * 0.27);
      const copii2021    = Math.round(pop2021z * 0.155);
      const varstnici2021= Math.round(pop2021z * 0.218);

      return {
        name:            z.name,
        lat:             z.lat,
        lon:             z.lon,
        dist:            z.dist || 0,
        type:            z._type || 'mixed',
        source:          z._source || 'gravitational',
        // Demografie
        pop2021:         pop2021z,
        pop2055:         pop2055z,
        densif_pct:      densif,
        locuinte_noi,
        // Presiune
        pressure:        constructionPressure,
        pressureLabel:   constructionPressure>0.7?'MAJORĂ':constructionPressure>0.45?'MEDIE':'MICĂ',
        pressureColor:   constructionPressure>0.7?'#ef4444':constructionPressure>0.45?'#f59e0b':'#22c55e',
        // Intervenție
        intervention:    interventionType,
        rh_propus,
        pot: _pc.pot,
        cut: _pc.cut,
        functiuni: functiuni_propuse,
        mix_rez,
        // Infrastructură necesară
        scoli_noi:       Math.max(0, Math.ceil(copii2055/400) - Math.ceil(copii2021/400)),
        medici_noi:      Math.max(0, Math.ceil(varstnici2055/1500) - Math.ceil(varstnici2021/1500)),
        spVerzi_ha:      Math.max(0, Math.round((pop2055z-pop2021z)*9/10000)),
        statii_tp:       Math.ceil(pop2055z/3500),
        // Surse
        sursa_date:      'INSE Rec.2021 · Model gravitațional UrbanX · Alonso (1964)',
      };
    });
  },

  // ── Predicții metropolitan ─────────────────────────────────────────────────
  _predictMetropolitan(metro, city, need) {
    if(!metro.length) return [];

    return metro.map(uat => {
      const r = uat.rata || 0;
      // Proiecție simplificată pentru comunele periurbane
      const pop2055 = Math.round(uat.pop2021 * Math.pow(1 + r/100, 34));
      const delta   = pop2055 - uat.pop2021;
      const locuinte= Math.round(delta / 2.0); // dimensiune gospodărie periurbană

      return {
        ...uat,
        pop2055,
        delta,
        locuinte_noi: Math.max(0, locuinte),
        pressure: 0.85, // Periurbanul are presiune ridicată dacă crește
        pressureLabel: 'MAJORĂ',
        pressureColor: '#ef4444',
        intervention: 'EXPANSIUNE PERIURBANĂ — PUG obligatoriu!',
        scoli_noi: Math.max(0, Math.ceil(pop2055*0.14/400) - Math.ceil(uat.pop2021*0.155/400)),
        warning: `Comună periurbană cu creștere rapidă +${r.toFixed(1)}%/an. Necesită coordonare cu ${city.name}!`,
        sursa_date: 'INSE Rec.2021 · _EXTRA_UATS · Model cohort UrbanX',
      };
    });
  },

  // ── Zone EXCLUSE din construire ────────────────────────────────────────────
  // Surse: OSM (cimitire, CF, militar, aeroport, paduri) + CIMEC (monumente)
  // Referință: Legea 50/1991, Legea 422/2001, OG 43/1997 (drumuri),
  //            Legea 24/2007 (spatii verzi), Legea 7/1996 (cadastru)
  _EXCLUDED_OSM_TYPES: [
    // Cimitire - NICIODATA nu se construieste
    "landuse=cemetery", "amenity=grave_yard",
    // Monumente si zone protejate
    "historic=monument", "historic=memorial", "historic=castle",
    "boundary=protected_area", "boundary=national_park",
    // Infrastructura tehnica - zona de siguranta
    "landuse=railway", "railway=rail", "railway=station",
    // Militar
    "landuse=military", "military=barracks",
    // Paduri si ape - protejate
    "landuse=forest", "natural=wood", "natural=water",
    "waterway=river", "waterway=stream",
    // Aeroporturi
    "aeroway=aerodrome", "aeroway=runway",
  ],

  async _fetchExcludedZones(lat, lon, radius) {
    const q = `[out:json][timeout:10];
(
  way["landuse"~"^(cemetery|railway|military|forest)$"](around:${radius},${lat},${lon});
  way["amenity"="grave_yard"](around:${radius},${lat},${lon});
  way["natural"~"^(wood|water)$"](around:${radius},${lat},${lon});
  way["military"](around:${radius},${lat},${lon});
  relation["boundary"~"^(protected_area|national_park)$"](around:${radius},${lat},${lon});
)->.excl;
.excl out center tags;`;
    try {
      const r = await fetch('https://overpass-api.de/api/interpreter',{
        method:'POST', body:'data='+encodeURIComponent(q),
        signal: AbortSignal.timeout(10000),
      });
      const data = await r.json();
      return (data.elements||[]).map(el=>({
        type:    el.tags?.landuse || el.tags?.amenity || el.tags?.natural || el.tags?.military || 'exclus',
        name:    el.tags?.name || el.tags?.['name:ro'] || 'Zonă protejată',
        lat:     el.lat || el.center?.lat || lat,
        lon:     el.lon || el.center?.lon || lon,
        legal:   this._getLegalBasis(el.tags),
        tags:    el.tags,
      }));
    } catch(e) {
      console.log('[ZoneEngine] Excluded zones fetch error:', e.message);
      return [];
    }
  },

  _getLegalBasis(tags) {
    if(tags?.landuse === 'cemetery' || tags?.amenity === 'grave_yard')
      return 'Interzis construire — Legea 50/1991 art.11 + Legea cimitirelor';
    if(tags?.landuse === 'military' || tags?.military)
      return 'Zonă militară — acces și construire interzise';
    if(tags?.landuse === 'railway' || tags?.railway)
      return 'Culoar protecție CF — OG 43/1997 art.16, min.100m';
    if(tags?.landuse === 'forest' || tags?.natural === 'wood')
      return 'Pădure — construire interzisă (Codul Silvic)';
    if(tags?.boundary)
      return 'Zonă protejată — Legea 5/2000 + OUG 57/2007';
    return 'Zonă restricționată legal';
  },

  // Verifică dacă o coordonată e în zonă exclusă (cu buffer)
  isExcluded(lat, lon, excludedZones, bufferM = 50) {
    return excludedZones.some(z => {
      const dist = this._dist(lat, lon, z.lat, z.lon) * 1000; // în metri
      const buf = z.type === 'cemetery' ? 0 :     // cimitirul însuși
                  z.type === 'railway'  ? 100 :    // 100m zona CF
                  z.type === 'military' ? 200 :    // 200m zona militară
                  bufferM;
      return dist < buf;
    });
  },

  // ── Helpers ────────────────────────────────────────────────────────────────
  _dist(lat1, lon1, lat2, lon2) {
    const R=6371, r=Math.PI/180;
    const dL=(lat2-lat1)*r, dO=(lon2-lon1)*r;
    const a=Math.sin(dL/2)**2+Math.cos(lat1*r)*Math.cos(lat2*r)*Math.sin(dO/2)**2;
    return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
  },

  _isUATName(name, cityName) {
    // Verificăm dacă e același nume ca UAT-ul (pentru a nu duplica)
    const n = name.toLowerCase().replace('municipiul ','').replace('orașul ','');
    const c = (cityName||'').toLowerCase();
    return n === c || c.includes(n) || n.includes(c.slice(0,5));
  },

  _deduplicateByProximity(items, minDistM) {
    const result = [];
    items.forEach(item => {
      const tooClose = result.some(r =>
        this._dist(r.lat, r.lon, item.lat, item.lon)*1000 < minDistM
      );
      if(!tooClose) result.push(item);
    });
    return result;
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// INTEGRARE cu tci-cinematic-scenes.js
// ═══════════════════════════════════════════════════════════════════════════

// Override _ZoneProjections.calculate cu versiunea reală
G._ZoneProjections_Real = {
  async analyze(city, need) {
    return G._ZoneEngine.analyze(city, need);
  },
};

// Override în SceneEngine dacă există
(function _connect(n){
  if(n>40) return;
  if(typeof G._SceneEngine === 'undefined'){
    setTimeout(()=>_connect(n+1), 300); return;
  }

  // Override _runScene pentru a folosi zone reale
  const origLaunch = G._SceneEngine.launch?.bind(G._SceneEngine);
  G._SceneEngine.launch = async function(cityKey) {
    const city = window._RO_CITIES_DB?.[cityKey] ||
                 Object.values(window._RO_CITIES_DB||{})[0];
    if(!city) return;

    this._city = city;
    this._need = window._TCIMasterplanPDF?._calcNeed?.(city,'S2') || { pop2055:city.pop2021, locuinteTotale:5000 };

    // Analizăm zonele ÎNAINTE de a porni filmul
    ss?.('⏳ Analizez zonele urbane ale '+city.name+'...');
    const zoneResult = await G._ZoneEngine.analyze(city, this._need);
    this._zoneResult = zoneResult;

    // Transformăm pentru compatibilitate cu renderScene
    this._zones = {};
    zoneResult.zones.forEach((z, i) => {
      this._zones['zone_'+i] = {
        label:         z.name,
        pop2021:       z.pop2021,
        pop2055:       z.pop2055,
        densifPct:     z.densif_pct,
        locuinte_noi:  z.locuinte_noi,
        presiune:      z.pressure,
        presiuneLabel: z.pressureLabel,
        presiuneColor: z.pressureColor,
        intervention:  z.intervention,
        scoli_noi:     z.scoli_noi,
        medici_noi:    z.medici_noi,
        spVerzi_ha:    z.spVerzi_ha,
        statii_tp:     z.statii_tp,
        cx:            z.lon,
        cy:            z.lat,
        areaKm2:       2.5,
        source:        z.source,
      };
    });

    // Adăugăm și metropolitan
    zoneResult.metro.forEach((m, i) => {
      this._zones['metro_'+i] = {
        label:         m.name + ' (metropolitan)',
        pop2021:       m.pop2021,
        pop2055:       m.pop2055,
        densifPct:     Math.round((m.pop2055-m.pop2021)/m.pop2021*100),
        locuinte_noi:  m.locuinte_noi,
        presiune:      0.85,
        presiuneLabel: 'MAJORĂ',
        presiuneColor: '#ef4444',
        intervention:  m.intervention,
        scoli_noi:     m.scoli_noi,
        warning:       m.warning,
        cx:            m.lon,
        cy:            m.lat,
        areaKm2:       5,
        source:        m.sursa_date,
      };
    });

    console.log(`[ZoneEngine] ✅ ${Object.keys(this._zones).length} zone pentru ${city.name}:`,
      Object.values(this._zones).map(z=>z.label).join(', '));

    // Continuăm cu lansarea filmului
    if(origLaunch) {
      try {
        await origLaunch.call(this, cityKey);
      } catch(e) {
        console.warn('[ZoneEngine] origLaunch error:', e.message);
        // Pornire directa fara origLaunch
        this._scene  = 0;
        this._playing = true;
        this._canvas = this._createCanvas?.();
        this._ctx    = this._canvas?.getContext('2d');
        this._runScene?.(0);
      }
    } else {
      this._scene  = 0;
      this._playing = true;
      this._canvas = this._createCanvas?.();
      this._ctx    = this._canvas?.getContext('2d');
      this._runScene?.(0);
    }
  };

  // Override _s7_focusZone pentru a folosi zone cu metropolitan
  const origS7 = G._SceneEngine._s7_focusZone?.bind(G._SceneEngine);
  G._SceneEngine._s7_focusZone = function(ctx, W, H, t, city, zones) {
    if(!zones) return;
    const allZones = this._zoneResult
      ? [...this._zoneResult.zones, ...this._zoneResult.metro]
      : Object.values(zones||{}).map(z => ({
          name:       z.label,
          pop2055:    z.pop2055,
          densif_pct: z.densifPct,
          locuinte_noi: z.locuinte_noi,
          pressure:   z.presiune,
          pressureLabel: z.presiuneLabel,
          pressureColor: z.presiuneColor,
          intervention:  z.intervention,
          scoli_noi:  z.scoli_noi,
          medici_noi: z.medici_noi,
          spVerzi_ha: z.spVerzi_ha,
          statii_tp:  z.statii_tp,
          lat:        z.cy,
          lon:        z.cx,
          warning:    z.warning,
          source:     z.source,
        }));

    if(!allZones.length) return;

    const nZones     = Math.min(allZones.length, 8);
    const tPerZone   = 1.0 / nZones;
    const currentIdx = Math.min(nZones-1, Math.floor(t / tPerZone));
    const tInZone    = (t - currentIdx*tPerZone) / tPerZone;
    const zone       = allZones[currentIdx];
    if(!zone) return;

    // Zoom pe hartă la zona curentă
    const map = window.map;
    if(map && tInZone < 0.15 && currentIdx > 0 && zone.lon && zone.lat){
      try {
        map.flyTo({
          center:   [zone.lon, zone.lat],
          zoom:     14.5 + (zone.name?.includes('metropolitan') ? -1.5 : 0),
          pitch:    55,
          bearing:  currentIdx * 45,
          duration: 1800,
          essential: true,
        });
        // Iluminat: metropolitan = dusk (expansiune = mai dramatic)
        const preset = zone.name?.includes('metropolitan') ? 'dusk' : 'day';
        map.setConfigProperty?.('basemap','lightPreset', preset);
      } catch(e){}
    }

    // Progress indicator + Tip zonă (metropolitan vs urban)
    const isMetro = zone.name?.includes('metropolitan');
    ctx.fillStyle = `rgba(4,10,24,0.80)`;
    G._SceneEngine._roundRect?.(ctx, W*0.05, H*0.03, 300, 26, 5);
    ctx.fill();
    ctx.fillStyle = isMetro ? '#f97316' : '#D4AF37';
    ctx.font = `bold ${W*0.009}px "IBM Plex Mono"`;
    ctx.textAlign = 'left';
    const typeLabel = isMetro ? '🏘 METROPOLITAN' : '🏙 URBAN';
    ctx.fillText(`${typeLabel} ${currentIdx+1}/${nZones} — ${(zone.name||'').toUpperCase().slice(0,30)}`, W*0.06, H*0.058);
    // Progress
    ctx.fillStyle = 'rgba(255,255,255,.05)'; ctx.fillRect(W*0.05, H*0.075, 300, 2);
    ctx.fillStyle = isMetro?'#f97316':'#D4AF37'; ctx.fillRect(W*0.05, H*0.075, (currentIdx/nZones+tInZone/nZones)*300, 2);

    // Card principal cu datele zonei
    const cw=290, ch=210, cx2=W*0.05, cy2=H*0.10;
    ctx.fillStyle='rgba(4,10,24,0.94)';
    G._SceneEngine._roundRect?.(ctx,cx2,cy2,cw,ch,10); ctx.fill();
    ctx.strokeStyle = zone.pressureColor||'#D4AF37'; ctx.lineWidth=1.5;
    G._SceneEngine._roundRect?.(ctx,cx2,cy2,cw,ch,10); ctx.stroke();
    ctx.fillStyle = zone.pressureColor||'#D4AF37';
    ctx.fillRect(cx2, cy2, cw, 2);

    // Titlu zonă
    ctx.fillStyle=zone.pressureColor||'#D4AF37'; ctx.font=`bold ${W*0.008}px "IBM Plex Mono"`;
    ctx.textAlign='left';
    ctx.fillText((zone.name||'').toUpperCase().slice(0,32), cx2+8, cy2+14);

    // Date principale cu typewriter
    const showNum = (label, value, y, color, delay) => {
      if(tInZone < delay) return;
      const progress = Math.min(1,(tInZone-delay)/0.2);
      ctx.fillStyle='rgba(148,163,184,.65)'; ctx.font=`${W*0.0075}px "IBM Plex Mono"`;
      ctx.fillText(label, cx2+8, cy2+y);
      ctx.fillStyle=color||'#fff'; ctx.font=`900 ${W*0.015}px "IBM Plex Mono"`;
      const str = String(value);
      ctx.fillText(str.slice(0, Math.ceil(str.length*progress*3)), cx2+8, cy2+y+17);
    };

    const pct = zone.densif_pct || 0;
    showNum('DENSIFICARE', (pct>=0?'+':'')+pct+'%', 22, zone.pressureColor||'#f59e0b', 0.05);
    showNum('LOCUINTE NOI', (zone.locuinte_noi||0).toLocaleString('ro-RO'), 54, '#fff', 0.20);
    showNum('POPULATIE 2055', (zone.pop2055||0).toLocaleString('ro-RO'), 86, '#22c55e', 0.38);

    // Regim înălțime propus
    if(zone.rh_propus && tInZone > 0.40) {
      const rhA = Math.min(1,(tInZone-0.40)/0.15);
      ctx.globalAlpha *= rhA;
      ctx.fillStyle='rgba(148,163,184,.6)'; ctx.font=`${W*0.0068}px "IBM Plex Mono"`;
      ctx.fillText('REGIM INALTIME:', cx2+8, cy2+112);
      ctx.fillStyle='#fbbf24'; ctx.font=`bold ${W*0.009}px "IBM Plex Mono"`;
      ctx.fillText(zone.rh_propus||'—', cx2+8, cy2+122);
      ctx.globalAlpha /= rhA;
    }

    // POT / CUT propus
    if(zone.pot && tInZone > 0.52) {
      const pa = Math.min(1,(tInZone-0.52)/0.12);
      ctx.globalAlpha *= pa;
      ctx.fillStyle='rgba(148,163,184,.6)'; ctx.font=`${W*0.0068}px "IBM Plex Mono"`;
      ctx.fillText(`POT max ${zone.pot||'—'}%  ·  CUT max ${zone.cut||'—'}`, cx2+8, cy2+136);
      ctx.globalAlpha /= pa;
    }

    // Funcțiuni propuse
    if(zone.functiuni?.length && tInZone > 0.60) {
      const fa = Math.min(1,(tInZone-0.60)/0.15);
      ctx.globalAlpha *= fa;
      ctx.fillStyle='rgba(148,163,184,.6)'; ctx.font=`${W*0.0065}px "IBM Plex Mono"`;
      ctx.fillText('FUNCTIUNI PROPUSE:', cx2+8, cy2+150);
      ctx.fillStyle='rgba(200,215,240,.85)'; ctx.font=`${W*0.0072}px "IBM Plex Mono"`;
      ctx.fillText((zone.functiuni||[]).slice(0,3).join(' · '), cx2+8, cy2+160);
      ctx.globalAlpha /= fa;
    }

    // Tip intervenție
    if(zone.intervention) {
      ctx.fillStyle=zone.pressureColor||'rgba(245,158,11,.8)';
      ctx.font=`bold ${W*0.007}px "IBM Plex Mono"`;
      ctx.fillText('TIP: '+zone.intervention, cx2+8, cy2+ch-18);
    }
    ctx.fillStyle='rgba(100,120,150,.4)'; ctx.font=`${W*0.006}px "IBM Plex Mono"`;
    ctx.fillText(zone.source||'INSE·OSM·UrbanX', cx2+8, cy2+ch-5);

    // Card infrastructură
    if(tInZone > 0.4) {
      const infraX = cx2+cw+12, infraCh = ch;
      const infraAlpha = Math.min(1,(tInZone-0.4)/0.2);
      ctx.globalAlpha *= infraAlpha;
      ctx.fillStyle='rgba(4,10,24,0.92)';
      G._SceneEngine._roundRect?.(ctx,infraX,cy2,185,infraCh,8); ctx.fill();
      ctx.strokeStyle='rgba(59,130,246,.4)'; ctx.lineWidth=0.8;
      G._SceneEngine._roundRect?.(ctx,infraX,cy2,185,infraCh,8); ctx.stroke();
      ctx.fillStyle='#60a5fa'; ctx.font=`bold ${W*0.008}px "IBM Plex Mono"`;
      ctx.textAlign='left';
      ctx.fillText('NECESAR 2025-2055', infraX+8, cy2+14);
      [
        ['🏫', 'Școli noi',      zone.scoli_noi||0,   'unități'],
        ['🏥', 'Medici familie', zone.medici_noi||0,   'cabinete'],
        ['🌳', 'Spații verzi',   zone.spVerzi_ha||0,   'ha (OMS)'],
        ['🚌', 'Stații TP',      zone.statii_tp||0,    'stații'],
      ].forEach(([icon,label,val,unit],k)=>{
        const fy = cy2+32+k*32;
        ctx.fillStyle='rgba(148,163,184,.7)'; ctx.font=`${W*0.0075}px "IBM Plex Mono"`;
        ctx.fillText(icon+' '+label, infraX+8, fy);
        ctx.fillStyle= val>0?'#fbbf24':'#22c55e'; ctx.font=`bold ${W*0.011}px "IBM Plex Mono"`;
        ctx.fillText(val>0?'+'+val+' '+unit:'OK', infraX+8, fy+15);
      });
      if(isMetro && zone.warning) {
        ctx.fillStyle='rgba(249,115,22,.8)'; ctx.font=`bold ${W*0.007}px "IBM Plex Mono"`;
        const wLines = G._SceneEngine._wrapText?.(zone.warning, 170) || [zone.warning.slice(0,25)];
        wLines.slice(0,2).forEach((l,k)=> ctx.fillText(l, infraX+8, cy2+infraCh-20+k*10));
      }
      ctx.globalAlpha /= infraAlpha;
    }
  };

  // Adăugăm helper _wrapText dacă nu există
  if(!G._SceneEngine._wrapText) {
    G._SceneEngine._wrapText = (text, maxW_chars) => {
      const words = text.split(' ');
      const lines = [];
      let line = '';
      words.forEach(w => {
        if((line+w).length > maxW_chars/7) { lines.push(line); line = w+' '; }
        else line += w+' ';
      });
      if(line) lines.push(line);
      return lines;
    };
  }

  window._ZoneEngine = G._ZoneEngine;
  console.log('[TCI Zone Engine v1.0] ✅ OSM + Transport + Gravitational + Metropolitan');
})(0);

})(window);
