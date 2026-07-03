/* ============================================================================
 * UrbanX Notificări Vecini — alertă când se depune ceva lângă tine (Modul 07).
 * Inspirat planningalerts.org.au. Client-side: te abonezi la o zonă; sistemul
 * agregă „evenimentele de planificare" (CU din CAU + sesizări) și-ți arată în-app
 * ce apare în raza ta + termenul de obiecție (10 zile, Legea 50/1991 Art. 7^1).
 *
 * window.Notificari: subs (localStorage) · subscribe · events · feed · objections
 * ONEST: notificarea digitală SUPLIMENTEAZĂ afișajul fizic (L.50/1991 Art.6), nu-l
 * înlocuiește. Email real + confirmare = Faza 2 (server). Aici abonarea e in-app.
 * ========================================================================== */
(function (G) {
  'use strict';
  var DAY = 86400000, OBJ_DAYS = 10;
  var SKEY = 'urbanx_notif_subs_v1', OKEY = 'urbanx_notif_obj_v1';
  function load(k) { try { return JSON.parse(localStorage.getItem(k) || '[]'); } catch (e) { return []; } }
  function save(k, a) { try { localStorage.setItem(k, JSON.stringify(a)); } catch (e) {} }

  function dist(a, b) { try { return G.turf.distance(G.turf.point(a), G.turf.point(b), { units: 'meters' }); } catch (e) { return Infinity; } }

  // ── Evenimente de planificare (agregare din CAU + Sesizări) ──────────────
  function events() {
    var ev = [];
    try {
      if (G.CAU && G.CAU.registry) G.CAU.registry.list().forEach(function (cu) {
        var g = cu.parcel && cu.parcel.centroid; if (!g) return;
        ev.push({ ref: 'cu:' + cu.id, type: 'CU', title: 'Certificat de Urbanism ' + (cu.registration_number || ''), sub: (cu.work && (G.CAU.USE_LABELS ? (G.CAU.USE_LABELS[cu.work.use] || cu.work.use) : cu.work.use)) || '', geom: g, date: cu.created_at, deadline: (cu.created_at || Date.now()) + OBJ_DAYS * DAY, uat: cu.city_name || (G.TCI && G.TCI.cityKey) });
      });
    } catch (e) {}
    try {
      if (G.Sesizari && G.Sesizari.registry) G.Sesizari.registry.list().forEach(function (s) {
        if (!s.geom) return; var c = (G.Sesizari.CATEGORIES && G.Sesizari.CATEGORIES[s.category]) || {};
        ev.push({ ref: 'ses:' + s.id, type: 'Sesizare', title: (c.icon || '') + ' ' + (s.title || c.label || s.category), sub: c.label || '', geom: s.geom, date: s.created_at, deadline: null, uat: s.uat });
      });
    } catch (e) {}
    // ── PRELUARE OFICIALĂ (pull automat din baze publice, provenienta marcata) ──
    // Pliem cache-ul UAT-ului curent SI cel national (sursele nationale sunt
    // stocate sub '_national'), cu dedup pe ref.
    try {
      if (G.NotificariOficial && G.NotificariOficial.cached) {
        var ck = (G.TCI && G.TCI.cityKey), seen = {};
        [ck, '_national'].forEach(function (k) {
          if (!k) return;
          (G.NotificariOficial.cached(k) || []).forEach(function (o) {
            if (o && o.ref && !seen[o.ref]) { seen[o.ref] = 1; ev.push(o); }
          });
        });
      }
    } catch (e) {}
    return ev.sort(function (a, b) { return (b.date || 0) - (a.date || 0); });
  }
  // callback: cand preluarea oficiala se termina, semnaleaza UI-ul sa reimprospateze
  function _onOficial() { try { if (G.Notificari && G.Notificari._refreshUI) G.Notificari._refreshUI(); } catch (e) {} }

  var subs = {
    list: function () { return load(SKEY); },
    subscribe: function (sub) {
      var a = load(SKEY);
      sub.id = 'n' + Date.now() + '_' + Math.round(Math.random() * 1e4);
      sub.created_at = Date.now(); sub.confirmed = true; // auto in-app (email/confirmare = Faza 2)
      a.push(sub); save(SKEY, a); return sub;
    },
    remove: function (id) { save(SKEY, load(SKEY).filter(function (x) { return x.id !== id; })); },
    // evenimente care cad în raza unei abonări
    matches: function (sub) {
      return events().filter(function (e) {
        if (sub.mode === 'uat') return !sub.uat || e.uat === sub.uat || true; // tot UAT-ul
        if (!sub.center || !e.geom) return false;
        return dist(sub.center, e.geom) <= (sub.radius_m || 200);
      });
    }
  };

  // feed agregat pe toate abonările: {sub, events[]}
  function feed() {
    return subs.list().map(function (s) {
      var ev = subs.matches(s).map(function (e) {
        var dl = e.deadline ? Math.ceil((e.deadline - Date.now()) / DAY) : null;
        return Object.assign({}, e, { days_to_object: dl, can_object: dl != null && dl >= 0 });
      });
      return { sub: s, events: ev };
    });
  }
  // numar total de evenimente noi (pt badge)
  function count() { return feed().reduce(function (n, f) { return n + f.events.length; }, 0); }

  // ── LATURA PRIMARIEI (functioneaza client-side, legal relevant): identifica
  // vecinii afectati dintr-o zona de notificare (buffer in jurul cererii). ──
  function zonePolygon(centroid, radius_m) {
    try { if (G.turf) return G.turf.buffer(G.turf.point(centroid), radius_m, { units: 'meters' }); } catch (e) {}
    return null;
  }
  // numara imobilele afectate din OSM (best-effort, Overpass via proxy)
  function fetchAffected(centroid, radius_m) {
    var proxy = window._PROXY_URL || 'https://urbanx-proxy.3dtravelsoftart.workers.dev';
    var q = '[out:json][timeout:20];(way(around:' + (radius_m || 100) + ',' + centroid[1] + ',' + centroid[0] + ')[building];);out center;';
    return fetch(proxy + '/osm?q=' + encodeURIComponent(q), { signal: AbortSignal.timeout ? AbortSignal.timeout(20000) : undefined })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (j) {
        var b = (j.elements || []).filter(function (e) { return e.tags && e.tags.building; });
        var resid = b.filter(function (e) { return /res|apart|house|yes|dorm/i.test(e.tags.building); }).length;
        return { buildings: b.length, residential: resid, sample: b.slice(0, 60).map(function (e) { return e.center ? [e.center.lon, e.center.lat] : null; }).filter(Boolean) };
      });
  }

  var objections = {
    list: function () { return load(OKEY); },
    add: function (o) { var a = load(OKEY); o.id = 'o' + Date.now(); o.created_at = Date.now(); a.push(o); save(OKEY, a); return o; },
    forEvent: function (ref) { return load(OKEY).filter(function (o) { return o.event_ref === ref; }); }
  };

  G.Notificari = { subs: subs, events: events, feed: feed, count: count, objections: objections, OBJ_DAYS: OBJ_DAYS, zonePolygon: zonePolygon, fetchAffected: fetchAffected, _onOficial: _onOficial };
  console.log('[Notificari] motor încărcat (window.Notificari)');
})(window);
