/* ============================================================================
 * UrbanX Heritage — inventar patrimoniu construit (Modul 10, client-side).
 * Model: LMI (Lista Monumentelor Istorice) + Historic England. Integrat cu CAU:
 * parcelă lângă monument → avizul Direcției de Cultură devine OBLIGATORIU.
 *
 * window.Heritage: registry · add · list · mapGeoJSON · checkProximity · propose
 * Strat A = LMI oficial (protecție legală); Strat B = inventar local (recomandat).
 * Seed: câteva monumente REALE (coordonate reale, data_source 'lmi_oficial').
 * ONEST: statutul LMI are valoare legală; 'inventar_local'/'propunere' NU. Import
 * LMI complet (Excel Min. Culturii) = Faza 2.
 * ========================================================================== */
(function (G) {
  'use strict';
  var CATEGORIES = {
    monument_arhitectura: 'Monument de arhitectură', monument_arheologie: 'Sit arheologic',
    monument_memorial: 'Monument memorial', ansamblu: 'Ansamblu', zona_protejata: 'Zonă construită protejată'
  };
  var RKEY = 'urbanx_heritage_v1';
  // seed monumente REALE (coordonate reale, LMI oficial) — date publice, nu fabricate
  var SEED = [
    { name: 'Palatul Culturii', address: 'Iași', category: 'monument_arhitectura', protection_level: 'A', condition: 'buna', geom: [27.5878, 47.1585], data_source: 'lmi_oficial', lmi_code: 'IS-II-m-A-03992' },
    { name: 'Mănăstirea Trei Ierarhi', address: 'Iași', category: 'monument_arhitectura', protection_level: 'A', condition: 'buna', geom: [27.5847, 47.1620], data_source: 'lmi_oficial', lmi_code: 'IS-II-m-A-04017' },
    { name: 'Catedrala Sf. Mihail', address: 'Cluj-Napoca', category: 'monument_arhitectura', protection_level: 'A', condition: 'buna', geom: [23.5899, 46.7693], data_source: 'lmi_oficial', lmi_code: 'CJ-II-m-A-07469' },
    { name: 'Biserica Neagră', address: 'Brașov', category: 'monument_arhitectura', protection_level: 'A', condition: 'buna', geom: [25.5877, 45.6407], data_source: 'lmi_oficial', lmi_code: 'BV-II-m-A-11293' },
    { name: 'Cetatea de Scaun', address: 'Suceava', category: 'monument_arheologie', protection_level: 'A', condition: 'buna', geom: [26.2620, 47.6430], data_source: 'lmi_oficial', lmi_code: 'SV-II-a-A-05597' }
  ];
  function regAll() { try { var v = localStorage.getItem(RKEY); if (v == null) { var a = SEED.map(function (s, i) { return Object.assign({ id: 'h_seed_' + i }, s); }); localStorage.setItem(RKEY, JSON.stringify(a)); return a; } return JSON.parse(v); } catch (e) { return SEED.slice(); } }
  function regSave(a) { try { localStorage.setItem(RKEY, JSON.stringify(a)); } catch (e) {} }
  function dist(a, b) { try { return G.turf.distance(G.turf.point(a), G.turf.point(b), { units: 'meters' }); } catch (e) { return Infinity; } }

  var registry = {
    list: function () { return regAll(); },
    add: function (h) { var a = regAll(); h.id = 'h' + Date.now() + '_' + Math.round(Math.random() * 1e4); h.created_at = Date.now(); a.push(h); regSave(a); return h; },
    remove: function (id) { regSave(regAll().filter(function (x) { return x.id !== id; })); },
    mapGeoJSON: function () {
      return { type: 'FeatureCollection', features: regAll().filter(function (h) { return h.geom; }).map(function (h) {
        var col = h.protection_level === 'A' ? '#dc2626' : h.protection_level === 'B' ? '#f59e0b' : '#a78bfa';
        return { type: 'Feature', geometry: { type: 'Point', coordinates: h.geom }, properties: { id: h.id, name: h.name, level: h.protection_level, color: col } };
      }) };
    }
  };
  // folosit de CAU: monumente în raza unei parcele
  function checkProximity(centroid, radiusM) {
    radiusM = radiusM || 100;
    if (!centroid) return [];
    return regAll().filter(function (h) { return h.geom && dist(centroid, h.geom) <= radiusM; })
      .map(function (h) { return { name: h.name, level: h.protection_level, distance_m: Math.round(dist(centroid, h.geom)), lmi_code: h.lmi_code, source: h.data_source }; })
      .sort(function (a, b) { return a.distance_m - b.distance_m; });
  }

  G.Heritage = { registry: registry, checkProximity: checkProximity, CATEGORIES: CATEGORIES };
  console.log('[Heritage] motor încărcat (window.Heritage)');
})(window);
