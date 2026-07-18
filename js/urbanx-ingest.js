/* ============================================================================
 * UrbanX — INGESTIE documente sursă → prefill model (al 3-lea drum de intrare).
 *  • Topo DWG/DXF → conturul parcelei + suprafața (Steren) [client-side, DXF; DWG via ODA].
 *  • Certificat de Urbanism (text) → POT/CUT/H max, retrageri, nr CU, județ [regex determinist].
 *  • Studiu geotehnic (text) → presiune convențională, adâncime fundare [regex].
 * Datele extrase se PROPUN; utilizatorul confirmă înainte de generare (nu încredere oarbă).
 * window.UXIngest.{parseDXF, extractCU, extractGeo, open}
 * ========================================================================== */
(function (G) {
  'use strict';
  function el(t, a, h) { var e = document.createElement(t); if (a) for (var k in a) e.setAttribute(k, a[k]); if (h != null) e.innerHTML = h; return e; }

  // ── DXF: extrage polilinii (LWPOLYLINE / POLYLINE+VERTEX) și alege conturul cu aria maximă ──
  function parseDXF(text) {
    var lines = String(text || '').split(/\r\n|\r|\n/);
    var pairs = []; for (var i = 0; i + 1 < lines.length; i += 2) pairs.push([lines[i].trim(), lines[i + 1]]);
    var polys = [], cur = null, mode = null, vx = null;
    for (var k = 0; k < pairs.length; k++) {
      var code = pairs[k][0], val = pairs[k][1];
      if (code === '0') {
        if (val === 'LWPOLYLINE') { cur = []; mode = 'lw'; polys.push(cur); }
        else if (val === 'POLYLINE') { cur = []; mode = 'pl'; polys.push(cur); }
        else if (val === 'VERTEX' && mode === 'pl' && cur) { vx = { x: null, y: null }; }
        else if (val === 'SEQEND' && vx) { vx = null; }
        else if (mode === 'lw') { mode = null; cur = null; }
        else { if (val !== 'VERTEX') { mode = (mode === 'pl' && val === 'SEQEND') ? mode : mode; } }
      } else if (mode === 'lw' && cur) {
        if (code === '10') cur.push({ x: parseFloat(val), y: null });
        else if (code === '20' && cur.length) cur[cur.length - 1].y = parseFloat(val);
      } else if (mode === 'pl' && vx) {
        if (code === '10') vx.x = parseFloat(val);
        else if (code === '20') { vx.y = parseFloat(val); if (cur) cur.push({ x: vx.x, y: vx.y }); }
      }
    }
    function area(p) { var a = 0; for (var j = 0; j < p.length; j++) { var q = p[(j + 1) % p.length]; if (!p[j] || !q || p[j].x == null || q.x == null) continue; a += p[j].x * q.y - q.x * p[j].y; } return Math.abs(a) / 2; }
    var best = null, bestA = 0;
    polys.forEach(function (p) { var pts = p.filter(function (v) { return v && v.x != null && v.y != null; }); if (pts.length >= 3) { var ar = area(pts); if (ar > bestA) { bestA = ar; best = pts; } } });
    return { boundary: best || [], area: Math.round(bestA), polylines: polys.length };
  }

  // ── Certificat de Urbanism (text extras din PDF/OCR) → indicatori ──
  var _JUD = ['alba', 'arad', 'arges', 'argeș', 'bacau', 'bacău', 'bihor', 'bistrita', 'bistrița', 'botosani', 'botoșani', 'braila', 'brăila', 'brasov', 'brașov', 'buzau', 'buzău', 'calarasi', 'călărași', 'caras', 'caraș', 'cluj', 'constanta', 'constanța', 'covasna', 'dambovita', 'dâmbovița', 'dolj', 'galati', 'galați', 'giurgiu', 'gorj', 'harghita', 'hunedoara', 'ialomita', 'ialomița', 'iasi', 'iași', 'ilfov', 'maramures', 'maramureș', 'mehedinti', 'mehedinți', 'mures', 'mureș', 'neamt', 'neamț', 'olt', 'prahova', 'salaj', 'sălaj', 'satu mare', 'sibiu', 'suceava', 'teleorman', 'timis', 'timiș', 'tulcea', 'valcea', 'vâlcea', 'vaslui', 'vrancea', 'bucuresti', 'bucurești'];
  function extractCU(text) {
    var t = ' ' + String(text || '').replace(/\s+/g, ' ') + ' '; var o = {}; var m;
    if ((m = t.match(/POT\s*(?:max(?:im)?)?\s*[:=]?\s*(\d{1,3})\s*%/i))) o.POT_max = +m[1];
    if ((m = t.match(/CUT\s*(?:max(?:im)?)?\s*[:=]?\s*(\d(?:[.,]\d+)?)/i))) o.CUT_max = +m[1].replace(',', '.');
    if ((m = t.match(/(?:H(?:\s*max(?:im)?)?|[iî]n[aă]l[țt]ime\s*max(?:im[aă]?)?)\s*[:=]?\s*(\d{1,2}(?:[.,]\d+)?)\s*m\b/i))) o.H_max = +m[1].replace(',', '.');
    if ((m = t.match(/(?:regim|niveluri)\s*(?:max(?:im)?)?\s*[:=]?\s*P\s*\+\s*(\d)/i))) o.niv_max = 1 + (+m[1]);
    if ((m = t.match(/(?:certificat\s+de\s+urbanism|C\.?U\.?)\s*(?:nr\.?|num[aă]r)?\s*(\d{1,5}(?:\s*\/\s*\d{2,4})?)/i))) o.nrCU = m[1].replace(/\s+/g, '');
    if ((m = t.match(/(?:suprafa[țt][aă]\s*(?:teren)?)\s*[:=]?\s*([\d.]+)\s*(?:mp|m2|m²)/i))) o.Steren = +m[1].replace(/\./g, '');
    var low = t.toLowerCase();
    for (var i = 0; i < _JUD.length; i++) { if (low.indexOf(' ' + _JUD[i] + ' ') >= 0 || low.indexOf('jud. ' + _JUD[i]) >= 0 || low.indexOf('județul ' + _JUD[i]) >= 0) { o.judet = _JUD[i].charAt(0).toUpperCase() + _JUD[i].slice(1); break; } }
    return o;
  }
  function extractGeo(text) {
    var t = String(text || '').replace(/\s+/g, ' '); var o = {}; var m;
    if ((m = t.match(/presiune(?:a)?\s*conven[țt]ional[aă]\s*[:=]?\s*(\d{2,3})\s*(?:kPa)?/i))) o.p_conv = +m[1];
    if ((m = t.match(/ad[aâ]ncime(?:a)?\s*(?:de\s*)?fundare\s*[:=]?\s*(\d(?:[.,]\d+)?)\s*m/i))) o.adancime_fundare = +m[1].replace(',', '.');
    if ((m = t.match(/categorie\s*geotehnic[aă]\s*[:=]?\s*(\d)/i))) o.cat_geo = +m[1];
    return o;
  }

  // ADAUGAT (18 iul — Florin a semnalat repetat, cu capturi de ecran, ca nu gaseste optiune de INCARCARE
  // pt Certificat de Urbanism/studiu geotehnic, doar o casuta goala de lipit text — se astepta la un
  // buton de upload ca la sectiunea 1 (DXF). FIX real: adauga incarcare de fisier (.pdf/.txt) langa
  // fiecare textarea, care extrage textul automat (PDF via pdf.js, deja folosit in platforma la
  // js/25-ssi-materiale-extractie.js — acelasi tipar de asteptare CDN) si il pune in caseta + extrage automat.
  function _asteaptaPdfjs(timeoutMs) {
    return new Promise(function (resolve) {
      var trecut = 0;
      var iv = setInterval(function () {
        trecut += 200;
        if (window.pdfjsLib || trecut >= (timeoutMs || 8000)) { clearInterval(iv); resolve(!!window.pdfjsLib); }
      }, 200);
    });
  }
  async function _extrageTextDinFisier(file) {
    if (/\.pdf$/i.test(file.name || '')) {
      if (!window.pdfjsLib) {
        try { pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js'; } catch (e) { /* noop */ }
        var gata = await _asteaptaPdfjs(8000);
        if (!gata) throw new Error('pdf.js nu s-a încărcat de pe CDN după 8 secunde — verifică conexiunea la internet sau un blocker de reclame; poți copia manual textul din PDF (Select All → Copy) în caseta de mai jos.');
      }
      var buf = await file.arrayBuffer();
      var doc = await pdfjsLib.getDocument({ data: buf }).promise;
      var texte = [];
      for (var i = 1; i <= doc.numPages; i++) {
        var pagina = await doc.getPage(i);
        var continut = await pagina.getTextContent();
        texte.push(continut.items.map(function (it) { return it.str; }).join(' '));
      }
      return texte.join('\n');
    }
    return await file.text();
  }
  function _cardFisierExtragere(titlu, textarea, btnExtrage, res) {
    var wrap = el('div', { style: 'margin-top:8px;display:flex;align-items:center;gap:8px' });
    wrap.appendChild(el('span', { style: 'font-size:11px;color:#94a3b8' }, 'SAU încarcă fișierul (.pdf/.txt):'));
    var inp = el('input', { type: 'file', accept: '.pdf,.txt', style: 'font-size:12px;color:#cbd5e1' });
    inp.onchange = function () {
      var f = inp.files[0]; if (!f) return;
      res.textContent = '⏳ Se extrage textul din „' + f.name + '"…';
      _extrageTextDinFisier(f).then(function (txt) {
        textarea.value = txt;
        res.textContent = '✓ Text extras din „' + f.name + '" (' + txt.length + ' caractere) — apasă „' + titlu + '" pentru a identifica datele, sau editează textul mai întâi.';
        btnExtrage.click();
      }).catch(function (e) {
        res.textContent = '⚠ ' + (e && e.message || 'Eroare la citirea fișierului.');
      });
    };
    wrap.appendChild(inp);
    return wrap;
  }

  function open(D, onApply) {
    var ov = el('div', { id: 'uxing-ov', style: 'position:fixed;inset:0;background:#070c18;z-index:4400;overflow:auto;font-family:system-ui;color:#e6edf7' });
    var wrap = el('div', { style: 'max-width:820px;margin:0 auto;padding:18px 16px 60px' });
    var head = el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-bottom:12px' });
    head.appendChild(el('div', null, '<div style="font-size:17px;font-weight:800;color:#93c5fd">📥 Import documente sursă</div><div style="font-size:11px;color:#94a3b8">Topo DXF · Certificat de Urbanism (text) · Geotehnic (text) → extrage și propune datele (le confirmi tu)</div>'));
    var bX = el('button', { style: 'background:none;border:none;color:#94a3b8;font-size:22px;cursor:pointer' }, '✕'); bX.onclick = function () { ov.remove(); }; head.appendChild(bX); wrap.appendChild(head);
    var found = {};
    function card(title, note) { var c = el('div', { style: 'background:#0b1220;border:1px solid rgba(148,163,184,.2);border-radius:10px;padding:12px;margin-bottom:12px' }); c.appendChild(el('div', { style: 'font-size:13px;font-weight:700;color:#93c5fd;margin-bottom:4px' }, title)); if (note) c.appendChild(el('div', { style: 'font-size:11px;color:#94a3b8;margin-bottom:8px' }, note)); return c; }
    var res = el('div', { id: 'uxing-res', style: 'font-size:12px;color:#6ee7b7;white-space:pre-wrap;margin-top:6px' });
    // Topo DXF
    var cTopo = card('1 · Ridicare topografică (DXF / DWG)', 'Recomandat: DXF (se citește direct în browser). DWG-ul e format binar — nu poate fi parsat client-side; exportă DXF din CAD (Save As → DXF R12/2013) sau rulează pipeline-ul de la pasul 4. Se extrage conturul cu aria maximă = parcela.');
    var fTopo = el('input', { type: 'file', accept: '.dxf,.dwg', style: 'font-size:12px;color:#cbd5e1' });
    fTopo.onchange = function () { var f = fTopo.files[0]; if (!f) return; var isDwgName = /\.dwg$/i.test(f.name || ''); var rd = new FileReader(); rd.onload = function () {
        var txt = String(rd.result || '');
        // DWG binar: începe cu semnătura ACxxxx (ex. AC1027). Nu se poate parsa în browser.
        if (isDwgName || /^AC10[0-9][0-9]/.test(txt.slice(0, 6))) {
          res.textContent = '⚠ „' + (f.name || 'fișier') + '" este DWG (binar) — nu poate fi citit direct în browser.\n→ Deschide-l în CAD și salvează ca DXF (Save As → AutoCAD DXF, versiune R12 sau 2013), apoi încarcă DXF-ul aici.\n→ SAU: rulează „scripts/dwg-to-urbanx.py <fișier.dwg>" (ODA + ezdxf) și importă urbanx_import.json la pasul 4 (extrage și Sc/Sd/regim din desen).';
          fTopo.value = ''; return;
        }
        try { var r = parseDXF(txt); if (r.area > 0) { found.Steren = r.area; found._boundary = r.boundary; res.textContent = '✓ Topo: ' + r.polylines + ' polilinii, parcela ≈ ' + r.area.toLocaleString('ro-RO') + ' mp (contur ' + r.boundary.length + ' vârfuri).'; } else res.textContent = '⚠ Nu am găsit un contur închis în DXF (verifică layerul parcelei — trebuie o polilinie închisă LWPOLYLINE/POLYLINE).'; } catch (e) { res.textContent = '⚠ Eroare la citirea DXF: ' + e.message; } }; rd.readAsText(f); };
    cTopo.appendChild(fTopo); wrap.appendChild(cTopo);
    // CU text
    var cCU = card('2 · Certificat de Urbanism (text)', 'Lipește textul din CU (sau din PDF-ul deschis). Extrage POT/CUT/H max, nr. CU, județ, suprafață.');
    var taCU = el('textarea', { style: 'width:100%;height:90px;background:#0a1120;border:1px solid rgba(148,163,184,.25);border-radius:7px;color:#e6edf7;padding:8px;font-size:12px;box-sizing:border-box', placeholder: 'ex: Certificat de urbanism nr. 123/2026 ... POT max 40% ... CUT max 1,2 ... înălțime maximă 10 m ... jud. Iași ...' });
    var bCU = el('button', { style: 'margin-top:8px;background:rgba(59,130,246,.2);color:#93c5fd;border:1px solid rgba(59,130,246,.4);border-radius:7px;padding:7px 13px;font-size:12px;cursor:pointer' }, 'Extrage din CU');
    bCU.onclick = function () { var o = extractCU(taCU.value); for (var k in o) found[k] = o[k]; res.textContent = '✓ CU: ' + (Object.keys(o).length ? Object.keys(o).map(function (k) { return k + '=' + o[k]; }).join(', ') : 'nimic recunoscut — verifică textul'); };
    cCU.appendChild(taCU); cCU.appendChild(bCU); cCU.appendChild(_cardFisierExtragere('Extrage din CU', taCU, bCU, res)); wrap.appendChild(cCU);
    // Geo text
    var cGeo = card('3 · Studiu geotehnic (text)', 'Lipește textul. Extrage presiunea convențională, adâncimea de fundare, categoria geotehnică.');
    var taGeo = el('textarea', { style: 'width:100%;height:70px;background:#0a1120;border:1px solid rgba(148,163,184,.25);border-radius:7px;color:#e6edf7;padding:8px;font-size:12px;box-sizing:border-box', placeholder: 'ex: presiunea convențională 200 kPa ... adâncime de fundare 1,5 m ... categorie geotehnică 2' });
    var bGeo = el('button', { style: 'margin-top:8px;background:rgba(59,130,246,.2);color:#93c5fd;border:1px solid rgba(59,130,246,.4);border-radius:7px;padding:7px 13px;font-size:12px;cursor:pointer' }, 'Extrage din geotehnic');
    bGeo.onclick = function () { var o = extractGeo(taGeo.value); if (o.p_conv) found.p_conv = o.p_conv; if (o.adancime_fundare) found.adancime_fundare = o.adancime_fundare; if (o.cat_geo) found.cat_geo = o.cat_geo; res.textContent = '✓ Geo: ' + (Object.keys(o).length ? Object.keys(o).map(function (k) { return k + '=' + o[k]; }).join(', ') : 'nimic recunoscut'); };
    cGeo.appendChild(taGeo); cGeo.appendChild(bGeo); cGeo.appendChild(_cardFisierExtragere('Extrage din geotehnic', taGeo, bGeo, res)); wrap.appendChild(cGeo);
    // JSON din pipeline DWG (scripts/dwg-to-urbanx.py — ODA+ezdxf desktop)
    // FIX BUG REAL (18 iul — Florin, cu capturi de ecran: "spui sa incarc un dwg... CUM?"): textul vechi
    // era ambiguu — parea ca aici se incarca DIRECT fisierul .dwg, cand de fapt aceasta sectiune asteapta
    // un JSON produs de un script Python rulat separat, in Terminal, pe calculator (nu in browser). Pentru
    // majoritatea utilizatorilor care au deja export DXF (ca in cazul lui Florin), sectiunea 1 e suficienta
    // si mult mai simpla — aceasta sectiune 4 e doar pt DWG-uri fara DXF exportat, cu pas tehnic separat.
    var cJson = card('4 · (Avansat, opțional) Import JSON dintr-un DWG procesat separat', 'NU se încarcă aici fișierul .dwg direct — dacă ai deja fișiere .dxf (ca la pasul 1), ignoră complet această secțiune, e mai simplu. Această secțiune e utilă DOAR dacă ai NUMAI .dwg, fără .dxf: necesită rularea unui script pe calculatorul tău (nu în browser) — deschide Terminal, rulează python3 scripts/dwg-to-urbanx.py fisierul_tau.dwg, apoi încarcă AICI fișierul urbanx_import.json rezultat (nu .dwg-ul).');
    var fJson = el('input', { type: 'file', accept: '.json', style: 'font-size:12px;color:#cbd5e1' });
    function _regimNiv(r) { r = String(r || '').toLowerCase(); var m = r.match(/p\s*\+\s*(\d)/); if (m) return 1 + (+m[1]); if (/d\s*\+\s*p/.test(r)) return 2; if (/parter|^p\b/.test(r)) return 1; return null; }
    fJson.onchange = function () { var f = fJson.files[0]; if (!f) return; var rd = new FileReader(); rd.onload = function () { try { var j = JSON.parse(rd.result); var ind = j.indicatori || {}; var got = []; if (ind.Sc) { found.Sc = +String(ind.Sc).replace(/\./g, '').replace(',', '.'); got.push('Sc=' + found.Sc); } if (ind.Sd) { found.Sd = +String(ind.Sd).replace(/\./g, '').replace(',', '.'); got.push('Sd=' + found.Sd); } var nv = _regimNiv(ind.regim); if (nv) { found.niv_supraterane = nv; got.push('niv=' + nv); } if (ind.grad_foc) { found.grad = ind.grad_foc; got.push('grad=' + ind.grad_foc); } if (j.dotari_inventar) found._dotari = j.dotari_inventar; res.textContent = '✓ JSON DWG (' + (j.sursa || '') + '): ' + (got.join(', ') || 'fără indicatori') + (j.are_model_3D ? ' · model 3D prezent (BIM)' : ''); } catch (e) { res.textContent = '⚠ JSON invalid: ' + e.message; } }; rd.readAsText(f); };
    cJson.appendChild(fJson); wrap.appendChild(cJson);
    wrap.appendChild(res);
    var bApply = el('button', { style: 'width:100%;margin-top:16px;background:#8b5cf6;color:#fff;border:none;border-radius:9px;padding:12px;font-size:13px;font-weight:700;cursor:pointer' }, '✓ Aplică datele extrase la proiect');
    bApply.onclick = function () {
      ['Steren', 'POT_max', 'CUT_max', 'H_max', 'niv_max', 'nrCU', 'judet', 'p_conv', 'adancime_fundare', 'Sc', 'Sd', 'niv_supraterane', 'grad'].forEach(function (k) { if (found[k] != null) { D[k] = found[k]; if (k === 'Sc' || k === 'Sd' || k === 'niv_supraterane') D['__auto_' + k] = false; } });
      if (found.adancime_fundare) D.fundare = 'directă la ' + found.adancime_fundare + ' m (studiu geotehnic' + (found.p_conv ? ', p_conv ' + found.p_conv + ' kPa' : '') + ')';
      if (found._boundary) D._parcelBoundary = found._boundary;
      if (G.ss) G.ss('✓ Date importate aplicate: ' + Object.keys(found).filter(function (k) { return k[0] !== '_'; }).length + ' câmpuri (le poți edita).');
      ov.remove(); if (typeof onApply === 'function') onApply(D);
    };
    wrap.appendChild(bApply);
    ov.appendChild(wrap); document.body.appendChild(ov);
  }

  G.UXIngest = { parseDXF: parseDXF, extractCU: extractCU, extractGeo: extractGeo, open: open };
})(window);
