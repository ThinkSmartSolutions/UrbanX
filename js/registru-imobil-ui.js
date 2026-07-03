/* ============================================================================
 * UrbanX — Registrul Imobilelor · UI (panou). window.RegistruImobil.openPanel()
 * Tabel registru + adăugare din parcelă + formular manual cu consimțământ GDPR
 * + acțiuni per imobil (status, fișă PDF, ștergere/anonimizare) + export PDF.
 * ========================================================================== */
(function (G) {
  'use strict';
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(3,7,18,.72);z-index:3400;display:flex;align-items:flex-start;justify-content:center;overflow:auto;padding:24px 12px;font-family:system-ui,-apple-system,sans-serif',
    modal: 'background:#0b1220;border:1px solid rgba(13,148,136,.35);border-radius:16px;max-width:760px;width:100%;padding:20px;color:#e6edf7;box-shadow:0 20px 60px rgba(0,0,0,.5)',
    ghost: 'background:none;border:none;color:#94a3b8;font-size:20px;cursor:pointer;line-height:1',
    label: 'font-size:11px;color:#7dd3c8;text-transform:uppercase;letter-spacing:.5px;margin:12px 0 5px',
    inp: 'width:100%;background:#0a1120;border:1px solid rgba(148,163,184,.25);border-radius:8px;color:#e6edf7;padding:8px 10px;font-size:13px;font-family:inherit;box-sizing:border-box',
    btn: 'background:rgba(13,148,136,.2);color:#5eead4;border:1px solid rgba(13,148,136,.45);border-radius:8px;padding:8px 13px;font-size:12.5px;cursor:pointer;font-family:system-ui;font-weight:600',
    btnSm: 'background:rgba(148,163,184,.12);color:#cbd5e1;border:1px solid rgba(148,163,184,.25);border-radius:7px;padding:4px 9px;font-size:11px;cursor:pointer;font-family:system-ui'
  };
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }

  function openPanel() {
    var RI = G.RegistruImobil; if (!RI) { if (G.ss) G.ss('Registrul se inițializează…'); return; }
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-bottom:4px' });
    head.appendChild(el('div', null, '<div style="font-size:17px;font-weight:800;color:#5eead4">🏢 Registrul Imobilelor</div><div style="font-size:11px;color:#94a3b8">identitate cadastrală · lanț documente · status · GDPR</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);

    // toolbar
    var bar = el('div', { style: 'display:flex;gap:6px;flex-wrap:wrap;margin:12px 0' });
    var bParc = el('button', { style: ST.btn }, '＋ Adaugă din parcela activă');
    var bMan = el('button', { style: ST.btnSm }, '✎ Adaugă manual');
    var bPdf = el('button', { style: ST.btnSm }, '📄 Export registru PDF');
    bar.appendChild(bParc); bar.appendChild(bMan); bar.appendChild(bPdf); m.appendChild(bar);

    var srch = el('input', { style: ST.inp, placeholder: '🔎 caută după nr. cadastral sau adresă…' }); m.appendChild(srch);
    var listWrap = el('div', { style: 'margin-top:10px;max-height:52vh;overflow:auto' }); m.appendChild(listWrap);
    var formWrap = el('div', { style: 'margin-top:8px' }); m.appendChild(formWrap);

    function renderList() {
      listWrap.innerHTML = '';
      var recs = RI.search(srch.value);
      if (!recs.length) { listWrap.appendChild(el('div', { style: 'font-size:12.5px;color:#94a3b8;padding:14px;text-align:center' }, 'Niciun imobil în registru. Adaugă din parcela activă sau manual.')); return; }
      recs.forEach(function (r) {
        var sm = RI.statusMeta(r.status);
        var card = el('div', { style: 'background:#0a1120;border:1px solid rgba(148,163,184,.14);border-radius:10px;padding:11px;margin-bottom:7px' });
        var top = el('div', { style: 'display:flex;justify-content:space-between;align-items:flex-start;gap:8px' });
        top.appendChild(el('div', null,
          '<div style="font-size:13.5px;font-weight:700;color:#e6edf7">' + (r.nrcad || '(fără nr. cad.)') + '</div>' +
          '<div style="font-size:11.5px;color:#94a3b8">' + (r.address || '—') + (r.utr ? ' · UTR ' + r.utr : '') + (r.area_m2 ? ' · ' + r.area_m2 + ' mp' : '') + '</div>' +
          (r.owner ? '<div style="font-size:10.5px;color:#7dd3c8;margin-top:2px">👤 ' + r.owner.display + ' <span style="color:#64748b">· pseudonimizat GDPR' + (r.owner.has_cnp ? ' · CNP necstocat' : '') + '</span></div>' : '')));
        top.appendChild(el('span', { style: 'font-size:10.5px;font-weight:700;color:#fff;background:' + sm.c + ';border-radius:20px;padding:3px 9px;white-space:nowrap' }, sm.l.split(' (')[0]));
        card.appendChild(top);
        card.appendChild(el('div', { style: 'font-size:10.5px;color:#64748b;margin-top:6px' }, '🔗 ' + r.refs.cu.length + ' certificate/autorizații · ' + r.refs.sesizari.length + ' sesizări (din registrele platformei)'));

        var acts = el('div', { style: 'display:flex;gap:5px;flex-wrap:wrap;margin-top:8px' });
        // status selector
        var sel = el('select', { style: ST.btnSm + ';padding:4px 6px' });
        RI.STATUSES.forEach(function (s) { var o = el('option', { value: s.k }, s.l); if (s.k === r.status) o.setAttribute('selected', 'selected'); sel.appendChild(o); });
        sel.onchange = function () { RI.setStatus(r.id, sel.value); renderList(); };
        acts.appendChild(sel);
        var bFisa = el('button', { style: ST.btnSm }, '📁 Fișă imobil');
        bFisa.onclick = function () { var d = RI.dossier(r.id); if (d && G.Dosar && G.Dosar.generatePDF) { G.Dosar.generatePDF(d); } else if (G.ss) G.ss('Fișa necesită motorul Dosar.'); };
        acts.appendChild(bFisa);
        if (r.owner) { var bAnon = el('button', { style: ST.btnSm + ';color:#fbbf24' }, '🕶 Anonimizează'); bAnon.onclick = function () { if (confirm('Ștergi datele personale ale proprietarului (păstrezi imobilul)?')) { RI.eraseOwner(r.id); renderList(); } }; acts.appendChild(bAnon); }
        var bDel = el('button', { style: ST.btnSm + ';color:#fca5a5' }, '🗑 Șterge');
        bDel.onclick = function () { if (confirm('Ștergi definitiv imobilul din registru? (drept la ștergere GDPR)')) { RI.erase(r.id); renderList(); } };
        acts.appendChild(bDel);
        card.appendChild(acts);
        listWrap.appendChild(card);
      });
    }

    function renderForm() {
      formWrap.innerHTML = '';
      var box = el('div', { style: 'background:#0a1120;border:1px solid rgba(13,148,136,.3);border-radius:10px;padding:12px;margin-top:6px' });
      box.appendChild(el('div', { style: 'font-size:13px;font-weight:700;color:#5eead4;margin-bottom:6px' }, 'Adaugă imobil manual'));
      var fNr = el('input', { style: ST.inp, placeholder: 'Nr. cadastral' });
      var fAd = el('input', { style: ST.inp + ';margin-top:6px', placeholder: 'Adresă' });
      var fOwn = el('input', { style: ST.inp + ';margin-top:6px', placeholder: 'Proprietar (opțional — date personale)' });
      box.appendChild(fNr); box.appendChild(fAd); box.appendChild(fOwn);
      var gLab = el('label', { style: 'display:flex;gap:7px;align-items:flex-start;font-size:10px;color:#94a3b8;margin-top:8px;cursor:pointer;line-height:1.4' });
      var gCb = el('input', { type: 'checkbox', style: 'margin-top:2px;flex-shrink:0' });
      gLab.appendChild(gCb);
      gLab.appendChild(el('span', null, 'Am temei legal (consimțământ / sarcină publică L.50/1991) pentru a stoca datele proprietarului. Numele va fi mascat și pseudonimizat, CNP-ul NU se stochează în clar. Retenție ' + G.RegistruImobil.RETENTION_YEARS + ' ani; ștergerea e disponibilă oricând. (GDPR, Reg. UE 2016/679)'));
      box.appendChild(gLab);
      var out = el('div', { style: 'font-size:11.5px;margin-top:7px' }); box.appendChild(out);
      var save = el('button', { style: ST.btn + ';margin-top:8px' }, 'Salvează în registru');
      save.onclick = function () {
        try {
          var imobil = { nrcad: fNr.value.trim(), address: fAd.value.trim() };
          if (fOwn.value.trim()) imobil.owner = { name: fOwn.value.trim() };
          RI.register(imobil, { consent: gCb.checked });
          out.innerHTML = '<span style="color:#34d399">✓ Imobil salvat.</span>'; fNr.value = ''; fAd.value = ''; fOwn.value = ''; gCb.checked = false;
          renderList();
        } catch (e) { out.innerHTML = '<span style="color:#fbbf24">' + e.message + '</span>'; }
      };
      box.appendChild(save);
      formWrap.appendChild(box);
    }

    bParc.onclick = function () { try { RI.fromParcel({}); renderList(); if (G.ss) G.ss('🏢 Imobil adăugat din parcela activă.'); } catch (e) { if (G.ss) G.ss(e.message); else alert(e.message); } };
    bMan.onclick = function () { if (formWrap.innerHTML) formWrap.innerHTML = ''; else renderForm(); };
    bPdf.onclick = function () { RI.exportRegisterPDF(); };
    srch.oninput = function () { renderList(); };

    renderList();
    m.appendChild(el('div', { style: 'font-size:9.5px;color:#64748b;margin-top:12px;line-height:1.4' }, 'ONEST: registru stocat local (acest browser). Statusul e derivat automat din CAU. Documentele NU sunt duplicate — se citesc din registrele CAU/Sesizări prin Dosar. Versiunea partajată multi-utilizator (Supabase cu RLS + audit GDPR) = Faza 2.'));
    ov.appendChild(m); document.body.appendChild(ov);
  }

  G.RegistruImobil = G.RegistruImobil || {}; G.RegistruImobil.openPanel = openPanel;
  console.log('[RegistruImobil] UI încărcat (window.RegistruImobil.openPanel)');
})(window);
