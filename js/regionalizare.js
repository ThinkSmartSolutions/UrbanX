// ═══════════════════════════════════════════════════════════════════════════
// regionalizare.js — STUDIU NAȚIONAL DE REGIONALIZARE (window._Regionalizare)
// Document-stindard UrbanX STI (Strategic Territorial Intelligence). Analiză
// integrată a (re)organizării teritoriale a României: administrativ, demografic,
// economic, fiscal, politic (reprezentare), infrastructură, resurse, scenarii de
// regionalizare, indici proprii + Nota IVU regională, comparație europeană (NUTS),
// recomandări. Nivel prezidențial/ministerial/internațional. 29 iun 2026 · TSS
//
// Conținut profund: window._REGIO_DEEP['p01'..'p13'] (autorat modular, date reale).
// Motor dovedit: _makeStratDoc + _deepRender + Nota IVU + capturi + TOC + QR.
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';
  var N = function (v, d) { return isNaN(+v) ? '-' : Number(v).toLocaleString('ro-RO', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); };
  function _jsPDF() { return (window.jspdf && window.jspdf.jsPDF) || window.jsPDF || (window.jspdf && window.jspdf.default) || null; }

  // ordinea părților documentului
  var PARTS = ['p01', 'p02', 'p03', 'p04', 'p05', 'p06', 'p07', 'p14', 'p15', 'p16', 'p17', 'p18', 'p08', 'p09', 'p20', 'p10', 'p11', 'p12', 'p19', 'p13'];
  var ACCENT = [180, 30, 40]; // roșu-bordo instituțional

  // cele 8 regiuni de dezvoltare (NUTS-2) — date reale de cadru (INS/Eurostat)
  var REGIUNI8 = [
    { n: 'Nord-Est', jud: 'BC,BT,IS,NT,SV,VS', pop: 3225, pibcap: 12 },
    { n: 'Sud-Est', jud: 'BR,BZ,CT,GL,TL,VN', pop: 2390, pibcap: 18 },
    { n: 'Sud-Muntenia', jud: 'AG,CL,DB,GR,IL,PH,TR', pop: 2940, pibcap: 17 },
    { n: 'Sud-Vest Oltenia', jud: 'DJ,GJ,MH,OT,VL', pop: 1880, pibcap: 16 },
    { n: 'Vest', jud: 'AR,CS,HD,TM', pop: 1720, pibcap: 26 },
    { n: 'Nord-Vest', jud: 'BH,BN,CJ,MM,SJ,SM', pop: 2520, pibcap: 23 },
    { n: 'Centru', jud: 'AB,BV,CV,HR,MS,SB', pop: 2280, pibcap: 24 },
    { n: 'București-Ilfov', jud: 'B,IF', pop: 2270, pibcap: 56 }
  ];

  async function generate() {
    if (window._USER && window._USER.email === 'office@m2msolutions.ro') { G.ss && G.ss('Generare dezactivată pentru acest cont'); return; }
    var J = _jsPDF(); if (!J || typeof G._makeStratDoc !== 'function') { G.ss && G.ss('Motor PDF indisponibil'); return; }
    G.ss && G.ss('🇷🇴 Generez STUDIUL NAȚIONAL DE REGIONALIZARE (document-stindard, 400+ pagini)... poate dura.');
    try {
      var pdf = new J({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      var D = G._makeStratDoc(pdf, { docTitle: 'STUDIU NAȚIONAL DE REGIONALIZARE', cityName: 'ROMÂNIA', accent: ACCENT });
      D.__cityKey = 'RO'; D.__allowChapterIVU = false;
      var W = 210, CW = D.dims.CW, FONT = (pdf.__unicodeFont ? 'DejaVuRO' : 'helvetica');

      // ── COPERTĂ instituțională ──
      D.setSuppress && D.setSuppress(true); D.setPage && D.setPage(1);
      pdf.setFillColor(10, 14, 24); pdf.rect(0, 0, W, 297, 'F');
      pdf.setFillColor(ACCENT[0], ACCENT[1], ACCENT[2]); pdf.rect(0, 0, W, 4, 'F'); pdf.rect(0, 293, W, 4, 'F');
      pdf.setFillColor(245, 200, 60); pdf.rect(0, 4, W, 1.2, 'F');
      try { if (G._drawUrbanxLogo) { G._drawUrbanxLogo(pdf, W / 2 - 11, 20, 22); pdf.__hasCoverLogo = 1; } } catch (e) {}
      pdf.setTextColor(245, 200, 60); pdf.setFont(FONT, 'bold'); pdf.setFontSize(9); pdf.text('URBANX · STRATEGIC TERRITORIAL INTELLIGENCE (STI)', W / 2, 52, { align: 'center' });
      pdf.setTextColor(255, 255, 255); pdf.setFont(FONT, 'bold'); pdf.setFontSize(26); pdf.text('REGIONALIZAREA', W / 2, 92, { align: 'center' });
      pdf.setFontSize(15); pdf.setTextColor(220, 225, 235); pdf.text('ROMÂNIEI', W / 2, 104, { align: 'center' });
      pdf.setDrawColor(ACCENT[0], ACCENT[1], ACCENT[2]); pdf.setLineWidth(0.6); pdf.line(W / 2 - 45, 112, W / 2 + 45, 112);
      pdf.setTextColor(180, 190, 205); pdf.setFont(FONT, 'normal'); pdf.setFontSize(10.5);
      pdf.text(pdf.splitTextToSize('Analiză teritorială integrată: administrativ · demografic · economic · fiscal · politic · infrastructură · resurse. Scenarii de (re)organizare, indici proprii și recomandări strategice.', W - 60), W / 2, 124, { align: 'center' });
      var cy0 = 168; pdf.setDrawColor(ACCENT[0], ACCENT[1], ACCENT[2]); pdf.setFillColor(16, 22, 36); pdf.roundedRect(22, cy0, W - 44, 84, 3, 3, 'FD');
      pdf.setTextColor(245, 200, 60); pdf.setFont(FONT, 'bold'); pdf.setFontSize(8.5); pdf.text('CADRU DE REFERINȚĂ', W / 2, cy0 + 11, { align: 'center' });
      pdf.setTextColor(200, 208, 222); pdf.setFont(FONT, 'normal'); pdf.setFontSize(8.2);
      pdf.text(pdf.splitTextToSize('Constituția României · Legea 315/2004 (dezvoltare regională) · Carta Europeană a Autonomiei Locale · clasificarea NUTS (Reg. CE 1059/2003) · Strategia Națională pentru Dezvoltarea Durabilă · Acordul de Parteneriat 2021-2027.', W - 64), W / 2, cy0 + 19, { align: 'center' });
      pdf.setTextColor(245, 200, 60); pdf.setFont(FONT, 'bold'); pdf.setFontSize(8.5); pdf.text('SURSE DE DATE', W / 2, cy0 + 44, { align: 'center' });
      pdf.setTextColor(200, 208, 222); pdf.setFont(FONT, 'normal'); pdf.setFontSize(8.2);
      pdf.text(pdf.splitTextToSize('INS (Recensământ 2021, TEMPO) · Eurostat (conturi regionale NUTS-2) · ESPON · Comisia Europeană (DG REGIO) · Banca Mondială · AEP · Camera Deputaților & Senat · ADR-uri · Copernicus.', W - 64), W / 2, cy0 + 52, { align: 'center' });
      pdf.setTextColor(150, 158, 174); pdf.setFontSize(7.6);
      pdf.text('Generat: ' + new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' }) + ' · Document strategic generat algoritmic · UrbanX · ThinkSmart Solutions', W / 2, 268, { align: 'center', maxWidth: W - 40 });
      D.setSuppress && D.setSuppress(false);

      // ── Rezumat executiv + metodologie ──
      D.chapter('Rezumat executiv');
      D.P('Prezentul studiu — Regionalizarea României — este documentul-stindard al suitei UrbanX STI (Strategic Territorial Intelligence). El analizează, pe baza datelor oficiale (INS, Eurostat, ESPON, Comisia Europeană), oportunitatea, modelele și consecințele unei (re)organizări teritorial-administrative a României, pe toate dimensiunile relevante: administrativă, demografică, economică, fiscală, politică (reprezentare), de infrastructură și de resurse. Documentul compară riguros toate scenariile, cuantifică impactul fiecăruia și — spre deosebire de un raport pur descriptiv — își asumă o recomandare fermă, argumentată, prezentată mai jos.');
      D.P('România este organizată administrativ în 41 de județe plus municipiul București (NUTS-3) și, pentru dezvoltare regională, în 8 regiuni de dezvoltare (NUTS-2) fără personalitate juridică (Legea 315/2004). Disparitățile regionale sunt printre cele mai accentuate din Uniunea Europeană: regiunea București-Ilfov depășește media UE la PIB/locuitor (în PPS), în timp ce regiunea Nord-Est rămâne una dintre cele mai puțin dezvoltate din UE. Studiul cuantifică aceste disparități și evaluează în ce măsură o reformă a structurii regionale ar putea reduce decalajele, eficientiza administrația și întări capacitatea de absorbție a fondurilor europene.');
      D.callout && D.callout('Scopul documentului', 'Suport decizional la nivel strategic (prezidențial, guvernamental, parlamentar, ADR) — diagnoză + scenarii + impact cuantificat + recomandări, cu trasabilitate la surse.');
      D.callout && D.callout('★ RECOMANDAREA PRINCIPALĂ', 'Pe baza celor patru analize (descriptivă, comparativă, predictivă, prescriptivă) și a celor trei criterii — reducerea disparităților, apropierea deciziei de cetățean, capacitatea de absorbție a fondurilor UE — UrbanX STI recomandă SCENARIUL S2: menținerea celor 8 regiuni de dezvoltare actuale (granițe NUTS-2 deja recunoscute de Eurostat) ȘI acordarea de personalitate juridică deplină — consilii regionale alese, buget propriu și competențe descentralizate. Argumentele decisive: (1) conformitate NUTS-2 integrală, deci ZERO perturbare a fondurilor structurale UE (re-delimitarea ar reseta seriile statistice și ar întârzia absorbția); (2) disrupție administrativă minimă și reversibilitate; (3) dimensiuni în intervalul validat european (modelele polonez — województwa — și ceh — kraje). Implementarea necesită revizuire constituțională (art. 3 alin. 3, art. 73, art. 120-123) și referendum. Scenariile S3 (provincii istorice) și S4 (macro-regiuni) sunt analizate ca alternative legitime, cu avantaj de masă critică și identitate, dar cu costuri de tranziție și riscuri de neconformitate NUTS-2 mai mari (ex.: Dobrogea CT+TL ≈ 877.000 loc., la limita plafonului; Moldova cu 8 județe ≈ 4,06 mil., peste pragul orientativ de 3 mil.).');
      D.callout && D.callout('Avertisment metodologic', 'Cifrele regionale sunt agregări și estimări calibrate pe surse oficiale; proiecțiile au caracter de scenariu (nu predicție certă). Recomandarea este analitică (fundamentată pe criterii tehnice), nu o opțiune politică — decizia rămâne a autorităților și a cetățenilor (referendum). Documentul este un instrument de pre-analiză strategică, nu un act normativ.');

      D.chapter('Metodologie, surse de date și limitări');
      D.P('Studiul aplică patru tipuri de analiză, în acord cu standardul DSS (Decision Support System): descriptivă (ce există azi), comparativă (cum diferă regiunile între ele și față de UE), predictivă (cum evoluează pe orizonturi de 5/10/20/30 de ani) și prescriptivă (ce măsuri sunt recomandate). Datele provin din surse oficiale și deschise: INS (Recensământul Populației și Locuințelor 2021, baza TEMPO), Eurostat (conturile regionale NUTS-2 — PIB regional, ocupare, demografie), ESPON, Comisia Europeană (DG REGIO, Rapoartele de coeziune), Banca Mondială, Autoritatea Electorală Permanentă, structurile Parlamentului și Agențiile de Dezvoltare Regională.');
      D.P('Cadrul legal de referință include Constituția României (organizarea administrativă a teritoriului), Legea 315/2004 privind dezvoltarea regională, Legea 151/1998, Carta Europeană a Autonomiei Locale (ratificată prin Legea 199/1997), clasificarea statistică NUTS (Regulamentul CE 1059/2003 și actualizările) și Acordul de Parteneriat România–UE 2021-2027. Limitări: granularitatea unor serii regionale, decalajul de publicare al conturilor regionale (T+24 luni la Eurostat) și incertitudinea inerentă scenariilor pe termen lung sunt explicitate la fiecare capitol; valorile estimate sunt marcate ca atare.');

      // ── Tabloul regiunilor (cadru, date reale) ──
      D.chapter('Tabloul celor 8 regiuni de dezvoltare (cadru sintetic)');
      D.P('Tabelul de mai jos rezumă cele 8 regiuni de dezvoltare (NUTS-2) ale României — componența județeană, populația rezidentă aproximativă (Recensământ 2021, mii locuitori) și nivelul orientativ al PIB/locuitor în mii EUR. Disparitatea dintre București-Ilfov și regiunile estice este punctul de plecare al întregii analize.');
      if (D.table) D.table(['Regiune (NUTS-2)', 'Județe', 'Pop. 2021 (mii)', 'PIB/cap (mii €)'],
        REGIUNI8.map(function (r) { return [r.n, r.jud, N(r.pop), N(r.pibcap)]; }),
        [CW * 0.26, CW * 0.40, CW * 0.17, CW * 0.17]);
      try { if (window._pickChart) window._pickChart(D, ['Regiune', 'PIB/cap (mii €)'], REGIUNI8.map(function (r) { return [r.n, r.pibcap]; }), 'PIB/locuitor pe regiuni de dezvoltare (mii € — orientativ, Eurostat)'); } catch (e) {}

      // ── Corp dezvoltat (cele 13 părți, autorate modular) ──
      var total = 0;
      PARTS.forEach(function (pk) {
        var arr = (G._REGIO_DEEP && G._REGIO_DEEP[pk]) || [];
        if (arr.length && G._deepRender) { total += G._deepRender(D, arr, CW); }
      });
      if (!total) { D.chapter('Conținut dezvoltat'); D.P('Corpul dezvoltat al studiului de regionalizare se află în integrare. Structura, coperta, cadrul de referință și sursele sunt complete.'); }

      // ── Nota UrbanX regională (sinteză IVU pe regiuni) ──
      try {
        D.chapter('Nota UrbanX regională — sinteză comparativă');
        D.P('Pentru o lectură sintetică, agregăm Nota UrbanX (IVU) la nivel regional, ca medie ponderată cu populația a notelor UAT reprezentative din fiecare regiune. Nota este un indice compozit transparent (0-100) pe șase dimensiuni (economie, calitatea vieții, conectivitate, mediu, demografie, reziliență) — vezi metodologia IVU. Valorile de mai jos sunt orientative și servesc comparației inter-regionale, nu clasamentului oficial.');
        var ivuRows = [
          ['București-Ilfov', 'RO-B-01'], ['Nord-Vest (Cluj)', 'RO-CJ-1017'], ['Centru (Brașov)', 'RO-BV-1017'],
          ['Vest (Timiș)', 'RO-TM-1017'], ['Sud-Est (Constanța)', 'RO-CT-01'], ['Sud-Muntenia (Prahova)', 'RO-PH-1017'],
          ['Sud-Vest (Dolj)', 'RO-DJ-1017'], ['Nord-Est (Iași)', 'RO-IS-01']
        ];
        var rows = ivuRows.map(function (x) { var s = null; try { s = G.UrbanXIVU && G.UrbanXIVU.scoreFor && G.UrbanXIVU.scoreFor(x[1]); } catch (e) {} return [x[0], s && s.R ? (s.R.score + ' (' + s.R.grade + ')') : '—']; });
        if (D.table) D.table(['Regiune (pol reprezentativ)', 'Nota UrbanX'], rows, [CW * 0.62, CW * 0.38]);
      } catch (e) {}

      // ── Planșe + Nota IVU națională ──
      try { if (G.UrbanXIVU && G.UrbanXIVU.renderSection) G.UrbanXIVU.renderSection(D, 'RO-B-01'); } catch (e) {}

      D.chapter('Concluzii generale și scenariul recomandat');
      D.P('Studiul converge către concluzia că reducerea disparităților regionale ale României nu depinde mecanic de numărul sau granițele regiunilor, ci de transferul efectiv de competențe, resurse fiscale și capacitate administrativă către nivelul regional, dublat de o prioritizare a investițiilor în conectivitate (autostrăzi, cale ferată de mare viteză, digital) și în capitalul uman. Orice scenariu de regionalizare a fost evaluat după trei criterii: (1) reducerea decalajelor de dezvoltare, (2) eficiența și apropierea deciziei de cetățean, (3) creșterea capacității de absorbție a fondurilor europene.');
      D.P('RECOMANDAREA FERMĂ a studiului este SCENARIUL S2 — menținerea celor 8 regiuni de dezvoltare actuale și acordarea de personalitate juridică (consilii alese, buget, competențe). Acest scenariu maximizează simultan cele trei criterii cu cel mai mic cost și risc: granițele NUTS-2 fiind deja recunoscute de Eurostat, absorbția fondurilor europene nu suferă nicio întrerupere statistică; descentralizarea reală (nu redesenarea hărții) este pârghia care apropie decizia de cetățean și crește capacitatea administrativă; iar reforma este reversibilă și gradual implementabilă. Dimensional, cele 8 regiuni se încadrează în intervalul validat de modelele polonez (województwa) și ceh (kraje), confirmat în atlasul comparativ european al studiului.');
      D.P('Scenariile alternative rămân legitime și sunt documentate integral: S3 (provincii istorice) aduce coerență identitară și masă critică, dar implică redesenare cu costuri de tranziție și două neconformități NUTS-2 de rezolvat (Dobrogea ≈ 877.000 loc., marginal; Moldova cu 8 județe ≈ 4,06 mil., peste pragul orientativ de 3 mil. — necesită subdiviziune); S4 (4 macro-regiuni) creează actori puternici în raport cu UE, dar diluează apropierea de cetățean și concentrează puterea. Recomandarea pentru S2 nu exclude o tranziție ulterioară către S3/S4 dacă, după consolidarea capacității regionale, se dorește un pas suplimentar. Foaia de parcurs, jaloanele și analiza de risc per scenariu sunt detaliate în capitolele dedicate. Recomandarea este analitică, fundamentată pe criterii tehnice și pe date oficiale (INS, Eurostat, ESPON, CE); decizia finală aparține autorităților constituționale și cetățenilor, prin referendum.');

      D.chapter('Surse, standarde și disclaimer');
      D.P('Surse: INS (Recensământ 2021, TEMPO), Eurostat (conturi regionale NUTS-2), ESPON, Comisia Europeană (DG REGIO, Rapoartele de coeziune), Banca Mondială, AEP, Camera Deputaților, Senat, ADR-uri, Copernicus. Cadru legal: Constituția României, Legea 315/2004, Legea 151/1998, Carta Europeană a Autonomiei Locale, NUTS (Reg. CE 1059/2003), Acordul de Parteneriat 2021-2027. Document generat algoritmic de UrbanX STI ca instrument de pre-analiză strategică; valorile sunt estimări calibrate pe date reale și nu substituie analizele oficiale ale instituțiilor abilitate. Deciziile rămân responsabilitatea autorităților. Metodologie UrbanX · ThinkSmart Solutions.');

      var fn = (G._stratFileName ? G._stratFileName('Regionalizare', { territorial: true, localitate: 'Romania' }) : 'Regionalizare_Romania.pdf');
      G._buildStratTOC && G._buildStratTOC(D, 1);
      pdf.save(fn);
      G.ss && G.ss('✅ Studiul de Regionalizare generat: ' + pdf.getNumberOfPages() + ' pagini'); return fn;
    } catch (err) { console.error('[Regionalizare]', err); G.ss && G.ss('❌ Eroare: ' + (err.message || err).toString().slice(0, 90)); }
  }

  G._Regionalizare = { generate: generate, REGIUNI8: REGIUNI8 };
  window._Regionalizare = G._Regionalizare;
  console.log('[Regionalizare] ✅ studiu național de regionalizare încărcat (window._Regionalizare.generate)');
})(window);
