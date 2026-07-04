/* ============================================================================
 * UrbanX — ENGINE DOCUMENTAȚII TEHNICE (js/urbanx-doc-engine.js)
 * Inima modulului: primește datele proiectului (din AEDIS SAU manual) → detectează
 * funcțiunea → auto-calculează indicatorii → VALIDEAZĂ în timp real (conform/
 * neconform/warning cu temei legal) → orchestrează generarea dosarului (~80 DOCX+PDF).
 * 100% CLIENT-SIDE. Reutilizează _SEISMIC_ZONES (P100-1/2013) + normele existente.
 *
 * window.UXDoc: FUNCTIUNI · detectFunctiune · autoCalc · valideaza · dateFromAEDIS
 * ========================================================================== */
(function (G) {
  'use strict';

  // ── Registru funcțiuni (defaults + norme per funcțiune) ───────────────────
  // pot_rec/cut_rec = orientativ; sv_min = % spații verzi; pk = normă parcaje;
  // psi = categorie pericol implicit; grad = grad rezistență foc rec; struct = sistem rec.
  var FUNCTIUNI = {
    'hala-industriala': { label: 'Hală industrială / logistică / depozit', cat: 'industrial', pot_rec: 55, cut_rec: 0.9, sv_min: 20, pk: { mod: 'per_mp', val: 200 }, psi: 'C', grad: 'II', struct: 'metalica', hlib: 6.5, risc: 'mediu' },
    'locuinta-individuala': { label: 'Locuință individuală', cat: 'rezidential', pot_rec: 35, cut_rec: 0.9, sv_min: 30, pk: { mod: 'per_unit', val: 1 }, psi: 'D', grad: 'II', struct: 'zidarie', risc: 'mic' },
    'bloc-locuinte': { label: 'Bloc de locuințe colective', cat: 'rezidential', pot_rec: 40, cut_rec: 2.5, sv_min: 30, pk: { mod: 'per_apt', val: 1 }, psi: 'D', grad: 'II', struct: 'beton', risc: 'mic' },
    'birouri': { label: 'Clădire de birouri / office', cat: 'tertiar', pot_rec: 50, cut_rec: 3.0, sv_min: 20, pk: { mod: 'per_mp', val: 50 }, psi: 'D', grad: 'II', struct: 'beton', risc: 'mediu' },
    'spatiu-comercial': { label: 'Spațiu comercial / retail', cat: 'comercial', pot_rec: 60, cut_rec: 2.0, sv_min: 10, pk: { mod: 'per_mp', val: 50 }, psi: 'C', grad: 'II', struct: 'mixt', risc: 'mediu' },
    'mall': { label: 'Mall / centru comercial', cat: 'comercial', pot_rec: 55, cut_rec: 2.5, sv_min: 10, pk: { mod: 'per_mp', val: 40 }, psi: 'C', grad: 'I', struct: 'beton', risc: 'mediu' },
    'scoala': { label: 'Școală / liceu / învățământ', cat: 'invatamant', pot_rec: 35, cut_rec: 1.5, sv_min: 30, pk: { mod: 'per_mp', val: 100 }, psi: 'D', grad: 'II', struct: 'beton', risc: 'mic' },
    'gradinita': { label: 'Grădiniță / creșă', cat: 'invatamant', pot_rec: 30, cut_rec: 1.0, sv_min: 35, pk: { mod: 'per_mp', val: 100 }, psi: 'D', grad: 'II', struct: 'zidarie', risc: 'mic' },
    'medical': { label: 'Unitate medicală (cabinet/clinică/spital)', cat: 'medical', pot_rec: 40, cut_rec: 2.0, sv_min: 25, pk: { mod: 'per_mp', val: 60 }, psi: 'D', grad: 'I', struct: 'beton', risc: 'mediu' },
    'hotelier': { label: 'Hotel / motel / pensiune', cat: 'turism', pot_rec: 45, cut_rec: 2.5, sv_min: 25, pk: { mod: 'per_2cam', val: 1 }, psi: 'D', grad: 'II', struct: 'beton', risc: 'mediu' },
    'centru-social': { label: 'Centru social / vârstnici', cat: 'social', pot_rec: 35, cut_rec: 1.5, sv_min: 30, pk: { mod: 'per_mp', val: 100 }, psi: 'D', grad: 'II', struct: 'beton', risc: 'mic' },
    'parc-fotovoltaic': { label: 'Parc fotovoltaic', cat: 'energie', pot_rec: 5, cut_rec: 0.05, sv_min: 20, pk: { mod: 'fix', val: 2 }, psi: 'E', grad: 'II', struct: 'usoara', risc: 'mic' },
    'bess': { label: 'BESS — stocare energie', cat: 'energie', pot_rec: 30, cut_rec: 0.3, sv_min: 20, pk: { mod: 'fix', val: 2 }, psi: 'C', grad: 'I', struct: 'metalica', risc: 'mare' },
    'skid': { label: 'SKID GPL / hidrogen / gaze', cat: 'energie', pot_rec: 20, cut_rec: 0.2, sv_min: 20, pk: { mod: 'fix', val: 2 }, psi: 'A', grad: 'I', struct: 'metalica', risc: 'foarte_mare' },
    'statie-transformare': { label: 'Stație de transformare', cat: 'energie', pot_rec: 40, cut_rec: 0.4, sv_min: 15, pk: { mod: 'fix', val: 2 }, psi: 'C', grad: 'I', struct: 'beton', risc: 'mediu' },
    'infrastructura-drum': { label: 'Infrastructură rutieră / drum', cat: 'infrastructura', pot_rec: 0, cut_rec: 0, sv_min: 0, pk: { mod: 'fix', val: 0 }, psi: 'E', grad: 'II', struct: 'beton', risc: 'mic' },
    'pod': { label: 'Pod / pasarelă / viaduct', cat: 'infrastructura', pot_rec: 0, cut_rec: 0, sv_min: 0, pk: { mod: 'fix', val: 0 }, psi: 'E', grad: 'I', struct: 'beton', risc: 'mic' },
    'parcare': { label: 'Parcare supraterană / subterană', cat: 'infrastructura', pot_rec: 60, cut_rec: 2.0, sv_min: 10, pk: { mod: 'fix', val: 0 }, psi: 'C', grad: 'I', struct: 'beton', risc: 'mediu' },
    'sport': { label: 'Sală sport / stadion / bazin', cat: 'sport', pot_rec: 45, cut_rec: 1.2, sv_min: 30, pk: { mod: 'per_mp', val: 30 }, psi: 'D', grad: 'II', struct: 'metalica', risc: 'mediu' },
    'agricol': { label: 'Fermă / seră / siloz agricol', cat: 'agricol', pot_rec: 40, cut_rec: 0.6, sv_min: 20, pk: { mod: 'fix', val: 2 }, psi: 'C', grad: 'III', struct: 'metalica', risc: 'mediu' },
    'cladire-mixta': { label: 'Clădire mixtă (comercial + rezidențial)', cat: 'mixt', pot_rec: 50, cut_rec: 2.8, sv_min: 20, pk: { mod: 'per_apt', val: 1 }, psi: 'C', grad: 'II', struct: 'beton', risc: 'mediu' }
  };
  var FMAP = [
    [/hala|depozit|logistic|warehouse|productie|industrial|atelier/i, 'hala-industriala'],
    [/bloc|apartament|colectiv|ansamblu.?rezid|ANL/i, 'bloc-locuinte'],
    [/locuint|casa|vila|duplex|triplex|individual/i, 'locuinta-individuala'],
    [/mall|centru.?comercial/i, 'mall'],
    [/comercial|magazin|retail|supermarket|hipermarket|showroom/i, 'spatiu-comercial'],
    [/birou|office|sediu|administrativ|coworking/i, 'birouri'],
    [/gradinit|cresa|after.?school/i, 'gradinita'],
    [/scoala|liceu|gimnaziu|invatamant|campus|universit/i, 'scoala'],
    [/spital|clinic|cabinet|medical|sanatate|policlinic/i, 'medical'],
    [/hotel|motel|pensiune|hostel|cazare/i, 'hotelier'],
    [/social|batrani|varstnici|centru.?zi/i, 'centru-social'],
    [/fotovoltaic|solar|\bFV\b|\bPV\b|parc.?solar/i, 'parc-fotovoltaic'],
    [/\bBESS\b|stocare|baterie|acumulare/i, 'bess'],
    [/skid|GPL|hidrogen|\bH2\b|gaze.?naturale/i, 'skid'],
    [/transformare|trafo|\bstatie\b.*electric/i, 'statie-transformare'],
    [/drum|stradal|rutier|asfalt/i, 'infrastructura-drum'],
    [/\bpod\b|pasarela|viaduct/i, 'pod'],
    [/parcare|parking|garaj/i, 'parcare'],
    [/sport|stadion|arena|sala|bazin|fitness/i, 'sport'],
    [/ferma|zootehnic|agricol|sera|siloz|cereale/i, 'agricol'],
    [/mixt/i, 'cladire-mixta']
  ];
  function detectFunctiune(text) { text = String(text || ''); for (var i = 0; i < FMAP.length; i++) if (FMAP[i][0].test(text)) return FMAP[i][1]; return 'hala-industriala'; }

  // mapare AEDIS.fn → funcțiune documentații
  var AEDIS_FN_MAP = { industrie: 'hala-industriala', rezidential_colectiv: 'bloc-locuinte', locuinta_individuala: 'locuinta-individuala', birouri: 'birouri', comercial: 'spatiu-comercial', hotel: 'hotelier', mixt: 'cladire-mixta' };

  // ── Auto-calcul indicatori (câmpurile VERZI din mockup) ───────────────────
  function _judByName(nume) {
    // mapare nume județ → cod _SEISMIC_ZONES (parțial; fallback zonă medie)
    var M = { 'iasi': 'IS', 'iași': 'IS', 'vrancea': 'VN', 'buzau': 'BZ', 'buzău': 'BZ', 'prahova': 'PH', 'galati': 'GL', 'galați': 'GL', 'vaslui': 'VS', 'botosani': 'BT', 'botoșani': 'BT', 'suceava': 'SV', 'neamt': 'NT', 'neamț': 'NT', 'bacau': 'BC', 'bacău': 'BC', 'cluj': 'CJ', 'timis': 'TM', 'timiș': 'TM', 'brasov': 'BV', 'brașov': 'BV', 'constanta': 'CT', 'constanța': 'CT', 'sibiu': 'SB', 'bucuresti': 'B', 'bucurești': 'B', 'ilfov': 'IF' };
    var k = String(nume || '').toLowerCase().replace(/^(municipiul|orasul|oras|comuna|judetul|jud\.?)\s+/, '').trim();
    return M[k] || null;
  }
  function seismicFor(judet) {
    var z = G._SEISMIC_ZONES || {};
    var cod = /^[A-Z]{1,2}$/.test(judet || '') ? judet : _judByName(judet);
    if (cod && z[cod]) return { ag: z[cod].ag, Tc: z[cod].Tc, zona: z[cod].zona, cod: cod };
    return { ag: 0.20, Tc: 1.0, zona: 'C', cod: cod || '?', estimat: true };
  }
  // Zone climatice — sk zăpadă (CR 1-1-3/2012) + Te iarnă (SR 1907) pe cod județ
  function climaFor(judet) {
    var cod = /^[A-Z]{1,2}$/.test(judet || '') ? judet : _judByName(judet);
    // sk (kN/m²) zonă zăpadă + Te (°C) temperatură exterioară de calcul
    var SK = { 'IS': 2.5, 'VN': 2.0, 'BZ': 2.0, 'PH': 2.5, 'GL': 2.5, 'VS': 2.5, 'BT': 2.5, 'SV': 2.5, 'NT': 2.5, 'BC': 2.5, 'CJ': 2.0, 'TM': 1.5, 'BV': 2.0, 'CT': 1.5, 'SB': 2.0, 'B': 2.0, 'IF': 2.0 };
    var TE = { 'IS': -18, 'VN': -15, 'BZ': -15, 'PH': -18, 'GL': -15, 'VS': -18, 'BT': -21, 'SV': -21, 'NT': -18, 'BC': -18, 'CJ': -18, 'TM': -15, 'BV': -21, 'CT': -12, 'SB': -18, 'B': -15, 'IF': -15 };
    return { sk: (cod && SK[cod]) || 2.0, Te: (cod && TE[cod]) || -18, cod: cod || '?', estimat: !(cod && SK[cod]) };
  }
  function autoCalc(d) {
    d = d || {}; var Steren = +d.Steren || 0, Sc = +d.Sc || 0, Sd = +d.Sd || 0;
    var fn = FUNCTIUNI[d.functiune] || FUNCTIUNI['hala-industriala'];
    var out = {};
    out.POT = Steren ? +(Sc / Steren * 100).toFixed(1) : 0;
    out.CUT = Steren ? +(Sd / Steren).toFixed(2) : 0;
    out.sv_min_pct = fn.sv_min; out.sv_min_mp = Math.round(Steren * fn.sv_min / 100);
    // parcaje necesare
    var pk = fn.pk; var nrParcaje = 0;
    if (pk.mod === 'per_mp') nrParcaje = Math.ceil(Sc / pk.val);
    else if (pk.mod === 'per_unit' || pk.mod === 'per_apt') nrParcaje = Math.max(1, Math.ceil((d.nrUnitati || 1) * pk.val));
    else if (pk.mod === 'per_2cam') nrParcaje = Math.ceil((d.nrCamere || 2) / 2 * pk.val);
    else nrParcaje = pk.val;
    out.parcaje_necesare = nrParcaje; out.parcaje_norma = pk;
    // seismic + climă din județ (auto — P100-1/2013 + CR 1-1-3)
    out.seismic = seismicFor(d.judet); out.clima = climaFor(d.judet);
    // grad/psi/struct default
    out.psi_default = fn.psi; out.grad_default = fn.grad; out.struct_default = fn.struct;
    // verificări PSI automate (praguri)
    out.sprinklere_oblig = Sc > 3000 || (+d.H || 0) > 28;
    out.idsi_oblig = Sc > 2500;
    out.lift_oblig = (+d.niv_supraterane || 0) >= 5;
    return out;
  }

  // ── VALIDARE în timp real (panoul din mockup) ─────────────────────────────
  function valideaza(d) {
    d = d || {}; var ac = autoCalc(d); var checks = [];
    var Sc = +d.Sc || 0, H = +d.H || 0;
    function chk(ok, txt, norma, sev) { checks.push({ status: ok === true ? 'conform' : ok === false ? 'neconform' : 'warning', text: txt, norma: norma || '', sev: sev || (ok === false ? 'critic' : 'info') }); }
    // POT / CUT
    if (d.POT_max != null) chk(ac.POT <= +d.POT_max, 'POT propus ' + ac.POT + '% ' + (ac.POT <= +d.POT_max ? '<' : '>') + ' POT max ' + d.POT_max + '%', 'RGU / PUG-PUZ');
    if (d.CUT_max != null) chk(ac.CUT <= +d.CUT_max, 'CUT propus ' + ac.CUT + ' ' + (ac.CUT <= +d.CUT_max ? '<' : '>') + ' CUT max ' + d.CUT_max, 'RGU / PUG-PUZ');
    // retrageri — aliniament/față, laterale, spate
    function chkRetr(prop, min, lbl, norma) { if (d[prop] != null && d[min] != null && d[min] !== '') chk(+d[prop] >= +d[min], lbl + ' ' + d[prop] + 'm ' + (+d[prop] >= +d[min] ? '≥' : '<') + ' minim ' + d[min] + 'm impus prin CU', norma); }
    chkRetr('retragere_fata', 'retragere_fata_min', 'Retragere/aliniament stradal', 'CU / RLU · aliniament');
    chkRetr('retragere_lateral', 'retragere_lateral_min', 'Retragere laterală', 'CU / Cod civil art. 612 (min. 0,60 m / H/2)');
    chkRetr('retragere_spate', 'retragere_spate_min', 'Retragere spate', 'CU / Cod civil art. 612');
    // parcaje
    if (d.parcaje_propuse != null) chk(+d.parcaje_propuse >= ac.parcaje_necesare, 'Parcaje propuse ' + d.parcaje_propuse + ' ' + (+d.parcaje_propuse >= ac.parcaje_necesare ? '≥' : '<') + ' necesar ' + ac.parcaje_necesare, 'NP 067/2002 / HG 525/1996');
    // sprinklere (P118): SC>3000 sau H>28
    if (Sc > 3000 || H > 28) chk('warn', 'SC ' + Sc.toLocaleString('ro-RO') + ' mp' + (Sc > 3000 ? ' > 3.000 mp' : '') + (H > 28 ? ' / H ' + H + 'm > 28m' : '') + ' — sprinklere obligatorii', 'P118-2/2013 + SR EN 12845');
    // IDSI (detectare-alarmare): SC>2500
    if (Sc > 2500) chk('warn', 'SC ' + Sc.toLocaleString('ro-RO') + ' mp > 2.500 mp — IDSI (detectare-semnalizare) obligatorie', 'P118-3/2015');
    // desfumare: H>8 (hala) / SC>1000
    if ((d.functiune === 'hala-industriala' && (H > 8 || Sc > 1000))) chk('warn', 'Înălțime ' + H + 'm / SC ' + Sc + 'mp — desfumare obligatorie (trape SHEV ≥ 0,5–2% din SC)', 'P118/1-2015 art. 8');
    // lift P+4
    if (d.niv_supraterane != null && +d.niv_supraterane >= 5) chk('warn', 'Regim P+' + (+d.niv_supraterane - 1) + ' — lift obligatoriu', 'NP 051/2012 + ISCIR PT R2');
    // compartiment incendiu (civil max ~10000, hala pe risc)
    var compMax = d.functiune === 'hala-industriala' ? ({ mic: 12000, mediu: 6000, mare: 3000 }[ac_risc(d)] || 6000) : 10000;
    if (Sc) chk(Sc <= compMax, 'Compartiment incendiu ' + Sc.toLocaleString('ro-RO') + ' mp ' + (Sc <= compMax ? '<' : '>') + ' ' + compMax.toLocaleString('ro-RO') + ' mp maxim', 'P118/1-2015 Tab. 2.2');
    var neconf = checks.filter(function (c) { return c.status === 'neconform'; }).length;
    return { checks: checks, calc: ac, neconformitati: neconf, ok: neconf === 0 };
  }
  function ac_risc(d) { var fn = FUNCTIUNI[d.functiune]; return (fn && fn.risc) || 'mediu'; }

  // ── PUNTEA AEDIS → date proiect (pre-completare din volum 3D + parcelă) ────
  function dateFromAEDIS() {
    var d = {}; var S = G.S; if (!S || !S.parcels) return d;
    var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel]; if (!ap) return d;
    d.nrcad = ap.nrcad || ''; d.uat = ap.uat || ''; d.judet = ap.judet || (ap.uat || '');
    d.Steren = ap.area || 0; d.utr = ap.utr || '';
    // reguli UTR (POT/CUT max + retrageri)
    try {
      var reg = (G.REGULI && G.REGULI[ap.utr]) || (ap.params) || {};
      d.POT_max = reg.pot || (ap.params && ap.params.pot) || null; d.CUT_max = reg.cut || (ap.params && ap.params.cut) || null;
      function _numR(x) { if (x == null) return null; var m = String(x).match(/[\d.]+/); return m ? +m[0] : null; }
      d.retragere_fata_min = _numR(reg.retragere_fata) || null;
      d.retragere_lateral_min = _numR(reg.retragere_lat || reg.retragere_lateral) || null;
      d.retragere_spate_min = _numR(reg.retragere_spate) || 5;
    } catch (e) {}
    // din volumul AEDIS
    try {
      var A = G.AEDIS;
      if (A && A.fn) { d.functiune = AEDIS_FN_MAP[A.fn] || detectFunctiune(A.fn); }
      // obiect proiectat Hala/SKID (dacă există)
      if (G._HALE_PROIECTE && G._HALE_PROIECTE[d.nrcad || 'x']) { var h = G._HALE_PROIECTE[d.nrcad] || G._HALE_PROIECTE['x']; d.functiune = 'hala-industriala'; d.Sc = h.Sc; d.Sd = h.Sd; d.H = h.H_coama; d.niv_supraterane = 1; }
      else if (G._SKID_PROIECTE && (G._SKID_PROIECTE[d.nrcad] || G._SKID_PROIECTE['x'])) { d.functiune = 'skid'; }
      else if (A && A.corpuri && A.corpuri[0]) { var c = A.corpuri[0]; d.niv_supraterane = c.niv || 1; var hNiv = c.hNiv || 3; d.H = +(c.niv * hNiv).toFixed(1); if (d.Steren && d.POT_max) d.Sc = Math.round(d.Steren * (d.POT_max / 100) * 0.85); if (d.Sc) d.Sd = Math.round(d.Sc * (c.niv || 1)); }
    } catch (e) {}
    d.functiune = d.functiune || 'hala-industriala';
    d._source = 'AEDIS'; return d;
  }

  G.UXDoc = { FUNCTIUNI: FUNCTIUNI, detectFunctiune: detectFunctiune, autoCalc: autoCalc, valideaza: valideaza, dateFromAEDIS: dateFromAEDIS, seismicFor: seismicFor, AEDIS_FN_MAP: AEDIS_FN_MAP };
  console.log('[UXDoc] engine documentații încărcat (window.UXDoc) — client-side, fără server');
})(window);
