// osm-live-connector.js — UrbanX v5.0
// Fetch artere reale OSM per UAT și construiește GeoJSON pentru Mapbox
// Folosit în scena 'mobility' și 'transit' din TCI Cinematic

window._OSMConnector = {
  _cache: {},

  // URL proxy (setează după deploy Cloudflare Worker)
  get _proxy() { return window._PROXY_URL || null; },

  // Construiește URL pentru Overpass — direct sau prin proxy
  _buildUrl(lat, lon, r, type) {
    const params = new URLSearchParams({ lat, lon, r, type });
    if (this._proxy) return `${this._proxy}/osm?${params}`;
    // Direct (funcționează fără proxy pt. Overpass)
    return null; // folosim POST direct
  },

  // Fetch artere principale per UAT
  async fetchRoads(city) {
    const key = `roads_${city.lat}_${city.lon}`;
    if (this._cache[key]) return this._cache[key];

    const lat = city.lat, lon = city.lon;
    const r   = Math.round(Math.sqrt((city.suprafata_ha || 5000) * 10000 / Math.PI) * 0.8);
    const rClamped = Math.min(12000, Math.max(3000, r));

    let data = null;
    // include si strazi locale -> retea reala densa, nu doar arterele
    const query = `[out:json][timeout:25];(way(around:${rClamped},${lat},${lon})[highway~"^(motorway|trunk|primary|secondary|tertiary|residential|unclassified|living_street)$"];);out geom;`;

    // Încearcă proxy dacă există — endpoint-ul /osm vrea ?q=<overpass>
    if (this._proxy) {
      try {
        const resp = await fetch(`${this._proxy}/osm?q=${encodeURIComponent(query)}`, { signal: AbortSignal.timeout(30000) });
        if (resp.ok) { const j = await resp.json(); if (j && j.elements && j.elements.length) data = j; }
      } catch(e) { console.warn('[OSM] proxy failed, trying direct'); }
    }

    // Fallback direct Overpass (CORS permis)
    if (!data) {
      try {
        const resp = await fetch('https://overpass-api.de/api/interpreter', {
          method: 'POST',
          body: 'data=' + encodeURIComponent(query),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          signal: AbortSignal.timeout(15000),
        });
        if (resp.ok) data = await resp.json();
      } catch(e) { console.warn('[OSM] direct failed:', e.message); return null; }
    }

    if (!data?.elements?.length) return null;

    // Convertim OSM ways → GeoJSON LineString
    const features = data.elements
      .filter(el => el.type === 'way' && el.geometry?.length >= 2)
      .map(el => {
        const hw  = el.tags?.highway || 'tertiary';
        const name= el.tags?.name || '';
        const maxsp= parseInt(el.tags?.maxspeed || '50');
        const clr = hw === 'motorway' || hw === 'trunk'  ? '#fbbf24'  // autostradă/drum expres
          : hw === 'primary'   ? '#ef4444'   // arteră principală
          : hw === 'secondary' ? '#f59e0b'   // arteră secundară
          : '#22c55e';                        // stradă locală
        const width = hw === 'motorway' ? 5 : hw === 'trunk' ? 4 : hw === 'primary' ? 3 : 2;
        const coords = el.geometry.map(pt => [pt.lon, pt.lat]);
        return {
          type: 'Feature',
          geometry: { type: 'LineString', coordinates: coords },
          properties: { hw, name, maxsp, clr, width, osmId: el.id },
        };
      });

    const geojson = { type: 'FeatureCollection', features };
    this._cache[key] = geojson;
    console.log(`[OSM] ${city.name}: ${features.length} artere încărcate`);
    return geojson;
  },

  // Fetch stații transport public
  async fetchTransit(city) {
    const key = `transit_${city.lat}_${city.lon}`;
    if (this._cache[key]) return this._cache[key];

    const lat = city.lat, lon = city.lon;
    const r   = Math.min(8000, Math.max(2000, Math.round(Math.sqrt((city.suprafata_ha||5000)*10000/Math.PI)*0.6)));

    try {
      const query = `[out:json][timeout:15];(node(around:${r},${lat},${lon})[highway=bus_stop];node(around:${r},${lat},${lon})[railway=tram_stop];node(around:${r},${lat},${lon})[railway=station];);out body;`;
      const resp = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: 'data=' + encodeURIComponent(query),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        signal: AbortSignal.timeout(12000),
      });
      if (!resp.ok) return null;
      const data = await resp.json();

      const features = data.elements
        .filter(el => el.lat && el.lon)
        .map(el => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [el.lon, el.lat] },
          properties: {
            tip: el.tags?.railway ? 'tram' : 'bus',
            name: el.tags?.name || el.tags?.['name:ro'] || '',
            clr: el.tags?.railway === 'tram_stop' ? '#a78bfa' : '#60a5fa',
          }
        }));

      const geojson = { type: 'FeatureCollection', features };
      this._cache[key] = geojson;
      console.log(`[OSM] ${city.name}: ${features.length} stații TP`);
      return geojson;
    } catch(e) { console.warn('[OSM] transit:', e.message); return null; }
  },

  // Fetch spații verzi
  async fetchGreen(city) {
    const key = `green_${city.lat}_${city.lon}`;
    if (this._cache[key]) return this._cache[key];

    const lat = city.lat, lon = city.lon;
    const r   = Math.min(8000, Math.max(2000, Math.round(Math.sqrt((city.suprafata_ha||5000)*10000/Math.PI)*0.6)));

    try {
      const query = `[out:json][timeout:15];(way(around:${r},${lat},${lon})[leisure~"^(park|garden)$"];way(around:${r},${lat},${lon})[landuse~"^(forest|grass|meadow)$"];);out geom;`;
      const resp = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: 'data=' + encodeURIComponent(query),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        signal: AbortSignal.timeout(12000),
      });
      if (!resp.ok) return null;
      const data = await resp.json();

      const features = data.elements
        .filter(el => el.type === 'way' && el.geometry?.length >= 3)
        .map(el => ({
          type: 'Feature',
          geometry: { type: 'Polygon', coordinates: [el.geometry.map(pt => [pt.lon, pt.lat])] },
          properties: {
            tip: el.tags?.leisure || el.tags?.landuse || 'verde',
            name: el.tags?.name || '',
            clr: '#22c55e',
            area: el.tags?.['area:ha'] || 0,
          }
        }));

      const geojson = { type: 'FeatureCollection', features };
      this._cache[key] = geojson;
      console.log(`[OSM] ${city.name}: ${features.length} zone verzi`);
      return geojson;
    } catch(e) { console.warn('[OSM] green:', e.message); return null; }
  },

  // Adaugă layers OSM reale pe hartă Mapbox
  async applyToMap(map, city, type = 'roads') {
    const src = `osm-live-${type}`, lyr = `osm-live-${type}-l`, lyrP = `osm-live-${type}-p`;
    [lyrP, lyr].forEach(id => { try { if(map.getLayer(id)) map.removeLayer(id); } catch(e){} });
    try { if(map.getSource(src)) map.removeSource(src); } catch(e) {}

    let geojson = null;
    if (type === 'roads')   geojson = await this.fetchRoads(city);
    if (type === 'transit') geojson = await this.fetchTransit(city);
    if (type === 'green')   geojson = await this.fetchGreen(city);

    if (!geojson?.features?.length) {
      console.warn(`[OSM] fără date ${type} pentru ${city.name} — fallback geometric`);
      return false;
    }

    map.addSource(src, { type: 'geojson', data: geojson });

    if (type === 'roads') {
      map.addLayer({ id: lyr, type: 'line', source: src,
        paint: { 'line-color': ['get','clr'], 'line-width': ['get','width'], 'line-opacity': 0.85 },
        layout: { 'line-cap': 'round', 'line-join': 'round' }
      });
    } else if (type === 'transit') {
      map.addLayer({ id: lyrP, type: 'circle', source: src,
        paint: { 'circle-color': ['get','clr'], 'circle-radius': 5, 'circle-opacity': 0.85, 'circle-stroke-width': 1, 'circle-stroke-color': '#fff' }
      });
    } else if (type === 'green') {
      map.addLayer({ id: lyr, type: 'fill', source: src,
        paint: { 'fill-color': '#22c55e', 'fill-opacity': 0.55 }
      });
    }

    return true;
  },
};
