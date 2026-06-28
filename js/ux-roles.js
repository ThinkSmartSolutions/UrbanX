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

  G.UXRoles = { ROLES: ROLES, current: current, currentId: currentId, canSee: canSee, setPreview: setPreview, filterRapoarte: filterRapoarte };
  console.log('[UXRoles] strat roluri/acces încărcat (implicit: acces complet) · window.UXRoles');
})(window);
