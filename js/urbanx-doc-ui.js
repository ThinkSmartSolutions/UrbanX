/* ============================================================================
 * UrbanX — UI MODUL DOCUMENTAȚII (js/urbanx-doc-ui.js)
 * Panou full-screen: formular pe secțiuni cu câmpuri MANUAL (albastru) /
 * SELECTABIL (bej) / CALCULAT-AUTOMAT (verde) + panou VALIDARE ÎN TIMP REAL
 * (UXDoc.valideaza) + „Pre-umple din AEDIS" (UXDoc.dateFromAEDIS) + avizatori +
 * selectare documente + Generează. Motorul: window.UXDoc (urbanx-doc-engine.js).
 * ========================================================================== */
(function (G) {
  'use strict';
  var D = {}; // starea formularului
  var AVIZATORI = ['ISU', 'DSP', 'APM', 'Apele Române', 'ANIF', 'Distribuitor gaze', 'Distribuitor electric', 'Transelectrica', 'Operator apă-canal', 'CFR', 'CNAIR', 'Consiliul Județean', 'Primăria (PUG/PUZ)', 'Patrimoniu/Cultură', 'ROMATSA', 'SRI', 'MApN', 'Orange', 'Vodafone', 'Digi/RCS-RDS', 'Telekom'];
  var DOCUMENTE = ['Memoriu general DTAC', 'Memoriu arhitectură', 'Memoriu rezistență', 'Memorii instalații (IT/IS/IE/IG/HVAC/ICT)', 'Scenariu securitate incendiu (P118)', 'Memorii avizatori', 'Deviz general HG 907', 'Devize pe obiect', 'Opis + Listă proiectanți', 'Referate verificatori', 'PCCVI + faze determinante', 'Recepție (HG 273/1994)', 'Gantt + grafic finanțare'];
  var STRUCT = { metalica: 'Metalică (Eurocod 3)', beton: 'Beton armat monolit', prefabricat: 'Beton prefabricat', lemn: 'Lemn CLT/glulam', zidarie: 'Zidărie portantă', lsf: 'LSF (structură ușoară)', mixt: 'Mixt metal-beton' };
  var INCALZIRE = { ct_gaz: 'CT gaz', pompa: 'Pompă de căldură', vrf: 'VRF', termoficare: 'Termoficare', electric: 'Electric', radiant: 'Radiant infraroșu' };
  var APA = { retea: 'Rețea publică', put: 'Puț forat', rezervor: 'Rezervor propriu' };

  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var C = { auto: 'background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.35)', manual: 'background:rgba(59,130,246,.10);border:1px solid rgba(59,130,246,.3)', select: 'background:rgba(234,179,8,.10);border:1px solid rgba(234,179,8,.3)' };
  var INP = 'width:100%;background:#0a1120;border:1px solid rgba(148,163,184,.25);border-radius:7px;color:#e6edf7;padding:7px 9px;font-size:12.5px;font-family:inherit;box-sizing:border-box';

  function openPanel() {
    if (!G.UXDoc) { if (G.ss) G.ss('Motorul de documentații nu e încărcat.'); return; }
    var ov = el('div', { id: 'uxdoc-ov', style: 'position:fixed;inset:0;background:#070c18;z-index:4000;overflow:auto;font-family:system-ui,-apple-system,sans-serif;color:#e6edf7' });
    var wrap = el('div', { style: 'max-width:1100px;margin:0 auto;padding:18px 16px 60px' });
    // header
    var head = el('div', { style: 'display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;background:#070c18;padding:8px 0 12px;z-index:5;border-bottom:1px solid rgba(148,163,184,.15)' });
    head.appendChild(el('div', null, '<div style="font-size:19px;font-weight:800;color:#8b5cf6">📑 Generator Documentații Tehnice</div><div style="font-size:11px;color:#94a3b8">Formular → validare live → avizatori → documente → ZIP (~80 documente autorizabile)</div>'));
    var hbtns = el('div', { style: 'display:flex;gap:8px' });
    var bAedis = el('button', { style: 'background:rgba(139,92,246,.2);color:#c4b5fd;border:1px solid rgba(139,92,246,.45);border-radius:8px;padding:8px 13px;font-size:12.5px;font-weight:600;cursor:pointer' }, '⚡ Pre-umple din AEDIS');
    var bX = el('button', { style: 'background:none;border:none;color:#94a3b8;font-size:22px;cursor:pointer' }, '✕'); bX.onclick = function () { ov.remove(); };
    hbtns.appendChild(bAedis); hbtns.appendChild(bX); head.appendChild(hbtns); wrap.appendChild(head);

    // legendă
    wrap.appendChild(el('div', { style: 'display:flex;gap:14px;font-size:10.5px;color:#94a3b8;margin:10px 0' },
      '<span><span style="display:inline-block;width:10px;height:10px;' + C.manual + ';border-radius:2px"></span> manual (din CU/proiect)</span>' +
      '<span><span style="display:inline-block;width:10px;height:10px;' + C.select + ';border-radius:2px"></span> selectabil</span>' +
      '<span><span style="display:inline-block;width:10px;height:10px;' + C.auto + ';border-radius:2px"></span> calculat automat</span>'));

    // layout: formular (stânga) + validare (dreapta sticky)
    var grid = el('div', { style: 'display:grid;grid-template-columns:1fr 320px;gap:16px;align-items:start' });
    var form = el('div', { id: 'uxdoc-form' });
    var side = el('div', { id: 'uxdoc-side', style: 'position:sticky;top:70px' });
    grid.appendChild(form); grid.appendChild(side); wrap.appendChild(grid);
    ov.appendChild(wrap); document.body.appendChild(ov);

    function fld(label, key, kind, opts) {
      kind = kind || 'manual'; var box = el('div', { style: (C[kind] || C.manual) + ';border-radius:8px;padding:7px 9px' });
      box.appendChild(el('div', { style: 'font-size:10px;text-transform:uppercase;letter-spacing:.4px;color:#94a3b8;margin-bottom:3px' }, label + (kind === 'auto' ? ' · auto' : '')));
      if (kind === 'auto') { var v = el('div', { id: 'auto-' + key, style: 'font-size:13px;font-weight:700;color:#86efac' }, opts && opts.val != null ? opts.val : '—'); box.appendChild(v); }
      else if (kind === 'select') { var sel = el('select', { style: INP }); (opts.options || []).forEach(function (o) { var op = el('option', { value: o[0] }, o[1]); if (D[key] === o[0]) op.setAttribute('selected', 'selected'); sel.appendChild(op); }); sel.onchange = function () { D[key] = sel.value; recalc(); }; if (!D[key] && opts.options && opts.options[0]) D[key] = opts.options[0][0]; box.appendChild(sel); }
      else { var inp = el('input', { type: opts && opts.type || 'text', placeholder: opts && opts.ph || '', style: INP }); if (D[key] != null) inp.value = D[key]; inp.oninput = function () { D[key] = opts && opts.type === 'number' ? (inp.value === '' ? '' : +inp.value) : inp.value; recalc(); }; box.appendChild(inp); }
      return box;
    }
    function section(nr, title, fields) {
      var s = el('div', { style: 'margin-bottom:16px' });
      s.appendChild(el('div', { style: 'font-size:13px;font-weight:700;color:#c4b5fd;margin-bottom:8px' }, '<span style="background:rgba(139,92,246,.2);border-radius:20px;padding:2px 9px;font-size:11px;margin-right:6px">' + nr + '</span>' + title));
      var g = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px' });
      fields.forEach(function (f) { g.appendChild(f); }); s.appendChild(g); return s;
    }

    function renderForm() {
      form.innerHTML = '';
      var fnOpts = Object.keys(G.UXDoc.FUNCTIUNI).map(function (k) { return [k, G.UXDoc.FUNCTIUNI[k].label]; });
      form.appendChild(section('1', 'Identificare proiect', [fld('Nume proiect', 'nume', 'manual'), fld('Beneficiar', 'beneficiar', 'manual'), fld('Proiectant', 'proiectant', 'manual')]));
      form.appendChild(section('2–3', 'Teren + Certificat de Urbanism', [fld('Nr. cadastral', 'nrcad', 'manual'), fld('UAT / localitate', 'uat', 'manual'), fld('Județ', 'judet', 'manual', { ph: 'ex: Iași' }), fld('Suprafață teren (mp)', 'Steren', 'manual', { type: 'number' }), fld('Nr. CU', 'nrCU', 'manual'), fld('POT max (%)', 'POT_max', 'manual', { type: 'number' }), fld('CUT max', 'CUT_max', 'manual', { type: 'number' }), fld('Aliniament/față min. (m)', 'retragere_fata_min', 'manual', { type: 'number' }), fld('Retragere laterală min. (m)', 'retragere_lateral_min', 'manual', { type: 'number' }), fld('Retragere spate min. (m)', 'retragere_spate_min', 'manual', { type: 'number' })]));
      form.appendChild(section('4–5', 'Construcție propusă', [
        fld('Funcțiune propusă', 'functiune', 'select', { options: fnOpts }),
        fld('Suprafață construită SC (mp)', 'Sc', 'manual', { type: 'number' }),
        fld('Suprafață desfășurată SD (mp)', 'Sd', 'manual', { type: 'number' }),
        fld('Niveluri supraterane', 'niv_supraterane', 'manual', { type: 'number', ph: 'ex: 1' }),
        fld('Înălțime coamă H (m)', 'H', 'manual', { type: 'number' }),
        fld('Aliniament/față propus (m)', 'retragere_fata', 'manual', { type: 'number' }),
        fld('Retragere laterală propusă (m)', 'retragere_lateral', 'manual', { type: 'number' }),
        fld('Retragere spate propusă (m)', 'retragere_spate', 'manual', { type: 'number' }),
        fld('Parcaje propuse', 'parcaje_propuse', 'manual', { type: 'number' }),
        fld('POT propus', 'POT', 'auto'), fld('CUT propus', 'CUT', 'auto'),
        fld('Parcaje necesare', 'parcaje_necesare', 'auto'), fld('Spații verzi min.', 'sv', 'auto')
      ]));
      form.appendChild(section('6–8', 'Structură + seism + climă', [
        fld('Tip structură', 'struct', 'select', { options: Object.keys(STRUCT).map(function (k) { return [k, STRUCT[k]]; }) }),
        fld('Ag seismic', 'ag', 'auto'), fld('Tc (colț spectru)', 'Tc', 'auto'),
        fld('Sk zăpadă (kN/m²)', 'sk', 'auto'), fld('Te iarnă (°C)', 'Te', 'auto')
      ]));
      form.appendChild(section('9–10', 'Instalații + PSI', [
        fld('Tip încălzire', 'incalzire', 'select', { options: Object.keys(INCALZIRE).map(function (k) { return [k, INCALZIRE[k]]; }) }),
        fld('Sursă apă / canalizare', 'apa', 'select', { options: Object.keys(APA).map(function (k) { return [k, APA[k]]; }) }),
        fld('Categorie pericol PSI', 'psi', 'select', { options: [['A', 'A'], ['B', 'B'], ['C', 'C'], ['D', 'D'], ['E', 'E']] }),
        fld('Sprinklere oblig.', 'sprinklere_oblig', 'auto'), fld('IDSI oblig.', 'idsi_oblig', 'auto'), fld('Lift oblig.', 'lift_oblig', 'auto')
      ]));
      // avizatori
      var sa = el('div', { style: 'margin-bottom:16px' }); sa.appendChild(el('div', { style: 'font-size:13px;font-weight:700;color:#c4b5fd;margin-bottom:8px' }, '<span style="background:rgba(139,92,246,.2);border-radius:20px;padding:2px 9px;font-size:11px;margin-right:6px">13</span>Avizatori (din CU)'));
      var ga = el('div', { style: 'display:grid;grid-template-columns:repeat(3,1fr);gap:5px' }); D._avize = D._avize || {};
      AVIZATORI.forEach(function (a) { var lab = el('label', { style: 'font-size:11px;color:#cbd5e1;display:flex;gap:5px;align-items:center;cursor:pointer' }); var cb = el('input', { type: 'checkbox' }); if (D._avize[a]) cb.setAttribute('checked', 'checked'); cb.onchange = function () { D._avize[a] = cb.checked; }; lab.appendChild(cb); lab.appendChild(el('span', null, a)); ga.appendChild(lab); }); sa.appendChild(ga); form.appendChild(sa);
      // documente
      var sd = el('div', { style: 'margin-bottom:16px' }); sd.appendChild(el('div', { style: 'font-size:13px;font-weight:700;color:#c4b5fd;margin-bottom:8px' }, '<span style="background:rgba(139,92,246,.2);border-radius:20px;padding:2px 9px;font-size:11px;margin-right:6px">15</span>Documente de generat'));
      var gd = el('div', { style: 'display:grid;grid-template-columns:repeat(2,1fr);gap:5px' }); D._docs = D._docs || {};
      DOCUMENTE.forEach(function (dc) { var lab = el('label', { style: 'font-size:11px;color:#cbd5e1;display:flex;gap:5px;align-items:center;cursor:pointer' }); var cb = el('input', { type: 'checkbox' }); if (D._docs[dc] !== false) { cb.setAttribute('checked', 'checked'); D._docs[dc] = true; } cb.onchange = function () { D._docs[dc] = cb.checked; }; lab.appendChild(cb); lab.appendChild(el('span', null, dc)); gd.appendChild(lab); }); sd.appendChild(gd); form.appendChild(sd);
      recalc();
    }

    function recalc() {
      var v = G.UXDoc.valideaza(D); var ac = v.calc;
      function setA(id, val) { var e = document.getElementById('auto-' + id); if (e) e.textContent = val; }
      setA('POT', (ac.POT || 0) + '%'); setA('CUT', ac.CUT || 0);
      setA('parcaje_necesare', ac.parcaje_necesare); setA('sv', ac.sv_min_pct + '% (' + (ac.sv_min_mp || 0).toLocaleString('ro-RO') + ' mp)');
      setA('ag', (ac.seismic.ag) + 'g' + (ac.seismic.estimat ? ' ~est' : '')); setA('Tc', ac.seismic.Tc + ' s');
      setA('sk', ac.clima.sk + ' kN/m²'); setA('Te', ac.clima.Te + ' °C');
      setA('sprinklere_oblig', ac.sprinklere_oblig ? 'DA' : 'nu'); setA('idsi_oblig', ac.idsi_oblig ? 'DA' : 'nu'); setA('lift_oblig', ac.lift_oblig ? 'DA' : 'nu');
      renderSide(v);
    }
    function renderSide(v) {
      side.innerHTML = '';
      var box = el('div', { style: 'background:#0b1220;border:1px solid rgba(148,163,184,.2);border-radius:12px;padding:14px' });
      box.appendChild(el('div', { style: 'font-size:13px;font-weight:700;color:#e6edf7;margin-bottom:8px' }, '⚠ Validare în timp real'));
      (v.checks || []).forEach(function (c) {
        var col = c.status === 'conform' ? '#34d399' : c.status === 'neconform' ? '#f87171' : '#fbbf24';
        var ico = c.status === 'conform' ? '✓' : c.status === 'neconform' ? '✗' : '⚠';
        box.appendChild(el('div', { style: 'font-size:11px;color:#cbd5e1;padding:5px 0;border-top:1px solid rgba(148,163,184,.08);line-height:1.4' }, '<span style="color:' + col + ';font-weight:700">' + ico + '</span> ' + c.text + (c.norma ? '<span style="color:#64748b"> · ' + c.norma + '</span>' : '')));
      });
      if (!v.checks.length) box.appendChild(el('div', { style: 'font-size:11.5px;color:#94a3b8' }, 'Completați suprafețele și POT/CUT max pentru validare.'));
      side.appendChild(box);
      var nDocs = Object.keys(D._docs || {}).filter(function (k) { return D._docs[k]; }).length;
      var gen = el('button', { style: 'width:100%;margin-top:12px;background:' + (v.ok ? '#8b5cf6' : 'rgba(139,92,246,.5)') + ';color:#fff;border:none;border-radius:9px;padding:12px;font-size:13px;font-weight:700;cursor:pointer' }, '📦 Generează ' + nDocs + ' documente (ZIP)' + (v.neconformitati ? ' · ' + v.neconformitati + ' neconf.' : ''));
      gen.onclick = function () { genereaza(v); }; side.appendChild(gen);
      side.appendChild(el('div', { style: 'font-size:9.5px;color:#64748b;margin-top:8px;line-height:1.4' }, 'DOCX + PDF. Datele din câmpurile verzi se calculează automat; neconformitățile se corectează înainte de depunere. Reutilizează studiile platformei (PSI/geotehnic/amplasament) fără duplicare.'));
    }

    bAedis.onclick = function () {
      var a = G.UXDoc.dateFromAEDIS();
      if (!a || !a.nrcad && !a.Steren) { if (G.ss) G.ss('Selectați o parcelă / generați un volum AEDIS mai întâi.'); }
      Object.keys(a).forEach(function (k) { if (k[0] !== '_') D[k] = a[k]; });
      renderForm();
      if (G.ss) G.ss('⚡ Formular pre-umplut din AEDIS (funcțiune, suprafețe, seismic, reguli UTR). Completați restul manual.');
    };
    function genereaza(v) {
      // Deleagă la docx-builder când e disponibil; altfel produce fișa de proiect + validare (PDF)
      if (G.UXDocBuilder && G.UXDocBuilder.genereazaDosar) { G.UXDocBuilder.genereazaDosar(D, v); return; }
      if (G._initStudyPdf) { _fisaValidarePDF(D, v); }
      else if (G.ss) G.ss('Generatorul de documente se inițializează.');
    }
    renderForm();
  }

  // Fișă proiect + validare (PDF) — livrabil imediat până e gata docx-builder-ul
  function _fisaValidarePDF(D, v) {
    var d = G._initStudyPdf('Fisa Proiect si Validare Conformitate', 'Modul documentații · pre-verificare', 4);
    var pdf = d.pdf, sec = d.sec, body = d.body, tblRow = d.tblRow, cover = d.cover, newPage = d.newPage;
    var fn = (G.UXDoc.FUNCTIUNI[D.functiune] || {}).label || D.functiune || '—';
    cover('Fișă de proiect și validare de conformitate\n(pre-verificare înainte de generarea dosarului complet)', null,
      [['Proiect', D.nume || '—'], ['Beneficiar', D.beneficiar || '—'], ['Funcțiune', fn], ['Nr. cadastral', D.nrcad || '—'], ['Neconformități', '' + v.neconformitati]], v.ok, v.ok ? 'Conform' : v.neconformitati + ' neconformități');
    var cy = newPage('VALIDARE CONFORMITATE', 2);
    cy = sec('INDICATORI CALCULAȚI', cy);
    cy = tblRow(['Indicator', 'Valoare'], cy, true, [90, 92]);
    [['POT propus', v.calc.POT + '%'], ['CUT propus', '' + v.calc.CUT], ['Parcaje necesare', '' + v.calc.parcaje_necesare], ['Spații verzi min.', v.calc.sv_min_pct + '% (' + v.calc.sv_min_mp + ' mp)'], ['Ag seismic', v.calc.seismic.ag + 'g'], ['Tc', v.calc.seismic.Tc + ' s'], ['Sk zăpadă', v.calc.clima.sk + ' kN/m²'], ['Te iarnă', v.calc.clima.Te + ' °C']].forEach(function (r) { cy = tblRow(r, cy, false, [90, 92]); });
    cy += 3; cy = sec('VERIFICĂRI', cy);
    cy = tblRow(['Stare', 'Verificare', 'Temei'], cy, true, [24, 96, 62]);
    v.checks.forEach(function (c) { cy = tblRow([c.status === 'conform' ? 'OK' : c.status === 'neconform' ? 'NU' : 'ATENȚIE', c.text, c.norma], cy, false, [24, 96, 62]); });
    cy += 3; body('Această fișă este pre-verificarea de conformitate. Dosarul complet (memorii, deviz, PSI, avize) se generează după corectarea neconformităților. Document orientativ UrbanX.', 14, cy);
    try { pdf.save('Fisa_Proiect_' + (D.nrcad || 'proiect') + '.pdf'); } catch (e) { pdf.save('Fisa_Proiect.pdf'); }
    if (G.ss) G.ss('✅ Fișă proiect + validare generată (' + v.neconformitati + ' neconformități).');
  }

  G.UXDoc = G.UXDoc || {}; G.UXDoc.openPanel = openPanel;
  console.log('[UXDoc] UI încărcat (window.UXDoc.openPanel)');
})(window);
