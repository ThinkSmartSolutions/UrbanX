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
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.72);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
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
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head });
    head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">💰 UrbanX Devize & Cost Management</div><div style="font-size:11px;color:#94a3b8">Proiect → Obiecte → Articole → Resurse → Prețuri → Ofertare → Contract → Situații de lucrări → Decontare</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x);
    m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);

    var TABS = [
      ['proiecte', '📁 Proiecte'], ['articole', '🧱 Obiecte & Articole'], ['preturi', '💶 Prețuri'],
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
      var fn = { proiecte: paneProiecte, articole: paneArticole, preturi: panePreturi, contracte: paneContracte, situatii: paneSituatii, rapoarte: paneRapoarte, audit: paneAudit }[State.tab];
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

      var stdBtn = el('button', { style: ST.ghost + ';margin-bottom:10px' }, '+ Categorii standard (ARHITECTURĂ+INSTALAȚII)');
      stdBtn.onclick = function () { DP.creazaCategoriiStandard(obiect.id, ['arhitectura', 'instalatii']).then(function () { renderCategorii(); }); };
      pane.appendChild(stdBtn);

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
      csvBox.appendChild(el('span', { style: 'font-size:11px;color:#94a3b8' }, 'sau CSV articole (cod;denumire;um;cantitate;pretunitar) → categoria selectată:'));
      var csvFile = el('input', { type: 'file', accept: '.csv,text/csv', style: 'font-size:11px' });
      var csvOut = el('span', { style: 'font-size:11px;color:#94a3b8' });
      csvFile.onchange = function () {
        var f = csvFile.files && csvFile.files[0]; if (!f) return;
        var catActiva = (State._lastCategorii || [])[0];
        var reader = new FileReader();
        reader.onload = function () {
          csvOut.textContent = 'Se importă…';
          // categoria țintă = prima categorie a obiectului curent (sau creează una implicită)
          DP.listCategorii(obiect.id).then(function (cats) {
            var target = cats[0];
            var p = target ? Promise.resolve(target) : DP.createCategorie(obiect.id, { denumire: 'Import CSV', ordine: 0 });
            return p.then(function (cat) { return DP.importCSVArticole(cat.id, reader.result); });
          }).then(function (r) { csvOut.textContent = '✅ ' + r.imported + ' articole importate din CSV.'; renderCategorii(); });
        };
        reader.readAsText(f, 'utf-8');
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
                  var row = el('div', { style: 'display:flex;justify-content:space-between;align-items:center;font-size:11px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,.05)' });
                  row.appendChild(el('span', null, esc(a.cod || '') + ' ' + esc(a.denumire) + ' <span style="color:#64748b">· ' + a.cantitate + ' ' + esc(a.um) + ' · ' + esc(a.sursa_cantitate) + '</span>'));
                  var del = el('button', { style: ST.ghost }, '🗑');
                  del.onclick = function () { DP.deleteArticol(a.id).then(renderArt); };
                  row.appendChild(del);
                  artWrap.appendChild(row);
                });
              });
            }
            renderArt();
            var addArtRow = el('div', { style: 'display:grid;grid-template-columns:2fr 1fr 1fr 1fr auto;gap:5px;margin-top:8px' });
            var aDen = el('input', { style: ST.inp, placeholder: 'Denumire articol' });
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
    });
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
    var btn = el('button', { style: ST.btn }, '⬇ Generează + exportă ZIP');
    btn.onclick = function () {
      out.innerHTML = 'Se generează documentele…';
      DP.exportProiectDocx(State.proiectId).then(function (n) { out.innerHTML = '✅ ' + n + ' documente exportate.'; });
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
