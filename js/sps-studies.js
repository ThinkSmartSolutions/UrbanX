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
    'sfu': { parcel:1, t: 'STUDIU DE FEZABILITATE URBANĂ (SFU)', ico: '📐', ac: [180, 83, 9], badge: 'SPECIALIZAT', legal: 'HG 907/2016 · Legea 350/2001 · POR/PNRR', surse: 'ANCPI · OSM · INS · costuri de referință', ce: 'Studiu de fezabilitate pentru o intervenție urbană: analiza opțiunilor, fezabilitate tehnică și financiară, cost-beneficiu, riscuri și recomandarea variantei optime.' },
    'sct': { parcel:1, t: 'STUDIU DE CAPACITATE DE TRANSPORT (SCT)', ico: '🚦', ac: [37, 99, 235], badge: 'SPECIALIZAT', legal: 'Legea 350/2001 · normative trafic · PMUD', surse: 'OSM rețea · GTFS · recensământ trafic', ce: 'Analiza capacității rețelei de transport: niveluri de serviciu, congestie, capacitate intersecții, transport public și impactul unei dezvoltări asupra traficului.' },
    'sim': { parcel:1, t: 'STUDIU DE IMPACT ASUPRA MOBILITĂȚII (SIM)', ico: '🚗', ac: [29, 78, 216], badge: 'SPECIALIZAT', legal: 'Legea 350/2001 · Ghid PMUD · normative trafic', surse: 'OSM · GTFS · trip generation', ce: 'Evaluarea impactului unei dezvoltări asupra mobilității: trafic generat, distribuție modală, efecte asupra rețelei și măsuri de atenuare (transport public, parcare, acces).' },
    'scsp': { parcel:1, t: 'STUDIU DE CALITATE A SPAȚIULUI PUBLIC (SCSP)', ico: '🏛️', ac: [13, 148, 136], badge: 'SPECIALIZAT', legal: 'Legea 350/2001 · standarde spațiu public · 3-30-300', surse: 'OSM · Copernicus · observații teren', ce: 'Evaluarea calității spațiilor publice: accesibilitate, confort, vitalitate, vegetație (regula 3-30-300), siguranță, mobilier urban și recomandări de ameliorare.' },
    'srgu': { parcel:1, t: 'STUDIU DE REGENERARE URBANĂ REZIDENȚIALĂ (SRgU)', ico: '🏢', ac: [217, 70, 39], badge: 'SPECIALIZAT', legal: 'Legea 350/2001 · POR Axa 5 · Legea 152/1998', surse: 'INS · OSM · fond locativ · termoficare', ce: 'Strategia de regenerare a ansamblurilor rezidențiale: starea fondului, eficiență energetică, spații publice, dotări, mobilitate și instrumente de finanțare a regenerării.' },
    'atlas': { t: 'ATLAS URBAN — MONOGRAFIE TERITORIALĂ', ico: '🗺️', ac: [71, 85, 105], badge: 'SPECIALIZAT', legal: 'metodologie monografică · INS · Legea 350/2001', surse: 'INS · OSM · Copernicus · arhive', ce: 'Monografia teritorială completă a UAT: cadru natural, evoluție istorică, demografie, economie, locuire, infrastructură, mediu și patrimoniu — referința documentară a localității.' },
    'srm': { parcel:1, t: 'STUDIU DE RISC MULTIHAZARD (SRM)', ico: '⚠️', ac: [220, 38, 38], badge: 'SPECIALIZAT', legal: 'Legea 575/2001 · P100-1/2022 · Dir. 2007/60/CE · HG 447/2003', surse: 'INFP · ANAR/INHGA · Copernicus · EEA', ce: 'Evaluarea integrată a hazardurilor: seismic, inundații, alunecări, secetă, caniculă și incendii — expunere, vulnerabilitate, scenarii de risc și măsuri de reducere.' },
    'sda': { t: 'STUDIU DE DEMOGRAFIE APROFUNDATĂ (SDA)', ico: '👥', ac: [147, 51, 234], badge: 'SPECIALIZAT', legal: 'metodologie INS · Eurostat · Strategia demografică', surse: 'INS Recensământ 2021 · Eurostat · TEMPO', ce: 'Analiza demografică detaliată: structură pe vârste și gen, migrație, natalitate/mortalitate, îmbătrânire, gospodării și proiecții ale populației pe orizont 2040.' },
    'scpt': { t: 'STUDIU DE COMPETITIVITATE TERITORIALĂ (SCpT)', ico: '📈', ac: [13, 110, 80], badge: 'SPECIALIZAT', legal: 'Strategia Națională · RIS3 · politica de coeziune UE', surse: 'INS · Eurostat · ONRC · RIS3', ce: 'Evaluarea competitivității teritoriului: capital uman, mediu de afaceri, inovare, specializare inteligentă, atractivitate investițională și poziționare regională.' },
    'siva': { parcel:1, t: 'STUDIU DE INFRASTRUCTURĂ VERDE ȘI ALBASTRĂ (SIVA)', ico: '💧', ac: [16, 185, 129], badge: 'SPECIALIZAT', legal: 'Strategia UE biodiversitate 2030 · OUG 195/2005 · 3-30-300', surse: 'Copernicus · EEA · OSM · ANAR', ce: 'Strategia rețelei verzi-albastre: parcuri și coridoare ecologice, ape de suprafață, managementul pluvial, conectivitate ecologică și servicii ecosistemice urbane.' },
    'seu': { parcel:1, t: 'STUDIU DE ENERGIE URBANĂ (SEU)', ico: '⚡', ac: [234, 88, 12], badge: 'SPECIALIZAT', legal: 'Dir. 2018/2001 (RED II) · SECAP · Legea 121/2014 (eficiență)', surse: 'Open-Meteo · INS · PNRR · operatori energie', ce: 'Strategia energetică locală: consum și mix energetic, eficiența clădirilor, potențial regenerabil (solar/geotermal/biomasă), comunități de energie și decarbonare.' },
    'sppc': { parcel:1, t: 'STUDIU DE PATRIMONIU CONSTRUIT ȘI PEISAJ (SPPC)', ico: '🏰', ac: [161, 98, 7], badge: 'SPECIALIZAT', legal: 'Legea 422/2001 · Convenția de la Florența (peisaj) · OG 43/2000', surse: 'LMI/INP · RAN · OSM · Copernicus', ce: 'Evaluarea patrimoniului construit și a peisajului cultural: monumente LMI, zone protejate, peisaj urban și natural, vulnerabilități și măsuri de protejare și valorificare.' }
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
    G.ss && G.ss(S.ico + ' Generez ' + S.t + (onParcel ? ' — parcelă' : '') + '…');
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

    // ── Corp dezvoltat (rang superior 80-100 pag) ──
    try {
      var deep = (G._SPS_DEEP && G._SPS_DEEP[id]) || [];
      if (deep.length && G._deepRender) G._deepRender(D, deep, CW);
      else { D.chapter('Conținut dezvoltat'); D.P('Corpul dezvoltat al acestui studiu (capitole detaliate pe toate dimensiunile) este în curs de integrare. Structura, copertă, sursele și Nota UrbanX sunt complete; capitolele aprofundate se adaugă progresiv la standardul de 80-100 pagini.'); }
    } catch (e) {}

    // ── Nota UrbanX (IVU) ──
    try { if (G.UrbanXIVU && G.UrbanXIVU.renderSection) G.UrbanXIVU.renderSection(D, cityKey); } catch (e) {}

    D.chapter('Concluzii');
    D.P('Studiul oferă o bază de fundamentare pentru deciziile de planificare în domeniul abordat. Recomandările trebuie integrate în documentele strategice ale UAT (SIDU, PUG, planuri sectoriale) și corelate cu sursele de finanțare disponibile (POR, PNRR, buget local).');
    D.chapter('Surse și standarde');
    D.P('Cadru legal: ' + S.legal + '. Surse de date: ' + S.surse + '. Metodologie UrbanX · ThinkSmart Solutions. Document strategic orientativ — nu substituie documentațiile oficiale avizate.');
    D.chapter('Limitări și disclaimer');
    D.P('Document generat algoritmic de UrbanX ca instrument de pre-analiză și fundamentare strategică. Valorile sunt estimări calibrate pe date reale și NU substituie documentațiile de specialitate avizate conform legii. Deciziile finale rămân responsabilitatea autorității și a specialiștilor atestați.');

    var translit = function (c) { return { 'ă': 'a', 'Ă': 'A', 'â': 'a', 'Â': 'A', 'î': 'i', 'Î': 'I', 'ș': 's', 'Ș': 'S', 'ş': 's', 'Ş': 'S', 'ț': 't', 'Ț': 'T', 'ţ': 't', 'Ţ': 'T' }[c] || c; };
    var fn = ('Studiu_SPS_' + id + '_' + (onParcel ? 'parcela_' : '') + cityName.replace(/[ăĂâÂîÎșȘşŞțȚţŢ]/g, translit).replace(/[^\w]+/g, '_') + '_' + new Date().toISOString().slice(0, 10) + '.pdf').replace(/[ăĂâÂîÎșȘşŞțȚţŢ]/g, translit).replace(/[^a-zA-Z0-9._-]/g, '_');
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
          '<button onclick="window._SPS&&window._SPS.generate(\'' + id + '\',window.TCI&&window.TCI.cityKey);window.toggleRapoarteMenu&&toggleRapoarteMenu()" style="flex:1;text-align:left;background:none;border:none;color:#fbbf24;padding:4px 8px;cursor:pointer;border-radius:5px;font-size:11.5px" title="' + tip + '">' + (S.ico || '📘') + ' ' + label + '</button>' +
          '<button onclick="infoDrawerOpen(\'sps:' + id + '\')" title="Info" style="background:rgba(255,255,255,.05);border:1px solid rgba(217,119,6,.2);color:#fbbf24;border-radius:4px;padding:2px 6px;cursor:pointer;font-size:10px;flex-shrink:0">ⓘ</button>' +
          '</div>';
      }).join('');
    } catch (e) {}
  }

  G._SPS = { generate: generate, STUDIES: STUDIES, renderParcelMenu: renderParcelMenu };
  window._SPS = G._SPS;
  try { if (document.readyState !== 'loading') renderParcelMenu(); else document.addEventListener('DOMContentLoaded', renderParcelMenu); } catch (e) {}
  console.log('[SPS] ✅ Strategic Planning Suite — ' + Object.keys(STUDIES).length + ' studii (window._SPS.generate)');
})(window);
