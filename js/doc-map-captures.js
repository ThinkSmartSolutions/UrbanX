/* ============================================================================
 * UrbanX — Capturi harta pentru documente (SIDU / Masterplan / PMUD).
 * Orchestrare automata: la generarea documentului deseneaza pe rand superblocul
 * si indicii urbani pe harta UAT, captureaza fiecare (preserveDrawingBuffer e ON)
 * si returneaza planse {title, img} ce se insereaza in PDF.
 * window._DocMapCaptures.capture(cityKey) -> Promise<[{title,img}]>
 * window._DocMapCaptures.renderPlates(D, shots, titluCapitol) -> deseneaza in doc
 * Tot fluxul e protejat: daca harta/captura esueaza, documentul se genereaza fara planse.
 * ========================================================================== */
(function (G) {
  'use strict';

  function _idle(map, ms) {
    return new Promise(function (res) {
      var done = false;
      function f() { if (!done) { done = true; res(); } }
      try { map.once('idle', f); } catch (e) {}
      setTimeout(f, ms || 1600);
    });
  }
  function _grab(map, title) {
    try {
      var url = map.getCanvas().toDataURL('image/jpeg', 0.92);
      return (url && url.length > 2000) ? { title: title, img: url } : null;
    } catch (e) { return null; }
  }
  // numara layerele cu un anumit prefix (verifica daca indicele chiar a desenat ceva)
  function _layerCount(map, prefixes) {
    try {
      var ls = (map.getStyle() && map.getStyle().layers) || [];
      return ls.filter(function (l) { return prefixes.some(function (p) { return l.id.indexOf(p) === 0; }); }).length;
    } catch (e) { return 0; }
  }

  // Capturi: harta de baza a UAT + superbloc + cativa indici urbani, suprapusi pe harta reala
  async function capture(cityKey) {
    var map = G.map;
    if (!map || !map.getCanvas) return [];
    var shots = [];
    // restaureaza starea camerei la final
    var savedCenter, savedZoom, savedPitch, savedBearing;
    try { savedCenter = map.getCenter(); savedZoom = map.getZoom(); savedPitch = map.getPitch(); savedBearing = map.getBearing(); } catch (e) {}
    try {
      // centreaza pe UAT
      var c = (G._RO_CITIES_DB && G._RO_CITIES_DB[cityKey]) || (G.TCI && G.TCI._EXTRA_UATS && G.TCI._EXTRA_UATS[cityKey]);
      if (c && c.lat && c.lon && map.jumpTo) { map.jumpTo({ center: [c.lon, c.lat], zoom: 13.2, pitch: 0, bearing: 0 }); }
      await _idle(map, 1400);

      // 1. plan de situatie (harta UAT)
      var base = _grab(map, 'Plan de situatie — harta UAT'); if (base) shots.push(base);

      var ctr = map.getCenter();
      var center = { lat: ctr.lat, lng: ctr.lng };

      // 2. superbloc pe strazile reale (daca modulul exista)
      try {
        if (G.addSuperblocToMap) {
          G.addSuperblocToMap(map, center, 400);
          if (G.UrbanModelsStore && G.UrbanModelsStore.setTransition) G.UrbanModelsStore.setTransition(100);
          await _idle(map, 1100);
          var sb = _grab(map, 'Model Superbloc (Barcelona) suprapus pe harta'); if (sb) shots.push(sb);
          if (G.removeSuperblocFromMap) G.removeSuperblocFromMap(map);
          await _idle(map, 400);
        }
      } catch (e) {}

      // 3. TOTI indicii urbani din baza de date (12 modele FAZA 3/4) suprapusi pe harta.
      // Zoom la scara de cartier (~14.3) pentru lizibilitate — la zoom de UAT indicii erau specks.
      var models = [
        { id: 'city15', title: 'Indice Oras 15 minute' },
        { id: 'tod', title: 'Indice TOD — dezvoltare orientata pe transit' },
        { id: 'corridor', title: 'Indice Coridor mixt functional' },
        { id: 'sponge', title: 'Indice Sponge City (retentie pluviala)' },
        { id: 'r330300', title: 'Indice 3-30-300 (verde urban)' },
        { id: 'sdg117', title: 'Indice SDG 11.7 — spatiu public accesibil' },
        { id: 'walkscore', title: 'Indice Walk Score (pietonabilitate)' },
        { id: 'gvi', title: 'Indice Green View (vizibilitate verde)' },
        { id: 'spacesyntax', title: 'Indice Space Syntax (integrare retea)' },
        { id: 'noise', title: 'Indice zgomot urban (END)' },
        { id: 'lst', title: 'Indice caldura urbana (LST)' },
        { id: 'mixuse', title: 'Indice mix functional' }
      ];
      if (G.addModelToMap) {
        // zoom mai aproape pentru indici (raza model ~700m)
        try { map.jumpTo({ center: [center.lng, center.lat], zoom: 14.3, pitch: 0, bearing: 0 }); } catch (e) {}
        await _idle(map, 900);
        for (var i = 0; i < models.length; i++) {
          var m = models[i];
          try {
            var before = _layerCount(map, ['um-', 'model-', 'idx-', m.id]);
            G.addModelToMap(map, center, m.id, 700);
            if (G.UrbanModelsStore && G.UrbanModelsStore.setTransition) G.UrbanModelsStore.setTransition(100);
            await _idle(map, 950);
            var after = _layerCount(map, ['um-', 'model-', 'idx-', m.id]);
            // captureaza doar daca indicele chiar a adaugat un layer (altfel ar fi doar harta goala)
            if (after > before) { var s = _grab(map, m.title); if (s) shots.push(s); }
            if (G.removeModelFromMap) G.removeModelFromMap(map);
            await _idle(map, 350);
          } catch (e) {}
        }
      }
    } catch (e) { console.warn('[DocMapCaptures] capture', e); }
    // restaureaza camera
    try { if (savedCenter && map.jumpTo) map.jumpTo({ center: savedCenter, zoom: savedZoom, pitch: savedPitch, bearing: savedBearing }); } catch (e) {}
    return shots;
  }

  // Insereaza plansele capturate in document (motor _makeStratDoc — foloseste D.pdf)
  function renderPlates(D, shots, titluCapitol) {
    if (!D || !shots || !shots.length) return;
    var dims = D.dims || { ML: 18, CW: 174 };
    var ML = dims.ML, CW = dims.CW;
    try {
      D.chapter(titluCapitol || 'Planse — indici si modele urbane pe harta UAT');
      D.P('Capturile de mai jos prezinta superblocul si indicii urbani generati automat de platforma, suprapusi pe harta unitatii administrativ-teritoriale. Ele ilustreaza, la scara reala, modelele urbane analizate in document.');
      shots.forEach(function (sh) {
        var imgW = CW, imgH = Math.round(imgW * 0.55);
        D.ensure(imgH + 14);
        D.h2(sh.title);
        var yy = D.y;
        try {
          D.pdf.setDrawColor(200, 208, 220); D.pdf.setLineWidth(0.3);
          D.pdf.addImage(sh.img, 'JPEG', ML, yy, imgW, imgH, '', 'FAST');
          D.pdf.rect(ML, yy, imgW, imgH, 'S');
        } catch (e) {}
        D.setY(yy + imgH + 3);
        D.source('Captura harta UrbanX · ' + sh.title + ' · proiectie WGS84 (orientativ)');
      });
    } catch (e) { console.warn('[DocMapCaptures] renderPlates', e); }
  }

  // ── Capitol de INCHIDERE — concluzii + limitari + disclaimer (documentul nu se termina brusc) ──
  function docClosing(D, kind, cityName) {
    if (!D || !D.chapter) return;
    var L = { sidu: 'Strategia Integrată de Dezvoltare Urbană', masterplan: 'Masterplanul strategic', pmud: 'Planul de Mobilitate Urbană Durabilă' };
    var docName = L[kind] || 'Documentul';
    var uat = cityName || 'unitatea administrativ-teritorială';
    try {
      D.chapter('Concluzii, limitări și pași următori');
      D.h2('Sinteză');
      D.P(docName + ' pentru ' + uat + ' integrează diagnoza teritorială, indicatorii urbani calculați (POT/CUT, accesibilitate, spații verzi, mobilitate, risc seismic și la inundații, calitatea mediului) și proiecțiile de evoluție într-un cadru decizional coerent. Direcțiile strategice propuse au fost fundamentate pe date oficiale (INS, Eurostat, INFP, ANAR, Copernicus) și pe metodologii recunoscute, astfel încât prioritizarea investițiilor să fie trasabilă și justificabilă în fața finanțatorilor și a comunității.');
      D.P('Implementarea coerentă a măsurilor propuse conduce la o evoluție pozitivă a indicatorilor-cheie pe orizontul de planificare, în timp ce scenariul inerțial (fără intervenție) este prezentat exclusiv ca avertisment. Corelarea cu celelalte documentații (PUG/RLU, ' + (kind === 'pmud' ? 'SIDU și Masterplan' : kind === 'sidu' ? 'Masterplan și PMUD' : 'SIDU și PMUD') + ') este obligatorie pentru ca prioritățile să producă efecte juridice și bugetare.');
      D.h2('Limitări metodologice');
      D.P('Valorile prezentate sunt estimări orientative, generate algoritmic pe baza datelor disponibile la momentul elaborării. Ele nu înlocuiesc studiile de specialitate avizate (microzonare seismică, studii hidrotehnice, studii de trafic calibrate, expertize tehnice individuale) și nici procedurile legale de avizare și aprobare. Indicatorii marcați „—" necesită completare din surse oficiale locale.');
      D.callout('Pași următori recomandați', 'Validarea datelor cu sursele locale (primărie, ADR, operatori); completarea studiilor de specialitate pentru zonele critice; transpunerea priorităților în PUG/RLU și în programarea bugetară multianuală; consultarea publică a variantei finale înainte de aprobarea în Consiliul Local.');
      D.P('Acest document constituie un instrument de fundamentare a deciziei urbanistice. Aplicat consecvent și actualizat periodic, el oferă administrației locale o bază solidă, transparentă și orientată spre rezultate pentru dezvoltarea sustenabilă a ' + uat + '.');
      D.sourceBadges(['INS', 'Eurostat', 'INFP P100-1', 'ANAR PGRA', 'Copernicus', 'Legea 350/2001', 'Ghid MDLPA']);
    } catch (e) { console.warn('[DocMapCaptures] docClosing', e); }
  }

  G._DocMapCaptures = { capture: capture, renderPlates: renderPlates, docClosing: docClosing };
  console.log('[DocMapCaptures] modul capturi harta pentru documente incarcat');
})(window);
