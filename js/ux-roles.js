/* ============================================================================
 * UrbanX — 001 Faza 2/3: Roluri & grade de acces (window.UXRoles).
 * STRAT NON-DESTRUCTIV peste UXSidebar + _USER (Supabase). Refoloseste moduleId-urile
 * REALE din MODULE_OPEN (NU accessId-uri abstracte). Principiu de aur:
 *   dacă NU e asignat un rol restrictiv → canSee() = true pentru tot (comportament IDENTIC cu azi).
 * Doar un rol restrictiv explicit (din _USER.role sau preview dev) declanseaza filtrarea.
 * Securitatea reala = RLS Supabase + validare token pe proxy; filtrul de aici e DOAR UX.
 * ========================================================================== */
(function (G) {
  'use strict';

  // access: '*' = tot | listă de moduleId (acceptă wildcard prefix, ex. 'sps:*')
  var ROLES = {
    FULL:          { label: 'Acces complet', level: 9, access: '*' },          // implicit (backward-compat)
    SUPER_ADMIN:   { label: 'Super Administrator', level: 5, access: '*' },
    ADMIN_UAT:     { label: 'Administrator UAT', level: 4, access: [
      'harta','dashboardUAT','ghsl','coridoare','monumente','intelligence','analytics','indici','market',
      'valoriMap','valoriPdf','carbon','metodologie','sidu-doc','masterplan','pmud','portofoliu','proiectie',
      'aiMemoriu','dataFresh','sps:*','clima','economie','hbuT','rcaiT','sesizari','sesizari-map','participare',
      'film','tciClasic','riscSeismic','riscFlood','riscAla','retele','importPug','studymap'] },
    BIROU_ARHITECTURA: { label: 'Birou Arhitectură / Urbanism', level: 3, access: '*' }, // profesional — toate
    CTATU:         { label: 'CTATU / Specialist', level: 2, access: [
      'harta','dashboardUAT','ghsl','coridoare','monumente','intelligence','simlab','analytics','indici','market',
      'valoriMap','valoriPdf','carbon','metodologie','mobility','loisir','uhi','superbloc','riscSeismic','riscFlood',
      'riscAla','retele','sidu-doc','masterplan','pmud','sps:*','clima','economie','hbuT','rcaiT','proiectie','dataFresh',
      'studymap','rap:*'] },
    CETATEAN:      { label: 'Cetățean', level: 1, access: [
      'harta','dashboardUAT','monumente','indici','valoriMap','loisir','uhi','riscSeismic','riscFlood','riscAla',
      'sesizari','sesizari-map','participare','film','tciClasic','studymap'] },
    PUBLIC:        { label: 'Vizitator', level: 0, access: [
      'harta','dashboardUAT','monumente','indici','participare','film','tciClasic'] }
  };

  var PREVIEW_KEY = 'ux_role_preview';   // doar pt demonstrație (dev) — NU afectează utilizatorii reali

  // rolul curent: preview dev (dacă setat) → _USER.role → admin flag → FULL (implicit, vede tot)
  function currentId() {
    try {
      var p = localStorage.getItem(PREVIEW_KEY);
      if (p && ROLES[p]) return p;
      var u = G._USER || {};
      if (u.role) { var r = String(u.role).toUpperCase().replace(/[-\s]/g, '_'); if (ROLES[r]) return r; }
      if (u.role === 'admin' || u.role === 'primar' || u.isAdmin) return 'SUPER_ADMIN';
    } catch (e) {}
    return 'FULL';
  }
  function current() { return ROLES[currentId()] || ROLES.FULL; }

  function canSee(moduleId) {
    if (!moduleId) return true;
    var role = current();
    if (!role || role.access === '*') return true;          // implicit: tot vizibil
    var list = role.access || [];
    for (var i = 0; i < list.length; i++) {
      var a = list[i];
      if (a === moduleId) return true;
      if (a.charAt(a.length - 1) === '*' && moduleId.indexOf(a.slice(0, -1)) === 0) return true; // 'sps:*'
    }
    return false;
  }

  // ── Meniul RAPOARTE (studii de parcelă, HTML static) — mapare onclick→moduleId ──
  // Filtrare pură JS (NU edităm HTML-ul): citim onclick-ul fiecărui rând, mapăm la
  // moduleId prin cea mai TIMPURIE potrivire de substring, ascundem rândul + antetul gol.
  var RAP_MOD = {
    'openStudyMap': 'studymap', 'IndicatorsRegistry': 'indici',
    'generateStudiuAmplasament': 'rap:amplasament', 'runExport': 'rap:raport_complet',
    'generateSolarStudy': 'rap:insorire', 'generateShadowStudy': 'rap:umbre', 'generateSSF': 'rap:isu',
    'generateGeotehnicalStudy': 'rap:geotehnic', 'generateAACR': 'rap:aacr', 'generateStudiuPMR': 'rap:pmr',
    'generateStudiuIluminat': 'rap:iluminat', 'generateStabilitateTaluzuri': 'rap:taluzuri',
    'generateEnvironmentalImpact': 'rap:eim', 'generateWaterStudy': 'rap:apa', 'generateGreenStudy': 'rap:verde',
    'generateNoiseStudy': 'rap:acustic', 'generateWindStudy': 'rap:vant', 'generateStudiuApePluviale': 'rap:apepluv',
    'generatePrestudiuBransamente': 'rap:bransamente', 'generateCarbonStudy': 'rap:carbon',
    'generateTrafficStudy': 'rap:trafic', 'generateMobilityStudy': 'rap:mobilitate', 'generateDensityStudy': 'rap:densitate',
    'generateIstoricStudy': 'rap:patrimoniu', 'generateExistingBldStudy': 'rap:existente', '_RCAI': 'rap:rcai',
    'generateStudiuFezabilitate': 'rap:fezabilitate', '_HBU': 'rap:hbu', 'generateREPA': 'rap:repa',
    'generateCPE': 'rap:cpe', 'openTCI': 'proiectie', 'generateProiectieUrbanistica': 'proiectie',
    'generateHealthImpactStudy': 'rap:sanatate', 'generateSeismicStudy': 'rap:seismic',
    'generateStudiuRestrictii': 'rap:restrictii'
  };
  function _ocToMod(oc) { var best = null, bi = Infinity; for (var k in RAP_MOD) { var idx = oc.indexOf(k); if (idx >= 0 && idx < bi) { bi = idx; best = RAP_MOD[k]; } } return best; }
  function _isHeader(el) { return el.tagName === 'DIV' && /text-transform:\s*uppercase/.test(el.getAttribute('style') || '') && !el.querySelector('button'); }
  function _disp0(el) { if (!el.hasAttribute('data-disp0')) el.setAttribute('data-disp0', el.style.display || ''); return el.getAttribute('data-disp0'); }
  function filterRapoarte(menu) {
    try {
      menu = menu || G.document.getElementById('rapoarte-menu'); if (!menu) return;
      var kids = Array.prototype.slice.call(menu.children);
      var lastHeader = null, headerHasVisible = false;
      kids.forEach(function (el) {
        if (_isHeader(el)) { if (lastHeader) lastHeader.style.display = headerHasVisible ? _disp0(lastHeader) : 'none'; lastHeader = el; headerHasVisible = false; return; }
        var btn = el.tagName === 'BUTTON' ? el : el.querySelector('button'); if (!btn) return;
        var mid = _ocToMod(btn.getAttribute('onclick') || '');
        var ok = mid ? canSee(mid) : true;     // moduleId necunoscut → vizibil (safe)
        el.style.display = ok ? _disp0(el) : 'none';
        if (ok) headerHasVisible = true;
      });
      if (lastHeader) lastHeader.style.display = headerHasVisible ? _disp0(lastHeader) : 'none';
    } catch (e) { console.warn('[UXRoles] filterRapoarte', e); }
  }

  // pt dev/demo: schimbă rolul previzualizat și re-randează sertarul
  function setPreview(roleId) {
    try {
      if (!roleId || roleId === 'FULL') localStorage.removeItem(PREVIEW_KEY);
      else if (ROLES[roleId]) localStorage.setItem(PREVIEW_KEY, roleId);
      if (G.UXSidebar && G.UXSidebar.render) G.UXSidebar.render();
      var rm = G.document.getElementById('rapoarte-menu'); if (rm && rm.style.display === 'block') filterRapoarte(rm);
      G.ss && G.ss('Rol previzualizat: ' + (current().label));
    } catch (e) {}
  }

  // ════════════════════════════════════════════════════════════════════════
  // DASHBOARD ROLURI & ACCES (admin) — definiții editabile în Supabase + asignare per user
  // ════════════════════════════════════════════════════════════════════════
  function _sb() { return G._supabase || null; }
  var _defsLoaded = false;

  // catalog de module (token-uri de acces) grupate — pt checkbox-urile din editor
  function catalog() {
    var groups = [];
    try {
      var NAV = (G.UXSidebar && G.UXSidebar.NAV) || [];
      NAV.forEach(function (g) {
        var items = (g.items || []).filter(function (i) { return i.moduleId; })
          .map(function (i) { return { id: i.moduleId, label: (i.label || i.moduleId) }; });
        if (items.length) groups.push({ label: g.label, items: items });
      });
    } catch (e) {}
    var seen = {}, rap = [];
    for (var k in RAP_MOD) { var id = RAP_MOD[k]; if (!seen[id]) { seen[id] = 1; rap.push({ id: id, label: id }); } }
    groups.push({ label: 'Rapoarte (parcelă)', items: rap });
    return groups;
  }

  // încarcă definițiile de rol din Supabase (peste cele implicite). Async, non-blocant.
  function loadDefs(cb) {
    var sb = _sb(); if (!sb) { cb && cb(); return; }
    try {
      sb.from('role_definitions').select('role_id,label,level,access').then(function (res) {
        if (res && res.data) res.data.forEach(function (r) {
          ROLES[r.role_id] = { label: r.label || r.role_id, level: r.level == null ? 1 : r.level, access: r.access || [], _custom: true };
        });
        _defsLoaded = true;
        try { if (G.UXSidebar && G.UXSidebar.render && document.getElementById('ux-sidebar-body')) G.UXSidebar.render(); } catch (e) {}
        cb && cb();
      }).catch(function () { cb && cb(); });
    } catch (e) { cb && cb(); }
  }
  function saveRole(id, label, level, access) {
    ROLES[id] = { label: label, level: level || 1, access: access, _custom: true };   // optimist local
    var sb = _sb(); if (!sb) return Promise.resolve();
    return sb.from('role_definitions').upsert({ role_id: id, label: label, level: level || 1, access: access, updated_at: new Date().toISOString() }, { onConflict: 'role_id' });
  }
  function deleteRole(id) { delete ROLES[id]; var sb = _sb(); if (sb) try { sb.from('role_definitions').delete().eq('role_id', id); } catch (e) {} }
  function listAssignments(cb) { var sb = _sb(); if (!sb) { cb([]); return; } try { sb.from('user_roles').select('email,role,uat_siruta').then(function (r) { cb((r && r.data) || []); }).catch(function () { cb([]); }); } catch (e) { cb([]); } }
  function assignRole(email, role, uat) { var sb = _sb(); if (!sb) return Promise.resolve(); return sb.from('user_roles').upsert({ email: email, role: role, uat_siruta: uat || null, updated_at: new Date().toISOString() }, { onConflict: 'email' }); }
  function removeAssignment(email) { var sb = _sb(); if (sb) try { sb.from('user_roles').delete().eq('email', email); } catch (e) {} }

  // ── UI ────────────────────────────────────────────────────────────────────
  var _mgr = { tab: 'roles', edit: null };
  function _esc(s) { return ('' + (s == null ? '' : s)).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
  function _accessSummary(a) { return a === '*' ? 'ACCES COMPLET' : (Array.isArray(a) ? a.length + ' module' : '—'); }
  function openManager() {
    var ov = document.getElementById('uxrm-ov');
    if (!ov) { ov = document.createElement('div'); ov.id = 'uxrm-ov'; ov.style.cssText = 'position:fixed;inset:0;background:rgba(2,6,16,.82);z-index:10060;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)'; document.body.appendChild(ov); }
    loadDefs(_renderMgr); _renderMgr();
  }
  function _closeMgr() { var o = document.getElementById('uxrm-ov'); if (o) o.remove(); _mgr.edit = null; }
  function _renderMgr() {
    var ov = document.getElementById('uxrm-ov'); if (!ov) return;
    var tb = function (id, l) { return '<button onclick="UXRoles._tab(\'' + id + '\')" style="background:' + (_mgr.tab === id ? 'rgba(124,58,237,.25)' : 'transparent') + ';color:' + (_mgr.tab === id ? '#c4b5fd' : '#94a3b8') + ';border:1px solid ' + (_mgr.tab === id ? 'rgba(124,58,237,.5)' : 'rgba(255,255,255,.12)') + ';border-radius:8px;padding:7px 14px;cursor:pointer;font-weight:700;font-size:12px;margin-right:6px">' + l + '</button>'; };
    var body = _mgr.tab === 'users' ? _usersHTML() : (_mgr.edit != null ? _editHTML() : _rolesHTML());
    ov.innerHTML = '<div style="background:#0c1424;border:1px solid rgba(124,58,237,.3);border-radius:14px;width:min(820px,94vw);max-height:90vh;overflow-y:auto;padding:18px;box-shadow:0 20px 60px rgba(0,0,0,.6)">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">' +
      '<div style="font-size:16px;font-weight:800;color:#e6edf7">🔐 Roluri & Acces</div>' +
      '<button onclick="UXRoles._close()" style="background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:6px 11px;cursor:pointer">✕</button></div>' +
      '<div style="margin-bottom:14px">' + tb('roles', '🎭 Roluri') + tb('users', '👥 Utilizatori') + '</div>' +
      body + '</div>';
  }
  function _rolesHTML() {
    var rows = Object.keys(ROLES).map(function (id) {
      var r = ROLES[id];
      return '<div style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-bottom:1px solid rgba(255,255,255,.06)">' +
        '<div style="flex:1"><b style="color:#e6edf7">' + _esc(r.label) + '</b> <span style="color:#64748b;font-size:11px">· ' + id + ' · ' + _accessSummary(r.access) + '</span></div>' +
        '<button onclick="UXRoles._editRole(\'' + id + '\')" style="background:rgba(56,138,221,.2);color:#9dc3ff;border:1px solid rgba(56,138,221,.3);border-radius:6px;padding:4px 10px;cursor:pointer;font-size:11px">Editează</button>' +
        (r._custom ? '<button onclick="UXRoles._delRole(\'' + id + '\')" style="background:rgba(239,68,68,.15);color:#fca5a5;border:1px solid rgba(239,68,68,.3);border-radius:6px;padding:4px 8px;cursor:pointer;font-size:11px">Șterge</button>' : '') +
        '</div>';
    }).join('');
    return rows + '<div style="margin-top:14px;display:flex;gap:8px;align-items:center">' +
      '<input id="uxrm-newid" placeholder="ID rol (ex. EVALUATOR)" style="background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:7px;padding:7px;font-size:12px;width:170px">' +
      '<input id="uxrm-newlabel" placeholder="Nume afișat" style="flex:1;background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:7px;padding:7px;font-size:12px">' +
      '<button onclick="UXRoles._newRole()" style="background:linear-gradient(180deg,#10b981,#059669);color:#fff;border:0;border-radius:7px;padding:7px 14px;font-weight:700;cursor:pointer">+ Rol nou</button></div>';
  }
  function _editHTML() {
    var id = _mgr.edit, r = ROLES[id] || { label: id, access: [] };
    var full = r.access === '*';
    var acc = Array.isArray(r.access) ? r.access : [];
    var cat = catalog().map(function (g) {
      return '<div style="margin-top:8px"><div style="font-size:10px;color:#a78bfa;text-transform:uppercase;font-weight:700;margin-bottom:3px">' + _esc(g.label) + '</div>' +
        g.items.map(function (it) {
          var on = full || acc.indexOf(it.id) >= 0 || acc.some(function (a) { return a.charAt(a.length - 1) === '*' && it.id.indexOf(a.slice(0, -1)) === 0; });
          return '<label style="display:inline-flex;align-items:center;gap:4px;margin:2px 8px 2px 0;font-size:11px;color:#cbd5e1"><input type="checkbox" class="uxrm-mod" value="' + it.id + '"' + (on ? ' checked' : '') + (full ? ' disabled' : '') + '> ' + _esc(it.label).slice(0, 34) + '</label>';
        }).join('') + '</div>';
    }).join('');
    return '<div style="font-weight:700;color:#e6edf7;margin-bottom:6px">Editezi: ' + _esc(r.label) + ' <span style="color:#64748b;font-size:11px">(' + id + ')</span></div>' +
      '<label style="display:flex;align-items:center;gap:6px;color:#fbbf24;font-size:12px;font-weight:700;margin-bottom:6px"><input type="checkbox" id="uxrm-full"' + (full ? ' checked' : '') + ' onchange="UXRoles._toggleFull()"> Acces complet (toate modulele)</label>' +
      '<div id="uxrm-cat" style="max-height:42vh;overflow-y:auto;border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:8px;' + (full ? 'opacity:.45;pointer-events:none' : '') + '">' + cat + '</div>' +
      '<div style="margin-top:12px;display:flex;gap:8px"><button onclick="UXRoles._saveEdit()" style="background:linear-gradient(180deg,#10b981,#059669);color:#fff;border:0;border-radius:7px;padding:8px 16px;font-weight:700;cursor:pointer">💾 Salvează</button>' +
      '<button onclick="UXRoles._tab(\'roles\')" style="background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:7px;padding:8px 14px;cursor:pointer">Înapoi</button></div>';
  }
  function _usersHTML() {
    var roleOpts = Object.keys(ROLES).map(function (id) { return '<option value="' + id + '">' + _esc(ROLES[id].label) + '</option>'; }).join('');
    var html = '<div style="display:flex;gap:6px;align-items:center;margin-bottom:10px;flex-wrap:wrap">' +
      '<input id="uxrm-email" placeholder="email utilizator" style="flex:1;min-width:160px;background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:7px;padding:7px;font-size:12px">' +
      '<select id="uxrm-role" style="background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:7px;padding:7px;font-size:12px">' + roleOpts + '</select>' +
      '<input id="uxrm-uat" placeholder="SIRUTA (opț.)" style="width:110px;background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:7px;padding:7px;font-size:12px">' +
      '<button onclick="UXRoles._assign()" style="background:linear-gradient(180deg,#10b981,#059669);color:#fff;border:0;border-radius:7px;padding:7px 14px;font-weight:700;cursor:pointer">Asignează</button></div>' +
      '<div id="uxrm-ulist" style="font-size:12px;color:#94a3b8">Se încarcă…</div>';
    setTimeout(function () {
      listAssignments(function (rows) {
        var el = document.getElementById('uxrm-ulist'); if (!el) return;
        el.innerHTML = rows.length ? rows.map(function (u) {
          return '<div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-bottom:1px solid rgba(255,255,255,.06)"><span style="flex:1;color:#e6edf7">' + _esc(u.email) + '</span><span style="color:#c4b5fd">' + _esc(u.role) + (u.uat_siruta ? ' · ' + _esc(u.uat_siruta) : '') + '</span><button onclick="UXRoles._unassign(\'' + _esc(u.email) + '\')" style="background:rgba(239,68,68,.15);color:#fca5a5;border:1px solid rgba(239,68,68,.3);border-radius:5px;padding:2px 8px;cursor:pointer;font-size:11px">✕</button></div>';
        }).join('') : '<div style="color:#64748b;padding:8px">Niciun utilizator asignat încă (sau tabelul user_roles nu e creat).</div>';
      });
    }, 30);
    return html;
  }

  G.UXRoles = {
    ROLES: ROLES, current: current, currentId: currentId, canSee: canSee, setPreview: setPreview, filterRapoarte: filterRapoarte,
    catalog: catalog, loadDefs: loadDefs, saveRole: saveRole, deleteRole: deleteRole,
    listAssignments: listAssignments, assignRole: assignRole, removeAssignment: removeAssignment, openManager: openManager,
    _tab: function (t) { _mgr.tab = t; _mgr.edit = null; _renderMgr(); },
    _close: _closeMgr,
    _editRole: function (id) { _mgr.edit = id; _renderMgr(); },
    _delRole: function (id) { if (G.confirm && !confirm('Ștergi rolul ' + id + '?')) return; deleteRole(id); _renderMgr(); },
    _newRole: function () { var i = document.getElementById('uxrm-newid'), l = document.getElementById('uxrm-newlabel'); var id = (i.value || '').trim().toUpperCase().replace(/[^A-Z0-9_]/g, '_'); if (!id) return; ROLES[id] = { label: (l.value || id).trim(), level: 1, access: [], _custom: true }; _mgr.edit = id; _renderMgr(); },
    _toggleFull: function () { var f = document.getElementById('uxrm-full').checked; var c = document.getElementById('uxrm-cat'); if (c) { c.style.opacity = f ? '.45' : '1'; c.style.pointerEvents = f ? 'none' : 'auto'; c.querySelectorAll('.uxrm-mod').forEach(function (x) { x.disabled = f; }); } },
    _saveEdit: function () {
      var id = _mgr.edit; if (!id) return;
      var full = document.getElementById('uxrm-full').checked;
      var access = full ? '*' : [].map.call(document.querySelectorAll('.uxrm-mod:checked'), function (x) { return x.value; });
      saveRole(id, ROLES[id].label, ROLES[id].level || 1, access);
      try { if (G.UXSidebar && G.UXSidebar.render) G.UXSidebar.render(); } catch (e) {}
      G.ss && G.ss('✅ Rol salvat: ' + id); _mgr.tab = 'roles'; _mgr.edit = null; _renderMgr();
    },
    _assign: function () {
      var e = (document.getElementById('uxrm-email').value || '').trim(), r = document.getElementById('uxrm-role').value, u = (document.getElementById('uxrm-uat').value || '').trim();
      if (!e) return; var p = assignRole(e, r, u); G.ss && G.ss('✅ ' + e + ' → ' + r);
      if (p && p.then) p.then(function () { _renderMgr(); }); else _renderMgr();
    },
    _unassign: function (e) { removeAssignment(e); _renderMgr(); }
  };
  // încarcă definițiile custom la pornire (dacă Supabase + tabel există)
  try { if (G.document) (document.readyState !== 'loading' ? setTimeout(loadDefs, 400) : document.addEventListener('DOMContentLoaded', function () { setTimeout(loadDefs, 400); })); } catch (e) {}
  console.log('[UXRoles] strat roluri/acces + manager încărcat · window.UXRoles');
})(window);
