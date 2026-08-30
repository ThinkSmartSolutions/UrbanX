/* ============================================================================
 * UrbanX — LOADER GENERIC BIBLIOTECĂ MULTI-FUNCȚIUNE
 * Încarcă memoriile profunde (.md → HTML) pentru ORICE funcțiune înregistrată și
 * le publică în window.UXLibrary[functiune], exact ca loader-ul centru-social.
 * DOC_BUILDERS le preia automat prin _lib(D,key) (docx-builder.js), cu fallback
 * la conținut schematic dacă un fișier .md lipsește încă.
 * Reutilizează convertorul window.UXLibMdToHtml (definit în centru-social-zi.js).
 * Adăugarea unei funcțiuni noi = 1 intrare în REG + fișierele .md în folderul ei.
 * ========================================================================== */
(function (G) {
  'use strict';
  G.UXLibrary = G.UXLibrary || {};
  G.UXLibrary._ready = G.UXLibrary._ready || {};
  var VER = '20260830d';
  var BASE = 'js/urbanx-library/functiuni/';
  // set standard de fișiere per funcțiune (aceleași chei ca la centru-social)
  var STD = {
    arhitectura: 'arhitectura.md', structura: 'structura.md', instalatii: 'instalatii.md', general: 'general.md',
    caiet_arh: 'caiet-sarcini-arhitectura.md', caiet_str: 'caiet-sarcini-rezistenta.md', caiet_inst: 'caiet-sarcini-instalatii.md',
    arh_pth: 'arhitectura-pth.md', str_pth: 'structura-pth.md', inst_pth: 'instalatii-pth.md',
    scenariu_psi: 'scenariu-psi.md', dtoe: 'dtoe.md', aviz_mediu: 'aviz-mediu.md', dali: 'dali.md', sf: 'sf.md', receptie: 'receptie.md', carte_tehnica: 'carte-tehnica.md'
  };
  // REGISTRU funcțiuni (folder). centru-social e încărcat de loader-ul propriu.
  var REG = {
    'gradinita': 'gradinita',            // creșă / grădiniță
    'scoala': 'scoala',
    'bloc-locuinte': 'bloc-locuinte',
    'hala-industriala': 'hala-industriala',
    'skid': 'skid',
    'birouri': 'birouri',
    'medical': 'medical',
    'hotelier': 'hotelier',
    'spatiu-comercial': 'spatiu-comercial',
    'mall': 'mall',
    'locuinta-individuala': 'locuinta-individuala',
    'cladire-mixta': 'cladire-mixta',
    'sport': 'sport',
    'parcare': 'parcare',
    'agricol': 'agricol',
    'parc-fotovoltaic': 'parc-fotovoltaic',
    'bess': 'bess',
    'statie-transformare': 'statie-transformare',
    'infrastructura-drum': 'infrastructura-drum',
    'pod': 'pod'
  };

  function mdToHtml(md) { return (typeof G.UXLibMdToHtml === 'function') ? G.UXLibMdToHtml(md) : (md || ''); }

  function loadFunctiune(fnKey, folder, keysAllowed) {
    // incarca DOAR cheile din manifest (fisierele care exista) → fara potop de 404.
    // fallback: daca nu avem manifest, incearca toate cheile STD (comportament vechi).
    var keys = (keysAllowed && keysAllowed.length) ? keysAllowed.filter(function (k) { return STD[k]; }) : Object.keys(STD);
    var content = {}, loaded = 0, total = keys.length;
    var resolveReady; var readyP = new Promise(function (r) { resolveReady = r; });
    G.UXLibrary._ready[fnKey] = readyP;
    if (!total) { G.UXLibrary[fnKey] = content; resolveReady(content); return; }
    keys.forEach(function (key) {
      fetch(BASE + folder + '/' + STD[key] + '?v=' + VER)
        .then(function (r) { return r.ok ? r.text() : ''; })
        .then(function (md) { content[key] = { md: md, html: mdToHtml(md), pages_est: Math.round((md || '').length / 3000) }; })
        .catch(function () { content[key] = { md: '', html: '', pages_est: 0 }; })
        .then(function () {
          loaded++;
          if (loaded >= total) {
            G.UXLibrary[fnKey] = content; resolveReady(content);
            var nonEmpty = Object.keys(content).filter(function (k) { return content[k].pages_est > 0; });
            if (nonEmpty.length) console.log('[UXLibrary] ' + fnKey + ' încărcat: ' + nonEmpty.map(function (k) { return k + '~' + content[k].pages_est + 'p'; }).join(', '));
          }
        });
    });
  }

  // Citim manifestul (ce fisiere EXISTA per functiune) → incarcam doar acelea.
  // Fallback robust: daca manifestul lipseste, incarcam toate cheile STD (ca inainte).
  fetch(BASE.replace('functiuni/', '') + 'manifest.json?v=' + VER)
    .then(function (r) { return r.ok ? r.json() : null; })
    .catch(function () { return null; })
    .then(function (man) {
      Object.keys(REG).forEach(function (fnKey) { loadFunctiune(fnKey, REG[fnKey], man && man[REG[fnKey]]); });
    });

  // API: înregistrează dinamic o funcțiune nouă (dacă adaugi foldere ulterior)
  G.UXLibRegister = function (fnKey, folder, keys) { REG[fnKey] = folder || fnKey; loadFunctiune(fnKey, folder || fnKey, keys); };
})(window);
