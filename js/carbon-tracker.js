/* ============================================================================
 * UrbanX Carbon Tracker (Modul 14) — engine + UI + PDF, client-side.
 * Amprenta de carbon a deciziilor urbanistice: înglobat (construcție) + operațional
 * (utilizare) + transport (din Flux) + buget EU 2030. Etichetă verde A+..D.
 * Model: C40, EU Taxonomy, RICS embodied carbon, IPCC.
 *
 * window.Carbon.compute(input) · openPanel() · generatePDF()
 * ONEST: factori estimativi (kg CO2/m², kWh/m²/an, grid RO ~0.28); orientativ pt ESG.
 * ========================================================================== */
(function (G) {
  'use strict';
  var EMBODIED = { masonry_rc: 400, steel: 500, timber: 150, prefab: 340 }; // kg CO2/m² GBA
  var OPERATIONAL = { locuire: 50, birouri: 90, comercial: 120, mixt: 75, industrial: 80 }; // kWh/m²/an
  var GRID_RO = 0.28; // kg CO2/kWh (ENTSO-E ~2024)
  var TRANSPORT_KG_PER_TRIP_KM = 0.12; // blended (modal mix), kg CO2/deplasare-km
  var AVG_TRIP_KM = 4.2, HORIZON = 30;

  function greenLabel(perM2Lifetime) {
    if (perM2Lifetime < 400) return 'A+'; if (perM2Lifetime < 700) return 'A';
    if (perM2Lifetime < 1100) return 'B'; if (perM2Lifetime < 1600) return 'C'; return 'D';
  }
  function compute(inp) {
    var area = +inp.built_area_m2 || 0, use = inp.use || 'locuire', strc = inp.structural_type || 'masonry_rc';
    var embodied = area * (EMBODIED[strc] || 400) / 1000; // tone
    var operational = area * (OPERATIONAL[use] || 60) * GRID_RO / 1000; // tone/an
    // transport: deplasări/zi estimate (Flux logic), apoi anual
    var tripsDaily = use === 'locuire' ? (area / 75 * 7.2) : (area * 0.07);
    var transport = tripsDaily * AVG_TRIP_KM * TRANSPORT_KG_PER_TRIP_KM * 365 / 1000; // tone/an
    var lifetime = embodied + (operational + transport) * HORIZON;
    var perM2 = area > 0 ? lifetime * 1000 / area : 0;
    return {
      embodied_t: Math.round(embodied), operational_t_yr: Math.round(operational), transport_t_yr: Math.round(transport),
      annual_t: Math.round(operational + transport), lifetime_t: Math.round(lifetime),
      per_m2_lifetime_kg: Math.round(perM2), green_label: greenLabel(perM2),
      trips_daily: Math.round(tripsDaily), structural_type: strc, use: use, area: area,
      timber_saving_t: Math.round((embodied - area * EMBODIED.timber / 1000)) // cât s-ar economisi cu lemn
    };
  }

  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.72);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(620px,95vw);max-height:92vh;overflow:auto;border:1px solid rgba(34,197,94,.4);border-radius:14px;font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:18px 20px', inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:8px 10px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#16a34a,#15803d);color:#fff;border:0;border-radius:9px;padding:11px 16px;font-weight:700;cursor:pointer;font-size:14px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    label: 'font-size:11px;color:#86efac;text-transform:uppercase;letter-spacing:.06em;margin:12px 0 6px;font-weight:700'
  };
  function prefill() { try { var S = G.S; if (S && S.parcels && S.parcels[S.activeParcel == null ? 0 : S.activeParcel]) { var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel]; var reg = (G.REGULI && G.REGULI[ap.utr]) || {}; return { area: ap.area || 0, cut: (ap.params && ap.params.cut) || reg.cut || 1.0, nrcad: ap.nrcad }; } } catch (e) {} return null; }
  function openPanel() {
    var pre = prefill();
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head }); head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">🌍 Carbon Tracker</div><div style="font-size:11px;color:#94a3b8">Amprenta CO₂ a dezvoltării · țintă EU 2030 · etichetă verde</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);
    body.appendChild(el('div', { style: ST.label }, 'Construcție'));
    var g = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px' });
    var area = el('input', { style: ST.inp, type: 'number', placeholder: 'mp ADC' }); area.value = pre ? Math.round(pre.area * pre.cut) : '';
    var useSel = el('select', { style: ST.inp }); [['locuire', 'Locuire'], ['birouri', 'Birouri'], ['comercial', 'Comerț'], ['mixt', 'Mixt'], ['industrial', 'Industrial']].forEach(function (o) { useSel.appendChild(el('option', { value: o[0] }, o[1])); });
    var strc = el('select', { style: ST.inp }); [['masonry_rc', 'Beton armat/zidărie'], ['steel', 'Cadru metalic'], ['prefab', 'Prefabricate'], ['timber', 'Lemn (eco)']].forEach(function (o) { strc.appendChild(el('option', { value: o[0] }, o[1])); });
    g.appendChild(area); g.appendChild(useSel); g.appendChild(strc); body.appendChild(g);
    var run = el('button', { style: ST.btn + ';margin-top:12px' }, '▶ Calculează amprenta'); body.appendChild(run);
    var out = el('div', { style: 'margin-top:14px' }); body.appendChild(out);
    var pdfBtn = el('button', { style: ST.btn + ';display:none;margin-top:10px;background:linear-gradient(180deg,#2563eb,#1d4ed8)' }, '⬇ Raport carbon (PDF)'); body.appendChild(pdfBtn);
    var last = null;
    run.onclick = function () {
      if (!(+area.value > 0)) { out.innerHTML = '<div style="color:#fca5a5;font-size:13px">Completează suprafața ADC.</div>'; return; }
      var r = compute({ built_area_m2: +area.value, use: useSel.value, structural_type: strc.value }); last = r;
      var N = function (x) { return Math.round(x).toLocaleString('ro-RO'); };
      var lc = r.green_label[0] === 'A' ? '#22c55e' : r.green_label === 'B' ? '#84cc16' : r.green_label === 'C' ? '#f59e0b' : '#ef4444';
      function card(b, s, c) { return '<div style="flex:1;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:11px;text-align:center"><div style="font-size:18px;font-weight:800;color:' + (c || '#86efac') + '">' + b + '</div><div style="font-size:10px;color:#94a3b8">' + s + '</div></div>'; }
      out.innerHTML = '<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">' +
        '<div style="width:64px;height:64px;border-radius:12px;background:' + lc + ';display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:900;color:#06101f">' + r.green_label + '</div>' +
        '<div><div style="font-size:13px;color:#94a3b8">Etichetă verde · ' + N(r.per_m2_lifetime_kg) + ' kg CO₂/mp pe 30 ani</div>' +
        '<div style="font-size:11px;color:#86efac">cu structură din lemn ai economisi ~' + N(r.timber_saving_t) + ' t CO₂</div></div></div>' +
        '<div style="display:flex;gap:8px;margin-bottom:8px">' + card(N(r.embodied_t) + ' t', 'înglobat (construcție)') + card(N(r.annual_t) + ' t/an', 'operațional+transport', '#fbbf24') + card(N(r.lifetime_t) + ' t', 'total 30 ani', '#f87171') + '</div>' +
        '<div style="font-size:11px;color:#94a3b8">Operațional ' + N(r.operational_t_yr) + ' t/an · transport ' + N(r.transport_t_yr) + ' t/an (' + N(r.trips_daily) + ' deplasări/zi). Țintă EU 2030: -55% vs 1990.</div>' +
        '<div style="font-size:10px;color:#64748b;margin-top:6px">⚠ Factori estimativi (RICS/IPCC/grid RO 0.28). Orientativ pt raportare ESG/EU Taxonomy.</div>';
      pdfBtn.style.display = '';
    };
    pdfBtn.onclick = function () { if (last) generatePDF(last, { nrcad: pre && pre.nrcad }); };
    ov.appendChild(m); document.body.appendChild(ov);
  }
  function generatePDF(r, meta) {
    meta = meta || {};
    var Jc = (typeof jsPDF !== 'undefined') ? jsPDF : (window.jspdf && window.jspdf.jsPDF) || window.jsPDF; if (!Jc) return;
    var N = window._nf || function (x) { return Math.round(x).toLocaleString('ro-RO'); };
    // Studiu complet pe motorul strategic (chapters/table/barChart) — daca exista; altfel fisa simpla.
    if (typeof window._makeStratDoc !== 'function') { return _genSimple(r, meta, Jc, N); }
    try {
      var pdf = new Jc({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      var D = window._makeStratDoc(pdf, { docTitle: 'STUDIU AMPRENTĂ DE CARBON', cityName: (meta.nrcad ? 'CF ' + meta.nrcad : 'Dezvoltare'), accent: [34, 160, 90] });
      var W = 210, ML = D.dims.ML, CW = D.dims.CW, F = 'DejaVuRO';
      var opAn = r.operational_t_yr + r.transport_t_yr;
      D.setSuppress && D.setSuppress(true); D.setPage && D.setPage(1);
      pdf.setFillColor(6, 22, 14); pdf.rect(0, 0, W, 297, 'F'); pdf.setFillColor(34, 160, 90); pdf.rect(0, 60, W, 1.4, 'F');
      try { if (window._drawUrbanxLogo) { window._drawUrbanxLogo(pdf, W / 2 - 9, 16, 18); pdf.__hasCoverLogo = 1; } } catch (e) {}
      pdf.setTextColor(134, 239, 172); pdf.setFont(F, 'bold'); pdf.setFontSize(9); pdf.text('URBANX · CARBON TRACKER', W / 2, 44, { align: 'center' });
      pdf.setTextColor(255, 255, 255); pdf.setFontSize(26); pdf.text('STUDIU AMPRENTĂ DE CARBON', W / 2, 92, { align: 'center' });
      pdf.setFontSize(14); pdf.setTextColor(134, 239, 172); pdf.text(D.S2((meta.nrcad ? 'CF ' + meta.nrcad + ' · ' : '') + N(r.area) + ' mp · ' + r.use), W / 2, 104, { align: 'center' });
      pdf.setFontSize(11); pdf.setTextColor(150, 200, 170); pdf.text('Clasă energetică estimată: ' + r.green_label + ' · ' + N(r.lifetime_t) + ' t CO₂ pe ciclu de viață (30 ani)', W / 2, 116, { align: 'center' });
      D.setSuppress && D.setSuppress(false);

      D.chapter('1. Rezumat executiv');
      D.P('Prezentul studiu cuantifică amprenta de carbon a dezvoltării analizate (' + N(r.area) + ' mp, funcțiune „' + r.use + '") pe întregul ciclu de viață, conform metodologiei de evaluare a ciclului de viață (LCA). Emisiile totale estimate sunt de ' + N(r.lifetime_t) + ' tone CO₂ echivalent pe un orizont de 30 de ani, respectiv ' + N(r.per_m2_lifetime_kg) + ' kg CO₂/mp — corespunzând clasei de performanță „' + r.green_label + '". Studiul are caracter orientativ și servește raportării ESG, alinierii la Taxonomia UE și la Convenția Primarilor.');
      D.callout && D.callout('Concluzie', 'Carbonul înglobat (' + N(r.embodied_t) + ' t) reprezintă investiția inițială de emisii, recuperată/amortizată pe durata de viață, în timp ce emisiile operaționale (' + N(opAn) + ' t/an) sunt recurente — de aceea decarbonarea energetică și mobilitatea sustenabilă au impactul cel mai mare pe termen lung.');

      D.newPage && D.newPage();
      D.chapter('2. Metodologie (LCA · EN 15978)');
      D.P('Evaluarea urmează standardul EN 15978 (Sustainability of construction works — Assessment of environmental performance of buildings) și ghidul RICS „Whole life carbon assessment". Amprenta totală însumează trei componente: (A) carbonul ÎNGLOBAT (embodied) — emisiile din producția materialelor, transport și punere în operă (modulele A1–A5); (B) carbonul OPERAȚIONAL — emisiile din consumul de energie pe durata exploatării (modulele B6), funcție de mixul energetic național; (C) carbonul INDUS de TRANSPORT — emisiile generate de deplasările utilizatorilor, dependente de localizare și de accesibilitate.');
      D.P('Factorii de emisie utilizați: pentru carbonul înglobat — valori de referință pe tip structural (RICS/ICE database, cca. 300–500 kg CO₂/mp construit); pentru operațional — intensitatea carbonică a rețelei electrice românești (~0,28 kg CO₂/kWh, sursă ENTSO-E/Transelectrica) aplicată consumului specific pe funcțiune; pentru transport — distanța medie pe deplasare și factorul de emisie auto, scalate la numărul de deplasări anuale induse. Orizontul de evaluare este de 30 de ani, conform practicii uzuale pentru clădiri rezidențiale.');
      D.formula && D.formula('Carbon total pe ciclu de viață', 'C_total = C_inglobat + (C_operational + C_transport) × 30 ani', 'rezultat în tone CO₂ echivalent');

      D.chapter('3. Date de intrare');
      D.table && D.table(['Parametru', 'Valoare'], [
        ['Suprafață construită', N(r.area) + ' mp'],
        ['Funcțiune', String(r.use)],
        ['Tip structural', String(r.structural_type)],
        ['Orizont de evaluare', '30 ani'],
        ['Intensitate rețea RO', '~0,28 kg CO₂/kWh'],
      ], [CW * 0.5, CW * 0.5]);

      D.newPage && D.newPage();

      D.chapter('4. Carbon înglobat (embodied)');
      D.P('Carbonul înglobat estimat este de ' + N(r.embodied_t) + ' tone CO₂, aferent structurii de tip „' + r.structural_type + '". Acesta concentrează emisiile „din prima zi" — produse înainte ca clădirea să fie utilizată — și este, în consecință, ireversibil odată construcția realizată. Reducerea sa se obține prin alegerea materialelor cu amprentă redusă (lemn structural, beton cu ciment compozit, oțel reciclat) și prin optimizarea cantităților.');
      D.P('Pentru această dezvoltare, trecerea la o structură pe bază de lemn (CLT/glulam) ar economisi cca. ' + N(r.timber_saving_t) + ' tone CO₂ față de soluția curentă — lemnul stocând carbon biogenic pe durata de viață a clădirii.');

      D.newPage && D.newPage();
      D.chapter('5. Carbon operațional și din transport');
      D.P('Emisiile operaționale sunt estimate la ' + N(r.operational_t_yr) + ' tone CO₂/an (energie pentru încălzire, răcire, apă caldă, iluminat, echipamente), iar cele induse de transport la ' + N(r.transport_t_yr) + ' tone CO₂/an (deplasările utilizatorilor). Pe orizontul de 30 de ani, acestea cumulează ' + N(opAn * 30) + ' tone CO₂ — partea dominantă a amprentei totale, ceea ce confirmă că eficiența energetică (NZEB), sursele regenerabile (fotovoltaic) și localizarea accesibilă (reducerea deplasărilor auto) sunt pârghiile decisive.');
      if (D.barChart) {
        D.barChart([
          ['Înglobat (o dată)', Math.round(r.embodied_t), [120, 100, 60]],
          ['Operațional ×30', Math.round(r.operational_t_yr * 30), [34, 160, 90]],
          ['Transport ×30', Math.round(r.transport_t_yr * 30), [59, 130, 246]],
        ], { title: 'Defalcarea amprentei pe ciclul de viață (t CO₂, 30 ani)', h: 48, source: 'Model LCA UrbanX · EN 15978' });
      }

      D.chapter('6. Total ciclu de viață și clasificare');
      D.table && D.table(['Componentă', 't CO₂', 'Pondere'], [
        ['Carbon înglobat', N(r.embodied_t), Math.round(r.embodied_t / Math.max(1, r.lifetime_t) * 100) + '%'],
        ['Operațional (30 ani)', N(r.operational_t_yr * 30), Math.round(r.operational_t_yr * 30 / Math.max(1, r.lifetime_t) * 100) + '%'],
        ['Transport (30 ani)', N(r.transport_t_yr * 30), Math.round(r.transport_t_yr * 30 / Math.max(1, r.lifetime_t) * 100) + '%'],
        ['TOTAL', N(r.lifetime_t), '100%'],
      ], [CW * 0.46, CW * 0.27, CW * 0.27]);
      D.P('Intensitatea de ' + N(r.per_m2_lifetime_kg) + ' kg CO₂/mp plasează dezvoltarea în clasa „' + r.green_label + '". Ținta UE 2030 prevede o reducere de -55% față de 1990; clădirile noi trebuie să tindă către neutralitate climatică până în 2050 (Green Deal).');

      D.newPage && D.newPage();

      D.chapter('7. Scenarii de reducere (decarbonare)');
      D.P('Pe baza structurii amprentei, se conturează un plan de reducere cu impact gradual:');
      D.bullets && D.bullets([
        'Anvelopă NZEB (izolare, tâmplărie performantă) — reduce operaționalul cu 30–50%;',
        'Sistem fotovoltaic + pompe de căldură — reduce operaționalul cu încă 20–40% și decarbonează sursa;',
        'Structură pe lemn / materiale cu amprentă redusă — economie de cca. ' + N(r.timber_saving_t) + ' t CO₂ înglobat;',
        'Localizare accesibilă + mobilitate dulce — reduce transportul indus cu 20–40%;',
        'Verde urban (3-30-300) — sechestrare suplimentară și reducerea insulei de căldură.',
      ]);
      D.P('Cumulat, un pachet ambițios poate reduce amprenta totală cu 40–60% față de scenariul de referință, apropiind dezvoltarea de clasa A și de cerințele de raportare ESG/Taxonomie UE.');

      D.newPage && D.newPage();
      D.chapter('8. Cadru de raportare și aplicații');
      D.P('Rezultatele susțin: raportarea ESG (pilonul de mediu — emisii GES Scope 1–3); verificarea alinierii la Taxonomia UE (criteriul „contribuție substanțială la atenuarea schimbărilor climatice"); angajamentele asumate în cadrul Convenției Primarilor (Covenant of Mayors) și ale Planurilor de Acțiune pentru Energie Durabilă și Climă (PAEDC/SECAP); fundamentarea cererilor de finanțare verde (fonduri UE, credite cu dobândă preferențială pentru clădiri sustenabile).');

      D.newPage && D.newPage();

      D.chapter('9. Limitări și disclaimer');
      D.P('Studiul este ORIENTATIV. Valorile sunt estimate cu factori de emisie de referință (RICS/ICE, IPCC, ENTSO-E), nu din facturi energetice reale sau dintr-o analiză detaliată a materialelor (BoQ). NU înlocuiește un audit de carbon certificat sau o evaluare LCA detaliată realizată de un expert. Pentru raportare oficială ESG/Taxonomie se recomandă verificarea de către un evaluator acreditat și utilizarea datelor măsurate.');

      D.chapter('10. Surse și bibliografie');
      D.P('EN 15978:2011 — evaluarea performanței de mediu a clădirilor; RICS — „Whole Life Carbon Assessment for the Built Environment"; ICE Database (Inventory of Carbon & Energy); IPCC AR6 — factori de emisie; ENTSO-E / Transelectrica — intensitatea carbonică a rețelei RO; Comisia Europeană — EU Green Deal, Taxonomia UE, Convenția Primarilor. Metodologie internă UrbanX · ThinkSmart Solutions.');

      var fn = ('Studiu_Carbon_' + (meta.nrcad || 'sit') + '_' + new Date().toISOString().slice(0, 10) + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
      window._buildStratTOC && window._buildStratTOC(D, 1);
      pdf.save(fn);
      G.ss && G.ss('✅ Studiu amprentă de carbon generat: ' + pdf.getNumberOfPages() + ' pagini');
    } catch (e) { console.error('[Carbon PDF]', e); try { _genSimple(r, meta, Jc, N); } catch (e2) {} }
  }
  // fallback fisa simpla (daca motorul strategic lipseste)
  function _genSimple(r, meta, Jc, N) {
    var pdf = new Jc({ orientation: 'portrait', unit: 'mm', format: 'a4' }); try { window._registerROFont && window._registerROFont(pdf); } catch (e) {}
    var F = 'DejaVuRO', W = 210, today = new Date().toLocaleDateString('ro-RO');
    pdf.setFont(F, 'bold'); pdf.setFontSize(14); pdf.text('Studiu amprentă de carbon', 16, 20);
    pdf.setFont(F, 'normal'); pdf.setFontSize(10); var y = 32;
    [['Suprafață', N(r.area) + ' mp · ' + r.use], ['Înglobat', N(r.embodied_t) + ' t CO₂'], ['Operațional', N(r.operational_t_yr) + ' t/an'], ['Transport', N(r.transport_t_yr) + ' t/an'], ['TOTAL 30 ani', N(r.lifetime_t) + ' t CO₂'], ['Clasă', r.green_label]].forEach(function (kv) { pdf.text(kv[0] + ': ' + kv[1], 16, y); y += 8; });
    pdf.save('Carbon_' + (meta.nrcad || 'sit') + '.pdf');
  }
  G.Carbon = { compute: compute, openPanel: openPanel, generatePDF: generatePDF };
  console.log('[Carbon] modul Carbon Tracker încărcat (window.Carbon)');
})(window);
