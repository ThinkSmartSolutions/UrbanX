/* ============================================================================
 * UrbanX — Motor de validare LOISIR (coduri + temei legal + severitate).
 * Conform CLAUDE_CODE_PROMPT_LOISIR_V2 — verifică o PROPUNERE de parc față de
 * normative: PMR, echipamente (EN), ecologie, program spațial, mobilier, cost.
 * Catalog reguli: PMR_001-004 · ECH_001-005 · ECO_001-004 · PRG_001-005 ·
 *                 MOB_001-002 · CST_001-002.
 * window.LoisirValidator: validate(proposal) · renderHTML(proposal) · RULES
 * Surse: NP 051/2012 + Legea 448/2006 (PMR) · EN 1176/1177/16630 · SR EN 13201-2
 *  · Legea 24/2007 · EU Biodiversity 2030 / Nature Restoration 2023 · STAS 1478.
 * ========================================================================== */
(function (G) {
  'use strict';
  var COST = { basic_min: 150, premium_max: 900 };
  var SEV = { blocking: { w: 50, ic: '⛔', col: '#ef4444' }, error: { w: 25, ic: '✕', col: '#f97316' }, warning: { w: 10, ic: '⚠', col: '#f59e0b' }, info: { w: 0, ic: 'ⓘ', col: '#60a5fa' } };

  // proposal: { area_m2, population_served, promenada_width_m, promenada_length_m,
  //   joaca_present, joaca_pmr_access, age_separation, caini_present, caini_joaca_dist_m,
  //   amfiteatru_present, amfiteatru_pmr_ramp, fitness_present, en1176, en1177, en16630,
  //   native_species_pct, permeability_pct, canopy_pct, apa_present, margini_beton,
  //   toalete_count, toalete_pmr_count, fantana_count, banci_count, cosuri_count,
  //   alei_length_m, iluminat_present, estimated_cost_ron }
  function validate(p) {
    p = p || {}; var V = []; var area = +p.area_m2 || 0, ha = area / 10000;
    var add = function (code, sev, cat, title, msg, legal, ok) { V.push({ code: code, severity: sev, category: cat, title: title, message: msg, legal: legal || '', ok: ok }); };
    var U = function (v) { return v === undefined || v === null; }; // necunoscut → INFO checklist

    // ── PMR ──
    if (!U(p.promenada_width_m)) add('PMR_001', p.promenada_width_m < 1.5 ? 'blocking' : 'info', 'PMR', 'Alee principală accesibilă',
      p.promenada_width_m < 1.5 ? ('Promenada principală (' + p.promenada_width_m + 'm) e sub minimul de 1.5m pentru accesibilitate PMR.') : ('Promenada ' + p.promenada_width_m + 'm ≥ 1.5m — OK.'),
      'NP 051/2012 + Legea 448/2006', p.promenada_width_m >= 1.5);
    if (p.joaca_present) add('PMR_002', p.joaca_pmr_access === false ? 'error' : 'info', 'PMR', 'Zonă joacă accesibilă PMR',
      p.joaca_pmr_access === false ? 'Zona de joacă nu are acces PMR (traseu fără trepte de la aleea principală — obligatoriu).' : 'De confirmat: cel puțin un traseu fără trepte de la aleea principală la zona de joacă.',
      'NP 051/2012 Art. 4.3', p.joaca_pmr_access);
    if (!U(p.toalete_count) && p.toalete_count > 0) add('PMR_003', (p.toalete_pmr_count || 0) < 1 ? 'blocking' : 'info', 'PMR', 'Cabină toaletă PMR',
      (p.toalete_pmr_count || 0) < 1 ? 'Nicio cabină PMR în toalete. Minim 1 cabină adaptată PMR e obligatorie.' : 'Cabină PMR prezentă — OK.',
      'NP 051/2012 + STAS 1478', (p.toalete_pmr_count || 0) >= 1);
    if (p.amfiteatru_present) add('PMR_004', p.amfiteatru_pmr_ramp === false ? 'error' : 'info', 'PMR', 'Scenă accesibilă PMR',
      p.amfiteatru_pmr_ramp === false ? 'Scena amfiteatrului nu are rampă PMR. Artiștii cu dizabilități trebuie să poată urca pe scenă.' : 'De confirmat: rampă de acces PMR la scenă.',
      'NP 051/2012', p.amfiteatru_pmr_ramp);

    // ── Echipamente ──
    if (p.joaca_present) {
      add('ECH_001', p.en1176 === false ? 'blocking' : 'info', 'Echipamente', 'Standard EN 1176 joacă',
        p.en1176 === false ? 'Echipamentele de joacă nu declară conformitatea EN 1176-1:2017 (certificare CE obligatorie).' : 'De confirmat: echipamente certificate CE conform EN 1176-1:2017.',
        'EN 1176-1:2017', p.en1176);
      add('ECH_002', p.en1177 === false ? 'blocking' : 'info', 'Echipamente', 'Suprafață amortizoare EN 1177',
        p.en1177 === false ? 'Zona de joacă nu menționează suprafața amortizoare (EN 1177:2018). Gazonul simplu NU e acceptat sub echipamente.' : 'De confirmat: suprafață amortizoare certificată EN 1177:2018.',
        'EN 1177:2018', p.en1177);
      add('ECH_004', p.age_separation === false ? 'warning' : 'info', 'Echipamente', 'Separare vârste joacă (2-6 / 7-12)',
        p.age_separation === false ? 'Recomandare: separarea vizuală a zonelor 2-6 ani și 7-12 ani reduce riscul de accidentare.' : 'De confirmat: separarea vizuală a grupelor de vârstă.',
        'Ord. MS 536/1997', p.age_separation);
    }
    if (p.fitness_present) add('ECH_003', p.en16630 === false ? 'error' : 'info', 'Echipamente', 'Standard EN 16630 fitness',
      p.en16630 === false ? 'Aparatele fitness outdoor nu declară EN 16630:2015 (certificare obligatorie).' : 'De confirmat: aparate certificate EN 16630:2015.',
      'EN 16630:2015', p.en16630);
    if (p.caini_present && p.joaca_present) add('ECH_005', (!U(p.caini_joaca_dist_m) && p.caini_joaca_dist_m < 20) ? 'error' : 'info', 'Echipamente', 'Separare câini ↔ joacă',
      (!U(p.caini_joaca_dist_m) && p.caini_joaca_dist_m < 20) ? ('Zona câinilor și joaca copiilor la ' + p.caini_joaca_dist_m + 'm. Minim recomandat 20m cu separare vizuală.') : 'De confirmat: min 20m între zona câinilor și zona de joacă.',
      'siguranță / igienă', U(p.caini_joaca_dist_m) ? null : p.caini_joaca_dist_m >= 20);

    // ── Ecologie ──
    if (!U(p.native_species_pct)) add('ECO_001', p.native_species_pct < 80 ? 'warning' : 'info', 'Ecologie', 'Specii native ≥80%',
      p.native_species_pct < 80 ? ('Lista conține ' + p.native_species_pct + '% specii native. Norma EU + națională: min 80% pentru parcuri publice.') : (p.native_species_pct + '% specii native — OK.'),
      'EU Biodiversity 2030 + HG 525/1996', p.native_species_pct >= 80);
    if (!U(p.permeability_pct)) { var imp = 100 - p.permeability_pct; add('ECO_002', imp > 30 ? 'error' : 'info', 'Ecologie', 'Suprafață impermeabilă ≤30%',
      imp > 30 ? ('Suprafețele impermeabile (' + imp + '%) depășesc maximul de 30% — inundații locale + insulă de căldură.') : ('Impermeabil ' + imp + '% ≤ 30% — OK.'),
      'EU Stormwater Directive + Legea 107/1996', imp <= 30); }
    if (!U(p.canopy_pct)) add('ECO_003', p.canopy_pct < 30 ? 'warning' : 'info', 'Ecologie', 'Acoperire arboricolă ≥30%',
      p.canopy_pct < 30 ? ('Acoperirea cu coronament (' + p.canopy_pct + '%) e sub 30% (OMS + EU Nature Restoration Law).') : (p.canopy_pct + '% canopy — OK.'),
      'EU Nature Restoration Law 2023 Art. 6', p.canopy_pct >= 30);
    if (p.apa_present) add('ECO_004', p.margini_beton === true ? 'error' : 'info', 'Ecologie', 'Maluri naturalizate (nu beton)',
      p.margini_beton === true ? 'Malurile bazinului sunt din beton — elimină habitatul acvatic. Folosiți margini naturalizate (papură, stuf, arin).' : 'De confirmat: margini naturalizate, nu beton.',
      'practică ecologică', U(p.margini_beton) ? null : !p.margini_beton);

    // ── Program spațial ──
    if (ha > 0.5) add('PRG_001', p.promenada_length_m === 0 || p.promenada_present === false ? 'blocking' : 'info', 'Program', 'Promenadă continuă',
      (p.promenada_length_m === 0 || p.promenada_present === false) ? 'Parcul nu are promenadă definită. O buclă pietonală principală e obligatorie pt orice parc >0.5ha.' : 'De confirmat: buclă pietonală principală continuă.',
      'practică urbanistică', (p.promenada_present !== false && p.promenada_length_m !== 0));
    if (!U(p.population_served) && p.population_served > 0 && area > 0) { var vpl = Math.round(area / p.population_served); add('PRG_002', vpl < 26 ? 'warning' : 'info', 'Program', 'Verde ≥26 mp/locuitor',
      vpl < 26 ? ('Suprafața de ' + vpl + ' mp/locuitor e sub limita legală de 26 (populație deservită: ' + p.population_served + ').') : (vpl + ' mp/loc ≥ 26 — OK.'),
      'Legea 24/2007 Art. 7', vpl >= 26); }
    if (ha > 1) add('PRG_003', (p.toalete_count || 0) === 0 ? 'error' : 'info', 'Program', 'Toalete ≥1/ha',
      (p.toalete_count || 0) === 0 ? ('Nicio toaletă pentru un parc de ' + (Math.round(ha * 10) / 10) + 'ha. Norma: 1 grup/ha, min 2 cabine.') : 'Toalete prezente — OK.',
      'STAS 1478 + norme sanitare', (p.toalete_count || 0) > 0);
    if (ha > 0.5) add('PRG_004', (p.fantana_count || 0) === 0 ? 'warning' : 'info', 'Program', 'Fântână apă potabilă',
      (p.fantana_count || 0) === 0 ? 'Nicio fântână de apă potabilă (norma: 1/ha, înălțimi adulți 90/copii 65/câini 25cm).' : 'Fântână prezentă — OK.',
      'norme sanitare', (p.fantana_count || 0) > 0);
    add('PRG_005', p.iluminat_present === false ? 'warning' : 'info', 'Program', 'Iluminat nocturn',
      p.iluminat_present === false ? 'Iluminatul nocturn lipsește. Parcurile trebuie iluminate (min 5 lux pe alei).' : 'De confirmat: iluminat min 5 lux pe alei.',
      'SR EN 13201-2', p.iluminat_present);

    // ── Mobilier ──
    if (!U(p.promenada_length_m) && p.promenada_length_m > 0) { var needB = Math.round(p.promenada_length_m / 200); add('MOB_001', (p.banci_count || 0) < needB ? 'warning' : 'info', 'Mobilier', 'Bănci (1/200m promenadă)',
      (p.banci_count || 0) < needB ? ((p.banci_count || 0) + ' bănci pentru ' + p.promenada_length_m + 'm promenadă — necesare ~' + needB + ' (1/200m).') : 'Bănci suficiente — OK.',
      'norme', (p.banci_count || 0) >= needB); }
    if (!U(p.alei_length_m) && p.alei_length_m > 0) { var needC = Math.round(p.alei_length_m / 50); add('MOB_002', (p.cosuri_count || 0) < needC ? 'warning' : 'info', 'Mobilier', 'Coșuri gunoi (1/50m alee)',
      (p.cosuri_count || 0) < needC ? ((p.cosuri_count || 0) + ' coșuri pentru ' + p.alei_length_m + 'm alei — necesare ~' + needC + ' (1/50m).') : 'Coșuri suficiente — OK.',
      'norme', (p.cosuri_count || 0) >= needC); }

    // ── Cost ──
    if (!U(p.estimated_cost_ron) && area > 0) { var rmp = Math.round(p.estimated_cost_ron / area);
      add('CST_001', rmp < COST.basic_min ? 'warning' : 'info', 'Cost', 'Cost ≥ minim realist',
        rmp < COST.basic_min ? ('Buget ' + rmp + ' RON/mp sub minimul de ' + COST.basic_min + ' RON/mp pentru amenajare de bază — risc de propunere nerealizabilă.') : (rmp + ' RON/mp — peste minim.'),
        'benchmark RO 2024', rmp >= COST.basic_min);
      if (rmp > COST.premium_max) add('CST_002', 'info', 'Cost', 'Cost peste nivel premium', 'Buget ' + rmp + ' RON/mp peste nivelul premium (' + COST.premium_max + '). Verificați devizul / explicați elementele speciale.', 'benchmark RO 2024', null);
    }

    // scoruri pe categorii
    var cats = ['PMR', 'Echipamente', 'Ecologie', 'Program', 'Mobilier', 'Cost'];
    var scores = {};
    cats.forEach(function (c) { var rs = V.filter(function (v) { return v.category === c && v.ok !== null; }); var pen = V.filter(function (v) { return v.category === c && v.ok === false; }).reduce(function (s, v) { return s + SEV[v.severity].w; }, 0); scores[c] = rs.length ? Math.max(0, 100 - pen) : null; });
    var vals = cats.map(function (c) { return scores[c]; }).filter(function (x) { return x != null; });
    scores.overall = vals.length ? Math.round(vals.reduce(function (a, b) { return a + b; }, 0) / vals.length) : null;
    var blocking = V.filter(function (v) { return v.ok === false && v.severity === 'blocking'; });
    return { validations: V, scores: scores, blocking: blocking, conform: blocking.length === 0 };
  }

  function renderHTML(proposal) {
    var r = validate(proposal);
    var scol = function (v) { return v == null ? '#64748b' : v >= 80 ? '#34d399' : v >= 50 ? '#fbbf24' : '#f87171'; };
    var s = r.scores;
    var html = '<div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:8px">' + [['PMR', s.PMR], ['Echip.', s.Echipamente], ['Ecolog.', s.Ecologie], ['Program', s.Program], ['Mobilier', s.Mobilier], ['Cost', s.Cost], ['TOTAL', s.overall]].map(function (o) {
      return '<div style="flex:1;min-width:54px;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:6px;text-align:center"><div style="font-size:14px;font-weight:800;color:' + scol(o[1]) + '">' + (o[1] == null ? '—' : o[1]) + '</div><div style="font-size:8px;color:#94a3b8">' + o[0] + '</div></div>';
    }).join('') + '</div>';
    if (r.blocking.length) html += '<div style="background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.4);color:#fca5a5;border-radius:8px;padding:8px;font-size:12px;font-weight:700;margin-bottom:8px">⛔ ' + r.blocking.length + ' problemă(e) blocantă(e) — propunere neconformă.</div>';
    var order = { blocking: 0, error: 1, warning: 2, info: 3 };
    r.validations.slice().sort(function (a, b) { return (a.ok === false ? 0 : 1) - (b.ok === false ? 0 : 1) || order[a.severity] - order[b.severity]; }).forEach(function (v) {
      var sv = SEV[v.severity]; var col = v.ok === true ? '#34d399' : v.ok === false ? sv.col : '#60a5fa';
      html += '<div style="font-size:12px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.05)"><span style="color:' + col + ';font-weight:800">' + (v.ok === true ? '✓' : sv.ic) + '</span> <b>' + v.code + '</b> · ' + v.title + (v.legal ? ' <span style="color:#64748b">· ' + v.legal + '</span>' : '') + '<br><span style="color:#94a3b8;font-size:11px;margin-left:16px">' + v.message + '</span></div>';
    });
    return html;
  }

  G.LoisirValidator = { validate: validate, renderHTML: renderHTML };
  console.log('[LoisirValidator] motor validare propunere parc încărcat (window.LoisirValidator)');
})(window);
