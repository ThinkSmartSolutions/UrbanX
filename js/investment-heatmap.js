/* ============================================================================
 * UrbanX Investment Heatmap (Modul 15) — scor de oportunitate investițională.
 * CAPSTONE: combină toate modulele într-un scor compus 0-100 pe parcelă —
 * potențial urbanistic (PUG), piață, locație, risc (Heritage/Sesizări), bariere.
 * Model: HouseCanary, Parcl Labs, Green Street.
 *
 * window.Invest.scoreParcel(parcel) · openPanel()
 * ONEST: NU e sfat de investiție. Componente cu date reale (PUG/Heritage/Sesizări)
 * vs neutre/estimate (piață/locație — cer date ANCPI/OSM, Faza 2). Ponderi ajustabile.
 * ========================================================================== */
(function (G) {
  'use strict';
  var W = { urbanistic: 0.30, market: 0.25, location: 0.20, risk: 0.15, barriers: 0.10 };

  function scoreParcel(parcel) {
    parcel = parcel || {};
    var reg = (G.REGULI && parcel.utr && G.REGULI[parcel.utr]) || {};
    var cut = (parcel.params && parcel.params.cut) || reg.cut || 0;
    var area = parcel.area || 0;
    var comps = {};

    // 1. Potențial urbanistic (REAL din PUG): CUT mare = mai mult de construit
    comps.urbanistic = { score: Math.max(5, Math.min(100, Math.round(cut / 3 * 100))), q: 'real', note: 'CUT ' + (cut || '—') + ' (capacitate edificabilă)' };

    // 2. Piață (date ANCPI indisponibile) — neutru
    comps.market = { score: 50, q: 'neutru', note: 'preț/trend piață — necesită date ANCPI (Market Intel)' };

    // 3. Locație — proxy pe mărime oraș (transport/amenități reale = Faza 2)
    var tier = 55; try { var c = G._RO_CITIES_DB && G.TCI && G._RO_CITIES_DB[G.TCI.cityKey]; var pop = c && (c.pop2021 || c.pop || 0); tier = pop >= 200000 ? 72 : pop >= 50000 ? 60 : 48; } catch (e) {}
    comps.location = { score: tier, q: 'estimat', note: 'proxy pe mărimea localității (GTFS/OSM = Faza 2)' };

    // 4. Risc (REAL: Heritage + Sesizări) — pornește 100, scade
    var risk = 100, rnotes = [];
    try { if (G.Heritage && parcel.centroid) { var h = G.Heritage.checkProximity(parcel.centroid, 100); if (h.length) { risk -= 25; rnotes.push('monument la ' + h[0].distance_m + 'm (constrângeri)'); } } } catch (e) {}
    try { if (G.Sesizari) { var ses = G.Sesizari.registry.forParcel(parcel).filter(function (s) { return s.status !== 'rezolvata'; }); if (ses.length) { risk -= 20; rnotes.push(ses.length + ' sesizare deschisă'); } } } catch (e) {}
    comps.risk = { score: Math.max(0, risk), q: 'real', note: rnotes.length ? rnotes.join(', ') : 'fără constrângeri identificate' };

    // 5. Bariere (REAL: mărime parcelă vs viabil)
    var barr = area >= 1000 ? 85 : area >= 500 ? 65 : area >= 250 ? 45 : 25;
    comps.barriers = { score: barr, q: 'real', note: Math.round(area).toLocaleString('ro-RO') + ' mp (' + (area >= 500 ? 'dezvoltabil' : 'mic — fragmentare') + ')' };

    var total = Math.round(W.urbanistic * comps.urbanistic.score + W.market * comps.market.score + W.location * comps.location.score + W.risk * comps.risk.score + W.barriers * comps.barriers.score);
    var label = total >= 70 ? 'oportunitate ridicată' : total >= 50 ? 'moderată' : 'scăzută';
    return { total: total, label: label, components: comps, weights: W, parcel: parcel };
  }

  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.72);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(620px,95vw);max-height:92vh;overflow:auto;border:1px solid rgba(245,158,11,.4);border-radius:14px;font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:18px 20px', ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px'
  };
  function activeParcel() { try { var S = G.S; if (S && S.parcels && S.parcels[S.activeParcel == null ? 0 : S.activeParcel]) { var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel]; var centroid = null; try { if (ap.geo && G.turf) centroid = G.turf.centerOfMass(ap.geo).geometry.coordinates; } catch (e) {} return { nrcad: ap.nrcad, area: ap.area, utr: ap.utr, params: ap.params, centroid: centroid }; } } catch (e) {} return null; }
  var QCOL = { real: '#22c55e', estimat: '#f59e0b', neutru: '#94a3b8' };

  function openPanel() {
    var ap = activeParcel();
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head }); head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">📊 Investment Score</div><div style="font-size:11px;color:#94a3b8">Scor de oportunitate — integrează toate modulele UrbanX</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);
    if (!ap) { body.innerHTML = '<div style="color:#fbbf24;font-size:13px">Selectează o parcelă pe hartă pentru scorul de oportunitate.</div>'; ov.appendChild(m); document.body.appendChild(ov); return; }
    var r = scoreParcel(ap);
    var sc = r.total >= 70 ? '#22c55e' : r.total >= 50 ? '#f59e0b' : '#ef4444';
    var html = '<div style="display:flex;align-items:center;gap:14px;margin-bottom:14px">' +
      '<div style="width:90px;height:90px;border-radius:50%;border:5px solid ' + sc + ';display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="font-size:28px;font-weight:900;color:' + sc + '">' + r.total + '</div><div style="font-size:8px;color:#94a3b8">/100</div></div>' +
      '<div><div style="font-size:18px;font-weight:800;color:' + sc + '">' + r.label + '</div><div style="font-size:12px;color:#94a3b8">CF ' + (ap.nrcad || '—') + ' · UTR ' + (ap.utr || '—') + ' · ' + Math.round(ap.area || 0).toLocaleString('ro-RO') + ' mp</div></div></div>';
    var labels = { urbanistic: 'Potențial urbanistic', market: 'Piață', location: 'Locație', risk: 'Risc (constrângeri)', barriers: 'Bariere intrare' };
    Object.keys(r.components).forEach(function (k) {
      var c = r.components[k]; var qc = QCOL[c.q];
      html += '<div style="margin:7px 0"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:2px">' +
        '<span>' + labels[k] + ' <span style="color:#64748b">(' + Math.round(r.weights[k] * 100) + '%)</span></span>' +
        '<span style="color:' + qc + ';font-weight:700">' + c.score + ' · ' + c.q + '</span></div>' +
        '<div style="background:#0a1120;border-radius:5px;height:8px;overflow:hidden;border:1px solid rgba(255,255,255,.08)"><div style="height:100%;width:' + c.score + '%;background:' + qc + '"></div></div>' +
        '<div style="font-size:10px;color:#64748b;margin-top:2px">' + c.note + '</div></div>';
    });
    html += '<div style="font-size:10px;color:#64748b;margin-top:10px">🟢 real (din datele UrbanX) · 🟡 estimat · ⚪ neutru (cere date ANCPI/OSM = Faza 2). ⚠ Scor orientativ — NU e sfat de investiție.</div>';
    body.innerHTML = html;
    ov.appendChild(m); document.body.appendChild(ov);
  }
  G.Invest = { scoreParcel: scoreParcel, openPanel: openPanel };
  console.log('[Invest] Investment Heatmap încărcat (window.Invest)');
})(window);
