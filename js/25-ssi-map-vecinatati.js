/* ============================================================================
 * UrbanX — SSI: AUTO-DETECTARE VECINĂTĂȚI DIN HARTĂ (js/25-ssi-map-vecinatati.js)
 * Completare Florin (11 iul 2026): "eu ca proiectant văd vecinătățile din mers
 * la teren și din hartă... nu la fel poți face tu automat, doar să am opțiunea
 * să corectez?" — DA. Reutilizează contextul OSM deja încărcat de platformă
 * (S.ctx, populat de loadContext() din js/03-ui-panel.js) și funcția de
 * distanță minimă poligon-poligon deja existentă (minDistBetweenPolygons,
 * js/02-map-core.js) — NU reinventează, reutilizează motoarele comune.
 *
 * Regulă: analiza NU se oprește niciodată așteptând clasificare manuală
 * completă — se aplică estimare conservatoare (grad V, risc mare) și se
 * marchează clar sursa + starea „neconfirmat"; doar generarea scenariului
 * FINAL (pentru depunere) cere ca proiectantul să fi confirmat/corectat
 * fiecare vecinătate (simetrie cu statusul normativelor, v3.0).
 *
 * window.SSI_MAP_VECINATATI: autoDetecteazaVecinatati()
 * ========================================================================== */
(function (G) {
  'use strict';

  var RAZA_DETECTIE_M = 60; // marjă peste distanțele maxime din T4/T145 (15m, +50% risc mare = pana la 22.5m)

  // Mapare tag OSM building=* -> categoria de destinatie folosita in motorul SSI (vezi RISC_PE_DESTINATIE, 25-ssi-engine.js)
  var OSM_BUILDING_TO_DESTINATIE = {
    house: 'locuinta', detached: 'locuinta', residential: 'locuinta', apartments: 'locuinta',
    semidetached_house: 'locuinta', terrace: 'locuinta', bungalow: 'locuinta', dormitory: 'locuinta',
    commercial: 'comert', retail: 'comert', supermarket: 'comert', shop: 'comert',
    industrial: 'hala_productie', warehouse: 'depozit', manufacture: 'hala_productie',
    office: 'birou', civic: 'birou', public: 'birou', government: 'birou',
    hotel: 'birou', school: 'birou', hospital: 'birou'
  };
  function _destinatieDinOSM(fn) { return OSM_BUILDING_TO_DESTINATIE[String(fn || '').toLowerCase()] || 'altele'; }

  // Indiciu SLAB (nu certificare) — anul construcției nu poate stabili singur gradul de rezistență la foc
  // (necesită documentație tehnică reală); folosit DOAR ca ajustare orientativă față de varianta conservatoare
  // implicită V, niciodată ca înlocuitor al confirmării proiectantului.
  function _gradProbabilDinAnConstructie(an) {
    if (!an) return null;
    if (an < 1970) return 'IV';   // constructii vechi, probabil zidarie neconsolidata
    if (an < 2000) return 'III';
    return 'II';                 // constructii recente, probabil beton armat/structura moderna — tot orientativ
  }

  // Auto-detectează construcțiile din jurul parcelei active, folosind contextul OSM deja încărcat de platformă.
  // Returnează candidați PRE-COMPLETAȚI (destinație estimată din tag OSM, grad V/risc mare conservator implicit,
  // distanța REALĂ calculată din geometrie) — proiectantul confirmă sau corectează, nu completează de la zero.
  async function autoDetecteazaVecinatati() {
    var S = G.S;
    if (!S || !S.parcels || !S.parcels.length) return { ok: false, eroare: 'NICIO_PARCELA_SELECTATA', mesaj: 'Selectează o parcelă pe hartă înainte de auto-detectare.' };
    var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel];
    if (!ap || !ap.geo || !ap.geo.geometry) return { ok: false, eroare: 'GEOMETRIE_LIPSA', mesaj: 'Parcela activă nu are geometrie încărcată — selecteaz-o din nou pe hartă.' };
    if (typeof G.turf === 'undefined' || typeof G.minDistBetweenPolygons !== 'function') {
      return { ok: false, eroare: 'MOTOR_HARTA_INDISPONIBIL', mesaj: 'Turf.js sau motorul de distanțe nu sunt încărcate — deschide harta principală înainte de auto-detectare.' };
    }

    if (typeof G.loadContext === 'function') { try { await G.loadContext(); } catch (e) {} }
    var ctxFeatures = (S.ctx && S.ctx.features) || [];
    if (!ctxFeatures.length) return { ok: false, eroare: 'FARA_CONTEXT', mesaj: 'Nu s-au găsit clădiri (OSM/Mapbox) în jurul parcelei — verifică zoom-ul hărții sau reîncarcă contextul (🔄 Context).' };

    var proprie = { type: 'Feature', geometry: ap.geo.geometry, properties: {} };
    var centruPropriu;
    try { centruPropriu = G.turf.centerOfMass(proprie); } catch (e) { return { ok: false, eroare: 'GEOMETRIE_INVALIDA', mesaj: 'Geometria parcelei active nu poate fi procesată.' }; }

    var candidati = [];
    ctxFeatures.forEach(function (ctx) {
      try {
        var centruCtx = G.turf.centerOfMass(ctx);
        if (G.turf.booleanPointInPolygon(centruCtx, proprie)) return; // clădire pe propria parcelă, nu e vecin
        if (G.turf.distance(centruPropriu, centruCtx, { units: 'meters' }) > RAZA_DETECTIE_M * 3) return; // pre-filtrare rapidă
        var r = G.minDistBetweenPolygons(proprie, ctx);
        if (r.dist == null || r.dist > RAZA_DETECTIE_M) return;
        var fn = (ctx.properties && ctx.properties.fn) || 'yes';
        var h = ctx.properties && ctx.properties.h;
        var lv = ctx.properties && ctx.properties.lv;
        var an = ctx.properties && ctx.properties.an; // an constructie, DOAR daca taggat in OSM (rar)
        var gradDinAn = _gradProbabilDinAnConstructie(an);
        candidati.push({
          id: 'V' + (candidati.length + 1),
          destinatie_declarata: _destinatieDinOSM(fn),
          grad_rezistenta_estimat: gradDinAn || 'V',
          risc_vecin: 'mare',
          perete_CF_pe_fatada_comuna: false,
          distanta_masurata_m: r.dist,
          sursa_distanta: 'harta_osm',
          sursa_clasificare: 'estimare_conservatoare_neconfirmata',
          certitudine: gradDinAn ? 'orientativ' : 'presupus_conservator', // niciodata 'confirmat_oficial' din OSM
          confirmat: false,
          detaliu_sursa: 'OSM building=' + fn + (lv ? ', ' + Math.round(lv) + ' niveluri' : '') + (h ? ', ~' + Math.round(h) + ' m' : '') + (an ? ', an constructie ~' + an + ' (indiciu OSM, neconfirmat)' : '') + ' — distanță calculată din geometria reală'
        });
      } catch (e) {}
    });
    candidati.sort(function (a, b) { return a.distanta_masurata_m - b.distanta_masurata_m; });
    return { ok: true, vecinatati: candidati, nrDetectate: candidati.length };
  }

  G.SSI_MAP_VECINATATI = { autoDetecteazaVecinatati: autoDetecteazaVecinatati, RAZA_DETECTIE_M: RAZA_DETECTIE_M, _destinatieDinOSM: _destinatieDinOSM, _gradProbabilDinAnConstructie: _gradProbabilDinAnConstructie };
  console.log('[SSI] auto-detectare vecinatati din harta (OSM) incarcata (window.SSI_MAP_VECINATATI)');
})(window);
