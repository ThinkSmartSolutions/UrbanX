/* ============================================================================
 * UrbanX Flux — Generator PDF "Studiu preliminar de impact de trafic"
 * window.Flux.generatePDF(result, meta) -> salvează PDF (jsPDF + font RO).
 * Disciplina de integritate: disclaimer proeminent (pre-analiză, nu substituie
 * studiu de trafic / PMUD elaborat de proiectant atestat).
 * ========================================================================== */
(function (G) {
  'use strict';
  G.Flux = G.Flux || {};

  function jsPDFctor() {
    if (typeof jsPDF !== 'undefined') return jsPDF;
    if (window.jspdf && window.jspdf.jsPDF) return window.jspdf.jsPDF;
    if (typeof window.jsPDF !== 'undefined') return window.jsPDF;
    return null;
  }

  var GREEN = [34, 160, 90], DARK = [8, 15, 35], GRAY = [120, 140, 160], WHITE = [255, 255, 255];

  function N(x) { return (Math.round(x)).toLocaleString('ro-RO'); }

  G.Flux.generatePDF = function (res, meta) {
    meta = meta || {};
    var J = jsPDFctor();
    if (!J) { window.ss && ss('❌ jsPDF indisponibil'); return; }
    var Nn = function (x) { try { return Math.round(x).toLocaleString('ro-RO'); } catch (e) { return String(x); } };
    if (typeof window._makeStratDoc === 'function') { try { return _fluxStudy(res, meta, J, Nn); } catch (e) { console.error('[Flux PDF]', e); } }
    var pdf = new J({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    try { window._registerROFont && window._registerROFont(pdf); } catch (e) {}
    var FONT = 'DejaVuRO';
    var W = 210, H = 297, today = new Date().toLocaleDateString('ro-RO');
    var siteName = meta.site_name || 'Sit propus';
    var cityName = meta.city_name || '';

    // ── ANTET ────────────────────────────────────────────────────────────
    pdf.setFillColor.apply(pdf, DARK); pdf.rect(0, 0, W, 30, 'F');
    pdf.setFillColor.apply(pdf, GREEN); pdf.rect(0, 0, W, 3, 'F');
    try { window._pdfStampLogo && window._pdfStampLogo(pdf, 7, 7, 17); } catch (e) {}
    pdf.setTextColor(120, 230, 170); pdf.setFont(FONT, 'bold'); pdf.setFontSize(8);
    pdf.text('URBANX FLUX · INTELIGENȚA MOBILITĂȚII URBANE', W / 2, 12, { align: 'center' });
    pdf.setTextColor.apply(pdf, WHITE); pdf.setFontSize(15);
    pdf.text('Studiu preliminar de impact de trafic', W / 2, 21, { align: 'center' });
    pdf.setTextColor(150, 190, 170); pdf.setFontSize(8);
    pdf.text(siteName + (cityName ? ('  ·  ' + cityName) : '') + '  ·  ' + today, W / 2, 27, { align: 'center' });

    var y = 40;
    function h(t) {
      pdf.setFillColor(238, 244, 240); pdf.rect(12, y - 4, W - 24, 7, 'F');
      pdf.setTextColor.apply(pdf, GREEN); pdf.setFont(FONT, 'bold'); pdf.setFontSize(10);
      pdf.text(t, 14, y + 1); y += 11;
    }
    function kv(label, val, color) {
      pdf.setTextColor(90, 100, 120); pdf.setFont(FONT, 'normal'); pdf.setFontSize(9);
      pdf.text(label, 16, y);
      pdf.setTextColor.apply(pdf, color || [20, 30, 50]); pdf.setFont(FONT, 'bold'); pdf.setFontSize(9.5);
      pdf.text(String(val), 110, y); y += 6.5;
    }

    // ── 1. FUNCȚIUNI PROPUSE ────────────────────────────────────────────
    h('1. Funcțiuni propuse pe sit');
    (meta.land_uses || []).forEach(function (lu) {
      var label = (G.Flux.LAND_USE_LABELS[lu.land_use] || lu.land_use);
      var qty = lu.units ? (N(lu.units) + ' unități') : (N(lu.gross_floor_area_sqm) + ' mp ADC');
      kv((lu.label || label), qty);
    });

    // ── 2. GENERARE DEPLASĂRI ───────────────────────────────────────────
    var g = res.trips_detail;
    h('2. Generare deplasări (ITE adaptat RO)');
    kv('Ora de vârf AM (total)', N(g.am_total) + ' depl/h  (intrări ' + N(g.am_in) + ' / ieșiri ' + N(g.am_out) + ')');
    kv('Ora de vârf PM (total)', N(g.pm_total) + ' depl/h  (intrări ' + N(g.pm_in) + ' / ieșiri ' + N(g.pm_out) + ')', GREEN);
    kv('Total zilnic estimat', N(g.daily) + ' deplasări');

    // ── 3. REPARTIȚIE MODALĂ ────────────────────────────────────────────
    h('3. Repartiție modală (ora de vârf PM)');
    var ms = res.modal_split, c = res.trips_by_mode_pm;
    kv('Autoturism', Math.round(ms.auto * 100) + '%  (' + N(c.auto) + ' depl)');
    kv('Transport public', Math.round(ms.pt * 100) + '%  (' + N(c.pt) + ' depl)');
    kv('Bicicletă / Pietonal', Math.round(ms.bicycle * 100) + '% / ' + Math.round(ms.pedestrian * 100) + '%');

    // ── 4. ÎNCĂRCARE INTERSECȚII ────────────────────────────────────────
    if (res.intersections && res.intersections.length) {
      h('4. Încărcare intersecții adiacente (v/c · LOS · STAS 10144)');
      res.intersections.forEach(function (i) {
        var col = i.over_capacity ? [200, 40, 40] : (i.vc_ratio > 0.75 ? [200, 130, 20] : [30, 140, 60]);
        var flag = i.over_capacity ? '  ⚠ peste capacitate' : '';
        kv(i.name, 'v/c ' + i.vc_ratio.toFixed(2) + ' · LOS ' + i.los + ' · +' + N(i.added_veh_hr) + ' veh/h' + flag, col);
      });
    }

    // ── 5. PARCARE ──────────────────────────────────────────────────────
    h('5. Necesar parcare (GD 525/1996)');
    var p = res.parking_demand;
    kv('Necesar normativ', N(p.required_normative) + ' locuri');
    kv('După reducere proximitate TP', N(p.required_after_reduction) + ' locuri  (-' + p.pt_reduction_pct + '%)', GREEN);

    // ── 6. EMISII ───────────────────────────────────────────────────────
    h('6. Emisii CO2 (IPCC 2023 + mix RO)');
    kv('Emisii zilnice', N(res.emissions.total_kg_day) + ' kg CO2/zi');
    kv('Echivalent anual', N(res.emissions.total_tonnes_year) + ' t CO2/an');

    // ── 7. CONFORMITATE ─────────────────────────────────────────────────
    h('7. Verificare conformitate');
    (res.compliance || []).forEach(function (ch) {
      var col = ch.status === 'FAIL' ? [200, 40, 40] : ch.status === 'PASS' ? [30, 140, 60] : [90, 100, 120];
      pdf.setTextColor.apply(pdf, col); pdf.setFont(FONT, 'bold'); pdf.setFontSize(9);
      pdf.text('[' + ch.status + '] ' + ch.ref, 16, y);
      pdf.setTextColor(70, 80, 100); pdf.setFont(FONT, 'normal'); pdf.setFontSize(8);
      var lines = pdf.splitTextToSize(ch.detail, W - 32);
      pdf.text(lines, 16, y + 4.5); y += 5 + lines.length * 4.2 + 2;
    });

    // ── DISCLAIMER LEGAL PROEMINENT (jos) ───────────────────────────────
    var dy = H - 34;
    pdf.setFillColor(60, 20, 18); pdf.rect(12, dy, W - 24, 22, 'F');
    pdf.setDrawColor(220, 80, 60); pdf.setLineWidth(0.5); pdf.rect(12, dy, W - 24, 22, 'S');
    pdf.setFillColor(220, 80, 60); pdf.rect(12, dy, W - 24, 6, 'F');
    pdf.setTextColor.apply(pdf, WHITE); pdf.setFont(FONT, 'bold'); pdf.setFontSize(8);
    pdf.text('⚠ INSTRUMENT DE PRE-ANALIZĂ', W / 2, dy + 4.2, { align: 'center' });
    pdf.setTextColor(245, 225, 225); pdf.setFont(FONT, 'normal'); pdf.setFontSize(7);
    var disc = 'Studiu generat algoritmic (UrbanX Flux) pe rate ITE adaptate RO. Are rol de PRE-ANALIZĂ și nu substituie ' +
      'studiul de trafic / PMUD elaborat de proiectant atestat și avizat conform NP 068/2002, STAS 10144 și Legii 350/2001. ' +
      'Cifrele sunt orientative și necesită validare profesională și măsurători de teren.';
    pdf.text(pdf.splitTextToSize(disc, W - 30), W / 2, dy + 10, { align: 'center' });

    pdf.setTextColor.apply(pdf, GRAY); pdf.setFontSize(6.5);
    pdf.text('Surse: ITE Trip Generation 10th/11th · NP 068/2002 · GD 525/1996 · STAS 10144 · HG 874/2019 · IPCC 2023 · Generat ' + today,
      W / 2, H - 5, { align: 'center' });

    var fn = ('Studiu_trafic_Flux_' + (meta.site_name || 'sit') + '_' + new Date().toISOString().slice(0, 10) + '.pdf')
      .replace(/[^a-zA-Z0-9._-]/g, '_');
    pdf.save(fn);
    window.ss && ss('✅ Studiu de trafic generat: ' + fn);
    return fn;
  };
  // ── STUDIU GENUIN (≥10 pag) pe motorul strategic _makeStratDoc ───────────────
  function _fluxStudy(res, meta, J, N) {
    var pdf = new J({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    var D = window._makeStratDoc(pdf, { docTitle: 'STUDIU DE TRAFIC', cityName: (meta.site_name || 'Sit'), accent: [16, 160, 110] });
    var W = 210, ML = D.dims.ML, CW = D.dims.CW, FONT = 'DejaVuRO';
    var g = res.trips_detail, ms = res.modal_split, c = res.trips_by_mode_pm, p = res.parking_demand;
    D.setSuppress && D.setSuppress(true); D.setPage && D.setPage(1);
    pdf.setFillColor(6, 22, 16); pdf.rect(0, 0, W, 297, 'F'); pdf.setFillColor(16, 160, 110); pdf.rect(0, 60, W, 1.4, 'F');
    try { if (window._drawUrbanxLogo) { window._drawUrbanxLogo(pdf, W / 2 - 9, 16, 18); pdf.__hasCoverLogo = 1; } } catch (e) {}
    pdf.setTextColor(120, 230, 170); pdf.setFont(FONT, 'bold'); pdf.setFontSize(9); pdf.text('URBANX · FLUX — MOBILITATE URBANĂ', W / 2, 44, { align: 'center' });
    pdf.setTextColor(255, 255, 255); pdf.setFontSize(26); pdf.text('STUDIU DE TRAFIC', W / 2, 90, { align: 'center' });
    pdf.setTextColor(120, 230, 170); pdf.setFontSize(13); pdf.text(D.S2((meta.site_name || 'Sit') + (meta.city_name ? ' · ' + meta.city_name : '')), W / 2, 102, { align: 'center' });
    pdf.setTextColor(150, 190, 170); pdf.setFontSize(11); pdf.text('Impact de trafic preliminar · ' + N(g.daily) + ' deplasări/zi generate', W / 2, 114, { align: 'center' });
    D.setSuppress && D.setSuppress(false);

    D.chapter('1. Rezumat executiv');
    D.P('Prezentul studiu estimează impactul de trafic generat de dezvoltarea propusă pe situl „' + (meta.site_name || 'analizat') + '", pe baza metodologiei ITE (Institute of Transportation Engineers) de generare a deplasărilor, adaptată la contextul românesc. Dezvoltarea generează un total estimat de ' + N(g.daily) + ' deplasări zilnice, cu un vârf de ' + N(g.pm_total) + ' deplasări/oră la ora de vârf PM. Studiul evaluează repartiția modală, încărcarea intersecțiilor adiacente, necesarul de parcare, emisiile induse și conformitatea cu normativele aplicabile.');
    D.callout && D.callout('Concluzie', 'Impactul de trafic este ' + ((res.intersections || []).some(function (i) { return i.over_capacity; }) ? 'SEMNIFICATIV — cel puțin o intersecție depășește capacitatea și necesită măsuri de atenuare.' : 'gestionabil cu măsurile uzuale de organizare a circulației și de management al cererii.') + ' Detalierea și avizarea revin unui studiu de trafic elaborat de proiectant atestat.');

    D.chapter('2. Metodologie');
    D.P('Studiul aplică metoda standard de evaluare a impactului de trafic (Traffic Impact Study): (1) estimarea generării de deplasări pe baza ratelor ITE Trip Generation pe tip de funcțiune și suprafață/unități; (2) repartiția modală (modal split) calibrată pe contextul local; (3) distribuția și asignarea deplasărilor auto pe rețeaua adiacentă; (4) analiza nivelului de serviciu (LOS) și a raportului volum/capacitate (v/c) la intersecții; (5) verificarea necesarului de parcare și a emisiilor induse. Cadrul normativ de referință: NP 068/2002, STAS 10144, GD 525/1996, Legea 350/2001.');
    D.P('Ratele de generare ITE reprezintă media observată pe un eșantion mare de dezvoltări similare; ele se adaptează la contextul românesc prin ajustarea repartiției modale (ponderea transportului public și a deplasărilor nemotorizate este, în orașele românești, diferită de cea din mediile suburbane americane pe care se bazează ratele originale). Rezultatele au caracter preliminar și se validează prin recensăminte de circulație de teren.');

    D.chapter('3. Funcțiuni propuse pe sit');
    var luRows = (meta.land_uses || []).map(function (lu) {
      return [(lu.label || (G.Flux.LAND_USE_LABELS && G.Flux.LAND_USE_LABELS[lu.land_use]) || lu.land_use), lu.units ? (N(lu.units) + ' unități') : (N(lu.gross_floor_area_sqm) + ' mp ADC')];
    });
    if (D.table && luRows.length) D.table(['Funcțiune', 'Dimensiune'], luRows, [CW * 0.6, CW * 0.4]);
    D.P('Programul funcțional determină profilul de generare a deplasărilor: funcțiunile rezidențiale au vârf pronunțat dimineața (ieșiri) și seara (intrări), cele de birouri profil invers, iar cele comerciale un profil mai uniform cu vârf la prânz și după-amiază. Mixul funcțional poate atenua vârfurile prin complementaritatea profilurilor.');

    D.chapter('4. Generarea deplasărilor');
    D.table && D.table(['Indicator', 'Valoare'], [
      ['Vârf AM total', N(g.am_total) + ' depl/h (intrări ' + N(g.am_in) + ' / ieșiri ' + N(g.am_out) + ')'],
      ['Vârf PM total', N(g.pm_total) + ' depl/h (intrări ' + N(g.pm_in) + ' / ieșiri ' + N(g.pm_out) + ')'],
      ['Total zilnic', N(g.daily) + ' deplasări'],
    ], [CW * 0.4, CW * 0.6]);
    D.P('Orele de vârf (AM și PM) sunt momentele critice pentru analiza de capacitate, întrucât atunci se suprapune traficul generat de dezvoltare cu traficul de fond al rețelei. Vârful PM este de regulă dimensionant pentru dezvoltările rezidențiale și mixte. Valorile reprezintă deplasări totale (toate modurile), defalcate ulterior pe moduri de transport.');

    D.chapter('5. Repartiția modală');
    D.table && D.table(['Mod de transport', 'Pondere', 'Deplasări PM'], [
      ['Autoturism', Math.round(ms.auto * 100) + '%', N(c.auto)],
      ['Transport public', Math.round(ms.pt * 100) + '%', N(c.pt)],
      ['Bicicletă', Math.round(ms.bicycle * 100) + '%', '—'],
      ['Pietonal', Math.round(ms.pedestrian * 100) + '%', '—'],
    ], [CW * 0.42, CW * 0.28, CW * 0.30]);
    D.P('Repartiția modală este variabila cu cel mai mare efect asupra impactului auto: o creștere a ponderii transportului public și a deplasărilor nemotorizate reduce direct numărul de vehicule pe rețea. Ea depinde de accesibilitatea la transport public, de calitatea infrastructurii pietonale/ciclabile și de politica de parcare — toate pârghii pe care planificarea le poate influența. Corelarea cu indicele Walk Score și Orașul-15-minute ale platformei oferă o estimare a potențialului de transfer modal.');

    D.chapter('6. Distribuția și asignarea traficului');
    D.P('Deplasările auto generate se distribuie pe direcțiile de proveniență/destinație (în funcție de localizarea zonelor rezidențiale, de muncă și de servicii) și se asignează pe rutele rețelei adiacente. Distribuția se estimează tipic pe baza modelului gravitațional sau a datelor de mobilitate existente, iar asignarea ține cont de ierarhia și capacitatea străzilor. Concentrarea pe puține accese poate crea puncte de congestie chiar dacă volumul total este moderat.');
    D.P('Pentru o evaluare riguroasă, distribuția se calibrează pe matricea origine-destinație a zonei, iar asignarea se verifică cu un model de trafic (de tip Visum/Aimsun) în studiul detaliat. La nivel preliminar, se identifică intersecțiile critice unde se concentrează traficul indus.');

    D.chapter('7. Încărcarea intersecțiilor (LOS · v/c)');
    if (D.table && res.intersections && res.intersections.length) {
      D.table(['Intersecție', 'v/c', 'LOS', 'Veh/h adăugate'], res.intersections.map(function (i) {
        return [i.name, i.vc_ratio.toFixed(2), i.los + (i.over_capacity ? ' ⚠' : ''), '+' + N(i.added_veh_hr)];
      }), [CW * 0.4, CW * 0.18, CW * 0.18, CW * 0.24]);
    } else { D.P('Nu au fost definite intersecții adiacente pentru analiză în acest scenariu preliminar.'); }
    D.P('Nivelul de serviciu (LOS — Level of Service, scara A–F) și raportul volum/capacitate (v/c) măsoară gradul de saturație al intersecțiilor. LOS A–C indică funcționare confortabilă, D–E aproape de saturație, iar F suprasaturație (cozi, întârzieri mari). Un v/c peste 0,85–0,90 semnalează necesitatea unor măsuri: resemaforizare, benzi suplimentare, sensuri giratorii sau redistribuirea accesurilor. Intersecțiile marcate „peste capacitate" condiționează avizarea dezvoltării.');

    D.chapter('8. Necesarul de parcare');
    D.table && D.table(['Indicator', 'Locuri'], [
      ['Necesar normativ (GD 525/1996)', N(p.required_normative)],
      ['După reducere proximitate TP (-' + p.pt_reduction_pct + '%)', N(p.required_after_reduction)],
    ], [CW * 0.6, CW * 0.4]);
    D.P('Necesarul de parcare se calculează conform normativului local (bazat pe GD 525/1996), pe tip de funcțiune. Proximitatea transportului public justifică o reducere a normativului (parking maximums în loc de minimums) — o politică modernă care descurajează dependența de automobil și eliberează spațiu/cost. Supradimensionarea parcării induce trafic suplimentar și costuri mari de subsol; subdimensionarea creează presiune pe parcarea stradală.');

    D.chapter('9. Emisii de CO₂ induse');
    D.table && D.table(['Indicator', 'Valoare'], [
      ['Emisii zilnice', N(res.emissions.total_kg_day) + ' kg CO₂/zi'],
      ['Echivalent anual', N(res.emissions.total_tonnes_year) + ' t CO₂/an'],
    ], [CW * 0.5, CW * 0.5]);
    D.P('Emisiile de transport induse se estimează din deplasările auto, distanța medie și factorul de emisie al parcului auto, conform metodologiei IPCC. Ele se corelează cu studiul de amprentă de carbon al dezvoltării (modulul Carbon Tracker): transportul este una dintre cele trei componente majore ale amprentei pe ciclu de viață. Reducerea lor se obține prin transferul modal și prin electrificarea parcului auto (pe măsură ce rețeaua se decarbonează).');

    D.chapter('10. Managementul cererii de transport (TDM)');
    D.P('Managementul cererii de transport (Transport Demand Management) cuprinde măsuri care reduc sau redistribuie cererea de deplasări auto, în loc să crească oferta de infrastructură rutieră (abordare nesustenabilă pe termen lung). Măsuri tipice: încurajarea transportului public (abonamente subvenționate, stații apropiate), infrastructură pentru biciclete și micromobilitate, program de lucru flexibil/escalonat, carpooling, și politica de parcare (preț, plafonare).');
    D.P('Pentru dezvoltarea analizată, un pachet TDM bine proiectat poate reduce ponderea deplasărilor auto cu 10–25%, atenuând impactul asupra intersecțiilor critice. Eficacitatea TDM crește cu calitatea alternativelor: nu se poate descuraja automobilul fără a oferi opțiuni credibile de transport public și nemotorizat.');

    D.chapter('11. Transport public și mobilitate dulce');
    D.P('Integrarea dezvoltării cu transportul public este factorul-cheie pentru un impact de trafic sustenabil. Proximitatea unei stații de transport public de capacitate (tramvai, autobuz frecvent) justifică densități mai mari și un normativ de parcare redus — principiul dezvoltării orientate pe transit (TOD). Infrastructura pietonală (trotuare continue, treceri sigure) și ciclabilă (piste protejate, parcare pentru biciclete) completează oferta de mobilitate dulce.');
    D.P('Studiul recomandă verificarea accesibilității sitului la transport public (acoperire în raza de 300–500 m de o stație) și prevederea de facilități pentru mobilitate dulce. Acolo unde transportul public lipsește, dezvoltarea ar trebui corelată cu extinderea acestuia, pentru a evita dependența integrală de automobil.');

    D.chapter('12. Siguranța circulației');
    D.P('Generarea de trafic suplimentar ridică probleme de siguranță rutieră la accese și la intersecțiile adiacente, în special pentru pietoni și bicicliști. Studiul detaliat trebuie să verifice: vizibilitatea la accese, configurarea sigură a intersecțiilor, trecerile de pietoni (semaforizate/marcate), separarea fluxurilor vulnerabile și viteza de operare. Principiul „Vision Zero" — eliminarea deceselor și rănirilor grave — orientează proiectarea modernă a infrastructurii.');

    D.chapter('13. Verificarea conformității normative');
    (res.compliance || []).forEach(function (ch) {
      D.P('[' + ch.status + '] ' + ch.ref + ' — ' + ch.detail);
    });
    if (!(res.compliance || []).length) D.P('Verificările de conformitate se detaliază în studiul de trafic complet, conform NP 068/2002, STAS 10144, GD 525/1996 și HG 874/2019.');

    D.chapter('14. Măsuri de atenuare propuse');
    D.bullets && D.bullets([
      'Optimizarea configurației și a semaforizării intersecțiilor critice;',
      'Pachet TDM (transport public, mobilitate dulce, politică de parcare);',
      'Etapizarea dezvoltării corelată cu capacitatea rețelei;',
      'Amenajarea accesurilor pentru fluență și siguranță;',
      'Contribuție la infrastructura de transport (corelare cu modulul Land Value Capture).',
    ]);
    D.P('Măsurile de atenuare transformă un impact potențial problematic într-unul gestionabil. Ele se negociază în cadrul avizării și pot constitui obligații ale dezvoltatorului (de la amenajări de intersecții până la contribuții la transportul public), în logica „cel ce generează impactul contribuie la atenuarea lui".');

    D.chapter('15. Monitorizare post-implementare');
    D.P('După darea în folosință, se recomandă monitorizarea traficului real generat și compararea cu estimările, pentru calibrarea modelelor și pentru declanșarea de măsuri corective dacă impactul depășește prognoza. Indicatorii de urmărit: volumele la accese și la intersecțiile critice, repartiția modală reală, gradul de ocupare a parcării și eventualele probleme de siguranță. Monitorizarea închide bucla între estimare și realitate.');

    D.chapter('16. Concluzii și recomandări');
    D.P('Dezvoltarea generează ' + N(g.daily) + ' deplasări/zi, cu un vârf PM de ' + N(g.pm_total) + ' depl/h. ' + ((res.intersections || []).some(function (i) { return i.over_capacity; }) ? 'Cel puțin o intersecție adiacentă depășește capacitatea, ceea ce impune măsuri de atenuare obligatorii înainte de aprobare.' : 'Impactul asupra rețelei este gestionabil cu măsurile uzuale.') + ' Recomandarea centrală: maximizarea transferului modal către transport public și mobilitate dulce, susținută de un pachet TDM și de o politică de parcare echilibrată.');
    D.P('Acest studiu preliminar fundamentează decizia de a comanda un studiu de trafic detaliat (cu recensăminte de teren și model de trafic) și identifică din timp punctele critice și măsurile de atenuare, reducând riscul de respingere la avizare.');

    D.chapter('17. Profilul temporal al traficului');
    D.P('Traficul generat nu este uniform pe parcursul zilei, ci concentrat în orele de vârf. Profilul temporal depinde de funcțiune: locuințele produc un vârf matinal de ieșiri (7–9) și unul vesperal de intrări (17–19); birourile, profil invers; comerțul, un profil mai aplatizat cu vârf la prânz și sâmbăta. Analiza de capacitate se face pentru ora de vârf dimensionantă (de regulă PM), când traficul generat se suprapune cu vârful de fond al rețelei.');
    D.P('Aplatizarea vârfurilor (peak spreading) — prin program de lucru flexibil, mix funcțional cu profiluri complementare sau livrări în afara orelor de vârf — reduce încărcarea maximă a rețelei fără a reduce volumul total. Este o strategie eficientă de atenuare, deoarece capacitatea unei intersecții este dimensionată tocmai pe vârf: reducerea vârfului evită investiții costisitoare în infrastructură.');

    D.chapter('18. Accese și organizarea circulației pe sit');
    D.P('Proiectarea accesurilor este critică pentru fluența și siguranța traficului indus. Principiile: minimizarea numărului de accese pe arterele principale (pentru a reduce punctele de conflict), poziționarea lor la distanță suficientă de intersecții, asigurarea benzilor de stocare/decelerare pentru virajele la stânga, și separarea fluxurilor auto de cele pietonale și de aprovizionare. Un acces prost amplasat poate satura o arteră chiar la volume moderate.');
    D.P('Circulația internă pe sit (alei, parcare, întoarcere) trebuie dimensionată pentru gabaritele vehiculelor (inclusiv aprovizionare și intervenție), cu evitarea manevrelor de mers înapoi pe spațiul public. Organizarea circulației interne influențează și capacitatea accesurilor: o circulație internă fluidă evite formarea de cozi care se propagă pe stradă.');

    D.chapter('19. Impactul asupra transportului public local');
    D.P('O dezvoltare semnificativă modifică cererea de transport public local: creșterea numărului de utilizatori poate impune suplimentarea frecvenței sau a capacității liniilor existente, ori extinderea rețelei. Studiul trebuie să verifice dacă oferta de transport public din zonă poate absorbi cererea suplimentară estimată din repartiția modală — altfel, ponderea reală a transportului public va fi mai mică decât cea asumată, iar traficul auto mai mare.');
    D.P('Acolo unde dezvoltarea justifică, contribuția la îmbunătățirea transportului public (stații noi, frecvență sporită) este o măsură de atenuare cu efect de durată, aliniată principiului dezvoltării orientate pe transit (TOD) și mecanismelor de captare a plusvalorii.');

    D.chapter('20. Logistica și aprovizionarea');
    D.P('Pe lângă traficul de persoane, dezvoltarea generează trafic de marfă (aprovizionare, colectare deșeuri, servicii). Acesta implică vehicule grele, cu manevre și gabarite specifice, care necesită spații de încărcare-descărcare dedicate, dimensionate corect și separate de circulația de persoane. Aprovizionarea comerțului, în special, are un impact local concentrat care trebuie planificat (ferestre orare, rampe, accese dedicate).');
    D.P('Logistica urbană modernă încurajează consolidarea livrărilor, livrarea în afara orelor de vârf și soluțiile de ultimul kilometru cu emisii reduse (cargo-bike, vehicule electrice). Pentru funcțiunile comerciale și mixte, planul de logistică este parte integrantă a studiului de trafic.');

    D.chapter('21. Comparația cu scenariul „fără dezvoltare"');
    D.P('Evaluarea corectă a impactului compară situația cu dezvoltarea (scenariul „do-something") cu cea fără dezvoltare (scenariul „do-nothing"), pe același orizont de timp. Diferența reprezintă impactul net atribuibil dezvoltării, izolat de evoluția de fond a traficului (care crește oricum, prin dezvoltarea generală a orașului). Această comparație evită atât supraestimarea (atribuirea întregii congestii dezvoltării), cât și subestimarea impactului.');
    D.P('Pe orizontul de analiză (tipic 5–10 ani), scenariul de referință include și celelalte dezvoltări planificate în zonă, pentru a evalua impactul cumulat. Un proiect care, izolat, are impact redus poate contribui, cumulat cu altele, la saturarea rețelei — de aceea analiza cumulativă este esențială în zonele cu presiune de dezvoltare.');

    D.chapter('22. Etapizarea și impactul pe faze');
    D.P('Dezvoltările mari se realizează în etape, fiecare cu propriul profil de trafic. Etapizarea permite corelarea generării de trafic cu capacitatea rețelei și cu realizarea măsurilor de atenuare (de exemplu, o intersecție amenajată înainte de darea în folosință a fazei care o saturează). Studiul recomandă condiționarea fazelor de realizarea infrastructurii de atenuare aferente, pentru a evita perioade de impact necontrolat.');

    D.chapter('23. Limitări și disclaimer');
    D.P('Studiu generat algoritmic (UrbanX Flux) pe rate ITE adaptate RO. Are rol de PRE-ANALIZĂ și NU substituie studiul de trafic / PMUD elaborat de proiectant atestat și avizat conform NP 068/2002, STAS 10144 și Legii 350/2001. Cifrele sunt orientative și necesită validare profesională și măsurători de teren (recensăminte de circulație, matrice O-D reală).');

    D.chapter('24. Surse și standarde');
    D.P('ITE — Trip Generation Manual (ed. 10/11); NP 068/2002 — normativ proiectare străzi; STAS 10144 — caracteristici geometrice; GD 525/1996 — RGU (parcare); HG 874/2019; IPCC 2023 — factori de emisie. Glosar: LOS = Level of Service (nivel de serviciu, A–F); v/c = raport volum/capacitate; TDM = Transport Demand Management; TOD = Transit-Oriented Development; modal split = repartiția pe moduri de transport. Metodologie UrbanX · ThinkSmart Solutions.');

    var fn = ('Studiu_Trafic_' + (meta.site_name || 'sit') + '_' + new Date().toISOString().slice(0, 10) + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
    window._buildStratTOC && window._buildStratTOC(D, 1);
    pdf.save(fn); window.ss && ss('✅ Studiu de trafic generat: ' + pdf.getNumberOfPages() + ' pagini'); return fn;
  }

  console.log('[Flux] generator PDF încărcat (window.Flux.generatePDF)');
})(window);
