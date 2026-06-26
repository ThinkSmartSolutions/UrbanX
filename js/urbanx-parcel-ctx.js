// ═══════════════════════════════════════════════════════════════════════════
// urbanx-parcel-ctx.js — window._ParcelCtx
// Rezolvă PARCELA selectată + ZONA PUG (UTR/subzonă) din care face parte, cu
// indicatorii REALI (POT/CUT/Hmax/regim/retrageri/utilizări) din _PUG_REGULI.
// Reutilizat de studiile de PARCELĂ (HBU parcelă, RCAI parcelă) ca să fie
// PUNCTUALE (parcela + zona ei), nu pe tot UAT-ul.
// 26 iunie 2026 · ThinkSmart Solutions SRL
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';

  function _activeParcel() {
    try {
      var S = G.S || window.S;
      if (S && S.parcels && S.parcels.length) { var ap = S.parcels[S.activeParcel != null ? S.activeParcel : 0]; if (ap) return ap; }
    } catch (e) {}
    return G._activeParcel || G._selectedParcel || null;
  }

  function _centroid(ap) {
    try {
      var geo = ap && (ap.geo && ap.geo.geometry ? ap.geo.geometry : (ap.geometry || null));
      if (geo && geo.coordinates) {
        var ring = geo.type === 'Polygon' ? geo.coordinates[0] : (geo.type === 'MultiPolygon' ? geo.coordinates[0][0] : null);
        if (ring && ring.length) {
          var sx = 0, sy = 0; ring.forEach(function (p) { sx += p[0]; sy += p[1]; });
          return { lon: sx / ring.length, lat: sy / ring.length };
        }
      }
    } catch (e) {}
    if (ap && ap.lat != null && ap.lon != null) return { lat: ap.lat, lon: ap.lon };
    return null;
  }

  // deschiderea la stradă (latura cea mai lungă a poligonului) + perimetru, formă
  function _shape(ap) {
    try {
      var geo = ap && (ap.geo && ap.geo.geometry ? ap.geo.geometry : (ap.geometry || null));
      var ring = geo && (geo.type === 'Polygon' ? geo.coordinates[0] : (geo.type === 'MultiPolygon' ? geo.coordinates[0][0] : null));
      if (!ring || ring.length < 3 || !G.turf) return null;
      var perim = 0, maxSeg = 0;
      for (var i = 0; i < ring.length - 1; i++) {
        var d = G.turf.distance(ring[i], ring[i + 1], { units: 'meters' });
        perim += d; if (d > maxSeg) maxSeg = d;
      }
      var area = ap.area || (G.turf.area ? G.turf.area({ type: 'Feature', geometry: geo, properties: {} }) : 0);
      // factor de compactare Polsby-Popper (1 = cerc); deschidere ≈ latura max
      var compact = perim > 0 ? (4 * Math.PI * area) / (perim * perim) : null;
      return { perimetru: Math.round(perim), latura_max: Math.round(maxSeg), compactare: compact != null ? Math.round(compact * 100) / 100 : null };
    } catch (e) { return null; }
  }

  function _zone(cityKey, ap) {
    var out = { utrNr: null, code: null, denumire: null, fn_dominanta: null, pot: null, cut: null, hmax: null, niv: null, regim: null, retragere_fata: null, retragere_laterala: null, retragere_spate: null, spatii_verzi_pct: null, utilizari_admise: null, utilizari_conditionate: null, utilizari_interzise: null, subzone_admise: null, fn_interzise: null, sursa: null };
    try {
      var utrNr = (ap && ap.utr_nr) || null;
      if (!utrNr && typeof G._findUTRNumericForParcel === 'function' && ap) { try { utrNr = G._findUTRNumericForParcel(ap); } catch (e) {} }
      out.utrNr = utrNr;
      var d = G._PUG_REGULI && G._PUG_REGULI[cityKey];
      if (d && utrNr && d.utrs && d.utrs[String(utrNr)]) {
        var u = d.utrs[String(utrNr)];
        out.fn_dominanta = u.fn_dominanta || null;
        out.subzone_admise = u.subzone_admise || null;
        out.fn_interzise = u.fn_interzise || null;
        out.denumire = u.denumire || null;
        var code = u.fn_dominanta;
        var sz = code && d.subzone && d.subzone[code];
        if (!sz && d.subzone && ap && ap.utr && d.subzone[ap.utr]) { sz = d.subzone[ap.utr]; code = ap.utr; }
        if (sz) {
          out.code = code;
          out.denumire = out.denumire || sz.denumire || null;
          out.pot = sz.pot_baza != null ? sz.pot_baza : sz.pot;
          out.cut = sz.cut_baza != null ? sz.cut_baza : sz.cut;
          out.hmax = sz.hmax_m != null ? sz.hmax_m : sz.h;
          out.niv = sz.niv_max != null ? sz.niv_max : sz.niv;
          out.regim = sz.regim || null;
          out.retragere_fata = sz.retragere_fata || null;
          out.retragere_laterala = sz.retragere_laterala || sz.retragere_lat || null;
          out.retragere_spate = sz.retragere_spate || null;
          out.spatii_verzi_pct = sz.spatii_verzi_pct != null ? sz.spatii_verzi_pct : sz.sv;
          out.utilizari_admise = Array.isArray(sz.utilizari_admise) ? sz.utilizari_admise.join('; ') : sz.utilizari_admise || null;
          out.utilizari_conditionate = Array.isArray(sz.utilizari_conditionate) ? sz.utilizari_conditionate.join('; ') : sz.utilizari_conditionate || null;
          out.utilizari_interzise = Array.isArray(sz.utilizari_interzise) ? sz.utilizari_interzise.join('; ') : sz.utilizari_interzise || null;
          out.sursa = (d._meta && d._meta.sursa) || 'RLU / PUG';
        }
      }
      // fallback sistem vechi REGULI[u]
      if (out.pot == null && ap && ap.utr) {
        var R = (typeof window.REGULI !== 'undefined' ? window.REGULI : G.REGULI) || {};
        var r = R[ap.utr];
        if (r) { out.code = out.code || ap.utr; out.pot = out.pot != null ? out.pot : r.pot; out.cut = out.cut != null ? out.cut : r.cut; out.hmax = out.hmax != null ? out.hmax : r.h; out.niv = out.niv != null ? out.niv : r.niv; out.denumire = out.denumire || r.d; out.sursa = out.sursa || 'REGULI local'; }
      }
    } catch (e) {}
    return out;
  }

  // context complet pentru un studiu de parcelă
  function get(cityKey) {
    var ap = _activeParcel();
    var hasParcel = !!(ap && (ap.geo || ap.geometry || (ap.lat != null && ap.lon != null)));
    var c = hasParcel ? _centroid(ap) : null;
    var zone = hasParcel ? _zone(cityKey, ap) : _zone(cityKey, null);
    var area = (ap && (ap.area || ap.suprafata)) || null;
    var edif = null;
    if (area && (zone.cut != null || zone.pot != null)) {
      var adc = zone.cut != null ? Math.round(area * zone.cut) : null;            // arie desfășurată construită
      var amprenta = zone.pot != null ? Math.round(area * zone.pot / 100) : null; // amprenta la sol (POT %)
      edif = { adc: adc, amprenta: amprenta, niv: zone.niv || (zone.hmax ? Math.max(1, Math.round(zone.hmax / 3)) : null) };
    }
    return {
      hasParcel: hasParcel,
      ap: ap || null,
      nrcad: (ap && (ap.nrcad || ap.cf)) || null,
      area: area,
      lat: c ? c.lat : null,
      lon: c ? c.lon : null,
      shape: hasParcel ? _shape(ap) : null,
      zone: zone,
      edif: edif
    };
  }

  G._ParcelCtx = { get: get, activeParcel: _activeParcel, centroid: _centroid };
  window._ParcelCtx = G._ParcelCtx;
  console.log('[ParcelCtx] ✅ context parcelă + zonă PUG (window._ParcelCtx.get)');
})(window);
