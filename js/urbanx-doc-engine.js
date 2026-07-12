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
  function _stripDia(s) { return String(s || '').toLowerCase().replace(/[ăâ]/g, 'a').replace(/î/g, 'i').replace(/[șş]/g, 's').replace(/[țţ]/g, 't'); }
  function _judByName(nume) {
    // mapare COMPLETĂ nume județ → cod _SEISMIC_ZONES (toate 41 + București), diacritice-insensibilă
    var M = {
      'alba': 'AB', 'arad': 'AR', 'arges': 'AG', 'bacau': 'BC', 'bihor': 'BH', 'bistrita': 'BN', 'bistrita-nasaud': 'BN',
      'botosani': 'BT', 'braila': 'BR', 'brasov': 'BV', 'buzau': 'BZ', 'caras-severin': 'CS', 'caras': 'CS', 'calarasi': 'CL',
      'cluj': 'CJ', 'constanta': 'CT', 'covasna': 'CV', 'dambovita': 'DB', 'dolj': 'DJ', 'galati': 'GL', 'giurgiu': 'GR',
      'gorj': 'GJ', 'harghita': 'HR', 'hunedoara': 'HD', 'ialomita': 'IL', 'iasi': 'IS', 'ilfov': 'IF', 'maramures': 'MM',
      'mehedinti': 'MH', 'mures': 'MS', 'neamt': 'NT', 'olt': 'OT', 'prahova': 'PH', 'salaj': 'SJ', 'satu mare': 'SM', 'satu-mare': 'SM',
      'sibiu': 'SB', 'suceava': 'SV', 'teleorman': 'TR', 'timis': 'TM', 'tulcea': 'TL', 'valcea': 'VL', 'vaslui': 'VS',
      'vrancea': 'VN', 'bucuresti': 'B'
    };
    var k = _stripDia(nume).replace(/^(municipiul|orasul|oras|comuna|judetul|jud\.?)\s+/, '').trim();
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
    // sk (kN/m²) zonă zăpadă CR 1-1-3/2012 + Te (°C) temperatură exterioară SR 1907 — TOATE județele
    var SK = { 'AB': 1.5, 'AR': 1.0, 'AG': 2.0, 'BC': 2.5, 'BH': 1.5, 'BN': 2.0, 'BT': 2.5, 'BR': 2.5, 'BV': 2.0, 'BZ': 2.0, 'CS': 1.5, 'CL': 2.0, 'CJ': 2.0, 'CT': 1.5, 'CV': 2.0, 'DB': 2.0, 'DJ': 1.5, 'GL': 2.5, 'GR': 2.0, 'GJ': 1.5, 'HR': 2.5, 'HD': 1.5, 'IL': 2.0, 'IS': 2.5, 'IF': 2.0, 'MM': 2.5, 'MH': 1.5, 'MS': 1.5, 'NT': 2.5, 'OT': 1.5, 'PH': 2.5, 'SJ': 1.5, 'SM': 1.5, 'SB': 2.0, 'SV': 2.5, 'TR': 2.0, 'TM': 1.5, 'TL': 1.5, 'VL': 2.0, 'VS': 2.5, 'VN': 2.0, 'B': 2.0 };
    var TE = { 'AB': -18, 'AR': -15, 'AG': -15, 'BC': -18, 'BH': -15, 'BN': -18, 'BT': -21, 'BR': -15, 'BV': -21, 'BZ': -15, 'CS': -15, 'CL': -15, 'CJ': -18, 'CT': -12, 'CV': -21, 'DB': -15, 'DJ': -15, 'GL': -15, 'GR': -15, 'GJ': -15, 'HR': -21, 'HD': -18, 'IL': -15, 'IS': -18, 'IF': -15, 'MM': -21, 'MH': -15, 'MS': -18, 'NT': -18, 'OT': -15, 'PH': -18, 'SJ': -18, 'SM': -15, 'SB': -18, 'SV': -21, 'TR': -15, 'TM': -15, 'TL': -12, 'VL': -15, 'VS': -18, 'VN': -15, 'B': -15 };
    return { sk: (cod && SK[cod]) || 2.0, Te: (cod && TE[cod]) || -18, cod: cod || '?', estimat: !(cod && SK[cod]) };
  }
  function autoCalc(d) {
    d = d || {}; var Steren = +d.Steren || 0, Sc = +d.Sc || 0, Sd = +d.Sd || 0;
    // Multi-corp: dacă există corpuri (C1/C2/C3...), indicatorii se calculează pe SUMA amprentelor/desfășuratelor.
    if (d.corpuri && d.corpuri.length) {
      var sSc = 0, sSd = 0; d.corpuri.forEach(function (c) { sSc += +c.Sc || 0; sSd += +c.Sd || 0; });
      if (sSc > 0) Sc = sSc; if (sSd > 0) Sd = sSd;
    }
    var fn = FUNCTIUNI[d.functiune] || FUNCTIUNI['hala-industriala'];
    // ── Reconciliere SU ↔ SC ↔ SD (utilă ↔ construită ↔ desfășurată) — completează ce lipsește ──
    // Coeficient util/desfășurat (SU/SD) pe categoria funcțiunii; peretii/circulațiile consumă restul.
    var suCoef = fn.su_coef || ({ rezidential: 0.82, birouri: 0.78, comercial: 0.84, hotelier: 0.72, medical: 0.80, invatamant: 0.80, social: 0.80, industrial: 0.90, energie: 0.85, agrement: 0.85 }[fn.cat]) || 0.80;
    // ── MODEL COMPLET DE NIVELE: subsol / demisol / parter / mezanin / etaje / etaj tehnic / penthouse ──
    var nSub = Math.max(0, Math.round(+d.n_subsol || 0));
    var hasDem = !!d.demisol, hasMez = !!d.mezanin, hasEtj = !!d.etaj_tehnic, hasPh = !!d.penthouse;
    var nivSupra = Math.max(1, +d.niv_supraterane || 1);      // P + etaje (include parterul)
    var etaje = Math.max(0, nivSupra - 1);
    var parts = [];
    if (nSub > 0) parts.push((nSub > 1 ? nSub : '') + 'S');
    if (hasDem) parts.push('D');
    parts.push('P');
    if (hasMez) parts.push('M');
    if (etaje > 0) parts.push(etaje + 'E');
    if (hasEtj) parts.push('Et');
    if (hasPh) parts.push('Ph');
    var _regimComplet = parts.join('+');                       // ex. 2S+D+P+M+4E+Et+Ph
    var _nivSubterane = nSub + (hasDem ? 1 : 0);
    var _nivSupraTotal = nivSupra + (hasMez ? 1 : 0) + (hasEtj ? 1 : 0) + (hasPh ? 1 : 0);
    var _nivTotal = _nivSubterane + _nivSupraTotal;
    var nivR = Math.max(1, _nivTotal), Su = +d.Su || 0;   // pentru reconcilierea SC din SD (amprenta ≈ SD / nr niveluri totale)
    if (!Sd) { if (Sc) Sd = Sc * nivR; else if (Su) Sd = Math.round(Su / suCoef); }   // desfășurată din amprentă×niveluri sau din utilă
    if (!Sc && Sd) Sc = Math.round(Sd / nivR);                                          // amprentă din desfășurată/niveluri
    if (!Su && Sd) Su = Math.round(Sd * suCoef);                                        // utilă din desfășurată×coeficient
    var out = {}; out.Sc_total = Sc; out.Sd_total = Sd; out.Su_total = Su; out.su_coef = suCoef; out.nr_corpuri = (d.corpuri && d.corpuri.length) || 0;
    out.regim_complet = _regimComplet; out.niv_subterane = _nivSubterane; out.niv_supraterane_total = _nivSupraTotal; out.niv_total = _nivTotal;
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
    out.risc_incendiu = fn.risc || 'mediu';
    // verificări PSI automate (praguri)
    var H = +d.H || 0, niv = +d.niv_supraterane || 0;
    out.sprinklere_oblig = Sc > 3000 || H > 28;
    // IDSAI obligatorie si la destinatiile institutionale cu persoane vulnerabile (cresa/gradinita,
    // centru social, unitati medicale), indiferent de arie — detectarea timpurie e critica cand
    // evacuarea e asistata/lenta, acelasi principiu ca la hidranti_int_oblig (vezi lista de mai jos).
    out.idsi_oblig = Sc > 2500 || ['gradinita', 'centru-social', 'medical'].indexOf(d.functiune) >= 0;
    out.lift_oblig = niv >= 5;

    // ── PARAMETRI TEHNICI DERIVAȚI COMPLEȚI (toți, nu doar categoria PSI) ──
    // Clasa de importanță seismică (P100-1/2013 tab.4.2) + factor γI
    var aglomerari = ['mall', 'spatiu-comercial', 'sport', 'scoala', 'gradinita', 'hotelier'];
    var critice = ['medical', 'bess', 'skid', 'statie-transformare', 'pod'];
    if (critice.indexOf(d.functiune) >= 0) { out.clasa_importanta = 'II'; out.gamma_I = 1.2; }
    else if (aglomerari.indexOf(d.functiune) >= 0) { out.clasa_importanta = (d.functiune === 'mall' || d.functiune === 'medical') ? 'II' : 'III'; out.gamma_I = out.clasa_importanta === 'II' ? 1.2 : 1.0; }
    else if (d.functiune === 'infrastructura-drum') { out.clasa_importanta = 'IV'; out.gamma_I = 0.8; }
    else { out.clasa_importanta = 'III'; out.gamma_I = 1.0; }
    if (d.functiune === 'pod') { out.clasa_importanta = 'III (SR EN 1998-2)'; out.gamma_I = 1.3; }
    if (d.functiune === 'medical' || d.functiune === 'skid') { out.gamma_I = 1.4; out.clasa_importanta = (d.functiune === 'skid' ? 'II-III' : 'I-II'); }
    // Categoria de importanță (HG 766/1997)
    out.categorie_importanta = (critice.indexOf(d.functiune) >= 0 || d.functiune === 'mall' || d.functiune === 'parcare') ? 'B — deosebită'
      : (d.functiune === 'infrastructura-drum') ? 'C — normală (D anexe)' : 'C — normală';
    // Factor de comportare q (funcție de sistemul structural)
    var qmap = { metalica: 4.0, beton: 3.0, prefabricat: 3.0, mixt: 3.0, zidarie: 2.5, lemn: 2.5, lsf: 2.0, usoara: 1.5 };
    out.factor_q = qmap[(d.struct || fn.struct)] || 3.0;
    // Categoria de pericol / risc incendiu → grad RF (deja) + arie compartiment max
    var compBase = { 'A': 2000, 'B': 3000, 'C': 4000, 'D': 6000, 'E': 8000 };
    var compMax = d.functiune === 'hala-industriala' ? ({ mic: 12000, mediu: 6000, mare: 3000, foarte_mare: 2000 }[out.risc_incendiu] || 6000)
      : (compBase[fn.psi] || 5000);
    out.arie_compartiment_max = compMax;
    out.nr_compartimente = Sc > 0 ? Math.max(1, Math.ceil(Sc / compMax)) : 1;
    // Evacuare (P118): flux 0,60 m; distanțe max
    out.flux_evacuare_m = 0.60;
    out.dist_evacuare_2sensuri = (fn.cat === 'invatamant' || fn.cat === 'medical') ? 30 : 35;
    out.dist_evacuare_fundsac = 15;
    // Desfumare (P118-2): H>8 (industrial) / SC mare / subteran
    out.desfumare_oblig = (d.functiune === 'hala-industriala' && (H > 8 || Sc > 1000)) || d.functiune === 'parcare' || Sc > 2500 || H > 28;
    // Hidranți interiori (P118-2): volum > 5000 mc sau Sd > 2000; exteriori: Sc mare
    var vol = Sd * 3; // estimare volum (H nivel ~3 m)
    out.hidranti_int_oblig = vol > 5000 || Sd > 2000 || ['mall', 'sport', 'medical', 'parcare', 'hala-industriala'].indexOf(d.functiune) >= 0;
    out.hidranti_ext_oblig = Sc > 600 || niv >= 3;
    // Rezervă apă incendiu (mc) — estimare P118-2 (hidranți int 4,2 l/s×10min + ext 10 l/s×3h dacă)
    var vri = 0; if (out.hidranti_int_oblig) vri += 4.2 * 10 * 60 / 1000; if (out.hidranti_ext_oblig) vri += 10 * 180 * 60 / 1000; if (out.sprinklere_oblig) vri += 12 * 60 * 60 / 1000;
    out.rezerva_incendiu_mc = Math.round(vri);
    // Densitate sarcină termică (notă orientativă pe risc)
    out.sarcina_termica_note = { mic: '< 420 MJ/mp', mediu: '420–840 MJ/mp', mare: '840–1680 MJ/mp', foarte_mare: '> 1680 MJ/mp' }[out.risc_incendiu] || '420–840 MJ/mp';
    // Adâncime îngheț (STAS 6054, din temperatura de iarnă)
    var Te = (out.clima && out.clima.Te) || -18;
    out.adancime_inghet_m = Te <= -20 ? 1.1 : Te <= -15 ? 1.0 : 0.9;

    // ── PARC FOTOVOLTAIC / ENERGIE: dimensionare PARAMETRICĂ BIDIRECȚIONALĂ ──
    // (a) putere setată → teren necesar + tot dimensionamentul;
    // (b) doar teren disponibil (fără putere) → putere maximă instalabilă (invers).
    // Tip montaj (fix / tracker 1-2 axe) modifică GCR și producția.
    if (d.functiune === 'parc-fotovoltaic') {     // DOAR parc FV (nu BESS/stație/skid — acelea au altă natură)
      var pmod = +d.putere_modul_wp || 555;      // Wp/modul
      var ilr = +d.ilr || 1.25;                  // raport DC/AC
      var montaj = d.montaj || 'fix';            // fix | tracker_1ax | tracker_2ax
      var gcrMap = { fix: 0.40, tracker_1ax: 0.33, tracker_2ax: 0.25 };
      var gainMap = { fix: 1.00, tracker_1ax: 1.18, tracker_2ax: 1.30 };  // câștig producție vs fix
      var montajLbl = { fix: 'suporți micști ficși (fixed-tilt, înclinare fixă 25–35°)', tracker_1ax: 'trackere cu 1 axă (urmărire E–V, motorizate)', tracker_2ax: 'trackere cu 2 axe (urmărire azimut + elevație, motorizate)' };
      var gcr = +d.gcr || gcrMap[montaj] || 0.40;
      var gain = gainMap[montaj] || 1.00;
      var psh = +d.psh_poa || 1450;              // ore-soare echiv. în planul modulelor (h)
      var pr = +d.pr || 0.82;                    // performance ratio
      var modArea = +d.arie_modul_mp || 2.58;    // m²/modul (~2,384×1,134 m)
      var modKg = +d.masa_modul_kg || 30;        // kg/modul (~28–32 kg)
      var terenDisp = Math.max(0, +Steren || 0); // teren disponibil (mp)
      // Suprafața-anexă (NU intră module): drumuri interioare + platforme PT/invertoare + retrageri + împrejmuire + spații verzi
      var fOver = (d.overhead_pct != null && d.overhead_pct !== '') ? Math.max(0, Math.min(0.5, +d.overhead_pct / 100)) : 0.18;
      var pdc = Math.max(0, +d.putere_kwp || +d.putere_instalata || 0); // kWp DC setat
      var directie = null;
      if (pdc <= 0 && terenDisp > 0) {
        // INVERS: teren disponibil → putere maximă instalabilă (după scăderea suprafeței-anexă)
        var nrModMax = Math.floor(terenDisp * (1 - fOver) * gcr / modArea);
        pdc = Math.round(nrModMax * pmod / 1000);
        directie = 'teren→putere (putere maximă instalabilă pe terenul disponibil)';
      } else if (pdc > 0) {
        directie = 'putere→teren (teren necesar pentru puterea dorită)';
      }
      if (pdc > 0) {
        var e = {};
        e.directie = directie; e.montaj = montaj; e.montaj_label = montajLbl[montaj] || montaj;
        e.putere_dc_kwp = Math.round(pdc);
        e.putere_ac_kva = Math.round(pdc / ilr);
        e.ilr = ilr; e.putere_modul_wp = pmod;
        e.nr_module = Math.round(pdc * 1000 / pmod);          // N = P_DC/P_modul
        e.masa_modul_kg = modKg;
        e.masa_module_t = Math.round(e.nr_module * modKg / 1000);
        e.arie_module_mp = Math.round(e.nr_module * modArea);
        e.gcr = gcr;
        e.camp_module_mp = Math.round(e.arie_module_mp / gcr);     // câmp solar (incl. spațiere inter-rânduri)
        e.overhead_pct = Math.round(fOver * 100);
        e.teren_necesar_mp = Math.round(e.camp_module_mp / (1 - fOver)); // + drumuri/PT/retrageri/împrejmuire/verzi
        e.teren_necesar_ha = +(e.teren_necesar_mp / 10000).toFixed(2);
        e.teren_disponibil_mp = terenDisp || null;
        e.teren_budget = [
          ['Câmp de module (incl. spațiere inter-rânduri, GCR ' + gcr + ')', e.camp_module_mp],
          ['Drumuri interioare + platforme PT/invertoare (~8%)', Math.round(e.teren_necesar_mp * 0.08)],
          ['Retrageri perimetrale + împrejmuire + spații verzi (~10%)', Math.round(e.teren_necesar_mp * 0.10)]
        ];
        // Putere maximă fizic instalabilă pe terenul DECLARAT (pt. verificarea „nu inventa")
        e.putere_max_teren_kwp = terenDisp > 0 ? Math.round(Math.floor(terenDisp * (1 - fOver) * gcr / modArea) * pmod / 1000) : null;
        e.densitate_kwp_ha = e.teren_necesar_mp ? Math.round(pdc / (e.teren_necesar_mp / 10000)) : 0; // kWp/ha
        e.teren_per_mwp_ha = +((e.teren_necesar_mp / 10000) / (pdc / 1000)).toFixed(2); // ha/MWp
        e.psh_poa = psh; e.pr = pr; e.gain_montaj = gain;
        e.yield_kwh_kwp = Math.round(psh * pr * gain);        // kWh/kWp·an
        e.productie_anuala_mwh = Math.round(pdc * psh * pr * gain / 1000); // E = P_DC×PSH×PR×câștig montaj
        e.module_pe_string = +d.module_string || 27;          // Voc(-10°C) < 1500 V DC
        e.nr_stringuri = Math.max(1, Math.round(e.nr_module / e.module_pe_string));
        var pinv = +d.putere_invertor_kva || 100;             // kVA/invertor (string)
        e.putere_invertor_kva = pinv;
        e.nr_invertoare = Math.max(1, Math.round(e.putere_ac_kva / pinv));
        e.putere_pt_kva = Math.max(400, Math.ceil(e.putere_ac_kva / 400) * 400);
        e.nr_pt = Math.max(1, Math.ceil(e.putere_ac_kva / 1600));  // ~1 PT / 1600 kVA
        e.co2_evitat_t_an = Math.round(e.productie_anuala_mwh * 0.25); // factor SEN ~0,25 tCO2/MWh
        e.racord = e.putere_ac_kva <= 100 ? 'JT (0,4 kV)' : (e.putere_ac_kva <= 6000 ? 'MT (20 kV)' : 'ÎT (110 kV)');
        e.degradare_an_pct = 0.5;
        e.productie_25ani_mwh = Math.round(e.productie_anuala_mwh * 25 * (1 - 0.005 * 12)); // medie cu degradare liniară 0,5%/an
        out.energie = e;
      }
    }
    // ── CAPACITATE DE DEZVOLTARE + CONSTRÂNGEREA DETERMINANTĂ (funcțiuni de clădire) ──
    // Răspunde: pe terenul dat, cât se poate construi și DE CE (ce indicator „leagă").
    if (!out.energie && Steren > 0) {
      var potMax = +d.POT_max || fn.pot_rec || 40;
      var cutMax = +d.CUT_max || fn.cut_rec || 1.0;
      var scMaxPot = Math.round(Steren * potMax / 100);
      var sdMaxCut = Math.round(Steren * cutMax);
      out.capacitate = {
        tip: 'cladire', teren_mp: Steren, pot_max: potMax, cut_max: cutMax,
        sc_max_mp: scMaxPot, sd_max_mp: sdMaxCut,
        niv_ech: scMaxPot > 0 ? +(sdMaxCut / scMaxPot).toFixed(1) : 0,
        sv_min_mp: out.sv_min_mp, parcaje: out.parcaje_necesare, parcaje_area_mp: (out.parcaje_necesare || 0) * 25
      };
    }
    return out;
  }

  // ── VALIDARE în timp real (panoul din mockup) ─────────────────────────────
  function valideaza(d) {
    d = d || {}; var ac = autoCalc(d); var checks = [];
    var Sc = +d.Sc || 0, H = +d.H || 0;
    function chk(ok, txt, norma, sev) { checks.push({ status: ok === true ? 'conform' : ok === false ? 'neconform' : 'warning', text: txt, norma: norma || '', sev: sev || (ok === false ? 'critic' : 'info') }); }
    // ── ENERGIE: verificarea „nu inventa" — puterea declarată vs. capacitatea fizică a terenului ──
    if (ac.energie && ac.energie.putere_max_teren_kwp != null && (+d.putere_kwp) > 0) {
      var pMax = ac.energie.putere_max_teren_kwp;
      var pDecl = +d.putere_kwp;
      var terenMp = +d.Steren || 0;
      var okCap = pDecl <= pMax * 1.02; // toleranță 2%
      var mesajCap = okCap
        ? ('Putere declarată ' + pDecl.toLocaleString('ro-RO') + ' kWp ≤ maxim instalabil ' + pMax.toLocaleString('ro-RO') + ' kWp pe ' + (terenMp).toLocaleString('ro-RO') + ' m²')
        : ('Putere declarată ' + pDecl.toLocaleString('ro-RO') + ' kWp DEPĂȘEȘTE ce se poate instala fizic pe ' + terenMp.toLocaleString('ro-RO') + ' m²: maxim ~' + pMax.toLocaleString('ro-RO') + ' kWp (montaj ' + (ac.energie.montaj || 'fix') + ', GCR ' + ac.energie.gcr + ', minus drumuri/PT/invertoare/retrageri/spații verzi). Reduceți puterea sau măriți terenul (~' + (ac.energie.teren_necesar_mp || 0).toLocaleString('ro-RO') + ' m² necesari pentru puterea dorită).');
      chk(okCap, mesajCap, 'Dimensionare fizică teren↔putere (GCR + suprafață-anexă)', okCap ? 'info' : 'critic');
    }
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
    // gabaritul clădirii (bW × bD) pentru planul de arhitectură — din AMPRENTA AEDIS
    // (parterul volumului generat), ca planul să respecte forma din AEDIS
    try {
      var TF = G.turf || window.turf;
      var fp0 = null;
      if (S.vol && S.vol._lastFeats && S.vol._lastFeats.length) {
        fp0 = S.vol._lastFeats.find(function (f) { return f.properties && f.properties.floor === 0 && !f.properties.isExistent; }) ||
              S.vol._lastFeats.find(function (f) { return f.properties && f.properties.bldIdx != null; });
      }
      var geom = fp0 ? fp0.geometry : (ap.geo && ap.geo.geometry);
      if (geom && TF && TF.bbox) {
        var bb = TF.bbox({ type: 'Feature', geometry: geom, properties: {} });
        var midLat = (bb[1] + bb[3]) / 2;
        var wM = Math.abs((bb[2] - bb[0]) * 111320 * Math.cos(midLat * Math.PI / 180));
        var dM = Math.abs((bb[3] - bb[1]) * 110540);
        if (fp0 && wM > 4 && dM > 4) { d.bW = Math.round(wM * 10) / 10; d.bD = Math.round(dM * 10) / 10; d._aedis_footprint = true; }
        else if (d.Sc) { var asp = (wM > 0 && dM > 0) ? wM / dM : 1.3; var bd = Math.sqrt(d.Sc / asp); d.bD = Math.round(bd * 10) / 10; d.bW = Math.round((d.Sc / bd) * 10) / 10; }
      }
    } catch (e) {}
    d.functiune = d.functiune || 'hala-industriala';
    d._source = 'AEDIS'; return d;
  }

  // Profilul funcțiunii → ce câmpuri sunt relevante în dashboard (nu induce în eroare).
  //   cladire = urbanistic complet; energie = parc FV/BESS (fără retrageri/niveluri/gaze de clădire);
  //   infrastructura = pod/drum (fără POT/CUT/gaze/apă/niveluri).
  function profilFor(fnKey) {
    var fn = FUNCTIUNI[fnKey] || {};
    if (fn.profil) return fn.profil;
    if (fnKey === 'parc-fotovoltaic') return 'energie';                 // câmp de panouri (fără clădire)
    if (fnKey === 'pod' || fnKey === 'infrastructura-drum') return 'infrastructura';
    return 'cladire';   // BESS/stație/skid au clădiri/platforme tehnice → profil clădire (dar planșe dedicate prin dispecer)
  }
  G.UXDoc = { FUNCTIUNI: FUNCTIUNI, detectFunctiune: detectFunctiune, autoCalc: autoCalc, valideaza: valideaza, dateFromAEDIS: dateFromAEDIS, seismicFor: seismicFor, AEDIS_FN_MAP: AEDIS_FN_MAP, profilFor: profilFor };
  console.log('[UXDoc] engine documentații încărcat (window.UXDoc) — client-side, fără server');
})(window);
