/* ============================================================================
 * UrbanX — Motor de validare LOTIZARE (coduri + temei legal + severitate).
 * Transformă schema Ansamblu dintr-un calculator într-un VERIFICATOR de
 * conformitate, conform CLAUDE_CODE_PROMPT_LOTIZARE: reguli ISU/PED/FNC/LOT/PARK,
 * profile stradale (NP 068), secțiune transversală SVG, scoruri pe categorii.
 *
 * Onest: regulile care necesită GEOMETRIE (lungime fundătură, distanțe, raze de
 * întoarcere) NU sunt măsurate aici (nu avem desenul) — sunt marcate ca element
 * de CHECKLIST „de verificat în desen", cu codul + temeiul legal. Restul se
 * evaluează real din datele declarate (accese, profile, parcaje, program).
 *
 * window.LotizareValidator: validate(plan, opts) · ROAD_PROFILES · crossSectionSVG · renderHTML
 * Surse: P118/1999 (ISU) · HG 525/1996 (RGU) · NP 051/2012 (PMR) · NP 068/2002
 *  (circulații) · Ordinul 2264/2020 (parcaje) · Legea 24/2007 (verde).
 * ========================================================================== */
(function (G) {
  'use strict';

  var ROAD_PROFILES = {
    colector_urban: { label: 'Colector urban', carriageway_m: 7.0, footpath_m: 1.5, cycle_m: 1.5, tree_spacing_m: 10, speed_kmh: 50, parking: true, total_m: 12.0 },
    local_residential: { label: 'Stradă locală rezidențială', carriageway_m: 6.0, footpath_m: 1.5, cycle_m: 0, tree_spacing_m: 0, speed_kmh: 30, parking: true, total_m: 9.0 },
    shared_space: { label: 'Alee / woonerf (shared space)', carriageway_m: 4.0, footpath_m: 0, cycle_m: 0, tree_spacing_m: 0, speed_kmh: 10, shared: true, total_m: 5.0 },
    pedestrian_only: { label: 'Pietonal', carriageway_m: 0, footpath_m: 2.0, cycle_m: 0, pedestrian: true, total_m: 3.0 }
  };
  var LOT_MIN = { frontage_m: 8.0, area_m2: 150, collective_area_m2: 500, commercial_m2: 50, green_pct: 20 };
  var ISU = { min_access: 2, min_carriageway_m: 4.0, max_culdesac_m: 50, turnaround_min_m: 18, max_dist_road_m: 150, turning_radius_m: 11 };
  var PARK_NORM = { collective: 1.0, individual: 2.0, commercial_per100: 3.0, kindergarten_per_group: 2.0, church_per100seats: 15.0 };

  var SEV = { blocking: { w: 50, ic: '⛔', label: 'blocant', col: '#ef4444' }, error: { w: 25, ic: '✕', label: 'eroare', col: '#f97316' }, warning: { w: 10, ic: '⚠', label: 'avertisment', col: '#f59e0b' }, info: { w: 0, ic: 'ⓘ', label: 'de verificat', col: '#60a5fa' } };

  // plan = rezultatul Ansamblu.plan(); opts = declarații suplimentare (din desen)
  function validate(plan, opts) {
    opts = opts || {}; plan = plan || {};
    var pg = plan.program || {}, V = [];
    var add = function (code, sev, cat, title, message, legal, ok) { V.push({ code: code, severity: sev, category: cat, title: title, message: message, legal: legal || '', ok: ok }); };

    // ── ISU ──
    var accese = +plan.accese || +opts.accese || 1;
    add('ISU_001', accese >= ISU.min_access ? 'info' : 'blocking', 'isu', 'Minim 2 accese',
      accese >= ISU.min_access ? (accese + ' accese definite — redundanță OK.') : ('Ansamblul are ' + accese + ' acces. Normele ISU impun minim 2 accese pentru redundanță în caz de urgență.'),
      'P118/1999 Art. 2.6.2', accese >= ISU.min_access);
    // lățime carosabil — din profilele atribuite ierarhiei
    var minCarr = Math.min(ROAD_PROFILES.colector_urban.carriageway_m, ROAD_PROFILES.local_residential.carriageway_m, ROAD_PROFILES.shared_space.carriageway_m);
    add('ISU_002', minCarr >= ISU.min_carriageway_m ? 'info' : 'blocking', 'isu', 'Lățime carosabil pt autospeciale',
      minCarr >= ISU.min_carriageway_m ? ('Profilele propuse au carosabil ≥' + ISU.min_carriageway_m + 'm (colector 7m, local 6m, woonerf 4m) — acces ISU OK.') : 'Există străzi sub 4m carosabil — autospecialele ISU nu pot trece.',
      'P118/1999 Art. 2.6.3', minCarr >= ISU.min_carriageway_m);
    add('ISU_003', 'info', 'isu', 'Lungime fundătură ≤50m (fără întoarcere)', 'De verificat în desen: orice fundătură peste 50m necesită platformă de întoarcere (18×18m sau cerc D=18m).', 'P118/1999 Art. 2.6.5', null);
    add('ISU_005', 'info', 'isu', 'Distanță clădire → drum ≤150m', 'De verificat în desen: niciun corp de clădire la peste 150m de cel mai apropiat drum accesibil ISU.', 'P118/1999 Art. 2.6.1', null);

    // ── Pietonal / PMR ──
    add('PED_001', 'info', 'pietonal', 'Trotuare continue ≥1.5m pe colector/local',
      'Profilele propuse includ trotuare de 1.5m pe colector și local. De verificat continuitatea (fără întreruperi la intersecții/parcări).',
      'HG 525/1996 · NP 051/2012', true);
    if (pg.gradinita) {
      add('PED_002', opts.gradinita_pedestrian_ok === false ? 'blocking' : 'info', 'pietonal', 'Traseu pietonal continuu la grădiniță',
        opts.gradinita_pedestrian_ok === false ? 'Nu există traseu pietonal continuu de la TOATE zonele rezidențiale la grădiniță — siguranța copiilor compromisă.' : 'De confirmat: traseu pietonal continuu, fără trepte, de la fiecare zonă rezidențială la grădiniță.',
        'NP 051/2012 Art. 4.3', opts.gradinita_pedestrian_ok);
      add('PED_003', opts.gradinita_dropoff ? 'info' : 'error', 'pietonal', 'Zonă drop-off grădiniță',
        opts.gradinita_dropoff ? 'Zonă de drop-off declarată (min 3 lungimi auto = 15m).' : 'Grădinița nu are zonă de drop-off declarată. Părinții vor opri pe carosabil → pericol + blocaj. Necesar min 15m.',
        'practică urbanistică · siguranță', !!opts.gradinita_dropoff);
      add('PED_004', 'info', 'pietonal', 'Grădiniță ≤300m de acces', 'De verificat în desen: grădinița la max 300m de accesul în ansamblu, ca să nu genereze trafic intern.', 'practică urbanistică', null);
    }

    // ── Amplasare funcțiuni ──
    if (pg.comercial_mp) add('FNC_001', opts.commercial_on_collector === false ? 'warning' : 'info', 'functiuni', 'Comerț pe colector',
      opts.commercial_on_collector === false ? 'Magazinul mixt e pe stradă locală/alee, nu pe colector — va aduce trafic în zona de case.' : 'De confirmat: comerțul (' + pg.comercial_mp + ' mp) amplasat pe colectorul principal, lângă acces, cu livrări separate de intrarea pietonală.',
      'practică urbanistică', opts.commercial_on_collector);
    if (pg.biserica) {
      add('FNC_002', opts.church_parking ? 'info' : 'error', 'functiuni', 'Parcare biserică (raza 150m)',
        opts.church_parking ? 'Parcare pentru biserică declarată în raza de 150m.' : 'Biserica nu are parcare în raza de 150m. La evenimente (nunți, înmormântări, duminici) va bloca circulația. Poate fi parcare comună cu grădinița.',
        'practică urbanistică', !!opts.church_parking);
      add('FNC_003', 'info', 'functiuni', 'Biserică la capăt de ax (reper)', 'Recomandare: biserica la capătul unui ax de perspectivă creează reper urban și mărește calitatea ansamblului.', 'compoziție urbană', null);
    }
    if (pg.gradinita && (pg.comercial_mp || pg.colectiv_units)) add('FNC_004', 'info', 'functiuni', 'Grădiniță ferită de trafic intens', 'De verificat în desen: grădinița la >20m de surse de trafic intens (colector cu CUT>2 sau comerț >500mp).', 'siguranță copii', null);

    // ── Loturi ──
    add('LOT_001', 'info', 'functiuni', 'Front stradal lot ≥8m', 'De verificat la parcelare: fiecare lot de casă individuală cu front stradal ≥8m.', 'HG 525/1996 Art. 25', null);
    add('LOT_002', 'info', 'functiuni', 'Suprafață lot ≥150mp', 'De verificat la parcelare: fiecare lot individual ≥150mp (sau minimul din zona PUG).', 'HG 525/1996 Art. 25', null);
    // roads_pct — din bilanțul Ansamblu (circulații/total)
    var roadsPct = plan.area_m2 ? Math.round(plan.budget.circulatii / plan.area_m2 * 100) : null;
    if (roadsPct != null) add('LOT_004', (roadsPct > 25 || roadsPct < 12) ? 'warning' : 'info', 'functiuni', 'Cotă drumuri 12-25%',
      'Drumurile ocupă ' + roadsPct + '% din teren' + (roadsPct > 25 ? ' — peste 25% (risc de teren irosit pe asfalt).' : roadsPct < 12 ? ' — sub 12% (risc de circulații subdimensionate).' : ' — în intervalul normal 12-25%.'),
      'practică urbanistică', !(roadsPct > 25 || roadsPct < 12));

    // ── Parcaje ──
    if (pg.colectiv_units) {
      var needCol = Math.ceil(pg.colectiv_units * PARK_NORM.collective);
      var have = (plan.budget && plan.budget.parcaje) || 0;
      add('PARK_001', have >= needCol ? 'info' : 'blocking', 'parcare', 'Parcaje locuințe colective (≥1/ap.)',
        have >= needCol ? ('Parcaje prevăzute (' + have + ') acoperă necesarul colectiv (' + needCol + ').') : ('Insuficiente parcaje: ' + have + ' total vs ' + needCol + ' necesare doar pt apartamente (min 1 loc/apartament).'),
        'Ordinul 2264/2020', have >= needCol);
    }
    if (pg.gradinita && pg.biserica) add('PARK_002', 'info', 'parcare', 'Parcare comună grădiniță+biserică', 'Recomandare: grădinița (vârf dimineața/seara) și biserica (duminica) pot împărți o parcare comună — economisește teren și reduce asfaltul.', 'optimizare', null);
    // dominare parcări (estimare amprentă: 25mp/loc)
    if (plan.area_m2 && plan.budget) {
      var parkArea = (plan.budget.parcaje || 0) * 25, parkPct = Math.round(parkArea / plan.area_m2 * 100);
      add('PARK_003', parkPct > 15 ? 'warning' : 'info', 'parcare', 'Parcările ≤15% din teren',
        'Parcările la sol ocupă ~' + parkPct + '% din teren' + (parkPct > 15 ? ' — peste 15%. Reconsiderați: parcare grupată, semi-îngropată sau în structură.' : ' — sub 15%, OK.'),
        'calitate urbană', !(parkPct > 15));
    }

    // ── Verde per ansamblu (Legea 24/2007) ──
    if (plan.budget && plan.population) {
      var greenOk = plan.budget.verde_min >= plan.population * 8;
      add('LOT_003', greenOk ? 'info' : 'warning', 'functiuni', 'Spațiu verde ≥ normă',
        'Spațiu verde ' + (plan.budget.verde_min || 0).toLocaleString('ro-RO') + ' mp pentru ' + plan.population + ' locuitori' + (greenOk ? ' — peste minimul de 8 mp/loc.' : ' — sub minimul de 8 mp/loc.'),
        'Legea 24/2007', greenOk);
    }

    // ── scoruri pe categorii ──
    var cats = ['isu', 'pietonal', 'parcare', 'functiuni'];
    var scores = {};
    cats.forEach(function (c) {
      var rs = V.filter(function (v) { return v.category === c && v.ok !== null; });
      var penalty = V.filter(function (v) { return v.category === c && v.ok === false; }).reduce(function (s, v) { return s + SEV[v.severity].w; }, 0);
      scores[c] = rs.length ? Math.max(0, 100 - penalty) : null;
    });
    var vals = cats.map(function (c) { return scores[c]; }).filter(function (x) { return x != null; });
    scores.overall = vals.length ? Math.round(vals.reduce(function (a, b) { return a + b; }, 0) / vals.length) : null;
    var blocking = V.filter(function (v) { return v.ok === false && v.severity === 'blocking'; });
    return { validations: V, scores: scores, blocking: blocking, can_advance: blocking.length === 0 };
  }

  // ── secțiune transversală SVG ──
  function crossSectionSVG(profileKey, w, h) {
    var p = ROAD_PROFILES[profileKey]; if (!p) return '';
    w = w || 460; h = h || 130;
    var total = p.total_m || (p.carriageway_m + 2 * p.footpath_m + (p.cycle_m || 0) || 6);
    var sc = (w - 20) / total, x0 = 10, gy = h - 34;
    var parts = [];
    // cer
    parts.push('<rect x="0" y="0" width="' + w + '" height="' + h + '" fill="#0a1120"/>');
    // sol
    parts.push('<rect x="0" y="' + gy + '" width="' + w + '" height="' + (h - gy) + '" fill="#1e293b"/>');
    var x = x0;
    function seg(width_m, color, label, dash) { var ww = width_m * sc; if (ww <= 0) return; parts.push('<rect x="' + x.toFixed(1) + '" y="' + (gy - 10) + '" width="' + ww.toFixed(1) + '" height="10" fill="' + color + '"' + (dash ? ' opacity="0.7"' : '') + '/>'); parts.push('<text x="' + (x + ww / 2).toFixed(1) + '" y="' + (gy + 11) + '" fill="#94a3b8" font-size="8" text-anchor="middle">' + label + '</text>'); x += ww; }
    // clădiri schematice stânga/dreapta
    parts.push('<rect x="0" y="' + (gy - 34) + '" width="' + (x0 - 1) + '" height="34" fill="#334155"/>');
    if (p.footpath_m) seg(p.footpath_m, '#cbd5e1', 'trot. ' + p.footpath_m + 'm');
    if (p.cycle_m) seg(p.cycle_m, '#16a34a', 'velo ' + p.cycle_m + 'm', true);
    if (p.carriageway_m) seg(p.carriageway_m, '#555c66', (p.shared ? 'shared ' : 'caros. ') + p.carriageway_m + 'm');
    if (p.cycle_m) seg(p.cycle_m, '#16a34a', 'velo', true);
    if (p.footpath_m) seg(p.footpath_m, '#cbd5e1', 'trot.');
    if (p.pedestrian) seg((p.total_m || 3), '#97C459', 'pietonal ' + (p.total_m || 3) + 'm');
    parts.push('<rect x="' + (x).toFixed(1) + '" y="' + (gy - 34) + '" width="' + (w - x) + '" height="34" fill="#334155"/>');
    // arbori
    if (p.tree_spacing_m) { parts.push('<circle cx="' + (x0 + p.footpath_m * sc / 2) + '" cy="' + (gy - 18) + '" r="6" fill="#3b6d11"/>'); }
    // titlu + total
    parts.push('<text x="10" y="14" fill="#e6edf7" font-size="11" font-weight="700">' + p.label + ' — ' + total + 'm</text>');
    parts.push('<text x="' + (w - 10) + '" y="14" fill="#64748b" font-size="9" text-anchor="end">' + (p.speed_kmh ? p.speed_kmh + ' km/h' : '') + '</text>');
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" style="width:100%;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:8px">' + parts.join('') + '</svg>';
  }

  // ── HTML pt panoul Ansamblu ──
  function renderHTML(plan, opts) {
    var r = validate(plan, opts);
    var lbl = 'font-size:11px;color:#d8b4fe;text-transform:uppercase;letter-spacing:.06em;margin:14px 0 6px;font-weight:700';
    var html = '<div style="' + lbl + '">Validare conformitate (coduri + temei legal)</div>';
    // scoruri
    var sc = r.scores; var scol = function (v) { return v == null ? '#64748b' : v >= 80 ? '#34d399' : v >= 50 ? '#fbbf24' : '#f87171'; };
    html += '<div style="display:flex;gap:6px;margin-bottom:8px">' + [['ISU', sc.isu], ['Pietonal', sc.pietonal], ['Parcare', sc.parcare], ['Funcțiuni', sc.functiuni], ['TOTAL', sc.overall]].map(function (o) {
      return '<div style="flex:1;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:9px;padding:7px;text-align:center"><div style="font-size:15px;font-weight:800;color:' + scol(o[1]) + '">' + (o[1] == null ? '—' : o[1]) + '</div><div style="font-size:9px;color:#94a3b8">' + o[0] + '</div></div>';
    }).join('') + '</div>';
    if (r.blocking.length) html += '<div style="background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.4);color:#fca5a5;border-radius:8px;padding:8px;font-size:12px;font-weight:700;margin-bottom:8px">⛔ ' + r.blocking.length + ' problemă(e) blocantă(e) — avansarea spre PUZ e blocată.</div>';
    // listă reguli grupate pe severitate (blocante/erori întâi)
    var order = { blocking: 0, error: 1, warning: 2, info: 3 };
    r.validations.slice().sort(function (a, b) { return (a.ok === false ? 0 : 1) - (b.ok === false ? 0 : 1) || order[a.severity] - order[b.severity]; }).forEach(function (v) {
      var s = SEV[v.severity]; var col = v.ok === true ? '#34d399' : v.ok === false ? s.col : '#60a5fa';
      html += '<div style="font-size:12px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.05)"><span style="color:' + col + ';font-weight:800">' + (v.ok === true ? '✓' : s.ic) + '</span> <b>' + v.code + '</b> · ' + v.title + (v.legal ? ' <span style="color:#64748b">· ' + v.legal + '</span>' : '') + '<br><span style="color:#94a3b8;font-size:11px;margin-left:16px">' + v.message + '</span></div>';
    });
    // profile stradale (secțiuni transversale)
    html += '<div style="' + lbl + '">Profile stradale (secțiune transversală — NP 068/2002)</div>';
    ['colector_urban', 'local_residential', 'shared_space'].forEach(function (k) { html += '<div style="margin-bottom:6px">' + crossSectionSVG(k) + '</div>'; });
    html += '<div style="font-size:10px;color:#64748b;margin-top:8px">Codurile marcate „de verificat" necesită geometria desenului (lungimi fundături, distanțe, raze de întoarcere) — se confirmă la planșa de reglementări. Restul se evaluează din datele declarate.</div>';
    return html;
  }

  G.LotizareValidator = { validate: validate, crossSectionSVG: crossSectionSVG, renderHTML: renderHTML, ROAD_PROFILES: ROAD_PROFILES, NORMS: { LOT_MIN: LOT_MIN, ISU: ISU, PARK: PARK_NORM } };
  console.log('[LotizareValidator] motor validare lotizare încărcat (window.LotizareValidator)');
})(window);
