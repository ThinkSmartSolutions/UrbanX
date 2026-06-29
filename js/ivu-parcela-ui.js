// ═══════════════════════════════════════════════════════════════════════════
// ivu-parcela-ui.js — panou + export PDF pt iVU pe parcelă (partea 2)
// _renderPanel(state) — fișă interactivă; exportPDF(state) — PDF standard UrbanX.
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';
  var IP = G._IVUParcela; if (!IP) { console.warn('[IVUParcela UI] modul de bază lipsă'); return; }
  var N = function (v, d) { return isNaN(+v) ? '-' : Number(v).toLocaleString('ro-RO', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); };
  function _gcol(v) { return v >= 75 ? '#22c55e' : v >= 55 ? '#84cc16' : v >= 45 ? '#eab308' : v >= 35 ? '#f59e0b' : '#ef4444'; }
  function _esc(s) { return ('' + (s == null ? '' : s)).replace(/'/g, '’'); }

  function _recompute() {
    var st = IP._state; if (!st) return;
    st.result = IP.compute(st.vals, st.restr, st.kf, st.kr, st.coefs.ka, st.coefs.kql);
    var sc = document.getElementById('ivup-score'); if (sc) { sc.textContent = st.result.iVU; sc.style.color = _gcol(st.result.iVU); }
    var gr = document.getElementById('ivup-grade'); if (gr) gr.textContent = st.result.grade;
    var fm = document.getElementById('ivup-formula'); if (fm) fm.innerHTML = _formulaHTML(st.result);
  }
  G._IVUParcela._recompute = _recompute;
  window._ivupSetFactor = function (id, v) { var st = IP._state; if (!st) return; st.vals[id] = +v; var lab = document.getElementById('lab-' + id); if (lab) lab.textContent = (+v).toFixed(1); _recompute(); };
  window._ivupSetKf = function (v) { if (IP._state) { IP._state.kf = v; _recompute(); } };
  window._ivupSetKr = function (v) { if (IP._state) { IP._state.kr = v; _recompute(); } };
  window._ivupToggleR = function (id, on) { var st = IP._state; if (!st) return; if (!st.restr[id]) st.restr[id] = { sev: 'mediu' }; st.restr[id].activ = on; var sev = document.getElementById('sev-' + id); if (sev) sev.style.display = on ? 'inline-block' : 'none'; _recompute(); };
  window._ivupSetSev = function (id, v) { var st = IP._state; if (!st || !st.restr[id]) return; st.restr[id].sev = v; _recompute(); };
  window._ivupExport = function () { if (IP._state) IP.exportPDF(IP._state); };

  function _formulaHTML(r) {
    return 'iVU = S⁺ × (1 − P⁻/100) × Kf × Kr × Ka × Kql<br>' +
      '<b style="color:#cbd5e1">' + r.iVU + '</b> = ' + N(r.Splus, 1) + ' × (1 − ' + N(r.Pminus, 1) + '/100) × ' + r.Kf.toFixed(2) + ' × ' + r.Kr.toFixed(2) + ' × ' + r.Ka.toFixed(2) + ' × ' + r.Kql.toFixed(2);
  }

  IP._renderPanel = function (st) {
    var old = document.getElementById('ivup-panel'); if (old) old.remove();
    var r = st.result, P = st.P;
    var mob = window.innerWidth < 841;
    var div = document.createElement('div'); div.id = 'ivup-panel';
    div.style.cssText = 'position:fixed;' + (mob ? 'inset:0;border-radius:0' : 'top:54px;right:14px;width:430px;max-height:88vh;border-radius:14px') + ';z-index:9300;background:rgba(8,13,26,.98);border:1px solid rgba(56,138,221,.3);overflow-y:auto;box-shadow:0 16px 50px rgba(0,0,0,.7);backdrop-filter:blur(14px);font-family:system-ui,sans-serif';

    // factori per categorie (slidere editabile + dovadă OSM)
    var factHTML = IP.FACTORI.map(function (g) {
      var rows = g.f.map(function (fc) {
        var v = st.vals[fc.id] != null ? st.vals[fc.id] : 5; var ev = st.evidence[fc.id] || {};
        var src = ev.nearest != null ? ('cel mai apropiat ~' + N(ev.nearest) + ' m' + (ev.count ? ' · ' + ev.count + ' în 1,5 km' : '')) : (ev.count != null ? (ev.count + ' în 1,5 km') : (ev.note || 'estimare'));
        return '<div style="margin:5px 0">' +
          '<div style="display:flex;justify-content:space-between;font-size:11px;color:#cbd5e1"><span>' + fc.ico + ' ' + fc.name + ' <span style="color:#64748b">(' + fc.pond + '%)</span></span><span style="color:' + _gcol(v * 10) + ';font-weight:700">' + fc.ico + ' <b id="lab-' + fc.id + '">' + v.toFixed(1) + '</b>/10</span></div>' +
          '<input type="range" min="0" max="10" step="0.5" value="' + v + '" oninput="_ivupSetFactor(\'' + fc.id + '\',this.value)" style="width:100%;accent-color:' + g.col + '">' +
          '<div style="font-size:9px;color:#64748b;margin-top:-2px">OSM: ' + src + '</div></div>';
      }).join('');
      return '<div style="margin-bottom:10px"><div style="font-size:10px;font-weight:700;color:' + g.col + ';text-transform:uppercase;letter-spacing:.04em;border-bottom:1px solid rgba(255,255,255,.06);padding-bottom:3px;margin-bottom:4px">' + g.label + '</div>' + rows + '</div>';
    }).join('');

    // restricții
    var restrHTML = IP.RESTRICTII.map(function (rr) {
      var on = st.restr[rr.id] && st.restr[rr.id].activ; var sev = (st.restr[rr.id] && st.restr[rr.id].sev) || 'mediu';
      return '<div style="display:flex;align-items:center;gap:6px;padding:3px 0;font-size:11px;color:#cbd5e1">' +
        '<input type="checkbox" ' + (on ? 'checked' : '') + ' onchange="_ivupToggleR(\'' + rr.id + '\',this.checked)" style="accent-color:#ef4444">' +
        '<span style="flex:1">' + rr.name + ' <span style="color:#64748b">(−' + rr.amp + ')</span></span>' +
        '<select id="sev-' + rr.id + '" onchange="_ivupSetSev(\'' + rr.id + '\',this.value)" style="display:' + (on ? 'inline-block' : 'none') + ';background:#0b1426;color:#e2e8f0;border:1px solid rgba(255,255,255,.15);border-radius:5px;font-size:10px;padding:2px">' +
        ['usor', 'mediu', 'grav'].map(function (s) { return '<option value="' + s + '" ' + (sev === s ? 'selected' : '') + '>' + s + '</option>'; }).join('') + '</select></div>';
    }).join('');

    div.innerHTML =
      '<div style="position:sticky;top:0;background:rgba(8,13,26,.98);padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;justify-content:space-between;align-items:center;z-index:2">' +
      '<div><div style="color:#38bdf8;font-weight:800;font-size:14px">📍 iVU pe amplasament</div><div style="color:#64748b;font-size:10px">' + (P.nrcad ? 'CF/nr. cad. ' + _esc(P.nrcad) + ' · ' : '') + (P.area ? N(P.area) + ' mp' : '') + '</div></div>' +
      '<button onclick="document.getElementById(\'ivup-panel\').remove()" style="background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3);color:#f87171;border-radius:8px;padding:7px 13px;cursor:pointer;font-weight:700">✕</button></div>' +
      '<div style="padding:14px 16px">' +
      '<div style="display:flex;align-items:center;gap:14px;background:rgba(56,138,221,.06);border:1px solid rgba(56,138,221,.18);border-radius:12px;padding:14px;margin-bottom:12px">' +
      '<div style="text-align:center"><div id="ivup-score" style="font-size:42px;font-weight:900;line-height:1;color:' + _gcol(r.iVU) + '">' + r.iVU + '</div><div style="font-size:10px;color:#64748b">/100</div></div>' +
      '<div><div style="font-size:22px;font-weight:800;color:#e2e8f0">Calificativ <span id="ivup-grade" style="color:#38bdf8">' + r.grade + '</span></div>' +
      '<div style="font-size:10px;color:#94a3b8;margin-top:2px">Indice de Valoare Urbană pe amplasament</div></div></div>' +
      '<div style="background:rgba(255,255,255,.03);border-radius:9px;padding:10px;font-size:10.5px;color:#94a3b8;font-family:ui-monospace,monospace;margin-bottom:12px" id="ivup-formula">' + _formulaHTML(r) + '</div>' +
      '<div style="display:flex;gap:8px;margin-bottom:12px">' +
      '<div style="flex:1"><div style="font-size:9px;color:#64748b;margin-bottom:2px">Formă parcelă (Kf)</div><select onchange="_ivupSetKf(this.value)" style="width:100%;background:#0b1426;color:#e2e8f0;border:1px solid rgba(255,255,255,.15);border-radius:6px;padding:5px;font-size:11px">' +
      [['regulata', 'Regulată (1,00)'], ['trapez', 'Trapez (0,92)'], ['neregulata', 'Neregulată (0,85)'], ['unghi_mort', 'Unghi mort/drapel (0,70)']].map(function (o) { return '<option value="' + o[0] + '" ' + (st.kf === o[0] ? 'selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select></div>' +
      '<div style="flex:1"><div style="font-size:9px;color:#64748b;margin-bottom:2px">Rețele (Kr)</div><select onchange="_ivupSetKr(this.value)" style="width:100%;background:#0b1426;color:#e2e8f0;border:1px solid rgba(255,255,255,.15);border-radius:6px;padding:5px;font-size:11px">' +
      [['toate', 'Toate (1,00)'], ['fara_gaze', 'Fără gaze (0,95)'], ['fara_canal', 'Fără canal (0,90)'], ['fara_apa', 'Fără apă (0,82)'], ['fara_retele', 'Fără rețele (0,80)']].map(function (o) { return '<option value="' + o[0] + '" ' + (st.kr === o[0] ? 'selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select></div></div>' +
      '<div style="font-size:11px;font-weight:700;color:#cbd5e1;margin:6px 0 4px">✅ Factori pozitivi (auto-scor din proximitate OSM — ajustabil)</div>' + factHTML +
      '<div style="font-size:11px;font-weight:700;color:#f87171;margin:10px 0 4px">⛔ Restricții & penalizări (auto-detectate — ajustabil)</div>' + restrHTML +
      '<button onclick="_ivupExport()" style="width:100%;margin-top:14px;background:linear-gradient(180deg,#2563eb,#1d4ed8);color:#fff;border:0;border-radius:10px;padding:12px;font-weight:800;font-size:14px;cursor:pointer">📄 Exportă fișa iVU (PDF UrbanX)</button>' +
      '<div style="font-size:9px;color:#475569;margin-top:8px;line-height:1.4">Scorurile pozitive se calculează automat din distanțele reale la dotări (OpenStreetMap, rază 1,5 km). Coeficienții Ka/Kql provin din Nota UrbanX a UAT-ului. Document orientativ — nu substituie evaluarea ANEVAR.</div>' +
      '</div>';
    document.body.appendChild(div);
  };

  // ── EXPORT PDF — fișă completă pe standardul UrbanX ──────────────────────────
  IP.exportPDF = async function (st) {
    if (typeof _initStudyPdf !== 'function') { G.ss && G.ss('Motor PDF indisponibil'); return; }
    G.ss && G.ss('📄 Generez fișa iVU pe amplasament...');
    var r = st.result, P = st.P, ev = st.evidence;
    try {
      // Titlu fără token „iVU" (coperta îl ar uppercase → „IVU", inconsecvent). Brandul iVU
      // rămâne consecvent (litera mică) în subtitlu + scoruri + secțiuni.
      var d = _initStudyPdf('Fișă de Evaluare a Amplasamentului', 'iVU · Indice de Valoare Urbană pe amplasament', 8);
      var pdf = d.pdf, W = d.W, H = d.H;
      // copertă
      d.cover('iVU ' + r.iVU + '/100 (' + r.grade + ')', null, [
        ['iVU amplasament', r.iVU + '/100'], ['Calificativ', r.grade],
        ['Scor pozitiv S⁺', N(r.Splus, 1)], ['Penalizare P⁻', N(r.Pminus, 1)]
      ], r.iVU >= 45, 'iVU ' + r.grade);

      pdf.addPage(); var y = 20; d.hdr && d.hdr('Fișă de evaluare a amplasamentului', 2);
      y = d.sec('1. Amplasamentul evaluat', y);
      [['Identificator (CF/nr. cad.)', P.nrcad || '—'], ['Suprafață', P.area ? N(P.area) + ' mp' : '—'],
       ['Coordonate (centroid)', (P.lat != null ? N(P.lat, 5) + '°N, ' + N(P.lon, 5) + '°E' : '—')],
       ['UTR / zonă', (P.zone && P.zone.utrNr ? P.zone.utrNr : '—') + (P.zone && P.zone.code ? ' · ' + P.zone.code : '')],
       ['POT / CUT reglementat', (P.zone && P.zone.pot != null ? P.zone.pot + '% / ' + (P.zone.cut != null ? P.zone.cut : '—') : '—')]
      ].forEach(function (kv) { y = d.body((kv[0] + ': ') + kv[1], 16, y, W - 32, 9); });

      y = d.sec('2. Formula și scorul iVU', y);
      y = d.body('iVU = S⁺ × (1 − P⁻/100) × Kf × Kr × Ka × Kql, unde S⁺ = Σ(Vᵢ·Pᵢ)/ΣPᵢ × 100 (factori pozitivi 0–10, ponderi cu suma 100), iar P⁻ = Σ(amplitudine × severitate), plafonat la 80. Kf = forma parcelei, Kr = rețele edilitare, Ka = accesibilitatea UAT, Kql = calitatea vieții UAT (ambele din Nota UrbanX a localității).', 16, y, W - 32, 9);
      y = d.tblRow(['Componentă', 'Valoare', 'Contribuție'], y, true, [70, 50, 62]);
      y = d.tblRow(['S⁺ — scor pozitiv', N(r.Splus, 1) + '/100', 'bază'], y, false, [70, 50, 62]);
      y = d.tblRow(['P⁻ — penalizare restricții', N(r.Pminus, 1), '×(1−' + N(r.Pminus, 1) + '/100)'], y, false, [70, 50, 62]);
      y = d.tblRow(['Kf — formă parcelă', r.Kf.toFixed(2), st.kf], y, false, [70, 50, 62]);
      y = d.tblRow(['Kr — rețele edilitare', r.Kr.toFixed(2), st.kr], y, false, [70, 50, 62]);
      y = d.tblRow(['Ka — accesibilitate UAT', r.Ka.toFixed(2), 'din IVU UAT'], y, false, [70, 50, 62]);
      y = d.tblRow(['Kql — calitate viață UAT', r.Kql.toFixed(2), 'din IVU UAT'], y, false, [70, 50, 62]);
      y = d.tblRow(['iVU FINAL', r.iVU + '/100', r.grade], y, false, [70, 50, 62]);

      y = d.sec('3. Factori pozitivi (proximitate reală OSM)', y);
      var catRows = [];
      IP.FACTORI.forEach(function (g) {
        var gsum = 0, gp = 0;
        g.f.forEach(function (fc) {
          var v = st.vals[fc.id] != null ? st.vals[fc.id] : 5; gsum += v * fc.pond; gp += fc.pond;
          var e = ev[fc.id] || {}; var src = e.nearest != null ? ('~' + N(e.nearest) + ' m' + (e.count ? ', ' + e.count + ' POI' : '')) : (e.count != null ? (e.count + ' POI') : (e.note || 'estimare'));
          y = d.tblRow([fc.name + ' (' + fc.pond + '%)', v.toFixed(1) + '/10', src], y, false, [92, 30, 60]);
        });
        catRows.push([g.label.split(' ')[0], Math.round(gp ? gsum / gp * 10 : 50)]);
      });
      if (d.miniChart) y = d.miniChart(['Categorie', 'Scor'], catRows, 'Scor pe categorii (0–100)', y + 2);

      y = d.sec('4. Restricții și penalizări', y);
      var anyR = false;
      IP.RESTRICTII.forEach(function (rr) { var s = st.restr[rr.id]; if (s && s.activ) { anyR = true; y = d.tblRow([rr.name, '−' + rr.amp + ' (' + s.sev + ')', rr.legal], y, false, [92, 36, 54]); } });
      if (!anyR) y = d.body('Nu au fost identificate restricții active pe amplasament din sursele verificate (patrimoniu LMI, Natura 2000, risc seismic/inundabil). Restricțiile se confirmă prin Certificatul de Urbanism și avize.', 16, y, W - 32, 9);

      // hartă proximitate
      var shot = null;
      try {
        if (G._DocMapCaptures && G._DocMapCaptures.capturePOI && P.lat != null) {
          shot = await G._DocMapCaptures.capturePOI((G.TCI && G.TCI.cityKey), { lat: P.lat, lon: P.lon, radius: 800 });
          if (shot && shot.img) { y = d.sec('5. Hartă de proximitate (dotări OSM ~800 m)', y); var iw = W - 32, ih = Math.round(iw * 0.6); y = d.checkY ? d.checkY(y, ih + 8) : y; pdf.addImage(shot.img, 'JPEG', 16, y, iw, ih, '', 'FAST'); y += ih + 4; }
        }
      } catch (e) {}

      y = d.sec(((shot && shot.img) ? '6' : '5') + '. Interpretare și recomandări', y);
      var interp = r.iVU >= 65 ? 'Amplasament cu valoare urbană ridicată — accesibilitate și dotări bune, restricții reduse.' : r.iVU >= 45 ? 'Amplasament cu valoare urbană medie — potențial bun, cu unele limitări de proximitate sau restricții.' : 'Amplasament cu valoare urbană redusă — dotări la distanță și/sau restricții semnificative; necesită analiză atentă a fezabilității.';
      y = d.body(interp + ' Scorul reflectă proximitatea reală la dotări (OpenStreetMap), forma parcelei, rețelele edilitare, restricțiile aplicabile și contextul UAT (Nota UrbanX). Pentru valorificare, prioritizează factorii cu scor scăzut din tabelul de mai sus.', 16, y, W - 32, 9);

      if (d.sign) d.sign();
      var nm = (P.nrcad ? String(P.nrcad).replace(/[^\w]+/g, '_') : 'parcela');
      // localitatea = UAT-ul REAL al parcelei (d.uat din _initStudyPdf = getUATLabel), NU UAT-ul activ din panou
      var loc = (G._locSlug ? G._locSlug(d.uat || '') : ('' + (d.uat || '')).replace(/[^\w]+/g, '_')) || 'UAT';
      pdf.save('iVU_' + nm + '_' + loc + '.pdf');
      G.ss && G.ss('✅ Fișa iVU generată: ' + pdf.getNumberOfPages() + ' pagini (iVU ' + r.iVU + '/100 ' + r.grade + ')');
    } catch (err) { console.error('[IVUParcela PDF]', err); G.ss && G.ss('❌ Eroare PDF iVU: ' + (err.message || err).toString().slice(0, 80)); }
  };

  console.log('[IVUParcela UI] ✅ panou + export PDF iVU pe parcelă');
})(window);
