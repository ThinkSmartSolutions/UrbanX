/* ============================================================================
 * UrbanX — STUDIU REGIM SILVIC (js/22-silvic.js)
 * Regimul fondului forestier + scoaterea din fondul forestier — Codul Silvic
 * (Legea 46/2008) + HG 861/2009 + Ord. 1540/2011. Date LIVE: OSM păduri +
 * Copernicus HRL Forest + Natura 2000 (EEA WDPA), prin proxy.
 *
 * Familia: STUDIU DE SIT (rang parcelă). Meniu Rapoarte, gated pe parcelă.
 * PARCELĂ PUNCTUAL — complementar profilului silvic TERITORIAL
 * (profile-deep-silvic-*.js): rang diferit, se completează, NU se dublează (#8).
 * Interconectat cu: IVU (dimensiunea Mediu/natură), Loisir (păduri de recreere
 * Cat. III), SKID/GPL (banda 20 m protecție), Studiul de Amplasament.
 *
 * window: generateSilvic · silvic_calculeazaTaxa · silvic_drawForest · _SILVIC_REGISTRY
 * ========================================================================== */
(function (G) {
  'use strict';
  var PROXY = G._PROXY_URL || 'https://urbanx-proxy.3dtravelsoftart.workers.dev';

  // ── CADRU LEGAL (Codul Silvic 46/2008 + HG 861/2009 + Ord. 1540/2011) ────
  var CATF = {
    'I': { den: 'Păduri cu funcții speciale de protecție a apelor', sub: 'IA bazine hidrografice · IB maluri · IC perdele forestiere', constr: 'INTERZISĂ TOTAL', regim: 'Regim special de conservare (art. 32 alin. 1)', grupa: 'grupa_I', restr: 'critical', col: [26, 74, 0] },
    'II': { den: 'Păduri cu funcții de protecție contra factorilor climatici', sub: 'IIA teren agricol · IIB localități · IIC eroziune', constr: 'INTERZISĂ (excepție utilitate publică)', regim: 'Scoatere doar cu aprobarea Guvernului (art. 37 alin. 3)', grupa: 'grupa_I', restr: 'critical', col: [45, 106, 0] },
    'III': { den: 'Păduri cu funcții de recreere', sub: 'IIIA jurul localităților · IIIB agrement · IIIC păduri-parc', constr: 'RESTRICTIVĂ — max. 0,5%, doar dotări recreative', regim: 'Scoatere cu aviz + aprobare MMAP', grupa: 'grupa_II', restr: 'high', col: [61, 133, 0] },
    'IV': { den: 'Păduri de interes cinegetic și piscicol', sub: 'IVA rezervații · IVB coridoare migrație · IVC fond cinegetic', constr: 'POSIBILĂ cu restricții (gestiune cinegetică)', regim: 'Scoatere cu aviz Garda Forestieră + MMAP', grupa: 'grupa_II', restr: 'medium', col: [77, 160, 0] },
    'V': { den: 'Păduri de producție și protecție', sub: 'VA producție lemnoasă · VB producție + protecție', constr: 'POSIBILĂ — cu avize și taxe specifice', regim: 'Scoatere cu aviz Garda Forestieră + MMAP (<1 ha) / Guvern (>1 ha)', grupa: 'grupa_II', restr: 'low', col: [102, 187, 0] }
  };
  var TAXE = {
    definitiva: { grupa_I: { zona_I: 62500, zona_II: 75000, zona_III: 87500 }, grupa_II: { zona_I: 31250, zona_II: 37500, zona_III: 43750 } },
    temporara: { grupa_I: { zona_I: 6250, zona_II: 7500, zona_III: 8750 }, grupa_II: { zona_I: 3125, zona_II: 3750, zona_III: 4375 } }
  };
  var REIMP = { grupa_I: { raport: '3:1', nota: '3 ha împădurire pentru 1 ha scos, pe alt teren' }, grupa_II: { raport: '1:1', nota: '1 ha pentru 1 ha, pe alt teren' } };
  var BENZI = [['Bandă de protecție generală față de pădure', 20], ['Față de drumuri naționale în pădure', 30], ['Construcții civile față de limita pădurii', 20], ['Linii electrice față de coronament', 5], ['Instalații GPL/gaze față de pădure (critic proiecte GPL)', 20]];
  var PRAGURI = [['< 1 ha', 'Garda Forestieră + aviz Direcția Silvică Județeană', '30–60 zile'], ['1 – 10 ha', 'Ministerul Mediului, Apelor și Pădurilor (MMAP)', '60–90 zile'], ['> 10 ha', 'Hotărâre de Guvern', '90–180 zile']];
  var AVIZE = [['Garda Forestieră Teritorială', 'obligatoriu'], ['Direcția Silvică Județeană (Romsilva)', 'obligatoriu'], ['MMAP (Ministerul Mediului)', 'suprafață > 1 ha'], ['Ocolul Silvic administrator', 'obligatoriu'], ['Agenția pentru Protecția Mediului (APM)', 'obligatoriu'], ['Aviz Natura 2000', 'intersecție sit protejat'], ['Studiu de Evaluare Adecvată (EA)', 'dacă afectează SPA/SCI']];
  var DOCS = ['Cerere tip (Garda Forestieră)', 'Memoriu tehnic justificativ (arhitect/inginer)', 'Plan de situație cu suprafața de scos (vizat OCPI)', 'Extras CF actualizat', 'Studiu amenajistic / adeverință Ocolul Silvic', 'Studiu de Evaluare a Impactului asupra Mediului (EIM) dacă > 0,5 ha', 'Studiu de Evaluare Adecvată (dacă în sit Natura 2000)', 'Dovada asigurării terenului de reîmpădurire (3:1 sau 1:1)', 'Deviz estimativ lucrări de reîmpădurire', 'Chitanță plată taxă de scoatere (HG 861/2009)'];
  var ACTE = [['Legea nr. 46/2008', 'Codul Silvic, republicat 2019'], ['HG nr. 861/2009', 'Taxa de scoatere din fondul forestier'], ['Ord. 1540/2011', 'Clasificarea pădurilor pe grupe funcționale'], ['Legea nr. 107/1996', 'Legea Apelor — zone de protecție'], ['OUG nr. 195/2005', 'Protecția Mediului — aviz APM'], ['Ord. nr. 19/2010', 'Ghid evaluare adecvată Natura 2000'], ['HG nr. 1076/2004', 'Evaluarea Impactului asupra Mediului'], ['Legea nr. 5/2000', 'PATN Secțiunea III — Arii protejate'], ['Ord. 3836/2012', 'Procedura scoatere din fondul forestier']];

  // ── Registry ──────────────────────────────────────────────────────────────
  G._SILVIC_REGISTRY = G._SILVIC_REGISTRY || {};
  function _key(uat) { return 'ux_silvic_' + (uat || 'RO'); }
  function silvicLoad(uat) { try { var r = localStorage.getItem(_key(uat)); if (r) Object.assign(G._SILVIC_REGISTRY, JSON.parse(r)); } catch (e) {} }
  function silvicSave(uat) { try { var o = {}; Object.keys(G._SILVIC_REGISTRY).forEach(function (k) { if (G._SILVIC_REGISTRY[k].uat === uat) o[k] = G._SILVIC_REGISTRY[k]; }); localStorage.setItem(_key(uat), JSON.stringify(o)); } catch (e) {} }

  // ── Zonă geografică din altitudine (I câmpie / II deal / III munte) ───────
  function _zona(elev) { if (elev == null) return 'zona_II'; return elev < 300 ? 'zona_I' : elev < 800 ? 'zona_II' : 'zona_III'; }
  function _zonaLabel(z) { return z === 'zona_I' ? 'Zona I (câmpie)' : z === 'zona_II' ? 'Zona II (deal)' : 'Zona III (munte)'; }

  // ── Calcul taxă scoatere ──────────────────────────────────────────────────
  function silvic_calculeazaTaxa(catF, suprafataMP, elev, tip) {
    tip = tip || 'definitiva';
    var c = CATF[catF] || CATF['V']; var grupa = c.grupa; var zona = _zona(elev);
    var tarif = TAXE[tip][grupa][zona]; var ha = (suprafataMP || 0) / 10000;
    var taxa = tarif * ha * (tip === 'temporara' ? 1 : 1);
    var reimp = REIMP[grupa]; var reimpHa = ha * parseFloat(reimp.raport.split(':')[0]);
    var prag = ha < 1 ? PRAGURI[0] : ha < 10 ? PRAGURI[1] : PRAGURI[2];
    return { catF: catF, grupa: grupa, zona: zona, zonaLabel: _zonaLabel(zona), tarifLeiHa: tarif, suprafataHa: ha.toFixed(4), taxaLei: taxa.toFixed(0), tip: tip, reimpRaport: reimp.raport, reimpHa: reimpHa.toFixed(2), pragAprobare: prag[1], pragTimp: prag[2], baza: 'HG 861/2009 + Legea 46/2008' };
  }
  G.silvic_calculeazaTaxa = silvic_calculeazaTaxa;

  // ── FETCH LIVE ────────────────────────────────────────────────────────────
  async function fetchOSMForests(lat, lon, radius) {
    var q = '[out:json][timeout:25];(way["natural"="wood"](around:' + (radius || 1000) + ',' + lat + ',' + lon + ');way["landuse"="forest"](around:' + (radius || 1000) + ',' + lat + ',' + lon + ');relation["natural"="wood"](around:' + (radius || 1000) + ',' + lat + ',' + lon + ');relation["landuse"="forest"](around:' + (radius || 1000) + ',' + lat + ',' + lon + '););out tags geom 60;';
    try { var r = await fetch(PROXY + '/osm?q=' + encodeURIComponent(q), { signal: AbortSignal.timeout ? AbortSignal.timeout(25000) : undefined }); if (!r.ok) return []; var j = await r.json(); return j.elements || []; } catch (e) { return []; }
  }
  async function fetchNatura2000(lat, lon) {
    var api = 'https://bio.discomap.eea.europa.eu/arcgis/rest/services/ProtectedSites/WDPA_Terrestrial_Public/FeatureServer/0/query';
    var p = 'geometry=' + lon + ',' + lat + '&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=NAME,DESIG_TYPE,DESIG,REP_AREA,STATUS,ISO3&f=json';
    try { var r = await fetch(PROXY + '/proxy?url=' + encodeURIComponent(api + '?' + p), { signal: AbortSignal.timeout ? AbortSignal.timeout(20000) : undefined }); if (!r.ok) return []; var j = await r.json(); return (j.features || []).map(function (f) { return f.attributes; }); } catch (e) { return []; }
  }
  async function fetchCopernicusForestType(lat, lon) {
    var wms = 'https://copernicus.discomap.eea.europa.eu/arcgis/services/GioLandPublic/HRL_ForestType_2018/ImageServer/WMSServer';
    var dl = 0.001, bbox = (lon - dl) + ',' + (lat - dl) + ',' + (lon + dl) + ',' + (lat + dl);
    var url = wms + '?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&QUERY_LAYERS=0&LAYERS=0&BBOX=' + bbox + '&CRS=EPSG:4326&WIDTH=11&HEIGHT=11&I=5&J=5&INFO_FORMAT=application/json';
    try { var r = await fetch(PROXY + '/proxy?url=' + encodeURIComponent(url), { signal: AbortSignal.timeout ? AbortSignal.timeout(18000) : undefined }); if (!r.ok) return null; return await r.json(); } catch (e) { return null; }
  }

  function _leafType(el) { var t = (el && el.tags && el.tags.leaf_type) || ''; return t === 'broadleaved' ? 'foioase' : t === 'needleleaved' ? 'conifere' : t === 'mixed' ? 'mixt' : ''; }

  async function _siteAnalysis(lat, lon) {
    var out = { forests: [], nearestName: null, inForest: false, leaf: '', elev: null, n2000: [], copernicus: null };
    try { if (G._getElevGrid) { var g = await G._getElevGrid(lat, lon, 300, 12); if (g) out.elev = g.elevMed; } } catch (e) {}
    var res = await Promise.all([fetchOSMForests(lat, lon, 1000), fetchNatura2000(lat, lon), fetchCopernicusForestType(lat, lon)]);
    out.forests = res[0] || []; out.n2000 = res[1] || []; out.copernicus = res[2];
    if (out.forests.length) {
      var named = out.forests.filter(function (f) { return f.tags && f.tags.name; });
      out.nearestName = named.length ? named[0].tags.name : null;
      out.leaf = _leafType(out.forests[0]);
      // inForest: parcela e in interiorul unui poligon padure?
      try {
        if (G.turf) { var pt = G.turf.point([lon, lat]); out.forests.some(function (f) { if (f.geometry && f.geometry.length > 2) { try { var poly = G.turf.polygon([f.geometry.map(function (p) { return [p.lon, p.lat]; }).concat([[f.geometry[0].lon, f.geometry[0].lat]])]); if (G.turf.booleanPointInPolygon(pt, poly)) { out.inForest = true; return true; } } catch (e) {} } return false; }); }
      } catch (e) {}
    }
    return out;
  }

  // ── Desen păduri + bandă protecție pe hartă (uz live) ─────────────────────
  var FSRC = 'silvic-forest-src', FLY = 'silvic-forest-ly', FLN = 'silvic-forest-ln', BSRC = 'silvic-band-src', BLY = 'silvic-band-ly';
  function silvic_clearForest(map) { map = map || G.map; if (!map) return; [FLY, FLN, BLY].forEach(function (id) { try { if (map.getLayer(id)) map.removeLayer(id); } catch (e) {} }); [FSRC, BSRC].forEach(function (id) { try { if (map.getSource(id)) map.removeSource(id); } catch (e) {} }); var l = document.getElementById('silvic-legend'); if (l) l.remove(); }
  async function silvic_drawForest(map, lat, lon) {
    map = map || G.map; if (!map) { if (G.ss) G.ss('Harta nu e pregătită.'); return; }
    if (map.getLayer && map.getLayer(FLY)) { silvic_clearForest(map); return; }
    if (!lat) { try { if (G.TCI && G.TCI.selectedParcelCentroid) { lat = G.TCI.selectedParcelCentroid[1]; lon = G.TCI.selectedParcelCentroid[0]; } } catch (e) {} }
    if (!lat) { var c = map.getCenter(); lat = c.lat; lon = c.lng; }
    if (G.ss) G.ss('🌲 Caut pădurile (OSM)…');
    var forests = await fetchOSMForests(lat, lon, 1500);
    var feats = forests.filter(function (f) { return f.geometry && f.geometry.length > 2; }).map(function (f) { return { type: 'Feature', properties: { name: (f.tags && f.tags.name) || '', leaf: _leafType(f) }, geometry: { type: 'Polygon', coordinates: [f.geometry.map(function (p) { return [p.lon, p.lat]; })] } }; });
    if (!feats.length) { if (G.ss) G.ss('Nicio pădure în OSM pe această zonă.'); return; }
    var fc = { type: 'FeatureCollection', features: feats };
    map.addSource(FSRC, { type: 'geojson', data: fc });
    map.addLayer({ id: FLY, type: 'fill', source: FSRC, paint: { 'fill-color': '#2d6a00', 'fill-opacity': 0.28 } });
    map.addLayer({ id: FLN, type: 'line', source: FSRC, paint: { 'line-color': '#1a4a00', 'line-width': 1.5 } });
    try { if (G.turf) { var band = { type: 'FeatureCollection', features: feats.map(function (f) { try { return G.turf.buffer(f, 20, { units: 'meters' }); } catch (e) { return null; } }).filter(Boolean) }; map.addSource(BSRC, { type: 'geojson', data: band }); map.addLayer({ id: BLY, type: 'line', source: BSRC, paint: { 'line-color': '#f59e0b', 'line-width': 1.5, 'line-dasharray': [2, 2] } }); } } catch (e) {}
    if (!document.getElementById('silvic-legend')) { var b = document.createElement('div'); b.id = 'silvic-legend'; b.style.cssText = 'position:fixed;bottom:130px;left:10px;z-index:3200;background:rgba(8,15,35,.93);color:#e6edf7;border:1px solid rgba(45,106,0,.5);border-radius:10px;padding:10px 12px;font:12px system-ui'; b.innerHTML = '<div style="font-weight:700;margin-bottom:5px">🌲 Fond forestier (OSM)</div><div style="display:flex;align-items:center;gap:6px"><span style="width:14px;height:10px;background:#2d6a00;opacity:.6;display:inline-block"></span>Pădure</div><div style="display:flex;align-items:center;gap:6px;margin-top:2px"><span style="width:14px;border-top:2px dashed #f59e0b;display:inline-block"></span>Bandă protecție 20 m</div><button onclick="window.silvic_clearForest()" style="margin-top:7px;background:rgba(148,163,184,.15);color:#cbd5e1;border:1px solid rgba(148,163,184,.3);border-radius:7px;padding:4px 9px;font-size:11px;cursor:pointer">✕ Ascunde</button>'; document.body.appendChild(b); }
    if (G.ss) G.ss('🌲 ' + feats.length + ' poligoane de pădure afișate.');
  }
  G.silvic_drawForest = silvic_drawForest; G.silvic_clearForest = silvic_clearForest;

  function _normNote() { return 'Bază normativă: iulie 2025. Tarifele HG 861/2009 se indexează anual — verificați la monitoruloficial.ro înainte de utilizare oficială.'; }

  // ══════════════════════════════════════════════════════════════════════
  // GENERATOR PDF — STUDIU REGIM SILVIC PROFUND
  // ══════════════════════════════════════════════════════════════════════
  async function generateSilvic() {
    var S = G.S;
    if (!S || !S.parcels || !S.parcels[S.activeParcel == null ? 0 : S.activeParcel]) { if (G.ss) G.ss('Selectați o parcelă pentru studiul silvic.'); return; }
    var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel];
    if (!ap.geo || !ap.geo.geometry) { if (G.ss) G.ss('Parcela nu are geometrie.'); return; }
    if (!G._initStudyPdf) { if (G.ss) G.ss('Motorul PDF nu e încărcat.'); return; }
    if (G.ss) G.ss('Se generează Studiul de Regim Silvic…');

    var lat = 47.16, lon = 27.6;
    try { if (G.turf && ap.geo) { var c = G.turf.centerOfMass(ap.geo).geometry.coordinates; lon = c[0]; lat = c[1]; } } catch (e) {}
    var site = await _siteAnalysis(lat, lon);

    var d = G._initStudyPdf('Studiu de Regim Silvic', 'Fond forestier · scoatere din fondul forestier', 44);
    var pdf = d.pdf, W = d.W, H = d.H, sec = d.sec, body = d.body, tblRow = d.tblRow, newPage = d.newPage, checkY = d.checkY, miniChart = d.miniChart, cover = d.cover;
    var nrcad = d.nrcad || ap.nrcad || '—', area = d.area || ap.area || 0, uat = d.uat || ap.uat || '', judet = d.judet || '';
    // categoria funcțională estimată: dacă e pădure de recreere lângă oraș → III; altfel V (producție) implicit
    var catF = site.inForest ? 'V' : 'V';
    var cm = CATF[catF];
    var TITLE = 'STUDIU SILVIC'; var pg = 1, cy;
    function page(t) { pg++; cy = newPage(t || TITLE, pg); }
    function P(txt) { cy = checkY(cy, 26, TITLE, pg); cy = body(txt, 14, cy) + 2.5; }
    function SEC(t) { cy = checkY(cy, 30, TITLE, pg); cy = sec(t, cy) + 2; }
    var tx = silvic_calculeazaTaxa(catF, area, site.elev, 'definitiva');

    // COPERTĂ
    cover('Studiu de regim silvic pentru scoaterea terenului din fondul forestier național\nCodul Silvic (Legea 46/2008) · HG 861/2009 · Ord. 1540/2011',
      null,
      [['Nr. cadastral', nrcad], ['UAT / localitate', uat || '—'], ['Suprafață', (area ? area.toLocaleString('ro-RO') : '—') + ' mp (' + (area / 10000).toFixed(4) + ' ha)'],
       ['Context forestier (OSM)', site.inForest ? 'Parcela intersectează fond forestier' + (site.nearestName ? ' — ' + site.nearestName : '') : (site.forests.length ? 'Pădure în proximitate (< 1 km)' : 'Fără pădure în proximitate imediată')],
       ['Zona geografică (tarifară)', tx.zonaLabel]],
      !site.inForest, site.inForest ? 'Regim silvic aplicabil — Cat. ' + catF : 'Fără suprapunere directă cu fondul forestier');

    // CUPRINS + REZUMAT
    page('CUPRINS ȘI REZUMAT');
    cy = sec('CUPRINS', cy) + 1;
    ['1. Cadrul legal silvic', '2. Metodologia și sursele de date', '3. Localizarea și contextul forestier (live)', '4. Relieful și zona geografică tarifară',
     '5. Categoriile funcționale ale pădurilor (art. 24)', '6. Regimul de construire pe categorii', '7. Tipul de pădure și acoperirea (Copernicus)',
     '8. Arii naturale protejate — Natura 2000 (live)', '9. Benzile de protecție (art. 60)', '10. Taxa de scoatere (HG 861/2009)',
     '11. Obligația de reîmpădurire', '12. Praguri de aprobare și avize', '13. Documentele dosarului de scoatere',
     '14. Legături în ecosistemul UrbanX', '15. Impact, scenarii și conservare', '16. Concluzii', 'Anexe'].forEach(function (t) { cy = body(t, 16, cy) + 0.5; });
    cy += 3; SEC('REZUMAT EXECUTIV');
    P('Prezentul studiu analizează regimul silvic al terenului cu nr. cadastral ' + nrcad + ' (' + (area ? area.toLocaleString('ro-RO') : '—') + ' mp), situat în ' + (uat || 'UAT') + ', în vederea fundamentării unei eventuale scoateri din fondul forestier național, conform Codului Silvic (Legea 46/2008) și HG 861/2009. Analiza integrează date live privind acoperirea forestieră (OpenStreetMap), tipul de pădure (Copernicus HRL) și suprapunerea cu ariile naturale protejate (Natura 2000 — EEA WDPA).');
    P('Contextul forestier identificat automat: ' + (site.inForest ? 'parcela se suprapune cu fond forestier' + (site.nearestName ? ' (' + site.nearestName + ')' : '') + ', ceea ce activează integral regimul silvic și procedura de scoatere.' : (site.forests.length ? 'parcela se află în proximitatea (< 1 km) a unor suprafețe împădurite; se verifică pe amenajamentul silvic dacă terenul face parte din fondul forestier.' : 'nu s-a identificat fond forestier în proximitate imediată, dar apartenența la fondul forestier se confirmă exclusiv pe baza amenajamentului silvic și a evidențelor OCPI/Ocol Silvic.')) + (site.n2000.length ? ' Atenție: parcela intersectează ' + site.n2000.length + ' sit(uri) protejate Natura 2000 — necesită evaluare adecvată.' : ''));

    // 1. CADRU LEGAL
    page('CADRU LEGAL'); SEC('1. CADRUL LEGAL SILVIC');
    P('Fondul forestier național este proprietate de interes național și beneficiază de un regim de protecție strict, indiferent de forma de proprietate. Codul Silvic (Legea 46/2008, republicată 2019) reglementează gestionarea durabilă a pădurilor, iar scoaterea definitivă sau temporară din fondul forestier este permisă numai în condiții limitativ prevăzute de lege, cu plata unei taxe și cu obligația de reîmpădurire compensatorie.');
    cy = tblRow(['Act normativ', 'Obiect'], cy, true, [52, 130]);
    ACTE.forEach(function (r) { cy = checkY(cy, 15, TITLE, pg); cy = tblRow(r, cy, false, [52, 130]); });
    cy += 3;
    P('Principiul fundamental (art. 1 Codul Silvic): pădurile îndeplinesc funcții de protecție și de producție de interes public major. Reducerea suprafeței fondului forestier este interzisă ca regulă; excepțiile sunt strict controlate. ' + _normNote());

    // 2. METODOLOGIE
    page('METODOLOGIE'); SEC('2. METODOLOGIA ȘI SURSELE DE DATE');
    P('Studiul combină trei surse de date reale, accesate în timp real prin proxy: (1) OpenStreetMap (Overpass) pentru geometria suprafețelor împădurite (natural=wood, landuse=forest) și tipul de frunziș; (2) Copernicus High Resolution Layer — Forest Type 2018 (EEA), pentru confirmarea satelitară a tipului de pădure (foioase/conifere); (3) EEA World Database on Protected Areas (WDPA), pentru identificarea siturilor Natura 2000 și a altor arii protejate intersectate.');
    P('Apartenența unei parcele la fondul forestier se stabilește oficial pe baza amenajamentului silvic (documentul de gestiune al pădurii, întocmit pe unități amenajistice — u.a.) și a evidențelor Ocolului Silvic administrator. Datele satelitare și OSM oferă o imagine orientativă necesară pentru diagnoza preliminară și pentru pregătirea dosarului, dar nu înlocuiesc amenajamentul.');
    P('Amenajamentul silvic descrie fiecare unitate amenajistică prin: specii componente și proporția lor (compoziția arboretului), vârsta medie, consistența (gradul de acoperire al coronamentului, 0,1–1,0), clasa de producție (I–V, potențialul de creștere), volumul de masă lemnoasă pe hectar și funcțiile atribuite. Aceste caracteristici determină categoria funcțională și, implicit, regimul de scoatere. Amenajamentele se revizuiesc periodic (de regulă la 10 ani) și sunt aprobate de autoritatea publică centrală pentru silvicultură.');
    P('În metodologia prezentului studiu, coordonatele centroidului parcelei sunt interogate simultan în cele trei surse (paralel, cu timeout și tratare a erorilor), iar rezultatele sunt corelate: prezența unui poligon OSM de tip pădure care conține punctul confirmă suprapunerea; tipul de frunziș OSM și clasificarea Copernicus se validează reciproc; suprapunerea WDPA declanșează cerința de evaluare adecvată. Acolo unde o sursă nu răspunde, studiul semnalează onest lipsa datei, fără a o fabrica.');

    // 3. LOCALIZARE + CONTEXT FORESTIER
    page('CONTEXT FORESTIER'); SEC('3. LOCALIZAREA ȘI CONTEXTUL FORESTIER (live)');
    cy = tblRow(['Element', 'Valoare'], cy, true, [70, 112]);
    [['Nr. cadastral', String(nrcad)], ['UAT / localitate', uat || '—'], ['Județ', judet || '—'], ['Coordonate (WGS84)', lat.toFixed(5) + ', ' + lon.toFixed(5)],
     ['Suprafață', (area ? area.toLocaleString('ro-RO') : '—') + ' mp'], ['Fond forestier identificat', site.inForest ? 'DA (suprapunere)' : site.forests.length ? 'În proximitate' : 'Nu în proximitate'],
     ['Suprafețe împădurite în 1 km', String(site.forests.length)], ['Cea mai apropiată pădure denumită', site.nearestName || '—'], ['Tip frunziș (OSM)', site.leaf || 'nedeterminat']
    ].forEach(function (r) { cy = tblRow(r, cy, false, [70, 112]); });
    cy += 3;
    P('Analiza OSM a identificat ' + site.forests.length + ' suprafață(e) împădurită(e) în raza de 1 km în jurul parcelei' + (site.nearestName ? ', dintre care cea mai notabilă este ' + site.nearestName : '') + '. ' + (site.inForest ? 'Întrucât parcela se suprapune cu o suprafață împădurită, regimul silvic este aplicabil integral și este necesară procedura de scoatere din fondul forestier înainte de orice construcție.' : 'Parcela nu se suprapune cu o suprafață împădurită conform OSM; totuși, în cazul terenurilor limitrofe pădurii, se aplică banda de protecție de 20 m (art. 60) și se verifică amenajamentul silvic.'));

    // 4. RELIEF + ZONA
    page('ZONĂ GEOGRAFICĂ'); SEC('4. RELIEFUL ȘI ZONA GEOGRAFICĂ TARIFARĂ');
    P('Taxa de scoatere din fondul forestier depinde de zona geografică (I câmpie, II deal, III munte), stabilită pe baza altitudinii. Zona influențează atât valoarea economică a pădurii, cât și dificultatea reîmpăduririi.');
    cy = tblRow(['Parametru', 'Valoare'], cy, true, [90, 92]);
    [['Altitudine medie (model digital)', site.elev != null ? site.elev + ' m' : 'nedeterminată'], ['Zona geografică tarifară', tx.zonaLabel], ['Grupa funcțională tarifară', tx.grupa === 'grupa_I' ? 'Grupa I (Cat. I–II protecție)' : 'Grupa II (Cat. III–V)']
    ].forEach(function (r) { cy = tblRow(r, cy, false, [90, 92]); });
    cy += 3;
    P('Pentru parcela analizată, altitudinea medie de ' + (site.elev != null ? site.elev + ' m' : 'nedeterminată') + ' încadrează terenul în ' + tx.zonaLabel + ', cu implicații directe asupra tarifului de scoatere prezentat în capitolul 10.');

    // 5. CATEGORII FUNCȚIONALE
    page('CATEGORII FUNCȚIONALE'); SEC('5. CATEGORIILE FUNCȚIONALE ALE PĂDURILOR (art. 24)');
    P('Codul Silvic clasifică pădurile în cinci categorii funcționale, după funcțiile prioritare pe care le îndeplinesc. Categoria funcțională determină dacă și în ce condiții este permisă scoaterea din fondul forestier:');
    cy = tblRow(['Cat.', 'Denumire', 'Construire'], cy, true, [16, 106, 60]);
    ['I', 'II', 'III', 'IV', 'V'].forEach(function (k) { var c = CATF[k]; cy = checkY(cy, 16, TITLE, pg); cy = tblRow([k, c.den, c.constr], cy, false, [16, 106, 60]); });
    cy += 3;
    ['I', 'II', 'III', 'IV', 'V'].forEach(function (k) { var c = CATF[k]; P('• Categoria ' + k + ' — ' + c.den + '. Subcategorii: ' + c.sub + '. Regim: ' + c.regim + '.'); });

    // 6. REGIM CONSTRUIRE
    page('REGIM CONSTRUIRE'); SEC('6. REGIMUL DE CONSTRUIRE PE CATEGORII');
    P('Încadrarea preliminară a parcelei (estimată, în lipsa amenajamentului): Categoria ' + catF + ' — ' + cm.den + '. Regimul de construire aferent: ' + cm.constr + '. ' + cm.regim + '.');
    P('Pădurile de Categoria I și II (protecția apelor și contra factorilor climatici) au regimul cel mai restrictiv — construcția este, ca regulă, interzisă, iar scoaterea din fond este posibilă doar prin hotărâre de Guvern și pentru lucrări de utilitate publică. Pădurile de Categoria III (recreere) permit doar dotări recreative pe maximum 0,5% din suprafață. Categoriile IV și V oferă cea mai mare flexibilitate, dar tot condiționată de avize și taxe.');
    P('Determinarea exactă a categoriei funcționale se face pe baza amenajamentului silvic al unității amenajistice (u.a.) în care se află parcela. Încadrarea din prezentul studiu are caracter orientativ.');

    // 7. COPERNICUS TIP PĂDURE
    page('TIP PĂDURE'); SEC('7. TIPUL DE PĂDURE ȘI ACOPERIREA (Copernicus HRL)');
    var cop = site.copernicus ? 'date obținute' : 'indisponibile la momentul generării';
    P('Layerul Copernicus High Resolution — Forest Type 2018 (Agenția Europeană de Mediu) oferă clasificarea satelitară a acoperirii forestiere: 0 = non-forest, 1 = foioase (broadleaved), 2 = conifere (coniferous). Interogarea punctuală pentru parcelă a returnat: ' + cop + '. Tipul de frunziș din OSM: ' + (site.leaf || 'nedeterminat') + '.');
    P('Confirmarea satelitară a acoperirii forestiere este utilă pentru validarea încadrării și pentru estimarea densității coronamentului. Pentru dosarul oficial, sursa de referință rămâne amenajamentul silvic, care conține descrierea detaliată a arboretului (specii, vârstă, consistență, clasă de producție).');
    P('Distribuția speciilor pe teritoriul României reflectă etajarea altitudinală: la câmpie și deal predomină pădurile de foioase (stejar, gorun, fag, cer, gârniță, salcâm), în zona montană joasă apar amestecurile de fag și rășinoase, iar la altitudini mari domină molidișurile. Tipul de frunziș determină valoarea ecologică și economică a pădurii și influențează dificultatea și costul reîmpăduririi compensatorii — refacerea unui arboret de cvercinee mature necesită decenii, motiv suplimentar pentru protejarea lor.');
    P('Consistența (densitatea coronamentului) și clasa de producție determină volumul de masă lemnoasă afectat de scoatere. O pădure cu consistență ridicată (0,8–1,0) și clasă de producție superioară reprezintă o pierdere economică și ecologică majoră, ceea ce se reflectă în procedura de aprobare și în evaluarea de impact.');

    // 8. NATURA 2000
    page('ARII PROTEJATE'); SEC('8. ARII NATURALE PROTEJATE — NATURA 2000 (live)');
    if (site.n2000.length) {
      P('Interogarea bazei EEA WDPA a identificat ' + site.n2000.length + ' arie(i) protejată(e) care intersectează sau se învecinează cu parcela:');
      cy = tblRow(['Denumire', 'Tip desemnare', 'Categorie'], cy, true, [78, 44, 60]);
      site.n2000.slice(0, 10).forEach(function (a) { cy = checkY(cy, 14, TITLE, pg); cy = tblRow([(a.NAME || '—'), (a.DESIG_TYPE || '—'), (a.DESIG || '—')], cy, false, [78, 44, 60]); });
      cy += 3;
      P('Suprapunerea cu situri Natura 2000 (ROSCI — situri de importanță comunitară, ROSPA — arii de protecție specială avifaunistică) face OBLIGATORIU un Studiu de Evaluare Adecvată (EA) conform Ord. 19/2010, iar scoaterea din fond este condiționată de avizul autorității de mediu. În anumite situri, orice reducere de suprafață forestieră poate fi interzisă.');
    } else {
      P('Interogarea bazei EEA WDPA nu a returnat situri protejate care să intersecteze parcela. Absența unei suprapuneri simplifică procedura (nu este necesar Studiul de Evaluare Adecvată), însă verificarea se reconfirmă la data depunerii dosarului, întrucât limitele siturilor pot fi actualizate. Pentru parcelele din vecinătatea unor arii protejate se recomandă prudență.');
    }

    // 9. BENZI PROTECȚIE
    page('BENZI DE PROTECȚIE'); SEC('9. BENZILE DE PROTECȚIE (art. 60)');
    P('Codul Silvic instituie benzi de protecție (distanțe minime) față de limita fondului forestier, care restricționează amplasarea construcțiilor și a instalațiilor chiar și pe terenurile limitrofe:');
    cy = tblRow(['Element', 'Distanță minimă'], cy, true, [130, 52]);
    BENZI.forEach(function (r) { cy = tblRow([r[0], r[1] + ' m'], cy, false, [130, 52]); });
    cy += 3;
    P('Banda de protecție de 20 m față de instalațiile GPL/gaze este critică pentru proiectele de tip SKID/stații GPL analizate în platformă: amplasarea unui rezervor de gaz în apropierea pădurii trebuie să respecte simultan distanțele silvice și cele de securitate la incendiu. Această corelare este preluată automat în studiile de obiect (SKID/SSI).');
    P('Rațiunea benzilor de protecție este dublă: protejarea pădurii de impactul construcțiilor și infrastructurii (poluare, tasare a solului, perturbarea faunei, risc de incendiu propagat dinspre construcții) și protejarea construcțiilor de riscurile dinspre pădure (căderi de arbori, incendii forestiere, faună). Pentru terenurile limitrofe fondului forestier, banda de 20 m reduce suprafața efectiv construibilă și trebuie luată în calcul la stabilirea edificabilului încă din faza de certificat de urbanism.');
    P('În zonele de interfață pădure–localitate (wildland-urban interface), tot mai relevante în contextul schimbărilor climatice și al riscului crescut de incendii de vegetație, banda de protecție capătă și rol de fâșie de siguranță la incendiu. Proiectarea acestei interfețe (vegetație cu risc redus, accese pentru intervenție) este o bună practică recomandată chiar dincolo de minimul legal.');

    // 10. TAXA
    page('TAXA DE SCOATERE'); SEC('10. TAXA DE SCOATERE (HG 861/2009)');
    P('Taxa de scoatere din fondul forestier se calculează pe baza grupei funcționale (Grupa I pentru Cat. I–II, Grupa II pentru Cat. III–V), a zonei geografice și a tipului de scoatere (definitivă sau temporară). Formula: Taxa = Tarif(grupă, zonă) × Suprafață(ha).');
    P('Exemplu de calcul pentru parcela analizată — Categoria ' + catF + ' (Grupa ' + (tx.grupa === 'grupa_I' ? 'I' : 'II') + '), ' + tx.zonaLabel + ', scoatere definitivă:');
    cy = tblRow(['Element', 'Valoare'], cy, true, [90, 92]);
    [['Grupă funcțională', tx.grupa === 'grupa_I' ? 'Grupa I' : 'Grupa II'], ['Zonă geografică', tx.zonaLabel], ['Tarif (HG 861/2009)', tx.tarifLeiHa.toLocaleString('ro-RO') + ' lei/ha'],
     ['Suprafață', tx.suprafataHa + ' ha'], ['TAXĂ SCOATERE DEFINITIVĂ', (+tx.taxaLei).toLocaleString('ro-RO') + ' lei'], ['Reîmpădurire compensatorie', tx.reimpRaport + ' → ' + tx.reimpHa + ' ha']
    ].forEach(function (r) { cy = tblRow(r, cy, false, [90, 92]); });
    cy += 3;
    SEC('Tarife de scoatere definitivă (lei/ha)');
    cy = tblRow(['Grupă', 'Zona I (câmpie)', 'Zona II (deal)', 'Zona III (munte)'], cy, true, [46, 45, 45, 46]);
    cy = tblRow(['Grupa I (Cat. I–II)', TAXE.definitiva.grupa_I.zona_I.toLocaleString('ro-RO'), TAXE.definitiva.grupa_I.zona_II.toLocaleString('ro-RO'), TAXE.definitiva.grupa_I.zona_III.toLocaleString('ro-RO')], cy, false, [46, 45, 45, 46]);
    cy = tblRow(['Grupa II (Cat. III–V)', TAXE.definitiva.grupa_II.zona_I.toLocaleString('ro-RO'), TAXE.definitiva.grupa_II.zona_II.toLocaleString('ro-RO'), TAXE.definitiva.grupa_II.zona_III.toLocaleString('ro-RO')], cy, false, [46, 45, 45, 46]);
    cy += 3;
    cy = miniChart(['Zonă', 'Grupa I'], [['Câmpie', TAXE.definitiva.grupa_I.zona_I], ['Deal', TAXE.definitiva.grupa_I.zona_II], ['Munte', TAXE.definitiva.grupa_I.zona_III]], 'Tarif scoatere definitivă Grupa I pe zone (lei/ha)', cy) || cy;
    P('Pentru scoaterea temporară se aplică tarife anuale (aproximativ 1/10 din valoarea definitivă), pe durata ocupării. ' + _normNote());

    // 11. REÎMPĂDURIRE
    page('REÎMPĂDURIRE'); SEC('11. OBLIGAȚIA DE REÎMPĂDURIRE');
    P('Scoaterea din fondul forestier este condiționată de obligația de reîmpădurire compensatorie, în raport diferențiat pe grupe funcționale (art. 37 alin. 5 Codul Silvic):');
    cy = tblRow(['Grupă', 'Raport', 'Obligație'], cy, true, [40, 30, 112]);
    cy = tblRow(['Grupa I', REIMP.grupa_I.raport, REIMP.grupa_I.nota], cy, false, [40, 30, 112]);
    cy = tblRow(['Grupa II', REIMP.grupa_II.raport, REIMP.grupa_II.nota], cy, false, [40, 30, 112]);
    cy += 3;
    P('Pentru parcela analizată (Grupa ' + (tx.grupa === 'grupa_I' ? 'I' : 'II') + '), reîmpădurirea compensatorie necesară este de ' + tx.reimpHa + ' ha (' + tx.reimpRaport + '). Terenul de reîmpădurire trebuie asigurat înainte de aprobare, iar lucrările se execută în termen de maximum 2 ani de la scoatere (art. 38 alin. 2). Neîndeplinirea obligației atrage sancțiuni și obligarea la reconstrucție ecologică.');

    // 12. PRAGURI + AVIZE
    page('APROBĂRI ȘI AVIZE'); SEC('12. PRAGURI DE APROBARE ȘI AVIZE');
    cy = tblRow(['Suprafață', 'Nivel de aprobare', 'Timp estimat'], cy, true, [40, 100, 42]);
    PRAGURI.forEach(function (r) { cy = tblRow(r, cy, false, [40, 100, 42]); });
    cy += 3;
    P('Pentru suprafața parcelei (' + tx.suprafataHa + ' ha), nivelul de aprobare estimat este: ' + tx.pragAprobare + ' (timp estimat ' + tx.pragTimp + ').');
    SEC('Avize necesare');
    cy = tblRow(['Aviz', 'Obligativitate'], cy, true, [120, 62]);
    AVIZE.forEach(function (r) { cy = checkY(cy, 14, TITLE, pg); cy = tblRow(r, cy, false, [120, 62]); });

    // 13. DOCUMENTE
    page('DOSARUL DE SCOATERE'); SEC('13. DOCUMENTELE DOSARULUI DE SCOATERE');
    DOCS.forEach(function (t) { P('• ' + t); });
    P('Piesa centrală a dosarului este studiul amenajistic / adeverința Ocolului Silvic, care confirmă apartenența la fondul forestier, unitatea amenajistică, categoria funcțională și caracteristicile arboretului. Memoriul tehnic justifică necesitatea și oportunitatea scoaterii, iar dovada asigurării terenului de reîmpădurire este condiție de admisibilitate.');

    // 14. INTERCONECTĂRI ECOSISTEM
    page('LEGĂTURI ECOSISTEM'); SEC('14. LEGĂTURI ÎN ECOSISTEMUL UrbanX');
    P('Datele și concluziile studiului silvic se corelează cu celelalte componente ale platformei, fără a le duplica:');
    P('• Indicele de Valoare Urbană (IVU) — dimensiunea „Mediu, verde și biodiversitate": acoperirea forestieră și proximitatea pădurilor cresc scorul de mediu; prezentul studiu detaliază la nivel de parcelă ceea ce IVU tratează agregat pe UAT.');
    P('• Modulul LOISIR (spații verzi & plămân urban): pădurile de Categoria III (recreere) din vecinătate se integrează în catalogul spațiilor verzi și în analiza de accesibilitate la natură.');
    P('• Studiul de profil silvic TERITORIAL (rang superior): tratează strategia forestieră la nivel de UAT/regiune; studiul de față este componenta punctuală, pe parcelă (rang inferior) — se completează, nu se suprapun.');
    P('• Studiile de obiect SKID/SSI: banda de protecție de 20 m față de pădure (art. 60) se corelează cu distanțele de securitate la incendiu pentru instalațiile GPL amplasate în vecinătatea fondului forestier.');
    P('• Studiul de Amplasament: contextul forestier și restricțiile silvice completează analiza teritorială, fără a repeta conținutul acesteia.');

    // 15. IMPACT
    page('IMPACT ȘI CONSERVARE'); SEC('15. IMPACT, SCENARII ȘI CONSERVARE');
    P('Reducerea suprafeței forestiere are impact asupra reglării hidrologice (pădurea reduce scurgerea și eroziunea), asupra biodiversității, a calității aerului și a microclimatului. Cu cât categoria funcțională este mai înaltă (I–II), cu atât impactul este mai grav și protecția legală mai strictă.');
    P('Scenariul recomandat pentru parcelă: ' + (cm.restr === 'critical' ? 'evitarea scoaterii — categorie de protecție; dezvoltarea se reorientează pe terenuri neforestiere.' : cm.restr === 'high' ? 'scoatere doar pentru dotări recreative compatibile (Cat. III), cu impact minim.' : 'scoatere posibilă cu respectarea integrală a obligației de reîmpădurire și a benzilor de protecție.') + ' În toate cazurile, decopertarea și conservarea solului forestier și reîmpădurirea compensatorie sunt obligatorii.');
    P('Măsuri de atenuare: menținerea unei benzi tampon vegetale, integrarea de plantații în proiect, contribuția la reconstrucția ecologică a altor suprafețe, corelarea cu managementul apelor pluviale pentru compensarea pierderii capacității de infiltrație a pădurii.');

    // 16. CONCLUZII
    page('CONCLUZII'); SEC('16. CONCLUZII');
    P('Terenul cu nr. cadastral ' + nrcad + ' (' + (area ? area.toLocaleString('ro-RO') : '—') + ' mp), situat în ' + (uat || 'UAT') + ', ' + tx.zonaLabel + ', ' + (site.inForest ? 'se suprapune cu fond forestier și necesită procedura completă de scoatere din fondul forestier național.' : site.forests.length ? 'se află în proximitatea pădurii; apartenența la fondul forestier se confirmă pe amenajamentul silvic.' : 'nu prezintă suprapunere forestieră conform surselor consultate.'));
    P('Încadrare funcțională estimată: Categoria ' + catF + ' (' + cm.den + '), regim de construire: ' + cm.constr + '. Taxă de scoatere definitivă estimată: ' + (+tx.taxaLei).toLocaleString('ro-RO') + ' lei; reîmpădurire compensatorie: ' + tx.reimpHa + ' ha (' + tx.reimpRaport + ').' + (site.n2000.length ? ' Parcela intersectează arii Natura 2000 — necesită Studiu de Evaluare Adecvată.' : ''));
    P('Studiul are caracter orientativ; fundamentarea oficială necesită amenajamentul silvic, avizul Gărzii Forestiere și al Ocolului Silvic administrator, precum și avizele de mediu aferente.');

    // ANEXE
    page('ANEXE'); SEC('ANEXE — REFERINȚE, SURSE, DISCLAIMER');
    cy = tblRow(['Act normativ', 'Obiect'], cy, true, [52, 130]);
    ACTE.forEach(function (r) { cy = checkY(cy, 15, TITLE, pg); cy = tblRow(r, cy, false, [52, 130]); });
    cy += 3;
    P('Surse de date: acoperire forestieră — OpenStreetMap (Overpass), prin proxy; tip pădure — Copernicus HRL Forest Type 2018 (EEA); arii protejate — EEA WDPA (Natura 2000); relief — Mapbox Terrain-RGB; tarife — HG 861/2009. ' + _normNote());
    P('DISCLAIMER: Document orientativ și preliminar, generat automat de platforma UrbanX pe baza datelor publice disponibile. NU înlocuiește amenajamentul silvic, studiul amenajistic și documentațiile de specialitate. Apartenența la fondul forestier, categoria funcțională și taxele se stabilesc oficial de Ocolul Silvic / Garda Forestieră, cu tariful în vigoare la data depunerii dosarului.');

    var fn = (G._stratFileName ? G._stratFileName('StudiuSilvic', { mode: 'parcela', nrcad: nrcad, localitate: uat }) : ('StudiuSilvic_' + nrcad)) + '.pdf';
    try { pdf.save(fn); } catch (e) { pdf.save('StudiuSilvic_' + nrcad + '.pdf'); }
    if (G.ss) G.ss('✅ Studiu Silvic generat (' + pdf.getNumberOfPages() + ' pag).');
  }

  G.generateSilvic = generateSilvic; G.silvic_load = silvicLoad; G.silvic_save = silvicSave;
  console.log('[Silvic] modul încărcat (window.generateSilvic)');
})(window);
