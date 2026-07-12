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
  // ── AUTOSAVE: proiectul se salvează automat în localStorage și se restaurează la redeschidere ──
  var _DKEY = 'uxdoc_draft_v1';
  function _saveDraft() { try { localStorage.setItem(_DKEY, JSON.stringify(D)); } catch (e) {} }
  function _restoreDraft() { try { var s = localStorage.getItem(_DKEY); if (s) { var o = JSON.parse(s); if (o && typeof o === 'object') { for (var k in o) if (o.hasOwnProperty(k)) D[k] = o[k]; return true; } } } catch (e) {} return false; }
  var AVIZATORI = ['ISU', 'DSP', 'APM', 'Apele Române', 'ANIF', 'Distribuitor gaze', 'Distribuitor electric', 'Transelectrica', 'Operator apă-canal', 'CFR', 'CNAIR', 'Consiliul Județean', 'Primăria (PUG/PUZ)', 'Patrimoniu/Cultură', 'ROMATSA', 'SRI', 'MApN', 'Orange', 'Vodafone', 'Digi/RCS-RDS', 'Telekom'];
  var DOCUMENTE = ['Borderou piese scrise și desenate', 'Program funcțional (breviar spații)', 'Memoriu general DTAC', 'Memoriu arhitectură', 'Memoriu rezistență', 'Memorii instalații (IT/IS/IE/IG/HVAC/ICT)', 'Scenariu securitate incendiu (P118)', 'Sistematizare verticală', 'Deviz general HG 907', 'Devize pe obiect', 'Opis + Listă proiectanți', 'Memoriu DTOE (organizare execuție)', 'Referate verificatori', 'PCCVI + faze determinante', 'Recepție (HG 273/1994)', 'Cartea tehnică a construcției', 'Gantt + grafic finanțare', 'Caiet de sarcini arhitectură (PTh)', 'Caiet de sarcini rezistență (PTh)', 'Caiet de sarcini instalații (PTh)', 'Liste de cantități / antemăsurători (PTh)', 'Documentație tehnică pentru autorizarea desființării (D.T.A.D.)'];
  // Documente CONDIȚIONATE de funcțiune (apar doar când sunt relevante) — nu în lista generică.
  var DOC_FUNCTIUNE = { 'Clădire mixtă — separări funcțiuni (P118)': ['cladire-mixta'], 'Studiu de fezabilitate energetică (SF)': ['parc-fotovoltaic', 'bess', 'statie-transformare'] };
  // Documente OPȚIONALE, neaplicabile majorității proiectelor — apar bifabile, dar NEBIFATE implicit
  // (D.T.A.D. se aplică doar cand proiectul include desfiintarea unei constructii existente, nu la
  // orice proiect nou) — spre deosebire de restul DOCUMENTE, care sunt bifate implicit.
  var DOC_OPTIONAL_OFF = { 'Documentație tehnică pentru autorizarea desființării (D.T.A.D.)': 1 };
  // Documente pe AVIZATOR — memoriul specific pt fiecare aviz din CU. Se generează din capitolul Avizatori,
  // când bifezi operatorul (Memorii avizatori = dosarul comun; cele de mai jos = memorii/documente specifice).
  var AVIZ_DOCS = [
    { key: 'Memorii avizatori', tie: null, hint: 'dosar + memoriu specific pt fiecare avizator bifat' },
    { key: 'Memoriu tehnic aviz de mediu (Ord. 863/2002)', tie: 'APM', hint: 'pentru avizul/acordul de mediu (APM)' },
    { key: 'Scoatere teren din circuitul agricol (Ord. 83/2018)', tie: null, hint: 'teren agricol extravilan (DADR/APIA)' },
    { key: 'DALI — construcție existentă / intervenție', tie: null, hint: 'doar la intervenții pe construcție existentă' }
  ];
  var FAZE = [['DTAC', 'D.T.A.C. — extras pentru autorizare'], ['PTh', 'P.Th. + D.E. — proiect complet de execuție (include extrasul DTAC)']];
  var STRUCT = { metalica: 'Metalică (Eurocod 3)', beton: 'Beton armat monolit', prefabricat: 'Beton prefabricat', lemn: 'Lemn CLT/glulam', zidarie: 'Zidărie portantă', lsf: 'LSF (structură ușoară)', mixt: 'Mixt metal-beton' };
  var INCALZIRE = { ct_gaz: 'CT gaz', pompa: 'Pompă de căldură', vrf: 'VRF', termoficare: 'Termoficare', electric: 'Electric', radiant: 'Radiant infraroșu' };
  var APA = { retea: 'Rețea publică', put: 'Puț forat', rezervor: 'Rezervor propriu' };

  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var C = { auto: 'background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.35)', manual: 'background:rgba(59,130,246,.10);border:1px solid rgba(59,130,246,.3)', select: 'background:rgba(234,179,8,.10);border:1px solid rgba(234,179,8,.3)' };
  var INP = 'width:100%;background:#0a1120;border:1px solid rgba(148,163,184,.25);border-radius:7px;color:#e6edf7;padding:7px 9px;font-size:12.5px;font-family:inherit;box-sizing:border-box';

  function ensureResponsiveCss() {
    if (document.getElementById('uxdoc-responsive-css')) return;
    var st = document.createElement('style'); st.id = 'uxdoc-responsive-css';
    st.textContent =
      '#uxdoc-wrap{max-width:1100px;margin:0 auto;padding:18px 16px 60px}' +
      '@media(max-width:820px){' +
      '  #uxdoc-grid{grid-template-columns:1fr !important}' +
      '  #uxdoc-side{position:static !important;top:auto !important;margin-top:14px}' +
      '  #uxdoc-head{flex-wrap:wrap;gap:8px}' +
      '  #uxdoc-hd-btns{flex-wrap:wrap;width:100%;justify-content:flex-start}' +
      '}' +
      '@media(max-width:600px){' +
      '  #uxdoc-wrap{padding:12px 10px 72px}' +
      '  #uxdoc-hd-btns button{padding:8px 10px !important;font-size:11.5px !important;flex:1 1 auto;min-height:40px}' +
      '  #uxdoc-ov select,#uxdoc-ov input{font-size:16px !important}' + /* >=16px evita zoom auto iOS */
      '}';
    document.head.appendChild(st);
  }

  function openPanel() {
    if (!G.UXDoc) { if (G.ss) G.ss('Motorul de documentații nu e încărcat.'); return; }
    ensureResponsiveCss();
    var ov = el('div', { id: 'uxdoc-ov', style: 'position:fixed;inset:0;background:#070c18;z-index:4000;overflow:auto;font-family:system-ui,-apple-system,sans-serif;color:#e6edf7;-webkit-overflow-scrolling:touch' });
    var wrap = el('div', { id: 'uxdoc-wrap' });
    // header
    var head = el('div', { id: 'uxdoc-head', style: 'display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;background:#070c18;padding:8px 0 12px;z-index:5;border-bottom:1px solid rgba(148,163,184,.15)' });
    head.appendChild(el('div', null, '<div style="font-size:19px;font-weight:800;color:#8b5cf6">📑 Generator Documentații Tehnice</div><div style="font-size:11px;color:#94a3b8">Formular → validare live → avizatori → documente → ZIP (~80 documente autorizabile)</div>'));
    var hbtns = el('div', { id: 'uxdoc-hd-btns', style: 'display:flex;gap:8px' });
    var bImp = el('button', { style: 'background:rgba(59,130,246,.18);color:#93c5fd;border:1px solid rgba(59,130,246,.45);border-radius:8px;padding:8px 13px;font-size:12.5px;font-weight:700;cursor:pointer' }, '📥 Import documente');
    bImp.onclick = function () { if (G.UXIngest) G.UXIngest.open(D, function () { renderForm(); recalc(); }); else if (G.ss) G.ss('Modulul de import nu e încărcat.'); };
    var bProg = el('button', { style: 'background:rgba(52,211,153,.18);color:#6ee7b7;border:1px solid rgba(52,211,153,.45);border-radius:8px;padding:8px 13px;font-size:12.5px;font-weight:700;cursor:pointer' }, '🧩 Program funcțional');
    bProg.onclick = function () { if (G.UXSpaceUI) G.UXSpaceUI.open(D, function () { recalc(); renderForm(); }); else if (G.ss) G.ss('Modulul program funcțional nu e încărcat.'); };
    var bVer = el('button', { style: 'background:rgba(251,191,36,.16);color:#fbbf24;border:1px solid rgba(251,191,36,.4);border-radius:8px;padding:8px 13px;font-size:12.5px;font-weight:700;cursor:pointer' }, '💾 Versiuni');
    bVer.onclick = function () { if (G.UXVersion) G.UXVersion.open(D, function (data) { for (var k in D) { if (D.hasOwnProperty(k)) delete D[k]; } for (var k2 in data) D[k2] = data[k2]; renderForm(); recalc(); }); else if (G.ss) G.ss('Modulul versiuni nu e încărcat.'); };
    var bAedis = el('button', { style: 'background:rgba(139,92,246,.2);color:#c4b5fd;border:1px solid rgba(139,92,246,.45);border-radius:8px;padding:8px 13px;font-size:12.5px;font-weight:600;cursor:pointer' }, '⚡ Pre-umple din AEDIS');
    var bNorm = el('button', { style: 'background:rgba(56,189,248,.16);color:#7dd3fc;border:1px solid rgba(56,189,248,.4);border-radius:8px;padding:8px 13px;font-size:12.5px;font-weight:700;cursor:pointer' }, '📚 Normative la zi');
    bNorm.onclick = function () { if (G._NormativeRegistry) G._NormativeRegistry.openPanel(); else if (G.ss) G.ss('Registrul de normative nu e încărcat.'); };
    var bChk = el('button', { style: 'background:rgba(52,211,153,.16);color:#6ee7b7;border:1px solid rgba(52,211,153,.4);border-radius:8px;padding:8px 13px;font-size:12.5px;font-weight:700;cursor:pointer' }, '✅ Verifică conformitatea');
    bChk.onclick = function () { if (G.UX_COMPLIANCE) G.UX_COMPLIANCE.openReport(D); else if (G.ss) G.ss('Motorul de conformitate nu e încărcat.'); };
    var bPl = el('button', { style: 'background:rgba(125,211,252,.16);color:#7dd3fc;border:1px solid rgba(125,211,252,.4);border-radius:8px;padding:8px 13px;font-size:12.5px;font-weight:700;cursor:pointer' }, '📐 Generează planșe');
    bPl.onclick = function () { if (G.UXPlanseUI) G.UXPlanseUI.open(D); else if (G.ss) G.ss('Motorul de planșe nu e încărcat.'); };
    var bSSI = el('button', { style: 'background:rgba(239,68,68,.18);color:#fca5a5;border:1px solid rgba(239,68,68,.4);border-radius:8px;padding:8px 13px;font-size:12.5px;font-weight:700;cursor:pointer' }, '🔥 Scenariu SSI');
    bSSI.onclick = function () { if (G.SSI_UI) G.SSI_UI.open(); else if (G.ss) G.ss('Motorul SSI nu e încărcat.'); };
    var bX = el('button', { style: 'background:none;border:none;color:#94a3b8;font-size:22px;cursor:pointer' }, '✕'); bX.onclick = function () { ov.remove(); };
    hbtns.appendChild(bImp); hbtns.appendChild(bProg); hbtns.appendChild(bVer); hbtns.appendChild(bAedis); hbtns.appendChild(bNorm); hbtns.appendChild(bChk); hbtns.appendChild(bPl); hbtns.appendChild(bSSI); hbtns.appendChild(bX); head.appendChild(hbtns); wrap.appendChild(head);

    // legendă
    wrap.appendChild(el('div', { style: 'display:flex;gap:14px;font-size:10.5px;color:#94a3b8;margin:10px 0' },
      '<span><span style="display:inline-block;width:10px;height:10px;' + C.manual + ';border-radius:2px"></span> manual (din CU/proiect)</span>' +
      '<span><span style="display:inline-block;width:10px;height:10px;' + C.select + ';border-radius:2px"></span> selectabil</span>' +
      '<span><span style="display:inline-block;width:10px;height:10px;' + C.auto + ';border-radius:2px"></span> calculat automat</span>'));

    // layout: formular (stânga) + validare (dreapta sticky)
    var grid = el('div', { id: 'uxdoc-grid', style: 'display:grid;grid-template-columns:1fr 320px;gap:16px;align-items:start' });
    var form = el('div', { id: 'uxdoc-form' });
    var side = el('div', { id: 'uxdoc-side', style: 'position:sticky;top:70px' });
    grid.appendChild(form); grid.appendChild(side); wrap.appendChild(grid);
    ov.appendChild(wrap); document.body.appendChild(ov);

    function fld(label, key, kind, opts) {
      kind = kind || 'manual'; var box = el('div', { style: (C[kind] || C.manual) + ';border-radius:8px;padding:7px 9px' });
      box.appendChild(el('div', { style: 'font-size:10px;text-transform:uppercase;letter-spacing:.4px;color:#94a3b8;margin-bottom:3px' }, label + (kind === 'auto' ? ' · auto' : '')));
      if (kind === 'auto') { var v = el('div', { id: 'auto-' + key, style: 'font-size:13px;font-weight:700;color:#86efac' }, opts && opts.val != null ? opts.val : '—'); box.appendChild(v); }
      else if (kind === 'select') { var sel = el('select', { style: INP }); (opts.options || []).forEach(function (o) { var op = el('option', { value: o[0] }, o[1]); if (D[key] === o[0]) op.setAttribute('selected', 'selected'); sel.appendChild(op); }); sel.onchange = function () { D[key] = sel.value; if (key === 'faza' || key === 'functiune') renderForm(); else recalc(); }; if (!D[key] && opts.options && opts.options[0]) D[key] = opts.options[0][0]; box.appendChild(sel); }
      else { var inp = el('input', { id: 'fld-' + key, type: opts && opts.type || 'text', placeholder: opts && opts.ph || '', style: INP }); if (D[key] != null) inp.value = D[key]; inp.oninput = function () { D[key] = opts && opts.type === 'number' ? (inp.value === '' ? '' : +inp.value) : inp.value; D['__auto_' + key] = false; recalc(); }; box.appendChild(inp); }
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
      if (!D.faza) D.faza = 'DTAC';
      // ── DASHBOARD ADAPTIV: arată doar câmpurile relevante profilului funcțiunii ──
      var PROFIL = (G.UXDoc.profilFor ? G.UXDoc.profilFor(D.functiune) : 'cladire');
      // Toate câmpurile de GEOMETRIE DE CLĂDIRE (nu se aplică la energie / infrastructură).
      var _bldHide = ('POT_max CUT_max H_max niv_max retragere_fata_min retragere_lateral_min retragere_spate_min ' +
        'Sc Sd Su arii_calc niv_supraterane n_subsol demisol mezanin etaj_tehnic penthouse regim_complet H ' +
        'retragere_fata retragere_lateral retragere_spate parcaje_propuse POT CUT parcaje_necesare incalzire apa').split(' ');
      function _set(arr) { var o = {}; arr.forEach(function (k) { o[k] = 1; }); return o; }
      var HIDE = {
        energie: _set(_bldHide),                          // parc FV: fără geometrie de clădire; păstrează spații verzi + seism + PSI
        infrastructura: _set(_bldHide.concat(['sv'])),    // pod/drum: fără geometrie de clădire, fără spații verzi
        cladire: {}
      };
      function vis(k) { return !(HIDE[PROFIL] || {})[k]; }
      function gf(label, key, kind, opts) { return vis(key) ? fld(label, key, kind, opts) : null; }
      if (PROFIL !== 'cladire') {
        var noteTxt = PROFIL === 'energie'
          ? 'Funcțiune de tip ENERGIE (parc fotovoltaic / BESS): NU se aplică POT/CUT, aliniament sau regim de înălțime de clădire. Retragerile și distanțele minime (drum, LEA, gaze, ape, pădure) sunt impuse de avize și coduri — platforma le furnizează automat în memorii, nu le completezi aici. Dimensionarea pornește de la puterea instalată SAU de la suprafața terenului (bidirecțional).'
          : 'Funcțiune de tip INFRASTRUCTURĂ (pod / drum): NU se aplică gaze, apă din rețea, încălzire, niveluri sau POT/CUT de clădire. Parametrii relevanți sunt cei tehnici specifici (deschideri, clasă de încărcare, lungime, lățime).';
        form.appendChild(el('div', { style: 'background:rgba(59,130,246,.12);border:1px solid rgba(59,130,246,.3);border-radius:9px;padding:10px 12px;margin-bottom:14px;font-size:11.5px;color:#93c5fd;line-height:1.5' }, 'ℹ️ ' + noteTxt));
      }
      form.appendChild(section('1', 'Identificare proiect', [fld('Nume proiect', 'nume', 'manual'), fld('Beneficiar', 'beneficiar', 'manual'), fld('Proiectant', 'proiectant', 'manual'), fld('Faza de proiectare', 'faza', 'select', { options: FAZE })]));
      form.appendChild(section('2–3', 'Teren + Certificat de Urbanism', [fld('Nr. cadastral', 'nrcad', 'manual'), fld('UAT / localitate', 'uat', 'manual'), fld('Județ', 'judet', 'manual', { ph: 'ex: Iași' }), fld('Suprafață teren (mp)', 'Steren', 'manual', { type: 'number' }), fld('Nr. CU', 'nrCU', 'manual'), gf('POT max (%)', 'POT_max', 'manual', { type: 'number' }), gf('CUT max', 'CUT_max', 'manual', { type: 'number' }), gf('Înălțime max din CU (m)', 'H_max', 'manual', { type: 'number', ph: 'ex: 10' }), gf('Nr. max niveluri (CU)', 'niv_max', 'manual', { type: 'number', ph: 'ex: 2' }), gf('Aliniament/față min. (m)', 'retragere_fata_min', 'manual', { type: 'number' }), gf('Retragere laterală min. (m)', 'retragere_lateral_min', 'manual', { type: 'number' }), gf('Retragere spate min. (m)', 'retragere_spate_min', 'manual', { type: 'number' })].filter(Boolean)));
      var _isEnergie = (D.functiune === 'parc-fotovoltaic'); // câmpurile de putere/montaj FV doar la parc fotovoltaic
      form.appendChild(section('4–5', 'Construcție propusă', [
        fld('Funcțiune propusă', 'functiune', 'select', { options: fnOpts })
      ].concat(_isEnergie ? [
        fld('⚡ Putere instalată (kWp DC)', 'putere_kwp', 'manual', { type: 'number', ph: 'ex: 2000 — SAU lasă gol + pune Steren pt calcul invers' }),
        fld('Tip montaj', 'montaj', 'select', { options: [['fix', 'Suporți ficși (fixed-tilt)'], ['tracker_1ax', 'Trackere 1 axă (motorizate)'], ['tracker_2ax', 'Trackere 2 axe (motorizate)']] }),
        fld('Putere modul (Wp)', 'putere_modul_wp', 'manual', { type: 'number', ph: '555' }),
        fld('Raport DC/AC (ILR)', 'ilr', 'manual', { type: 'number', ph: '1.25' }),
        fld('→ Putere DC rezultată', 'energie_dc', 'auto'),
        fld('→ Putere AC', 'energie_ac', 'auto'),
        fld('→ Nr. module', 'energie_module', 'auto'),
        fld('→ Teren necesar', 'energie_teren', 'auto'),
        fld('→ Producție anuală', 'energie_prod', 'auto'),
        fld('→ Densitate', 'energie_densitate', 'auto'),
        fld('CAPEX (EUR/kWp)', 'capex_kwp', 'manual', { type: 'number', ph: '700' }),
        fld('Preț energie (EUR/MWh)', 'pret_energie_mwh', 'manual', { type: 'number', ph: '90' })
      ] : []).concat([
        gf('Suprafață construită SC (mp)', 'Sc', 'manual', { type: 'number' }),
        gf('Suprafață desfășurată SD (mp)', 'Sd', 'manual', { type: 'number' }),
        gf('Suprafață utilă SU (mp)', 'Su', 'manual', { type: 'number', ph: 'auto din SD dacă e gol' }),
        gf('→ SU · SD · SC (reconciliat)', 'arii_calc', 'auto'),
        gf('Niveluri supraterane (P+etaje)', 'niv_supraterane', 'manual', { type: 'number', ph: 'ex: 1 = P; 5 = P+4' }),
        gf('Subsoluri (nr.)', 'n_subsol', 'manual', { type: 'number', ph: '0' }),
        gf('Demisol', 'demisol', 'select', { options: [['', 'Nu'], ['1', 'Da']] }),
        gf('Mezanin', 'mezanin', 'select', { options: [['', 'Nu'], ['1', 'Da']] }),
        gf('Etaj tehnic', 'etaj_tehnic', 'select', { options: [['', 'Nu'], ['1', 'Da']] }),
        gf('Penthouse', 'penthouse', 'select', { options: [['', 'Nu'], ['1', 'Da']] }),
        gf('→ Regim complet', 'regim_complet', 'auto'),
        gf('Înălțime coamă H (m)', 'H', 'manual', { type: 'number' }),
        gf('Aliniament/față propus (m)', 'retragere_fata', 'manual', { type: 'number' }),
        gf('Retragere laterală propusă (m)', 'retragere_lateral', 'manual', { type: 'number' }),
        gf('Retragere spate propusă (m)', 'retragere_spate', 'manual', { type: 'number' }),
        gf('Parcaje propuse', 'parcaje_propuse', 'manual', { type: 'number' }),
        gf('POT propus', 'POT', 'auto'), gf('CUT propus', 'CUT', 'auto'),
        gf('Parcaje necesare', 'parcaje_necesare', 'auto'), gf('Spații verzi min.', 'sv', 'auto')
      ].filter(Boolean))));
      // Multi-corp (opțional): doar la clădiri (nu are sens la parc FV / pod)
      if (PROFIL === 'cladire') (function () {
        var sc = el('div', { style: 'margin-bottom:16px' });
        sc.appendChild(el('div', { style: 'font-size:13px;font-weight:700;color:#c4b5fd;margin-bottom:8px' }, '<span style="background:rgba(139,92,246,.2);border-radius:20px;padding:2px 9px;font-size:11px;margin-right:6px">5b</span>Corpuri (multi-corp) — opțional'));
        var list = el('div', { id: 'uxdoc-corpuri' });
        D.corpuri = D.corpuri || [];
        function renderC() {
          list.innerHTML = '';
          D.corpuri.forEach(function (c, idx) {
            var row = el('div', { style: 'display:grid;grid-template-columns:1.2fr 1.5fr 1fr 0.9fr 0.9fr 28px;gap:6px;margin-bottom:5px;align-items:center' });
            function inp(key, ph, num) { var i2 = el('input', { placeholder: ph, style: INP + ';padding:5px 7px;font-size:11.5px' }); if (c[key] != null) i2.value = c[key]; i2.oninput = function () { c[key] = num ? (i2.value === '' ? '' : +i2.value) : i2.value; recalc(); }; return i2; }
            row.appendChild(inp('nume', 'C' + (idx + 1))); row.appendChild(inp('functiune', 'funcțiune')); row.appendChild(inp('regim', 'regim ex P+1')); row.appendChild(inp('Sc', 'Sc', 1)); row.appendChild(inp('Sd', 'Sd', 1));
            var del = el('button', { style: 'background:none;border:none;color:#f87171;cursor:pointer;font-size:15px' }, '✕'); del.onclick = function () { D.corpuri.splice(idx, 1); renderC(); recalc(); }; row.appendChild(del);
            list.appendChild(row);
          });
          var add = el('button', { style: 'margin-top:6px;background:rgba(148,163,184,.15);color:#cbd5e1;border:1px dashed rgba(148,163,184,.4);border-radius:7px;padding:6px 12px;font-size:12px;cursor:pointer' }, '+ Adaugă corp');
          add.onclick = function () { D.corpuri.push({ nume: 'C' + (D.corpuri.length + 1), functiune: '', regim: '', Sc: '', Sd: '' }); renderC(); recalc(); };
          list.appendChild(add);
        }
        renderC(); sc.appendChild(list); form.appendChild(sc);
      })();
      form.appendChild(section('6–8', 'Structură + seism + climă', [
        fld('Tip structură', 'struct', 'select', { options: Object.keys(STRUCT).map(function (k) { return [k, STRUCT[k]]; }) }),
        fld('Categorie importanță (HG 766/1997)', 'categorie_importanta', 'auto'),
        fld('Clasă importanță seismică (P100-1)', 'clasa_importanta', 'auto'),
        fld('Factor importanță γI', 'gamma_I', 'auto'),
        fld('Ag seismic', 'ag', 'auto'), fld('Tc (colț spectru)', 'Tc', 'auto'),
        fld('Factor comportare q', 'factor_q', 'auto'),
        fld('Sk zăpadă (kN/m²)', 'sk', 'auto'), fld('Te iarnă (°C)', 'Te', 'auto'),
        fld('Adâncime îngheț (STAS 6054)', 'adancime_inghet', 'auto')
      ]));
      form.appendChild(section('9–10', 'Instalații + PSI (parametri derivați compleți)', [
        gf('Tip încălzire', 'incalzire', 'select', { options: Object.keys(INCALZIRE).map(function (k) { return [k, INCALZIRE[k]]; }) }),
        gf('Sursă apă / canalizare', 'apa', 'select', { options: Object.keys(APA).map(function (k) { return [k, APA[k]]; }) }),
        fld('Categorie pericol PSI', 'psi', 'auto'),
        fld('Risc de incendiu', 'risc_incendiu', 'auto'),
        fld('Grad rezistență la foc (P118)', 'grad_rf', 'auto'),
        fld('Densitate sarcină termică', 'sarcina_termica', 'auto'),
        fld('Arie max compartiment (mp)', 'arie_compartiment', 'auto'),
        fld('Nr. compartimente incendiu', 'nr_compartimente', 'auto'),
        fld('Distanță evacuare 2 sensuri (m)', 'dist_evac2', 'auto'),
        fld('Distanță evacuare fund sac (m)', 'dist_evacfs', 'auto'),
        fld('Hidranți interiori', 'hidranti_int', 'auto'),
        fld('Hidranți exteriori', 'hidranti_ext', 'auto'),
        fld('Rezervă apă incendiu (mc)', 'rezerva_incendiu', 'auto'),
        fld('Desfumare oblig.', 'desfumare_oblig', 'auto'),
        fld('Sprinklere oblig.', 'sprinklere_oblig', 'auto'), fld('IDSI oblig.', 'idsi_oblig', 'auto'), fld('Lift oblig.', 'lift_oblig', 'auto')
      ].filter(Boolean)));
      // avizatori
      var sa = el('div', { style: 'margin-bottom:16px' }); sa.appendChild(el('div', { style: 'font-size:13px;font-weight:700;color:#c4b5fd;margin-bottom:8px' }, '<span style="background:rgba(139,92,246,.2);border-radius:20px;padding:2px 9px;font-size:11px;margin-right:6px">13</span>Avizatori (din CU)'));
      var ga = el('div', { style: 'display:grid;grid-template-columns:repeat(3,1fr);gap:5px' }); D._avize = D._avize || {};
      D._docs = D._docs || {};
      AVIZATORI.forEach(function (a) { var lab = el('label', { style: 'font-size:11px;color:#cbd5e1;display:flex;gap:5px;align-items:center;cursor:pointer' }); var cb = el('input', { type: 'checkbox' }); if (D._avize[a]) cb.setAttribute('checked', 'checked'); cb.onchange = function () { D._avize[a] = cb.checked; }; lab.appendChild(cb); lab.appendChild(el('span', null, a)); ga.appendChild(lab); }); sa.appendChild(ga);
      // Documente specifice pe avizator — bifezi operatorul mai sus, generezi memoriul specific aici.
      sa.appendChild(el('div', { style: 'font-size:11px;color:#94a3b8;margin:10px 0 5px;font-weight:600' }, 'Memorii / documente specifice pe avizator (din CU):'));
      var gav = el('div', { style: 'display:grid;grid-template-columns:1fr;gap:4px' });
      AVIZ_DOCS.forEach(function (ad) {
        var lab = el('label', { style: 'font-size:11px;color:#cbd5e1;display:flex;gap:6px;align-items:flex-start;cursor:pointer' });
        var cb = el('input', { type: 'checkbox' }); if (D._docs[ad.key] === true) cb.setAttribute('checked', 'checked'); cb.onchange = function () { D._docs[ad.key] = cb.checked; };
        lab.appendChild(cb); lab.appendChild(el('span', null, ad.key + (ad.hint ? ' <span style="color:#64748b">— ' + ad.hint + '</span>' : '')));
        gav.appendChild(lab);
      });
      sa.appendChild(gav); form.appendChild(sa);
      // documente
      var sd = el('div', { style: 'margin-bottom:16px' }); sd.appendChild(el('div', { style: 'font-size:13px;font-weight:700;color:#c4b5fd;margin-bottom:8px' }, '<span style="background:rgba(139,92,246,.2);border-radius:20px;padding:2px 9px;font-size:11px;margin-right:6px">15</span>Documente de generat'));
      var gd = el('div', { style: 'display:grid;grid-template-columns:repeat(2,1fr);gap:5px' });
      var isPth = (D.faza === 'PTh' || D.faza === 'PTh+DE' || D.faza === 'PT');
      var pthOnly = { 'Caiet de sarcini arhitectură (PTh)': 1, 'Caiet de sarcini rezistență (PTh)': 1, 'Caiet de sarcini instalații (PTh)': 1, 'Liste de cantități / antemăsurători (PTh)': 1 };
      // lista efectivă = documente de bază + cele condiționate de funcțiunea curentă
      var docList = DOCUMENTE.slice();
      Object.keys(DOC_FUNCTIUNE).forEach(function (k) { if (DOC_FUNCTIUNE[k].indexOf(D.functiune) >= 0) docList.push(k); else D._docs[k] = false; });
      docList.forEach(function (dc) {
        if (pthOnly[dc] && !isPth) { D._docs[dc] = false; return; }
        if (DOC_OPTIONAL_OFF[dc] && D._docs[dc] === undefined) D._docs[dc] = false;
        var lab = el('label', { style: 'font-size:11px;color:' + (pthOnly[dc] ? '#a78bfa' : (DOC_OPTIONAL_OFF[dc] ? '#fca5a5' : '#cbd5e1')) + ';display:flex;gap:5px;align-items:center;cursor:pointer' });
        var cb = el('input', { type: 'checkbox' }); if (D._docs[dc] !== false) { cb.setAttribute('checked', 'checked'); D._docs[dc] = true; } cb.onchange = function () { D._docs[dc] = cb.checked; };
        lab.appendChild(cb); lab.appendChild(el('span', null, dc + (DOC_OPTIONAL_OFF[dc] ? ' <span style="color:#64748b">— doar dacă e cazul</span>' : '')));
        gd.appendChild(lab);
      }); sd.appendChild(gd); form.appendChild(sd);
      recalc();
    }

    function _prefillDinCU() {
      // Din Certificatul de Urbanism: POT/CUT max × teren → SC/SD max construibil (editabil).
      var st = +D.Steren || 0, potm = +D.POT_max || 0, cutm = +D.CUT_max || 0;
      var scMax = st && potm ? Math.round(st * potm / 100) : 0;
      var sdMax = st && cutm ? Math.round(st * cutm) : 0;
      function fill(key, val) {
        if (!(val > 0)) return;
        if (D[key] == null || D[key] === '' || D['__auto_' + key]) {
          D[key] = val; D['__auto_' + key] = true;
          var e = document.getElementById('fld-' + key);
          if (e && document.activeElement !== e) e.value = val;
        }
      }
      var nivm = +D.niv_max || 0, hmax = +D.H_max || 0;
      fill('Sc', scMax); fill('Sd', sdMax); fill('H', hmax);
      if (D.niv_supraterane == null || D.niv_supraterane === '' || D.__auto_niv_supraterane) {
        var derived = (+D.Sc > 0 && +D.Sd > 0) ? Math.max(1, Math.round((+D.Sd) / (+D.Sc))) : 0;
        var nivVal = nivm ? (derived ? Math.min(nivm, derived) : nivm) : derived; // plafonat la maximul din CU
        if (nivVal > 0) { D.niv_supraterane = nivVal; D.__auto_niv_supraterane = true; var en = document.getElementById('fld-niv_supraterane'); if (en && document.activeElement !== en) en.value = nivVal; }
      }
      return { scMax: scMax, sdMax: sdMax, nivm: nivm, hmax: hmax };
    }
    function recalc() {
      var _cu = _prefillDinCU();
      var v = G.UXDoc.valideaza(D); var ac = v.calc;
      function setA(id, val) { var e = document.getElementById('auto-' + id); if (e) e.textContent = val; }
      setA('POT', (ac.POT || 0) + '%'); setA('CUT', ac.CUT || 0);
      setA('arii_calc', 'SU ' + (ac.Su_total || 0).toLocaleString('ro-RO') + ' · SD ' + (ac.Sd_total || 0).toLocaleString('ro-RO') + ' · SC ' + (ac.Sc_total || 0).toLocaleString('ro-RO') + ' mp (SU/SD ' + (ac.su_coef || 0.8) + ')');
      setA('regim_complet', (ac.regim_complet || 'P') + ' · ' + (ac.niv_total || 1) + ' niveluri (' + (ac.niv_subterane || 0) + ' subterane)');
      setA('parcaje_necesare', ac.parcaje_necesare); setA('sv', ac.sv_min_pct + '% (' + (ac.sv_min_mp || 0).toLocaleString('ro-RO') + ' mp)');
      setA('ag', (ac.seismic.ag) + 'g' + (ac.seismic.estimat ? ' ~est' : '')); setA('Tc', ac.seismic.Tc + ' s');
      setA('sk', ac.clima.sk + ' kN/m²'); setA('Te', ac.clima.Te + ' °C');
      // structură — clasă/categorie/factori (P100-1, HG 766/1997)
      setA('categorie_importanta', ac.categorie_importanta || '—');
      setA('clasa_importanta', ac.clasa_importanta || '—');
      setA('gamma_I', 'γI = ' + (ac.gamma_I != null ? ac.gamma_I.toFixed(2) : '1.00'));
      setA('factor_q', 'q = ' + (ac.factor_q != null ? ac.factor_q.toFixed(1) : '3.0'));
      setA('adancime_inghet', (ac.adancime_inghet_m || 0.9).toFixed(2) + ' m (STAS 6054)');
      // PSI — set complet de parametri derivați (P118-1/2/3)
      setA('psi', 'Categoria ' + (ac.psi_default || 'C') + ' (din funcțiune)'); D.psi = ac.psi_default;
      setA('risc_incendiu', (ac.risc_incendiu || 'mediu').replace('foarte_mare', 'foarte mare'));
      setA('grad_rf', 'Gradul ' + (ac.grad_default || 'II') + ' rezistență la foc');
      setA('sarcina_termica', ac.sarcina_termica_note || '—');
      setA('arie_compartiment', (ac.arie_compartiment_max || 0).toLocaleString('ro-RO') + ' mp');
      setA('nr_compartimente', (ac.nr_compartimente || 1) + (ac.nr_compartimente > 1 ? ' compartimente' : ' compartiment'));
      setA('dist_evac2', (ac.dist_evacuare_2sensuri || 35) + ' m (flux ' + (ac.flux_evacuare_m || 0.6) + ' m)');
      setA('dist_evacfs', (ac.dist_evacuare_fundsac || 15) + ' m');
      setA('hidranti_int', ac.hidranti_int_oblig ? 'DA' : 'nu');
      setA('hidranti_ext', ac.hidranti_ext_oblig ? 'DA' : 'nu');
      setA('rezerva_incendiu', (ac.rezerva_incendiu_mc || 0) + ' mc');
      setA('desfumare_oblig', ac.desfumare_oblig ? 'DA' : 'nu');
      setA('sprinklere_oblig', ac.sprinklere_oblig ? 'DA' : 'nu'); setA('idsi_oblig', ac.idsi_oblig ? 'DA' : 'nu'); setA('lift_oblig', ac.lift_oblig ? 'DA' : 'nu');
      // ENERGIE / parc fotovoltaic — dimensionare bidirecțională live
      if (ac.energie) {
        var en = ac.energie; var inv = (en.directie || '').indexOf('teren→') === 0;
        var _declPeste = (!inv && en.putere_max_teren_kwp != null && (+D.Steren) > 0 && en.putere_dc_kwp > en.putere_max_teren_kwp * 1.02);
        setA('energie_dc', _declPeste
          ? ('⚠ declarat ' + (en.putere_dc_kwp || 0).toLocaleString('ro-RO') + ' kWp — pe ' + (en.teren_disponibil_mp || 0).toLocaleString('ro-RO') + ' m² încap max ' + (en.putere_max_teren_kwp || 0).toLocaleString('ro-RO') + ' kWp')
          : ((en.putere_dc_kwp || 0).toLocaleString('ro-RO') + ' kWp' + (inv ? ' (max pe terenul dat)' : '')));
        setA('energie_ac', (en.putere_ac_kva || 0).toLocaleString('ro-RO') + ' kVA (ILR ' + en.ilr + ')');
        setA('energie_module', (en.nr_module || 0).toLocaleString('ro-RO') + ' × ' + en.putere_modul_wp + ' Wp · ' + en.montaj_label);
        setA('energie_teren', (en.teren_necesar_mp || 0).toLocaleString('ro-RO') + ' mp (~' + en.teren_necesar_ha + ' ha)');
        setA('energie_prod', (en.productie_anuala_mwh || 0).toLocaleString('ro-RO') + ' MWh/an (' + en.yield_kwh_kwp + ' kWh/kWp)');
        setA('energie_densitate', (en.densitate_kwp_ha || 0).toLocaleString('ro-RO') + ' kWp/ha · ' + en.teren_per_mwp_ha + ' ha/MWp');
      }
      renderSide(v);
      _saveDraft();
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
      // Plafon din Certificatul de Urbanism (maxim construibil) — precompletat, editabil
      var st = +D.Steren || 0, potm = +D.POT_max || 0, cutm = +D.CUT_max || 0;
      if (st && (potm || cutm)) {
        var scMax = potm ? Math.round(st * potm / 100) : 0, sdMax = cutm ? Math.round(st * cutm) : 0;
        var cuBox = el('div', { style: 'background:rgba(139,92,246,.08);border:1px solid rgba(139,92,246,.3);border-radius:10px;padding:10px;margin-top:10px;font-size:11px;color:#cbd5e1' });
        cuBox.innerHTML = '<div style="font-weight:700;color:#c4b5fd;margin-bottom:4px">Plafon din CU (maxim construibil)</div>' +
          (scMax ? '<div>SC ≤ <b>' + scMax.toLocaleString('ro-RO') + '</b> mp (POT ' + potm + '% × ' + st.toLocaleString('ro-RO') + ')</div>' : '') +
          (sdMax ? '<div>SD ≤ <b>' + sdMax.toLocaleString('ro-RO') + '</b> mp (CUT ' + cutm + ' × ' + st.toLocaleString('ro-RO') + ')</div>' : '') +
          '<div style="color:#94a3b8;margin-top:4px">Precompletat cu maximul; editează în jos la ce proiectezi efectiv.</div>';
        side.appendChild(cuBox);
      }
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
    if (Object.keys(D).length === 0) { if (_restoreDraft() && G.ss) G.ss('↺ Proiect restaurat automat (salvat local). Poți continua de unde ai rămas.'); }
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
