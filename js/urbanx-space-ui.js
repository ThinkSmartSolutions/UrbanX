/* ============================================================================
 * UrbanX — UI Editor Program Funcțional. Pasul dinaintea documentelor:
 * parametri de program → GENEREAZĂ (motor de reguli) → tabel EDITABIL cu
 * proveniența fiecărui spațiu + validare normativă live → APLICĂ la proiect
 * (scrie D._spatii + D.Sc/Sd/Su → propagă în indicatori/deviz/antemăsurători).
 * window.UXSpaceUI.open(D, onApply)
 * ========================================================================== */
(function (G) {
  'use strict';
  function el(t, a, h) { var e = document.createElement(t); if (a) for (var k in a) e.setAttribute(k, a[k]); if (h != null) e.innerHTML = h; return e; }
  var INP = 'background:#0a1120;border:1px solid rgba(148,163,184,.25);border-radius:6px;color:#e6edf7;padding:5px 7px;font-size:12px;font-family:inherit;box-sizing:border-box';

  function open(D, onApply) {
    if (!G.UXSpace) { if (G.ss) G.ss('Motorul de program funcțional nu e încărcat.'); return; }
    var ov = el('div', { id: 'uxspace-ov', style: 'position:fixed;inset:0;background:#070c18;z-index:4200;overflow:auto;font-family:system-ui,-apple-system,sans-serif;color:#e6edf7' });
    var wrap = el('div', { style: 'max-width:1180px;margin:0 auto;padding:18px 16px 80px' });
    var head = el('div', { style: 'display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;background:#070c18;padding:8px 0 12px;z-index:5;border-bottom:1px solid rgba(148,163,184,.15)' });
    head.appendChild(el('div', null, '<div style="font-size:18px;font-weight:800;color:#34d399">🧩 Generator Program Funcțional</div><div style="font-size:11px;color:#94a3b8">Parametri de program → spații generate din normative → editezi → aplici la documentație</div>'));
    var bX = el('button', { style: 'background:none;border:none;color:#94a3b8;font-size:22px;cursor:pointer' }, '✕'); bX.onclick = function () { ov.remove(); };
    head.appendChild(bX); wrap.appendChild(head);

    // --- selecție tipologie + parametri de program ---
    var tipOpts = [];
    if (G.UXSpace.hasTemplate && G.UXSpace.hasTemplate('centru-social')) tipOpts.push(['centru-social', 'Centru social de zi']);
    Object.keys(G.UXSpace.TIPOLOGII || {}).forEach(function (k) { tipOpts.push([k, G.UXSpace.TIPOLOGII[k].label || k]); });
    var state = { tip: (D.__prog && D.__prog.tip) || (tipOpts[0] && tipOpts[0][0]), params: (D.__prog && D.__prog.params) || {}, rows: (D._spatii && D._spatii.slice()) || null };

    var paramBox = el('div', { style: 'background:rgba(52,211,153,.07);border:1px solid rgba(52,211,153,.25);border-radius:10px;padding:12px;margin:12px 0' });
    var tblBox = el('div', { style: 'margin-top:14px' });
    var sideBox = el('div');
    wrap.appendChild(paramBox);
    var layout = el('div', { style: 'display:grid;grid-template-columns:1fr 300px;gap:16px;align-items:start;margin-top:8px' });
    layout.appendChild(tblBox); var side = el('div', { style: 'position:sticky;top:70px' }); side.appendChild(sideBox); layout.appendChild(side);
    wrap.appendChild(layout);
    ov.appendChild(wrap); document.body.appendChild(ov);

    function paramDefs() {
      if (state.tip === 'centru-social') return [{ key: 'capacitate', label: 'Nr. beneficiari/zi', type: 'number', def: 50 }];
      var t = (G.UXSpace.TIPOLOGII || {})[state.tip]; return (t && t.params) || [];
    }
    function genereaza() {
      var p = {}; paramDefs().forEach(function (d) { p[d.key] = state.params[d.key] != null ? state.params[d.key] : d.def; });
      state.params = p;
      if (state.tip === 'centru-social') {
        state.rows = (G.UXSpace.propune('centru-social', p) || []).map(function (r) { return { id: r.nume, nume: r.nume, cat: r.zona, niv: r.niv, buc: r.buc, mp_unit: r.mp_unit, ocup: r.ocup, prov: 'șablon', normativ: 'NP 011 / Ord. 29/2019', ob: r.ob }; });
      } else {
        var rz = G.UXSpace.rezolva(state.tip, p);
        state.rows = (rz ? rz.spatii : []).map(function (s) { return { id: s.id, nume: s.label, cat: s.cat, niv: s.niv, buc: s.qty, mp_unit: s.mp_unit, ocup: 0, prov: s.prov, normativ: s.normativ, ob: s.ob }; });
        state._rz = rz;
      }
      renderTable(); renderSide();
    }

    function renderParams() {
      paramBox.innerHTML = '';
      paramBox.appendChild(el('div', { style: 'font-size:12px;font-weight:700;color:#6ee7b7;margin-bottom:8px' }, '1 · Parametri de program (introduci CAPACITATEA, nu suprafețele)'));
      var selRow = el('div', { style: 'display:flex;gap:10px;flex-wrap:wrap;align-items:end' });
      var tb = el('div', null, '<div style="font-size:10px;text-transform:uppercase;color:#94a3b8;margin-bottom:3px">Tipologie clădire</div>');
      var sel = el('select', { style: INP + ';min-width:200px' });
      tipOpts.forEach(function (o) { var op = el('option', { value: o[0] }, o[1]); if (state.tip === o[0]) op.setAttribute('selected', 'selected'); sel.appendChild(op); });
      sel.onchange = function () { state.tip = sel.value; state.params = {}; state.rows = null; renderParams(); renderTable(); renderSide(); };
      tb.appendChild(sel); selRow.appendChild(tb);
      paramDefs().forEach(function (d) {
        var b = el('div', null, '<div style="font-size:10px;text-transform:uppercase;color:#94a3b8;margin-bottom:3px">' + d.label + '</div>');
        if (d.type === 'bool') { var s2 = el('select', { style: INP }); [['1', 'Da'], ['', 'Nu']].forEach(function (o) { var op = el('option', { value: o[0] }, o[1]); if (String(state.params[d.key] != null ? state.params[d.key] : d.def) === o[0] || (o[0] === '1' && (state.params[d.key] != null ? state.params[d.key] : d.def))) op.setAttribute('selected', 'selected'); s2.appendChild(op); }); s2.onchange = function () { state.params[d.key] = !!s2.value; }; b.appendChild(s2); }
        else if (d.type === 'select') { var s3 = el('select', { style: INP + ';width:auto;min-width:160px' }); if (state.params[d.key] == null) state.params[d.key] = d.def; (d.options || []).forEach(function (o) { var op = el('option', { value: o[0] }, o[1]); if (String(state.params[d.key]) === String(o[0])) op.setAttribute('selected', 'selected'); s3.appendChild(op); }); s3.onchange = function () { state.params[d.key] = s3.value; }; b.appendChild(s3); }
        else { var inp = el('input', { type: (d.type === 'text' ? 'text' : 'number'), style: INP + ';width:120px' }); inp.value = state.params[d.key] != null ? state.params[d.key] : d.def; inp.oninput = function () { state.params[d.key] = (d.type === 'text') ? inp.value : (inp.value === '' ? '' : +inp.value); }; b.appendChild(inp); }
        selRow.appendChild(b);
      });
      var bGen = el('button', { style: 'background:#34d399;color:#04231a;border:none;border-radius:8px;padding:8px 16px;font-size:12.5px;font-weight:700;cursor:pointer' }, '⚙ Generează programul funcțional');
      bGen.onclick = genereaza; selRow.appendChild(bGen);
      paramBox.appendChild(selRow);
    }

    function _nivKey(v) { v = (v == null ? 'P' : String(v)); if (v === 'E') return '1'; return v; } // 'E' legacy → etaj 1
    function bilant() {
      var floors = {}, ocup = 0;
      (state.rows || []).forEach(function (r) { var st = (+r.buc || 0) * (+r.mp_unit || 0); var k = _nivKey(r.niv); floors[k] = (floors[k] || 0) + st; ocup += (+r.ocup || 0) * (+r.buc || 0); });
      var su = 0, maxFloor = 0; Object.keys(floors).forEach(function (k) { su += floors[k]; if (k !== 'S' && floors[k] > maxFloor) maxFloor = floors[k]; });
      var supra = Object.keys(floors).filter(function (k) { return k !== 'S'; });
      var niv = Math.max(supra.length || 1, +state.params.niveluri || 1);
      var sd = su ? Math.round(su / 0.82) : 0;
      var sc = maxFloor ? Math.round(maxFloor / 0.82) : (niv ? Math.round(sd / niv) : sd); // amprentă = cel mai mare nivel
      return { su: Math.round(su), sd: sd, sc: sc, niv: niv, ocup: ocup };
    }
    function _nivOptions() {
      var NN = +state.params.niveluri || 1;
      (state.rows || []).forEach(function (r) { var n = parseInt(_nivKey(r.niv), 10); if (!isNaN(n) && n + 1 > NN) NN = n + 1; });
      var o = [['P', 'Parter']]; for (var i = 1; i < NN; i++) o.push([String(i), 'Etaj ' + i]); o.push(['S', 'Subsol']); return o;
    }

    function renderTable() {
      tblBox.innerHTML = '';
      if (!state.rows) { tblBox.appendChild(el('div', { style: 'color:#94a3b8;font-size:12.5px;padding:20px;text-align:center' }, 'Alege tipologia și parametrii, apoi apasă „Generează".')); return; }
      tblBox.appendChild(el('div', { style: 'font-size:12px;font-weight:700;color:#6ee7b7;margin-bottom:8px' }, '2 · Program de spații generat — editează liber (buc / suprafață / șterge / adaugă)'));
      var t = el('table', { style: 'width:100%;border-collapse:collapse;font-size:11.5px' });
      t.appendChild(el('tr', { style: 'text-align:left;color:#94a3b8' }, '<th style="padding:4px">Spațiu</th><th>Cat.</th><th>Niv</th><th style="width:52px">Buc</th><th style="width:78px">Su/buc</th><th style="width:64px">Su tot</th><th>Proveniență / normativ</th><th></th>'));
      (state.rows).forEach(function (r, idx) {
        var tr = el('tr', { style: 'border-top:1px solid rgba(148,163,184,.12)' });
        var provColor = r.prov && r.prov.indexOf('regulă') === 0 ? '#fbbf24' : (r.prov && r.prov.indexOf('generat') === 0 ? '#93c5fd' : '#6ee7b7');
        tr.appendChild(el('td', { style: 'padding:4px' }, '<span style="color:#e6edf7">' + r.nume + '</span>' + (r.ob ? ' <span title="obligatoriu" style="color:#f87171">*</span>' : '')));
        tr.appendChild(el('td', { style: 'color:#94a3b8' }, r.cat || '—'));
        var tdN = el('td'); var selN = el('select', { style: INP + ';padding:2px' }); _nivOptions().forEach(function (o) { var op = el('option', { value: o[0], title: o[1] }, o[0]); if (_nivKey(r.niv) === o[0]) op.setAttribute('selected', 'selected'); selN.appendChild(op); }); selN.onchange = function () { r.niv = selN.value; renderSide(); }; tdN.appendChild(selN); tr.appendChild(tdN);
        var tdB = el('td'); var iB = el('input', { type: 'number', style: INP + ';width:46px;padding:3px' }); iB.value = r.buc; iB.oninput = function () { r.buc = +iB.value || 0; upd(); }; tdB.appendChild(iB); tr.appendChild(tdB);
        var tdM = el('td'); var iM = el('input', { type: 'number', style: INP + ';width:70px;padding:3px' }); iM.value = r.mp_unit; iM.oninput = function () { r.mp_unit = +iM.value || 0; upd(); }; tdM.appendChild(iM); tr.appendChild(tdM);
        var tdT = el('td', { style: 'color:#e6edf7' }, Math.round((r.buc || 0) * (r.mp_unit || 0)) + '');
        tr.appendChild(tdT);
        tr.appendChild(el('td', { style: 'font-size:10px;color:' + provColor }, (r.prov || '') + (r.normativ ? ' · <span style="color:#94a3b8">' + r.normativ + '</span>' : '')));
        var tdX = el('td'); var bd = el('button', { style: 'background:none;border:none;color:#f87171;cursor:pointer;font-size:14px' }, '✕'); bd.onclick = function () { state.rows.splice(idx, 1); renderTable(); renderSide(); }; tdX.appendChild(bd); tr.appendChild(tdX);
        function upd() { tdT.textContent = Math.round((r.buc || 0) * (r.mp_unit || 0)); renderSide(); }
        t.appendChild(tr);
      });
      tblBox.appendChild(t);
      var bAdd = el('button', { style: 'margin-top:10px;background:rgba(148,163,184,.15);color:#cbd5e1;border:1px dashed rgba(148,163,184,.4);border-radius:7px;padding:6px 12px;font-size:12px;cursor:pointer' }, '+ Adaugă spațiu manual');
      bAdd.onclick = function () { state.rows.push({ id: 'manual_' + Date.now(), nume: 'Spațiu nou', cat: 'Diverse', niv: 'P', buc: 1, mp_unit: 12, ocup: 0, prov: 'manual', normativ: '', ob: false }); renderTable(); renderSide(); };
      tblBox.appendChild(bAdd);
    }

    function renderSide() {
      sideBox.innerHTML = '';
      var b = bilant();
      var card = el('div', { style: 'background:rgba(52,211,153,.08);border:1px solid rgba(52,211,153,.3);border-radius:10px;padding:12px' });
      card.appendChild(el('div', { style: 'font-size:12px;font-weight:700;color:#6ee7b7;margin-bottom:8px' }, '3 · Bilanț (recalculat live)'));
      function row(k, v) { return '<div style="display:flex;justify-content:space-between;font-size:12px;padding:2px 0"><span style="color:#94a3b8">' + k + '</span><b>' + v + '</b></div>'; }
      var st = +D.Steren || 0;
      card.innerHTML += row('Nr. spații', (state.rows || []).length);
      card.innerHTML += row('Su totală', b.su.toLocaleString('ro-RO') + ' mp');
      card.innerHTML += row('Sd (÷0,82)', b.sd.toLocaleString('ro-RO') + ' mp');
      card.innerHTML += row('Sc (amprentă)', b.sc.toLocaleString('ro-RO') + ' mp');
      card.innerHTML += row('Niveluri', b.niv);
      if (st) { card.innerHTML += row('POT', Math.round(b.sc / st * 100) + '%'); card.innerHTML += row('CUT', Math.round(b.sd / st * 100) / 100); }
      sideBox.appendChild(card);
      // compliance
      var probleme = [];
      if (state.tip !== 'centru-social' && state._rz && G.UXSpace.valideaza) probleme = G.UXSpace.valideaza(state._rz, state.rows);
      var pc = el('div', { style: 'margin-top:10px;background:' + (probleme.length ? 'rgba(251,191,36,.1)' : 'rgba(52,211,153,.08)') + ';border:1px solid ' + (probleme.length ? 'rgba(251,191,36,.35)' : 'rgba(52,211,153,.3)') + ';border-radius:10px;padding:10px;font-size:11.5px' });
      pc.appendChild(el('div', { style: 'font-weight:700;color:' + (probleme.length ? '#fbbf24' : '#6ee7b7') + ';margin-bottom:5px' }, probleme.length ? '⚠ ' + probleme.length + ' avertizări normative' : '✓ Conform (spații obligatorii prezente)'));
      probleme.slice(0, 8).forEach(function (p) { pc.appendChild(el('div', { style: 'color:#cbd5e1;margin:3px 0' }, '• ' + p.spatiu + ': ' + p.msg)); });
      sideBox.appendChild(pc);
      var bApply = el('button', { style: 'width:100%;margin-top:12px;background:#8b5cf6;color:#fff;border:none;border-radius:9px;padding:11px;font-size:13px;font-weight:700;cursor:pointer' }, '✓ Aplică la proiect');
      bApply.onclick = function () {
        var bb = bilant();
        D._spatii = state.rows; D.__prog = { tip: state.tip, params: state.params };
        D.Sc = bb.sc; D.Sd = bb.sd; if (bb.niv) D.niv_supraterane = bb.niv;
        if (G.ss) G.ss('✓ Program funcțional aplicat: ' + (state.rows || []).length + ' spații, Sd ' + bb.sd + ' mp — propagat în indicatori/deviz.');
        ov.remove(); if (typeof onApply === 'function') onApply(D);
      };
      sideBox.appendChild(bApply);
      // Planșele + modelul 3D/BIM se generează ÎNTR-UN SINGUR LOC: „📐 Generează planșe" (din Generatorul de documentații).
      // Aici doar definim programul de spații și îl aplicăm la proiect (D._spatii → camerele reale intră automat în planuri).
      var hint = el('div', { style: 'width:100%;margin-top:8px;background:rgba(125,211,252,.10);border:1px solid rgba(125,211,252,.3);border-radius:9px;padding:10px;font-size:11.5px;color:#9fd8f0;line-height:1.5' },
        '📐 <b>Planșele</b> (arhitectură + rezistență + instalații, DTAC & PTh) și <b>Modelul 3D + BIM (IFC/GLB)</b> se generează dintr-un singur loc: butonul <b>„Generează planșe"</b> din Generatorul de documentații. După ce apeși <b>„Aplică la proiect"</b>, camerele definite aici intră automat în planurile de nivel.');
      sideBox.appendChild(hint);
      // SKID GPL — obiect ingineresc: proiectare 3D reala + planse ATEX din optiunile alese
      if (state.tip === 'skid-gpl' && G.proiecteazaSkid) {
        var p = state.params || {};
        var skidOpts = function () { return { destinatie: p.destinatie || 'incalzire_cladiri', nrRec: Math.max(1, Math.min(+p.nrRec || 1, 3)), montaj: p.montaj || 'suprateran', distDisponibil: (p.distDisponibil !== '' && p.distDisponibil != null) ? +p.distDisponibil : null }; };
        var bSkid = el('button', { style: 'width:100%;margin-top:8px;background:rgba(239,68,68,.14);color:#fca5a5;border:1px solid rgba(239,68,68,.4);border-radius:9px;padding:10px;font-size:12.5px;font-weight:700;cursor:pointer' }, '🛢 Proiectează SKID 3D (rezervoare + montaj + ATEX)');
        bSkid.onclick = function () { try { G.proiecteazaSkid(skidOpts()); ov.remove(); } catch (e) { if (G.ss) G.ss('Eroare SKID: ' + e.message); } };
        sideBox.appendChild(bSkid);
        var bSkidPdf = el('button', { style: 'width:100%;margin-top:8px;background:rgba(239,68,68,.08);color:#fca5a5;border:1px solid rgba(239,68,68,.28);border-radius:9px;padding:9px;font-size:12px;font-weight:700;cursor:pointer' }, '📄 Documentație SKID + planșe (amplasare · ATEX · schemă)');
        bSkidPdf.onclick = function () { try { if (G.skid_calc) { var ap = (G.S && G.S.parcels && G.S.parcels[G.S.activeParcel == null ? 0 : G.S.activeParcel]); if (ap) { G._SKID_PROIECTE = G._SKID_PROIECTE || {}; G._SKID_PROIECTE[ap.nrcad || 'x'] = G.skid_calc(skidOpts()); } } if (G.generateSkidPDF) G.generateSkidPDF(); else if (G.ss) G.ss('Modulul SKID PDF nu e încărcat.'); } catch (e) { if (G.ss) G.ss('Eroare: ' + e.message); } };
        sideBox.appendChild(bSkidPdf);
      }
    }

    renderParams();
    if (state.rows) renderTable(); else genereaza();
    renderSide();
  }

  G.UXSpaceUI = { open: open };
})(window);
