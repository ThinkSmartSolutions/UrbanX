// ═══════════════════════════════════════════════════════════════════════════
// sge.js — Site Generator Engine v2.0
// UrbanX TSS·FG
//
// FIXES față de v139 original:
//   - subdivide produce loturi CU coordonate reale (nu doar area+Hmax)
//   - detectAccess cu distanță în metri reali (WGS84 corect)
//   - estimateAreaM2 returnează m² corecți
//   - loturi cu center calculat corect
// ═══════════════════════════════════════════════════════════════════════════

window.SGE = {

  // ── Generează parcela din geometria normalizată (GTL output) ──────────
  generateParcel(normalizedGeo) {
    if (!normalizedGeo?.coordinates?.[0]) return null;
    const ring   = normalizedGeo.coordinates[0];
    const center = GTL.centroid(ring);
    const area   = GTL.ringAreaM2(ring);
    const bbox   = GTL.bbox(ring);
    const snap   = GTL.snapToRoads(center);

    return {
      type:       'parcel',
      coords:     ring,
      center,
      area,
      bbox,
      source:     normalizedGeo.source,
      confidence: normalizedGeo.confidence,
      roadAccess: snap,
      areaLabel:  area > 10000 ? (area/10000).toFixed(2)+' ha' : Math.round(area)+' m²',
    };
  },

  // ── Subdivide parcela în loturi cu geometrii reale ─────────────────────
  // FIX: fiecare lot are coords, center, area — nu doar numere abstracte
  subdivide(parcel, mode, udreRules) {
    if (!parcel?.bbox) return [];
    const { minX, minY, maxX, maxY } = parcel.bbox;
    const Hmax = udreRules?.Hmax?.value || udreRules?.Hmax || 10;

    // Grid: urban 4×2 = 8 loturi, rural 2×2 = 4 loturi
    const cols = mode === 'urban' ? 4 : 2;
    const rows = mode === 'urban' ? 2 : 2;
    const dx = (maxX - minX) / cols;
    const dy = (maxY - minY) / rows;

    const lots = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x1 = minX + c * dx;
        const y1 = minY + r * dy;
        const x2 = x1 + dx;
        const y2 = y1 + dy;

        // Retrageri din UDRE (dacă disponibile)
        const ret = udreRules?.retragereStrada || 4;
        const retM = this._retragereInUnits(ret, parcel);

        const coords = [
          [x1 + retM, y1 + retM],
          [x2 - retM, y1 + retM],
          [x2 - retM, y2 - retM],
          [x1 + retM, y2 - retM],
          [x1 + retM, y1 + retM], // închis
        ];

        const center = GTL.centroid(coords);
        const area   = GTL.ringAreaM2(coords);

        lots.push({
          id:     r * cols + c,
          coords,
          center,
          area,
          areaLabel: area > 10000 ? (area/10000).toFixed(2)+' ha' : Math.round(area)+' m²',
          hMax:   Hmax,
          retragere: ret,
          mode,
          // Volumetrie
          footprint: area * (udreRules?.pot || 50) / 100,
          volume:    area * (udreRules?.pot || 50) / 100 * Hmax,
        });
      }
    }

    return lots;
  },

  // Convertește retragerea din metri la unitățile parcelei
  // (dacă parcela e în grade → conversie, dacă e în metri → direct)
  _retragereInUnits(retM, parcel) {
    if (!parcel?.bbox) return 0;
    const bw = (parcel.bbox.maxX - parcel.bbox.minX);
    const isGeo = Math.abs(parcel.bbox.minX) < 180 && bw < 5;
    if (isGeo) {
      // Conversie metri → grade (aproximativ la 46°N)
      return retM / 111319.9;
    }
    return retM; // deja în metri
  },

  // ── Detectare acces drumuri — FIX: distanță în metri reali ───────────
  detectAccess(parcel) {
    const roads = window.TCI?._lastCors;
    if (!roads || roads.length === 0) {
      return { found: false, note: 'TCI._lastCors nu e disponibil' };
    }

    const cx = parcel.center[0];
    const cy = parcel.center[1];
    const bboxW = parcel.bbox ? (parcel.bbox.maxX - parcel.bbox.minX) : 0;
    const isGeo = Math.abs(cx) < 180 && bboxW < 5; // geo dacă lat/lon reale

    const nearby = [];
    roads.forEach(r => {
      let distM;
      if (isGeo) {
        // WGS84 → metri reali
        const R  = 111319.9;
        const cp = Math.cos(cy * Math.PI / 180);
        const dx = (r.lon - cx) * R * cp;
        const dy = (r.lat - cy) * R;
        distM = Math.sqrt(dx*dx + dy*dy);
      } else {
        // Coordonate locale în metri
        const dx = r.lon - cx;
        const dy = r.lat - cy;
        distM = Math.sqrt(dx*dx + dy*dy);
      }
      if (distM < 200) {
        nearby.push({ road: r, distM: Math.round(distM) });
      }
    });

    nearby.sort((a,b) => a.distM - b.distM);
    const best = nearby[0];

    return {
      found:      nearby.length > 0,
      count:      nearby.length,
      nearest:    best,
      distM:      best?.distM,
      roadClass:  best?.road?.roadClass || 'unknown',
      confidence: !best ? 0
        : best.distM < 30  ? 1.0
        : best.distM < 100 ? 0.80
        : best.distM < 200 ? 0.55 : 0.30,
      label: !best ? 'fără acces rutier identificat'
        : best.distM < 30  ? `Drum ${best.road.roadClass} la ${best.distM}m — acces direct`
        : best.distM < 100 ? `Drum ${best.road.roadClass} la ${best.distM}m — acces bun`
        : `Drum ${best.road.roadClass} la ${best.distM}m — acces limitat`,
    };
  },

  // ── Raport sumar parcelă ──────────────────────────────────────────────
  summary(parcel, lots, rules) {
    const totalArea   = lots.reduce((s,l) => s + l.area, 0);
    const totalVolume = lots.reduce((s,l) => s + l.volume, 0);
    return {
      parcela: {
        area:   parcel.area,
        label:  parcel.areaLabel,
        source: parcel.source,
        conf:   (parcel.confidence * 100).toFixed(0) + '%',
      },
      loturi: {
        count:       lots.length,
        areaTotal:   Math.round(totalArea),
        volumeTotal: Math.round(totalVolume),
      },
      acces: parcel.roadAccess,
      reguli: rules ? {
        POT:  rules.pot   || rules.POT,
        CUT:  rules.cut   || rules.CUT,
        Hmax: rules.hMaxFloors || rules.Hmax,
      } : null,
    };
  },
};

console.log('[SGE] ✅ v2.0 loaded — geometrii reale + distanțe WGS84 corecte');
