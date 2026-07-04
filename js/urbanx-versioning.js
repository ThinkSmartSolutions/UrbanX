/* ============================================================================
 * UrbanX — Versionare proiect documentații (Modul 16). Snapshot al modelului (D)
 * în localStorage, cu istoric, notă, restaurare și diff sumar între versiuni.
 * window.UXVersion.open(D, onRestore)
 * ========================================================================== */
(function (G) {
  'use strict';
  var KEY = 'uxdoc-versiuni';
  function el(t, a, h) { var e = document.createElement(t); if (a) for (var k in a) e.setAttribute(k, a[k]); if (h != null) e.innerHTML = h; return e; }
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } }
  function save(list) { try { localStorage.setItem(KEY, JSON.stringify(list.slice(-50))); } catch (e) {} }
  function snapshot(D, nota, tsLabel) { var l = load(); l.push({ ts: tsLabel || '', nota: nota || '', data: JSON.parse(JSON.stringify(D || {})) }); save(l); return l.length; }
  function diff(a, b) { // câmpuri numerice cheie modificate
    var keys = ['Sc', 'Sd', 'Steren', 'POT_max', 'CUT_max', 'niv_supraterane', 'functiune', 'faza']; var out = [];
    keys.forEach(function (k) { if (String((a || {})[k]) !== String((b || {})[k])) out.push(k + ': ' + ((a || {})[k] == null ? '—' : (a || {})[k]) + ' → ' + ((b || {})[k] == null ? '—' : (b || {})[k])); });
    var na = ((a || {})._spatii || []).length, nb = ((b || {})._spatii || []).length; if (na !== nb) out.push('spații: ' + na + ' → ' + nb);
    return out;
  }
  function open(D, onRestore) {
    var ov = el('div', { id: 'uxver-ov', style: 'position:fixed;inset:0;background:#070c18;z-index:4500;overflow:auto;font-family:system-ui;color:#e6edf7' });
    var wrap = el('div', { style: 'max-width:760px;margin:0 auto;padding:18px 16px 60px' });
    var head = el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-bottom:12px' });
    head.appendChild(el('div', null, '<div style="font-size:17px;font-weight:800;color:#fbbf24">💾 Versiuni proiect</div><div style="font-size:11px;color:#94a3b8">Salvează stări ale modelului · restaurează · vezi ce s-a modificat. Regenerezi doar ce e afectat.</div>'));
    var bX = el('button', { style: 'background:none;border:none;color:#94a3b8;font-size:22px;cursor:pointer' }, '✕'); bX.onclick = function () { ov.remove(); }; head.appendChild(bX); wrap.appendChild(head);
    var saveRow = el('div', { style: 'display:flex;gap:8px;margin-bottom:14px' });
    var note = el('input', { placeholder: 'notă versiune (ex: DTAC v1 / modificat SC 900→1100)', style: 'flex:1;background:#0a1120;border:1px solid rgba(148,163,184,.25);border-radius:7px;color:#e6edf7;padding:8px;font-size:12.5px' });
    var bSave = el('button', { style: 'background:#fbbf24;color:#111;border:none;border-radius:8px;padding:8px 16px;font-size:12.5px;font-weight:700;cursor:pointer' }, '💾 Salvează versiunea curentă');
    var listBox = el('div');
    function render() {
      var l = load(); listBox.innerHTML = '';
      if (!l.length) { listBox.appendChild(el('div', { style: 'color:#94a3b8;font-size:12.5px;padding:12px;text-align:center' }, 'Nicio versiune salvată încă.')); return; }
      l.slice().reverse().forEach(function (ver, ri) {
        var idx = l.length - 1 - ri;
        var d = idx > 0 ? diff(l[idx - 1].data, ver.data) : [];
        var c = el('div', { style: 'background:#0b1220;border:1px solid rgba(148,163,184,.2);border-radius:9px;padding:10px;margin-bottom:8px' });
        c.appendChild(el('div', { style: 'font-size:12.5px;font-weight:700;color:#e6edf7' }, 'v' + (idx + 1) + ' · ' + (ver.nota || '(fără notă)') + (ver.ts ? ' <span style="color:#64748b;font-weight:400">· ' + ver.ts + '</span>' : '')));
        if (d.length) c.appendChild(el('div', { style: 'font-size:11px;color:#93c5fd;margin-top:3px' }, 'Modificări: ' + d.join(' · ')));
        var btns = el('div', { style: 'display:flex;gap:6px;margin-top:6px' });
        var bR = el('button', { style: 'background:rgba(52,211,153,.18);color:#6ee7b7;border:1px solid rgba(52,211,153,.4);border-radius:6px;padding:5px 11px;font-size:11.5px;cursor:pointer' }, '↩ Restaurează');
        bR.onclick = function () { if (typeof onRestore === 'function') onRestore(JSON.parse(JSON.stringify(ver.data))); if (G.ss) G.ss('✓ Versiunea v' + (idx + 1) + ' restaurată.'); ov.remove(); };
        var bD = el('button', { style: 'background:none;border:1px solid rgba(248,113,113,.4);color:#f87171;border-radius:6px;padding:5px 11px;font-size:11.5px;cursor:pointer' }, '✕ Șterge');
        bD.onclick = function () { var ll = load(); ll.splice(idx, 1); save(ll); render(); };
        btns.appendChild(bR); btns.appendChild(bD); c.appendChild(btns); listBox.appendChild(c);
      });
    }
    bSave.onclick = function () { var d = new Date().toISOString ? '' : ''; snapshot(D, note.value, ''); note.value = ''; render(); if (G.ss) G.ss('✓ Versiune salvată.'); };
    saveRow.appendChild(note); saveRow.appendChild(bSave); wrap.appendChild(saveRow); wrap.appendChild(listBox);
    ov.appendChild(wrap); document.body.appendChild(ov); render();
  }
  G.UXVersion = { snapshot: snapshot, list: load, diff: diff, open: open };
})(window);
