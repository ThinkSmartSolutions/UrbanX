// ═══════════════════════════════════════════════════════════════════════════
// data-freshness.js — window._DataFreshness
// Registru central de PROSPEȚIME a datelor: pentru orice sursă oficială/live ținem
// snapshot-ul, cadența de actualizare și sursa, calculăm vechimea și semnalăm ce
// trebuie reîmprospătat. Regulă UrbanX: datele oficiale/live se țin la zi.
// window._DataFreshness.check() · .openPanel() · 26 iunie 2026 · ThinkSmart Solutions
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';

  // type: 'live' (mereu curent), 'rolling' (se actualizează continuu), 'snapshot' (versiune fixă)
  // cadence_y: cadența tipică de reîmprospătare (ani); pragul de „învechit" = 1.5× cadența
  var SOURCES = [
    { id: 'lmi', name: 'LMI — Lista Monumentelor Istorice (INP)', type: 'snapshot', year: 2012, cadence_y: 1, source: 'data.gov.ro / cultura.ro (set Wiki Loves Monuments)', note: 'Snapshot WLM 2012; LMI oficial curent = PDF anual MCIN.' },
    { id: 'ran', name: 'RAN — Repertoriul Arheologic Național (CIMEC)', type: 'rolling', year: 2024, cadence_y: 1, source: 'ran.cimec.ro', note: 'HTML; verificare punctuală la cerere.' },
    { id: 'ins_rec', name: 'INS — Recensământul populației', type: 'snapshot', year: 2021, cadence_y: 10, source: 'INS Recensământ 2021', note: 'Decenal; următorul ~2031.' },
    { id: 'ins_tempo', name: 'INS TEMPO — statistici', type: 'rolling', year: 2024, cadence_y: 1, source: 'statistici.insse.ro (TEMPO)', note: 'Serii anuale/lunare.' },
    { id: 'meteo', name: 'Open-Meteo / Copernicus ERA5 — climă', type: 'live', year: 2026, cadence_y: 0, source: 'open-meteo.com (ERA5)', note: 'Reanaliză rulantă — mereu actuală.' },
    { id: 'osm', name: 'OpenStreetMap / Overpass — POI & rețele', type: 'live', year: 2026, cadence_y: 0, source: 'overpass-api (via proxy)', note: 'Editat continuu de comunitate.' },
    { id: 'seism', name: 'Cod seismic P100-1', type: 'snapshot', year: 2022, cadence_y: 8, source: 'P100-1/2022 (MDLPA)', note: 'Normativ; versiunea în vigoare.' },
    { id: 'anar', name: 'ANAR — hidrografie / inundabilitate (WMS)', type: 'rolling', year: 2024, cadence_y: 2, source: 'gis.rowater.ro (WMS, via proxy)', note: 'Planuri de management actualizate periodic.' },
    { id: 'budget', name: 'Buget local — finanțe publice', type: 'rolling', year: 2024, cadence_y: 1, source: 'Min. Finanțelor / execuții bugetare', note: 'Anual; model calibrat L.273/2006.' },
    { id: 'pug', name: 'PUG / RLU per UAT', type: 'snapshot', year: null, cadence_y: 10, source: 'HCL UAT (data/{uat}/)', note: 'Per UAT; valabilitate prelungită frecvent.' }
  ];

  function _nowYear() { try { return new Date().getFullYear(); } catch (e) { return 2026; } }

  // status: 'ok' | 'monitor' | 'stale'
  function check() {
    var y = _nowYear();
    return SOURCES.map(function (s) {
      var age = (s.year != null) ? (y - s.year) : null;
      var status = 'ok';
      if (s.type === 'live') status = 'ok';
      else if (s.type === 'snapshot' && s.cadence_y) {
        if (age != null && age > Math.max(2, s.cadence_y * 1.5)) status = 'stale';
        else if (age != null && age > s.cadence_y) status = 'monitor';
      } else if (s.type === 'rolling') {
        status = (age != null && age >= 2) ? 'monitor' : 'ok';
      }
      return { id: s.id, name: s.name, type: s.type, year: s.year, age: age, status: status, source: s.source, note: s.note, cadence_y: s.cadence_y };
    });
  }

  function summary() {
    var r = check();
    return { total: r.length, ok: r.filter(function (x) { return x.status === 'ok'; }).length, monitor: r.filter(function (x) { return x.status === 'monitor'; }).length, stale: r.filter(function (x) { return x.status === 'stale'; }).length, items: r };
  }

  var COL = { ok: '#22c55e', monitor: '#f59e0b', stale: '#ef4444' };
  var LBL = { ok: 'la zi', monitor: 'de monitorizat', stale: 'de reîmprospătat' };

  function openPanel() {
    var s = summary();
    var ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(2,6,16,.74);z-index:9400;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)';
    ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var rows = s.items.map(function (x) {
      return '<tr style="border-bottom:1px solid rgba(255,255,255,.06)">' +
        '<td style="padding:6px 8px;font-size:11.5px;color:#e6edf7">' + x.name + '</td>' +
        '<td style="padding:6px 8px;font-size:11px;color:#94a3b8">' + (x.type === 'live' ? 'live' : x.type === 'rolling' ? 'rulant' : 'snapshot' + (x.year ? ' ' + x.year : '')) + '</td>' +
        '<td style="padding:6px 8px;font-size:11px;color:#94a3b8">' + (x.age != null ? x.age + ' ani' : '—') + '</td>' +
        '<td style="padding:6px 8px;text-align:center"><span style="background:' + COL[x.status] + '22;color:' + COL[x.status] + ';border:1px solid ' + COL[x.status] + '55;border-radius:6px;padding:2px 8px;font-size:10px;font-weight:700">' + LBL[x.status] + '</span></td>' +
        '</tr><tr><td colspan="4" style="padding:0 8px 7px;font-size:9.5px;color:#64748b">' + x.source + ' · ' + x.note + '</td></tr>';
    }).join('');
    ov.innerHTML = '<div style="background:#0b1424;color:#e6edf7;width:min(760px,96vw);max-height:90vh;overflow:auto;border:1px solid rgba(59,130,246,.4);border-radius:14px;font-family:system-ui,sans-serif;padding:18px 20px">' +
      '<div style="display:flex;justify-content:space-between;align-items:center"><div style="font-weight:800;font-size:16px">🗓 Prospețimea datelor — UrbanX</div>' +
      '<button onclick="this.closest(\'div[style*=fixed]\').remove()" style="background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:5px 10px;cursor:pointer">Închide</button></div>' +
      '<div style="font-size:11px;color:#94a3b8;margin:4px 0 12px">Regulă UrbanX: datele oficiale și live se țin la zi. ' +
      '<b style="color:#22c55e">' + s.ok + ' la zi</b> · <b style="color:#f59e0b">' + s.monitor + ' de monitorizat</b> · <b style="color:#ef4444">' + s.stale + ' de reîmprospătat</b>.</div>' +
      '<table style="width:100%;border-collapse:collapse"><thead><tr style="text-align:left;color:#64748b;font-size:10px;text-transform:uppercase">' +
      '<th style="padding:4px 8px">Sursă</th><th style="padding:4px 8px">Tip</th><th style="padding:4px 8px">Vechime</th><th style="padding:4px 8px;text-align:center">Stare</th></tr></thead><tbody>' + rows + '</tbody></table>' +
      '<div style="font-size:9px;color:#64748b;margin-top:10px">Sursele „live" (Open-Meteo, OSM) sunt mereu actuale. Snapshot-urile vechi (ex. LMI WLM 2012) trebuie reîmprospătate din sursa oficială curentă (PDF anual MCIN / data.gov.ro). „Vechime" = ani de la snapshot.</div></div>';
    document.body.appendChild(ov);
  }

  G._DataFreshness = { check: check, summary: summary, openPanel: openPanel, SOURCES: SOURCES };
  window._DataFreshness = G._DataFreshness;
  try {
    var s = summary();
    console.log('[DataFreshness] ✅ ' + s.total + ' surse · ' + s.ok + ' la zi, ' + s.monitor + ' de monitorizat, ' + s.stale + ' de reîmprospătat (window._DataFreshness.openPanel())');
  } catch (e) {}
})(window);
