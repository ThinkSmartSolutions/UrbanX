/* ============================================================================
 * UrbanX — DEVIZE & COST MANAGEMENT — UI (modal, window.UXDevizePro.openPanel)
 * Tab-uri: Proiecte · Obiecte&Articole · Prețuri (4 niveluri) · Furnizori&Contracte ·
 * Situații de lucrări&Decontare · Rapoarte (F1-F5+Deviz) · Audit&Alerte.
 * Pattern UI identic cu restul platformei (vezi js/cau-ui.js).
 * ========================================================================== */
(function (G) {
  'use strict';
  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function lei(n) { return Math.round(n || 0).toLocaleString('ro-RO'); }
  var ST = {
    // z-index MAXIM (2147483647 — 2^31-1, valoarea absolută maximă suportată) — găsit prin test live
    // că js/15-relevee.js (_rvOpen, linia ~6088) forțează exact ACEASTĂ valoare pe #rv-modal când
    // panoul de Planșe rămâne deschis, învingând orice z-index mai mic (1000010 nu era suficient).
    // La egalitate de z-index, ordinea din DOM decide — elementul adăugat ULTIMUL (Devize, deschis
    // după Planșe) câștigă corect, exact comportamentul așteptat pt un modal deschis mai recent.
    // pointer-events:auto EXPLICIT e obligatoriu (nu doar z-index): _rvOpen injectează o regulă
    // globală `*{pointer-events:none!important}` cu excepție doar pt #rv-modal — id-ul nostru
    // #uxdp-overlay e exceptat explicit acolo, dar pointer-events se MOȘTENEȘTE, iar <body> (părinte)
    // rămâne blocat de acea regulă; fără o valoare proprie declarată aici, overlay-ul moștenea 'none'
    // de la body și rămânea vizibil dar total neclickabil — găsit prin test live cu click real (CDP).
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.72);z-index:2147483647;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px);pointer-events:auto',
    modal: 'background:#0b1424;color:#e6edf7;width:min(920px,96vw);max-height:92vh;overflow:auto;border:1px solid rgba(56,189,148,.4);border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.6);font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:#0b1424;z-index:2',
    body: 'padding:16px 20px',
    inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:7px 9px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#0d9488,#0f766e);color:#fff;border:0;border-radius:9px;padding:9px 14px;font-weight:700;cursor:pointer;font-size:13px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:6px 11px;cursor:pointer;font-size:11px',
    label: 'font-size:11px;color:#5eead4;text-transform:uppercase;letter-spacing:.06em;margin:12px 0 6px;font-weight:700',
    tab: 'background:transparent;color:#94a3b8;border:1px solid rgba(255,255,255,.1);border-radius:7px;padding:6px 11px;cursor:pointer;font-size:11px;font-weight:700',
    tabOn: 'background:rgba(13,148,136,.22);color:#5eead4;border:1px solid rgba(13,148,136,.5);border-radius:7px;padding:6px 11px;cursor:pointer;font-size:11px;font-weight:700',
    card: 'background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:12px;margin-bottom:10px'
  };
  var State = { proiectId: null, obiectId: null, tab: 'proiecte' };

  function openPanel() {
    var old = document.getElementById('uxdp-overlay'); if (old) old.remove();
    var ov = el('div', { id: 'uxdp-overlay', style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head });
    head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">💰 UrbanX Devize & Cost Management</div><div style="font-size:11px;color:#94a3b8">Proiect → Obiecte → Articole → Resurse → Prețuri → Ofertare → Contract → Situații de lucrări → Decontare</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x);
    m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);

    var TABS = [
      ['proiecte', '📁 Proiecte'], ['articole', '🧱 Obiecte & Articole'], ['relevee', '📐 Relevee (upload)'], ['preturi', '💶 Prețuri'],
      ['contracte', '📑 Furnizori & Contracte'], ['situatii', '🧾 Situații de lucrări'],
      ['rapoarte', '📄 Rapoarte (F1-F5)'], ['audit', '🕓 Audit & Alerte']
    ];
    var tabsBar = el('div', { style: 'display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px' });
    var pane = el('div');
    body.appendChild(tabsBar); body.appendChild(pane);
    function renderTabs() {
      tabsBar.innerHTML = '';
      TABS.forEach(function (t) {
        var b = el('button', { style: State.tab === t[0] ? ST.tabOn : ST.tab }, t[1]);
        b.onclick = function () { State.tab = t[0]; renderTabs(); renderPane(); };
        tabsBar.appendChild(b);
      });
    }
    function renderPane() {
      pane.innerHTML = '<div style="color:#64748b;font-size:12px">Se încarcă…</div>';
      var fn = { proiecte: paneProiecte, articole: paneArticole, relevee: paneRelevee, preturi: panePreturi, contracte: paneContracte, situatii: paneSituatii, rapoarte: paneRapoarte, audit: paneAudit }[State.tab];
      if (fn) fn(pane); else pane.innerHTML = '';
    }
    renderTabs(); renderPane();
    ov.appendChild(m); document.body.appendChild(ov);
  }

  // ── TAB: Proiecte ────────────────────────────────────────────────────────
  function paneProiecte(pane) {
    var DP = G.UXDevizePro;
    pane.innerHTML = '';
    var newBox = el('div', { style: ST.card });
    newBox.appendChild(el('div', { style: ST.label }, 'Proiect de investiție nou'));
    var grid = el('div', { style: 'display:grid;grid-template-columns:2fr 1fr 1fr;gap:8px' });
    var nume = el('input', { style: ST.inp, placeholder: 'Denumire investiție' });
    var uat = el('input', { style: ST.inp, placeholder: 'UAT key (opțional, ex RO-IS-01)' });
    var sursaSel = el('select', { style: ST.inp });
    [['buget_local', 'Buget local'], ['buget_stat', 'Buget de stat'], ['fonduri_ue', 'Fonduri europene'], ['mixt', 'Mixt']].forEach(function (o) { sursaSel.appendChild(el('option', { value: o[0] }, o[1])); });
    grid.appendChild(nume); grid.appendChild(uat); grid.appendChild(sursaSel);
    newBox.appendChild(grid);
    var addBtn = el('button', { style: ST.btn + ';margin-top:10px' }, '+ Creează proiect');
    addBtn.onclick = function () {
      if (!nume.value.trim()) return;
      DP.createProiect({ nume: nume.value.trim(), uat_key: uat.value.trim() || null, sursa_finantare: sursaSel.value }).then(function () { paneProiecte(pane); });
    };
    newBox.appendChild(addBtn);
    pane.appendChild(newBox);

    var list = el('div'); pane.appendChild(list);
    list.innerHTML = '<div style="color:#64748b;font-size:12px">Se încarcă…</div>';
    DP.listProiecte().then(function (arr) {
      if (!arr.length) { list.innerHTML = '<div style="color:#64748b;font-size:12px;padding:10px 0">Niciun proiect încă.</div>'; return; }
      list.innerHTML = '';
      arr.forEach(function (p) {
        var card = el('div', { style: ST.card + (State.proiectId === p.id ? ';border-color:rgba(94,234,212,.6)' : '') });
        card.appendChild(el('div', { style: 'display:flex;justify-content:space-between;align-items:center' },
          '<b>' + esc(p.nume) + '</b><span style="font-size:10px;color:#94a3b8">' + esc(p.sursa_finantare || '') + (p.uat_key ? (' · ' + esc(p.uat_key)) : '') + '</span>'));
        var actions = el('div', { style: 'display:flex;gap:6px;margin-top:8px;flex-wrap:wrap' });
        var selBtn = el('button', { style: ST.ghost }, State.proiectId === p.id ? '✓ Selectat' : 'Selectează');
        selBtn.onclick = function () { State.proiectId = p.id; State.obiectId = null; paneProiecte(pane); };
        var cardGisBtn = el('button', { style: ST.ghost }, '📊 Card investiție');
        cardGisBtn.onclick = function () { showCardInvestitie(p.id, card); };
        actions.appendChild(selBtn); actions.appendChild(cardGisBtn);
        card.appendChild(actions);
        var cardOut = el('div'); card.appendChild(cardOut); card._cardOut = cardOut;
        list.appendChild(card);
      });
    });
  }
  function showCardInvestitie(proiectId, card) {
    var out = card._cardOut; out.innerHTML = '<div style="font-size:11px;color:#64748b;margin-top:6px">Se calculează…</div>';
    G.UXDevizePro.cardInvestitie(proiectId).then(function (c) {
      out.innerHTML = '<div style="margin-top:8px;background:#050a14;border-radius:8px;padding:10px;font-size:12px">' +
        '<div>Valoare investiție: <b>' + lei(c.valoare_investitie) + ' lei</b></div>' +
        '<div>Valoare contract: <b>' + lei(c.valoare_contract) + ' lei</b></div>' +
        '<div>Executat: <b>' + lei(c.executat) + ' lei</b></div>' +
        '<div>Progres financiar: <b style="color:#5eead4">' + c.progres_financiar_pct + '%</b></div>' +
        '<div>Plătit: <b>' + lei(c.platit) + ' lei</b></div>' +
        '<div>Rest contract: <b>' + lei(c.rest_contract) + ' lei</b></div></div>';
    });
  }

  // ── TAB: Obiecte & Articole ──────────────────────────────────────────────
  function paneArticole(pane) {
    var DP = G.UXDevizePro;
    if (!State.proiectId) { pane.innerHTML = '<div style="color:#fbbf24;font-size:12px">⚠ Selectează un proiect în tab-ul „Proiecte" mai întâi.</div>'; return; }
    pane.innerHTML = '<div style="color:#64748b;font-size:12px">Se încarcă…</div>';
    DP.listObiecte(State.proiectId).then(function (obiecte) {
      pane.innerHTML = '';
      var addObBox = el('div', { style: 'display:flex;gap:6px;margin-bottom:10px' });
      var obNume = el('input', { style: ST.inp, placeholder: 'Denumire obiect nou (ex. OBIECT 01 - CONSTRUCȚIE)' });
      var obBtn = el('button', { style: ST.btn }, '+ Obiect');
      obBtn.onclick = function () { if (!obNume.value.trim()) return; DP.createObiect(State.proiectId, { denumire: obNume.value.trim(), cod: String(obiecte.length + 1).padStart(2, '0') }).then(function () { paneArticole(pane); }); };
      addObBox.appendChild(obNume); addObBox.appendChild(obBtn); pane.appendChild(addObBox);

      if (!obiecte.length) { pane.appendChild(el('div', { style: 'color:#64748b;font-size:12px' }, 'Niciun obiect. Creează primul obiect de mai sus.')); return; }
      var obSel = el('div', { style: 'display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px' });
      obiecte.forEach(function (o) {
        var b = el('button', { style: State.obiectId === o.id ? ST.tabOn : ST.tab }, esc(o.cod || '') + ' ' + esc(o.denumire));
        b.onclick = function () { State.obiectId = o.id; paneArticole(pane); };
        obSel.appendChild(b);
      });
      pane.appendChild(obSel);
      if (!State.obiectId) { State.obiectId = obiecte[0].id; }
      var obiect = obiecte.filter(function (o) { return o.id === State.obiectId; })[0] || obiecte[0];

      var stdWrap = el('div', { style: 'margin-bottom:10px' });
      var stdLbl = el('div', { style: ST.label }, 'Categorii standard de adăugat (bifează domeniile — acoperă și structură/rezistență, nu doar arhitectură)');
      stdWrap.appendChild(stdLbl);
      var stdBoxes = el('div', { style: 'display:flex;gap:12px;flex-wrap:wrap;margin-bottom:6px;font-size:11px;color:#cbd5e1' });
      var domeniiChecks = {};
      Object.keys(DP.CATEGORII_STD).forEach(function (d) {
        var chk = el('input', { type: 'checkbox' }); chk.checked = (d === 'arhitectura' || d === 'instalatii');
        domeniiChecks[d] = chk;
        var lab = el('label', { style: 'display:flex;align-items:center;gap:4px;cursor:pointer' });
        lab.appendChild(chk); lab.appendChild(document.createTextNode((DP.CATEGORII_STD_LABELS && DP.CATEGORII_STD_LABELS[d]) || d));
        stdBoxes.appendChild(lab);
      });
      stdWrap.appendChild(stdBoxes);
      var stdBtn = el('button', { style: ST.ghost }, '+ Creează categoriile bifate');
      stdBtn.onclick = function () {
        var domenii = Object.keys(domeniiChecks).filter(function (d) { return domeniiChecks[d].checked; });
        if (!domenii.length) return;
        DP.creazaCategoriiStandard(obiect.id, domenii).then(function () { renderCategorii(); });
      };
      stdWrap.appendChild(stdBtn);
      pane.appendChild(stdWrap);

      var importBox = el('div', { style: 'display:flex;gap:6px;align-items:center;margin-bottom:10px;flex-wrap:wrap' });
      var importBtn = el('button', { style: ST.btn + ';background:linear-gradient(180deg,#2563eb,#1d4ed8)' }, '📥 Importă din proiectarea UrbanX (relevee)');
      var importOut = el('span', { style: 'font-size:11px;color:#94a3b8' });
      importBtn.onclick = function () {
        importOut.textContent = 'Se importă din geometria proiectului activ…';
        DP.importDinProiectareUrbanX(obiect.id).then(function (r) {
          if (r.error) { importOut.textContent = '⚠ ' + r.error; return; }
          importOut.textContent = '✅ ' + r.articole_create + ' articole create (cantități reale din SC=' + Math.round(r.sc) + 'mp/SDA=' + Math.round(r.sda) + 'mp) în ' + r.categorii_create + ' categorii.';
          renderCategorii();
        });
      };
      importBox.appendChild(importBtn); importBox.appendChild(importOut);
      pane.appendChild(importBox);

      var csvBox = el('div', { style: 'display:flex;gap:6px;align-items:center;margin-bottom:10px;flex-wrap:wrap' });
      csvBox.appendChild(el('span', { style: 'font-size:11px;color:#94a3b8' }, 'sau CSV/Excel articole (cod;denumire;um;cantitate;pretunitar) → categoria selectată:'));
      var csvFile = el('input', { type: 'file', accept: '.csv,text/csv,.xlsx,.xls', style: 'font-size:11px' });
      var csvOut = el('span', { style: 'font-size:11px;color:#94a3b8' });
      csvFile.onchange = function () {
        var f = csvFile.files && csvFile.files[0]; if (!f) return;
        var esteExcel = /\.(xlsx|xls)$/i.test(f.name || '');
        csvOut.textContent = esteExcel ? '⏳ Se citește Excel…' : 'Se importă…';
        var textPromise = esteExcel
          ? (G.UXDevizeRelevee ? G.UXDevizeRelevee.xlsxToCSV(f) : Promise.reject(new Error('Modulul de citire Excel (urbanx-devize-relevee-parse.js) nu e încărcat.')))
          : f.text();
        textPromise.then(function (csvText) {
          // categoria țintă = prima categorie a obiectului curent (sau creează una implicită)
          return DP.listCategorii(obiect.id).then(function (cats) {
            var target = cats[0];
            var p = target ? Promise.resolve(target) : DP.createCategorie(obiect.id, { denumire: 'Import CSV/Excel', ordine: 0 });
            return p.then(function (cat) { return DP.importCSVArticole(cat.id, csvText); });
          });
        }).then(function (r) { csvOut.textContent = '✅ ' + r.imported + ' articole importate' + (esteExcel ? ' din Excel.' : ' din CSV.'); renderCategorii(); })
          .catch(function (e) { csvOut.textContent = '⚠ ' + (e && e.message || 'Eroare la citirea fișierului.'); });
      };
      csvBox.appendChild(csvFile); csvBox.appendChild(csvOut);
      pane.appendChild(csvBox);

      var catWrap = el('div'); pane.appendChild(catWrap);
      var devizBtn = el('button', { style: ST.btn + ';margin-top:10px' }, '🧮 Calculează deviz pe obiect');
      var devizOut = el('div', { style: 'margin-top:10px' });
      devizBtn.onclick = function () {
        devizOut.innerHTML = '<div style="color:#64748b;font-size:11px">Se calculează…</div>';
        DP.computeDevizObiect(obiect.id).then(function (d) {
          devizOut.innerHTML = DP.htmlDevizObiect(d, obiect).replace(/<table>/g, '<table style="width:100%;font-size:11px;border-collapse:collapse" border="1" cellpadding="4">');
        });
      };
      pane.appendChild(devizBtn); pane.appendChild(devizOut);

      function renderCategorii() {
        catWrap.innerHTML = '<div style="color:#64748b;font-size:11px">Se încarcă categoriile…</div>';
        DP.listCategorii(obiect.id).then(function (categorii) {
          catWrap.innerHTML = '';
          if (!categorii.length) { catWrap.innerHTML = '<div style="color:#64748b;font-size:12px">Nicio categorie — folosește butonul de mai sus sau adaugă manual.</div>'; }
          categorii.forEach(function (cat) {
            var catCard = el('div', { style: ST.card });
            catCard.appendChild(el('div', { style: 'font-weight:700;margin-bottom:6px' }, esc(cat.denumire)));
            var artWrap = el('div'); catCard.appendChild(artWrap);
            function renderArt() {
              artWrap.innerHTML = '<div style="color:#64748b;font-size:11px">…</div>';
              DP.listArticole(cat.id).then(function (articole) {
                artWrap.innerHTML = '';
                articole.forEach(function (a) {
                  var row = el('div', { style: 'display:flex;justify-content:space-between;align-items:center;font-size:11px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,.05);gap:6px' });
                  var lbl = el('span', null, esc(a.cod || '') + ' ' + esc(a.denumire) + ' <span style="color:#64748b">· ' + a.cantitate + ' ' + esc(a.um) + ' · ' + esc(a.sursa_cantitate) + (a.norma_id ? ' · normat' : (a.pret_unitar_manual != null ? ' · preț liber ' + a.pret_unitar_manual + ' lei/' + esc(a.um) : '')) + '</span>');
                  var btns = el('div', { style: 'display:flex;gap:4px;flex-shrink:0' });
                  var edit = el('button', { style: ST.ghost }, '✏️');
                  var del = el('button', { style: ST.ghost }, '🗑');
                  del.onclick = function () { if (confirm('Ștergi articolul „' + a.denumire + '"?')) DP.deleteArticol(a.id).then(renderArt); };
                  btns.appendChild(edit); btns.appendChild(del);
                  row.appendChild(lbl); row.appendChild(btns);
                  artWrap.appendChild(row);

                  edit.onclick = function () {
                    var form = el('div', { style: 'display:grid;grid-template-columns:2fr 1fr 1fr 1fr auto auto;gap:5px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.05);background:rgba(94,234,212,.05)' });
                    var eDen = el('input', { style: ST.inp, value: a.denumire || '' });
                    var eUm = el('input', { style: ST.inp, value: a.um || '' });
                    var eCant = el('input', { style: ST.inp, type: 'number', value: a.cantitate || 0 });
                    var ePret = el('input', { style: ST.inp, type: 'number', placeholder: a.norma_id ? 'articol normat — fără preț liber' : 'Preț unitar (lei)', value: a.pret_unitar_manual != null ? a.pret_unitar_manual : '' });
                    if (a.norma_id) ePret.disabled = true;
                    var save = el('button', { style: ST.btn }, '💾');
                    var cancel = el('button', { style: ST.ghost }, '✕');
                    save.onclick = function () {
                      var patch = { denumire: eDen.value.trim() || a.denumire, um: eUm.value.trim() || a.um, cantitate: +eCant.value || 0, sursa_cantitate: 'manual' };
                      if (!a.norma_id) patch.pret_unitar_manual = ePret.value !== '' ? +ePret.value : null;
                      DP.updateArticol(a.id, patch, 'editare manuală din tab Obiecte & Articole').then(renderArt);
                    };
                    cancel.onclick = function () { form.remove(); row.style.display = ''; };
                    form.appendChild(eDen); form.appendChild(eUm); form.appendChild(eCant); form.appendChild(ePret); form.appendChild(save); form.appendChild(cancel);
                    row.style.display = 'none'; row.insertAdjacentElement('afterend', form);
                  };
                });
              });
            }
            renderArt();

            // ── Adaugă articol PE NORMĂ (rețetă manoperă/utilaj/materiale — vezi tab Prețuri) ──
            var normaRow = el('div', { style: 'display:grid;grid-template-columns:2fr 1fr 1fr auto;gap:5px;margin-top:10px' });
            var normaSel = el('select', { style: ST.inp });
            normaSel.appendChild(el('option', { value: '' }, '— sau alege o normă (ore manoperă/utilaj incluse) —'));
            DP.listNorme().then(function (norme) {
              norme.forEach(function (n) { normaSel.appendChild(el('option', { value: n.id, 'data-den': n.denumire, 'data-um': n.um }, (n.cod_norma ? n.cod_norma + ' — ' : '') + n.denumire + ' (' + n.um + ')')); });
            });
            var nCantInp = el('input', { style: ST.inp, type: 'number', placeholder: 'Cantitate' });
            var nUmOut = el('input', { style: ST.inp, placeholder: 'UM (din normă)', disabled: true });
            normaSel.onchange = function () { var o = normaSel.options[normaSel.selectedIndex]; nUmOut.value = o.getAttribute('data-um') || ''; };
            var normaBtn = el('button', { style: ST.btn }, '+ Articol pe normă');
            normaBtn.onclick = function () {
              if (!normaSel.value || !nCantInp.value) return;
              var o = normaSel.options[normaSel.selectedIndex];
              DP.createArticol(cat.id, { norma_id: normaSel.value, denumire: o.getAttribute('data-den'), um: o.getAttribute('data-um'), cantitate: nCantInp.value, sursa_cantitate: 'manual' }).then(function () { normaSel.value = ''; nCantInp.value = ''; nUmOut.value = ''; renderArt(); });
            };
            normaRow.appendChild(normaSel); normaRow.appendChild(nCantInp); normaRow.appendChild(nUmOut); normaRow.appendChild(normaBtn);
            catCard.appendChild(normaRow);

            var addArtRow = el('div', { style: 'display:grid;grid-template-columns:2fr 1fr 1fr 1fr auto;gap:5px;margin-top:6px' });
            var aDen = el('input', { style: ST.inp, placeholder: 'sau Denumire articol (preț liber)' });
            var aUm = el('input', { style: ST.inp, placeholder: 'UM' });
            var aCant = el('input', { style: ST.inp, type: 'number', placeholder: 'Cantitate' });
            var aPret = el('input', { style: ST.inp, type: 'number', placeholder: 'Preț unitar (dacă liber)' });
            var aBtn = el('button', { style: ST.ghost }, '+');
            aBtn.onclick = function () {
              if (!aDen.value.trim()) return;
              DP.createArticol(cat.id, { denumire: aDen.value.trim(), um: aUm.value || 'buc', cantitate: aCant.value || 0, pret_unitar_manual: aPret.value || null, sursa_cantitate: 'manual' }).then(function () { aDen.value = ''; aCant.value = ''; aPret.value = ''; renderArt(); });
            };
            addArtRow.appendChild(aDen); addArtRow.appendChild(aUm); addArtRow.appendChild(aCant); addArtRow.appendChild(aPret); addArtRow.appendChild(aBtn);
            catCard.appendChild(addArtRow);
            catWrap.appendChild(catCard);
          });
        });
      }
      renderCategorii();
    });
  }

  // ── TAB: Relevee (upload — parsing real CSV/DXF/PDF/imagine, secțiunea 3bis) ────────────
  function paneRelevee(pane) {
    var DP = G.UXDevizePro, PR = G.UXDevizeRelevee;
    if (!State.proiectId) { pane.innerHTML = '<div style="color:#fbbf24;font-size:12px">⚠ Selectează un proiect mai întâi.</div>'; return; }
    if (!PR) { pane.innerHTML = '<div style="color:#ef4444;font-size:12px">Modulul de parsing relevee (urbanx-devize-relevee-parse.js) nu e încărcat.</div>'; return; }
    pane.innerHTML = '';
    pane.appendChild(el('div', { style: ST.label }, 'Încarcă relevee (măsurătoare/ridicare) pe un nivel'));
    pane.appendChild(el('div', { style: 'font-size:11px;color:#94a3b8;margin-bottom:8px' },
      'Formate reale: <b>CSV</b> (nivel;denumire;suprafata;um) · <b>Excel .xlsx/.xls</b> (aceleași coloane, primul rând = antet) · <b>DXF</b> (poligoane reale, arie exactă) · ' +
      '<b>PDF cu text</b> (extragere reală) · <b>PDF scanat/imagine</b> (OCR — încredere scăzută, verifică fiecare rând) · ' +
      '<b>DWG</b> nu se poate citi direct — convertește la DXF întâi. <i>Word (.docx) nu e încă suportat.</i>'));

    var grid = el('div', { style: 'display:grid;grid-template-columns:1fr 2fr;gap:6px;margin-bottom:8px' });
    var nivelInp = el('input', { style: ST.inp, placeholder: 'Nivel (ex. parter, etaj_1, subsol)', value: 'parter' });
    var fileInp = el('input', { type: 'file', accept: '.csv,.xlsx,.xls,.dxf,.pdf,.jpg,.jpeg,.png,.dwg', style: ST.inp });
    grid.appendChild(nivelInp); grid.appendChild(fileInp);
    pane.appendChild(grid);

    var progresOut = el('div', { style: 'font-size:11px;color:#94a3b8;margin-bottom:8px' });
    var reviewWrap = el('div');
    pane.appendChild(progresOut); pane.appendChild(reviewWrap);

    fileInp.onchange = function () {
      var f = fileInp.files && fileInp.files[0]; if (!f) return;
      reviewWrap.innerHTML = '';
      progresOut.textContent = '⏳ Se citește „' + f.name + '"…';
      PR.parseFisier(f, function (pct) { progresOut.textContent = '⏳ OCR în curs… ' + pct + '%'; }).then(function (r) {
        if (!r.candidati.length) { progresOut.innerHTML = '⚠ Niciun candidat identificat în fișier. Verifică formatul (vezi exemplele de mai sus) sau introdu articolele manual.'; return; }
        progresOut.innerHTML = '✅ ' + r.candidati.length + ' candidați identificați' + (r.poligoane_gasite != null ? (' din ' + r.poligoane_gasite + ' poligoane DXF') : '') + '. Revizuiește și bifează ce vrei să imporți:';
        renderReview(r, f);
      }).catch(function (e) {
        progresOut.innerHTML = '⚠ ' + (e && e.message || 'Eroare la citirea fișierului.');
      });
    };

    function renderReview(r, file) {
      reviewWrap.innerHTML = '';
      var incredereColor = { ridicata: '#34d399', medie: '#fbbf24', scazuta: '#f87171' };
      var incredereLabel = { ridicata: 'geometrie/CSV reală', medie: 'text extras din PDF', scazuta: 'OCR — verifică atent' };
      var tabel = el('div', { style: 'max-height:320px;overflow:auto;border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:6px' });
      r.candidati.forEach(function (c, i) {
        var row = el('div', { style: 'display:flex;align-items:center;gap:8px;padding:4px 2px;border-bottom:1px solid rgba(255,255,255,.05);font-size:11px' });
        var chk = el('input', { type: 'checkbox' }); chk.checked = !!c.selectat; chk.onchange = function () { c.selectat = chk.checked; };
        row.appendChild(chk);
        row.appendChild(el('span', { style: 'flex:1' }, esc(c.denumire)));
        row.appendChild(el('span', { style: 'width:70px;text-align:right' }, c.cantitate + ' ' + esc(c.um)));
        row.appendChild(el('span', { style: 'color:' + (incredereColor[c.incredere] || '#94a3b8') + ';width:140px;font-size:10px' }, incredereLabel[c.incredere] || c.incredere));
        tabel.appendChild(row);
      });
      reviewWrap.appendChild(tabel);

      var confirmRow = el('div', { style: 'display:flex;gap:6px;align-items:center;margin-top:10px' });
      var catSel = el('select', { style: ST.inp + ';max-width:260px' });
      DP.listObiecte(State.proiectId).then(function (obiecte) {
        return Promise.all(obiecte.map(function (o) { return DP.listCategorii(o.id).then(function (cats) { return cats.map(function (c) { return { obiect: o, cat: c }; }); }); }));
      }).then(function (arr) {
        var flat = [].concat.apply([], arr);
        if (!flat.length) { catSel.appendChild(el('option', { value: '' }, '(fără categorii — creează întâi un obiect/categorie în tab Articole)')); return; }
        flat.forEach(function (x) { catSel.appendChild(el('option', { value: x.cat.id }, x.obiect.denumire + ' → ' + x.cat.denumire)); });
      });
      confirmRow.appendChild(el('span', { style: 'font-size:11px;color:#94a3b8' }, 'Importă în categoria:'));
      confirmRow.appendChild(catSel);
      var importBtn = el('button', { style: ST.btn }, '✅ Importă selectate ca articole (relevat)');
      confirmRow.appendChild(importBtn);
      reviewWrap.appendChild(confirmRow);

      var doneOut = el('div', { style: 'font-size:11px;color:#94a3b8;margin-top:6px' });
      reviewWrap.appendChild(doneOut);

      importBtn.onclick = function () {
        var selectate = r.candidati.filter(function (c) { return c.selectat; });
        if (!selectate.length) { doneOut.textContent = '⚠ Niciun rând bifat.'; return; }
        if (!catSel.value) { doneOut.textContent = '⚠ Selectează o categorie țintă (creează întâi un obiect/categorie în tab „Obiecte & Articole").'; return; }
        doneOut.textContent = 'Se importă…';
        DP.addRelevee(State.proiectId, { nivel_nume: nivelInp.value.trim() || 'parter', fisier_nume: file.name, tip_fisier: (file.name.split('.').pop() || '').toLowerCase(), autor: null })
          .then(function (relevee) {
            return selectate.reduce(function (chain, c) {
              return chain.then(function () {
                return DP.createArticol(catSel.value, { denumire: c.denumire, um: c.um, cantitate: c.cantitate, sursa_cantitate: 'relevat', relevee_id: relevee.id });
              });
            }, Promise.resolve());
          }).then(function () {
            doneOut.innerHTML = '✅ ' + selectate.length + ' articole importate (sursă: relevat, nivel „' + (nivelInp.value.trim() || 'parter') + '").';
          });
      };
    }

    // ── Relevee deja încărcate pe proiect ────────────────────────────────
    var listOut = el('div', { style: 'margin-top:16px' }); pane.appendChild(listOut);
    listOut.appendChild(el('div', { style: ST.label }, 'Fișiere relevee încărcate pe acest proiect'));
    var listBody = el('div'); listOut.appendChild(listBody);
    DP.listRelevee(State.proiectId).then(function (releveuri) {
      listBody.innerHTML = releveuri.length ? '' : '<div style="color:#64748b;font-size:12px">Niciun fișier încărcat încă.</div>';
      releveuri.forEach(function (rv) {
        listBody.appendChild(el('div', { style: 'font-size:11px;color:#cbd5e1;padding:3px 0' },
          '📎 ' + esc(rv.fisier_nume || '—') + ' · nivel ' + esc(rv.nivel_nume) + ' · ' + esc(rv.tip_fisier || '') + ' · ' + (rv.data_masurare || '')));
      });
    });
  }

  // ── TAB: Prețuri (4 niveluri) ────────────────────────────────────────────
  function panePreturi(pane) {
    var DP = G.UXDevizePro;
    pane.innerHTML = '';
    var addBox = el('div', { style: ST.card });
    addBox.appendChild(el('div', { style: ST.label }, 'Resursă nouă'));
    var grid = el('div', { style: 'display:grid;grid-template-columns:2fr 1fr 1fr;gap:6px' });
    var rDen = el('input', { style: ST.inp, placeholder: 'Denumire resursă (ex. Beton C25/30)' });
    var rUm = el('input', { style: ST.inp, placeholder: 'UM (mc, kg, ore...)' });
    var rCat = el('select', { style: ST.inp });
    [['material', 'Material'], ['manopera', 'Manoperă'], ['utilaj', 'Utilaj'], ['transport', 'Transport']].forEach(function (o) { rCat.appendChild(el('option', { value: o[0] }, o[1])); });
    grid.appendChild(rDen); grid.appendChild(rUm); grid.appendChild(rCat); addBox.appendChild(grid);
    var addBtn = el('button', { style: ST.btn + ';margin-top:8px' }, '+ Resursă');
    addBtn.onclick = function () { if (!rDen.value.trim()) return; DP.createResursa({ denumire: rDen.value.trim(), um: rUm.value || 'buc', categorie: rCat.value }).then(function () { panePreturi(pane); }); };
    addBox.appendChild(addBtn); pane.appendChild(addBox);

    var csvBox = el('div', { style: ST.card });
    csvBox.appendChild(el('div', { style: ST.label }, 'Import bază de prețuri externă (CSV: cod;denumire;um;categorie;pret)'));
    var csvFile = el('input', { type: 'file', accept: '.csv,text/csv' });
    var csvOut = el('div', { style: 'font-size:11px;color:#94a3b8;margin-top:6px' });
    csvFile.onchange = function () {
      var f = csvFile.files && csvFile.files[0]; if (!f) return;
      var reader = new FileReader();
      reader.onload = function () {
        csvOut.textContent = 'Se importă…';
        DP.importCSVResurse(reader.result).then(function (r) { csvOut.textContent = '✅ ' + r.imported + ' resurse importate (preț de referință setat automat unde era prezent).'; panePreturi(pane); });
      };
      reader.readAsText(f, 'utf-8');
    };
    csvBox.appendChild(csvFile); csvBox.appendChild(csvOut);
    pane.appendChild(csvBox);

    var insBox = el('div', { style: ST.card });
    insBox.appendChild(el('div', { style: ST.label }, 'Indice INSSE — CNS107D (indici de cost în construcții)'));
    var insOut = el('div', { style: 'font-size:12px' }, 'Se încarcă…');
    insBox.appendChild(insOut); pane.appendChild(insBox);
    DP.insIndexLatest('CNS107D', 'Total', 'Total').then(function (idx) {
      insOut.innerHTML = idx ? ('Ultimul indice disponibil: <b>' + idx.perioada + '</b> = <b style="color:#5eead4">' + idx.valoare + '%</b> (' + idx.status + ') — sursă INSSE TEMPO, extras automat via scripts/refresh_inse.py.') : 'Indicele nu a fost încă sincronizat (rulează scripts/refresh_inse.py).';
    });

    var listWrap = el('div'); pane.appendChild(listWrap);
    listWrap.innerHTML = '<div style="color:#64748b;font-size:12px">Se încarcă resursele…</div>';
    DP.listResurse().then(function (resurse) {
      listWrap.innerHTML = '';
      if (!resurse.length) { listWrap.innerHTML = '<div style="color:#64748b;font-size:12px">Nicio resursă încă.</div>'; return; }
      resurse.forEach(function (r) {
        var card = el('div', { style: ST.card });
        card.appendChild(el('div', { style: 'font-weight:700' }, esc(r.denumire) + ' <span style="font-size:10px;color:#94a3b8">' + esc(r.um) + ' · ' + esc(r.categorie) + '</span>'));
        var preturiOut = el('div', { style: 'font-size:11px;margin:6px 0' }); card.appendChild(preturiOut);
        function refreshPreturi() {
          preturiOut.innerHTML = 'Se încarcă…';
          Promise.all(DP.NIVELURI.map(function (n) { return DP.pretCurent(r.id, n); })).then(function (arr) {
            preturiOut.innerHTML = DP.NIVELURI.map(function (n, i) { var p = arr[i]; return '<div>' + n + ': ' + (p ? ('<b>' + p.valoare + ' lei</b> · ' + esc(p.sursa_text || '') + ' · ' + p.data_valabilitate) : '<span style="color:#64748b">—</span>') + '</div>'; }).join('');
          });
        }
        refreshPreturi();
        var row1 = el('div', { style: 'display:flex;gap:5px;flex-wrap:wrap' });
        var refInp = el('input', { style: ST.inp + ';width:100px', type: 'number', placeholder: 'Preț ref.' });
        var refBtn = el('button', { style: ST.ghost }, '① Setează referință');
        refBtn.onclick = function () { if (!refInp.value) return; DP.setPretReferinta(r.id, +refInp.value).then(refreshPreturi); };
        var actBtn = el('button', { style: ST.ghost }, '② Actualizează (× indice CNS107D)');
        actBtn.onclick = function () { DP.setPretActualizat(r.id).then(refreshPreturi); };
        row1.appendChild(refInp); row1.appendChild(refBtn); row1.appendChild(actBtn);
        card.appendChild(row1);
        var row2 = el('div', { style: 'display:flex;gap:5px;flex-wrap:wrap;margin-top:5px' });
        var ofInp = el('input', { style: ST.inp + ';width:100px', type: 'number', placeholder: 'Preț ofertă' });
        var ofBtn = el('button', { style: ST.ghost }, '③ Ofertă furnizor');
        ofBtn.onclick = function () { if (!ofInp.value) return; DP.setPretOfertaFurnizor(r.id, +ofInp.value, null).then(refreshPreturi); };
        row2.appendChild(ofInp); row2.appendChild(ofBtn);
        ['referinta', 'actualizat', 'oferta_furnizor'].forEach(function (n) {
          var useBtn = el('button', { style: ST.ghost }, '④ Folosește ' + n);
          useBtn.onclick = function () { DP.alegePretFolosit(r.id, n).then(refreshPreturi); };
          row2.appendChild(useBtn);
        });
        card.appendChild(row2);
        listWrap.appendChild(card);
      });
      _renderNormeSectiune(pane, DP, resurse);
    });
  }

  function _renderNormeSectiune(pane, DP, resurse) {
    // ── Norme de deviz (rețetă: 1 UM normă = X ore manoperă + Y ore utilaj + Z materiale/transport) ──
    // Fără asta, un articol are DOAR preț unitar liber (fără detaliere ore normate/utilaje) — normele
    // sunt ce leagă efectiv "ore normate, utilaje, muncitori" (cerință explicită) de costul unui articol.
    var normeBox = el('div', { style: ST.card + ';margin-top:14px' });
    normeBox.appendChild(el('div', { style: ST.label }, '🧮 Normă de deviz nouă (rețetă manoperă/utilaj/materiale/transport pe unitate)'));
    normeBox.appendChild(el('div', { style: 'font-size:11px;color:#94a3b8;margin-bottom:8px' },
      'O normă = câte ore de manoperă, ore de utilaj și ce materiale consumă 1 unitate din articol (ex. 1 mp zidărie = 0,45 ore manoperă + 0,02 ore macara + 0,1 mc BCA). Odată creată, o poți alege la adăugarea unui articol — costul se calculează automat din normă × prețurile curente ale resurselor.'));
    var nGrid = el('div', { style: 'display:grid;grid-template-columns:1fr 2fr 1fr 1fr;gap:6px;margin-bottom:8px' });
    var nCod = el('input', { style: ST.inp, placeholder: 'Cod normă (ex. CA07A)' });
    var nDen = el('input', { style: ST.inp, placeholder: 'Denumire normă (ex. Zidărie BCA 25cm)' });
    var nUm = el('input', { style: ST.inp, placeholder: 'UM (mp, mc, buc...)' });
    var nDom = el('select', { style: ST.inp });
    ['constructii', 'instalatii', 'structura', 'terasamente'].forEach(function (d) { nDom.appendChild(el('option', { value: d }, d)); });
    nGrid.appendChild(nCod); nGrid.appendChild(nDen); nGrid.appendChild(nUm); nGrid.appendChild(nDom);
    normeBox.appendChild(nGrid);

    var linii = []; // {resursa_id, denumire, tip, consum_unitar, um}
    var liniiWrap = el('div', { style: 'margin-bottom:8px' });
    normeBox.appendChild(liniiWrap);
    function renderLinii() {
      liniiWrap.innerHTML = linii.length ? '' : '<div style="font-size:11px;color:#64748b">Nicio resursă adăugată încă în rețetă.</div>';
      linii.forEach(function (l, i) {
        var r = el('div', { style: 'display:flex;justify-content:space-between;font-size:11px;padding:2px 0' });
        r.appendChild(el('span', null, esc(l.denumire) + ' <span style="color:#64748b">· ' + l.tip + ' · ' + l.consum_unitar + ' ' + esc(l.um) + '/UM normă</span>'));
        var rm = el('button', { style: ST.ghost }, '✕');
        rm.onclick = function () { linii.splice(i, 1); renderLinii(); };
        r.appendChild(rm);
        liniiWrap.appendChild(r);
      });
    }
    renderLinii();

    var addLinieGrid = el('div', { style: 'display:grid;grid-template-columns:2fr 1fr auto;gap:6px;margin-bottom:8px' });
    var resSel = el('select', { style: ST.inp });
    resSel.appendChild(el('option', { value: '' }, '— alege resursă (material/manoperă/utilaj/transport) —'));
    (resurse || []).forEach(function (r) { resSel.appendChild(el('option', { value: r.id, 'data-tip': r.categorie, 'data-den': r.denumire, 'data-um': r.um }, r.denumire + ' (' + r.categorie + ', ' + r.um + ')')); });
    var consumInp = el('input', { style: ST.inp, type: 'number', placeholder: 'Consum unitar (ex. ore/UM sau kg/UM)' });
    var addLinieBtn = el('button', { style: ST.ghost }, '+ Adaugă în rețetă');
    addLinieBtn.onclick = function () {
      var opt = resSel.options[resSel.selectedIndex];
      if (!resSel.value || !consumInp.value) return;
      linii.push({ resursa_id: resSel.value, denumire: opt.getAttribute('data-den'), tip: opt.getAttribute('data-tip'), um: opt.getAttribute('data-um'), consum_unitar: +consumInp.value });
      consumInp.value = ''; renderLinii();
    };
    addLinieGrid.appendChild(resSel); addLinieGrid.appendChild(consumInp); addLinieGrid.appendChild(addLinieBtn);
    normeBox.appendChild(addLinieGrid);
    if (!resurse.length) normeBox.appendChild(el('div', { style: 'font-size:11px;color:#fbbf24;margin-bottom:8px' }, '⚠ Creează întâi resurse mai sus (materiale/manoperă/utilaj/transport) — o normă e o rețetă din resurse existente.'));

    var nOut = el('div', { style: 'font-size:11px;color:#94a3b8' });
    var nBtn = el('button', { style: ST.btn });
    nBtn.textContent = '✅ Creează norma';
    nBtn.onclick = function () {
      if (!nDen.value.trim() || !nUm.value.trim() || !linii.length) { nOut.textContent = '⚠ Completează denumire, UM și cel puțin o resursă în rețetă.'; return; }
      nOut.textContent = 'Se creează…';
      DP.creazaNorma({ cod_norma: nCod.value.trim(), denumire: nDen.value.trim(), um: nUm.value.trim(), domeniu: nDom.value, sursa: 'introdusa_user' }, linii)
        .then(function () { nOut.textContent = '✅ Normă creată — acum o poți alege la adăugarea unui articol.'; nCod.value = ''; nDen.value = ''; nUm.value = ''; linii = []; renderLinii(); renderNormeList(); });
    };
    normeBox.appendChild(nOut); normeBox.appendChild(nBtn);
    pane.appendChild(normeBox);

    var normeListWrap = el('div', { style: 'margin-top:10px' }); pane.appendChild(normeListWrap);
    function renderNormeList() {
      normeListWrap.innerHTML = '<div style="color:#64748b;font-size:11px">Se încarcă normele existente…</div>';
      DP.listNorme().then(function (norme) {
        normeListWrap.innerHTML = '';
        normeListWrap.appendChild(el('div', { style: ST.label }, 'Norme existente (' + norme.length + ')'));
        if (!norme.length) { normeListWrap.appendChild(el('div', { style: 'font-size:11px;color:#64748b' }, 'Nicio normă creată încă.')); return; }
        norme.forEach(function (n) { normeListWrap.appendChild(el('div', { style: 'font-size:11px;padding:2px 0' }, esc(n.cod_norma || '') + ' ' + esc(n.denumire) + ' <span style="color:#64748b">· ' + esc(n.um) + ' · ' + esc(n.domeniu) + '</span>')); });
      });
    }
    renderNormeList();
  }

  // ── TAB: Furnizori & Contracte ───────────────────────────────────────────
  function paneContracte(pane) {
    var DP = G.UXDevizePro;
    if (!State.proiectId) { pane.innerHTML = '<div style="color:#fbbf24;font-size:12px">⚠ Selectează un proiect mai întâi.</div>'; return; }
    pane.innerHTML = '';
    var fBox = el('div', { style: ST.card });
    fBox.appendChild(el('div', { style: ST.label }, 'Furnizor / constructor nou'));
    var fNume = el('input', { style: ST.inp, placeholder: 'Denumire firmă' });
    var fCui = el('input', { style: ST.inp, placeholder: 'CUI (opțional)' });
    var fBtn = el('button', { style: ST.btn + ';margin-top:6px' }, '+ Furnizor');
    fBtn.onclick = function () { if (!fNume.value.trim()) return; DP.creazaFurnizor({ nume: fNume.value.trim(), cui: fCui.value.trim() }).then(function () { paneContracte(pane); }); };
    fBox.appendChild(fNume); fBox.appendChild(fCui); fBox.appendChild(fBtn); pane.appendChild(fBox);

    DP.listFurnizori().then(function (furnizori) {
      var cBox = el('div', { style: ST.card });
      cBox.appendChild(el('div', { style: ST.label }, 'Contract nou'));
      var fSel = el('select', { style: ST.inp }); furnizori.forEach(function (f) { fSel.appendChild(el('option', { value: f.id }, f.nume)); });
      var val = el('input', { style: ST.inp, type: 'number', placeholder: 'Valoare contract (lei)' });
      var gar = el('input', { style: ST.inp, type: 'number', placeholder: '% garanție reținere (implicit 5)' });
      var grid = el('div', { style: 'display:grid;grid-template-columns:2fr 1fr 1fr;gap:6px' }); grid.appendChild(fSel); grid.appendChild(val); grid.appendChild(gar);
      cBox.appendChild(grid);
      var cBtn = el('button', { style: ST.btn + ';margin-top:6px' }, '+ Contract');
      cBtn.onclick = function () { if (!furnizori.length || !val.value) return; DP.creazaContract(State.proiectId, { furnizor_id: fSel.value, valoare: val.value, procent_garantie_retinere: gar.value || 5 }).then(function () { paneContracte(pane); }); };
      cBox.appendChild(cBtn); pane.appendChild(cBox);

      var listWrap = el('div'); pane.appendChild(listWrap);
      DP.listContracte(State.proiectId).then(function (contracte) {
        listWrap.innerHTML = '';
        if (!contracte.length) { listWrap.innerHTML = '<div style="color:#64748b;font-size:12px">Niciun contract încă.</div>'; return; }
        contracte.forEach(function (c) {
          var furn = furnizori.filter(function (f) { return f.id === c.furnizor_id; })[0];
          var card = el('div', { style: ST.card });
          card.appendChild(el('div', { style: 'font-weight:700' }, (c.numar || '') + ' · ' + (furn ? esc(furn.nume) : '—') + ' · <span style="color:#5eead4">' + lei(c.valoare) + ' lei</span>'));
          var garOut = el('div', { style: 'font-size:11px;margin:4px 0' }); card.appendChild(garOut);
          DP.garantieStatus(c.id).then(function (g) { garOut.innerHTML = g ? ('Garanție: acumulată ' + lei(g.acumulata) + ' · eliberată ' + lei(g.eliberata) + ' · rămas reținut <b>' + lei(g.disponibil_retinut) + '</b> lei (' + g.procent + '%)') : ''; });
          card.appendChild(card);
          listWrap.appendChild(card);
        });
      });
    });
  }

  // ── TAB: Situații de lucrări & Decontare ─────────────────────────────────
  function paneSituatii(pane) {
    var DP = G.UXDevizePro;
    if (!State.proiectId) { pane.innerHTML = '<div style="color:#fbbf24;font-size:12px">⚠ Selectează un proiect mai întâi.</div>'; return; }
    pane.innerHTML = '<div style="color:#64748b;font-size:12px">Se încarcă contractele…</div>';
    DP.listContracte(State.proiectId).then(function (contracte) {
      pane.innerHTML = '';
      if (!contracte.length) { pane.innerHTML = '<div style="color:#64748b;font-size:12px">Creează întâi un contract în tab-ul „Furnizori & Contracte".</div>'; return; }
      contracte.forEach(function (contract) {
        var cCard = el('div', { style: ST.card });
        cCard.appendChild(el('div', { style: 'font-weight:700;margin-bottom:6px' }, (contract.numar || 'Contract') + ' · ' + lei(contract.valoare) + ' lei'));
        var newRow = el('div', { style: 'display:flex;gap:6px;margin-bottom:8px' });
        var perioada = el('input', { style: ST.inp, placeholder: 'Perioadă (YYYY-MM)', value: new Date().toISOString().slice(0, 7) });
        var nBtn = el('button', { style: ST.ghost }, '+ Situație nouă');
        nBtn.onclick = function () { DP.creazaSituatie(contract.id, { perioada: perioada.value }).then(function () { paneSituatii(pane); }); };
        newRow.appendChild(perioada); newRow.appendChild(nBtn); cCard.appendChild(newRow);

        var sitWrap = el('div'); cCard.appendChild(sitWrap);
        DP.listSituatii(contract.id).then(function (situatii) {
          sitWrap.innerHTML = '';
          situatii.forEach(function (s) {
            var sCard = el('div', { style: 'background:#050a14;border-radius:8px;padding:8px;margin-bottom:8px' });
            sCard.appendChild(el('div', null, '<b>' + s.perioada + '</b> · <span style="color:#94a3b8">' + s.status + '</span>'));
            var artRow = el('div', { style: 'display:flex;gap:5px;margin:6px 0' });
            var articolIdInp = el('input', { style: ST.inp, placeholder: 'ID articol (din tab Obiecte)' });
            var cantAnt = el('input', { style: ST.inp, type: 'number', placeholder: 'Executat anterior' });
            var cantLuna = el('input', { style: ST.inp, type: 'number', placeholder: 'Executat luna asta' });
            var addArtBtn = el('button', { style: ST.ghost }, '+' );
            addArtBtn.onclick = function () {
              if (!articolIdInp.value.trim()) return;
              DP.addSituatieArticol(s.id, { articol_id: articolIdInp.value.trim(), cantitate_executata_anterior: cantAnt.value || 0, cantitate_executata_luna: cantLuna.value || 0 }).then(function () { paneSituatii(pane); });
            };
            artRow.appendChild(articolIdInp); artRow.appendChild(cantAnt); artRow.appendChild(cantLuna); artRow.appendChild(addArtBtn);
            sCard.appendChild(artRow);
            var calcOut = el('div', { style: 'font-size:11px' }); sCard.appendChild(calcOut);
            var calcBtn = el('button', { style: ST.ghost }, '🧮 Calculează situația de plată');
            calcBtn.onclick = function () {
              calcOut.innerHTML = 'Se calculează…';
              DP.computeSituatiePlata(s.id).then(function (calc) {
                if (!calc) { calcOut.innerHTML = 'Eroare.'; return; }
                calcOut.innerHTML = '<table style="width:100%;font-size:11px;margin-top:6px" border="1" cellpadding="4">' +
                  '<tr><th>Articol</th><th>Contractat</th><th>Ex. anterior</th><th>Ex. luna</th><th>Rest</th><th>Valoare lună</th></tr>' +
                  calc.linii.map(function (l) { return '<tr><td>' + esc(l.articol.denumire) + '</td><td>' + l.cantitate_contractata + '</td><td>' + l.executat_anterior + '</td><td>' + l.executat_luna + '</td><td>' + l.rest + '</td><td>' + lei(l.valoare_luna) + '</td></tr>'; }).join('') +
                  '</table>' +
                  '<div style="margin-top:6px">Valoare brută: <b>' + lei(calc.valoare_bruta) + ' lei</b> · Garanție reținută (' + calc.procent_garantie + '%): <b>' + lei(calc.garantie_retinuta) + ' lei</b> · <b style="color:#5eead4">Net de plată: ' + lei(calc.valoare_neta_plata) + ' lei</b></div>';
              });
            };
            sCard.appendChild(calcBtn);
            if (s.status !== 'decontat') {
              var decBtn = el('button', { style: ST.btn + ';margin-left:6px' }, '💳 Decontează');
              decBtn.onclick = function () { DP.deconteazaSituatie(s.id).then(function () { paneSituatii(pane); }); };
              sCard.appendChild(decBtn);
            } else {
              sCard.appendChild(el('span', { style: 'color:#34d399;font-weight:700;margin-left:6px' }, '✅ Decontat'));
            }
            sitWrap.appendChild(sCard);
          });
        });
        pane.appendChild(cCard);
      });
    });
  }

  // ── TAB: Rapoarte ─────────────────────────────────────────────────────────
  function paneRapoarte(pane) {
    var DP = G.UXDevizePro;
    if (!State.proiectId) { pane.innerHTML = '<div style="color:#fbbf24;font-size:12px">⚠ Selectează un proiect mai întâi.</div>'; return; }
    pane.innerHTML = '';
    pane.appendChild(el('div', { style: ST.label }, 'Documente generate (F1-F5 + Deviz pe obiect + Deviz general HG907)'));
    var out = el('div', { style: 'font-size:12px;margin-top:8px' }); pane.appendChild(out);
    var btn = el('button', { style: ST.btn }, '⬇ Generează + exportă Word real (.docx) + ZIP');
    btn.onclick = function () {
      if (!G.UXDevizeDocx) { out.innerHTML = '⚠ Modulul de export Word (urbanx-devize-docx.js) nu e încărcat.'; return; }
      out.innerHTML = '⏳ Se generează documentele Word (.docx)…';
      G.UXDevizeDocx.exportProiectDocxReal(State.proiectId).then(function (n) { out.innerHTML = '✅ ' + n + ' documente Word (.docx) reale exportate (arhivă ZIP).'; })
        .catch(function (e) { out.innerHTML = '⚠ ' + (e && e.message || 'Eroare la generarea Word.'); });
    };
    pane.appendChild(btn);
    var csvBtn = el('button', { style: ST.ghost + ';margin-left:8px' }, '📊 Export CSV deviz general (rapid)');
    csvBtn.onclick = function () { if (G.UXDevize && G.UXDevize.exportDevizCSV) G.UXDevize.exportDevizCSV({}); };
    pane.appendChild(csvBtn);
  }

  // ── TAB: Audit & Alerte ───────────────────────────────────────────────────
  function paneAudit(pane) {
    var DP = G.UXDevizePro;
    pane.innerHTML = '<div style="color:#64748b;font-size:12px">Se încarcă…</div>';
    Promise.all([DP.listAlerte(State.proiectId), DP.offlineQueueSize()]).then(function (r) {
      var alerte = r[0], queueSize = r[1];
      pane.innerHTML = '';
      if (queueSize > 0) pane.appendChild(el('div', { style: 'color:#fbbf24;font-size:11px;margin-bottom:8px' }, '⚠ ' + queueSize + ' operații în coadă offline (fără conexiune la Supabase) — se sincronizează automat la reconectare.'));
      pane.appendChild(el('div', { style: ST.label }, 'Alerte preț/buget'));
      if (!alerte.length) pane.appendChild(el('div', { style: 'color:#64748b;font-size:12px' }, 'Nicio alertă.'));
      alerte.forEach(function (a) {
        var card = el('div', { style: ST.card + (a.vazuta ? ';opacity:.5' : '') });
        card.appendChild(el('div', null, '<b>' + esc(a.tip) + '</b> · ' + esc(a.mesaj) + ' <span style="color:#94a3b8">· ' + a.procent_abatere + '%</span>'));
        if (!a.vazuta) { var b = el('button', { style: ST.ghost }, 'Marchează văzută'); b.onclick = function () { DP.marcheazaAlertaVazuta(a.id).then(function () { paneAudit(pane); }); }; card.appendChild(b); }
        pane.appendChild(card);
      });
    });
  }

  G.UXDevizePro = G.UXDevizePro || {};
  G.UXDevizePro.openPanel = openPanel;
  console.log('[UXDevizePro] UI încărcat (meniu: window.UXDevizePro.openPanel)');
})(window);
