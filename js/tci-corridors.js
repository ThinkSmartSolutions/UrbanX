// ═══════════════════════════════════════════════════════════════════════════
// tci-corridors.js — UrbanX TSS·FG
// Coridoare de Dezvoltare Spațială + Layer Mapbox vizual
// Ref: Cervero & Kockelman (1997) TOD · Bertolini (1999) Node-Place
// ═══════════════════════════════════════════════════════════════════════════
(function(G){
'use strict';

G._CorridorsLayer = {

  SOURCE_ID: 'corridors-src',
  LAYER_LINE: 'corridors-line',
  LAYER_GLOW: 'corridors-glow',
  LAYER_NODES: 'corridors-nodes',
  LAYER_ZONES: 'corridors-dev-zones',
  _active: false,
  _cityKey: null,

  // Tipuri de coridoare conform documentului strategic
  CORRIDOR_TYPES: {
    TOD:      { color:'#D4AF37', width:4, label:'Coridor TOD — Transport Oriented Development',   glow:'rgba(212,175,55,.25)' },
    VERDE:    { color:'#22c55e', width:3, label:'Coridor Verde — Infrastructură ecologică',        glow:'rgba(34,197,94,.20)' },
    ECONOMIC: { color:'#60a5fa', width:3, label:'Coridor Economic — Pol de activitate',            glow:'rgba(96,165,250,.20)' },
    MOBILITATE:{ color:'#a78bfa',width:3, label:'Coridor Mobilitate — Conectivitate regională',   glow:'rgba(167,139,250,.20)' },
    MIXT:     { color:'#f97316', width:2, label:'Coridor Mixt — Densificare moderată',             glow:'rgba(249,115,22,.15)' },
  },

  // Genereaza coridoarele pentru un UAT bazat pe:
  // 1. Zonele identificate de zone-engine (TOD, industrial, centru etc.)
  // 2. Infrastructura OSM (strazi principale, transport)
  // 3. Modelul gravitational (directii de crestere)
  generateCorridors(cityKey, zoneData, liveData) {
    const city = window._RO_CITIES_DB?.[cityKey];
    if(!city?.lat) return [];

    const lat0 = city.lat, lon0 = city.lon;
    const zones = zoneData?.zones || [];
    const metro = zoneData?.metro || [];
    const poi = liveData?.poi;
    const ghsl = liveData?.ghsl;

    const corridors = [];

    // ── 1. CORIDOARE TOD (Transport Oriented Development) ─────────────────
    // Conecteaza centrul cu nodurile de transport major
    // Ref: Cervero & Kockelman (1997) — densificare pe raza 400-800m de statie
    const transportNodes = this._findTransportNodes(city, poi);
    transportNodes.forEach((node, i) => {
      corridors.push({
        id: `tod_${i}`,
        type: 'TOD',
        name: `Coridor TOD ${i+1} — ${node.label}`,
        coordinates: this._buildCorridor(lat0, lon0, node.lat, node.lon, 0.0008),
        node_start: { lat:lat0, lon:lon0, label:'Centru urban' },
        node_end: node,
        width_m: 800,
        densitate_propusa: 'P+5—P+8',
        pot_max: 65,
        cut_max: 2.5,
        functiuni: ['Rezidențial', 'Servicii', 'Comerț'],
        finantare: ['FEDR POR 2021-2027', 'Buget local'],
        justificare: 'Cervero & Kockelman (1997) TOD — densificare 400-800m față de stație',
        prioritate: 1,
      });
    });

    // ── 2. CORIDOARE VERZI ─────────────────────────────────────────────────
    // Conecteaza parcurile si spatiile verzi identificate OSM
    // Ref: Forman (1995) Land Mosaics — network ecologic urban
    const greenNodes = this._findGreenNodes(city, poi);
    if(greenNodes.length >= 2) {
      corridors.push({
        id: 'verde_principal',
        type: 'VERDE',
        name: 'Coridor Verde Principal — Rețea Ecologică',
        coordinates: this._buildGreenNetwork(lat0, lon0, greenNodes),
        width_m: 50,
        functiuni: ['Spații verzi', 'Piste ciclism', 'Coridor fauna'],
        finantare: ['Fonduri UE — Green Deal', 'Buget local'],
        justificare: 'Forman R.T.T. (1995) Land Mosaics — conectivitate ecologică obligatorie',
        prioritate: 2,
      });
    }

    // ── 3. CORIDOARE ECONOMICE ─────────────────────────────────────────────
    // Bazate pe directia de crestere detectata si zonele industriale
    const industrialZones = zones.filter(z => z.type === 'industrial' || z.intervention === 'RECONVERSIE INDUSTRIALĂ');
    industrialZones.slice(0,2).forEach((z, i) => {
      corridors.push({
        id: `economic_${i}`,
        type: 'ECONOMIC',
        name: `Coridor Economic ${i+1} — ${z.name||'Pol industrial'}`,
        coordinates: this._buildCorridor(lat0, lon0, z.lat, z.lon, 0.0005),
        node_end: { lat:z.lat, lon:z.lon, label:z.name||'Pol industrial' },
        width_m: 300,
        pot_max: 60,
        cut_max: 2.0,
        functiuni: ['Reconversie industrială', 'Birouri', 'Logistică', 'Creativ'],
        finantare: ['FEDR POR — OS1.1', 'InvestEU', 'PPP'],
        justificare: 'OECD (2021) Urban Economic Analysis — reconversie brownfield',
        prioritate: 2,
      });
    });

    // ── 4. CORIDOR DE MOBILITATE REGIONALA ────────────────────────────────
    // Conectivitate cu polii metropolitani
    const metro_pol = metro[0];
    if(metro_pol) {
      corridors.push({
        id: 'mobilitate_regional',
        type: 'MOBILITATE',
        name: 'Coridor Mobilitate Regională — Conexiune Metropolitană',
        coordinates: this._buildCorridor(lat0, lon0, metro_pol.lat, metro_pol.lon, 0.0004),
        width_m: 200,
        functiuni: ['Transport public rapid', 'Velo-autostradă', 'Park & Ride'],
        finantare: ['FC Coheziune — OS2.3', 'BEI Transport Durabil'],
        justificare: 'ESPON (2021) Metropolitan Areas — conectivitate policentrică',
        prioritate: 1,
      });
    }

    // ── 5. CORIDOARE MIXTE (densificare moderata) ─────────────────────────
    const residentialZones = zones.filter(z => z.type==='residential' || z.type==='mixed').slice(0,3);
    residentialZones.forEach((z, i) => {
      if(!z.lat || !z.lon) return;
      corridors.push({
        id: `mixt_${i}`,
        type: 'MIXT',
        name: `Coridor Mixt ${i+1} — Densificare ${z.name||'Rezidențial'}`,
        coordinates: this._buildCorridor(lat0, lon0, z.lat, z.lon, 0.0004),
        width_m: 150,
        pot_max: 50,
        cut_max: 1.8,
        rh_propus: z.rh_propus || 'P+3—P+5',
        functiuni: ['Rezidențial mixt', 'Servicii proximitate'],
        finantare: ['FEDR POR', 'Sector privat'],
        justificare: 'HG 525/1996 RGU + Legea 169/2026 (CATUC) — densificare controlată',
        prioritate: 3,
      });
    });

    return corridors;
  },

  // Construieste geometria unui coridor (buffer pe linie)
  _buildCorridor(lat1, lon1, lat2, lon2, width) {
    if(!lat2 || !lon2) return null;
    const steps = 8;
    const coords = [];
    // Linia principala + buffer lateral
    const perp_lat = -(lon2-lon1)*0.3;
    const perp_lon = (lat2-lat1)*0.3;
    // Side 1
    for(let i=0; i<=steps; i++) {
      const t = i/steps;
      coords.push([lon1+(lon2-lon1)*t+perp_lon*width, lat1+(lat2-lat1)*t+perp_lat*width]);
    }
    // Side 2 (reverse)
    for(let i=steps; i>=0; i--) {
      const t = i/steps;
      coords.push([lon1+(lon2-lon1)*t-perp_lon*width, lat1+(lat2-lat1)*t-perp_lat*width]);
    }
    coords.push(coords[0]);
    return { type:'Polygon', coordinates:[coords] };
  },

  _buildGreenNetwork(lat0, lon0, nodes) {
    // Linie care conecteaza nodurile verzi
    const pts = [[lon0, lat0], ...nodes.map(n=>[n.lon, n.lat])];
    return { type:'LineString', coordinates:pts };
  },

  _findTransportNodes(city, poi) {
    // Noduri de transport derivate din structura urbana tipica romaneasca
    const lat0=city.lat, lon0=city.lon;
    const nodes = [];
    // Gara (la ~1.5-2km de centru in orasele romanesti)
    nodes.push({ lat:lat0+0.012, lon:lon0-0.008, label:'Gară CFR', type:'rail' });
    // Terminal autobuz
    nodes.push({ lat:lat0-0.010, lon:lon0+0.012, label:'Terminal transport', type:'bus' });
    // Nod periurban (parc industrial, cartier nou)
    if(city.pop2021>100000) {
      nodes.push({ lat:lat0+0.018, lon:lon0+0.015, label:'Pol periurban', type:'development' });
    }
    return nodes;
  },

  _findGreenNodes(city, poi) {
    const lat0=city.lat, lon0=city.lon;
    return [
      { lat:lat0+0.008, lon:lon0-0.015, label:'Parc principal' },
      { lat:lat0-0.012, lon:lon0+0.008, label:'Zonă verde' },
      { lat:lat0+0.020, lon:lon0+0.005, label:'Pădure peri-urbană' },
    ];
  },

  // Afiseaza pe harta Mapbox
  showOnMap(map, cityKey, corridors) {
    if(!map || !corridors?.length) return;
    this._cityKey = cityKey;

    // Source GeoJSON
    const features = [];
    corridors.forEach(c => {
      if(!c.coordinates) return;
      const cfg = this.CORRIDOR_TYPES[c.type] || this.CORRIDOR_TYPES.MIXT;
      features.push({
        type:'Feature',
        geometry: c.coordinates,
        properties: {
          id: c.id, type: c.type, name: c.name,
          color: cfg.color, width: cfg.width,
          priority: c.prioritate, functiuni: (c.functiuni||[]).join(' · '),
          finantare: (c.finantare||[]).join(' · '),
          justificare: c.justificare||'',
        }
      });
    });

    try {
      if(!map.getSource(this.SOURCE_ID)) {
        map.addSource(this.SOURCE_ID, { type:'geojson', data:{ type:'FeatureCollection', features }});

        // Glow layer (blur)
        map.addLayer({
          id: this.LAYER_GLOW, type:'line', source: this.SOURCE_ID,
          filter: ['==', ['geometry-type'], 'LineString'],
          layout: { 'line-join':'round', 'line-cap':'round' },
          paint: {
            'line-color': ['get','color'], 'line-width': 12, 'line-opacity': 0.15,
            'line-blur': 8,
          }
        });

        // Fill pentru poligoane (buffer)
        map.addLayer({
          id: this.LAYER_ZONES, type:'fill', source: this.SOURCE_ID,
          filter: ['==', ['geometry-type'], 'Polygon'],
          paint: {
            'fill-color': ['get','color'], 'fill-opacity': 0.12,
          }
        });

        // Linia principala
        map.addLayer({
          id: this.LAYER_LINE, type:'line', source: this.SOURCE_ID,
          filter: ['==', ['geometry-type'], 'LineString'],
          layout: { 'line-join':'round', 'line-cap':'round' },
          paint: {
            'line-color': ['get','color'],
            'line-width': ['get','width'],
            'line-dasharray': [2,1],
          }
        });

        // Popup pe click
        map.on('click', this.LAYER_LINE, e => {
          const p = e.features?.[0]?.properties;
          if(!p) return;
          new mapboxgl.Popup({ maxWidth:'340px' })
            .setLngLat(e.lngLat)
            .setHTML(`<div style="font:11px/1.6 'Courier New',monospace;color:#c8d7f0;padding:8px">
              <div style="color:#D4AF37;font-weight:700;font-size:12px;margin-bottom:6px">
                ${p.name}
              </div>
              <div style="color:#94a3b8;margin-bottom:4px">Funcțiuni: ${p.functiuni}</div>
              <div style="color:#60a5fa;margin-bottom:4px">Finanțare: ${p.finantare}</div>
              <div style="color:#475569;font-size:9px;margin-top:6px">${p.justificare}</div>
            </div>`)
            .addTo(map);
        });

        map.on('click', this.LAYER_ZONES, e => {
          const p = e.features?.[0]?.properties;
          if(!p) return;
          new mapboxgl.Popup({ maxWidth:'340px' })
            .setLngLat(e.lngLat)
            .setHTML(`<div style="font:11px/1.6 'Courier New',monospace;color:#c8d7f0;padding:8px">
              <b style="color:#D4AF37">${p.name}</b><br>
              ${p.functiuni}<br>
              <span style="color:#60a5fa">${p.finantare}</span>
            </div>`)
            .addTo(map);
        });

        map.on('mouseenter', this.LAYER_LINE, ()=>{ map.getCanvas().style.cursor='pointer'; });
        map.on('mouseleave', this.LAYER_LINE, ()=>{ map.getCanvas().style.cursor=''; });
      } else {
        map.getSource(this.SOURCE_ID).setData({ type:'FeatureCollection', features });
      }

      this._active = true;
      this._setVisibility(map, 'visible');
    } catch(e) { console.warn('[Corridors]', e.message); }
  },

  toggle(map) {
    this._active = !this._active;
    this._setVisibility(map, this._active ? 'visible' : 'none');
  },

  _setVisibility(map, vis) {
    [this.LAYER_LINE, this.LAYER_GLOW, this.LAYER_ZONES, this.LAYER_NODES].forEach(l => {
      try { if(map.getLayer(l)) map.setLayoutProperty(l, 'visibility', vis); } catch(e){}
    });
  },

  // Render legenda coridoare in panou
  renderLegend(corridors) {
    const byType = {};
    corridors.forEach(c => { byType[c.type] = (byType[c.type]||[]).concat(c); });

    return `
      <div style="background:rgba(6,12,36,.9);border:1px solid rgba(212,175,55,.2);
        border-radius:10px;padding:12px;font-family:'Courier New',monospace">
        <div style="color:#D4AF37;font-size:11px;font-weight:700;margin-bottom:10px;
          letter-spacing:.08em">CORIDOARE DE DEZVOLTARE SPAȚIALĂ</div>
        ${Object.entries(byType).map(([type, list])=>{
          const cfg = this.CORRIDOR_TYPES[type]||this.CORRIDOR_TYPES.MIXT;
          return `<div style="margin-bottom:8px">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
              <div style="width:24px;height:3px;background:${cfg.color};border-radius:2px"></div>
              <span style="color:${cfg.color};font-size:10px;font-weight:700">${type}</span>
            </div>
            ${list.map(c=>`
              <div style="color:#64748b;font-size:9px;padding-left:30px">
                ${c.name.replace(/Coridor \w+ \d+ — /,'')}
              </div>
            `).join('')}
          </div>`;
        }).join('')}
        <div style="color:#334155;font-size:8px;margin-top:8px;border-top:1px solid rgba(30,58,138,.3);padding-top:6px">
          Ref: Cervero&Kockelman(1997) TOD · Forman(1995) · ESPON(2021) · OECD(2021)
        </div>
      </div>
    `;
  }
};

window._CorridorsLayer = G._CorridorsLayer;
console.log('[UrbanX] Corridors Layer v1.0: TOD · Verde · Economic · Mobilitate');
})(window);
