// ═══════════════════════════════════════════════════════════════════════════
// profile-studies.js — STUDII DE PROFIL TERITORIAL (window._ProfileStudies)
// Pentru fiecare profil detectat de _UATProfile (litoral, deltă, baraj, minier,
// salin, portuar, termal, silvic, seismic, transfrontalier) generează:
//   • rang INFERIOR (UAT/amplasament, 60+ pag)  — cheie _PROFILE_DEEP['<id>_inf']
//   • rang SUPERIOR (teritorial/strategic, 100+ pag) — cheie _PROFILE_DEEP['<id>_sup']
// Reutilizează motorul dovedit: _makeStratDoc (copertă + IVU + grafice _pickChart) +
// _deepRender + _DocMapCaptures (capturi reale ale UAT) + Nota UrbanX. 28 iun 2026 · TSS
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';
  var N = function (v, d) { return isNaN(+v) ? '-' : Number(v).toLocaleString('ro-RO', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); };

  // ── META de copertă per profil × rang (cadru legal + surse REALE) ─────────
  // ac = accent temă; legal/surse/ce afișate pe copertă (model SPS).
  var META = {
    litoral: { ac: [14, 116, 165], ico: '🌊',
      inf: { t: 'STUDIU INTEGRAT AL ZONEI COSTIERE — AMPLASAMENT LITORAL', badge: 'PROFIL LITORAL · RANG INFERIOR (UAT/AMPLASAMENT)',
        ce: 'Diagnoză și fundamentare la nivel de UAT/amplasament pentru o localitate de pe țărmul Mării Negre: eroziune costieră pe tronson, batimetrie, inundabilitate marină, fundare pe nisip, bilanț sedimentar și peisaj de faleză.',
        legal: 'Legea 280/2003 (GIZC), Legea 597/2001, OUG 202/2002 zona costieră, HG 749/2007, Directiva 2014/89/UE (MSP), Directiva 2008/56/CE (MSFD)',
        surse: 'Copernicus Marine Service, EMODnet Bathymetry, EEA coastline, ANAR/ABA Dobrogea-Litoral, INHGA, OSM coastline' },
      sup: { t: 'MASTERPLAN LITORAL ȘI GESTIUNEA INTEGRATĂ A ZONEI COSTIERE', badge: 'PROFIL LITORAL · RANG SUPERIOR (TERITORIAL/STRATEGIC)',
        ce: 'Strategie teritorială pentru zona costieră a Mării Negre: gestiune integrată costieră (GIZC), eroziune regională, nivel marin în creștere, calitatea apelor marine, amenajarea spațiului maritim și turism durabil de litoral.',
        legal: 'Directiva 2014/89/UE (MSP), Directiva 2008/56/CE (MSFD), Legea 280/2003 (GIZC), Protocolul ICZM, Convenția de la București (M. Neagră)',
        surse: 'Copernicus Marine, EMODnet, EEA, Black Sea Commission, ANAR, INCDM „Grigore Antipa", Eurostat' } },
    delta: { ac: [22, 137, 90], ico: '🦢',
      inf: { t: 'STUDIU DE AMPLASAMENT ÎN ARIE NATURALĂ PROTEJATĂ (DELTĂ/ZONE UMEDE)', badge: 'PROFIL DELTĂ · RANG INFERIOR (UAT/AMPLASAMENT)',
        ce: 'Diagnoză și fundamentare la nivel de UAT/amplasament aflat în arealul RBDD / Natura 2000: inundabilitate, geotehnic-hidrogeologic în teren saturat, evaluare adecvată sit Natura 2000, peisaj deltaic și capacitate turistică eco.',
        legal: 'Legea 82/1993 (RBDD), OUG 57/2007 (arii protejate), Legea 292/2018 (EIM/EA), Directiva Habitate 92/43/CEE, Directiva Păsări 2009/147/CE, Directiva Cadru Apă 2000/60/CE',
        surse: 'RBDD/ARBDD, EEA Natura 2000, Copernicus Land/Water, ANAR/ABA Dobrogea-Litoral, INHGA, OSM, Ramsar' },
      sup: { t: 'STRATEGIE TERITORIALĂ PENTRU DELTĂ ȘI ZONE UMEDE — PLAN DE PEISAJ ȘI BIODIVERSITATE', badge: 'PROFIL DELTĂ · RANG SUPERIOR (TERITORIAL/STRATEGIC)',
        ce: 'Strategie teritorială pentru arealul Deltei / zonelor umede: management RBDD, coridoare ecologice și migrația speciilor, calitatea apei și aerului, vulnerabilitate climatică și turism durabil regional.',
        legal: 'Legea 82/1993 (RBDD), Convenția Ramsar, OUG 57/2007, Directiva Habitate/Păsări, DCA 2000/60/CE, Strategia UE Biodiversitate 2030',
        surse: 'ARBDD Plan management, EEA, Copernicus, Ramsar, ANAR, INCDD Tulcea, Eurostat' } },
    baraj: { ac: [37, 99, 168], ico: '🏞',
      inf: { t: 'STUDIU DE AMPLASAMENT ÎN ZONA DE INFLUENȚĂ A UNUI BARAJ / LAC DE ACUMULARE', badge: 'PROFIL BARAJ · RANG INFERIOR (UAT/AMPLASAMENT)',
        ce: 'Diagnoză și fundamentare la nivel de UAT/amplasament din zona de influență a unui baraj: pericol potențial aval, inundabilitate la cedare, geotehnic cuvetă, eutrofizare și sedimentare lac, potențial turistic.',
        legal: 'Legea 466/2001 (siguranța barajelor), OUG 244/2000, NTLH-021/023, Legea 107/1996 (apelor), Legea 481/2004 (protecție civilă), HG 846/2010 (PMRI)',
        surse: 'ANAR/ABA, Hidroelectrica, INHGA, Comisia Națională Siguranța Barajelor (CONSIB), Copernicus EMS, OSM' },
      sup: { t: 'STRATEGIE TERITORIALĂ HIDROENERGETICĂ ȘI DE GOSPODĂRIRE A BAZINULUI', badge: 'PROFIL BARAJ · RANG SUPERIOR (TERITORIAL/STRATEGIC)',
        ce: 'Strategie teritorială pentru un sistem baraj-lac de acumulare: gospodărirea bazinului hidrografic, capacitate energetică regională, risc la cedare și plan de evacuare, schimbări climatice asupra debitelor și turism montan-lacuri.',
        legal: 'Legea 107/1996 (apelor), Legea 466/2001, HG 846/2010 (PMRI), Directiva Cadru Apă 2000/60/CE, Directiva Inundații 2007/60/CE, Legea 481/2004',
        surse: 'ANAR Planuri management bazinale, Hidroelectrica, INHGA, CONSIB, JRC EFAS, Copernicus, Eurostat' } },
    minier: { ac: [120, 86, 40], ico: '⛏',
      inf: { t: 'STUDIU DE AMPLASAMENT ÎN ZONĂ MINIERĂ / MONO-INDUSTRIALĂ', badge: 'PROFIL MINIER · RANG INFERIOR (UAT/AMPLASAMENT)',
        ce: 'Diagnoză la nivel de UAT/amplasament în zonă extractivă: geotehnic-geomecanic, tasare/subsidență, contaminare sol-subsol, iazuri de decantare (SEVESO), reabilitare situri și riscuri de surpare.',
        legal: 'Legea 85/2003 (minelor), Legea 292/2018 (EIM), Legea 59/2016 (SEVESO III), OUG 195/2005 (mediu), HG 1408/2007 (sol), Directiva 2006/21/CE (deșeuri extractive)',
        surse: 'ANRM, ANPM/E-PRTR, APM județean, Copernicus Land, INHGA, OSM, JTF (Just Transition)' },
      sup: { t: 'STRATEGIE DE RECONVERSIE ȘI REGENERARE A TERITORIULUI MINIER', badge: 'PROFIL MINIER · RANG SUPERIOR (TERITORIAL/STRATEGIC)',
        ce: 'Strategie teritorială de tranziție justă pentru un teritoriu minier/mono-industrial: reconversie economică, regenerarea siturilor, calitatea aerului și apelor, decontaminare și diversificare prin Fondul pentru o Tranziție Justă (JTF).',
        legal: 'Reg. (UE) 2021/1056 (JTF), Legea 85/2003, OUG 195/2005, Legea 59/2016, Strategia energetică națională, PNRR/POTJ',
        surse: 'JTF/POTJ, ANRM, ANPM/E-PRTR, Eurostat, Copernicus, Banca Mondială (mono-industrial)' } },
    salin: { ac: [120, 120, 160], ico: '🧂',
      inf: { t: 'STUDIU DE AMPLASAMENT ÎN ZONĂ SALINĂ / TURISM BALNEAR', badge: 'PROFIL SALIN · RANG INFERIOR (UAT/AMPLASAMENT)',
        ce: 'Diagnoză la nivel de UAT/amplasament cu resursă salină: geotehnic caverne, subsidență/prăbușire, hidrogeologic saramură, capacitate de vizitare a salinei (turism/speleoterapie) și calitatea aerului subteran.',
        legal: 'Legea 85/2003 (minelor), Legea 292/2018, OG 109/2000 (stațiuni balneare), HG 1016/2011 (stațiuni turistice), OUG 195/2005',
        surse: 'ANRM, Salrom, APM, INRMFB (medicină fizică/balneo), OSM, Copernicus' },
      sup: { t: 'MASTERPLAN DE TURISM BALNEAR ȘI VALORIFICAREA RESURSELOR SALINE', badge: 'PROFIL SALIN · RANG SUPERIOR (TERITORIAL/STRATEGIC)',
        ce: 'Strategie teritorială de turism balnear: rute tematice saline/spa, valorificarea lacurilor sărate, protecția resurselor subterane și regenerarea siturilor saline dezafectate la nivel regional.',
        legal: 'OG 109/2000, HG 1016/2011, Legea 85/2003, Master Planul Național pentru Turism Balnear, Strategia națională de turism',
        surse: 'Min. Turism, INRMFB, Salrom, ANRM, Eurostat turism, OSM' } },
    portuar: { ac: [30, 90, 120], ico: '⚓',
      inf: { t: 'STUDIU DE AMPLASAMENT ÎN ZONĂ PORTUARĂ (MARITIM/FLUVIAL)', badge: 'PROFIL PORTUAR · RANG INFERIOR (UAT/AMPLASAMENT)',
        ce: 'Diagnoză la nivel de UAT/amplasament cu funcțiune portuară: geotehnic cheiuri și dane, batimetrie canal navigabil, trafic maritim/fluvial, poluare și zgomot portuar (regim 24h) și reconversia terenurilor portuare.',
        legal: 'OG 22/1999 (porturi), OG 42/1997 (navigație), Legea 292/2018, Directiva 2014/89/UE (MSP), TEN-T (Reg. 1315/2013), MARPOL',
        surse: 'AFDJ Galați, APM Constanța, EMODnet, AIS/MarineTraffic, EEA, OSM, Eurostat transport' },
      sup: { t: 'MASTERPLAN PORTUAR ȘI STRATEGIE LOGISTICĂ MULTIMODALĂ REGIONALĂ', badge: 'PROFIL PORTUAR · RANG SUPERIOR (TERITORIAL/STRATEGIC)',
        ce: 'Strategie teritorială logistică pentru un nod portuar: conectivitate multimodală, impact economic regional, navigabilitatea Dunării la ape mici, capacitatea infrastructurii și competitivitatea coridoarelor TEN-T.',
        legal: 'Reg. (UE) 1315/2013 (TEN-T), OG 22/1999, Master Planul General de Transport, Directiva 2014/89/UE, Strategia Dunării (EUSDR)',
        surse: 'MPGT, AFDJ, CN APM/APDM, Eurostat, EUSDR, TEN-T, EMODnet' } },
    termal: { ac: [180, 90, 60], ico: '♨',
      inf: { t: 'STUDIU DE AMPLASAMENT CU RESURSĂ GEOTERMALĂ / BALNEARĂ', badge: 'PROFIL TERMAL · RANG INFERIOR (UAT/AMPLASAMENT)',
        ce: 'Diagnoză la nivel de UAT/amplasament cu resursă termală: debit și protecția resursei, geotehnic foraje, captare termală, capacitatea stațiunii și microclimat balnear.',
        legal: 'Legea 85/2003 (minelor — ape geotermale), OG 109/2000, HG 1016/2011, OUG 195/2005, Legea 292/2018',
        surse: 'ANRM, INRMFB, APM, OSM, Copernicus' },
      sup: { t: 'MASTERPLAN DE STAȚIUNE BALNEARĂ ȘI VALORIFICARE GEOTERMALĂ', badge: 'PROFIL TERMAL · RANG SUPERIOR (TERITORIAL/STRATEGIC)',
        ce: 'Strategie teritorială balneară: valorificarea resurselor geotermale, rute balneare regionale, protecția acviferului termal și dezvoltarea stațiunilor.',
        legal: 'OG 109/2000, HG 1016/2011, Legea 85/2003, Master Planul Național pentru Turism Balnear',
        surse: 'Min. Turism, INRMFB, ANRM, Eurostat, OSM' } },
    silvic: { ac: [34, 120, 60], ico: '🌲',
      inf: { t: 'STUDIU DE AMPLASAMENT ÎN ZONĂ SILVICĂ / FORESTIERĂ', badge: 'PROFIL SILVIC · RANG INFERIOR (UAT/AMPLASAMENT)',
        ce: 'Diagnoză la nivel de UAT/amplasament cu acoperire forestieră ridicată: silvicultură durabilă, eroziune versanți, risc de incendii, exploatare forestieră și drumuri forestiere.',
        legal: 'Legea 46/2008 (Codul silvic), OUG 57/2007, Legea 292/2018, OUG 195/2005, Reg. EUDR (UE) 2023/1115',
        surse: 'Romsilva, INCDS „Marin Drăcea", Copernicus Land (forest), EEA, EFFIS, OSM' },
      sup: { t: 'STRATEGIE FORESTIERĂ REGIONALĂ ȘI CORIDOARE ECOLOGICE', badge: 'PROFIL SILVIC · RANG SUPERIOR (TERITORIAL/STRATEGIC)',
        ce: 'Strategie teritorială forestieră: managementul durabil al pădurilor, coridoare ecologice, prevenirea incendiilor, ecoturism și servicii ecosistemice (carbon, apă, biodiversitate).',
        legal: 'Legea 46/2008, Strategia Forestieră Națională, Strategia UE pentru Păduri 2030, EUDR, OUG 57/2007',
        surse: 'Romsilva, INCDS, EEA, Copernicus, EFFIS, FAO FRA, Eurostat' } },
    seismic: { ac: [200, 110, 40], ico: '🟠',
      inf: { t: 'STUDIU DE VULNERABILITATE SEISMICĂ A AMPLASAMENTULUI (ZONA VRANCEA)', badge: 'PROFIL SEISMIC · RANG INFERIOR (UAT/AMPLASAMENT)',
        ce: 'Diagnoză la nivel de UAT/amplasament în zonă seismică ridicată: microzonare locală, vulnerabilitatea fondului construit, amplificarea seismică a terenului și prioritizarea consolidărilor.',
        legal: 'P100-1/2013, P100-3/2019 (evaluare), Legea 10/1995 (calitate construcții), OG 20/1994 (reducere risc seismic), HG 372/2024',
        surse: 'INCDFP (seismologie), INCERC, P100 hărți de hazard, MDLPA, OSM' },
      sup: { t: 'STRATEGIE TERITORIALĂ DE REDUCERE A RISCULUI SEISMIC', badge: 'PROFIL SEISMIC · RANG SUPERIOR (TERITORIAL/STRATEGIC)',
        ce: 'Strategie teritorială pentru reducerea riscului seismic: microzonare regională, prioritizarea consolidărilor, reziliența infrastructurii critice și planul de intervenție post-seism.',
        legal: 'OG 20/1994, P100-1/2013, Legea 481/2004 (protecție civilă), Strategia Națională de Reducere a Riscului Seismic, Cadrul Sendai',
        surse: 'INCDFP, INCERC, IGSU/DSU, MDLPA, Banca Mondială (risc seismic RO)' } },
    transfront: { ac: [90, 90, 150], ico: '🛂',
      inf: { t: 'STUDIU DE AMPLASAMENT ÎN ZONĂ DE FRONTIERĂ', badge: 'PROFIL TRANSFRONTALIER · RANG INFERIOR (UAT/AMPLASAMENT)',
        ce: 'Diagnoză la nivel de UAT/amplasament de graniță: amenajarea zonei de frontieră, interoperabilitatea planurilor, punctele de trecere și coridoarele transfrontaliere.',
        legal: 'Legea 350/2001 (amenajare/urbanism), Reg. (UE) Interreg, Acorduri bilaterale de cooperare, TEN-T transfrontalier',
        surse: 'Programe Interreg, Eurostat (regiuni de graniță), TEN-T, OSM, agenții de dezvoltare regională' },
      sup: { t: 'STRATEGIE DE AMENAJARE ȘI COOPERARE TRANSFRONTALIERĂ', badge: 'PROFIL TRANSFRONTALIER · RANG SUPERIOR (TERITORIAL/STRATEGIC)',
        ce: 'Strategie teritorială transfrontalieră: programe Interreg, interoperabilitatea planurilor de amenajare, coridoare TEN-T transfrontaliere și cooperare instituțională.',
        legal: 'Reg. (UE) Interreg, Legea 350/2001, EGTC (Grupare Europeană de Cooperare Teritorială), TEN-T, EUSDR',
        surse: 'Interreg, Eurostat, ESPON, TEN-T, EUSDR, ADR' } }
  };

  function _resolveCity(cityKey) {
    return (G._RO_CITIES_DB && G._RO_CITIES_DB[cityKey]) ||
      (G.TCI && G.TCI._EXTRA_UATS && G.TCI._EXTRA_UATS[cityKey]) ||
      (G._TCIMasterplanPDF && G._TCIMasterplanPDF._resolveCity && G._TCIMasterplanPDF._resolveCity(cityKey)) || null;
  }
  function _jsPDF() { return (window.jspdf && window.jspdf.jsPDF) || window.jsPDF || (window.jspdf && window.jspdf.default) || null; }

  // ── GENERARE (profilId, rang 'inf'|'sup', cityKey) ────────────────────────
  async function generate(profileId, rank, cityKey) {
    rank = (rank === 'sup') ? 'sup' : 'inf';
    if (window._USER && window._USER.email === 'office@m2msolutions.ro') { G.ss && G.ss('Generare dezactivată pentru acest cont'); return; }
    var M = META[profileId]; if (!M || !M[rank]) { G.ss && G.ss('Profil necunoscut'); return; }
    var S = M[rank], ac = M.ac;
    var J = _jsPDF(); if (!J || typeof G._makeStratDoc !== 'function') { G.ss && G.ss('Motor PDF indisponibil'); return; }
    var city = _resolveCity(cityKey) || {}; var cityName = city.name || 'UAT';
    var prof = (G._UATProfile && G._UATProfile.PROFILES && G._UATProfile.PROFILES[profileId]) || {};
    var det = (G._UATProfile && G._UATProfile.detect) ? G._UATProfile.detect(city).filter(function (x) { return x.id === profileId; })[0] : null;

    G.ss && G.ss((rank === 'sup' ? '📘 Generez studiu rang SUPERIOR (100+ pag)...' : '📗 Generez studiu rang inferior (60+ pag)...') + ' · ' + (prof.label || profileId));
    try {
      var pdf = new J({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      var D = G._makeStratDoc(pdf, { docTitle: (prof.label || 'PROFIL') + (rank === 'sup' ? ' · TERITORIAL' : ' · UAT'), cityName: cityName, accent: ac });
      if (D) D.__cityKey = cityKey;
      var W = 210, CW = D.dims.CW, FONT = (pdf.__unicodeFont ? 'DejaVuRO' : 'helvetica');

      // ── COPERTĂ ──
      D.setSuppress && D.setSuppress(true); D.setPage && D.setPage(1);
      pdf.setFillColor(12, 17, 28); pdf.rect(0, 0, W, 297, 'F'); pdf.setFillColor(ac[0], ac[1], ac[2]); pdf.rect(0, 58, W, 1.4, 'F');
      try { if (G._drawUrbanxLogo) { G._drawUrbanxLogo(pdf, W / 2 - 9, 16, 18); pdf.__hasCoverLogo = 1; } } catch (e) {}
      pdf.setTextColor(ac[0], ac[1], ac[2]); pdf.setFont(FONT, 'bold'); pdf.setFontSize(9); pdf.text('URBANX · STUDII DE PROFIL TERITORIAL', W / 2, 44, { align: 'center' });
      pdf.setFontSize(30); pdf.text(M.ico || '◆', W / 2, 70, { align: 'center' });
      pdf.setTextColor(160, 170, 190); pdf.setFont(FONT, 'normal'); pdf.setFontSize(9); pdf.text(D.S2(S.badge), W / 2, 80, { align: 'center' });
      pdf.setTextColor(255, 255, 255); pdf.setFont(FONT, 'bold'); pdf.setFontSize(17);
      var tl = pdf.splitTextToSize(D.S2(S.t), W - 46); pdf.text(tl, W / 2, 98, { align: 'center' });
      pdf.setTextColor(245, 200, 100); pdf.setFontSize(13);
      pdf.text(D.S2(cityName + (city.judet ? ' · jud. ' + city.judet : '')), W / 2, 98 + tl.length * 8 + 6, { align: 'center' });
      if (det) { pdf.setTextColor(150, 200, 170); pdf.setFont(FONT, 'normal'); pdf.setFontSize(8.5); pdf.text(D.S2('Profil detectat din date reale: ' + det.evidence + ' · încredere ' + det.confidence), W / 2, 98 + tl.length * 8 + 14, { align: 'center', maxWidth: W - 50 }); }
      var cy0 = 152; pdf.setDrawColor(ac[0], ac[1], ac[2]); pdf.setLineWidth(0.4); pdf.setFillColor(20, 26, 40); pdf.roundedRect(22, cy0, W - 44, 90, 3, 3, 'FD');
      pdf.setTextColor(210, 218, 232); pdf.setFont(FONT, 'normal'); pdf.setFontSize(9);
      pdf.text(pdf.splitTextToSize(D.S2(S.ce), W - 60), W / 2, cy0 + 11, { align: 'center' });
      pdf.setTextColor(ac[0], ac[1], ac[2]); pdf.setFont(FONT, 'bold'); pdf.setFontSize(8.2); pdf.text('CADRU LEGAL', W / 2, cy0 + 58, { align: 'center' });
      pdf.setTextColor(190, 198, 214); pdf.setFont(FONT, 'normal'); pdf.setFontSize(7.8); pdf.text(pdf.splitTextToSize(D.S2(S.legal), W - 60), W / 2, cy0 + 64, { align: 'center' });
      pdf.setTextColor(ac[0], ac[1], ac[2]); pdf.setFont(FONT, 'bold'); pdf.setFontSize(8.2); pdf.text('SURSE DE DATE', W / 2, cy0 + 76, { align: 'center' });
      pdf.setTextColor(190, 198, 214); pdf.setFont(FONT, 'normal'); pdf.setFontSize(7.8); pdf.text(pdf.splitTextToSize(D.S2(S.surse), W - 60), W / 2, cy0 + 82, { align: 'center' });
      pdf.setTextColor(150, 158, 174); pdf.setFontSize(7.6);
      pdf.text(D.S2('Generat: ' + new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' }) + ' · Document strategic generat algoritmic · UrbanX'), W / 2, 270, { align: 'center', maxWidth: W - 40 });
      D.setSuppress && D.setSuppress(false);

      // ── Rezumat + metodologie + delimitare (zero-duplicare) ──
      D.chapter('Rezumat executiv');
      D.P('Prezentul document — ' + S.t + ' pentru ' + cityName + (city.judet ? ', județul ' + city.judet : '') + ' — face parte din suita UrbanX de Studii de Profil Teritorial. Profilul „' + (prof.label || profileId) + '" a fost identificat automat din semnale reale (' + (det ? det.evidence : 'context geografic al UAT') + '). Documentul integrează date oficiale, geospațiale și deschise într-o analiză coerentă — diagnoză, viziune, ținte și recomandări — specifică naturii teritoriale a UAT-ului, la standardul UrbanX.');
      D.callout && D.callout('Domeniul studiului', S.ce);
      D.callout && D.callout('Rangul și delimitarea', (rank === 'sup'
        ? 'Document de RANG SUPERIOR (teritorial/strategic): analizează zona/sistemul la scară regională, nu parcela. Componenta de amplasament punctual se tratează în studiul de rang inferior dedicat acestui profil — sunt documente diferite, complementare.'
        : 'Document de RANG INFERIOR (UAT/amplasament): analizează punctual localitatea și amplasamentul vizat. Strategia teritorială la scară regională se tratează în studiul de rang superior dedicat acestui profil — sunt documente diferite, complementare.'));
      D.chapter('Metodologie și surse de date');
      D.P('Studiul aplică o metodologie transparentă: colectarea datelor din surse oficiale și deschise (' + S.surse + '), diagnoza pe dimensiunile specifice profilului, formularea de obiective și ținte cuantificabile și fundamentarea recomandărilor pe evidențe. Cadrul legal de referință: ' + S.legal + '. Limitările sunt explicitate; valorile estimate au caracter orientativ și se confirmă pe sursele oficiale și prin studii de specialitate avizate.');

      // ── Context teritorial — capturi POI reale (OSM) ──
      try { if (G._DocMapCaptures && G._DocMapCaptures.poiSection) await G._DocMapCaptures.poiSection(D, cityKey, 'Context teritorial — dotări și echipare (OSM)'); } catch (e) {}

      // ── Corp dezvoltat (conținut profund per profil×rang) ──
      var deep = (G._PROFILE_DEEP && G._PROFILE_DEEP[profileId + '_' + rank]) || [];
      // Graficele per capitol vin din DATELE proprii ale studiului (tabele/charturi). NU activăm
      // fallback-ul IVU în capitole (regula Florin: graficele IVU NU se repetă în corp — doar în Nota UrbanX).
      if (deep.length && G._deepRender) { G._deepRender(D, deep, CW); }
      else { D.chapter('Conținut dezvoltat'); D.P('Corpul dezvoltat al acestui studiu de profil se află în integrare progresivă. Structura, copertă, sursele și Nota UrbanX sunt complete.'); }

      // ── Planșe cu HĂRȚI REALE ale UAT ──
      try {
        if (G._DocMapCaptures && G._DocMapCaptures.capture && G._DocMapCaptures.renderPlates) {
          var _shots = await G._DocMapCaptures.capture(cityKey);
          if (_shots && _shots.length) G._DocMapCaptures.renderPlates(D, _shots, 'Planșe — modele urbane și indici pe harta ' + cityName);
        }
      } catch (e) {}

      // ── Nota UrbanX (IVU) — include modificatorul de profil ──
      try { if (G.UrbanXIVU && G.UrbanXIVU.renderSection) G.UrbanXIVU.renderSection(D, cityKey); } catch (e) {}

      D.chapter('Concluzii și pași următori');
      D.P('Studiul oferă o bază de fundamentare pentru deciziile de planificare specifice profilului „' + (prof.label || profileId) + '". Recomandările trebuie integrate în documentele strategice ale UAT (SIDU, PUG, planuri sectoriale) și în documentele de rang superior (PATJ/PATN), corelate cu sursele de finanțare disponibile (POR, PNRR, JTF, Interreg, buget local).');
      D.chapter('Surse, standarde și disclaimer');
      D.P('Cadru legal: ' + S.legal + '. Surse de date: ' + S.surse + '. Document generat algoritmic de UrbanX ca instrument de pre-analiză și fundamentare strategică. Valorile sunt estimări calibrate pe date reale și NU substituie documentațiile de specialitate avizate conform legii. Deciziile finale rămân responsabilitatea autorității și a specialiștilor atestați. Metodologie UrbanX · ThinkSmart Solutions.');

      var fn = (G._stratFileName ? G._stratFileName('Profil_' + profileId + '_' + rank, { territorial: rank === 'sup', localitate: cityName })
        : ('Profil_' + profileId + '_' + rank + '_' + cityName.replace(/[^\w]+/g, '_') + '.pdf'));
      G._buildStratTOC && G._buildStratTOC(D, 1);
      pdf.save(fn); G.ss && G.ss('✅ ' + S.t + ' generat: ' + pdf.getNumberOfPages() + ' pagini · ' + cityName); return fn;
    } catch (err) { console.error('[ProfileStudies]', err); G.ss && G.ss('❌ Eroare: ' + (err.message || err).toString().slice(0, 80)); }
  }

  // ── Meniu Rapoarte: listează DOAR profilurile detectate pentru UAT-ul curent ──
  function renderMenu() {
    try {
      var wrap = document.getElementById('rapoarte-profile-wrap');
      var host = document.getElementById('rapoarte-profile-list'); if (!host || !wrap) return;
      var ck = (G.TCI && G.TCI.cityKey); var city = _resolveCity(ck);
      var det = (city && G._UATProfile && G._UATProfile.detect) ? G._UATProfile.detect(city) : [];
      // doar profilurile cu META definit (cele cu studii efective)
      det = det.filter(function (d) { return META[d.id]; });
      if (!det.length) { wrap.style.display = 'none'; host.innerHTML = ''; return; }
      wrap.style.display = 'block';
      host.innerHTML = det.map(function (d) {
        var M = META[d.id], ac = M.ac, hex = 'rgb(' + ac[0] + ',' + ac[1] + ',' + ac[2] + ')';
        var hasInf = !!(G._PROFILE_DEEP && G._PROFILE_DEEP[d.id + '_inf']), hasSup = !!(G._PROFILE_DEEP && G._PROFILE_DEEP[d.id + '_sup']);
        return '<div style="padding:3px 4px 5px;border-radius:6px">' +
          '<div style="font-size:11.5px;color:' + hex + ';font-weight:700;padding:2px 4px">' + (M.ico || '◆') + ' ' + (d.profile.label || d.id) + ' <span style="font-size:9px;color:#64748b;font-weight:400">· ' + d.confidence + '</span></div>' +
          '<div style="font-size:9px;color:#64748b;padding:0 4px 3px">' + d.evidence + '</div>' +
          '<div style="display:flex;gap:4px;padding:0 4px">' +
          (hasInf ? '<button onclick="window._ProfileStudies.generate(\'' + d.id + '\',\'inf\',window.TCI&&window.TCI.cityKey);toggleRapoarteMenu&&toggleRapoarteMenu()" style="flex:1;text-align:left;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:#cbd5e1;padding:4px 8px;cursor:pointer;border-radius:5px;font-size:11px" title="Studiu de amplasament/UAT — 60+ pagini">📗 Rang inferior (UAT)</button>' : '') +
          (hasSup ? '<button onclick="window._ProfileStudies.generate(\'' + d.id + '\',\'sup\',window.TCI&&window.TCI.cityKey);toggleRapoarteMenu&&toggleRapoarteMenu()" style="flex:1;text-align:left;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:#cbd5e1;padding:4px 8px;cursor:pointer;border-radius:5px;font-size:11px" title="Studiu teritorial/strategic — 100+ pagini">📘 Rang superior (teritorial)</button>' : '') +
          '</div></div>';
      }).join('');
    } catch (e) {}
  }

  G._ProfileStudies = { generate: generate, META: META, renderMenu: renderMenu };
  window._ProfileStudies = G._ProfileStudies;
  try { if (document.readyState !== 'loading') renderMenu(); else document.addEventListener('DOMContentLoaded', renderMenu); } catch (e) {}
  console.log('[ProfileStudies] ✅ studii de profil teritorial încărcate (window._ProfileStudies.generate)');
})(window);
