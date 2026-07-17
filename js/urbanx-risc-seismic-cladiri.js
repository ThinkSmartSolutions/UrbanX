/* ============================================================================
 * UrbanX — Clădiri cu risc seismic (js/urbanx-risc-seismic-cladiri.js)
 *
 * Date REALE (Florin, 17 iul: analiza dupacutremur.ro + "cum putem implementa in
 * orice oras din tara?"): dataset public CC BY 4.0 de la DupăCutremur.ro (Re:Rise +
 * geo-spatial.org), pe baza listei oficiale AMCCRS a Primăriei Municipiului
 * București — 2.507 clădiri expertizate tehnic, clasificate Rs1-Rs4 (P100-3) /
 * U1-U3 (P100-92, vechi). Descărcat, filtrat pe câmpuri esențiale, verificat
 * (vezi data/bucuresti-risc-seismic/README.md pt sursă+licență+metodologie).
 *
 * IMPORTANT — acest dataset e SPECIFIC MUNICIPIULUI BUCUREȘTI (AMCCRS e organism
 * al Primăriei Capitalei). NU exista un echivalent NATIONAL in acest format —
 * modulul e scris GENERIC pe UAT (citește data/{uatId}/cladiri-risc-seismic.geojson),
 * dar doar București are azi acest fișier. Pentru alt oraș: fără o listă oficială
 * publicată de primărie, NU se inventează clasificări (regula platformei).
 *
 * Zona de colaps NU e un fișier separat stocat — se calculează client-side cu
 * turf.buffer(cladire, h_3, {units:'meters'}), exact metodologia sursei (h_3 =
 * inaltime_estimata/3), evitand un al doilea fisier greu de 9,9MB.
 *
 * window._RiscSeismicCladiri: add(map, uatId) · addZoneColaps(map) · hide(map) ·
 * hasData(uatId)
 * ========================================================================== */
(function (G) {
  'use strict';

  var DATASET_UAT = { 'bucuresti-risc-seismic': true }; // UAT-uri cu dataset real disponibil azi

  var CULOARE_RISC = {
    RS1: '#7f1d1d', U1: '#7f1d1d',   // risc maxim de colaps ("pericol public")
    RS2: '#ef4444', U2: '#ef4444',   // avarii structurale majore probabile
    RS3: '#f59e0b', U3: '#f59e0b',   // moderat
    RS4: '#22c55e'                    // redus/conform
  };
  var LABEL_RISC = {
    RS1: 'Rs1 — risc maxim de colaps („pericol public”)', U1: 'U1 (vechi) — cea mai urgentă',
    RS2: 'Rs2 — avarii structurale majore probabile', U2: 'U2 (vechi)',
    RS3: 'Rs3 — moderat', U3: 'U3 (vechi) — cea mai puțin urgentă',
    RS4: 'Rs4 — redus/conform'
  };

  var SOURCE_ID = 'risc-seismic-cladiri-src', LAYER_ID = 'risc-seismic-cladiri-fill', LAYER_OUTLINE = 'risc-seismic-cladiri-outline';
  var SOURCE_COLAPS = 'risc-seismic-colaps-src', LAYER_COLAPS = 'risc-seismic-colaps-fill';
  var SOURCE_STRAZI = 'risc-seismic-strazi-src', LAYER_STRAZI = 'risc-seismic-strazi-line';

  function hasData(uatId) { return !!DATASET_UAT[uatId]; }

  function _colorExpr() {
    var stops = [];
    Object.keys(CULOARE_RISC).forEach(function (k) { stops.push(k, CULOARE_RISC[k]); });
    return ['match', ['get', 'incadrare']].concat(stops).concat(['#94a3b8']);
  }

  async function add(map, uatId) {
    uatId = uatId || 'bucuresti-risc-seismic';
    if (!map || !hasData(uatId)) { if (G.ss) G.ss('⚠ Nu există date reale de clădiri cu risc seismic pentru acest UAT — dataset disponibil azi doar pentru București (AMCCRS/DupăCutremur.ro).'); return false; }
    if (map.getSource(SOURCE_ID)) return true; // deja adaugat
    var resp = await fetch('data/' + uatId + '/cladiri.geojson');
    if (!resp.ok) { if (G.ss) G.ss('⚠ Eroare la încărcarea datelor de risc seismic (' + resp.status + ').'); return false; }
    var data = await resp.json();
    map.addSource(SOURCE_ID, { type: 'geojson', data: data });
    map.addLayer({ id: LAYER_ID, type: 'fill', source: SOURCE_ID, paint: { 'fill-color': _colorExpr(), 'fill-opacity': 0.65 } });
    map.addLayer({ id: LAYER_OUTLINE, type: 'line', source: SOURCE_ID, paint: { 'line-color': '#0f172a', 'line-width': 1 } });
    map.on('click', LAYER_ID, function (e) {
      var p = (e.features && e.features[0] && e.features[0].properties) || {};
      var incadrare = p.incadrare || '—';
      var culoare = CULOARE_RISC[incadrare] || '#94a3b8';
      new mapboxgl.Popup({ maxWidth: '280px' }).setLngLat(e.lngLat).setHTML(
        '<div style="font-family:\'IBM Plex Mono\',monospace;padding:6px">' +
        '<div style="font-weight:800;font-size:12px;color:' + culoare + '">' + (LABEL_RISC[incadrare] || incadrare) + '</div>' +
        '<div style="font-size:10px;color:#1e293b;margin-top:4px">' + esc_(p.tip_strada ? p.tip_strada + ' ' : '') + esc_(p.adresa || '') + (p.numar ? ' nr. ' + esc_(p.numar) : '') + (p.sector ? ', sector ' + esc_(p.sector) : '') + '</div>' +
        '<div style="font-size:9px;color:#475569;margin-top:3px">' +
        (p.niveluri_f ? 'Niveluri: ' + esc_(p.niveluri_f) + '<br>' : '') +
        (p.anul_const ? 'An construire: ' + esc_(p.anul_const) + '<br>' : '') +
        (p.anul_exper ? 'An expertizare: ' + esc_(p.anul_exper) + '<br>' : '') +
        (p.arie_desfa ? 'Arie desfășurată: ' + esc_(p.arie_desfa) + ' m²<br>' : '') +
        (p.regimul_de ? 'Regim: ' + esc_(p.regimul_de) : '') +
        '</div><div style="font-size:7px;color:rgba(100,120,150,.6);margin-top:4px">Sursă: lista oficială AMCCRS via DupăCutremur.ro (Re:Rise + geo-spatial.org), CC BY 4.0</div></div>'
      ).addTo(map);
    });
    map.on('mouseenter', LAYER_ID, function () { map.getCanvas().style.cursor = 'pointer'; });
    map.on('mouseleave', LAYER_ID, function () { map.getCanvas().style.cursor = ''; });
    if (G.ss) G.ss('🏚 ' + (data.features || []).length + ' clădiri cu risc seismic încărcate (' + uatId + ', sursă AMCCRS/DupăCutremur.ro).');
    return true;
  }

  // Zona de colaps estimată — buffer h_3 (inaltime/3) in jurul fiecarei cladiri RS1/U1
  // (risc maxim), exact metodologia documentata a sursei. Calculat client-side cu turf,
  // NU un fisier separat stocat (economie ~9,9MB fata de exportul original).
  function addZoneColaps(map) {
    if (!map || !map.getSource(SOURCE_ID) || !G.turf) { if (G.ss) G.ss('⚠ Încarcă întâi clădirile cu risc seismic (necesită și turf.js).'); return false; }
    if (map.getSource(SOURCE_COLAPS)) return true;
    var data = map.getSource(SOURCE_ID)._data;
    var zone = [];
    (data.features || []).forEach(function (f) {
      var incadrare = f.properties && f.properties.incadrare;
      var h3 = f.properties && (+f.properties.h_3);
      if ((incadrare !== 'RS1' && incadrare !== 'U1') || !h3) return;
      try {
        var buf = G.turf.buffer(f, h3, { units: 'meters' });
        buf.properties = { building_uid: f.properties.building_uid, adresa: f.properties.adresa };
        zone.push(buf);
      } catch (e) { /* geometrie invalida, se sare peste */ }
    });
    map.addSource(SOURCE_COLAPS, { type: 'geojson', data: { type: 'FeatureCollection', features: zone } });
    map.addLayer({ id: LAYER_COLAPS, type: 'fill', source: SOURCE_COLAPS, paint: { 'fill-color': '#7f1d1d', 'fill-opacity': 0.25 } }, LAYER_ID);
    if (G.ss) G.ss('☠ ' + zone.length + ' zone de colaps estimate (buffer h/3 conform metodologiei sursei) în jurul clădirilor Rs1/U1.');
    return true;
  }

  async function addStrazi(map, uatId) {
    uatId = uatId || 'bucuresti-risc-seismic';
    if (!map || !hasData(uatId)) return false;
    if (map.getSource(SOURCE_STRAZI)) return true;
    var resp = await fetch('data/' + uatId + '/strazi-risc-blocaj.geojson');
    if (!resp.ok) return false;
    var data = await resp.json();
    map.addSource(SOURCE_STRAZI, { type: 'geojson', data: data });
    map.addLayer({ id: LAYER_STRAZI, type: 'line', source: SOURCE_STRAZI, paint: { 'line-color': '#dc2626', 'line-width': 3, 'line-dasharray': [2, 1] } });
    if (G.ss) G.ss('🚧 ' + (data.features || []).length + ' segmente stradale cu risc de blocaj din dărâmături.');
    return true;
  }

  function esc_(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  function hide(map) {
    if (!map) return;
    [LAYER_ID, LAYER_OUTLINE, LAYER_COLAPS, LAYER_STRAZI].forEach(function (id) { if (map.getLayer(id)) map.removeLayer(id); });
    [SOURCE_ID, SOURCE_COLAPS, SOURCE_STRAZI].forEach(function (id) { if (map.getSource(id)) map.removeSource(id); });
  }

  G._RiscSeismicCladiri = { add: add, addZoneColaps: addZoneColaps, addStrazi: addStrazi, hide: hide, hasData: hasData, DATASET_UAT: DATASET_UAT, CULOARE_RISC: CULOARE_RISC, LABEL_RISC: LABEL_RISC };
  console.log('[UrbanX] Clădiri cu risc seismic (AMCCRS/DupăCutremur.ro) încărcat — window._RiscSeismicCladiri');
})(window);
