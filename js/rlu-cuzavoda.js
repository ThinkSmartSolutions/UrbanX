/**
 * rlu-cuzavoda.js — RLU Comuna Cuza Vodă, jud. Galați
 * SIRUTA: 77595 | Cheie: RO-GL-77595
 * PUG aprobat: HCL 10/2022 | Valabil: 2022-03-03 → 2032-03-03
 * Sursa: datelocale.mdlpa.ro (GL_Cuza_Voda_77595_PUG_20220303.gpkg)
 * API public: window._RLU_CV
 */
(function (window) {
  'use strict';

  var UAT_KEY   = 'RO-GL-77595';
  var UAT_SLUG  = 'comuna-cuzavoda';
  var REGULI_URL = 'data/comuna-cuzavoda/reguli.json';
  var PUG_URL    = 'data/comuna-cuzavoda/pug.geojson';

  /* ── State ─────────────────────────────────────────────────── */
  var _reguli   = null;
  var _pugIdx   = null;  // array de {cod_szf, polygon[]}
  var _ready    = false;
  var _audit    = {};    // { nrCad: {subzona_cod, urbanist, sursa, nota, ts} }
  var LS_KEY    = 'ux_cv_audit';

  /* ── Helpers geometrie ─────────────────────────────────────── */
  function _pointInPoly(pt, ring) {
    var x = pt[0], y = pt[1], inside = false;
    for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      var xi = ring[i][0], yi = ring[i][1];
      var xj = ring[j][0], yj = ring[j][1];
      if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi))
        inside = !inside;
    }
    return inside;
  }

  function _ptInGeom(pt, geom) {
    if (!geom) return false;
    var rings = geom.type === 'Polygon'   ? [geom.coordinates] :
                geom.type === 'MultiPolygon' ? geom.coordinates : [];
    for (var p = 0; p < rings.length; p++) {
      var poly = rings[p];
      if (_pointInPoly(pt, poly[0])) {
        var hole = false;
        for (var h = 1; h < poly.length; h++)
          if (_pointInPoly(pt, poly[h])) { hole = true; break; }
        if (!hole) return true;
      }
    }
    return false;
  }

  /* ── Încărcare date ─────────────────────────────────────────── */
  function _loadReguli() {
    return fetch(REGULI_URL)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        _reguli = data;
        console.log('[RLU CV] reguli.json încărcat —', Object.keys(data.subzone).length, 'subzone');
      })
      .catch(function (e) { console.error('[RLU CV] Eroare reguli.json:', e); });
  }

  function _loadPUG() {
    return fetch(PUG_URL)
      .then(function (r) { return r.json(); })
      .then(function (gj) {
        _pugIdx = gj.features
          .filter(function (f) { return f.geometry && f.properties && f.properties.utr; })
          .map(function (f) {
            return { cod: f.properties.utr, geom: f.geometry, props: f.properties };
          });
        console.log('[RLU CV] pug.geojson încărcat —', _pugIdx.length, 'features,',
          [...new Set(_pugIdx.map(function(f){return f.cod;}))].length, 'UTR-uri unice');
      })
      .catch(function (e) {
        console.warn('[RLU CV] pug.geojson indisponibil:', e.message);
        _pugIdx = [];
      });
  }

  function _loadAudit() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      _audit = raw ? JSON.parse(raw) : {};
    } catch (e) { _audit = {}; }
  }

  function _saveAudit() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(_audit)); } catch (e) {}
  }

  /* ── Lookup spațial ─────────────────────────────────────────── */
  function _lookupUTR(coords) {
    // coords = [lng, lat]
    if (!_pugIdx || !_pugIdx.length) return null;
    // Încercăm mai întâi S (TCI global)
    var s = window.S || {};
    var pugIdx = (s.pugIdx && s.pugIdx.length) ? s.pugIdx : _pugIdx;

    for (var i = 0; i < pugIdx.length; i++) {
      var f = pugIdx[i];
      if (_ptInGeom(coords, f.geom || f.geometry))
        return f.cod || (f.props && f.props.utr) || null;
    }
    return null;
  }

  /* ── API principal ──────────────────────────────────────────── */
  function _getSubzona(cod) {
    if (!_reguli) return null;
    return _reguli.subzone[cod] || _reguli.zone_restrictive[cod] || null;
  }

  function _lookupParcelaFull(coords) {
    if (!_ready) return null;
    var utr = _lookupUTR(coords);
    if (!utr) return null;
    var subz = _getSubzona(utr);
    var restrictiva = !subz || subz.tip; // zone_restrictive
    return {
      utr_cod: utr,
      subzona: subz,
      restrictiva: restrictiva,
      avize: _getAvize(utr),
      avertizari: _getAvertizari(utr)
    };
  }

  function _getAvize(cod) {
    var avize = [];
    if (!_reguli) return avize;
    // Zone restrictive cu avize speciale
    var zr = _reguli.zone_restrictive;
    if (zr[cod] && zr[cod].aviz_necesar) avize.push(zr[cod].aviz_necesar);
    // Avize generale per subzonă
    if (cod === 'ZI') avize.push('Aviz APM Galați (mediu)');
    if (cod === 'GC') avize.push('Aviz utilități (funcție de tip)');
    if (cod === 'ZIP') avize.push('Aviz ISU Galați (dacă suprafața > 600 mp)');
    return avize;
  }

  function _getAvertizari(cod) {
    var av = [];
    if (cod === 'ZRI') av.push('⚠️ RISC INUNDAȚII — interdicție temporară de construire (ANAR)');
    if (cod === 'ZIPC') av.push('🚫 INTERDICȚIE PERMANENTĂ de construire');
    if (cod === 'S1' || cod === 'S2') av.push('⚠️ SIT ARHEOLOGIC — descărcare de sarcină obligatorie (DJPC Galați)');
    if (cod === 'Z.P.LEA 20') av.push('⚠️ PROTECȚIE LEA 20kV — construcțiile sunt interzise');
    if (cod === 'DJ 251') av.push('ℹ️ Zonă de protecție DJ 251 — aviz CJ Galați necesar');
    return av;
  }

  /* ── Audit subzonă ──────────────────────────────────────────── */
  function _atribuieSubzona(nrCad, cod, opts) {
    opts = opts || {};
    _audit[nrCad] = {
      subzona_cod: cod,
      urbanist: opts.urbanist || '',
      sursa: opts.sursa || '',
      nota: opts.nota || '',
      ts: new Date().toISOString()
    };
    _saveAudit();
    return _audit[nrCad];
  }

  function _stergeAtribuire(nrCad) {
    delete _audit[nrCad];
    _saveAudit();
  }

  function _exportAudit() {
    var blob = new Blob([JSON.stringify(_audit, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'audit-rlu-cuzavoda-' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
  }

  function _importAudit(file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      try {
        var data = JSON.parse(e.target.result);
        Object.assign(_audit, data);
        _saveAudit();
        console.log('[RLU CV] Audit importat:', Object.keys(data).length, 'înregistrări');
      } catch (err) { console.error('[RLU CV] Eroare import audit:', err); }
    };
    reader.readAsText(file);
  }

  /* ── UI Panel ───────────────────────────────────────────────── */
  function _renderPanel(parcelaData, nrCad) {
    var el = document.getElementById('tc-utr') ||
             document.getElementById('rlu-panel') ||
             document.getElementById('panel-utr');
    if (!el) return;

    if (!parcelaData || !parcelaData.utr_cod) {
      el.innerHTML = '<div style="color:#6b7280;font-size:12px;padding:8px">Parcela nu se află în intravilan Cuza Vodă sau UTR neidentificat.</div>';
      return;
    }

    var utr = parcelaData.utr_cod;
    var subz = parcelaData.subzona || {};
    var isRestrictiva = parcelaData.restrictiva;
    var avize = parcelaData.avize || [];
    var avert = parcelaData.avertizari || [];

    var auditEntry = _audit[nrCad];
    var subzCod = auditEntry ? auditEntry.subzona_cod : utr;
    var subzData = _getSubzona(subzCod) || subz;

    var html = '<div style="font-family:system-ui,sans-serif;font-size:12px">';

    // Header UTR
    html += '<div style="background:rgba(212,175,55,0.1);border:1px solid rgba(212,175,55,0.3);' +
      'border-radius:8px;padding:8px 12px;margin-bottom:8px">' +
      '<div style="font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em">Zonă funcțională</div>' +
      '<div style="font-size:16px;font-weight:800;color:#d4af37">' + utr + '</div>' +
      '<div style="font-size:11px;color:#cbd5e1">' + (subzData.denumire || '') + '</div>' +
      '<div style="font-size:10px;color:#64748b;margin-top:2px">Comuna Cuza Vodă · jud. Galați · PUG 2022</div>' +
      '</div>';

    // Avertizări
    if (avert.length) {
      html += '<div style="margin-bottom:8px">';
      avert.forEach(function (a) {
        html += '<div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);' +
          'border-radius:6px;padding:6px 10px;margin-bottom:4px;color:#fca5a5;font-size:11px">' + a + '</div>';
      });
      html += '</div>';
    }

    // Parametri urbanistici
    if (!isRestrictiva && subzData.pot_max) {
      html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:4px;margin-bottom:8px">';
      var params = [
        { label: 'POT max', val: subzData.pot_max ? subzData.pot_max + '%' : '—' },
        { label: 'CUT max', val: subzData.cut_max != null ? subzData.cut_max : '—' },
        { label: 'H max',   val: subzData.hmax_m ? subzData.hmax_m + ' m' : '—' },
        { label: 'Regim H', val: subzData.rh_max || '—' }
      ];
      params.forEach(function (p) {
        html += '<div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);' +
          'border-radius:6px;padding:6px 8px;text-align:center">' +
          '<div style="font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:.05em">' + p.label + '</div>' +
          '<div style="font-size:14px;font-weight:700;color:#e2e8f0">' + p.val + '</div>' +
          '</div>';
      });
      html += '</div>';

      // Parcelă minimă
      if (subzData.parcela_min_mp) {
        html += '<div style="background:rgba(255,255,255,0.03);border-radius:6px;padding:6px 10px;' +
          'margin-bottom:6px;font-size:11px;color:#94a3b8">' +
          '📐 Suprafață minimă parcelă: <b style="color:#e2e8f0">' + subzData.parcela_min_mp + ' mp</b>' +
          (subzData.front_min_m ? ' · Front min: <b style="color:#e2e8f0">' + subzData.front_min_m + ' m</b>' : '') +
          '</div>';
      }

      // Utilizări admise
      if (subzData.utilizari_admise && subzData.utilizari_admise.length) {
        html += '<div style="margin-bottom:6px"><div style="font-size:10px;color:#34d399;font-weight:700;' +
          'text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px">✅ Utilizări admise</div>';
        subzData.utilizari_admise.slice(0, 4).forEach(function (u) {
          html += '<div style="font-size:10px;color:#94a3b8;padding:1px 0">· ' + u + '</div>';
        });
        html += '</div>';
      }

      // Note
      if (subzData.note) {
        html += '<div style="background:rgba(255,255,255,0.03);border-left:2px solid rgba(212,175,55,0.4);' +
          'padding:5px 8px;margin-bottom:6px;font-size:10px;color:#94a3b8;border-radius:0 4px 4px 0">' +
          subzData.note.slice(0, 200) + '</div>';
      }
    }

    // Avize necesare
    if (avize.length) {
      html += '<div style="margin-bottom:6px"><div style="font-size:10px;color:#f59e0b;font-weight:700;' +
        'text-transform:uppercase;letter-spacing:.06em;margin-bottom:3px">📋 Avize necesare</div>';
      avize.forEach(function (a) {
        html += '<div style="font-size:10px;color:#fbbf24;padding:1px 0">· ' + a + '</div>';
      });
      html += '</div>';
    }

    // Audit
    if (auditEntry) {
      html += '<div style="background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.3);' +
        'border-radius:6px;padding:6px 10px;margin-bottom:6px;font-size:10px">' +
        '<div style="color:#a5b4fc;font-weight:700;margin-bottom:2px">📝 Subzonă atribuită manual</div>' +
        '<div style="color:#94a3b8">Cod: <b>' + auditEntry.subzona_cod + '</b>' +
        (auditEntry.urbanist ? ' · Urbanist: ' + auditEntry.urbanist : '') +
        (auditEntry.sursa ? '<br>Sursă: ' + auditEntry.sursa : '') +
        (auditEntry.nota ? '<br>Notă: ' + auditEntry.nota : '') + '</div>' +
        '</div>';
    }

    // Footer
    html += '<div style="font-size:9px;color:#475569;margin-top:4px;padding-top:4px;' +
      'border-top:1px solid rgba(255,255,255,0.06)">' +
      'PUG Cuza Vodă · HCL 10/2022 · Valabil 2022-2032 · Sursa: MDLPA GeoPackage</div>';
    html += '</div>';

    el.innerHTML = html;
  }

  /* ── DataBus patch ──────────────────────────────────────────── */
  function _patchDataBus(parcelaData, nrCad) {
    var db = window.DataBus || window._DataBus || window.S;
    if (!db || !db._computed) return;
    if (db._cv_patched_for === nrCad) return;
    db._cv_patched_for = nrCad;

    if (!parcelaData) return;
    var utr = parcelaData.utr_cod;
    var subz = parcelaData.subzona || {};
    var auditEntry = _audit[nrCad];
    var subzCod = auditEntry ? auditEntry.subzona_cod : utr;
    var subzData = _getSubzona(subzCod) || subz;
    var m = _reguli ? _reguli._meta : {};

    Object.assign(db._computed, {
      uat:               m.uat || 'Comuna Cuza Vodă',
      uat_key:           UAT_KEY,
      judet:             'Galați',
      data_expirare_pug: m.data_expirare || '2032-03-03',
      utr_cod:           utr,
      utr_denumire:      subzData.denumire || utr,
      pot_max:           subzData.pot_max || null,
      cut_max:           subzData.cut_max != null ? subzData.cut_max : null,
      hmax_m:            subzData.hmax_m || null,
      rh_max:            subzData.rh_max || null,
      parcela_min_mp:    subzData.parcela_min_mp || null,
      avize_necesare:    parcelaData.avize || [],
      avertizari:        parcelaData.avertizari || [],
      restrictiva:       !!parcelaData.restrictiva,
      subzona_cod:       auditEntry ? auditEntry.subzona_cod : null,
      subzona_sursa:     auditEntry ? auditEntry.sursa : null,
      subzona_urbanist:  auditEntry ? auditEntry.urbanist : null,
      subzona_ts:        auditEntry ? auditEntry.ts : null
    });
  }

  /* ── Hook parcelă selectată ─────────────────────────────────── */
  function _hookParcel() {
    window.addEventListener('ux:parcel_selected', function (e) {
      if (!_ready) return;
      var d = e.detail || {};
      var activeUAT = (window.TCI && window.TCI.cityKey) ||
                      localStorage.getItem('ux_last_city') || '';
      if (activeUAT !== UAT_KEY) return;

      var coords = d.coords || d.lngLat || d.center;
      var nrCad  = d.nrCad || d.nr_cad || d.id || '?';
      if (!coords) return;

      var result = _lookupParcelaFull(Array.isArray(coords) ? coords : [coords.lng, coords.lat]);
      _patchDataBus(result, nrCad);
      _renderPanel(result, nrCad);
    });
  }

  /* ── Init ───────────────────────────────────────────────────── */
  function _init() {
    var activeUAT = (window.TCI && window.TCI.cityKey) ||
                    localStorage.getItem('ux_last_city') || '';
    if (activeUAT !== UAT_KEY) {
      // Așteptăm schimbarea UAT
      window.addEventListener('ux:city_changed', function (e) {
        if ((e.detail && e.detail.key) === UAT_KEY) _doInit();
      });
      return;
    }
    _doInit();
  }

  function _doInit() {
    if (_ready) return;
    console.log('[RLU CV] Init pentru', UAT_KEY);
    _loadAudit();
    Promise.all([_loadReguli(), _loadPUG()]).then(function () {
      _ready = true;
      _hookParcel();
      console.log('[RLU CV] ✅ Gata — Comuna Cuza Vodă, jud. Galați');
    });
  }

  /* ── API public ─────────────────────────────────────────────── */
  window._RLU_CV = {
    isReady:          function () { return _ready; },
    getSubzona:       _getSubzona,
    lookupUTR:        _lookupUTR,
    lookupParcelaFull:_lookupParcelaFull,
    getAvize:         _getAvize,
    getAvertizari:    _getAvertizari,
    atribuieSubzona:  _atribuieSubzona,
    stergeAtribuire:  _stergeAtribuire,
    exportAudit:      _exportAudit,
    importAudit:      _importAudit,
    renderPanel:      _renderPanel,
    getReguli:        function () { return _reguli; },
    getPugIdx:        function () { return _pugIdx; }
  };

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _init);
  } else {
    setTimeout(_init, 300);
  }

}(window));
