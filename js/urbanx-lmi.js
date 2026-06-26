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

  G._LMI = { judetCode: judetCode, avizLevel: avizLevel, forJudet: forJudet, summary: summary, renderSection: renderSection };
  console.log('[LMI] ✅ serviciu LMI comun încărcat (window._LMI)');
})(window);
