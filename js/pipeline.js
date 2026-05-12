// ═══════════════════════════════════════════════════════════════════════════
// pipeline.js — UrbanX Pipeline v2.0
// UrbanX TSS·FG
//
// FIXES față de v139 original:
//   - window globals (nu ES modules) → compatibil cu TCI v138
//   - Injectează date reale din TCI: cityData, lifecycle, gravity, cohort
//   - Coordonate WGS84 corecte
//   - Rezultatul se salvează pe TCI._pipelineResult pentru acces global
// ═══════════════════════════════════════════════════════════════════════════

window.UrbanXPipeline = {

  // ── Run complet: GTL → SGE → UDRE → Massing → Result ─────────────────
  run(input) {
    console.log('[Pipeline] Start cu input:', input?.mode, input?.geometry?.source);

    // ── 1. GEO TRUTH LAYER ──────────────────────────────────────────────
    const normalizedGeo = GTL.normalizeGeometry(input.geometry);
    if (!normalizedGeo) {
      return { error: 'GTL: geometrie invalidă', input };
    }
    const geoValidation = GTL.validatePolygon(normalizedGeo);
    const terrain       = GTL.buildTerrain(input.bbox || null);

    console.log('[Pipeline] GTL: valid=' + geoValidation.valid
      + ' conf=' + (geoValidation.confidence*100).toFixed(0) + '%'
      + ' area=' + Math.round(geoValidation.area) + 'm²');

    // ── 2. DATE DIN TCI (injectate automat) ─────────────────────────────
    const cityData  = window.TCI?.cityData || window.TCI?.d || {};
    const cityKey   = window.TCI?.cityKey  || input.cityKey || 'iasi';
    const grav      = window.TCI?._calcGravityScore?.(cityData) || { gravityScore:0.5, growthType:'LOCAL' };
    const lifecycle = grav.lifecycle || {};
    const seis      = window.TCI?._getSeismicAg?.(
                        cityData.lon || input.lon || 27.6,
                        cityData.lat || input.lat || 47.16
                      ) || { ag:0.20, hMaxStory:10 };
    const need      = window.TCI?._calcUrbanNeed?.(cityData) || {};
    const feas      = window.TCI?._calcFeasibility?.({}, cityData, seis.ag) || {};

    // ── 3. SITE GENERATION ──────────────────────────────────────────────
    const parcel = SGE.generateParcel(normalizedGeo);
    if (!parcel) {
      return { error: 'SGE: nu s-a putut genera parcela', normalizedGeo };
    }

    // ── 4. UDRE — Reguli urbanistice (probabilistice) ───────────────────
    // Detectăm zona activă din TCI
    const activeZone = (window.TCI?._REAL_ZONES?.[cityKey] || [])[0];
    const zoneId     = input.zoneId || activeZone?.id || 'CV';

    let rules;
    const _UDRE = window.UDRE;
    if (typeof _UDRE?.getRulesP === 'function') {
      rules = _UDRE.getRulesP(zoneId, cityKey, lifecycle.score, seis.ag, activeZone);
    } else if (typeof _UDRE?.getRules === 'function') {
      rules = _UDRE.getRules(zoneId, cityKey, lifecycle.score, seis.ag, activeZone);
    } else {
      // Fallback minimal dacă UDRE nu e încărcat
      rules = { pot:40, cut:1.5, hMaxFloors:6, Hmax:6, confidence:0.3 };
    }

    // ── 5. SUBDIVIZIUNE ─────────────────────────────────────────────────
    const mode = input.mode || (grav.growthType === 'METROPOLITAN' ? 'urban' : 'rural');
    const lots = SGE.subdivide(parcel, mode, rules);

    // ── 6. MASSING ──────────────────────────────────────────────────────
    const buildings = window.UrbanXMassing?.build(lots, rules, parcel) || [];

    // ── 7. SUMMARY ──────────────────────────────────────────────────────
    const summary = SGE.summary(parcel, lots, rules);

    const result = {
      // Date geometrice
      geo:       normalizedGeo,
      validation: geoValidation,
      terrain,
      parcel,
      lots,
      buildings,

      // Date TCI injected
      tci: {
        cityKey,
        cityName:   cityData.name || '—',
        growthType: grav.growthType,
        lifecycle:  lifecycle.score,
        seismicAg:  seis.ag,
        hMaxStory:  seis.hMaxStory,
        pop2055:    need.pop2055,
        roi:        feas.roi,
      },

      // Reguli urbanistice
      rules,

      // Summary
      summary,

      // Meta
      timestamp: new Date().toISOString(),
      mode,
    };

    // Salvăm rezultatul pe TCI pentru acces din alte module
    if (window.TCI) window.TCI._pipelineResult = result;

    console.log('[Pipeline] ✅ Complet:', lots.length + ' loturi · '
      + buildings.length + ' clădiri · conf='
      + geoValidation.confidence.toFixed(2));

    return result;
  },

  // ── Run cu input minimal (pentru teste rapide) ────────────────────────
  // Exemplu: UrbanXPipeline.runFromCenter(27.601, 47.158, 5000, 'urban')
  runFromCenter(lon, lat, sizeM, mode) {
    const half = (sizeM / 2) / 111319.9; // grade
    const cp   = Math.cos(lat * Math.PI / 180);
    return this.run({
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [lon - half/cp, lat - half],
          [lon + half/cp, lat - half],
          [lon + half/cp, lat + half],
          [lon - half/cp, lat + half],
          [lon - half/cp, lat - half],
        ]],
        source: 'synthetic',
      },
      lon, lat, mode: mode || 'urban',
    });
  },

  // ── UI: raport text din rezultat ──────────────────────────────────────
  formatResult(result) {
    if (!result || result.error) return '❌ ' + (result?.error || 'eroare pipeline');
    const r = result;
    const lines = [
      `📍 ${r.tci.cityName} (${r.tci.growthType}) · L=${(r.tci.lifecycle||0).toFixed(2)}`,
      `📐 Parcelă: ${r.summary.parcela.label} · Certitudine: ${r.summary.parcela.conf}`,
      `🏘 ${r.summary.loturi.count} loturi · ${r.summary.loturi.areaTotal.toLocaleString('ro-RO')} m² total`,
      `📏 Reguli: POT ${r.rules._base?.pot || r.rules.pot?.value || '—'}% · CUT ${r.rules._base?.cut || r.rules.cut?.value || '—'} · Hmax R+${r.rules._base?.hMaxFloors || r.rules.hMax?.value || '—'}`,
      `🔩 Seismic: ag=${r.tci.seismicAg}g · Hmax R+${r.tci.hMaxStory}`,
      r.summary.acces?.found
        ? `🛣 Acces: ${r.summary.acces.nearest?.distM}m (${r.summary.acces.nearest?.road?.roadClass || '—'})`
        : '⚠ Fără acces rutier identificat',
      `📊 Certitudine globală: ${r.rules.overallConfidence || '—'}% (${r.rules.overallLabel || '—'})`,
    ];
    return lines.join('\n');
  },
};

console.log('[Pipeline] ✅ v2.0 loaded — TCI integrat + WGS84 + probabilistic UDRE');
