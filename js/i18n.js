/* ============================================================================
 * UrbanX — 001 i18n (window.UrbanXI18n + window.T). Multilingv RO/EN/FR/DE.
 * Arhitectură cu FALLBACK la sursa RO: t(src) → traducere dacă există, altfel
 * textul RO original (deci acoperirea parțială NU strică nimic — string-urile
 * netraduse rămân RO, nu „cheie lipsă"). Cheia = chiar string-ul RO sursă, ca
 * să nu rescriem structurile existente (NAV/RAPORT_INFO). Limba în `urbanx_lang`.
 * Faza 1a: chrome structural (grupuri sertar + acțiuni rapide + termeni comuni).
 * Restul string-urilor se adaugă incremental în DICT (sau prin pipeline MT).
 * ========================================================================== */
(function (G) {
  'use strict';
  var LANGS = ['ro', 'en', 'fr', 'de'];
  var KEY = 'urbanx_lang';

  // DICT[lang][stringRO] = traducere. Lipsă → fallback la stringRO (RO rămâne RO).
  var DICT = {
    en: {
      'Teritoriu & hărți': 'Territory & maps', 'Analiză teritorială': 'Territorial analysis',
      'Mobilitate': 'Mobility', 'Mediu, climă & verde': 'Environment, climate & green',
      'Riscuri & Protecție civilă': 'Risks & Civil protection', 'Cetățeni & consultare': 'Citizens & consultation',
      'Prezentare': 'Presentation', 'Caută': 'Search', 'Dashboard': 'Dashboard',
      'Rapoarte': 'Reports', 'Generează': 'Generate', 'Închide': 'Close', 'Rol': 'Role',
      'Acces complet': 'Full access', 'Super Administrator': 'Super Administrator', 'Administrator UAT': 'UAT Administrator',
      'Birou Arhitectură / Urbanism': 'Architecture / Planning Studio', 'CTATU / Specialist': 'CTATU / Specialist',
      'Cetățean': 'Citizen', 'Vizitator': 'Visitor'
    },
    fr: {
      'Teritoriu & hărți': 'Territoire & cartes', 'Analiză teritorială': 'Analyse territoriale',
      'Mobilitate': 'Mobilité', 'Mediu, climă & verde': 'Environnement, climat & vert',
      'Riscuri & Protecție civilă': 'Risques & Protection civile', 'Cetățeni & consultare': 'Citoyens & consultation',
      'Prezentare': 'Présentation', 'Caută': 'Rechercher', 'Dashboard': 'Tableau de bord',
      'Rapoarte': 'Rapports', 'Generează': 'Générer', 'Închide': 'Fermer', 'Rol': 'Rôle',
      'Acces complet': 'Accès complet', 'Super Administrator': 'Super Administrateur', 'Administrator UAT': 'Administrateur UAT',
      'Birou Arhitectură / Urbanism': 'Cabinet Architecture / Urbanisme', 'CTATU / Specialist': 'CTATU / Spécialiste',
      'Cetățean': 'Citoyen', 'Vizitator': 'Visiteur'
    },
    de: {
      'Teritoriu & hărți': 'Gebiet & Karten', 'Analiză teritorială': 'Territoriale Analyse',
      'Mobilitate': 'Mobilität', 'Mediu, climă & verde': 'Umwelt, Klima & Grün',
      'Riscuri & Protecție civilă': 'Risiken & Zivilschutz', 'Cetățeni & consultare': 'Bürger & Konsultation',
      'Prezentare': 'Präsentation', 'Caută': 'Suchen', 'Dashboard': 'Dashboard',
      'Rapoarte': 'Berichte', 'Generează': 'Generieren', 'Închide': 'Schließen', 'Rol': 'Rolle',
      'Acces complet': 'Voller Zugriff', 'Super Administrator': 'Super-Administrator', 'Administrator UAT': 'UAT-Administrator',
      'Birou Arhitectură / Urbanism': 'Architektur- / Planungsbüro', 'CTATU / Specialist': 'CTATU / Spezialist',
      'Cetățean': 'Bürger', 'Vizitator': 'Besucher'
    }
  };

  var _lang = 'ro';
  function _init() {
    try {
      var stored = localStorage.getItem(KEY);
      var nav = (G.navigator && G.navigator.language || '').slice(0, 2);
      _lang = (stored && LANGS.indexOf(stored) >= 0) ? stored : (LANGS.indexOf(nav) >= 0 ? nav : 'ro');
    } catch (e) { _lang = 'ro'; }
  }
  _init();

  function t(src) {
    if (src == null) return '';
    if (_lang === 'ro') return src;
    var d = DICT[_lang]; return (d && d[src]) || src;     // fallback la RO sursă
  }
  function getCurrentLang() { return _lang; }
  function setLang(lang) {
    if (LANGS.indexOf(lang) < 0) return;
    _lang = lang;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    try { if (G.UXSidebar && G.UXSidebar.render && document.getElementById('ux-sidebar-body')) G.UXSidebar.render(); } catch (e) {}
    try { G.document.dispatchEvent(new CustomEvent('urbanx:langChanged', { detail: { lang: lang } })); } catch (e) {}
    G.ss && G.ss('🌐 ' + lang.toUpperCase());
  }
  // permite adăugarea incrementală de traduceri (sau dintr-un pipeline MT)
  function extend(lang, map) { if (!DICT[lang]) DICT[lang] = {}; for (var k in map) DICT[lang][k] = map[k]; }

  G.UrbanXI18n = { t: t, setLang: setLang, getCurrentLang: getCurrentLang, LANGS: LANGS, extend: extend };
  G.T = t;   // shortcut global
  console.log('[i18n] încărcat · limbă: ' + _lang + ' · RO/EN/FR/DE (fallback RO)');
})(window);
