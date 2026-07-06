/* ============================================================================
 * UrbanX — PANOU GENERARE PLANȘE TEHNICE (js/15-ux-planse-ui.js)
 * UI peste motorul UX_DRAW: parametri de generare prefilled din modelul DTAC,
 * PREVIEW VIZUAL PE ECRAN (SVG, tab-uri fațade/secțiune) + descărcare robustă
 * (SVG deschizibil oriunde, DXF ZIP, fallback individual). Parametrii tehnici
 * derivați apar în cartuș. Conformitatea = banner consultativ + raport PDF.
 * window.UXPlanseUI
 * ========================================================================== */
(function (G) {
  'use strict';
  function el(t, a, h) { var e = document.createElement(t); if (a) for (var k in a) { if (k === 'style') e.style.cssText = a[k]; else e.setAttribute(k, a[k]); } if (h != null) e.innerHTML = h; return e; }
  function num(x, d) { var v = parseFloat(x); return isNaN(v) ? (d != null ? d : 0) : v; }
  function saveBlob(name, text, mime) {
    try { var b = new Blob([text], { type: mime || 'application/octet-stream' }); var u = URL.createObjectURL(b); var a = document.createElement('a'); a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 2000); return true; } catch (e) { return false; }
  }

  function inferParams(D) {
    D = D || {};
    var Sc = num(D.Sc, 0), niv = Math.max(1, Math.round(num(D.niv_supraterane, 1)));
    var H = num(D.H, 0); var hEtaj = H && niv ? +(H / niv).toFixed(2) : 3.0;
    var lat = num(D.latime_front, 0) || (Sc ? +(Math.sqrt(Sc * 1.3)).toFixed(1) : 12);
    var adanc = Sc && lat ? +(Sc / lat).toFixed(1) : 10;
    return { latime: lat, adancime: adanc, niv: niv, hParter: hEtaj >= 2.6 ? hEtaj : 3.0, hEtaj: hEtaj >= 2.6 ? hEtaj : 3.0,
      roof: niv > 2 ? 'terasa' : 'sarpanta', winPerFloor: Math.max(2, Math.round(lat / 3)) };
  }

  function open(D) {
    D = D || {};
    if (!G.UX_DRAW || !G.UX_DRAW.facadeFromBuilding) { if (G.ss) G.ss('Motorul de planșe (UX_DRAW) nu e încărcat.'); return; }
    var v = (G.UXDoc && G.UXDoc.valideaza) ? G.UXDoc.valideaza(D) : { calc: {} };
    try { if (G.UX_DRAW && G.UX_DRAW.ariiRows && v.calc) v.calc._ariiRows = G.UX_DRAW.ariiRows(D.functiune, D.Sc, D.Sd, D.niv_supraterane); } catch (e) {}
    var P = inferParams(D);

    var ov = el('div', { style: 'position:fixed;inset:0;background:#070c18;z-index:5200;overflow:auto;font-family:system-ui;color:#e6edf7' });
    var wrap = el('div', { style: 'max-width:1100px;margin:0 auto;padding:16px 14px 60px' });
    // header
    var head = el('div', { style: 'display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:10px;flex-wrap:wrap' });
    head.appendChild(el('div', null, '<div style="font-size:17px;font-weight:800;color:#7dd3fc">📐 Planșe tehnice — fațade & secțiune</div><div style="font-size:11.5px;color:#94a3b8;max-width:640px">Generate parametric la scara 1:100, cu cote de nivel, ferestre, acoperiș, fundație sub adâncimea de îngheț, stratificații și parametrii tehnici derivați în cartuș. Le vezi mai jos și le poți descărca (SVG deschizibil în orice browser/Illustrator, sau DXF în AutoCAD/LibreCAD).</div>'));
    var bX = el('button', { style: 'background:none;border:none;color:#94a3b8;font-size:24px;cursor:pointer' }, '✕'); bX.onclick = function () { ov.remove(); }; head.appendChild(bX);
    wrap.appendChild(head);

    // parametri (inline, editabili)
    var grid = el('div', { style: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;background:#0b1220;border:1px solid rgba(148,163,184,.2);border-radius:10px;padding:12px;margin-bottom:10px' });
    function field(lbl, key, val, opts) {
      var w = el('div'); w.appendChild(el('label', { style: 'font-size:10.5px;color:#94a3b8;display:block;margin-bottom:3px' }, lbl));
      var inp;
      if (opts) { inp = el('select', { style: 'width:100%;box-sizing:border-box;background:#0a1120;border:1px solid rgba(148,163,184,.25);border-radius:6px;color:#e6edf7;padding:6px;font-size:12px' }); opts.forEach(function (o) { var op = el('option', { value: o[0] }, o[1]); if (o[0] === val) op.setAttribute('selected', 'selected'); inp.appendChild(op); }); }
      else inp = el('input', { value: val, style: 'width:100%;box-sizing:border-box;background:#0a1120;border:1px solid rgba(148,163,184,.25);border-radius:6px;color:#e6edf7;padding:6px;font-size:12px' });
      inp.setAttribute('data-k', key); w.appendChild(inp); grid.appendChild(w); return inp;
    }
    field('Lățime frontală (m)', 'latime', P.latime); field('Adâncime (m)', 'adancime', P.adancime);
    field('Nr. niveluri', 'niv', P.niv); field('H parter (m)', 'hParter', P.hParter);
    field('H etaj (m)', 'hEtaj', P.hEtaj);
    field('Acoperiș', 'roof', P.roof, [['sarpanta', 'Șarpantă'], ['terasa', 'Terasă']]);
    field('Ferestre / nivel', 'winPerFloor', P.winPerFloor);
    var bGen = el('button', { style: 'align-self:end;background:#7dd3fc;color:#062338;border:none;border-radius:7px;padding:8px 12px;font-size:12px;font-weight:700;cursor:pointer;min-height:34px' }, '🔄 Regenerează');
    var bGenW = el('div', { style: 'display:flex;align-items:flex-end' }); bGenW.appendChild(bGen); grid.appendChild(bGenW);
    wrap.appendChild(grid);

    // banner conformitate (consultativ)
    var banner = el('div', { style: 'margin-bottom:10px' });
    wrap.appendChild(banner);
    function renderBanner() {
      banner.innerHTML = '';
      try {
        if (!G.UX_COMPLIANCE) return;
        var res = G.UX_COMPLIANCE.runAllChecks(G.UX_COMPLIANCE.fromDocModel(D, v));
        var nE = res.errors.length, nW = res.warnings.length;
        var col = nE ? 'rgba(248,113,113,.14)' : nW ? 'rgba(251,191,36,.12)' : 'rgba(52,211,153,.12)';
        var bc = nE ? 'rgba(248,113,113,.4)' : nW ? 'rgba(251,191,36,.4)' : 'rgba(52,211,153,.4)';
        var txt = nE ? ('⚠ ' + nE + ' erori de conformitate (planșele se pot genera, dar trebuie corectate/asumate înainte de depunere)') : nW ? ('⚠ ' + nW + ' avertismente de confirmat') : '✓ Nicio eroare de conformitate detectată';
        var b = el('div', { style: 'background:' + col + ';border:1px solid ' + bc + ';border-radius:9px;padding:9px 12px;font-size:12px;color:#e6edf7;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap' });
        b.appendChild(el('span', null, txt));
        var br = el('button', { style: 'background:rgba(56,189,248,.16);color:#7dd3fc;border:1px solid rgba(56,189,248,.4);border-radius:6px;padding:5px 10px;font-size:11px;cursor:pointer' }, '📄 Raport conformitate PDF');
        br.onclick = function () { if (G.UX_COMPLIANCE.generateComplianceReport) G.UX_COMPLIANCE.generateComplianceReport(res, D); };
        b.appendChild(br); banner.appendChild(b);
      } catch (e) {}
    }

    // tab-uri preview
    var tabsBar = el('div', { style: 'display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap' });
    var stage = el('div', { style: 'background:#fff;border:1px solid rgba(148,163,184,.25);border-radius:10px;padding:8px;min-height:420px;overflow:auto' });
    wrap.appendChild(tabsBar); wrap.appendChild(stage);

    // download bar
    var dlbar = el('div', { style: 'display:flex;gap:8px;margin-top:12px;flex-wrap:wrap' });
    wrap.appendChild(dlbar);

    var SHEETS = [];   // {key,label,plansa,svg,dxf,fname}
    var active = 0;

    function collectOpts() {
      var o = {}; grid.querySelectorAll('[data-k]').forEach(function (i) { o[i.getAttribute('data-k')] = i.value; });
      // CAMERE REALE din programul funcțional aplicat (D._spatii) → planuri reale în loc de parametric
      var reledeeFloors = null;
      try {
        if (D._spatii && D._spatii.length && G.UXPlanSVG && G.UXPlanSVG.layout) {
          var lay = G.UXPlanSVG.layout(D._spatii, { bW: num(o.latime, 12), bD: num(o.adancime, 10) });
          var order = Object.keys(lay).sort(function (a, b) { var ord = function (n) { return n === 'S' ? -1 : n === 'P' ? 0 : n === 'E' ? 1 : (parseInt(n, 10) || 99); }; return ord(a) - ord(b); });
          reledeeFloors = order.filter(function (n) { return n !== 'S'; }).map(function (n) { return ((lay[n] && lay[n].rects) || []).map(function (rc) { return { t: rc.t, lbl: rc.lbl || (rc.room && rc.room.nume) || rc.t, x: rc.x, y: rc.y, w: rc.w, h: rc.h, bal: rc.bal }; }); }).filter(function (r) { return r.length; });
          if (!reledeeFloors.length) reledeeFloors = null;
        }
      } catch (e) { reledeeFloors = null; }
      return { width: num(o.latime, 12), adancime: num(o.adancime, 10), niv: Math.max(1, Math.round(num(o.niv, 1))),
        hParter: num(o.hParter, 3), hEtaj: num(o.hEtaj, 3), roof: o.roof, winPerFloor: Math.max(1, Math.round(num(o.winPerFloor, 3))),
        adancimeFundatie: (v.calc && v.calc.adancime_inghet_m) || 0.9, params: v.calc, reledeeFloors: reledeeFloors,
        functiune: D.functiune, proiect: D.nume || 'Obiectiv', beneficiar: D.beneficiar || '', nrcad: D.nrcad,
        data: (function () { try { return new Date().toLocaleDateString('ro-RO'); } catch (e) { return ''; } })(), faza: D.faza || 'DTAC' };
    }
    function build() {
      var o = collectOpts(); SHEETS = [];
      var set = [];
      try { set = G.UX_DRAW.buildFullSet ? G.UX_DRAW.buildFullSet(o) : []; } catch (e) { set = []; }
      if (!set.length) { // fallback minimal daca setul complet nu e incarcat
        try { set = [{ key: 'fatada', label: 'Fațadă', plansa: 'A-05', doc: G.UX_DRAW.facadeDoc(Object.assign({}, o, { plansa: 'A-05' })) }, { key: 'sectiune', label: 'Secțiune', plansa: 'A-07', doc: G.UX_DRAW.sectionDoc(Object.assign({}, o, { plansa: 'A-07' })) }]; } catch (e) {}
      }
      // LAZY: nu generam SVG/DXF pt toate 15 planșele deodata (ar ingheta pagina) —
      // doar doc-ul; SVG se face la afisarea tab-ului, DXF la descarcare.
      SHEETS = set.map(function (x) { return { key: x.key, label: x.label, plansa: x.plansa, doc: x.doc, svg: null, dxf: null, fname: ((x.plansa || x.key) + '_' + x.key).replace(/[^A-Za-z0-9_-]/g, '') }; });
      active = 0; renderTabs(); renderStage(); renderDownloads();
    }

    function renderTabs() {
      tabsBar.innerHTML = '';
      SHEETS.forEach(function (s, i) {
        var b = el('button', { style: 'background:' + (i === active ? '#7dd3fc' : 'rgba(125,211,252,.14)') + ';color:' + (i === active ? '#062338' : '#7dd3fc') + ';border:1px solid rgba(125,211,252,.4);border-radius:7px;padding:7px 12px;font-size:12px;font-weight:700;cursor:pointer' }, s.plansa + ' · ' + s.label);
        b.onclick = function () { active = i; renderTabs(); renderStage(); }; tabsBar.appendChild(b);
      });
    }
    function ensureSVG(s) { if (s && s.svg == null && s.doc) { try { s.svg = s.doc.emitSVG(); } catch (e) { s.svg = ''; } } return s ? s.svg : ''; }
    function ensureDXF(s) { if (s && s.dxf == null && s.doc) { try { s.dxf = s.doc.emit(); } catch (e) { s.dxf = ''; } } return s ? s.dxf : ''; }
    function renderStage() {
      stage.innerHTML = '';
      if (!SHEETS.length) { stage.appendChild(el('div', { style: 'color:#64748b;padding:40px;text-align:center' }, 'Nicio planșă generată.')); return; }
      var s = SHEETS[active];
      var svg = ensureSVG(s);
      if (svg) stage.innerHTML = svg; else stage.appendChild(el('div', { style: 'color:#64748b;padding:40px;text-align:center' }, 'Previzualizarea SVG indisponibilă — folosiți descărcarea DXF.'));
    }
    function renderDownloads() {
      dlbar.innerHTML = '';
      var s = SHEETS[active] || {};
      var bSvg = el('button', { style: 'background:rgba(52,211,153,.18);color:#6ee7b7;border:1px solid rgba(52,211,153,.45);border-radius:8px;padding:9px 14px;font-size:12.5px;font-weight:700;cursor:pointer' }, '⬇ Descarcă planșa (SVG)');
      bSvg.onclick = function () { var svg = ensureSVG(s); if (svg) { saveBlob(s.fname + '.svg', svg, 'image/svg+xml'); if (G.ss) G.ss('✅ Planșă SVG descărcată: ' + s.fname + '.svg'); } };
      var bDxf = el('button', { style: 'background:rgba(125,211,252,.18);color:#7dd3fc;border:1px solid rgba(125,211,252,.45);border-radius:8px;padding:9px 14px;font-size:12.5px;font-weight:700;cursor:pointer' }, '⬇ Descarcă planșa (DXF)');
      bDxf.onclick = function () { var dxf = ensureDXF(s); if (dxf) { saveBlob(s.fname + '.dxf', dxf, 'application/dxf'); if (G.ss) G.ss('✅ Planșă DXF descărcată: ' + s.fname + '.dxf'); } };
      var bPdf = el('button', { style: 'background:#fbbf24;color:#111;border:none;border-radius:8px;padding:9px 16px;font-size:12.5px;font-weight:800;cursor:pointer' }, '⬇ TOT setul (PDF)');
      bPdf.onclick = downloadPdf;
      var bZip = el('button', { style: 'background:#7dd3fc;color:#062338;border:none;border-radius:8px;padding:9px 16px;font-size:12.5px;font-weight:800;cursor:pointer' }, '⬇ TOT setul (DXF ZIP)');
      bZip.onclick = downloadZip;
      var bBim = el('button', { style: 'background:rgba(232,179,65,.16);color:#e8b341;border:1px solid rgba(232,179,65,.4);border-radius:8px;padding:9px 16px;font-size:12.5px;font-weight:800;cursor:pointer' }, '🏗 Model 3D + BIM (IFC/GLB)');
      bBim.onclick = function () { if (G.UXDocBIM && G.UXDocBIM.exportIFC) G.UXDocBIM.exportIFC(D); else if (G.ss) G.ss('Modulul BIM nu e încărcat.'); };
      dlbar.appendChild(bSvg); dlbar.appendChild(bDxf); dlbar.appendChild(bPdf); dlbar.appendChild(bZip); dlbar.appendChild(bBim);
    }
    function downloadPdf() {
      if (!SHEETS.length || !G.UX_DRAW.sheetsToPdf) { if (G.ss) G.ss('Export PDF indisponibil.'); return; }
      try { var pdf = G.UX_DRAW.sheetsToPdf(SHEETS, { nrcad: D.nrcad }); if (pdf) { pdf.save('Planse_' + (D.nrcad || 'set') + '.pdf'); if (G.ss) G.ss('✅ Set planșe PDF descărcat (' + SHEETS.length + ' planșe).'); } } catch (e) { if (G.ss) G.ss('Eroare export PDF.'); }
    }
    function downloadZip() {
      if (!SHEETS.length) return;
      if (G.JSZip) {
        var zip = new G.JSZip();
        SHEETS.forEach(function (s) { var dxf = ensureDXF(s); if (dxf) zip.file(s.fname + '.dxf', dxf); });
        zip.file('CITESTE.txt', 'Set planșe tehnice UrbanX — ' + (D.nume || '') + '\nFaza: ' + (D.faza || 'DTAC') + '\nGenerat parametric; necesită verificarea și asumarea proiectantului autorizat.\nParametrii tehnici derivați sunt incluși în cartușul fiecărei planșe.\n');
        zip.generateAsync({ type: 'blob' }).then(function (blob) {
          var u = URL.createObjectURL(blob); var a = document.createElement('a'); a.href = u; a.download = 'Planse_' + (D.nrcad || 'DTAC') + '.zip'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 2000);
          if (G.ss) G.ss('✅ Set complet descărcat: Planse_' + (D.nrcad || 'DTAC') + '.zip (' + SHEETS.length + ' planșe · SVG+DXF)');
        }).catch(function () { SHEETS.forEach(function (s) { if (s.dxf) saveBlob(s.fname + '.dxf', s.dxf, 'application/dxf'); }); });
      } else { SHEETS.forEach(function (s) { if (s.dxf) saveBlob(s.fname + '.dxf', s.dxf, 'application/dxf'); }); if (G.ss) G.ss('✅ ' + SHEETS.length + ' planșe DXF (JSZip indisponibil — individual).'); }
    }

    bGen.onclick = build;
    ov.appendChild(wrap);
    document.body.appendChild(ov);
    renderBanner(); build(); // generează + afișează IMEDIAT
  }

  // ─── PREVIEW REUTILIZABIL: primeste sheets=[{key,label,plansa,doc}] ────────
  // doc = obiect cu emit() (DXF) + emitSVG(). Afiseaza tab-uri + descarcare.
  function preview(sheetsIn, opts) {
    opts = opts || {};
    var SHEETS = (sheetsIn || []).map(function (s) {
      return { key: s.key, label: s.label, plansa: s.plansa || '', doc: s.doc, svg: null, dxf: null, fname: ((s.plansa || s.key) + '_' + (s.key || '')).replace(/[^A-Za-z0-9_-]/g, '') };
    });
    if (!SHEETS.length) { if (G.ss) G.ss('Nicio planșă de afișat.'); return; }
    function eSVG(s) { if (s && s.svg == null && s.doc) { try { s.svg = s.doc.emitSVG ? s.doc.emitSVG() : ''; } catch (e) { s.svg = ''; } } return s ? s.svg : ''; }
    function eDXF(s) { if (s && s.dxf == null && s.doc) { try { s.dxf = s.doc.emit ? s.doc.emit() : ''; } catch (e) { s.dxf = ''; } } return s ? s.dxf : ''; }
    var active = 0;
    var ov = el('div', { style: 'position:fixed;inset:0;background:#070c18;z-index:5200;overflow:auto;font-family:system-ui;color:#e6edf7' });
    var wrap = el('div', { style: 'max-width:1100px;margin:0 auto;padding:16px 14px 60px' });
    var head = el('div', { style: 'display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:10px' });
    head.appendChild(el('div', null, '<div style="font-size:17px;font-weight:800;color:#7dd3fc">📐 ' + (opts.title || 'Planșe tehnice') + '</div><div style="font-size:11.5px;color:#94a3b8">Le vezi mai jos și le descarci (SVG deschizibil oriunde, DXF în AutoCAD/LibreCAD). Parametrii tehnici derivați sunt în cartuș.</div>'));
    var bX = el('button', { style: 'background:none;border:none;color:#94a3b8;font-size:24px;cursor:pointer' }, '✕'); bX.onclick = function () { ov.remove(); }; head.appendChild(bX); wrap.appendChild(head);
    var tabsBar = el('div', { style: 'display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap' });
    var stage = el('div', { style: 'background:#fff;border:1px solid rgba(148,163,184,.25);border-radius:10px;padding:8px;min-height:420px;overflow:auto' });
    var dlbar = el('div', { style: 'display:flex;gap:8px;margin-top:12px;flex-wrap:wrap' });
    wrap.appendChild(tabsBar); wrap.appendChild(stage); wrap.appendChild(dlbar);
    function rT() { tabsBar.innerHTML = ''; SHEETS.forEach(function (s, i) { var b = el('button', { style: 'background:' + (i === active ? '#7dd3fc' : 'rgba(125,211,252,.14)') + ';color:' + (i === active ? '#062338' : '#7dd3fc') + ';border:1px solid rgba(125,211,252,.4);border-radius:7px;padding:7px 12px;font-size:12px;font-weight:700;cursor:pointer' }, (s.plansa ? s.plansa + ' · ' : '') + s.label); b.onclick = function () { active = i; rT(); rS(); rD(); }; tabsBar.appendChild(b); }); }
    function rS() { stage.innerHTML = ''; var s = SHEETS[active]; if (s && s.svg) stage.innerHTML = s.svg; else stage.appendChild(el('div', { style: 'color:#64748b;padding:40px;text-align:center' }, 'Previzualizare indisponibilă — folosiți descărcarea DXF.')); }
    function rD() {
      dlbar.innerHTML = ''; var s = SHEETS[active] || {};
      var bSvg = el('button', { style: 'background:rgba(52,211,153,.18);color:#6ee7b7;border:1px solid rgba(52,211,153,.45);border-radius:8px;padding:9px 14px;font-size:12.5px;font-weight:700;cursor:pointer' }, '⬇ Planșa (SVG)');
      bSvg.onclick = function () { if (s.svg) { saveBlob(s.fname + '.svg', s.svg, 'image/svg+xml'); if (G.ss) G.ss('✅ ' + s.fname + '.svg'); } };
      var bDxf = el('button', { style: 'background:rgba(125,211,252,.18);color:#7dd3fc;border:1px solid rgba(125,211,252,.45);border-radius:8px;padding:9px 14px;font-size:12.5px;font-weight:700;cursor:pointer' }, '⬇ Planșa (DXF)');
      bDxf.onclick = function () { if (s.dxf) { saveBlob(s.fname + '.dxf', s.dxf, 'application/dxf'); if (G.ss) G.ss('✅ ' + s.fname + '.dxf'); } };
      var bPdf = el('button', { style: 'background:#fbbf24;color:#111;border:none;border-radius:8px;padding:9px 16px;font-size:12.5px;font-weight:800;cursor:pointer' }, '⬇ TOT setul (PDF)');
      bPdf.onclick = function () { if (!G.UX_DRAW.sheetsToPdf) { if (G.ss) G.ss('PDF indisponibil.'); return; } try { var pdf = G.UX_DRAW.sheetsToPdf(sheetsIn, { nrcad: opts.nrcad }); if (pdf) { pdf.save('Planse_' + (opts.nrcad || 'set') + '.pdf'); if (G.ss) G.ss('✅ Set PDF (' + SHEETS.length + ' planșe).'); } } catch (e) {} };
      var bZip = el('button', { style: 'background:#7dd3fc;color:#062338;border:none;border-radius:8px;padding:9px 16px;font-size:12.5px;font-weight:800;cursor:pointer' }, '⬇ TOT setul (DXF ZIP)');
      bZip.onclick = function () {
        if (G.JSZip) { var zip = new G.JSZip(); SHEETS.forEach(function (x) { if (x.dxf) zip.file(x.fname + '.dxf', x.dxf); if (x.svg) zip.file(x.fname + '.svg', x.svg); }); zip.generateAsync({ type: 'blob' }).then(function (blob) { var u = URL.createObjectURL(blob); var a = document.createElement('a'); a.href = u; a.download = 'Planse_' + (opts.nrcad || 'set') + '.zip'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 2000); if (G.ss) G.ss('✅ Set descărcat (' + SHEETS.length + ' planșe · SVG+DXF)'); }); }
        else { SHEETS.forEach(function (x) { if (x.dxf) saveBlob(x.fname + '.dxf', x.dxf, 'application/dxf'); }); }
      };
      dlbar.appendChild(bSvg); dlbar.appendChild(bDxf); dlbar.appendChild(bPdf); dlbar.appendChild(bZip);
    }
    ov.appendChild(wrap);
    document.body.appendChild(ov); rT(); rS(); rD();
  }

  G.UXPlanseUI = { open: open, inferParams: inferParams, preview: preview };
  try { console.log('[UXPlanseUI] panou generare planșe tehnice încărcat (preview SVG + DXF/ZIP)'); } catch (e) {}
})(window);
