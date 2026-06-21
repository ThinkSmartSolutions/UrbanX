/* ============================================================================
 * UrbanX — Fișa parcelei 360° (capstone interconectare).
 * Pentru parcela selectată, rulează TOATE motoarele și arată o imagine unificată:
 * Dosar + reglementări PUG + scor investiție + pro-formă + carbon + trafic +
 * avize CAU + patrimoniu + sesizări. Fiecare secțiune are link către modulul complet.
 * window.Fisa360.open()
 * ONEST: pt modulele care cer un proiect (trafic/pro-formă/carbon) se folosește
 * scenariul MAXIM EDIFICABIL ipotetic (ADC = teren × CUT) — marcat ca atare.
 * ========================================================================== */
(function (G) {
  'use strict';
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.74);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(820px,96vw);max-height:93vh;overflow:auto;border:1px solid rgba(212,175,55,.4);border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.6);font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:#0b1424;z-index:2',
    body: 'padding:16px 20px', ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:7px;padding:5px 10px;cursor:pointer;font-size:11px'
  };
  function N(x) { try { return Math.round(x).toLocaleString('ro-RO'); } catch (e) { return String(x); } }
  function activeParcel() { try { var S = G.S; if (S && S.parcels && S.parcels[S.activeParcel == null ? 0 : S.activeParcel]) { var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel]; var centroid = null; try { if (ap.geo && G.turf) centroid = G.turf.centerOfMass(ap.geo).geometry.coordinates; } catch (e) {} return { nrcad: ap.nrcad, area: ap.area, utr: ap.utr, params: ap.params, source: ap.source, zoneLabel: ap.zoneLabel, centroid: centroid, geo: ap.geo }; } } catch (e) {} return null; }
  function cityName() { try { var c = G._RO_CITIES_DB && G.TCI && G._RO_CITIES_DB[G.TCI.cityKey]; if (c) return c.name; } catch (e) {} return ''; }

  function open() {
    var ap = activeParcel();
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head });
    head.appendChild(el('div', null, '<div style="font-weight:800;font-size:17px">🧭 Fișa parcelei 360°</div><div style="font-size:11px;color:#94a3b8">Toate analizele UrbanX, într-un singur loc · parcela selectată</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);
    if (!ap) { body.innerHTML = '<div style="color:#fbbf24;font-size:13px;padding:10px 0">Selectează o parcelă pe hartă pentru fișa 360°.</div>'; ov.appendChild(m); document.body.appendChild(ov); return; }

    var reg = (G.REGULI && G.REGULI[ap.utr]) || {};
    var cut = (ap.params && ap.params.cut) || reg.cut || 1.0;
    var pot = (ap.params && ap.params.pot) || reg.pot || 40;
    var adc = Math.round((ap.area || 0) * cut);

    // ── rulează motoarele (best-effort, fiecare în try) ──
    var R = {};
    try { R.dosar = G.Dosar && G.Dosar.aggregate(ap); } catch (e) {}
    try { R.invest = G.Invest && G.Invest.scoreParcel(ap); } catch (e) {}
    try { R.heritage = G.Heritage && ap.centroid ? G.Heritage.checkProximity(ap.centroid, 120) : []; } catch (e) {}
    try { R.sesizari = G.Sesizari ? G.Sesizari.registry.forParcel(ap) : []; } catch (e) {}
    try { R.feaz = G.Feaz && G.Feaz.compute({ area_m2: ap.area, cut: cut, pot: pot, use: 'locuire', standard: 'standard' }); } catch (e) {}
    try { R.carbon = G.Carbon && G.Carbon.compute({ built_area_m2: adc, use: 'locuire', structural_type: 'masonry_rc' }); } catch (e) {}
    try { R.flux = G.Flux && G.Flux.compute({ land_uses: [{ land_use: 'residential', units: Math.max(1, Math.round(adc / 75)) }], zones: [], intersections: [], pt_accessibility_score: 0.5 }, { city_size: 'city' }); } catch (e) {}
    try { R.cau = G.CAU && G.CAU.computeNotices({ work: { use: 'locuire', area_m2: adc, floors: Math.max(1, Math.round((reg.h || 9) / 3)) }, pug: { utr: ap.utr, pot: pot, cut: cut }, parcel_centroid: ap.centroid, networks: [], risks: {} }); } catch (e) {}

    var dScore = R.dosar ? R.dosar.score : null;
    var sc = dScore == null ? '#94a3b8' : dScore >= 80 ? '#22c55e' : dScore >= 50 ? '#f59e0b' : '#ef4444';

    // header parcelă + scor conformitate
    var html = '<div style="display:flex;gap:14px;align-items:center;margin-bottom:12px;flex-wrap:wrap">' +
      (dScore != null ? '<div style="width:74px;height:74px;border-radius:50%;border:4px solid ' + sc + ';display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0"><div style="font-size:22px;font-weight:900;color:' + sc + '">' + dScore + '</div><div style="font-size:8px;color:#94a3b8">conformitate</div></div>' : '') +
      '<div><div style="font-size:18px;font-weight:800">CF ' + (ap.nrcad || '—') + ' · ' + cityName() + '</div>' +
      '<div style="font-size:12px;color:#94a3b8">' + N(ap.area || 0) + ' mp teren · UTR ' + (ap.utr || '—') + (reg.d ? (' · ' + reg.d) : '') + ' · POT ' + pot + '% · CUT ' + cut + '</div>' +
      '<div style="font-size:11px;color:#fbbf24;margin-top:2px">Scenariu maxim edificabil ipotetic: ~' + N(adc) + ' mp ADC</div></div></div>';

    // KPI grid din module
    function kpi(big, small, col, key) {
      return '<div data-mod="' + (key || '') + '" style="flex:1;min-width:120px;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:11px;text-align:center;cursor:' + (key ? 'pointer' : 'default') + '">' +
        '<div style="font-size:18px;font-weight:800;color:' + (col || '#e6edf7') + '">' + big + '</div><div style="font-size:10px;color:#94a3b8">' + small + '</div></div>';
    }
    html += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">' +
      kpi(R.invest ? R.invest.total + '/100' : '—', 'oportunitate', R.invest ? (R.invest.total >= 70 ? '#22c55e' : R.invest.total >= 50 ? '#f59e0b' : '#ef4444') : null, 'invest') +
      kpi(R.feaz ? R.feaz.result.margin_pct + '%' : '—', 'marjă pro-formă', '#c4b5fd', 'feaz') +
      kpi(R.carbon ? R.carbon.green_label : '—', 'etichetă carbon', '#86efac', 'carbon') +
      kpi(R.flux ? N(R.flux.trips.pm) : '—', 'trafic vârf PM', '#34d399', 'flux') +
      '</div>';
    html += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">' +
      kpi(R.cau ? R.cau.mandatory_count : '—', 'avize obligatorii', '#a78bfa', 'cau') +
      kpi(R.heritage ? R.heritage.length : '0', 'monumente în rază', R.heritage && R.heritage.length ? '#f87171' : '#94a3b8', 'heritage') +
      kpi(R.sesizari ? R.sesizari.length : '0', 'sesizări legate', R.sesizari && R.sesizari.length ? '#f59e0b' : '#94a3b8', 'sesizari') +
      kpi(R.feaz ? (N(R.feaz.result.residual_land) + ' €') : '—', 'valoare teren max', '#fbbf24', 'feaz') +
      '</div>';

    // secțiuni detaliate
    function sec(title, content) { return '<div style="' + 'font-size:11px;color:#93c5fd;text-transform:uppercase;letter-spacing:.06em;margin:12px 0 5px;font-weight:700">' + title + '</div>' + content; }
    function rowline(l, v) { return '<div style="display:flex;justify-content:space-between;font-size:12px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,.05)"><span style="color:#94a3b8">' + l + '</span><span style="font-weight:600">' + v + '</span></div>'; }

    if (R.cau) {
      var mand = R.cau.notices.filter(function (n) { return n.is_mandatory; });
      html += sec('Autorizare — avize necesare (estimare)', mand.length ? mand.map(function (n) { return rowline(n.label || n.notice_type, n.holder_name || ''); }).join('') : '<div style="font-size:12px;color:#64748b">Fără avize obligatorii la scenariul ipotetic.</div>');
    }
    if (R.heritage && R.heritage.length) html += sec('Patrimoniu în proximitate', R.heritage.map(function (h) { return rowline(h.name + ' (' + h.level + ')', h.distance_m + ' m'); }).join(''));
    if (R.sesizari && R.sesizari.length) html += sec('Sesizări legate de parcelă', R.sesizari.map(function (s) { var c = (G.Sesizari.CATEGORIES && G.Sesizari.CATEGORIES[s.category]) || {}; return rowline((c.label || s.category), s.status); }).join(''));
    if (R.dosar && R.dosar.autorizatii && R.dosar.autorizatii.length) html += sec('Istoric autorizații', R.dosar.autorizatii.map(function (a) { return rowline(a.type + ' ' + (a.number || ''), a.status || ''); }).join(''));

    html += '<div style="font-size:10px;color:#64748b;margin-top:12px;line-height:1.5">Click pe orice indicator deschide modulul complet. Cifrele pentru trafic/pro-formă/carbon folosesc scenariul maxim edificabil ipotetic (teren×CUT, locuire) — pentru valori reale rulează modulul cu programul tău. ⚠ Orientativ.</div>';
    body.innerHTML = html;

    // KPI click → deschide modulul
    var openers = { invest: function () { G.Invest && G.Invest.openPanel(); }, feaz: function () { G.Feaz && G.Feaz.openPanel(); }, carbon: function () { G.Carbon && G.Carbon.openPanel(); }, flux: function () { G.Flux && G.Flux.openStudiu(); }, cau: function () { G.CAU && G.CAU.openPanel(); }, heritage: function () { G.Heritage && G.Heritage.openPanel(); }, sesizari: function () { G.Sesizari && G.Sesizari.openForm(); } };
    body.querySelectorAll('[data-mod]').forEach(function (c) { var k = c.getAttribute('data-mod'); if (k && openers[k]) c.onclick = function () { ov.remove(); openers[k](); }; });

    // bara de acțiuni: deschide module cheie
    var bar = el('div', { style: 'display:flex;gap:6px;flex-wrap:wrap;margin-top:12px' });
    [['🗂️ Dosar', 'Dosar', 'open'], ['📋 CAU', 'CAU', 'openPanel'], ['💰 Pro-formă', 'Feaz', 'openPanel'], ['📊 Investment', 'Invest', 'openPanel']].forEach(function (b) {
      if (!G[b[1]]) return; var btn = el('button', { style: ST.ghost }, b[0]); btn.onclick = function () { ov.remove(); G[b[1]][b[2]](); }; bar.appendChild(btn);
    });
    body.appendChild(bar);

    ov.appendChild(m); document.body.appendChild(ov);
  }

  G.Fisa360 = { open: open };
  console.log('[Fisa360] hub parcelă încărcat (window.Fisa360.open)');
})(window);
