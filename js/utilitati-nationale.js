/* ============================================================================
 * UrbanX — UTILITĂȚI NAȚIONALE (Faza 0 pachet studii): rețele de TRANSPORT
 * (electric RET + gaz SNT) pe hartă din OSM + date LIVE reale din Sistemul
 * Energetic Național (Transelectrica SEN). Coloană vertebrală reutilizabilă:
 * alimentează SKID (proximitate gaz), SSI (apă/gaz/hidranți), Hale (branșamente),
 * Flux, risk-sim și o scenă cinematic.
 *
 * SURSE (toate prin proxy Cloudflare, verificate):
 *  - Trasee: OpenStreetMap Overpass — power=line/substation (+voltage), man_made=
 *    pipeline (substance=gas). MACHINE-READABLE, real.
 *  - Live electric: https://www.transelectrica.ro/sen-filter — JSON în timp real
 *    (producție/consum/sold + mix pe surse + interconexiuni), fără token.
 *  - Referință: Transgaz SNT (fluxuri zi-vârf) + Transelectrica RET (hartă) =
 *    hărți-schematic STATICE → folosite ca denumiri/valori citate, NU ca feed.
 *
 * ONEST: extinde CAU.drawNetworks (rețele edilitare LOCALE) spre coloana de
 * TRANSPORT națională/regională; nu o dublează.
 *
 * window.UtilitatiRO: fetchSEN · fetchGrid · drawGrid · clearGrid · nearestLine
 *   · nearestPipeline · SNT_REF · RET_REF · openPanel
 * ========================================================================== */
(function (G) {
  'use strict';
  var PROXY = G._PROXY_URL || 'https://urbanx-proxy.3dtravelsoftart.workers.dev';
  var SEN_URL = 'https://www.transelectrica.ro/sen-filter';

  // ── Mapare câmpuri SEN (Transelectrica) ─────────────────────────────────
  var SEN_SURSE = [
    { k: 'APE', label: 'Hidro', col: '#2563eb' },
    { k: 'NUCL', label: 'Nuclear', col: '#7c3aed' },
    { k: 'CARB', label: 'Cărbune', col: '#57534e' },
    { k: 'GAZE', label: 'Gaze naturale', col: '#f59e0b' },
    { k: 'EOLIAN', label: 'Eolian', col: '#10b981' },
    { k: 'FOTO', label: 'Fotovoltaic', col: '#eab308' },
    { k: 'BMASA', label: 'Biomasă', col: '#84cc16' }
  ];
  // Puncte de interconexiune transfrontalieră (grupate pe țară vecină)
  var SEN_INTERCONN = {
    MUKA: 'Ucraina', IS: 'Ucraina', ISPOZ: 'Ucraina',
    BEKE1: 'Ungaria', KOZL1: 'Ungaria', KOZL2: 'Ungaria', SAND: 'Ungaria',
    VARN: 'Bulgaria', DOBR: 'Bulgaria', KIKI: 'Serbia', PANCEVO21: 'Serbia', PANCEVO22: 'Serbia',
    VULC: 'R. Moldova', UNGE: 'R. Moldova', GOTE: 'R. Moldova'
  };

  function _num(v) { var n = parseFloat(v); return isFinite(n) ? n : 0; }

  // Preia snapshot LIVE din SEN (Transelectrica)
  function fetchSEN() {
    var u = PROXY + '/proxy?url=' + encodeURIComponent(SEN_URL);
    var opt = {}; try { if (AbortSignal.timeout) opt.signal = AbortSignal.timeout(20000); } catch (e) {}
    return fetch(u, opt).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (arr) {
        var m = {}; (arr || []).forEach(function (o) { Object.keys(o).forEach(function (k) { m[k] = o[k]; }); });
        var prod = _num(m.PROD), cons = _num(m.CONS || m.CONS15), sold = _num(m.SOLD);
        var mix = SEN_SURSE.map(function (s) { return { label: s.label, col: s.col, mw: _num(m[s.k]) }; })
          .filter(function (x) { return x.mw !== 0; }).sort(function (a, b) { return b.mw - a.mw; });
        var mixTot = mix.reduce(function (t, x) { return t + Math.max(0, x.mw); }, 0) || 1;
        mix.forEach(function (x) { x.pct = Math.round(Math.max(0, x.mw) / mixTot * 100); });
        // interconexiuni agregate pe țară
        var byC = {};
        Object.keys(SEN_INTERCONN).forEach(function (k) { if (m[k] != null) { var c = SEN_INTERCONN[k]; byC[c] = (byC[c] || 0) + _num(m[k]); } });
        var interconn = Object.keys(byC).map(function (c) { return { country: c, mw: Math.round(byC[c]) }; }).sort(function (a, b) { return Math.abs(b.mw) - Math.abs(a.mw); });
        return { prod: prod, cons: cons, sold: sold, mix: mix, interconn: interconn, ts: m.row1_HARTASEN_DATA || null, raw: m };
      });
  }

  // ── OSM: rețea de transport (electric + gaz) într-un bbox ─────────────────
  var VOLT_STYLE = [
    { min: 400000, label: '400 kV', col: '#dc2626', w: 3.2 },
    { min: 220000, label: '220 kV', col: '#f59e0b', w: 2.4 },
    { min: 110000, label: '110 kV', col: '#3b82f6', w: 1.6 },
    { min: 0, label: 'MT/JT', col: '#93c5fd', w: 0.9 }
  ];
  function _voltBand(v) {
    var mv = 0; String(v || '').split(';').forEach(function (p) { var n = parseInt(p, 10); if (n > mv) mv = n; });
    for (var i = 0; i < VOLT_STYLE.length; i++) if (mv >= VOLT_STYLE[i].min) return VOLT_STYLE[i];
    return VOLT_STYLE[VOLT_STYLE.length - 1];
  }

  // fetch OSM power/pipeline într-un bbox [S,W,N,E]
  function fetchGrid(bbox) {
    var b = bbox.join(',');
    var q = '[out:json][timeout:30];(' +
      'way["power"="line"](' + b + ');' +
      'way["man_made"="pipeline"]["substance"~"gas",i](' + b + ');' +
      'node["power"="substation"](' + b + ');way["power"="substation"](' + b + ');' +
      ');out tags geom 800;';
    var u = PROXY + '/osm?q=' + encodeURIComponent(q);
    var opt = {}; try { if (AbortSignal.timeout) opt.signal = AbortSignal.timeout(35000); } catch (e) {}
    return fetch(u, opt).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (j) {
        var lines = [], gas = [], subs = [], stats = { v400: 0, v220: 0, v110: 0, alt: 0, gas: 0, subst: 0 };
        (j.elements || []).forEach(function (e) {
          var t = e.tags || {};
          if (t.power === 'line' && e.geometry) {
            var band = _voltBand(t.voltage);
            lines.push({ type: 'Feature', properties: { kind: 'power', band: band.label, col: band.col, w: band.w, voltage: t.voltage || '' }, geometry: { type: 'LineString', coordinates: e.geometry.map(function (g) { return [g.lon, g.lat]; }) } });
            if (band.label === '400 kV') stats.v400++; else if (band.label === '220 kV') stats.v220++; else if (band.label === '110 kV') stats.v110++; else stats.alt++;
          } else if (t.man_made === 'pipeline' && e.geometry) {
            gas.push({ type: 'Feature', properties: { kind: 'gas', col: '#c084fc', w: 2, operator: t.operator || '' }, geometry: { type: 'LineString', coordinates: e.geometry.map(function (g) { return [g.lon, g.lat]; }) } });
            stats.gas++;
          } else if (t.power === 'substation') {
            var lon = e.lon != null ? e.lon : (e.center && e.center.lon), lat = e.lat != null ? e.lat : (e.center && e.center.lat);
            if (lon != null) { subs.push({ type: 'Feature', properties: { kind: 'subst', name: t.name || 'Stație', voltage: t.voltage || '' }, geometry: { type: 'Point', coordinates: [lon, lat] } }); stats.subst++; }
          }
        });
        return { lines: lines, gas: gas, subs: subs, stats: stats };
      });
  }

  // ── Desen pe hartă ────────────────────────────────────────────────────────
  var IDS = ['ut-power-ly', 'ut-gas-ly', 'ut-subst-ly'];
  var SRCS = ['ut-power-src', 'ut-gas-src', 'ut-subst-src'];
  function clearGrid(map) {
    map = map || G.map; if (!map) return;
    IDS.forEach(function (id) { try { if (map.getLayer(id)) map.removeLayer(id); } catch (e) {} });
    SRCS.forEach(function (id) { try { if (map.getSource(id)) map.removeSource(id); } catch (e) {} });
    var lg = document.getElementById('ut-legend'); if (lg) lg.remove();
  }
  function drawGrid(map, center, radiusKm) {
    map = map || G.map; if (!map) { if (G.ss) G.ss('Harta nu e pregătită.'); return Promise.resolve(null); }
    clearGrid(map);
    if (!center) { var c = map.getCenter(); center = [c.lng, c.lat]; }
    radiusKm = radiusKm || 25;
    var dLat = radiusKm / 111, dLon = radiusKm / (111 * Math.cos(center[1] * Math.PI / 180));
    var bbox = [center[1] - dLat, center[0] - dLon, center[1] + dLat, center[0] + dLon];
    if (G.ss) G.ss('🔌 Preiau rețelele de transport (OSM)…');
    return fetchGrid(bbox).then(function (d) {
      map.addSource(SRCS[0], { type: 'geojson', data: { type: 'FeatureCollection', features: d.lines } });
      map.addLayer({ id: IDS[0], type: 'line', source: SRCS[0], paint: { 'line-color': ['get', 'col'], 'line-width': ['get', 'w'] } });
      map.addSource(SRCS[1], { type: 'geojson', data: { type: 'FeatureCollection', features: d.gas } });
      map.addLayer({ id: IDS[1], type: 'line', source: SRCS[1], paint: { 'line-color': '#c084fc', 'line-width': 2, 'line-dasharray': [3, 2] } });
      map.addSource(SRCS[2], { type: 'geojson', data: { type: 'FeatureCollection', features: d.subs } });
      map.addLayer({ id: IDS[2], type: 'circle', source: SRCS[2], paint: { 'circle-radius': 5, 'circle-color': '#fbbf24', 'circle-stroke-color': '#1e293b', 'circle-stroke-width': 1.5 } });
      _legend(d.stats);
      if (G.ss) G.ss('🔌 ' + (d.stats.v400 + d.stats.v220 + d.stats.v110 + d.stats.alt) + ' linii · ' + d.stats.gas + ' conducte gaz · ' + d.stats.subst + ' stații.');
      G._UT_LAST = d;
      return d;
    }).catch(function (e) { if (G.ss) G.ss('Eroare rețele: ' + e.message); return null; });
  }
  function _legend(st) {
    var el = document.getElementById('ut-legend'); if (el) el.remove();
    el = document.createElement('div'); el.id = 'ut-legend';
    el.style.cssText = 'position:fixed;bottom:130px;left:10px;z-index:3200;background:rgba(8,15,35,.93);color:#e6edf7;border:1px solid rgba(148,163,184,.3);border-radius:10px;padding:10px 12px;font:12px system-ui;max-width:230px';
    el.innerHTML = '<div style="font-weight:700;margin-bottom:6px">🔌 Rețele de transport</div>' +
      VOLT_STYLE.slice(0, 3).map(function (v, i) { var c = [st.v400, st.v220, st.v110][i]; return '<div style="display:flex;align-items:center;gap:6px;margin:2px 0"><span style="width:16px;height:3px;background:' + v.col + ';display:inline-block"></span>' + v.label + ' <span style="color:#94a3b8">(' + c + ')</span></div>'; }).join('') +
      '<div style="display:flex;align-items:center;gap:6px;margin:2px 0"><span style="width:16px;height:0;border-top:2px dashed #c084fc;display:inline-block"></span>Gaz — SNT (' + st.gas + ')</div>' +
      '<div style="display:flex;align-items:center;gap:6px;margin:2px 0"><span style="width:9px;height:9px;border-radius:50%;background:#fbbf24;display:inline-block"></span>Stații (' + st.subst + ')</div>' +
      '<button onclick="window.UtilitatiRO.clearGrid()" style="margin-top:7px;background:rgba(148,163,184,.15);color:#cbd5e1;border:1px solid rgba(148,163,184,.3);border-radius:7px;padding:4px 9px;font-size:11px;cursor:pointer">✕ Ascunde</button>';
    document.body.appendChild(el);
  }

  // ── Proximitate (pt SKID/SSI/Hale) ────────────────────────────────────────
  function _nearest(features, lat, lon) {
    if (!G.turf || !features || !features.length) return null;
    var pt = G.turf.point([lon, lat]); var best = null;
    features.forEach(function (f) {
      try { var d = G.turf.pointToLineDistance(pt, f, { units: 'meters' }); if (best == null || d < best.dist) best = { dist: Math.round(d), voltage: f.properties.voltage, band: f.properties.band, operator: f.properties.operator }; } catch (e) {}
    });
    return best;
  }
  function nearestLine(lat, lon) { var d = G._UT_LAST; return d ? _nearest(d.lines, lat, lon) : null; }
  function nearestPipeline(lat, lon) { var d = G._UT_LAST; return d ? _nearest(d.gas, lat, lon) : null; }

  // ── Referință din sursele oficiale (PDF statice — dataset citat) ──────────
  var RET_REF = {
    sursa: 'Transelectrica — Harta Rețelei Electrice de Transport (RET)',
    url: 'https://www.transelectrica.ro/',
    fapte: [
      'Coloană vertebrală 400 kV + 220 kV, exploatată de CN Transelectrica SA (operator unic de transport, TSO).',
      'Interconexiuni cu Ungaria, Bulgaria, Serbia, Ucraina și R. Moldova (piața regională + ENTSO-E).',
      'Rețeaua de distribuție 110 kV/MT/JT aparține operatorilor de distribuție (Distribuție Energie).'
    ]
  };
  var SNT_REF = {
    sursa: 'Transgaz — Sistemul Național de Transport gaze (SNT), fluxuri zi de vârf',
    url: 'https://www.transgaz.ro/',
    fapte: [
      'SNT exploatat de SNTGN Transgaz SA; conducte de transport de înaltă presiune + stații de comprimare.',
      'Puncte de intrare: producție internă + import (Isaccea/Negru Vodă) + interconectări (BRUA, Giurgiu-Ruse).',
      'Distribuția de joasă/medie presiune (branșamente) aparține operatorilor de distribuție locali.'
    ]
  };

  G.UtilitatiRO = {
    fetchSEN: fetchSEN, fetchGrid: fetchGrid, drawGrid: drawGrid, clearGrid: clearGrid,
    nearestLine: nearestLine, nearestPipeline: nearestPipeline,
    SEN_SURSE: SEN_SURSE, VOLT_STYLE: VOLT_STYLE, RET_REF: RET_REF, SNT_REF: SNT_REF,
    openPanel: null  // setat de UI
  };
  console.log('[UtilitatiRO] strat utilități naționale încărcat (window.UtilitatiRO)');
})(window);
