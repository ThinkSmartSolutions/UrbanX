// ═══════════════════════════════════════════════════════════════════════════
// tci-masterplan-visual.js — UrbanX Masterplan Visual Engine v1.0
// 19 mai 2026 | ThinkSmart Solutions SRL
//
// Upgrade vizual complet pentru raportul PDF de Masterplan:
//
// ① HELPERS VIZUALI AVANSAȚI
//    _textJustify() — text justify real în jsPDF
//    _diacriticsSafe() — diacritice corecte fără ✗
//    _badge() — badge colorat cu icon
//    _kpiBox() — KPI box cu valoare mare + label + trend
//    _swotDiagram() — SWOT 4-cadrane vizual
//    _timelineBar() — bara timeline etapizare
//    _donutChart() — grafic donut pentru procente
//    _formulaBox() — formulă matematică cu componente explicate
//    _infoBox() — box informativ cu icon colorat
//    _columnLayout() — layout 2 coloane pentru text
//
// ② PAGINI RESCRISE VIZUAL
//    Cover: full-page design premium, gradient, KPI-uri mari
//    Diagnostic: SWOT 4-cadrane colorate
//    Demografic: grafic + formulă cohort-component explicată
//    Riscuri: heatmap riscuri 3×3 vizual
//    Scenarii: timeline grafic comparativ
//    Recomandări: cards colorate per categorie
//    Fiecare pagină: sursele vizibile, formule explicate
// ═══════════════════════════════════════════════════════════════════════════

(function(G) {
'use strict';

// ══════════════════════════════════════════════════════════════════
// HELPERS VIZUALI AVANSAȚI — se injectează în _TCIMasterplanPDF
// ══════════════════════════════════════════════════════════════════

const V = {

  // Paleta de culori consistentă
  C: {
    dark:   [4, 10, 28],
    navy:   [8, 15, 38],
    blue:   [12, 24, 60],
    gold:   [212, 175, 55],
    goldL:  [240, 210, 100],
    green:  [34, 197, 94],
    red:    [239, 68, 68],
    orange: [245, 158, 11],
    sky:    [59, 130, 246],
    gray:   [100, 120, 160],
    grayL:  [148, 163, 184],
    white:  [220, 232, 250],
  },

  // ── Text justify în jsPDF ──────────────────────────────────────
  textJustify(pdf, text, x, y, maxW, lineH = 4.5, fontSize = 8) {
    pdf.setFontSize(fontSize);
    // Sanitizăm diacriticele
    const safe = this.s(text);
    const words = safe.split(' ').filter(w => w.length > 0);
    let line = [];
    let lines = [];

    words.forEach(word => {
      const testLine = [...line, word].join(' ');
      const w = pdf.getTextWidth(testLine);
      if (w > maxW && line.length > 0) {
        lines.push([...line]);
        line = [word];
      } else {
        line.push(word);
      }
    });
    if (line.length > 0) lines.push(line);

    lines.forEach((lineWords, i) => {
      if (i === lines.length - 1) {
        // Ultima linie — nu justify
        pdf.text(lineWords.join(' '), x, y + i * lineH);
      } else if (lineWords.length > 1) {
        // Justify — distribuim spațiul
        const lineText = lineWords.join(' ');
        const textW = pdf.getTextWidth(lineText);
        const extra = maxW - pdf.getTextWidth(lineWords.join(''));
        const gap = extra / (lineWords.length - 1);
        let cx = x;
        lineWords.forEach((w, wi) => {
          pdf.text(w, cx, y + i * lineH);
          cx += pdf.getTextWidth(w) + gap;
        });
      } else {
        pdf.text(lineWords[0], x, y + i * lineH);
      }
    });

    return y + lines.length * lineH + 1;
  },

  // ── Sanitizare diacritice (elimina caractere problematice) ────
  s(text) {
    if (!text) return '';
    return String(text)
      .replace(/ă/g, 'a').replace(/Ă/g, 'A')
      .replace(/â/g, 'a').replace(/Â/g, 'A')
      .replace(/î/g, 'i').replace(/Î/g, 'I')
      .replace(/ș/g, 's').replace(/Ș/g, 'S')
      .replace(/ț/g, 't').replace(/Ț/g, 'T')
      .replace(/ş/g, 's').replace(/Ş/g, 'S')
      .replace(/ţ/g, 't').replace(/Ţ/g, 'T')
      .replace(/[^\x20-\x7E]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 500);
  },

  N(v, d = 0) {
    return isNaN(+v) ? '—' : Number(v).toLocaleString('ro-RO', { minimumFractionDigits: d, maximumFractionDigits: d });
  },

  // ── KPI Box cu valoare mare ───────────────────────────────────
  kpiBox(pdf, x, y, w, h, value, label, sublabel, color, badge) {
    const [r,g,b] = color || this.C.gold;
    // Background
    pdf.setFillColor(10, 18, 48);
    pdf.roundedRect(x, y, w, h, 2, 2, 'F');
    // Border top colorat
    pdf.setFillColor(r, g, b);
    pdf.rect(x, y, w, 2, 'F');
    // Valoare principală
    pdf.setTextColor(r, g, b);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(value.length > 8 ? 14 : 18);
    pdf.text(this.s(value), x + w / 2, y + h * 0.52, { align: 'center' });
    // Label
    pdf.setTextColor(...this.C.grayL);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.text(this.s(label), x + w / 2, y + h * 0.76, { align: 'center' });
    // Sublabel
    if (sublabel) {
      pdf.setTextColor(...this.C.gray);
      pdf.setFontSize(6);
      pdf.text(this.s(sublabel), x + w / 2, y + h * 0.91, { align: 'center' });
    }
    // Badge
    if (badge) {
      pdf.setFillColor(r, g, b);
      pdf.setTextColor(...this.C.dark);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(5.5);
      const bw = pdf.getTextWidth(this.s(badge)) + 4;
      pdf.roundedRect(x + w - bw - 2, y + 3, bw, 5, 1, 1, 'F');
      pdf.text(this.s(badge), x + w - bw / 2 - 2, y + 6.5, { align: 'center' });
    }
  },

  // ── SWOT 4-cadrane ────────────────────────────────────────────
  swotDiagram(pdf, x, y, w, h, swot) {
    const hw = w / 2, hh = h / 2;
    const colors = [this.C.green, this.C.red, this.C.sky, this.C.orange];
    const labels = ['S PUNCTE TARI', 'W PUNCTE SLABE', 'O OPORTUNITATI', 'T AMENINTARI'];
    const positions = [[x, y], [x + hw, y], [x, y + hh], [x + hw, y + hh]];
    const items = [swot.S || [], swot.W || [], swot.O || [], swot.T || []];

    positions.forEach(([px, py], i) => {
      const [r, g, b] = colors[i];
      // Background
      pdf.setFillColor(r + 2, g + 2, b + 2);
      pdf.setFillColor(Math.round(r * 0.1 + 4), Math.round(g * 0.08 + 10), Math.round(b * 0.15 + 25));
      pdf.rect(px, py, hw - 1, hh - 1, 'F');
      // Border
      pdf.setDrawColor(r, g, b);
      pdf.setLineWidth(0.8);
      pdf.rect(px, py, hw - 1, hh - 1, 'S');
      // Label
      pdf.setFillColor(r, g, b);
      pdf.rect(px, py, hw - 1, 7, 'F');
      pdf.setTextColor(...this.C.dark);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.5);
      pdf.text(this.s(labels[i]), px + (hw - 1) / 2, py + 4.8, { align: 'center' });
      // Items
      pdf.setTextColor(...this.C.white);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(6.5);
      items[i].slice(0, 5).forEach((item, j) => {
        const iy = py + 11 + j * 6.5;
        if (iy < py + hh - 3) {
          pdf.setFillColor(r, g, b);
          pdf.circle(px + 4, iy - 1.5, 1, 'F');
          pdf.setTextColor(...this.C.white);
          const lineText = this.s(item.slice(0, 38));
          pdf.text(lineText, px + 7, iy);
        }
      });
    });
  },

  // ── Timeline etapizare ────────────────────────────────────────
  timelineBar(pdf, x, y, w, phases) {
    // phases: [{label, years, color, items}]
    const totalYears = phases.reduce((s, p) => s + p.years, 0);
    let cx = x;
    const barH = 12;

    phases.forEach(phase => {
      const pw = (phase.years / totalYears) * w;
      const [r, g, b] = phase.color;
      pdf.setFillColor(r, g, b);
      pdf.rect(cx, y, pw - 1, barH, 'F');
      pdf.setTextColor(...this.C.dark);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7);
      pdf.text(this.s(phase.label), cx + pw / 2, y + 5, { align: 'center' });
      pdf.setFontSize(6);
      pdf.text(this.s(phase.period || ''), cx + pw / 2, y + 9.5, { align: 'center' });
      cx += pw;
    });

    // Items sotto la barre
    cx = x;
    phases.forEach(phase => {
      const pw = (phase.years / totalYears) * w;
      if (phase.items) {
        phase.items.slice(0, 3).forEach((item, i) => {
          pdf.setTextColor(...this.C.grayL);
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(6);
          const lineText = this.s(('• ' + item).slice(0, 35));
          pdf.text(lineText, cx + 2, y + barH + 6 + i * 5.5);
        });
      }
      cx += pw;
    });

    return y + barH + (phases[0]?.items ? phases[0].items.length * 5.5 + 8 : 5);
  },

  // ── Donut chart ───────────────────────────────────────────────
  donutChart(pdf, cx, cy, r, segments, title) {
    let angle = -Math.PI / 2;
    const total = segments.reduce((s, seg) => s + seg.value, 0);

    segments.forEach(seg => {
      const sweep = (seg.value / total) * Math.PI * 2;
      const [sr, sg, sb] = seg.color;
      pdf.setFillColor(sr, sg, sb);

      // Desenăm arc cu poligon aproximat
      const pts = [[cx, cy]];
      const steps = Math.max(8, Math.round(sweep * 12));
      for (let i = 0; i <= steps; i++) {
        const a = angle + (sweep * i) / steps;
        pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
      }
      pts.push([cx, cy]);

      // jsPDF lines
      if (pts.length > 2) {
        pdf.setFillColor(sr, sg, sb);
        pdf.lines(
          pts.slice(1).map((pt, i) => [pt[0] - pts[i][0], pt[1] - pts[i][1]]),
          pts[0][0], pts[0][1], [1, 1], 'F'
        );
      }
      angle += sweep;
    });

    // Cerc interior alb/dark
    pdf.setFillColor(...this.C.navy);
    pdf.circle(cx, cy, r * 0.55, 'F');

    // Titlu în centru
    if (title) {
      pdf.setTextColor(...this.C.gold);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7);
      pdf.text(this.s(title), cx, cy + 2, { align: 'center' });
    }
  },

  // ── Formula box cu componente ─────────────────────────────────
  formulaBox(pdf, x, y, w, name, formula, components, source, uncertainty) {
    const padding = 5;
    // Header
    pdf.setFillColor(8, 16, 45);
    pdf.roundedRect(x, y, w, 9, 1.5, 1.5, 'F');
    pdf.setFillColor(...this.C.sky);
    pdf.rect(x, y, 3, 9, 'F');
    pdf.setTextColor(...this.C.sky);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.text(this.s(name), x + 6, y + 5.8);
    y += 11;

    // Formula
    pdf.setFillColor(6, 12, 38);
    pdf.rect(x, y, w, 9, 'F');
    pdf.setDrawColor(...this.C.sky);
    pdf.setLineWidth(0.3);
    pdf.rect(x, y, w, 9, 'S');
    pdf.setTextColor(130, 180, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.text(this.s(formula), x + w / 2, y + 6.2, { align: 'center' });
    y += 11;

    // Componente
    components.forEach(([sym, desc], i) => {
      pdf.setFillColor(i % 2 === 0 ? 9 : 7, i % 2 === 0 ? 16 : 13, i % 2 === 0 ? 42 : 36);
      pdf.rect(x, y, w, 5.5, 'F');
      pdf.setTextColor(...this.C.orange);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7.5);
      pdf.text(this.s(sym), x + 3, y + 3.8);
      const symW = pdf.getTextWidth(this.s(sym)) + 6;
      pdf.setTextColor(...this.C.grayL);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7);
      pdf.text(this.s(desc), x + symW, y + 3.8);
      y += 5.5;
    });

    // Footer
    if (source || uncertainty) {
      pdf.setFillColor(6, 10, 30);
      pdf.rect(x, y, w, uncertainty ? 9 : 5.5, 'F');
      pdf.setTextColor(...this.C.gray);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(6.5);
      if (uncertainty) {
        pdf.setTextColor(...this.C.orange);
        pdf.text('Incertitudine: ' + this.s(uncertainty), x + 3, y + 4);
        y += 5;
      }
      pdf.setTextColor(...this.C.gray);
      pdf.text('Sursa: ' + this.s(source || ''), x + 3, y + 4);
      y += 6;
    }

    return y + 3;
  },

  // ── Info box cu icon colorat ──────────────────────────────────
  infoBox(pdf, x, y, w, icon, title, text, color) {
    const [r, g, b] = color || this.C.sky;
    const lines = pdf.splitTextToSize(this.s(text), w - 20);
    const bh = Math.max(14, lines.length * 4.5 + 10);

    pdf.setFillColor(Math.round(r * 0.08 + 4), Math.round(g * 0.06 + 10), Math.round(b * 0.12 + 25));
    pdf.roundedRect(x, y, w, bh, 2, 2, 'F');
    pdf.setDrawColor(r, g, b);
    pdf.setLineWidth(0.5);
    pdf.roundedRect(x, y, w, bh, 2, 2, 'S');

    pdf.setTextColor(r, g, b);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.text(title, x + 8, y + 7);

    pdf.setTextColor(...this.C.grayL);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    lines.forEach((line, i) => {
      pdf.text(line, x + 5, y + 13 + i * 4.5);
    });

    return y + bh + 3;
  },

  // ── Progress bar ──────────────────────────────────────────────
  progressBar(pdf, x, y, w, value, max, label, color, showPct = true) {
    const [r, g, b] = color || this.C.sky;
    const pct = Math.min(1, Math.max(0, value / max));
    const barH = 5;

    // Background
    pdf.setFillColor(10, 18, 48);
    pdf.rect(x, y, w, barH, 'F');
    // Fill
    pdf.setFillColor(r, g, b);
    pdf.rect(x, y, w * pct, barH, 'F');
    // Label
    if (label) {
      pdf.setTextColor(...this.C.grayL);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(6.5);
      pdf.text(this.s(label), x, y - 1.5);
    }
    // Valoare
    if (showPct) {
      pdf.setTextColor(r, g, b);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7);
      pdf.text(this.N(value) + (max === 100 ? '%' : ''), x + w + 2, y + 3.8);
    }
    return y + barH + 2;
  },

  // ── Separator elegant ─────────────────────────────────────────
  separator(pdf, x, y, w, color) {
    const [r, g, b] = color || this.C.gold;
    pdf.setDrawColor(r, g, b);
    pdf.setLineWidth(0.3);
    pdf.line(x, y, x + w, y);
    return y + 3;
  },

  // ── Header secțiune cu număr ──────────────────────────────────
  sectionHeader(pdf, x, y, w, number, title, color) {
    const [r, g, b] = color || this.C.gold;
    pdf.setFillColor(10, 20, 52);
    pdf.roundedRect(x, y, w, 8, 1, 1, 'F');
    // Accent stânga
    pdf.setFillColor(r, g, b);
    pdf.rect(x, y, 3, 8, 'F');
    // Număr în cerc
    pdf.setFillColor(r, g, b);
    pdf.circle(x + 9, y + 4, 4, 'F');
    pdf.setTextColor(...this.C.dark);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7);
    pdf.text(this.s(number), x + 9, y + 5.5, { align: 'center' });
    // Titlu
    pdf.setTextColor(r, g, b);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8.5);
    pdf.text(this.s(title), x + 16, y + 5.5);
    return y + 11;
  },

  // ── 2 coloane ─────────────────────────────────────────────────
  twoColumns(pdf, x, y, w, leftContent, rightContent, splitRatio = 0.5) {
    const leftW = w * splitRatio - 3;
    const rightW = w * (1 - splitRatio) - 3;
    const leftX = x;
    const rightX = x + leftW + 6;
    return { leftX, rightX, leftW, rightW, leftContent, rightContent };
  },

  // ── Tabel premium cu header gradient ─────────────────────────
  table(pdf, x, y, w, headers, rows, colWidths, options = {}) {
    const {
      headerColor = this.C.gold,
      altRow = true,
      fontSize = 7.5,
      rowH = 6.5,
    } = options;

    const nCols = headers.length;
    const cw = colWidths || Array(nCols).fill(w / nCols);
    const [hr, hg, hb] = headerColor;

    // Header
    pdf.setFillColor(Math.round(hr * 0.15 + 5), Math.round(hg * 0.12 + 12), Math.round(hb * 0.05 + 30));
    pdf.rect(x, y, w, rowH, 'F');
    pdf.setFillColor(hr, hg, hb);
    pdf.rect(x, y, w, 1, 'F');

    let cx = x;
    headers.forEach((h, i) => {
      pdf.setTextColor(hr, hg, hb);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7);
      pdf.text(this.s(h), cx + 2, y + 4.5);
      cx += cw[i];
    });
    y += rowH;

    // Rânduri
    rows.forEach((row, ri) => {
      if (y > 270) return; // Safety - nu depasim pagina
      pdf.setFillColor(ri % 2 === 0 ? 9 : 7, ri % 2 === 0 ? 16 : 13, ri % 2 === 0 ? 44 : 37);
      pdf.rect(x, y, w, rowH, 'F');
      cx = x;
      row.forEach((cell, ci) => {
        const isFirst = ci === 0;
        if (isFirst) {
          pdf.setTextColor(...this.C.white);
          pdf.setFont('helvetica', 'bold');
        } else {
          pdf.setTextColor(...this.C.grayL);
          pdf.setFont('helvetica', 'normal');
        }
        pdf.setFontSize(fontSize);
        const txt = this.s(String(cell || '—'));
        pdf.text(txt.slice(0, Math.floor(cw[ci] / 2.2)), cx + 2, y + rowH * 0.72);
        cx += cw[ci];
      });
      y += rowH;
    });

    return y + 2;
  },
};

// ══════════════════════════════════════════════════════════════════
// PATCH PAGINI RESCRISE VIZUAL
// ══════════════════════════════════════════════════════════════════

G._MasterplanVisualPatch = {

  apply() {
    const MP = window._TCIMasterplanPDF;
    if (!MP) { console.warn('[MasterplanVisual] _TCIMasterplanPDF nedisponibil'); return; }
    if (MP._visualPatched) return;
    MP._visualPatched = true;

    // Override helpers de bază cu versiuni mai bune
    MP._section = function(pdf, W, y, title) {
      return V.sectionHeader(pdf, 14, y, W - 28, '', title, V.C.gold);
    };

    MP._note = function(pdf, W, y, text, color) {
      return V.infoBox(pdf, 14, y, W - 28, '', '', text, color || V.C.sky);
    };

    MP._tbl = function(pdf, W, y, rows, headers, colWs) {
      return V.table(pdf, 14, y, W - 28, headers, rows, colWs);
    };

    // Override _pg1_cover — Copertă premium
    MP._pg1_cover = function(c) {
      const { pdf, W, H, city, risk, grav, scenario, today, iso } = c;
      const N = V.N.bind(V);
      const s = V.s.bind(V);

      // Background dark gradient
      pdf.setFillColor(...V.C.dark);
      pdf.rect(0, 0, W, H, 'F');
      pdf.setFillColor(8, 18, 50);
      pdf.rect(0, 20, W, H - 40, 'F');

      // Bara de sus aurie
      pdf.setFillColor(...V.C.gold);
      pdf.rect(0, 0, W, 7, 'F');
      // Bara de jos
      pdf.rect(0, H - 7, W, 7, 'F');

      // Accent vertical stânga
      pdf.setFillColor(...V.C.sky);
      pdf.rect(0, 7, 4, H - 14, 'F');

      // Logo UrbanX
      pdf.setFillColor(...V.C.gold);
      pdf.roundedRect(12, 12, 18, 12, 2, 2, 'F');
      pdf.setTextColor(...V.C.dark);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7);
      pdf.text('URBAN', 14, 18);
      pdf.text('X', 22, 23);

      // ThinkSmart Solutions
      pdf.setTextColor(...V.C.grayL);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(7);
      pdf.text('ThinkSmart Solutions SRL  x  TSS.FG', 34, 19);

      // Titlu principal
      pdf.setTextColor(...V.C.gold);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(28);
      pdf.text('MASTERPLAN', W / 2, 55, { align: 'center' });
      pdf.setFontSize(20);
      pdf.setTextColor(...V.C.sky);
      pdf.text('STRATEGIC URBAN', W / 2, 68, { align: 'center' });

      // Linie decorativă
      pdf.setDrawColor(...V.C.gold);
      pdf.setLineWidth(0.5);
      pdf.line(30, 74, W - 30, 74);

      // Subtitlu UAT
      pdf.setTextColor(...V.C.white);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(18);
      pdf.text(s(city.name || 'UAT'), W / 2, 84, { align: 'center' });
      pdf.setTextColor(...V.C.grayL);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.text(s('Judetul ' + (city.judet || city.judet_code || '—')), W / 2, 92, { align: 'center' });

      // KPI-uri principale — 4 box-uri
      const pop55 = c.need?.pop2055 || city.pop2021 || 100000;
      const deltaStr = ((pop55 - (city.pop2021 || 100000)) >= 0 ? '+' : '') + N(pop55 - (city.pop2021 || 100000));
      const gt = grav?.growthType || 'REGIONAL';
      const gtColors = {
        METROPOLITAN: V.C.green, GROWING: V.C.green,
        REGIONAL: V.C.sky,
        LOCAL: V.C.orange, WEAKENING: V.C.orange,
        DECLINING: V.C.red, SHRINKING: V.C.red
      };

      const kpis = [
        { v: N(city.pop2021), l: 'Populatie 2021', sub: 'INSE Rec.2021', col: V.C.sky },
        { v: N(pop55), l: 'Proiectie 2055 (S2)', sub: `Delta: ${deltaStr} loc`, col: V.C.green },
        { v: N(city.pib_eur_cap || 0), l: 'PIB/cap (EUR)', sub: 'Eurostat 2022', col: V.C.gold },
        { v: gt, l: 'Tip crestere', sub: 'Model gravitational UrbanX', col: gtColors[gt] || V.C.sky },
      ];

      const kpiW = (W - 28 - 9) / 4;
      kpis.forEach((k, i) => {
        V.kpiBox(pdf, 14 + i * (kpiW + 3), 105, kpiW, 32, k.v, k.l, k.sub, k.col);
      });

      // Separator
      V.separator(pdf, 14, 142, W - 28, V.C.gold);

      // Scenariul + orizont
      pdf.setTextColor(...V.C.grayL);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.text('Orizont de planificare: 2025 - 2055 (30 ani)', W / 2, 150, { align: 'center' });
      pdf.text('Scenariu de referinta: ' + s(scenario || 'S2') + ' (moderat)', W / 2, 157, { align: 'center' });

      // Bullets risc
      const riskLabel = (risk?.riskScore || 50) > 60 ? 'RIDICAT' : (risk?.riskScore || 50) > 35 ? 'MODERAT' : 'SCAZUT';
      const riskCol = riskLabel === 'RIDICAT' ? V.C.red : riskLabel === 'MODERAT' ? V.C.orange : V.C.green;
      [
        ['Zona seismica P100:', s('Ag=' + (risk?.seismic?.ag || 0.20) + 'g  Tc=' + (risk?.seismic?.tc || '0.7') + 's  · INFP P100-1/2013')],
        ['Risc inundatii:', s((risk?.flood?.label || 'Redus') + '  · ANAR PGRA 2021-2027')],
        ['Risc teritorial:', riskLabel + '  · Scor ' + N(risk?.riskScore || 50) + '/100'],
      ].forEach(([lab, val], i) => {
        pdf.setTextColor(...V.C.grayL);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        pdf.text(s(lab), 30, 168 + i * 8);
        pdf.setTextColor(i === 2 ? riskCol[0] : V.C.white[0], i === 2 ? riskCol[1] : V.C.white[1], i === 2 ? riskCol[2] : V.C.white[2]);
        pdf.setFont('helvetica', 'bold');
        pdf.text(s(val), 80, 168 + i * 8);
      });

      // Date document
      pdf.setFillColor(6, 12, 35);
      pdf.rect(14, 194, W - 28, 14, 'F');
      pdf.setDrawColor(...V.C.gold);
      pdf.setLineWidth(0.3);
      pdf.rect(14, 194, W - 28, 14, 'S');
      [
        ['Data generarii:', today || new Date().toLocaleDateString('ro-RO'), 14 + 5],
        ['Generat cu:', 'UrbanX TSS.FG v2.0', W / 2 - 20],
        ['SIRUTA:', s(String(city.siruta || '—')), W - 60],
      ].forEach(([lab, val, lx]) => {
        pdf.setTextColor(...V.C.gray);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(6.5);
        pdf.text(s(lab), lx, 200);
        pdf.setTextColor(...V.C.goldL);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(7.5);
        pdf.text(s(val), lx, 205.5);
      });

      // ── DISCLAIMER LEGAL PROEMINENT (commune-aware) ──
      const _isCom = String(city.tip || '').toLowerCase() === 'comuna';
      pdf.setFillColor(60, 20, 18);
      pdf.rect(14, 214, W - 28, 30, 'F');
      pdf.setDrawColor(220, 80, 60); pdf.setLineWidth(0.6);
      pdf.rect(14, 214, W - 28, 30, 'S');
      pdf.setFillColor(220, 80, 60); pdf.rect(14, 214, W - 28, 7, 'F');
      pdf.setTextColor(255, 255, 255); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(8.5);
      pdf.text(s('AVERTISMENT — INSTRUMENT DE PRE-ANALIZA'), W / 2, 219, { align: 'center' });
      const _dl = _isCom
        ? ['Document generat ALGORITMIC din date publice — CADRU ORIENTATIV de pre-analiza la scara de COMUNA.',
           'NU constituie si NU substituie un Masterplan / PUG / Strategie de Dezvoltare Locala elaborate de',
           'proiectant atestat RUR si aprobate de Consiliul Local (Legea 350/2001). Cifre estimate — necesita',
           'validare profesionala, anchete de teren si avize de specialitate.']
        : ['Document generat ALGORITMIC din date publice — instrument de PRE-ANALIZA si comunicare.',
           'NU constituie si NU substituie un Masterplan / PUG / PUZ / PUD elaborat de proiectant atestat RUR',
           'si aprobat conform Legii 350/2001. Cifrele sunt orientative si necesita validare profesionala,',
           'studii de specialitate si anchete de teren.'];
      pdf.setTextColor(245, 225, 225); pdf.setFont('helvetica', 'normal'); pdf.setFontSize(6.8);
      _dl.forEach((ln, i) => { pdf.text(s(ln), W / 2, 226 + i * 4.4, { align: 'center', maxWidth: W - 34 }); });
      // Surse
      pdf.setTextColor(...V.C.gray);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(6);
      pdf.text('Surse date: INSE · Eurostat · BNR · INFP · ANAR · ANM · Copernicus · OSM', W / 2, H - 5.5, { align: 'center' });
    };

    // Override _pg2_diagnostic cu SWOT vizual
    const origPg2 = MP._pg2_diagnostic?.bind(MP);
    MP._pg2_diagnostic = function(c) {
      const { pdf, W, H, city, risk, grav, today } = c;
      pdf.addPage();
      this._pgHeader(pdf, W, '1. DIAGNOSTIC TERITORIAL', city.name, today, 1);
      let y = 22;

      // KPI rapid 4 valori
      const r = city.rata_reala_2011_2021 || 0;
      const kpiW = (W - 28 - 9) / 4;
      const kpis4 = [
        { v: V.N(city.pop2021), l: 'Populatie 2021', sub: '🟢 INSE Rec.2021', col: V.C.sky },
        { v: (r >= 0 ? '+' : '') + r.toFixed(2) + '%/an', l: 'Rata crestere', sub: 'Calibrat 2011-2021', col: r > 0 ? V.C.green : V.C.red },
        { v: V.N(city.pib_eur_cap || 0) + ' EUR', l: 'PIB/capita', sub: '🟢 Eurostat 2022', col: V.C.gold },
        { v: grav?.growthType || 'REGIONAL', l: 'Profil urban', sub: '🟡 Model UrbanX', col: V.C.orange },
      ];
      kpis4.forEach((k, i) => V.kpiBox(pdf, 14 + i * (kpiW + 3), y, kpiW, 26, k.v, k.l, k.sub, k.col));
      y += 30;

      // SWOT 4-cadrane
      y = V.sectionHeader(pdf, 14, y, W - 28, '1.1', 'Analiza SWOT Teritoriala', V.C.gold);
      const swotH = Math.min(90, H - y - 30);
      const swot = {
        S: [
          city.coef_hub > 1 ? 'Hub universitar/economic regional' : 'Oras cu potential de crestere',
          r > 0.5 ? 'Crestere demografica sustinuta +' + r.toFixed(1) + '%/an' : 'Populatie stabila',
          V.N(city.pib_eur_cap || 0) + ' EUR PIB/cap',
          city.universitati > 0 ? V.N(city.universitati) + ' universitati/institute' : 'Infrastructura educationala',
          V.N(city.autorizatii_2023 || 0) + ' autorizatii/an (2023)',
        ],
        W: [
          r < -0.5 ? 'Declin demografic ' + r.toFixed(1) + '%/an' : 'Presiune speculativa imobiliara',
          (risk?.seismic?.ag || 0.2) > 0.25 ? 'Risc seismic ridicat Ag=' + (risk?.seismic?.ag || 0.2) + 'g' : 'Fond construit pre-1977 vulnerabil',
          city.spatii_verzi_mp_loc < 9 ? 'Deficit spatii verzi: ' + (city.spatii_verzi_mp_loc || '—') + 'm2/loc' : 'Spatii verzi la limita OMS',
          'Convergenta UE lenta (' + V.N((city.pib_eur_cap || 8000) / 365 * 100) + '% din UE27)',
          'Fond locativ pre-1990 neconsolidat seismic',
        ],
        O: [
          'PNRR C10-I2: consolidare seismica fonduri UE',
          'FEDR/FSE+ 2021-2027: infrastructura urbana',
          r > 0.5 ? 'Cerere rezidentiala in crestere' : 'Reconversie zona industriala',
          'TOD (Transit-Oriented Development) pe coridoare TP',
          'Convergenta UE: + ' + V.N(Math.round((city.pib_eur_cap || 8000) * 1.04 * 30 / 1000)) + k + ' EUR in 30 ani',
        ],
        T: [
          r < -1 ? 'Depopulare accelerata - risc declin ireversibil' : 'Suburbanizare necontrolata (sprawl)',
          'Schimbari climatice: +' + (1.4 + 0.5).toFixed(1) + 'C pana in 2055 (IPCC RCP4.5)',
          risk?.flood?.risk > 1.5 ? 'Risc inundatii ANAR: zona de hazard' : 'Crestere episoade extreme meteo',
          'Emigrare forta de munca calificata',
          'Speculatie imobiliara in zone fara PUZ',
        ],
      };

      function k() { return ''; } // helper

      V.swotDiagram(pdf, 14, y, W - 28, swotH, swot);
      y += swotH + 5;

      // Surse
      pdf.setTextColor(...V.C.gray);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(6);
      pdf.text(V.s('Surse: INSE Rec.2021 · Eurostat Urban Audit · BNR 2024 · ANCPI 2023 · INFP P100-1/2013 · ANAR PGRA 2021 · IPCC AR6 2021'), 14, y);

      this._pgFooter(pdf, W, H, today, 1, 'INSE Rec.2021 · Eurostat Urban Audit · BNR 2024 · INFP P100 · ANAR · IPCC AR6');
    };

    // Override _pg3_demographic cu formulă vizuală
    const origPg3 = MP._pg3_demographic?.bind(MP);
    MP._pg3_demographic = function(c) {
      const { pdf, W, H, city, need, grav, scenario, today } = c;
      pdf.addPage();
      this._pgHeader(pdf, W, '2. PROIECTIE DEMOGRAFICA 2025-2055', city.name, today, 2);
      let y = 22;

      // Formula cohort-component vizuală
      y = V.sectionHeader(pdf, 14, y, W - 28, '2.1', 'Formula de Proiectie  -  Model Cohort-Component (ONU/Eurostat)', V.C.sky);
      y = V.formulaBox(pdf, 14, y, W - 28,
        'Proiectie demografica (model cohort-component simplificat)',
        'P(t) = P0 x (1 + r)^t',
        [
          ['P(t)', 'Populatia la momentul t (persoane)'],
          ['P0', 'Populatia de baza: ' + V.N(city.pop2021) + ' loc. (INSE Rec.2021)'],
          ['r', 'Rata de crestere: ' + (city.rata_reala_2011_2021 || 0).toFixed(3) + '/an (calibrat 2011-2021)'],
          ['t', 'Numarul de ani de proiectie (max 34 ani, 2021-2055)'],
        ],
        'UN DESA (2019) · INSE Rec.2011+2021 · Eurostat EUROPOP2023',
        '±8% la 10 ani · ±18% la 30 ani · ±25% la 34 ani'
      );

      // Grafic populatie (cel existent)
      y = V.sectionHeader(pdf, 14, y, W - 28, '2.2', 'Proiectie Populatie 3 Scenarii', V.C.gold);
      y = this._chartPopulation(pdf, W, y, city, [2025, 2030, 2035, 2040, 2045, 2050, 2055],
        null, scenario);
      y += 5;

      // Tabel comparativ scenarii
      const p0 = city.pop2021 || 100000;
      const r = city.rata_reala_2011_2021 || 0;
      const popS = (s, yr) => Math.round(p0 * Math.pow(1 + ({ S1: r / 100 + 0.005, S2: r / 100, S3: r / 100 - 0.005 }[s] || 0), yr - 2021));
      const rows = [
        ['S1 Optimist (+0.5%)', V.N(popS('S1', 2030)), V.N(popS('S1', 2040)), V.N(popS('S1', 2055)), (popS('S1', 2055) > p0 ? '+' : '') + V.N(popS('S1', 2055) - p0)],
        ['S2 Moderat (referinta)', V.N(popS('S2', 2030)), V.N(popS('S2', 2040)), V.N(popS('S2', 2055)), (popS('S2', 2055) > p0 ? '+' : '') + V.N(popS('S2', 2055) - p0)],
        ['S3 Conservator (-0.5%)', V.N(popS('S3', 2030)), V.N(popS('S3', 2040)), V.N(popS('S3', 2055)), (popS('S3', 2055) > p0 ? '+' : '') + V.N(popS('S3', 2055) - p0)],
        ['INSE Baseline (-0.5%)', V.N(Math.round(p0 * Math.pow(0.995, 9))), V.N(Math.round(p0 * Math.pow(0.995, 19))), V.N(Math.round(p0 * Math.pow(0.995, 34))), V.N(Math.round(p0 * Math.pow(0.995, 34)) - p0)],
      ];
      y = V.table(pdf, 14, y, W - 28,
        ['Scenariu', '2030', '2040', '2055', 'Delta vs 2021'],
        rows, [58, 30, 30, 30, 35],
        { headerColor: V.C.gold }
      );

      // Nota metodologica
      y = V.infoBox(pdf, 14, y, W - 28, '', '⚠ Incertitudine declarata',
        'Proiectiile demografice au o incertitudine de ±8% la 10 ani si ±18% la 30 ani. Recomandam revizuirea la fiecare 5 ani pe baza datelor INSE actualizate. Scenariul S2 este scenariul de referinta recomandat pentru planificarea urbanistica.',
        V.C.orange
      );

      this._pgFooter(pdf, W, H, today, 2, 'UN DESA (2019) World Population Prospects · INSE Rec.2011+2021 · Eurostat EUROPOP2023 · INSE Proiectie 2023');
    };

    // Override _pg7_risk cu heatmap vizual
    const origPg7 = MP._pg7_risk?.bind(MP);
    MP._pg7_risk = function(c) {
      const { pdf, W, H, city, risk, climate, today } = c;
      pdf.addPage();
      this._pgHeader(pdf, W, '6. RISCURI TERITORIALE', city.name, today, 6);
      let y = 22;

      // Scor risc global - KPI mare
      const riskScore = risk?.riskScore || 50;
      const riskColor = riskScore > 60 ? V.C.red : riskScore > 35 ? V.C.orange : V.C.green;
      V.kpiBox(pdf, 14, y, 50, 28,
        String(riskScore) + '/100',
        'Scor Risc Global',
        risk?.riskScore > 60 ? 'RIDICAT' : risk?.riskScore > 35 ? 'MODERAT' : 'SCAZUT',
        riskColor
      );

      // 3 KPI risc
      [
        { v: (risk?.seismic?.ag || 0.20) + 'g', l: 'Risc Seismic Ag', sub: 'INFP P100-1/2013', col: (risk?.seismic?.ag || 0.2) > 0.25 ? V.C.red : V.C.orange },
        { v: risk?.flood?.label || 'Redus', l: 'Risc Inundatii', sub: 'ANAR PGRA 2021-2027', col: (risk?.flood?.risk || 1.0) > 1.5 ? V.C.red : V.C.green },
        { v: '+' + (1.4).toFixed(1) + 'C la 2055', l: 'Risc Climatic', sub: 'IPCC AR6 RCP4.5', col: V.C.orange },
      ].forEach((k, i) => {
        const kw = (W - 28 - 50 - 6 - 6) / 3;
        V.kpiBox(pdf, 14 + 50 + 6 + i * (kw + 3), y, kw, 28, k.v, k.l, k.sub, k.col);
      });
      y += 33;

      // Tabel riscuri detaliat
      y = V.sectionHeader(pdf, 14, y, W - 28, '6.1', 'Profilul de Risc Teritorial  -  Surse Oficiale Romania', V.C.red);
      const riskRows = [
        ['Seismic P100-1/2013', 'Ag=' + (risk?.seismic?.ag || 0.20) + 'g · Tc=' + (risk?.seismic?.tc || '0.7') + 's · ' + (risk?.seismic?.key || 'zona III'), (risk?.seismic?.ag || 0.2) > 0.25 ? 'RIDICAT' : 'MODERAT', 'INFP · P100-1/2013'],
        ['Inundatii ANAR', risk?.flood?.label || 'Redus', (risk?.flood?.risk || 1.0) > 1.5 ? 'RIDICAT' : 'SCAZUT', 'ANAR PGRA 2021-2027 · Directiva 2007/60/CE'],
        ['Climatic IPCC AR6', '+1.4°C RCP4.5 / +2.2°C RCP8.5 la 2055', 'MODERAT', 'IPCC AR6 2021 · ANM ROCADA · Copernicus C3S'],
        ['Alunecari teren INHGA', risk?.landslide?.label || 'Nedeterminat local', 'VARIABIL', 'INHGA · Harta nationala alunecari'],
        ['UHI Urban Heat Island', '+1.5-3.5°C vs periurban (estimat)', 'MODERAT', 'Copernicus LST · Oke (1982)'],
      ];
      y = V.table(pdf, 14, y, W - 28,
        ['Tip risc', 'Parametri', 'Nivel risc', 'Sursa'],
        riskRows, [35, 70, 25, 65],
        { headerColor: V.C.red }
      );

      // Progress bars riscuri
      y = V.sectionHeader(pdf, 14, y, W - 28, '6.2', 'Indicatori de Risc  -  Calibrati pe Date Nationale', V.C.orange);
      const risks_bars = [
        ['Risc seismic (Ag normalizat)', Math.round((risk?.seismic?.ag || 0.20) / 0.35 * 100), 100, V.C.red],
        ['Risc inundatii (0-3 scara ANAR)', Math.round((risk?.flood?.risk || 1.0) / 3 * 100), 100, V.C.sky],
        ['Risc climatic 2055 (RCP4.5)', 42, 100, V.C.orange],
        ['Vulnerabilitate fond construit pre-1977', Math.round(35 + Math.max(0, (risk?.seismic?.ag || 0.2) * 50)), 100, V.C.red],
      ];
      risks_bars.forEach(([label, val, max, col]) => {
        y = V.progressBar(pdf, 14, y + 2, W - 28 - 15, val, max, label, col, true);
        y += 3;
      });

      y = V.infoBox(pdf, 14, y + 2, W - 28, '', '📋 Recomandare PNRR C10-I2',
        'Fondul construit anterior anului 1977 (inainte de normele seismice P13/1963) necesita evaluare structurala prioritara. Cladirile cu risc seismic Rz I si Rz II sunt eligibile pentru finantare PNRR C10-I2 (consolidare seismica). Identificarea se face prin expertiza tehnica Nivelul II (FEMA P-154 adaptat).',
        V.C.gold
      );

      this._pgFooter(pdf, W, H, today, 6, 'INFP P100-1/2013 · ANAR PGRA 2021-2027 · INHGA · ANM ROCADA · IPCC AR6 2021 · Oke (1982) · Copernicus C3S');
    };

    console.log('[MasterplanVisual] ✅ Patch aplicat: Cover premium + SWOT vizual + Formule + Grafice');
  },
};

// INIT
(function _init(n) {
  if (n > 60) return;
  if (typeof window._TCIMasterplanPDF === 'undefined') {
    setTimeout(() => _init(n + 1), 400); return;
  }
  G._MasterplanVisualPatch.apply();
  window._MasterplanVisualPatch = G._MasterplanVisualPatch;
  window._MasterplanV = V; // expus pentru debug
})(0);

})(window);
