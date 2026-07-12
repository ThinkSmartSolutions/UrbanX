/* ============================================================================
 * UrbanX — GENERATOR DOCX (js/urbanx-docx-builder.js)
 * Asamblează dosarul de documentații: fiecare document = HTML editabil în Word
 * (application/msword, tiparul deja folosit în platformă), formatare profesională
 * (Times New Roman 12pt justified, copertă, headings, tabele). Bundle ZIP (JSZip)
 * pe categorii. Reutilizează datele engine-ului (UXDoc) + studiile existente.
 *
 * window.UXDocBuilder: genereazaDosar(D, v) · docHtml
 * ========================================================================== */
(function (G) {
  'use strict';
  var STYLE = '<style>' +
    'body{font-family:"Times New Roman",serif;font-size:12pt;line-height:1.5;text-align:justify;margin:0}' +
    'h1{font-size:16pt;font-weight:bold;color:#1F3864;text-align:center;margin:0 0 6pt}' +
    'h2{font-size:14pt;font-weight:bold;color:#1F3864;border-bottom:1px solid #1F3864;text-transform:uppercase;margin:14pt 0 6pt}' +
    'h3{font-size:13pt;font-weight:bold;color:#2F5496;margin:10pt 0 4pt}' +
    'p{margin:0 0 6pt;text-indent:1.27cm}' +
    'table{border-collapse:collapse;width:100%;margin:6pt 0}' +
    'th{background:#1F3864;color:#fff;border:0.5pt solid #999;padding:4pt;font-size:10pt;text-align:left}' +
    'td{border:0.5pt solid #999;padding:4pt;font-size:10pt}' +
    'tr:nth-child(even) td{background:#F2F2F2}' +
    '.cover{text-align:center;margin-top:120pt}.cover .t{font-size:22pt;font-weight:bold;color:#1F3864}.cover .m{font-size:13pt;margin-top:18pt}' +
    '.foot{color:#888;font-size:9pt;border-top:0.5pt solid #ccc;margin-top:24pt;padding-top:4pt}' +
    // Mod „tabelar" (SSI, la cererea explicită a modelului transmis: fiecare secţiune e un rând de
    // tabel 2 coloane — eticheta | conţinut — nu titlu+paragraf separat). Randurile consecutive au
    // margine 0 şi acelaşi chenar, ca să citească vizual ca UN SINGUR tabel continuu, nu tabele mici
    // izolate; conţinutul poate include la rândul lui un tbl() propriu — tabel în tabel, cum s-a cerut.
    '.sec-tbl{border-collapse:collapse;width:100%;margin:0;table-layout:fixed}' +
    '.sec-tbl td{border:0.75pt solid #000;padding:6pt 8pt;vertical-align:top;font-size:12pt}' +
    '.sec-tbl .sec-label{width:20%;font-weight:bold;background:#F2F2F2}' +
    '.sec-tbl .sec-content p:first-child{margin-top:0}.sec-tbl .sec-content p:last-child{margin-bottom:0}' +
    '.sec-tbl table{margin:4pt 0}' +
    '</style>';

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  // ── GRAFICE + HĂRȚI (SVG inline — se randează în Word 365 / browser) ──
  function _svg(w, h, inner) { return '<div style="margin:8pt 0;text-align:center"><svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '" style="max-width:100%;border:0.5pt solid #ccc;background:#fff">' + inner + '</svg></div>'; }
  function _chartBar(title, data, unit) {
    var w = 540, h = 250, pad = 42, n = data.length || 1, gap = (w - 2 * pad) / n, bw = gap * 0.66;
    var max = Math.max.apply(null, data.map(function (d) { return +d[1] || 0; })) || 1, bars = '';
    data.forEach(function (d, i) { var v = +d[1] || 0, bh = (h - 2 * pad) * v / max, x = pad + i * gap + (gap - bw) / 2, y = h - pad - bh; bars += '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + Math.max(0, bh).toFixed(1) + '" fill="#1F3864"/><text x="' + (x + bw / 2).toFixed(1) + '" y="' + (h - pad + 12) + '" font-size="8" text-anchor="middle" fill="#333">' + esc(String(d[0]).slice(0, 7)) + '</text><text x="' + (x + bw / 2).toFixed(1) + '" y="' + (y - 3).toFixed(1) + '" font-size="7" text-anchor="middle" fill="#1F3864">' + Math.round(v).toLocaleString('ro-RO') + '</text>'; });
    return _svg(w, h, '<text x="' + (w / 2) + '" y="17" font-size="11" font-weight="bold" text-anchor="middle" fill="#1F3864">' + esc(title) + (unit ? ' [' + unit + ']' : '') + '</text><line x1="' + pad + '" y1="' + (h - pad) + '" x2="' + (w - pad) + '" y2="' + (h - pad) + '" stroke="#999"/><line x1="' + pad + '" y1="24" x2="' + pad + '" y2="' + (h - pad) + '" stroke="#999"/>' + bars);
  }
  function _chartLine(title, pts, unit) {
    var w = 540, h = 250, pad = 46, n = pts.length, vals = pts.map(function (p) { return +p[1] || 0; });
    var mn = Math.min.apply(null, vals); if (mn > 0) mn = 0; var mx = Math.max.apply(null, vals), rng = (mx - mn) || 1;
    var X = function (i) { return pad + (w - 2 * pad) * i / (n - 1 || 1); }, Y = function (v) { return h - pad - (h - pad - 24) * (v - mn) / rng; };
    var d = ''; pts.forEach(function (p, i) { d += (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(+p[1] || 0).toFixed(1) + ' '; });
    var lab = ''; pts.forEach(function (p, i) { if (i % Math.ceil(n / 8) === 0 || i === n - 1) lab += '<text x="' + X(i).toFixed(1) + '" y="' + (h - pad + 12) + '" font-size="7" text-anchor="middle" fill="#333">' + esc(String(p[0])) + '</text>'; });
    return _svg(w, h, '<text x="' + (w / 2) + '" y="17" font-size="11" font-weight="bold" text-anchor="middle" fill="#1F3864">' + esc(title) + (unit ? ' [' + unit + ']' : '') + '</text><line x1="' + pad + '" y1="' + Y(0).toFixed(1) + '" x2="' + (w - pad) + '" y2="' + Y(0).toFixed(1) + '" stroke="#c00" stroke-dasharray="3"/><line x1="' + pad + '" y1="24" x2="' + pad + '" y2="' + (h - pad) + '" stroke="#999"/><path d="' + d + '" fill="none" stroke="#1F3864" stroke-width="2"/>' + lab);
  }
  function _chartPie(title, data) {
    var w = 540, h = 250, cx = 125, cy = 135, r = 88, tot = 0; data.forEach(function (d) { tot += +d[1] || 0; }); tot = tot || 1;
    var cols = ['#1F3864', '#2F5496', '#5B9BD5', '#8FAADC', '#C55A11', '#ED7D31', '#70AD47', '#A9A9A9'];
    var a0 = -Math.PI / 2, segs = '', leg = '';
    data.forEach(function (d, i) { var fr = (+d[1] || 0) / tot, a1 = a0 + fr * 2 * Math.PI, x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0), x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1), lg = fr > 0.5 ? 1 : 0; segs += '<path d="M' + cx + ' ' + cy + ' L' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' A' + r + ' ' + r + ' 0 ' + lg + ' 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' Z" fill="' + cols[i % cols.length] + '" stroke="#fff"/>'; leg += '<rect x="265" y="' + (34 + i * 24) + '" width="12" height="12" fill="' + cols[i % cols.length] + '"/><text x="283" y="' + (44 + i * 24) + '" font-size="9" fill="#333">' + esc(String(d[0]).slice(0, 32)) + ' — ' + Math.round(fr * 100) + '%</text>'; a0 = a1; });
    return _svg(w, h, '<text x="' + (w / 2) + '" y="17" font-size="11" font-weight="bold" text-anchor="middle" fill="#1F3864">' + esc(title) + '</text>' + segs + leg);
  }
  function _mapSolarRO(lat, lon, label) {
    var w = 540, h = 290, mx = function (lo) { return 32 + (w - 64) * (lo - 20.2) / 9.5; }, my = function (la) { return h - 46 - (h - 76) * (la - 43.6) / 4.7; };
    var px = mx(lon || 26), py = my(lat || 46);
    return _svg(w, h, '<defs><linearGradient id="sg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#FFF3B0"/><stop offset="1" stop-color="#E8A33D"/></linearGradient></defs><text x="' + (w / 2) + '" y="17" font-size="11" font-weight="bold" text-anchor="middle" fill="#1F3864">Harta potențialului solar — poziționarea amplasamentului</text><rect x="32" y="26" width="' + (w - 64) + '" height="' + (h - 72) + '" fill="url(#sg)" stroke="#999"/><circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="6" fill="#c00" stroke="#fff" stroke-width="1.5"/><text x="' + (px + 10).toFixed(1) + '" y="' + (py + 4).toFixed(1) + '" font-size="9" fill="#900" font-weight="bold">' + esc(label || 'Amplasament') + '</text><text x="' + (w / 2) + '" y="' + (h - 12) + '" font-size="8" text-anchor="middle" fill="#555">Iradianță RO ~1.150–1.450 kWh/m²/an (sud-est mai ridicat) · sursă metodologică PVGIS SARAH (JRC)</text>');
  }
  function _diagFluxPV(e, racord) {
    // Diagramă monofilară / flux energetic: module → stringuri → invertoare → PT → racord rețea
    var w = 540, h = 200, blocks = [
      ['MODULE PV', e.nr_module + ' × ' + e.putere_modul_wp + ' Wp', (e.putere_dc_kwp / 1000).toFixed(2) + ' MWp c.c.'],
      ['STRINGURI', e.nr_stringuri + ' stringuri', e.module_pe_string + ' mod./string'],
      ['INVERTOARE', e.nr_invertoare + ' × ' + Math.round(e.putere_invertor_kva) + ' kVA', 'c.c. → c.a. 0,4 kV'],
      ['POST TRAFO', e.nr_pt + ' × ' + Math.round(e.putere_pt_kva) + ' kVA', '0,4 / ' + (String(racord || '').match(/\d+/) ? (racord.match(/\d+/)[0] + ' kV') : 'MT')],
      ['RACORD REȚEA', esc(racord || 'MT'), Math.round(e.putere_ac_kva) + ' kVA c.a.']
    ];
    var n = blocks.length, bw = 88, gap = (w - n * bw) / (n + 1), y = 60, bh = 62, inner = '';
    blocks.forEach(function (b, i) {
      var x = gap + i * (bw + gap);
      inner += '<rect x="' + x.toFixed(1) + '" y="' + y + '" width="' + bw + '" height="' + bh + '" rx="4" fill="#EEF2F9" stroke="#1F3864"/>' +
        '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + (y + 16) + '" font-size="8.5" font-weight="bold" text-anchor="middle" fill="#1F3864">' + b[0] + '</text>' +
        '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + (y + 34) + '" font-size="8" text-anchor="middle" fill="#333">' + b[1] + '</text>' +
        '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + (y + 50) + '" font-size="7.5" text-anchor="middle" fill="#666">' + b[2] + '</text>';
      if (i < n - 1) { var ax = x + bw, ax2 = ax + gap; inner += '<line x1="' + ax.toFixed(1) + '" y1="' + (y + bh / 2) + '" x2="' + (ax2 - 4).toFixed(1) + '" y2="' + (y + bh / 2) + '" stroke="#C55A11" stroke-width="1.5" marker-end="url(#ar)"/>'; }
    });
    var defs = '<defs><marker id="ar" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0 0 L5 2.5 L0 5 z" fill="#C55A11"/></marker></defs>';
    return _svg(w, h, defs + '<text x="' + (w / 2) + '" y="20" font-size="11" font-weight="bold" text-anchor="middle" fill="#1F3864">Schemă monofilară — flux energetic al parcului</text>' + inner + '<text x="' + (w / 2) + '" y="' + (h - 14) + '" font-size="8" text-anchor="middle" fill="#555">Producerea c.c. → conversie c.a. (invertoare) → ridicare tensiune (PT) → injecție în SEN. Contorizare bidirecțională + protecții conform Cod RET / Ord. ANRE 59/2013.</text>');
  }
  // escapează datele, dar re-permite un whitelist de formatare intenționată (b/i/sub/sup/br + &nbsp;)
  function _cell(c) { return esc(c).replace(/&lt;(\/?)(b|i|sub|sup|br)&gt;/g, '<$1$2>').replace(/&amp;nbsp;/g, '&nbsp;'); }
  function tbl(rows, head) { var h = ''; if (head) h = '<tr>' + head.map(function (c) { return '<th>' + _cell(c) + '</th>'; }).join('') + '</tr>'; var b = rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + _cell(c) + '</td>'; }).join('') + '</tr>'; }).join(''); return '<table>' + h + b + '</table>'; }

  // meta: {titlu, subtitlu, proiect, beneficiar, amplasament, faza}
  // sections: [{h, html}]
  // opts.tabelar: randeaza fiecare sectiune ca rand de tabel 2 coloane (eticheta|continut), in loc de
  // titlu+paragraf — format cerut explicit de model pentru scenariul SSI (nu se aplica global, doar
  // documentelor unde a fost cerut, ca sa nu schimbe formatul celorlalte livrabile care functioneaza deja).
  function docHtml(meta, sections, opts) {
    var tabelar = opts && opts.tabelar;
    var cover = '<div class="cover"><div class="t">' + esc(meta.titlu) + '</div>' +
      (meta.subtitlu ? '<div class="m">' + esc(meta.subtitlu) + '</div>' : '') +
      '<div class="m">Proiect: ' + esc(meta.proiect || '—') + '</div>' +
      '<div class="m">Beneficiar: ' + esc(meta.beneficiar || '—') + '</div>' +
      '<div class="m">Amplasament: ' + esc(meta.amplasament || '—') + '</div>' +
      '<div class="m">Faza: ' + esc(meta.faza || 'DTAC') + '</div></div>' +
      '<br style="page-break-after:always">';
    var body = sections.map(function (s) {
      if (!s.h) return s.html || '';
      if (tabelar) return '<table class="sec-tbl"><tr><td class="sec-label">' + esc(s.h) + '</td><td class="sec-content">' + (s.html || '') + '</td></tr></table>';
      return '<h2>' + esc(s.h) + '</h2>' + (s.html || '');
    }).join('');
    var semn = '<div class="semn">' + _semnaturaBlock(meta) + '</div>';
    var foot = '<div class="foot">Document generat de UrbanX (ThinkSmart Solutions) — orientativ, se verifică și se semnează de proiectanții atestați.</div>';
    // Antet „Word HTML" (MSO): Word îl tratează ca document nativ → se poate edita ȘI SALVA fără pierderea formatului.
    return '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">' +
      '<head><meta charset="utf-8"><meta name="ProgId" content="Word.Document"><meta name="Generator" content="Microsoft Word 15">' +
      '<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom><w:DoNotOptimizeForBrowser/></w:WordDocument></xml><![endif]-->' +
      STYLE + '<style>@page WordSection1{size:21cm 29.7cm;margin:2cm}div.WordSection1{page:WordSection1}</style></head>' +
      '<body><div class="WordSection1">' + cover + body + semn + foot + '</div></body></html>';
  }
  function docBlob(html) { return new Blob(['﻿', html], { type: 'application/msword' }); }

  // ── EXPORT .DOCX REAL (OOXML) — Word deschide ȘI salvează nativ (fix „could not be saved") ──
  function _wx(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function _wmlRuns(node) {
    var runs = '';
    for (var i = 0; i < node.childNodes.length; i++) {
      var n = node.childNodes[i];
      if (n.nodeType === 3) { var t = n.nodeValue; if (t && t.replace(/\s+/g, ' ') !== '') runs += '<w:r><w:t xml:space="preserve">' + _wx(t.replace(/\s+/g, ' ')) + '</w:t></w:r>'; }
      else if (n.nodeType === 1) {
        var tag = n.tagName.toLowerCase();
        if (tag === 'br') { runs += '<w:r><w:br/></w:r>'; continue; }
        var txt = (n.textContent || '').replace(/\s+/g, ' '); if (!txt.trim()) continue;
        var bold = (tag === 'b' || tag === 'strong'), ital = (tag === 'i' || tag === 'em');
        var rpr = (bold || ital) ? ('<w:rPr>' + (bold ? '<w:b/>' : '') + (ital ? '<w:i/>' : '') + '</w:rPr>') : '';
        runs += '<w:r>' + rpr + '<w:t xml:space="preserve">' + _wx(txt) + '</w:t></w:r>';
      }
    }
    return runs || '<w:r><w:t/></w:r>';
  }
  function _wmlPara(runsXml, style, justify) {
    var ppr = style ? ('<w:pStyle w:val="' + style + '"/>') : (justify ? '<w:jc w:val="both"/>' : '');
    return '<w:p>' + (ppr ? '<w:pPr>' + ppr + '</w:pPr>' : '') + runsXml + '</w:p>';
  }
  function _wmlTable(tbl) {
    var xml = '<w:tbl><w:tblPr><w:tblStyle w:val="TableGrid"/><w:tblW w:w="0" w:type="auto"/><w:tblBorders><w:top w:val="single" w:sz="4" w:space="0" w:color="999999"/><w:left w:val="single" w:sz="4" w:space="0" w:color="999999"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="999999"/><w:right w:val="single" w:sz="4" w:space="0" w:color="999999"/><w:insideH w:val="single" w:sz="4" w:space="0" w:color="999999"/><w:insideV w:val="single" w:sz="4" w:space="0" w:color="999999"/></w:tblBorders></w:tblPr>';
    var rows = tbl.querySelectorAll('tr');
    for (var r = 0; r < rows.length; r++) {
      var cells = rows[r].children; xml += '<w:tr>';
      for (var c = 0; c < cells.length; c++) {
        var isH = cells[c].tagName.toLowerCase() === 'th';
        var inner = isH ? ('<w:r><w:rPr><w:b/></w:rPr><w:t xml:space="preserve">' + _wx((cells[c].textContent || '').replace(/\s+/g, ' ')) + '</w:t></w:r>') : _wmlRuns(cells[c]);
        xml += '<w:tc><w:tcPr><w:tcW w:w="0" w:type="auto"/></w:tcPr>' + _wmlPara(inner) + '</w:tc>';
      }
      xml += '</w:tr>';
    }
    return xml + '</w:tbl>';
  }
  function _htmlToWml(html) {
    var doc = new DOMParser().parseFromString(html, 'text/html'); var out = '';
    function walk(container) {
      for (var i = 0; i < container.children.length; i++) {
        var el = container.children[i]; var tag = el.tagName.toLowerCase();
        if (/^h[1-6]$/.test(tag)) out += _wmlPara(_wmlRuns(el), 'Heading' + Math.min(3, +tag[1]));
        else if (tag === 'p') out += _wmlPara(_wmlRuns(el), null, true);
        else if (tag === 'table') { out += _wmlTable(el); out += '<w:p/>'; }
        else if (tag === 'ul' || tag === 'ol') { var lis = el.querySelectorAll('li'); for (var j = 0; j < lis.length; j++) out += _wmlPara('<w:r><w:t xml:space="preserve">•  </w:t></w:r>' + _wmlRuns(lis[j])); }
        else if (tag === 'div' || tag === 'section' || tag === 'article' || tag === 'header' || tag === 'main') walk(el);
        else if (tag !== 'style' && tag !== 'script') { var t = (el.textContent || '').replace(/\s+/g, ' '); if (t.trim()) out += _wmlPara('<w:r><w:t xml:space="preserve">' + _wx(t) + '</w:t></w:r>'); }
      }
    }
    walk(doc.body);
    return out || '<w:p/>';
  }
  function _docxBytes(html) {
    var bodyWml = _htmlToWml(html);
    var documentXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>' + bodyWml + '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="708" w:footer="708" w:gutter="0"/></w:sectPr></w:body></w:document>';
    var ct = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>';
    var rels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>';
    var drels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>';
    // Stil identic cu standardul UrbanX (referința .doc): Times New Roman 12pt, line 1.5, titluri bleumarin.
    var styles = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">' +
      '<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="360" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>' +
      '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>' +
      '<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:pPr><w:jc w:val="center"/><w:spacing w:before="240" w:after="180" w:line="240" w:lineRule="auto"/></w:pPr><w:rPr><w:b/><w:color w:val="1F3864"/><w:sz w:val="32"/></w:rPr></w:style>' +
      '<w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:pPr><w:spacing w:before="280" w:after="120" w:line="240" w:lineRule="auto"/><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="2" w:color="1F3864"/></w:pBdr></w:pPr><w:rPr><w:b/><w:caps/><w:color w:val="1F3864"/><w:sz w:val="28"/></w:rPr></w:style>' +
      '<w:style w:type="paragraph" w:styleId="Heading3"><w:name w:val="heading 3"/><w:pPr><w:spacing w:before="200" w:after="100" w:line="240" w:lineRule="auto"/></w:pPr><w:rPr><w:b/><w:color w:val="2F5496"/><w:sz w:val="26"/></w:rPr></w:style>' +
      '<w:style w:type="table" w:default="1" w:styleId="TableGrid"><w:name w:val="Table Grid"/></w:style></w:styles>';
    var z = new G.JSZip();
    z.file('[Content_Types].xml', ct);
    z.file('_rels/.rels', rels);
    z.file('word/document.xml', documentXml);
    z.file('word/styles.xml', styles);
    z.file('word/_rels/document.xml.rels', drels);
    return z.generateAsync({ type: 'uint8array' });
  }

  // Bloc de semnături — tabel cu casetă goală pentru semnătură + ștampilă
  function sigTable(rows, head) {
    var h = '<tr>' + head.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '<th style="width:150pt">Semnătura / ștampila</th></tr>';
    var b = rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '<td style="height:40pt"></td></tr>'; }).join('');
    return '<table>' + h + b + '</table>';
  }
  // Opis/checklist cu coloană de anexat (casetă de bifat)
  function opisCheck(rows, head) {
    var h = '<tr>' + head.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '<th style="width:44pt;text-align:center">Anexat</th></tr>';
    var b = rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '<td style="text-align:center">&#9744;</td></tr>'; }).join('');
    return '<table>' + h + b + '</table>';
  }
  // Descriere sintetică a construcției (pt. referate / opis), din engine
  function _caracConstr(D, v) {
    var fnObj = (G.UXDoc.FUNCTIUNI[D.functiune] || {}); var ac = v.calc || {};
    var STR = { metalica: 'structură metalică (cadre)', beton: 'structură din beton armat (cadre/diafragme)', zidarie: 'zidărie portantă confinată', mixt: 'structură mixtă beton armat + metal', usoara: 'structură ușoară' };
    var niv = Math.max(1, (D.niv_supraterane || 1));
    return 'Construcție cu funcțiunea „' + esc(fnObj.label || D.functiune || '—') + '", regim de înălțime P+' + (niv - 1) +
      (D.niv_subsol ? ' + ' + D.niv_subsol + 'S' : '') + ' (H ' + (D.H || '—') + ' m), ' + (STR[fnObj.struct] || 'structură conform proiectului') +
      ', fundații directe/radier conform studiului geotehnic. Categoria de importanță „' + (fnObj.cat === 'medical' ? 'B' : 'C') + '", grad de rezistență la foc ' + (fnObj.grad || 'II') +
      ', categoria de pericol de incendiu ' + (fnObj.psi || 'C') + ', zona seismică conform P100-1/2013 (a_g, T_C ale amplasamentului). Indicatori: SC ' + (D.Sc || '—') + ' mp, SD ' + (D.Sd || '—') +
      ' mp, POT ' + (ac.POT || '—') + '%, CUT ' + (ac.CUT || '—') + '.';
  }

  // ── Conținut per document (real, din datele engine) ───────────────────────
  var FAZA_LBL = { DTAC: 'D.T.A.C. (extras pentru autorizare)', PTh: 'P.Th. + D.E. (proiect complet de execuție)', 'PTh+DE': 'P.Th. + D.E. (proiect complet de execuție)' };
  function _meta(D, titlu, subtitlu) {
    return { titlu: titlu, subtitlu: subtitlu || '', proiect: D.nume || '—', beneficiar: D.beneficiar || '—', proiectant: D.proiectant || '—', amplasament: (D.uat || '') + (D.nrcad ? ', nr. cad. ' + D.nrcad : ''), faza: FAZA_LBL[D.faza] || D.faza || 'D.T.A.C.' };
  }
  // Bloc de semnături + responsabili — colectivul de elaborare, la finalul fiecărui memoriu.
  function _semnaturaBlock(meta) {
    var isPth = (meta.faza && /PTh|P\.Th|D\.E|Proiect Tehnic/i.test(meta.faza));
    var rows = [
      ['Șef de proiect', meta.proiectant || '—', 'drept de semnătură (OAR/AICPS/OGR)'],
      ['Proiectant de specialitate (întocmit)', meta.proiectant || '—', 'membru în organizația profesională'],
      ['Elaborat / desenat', '—', '—'],
      ['Verificat (verificator de proiecte atestat MLPAT/MDLPA)', '—', 'cerința aplicabilă (A1/A2/B/C/D/E/F/Is/It/Ie)']
    ];
    if (isPth) rows.push(['Responsabil tehnic cu execuția (RTE)', '—', 'atestat MDLPA (la execuție)']);
    var body = rows.map(function (r) { return '<tr><td>' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td><td>' + esc(r[2]) + '</td><td>&nbsp;</td><td>&nbsp;</td></tr>'; }).join('');
    return '<h2>Colectiv de elaborare și responsabilități</h2>' +
      '<table><tr><th>Rol / responsabilitate</th><th>Nume / firmă</th><th>Atestat / calitate</th><th>Semnătura + ștampila</th><th>Data</th></tr>' + body + '</table>' +
      '<p>Beneficiar: <b>' + esc(meta.beneficiar || '—') + '</b> · Proiectant general: <b>' + esc(meta.proiectant || '—') + '</b> · Faza: <b>' + esc(meta.faza || 'DTAC') + '</b>. ' +
      'Prezentul document se însușește prin semnătură și ștampilă de proiectanții cu drept de semnătură (OAR/AICPS/OGR, după caz) și se verifică de verificatori de proiecte atestați conform Legii nr. 10/1995 privind calitatea în construcții. Documentul devine valabil numai semnat, ștampilat și datat.</p>';
  }
  function _indicatoriTbl(D, v) {
    var ac = v.calc || {}; var e = ac.energie; var nf = function (x) { return (+x || 0).toLocaleString('ro-RO'); };
    // Parc fotovoltaic / energie: indicatori ENERGETICI, NU POT/CUT/regim de clădire (ar fi eronat).
    if (e && e.putere_dc_kwp) {
      return tbl([
        ['Suprafață teren', nf(D.Steren) + ' mp'],
        ['Putere instalată DC', nf(e.putere_dc_kwp) + ' kWp'],
        ['Putere AC (invertoare)', nf(e.putere_ac_kva) + ' kVA (ILR ' + e.ilr + ')'],
        ['Tip montaj', e.montaj_label],
        ['Număr module', nf(e.nr_module) + ' × ' + e.putere_modul_wp + ' Wp'],
        ['Teren ocupat efectiv', nf(e.teren_necesar_mp) + ' mp (~' + e.teren_necesar_ha + ' ha)'],
        ['Producție anuală estimată', nf(e.productie_anuala_mwh) + ' MWh/an (' + e.yield_kwh_kwp + ' kWh/kWp)'],
        ['Racord', e.racord + ' · ' + nf(e.nr_pt) + ' PT × ' + nf(e.putere_pt_kva) + ' kVA'],
        ['POT / CUT (construcții tehnice — orientativ)', (ac.POT || 0) + '% / ' + (ac.CUT || 0)]
      ], ['Indicator', 'Valoare']);
    }
    return tbl([
      ['Suprafață teren', (D.Steren || '—') + ' mp'], ['Suprafață construită (SC)', (D.Sc || ac.Sc_total || '—') + ' mp'], ['Suprafață desfășurată (SD)', (D.Sd || ac.Sd_total || '—') + ' mp'], ['Suprafață utilă (SU)', (ac.Su_total || '—') + ' mp'],
      ['POT propus / max', (ac.POT || 0) + '% / ' + (D.POT_max != null ? D.POT_max + '%' : '—')], ['CUT propus / max', (ac.CUT || 0) + ' / ' + (D.CUT_max != null ? D.CUT_max : '—')],
      ['Regim de înălțime', (ac.regim_complet || ('P+' + Math.max(0, (D.niv_supraterane || 1) - 1))) + ' (H ' + (D.H || '—') + ' m)'], ['Parcaje propuse / necesare', (D.parcaje_propuse || 0) + ' / ' + ac.parcaje_necesare],
      ['Spații verzi minime', ac.sv_min_pct + '% (' + (ac.sv_min_mp || 0) + ' mp)']
    ], ['Indicator urbanistic', 'Valoare']);
  }
  // Bilanț de suprafețe (Su/Sc/Sd) + STANDARDUL specific funcțiunii (BOMA/GLA/SU-pat etc.)
  // Regulă: apare în memorii ȘI planșe ȘI peste tot, pentru ORICE funcțiune.
  function _ariiStandardTbl(D, v) {
    var ac = v.calc || {}; var nf = function (x) { return (+x || 0).toLocaleString('ro-RO'); };
    // Parc fotovoltaic / energie: BILANȚ TERITORIAL (nu Su/Sc/regim/POT de clădire).
    if (ac.energie && ac.energie.putere_dc_kwp) {
      var e = ac.energie;
      return tbl([
        ['Suprafață teren', nf(D.Steren) + ' mp'],
        ['Câmp de module (incl. spațiere inter-rânduri)', nf(e.camp_module_mp || e.arie_module_mp) + ' mp'],
        ['Grad de acoperire (GCR)', '' + e.gcr],
        ['Teren ocupat efectiv', nf(e.teren_necesar_mp) + ' mp (~' + e.teren_necesar_ha + ' ha)'],
        ['Densitate de putere', nf(e.densitate_kwp_ha) + ' kWp/ha (' + e.teren_per_mwp_ha + ' ha/MWp)'],
        ['Suprafață posturi transformare / invertoare + drumuri', '≈ ' + (e.overhead_pct || 18) + '% din teren'],
        ['Spații verzi / covor vegetal întreținut', (ac.sv_min_pct || 20) + '% (' + nf(ac.sv_min_mp) + ' mp)']
      ], ['Bilanț teritorial (parc fotovoltaic)', 'Valoare']);
    }
    var Sd = +D.Sd || ac.Sd_total || 0, Sc = +D.Sc || ac.Sc_total || 0, niv = +D.niv_supraterane || 1;
    var Su = +D.Su || ac.Su_total || (Sd ? Math.round(Sd * 0.82) : 0);
    var rows = [
      ['Suprafață utilă (Su)', Su ? nf(Su) + ' mp' : '—'],
      ['Suprafață construită (Sc)', Sc ? nf(Sc) + ' mp' : '—'],
      ['Suprafață desfășurată (Sd)', Sd ? nf(Sd) + ' mp' : '—'],
      ['Raport Su/Sd (eficiență)', (Sd && Su) ? Math.round(Su / Sd * 100) + '%' : '—'],
      ['Regim de înălțime', (ac.regim_complet || ('P+' + Math.max(0, niv - 1))) + (D.H ? ' (H ' + D.H + ' m)' : '')],
      ['POT / CUT', (ac.POT || 0) + '% / ' + (ac.CUT || 0)]
    ];
    var fn = D.functiune, extra = [];
    if (fn === 'birouri') {
      var rent = Sd ? Math.round(Sd * 0.90) : 0, lf = Su ? ((rent / Su - 1) * 100).toFixed(1) : '—';
      extra = [['— Standard BOMA (ANSI/BOMA Z65.1, birouri) —', ''], ['Gross Floor Area (GFA)', nf(Sd) + ' mp'], ['Rentable Area — arie închiriabilă', nf(rent) + ' mp'], ['Usable Area — arie utilizabilă', nf(Su) + ' mp'], ['Load Factor (R/U − 1)', lf + '%'], ['Eficiență (Usable/Rentable)', rent ? Math.round(Su / rent * 100) + '%' : '—']];
    } else if (fn === 'mall' || fn === 'spatiu-comercial') {
      var gla = Sd ? Math.round(Sd * 0.80) : 0;
      extra = [['— Standard comercial (GLA) —', ''], ['GBA — Gross Built Area', nf(Sd) + ' mp'], ['GLA — Gross Leasable Area (închiriabilă)', nf(gla) + ' mp'], ['Raport GLA/GBA', Sd ? Math.round(gla / Sd * 100) + '%' : '—']];
    } else if (fn === 'hotelier') {
      extra = [['— Standard hotelier —', ''], ['Nr. camere (estimat)', '' + (D.nr_camere || Math.max(1, Math.round(Su / 30)))], ['SU medie / cameră', '≈ 26–32 mp'], ['Pondere SU camere din SU total', '≈ 60–65%']];
    } else if (fn === 'medical') {
      extra = [['— Standard medical (OMS 914/2006) —', ''], ['Nr. paturi (estimat)', '' + (D.nr_paturi || Math.max(1, Math.round(Su / 35)))], ['SU / pat spitalizare', '≈ 30–40 mp (cu servicii)']];
    } else if (fn === 'bloc-locuinte' || fn === 'locuinta-individuala') {
      extra = [['— Standard locuire (NP 057/2002) —', ''], ['SU locuibilă (estimat)', Su ? nf(Math.round(Su * 0.70)) + ' mp' : '—'], ['Nr. apartamente (estimat)', '' + (fn === 'bloc-locuinte' ? Math.max(1, Math.round(Su / 65)) : 1)], ['SU medie / apartament', '≈ 55–75 mp']];
    } else if (fn === 'hala-industriala') {
      extra = [['— Standard hală / depozitare —', ''], ['SU depozitare/producție', nf(Su) + ' mp'], ['Sarcină utilă pardoseală', 'conform temă (t/mp)'], ['Înălțime liberă utilă', 'conform gabarit stivuire/rafturi']];
    } else if (fn === 'parcare') {
      extra = [['— Standard parcare —', ''], ['Nr. locuri (estimat, 25 mp/loc brut)', '' + (Su ? Math.round(Su / 25) : 0)], ['SU / loc de parcare (cu circulații)', '≈ 25 mp']];
    } else if (fn === 'sport') {
      extra = [['— Standard sport —', ''], ['SU teren/sală de joc', 'conform disciplină (FRF/FIBA/FIVB)'], ['Capacitate spectatori (estimat)', '' + (D.capacitate || '—')]];
    } else if (fn === 'scoala' || fn === 'gradinita') {
      extra = [['— Standard învățământ (NP 010/2022) —', ''], ['Nr. locuri/copii (estimat)', '' + (D.capacitate || Math.max(1, Math.round(Su / 6)))], ['SU / elev-preșcolar', '≈ 4–6 mp (sală de grupă/clasă)']];
    }
    return tbl(rows.concat(extra), ['Indicator de suprafață / standard specific', 'Valoare']);
  }
  function _verificariTbl(v) {
    return tbl(v.checks.map(function (c) { return [c.status === 'conform' ? 'CONFORM' : c.status === 'neconform' ? 'NECONFORM' : 'ATENȚIE', c.text, c.norma]; }), ['Stare', 'Verificare', 'Temei legal']);
  }
  // Sinteza COMPLETĂ a parametrilor tehnici derivați (nu doar categoria PSI) — structură, seism, climă, incendiu.
  function _parametriDerivatiTbl(D, v) {
    var ac = v.calc || {};
    var da = function (b) { return b ? 'DA' : 'nu'; };
    var risc = (ac.risc_incendiu || 'mediu').replace('foarte_mare', 'foarte mare');
    return tbl([
      ['Categorie de importanță (HG 766/1997)', (ac.categorie_importanta || '—')],
      ['Clasă de importanță seismică (P100-1/2013)', (ac.clasa_importanta || '—')],
      ['Factor de importanță γI', (ac.gamma_I != null ? ac.gamma_I.toFixed(2) : '1.00')],
      ['Factor de comportare q', (ac.factor_q != null ? ac.factor_q.toFixed(1) : '3.0')],
      ['Accelerație seismică ag / Tc', ((ac.seismic && ac.seismic.ag) || '—') + 'g / ' + ((ac.seismic && ac.seismic.Tc) || '—') + ' s'],
      ['Încărcare din zăpadă sk (CR 1-1-3/2012)', ((ac.clima && ac.clima.sk) || '—') + ' kN/m²'],
      ['Temperatura exterioară de calcul Te', ((ac.clima && ac.clima.Te) || '—') + ' °C'],
      ['Adâncime de îngheț (STAS 6054)', (ac.adancime_inghet_m || 0.9).toFixed(2) + ' m'],
      ['Risc / categorie de pericol de incendiu', risc + ' · Categoria ' + (D.psi || ac.psi_default || 'C')],
      ['Grad de rezistență la foc (P118-1)', 'Gradul ' + (ac.grad_default || 'II')],
      ['Densitate sarcină termică (SR EN 1991-1-2)', (ac.sarcina_termica_note || '—')],
      ['Arie maximă compartiment de incendiu', (ac.arie_compartiment_max || 0).toLocaleString('ro-RO') + ' mp'],
      ['Număr compartimente de incendiu', '' + (ac.nr_compartimente || 1)],
      ['Distanță evacuare (2 sensuri / fund de sac)', (ac.dist_evacuare_2sensuri || 35) + ' m / ' + (ac.dist_evacuare_fundsac || 15) + ' m'],
      ['Unitate de trecere evacuare (flux)', (ac.flux_evacuare_m || 0.6) + ' m'],
      ['Desfumare obligatorie', da(ac.desfumare_oblig)],
      ['Hidranți interiori / exteriori obligatorii', da(ac.hidranti_int_oblig) + ' / ' + da(ac.hidranti_ext_oblig)],
      ['Rezervă de apă pentru incendiu (estimată)', (ac.rezerva_incendiu_mc || 0) + ' mc'],
      ['Instalație sprinklere / IDSAI / lift pompieri', da(ac.sprinklere_oblig) + ' / ' + da(ac.idsi_oblig) + ' / ' + da(ac.lift_oblig)]
    ], ['Parametru tehnic derivat', 'Valoare / temei']);
  }
  // Conținut profund din bibliotecă (per funcțiune + specialitate). Întoarce HTML sau '' .
  function _lib(D, key) {
    try { var L = G.UXLibrary && G.UXLibrary[D.functiune]; return (L && L[key] && L[key].html) ? L[key].html : ''; } catch (e) { return ''; }
  }
  // Programul funcțional APLICAT de utilizator (din generatorul de program → „Aplică la proiect").
  // Se injectează în memorii ca document să reflecte spațiile REALE ale proiectului, nu doar exemplul din bibliotecă.
  function _programAplicatSec(D) {
    var sp = (D && D._spatii) || []; if (!sp.length) return null;
    var su = 0; sp.forEach(function (r) { su += (+r.buc || 0) * (+r.mp_unit || 0); });
    var tip = (D.__prog && D.__prog.tip) ? D.__prog.tip : '';
    var subtip = (D.__prog && D.__prog.params && (D.__prog.params.tip_beneficiar || D.__prog.params.subtip)) || '';
    var rows = sp.map(function (r) { return '<tr><td>' + esc(r.nume) + (r.ob ? ' *' : '') + '</td><td>' + esc(r.cat || r.zona || '—') + '</td><td>' + esc(r.niv || 'P') + '</td><td>' + (r.buc || 1) + '</td><td>' + (r.mp_unit || 0) + '</td><td>' + Math.round((+r.buc || 0) * (+r.mp_unit || 0)) + '</td></tr>'; }).join('');
    var html = '<p>Programul de spații de mai jos reflectă configurația <b>confirmată în modelul funcțional al proiectului</b> (capacitate → reguli normative), aplicată prin „Aplică la proiect"' + (subtip ? (', tip beneficiar: <b>' + esc(subtip) + '</b>') : '') + '. Suprafață utilă totală: <b>' + Math.round(su).toLocaleString('ro-RO') + ' mp</b>. Spațiile marcate cu * sunt obligatorii conform normativului aplicabil.</p>' +
      '<table><tr><th>Spațiu</th><th>Categorie</th><th>Niv</th><th>Buc</th><th>Su/buc (mp)</th><th>Su tot (mp)</th></tr>' + rows + '</table>';
    return { h: 'Programul funcțional aplicat proiectului' + (tip ? (' (' + esc(tip) + ')') : ''), html: html };
  }
  // Date energetice derivate PARAMETRIC din puterea instalată (parc fotovoltaic / energie).
  function _energieSec(D, v) {
    var e = (v && v.calc && v.calc.energie); if (!e || !e.putere_dc_kwp) return null;
    function f(x) { return (x == null ? '—' : (typeof x === 'number' ? x.toLocaleString('ro-RO') : x)); }
    var rows = [
      ['Sens de dimensionare', 'putere↔teren', e.directie || '—'],
      ['Tip montaj', 'fix / tracker', e.montaj_label],
      ['Putere instalată DC', 'P_DC', f(e.putere_dc_kwp) + ' kWp'],
      ['Putere AC (invertoare)', 'P_AC = P_DC / ILR', f(e.putere_ac_kva) + ' kVA (ILR ' + e.ilr + ')'],
      ['Număr module', 'N = P_DC / P_modul', f(e.nr_module) + ' × ' + e.putere_modul_wp + ' Wp'],
      ['Masă module (total)', 'N × ' + e.masa_modul_kg + ' kg', f(e.masa_module_t) + ' t'],
      ['Număr stringuri', '≈ N_module / ' + e.module_pe_string + ' (Voc<sub>−10°C</sub> < 1500 V)', f(e.nr_stringuri)],
      ['Număr invertoare', '≈ P_AC / ' + e.putere_invertor_kva + ' kVA', f(e.nr_invertoare)],
      ['Post transformare (PT)', '~1 PT / 1600 kVA', f(e.nr_pt) + ' × ' + f(e.putere_pt_kva) + ' kVA · racord ' + e.racord],
      ['Suprafață module', 'N × arie modul', f(e.arie_module_mp) + ' m²'],
      ['Teren necesar', 'arie module / GCR ' + e.gcr, f(e.teren_necesar_mp) + ' m² (~' + e.teren_necesar_ha + ' ha)'],
      ['Teren disponibil', 'introdus (Steren)', e.teren_disponibil_mp ? (f(e.teren_disponibil_mp) + ' m²') : '—'],
      ['Densitate de putere', 'P_DC / teren', f(e.densitate_kwp_ha) + ' kWp/ha · ' + e.teren_per_mwp_ha + ' ha/MWp'],
      ['Producție anuală', 'E = P_DC × PSH (' + e.psh_poa + ' h) × PR (' + e.pr + ') × k_montaj (' + e.gain_montaj + ')', f(e.productie_anuala_mwh) + ' MWh/an'],
      ['Randament specific', 'PSH × PR × k_montaj', f(e.yield_kwh_kwp) + ' kWh/kWp·an'],
      ['Producție cumulată 25 ani', 'cu degradare ' + e.degradare_an_pct + ' %/an', f(e.productie_25ani_mwh) + ' MWh'],
      ['CO₂ evitat', 'E × 0,25 tCO₂/MWh (mix SEN)', f(e.co2_evitat_t_an) + ' t/an']
    ];
    var html = '<p>Valorile de mai jos sunt derivate <b>parametric</b>, în ambele sensuri: din <b>puterea instalată</b> setată de proiectant se obține terenul necesar, sau — dacă puterea nu e dată — din <b>terenul disponibil</b> se obține puterea maximă instalabilă. Tipul de montaj (ficși / trackere) modifică gradul de acoperire (GCR) și producția. Formulele de scalare sunt în coloana a doua; documentul rămâne valabil pentru orice putere sau suprafață.</p>' +
      '<table><tr><th>Parametru</th><th>Formulă / temei</th><th>Valoare</th></tr>' + rows.map(function (r) { return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td>' + r[2] + '</td></tr>'; }).join('') + '</table>';
    return { h: 'Date energetice ale proiectului (derivate din puterea instalată)', html: html };
  }
  // Capacitate de dezvoltare + constrângerea determinantă (DE CE atât și nu mai mult) — orice funcțiune.
  function _capacitateSec(D, v) {
    var c = v && v.calc && v.calc.capacitate; var e = v && v.calc && v.calc.energie;
    function f(x) { return (x == null ? '—' : (typeof x === 'number' ? x.toLocaleString('ro-RO') : x)); }
    if (e && e.putere_dc_kwp) {
      var inv = (e.directie || '').indexOf('teren→') === 0;
      var budget = (e.teren_budget || []).map(function (r) { return '<tr><td>' + r[0] + '</td><td>' + f(r[1]) + ' m²</td></tr>'; }).join('');
      var ex1000 = Math.round(1000 * (1 - (e.overhead_pct / 100)) * e.gcr / 2.58 * e.putere_modul_wp / 1000);
      var html = '<p><b>Principiul dimensionării (teren ↔ putere).</b> Suprafața de teren și puterea instalabilă sunt legate biunivoc. ' +
        (inv ? ('Pe terenul disponibil de <b>' + f(e.teren_disponibil_mp) + ' m²</b> se pot instala <b>maxim ' + f(e.putere_dc_kwp) + ' kWp</b>.')
          : ('Pentru <b>' + f(e.putere_dc_kwp) + ' kWp</b> este nevoie de <b>' + f(e.teren_necesar_mp) + ' m² (~' + e.teren_necesar_ha + ' ha)</b>.')) +
        ' <b>Constrângerea determinantă este SUPRAFAȚA</b> (nu POT/CUT, neglijabile la parcuri FV): terenul se consumă de câmpul de module — limitat de gradul de acoperire GCR ' + e.gcr + ' impus de evitarea umbririi între rânduri — plus drumurile de mentenanță, platformele posturilor de transformare și ale invertoarelor, retragerile perimetrale, împrejmuirea și spațiile verzi. <b>De aceea nu se poate declara mai multă putere pe o suprafață dată: fizic nu ar avea unde fi amplasate modulele, invertoarele și PT-ul cu distanțele normate.</b> Platforma verifică automat această corelație și semnalează depășirile.</p>' +
        '<p>Repartiția terenului (montaj: ' + e.montaj_label + '):</p>' +
        '<table><tr><th>Component</th><th>Suprafață</th></tr>' + budget + '<tr><td><b>Total teren</b></td><td><b>' + f(e.teren_necesar_mp) + ' m²</b></td></tr></table>' +
        '<p>Densitate rezultată: <b>' + f(e.densitate_kwp_ha) + ' kWp/ha</b> (' + e.teren_per_mwp_ha + ' ha/MWp). Exemplu al principiului: pe <b>1.000 m²</b> se pot instala ~<b>' + f(ex1000) + ' kWp</b> la aceiași parametri — nu mai mult.</p>';
      return { h: 'Capacitate: teren ↔ putere și constrângerea determinantă', html: html };
    }
    if (c) {
      var html2 = '<p><b>Principiul dimensionării (teren ↔ construcție).</b> Pe terenul de <b>' + f(c.teren_mp) + ' m²</b>, capacitatea maximă de construire este limitată de indicatorii urbanistici și de constrângerile de amplasare: amprenta la sol <b>SC ≤ POT × S_teren = ' + c.pot_max + '% × ' + f(c.teren_mp) + ' = ' + f(c.sc_max_mp) + ' m²</b>; aria desfășurată <b>SD ≤ CUT × S_teren = ' + c.cut_max + ' × ' + f(c.teren_mp) + ' = ' + f(c.sd_max_mp) + ' m²</b> (≈ ' + c.niv_ech + ' niveluri la amprenta maximă). Din teren se scad spațiile verzi minime <b>' + f(c.sv_min_mp) + ' m²</b>, retragerile obligatorii (reduc amprenta utilă) și cele <b>' + f(c.parcaje) + ' locuri de parcare</b> (~' + f(c.parcaje_area_mp) + ' m² la sol). <b>Constrângerea determinantă</b> este cel mai restrictiv dintre POT, CUT, retrageri, parcaje și spații verzi — de aceea nu se poate construi mai mult: nu ar mai rămâne teren pentru accese, parcare și spațiile verzi impuse. Invers, pentru o arie desfășurată dorită, terenul minim = SD / CUT, cu verificarea amprentei la POT. Platforma semnalează automat depășirile de POT/CUT.</p>';
      return { h: 'Capacitate de dezvoltare și constrângerea determinantă', html: html2 };
    }
    return null;
  }
  function _withProgram(secs, D, v) { var out = secs.slice(); var cap = _capacitateSec(D, v); if (cap) out.splice(1, 0, cap); var e = _energieSec(D, v); if (e) out.splice(1, 0, e); var s = _programAplicatSec(D); if (s) out.splice(1, 0, s); return out; }

  // ── Scenariu SSI — cascada M0-M17 (aditiv, js/25-ssi-engine*.js) ──────────
  // Mapare functiune -> destinatie exacta folosita in T42/T148 (normative.json). Fallback conservator
  // pt functiunile fara corespondent direct in randurile deja extrase din normativ.
  var _DESTINATIE_T42 = {
    'locuinta-individuala': 'Cladiri de locuit', 'bloc-locuinte': 'Cladiri de locuit',
    'hotelier': 'Cladiri pentru cazare temporara', 'gradinita': 'Cladiri care adapostesc persoane ce nu se pot evacua singure',
    // Bug real gasit continuand cu "centru social/azil": functiunea nu era mapata deloc aici, desi
    // logica SE_SUPUNE/persoane_vulnerabile din alte sectiuni o trateaza deja corect dupa D.functiune —
    // rezultat: eticheta destinatiei afisata in tot documentul cadea pe genericul "alte destinatii, fara
    // sali aglomerate", inconsistent cu concluzia reala (SE SUPUNE, persoane care nu se pot evacua singure).
    'centru-social': 'Cladiri care adapostesc persoane ce nu se pot evacua singure',
    'medical': 'Cladiri care adapostesc persoane ce nu se pot evacua singure'
  };
  function _destinatieT42(functiune) { return _DESTINATIE_T42[functiune] || 'Cladiri cu alte destinatii, fara sali aglomerate'; }

  function _tblVecinatati(vecinatati, neconformM14) {
    if (!vecinatati || !vecinatati.length) return '<p>Nu au fost declarate vecinătăți (completează formularul de vecinătăți sau importă geometria din DXF).</p>';
    var byId = {}; (neconformM14 || []).forEach(function (n) { if (n.element_id) byId[n.element_id] = n; });
    return tbl(vecinatati.map(function (v) {
      var n = byId[v.id];
      // Bug real gasit (Florin): o vecinatate cu date lipsa (distanta necunoscuta) aparea totusi
      // "Conform: DA" — o comparatie cu date lipsa NU poate produce implicit un rezultat pozitiv.
      // Verificam EXPLICIT lipsa datelor inaintea oricarei alte interpretari a lui v.conforma.
      var conformTxt;
      if (v.distanta_necesara_m == null || v.distanta_masurata_m == null) conformTxt = 'NECUNOSCUT — date incomplete';
      else if (v.conforma === true) conformTxt = 'DA';
      else conformTxt = (n ? (n.status === 'NECONFORM_CORECTIE_PROIECT' ? 'CORECȚIE DIRECTĂ' : 'MĂSURĂ COMPENSATORIE') : 'NECONFORM');
      return [esc(v.id || '—') + (v.cf_numar ? ' (CF ' + esc(v.cf_numar) + ')' : ''), esc(v.destinatie_declarata || '—'), esc(v.grad_vecin || '—'), esc((v.risc_vecin_estimat || '—').replace('_', ' ')),
        v.perete_CF ? 'DA' : 'nu', (v.distanta_necesara_m != null ? v.distanta_necesara_m + ' m' : '—') + ' / ' + (v.distanta_masurata_m != null ? v.distanta_masurata_m + ' m' : 'necunoscută'),
        conformTxt];
    }), ['Vecinătate', 'Destinație clădire vecină', 'Grad rezistență vecin', 'Risc vecin', 'Perete CF', 'Distanță necesară/reală', 'Conform']);
  }

  // Model Florin (pct. 3.1): "Tabel de verificare — Rezistenta la foc necesara vs. realizata, pe elemente".
  // Necesarul provine din normative.json (P118_1_2025_T2/T144, randuri_extrase reale — extractie PARTIALA,
  // doar stalpi/grinzi/plansee sunt extrase la aceasta data; restul se marcheaza onest ca neextras, nu se
  // inventeaza un prag). Realizatul NU se presupune din tipul de material (regula #13) — se preia exclusiv
  // din D._rezistenta_foc_elemente (DoP/certificat/calcul acoperire beton al elementului efectiv pus in
  // opera); daca lipseste, ramane NEDECLARAT, nu se completeaza cu o valoare estimata.
  // Elementele NORMALE (au rand propriu, extras integral acum, in Tabelul 2/144 P118-1/2025).
  var _ELEMENTE_REZISTENTA_FOC = [
    { label: 'Stâlpi structură', cheieNormativ: 'STALPI (R)', cheieProiect: 'stalpi' },
    { label: 'Grinzi', cheieNormativ: 'GRINZI (R)', cheieProiect: 'grinzi' },
    { label: 'Planșee', cheieNormativ: 'PLANSEE cai de evacuare/incarcari suplimentare (REI)', cheieProiect: 'plansee' },
    { label: 'Pereți de compartimentare', cheieNormativ: 'Pereti de sectorizare cu rol de limitare a propagarii focului (compartimentare interioara) (REI/EI)', cheieProiect: 'pereti_compartimentare' },
    { label: 'Fațade/pereți exteriori', cheieNormativ: 'Pereti exteriori neportanti (E, o<->i)', cheieProiect: 'fatade' }
  ];
  function _tblRezistentaFocElemente(m0, grad, D) {
    var NE = G.SSI_NORMATIVE_ENGINE;
    var gradCol = (grad === 'I') ? 'I_h_sub_28m' : grad;
    var realizateDeclarate = D._rezistenta_foc_elemente || {};
    function randNormativ(e) {
      var necesarTxt, necesarMin = null;
      var res = NE.getStabilitateElement({ element: e.cheieNormativ, tip_lucrare: m0.regim_tabele });
      if (res.disponibil && res.rand) {
        var raw = res.rand[gradCol];
        if (raw == null) {
          necesarTxt = 'coloana gradului „' + gradCol + '” negăsită în rândul extras din ' + res.norma;
        } else {
          var m = /^(\d+)/.exec(String(raw));
          necesarMin = m ? +m[1] : null;
          necesarTxt = (String(raw).trim().indexOf('-') === 0)
            ? raw + ' (nu se impune la acest grad, cf. ' + res.norma + ')'
            : raw + ' min. (' + res.norma + (grad === 'I' ? ', grad I, H<28m' : '') + ')';
        }
      } else {
        necesarTxt = 'rând neextras din ' + res.norma + '; se completează de proiectantul atestat până la extinderea extracției';
      }
      return { necesarTxt: necesarTxt, necesarMin: necesarMin };
    }
    // La faza de proiectare (Florin, 12 iul), daca proiectantul nu a declarat inca DoP-ul real al
    // elementului, NU lasam un gol "nedeclarat" — reflectam intentia de proiectare: elementul se
    // dimensioneaza pentru minimul necesar (asta face proiectantul de rezistenta, e chiar definitia
    // proiectarii), confirmarea as-built (DoP/certificat) ramanand la faza de executie/receptie —
    // vezi gateFinal, care blocheaza DOAR exportul FINAL fara aceasta confirmare, nu si DRAFT-ul.
    function randRealizatConform(e, necesarMin) {
      var realizat = realizateDeclarate[e.cheieProiect];
      var realizatMin = (realizat && realizat.valoare != null) ? +realizat.valoare : necesarMin;
      var realizatTxt, sursaTxt, conform;
      if (realizat && realizat.valoare != null) {
        realizatTxt = realizat.valoare + ' min.'; sursaTxt = realizat.sursa || '—';
        conform = (necesarMin != null) ? (realizatMin >= necesarMin ? 'DA' : 'NU') : '—';
      } else if (necesarMin != null) {
        realizatTxt = 'proiectat pentru minimul necesar (' + necesarMin + ' min.)';
        sursaTxt = 'dimensionare la faza de calcul static/PT — DoP/certificat la recepție';
        conform = 'DA (prin proiectare)';
      } else {
        realizatTxt = 'de stabilit la faza de calcul static/PT (nu există prag numeric unic de referință — vezi coloana „necesară")';
        sursaTxt = '—'; conform = '—';
      }
      return [esc(realizatTxt), esc(sursaTxt), conform];
    }

    var byLabel = {}; _ELEMENTE_REZISTENTA_FOC.forEach(function (e) { byLabel[e.label] = randNormativ(e); });
    var pereti = byLabel['Pereți de compartimentare'];

    // Elemente DERIVATE (Uși/Etanșări) — nu au rand propriu in T2, dar normativul da o REGULA explicita
    // de derivare din rezistenta peretelui pe care il traverseaza/deservesc (Art. 2.3.2.1.2, 2.3.2.2.1.1,
    // 2.3.2.2.2.1 P118-1/2025, verificate pe text sursa oficial) — nu e o valoare inventata, e formula normata.
    var usi, etansari;
    if (pereti.necesarMin != null) {
      var usaMin = Math.max(Math.round(pereti.necesarMin / 2), 60);
      usi = { necesarTxt: usaMin + ' min. (EI2, minimum jumătate din rezistența peretelui de compartimentare — ' + pereti.necesarMin + ' min. — și nu mai puțin de EI2 60-C5S200, conform Art. 2.3.2.2.2.1 alin. (3) P118-1/2025)', necesarMin: usaMin };
      etansari = { necesarTxt: pereti.necesarMin + ' min. (egală cu rezistența peretelui de compartimentare traversat, conform Art. 2.3.2.1.2/2.3.2.2.1.1 alin. (2) lit. a) P118-1/2025)', necesarMin: pereti.necesarMin };
    } else {
      usi = { necesarTxt: 'derivă din rezistența peretelui de compartimentare (jumătate, min. EI2 60-C5S200, Art. 2.3.2.2.2.1) — indisponibil, vezi rândul „Pereți de compartimentare”', necesarMin: null };
      etansari = { necesarTxt: 'derivă din rezistența peretelui de compartimentare traversat (Art. 2.3.2.1.2) — indisponibil, vezi rândul „Pereți de compartimentare”', necesarMin: null };
    }
    // Scari/case de scari — NU are rand propriu in Tabelul 2 (rezistenta peretilor casei scarii se
    // stabileste ca pentru orice perete de compartimentare/degajament protejat, context-dependent);
    // singura valoare numerica gasita generic pe text sursa e pt usa casei scarii la accese ascensor
    // (Art. 3.1.4.6): EI2 60-C5S200 — pastrata ca reper partial, NU ca rezistenta completa a peretilor.
    var scari = { necesarTxt: 'rând fără valoare unică în Tabelul 2 (pereții casei scării se dimensionează ca pereți de compartimentare/degajament protejat, funcție de configurație — vezi rândul „Pereți de compartimentare”); reper parțial găsit în normativ: ușa casei scării minimum EI2 60-C5S200 (Art. 3.1.4.6 P118-1/2025)', necesarMin: null };

    var ORDINE = ['Stâlpi structură', 'Grinzi', 'Planșee', 'Pereți de compartimentare', 'Uși de compartimentare', 'Fațade/pereți exteriori', 'Scări/case de scări', 'Etanșări treceri instalații'];
    var cheiProiect = { 'Uși de compartimentare': 'usi_compartimentare', 'Scări/case de scări': 'scari', 'Etanșări treceri instalații': 'etansari' };
    var extra = { 'Uși de compartimentare': usi, 'Scări/case de scări': scari, 'Etanșări treceri instalații': etansari };
    var rows = ORDINE.map(function (label) {
      var e = _ELEMENTE_REZISTENTA_FOC.filter(function (x) { return x.label === label; })[0];
      var n = e ? byLabel[label] : extra[label];
      var cheieProiect = e ? e.cheieProiect : cheiProiect[label];
      return [label, esc(n.necesarTxt)].concat(randRealizatConform({ cheieProiect: cheieProiect }, n.necesarMin));
    });
    return tbl(rows, ['Element constructiv', 'Rezistență necesară (Tabelul 2)', 'Rezistență realizată (sursă: DoP/certificat)', 'Sursa valorii realizate', 'Conform']);
  }

  // Model Florin (pct. 4.1-4.11): fiecare instalatie are o lista FIXA de campuri tehnice proprii
  // (tip, volum, jeturi, debit, presiune etc.) care se listeaza INTOTDEAUNA, camp cu camp — modelul
  // insusi pastreaza randul si ii pune valoarea "Nu este cazul" cand instalatia nu e necesara, NU
  // colapseaza toate randurile intr-o singura propozitie (bug real semnalat de Florin cu captura:
  // "de ce dispar toate campurile? nu inteleg la ce se aplica"). Fix: tabelul se afiseaza mereu,
  // camp cu camp; valoarea e "Nu este cazul" (necesara===false), reala (din D._instalatii_ssi) sau
  // un gap onest [se completeaza] (necesara===true dar fara date reale furnizate inca).
  function _tblCampuriInstalatie(necesara, cheieInstalatie, campuri, D) {
    var valori = (D._instalatii_ssi && D._instalatii_ssi[cheieInstalatie]) || {};
    return tbl(campuri.map(function (c) {
      var v = valori[c.cheie];
      var valoare;
      if (v != null) valoare = esc(String(v));
      else if (necesara === false) valoare = 'Nu este cazul';
      else if (necesara == null) valoare = 'neevaluat — necesitatea echipării nu e stabilită de motor pentru acest tip de instalație';
      else valoare = 'se dimensionează la faza de proiect tehnic (PTh), conform normativului aplicabil instalației';
      return [c.eticheta, valoare];
    }), ['Caracteristică', 'Valoare']);
  }

  // Model Florin (pct. 4, tabel de sinteza): "Tabel de verificare - praguri instalatii PSI". Pragurile NU
  // sunt inventate pt acest tabel — sunt EXACT cele deja folosite de motorul de calcul (urbanx-doc-engine.js,
  // functia care seteaza ac.sprinklere_oblig/idsi_oblig/hidranti_int_oblig/hidranti_ext_oblig/desfumare_oblig),
  // doar reformatate ca tabel literal cu valoarea reala a proiectului alaturi, pt trasabilitate vizuala.
  function _tblPraguriInstalatii(D, ac, m5) {
    var Sc = +D.Sc || (m5 && m5.arie_proiectata_mp) || 0;
    var Sd = +D.Sd || Sc;
    var niv = +D.niv_supraterane || 1;
    var H = +D.H || 0;
    function da(b) { return b ? 'DA' : 'nu'; }
    var rows = [
      ['Hidranți interiori', 'volum > 5.000 m³ SAU Sd > 2.000 m² SAU destinație cu public (mall/sport/medical/parcaj/hală)', 'Sd = ' + Sd + ' m²', da(ac.hidranti_int_oblig), 'Sd proiect ' + Sd + ' m² vs. prag 2.000 m² — ' + (ac.hidranti_int_oblig ? 'pragul e depășit sau destinația e cu public' : 'sub prag, destinație fără public')],
      ['Hidranți exteriori', 'Sc > 600 m² SAU niveluri ≥ 3', 'Sc = ' + Sc + ' m², niv = ' + niv, da(ac.hidranti_ext_oblig), 'Sc proiect ' + Sc + ' m² vs. prag 600 m²; niv proiect ' + niv + ' vs. prag 3'],
      ['Sprinklere', 'Sc > 3.000 m² SAU H > 28 m (cap. 7 P118/2-2013)', 'Sc = ' + Sc + ' m², H = ' + H + ' m', da(ac.sprinklere_oblig), 'Sc proiect ' + Sc + ' m² vs. prag 3.000 m²; H proiect ' + H + ' m vs. prag 28 m'],
      ['IDSAI', 'Sc > 2.500 m² (P118-3/2015 + Ord. 6025/2018)', 'Sc = ' + Sc + ' m²', da(ac.idsi_oblig), 'Sc proiect ' + Sc + ' m² vs. prag 2.500 m²'],
      ['Desfumare', 'Sc > 2.500 m² SAU H > 28 m SAU parcaj SAU (hală industrială cu H>8m/Sc>1.000m²)', 'Sc = ' + Sc + ' m², H = ' + H + ' m, funcțiune = ' + (D.functiune || '—'), da(ac.desfumare_oblig), 'Sc/H proiect sub praguri și funcțiunea nu e parcaj/hală — verificare explicită, nu presupunere']
    ];
    return tbl(rows, ['Instalație', 'Prag normativ (sursă/articol)', 'Valoare proiect', 'Obligatorie', 'Motivare']);
  }

  // v4.1: tabel unic de neconformitati, cu coloanele "Tip" si "Localizare in proiect (DWG)" cerute de completare
  function _tblNeconformitatiV41(fise) {
    if (!fise.length) return '<p>Nu au fost identificate neconformități.</p>';
    return tbl(fise.map(function (f) {
      return [
        f.tip === 'NECONFORM_CORECTIE_PROIECT' ? 'CORECȚIE DIRECTĂ NECESARĂ' : 'MĂSURĂ COMPENSATORIE POSIBILĂ',
        esc(f.element.identificare_in_plan), esc(f.actiune), esc((f.cerinta && f.cerinta.sursa_normativa) || '—')
      ];
    }), ['Tip', 'Localizare în proiect (DWG)', 'Acțiune necesară', 'Sursă normativă']);
  }

  function _buildScenariuSSICascada(D, v) {
    var ac = v.calc;
    var m0 = G.SSI_ENGINE.m0_tipLucrare({ tip_lucrare: D.tip_lucrare });
    if (m0.eroare) {
      return { cat: 'Memorii Tehnice', file: 'Scenariu_securitate_incendiu_P118.doc', html: docHtml(_meta(D, 'SCENARIU DE SECURITATE LA INCENDIU', 'Ord. MAI 180/2022, Anexa 5'), [{ h: null, html: '<p><b>' + esc(m0.mesaj) + '</b></p>' }]) };
    }
    var grad = D.grad_stabilitate || ac.grad_default || 'II';
    var destinatieT42 = _destinatieT42(D.functiune);
    var m5 = G.SSI_ENGINE.m5_compartimentare(m0, { grad: grad, arie_construita_mp: D.Sc, niveluri: D.niv_supraterane });
    var m6 = G.SSI_ENGINE.m6_stabilitate(m0, { grad: grad, elemente_verificate: D._elemente_structurale || [] });
    var m9niv = G.SSI_ENGINE.m9_niveluriMaxime(m0, { grad: grad, destinatie: destinatieT42, niveluri_proiectate: D.niv_supraterane });
    var m6b = G.SSI_ENGINE.m6b_clasificareVecinatati(m0, { grad_stabilitate: grad }, D._vecinatati || []);

    // Faza citita din titlul DWG-ului importat vs. faza declarata a proiectului — NU se presupune
    // implicit D.T.A.C.; un plan de faza CU (Certificat de Urbanism) e o etapa anterioara oricarui
    // scenariu SSI propriu-zis (care se elaboreaza la D.T.A.C.) — neconcordanta e eroare de flux.
    var fazaDwg = D.geometrie_teren && D.geometrie_teren.faza_dwg && D.geometrie_teren.faza_dwg.faza_din_dwg;
    var fazaPrematura = fazaDwg && /^CU$/i.test(fazaDwg);

    // M6c + urbanism ansamblu — cladirile proprii detectate din planul de situatie (DXF), daca sunt
    // mai multe de 1 (ansamblu/plan de lotizare, nu o singura constructie). Tabelul 4/145 se aplica
    // INTRE cladirile proprii la fel ca fata de vecinii externi (M6b) — nu doar la limita de proprietate.
    var cladiriPropuse = D._cladiri_propuse || [];
    var distanteIntreCladiri = (D.geometrie_teren && D.geometrie_teren.distante_intre_cladiri) || [];
    // Grupuri constructive (v4.4): componente conexe de cladiri alipite (<0,3m intre contururi) —
    // un duplex/triplex e un SINGUR volum continuu, nu perechi/triplete de cladiri independente.
    var grupuriConstructive = (D.geometrie_teren && D.geometrie_teren.grupuri_constructive) || (cladiriPropuse.length ? cladiriPropuse.map(function (c) { return { id_grup: c.id, cladiri_incluse: [c.id], tip: 'INDIVIDUAL', volum_continuu: false }; }) : []);
    var m6c = (cladiriPropuse.length > 1) ? G.SSI_ENGINE.m6c_distanteIntreCladiriProprii(m0, { grad_stabilitate: grad }, distanteIntreCladiri, 'mic', grupuriConstructive) : null;
    var m5bGrupuri = cladiriPropuse.length ? G.SSI_ENGINE.m5b_compartimentareGrupuri(m0, grad, grupuriConstructive, cladiriPropuse, D._pereti_despartitori_cuplat || []) : null;
    // POT/CUT ansamblu au nevoie de aria terenului. Daca layerul LIMITA_PROPRIETATE nu a fost mapat
    // (frecvent la ansambluri, unde nu exista un contur unic ci loturi individuale), folosim SUMA
    // adnotarilor reale "S.parcela" deja scrise de proiectant in desen (nu recalculam, doar insumam
    // ce exista deja) — mai bine o aproximare din date reale decat "—" fara motiv, dar ramane marcata
    // explicit ca aproximare, nu ca masuratoare exacta a limitei de proprietate.
    var arieTerenDinLimita = D.geometrie_teren && D.geometrie_teren.limita_proprietate && D.geometrie_teren.limita_proprietate.arie_mp;
    var arieTerenDinLoturi = null, sursaArieTeren = null;
    if (!arieTerenDinLimita && D.geometrie_teren && D.geometrie_teren.adnotari_urbanism) {
      var loturi = D.geometrie_teren.adnotari_urbanism.filter(function (a) { return a.suprafata_parcela_mp != null; });
      if (loturi.length) { arieTerenDinLoturi = loturi.reduce(function (s, a) { return s + a.suprafata_parcela_mp; }, 0); sursaArieTeren = 'suma a ' + loturi.length + ' adnotări „S.parcelă" din desen (aproximativ — nu limita exactă de proprietate)'; }
    }
    var arieTerenFinala = arieTerenDinLimita || arieTerenDinLoturi;
    var urbanismAnsamblu = cladiriPropuse.length ? G.SSI_ENGINE.m_urbanismAnsamblu(cladiriPropuse, D._tipuri_cladiri || {}, arieTerenFinala) : null;
    if (urbanismAnsamblu) urbanismAnsamblu.sursaArieTeren = arieTerenDinLimita ? 'layer LIMITĂ DE PROPRIETATE' : sursaArieTeren;

    // v5.0 — Motor relevee: volum REAL per clădire (planul de situație nu dă panta/forma acoperișului
    // sau dacă podul e amenajabil) — daca nu exista releveu incarcat pt un tip, volumul ramane null +
    // avertisment explicit (nu se aproximeaza Sc×3m).
    var cladiriCuVolum = (G.SSI_RELEVEE && cladiriPropuse.length) ? G.SSI_RELEVEE.asociazaReleveuLaAmprente(D._relevee || {}, cladiriPropuse) : cladiriPropuse;
    var volumPeCladire = {}; cladiriCuVolum.forEach(function (c) { volumPeCladire[c.id] = c.volum; });

    // v4.1 — M14: fiecare neconformitate trece prin taxonomia cu 3 stari (CORECTIE_PROIECT vs MASURA_COMPENSATORIE_POSIBILA),
    // NU se mai decide manual "compensabil" — se deriva din existenta solutiilor in catalogul M15.
    var verificariM14 = [];
    if (m5.conform === false) {
      verificariM14.push(G.SSI_M14.verificaConformitate({
        id: 'M5-arie', tip: 'ARIE_COMPARTIMENT_DEPASITA', sens: 'max', unitate: 'm²',
        descriere_element: 'Aria compartimentului de incendiu', valoare_proiectata: m5.arie_proiectata_mp, valoare_necesara: m5.arie_maxima_admisa_mp,
        sursa_normativa: m5.norma
      }));
    }
    if (m9niv.conform === false) {
      verificariM14.push(G.SSI_M14.verificaConformitate({
        id: 'M9-niveluri', tip: 'NIVELURI_DEPASITE', sens: 'max', unitate: 'niveluri',
        descriere_element: 'Numărul de niveluri supraterane', valoare_proiectata: D.niv_supraterane, valoare_necesara: m9niv.niveluri_max,
        sursa_normativa: m9niv.norma
      }));
    }
    (m6b.vecinatati || []).forEach(function (vec) {
      if (!vec.conforma) {
        verificariM14.push(G.SSI_M14.verificaConformitate({
          id: 'M6b-' + vec.id, tip: 'DISTANTA_VECINATATE_INSUFICIENTA', sens: 'min', unitate: 'm', element_id: vec.id,
          descriere_element: 'Distanța de siguranță față de vecinătatea ' + vec.id, valoare_proiectata: vec.distanta_masurata_m, valoare_necesara: vec.distanta_necesara_m,
          sursa_normativa: vec.distanta_necesara_norma
        }));
      }
    });
    if (m6c) {
      m6c.neconforme.forEach(function (per) {
        verificariM14.push(G.SSI_M14.verificaConformitate({
          id: 'M6c-' + per.a + '-' + per.b, tip: 'DISTANTA_VECINATATE_INSUFICIENTA', sens: 'min', unitate: 'm', element_id: 'M6c-' + per.a + '-' + per.b,
          descriere_element: 'Distanța dintre clădirile proprii ' + per.a + ' și ' + per.b, valoare_proiectata: per.distanta_reala_m, valoare_necesara: per.distanta_necesara_m,
          sursa_normativa: per.distanta_necesara_norma
        }));
      });
    }
    if (m5bGrupuri) {
      m5bGrupuri.forEach(function (g) {
        if (g.tratament === 'COMPARTIMENT_UNIC' && g.verificare && g.verificare.conform === false) {
          verificariM14.push(G.SSI_M14.verificaConformitate({
            id: 'M5b-' + g.id_grup, tip: 'ARIE_COMPARTIMENT_DEPASITA', sens: 'max', unitate: 'm²', element_id: g.id_grup,
            descriere_element: 'Aria compartimentului unic al grupului constructiv ' + g.id_grup + ' (' + g.cladiri_incluse.length + ' unități alipite, aria însumată)',
            valoare_proiectata: g.arie_verificata_mp, valoare_necesara: g.verificare.arie_maxima_admisa_mp, sursa_normativa: g.verificare.norma
          }));
        }
      });
    }
    // ERO-VECIN-INCOMPLET (clasificare lipsa) — corectie directa (completare date), nu tine de catalog
    (m6b.neconformitati || []).filter(function (n) { return n.cod === 'ERO-VECIN-INCOMPLET'; }).forEach(function (n) {
      verificariM14.push({ id: 'M6b-incomplet-' + n.vecinatate, status: 'NECONFORM_CORECTIE_PROIECT', element_id: n.vecinatate, sursa_normativa: 'P118-1/2025 Tabelul 4/145', mesaj: n.mesaj,
        corectie_necesara: { ce: 'Completează clasificarea (destinație + grad rezistență) vecinătății ' + n.vecinatate, valoare_actuala: null, valoare_necesara: null, unitate: '', sursa: 'input proiectant' } });
    });

    var fiseNeconformitate = verificariM14.map(function (n) { return G.SSI_M14_VERDICT.genereazaFisaNeconformitate(n, D.geometrie_teren); });
    var fiseById = {}; fiseNeconformitate.forEach(function (f) { fiseById[f.id_neconformitate] = f; });
    var verdict = G.SSI_M14_VERDICT.genereazaVerdictGeneral(verificariM14);
    // verdict.lista contine obiectele M14 brute (folosite pt filtrare pe status) — pt afisare, mapam la fisa completa (element+actiune)
    if (verdict.lista) verdict.lista = verdict.lista.map(function (n) { return fiseById[n.id] || n; });

    function ctxSolutii(v14) {
      if (v14.tip === 'ARIE_COMPARTIMENT_DEPASITA') return { arie_proiectata: m5.arie_proiectata_mp, arie_maxima_admisa: m5.arie_maxima_admisa_mp };
      return {};
    }
    function fmtSolutiiPtNeconformitate(v14) {
      if (v14.status !== 'NECONFORM_MASURA_COMPENSATORIE_POSIBILA') return '';
      var sol = G.SSI_M15.genereazaSolutii(v14, ctxSolutii(v14));
      if (!sol.length) return '';
      // Identifica EXPLICIT cui i se aplica tabelul de mai jos — fara asta, acelasi tabel generic
      // apare repetat pentru fiecare neconformitate, fara sa spuna la ce pereche/element se refera
      // (bug real semnalat: "cine necesita retragere?").
      var cui = esc(v14.descriere_element || v14.element_id || v14.id || 'cerința neconformă');
      var cifre = (v14.valoare_proiectata != null && v14.valoare_necesara != null)
        ? ' (real ' + v14.valoare_proiectata + (v14.unitate || '') + ' vs. necesar ' + v14.valoare_necesara + (v14.unitate || '') + (v14.deficit != null ? ', deficit ' + Math.round(v14.deficit * 100) / 100 + (v14.unitate || '') : '') + ')'
        : '';
      return '<p><b>Pentru: ' + cui + cifre + '</b> — soluții candidate (selecția rămâne a proiectantului atestat, nu se aplică automat):</p>' +
        tbl(sol.map(function (x) { return [esc(x.solutie), esc(x.efect_calculat || '—'), (x.recalcul_necesar || []).join(', ')]; }), ['Soluție compensatorie', 'Efect', 'Recalcul necesar']);
    }
    // 2.2 ATEX — declarativ; daca D._spatii_atex nu e furnizat, implicitul e "fara substante" DOAR pt
    // destinatii unde asta chiar reflecta realitatea. Pt "skid" (SKID GPL/hidrogen/gaze — functiune al
    // carei NUME insusi declara prezenta unui gaz combustibil), implicitul "nu este cazul" ar fi fals —
    // se declara implicit un gaz combustibil generic (de confirmat exact de proiectant: GPL/hidrogen/
    // alt gaz), cu frecventa conservatoare "ocazionala" (nu "continua" - nefundamentat fara date reale
    // de exploatare: nici "improbabila" - prea optimist pt o instalatie proiectata cu risc inerent).
    var spatiiAtexImplicit = (D.functiune === 'skid')
      ? [{ nume: 'Instalație SKID (gaz combustibil)', substante_declarate: { gaze: ['gaz combustibil — de confirmat exact: GPL/hidrogen/alt gaz, conform proiectului'], vapori: [], pulberi: [] }, date_exploatare: { frecventa_scurgere: 'ocazionala' } }]
      : [{ nume: 'Ansamblul construcției', substante_declarate: { gaze: [], vapori: [], pulberi: [] } }];
    var spatiiAtex = D._spatii_atex || spatiiAtexImplicit;
    var rezultateAtex = spatiiAtex.map(function (sp) {
      var s = sp.substante_declarate || {};
      var substanteText = [].concat(s.gaze || [], s.vapori || [], s.pulberi || []).join('; ') || '—';
      return { nume: sp.nume, substante: substanteText, rezultat: G.SSI_M13.analizaATEX(sp) };
    });
    var atexAplicabilUnele = rezultateAtex.some(function (r) { return r.rezultat.ATEX_aplicabil; });
    // Bug real gasit (verificare piesa cu piesa a sectiunii ATEX): coloana "Substanta" arata de fapt
    // r.rezultat.tip_zona (categoria "gaze_vapori"/"pulberi"), nu substanta REALA declarata — corectat
    // sa arate substanta efectiv scrisa in sp.substante_declarate.
    var htmlAtex = atexAplicabilUnele
      ? tbl(rezultateAtex.filter(function (r) { return r.rezultat.ATEX_aplicabil; }).map(function (r) {
        return [esc(r.nume), esc(r.substante), 'Zona ' + r.rezultat.zona_propusa, esc(r.rezultat.echipamente_necesare), 'DE VALIDAT de proiectant ATEX'];
      }), ['Încăpere/Zonă', 'Substanță', 'Tip zonă', 'Echipamente Ex necesare', 'Validat de specialist'])
      : '<p>Nu este cazul – nu au fost identificate substanțe cu potențial exploziv (verificat pe toate încăperile/zonele declarate ale proiectului).</p>';

    // Materiale/DoP (M4b) — daca D._materiale nu e furnizat explicit, NU lasam sectiunea goala: se
    // genereaza automat lista de elemente pt sistemul constructiv cunoscut (zidarie confinata implicit
    // pt locuinte, sau cadre_beton daca declarat) — materialele CONSACRATE (beton, zidarie, sticla,
    // otel etc.) sunt clasificate A1 fara nicio actiune necesara; DOAR elementele cu variabilitate
    // reala (sarpanta lemn, termoizolatie, tamplarie, hidroizolatie) raman marcate ca necesitand DoP.
    // Daca proiectantul declara explicit D._materiale, acela are intotdeauna prioritate (nu se ignora
    // datele reale de proiect in favoarea listei implicite).
    // Tipurile de acoperis REALE declarate in releveu (per tip de cladire) — daca proiectantul a
    // declarat tip_acoperis='plat' pt un tip, sarpanta de lemn NU exista fizic pe acea cladire si
    // nu poate aparea ca element necesitand DoP (bug real gasit: aparea neconditionat, chiar la
    // acoperis plat).
    var tipuriAcoperisDeclarate = D._relevee ? Object.keys(D._relevee).map(function (k) { return D._relevee[k].tip_acoperis; }).filter(Boolean) : [];
    var materialeSursa = (D._materiale && D._materiale.length) ? D._materiale : G.SSI_M4B.genereazaListaImplicita(D._sistem_constructiv || 'zidarie_confinata', tipuriAcoperisDeclarate);
    var esteListaImplicita = !(D._materiale && D._materiale.length);
    var materialeInfo = G.SSI_M4B.valideazaMateriale(materialeSursa);
    var consacrate = materialeInfo.materiale.filter(function (m) { return m.certitudine === 'implicit_acceptat'; });
    var necesitaDoP = materialeInfo.materiale.filter(function (m) { return m.certitudine !== 'implicit_acceptat'; });
    // Reformulare (Florin, 12 iul): in faza de proiectare (DTAC/PTh) e normal ca produsul concret al
    // unui material variabil sa nu fie inca ales — proiectul PRESCRIE clasa minima ceruta, nu asteapta
    // DoP-ul unui produs care inca nu a fost achizitionat. Blocajul legal real (DoP obligatoriu la
    // depunerea la ISU) ramane in vigoare, dar exclusiv la poarta de export FINAL (vezi gateFinal mai
    // jos) — DRAFT-ul nu mai afiseaza text de avertizare/blocaj, ca sa nu para sectiune neconfirmata.
    var htmlMateriale =
      (esteListaImplicita ? '<p style="font-size:9pt;color:#666">Lista de mai jos e generată automat pentru sistemul constructiv „' + esc((D._sistem_constructiv || 'zidărie confinată').replace(/_/g, ' ')) + '" (implicit pentru clădiri joase, dacă nu s-a declarat altul) — corectează prin D._materiale dacă sistemul real diferă.</p>' : '') +
      '<p><b>Materiale consacrate</b> (proprietate intrinsecă a materialului, variabilitate neglijabilă între producători — clasificare implicită, fără altă confirmare necesară):</p>' +
      (consacrate.length ? tbl(consacrate.map(function (m) { return [esc(m.element || m.nume), esc(m.nume), esc(m.clasa || '—'), esc(m.sursa || '—')]; }), ['Element', 'Material', 'Clasă reacție la foc', 'Justificare']) : '<p>Niciun element consacrat identificat.</p>') +
      '<p><b>Materiale cu variabilitate reală — clasă prescrisă de proiect</b> (produsul concret se alege la faza de aprovizionare/execuție, cu DoP atașat la recepție):</p>' +
      (necesitaDoP.length ? tbl(necesitaDoP.map(function (m) {
        var claseOrientativa = m.clasa ? m.clasa + ' (orientativ, tipic pentru produsul generic)' : 'variază pe producător — se stabilește prin DoP-ul produsului ales';
        return [esc(m.element || m.nume), esc(m.nume), esc(claseOrientativa), m.DoP_atasat ? 'DA (DoP atașat)' : 'de aprovizionare — produsul concret și DoP se atașează la execuție'];
      }), ['Element', 'Material (tip generic)', 'Clasă orientativă la proiectare', 'Confirmare produs concret']) : '<p>Niciun element cu variabilitate reală identificat.</p>');

    var indicativNorme = ['P118_1_2025_T2', 'P118_1_2025_T4', 'P118_1_2025_T5', 'P118_1_2025_T41', 'P118_1_2025_T42', 'P118_1_2025_T144', 'P118_1_2025_T145', 'P118_1_2025_T146', 'P118_1_2025_T147', 'P118_1_2025_T148'];
    var statusNevalidat = G.SSI_NORMATIVE_ENGINE.verificaStatusNormativeFolosite(indicativNorme);
    // Simetrie DRAFT/FINAL (Florin, 11 iul): analiza nu se opreste niciodata pt vecinatati neconfirmate — doar
    // exportul FINAL (pt depunere la ISU) cere ca fiecare vecinatate estimata implicit sa fi fost confirmata/corectata.
    var vecinatatiNeconfirmate = (m6b.vecinatati || []).filter(function (v) { return v.estimat_implicit && !v.confirmat; });

    // BUG 5 (Florin): FINAL nu poate depinde doar de statusul normativelor — integritatea INTERNA
    // a calculului e o verificare separata si obligatorie (volume NaN, 0 perechi verificate cand
    // ar fi trebuit N*(N-1)/2, etc.) — altfel un document cu erori de calcul se putea marca FINAL.
    var eroriIntegritate = [];
    if (cladiriPropuse.length > 1) {
      var nrAsteptate = cladiriPropuse.length * (cladiriPropuse.length - 1) / 2;
      var nrVerificate = m6c ? m6c.perechi.length : 0;
      if (nrVerificate !== nrAsteptate) eroriIntegritate.push('verificarea de distanțe a rulat pe ' + nrVerificate + ' perechi, nu pe cele ' + nrAsteptate + ' așteptate pentru ' + cladiriPropuse.length + ' clădiri');
    }
    if (m5bGrupuri) {
      m5bGrupuri.forEach(function (g) {
        g.cladiri_incluse.forEach(function (id) {
          var v = volumPeCladire[id];
          if (v && v.volum_total_mc != null && isNaN(v.volum_total_mc)) eroriIntegritate.push('volum invalid (NaN) pentru clădirea ' + id);
        });
      });
    }

    // v4.2 — SINGURA blocare reala: daca s-a bifat "Genereaza ca FINAL" si raman vecinatati neconfirmate
    // sau normative nevalidate, refuza explicit exportul FINAL (analiza DRAFT ramane mereu disponibila neschimbata).
    if (D._ssi_final_mode) {
      var gateFinal = G.SSI_M14_VERDICT.poateFiExportatFinal(m6b.vecinatati, statusNevalidat, !!D._normative_confirmate_de_proiectant, { erori: eroriIntegritate }, materialeInfo);
      if (!gateFinal.poate) {
        return {
          cat: 'Memorii Tehnice', file: 'Scenariu_securitate_incendiu_P118_BLOCAT.doc',
          html: docHtml(_meta(D, 'SCENARIU DE SECURITATE LA INCENDIU — EXPORT FINAL BLOCAT', 'Ord. MAI 180/2022, Anexa 5'), [
            { h: null, html: '<div style="border:2px solid #dc2626;border-radius:6pt;padding:10pt;background:#dc262611"><p style="margin:0;font-size:13pt;font-weight:bold;color:#dc2626">EXPORT CA FINAL BLOCAT</p>' +
              '<p style="margin:6pt 0 0">' + esc(gateFinal.motiv) + '</p>' +
              '<p style="margin:6pt 0 0;font-size:9pt;color:#666">Analiza DRAFT rămâne disponibilă oricând (debifează „Generează ca FINAL" în panoul SSI) — doar exportul pentru depunerea oficială la ISU cere confirmarea/validarea de mai sus.</p></div>' }
          ])
        };
      }
    }

    var CULOARE_VERDICT = { rosu: '#dc2626', galben: '#d97706', verde: '#16a34a' };
    var secs = [
      { h: null, html: '<div style="border:2px solid ' + (CULOARE_VERDICT[verdict.culoare] || '#888') + ';border-radius:6pt;padding:10pt;margin-bottom:8pt;background:' + (CULOARE_VERDICT[verdict.culoare] || '#888') + '11">' +
        '<p style="margin:0;font-size:13pt;font-weight:bold;color:' + (CULOARE_VERDICT[verdict.culoare] || '#888') + '">CONCLUZIE GENERALĂ / VERDICT: ' + esc(verdict.verdict) + '</p>' +
        (verdict.motiv ? '<p style="margin:4pt 0 0">' + esc(verdict.motiv) + '</p>' : '') +
        (verdict.lista && verdict.lista.length ? '<ul style="margin:4pt 0 0">' + verdict.lista.map(function (f) { return '<li>' + esc(f.element ? f.element.identificare_in_plan : (f.id || '')) + ': ' + esc(f.actiune || f.mesaj || '') + '</li>'; }).join('') + '</ul>' : '') +
        '<p style="margin:6pt 0 0;font-size:9pt;color:#666">Acest verdict se recalculează integral după orice modificare a proiectului (nouă versiune DWG) — o corecție punctuală poate afecta alte verificări.</p></div>' }
    ].concat(fazaPrematura ? [{
      h: null, html: '<div style="border:2px solid #dc2626;border-radius:6pt;padding:10pt;margin-bottom:8pt;background:#dc262611">' +
        '<p style="margin:0;font-size:12pt;font-weight:bold;color:#dc2626">⚠ NECONCORDANȚĂ DE FAZĂ — planul importat (DXF) este marcat „faza: ' + esc(fazaDwg) + '"</p>' +
        '<p style="margin:4pt 0 0">Un Certificat de Urbanism (CU) este o etapă anterioară documentației tehnice (D.T.A.C.) — un scenariu de securitate la incendiu complet, conform Ord. MAI 180/2022, se elaborează la faza D.T.A.C., pe un proiect de arhitectură deja stabilizat, nu pe planul de CU. Acest document a fost totuși generat (faza proiect setată: ' + esc(D.faza || 'D.T.A.C.') + ') — verifică dacă planul de situație folosit e cel corect pentru faza curentă înainte de a-l folosi pentru avizare/autorizare.</p></div>' }] : []).concat([
      { h: '1.0. Tipul de lucrare (determină tabelele P118-1/2025 aplicabile)', html: '<p><b>' + esc(m0.label) + '.</b> Regim tabele: ' + (m0.regim_tabele === 'EXISTENTA_NEMODIFICATA' ? 'construcție EXISTENTĂ (T144/T145/T146/T147/T148, Anexa A.10)' : 'construcție NOUĂ (T2/T4/T5/T41/T42)') + '.' + (m0.nota ? ' ' + esc(m0.nota) : '') + '</p><p style="font-size:9pt;color:#888">Temei: ' + esc(m0.temei_legal) + '</p>' },
      { h: '1.1. Datele de identificare', html: tbl([
        ['Denumire', esc(D.nume || '—')], ['Amplasament', esc((D.uat || '—') + (D.nrcad ? ', nr. cad. ' + D.nrcad : ''))],
        ['Beneficiar', esc(D.beneficiar || '—')], ['Fază de proiectare', esc(D.faza || 'D.T.A.C.')],
        ['Telefon/E-mail beneficiar', esc(D.contact_beneficiar || '[se completează]')]
      ], ['Element', 'Valoare']) },
      { h: '1.2. Destinația', html: (function () {
        // Extindere multi-functiune (Florin, 12 iul): HG 571/2016 Anexa 1 NU trateaza toate destinatiile
        // identic — categoriile care adapostesc persoane ce nu se pot evacua singure (cresa/gradinita,
        // centru social/varstnici, unitati medicale) SE SUPUN avizarii INTOTDEAUNA, indiferent de regim
        // de inaltime/arie (criteriu de vulnerabilitate a utilizatorilor, nu de marime a cladirii) —
        // nu se aplica pragul P+4 folosit la rezidential. Blocurile de locuinte COLECTIVE folosesc
        // acelasi prag P+4 ca inainte, dar cu text propriu (nu "locuinta unifamiliala").
        var FUNCTIUNI_PERSOANE_VULNERABILE = { gradinita: 1, 'centru-social': 1, medical: 1 };
        var esteFunctiunePersoaneVulnerabile = !!FUNCTIUNI_PERSOANE_VULNERABILE[D.functiune];
        var esteBloc = D.functiune === 'bloc-locuinte';
        var esteLocuintaUnifamiliala = D.functiune === 'locuinta-individuala' || (!esteBloc && /locuint/i.test(destinatieT42));
        var htmlSpecific, seSupune, motivSupune;
        if (esteFunctiunePersoaneVulnerabile) {
          seSupune = true;
          motivSupune = ', întrucât destinația reală (' + esc(destinatieT42.toLowerCase()) + ') se regăsește explicit în H.G. 571/2016, Anexa 1, la categoria clădirilor care adăpostesc persoane ce nu se pot evacua singure — încadrarea este dată de vulnerabilitatea utilizatorilor, nu de regimul de înălțime sau arie, deci se aplică indiferent de dimensiunile construcției.';
          htmlSpecific = '<p>Destinația reală, așa cum rezultă din proiectul de arhitectură: <b>' + esc(destinatieT42) + '</b>.</p>' +
            '<p>Încadrarea în categoriile care se supun avizării/autorizării de securitate la incendiu se stabilește conform H.G. nr. 571/2016, Anexa nr. 1. Pentru destinații care adăpostesc persoane incapabile să se evacueze singure (creșe/grădinițe, centre pentru vârstnici/persoane cu dizabilități, unități medicale), Anexa 1 impune avizare/autorizare obligatorie indiferent de regimul de înălțime, aria desfășurată sau capacitate — pragul nu este dimensional, e funcțional.</p>';
        } else if (esteBloc) {
          seSupune = D.niv_supraterane && +D.niv_supraterane >= 5;
          motivSupune = seSupune ? ', motivat de regimul de înălțime declarat (≥P+4).' : ', întrucât regimul de înălțime declarat (' + esc(D.regim || '—') + ') nu atinge pragul P+4 stabilit de Anexa 1 pentru clădirile de locuit colective.';
          htmlSpecific = '<p>Destinația reală, așa cum rezultă din proiectul de arhitectură: <b>' + esc(destinatieT42) + ' (clădire de locuit colectivă)</b>.</p>' +
            '<p>Încadrarea în categoriile care se supun avizării/autorizării de securitate la incendiu se stabilește conform H.G. nr. 571/2016, Anexa nr. 1. Pentru funcțiunea rezidențială colectivă, Anexa 1 vizează explicit clădirile de locuit cu regim de înălțime P+4 și peste (cu mansardă amenajată).</p>';
        } else if (esteLocuintaUnifamiliala) {
          seSupune = D.niv_supraterane && +D.niv_supraterane >= 5;
          motivSupune = seSupune ? ', motivat de regimul de înălțime declarat (≥P+4).' : ', întrucât destinația reală (locuință unifamilială, regim redus) nu se regăsește printre criteriile Anexei 1 — prezentul document rămâne totuși util ca memoriu tehnic de fundamentare pentru D.T.A.C./D.T.A.D. (Legea 50/1991) și pentru identificarea corectă a cerințelor tehnice aplicabile P118-1/2025, chiar dacă nu necesită avizare ISU explicită.';
          htmlSpecific = '<p>Destinația reală, așa cum rezultă din proiectul de arhitectură: <b>' + esc(destinatieT42) + '</b>' + (cladiriPropuse.length > 1 ? ' (ansamblu de ' + cladiriPropuse.length + ' unități unifamiliale independente, nu o clădire colectivă unică)' : '') + '.</p>' +
            '<p>Încadrarea în categoriile care se supun avizării/autorizării de securitate la incendiu se stabilește conform H.G. nr. 571/2016, Anexa nr. 1. Pentru funcțiunea rezidențială, Anexa 1 vizează explicit clădirile de locuit <b>colective</b> cu regim de înălțime P+4 și peste (cu mansardă amenajată) — o locuință unifamilială (individuală sau cuplată/duplex) cu regim ' + esc(D.regim || 'P+1E') + ', chiar repetată identic pe mai multe loturi ale aceluiași ansamblu, nu este o clădire colectivă unică și nu atinge acest prag.</p>';
        } else {
          // Alte destinatii (comert/birouri/hale/energie/ATEX etc.) — pragurile Anexei 1 sunt proprii
          // fiecarei categorii si NU au fost inca verificate punctual pe text sursa in acest motor
          // (regula #13 a modelului: nu se citeaza un criteriu apropiat, dar neverificat pt categoria
          // reala) — se marcheaza onest ca necesitand verificare de specialitate, nu se presupune.
          seSupune = null;
          motivSupune = '';
          htmlSpecific = '<p>Destinația reală, așa cum rezultă din proiectul de arhitectură: <b>' + esc(destinatieT42) + '</b>.</p>' +
            '<p>Încadrarea în categoriile care se supun avizării/autorizării de securitate la incendiu se stabilește conform H.G. nr. 571/2016, Anexa nr. 1, pe baza criteriului specific acestei destinații (prag propriu de arie/capacitate/categorie de pericol, distinct de cel rezidențial) — de verificat punctual de proiectantul atestat, litera exactă din Anexa 1 aplicabilă acestei funcțiuni nefiind încă validată în acest motor.</p>';
        }
        return htmlSpecific + '<p><b>Concluzie: ' + (seSupune == null ? 'DE STABILIT — verificare de specialitate necesară' : (seSupune ? 'SE SUPUNE' : 'NU SE SUPUNE')) + ' avizării/autorizării de securitate la incendiu conform H.G. 571/2016, Anexa 1</b>' + esc(motivSupune) + '</p>';
      })() },
      { h: '1.3. Categoria de importanță', html: (function () {
        var FUNCTIUNI_PERSOANE_VULNERABILE = { gradinita: 1, 'centru-social': 1, medical: 1 };
        if (D.categorie_importanta) {
          return '<p>Se stabilește conform Regulamentului privind stabilirea categoriei de importanță a construcțiilor, aprobat prin H.G.R. nr. 766/1997, Anexa 3, cap. II, art. 6, coroborat cu metodologia M.L.P.A.T. Categorie de importanță <b>' + esc(D.categorie_importanta) + '</b> (declarată de proiectant).</p>';
        }
        if (FUNCTIUNI_PERSOANE_VULNERABILE[D.functiune]) {
          return '<p>Se stabilește conform Regulamentului privind stabilirea categoriei de importanță a construcțiilor, aprobat prin H.G.R. nr. 766/1997, Anexa 3, cap. II, art. 6, coroborat cu metodologia M.L.P.A.T. — destinația reală (' + esc(destinatieT42.toLowerCase()) + ') adăpostește persoane care nu se pot evacua singure, criteriu care poate încadra construcția în categoria de importanță <b>B</b> (nu implicit C, ca la destinațiile fără persoane vulnerabile) — încadrarea exactă (B sau C, funcție de capacitate/configurație) <b>nu este încă validată în acest motor</b> și trebuie stabilită de proiectantul atestat pe baza criteriilor complete ale Anexei 3.</p>';
        }
        return '<p>Se stabilește conform Regulamentului privind stabilirea categoriei de importanță a construcțiilor, aprobat prin H.G.R. nr. 766/1997, Anexa 3, cap. II, art. 6, coroborat cu metodologia M.L.P.A.T. — pe baza destinației (' + esc(destinatieT42.toLowerCase()) + '), regimului de înălțime (' + esc(D.regim || '—') + ') și ariei desfășurate, construcția se încadrează în categoria de importanță <b>' + esc(ac.categorie_importanta || 'C') + '</b>' + (D.functiune === 'locuinta-individuala' ? ' — redusă/normală, nu necesitând o justificare suplimentară de categorie superioară.' : ' — de confirmat de proiectantul atestat pe baza criteriilor complete ale Anexei 3, specifice acestei destinații.') + '</p>';
      })() },
      { h: '1.4.a. Tipul clădirii', html: (function () {
        var esteResidentialIndiv = D.functiune === 'locuinta-individuala';
        var functiuneConexa = esteResidentialIndiv ? 'grupuri sanitare, spații tehnice aferente locuinței' : 'grupuri sanitare, spații tehnice aferente destinației principale (de detaliat conform proiectului de arhitectură)';
        var descriereMultipla = esteResidentialIndiv
          ? 'Ansamblul cuprinde ' + cladiriPropuse.length + ' unități, grupate geometric în ' + (m5bGrupuri ? m5bGrupuri.length : cladiriPropuse.length) + ' compartimente (individuale și cuplate/duplex) — vezi 1.4.f/1.4.g pentru sinteza completă.'
          : 'Ansamblul cuprinde ' + cladiriPropuse.length + ' clădiri/unități — vezi 1.4.f/1.4.g pentru sinteza completă.';
        return '<p>Funcțiunea principală: <b>' + esc(destinatieT42) + '</b>. Funcțiuni secundare: —. Funcțiuni conexe: ' + functiuneConexa + '. ' + (cladiriPropuse.length > 1 ? descriereMultipla : (esteResidentialIndiv ? 'Clădire unifamilială independentă.' : 'Clădire independentă.')) + '</p>';
      })() },
      { h: '1.4.b. Tipul parcajului', html: '<p>' + (D._tip_parcaj ? esc(D._tip_parcaj) : (D.functiune === 'locuinta-individuala'
        ? 'Nu este cazul un parcaj colectiv distinct — parcarea se asigură pe fiecare parcelă individuală (garaj integrat și/sau platformă exterioară), conform proiectului de arhitectură al fiecărei unități.'
        : 'Tipul de parcaj (exterior deschis / subteran / suprateran închis) nu a fost declarat pentru acest proiect — se completează conform proiectului de arhitectură; regimul normativ diferă semnificativ între cele trei variante (parcaj subteran/închis impune compartimentare proprie și desfumare mecanică obligatorie, spre deosebire de parcajul exterior deschis).')) + '</p>' },
      { h: '1.4.c. Regimul de înălțime și volumul construcției', html: '<p>Regim de înălțime: <b>' + esc(D.regim || ('P+' + Math.max(0, (+D.niv_supraterane || 1) - 1))) + '</b>' + (cladiriPropuse.length > 1 ? ' (uniform pe toate tipurile detectate din plan — vezi 1.4.g pentru variații reale de Sc/Sd pe tip)' : '') + '. Înălțimea se măsoară de la nivelul carosabilului adiacent accesibil autospecialelor de intervenție până la pardoseala ultimului nivel folosibil.</p>' +
        (cladiriPropuse.length > 1
          ? '<p>Volumul total al ansamblului: ' + (function () {
            var toate = cladiriCuVolum.filter(function (c) { return c.volum && c.volum.volum_total_mc != null && !isNaN(c.volum.volum_total_mc); });
            if (!toate.length) return 'necalculat — niciun tip de clădire nu are releveu (H cornișă/coamă/tip acoperiș) completat; vezi secțiunea de relevee din panoul SSI.';
            var total = toate.reduce(function (s, c) { return s + c.volum.volum_total_mc; }, 0);
            return Math.round(total).toLocaleString('ro-RO') + ' m³ (' + toate.length + ' din ' + cladiriPropuse.length + ' clădiri au volum calculat din releveu; restul rămân necalculate până se completează releveul tipului respectiv).';
          })() + '</p>'
          : '<p>Volum: ' + (function () { var c = cladiriCuVolum[0]; return (c && c.volum && c.volum.volum_total_mc != null && !isNaN(c.volum.volum_total_mc)) ? c.volum.volum_total_mc + ' m³' : 'necalculat — lipsă releveu'; })() + '.</p>') },
      { h: '1.4.d. Aria construită și desfășurată', html: cladiriPropuse.length > 1
        ? '<p>Vezi 1.4.g pentru sinteza completă pe tipuri și totalul ansamblului (Σ Sc / Σ Sd), calculate din adnotările reale ale proiectantului din planul de situație, nu recalculate.</p>'
        : '<p>Aria construită: ' + ((D.Sc || '—') + ' m²') + '. Aria desfășurată a compartimentului de incendiu: ' + ((D.Sd || '—') + ' m²') + '.</p>' },
      { h: '1.4.e. Înălțimea de referință pentru accesul autospecialelor de intervenție', html: '<p>Distinct de compartimentare (pct. 1.4.c): înălțimea dintre carosabilul adiacent accesibil autospecialelor și pardoseala ultimului nivel folosibil este ' + (cladiriPropuse.length > 1 ? 'variabilă pe tip de clădire — vezi H cornișă din releveu la 1.4.g/panoul de relevee' : (D.H || 'necompletată')) + ', conform criteriilor P118-1/2025 privind accesul forțelor de intervenție (pct. A.10.3.7.2).</p>' },
      { h: '1.4.f. Sinteza compartimentelor de incendiu', html: (m5bGrupuri && m5bGrupuri.length) ? (function () {
        var rows = m5bGrupuri.map(function (g, idx) {
          var volumeGrup = g.cladiri_incluse.map(function (id) { return volumPeCladire[id]; });
          // Defensiv (bug real gasit: NaN trecea nefiltrat) — orice valoare non-numerica sau lipsa
          // opreste explicit afisarea unui volum, niciodata "NaN m³" in document.
          var volumComplet = volumeGrup.length && volumeGrup.every(function (v) { return v && v.volum_total_mc != null && !isNaN(v.volum_total_mc); });
          var volumTxt = volumComplet ? Math.round(volumeGrup.reduce(function (s, v) { return s + v.volum_total_mc; }, 0)) + ' m³' : 'necalculat — lipsă releveu';
          var conformTxt = !g.verificare ? 'nedeterminat' : (g.verificare.conform === false ? 'NU' : 'DA');
          return ['' + (idx + 1), esc(g.id_grup), esc(destinatieT42), (g.arie_verificata_mp != null ? g.arie_verificata_mp + ' m²' : '—'), volumTxt, conformTxt];
        });
        var nrNeconforme = m5bGrupuri.filter(function (g) { return g.verificare && g.verificare.conform === false; }).length;
        return '<p><b>Total: ' + m5bGrupuri.length + ' compartimente de incendiu</b>, listate integral mai jos (' + m5bGrupuri.map(function (g) { return g.id_grup; }).join(', ') + '), rezultate din ' + cladiriPropuse.length + ' clădiri — grupurile cuplate fără perete antifoc declarat formează UN SINGUR compartiment fiecare, cu aria însumată; detaliul complet pe grup (ce clădiri conține fiecare) e la secțiunea „Compunerea compartimentelor" imediat de mai jos.</p>' +
          (nrNeconforme ? '<p style="color:#dc2626"><b>' + nrNeconforme + ' compartiment/compartimente depășesc aria maximă admisă</b> — vezi secțiunea 5 pentru măsurile compensatorii/corecțiile necesare.</p>' : '<p style="color:#16a34a">Toate cele ' + m5bGrupuri.length + ' compartimente respectă aria maximă admisă.</p>') +
          tbl(rows, ['Nr.', 'Compartiment', 'Funcțiuni', 'Arie', 'Volum', 'Conform limitei admise']);
      })() : tbl([
        ['1', 'CI-01', esc(destinatieT42), (m5.arie_proiectata_mp || 0) + ' m²', Math.round((m5.arie_proiectata_mp || 0) * (+D.niv_supraterane || 1) * 3) + ' m³ (estimat)', m5.conform === false ? 'NU' : (m5.conform ? 'DA' : 'nedeterminat')]
      ], ['Nr.', 'Compartiment', 'Funcțiuni', 'Arie', 'Volum (estimat)', 'Conform limitei admise']) }
    ].concat(urbanismAnsamblu ? [{
      h: 'Sinteza clădirilor propuse (plan de situație — ' + urbanismAnsamblu.nrCladiriTotal + ' clădiri detectate)',
      html: '<p>Amprentele la sol au fost extrase automat din planul de situație (DXF) — fiecare clădire distinctă e o compartimentare separată de incendiu, dacă nu sunt alăturate/interconectate fără separare la foc. Suprafețele (Sc/Sd) și indicatorii (POT/CUT) de mai jos provin din adnotările proiectantului din desen, nu sunt recalculate.</p>' +
        tbl(urbanismAnsamblu.tipuri.map(function (t) { return [esc(t.denumire), '' + t.n, t.sc_mp + ' m²', t.sd_mp != null ? t.sd_mp + ' m²' : '—']; }), ['Tip clădire', 'Nr. unități', 'Sc/unitate', 'Sd/unitate']) +
        tbl([
          ['Nr. total clădiri', '' + urbanismAnsamblu.nrCladiriTotal],
          ['Suprafață construită totală (ΣSc)', urbanismAnsamblu.totalSc_mp.toLocaleString('ro-RO') + ' m²'],
          ['Suprafață desfășurată totală (ΣSd)', urbanismAnsamblu.totalSd_mp ? urbanismAnsamblu.totalSd_mp.toLocaleString('ro-RO') + ' m²' : '—'],
          ['Suprafață teren (' + esc(urbanismAnsamblu.sursaArieTeren || 'sursă nedeterminată') + ')', urbanismAnsamblu.arieTeren_mp ? urbanismAnsamblu.arieTeren_mp.toLocaleString('ro-RO') + ' m²' : 'nedeterminată (mapează layerul LIMITĂ DE PROPRIETATE sau adaugă adnotări „S.parcelă" în plan)'],
          ['POT ansamblu (ΣSc/Steren)', urbanismAnsamblu.pot_ansamblu_pct != null ? urbanismAnsamblu.pot_ansamblu_pct + '%' : '—'],
          ['CUT ansamblu (ΣSd/Steren)', urbanismAnsamblu.cut_ansamblu != null ? '' + urbanismAnsamblu.cut_ansamblu : '—']
        ], ['Indicator', 'Valoare'])
    }].concat((m5bGrupuri && m5bGrupuri.some(function (g) { return g.cladiri_incluse.length > 1; })) ? [{
      h: 'Compunerea compartimentelor (cuplat/duplex/triplex vs. individual)',
      html: '<p>Fiecare compartiment din 1.4.f de mai sus provine dintr-o componentă conexă geometrică (clădiri ale căror contururi sunt practic alipite, &lt; 0,3 m) — tabelul arată DIN CE clădiri e compus și de ce (arie/volum/conform sunt deja la 1.4.f, nu se repetă aici).</p>' +
        tbl(m5bGrupuri.map(function (g) {
          return [esc(g.id_grup), esc(g.tip.replace(/_/g, ' ')), g.cladiri_incluse.join(', '), esc((g.tratament || '').replace(/_/g, ' '))];
        }), ['Compartiment', 'Tip', 'Clădiri incluse', 'Tratament']) +
        (m5bGrupuri.some(function (g) { return g.tratament === 'COMPARTIMENT_UNIC'; }) ? '<p style="font-size:9pt;color:#666">Grupurile „COMPARTIMENT UNIC" nu au un perete despărțitor cu rezistență la foc declarată în proiect (dacă există, se poate atașa în D._pereti_despartitori_cuplat pentru re-evaluare ca „COMPARTIMENTE DISTINCTE").</p>' : '') +
        (cladiriCuVolum.some(function (c) { return c.avertisment_releveu; }) ? '<p style="font-size:9pt;color:#b45309">ⓘ ' + cladiriCuVolum.filter(function (c) { return c.avertisment_releveu; }).length + ' clădire/clădiri fără releveu încărcat pentru tipul lor — volumul acelor unități rămâne necalculat (nu se presupune Sc×3m); completează releveul per tip în panoul SSI pentru volum real.</p>' : '')
    }] : []) : []).concat([
      { h: '1.4.g. Numărul utilizatorilor, programul și capacitatea de autoevacuare', html: (function () {
        var FUNCTIUNI_PERSOANE_VULNERABILE = { gradinita: 1, 'centru-social': 1, medical: 1 };
        var esteResidential = D.functiune === 'locuinta-individuala' || D.functiune === 'bloc-locuinte';
        var esteVulnerabil = !!FUNCTIUNI_PERSOANE_VULNERABILE[D.functiune];
        if (esteResidential) {
          // Pentru rezidential, "nr. utilizatori" e cel al familiei (nu se normeaza o densitate de
          // persoane ca la functiunile publice) — P118-1/2025 normeaza densitati de persoane pt
          // destinatii cu public (comert/sanatate/invatamant), NU pt rezidential, unde capacitatea
          // reala e data de programul locativ (numarul de dormitoare), nu de o formula pe suprafata.
          var nrUnitati = cladiriPropuse.length || 1;
          var nrDormitoare = (D._camere || []).filter(function (c) { return /dormitor/i.test(c.nume || ''); }).length;
          var persPeUnitate = nrDormitoare ? nrDormitoare * 2 : 4;
          var persEstimate = nrUnitati * persPeUnitate;
          var sursaEstimare = nrDormitoare
            ? nrDormitoare + ' dormitoare declarate în proiect (planul de arhitectură) × 2 persoane/dormitor'
            : '4 persoane/unitate (familie medie, program locativ tipic)';
          return '<p>Pentru destinația rezidențială, P118-1/2025 nu normează o densitate de persoane (specifică funcțiunilor cu public — comerț, sănătate, învățământ); numărul de utilizatori rezultă din programul locativ al fiecărei unități (numărul de dormitoare), nu dintr-o formulă de densitate pe suprafață.</p>' +
            '<p>' + sursaEstimare + ': ' + nrUnitati + ' unități × ' + persPeUnitate + ' persoane = <b>' + persEstimate + ' persoane</b> (ansamblu complet), respectiv ' + persPeUnitate + ' persoane pe unitate individuală.</p>' +
            '<p>Program: locuire permanentă (fără program de lucru/schimburi). Capacitatea de autoevacuare: utilizatorii pot evacua singuri, integral — nu sunt declarate persoane cu capacitate de autoevacuare redusă cu caracter permanent (vezi și 3.5). Timpul teoretic de evacuare rezultă din raportarea lungimii traseului la viteza medie de deplasare (0,4 m/s orizontal).</p>';
        }
        // Alte destinatii (institutionale/publice) — capacitatea reala e fie DECLARATA (autorizatie de
        // functionare/aviz sanitar — cazul uzual pt cresa/centru social), fie normata prin densitati de
        // persoane pe m² specifice destinatiei (P118-1/2025 pct. A.10.2.5.71/A.10.3.10.42) — acestea NU
        // sunt inca extrase in acest motor; nu se presupune formula rezidentiala de 4 pers/unitate, care
        // ar subestima grav capacitatea unei institutii (regula #13 — nu se inventeaza o valoare).
        var capacitateDeclarata = D.capacitate_persoane || D.capacitate_declarata;
        if (capacitateDeclarata) {
          return '<p>Capacitatea maximă simultană declarată pentru proiect (autorizație de funcționare/aviz specific destinației): <b>' + esc(capacitateDeclarata) + ' persoane</b>.</p>' +
            '<p>Program: ' + esc(D.program_functionare || 'de completat conform regulamentului de organizare/funcționare al instituției') + '.</p>' +
            (esteVulnerabil ? '<p>Capacitatea de autoevacuare: parțial/integral redusă (vezi 3.5) — evacuarea se face asistat de personal, cu timpi și fluxuri recalculate pentru acest mod de evacuare, nu pentru evacuare independentă.</p>' : '<p>Capacitatea de autoevacuare: utilizatorii evacuează singuri, cu excepția eventualelor persoane vulnerabile declarate (vezi 3.5).</p>');
        }
        return '<p>Pentru destinația ' + esc(destinatieT42.toLowerCase()) + ', P118-1/2025 normează densități de persoane specifice (pct. A.10.2.5.71/A.10.3.10.42, funcție de destinație) — aceste tabele nu sunt încă extrase în acest motor, nu se presupune formula rezidențială (4 persoane/unitate), care ar subestima capacitatea reală a unei destinații cu public.</p>' +
          '<p><b>Capacitatea maximă simultană de persoane nu este încă completată pentru acest proiect</b> — se preia din autorizația de funcționare/avizul specific destinației (' + (esteVulnerabil ? 'obligatorie la creșe/grădinițe/centre sociale/unități medicale' : 'dacă există o astfel de autorizație') + '), sau se calculează din densitatea normată P118 aplicată ariei utile pe zonă, la faza de proiect tehnic.</p>' +
          (esteVulnerabil ? '<p>Capacitatea de autoevacuare: parțial/integral redusă (vezi 3.5) — evacuarea se face asistat de personal.</p>' : '');
      })() },
      { h: '1.4.h. Capacități de depozitare', html: '<p>' + (D.functiune === 'locuinta-individuala'
        ? 'Nu este cazul — destinația rezidențială nu prevede spații de depozitare cu sarcină termică semnificativă peste mobilierul și bunurile uzuale ale unei locuințe (evaluate la secțiunea 2.1, sarcina termică). Dacă proiectul include o anexă gospodărească/depozit distinct, se declară separat.'
        : 'Dacă destinația (' + esc(destinatieT42.toLowerCase()) + ') include spații de depozitare declarate (materiale/produse specifice activității), se precizează: tipul materialelor, cantitățile, modul de depozitare și clasa de periculozitate. Fără o astfel de declarație explicită în proiect, nu se presupune existența unor astfel de spații.') + '</p>' },
      { h: '2.1. Calculul și încadrarea în nivel de risc', html: (function () {
        function incadrare(q) { return q > 1680 ? 'foarte mare' : q > 840 ? 'mare' : q > 420 ? 'mijlociu' : 'mic'; }
        var camere = D._camere || [];
        var qMax = camere.length ? Math.max.apply(null, camere.map(function (c) { return (c.arie_mp && c.sarcina_termica_mj) ? c.sarcina_termica_mj / c.arie_mp : 0; })) : 0;
        var risc = camere.length ? incadrare(qMax) : (ac.risc_incendiu || 'mic').replace('_', ' ');
        return '<p>Formula de calcul (SR 10903-2:2016, pct. A.10.2.1.2 P118-1/2025): <b>qi = Σ(Gi × Hi × ψi) / A</b> [MJ/m²] — Gi = cantitatea materialului combustibil (kg), Hi = puterea calorică inferioară (MJ/kg, Tabelul 137 Anexa 9.1 P118-1/2025), ψi = coeficient de ardere completă (ψ=1, conservator), A = suprafața încăperii (m²).</p>' +
          '<p>Praguri de încadrare: risc mic q ≤ 420 MJ/m²; risc mijlociu 420–840; risc mare 840–1680; risc foarte mare &gt; 1680. Dacă încăperile cu risc mijlociu+mare însumate depășesc 30% din volumul compartimentului, întregul compartiment se încadrează în risc mare (pct. A.10.2.1.3).</p>' +
          (camere.length
            ? tbl(camere.map(function (c, i) {
              var qi = (c.arie_mp && c.sarcina_termica_mj) ? Math.round(c.sarcina_termica_mj / c.arie_mp) : 0;
              return ['' + (i + 1), esc(c.nume || '—'), (c.arie_mp || 0) + ' m²', Math.round(c.sarcina_termica_mj || 0) + ' MJ', qi + ' MJ/m²', incadrare(qi)];
            }), ['Nr.', 'Încăpere', 'Arie', 'Σ(Gi·Hi·ψi)', 'qi = Σ/A', 'Nivel risc']) +
              '<p style="font-size:9pt;color:#666">Sarcina termică de mai sus reflectă materialul combustibil real declarat pe planul de arhitectură pentru fiecare încăpere (finisaj de pardoseală — parchet lemn: 18,40 MJ/kg conform Tabelul 137; pardoselile ceramice/gresie sunt incombustibile, contribuție 0). Destinația (' + esc(destinatieT42.toLowerCase()) + ') nu presupune, cu caracter permanent, depozitare de materiale periculoase peste mobilierul/finisajele uzuale — încadrarea rezultă atât din calculul de mai sus (' + Math.round(qMax) + ' MJ/m² maxim, sub pragul de ' + (risc === 'mic' ? '420' : risc === 'mijlociu' ? '840' : '1680') + ' MJ/m²), cât și din practica de proiectare pentru această destinație.</p>'
            : '<p>Destinația (' + esc(destinatieT42.toLowerCase()) + ') — mobilier și finisaje uzuale, fără depozitare de materiale periculoase — se încadrează în risc <b>' + esc(risc) + '</b>, conform practicii de proiectare pentru această destinație.</p>') +
          '<p><b>Concluzie: încadrare risc ' + esc(risc) + '</b>' + (camere.length ? ' — calculat din inventarul real de încăperi/finisaje declarate în proiect (' + camere.length + ' încăperi).' : ', conform destinației ' + esc(destinatieT42.toLowerCase()) + '.') + '</p>';
      })() },
      { h: '2.2. Zone cu pericol de explozie (ATEX)', html: '<p>Se stabilește, pentru fiecare încăpere/zonă, dacă există substanțe cu potențial exploziv declarate — absența se confirmă explicit, nu se presupune.</p>' + htmlAtex },
      { h: '3.1. Rezistența și clasa de reacție la foc a celor mai defavorabile elemente de construcție', html:
        '<p>Materialele și produsele pentru construcții se clasifică din punct de vedere al reacției la foc conform SR EN 13501-1, iar elementele de construcție din punct de vedere al rezistenței la foc conform SR EN 13501-2.</p>' +
        '<p>Clasa de reacție la foc (A1–F, cu indicii s/d) nu se calculează și nu este o valoare dată de P118 pentru un material anume — P118 stabilește doar clasa minimă necesară pe tip de element/aplicație. Valoarea reală e o proprietate declarată a produsului, preluată din Declarația de Performanță (DoP), fișa tehnică a producătorului sau certificatul de încercare. Pentru materiale cu variabilitate mare între produse (lemn, PVC, spume, membrane, compozite, pardoseli) nu se presupune o clasă implicită — se atașează DoP-ul produsului concret; scenariul FINAL nu poate fi emis fără această confirmare.</p>' +
        '<p>Golurile tehnologice pentru trecerea instalațiilor prin elementele de compartimentare se etanșează cu sisteme certificate, cu rezistență la foc cel puțin egală cu cea a elementului traversat.</p>' +
        '<p>Pe baza elementului cel mai defavorabil rezultă gradul de stabilitate la incendiu — detaliat la pct. 3.2, cu trimitere consecventă la același grad (grad adoptat/provizoriu în lucrarea de față: <b>' + esc(grad) + '</b>).</p>' +
        '<p><b>▤ Tabel de verificare — Rezistența la foc necesară vs. realizată, pe elemente</b><br><span style="font-size:9pt;color:#666">Etapa 1: necesarul rezultă din gradul de stabilitate adoptat (Tabelul 2/144, P118-1/2025) — extras integral pe text sursă oficial (stâlpi/grinzi/planșee/pereți portanți/pereți de compartimentare/pereți exteriori/șarpante); ușile și etanșările se derivă din rezistența peretelui de compartimentare conform formulei normate (Art. 2.3.2.1.2/2.3.2.2.2.1 P118-1/2025), iar pereții casei scării urmează același rând de pereți de compartimentare. Etapa 2: valoarea realizată provine din certificarea/DoP a elementului efectiv pus în operă — aceasta rămâne mereu specifică proiectului, nu se preia din normativ. Conformitatea cere: realizat ≥ necesar.</span></p>' +
        _tblRezistentaFocElemente(m0, grad, D) +
        '<p style="font-size:9pt;color:#666">Rezistența realizată reflectă intenția de proiectare (dimensionare pentru minimul necesar) până la faza de execuție, când se confirmă prin Declarația de Performanță, fișa tehnică a producătorului sau certificatul de încercare al produsului efectiv pus în operă (completează D._rezistenta_foc_elemente pe măsură ce documentația devine disponibilă).</p>' +
        '<p><b>Materiale — clasa de reacție la foc (SR EN 13501-1), completare la tabelul de mai sus</b></p>' + htmlMateriale },
      { h: '3.2. Gradul de stabilitate la incendiu (' + (m0.regim_tabele === 'EXISTENTA_NEMODIFICATA' ? 'Tabelul 144' : 'Tabelul 2') + ')',
        html: '<p>Gradul de stabilitate <b>adoptat (de proiectare)</b>: ' + esc(grad) + '. ' + m6.acoperire_partiala + ((D._materiale || []).length ? '' : ' Confirmarea definitivă a gradului (prin DoP-urile/certificatele materialelor efectiv puse în operă) se face la recepția lucrării — grad de proiectare, nu grad definitiv as-built.') + '</p>' },
      { h: '3.2. Corelare arie/niveluri (' + (m0.regim_tabele === 'EXISTENTA_NEMODIFICATA' ? 'Tabelele 147/148' : 'Tabelele 41/42') + ')', html: tbl([
        ['Aria construită proiectată', (m5.arie_proiectata_mp || 0) + ' m²'],
        ['Aria maximă admisă (' + esc(m5.norma || '—') + ')', m5.arie_maxima_admisa_mp != null ? m5.arie_maxima_admisa_mp + ' m²' : '—'],
        ['Conform arie', m5.conform === false ? 'NECONFORM' : (m5.conform ? 'DA' : 'nedeterminat')],
        ['Număr niveluri proiectat', (D.niv_supraterane || 1) + ''],
        ['Număr niveluri maxim admis (' + esc(m9niv.norma || '—') + ')', m9niv.nelimitat ? 'nelimitat' : (m9niv.niveluri_max != null ? m9niv.niveluri_max + '' : '—')],
        ['Conform niveluri', m9niv.conform === false ? 'NECONFORM' : (m9niv.nelimitat || m9niv.conform ? 'DA' : 'nedeterminat')]
      ], ['Parametru', 'Valoare']) + verificariM14.filter(function (n) { return n.tip === 'ARIE_COMPARTIMENT_DEPASITA' || n.tip === 'NIVELURI_DEPASITE'; }).map(fmtSolutiiPtNeconformitate).join('') },
      { h: '3.3. Asigurarea limitării propagării incendiilor la vecinătăți (' + (m0.regim_tabele === 'EXISTENTA_NEMODIFICATA' ? 'Tabelul 145' : 'Tabelul 4') + ')',
        html: '<p>Distanțele de siguranță față de construcțiile învecinate au fost determinate prin clasificarea fiecărei vecinătăți (destinație + grad de rezistență + prezența peretelui antifoc) și interogarea tabelului oficial P118-1/2025, NU doar prin măsurarea distanței fizice.</p>' +
          _tblVecinatati(m6b.vecinatati, verificariM14) +
          ((m6b.avertismente || []).length ? (m6b.avertismente || []).map(function (a) { return '<p style="font-size:9pt;color:#b45309"><b>ⓘ</b> ' + esc(a.mesaj) + '</p>'; }).join('') : '') +
          verificariM14.filter(function (n) { return n.tip === 'DISTANTA_VECINATATE_INSUFICIENTA'; }).map(fmtSolutiiPtNeconformitate).join('') }
    ].concat(m6c ? [{
      h: '3.3-bis. Distanțe între clădirile proprii ale ansamblului (' + (m0.regim_tabele === 'EXISTENTA_NEMODIFICATA' ? 'Tabelul 145' : 'Tabelul 4') + ')',
      html: (function () {
        var alipite = m6c.perechi.filter(function (p) { return p.alipite; });
        var neconforme = m6c.perechi.filter(function (p) { return p.conforma === false; });
        var conformeSample = m6c.perechi.filter(function (p) { return p.conforma === true; }).slice(0, 15);
        function rand(p) { return [p.a + ' ↔ ' + p.b, p.distanta_necesara_m != null ? p.distanta_necesara_m + ' m' : '—', p.distanta_reala_m != null ? p.distanta_reala_m + ' m' : 'nedeterminată', p.alipite ? 'ALIPITE — vezi perete antifoc' : (p.eroare ? 'DE VERIFICAT MANUAL' : (p.conforma ? 'DA' : 'NU'))]; }
        var out = '<p>Tabelul 4/145 se aplică între ORICE două construcții/compartimente de incendiu, indiferent dacă aparțin aceluiași beneficiar — nu doar față de vecinătăți externe. Distanțele reale de mai jos sunt distanțe minime muchie-la-muchie, calculate din geometria reală extrasă din DXF (nu din centroizi), pentru toate cele ' + m6c.perechi.length + ' perechi posibile.</p>';
        if (alipite.length) out += '<p><b>' + alipite.length + ' pereche/perechi de clădiri practic alipite</b> (contur la contur &lt; 0,3 m — posibil duplex/cuplare cu perete comun; tipologia NU rezultă din etichetă, e dedusă geometric). Pentru acestea nu se verifică distanța minimă, ci prezența și rezistența la foc a peretelui antifoc despărțitor:</p>' + tbl(alipite.map(rand), ['Pereche clădiri', 'Distanță necesară', 'Distanță reală', 'Stare']);
        if (neconforme.length) out += '<p style="color:#dc2626"><b>' + neconforme.length + ' pereche/perechi neconforme</b> (distanță reală sub minimul normat) — vezi măsurile compensatorii posibile la secțiunea 5:</p>' + tbl(neconforme.map(rand), ['Pereche clădiri', 'Distanță necesară', 'Distanță reală', 'Stare']);
        else out += '<p style="color:#16a34a">Nicio pereche de clădiri (altele decât cele alipite de mai sus) nu este neconformă — toate distanțele reale depășesc minimul normat.</p>';
        if (conformeSample.length) out += '<p style="font-size:9pt;color:#666">Eșantion din perechile conforme (' + conformeSample.length + ' din ' + m6c.perechi.filter(function (p) { return p.conforma === true; }).length + '):</p>' + tbl(conformeSample.map(rand), ['Pereche clădiri', 'Distanță necesară', 'Distanță reală', 'Stare']);
        return out;
      })()
    }] : []).concat([
      { h: '3.4.a. Măsuri pentru asigurarea controlului fumului', html: '<p>' + (ac.desfumare_oblig
        ? 'Configurația/destinația proiectului impune desfumare mecanică (spații fără fațadă exterioară directă, subsoluri, arii mari) — nu se acceptă tirajul natural ca soluție suficientă; vezi secțiunea 4.9 pentru instalația de desfumare.'
        : (D.functiune === 'locuinta-individuala'
          ? 'Pentru o locuință unifamilială cu regim redus (' + esc(D.regim || 'P+1E') + '), fiecare încăpere are fereastră spre exterior — controlul fumului se asigură prin <b>tiraj natural</b> (ferestre/uși practicabile), suficient conform configurației proiectului. Nu este necesară desfumare mecanică.'
          : 'Configurația/destinația proiectului nu impune desfumare mecanică (fiecare încăpere/circulație comună are fațadă exterioară directă) — controlul fumului se asigură prin <b>tiraj natural</b> (ferestre/uși practicabile), de confirmat conform configurației reale a proiectului.')) + '</p>' },
      { h: '3.4.b. Tipul scărilor, forma și modul de dispunere a treptelor', html: (function () {
        var esteResidentialIndivRedus = D.functiune === 'locuinta-individuala' && (+D.niv_supraterane || 1) <= 2;
        var baza = 'Scară interioară' + (cladiriPropuse.length > 1 ? ' (per unitate)' : '') + ', cu rampă dreaptă sau în două rampe cu podest intermediar, conform proiectului de arhitectură — verificare Blondel (2h+l între 62–64 cm) și lățime utilă minimă pentru evacuare, aplicată la faza de proiect de arhitectură (releveu/plan). ';
        return '<p>' + baza + (esteResidentialIndivRedus
          ? 'Pentru o locuință unifamilială cu regim redus (' + esc(D.regim || 'P+1E') + '), o singură scară interioară e suficientă și admisă normativ (nu se cere scară de evacuare exterioară separată).'
          : 'Numărul de căi de evacuare distincte (una sau mai multe scări) se stabilește funcție de regimul de înălțime, aria/ocupanța compartimentului și, dacă e cazul, prezența persoanelor cu capacitate de autoevacuare redusă (vezi 3.5) — nu se presupune o singură scară suficientă fără verificarea explicită a acestor praguri la faza de proiect tehnic.') + '</p>';
      })() },
      { h: '3.4.c. Geometria căilor de evacuare', html: (function () {
        var FUNCTIUNI_PERSOANE_VULNERABILE = { gradinita: 1, 'centru-social': 1, medical: 1 };
        var areVulnerabili = !!FUNCTIUNI_PERSOANE_VULNERABILE[D.functiune] || (D._persoane_vulnerabile && D._persoane_vulnerabile.length);
        var esteResidentialIndiv = D.functiune === 'locuinta-individuala';
        var arieRef = m5bGrupuri ? 'vezi ariile per compartiment la 1.4.f' : ((m5.arie_proiectata_mp || D.Sc || '—') + ' m²');
        var refugii = areVulnerabili
          ? '<b>Sunt necesare refugii per nivel</b> — proiectul are/poate avea persoane cu capacitate de autoevacuare redusă cu caracter permanent (vezi 3.5); amplasarea și dimensionarea refugiilor se stabilesc la faza de proiect tehnic, conform normativelor specifice categoriei (NP 051/2012, OMS 1955/1995 etc.).'
          : 'Nu sunt necesare refugii — nu sunt declarate persoane cu capacitate de autoevacuare redusă cu caracter permanent (vezi 3.5).';
        return '<p>Distanța maximă de evacuare admisă: <b>' + (ac.dist_evacuare_2sensuri || 35) + ' m</b> (traseu cu 2 sensuri posibile) / <b>' + (ac.dist_evacuare_fundsac || 15) + ' m</b> (traseu fund de sac), conform P118-1/2025.</p>' +
          '<p>' + (esteResidentialIndiv
            ? 'Pentru o locuință unifamilială, traseul real (de la orice punct al unei camere până la ușa de ieșire din locuință) e cu mult sub aceste praguri, dat fiind aria redusă a compartimentului (' + arieRef + ').'
            : 'Traseul real de evacuare (de la punctul cel mai defavorabil până la ieșirea din compartiment) se verifică față de pragurile de mai sus, pe baza ariei/configurației compartimentului (' + arieRef + ').') + ' ' + refugii + '</p>';
      })() },
      { h: '3.4.d. Numărul fluxurilor de evacuare', html: (function () {
        var modul = ac.flux_evacuare_m || 0.60;
        var esteResidential = D.functiune === 'locuinta-individuala' || D.functiune === 'bloc-locuinte';
        var nrUnitatiFlux = cladiriPropuse.length || 1;
        var rowLabel, Nper, sursaN;
        if (esteResidential) {
          var nrDormitoare = (D._camere || []).filter(function (c) { return /dormitor/i.test(c.nume || ''); }).length;
          Nper = nrDormitoare ? nrDormitoare * 2 : 4;
          rowLabel = 'Locuință (per unitate)';
          sursaN = (nrDormitoare ? nrDormitoare + ' dormitoare × 2 pers.' : 'ipoteză 4 pers./unitate') + ' — vezi 1.4.g';
        } else {
          var capacitateDeclarata = D.capacitate_persoane || D.capacitate_declarata;
          Nper = capacitateDeclarata || null;
          rowLabel = destinatieT42;
          sursaN = capacitateDeclarata ? 'capacitate declarată — vezi 1.4.g' : 'nedeterminat — vezi 1.4.g (capacitate neconfirmată)';
        }
        var cap = G.SSI_NORMATIVE_ENGINE.getCapacitateFluxEvacuare({ tip_lucrare: m0.regim_tabele, destinatie: destinatieT42 });
        var out = '<p>Formula: <b>F = N / C</b>, rotunjit la numărul întreg superior — N = numărul de persoane care evacuează prin calea respectivă (vezi 1.4.g), C = capacitatea unui flux de evacuare.</p>' +
          '<p><b>▤ Tabel de calcul — Fluxuri de evacuare</b></p>';
        var NperTxt = Nper != null ? Nper + ' (' + sursaN + ')' : sursaN;
        if (cap.aplicabil && cap.disponibil && Nper != null) {
          var C = cap.rand.capacitate_flux_persoane;
          var F = Math.ceil(Nper / C);
          out += tbl([[rowLabel, NperTxt, C + ' persoane (' + cap.norma + ')', '' + F, 'lățime utilă din proiect ≥ ' + modul + ' m (de verificat pe releveu)', F <= 1 ? 'DA (o singură cale/scară e suficientă)' : 'necesită ' + F + ' fluxuri — verifică lățimea totală a căilor']],
            ['Nivel/Zonă evacuare', 'Nr. persoane N', 'Capacitate flux C (Tabelul 150)', 'Fluxuri necesare F=N/C', 'Fluxuri asigurate (proiect)', 'Conform']);
        } else {
          out += tbl([[rowLabel, NperTxt, cap.aplicabil ? 'nu se aplică (' + cap.motiv + ')' : 'nu se aplică (' + cap.motiv + ')', 'nedeterminat', 'modul de trecere ≥ ' + modul + ' m (uși/scară din proiect)', '—']],
            ['Nivel/Zonă evacuare', 'Nr. persoane N', 'Capacitate flux C', 'Fluxuri necesare F=N/C', 'Fluxuri asigurate (proiect)', 'Conform']);
          out += '<p style="font-size:9pt;color:#666">' + cap.motiv + (esteResidential
            ? ' Verificarea aplicată aici: lățimea utilă a căilor/ușilor de evacuare din proiect comparată cu modulul de trecere normat — pentru o locuință unifamilială cu ~4 persoane/unitate, o ușă/scară cu lățime utilă ≥ 0,90–1,00 m (peste modulul de ' + modul + ' m) este suficientă pentru un singur flux, ceea ce corespunde ocupanței reduse tipice rezidențiale.'
            : ' Verificarea F=N/C rămâne incompletă până la confirmarea capacității reale de utilizatori (1.4.g); comparația pe lățime utilă a căilor rămâne disponibilă ca verificare intermediară.') + '</p>';
        }
        out += (cladiriPropuse.length > 1 && esteResidential ? '<p style="font-size:9pt;color:#666">Verificarea de mai sus se aplică identic fiecărei unități a ansamblului (fluxul de evacuare e per compartiment/unitate, nu însumat pe ansamblu) — fiecare unitate evacuează independent, prin propriile căi.</p>' : '');
        return out;
      })() },
      { h: '3.5. Măsuri pentru accesul și evacuarea copiilor, persoanelor cu dizabilități, bolnavilor și altor categorii care nu se pot evacua singure', html: (function () {
        // Extindere multi-functiune (Florin, 12 iul): pt destinatiile care AU institutional persoane
        // vulnerabile (cresa/gradinita, centru social, medical), nu se mai asteapta ca utilizatorul sa
        // declare manual D._persoane_vulnerabile — categoria rezulta direct din functiune, prezenta lor
        // fiind permanenta si structurala, nu optionala.
        var AUTO_VULNERABIL = {
          gradinita: 'copii de vârstă preșcolară/școlară mică (creșă/grădiniță) — categorie cu caracter instituțional permanent',
          'centru-social': 'persoane vârstnice și/sau cu dizabilități (centru social) — categorie cu caracter instituțional permanent',
          medical: 'bolnavi/pacienți cu mobilitate redusă (unitate medicală) — categorie cu caracter instituțional permanent'
        };
        var declarate = (D._persoane_vulnerabile || []).slice();
        if (AUTO_VULNERABIL[D.functiune] && declarate.indexOf(AUTO_VULNERABIL[D.functiune]) < 0) declarate.push(AUTO_VULNERABIL[D.functiune]);
        if (declarate.length) {
          return '<p>Proiectul are categorii de utilizatori cu capacitate de autoevacuare redusă: ' + declarate.map(function (p) { return esc(p); }).join(', ') + ' — se aplică prevederile normativelor specifice acelei categorii (ex. NP 051/2012 pentru persoane cu dizabilități, Legea 448/2006, OMS 1955/1995 pentru creșe/grădinițe), cu evacuare asistată și, unde e cazul, refugii per nivel. Capacitatea de autoevacuare, timpii și fluxurile de evacuare (pct. 3.4) trebuie recalculate pentru evacuare <b>asistată</b> (personal însoțitor), nu independentă.</p>';
        }
        var esteResidential = D.functiune === 'locuinta-individuala' || D.functiune === 'bloc-locuinte';
        return '<p>' + (esteResidential
          ? 'Destinația proiectului (locuință) nu presupune, cu caracter permanent/instituțional, prezența unor categorii vulnerabile (creșă, cămin de bătrâni etc.). Capacitatea de autoevacuare a utilizatorilor e generală (locatarii evacuează independent) — dacă la un moment dat locuința găzduiește membri cu mobilitate redusă (vârstnici, persoane cu dizabilități temporare), regulile uzuale de proiectare (fără praguri, lățimi de trecere adecvate) rămân aplicabile, fără a constitui o cerință normativă suplimentară de refugii.'
          : 'Destinația proiectului (' + esc(destinatieT42.toLowerCase()) + ') nu are, cu caracter permanent/instituțional, categorii de utilizatori incapabili să se evacueze singuri — dacă proiectul prevede totuși spații/activități cu asemenea utilizatori (declarate în D._persoane_vulnerabile), se aplică prevederile normativelor specifice acelei categorii.') + '</p>';
      })() },
      { h: '3.6.a. Amenajări pentru accesul forțelor de intervenție', html: '<p>Acces carosabil pentru autospeciale conform pct. A.10.3.7.2 P118-1/2025 — min. o fațadă a fiecărei clădiri/unități accesibilă direct din drumul public sau din aleile carosabile ale ansamblului. Ascensoare de incendiu: nu este cazul (regim de înălțime ' + esc(D.regim || 'P+1E') + ', sub pragul care le-ar impune — de regulă clădiri înalte/foarte înalte).</p>' },
      { h: '3.6.b. Caracteristici tehnice și funcționale ale acceselor carosabile și ale căilor de intervenție ale autospecialelor', html:
        tbl([
          ['Numărul și amplasarea acceselor', cladiriPropuse.length > 1 ? 'câte un acces carosabil la fiecare din cele ' + cladiriPropuse.length + ' unități, prin aleile carosabile ale ansamblului (vezi planul de situație)' : 'un acces carosabil, dinspre drumul public adiacent (vezi planul de situație)'],
          ['Dimensiuni/gabarite ale căilor de acces', D._latime_carosabil_incinta ? D._latime_carosabil_incinta + ' m lățime utilă (declarat de proiectant)' : 'proiectat pentru accesul autospecialelor de intervenție (lățime utilă normată P118-1/2025) — dimensiunea exactă rezultă din proiectul de sistematizare a incintei'],
          ['Trasee de alertare/deplasare a autospecialelor de la cel mai apropiat detașament ISU', D._detasament_isu ? esc(D._detasament_isu.nume || '—') + (D._detasament_isu.distanta_km != null ? ', ' + D._detasament_isu.distanta_km + ' km' : '') + (D._detasament_isu.timp_min != null ? ', ~' + D._detasament_isu.timp_min + ' min' : '') : 'se confirmă cu ISU județean la depunerea documentației (denumire detașament, distanță, timp estimat de intervenție) — pas administrativ standard, nu ține de proiectare'],
          ['Marcaje și indicatoare de circulație', 'conform reglementărilor aplicabile (STAS 1848, semnalizare rutieră) — se detaliază la faza de proiect de sistematizare a incintei']
        ], ['Caracteristică', 'Valoare']) },
      { h: '3.6.c. Ascensoare de pompieri', html: '<p>Nu este cazul — regimul de înălțime redus (' + esc(D.regim || 'P+1E') + ') nu impune ascensor de intervenție (cerință specifică clădirilor înalte/foarte înalte, H≥28/45m).</p>' },
      { h: '4.1. Hidranți de incendiu interiori', html: '<p>Necesitatea echipării se stabilește conform art. 4.1 din P118/2-2013, comparând destinația/aria/volumul real cu pragurile normativului. Concluzie: <b>' + (ac.hidranti_int_oblig ? 'ECHIPARE NECESARĂ' : 'NU ESTE NECESARĂ') + '</b>' + (ac.hidranti_int_oblig ? ', motivat prin depășirea pragului aplicabil destinației (' + esc(destinatieT42.toLowerCase()) + ').' : (D.functiune === 'locuinta-individuala' ? ' — pentru o locuință unifamilială cu arie/volum redus, valoarea reală a proiectului nu atinge pragul de echipare obligatorie prevăzut pentru destinația rezidențială.' : ', valoarea reală a proiectului (volum/arie desfășurată) nu atinge pragul de echipare obligatorie prevăzut pentru destinația ' + esc(destinatieT42.toLowerCase()) + '.')) + '</p>' +
        _tblCampuriInstalatie(ac.hidranti_int_oblig, 'hidranti_int', [
          { cheie: 'tip', eticheta: 'Tipul instalației (apă-apă, aer-aer)' }, { cheie: 'volum_mc', eticheta: 'Volumul construcției/compartimentului de incendiu (m³)' },
          { cheie: 'jeturi_simultane', eticheta: 'Număr de jeturi în funcțiune simultană' }, { cheie: 'timp_functionare', eticheta: 'Timp teoretic de funcționare' },
          { cheie: 'jeturi_pe_punct', eticheta: 'Număr de jeturi pe punct' }, { cheie: 'debit_calcul', eticheta: 'Debit de calcul (l/s)' },
          { cheie: 'presiune', eticheta: 'Presiune (bar)' }, { cheie: 'racorduri_exterioare', eticheta: 'Număr de racorduri exterioare' },
          { cheie: 'sursa_apa', eticheta: 'Sursa de alimentare cu apă, cu volumul rezervei' }, { cheie: 'grup_pompare', eticheta: 'Caracteristici funcționale ale grupului de pompare' }
        ], D) },
      { h: '4.2. Hidranți de incendiu exteriori', html: '<p>Necesitatea echipării se stabilește conform P118/2-2013, funcție de destinația/aria/volumul/categoria reale. Concluzie: <b>' + (ac.hidranti_ext_oblig ? 'NECESARĂ' : 'NU ESTE NECESARĂ') + '</b>, motivat prin comparație cu pragul aplicabil destinației ' + esc(destinatieT42.toLowerCase()) + '.</p>' +
        _tblCampuriInstalatie(ac.hidranti_ext_oblig, 'hidranti_ext', [
          { cheie: 'distante', eticheta: 'Distanțele față de construcție' }, { cheie: 'volum_mc', eticheta: 'Volumul compartimentului de incendiu (m³)' },
          { cheie: 'timp_functionare', eticheta: 'Timp teoretic de funcționare' }, { cheie: 'debit_calcul', eticheta: 'Debit de calcul (l/s)' },
          { cheie: 'presiune', eticheta: 'Presiune (bar)' }, { cheie: 'sursa_apa', eticheta: 'Sursa de alimentare cu apă, cu volumul rezervei' },
          { cheie: 'grup_pompare', eticheta: 'Caracteristici funcționale ale grupului de pompare' }
        ], D) },
      { h: '4.3. Instalații automate de stingere cu sprinklere', html: '<p>Necesitatea echipării se stabilește conform cap. 7 din P118/2-2013, funcție de destinație, categorie de importanță, arie desfășurată, volum și regim de înălțime reale. Concluzie: <b>' + (ac.sprinklere_oblig ? 'OBLIGATORII (Sc&gt;3.000 m² / H&gt;28m)' : 'NU ESTE NECESARĂ') + '</b>.</p>' +
        _tblCampuriInstalatie(ac.sprinklere_oblig, 'sprinklere', [
          { cheie: 'solutie_tehnica', eticheta: 'Soluția tehnică de realizare (umedă/uscată/preacționată, SR EN 12845)' }, { cheie: 'clasa_pericol', eticheta: 'Clasa de pericol de incendiu (LH/OH1/OH2/HHP)' },
          { cheie: 'categorie_depozitare', eticheta: 'Categoria de depozitare și modul de depozitare' }, { cheie: 'arie_max_sprinkler', eticheta: 'Aria maximă acoperită de un sprinkler (m²)' },
          { cheie: 'densitate_calcul', eticheta: 'Densitatea de calcul (l/min/m²)' }, { cheie: 'arie_declansare', eticheta: 'Aria de declanșare simultană (m²)' },
          { cheie: 'presiune', eticheta: 'Presiune (bar)' }, { cheie: 'sursa_apa', eticheta: 'Sursa de alimentare cu apă a instalației' },
          { cheie: 'volum_rezerva', eticheta: 'Volumul rezervei de apă (m³)' }, { cheie: 'racorduri_exterioare', eticheta: 'Numărul de racorduri exterioare' }
        ], D) },
      { h: '4.4. Instalații de limitare/stingere cu sprinklere deschise', html: '<p>' + (D.functiune === 'locuinta-individuala'
        ? 'Nu este cazul — nu există goluri mari (cortine de apă) în configurația unei locuințe unifamiliale.'
        : 'Necesară doar dacă proiectul prevede goluri mari protejate prin cortine de apă (atriumuri, comunicări mari între compartimente) — de verificat conform configurației reale a proiectului; altfel, nu este cazul.') + '</p>' },
      { h: '4.5. Instalații de stingere cu apă pulverizată', html: '<p>' + (D.functiune === 'locuinta-individuala'
        ? 'Nu este cazul — nu aplicabil configurației unei locuințe unifamiliale.'
        : 'Necesară doar pentru echipamente/instalații tehnologice specifice cu risc de incendiu ridicat (transformatoare, rezervoare de combustibil/gaz) — de verificat conform configurației reale a proiectului; altfel, nu este cazul.') + '</p>' },
      { h: '4.6. Instalații de stingere cu ceață de apă', html: '<p>' + (D.functiune === 'locuinta-individuala'
        ? 'Nu este cazul — nu aplicabil configurației unei locuințe unifamiliale.'
        : 'Necesară doar pentru spații tehnice/echipamente unde apa pulverizată clasică nu e adecvată (săli de cabluri, arhive, spații cu echipamente sensibile) — de verificat conform configurației reale a proiectului; altfel, nu este cazul.') + '</p>' },
      { h: '4.7. Instalații de stingere cu gaze inerte', html: '<p>' + (D.functiune === 'locuinta-individuala'
        ? 'Nu este cazul — nu există spații tehnice cu echipamente electrice/electronice sensibile care să impună acest tip de stingere la o locuință unifamilială.'
        : 'Necesară doar pentru spații tehnice cu echipamente electrice/electronice sensibile (centre de date, tablouri electrice de importanță majoră) — de verificat conform configurației reale a proiectului; altfel, nu este cazul.') + '</p>' },
      { h: '4.8. Instalații de detectare, semnalizare și alarmare (IDSAI)', html: (function () {
        var FUNCTIUNI_PERSOANE_VULNERABILE = { gradinita: 1, 'centru-social': 1, medical: 1 };
        var concluzie, detaliu;
        if (ac.idsi_oblig && FUNCTIUNI_PERSOANE_VULNERABILE[D.functiune]) {
          concluzie = 'OBLIGATORIE'; detaliu = 'destinație cu persoane vulnerabile — detectare timpurie necesară pentru evacuare asistată, indiferent de arie.';
        } else if (ac.idsi_oblig) {
          concluzie = 'OBLIGATORIE'; detaliu = 'pragul de arie (Sc&gt;2.500 m²) este depășit.';
        } else if (D.functiune === 'locuinta-individuala') {
          concluzie = 'NU ESTE OBLIGATORIE'; detaliu = 'pentru destinația și aria rezidențială a proiectului. Recomandare (nu obligație normativă): detectoare autonome de fum (SR EN 14604) pe holuri/dormitoare, uzuale la orice locuință modernă.';
        } else {
          concluzie = 'NU ESTE OBLIGATORIE'; detaliu = 'pentru destinația (' + esc(destinatieT42.toLowerCase()) + ') și aria reală ale proiectului.';
        }
        return '<p>Necesitatea echipării se stabilește conform P118-3/2015 (cu modificările Ord. 6025/2018), funcție de destinație/capacitate/arie reale — pragurile diferă semnificativ pe destinații. Concluzie: <b>' + concluzie + '</b>, ' + detaliu + '</p>';
      })() +
        _tblCampuriInstalatie(ac.idsi_oblig, 'idsai', [
          { cheie: 'grad_acoperire', eticheta: 'Gradul de acoperire (total/parțial, cu zonele acoperite)' }, { cheie: 'conditii_zona_detectare', eticheta: 'Condiții privind stabilirea zonei de detectare' },
          { cheie: 'conditii_ecs', eticheta: 'Condiții de amplasare a echipamentului de control și semnalizare (e.c.s.)' }, { cheie: 'dispozitive_comandate', eticheta: 'Alte dispozitive comandate sau supravegheate de e.c.s.' }
        ], D) },
      { h: '4.9. Instalație de desfumare/evacuare fum și gaze fierbinți', html: '<p>' + (ac.desfumare_oblig ? 'Necesară conform configurației declarate la 3.4.a — metodă, spații desfumate și debite se stabilesc la faza de proiect tehnic.' : 'Nu este cazul, motivat la pct. 3.4.a — control fum prin tiraj natural, suficient pentru configurația proiectului.') + '</p>' },
      { h: '4.10. Instalație electrică cu rol în securitatea la incendiu', html: '<p>Sursă de bază: branșament electric. Iluminat de siguranță (evacuare/antipanic): se proiectează conform I7 și SR EN 1838/SR EN 50172 dacă configurația/aria o impune (de regulă necesar la spații fără lumină naturală suficientă pe traseul de evacuare' + (D.functiune === 'locuinta-individuala' ? ' — la o locuință unifamilială cu ferestre pe tot traseul, poate fi „nu este cazul", de confirmat la proiectul electric' : ' — de verificat conform configurației reale a căilor de evacuare ale proiectului') + '). Dispozitiv de protecție cu curent diferențial rezidual (DDR/RCD ≤300mA) — obligatoriu la tabloul general, conform I7.</p>' },
      { h: '4.11. Instalație de protecție împotriva trăsnetului', html: '<p>Necesitatea IPT/SPT se stabilește pe baza evaluării de risc conform normativului specific, funcție de amplasament, regim de înălțime și destinație. Concluzie: <b>' + (ac.paratraznet_oblig ? 'NECESARĂ' : 'de evaluat la faza de proiect tehnic') + '</b> — pentru destinația și regimul de înălțime ale acestui proiect (' + esc(destinatieT42.toLowerCase()) + ', ' + esc(D.regim || '—') + '), evaluarea de risc rămâne responsabilitatea proiectantului de instalații electrice; nu se presupune implicit nici necesară, nici inexistentă.</p>' +
        _tblCampuriInstalatie(ac.paratraznet_oblig, 'ipt', [
          { cheie: 'clasa_ipt_spt', eticheta: 'Clasa IPT și SPT (din evaluarea de risc)' }, { cheie: 'nivel_protectie', eticheta: 'Nivel de protecție (I–IV)' },
          { cheie: 'metoda_protectie', eticheta: 'Metoda de protecție (tijă/plasă/conductoare captare)' }
        ], D) },
      { h: '▤ Tabel de verificare — praguri instalații PSI (P118/2-2013, P118-3/2015)', html:
        '<p>Pragurile provin din pragurile deja aplicate de motorul de calcul al platformei (aceleași valori care produc concluziile DA/NU de la 4.1–4.11 de mai sus) — se compară explicit cu valoarea reală a proiectului pentru fiecare instalație, nu doar concluzia finală.</p>' +
        _tblPraguriInstalatii(D, ac, m5) },
      { h: '5. Măsuri compensatorii / corecții de proiect', html:
        '<p>Tabelul de mai jos distinge explicit între cerințe care necesită <b>corectare directă</b> a proiectului (nu au alternativă legală documentată) și cele pentru care există o <b>măsură compensatorie posibilă</b> (selecția rămâne a proiectantului atestat, nu se aplică automat).</p>' +
        _tblNeconformitatiV41(fiseNeconformitate) + '<p style="font-size:9pt;color:#666">Soluțiile compensatorii candidate detaliate (efect calculat + recalcul necesar) apar la secțiunile 3.2/3.3 de mai sus, imediat lângă cerința vizată.</p>' +
        (fiseNeconformitate.length ? '<p style="font-size:9pt;color:#666">Trasabilitate: fiecare soluție compensatorie aleasă se înregistrează cu nume + nr. atestat proiectant + dată (Ord. MAI 180/2022, Anexa 5, pct. 5). Orice corecție de proiect necesită reimport DWG + recalculul integral al cascadei M0-M17 (o modificare geometrică poate afecta și alte verificări).</p>' : '') },
      { h: 'Anexă — stadiul documentului (DRAFT vs. FINAL pentru depunere)', html:
        (statusNevalidat.length
          ? (D._normative_confirmate_de_proiectant
            ? '<p><b>Surse normative:</b> ' + statusNevalidat.length + ' tabel/tabele (' + statusNevalidat.map(function (s) { return esc(s.id); }).join(', ') + ') nu au status „validat" instituțional, dar proiectantul a confirmat verificarea personală pe textul oficial (M.Of. 204 bis/2025) și își asumă răspunderea profesională pentru acest export.</p>'
            : '<p><b>Surse normative:</b> următoarele tabele nu au încă status „validat" de un inginer/arhitect atestat (extragere confirmată pe text oficial, dar fără semnătura de răspundere profesională cerută de Ord. MAI 180/2022): ' + statusNevalidat.map(function (s) { return esc(s.id); }).join(', ') + '.</p>')
          : '<p>Toate tabelele normative folosite au status validat.</p>') +
        (vecinatatiNeconfirmate.length ? '<p><b>Vecinătăți:</b> ' + vecinatatiNeconfirmate.length + ' vecinătate/vecinătăți (' + vecinatatiNeconfirmate.map(function (v) { return esc(v.id); }).join(', ') + ') au clasificare estimată conservator (grad V, risc mare), neconfirmată de proiectant.</p>' : '<p>Toate vecinătățile au clasificarea confirmată de proiectant.</p>') +
        ((vecinatatiNeconfirmate.length || (statusNevalidat.length && !D._normative_confirmate_de_proiectant)) ? '<p><b>Document DRAFT</b> — complet utilizabil pentru analiza de proiect chiar acum; necesită confirmarea/validarea de mai sus înainte de a fi exportat ca FINAL pentru depunerea la ISU (analiza nu așteaptă această confirmare ca să funcționeze, doar depunerea oficială o cere — aceeași responsabilitate profesională pe care ai avea-o și fără platformă).</p>' : '<p><b>Document FINAL</b> — toate vecinătățile sunt confirmate' + (statusNevalidat.length ? ' și sursele normative sunt asumate pe răspunderea profesională a proiectantului' : ' și sursele normative au status validat') + '.</p>') }
    ])));
    return { cat: 'Memorii Tehnice', file: 'Scenariu_securitate_incendiu_P118.doc', html: docHtml(_meta(D, 'SCENARIU DE SECURITATE LA INCENDIU', 'Ord. MAI 180/2022, Anexa 5 · ' + m0.label), secs, { tabelar: true }) };
  }

  var DOC_BUILDERS = {
    'Memoriu general DTAC': function (D, v) {
      var fn = (G.UXDoc.FUNCTIUNI[D.functiune] || {}).label || D.functiune;
      var deep = _lib(D, 'general');
      var secs = deep ? _withProgram([
        { h: null, html: deep },
        { h: 'Indicatori urbanistici ai proiectului', html: _indicatoriTbl(D, v) },
        { h: 'Bilanț de suprafețe și standard specific funcțiunii', html: '<p>Suprafețele utilă/construită/desfășurată și standardul de măsurare specific funcțiunii (ex. BOMA la birouri, GLA la comercial):</p>' + _ariiStandardTbl(D, v) },
        { h: 'Parametri tehnici derivați (sinteză structură · seism · climă · incendiu)', html: '<p>Valorile de mai jos sunt derivate automat din funcțiune, amplasament (județ), sistemul structural și indicatorii geometrici, conform normativelor în vigoare. Ele fundamentează proiectarea pe toate specialitățile și se preiau în piesele scrise și desenate.</p>' + _parametriDerivatiTbl(D, v) },
        { h: 'Verificarea conformității urbanistice', html: _verificariTbl(v) + (v.neconformitati ? '<p><b>Atenție:</b> există ' + v.neconformitati + ' neconformitate(ăți) de rezolvat înainte de depunere.</p>' : '<p>Nu s-au identificat neconformități critice.</p>') }
      ], D, v) : (G.UXParagrafe ? G.UXParagrafe.general(D, v).concat([{ h: 'Parametri tehnici derivați (sinteză)', html: _parametriDerivatiTbl(D, v) }, { h: 'Verificarea conformității urbanistice', html: _verificariTbl(v) + (v.neconformitati ? '<p><b>Atenție:</b> există ' + v.neconformitati + ' neconformitate(ăți) de rezolvat înainte de depunere.</p>' : '<p>Nu s-au identificat neconformități critice.</p>') }]) : [
        { h: '1. Date de identificare', html: '<p>Autorizarea obiectivului „' + esc(fn) + '", ' + esc(D.uat || '—') + '.</p>' }, { h: '2. Indicatori', html: _indicatoriTbl(D, v) }
      ]);
      return { cat: 'Memorii Tehnice', file: 'Memoriu_general_DTAC.doc', html: docHtml(_meta(D, 'MEMORIU TEHNIC GENERAL', 'Documentație tehnică pentru autorizarea executării lucrărilor de construire (DTAC)'), secs) };
    },
    'Memoriu arhitectură': function (D, v) {
      var deep = _lib(D, 'arhitectura'); if (deep && (D.faza === 'PTh' || D.faza === 'PTh+DE' || D.faza === 'PT')) deep += _lib(D, 'arh_pth');
      var secs = deep ? _withProgram([
        { h: null, html: deep },
        { h: 'Anexă — indicatori și date specifice proiectului', html: _indicatoriTbl(D, v) + _ariiStandardTbl(D, v) + '<p>Vecinătăți: N — ' + esc(D.vecin_N || 'de precizat') + ', S — ' + esc(D.vecin_S || 'de precizat') + ', E — ' + esc(D.vecin_E || 'de precizat') + ', V — ' + esc(D.vecin_V || 'de precizat') + '. Retrageri propuse: aliniament ' + esc(D.retragere_fata || '—') + ' m, lateral ' + esc(D.retragere_lateral || '—') + ' m, posterior ' + esc(D.retragere_spate || '—') + ' m.</p>' }
      ], D, v) : (G.UXParagrafe ? G.UXParagrafe.arhitectura(D, v) : [
        { h: '1. Situația existentă', html: '<p>Terenul în suprafață de ' + esc(D.Steren || '—') + ' mp, situat în ' + esc(D.uat || '—') + '.</p>' }
      ]);
      return { cat: 'Memorii Tehnice', file: 'Memoriu_arhitectura.doc', html: docHtml(_meta(D, 'MEMORIU TEHNIC DE ARHITECTURĂ'), secs) };
    },
    'Memoriu rezistență': function (D, v) {
      var deep = _lib(D, 'structura'); if (deep && (D.faza === 'PTh' || D.faza === 'PTh+DE' || D.faza === 'PT')) deep += _lib(D, 'str_pth');
      var secs = deep ? _withProgram([
        { h: null, html: deep },
        { h: 'Anexă — parametri de calcul ai amplasamentului', html: tbl([['Sistem structural', esc(D.struct || 'metalică')], ['Fundare', esc(D.fundare || 'după studiul geotehnic')], ['Categorie de importanță (HG 766/1997)', esc(v.calc.categorie_importanta || '—')], ['Clasă de importanță seismică (P100-1)', esc(v.calc.clasa_importanta || '—') + ', γI = ' + (v.calc.gamma_I != null ? v.calc.gamma_I.toFixed(2) : '1.00')], ['Factor de comportare q', (v.calc.factor_q != null ? v.calc.factor_q.toFixed(1) : '3.0')], ['Zonă seismică (P100-1/2013)', 'a_g = ' + v.calc.seismic.ag + 'g, T_c = ' + v.calc.seismic.Tc + ' s'], ['Zăpadă (CR 1-1-3/2012)', v.calc.clima.sk + ' kN/m²'], ['Temperatura exterioară de calcul', v.calc.clima.Te + ' °C'], ['Adâncime de îngheț (STAS 6054)', (v.calc.adancime_inghet_m || 0.9).toFixed(2) + ' m']], ['Parametru', 'Valoare']) }
      ], D, v) : (G.UXParagrafe ? G.UXParagrafe.rezistenta(D, v) : [
        { h: '1. Sistemul structural', html: '<p>Structura de rezistență: ' + esc(D.struct || 'metalică') + '.</p>' }
      ]);
      return { cat: 'Memorii Tehnice', file: 'Memoriu_rezistenta.doc', html: docHtml(_meta(D, 'MEMORIU TEHNIC DE REZISTENȚĂ'), secs) };
    },
    'Memorii instalații (IT/IS/IE/IG/HVAC/ICT)': function (D, v) {
      var deep = _lib(D, 'instalatii'); if (deep && (D.faza === 'PTh' || D.faza === 'PTh+DE' || D.faza === 'PT')) deep += _lib(D, 'inst_pth');
      var secs = deep ? _withProgram([
        { h: null, html: deep },
        { h: 'Anexă — soluții alese pentru proiect', html: tbl([['Încălzire', esc(({ ct_gaz: 'centrală termică pe gaz', pompa: 'pompă de căldură', vrf: 'sistem VRF', termoficare: 'racord termoficare', electric: 'încălzire electrică', radiant: 'radiant infraroșu' })[D.incalzire] || D.incalzire || 'de stabilit')], ['Alimentare cu apă', esc(({ retea: 'rețea publică', put: 'puț forat', rezervor: 'rezervor propriu' })[D.apa] || 'de stabilit')]], ['Instalație', 'Soluție']) }
      ], D, v) : (G.UXParagrafe ? G.UXParagrafe.instalatii(D, v) : [
        { h: 'Instalații', html: '<p>Instalații termice, sanitare, electrice, ventilare și PSI conform destinației și normativelor I13/I9/I7/I5/P118.</p>' }
      ]);
      return { cat: 'Memorii Tehnice', file: 'Memorii_instalatii.doc', html: docHtml(_meta(D, 'MEMORII TEHNICE — INSTALAȚII'), secs) };
    },
    'Caiet de sarcini arhitectură (PTh)': function (D, v) {
      var deep = _lib(D, 'caiet_arh');
      var body = deep || '<p>Caietul de sarcini pe specialitatea arhitectură (faza PTh) descrie, pe categorii de lucrări (zidării, tencuieli, pardoseli, placaje, tâmplărie, zugrăveli, tavane, termosistem, hidroizolații, accesibilizări), obiectul, standardele de referință, materialele și condițiile de recepție, tehnologia de execuție, verificările și controlul calității, recepția și modul de măsurare/decontare. Conținutul detaliat se generează pentru funcțiunile cu bibliotecă tehnică dedicată.</p>';
      return { cat: 'Caiete de sarcini', file: 'Caiet_sarcini_arhitectura.doc', html: docHtml(_meta(D, 'CAIET DE SARCINI — ARHITECTURĂ', 'Proiect tehnic de execuție (PTh) · HG 907/2016'), [{ h: deep ? null : 'Caiet de sarcini — lucrări de arhitectură', html: body }]) };
    },
    'Caiet de sarcini rezistență (PTh)': function (D, v) {
      var deep = _lib(D, 'caiet_str');
      var body = deep || '<p>Caietul de sarcini pe specialitatea rezistență (faza PTh) descrie, pe categorii de lucrări (terasamente, cofraje, armături, betoane, hidroizolarea fundațiilor, elemente structurale), obiectul, standardele (SR EN 1992, SR EN 206, SR EN 13670, NP 112, P100-1), materialele și recepția lor, tehnologia și toleranțele de execuție, probele și controlul calității, fazele determinante, măsurarea și decontarea.</p>';
      return { cat: 'Caiete de sarcini', file: 'Caiet_sarcini_rezistenta.doc', html: docHtml(_meta(D, 'CAIET DE SARCINI — REZISTENȚĂ', 'Proiect tehnic de execuție (PTh) · HG 907/2016'), [{ h: deep ? null : 'Caiet de sarcini — lucrări de rezistență', html: body }]) };
    },
    'Caiet de sarcini instalații (PTh)': function (D, v) {
      var deep = _lib(D, 'caiet_inst');
      var body = deep || '<p>Caietul de sarcini pe specialitatea instalații (faza PTh) descrie, pe fiecare instalație (sanitare, termice, ventilare-climatizare, electrice, IDSAI P118-3, stingere P118-2, gaze, curenți slabi), obiectul, standardele de referință, materialele și echipamentele cu condiții de recepție, montajul, probele și verificările (presiune, etanșeitate, funcționale, PRAM, debite), recepția și decontarea.</p>';
      return { cat: 'Caiete de sarcini', file: 'Caiet_sarcini_instalatii.doc', html: docHtml(_meta(D, 'CAIET DE SARCINI — INSTALAȚII', 'Proiect tehnic de execuție (PTh) · HG 907/2016'), [{ h: deep ? null : 'Caiet de sarcini — lucrări de instalații', html: body }]) };
    },
    'Liste de cantități / antemăsurători (PTh)': function (D, v) {
      var ac = v.calc || {};
      var sc = +D.Sc || 0, sd = +D.Sd || 0, st = +D.Steren || 0;
      var amp = st && sc ? (st - sc) : 0;
      var rows = [
        ['Terasamente — săpătură generală + fundații', 'mc', st ? Math.round(sc * 1.2) : '—', 'estimare: amprentă × adâncime medie fundare'],
        ['Beton în fundații și infrastructură', 'mc', sc ? Math.round(sc * 0.35) : '—', 'fundații + placă pe sol'],
        ['Beton în suprastructură (stâlpi/grinzi/plăci)', 'mc', sd ? Math.round(sd * 0.28) : '—', 'niveluri supraterane'],
        ['Armătură (oțel B500B)', 'kg', sd ? Math.round(sd * 0.28 * 105) : '—', '≈105 kg/mc beton (medie)'],
        ['Cofraje', 'mp', sd ? Math.round(sd * 2.2) : '—', 'raport cofraj/suprafață'],
        ['Zidărie de compartimentare', 'mp', sd ? Math.round(sd * 0.9) : '—', 'pereți neportanți'],
        ['Termosistem fațadă (ETICS)', 'mp', sc ? Math.round((sc * 4) * 0.75) : '—', 'anvelopă opacă'],
        ['Tâmplărie exterioară', 'mp', sd ? Math.round(sd * 0.18) : '—', 'ferestre + uși ext.'],
        ['Finisaje pardoseli', 'mp', sd ? Math.round(sd * 0.85) : '—', 'gresie/PVC/mochetă'],
        ['Finisaje pereți (tencuieli + zugrăveli)', 'mp', sd ? Math.round(sd * 2.6) : '—', 'ambele fețe'],
        ['Tavane suspendate', 'mp', sd ? Math.round(sd * 0.6) : '—', 'zone cu tavan casetat'],
        ['Hidroizolație terasă', 'mp', sc ? Math.round(sc * 0.55) : '—', 'suprafață terasă'],
        ['Instalații (global, procent din C+M)', '%', 25, 'sanitare+termice+HVAC+electrice+PSI'],
        ['Amenajări exterioare + spații verzi', 'mp', amp || '—', 'teren − amprentă']
      ];
      var note = '<p><b>Antemăsurători orientative</b>, generate parametric din datele proiectului (Sc=' + (sc || '—') + ' mp, Sd=' + (sd || '—') + ' mp). Cantitățile exacte se extrag din planșele PTh și din breviarul de calcul; listele de mai jos fundamentează devizul pe obiect și oferta de execuție. Prețurile unitare se preiau din baza de prețuri a platformei (deviz HG 907).</p>';
      return { cat: 'Caiete de sarcini', file: 'Liste_cantitati_antemasuratori.doc', html: docHtml(_meta(D, 'LISTE DE CANTITĂȚI (ANTEMĂSURĂTORI)', 'Proiect tehnic de execuție (PTh) · HG 907/2016'), [{ h: 'Antemăsurători pe categorii de lucrări', html: note + tbl(rows, ['Categorie de lucrări', 'U.M.', 'Cantitate', 'Bază de estimare']) }]) };
    },
    'Scoatere teren din circuitul agricol (Ord. 83/2018)': function (D, v) {
      var st = +D.Steren || 0;
      var secs = [
        { h: '1. Descrierea obiectivului', html: '<p>Documentație pentru scoaterea definitivă/temporară din circuitul agricol a terenului în suprafață de <b>' + (st ? st.toLocaleString('ro-RO') + ' mp' : '—') + '</b>, ' + esc(D.uat || '—') + (D.nrcad ? ', nr. cad. ' + esc(D.nrcad) : '') + ', necesar realizării obiectivului „' + esc((G.UXDoc.FUNCTIUNI[D.functiune] || {}).label || D.functiune) + '". Se întocmește conform Ord. MADR 83/2018 și Legii 18/1991.</p>' },
        { h: '2. Necesitatea și oportunitatea', html: '<p>Terenul este necesar edificării investiției conform Certificatului de Urbanism' + (D.nrCU ? ' nr. ' + esc(D.nrCU) : '') + '; scoaterea din circuitul agricol este condiție prealabilă autorizării, întrucât terenul are folosință agricolă în evidențele cadastrale.</p>' },
        { h: '3. Amplasament, suprafață afectată, situație juridică', html: tbl([['Suprafață totală teren', (st ? st.toLocaleString('ro-RO') : '—') + ' mp'], ['Suprafață scoasă din circuit', (D.Sc ? (+D.Sc + Math.round((st - D.Sc) * 0.3)).toLocaleString('ro-RO') : '—') + ' mp (amprentă + amenajări)'], ['Categorie de folosință actuală', esc(D.folosinta || 'arabil / de precizat')], ['Situare', 'intravilan / extravilan — conform CF']], ['Element', 'Valoare']) },
        { h: '4. Încadrarea în categorii de bonitate și taxele', html: '<p>Taxa de scoatere din circuitul agricol se calculează în funcție de <b>clasa de calitate/bonitate</b> a solului (I-V) și de categoria de folosință, conform Legii 18/1991 (Anexă) și HG 890/2005 actualizat. Terenurile de clasă superioară (I-II) au taxe mai mari. Valoarea exactă se stabilește pe baza studiului pedologic (OSPA) și a încadrării de bonitate.</p>' + tbl([['Clasa I (foarte bună)', 'taxă maximă'], ['Clasa II-III (bună/mijlocie)', 'taxă medie'], ['Clasa IV-V (slabă/foarte slabă)', 'taxă redusă']], ['Clasa bonitate', 'Nivel taxă']) },
        { h: '5. Documente necesare + avize', html: '<p>Documentație cadastrală, extras CF, CU, studiu pedologic (OSPA), aviz APM (după caz), plan de amplasament. Pentru extravilan: aviz DADR/APIA. Actul de scoatere se emite de autoritatea competentă (APIA/MADR/consiliul județean, funcție de suprafață).</p>' }
      ];
      return { cat: 'Avize', file: 'Scoatere_circuit_agricol.doc', html: docHtml(_meta(D, 'SCOATERE DIN CIRCUITUL AGRICOL', 'Ord. MADR 83/2018 · Legea 18/1991'), secs) };
    },
    'Memoriu tehnic aviz de mediu (Ord. 863/2002)': function (D, v) {
      var deep = _lib(D, 'aviz_mediu');
      var caps = ['Date de identificare (titular, proiectant, amplasament)', 'Descrierea proiectului (componente, etape, tehnologii)', 'Amplasamentul (fizic, geologic, hidrologic, vecinătăți, arii Natura 2000)', 'Cadrul legal aplicabil și încadrarea procedurală', 'Alternativele analizate (min. Alternativa 0 + soluția propusă)', 'Utilizarea resurselor (teren, apă, energie, materii prime)', 'Gestionarea deșeurilor (coduri EWC, operator autorizat)', 'Poluarea generată (aer, apă, sol, zgomot, vibrații) cu valori-limită', 'Riscul de accidente (scenarii + măsuri)', 'Impactul asupra factorilor de mediu (concluzie pe factor)', 'Măsuri de reducere a impactului', 'Programul de monitorizare (factor/metodă/frecvență/responsabil)', 'Rezumat non-tehnic (pentru public)', 'Concluzii + solicitare formală acord/aviz'];
      var secs = deep ? [
        { h: null, html: deep },
        { h: 'Anexă — verificare arii protejate Natura 2000', html: '<p>Se verifică dacă amplasamentul (' + esc(D.uat || '—') + ') se află în/în vecinătatea (≤ 5 km) unei arii Natura 2000 (SPA/SCI). În caz afirmativ → necesară Evaluare Adecvată (EA). Se corelează cu baza de date ANPM.</p>' }
      ] : [
        { h: 'Structura memoriului (14 capitole — Ord. 863/2002 + Legea 292/2018)', html: tbl(caps.map(function (c, i) { return ['' + (i + 1), c]; }), ['Cap.', 'Conținut']) },
        { h: 'Verificare arii protejate Natura 2000', html: '<p>Se verifică dacă amplasamentul (' + esc(D.uat || '—') + ') se află în/în vecinătatea (≤ 5 km) unei arii Natura 2000 (SPA/SCI). În caz afirmativ → necesară Evaluare Adecvată (EA). Se corelează cu baza de date ANPM.</p>' },
        { h: 'Praguri SEVESO (HG 804/2007)', html: '<p>Dacă proiectul implică substanțe periculoase (ex. GPL, hidrogen), se verifică cantitatea față de pragurile din Anexa I a Directivei 2012/18/UE (HG 804/2007). Sub prag → confirmare explicită; peste prag → necesară autorizare SEVESO (nivel inferior/superior).</p>' },
        { h: 'Procedura', html: '<p>Se depune la APM notificarea + memoriul; APM stabilește etapa de încadrare (aviz/acord de mediu, cu sau fără evaluare de impact — Legea 292/2018).</p>' }
      ];
      return { cat: 'Avize', file: 'Memoriu_aviz_mediu.doc', html: docHtml(_meta(D, 'MEMORIU TEHNIC — AVIZ DE MEDIU', 'Ord. 863/2002 · Legea 292/2018 · HG 445/2009'), secs) };
    },
    'DALI — construcție existentă / intervenție': function (D, v) {
      var tip = D.tip_interventie || 'reabilitare_termica';
      var TIPURI = {
        reabilitare_termica: { t: 'Reabilitare termică', cap: ['Starea actuală (audit energetic)', 'Soluții de intervenție (izolare fațade + acoperiș + tâmplărie)', 'Indicatori energetici actuali vs. propuși (kWh/mp·an)', 'Reducerea emisiilor CO₂', 'Analiza cost-eficiență (lei/kWh economisit)', 'Certificat energetic ante/post'], norma: 'Legea 372/2005 · Ord. MDRT 2641/2012 · Mc 001/2006' },
        consolidare: { t: 'Consolidare structurală', cap: ['Expertiza tehnică (expert atestat MLPAT)', 'Clasa de risc seismic (Rs I → Rs IV)', 'Descrierea degradărilor și cauzelor', 'Soluția de consolidare propusă', 'Gradul de asigurare seismică post-intervenție (R3)'], norma: 'P100-3/2008 · P100-1/2013 · Legea 10/1995' },
        schimbare_destinatie: { t: 'Schimbare de destinație', cap: ['Destinația actuală vs. propusă', 'Cerințe normative ale noii funcțiuni', 'Verificarea capacității structurale la noile încărcări', 'Adaptări (evacuare, PSI, accesibilitate, igienă)'], norma: 'Legea 50/1991 · Legea 10/1995' },
        extindere: { t: 'Extindere', cap: ['Corp existent + corp nou (rost / conlucrare)', 'Racordarea structurală și funcțională', 'Indicatori rezultați (POT/CUT cumulat)'], norma: 'P100-1/2013 · Legea 50/1991' },
        mansardare: { t: 'Mansardare', cap: ['Verificarea capacității structurii existente la suprasarcină', 'Soluția de șarpantă/planșeu', 'Încadrarea în regimul de înălțime admis'], norma: 'P100-1/2013 · C 107/2005' }
      };
      var ti = TIPURI[tip] || TIPURI.reabilitare_termica;
      var deep = _lib(D, 'dali');
      var secs = deep ? [
        { h: null, html: deep }
      ] : [
        { h: '1. Tipul intervenției', html: '<p>Intervenție asupra unei construcții existente — tip: <b>' + esc(ti.t) + '</b>. Se întocmește D.A.L.I. conform HG 907/2016. Normative aplicabile: ' + esc(ti.norma) + '.</p>' },
        { h: '2. Capitole specifice (HG 907/2016)', html: tbl(ti.cap.map(function (c, i) { return ['' + (i + 1), c]; }), ['Nr.', 'Capitol']) },
        { h: '3. Relația cu vecinătățile (construcție existentă)', html: '<p>Fiind vorba despre o construcție existentă, nu se pune problema modificării relației cu vecinătățile, aceasta fiind cea proiectată inițial sau rezultată din modificările realizate de-a lungul perioadei de exploatare, conform planșelor desenate.</p>' },
        { h: '4. Expertiză și verificare', html: '<p>Intervențiile la construcții existente se fundamentează pe expertiză tehnică (elaborată de expert atestat) și, după caz, audit energetic. Proiectul se verifică de verificatori atestați pe cerințele aplicabile (Legea 10/1995).</p>' }
      ];
      return { cat: 'Memorii Tehnice', file: 'DALI_constructie_existenta.doc', html: docHtml(_meta(D, 'D.A.L.I. — CONSTRUCȚIE EXISTENTĂ', esc(ti.t) + ' · HG 907/2016'), secs) };
    },
    'Studiu de fezabilitate energetică (SF)': function (D, v) {
      var e = v && v.calc && v.calc.energie; if (!e || !e.putere_dc_kwp) return null; // doar pt funcțiuni de energie cu putere setată
      function f(x) { return (x == null ? '—' : Math.round(x).toLocaleString('ro-RO')); }
      var curs = +D.curs_eur || 4.97;               // RON/EUR
      function lei(eur) { return f(eur * curs); }
      var pdc = e.putere_dc_kwp, pac = e.putere_ac_kva;
      var capexKwp = +D.capex_kwp || 700, pretMwh = +D.pret_energie_mwh || 90;
      var opexPct = (+D.opex_pct || 1.5) / 100, rata = (+D.rata_actualizare || 5) / 100, ani = +D.durata_ani || 20, degr = 0.006;
      var capex = pdc * capexKwp, prodAn = e.productie_anuala_mwh, opexAn = capex * opexPct;
      // Indicatori FM/PNRR I.1–I.5
      var I1 = +(pdc / 1000).toFixed(3), I2 = Math.round(prodAn * 0.6119), I3 = prodAn;
      var degrTot = 0; for (var y = 1; y <= ani; y++) degrTot += (1 - degr * (y - 1)); var I4 = Math.round(prodAn * degrTot);
      var I5 = +(prodAn * 1000 / (pdc * 8760) * 100).toFixed(1);
      // Producție lunară (profil RO normalizat)
      var LUNI = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
      var PROF = [0.031, 0.049, 0.081, 0.100, 0.121, 0.127, 0.131, 0.118, 0.093, 0.069, 0.041, 0.039]; var ps = 0; PROF.forEach(function (x) { ps += x; });
      var lunar = LUNI.map(function (m, i) { return [m, f(prodAn * PROF[i] / ps) + ' MWh']; }); lunar.push(['<b>TOTAL an</b>', '<b>' + f(prodAn) + ' MWh</b>']);
      // Deviz general HG 907/2016 (orientativ, EUR)
      var g4ci = Math.round(capex * 0.18), g4mont = Math.round(capex * 0.07), g4ut = Math.round(capex * 0.72), g4 = g4ci + g4mont + g4ut;
      var g1 = Math.round(capex * 0.01), g2 = Math.round(capex * 0.05), g3 = Math.round(capex * 0.045);
      var cm = g4ci + g4mont + g1;                  // C+M ≈ construcții+instalații+montaj+amenajare teren
      var iscA = Math.round(cm * 0.005), iscB = Math.round(cm * 0.001), csc = Math.round(cm * 0.005);
      var g5org = Math.round(capex * 0.015), g5div = Math.round((g1 + g2 + g3 + g4) * 0.05), g5 = g5org + iscA + iscB + csc + g5div;
      var g6 = Math.round(capex * 0.005);
      var totFTVA = g1 + g2 + g3 + g4 + g5 + g6, tva = Math.round(totFTVA * 0.19), totTVA = totFTVA + tva;
      // Scenariul II contrafactual — ciclu combinat gaz (randament 60%)
      var gazAn = Math.round(prodAn / 0.60), pretGaz = +D.pret_gaz_mwh || 40, chGazAn = Math.round(gazAn * pretGaz / 0.85);
      // Financiar SI
      var crf = rata / (1 - Math.pow(1 + rata, -ani)), lcoe = (capex * crf + opexAn) / prodAn;
      function npvAt(r, k) { k = k || 1; var s = -capex; for (var t = 1; t <= ani; t++) { s += (prodAn * (1 - degr * (t - 1)) * pretMwh * k - opexAn) / Math.pow(1 + r, t); } return s; }
      var npv = npvAt(rata); var irr = null; for (var rr = 0.005; rr <= 0.6; rr += 0.005) { if (npvAt(rr) < 0) { irr = +((rr - 0.005) * 100).toFixed(1); break; } }
      var cum = -capex, payback = null, flows = []; for (var t = 1; t <= ani; t++) { var pt = prodAn * (1 - degr * (t - 1)), vt = pt * pretMwh, cf = vt - opexAn; cum += cf; if (payback === null && cum >= 0) payback = t; if (t <= 7 || t % 5 === 0 || t === ani) flows.push([t, f(pt), f(vt), f(opexAn), f(cf), f(cum)]); }
      var venitAn1 = prodAn * pretMwh;
      var verdict = (npv > 0 && irr != null && irr >= rata * 100) ? 'FAVORABIL' : (npv > 0 ? 'MARGINAL' : 'NEFAVORABIL');
      var sens = [0.7, 0.85, 1.0, 1.15, 1.3].map(function (k) { var n = npvAt(rata, k); return [Math.round(pretMwh * k) + ' EUR/MWh (' + Math.round(k * 100) + '%)', f(n) + ' EUR', (n > 0 ? 'fezabil' : 'nefezabil')]; });
      // Serii numerice pentru grafice
      var lunarNum = LUNI.map(function (m, i) { return [m.slice(0, 3), Math.round(prodAn * PROF[i] / ps)]; });
      var cumNum = []; var _c = -capex; for (var tt = 1; tt <= ani; tt++) { _c += prodAn * (1 - degr * (tt - 1)) * pretMwh - opexAn; cumNum.push(['An' + tt, Math.round(_c)]); }
      var sensNum = [0.7, 0.85, 1.0, 1.15, 1.3].map(function (k) { return [Math.round(pretMwh * k) + '€', Math.round(npvAt(rata, k))]; });
      var devizPie = [['Teren', g1], ['Utilități', g2], ['Proiectare', g3], ['Investiția de bază', g4], ['Alte chelt.', g5], ['Probe', g6]];

      var _CAP2_EXT = "<p><b>2.1 Situația existentă a amplasamentului</b></p>\n\n<p>Amplasamentul propus pentru realizarea parcului fotovoltaic se identifică, la momentul întocmirii prezentului studiu de fezabilitate, ca teren aflat în regimul de folosință și cu categoria funcțională înscrisă în actele de proprietate și în evidențele de cadastru și carte funciară aferente. Situația juridică a terenului a fost verificată prin extras de carte funciară actualizat, iar amplasamentul analizat nu figurează, conform informațiilor puse la dispoziție de beneficiar, ca fiind afectat de litigii, sechestre, ipoteci sau alte sarcini care ar putea influența derularea investiției. Regimul juridic al terenului permite, în principiu, schimbarea categoriei de folosință și/sau obținerea documentațiilor de urbanism necesare (certificat de urbanism, plan urbanistic zonal, dacă este cazul), pași care se parcurg distinct de prezentul studiu, în conformitate cu legislația în vigoare privind amenajarea teritoriului și urbanismul.</p>\n\n<p>Din punct de vedere al utilizării actuale, terenul propus se încadrează, în funcție de situația particulară constatată la fața locului și în documentele de evidență funciară, în categoria terenurilor agricole cu productivitate redusă sau marginală, a terenurilor neproductive, degradate ori a celor situate în vecinătatea unor zone cu potențial agricol scăzut, unde valorificarea pentru producția vegetală intensivă nu mai reprezintă o soluție eficientă din punct de vedere economic. Această situație este frecvent întâlnită la nivel național pe suprafețe afectate de eroziune, salinizare, exces de umiditate sezonier, fragmentare excesivă a proprietății sau acces dificil pentru utilaje agricole de mare capacitate, factori care, cumulați, determină randamente agricole sub media zonală și justifică reconversia funcțională a terenului către o utilizare energetică, compatibilă cu principiile dezvoltării durabile.</p>\n\n<p>Accesul la amplasament se realizează, de regulă, prin drumuri publice existente (drumuri județene, comunale sau de exploatare agricolă), a căror capacitate portantă și stare tehnică vor fi evaluate în detaliu la fazele următoare de proiectare (D.T.A.C./P.T.), în vederea stabilirii necesității unor lucrări de amenajare sau consolidare pentru tranzitul utilajelor de construcție și, ulterior, pentru accesul echipelor de operare și mentenanță. Vecinătățile amplasamentului sunt constituite, în general, din alte terenuri cu destinație agricolă, silvică sau, punctual, din intravilanul localităților limitrofe, situație care impune o analiză atentă a distanțelor față de zonele locuite, față de ariile naturale protejate (dacă există în proximitate) și față de eventuale monumente istorice sau situri arheologice, în conformitate cu certificatul de urbanism și cu avizele de specialitate emise de autoritățile competente.</p>\n\n<p>Infrastructura tehnico-edilitară existentă în zona amplasamentului este relevantă în principal sub aspectul disponibilității rețelei electrice de distribuție sau transport în proximitate, element esențial pentru evacuarea puterii produse de parcul fotovoltaic. Distanța față de cel mai apropiat punct de racordare (stație de transformare, linie electrică aeriană sau subterană de medie/înaltă tensiune), precum și capacitatea disponibilă în rețea, se stabilesc pe baza avizului tehnic de racordare (A.T.R.) emis de operatorul de distribuție/transport competent, document care condiționează dimensionarea finală a instalației și configurația electrică a acesteia. În absența unor rețele de utilități suplimentare (apă, canalizare, gaze naturale) — care, de altfel, nu sunt necesare în mod semnificativ pentru funcționarea unui parc fotovoltaic — investiția se caracterizează printr-un consum redus de resurse și o amprentă tehnico-edilitară minimală comparativ cu alte tipuri de investiții industriale.</p>\n\n<p>Din perspectiva contextului peisagistic și de mediu, amplasamentul analizat se situează într-o zonă a cărei caracterizare topografică, hidrologică și biotică va fi detaliată în cadrul studiilor de specialitate (studiu geotehnic, studiu de evaluare a impactului asupra mediului, dacă este solicitat prin actele de reglementare). Se reține, la acest nivel, faptul că instalarea unui parc fotovoltaic reprezintă, comparativ cu alte forme de dezvoltare industrială sau energetică, o intervenție cu grad redus de impermeabilizare a solului, fără emisii de poluanți în faza de operare, fără generare de deșeuri industriale semnificative și cu posibilitatea reversibilității la finalul duratei de viață utilă a instalației, prin dezafectarea echipamentelor și readucerea terenului la starea inițială sau la o nouă destinație compatibilă.</p>\n\n<p><b>2.1.1 Context energetic național și regional</b></p>\n\n<p>Sistemul energetic național se află într-un proces amplu de transformare structurală, determinat de necesitatea reducerii dependenței de resursele energetice de import, de decarbonizarea mixului de producție și de respectarea angajamentelor asumate la nivel european. România a beneficiat istoric de un mix energetic relativ diversificat, cu o pondere semnificativă a hidroenergiei, a producției nucleare (Centrala Nuclearoelectrică Cernavodă) și a producției pe bază de combustibili fosili (cărbune, gaze naturale), la care s-au adăugat, în ultimul deceniu și jumătate, capacități tot mai importante de energie eoliană și fotovoltaică. Cu toate acestea, vulnerabilitatea sistemului la fluctuațiile pieței internaționale a combustibililor fosili, evidențiată acut în contextul crizelor energetice regionale recente, a determinat o reorientare strategică fermă către sursele regenerabile de energie (SRE), considerate atât o soluție de securitate energetică, cât și un vector de reducere a costurilor pe termen mediu și lung.</p>\n\n<p>Rolul surselor regenerabile în asigurarea securității energetice naționale este dublu: pe de o parte, ele reduc expunerea la importurile de combustibili fosili și la volatilitatea prețurilor internaționale ale acestora; pe de altă parte, prin caracterul lor descentralizat, contribuie la diversificarea geografică a producției și la reducerea pierderilor tehnologice asociate transportului pe distanțe lungi. Energia fotovoltaică, în particular, prezintă avantajul unei perioade de implementare relativ scurte comparativ cu alte tipuri de capacități energetice, al unor costuri de operare și mentenanță reduse și al unei bune predictibilități a producției pe orizonturi de timp mediu, corelată cu resursa solară disponibilă la nivel teritorial.</p>\n\n<p>Evoluția prețului energiei electrice pe piața angro, tranzacționată prin mecanismele Operatorului Pieței de Energie Electrică și de Gaze Naturale „OPCOM” S.A. (piața pentru ziua următoare — PZU, piața intrazilnică și piețele centralizate de contracte), a înregistrat, în ultimii ani, o volatilitate semnificativă, cu vârfuri de preț determinate de conjunctura regională și internațională a piețelor de gaze naturale și de emisii de carbon (schema EU ETS). Această volatilitate reprezintă un factor de risc pentru consumatorii industriali și comerciali, dar și o oportunitate pentru producătorii de energie din surse regenerabile, care pot valorifica producția fie prin contracte bilaterale de vânzare (PPA — Power Purchase Agreement), fie prin participarea directă pe piețele centralizate, fie prin mecanisme de sprijin dedicate.</p>\n\n<p>La nivel regional, România face parte din rețeaua europeană de transport al energiei electrice coordonată de ENTSO-E (European Network of Transmission System Operators for Electricity), beneficiind de interconectări cu sistemele energetice ale statelor vecine, care permit atât importul, cât și exportul de energie electrică, în funcție de necesități și de disponibilitatea capacităților de interconectare transfrontalieră. Dezvoltarea capacităților proprii de producție din surse regenerabile, inclusiv prin proiecte de tipul celui analizat în prezentul studiu, contribuie la consolidarea poziției României în cadrul acestui sistem regional interconectat, reducând necesarul de import în perioadele de vârf de consum și sporind marja de manevră a operatorului de transport și de sistem în gestionarea echilibrului producție-consum.</p>\n\n<p><b>2.1.2 Cadrul de politici și strategie (Uniunea Europeană și național)</b></p>\n\n<p>Investiția analizată se integrează într-un cadru european și național de politici energetice și climatice deosebit de amplu, structurat pe mai multe niveluri de reglementare. La nivel european, Directiva (UE) 2018/2001 privind promovarea utilizării energiei din surse regenerabile (RED II), astfel cum a fost modificată și completată prin Directiva (UE) 2023/2413 (RED III), stabilește ținta obligatorie de minimum 42,5% pondere a energiei din surse regenerabile în consumul final brut de energie la nivelul Uniunii Europene până în anul 2030, cu un obiectiv indicativ suplimentar de a atinge 45%. Statele membre, inclusiv România, au obligația de a transpune aceste ținte în planuri naționale integrate în domeniul energiei și schimbărilor climatice și de a raporta periodic progresul realizat.</p>\n\n<p>Regulamentul (UE) 2021/1119 de instituire a cadrului pentru realizarea neutralității climatice („Legea europeană a climei”) consacră obiectivul obligatoriu al neutralității climatice a Uniunii Europene până în anul 2050, precum și ținta intermediară de reducere netă a emisiilor de gaze cu efect de seră cu cel puțin 55% până în 2030 față de nivelul anului 1990. Aceste obiective sunt operaționalizate prin pachetul legislativ „Pregătiți pentru 55” („Fit for 55”), care revizuiește un ansamblu larg de instrumente — schema de comercializare a certificatelor de emisii (EU ETS), directivele privind eficiența energetică și performanța energetică a clădirilor, regulamentele privind partajarea eforturilor între statele membre — și care plasează producția de energie din surse regenerabile în centrul strategiei de decarbonizare.</p>\n\n<p>La nivel național, Planul Național Integrat în domeniul Energiei și Schimbărilor Climatice (PNIESC) 2021-2030, aprobat prin Hotărârea Guvernului nr. 1076/2021, stabilește țintele specifice ale României în materie de ponderea SRE, eficiență energetică și reducere a emisiilor, precum și măsurile și mecanismele de sprijin necesare atingerii acestora. Strategia Energetică a României 2020-2030, cu perspectiva anului 2050, definește direcțiile strategice de dezvoltare a sectorului energetic național, printre care se numără decarbonizarea sectorului de producție a energiei electrice, diversificarea mixului energetic prin creșterea semnificativă a capacităților din surse regenerabile, modernizarea infrastructurii de rețea și asigurarea securității energetice pe termen lung. Cadrul legislativ specific este completat de Legea nr. 220/2008 pentru stabilirea sistemului de promovare a producerii energiei din surse regenerabile de energie, republicată, cu modificările și completările ulterioare, precum și de Legea energiei electrice și a gazelor naturale nr. 123/2012, cu modificările și completările ulterioare, care reglementează cadrul general de funcționare a piețelor de energie electrică, condițiile de racordare la rețea și drepturile și obligațiile producătorilor.</p>\n\n<p>Sub aspectul mecanismelor de sprijin, sistemul certificatelor verzi, funcțional în România în perioada 2005-2031 pentru instalațiile acreditate anterior modificărilor legislative, a reprezentat principalul instrument istoric de promovare a producției de energie din surse regenerabile, prin obligarea furnizorilor de energie electrică să achiziționeze un număr de certificate verzi proporțional cu cantitatea de energie furnizată consumatorilor finali. Pentru capacitățile noi, cadrul de sprijin s-a reorientat către mecanisme de tip contract pentru diferență (CfD — Contract for Difference), instrument prin care statul, printr-o entitate contractantă desemnată, garantează producătorului un preț de referință pentru energia produsă, plătind diferența față de prețul de piață atunci când acesta este inferior prețului de referință și recuperând diferența în situația inversă, mecanism care reduce semnificativ riscul de venit al investitorilor și facilitează accesul la finanțare bancară pentru proiecte de mari dimensiuni. Aceste scheme de sprijin pentru capacități noi de producție din surse regenerabile sunt organizate, de regulă, prin licitații competitive, în conformitate cu normele europene privind ajutorul de stat, iar accesul la ele este condiționat de parcurgerea etapelor de autorizare, racordare și, în multe cazuri, de existența unei documentații tehnico-economice de tipul prezentului studiu de fezabilitate.</p>\n\n<p><b>2.1.3 Surse de finanțare eligibile</b></p>\n\n<p>Finanțarea investiției analizate se poate structura, în funcție de strategia financiară a beneficiarului, prin combinarea mai multor surse, publice și private. Fondul pentru Modernizare, instituit la nivelul Uniunii Europene în baza Directivei ETS și administrat la nivel național prin Ministerul Energiei, în parteneriat cu Banca Internațională pentru Reconstrucție și Dezvoltare (Banca Mondială), constituie una dintre principalele surse de finanțare nerambursabilă pentru proiecte de investiții în capacități de producție a energiei din surse regenerabile, inclusiv fotovoltaice, prin intermediul Programului-cheie 1 „Surse regenerabile de energie și stocarea energiei”, reglementat inclusiv prin Ordonanța de urgență a Guvernului nr. 60/2022 privind stabilirea cadrului instituțional și financiar de implementare a acestui fond. Accesarea acestor fonduri se realizează, în mod tipic, prin apeluri de proiecte competitive, cu criterii de eligibilitate tehnică și financiară, praguri minime de putere instalată, cerințe privind maturitatea documentației (existența autorizației de construire, a avizului tehnic de racordare, a studiului de fezabilitate) și cerințe de cofinanțare proprie din partea beneficiarului.</p>\n\n<p>Planul Național de Redresare și Reziliență (PNRR), prin Componenta C6 „Energie”, oferă, de asemenea, linii de finanțare dedicate dezvoltării capacităților de producție din surse regenerabile, modernizării rețelelor de transport și distribuție și digitalizării sistemului energetic, cu termene de implementare corelate cu calendarul general al mecanismului european de redresare. Programul Complementar de Investiții pentru Dezvoltare Durabilă, Infrastructură, Fond Social, Mediu, Sisteme de Creștere a Eficienței Energetice, Digitalizare (POCIDIF), gestionat de Ministerul Energiei în calitate de autoritate de management pentru anumite axe, completează cadrul de finanțare europeană nerambursabilă pentru investiții în infrastructură energetică și eficiență energetică, inclusiv pentru proiecte conexe de producție a energiei din surse regenerabile.</p>\n\n<p>Pe lângă sursele de finanțare nerambursabilă, investiția poate fi susținută prin surse proprii ale beneficiarului sau prin finanțare bancară de tip „credit verde” (green loan), instrument financiar oferit de instituții de credit comerciale și de instituții financiare internaționale (precum Banca Europeană de Investiții sau Banca Europeană pentru Reconstrucție și Dezvoltare), în condiții avantajoase de cost al capitalului, corelate cu îndeplinirea unor criterii de sustenabilitate și de conformitate cu taxonomia europeană a activităților durabile. Schemele de garantare a creditelor, oferite prin instituții specializate (precum Fondul Național de Garantare a Creditelor pentru Întreprinderile Mici și Mijlocii sau EximBank), pot reduce, la rândul lor, costul finanțării și pot facilita accesul la capital al investitorilor cu resurse proprii limitate. Procedura tipică de accesare a acestor instrumente de finanțare cuprinde, în ordine, elaborarea documentației tehnico-economice (inclusiv prezentul studiu de fezabilitate), depunerea cererii de finanțare în cadrul apelului de proiecte deschis, evaluarea eligibilității tehnice și financiare de către autoritatea de management sau instituția finanțatoare, semnarea contractului de finanțare, implementarea propriu-zisă a investiției cu respectarea calendarului și a indicatorilor asumați, precum și monitorizarea post-implementare pe o perioadă de durabilitate stabilită prin contractul de finanțare.</p>\n\n<p><b>2.1.4 Necesitatea și oportunitatea investiției</b></p>\n\n<p>Necesitatea realizării investiției analizate derivă din convergența mai multor factori de natură economică, reglementară și strategică. Din perspectivă pur economică, producția de energie electrică din surse fotovoltaice pe amplasamentul propus permite fie reducerea semnificativă a costurilor cu energia electrică pentru autoconsum, în cazul beneficiarilor cu profil de consumator, fie obținerea de venituri suplimentare din vânzarea energiei produse, în cazul beneficiarilor cu profil de producător independent. În ambele situații, investiția funcționează ca un instrument de acoperire împotriva riscului (hedging) generat de volatilitatea prețurilor pe piața angro de energie electrică, oferind un grad ridicat de predictibilitate a costurilor sau a veniturilor energetice pe termen mediu și lung, aspect deosebit de relevant în contextul actual de incertitudine a piețelor de energie.</p>\n\n<p>Din perspectivă reglementară, un număr tot mai mare de operatori economici sunt supuși unor obligații de raportare privind sustenabilitatea, generate de cadrul european privind raportarea de sustenabilitate a întreprinderilor (Directiva CSRD — Corporate Sustainability Reporting Directive), care impune divulgarea informațiilor referitoare la amprenta de carbon, la ponderea energiei din surse regenerabile utilizate și la strategia de tranziție climatică a entităților raportoare, precum și, indirect, a partenerilor lor comerciali din lanțul de aprovizionare. Deținerea unei capacități proprii de producție a energiei din surse regenerabile constituie, în acest context, un argument solid pentru conformarea la aceste cerințe de raportare și pentru consolidarea profilului de sustenabilitate (ESG — Environmental, Social, Governance) al beneficiarului, cu efecte favorabile asupra accesului la finanțare, asupra relațiilor comerciale și asupra poziționării pe piață.</p>\n\n<p>Din perspectivă strategică, investiția contribuie la valorificarea unui teren cu potențial redus pentru alte forme de utilizare economică — fie din cauza calității agricole scăzute, fie din cauza altor constrângeri funciare sau de acces —, transformându-l într-un activ generator de venituri și de valoare adăugată pe o durată de exploatare de ordinul mai multor decenii, semnificativ superioară ciclurilor de producție agricolă convențională. Totodată, prin natura sa modulară și scalabilă, tehnologia fotovoltaică permite adaptarea configurației instalației la evoluția viitoare a necesităților beneficiarului sau a condițiilor de piață, fără a compromite ireversibil caracteristicile terenului, ceea ce conferă investiției un grad ridicat de flexibilitate strategică, superior altor tipuri de investiții energetice cu caracter permanent și dificil reversibile.</p>\n\n<p><b>2.1.5 Metodologia de evaluare a resursei solare</b></p>\n\n<p>Evaluarea preliminară a resursei solare disponibile pe amplasamentul analizat, prezentată în secțiunile următoare ale prezentului capitol, s-a realizat pe baza platformei PVGIS (Photovoltaic Geographical Information System), dezvoltată și întreținută de Centrul Comun de Cercetare (Joint Research Centre — JRC) al Comisiei Europene. PVGIS constituie instrumentul de referință recunoscut la nivel european pentru estimarea potențialului de producție fotovoltaică, fiind fundamentat pe baze de date satelitare de radiație solară de tip SARAH (Surface Solar Radiation Data Set — Heliosat), în versiunile succesive SARAH-2 și, mai recent, SARAH-3, care oferă serii temporale multianuale de măsurători ale radiației solare la nivelul întregului continent european, cu rezoluție spațială fină.</p>\n\n<p>Metodologia PVGIS calculează, pe baza coordonatelor geografice ale amplasamentului, a orientării (azimutului) și a înclinării planului de instalare a modulelor fotovoltaice, precum și a tipului de montaj (fix, cu urmărire pe o axă sau cu urmărire pe două axe), iradiația solară incidentă pe planul modulelor (POA — Plane of Array, denumită și GTI — Global Tilted Irradiance), pe baza unor algoritmi de transpoziție ai componentelor direcționale și difuze ale radiației solare de la planul orizontal la planul înclinat considerat. Este esențial a se distinge, în acest context, între iradiația globală pe plan orizontal (GHI — Global Horizontal Irradiance), care caracterizează resursa solară brută disponibilă la nivelul unei locații, indiferent de tehnologia de captare, și iradiația efectivă recepționată de modulele fotovoltaice instalate la o anumită înclinare și orientare (POA/GTI), care este mărimea relevantă pentru estimarea producției energetice a unei instalații fotovoltaice concrete și care poate fi, în funcție de configurația geometrică aleasă, superioară valorii GHI corespunzătoare aceleiași locații.</p>\n\n<p>Incertitudinea metodologică asociată estimărilor PVGIS, determinată de rezoluția spațială și temporală a datelor satelitare de intrare și de simplificările inerente ale modelelor de transpoziție și de conversie energetică utilizate, este considerată în literatura de specialitate ca fiind de ordinul a ±5% față de valorile reale măsurate la sol pe o perioadă multianuală. Pentru acest motiv, estimările prezentate în prezentul studiu de fezabilitate au caracter preliminar și orientativ, fiind adecvate etapei de analiză a fezabilității investiției, dar se recomandă ferm confirmarea și rafinarea acestora, la fazele următoare de proiectare (proiect tehnic, respectiv etapa premergătoare finanțării și execuției), prin realizarea unor studii de resursă solară de tip P50/P90, utilizând software specializat de simulare a performanței instalațiilor fotovoltaice (precum PVsyst, PV*SOL sau platforme echivalente), care integrează serii de date meteorologice de tip Meteonorm sau echivalente, precum și caracteristicile tehnice specifice ale echipamentelor selectate pentru proiectul definitiv (module, invertoare, structuri de montaj).</p>\n\n<p>Producția energetică netă a unei instalații fotovoltaice nu este echivalentă cu produsul simplu dintre iradiația incidentă și puterea instalată, ci rezultă din aplicarea unui factor global de performanță al sistemului, denumit Raport de Performanță (Performance Ratio — PR), care cuantifică ansamblul pierderilor energetice ce intervin între energia solară incidentă teoretică și energia electrică livrată efectiv la punctul de racordare. Componentele principale ale acestor pierderi, care vor fi cuantificate specific pentru configurația definitivă a proiectului la fazele următoare de proiectare, pe baza caracteristicilor tehnice ale echipamentelor selectate și a condițiilor concrete ale amplasamentului, sunt sintetizate, cu titlu orientativ, în tabelul următor:</p>\n\n<table>\n<tr><th>Componentă a pierderilor</th><th>Cauza tehnică</th><th>Interval tipic de pierdere</th></tr>\n<tr><td>Pierderi de temperatură</td><td>Reducerea eficienței celulelor fotovoltaice la temperaturi de funcționare superioare condițiilor standard de testare (STC, 25°C)</td><td>3% – 8%</td></tr>\n<tr><td>Pierderi ohmice DC (curent continuu)</td><td>Rezistența electrică a cablurilor și conexiunilor dintre module și invertor</td><td>1% – 3%</td></tr>\n<tr><td>Pierderi ohmice AC (curent alternativ)</td><td>Rezistența electrică a cablurilor și conexiunilor dintre invertor și punctul de racordare/transformator</td><td>0,5% – 1,5%</td></tr>\n<tr><td>Pierderi de invertor (eficiență de conversie)</td><td>Randamentul de conversie a curentului continuu în curent alternativ, variabil cu nivelul de încărcare</td><td>1,5% – 3%</td></tr>\n<tr><td>Murdărire (soiling)</td><td>Depunerea de praf, polen, zăpadă sau alte particule pe suprafața modulelor</td><td>1% – 5%</td></tr>\n<tr><td>Nepotrivire (mismatch)</td><td>Diferențe minore de performanță între module identice conectate în același șir electric</td><td>1% – 3%</td></tr>\n<tr><td>Indisponibilitate/timpi de nefuncționare</td><td>Opriri programate pentru mentenanță și opriri accidentale ale echipamentelor</td><td>0,5% – 2%</td></tr>\n<tr><td>Umbrire (shading)</td><td>Umbrirea parțială a modulelor de către obstacole din vecinătate sau de către rândurile adiacente de module</td><td>0,5% – 3%</td></tr>\n<tr><td>Degradare anuală a modulelor (LID/LeTID și degradare pe termen lung)</td><td>Scăderea progresivă a puterii nominale a modulelor pe durata de exploatare</td><td>0,3% – 0,7% pe an</td></tr>\n</table>\n\n<p>Cuantificarea finală și cumulată a acestor componente de pierdere pentru configurația specifică a proiectului analizat, precum și determinarea Raportului de Performanță rezultant, se realizează în secțiunile de calcul dedicate ale prezentului capitol, pe baza parametrilor tehnici particulari ai amplasamentului și ai echipamentelor avute în vedere.</p>";
      var _CAP3_EQUIP = "<p><b>3.1. Descrierea tehnică a componentelor principale ale parcului fotovoltaic</b></p>\n\n<p><b>3.1.1. Modulele fotovoltaice</b></p>\n\n<p>Componenta primară a oricărei capacități de producere a energiei electrice din sursă solară este modulul fotovoltaic, respectiv ansamblul de celule fotovoltaice interconectate electric, laminate între un strat frontal de sticlă temperată cu tratament anti-reflexie și un strat posterior de protecție (backsheet polimeric sau, în cazul modulelor bifaciale, sticlă), încadrate într-o ramă din aliaj de aluminiu anodizat care asigură rigiditatea mecanică necesară montajului și transportului sarcinilor din vânt și zăpadă către structura de susținere. Piața actuală de echipamente oferă, în esență, trei familii tehnologice de celule cristaline de siliciu, policristalinul (multi-Si) fiind astăzi practic ieșit din fabricația de serie pentru proiecte utility-scale, ca urmare a randamentelor inferioare și a costului de producție care nu mai este competitiv în raport cu tehnologiile monocristaline. Tehnologia dominantă pe piață este monocristalinul cu structură PERC (Passivated Emitter and Rear Cell), care introduce un strat dielectric pe fața posterioară a celulei ce reflectă fotonii necaptați înapoi în stratul activ, mărind randamentul de conversie și reducând recombinarea purtătorilor de sarcină la interfața posterioară. Randamentele tipice ale modulelor PERC comerciale se situează, în funcție de producător și de formatul celulei (M6, M10, G12), în intervalul 20,5%–22,0%. O generație tehnologică superioară, adoptată tot mai larg în proiectele de mare capacitate, este TOPCon (Tunnel Oxide Passivated Contact), care introduce un strat suplimentar de oxid de siliciu ultra-fin cu polisiliciu dopat pe fața posterioară, reducând și mai mult pierderile prin recombinare și permițând randamente de conversie de ordinul 22,5%–23,5%, cu o degradare termică mai redusă (coeficient de temperatură al puterii mai favorabil, tipic în jurul valorii de -0,29%/°C față de -0,34% ÷ -0,37%/°C la PERC), aspect relevant pentru performanța de vară, când temperatura de operare a modulului poate depăși semnificativ temperatura ambientală. Cea mai avansată tehnologie disponibilă comercial la scară largă este heterojunction (HJT), care combină un substrat de siliciu monocristalin cu straturi de siliciu amorf hidrogenat, obținând randamente de conversie de până la 24%–24,5% și cea mai bună comportare la temperaturi ridicate dintre toate tehnologiile cristaline curente, însă la un cost de producție și, implicit, de achiziție superior, ceea ce impune o analiză economică specifică a raportului cost-beneficiu în funcție de suprafața de teren disponibilă și de costul acesteia. O direcție tehnologică transversală, aplicabilă atât PERC, cât și TOPCon sau HJT, este configurația bifacială, în care fața posterioară a modulului captează suplimentar radiația reflectată de sol (albedo), aducând un plus de producție tipic între 3% și 8% în funcție de reflectivitatea terenului, de înălțimea de montaj față de sol și de tipul de structură de susținere (efectul fiind mai pronunțat la trackere, prin expunerea variabilă pe parcursul zilei).</p>\n\n<p>Din punctul de vedere al duratei de viață economică a investiției, care fundamentează perioada de analiză a studiului de fezabilitate, producătorii de module oferă în mod standard o garanție de produs (defecte de fabricație, delaminare, corodarea conexiunilor, ruperea sticlei) pe un termen de 10–12 ani și o garanție de performanță (putere garantată) extinsă pe 25–30 de ani, structurată liniar sau în trepte, cu o degradare anuală tipică de ordinul 0,4%–0,6% pe an după un prim an de degradare inițială ușor mai accentuată (Light Induced Degradation, tipic 1%–2% în primele ore de expunere pentru tehnologiile mai vechi, fenomen mult redus la modulele TOPCon și HJT). Aceste rate de degradare stau la baza calculului producției anuale nete pe întreaga durată de viață a instalației, fiind un parametru determinant al fluxului de numerar actualizat. Conformitatea tehnică a modulelor cu standardele internaționale este certificată prin testele IEC 61215 (performanță și durabilitate mecanică/climatică — cicluri termice, umiditate-îngheț, rezistență la grindină, sarcină mecanică statică) și IEC 61730 (siguranță electrică — izolație, împământare, comportare la foc), condiție obligatorie de acceptare la recepția tehnică și, în multe scheme de finanțare, condiție de eligibilitate pentru asigurarea activului. Certificarea suplimentară de rezistență la ambalare salină (IEC 61701) și la degradare indusă potențial (PID, IEC 62804) este relevantă în funcție de microclimatul amplasamentului (proximitate de zone cu umiditate ridicată sau agenți corozivi). Alegerea concretă a tehnologiei și a puterii unitare a modulului pentru proiectul de față se justifică în capitolele de dimensionare, prezentul subcapitol având rolul de a expune paleta tehnologică disponibilă pe piață și criteriile tehnice de selecție.</p>\n\n<p><b>3.1.2. Invertoarele</b></p>\n\n<p>Invertorul este echipamentul electronic de putere responsabil de conversia curentului continuu (c.c.) generat de șirurile de module fotovoltaice în curent alternativ (c.a.) sincron cu rețeaua electrică, în parametrii de tensiune, frecvență și fază impuși de operatorul de distribuție/transport, îndeplinind simultan funcțiile de urmărire a punctului de putere maximă (MPPT — Maximum Power Point Tracking) pe fiecare string sau grup de string-uri, de protecție electrică (protecție la insulație, la scurtcircuit, la funcționare în regim izolat — anti-islanding) și, în configurațiile moderne, de suport activ de rețea. Din punct de vedere arhitectural, parcurile fotovoltaice de mare capacitate utilizează în prezent, cu preponderență, invertoare de tip string, dispuse distribuit în câmpul fotovoltaic (montate pe structura de susținere sau pe stații dedicate), în locul arhitecturii clasice cu invertoare centrale de mare putere amplasate în posturi de transformare. Invertoarele de tip string oferă o granularitate superioară a MPPT (fiecare string sau grup redus de string-uri este optimizat independent), reducând pierderile de nepotrivire (mismatch losses) cauzate de umbrire parțială, murdărire neuniformă sau degradare diferențiată a modulelor, precum și o disponibilitate globală mai ridicată a parcului, întrucât defectarea unui invertor afectează doar o fracțiune redusă din puterea instalată, fără a compromite producția întregului câmp. Invertoarele centrale rămân, totuși, o opțiune tehnică validă pentru proiecte de dimensiuni foarte mari cu teren omogen și fără risc de umbrire, unde densitatea de putere pe unitatea de cost de instalare poate fi avantajoasă.</p>\n\n<p>Randamentul de conversie al invertoarelor moderne, exprimat ca randament european ponderat (Euro-eta, care ține cont de distribuția statistică a nivelurilor de încărcare pe parcursul unui an tipic), depășește în prezent 98%, ajungând la 98,5%–99% la modelele de vârf. Un parametru de dimensionare esențial, tratat distinct în capitolul de calcul al producției, este ILR (Inverter Loading Ratio), respectiv raportul dintre puterea instalată în module (kWp c.c.) și puterea nominală a invertorului (kW c.a.). Supradimensionarea câmpului fotovoltaic față de puterea invertorului (ILR tipic 1,10–1,30 pentru module fixe și 1,05–1,20 pentru trackere) permite invertorului să opereze la un factor de utilizare mai ridicat pe parcursul zilei, în special în orele de dimineață și de după-amiază, când radiația incidentă este sub valoarea de vârf, reducând astfel numărul de ore de funcționare la sarcină parțială redusă (unde randamentul de conversie scade) și diminuând costul specific de investiție per kWh produs; contrapartida este o pierdere marginală (clipping) în orele de radiație maximă, atunci când puterea c.c. disponibilă depășește capacitatea nominală a invertorului, pierdere care este, de regulă, mult mai mică decât beneficiul obținut din factorul de utilizare superior, motiv pentru care ILR-ul optim rezultă dintr-o optimizare economică, nu dintr-un raport 1:1. Invertoarele actuale integrează, conform reglementărilor tehnice de racordare emise de operatorii de distribuție/transport și a codurilor de rețea aplicabile, funcții avansate de suport de rețea (grid support), respectiv reglaj de putere reactivă (Q) la cererea dispecerului, limitare a puterii active la comandă externă, participare la reglajul de frecvență-putere și comportament specific la perturbații de tensiune (fault ride-through), fiind certificate conform reglementărilor ANRE privind condițiile tehnice de racordare a capacităților de producere la rețelele electrice. Monitorizarea și telegestiunea parcului se realizează printr-un sistem SCADA (Supervisory Control and Data Acquisition) care colectează în timp real parametrii de funcționare ai fiecărui invertor (putere, tensiune, curent, temperatură, cod de eroare), ai stațiilor meteo amplasate în incintă (radiație solară, temperatură ambientală, viteza vântului) și ai punctului de racordare, permițând operatorului identificarea promptă a defecțiunilor, optimizarea mentenanței predictive și raportarea producției către operatorul de distribuție și către piața de energie.</p>\n\n<p><b>3.1.3. Structura de susținere (mounting)</b></p>\n\n<p>Structura de susținere are rolul de a poziționa modulele fotovoltaice la înclinarea și orientarea optime față de soare, de a transmite fundației încărcările din greutate proprie, vânt și zăpadă și de a permite, în cazul soluțiilor mobile, urmărirea traiectoriei solare pe parcursul zilei. Alegerea tipului de structură este una dintre deciziile tehnico-economice cu impactul cel mai mare asupra producției specifice, a costului de investiție și a costului de mentenanță al parcului, motiv pentru care cele trei variante uzuale — structură fixă, tracker monoax și tracker biax — sunt analizate comparativ mai jos, ca reper pentru justificarea soluției adoptate în scenariul recomandat.</p>\n\n<p>Structura fixă este soluția cu cea mai redusă complexitate mecanică: modulele sunt montate la un unghi de înclinare constant, optimizat pentru latitudinea și microclimatul amplasamentului (tipic apropiat de latitudinea locului, cu ajustări în funcție de raportul dorit între producția de vară și de iarnă), fără piese în mișcare, ceea ce reduce la minimum riscurile de defectare mecanică și necesarul de mentenanță. Este soluția tehnică adecvată terenurilor cu pantă neuniformă, amplasamentelor cu regim de vânt sever (unde suprafața expusă și momentul de răsturnare al unei structuri mobile ar impune fundații și mecanisme de blocare disproporționat de costisitoare) și proiectelor în care costul terenului este redus, permițând compensarea producției specifice mai scăzute prin densitatea de instalare (GCR — Ground Coverage Ratio, tipic 0,35–0,45) mai ridicată. Tracker-ul monoax rotește rândurile de module în jurul unei axe orizontale (de regulă orientată nord-sud), urmărind soarele de la est la vest pe parcursul zilei, ceea ce mărește captarea radiației directe în orele de dimineață și de după-amiază și conduce la un spor de producție anuală tipic de 10%–20% față de o structură fixă echivalentă, în funcție de latitudine și de claritatea atmosferică a amplasamentului; complexitatea mecanică este moderată (motoare, reductoare, sistem de control centralizat sau distribuit pe rânduri, algoritm de backtracking pentru evitarea auto-umbririi la unghiuri joase de soare), iar GCR-ul necesar este mai redus (tipic 0,25–0,35) pentru a permite rotația fără umbrire reciprocă între rânduri, ceea ce înseamnă un consum de teren mai mare pe unitatea de putere instalată. Tracker-ul biax adaugă o a doua axă de rotație, permițând urmărirea completă a poziției solare (azimut și elevație) și un spor teoretic de producție superior tracker-ului monoax, însă cu o complexitate mecanică, un cost de investiție și un necesar de mentenanță semnificativ mai ridicate, motiv pentru care utilizarea sa în proiecte utility-scale de mare capacitate este rară, fiind în general rezervată aplicațiilor de concentrare solară sau proiectelor de dimensiuni reduse unde suprafața de teren este puternic limitată și costul acesteia justifică investiția suplimentară.</p>\n\n<table>\n<tr><th>Criteriu</th><th>Structură fixă</th><th>Tracker monoax</th><th>Tracker biax</th></tr>\n<tr><td>Producție relativă (referință = fix 100%)</td><td>100%</td><td>110% – 120%</td><td>115% – 130%</td></tr>\n<tr><td>Complexitate mecanică</td><td>Redusă (fără piese mobile)</td><td>Medie (motor, reductor, control)</td><td>Ridicată (2 axe, control complex)</td></tr>\n<tr><td>Cost relativ de investiție</td><td>Referință (cel mai redus)</td><td>+15% – 30%</td><td>+30% – 50%</td></tr>\n<tr><td>Necesar de mentenanță</td><td>Minim</td><td>Moderat (verificare periodică motoare/senzori)</td><td>Ridicat (2 sisteme de acționare per structură)</td></tr>\n<tr><td>GCR tipic (Ground Coverage Ratio)</td><td>0,35 – 0,45</td><td>0,25 – 0,35</td><td>0,15 – 0,25</td></tr>\n<tr><td>Adecvare la teren cu pantă / vânt sever</td><td>Foarte bună</td><td>Bună, cu limitări pe pante mari</td><td>Limitată (sensibilă la vânt și pante)</td></tr>\n</table>\n\n<p>Selecția tipului de structură pentru scenariul recomandat rezultă din corelarea acestor caracteristici cu datele specifice amplasamentului (topografie, regim eolian conform SR EN 1991-1-4, disponibilitatea și costul terenului, buget de investiție), analiză detaliată în capitolele de dimensionare tehnică și de fundamentare economică a scenariilor.</p>\n\n<p><b>3.1.4. Posturile de transformare și racordul la rețeaua electrică</b></p>\n\n<p>Energia electrică produsă de invertoare la nivel de joasă tensiune (tipic 400–800 V c.a., în funcție de arhitectură) este colectată prin rețeaua internă de joasă tensiune și transformată la nivelul de medie tensiune al rețelei de distribuție (20 kV, uzual pentru proiectele racordate la rețeaua de distribuție) în posturi de transformare (PT) amplasate distribuit în incinta parcului, în punctele de concentrare a puterii provenite de la grupurile de invertoare arondate. Soluția constructivă uzuală pentru PT-urile parcurilor fotovoltaice este cea containerizată (skid metalic prefabricat, echipat integral în fabrică și transportat pe amplasament), alternativa fiind construcția unei clădiri dedicate din zidărie sau structură metalică; ambele soluții trebuie să respecte cerințele normativelor tehnice energetice (PE și NTE aplicabile posturilor de transformare) referitoare la gabarite, ventilație, bazine de retenție a uleiului (în cazul transformatoarelor în ulei), rezistență la foc și acces pentru intervenție. Echiparea electrică a PT-ului cuprinde, în configurația tipică: celule de medie tensiune (celulă de sosire/plecare cu întrerupător sau separator de sarcină, celulă de protecție a transformatorului cu siguranțe fuzibile sau întrerupător și relee de protecție), transformatorul de putere propriu-zis — în variantă cu ulei mineral (soluție consacrată, cost specific redus, dar cu cerințe suplimentare de retenție și stingere a incendiului) sau în variantă uscată/rășină (fără risc de scurgere de ulei, recomandată în proximitatea zonelor sensibile din punct de vedere al protecției mediului), precum și sistemul de protecții electrice (protecție diferențială, protecție de suprasarcină și scurtcircuit, protecție de punere la pământ), integrat în sistemul general de protecție al parcului și coordonat cu cerințele operatorului de distribuție.</p>\n\n<p>Colectarea energiei de la posturile de transformare distribuite către punctul unic de racordare la rețeaua electrică se realizează printr-o rețea internă de medie tensiune, materializată prin linie electrică subterană (LES) de 20 kV, soluție preferată în detrimentul liniei aeriene din considerente de siguranță, de reducere a impactului vizual asupra peisajului și de reducere a riscului de avarie cauzat de factori meteorologici sau de intervenția asupra terenului agricol adiacent. Punctul de racordare la rețeaua electrică existentă (stație de transformare a operatorului de distribuție/transport sau, după caz, un alt punct de injecție stabilit prin studiul de soluție) este determinat prin Avizul Tehnic de Racordare (ATR), document emis de operatorul de rețea competent în urma parcurgerii procedurii reglementate de legislația secundară ANRE, care stabilește condițiile tehnice, soluția de racordare, puterea aprobată spre evacuare și eventualele lucrări de întărire a rețelei necesare pentru absorbția puterii instalate a parcului fără afectarea siguranței și calității în alimentare a celorlalți consumatori/producători din zonă. Obținerea ATR și, ulterior, a Avizului de Racordare final, precum și încheierea contractelor de racordare și de furnizare a serviciilor de rețea cu operatorul de distribuție/transport constituie condiții obligatorii, de natură administrativă și tehnică, pentru punerea sub tensiune și funcționarea comercială a capacității de producere, alături de autorizația de înființare și, ulterior, licența de exploatare comercială emise de ANRE în temeiul Legii nr. 123/2012.</p>\n\n<p><b>3.1.5. Infrastructura conexă</b></p>\n\n<p>Funcționarea în condiții de siguranță, eficiență și continuitate a parcului fotovoltaic necesită, alături de echipamentele de producție propriu-zise, un ansamblu de infrastructură conexă care asigură accesul, protecția fizică, monitorizarea și continuitatea în exploatare. Drumurile interioare de exploatare, dimensionate corespunzător pentru accesul utilajelor de execuție în perioada de construcție și, ulterior, al vehiculelor de mentenanță, sunt amenajate din materiale care permit scurgerea apelor pluviale fără eroziune (balast compactat, piatră spartă sau, punctual, îmbrăcăminte ușoară), realizând conexiunea între posturile de transformare, punctul de racordare, împrejmuire și eventualele obiective conexe (clădire operator, punct de comandă). Împrejmuirea perimetrală a incintei, cu o înălțime uzuală de minimum 2,0–2,2 m, îndeplinește un dublu rol: pe de o parte, protecția patrimoniului tehnologic (module, invertoare, cablaj de cupru, echipamente din PT) împotriva sustragerii și a intruziunii accidentale, iar pe de altă parte, delimitarea juridică și funcțională a zonei tehnologice a parcului, în care accesul este restricționat din motive de siguranță electrică (prezența unor circuite de curent continuu și alternativ la tensiuni și puteri care prezintă risc pentru persoane neinstruite). Sistemul de securitate perimetrală integrează, în configurația uzuală actuală, supraveghere video (CCTV) cu funcție de detecție a mișcării/analiză video și, în funcție de nivelul de risc evaluat, un sistem de detecție a intruziunii (senzori pe împrejmuire, fibră optică de detecție vibrațională sau bariere cu microunde), ambele integrate într-un centru local sau la distanță de monitorizare, cu transmisie a alarmelor către personalul de intervenție.</p>\n\n<p>Sistemul de monitorizare a producției (SCADA/telegestiune), descris în secțiunea dedicată invertoarelor, este completat de instrumentele de măsurare comercială a energiei livrate în punctul de racordare (contoare de decontare, conforme cerințelor operatorului de rețea și ale pieței de energie) și de senzorii meteorologici amplasați reprezentativ în incintă, ale căror date sunt utilizate atât pentru urmărirea în timp real a performanței față de producția teoretică estimată (performance ratio), cât și pentru validarea garanțiilor de performanță acordate de furnizorii de echipamente. Protecția la trăsnet și priza de pământ constituie o componentă de siguranță obligatorie, dimensionată conform normativelor specifice (paratrăsnet cu vârfuri active sau plasă de captare, conductoare de descărcare, priză de pământ dimensionată pentru rezistența de dispersie impusă), având în vedere expunerea semnificativă a câmpului fotovoltaic la descărcări atmosferice directe și indirecte, ca urmare a suprafeței mari, a poziției descoperite și a prezenței structurilor metalice conductive pe toată suprafața parcului. Cablarea de curent continuu, între module și cutiile de conexiuni (string combiner box) și între acestea și invertoare, este realizată cu cabluri solare certificate, rezistente la radiație UV și la variații termice, protejate mecanic pe traseele expuse (tuburi de protecție, jgheaburi de cablu) și fixate pe structura de susținere astfel încât să nu introducă puncte de umbrire, iar cablarea de curent alternativ, între invertoare și posturile de transformare, respectiv între PT-uri și punctul de racordare, este realizată subteran, în șanțuri de cablu dimensionate conform normativelor de instalații electrice, cu respectarea distanțelor de siguranță față de alte utilități subterane existente pe amplasament.</p>\n\n";
      var _CAP3_SPECTABLE = "<p><b>3.1.6 Specificații tehnice tipice de referință ale echipamentelor principale</b></p>\n\n<table>\n<tr><th>Componentă</th><th>Parametru</th><th>Valori tipice de referință</th></tr>\n<tr><td>Modul fotovoltaic</td><td>Putere unitară (Wp)</td><td>550 – 720 Wp</td></tr>\n<tr><td>Modul fotovoltaic</td><td>Eficiență de conversie</td><td>20,5% – 24,5% (PERC / TOPCon / HJT)</td></tr>\n<tr><td>Modul fotovoltaic</td><td>Dimensiuni uzuale</td><td>2,0 – 2,4 m x 1,1 – 1,3 m</td></tr>\n<tr><td>Modul fotovoltaic</td><td>Degradare anuală tipică</td><td>0,4% – 0,6% / an</td></tr>\n<tr><td>Invertor</td><td>Randament european (Euro-eta)</td><td>98,0% – 99,0%</td></tr>\n<tr><td>Invertor</td><td>Grad de protecție (IP rating)</td><td>IP65 – IP66 (exterior)</td></tr>\n<tr><td>Invertor</td><td>ILR (Inverter Loading Ratio)</td><td>1,05 – 1,30, în funcție de tipul structurii</td></tr>\n<tr><td>Structură de susținere</td><td>GCR – montaj fix</td><td>0,35 – 0,45</td></tr>\n<tr><td>Structură de susținere</td><td>GCR – tracker monoax</td><td>0,25 – 0,35</td></tr>\n<tr><td>Structură de susținere</td><td>GCR – tracker biax</td><td>0,15 – 0,25</td></tr>\n<tr><td>Post de transformare</td><td>Tensiune de colectare</td><td>20 kV (medie tensiune)</td></tr>\n<tr><td>Post de transformare</td><td>Tip transformator</td><td>Ulei mineral sau uscat/rășină</td></tr>\n</table>\n\n<p>Valorile prezentate în tabelul de mai sus constituie repere generice de piață, uzuale pentru echipamentele disponibile comercial la data elaborării prezentului studiu, și au caracter orientativ pentru evaluarea tehnică comparativă a scenariilor; parametrii specifici efectiv adoptați pentru dimensionarea proiectului — putere unitară de modul, model de invertor, tip de structură și configurație a posturilor de transformare — rezultă din calculele de dimensionare tehnică prezentate în capitolele următoare, pe baza datelor de amplasament, a puterii aprobate spre evacuare prin avizul tehnic de racordare și a analizei economice comparative a soluțiilor disponibile.</p>";
      var _CAP3_COMPARE = "<p><b>3.2.3 Sinteza comparativă a scenariilor</b></p>\n\n<p>Evaluarea variantelor tehnico-economice ale prezentului studiu de fezabilitate s-a realizat prin compararea Scenariului I (varianta recomandată, detaliată cu indicatorii de dimensionare, cost și performanță în subcapitolele următoare) cu Scenariul II, constituit ca variantă contrafactuală de referință (situația fără implementarea proiectului, respectiv continuarea alimentării cu energie electrică exclusiv din rețea, la mixul energetic național/local existent), precum și, cu titlu analitic, cu o a treia variantă tehnică posibilă, denumită în continuare Scenariul III, examinată și motiv pentru care a fost respinsă în favoarea Scenariului I.</p>\n\n<p>Din perspectiva impactului asupra emisiilor de gaze cu efect de seră, Scenariul I este net superior Scenariului II: producerea energiei electrice din sursă solară fotovoltaică nu implică emisii directe de dioxid de carbon, oxizi de azot sau pulberi în faza de exploatare, singurele emisii asociate ciclului de viață al proiectului fiind cele înglobate în fabricarea, transportul și instalarea echipamentelor (energie gri), amortizate pe durata de viață a instalației într-un interval scurt față de durata totală de exploatare de 25–30 de ani; în contrast, Scenariul II presupune continuarea dependenței de energia furnizată din rețea, al cărei mix de producție, în măsura în care include capacități pe combustibili fosili, perpetuează un nivel de emisii asociat consumului analizat, fără nicio perspectivă de reducere pe orizontul de analiză. Din punctul de vedere al costului pe termen lung, Scenariul I prezintă avantajul specific tehnologiei fotovoltaice de a avea un cost marginal de producție practic nul după recuperarea investiției inițiale (costurile de exploatare fiind limitate la mentenanță, asigurări și, după caz, redevențe/chirie teren), în timp ce Scenariul II expune integral costul asociat la evoluția prețului energiei electrice pe piața angro, evoluție caracterizată în ultimul deceniu de o volatilitate accentuată și de o tendință structurală de creștere corelată cu prețul certificatelor de emisii de carbon și cu costul combustibililor fosili pe piețele internaționale; investiția în capacitatea proprie de producție are, astfel, și un rol de acoperire (hedging) împotriva acestei volatilități, transformând o parte semnificativă a costului energetic dintr-un cost variabil, expus pieței, într-un cost fix, previzibil pe termen lung. Din perspectiva independenței energetice, Scenariul I contribuie la reducerea gradului de dependență a zonei/beneficiarului de importurile de energie și de infrastructura de transport pe distanțe lungi, aliniindu-se totodată obiectivelor naționale și europene de creștere a ponderii surselor regenerabile în mixul energetic, în timp ce Scenariul II perpetuează starea actuală de dependență, fără a contribui la aceste obiective. Din perspectiva riscurilor de piață, Scenariul II este mai expus riscului reglementat/tarifar (modificări ale tarifelor de rețea, ale schemelor de sprijin sau ale fiscalității energetice aplicate consumului), în timp ce Scenariul I este expus, în schimb, unor riscuri specifice producției (variabilitate meteorologică interanuală, risc tehnologic de degradare a echipamentelor peste rata proiectată), riscuri care sunt însă cuantificabile, asigurabile și mitigabile prin garanțiile contractuale ale furnizorilor de echipamente și prin structura de mentenanță preventivă, spre diferență de riscul de piață al Scenariului II, care este structural și nu poate fi controlat de beneficiar.</p>\n\n<p>Scenariul III, analizat cu titlu comparativ, ar fi presupus adoptarea unei configurații tehnice alternative celei recomandate în Scenariul I — fie prin utilizarea unei structuri de susținere de tip tracker în locul soluției adoptate, fie prin dimensionarea unei capacități instalate diferite de cea optimă rezultată din analiza terenului disponibil și a puterii aprobate spre evacuare prin avizul tehnic de racordare. Această variantă a fost respinsă motivat, întrucât complexitatea mecanică și necesarul de mentenanță suplimentar al unei soluții de tip tracker nu se justifică economic pentru caracteristicile topografice și eoliene ale amplasamentului analizat (conform argumentației tehnice expuse la subcapitolul privind structurile de susținere), respectiv, în cazul unei capacități instalate alternative, dimensionarea propusă nu ar fi valorificat optim puterea aprobată prin avizul tehnic de racordare sau suprafața de teren disponibilă, conducând la un indicator de eficiență a investiției (cost specific pe kWp instalat sau pe kWh produs) inferior celui obținut în Scenariul I. În consecință, pe baza analizei tehnice, economice și de risc expuse mai sus, Scenariul I este scenariul recomandat pentru implementare, urmând ca dimensionarea tehnică detaliată, indicatorii de cost și indicatorii de eficiență economico-financiară ai acestuia, în comparație directă cu Scenariul II, să fie prezentați în subcapitolele următoare ale prezentului studiu de fezabilitate.</p>\n\n";
      var _CAP4_METHOD = "<p><b>4.1. Metodologia analizei economice și financiare</b></p>\n\n<p>Analiza economică a proiectului de parc fotovoltaic prezentat în capitolele următoare a fost elaborată în conformitate cu prevederile Hotărârii Guvernului nr. 907/2016 privind etapele de elaborare și conținutul-cadru al documentațiilor tehnico-economice aferente investițiilor publice, precum și a structurilor tehnice de aprobare a acestora, coroborate cu metodologia de referință la nivel european, respectiv „Guide to Cost-Benefit Analysis of Investment Projects” (Comisia Europeană, Direcția Generală Politică Regională și Urbană). Această din urmă metodologie constituie referința tehnică utilizată în mod curent pentru evaluarea proiectelor de investiții cu finanțare publică sau mixtă, inclusiv a proiectelor din domeniul energiei, și este menită să asigure o evaluare unitară, transparentă și comparabilă a viabilității investiționale, indiferent de sursa de finanțare.</p>\n\n<p>Un element fundamental al metodologiei este distincția clară între <b>analiza financiară</b> și <b>analiza economică</b> a proiectului. Analiza financiară are ca obiect evaluarea performanței investiției din perspectiva investitorului (sau a operatorului), pe baza fluxurilor de numerar efectiv generate și consumate de proiect — venituri din vânzarea energiei electrice, costuri de investiție (CAPEX), costuri de operare și mentenanță (OPEX), costuri de finanțare, impozite și taxe. Rezultatele acesteia (Valoarea Actualizată Netă Financiară — VANF, Rata Internă de Rentabilitate Financiară — RIRF) răspund la întrebarea dacă proiectul este sustenabil financiar, respectiv dacă generează suficient numerar pentru a-și acoperi costurile de operare și obligațiile de finanțare, fără a necesita infuzii adiționale de capital. Analiza economică, la rândul ei, corectează fluxurile financiare pentru a reflecta costul de oportunitate real al resurselor pentru societate, eliminând transferurile pur contabile (taxe, subvenții) și introducând, unde este relevant, externalitățile pozitive și negative ale proiectului (emisii evitate de gaze cu efect de seră, poluanți atmosferici evitați prin substituirea producției din combustibili fosili, impact asupra ocupării forței de muncă locale). Pentru un proiect de producere a energiei electrice din surse renovabile, precum cel de față, analiza economică tinde să confirme și să amplifice concluziile analizei financiare, întrucât externalitățile asociate producției fotovoltaice sunt, în marea lor majoritate, pozitive.</p>\n\n<p>Actualizarea fluxurilor de numerar la momentul prezent este o etapă obligatorie a analizei, întrucât o unitate monetară disponibilă astăzi are o valoare economică superioară aceleiași unități monetare disponibile într-un orizont de timp viitor, ca urmare a costului de oportunitate al capitalului, a riscului inerent oricărei proiecții pe termen lung și a preferinței temporale a agenților economici. Rata de actualizare (rata de discount) utilizată în calcul reflectă exact acest cost de oportunitate. Metodologia europeană de analiză cost-beneficiu recomandă, pentru proiectele publice sau cu finanțare publică din statele membre eligibile pentru politica de coeziune — categorie în care se încadrează România —, utilizarea unei rate sociale de actualizare de referință de aproximativ 5%, calculată pe baza costului mediu al capitalului pe termen lung la nivelul economiei și a unei prime de risc sistemic asociată investițiilor publice. Pentru proiectele cu finanțare exclusiv privată sau cu componentă privată semnificativă, rata de actualizare adecvată este costul mediu ponderat al capitalului (Weighted Average Cost of Capital — WACC), calculat ca medie ponderată a costului capitalului propriu (estimat, de regulă, prin modelul CAPM — Capital Asset Pricing Model) și a costului capitalului împrumutat (rata dobânzii aferentă finanțării bancare sau obligatare, ajustată cu scutul fiscal generat de deductibilitatea dobânzii). Alegerea ratei de actualizare influențează decisiv rezultatul analizei: o rată mai mare penalizează fluxurile îndepărtate în timp (adică exact perioada în care producția fotovoltaică, odată amortizată investiția inițială, generează marja cea mai favorabilă), motiv pentru care selecția acesteia trebuie justificată explicit și tratată ca variabilă de senzitivitate.</p>\n\n<p>Orizontul de analiză adoptat pentru proiectele de tip parc fotovoltaic se situează, în practica europeană consacrată și în prezenta documentație, între 20 și 25 de ani. Această alegere nu este arbitrară, ci derivă direct din durata de viață utilă garantată a echipamentului principal al instalației — modulele fotovoltaice. Producătorii de module de nivel Tier 1 oferă în mod standard o garanție de produs de 10–15 ani și o garanție de performanță (putere garantată) de 25–30 de ani, cu curbe de degradare liniară care asigură un randament rezidual de peste 80% din puterea nominală la finalul perioadei garantate. Orizontul de analiză de 20–25 de ani este, așadar, congruent cu durata contractuală a garanției de performanță și permite o evaluare realistă a ciclului economic complet al investiției, de la punerea în funcțiune până la momentul în care producția reziduală și costurile crescute de mentenanță (inclusiv necesitatea potențială a înlocuirii invertoarelor) determină o decizie de repowering sau de dezafectare. Fluxurile de numerar generate în anii finali ai orizontului de analiză, deși actualizate la o pondere redusă în VAN, sunt totuși relevante pentru evaluarea corectă a Ratei Interne de Rentabilitate și pentru fundamentarea deciziei privind valoarea reziduală a activului la finalul perioadei de analiză.</p>\n\n<p><b>4.1.1. Indicatorul LCOE (Levelized Cost of Energy)</b></p>\n\n<p>Alături de indicatorii clasici de eficiență a investiției — Valoarea Actualizată Netă (VAN) și Rata Internă de Rentabilitate (RIR) —, analiza economică a proiectului include indicatorul LCOE (Levelized Cost of Energy, respectiv Costul Egalizat al Energiei), consacrat la nivel internațional ca instrument de comparabilitate între tehnologii de producere a energiei electrice cu profiluri de cost și de producție fundamental diferite. Conceptual, LCOE reprezintă costul mediu actualizat pe unitatea de energie produsă pe întreaga durată de viață a instalației și se calculează ca raport între suma actualizată a tuturor costurilor asociate proiectului (investiția inițială CAPEX, costurile anuale de operare și mentenanță OPEX, costurile de finanțare și, unde este cazul, costurile de dezafectare) și suma actualizată a întregii producții de energie electrică estimate pe durata de viață a instalației, actualizate ambele cu aceeași rată de discount r, pe fiecare an t al orizontului de analiză.</p>\n\n<p>Utilitatea principală a indicatorului LCOE constă în faptul că exprimă costul complet al energiei produse într-o unitate omogenă (lei/MWh sau EUR/MWh), permițând compararea directă a proiectului cu: (i) prețul mediu de piață al energiei electrice angro (prețul de referință OPCOM, PZU — Piața pentru Ziua Următoare), pentru a evalua viabilitatea proiectului fără sprijin financiar suplimentar (grid parity); (ii) costul egalizat al altor tehnologii de producere a energiei electrice (eoliană, gaze naturale, hidro), pentru fundamentarea deciziilor de politică energetică și de alocare a resurselor de investiție; și (iii) nivelul unor eventuale contracte de vânzare a energiei pe termen lung (PPA), pentru evaluarea marjei economice reale a operatorului. Un LCOE inferior prețului mediu de piață constituie un indicator solid al viabilității proiectului în absența oricărei scheme de sprijin, în timp ce un LCOE apropiat sau superior prețului de piață impune o analiză atentă a structurii de cost și a premiselor de producție utilizate.</p>\n\n<p><b>4.1.2. Degradarea anuală a producției de energie</b></p>\n\n<p>Fluxurile de venit ale proiectului nu sunt constante pe întreaga durată de analiză, întrucât puterea de ieșire a modulelor fotovoltaice se degradează progresiv, ca urmare a proceselor fizico-chimice ireversibile asociate expunerii îndelungate la radiație ultravioletă, ciclurilor termice zi-noapte și variațiilor sezoniere de temperatură (degradare indusă de lumină — LID, degradare potențial indusă — PID, micro-fisurare a celulelor, decolorarea encapsulantului). Producătorii de module fotovoltaice cuantifică acest fenomen prin curba de garanție a performanței, exprimată de regulă astfel: o degradare inițială mai accentuată în primul an de exploatare (uzual 1–2%, asociată în principal fenomenului LID), urmată de o degradare anuală liniară, sensibil mai redusă, tipic în intervalul 0,35–0,55% pe an pentru tehnologiile monocristaline de ultimă generație (PERC, TOPCon, HJT), până la un nivel garantat de putere reziduală la finalul perioadei de garanție (uzual 80–87,4% din puterea nominală inițială, la 25–30 de ani, în funcție de producător și de tehnologie). Includerea explicită a acestui factor de degradare în modelul de proiecție a producției anuale de energie electrică este esențială pentru realismul analizei economice: ignorarea degradării ar conduce la o supraestimare sistematică a veniturilor din anii finali ai orizontului de analiză și, implicit, la o subestimare a riscului investițional. Factorul de degradare adoptat în prezentul studiu este corelat cu garanția de performanță oferită de producătorul modulelor prevăzut în soluția tehnică, aplicat cumulat asupra producției anuale estimate pe baza resursei solare locale (iradiație orizontală/pe planul înclinat, conform bazelor de date meteorologice de referință — PVGIS, Meteonorm) și a randamentului de sistem (performance ratio).</p>\n\n<p><b>4.1.3. Structura costurilor de operare (OPEX)</b></p>\n\n<p>Costurile de operare și mentenanță ale unui parc fotovoltaic, deși semnificativ inferioare, ca pondere în costul total al energiei produse, costurilor de operare ale unei centrale convenționale (nu există costuri de combustibil), nu sunt neglijabile și trebuie modelate cu un nivel corespunzător de detaliu pentru a evita subestimarea fluxurilor de cost pe durata de viață a instalației. Structura tipică a OPEX pentru un parc fotovoltaic la scară utilitară include următoarele categorii principale, prezentate în tabelul de mai jos cu ponderi orientative în cadrul costului total anual de operare (ponderile efective variază în funcție de dimensiunea instalației, de soluția tehnică adoptată — fixă sau cu tracker, de locația geografică și de structura contractuală de mentenanță):</p>\n\n<table>\n<tr><th>Categoria de cost OPEX</th><th>Descriere</th><th>Pondere orientativă în OPEX anual</th></tr>\n<tr><td>Mentenanță preventivă</td><td>Inspecții periodice, verificări termografice, control conexiuni electrice, verificare structuri de fixare</td><td>20–25%</td></tr>\n<tr><td>Mentenanță corectivă</td><td>Remedierea defecțiunilor semnalate de sistemul de monitorizare (invertoare, string-uri, conectori, cabluri)</td><td>15–20%</td></tr>\n<tr><td>Curățare module</td><td>Îndepărtarea prafului, polenului, depunerilor de sol și a zăpezii, pentru limitarea pierderilor de tip soiling</td><td>8–12%</td></tr>\n<tr><td>Mentenanța vegetației și a terenului</td><td>Cosire/pășunat controlat, întreținere căi de acces, drenaj</td><td>5–8%</td></tr>\n<tr><td>Asigurare (all-risk + întrerupere activitate)</td><td>Poliță de asigurare a activelor și a producției (business interruption)</td><td>10–15%</td></tr>\n<tr><td>Chirie/impozit teren</td><td>Redevență teren (dacă este cazul) și impozit local pe teren/clădiri</td><td>8–12%</td></tr>\n<tr><td>Administrare, monitorizare, securitate</td><td>Personal administrativ, sistem SCADA/monitorizare, pază și supraveghere video</td><td>10–15%</td></tr>\n<tr><td>Provizion înlocuire invertoare</td><td>Fond anual constituit pentru înlocuirea invertoarelor centrale/string, cu durată de viață tipică de 12–15 ani</td><td>8–12%</td></tr>\n</table>\n\n<p>Dintre aceste categorii, provizionul pentru înlocuirea invertoarelor merită o mențiune distinctă, întrucât reprezintă singurul cost de tip CAPEX intercalat în fluxul de OPEX pe durata de analiză: invertoarele, indiferent de topologie (centrale sau string), au o durată de viață electronică semnificativ mai redusă decât cea a modulelor fotovoltaice și a structurii de susținere, motiv pentru care este necesară, în orizontul de 20–25 de ani, cel puțin o operațiune de înlocuire integrală sau parțială a acestora, uzual în jurul anului 12–15 de operare. Modelul financiar tratează această cheltuială fie ca provizion anual constituit progresiv, fie ca ieșire de numerar punctuală în anul estimat de înlocuire, ambele variante fiind acceptate de metodologie, cu condiția reflectării corecte a impactului asupra cash-flow-ului anului respectiv.</p>\n\n<p><b>4.1.4. Structuri de finanțare analizate</b></p>\n\n<p>Viabilitatea și profilul de risc al proiectului sunt influențate direct de structura de finanțare adoptată. Analiza economică a avut în vedere principalele variante utilizate în practica de piață pentru proiecte de generare fotovoltaică, fiecare cu implicații specifice asupra costului capitalului, asupra profilului de risc și asupra distribuției fluxurilor de numerar între investitor și finanțator:</p>\n\n<p><b>(a) Finanțare 100% din capital propriu (equity).</b> Varianta elimină riscul de finanțare și obligațiile de rambursare rigidă, oferind investitorului flexibilitate deplină asupra utilizării fluxurilor de numerar generate. În contrapartidă, costul capitalului propriu este, de regulă, superior costului datoriei (ca urmare a primei de risc solicitate de acționari), astfel încât rentabilitatea proiectului, exprimată prin RIR de proiect, nu beneficiază de efectul de levier financiar (financial leverage), iar capitalul mobilizat este integral expus riscului investițional pe toată durata proiectului.</p>\n\n<p><b>(b) Finanțare mixtă equity + debt (project finance).</b> Structura de tip project finance, larg utilizată pentru proiectele de energie renovabilă la scară utilitară, presupune finanțarea unei ponderi semnificative a CAPEX (uzual 60–80%) prin credit bancar sau obligatar, rambursat exclusiv din fluxurile de numerar generate de proiect (finanțare fără recurs sau cu recurs limitat — non-recourse/limited-recourse financing), cu constituirea de garanții specifice (cesiune de creanță asupra contractelor de vânzare a energiei, ipotecă asupra activelor, cont escrow pentru serviciul datoriei). Această structură permite valorificarea efectului de levier financiar — RIR-ul capitalului propriu (RIR equity) poate fi semnificativ superior RIR-ului de proiect, atât timp cât costul mediu al datoriei este inferior randamentului proiectului — dar introduce constrângeri suplimentare, cuantificate prin indicatori precum DSCR (Debt Service Coverage Ratio, uzual solicitat la un nivel minim de 1,2–1,4), și impune o disciplină contractuală strictă privind distribuirea de dividende înainte de acoperirea integrală a serviciului datoriei.</p>\n\n<p><b>(c) Leasing operațional.</b> Varianta permite operatorului utilizarea activului (parcul fotovoltaic sau componente ale acestuia) fără mobilizarea capitalului propriu inițial aferent achiziției, în schimbul unor plăți periodice de leasing, cu posibilitate de opțiune de achiziție la finalul contractului. Structura este mai puțin utilizată pentru proiecte de generare la scară utilitară, dar poate fi relevantă pentru componente specifice (de exemplu, echipamente de conectare la rețea) sau pentru proiecte de dimensiuni mai reduse, unde flexibilitatea bilanțieră este prioritară în raport cu costul total marginal superior al finanțării prin leasing.</p>\n\n<p><b>(d) Contract de vânzare a energiei pe termen lung — PPA (Power Purchase Agreement) cu offtaker corporate.</b> Mecanismul PPA presupune contractarea vânzării unei ponderi din producția de energie electrică către un consumator corporate (offtaker), la un preț fix sau indexat, pe o durată contractuală tipică de 10–15 ani, fie sub formă fizică (livrare directă), fie sub formă financiară/virtuală (contract for difference față de prețul de piață). Principalul avantaj al PPA este certitudinea veniturilor pe o perioadă semnificativă, care reduce expunerea proiectului la volatilitatea prețului spot al energiei electrice și facilitează, în consecință, obținerea unei finanțări prin datorie în condiții mai favorabile (bancabilitate superioară). Dezavantajul constă în plafonarea potențialului de câștig în perioadele de preț de piață favorabil (upside limitat), precum și în riscul de contraparte asociat bonității offtaker-ului și al eventualei rezilieri a contractului, aspect tratat distinct în capitolul de analiză a riscurilor.</p>\n\n";
      var _CAP4_RISK = "<p>Analiza de risc a proiectului urmează structura consacrată în practica de evaluare a proiectelor de investiții din sectorul energetic, respectiv gruparea factorilor de risc în patru categorii principale — naturale, antropice, de piață și legislative, respectiv tehnice —, fiecare dintre acestea fiind evaluată din perspectiva probabilității de manifestare, a impactului potențial asupra performanței economice a proiectului și a măsurilor de atenuare disponibile.</p>\n\n<p><b>Riscuri naturale.</b> Categoria riscurilor naturale include, în principal, evenimentele meteorologice extreme (grindină, vânt extrem, încărcări de zăpadă neuzuale pentru zona climatică), riscul seismic și riscul de inundabilitate a amplasamentului. Trebuie remarcat că, pentru instalațiile fotovoltaice la scară utilitară, structura de susținere a modulelor (mesele fotovoltaice) este dimensionată predominant în raport cu acțiunea vântului (conform SR EN 1991-1-4), aceasta fiind, în majoritatea configurațiilor, acțiunea dominantă asupra elementelor ușoare cu suprafață expusă mare, în timp ce acțiunea seismică rămâne relevantă și obligatoriu de verificat pentru elementele cu masă concentrată semnificativă — posturile de transformare, containerele de invertoare centrale și ancorajele/fundațiile acestora. Riscul de grindină extremă merită o atenție particulară în contextul actual, având în vedere frecvența crescută a evenimentelor de grindină de mare intensitate semnalate în ultimul deceniu pe teritoriul național, cu potențial de deteriorare a stratului superior al modulelor (sticla frontală) și, implicit, de reducere a producției și de generare a unor costuri de înlocuire neplanificate; măsura de atenuare principală constă în selectarea de module certificate pentru rezistență la impact ridicat (grad de protecție testat conform standardelor IEC 61215, clasa de rezistență la grindină superioară) și în contractarea unei polițe de asigurare de tip all-risk care să acopere explicit acest hazard.</p>\n\n<p><b>Riscuri antropice.</b> Riscurile de natură antropică includ furtul de echipamente (cabluri de cupru, module, componente ale invertoarelor) și actele de vandalism, riscuri cu incidență semnificativă statistic pentru parcurile fotovoltaice amplasate în zone izolate, insuficient iluminate sau fără sistem de supraveghere activă. Impactul acestor evenimente nu se limitează la costul de înlocuire a echipamentului sustras, ci include și pierderea de producție pe durata întreruperii, precum și, în cazuri repetate, majorarea primelor de asigurare la reînnoirea polițelor. Măsurile de atenuare consacrate includ împrejmuirea perimetrală cu sistem de detecție a intruziunii, supraveghere video cu monitorizare la distanță, iluminat de securitate, marcarea/gravarea componentelor cu cod unic de identificare (pentru reducerea valorii de revânzare pe piața neagră) și, la nivel contractual, corelarea capacității de reacție a echipei de mentenanță cu timpul de răspuns garantat în caz de incident.</p>\n\n<p><b>Riscuri de piață și legislative.</b> Această categorie cuprinde volatilitatea prețului energiei electrice pe piața angro, riscul de modificare a cadrului de sprijin pentru energia din surse renovabile și riscul valutar. Piața pentru Ziua Următoare (PZU) administrată de OPCOM a înregistrat, în ultimii ani, o volatilitate semnificativă a prețului de referință, generată de factori structurali (evoluția prețului gazelor naturale la nivel european, disponibilitatea capacităților de producție hidro și nucleară, gradul de interconectare regională) și de factori conjuncturali (crize energetice regionale, evenimente geopolitice). Această volatilitate afectează direct veniturile proiectelor care vând energia la prețul spot, motiv pentru care analiza de senzitivitate a proiectului tratează prețul energiei ca variabilă critică, iar structura de finanțare recomandată integrează, unde este posibil, mecanisme de acoperire a riscului de preț (hedging), fie prin contracte PPA cu preț fix sau indexat, fie prin instrumente financiare derivate (contracte futures pe energie electrică, contracte pentru diferență). Riscul de schimbare a schemei de sprijin (certificate verzi, contracte pentru diferență — CfD, scheme de tip feed-in premium) este relevant în măsura în care proiectul beneficiază sau intenționează să acceseze o astfel de schemă, orice modificare retroactivă sau anticipată a parametrilor acesteia putând afecta semnificativ profilul de venituri proiectat; măsura de atenuare constă în structurarea proiectului astfel încât viabilitatea sa financiară să nu fie dependentă exclusiv de schema de sprijin (testarea explicită a scenariului „merchant”, fără sprijin, în analiza de senzitivitate). Riscul valutar decurge din faptul că investiția inițială (CAPEX) este denominată, de regulă, integral sau majoritar în EUR (echipamente de import — module, invertoare, structuri de montaj), în timp ce o parte a veniturilor (în special cele provenite din contracte reglementate sau din vânzare pe piața locală) poate fi denominată în lei, expunând proiectul unui risc de depreciere a monedei naționale față de EUR pe durata de rambursare a finanțării.</p>\n\n<p><b>Riscuri tehnice.</b> Riscurile tehnice includ indisponibilitatea neplanificată a echipamentelor (invertoare, transformatoare, celule de medie tensiune), degradarea prematură a modulelor peste curba de garanție contractuală, defecte de proiectare sau execuție și indisponibilitatea rețelei electrice de distribuție/transport la care este racordat parcul. Un element central în gestionarea acestei categorii de risc este calitatea garanției de performanță (performance warranty) oferite de producătorul modulelor și bonitatea financiară a acestuia: o garanție de performanță este valoroasă doar în măsura în care producătorul dispune de capacitatea financiară și operațională de a o onora pe întreaga durată contractuală (25–30 de ani), motiv pentru care selecția furnizorilor de echipamente principale trebuie să integreze, alături de criteriile tehnice și de preț, o evaluare a solidității financiare, a istoricului de piață și a ratingului de tip Tier 1 (conform clasificărilor independente recunoscute în sector). În mod similar, garanția oferită de furnizorul de invertoare și disponibilitatea unui contract de mentenanță pe termen lung (inclusiv disponibilitatea piesele de schimb pe piața locală sau regională) reduc semnificativ riscul de indisponibilitate prelungită a instalației și, implicit, riscul de pierdere de producție neasigurată.</p>\n\n<table>\n<tr><th>Categorie</th><th>Risc identificat</th><th>Probabilitate</th><th>Impact</th><th>Măsură de atenuare</th></tr>\n<tr><td>Legislativ/administrativ</td><td>Întârziere la obținerea avizelor/autorizațiilor (racordare, construire, mediu)</td><td>Medie</td><td>Mediu</td><td>Depunere anticipată, monitorizare termene legale, consultanță de specialitate dedicată</td></tr>\n<tr><td>Tehnic/rețea</td><td>Indisponibilitate/congestie a rețelei electrice de racordare</td><td>Medie</td><td>Mare</td><td>Studiu de soluție de racordare actualizat, dialog activ cu OTS/OD, evaluare soluții de stocare</td></tr>\n<tr><td>Antropic</td><td>Furt de echipamente (cabluri, module) și vandalism</td><td>Medie</td><td>Mic</td><td>Împrejmuire, videosupraveghere, marcaj antifurt, asigurare all-risk</td></tr>\n<tr><td>Piață</td><td>Risc valutar (CAPEX în EUR, venituri parțial în lei)</td><td>Medie</td><td>Mediu</td><td>Structurare finanțare naturală hedge, contracte indexate EUR, instrumente de hedging valutar</td></tr>\n<tr><td>Piață/contractual</td><td>Reziliere sau neexecutare contract PPA de către offtaker</td><td>Mică</td><td>Mare</td><td>Evaluare bonitate offtaker, clauze contractuale de garanție și penalitate, diversificare portofoliu de vânzare</td></tr>\n<tr><td>Natural</td><td>Forță majoră (evenimente extreme neasigurabile integral)</td><td>Mică</td><td>Mare</td><td>Poliță all-risk cu clauze de forță majoră, plan de continuitate a activității</td></tr>\n<tr><td>Social</td><td>Risc reputațional/opoziție a comunității locale</td><td>Mică</td><td>Mediu</td><td>Consultare publică transparentă, parteneriate și compensații pentru comunitate</td></tr>\n<tr><td>Legislativ</td><td>Modificarea schemei de sprijin (certificate verzi/CfD)</td><td>Medie</td><td>Mediu</td><td>Testare scenariu „merchant” fără sprijin în analiza de senzitivitate</td></tr>\n<tr><td>Tehnic/geotehnic</td><td>Condiții geotehnice neconforme cu studiul preliminar (capacitate portantă piloni)</td><td>Mică</td><td>Mediu</td><td>Studiu geotehnic detaliat pe amplasament, teste de tragere piloni pilot</td></tr>\n<tr><td>Tehnic/electric</td><td>Supratensiuni/curenți de defect (descărcări atmosferice, defecte de izolație)</td><td>Medie</td><td>Mediu</td><td>Sistem de protecție la supratensiune (SPD), împământare conform normativ, relee de protecție diferențială</td></tr>\n<tr><td>Operațional</td><td>Indisponibilitatea mentenanței din lipsă de piese de schimb</td><td>Mică</td><td>Mediu</td><td>Contract O&amp;M pe termen lung cu stoc de piese critice, furnizor cu rețea regională de service</td></tr>\n<tr><td>Natural/climatic</td><td>Grindină extremă cu deteriorarea suprafeței modulelor</td><td>Mică</td><td>Mare</td><td>Module certificate rezistență la impact ridicat, asigurare all-risk cu clauză explicită grindină</td></tr>\n</table>\n\n<p>Trebuie menționat că evaluarea probabilității și a impactului fiecărui risc din tabelul de mai sus are caracter orientativ, fundamentat pe experiența acumulată la nivelul sectorului fotovoltaic național și regional, și nu substituie o evaluare de risc actualizată periodic pe durata de exploatare a proiectului. Se recomandă revizuirea matricei de risc cel puțin anual, cu ocazia raportării de performanță operațională, precum și ori de câte ori intervin modificări semnificative ale cadrului legislativ, ale condițiilor de piață sau ale stării tehnice a instalației.</p>";
      var _CAP4_ESG = "<p><b>4.4.1. Metodologia de calcul al emisiilor de gaze cu efect de seră evitate.</b> Beneficiul de mediu cel mai direct și mai ușor cuantificabil al proiectului constă în emisiile de gaze cu efect de seră evitate prin substituirea, în mixul energetic național, a unei cantități de energie electrică care ar fi fost altfel produsă din surse convenționale (predominant pe bază de combustibili fosili). Metodologia de calcul standard presupune multiplicarea producției anuale nete de energie electrică livrate în rețea cu factorul de emisie specific al Sistemului Electroenergetic Național, exprimat în tCO2/MWh. Acest factor de emisie este calculat și publicat periodic de autoritățile de reglementare și statistică competente (Autoritatea Națională de Reglementare în domeniul Energiei — ANRE, respectiv rapoartele de mediu ale operatorului de transport și de sistem), pe baza structurii reale a mixului de producție național (cărbune, gaze naturale, hidro, nuclear, eolian, solar) și reflectă, prin urmare, emisia medie evitată per unitate de energie produsă din surse renovabile, la un moment dat al evoluției mixului energetic. Este important de semnalat că acest factor de emisie are o traiectorie descrescătoare pe termen lung, pe măsură ce ponderea surselor renovabile în mixul național crește, astfel încât cuantificarea beneficiului de mediu al proiectului trebuie tratată ca o estimare la momentul actualizării, revizuibilă periodic pe măsura publicării unor factori de emisie actualizați.</p>\n\n<p><b>4.4.2. Economia circulară la dezafectare.</b> Un proiect fotovoltaic responsabil trebuie să integreze, de la faza de proiectare, o strategie de gestionare a echipamentelor la finalul duratei de viață utilă, în conformitate cu Directiva 2012/19/UE privind deșeurile de echipamente electrice și electronice (DEEE), transpusă în legislația națională, care instituie regimul de responsabilitate extinsă a producătorului pentru colectarea și reciclarea modulelor fotovoltaice puse pe piață. Producătorii și importatorii de module fotovoltaice sunt, în majoritatea cazurilor, afiliați unor scheme colective de conformitate specializate (precum organizația europeană PV CYCLE), care organizează rețele de colectare și facilități de reciclare dedicate. Din punct de vedere tehnic, un modul fotovoltaic standard (celule de siliciu cristalin) este alcătuit, ca pondere de masă, predominant din sticlă (cca. 65–75%), aluminiu (rama structurală, cca. 8–12%), polimeri (encapsulant, folie posterioară, cca. 8–10%), siliciu și metale conductoare (cupru, argint, cca. 3–5%), procesele de reciclare actuale permițând recuperarea a peste 90% din masa totală a modulului, cu valorificarea prioritară a sticlei și a aluminiului și cu tehnologii în curs de maturizare pentru recuperarea siliciului de înaltă puritate și a metalelor prețioase din celule. Integrarea acestei componente în planul de management al proiectului, inclusiv prin constituirea unui provizion financiar pentru costurile de dezafectare și reciclare, reprezintă un element de bună practică recunoscut la nivel european și un criteriu tot mai frecvent solicitat de finanțatori și de investitorii instituționali în evaluarea sustenabilității proiectului.</p>\n\n<p><b>4.4.3. Impactul asupra biodiversității și posibilități de coexistență a folosințelor.</b> Amplasarea unui parc fotovoltaic la scară utilitară pe terenuri cu utilizare agricolă sau cu vegetație naturală generează un impact asupra biodiversității locale care trebuie evaluat și, în măsura posibilului, atenuat prin soluții de proiectare adecvate. Concepte precum agrivoltaicul (coexistența producției de energie electrică cu activități agricole desfășurate sub sau între rândurile de module — pășunat controlat cu ovine, cultivarea de specii tolerante la umbrire parțială, apicultură) permit menținerea, cel puțin parțială, a funcției productive agricole a terenului, reducând conflictul de utilizare a terenului și generând, în plus, un beneficiu economic complementar pentru operator sau pentru proprietarul terenului. Din perspectiva biodiversității, proiectarea configurației spațiale a parcului poate include coridoare ecologice necultivate/neamenajate între tronsoanele de module, benzi înierbate cu specii melifere pentru susținerea polenizatorilor și menținerea vegetației native pe zonele de retragere și de protecție a perimetrului, măsuri care contribuie la conservarea conectivității habitatelor locale și la limitarea fragmentării ecologice induse de amplasamentul industrial.</p>\n\n<p><b>4.4.4. Impactul social și economic local.</b> Proiectul generează un impact social pozitiv pe două paliere temporale distincte. Pe termen scurt, în perioada de execuție, proiectul generează un număr semnificativ de locuri de muncă temporare, necesare pentru lucrările de organizare de șantier, montaj al structurilor de susținere, instalarea modulelor și a echipamentelor electrice, precum și pentru lucrările de racordare la rețea, cu efect multiplicator asupra economiei locale (subcontractare, servicii, cazare, aprovizionare). Pe termen lung, pe durata de exploatare, proiectul asigură un număr redus, dar stabil, de locuri de muncă permanente sau semi-permanente, aferente activităților de operare, mentenanță și securitate a amplasamentului, adesea contractate cu forță de muncă locală sau regională. La nivelul bugetului local, proiectul generează venituri fiscale constante pentru unitatea administrativ-teritorială pe raza căreia este amplasat, prin impozitul pe clădiri și pe teren aferent construcțiilor speciale și platformelor tehnologice, precum și, unde este cazul, prin redevențe sau chirii aferente terenurilor aflate în proprietate publică. Buna practică în domeniu recomandă, adițional obligațiilor fiscale standard, structurarea unor parteneriate voluntare cu comunitatea locală — fonduri de compensare pentru infrastructură comunitară, programe de sponsorizare educațională sau de mediu, priorități de angajare pentru rezidenții locali —, măsuri care contribuie la acceptabilitatea socială a proiectului și la reducerea riscului reputațional identificat în capitolul de analiză a riscurilor.</p>\n\n<p><b>4.4.5. Reversibilitatea schimbării de folosință a terenului.</b> Un avantaj distinctiv al instalațiilor fotovoltaice la scară utilitară, în raport cu alte tipuri de investiții industriale sau energetice, constă în caracterul reversibil al amprentei asupra terenului. Structurile de susținere a modulelor sunt, în marea majoritate a soluțiilor tehnice actuale, fundate pe piloni bătuți sau înșurubați direct în teren (driven piles/screw piles), fără realizarea unor fundații masive de beton armat, cu excepția platformelor tehnice punctuale ale posturilor de transformare și ale containerelor de invertoare. Această soluție constructivă permite, la finalul duratei de viață utilă a proiectului sau în cazul unei decizii de dezafectare anticipată, demontarea integrală a structurilor și extracția pilonilor, cu un impact rezidual minim asupra solului și cu posibilitatea readucerii terenului la starea și la utilizarea sa inițială (agricolă sau naturală) într-un interval de timp scurt, fără operațiuni extinse de remediere sau decontaminare. Această caracteristică de reversibilitate constituie un argument favorabil suplimentar în evaluarea globală a sustenabilității proiectului, întrucât limitează riscul de schimbare ireversibilă a destinației terenului și susține compatibilitatea investiției cu principiile de utilizare durabilă și responsabilă a resursei funciare pe termen lung.</p>";
      var _CAP5 = "<p>Prezentul capitol stabilește, la nivel de Studiu de Fezabilitate, succesiunea logică și durata orientativă a etapelor necesare implementării investiției, de la faza de proiectare până la punerea în funcțiune și recepția lucrărilor. Graficul de implementare are, la acest stadiu de detaliere, caracter estimativ și orientativ; eșalonarea reală, cu termene ferme și jaloane contractuale, va fi stabilită în fazele de Proiect Tehnic (PT) și Detalii de Execuție (DE), pe baza contractelor încheiate cu proiectantul, cu operatorul de rețea și cu contractorii de execuție.</p><p>Din experiența acumulată pe proiecte similare de generare a energiei electrice din surse fotovoltaice, elementul determinant al duratei totale de implementare nu este, de regulă, execuția lucrărilor civile și de montaj – care se realizează într-un interval relativ compact și predictibil – ci lanțul de avize, acorduri și, în special, obținerea Avizului Tehnic de Racordare (ATR) și a soluției de racordare de la operatorul de distribuție/transport. Aceste proceduri administrative se află, în mod tipic, pe drumul critic al proiectului, fiind supuse unor termene legale de răspuns care pot fi prelungite în funcție de gradul de încărcare a rețelei electrice în zona de interes, de necesitatea unor studii de soluție sau de lucrări de întărire a rețelei (upgrade) puse în sarcina beneficiarului.</p><table><tr><th>Nr.</th><th>Etapa</th><th>Durată orientativă (luni)</th><th>Condiționare / dependență</th></tr><tr><td>1</td><td>Obținere avize, acorduri și Aviz Tehnic de Racordare (ATR)</td><td>1–6*</td><td>Etapă inițială; de regulă pe drumul critic al proiectului</td></tr><tr><td>2</td><td>Elaborare Proiect Tehnic și Detalii de Execuție (PT/DE)</td><td>1–3</td><td>Poate demara parțial în paralel cu etapa 1, pe baza temei de proiectare din SF</td></tr><tr><td>3</td><td>Achiziție publică/privată a echipamentelor principale (module, invertoare, structuri)</td><td>1–3</td><td>Necesită PT finalizat pentru caiet de sarcini tehnic complet</td></tr><tr><td>4</td><td>Execuție lucrări civile (organizare de șantier, drumuri interioare, împrejmuire, fundații)</td><td>1–2</td><td>Ulterioară obținerii autorizației de construire</td></tr><tr><td>5</td><td>Montaj structuri metalice de susținere și module fotovoltaice</td><td>1–3</td><td>Succesivă finalizării lucrărilor civile pe fiecare front de lucru</td></tr><tr><td>6</td><td>Instalații electrice de joasă/medie tensiune, stație de transformare și racordare la rețea</td><td>1–3</td><td>Condiționată de ATR și de soluția de racordare aprobată</td></tr><tr><td>7</td><td>Probe tehnologice, teste de performanță și punere în funcțiune</td><td>0,5–1</td><td>Necesită coordonare directă cu operatorul de distribuție/transport</td></tr><tr><td>8</td><td>Recepția lucrărilor (recepție la terminarea lucrărilor)</td><td>0,5–1</td><td>Ultima etapă contractuală, condiționată de remedierea eventualelor neconformități</td></tr></table><p>* Interval orientativ; durata efectivă depinde de gradul de încărcare a rețelei electrice în zona de interes și de complexitatea eventualelor lucrări de întărire a rețelei impuse prin soluția de racordare.</p><p>Din perspectiva managementului de proiect, recomandarea este ca activitățile de obținere a avizelor și acordurilor (inclusiv ATR) să fie demarate cât mai timpuriu posibil, în paralel cu pregătirea documentației tehnice, pentru a nu genera întârzieri în cascadă asupra întregului program de execuție. Etapele de execuție propriu-zisă (lucrări civile, montaj structuri, instalații electrice) sunt, prin natura lor, activități cu durată relativ predictibilă și pot fi comprimate prin alocarea unor resurse suplimentare (fronturi de lucru multiple, resurse umane și utilaje), în timp ce termenele administrative nu pot fi accelerate prin resurse suplimentare din partea beneficiarului, ci doar prin monitorizarea activă a stadiului solicitărilor și răspunsul prompt la eventualele cereri de completare din partea autorităților emitente sau a operatorului de rețea.</p><p>Un aspect specific proiectelor de producere a energiei electrice din surse fotovoltaice este necesitatea sincronizării punerii în funcțiune cu programul operatorului de distribuție/transport, care efectuează verificările și probele de racordare conform propriilor proceduri interne și planificărilor de rețea. Întârzierile la această etapă nu sunt, de regulă, imputabile execuției, dar pot amplasa data punerii efective în funcțiune ulterior finalizării fizice a lucrărilor, cu efecte asupra fluxului de venituri estimat în analiza economico-financiară a proiectului. Din acest motiv, se recomandă ca beneficiarul să inițieze dialogul cu operatorul de rețea încă din faza de proiectare, pentru a alinia calendarul de execuție cu disponibilitatea acestuia pentru probe și recepție.</p>";
      var _CAP6 = "<p>Alegerea strategiei de achiziție constituie o decizie de management de proiect cu impact direct asupra costurilor, termenelor și riscurilor asumate de beneficiar. Pentru un parc fotovoltaic, practica curentă identifică două modele principale de contractare a execuției, între care beneficiarul optează în funcție de capacitatea proprie de management tehnic, de dimensiunea investiției și de profilul de risc acceptat.</p><p><b>Modelul EPC (Engineering-Procurement-Construction) „la cheie”</b> presupune contractarea unui singur furnizor general (contractor EPC), care își asumă integral proiectarea de detaliu, achiziția echipamentelor și execuția lucrărilor, livrând obiectivul finalizat și funcțional, de regulă cu garanții de performanță (garanție de producție de energie – performance ratio) și penalități contractuale pentru neconformitate. Acest model transferă către contractor riscul de interfață între diferitele componente ale sistemului (module, invertoare, structuri, electrice) și simplifică managementul de proiect din perspectiva beneficiarului, în schimbul unei marje comerciale unice, integrate în prețul contractului.</p><p><b>Modelul de achiziție separată pe loturi (multi-contracting)</b> presupune contractarea distinctă a principalelor pachete de lucrări și echipamente (module fotovoltaice, invertoare, structuri de susținere, montaj, instalații electrice, racordare), fiecare achiziționat separat, de regulă de la furnizori/executanți specializați. Acest model poate genera economii la nivelul costurilor directe (elimină marja de intermediere a unui contractor general), în schimbul unui management de proiect mai complex, cu responsabilitate directă a beneficiarului (sau a unui consultant/diriginte de șantier mandatat) pentru coordonarea interfețelor dintre loturi și pentru gestionarea riscurilor de calendar între contractori distincți.</p><table><tr><th>Pachet de achiziție</th><th>Obiect</th><th>Model recomandat</th></tr><tr><td>Module fotovoltaice</td><td>Furnizare module, cu certificare de performanță și garanție de producție pe termen lung</td><td>EPC sau lot separat, după caz</td></tr><tr><td>Invertoare și echipamente de conversie</td><td>Furnizare invertoare string/centrală, cu garanție și contract de service</td><td>EPC sau lot separat</td></tr><tr><td>Structuri de susținere</td><td>Furnizare și montaj structuri metalice fixe/mobile (tracking)</td><td>Lot separat sau subcontractat de EPC</td></tr><tr><td>Lucrări civile și montaj</td><td>Organizare de șantier, fundații, drumuri interioare, montaj structuri și module</td><td>Contract de execuție (lucrări)</td></tr><tr><td>Instalații electrice și stație de transformare</td><td>Cablare, stație de conexiune, protecții, racordare la rețea</td><td>Contractor specializat, coordonat cu operatorul de rețea</td></tr><tr><td>Mentenanță și operare (O&amp;M)</td><td>Servicii de operare și întreținere pe termen lung (curățare module, monitorizare, remedieri)</td><td>Contract separat, pe durată multianuală</td></tr></table><p>Criteriile de selecție a contractorului/contractorilor trebuie fundamentate anterior lansării procedurii de achiziție și includ, în mod uzual: experiența demonstrată în execuția de proiecte similare de generare fotovoltaică (referințe verificabile, listă de proiecte finalizate cu puteri instalate comparabile), capacitatea financiară și garanțiile solicitate (garanție de bună execuție, garanție de performanță), certificările de calitate și mediu ale ofertanților (ISO 9001, ISO 14001, SSM), precum și condițiile de garanție oferite pentru echipamentele principale (module, invertoare) și pentru lucrările executate.</p><p>În situația în care investiția este finanțată integral sau parțial din fonduri publice (bugetul de stat, fonduri europene, împrumuturi garantate de stat), achiziția echipamentelor și lucrărilor se realizează obligatoriu în conformitate cu prevederile Legii nr. 98/2016 privind achizițiile publice, cu normele metodologice de aplicare și cu reglementările specifice finanțatorului. Aceasta implică alegerea procedurii de atribuire în funcție de valoarea estimată a contractului (procedură simplificată, licitație deschisă etc.), publicarea documentației de atribuire și stabilirea criteriului de atribuire pe baza raportului cost/calitate (cel mai bun raport preț-calitate), cu factori de evaluare tehnici (garanții, performanță garantată, termen de execuție) alături de componenta financiară, și nu exclusiv prețul cel mai scăzut, având în vedere impactul direct al calității echipamentelor și execuției asupra producției de energie pe întreaga durată de viață a investiției. În cazul finanțării private, beneficiarul are libertatea de a organiza o procedură de selecție competitivă proprie (cerere de oferte către mai mulți potențiali contractori/furnizori), cu criterii similare celor de mai sus, adaptate specificului și cerințelor interne de guvernanță corporativă.</p><p>Un element strategic distinct îl constituie contractul de mentenanță și operare (Operation &amp; Maintenance – O&amp;M), care poate fi inclus în contractul EPC inițial (pe o durată determinată, de regulă în intervalul 5–10 ani, ca extensie a garanției de performanță) sau contractat separat, ulterior punerii în funcțiune, cu un operator specializat în mentenanța instalațiilor fotovoltaice. Recomandarea generală este ca serviciile de O&amp;M să fie asigurate pe termen lung, cu obligații clare privind disponibilitatea instalației (availability rate), intervenția în caz de defect și monitorizarea permanentă a performanței, elemente esențiale pentru menținerea randamentului energetic proiectat pe întreaga durată de viață a investiției.</p>";
      var _CAP7 = "<p>Prezentul Studiu de Fezabilitate se fundamentează pe informațiile disponibile la momentul elaborării și identifică totodată seria de studii de specialitate care, conform reglementărilor tehnice și legale în vigoare, trebuie elaborate, anexate sau actualizate în fazele următoare ale investiției (DALI/PT/DE, obținere autorizație de construire). Fiecare dintre aceste studii condiționează, direct sau indirect, fezabilitatea tehnică și legală a proiectului.</p><p><b>Studiul topografic</b> reprezintă documentația de bază pentru orice proiect de construcții, fiind necesar pentru stabilirea cu precizie a limitelor amplasamentului, a configurației terenului și a curbelor de nivel. Acesta se execută în sistemul de proiecție național Stereografic 1970 (Stereo 70), cu plan de situație la scară adecvată și curbe de nivel, fiind indispensabil pentru dimensionarea corectă a înșirării rândurilor de module (pentru evitarea umbrelor reciproce și optimizarea pantei terenului), pentru proiectarea drumurilor interioare de acces și pentru verificarea încadrării în limitele de proprietate.</p><p><b>Studiul geotehnic</b>, elaborat în conformitate cu Normativul NP 074/2014 privind documentațiile geotehnice pentru construcții, cuprinde foraje geotehnice de recunoaștere, determinări de laborator asupra proprietăților fizico-mecanice ale terenului și, specific pentru parcurile fotovoltaice cu structuri fixate prin piloni bătuți (driven piles), teste de extracție (pull-out test) pentru verificarea capacității portante a soluției de fundare a structurilor de susținere, precum și determinări de rezistivitate electrică a solului, relevante pentru proiectarea prizei de împământare și a protecției împotriva descărcărilor electrice atmosferice (paratrăsnet).</p><p><b>Studiul pedologic</b> devine necesar în situația în care amplasamentul este situat pe teren cu categorie de folosință agricolă, fiind documentația tehnică de fundamentare pentru procedura de scoatere definitivă sau temporară din circuitul agricol, conform legislației în domeniul fondului funciar. Studiul stabilește clasa de fertilitate a solului și fundamentează calculul taxelor/despăgubirilor legale datorate pentru schimbarea categoriei de folosință, unde este aplicabil.</p><p><b>Evaluarea impactului asupra mediului</b> și, după caz, <b>evaluarea adecvată pentru ariile naturale protejate de interes comunitar (Natura 2000)</b>, se realizează în conformitate cu Legea nr. 292/2018 privind evaluarea impactului anumitor proiecte publice și private asupra mediului. Procedura debutează cu solicitarea acordului de mediu de la autoritatea competentă pentru protecția mediului, care decide, pe baza documentației depuse, necesitatea parcurgerii etapei de evaluare a impactului asupra mediului și/sau a evaluării adecvate, în funcție de proximitatea amplasamentului față de arii naturale protejate și de natura și amploarea lucrărilor propuse.</p><p><b>Evaluarea resursei energetice (Energy Yield Assessment)</b> reprezintă studiul tehnic de specialitate prin care se estimează, cu ajutorul unui software dedicat de simulare (de tip PVsyst, PV-SOL sau echivalent), producția anuală de energie electrică a parcului fotovoltaic, pe baza datelor de iradiație solară specifice amplasamentului, a configurației sistemului (orientare, înclinare, tip module și invertoare) și a pierderilor tehnice estimate (umbrire, temperatură, murdărire, pierderi în cabluri și în invertoare). Rezultatele se prezintă sub formă de scenarii probabilistice P50 (producția estimată cu probabilitate de 50% de a fi atinsă sau superioară) și P90 (producția estimată cu probabilitate de 90%, utilizată de regulă în analizele de finanțare bancară ca scenariu conservator), constituind fundamentul analizei economico-financiare a investiției.</p><p><b>Avizul/soluția de racordare emisă de operatorul de distribuție/transport</b> (Avizul Tehnic de Racordare – ATR) stabilește condițiile tehnice și economice în care instalația de producere poate fi racordată la rețeaua electrică existentă, inclusiv eventualele lucrări de întărire a rețelei necesare pentru evacuarea puterii instalate. Obținerea acestui aviz este o condiție esențială de fezabilitate a proiectului și, după cum s-a arătat în capitolul privind graficul de implementare, se situează de regulă pe drumul critic al calendarului de execuție.</p><p><b>Studiul arheologic</b> (respectiv procedura de descărcare de sarcină arheologică) devine necesar în situația în care direcția județeană pentru cultură solicită, în baza reglementărilor privind protejarea patrimoniului arheologic, efectuarea de cercetări arheologice preventive (diagnostic sau, după caz, săpătură arheologică de salvare) pe amplasamentul propus, anterior emiterii autorizației de construire, în special în zone cu potențial arheologic cunoscut sau în vecinătatea siturilor clasate.</p><table><tr><th>Studiu de specialitate</th><th>Emitent / executant</th><th>Fază de anexare</th></tr><tr><td>Studiu topografic</td><td>Persoană fizică/juridică autorizată ANCPI</td><td>DALI/PT – anexat obligatoriu la documentația de autorizare</td></tr><tr><td>Studiu geotehnic (NP 074/2014)</td><td>Firmă specializată în geotehnică și fundații</td><td>PT/DE – anterior proiectării structurilor de susținere</td></tr><tr><td>Studiu pedologic</td><td>Oficiu de studii pedologice/agrochimice județean</td><td>Anterior procedurii de scoatere din circuitul agricol</td></tr><tr><td>Evaluare impact mediu / evaluare adecvată Natura 2000</td><td>Autoritatea competentă pentru protecția mediului, pe bază de raport de specialitate</td><td>Anterior emiterii acordului de mediu</td></tr><tr><td>Energy Yield Assessment (P50/P90)</td><td>Consultant tehnic specializat în energie fotovoltaică</td><td>DALI/PT – fundamentează analiza economico-financiară</td></tr><tr><td>Aviz Tehnic de Racordare (ATR)</td><td>Operatorul de distribuție/transport al energiei electrice</td><td>Condiție prealabilă autorizației de construire</td></tr><tr><td>Studiu arheologic (descărcare de sarcină arheologică)</td><td>Institut/serviciu de arheologie autorizat, sub coordonarea direcției județene pentru cultură</td><td>Anterior emiterii autorizației de construire, dacă este solicitat</td></tr></table><p>Se recomandă ca inițierea acestor studii de specialitate să fie planificată cât mai timpuriu în calendarul proiectului, având în vedere că unele dintre acestea (în special avizul de racordare, evaluarea de mediu și studiul arheologic, după caz) presupun termene de răspuns din partea autorităților/operatorilor care nu pot fi accelerate prin resurse suplimentare din partea beneficiarului și care se află, conform celor prezentate în capitolul precedent, pe drumul critic al implementării investiției.</p>";
      var _CAP8 = "<p>Prezentul Studiu de Fezabilitate a analizat, sub aspect tehnic, economic și de mediu, oportunitatea și modalitatea de realizare a investiției privind construirea parcului fotovoltaic obiect al prezentei documentații, în conformitate cu prevederile Hotărârii Guvernului nr. 907/2016 privind etapele de elaborare și conținutul-cadru al documentațiilor tehnico-economice aferente obiectivelor/proiectelor de investiții finanțate din fonduri publice. Au fost analizate condițiile de amplasament (topografie, expunere, profil de orizont, regim juridic al terenului), cerințele tehnice de proiectare a instalației de producere a energiei electrice din sursă fotovoltaică, precum și implicațiile economico-financiare, sociale și de mediu ale investiției, pe baza scenariilor tehnico-economice comparate.</p><p>Pe baza analizei comparative a scenariilor de realizare a investiției, prezentată în capitolele precedente, se recomandă adoptarea <b>Scenariului I</b> ca variantă optimă de implementare, aceasta corespunzând celui mai favorabil raport între efortul investițional, riscurile tehnice și administrative asumate și beneficiile economice, energetice și de mediu generate pe întreaga durată de viață a instalației. Continuarea implementării investiției este condiționată, în mod obiectiv, de îndeplinirea unui număr de premise tehnice și administrative, dintre care se rețin ca esențiale: obținerea unui Aviz Tehnic de Racordare favorabil și în condiții tehnico-economice acceptabile din partea operatorului de rețea, confirmarea prin studiul geotehnic de detaliu a soluției de fundare presupuse la nivel de SF, obținerea avizelor de mediu aplicabile și, după caz, asigurarea sursei de finanțare (proprie, bancară sau prin fonduri nerambursabile) în condițiile și termenele necesare demarării execuției.</p><p>Se recomandă continuarea proiectului spre fazele subsecvente – Documentația de Avizare a Lucrărilor de Intervenții (DALI), după caz, respectiv elaborarea Proiectului Tehnic și a Detaliilor de Execuție (PT/DE) – și demararea, în paralel, a demersurilor pentru obținerea autorizației de construire și a celorlalte avize/acorduri identificate în capitolul precedent. Se atrage atenția asupra caracterului orientativ al indicatorilor tehnico-economici prezentați în prezentul Studiu de Fezabilitate, la nivelul de detaliere specific acestei faze de proiectare; valorile privind costurile, duratele și indicatorii de performanță energetică vor fi actualizate și consolidate în fazele următoare, pe baza ofertelor ferme obținute de la contractori și furnizori, a rezultatelor definitive ale studiilor geotehnic și de evaluare a resursei energetice, precum și a condițiilor tehnice finale stabilite prin Avizul Tehnic de Racordare.</p>";
      var secs = [
        { h: 'CAPITOLUL 1 — Informații generale', html: tbl([['1.1 Denumirea obiectivului', 'Parc fotovoltaic ' + f(pdc) + ' kWp — ' + esc(D.nume || '—')], ['1.2 Investitor / ordonator de credite', esc(D.beneficiar || '—')], ['1.3 Beneficiarul investiției', esc(D.beneficiar || '—')], ['1.4 Amplasament', esc((D.uat || '—') + (D.nrcad ? ', nr. cad. ' + D.nrcad : ''))], ['1.5 Elaborator SF', esc(D.proiectant || '—')], ['Faza', 'S.F. (HG 907/2016)']], ['Element', 'Date']) },
        { h: 'CAPITOLUL 2 — Situația existentă și necesitatea investiției', html:
          _CAP2_EXT +
          '<p><b>2.2 Context strategic.</b> Investiția se înscrie în cadrul de politici energetice UE (Directiva (UE) 2018/2001 — RED II, pachetul „Fit for 55", Regulamentul (UE) 2021/1119 — neutralitate climatică 2050) și național (PNIESC 2021–2030 — HG 1076/2021, Legea 220/2008, Legea 123/2012). Surse de finanțare eligibile: Fondul pentru Modernizare (OUG 60/2022, Programul-cheie 1 SRE, grant până la 100% cheltuieli eligibile), PNRR Componenta C6, POCIDIF.</p>' +
          '<p><b>2.3 Necesitate.</b> Volatilitatea prețului energiei și obiectivele de decarbonare fac oportună producerea de energie regenerabilă pentru acoperirea consumului propriu și/sau injecție în rețea. Parcul acoperă un necesar de ~' + f(prodAn) + ' MWh/an.</p>' +
          '<p><b>2.4 Potențial solar (metodologie PVGIS SARAH).</b> Producția lunară estimată (profil specific României, înclinare optimă, orientare sud):</p>' + _mapSolarRO(+D.lat || 46, +D.lon || 26, D.uat || 'Amplasament') + tbl(lunar, ['Luna', 'Producție estimată']) + _chartBar('Producție lunară estimată', lunarNum, 'MWh') +
          '<p>Formula: E = P_DC × PSH_POA × PR, cu PR ≈ ' + e.pr + ' (pierderi: temperatură, invertor, cabluri DC/AC, soiling, mismatch, indisponibilitate). Se confirmă cu PVsyst/PV-SOL (P50/P90) la faza următoare.</p>' +
          '<p><b>2.5 Obiective și indicatori de realizare (FM/PNRR):</b></p>' + tbl([['I.1 Capacitate nou instalată SRE', f(I1 * 1000) + ' kWp (' + I1 + ' MWp)'], ['I.2 Reducere anuală emisii GES', f(I2) + ' tCO₂ echiv./an (× 0,6119 tCO₂/MWh — factor ANRE)'], ['I.3 Producția medie anuală SRE', f(I3) + ' MWh/an'], ['I.4 Producția totală pe ' + ani + ' ani', f(I4) + ' MWh'], ['I.5 Factor de capacitate', I5 + '% (tipic RO 13–16%)']], ['Indicator', 'Valoare']) },
        { h: 'CAPITOLUL 3 — Scenarii tehnico-economice', html:
          _CAP3_EQUIP + _CAP3_SPECTABLE +
          '<p><b>3.2.1 SCENARIUL I — Parc fotovoltaic ' + f(pdc) + ' kWp (RECOMANDAT).</b> Câmp de ' + f(e.nr_module) + ' module (' + e.putere_modul_wp + ' Wp), ' + e.nr_stringuri + ' stringuri, ' + e.nr_invertoare + ' invertoare, P_AC ' + f(pac) + ' kVA (ILR ' + e.ilr + '), ' + e.nr_pt + ' PT × ' + f(e.putere_pt_kva) + ' kVA, montaj ' + e.montaj_label + ', înclinare 25–35° orientare sud, racord ' + e.racord + '. Teren ocupat ~' + e.teren_necesar_ha + ' ha (GCR ' + e.gcr + ').</p>' + _diagFluxPV(e, e.racord) +
          '<p><b>3.2.2 SCENARIUL II — CONTRAFACTUAL (nerecomandat).</b> Referință fără proiect: centrală ciclu combinat pe gaze naturale, aceeași energie. Consum anual gaz ≈ ' + f(gazAn) + ' MWh/an (randament 60%), cheltuieli anuale de combustibil ≈ ' + f(chGazAn) + ' EUR/an — dependent de importuri și emitent de CO₂. Scenariul I elimină aceste cheltuieli și emisii.</p>' + _CAP3_COMPARE },
        { h: 'CAPITOLUL 3.3 — Deviz general (HG 907/2016) — Scenariul I', html: tbl([
          ['CAP.1 Obținere și amenajare teren', lei(g1) + ' lei', f(g1) + ' €'],
          ['CAP.2 Asigurare utilități (racord MT — ATR)', lei(g2) + ' lei', f(g2) + ' €'],
          ['CAP.3 Proiectare și asistență tehnică', lei(g3) + ' lei', f(g3) + ' €'],
          ['CAP.4 Investiția de bază (din care:)', lei(g4) + ' lei', f(g4) + ' €'],
          ['&nbsp;&nbsp;4.1 Construcții și instalații (structuri, fundații, drumuri, împrejmuire, priză)', lei(g4ci) + ' lei', f(g4ci) + ' €'],
          ['&nbsp;&nbsp;4.2 Montaj utilaje și echipamente', lei(g4mont) + ' lei', f(g4mont) + ' €'],
          ['&nbsp;&nbsp;4.3 Utilaje cu montaj (module, invertoare, PT, cabluri, SCADA)', lei(g4ut) + ' lei', f(g4ut) + ' €'],
          ['CAP.5 Alte cheltuieli (organizare + ISC 0,5%+0,1% + CSC 0,5% + diverse 5%)', lei(g5) + ' lei', f(g5) + ' €'],
          ['CAP.6 Probe tehnologice și teste', lei(g6) + ' lei', f(g6) + ' €'],
          ['<b>TOTAL fără TVA</b>', '<b>' + lei(totFTVA) + ' lei</b>', '<b>' + f(totFTVA) + ' €</b>'],
          ['TVA 19%', lei(tva) + ' lei', f(tva) + ' €'],
          ['<b>TOTAL cu TVA</b>', '<b>' + lei(totTVA) + ' lei</b>', '<b>' + f(totTVA) + ' €</b>'],
          ['din care C+M (fără TVA)', lei(cm) + ' lei', f(cm) + ' €']
        ], ['Capitol deviz', 'Valoare (lei)', 'Valoare (€)']) + _chartPie('Structura devizului general (fără TVA)', devizPie) + '<p>Curs utilizat: ' + curs.toFixed(2) + ' lei/€. Valori orientative la faza SF; se actualizează cu oferte EPC și ATR-ul operatorului de rețea.</p>' },
        { h: 'CAPITOLUL 4 — Analiza scenariilor · cadru și indicatori economici', html:
          _CAP4_METHOD +
          '<p>Perioadă de referință <b>' + ani + ' ani</b>, rată de actualizare <b>' + (rata * 100).toFixed(0) + '%</b> (recomandare CE proiecte publice), monedă lei/€ (curs ' + curs.toFixed(2) + ').</p>' + tbl([
          ['CAPEX total (fără TVA)', f(totFTVA) + ' € (' + lei(totFTVA) + ' lei)'], ['Venit brut an 1', f(venitAn1) + ' € (' + lei(venitAn1) + ' lei)'], ['OPEX anual', f(opexAn) + ' €/an'],
          ['VAN (VNA) la ' + (rata * 100).toFixed(0) + '%', f(npv) + ' €'], ['RIR (IRR)', (irr != null ? irr + '%' : '< 0,5%')], ['Termen de recuperare', (payback != null ? payback + ' ani' : '> ' + ani + ' ani')], ['LCOE', lcoe.toFixed(1) + ' €/MWh'], ['Verdict economic', '<b>' + verdict + '</b>']
        ], ['Indicator', 'Valoare']) },
        { h: 'CAPITOLUL 4.1 — Flux de numerar (' + ani + ' ani, cu degradare ' + (degr * 100).toFixed(1) + '%/an)', html: tbl(flows, ['An', 'Producție MWh', 'Venit €', 'OPEX €', 'Cash-flow €', 'Cumulat €']) + _chartLine('Cash-flow cumulat pe ' + ani + ' ani', cumNum, '€') },
        { h: 'CAPITOLUL 4.2 — Analiză de senzitivitate (preț energie)', html: tbl(sens, ['Scenariu preț', 'VAN rezultat', 'Concluzie']) + _chartBar('VAN la variația prețului energiei', sensNum, '€') },
        { h: 'CAPITOLUL 4.3 — Analiza vulnerabilităților și riscurilor', html: _CAP4_RISK },
        { h: 'CAPITOLUL 4.4 — Sustenabilitate, mediu și impact social', html:
          _CAP4_ESG +
          '<p><b>Reducere emisii:</b> ' + f(I2) + ' tCO₂ echiv./an (' + f(I2 * ani) + ' t pe ' + ani + ' ani). <b>Forță de muncă:</b> execuție — echipă multidisciplinară pe ' + f(4 + 0.9 * (pdc / 1000)) + ' luni; operare — O&M ~' + f(Math.max(1, 0.7 * pdc / 1000)) + ' persoane. <b>Mediu:</b> impact redus reversibil (structuri pe piloți, teren readus la starea inițială la dezafectare), reciclare module DEEE (Dir. 2012/19/UE, HG 1037/2010, PV CYCLE), fără emisii/deșeuri în operare. Evaluare EIA (Legea 292/2018, Anexa 2) + evaluare adecvată dacă Natura 2000.</p>' },
        { h: 'CAPITOLUL 5 — Graficul de implementare a investiției', html: _CAP5 },
        { h: 'CAPITOLUL 6 — Strategia de achiziții publice/private', html: _CAP6 },
        { h: 'CAPITOLUL 7 — Studii de specialitate necesare fazelor următoare', html: _CAP7 },
        { h: 'CAPITOLUL 8 — Concluzii și recomandări', html: _CAP8 +
          '<p><b>Sinteza indicatorilor rezultați din analiza scenariului recomandat:</b> proiectul este <b>' + verdict + '</b> — VAN ' + f(npv) + ' €, RIR ' + (irr != null ? irr + '%' : '<prag') + ', recuperare ' + (payback || '>' + ani) + ' ani, LCOE ' + lcoe.toFixed(1) + ' €/MWh, reducere ' + f(I2) + ' tCO₂/an. Se recomandă promovarea Scenariului I.</p>' }
      ];
      return { cat: 'Studii', file: 'Studiu_fezabilitate_energetica.doc', html: docHtml(_meta(D, 'STUDIU DE FEZABILITATE — PARC FOTOVOLTAIC', 'model energetic-financiar · HG 907/2016'), secs) };
    },
    'Clădire mixtă — separări funcțiuni (P118)': function (D, v) {
      var secs = [
        { h: '1. Funcțiuni combinate', html: '<p>Obiectivul cuprinde funcțiuni mixte' + (D.corpuri && D.corpuri.length ? ' (' + D.corpuri.map(function (c) { return esc(c.functiune || c.nume); }).join(', ') + ')' : '') + '. Conform P118-1/2013, între funcțiuni cu risc/destinație diferită se prevăd separări la foc și accese independente.</p>' },
        { h: '2. Separări la foc obligatorii (P118-1)', html: tbl([['Comercial / rezidențial', 'planșeu + pereți', 'REI 120', 'P118-1 art. 3.3.2'], ['Parcare / rezidențial', 'planșeu', 'REI 180', 'P118-1 art. 3.5.1'], ['Producție / rezidențial', 'perete antifoc', 'REI 180', 'P118-1'], ['Spații tehnice / public', 'pereți + uși EI', 'REI 60-120 + uși EI', 'P118-1'], ['Casă de scări / niveluri', 'pereți + uși EI-C', 'REI 150 + EI 30-C', 'P118-2']], ['Între funcțiuni', 'Element', 'Rezistență la foc', 'Temei']) },
        { h: '3. Accese separate', html: tbl([['Rezidențial', 'intrare separată de funcțiunile comerciale/publice'], ['Comercial', 'acces direct din stradă/spațiu public'], ['Parcare', 'acces auto separat de accesul pietonal'], ['Servicii / aprovizionare', 'acces de serviciu dedicat']], ['Funcțiune', 'Acces']) },
        { h: '4. Indicatori și evacuare', html: '<p>POT/CUT se pot calcula separat pe funcțiune, dacă RLU/PUG impune (unele UTR-uri o cer). Căile de evacuare se dimensionează independent pe fiecare funcțiune, iar timpii de evacuare se verifică separat conform P118-1. Se corelează cu scenariul de securitate la incendiu.</p>' }
      ];
      return { cat: 'Memorii Tehnice', file: 'Cladire_mixta_separari.doc', html: docHtml(_meta(D, 'CLĂDIRE MIXTĂ — SEPARĂRI ÎNTRE FUNCȚIUNI', 'P118-1/2013 · separări la foc + accese'), secs) };
    },
    'Memoriu DTOE (organizare execuție)': function (D, v) {
      var sc = +D.Sc || 0;
      var deep = _lib(D, 'dtoe');
      if (deep) return { cat: 'Piese Administrative', file: 'Memoriu_DTOE.doc', html: docHtml(_meta(D, 'MEMORIU TEHNIC — ORGANIZAREA EXECUȚIEI (D.T.O.E.)', 'Legea 50/1991, Anexa 1'), [{ h: null, html: deep }]) };
      var secs = [
        { h: '1. Obiectul documentației', html: '<p>Prezenta documentație tehnică de organizare a execuției (D.T.O.E.) însoțește documentația pentru autorizarea executării lucrărilor la obiectivul „' + esc((G.UXDoc.FUNCTIUNI[D.functiune] || {}).label || D.functiune) + '", ' + esc(D.uat || '—') + '. Se întocmește conform Legii 50/1991 (Anexa 1) și stabilește măsurile de organizare a șantierului pe durata execuției.</p>' },
        { h: '2. Componentele organizării de șantier', html: tbl([['Împrejmuire', 'gard opac perimetral H≥2,0 m, poartă acces auto/pietonal, panou de identificare a investiției (Legea 50/1991 art. 7)'], ['Accese și circulații', 'drum provizoriu, platformă de manevră/staționare, spălarea roților la ieșire'], ['Baracamente', 'birou șantier/pază, vestiar muncitori, grup sanitar ecologic, magazie materiale'], ['Depozitare materiale', 'platforme amenajate pe categorii; materiale sensibile la adăpost'], ['Utilități provizorii', 'branșament provizoriu energie și apă, tablou de șantier, evacuare ape'], ['Managementul deșeurilor', 'containere selective, evacuare cu operator autorizat (Legea 211/2011)']], ['Componentă', 'Descriere']) },
        { h: '3. Suprafața ocupată temporar', html: '<p>Organizarea de șantier se amplasează, de regulă, în incinta proprie (pe suprafața neconstruită, ' + (D.Steren && sc ? '≈ ' + Math.round((+D.Steren - sc)).toLocaleString('ro-RO') + ' mp disponibili' : 'de precizat') + '), fără ocuparea domeniului public. Ocuparea temporară a domeniului public (ex. racorduri în stradă) necesită autorizație de la administratorul domeniului public.</p>' },
        { h: '4. Securitate și sănătate în muncă (SSM)', html: '<p>Se respectă Legea 319/2006 și HG 300/2006 (cerințe minime SSM pe șantiere temporare/mobile): plan de securitate și sănătate (dacă se depășesc pragurile HG 300/2006), planul propriu al fiecărui executant, coordonator SSM desemnat, semnalizare de avertizare, echipament individual de protecție.</p>' },
        { h: '5. Apărarea împotriva incendiilor pe durata execuției', html: '<p>Se aplică măsurile de prevenire (Legea 307/2006, normativ C 300): permis de lucru cu foc, dotare PSI provizorie (stingătoare), căi de acces pentru intervenție, depozitarea controlată a materialelor combustibile.</p>' },
        { h: '6. Protecția vecinătăților și a mediului', html: '<p>Limitarea programului de lucru (ore de liniște), stropirea pentru reducerea prafului, protejarea arborilor menținuți, refacerea căilor de acces și a terenurilor afectate temporar la finalizarea lucrărilor.</p>' }
      ];
      return { cat: 'Piese Administrative', file: 'Memoriu_DTOE.doc', html: docHtml(_meta(D, 'MEMORIU TEHNIC — ORGANIZAREA EXECUȚIEI (D.T.O.E.)', 'Legea 50/1991, Anexa 1'), secs) };
    },
    'Borderou piese scrise și desenate': function (D, v) {
      var niv = Math.max(1, +D.niv_supraterane || 1);
      var hasSub = (+D.niv_subterane || 0) > 0 || /subsol|demisol|s\s*\+\s*p|d\s*\+\s*p/i.test(D.regim || '');
      var isPth = (D.faza === 'PTh' || D.faza === 'ambele' || D.faza === 'PTh+DE');
      var i = 0, PD = []; function ad(t, sc) { PD.push(['A.' + ('0' + (i++)).slice(-2), t, sc]); }
      ad('Plan de încadrare în zonă', '1:2000 / 1:5000');
      ad('Plan de situație', '1:500');
      if (hasSub) ad('Plan subsol / demisol', '1:50');
      ad('Plan parter (cota ±0,00)', '1:50');
      for (var k = 1; k < niv; k++) ad('Plan etaj ' + k, '1:50');
      ad('Plan învelitoare / terasă', '1:100');
      ad('Secțiune transversală', '1:50');
      ad('Secțiune longitudinală', '1:50');
      ad('Fațada principală', '1:50');
      ad('Fațada posterioară', '1:50');
      ad('Fațada laterală stânga', '1:50');
      ad('Fațada laterală dreapta', '1:50');
      var PR = []; var j = 0;
      if (isPth) { PR.push(['R.01', 'Plan de fundații', '1:50']); PR.push(['R.02', 'Detalii fundații', '1:20']); PR.push(['R.03', 'Plan cofraj + armare planșee', '1:50']); PR.push(['IS.01', 'Scheme instalații sanitare', '1:100']); PR.push(['IT.01', 'Scheme instalații termice / HVAC', '1:100']); PR.push(['IE.01', 'Scheme instalații electrice + monofilară', '1:100']); }
      var scrise = Object.keys(D._docs || {}).filter(function (dc) { return D._docs[dc]; });
      var secs = [
        { h: 'A. Piese scrise', html: tbl(scrise.map(function (t, n) { return ['' + (n + 1), t]; }), ['Nr.', 'Piesă scrisă']) || '<p>Selectați documentele în secțiunea Documente.</p>' },
        { h: 'B. Piese desenate — arhitectură', html: tbl(PD.map(function (r) { return r; }), ['Cod', 'Denumire planșă', 'Scara']) },
      ];
      if (PR.length) secs.push({ h: 'C. Piese desenate — rezistență și instalații (PTh)', html: tbl(PR, ['Cod', 'Denumire planșă', 'Scara']) });
      secs.push({ h: 'D. Notă', html: '<p>Lista pieselor desenate este generată automat din regimul de înălțime (' + esc(D.regim || ('P+' + (niv - 1))) + ') și faza de proiectare. Fiecare planșă poartă cartuș conform Legii 50/1991, Anexa 1 (firmă/proiectant, nr. autorizație, titlu, scară, dată, semnături). Planurile se elaborează/finalizează de proiectant; planul funcțional schematic se poate genera din modelul de spații (SVG/PDF/DXF).</p>' });
      return { cat: 'Piese Administrative', file: 'Borderou_piese.doc', html: docHtml(_meta(D, 'BORDEROU / OPIS PIESE', 'piese scrise și desenate — Legea 50/1991 Anexa 1'), secs) };
    },
    'Program funcțional (breviar spații)': function (D, v) {
      var sp = D._spatii || [];
      if (!sp.length) return { cat: 'Memorii Tehnice', file: 'Program_functional.doc', html: docHtml(_meta(D, 'PROGRAM FUNCȚIONAL', 'breviar de spații'), [{ h: 'Program funcțional', html: '<p>Programul funcțional nu a fost generat. Deschideți „🧩 Program funcțional", introduceți parametrii de program (capacitate), generați și aplicați la proiect — spațiile vor fi listate aici automat, cu proveniența și temeiul normativ.</p>' }]) };
      var suP = 0, suE = 0, ocup = 0, instSet = {}, avizSet = {}, psiRows = [];
      sp.forEach(function (r) { var st = (+r.buc || 0) * (+r.mp_unit || 0); if (r.niv === 'E') suE += st; else suP += st; ocup += (+r.ocup || 0) * (+r.buc || 0); (r.inst || []).forEach(function (x) { instSet[x] = 1; }); (r.avize || []).forEach(function (x) { avizSet[x] = 1; }); if (r.psi) psiRows.push([r.nume, (r.psi.cat || '—'), (r.psi.detector || r.psi.sting || '—')]); });
      var su = Math.round(suP + suE), sd = su ? Math.round(su / 0.82) : 0;
      var tblSpatii = tbl(sp.map(function (r) { return [r.nume + (r.ob ? ' *' : ''), r.cat || '—', r.niv || 'P', '' + (r.buc || 1), '' + (r.mp_unit || 0), '' + Math.round((r.buc || 0) * (r.mp_unit || 0)), (r.prov || '') + (r.normativ ? ' — ' + r.normativ : '')]; }), ['Spațiu', 'Categorie', 'Niv', 'Buc', 'Su/buc (mp)', 'Su tot (mp)', 'Proveniență / temei normativ']);
      var secs = [
        { h: '1. Programul de spații (model funcțional confirmat)', html: '<p>Programul de spații de mai jos a fost generat parametric din capacitatea proiectului și din regulile de dependență codificate pe normative, apoi confirmat de proiectant. Spațiile marcate cu <b>*</b> sunt obligatorii (generate din normativ). Toate documentațiile (memorii, deviz, scenariu PSI) derivă din acest model unic.</p>' + tblSpatii },
        { h: '2. Bilanț de suprafețe', html: tbl([['Nr. spații', '' + sp.length], ['Su parter', suP.toLocaleString('ro-RO') + ' mp'], ['Su etaj', suE.toLocaleString('ro-RO') + ' mp'], ['Su totală', su.toLocaleString('ro-RO') + ' mp'], ['Sd (Su/0,82)', sd.toLocaleString('ro-RO') + ' mp'], ['Ocupanți estimați', '' + ocup]], ['Indicator', 'Valoare']) }
      ];
      if (Object.keys(instSet).length) secs.push({ h: '3. Instalații implicate (din spații)', html: '<p>' + Object.keys(instSet).join(', ') + '</p>' });
      if (psiRows.length) secs.push({ h: '4. Cerințe PSI pe spații', html: tbl(psiRows, ['Spațiu', 'Categorie pericol', 'Detectare / stingere']) });
      if (Object.keys(avizSet).length) secs.push({ h: '5. Avizatori implicați (din spații)', html: '<p>' + Object.keys(avizSet).join(', ') + '</p>' });
      return { cat: 'Memorii Tehnice', file: 'Program_functional.doc', html: docHtml(_meta(D, 'PROGRAM FUNCȚIONAL', 'breviar de spații — model unic al investiției'), secs) };
    },
    'Scenariu securitate incendiu (P118)': function (D, v) {
      var ac = v.calc;
      // Cascada M0-M17 (aditiv) — activa DOAR daca proiectul a completat tip_lucrare (Sectiunea A, addendum v2.1)
      // si motoarele sunt incarcate; altfel fallback EXACT la comportamentul anterior (fara nicio schimbare).
      if (D.tip_lucrare && G.SSI_ENGINE && G.SSI_NORMATIVE_ENGINE) {
        return _buildScenariuSSICascada(D, v);
      }
      var deep = _lib(D, 'scenariu_psi');
      var secs = deep ? [
        { h: null, html: deep },
        { h: 'Anexă — sinteza echipării impuse de indicatorii proiectului', html: tbl([['Sprinklere', ac.sprinklere_oblig ? 'OBLIGATORII (SC>3000 mp / H>28m)' : 'după caz'], ['IDSI (detectare-semnalizare)', ac.idsi_oblig ? 'OBLIGATORIE (SC>2500 mp)' : 'după caz'], ['Lift de pompieri', ac.lift_oblig ? 'OBLIGATORIU (P+4 și peste)' : 'nu'], ['Hidranți interiori', (D.Sc > 600) ? 'da' : 'după caz']], ['Sistem', 'Necesitate']) }
      ] : [
        { h: '1. Riscul de incendiu și categoria de pericol', html: '<p>Categoria de pericol de incendiu: ' + esc(D.psi || ac.psi_default || 'C') + '. Grad de rezistență la foc recomandat: ' + esc(ac.grad_default || 'II') + '.</p>' },
        { h: '2. Echiparea și dotarea', html: tbl([['Sprinklere', ac.sprinklere_oblig ? 'OBLIGATORII (SC>3000 mp / H>28m)' : 'după caz'], ['IDSI (detectare-semnalizare)', ac.idsi_oblig ? 'OBLIGATORIE (SC>2500 mp)' : 'după caz'], ['Desfumare', (D.functiune === 'hala-industriala' && (D.Sc > 1000)) ? 'OBLIGATORIE (trape SHEV)' : 'după caz'], ['Lift de pompieri', ac.lift_oblig ? 'OBLIGATORIU (P+4 și peste)' : 'nu'], ['Hidranți interiori', (D.Sc > 600) ? 'da' : 'după caz']], ['Sistem', 'Necesitate']) },
        { h: '3. Referință', html: '<p>Scenariul complet, cu cele 7 capitole și motorul de verificare, se generează prin modulul dedicat SSI (Ord. MAI 180/2022, Anexa 5) al platformei, care preia datele acestui proiect. Completează „Tip de lucrare" în formularul de proiect pentru scenariul complet (nou/existent, vecinătăți, măsuri compensatorii).</p>' }
      ];
      return { cat: 'Memorii Tehnice', file: 'Scenariu_securitate_incendiu_P118.doc', html: docHtml(_meta(D, 'SCENARIU DE SECURITATE LA INCENDIU', 'Ord. MAI 180/2022, Anexa 5 · fundamentare aviz/autorizare ISU'), secs) };
    },
    'Deviz general HG 907': function (D, v) {
      var body;
      if (G.UXDevize && G.UXDevize.devizGeneralHtml) body = G.UXDevize.devizGeneralHtml(D, v);
      else body = '<p>Devizul general se întocmește conform HG 907/2016 (capitolele 1–6: cheltuieli pentru obținerea terenului, amenajarea terenului, asigurarea utilităților, proiectare/asistență tehnică, investiția de bază, alte cheltuieli). Articolele de deviz cu prețuri se preiau din baza de prețuri editabilă a platformei (modul deviz).</p>';
      return { cat: 'Devize', file: 'Deviz_general_HG907.doc', html: docHtml(_meta(D, 'DEVIZ GENERAL', 'conform HG 907/2016'), [{ h: 'Deviz general al investiției', html: body }]) };
    },
    'Opis + Listă proiectanți': function (D, v) {
      var faza = (D.faza === 'PTh' || D.faza === 'PTh+DE') ? 'P.Th. + D.E.' : 'D.T.A.C.';
      // A. Opis piese scrise (din documentele bifate în engine + minim standard)
      var docs = (Object.keys(D._docs || {}).filter(function (k) { return D._docs[k]; }));
      if (!docs.length) docs = ['Memoriu tehnic general', 'Memoriu de arhitectură', 'Memoriu de rezistență', 'Memorii de instalații (IS/IT/IE)', 'Scenariu de securitate la incendiu', 'Deviz general (HG 907/2016)'];
      var scriseRows = docs.map(function (n, i) { return ['A.' + (i + 1), n, '—']; });
      // B. Opis piese desenate — set standard pe faza
      var DES = [
        ['U.01', 'Plan de încadrare în zonă', '1:2000 / 1:5000'],
        ['U.02', 'Plan de situație (cu rețele și sistematizare)', '1:500'],
        ['U.03', 'Plan de trasare / sistematizare verticală', '1:500'],
        ['A.01', 'Plan subsol', '1:100 / 1:50'],
        ['A.02', 'Plan parter', '1:100 / 1:50'],
        ['A.03', 'Planuri etaje curente', '1:100 / 1:50'],
        ['A.04', 'Plan învelitoare / terasă', '1:100'],
        ['A.05', 'Secțiuni caracteristice (A-A, B-B)', '1:100 / 1:50'],
        ['A.06', 'Fațade (toate)', '1:100 / 1:50'],
        ['R.01', 'Plan fundații + detalii', '1:50'],
        ['R.02', 'Planuri cofraj și armare planșee', '1:50'],
        ['IS.01', 'Scheme instalații sanitare', '1:100'],
        ['IT.01', 'Scheme instalații termice/ventilare', '1:100'],
        ['IE.01', 'Scheme instalații electrice + priză de pământ', '1:100']
      ];
      if (faza !== 'P.Th. + D.E.') DES = DES.filter(function (r) { return !/cofraj|armare/i.test(r[1]); }); // DTAC: fără detalii de execuție
      // C. Colectiv de elaborare — bloc de semnături + ștampile
      var COL = [
        ['Coordonare / Șef proiect', esc(D.proiectant || ''), 'proiectant general', ''],
        ['Arhitectură', '', 'arhitect cu drept de semnătură', 'nr. TNA / OAR'],
        ['Rezistență (structură)', '', 'inginer constructor', 'nr. înreg. / AICPS'],
        ['Instalații sanitare', '', 'inginer instalații', ''],
        ['Instalații termice / HVAC', '', 'inginer instalații', ''],
        ['Instalații electrice', '', 'inginer instalații', ''],
        ['Securitate la incendiu (scenariu)', '', 'proiectant/cadru tehnic PSI', ''],
        ['Verificator cerința A (rezistență)', '', 'verificator atestat MDLPA', 'atestat nr. ___'],
        ['Verificator cerințele B/Cc/D/E', '', 'verificator atestat MDLPA', 'atestat nr. ___'],
        ['Verificator instalații (Is/It/Ie)', '', 'verificator atestat MDLPA', 'atestat nr. ___']
      ];
      return { cat: 'Piese Administrative', file: 'Opis_lista_proiectanti.doc', html: docHtml(_meta(D, 'OPIS AL DOCUMENTAȚIEI ȘI LISTA DE SEMNĂTURI', 'piese scrise și desenate · colectiv de elaborare — Legea 50/1991, Anexa 1'), [
        { h: 'A. Opis piese scrise', html: tbl(scriseRows, ['Cod', 'Denumirea piesei scrise', 'Nr. file']) },
        { h: 'B. Opis piese desenate', html: tbl(DES, ['Cod planșă', 'Denumirea planșei', 'Scara']) },
        { h: 'C. Colectiv de elaborare și lista de semnături', html:
          '<p>Documentația a fost întocmită și verificată de colectivul de mai jos. Fiecare specialist semnează și aplică ștampila pentru piesele proprii; verificatorii atestați MDLPA semnează și ștampilează referatele de verificare pe cerințele fundamentale (Legea 10/1995).</p>' +
          sigTable(COL, ['Specialitatea / rolul', 'Nume și prenume', 'Calitate', 'Nr. înreg. / atestat']) },
        { h: 'D. Confirmarea proiectantului', html: '<p>Proiectantul general confirmă că prezenta documentație este completă, corelată interdisciplinar și întocmită conform reglementărilor tehnice în vigoare pentru faza <b>' + faza + '</b>. Piesele scrise și desenate din opis constituie documentația de autorizare/execuție și se predau beneficiarului, respectiv se includ în Cartea tehnică a construcției.</p>' }
      ]) };
    },
    'Referate verificatori': function (D, v) {
      var fn = (G.UXDoc.FUNCTIUNI[D.functiune] || {}).label || D.functiune;
      var CER = [
        { c: 'A1/A2', n: 'Rezistență mecanică și stabilitate', ob: 'proiectul de rezistență (structură, fundații, note de calcul, planuri de armare)', norme: 'P100-1/2013, SR EN 1990-1999, NP 112/2014, Legea 10/1995' },
        { c: 'B1', n: 'Siguranță și accesibilitate în exploatare', ob: 'proiectul de arhitectură (circulații, PMR, balustrade, pardoseli, scări, lift)', norme: 'NP 068, NP 051/2012, Legea 448/2006' },
        { c: 'Cc', n: 'Securitate la incendiu', ob: 'scenariul de securitate la incendiu, memoriile, planurile de evacuare', norme: 'P118-1/2/3, Legea 307/2006, HG 571/2016' },
        { c: 'D', n: 'Igienă, sănătate și mediu înconjurător', ob: 'proiectul de arhitectură și instalații sanitare/ventilare', norme: 'Ord. MS 119/2014, C 107, Legea 10/1995' },
        { c: 'E', n: 'Economie de energie și izolare termică', ob: 'proiectul de arhitectură (anvelopă) + certificatul de performanță energetică', norme: 'C 107/2005, Legea 372/2005, Mc 001/2006' },
        { c: 'F', n: 'Protecție împotriva zgomotului', ob: 'soluțiile de izolare acustică (pereți, planșee, finisaje)', norme: 'C 125/2013' },
        { c: 'Is', n: 'Instalații sanitare', ob: 'proiectul de instalații sanitare (alimentare apă, canalizare)', norme: 'I9/2015, SR EN 806/12056' },
        { c: 'It', n: 'Instalații termice', ob: 'proiectul de instalații termice/HVAC (sursă, distribuție, necesar de căldură)', norme: 'I13/2015, I5/2010, SR EN 12831' },
        { c: 'Ie', n: 'Instalații electrice', ob: 'proiectul de instalații electrice (tablouri, priză de pământ, paratrăsnet)', norme: 'I7/2011, SR EN 62305' }
      ];
      var faza = (D.faza === 'PTh' || D.faza === 'PTh+DE') ? 'P.Th. + D.E.' : 'D.T.A.C.';
      var carac = _caracConstr(D, v);
      var ampl = (D.uat || '—') + (D.nrcad ? ', nr. cad. ' + D.nrcad : '');
      var cat = (G.UXDoc.FUNCTIUNI[D.functiune] || {}).cat || '';
      // Cerința F (protecție la zgomot) e relevantă doar la funcțiuni cu confort acustic critic
      var acustF = ['rezidential', 'turism', 'medical', 'invatamant', 'social', 'mixt'].indexOf(cat) >= 0;
      // Un referat = un FIȘIER separat, titlu propriu pe cerință
      function slug(c) { return c.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
      return CER.filter(function (r) { return r.c !== 'F' || acustF; }).map(function (r) {
        var body =
          '<p><b>Verificator tehnic de proiecte atestat MDLPA:</b> ______________________ (nume și prenume)<br>' +
          '<b>Domeniul / cerința de atestare:</b> ' + esc(r.c) + ' &nbsp;·&nbsp; <b>Atestat MDLPA nr.:</b> __________ / valabil până la __________</p>' +
          '<p style="text-align:center"><b>REFERAT DE VERIFICARE nr. ______ din data de ______________</b></p>' +
          '<h3>1. Date de identificare</h3>' +
          tbl([
            ['Denumirea proiectului / obiectivului', esc(fn)],
            ['Amplasament', esc(ampl)],
            ['Beneficiar / Investitor', esc(D.beneficiar || '—')],
            ['Proiectant general / de specialitate', esc(D.proiectant || '—')],
            ['Faza de proiectare verificată', faza],
            ['Cerința verificată', r.c + ' — ' + r.n],
            ['Nr. / data proiectului', '__________ / ______________']
          ], ['Element', 'Conținut']) +
          '<h3>2. Caracteristicile principale ale proiectului și ale construcției</h3>' +
          '<p>' + esc(carac) + '</p>' +
          '<h3>3. Documentele analizate (piese scrise și desenate)</h3>' +
          '<p>S-au analizat: ' + esc(r.ob) + '. Reglementări tehnice de referință: ' + esc(r.norme) + '.</p>' +
          '<h3>4. Concluziile verificării</h3>' +
          '<p>În urma verificării documentației la cerința fundamentală <b>' + esc(r.c) + ' — ' + esc(r.n) + '</b>, se constată că proiectul este întocmit cu respectarea reglementărilor tehnice în vigoare menționate. Se consideră că proiectul <b>CORESPUNDE</b> cerinței fundamentale ' + esc(r.c) + ', cu condiția însușirii de către proiectant a observațiilor consemnate mai jos (dacă există).</p>' +
          '<p><b>Observații / condiționări:</b> ______________________________________________________________________ (se completează de verificator; în lipsa observațiilor se înscrie „fără observații").</p>' +
          '<p>Prezentul referat face parte integrantă din documentația de autorizare/execuție și din Cartea tehnică a construcției. Verificarea nu îl absolvă pe proiectant de răspunderea pentru conținutul documentației (Legea 10/1995, art. 22; HG 925/1995).</p>' +
          sigTable([['Verificator tehnic atestat MDLPA — cerința ' + r.c, '', 'atestat nr. ______', 'data: __________']], ['Rol', 'Nume și prenume', 'Atestat', 'Data']);
        return { cat: 'Piese Administrative', file: 'Referat_verificare_cerinta_' + slug(r.c) + '.doc',
          html: docHtml(_meta(D, 'REFERAT DE VERIFICARE A PROIECTULUI — CERINȚA ' + r.c, r.n + ' — Legea 10/1995, HG 925/1995'), [{ h: null, html: body }]) };
      });
    },
    'PCCVI + faze determinante': function (D, v) {
      var fn = (G.UXDoc.FUNCTIUNI[D.functiune] || {}).label || D.functiune;
      var ampl = (D.uat || '—') + (D.nrcad ? ', nr. cad. ' + D.nrcad : '');
      // Program detaliat PCCVI — pe stadii fizice, cu document de referință, metodă, participanți, document încheiat
      // Participanți: E=Executant, P=Proiectant, B=Beneficiar/Diriginte, G=Geotehnician, ISC=Inspecția de Stat, FD=fază determinantă
      var P = [
        ['1', 'Trasarea construcției (axe, cote ±0,00)', 'proiect, plan de trasare', 'măsurători topo', 'E, B, P', 'PV trasare', ''],
        ['2', 'Natura terenului de fundare la cota de fundare', 'studiu geotehnic, proiect fundații', 'examinare vizuală + verificare strat portant', 'E, B, P, G, ISC', 'PV recepție teren / PVFD', 'FD1'],
        ['3', 'Recepția săpăturilor (cote, dimensiuni, sprijiniri)', 'proiect fundații, DTOE', 'măsurători, verificare sprijiniri', 'E, B', 'PVLA', ''],
        ['4', 'Strat de egalizare / pat de fundare', 'proiect, NE 012', 'verificare grosime, compactare (Ev2)', 'E, B', 'PVLA, buletin compactare', ''],
        ['5', 'Montarea armăturii fundațiilor / radierului', 'planuri de armare, SR EN 1992', 'verificare diametre, nr., poziție, acoperiri, înnădiri', 'E, B, P, ISC', 'PV recepție armătură / PVFD', 'FD2'],
        ['6', 'Betonarea fundațiilor / radierului', 'NE 012-2, rețetă beton', 'consistență (tasare), prelevare epruvete, bon livrare', 'E, B', 'bon beton, buletin SR EN 12390', ''],
        ['7', 'Hidroizolarea / cuva etanșă a subsolului', 'proiect, detalii, NP 040', 'verificare continuitate, etanșeitate, racorduri', 'E, B, P', 'PVLA lucrări ascunse', ''],
        ['8', 'Armarea stâlpilor / pereților structurali', 'planuri armare, P100-1', 'diametre, etrieri/confinare zone critice, acoperiri', 'E, B, P', 'PV recepție armătură', ''],
        ['9', 'Armarea planșeelor (grinzi, placă, noduri)', 'planuri armare, P100-1', 'poziție armătură, armătură de străpungere, noduri', 'E, B, P', 'PV recepție armătură', ''],
        ['10', 'Betonarea suprastructurii (pe niveluri)', 'NE 012, proiect', 'consistență, epruvete, rost de turnare, vibrare', 'E, B', 'bon beton, buletine rezistență', ''],
        ['11', 'Recepția structurii la roșu (înainte de închideri)', 'proiect rezistență', 'verificare geometrie, verticalitate, fisuri, decofrare', 'E, B, P, ISC', 'PVFD structură', 'FD3'],
        ['12', 'Zidării / compartimentări, buiandrugi, centuri', 'proiect, CR 6', 'verificare țesere, mortar, armare centuri', 'E, B', 'PVLA', ''],
        ['13', 'Termosistem (ETICS) / anvelopă termică', 'proiect termotehnic C107, agrement', 'aderență, grosime, dibluire, plasă', 'E, B, P', 'PVLA, PV recepție', ''],
        ['14', 'Învelitoare / terasă (hidroizolație, termoizolație)', 'proiect, detalii', 'etanșeitate (probă cu apă), pante, racorduri', 'E, B, P', 'PV probă etanșeitate, PVLA', ''],
        ['15', 'Tâmplărie exterioară (montaj, etanșare)', 'proiect, fișe tehnice', 'verificare montaj, etanșare, U declarat', 'E, B', 'PVLA', ''],
        ['16', 'Instalații sanitare — probe înainte de mascare', 'I9, proiect IS', 'probă de presiune / etanșeitate conducte', 'E, B, P', 'PV probă presiune, PVLA', 'FD4'],
        ['17', 'Instalații termice/HVAC — probe la rece/cald', 'I13/I5, proiect IT', 'probă presiune, probă funcționare, echilibrare', 'E, B', 'PV probe, buletine', ''],
        ['18', 'Instalații electrice — PRAM și priză de pământ', 'I7, SR EN 62305', 'măsurători PRAM, rezistență priză de pământ, continuitate', 'E, B, P', 'buletine PRAM, PV', ''],
        ['19', 'Instalații PSI (hidranți/sprinklere/detecție)', 'P118-2/3, proiect', 'probe presiune-debit, probe funcționale detecție', 'E, B, P', 'PV probe, scenariu SSI', ''],
        ['20', 'Finisaje interioare/exterioare', 'proiect arhitectură', 'planeitate, aderență, tolerante', 'E, B', 'PVLA, PV recepție', ''],
        ['21', 'Sistematizare, racorduri utilități, împrejmuire', 'proiect, avize', 'verificare execuție, racorduri la rețele', 'E, B', 'PVLA, PV racord', '']
      ];
      var pRows = P.map(function (r) { return [r[0], r[1], r[2], r[3], r[4], r[5] + (r[6] ? ' (' + r[6] + ')' : '')]; });
      // Program faze determinante — notificate ISC
      var FD = P.filter(function (r) { return r[6]; }).map(function (r) { return [r[6], r[1], r[4], 'notificare ISC cu min. 10 zile înainte']; });
      // extra FD structura la rosu daca nu e deja
      return { cat: 'Recepție & Urmărire', file: 'PCCVI_faze_determinante.doc', html: docHtml(_meta(D, 'PROGRAM DE CONTROL AL CALITĂȚII, VERIFICĂRI ȘI ÎNCERCĂRI (PCCVI)', 'pe faze de execuție și faze determinante — Legea 10/1995, HG 742/2018, HG 273/1994'), [
        { h: '1. Obiect, cadru legal și abrevieri', html: '<p>Prezentul program stabilește controalele de calitate, verificările și încercările pe parcursul execuției obiectivului „' + esc(fn) + '", ' + esc(ampl) + ', precum și fazele determinante la care se convoacă Inspectoratul de Stat în Construcții (ISC). Se întocmește de proiectant, se însușește de executant și beneficiar (diriginte de șantier atestat) și se avizează de ISC (Legea 10/1995, HG 742/2018, HG 273/1994 modificată prin HG 343/2017, Ordin ISC).</p><p><b>Abrevieri participanți:</b> E = Executant (responsabil tehnic cu execuția — RTE); B = Beneficiar / Diriginte de șantier; P = Proiectant; G = Geotehnician; ISC = Inspectoratul de Stat în Construcții. <b>FD</b> = fază determinantă. <b>PVLA</b> = proces-verbal de lucrări ascunse; <b>PVFD</b> = proces-verbal de fază determinantă.</p>' },
        { h: '2. Program de control pe faze de execuție (PCCVI)', html: tbl(pRows, ['Nr.', 'Lucrarea / faza supusă controlului', 'Document de referință', 'Metoda de verificare', 'Participă', 'Document încheiat']) },
        { h: '3. Program de faze determinante (se avizează ISC)', html: '<p>La fazele determinante execuția se oprește; continuarea se face numai după încheierea procesului-verbal de fază determinantă (PVFD) semnat de toți factorii și cu acordul ISC. Convocarea ISC se face în scris cu minim 10 zile lucrătoare înainte.</p>' + tbl(FD, ['Cod FD', 'Faza determinantă', 'Participă (obligatoriu)', 'Convocare']) },
        { h: '4. Controlul betoanelor și materialelor', html: tbl([['Beton', 'consistență (tasare/răspândire), clasă, prelevare min. 3 epruvete/element principal', 'SR EN 206, NE 012, buletine SR EN 12390'], ['Armătură', 'certificat de calitate, diametre, clasa de ductilitate (B500C zone seismice)', 'certificate 3.1, PV recepție'], ['Oțel/confecții metalice', 'certificate, suduri (VT/UT), protecție anticorozivă', 'buletine control suduri'], ['Agregate/mortar', 'conformitate, rețete', 'declarații de performanță']], ['Material', 'Ce se verifică', 'Document / normativ']) },
        { h: '5. Urmărirea comportării în timp (P130/1999)', html: '<p>După recepție se instituie urmărirea curentă a comportării construcției (examinări vizuale periodice — fisuri, tasări, hidroizolații, deformații), consemnată în Cartea tehnică. Pentru clasa de importanță I/II se prevede urmărire specială — monitorizarea tasărilor cu mărci topografice (măsurători la execuție și în primii ani de exploatare), stabilită prin proiect.</p>' },
        { h: '6. Recepția lucrărilor și Cartea tehnică', html: '<p>Recepția la terminarea lucrărilor și recepția finală se organizează conform HG 273/1994 (modificată prin HG 343/2017), cu comisie de recepție și consemnarea eventualelor obiecțiuni. Cartea tehnică a construcției se completează pe parcursul execuției (toate PVLA, PVFD, buletine, certificate) și se predă beneficiarului la recepție.</p>' },
        { h: '7. Semnături — însușirea programului', html: sigTable([
            ['Proiectant (elaborare)', esc(D.proiectant || ''), '', ''],
            ['Executant (RTE)', '', 'atestat RTE', ''],
            ['Beneficiar / Diriginte de șantier', '', 'autorizat', ''],
            ['ISC (avizare faze determinante)', '', '', '']
          ], ['Factor responsabil', 'Nume și prenume', 'Calitate / atestat', 'Data']) }
      ]) };
    },
    'Recepție (HG 273/1994)': function (D, v) {
      var deep = _lib(D, 'receptie');
      if (deep) return { cat: 'Recepție & Urmărire', file: 'Receptie_lucrari_HG273.doc', html: docHtml(_meta(D, 'RECEPȚIA LUCRĂRILOR DE CONSTRUCȚII', 'la terminarea lucrărilor + finală + carte tehnică + urmărire în timp — HG 273/1994'), [{ h: null, html: deep }]) };
      return { cat: 'Recepție & Urmărire', file: 'Proces_verbal_receptie.doc', html: docHtml(_meta(D, 'PROCES-VERBAL DE RECEPȚIE', 'la terminarea lucrărilor / finală — HG 273/1994'), [{ h: 'Proces-verbal de recepție', html: '<p>Se întocmește procesul-verbal de recepție la terminarea lucrărilor și, ulterior, recepția finală, conform HG 273/1994, cu comisia de recepție și eventualele obiecțiuni.</p>' }]) };
    },
    'Gantt + grafic finanțare': function (D, v) {
      var N = Math.max(6, Math.min(24, Math.round(+D.durata || 12))); // luni
      // activitati cu start/durata proportionale cu N si pondere % din C+M
      var ACT = [
        { n: 'Organizare de șantier', s: 0.00, d: 0.06, p: 2 },
        { n: 'Terasamente și săpături', s: 0.04, d: 0.06, p: 3 },
        { n: 'Infrastructură (fundații, hidroizolații)', s: 0.08, d: 0.14, p: 12 },
        { n: 'Suprastructură (cadre b.a., planșee)', s: 0.18, d: 0.28, p: 26 },
        { n: 'Închideri și compartimentări', s: 0.42, d: 0.18, p: 10 },
        { n: 'Învelitoare / terasă, tâmplărie exterioară', s: 0.50, d: 0.14, p: 8 },
        { n: 'Instalații (IS/IT/IE/HVAC/PSI)', s: 0.50, d: 0.28, p: 18 },
        { n: 'Finisaje interioare și exterioare', s: 0.66, d: 0.28, p: 15 },
        { n: 'Amenajări exterioare, împrejmuire', s: 0.82, d: 0.16, p: 4 },
        { n: 'Probe, verificări, recepție', s: 0.94, d: 0.06, p: 2 }
      ];
      var head = ['Activitate']; for (var m = 1; m <= N; m++) head.push('L' + m);
      var rows = ACT.map(function (a) {
        var s0 = Math.round(a.s * N), e0 = Math.min(N, Math.max(s0 + 1, Math.round((a.s + a.d) * N)));
        var r = [a.n]; for (var m = 1; m <= N; m++) r.push((m - 1 >= s0 && m - 1 < e0) ? '■' : ''); return r;
      });
      var gantt = tbl(rows, head);
      // finantare esalonata: valoare C+M repartizata pe luni dupa ponderea activitatilor active
      var cm = 0; try { cm = (v.calc && v.calc.deviz && v.calc.deviz.cm) ? +v.calc.deviz.cm : 0; } catch (e) {}
      if (!cm) cm = Math.round((+D.Sd || 900) * 1100); // estimare 1100 EUR/mp C+M
      var perMonth = new Array(N + 1).fill(0);
      ACT.forEach(function (a) {
        var s0 = Math.round(a.s * N), e0 = Math.min(N, Math.max(s0 + 1, Math.round((a.s + a.d) * N)));
        var span = Math.max(1, e0 - s0), val = cm * a.p / 100, per = val / span;
        for (var m = s0; m < e0; m++) perMonth[m + 1] += per;
      });
      var cum = 0; var finRows = [];
      for (var m = 1; m <= N; m++) { cum += perMonth[m]; finRows.push(['Luna ' + m, Math.round(perMonth[m]).toLocaleString('ro-RO'), Math.round(cum).toLocaleString('ro-RO'), (Math.round(cum / cm * 1000) / 10) + '%']); }
      finRows.push(['TOTAL C+M', Math.round(cm).toLocaleString('ro-RO'), Math.round(cm).toLocaleString('ro-RO'), '100%']);
      var fin = tbl(finRows, ['Perioada', 'Tranșă (EUR)', 'Cumulat (EUR)', '% din C+M']);
      var secs = [
        { h: '1. Durata și eșalonarea execuției', html: '<p>Durata estimată de execuție: <b>' + N + ' luni</b>. Graficul de eșalonare (Gantt) de mai jos corelează activitățile principale cu fazele determinante (PCCVI) și cu graficul de finanțare. Activitățile se suprapun controlat (fluxuri paralele) pentru încadrarea în durată.</p>' },
        { h: '2. Grafic Gantt de execuție', html: gantt + '<p style="font-size:11px;color:#666">■ = perioadă de desfășurare a activității. Drumul critic: terasamente → infrastructură → suprastructură → închideri → instalații mascate → finisaje → recepție.</p>' },
        { h: '3. Grafic de finanțare eșalonată (C+M)', html: '<p>Repartizarea valorii lucrărilor de construcții-montaj (C+M ≈ ' + Math.round(cm).toLocaleString('ro-RO') + ' EUR fără TVA) pe luni, proporțional cu volumul de lucrări executat. Tranșele se decontează pe baza situațiilor de lucrări confirmate de dirigintele de șantier.</p>' + fin },
        { h: '4. Corelări', html: '<p>Graficul se corelează cu: Devizul general (HG 907/2016) — valoarea C+M; PCCVI — momentele fazelor determinante (recepția fundațiilor, structurii la roșu, probelor de instalații); DTOE — organizarea de șantier și resursele. Orice modificare a duratei se reflectă în reeșalonarea tranșelor.</p>' }
      ];
      return { cat: 'Recepție & Urmărire', file: 'Grafic_executie_finantare.doc', html: docHtml(_meta(D, 'GRAFIC DE EXECUȚIE ȘI FINANȚARE', 'eșalonare Gantt + grafic de finanțare C+M'), secs) };
    },
    'Cartea tehnică a construcției': function (D, v) {
      var ac = v.calc || {}; var isPth = (D.faza === 'PTh' || D.faza === 'PTh+DE' || D.faza === 'PT');
      var fnLabel = (G.UXDoc.FUNCTIUNI[D.functiune] || {}).label || D.functiune || 'construcție';
      var ampl = (D.uat || '') + (D.nrcad ? ', nr. cad. ' + D.nrcad : '');
      // A — proiectare
      var A = ['Certificatul de urbanism + avizele și acordurile obținute (dosarele de avize)', 'Autorizația de construire + documentația tehnică D.T.A.C.', 'Proiectul tehnic de execuție (P.Th.+D.E.) — memorii pe specialități, caiete de sarcini, liste de cantități', 'Memoriile tehnice: general, arhitectură, rezistență, instalații', 'Scenariul de securitate la incendiu + avizul/autorizația ISU', 'Studiul geotehnic (verificat Af) și, după caz, studiul topografic', 'Referatele verificatorilor de proiect atestați (cerințele A-F)', 'Piese desenate: plan de situație/încadrare, planuri, fațade, secțiuni, detalii, planșe de rezistență și instalații', 'Programul de control al calității (PCCVI) însușit și avizat ISC', 'Devizul general (HG 907/2016)'];
      // B — execuție
      var B = ['Procesele-verbale de trasare a lucrărilor', 'Procesele-verbale de recepție a terenului de fundare și a fazelor de execuție', 'Procesele-verbale de lucrări ascunse (PVLA)', 'Procesele-verbale de fază determinantă (PVFD) — cu participarea ISC', 'Certificatele de calitate / declarațiile de performanță (DoP) ale materialelor puse în operă', 'Buletinele de încercări (beton, oțel, suduri VT/UT, compactări, prize de pământ)', 'Condica de betoane și registrul de procese-verbale', 'Dispozițiile de șantier ale proiectantului și soluțiile la neconformități', 'Jurnalul evenimentelor (Anexa)', 'Cartea tehnică a echipamentelor și instalațiilor (fișe, agremente, PIF)'];
      // C — recepție
      var C = ['Procesul-verbal de recepție la terminarea lucrărilor', 'Referatele proiectantului și ale dirigintelui de șantier la recepție', 'Procesul-verbal de recepție finală (după perioada de garanție)', 'Lista de remedieri și confirmarea executării lor', 'Certificatul de performanță energetică a clădirii'];
      // D — urmărire comportare în timp
      var Dsec = ['Programul de urmărire a comportării în timp (P130/1999) — curentă/specială', 'Rezultatele urmăririi (tasări, fisuri, coroziune, degradări) și interpretarea lor', 'Procesele-verbale de control periodic și după evenimente deosebite (seism, incendiu, inundație)', 'Instrucțiunile de exploatare și întreținere (mentenanță)', 'Documentele privind intervențiile ulterioare (reparații, consolidări, modificări)'];
      function opisSec(arr) { return opisCheck(arr.map(function (d, i) { return ['' + (i + 1), d]; }), ['Nr.', 'Document / piesă']); }
      var jurnal = tbl([['', '', '', ''], ['', '', '', ''], ['', '', '', '']], ['Data', 'Evenimentul (execuție/recepție/exploatare/intervenție/eveniment deosebit)', 'Documentul de referință', 'Semnătura responsabilului']);
      var resp = sigTable([
        ['Întocmirea cărții tehnice', 'investitorul / proiectantul (până la recepție)', ''],
        ['Completarea și păstrarea', 'proprietarul / administratorul', ''],
        ['Urmărirea comportării în timp', 'responsabil desemnat (P130/1999)', '']
      ], ['Obligație', 'Cine răspunde', 'Nume și prenume']);
      var secs = [
        { h: '1. Obiect și cadru legal', html: '<p>Cartea tehnică a construcției pentru obiectivul „' + esc(fnLabel) + '", ' + esc(ampl || '—') + ', se întocmește și se completează conform <b>Legii 10/1995</b> (calitatea în construcții), <b>HG 273/1994</b> (Regulamentul de recepție, modificat prin HG 343/2017) și <b>HG 766/1997 — Anexa 6</b> (Regulament privind conducerea și asigurarea calității / cartea tehnică). Cuprinde ansamblul documentelor privind proiectarea, execuția, recepția și urmărirea comportării în exploatare, grupate în secțiunile A–D.</p>' + tbl([['Obiectiv', esc(fnLabel)], ['Beneficiar', esc(D.beneficiar || '—')], ['Amplasament', esc(ampl || '—')], ['Faza', isPth ? 'P.Th. + D.E.' : 'D.T.A.C.'], ['Categorie/clasă importanță', (ac.categorie_importanta || '—') + ' / ' + (ac.clasa_importanta || '—')]], ['Element', 'Valoare']) },
        { h: '2. Structura cărții tehnice (borderou general)', html: '<p>Cartea tehnică se organizează în patru secțiuni și centralizatorul pieselor:</p>' + tbl([['A', 'Documentația privind proiectarea', '' + A.length + ' piese'], ['B', 'Documentația privind execuția', '' + B.length + ' piese'], ['C', 'Documentația privind recepția', '' + C.length + ' piese'], ['D', 'Documentația privind urmărirea comportării în exploatare și intervenții', '' + Dsec.length + ' piese']], ['Secț.', 'Conținut', 'Piese']) },
        { h: 'Secțiunea A — Documentația privind proiectarea', html: opisSec(A) },
        { h: 'Secțiunea B — Documentația privind execuția', html: opisSec(B) },
        { h: 'Secțiunea C — Documentația privind recepția', html: opisSec(C) },
        { h: 'Secțiunea D — Urmărirea comportării în timp și intervenții', html: opisSec(Dsec) },
        { h: '3. Jurnalul evenimentelor', html: '<p>Se completează cronologic, pe toată durata de existență a construcției, de către proprietar/administrator:</p>' + jurnal },
        { h: '4. Responsabilități și predare-primire', html: resp + '<p style="margin-top:6pt">Cartea tehnică se predă proprietarului la recepția la terminarea lucrărilor și se păstrează pe toată durata de existență a construcției; la înstrăinare se predă noului proprietar (Legea 10/1995). Nepredarea/necompletarea constituie contravenție.</p><p style="margin-top:6pt">Întocmit: ' + esc(D.proiectant || '____________________') + ' &nbsp; Data: ______________ &nbsp; Semnătura: ______________</p>' }
      ];
      var deepCT = _lib(D, 'carte_tehnica');
      if (deepCT) secs = [{ h: null, html: deepCT }, { h: 'ANEXĂ — Centralizatorul pieselor pe secțiuni (opis) și jurnalul evenimentelor pentru acest proiect', html: '<p>Următorul centralizator particularizează Cartea Tehnică pentru obiectivul de față, conform structurii metodologice de mai sus.</p>' }].concat(secs.slice(1));
      return { cat: 'Recepție & Urmărire', file: 'Cartea_tehnica_a_constructiei.doc', html: docHtml(_meta(D, 'CARTEA TEHNICĂ A CONSTRUCȚIEI', 'Legea 10/1995 · HG 273/1994 · HG 766/1997 Anexa 6 — regulament + secțiuni A–D + jurnal'), secs) };
    },
    'Memorii avizatori': function (D, v) {
      var ac = v.calc || {};
      var avize = Object.keys(D._avize || {}).filter(function (k) { return D._avize[k]; });
      if (!avize.length) avize = ['ISU', 'DSP', 'APM', 'Operator energie electrică', 'Operator apă-canal', 'Salubritate'];
      function match(a) { return String(a).toLowerCase(); }
      var COMUNE = ['Cerere-tip / solicitare de aviz (formular emitent)', 'Certificat de urbanism (copie)', 'Plan de încadrare în zonă', 'Plan de situație cu amplasarea obiectivului', 'Dovada titlului asupra terenului (extras CF actualizat)', 'Împuternicire / delegație (dacă e cazul)', 'Dovada achitării tarifului de avizare'];
      function memAviz(a) {
        var k = match(a); var emitent, temei, body, docs;
        if (/isu|pompier|incendiu/.test(k)) {
          emitent = 'Inspectoratul pentru Situații de Urgență (ISU) județean / IGSU'; temei = 'Legea 307/2006, HG 571/2016, Ordin MAI 129/2016, P118-1/2/3';
          body = 'Se solicită avizul/autorizația de securitate la incendiu. Categoria de pericol de incendiu: ' + esc(ac.psi_default || 'C') + '; grad de rezistență la foc: ' + esc(ac.grad_default || 'II') + '. Obiectivul dispune de: căi de evacuare dimensionate (P118-1), ' + (ac.idsi_oblig ? 'detectare-semnalizare (IDSAI, P118-3), ' : '') + (ac.sprinklere_oblig ? 'sprinklere (SR EN 12845), ' : '') + 'hidranți, stingătoare, iluminat de securitate. Documentul de fundamentare este Scenariul de securitate la incendiu.';
          docs = ['Scenariul de securitate la incendiu (semnat de cadru tehnic/expert)', 'Memoriu tehnic — securitate la incendiu', 'Planuri (situație, niveluri) cu marcarea căilor de evacuare, hidranților, IDSAI', 'Referatul verificatorului cerința Cc (securitate la incendiu)', 'Fișe tehnice echipamente PSI / agremente'];
        } else if (/dsp|sanit|sanatate/.test(k)) {
          emitent = 'Direcția de Sănătate Publică (DSP) județeană'; temei = 'Legea 95/2006, Ordin MS 119/2014';
          body = 'Se solicită avizul/notificarea sanitară. Se demonstrează: grupuri sanitare (inclusiv adaptat PMR), ventilarea și iluminarea naturală, alimentarea cu apă potabilă și evacuarea apelor uzate, finisaje lavabile/igienizabile în spațiile cu cerințe, gestiunea deșeurilor.';
          docs = ['Memoriu tehnic sanitar (funcțiuni, circuite, dotări sanitare)', 'Plan de situație și planuri de arhitectură (niveluri)', 'Descrierea sursei de apă și a evacuării apelor uzate', 'Schema circuitelor funcționale (unde e cazul: medical/alimentar)'];
        } else if (/mediu|apm/.test(k)) {
          emitent = 'Agenția pentru Protecția Mediului (APM)'; temei = 'OUG 195/2005, Legea 292/2018, Ordin 269/2020';
          body = 'Se solicită actul de reglementare de mediu. Funcțiunea se încadrează conform anexelor Legii 292/2018; se verifică arealele Natura 2000 și, după caz, pragurile SEVESO. Memoriul de prezentare (Anexa 5E) este piesă distinctă.';
          docs = ['Memoriu de prezentare (Anexa 5E, Legea 292/2018)', 'Plan de situație + plan de încadrare', 'Certificat de urbanism', 'Descrierea gestiunii deșeurilor și a apelor uzate', 'Clasare/decizie etapă de încadrare (după depunere)'];
        } else if (/gaz/.test(k)) {
          emitent = 'Operatorul de distribuție gaze naturale (aviz + acord acces)'; temei = 'Legea 123/2012, NTPEE-2018, Ordine ANRE';
          body = 'Se solicită avizul de racordare la gaze naturale. Se prezintă necesarul de gaz (debit de calcul), poziția postului de reglare-măsurare (SRM), traseul de racord, măsurile de siguranță (detector gaz + electrovalvă).';
          docs = ['Cerere de racordare + fișa de solicitare debit', 'Memoriu tehnic instalații gaze (debit, SRM, trasee)', 'Plan de situație cu poziția branșamentului și SRM', 'Schema izometrică a instalației de utilizare'];
        } else if (/transelectrica|transport.*energ|inalta tensiune|\blea\b|\bret\b|statie.*transformare/.test(k)) {
          emitent = 'C.N. Transelectrica S.A. — Aviz de amplasament (rețeaua electrică de transport — RET)'; temei = 'Legea 123/2012 (energiei electrice), Ordine ANRE, Norme tehnice privind delimitarea zonelor de protecție și de siguranță';
          body = '<p>Se solicită <b>avizul de amplasament Transelectrica</b> întrucât obiectivul se află în/în vecinătatea zonei de protecție și de siguranță a unei linii electrice aeriene de transport (LEA 220/400 kV) sau a unei stații de transformare din RET.</p>' +
            '<p><b>Soluția tehnică:</b> se prezintă poziția construcției față de axul LEA și față de conductoare, respectarea culoarului de trecere și a distanțelor de siguranță (pe orizontală și verticală) conform normelor tehnice, gabaritele construcției și utilajelor de execuție (macarale) sub linie, precum și măsurile de protecție împotriva tensiunilor induse și a apropierii de instalațiile RET.</p>';
          docs = ['Plan de situație cu poziția față de axul LEA/stație și culoarul de trecere', 'Plan de încadrare în zonă cu traseul RET', 'Profil transversal cu distanțele de siguranță (orizontal/vertical)', 'Descrierea gabaritelor de execuție (macarale) sub/în apropierea LEA'];
        } else if (/electric|energie|electrica/.test(k)) {
          emitent = 'Operatorul de distribuție energie electrică (Aviz tehnic de racordare — ATR)'; temei = 'Legea 123/2012, Ordine ANRE (Regulament racordare)';
          body = 'Se solicită avizul tehnic de racordare (ATR). Puterea instalată/absorbită rezultă din bilanțul electric (memoriu IE). Se prezintă poziția branșamentului, tabloul general, puterea solicitată.';
          docs = ['Cerere de racordare (ATR) + fișa de date energetice', 'Bilanțul de puteri (memoriu instalații electrice)', 'Plan de situație cu poziția branșamentului/PT', 'Certificat de urbanism, act de proprietate'];
        } else if (/apa|canal|apavital|raja|aquatim/.test(k)) {
          emitent = 'Operatorul de apă-canal (regional)'; temei = 'Legea 241/2006, I9/2015, NTPA-002';
          body = 'Se solicită avizul de branșare/racordare la apă-canal. Se prezintă debitele de apă (I9) și de ape uzate menajere/pluviale, poziția branșamentului și racordului la colectoare.';
          docs = ['Memoriu tehnic instalații sanitare (debite apă/canal)', 'Plan de situație cu rețelele și punctele de racord', 'Breviar de calcul debite (apă, menajer, pluvial)', 'Certificat de urbanism'];
        } else if (/salubr/.test(k)) {
          emitent = 'Operatorul de salubritate / autoritatea locală'; temei = 'Legea 101/2006, OUG 92/2021 (deșeuri)';
          body = 'Se solicită avizul de salubritate. Se prezintă platforma gospodărească de colectare selectivă a deșeurilor și modul de evacuare cu operatorul autorizat.';
          docs = ['Plan de situație cu platforma de deșeuri (dimensiuni, dotare)', 'Descrierea colectării selective și a contractului de salubrizare', 'Estimarea cantităților de deșeuri'];
        } else if (/protectie civil|ala|adapost/.test(k)) {
          emitent = 'ISU — protecție civilă'; temei = 'Legea 481/2004, HG 862/2016 (ALA)';
          body = 'Se solicită avizul de protecție civilă privind necesitatea/scutirea de adăpost ALA, în funcție de suprafața desfășurată' + (D.Sd ? ' (' + (+D.Sd).toLocaleString('ro-RO') + ' mp)' : '') + '.';
          docs = ['Memoriu tehnic ALA (necesitate/scutire, capacitate)', 'Planuri subsol/adăpost (dacă e cazul)', 'Plan de situație'];
        } else if (/circulat|rutier|drum|acces|cnair|cestrin|dispozitiv rutier/.test(k)) {
          emitent = 'Administratorul drumului (CNAIR S.A. — drumuri naționale / CJ — drumuri județene / Primărie — străzi) + Poliția Rutieră (IPJ)'; temei = 'OG 43/1997 (regimul drumurilor), Ordin 49/1998 (norme tehnice proiectare/realizare accese), Ordin 358/2018 (CNAIR), Legea 265/2008';
          body = '<p>Se solicită <b>acordul/avizul de amplasament și acces la drumul public</b>, respectiv autorizația de amplasare și acces în zona drumului (OG 43/1997). Obiectivul se racordează la ' + esc(D.uat || 'drumul public adiacent') + ' prin accese auto și pietonale dimensionate conform Ordin 49/1998.</p>' +
            '<p><b>Soluția de acces:</b> se prezintă poziția acceselor (auto grei/ușori, pietonal), razele de racordare, unghiul de intersecție, triunghiurile/distanțele de vizibilitate, benzile de decelerare/accelerare (unde e cazul pe drum național), semnalizarea rutieră (verticală și orizontală) și amenajarea pentru scurgerea apelor la limita zonei drumului. Se respectă zona de siguranță și de protecție a drumului.</p>' +
            '<p><b>Parcaje:</b> necesarul de locuri de parcare rezultă din funcțiune (' + ((ac.parcaje_necesare != null) ? ac.parcaje_necesare + ' locuri necesare' : 'breviar parcaje anexat') + '), asigurate în incintă, fără staționare pe drumul public.</p>';
          docs = ['Plan de situație cu accesele, razele de racordare și vizibilitatea (scara 1:500)', 'Plan de încadrare în zonă', 'Proiect de semnalizare rutieră (vertical + orizontal)', 'Breviar de calcul parcaje (necesar vs. asigurat)', 'Studiu/plan de circulație (după caz, pe drum național)'];
        } else if (/anif|imbunatatir|irigat|desec|amenajar.*funciar/.test(k)) {
          emitent = 'Agenția Națională de Îmbunătățiri Funciare (ANIF) — filiala teritorială'; temei = 'Legea 138/2004 (îmbunătățiri funciare), OUG 82/2011, Ordin MADR privind avizarea';
          body = '<p>Se solicită <b>avizul ANIF</b> întrucât terenul este situat în/în vecinătatea unei amenajări de îmbunătățiri funciare (irigații, desecare-drenaj, combaterea eroziunii solului) aflate în administrarea ANIF.</p>' +
            '<p><b>Soluția tehnică:</b> se prezintă poziția obiectivului față de canalele/conductele/stațiile de pompare și infrastructura de îmbunătățiri funciare, măsurile de protecție a acestora, menținerea funcționalității rețelei de desecare-drenaj și a scurgerii apelor, precum și modul de traversare/racordare dacă este cazul. Se tratează gestiunea apelor pluviale de pe platforme și acoperiș astfel încât să nu afecteze amenajarea.</p>' +
            '<p>Dacă terenul face parte dintr-o amenajare, se solicită, după caz, <b>scoaterea din amenajarea de îmbunătățiri funciare</b> (documentație distinctă).</p>';
          docs = ['Plan de situație cu poziția față de infrastructura ANIF (canale/conducte/stații)', 'Plan de încadrare în zonă', 'Extras CF + plan cadastral', 'Memoriu privind gestiunea apelor și protecția amenajării', 'Aviz de principiu / documentație scoatere din amenajare (dacă e cazul)'];
        } else if (/anar|apele rom|gospodarir.*ap|bazin.*hidro|aba/.test(k)) {
          emitent = 'Administrația Națională „Apele Române" (ANAR) — Administrația Bazinală de Apă'; temei = 'Legea 107/1996 (Legea apelor), Ordin 828/2019 (avize/autorizații de gospodărire a apelor)';
          body = '<p>Se solicită <b>avizul de gospodărire a apelor</b> (Legea 107/1996). Se prezintă sursa de alimentare cu apă, modul de evacuare a apelor uzate (menajere/pluviale/tehnologice) și încadrarea în limitele de calitate NTPA-001/002.</p>' +
            '<p><b>Bilanțul apei:</b> necesarul de apă, debitele de ape uzate menajere și pluviale (cu calculul debitului pluvial de pe suprafețele impermeabile), soluția de preepurare (separator de hidrocarburi pe platforme — SR EN 858), atenuarea/retenția pluvială și punctul de descărcare (rețea/emisar). Se verifică poziția față de cursuri de apă, zone inundabile și zone de protecție sanitară.</p>';
          docs = ['Plan de situație cu rețelele de apă-canal și punctele de descărcare', 'Breviar de calcul debite (apă, menajer, pluvial)', 'Studiu de gospodărire a apelor / memoriu tehnic', 'Fișa de date pentru avizul de gospodărire a apelor', 'Descrierea soluției de preepurare și atenuare pluvială'];
        } else if (/\bcfr\b|cale ferat|feroviar|infrastructur.*feroviar/.test(k)) {
          emitent = 'CNCF „CFR" S.A. — Aviz privind zona de siguranță și de protecție a infrastructurii feroviare'; temei = 'OUG 12/1998 (transportul pe căile ferate române), Legea 55/2006, norme tehnice feroviare';
          body = '<p>Se solicită <b>avizul CFR</b> întrucât obiectivul se află în zona de protecție (max. 100 m de la axul căii) sau de siguranță a infrastructurii feroviare publice.</p>' +
            '<p><b>Soluția tehnică:</b> se prezintă distanța construcției față de axul liniei ferate, respectarea zonelor de siguranță și de protecție, măsurile privind vibrațiile și zgomotul, scurgerea apelor, iluminatul (fără orbirea mecanicilor), precum și eventualele traversări/racorduri. Nu se afectează gabaritul și vizibilitatea semnalelor feroviare.</p>';
          docs = ['Plan de situație cu distanța față de axul căii ferate', 'Plan de încadrare cu zona de protecție/siguranță feroviară', 'Extras CF + plan cadastral', 'Memoriu privind măsurile de protecție (vibrații, zgomot, ape, iluminat)'];
        } else if (/consiliul jude|consiliu jude|\bcj\b|drum jude/.test(k)) {
          emitent = 'Consiliul Județean — Aviz (administrator drum județean / competențe județene)'; temei = 'OG 43/1997 (drumuri județene), Legea 215/2001 / OUG 57/2019 (administrație publică)';
          body = '<p>Se solicită <b>avizul Consiliului Județean</b> pentru accesul la drumul județean și/sau pentru aspectele de competență județeană (după caz, corelare cu PATJ).</p>' +
            '<p><b>Soluția tehnică:</b> se prezintă amenajarea accesului la drumul județean (raze de racordare, vizibilitate, semnalizare), încadrarea în zona drumului și măsurile de scurgere a apelor, corelat cu breviarul de parcaje asigurate în incintă.</p>';
          docs = ['Plan de situație cu accesul la drumul județean', 'Plan de încadrare în zonă', 'Proiect de semnalizare rutieră', 'Breviar parcaje'];
        } else if (/primar|\bpug\b|\bpuz\b|\bpud\b|oportunitate/.test(k)) {
          emitent = 'Primăria / Consiliul Local — Aviz de oportunitate / aviz al arhitectului-șef (după caz)'; temei = 'Legea 350/2001 (urbanism), Legea 50/1991, RLU/PUG local';
          body = '<p>Se solicită <b>avizul autorității locale</b> privind conformarea la documentațiile de urbanism aprobate (PUG/PUZ/PUD) și, unde e cazul, avizul de oportunitate pentru elaborarea unui PUZ.</p>' +
            '<p><b>Soluția tehnică:</b> se demonstrează încadrarea funcțiunii în zona reglementată, respectarea indicatorilor urbanistici (POT ' + (ac.POT || 0) + '%, CUT ' + (ac.CUT || 0) + '), a regimului de înălțime și a retragerilor din RLU, integrarea în context și rezolvarea acceselor, parcajelor și spațiilor verzi.</p>';
          docs = ['Plan de situație și de încadrare conform RLU/PUG', 'Certificat de urbanism', 'Ilustrare urbanistică / volumetrie (după caz)', 'Bilanț teritorial (POT/CUT/verde/parcaje)'];
        } else if (/patrimoniu|cultur|monument|arheolog|\bdjc\b/.test(k)) {
          emitent = 'Direcția Județeană pentru Cultură — Aviz (zone protejate / monumente / descărcare de sarcină arheologică)'; temei = 'Legea 422/2001 (monumente istorice), OG 43/2000 (patrimoniu arheologic), Legea 5/2000';
          body = '<p>Se solicită <b>avizul Direcției pentru Cultură</b> întrucât terenul se află într-o zonă construită protejată / zonă de protecție a unui monument istoric sau cu potențial arheologic.</p>' +
            '<p><b>Soluția tehnică:</b> se prezintă impactul asupra zonei protejate (regim de înălțime, aliniere, materiale, cromatică, integrare), iar în cazul potențialului arheologic se prevede <b>descărcarea de sarcină arheologică</b> (diagnostic/săpătură preventivă) înainte de execuție.</p>';
          docs = ['Plan de situație și de încadrare în zona protejată', 'Studiu istoric / de integrare (după caz)', 'Fotografii, ilustrare volumetrie și fațade', 'Certificat de descărcare de sarcină arheologică (dacă e cazul)'];
        } else if (/romatsa|aeronautic|obstacol|aviatie|aeroport/.test(k)) {
          emitent = 'ROMATSA / Autoritatea Aeronautică Civilă Română — Aviz privind servituțile aeronautice'; temei = 'Legea 21/2020 (Codul aerian), RACR-CADT, reglementări AACR privind obstacolarea';
          body = '<p>Se solicită <b>avizul aeronautic</b> pentru verificarea încadrării în suprafețele de limitare a obstacolelor (servituți aeronautice), în funcție de cota maximă a construcției (' + (D.H ? '+' + D.H + ' m' : 'H construcție') + ') și de amplasarea față de aerodromuri.</p>' +
            '<p><b>Soluția tehnică:</b> se prezintă cota maximă absolută a construcției și a instalațiilor de pe acoperiș (coșuri, antene), balizajul de obstacol dacă este necesar și încadrarea în suprafețele de siguranță aeronautică.</p>';
          docs = ['Plan de situație cu cota maximă absolută a construcției', 'Plan de încadrare cu poziția față de aerodromuri', 'Fișa cu înălțimile și coordonatele obstacolelor (antene/coșuri)'];
        } else if (/\bsri\b|serviciul roman|obiectiv special|securitate national/.test(k)) {
          emitent = 'Serviciul Român de Informații — Aviz (obiective de interes pentru securitatea națională, după caz)'; temei = 'Legea 51/1991, HG privind obiectivele speciale';
          body = '<p>Se solicită <b>avizul SRI</b> în măsura în care obiectivul se află în zona de competență / vecinătatea unui obiectiv de interes pentru securitatea națională, conform mențiunii din Certificatul de Urbanism.</p>' +
            '<p><b>Soluția tehnică:</b> se prezintă amplasarea, gabaritele și eventualele elemente relevante (înălțime, vizibilitate, rețele), cu respectarea condițiilor impuse de emitent.</p>';
          docs = ['Plan de situație și de încadrare în zonă', 'Memoriu tehnic sintetic', 'Certificat de urbanism'];
        } else if (/mapn|militar|aparare|ministerul apararii/.test(k)) {
          emitent = 'Ministerul Apărării Naționale — Aviz (zone de interes militar / servituți militare)'; temei = 'Legea 477/2003 (pregătirea economiei și teritoriului pentru apărare), reglementări MApN';
          body = '<p>Se solicită <b>avizul MApN</b> întrucât obiectivul se află în vecinătatea unei zone de interes militar sau este supus unor servituți militare.</p>' +
            '<p><b>Soluția tehnică:</b> se prezintă amplasarea față de obiectivul militar, respectarea zonelor de protecție/servituților, regimul de înălțime și eventualele restricții privind rețelele și înălțimea, conform condițiilor emitentului.</p>';
          docs = ['Plan de situație cu poziția față de zona de interes militar', 'Plan de încadrare în zonă', 'Memoriu privind respectarea servituților'];
        } else if (/telekom|orange|vodafone|digi|rcs|telecom|fibra|comunicatii electron/.test(k)) {
          emitent = 'Operatorul de comunicații electronice (telecom) — Aviz de amplasament / protejare rețele'; temei = 'OUG 111/2011 (comunicații electronice), Legea 159/2016 (infrastructura fizică)';
          body = '<p>Se solicită <b>avizul operatorului de comunicații electronice</b> pentru protejarea/relocarea rețelelor de telecomunicații (cabluri, fibră optică, canalizație) din zona amplasamentului, respectiv pentru racordul de date al obiectivului.</p>' +
            '<p><b>Soluția tehnică:</b> se prezintă poziția rețelelor telecom existente față de construcție și săpături, măsurile de protejare/relocare, precum și punctul de racord pentru serviciile de comunicații ale obiectivului.</p>';
          docs = ['Plan de situație cu rețelele telecom existente și punctul de racord', 'Plan de încadrare în zonă', 'Descrierea măsurilor de protejare/relocare rețele'];
        } else {
          emitent = 'Emitentul menționat în Certificatul de Urbanism pentru „' + a + '"'; temei = 'conform mențiunii din Certificatul de Urbanism și legislației specifice emitentului';
          body = '<p><b>Obiectul solicitării.</b> Se întocmește prezentul memoriu tehnic pentru obținerea avizului/acordului „' + esc(a) + '", solicitat prin Certificatul de Urbanism pentru obiectivul „' + esc((G.UXDoc.FUNCTIUNI[D.functiune] || {}).label || D.functiune || 'construcție') + '", ' + esc(D.uat || '') + (D.nrcad ? ', nr. cad. ' + esc(D.nrcad) : '') + '.</p>' +
            '<p><b>Descrierea obiectivului.</b> ' + esc(_caracConstr(D, v)) + '</p>' +
            '<p><b>Soluția relevantă pentru acest avizator.</b> Se prezintă elementele proiectului care fac obiectul competenței emitentului (amplasare, gabarite, racorduri/traversări, măsuri de protecție și de siguranță), corelate cu piesele desenate anexate. Se respectă condițiile și restricțiile impuse prin Certificatul de Urbanism și reglementările specifice domeniului avizatorului.</p>' +
            '<p><b>Măsuri și conformare.</b> Proiectul asigură conformarea la cerințele emitentului privind siguranța, protecția rețelelor/zonelor de protecție și continuitatea funcțională, urmând a se însuși condițiile din avizul emis în documentația de autorizare.</p>';
          docs = ['Memoriu tehnic specific pentru acest aviz', 'Plan de încadrare în zonă', 'Plan de situație (scara 1:500)', 'Piese desenate relevante pentru emitent', 'Certificat de urbanism (copie)'];
        }
        var faza = (D.faza === 'PTh' || D.faza === 'PTh+DE') ? 'P.Th. + D.E.' : 'D.T.A.C.';
        var fnLabel = (G.UXDoc.FUNCTIUNI[D.functiune] || {}).label || D.functiune || 'construcție';
        var ampl = (D.uat || '') + (D.nrcad ? ', nr. cad. ' + D.nrcad : '');
        var specHtml = (body.indexOf('<p') === 0 || body.indexOf('</p>') >= 0) ? body : '<p>' + body + '</p>';
        // Indicatori tehnici sintetici (comuni oricărui dosar de aviz)
        var indTbl = tbl([
          ['Suprafață teren', (D.Steren ? (+D.Steren).toLocaleString('ro-RO') + ' mp' : '—')],
          ['Suprafață construită (SC)', (D.Sc ? (+D.Sc).toLocaleString('ro-RO') + ' mp' : '—')],
          ['Suprafață desfășurată (SD)', (D.Sd ? (+D.Sd).toLocaleString('ro-RO') + ' mp' : '—')],
          ['Regim de înălțime', 'P+' + Math.max(0, (D.niv_supraterane || 1) - 1) + (D.H ? ' (H ' + D.H + ' m)' : '')],
          ['POT / CUT propuse', (ac.POT || 0) + '% / ' + (ac.CUT || 0)],
          ['Categorie/clasă importanță', (ac.categorie_importanta || '—') + ' / ' + (ac.clasa_importanta || '—')],
          ['Risc/categorie incendiu', (String(ac.risc_incendiu || 'mediu')) + ' · Cat. ' + (D.psi || ac.psi_default || 'C')]
        ], ['Indicator', 'Valoare']);
        // MEMORIU COMPLET, structurat — identic ca schelet, DIFERIT ca fond (per emitent)
        var memoriu =
          '<h3>1. Obiectul solicitării</h3><p>Prin prezenta se solicită avizul/acordul emis de <b>' + esc(emitent) + '</b> pentru obiectivul de investiții „' + esc(fnLabel) + '", amplasat în ' + esc(ampl || '—') + (D.nrCU ? ', conform Certificatului de Urbanism nr. ' + esc(D.nrCU) : ', conform Certificatului de Urbanism') + '. Avizul este solicitat prin CU și condiționează emiterea autorizației de construire (Legea 50/1991). Prezentul memoriu fundamentează tehnic solicitarea.</p>' +
          '<h3>2. Descrierea obiectivului</h3><p>' + esc(_caracConstr(D, v)) + '</p>' + indTbl +
          '<h3>3. Soluția tehnică relevantă pentru ' + esc(emitent.split('(')[0].split('—')[0].trim()) + '</h3>' + specHtml +
          '<h3>4. Măsuri de conformare și corelări</h3><p>Proiectul asigură conformarea la cerințele și restricțiile impuse de emitent prin Certificatul de Urbanism, precum și la reglementările tehnice specifice domeniului. Condițiile din avizul emis se însușesc obligatoriu în documentația tehnică pentru autorizarea executării lucrărilor (D.T.A.C.) și, după caz, în proiectul tehnic de execuție. Soluția este corelată interdisciplinar cu celelalte specialități (arhitectură, rezistență, instalații) și cu piesele desenate anexate.</p>' +
          '<h3>5. Temei legal și normativ</h3><p>' + esc(temei) + '. Documentația respectă Legea 50/1991 (autorizarea executării lucrărilor de construcții), Legea 350/2001 (urbanism) și reglementările specifice emitentului.</p>';
        var html =
          tbl([['Obiectiv', esc(fnLabel)], ['Beneficiar', esc(D.beneficiar || '—')], ['Amplasament', esc(ampl || '—')], ['Emitent aviz', esc(emitent)], ['Faza', faza]], ['Element', 'Conținut']) +
          memoriu +
          '<h3>6. Opisul documentelor din dosar</h3>' +
          '<p>Dosarul de aviz cuprinde documentele de mai jos; coloana „Anexat" se bifează la constituirea dosarului pentru depunere la emitent.</p>' +
          opisCheck(COMUNE.concat(docs).map(function (d, i) { return ['' + (i + 1), d]; }), ['Nr.', 'Document']) +
          '<h3>7. Întocmit / verificat</h3>' +
          sigTable([['Întocmit — proiectant de specialitate', esc(D.proiectant || ''), 'firmă / nr. atestat'], ['Verificat — șef proiect', '', 'drept de semnătură']], ['Rol', 'Nume și prenume', 'Calitate / atestat']) +
          '<p style="margin-top:8pt">Întocmit: ' + esc(D.proiectant || '____________________') + ' &nbsp;&nbsp; Data: ______________ &nbsp;&nbsp; Semnătura și ștampila: ______________</p>' +
          '<p style="font-size:10pt;color:#555">Prezentul memoriu se semnează și se ștampilează de proiectantul de specialitate cu drept de semnătură. Are caracter orientativ și se corelează cu piesele desenate anexate dosarului.</p>';
        return { emitent: emitent, temei: temei, html: html };
      }
      function slug(a) { return String(a).replace(/[ăâ]/gi, 'a').replace(/[îí]/gi, 'i').replace(/[șş]/gi, 's').replace(/[țţ]/gi, 't').replace(/[^A-Za-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 40) || 'aviz'; }
      // UN FIȘIER SEPARAT pentru FIECARE avizator bifat (dosar independent de depus) + un opis general
      var out = [];
      var opisRows = avize.map(function (a, i) { var m = memAviz(a); return ['' + (i + 1), a, m.emitent, m.temei]; });
      out.push({ cat: 'Avize', file: 'Avize_00_OPIS_general.doc', html: docHtml(_meta(D, 'AVIZE ȘI ACORDURI — OPIS GENERAL', 'lista dosarelor de avize · un memoriu separat / avizator'),
        [{ h: 'Notă introductivă', html: '<p>Pentru fiecare avizator bifat în Certificatul de Urbanism s-a generat un <b>memoriu tehnic separat</b> (fișier distinct), pentru a putea depune fiecare dosar independent la emitentul său. Fiecare dosar cuprinde cererea-tip, memoriul tehnic specific, piesele desenate relevante și opisul documentelor. Documente comune tuturor dosarelor: ' + COMUNE.slice(1).join('; ') + '.</p>' },
         { h: 'Lista avizatorilor și a dosarelor', html: tbl(opisRows, ['Nr.', 'Aviz / acord', 'Emitent', 'Temei legal']) }]) });
      avize.forEach(function (a, i) {
        var m = memAviz(a);
        out.push({ cat: 'Avize', file: 'Aviz_' + ('0' + (i + 1)).slice(-2) + '_' + slug(a) + '.doc',
          html: docHtml(_meta(D, 'DOSAR AVIZ — ' + a.toUpperCase(), 'memoriu tehnic + opis · ' + m.emitent), [{ h: null, html: m.html }]) });
      });
      return out;
    }
  };

  var PTH_ONLY = ['Caiet de sarcini arhitectură (PTh)', 'Caiet de sarcini rezistență (PTh)', 'Caiet de sarcini instalații (PTh)', 'Liste de cantități / antemăsurători (PTh)'];
  function _build(D, v) {
    var isPth = (D.faza === 'PTh' || D.faza === 'PTh+DE' || D.faza === 'PT');
    var selected = Object.keys(D._docs || {}).filter(function (k) { return D._docs[k] !== false && DOC_BUILDERS[k]; });
    if (!selected.length) selected = Object.keys(DOC_BUILDERS);
    // Caietele de sarcini + antemăsurătorile aparțin fazei PTh (Legea 50 Anexa 1: DTAC nu le conține)
    if (!isPth) selected = selected.filter(function (k) { return PTH_ONLY.indexOf(k) < 0; });
    var docs = []; // un builder poate întoarce un document SAU un array de documente (ex. câte un referat/cerință)
    selected.forEach(function (k) { try { var r = DOC_BUILDERS[k](D, v); if (Array.isArray(r)) docs = docs.concat(r.filter(Boolean)); else if (r) docs.push(r); } catch (e) {} });
    var base = 'Documentatie_' + (D.nrcad || (D.uat || 'proiect').replace(/\s+/g, '_'));
    // Numele de foldere în ZIP: FĂRĂ diacritice (altfel unzip pe macOS/Windows dă „Illegal byte sequence").
    function _folderAscii(s) {
      return String(s || 'Documente')
        .replace(/[șşŞȘ]/g, 's').replace(/[țţŢȚ]/g, 't').replace(/[ăâĂÂ]/g, 'a').replace(/[îÎ]/g, 'i')
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^A-Za-z0-9 &_.-]/g, '').replace(/\s+/g, ' ').trim() || 'Documente';
    }
    if (G.JSZip) {
      var zip = new G.JSZip();
      // Format STANDARD UrbanX (Word HTML .doc): Times New Roman, justify, titluri bleumarin — se deschide și se salvează în Word.
      docs.forEach(function (dc) { zip.folder(_folderAscii(dc.cat)).file(dc.file, docBlob(dc.html)); });
      zip.file('OPIS.txt', 'Dosar documentații UrbanX\n' + docs.length + ' documente\n\n' + docs.map(function (d) { return '· ' + _folderAscii(d.cat) + '/' + d.file; }).join('\n'));
      zip.generateAsync({ type: 'blob' }).then(function (blob) { _save(blob, base + '.zip'); if (G.ss) G.ss('✅ ' + docs.length + ' documente generate (ZIP)' + (v.neconformitati ? ' · ' + v.neconformitati + ' neconformități' : '')); });
    } else {
      docs.forEach(function (dc) { _save(docBlob(dc.html), dc.file); });
      if (G.ss) G.ss('✅ ' + docs.length + ' documente Word generate (JSZip indisponibil — salvate individual).');
    }
  }
  function genereazaDosar(D, v) {
    v = v || (G.UXDoc && G.UXDoc.valideaza(D)) || { calc: {}, checks: [], neconformitati: 0 };
    // Așteaptă conținutul profund din bibliotecă (dacă funcțiunea are), apoi construiește.
    var ready = (G.UXLibraryReady && D.functiune) ? G.UXLibraryReady(D.functiune) : Promise.resolve(null);
    if (G.ss && G.UXLibrary && !G.UXLibrary[D.functiune] && ready !== Promise.resolve(null)) G.ss('⏳ Se încarcă conținutul detaliat…');
    return Promise.resolve(ready).then(function () { _build(D, v); }).catch(function () { _build(D, v); });
  }
  function _save(blob, name) { try { var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500); } catch (e) {} }

  G.UXDocBuilder = { genereazaDosar: genereazaDosar, docHtml: docHtml, DOC_BUILDERS: DOC_BUILDERS, _htmlToWml: _htmlToWml, _docxBytes: _docxBytes };
  console.log('[UXDocBuilder] generator DOCX încărcat (' + Object.keys(DOC_BUILDERS).length + ' tipuri documente)');
})(window);
