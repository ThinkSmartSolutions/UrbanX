/* ============================================================================
 * UrbanX — SIDU (Strategia Integrată de Dezvoltare Urbană) — UMBRELA strategică.
 * SIDU = „constituția" orașului (10-15 ani): integrează toate domeniile și conduce
 * Masterplan (cartier) + PMUD (mobilitate), care trebuie transpuse în PUG (lege
 * spațială). E nivelul cel mai înalt. Modul complet: registru de proiecte pe domenii
 * + dashboard investiții + ierarhia SIDU→PMUD→PUG + verificarea coerenței (blocaje).
 * window.SIDU: registry · projects · dashboard · check · openPanel · chapter
 * Surse: ghid SIDU (POR/MDLPA) · HG 874/2019 · Legea 350/2001. Ex.: SIDU Iași (331 proiecte).
 * ========================================================================== */
(function (G) {
  'use strict';
  var DOMENII = {
    economie: { label: 'Economie & competitivitate', ico: '💼', drives: '' },
    mobilitate: { label: 'Mobilitate urbană', ico: '🚍', drives: 'PMUD' },
    regenerare: { label: 'Regenerare urbană & spații verzi', ico: '🌳', drives: 'Masterplan/LOISIR' },
    educatie: { label: 'Educație', ico: '🎓', drives: '' },
    sanatate: { label: 'Sănătate & social', ico: '🏥', drives: '' },
    locuire: { label: 'Locuire', ico: '🏘️', drives: 'PUG' },
    turism: { label: 'Turism & cultură', ico: '🏛️', drives: 'Patrimoniu' },
    infrastructura: { label: 'Infrastructură & digitalizare', ico: '🛠️', drives: 'PUG' }
  };
  var FUNDING = ['POR', 'PNRR', 'buget local', 'buget de stat', 'PPP', 'BEI'];
  var STATUS = { propus: 'propus', finantat: 'finanțat', in_executie: 'în execuție', finalizat: 'finalizat' };

  // seed real (proiecte publice SIDU Iași — exemplu)
  // structura unui SIDU real (ESTI București / ghid POR): 5 secțiuni
  var SECTIUNI = ['Context & analiză', 'Formularea strategiei (viziune)', 'Portofoliu de proiecte (listă lungă/scurtă/metropolitane)', 'Plan de acțiune', 'Mediu & monitorizare'];
  var TERMEN = { scurt: 'scurt (0-3 ani)', mediu: 'mediu (3-7 ani)', lung: 'lung (7-15 ani)' };
  var LISTA = { lunga: 'listă lungă', scurta: 'listă scurtă', metropolitan: 'metropolitan' };
  var SEED = [
    { name: 'Spital Regional de Urgență Iași (Moara de Vânt)', domain: 'sanatate', status: 'finantat', cost_mil: 350, funding: 'PNRR', priority: 1, termen: 'mediu', lista: 'scurta' },
    { name: 'Tren Metropolitan Iași (Lețcani–Ciurea–Tomești)', domain: 'mobilitate', status: 'finantat', cost_mil: 280, funding: 'PNRR', priority: 1, drives: 'PMUD', termen: 'mediu', lista: 'metropolitan' },
    { name: 'Tramvaie + autobuze electrice + benzi dedicate', domain: 'mobilitate', status: 'in_executie', cost_mil: 120, funding: 'POR', priority: 1, drives: 'PMUD', termen: 'scurt', lista: 'scurta' },
    { name: 'Iași Velocity — bike-sharing + piste velo metropolitane', domain: 'mobilitate', status: 'propus', cost_mil: 25, funding: 'POR', priority: 2, drives: 'PMUD', termen: 'scurt', lista: 'lunga' },
    { name: 'Regenerare maluri Bahlui (coridor verde)', domain: 'regenerare', status: 'propus', cost_mil: 60, funding: 'POR', priority: 1, drives: 'Masterplan/LOISIR', termen: 'mediu', lista: 'scurta' },
    { name: 'Superbloc-uri pilot (model Barcelona) — regenerare cartiere', domain: 'regenerare', status: 'propus', cost_mil: 15, funding: 'POR', priority: 2, drives: 'Masterplan/PMUD', termen: 'mediu', lista: 'lunga' },
    { name: 'Pol economic Aeroport + Parcuri Industriale (Miroslava/Holboca)', domain: 'economie', status: 'in_executie', cost_mil: 90, funding: 'PPP', priority: 1, termen: 'mediu', lista: 'metropolitan' },
    { name: 'Modernizare rețea școli/grădinițe (ex. Col. Gh. Asachi)', domain: 'educatie', status: 'finantat', cost_mil: 40, funding: 'PNRR', priority: 2, termen: 'scurt', lista: 'lunga' },
    { name: 'Autostrada A8 (Unirii) + A7 — conectivitate regională', domain: 'infrastructura', status: 'in_executie', cost_mil: 0, funding: 'buget de stat', priority: 1, drives: 'PUG', termen: 'lung', lista: 'metropolitan' }
  ];
  var KEY = 'urbanx_sidu_projects_v2';
  function load() { try { var v = localStorage.getItem(KEY); if (v == null) { var a = SEED.map(function (p, i) { return Object.assign({ id: 'sp_seed_' + i, seed: true }, p); }); localStorage.setItem(KEY, JSON.stringify(a)); return a; } return JSON.parse(v); } catch (e) { return SEED.slice(); } }
  function save(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} }
  var projects = {
    list: function () { return load(); },
    add: function (p) { var a = load(); p.id = 'sp' + Date.now(); a.push(p); save(a); return p; },
    remove: function (id) { save(load().filter(function (p) { return p.id !== id; })); }
  };
  function dashboard() {
    var ps = load(); var byDom = {}, byStatus = {}, byFund = {}, byTermen = {}, byLista = {}, total = 0;
    ps.forEach(function (p) { byDom[p.domain] = (byDom[p.domain] || 0) + 1; byStatus[p.status] = (byStatus[p.status] || 0) + 1; byFund[p.funding] = (byFund[p.funding] || 0) + (+p.cost_mil || 0); if (p.termen) byTermen[p.termen] = (byTermen[p.termen] || 0) + 1; if (p.lista) byLista[p.lista] = (byLista[p.lista] || 0) + 1; total += (+p.cost_mil || 0); });
    return { count: ps.length, total_mil: Math.round(total), by_domain: byDom, by_status: byStatus, by_funding: byFund, by_termen: byTermen, by_lista: byLista, drives_pmud: ps.filter(function (p) { return /PMUD/.test(p.drives || ''); }).length, drives_mp: ps.filter(function (p) { return /Masterplan/.test(p.drives || ''); }).length };
  }

  // verificarea coerentei (pastrata)
  var Q = [
    { k: 'sidu', t: 'Există o SIDU aprobată (strategia integrată 10-15 ani)?', gap: 'Fără SIDU, proiectele sunt punctuale, fără prioritizare și fără acces coerent la fonduri UE (POR).' },
    { k: 'pmud', t: 'Există PMUD aprobat și corelat cu SIDU?', gap: 'Fără PMUD corelat, mobilitatea nu detaliază viziunea SIDU; finanțarea (POR/PNRR) e blocată.' },
    { k: 'culoare', t: 'PUG-ul rezervă culoare pentru proiectele PMUD (benzi, piste, lărgiri)?', gap: 'BLOCAJ: fără culoar în PUG, lărgirile/benzile cer exproprieri — nu se pot autoriza.' },
    { k: 'metropolitan', t: 'Ansamblurile din zona metropolitană au străzi corelate cu PMUD?', gap: 'Străzi prea înguste → autobuzul metropolitan nu intră → ambuteiaje la intrările în oraș.' },
    { k: 'transpunere', t: 'Proiectele prioritare SIDU sunt transpuse în RLU/PUG?', gap: 'Proiectele netranspuse în regulamentul de construire rămân pe hârtie / se contestă.' },
    { k: 'verde', t: 'Coridoarele verzi / malurile au regim de protecție în PUG?', gap: 'Fără regim în PUG, coridoarele verzi propuse în SIDU pot fi construite — pierdute.' }
  ];
  function check(ans) { ans = ans || {}; var gaps = Q.filter(function (q) { return ans[q.k] === false; }); var yes = Q.filter(function (q) { return ans[q.k] === true; }).length; var score = Math.round(yes / Q.length * 100); return { score: score, gaps: gaps, verdict: score >= 80 ? 'coerent' : score >= 50 ? 'parțial — risc de blocaje' : 'necorelat — blocaje majore' }; }

  // ── notă scurtă pt MP/PMUD: ele sunt SUBORDONATE documentului SIDU (nu un capitol SIDU în ele) ──
  function subordinationNote(D) {
    if (!D || !D.callout) return;
    D.callout('Document subordonat SIDU',
      'Acest document (Masterplan / PMUD) este o componentă subordonată Strategiei Integrate de Dezvoltare Urbană (SIDU) — ' +
      '„constituția" orașului pe 10-15 ani. SIDU stabilește viziunea și portofoliul integrat (economie, sănătate, educație, ' +
      'locuire, mobilitate, regenerare, turism, infrastructură); Masterplanul detaliază regenerarea de cartier, iar PMUD ' +
      'componenta de mobilitate. Vezi documentul SIDU separat. Toate trebuie transpuse în PUG pentru a deveni aplicabile.',
      [96, 130, 200]);
  }

  // ════════════ DOCUMENT SIDU STANDALONE (umbrela, peste MP + PMUD) ════════════
  function _resolveCity(cityKey) {
    cityKey = cityKey || (G.TCI && G.TCI.cityKey) || localStorage.getItem('ux_last_city') || 'RO-IS-01';
    var c = (G._RO_CITIES_DB && G._RO_CITIES_DB[cityKey]) || (G.TCI && G.TCI._EXTRA_UATS && G.TCI._EXTRA_UATS[cityKey]) || {};
    return { key: cityKey, name: c.name || (G.TCI && G.TCI.cityName) || 'UAT', pop: c.pop2021 || c.pop || c.populatie || 0, judet: c.judet || '', c: c };
  }
  function generateDocument(cityKey) {
    try {
      var jsPDFns = (G.jspdf && G.jspdf.jsPDF) || G.jsPDF; if (!jsPDFns) { alert('jsPDF indisponibil'); return; }
      var city = _resolveCity(cityKey), d = dashboard(), ps = projects.list();
      var pdf = new jsPDFns({ unit: 'mm', format: 'a4' }); if (G._registerROFont) G._registerROFont(pdf);
      var W = 210, H = 297, x = 18, y = 0, F = G._registerROFont ? 'DejaVuRO' : 'helvetica';
      var N = function (n) { try { return Math.round(n).toLocaleString('ro-RO'); } catch (e) { return '' + n; } };
      function foot() { pdf.setFont(F, 'normal'); pdf.setFontSize(7.5); pdf.setTextColor(150); pdf.text('UrbanX · SIDU — Strategia Integrată de Dezvoltare Urbană · ' + city.name, x, 289); pdf.text('' + pdf.internal.getNumberOfPages(), W - x, 289, { align: 'right' }); }
      function head(t) { if (y > H - 40) { foot(); pdf.addPage(); y = 22; } pdf.setFillColor(11, 20, 36); pdf.rect(x - 3, y - 5, W - 2 * (x - 3), 9, 'F'); pdf.setFillColor(96, 165, 250); pdf.rect(x - 3, y - 5, 2.4, 9, 'F'); pdf.setFont(F, 'bold'); pdf.setFontSize(12); pdf.setTextColor(255); pdf.text(t, x, y + 1.5); y += 13; pdf.setTextColor(40); }
      function para(t) { pdf.setFont(F, 'normal'); pdf.setFontSize(9.5); pdf.setTextColor(55); var ls = pdf.splitTextToSize(t, W - 2 * x); ls.forEach(function (l) { if (y > H - 18) { foot(); pdf.addPage(); y = 22; } pdf.text(l, x, y); y += 5; }); y += 2; }
      function kpis(items) { var n = items.length, gap = 4, bw = (W - 2 * x - gap * (n - 1)) / n; items.forEach(function (it, i) { var bx = x + i * (bw + gap); pdf.setFillColor(244, 247, 251); pdf.rect(bx, y, bw, 20, 'F'); pdf.setFont(F, 'bold'); pdf.setFontSize(14); pdf.setTextColor(30, 60, 120); pdf.text(String(it.v), bx + bw / 2, y + 9, { align: 'center' }); pdf.setFont(F, 'normal'); pdf.setFontSize(7.5); pdf.setTextColor(110); pdf.text(pdf.splitTextToSize(it.l, bw - 4), bx + bw / 2, y + 14, { align: 'center' }); }); y += 25; }

      // ── COPERTĂ ──
      pdf.setFillColor(8, 15, 35); pdf.rect(0, 0, W, H, 'F');
      pdf.setFillColor(96, 165, 250); pdf.rect(0, 92, W, 1.5, 'F');
      pdf.setFont(F, 'bold'); pdf.setFontSize(11); pdf.setTextColor(96, 165, 250); pdf.text('STRATEGIA INTEGRATĂ DE DEZVOLTARE URBANĂ', W / 2, 78, { align: 'center' });
      pdf.setFontSize(40); pdf.setTextColor(255); pdf.text('SIDU', W / 2, 120, { align: 'center' });
      pdf.setFontSize(20); pdf.text(city.name, W / 2, 134, { align: 'center' });
      pdf.setFont(F, 'normal'); pdf.setFontSize(11); pdf.setTextColor(160, 175, 200); pdf.text('„Constituția" dezvoltării urbane · orizont 10-15 ani', W / 2, 146, { align: 'center' });
      pdf.setFontSize(9); pdf.setTextColor(120, 135, 165); pdf.text('Cadrul-umbrelă peste Masterplan și PMUD · integrează toate domeniile', W / 2, 156, { align: 'center' });
      pdf.text(new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' }), W / 2, 270, { align: 'center' });
      pdf.addPage(); y = 22;

      // ── 1. Context & analiză ──
      head('1. Context și analiză (radiografia comunității)');
      para('SIDU pornește de la o radiografie completă a comunității: demografie, economie, infrastructură, mediu și calitatea vieții. ' +
        'Spre deosebire de PMUD (exclusiv mobilitate) și de Masterplan (regenerarea unui cartier), SIDU integrează absolut toate domeniile ' +
        'și stabilește prioritățile pe 10-15 ani.');
      kpis([{ v: city.pop ? N(city.pop) : '—', l: 'populație' }, { v: d.count, l: 'proiecte strategice' }, { v: d.total_mil + ' M€', l: 'investiție portofoliu' }, { v: Object.keys(DOMENII).length, l: 'domenii integrate' }]);
      para('Domeniile acoperite: ' + Object.keys(DOMENII).map(function (k) { return DOMENII[k].label; }).join(' · ') + '.');

      // ── 2. Viziune ──
      head('2. Formularea strategiei (viziunea pe 10-15 ani)');
      para('Viziune: un oraș verde, conectat și competitiv economic, cu servicii publice la standard european, în care fiecare locuitor ' +
        'are acces în 15 minute la servicii esențiale, iar dezvoltarea imobiliară este corelată cu infrastructura. SIDU spune „ce vrem să ' +
        'devină orașul"; PMUD detaliază componenta de mobilitate; Masterplanul detaliază regenerarea de cartier.');

      // ── 3. Portofoliu de proiecte ──
      head('3. Portofoliul de proiecte (listă lungă / scurtă / metropolitane)');
      para('Portofoliul integrat reunește, sub aceeași umbrelă, proiecte din toate domeniile (model SIDU Iași — 331 proiecte). ' +
        'Prioritizare pe liste (lungă → scurtă → metropolitane) și pe termen de implementare.');
      var rows = ps.map(function (p) { var dm = DOMENII[p.domain] || {}; return [p.name, dm.label || p.domain, (LISTA[p.lista] || '—'), (TERMEN[p.termen] || '—').replace(/\s*\(.*\)/, ''), (p.cost_mil ? p.cost_mil + ' M€' : '—'), STATUS[p.status] || p.status]; });
      if (pdf.autoTable) { /* nu folosim */ }
      // tabel manual
      var cols = [54, 30, 22, 18, 22, 26], hdr = ['Proiect', 'Domeniu', 'Listă', 'Termen', 'Cost', 'Status'];
      function row(cells, bold, fill) { var rh = 6; cells.forEach(function (c, i) { var lc = pdf.splitTextToSize(String(c), cols[i] - 2); rh = Math.max(rh, lc.length * 3.6 + 2.5); }); if (y + rh > H - 16) { foot(); pdf.addPage(); y = 22; } if (fill) { pdf.setFillColor(244, 247, 251); pdf.rect(x, y, cols.reduce(function (a, b) { return a + b; }, 0), rh, 'F'); } var cx = x; cells.forEach(function (c, i) { pdf.setFont(F, bold ? 'bold' : 'normal'); pdf.setFontSize(7.2); pdf.setTextColor(bold ? 255 : (i === 0 ? 30 : 70), bold ? 255 : 50, bold ? 255 : 70); var lc = pdf.splitTextToSize(String(c), cols[i] - 2); lc.forEach(function (l, li) { pdf.text(l, cx + 1.5, y + 4 + li * 3.6); }); cx += cols[i]; }); y += rh; }
      pdf.setFillColor(14, 26, 54); pdf.rect(x, y, cols.reduce(function (a, b) { return a + b; }, 0), 6, 'F'); row(hdr, true, false);
      rows.forEach(function (r, i) { row(r, false, i % 2 === 0); });
      y += 4;

      // ── 4. Plan de acțiune ──
      head('4. Plan de acțiune (fazare pe termene)');
      var byT = { scurt: [], mediu: [], lung: [] }; ps.forEach(function (p) { if (byT[p.termen]) byT[p.termen].push(p); });
      ['scurt', 'mediu', 'lung'].forEach(function (t) { para('Termen ' + (TERMEN[t] || t) + ': ' + (byT[t].length ? byT[t].map(function (p) { return p.name; }).join('; ') : '—') + '.'); });

      // ── 5. Ierarhia SIDU → PMUD → PUG ──
      head('5. Ierarhia SIDU → PMUD → PUG și corelarea');
      para('SIDU este umbrela mare. PMUD preia componenta de transport și o detaliază matematic. Masterplanul aprofundează un cartier. ' +
        'Niciunul nu emite autorizații — pentru reguli stricte de construire se folosește PUG-ul, cu care SIDU și PMUD trebuie corelate ' +
        'obligatoriu. Decalajul SIDU/PMUD ↔ PUG creează blocaje reale (benzi fără culoar de rezervă → exproprieri; ansambluri în comune ' +
        'cu străzi unde autobuzul metropolitan nu intră). Fiecare proiect strategic trebuie transpus linie cu linie în PUG.');

      // ── 6. Mediu & monitorizare ──
      head('6. Considerații de mediu și monitorizare');
      para('Implementarea se monitorizează prin indicatori (mp spațiu verde/locuitor, transfer modal, reducere emisii, locuințe noi corelate cu ' +
        'infrastructura). Proiectele cu impact > 1 ha necesită evaluare de mediu (OUG 195/2005). Actualizare periodică a portofoliului.');
      para('Surse & cadru: ghid SIDU (POR/MDLPA) · HG 874/2019 (mobilitate) · Legea 350/2001 (PUG/PUZ) · model ESTI București. ' +
        'Document strategic orientativ — se aprobă de Consiliul Local și se transpune în PUG.');
      foot();
      try { G.__siduPages = pdf.getNumberOfPages(); } catch (e) {}
      pdf.save('SIDU_' + (city.name || 'UAT').replace(/[^\w]+/g, '_') + '.pdf');
      G.ss && G.ss('📜 Document SIDU generat');
    } catch (e) { try { G.__siduErr = (e && e.stack) || (e && e.message) || String(e); } catch (_) {} console.warn('[SIDU] document', e); alert('Eroare la generarea documentului SIDU: ' + e.message); }
  }

  // capitol pt rapoarte (cadru strategic SIDU) — DEPRECAT pt MP/PMUD (vezi subordinationNote); păstrat pt compat
  function chapter(D) {
    if (!D || !D.chapter) return;
    var d = dashboard();
    D.chapter('Cadru strategic — SIDU (umbrela)');
    D.P('SIDU (Strategia Integrată de Dezvoltare Urbană) este cadrul de nivel superior (10-15 ani) care ' +
      'integrează toate domeniile și conduce Masterplanul (regenerare de cartier) și PMUD (mobilitate). ' +
      'Acestea trebuie transpuse în PUG pentru a deveni aplicabile.');
    D.kpis([{ label: 'Proiecte strategice', val: '' + d.count, sub: 'în portofoliu' }, { label: 'Investiție', val: d.total_mil + ' M€', sub: 'cumulat' }, { label: 'Conduc PMUD', val: '' + d.drives_pmud, sub: 'mobilitate' }]);
    D.P('Documentația SIDU este structurată (model ESTI București / ghid POR) în 5 secțiuni: ' +
      SECTIUNI.map(function (s, i) { return (i + 1) + '. ' + s; }).join('; ') + '. Portofoliul de mai jos corespunde secțiunii a 3-a, ' +
      'cu prioritizare pe liste (lungă → scurtă → metropolitane) și termen de implementare.');
    var rows = projects.list().slice(0, 12).map(function (p) { var dm = DOMENII[p.domain] || {}; return [p.name, dm.label || p.domain, (LISTA[p.lista] || '—'), (TERMEN[p.termen] || '—').replace(/\s*\(.*\)/, ''), (p.cost_mil ? p.cost_mil + ' M€' : '—'), STATUS[p.status] || p.status]; });
    D.table(['Proiect', 'Domeniu', 'Listă', 'Termen', 'Cost', 'Status'], rows, [54, 30, 22, 18, 22, 26], { boldFirst: true });
    D.callout('Ierarhia SIDU → PMUD → PUG', 'SIDU stabilește viziunea; PMUD detaliază mobilitatea; PUG-ul o face aplicabilă (regim de construire). Proiectele care nu sunt transpuse în PUG rămân nefinanțabile/neautorizabile.', [96, 130, 200]);
  }

  // ── UI ──
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.74);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(720px,96vw);max-height:93vh;overflow:auto;border:1px solid rgba(96,165,250,.4);border-radius:14px;font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:18px 20px', inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:8px 10px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#2563eb,#1d4ed8);color:#fff;border:0;border-radius:9px;padding:10px 14px;font-weight:700;cursor:pointer;font-size:13px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    label: 'font-size:11px;color:#93c5fd;text-transform:uppercase;letter-spacing:.06em;margin:12px 0 6px;font-weight:700'
  };
  function openPanel() {
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head }); head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">🏛 SIDU — Strategia Integrată (umbrela)</div><div style="font-size:11px;color:#94a3b8">Cadrul de nivel superior care conduce Masterplan + PMUD → transpus în PUG</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);
    body.appendChild(el('div', { style: 'background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:10px;font-size:12px;color:#cbd5e1;margin-bottom:10px' },
      '<b style="color:#60a5fa">SIDU</b> <span style="color:#d4af37">→</span> <b style="color:#34d399">PMUD</b> (mobilitate) + <b style="color:#fbbf24">Masterplan</b> (cartier) <span style="color:#d4af37">→</span> <b style="color:#a78bfa">PUG</b> (lege spațială). SIDU e umbrela; restul se subordonează și se transpun în PUG.' +
      '<div style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.07);font-size:11px;color:#94a3b8">Structura documentației (model <b style="color:#cbd5e1">ESTI București</b> / ghid POR): ' +
      SECTIUNI.map(function (s, i) { return '<span style="color:#cbd5e1">' + (i + 1) + '.</span> ' + s; }).join(' &nbsp;·&nbsp; ') + '</div>'));
    var tabs = el('div', { style: 'display:flex;gap:8px;margin-bottom:8px' });
    var t1 = el('button', { style: ST.ghost }, '📋 Proiecte strategice'); var t2 = el('button', { style: ST.ghost }, '☑ Coerență → PUG');
    tabs.appendChild(t1); tabs.appendChild(t2); body.appendChild(tabs);
    var p1 = el('div'); var p2 = el('div', { style: 'display:none' }); body.appendChild(p1); body.appendChild(p2);
    t1.onclick = function () { p1.style.display = ''; p2.style.display = 'none'; renderProjects(); }; t2.onclick = function () { p1.style.display = 'none'; p2.style.display = ''; };

    // PROIECTE
    var dashEl = el('div'); p1.appendChild(dashEl);
    var listEl = el('div'); p1.appendChild(listEl);
    // adaugare
    p1.appendChild(el('div', { style: ST.label }, 'Adaugă proiect strategic'));
    var g = el('div', { style: 'display:grid;grid-template-columns:2fr 1fr;gap:6px' });
    var nm = el('input', { style: ST.inp, placeholder: 'denumire proiect' });
    var domSel = el('select', { style: ST.inp }); Object.keys(DOMENII).forEach(function (k) { domSel.appendChild(el('option', { value: k }, DOMENII[k].ico + ' ' + DOMENII[k].label)); });
    g.appendChild(nm); g.appendChild(domSel); p1.appendChild(g);
    var g2 = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr 1fr 60px;gap:6px;margin-top:6px' });
    var cost = el('input', { style: ST.inp, type: 'number', placeholder: 'M€' });
    var fund = el('select', { style: ST.inp }); FUNDING.forEach(function (f) { fund.appendChild(el('option', { value: f }, f)); });
    var stat = el('select', { style: ST.inp }); Object.keys(STATUS).forEach(function (s) { stat.appendChild(el('option', { value: s }, STATUS[s])); });
    var addB = el('button', { style: ST.btn }, '+'); g2.appendChild(cost); g2.appendChild(fund); g2.appendChild(stat); g2.appendChild(addB); p1.appendChild(g2);
    addB.onclick = function () { if (!nm.value.trim()) return; projects.add({ name: nm.value, domain: domSel.value, cost_mil: +cost.value || 0, funding: fund.value, status: stat.value, priority: 2, drives: (DOMENII[domSel.value] || {}).drives }); nm.value = ''; cost.value = ''; renderProjects(); };
    function renderProjects() {
      var d = dashboard();
      function card(b, s, c) { return '<div style="flex:1;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:10px;text-align:center"><div style="font-size:17px;font-weight:800;color:' + (c || '#60a5fa') + '">' + b + '</div><div style="font-size:10px;color:#94a3b8">' + s + '</div></div>'; }
      dashEl.innerHTML = '<div style="display:flex;gap:8px;margin-bottom:8px">' + card(d.count, 'proiecte') + card(d.total_mil + ' M€', 'investiție', '#34d399') + card(d.drives_pmud, '→ PMUD', '#fbbf24') + card(d.drives_mp, '→ Masterplan', '#a78bfa') + '</div>';
      var ps = projects.list();
      var lc = { scurta: '#34d399', metropolitan: '#a78bfa', lunga: '#94a3b8' };
      listEl.innerHTML = ps.map(function (p) { var dm = DOMENII[p.domain] || {}; var sc = p.status === 'finalizat' ? '#34d399' : p.status === 'in_executie' ? '#60a5fa' : p.status === 'finantat' ? '#fbbf24' : '#94a3b8';
        var badge = p.lista ? '<span style="font-size:9px;padding:1px 5px;border-radius:4px;background:rgba(255,255,255,.06);color:' + (lc[p.lista] || '#94a3b8') + '">' + (LISTA[p.lista] || p.lista) + (p.termen ? ' · t. ' + p.termen : '') + '</span> ' : '';
        return '<div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.05)"><span>' + (dm.ico || '') + ' ' + p.name + ' <span style="color:#64748b">· ' + (dm.label || p.domain) + (p.drives ? ' → ' + p.drives : '') + '</span></span><span style="white-space:nowrap">' + badge + '<b style="color:' + sc + '">' + (STATUS[p.status] || p.status) + '</b> · ' + (p.cost_mil ? p.cost_mil + 'M€' : '') + ' <button data-del="' + p.id + '" style="' + ST.ghost + ';padding:1px 6px;margin-left:4px">✕</button></span></div>'; }).join('');
      listEl.querySelectorAll('[data-del]').forEach(function (b) { b.onclick = function () { projects.remove(b.getAttribute('data-del')); renderProjects(); }; });
    }
    renderProjects();

    // COERENTA
    p2.appendChild(el('div', { style: 'font-size:12px;color:#cbd5e1;margin-bottom:8px' }, 'Verifică dacă strategia e transpusă în PUG (altfel = blocaje). Ex. Iași: decalajul SIDU/PMUD ↔ PUG creează blocaje reale (Podu Roș, benzi fără culoar, ansambluri fără străzi pt autobuz).'));
    var ans = {}; var qrows = el('div'); p2.appendChild(qrows);
    Q.forEach(function (q) { var row = el('div', { style: 'display:flex;justify-content:space-between;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.05)' }); row.appendChild(el('span', { style: 'font-size:12px;flex:1' }, q.t)); var seg = el('div', { style: 'display:flex;gap:4px;flex-shrink:0' }); ['DA', 'NU'].forEach(function (v) { var b = el('button', { style: ST.ghost + ';padding:4px 10px' }, v); b.onclick = function () { ans[q.k] = (v === 'DA'); seg.querySelectorAll('button').forEach(function (bb) { bb.style.background = 'rgba(255,255,255,.06)'; bb.style.color = '#cbd5e1'; }); b.style.background = v === 'DA' ? 'rgba(34,197,94,.25)' : 'rgba(239,68,68,.25)'; b.style.color = v === 'DA' ? '#34d399' : '#f87171'; }; seg.appendChild(b); }); row.appendChild(seg); qrows.appendChild(row); });
    var cb = el('button', { style: ST.btn + ';margin-top:12px' }, '▶ Evaluează coerența'); p2.appendChild(cb);
    var cout = el('div', { style: 'margin-top:10px' }); p2.appendChild(cout);
    cb.onclick = function () { var r = check(ans); var col = r.score >= 80 ? '#22c55e' : r.score >= 50 ? '#f59e0b' : '#ef4444'; cout.innerHTML = '<div style="text-align:center;margin-bottom:8px"><span style="font-size:26px;font-weight:900;color:' + col + '">' + r.score + '%</span> <span style="color:#94a3b8">coerență · ' + r.verdict + '</span></div>' + (r.gaps.length ? r.gaps.map(function (g2) { return '<div style="font-size:12px;padding:5px 8px;margin-bottom:4px;background:#0a1120;border-left:3px solid #ef4444;border-radius:5px"><b>' + g2.t.replace(/\?$/, '') + '</b><br><span style="color:#94a3b8">' + g2.gap + '</span></div>'; }).join('') : '<div style="color:#34d399;font-size:13px">✓ Strategia e transpusă coerent în PUG.</div>'); };

    ov.appendChild(m); document.body.appendChild(ov);
  }

  G.SIDU = { projects: projects, dashboard: dashboard, check: check, chapter: chapter, subordinationNote: subordinationNote, generateDocument: generateDocument, openPanel: openPanel, DOMENII: DOMENII, Q: Q };
  console.log('[SIDU] modul strategic (umbrela) încărcat (window.SIDU)');
})(window);
