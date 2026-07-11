/* ============================================================================
 * UrbanX — SSI: M4b BIBLIOTECA REACTIE LA FOC / DoP (js/25-ssi-m4b-materiale.js)
 * Declarativ, NU calculat — regula v4.0 #13: clasa de reacție la foc nu se
 * presupune niciodată pentru materiale variabile; scenariul FINAL se blochează
 * dacă lipsește Declarația de Performanță (DoP)/fișa tehnică pt orice material
 * care nu e în lista restrânsă de materiale consacrate (variabilitate neglijabilă).
 *
 * window.SSI_M4B: BIBLIOTECA_IMPLICITA · valideazaMateriale()
 * ========================================================================== */
(function (G) {
  'use strict';

  // Valabil ca implicit DOAR pt materiale unde variabilitatea intre produse e neglijabila.
  var BIBLIOTECA_IMPLICITA = {
    beton: { clasa: 'A1', certitudine: 'implicit_acceptat', sursa: 'proprietate intrinsecă material incombustibil' },
    caramida: { clasa: 'A1', certitudine: 'implicit_acceptat' },
    bca: { clasa: 'A1', certitudine: 'implicit_acceptat' },
    otel: { clasa: 'A1', certitudine: 'implicit_acceptat' },
    sticla: { clasa: 'A1', certitudine: 'implicit_acceptat' },
    vata_bazaltica: { clasa: 'A1', certitudine: 'implicit_acceptat' },
    // Materiale cu variabilitate mare — implicit e DOAR orientativ, blocant la generare FINALA fara DoP
    polistiren_eps: { clasa: 'E', certitudine: 'ORIENTATIV — verifică DoP produsului concret' },
    lemn_masiv: { clasa: 'D-s2,d0', certitudine: 'ORIENTATIV — depinde de esență, grosime, densitate, tratament ignifug — verifică DoP' },
    pvc: { clasa: null, certitudine: 'NECUNOSCUT — plajă B-E, obligatoriu DoP produs concret' },
    spuma_poliuretanica: { clasa: null, certitudine: 'NECUNOSCUT — variază semnificativ pe produs, obligatoriu DoP' }
  };

  function _normKey(nume) { return String(nume || '').toLowerCase().replace(/\s+/g, '_').replace(/[ăâ]/g, 'a').replace(/î/g, 'i').replace(/ș/g, 's').replace(/ț/g, 't'); }

  function claseMaterial(nume) {
    var k = _normKey(nume);
    return BIBLIOTECA_IMPLICITA[k] || { clasa: null, certitudine: 'NECUNOSCUT — material nu e în biblioteca implicită, obligatoriu DoP/fișă tehnică produs concret' };
  }

  // materialeFolosite = [{ nume, DoP_atasat: bool }]
  function valideazaMateriale(materialeFolosite) {
    var rezultate = (materialeFolosite || []).map(function (m) {
      var info = claseMaterial(m.nume);
      return { nume: m.nume, clasa: info.clasa, certitudine: info.certitudine, sursa: info.sursa || null, DoP_atasat: !!m.DoP_atasat };
    });
    var neconfirmate = rezultate.filter(function (m) { return m.certitudine !== 'implicit_acceptat' && !m.DoP_atasat; });
    return {
      materiale: rezultate,
      blocat_pt_final: neconfirmate.length > 0,
      neconfirmate: neconfirmate,
      mesaj: neconfirmate.length
        ? 'Scenariul NU poate fi marcat FINAL — materialele următoare nu au DoP/fișă tehnică atașată: ' + neconfirmate.map(function (m) { return m.nume; }).join(', ') + '.'
        : null
    };
  }

  G.SSI_M4B = { BIBLIOTECA_IMPLICITA: BIBLIOTECA_IMPLICITA, claseMaterial: claseMaterial, valideazaMateriale: valideazaMateriale };
  console.log('[SSI] M4b biblioteca reactie la foc / DoP incarcata (window.SSI_M4B)');
})(window);
