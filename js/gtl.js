// ═══════════════════════════════════════════════════════════════════════════
// gtl.js — Geo Truth Layer v2.0
// UrbanX TSS·FG
//
// FIXES față de v139 original:
//   - closePolygon pe ring array corect (nu pe array de rings)
//   - validatePolygon cu Turf.js (deja încărcat în index.html)
//   - snapToRoads folosește TCI._lastCors (date OSM reale)
//   - distanțe în metri reali (WGS84 corect)
// ═══════════════════════════════════════════════════════════════════════════

window.GTL = {

  // ── Sursă → confidence [0,1] ─────────────────────────────────────────
  CONFIDENCE: {
    'ANCPI':     1.00,
    'DWG':       0.75,
    'OSM':       0.55,
    'satellite': 0.40,
    'PUG':       0.90,
    'manual':    0.35,
    'synthetic': 0.20,
    'unknown':   0.15,
  },

  confidence(source) {
    return this.CONFIDENCE[source] ?? 0.20;
  },

  // ── Normalizează GeoJSON Polygon ─────────────────────────────────────
  // Acceptă: { type:'Polygon', coordinates:[[ring]], source:... }
  // Returnează același obiect cu ring-ul exterior închis
  normalizeGeometry(geo) {
    if (!geo) return null;

    // Acceptăm și input local (array de puncte [x,y] în metri)
    // sau GeoJSON standard { type:'Polygon', coordinates:[[...]] }
    let ring;
    if (Array.isArray(geo) && Array.isArray(geo[0])) {
      // Input direct ca array de puncte [[x,y],...]
      ring = geo;
    } else if (geo.type === 'Polygon' && geo.coordinates) {
      ring = geo.coordinates[0]; // inelul exterior
    } else if (geo.type === 'Feature' && geo.geometry) {
      ring = geo.geometry.coordinates[0];
    } else {
      console.warn('[GTL] normalizeGeometry: format nerecunoscut', geo);
      return null;
    }

    const closedRing = this.closeRing(ring);

    return {
      type: 'Polygon',
      coordinates: [closedRing],
      source: geo.source || 'unknown',
      confidence: this.confidence(geo.source || 'unknown'),
    };
  },

  // ── Închide un ring (array de [x,y] sau [lon,lat]) ────────────────────
  closeRing(ring) {
    if (!ring || ring.length < 3) return ring;
    const first = ring[0];
    const last  = ring[ring.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) {
      return [...ring, [...first]];
    }
    return ring;
  },

  // ── Validare geometrie cu Turf.js ────────────────────────────────────
  // Returnează { valid, confidence, warnings[] }
  validatePolygon(normalizedGeo) {
    const warnings = [];
    let valid = true;
    let confidence = normalizedGeo?.confidence || 0.2;

    if (!normalizedGeo?.coordinates?.[0]) {
      return { valid: false, confidence: 0, warnings: ['geometrie nulă'] };
    }

    const ring = normalizedGeo.coordinates[0];

    // 1. Minim 4 puncte (3 unice + repetiția primului)
    if (ring.length < 4) {
      warnings.push('prea puține puncte (' + ring.length + ')');
      valid = false;
    }

    // 2. Self-intersection cu Turf (dacă e disponibil și coordonate geo reale)
    if (typeof turf !== 'undefined' && ring[0][0] > -180 && ring[0][0] < 180) {
      try {
        const feature = turf.polygon([ring]);
        const kinks = turf.kinks(feature);
        if (kinks.features.length > 0) {
          warnings.push(kinks.features.length + ' intersecții proprii detectate');
          confidence *= 0.6;
        }
      } catch(e) { /* Turf poate crasha pe coordonate locale */ }
    }

    // 3. Arie minimă
    const area = this.ringAreaM2(ring);
    if (area < 10) {
      warnings.push('arie prea mică (' + area.toFixed(1) + ' m²)');
      valid = false;
    }

    return { valid, confidence, warnings, area };
  },

  // ── Arie ring în m² — funcționează și pe coords locale (metri) ──────
  // Dacă valorile sunt mici (< 1000) → presupunem metri locali → direct
  // Dacă valorile sunt mari (lon/lat în grade) → aplicăm proiecție
  ringAreaM2(ring) {
    if (!ring || ring.length < 3) return 0;
    // Detectare geo vs local: dacă aria bbox e > 5 grade → coordonate locale (metri)
    const _bboxW = Math.max(...ring.map(p=>p[0])) - Math.min(...ring.map(p=>p[0]));
    const _bboxH = Math.max(...ring.map(p=>p[1])) - Math.min(...ring.map(p=>p[1]));
    const isGeo = Math.abs(ring[0][0]) < 180 && Math.abs(ring[0][1]) < 90
                  && ring[0][0] !== 0 && _bboxW < 5 && _bboxH < 5;
    let area = 0;
    for (let i = 0; i < ring.length - 1; i++) {
      area += ring[i][0] * ring[i + 1][1];
      area -= ring[i + 1][0] * ring[i][1];
    }
    area = Math.abs(area / 2);
    if (isGeo) {
      // Conversie grade² → m² la latitudinea României (~46°N)
      const lat = ring[0][1] || 46;
      const mPerDegLon = 111319.9 * Math.cos(lat * Math.PI / 180);
      const mPerDegLat = 111319.9;
      area *= mPerDegLon * mPerDegLat;
    }
    return area;
  },

  // ── Centroid ring ────────────────────────────────────────────────────
  centroid(ring) {
    if (!ring || ring.length === 0) return [0, 0];
    // Exclude ultimul punct dacă e identic cu primul (ring închis)
    const pts = (ring[0][0] === ring[ring.length-1][0] && ring[0][1] === ring[ring.length-1][1])
      ? ring.slice(0, -1) : ring;
    const x = pts.reduce((s, p) => s + p[0], 0) / pts.length;
    const y = pts.reduce((s, p) => s + p[1], 0) / pts.length;
    return [x, y];
  },

  // ── Snapping la cel mai aproape drum din TCI._lastCors ───────────────
  // Returnează cel mai aproape road point și distanța în metri
  snapToRoads(center) {
    const roads = window.TCI?._lastCors;
    if (!roads || roads.length === 0) return { found: false };

    const cx = center[0], cy = center[1];
    const R = 111319.9;
    const cp = Math.cos(cy * Math.PI / 180);

    let best = null, bestDist = Infinity;
    roads.forEach(r => {
      const dx = (r.lon - cx) * R * cp;
      const dy = (r.lat - cy) * R;
      const d  = Math.sqrt(dx*dx + dy*dy);
      if (d < bestDist) { bestDist = d; best = r; }
    });

    return {
      found:      !!best,
      distM:      Math.round(bestDist),
      road:       best,
      confidence: bestDist < 50  ? 1.0
                : bestDist < 200 ? 0.75
                : bestDist < 500 ? 0.50 : 0.25,
    };
  },

  // ── Terrain sintetic fallback ─────────────────────────────────────────
  buildTerrain(bbox) {
    return {
      type: 'TIN_APPROX',
      bbox: bbox || null,
      resolution: 20,
      source: 'synthetic',
      confidence: 0.20,
      note: 'Teren sintetic — fără DEM real. Adaugă DEM 10m pentru precizie.',
    };
  },

  // ── Bounding box al unui ring ────────────────────────────────────────
  bbox(ring) {
    let minX=Infinity, minY=Infinity, maxX=-Infinity, maxY=-Infinity;
    ring.forEach(([x,y]) => {
      if(x<minX) minX=x; if(x>maxX) maxX=x;
      if(y<minY) minY=y; if(y>maxY) maxY=y;
    });
    return { minX, minY, maxX, maxY, w: maxX-minX, h: maxY-minY };
  },
};

console.log('[GTL] ✅ v2.0 loaded — GeoJSON corect + Turf validation + road snapping');
