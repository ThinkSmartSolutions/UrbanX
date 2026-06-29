// ═══════════════════════════════════════════════════════════════════════════
// sps-studies.js — window._SPS · Strategic Planning Suite (caiet de sarcini)
// Motor GENERIC pentru cele 20 studii SPS de rang superior (80-100 pag), pe pipeline
// dovedit: _makeStratDoc (copertă + IVU pe copertă via _buildStratTOC) + intro + secțiuni
// de date + captură POI (_DocMapCaptures.poiSection) + corp dezvoltat (_deepRender pe
// window._SPS_DEEP[id]) + secțiune IVU + surse + disclaimer.
// window._SPS.generate(id, cityKey) · .open(id) · 26 iunie 2026 · ThinkSmart Solutions
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';
  function N(v, d) { try { return Number(v).toLocaleString('ro-RO', { maximumFractionDigits: d == null ? 0 : d }); } catch (e) { return '' + v; } }

  // Cele 20 studii (id = cheia din _SPS_DEEP + info drawer). accent = culoare temă.
  var STUDIES = {
    'sdl': { t: 'STRATEGIA DE DEZVOLTARE LOCALĂ (SDL)', ico: '🏘️', ac: [13, 110, 80], badge: 'TERITORIAL', legal: 'Legea 350/2001 · Ghid SDL/MDLPA · POR 2021-2027', surse: 'INS TEMPO · Eurostat · MFP · OSM', ce: 'Documentul strategic de dezvoltare al unei comune sau oraș mic: diagnoză multisectorială, viziune, obiective și portofoliu de proiecte pe orizont 2026-2040, adaptat la scara și resursele localității.' },
    'metropolitan': { t: 'STRATEGIA METROPOLITANĂ', ico: '🌆', ac: [37, 99, 235], badge: 'TERITORIAL', legal: 'Legea 351/2001 · Legea 215/2001 (ADI) · POR · Carta Leipzig', surse: 'INS · Eurostat · OSM · GTFS', ce: 'Strategia de coordonare a zonei metropolitane / urbane funcționale: policentrism, mobilitate metropolitană, servicii partajate, dezvoltare economică integrată și guvernanță inter-UAT.' },
    'smart-city': { t: 'STRATEGIA SMART CITY (ISO 37120)', ico: '📡', ac: [14, 165, 233], badge: 'SECTORIAL', legal: 'ISO 37120/37122/37123 · Strategia Națională Smart City · GDPR', surse: 'ISO 37120 · INS · OSM · senzori IoT', ce: 'Strategia de oraș inteligent pe standardul ISO 37120: digital twin, date deschise, servicii eGov, mobilitate inteligentă, energie și mediu monitorizate, guvernanță bazată pe date.' },
    'housing': { t: 'STRATEGIA DE LOCUIRE', ico: '🏠', ac: [202, 138, 4], badge: 'SECTORIAL', legal: 'Legea 114/1996 · Legea 152/1998 (ANL) · Strategia Națională a Locuirii', surse: 'INS Recensământ 2021 · MDLPA · piață imobiliară', ce: 'Strategia fondului locativ: stoc de locuințe, accesibilitate, locuințe sociale și ANL, regenerarea ansamblurilor, eficiență energetică și nevoia de locuire pe segmente.' },
    'tourism': { t: 'STRATEGIA DE TURISM', ico: '🧳', ac: [219, 39, 119], badge: 'SECTORIAL', legal: 'OG 58/1998 · Strategia Națională de Turism · Legea 422/2001', surse: 'INS turism · OSM · Via Transilvanica · obiective LMI', ce: 'Strategia de dezvoltare turistică: patrimoniu și atracții, capacitate de cazare, circuite și trasee, turism cultural/balnear/montan, marketing teritorial și sezonalitate.' },
    'cultural': { t: 'STRATEGIA CULTURALĂ', ico: '🎭', ac: [124, 58, 237], badge: 'SECTORIAL', legal: 'Legea 422/2001 · OUG 118/2006 (așezăminte) · Agenda 21 a culturii', surse: 'LMI/INP · RAN · instituții culturale · OSM', ce: 'Strategia culturală: patrimoniu construit și mobil, instituții și așezăminte culturale, industrii creative, vitalitate culturală și acces la cultură pe teritoriu.' },
    'environment': { t: 'STRATEGIA DE MEDIU ȘI BIODIVERSITATE', ico: '🌿', ac: [22, 163, 74], badge: 'SECTORIAL', legal: 'OUG 195/2005 · OUG 57/2007 (arii protejate) · Dir. 92/43/CEE', surse: 'Copernicus · EEA · ANPM · OSM · Natura 2000', ce: 'Strategia de mediu: calitatea aerului/apei/solului, arii protejate și biodiversitate, spații verzi pe locuitor, infrastructură verde-albastră și servicii ecosistemice.' },
    'digitalization': { t: 'STRATEGIA DE DIGITALIZARE (eGOV)', ico: '💻', ac: [2, 132, 199], badge: 'SECTORIAL', legal: 'Legea 242/2022 (interoperabilitate) · PNRR C7 · eIDAS · GDPR', surse: 'ADR · PNRR · INS · servicii publice locale', ce: 'Strategia de transformare digitală a administrației: servicii eGov, interoperabilitate, infrastructură de date, conectivitate, competențe digitale și securitate cibernetică.' },
    'sfu': { t: 'STUDIU DE FEZABILITATE URBANĂ (SFU)', ico: '📐', ac: [180, 83, 9], badge: 'SPECIALIZAT', legal: 'HG 907/2016 · Legea 350/2001 · POR/PNRR', surse: 'ANCPI · OSM · INS · costuri de referință', ce: 'Studiu de fezabilitate pentru o intervenție urbană: analiza opțiunilor, fezabilitate tehnică și financiară, cost-beneficiu, riscuri și recomandarea variantei optime.' },
    'sct': { t: 'STUDIU DE CAPACITATE DE TRANSPORT (SCT)', ico: '🚦', ac: [37, 99, 235], badge: 'SPECIALIZAT', legal: 'Legea 350/2001 · normative trafic · PMUD', surse: 'OSM rețea · GTFS · recensământ trafic', ce: 'Analiza capacității rețelei de transport: niveluri de serviciu, congestie, capacitate intersecții, transport public și impactul unei dezvoltări asupra traficului.' },
    'sim': { t: 'STUDIU DE IMPACT ASUPRA MOBILITĂȚII (SIM)', ico: '🚗', ac: [29, 78, 216], badge: 'SPECIALIZAT', legal: 'Legea 350/2001 · Ghid PMUD · normative trafic', surse: 'OSM · GTFS · trip generation', ce: 'Evaluarea impactului unei dezvoltări asupra mobilității: trafic generat, distribuție modală, efecte asupra rețelei și măsuri de atenuare (transport public, parcare, acces).' },
    'scsp': { t: 'STUDIU DE CALITATE A SPAȚIULUI PUBLIC (SCSP)', ico: '🏛️', ac: [13, 148, 136], badge: 'SPECIALIZAT', legal: 'Legea 350/2001 · standarde spațiu public · 3-30-300', surse: 'OSM · Copernicus · observații teren', ce: 'Evaluarea calității spațiilor publice: accesibilitate, confort, vitalitate, vegetație (regula 3-30-300), siguranță, mobilier urban și recomandări de ameliorare.' },
    'srgu': { t: 'STUDIU DE REGENERARE URBANĂ REZIDENȚIALĂ (SRgU)', ico: '🏢', ac: [217, 70, 39], badge: 'SPECIALIZAT', legal: 'Legea 350/2001 · POR Axa 5 · Legea 152/1998', surse: 'INS · OSM · fond locativ · termoficare', ce: 'Strategia de regenerare a ansamblurilor rezidențiale: starea fondului, eficiență energetică, spații publice, dotări, mobilitate și instrumente de finanțare a regenerării.' },
    'atlas': { t: 'ATLAS URBAN — MONOGRAFIE TERITORIALĂ', ico: '🗺️', ac: [71, 85, 105], badge: 'SPECIALIZAT', legal: 'metodologie monografică · INS · Legea 350/2001', surse: 'INS · OSM · Copernicus · arhive', ce: 'Monografia teritorială completă a UAT: cadru natural, evoluție istorică, demografie, economie, locuire, infrastructură, mediu și patrimoniu — referința documentară a localității.' },
    'srm': { t: 'STUDIU DE RISC MULTIHAZARD (SRM)', ico: '⚠️', ac: [220, 38, 38], badge: 'SPECIALIZAT', legal: 'Legea 575/2001 · P100-1/2022 · Dir. 2007/60/CE · HG 447/2003', surse: 'INFP · ANAR/INHGA · Copernicus · EEA', ce: 'Evaluarea integrată a hazardurilor: seismic, inundații, alunecări, secetă, caniculă și incendii — expunere, vulnerabilitate, scenarii de risc și măsuri de reducere.' },
    'sda': { t: 'STUDIU DE DEMOGRAFIE APROFUNDATĂ (SDA)', ico: '👥', ac: [147, 51, 234], badge: 'SPECIALIZAT', legal: 'metodologie INS · Eurostat · Strategia demografică', surse: 'INS Recensământ 2021 · Eurostat · TEMPO', ce: 'Analiza demografică detaliată: structură pe vârste și gen, migrație, natalitate/mortalitate, îmbătrânire, gospodării și proiecții ale populației pe orizont 2040.' },
    'scpt': { t: 'STUDIU DE COMPETITIVITATE TERITORIALĂ (SCpT)', ico: '📈', ac: [13, 110, 80], badge: 'SPECIALIZAT', legal: 'Strategia Națională · RIS3 · politica de coeziune UE', surse: 'INS · Eurostat · ONRC · RIS3', ce: 'Evaluarea competitivității teritoriului: capital uman, mediu de afaceri, inovare, specializare inteligentă, atractivitate investițională și poziționare regională.' },
    'siva': { t: 'STUDIU DE INFRASTRUCTURĂ VERDE ȘI ALBASTRĂ (SIVA)', ico: '💧', ac: [16, 185, 129], badge: 'SPECIALIZAT', legal: 'Strategia UE biodiversitate 2030 · OUG 195/2005 · 3-30-300', surse: 'Copernicus · EEA · OSM · ANAR', ce: 'Strategia rețelei verzi-albastre: parcuri și coridoare ecologice, ape de suprafață, managementul pluvial, conectivitate ecologică și servicii ecosistemice urbane.' },
    'seu': { t: 'STUDIU DE ENERGIE URBANĂ (SEU)', ico: '⚡', ac: [234, 88, 12], badge: 'SPECIALIZAT', legal: 'Dir. 2018/2001 (RED II) · SECAP · Legea 121/2014 (eficiență)', surse: 'Open-Meteo · INS · PNRR · operatori energie', ce: 'Strategia energetică locală: consum și mix energetic, eficiența clădirilor, potențial regenerabil (solar/geotermal/biomasă), comunități de energie și decarbonare.' },
    'sppc': { t: 'STUDIU DE PATRIMONIU CONSTRUIT ȘI PEISAJ (SPPC)', ico: '🏰', ac: [161, 98, 7], badge: 'SPECIALIZAT', legal: 'Legea 422/2001 · Convenția de la Florența (peisaj) · OG 43/2000', surse: 'LMI/INP · RAN · OSM · Copernicus', ce: 'Evaluarea patrimoniului construit și a peisajului cultural: monumente LMI, zone protejate, peisaj urban și natural, vulnerabilități și măsuri de protejare și valorificare.' }
  };

  // ── DELIMITAREA STUDIULUI (REGULA: zero duplicare; teritoriu≠parcelă) ──
  // Fiecare studiu isi declara EXPLICIT scopul si trimite la studiul-sora pentru temele
  // adiacente, ca niciun livrabil să nu pară că dublează altul (CLAUDE.md §12.8-9).
  var DEMARC = {
    environment: 'Acoperă POLITICA de mediu (calitatea aerului/apei/solului, arii protejate, biodiversitate la nivel de UAT). NU detaliază proiectarea rețelei verzi-albastre — vezi SIVA; adaptarea climatică/SECAP — vezi Strategia Climatică; sistemul energetic — vezi SEU.',
    siva: 'Acoperă REȚEAUA FIZICĂ verde-albastră (parcuri, coridoare ecologice, ape de suprafață, management pluvial, conectivitate). NU tratează politica generală de mediu/biodiversitate — vezi Strategia de Mediu; nici energia — vezi SEU.',
    seu: 'Acoperă SISTEMUL ENERGETIC local (consum, mix, eficiență clădiri, regenerabil, decarbonare energetică). NU acoperă inventarul de emisii GES și adaptarea climatică — vezi Strategia Climatică/SECAP.',
    sct: 'Acoperă CAPACITATEA rețelei de transport (oferta: LOS, intersecții, debite). NU este planul strategic de mobilitate al UAT — vezi PMUD; nici impactul unei dezvoltări punctuale — vezi SIM.',
    sim: 'Acoperă IMPACTUL unei dezvoltări asupra mobilității (cererea generată, trip generation, măsuri de atenuare). NU evaluează capacitatea de ansamblu a rețelei — vezi SCT; nu înlocuiește PMUD.',
    cultural: 'Acoperă VIAȚA culturală și instituțiile (așezăminte, industrii creative, acces la cultură). NU tratează protecția fizică a patrimoniului construit/peisajului — vezi SPPC; nici valorificarea turistică — vezi Strategia de Turism.',
    sppc: 'Acoperă PROTECȚIA patrimoniului construit și a peisajului cultural (monumente LMI, zone protejate). NU acoperă viața culturală/instituțiile — vezi Strategia Culturală; cercetarea arheologică — vezi RCAI; turismul — vezi Strategia de Turism.',
    tourism: 'Acoperă VALORIFICAREA turistică (atracții, cazare, circuite, marketing teritorial). NU tratează protecția patrimoniului — vezi SPPC; nici politica culturală — vezi Strategia Culturală.',
    housing: 'Acoperă POLITICA de locuire (stoc, accesibilitate, locuințe sociale/ANL, nevoia pe segmente). NU tratează regenerarea fizică a ansamblurilor existente — vezi SRgU.',
    srgu: 'Acoperă REGENERAREA FIZICĂ a ansamblurilor rezidențiale existente (stare fond, eficiență energetică, spații publice, dotări). NU este strategia generală de locuire — vezi Strategia de Locuire.',
    sda: 'Acoperă exclusiv DEMOGRAFIA aprofundată (structură, migrație, proiecții). Pentru economie/competitivitate — vezi SCpT; pentru monografia completă — vezi Atlasul Urban.',
    scpt: 'Acoperă COMPETITIVITATEA economică teritorială (capital uman, mediu de afaceri, inovare, RIS3). NU detaliază demografia — vezi SDA; nici dezvoltarea economică operațională — vezi Strategia Economică.',
    atlas: 'Este o MONOGRAFIE DE SINTEZĂ și referință documentară: rezumă și trimite la studiile tematice dedicate (demografie→SDA, mediu→Mediu/SIVA, mobilitate→PMUD/SCT, patrimoniu→SPPC, locuire→Locuire) fără a le înlocui.',
    srm: 'Acoperă RISCUL MULTIHAZARD la nivel TERITORIAL (seismic/inundații/alunecări/secetă/caniculă/incendii — expunere, scenarii, măsuri). NU înlocuiește simulările punctuale de pe hartă (Riscuri & Protecție civilă) și nici studiul de risc la nivel de parcelă.',
    scsp: 'Acoperă CALITATEA SPAȚIILOR PUBLICE (accesibilitate, confort, vitalitate, vegetație 3-30-300, mobilier). NU tratează rețeaua ecologică amplă — vezi SIVA; nici mobilitatea — vezi SCT/PMUD.',
    sfu: 'Acoperă FEZABILITATEA URBANĂ a unei intervenții (analiza opțiunilor, fezabilitate tehnică/financiară și cost-beneficiu la nivel strategic). NU este Studiul de Fezabilitate de investiție pe parcelă cu deviz HG 907/2016 și scenarii ROI — acela e livrabilul dedicat SF/DALI.',
    'smart-city': 'Acoperă orașul INTELIGENT (ISO 37120, digital twin, IoT, servicii inteligente). Pentru digitalizarea administrației/eGov — vezi Strategia de Digitalizare.',
    digitalization: 'Acoperă DIGITALIZAREA administrației (eGov, interoperabilitate, infrastructură de date, competențe digitale). NU acoperă orașul inteligent/IoT — vezi Strategia Smart City.',
    sdl: 'Este documentul-umbrelă de dezvoltare pentru comune/orașe mici: integrează și trimite la studiile tematice (mediu, mobilitate, locuire etc.) fără a le rescrie în detaliu.',
    metropolitan: 'Acoperă coordonarea INTER-UAT (policentrism, servicii partajate, mobilitate metropolitană, guvernanță). NU rescrie strategiile sectoriale ale fiecărui UAT membru.'
  };

  function _resolveCity(cityKey) {
    var db = G._RO_CITIES_DB || {};
    return db[cityKey] || (G.TCI && G.TCI._EXTRA_UATS && G.TCI._EXTRA_UATS[cityKey]) ||
      (G._TCIMasterplanPDF && G._TCIMasterplanPDF._resolveCity && G._TCIMasterplanPDF._resolveCity(cityKey)) || null;
  }

  async function generate(id, cityKey, mode) {
    var S = STUDIES[id]; if (!S) { G.ss && G.ss('Studiu SPS necunoscut: ' + id); return; }
    cityKey = cityKey || (G.TCI && G.TCI.cityKey);
    var J = (G.jspdf && G.jspdf.jsPDF) || G.jsPDF;
    if (!J || typeof G._makeStratDoc !== 'function') { G.ss && G.ss('Motor PDF indisponibil'); return; }
    var city = _resolveCity(cityKey) || {}; var cityName = city.name || 'UAT';
    if (typeof G._loadReguli === 'function') { try { await G._loadReguli(cityKey); } catch (e) {} }
    // mod PARCELĂ (ca la HBU): doar pentru studiile aplicabile pe parcelă, dacă e selectată o parcelă și mode!=='T'
    var territorial = (mode === 'T');
    var PC = (S.parcel && !territorial && G._ParcelCtx) ? G._ParcelCtx.get(cityKey) : null;
    var onParcel = !!(PC && PC.hasParcel);
    // REGULA teritoriu≠parcelă (Florin): din meniul Rapoarte (mod 'P') studiul PE PARCELĂ
    // NECESITĂ o parcelă selectată — altfel NU se generează versiunea teritorială (ar dubla
    // studiul din meniul Teritoriu, accesibil din două meniuri). Blocăm + cerem parcelă.
    if (mode === 'P' && !onParcel) {
      G.ss && G.ss('📍 Selectați mai întâi o parcelă pe hartă — „' + S.t + '" pe parcelă necesită un amplasament. Versiunea teritorială este în meniul Teritoriu.');
      return;
    }
    G.ss && G.ss(S.ico + ' Generez ' + S.t + (onParcel ? ' — parcelă' : ' — teritorial') + '…');
    var nbImg = null; if (onParcel && PC.lat && G._DocMapCaptures && G._DocMapCaptures.capturePOI) { try { nbImg = await G._DocMapCaptures.capturePOI(cityKey, { lat: PC.lat, lon: PC.lon, radius: 600 }); } catch (e) {} }
    var pdf = new J({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    var D = G._makeStratDoc(pdf, { docTitle: S.t + (onParcel ? ' — PARCELĂ' : ''), cityName: cityName, accent: S.ac });
    if (D) D.__cityKey = cityKey;
    var W = 210, CW = D.dims.CW, FONT = 'DejaVuRO';

    // ── COPERTĂ completă (fără pagină parțială) ──
    D.setSuppress && D.setSuppress(true); D.setPage && D.setPage(1);
    pdf.setFillColor(14, 18, 30); pdf.rect(0, 0, W, 297, 'F'); pdf.setFillColor(S.ac[0], S.ac[1], S.ac[2]); pdf.rect(0, 58, W, 1.4, 'F');
    try { if (G._drawUrbanxLogo) { G._drawUrbanxLogo(pdf, W / 2 - 9, 16, 18); pdf.__hasCoverLogo = 1; } } catch (e) {}
    pdf.setTextColor(S.ac[0], S.ac[1], S.ac[2]); pdf.setFont(FONT, 'bold'); pdf.setFontSize(9); pdf.text('URBANX · STRATEGIC PLANNING SUITE', W / 2, 44, { align: 'center' });
    pdf.setTextColor(160, 170, 190); pdf.setFontSize(9.5); pdf.text(S.badge + (onParcel ? ' · APLICAT PE PARCELĂ' : ''), W / 2, 72, { align: 'center' });
    pdf.setTextColor(255, 255, 255); pdf.setFont(FONT, 'bold'); pdf.setFontSize(19);
    var tl = pdf.splitTextToSize(S.t, W - 50); pdf.text(tl, W / 2, 90, { align: 'center' });
    pdf.setTextColor(S.ac[0] + 40 > 255 ? 255 : S.ac[0] + 40, 191, 90); pdf.setFontSize(14); pdf.setTextColor(245, 200, 100);
    pdf.text(D.S2(cityName + (city.judet ? ' · jud. ' + city.judet : '')), W / 2, 90 + tl.length * 9 + 6, { align: 'center' });
    // panou descriere + repere
    var cy0 = 150;
    pdf.setDrawColor(S.ac[0], S.ac[1], S.ac[2]); pdf.setLineWidth(0.4); pdf.setFillColor(22, 28, 44);
    pdf.roundedRect(24, cy0, W - 48, 86, 3, 3, 'FD');
    pdf.setTextColor(255, 255, 255); pdf.setFont(FONT, 'normal'); pdf.setFontSize(9); pdf.setTextColor(210, 218, 232);
    var cl = pdf.splitTextToSize(S.ce, W - 64); pdf.text(cl, W / 2, cy0 + 12, { align: 'center' });
    pdf.setTextColor(S.ac[0], S.ac[1], S.ac[2]); pdf.setFont(FONT, 'bold'); pdf.setFontSize(8.5); pdf.text('CADRU LEGAL', W / 2, cy0 + 56, { align: 'center' });
    pdf.setTextColor(190, 198, 214); pdf.setFont(FONT, 'normal'); pdf.setFontSize(8);
    pdf.text(pdf.splitTextToSize(S.legal, W - 64), W / 2, cy0 + 63, { align: 'center' });
    pdf.setTextColor(S.ac[0], S.ac[1], S.ac[2]); pdf.setFont(FONT, 'bold'); pdf.setFontSize(8.5); pdf.text('SURSE DE DATE', W / 2, cy0 + 74, { align: 'center' });
    pdf.setTextColor(190, 198, 214); pdf.setFont(FONT, 'normal'); pdf.setFontSize(8);
    pdf.text(pdf.splitTextToSize(S.surse, W - 64), W / 2, cy0 + 80, { align: 'center' });
    pdf.setTextColor(150, 158, 174); pdf.setFontSize(8);
    pdf.text('Generat: ' + new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' }) + ' · Document strategic generat algoritmic · UrbanX', W / 2, cy0 + 100, { align: 'center', maxWidth: W - 40 });
    D.setSuppress && D.setSuppress(false);

    // ── Rezumat + metodologie ──
    D.chapter('Rezumat executiv');
    D.P('Prezentul document — ' + S.t + ' pentru ' + cityName + (city.judet ? ', județul ' + city.judet : '') + ' — este un document strategic din suita UrbanX (Strategic Planning Suite). El integrează date reale (statistice, geospațiale și live) într-o analiză coerentă, cu diagnoză, viziune, ținte și recomandări, la standardul de calitate cerut documentelor strategice teritoriale.');
    D.callout && D.callout('Domeniul studiului', S.ce);
    // Delimitare explicită față de studiile-soră (regula zero-duplicare)
    if (DEMARC[id]) D.callout && D.callout('Delimitarea studiului (ce acoperă · ce NU — vezi studiul dedicat)', DEMARC[id]);
    D.chapter('Metodologie și surse de date');
    D.P('Studiul aplică o metodologie transparentă: colectarea datelor din surse oficiale și deschise (' + S.surse + '), analiza diagnostic pe dimensiunile relevante, formularea obiectivelor și a țintelor cuantificabile, și fundamentarea recomandărilor pe evidențe. Cadrul legal de referință: ' + S.legal + '. Limitările sunt explicitate; valorile estimate au caracter orientativ și se confirmă pe sursele oficiale.');

    // ── SECȚIUNE PUNCTUALĂ pe PARCELĂ (ca la HBU) — doar studiile aplicabile pe parcelă ──
    if (onParcel && PC) {
      var z = PC.zone || {};
      D.chapter('Amplasamentul analizat — parcela și zona');
      D.P('Acest studiu este aplicat PUNCTUAL: analizează parcela selectată și zona (UTR/subzona) din care face parte, nu întregul UAT. Datele de regim urbanistic de mai jos sunt cele aplicabile efectiv amplasamentului și fundamentează analiza din capitolele următoare.');
      if (D.table) D.table(['Atribut amplasament', 'Valoare'], [
        ['Identificator cadastral (CF/nr. cad.)', PC.nrcad || 'neidentificat'],
        ['Suprafață', PC.area ? N(PC.area) + ' mp' : '—'],
        ['Coordonate (centroid)', PC.lat != null ? N(PC.lat, 5) + '°N, ' + N(PC.lon, 5) + '°E' : '—'],
        ['UTR / zonă', (z.utrNr || '—') + (z.code ? ' · ' + z.code : '') + (z.denumire ? ' — ' + z.denumire : '')],
        ['POT / CUT reglementat', (z.pot != null ? N(z.pot) + '% ' : '—') + ' / ' + (z.cut != null ? N(z.cut, 2) : '—')],
        ['Înălțime maximă', z.hmax != null ? N(z.hmax, 1) + ' m' : '—']
      ], [CW * 0.5, CW * 0.5]);
      if (PC.edif && (PC.edif.amprenta != null || PC.edif.adc != null)) {
        D.P('Capacitate de edificare estimată pe parcelă: amprentă maximă la sol ' + (PC.edif.amprenta != null ? N(PC.edif.amprenta) + ' mp' : '—') + ', arie desfășurată construită ' + (PC.edif.adc != null ? N(PC.edif.adc) + ' mp' : '—') + (PC.edif.niv ? ', cca. ' + PC.edif.niv + ' niveluri' : '') + '.');
      }
      // avize patrimoniu pe parcelă (zona de protecție)
      if (G._LMI && G._LMI.avizForParcel && PC.lat != null) {
        try { var av = await G._LMI.avizForParcel(PC.lat, PC.lon); if (av && av.nota) { D.P('Patrimoniu/avize: ' + av.nota + (av.nivel ? ' Nivel de avizare estimat: ' + av.nivel + '.' : '')); } } catch (e) {}
      }
      // vecinătate imediată (dotări <600m) — captură
      if (nbImg && nbImg.img) {
        try {
          D.P('Harta de mai jos marchează dotările identificate în jurul amplasamentului (date OSM, rază ~600 m), relevante pentru accesibilitatea la servicii.');
          var iw = CW, ih = Math.round(iw * 0.6); if (D.ensure) D.ensure(ih + 10);
          var yy = (D.y != null ? D.y : 60); pdf.addImage(nbImg.img, 'JPEG', D.dims.ML, yy, iw, ih, '', 'FAST');
          if (D.setY) D.setY(yy + ih + 2); if (D.source) D.source('Dotări în proximitate (~600 m) · © OpenStreetMap');
        } catch (e) {}
      }
    }

    // ── Captură POI (context teritorial) — reutilizarea datelor din carduri ──
    try { if (G._DocMapCaptures && G._DocMapCaptures.poiSection) await G._DocMapCaptures.poiSection(D, cityKey, onParcel ? 'Context urban extins — dotări (OSM)' : 'Context teritorial — dotări și echipare (OSM)'); } catch (e) {}

    // ── Corp dezvoltat ──
    // REGULA teritoriu≠parcelă: pe PARCELĂ NU randăm cele ~75 capitole TERITORIALE
    // (ar fi același conținut ca documentul teritorial — „toate la fel"). Randăm o
    // ANALIZĂ FOCALIZATĂ pe amplasament, specifică temei. Pe teritoriu = corpul complet.
    try {
      if (onParcel) {
        _renderParcelFocus(D, id, S, PC, CW);
      } else {
        var deep = (G._SPS_DEEP && G._SPS_DEEP[id]) || [];
        if (deep.length && G._deepRender) G._deepRender(D, deep, CW);
        else { D.chapter('Conținut dezvoltat'); D.P('Corpul dezvoltat al acestui studiu (capitole detaliate pe toate dimensiunile) este în curs de integrare. Structura, copertă, sursele și Nota UrbanX sunt complete; capitolele aprofundate se adaugă progresiv la standardul de 80-100 pagini.'); }
      }
    } catch (e) {}

    // ── Planșe cu HĂRȚI REALE ale UAT (modele urbane + indici desenați pe hartă) ──
    // aceleași capturi ca în Masterplan/SIDU/PMUD; sărite grațios dacă harta nu e live.
    try {
      if (G._DocMapCaptures && G._DocMapCaptures.capture && G._DocMapCaptures.renderPlates) {
        var _shots = await G._DocMapCaptures.capture(cityKey);
        if (_shots && _shots.length) G._DocMapCaptures.renderPlates(D, _shots, 'Planșe — modele urbane și indici pe harta ' + cityName);
      }
    } catch (e) {}

    // ── Nota UrbanX (iVU) ──
    try { if (G.UrbanXIVU && G.UrbanXIVU.renderSection) G.UrbanXIVU.renderSection(D, cityKey); } catch (e) {}

    D.chapter('Concluzii');
    D.P('Studiul oferă o bază de fundamentare pentru deciziile de planificare în domeniul abordat. Recomandările trebuie integrate în documentele strategice ale UAT (SIDU, PUG, planuri sectoriale) și corelate cu sursele de finanțare disponibile (POR, PNRR, buget local).');
    D.chapter('Surse și standarde');
    D.P('Cadru legal: ' + S.legal + '. Surse de date: ' + S.surse + '. Metodologie UrbanX · ThinkSmart Solutions. Document strategic orientativ — nu substituie documentațiile oficiale avizate.');
    D.chapter('Limitări și disclaimer');
    D.P('Document generat algoritmic de UrbanX ca instrument de pre-analiză și fundamentare strategică. Valorile sunt estimări calibrate pe date reale și NU substituie documentațiile de specialitate avizate conform legii. Deciziile finale rămân responsabilitatea autorității și a specialiștilor atestați.');

    var translit = function (c) { return { 'ă': 'a', 'Ă': 'A', 'â': 'a', 'Â': 'A', 'î': 'i', 'Î': 'I', 'ș': 's', 'Ș': 'S', 'ş': 's', 'Ş': 'S', 'ț': 't', 'Ț': 'T', 'ţ': 't', 'Ţ': 'T' }[c] || c; };
    var fn = (G._stratFileName ? G._stratFileName('SPS_' + id, { territorial: !onParcel, localitate: cityName, nrcad: (onParcel && G._activeParcel && G._activeParcel.nrcad) })
              : ('SPS_' + id + '_' + cityName.replace(/[ăĂâÂîÎșȘşŞțȚţŢ]/g, translit).replace(/[^\w]+/g, '_') + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_'));
    G._buildStratTOC && G._buildStratTOC(D, 1);
    pdf.save(fn); G.ss && G.ss('✅ ' + S.t + ' generat: ' + pdf.getNumberOfPages() + ' pagini'); return fn;
  }

  // ── Meniul Rapoarte: doar studiile SPS APLICABILE PE PARCELĂ (parcel:1) ──
  // Populeaza #rapoarte-sps-parcel din STUDIES (sursa unica). Click → generate
  // (auto mod parcela daca e selectata o parcela), ℹ️ → info-drawer dinamic.
  function renderParcelMenu() {
    try {
      var host = document.getElementById('rapoarte-sps-parcel'); if (!host) return;
      var ids = Object.keys(STUDIES).filter(function (id) { return STUDIES[id].parcel; });
      host.innerHTML = ids.map(function (id) {
        var S = STUDIES[id];
        var m = S.t.match(/\(([^)]+)\)\s*$/); var abbr = m ? m[1] : '';
        var name = S.t.replace(/\s*\([^)]*\)\s*$/, '').replace(/^STUDIU DE\s+|^STUDIU\s+|^STRATEGIA DE\s+|^STRATEGIA\s+/i, '');
        name = name.charAt(0) + name.slice(1).toLowerCase();
        var label = (abbr ? abbr + ' — ' : '') + name;
        var tip = (S.ce || '').replace(/"/g, '’');
        return '<div style="display:flex;align-items:center;gap:2px;padding:1px 2px;border-radius:6px" onmouseover="this.style.background=\'rgba(255,255,255,.05)\'" onmouseout="this.style.background=\'none\'">' +
          '<button onclick="window._SPS&&window._SPS.generate(\'' + id + '\',window.TCI&&window.TCI.cityKey,\'P\');window.toggleRapoarteMenu&&toggleRapoarteMenu()" style="flex:1;text-align:left;background:none;border:none;color:#fbbf24;padding:4px 8px;cursor:pointer;border-radius:5px;font-size:11.5px" title="' + tip + ' — necesită o parcelă selectată">' + (S.ico || '📘') + ' ' + label + '</button>' +
          '<button onclick="infoDrawerOpen(\'sps:' + id + '\')" title="Info" style="background:rgba(255,255,255,.05);border:1px solid rgba(217,119,6,.2);color:#fbbf24;border-radius:4px;padding:2px 6px;cursor:pointer;font-size:10px;flex-shrink:0">ⓘ</button>' +
          '</div>';
      }).join('');
    } catch (e) {}
  }

  // ── Conținut FOCALIZAT pe parcelă, per temă (DISTINCT de versiunea teritorială) ──
  var PARCEL_FOCUS = {
    sfu: { rel: 'Fezabilitatea urbană la nivel de amplasament evaluează dacă o intervenție pe ACEASTĂ parcelă este realizabilă tehnic, conformă cu regimul PUG și viabilă — punctual, nu la scara orașului.',
      diag: ['Conformitatea funcțiunii propuse cu zona (UTR/subzonă) și indicatorii POT/CUT aplicabili.', 'Capacitatea de edificare reală (amprentă/ADC) raportată la suprafața parcelei.', 'Constrângeri de amplasament: accese, vecinătăți, servituți, retrageri.', 'Disponibilitatea utilităților la limita parcelei.'],
      rec: ['Stabilirea variantei optime de intervenție pentru parcelă (reabilitare / mixt / reconfigurare).', 'Pre-dimensionarea pe edificabilul real, nu pe maxime teoretice.', 'Pentru devizul HG 907 și scenariile financiare ROI — vezi livrabilul SF/DALI (dedicat parcelei).'] },
    sct: { rel: 'Capacitatea de transport raportată la amplasament privește accesul parcelei la rețea și impactul punctual al traficului generat — nu modelul de trafic al întregului oraș.',
      diag: ['Ierarhia și capacitatea străzilor adiacente parcelei (acces).', 'Nivelul de serviciu (LOS) la intersecțiile din proximitate.', 'Accesul la transport public în rază de mers pe jos.', 'Numărul de deplasări generate de o dezvoltare pe parcelă.'],
      rec: ['Dimensionarea acceselor și a parcării la cererea generată de parcelă.', 'Soluții de atenuare locală (sens, marcaje) dacă LOS-ul scade.', 'Pentru studiul de trafic complet la nivel UAT — vezi PMUD / SCT teritorial.'] },
    sim: { rel: 'Impactul asupra mobilității evaluează efectele unei dezvoltări CONCRETE pe parcelă asupra rețelei imediate (trafic generat, distribuție modală, parcare).',
      diag: ['Trip generation estimat pentru funcțiunea și mărimea propusă pe parcelă.', 'Distribuția pe moduri (auto/TP/activ) în zona amplasamentului.', 'Presiunea pe parcare și pe accesele din vecinătate.', 'Conexiunile pietonale/velo de la parcelă la dotări.'],
      rec: ['Plan de management al mobilității pentru dezvoltarea de pe parcelă.', 'Asigurarea locurilor de parcare conform normativului local.', 'Conectarea la rețeaua de transport public și piste.'] },
    scsp: { rel: 'Calitatea spațiului public se evaluează pentru spațiile DIN și DIN JURUL parcelei — fronturi, accese pietonale, vegetație, confort — la scara amplasamentului.',
      diag: ['Calitatea frontului stradal și a accesului pietonal la parcelă.', 'Vegetația și umbrirea în proximitate (regula 3-30-300).', 'Confortul și siguranța spațiului public adiacent.', 'Mobilierul urban și iluminatul din zonă.'],
      rec: ['Activarea parterului și a frontului către spațiul public.', 'Plantare de aliniament și spații verzi de proximitate.', 'Continuitate pietonală sigură de la parcelă la dotări.'] },
    srgu: { rel: 'Regenerarea rezidențială la nivel de amplasament privește potențialul de reabilitare/reconfigurare al ACESTEI parcele și al ansamblului imediat — nu strategia de regenerare a orașului.',
      diag: ['Starea fondului construit pe și lângă parcelă (vechime, uzură).', 'Eficiența energetică și potențialul de reabilitare.', 'Spațiile publice, dotările și parcarea aferente ansamblului.', 'Oportunitatea de densificare calitativă pe parcelă.'],
      rec: ['Pachet de reabilitare/regenerare adaptat parcelei.', 'Eficientizare energetică (anvelopă, termoficare).', 'Pentru programul de regenerare la scara cartierului/UAT — vezi versiunea teritorială.'] },
    srm: { rel: 'Riscul multihazard la nivel de amplasament evaluează expunerea ACESTEI parcele la hazarduri (seismic, inundații, alunecări) — punctual, pentru fundamentarea măsurilor pe sit.',
      diag: ['Expunerea seismică a amplasamentului (zona ag, P100).', 'Riscul de inundație/băltire pe parcelă (relief, ape).', 'Stabilitatea terenului (alunecări) în zona parcelei.', 'Vulnerabilitatea construcțiilor existente pe parcelă.'],
      rec: ['Măsuri de reducere a riscului adaptate sitului (fundare, drenaj).', 'Verificarea încadrării în hărțile de hazard oficiale.', 'Pentru evaluarea multihazard la scara UAT — vezi versiunea teritorială.'] },
    siva: { rel: 'Infrastructura verde-albastră la nivel de amplasament privește vegetația, permeabilitatea și managementul apei pluviale PE parcelă și conectarea la rețeaua ecologică din jur.',
      diag: ['Gradul de permeabilitate și suprafața verde pe parcelă.', 'Managementul apei pluviale (retenție, infiltrare) pe sit.', 'Conectarea la coridoarele verzi/albastre din proximitate.', 'Vegetația existentă și canopy-ul pe și lângă parcelă.'],
      rec: ['Soluții bazate pe natură pe parcelă (acoperiș verde, pavaj permeabil, grădini de ploaie).', 'Atingerea pragului de spațiu verde și permeabilitate.', 'Conectarea la rețeaua verde-albastră a zonei.'] },
    seu: { rel: 'Energia urbană la nivel de amplasament privește performanța energetică a construcției de pe parcelă și potențialul regenerabil al sitului — nu mixul energetic al orașului.',
      diag: ['Performanța energetică (nZEB) a construcției propuse/existente.', 'Potențialul solar al parcelei (orientare, umbrire).', 'Racordarea la termoficare/rețele energetice.', 'Consumul estimat și măsurile de eficiență.'],
      rec: ['Soluții nZEB + regenerabil (fotovoltaic) pe parcelă.', 'Eficientizarea anvelopei și a instalațiilor.', 'Pentru strategia energetică la scara UAT — vezi versiunea teritorială.'] },
    sppc: { rel: 'Patrimoniul construit și peisajul la nivel de amplasament evaluează valoarea patrimonială a construcțiilor de pe parcelă și constrângerile dacă parcela e în/lângă o zonă protejată.',
      diag: ['Statutul de monument/zonă protejată al parcelei sau al vecinătăților (LMI).', 'Zonele de protecție și servituțile aplicabile.', 'Valoarea peisajeră și de ansamblu a frontului.', 'Avizele de specialitate necesare (DJC/MCIN).'],
      rec: ['Intervenții compatibile cu valoarea patrimonială și cu zona de protecție.', 'Obținerea avizelor de specialitate înainte de proiectare.', 'Pentru inventarul de patrimoniu la scara UAT — vezi versiunea teritorială.'] }
  };
  function _renderParcelFocus(D, id, S, PC, CW) {
    var F = PARCEL_FOCUS[id];
    D.chapter('Analiză focalizată pe amplasament — ' + (S.t.replace(/^STUDIU DE\s+|^STUDIU\s+/i, '').replace(/\s*\([^)]*\)\s*$/, '')));
    D.P('Această secțiune aplică tema studiului PUNCTUAL pe parcela selectată' + (PC && PC.nrcad ? ' (' + PC.nrcad + ')' : '') + ', NU la scara întregului UAT. Versiunea teritorială completă (diagnoză + strategie pe oraș) se generează din meniul Teritoriu — sunt documente diferite, cu scop diferit.');
    if (!F) { D.P('Analiza pe amplasament pentru această temă se fundamentează pe regimul urbanistic al parcelei și pe contextul imediat (vezi secțiunea „Amplasamentul analizat").'); return; }
    D.h2 && D.h2('Relevanța temei pentru amplasament');
    D.P(F.rel);
    D.h2 && D.h2('Diagnoza amplasamentului');
    D.bullets && D.bullets(F.diag.map(function (x) { return ['•', x]; }));
    D.h2 && D.h2('Recomandări pentru parcelă');
    D.bullets && D.bullets(F.rec.map(function (x) { return ['→', x]; }));
    if (PC && PC.zone) {
      D.h2 && D.h2('Parametri de referință ai amplasamentului');
      D.P('Indicatorii urbanistici aplicabili (POT ' + (PC.zone.pot != null ? PC.zone.pot + '%' : '—') + ' / CUT ' + (PC.zone.cut != null ? PC.zone.cut : '—') + ', H max ' + (PC.zone.hmax != null ? PC.zone.hmax + ' m' : '—') + ') fundamentează recomandările de mai sus și se confirmă cu Certificatul de Urbanism.');
    }
  }

  G._SPS = { generate: generate, STUDIES: STUDIES, renderParcelMenu: renderParcelMenu };
  window._SPS = G._SPS;
  try { if (document.readyState !== 'loading') renderParcelMenu(); else document.addEventListener('DOMContentLoaded', renderParcelMenu); } catch (e) {}
  console.log('[SPS] ✅ Strategic Planning Suite — ' + Object.keys(STUDIES).length + ' studii (window._SPS.generate)');
})(window);
