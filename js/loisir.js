/* ============================================================================
 * UrbanX LOISIR — modul complet „spații de recreere & plămân verde urban".
 * NU este un raport — este un modul cu 5 funcții, conform cercetării (LOISIR.zip):
 *   1. CATALOG spații verzi (obligatoriu Legea 24/2007) — inventar + KPI mp/locuitor
 *   2. PROIECTARE ASISTATĂ parc — program spațial parametric din NORME (nu fabricat)
 *   3. 3D PARC — generator procedural Three.js (r128) din programul spațial
 *   4. CONCURS DE IDEI — brief + criterii + juriu (registru); portal public = Faza 2
 *   5. CLIMĂ / UHI — deleg către window.UHI (insulă de căldură, NbS)
 *
 * Ce rulează AICI (client-side, real): catalog, calculator program (norme),
 * estimare cost (benchmark RO 2024), recomandare specii native, 3D procedural,
 * brief PDF, punctaj juriu ponderat.
 * Ce e FAZA 2 (server): portal public de depunere + e-mail, asistent AI (Claude),
 * monitorizare satelit NDVI/LST (Copernicus), senzori IoT smart-park.
 *
 * window.Loisir: catalog · program · species · costEstimate · concurs · render3D
 *               · chapter · openPanel
 * Surse: Legea 24/2007 (art.7 — 26 mp/loc; art.11 — catalog) · EN 1176/1177/16630
 *  · NP 051/2012 (PMR) · SR EN 13201-2 · benchmark parcuri (Central Park, Tiergarten,
 *  Vondelpark, Villette, Gardens by the Bay, High Line, Superkilen).
 * ========================================================================== */
(function (G) {
  'use strict';

  // ── NORME de dimensionare (Legea 24/2007 + cercetare) — % din suprafața totală ──
  var ZONES = [
    { code: 'intrare',    name: 'Intrare și primire',           pct: 2,  mandatory: true,  elem: ['poartă marcată PMR', 'panou info + QR', 'rastel ≥10 biciclete', 'pubelă selectivă 3 fracții'] },
    { code: 'piazza',     name: 'Piazza / Esplanadă centrală',  pct: 12, min: 10, max: 15, mandatory: true, elem: ['pavaj permeabil', 'fântână arteziană/interactivă', 'pergole/umbrar ≥10%', 'spațiu evenimente 10×20m'], std: ['NP 051/2012'] },
    { code: 'promenada',  name: 'Promenadă principală (buclă)', pct: 8,  mandatory: true,  elem: ['lățime 3-4m', 'iluminat 25-30m', 'bănci la 150-200m', 'marcaj kilometric'], std: ['SR EN 13201-2', 'NP 051/2012'] },
    { code: 'gradina',    name: 'Grădină botanică / senzorială',pct: 8,  elem: ['specii native (Listă Roșie IUCN)', 'plante aromatice', 'etichetare QR/trilingvă', 'irigare prin picurare'] },
    { code: 'ape',        name: 'Spații de apă (biotop)',       pct: 10, min: 5, max: 15, elem: ['lac naturalizat / fântână', 'pasarelă PMR ≥2m', 'aerare biologică'] },
    { code: 'padure',     name: 'Pădure urbană',                pct: 30, min: 30, mandatory: true, elem: ['stejar/tei/frasin/arțar (native)', '≥1 arbore/25mp', 'strat arbustiv 3 specii', 'fără pesticide'] },
    { code: 'pajiste',    name: 'Pajiști / gazon',              pct: 18, min: 20, elem: ['pajiște naturală (nu tuns ras)'] },
    { code: 'servicii',   name: 'Servicii & facilități',        pct: 2,  max: 3,  elem: ['toalete 2M+2F+1PMR', 'chioșc concesionat ≤1/5ha', 'depozit întreținere', 'stație bike-sharing'] }
  ];
  // zone cu suprafață FIXĂ (nu procentuală) — carve-out
  var FIXED_ZONES = [
    { code: 'joaca',      name: 'Zonă joacă copii',     min_m2: 300, per_ha: 0.5, mandatory: true, elem: ['2-6 și 7-12 ani separate', 'EN 1176/1177', 'tobogan acces PMR', 'gard ≥80cm + 2 intrări', 'bănci perimetrale 360°'] },
    { code: 'fitness',    name: 'Fitness & sport outdoor', min_m2: 600, per_ha: 0.2, elem: ['8-12 aparate EN 16630', 'teren multifuncțional 28×15m', 'pistă alergare 400m'] },
    { code: 'amfiteatru', name: 'Amfiteatru / Scenă verde', min_m2: 800, min_ha_park: 3, elem: ['gradene din pământ', 'scenă 12×8m, +60-80cm', 'sonorizare + alimentare'] },
    { code: 'caini',      name: 'Zonă câini (dog run)',  min_m2: 500, min_ha_park: 1, elem: ['mari (>15kg)/mici separați', 'adăpători 40+80cm', 'dozatoare pungi biodegradabile'] }
  ];

  // ── SPECII native RO (recomandare proiectare) ──
  var SPECIES = [
    { ro: 'Tei argintiu',       lat: 'Tilia tomentosa',        t: 'arbore',   native: true,  note: 'aliniament, umbră densă, miere' },
    { ro: 'Tei pucios',         lat: 'Tilia cordata',          t: 'arbore',   native: true },
    { ro: 'Stejar pedunculat',  lat: 'Quercus robur',          t: 'arbore',   native: true,  note: 'longeviv, biodiversitate' },
    { ro: 'Frasin',             lat: 'Fraxinus excelsior',     t: 'arbore',   native: true },
    { ro: 'Arțar (paltin de câmp)', lat: 'Acer platanoides',   t: 'arbore',   native: true },
    { ro: 'Paltin de munte',    lat: 'Acer pseudoplatanus',    t: 'arbore',   native: true },
    { ro: 'Jugastru',           lat: 'Acer campestre',         t: 'arbore',   native: true },
    { ro: 'Carpen',             lat: 'Carpinus betulus',       t: 'arbore',   native: true },
    { ro: 'Sorb de câmp',       lat: 'Sorbus torminalis',      t: 'arbore',   native: true },
    { ro: 'Mesteacăn',          lat: 'Betula pendula',         t: 'arbore',   native: true },
    { ro: 'Alun',               lat: 'Corylus avellana',       t: 'arbust',   native: true },
    { ro: 'Corn',               lat: 'Cornus mas',             t: 'arbust',   native: true,  note: 'înflorire timpurie' },
    { ro: 'Măceș',              lat: 'Rosa canina',            t: 'arbust',   native: true },
    { ro: 'Salbă moale',        lat: 'Euonymus europaeus',     t: 'arbust',   native: true },
    { ro: 'Soc negru',          lat: 'Sambucus nigra',         t: 'arbust',   native: true },
    { ro: 'Platan',             lat: 'Platanus × acerifolia',  t: 'arbore',   native: false, note: 'aliniament urban rezistent (aclimatizat)' },
    { ro: 'Salcâm',             lat: 'Robinia pseudoacacia',   t: 'arbore',   native: false, note: '⚠ invaziv — evitat în zone naturale' }
  ];

  // ── COST benchmark RO 2024 (RON/mp parc amenajat) ──
  var LEVELS = {
    basic:    { label: 'Basic (gazon + alei + mobilier simplu)',        lo: 150, hi: 250 },
    standard: { label: 'Standard (toate zonele + specii native + LED)', lo: 350, hi: 550 },
    premium:  { label: 'Premium (peisagistic complet + smart features)', lo: 600, hi: 900 }
  };
  var TREE_COST = { lo: 800, hi: 3000, avg: 1500 }; // RON/buc arbore matur (plantare + garanție 2 ani)

  // ── CATALOG tipuri (Legea 24/2007) ──
  var CAT_TYPES = {
    parc_urban:    { label: 'Parc urban',        ico: '🌳' },
    gradina:       { label: 'Grădină publică',   ico: '🌷' },
    scuar:         { label: 'Scuar',             ico: '🪴' },
    fasie_verde:   { label: 'Fâșie verde',       ico: '🌿' },
    zona_sport:    { label: 'Zonă sport',        ico: '⚽' },
    zona_joaca:    { label: 'Zonă joacă',        ico: '🛝' },
    promenada:     { label: 'Promenadă',         ico: '🚶' },
    padure_urbana: { label: 'Pădure urbană',     ico: '🌲' }
  };
  var CONDITIONS = { excelenta: 'excelentă', buna: 'bună', medie: 'medie', precara: 'precară', critica: 'critică' };
  var TARGET_MP_LOC = 26; // Legea 24/2007 art.7 (municipii reședință de județ)

  // ── CRITERII concurs (ponderi sugestie — Legea 98/2016) ──
  var CRITERIA = [
    { name: 'Calitatea conceptului peisagistic', w: 30 },
    { name: 'Funcționalitate și program rezolvat', w: 25 },
    { name: 'Durabilitate ecologică (specii native, apă)', w: 20 },
    { name: 'Accesibilitate universală PMR', w: 10 },
    { name: 'Fezabilitate economică (cost estimat)', w: 10 },
    { name: 'Inovație / element unic', w: 5 }
  ];
  var CONCURS_TYPES = { concurs_solutii: 'Concurs de soluții (formal, Art.110-114)', concurs_idei: 'Concurs de idei (informal)', dialog_competitiv: 'Dialog competitiv' };

  // ════════════════════════ ENGINE ════════════════════════

  // ── CATALOG (registru localStorage) ──
  var KCAT = 'urbanx_loisir_catalog_v1';
  function _seedCat() {
    return [
      { id: 'lc_seed_1', name: 'Parcul Copou (Grădina Copou)', type: 'parc_urban', area_ha: 10.0, condition: 'buna', trees: 1200, native_trees: 900, managed_by: 'Serviciul Spații Verzi Iași', budget_ron: 850000, permeability: 78, canopy: 42, seed: true },
      { id: 'lc_seed_2', name: 'Parcul Expoziției', type: 'parc_urban', area_ha: 12.5, condition: 'medie', trees: 1500, native_trees: 1050, managed_by: 'Serviciul Spații Verzi Iași', budget_ron: 720000, permeability: 70, canopy: 38, seed: true },
      { id: 'lc_seed_3', name: 'Parcul Ciric (agrement)', type: 'parc_urban', area_ha: 96.0, condition: 'medie', trees: 8000, native_trees: 6400, managed_by: 'Primăria Iași', budget_ron: 1200000, permeability: 85, canopy: 55, seed: true },
      { id: 'lc_seed_4', name: 'Grădina Botanică „Anastasie Fătu"', type: 'gradina', area_ha: 104.0, condition: 'excelenta', trees: 12000, native_trees: 7000, managed_by: 'Universitatea „Al. I. Cuza"', budget_ron: 2000000, permeability: 92, canopy: 60, seed: true }
    ];
  }
  function _catLoad() { try { var v = localStorage.getItem(KCAT); if (v == null) { var s = _seedCat(); localStorage.setItem(KCAT, JSON.stringify(s)); return s; } return JSON.parse(v); } catch (e) { return _seedCat(); } }
  function _catSave(a) { try { localStorage.setItem(KCAT, JSON.stringify(a)); } catch (e) {} }
  var catalog = {
    list: function () { return _catLoad(); },
    add: function (s) { var a = _catLoad(); s.id = 'lc' + Date.now(); a.push(s); _catSave(a); return s; },
    remove: function (id) { _catSave(_catLoad().filter(function (s) { return s.id !== id; })); },
    // KPI Legea 24/2007 — populația deservită se ia din _RO_CITIES_DB / _EXTRA_UATS dacă există
    kpis: function (population) {
      var a = _catLoad();
      var ha = a.reduce(function (s, x) { return s + (+x.area_ha || 0); }, 0);
      var mp = ha * 10000;
      var pop = +population || _resolvePop();
      var mp_loc = pop ? mp / pop : null;
      var goodPct = a.length ? Math.round(a.filter(function (x) { return x.condition === 'excelenta' || x.condition === 'buna'; }).length / a.length * 100) : 0;
      var trees = a.reduce(function (s, x) { return s + (+x.trees || 0); }, 0);
      var nativeT = a.reduce(function (s, x) { return s + (+x.native_trees || 0); }, 0);
      var deficit_mp = (pop && mp_loc != null) ? Math.max(0, pop * TARGET_MP_LOC - mp) : null;
      return {
        spaces: a.length, total_ha: Math.round(ha * 10) / 10, mp: Math.round(mp),
        population: pop, mp_loc: mp_loc != null ? Math.round(mp_loc * 10) / 10 : null, target_mp_loc: TARGET_MP_LOC,
        meets_target: mp_loc != null ? mp_loc >= TARGET_MP_LOC : null, deficit_mp: deficit_mp,
        good_pct: goodPct, trees: trees, native_trees: nativeT, native_pct: trees ? Math.round(nativeT / trees * 100) : null
      };
    }
  };
  function _resolvePop() {
    try {
      var k = (G.TCI && G.TCI.cityKey) || localStorage.getItem('ux_last_city');
      if (!k) return 0;
      var c = (G._RO_CITIES_DB && G._RO_CITIES_DB[k]) || (G.TCI && G.TCI._EXTRA_UATS && G.TCI._EXTRA_UATS[k]);
      if (!c) return 0;
      return +c.pop2021 || +c.pop || +c.populatie || 0;
    } catch (e) { return 0; }
  }

  // ── PROIECTARE ASISTATĂ — program spațial parametric (din NORME, nu fabricat) ──
  function program(area_ha, population_served) {
    area_ha = +area_ha || 0; var area_m2 = area_ha * 10000;
    if (area_m2 <= 0) return null;
    var perim = 4 * Math.sqrt(area_m2); // perimetru aproximativ (pătrat echivalent)
    // zone procentuale
    var pctSum = ZONES.reduce(function (s, z) { return s + z.pct; }, 0);
    var zones = ZONES.map(function (z) {
      var m2 = Math.round(area_m2 * z.pct / 100);
      return { code: z.code, name: z.name, m2: m2, pct: z.pct, mandatory: !!z.mandatory, elem: z.elem, std: z.std || [], norm: (z.min ? '≥' + z.min + '%' : '') + (z.max ? (z.min ? ', ' : '') + '≤' + z.max + '%' : '') };
    });
    // zone fixe (carve-out din procentuale)
    var fixed = [];
    FIXED_ZONES.forEach(function (z) {
      if (z.min_ha_park && area_ha < z.min_ha_park) return; // ex. amfiteatru doar >3ha, dog run >1ha
      var m2 = z.min_m2;
      if (z.per_ha) m2 = Math.max(z.min_m2, Math.round(z.min_m2 * Math.ceil(area_ha / (z.code === 'joaca' ? 2 : 5))));
      fixed.push({ code: z.code, name: z.name, m2: m2, mandatory: !!z.mandatory, elem: z.elem, fixed: true });
    });
    // mobilier (norme pe ha / pe m)
    var promenada = (zones.filter(function (z) { return z.code === 'promenada'; })[0] || {}).m2 || 0;
    var padure = (zones.filter(function (z) { return z.code === 'padure'; })[0] || {}).m2 || 0;
    var furniture = {
      banci: Math.max(1, Math.round(promenada / 200)),               // 1 / 200 mp promenadă
      cosuri: Math.max(2, Math.round(perim / 50)),                   // 1 / 50 m alee
      fantani_potabile: Math.max(1, Math.ceil(area_ha)),             // 1 / ha
      toalete: Math.max(2, Math.ceil(area_ha)),                      // 1 / ha, min 2
      rastele_bici: 20,                                              // ≥10 / intrare (presupunem 2 intrări)
      stalpi_iluminat: Math.max(4, Math.round(perim / 27))           // promenadă 25-30m
    };
    // ecologie (target)
    var ecology = { permeability_min: 70, native_species_min: 80, canopy_min: 30, arbori_estimati: Math.round(padure / 25) };
    // verificări de conformitate
    var aleiPct = zones.filter(function (z) { return z.code === 'promenada' || z.code === 'piazza'; }).reduce(function (s, z) { return s + z.pct; }, 0);
    var checks = [];
    checks.push({ ok: padure >= area_m2 * 0.30, t: 'Pădure / masiv verde ≥30% din suprafață', detail: Math.round(padure / area_m2 * 100) + '%' });
    checks.push({ ok: aleiPct <= 15, t: 'Alei + pavaje ≤15% (Piazza+Promenadă)', detail: aleiPct + '%' });
    var joaca = fixed.filter(function (z) { return z.code === 'joaca'; })[0];
    checks.push({ ok: !!joaca && joaca.m2 >= 300, t: 'Zonă joacă ≥300mp (min 1/2ha)', detail: joaca ? joaca.m2 + 'mp' : 'lipsă' });
    checks.push({ ok: ecology.arbori_estimati >= Math.round(area_m2 / 25 * 0.3), t: 'Densitate arbori ≥1/25mp în pădure', detail: ecology.arbori_estimati + ' arbori' });
    return {
      area_ha: area_ha, area_m2: area_m2, population_served: +population_served || null,
      zones: zones, fixed_zones: fixed, furniture: furniture, ecology: ecology, checks: checks,
      pop_target_ok: population_served ? (area_m2 / (+population_served) >= 8) : null // >8mp/loc deservit (KPI)
    };
  }

  // ── recomandare specii ──
  function species(filter) {
    if (!filter) return SPECIES.slice();
    if (filter === 'native') return SPECIES.filter(function (s) { return s.native; });
    if (filter === 'arbore' || filter === 'arbust') return SPECIES.filter(function (s) { return s.t === filter; });
    return SPECIES.slice();
  }

  // ── estimare cost (indicativă) ──
  function costEstimate(area_m2, level, n_trees) {
    area_m2 = +area_m2 || 0; var L = LEVELS[level] || LEVELS.standard;
    var lo = area_m2 * L.lo, hi = area_m2 * L.hi;
    var trees = +n_trees || 0;
    var treeLo = trees * TREE_COST.lo, treeHi = trees * TREE_COST.hi;
    return {
      level: level || 'standard', label: L.label,
      amenajare_lo: Math.round(lo), amenajare_hi: Math.round(hi),
      arbori_lo: Math.round(treeLo), arbori_hi: Math.round(treeHi), arbori_buc: trees,
      total_lo: Math.round(lo + treeLo), total_hi: Math.round(hi + treeHi),
      ron_mp: L.lo + '-' + L.hi,
      disclaimer: 'ESTIMATIV — nu înlocuiește devizul tehnic. Costurile RO variază semnificativ regional/anual.'
    };
  }

  // ── CONCURS DE IDEI (registru) ──
  var KCONC = 'urbanx_loisir_concurs_v1';
  function _concLoad() { try { return JSON.parse(localStorage.getItem(KCONC) || '[]'); } catch (e) { return []; } }
  function _concSave(a) { try { localStorage.setItem(KCONC, JSON.stringify(a)); } catch (e) {} }
  var concurs = {
    list: function () { return _concLoad(); },
    add: function (c) { var a = _concLoad(); c.id = 'cc' + Date.now(); c.status = c.status || 'draft'; c.submissions = c.submissions || []; c.criteria = c.criteria || CRITERIA.map(function (x) { return Object.assign({}, x); }); a.push(c); _concSave(a); return c; },
    remove: function (id) { _concSave(_concLoad().filter(function (c) { return c.id !== id; })); },
    addSubmission: function (id, sub) { var a = _concLoad(); var c = a.filter(function (x) { return x.id === id; })[0]; if (!c) return; sub.code = 'P-' + (1000 + (c.submissions.length + 1)); sub.scores = sub.scores || {}; c.submissions.push(sub); _concSave(a); return sub; },
    // punctaj ponderat (juriu) — client-side, transparent
    rank: function (id) {
      var c = _concLoad().filter(function (x) { return x.id === id; })[0]; if (!c) return [];
      return c.submissions.map(function (s) {
        var tot = c.criteria.reduce(function (acc, cr) { var sc = +(s.scores && s.scores[cr.name]) || 0; return acc + sc * cr.w / 100; }, 0);
        return { code: s.code, title: s.title, total: Math.round(tot * 10) / 10 };
      }).sort(function (a, b) { return b.total - a.total; });
    }
  };

  // ── PDF brief de concurs (folosește jsPDF + font RO) ──
  function generateBriefPDF(c) {
    try {
      var jsPDFns = (G.jspdf && G.jspdf.jsPDF) || G.jsPDF; if (!jsPDFns) { alert('jsPDF indisponibil'); return; }
      var pdf = new jsPDFns({ unit: 'mm', format: 'a4' });
      if (G._registerROFont) G._registerROFont(pdf);
      var W = 210, x = 18, y = 22;
      pdf.setFontSize(9); pdf.setTextColor(120); pdf.text('UrbanX Loisir · Brief de concurs (Legea 98/2016 + Legea 24/2007)', x, 14);
      pdf.setFontSize(18); pdf.setTextColor(20); pdf.text('Brief de proiectare — ' + (c.sit_name || 'sit'), x, y); y += 9;
      pdf.setFontSize(11); pdf.setTextColor(60);
      pdf.text('Tip procedură: ' + (CONCURS_TYPES[c.type] || c.type || '—'), x, y); y += 6;
      pdf.text('Suprafață sit: ' + (c.area_ha || '—') + ' ha   ·   Buget orientativ: ' + (c.budget_max ? c.budget_max.toLocaleString('ro-RO') + ' RON' : '—'), x, y); y += 6;
      if (c.deadline) { pdf.text('Termen depunere: ' + c.deadline, x, y); y += 6; }
      y += 3; pdf.setFontSize(13); pdf.setTextColor(20); pdf.text('1. Program spațial obligatoriu', x, y); y += 7;
      pdf.setFontSize(9.5); pdf.setTextColor(70);
      var prog = program(c.area_ha || 1, c.population || null);
      (prog ? prog.zones.concat(prog.fixed_zones) : []).forEach(function (z) {
        if (y > 270) { pdf.addPage(); y = 22; }
        pdf.text('• ' + z.name + ' — ' + (z.m2 ? z.m2.toLocaleString('ro-RO') + ' mp' : '') + (z.mandatory ? ' (obligatoriu)' : ''), x + 2, y); y += 5;
      });
      y += 3; if (y > 250) { pdf.addPage(); y = 22; }
      pdf.setFontSize(13); pdf.setTextColor(20); pdf.text('2. Criterii de evaluare', x, y); y += 7;
      pdf.setFontSize(9.5); pdf.setTextColor(70);
      (c.criteria || CRITERIA).forEach(function (cr) { pdf.text('• ' + cr.name + ' — ' + cr.w + '%', x + 2, y); y += 5; });
      y += 4; if (y > 250) { pdf.addPage(); y = 22; }
      pdf.setFontSize(13); pdf.setTextColor(20); pdf.text('3. Documente de predat', x, y); y += 7;
      pdf.setFontSize(9.5); pdf.setTextColor(70);
      ['Plan de situație 1:500 / 1:200 (DWG + PDF)', 'Secțiuni caracteristice (min 2)', 'Perspective 3D (min 3)', 'Planșe detaliu mobilier urban', 'Listă specii vegetale + cantități', 'Estimare costuri (sumară)', 'Memoriu justificativ (max 10 pag.)'].forEach(function (d) { pdf.text('• ' + d, x + 2, y); y += 5; });
      pdf.setFontSize(8); pdf.setTextColor(140); pdf.text('Generat de UrbanX Loisir. Program spațial calculat din norme (Legea 24/2007). Estimările sunt orientative.', x, 288);
      pdf.save('Brief_concurs_' + (c.sit_name || 'sit').replace(/[^\w]+/g, '_') + '.pdf');
    } catch (e) { console.warn('[Loisir] brief PDF', e); alert('Eroare la generarea brief-ului: ' + e.message); }
  }

  // ════════════════════════ 3D PARK VISUALIZER (Three.js r128) ════════════════════════
  // Generator procedural din programul spațial. Fără OrbitControls (r128) — control manual.
  var _3d = { renderer: null, raf: null };
  function render3D(prog, container) {
    var THREE = G.THREE; if (!THREE) { alert('Three.js nu este încărcat'); return; }
    if (!prog) prog = program(2, null);
    dispose3D();
    var W = container.clientWidth || 900, H = container.clientHeight || 520;
    var scene = new THREE.Scene(); scene.background = new THREE.Color(0xbfe3f5);
    scene.fog = new THREE.Fog(0xbfe3f5, 200, 600);
    var cam = new THREE.PerspectiveCamera(50, W / H, 0.1, 2000);
    var side = Math.max(60, Math.sqrt(prog.area_m2) ); // unitate ~ metru, plafonat vizual
    side = Math.min(side, 260);
    var renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(W, H); renderer.setPixelRatio(Math.min(2, G.devicePixelRatio || 1));
    container.innerHTML = ''; container.appendChild(renderer.domElement);
    _3d.renderer = renderer;

    // lumini
    scene.add(new THREE.AmbientLight(0xffffff, 0.65));
    var sun = new THREE.DirectionalLight(0xfff4e0, 0.85); sun.position.set(side, side * 1.2, side * 0.6); scene.add(sun);

    // sol
    var ground = new THREE.Mesh(new THREE.PlaneGeometry(side, side), new THREE.MeshLambertMaterial({ color: 0x6f9e3f }));
    ground.rotation.x = -Math.PI / 2; scene.add(ground);

    // helpers de poziție (în pătratul [-side/2, side/2])
    function rnd(seed) { var x = Math.sin(seed * 9301 + 49297) * 233280; return x - Math.floor(x); }
    function zoneFrac(code) { var z = prog.zones.filter(function (q) { return q.code === code; })[0]; return z ? z.pct / 100 : 0; }

    // PIAZZA centrală (pavaj)
    var pzS = Math.sqrt(prog.area_m2 * zoneFrac('piazza')) * (side / Math.sqrt(prog.area_m2));
    var piazza = new THREE.Mesh(new THREE.CircleGeometry(Math.max(6, pzS / 2), 32), new THREE.MeshLambertMaterial({ color: 0xb8b09c }));
    piazza.rotation.x = -Math.PI / 2; piazza.position.y = 0.02; scene.add(piazza);
    // fântână
    var fount = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.4, 0.6, 24), new THREE.MeshLambertMaterial({ color: 0x378add }));
    fount.position.y = 0.3; scene.add(fount);

    // PROMENADĂ — inel perimetral
    var ringR = side * 0.42;
    var ring = new THREE.Mesh(new THREE.RingGeometry(ringR - 1.6, ringR + 1.6, 48), new THREE.MeshLambertMaterial({ color: 0x8a8780, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.015; scene.add(ring);

    // APĂ — lac
    if (zoneFrac('ape') > 0) {
      var lakeR = Math.max(6, Math.sqrt(prog.area_m2 * zoneFrac('ape')) * (side / Math.sqrt(prog.area_m2)) / 2);
      var lake = new THREE.Mesh(new THREE.CircleGeometry(lakeR, 28), new THREE.MeshPhongMaterial({ color: 0x2f7fd0, shininess: 80, transparent: true, opacity: 0.88 }));
      lake.rotation.x = -Math.PI / 2; lake.position.set(-side * 0.26, 0.03, side * 0.22); scene.add(lake);
    }

    // ARBORI (InstancedMesh) — pădure + aliniament
    var nTrees = Math.min(800, Math.max(20, prog.ecology.arbori_estimati || 60));
    var trunkG = new THREE.CylinderGeometry(0.18, 0.32, 3.2, 6);
    var trunkM = new THREE.MeshLambertMaterial({ color: 0x6b4a2b });
    var canopyG = new THREE.SphereGeometry(2.4, 7, 5);
    var canopyM = new THREE.MeshLambertMaterial({ color: 0x3b6d11 });
    var trunks = new THREE.InstancedMesh(trunkG, trunkM, nTrees);
    var canopies = new THREE.InstancedMesh(canopyG, canopyM, nTrees);
    var dummy = new THREE.Object3D();
    for (var i = 0; i < nTrees; i++) {
      var ang = rnd(i + 1) * Math.PI * 2, rad = (0.30 + rnd(i + 7) * 0.62) * (side / 2);
      var px = Math.cos(ang) * rad, pz = Math.sin(ang) * rad;
      if (Math.abs(px) < pzS / 2 && Math.abs(pz) < pzS / 2) { rad += pzS; px = Math.cos(ang) * rad; pz = Math.sin(ang) * rad; }
      var sc = 0.7 + rnd(i + 13) * 0.8;
      dummy.position.set(px, 1.6 * sc, pz); dummy.scale.set(sc, sc, sc); dummy.updateMatrix(); trunks.setMatrixAt(i, dummy.matrix);
      dummy.position.set(px, (3.2 * sc) + 1.4 * sc, pz); dummy.scale.set(sc, sc, sc); dummy.updateMatrix(); canopies.setMatrixAt(i, dummy.matrix);
    }
    scene.add(trunks); scene.add(canopies);

    // BĂNCI + STÂLPI pe promenadă
    var nBench = Math.min(40, prog.furniture.banci);
    for (var b = 0; b < nBench; b++) {
      var a2 = (b / nBench) * Math.PI * 2;
      var bench = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.45, 0.5), new THREE.MeshLambertMaterial({ color: 0xc8a06a }));
      bench.position.set(Math.cos(a2) * (ringR - 3), 0.35, Math.sin(a2) * (ringR - 3)); bench.rotation.y = -a2; scene.add(bench);
    }
    var nLamp = Math.min(48, prog.furniture.stalpi_iluminat); var lampHeads = [];
    for (var l = 0; l < nLamp; l++) {
      var a3 = (l / nLamp) * Math.PI * 2;
      var pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 5, 6), new THREE.MeshLambertMaterial({ color: 0x444a52 }));
      pole.position.set(Math.cos(a3) * (ringR + 2.4), 2.5, Math.sin(a3) * (ringR + 2.4)); scene.add(pole);
      var head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 6, 4), new THREE.MeshLambertMaterial({ color: 0xfff1b8, emissive: 0x000000 }));
      head.position.set(pole.position.x, 5, pole.position.z); scene.add(head); lampHeads.push(head);
    }

    // PLAYGROUND (dacă există)
    if (prog.fixed_zones.filter(function (z) { return z.code === 'joaca'; }).length) {
      var pg = new THREE.Mesh(new THREE.BoxGeometry(10, 0.15, 10), new THREE.MeshLambertMaterial({ color: 0xd98a3a }));
      pg.position.set(side * 0.28, 0.08, -side * 0.24); scene.add(pg);
      var slide = new THREE.Mesh(new THREE.BoxGeometry(1, 0.2, 4), new THREE.MeshLambertMaterial({ color: 0xef5350 }));
      slide.position.set(side * 0.28, 1.2, -side * 0.24); slide.rotation.x = 0.5; scene.add(slide);
    }

    // CAMERĂ + control manual (orbit simplu pe drag, zoom pe wheel)
    var theta = Math.PI * 0.25, phi = Math.PI * 0.32, dist = side * 1.4;
    function place() { cam.position.set(dist * Math.sin(phi) * Math.cos(theta), dist * Math.cos(phi), dist * Math.sin(phi) * Math.sin(theta)); cam.lookAt(0, 0, 0); }
    place();
    var dragging = false, lx = 0, ly = 0;
    var dom = renderer.domElement;
    dom.style.cursor = 'grab';
    dom.addEventListener('mousedown', function (e) { dragging = true; lx = e.clientX; ly = e.clientY; dom.style.cursor = 'grabbing'; });
    G.addEventListener('mouseup', function () { dragging = false; dom.style.cursor = 'grab'; });
    G.addEventListener('mousemove', function (e) { if (!dragging) return; theta -= (e.clientX - lx) * 0.008; phi = Math.max(0.12, Math.min(1.45, phi - (e.clientY - ly) * 0.006)); lx = e.clientX; ly = e.clientY; place(); });
    dom.addEventListener('wheel', function (e) { e.preventDefault(); dist = Math.max(side * 0.5, Math.min(side * 3, dist + e.deltaY * 0.25)); place(); }, { passive: false });
    // touch
    var tx = 0, ty = 0;
    dom.addEventListener('touchstart', function (e) { if (e.touches[0]) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; } });
    dom.addEventListener('touchmove', function (e) { if (e.touches[0]) { theta -= (e.touches[0].clientX - tx) * 0.008; phi = Math.max(0.12, Math.min(1.45, phi - (e.touches[0].clientY - ty) * 0.006)); tx = e.touches[0].clientX; ty = e.touches[0].clientY; place(); e.preventDefault(); } }, { passive: false });

    // mod zi/noapte
    _3d.setNight = function (night) {
      scene.background = new THREE.Color(night ? 0x0a1426 : 0xbfe3f5); scene.fog.color = scene.background;
      sun.intensity = night ? 0.12 : 0.85; canopyM.color.setHex(night ? 0x1d3409 : 0x3b6d11);
      ground.material.color.setHex(night ? 0x33502a : 0x6f9e3f);
      lampHeads.forEach(function (h) { h.material.emissive.setHex(night ? 0xffd24a : 0x000000); });
    };
    _3d.setSeason = function (s) {
      var col = s === 'toamna' ? 0xc77a1f : s === 'primavara' ? 0x86c540 : s === 'iarna' ? 0x9fb3a0 : 0x3b6d11;
      canopyM.color.setHex(col);
    };
    _3d.screenshot = function () { try { var url = renderer.domElement.toDataURL('image/png'); var a = document.createElement('a'); a.href = url; a.download = 'parc_3d.png'; a.click(); } catch (e) {} };

    (function loop() { _3d.raf = requestAnimationFrame(loop); fount.rotation.y += 0.01; renderer.render(scene, cam); })();
  }
  function dispose3D() { if (_3d.raf) cancelAnimationFrame(_3d.raf); _3d.raf = null; if (_3d.renderer) { try { _3d.renderer.dispose(); } catch (e) {} _3d.renderer = null; } }

  // ── capitol pentru rapoarte (Masterplan / PMUD) ──
  function chapter(D) {
    if (!D || !D.chapter) return;
    var k = catalog.kpis();
    D.chapter('Spații verzi & loisir (Legea 24/2007)');
    D.P('Catalogul spațiilor verzi este obligatoriu pentru fiecare UAT (Legea 24/2007, art. 11). ' +
      'Indicatorul-cheie este suprafața de spațiu verde pe locuitor (țintă ' + TARGET_MP_LOC + ' mp/loc pentru municipii reședință de județ, art. 7).');
    D.kpis([
      { label: 'Spații verzi', val: '' + k.spaces, sub: k.total_ha + ' ha' },
      { label: 'mp / locuitor', val: k.mp_loc != null ? '' + k.mp_loc : '—', sub: 'țintă ' + TARGET_MP_LOC + ' (L.24/2007)' },
      { label: 'Stare bună+', val: k.good_pct + '%', sub: 'din spații' }
    ]);
    if (k.mp_loc != null) {
      if (k.meets_target) D.callout('Conformitate Legea 24/2007', 'UAT-ul atinge ținta de ' + TARGET_MP_LOC + ' mp/locuitor (' + k.mp_loc + ' mp/loc).', [16, 150, 80]);
      else D.callout('Deficit de spațiu verde', 'Sub ținta Legea 24/2007: ' + k.mp_loc + ' mp/loc față de ' + TARGET_MP_LOC + '. Deficit estimat: ' + Math.round((k.deficit_mp || 0) / 10000 * 10) / 10 + ' ha de amenajat.', [212, 130, 20]);
    }
    var rows = catalog.list().slice(0, 12).map(function (s) { var t = CAT_TYPES[s.type] || {}; return [s.name, t.label || s.type, (s.area_ha || 0) + ' ha', CONDITIONS[s.condition] || s.condition]; });
    D.table(['Spațiu verde', 'Tip', 'Suprafață', 'Stare'], rows, [70, 38, 28, 28], { boldFirst: true });
    // legătură cu UHI (climă)
    try {
      if (G.UHI) D.P('Componenta climatică (insula de căldură, soluții bazate pe natură) este tratată în modulul LOISIR/UHI — răcirea estimată a unui parc > 2 ha este de 1-3 °C local (Gill 2007, C40).');
    } catch (e) {}
    D.callout('Surse & limite', 'Catalog din registrul UrbanX (orientativ; se completează cu inventarul oficial al Serviciului Spații Verzi). Programul de proiectare e calculat din norme; costurile sunt estimative. Monitorizarea satelitară NDVI/LST și senzorii smart-park = etapă cu server (Copernicus).', [96, 130, 200]);
  }

  // ════════════════════════ UI ════════════════════════
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.74);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(760px,96vw);max-height:94vh;overflow:auto;border:1px solid rgba(34,197,94,.4);border-radius:14px;font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:16px 20px', inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:8px 10px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#16a34a,#15803d);color:#fff;border:0;border-radius:9px;padding:10px 15px;font-weight:700;cursor:pointer;font-size:13px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    tab: 'background:rgba(255,255,255,.05);color:#cbd5e1;border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:7px 11px;cursor:pointer;font-size:12px;font-weight:600',
    tabA: 'background:rgba(34,197,94,.2);color:#86efac;border:1px solid rgba(34,197,94,.4);border-radius:8px;padding:7px 11px;cursor:pointer;font-size:12px;font-weight:700',
    label: 'font-size:11px;color:#86efac;text-transform:uppercase;letter-spacing:.06em;margin:12px 0 6px;font-weight:700'
  };
  function card(b, s, c) { return '<div style="flex:1;min-width:90px;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:10px;text-align:center"><div style="font-size:17px;font-weight:800;color:' + (c || '#86efac') + '">' + b + '</div><div style="font-size:10px;color:#94a3b8">' + s + '</div></div>'; }

  function openPanel() {
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) { dispose3D(); ov.remove(); } };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head });
    head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">🌿 LOISIR — Spații verzi & plămân urban</div><div style="font-size:11px;color:#94a3b8">Catalog Legea 24/2007 · proiectare parc · 3D · concurs de idei · climă (UHI)</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { dispose3D(); ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);

    var TABS = [['catalog', '📊 Catalog'], ['proiect', '🎨 Proiectare parc'], ['p3d', '🧊 3D'], ['concurs', '🏆 Concurs'], ['clima', '🌡 Climă/UHI']];
    var tabBar = el('div', { style: 'display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px' }); body.appendChild(tabBar);
    var content = el('div'); body.appendChild(content);
    var cur = 'catalog';
    var btns = {};
    TABS.forEach(function (t) { var b = el('button', { style: ST.tab }, t[1]); b.onclick = function () { cur = t[0]; sync(); }; btns[t[0]] = b; tabBar.appendChild(b); });
    function sync() { Object.keys(btns).forEach(function (k) { btns[k].setAttribute('style', k === cur ? ST.tabA : ST.tab); }); render(); }

    var lastProg = null;

    function render() {
      content.innerHTML = '';
      if (cur === 'catalog') return renderCatalog();
      if (cur === 'proiect') return renderProiect();
      if (cur === 'p3d') return renderP3D();
      if (cur === 'concurs') return renderConcurs();
      if (cur === 'clima') return renderClima();
    }

    // ── TAB CATALOG ──
    function renderCatalog() {
      var k = catalog.kpis();
      var dash = el('div', { style: 'display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px' });
      dash.innerHTML = card(k.spaces, 'spații verzi') + card(k.total_ha + ' ha', 'suprafață', '#34d399') +
        card(k.mp_loc != null ? k.mp_loc : '—', 'mp/loc · țintă ' + TARGET_MP_LOC, k.meets_target ? '#34d399' : '#fbbf24') +
        card(k.good_pct + '%', 'stare bună+', '#60a5fa');
      content.appendChild(dash);
      var note = el('div', { style: 'font-size:11px;border-radius:8px;padding:8px 10px;margin-bottom:8px;' + (k.meets_target ? 'background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.3);color:#86efac' : 'background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.3);color:#fbbf24') });
      if (k.mp_loc == null) note.innerHTML = '⚠ Populație necunoscută pentru UAT-ul curent — selectează un oraș pentru a calcula mp/locuitor (Legea 24/2007 art.7).';
      else if (k.meets_target) note.innerHTML = '✓ Atinge ținta Legea 24/2007: <b>' + k.mp_loc + ' mp/loc</b> (≥' + TARGET_MP_LOC + ') pentru ' + (k.population ? k.population.toLocaleString('ro-RO') + ' loc.' : '');
      else note.innerHTML = '⚠ Deficit Legea 24/2007: <b>' + k.mp_loc + ' mp/loc</b> < ' + TARGET_MP_LOC + '. Necesar +<b>' + (Math.round((k.deficit_mp || 0) / 10000 * 10) / 10) + ' ha</b> de amenajat.';
      content.appendChild(note);

      var list = el('div'); content.appendChild(list);
      function refresh() {
        var a = catalog.list();
        list.innerHTML = a.map(function (s) {
          var t = CAT_TYPES[s.type] || {}; var cc = s.condition === 'excelenta' || s.condition === 'buna' ? '#34d399' : s.condition === 'medie' ? '#fbbf24' : '#f87171';
          return '<div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.05)"><span>' + (t.ico || '') + ' <b>' + s.name + '</b> <span style="color:#64748b">· ' + (t.label || s.type) + ' · ' + (s.area_ha || 0) + ' ha · ' + (s.trees || 0) + ' arbori</span></span><span style="white-space:nowrap"><b style="color:' + cc + '">' + (CONDITIONS[s.condition] || s.condition) + '</b> <button data-del="' + s.id + '" style="' + ST.ghost + ';padding:1px 6px;margin-left:4px">✕</button></span></div>';
        }).join('');
        list.querySelectorAll('[data-del]').forEach(function (b) { b.onclick = function () { catalog.remove(b.getAttribute('data-del')); renderCatalog(); }; });
      }
      refresh();
      content.appendChild(el('div', { style: ST.label }, 'Adaugă spațiu verde în catalog'));
      var g = el('div', { style: 'display:grid;grid-template-columns:2fr 1fr;gap:6px' });
      var nm = el('input', { style: ST.inp, placeholder: 'denumire' });
      var ty = el('select', { style: ST.inp }); Object.keys(CAT_TYPES).forEach(function (kk) { ty.appendChild(el('option', { value: kk }, CAT_TYPES[kk].ico + ' ' + CAT_TYPES[kk].label)); });
      g.appendChild(nm); g.appendChild(ty); content.appendChild(g);
      var g2 = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr 1fr 50px;gap:6px;margin-top:6px' });
      var ha = el('input', { style: ST.inp, type: 'number', step: '0.1', placeholder: 'ha' });
      var tr = el('input', { style: ST.inp, type: 'number', placeholder: 'arbori' });
      var cond = el('select', { style: ST.inp }); Object.keys(CONDITIONS).forEach(function (kk) { cond.appendChild(el('option', { value: kk }, CONDITIONS[kk])); });
      var add = el('button', { style: ST.btn }, '+'); g2.appendChild(ha); g2.appendChild(tr); g2.appendChild(cond); g2.appendChild(add); content.appendChild(g2);
      add.onclick = function () { if (!nm.value.trim()) return; catalog.add({ name: nm.value, type: ty.value, area_ha: +ha.value || 0, trees: +tr.value || 0, native_trees: Math.round((+tr.value || 0) * 0.75), condition: cond.value }); renderCatalog(); };
      content.appendChild(el('div', { style: 'font-size:10px;color:#64748b;margin-top:10px' }, 'Catalogul e obligatoriu prin Legea 24/2007 (art. 11). Auto-import din zonele PUG „verde" (V) + monitorizare NDVI satelit = Faza 2 (server Copernicus).'));
    }

    // ── TAB PROIECTARE PARC ──
    function renderProiect() {
      content.appendChild(el('div', { style: ST.label }, 'Suprafața sitului'));
      var srcInfo = el('div', { style: 'font-size:11px;color:#94a3b8;margin-bottom:6px' });
      var g = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px' });
      var ha = el('input', { style: ST.inp, type: 'number', step: '0.1', placeholder: 'ha', value: '2' });
      var pop = el('input', { style: ST.inp, type: 'number', placeholder: 'pop. deservită' });
      var lvl = el('select', { style: ST.inp }); Object.keys(LEVELS).forEach(function (kk) { lvl.appendChild(el('option', { value: kk }, LEVELS[kk].label.split(' (')[0])); }); lvl.value = 'standard';
      g.appendChild(ha); g.appendChild(pop); g.appendChild(lvl); content.appendChild(g);
      // preia suprafața din StudyZone activă sau parcela activă
      var fromZone = el('button', { style: ST.ghost + ';margin-top:6px' }, '📐 Din zona de studiu activă');
      var fromParcel = el('button', { style: ST.ghost + ';margin-top:6px;margin-left:6px' }, '📍 Din parcela selectată');
      content.appendChild(fromZone); content.appendChild(fromParcel); content.appendChild(srcInfo);
      fromZone.onclick = function () { try { var z = G.StudyZone && G.StudyZone.active && G.StudyZone.active(); var a = z && (z.area_ha || (z.area_m2 ? z.area_m2 / 10000 : (z.area ? z.area / 10000 : 0))); if (a) { ha.value = Math.round(a * 100) / 100; srcInfo.textContent = '✓ Suprafață din zona de studiu: ' + ha.value + ' ha'; } else srcInfo.textContent = '⚠ Nicio zonă de studiu activă (deschide „Zonă de studiu").'; } catch (e) { srcInfo.textContent = '⚠ Zonă de studiu indisponibilă.'; } };
      fromParcel.onclick = function () { try { var S = G.S; var p = S && S.parcels && S.parcels[S.activeParcel]; var a = p && p.area; if (a) { ha.value = Math.round(a / 10000 * 100) / 100; srcInfo.textContent = '✓ Suprafață din parcela ' + (p.nrcad || '') + ': ' + ha.value + ' ha'; } else srcInfo.textContent = '⚠ Nicio parcelă selectată pe hartă.'; } catch (e) { srcInfo.textContent = '⚠ Parcelă indisponibilă.'; } };

      var run = el('button', { style: ST.btn + ';margin-top:10px' }, '▶ Generează programul spațial'); content.appendChild(run);
      var out = el('div', { style: 'margin-top:12px' }); content.appendChild(out);
      run.onclick = function () {
        var prog = program(+ha.value, +pop.value || null); lastProg = prog;
        if (!prog) { out.innerHTML = '<div style="color:#fca5a5">Introdu o suprafață validă.</div>'; return; }
        var cost = costEstimate(prog.area_m2, lvl.value, prog.ecology.arbori_estimati);
        var rows = prog.zones.concat(prog.fixed_zones).map(function (z) {
          return '<tr style="border-bottom:1px solid rgba(255,255,255,.05)"><td style="padding:3px 4px">' + (z.mandatory ? '● ' : '') + z.name + '</td><td style="padding:3px 4px;text-align:right;color:#86efac">' + z.m2.toLocaleString('ro-RO') + ' mp</td><td style="padding:3px 4px;color:#64748b;font-size:10px">' + (z.norm || (z.fixed ? 'fix' : '')) + '</td></tr>';
        }).join('');
        out.innerHTML =
          '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">' + card(prog.area_ha + ' ha', 'sit') + card(prog.ecology.arbori_estimati, 'arbori (≥1/25mp)', '#34d399') + card((cost.total_lo / 1e6).toFixed(1) + '-' + (cost.total_hi / 1e6).toFixed(1) + ' M', 'RON estimat', '#fbbf24') + '</div>' +
          '<div style="font-size:11px;color:#86efac;font-weight:700;margin:6px 0 3px">Program spațial (norme Legea 24/2007)</div>' +
          '<table style="width:100%;border-collapse:collapse;font-size:12px"><tbody>' + rows + '</tbody></table>' +
          '<div style="font-size:11px;color:#86efac;font-weight:700;margin:10px 0 3px">Mobilier urban (norme)</div>' +
          '<div style="font-size:11px;color:#cbd5e1">🪑 ' + prog.furniture.banci + ' bănci · 🗑 ' + prog.furniture.cosuri + ' coșuri · 🚰 ' + prog.furniture.fantani_potabile + ' fântâni potabile · 🚻 ' + prog.furniture.toalete + ' toalete · 🚲 ' + prog.furniture.rastele_bici + ' rastele · 💡 ' + prog.furniture.stalpi_iluminat + ' stâlpi</div>' +
          '<div style="font-size:11px;color:#86efac;font-weight:700;margin:10px 0 3px">Verificări de conformitate</div>' +
          prog.checks.map(function (c) { return '<div style="font-size:11px;padding:2px 0;color:' + (c.ok ? '#34d399' : '#fbbf24') + '">' + (c.ok ? '✓' : '⚠') + ' ' + c.t + ' <span style="color:#64748b">(' + c.detail + ')</span></div>'; }).join('') +
          '<div style="font-size:11px;color:#86efac;font-weight:700;margin:10px 0 3px">Cost estimativ — ' + cost.label + '</div>' +
          '<div style="font-size:11px;color:#cbd5e1">Amenajare: <b>' + cost.amenajare_lo.toLocaleString('ro-RO') + '–' + cost.amenajare_hi.toLocaleString('ro-RO') + ' RON</b> (' + cost.ron_mp + ' RON/mp) · Arbori maturi: ' + cost.arbori_lo.toLocaleString('ro-RO') + '–' + cost.arbori_hi.toLocaleString('ro-RO') + ' RON</div>' +
          '<div style="font-size:10px;color:#fbbf24;margin-top:4px">⚠ ' + cost.disclaimer + '</div>' +
          '<div style="font-size:11px;color:#86efac;font-weight:700;margin:10px 0 3px">Specii native recomandate</div>' +
          '<div style="font-size:11px;color:#cbd5e1">' + species('native').slice(0, 10).map(function (s) { return s.ro + ' <i style="color:#64748b">(' + s.lat + ')</i>'; }).join(' · ') + '</div>';
        var act = el('div', { style: 'display:flex;gap:6px;margin-top:12px;flex-wrap:wrap' });
        var b3d = el('button', { style: ST.btn }, '🧊 Vezi în 3D'); b3d.onclick = function () { cur = 'p3d'; sync(); };
        var bbr = el('button', { style: ST.ghost }, '🏆 Folosește ca brief de concurs'); bbr.onclick = function () { cur = 'concurs'; sync(); setTimeout(function () { var nm = document.getElementById('lz-conc-name'); if (nm) { nm.value = 'Concurs — sit ' + prog.area_ha + ' ha'; var hi = document.getElementById('lz-conc-ha'); if (hi) hi.value = prog.area_ha; } }, 50); };
        out.appendChild(act); act.appendChild(b3d); act.appendChild(bbr);
      };
    }

    // ── TAB 3D ──
    function renderP3D() {
      if (!G.THREE) { content.innerHTML = '<div style="color:#fca5a5;font-size:13px">Three.js nu este disponibil.</div>'; return; }
      content.appendChild(el('div', { style: 'font-size:11px;color:#94a3b8;margin-bottom:6px' }, lastProg ? 'Parc procedural pentru ' + lastProg.area_ha + ' ha (din programul spațial generat).' : 'Vizualizare demo (2 ha). Generează un program în tab-ul „Proiectare parc" pentru a-l reflecta aici.'));
      var box = el('div', { style: 'width:100%;height:420px;background:#020617;border-radius:10px;overflow:hidden;border:1px solid rgba(255,255,255,.1)' }); content.appendChild(box);
      var ctr = el('div', { style: 'display:flex;gap:6px;margin-top:8px;flex-wrap:wrap' });
      var bNight = el('button', { style: ST.ghost }, '🌙 Zi/Noapte');
      var bSeason = el('button', { style: ST.ghost }, '🍂 Anotimp');
      var bShot = el('button', { style: ST.ghost }, '📷 Captură PNG');
      ctr.appendChild(bNight); ctr.appendChild(bSeason); ctr.appendChild(bShot); content.appendChild(ctr);
      var night = false, seasons = ['vara', 'toamna', 'iarna', 'primavara'], si = 0;
      setTimeout(function () { render3D(lastProg, box); }, 60);
      bNight.onclick = function () { night = !night; if (_3d.setNight) _3d.setNight(night); };
      bSeason.onclick = function () { si = (si + 1) % seasons.length; if (_3d.setSeason) _3d.setSeason(seasons[si]); bSeason.textContent = '🍂 ' + seasons[si]; };
      bShot.onclick = function () { if (_3d.screenshot) _3d.screenshot(); };
      content.appendChild(el('div', { style: 'font-size:10px;color:#64748b;margin-top:8px' }, 'Generator procedural Three.js (r128) — arbori (InstancedMesh), promenadă inelară, piazză, fântână, lac, mobilier. Trage pentru rotire, scroll pentru zoom. Modelele detaliate ale propunerilor de concurs (import .GLB/.OBJ) = Faza 2.'));
    }

    // ── TAB CONCURS ──
    function renderConcurs() {
      content.appendChild(el('div', { style: 'font-size:11px;border-radius:8px;padding:8px 10px;margin-bottom:8px;background:rgba(96,165,250,.1);border:1px solid rgba(96,165,250,.3);color:#93c5fd' }, 'Registru concursuri (Legea 98/2016 art.110-114). Brief PDF + criterii + punctaj juriu ponderat rulează aici. Portalul public de depunere anonimă + notificarea arhitecților prin e-mail = <b>Faza 2 (server)</b>.'));
      var list = el('div'); content.appendChild(list);
      function refresh() {
        var a = concurs.list();
        if (!a.length) { list.innerHTML = '<div style="color:#64748b;font-size:12px;padding:6px 0">Niciun concurs încă.</div>'; return; }
        list.innerHTML = '';
        a.forEach(function (c) {
          var rk = concurs.rank(c.id);
          var w = el('div', { style: 'background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:10px;margin-bottom:8px' });
          w.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center"><b>' + c.sit_name + '</b><span style="font-size:10px;color:#64748b">' + (CONCURS_TYPES[c.type] || c.type) + '</span></div>' +
            '<div style="font-size:11px;color:#94a3b8;margin:3px 0">' + (c.area_ha || '—') + ' ha · ' + (c.budget_max ? c.budget_max.toLocaleString('ro-RO') + ' RON' : 'buget nespecificat') + ' · ' + c.submissions.length + ' propuneri</div>' +
            (rk.length ? '<div style="font-size:11px;color:#86efac">Clasament: ' + rk.slice(0, 3).map(function (r, i) { return (i + 1) + '. ' + r.code + ' (' + r.total + ')'; }).join(' · ') + '</div>' : '');
          var act = el('div', { style: 'display:flex;gap:6px;margin-top:8px;flex-wrap:wrap' });
          var bpdf = el('button', { style: ST.ghost }, '📄 Brief PDF'); bpdf.onclick = function () { generateBriefPDF(c); };
          var bsub = el('button', { style: ST.ghost }, '➕ Propunere (juriu)'); bsub.onclick = function () { addSubFlow(c); };
          var bdel = el('button', { style: ST.ghost }, '✕'); bdel.onclick = function () { concurs.remove(c.id); refresh(); };
          act.appendChild(bpdf); act.appendChild(bsub); act.appendChild(bdel); w.appendChild(act);
          list.appendChild(w);
        });
      }
      function addSubFlow(c) {
        var title = prompt('Titlu propunere (anonimă — primește cod automat):'); if (!title) return;
        var sub = concurs.addSubmission(c.id, { title: title });
        // scor pe fiecare criteriu (1-10)
        var scores = {};
        c.criteria.forEach(function (cr) { var v = prompt('Punctaj „' + cr.name + '" (1-10):', '7'); scores[cr.name] = Math.max(0, Math.min(10, +v || 0)); });
        var a = concurs.list(); var cc = a.filter(function (x) { return x.id === c.id; })[0]; var ss = cc.submissions[cc.submissions.length - 1]; ss.scores = scores; _concSave(a);
        refresh();
      }
      refresh();
      content.appendChild(el('div', { style: ST.label }, 'Lansează concurs nou'));
      var g = el('div', { style: 'display:grid;grid-template-columns:2fr 1fr;gap:6px' });
      var nm = el('input', { style: ST.inp, id: 'lz-conc-name', placeholder: 'denumire sit' });
      var ty = el('select', { style: ST.inp }); Object.keys(CONCURS_TYPES).forEach(function (kk) { ty.appendChild(el('option', { value: kk }, CONCURS_TYPES[kk].split(' (')[0])); });
      g.appendChild(nm); g.appendChild(ty); content.appendChild(g);
      var g2 = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr 50px;gap:6px;margin-top:6px' });
      var ha = el('input', { style: ST.inp, id: 'lz-conc-ha', type: 'number', step: '0.1', placeholder: 'ha' });
      var bud = el('input', { style: ST.inp, type: 'number', placeholder: 'buget RON' });
      var add = el('button', { style: ST.btn }, '+'); g2.appendChild(ha); g2.appendChild(bud); g2.appendChild(add); content.appendChild(g2);
      add.onclick = function () { if (!nm.value.trim()) return; concurs.add({ sit_name: nm.value, type: ty.value, area_ha: +ha.value || 0, budget_max: +bud.value || 0, status: 'publicat' }); renderConcurs(); };
    }

    // ── TAB CLIMĂ (deleg UHI) ──
    function renderClima() {
      content.innerHTML = '<div style="font-size:12px;color:#cbd5e1;line-height:1.5;margin-bottom:10px">Componenta climatică a LOISIR — <b>insula de căldură urbană (UHI)</b> și soluțiile bazate pe natură (NbS): calculator de răcire (Bowler 2010, Gill 2007, C40) + scorecard verde vs Singapore/Copenhaga/Paris.</div>';
      var b = el('button', { style: ST.btn }, '🌡 Deschide calculatorul UHI / scorecard verde');
      b.onclick = function () { dispose3D(); ov.remove(); if (G.UHI && G.UHI.openPanel) G.UHI.openPanel(); else alert('Modulul UHI se inițializează.'); };
      content.appendChild(b);
      content.appendChild(el('div', { style: 'font-size:11px;color:#94a3b8;margin-top:12px;line-height:1.5' }, '🛰 Harta termică din satelit (Landsat 8/9 LST: K1=774.88, K2=1321.08 / Sentinel-3) + coridoarele de aer rece (model Stuttgart Klimaatlas, vânt ERA5) + monitorizarea NDVI a parcurilor = pipeline Copernicus pe server (Faza 2). Calculatoarele de mai sus rulează aici, pe formule reale.'));
    }

    sync();
    ov.appendChild(m); document.body.appendChild(ov);
  }

  // ── PATCH capitol în Masterplan + PMUD (non-invaziv) ──
  function patchReports() {
    ['_StratMasterplanContent', '_StratPMUDContent'].forEach(function (name) {
      var obj = G[name]; if (!obj || typeof obj.build !== 'function' || obj.__loisirPatched) return;
      var orig = obj.build.bind(obj);
      obj.build = function (D, ctx) { orig(D, ctx); try { chapter(D); } catch (e) { console.warn('[Loisir chapter]', e); } };
      obj.__loisirPatched = true;
    });
  }
  var _t = 0, _iv = setInterval(function () { _t++; patchReports(); if (_t > 40) clearInterval(_iv); }, 300); patchReports();

  G.Loisir = {
    catalog: catalog, program: program, species: species, costEstimate: costEstimate,
    concurs: concurs, generateBriefPDF: generateBriefPDF, render3D: render3D, dispose3D: dispose3D,
    chapter: chapter, openPanel: openPanel,
    ZONES: ZONES, FIXED_ZONES: FIXED_ZONES, SPECIES: SPECIES, LEVELS: LEVELS, CAT_TYPES: CAT_TYPES, CRITERIA: CRITERIA
  };
  console.log('[Loisir] modul complet încărcat (window.Loisir) — catalog · proiectare · 3D · concurs · climă');
})(window);
