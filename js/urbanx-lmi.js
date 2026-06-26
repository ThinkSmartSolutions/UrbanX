// ═══════════════════════════════════════════════════════════════════════════
// urbanx-lmi.js — serviciu LMI comun (Lista Monumentelor Istorice / INP)
// Sursă: data/lmi/{JJ}.json (extras din setul oficial INP via data.gov.ro).
// Folosit PESTE TOT: dashboard, SimLab, studii (parcelă+teritoriale), hărți, RCAI.
// Determină restricțiile legale și NIVELUL AVIZULUI (grupa A → Minister / Comisia
// Națională; grupa B → DJC județeană). window._LMI · 26 iunie 2026 · ThinkSmart
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';
  var _cache = {};

  // județ (2 litere) din cityKey 'RO-IS-01' sau din nume județ
  function judetCode(cityKeyOrJud) {
    if (!cityKeyOrJud) return null;
    var s = String(cityKeyOrJud);
    var m = s.match(/^RO-([A-Z]{2})-/i); if (m) return m[1].toUpperCase();
    if (/^[A-Z]{2}$/i.test(s)) return s.toUpperCase();
    // nume județ → cod (parțial)
    var map = { 'iasi': 'IS', 'iași': 'IS', 'cluj': 'CJ', 'timis': 'TM', 'timiș': 'TM', 'brasov': 'BV', 'brașov': 'BV', 'constanta': 'CT', 'constanța': 'CT', 'bucuresti': 'B', 'bucurești': 'B', 'galati': 'GL', 'galați': 'GL', 'suceava': 'SV', 'botosani': 'BT', 'botoșani': 'BT', 'neamt': 'NT', 'neamț': 'NT', 'vaslui': 'VS', 'bacau': 'BC', 'bacău': 'BC' };
    return map[s.toLowerCase()] || (s.length >= 2 ? s.slice(0, 2).toUpperCase() : null);
  }

  // grupa de clasare + nivelul avizului din codul LMI (ex: IS-II-a-A-03907)
  function avizLevel(cod) {
    var g = (String(cod || '').match(/-([AB])-\d/) || [])[1];
    if (g === 'A') return { grupa: 'A', interes: 'național', aviz: 'Ministerul Culturii / Comisia Națională a Monumentelor Istorice', culoare: '#ef4444' };
    if (g === 'B') return { grupa: 'B', interes: 'local', aviz: 'Direcția Județeană pentru Cultură (DJC)', culoare: '#f59e0b' };
    return { grupa: '?', interes: 'neclasificat', aviz: 'verificare LMI necesară', culoare: '#94a3b8' };
  }

  async function forJudet(cityKeyOrJud) {
    var jud = judetCode(cityKeyOrJud); if (!jud) return [];
    if (_cache[jud]) return _cache[jud];
    try {
      var r = await fetch('./data/lmi/' + jud + '.json', { signal: AbortSignal.timeout(15000) });
      if (!r.ok) { _cache[jud] = []; return []; }
      var d = await r.json(); _cache[jud] = Array.isArray(d) ? d : []; return _cache[jud];
    } catch (e) { _cache[jud] = []; return []; }
  }

  async function summary(cityKeyOrJud) {
    var lst = await forJudet(cityKeyOrJud);
    var a = 0, b = 0; lst.forEach(function (m) { var lv = avizLevel(m.cod); if (lv.grupa === 'A') a++; else if (lv.grupa === 'B') b++; });
    return { total: lst.length, grupaA: a, grupaB: b, judet: judetCode(cityKeyOrJud) };
  }

  // capitol PDF reutilizabil: restricții și avize LMI (pt orice studiu)
  async function renderSection(D, cityKeyOrJud) {
    if (!D) return false;
    var lst = await forJudet(cityKeyOrJud); if (!lst.length) return false;
    var a = lst.filter(function (m) { return avizLevel(m.cod).grupa === 'A'; }).length;
    var b = lst.filter(function (m) { return avizLevel(m.cod).grupa === 'B'; }).length;
    var CW = D.dims ? D.dims.CW : 180;
    D.chapter && D.chapter('Patrimoniu construit și regimul avizelor (LMI oficial)');
    D.P && D.P('Pe județul de referință sunt înregistrate ' + lst.length + ' poziții în Lista Monumentelor Istorice (LMI — Institutul Național al Patrimoniului): ' + a + ' de grupă A (interes național) și ' + b + ' de grupă B (interes local). Prezența unui monument istoric — pe amplasament sau în zona sa de protecție — generează restricții de construire și impune obținerea unui aviz de specialitate înainte de autorizare (Legea 422/2001).');
    if (D.table) D.table(['Grupă LMI', 'Interes', 'Avizul necesar'], [
      ['A', 'național', 'Ministerul Culturii / Comisia Națională a Monumentelor Istorice'],
      ['B', 'local', 'Direcția Județeană pentru Cultură (DJC)'],
      ['zonă de protecție', 'oricare', 'aviz DJC chiar dacă parcela nu este ea însăși monument']
    ], [CW * 0.22, CW * 0.2, CW * 0.58]);
    D.P && D.P('Regula nivelului de avizare: pentru monumentele de grupă A intervenția se avizează la nivel central (Ministerul Culturii, prin Comisia Națională a Monumentelor Istorice), iar pentru cele de grupă B la nivel județean (DJC). Zonele de protecție ale monumentelor extind aceste obligații asupra parcelelor învecinate. Sursă: LMI oficial (INP / Ministerul Culturii).');
    return true;
  }

  // monumente REALE (cu coordonate, din OSM) lângă un punct/parcelă + cod LMI + aviz
  var PROXY = (G._PROXY_BASE || 'https://urbanx-proxy.3dtravelsoftart.workers.dev');
  async function nearPoint(lat, lon, radius) {
    radius = radius || 500;
    var q = '[out:json][timeout:25];(' +
      'nwr(around:' + radius + ',' + lat + ',' + lon + ')[historic];' +
      'nwr(around:' + radius + ',' + lat + ',' + lon + ')[heritage];' +
      ');out center tags;';
    try {
      var r = await fetch(PROXY + '/osm?q=' + encodeURIComponent(q), { signal: AbortSignal.timeout(30000) });
      var j = await r.json(); var out = [], seen = {};
      (j.elements || []).forEach(function (el) {
        var t = el.tags || {}; var nm = t.name || t['name:ro']; if (!nm || seen[nm]) return;
        var la = el.lat != null ? el.lat : (el.center && el.center.lat), lo = el.lon != null ? el.lon : (el.center && el.center.lon);
        if (la == null) return; seen[nm] = 1;
        var dist = G.turf ? Math.round(G.turf.distance([lon, lat], [lo, la], { units: 'meters' })) : null;
        var cod = t['ref:ro:lmi'] || t['ref:RO:LMI'] || null;
        out.push({ name: nm, cod: cod, lat: la, lon: lo, dist: dist, aviz: cod ? avizLevel(cod) : null });
      });
      out.sort(function (a, b) { return (a.dist || 1e9) - (b.dist || 1e9); });
      return out;
    } catch (e) { return []; }
  }

  // verdict de avizare pentru o parcelă: cel mai strict nivel din monumentele apropiate
  async function avizForParcel(lat, lon) {
    var near = await nearPoint(lat, lon, 200); // zona de protecție tipică ~100-200m
    if (!near.length) return { necesar: false, nivel: null, monumente: [], nota: 'Nu s-au identificat monumente în raza de 200 m (OSM). Verificați totuși LMI/DJC oficial.' };
    var hasA = near.some(function (m) { return m.aviz && m.aviz.grupa === 'A'; });
    var hasMon = near.some(function (m) { return m.aviz || m.dist <= 100; });
    return {
      necesar: true,
      nivel: hasA ? 'Ministerul Culturii / Comisia Națională a Monumentelor Istorice (grupa A)' : 'Direcția Județeană pentru Cultură (DJC)',
      monumente: near.slice(0, 10),
      nota: 'Există monumente/repere istorice în proximitate; intervenția în monument sau în zona sa de protecție necesită aviz de specialitate (Legea 422/2001).'
    };
  }

  // panou dashboard: monumente LMI + regimul avizelor
  async function openPanel(cityKeyOrJud) {
    var key = cityKeyOrJud || (G.TCI && G.TCI.cityKey);
    var lst = await forJudet(key); var s = await summary(key);
    var ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(2,6,16,.78);z-index:99999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)';
    ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var rows = lst.slice(0, 30).map(function (m) { var lv = avizLevel(m.cod); return '<tr style="border-top:1px solid rgba(255,255,255,.06)"><td style="padding:3px 5px;color:#94a3b8;font-size:10px;white-space:nowrap">' + m.cod + '</td><td style="padding:3px 5px;color:#dce8fa;font-size:11px">' + (m.nume || '') + '</td><td style="padding:3px 5px;text-align:center"><span style="color:' + lv.culoare + ';font-weight:700;font-size:10px">' + lv.grupa + '</span></td></tr>'; }).join('');
    ov.innerHTML = '<div style="background:#0b1424;color:#e6edf7;width:min(640px,95vw);max-height:90vh;overflow:auto;border:1px solid rgba(180,83,9,.5);border-radius:14px;font-family:system-ui,sans-serif;padding:18px 20px">' +
      '<div style="display:flex;justify-content:space-between;align-items:center"><div style="font-weight:800;font-size:16px">🏛️ Monumente istorice (LMI) — ' + (s.judet || '') + '</div><button onclick="this.closest(\'div[style*=fixed]\').remove()" style="background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:5px 10px;cursor:pointer">✕</button></div>' +
      '<div style="display:flex;gap:8px;margin:12px 0">' +
      '<div style="flex:1;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:9px;text-align:center"><div style="font-size:18px;font-weight:800;color:#fbbf24">' + s.total + '</div><div style="font-size:9px;color:#94a3b8">monumente LMI</div></div>' +
      '<div style="flex:1;background:#0a1120;border:1px solid rgba(239,68,68,.25);border-radius:10px;padding:9px;text-align:center"><div style="font-size:18px;font-weight:800;color:#ef4444">' + s.grupaA + '</div><div style="font-size:9px;color:#94a3b8">grupa A · aviz Minister</div></div>' +
      '<div style="flex:1;background:#0a1120;border:1px solid rgba(245,158,11,.25);border-radius:10px;padding:9px;text-align:center"><div style="font-size:18px;font-weight:800;color:#f59e0b">' + s.grupaB + '</div><div style="font-size:9px;color:#94a3b8">grupa B · aviz DJC</div></div></div>' +
      '<div style="font-size:11px;color:#cbd5e1;background:rgba(180,83,9,.08);border:1px solid rgba(180,83,9,.25);border-radius:8px;padding:9px;margin-bottom:10px">Regimul avizelor: <b style="color:#ef4444">grupa A</b> (interes național) → aviz <b>Ministerul Culturii / Comisia Națională a Monumentelor Istorice</b>; <b style="color:#f59e0b">grupa B</b> (interes local) → aviz <b>Direcția Județeană pentru Cultură (DJC)</b>. Parcelele din <b>zona de protecție</b> a unui monument necesită aviz chiar dacă nu sunt ele însele clasate (Legea 422/2001).</div>' +
      (lst.length ? '<div style="overflow:auto"><table style="width:100%;border-collapse:collapse"><tr><th style="text-align:left;padding:3px 5px;color:#94a3b8;font-size:10px">Cod LMI</th><th style="text-align:left;padding:3px 5px;color:#94a3b8;font-size:10px">Denumire</th><th style="padding:3px 5px;color:#94a3b8;font-size:10px">Gr.</th></tr>' + rows + '</table>' + (lst.length > 30 ? '<div style="font-size:10px;color:#64748b;margin-top:6px">Primele 30 din ' + lst.length + ' poziții LMI ale județului.</div>' : '') + '</div>' : '<div style="color:#64748b;font-size:12px">Nu există date LMI pentru acest județ în setul curent.</div>') +
      '<div style="font-size:9px;color:#64748b;margin-top:10px">Sursă: Lista Monumentelor Istorice (LMI) — INP / Ministerul Culturii (set deschis data.gov.ro). Orientativ; pentru regimul juridic exact se consultă LMI oficial și DJC.</div></div>';
    document.body.appendChild(ov);
  }

  G._LMI = { judetCode: judetCode, avizLevel: avizLevel, forJudet: forJudet, summary: summary, renderSection: renderSection, openPanel: openPanel, nearPoint: nearPoint, avizForParcel: avizForParcel };
  console.log('[LMI] ✅ serviciu LMI comun încărcat (window._LMI)');
})(window);
