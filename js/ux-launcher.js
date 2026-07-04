/* ============================================================================
 * UrbanX — Launcher / Paletă de comenzi unificată (window.Launcher).
 * UN SINGUR loc de unde accesezi ORICE funcție a platformei — căutabil, grupat
 * logic, cu navigare la tastatură. Rezolvă „nu mai știu de unde accesez funcțiile"
 * și fluxul incoerent (deschizi un meniu, comandă, ieși, alt meniu...).
 * Deschidere: Cmd/Ctrl+K · buton flotant „⌘ Funcții" · _closeAllMenusAndOverlay nu-l atinge.
 * Nu dublează logica modulelor — doar le apelează (window.X / funcții globale).
 * ========================================================================== */
(function (G) {
  'use strict';
  var D = document;
  function has(fn) { return typeof G[fn] === 'function'; }
  function call(fn) { return function () { try { if (has(fn)) G[fn](); else if (G.ss) G.ss(fn + ' se inițializează…'); } catch (e) { console.warn('[Launcher]', fn, e); } }; }
  function mod(obj, method) { return function () { try { if (G[obj] && typeof G[obj][method] === 'function') G[obj][method](); else if (G.ss) G.ss(obj + ' se inițializează…'); } catch (e) { console.warn('[Launcher]', obj, e); } }; }

  // ─── REGISTRU UNIC DE FUNCȚII (grupat logic, după flux de lucru) ───
  var G1 = '🧭 Start & Explorare', G2 = '🏛 Strategie & Documente', G3 = '📐 Proiectare & Cadastru',
    G4 = '🌿 Mediu & Climă', G5 = '🏛 Administrație publică', G6 = '💰 Investitor & Dezvoltator',
    G7 = '🚦 Mobilitate', G8 = '📊 Date & UAT', G9 = '📑 Studii & Avize (PDF)', G0 = '🎬 Prezentare',
    GR = '⚠️ Riscuri & Protecție civilă';
  var A = [
    // Start
    { g: G1, ico: '🧭', l: 'Fișa parcelei 360°', d: 'toate analizele unei parcele într-un loc', k: 'fisa 360 hub parcela', run: mod('Fisa360', 'open'), info: 'fisa360' },
    { g: G1, ico: '🧪', l: 'SimLab — explorare pre-proiectare', d: 'comparare scenarii pre-proiectare', k: 'simlab simulator uhi trafic capacitate', run: mod('SimLab', 'openDashboard'), info: 'simlab' },
    { g: G1, ico: '📐', l: 'Zonă de studiu (fără nr. cadastral)', d: 'desen / buffer râu / OSM / adresă+rază', k: 'study zone studiu bahlui', run: mod('StudyZone', 'openBuilder'), info: 'studyzone' },
    { g: G1, ico: '🔍', l: 'Caută parcelă (CF / adresă / GPS)', d: 'localizează o parcelă pe hartă', k: 'cauta search parcela cf adresa', run: function () { var t = D.querySelector('.ptab[data-t="search"]'); if (t) t.click(); } },
    // Strategie & Documente
    { g: G2, ico: '🇷🇴', l: 'REGIONALIZAREA ROMÂNIEI — simulator + studiu', d: 'STI · hartă scenarii S1-S5 · mandate · studiu complet', k: 'regionalizare sti simulator regiuni provincii mandate harta', run: function () { if (G._STIRegio && G._STIRegio.openPanel) G._STIRegio.openPanel(); } },
    { g: G2, ico: '📜', l: 'SIDU — Document strategic (PDF)', d: 'documentul-umbrelă (peste MP+PMUD)', k: 'sidu strategie document constitutie', run: function () { if (G.SIDU && G.SIDU.generateDocument) G.SIDU.generateDocument(G.TCI && G.TCI.cityKey); }, info: 'sidu' },
    { g: G2, ico: '🏛', l: 'SIDU — registru & coerență', d: 'portofoliu proiecte + verificare → PUG', k: 'sidu registru coerenta proiecte', run: mod('SIDU', 'openPanel'), info: 'sidu' },
    { g: G2, ico: '📋', l: 'Masterplan strategic (PDF)', d: 'document 100+ pagini · Legea 350/2001', k: 'masterplan pdf strategic', run: call('generateMasterplan') },
    { g: G2, ico: '🚍', l: 'PMUD — Plan Mobilitate Urbană (PDF)', d: 'document strategic · 8 componente SUMP', k: 'pmud sump mobilitate document', run: call('generatePMUD') },
    { g: G2, ico: '📋', l: 'Portofoliu Strategic 2025-2055', d: '6 axe · costuri · fazare · FEDR+PNRR', k: 'portofoliu strategic axe', run: call('generatePortfolio') },
    { g: G2, ico: '🗺', l: 'Coridoare Dezvoltare Spațială', d: 'TOD · verde · economic pe hartă', k: 'coridoare dezvoltare tod', run: function () { var k = (G.TCI && G.TCI.cityKey) || 'RO-IS-01', m = G.map || G._map; if (m && G._CorridorsLayer && G._DataEngine) G._DataEngine.fetchCityData(k).then(function (ld) { var c = G._CorridorsLayer.generateCorridors(k, null, ld) || []; G._CorridorsLayer.showOnMap(m, k, c); }); } },
    { g: G2, ico: '📐', l: 'Import PUG digital', d: 'GeoJSON · KML · corelare UrbanX', k: 'import pug geojson kml', run: call('openPUGImport') },
    { g: G2, ico: '🤖', l: 'AI Memoriu Justificativ', d: 'text juridic automat §1.1-§1.6', k: 'ai memoriu narrative', run: function () { var k = (G.TCI && G.TCI.cityKey) || 'RO-IS-01'; G._AIUrbanNarrative && G._AIUrbanNarrative.open(k); } },
    { g: G2, ico: '📊', l: 'Export PowerPoint (.pptx)', d: '10 slide-uri · ședință Consiliu', k: 'pptx powerpoint prezentare', run: call('generatePPTX') },
    // Proiectare & Cadastru
    { g: G3, ico: '🏘️', l: 'Masterplan ansamblu (lotizare ghidată)', d: 'program→accese→ierarhie→loturi · metodologie', k: 'ansamblu lotizare ghidata puz', run: mod('Ansamblu', 'openWizard'), info: 'ansamblu' },
    { g: G3, ico: '🏘', l: 'Plan de lotizare (generare loturi)', d: 'generează loturi + drumuri + 3D', k: 'lotizare loturi generare plan', run: call('toggleLotizare'), info: 'lotizare' },
    { g: G3, ico: '📐', l: 'Fișă cadastrală (lotizare/comasare/dezmembrare)', d: 'plan amplasament + Stereo70 · ANCPI', k: 'cadastru fisa stereo70 dezmembrare comasare', run: mod('Cadastru', 'openPanel'), info: 'cadastru' },
    { g: G3, ico: '📐', l: 'Planșe & Proiect preliminar PAC', d: 'relevee + planșe arhitecturale', k: 'planse relevee pac', run: call('generateRelevee'), info: 'relevee' },
    { g: G3, ico: '🏗', l: 'Memoriu tehnic avize', d: 'memoriu pentru avize', k: 'memoriu tehnic', run: call('generateMemoriu'), info: 'memoriu' },
    { g: G3, ico: '🌱', l: 'Studiu Pedologic & Agrochimic', d: 'sol agricol · clase I-V · taxă scoatere Ord.83/2018 · relief live', k: 'pedologie sol agricol bonitare clase calitate taxa scoatere circuit agricol ospa', run: call('generatePedologie'), info: 'pedologie' },
    { g: G3, ico: '🌲', l: 'Studiu Regim Silvic', d: 'fond forestier · categorii I-V · taxă HG861/2009 · păduri OSM+Natura2000 live', k: 'silvic padure fond forestier codul silvic scoatere reimpadurire natura 2000 romsilva garda forestiera', run: call('generateSilvic'), info: 'silvic' },
    { g: G3, ico: '🏭', l: 'Proiectează hală industrială (3D + planșe)', d: 'volum 3D în AEDIS + planșe + AI render · dimensionare NP008/P118', k: 'hala industriala depozit proiectare 3d aedis planse dimensionare structura acoperis compartiment incendiu pod rulant', run: call('proiecteazaHala'), info: 'hale' },
    { g: G3, ico: '📋', l: 'Fișă urbanism per parcelă', d: 'PDF A4 · POT/CUT/RH · printabil', k: 'fisa urbanism parcela', run: call('generateParcelFisa') },
    // Mediu & Climă
    { g: G4, ico: '🌿', l: 'LOISIR — spații verzi & plămân urban', d: 'catalog L.24/2007 · parc 3D · concurs · climă', k: 'loisir spatii verzi parc uhi clima', run: mod('Loisir', 'openPanel'), info: 'loisir' },
    { g: G4, ico: '🟧', l: 'Superbloc (model Barcelona)', d: 'tranzit perimetru · interior verde · înainte/după', k: 'superbloc barcelona rueda', run: mod('Superbloc', 'openPanel'), info: 'superbloc' },
    // Riscuri & Protecție civilă
    { g: GR, ico: '🌐', l: 'Simulare cutremur (scenariu Vrancea)', d: 'mag. 5–8 · intensitate EMS-98 · PGA · avarieri · pe hartă', k: 'cutremur seismic vrancea magnitudine p100 risc', run: mod('RiskSeismic', 'openPanel') },
    { g: GR, ico: '🌊', l: 'Predicție inundație urbană (pluvială)', d: 'ploaie extremă · băltire pe relief real · Q=C·i·A · pe hartă', k: 'inundatie flood ploaie precipitatii anar pluvial relief', run: mod('RiskFlood', 'openPanel') },
    { g: GR, ico: '🔌', l: 'Rețele edilitare pe hartă (on/off)', d: 'electric · gaze · apă · CF · ape — subteran/suprateran (OSM)', k: 'retele edilitare subteran suprateran electric gaze apa cau utilitati', run: mod('CAU', 'showNetworksPanel') },
    { g: GR, ico: '⚡', l: 'Utilități naționale (SEN live + transport)', d: 'energie LIVE Transelectrica · rețele 400/220/110kV + gaz SNT pe hartă (OSM)', k: 'utilitati nationale sen transelectrica transgaz ret snt energie electric gaz live transport', run: mod('UtilitatiRO', 'openPanel'), info: 'utilitati-nationale' },
    { g: GR, ico: '🌲', l: 'Fond forestier pe hartă (on/off)', d: 'păduri OSM + bandă protecție 20m — parcela/centru hartă', k: 'padure fond forestier silvic harta banda protectie osm', run: function () { try { window.silvic_drawForest && window.silvic_drawForest(window.map); } catch (e) {} } },
    { g: GR, ico: '🛡', l: 'Inventar adăposturi ALA (on/off)', d: 'candidați NP-073 · capacitate · pe hartă (de verificat ISU)', k: 'ala adapost protectie civila bunker subsol isu inventar', run: mod('RiskShelters', 'toggle') },
    // Administrație
    { g: G5, ico: '🏗️', l: 'Capacitate & Conformitate UAT', d: 'apă·școli·verde vs ce s-a aprobat', k: 'capacitate intelligence uxi conformitate', run: mod('UXI', 'openDashboard'), info: 'ux_capacitate' },
    { g: G5, ico: '📋', l: 'CAU — Acorduri Unice (CU + avize)', d: 'cerere→CU→avize→Acord Unic · 9 reguli', k: 'cau acord unic aviz certificat urbanism', run: mod('CAU', 'openPanel'), info: 'cau' },
    { g: G5, ico: '💳', l: 'Plăți taxe urbanistice (CU/AC/PUZ)', d: 'calcul taxă + plată + chitanță', k: 'plati taxe ac cu puz chitanta', run: mod('Plati', 'openPanel'), info: 'plati' },
    { g: G5, ico: '📁', l: 'Dosar digital al imobilului', d: 'cadastru·PUG·autorizații·scor', k: 'dosar digital imobil', run: mod('Dosar', 'open'), info: 'dosar' },
    { g: G5, ico: '📣', l: 'Sesizare urbană (raportează)', d: 'construire ilegală · degradare · etc', k: 'sesizare cetatean raportare', run: mod('Sesizari', 'openForm'), info: 'sesizari' },
    { g: G5, ico: '📍', l: 'Hartă sesizări (pe/off)', d: 'afișează sesizările pe hartă', k: 'sesizari harta map', run: mod('Sesizari', 'toggleMap') },
    { g: G5, ico: '🔔', l: 'Notificarea vecinilor afectați', d: 'identifică afectații dintr-o zonă', k: 'notificari vecini afectati', run: mod('Notificari', 'openPanel'), info: 'notificari' },
    { g: G5, ico: '🏛', l: 'Inventar patrimoniu (GIS)', d: 'monumente & zone protejate · aviz Cultură', k: 'patrimoniu heritage monumente lmi', run: mod('Heritage', 'openPanel'), info: 'heritage' },
    { g: G5, ico: '⚖️', l: 'Matrice avize necesare', d: 'listă avize automată (variantă rapidă)', k: 'matrice avize', run: call('showAvize') },
    { g: G5, ico: '💬', l: 'Participare publică', d: 'comentarii pe hartă · model Helsinki', k: 'participare publica comentarii', run: function () { G._PublicParticipation && G._PublicParticipation.toggle(); } },
    // Investitor
    { g: G6, ico: '📈', l: 'Market Intelligence (prețuri €/mp)', d: 'mediană · trend 3/12 luni · comparare UAT', k: 'market piata pret imobiliar', run: mod('Market', 'openPanel'), info: 'market' },
    { g: G6, ico: '💰', l: 'Pro-formă investițional (fezabilitate)', d: 'venituri·costuri·profit·ROI·IRR', k: 'feaz proforma fezabilitate roi', run: mod('Feaz', 'openPanel'), info: 'feaz' },
    { g: G6, ico: '📊', l: 'Investment Score (oportunitate)', d: 'scor compus 0-100 per parcelă', k: 'investment scor oportunitate', run: mod('Invest', 'openPanel'), info: 'invest' },
    { g: G6, ico: '🗂', l: 'Portfolio Due Diligence', d: 'evaluare portofoliu de parcele', k: 'portfolio due diligence dd', run: mod('Portfolio', 'openPanel'), info: 'portfolio' },
    { g: G6, ico: '📈', l: 'Land Value Capture', d: 'plusvaloare + contribuție de negociat', k: 'lvc land value capture plusvaloare', run: mod('LVC', 'openPanel'), info: 'lvc' },
    { g: G6, ico: '🌍', l: 'Carbon Tracker (CO2 · ESG)', d: 'carbon încorporat + operațional', k: 'carbon co2 esg taxonomy', run: mod('Carbon', 'openPanel'), info: 'carbon' },
    // Mobilitate
    { g: G7, ico: '🚦', l: 'Flux — studiu de trafic (calculator)', d: 'generare trafic + LOS + comparare scenarii', k: 'flux trafic studiu los four step', run: mod('Flux', 'openStudiu'), info: 'flux_trafic' },
    { g: G7, ico: '🚦', l: 'Studiu impact trafic (PDF)', d: 'document formal NP 068', k: 'studiu trafic pdf impact', run: call('generateTrafficStudy'), info: 'trafic' },
    { g: G7, ico: '🚗', l: 'Studiu mobilitate & parcaje (PDF)', d: 'mobilitate + necesar parcaje', k: 'studiu mobilitate parcaje', run: call('generateMobilityStudy'), info: 'mobilitate' },
    // Date & UAT
    { g: G8, ico: '📊', l: 'Dashboard UAT Live', d: 'INSE · Eurostat · OSM · GHSL', k: 'dashboard uat live date', run: function () { var k = (G.TCI && G.TCI.cityKey) || localStorage.getItem('ux_last_city') || 'RO-IS-01'; G._launchUATDashboard && G._launchUATDashboard(k); } },
    { g: G8, ico: '🛰', l: 'GHSL — suprafață construită 1975-2055', d: 'Copernicus · slider temporal', k: 'ghsl copernicus suprafata construita', run: function () { var m = G.map || G._map, k = (G.TCI && G.TCI.cityKey) || 'RO-IS-01'; if (m && G._GHSLLayer) { G._GHSLLayer.init(m, k); G._GHSLLayer.toggle(m); } } },
    { g: G8, ico: '📈', l: 'Proiecție urbanistică 10/20/30 ani', d: 'predicție demografică + spațială', k: 'proiectie urbanistica predictie', run: call('generateProiectieUrbanistica') },
    // Prezentare
    { g: G0, ico: '🎬', l: 'Film cinematic (prezentare animată)', d: '25 scene · 6.2 min', k: 'film cinematic prezentare animatie', run: function () { G._switchToCinemaV2 && G._switchToCinemaV2(); setTimeout(function () { G._launchCinemaV2 && G._launchCinemaV2(); }, 100); } },
    { g: G0, ico: '📊', l: 'TCI Clasic (panou interactiv)', d: 'KPI · slider · scenarii', k: 'tci clasic kpi slider', run: call('_switchToTCIClassic') },
    // Studii & Avize (PDF)
    { g: G9, ico: '🗺', l: 'Studiu de amplasament & context teritorial', k: 'amplasament context teritorial', run: call('generateStudiuAmplasament'), info: 'amplasament' },
    { g: G9, ico: '☀', l: 'Studiu de însorire', k: 'insorire solar', run: call('generateSolarStudy'), info: 'insorire' },
    { g: G9, ico: '🌑', l: 'Studiu umbre & obstrucție', k: 'umbre shadow obstructie', run: call('generateShadowStudy'), info: 'umbre' },
    { g: G9, ico: '🔥', l: 'Studiu siguranță foc (ISU)', k: 'isu foc incendiu ssf', run: call('generateSSF'), info: 'isu' },
    { g: G9, ico: '🪨', l: 'Pre-studiu geotehnic', k: 'geotehnic foraje', run: call('generateGeotehnicalStudy'), info: 'geotehnic' },
    { g: G9, ico: '✈', l: 'Studiu AACR (aviz aeroport)', k: 'aacr aeroport romatsa', run: call('generateAACR'), info: 'aacr' },
    { g: G9, ico: '🌿', l: 'Studiu impact mediu (EIM)', k: 'mediu eim environmental', run: call('generateEnvironmentalImpact'), info: 'eim' },
    { g: G9, ico: '💧', l: 'Studiu gospodărire ape (DTGA)', k: 'ape apa dtga water', run: call('generateWaterStudy'), info: 'apa' },
    { g: G9, ico: '🌳', l: 'Studiu spații verzi', k: 'spatii verzi green', run: call('generateGreenStudy'), info: 'verde' },
    { g: G9, ico: '🔇', l: 'Studiu acustic urban', k: 'acustic noise zgomot', run: call('generateNoiseStudy'), info: 'acustic' },
    { g: G9, ico: '🌬', l: 'Studiu vânt & confort pietonal', k: 'vant wind confort', run: call('generateWindStudy'), info: 'vant' },
    { g: G9, ico: '📊', l: 'Studiu densitate urbană', k: 'densitate density', run: call('generateDensityStudy'), info: 'densitate' },
    { g: G9, ico: '🏚', l: 'Studiu construcții existente', k: 'constructii existente', run: call('generateExistingBldStudy'), info: 'existente' },
    { g: G9, ico: '💶', l: 'Studiu fezabilitate / DALI', k: 'fezabilitate dali sf hg907', run: call('generateStudiuFezabilitate') },
    { g: G9, ico: '⚡', l: 'Certificat performanță energetică (CPE)', k: 'cpe energetic energie', run: call('generateCPE') },
    { g: G9, ico: '🏥', l: 'Studiu impact sănătate publică', k: 'sanatate health impact', run: call('generateHealthImpactStudy') },
    { g: G9, ico: '🏛', l: 'Studiu patrimoniu & istoric', k: 'patrimoniu istoric heritage', run: call('generateIstoricStudy'), info: 'patrimoniu' },
    { g: G9, ico: '📄', l: 'Raport urbanistic complet', k: 'raport complet export', run: call('runExport'), info: 'raport_complet' }
  ];
  // doar acțiuni cu funcție disponibilă (filtrăm la deschidere ca să nu arătăm ce nu e încărcat)

  // Quick Actions (v2 §QUICK_ACTIONS) — mereu vizibile, sus
  var QUICK = [
    { ico: '📣', l: 'Sesizare nouă', run: mod('Sesizari', 'openForm') },
    { ico: '🔍', l: 'Caută parcelă', run: function () { var t = D.querySelector('.ptab[data-t="search"]'); if (t) t.click(); } },
    { ico: '🧪', l: 'SimLab', run: mod('SimLab', 'openDashboard') },
    { ico: '📋', l: 'CU nou (CAU)', run: mod('CAU', 'openPanel') }
  ];
  var ov = null, items = [], sel = 0;
  function fnReady(a) {
    // best-effort: arătăm tot; dacă funcția lipsește, run() afișează „se inițializează"
    return true;
  }

  function open() {
    if (ov) return;
    ov = D.createElement('div');
    ov.id = 'ux-launcher';
    ov.style.cssText = 'position:fixed;inset:0;z-index:9700;background:rgba(2,6,16,.78);backdrop-filter:blur(4px);display:flex;align-items:flex-start;justify-content:center;padding-top:8vh;font-family:system-ui,sans-serif';
    ov.onclick = function (e) { if (e.target === ov) close(); };
    var box = D.createElement('div');
    box.style.cssText = 'width:min(720px,94vw);max-height:80vh;background:#0b1424;border:1px solid rgba(212,175,55,.4);border-radius:14px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 24px 80px rgba(0,0,0,.7)';
    var inp = D.createElement('input');
    inp.type = 'text'; inp.placeholder = '🔍 Caută o funcție… (ex: lotizare, trafic, SIDU, parc, taxe)';
    inp.style.cssText = 'border:0;border-bottom:1px solid rgba(255,255,255,.1);background:#0a1120;color:#e6edf7;font-size:16px;padding:16px 18px;outline:none;font-family:inherit';
    var list = D.createElement('div');
    list.style.cssText = 'overflow-y:auto;padding:6px';
    var foot = D.createElement('div');
    foot.style.cssText = 'padding:7px 14px;border-top:1px solid rgba(255,255,255,.08);font-size:10px;color:#64748b;display:flex;justify-content:space-between';
    foot.innerHTML = '<span>↑↓ navighezi · Enter deschizi · Esc închizi</span><span>' + A.length + ' funcții</span>';
    // strip Quick Actions (pinned)
    var qa = D.createElement('div');
    qa.style.cssText = 'display:flex;gap:6px;padding:8px 10px;border-bottom:1px solid rgba(255,255,255,.08);flex-wrap:wrap;background:#0a1120';
    QUICK.forEach(function (a) {
      var b = D.createElement('button');
      b.innerHTML = a.ico + ' ' + a.l;
      b.style.cssText = 'flex:1;min-width:110px;background:rgba(212,175,55,.12);border:1px solid rgba(212,175,55,.3);color:#e9d08a;border-radius:8px;padding:8px 6px;font-size:11.5px;font-weight:700;cursor:pointer;white-space:nowrap';
      b.onclick = function () { close(); setTimeout(function () { try { a.run(); } catch (e) {} }, 30); };
      qa.appendChild(b);
    });
    box.appendChild(inp); box.appendChild(qa); box.appendChild(list); box.appendChild(foot); ov.appendChild(box); D.body.appendChild(ov);

    function render(q) {
      q = (q || '').toLowerCase().trim();
      var filt = A.filter(function (a) { if (!q) return true; var hay = (a.l + ' ' + (a.d || '') + ' ' + (a.k || '') + ' ' + a.g).toLowerCase(); return q.split(/\s+/).every(function (w) { return hay.indexOf(w) >= 0; }); });
      items = filt; sel = 0;
      var html = '', lastG = '';
      filt.forEach(function (a, i) {
        if (a.g !== lastG) { html += '<div style="font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em;font-weight:700;padding:9px 10px 4px">' + a.g + '</div>'; lastG = a.g; }
        html += '<div class="lx-item" data-i="' + i + '" style="display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:8px;cursor:pointer">' +
          '<span style="font-size:17px;width:22px;text-align:center;flex-shrink:0">' + a.ico + '</span>' +
          '<span style="flex:1;min-width:0"><div style="font-size:13px;font-weight:600;color:#e6edf7">' + a.l + '</div>' + (a.d ? '<div style="font-size:11px;color:#94a3b8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + a.d + '</div>' : '') + '</span>' +
          (a.info ? '<button class="lx-info" data-info="' + a.info + '" title="Info" style="background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:#64748b;border-radius:6px;padding:2px 8px;cursor:pointer;font-size:11px;flex-shrink:0">ⓘ</button>' : '') +
          '</div>';
      });
      if (!filt.length) html = '<div style="padding:24px;text-align:center;color:#64748b;font-size:13px">Nicio funcție pentru „' + q + '"</div>';
      list.innerHTML = html;
      highlight();
      list.querySelectorAll('.lx-item').forEach(function (el) {
        el.onmouseenter = function () { sel = +el.getAttribute('data-i'); highlight(); };
        el.onclick = function (e) { if (e.target.classList.contains('lx-info')) return; run(+el.getAttribute('data-i')); };
      });
      list.querySelectorAll('.lx-info').forEach(function (b) { b.onclick = function (e) { e.stopPropagation(); var k = b.getAttribute('data-info'); close(); if (typeof G.infoDrawerOpen === 'function') G.infoDrawerOpen(k); }; });
    }
    function highlight() {
      var els = list.querySelectorAll('.lx-item');
      els.forEach(function (el) { var on = +el.getAttribute('data-i') === sel; el.style.background = on ? 'rgba(212,175,55,.18)' : 'transparent'; if (on) el.scrollIntoView({ block: 'nearest' }); });
    }
    function run(i) { var a = items[i]; if (!a) return; close(); setTimeout(function () { try { a.run(); } catch (e) { console.warn('[Launcher run]', e); } }, 30); }

    inp.addEventListener('input', function () { render(inp.value); });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { sel = Math.min(items.length - 1, sel + 1); highlight(); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { sel = Math.max(0, sel - 1); highlight(); e.preventDefault(); }
      else if (e.key === 'Enter') { run(sel); e.preventDefault(); }
      else if (e.key === 'Escape') { close(); e.preventDefault(); e.stopPropagation(); }
    });
    render('');
    setTimeout(function () { inp.focus(); }, 40);
  }
  function close() { if (ov) { try { ov.remove(); } catch (e) {} ov = null; } }
  function toggle() { ov ? close() : open(); }

  // Acces: butonul „🔍 Funcții ⌘K" din bara de sus (mereu vizibil) + Cmd/Ctrl+K.
  // (fără buton flotant — se suprapunea cu indicatorul de UAT / bara de jos)

  G.Launcher = { open: open, close: close, toggle: toggle, ACTIONS: A };
  console.log('[Launcher] paletă de comenzi unificată încărcată (' + A.length + ' funcții) — Cmd/Ctrl+K');
})(window);
