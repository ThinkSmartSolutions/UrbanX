/* ============================================================================
 * UrbanX SimLab — dashboard de simulare & explorare PRE-PROIECTARE.
 * Schimbă fluxul „aprobi apoi descoperi problemele" în „explorezi întâi, decizi
 * informat". Bază legală: Legea 350/2001 Art. 5 (studii de oportunitate, informale,
 * pre-PUG/PUZ). Scenariul ales devine baza documentată pentru inițierea procedurilor.
 *
 * 6 simulatoare — fără duplicare: 3 NOI client-side aici + 3 rutate spre module existente:
 *   1. UHI — profil termic urban (canvas)            [NOU aici]
 *   2. Front de apă — secțiune mal (canvas + viitură) [NOU aici]
 *   3. Impact capacitate — gauges (factori reali UXI) [NOU aici, surse Intelligence]
 *   4. Parc 3D            → window.Loisir (tab 3D)
 *   5. Fezabilitate       → window.Feaz
 *   6. Superbloc (BCN)    → window.Superbloc
 * + Scenarii salvate (localStorage) + comparare + export PDF „Studiu de oportunitate L.350".
 *
 * Tot client-side (canvas/SVG/math). Stocarea pe server + share-link = Faza 2.
 * window.SimLab.openDashboard() · open(sim) · exportStudiu(scn)
 * ========================================================================== */
(function (G) {
  'use strict';
  function N(x) { try { return Math.round(x).toLocaleString('ro-RO'); } catch (e) { return String(Math.round(x)); } }

  // ── canvas widget logic (portat din sursa Claude.ai) ──
  var SEASONS = {
    vara: { sky: '#87CEEB', water: '#2E7BBF', grass: '#4A9C1A', tree: '#2D6B0A', leaf: '#3A8515' },
    primavara: { sky: '#B3D9F5', water: '#378ADD', grass: '#63B82A', tree: '#3B6D11', leaf: '#7FC443' },
    toamna: { sky: '#D4C5A9', water: '#4A7BA8', grass: '#8B7355', tree: '#7A4A1A', leaf: '#D4621A' },
    iarna: { sky: '#D0E8F5', water: '#5A8FAA', grass: '#C8D4C0', tree: '#4A4A4A', leaf: '#E8E8E8' }
  };
  var UHI_BASE = [2.5, 3.5, 4.8, 5.8, 6.2, 5.9, 5.2, 4.1, 3.0, 2.2, 1.8, 1.4, 1.6, 2.2, 3.2, 4.5, 5.8, 6.0, 5.5, 4.8];
  function uhiTemp(x, W, t, g, r) { var i = Math.min(Math.floor(x / W * UHI_BASE.length), UHI_BASE.length - 1); return Math.max(0, UHI_BASE[i] - (t * 0.04 + g * 0.03 + r * 0.025)); }
  function uhiColor(t) { return t < 1.5 ? '#378ADD' : t < 2.5 ? '#5DCAA5' : t < 3.5 ? '#97C459' : t < 4.5 ? '#EF9F27' : t < 5.5 ? '#D85A30' : '#E24B4A'; }
  function drawUHI(cv, p) {
    var ctx = cv.getContext('2d'), W = cv.width, H = cv.height, C = SEASONS[p.season] || SEASONS.vara;
    ctx.clearRect(0, 0, W, H); ctx.fillStyle = C.sky; ctx.fillRect(0, 0, W, H);
    var gH = 56;
    var zones = [{ x: 40, w: 60, h: 80, t: 'b' }, { x: 120, w: 80, h: 100, t: 'b' }, { x: 220, w: 50, h: 60, t: 'p' }, { x: 290, w: 70, h: 90, t: 'b' }, { x: 380, w: 90, h: 110, t: 'b' }, { x: 490, w: 60, h: 70, t: 'b' }, { x: 570, w: 60, h: 80, t: 'p' }];
    ctx.fillStyle = '#E8E6E0'; ctx.fillRect(0, H - gH, W, gH);
    zones.forEach(function (z) {
      var y = H - gH - z.h;
      if (z.t === 'p') {
        ctx.fillStyle = C.grass; ctx.fillRect(z.x, H - gH - 20, z.w, 20);
        for (var i = 0; i < 3; i++) { var tx = z.x + 10 + i * (z.w / 3); ctx.fillStyle = C.tree; ctx.beginPath(); ctx.arc(tx, H - gH - 24, 10, 0, 7); ctx.fill(); ctx.fillStyle = C.leaf; ctx.beginPath(); ctx.arc(tx - 1, H - gH - 26, 8, 0, 7); ctx.fill(); }
      } else {
        ctx.fillStyle = '#B4B2A9'; ctx.fillRect(z.x, y, z.w, z.h);
        for (var fy = y + 10; fy < H - gH - 10; fy += 20) for (var fx = z.x + 8; fx < z.x + z.w - 8; fx += 18) { ctx.fillStyle = '#B5D4F4'; ctx.fillRect(fx, fy, 10, 12); }
        if (p.roofPct > 15) { ctx.fillStyle = C.leaf; ctx.fillRect(z.x + 4, y + 2, z.w - 8, 8); }
      }
    });
    var temps = []; for (var x = 0; x < W; x += 4) temps.push({ x: x, t: uhiTemp(x, W, p.treePct, p.greenPct, p.roofPct) });
    for (var i = 0; i < temps.length - 1; i++) { var a = temps[i], b = temps[i + 1]; var y0 = 20 + (1 - a.t / 8) * (H - gH - 30), y1 = 20 + (1 - b.t / 8) * (H - gH - 30); ctx.beginPath(); ctx.moveTo(a.x, y0); ctx.lineTo(b.x, y1); ctx.strokeStyle = uhiColor((a.t + b.t) / 2); ctx.lineWidth = 3; ctx.stroke(); }
    ctx.fillStyle = 'rgba(80,80,80,.8)'; ctx.font = '10px sans-serif'; ctx.fillText('+7°C', 4, 24); ctx.fillText('+0°C', 4, H - gH - 6);
    var maxT = Math.max.apply(null, temps.map(function (q) { return q.t; })), minT = Math.min.apply(null, temps.map(function (q) { return q.t; }));
    return { maxStreetTemp: +maxT.toFixed(1), minParkTemp: +minT.toFixed(1), uhiReduction: +(6.2 - maxT).toFixed(1), co2Stored: Math.round(p.treePct * 0.8 + p.greenPct * 0.4 + p.roofPct * 0.3 + 12) };
  }

  var RZONES = {
    promenada: { title: 'Promenadă + pistă ciclism', desc: 'Lățime min 6m (3+3 separați). Pavaj permeabil. Iluminat LED 4m. Bănci la 150m. Aliniament platan/tei.' },
    terasa: { title: 'Terase suspendate', desc: 'Structuri pe piloți. Lemn tratat. Balustradă sticlă. Acces PMR. Cafenele concesionate. Inspecție anuală.' },
    viewpoint: { title: 'Belvedere', desc: 'Platformă 3-5m deasupra apei. Oțel+lemn. Vedere panoramică. Telescoape, iluminat arhitectural.' },
    mal: { title: 'Mal naturalizat', desc: 'Stuf, papură, salcie, arin. Gabioane vegetate (nu beton). Biotop. Aviz Apele Române obligatoriu.' },
    apa: { title: 'Luciu de apă', desc: 'Traseu kayak/canotaj. Pontoon flotant. Pescuit sportiv. Monitorizare IoT calitate apă.' },
    pod: { title: 'Pod pietonal', desc: 'Conectează maluri la 80-120m. Structură tensionată/arcuată. Lățime min 4m.' }
  };
  function drawRiver(cv, p, gt) {
    var ctx = cv.getContext('2d'), W = cv.width, H = cv.height, C = SEASONS[p.season] || SEASONS.vara;
    ctx.clearRect(0, 0, W, H); ctx.fillStyle = C.sky; ctx.fillRect(0, 0, W, H);
    var waterY = H - 56 - p.waterLevel * 0.5;
    // mal stâng
    ctx.fillStyle = '#5A4A32'; ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(0, H - 80); ctx.quadraticCurveTo(60, H - 100, 120, H - 90); ctx.quadraticCurveTo(180, H - 80, 220, waterY + 20); ctx.lineTo(W, waterY + 20); ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
    ctx.fillStyle = C.grass; ctx.beginPath(); ctx.moveTo(0, H - 80); ctx.quadraticCurveTo(60, H - 100, 120, H - 90); ctx.quadraticCurveTo(180, H - 80, 220, waterY + 20); ctx.lineTo(220, waterY + 14); ctx.quadraticCurveTo(180, waterY + 8, 120, waterY + 12); ctx.quadraticCurveTo(60, waterY + 18, 0, waterY + 10); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#888780'; ctx.fillRect(0, waterY + 14, 220, 6); ctx.fillStyle = '#A09060'; ctx.fillRect(50, waterY, 140, 14);
    // apă
    ctx.fillStyle = C.water; ctx.beginPath(); ctx.moveTo(220, waterY + 20); ctx.lineTo(W, waterY + 20); ctx.lineTo(W, H - 26); ctx.quadraticCurveTo(W - 150, H - 22, 220, H - 26); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(180,210,255,.4)'; ctx.lineWidth = 1; ctx.setLineDash([8, 6]); ctx.lineDashOffset = -gt * 0.03;
    for (var i = 0; i < 3; i++) { var ry = waterY + 35 + i * 26; ctx.beginPath(); ctx.moveTo(230, ry); ctx.quadraticCurveTo(W / 2, ry + 5, W - 20, ry); ctx.stroke(); }
    ctx.setLineDash([]);
    // mal drept
    ctx.fillStyle = '#5A4A32'; ctx.beginPath(); ctx.moveTo(W, H - 30); ctx.lineTo(W, H); ctx.lineTo(360, H); ctx.quadraticCurveTo(400, H - 20, W - 50, H - 30); ctx.closePath(); ctx.fill();
    ctx.fillStyle = C.grass; ctx.beginPath(); ctx.moveTo(360, H); ctx.quadraticCurveTo(400, H - 20, W - 50, H - 30); ctx.lineTo(W, H - 30); ctx.lineTo(W, H - 55); ctx.quadraticCurveTo(W - 200, H - 62, 360, H - 15); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#888780'; ctx.fillRect(380, H - 58, 180, 8);
    // copaci
    [30, 90, 160].forEach(function (x) { var th = 45 + (x % 3) * 10; ctx.fillStyle = C.tree; ctx.fillRect(x + 8, H - 80 - th, 5, th); ctx.fillStyle = C.leaf; ctx.beginPath(); ctx.arc(x + 10, H - 80 - th, 14, 0, 7); ctx.fill(); });
    [420, 500, 580].forEach(function (x) { var th = 40 + (x % 4) * 8; ctx.fillStyle = C.tree; ctx.fillRect(x + 8, H - 66 - th, 4, th); ctx.fillStyle = C.leaf; ctx.beginPath(); ctx.arc(x + 10, H - 66 - th, 12, 0, 7); ctx.fill(); });
    if (p.waterLevel > 15) { ctx.fillStyle = '#639922'; for (var r = 0; r < 5; r++) { ctx.beginPath(); ctx.ellipse(225 + r * 12, waterY + 18, 3, 8, 0.3, 0, 7); ctx.fill(); } }
    // ── ELEMENTE DE DESIGN AMPLASATE (se desenează efectiv pe secțiune) ──
    var cx1 = 220, cx2 = 360, surf = waterY + 18; // canalul apei
    var placed = p.placed || {};
    function outline(active, fn) { fn(); if (active) { ctx.save(); ctx.strokeStyle = '#fb923c'; ctx.lineWidth = 2; ctx.setLineDash([4, 3]); fn(true); ctx.setLineDash([]); ctx.restore(); } }
    // PROMENADĂ — bandă lată evidențiată pe malul stâng
    if (placed.promenada) { ctx.fillStyle = p.activeZone === 'promenada' ? '#fbbf24' : '#c8a85a'; ctx.fillRect(20, waterY + 8, 180, 8); ctx.fillStyle = '#0b1424'; ctx.font = '8px sans-serif'; ctx.fillText('promenadă 6m', 26, waterY + 14.5); }
    // MAL naturalizat — stuf dens pe malul drept
    if (placed.mal) { ctx.fillStyle = '#3f8c3a'; for (var rr = 0; rr < 8; rr++) { ctx.beginPath(); ctx.ellipse(cx2 - 4 + rr * 7, surf, 3, 11, 0.25, 0, 7); ctx.fill(); } }
    // TERASĂ suspendată — deck pe piloți peste apă (mal stâng)
    if (placed.terasa) { var tx = cx1 - 6, ty = surf - 24; ctx.fillStyle = '#444'; ctx.fillRect(tx + 6, ty + 4, 3, surf - ty); ctx.fillRect(tx + 44, ty + 4, 3, surf - ty); ctx.fillStyle = '#b07a3a'; ctx.fillRect(tx, ty, 58, 6); ctx.strokeStyle = '#ddd'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx, ty - 8); ctx.moveTo(tx + 58, ty); ctx.lineTo(tx + 58, ty - 8); ctx.stroke(); ctx.fillStyle = '#0b1424'; ctx.font = '8px sans-serif'; ctx.fillText('terasă', tx + 14, ty - 2); }
    // BELVEDERE — platformă înălțată pe malul drept
    if (placed.viewpoint || placed.belvedere) { var bx = cx2 + 24, by = surf - 48; ctx.fillStyle = '#555'; ctx.fillRect(bx + 10, by, 4, 48); ctx.fillStyle = '#7a8a9a'; ctx.fillRect(bx, by - 6, 30, 7); ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bx, by - 6); ctx.lineTo(bx, by - 16); ctx.moveTo(bx + 30, by - 6); ctx.lineTo(bx + 30, by - 16); ctx.stroke(); ctx.fillStyle = '#e6edf7'; ctx.font = '8px sans-serif'; ctx.fillText('belvedere', bx - 2, by - 20); }
    // LUCIU / PONTON — ponton plutitor + caiace pe apă
    if (placed.apa) { var px = (cx1 + cx2) / 2 - 26; ctx.fillStyle = '#8a5a2a'; ctx.fillRect(px, surf - 4, 52, 7); ctx.fillStyle = '#d4a25a'; ctx.fillRect(px + 4, surf - 6, 44, 3); ctx.fillStyle = '#0b1424'; ctx.font = '8px sans-serif'; ctx.fillText('ponton', px + 12, surf + 1); ctx.fillStyle = '#e24b4a'; ctx.beginPath(); ctx.ellipse(px - 14, surf + 8, 9, 3, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.ellipse(px + 70, surf + 10, 9, 3, 0, 0, 7); ctx.fill(); }
    // POD pietonal — arc peste apă
    if (placed.pod) { ctx.strokeStyle = p.activeZone === 'pod' ? '#fb923c' : '#9aa3ad'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx1 - 16, surf - 6); ctx.quadraticCurveTo((cx1 + cx2) / 2, surf - 46, cx2 + 16, surf - 6); ctx.stroke(); ctx.lineWidth = 1; for (var pp = 0; pp <= 6; pp++) { var fx = (cx1 - 16) + (cx2 + 32) * pp / 6; var fy = surf - 6 - (40 * (1 - Math.pow((pp / 6 - 0.5) * 2, 2))); ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx, fy + 6); ctx.stroke(); } ctx.fillStyle = '#e6edf7'; ctx.font = '8px sans-serif'; ctx.fillText('pod pietonal', (cx1 + cx2) / 2 - 22, surf - 50); }

    // viitură Q100 (peste elemente — arată ce inundă)
    if (p.flood) { var fl = surf - 36; ctx.fillStyle = 'rgba(220,38,38,.22)'; ctx.fillRect(0, fl, W, H - fl); ctx.strokeStyle = '#ef4444'; ctx.setLineDash([6, 4]); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, fl); ctx.lineTo(W, fl); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = '#fecaca'; ctx.font = 'bold 11px sans-serif'; ctx.fillText('⚠ Nivel viitură Q100 — ce e sub linie inundă', 14, fl - 5); }

    // banner zonă activă (sus) — ce element e selectat acum
    var z = RZONES[p.activeZone];
    if (z) { var on = !!placed[p.activeZone]; ctx.fillStyle = 'rgba(255,255,255,.94)'; ctx.fillRect(12, 12, Math.min(420, W - 24), 22); ctx.fillStyle = on ? '#15803d' : '#92400e'; ctx.font = 'bold 12px sans-serif'; ctx.fillText((on ? '✓ amplasat: ' : '▸ apasă pentru a amplasa: ') + z.title, 18, 27); }
    ctx.fillStyle = 'rgba(11,20,36,.6)'; ctx.font = '11px sans-serif'; ctx.fillText('Secțiune transversală — ' + (p.riverName || 'Bahlui'), W - 180, H - 8);
    return { waterLevel: p.waterLevel, placed: Object.keys(placed).filter(function (k) { return placed[k]; }), flood: !!p.flood };
  }

  // ── Capacity (factori reali din UXI/Intelligence) ──
  function capFactors() {
    var U = G.UXI && G.UXI.CONST;
    return {
      hh: (U && U.HOUSEHOLD) || 2.4,
      water_lpd: (U && U.WATER_LPD) || 150,
      school: (U && U.SCHOOL_PER_DWELL) || 0.25, // locuri/locuință
      green_cap: (U && U.GREEN_PER_CAP) || 8     // mp/locuitor
    };
  }
  // Capacitatea se raportează la o ZONĂ (catchment local), NU la tot orașul — altfel un
  // ansamblu nou nu stresează niciodată infrastructura. catchment_pop + baseline_util editabile.
  function capCompute(apartments, opts) {
    opts = opts || {}; var f = capFactors(); var pers = apartments * f.hh;
    var cpop = +opts.catchment_pop || 6000;          // populația deja deservită de rețeaua locală
    var util = opts.baseline_util == null ? 0.80 : +opts.baseline_util; // gradul de încărcare actual
    var add = {
      water: pers * f.water_lpd / 1000,         // m³/zi
      sewer: pers * f.water_lpd / 1000 * 0.85,  // m³/zi
      schools: apartments * f.school,           // locuri
      kindergarten: apartments * f.school * 0.5,
      green: pers * f.green_cap,                // mp necesari
      impermeable: apartments * 35              // mp amprentă estimată
    };
    // cererea curentă a catchment-ului local (per indicator)
    var curr = {
      water: cpop * f.water_lpd / 1000, sewer: cpop * f.water_lpd / 1000 * 0.85,
      schools: cpop / f.hh * f.school, kindergarten: cpop / f.hh * f.school * 0.5,
      green: cpop * f.green_cap, impermeable: cpop / f.hh * 35
    };
    var ind = ['water', 'sewer', 'schools', 'kindergarten', 'green', 'impermeable'];
    var labels = { water: 'Apă potabilă', sewer: 'Canalizare', schools: 'Școli', kindergarten: 'Grădinițe', green: 'Spațiu verde', impermeable: 'Impermeabilizare' };
    var units = { water: 'm³/zi', sewer: 'm³/zi', schools: 'locuri', kindergarten: 'locuri', green: 'mp', impermeable: 'mp' };
    return ind.map(function (k) {
      var cap = util > 0 ? curr[k] / util : curr[k]; // capacitatea = cererea curentă / gradul de încărcare
      var used = curr[k] + add[k];
      var pct = cap ? Math.round(used / cap * 100) : 0;
      return { key: k, label: labels[k], unit: units[k], added: Math.round(add[k]), capacity: Math.round(cap), current: Math.round(curr[k]), pct: pct, over: pct > 100 };
    });
  }
  function _pop() { try { var key = (G.TCI && G.TCI.cityKey) || localStorage.getItem('ux_last_city'); var c = key && ((G._RO_CITIES_DB && G._RO_CITIES_DB[key]) || (G.TCI && G.TCI._EXTRA_UATS && G.TCI._EXTRA_UATS[key])); return c ? (+c.pop2021 || +c.pop || 0) : 0; } catch (e) { return 0; } }

  // ── scenarii (localStorage) ──
  var KEY = 'urbanx_simlab_scenarios_v1';
  function scnLoad() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } }
  function scnSave(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} }
  var scenarios = {
    list: function () { return scnLoad(); },
    add: function (s) { var a = scnLoad(); s.id = 'sc' + (a.length + 1) + '_' + s.sim; a.push(s); scnSave(a); return s; },
    remove: function (id) { scnSave(scnLoad().filter(function (s) { return s.id !== id; })); }
  };

  var DISCLAIMER = 'Acest document este un instrument informativ de explorare pre-proiectare, elaborat în conformitate cu ' +
    'prevederile Legii 350/2001, Art. 5, privind studiile de oportunitate urbanistică. Nu constituie documentație de urbanism ' +
    'și nu are valoare juridică în procedurile de autorizare.';

  // sims care au reprezentare pe harta prin framework-ul de indici (amprenta reala)
  var _INDEX_SIMS = ['city15', 'tod', 'corridor', 'sponge', 'r330300', 'sdg117', 'walkscore', 'gvi', 'spacesyntax', 'noise', 'lst', 'mixuse'];
  function _simCenter() {
    try {
      var c = (G._RO_CITIES_DB && G.TCI && G._RO_CITIES_DB[G.TCI.cityKey]) || (G.TCI && G.TCI._EXTRA_UATS && G.TCI._EXTRA_UATS[G.TCI.cityKey]);
      if (c && c.lat) return { lat: c.lat, lng: c.lon != null ? c.lon : c.lng };
      if (G.map) { var m = G.map.getCenter(); return { lat: m.lat, lng: m.lng }; }
    } catch (e) {}
    return null;
  }

  function exportStudiu(scn, _drawn) {
    try {
      var J = (G.jspdf && G.jspdf.jsPDF) || G.jsPDF; if (!J) { alert('jsPDF indisponibil'); return; }
      var simT = SIMS[scn.sim] ? SIMS[scn.sim].title : (scn.sim || 'Indice');
      // nume UAT real robust (cityName -> nume din baza UAT -> 'UAT')
      var _dbName = '';
      try { var _cc = (G._RO_CITIES_DB && G.TCI && G._RO_CITIES_DB[G.TCI.cityKey]) || (G.TCI && G.TCI._EXTRA_UATS && G.TCI._EXTRA_UATS[G.TCI.cityKey]); _dbName = (_cc && _cc.name) || ''; } catch (e) {}
      var uat = scn.uat || (G.TCI && G.TCI.cityName) || _dbName || 'UAT';

      // ── PAS 1: desenam indicele pe harta INAINTE de captura (altfel captura = harta goala) ──
      // Re-apelam dupa ce harta s-a randat (idle), apoi construim PDF-ul cu captura relevanta.
      if (!_drawn) {
        var ov = document.getElementById('um-map-legend'); // nu blocam daca deja desenat
        var center = _simCenter();
        var alreadyMap = G.map && G.map.getLayer && (G.map.getLayer('seis-disk') || G.map.getLayer('flood-fill') || G.map.getLayer('ala-pts'));
        if (center && G.map && G.addModelToMap && _INDEX_SIMS.indexOf(scn.sim) >= 0 && !alreadyMap) {
          try { G.map.jumpTo({ center: [center.lng, center.lat], zoom: 14.2, pitch: 0, bearing: 0 }); } catch (e) {}
          var _sz = (scn.params && (scn.params.radius_m || scn.params.raza_m || scn.params.lungime_m)) || 700;
          try { G.addModelToMap(G.map, center, scn.sim, _sz); } catch (e) {}
          var _done = false, _go = function () { if (_done) return; _done = true; try { exportStudiu(scn, true); } catch (e) {} };
          try { G.map.once('idle', _go); } catch (e) {}
          setTimeout(_go, 1500); // fallback daca 'idle' nu se declanseaza
          return;
        }
        // seismic/flood deja desenate de user -> capturam ca atare; restul -> fara captura harta
        _drawn = true;
      }
      // A4: raport la standardul MP/PMUD (motor _makeStratDoc: diacritice, justify, grafice)
      if (typeof G._makeStratDoc === 'function') {
        var pdf = new J({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        var D = G._makeStratDoc(pdf, { docTitle: 'STUDIU DE OPORTUNITATE · SIMLAB', cityName: uat, accent: [0, 130, 122] });
        var W = 210, ML = D.dims.ML, CW = D.dims.CW;
        // ── pagina 1: titlu (chrome suprimat) ──
        D.setSuppress(true); D.setPage(1);
        pdf.setFillColor(7, 26, 24); pdf.rect(0, 0, W, 46, 'F'); pdf.setFillColor(0, 130, 122); pdf.rect(0, 46, W, 1.4, 'F');
        pdf.setTextColor(120, 220, 200); pdf.setFont('DejaVuRO', 'bold'); pdf.setFontSize(8); pdf.text('URBANX · SIMLAB', ML, 16);
        pdf.setTextColor(255, 255, 255); pdf.setFontSize(17); pdf.text(D.S2('Studiu de oportunitate'), ML, 30);
        pdf.setFontSize(11); pdf.setTextColor(140, 210, 195); pdf.text(D.S2(simT + '  ·  ' + uat), ML, 40);
        D.setSuppress(false); D.setY(56);
        D.P('Prezentul studiu de oportunitate analizeaza modelul/indicele "' + simT + '" pentru ' + uat + ', generat in laboratorul de simulare UrbanX SimLab. Documentul fundamenteaza decizia de oportunitate (Legea 350/2001, art. 5), pe baza parametrilor de intrare si a rezultatelor calculate, ca instrument de pre-analiza pentru deciziile de planificare urbana.');
        var rk = Object.keys(scn.results || {});
        if (rk.length) { D.kpis(rk.slice(0, 4).map(function (k) { return { val: String(scn.results[k]), label: k, sub: '' }; })); }
        // ── captura harta DOAR daca indicele/simularea e efectiv desenat pe harta ──
        // (altfel am embeda harta goala = captura irelevanta, exact ce reclama userul)
        try {
          var _ovLayers = ['seis-disk', 'flood-fill', 'ala-pts', 'um-iso', 'um-tod', 'um-sponge', 'um-corridor', 'um-330', 'um-sdg117', 'um-walk', 'um-gvi', 'um-ss', 'um-noise', 'um-lst', 'um-mix', 'superbloc-fill'];
          var _hasOverlay = G.map && G.map.getLayer && _ovLayers.some(function (id) { return !!G.map.getLayer(id); });
          if (G.map && G.map.getCanvas && _hasOverlay) {
            var img = G.map.getCanvas().toDataURL('image/jpeg', 0.82);
            if (img && img.length > 2000) {
              D.P('Vizualizare pe harta (simulare desenata pe teren real)', { bold: true, fs: 11, gap: 1 });
              D.ensure(96); var iw = CW, ih = Math.round(iw * 0.58);
              try { pdf.addImage(img, 'JPEG', ML, D.y, iw, ih, '', 'FAST'); pdf.setDrawColor(200, 208, 220); pdf.rect(ML, D.y, iw, ih, 'S'); } catch (e) {}
              D.setY(D.y + ih + 3); D.source('Captura harta UrbanX · ' + simT + ' · ' + uat);
            }
          }
        } catch (e) {}
        // ── diagrama / thumbnail model ──
        if (scn.thumb) {
          try {
            D.P('Diagrama modelului', { bold: true, fs: 11, gap: 1 });
            D.ensure(84); var dw = Math.min(CW, 150), dh = Math.round(dw * 0.5);
            pdf.addImage(scn.thumb, 'JPEG', ML, D.y, dw, dh); D.setY(D.y + dh + 3);
          } catch (e) {}
        }
        // ── parametri + rezultate (tabele) ──
        var pk = Object.keys(scn.params || {});
        if (pk.length) { D.P('Parametri de intrare', { bold: true, fs: 11, gap: 1 }); D.table(['Parametru', 'Valoare'], pk.map(function (k) { return [k, String(scn.params[k])]; }), [Math.round(CW * 0.62), CW - Math.round(CW * 0.62)], { fs: 8, boldFirst: true }); }
        if (rk.length) { D.P('Rezultate ale modelului', { bold: true, fs: 11, gap: 1 }); D.table(['Indicator', 'Valoare'], rk.map(function (k) { return [k, String(scn.results[k])]; }), [Math.round(CW * 0.62), CW - Math.round(CW * 0.62)], { fs: 8, boldFirst: true }); }
        D.callout('Statut juridic', 'Studiu de oportunitate ORIENTATIV generat de UrbanX SimLab (Legea 350/2001, art. 5). Valorile sunt estimari calibrate pe parametrii introdusi; deciziile finale necesita documentatii de specialitate avizate de proiectant atestat.');
        var _af = G._asciiFile || function (s) { return String(s || ''); };
        pdf.save('Studiu_SimLab_' + _af(simT).replace(/[^a-zA-Z0-9._-]/g, '_') + '.pdf');
        // curatam amprenta indicelui desenata special pentru captura
        try { if (_drawn && _INDEX_SIMS.indexOf(scn.sim) >= 0 && G.removeModelFromMap) G.removeModelFromMap(G.map); } catch (e) {}
        return;
      }
      // ── fallback minimal (motor strategic indisponibil) ──
      var jsPDFns = J; var pdfF = new jsPDFns({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      if (G._registerROFont) G._registerROFont(pdfF);
      pdfF.setFontSize(18); pdfF.text('UrbanX SimLab — Studiu de oportunitate', 16, 22);
      pdfF.setFontSize(11); pdfF.text(simT + ' · ' + uat, 16, 32);
      var py = 44; Object.keys(scn.params || {}).forEach(function (k) { pdfF.text('• ' + k + ': ' + scn.params[k], 16, py); py += 6; });
      Object.keys(scn.results || {}).forEach(function (k) { pdfF.text('→ ' + k + ': ' + scn.results[k], 16, py); py += 6; });
      pdfF.save('Studiu_oportunitate_' + (scn.sim || 'scenariu') + '.pdf');
    } catch (e) { console.warn('[SimLab] PDF', e); alert('Eroare PDF: ' + e.message); }
  }

  // ── definirea simulatoarelor ──
  var SIMS = {
    uhi: { ico: '🌡', title: 'UHI — profil termic', desc: 'Estimează răcirea prin soluții verzi pe o secțiune urbană', builtin: true },
    river: { ico: '🌊', title: 'Front de apă', desc: 'Proiectează amenajarea malurilor + simulează viitura Q100', builtin: true },
    capacity: { ico: '📊', title: 'Impact capacitate', desc: 'Ce se întâmplă cu infrastructura dacă mai aprobi X apartamente', builtin: true },
    health: { ico: '🩺', title: 'Scor sănătate urbană', desc: 'Scorecard agregat de cartier (radar 6 dimensiuni) — sinteza tuturor indicilor', builtin: true },
    park: { ico: '🌳', title: 'Parc 3D', desc: 'Vizualizează un parc în 3D înainte de proiect', route: function () { closeAll(); G.Loisir && G.Loisir.openPanel && G.Loisir.openPanel(); } },
    feasibility: { ico: '💰', title: 'Fezabilitate', desc: 'Estimează rentabilitatea unui proiect imobiliar', route: function () { closeAll(); G.Feaz && G.Feaz.openPanel && G.Feaz.openPanel(); } },
    superbloc: { ico: '🟧', title: 'Superbloc (Barcelona)', desc: 'Spațiu public recâștigat + înainte/după pe hartă', route: function () { closeAll(); G.Superbloc && G.Superbloc.openPanel && G.Superbloc.openPanel(); } },
    seismic: { ico: '🌐', title: 'Cutremur (mag. 5-8)', desc: 'Scenariu Vrancea: intensitate EMS-98 + PGA + avarieri — desenat pe hartă', route: function () { closeAll(); G.RiskSeismic && G.RiskSeismic.openPanel && G.RiskSeismic.openPanel(); } },
    flood: { ico: '🌊', title: 'Inundație pluvială', desc: 'Băltire la ploaie extremă pe relief real (SCS-CN) — desenat pe hartă', route: function () { closeAll(); G.RiskFlood && G.RiskFlood.openPanel && G.RiskFlood.openPanel(); } },
    ala: { ico: '🛡', title: 'Adăposturi ALA', desc: 'Inventar candidați protecție civilă (NP-073) — pe hartă', route: function () { closeAll(); G.RiskShelters && G.RiskShelters.toggle && G.RiskShelters.toggle(); } },
    city15: { ico: '🚶', title: 'Oraș 15 minute', desc: 'Acces la servicii esențiale într-o izocronă de mers pe jos', builtin: true },
    tod: { ico: '🚉', title: 'TOD — dezvoltare lângă transport', desc: 'Densitate țintă în jurul unei stații + reducere auto', builtin: true },
    corridor: { ico: '🏙', title: 'Coridor mixt (Mixed-Use)', desc: 'Locuințe + locuri de muncă + venit fiscal pe o axă', builtin: true },
    sponge: { ico: '💧', title: 'Oraș-burete (Sponge City)', desc: 'Retenție apă pluvială + reducere inundații + răcire', builtin: true },
    r330300: { ico: '🌳', title: 'Regula 3-30-300', desc: '3 copaci vizibili · 30% canopy · parc la 300m — înainte/după pe hartă', route: function () { closeAll(); G._openUrbanModel && G._openUrbanModel('r330300'); } },
    sdg117: { ico: '🏛️', title: 'SDG 11.7 — Spațiu public', desc: 'Acces la spațiu public < 400m + mp/locuitor (UN-Habitat) — pe hartă', route: function () { closeAll(); G._openUrbanModel && G._openUrbanModel('sdg117'); } },
    walkscore: { ico: '🚶', title: 'Walk Score', desc: 'Pietonabilitate: amenități pe jos + conectivitate (0-100) — pe hartă', route: function () { closeAll(); G._openUrbanModel && G._openUrbanModel('walkscore'); } },
    gvi: { ico: '🌿', title: 'Green View Index', desc: 'Verde stradal vizibil la nivelul ochiului (street-level) — pe hartă', route: function () { closeAll(); G._openUrbanModel && G._openUrbanModel('gvi'); } },
    spacesyntax: { ico: '🔗', title: 'Space Syntax — Integrare', desc: 'Cât de integrată/accesibilă e rețeaua stradală (Hillier) — pe hartă', route: function () { closeAll(); G._openUrbanModel && G._openUrbanModel('spacesyntax'); } },
    noise: { ico: '🔊', title: 'Expunere zgomot (END)', desc: 'Lden trafic + populație expusă > 55 dB (Directiva 2002/49/CE) — pe hartă', route: function () { closeAll(); G._openUrbanModel && G._openUrbanModel('noise'); } },
    lst: { ico: '🌡️', title: 'Insulă de căldură (LST)', desc: 'Intensitate UHI + răcire prin verde/albedo + populație vulnerabilă — pe hartă', route: function () { closeAll(); G._openUrbanModel && G._openUrbanModel('lst'); } },
    mixuse: { ico: '🧩', title: 'Mix funcțional (entropie)', desc: 'Echilibru funcțiuni (Land Use Mix, Frank et al.) — predictor walkability — pe hartă', route: function () { closeAll(); G._openUrbanModel && G._openUrbanModel('mixuse'); } }
  };

  // ── UI ──
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.78);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(820px,97vw);max-height:95vh;overflow:auto;border:1px solid rgba(212,175,55,.4);border-radius:14px;font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:16px 20px', inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:8px 10px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#d4af37,#b8941f);color:#06101f;border:0;border-radius:9px;padding:10px 15px;font-weight:700;cursor:pointer;font-size:13px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    label: 'font-size:11px;color:#e9d08a;text-transform:uppercase;letter-spacing:.06em;margin:12px 0 6px;font-weight:700'
  };
  var _ov = null;
  function closeAll() { if (_ov) { try { if (_raf) cancelAnimationFrame(_raf); } catch (e) {} _ov.remove(); _ov = null; } }
  var _raf = null;

  function shell(titleHTML) {
    closeAll();
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) closeAll(); }; _ov = ov;
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head }); head.appendChild(el('div', null, titleHTML));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = closeAll; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);
    ov.appendChild(m); document.body.appendChild(ov);
    return body;
  }

  function openDashboard() {
    var body = shell('<div style="font-weight:800;font-size:16px">🧪 UrbanX SimLab — Explorare & Simulare Pre-Proiectare</div><div style="font-size:11px;color:#94a3b8">Manipulează datele, vizualizează live, decide informat · Legea 350/2001 Art. 5</div>');
    // Raport unificat pe TOTI indicatorii (PDF: definitie+formula+sursa+metrici+harta)
    var rep = el('button', { style: 'width:100%;background:rgba(212,175,55,.12);border:1px solid rgba(212,175,55,.4);color:#e9d08a;border-radius:10px;padding:11px;cursor:pointer;font-size:12.5px;font-weight:700;margin-bottom:10px' }, '📄 Raport complet — toți indicatorii (PDF: definiție · formulă · sursă · hartă)');
    rep.onclick = function () { if (G.UrbanIndicesReport && G.UrbanIndicesReport.generate) G.UrbanIndicesReport.generate(); else G.ss && G.ss('Raportul de indici se inițializează…'); };
    body.appendChild(rep);
    body.appendChild(el('div', { style: ST.label }, 'Pornește un simulator'));
    var grid = el('div', { style: 'display:grid;grid-template-columns:repeat(3,1fr);gap:8px' });
    Object.keys(SIMS).forEach(function (k) {
      var s = SIMS[k];
      var c = el('button', { style: 'text-align:left;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:11px;padding:12px;cursor:pointer;color:#e6edf7' });
      c.innerHTML = '<div style="font-size:22px">' + s.ico + '</div><div style="font-weight:700;font-size:13px;margin-top:4px">' + s.title + '</div><div style="font-size:10px;color:#94a3b8;margin-top:3px;line-height:1.3">' + s.desc + '</div>' + (s.builtin ? '' : '<div style="font-size:9px;color:#d4af37;margin-top:4px">↗ modul dedicat</div>');
      c.onmouseover = function () { c.style.borderColor = '#d4af37'; }; c.onmouseout = function () { c.style.borderColor = 'rgba(255,255,255,.1)'; };
      c.onclick = function () { if (s.route) s.route(); else open(k); };
      grid.appendChild(c);
    });
    body.appendChild(grid);
    // scenarii salvate
    var scns = scenarios.list();
    var schead = el('div', { style: 'display:flex;justify-content:space-between;align-items:center' });
    schead.appendChild(el('div', { style: ST.label }, 'Scenarii salvate (' + scns.length + ')'));
    if (scns.length >= 2) { var cmp = el('button', { style: ST.ghost }, '⚖ Compară'); cmp.onclick = compareScenarios; schead.appendChild(cmp); }
    body.appendChild(schead);
    var sl = el('div'); body.appendChild(sl);
    function refresh() {
      var a = scenarios.list();
      if (!a.length) { sl.innerHTML = '<div style="color:#64748b;font-size:12px">Niciun scenariu salvat. Rulează un simulator și apasă „Salvează scenariu".</div>'; return; }
      sl.innerHTML = '';
      a.forEach(function (s) {
        var w = el('div', { style: 'display:flex;justify-content:space-between;align-items:center;font-size:12px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.05)' });
        w.innerHTML = '<span>' + (SIMS[s.sim] ? SIMS[s.sim].ico : '•') + ' <b>' + s.name + '</b> <span style="color:#64748b">· ' + (SIMS[s.sim] ? SIMS[s.sim].title : s.sim) + '</span></span>';
        var act = el('span', { style: 'white-space:nowrap' });
        var ep = el('button', { style: ST.ghost + ';padding:2px 8px' }, '📄 Studiu'); ep.onclick = function () { exportStudiu(s); };
        var dl = el('button', { style: ST.ghost + ';padding:2px 6px;margin-left:4px' }, '✕'); dl.onclick = function () { scenarios.remove(s.id); refresh(); };
        act.appendChild(ep); act.appendChild(dl); w.appendChild(act); sl.appendChild(w);
      });
    }
    refresh();
    body.appendChild(el('div', { style: 'font-size:10px;color:#64748b;margin-top:12px;border-top:1px solid rgba(255,255,255,.06);padding-top:8px' }, 'SimLab rulează client-side (canvas/SVG/math). Scenariile se salvează local în browser; stocarea pe server + share-link = Faza 2. Export = „Studiu de oportunitate" (L.350/2001 art.5) — informativ, fără valoare juridică.'));
  }

  function simHeaderBack(body) { var b = el('button', { style: 'background:rgba(212,175,55,.16);color:#e9d08a;border:1px solid rgba(212,175,55,.4);border-radius:8px;padding:8px 13px;cursor:pointer;font-size:12px;font-weight:700;margin-bottom:10px' }, '← Înapoi la SimLab (toate simulatoarele)'); b.onclick = openDashboard; body.appendChild(b); }

  // ── comparare scenarii (side-by-side, valoarea mai bună evidențiată) ──
  function compareScenarios() {
    var body = shell('<div style="font-weight:800;font-size:16px">⚖ Comparare scenarii</div><div style="font-size:11px;color:#94a3b8">Maxim 3 scenarii alăturate · valorile numerice cele mai mari sunt evidențiate</div>');
    simHeaderBack(body);
    var all = scenarios.list();
    // selectare (max 3)
    var sel = [];
    var pick = el('div', { style: 'margin-bottom:8px' });
    all.forEach(function (s) {
      var lab = el('label', { style: 'display:flex;gap:6px;align-items:center;font-size:12px;color:#cbd5e1;padding:3px 0' });
      var cb = el('input', { type: 'checkbox' }); cb.onchange = function () { if (cb.checked) { if (sel.length >= 3) { cb.checked = false; return; } sel.push(s); } else { sel = sel.filter(function (x) { return x.id !== s.id; }); } draw(); };
      lab.appendChild(cb); lab.appendChild(document.createTextNode((SIMS[s.sim] ? SIMS[s.sim].ico : '•') + ' ' + s.name)); pick.appendChild(lab);
    });
    body.appendChild(pick);
    var out = el('div'); body.appendChild(out);
    function numOf(v) { var m = String(v).replace(/\./g, '').match(/-?\d+([,.]\d+)?/); return m ? parseFloat(m[0].replace(',', '.')) : null; }
    function draw() {
      if (sel.length < 2) { out.innerHTML = '<div style="color:#64748b;font-size:12px">Selectează 2-3 scenarii pentru comparare.</div>'; return; }
      // adună toate cheile de rezultate
      var keys = []; sel.forEach(function (s) { Object.keys(s.results || {}).forEach(function (k) { if (keys.indexOf(k) < 0) keys.push(k); }); });
      var html = '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr><th style="text-align:left;padding:4px;color:#94a3b8">Indicator</th>' + sel.map(function (s) { return '<th style="padding:4px;color:#e9d08a">' + s.name.slice(0, 18) + '</th>'; }).join('') + '</tr></thead><tbody>';
      keys.forEach(function (k) {
        var nums = sel.map(function (s) { return numOf((s.results || {})[k]); });
        var best = Math.max.apply(null, nums.filter(function (x) { return x != null; }));
        html += '<tr style="border-top:1px solid rgba(255,255,255,.06)"><td style="padding:4px;color:#94a3b8">' + k + '</td>' + sel.map(function (s, i) {
          var v = (s.results || {})[k]; var isBest = nums[i] != null && nums[i] === best && nums.filter(function (x) { return x === best; }).length < sel.length;
          return '<td style="padding:4px;text-align:center;' + (isBest ? 'color:#34d399;font-weight:700' : 'color:#e6edf7') + '">' + (v == null ? '—' : v) + '</td>';
        }).join('') + '</tr>';
      });
      html += '</tbody></table><div style="font-size:10px;color:#64748b;margin-top:8px">Evidențierea verde marchează valoarea numerică cea mai mare per indicator (interpretarea „mai bine" depinde de indicator).</div>';
      out.innerHTML = html;
    }
    draw();
  }

  function open(sim) {
    if (sim === 'uhi') return openUHI();
    if (sim === 'river') return openRiver();
    if (sim === 'capacity') return openCapacity();
    if (sim === 'city15') return openModel('city15');
    if (sim === 'tod') return openModel('tod');
    if (sim === 'corridor') return openModel('corridor');
    if (sim === 'sponge') return openModel('sponge');
    if (sim === 'health') return openModel('health');
    if (SIMS[sim] && SIMS[sim].route) return SIMS[sim].route();
  }

  // ── modele urbane parametrice (15-min / TOD / coridor / sponge) ──
  var MODELS = {
    city15: {
      title: '🚶 Oraș 15 minute', accent: '#fb923c',
      params: [
        { k: 'radius_m', label: 'Rază mers pe jos (m)', val: 750, min: 300, max: 1200, step: 50 },
        { k: 'services_density', label: 'Densitate servicii (nr/km²)', val: 40, min: 5, max: 120, step: 5 },
        { k: 'types_present', label: 'Tipuri funcțiuni esențiale (0-7)', val: 5, min: 0, max: 7, step: 1 }
      ],
      compute: function (p) {
        var area_km2 = Math.PI * Math.pow(p.radius_m / 1000, 2);
        var servicii = Math.round(area_km2 * p.services_density);
        var mixitate = Math.round(p.types_present / 7 * 100);
        var walk_min = Math.round(p.radius_m / 80); // ~4.8 km/h
        return { stats: [{ v: servicii, l: 'servicii accesibile', c: '#fb923c' }, { v: mixitate + '%', l: 'scor mixitate (/7 tipuri)', c: '#34d399' }, { v: '~' + walk_min + ' min', l: 'timp de mers la margine', c: '#60a5fa' }, { v: (Math.round(area_km2 * 100) / 100) + ' km²', l: 'arie deservită' }],
          results: { 'Servicii accesibile': servicii, 'Scor mixitate': mixitate + '%', 'Arie': (Math.round(area_km2 * 100) / 100) + ' km²' },
          svg: izochrone(p.radius_m) };
      }
    },
    tod: {
      title: '🚉 TOD — Transit-Oriented Development', accent: '#0ea5e9',
      params: [
        { k: 'radius_m', label: 'Rază în jurul stației (m)', val: 500, min: 200, max: 1000, step: 50 },
        { k: 'density_target', label: 'Densitate țintă (loc/ha)', val: 200, min: 50, max: 500, step: 25 }
      ],
      compute: function (p) {
        var zona_ha = Math.PI * Math.pow(p.radius_m / 1000, 2) * 100;
        var pop = Math.round(zona_ha * p.density_target);
        var reducere_auto = 35; // studii TOD globale
        return { stats: [{ v: Math.round(zona_ha) + ' ha', l: 'zonă TOD (cerc stație)', c: '#0ea5e9' }, { v: pop.toLocaleString('ro-RO'), l: 'populație suportată', c: '#34d399' }, { v: '−' + reducere_auto + '%', l: 'deplasări auto (vs sprawl)', c: '#fb923c' }],
          results: { 'Zonă TOD': Math.round(zona_ha) + ' ha', 'Populație': pop.toLocaleString('ro-RO'), 'Reducere auto': '−' + reducere_auto + '%' },
          svg: concentric(p.radius_m) };
      }
    },
    corridor: {
      title: '🏙 Coridor mixt (Mixed-Use)', accent: '#a855f7',
      params: [
        { k: 'lungime_m', label: 'Lungime coridor (m)', val: 800, min: 200, max: 3000, step: 100 },
        { k: 'latime_m', label: 'Adâncime front (m)', val: 60, min: 20, max: 150, step: 10 },
        { k: 'cut', label: 'CUT mediu', val: 2.5, min: 0.5, max: 5, step: 0.1 },
        { k: 'mix_rezidential', label: 'Mix rezidențial (%)', val: 60, min: 0, max: 100, step: 5 }
      ],
      compute: function (p) {
        var area_m2 = p.lungime_m * p.latime_m, ha = area_m2 / 10000;
        var gba = area_m2 * p.cut;
        var rez = gba * p.mix_rezidential / 100, com = gba - rez;
        var locuinte = Math.round(rez * 0.82 / 65), munca = Math.round(com / 25);
        var taxa = Math.round((locuinte * 900 + munca * 1200)); // impozit estimativ RON/an
        return { stats: [{ v: (Math.round(ha * 10) / 10) + ' ha', l: 'suprafață coridor', c: '#a855f7' }, { v: locuinte.toLocaleString('ro-RO'), l: 'locuințe noi', c: '#34d399' }, { v: munca.toLocaleString('ro-RO'), l: 'locuri de muncă', c: '#60a5fa' }, { v: (Math.round(taxa / 1000)) + 'k RON', l: 'venit fiscal anual est.', c: '#fbbf24' }],
          results: { 'Suprafață': (Math.round(ha * 10) / 10) + ' ha', 'GBA': Math.round(gba).toLocaleString('ro-RO') + ' mp', 'Locuințe': locuinte, 'Locuri muncă': munca, 'Venit fiscal/an': taxa.toLocaleString('ro-RO') + ' RON' }, svg: null };
      }
    },
    sponge: {
      title: '💧 Oraș-burete (Sponge City)', accent: '#22d3ee',
      params: [
        { k: 'area_ha', label: 'Suprafață intervenție (ha)', val: 5, min: 0.5, max: 100, step: 0.5 },
        { k: 'permeabil_target', label: 'Suprafețe permeabile țintă (%)', val: 60, min: 10, max: 90, step: 5 },
        { k: 'retentie_mm', label: 'Capacitate retenție (mm ploaie)', val: 40, min: 10, max: 120, step: 5 }
      ],
      compute: function (p) {
        var area_m2 = p.area_ha * 10000;
        var perm_m2 = area_m2 * p.permeabil_target / 100;
        var volum = Math.round(perm_m2 * p.retentie_mm / 1000); // m³ reținut la o ploaie
        var reducere_inund = Math.min(80, Math.round(p.permeabil_target * 0.8));
        var racire = Math.round(Math.min(2.5, perm_m2 * 0.00015) * 10) / 10; // °C local (NbS)
        return { stats: [{ v: volum.toLocaleString('ro-RO') + ' m³', l: 'apă reținută / ploaie', c: '#22d3ee' }, { v: '−' + reducere_inund + '%', l: 'risc inundații locale', c: '#34d399' }, { v: '−' + racire + '°C', l: 'răcire locală (UHI)', c: '#60a5fa' }],
          results: { 'Apă reținută': volum.toLocaleString('ro-RO') + ' m³/ploaie', 'Reducere inundații': '−' + reducere_inund + '%', 'Răcire': '−' + racire + '°C', 'Permeabil': p.permeabil_target + '%' }, svg: null };
      }
    },
    health: {
      title: '🩺 Scor sănătate urbană de cartier', accent: '#7C3AED',
      params: [
        { k: 'prox', label: 'Proximitate (15-min / Walk Score)', val: 60, min: 0, max: 100, step: 5 },
        { k: 'verde', label: 'Verde & canopy (3-30-300 / GVI)', val: 45, min: 0, max: 100, step: 5 },
        { k: 'public', label: 'Spațiu public (SDG 11.7)', val: 50, min: 0, max: 100, step: 5 },
        { k: 'mob', label: 'Mobilitate & transport (TOD)', val: 55, min: 0, max: 100, step: 5 },
        { k: 'clima', label: 'Reziliență climatică (Sponge / UHI)', val: 40, min: 0, max: 100, step: 5 },
        { k: 'retea', label: 'Conectivitate rețea (Space Syntax)', val: 65, min: 0, max: 100, step: 5 }
      ],
      compute: function (p) {
        var dims = [['Proximit.', p.prox, 'Proximitate'], ['Verde', p.verde, 'Verde & canopy'], ['Sp. public', p.public, 'Spațiu public'], ['Mobilit.', p.mob, 'Mobilitate'], ['Climă', p.clima, 'Reziliență climatică'], ['Rețea', p.retea, 'Conectivitate rețea']];
        var vals = dims.map(function (d) { return d[1]; });
        var agg = Math.round(vals.reduce(function (a, b) { return a + b; }, 0) / vals.length);
        var cat = agg >= 80 ? 'Excelent' : agg >= 65 ? 'Bun' : agg >= 50 ? 'Acceptabil' : agg >= 35 ? 'Fragil' : 'Critic';
        var catC = agg >= 65 ? '#34d399' : agg >= 50 ? '#fbbf24' : '#f87171';
        var minV = Math.min.apply(null, vals); var minName = dims[vals.indexOf(minV)][2];
        var sub = vals.filter(function (v) { return v < 50; }).length;
        var rec = 'Prioritate: ' + minName + ' (' + minV + '/100)';
        var stats = [
          { v: agg + '/100', l: 'Scor sănătate urbană', c: catC },
          { v: cat, l: 'Categorie', c: catC },
          { v: minName, l: 'Cea mai slabă dimensiune', c: '#f87171' },
          { v: sub, l: 'dimensiuni sub 50', c: sub ? '#fbbf24' : '#34d399' }
        ];
        var results = { 'Scor sănătate urbană': agg + '/100', 'Categorie': cat, 'Prioritate': minName + ' (' + minV + '/100)' };
        dims.forEach(function (d) { results[d[2]] = d[1] + '/100'; });
        return { stats: stats, results: results, svg: radarChart(dims, catC, rec) };
      }
    }
  };
  // radar 6 dimensiuni pentru scorul agregat de sănătate urbană
  function radarChart(dims, color, caption) {
    var cx = 100, cy = 66, R = 46, n = dims.length;
    function pt(i, rad) { var a = -Math.PI / 2 + i * 2 * Math.PI / n; return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)]; }
    var rings = '';
    [0.25, 0.5, 0.75, 1].forEach(function (f) { var pts = dims.map(function (_, i) { var q = pt(i, R * f); return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' '); rings += '<polygon points="' + pts + '" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="0.5"/>'; });
    var axes = '', labels = '';
    dims.forEach(function (d, i) {
      var e = pt(i, R); axes += '<line x1="' + cx + '" y1="' + cy + '" x2="' + e[0].toFixed(1) + '" y2="' + e[1].toFixed(1) + '" stroke="rgba(255,255,255,.12)" stroke-width="0.4"/>';
      var l = pt(i, R + 11); var anc = l[0] < cx - 4 ? 'end' : l[0] > cx + 4 ? 'start' : 'middle';
      labels += '<text x="' + l[0].toFixed(1) + '" y="' + (l[1] + 2).toFixed(1) + '" text-anchor="' + anc + '" fill="#94a3b8" font-size="6">' + d[0] + ' ' + d[1] + '</text>';
    });
    var dpts = dims.map(function (d, i) { var q = pt(i, R * Math.max(0, Math.min(100, d[1])) / 100); return q[0].toFixed(1) + ',' + q[1].toFixed(1); }).join(' ');
    var rgb = color === '#34d399' ? '52,211,153' : color === '#fbbf24' ? '251,191,36' : '248,113,113';
    return '<svg viewBox="0 0 200 145" style="width:100%;max-width:320px">' + rings + axes + '<polygon points="' + dpts + '" fill="rgba(' + rgb + ',.30)" stroke="' + color + '" stroke-width="1.5"/>' + labels + '<text x="100" y="141" text-anchor="middle" fill="#cbd5e1" font-size="6.5">' + caption + '</text></svg>';
  }
  function izochrone(r) { var R = 60; return '<svg viewBox="0 0 200 130" style="width:100%;max-width:260px"><circle cx="100" cy="65" r="' + R + '" fill="rgba(251,146,60,.18)" stroke="#fb923c" stroke-width="2" stroke-dasharray="4 3"/><circle cx="100" cy="65" r="6" fill="#fb923c"/><text x="100" y="68" text-anchor="middle" fill="#fff" font-size="9">' + r + 'm</text><text x="100" y="122" text-anchor="middle" fill="#94a3b8" font-size="9">izocronă mers pe jos</text></svg>'; }
  function concentric(r) { return '<svg viewBox="0 0 200 130" style="width:100%;max-width:260px"><circle cx="100" cy="62" r="55" fill="rgba(14,165,233,.10)" stroke="#0ea5e9" stroke-width="1.5"/><circle cx="100" cy="62" r="36" fill="rgba(14,165,233,.18)" stroke="#0ea5e9" stroke-width="1.5"/><circle cx="100" cy="62" r="18" fill="rgba(14,165,233,.3)"/><rect x="94" y="56" width="12" height="12" fill="#0ea5e9"/><text x="100" y="122" text-anchor="middle" fill="#94a3b8" font-size="9">densitate descrescătoare de la stație (' + r + 'm)</text></svg>'; }

  function openModel(key) {
    var M = MODELS[key]; if (!M) return;
    var body = shell('<div style="font-weight:800;font-size:16px">' + M.title + '</div><div style="font-size:11px;color:#94a3b8">Model urban parametric · L.350 art.5 · ' + SIMS[key].desc + '</div>');
    simHeaderBack(body);
    var p = {}; M.params.forEach(function (q) { p[q.k] = q.val; });
    var out = el('div'); var svgBox = el('div', { style: 'text-align:center;margin:8px 0' });
    var sliders = el('div');
    M.params.forEach(function (q) {
      var w = el('div', { style: 'margin-bottom:6px' }); var v = el('span', { style: 'color:' + M.accent + ';font-weight:700' }, '' + q.val);
      w.appendChild(el('span', { style: 'font-size:12px;color:#cbd5e1' }, q.label + ' — ')); w.firstChild.appendChild(v);
      var i = el('input', { type: 'range', min: '' + q.min, max: '' + q.max, step: '' + q.step, value: '' + q.val, style: 'width:100%' });
      i.oninput = function () { p[q.k] = +i.value; v.textContent = i.value; redraw(); }; w.appendChild(i); sliders.appendChild(w);
    });
    body.appendChild(sliders); body.appendChild(svgBox); body.appendChild(out);
    var lastRes = {};
    function redraw() { var r = M.compute(p); lastRes = r.results; out.innerHTML = statCards(r.stats); svgBox.innerHTML = r.svg || ''; }
    redraw();
    saveBar(body, key, function () { return Object.assign({}, p); }, function () { return lastRes; }, null);
    body.appendChild(el('div', { style: 'font-size:10px;color:#64748b;margin-top:8px' }, 'Model parametric (calcul instant). Pentru analiza pe POI/rețele reale (Overpass/OSM) folosește modulele de hartă. Export = „Studiu de oportunitate" L.350 art.5.'));
  }

  function saveBar(body, sim, getParams, getResults, getThumb) {
    var bar = el('div', { style: 'display:flex;gap:6px;margin-top:10px;flex-wrap:wrap' });
    var sv = el('button', { style: ST.btn }, '💾 Salvează scenariu');
    var ex = el('button', { style: ST.ghost }, '📄 Exportă Studiu (L.350)');
    sv.onclick = function () { var nm = prompt('Nume scenariu:', SIMS[sim].title + ' — ' + new Date().toLocaleDateString('ro-RO')); if (!nm) return; scenarios.add({ name: nm, sim: sim, uat: (G.TCI && G.TCI.cityName) || '', params: getParams(), results: getResults(), thumb: getThumb ? getThumb() : null }); G.ss && G.ss('✅ Scenariu salvat'); };
    ex.onclick = function () { exportStudiu({ name: SIMS[sim].title, sim: sim, uat: (G.TCI && G.TCI.cityName) || '', params: getParams(), results: getResults(), thumb: getThumb ? getThumb() : null }); };
    bar.appendChild(sv); bar.appendChild(ex); body.appendChild(bar);
  }

  function statCards(stats) { return '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">' + stats.map(function (s) { return '<div style="flex:1;min-width:90px;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:10px;text-align:center"><div style="font-size:16px;font-weight:800;color:' + (s.c || '#e9d08a') + '">' + s.v + '</div><div style="font-size:10px;color:#94a3b8">' + s.l + '</div></div>'; }).join('') + '</div>'; }

  // SIM 1 — UHI profil termic
  function openUHI() {
    var body = shell('<div style="font-weight:800;font-size:16px">🌡 SimLab — UHI (profil termic urban)</div><div style="font-size:11px;color:#94a3b8">Profil de temperatură pe o secțiune oraș · soluții verzi · C40/Bowler 2010</div>');
    simHeaderBack(body);
    var p = { treePct: 35, greenPct: 25, roofPct: 10, season: 'vara' };
    var cv = el('canvas', { width: '660', height: '240', style: 'width:100%;background:#020617;border-radius:10px;border:1px solid rgba(255,255,255,.1)' }); body.appendChild(cv);
    var out = el('div'); var stats = {};
    function redraw() { stats = drawUHI(cv, p); out.innerHTML = statCards([{ v: stats.maxStreetTemp + '°C', l: 'temp. max stradă', c: '#f87171' }, { v: stats.minParkTemp + '°C', l: 'temp. min parc', c: '#60a5fa' }, { v: '−' + stats.uhiReduction + '°C', l: 'reducere UHI', c: '#34d399' }, { v: stats.co2Stored + ' t', l: 'CO2/an/ha', c: '#86efac' }]); }
    // presets
    var pre = el('div', { style: 'display:flex;gap:6px;margin-top:8px;flex-wrap:wrap' });
    [['Parc minim', 20, 15, 0], ['Standard european', 35, 25, 10], ['Țintă Singapore', 45, 35, 20]].forEach(function (o) { var b = el('button', { style: ST.ghost }, o[0]); b.onclick = function () { p.treePct = o[1]; p.greenPct = o[2]; p.roofPct = o[3]; sync(); }; pre.appendChild(b); }); body.appendChild(pre);
    var sliders = el('div', { style: 'margin-top:8px' });
    function sl(lbl, key, max) { var w = el('div', { style: 'margin-bottom:6px' }); var v = el('span', { style: 'color:#e9d08a;font-weight:700' }, p[key] + '%'); w.appendChild(el('span', { style: 'font-size:12px;color:#cbd5e1' }, lbl + ' — ')); w.firstChild.appendChild(v); var i = el('input', { type: 'range', min: '0', max: '' + max, value: '' + p[key], style: 'width:100%' }); i.oninput = function () { p[key] = +i.value; v.textContent = i.value + '%'; redraw(); }; w.appendChild(i); sliders.appendChild(w); return i; }
    var s1 = sl('Acoperire copaci', 'treePct', 60), s2 = sl('Suprafețe verzi', 'greenPct', 50), s3 = sl('Acoperișuri verzi', 'roofPct', 40);
    var seasonSel = el('select', { style: ST.inp }); ['vara', 'primavara', 'toamna', 'iarna'].forEach(function (s) { seasonSel.appendChild(el('option', { value: s }, s)); }); seasonSel.onchange = function () { p.season = seasonSel.value; redraw(); }; sliders.appendChild(seasonSel);
    body.appendChild(sliders); body.appendChild(out);
    function sync() { s1.value = p.treePct; s2.value = p.greenPct; s3.value = p.roofPct; s1.dispatchEvent(new Event('input')); s2.dispatchEvent(new Event('input')); s3.dispatchEvent(new Event('input')); }
    redraw();
    saveBar(body, 'uhi', function () { return { 'Copaci %': p.treePct, 'Verde %': p.greenPct, 'Acoperiș verde %': p.roofPct, 'Anotimp': p.season }; }, function () { return { 'Temp max': stats.maxStreetTemp + '°C', 'Reducere UHI': '−' + stats.uhiReduction + '°C', 'CO2': stats.co2Stored + ' t/an/ha' }; }, function () { try { return cv.toDataURL('image/jpeg', 0.7); } catch (e) { return null; } });
  }

  // SIM 2 — Front de apă
  function openRiver() {
    var body = shell('<div style="font-weight:800;font-size:16px">🌊 SimLab — Front de apă (secțiune mal)</div><div style="font-size:11px;color:#94a3b8">Amenajarea malurilor + simulare viitură Q100 · model Cheonggyecheon/Bahlui</div>');
    simHeaderBack(body);
    var p = { waterLevel: 40, season: 'vara', activeZone: 'promenada', flood: false, riverName: 'Bahlui', placed: { promenada: true } };
    var cv = el('canvas', { width: '660', height: '280', style: 'width:100%;background:#020617;border-radius:10px;border:1px solid rgba(255,255,255,.1)' }); body.appendChild(cv);
    body.appendChild(el('div', { style: 'font-size:11px;color:#94a3b8;margin-top:6px' }, 'Apasă un element ca să-l <b>amplasezi/elimini</b> pe secțiune (poți compune mai multe). Elementul activ e evidențiat portocaliu.'));
    var info = el('div', { style: 'font-size:11px;color:#cbd5e1;margin-top:6px;min-height:30px' });
    var zbar = el('div', { style: 'display:flex;gap:5px;margin-top:8px;flex-wrap:wrap' });
    var ZLABEL = { promenada: 'Promenadă', terasa: 'Terasă', viewpoint: 'Belvedere', mal: 'Mal natural', apa: 'Ponton/apă', pod: 'Pod' };
    var zbtns = {};
    function syncZ() { Object.keys(zbtns).forEach(function (k) { zbtns[k].innerHTML = (p.placed[k] ? '✓ ' : '+ ') + ZLABEL[k]; zbtns[k].setAttribute('style', (p.placed[k] ? 'background:rgba(34,197,94,.2);color:#86efac;border:1px solid rgba(34,197,94,.45)' : ST.ghost) + (p.activeZone === k ? ';outline:2px solid #fb923c' : '') + ';border-radius:8px;padding:7px 11px;cursor:pointer;font-size:12px;font-weight:600'); }); }
    Object.keys(RZONES).forEach(function (k) {
      var b = el('button', null, (p.placed[k] ? '✓ ' : '+ ') + ZLABEL[k]);
      b.onclick = function () { p.placed[k] = !p.placed[k]; p.activeZone = k; info.innerHTML = '<b style="color:#7dd3fc">' + (p.placed[k] ? 'Amplasat: ' : 'Eliminat: ') + RZONES[k].title + '</b><br>' + RZONES[k].desc; syncZ(); };
      zbtns[k] = b; zbar.appendChild(b);
    });
    body.appendChild(zbar); body.appendChild(info); syncZ();
    var ctr = el('div', { style: 'margin-top:8px' });
    var wl = el('div', { style: 'margin-bottom:6px' }); var wv = el('span', { style: 'color:#7dd3fc;font-weight:700' }, '40'); wl.appendChild(el('span', { style: 'font-size:12px;color:#cbd5e1' }, 'Nivel apă — ')); wl.firstChild.appendChild(wv);
    var ws = el('input', { type: 'range', min: '0', max: '100', value: '40', style: 'width:100%' }); ws.oninput = function () { p.waterLevel = +ws.value; wv.textContent = ws.value; }; wl.appendChild(ws); ctr.appendChild(wl);
    var row = el('div', { style: 'display:flex;gap:6px' });
    var ss = el('select', { style: ST.inp }); ['vara', 'primavara', 'toamna', 'iarna'].forEach(function (s) { ss.appendChild(el('option', { value: s }, s)); }); ss.onchange = function () { p.season = ss.value; };
    var fb = el('button', { style: ST.ghost }, '⚠ Simulează viitură Q100'); var flooding = false;
    fb.onclick = function () { if (flooding) return; flooding = true; var lv = p.waterLevel; var iv = setInterval(function () { lv = Math.min(100, lv + 4); p.waterLevel = lv; ws.value = lv; wv.textContent = lv; if (lv >= 100) { clearInterval(iv); p.flood = true; setTimeout(function () { p.flood = false; flooding = false; }, 4000); } }, 60); };
    row.appendChild(ss); row.appendChild(fb); ctr.appendChild(row); body.appendChild(ctr);
    info.innerHTML = '<b style="color:#7dd3fc">' + RZONES.promenada.title + '</b><br>' + RZONES.promenada.desc;
    var gt = 0; (function loop() { _raf = requestAnimationFrame(loop); gt += 16; drawRiver(cv, p, gt); })();
    body.appendChild(el('div', { style: 'background:rgba(56,189,248,.1);border:1px solid rgba(56,189,248,.3);color:#7dd3fc;border-radius:8px;padding:8px 10px;font-size:11px;line-height:1.5;margin-top:10px' },
      '⚖ <b>Cadru legal obligatoriu (front de apă):</b> aviz Apele Române (ABA) pentru orice amenajare pe mal · zonă de protecție min. <b>10 m</b> de la malul apei, unde construcțiile sunt interzise (Legea 107/1996 art. 40) · servitute de trecere 1,5 m (art. 41) · construcții în albie interzise, podurile = excepție cu aviz special (art. 35) · verificare inundabilitate Q1% pe hărțile INHGA. Abordare recomandată: „a trăi cu inundațiile" (design amfibiu — Cheonggyecheon Seoul, Isar München), nu prevenirea lor.'));
    saveBar(body, 'river', function () { var pl = Object.keys(p.placed).filter(function (k) { return p.placed[k]; }).map(function (k) { return RZONES[k].title; }); return { 'Nivel apă': p.waterLevel, 'Anotimp': p.season, 'Elemente amplasate': pl.join(', ') || '—', 'Râu': p.riverName }; }, function () { var pl = Object.keys(p.placed).filter(function (k) { return p.placed[k]; }); return { 'Nr. elemente': pl.length, 'Stare': p.flood ? 'sub viitură Q100' : 'normal', 'Aviz necesar': 'Apele Române (L.107/1996)', 'Zonă protecție': '10 m mal' }; }, function () { try { return cv.toDataURL('image/jpeg', 0.7); } catch (e) { return null; } });
  }

  // SIM 3 — Impact capacitate (gauges SVG, factori UXI)
  function openCapacity() {
    var body = shell('<div style="font-weight:800;font-size:16px">📊 SimLab — Impact capacitate</div><div style="font-size:11px;color:#94a3b8">Cererea de infrastructură generată de N apartamente noi · factori din modulul Intelligence (UXI)</div>');
    simHeaderBack(body);
    var apt = 500;
    var catch0 = Math.max(3000, Math.round((_pop() || 60000) * 0.05));
    var opts = { catchment_pop: catch0, baseline_util: 0.80 };
    var lbl = el('div', { style: 'margin-bottom:6px' }); var av = el('span', { style: 'color:#e9d08a;font-weight:700' }, '500'); lbl.appendChild(el('span', { style: 'font-size:12px;color:#cbd5e1' }, 'Apartamente suplimentare — ')); lbl.firstChild.appendChild(av);
    var sl = el('input', { type: 'range', min: '0', max: '5000', step: '50', value: '500', style: 'width:100%' }); lbl.appendChild(sl); body.appendChild(lbl);
    // context zonă (editabil, transparent)
    var ctxRow = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px' });
    var cwrap = el('div'); cwrap.appendChild(el('div', { style: 'font-size:11px;color:#94a3b8;margin-bottom:3px' }, 'Populație deservită de rețeaua zonei')); var cIn = el('input', { style: ST.inp, type: 'number', value: '' + catch0 }); cIn.oninput = function () { opts.catchment_pop = +cIn.value || catch0; redraw(); }; cwrap.appendChild(cIn);
    var uwrap = el('div'); uwrap.appendChild(el('div', { style: 'font-size:11px;color:#94a3b8;margin-bottom:3px' }, 'Grad de încărcare actual (%)')); var uIn = el('input', { style: ST.inp, type: 'number', min: '10', max: '99', value: '80' }); uIn.oninput = function () { opts.baseline_util = Math.min(0.99, Math.max(0.1, (+uIn.value || 80) / 100)); redraw(); }; uwrap.appendChild(uIn);
    ctxRow.appendChild(cwrap); ctxRow.appendChild(uwrap); body.appendChild(ctxRow);
    var banner = el('div', { style: 'display:none;background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.4);color:#fca5a5;border-radius:8px;padding:8px 10px;font-size:12px;font-weight:700;margin-bottom:8px' }, '⚠ CAPACITATE DEPĂȘITĂ'); body.appendChild(banner);
    var grid = el('div', { style: 'display:grid;grid-template-columns:repeat(3,1fr);gap:8px' }); body.appendChild(grid);
    var last = [];
    function gauge(g) {
      var pct = Math.min(140, g.pct); var sweep = pct / 100 * 240; var col = g.pct > 100 ? '#ef4444' : g.pct > 90 ? '#f59e0b' : '#34d399';
      function pol(deg, r) { var a = (deg - 90) * Math.PI / 180; return [50 + r * Math.cos(a), 50 + r * Math.sin(a)]; }
      function arc(s, e, r) { var a = pol(s, r), b = pol(e, r); var la = (e - s) <= 180 ? 0 : 1; return 'M ' + a[0] + ' ' + a[1] + ' A ' + r + ' ' + r + ' 0 ' + la + ' 1 ' + b[0] + ' ' + b[1]; }
      return '<div style="background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:8px;text-align:center">' +
        '<svg viewBox="0 0 100 70" style="width:100%;max-width:120px"><path d="' + arc(-120, 120, 40) + '" fill="none" stroke="#1e293b" stroke-width="8"/><path d="' + arc(-120, -120 + sweep, 40) + '" fill="none" stroke="' + col + '" stroke-width="8" stroke-linecap="round"/><text x="50" y="52" text-anchor="middle" fill="#e6edf7" font-size="16" font-weight="700">' + g.pct + '%</text></svg>' +
        '<div style="font-size:11px;font-weight:700;color:#cbd5e1">' + g.label + '</div><div style="font-size:9px;color:#94a3b8">+' + N(g.added) + ' ' + g.unit + ' / cap. ' + N(g.capacity) + '</div></div>';
    }
    function redraw() { last = capCompute(apt, opts); grid.innerHTML = last.map(gauge).join(''); banner.style.display = last.some(function (g) { return g.over; }) ? '' : 'none'; }
    sl.oninput = function () { apt = +sl.value; av.textContent = sl.value; redraw(); };
    redraw();
    var x = el('button', { style: ST.ghost + ';margin-top:10px' }, '🏗️ Bilanț complet → modulul Intelligence'); x.onclick = function () { closeAll(); G.UXI && G.UXI.openDashboard && G.UXI.openDashboard(); }; body.appendChild(x);
    body.appendChild(el('div', { style: 'font-size:10px;color:#64748b;margin-top:8px' }, 'Factori per locuință din modulul Intelligence (gospodărie ' + capFactors().hh + ' pers., ' + capFactors().water_lpd + ' l/pers/zi, ' + capFactors().school + ' locuri școală/loc., ' + capFactors().green_cap + ' mp verde/loc.). Capacitatea = cererea actuală a zonei / gradul de încărcare (ambele editabile mai sus). Bilanțul autoritativ, cu capacitățile reale ale operatorilor, e în modulul Intelligence.'));
    saveBar(body, 'capacity', function () { return { 'Apartamente noi': apt, 'Persoane': Math.round(apt * capFactors().hh), 'Pop. zonă deservită': opts.catchment_pop, 'Încărcare actuală': Math.round(opts.baseline_util * 100) + '%' }; }, function () { var r = {}; last.forEach(function (g) { r[g.label] = g.pct + '%' + (g.over ? ' (depășit)' : ''); }); return r; }, null);
  }

  G.SimLab = { openDashboard: openDashboard, open: open, exportStudiu: exportStudiu, scenarios: scenarios, SIMS: SIMS, capCompute: capCompute };
  console.log('[SimLab] dashboard simulare pre-proiectare încărcat (window.SimLab)');
})(window);
