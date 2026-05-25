/**
 * rlu-mihaieminescu.js — Comune Mihai Eminescu, jud. Botoșani
 * SIRUTA: 38063 | Cheie: RO-BT-38063
 * STATUS: Limite intravilan disponibile (DXF PUG 2020)
 *         RLU (parametrii POT/CUT/H) — LIPSĂ, de integrat în sesiunea următoare
 * Sate: Ipotești, Stăncești, Cătămărăști, Cătămărăști Deal,
 *       Cucorăni, Cervicești, Mânăiești, Bâlseni
 * API public: window._RLU_ME (stub)
 */
(function(window){
  'use strict';

  var UAT_KEY  = 'RO-BT-38063';
  var UAT_SLUG = 'comuna-mihaieminescu';
  var PUG_URL  = 'data/comuna-mihaieminescu/pug.geojson';

  var _pugIdx = null;
  var _ready  = false;

  function _loadPUG(){
    return fetch(PUG_URL)
      .then(function(r){ return r.json(); })
      .then(function(gj){
        _pugIdx = gj.features
          .filter(function(f){ return f.geometry && f.properties && f.properties.utr; })
          .map(function(f){ return {cod:f.properties.utr, geom:f.geometry, props:f.properties}; });
        console.log('[RLU ME] pug.geojson încărcat —',_pugIdx.length,'features,',
          [...new Set(_pugIdx.map(function(f){return f.cod;}))].length,'sate');
      })
      .catch(function(e){ console.warn('[RLU ME] pug.geojson indisponibil:',e.message); _pugIdx=[]; });
  }

  function _pointInPoly(pt,ring){
    var x=pt[0],y=pt[1],inside=false;
    for(var i=0,j=ring.length-1;i<ring.length;j=i++){
      var xi=ring[i][0],yi=ring[i][1],xj=ring[j][0],yj=ring[j][1];
      if(((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi)) inside=!inside;
    }
    return inside;
  }

  function _ptInGeom(pt,geom){
    if(!geom) return false;
    var rings=geom.type==='Polygon'?[geom.coordinates]:
              geom.type==='MultiPolygon'?geom.coordinates:[];
    for(var p=0;p<rings.length;p++){
      var poly=rings[p];
      if(_pointInPoly(pt,poly[0])){
        var hole=false;
        for(var h=1;h<poly.length;h++) if(_pointInPoly(pt,poly[h])){hole=true;break;}
        if(!hole) return true;
      }
    }
    return false;
  }

  function _lookupSat(coords){
    if(!_pugIdx||!_pugIdx.length) return null;
    var idx = (window.S&&window.S.pugIdx&&window.S.pugIdx.length) ? window.S.pugIdx : _pugIdx;
    for(var i=0;i<idx.length;i++){
      var f=idx[i];
      if(_ptInGeom(coords,f.geom||f.geometry)) return f.cod||(f.props&&f.props.utr)||null;
    }
    return null;
  }

  function _renderPanel(sat, nrCad){
    var el = document.getElementById('tc-utr')||document.getElementById('rlu-panel');
    if(!el) return;
    el.innerHTML =
      '<div style="font-family:system-ui,sans-serif;font-size:12px">'+
      '<div style="background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);'+
      'border-radius:8px;padding:8px 12px;margin-bottom:8px">'+
      '<div style="font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em">Sat identificat</div>'+
      '<div style="font-size:16px;font-weight:800;color:#f59e0b">'+(sat||'Necunoscut')+'</div>'+
      '<div style="font-size:11px;color:#cbd5e1">Comuna Mihai Eminescu · jud. Botoșani</div>'+
      '</div>'+
      '<div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.2);'+
      'border-radius:6px;padding:8px 12px;font-size:11px;color:#fbbf24">'+
      '⚠️ <b>RLU indisponibil</b><br>'+
      'Limitele de intravilan sunt disponibile.<br>'+
      'Parametrii urbanistici (POT/CUT/H/subzone) vor fi integrați '+
      'după obținerea documentației RLU de la Primăria Mihai Eminescu.'+
      '</div>'+
      '<div style="font-size:9px;color:#475569;margin-top:8px;padding-top:6px;'+
      'border-top:1px solid rgba(255,255,255,0.06)">'+
      'PUG Mihai Eminescu BT · Limite DXF 2020 · RLU în curs de integrare'+
      '</div></div>';
  }

  function _hookParcel(){
    window.addEventListener('ux:parcel_selected',function(e){
      if(!_ready) return;
      var activeUAT=(window.TCI&&window.TCI.cityKey)||localStorage.getItem('ux_last_city')||'';
      if(activeUAT!==UAT_KEY) return;
      var d=e.detail||{};
      var coords=d.coords||d.lngLat||d.center;
      var nrCad=d.nrCad||d.nr_cad||d.id||'?';
      if(!coords) return;
      var pt=Array.isArray(coords)?coords:[coords.lng,coords.lat];
      var sat=_lookupSat(pt);
      _renderPanel(sat,nrCad);
    });
  }

  function _doInit(){
    if(_ready) return;
    console.log('[RLU ME] Init pentru',UAT_KEY,'— doar limite intravilan');
    _loadPUG().then(function(){
      _ready=true;
      _hookParcel();
      console.log('[RLU ME] ✅ Gata — Comuna Mihai Eminescu BT (limite only)');
    });
  }

  function _init(){
    var activeUAT=(window.TCI&&window.TCI.cityKey)||localStorage.getItem('ux_last_city')||'';
    if(activeUAT===UAT_KEY){ _doInit(); return; }
    window.addEventListener('ux:city_changed',function(e){
      if(e.detail&&e.detail.key===UAT_KEY) _doInit();
    });
  }

  window._RLU_ME = {
    isReady:    function(){ return _ready; },
    lookupSat:  _lookupSat,
    getPugIdx:  function(){ return _pugIdx; },
    hasRLU:     false,
    status:     'limite_only'
  };

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',_init);
  } else {
    setTimeout(_init,300);
  }
}(window));
