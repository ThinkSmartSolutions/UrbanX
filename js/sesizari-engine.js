/* ============================================================================
 * UrbanX Sesizări — raportare urbană georeferențiată (Modul 06, client-side).
 * Inspirat FixMyStreet (UK). Cetățeanul raportează o problemă pe hartă; UAT-ul
 * o urmărește. High-value: la „construire_ilegala" → cross-check cu CAU (există
 * AC valid?) → flag prioritate mare. Alimentează Dosarul Digital.
 *
 * window.Sesizari: registry (localStorage) · add · list · forParcel · mapGeoJSON ·
 *                  setStatus · stats · crossCheckCAU · CATEGORIES
 * Persistent local (fără backend). Faza 2: foto upload S3 + multi-user + email.
 * ========================================================================== */
(function (G) {
  'use strict';
  var CATEGORIES = {
    construire_ilegala: { label: 'Construire ilegală', icon: '🏗️', color: '#ef4444' },
    imobil_abandonat: { label: 'Imobil abandonat', icon: '🏚️', color: '#f97316' },
    strada_degradata: { label: 'Stradă degradată', icon: '🕳️', color: '#f59e0b' },
    spatiu_verde: { label: 'Spațiu verde degradat', icon: '🌳', color: '#22c55e' },
    iluminat: { label: 'Iluminat defect', icon: '💡', color: '#eab308' },
    semn_circulatie: { label: 'Semn circulație', icon: '🚸', color: '#3b82f6' },
    deseuri: { label: 'Deșeuri ilegale', icon: '🗑️', color: '#a16207' },
    alte: { label: 'Altă problemă', icon: '📍', color: '#94a3b8' }
  };
  var STATUSES = ['noua', 'in_analiza', 'in_lucru', 'rezolvata', 'respinsa'];
  var PRIORITIES = ['mica', 'medie', 'mare', 'urgenta'];

  var RKEY = 'urbanx_sesizari_v1';
  function regAll() { try { return JSON.parse(localStorage.getItem(RKEY) || '[]'); } catch (e) { return []; } }
  function regSave(a) { try { localStorage.setItem(RKEY, JSON.stringify(a)); } catch (e) {} }

  // Cross-check CAU: parcela are AC/CU în registru? (pt construire_ilegala)
  function crossCheckCAU(linkedParcel) {
    try {
      if (!linkedParcel || !G.CAU || !G.CAU.registry) return { checked: false };
      var cus = G.CAU.registry.list().filter(function (cu) {
        return cu.parcel && cu.parcel.nrcad && linkedParcel.nrcad && String(cu.parcel.nrcad) === String(linkedParcel.nrcad);
      });
      return { checked: true, has_permit: cus.length > 0, permits: cus.length };
    } catch (e) { return { checked: false }; }
  }

  var registry = {
    list: function () { return regAll(); },
    add: function (s) {
      var a = regAll();
      s.id = 's' + Date.now() + '_' + Math.round(Math.random() * 1e4);
      s.created_at = Date.now(); s.status = s.status || 'noua'; s.upvotes = 0;
      s.uat = (G.TCI && G.TCI.cityKey) || 'UAT';
      // high-value: construire ilegală fără AC -> prioritate mare + flag
      if (s.category === 'construire_ilegala' && s.linked_parcel) {
        var cc = crossCheckCAU(s.linked_parcel); s.cau_check = cc;
        if (cc.checked && !cc.has_permit) { s.priority = 'mare'; s.flag_no_permit = true; }
      }
      a.push(s); regSave(a); return s;
    },
    setStatus: function (id, status, note) {
      var a = regAll(); var s = a.filter(function (x) { return x.id === id; })[0]; if (!s) return null;
      s.status = status; if (note) s.resolution_note = note; if (status === 'rezolvata') s.resolved_at = Date.now();
      regSave(a); return s;
    },
    upvote: function (id) { var a = regAll(); var s = a.filter(function (x) { return x.id === id; })[0]; if (s) { s.upvotes = (s.upvotes || 0) + 1; regSave(a); } return s; },
    remove: function (id) { regSave(regAll().filter(function (x) { return x.id !== id; })); },
    // sesizări legate de o parcelă (după nrcad sau proximitate centroid)
    forParcel: function (parcel) {
      if (!parcel) return [];
      return regAll().filter(function (s) {
        if (s.linked_parcel && parcel.nrcad && String(s.linked_parcel.nrcad) === String(parcel.nrcad)) return true;
        if (s.geom && parcel.centroid && G.turf) {
          try { return G.turf.distance(G.turf.point(s.geom), G.turf.point(parcel.centroid), { units: 'meters' }) < 40; } catch (e) {}
        }
        return false;
      });
    },
    mapGeoJSON: function () {
      return {
        type: 'FeatureCollection', features: regAll().filter(function (s) { return s.geom; }).map(function (s) {
          var c = CATEGORIES[s.category] || CATEGORIES.alte;
          return { type: 'Feature', geometry: { type: 'Point', coordinates: s.geom }, properties: { id: s.id, title: s.title || c.label, category: s.category, status: s.status, color: s.status === 'rezolvata' ? '#22c55e' : c.color, icon: c.icon } };
        })
      };
    },
    stats: function () {
      var a = regAll(), byCat = {}, byStatus = {}, resTimes = [];
      a.forEach(function (s) {
        byCat[s.category] = (byCat[s.category] || 0) + 1;
        byStatus[s.status] = (byStatus[s.status] || 0) + 1;
        if (s.resolved_at && s.created_at) resTimes.push((s.resolved_at - s.created_at) / 86400000);
      });
      var avg = resTimes.length ? resTimes.reduce(function (x, y) { return x + y; }, 0) / resTimes.length : null;
      return { total: a.length, by_category: byCat, by_status: byStatus, avg_resolution_days: avg ? Math.round(avg * 10) / 10 : null, open: (byStatus.noua || 0) + (byStatus.in_analiza || 0) + (byStatus.in_lucru || 0) };
    }
  };

  G.Sesizari = { registry: registry, CATEGORIES: CATEGORIES, STATUSES: STATUSES, PRIORITIES: PRIORITIES, crossCheckCAU: crossCheckCAU };
  console.log('[Sesizari] motor încărcat (window.Sesizari)');
})(window);
