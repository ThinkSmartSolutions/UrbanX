/* ============================================================================
 * UrbanX Feasibility — calculator de fezabilitate pentru dezvoltatori (Modul 12).
 * Pro-forma din PUG-ul LIVE: parcelă + CUT/POT → GBA → cost → venit → profit → IRR
 * + valoare reziduală teren + analiză de senzitivitate. Unic pt că folosește
 * indicatorii PUG reali (nu Excel cu date vechi). Model: Argus Developer.
 *
 * window.Feaz.compute(input) · generatePDF(res) · DEFAULTS
 * ONEST: costuri/prețuri = estimative (EUR/m²), suprascriptibile; preț piață real
 * = Market Intelligence (Modul 11). Rol de ORIENTARE, nu decizie de investiție.
 * ========================================================================== */
(function (G) {
  'use strict';
  // EUR/m² ADC — estimativ 2024 (suprascriptibil). Sursă orientativă: practică piață RO.
  var CONSTR = {
    locuire: { economy: 900, standard: 1150, premium: 1600, luxury: 2100 },
    birouri: { economy: 950, standard: 1150, premium: 1500, luxury: 1900 },
    comercial: { economy: 800, standard: 1000, premium: 1350, luxury: 1700 },
    mixt: { economy: 950, standard: 1200, premium: 1600, luxury: 2000 },
    industrial: { economy: 550, standard: 700, premium: 900, luxury: 1100 }
  };
  var EFFICIENCY = { locuire: 0.82, birouri: 0.75, comercial: 0.70, mixt: 0.78, industrial: 0.85 };
  var SOFT = { proiectare: 0.10, avize_taxe: 0.025, management: 0.04, marketing: 0.03, contingenta: 0.07 };
  var PARKING_PER_SLOT_EUR = 8000; // loc parcare subsol
  var DEFAULT_PRICE = { locuire: 1600, birouri: 1500, comercial: 1700, mixt: 1650, industrial: 700 }; // EUR/m² vânzare

  function softTotal() { return Object.keys(SOFT).reduce(function (s, k) { return s + SOFT[k]; }, 0); }

  function compute(inp) {
    var area = +inp.area_m2 || 0, cut = +inp.cut || 0, pot = +inp.pot || 0;
    var use = inp.use || 'locuire', std = inp.standard || 'standard';
    var maxGBA = area * cut;
    var maxFootprint = area * pot / 100;
    var eff = EFFICIENCY[use] || 0.78;
    var netSellable = maxGBA * eff;

    var constrRate = (CONSTR[use] && CONSTR[use][std]) || 1150;
    var constrCost = maxGBA * constrRate;
    // parcare: ~1 loc/100mp ADC pt birouri/comercial, 1.2/locuință (≈/75mp) locuire
    var slots = use === 'locuire' ? Math.ceil(netSellable / 75 * 1.2) : Math.ceil(maxGBA / 100);
    var parkingCost = slots * PARKING_PER_SLOT_EUR;
    var soft = (constrCost + parkingCost) * softTotal();
    var landCost = +inp.land_cost_total || 0;

    var dev_months = +inp.dev_months || 24;
    var leverage = inp.leverage == null ? 0.6 : +inp.leverage;
    var rate = inp.interest_rate == null ? 0.08 : +inp.interest_rate;
    var preFinance = constrCost + parkingCost + soft + landCost;
    var financing = preFinance * leverage * rate * (dev_months / 12);
    var totalCost = preFinance + financing;

    var price = +inp.price_per_m2 || DEFAULT_PRICE[use] || 1500;
    var gdv = netSellable * price;
    var profit = gdv - totalCost;
    var margin = gdv > 0 ? profit / gdv : 0;
    var devYield = totalCost > 0 ? profit / totalCost : 0;
    var irr = (totalCost > 0 && profit > -totalCost) ? Math.pow(1 + profit / totalCost, 12 / dev_months) - 1 : null;

    // valoare reziduală teren la marjă-țintă (cât poate plăti pe teren pt o marjă dorită)
    var targetMargin = inp.target_margin == null ? 0.20 : +inp.target_margin;
    var residualLand = gdv * (1 - targetMargin) - (constrCost + parkingCost + soft + financing);

    return {
      urbanistic: { area_m2: area, cut: cut, pot: pot, max_gba: Math.round(maxGBA), max_footprint: Math.round(maxFootprint), net_sellable: Math.round(netSellable), parking_slots: slots },
      costs: { construction: Math.round(constrCost), parking: Math.round(parkingCost), soft: Math.round(soft), land: Math.round(landCost), financing: Math.round(financing), total: Math.round(totalCost), constr_rate: constrRate },
      revenue: { price_per_m2: price, gdv: Math.round(gdv) },
      result: { profit: Math.round(profit), margin_pct: Math.round(margin * 1000) / 10, dev_yield_pct: Math.round(devYield * 1000) / 10, irr_pct: irr != null ? Math.round(irr * 1000) / 10 : null, residual_land: Math.round(residualLand) },
      sensitivity: sensitivity(inp, netSellable, constrCost, parkingCost, soft, landCost, financing, price),
      verdict: margin >= 0.20 ? 'favorabil' : margin >= 0.12 ? 'marginal' : 'nefavorabil',
      inputs: inp
    };
  }

  // matrice senzitivitate: marjă la variații cost construcție × preț vânzare
  function sensitivity(inp, netSellable, constrCost, parkingCost, soft, landCost, financing, price) {
    var costVar = [-0.2, -0.1, 0, 0.1, 0.2], priceVar = [-0.15, -0.1, 0, 0.1, 0.15];
    var rows = priceVar.map(function (pv) {
      return {
        price_delta: pv, cells: costVar.map(function (cv) {
          var c = (constrCost * (1 + cv)) + parkingCost + soft + landCost + financing;
          var g = netSellable * price * (1 + pv);
          var m = g > 0 ? (g - c) / g : 0;
          return Math.round(m * 1000) / 10;
        })
      };
    });
    return { cost_var: costVar, price_var: priceVar, matrix: rows };
  }

  function generatePDF(res, meta) {
    meta = meta || {};
    var Jc = (typeof jsPDF !== 'undefined') ? jsPDF : (window.jspdf && window.jspdf.jsPDF) || window.jsPDF; if (!Jc) { G.ss && ss('❌ jsPDF indisponibil'); return; }
    var N = function (x) { try { return Math.round(x).toLocaleString('ro-RO'); } catch (e) { return String(x); } };
    if (typeof window._makeStratDoc !== 'function') return _genSimpleFeaz(res, meta, Jc, N);
    try {
      var pdf = new Jc({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      var D = window._makeStratDoc(pdf, { docTitle: 'STUDIU DE FEZABILITATE', cityName: (meta.site_name || 'Sit'), accent: [124, 58, 237] });
      var W = 210, ML = D.dims.ML, CW = D.dims.CW, F = 'DejaVuRO';
      var u = res.urbanistic, c = res.costs, rv = res.revenue, rr = res.result;
      D.setSuppress && D.setSuppress(true); D.setPage && D.setPage(1);
      pdf.setFillColor(14, 10, 30); pdf.rect(0, 0, W, 297, 'F'); pdf.setFillColor(124, 58, 237); pdf.rect(0, 60, W, 1.4, 'F');
      try { if (window._drawUrbanxLogo) { window._drawUrbanxLogo(pdf, W / 2 - 9, 16, 18); pdf.__hasCoverLogo = 1; } } catch (e) {}
      pdf.setTextColor(196, 181, 253); pdf.setFont(F, 'bold'); pdf.setFontSize(9); pdf.text('URBANX · FEASIBILITY', W / 2, 44, { align: 'center' });
      pdf.setTextColor(255, 255, 255); pdf.setFontSize(26); pdf.text('STUDIU DE FEZABILITATE', W / 2, 92, { align: 'center' });
      pdf.setTextColor(196, 181, 253); pdf.setFontSize(14); pdf.text(D.S2((meta.site_name || 'Sit') + (meta.city ? ' · ' + meta.city : '')), W / 2, 104, { align: 'center' });
      pdf.setTextColor(180, 170, 210); pdf.setFontSize(11); pdf.text('Pro-forma dezvoltare imobiliară · marjă ' + rr.margin_pct + '% · verdict: ' + res.verdict, W / 2, 116, { align: 'center' });
      D.setSuppress && D.setSuppress(false);

      D.chapter('1. Rezumat executiv');
      D.P('Prezentul studiu evaluează fezabilitatea economică a unei dezvoltări imobiliare pe situl „' + (meta.site_name || 'analizat') + '", pe baza unei analize pro-forma (rezidual) ce confruntă valoarea dezvoltării finalizate (GDV) cu costurile totale de realizare. Rezultatul principal: o marjă de dezvoltare de ' + rr.margin_pct + '% și un profit estimat de ' + N(rr.profit) + ' EUR, încadrând proiectul în categoria „' + res.verdict + '".');
      D.callout && D.callout('Verdict', 'Pragurile uzuale de decizie: marjă ≥ 20% (favorabil — risc acoperit), 12–20% (marginal — atenție la ipoteze), sub 12% (nefavorabil — risc neacoperit). Acest proiect: ' + rr.margin_pct + '% → ' + res.verdict + '.');

      D.chapter('2. Metodologie (analiza reziduală)');
      D.P('Studiul aplică metoda reziduală de evaluare a dezvoltării, standard în analiza de fezabilitate imobiliară (RICS — Valuation of development property). Logica este: pornind de la valoarea de piață a produsului finit (GDV = suprafață vandabilă × preț unitar de piață), se scad toate costurile de realizare (construcție, parcaje, costuri „soft", finanțare) și profitul minim cerut de dezvoltator; ceea ce rămâne este valoarea maximă pe care proiectul o poate susține pentru achiziția terenului (valoarea reziduală a terenului).');
      D.formula && D.formula('Profit și marjă de dezvoltare', 'Profit = GDV − Costuri totale ;  Marjă = Profit / GDV', 'GDV = suprafață vandabilă × preț €/mp');
      D.P('Indicatorii de performanță calculați sunt: marja de dezvoltare (profit/GDV — măsoară „perna" de risc), randamentul dezvoltării (profit/cost total — eficiența capitalului angajat) și RIR/IRR simplificat (anualizat pe durata proiectului). Senzitivitatea rezultatului la variațiile de preț și de cost este testată într-o matrice bidimensională, esențială într-o piață volatilă.');

      D.chapter('3. Date de intrare și ipoteze');
      D.table && D.table(['Parametru', 'Valoare'], [
        ['Suprafață teren', N(u.area_m2) + ' mp'],
        ['CUT / POT (din PUG)', u.cut + ' / ' + u.pot + '%'],
        ['Cost construcție unitar', N(c.constr_rate) + ' EUR/mp'],
        ['Preț de piață (GDV)', N(rv.price_per_m2) + ' EUR/mp'],
        ['Marjă-țintă (rezidual)', (res.inputs && res.inputs.target_margin != null ? Math.round(res.inputs.target_margin * 100) : 20) + '%'],
      ], [CW * 0.5, CW * 0.5]);
      D.P('Ipotezele de preț și cost sunt calibrate pe nivelurile de piață 2024–2025 și au caracter orientativ. Coeficienții urbanistici (CUT/POT) provin din regulamentul PUG aplicabil parcelei; ei determină plafonul de suprafață construibilă și, implicit, întregul model economic.');

      D.chapter('4. Capacitatea edificabilă');
      D.table && D.table(['Indicator', 'Valoare'], [
        ['Suprafață construită desfășurată max. (GBA)', N(u.max_gba) + ' mp'],
        ['Amprentă la sol max.', N(u.max_footprint) + ' mp'],
        ['Suprafață vandabilă (net sellable)', N(u.net_sellable) + ' mp'],
        ['Locuri de parcare necesare', N(u.parking_slots)],
      ], [CW * 0.6, CW * 0.4]);
      D.P('Suprafața desfășurată maximă rezultă din înmulțirea suprafeței terenului cu CUT, iar suprafața vandabilă se obține aplicând un coeficient de eficiență (raportul dintre aria utilă comercializabilă și aria desfășurată brută — tipic 80–85%, restul fiind circulații, ziduri, spații tehnice). Numărul de parcaje rezultă din normativul local și condiționează adesea soluția de subsol, cu impact major asupra costurilor.');

      D.chapter('5. Bugetul de costuri');
      D.table && D.table(['Categorie de cost', 'EUR'], [
        ['Construcție (' + N(c.constr_rate) + ' EUR/mp)', N(c.construction)],
        ['Parcaje', N(c.parking)],
        ['Costuri soft (proiectare, avize, taxe, marketing)', N(c.soft)],
        ['Teren', N(c.land)],
        ['Finanțare (dobânzi pe perioada dezvoltării)', N(c.financing)],
        ['COST TOTAL', N(c.total)],
      ], [CW * 0.62, CW * 0.38]);
      D.P('Costurile „soft" (proiectare, avize, taxe de autorizare, management, comisioane de vânzare, marketing) reprezintă tipic 12–20% din costul de construcție și sunt adesea subestimate. Costul de finanțare depinde de structura capital propriu/credit și de durata proiectului — orice întârziere în autorizare sau vânzare crește direct această componentă.');

      D.chapter('6. Venituri și indicatori de rentabilitate');
      D.table && D.table(['Indicator', 'Valoare'], [
        ['Valoarea dezvoltării (GDV)', N(rv.gdv) + ' EUR'],
        ['Preț unitar de piață', N(rv.price_per_m2) + ' EUR/mp'],
        ['Profit', N(rr.profit) + ' EUR'],
        ['Marjă de dezvoltare', rr.margin_pct + '%'],
        ['Randamentul dezvoltării (dev yield)', rr.dev_yield_pct + '%'],
        ['RIR / IRR (simplificat, anualizat)', (rr.irr_pct != null ? rr.irr_pct + '%' : '—')],
      ], [CW * 0.6, CW * 0.4]);
      D.P('Marja de ' + rr.margin_pct + '% reprezintă „perna" care absoarbe abaterile de cost și de preț față de ipoteze. Randamentul dezvoltării (' + rr.dev_yield_pct + '%) măsoară eficiența capitalului total angajat, iar RIR-ul anualizează profitul pe durata proiectului, permițând comparația cu randamentele altor investiții. Cu cât proiectul e mai lung, cu atât același profit absolut produce un RIR mai mic.');

      D.chapter('7. Analiză de senzitivitate (marjă %)');
      D.P('Matricea de mai jos arată cum variază marja de dezvoltare la modificarea simultană a prețului de vânzare (rânduri) și a costului de realizare (coloane). Este testul de stres central al studiului: un proiect robust rămâne favorabil pe o plajă largă de variații; unul fragil bascolează în zona nefavorabilă la abateri mici.');
      if (D.table && res.sensitivity && res.sensitivity.matrix) {
        var hdr = ['preț↓ / cost→'].concat(res.sensitivity.cost_var.map(function (cv) { return (cv > 0 ? '+' : '') + Math.round(cv * 100) + '%'; }));
        var rows = res.sensitivity.matrix.map(function (row) {
          return [(row.price_delta > 0 ? '+' : '') + Math.round(row.price_delta * 100) + '%'].concat(row.cells.map(function (m) { return m + '%'; }));
        });
        var cw0 = CW * 0.22, cwn = (CW - cw0) / res.sensitivity.cost_var.length;
        D.table(hdr, rows, [cw0].concat(res.sensitivity.cost_var.map(function () { return cwn; })));
      }
      D.P('Interpretare: celulele cu marjă ≥ 20% indică scenarii confortabile, cele între 12–20% scenarii marginale, iar cele sub 12% scenarii de pierdere a pernei de risc. Dacă majoritatea celulelor sunt în zona favorabilă, proiectul este rezilient la volatilitatea pieței.');

      D.chapter('8. Valoarea reziduală a terenului');
      D.P('Aplicând metoda reziduală pentru marja-țintă, valoarea maximă pe care proiectul o poate susține pentru achiziția terenului este de ' + N(rr.residual_land) + ' EUR. Aceasta este suma peste care prețul terenului erodează profitul sub pragul acceptabil. Valoarea reziduală este instrumentul-cheie în negocierea achiziției: ea răspunde la întrebarea „cât pot plăti pe acest teren și să-mi păstrez marja-țintă?".');
      D.P('Dacă prețul cerut de vânzător depășește valoarea reziduală, dezvoltatorul are trei opțiuni: renegocierea prețului, creșterea densității/valorii proiectului (dacă reglementarea permite), sau renunțarea. Astfel, studiul de fezabilitate devine fundamentul deciziei de achiziție, nu doar o validare ex-post.');

      D.chapter('9. Structura de finanțare');
      D.P('Un proiect imobiliar se finanțează tipic printr-o combinație de capital propriu (equity) și credit bancar (debt), în raport de 20–40% equity / 60–80% debt, cu un grad de îndatorare (LTC — loan-to-cost) limitat de bancă în funcție de risc. Costul finanțării din buget (' + N(c.financing) + ' EUR) reflectă dobânda pe tragerile de credit, eșalonată pe durata construcției și a vânzării.');
      D.P('Indicatorii pe care îi urmărește finanțatorul sunt: LTC/LTV (gradul de acoperire cu credit), marja de dezvoltare (perna de risc), pre-vânzările (procentul de unități vândute „pe hârtie" înainte de finalizare, ce reduce riscul de absorbție) și acoperirea serviciului datoriei. O marjă de ' + rr.margin_pct + '% influențează direct accesul la credit și costul acestuia.');

      D.chapter('10. Riscuri și factori de incertitudine');
      D.bullets && D.bullets([
        'Risc de piață — scăderea prețului de vânzare sau a ritmului de absorbție (testat în matricea de senzitivitate);',
        'Risc de cost — creșterea prețurilor la materiale/manoperă peste estimare;',
        'Risc de autorizare/durată — întârzieri care cresc costul de finanțare și amână veniturile;',
        'Risc de finanțare — creșterea dobânzilor sau restrângerea creditării;',
        'Risc de reglementare — modificări de CUT/POT sau condiționări la aprobarea PUZ.',
      ]);
      D.P('Gestionarea acestor riscuri se face prin marja de dezvoltare (perna), prin pre-vânzări, prin contracte de construcție cu preț fix și prin etapizarea proiectului. Un studiu de fezabilitate prudent folosește ipoteze conservatoare și verifică reziliența în scenariul pesimist al matricei de senzitivitate.');

      D.chapter('11. Concluzii și recomandare de investiție');
      D.P('Pe baza ipotezelor curente, proiectul prezintă o marjă de ' + rr.margin_pct + '% și un profit de ' + N(rr.profit) + ' EUR, fiind clasificat „' + res.verdict + '". ' + (res.verdict === 'favorabil' ? 'Recomandarea este de a continua, cu menținerea disciplinei de cost și a unei strategii de pre-vânzare care să confirme prețul de piață.' : res.verdict === 'marginal' ? 'Recomandarea este prudență: proiectul depinde de respectarea strictă a ipotezelor; se impun renegocierea terenului, optimizarea costurilor sau creșterea valorii prin calitate/densitate înainte de angajament.' : 'Recomandarea este reconsiderarea proiectului: marja nu acoperă riscul; sunt necesare renegocierea substanțială a terenului, regândirea programului sau abandonarea.'));
      D.P('Decizia finală trebuie fundamentată pe validarea independentă a prețului de piață (date de tranzacții ANCPI, evaluare ANEVAR) și a costurilor de construcție (oferte de la antreprenori), precum și pe o analiză detaliată de cash-flow lunar pe durata proiectului.');

      D.chapter('12. Contextul pieței și analiza comparabilelor');
      D.P('Validitatea studiului depinde critic de acuratețea prețului de piață asumat (' + N(rv.price_per_m2) + ' EUR/mp). Acesta trebuie ancorat pe analiza comparabilelor — tranzacții recente cu proprietăți similare ca localizare, tip, suprafață și calitate, ajustate pentru diferențe. Pe o piață activă, comparabilele sunt sursa primară; în lipsa lor se recurge la oferte ajustate cu un discount de negociere și la prețuri de listare monitorizate în timp.');
      D.P('Pe lângă nivelul prețului, contează ritmul de absorbție (câte unități se vând pe lună) — acesta determină durata de comercializare și, implicit, costul de finanțare și expunerea la risc de piață. O analiză prudentă include un scenariu de absorbție lentă, în care veniturile întârzie și dobânzile se acumulează. Corelarea cu harta de valoare a platformei (modulul Valori Imobiliare) oferă o verificare independentă a nivelului de preț pe zonă.');

      D.chapter('13. Etapizare și flux de numerar');
      D.P('Profitul absolut nu spune totul despre o investiție; momentul în care intră și ies banii este la fel de important. Un proiect imobiliar are un profil de cash-flow tipic în „J": ieșiri mari la început (achiziție teren, proiectare, început de execuție), continuate cu cheltuieli de construcție, urmate de intrări din vânzări care, în cazul pre-vânzărilor, pot începe înainte de finalizare. Adâncimea „gropii" de cash determină necesarul maxim de capital și de credit.');
      D.P('Etapizarea (fazarea) proiectului — împărțirea în tronsoane care se construiesc și se vând succesiv — reduce expunerea maximă de capital și permite ajustarea la semnalele pieței între faze, cu prețul unei eficiențe ceva mai reduse a costurilor fixe. Decizia de fazare se ia comparând economia de cost de finanțare și reducerea riscului cu pierderea de economii de scară.');

      D.chapter('14. Indicatori financiari avansați');
      D.P('Dincolo de marjă și de RIR, o evaluare riguroasă folosește valoarea actualizată netă (VAN/NPV) — suma fluxurilor de numerar viitoare actualizate la o rată care reflectă costul capitalului și riscul; un VAN pozitiv indică o investiție care creează valoare peste pragul minim cerut. Pragul de rentabilitate (break-even) — prețul sau volumul de vânzare la care profitul devine zero — măsoară marja de siguranță: cu cât prețul de echilibru este mai jos față de cel asumat, cu atât proiectul e mai rezilient.');
      D.P('Pentru acest proiect, cu o marjă de ' + rr.margin_pct + '% și un randament de ' + rr.dev_yield_pct + '%, pragul de rentabilitate pe preț se află cu aproximativ ' + rr.margin_pct + ' puncte procentuale sub prețul asumat — adică prețul de piață poate scădea cu până la acel nivel înainte ca proiectul să intre pe pierdere. Această „pernă" trebuie comparată cu volatilitatea istorică a pieței locale pentru a evalua robustețea.');

      D.chapter('15. Strategii de ieșire (exit) și optimizare');
      D.P('Strategia de ieșire definește modul de recuperare a investiției: vânzare la finalizare (build-to-sell — exit rapid, dar expus riscului de absorbție), păstrare și închiriere (build-to-rent — venituri recurente, evaluare prin capitalizare, dar capital blocat) sau vânzare en-gros către un investitor instituțional (exit unic, preț cu discount). Alegerea influențează structura de finanțare și indicatorii-țintă.');
      D.P('Optimizarea proiectului poate îmbunătăți semnificativ rezultatul fără modificarea terenului: creșterea eficienței planimetrice (raportul vandabil/desfășurat), ajustarea mixului de unități la cererea reală, reducerea costurilor prin proiectare integrată și valorificarea maximă a coeficienților urbanistici. Atunci când reglementarea permite o majorare de CUT (prin PUZ), aceasta crește direct GDV-ul și, implicit, valoarea reziduală pe care proiectul o poate susține pentru teren.');

      D.chapter('16. Analiza pieței concurențiale');
      D.P('Fezabilitatea unui proiect nu se evaluează în izolare, ci în raport cu oferta concurentă. O analiză de piață solidă inventariază proiectele similare aflate în dezvoltare sau anunțate în zona de captare, estimând stocul viitor și momentul intrării lor pe piață. Un exces de ofertă simultan poate prelungi absorbția și presa prețurile, erodând marja chiar dacă ipotezele inițiale erau corecte.');
      D.P('Poziționarea proiectului (preț, calitate, mix de unități, dotări) trebuie să răspundă unui segment de cerere clar identificat și insuficient deservit. Diferențierea — prin localizare, eficiență energetică (cu impact și asupra costurilor de operare ale cumpărătorului), spații verzi sau facilități — susține prețul și ritmul de vânzare. Studiul de fezabilitate câștigă în robustețe atunci când prețul asumat este justificat nu doar prin comparabile istorice, ci și prin avantajul competitiv al produsului propus.');

      D.chapter('17. Plan de implementare și calendar');
      D.P('Realizarea proiectului parcurge etape cu durate și dependențe specifice: obținerea autorizațiilor (PUZ dacă e necesar, autorizație de construire), proiectarea tehnică, contractarea execuției, construcția propriu-zisă, recepția și comercializarea. Calendarul realist al acestor etape determină durata totală (asumată aici la ' + (res.inputs && res.inputs.dev_months || 24) + ' luni) și, prin ea, costul de finanțare și momentul recuperării investiției.');
      D.P('Riscul de calendar este unul dintre cele mai subestimate: întârzierile la autorizare (frecvente în România) sau la execuție prelungesc perioada de purtare a creditului și amână veniturile, deteriorând RIR-ul. Un plan prudent include rezerve de timp, declanșează pre-vânzările cât mai devreme și folosește contracte cu clauze de penalizare a întârzierilor. Etapizarea pe tronsoane permite suprapunerea vânzărilor primei faze cu execuția celei de-a doua.');

      D.chapter('18. Monitorizare și indicatori post-decizie');
      D.P('Odată luată decizia de investiție, studiul de fezabilitate devine instrumentul de control: valorile estimate se compară periodic cu cele realizate, iar abaterile declanșează măsuri corective. Indicatorii-cheie de urmărit pe parcursul proiectului sunt: costul realizat vs bugetat (pe categorii), ritmul de vânzare vs cel planificat, prețul mediu realizat vs cel asumat și costul efectiv de finanțare. Un tablou de bord lunar al acestor indicatori menține proiectul sub control.');
      D.P('Recalcularea periodică a marjei și a RIR-ului cu datele actualizate permite decizii informate pe parcurs: accelerarea sau temporizarea vânzărilor, ajustarea prețurilor, sau — în cazuri extreme — restructurarea proiectului. Astfel, fezabilitatea nu este un document de o singură dată, ci un model viu care însoțește proiectul de la decizie până la exit.');

      D.chapter('19. Limitări și disclaimer');
      D.P('Studiul este ORIENTATIV, de fundamentare a deciziei. Costurile și prețurile sunt estimative (EUR/mp, calibrate pe 2024–2025) și se învechesc rapid. Rezultatele NU înlocuiesc consultanța unui specialist imobiliar autorizat, o evaluare ANEVAR sau un studiu de fezabilitate detaliat cu cash-flow lunar. Prețul de piață real necesită date de tranzacții (ANCPI), iar costurile de construcție necesită oferte ferme. RIR-ul este o aproximare simplificată, nu un calcul de flux de numerar actualizat complet.');

      D.chapter('20. Surse, standarde și glosar');
      D.P('RICS — „Valuation of development property" și „Financial viability in planning"; IVS — International Valuation Standards; date de piață imobiliară 2024–2025; indici de cost în construcții; ANCPI — date de tranzacții. Glosar: GDV = Gross Development Value (valoarea dezvoltării finalizate); GBA = Gross Buildable Area (suprafață desfășurată brută); marjă de dezvoltare = profit/GDV; valoare reziduală teren = sumă maximă susținută pentru achiziția terenului la marja-țintă; LTC/LTV = loan-to-cost / loan-to-value. Metodologie UrbanX · ThinkSmart Solutions.');

      var fn = ('Studiu_Fezabilitate_' + (meta.site_name || 'sit') + '_' + new Date().toISOString().slice(0, 10) + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
      window._buildStratTOC && window._buildStratTOC(D, 1);
      pdf.save(fn); G.ss && ss('✅ Studiu de fezabilitate generat: ' + pdf.getNumberOfPages() + ' pagini'); return fn;
    } catch (e) { console.error('[Feaz PDF]', e); try { return _genSimpleFeaz(res, meta, Jc, N); } catch (e2) {} }
  }
  function _genSimpleFeaz(res, meta, Jc, N) {
    var pdf = new Jc({ orientation: 'portrait', unit: 'mm', format: 'a4' }); try { window._registerROFont && window._registerROFont(pdf); } catch (e) {}
    var F = 'DejaVuRO', y = 22; pdf.setFont(F, 'bold'); pdf.setFontSize(14); pdf.text('Studiu de fezabilitate', 16, y); y += 10; pdf.setFont(F, 'normal'); pdf.setFontSize(10);
    [['GDV', N(res.revenue.gdv) + ' EUR'], ['Cost total', N(res.costs.total) + ' EUR'], ['Profit', N(res.result.profit) + ' EUR'], ['Marjă', res.result.margin_pct + '%'], ['Verdict', res.verdict]].forEach(function (kv) { pdf.text(kv[0] + ': ' + kv[1], 16, y); y += 8; });
    pdf.save('Feasibility_' + (meta.site_name || 'sit') + '.pdf');
  }

  G.Feaz = { compute: compute, generatePDF: generatePDF, CONSTR: CONSTR, DEFAULT_PRICE: DEFAULT_PRICE, EFFICIENCY: EFFICIENCY };
  console.log('[Feaz] motor fezabilitate încărcat (window.Feaz)');
})(window);
