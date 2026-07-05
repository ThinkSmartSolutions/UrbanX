/* ============================================================================
 * UrbanX — MOTOR VERIFICARE CONFORMITATE PLANȘE (js/15-ux-compliance-engine.js)
 * Sprint 4 din motorul de planșe. Verifică automat consistența și conformitatea
 * planșelor/modelului cu normativele RO (NP 057/062/063, OMS 119, NP 051, P118,
 * P100-1, PUG/RLU, RGU), produce un Raport de Conformitate Automată (PDF) și
 * blochează exportul la erori critice (cu asumare de proiectant).
 * NEDESTRUCTIV. Are caracter ORIENTATIV — răspunderea rămâne a proiectantului.
 * window.UX_COMPLIANCE
 * ========================================================================== */
(function (G) {
  'use strict';
  var num = function (x, d) { var v = parseFloat(x); return isNaN(v) ? (d != null ? d : 0) : v; };
  var pct = function (x) { return (x * 100).toFixed(1) + '%'; };
  // marker: câmp lipsă → regula nu se aplică (nu generează eroare falsă)
  var MISS = function (v) { return v == null || v === '' || (typeof v === 'number' && isNaN(v)); };

  // ─── BIBLIOTECĂ REGULI TEHNICE ──────────────────────────────────────────
  // target: pe ce colecție se aplică (room/stair/balcony/door/ramp/building/parcel/sheet)
  // check(el[,parcel]) → true=conform; applies(el)=filtru; message(el)=text; severity
  var RULES = {
    // ── ÎNĂLȚIMI LIBERE (NP 057/2002) ──
    'NP057-H01': { target: 'room', normativ: 'NP 057/2002', articol: 'Art. 3.2.1', severity: 'ERROR',
      applies: function (r) { return r.type === 'LOCUIRE' || ['LIVING', 'DORMITOR', 'BUCATARIE'].indexOf(r.type) >= 0; },
      check: function (r) { return MISS(r.clearHeight) || r.clearHeight >= 2.50; },
      message: function (r) { return 'Înălțime liberă insuficientă în ' + r.name + ': ' + r.clearHeight + 'm < 2.50m minim'; } },
    'NP057-H02': { target: 'room', normativ: 'NP 057/2002', articol: 'Art. 3.2.2', severity: 'ERROR',
      applies: function (r) { return ['BAIE', 'WC', 'DEBARA', 'CAMARA'].indexOf(r.type) >= 0; },
      check: function (r) { return MISS(r.clearHeight) || r.clearHeight >= 2.20; },
      message: function (r) { return 'Înălțime liberă baie/debara ' + r.name + ': ' + r.clearHeight + 'm < 2.20m minim'; } },
    // ── SUPRAFEȚE MINIME (NP 057/2002) ──
    'NP057-S01': { target: 'room', normativ: 'NP 057/2002', articol: 'Art. 4.1', severity: 'WARNING',
      applies: function (r) { return r.type === 'DORMITOR'; },
      check: function (r) { return MISS(r.area) || r.area >= 8.0; },
      message: function (r) { return 'Dormitor ' + r.name + ': ' + r.area.toFixed(2) + 'm² < 8m² minim (NP 057)'; } },
    'NP057-S02': { target: 'room', normativ: 'NP 057/2002', articol: 'Art. 4.2', severity: 'WARNING',
      applies: function (r) { return r.type === 'LIVING'; },
      check: function (r) { return MISS(r.area) || r.area >= 12.0; },
      message: function (r) { return 'Camera de zi ' + r.name + ': ' + r.area.toFixed(2) + 'm² < 12m² minim'; } },
    'NP057-S03': { target: 'room', normativ: 'NP 057/2002', articol: 'Art. 4.3', severity: 'WARNING',
      applies: function (r) { return r.type === 'BUCATARIE'; },
      check: function (r) { return MISS(r.area) || r.area >= 5.0; },
      message: function (r) { return 'Bucătărie ' + r.name + ': ' + r.area.toFixed(2) + 'm² < 5m² minim'; } },
    'NP057-S04': { target: 'room', normativ: 'NP 057/2002', articol: 'Art. 4.4', severity: 'INFO',
      applies: function (r) { return r.type === 'BAIE'; },
      check: function (r) { return MISS(r.area) || r.area >= 3.5; },
      message: function (r) { return 'Baie ' + r.name + ': ' + r.area.toFixed(2) + 'm² < 3.5m² recomandat'; } },
    // ── ILUMINARE NATURALĂ (NP 062/2002) ──
    'NP062-I01': { target: 'room', normativ: 'NP 062/2002', articol: 'Art. 2.1 + NP 057 Art.5', severity: 'ERROR',
      applies: function (r) { return ['LIVING', 'DORMITOR', 'BUCATARIE'].indexOf(r.type) >= 0 && !MISS(r.windowArea) && !MISS(r.floorArea) && r.floorArea > 0; },
      check: function (r) { return (r.windowArea / r.floorArea) >= 0.10; },
      message: function (r) { return 'Raport arie vitrată/utilă în ' + r.name + ': ' + pct(r.windowArea / r.floorArea) + ' < 10% minim'; } },
    // ── ÎNSORIRE (OMS 119/2014) ──
    'OMS119-S01': { target: 'room', normativ: 'OMS 119/2014', articol: 'Art. 9', severity: 'WARNING',
      applies: function (r) { return r.type === 'DORMITOR' && !MISS(r.sunshineDuration); },
      check: function (r) { return r.sunshineDuration >= 1.5; },
      message: function (r) { return 'Însorire insuficientă dormitor ' + r.name + ': ' + r.sunshineDuration + 'h < 1.5h la solstițiu (v. Studiul de Însorire)'; } },
    // ── SCĂRI ȘI RAMPE (NP 063/2002) ──
    'NP063-SC01': { target: 'stair', normativ: 'NP 063/2002', articol: 'Art. 3.1', severity: 'ERROR',
      applies: function (s) { return s.use === 'REZIDENTIAL' && !MISS(s.riser) && !MISS(s.tread); },
      check: function (s) { return s.riser <= 0.19 && s.tread >= 0.27; },
      message: function (s) { return 'Geometrie treaptă neconformă: R=' + (s.riser * 100).toFixed(1) + 'cm, G=' + (s.tread * 100).toFixed(1) + 'cm (cond. R≤19, G≥27)'; } },
    'NP063-SC02': { target: 'stair', normativ: 'NP 063/2002', articol: 'Art. 3.2', severity: 'INFO',
      applies: function (s) { return !MISS(s.riser) && !MISS(s.tread); },
      check: function (s) { var v = 2 * s.riser + s.tread; return v >= 0.60 && v <= 0.65; },
      message: function (s) { return 'Formula 2R+G = ' + (2 * s.riser + s.tread).toFixed(2) + 'm (optim 0.62-0.64m)'; } },
    'NP063-SC03': { target: 'stair', normativ: 'NP 063/2002', articol: 'Art. 4.1', severity: 'ERROR',
      applies: function (s) { return s.use === 'REZIDENTIAL' && !MISS(s.width); },
      check: function (s) { return s.width >= 0.90; },
      message: function (s) { return 'Lățime scară ' + s.width + 'm < 0.90m minim rezidențial'; } },
    'NP063-SC04': { target: 'stair', normativ: 'NP 063/2002', articol: 'Art. 5.1', severity: 'ERROR',
      applies: function (s) { return !MISS(s.handrailHeight); },
      check: function (s) { return s.handrailHeight >= 0.90; },
      message: function (s) { return 'Înălțime balustradă ' + s.handrailHeight + 'm < 0.90m minim'; } },
    'NP063-P01': { target: 'balcony', normativ: 'NP 063/2002', articol: 'Art. 5.2', severity: 'ERROR',
      applies: function (b) { return (b.type === 'BALCON' || b.type === 'TERASA') && !MISS(b.parapetHeight); },
      check: function (b) { return b.parapetHeight >= (b.buildingH > 12 ? 1.10 : 1.00); },
      message: function (b) { return 'Parapet ' + b.name + ': ' + b.parapetHeight + 'm < ' + (b.buildingH > 12 ? '1.10' : '1.00') + 'm minim'; } },
    // ── URBANISM (PUG/RLU) ──
    'PUG-POT': { target: 'building+parcel', normativ: 'PUG/RLU UAT', articol: 'RLU', severity: 'ERROR',
      applies: function (b, p) { return p && !MISS(p.POT_max) && !MISS(b.footprintArea) && p.area > 0; },
      check: function (b, p) { return (b.footprintArea / p.area) <= p.POT_max; },
      message: function (b, p) { return 'POT depășit: ' + pct(b.footprintArea / p.area) + ' > ' + pct(p.POT_max) + ' maxim'; } },
    'PUG-CUT': { target: 'building+parcel', normativ: 'PUG/RLU UAT', articol: 'RLU', severity: 'ERROR',
      applies: function (b, p) { return p && !MISS(p.CUT_max) && !MISS(b.totalArea) && p.area > 0; },
      check: function (b, p) { return (b.totalArea / p.area) <= p.CUT_max; },
      message: function (b, p) { return 'CUT depășit: ' + (b.totalArea / p.area).toFixed(2) + ' > ' + p.CUT_max.toFixed(2) + ' maxim'; } },
    'PUG-HMAX': { target: 'building+parcel', normativ: 'PUG/RLU UAT', articol: 'RLU', severity: 'ERROR',
      applies: function (b, p) { return p && !MISS(p.H_max) && !MISS(b.heightMax); },
      check: function (b, p) { return b.heightMax <= p.H_max; },
      message: function (b, p) { return 'Înălțime depășită: ' + b.heightMax.toFixed(2) + 'm > ' + p.H_max.toFixed(2) + 'm maxim'; } },
    'PUG-RET-FRONT': { target: 'building+parcel', normativ: 'PUG/RLU UAT', articol: 'RLU', severity: 'WARNING',
      applies: function (b, p) { return p && !MISS(p.retragere_front) && b.setback && !MISS(b.setback.front); },
      check: function (b, p) { return b.setback.front >= p.retragere_front; },
      message: function (b, p) { return 'Retragere față: ' + b.setback.front.toFixed(2) + 'm < ' + p.retragere_front + 'm minim'; } },
    'RGU-SV01': { target: 'parcel', normativ: 'HG 525/1996 (RGU) + L 24/2007', articol: 'Art. 17', severity: 'ERROR',
      applies: function (p) { return !MISS(p.SV_min) && !MISS(p.greenArea) && p.area > 0; },
      check: function (p) { return (p.greenArea / p.area) >= p.SV_min; },
      message: function (p) { return 'Spații verzi: ' + pct(p.greenArea / p.area) + ' < ' + pct(p.SV_min) + ' minim UTR'; } },
    // ── ACCESIBILITATE (Legea 448/2006 + NP 051/2012) ──
    'NP051-AC01': { target: 'door', normativ: 'NP 051/2012', articol: 'Art. 4.2', severity: 'ERROR',
      applies: function (d) { return d.isAccessibilityRoute && !MISS(d.width); },
      check: function (d) { return d.width >= 0.90; },
      message: function (d) { return 'Lățime ușă accesibilizată ' + d.name + ': ' + (d.width * 100).toFixed(0) + 'cm < 90cm'; } },
    'NP051-AC02': { target: 'ramp', normativ: 'NP 051/2012', articol: 'Art. 4.5', severity: 'ERROR',
      applies: function (r) { return r.type === 'RAMPA' && !MISS(r.slope); },
      check: function (r) { return r.slope <= 0.08; },
      message: function (r) { return 'Pantă rampă ' + (r.slope * 100).toFixed(1) + '% > 8% maxim (1:12.5)'; } },
    // ── PREVENIRE INCENDII (P118) ──
    'P118-FI01': { target: 'building', normativ: 'P 118-2/2013', articol: 'Art. 4.3', severity: 'ERROR',
      applies: function (b) { return !MISS(b.distanceToChimney); },
      check: function (b) { return b.distanceToChimney >= 0.40; },
      message: function (b) { return 'Distanță coș-margine acoperiș ' + b.distanceToChimney + 'm < 0.40m'; } },
    'P118-FI02': { target: 'building', normativ: 'P 118/1999', articol: 'Art. 2.30', severity: 'WARNING',
      applies: function (b) { return !MISS(b.maxFloors); },
      check: function (b) { return b.maxFloors <= 4 || b.hasFireEscapeStair; },
      message: function (b) { return 'Clădire P+' + (b.maxFloors - 1) + ' necesită a 2-a scară de evacuare (P118-1)'; } },
    // ── SEISMICITATE (P100-1/2013) ──
    'P100-SE01': { target: 'parcel', normativ: 'P 100-1/2013', articol: 'Art. 3.1', severity: 'WARNING',
      applies: function (p) { return true; },
      check: function (p) { return !MISS(p.seismicZone); },
      message: function (p) { return 'Zonă seismică (ag) neidentificată — verificați cu datele teritoriale ale amplasamentului'; } },
    // ── CONSISTENȚĂ INTERNĂ ──
    'CONS-AREA01': { target: 'building', normativ: 'Consistență internă', articol: '—', severity: 'WARNING',
      applies: function (b) { return !MISS(b.sumRoomAreas) && !MISS(b.totalUsableArea) && b.totalUsableArea > 0; },
      check: function (b) { return Math.abs(b.sumRoomAreas - b.totalUsableArea) < 0.5; },
      message: function (b) { return 'Neconcordanță: suma camere ' + b.sumRoomAreas.toFixed(2) + 'm² ≠ suprafață utilă ' + b.totalUsableArea.toFixed(2) + 'm²'; } }
  };

  // ─── ADAPTOR: model doc (D) + validare (v) → colecții de elemente ─────────
  // Mapează tipurile de spații ale platformei către tipurile normative.
  var TYPE_MAP = {
    LIVING: 'LIVING', 'CAMERA DE ZI': 'LIVING', 'ZONA DE ZI': 'LIVING', SUFRAGERIE: 'LIVING',
    DORMITOR: 'DORMITOR', BEDROOM: 'DORMITOR', 'CAMERA COPII': 'DORMITOR',
    BUCATARIE: 'BUCATARIE', KITCHEN: 'BUCATARIE',
    BAIE: 'BAIE', BATH: 'BAIE', WC: 'WC', GRUP_SANITAR: 'BAIE',
    DEBARA: 'DEBARA', CAMARA: 'CAMARA', BALCON: 'BALCON', TERASA: 'TERASA'
  };
  function mapType(nume, cat) {
    var u = (nume || '').toUpperCase();
    for (var k in TYPE_MAP) { if (u.indexOf(k) >= 0) return TYPE_MAP[k]; }
    if ((cat || '').toLowerCase() === 'locuire') return 'LOCUIRE';
    return (cat || 'ALT').toUpperCase();
  }
  function fromDocModel(D, v) {
    D = D || {}; v = v || {}; var ac = v.calc || {};
    var rooms = [], balconies = [], sumRoom = 0;
    var Hlib = num(D.H_liber, 0) || (num(D.H, 0) && num(D.niv_supraterane, 1) ? (num(D.H) / num(D.niv_supraterane, 1)) - 0.35 : 2.60);
    (D._spatii || []).forEach(function (r) {
      var t = mapType(r.nume, r.cat); var buc = num(r.buc, 1); var mp = num(r.mp_unit, 0);
      var area = mp; sumRoom += mp * buc;
      var room = { name: r.nume || t, type: t, area: area, floorArea: area,
        clearHeight: r.H_liber != null ? num(r.H_liber) : Hlib,
        windowArea: r.arie_vitrata != null ? num(r.arie_vitrata) : NaN,
        sunshineDuration: r.insorire != null ? num(r.insorire) : NaN };
      if (t === 'BALCON' || t === 'TERASA') balconies.push({ name: r.nume || t, type: t, parapetHeight: r.parapet != null ? num(r.parapet) : NaN, buildingH: num(D.H, 0) });
      else rooms.push(room);
    });
    var parcel = { area: num(D.Steren, 0),
      POT_max: D.POT_max != null ? num(D.POT_max) / 100 : NaN,
      CUT_max: D.CUT_max != null ? num(D.CUT_max) : NaN,
      H_max: D.H_max != null ? num(D.H_max) : NaN,
      retragere_front: D.retragere_fata != null ? num(D.retragere_fata) : NaN,
      SV_min: (ac.sv_min_pct != null ? ac.sv_min_pct / 100 : NaN),
      greenArea: D.sv_propus_mp != null ? num(D.sv_propus_mp) : (D.Steren && ac.sv_min_pct ? num(D.Steren) * ac.sv_min_pct / 100 : NaN),
      seismicZone: (ac.seismic && ac.seismic.ag != null && !ac.seismic.estimat) ? ac.seismic.ag : (ac.seismic && ac.seismic.ag != null ? ac.seismic.ag : null) };
    var niv = num(D.niv_supraterane, 1);
    var building = { footprintArea: num(D.Sc, 0), totalArea: num(D.Sd, 0), heightMax: num(D.H, 0),
      maxFloors: niv, hasFireEscapeStair: !!D.a2a_scara, distanceToChimney: D.dist_cos != null ? num(D.dist_cos) : NaN,
      sumRoomAreas: sumRoom, totalUsableArea: D.Su != null ? num(D.Su) : (D.Sd ? num(D.Sd) * 0.82 : NaN),
      setback: { front: D.retragere_fata_propus != null ? num(D.retragere_fata_propus) : (D.retragere_fata != null ? num(D.retragere_fata) : NaN) } };
    var stairs = D._scari || (niv > 1 ? [{ use: 'REZIDENTIAL', riser: 0.175, tread: 0.28, width: 1.0, handrailHeight: 0.90 }] : []);
    var doors = D._usi || [], ramps = D._rampe || [];
    return { rooms: rooms, balconies: balconies, parcel: parcel, building: building, stairs: stairs, doors: doors, ramps: ramps, sheets: D._sheets || [] };
  }

  // ─── MOTOR DE VERIFICARE ─────────────────────────────────────────────────
  function runAllChecks(model) {
    model = model || {}; var res = { errors: [], warnings: [], infos: [], passed: [], nTested: 0 };
    var col = { room: model.rooms || [], stair: model.stairs || [], balcony: model.balconies || [], door: model.doors || [], ramp: model.ramps || [] };
    Object.keys(RULES).forEach(function (id) {
      var rule = RULES[id]; var tgt = rule.target;
      try {
        if (tgt === 'building') {
          if (rule.applies(model.building)) { res.nTested++; var ok = rule.check(model.building); if (ok) res.passed.push({ id: id, normativ: rule.normativ }); else pushFail(res, rule, id, 'Clădire', rule.message(model.building)); }
        } else if (tgt === 'parcel') {
          if (rule.applies(model.parcel)) { res.nTested++; var ok2 = rule.check(model.parcel); if (ok2) res.passed.push({ id: id, normativ: rule.normativ }); else pushFail(res, rule, id, 'Parcelă', rule.message(model.parcel)); }
        } else if (tgt === 'building+parcel') {
          if (rule.applies(model.building, model.parcel)) { res.nTested++; var ok3 = rule.check(model.building, model.parcel); if (ok3) res.passed.push({ id: id, normativ: rule.normativ }); else pushFail(res, rule, id, 'Clădire/parcelă', rule.message(model.building, model.parcel)); }
        } else {
          (col[tgt] || []).forEach(function (el) {
            if (rule.applies(el)) { res.nTested++; var okE = rule.check(el); if (okE) res.passed.push({ id: id, normativ: rule.normativ, el: el.name }); else pushFail(res, rule, id, el.name || tgt, rule.message(el)); }
          });
        }
      } catch (e) { /* regulă cu date insuficiente — ignoră */ }
    });
    checkCrossSheetsConsistency(model.sheets, res);
    return res;
  }
  function pushFail(res, rule, id, elLabel, msg) {
    var item = { id: id, normativ: rule.normativ, articol: rule.articol || '', el: elLabel, msg: msg, severity: rule.severity };
    (rule.severity === 'ERROR' ? res.errors : rule.severity === 'WARNING' ? res.warnings : res.infos).push(item);
  }
  function checkCrossSheetsConsistency(sheets, res) {
    (sheets || []).forEach(function (s) {
      if (s.dimensionChainSum != null && s.totalDimension != null && s.dimensionChainSum !== s.totalDimension) {
        res.errors.push({ id: 'CONS-DIM01', normativ: 'Consistență internă', articol: '—', el: 'Latura ' + (s.side || '?'), msg: 'Lanț de cote: suma ' + s.dimensionChainSum + 'mm ≠ total ' + s.totalDimension + 'mm', severity: 'ERROR' });
      }
    });
  }

  // ─── BLOCARE EXPORT ────────────────────────────────────────────────────────
  function canExport(res) { return !res || res.errors.length === 0; }

  // ─── RAPORT DE CONFORMITATE (PDF via _initStudyPdf) ─────────────────────────
  function generateComplianceReport(res, D) {
    D = D || {}; res = res || runAllChecks(fromDocModel(D, G.UXDoc && G.UXDoc.valideaza(D)));
    if (!G._initStudyPdf) { alert('Motorul PDF nu este încărcat.'); return; }
    var d = G._initStudyPdf('Raport de Conformitate Automată', 'Verificare normative RO · NP 057/062/063 · OMS 119 · NP 051 · P118 · P100-1 · PUG/RLU · RGU · caracter orientativ', 6);
    var pdf = d.pdf, W = d.W, cover = d.cover, newPage = d.newPage, sec = d.sec, body = d.body, tblRow = d.tblRow, sign = d.sign, checkY = d.checkY;
    var nE = res.errors.length, nW = res.warnings.length, nI = res.infos.length, nP = res.passed.length;
    cover('Verificare automată · ' + ((G.UXDoc && G.UXDoc.FUNCTIUNI[D.functiune] && G.UXDoc.FUNCTIUNI[D.functiune].label) || D.functiune || 'obiectiv') + ' · ' + (D.uat || ''), null,
      [['Erori (blochează exportul)', '' + nE], ['Avertismente', '' + nW], ['Info / recomandări', '' + nI], ['Reguli trecute', '' + nP], ['Total reguli evaluate', '' + res.nTested]],
      true, 'RAPORT DE CONFORMITATE AUTOMATĂ');
    // Erori
    var cy = newPage('1. ERORI — BLOCANTE PENTRU EXPORT', 2);
    if (!nE) { cy = body('Nu s-au identificat erori critice pe baza datelor disponibile.', 14, cy); }
    else {
      cy = tblRow(['Cod', 'Normativ · articol', 'Element', 'Problemă'], cy, true, [26, 46, 30, W - 28 - 26 - 46 - 30]);
      res.errors.forEach(function (it) { cy = tblRow([it.id, it.normativ + ' ' + it.articol, it.el, it.msg], cy, false, [26, 46, 30, W - 28 - 26 - 46 - 30]); cy = checkY(cy, 14, '1. ERORI', 2); });
    }
    // Avertismente
    cy = newPage('2. AVERTISMENTE — de confirmat de proiectant', 3);
    if (!nW) cy = body('Niciun avertisment.', 14, cy);
    else { cy = tblRow(['Cod', 'Normativ', 'Element', 'Observație'], cy, true, [26, 46, 30, W - 28 - 26 - 46 - 30]); res.warnings.forEach(function (it) { cy = tblRow([it.id, it.normativ, it.el, it.msg], cy, false, [26, 46, 30, W - 28 - 26 - 46 - 30]); cy = checkY(cy, 14, '2. AVERTISMENTE', 3); }); }
    // Info
    cy = newPage('3. INFO ȘI RECOMANDĂRI', 4);
    if (!nI) cy = body('Nicio recomandare suplimentară.', 14, cy);
    else { cy = tblRow(['Cod', 'Normativ', 'Element', 'Recomandare'], cy, true, [26, 46, 30, W - 28 - 26 - 46 - 30]); res.infos.forEach(function (it) { cy = tblRow([it.id, it.normativ, it.el, it.msg], cy, false, [26, 46, 30, W - 28 - 26 - 46 - 30]); cy = checkY(cy, 14, '3. INFO', 4); }); }
    // Reguli trecute
    cy = newPage('4. REGULI VERIFICATE ȘI TRECUTE', 5);
    cy = body('Următoarele reguli au fost evaluate cu date suficiente și sunt conforme:', 14, cy); cy += 2;
    if (nP) { cy = tblRow(['Cod', 'Normativ', 'Element'], cy, true, [40, 90, W - 28 - 40 - 90]); res.passed.forEach(function (it) { cy = tblRow([it.id, it.normativ, it.el || '—'], cy, false, [40, 90, W - 28 - 40 - 90]); cy = checkY(cy, 12, '4. TRECUTE', 5); }); }
    // Declarație
    cy = newPage('5. DECLARAȚIE ȘI LIMITĂRI', 6);
    cy = body('Verificările de mai sus sunt automate și au caracter ORIENTATIV. Ele acoperă doar regulile codificate în platformă, pe baza datelor introduse în model, și NU substituie verificarea completă a proiectului. Proiectantul autorizat (arhitect cu drept de semnătură OAR / inginer, după caz verificator atestat MLPAT/MDLPA) este singurul responsabil pentru conformitatea proiectului cu legislația și normativele în vigoare la data depunerii. Regulile marcate ERROR trebuie rezolvate sau asumate explicit înainte de export.', 14, cy);
    if (sign) sign(cy + 6);
    var fn = (G._stratFileName ? G._stratFileName('Raport_conformitate', { mode: 'parcela', localitate: D.uat, nrcad: D.nrcad }) : 'Raport_conformitate') + '.pdf';
    pdf.save(fn);
    return res;
  }

  // ─── UI: verifică + (opțional) blochează export cu asumare ──────────────────
  function openReport(D) {
    var v = G.UXDoc && G.UXDoc.valideaza ? G.UXDoc.valideaza(D) : { calc: {} };
    var res = runAllChecks(fromDocModel(D, v));
    generateComplianceReport(res, D);
    return res;
  }
  // modal blocare export: întoarce Promise<bool> (true = se poate exporta / asumat)
  function guardExport(D) {
    var v = G.UXDoc && G.UXDoc.valideaza ? G.UXDoc.valideaza(D) : { calc: {} };
    var res = runAllChecks(fromDocModel(D, v));
    if (canExport(res)) return Promise.resolve({ ok: true, res: res });
    return new Promise(function (resolve) {
      var ov = document.createElement('div');
      ov.style.cssText = 'position:fixed;inset:0;background:rgba(3,7,18,.86);z-index:6000;display:flex;align-items:center;justify-content:center;font-family:system-ui;padding:16px';
      var box = document.createElement('div');
      box.style.cssText = 'max-width:560px;width:100%;background:#0b1220;border:1px solid rgba(248,113,113,.4);border-radius:14px;padding:20px;color:#e6edf7;max-height:86vh;overflow:auto';
      var lis = res.errors.map(function (e) { return '<li style="margin:4px 0"><b style="color:#fca5a5">' + e.id + '</b> — ' + e.msg + ' <span style="color:#64748b">(' + e.normativ + ')</span></li>'; }).join('');
      box.innerHTML = '<div style="font-size:16px;font-weight:800;color:#fca5a5;margin-bottom:6px">⛔ ' + res.errors.length + ' erori de conformitate blochează exportul</div>' +
        '<div style="font-size:12px;color:#94a3b8;margin-bottom:10px">Rezolvați erorile de mai jos sau asumați-vă explicit corectarea lor înainte de export.</div>' +
        '<ul style="font-size:12.5px;color:#cbd5e1;padding-left:18px;margin:0 0 12px">' + lis + '</ul>' +
        '<label style="display:flex;gap:8px;align-items:flex-start;font-size:12px;color:#cbd5e1;cursor:pointer;margin-bottom:8px"><input type="checkbox" id="uxc-assume" style="margin-top:2px"><span>Îmi asum, în calitate de proiectant autorizat, corectarea acestor erori înainte de depunere. Numele meu de mai jos constituie semnătura de asumare.</span></label>' +
        '<input id="uxc-name" placeholder="Nume proiectant + nr. autorizație/parafă" style="width:100%;box-sizing:border-box;background:#0a1120;border:1px solid rgba(148,163,184,.25);border-radius:7px;color:#e6edf7;padding:8px;font-size:12.5px;margin-bottom:12px">' +
        '<div style="display:flex;gap:8px;justify-content:flex-end"><button id="uxc-report" style="background:rgba(56,189,248,.16);color:#7dd3fc;border:1px solid rgba(56,189,248,.4);border-radius:8px;padding:8px 14px;font-size:12.5px;cursor:pointer">📄 Raport PDF</button><button id="uxc-cancel" style="background:none;border:1px solid rgba(148,163,184,.4);color:#cbd5e1;border-radius:8px;padding:8px 14px;font-size:12.5px;cursor:pointer">Anulează</button><button id="uxc-force" style="background:#f87171;color:#111;border:none;border-radius:8px;padding:8px 14px;font-size:12.5px;font-weight:700;cursor:pointer;opacity:.5" disabled>Export cu asumare</button></div>';
      ov.appendChild(box); document.body.appendChild(ov);
      var cb = box.querySelector('#uxc-assume'), nm = box.querySelector('#uxc-name'), bf = box.querySelector('#uxc-force');
      function upd() { var ok = cb.checked && nm.value.trim().length > 3; bf.disabled = !ok; bf.style.opacity = ok ? '1' : '.5'; }
      cb.onchange = upd; nm.oninput = upd;
      box.querySelector('#uxc-report').onclick = function () { generateComplianceReport(res, D); };
      box.querySelector('#uxc-cancel').onclick = function () { ov.remove(); resolve({ ok: false, res: res }); };
      bf.onclick = function () { ov.remove(); resolve({ ok: true, res: res, assumedBy: nm.value.trim(), forced: true }); };
    });
  }

  G.UX_COMPLIANCE = {
    RULES: RULES, fromDocModel: fromDocModel, runAllChecks: runAllChecks,
    checkCrossSheetsConsistency: checkCrossSheetsConsistency, canExport: canExport,
    generateComplianceReport: generateComplianceReport, openReport: openReport, guardExport: guardExport
  };
  try { console.log('[UX_COMPLIANCE] motor verificare conformitate încărcat · ' + Object.keys(RULES).length + ' reguli normative'); } catch (e) {}
})(window);
