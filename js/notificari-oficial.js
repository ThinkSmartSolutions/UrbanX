/* ============================================================================
 * UrbanX Notificări — PRELUARE din surse OFICIALE (Modul 07, latura "pull").
 * Corectează mecanismul: în loc de transmitere MANUALĂ a evenimentelor, sistemul
 * PRELUĂ periodic (poll) din baze publice oficiale și le pliază în feed-ul de
 * notificări cu PROVENIENȚĂ marcată ("oficial") — vezi window.Notificari.events().
 *
 * ONEST (serverless / GitHub Pages):
 *  - Nu există un API național unic pentru "ce CU/AC s-a depus lângă tine".
 *  - Ce e REAL și machine-readable: data.gov.ro (CKAN) — seturi de date deschise
 *    (certificate de urbanism, autorizații, PUG/PUZ). Îl poll-uim ca FEED.
 *  - Ce e portal (fără feed structurat): Monitorul Oficial Local (MOL, per UAT),
 *    ANCPI/geoportal, listele lunare CU/AC ale primăriei. Pentru acestea NU
 *    fabricăm date — automatizăm VERIFICAREA periodică + link, cu marcaj
 *    "ultima verificare / următoarea verificare". Preluarea = pull automat, nu
 *    introducere manuală.
 *  - Toate fetch-urile trec prin proxy Cloudflare (fără CORS).
 *
 * window.NotificariOficial: SOURCES · poll(cityKey) · cached(cityKey) ·
 *   lastCheck(cityKey) · status(cityKey) · startAuto()
 * ========================================================================== */
(function (G) {
  'use strict';
  var PROXY = G._PROXY_URL || 'https://urbanx-proxy.3dtravelsoftart.workers.dev';
  var CKEY = 'urbanx_notif_oficial_v1';     // cache preluări { cityKey: {ts, items[]} }
  var POLL_MS = 6 * 3600 * 1000;            // cadență preluare: 6h
  var STALE_MS = 24 * 3600 * 1000;          // peste 24h → repoll la deschidere

  function load() { try { return JSON.parse(localStorage.getItem(CKEY) || '{}'); } catch (e) { return {}; } }
  function save(o) { try { localStorage.setItem(CKEY, JSON.stringify(o)); } catch (e) {} }

  // ── Registru surse oficiale ────────────────────────────────────────────
  // kind:'feed'  → machine-readable, se parsează automat.
  // kind:'portal'→ pagină oficială fără feed; se verifică periodic + link out.
  // Slot per-UAT (gol implicit) — se completează cu URL-ul REAL al listei
  // CU/AC a fiecărei primării pe măsură ce onboardăm UAT-ul.
  var SOURCES = {
    _national: [
      { name: 'data.gov.ro — Urbanism & amenajarea teritoriului', kind: 'feed',
        url: 'https://data.gov.ro/api/3/action/package_search?q=urbanism&rows=25&sort=' + encodeURIComponent('metadata_modified desc'),
        note: 'Portalul național de date deschise (CKAN). Seturi publicate voluntar de UAT-uri.' },
      { name: 'data.gov.ro — Cadastru & date locale', kind: 'feed',
        url: 'https://data.gov.ro/api/3/action/package_search?q=cadastru&rows=25&sort=' + encodeURIComponent('metadata_modified desc'),
        note: 'Idem CKAN — acoperire neuniformă, depinde de ce publică fiecare UAT.' },
      { name: 'Monitorul Oficial Local (MOL)', kind: 'portal',
        url: 'https://www.mdlpa.ro/pages/monitoruloficiallocal',
        note: 'Fiecare UAT publică MOL pe site-ul propriu (OUG 57/2019). Fără format unitar → verificare periodică + link.' },
      { name: 'ANCPI / Geoportal', kind: 'portal',
        url: 'https://geoportal.ancpi.ro/',
        note: 'Cadastru & carte funciară. Fără flux public "depuneri lângă tine"; verificare manuală punctuală.' }
    ]
    // ex. per-UAT: 'RO-IS-01': [{name:'Primăria Iași — Lista CU', kind:'feed', url:'...', parse:'iasi_cu'}]
  };

  // ── Parsere per tip de feed ──────────────────────────────────────────────
  function parseCKAN(json, srcName) {
    var out = [];
    try {
      var recs = (json && json.result && json.result.results) || [];
      recs.forEach(function (p) {
        out.push({
          ref: 'ckan:' + (p.id || p.name),
          type: 'Oficial', title: '📄 ' + (p.title || p.name || 'Set de date urbanism'),
          sub: (p.organization && p.organization.title) || 'data.gov.ro',
          geom: null,                                   // seturile CKAN n-au coordonate per-parcelă
          date: Date.parse(p.metadata_modified || p.metadata_created || '') || Date.now(),
          deadline: null, source: 'oficial',
          origin: { name: srcName, url: 'https://data.gov.ro/dataset/' + (p.name || '') }
        });
      });
    } catch (e) {}
    return out;
  }

  // ── Preluare (pull) o singură sursă ───────────────────────────────────────
  function fetchSource(src) {
    if (src.kind !== 'feed') {
      // portal: nu fabricăm date — înregistrăm doar "verificat, vezi sursa"
      return Promise.resolve({ ok: true, kind: 'portal', items: [], portal: { name: src.name, url: src.url, note: src.note } });
    }
    var u = PROXY + '/proxy?url=' + encodeURIComponent(src.url);
    var opt = {};
    try { if (AbortSignal.timeout) opt.signal = AbortSignal.timeout(20000); } catch (e) {}
    return fetch(u, opt)
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then(function (j) { return { ok: true, kind: 'feed', items: parseCKAN(j, src.name) }; })
      .catch(function (e) { return { ok: false, kind: 'feed', error: String(e && e.message || e), items: [] }; });
  }

  function sourcesFor(cityKey) {
    var list = SOURCES._national.slice();
    if (cityKey && cityKey !== '_national' && SOURCES[cityKey]) list = SOURCES[cityKey].concat(list);
    return list;
  }

  // ── Preluare toate sursele pt un UAT → cache ──────────────────────────────
  function poll(cityKey) {
    cityKey = cityKey || (G.TCI && G.TCI.cityKey) || '_national';
    var srcs = sourcesFor(cityKey);
    return Promise.all(srcs.map(fetchSource)).then(function (res) {
      var items = [], portals = [], report = [];
      res.forEach(function (r, i) {
        var s = srcs[i];
        if (r.items && r.items.length) items = items.concat(r.items);
        if (r.portal) portals.push(r.portal);
        report.push({ name: s.name, kind: s.kind, ok: !!r.ok, count: (r.items || []).length, error: r.error || null });
      });
      var db = load();
      db[cityKey] = { ts: _now(), items: items, portals: portals, report: report };
      save(db);
      try { if (G.Notificari && G.Notificari._onOficial) G.Notificari._onOficial(cityKey); } catch (e) {}
      return db[cityKey];
    });
  }

  function _now() { try { return Date.now(); } catch (e) { return 0; } }
  function cached(cityKey) { var d = load()[cityKey || (G.TCI && G.TCI.cityKey) || '_national']; return (d && d.items) || []; }
  function portals(cityKey) { var d = load()[cityKey || (G.TCI && G.TCI.cityKey) || '_national']; return (d && d.portals) || sourcesFor(cityKey).filter(function (s) { return s.kind === 'portal'; }).map(function (s) { return { name: s.name, url: s.url, note: s.note }; }); }
  function lastCheck(cityKey) { var d = load()[cityKey || (G.TCI && G.TCI.cityKey) || '_national']; return (d && d.ts) || null; }
  function status(cityKey) {
    cityKey = cityKey || (G.TCI && G.TCI.cityKey) || '_national';
    var d = load()[cityKey] || {}; var last = d.ts || null;
    return {
      cityKey: cityKey, last: last, next: last ? last + POLL_MS : null,
      report: d.report || sourcesFor(cityKey).map(function (s) { return { name: s.name, kind: s.kind, ok: null, count: 0, error: null }; }),
      total: (d.items || []).length
    };
  }

  // ── Auto: preluare la deschidere (dacă e stale) + tick periodic ───────────
  var _timer = null;
  function startAuto() {
    if (_timer) return;
    function tick() {
      // sursele nationale (mereu) + UAT-ul curent DOAR daca are surse proprii
      var keys = ['_national'];
      var ck = (G.TCI && G.TCI.cityKey);
      if (ck && SOURCES[ck]) keys.push(ck);
      keys.forEach(function (k) {
        var last = lastCheck(k);
        if (!last || (_now() - last) > STALE_MS) poll(k).catch(function () {});
      });
    }
    // prima preluare la ~8s după load (ca să nu concureze cu init-ul hărții)
    try { setTimeout(tick, 8000); } catch (e) {}
    try { _timer = setInterval(tick, POLL_MS); } catch (e) {}
  }

  G.NotificariOficial = {
    SOURCES: SOURCES, poll: poll, cached: cached, portals: portals,
    lastCheck: lastCheck, status: status, startAuto: startAuto, POLL_MS: POLL_MS
  };
  try { if (G.document && G.document.readyState !== 'loading') startAuto(); else G.addEventListener('DOMContentLoaded', startAuto); } catch (e) {}
  console.log('[NotificariOficial] preluare surse oficiale încărcată (window.NotificariOficial)');
})(window);
