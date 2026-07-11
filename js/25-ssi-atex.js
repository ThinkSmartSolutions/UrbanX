/* ============================================================================
 * UrbanX — SSI: M13 MOTOR ATEX (js/25-ssi-atex.js)
 * Declarativ + calcul de zonare de principiu — regula critica v4.0 #14:
 * ATEX ramane declarativ (substante declarate de utilizator), zonarea EXACTA
 * pe plan ramane responsabilitatea proiectantului de specialitate ATEX.
 *
 * window.SSI_M13: analizaATEX()
 * ========================================================================== */
(function (G) {
  'use strict';

  // Zone: 0/1/2 pentru gaze-vapori (risc descrescator), 20/21/22 pentru pulberi
  function _determinaZonaATEX(substante, dateExploatare) {
    dateExploatare = dateExploatare || {};
    var frecventa = dateExploatare.frecventa_scurgere || 'ocazionala'; // 'continua' | 'frecventa' | 'ocazionala' | 'improbabila'
    var arePulberi = (substante.pulberi || []).length > 0;
    var mapGazeVapori = { continua: 0, frecventa: 1, ocazionala: 2, improbabila: null };
    var mapPulberi = { continua: 20, frecventa: 21, ocazionala: 22, improbabila: null };
    var zona = arePulberi ? mapPulberi[frecventa] : mapGazeVapori[frecventa];
    return {
      zona: zona, tip: arePulberi ? 'pulberi' : 'gaze_vapori',
      nota: 'Zona propusă DE PRINCIPIU, pe baza frecvenței declarate de scăpare — extinderea geometrică exactă (raza/volumul zonei) depinde de debit, ventilație și condiții reale de exploatare, stabilite de proiectantul de specialitate ATEX.'
    };
  }

  function analizaATEX(spatiu) {
    spatiu = spatiu || {};
    var substante = spatiu.substante_declarate || { gaze: [], vapori: [], pulberi: [] };
    var areSubstante = (substante.gaze || []).length || (substante.vapori || []).length || (substante.pulberi || []).length;
    if (!areSubstante) {
      return { ATEX_aplicabil: false, motiv: 'Nu au fost declarate substanțe cu potențial exploziv în acest spațiu.' };
    }
    var z = _determinaZonaATEX(substante, spatiu.date_exploatare);
    return {
      ATEX_aplicabil: true, zona_propusa: z.zona, tip_zona: z.tip,
      echipamente_necesare: 'Toate echipamentele electrice din zonă trebuie certificate Ex, cu marcaj corespunzător categoriei zonei (ATEX 2014/34/UE).',
      validare_necesara: z.nota + ' Zonarea exactă pe plan rămâne responsabilitatea proiectantului de specialitate ATEX — motorul propune încadrarea de principiu, NU o extindere geometrică exactă a zonei.',
      surse_aprindere_prezente: !!spatiu.surse_aprindere_prezente,
      neconformitate_daca_echipament_neEx: {
        tip: 'BLOCANT_NECOMPENSABIL',
        mesaj: 'Prezența unui echipament electric fără marcaj Ex corespunzător într-o zonă ATEX declarată este neconformitate cu prag absolut (M14/M11) — nu se compensează, echipamentul se înlocuiește.'
      }
    };
  }

  G.SSI_M13 = { analizaATEX: analizaATEX };
  console.log('[SSI] M13 motor ATEX incarcat (window.SSI_M13)');
})(window);
