/* ============================================================================
 * UrbanX — 001 Navigare: sertar lateral structurat (window.UXSidebar).
 * Adaptat vanilla (ARCHITECTURE.md): app cu hartă full-screen → sertar OVERLAY
 * slide-in (NU reflow, ar acoperi harta). 7 grupe task-based, acordeon, openModule
 * dispatch la window.X real, Quick Actions, active-state, rol, responsive.
 * Înlocuiește meniul-amalgam „UrbanX Pro" (butonul îl deschide pe acesta).
 * Complementar Launcher-ului (Cmd/K = căutare; sertar = navigare browsable).
 * ========================================================================== */
(function (G) {
  'use strict';
  var D = document;
  function call(fn) { return function () { try { if (typeof G[fn] === 'function') G[fn](); else G.ss && G.ss(fn + '…'); } catch (e) { console.warn('[Sidebar]', fn, e); } }; }
  function mod(o, m, arg) { return function () { try { if (G[o] && typeof G[o][m] === 'function') G[o][m](arg); else G.ss && G.ss(o + ' se inițializează…'); } catch (e) { console.warn('[Sidebar]', o, e); } }; }

  // ── moduleId → mecanismul REAL (window.X) ──
  var MODULE_OPEN = {
    harta: function () { try { G._closeAllMenusAndOverlay && G._closeAllMenusAndOverlay(); } catch (e) {} },
    fisa360: mod('Fisa360', 'open'), studyzone: mod('StudyZone', 'openBuilder'),
    cadastru: mod('Cadastru', 'openPanel'), dosar: mod('Dosar', 'open'), heritage: mod('Heritage', 'openPanel'),
    cau: mod('CAU', 'openPanel'), plati: mod('Plati', 'openPanel'), notificari: mod('Notificari', 'openPanel'),
    intelligence: mod('UXI', 'openDashboard'), mobility: mod('Flux', 'openStudiu'), market: mod('Market', 'openPanel'),
    feasibility: mod('Feaz', 'openPanel'), invest: mod('Invest', 'openPanel'), portfolio: mod('Portfolio', 'openPanel'),
    lvc: mod('LVC', 'openPanel'), carbon: mod('Carbon', 'openPanel'),
    analytics: function () { try { var t = D.getElementById('tab-analytics'); if (t) t.click(); } catch (e) {} },
    metodologie: function () { try { var t = D.getElementById('tab-methodology'); if (t) t.click(); } catch (e) {} },
    simlab: mod('SimLab', 'openDashboard'), lotizare: mod('Ansamblu', 'openWizard'), superbloc: mod('Superbloc', 'openPanel'),
    loisir: mod('Loisir', 'openPanel'), uhi: mod('UHI', 'openPanel'),
    sesizari: mod('Sesizari', 'openForm'), 'sesizari-map': mod('Sesizari', 'toggleMap'),
    participare: function () { try { G._PublicParticipation && G._PublicParticipation.toggle(); } catch (e) {} },
    'sidu-doc': function () { try { G.SIDU && G.SIDU.generateDocument && G.SIDU.generateDocument(G.TCI && G.TCI.cityKey); } catch (e) {} },
    'sidu-docx': function () { try { G.SIDU && G.SIDU.generateDocx && G.SIDU.generateDocx(G.TCI && G.TCI.cityKey); } catch (e) {} },
    sidu: mod('SIDU', 'openPanel'), masterplan: call('generateMasterplan'), pmud: call('generatePMUD'),
    portofoliu: call('generatePortfolio')
  };

  // ── NAV_STRUCTURE (7 grupe, emoji — fără librărie iconițe) ──
  var NAV = [
    { id: 'teritoriu', label: 'Teritoriu', ico: '🗺', color: '#378ADD', items: [
      { label: 'Hartă (închide panourile)', moduleId: 'harta' },
      { label: 'Fișa parcelei 360°', moduleId: 'fisa360' },
      { label: 'Zonă de studiu', moduleId: 'studyzone' },
      { label: 'Fișă cadastrală', moduleId: 'cadastru' },
      { label: 'Dosar digital imobil', moduleId: 'dosar' },
      { label: 'Patrimoniu construit', moduleId: 'heritage' } ] },
    { id: 'autorizare', label: 'Autorizare', ico: '📋', color: '#BA7517', items: [
      { label: 'CAU — Acorduri Unice (CU+avize)', moduleId: 'cau' },
      { label: 'Plăți taxe urbanistice', moduleId: 'plati' },
      { label: 'Notificarea vecinilor', moduleId: 'notificari' } ] },
    { id: 'analiza', label: 'Analiză', ico: '📊', color: '#534AB7', items: [
      { label: 'Capacitate & conformitate UAT', moduleId: 'intelligence' },
      { label: 'Flux — trafic / mobilitate', moduleId: 'mobility' },
      { label: 'Market — piața imobiliară', moduleId: 'market' },
      { label: 'Pro-formă (fezabilitate)', moduleId: 'feasibility' },
      { label: 'Investment Score', moduleId: 'invest' },
      { label: 'Portfolio Due Diligence', moduleId: 'portfolio' },
      { label: 'Land Value Capture', moduleId: 'lvc' },
      { label: 'Carbon & emisii', moduleId: 'carbon' },
      { label: 'Analytics — Walk/15-min/ROI/Carbon/UHI/SDG/seismic', moduleId: 'analytics' },
      { label: 'Metodologie & surse de date', moduleId: 'metodologie' } ] },
    { id: 'proiectare', label: 'Proiectare', ico: '📐', color: '#D85A30', items: [
      { label: 'SimLab — simulări (10)', moduleId: 'simlab' },
      { label: 'Masterplan ansamblu (lotizare)', moduleId: 'lotizare' },
      { label: 'Superbloc (Barcelona)', moduleId: 'superbloc' } ] },
    { id: 'loisir', label: 'Loisir & Verde', ico: '🌿', color: '#639922', items: [
      { label: 'LOISIR — spații verzi', moduleId: 'loisir' },
      { label: 'UHI — insulă de căldură', moduleId: 'uhi' } ] },
    { id: 'cetateni', label: 'Cetățeni', ico: '👥', color: '#1D9E75', items: [
      { label: 'Sesizare urbană', moduleId: 'sesizari' },
      { label: 'Hartă sesizări (pe/off)', moduleId: 'sesizari-map' },
      { label: 'Participare publică', moduleId: 'participare' } ] },
    { id: 'strategie', label: 'Strategie & Administrare', ico: '🏛', color: '#888780', items: [
      { label: 'SIDU — document strategic (PDF)', moduleId: 'sidu-doc' },
      { label: 'SIDU — document strategic (Word)', moduleId: 'sidu-docx' },
      { label: 'SIDU — registru & coerență', moduleId: 'sidu' },
      { label: 'Masterplan strategic (PDF)', moduleId: 'masterplan' },
      { label: 'PMUD — mobilitate (PDF)', moduleId: 'pmud' },
      { label: 'Portofoliu strategic 2025-2055', moduleId: 'portofoliu' } ] }
  ];
  var QUICK = [
    { label: 'Sesizare', ico: '📣', moduleId: 'sesizari' },
    { label: 'Caută parcelă', ico: '🔍', moduleId: '_search' },
    { label: 'SimLab', ico: '🧪', moduleId: 'simlab' },
    { label: 'CU nou', ico: '📋', moduleId: 'cau' }
  ];

  var State = { activeGroup: null, activeModule: null };

  function openModule(id) {
    State.activeModule = id;
    var g = NAV.find(function (x) { return x.items.some(function (i) { return i.moduleId === id; }); });
    if (g) State.activeGroup = g.id;
    if (id === '_search') { var t = D.querySelector('.ptab[data-t="search"]'); if (t) t.click(); close(); return; }
    var fn = MODULE_OPEN[id];
    close(); // închide sertarul, apoi deschide modulul
    setTimeout(function () { if (fn) fn(); else G.ss && G.ss(id + ' — nedisponibil'); }, 20);
  }

  function isAdmin() { try { return !!(G._USER && (G._USER.role === 'admin' || G._USER.role === 'primar' || G._USER.isAdmin)); } catch (e) { return true; } }

  function render() {
    var el = D.getElementById('ux-sidebar-body'); if (!el) return;
    var groups = NAV; // (rol: toate vizibile; itemii admin sunt acțiuni publice de planificare)
    el.innerHTML =
      '<div class="uxsb-uat">📍 ' + ((G.TCI && (G.TCI.cityName)) || (G._RO_CITIES_DB && G.TCI && G._RO_CITIES_DB[G.TCI.cityKey] && G._RO_CITIES_DB[G.TCI.cityKey].name) || 'UAT') + '</div>' +
      '<div class="uxsb-qa">' + QUICK.map(function (a) { return '<button class="uxsb-qabtn" onclick="UXSidebar.openModule(\'' + a.moduleId + '\')" title="' + a.label + '">' + a.ico + ' ' + a.label + '</button>'; }).join('') + '</div>' +
      groups.map(function (g) {
        var act = State.activeGroup === g.id;
        return '<div class="uxsb-group">' +
          '<button class="uxsb-ghead' + (act ? ' active' : '') + '" style="' + (act ? 'border-left-color:' + g.color : '') + '" onclick="UXSidebar.toggleGroup(\'' + g.id + '\')">' +
          '<span class="uxsb-gico">' + g.ico + '</span><span class="uxsb-glabel">' + g.label + '</span><span class="uxsb-gchev">' + (act ? '▲' : '▼') + '</span></button>' +
          (act ? '<div class="uxsb-items">' + g.items.map(function (i) {
            var ia = State.activeModule === i.moduleId;
            return '<button class="uxsb-item' + (ia ? ' active' : '') + '" style="' + (ia ? 'color:' + g.color : '') + '" onclick="UXSidebar.openModule(\'' + i.moduleId + '\')">' + i.label + '</button>';
          }).join('') + '</div>' : '') +
          '</div>';
      }).join('');
  }
  function toggleGroup(id) { State.activeGroup = State.activeGroup === id ? null : id; render(); }

  function ensureDOM() {
    if (D.getElementById('ux-sidebar')) return;
    var style = D.createElement('style');
    style.textContent = [
      /* cap.21 flow: NU sertar — dropdown ancorat in topbar (dreapta-sus, sub buton) */
      '#ux-sidebar{position:fixed;top:50px;right:8px;max-height:82vh;width:312px;max-width:94vw;z-index:9300;background:#0b1424;border:1px solid rgba(139,92,246,.4);border-radius:12px;box-shadow:0 12px 44px rgba(0,0,0,.75);display:none;flex-direction:column;font-family:system-ui,sans-serif;overflow:hidden;backdrop-filter:blur(14px)}',
      '#ux-sidebar.open{display:flex}',
      '#ux-sidebar-overlay{position:fixed;inset:0;background:transparent;z-index:9290;display:none}',
      '#ux-sidebar-overlay.open{display:block}',
      '.uxsb-head{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.08)}',
      '.uxsb-logo{font-weight:800;color:#d4af37;font-size:16px}',
      '.uxsb-x{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#cbd5e1;border-radius:7px;width:30px;height:30px;cursor:pointer;font-size:14px}',
      '#ux-sidebar-body{flex:1;overflow-y:auto;padding:8px}',
      '.uxsb-uat{font-size:11px;color:#94a3b8;padding:4px 8px 8px}',
      '.uxsb-qa{display:flex;flex-wrap:wrap;gap:5px;padding:0 4px 8px;border-bottom:1px solid rgba(255,255,255,.07);margin-bottom:6px}',
      '.uxsb-qabtn{flex:1;min-width:64px;background:rgba(212,175,55,.12);border:1px solid rgba(212,175,55,.3);color:#e9d08a;border-radius:7px;padding:7px 4px;font-size:10.5px;font-weight:700;cursor:pointer;white-space:nowrap}',
      '.uxsb-ghead{width:100%;display:flex;align-items:center;gap:9px;padding:10px 10px;background:transparent;border:none;border-left:3px solid transparent;cursor:pointer;color:#e6edf7;text-align:left;font-size:13px;border-radius:0 7px 7px 0;transition:background .1s}',
      '.uxsb-ghead:hover{background:rgba(255,255,255,.05)}',
      '.uxsb-ghead.active{background:rgba(255,255,255,.06);font-weight:700}',
      '.uxsb-gico{font-size:15px;width:20px;text-align:center}.uxsb-glabel{flex:1}.uxsb-gchev{font-size:9px;opacity:.5}',
      '.uxsb-items{padding:2px 0 6px}',
      '.uxsb-item{display:block;width:100%;padding:7px 10px 7px 39px;background:transparent;border:none;cursor:pointer;color:#cbd5e1;text-align:left;font-size:12px;opacity:.85;border-radius:6px}',
      '.uxsb-item:hover{opacity:1;background:rgba(255,255,255,.04)}.uxsb-item.active{opacity:1;font-weight:700}',
      '.uxsb-foot{padding:9px 16px;font-size:10px;color:#64748b;border-top:1px solid rgba(255,255,255,.08)}'
    ].join('');
    D.head.appendChild(style);
    var ov = D.createElement('div'); ov.id = 'ux-sidebar-overlay'; ov.onclick = close;
    var sb = D.createElement('div'); sb.id = 'ux-sidebar';
    sb.innerHTML = '<div class="uxsb-head"><span class="uxsb-logo">🏙 Planificare Urbană</span><button class="uxsb-x" onclick="UXSidebar.close()">✕</button></div>' +
      '<div id="ux-sidebar-body"></div>' +
      '<div class="uxsb-foot">🔍 Cmd/Ctrl+K = caută orice funcție</div>';
    D.body.appendChild(ov); D.body.appendChild(sb);
  }
  function open() { ensureDOM(); render(); D.getElementById('ux-sidebar-overlay').classList.add('open'); D.getElementById('ux-sidebar').classList.add('open'); }
  function close() { var s = D.getElementById('ux-sidebar'), o = D.getElementById('ux-sidebar-overlay'); if (s) s.classList.remove('open'); if (o) o.classList.remove('open'); }
  function toggle() { var s = D.getElementById('ux-sidebar'); (s && s.classList.contains('open')) ? close() : open(); }

  G.UXSidebar = { open: open, close: close, toggle: toggle, openModule: openModule, toggleGroup: toggleGroup, NAV: NAV };
  // expune și openModule global (pt onclick din alte locuri, conform 001)
  G.openModule = G.openModule || openModule;
  console.log('[UXSidebar] sertar navigare structurat încărcat (7 grupe) — window.UXSidebar');
})(window);
