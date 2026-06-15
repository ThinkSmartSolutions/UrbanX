// ═══════════════════════════════════════════════════════════════════════════
// cote-nivel.js — Cote de nivel / declivitate parcelă (decizie demisol)
// Sursă elevație: opentopodata.org — EU-DEM 25m (Europa), fallback SRTM 30m.
// Precizie ±1-3m — suficient pentru SF/decizie demisol; NU înlocuiește ridicarea topo (PT/DTAC).
// Toate fetch-urile prin proxy Cloudflare (CLAUDE.md §10).
// API: window._CoteNivel.analyze(geoFeature, nrcad) -> {min,max,dH,panta,puncte,recomandare,sursa}
// ═══════════════════════════════════════════════════════════════════════════
(function () {
  'use strict';
  var PROXY = 'https://urbanx-proxy.3dtravelsoftart.workers.dev/proxy?url=';
  var _cache = {};

  function _ring(geo) {
    var g = geo && (geo.geometry || geo);
    if (!g || !g.coordinates) return null;
    return g.type === 'MultiPolygon' ? g.coordinates[0][0] : g.coordinates[0];
  }
  function _centroid(ring) {
    var sx = 0, sy = 0; ring.forEach(function (p) { sx += p[0]; sy += p[1]; });
    return [sx / ring.length, sy / ring.length];
  }
  // distanță aproximativă (m) între 2 puncte [lon,lat]
  function _distM(a, b) {
    var R = 6371000, d2r = Math.PI / 180;
    var dLat = (b[1] - a[1]) * d2r, dLon = (b[0] - a[0]) * d2r;
    var la1 = a[1] * d2r, la2 = b[1] * d2r;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
  }

  function _samplePoints(geo) {
    var ring = _ring(geo); if (!ring || ring.length < 3) return null;
    var pts = ring.slice(0, ring.length > 1 && ring[0][0] === ring[ring.length - 1][0] ? ring.length - 1 : ring.length);
    // decimează dacă sunt prea multe vârfuri (max 40)
    if (pts.length > 40) { var step = Math.ceil(pts.length / 40); pts = pts.filter(function (_, i) { return i % step === 0; }); }
    pts.push(_centroid(ring)); // + centrul
    return pts; // [[lon,lat],...]
  }

  async function _fetchElev(pts, dataset) {
    var locs = pts.map(function (p) { return p[1].toFixed(6) + ',' + p[0].toFixed(6); }).join('|'); // lat,lon
    var url = 'https://api.opentopodata.org/v1/' + dataset + '?locations=' + locs;
    var r = await fetch(PROXY + encodeURIComponent(url), { signal: AbortSignal.timeout(15000) });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    var d = await r.json();
    if (d.status !== 'OK' || !d.results) throw new Error(d.error || 'no results');
    return d.results.map(function (x) { return x.elevation; }).filter(function (e) { return e != null && !isNaN(e); });
  }

  function _recomandare(dH) {
    if (dH < 0.5) return { nivel: 'Teren plat', text: 'Diferență de nivel nesemnificativă (<0,5 m). Demisolul NU este justificat de declivitate.' };
    if (dH < 1.5) return { nivel: 'Declivitate mică', text: 'Diferență mică (0,5-1,5 m). Demisol de regulă nejustificat; eventual soclu/cota ±0,00 ridicată.' };
    if (dH < 3.0) return { nivel: 'Declivitate medie', text: 'Diferență medie (1,5-3,0 m). Demisol parțial poate fi valorificat (semi-îngropat pe latura înaltă). Merită analizat în SF.' };
    return { nivel: 'Declivitate mare', text: 'Diferență mare (>3,0 m). Demisol/subsol valorificabil; necesită cotă de încastrare și ridicare topografică pentru PT/DTAC.' };
  }

  async function analyze(geo, nrcad) {
    var key = nrcad || (function () { var r = _ring(geo); return r ? _centroid(r).map(function (v) { return v.toFixed(5); }).join(',') : ''; })();
    if (_cache[key]) return _cache[key];
    var pts = _samplePoints(geo); if (!pts) throw new Error('geometrie invalidă');
    var elevs, sursa = 'EU-DEM 25m (opentopodata)';
    try { elevs = await _fetchElev(pts, 'eudem25m'); }
    catch (e) { try { elevs = await _fetchElev(pts, 'srtm30m'); sursa = 'SRTM 30m (opentopodata)'; } catch (e2) { throw e2; } }
    if (!elevs.length) throw new Error('fără date elevație');
    var min = Math.min.apply(null, elevs), max = Math.max.apply(null, elevs);
    var dH = +(max - min).toFixed(2);
    // extent orizontal max între vârfuri
    var ext = 0; for (var i = 0; i < pts.length; i++) for (var j = i + 1; j < pts.length; j++) { var dd = _distM(pts[i], pts[j]); if (dd > ext) ext = dd; }
    var panta = ext > 0 ? +(dH / ext * 100).toFixed(1) : 0;
    var rec = _recomandare(dH);
    var res = {
      min: +min.toFixed(1), max: +max.toFixed(1), dH: dH, panta: panta,
      puncte: elevs.length, extent_m: Math.round(ext), sursa: sursa,
      recomandare: rec.text, nivel: rec.nivel,
      nota: 'Precizie ±1-3 m (model digital al terenului). NU înlocuiește ridicarea topografică certificată pentru PT/DTAC.'
    };
    _cache[key] = res;
    return res;
  }

  window._CoteNivel = { analyze: analyze, _cache: _cache };

  // Handler UI: buton "Cote de nivel" din panoul de calcule live
  window._showCoteNivel = async function () {
    var el = document.getElementById('cote-nivel-result');
    var S = window.S || {};
    var ap = S.parcels && S.parcels[S.activeParcel == null ? 0 : S.activeParcel];
    if (!ap || !ap.geo || !ap.geo.geometry) { if (el) el.innerHTML = '<span style="color:#fbbf24">Selectați o parcelă mai întâi.</span>'; return; }
    if (el) el.innerHTML = '<span style="color:#64748b">⏳ Se interoghează modelul digital al terenului (EU-DEM)…</span>';
    try {
      var r = await analyze(ap.geo, ap.nrcad);
      var col = r.dH < 0.5 ? '#34d399' : r.dH < 1.5 ? '#86efac' : r.dH < 3 ? '#fbbf24' : '#f87171';
      if (el) el.innerHTML =
        '<b style="color:#e2e8f0">Cote: ' + r.min + '–' + r.max + ' m</b> · ' +
        '<b style="color:' + col + '">ΔH = ' + r.dH + ' m</b> · pantă ' + r.panta + '% · <i>' + r.nivel + '</i><br>' +
        '<span style="color:#94a3b8">' + r.recomandare + '</span><br>' +
        '<span style="color:#475569;font-size:9.5px">' + r.sursa + ' · ' + r.nota + '</span>';
    } catch (e) {
      if (el) el.innerHTML = '<span style="color:#f87171">Eroare elevație: ' + (e.message || e) + ' — reîncercați.</span>';
    }
  };
})();
