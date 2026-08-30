/* ============================================================================
 * UrbanX — capitol de sinteză „Module de decizie" în Masterplan + PMUD.
 * Reflectă în rapoartele strategice modulele care altfel nu apăreau: Patrimoniu
 * (Heritage), Sesizări, Autorizare (CAU), Oportunitate investițională (Investment).
 * Patch non-invaziv pe _StratMasterplanContent.build + _StratPMUDContent.build.
 * (Flux + Intelligence au deja capitole proprii — vezi flux-pdf-chapter / intelligence-chapter.)
 * ========================================================================== */
(function (G) {
  'use strict';
  function fmt(n) { try { return Math.round(n).toLocaleString('ro-RO'); } catch (e) { return String(n); } }

  function chapter(D, ctx) {
    if (!D || !D.chapter) return;
    var city = (ctx && ctx.city) || {};
    var cityName = city.name || '';
    // (SIDU = umbrela strategică — randat ca PRIMUL capitol, în wrapper-ul build, înainte de orig)

    D.chapter('Module de decizie UrbanX — sinteză');
    D.P('Acest capitol sintetizează informațiile relevante pentru ' + (cityName || 'UAT') + ' din modulele ' +
      'de decizie UrbanX (patrimoniu, sesizări cetățenești, autorizare/avize, oportunitate investițională). ' +
      'Datele provin din ceea ce este înregistrat în platformă; au caracter orientativ și se completează cu ' +
      'evidențele oficiale ale autorității.');

    // ── Patrimoniu construit (Heritage) ──
    try {
      if (G.Heritage && G.Heritage.registry) {
        var all = G.Heritage.registry.list();
        var inCity = cityName ? all.filter(function (h) { return (h.address || '').toLowerCase().indexOf(cityName.toLowerCase().split('-')[0].split(' ')[0]) >= 0; }) : [];
        var list = inCity.length ? inCity : all;
        D.h2('Patrimoniu construit (inventar GIS)');
        if (list.length) {
          var byA = list.filter(function (h) { return h.protection_level === 'A'; }).length;
          D.P((inCity.length ? 'În inventarul UAT-ului' : 'În inventarul platformei') + ': ' + list.length + ' obiective de patrimoniu (' + byA + ' monumente nivel A — protecție legală LMI). Orice intervenție în proximitatea lor declanșează avizul Direcției de Cultură (Legea 422/2001).');
          D.table(['Obiectiv', 'Nivel', 'Sursă'], list.slice(0, 12).map(function (h) { return [h.name, h.protection_level, h.data_source === 'lmi_oficial' ? 'LMI oficial' : 'inventar local']; }), null, { boldFirst: true });
        } else D.P('Niciun obiectiv de patrimoniu înregistrat încă pentru acest UAT în inventarul UrbanX. Recomandăm digitalizarea LMI local.');
      }
    } catch (e) {}

    // ── Sesizări urbane ──
    try {
      if (G.Sesizari && G.Sesizari.registry) {
        var st = G.Sesizari.registry.stats();
        D.h2('Sesizări urbane (participare cetățenească)');
        if (st.total) {
          D.kpis([
            { label: 'Total sesizări', val: fmt(st.total), sub: 'înregistrate' },
            { label: 'Deschise', val: fmt(st.open), sub: 'în lucru/analiză' },
            { label: 'Timp mediu', val: st.avg_resolution_days != null ? st.avg_resolution_days + ' z' : '—', sub: 'rezolvare' }
          ]);
          var cats = Object.keys(st.by_category || {});
          if (cats.length) D.P('Pe categorii: ' + cats.map(function (k) { var c = G.Sesizari.CATEGORIES[k] || {}; return (c.label || k) + ' (' + st.by_category[k] + ')'; }).join(', ') + '. Sesizările „construire ilegală" sunt verificate automat în registrul de autorizare (CAU).');
        } else D.P('Nicio sesizare înregistrată încă. Modulul de sesizări georeferențiate (tip FixMyStreet) este disponibil cetățenilor.');
      }
    } catch (e) {}

    // ── Autorizare (CAU) ──
    try {
      if (G.CAU && G.CAU.registry) {
        var cus = G.CAU.registry.list();
        D.h2('Autorizare — Comisia de Acorduri Unice (CAU)');
        if (cus.length) {
          var byStatus = {}; cus.forEach(function (c) { byStatus[c.status] = (byStatus[c.status] || 0) + 1; });
          D.P('În registrul CAU: ' + cus.length + ' dosare CU (' + Object.keys(byStatus).map(function (s) { return s.replace(/_/g, ' ') + ': ' + byStatus[s]; }).join(', ') + '). Fluxul: cererea solicitantului → primăria emite CU → obține avizele în numele lui → Acord Unic, cu aviz tacit favorabil la 30 zile (Legea 169/2026 (CATUC)).');
        } else D.P('Modulul CAU determină automat avizele necesare pentru orice Certificat de Urbanism (9 reguli: rețele, ISU, Cultură, Ape, Drumuri, CFR, Mediu, DSP, ANRE) și gestionează obținerea lor de către primărie în numele solicitantului.');
      }
    } catch (e) {}

    // ── Oportunitate investițională (Investment, dacă există analiză în sesiune) ──
    try {
      if (G.UXI && G.UXI._last && G.UXI._last.capacity) {
        D.h2('Notă investițională & capacitate');
        D.P('Bilanțul de capacitate al UAT-ului (vezi capitolul Capacitate & Conformitate) condiționează ' +
          'oportunitatea investițională: zonele cu infrastructură aproape de saturație au potențial limitat ' +
          'de aprobare. Scorul de oportunitate per parcelă (UrbanX Investment) integrează potențialul ' +
          'urbanistic, riscul (patrimoniu/sesizări) și barierele de intrare.');
      }
    } catch (e) {}

    D.callout('Surse & limite',
      'Datele provin din modulele UrbanX (cadastru, PUG, registre CAU/Sesizări/Patrimoniu). Au caracter ' +
      'orientativ și de pre-analiză; nu substituie evidențele oficiale (ANCPI/OCPI, LMI, registrul de ' +
      'autorizații al primăriei). Indicatorii calculați sunt instrumente de sprijin pentru decizie.', [212, 130, 20]);
  }

  function patch(name) {
    var obj = G[name];
    if (!obj || typeof obj.build !== 'function' || obj.__modPatched) return false;
    var orig = obj.build.bind(obj);
    obj.build = function (D, ctx) {
      // SIDU NU e un capitol aici — e document propriu (umbrela peste MP+PMUD). Doar o notă de subordonare.
      try { if (G.SIDU && G.SIDU.subordinationNote) G.SIDU.subordinationNote(D); } catch (e) { console.warn('[SIDU note]', e); }
      orig(D, ctx);
      try { chapter(D, ctx); } catch (e) { console.warn('[UX modules chapter]', e); }
    };
    obj.__modPatched = true; return true;
  }
  function tryPatch() { var a = patch('_StratMasterplanContent'), b = patch('_StratPMUDContent'); return a || b; }
  if (!tryPatch()) { var t = 0, iv = setInterval(function () { t++; if (tryPatch() || t > 40) clearInterval(iv); }, 250); }
  G._UXModulesChapter = chapter;
  console.log('[UX] capitol „Module de decizie" pregătit (Masterplan + PMUD)');
})(window);
