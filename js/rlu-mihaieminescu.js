// ══════════════════════════════════════════════════════════════════════════════
//  RLU — Comuna Mihai Eminescu, Județul Botoșani
//  Sursa: Actualizare PUG — Volum II: Regulament Local de Urbanism PR.NR.236/2020
//  Proiectant: Blue-Print / Tehno Instal Nord + Proiect Botoșani S.R.L.
//  Integrat în UrbanX: 2026-05-25
// ══════════════════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  var UAT_KEY   = 'RO-BT-38063';
  var UAT_ID    = 'comuna-mihaieminescu';
  var UAT_NAME  = 'Comuna Mihai Eminescu';
  var RLU_FILE  = 'data/comuna-mihaieminescu/reguli.json';
  var PUG_FILE  = 'data/comuna-mihaieminescu/pug.geojson';

  // ── Mapare sat → UTR-uri (din RLU PR.NR.236/2020) ──────────────────────────
  var SAT_UTR = {
    'manolesti':        ['UTR-5'],
    'mânăiești':        ['UTR-5'],
    'cucorăni':         ['UTR-6a', 'UTR-6b'],
    'cucorăni':         ['UTR-6a', 'UTR-6b'],
    'baișa':            ['UTR-7'],
    'baisa':            ['UTR-7'],
    'cătămărăști-deal': ['UTR-8a', 'UTR-8b', 'UTR-8c', 'UTR-8d', 'UTR-8e'],
    'cătămărăști deal': ['UTR-8a', 'UTR-8b', 'UTR-8c', 'UTR-8d', 'UTR-8e'],
    'cătămărăști':      ['UTR-8a'],
    'ipotești':         [],
    'stăncești':        [],
    'cervicești':       [],
    'bâlseni':          []
  };

  // ── Culori UTR (sistem UrbanX standard) ────────────────────────────────────
  var UTR_COLORS = {
    'UTR-5':  { fill: 'rgba(255,200,100,0.35)', stroke: '#e6a020', label: 'Rezidențial' },
    'UTR-6a': { fill: 'rgba(255,200,100,0.35)', stroke: '#e6a020', label: 'Rezidențial' },
    'UTR-6b': { fill: 'rgba(180,230,180,0.40)', stroke: '#4a9e4a', label: 'Producție agricolă' },
    'UTR-7':  { fill: 'rgba(255,200,100,0.35)', stroke: '#e6a020', label: 'Rezidențial' },
    'UTR-8a': { fill: 'rgba(255,200,100,0.35)', stroke: '#e6a020', label: 'Rezidențial' },
    'UTR-8b': { fill: 'rgba(200,180,230,0.40)', stroke: '#7c5cbf', label: 'Industrial' },
    'UTR-8c': { fill: 'rgba(200,180,230,0.40)', stroke: '#7c5cbf', label: 'Industrial/Servicii' },
    'UTR-8d': { fill: 'rgba(180,230,180,0.40)', stroke: '#4a9e4a', label: 'Producție agricolă' },
    'UTR-8e': { fill: 'rgba(150,220,150,0.40)', stroke: '#2d8a2d', label: 'Spații verzi/Agrement' }
  };

  // ── Date RLU complete (cache local — evităm fetch suplimentar) ──────────────
  var _reguliCache = null;

  function _getReguli(callback) {
    if (_reguliCache) { callback(_reguliCache); return; }
    fetch(RLU_FILE + '?v=20260525')
      .then(function(r){ return r.json(); })
      .then(function(d){ _reguliCache = d; callback(d); })
      .catch(function(){ callback(null); });
  }

  // ── Identificare UTR după proprietăți feature GeoJSON ──────────────────────
  function _detectUTR(props) {
    if (!props) return null;
    var utr = props.UTR || props.utr || props.COD_UTR || props.cod_utr || null;
    if (utr) return String(utr).toUpperCase().replace(/^([0-9])/, 'UTR-$1');

    // fallback: după sat
    var sat = (props.SAT || props.sat || props.LOCALITATE || props.localitate || '').toLowerCase().trim();
    for (var key in SAT_UTR) {
      if (sat.indexOf(key) !== -1 || key.indexOf(sat) !== -1) {
        var utrs = SAT_UTR[key];
        return utrs.length ? utrs[0] : null;
      }
    }
    return null;
  }

  // ── Formatare card RLU pentru un UTR ───────────────────────────────────────
  function _buildCard(utrObj, satNume) {
    if (!utrObj) {
      return '<div style="padding:12px;color:#888;font-size:13px">RLU: date UTR indisponibile</div>';
    }

    var tip = utrObj.tip || '';
    var tipLabel = {
      'rezidential': '🏠 Rezidențial',
      'productie_agricola': '🌾 Producție agricolă',
      'industrial': '🏭 Industrial',
      'industrial_servicii': '🏭 Industrial/Servicii',
      'spatii_verzi_agrement': '🌳 Spații verzi/Agrement'
    }[tip] || tip;

    var html = '<div class="rlu-card" style="font-family:sans-serif;font-size:13px;line-height:1.5">';

    // Header
    html += '<div style="background:#1a3a5c;color:#fff;padding:10px 14px;border-radius:6px 6px 0 0;margin-bottom:0">';
    html += '<strong>' + utrObj.id + '</strong> — ' + (utrObj.sat || satNume || '') + '<br>';
    html += '<span style="font-size:11px;opacity:.85">' + tipLabel + ' · ' + (utrObj.denumire || '') + '</span>';
    html += '</div>';

    // Parametri urbanistici principali
    html += '<div style="background:#f0f6ff;padding:10px 14px;display:flex;gap:16px;flex-wrap:wrap;border-bottom:1px solid #d0dff0">';
    if (utrObj.POT_max !== undefined) {
      html += '<div style="text-align:center"><div style="font-size:18px;font-weight:700;color:#1a3a5c">' + utrObj.POT_max + '%</div><div style="font-size:10px;color:#666">POT max</div></div>';
    }
    if (utrObj.CUT_max !== undefined) {
      html += '<div style="text-align:center"><div style="font-size:18px;font-weight:700;color:#1a3a5c">' + utrObj.CUT_max + '</div><div style="font-size:10px;color:#666">CUT max</div></div>';
    }
    if (utrObj.H_max_m !== undefined) {
      html += '<div style="text-align:center"><div style="font-size:18px;font-weight:700;color:#1a3a5c">' + utrObj.H_max_m + 'm</div><div style="font-size:10px;color:#666">H max</div></div>';
    }
    if (utrObj.regim_inaltime) {
      html += '<div style="text-align:center;flex:1;min-width:80px"><div style="font-size:13px;font-weight:600;color:#1a3a5c">' + utrObj.regim_inaltime + '</div><div style="font-size:10px;color:#666">Regim înălțime</div></div>';
    }
    html += '</div>';

    // Parcelă minimă
    if (utrObj.parcela_minima) {
      var p = utrObj.parcela_minima;
      html += '<div style="padding:8px 14px;background:#fff;border-bottom:1px solid #e8e8e8">';
      html += '<div style="font-weight:600;color:#333;margin-bottom:4px">📐 Parcelă minimă</div>';
      html += '<div style="color:#555">';
      if (p.suprafata_mp) html += 'Suprafață: <strong>' + p.suprafata_mp + ' mp</strong> · ';
      if (p.front_stradal_m) html += 'Front stradal: <strong>' + p.front_stradal_m + ' m</strong>';
      if (p.acces_carosabil_m) html += ' · Acces: <strong>' + p.acces_carosabil_m + ' m</strong>';
      html += '</div></div>';
    }

    // Amplasare
    if (utrObj.amplasare) {
      var a = utrObj.amplasare;
      html += '<div style="padding:8px 14px;background:#fff;border-bottom:1px solid #e8e8e8">';
      html += '<div style="font-weight:600;color:#333;margin-bottom:4px">📏 Amplasare față de limite</div>';
      html += '<div style="color:#555;font-size:12px">';
      if (a.retragere_fata_aliniament_m) html += 'Față stradă: <strong>' + a.retragere_fata_aliniament_m + ' m</strong> · ';
      if (a.retragere_laterala_min_m) html += 'Laterale: <strong>min ' + a.retragere_laterala_min_m + ' m</strong> · ';
      if (a.retragere_posterioara_min_m) html += 'Posterior: <strong>min ' + a.retragere_posterioara_min_m + ' m</strong>';
      html += '</div></div>';
    }

    // Utilizări admise (primele 3)
    if (utrObj.utilizari_admise && utrObj.utilizari_admise.length) {
      html += '<div style="padding:8px 14px;background:#fff;border-bottom:1px solid #e8e8e8">';
      html += '<div style="font-weight:600;color:#2a7a2a;margin-bottom:4px">✅ Utilizări admise</div>';
      html += '<ul style="margin:0;padding-left:16px;color:#444;font-size:12px">';
      utrObj.utilizari_admise.slice(0, 3).forEach(function(u) {
        html += '<li>' + u + '</li>';
      });
      if (utrObj.utilizari_admise.length > 3) {
        html += '<li style="color:#888">+ ' + (utrObj.utilizari_admise.length - 3) + ' altele...</li>';
      }
      html += '</ul></div>';
    }

    // Utilizări interzise (primele 3)
    if (utrObj.utilizari_interzise && utrObj.utilizari_interzise.length) {
      html += '<div style="padding:8px 14px;background:#fff;border-bottom:1px solid #e8e8e8">';
      html += '<div style="font-weight:600;color:#cc2222;margin-bottom:4px">🚫 Utilizări interzise</div>';
      html += '<ul style="margin:0;padding-left:16px;color:#444;font-size:12px">';
      utrObj.utilizari_interzise.slice(0, 3).forEach(function(u) {
        html += '<li>' + u + '</li>';
      });
      if (utrObj.utilizari_interzise.length > 3) {
        html += '<li style="color:#888">+ ' + (utrObj.utilizari_interzise.length - 3) + ' altele...</li>';
      }
      html += '</ul></div>';
    }

    // Note
    if (utrObj.note) {
      html += '<div style="padding:8px 14px;background:#fffbe6;font-size:11px;color:#7a6000;border-radius:0 0 6px 6px">';
      html += '⚠️ ' + utrObj.note;
      html += '</div>';
    }

    html += '</div>';
    return html;
  }

  // ── Handler click pe feature PUG ───────────────────────────────────────────
  function _onFeatureClick(feature, latlng, map) {
    var props = feature.properties || {};
    var utrId = _detectUTR(props);
    var satNume = props.SAT || props.sat || props.DENUMIRE || props.denumire || props.name || UAT_NAME;

    _getReguli(function(reguli) {
      var utrObj = null;
      if (reguli && reguli.utr && utrId) {
        utrObj = reguli.utr.find(function(u) { return u.id === utrId; }) || null;
      }

      // fallback: dacă nu găsim UTR exact dar știm satul
      if (!utrObj && reguli && reguli.utr) {
        var satLow = satNume.toLowerCase();
        for (var key in SAT_UTR) {
          if (satLow.indexOf(key) !== -1 || key.indexOf(satLow) !== -1) {
            var utrIds = SAT_UTR[key];
            if (utrIds.length) {
              utrObj = reguli.utr.find(function(u) { return u.id === utrIds[0]; }) || null;
            }
            break;
          }
        }
      }

      var cardHtml = _buildCard(utrObj, satNume);

      var popupContent = '<div style="max-width:340px;max-height:420px;overflow-y:auto">'
        + '<div style="font-weight:700;font-size:14px;padding:8px 14px;border-bottom:2px solid #1a3a5c">'
        + UAT_NAME + (satNume && satNume !== UAT_NAME ? ' — ' + satNume : '')
        + (utrId ? ' <span style="background:#1a3a5c;color:#fff;font-size:11px;padding:2px 6px;border-radius:10px">' + utrId + '</span>' : '')
        + '</div>'
        + cardHtml
        + '</div>';

      if (map) {
        L.popup({ maxWidth: 360, maxHeight: 460 })
          .setLatLng(latlng)
          .setContent(popupContent)
          .openOn(map);
      }
    });
  }

  // ── Stilizare feature ───────────────────────────────────────────────────────
  function _styleFeature(feature) {
    var props = feature.properties || {};
    var utrId = _detectUTR(props);
    var col = (utrId && UTR_COLORS[utrId]) ? UTR_COLORS[utrId] : { fill: 'rgba(100,150,200,0.25)', stroke: '#4477aa' };

    // limita UAT — stilizare specială
    var tip = (props.TIP || props.tip || props.TYPE || '').toLowerCase();
    if (tip.indexOf('limita') !== -1 || tip.indexOf('limit') !== -1 || tip.indexOf('uat') !== -1) {
      return { color: '#cc4400', weight: 2.5, fillOpacity: 0, dashArray: '6,4' };
    }

    return {
      fillColor: col.fill,
      color: col.stroke,
      weight: 1.5,
      fillOpacity: 0.5,
      opacity: 0.9
    };
  }

  // ── Înregistrare în sistemul UrbanX ────────────────────────────────────────
  window._PUG_REGISTRY = window._PUG_REGISTRY || {};
  window._PUG_REGISTRY[UAT_KEY] = {
    id: UAT_ID,
    name: UAT_NAME,
    pugFile: PUG_FILE,
    reguli: RLU_FILE,
    onFeatureClick: _onFeatureClick,
    styleFeature: _styleFeature,
    rluStatus: 'complet',
    version: '20260525'
  };

  // ── Activare dacă UAT-ul este deja selectat ─────────────────────────────────
  function _tryActivate() {
    var active = window.TCI && window.TCI.cityKey;
    if (!active) {
      var stored = localStorage.getItem('ux_last_city');
      if (stored) active = stored;
    }
    if (active === UAT_ID || active === UAT_KEY) {
      _activateRLU();
    }
  }

  function _activateRLU() {
    console.log('[RLU Mihai Eminescu] ✅ Activat — RLU complet PR.NR.236/2020, ' + Object.keys(UTR_COLORS).length + ' UTR-uri');
    // Preload reguli
    _getReguli(function(d) {
      if (d) console.log('[RLU Mihai Eminescu] Cache reguli OK —', d.utr ? d.utr.length : 0, 'UTR-uri');
    });
  }

  // Ascultă evenimentul de switch UAT
  document.addEventListener('UrbanX:switchUAT', function(e) {
    if (e.detail && (e.detail.key === UAT_KEY || e.detail.id === UAT_ID)) {
      _activateRLU();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _tryActivate);
  } else {
    setTimeout(_tryActivate, 100);
  }

  console.log('[RLU Mihai Eminescu] ✅ Modul inițializat — RLU complet PR.NR.236/2020');

})();
