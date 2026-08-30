/* ============================================================================
 * UrbanX — Bibliotecă documentații: CENTRU SOCIAL DE ZI (conținut profund)
 * Încarcă memoriile reale (arhitectură/structură/instalații/general+amenajări),
 * autorate pe normative (Legea 292/2011, NP 011, NP 051, C107, P100-1/2013,
 * Eurocod, I7/I9/I13/I5, P118, OMS 119…), din .md → HTML, și le înregistrează în
 * window.UXLibrary['centru-social'] pentru generatorul de documentații.
 * ========================================================================== */
(function (G) {
  'use strict';
  G.UXLibrary = G.UXLibrary || {};
  var BASE = 'js/urbanx-library/functiuni/centru-social-zi/';
  var FILES = { arhitectura: 'arhitectura.md', structura: 'structura.md', instalatii: 'instalatii.md', general: 'general.md',
    caiet_arh: 'caiet-sarcini-arhitectura.md', caiet_str: 'caiet-sarcini-rezistenta.md', caiet_inst: 'caiet-sarcini-instalatii.md',
    arh_pth: 'arhitectura-pth.md', str_pth: 'structura-pth.md', inst_pth: 'instalatii-pth.md',
    scenariu_psi: 'scenariu-psi.md', dtoe: 'dtoe.md', aviz_mediu: 'aviz-mediu.md', dali: 'dali.md', sf: 'sf.md', receptie: 'receptie.md', carte_tehnica: 'carte-tehnica.md' };

  // ── Curăță notația LaTeX (formule $$...$$) în text lizibil pt Word/PDF ─────
  function _delatex(s) {
    return String(s)
      .replace(/\$\$?/g, '')
      .replace(/\\text\s*\{\s*([^}]*)\}/g, ' $1').replace(/\\mathrm\s*\{([^}]*)\}/g, '$1')
      .replace(/\\left|\\right|\\,|\\;|\\!|\\quad|\\qquad/g, ' ')
      .replace(/\\cdot/g, '·').replace(/\\times/g, '×').replace(/\\approx/g, '≈')
      .replace(/\\leq|\\le\b/g, '≤').replace(/\\geq|\\ge\b/g, '≥').replace(/\\neq/g, '≠').replace(/\\pm/g, '±').replace(/\\infty/g, '∞')
      .replace(/\\varepsilon|\\epsilon/g, 'ε').replace(/\\gamma/g, 'γ').replace(/\\mu/g, 'μ').replace(/\\rho/g, 'ρ').replace(/\\sigma/g, 'σ').replace(/\\delta/g, 'δ').replace(/\\Delta/g, 'Δ').replace(/\\pi/g, 'π').replace(/\\eta/g, 'η').replace(/\\theta/g, 'θ').replace(/\\lambda/g, 'λ').replace(/\\beta/g, 'β').replace(/\\alpha/g, 'α').replace(/\\phi/g, 'φ').replace(/\\nu/g, 'ν').replace(/\\omega/g, 'ω').replace(/\\tau/g, 'τ').replace(/\\psi/g, 'ψ')
      .replace(/\\sqrt\s*\{([^}]*)\}/g, '√($1)').replace(/\\sqrt/g, '√')
      .replace(/\\frac\s*\{([^}]*)\}\s*\{([^}]*)\}/g, '($1)/($2)')
      .replace(/\{,\}/g, ',').replace(/\{\.\}/g, '.')
      .replace(/\^\{?2\}?/g, '²').replace(/\^\{?3\}?/g, '³')
      .replace(/_\{([^}]*)\}/g, '_$1').replace(/\^\{([^}]*)\}/g, '^$1')
      .replace(/\\\\/g, ' ')
      .replace(/\\([a-zA-Z]+)/g, '$1');
  }
  // ── Markdown → HTML (headings, tabele, liste, bold) — pt Word/PDF ──────────
  function mdToHtml(md) {
    if (!md) return '';
    var lines = _delatex(String(md).replace(/\r/g, '')).split('\n');
    var out = [], i = 0;
    function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
    function inl(s) { s = esc(s); s = s.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/\*([^*]+)\*/g, '<i>$1</i>'); s = s.replace(/`([^`]+)`/g, '$1'); return s; }
    while (i < lines.length) {
      var ln = lines[i];
      var t = ln.trim();
      if (!t) { i++; continue; }
      // tabel markdown
      if (/^\|.*\|$/.test(t) && i + 1 < lines.length && /^\|[\s:\-|]+\|$/.test(lines[i + 1].trim())) {
        var head = t.split('|').slice(1, -1).map(function (c) { return c.trim(); });
        i += 2; var rows = [];
        while (i < lines.length && /^\|.*\|$/.test(lines[i].trim())) { rows.push(lines[i].trim().split('|').slice(1, -1).map(function (c) { return c.trim(); })); i++; }
        out.push('<table><tr>' + head.map(function (c) { return '<th>' + inl(c) + '</th>'; }).join('') + '</tr>' + rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + inl(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</table>');
        continue;
      }
      var h = t.match(/^(#{1,6})\s+(.*)$/);
      if (h) { var lvl = Math.min(h[1].length, 4); out.push('<h' + (lvl === 1 ? 2 : lvl) + '>' + inl(h[2]) + '</h' + (lvl === 1 ? 2 : lvl) + '>'); i++; continue; }
      if (/^[-*]\s+/.test(t) || /^\d+[.)]\s+/.test(t)) {
        var ordered = /^\d+[.)]/.test(t); var tag = ordered ? 'ol' : 'ul'; var items = [];
        while (i < lines.length && (/^[-*]\s+/.test(lines[i].trim()) || /^\d+[.)]\s+/.test(lines[i].trim()))) { items.push('<li>' + inl(lines[i].trim().replace(/^([-*]|\d+[.)])\s+/, '')) + '</li>'); i++; }
        out.push('<' + tag + '>' + items.join('') + '</' + tag + '>'); continue;
      }
      if (/^---+$/.test(t)) { i++; continue; }
      // paragraf (adună linii consecutive)
      var para = [t]; i++;
      while (i < lines.length && lines[i].trim() && !/^(#{1,6}\s|\||[-*]\s|\d+[.)]\s|---+$)/.test(lines[i].trim())) { para.push(lines[i].trim()); i++; }
      out.push('<p>' + inl(para.join(' ')) + '</p>');
    }
    return out.join('\n');
  }
  G.UXLibMdToHtml = mdToHtml;

  var content = {}; var loaded = 0, total = Object.keys(FILES).length;
  var readyResolve; var readyP = new Promise(function (r) { readyResolve = r; });
  Object.keys(FILES).forEach(function (key) {
    fetch(BASE + FILES[key] + '?v=20260830b').then(function (r) { return r.ok ? r.text() : ''; }).then(function (md) {
      content[key] = { md: md, html: mdToHtml(md), pages_est: Math.round(md.length / 3000) };
    }).catch(function () { content[key] = { md: '', html: '', pages_est: 0 }; }).then(function () {
      loaded++; if (loaded >= total) { G.UXLibrary['centru-social'] = content; readyResolve(content); console.log('[UXLibrary] centru-social încărcat: ' + Object.keys(content).map(function (k) { return k + '~' + content[k].pages_est + 'p'; }).join(', ')); }
    });
  });
  G.UXLibrary._ready = G.UXLibrary._ready || {};
  G.UXLibrary._ready['centru-social'] = readyP;
  G.UXLibraryReady = function (fn) { return (G.UXLibrary._ready[fn]) || Promise.resolve(null); };
})(window);
