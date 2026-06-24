/* ============================================================================
 * UrbanX — 003: Modelul Superbloc (Barcelona, S. Rueda).
 * Logica de calcul = PURĂ (calculateSuperbloc, fără DOM). Desenul pe hartă +
 * dialogul = separate. MAP_VAR = window.map. Reflectat în SIDU/Masterplan/PMUD.
 * Complementar lui Superbloc.drawReal (analiză OSM reală) — aici: calculator
 * parametric + scenarii salvate + before/after + text auto pentru documente.
 * ========================================================================== */
(function (G) {
  'use strict';

  // ── LOGICĂ PURĂ ──
  function calculateSuperbloc(params) {
    var latura_m = params.latura_m, densitate_loc_ha = params.densitate_loc_ha, carosabil_eliberat_pct = params.carosabil_eliberat_pct;
    var ha = (latura_m * latura_m) / 10000;
    var mp = latura_m * latura_m;
    var strazi = mp * 0.20;
    var eliberat = strazi * (carosabil_eliberat_pct / 100);
    var verde = eliberat * 0.55;
    var piazze = eliberat * 0.45;
    var pop = Math.round(ha * densitate_loc_ha);
    var racire = Math.min(4, (verde / 1000) * 0.1);
    var co2 = Math.round((verde * 0.8) / 1000 * 10) / 10;
    var r = G.createModelResult('superbloc', 'Superbloc Barcelona', params);
    var roN = function (n) { try { return n.toLocaleString('ro'); } catch (e) { return '' + n; } };

    r.metrics = [
      { id: 'spatiu', label: 'Spațiu recâștigat', value: Math.round(eliberat), unit: 'mp', direction: 'positive' },
      { id: 'verde', label: 'Verde nou', value: Math.round(verde), unit: 'mp', direction: 'positive' },
      { id: 'piazze', label: 'Piațete/joacă', value: Math.round(piazze), unit: 'mp', direction: 'positive' },
      { id: 'pop', label: 'Locuitori deserviți', value: pop, unit: 'loc', direction: 'positive' },
      { id: 'racire', label: 'Răcire UHI', value: -racire, unit: '°C', direction: 'positive' },
      { id: 'co2', label: 'Stocare CO₂/an', value: co2, unit: 't CO₂', direction: 'positive' },
      { id: 'trafic', label: 'Trafic interior', value: -25, unit: '%', direction: 'positive' }
    ];
    r.mapLayers = [
      { id: 'superbloc-perimeter', type: 'line', beforePaint: { 'line-color': '#F97316', 'line-width': 2, 'line-opacity': 0.9 }, afterPaint: { 'line-color': '#F97316', 'line-width': 3, 'line-opacity': 0.9 } },
      { id: 'superbloc-interior-streets', type: 'line', beforePaint: { 'line-color': '#555555', 'line-width': 2, 'line-opacity': 0.8 }, afterPaint: { 'line-color': '#639922', 'line-width': 8, 'line-opacity': 0.85 } },
      { id: 'superbloc-plazas', type: 'circle', beforePaint: { 'circle-radius': 0, 'circle-color': '#97C459', 'circle-opacity': 0 }, afterPaint: { 'circle-radius': 12, 'circle-color': '#97C459', 'circle-opacity': 0.9 } }
    ];
    r.documentContent = {
      siduSection: {
        projectTitle: 'Superbloc pilot — regenerare cartier rezidențial (model Barcelona)',
        description: 'Proiectul propune implementarea conceptului de superbloc (superilla) în municipiul Iași. Modelul Barcelona, dezvoltat de Salvador Rueda la Agència d\'Ecologia Urbana, constă în gruparea a aproximativ 9 cvartale într-o unitate de ' + latura_m + 'm × ' + latura_m + 'm (' + ha.toFixed(1) + ' ha), în care traficul de tranzit este deviat pe arterele perimetrale, iar rețeaua interioară de străzi devine o zonă cu viteză redusă de 10 km/h, cu prioritate pentru pietoni și bicicliști și acces păstrat doar pentru rezidenți, livrări și vehicule de urgență. Din suprafața carosabilă interioară se eliberează ' + roN(Math.round(eliberat)) + ' mp de spațiu public, redistribuit în ' + roN(Math.round(verde)) + ' mp de spații verzi plantate cu vegetație nativă și ' + roN(Math.round(piazze)) + ' mp de piațete, locuri de joacă și terase de proximitate. Intervenția deservește direct aproximativ ' + roN(pop) + ' de locuitori și produce o răcire estimată de ' + racire.toFixed(1) + '°C în zilele caniculare față de scenariul de referință, contribuind la atenuarea insulei de căldură urbană. Spre deosebire de regenerările clasice, modelul nu presupune demolări sau exproprieri — se reconfigurează exclusiv suprafețele stradale aflate deja în domeniul public. Proiectul se integrează în portofoliul SIDU ca proiect-pilot de regenerare a cartierelor rezidențiale dense (Nicolina, Dacia, Canta, Alexandru cel Bun) și creează precedentul metodologic pentru extinderea grilei de superblocuri la nivelul întregului oraș, în corelare obligatorie cu PMUD (rerutarea traficului) și cu transpunerea în PUG/PUZ a noului regim al spațiului stradal.',
        justification: 'Iașul are 3,3 mp spațiu verde/locuitor față de standardul OMS de 9 mp. Cartierele socialiste (Nicolina, Dacia, Canta) au rată ridicată de impermeabilizare și caracter monofuncțional. Superbloc-ul demonstrează transformarea fără demolare sau exproprieri.',
        costEstimate: (Math.round(eliberat * 150 / 1000000 * 10) / 10) + ' M€ – ' + (Math.round(eliberat * 250 / 1000000 * 10) / 10) + ' M€ (150–250 €/mp, finanțare POR 2021–2027)',
        timeline: 'Termen scurt (2026–2028): studiu trafic + PUZ; Termen mediu (2028–2030): execuție',
        legalBasis: 'Legea 350/2001 Art. 5; HG 874/2019 — PMUD; Regulamentul UE 2021/1060',
        indicators: [
          'mp spațiu verde/locuitor în zonă: 3,3 → ' + (3.3 + verde / (pop * 10)).toFixed(1) + ' mp/loc',
          'Transfer modal pietonal/ciclistic: ~28% → 36% în zona superbloc',
          'Temperatură zilele caniculare: reducere ' + racire.toFixed(1) + '°C față de baseline',
          'Accidente rutiere în zonă: reducere estimată 40%'
        ]
      },
      masterplanSection: {
        interventionType: 'Regenerare spațiu public stradal — Superbloc (S. Rueda)',
        affectedArea: '~' + ha.toFixed(1) + ' ha',
        phasing: [
          'Faza 0 (6 luni): Studiu de trafic, consultare comunitate, PUZ',
          'Faza 1 (12 luni): 2 intersecții pilot + 1 stradă interioară',
          'Faza 2 (18 luni): Extindere grilă interioară, amenajare piațete',
          'Faza 3 (12 luni): Activare parteruri, vegetație matură'
        ],
        designPrinciples: [
          'Fără demolare sau expropriere — suprafețele stradale existente',
          'Permeabilitate pietonală în toate direcțiile',
          'Vegetație nativă, rezistentă la secetă',
          'Mobilier urban modular, adaptabil după feedback comunitate'
        ]
      },
      pmudSection: {
        measureType: 'Restricție trafic tranzit + zonă prioritate pieton/biciclist (10 km/h)',
        trafficImpact: 'Deviere ~' + Math.round(pop * 0.3) + ' vehicule/zi pe arterele perimetrale',
        modalShift: '-25% trafic auto interior, +15% pietonal, +8% ciclistic. Reducere CO₂: ' + co2 + ' t/an',
        infrastructureNeeded: [
          'Semnalizare rutieră la toate intrările (8–12 intersecții)',
          'Bolarde retractabile la intrările interioare',
          'Piste cicliste pe perimetru (' + (Math.round(latura_m * 4 / 1000 * 10) / 10) + ' km)',
          'Stații bike-sharing la min 2 colțuri perimetru'
        ]
      }
    };
    return r;
  }

  // ── HARTĂ (geometrie sintetică) — MAP_VAR = window.map ──
  function addSuperblocToMap(mapInstance, center, latura_m) {
    if (!mapInstance) { console.error('003: addSuperblocToMap — map null'); return; }
    if (!center) { console.error('003: center null'); return; }
    var dLat = latura_m / 111000, dLng = latura_m / (111000 * Math.cos(center.lat * Math.PI / 180)), h = 0.5, t = 1 / 3;
    var perimeter = { type: 'Feature', geometry: { type: 'Polygon', coordinates: [[[center.lng - dLng * h, center.lat - dLat * h], [center.lng + dLng * h, center.lat - dLat * h], [center.lng + dLng * h, center.lat + dLat * h], [center.lng - dLng * h, center.lat + dLat * h], [center.lng - dLng * h, center.lat - dLat * h]]] }, properties: {} };
    var streets = { type: 'FeatureCollection', features: [
      { type: 'Feature', geometry: { type: 'LineString', coordinates: [[center.lng - dLng * h, center.lat - dLat * t], [center.lng + dLng * h, center.lat - dLat * t]] }, properties: {} },
      { type: 'Feature', geometry: { type: 'LineString', coordinates: [[center.lng - dLng * h, center.lat + dLat * t], [center.lng + dLng * h, center.lat + dLat * t]] }, properties: {} },
      { type: 'Feature', geometry: { type: 'LineString', coordinates: [[center.lng - dLng * t, center.lat - dLat * h], [center.lng - dLng * t, center.lat + dLat * h]] }, properties: {} },
      { type: 'Feature', geometry: { type: 'LineString', coordinates: [[center.lng + dLng * t, center.lat - dLat * h], [center.lng + dLng * t, center.lat + dLat * h]] }, properties: {} }
    ] };
    var plazas = { type: 'FeatureCollection', features: [[-t, -t], [-t, t], [t, -t], [t, t]].map(function (d) { return { type: 'Feature', geometry: { type: 'Point', coordinates: [center.lng + dLng * d[0], center.lat + dLat * d[1]] }, properties: {} }; }) };
    var setOrAdd = function (id, data) { try { if (mapInstance.getSource(id)) mapInstance.getSource(id).setData(data); else mapInstance.addSource(id, { type: 'geojson', data: data }); } catch (e) { console.error('003 source ' + id, e); } };
    setOrAdd('superbloc-perimeter-src', perimeter); setOrAdd('superbloc-interior-src', streets); setOrAdd('superbloc-plazas-src', plazas);
    var addLayer = function (id, type, source, paint) { try { if (!mapInstance.getLayer(id)) mapInstance.addLayer({ id: id, type: type, source: source, paint: paint }); } catch (e) { console.error('003 layer ' + id, e); } };
    addLayer('superbloc-perimeter', 'line', 'superbloc-perimeter-src', { 'line-color': '#F97316', 'line-width': 2, 'line-dasharray': [4, 2], 'line-opacity': 0.9 });
    addLayer('superbloc-interior-streets', 'line', 'superbloc-interior-src', { 'line-color': '#555555', 'line-width': 2, 'line-opacity': 0.8 });
    addLayer('superbloc-plazas', 'circle', 'superbloc-plazas-src', { 'circle-radius': 0, 'circle-color': '#97C459', 'circle-opacity': 0.9 });
  }
  function removeSuperblocFromMap(mapInstance) {
    if (!mapInstance) return;
    ['superbloc-perimeter', 'superbloc-interior-streets', 'superbloc-plazas'].forEach(function (id) { try { if (mapInstance.getLayer(id)) mapInstance.removeLayer(id); } catch (e) {} });
    ['superbloc-perimeter-src', 'superbloc-interior-src', 'superbloc-plazas-src'].forEach(function (id) { try { if (mapInstance.getSource(id)) mapInstance.removeSource(id); } catch (e) {} });
  }

  // ── DIALOG (overlay propriu, pattern UrbanX) ──
  var _sbParams = { latura_m: 400, densitate_loc_ha: 200, carosabil_eliberat_pct: 65 };
  var _ov = null;
  function renderSuperblocDialog() {
    closeSuperblocDialog();
    var ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(2,6,16,.7);z-index:9100;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)';
    ov.onclick = function (e) { if (e.target === ov) closeSuperblocDialog(); };
    var box = document.createElement('div');
    box.id = 'superbloc-dialog';
    box.style.cssText = 'position:relative;background:#0b1424;color:#e6edf7;width:min(560px,96vw);max-height:92vh;overflow:auto;border:1px solid rgba(249,115,22,.4);border-radius:14px;font-family:system-ui,sans-serif;padding:18px 20px';
    ov.appendChild(box); document.body.appendChild(ov); _ov = ov;

    var fields = [
      { key: 'latura_m', label: 'Latură superbloc (m)', val: _sbParams.latura_m },
      { key: 'densitate_loc_ha', label: 'Densitate (loc/ha)', val: _sbParams.densitate_loc_ha },
      { key: 'carosabil_eliberat_pct', label: '% carosabil eliberat', val: _sbParams.carosabil_eliberat_pct }
    ];
    box.innerHTML =
      '<div id="sb-selector" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px"></div>' +
      '<div style="display:flex;align-items:center;gap:8px"><span style="background:#F97316;width:16px;height:16px;border-radius:3px;display:inline-block"></span>' +
      '<h3 style="margin:0;font-size:17px;font-weight:700">Superbloc (model Barcelona)</h3></div>' +
      '<p style="margin:4px 0 12px;font-size:12px;opacity:0.55">Tranzit pe perimetru · interior pentru oameni · reflectat în SIDU, Masterplan, PMUD</p>' +
      '<button onclick="closeSuperblocDialog()" style="position:absolute;top:12px;right:14px;background:none;border:0;color:#94a3b8;font-size:20px;cursor:pointer">×</button>' +
      '<div style="font-size:11px;font-weight:700;color:#F97316;letter-spacing:1px;margin-bottom:10px">PARAMETRI</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">' +
      fields.map(function (f) { return '<div><label style="font-size:12px;opacity:0.65;display:block;margin-bottom:4px">' + f.label + '</label>' +
        '<input type="number" value="' + f.val + '" oninput="_sbSetParam(\'' + f.key + '\',this.value)" style="width:100%;padding:8px 12px;border-radius:6px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:inherit;font-size:14px;box-sizing:border-box"></div>'; }).join('') + '</div>' +
      '<div style="display:flex;gap:10px;margin-bottom:16px"><button class="uxc-btn uxc-btn--primary" style="flex:1" onclick="runSuperblocCalc()">▶ Calculează + desenează</button>' +
      '<button class="uxc-btn uxc-btn--sec" id="sb-save-btn" style="display:none" onclick="saveSuperblocScenario()">💾 Salvează</button></div>' +
      '<div id="sb-slider" style="display:none;margin-bottom:16px;padding:12px;background:rgba(255,255,255,0.04);border-radius:8px"></div>' +
      '<div id="sb-metrics" style="display:none;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px"></div>' +
      '<p id="sb-note" style="display:none;font-size:11px;opacity:0.5;margin:0 0 8px">Interior 10 km/h · prioritate pieton/biciclist · acces rezidenți, livrări, urgențe</p>' +
      '<div id="sb-export-wrap" style="display:none"><button class="uxc-btn uxc-btn--sec" style="width:100%;color:#93c5fd;border-color:rgba(46,117,182,0.4);background:rgba(46,117,182,0.1)" onclick="_toggleSbExport()">▼ Export SIDU / Masterplan / PMUD</button><div id="sb-export" style="display:none;margin-top:8px"></div></div>' +
      '<p style="font-size:11px;opacity:0.35;margin-top:12px;line-height:1.4">Model Barcelona (S. Rueda). Reflectat în SIDU, Masterplan și PMUD. Pentru analiză pe străzile reale: panoul Superbloc → „Aplică pe străzile reale (OSM)".</p>';
    renderModelSelector('sb-selector', 'superbloc');
  }
  function _sbSetParam(k, v) { _sbParams[k] = parseFloat(v) || 0; }
  function runSuperblocCalc() {
    var result = calculateSuperbloc(_sbParams);
    G.UrbanModelsStore.setActive(result);
    var mapInst = G.map;
    var center = mapInst ? mapInst.getCenter() : null;
    if (center) { addSuperblocToMap(mapInst, { lat: center.lat, lng: center.lng }, _sbParams.latura_m); G.initMapTransitionListener(mapInst); }
    G.UrbanModelsStore.setTransition(100);
    var sliderEl = document.getElementById('sb-slider'); if (sliderEl) { sliderEl.style.display = 'block'; G.renderBeforeAfterSlider('sb-slider', 100, false); }
    var metricsEl = document.getElementById('sb-metrics');
    if (metricsEl) {
      metricsEl.style.display = 'grid';
      metricsEl.innerHTML = result.metrics.map(function (m) {
        var roN = function (n) { try { return n.toLocaleString('ro'); } catch (e) { return '' + n; } };
        var disp = (m.unit === '%' || m.unit === '°C') ? ((m.value > 0 ? '+' : '') + m.value + m.unit) : (m.value > 0 ? roN(m.value) + ' ' + m.unit : m.value + ' ' + m.unit);
        return '<div style="background:rgba(255,255,255,0.05);border-radius:8px;padding:10px 12px;text-align:center"><div style="font-size:16px;font-weight:700;color:' + (m.direction === 'positive' ? '#97C459' : '#F97316') + '">' + disp + '</div><div style="font-size:11px;opacity:0.55;margin-top:2px">' + m.label + '</div></div>';
      }).join('');
    }
    ['sb-note', 'sb-export-wrap', 'sb-save-btn'].forEach(function (id) { var el = document.getElementById(id); if (el) el.style.display = id === 'sb-save-btn' ? 'inline-block' : 'block'; });
  }
  function saveSuperblocScenario() {
    var r = G.UrbanModelsStore.activeResult; if (!r) return;
    G.UrbanModelsStore.save('Superbloc ' + _sbParams.latura_m + 'm — ' + new Date().toLocaleDateString('ro'), r);
    var btn = document.getElementById('sb-save-btn'); if (btn) { btn.textContent = '✓ Salvat'; setTimeout(function () { btn.textContent = '💾 Salvează'; }, 2000); }
  }
  function _toggleSbExport() {
    var el = document.getElementById('sb-export'); var btn = document.querySelector('#sb-export-wrap .uxc-btn'); if (!el) return;
    var open = el.style.display === 'none'; el.style.display = open ? 'block' : 'none';
    if (btn) btn.textContent = open ? '▲ Ascunde' : '▼ Export SIDU / Masterplan / PMUD';
    if (open && G.UrbanModelsStore.activeResult) G.renderDocumentExport('sb-export', G.UrbanModelsStore.activeResult.documentContent);
  }
  function closeSuperblocDialog() { if (_ov) { try { _ov.remove(); } catch (e) {} _ov = null; } try { removeSuperblocFromMap(G.map); } catch (e) {} }

  // ── SELECTOR DE MODELE ──
  var MODEL_CONFIGS = [
    { id: 'superbloc', label: 'Superbloc BCN', icon: '🏙️', color: '#F97316' },
    { id: 'city15', label: 'Oraș 15 Min', icon: '⏱️', color: '#BA7517' },
    { id: 'tod', label: 'TOD', icon: '🚉', color: '#534AB7' },
    { id: 'corridor', label: 'Coridor Mixt', icon: '🏪', color: '#1D9E75' },
    { id: 'sponge', label: 'Sponge City', icon: '💧', color: '#378ADD' },
    { id: 'r330300', label: '3-30-300', icon: '🌳', color: '#2E9E5B' },
    { id: 'sdg117', label: 'SDG 11.7', icon: '🏛️', color: '#C2410C' },
    { id: 'walkscore', label: 'Walk Score', icon: '🚶', color: '#0E7C5A' },
    { id: 'gvi', label: 'Green View', icon: '🌿', color: '#3FA34D' },
    { id: 'spacesyntax', label: 'Space Syntax', icon: '🔗', color: '#7C3AED' },
    { id: 'noise', label: 'Zgomot (END)', icon: '🔊', color: '#0EA5A5' },
    { id: 'lst', label: 'Căldură (LST)', icon: '🌡️', color: '#B91C1C' },
    { id: 'mixuse', label: 'Mix funcțional', icon: '🧩', color: '#D97706' }
  ];
  function renderModelSelector(containerId, activeId) {
    var el = document.getElementById(containerId); if (!el) return;
    el.innerHTML = MODEL_CONFIGS.map(function (m) {
      var act = activeId === m.id;
      return '<button class="model-sel-btn' + (act ? ' active' : '') + '" onclick="_openUrbanModel(\'' + m.id + '\')" style="' + (act ? 'border-color:' + m.color + ';color:' + m.color + ';background:' + m.color + '22' : '') + '">' + m.icon + ' ' + m.label + '</button>';
    }).join('');
  }
  // superbloc → dialogul propriu; restul → dialogul generic standardizat (003 FAZA 4)
  function _openUrbanModel(id) {
    closeSuperblocDialog(); if (G.closeUrbanModelDialog) G.closeUrbanModelDialog();
    if (id === 'superbloc') { renderSuperblocDialog(); return; }
    if (G.renderUrbanModelDialog) { G.renderUrbanModelDialog(id); return; }
    try { if (G.SimLab && G.SimLab.openDashboard) G.SimLab.openDashboard(id); } catch (e) { console.warn('003 openUrbanModel', e); }
  }

  G.calculateSuperbloc = calculateSuperbloc;
  G.addSuperblocToMap = addSuperblocToMap; G.removeSuperblocFromMap = removeSuperblocFromMap;
  G.renderSuperblocDialog = renderSuperblocDialog; G.runSuperblocCalc = runSuperblocCalc;
  G.saveSuperblocScenario = saveSuperblocScenario; G.closeSuperblocDialog = closeSuperblocDialog;
  G._toggleSbExport = _toggleSbExport; G._sbSetParam = _sbSetParam;
  G.MODEL_CONFIGS = MODEL_CONFIGS; G.renderModelSelector = renderModelSelector; G._openUrbanModel = _openUrbanModel;
})(window);
