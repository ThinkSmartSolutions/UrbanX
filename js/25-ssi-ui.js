/* ============================================================================
 * UrbanX — SSI: UI TIP LUCRARE + VECINĂTĂȚI + IMPORT DXF (js/25-ssi-ui.js)
 * Panou aditiv, independent de fluxul existent al generatorului de documente —
 * NU modifică UXDoc.openPanel/collectOpts, ci alimentează cascada M0-M17
 * (js/25-ssi-engine*.js) prin window._SSI_PENDING, preluat automat de
 * UXDocBuilder.genereazaDosar() înainte de generarea documentelor.
 *
 * Regula critică v2.1 #8: DWG-ul dă DOAR geometrie — destinația și gradul de
 * rezistență al vecinilor rămân input uman validat, afișat explicit aici.
 * Regula #10: variantă conservatoare (grad V) implicită dacă necunoscut.
 *
 * window.SSI_UI: openPanel() · getPending() · clearPending()
 * ========================================================================== */
(function (G) {
  'use strict';
  var D = document;

  var STATE = { tip_lucrare: null, vecinatati: [], geometrie_teren: null, elemente_structurale: [], pendingDxf: null, modFinal: false };

  var DESTINATII = ['locuinta', 'birou', 'comert', 'depozit', 'hala_productie', 'statie_transformare', 'skid_gpl', 'altele'];
  var GRADE = ['I', 'II', 'III', 'IV', 'V'];

  function _style() {
    if (D.getElementById('ssi-ui-style')) return;
    var s = D.createElement('style'); s.id = 'ssi-ui-style';
    s.textContent = [
      '#ssi-ui-modal{position:fixed;inset:0;z-index:9500;display:none;align-items:center;justify-content:center;background:rgba(6,10,20,.72);backdrop-filter:blur(4px)}',
      '#ssi-ui-modal.open{display:flex}',
      '.ssiui-box{width:min(900px,94vw);max-height:88vh;overflow-y:auto;background:#0b1424;border:1px solid rgba(239,68,68,.4);border-radius:14px;padding:20px 22px;color:#e6edf7;font-family:system-ui,sans-serif;box-shadow:0 20px 60px rgba(0,0,0,.6)}',
      '.ssiui-h{font-size:16px;font-weight:800;color:#f87171;margin-bottom:4px}',
      '.ssiui-sub{font-size:11px;color:#94a3b8;margin-bottom:14px}',
      '.ssiui-lbl{font-size:11px;color:#cbd5e1;font-weight:700;margin:10px 0 4px;text-transform:uppercase;letter-spacing:.04em}',
      '.ssiui-sel,.ssiui-inp{width:100%;background:#0f1a2e;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:7px;padding:7px 9px;font-size:13px}',
      '.ssiui-row{display:grid;grid-template-columns:1.4fr 1fr .7fr 1fr .8fr auto;gap:6px;align-items:end;margin-bottom:8px;padding:8px;background:rgba(255,255,255,.03);border-radius:8px}',
      '.ssiui-btn{background:rgba(239,68,68,.18);border:1px solid rgba(239,68,68,.4);color:#fca5a5;border-radius:7px;padding:8px 14px;cursor:pointer;font-size:12px;font-weight:700}',
      '.ssiui-btn.pri{background:rgba(34,197,94,.2);border-color:rgba(34,197,94,.45);color:#86efac}',
      '.ssiui-btn.sec{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.15);color:#cbd5e1}',
      '.ssiui-foot{display:flex;justify-content:space-between;margin-top:16px;gap:8px}',
      '.ssiui-note{font-size:10px;color:#fbbf24;background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.25);border-radius:7px;padding:8px 10px;margin:8px 0}'
    ].join('');
    D.head.appendChild(s);
  }

  function _optTip() {
    var T = (G.SSI_ENGINE && G.SSI_ENGINE.TIPURI_LUCRARE) || {};
    return Object.keys(T).map(function (k) { return '<option value="' + k + '"' + (STATE.tip_lucrare === k ? ' selected' : '') + '>' + T[k].label + '</option>'; }).join('');
  }

  function _sursaLabel(v) {
    if (v.sursa_distanta === 'harta_osm') return '📍 din hartă (OSM)';
    if (v.sursa_distanta === 'dwg') return '📐 din DXF';
    return '✏️ manual';
  }

  function _rowVecinatate(v, idx) {
    v = v || {};
    var estimatNeconfirmat = v.sursa_clasificare === 'estimare_conservatoare_neconfirmata' && !v.confirmat;
    return '<div class="ssiui-row" data-idx="' + idx + '"' + (estimatNeconfirmat ? ' style="border:1px solid rgba(251,191,36,.4)"' : '') + '>' +
      '<div><div class="ssiui-lbl">Destinație vecin</div><select class="ssiui-sel" onchange="SSI_UI._set(' + idx + ',\'destinatie_declarata\',this.value)">' +
      DESTINATII.map(function (d) { return '<option value="' + d + '"' + (v.destinatie_declarata === d ? ' selected' : '') + '>' + d.replace('_', ' ') + '</option>'; }).join('') + '</select></div>' +
      '<div><div class="ssiui-lbl">Grad rezistență</div><select class="ssiui-sel" onchange="SSI_UI._set(' + idx + ',\'grad_rezistenta_estimat\',this.value)">' +
      GRADE.map(function (g) { return '<option value="' + g + '"' + (v.grad_rezistenta_estimat === g ? ' selected' : '') + '>' + g + (g === 'V' ? ' (conservator)' : '') + '</option>'; }).join('') + '</select></div>' +
      '<div><div class="ssiui-lbl">Perete CF</div><select class="ssiui-sel" onchange="SSI_UI._set(' + idx + ',\'perete_CF_pe_fatada_comuna\',this.value===\'da\')"><option value="nu"' + (!v.perete_CF_pe_fatada_comuna ? ' selected' : '') + '>nu</option><option value="da"' + (v.perete_CF_pe_fatada_comuna ? ' selected' : '') + '>da</option></select></div>' +
      '<div><div class="ssiui-lbl">Distanță reală (m)</div><input class="ssiui-inp" type="number" step="0.1" value="' + (v.distanta_masurata_m != null ? v.distanta_masurata_m : '') + '" onchange="SSI_UI._set(' + idx + ',\'distanta_masurata_m\',parseFloat(this.value)||null)"></div>' +
      '<div style="font-size:9px;color:#64748b;line-height:1.3">' + _sursaLabel(v) + (v.detaliu_sursa ? '<br><span title="' + esc(v.detaliu_sursa) + '" style="cursor:help">ⓘ detaliu</span>' : '') + '</div>' +
      '<button class="ssiui-btn sec" onclick="SSI_UI._remove(' + idx + ')">✕</button>' +
      (estimatNeconfirmat ? '<label style="grid-column:1/-1;display:flex;gap:6px;align-items:center;font-size:10px;color:#fbbf24;margin-top:-4px">' +
        '<input type="checkbox" onchange="SSI_UI._confirmaVecinatate(' + idx + ', this.checked)"> Estimare conservatoare neconfirmată (grad V, risc mare) — bifează după ce verifici/corectezi (necesar pentru scenariul FINAL)</label>' : '') +
      '</div>';
  }

  function render() {
    var el = D.getElementById('ssi-ui-body'); if (!el) return;
    el.innerHTML =
      '<div class="ssiui-lbl">1.0 — Tip de lucrare (obligatoriu, decide tabelele P118-1/2025 aplicabile)</div>' +
      '<select class="ssiui-sel" onchange="SSI_UI._setTip(this.value)"><option value="">— selectează —</option>' + _optTip() + '</select>' +
      '<div class="ssiui-lbl" style="margin-top:18px">Import geometrie din DXF (opțional — export din CAD, format ASCII)</div>' +
      '<input type="file" accept=".dxf" class="ssiui-inp" onchange="SSI_UI._onFile(this.files[0])">' +
      '<div class="ssiui-note">⚠ DXF-ul dă DOAR geometrie (poligoane, distanțe măsurate) — destinația și gradul de rezistență al fiecărei vecinătăți rămân input uman validat de proiectant. Layere așteptate: LIMITA_PROPRIETATE, VECINATATI, CONSTRUCTIE_PROPUSA (sau echivalente).</div>' +
      renderMapareManuala() +
      '<div class="ssiui-lbl" style="margin-top:14px">3.3 — Vecinătăți (clasificare + distanțe minime, Tabelul 4/145)</div>' +
      '<div class="ssiui-note" style="border-color:rgba(52,211,153,.4);background:rgba(52,211,153,.08);color:#6ee7b7">📍 Recomandat: auto-detectează din harta platformei (clădiri OSM reale din jurul parcelei active) — se pre-completează cu estimare conservatoare (grad V, risc mare) + distanța reală calculată; tu doar confirmi sau corectezi, ca la o vizită de teren.</div>' +
      '<button class="ssiui-btn pri" onclick="SSI_UI._autoDetecteaza()" style="margin-bottom:10px">📍 Auto-detectează vecinătățile din hartă</button>' +
      STATE.vecinatati.map(function (v, i) { return _rowVecinatate(v, i); }).join('') +
      '<button class="ssiui-btn sec" onclick="SSI_UI._addVecinatate()">+ Adaugă vecinătate manual</button>' +
      '<div style="margin-top:16px;padding:10px;border-radius:8px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08)">' +
      '<label style="display:flex;gap:8px;align-items:center;font-size:12px;color:#e6edf7;cursor:pointer">' +
      '<input type="checkbox"' + (STATE.modFinal ? ' checked' : '') + ' onchange="SSI_UI._setModFinal(this.checked)"> ' +
      '<b>🔒 Generează ca FINAL</b> (pentru depunere la ISU — necesită toate vecinătățile confirmate; altfel se generează DRAFT, mereu disponibil)</label></div>';
  }

  function open() {
    _style();
    if (!D.getElementById('ssi-ui-modal')) {
      var m = D.createElement('div'); m.id = 'ssi-ui-modal';
      m.innerHTML = '<div class="ssiui-box">' +
        '<div class="ssiui-h">🔥 Scenariu SSI — Tip lucrare & Vecinătăți</div>' +
        '<div class="ssiui-sub">Ord. MAI 180/2022, Anexa 5 · P118-1/2025 — se completează înainte de generarea Scenariului de Securitate la Incendiu</div>' +
        '<div id="ssi-ui-body"></div>' +
        '<div class="ssiui-foot"><button class="ssiui-btn sec" onclick="SSI_UI._close()">Renunță</button><button class="ssiui-btn pri" onclick="SSI_UI._save()">Salvează pentru scenariu</button></div>' +
        '</div>';
      D.body.appendChild(m);
    }
    render();
    D.getElementById('ssi-ui-modal').classList.add('open');
  }
  function close() { var m = D.getElementById('ssi-ui-modal'); if (m) m.classList.remove('open'); }

  function _aplicaGeometrie(parsed, mapareFinala) {
    var geo = G.SSI_DWG_IMPORT.extractGeometrie(parsed, mapareFinala);
    STATE.geometrie_teren = geo;
    (geo.vecinatati_geometrie || []).forEach(function (vg) {
      STATE.vecinatati.push({ id: vg.id, distanta_masurata_m: vg.distanta_min_la_propriu_m, sursa_distanta: 'dwg', destinatie_declarata: null, grad_rezistenta_estimat: null, perete_CF_pe_fatada_comuna: false });
    });
    STATE.pendingDxf = null;
    render();
    if (G.ss) G.ss('DXF importat: ' + parsed.nrEntitati + ' entități, ' + (geo.vecinatati_geometrie || []).length + ' vecinătăți geometrice detectate — completează clasificarea (destinație/grad) manual pentru fiecare.');
  }

  var CATEGORII_LABEL = {
    limita_proprietate: 'Limită de proprietate', vecinatati: 'Vecinătăți (clădiri învecinate)',
    constructie_existenta: 'Construcție existentă', constructie_propusa: 'Construcție propusă',
    acces_auto_speciale: 'Acces autospeciale', cote_nivel: 'Cote de nivel'
  };

  // Layerele NU sunt standardizate in Romania (multe CAD-uri, ex. ArchiCAD, au denumiri proprii de tip
  // "055_EXT_Gard" sau "131_REF_Topo") — cand maparea automata esueaza, cerem mapare manuala explicita
  // (regula B.2/B.3 addendum v2.1), NU presupunem o corespondenta.
  function _rowMapareLayer(categorie, layereDisponibile, valoareCurenta) {
    var opts = '<option value="">— niciun layer / nu există —</option>' +
      layereDisponibile.map(function (l) { return '<option value="' + esc(l) + '"' + (l === valoareCurenta ? ' selected' : '') + '>' + esc(l) + '</option>'; }).join('');
    return '<div class="ssiui-row" style="grid-template-columns:1fr 2fr">' +
      '<div class="ssiui-lbl" style="margin:0">' + esc(CATEGORII_LABEL[categorie] || categorie) + '</div>' +
      '<select class="ssiui-sel" onchange="SSI_UI._setMapareLayer(\'' + categorie + '\', this.value)">' + opts + '</select>' +
      '</div>';
  }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function renderMapareManuala() {
    var pd = STATE.pendingDxf; if (!pd) return '';
    return '<div class="ssiui-note" style="border-color:rgba(56,189,248,.4);background:rgba(56,189,248,.08);color:#7dd3fc">' +
      'Layerele acestui DXF (' + pd.parsed.layers.length + ' găsite) nu corespund denumirilor standard așteptate — CAD-urile (ex. ArchiCAD) au propriile convenții. ' +
      'Alege manual, pentru fiecare categorie, layerul real din fișier care corespunde (sau lasă „niciun layer" dacă nu există în acest plan).</div>' +
      Object.keys(CATEGORII_LABEL).map(function (cat) { return _rowMapareLayer(cat, pd.parsed.layers, pd.mapareCurenta[cat]); }).join('') +
      '<button class="ssiui-btn pri" onclick="SSI_UI._confirmaMapare()">✓ Confirmă layerele și extrage geometria</button>';
  }

  async function onFile(file) {
    if (!file) return;
    var fmt = G.SSI_DWG_IMPORT.detectFormat(file);
    if (!fmt.ok) { if (G.ss) G.ss(fmt.mesaj); return; }
    try {
      var parsed = await G.SSI_DWG_IMPORT.parseDXFFile(file);
      var mapare = G.SSI_DWG_IMPORT.mapLayers(parsed);
      if (mapare.automata_completa) { _aplicaGeometrie(parsed, mapare); return; }
      // mapare partiala/esuata -> cerem confirmare/completare manuala explicita (NU presupunem)
      STATE.pendingDxf = { parsed: parsed, mapareCurenta: mapare.mapare };
      render();
      if (G.ss) G.ss('DXF citit (' + parsed.nrEntitati + ' entități, ' + parsed.layers.length + ' layere) — confirmă manual maparea layerelor mai jos.');
    } catch (e) { if (G.ss) G.ss('Eroare la citirea DXF: ' + e.message); }
  }

  G.SSI_UI = {
    open: open, getPending: function () { return STATE.tip_lucrare ? { tip_lucrare: STATE.tip_lucrare, _vecinatati: STATE.vecinatati, geometrie_teren: STATE.geometrie_teren, _elemente_structurale: STATE.elemente_structurale, _ssi_final_mode: STATE.modFinal } : null; },
    clearPending: function () { STATE = { tip_lucrare: null, vecinatati: [], geometrie_teren: null, elemente_structurale: [], pendingDxf: null, modFinal: false }; },
    _setModFinal: function (v) { STATE.modFinal = !!v; },
    _setTip: function (v) { STATE.tip_lucrare = v || null; },
    _addVecinatate: function () { STATE.vecinatati.push({ id: 'V' + (STATE.vecinatati.length + 1), sursa_distanta: 'manual' }); render(); },
    _remove: function (i) { STATE.vecinatati.splice(i, 1); render(); },
    _set: function (i, key, val) { if (STATE.vecinatati[i]) STATE.vecinatati[i][key] = val; },
    _setMapareLayer: function (categorie, layer) { if (STATE.pendingDxf) STATE.pendingDxf.mapareCurenta[categorie] = layer || null; },
    _confirmaMapare: function () {
      if (!STATE.pendingDxf) return;
      _aplicaGeometrie(STATE.pendingDxf.parsed, { mapare: STATE.pendingDxf.mapareCurenta });
    },
    _onFile: onFile, _close: close, _save: function () { close(); if (G.ss) G.ss('✅ Date SSI salvate — se vor include la generarea Scenariului de Securitate la Incendiu.'); },
    _confirmaVecinatate: function (i, checked) { if (STATE.vecinatati[i]) STATE.vecinatati[i].confirmat = !!checked; render(); },
    _autoDetecteaza: async function () {
      if (!G.SSI_MAP_VECINATATI) { if (G.ss) G.ss('Motorul de auto-detectare nu e încărcat.'); return; }
      if (G.ss) G.ss('📍 Se caută clădirile din jurul parcelei active…');
      var r = await G.SSI_MAP_VECINATATI.autoDetecteazaVecinatati();
      if (!r.ok) { if (G.ss) G.ss('⚠ ' + r.mesaj); return; }
      if (!r.nrDetectate) { if (G.ss) G.ss('Nicio clădire găsită în raza de detecție — adaugă vecinătățile manual.'); return; }
      r.vecinatati.forEach(function (v) { STATE.vecinatati.push(v); });
      render();
      if (G.ss) G.ss('📍 ' + r.nrDetectate + ' vecinătăți detectate din hartă (estimare conservatoare, grad V/risc mare) — verifică și corectează unde e cazul.');
    }
  };

  // Preia automat STATE in D la fiecare generare de dosar (aditiv — nu modifica genereazaDosar existent daca nu exista date SSI)
  function _patchGenerator() {
    if (!G.UXDocBuilder || G.UXDocBuilder.__ssiUiPatched) return;
    var orig = G.UXDocBuilder.genereazaDosar;
    G.UXDocBuilder.genereazaDosar = function (Dproj, v) {
      var pending = G.SSI_UI.getPending();
      if (pending) { Dproj.tip_lucrare = Dproj.tip_lucrare || pending.tip_lucrare; Dproj._vecinatati = Dproj._vecinatati || pending._vecinatati; Dproj._elemente_structurale = Dproj._elemente_structurale || pending._elemente_structurale; Dproj._ssi_final_mode = pending._ssi_final_mode; }
      return orig(Dproj, v);
    };
    G.UXDocBuilder.__ssiUiPatched = true;
  }
  var _iv = setInterval(function () { _patchGenerator(); if (G.UXDocBuilder && G.UXDocBuilder.__ssiUiPatched) clearInterval(_iv); }, 300);

  console.log('[SSI] UI tip_lucrare + vecinatati + import DXF incarcata (window.SSI_UI.open())');
})(window);
