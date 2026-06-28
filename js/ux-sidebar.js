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
    portofoliu: call('generatePortfolio'),
    // module recente (cap.5/21: niciun coeficient/simulare neafisat)
    indici: function () { try { G.UrbanIndicesReport && G.UrbanIndicesReport.generate(); } catch (e) {} },
    riscSeismic: mod('RiskSeismic', 'openPanel'), riscFlood: mod('RiskFlood', 'openPanel'),
    riscAla: function () { try { G.RiskShelters && G.RiskShelters.toggle(); } catch (e) {} },
    retele: function () { try { G.CAU && G.CAU.showNetworksPanel(); } catch (e) {} },
    // ── functii teritoriale restaurate (cap.15/21: nimic omis din vechiul UrbanX Pro) ──
    monumente: mod('Heritage', 'openPanel'),
    dashboardUAT: function () { try { var k = (G.TCI && G.TCI.cityKey) || localStorage.getItem('ux_last_city') || 'RO-IS-01'; G._launchUATDashboard && G._launchUATDashboard(k); } catch (e) {} },
    ghsl: function () { try { var m = G.map || G._map, k = (G.TCI && G.TCI.cityKey) || 'RO-IS-01'; if (m && G._GHSLLayer) { G._GHSLLayer.init(m, k); G._GHSLLayer.toggle(m); } else G.ss && G.ss('GHSL se inițializează'); } catch (e) {} },
    coridoare: function () { try { var k = (G.TCI && G.TCI.cityKey) || 'RO-IS-01', m = G.map || G._map; if (m && G._CorridorsLayer && G._DataEngine) G._DataEngine.fetchCityData(k).then(function (ld) { var c = G._CorridorsLayer.generateCorridors(k, null, ld) || []; G._CorridorsLayer.showOnMap(m, k, c); }); } catch (e) {} },
    importPug: call('openPUGImport'),
    proiectie: call('generateProiectieUrbanistica'),
    aiMemoriu: function () { try { var k = (G.TCI && G.TCI.cityKey) || 'RO-IS-01'; G._AIUrbanNarrative && G._AIUrbanNarrative.open(k); } catch (e) {} },
    pptx: call('generatePPTX'),
    film: function () { try { G._switchToCinemaV2 && G._switchToCinemaV2(); setTimeout(function () { G._launchCinemaV2 && G._launchCinemaV2(); }, 100); } catch (e) {} },
    tciClasic: call('_switchToTCIClassic'),
    // ── module noi teritoriale (valori / climă / reconversie / economie) ──
    valoriMap: function () { try { G._ValueMap && G._ValueMap.show('apartament'); G._closeAllMenusAndOverlay && G._closeAllMenusAndOverlay(); } catch (e) {} },
    valoriPdf: function () { try { G._ValueMap && G._ValueMap.generatePDF(); } catch (e) {} },
    clima: function () { try { G._ClimateEngine && G._ClimateEngine.openPanel(); } catch (e) {} },
    hbu: function () { try { G._HBU && G._HBU.openPanel(G.TCI && G.TCI.cityKey); } catch (e) {} },
    hbuT: function () { try { G._HBU && G._HBU.generatePDF(G.TCI && G.TCI.cityKey, 'T'); } catch (e) {} },
    economie: function () { try { G._Economy && G._Economy.openPanel(G.TCI && G.TCI.cityKey); } catch (e) {} },
    spsTodo: function () { try { G.ss && G.ss('Modul Strategic Planning Suite — în dezvoltare. Disponibile acum: SIDU · Masterplan · PMUD · Climatică (SECAP) · Economică · HBU · RCAI Teritoriu.'); } catch (e) {} },
    rcaiT: function () { try { G._RCAI && G._RCAI.generatePDF(G.TCI && G.TCI.cityKey, 'T'); } catch (e) {} },
    dataFresh: function () { try { G._DataFreshness && G._DataFreshness.openPanel(); } catch (e) {} }
  };

  // ── NAV — PLANIFICARE URBANĂ: doar UAT / teritoriu / predicții (parcela+avizare = Flux de avizare) ──
  var NAV = [
    { id: 'teritoriu', label: 'Teritoriu & hărți', ico: '🗺', color: '#378ADD', items: [
      { label: 'Hartă (închide panourile)', moduleId: 'harta' },
      { label: 'Dashboard UAT Live (INSE·Eurostat·OSM·GHSL)', moduleId: 'dashboardUAT' },
      { label: 'GHSL — suprafață construită 1975-2055', moduleId: 'ghsl' },
      { label: 'Coridoare de dezvoltare spațială', moduleId: 'coridoare' },
      { label: 'Inventar patrimoniu & monumente (GIS)', moduleId: 'monumente' },
      { label: 'Import PUG digital (GeoJSON/KML)', moduleId: 'importPug' } ] },
    { id: 'analiza', label: 'Analiză teritorială', ico: '📊', color: '#534AB7', items: [
      { label: 'Capacitate & conformitate UAT', moduleId: 'intelligence' },
      { label: 'SimLab — 10 simulatoare', moduleId: 'simlab' },
      { label: 'Analytics — Walk/15-min/ROI/UHI/SDG/seismic', moduleId: 'analytics' },
      { label: 'Raport indici urbani (PDF, 12 indici)', moduleId: 'indici' },
      { label: 'Market — piața imobiliară (UAT)', moduleId: 'market' },
      { label: '💶 Hartă Valori Imobiliare (€/mp)', moduleId: 'valoriMap', info: 'valori' },
      { label: '📄 Studiu Valori Imobiliare (PDF)', moduleId: 'valoriPdf', info: 'valori_pdf' },
      { label: 'Carbon & emisii (UAT)', moduleId: 'carbon' },
      { label: 'Metodologie & surse de date', moduleId: 'metodologie' } ] },
    { id: 'mobilitate', label: 'Mobilitate', ico: '🚦', color: '#0EA5A5', items: [
      { label: 'Flux — studiu de trafic (calculator)', moduleId: 'mobility' } ] },
    { id: 'mediu', label: 'Mediu, climă & verde', ico: '🌿', color: '#639922', items: [
      { label: 'LOISIR — spații verzi & plămân urban', moduleId: 'loisir' },
      { label: 'UHI — insulă de căldură urbană', moduleId: 'uhi' },
      { label: 'Superbloc (model Barcelona)', moduleId: 'superbloc' } ] },
    { id: 'risc', label: 'Riscuri & Protecție civilă', ico: '⚠️', color: '#ef4444', items: [
      { label: 'Simulare cutremur (mag. 5-8, Vrancea)', moduleId: 'riscSeismic' },
      { label: 'Predicție inundație pluvială', moduleId: 'riscFlood' },
      { label: 'Inventar adăposturi ALA', moduleId: 'riscAla' },
      { label: 'Rețele edilitare pe hartă', moduleId: 'retele' } ] },
    { id: 'strategie', label: 'Strategic Planning Suite', ico: '🏛', color: '#888780', items: [
      { sep: '— TERITORIU —' },
      { label: 'SIDU — Strategia Integrată de Dezvoltare Urbană', moduleId: 'sidu-doc' },
      { label: 'Masterplan Urban', moduleId: 'masterplan' },
      { label: 'PMUD — Plan Mobilitate Urbană Durabilă', moduleId: 'pmud' },
      { label: 'SDL — Strategia de Dezvoltare Locală', moduleId: 'sps:sdl' },
      { label: 'Strategia Metropolitană', moduleId: 'sps:metropolitan' },
      { sep: '— SECTORIALE —' },
      { label: 'Smart City — ISO 37120 · Digital Twin', moduleId: 'sps:smart-city' },
      { label: '🌦 Climatică — SECAP · Adaptare', moduleId: 'clima', info: 'clima' },
      { label: '💰 Economică — Dezvoltare Economică Locală', moduleId: 'economie', info: 'economie' },
      { label: 'Locuire — Fond Locativ · Regenerare', moduleId: 'sps:housing' },
      { label: 'Turistică — Strategie Turistică', moduleId: 'sps:tourism' },
      { label: 'Culturală — Patrimoniu · Creative', moduleId: 'sps:cultural' },
      { label: 'Mediu — Biodiversitate · Spații Verzi', moduleId: 'sps:environment' },
      { label: 'Digitalizare — eGov · Infrastructură', moduleId: 'sps:digitalization' },
      { sep: '— STUDII SPECIALIZATE —' },
      { label: 'SFU — Fezabilitate Urbană', moduleId: 'sps:sfu' },
      { label: 'SCT — Capacitate Transport', moduleId: 'sps:sct' },
      { label: 'SIM — Impact Mobilitate', moduleId: 'sps:sim' },
      { label: 'SCSP — Calitate Spațiu Public', moduleId: 'sps:scsp' },
      { label: 'SRgU — Regenerare Urbană Rezidențială', moduleId: 'sps:srgu' },
      { label: 'Atlas Urban — Monografie', moduleId: 'sps:atlas' },
      { label: 'SRM — Risc Multihazard', moduleId: 'sps:srm' },
      { label: 'SDA — Demografie Aprofundată', moduleId: 'sps:sda' },
      { label: 'SCpT — Competitivitate Teritorială', moduleId: 'sps:scpt' },
      { label: 'SIVA — Infrastructură Verde și Albastră', moduleId: 'sps:siva' },
      { label: 'SEU — Energie Urbană', moduleId: 'sps:seu' },
      { label: 'SPPC — Patrimoniu Construit · Peisaj', moduleId: 'sps:sppc' },
      { sep: '— INVESTIȚIONAL —' },
      { label: '🏗 HBU Teritoriu — Reconversie (UAT)', moduleId: 'hbuT', info: 'hbu_teritoriu' },
      { label: '🏺 RCAI Teritoriu — Cercetare Arheologică', moduleId: 'rcaiT', info: 'rcai_teritoriu' },
      { sep: '— INSTRUMENTE & PREDICȚII —' },
      { label: 'SIDU — registru & coerență → PUG', moduleId: 'sidu' },
      { label: 'Portofoliu strategic 2025-2055', moduleId: 'portofoliu' },
      { label: 'Proiecție urbanistică 10/20/30 ani', moduleId: 'proiectie' },
      { label: 'AI Memoriu justificativ', moduleId: 'aiMemoriu' },
      { label: '🗓 Prospețimea datelor (surse la zi)', moduleId: 'dataFresh' } ] },
    { id: 'cetateni', label: 'Cetățeni & consultare', ico: '👥', color: '#1D9E75', items: [
      { label: 'Sesizare urbană', moduleId: 'sesizari' },
      { label: 'Hartă sesizări (pe/off)', moduleId: 'sesizari-map' },
      { label: 'Participare publică (model Helsinki)', moduleId: 'participare' } ] },
    { id: 'prezentare', label: 'Prezentare', ico: '🎬', color: '#8b5cf6', items: [
      { label: 'Film cinematic (25 scene)', moduleId: 'film' },
      { label: 'TCI Clasic (panou interactiv)', moduleId: 'tciClasic' } ] }
  ];
  var QUICK = [
    { label: 'Caută', ico: '🔍', moduleId: '_search' },
    { label: 'Dashboard', ico: '📊', moduleId: 'dashboardUAT' },
    { label: 'SimLab', ico: '🧪', moduleId: 'simlab' },
    { label: 'SIDU', ico: '📜', moduleId: 'sidu-doc' }
  ];

  var State = { activeGroup: null, activeModule: null };

  function openModule(id) {
    State.activeModule = id;
    var g = NAV.find(function (x) { return x.items.some(function (i) { return i.moduleId === id; }); });
    if (g) State.activeGroup = g.id;
    if (id === '_search') { var t = D.querySelector('.ptab[data-t="search"]'); if (t) t.click(); close(); return; }
    var fn = MODULE_OPEN[id];
    // studii SPS generice din meniul TERITORIU → mod 'T' (TERITORIAL, mereu).
    // Versiunea pe parcelă e DOAR în Rapoarte (mod 'P'), ca să nu se dubleze (teritoriu≠parcelă).
    if (!fn && id && id.indexOf('sps:') === 0) { var sid = id.slice(4); fn = function () { try { G._SPS && G._SPS.generate(sid, G.TCI && G.TCI.cityKey, 'T'); } catch (e) {} }; }
    close(); // închide sertarul, apoi deschide modulul
    setTimeout(function () { if (fn) fn(); else G.ss && G.ss(id + ' — nedisponibil'); }, 20);
  }

  function isAdmin() { try { return !!(G._USER && (G._USER.role === 'admin' || G._USER.role === 'primar' || G._USER.isAdmin)); } catch (e) { return true; } }

  function render() {
    var el = D.getElementById('ux-sidebar-body'); if (!el) return;
    // 001 Faza 3: filtrare pe rol (NON-destructivă — implicit rol FULL → totul vizibil).
    var _cs = (G.UXRoles && G.UXRoles.canSee) ? G.UXRoles.canSee : function () { return true; };
    var groups = NAV.map(function (g) {
      var items = g.items.filter(function (i) { return i.sep ? true : _cs(i.moduleId); });
      // scoate separatoarele orfane (fără niciun item real după ele)
      var clean = [];
      for (var k = 0; k < items.length; k++) {
        if (items[k].sep) { var nxt = items[k + 1]; if (!nxt || nxt.sep) continue; }
        clean.push(items[k]);
      }
      return { id: g.id, label: g.label, ico: g.ico, color: g.color, items: clean };
    }).filter(function (g) { return g.items.some(function (i) { return !i.sep; }); });
    var quick = QUICK.filter(function (a) { return a.moduleId === '_search' || _cs(a.moduleId); });
    el.innerHTML =
      '<div class="uxsb-uat">📍 ' + ((G.TCI && (G.TCI.cityName)) || (G._RO_CITIES_DB && G.TCI && G._RO_CITIES_DB[G.TCI.cityKey] && G._RO_CITIES_DB[G.TCI.cityKey].name) || 'UAT') + '</div>' +
      '<div class="uxsb-qa">' + quick.map(function (a) { return '<button class="uxsb-qabtn" onclick="UXSidebar.openModule(\'' + a.moduleId + '\')" title="' + a.label + '"><span class="uxsb-qaico">' + a.ico + '</span><span class="uxsb-qalbl">' + a.label + '</span></button>'; }).join('') + '</div>' +
      groups.map(function (g) {
        var act = State.activeGroup === g.id;
        return '<div class="uxsb-group">' +
          '<button class="uxsb-ghead' + (act ? ' active' : '') + '" style="' + (act ? 'border-left-color:' + g.color : '') + '" onclick="UXSidebar.toggleGroup(\'' + g.id + '\')">' +
          '<span class="uxsb-gico">' + g.ico + '</span><span class="uxsb-glabel">' + g.label + '</span><span class="uxsb-gchev">' + (act ? '▲' : '▼') + '</span></button>' +
          (act ? '<div class="uxsb-items">' + g.items.map(function (i) {
            if (i.sep) return '<div style="font-size:9px;color:#64748b;text-transform:uppercase;letter-spacing:.06em;font-weight:700;padding:8px 6px 3px;border-top:1px solid rgba(255,255,255,.08);margin-top:5px">' + i.sep + '</div>';
            var ia = State.activeModule === i.moduleId;
            // info-drawer: explicit (i.info) · automat pentru SPS (sps:<id>) · automat pentru
            // ORICE modul cu intrare RAPORT_INFO (direct sau prin alias) — fiecare studiu/raport
            // primește ⓘ fără a fi marcat manual (cerut de Florin).
            var mid = i.moduleId;
            var infoKey = i.info
              || ((mid && mid.indexOf('sps:') === 0) ? mid : null)
              || (mid && G._MOD_INFO_ALIAS && G._MOD_INFO_ALIAS[mid])
              || ((mid && G.RAPORT_INFO && G.RAPORT_INFO[mid]) ? mid : null);
            var main = '<button class="uxsb-item' + (ia ? ' active' : '') + '" style="' + (ia ? 'color:' + g.color : '') + (infoKey ? ';flex:1' : '') + '" onclick="UXSidebar.openModule(\'' + i.moduleId + '\')">' + i.label + '</button>';
            if (!infoKey) return main;
            return '<div style="display:flex;align-items:stretch;gap:3px">' + main +
              '<button title="Info" onclick="event.stopPropagation();UXSidebar.close&&UXSidebar.close();infoDrawerOpen(\'' + infoKey + '\')" style="flex-shrink:0;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);color:#94a3b8;border-radius:5px;padding:0 9px;cursor:pointer;font-size:12px">ⓘ</button></div>';
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
      '.uxsb-qa{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:0 4px 8px;border-bottom:1px solid rgba(255,255,255,.07);margin-bottom:6px}',
      '.uxsb-qabtn{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;min-height:50px;background:rgba(212,175,55,.12);border:1px solid rgba(212,175,55,.3);color:#e9d08a;border-radius:8px;padding:7px 3px;cursor:pointer;overflow:hidden}',
      '.uxsb-qabtn:hover{background:rgba(212,175,55,.2)}',
      '.uxsb-qaico{font-size:15px;line-height:1}',
      '.uxsb-qalbl{font-size:10px;font-weight:700;line-height:1.1;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}',
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
    sb.innerHTML = '<div class="uxsb-head"><span class="uxsb-logo">🏙 Teritoriu</span><button class="uxsb-x" onclick="UXSidebar.close()">✕</button></div>' +
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
