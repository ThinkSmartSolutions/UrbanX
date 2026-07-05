/* ============================================================================
 * UrbanX — PANOU GENERARE PLANȘE TEHNICE (js/15-ux-planse-ui.js)
 * UI peste motorul UX_DRAW: parametri de generare (lățime/adâncime/niveluri/
 * înălțimi/acoperiș) prefilled din modelul DTAC, generează setul de planșe DXF
 * (fațade + secțiune parametrice, cu cote de nivel + stratificații + parametrii
 * tehnici derivați în cartuș) și le împachetează ZIP. Rulează întâi verificarea
 * de conformitate (blochează la erori, cu asumare). window.UXPlanseUI
 * ========================================================================== */
(function (G) {
  'use strict';
  function el(t, a, h) { var e = document.createElement(t); if (a) for (var k in a) { if (k === 'style') e.style.cssText = a[k]; else e.setAttribute(k, a[k]); } if (h != null) e.innerHTML = h; return e; }
  function num(x, d) { var v = parseFloat(x); return isNaN(v) ? (d != null ? d : 0) : v; }
  function dl(name, text) {
    try { var b = new Blob([text], { type: 'application/dxf' }); var u = URL.createObjectURL(b); var a = document.createElement('a'); a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 1500); } catch (e) {}
  }

  function inferParams(D) {
    D = D || {};
    var Sc = num(D.Sc, 0), niv = Math.max(1, Math.round(num(D.niv_supraterane, 1)));
    var H = num(D.H, 0); var hEtaj = H && niv ? +(H / niv).toFixed(2) : 3.0;
    // lățime frontală: din latura declarată, altfel estimată din amprentă (proporție 1.3:1)
    var lat = num(D.latime_front, 0) || (Sc ? +(Math.sqrt(Sc * 1.3)).toFixed(1) : 12);
    var adanc = Sc && lat ? +(Sc / lat).toFixed(1) : 10;
    return { latime: lat, adancime: adanc, niv: niv, hParter: hEtaj >= 2.6 ? hEtaj : 3.0, hEtaj: hEtaj >= 2.6 ? hEtaj : 3.0,
      roof: niv > 2 ? 'terasa' : 'sarpanta', winPerFloor: Math.max(2, Math.round(lat / 3)) };
  }

  function open(D) {
    D = D || {};
    if (!G.UX_DRAW) { if (G.ss) G.ss('Motorul de planșe (UX_DRAW) nu e încărcat.'); return; }
    var v = (G.UXDoc && G.UXDoc.valideaza) ? G.UXDoc.valideaza(D) : { calc: {} };
    var P = inferParams(D);
    var ov = el('div', { style: 'position:fixed;inset:0;background:rgba(3,7,18,.88);z-index:5200;display:flex;align-items:center;justify-content:center;font-family:system-ui;padding:16px' });
    var box = el('div', { style: 'max-width:560px;width:100%;background:#0b1220;border:1px solid rgba(148,163,184,.25);border-radius:14px;padding:20px;color:#e6edf7;max-height:90vh;overflow:auto' });
    box.appendChild(el('div', null, '<div style="font-size:16px;font-weight:800;color:#7dd3fc">📐 Generare planșe tehnice (DXF)</div><div style="font-size:11.5px;color:#94a3b8;margin:4px 0 12px">Fațade + secțiune la scara 1:100, cu cote de nivel, stratificații și parametrii tehnici derivați în cartuș. Se rulează întâi verificarea de conformitate. DXF AutoCAD 2010 — se deschide în orice CAD (AutoCAD, LibreCAD, ZWCAD).</div>'));
    var grid = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px' });
    function field(lbl, key, val, opts) {
      var wrap = el('div'); wrap.appendChild(el('label', { style: 'font-size:11px;color:#94a3b8;display:block;margin-bottom:3px' }, lbl));
      var inp;
      if (opts) { inp = el('select', { style: 'width:100%;box-sizing:border-box;background:#0a1120;border:1px solid rgba(148,163,184,.25);border-radius:6px;color:#e6edf7;padding:7px;font-size:12.5px' }); opts.forEach(function (o) { var op = el('option', { value: o[0] }, o[1]); if (o[0] === val) op.setAttribute('selected', 'selected'); inp.appendChild(op); }); }
      else inp = el('input', { value: val, style: 'width:100%;box-sizing:border-box;background:#0a1120;border:1px solid rgba(148,163,184,.25);border-radius:6px;color:#e6edf7;padding:7px;font-size:12.5px' });
      inp.setAttribute('data-k', key); wrap.appendChild(inp); grid.appendChild(wrap); return inp;
    }
    field('Lățime frontală (m)', 'latime', P.latime); field('Adâncime (m)', 'adancime', P.adancime);
    field('Nr. niveluri supraterane', 'niv', P.niv); field('H parter (m)', 'hParter', P.hParter);
    field('H etaj curent (m)', 'hEtaj', P.hEtaj);
    field('Tip acoperiș', 'roof', P.roof, [['sarpanta', 'Șarpantă'], ['terasa', 'Terasă']]);
    field('Ferestre / nivel (fațadă)', 'winPerFloor', P.winPerFloor);
    box.appendChild(grid);
    var status = el('div', { style: 'font-size:11.5px;color:#94a3b8;margin-bottom:10px' }, 'Cotă îngheț fundație: ' + ((v.calc && v.calc.adancime_inghet_m) || 0.9).toFixed(2) + ' m · Grad RF: ' + ((v.calc && v.calc.grad_default) || 'II') + ' · Categoria PSI: ' + ((v.calc && v.calc.psi_default) || 'C'));
    box.appendChild(status);
    var btns = el('div', { style: 'display:flex;gap:8px;justify-content:flex-end' });
    var bX = el('button', { style: 'background:none;border:1px solid rgba(148,163,184,.4);color:#cbd5e1;border-radius:8px;padding:8px 14px;font-size:12.5px;cursor:pointer' }, 'Închide'); bX.onclick = function () { ov.remove(); };
    var bGo = el('button', { style: 'background:#7dd3fc;color:#062338;border:none;border-radius:8px;padding:8px 16px;font-size:12.5px;font-weight:700;cursor:pointer' }, '⬇ Descarcă set DXF');
    bGo.onclick = function () {
      var o = {}; grid.querySelectorAll('[data-k]').forEach(function (i) { o[i.getAttribute('data-k')] = i.value; });
      var opts = { width: num(o.latime, 12), niv: Math.max(1, Math.round(num(o.niv, 1))), hParter: num(o.hParter, 3), hEtaj: num(o.hEtaj, 3), roof: o.roof, winPerFloor: Math.max(1, Math.round(num(o.winPerFloor, 3))),
        adancimeFundatie: (v.calc && v.calc.adancime_inghet_m) || 0.9, params: v.calc,
        proiect: D.nume || 'Obiectiv', beneficiar: D.beneficiar || '', data: (function () { try { return new Date().toLocaleDateString('ro-RO'); } catch (e) { return ''; } })(),
        faza: D.faza || 'DTAC' };
      function build() {
        var files = [];
        try { files.push(['A-05_Fatada_principala.dxf', G.UX_DRAW.facadeFromBuilding(Object.assign({}, opts, { orient: 'principală (N/S)', plansa: 'A-05' }))]); } catch (e) {}
        try { files.push(['A-06_Fatada_laterala.dxf', G.UX_DRAW.facadeFromBuilding(Object.assign({}, opts, { width: num(o.adancime, opts.width), orient: 'laterală (E/V)', plansa: 'A-06', winPerFloor: Math.max(1, Math.round(num(o.adancime, 10) / 3)) }))]); } catch (e) {}
        try { files.push(['A-07_Sectiune_transversala.dxf', G.UX_DRAW.sectionFromBuilding(Object.assign({}, opts, { plansa: 'A-07' }))]); } catch (e) {}
        if (!files.length) { if (G.ss) G.ss('Eroare la generarea planșelor.'); return; }
        if (G.JSZip) {
          var zip = new G.JSZip(); files.forEach(function (f) { zip.file(f[0], f[1]); });
          var readme = 'Set planșe tehnice UrbanX — ' + (D.nume || '') + '\nFaza: ' + opts.faza + '\nGenerat parametric; necesită verificarea și asumarea proiectantului autorizat.\nParametri derivați incluși în cartușul fiecărei planșe.\n';
          zip.file('CITESTE.txt', readme);
          zip.generateAsync({ type: 'blob' }).then(function (blob) {
            var u = URL.createObjectURL(blob); var a = document.createElement('a'); a.href = u; a.download = 'Planse_' + (D.nrcad || 'DTAC') + '.zip'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 1500);
            if (G.ss) G.ss('✅ ' + files.length + ' planșe DXF generate (ZIP).');
          });
        } else { files.forEach(function (f) { dl(f[0], f[1]); }); if (G.ss) G.ss('✅ ' + files.length + ' planșe DXF (JSZip indisponibil — salvate individual).'); }
        ov.remove();
      }
      // gardă conformitate: blochează la erori, cu asumare
      if (G.UX_COMPLIANCE && G.UX_COMPLIANCE.guardExport) {
        G.UX_COMPLIANCE.guardExport(D).then(function (r) { if (r && r.ok) build(); });
      } else build();
    };
    btns.appendChild(bX); btns.appendChild(bGo); box.appendChild(btns);
    ov.appendChild(box); document.body.appendChild(ov);
  }

  G.UXPlanseUI = { open: open, inferParams: inferParams };
  try { console.log('[UXPlanseUI] panou generare planșe tehnice încărcat'); } catch (e) {}
})(window);
