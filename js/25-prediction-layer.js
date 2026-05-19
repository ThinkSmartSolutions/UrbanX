// ═══════════════════════════════════════════════════════════════════════════
// 25-prediction-layer.js — Prediction Heatmap Layer
// UrbanX TSS·FG | v1.0 | 19 mai 2026
//
// Adaugă pe hartă un layer de predicție urbanistică:
//   - Heatmap colorat: roșu=probabil, albastru=improbabil
//   - Filtru orizont temporal: 2/5/10/30 ani
//   - Date din Supabase urbanx_predictions
//   - Buton toggle în topbar
//
// DEPENDENȚE: Mapbox GL JS (map global), Supabase config
// ═══════════════════════════════════════════════════════════════════════════

(function(){
  'use strict';

  const SB_URL = (typeof _SUPABASE_URL !== 'undefined') ? _SUPABASE_URL : '';
  const SB_KEY = (typeof _SUPABASE_ANON_KEY !== 'undefined') ? _SUPABASE_ANON_KEY : '';

  const LAYER_ID   = 'urbanx-prediction-heatmap';
  const SOURCE_ID  = 'urbanx-prediction-source';

  // Orizonturi disponibile
  const HORIZONS = [
    { value: 2,  label: '2 ani',  field: 'score_2y'  },
    { value: 5,  label: '5 ani',  field: 'score_5y'  },
    { value: 10, label: '10 ani', field: 'score_10y' },
    { value: 30, label: '30 ani', field: 'score_30y' },
  ];

  let _active   = false;
  let _horizon  = 5;
  let _data     = null;
  let _mapReady = false;

  // ── Init: buton în topbar ─────────────────────────────────────────────────
  function _init(){
    _injectButton();
    _waitForMap();
    console.log('[PredictionLayer v1] ✅ loaded');
  }

  function _injectButton(){
    if(document.getElementById('btn-prediction')) return;
    const topbar = document.getElementById('topbar');
    if(!topbar) return;

    const btn = document.createElement('button');
    btn.id        = 'btn-prediction';
    btn.className = 'tb-btn';
    btn.innerHTML = '🔮 Predicție';
    btn.title     = 'Heatmap probabilitate dezvoltare urbanistică';
    btn.onclick   = _toggle;
    topbar.appendChild(btn);
  }

  function _waitForMap(){
    const check = setInterval(()=>{
      const m = _getMap();
      if(m && typeof m.addSource === 'function'){
        clearInterval(check);
        _mapReady = true;
        if(m.loaded()) _setupMap(m);
        else m.on('load', ()=>_setupMap(m));
      }
    }, 800);
  }

  function _getMap(){
    return (typeof map !== 'undefined' && map) ||
           (typeof _map !== 'undefined' && _map) ||
           null;
  }

  // ── Setup Mapbox layer ────────────────────────────────────────────────────
  function _setupMap(m){
    // Source GeoJSON — populată când se activează
    if(!m.getSource(SOURCE_ID)){
      m.addSource(SOURCE_ID, {
        type:    'geojson',
        data:    { type: 'FeatureCollection', features: [] },
        cluster: false,
      });
    }

    // Heatmap layer
    if(!m.getLayer(LAYER_ID)){
      m.addLayer({
        id:     LAYER_ID,
        type:   'heatmap',
        source: SOURCE_ID,
        layout: { visibility: 'none' },
        paint:  {
          // Intensitate bazată pe scor 0-100
          'heatmap-weight': [
            'interpolate', ['linear'],
            ['get', 'score'],
            0,   0,
            100, 1
          ],
          'heatmap-intensity': [
            'interpolate', ['linear'], ['zoom'],
            10, 0.5,
            15, 1.5
          ],
          'heatmap-radius': [
            'interpolate', ['linear'], ['zoom'],
            10, 20,
            15, 50
          ],
          'heatmap-color': [
            'interpolate', ['linear'],
            ['heatmap-density'],
            0,   'rgba(33,102,172,0)',
            0.2, 'rgb(103,169,207)',
            0.4, 'rgb(209,229,240)',
            0.6, 'rgb(253,219,199)',
            0.8, 'rgb(239,138,98)',
            1,   'rgb(178,24,43)'
          ],
          'heatmap-opacity': 0.7,
        },
      });
    }

    // Circle layer pentru zoom mare (individual)
    if(!m.getLayer(LAYER_ID+'-circles')){
      m.addLayer({
        id:     LAYER_ID+'-circles',
        type:   'circle',
        source: SOURCE_ID,
        layout: { visibility: 'none' },
        minzoom: 13,
        paint: {
          'circle-radius': 8,
          'circle-color': [
            'interpolate', ['linear'], ['get','score'],
            0,  '#3b82f6',
            40, '#fbbf24',
            70, '#ef4444',
            100,'#7f1d1d'
          ],
          'circle-opacity': 0.8,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        },
      });

      // Popup la click
      m.on('click', LAYER_ID+'-circles', e=>{
        const props = e.features[0].properties;
        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(`
            <div style="font-family:inherit;font-size:12px">
              <b style="color:#d4af37">UTR ${props.utr_code}</b><br>
              📊 Scor: <b>${props.score}/100</b><br>
              ⏱ Orizont: <b>${_horizon} ani</b><br>
              🎯 Driver: ${props.driver||'—'}<br>
              ⚠️ Risc: <span style="color:${props.risk==='high'?'#f87171':props.risk==='medium'?'#fbbf24':'#34d399'}">${props.risk}</span>
            </div>
          `)
          .addTo(m);
      });
    }
  }

  // ── Toggle layer ──────────────────────────────────────────────────────────
  async function _toggle(){
    const btn = document.getElementById('btn-prediction');

    if(_active){
      _hide();
      if(btn) btn.classList.remove('on');
      _active = false;
      _removePredictionPanel();
      return;
    }

    _active = true;
    if(btn){ btn.classList.add('on'); btn.innerHTML = '⏳ Predicție…'; }

    await _loadAndShow();

    if(btn) btn.innerHTML = '🔮 Predicție';
    _showPredictionPanel();
  }

  async function _loadAndShow(){
    const m = _getMap();
    if(!m || !_mapReady) return;

    // Fetch date din Supabase
    if(!_data){
      _data = await _fetchPredictions();
    }

    if(!_data || _data.length === 0){
      if(typeof ss==='function') ss('⚠️ Nicio predicție în baza de date. Rulați prediction_engine.py mai întâi.');
      _active = false;
      document.getElementById('btn-prediction')?.classList.remove('on');
      return;
    }

    _updateSource(m, _data, _horizon);
    m.setLayoutProperty(LAYER_ID, 'visibility', 'visible');
    m.setLayoutProperty(LAYER_ID+'-circles', 'visibility', 'visible');
    if(typeof ss==='function') ss(`🔮 Predicție ${_horizon} ani: ${_data.length} zone afișate`);
  }

  function _hide(){
    const m = _getMap();
    if(!m) return;
    if(m.getLayer(LAYER_ID)) m.setLayoutProperty(LAYER_ID, 'visibility', 'none');
    if(m.getLayer(LAYER_ID+'-circles')) m.setLayoutProperty(LAYER_ID+'-circles', 'visibility', 'none');
  }

  // ── Fetch predicții ───────────────────────────────────────────────────────
  async function _fetchPredictions(){
    if(!SB_URL) return _demoData();
    try {
      const r = await fetch(
        `${SB_URL}/rest/v1/urbanx_predictions?order=score_5y.desc&limit=500`,
        { headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${SB_KEY}` }}
      );
      if(!r.ok) return _demoData();
      const rows = await r.json();
      if(!rows || rows.length === 0) return _demoData();
      return rows;
    } catch(e){
      console.warn('[PredictionLayer] fetch failed, demo mode:', e.message);
      return _demoData();
    }
  }

  // ── Update source ─────────────────────────────────────────────────────────
  function _updateSource(m, data, horizon){
    const field = HORIZONS.find(h=>h.value===horizon)?.field || 'score_5y';
    const features = data
      .filter(r=>r.lon && r.lat)
      .map(r=>({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [r.lon, r.lat] },
        properties: {
          uat_code: r.uat_code,
          utr_code: r.utr_code,
          score:    r[field] || r.score_5y || 0,
          risk:     r.risk_level || 'medium',
          driver:   r.main_driver || '',
        },
      }));

    const src = m.getSource(SOURCE_ID);
    if(src) src.setData({ type: 'FeatureCollection', features });
  }

  // ── Panel orizonturi ──────────────────────────────────────────────────────
  function _showPredictionPanel(){
    if(document.getElementById('prediction-panel')) return;

    const panel = document.createElement('div');
    panel.id = 'prediction-panel';
    panel.style.cssText = `
      position:fixed; bottom:44px; left:10px; z-index:85;
      background:rgba(10,16,30,.95); border:1px solid rgba(139,92,246,.4);
      border-radius:12px; padding:10px 12px; min-width:200px;
      backdrop-filter:blur(8px); box-shadow:0 4px 20px rgba(0,0,0,.5);
    `;

    panel.innerHTML = `
      <div style="font-size:10px;font-weight:700;color:#8b5cf6;
           text-transform:uppercase;letter-spacing:.07em;margin-bottom:8px">
        🔮 Predicție Urbanistică
      </div>
      <div style="font-size:11px;color:#64748b;margin-bottom:8px">Orizont temporal:</div>
      <div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:10px">
        ${HORIZONS.map(h=>`
          <button id="pred-h-${h.value}" onclick="window._rvPredSetHorizon(${h.value})"
            style="padding:5px 10px;border-radius:6px;font-size:11px;font-weight:700;
            cursor:pointer;border:1px solid rgba(139,92,246,.3);font-family:inherit;
            background:${_horizon===h.value?'rgba(139,92,246,.3)':'rgba(139,92,246,.08)'};
            color:${_horizon===h.value?'#a78bfa':'#64748b'}">
            ${h.label}
          </button>`).join('')}
      </div>
      <div style="font-size:10px;color:#374151;line-height:1.5">
        Roșu = probabilitate înaltă<br>
        Albastru = probabilitate scăzută
      </div>
      <button onclick="document.getElementById('prediction-panel')?.remove();window._rvPredHide&&_rvPredHide()"
        style="margin-top:8px;width:100%;padding:5px;border-radius:6px;
        background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);
        color:#f87171;font-size:11px;cursor:pointer;font-family:inherit">
        ✕ Dezactivează layer
      </button>
    `;
    document.body.appendChild(panel);
  }

  function _removePredictionPanel(){
    document.getElementById('prediction-panel')?.remove();
  }

  // ── API public ────────────────────────────────────────────────────────────
  window._rvPredSetHorizon = function(years){
    _horizon = years;
    HORIZONS.forEach(h=>{
      const btn = document.getElementById(`pred-h-${h.value}`);
      if(btn){
        const active = h.value === years;
        btn.style.background = active ? 'rgba(139,92,246,.3)' : 'rgba(139,92,246,.08)';
        btn.style.color      = active ? '#a78bfa' : '#64748b';
      }
    });
    const m = _getMap();
    if(m && _data) _updateSource(m, _data, _horizon);
    if(typeof ss==='function') ss(`🔮 Predicție ${years} ani actualizată`);
  };

  window._rvPredHide = function(){
    _hide();
    _active = false;
    document.getElementById('btn-prediction')?.classList.remove('on');
  };

  // ── Date demo (când Supabase nu e configurat) ──────────────────────────────
  function _demoData(){
    return [
      {uat_code:'RO-CJ-001',utr_code:'L1a',lat:46.77,lon:23.59,score_2y:30,score_5y:55,score_10y:72,score_30y:85,risk_level:'medium',main_driver:'pot_utilizare_inv'},
      {uat_code:'RO-CJ-001',utr_code:'M1', lat:46.78,lon:23.61,score_2y:55,score_5y:75,score_10y:88,score_30y:92,risk_level:'high',  main_driver:'functiune_score'},
      {uat_code:'RO-CJ-001',utr_code:'C2', lat:46.76,lon:23.58,score_2y:70,score_5y:85,score_10y:92,score_30y:95,risk_level:'high',  main_driver:'functiune_score'},
      {uat_code:'RO-CJ-001',utr_code:'V1', lat:46.75,lon:23.60,score_2y:5, score_5y:10,score_10y:15,score_30y:20,risk_level:'low',   main_driver:'functiune_score'},
      {uat_code:'RO-B',utr_code:'L2',      lat:44.43,lon:26.10,score_2y:45,score_5y:65,score_10y:78,score_30y:88,risk_level:'medium',main_driver:'doc_age_score'},
      {uat_code:'RO-B',utr_code:'M2',      lat:44.44,lon:26.11,score_2y:60,score_5y:78,score_10y:89,score_30y:94,risk_level:'high',  main_driver:'functiune_score'},
      {uat_code:'RO-TM-001',utr_code:'L1a',lat:45.76,lon:21.23,score_2y:35,score_5y:58,score_10y:74,score_30y:86,risk_level:'medium',main_driver:'pot_utilizare_inv'},
    ];
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ()=>setTimeout(_init, 1000));
  } else {
    setTimeout(_init, 1000);
  }

})();
