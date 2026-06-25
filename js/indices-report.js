/* ============================================================================
 * UrbanX — Raport unic INDICI URBANI (PDF, standard MP/PMUD).
 * Un singur buton genereaza un raport cu TOTI indicii: definitie, formula, sursa,
 * metrici calculate si CAPTURA pe harta UAT (indicele desenat real pe harta).
 * Foloseste _makeStratDoc + functiile globale calculate*() + addModelToMap.
 * window.UrbanIndicesReport.generate()
 * ========================================================================== */
(function (G) {
  'use strict';

  // id, titlu, functie calc globala, parametri default, definitie, formula, sursa, dimensiune harta
  var INDICI = [
    { id: 'city15', t: 'Orasul 15 minute', fn: 'calculate15Min', p: { raza_m: 800, pop_zona: 6000, servicii_lipsa: 5 }, size: 800,
      def: 'Principiul prin care fiecare locuitor are acces, pe jos sau cu bicicleta in maximum 15 minute, la cele 6 functiuni esentiale: locuire, munca, aprovizionare, sanatate, educatie, recreere.',
      formula: 'acoperire = min(95, 45 + servicii_lipsa * 6) [%]; auto_redus = min(35, servicii_lipsa * 4)',
      src: 'Carlos Moreno (Sorbonne, 2020) · plan Paris "Ville du quart d\'heure"' },
    { id: 'tod', t: 'TOD — Dezvoltare orientata spre transport', fn: 'calculateTOD', p: { raza_m: 800, densitate_loc_ha: 250, frecventa_min: 6 }, size: 800,
      def: 'Concentrarea locuirii, locurilor de munca si serviciilor la densitate ridicata in jurul statiilor de transport de mare capacitate, astfel incat transportul public sa devina prima optiune.',
      formula: 'locuinte = arie_ha * densitate / 2.3; transfer = min(45, 20 + (10/frecventa)*20) [%]',
      src: 'Peter Calthorpe · studii TOD globale (-35% auto)' },
    { id: 'corridor', t: 'Coridor urban mixt', fn: 'calculateCorridor', p: { lungime_m: 1200, fronturi_active_pct: 70, latime_m: 26 }, size: 1200,
      def: 'Transformarea unei artere de tranzit intr-o strada urbana vie, cu functiuni mixte (locuire la etaje, comert/servicii la parter) si mobilitate echilibrata.',
      formula: 'front_activ = lungime * 2 * pct/100; spatii = front/12; locuri_munca = spatii * 4.5',
      src: 'Practica urbana mixed-use (forma stradala + activare parter)' },
    { id: 'sponge', t: 'Oras-burete (Sponge City)', fn: 'calculateSponge', p: { suprafata_mp: 50000, impermeabil_actual_pct: 75, tinta_permeabil_pct: 45 }, size: 224,
      def: 'Cresterea permeabilitatii tesutului urban prin infrastructura verde-albastra (gradini de ploaie, swales, pavaje permeabile) pentru a retine si infiltra apa pluviala la sursa.',
      formula: 'permeabil_nou = S * max(0, tinta - (100-impermeabil))/100; apa = permeabil_nou * 0.04 [mc]',
      src: 'Kongjian Yu / Turenscape · solutii bazate pe natura (NbS)' },
    { id: 'r330300', t: 'Regula 3-30-300', fn: 'calculate330300', p: { canopy_pct: 18, copaci_vizibili: 2, dist_parc_m: 450, pop_zona: 6000 }, size: 300,
      def: '3 arbori maturi vizibili de la fiecare locuinta; minimum 30% acoperire cu coronament (canopy) pe cartier; spatiu verde public >= 0.5 ha la maximum 300 m.',
      formula: 'conformitate = (criterii_indeplinite/3)*100 [%]; deficit_canopy = max(0, 30 - canopy) [pp]',
      src: 'Cecil Konijnendijk (2021) · standard OMS/IUCN spatii verzi' },
    { id: 'sdg117', t: 'SDG 11.7 — Spatiu public', fn: 'calculateSDG117', p: { construit_ha: 120, spatiu_public_ha: 12, pop_zona: 20000, acces_400m_pct: 55 }, size: 400,
      def: 'Indicatorul ONU 11.7.1: proportia suprafetei construite alocata spatiului public deschis pentru toti si ponderea populatiei cu acces la spatiu public la maximum 400 m.',
      formula: 'share = spatiu_public/construit*100 [%]; mp_loc = spatiu_public*10000/pop [mp/loc]',
      src: 'UN-Habitat · SDG 11.7.1 (OSM + populatie); tinta OMS 26 mp/loc' },
    { id: 'walkscore', t: 'Walk Score (pietonabilitate)', fn: 'calculateWalkScore', p: { amenitati: 14, dist_medie_m: 420, intersectii_km2: 90, pop_zona: 6000 }, size: 600,
      def: 'Masura pietonabilitatii: accesul pe jos la amenitatile cotidiene, ponderat cu distanta (distance-decay), densitatea intersectiilor si lungimea cvartalelor.',
      formula: 'scor = min(60, amenitati*3.2) + max(0, 25*(1-dist/800)) + min(15, intersectii/10) [0-100]',
      src: 'Metodologie Walk Score (proximitate amenitati + conectivitate)' },
    { id: 'gvi', t: 'Green View Index', fn: 'calculateGVI', p: { gvi_actual_pct: 14, strazi_km: 8, arbori_aliniament: 600, pop_zona: 6000 }, size: 600,
      def: 'Procentul de vegetatie vizibila la nivelul ochiului (din imagini de strada), masura a verdelui perceput de pieton — completeaza canopy-ul "de sus".',
      formula: 'deficit = max(0, 25 - GVI) [pp]; arbori_tinta = strazi_km*1000/8 * 2 (ambele laturi)',
      src: 'Literatura Green View Index (street-level greenery)' },
    { id: 'spacesyntax', t: 'Space Syntax — Integrare', fn: 'calculateSpaceSyntax', p: { segmente: 320, conectivitate_medie: 3.4, lungime_retea_km: 22, intersectii: 280 }, size: 600,
      def: 'Cat de "integrata" (accesibila configurational) este reteaua stradala — prezice miscarea naturala pietonala si vitalitatea urbana. Proxy orientativ (analiza completa = model axial).',
      formula: 'integrare = min(1, (conectivitate/6)*0.6 + (intersectii/lungime/25)*0.4) [0-1]',
      src: 'Bill Hillier (UCL) · teoria Space Syntax' },
    { id: 'noise', t: 'Expunere zgomot (END)', fn: 'calculateNoise', p: { trafic_vmd: 12000, viteza_kmh: 50, dist_locuinte_m: 20, pop_zona: 6000 }, size: 224,
      def: 'Expunerea la zgomotul de trafic (nivel Lden) si populatia expusa peste pragul de 55 dB recomandat de OMS. Estimare orientativa (nu harta CNOSSOS oficiala).',
      formula: 'Lden ~ 38 + 10*log10(trafic) + 0.18*max(0, viteza-30) - 12*log10(dist/10) [dB(A)]',
      src: 'Directiva 2002/49/CE (END) · Legea 121/2019 · OMS 2018' },
    { id: 'lst', t: 'Insula de caldura (LST/UHI)', fn: 'calculateLST', p: { delta_uhi: 3.5, verde_pct: 18, albedo_pct: 25, pop_zona: 12000 }, size: 350,
      def: 'Intensitatea insulei de caldura urbana (diferenta oras-rural) si racirea posibila prin verde si albedo; populatia vulnerabila la canicula.',
      formula: 'racire = min(dT, verde/100*2.8 + albedo/100*1.6) [°C]; rezidual = dT - racire',
      src: 'LST satelitar (Landsat/Sentinel) · IPCC AR6 adaptare' },
    { id: 'mixuse', t: 'Mix functional (entropie)', fn: 'calculateMixUse', p: { rezid_pct: 70, comert_pct: 12, munca_pct: 8, pop_zona: 8000 }, size: 300,
      def: 'Indicele de entropie a utilizarii terenului (Land Use Mix): cat de echilibrat este amestecul de functiuni — predictor robust al pietonabilitatii.',
      formula: 'entropie = -SUM(p_i * ln p_i) / ln(n_functiuni) * 100 [0-100]',
      src: 'Frank et al. · Land Use Mix (walkability)' }
  ];

  function _idle(map, ms) { return new Promise(function (res) { var d = false; function f() { if (!d) { d = true; res(); } } try { map.once('idle', f); } catch (e) {} setTimeout(f, ms || 700); }); }

  async function generate(cityKey) {
    var J = (G.jspdf && G.jspdf.jsPDF) || G.jsPDF;
    if (!J || typeof G._makeStratDoc !== 'function') { G.ss && G.ss('Motor PDF indisponibil'); return; }
    var city = (G._TCIMasterplanPDF && G._TCIMasterplanPDF._resolveCity) ? G._TCIMasterplanPDF._resolveCity(cityKey) : { name: (G.TCI && G.TCI.cityName) || 'UAT' };
    var uat = city.name || 'UAT';
    G.ss && G.ss('📊 Generez raportul cu toti indicii urbani...');
    try {
      // 1. capturez fiecare indice pe harta (orchestrare)
      var map = G.map, shots = {};
      if (map && map.getCanvas) {
        var sc, sz, sp, sb; try { sc = map.getCenter(); sz = map.getZoom(); sp = map.getPitch(); sb = map.getBearing(); } catch (e) {}
        try { var cc = (G._RO_CITIES_DB && G._RO_CITIES_DB[cityKey]); if (cc && cc.lat && map.jumpTo) { map.jumpTo({ center: [cc.lon, cc.lat], zoom: 13.2, pitch: 0, bearing: 0 }); await _idle(map, 1200); } } catch (e) {}
        var ctr = map.getCenter();
        for (var i = 0; i < INDICI.length; i++) {
          var m = INDICI[i];
          try {
            if (G.addModelToMap) {
              G.addModelToMap(map, { lat: ctr.lat, lng: ctr.lng }, m.id, m.size || 500);
              if (G.UrbanModelsStore && G.UrbanModelsStore.setTransition) G.UrbanModelsStore.setTransition(100);
              await _idle(map, 700);
              var url = map.getCanvas().toDataURL('image/jpeg', 0.8);
              if (url && url.length > 2000) shots[m.id] = url;
              if (G.removeModelFromMap) G.removeModelFromMap(map);
              await _idle(map, 220);
            }
          } catch (e) {}
        }
        try { if (sc && map.jumpTo) map.jumpTo({ center: sc, zoom: sz, pitch: sp, bearing: sb }); } catch (e) {}
      }

      // 2. construiesc PDF-ul
      var pdf = new J({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      var D = G._makeStratDoc(pdf, { docTitle: 'RAPORT INDICI URBANI', cityName: uat, accent: [124, 58, 237] });
      var W = 210, ML = D.dims.ML, CW = D.dims.CW;
      // coperta
      D.setSuppress(true); D.setPage(1);
      pdf.setFillColor(14, 10, 28); pdf.rect(0, 0, W, 297, 'F'); pdf.setFillColor(124, 58, 237); pdf.rect(0, 60, W, 1.4, 'F');
      pdf.setTextColor(180, 150, 240); pdf.setFont('DejaVuRO', 'bold'); pdf.setFontSize(9); pdf.text('URBANX · INDICI & MODELE URBANE', W / 2, 44, { align: 'center' });
      pdf.setTextColor(255, 255, 255); pdf.setFontSize(30); pdf.text('RAPORT INDICI URBANI', W / 2, 88, { align: 'center' });
      pdf.setFontSize(15); pdf.setTextColor(180, 150, 240); pdf.text(D.S2(uat), W / 2, 102, { align: 'center' });
      pdf.setFontSize(9); pdf.setTextColor(150, 150, 175); pdf.text(D.S2(INDICI.length + ' indici · definitii · formule · metrici · capturi pe harta'), W / 2, 114, { align: 'center' });
      // continut reprezentativ pe coperta — lista celor 12 indici (2 coloane)
      pdf.setDrawColor(124, 58, 237); pdf.setLineWidth(0.3); pdf.line(ML, 128, W - ML, 128);
      pdf.setFontSize(8); pdf.setTextColor(150, 140, 180); pdf.setFont('DejaVuRO', 'bold'); pdf.text('INDICI INCLUSI IN RAPORT', W / 2, 138, { align: 'center' });
      pdf.setFontSize(9.5);
      INDICI.forEach(function (m, i) {
        var col = i < 6 ? 0 : 1, row = i % 6;
        var x = col ? W / 2 + 4 : ML + 6, y = 150 + row * 13;
        pdf.setTextColor(160, 120, 240); pdf.setFont('DejaVuRO', 'bold'); pdf.text((i + 1) + '.', x, y);
        pdf.setTextColor(205, 205, 222); pdf.setFont('DejaVuRO', 'normal'); pdf.text(D.S2(m.t), x + 8, y, { maxWidth: W / 2 - ML - 16 });
      });
      pdf.setFontSize(8); pdf.setTextColor(130, 130, 160); pdf.setFont('DejaVuRO', 'normal');
      pdf.text(D.S2('Fiecare indice: definitie · formula transparenta · sursa metodologica · metrici · diagrama · captura pe harta'), W / 2, 238, { align: 'center', maxWidth: W - 40 });
      pdf.setFontSize(8); pdf.setTextColor(120, 120, 150); pdf.text(D.S2('Generat de platforma UrbanX · ' + new Date().toLocaleDateString('ro-RO')), W / 2, 280, { align: 'center' });
      D.setSuppress(false);

      // tabel sumar
      D.chapter('Sumarul indicilor');
      D.P('Raportul de fata sintetizeaza ' + INDICI.length + ' indici si modele urbane folosite de platforma UrbanX, fiecare cu definitia, formula de calcul, sursa metodologica, metricile rezultate si o captura a indicelui desenat pe harta ' + uat + '. Valorile sunt orientative (parametri impliciti), calibrabile in panoul fiecarui indice.');
      var sumRows = INDICI.map(function (m) {
        var fn = G[m.fn]; var r = null; try { if (typeof fn === 'function') r = fn(m.p); } catch (e) {}
        var key = (r && r.metrics && r.metrics[0]) ? (r.metrics[0].value + ' ' + (r.metrics[0].unit || '')) : '—';
        return [m.t, (r && r.metrics && r.metrics[0]) ? r.metrics[0].label : '—', String(key)];
      });
      D.table(['Indice', 'Metrica principala', 'Valoare'], sumRows, [Math.round(CW * 0.42), Math.round(CW * 0.38), CW - Math.round(CW * 0.42) - Math.round(CW * 0.38)], { fs: 7.5, boldFirst: true });

      // cate un capitol per indice
      INDICI.forEach(function (m) {
        D.chapter(m.t);
        D.P(m.def);
        D.formula(m.t, m.formula, m.src);
        var fn = G[m.fn]; var r = null; try { if (typeof fn === 'function') r = fn(m.p); } catch (e) {}
        if (r && r.metrics && r.metrics.length) {
          D.h2('Metrici (parametri impliciti)');
          D.table(['Indicator', 'Valoare', 'Sens'], r.metrics.map(function (x) {
            var nf = (window._nf || function (n) { return '' + n; });
            var v = (x.unit === '%' || x.unit === '°C') ? ((x.value > 0 ? '+' : '') + nf(x.value) + x.unit) : (nf(x.value) + (x.unit ? ' ' + x.unit : ''));
            return [x.label, v, x.direction === 'positive' ? 'favorabil' : x.direction === 'negative' ? 'de redus' : 'neutru'];
          }), [Math.round(CW * 0.52), Math.round(CW * 0.28), CW - Math.round(CW * 0.52) - Math.round(CW * 0.28)], { fs: 7.5, boldFirst: true });
          // diagrama metrici (nu doar cifre)
          try {
            var nums = r.metrics.filter(function (x) { return typeof x.value === 'number' && isFinite(x.value) && x.value !== 0; }).slice(0, 6);
            if (nums.length >= 2 && D.barChart) {
              D.barChart(nums.map(function (x) {
                return [x.label.slice(0, 16), Math.abs(x.value), x.direction === 'positive' ? [34, 197, 94] : x.direction === 'negative' ? [239, 68, 68] : [124, 58, 237]];
              }), { title: 'Diagrama metrici — ' + m.t, h: 42, source: 'Valori orientative (parametri impliciti)' });
            }
          } catch (e) {}
        }
        if (shots[m.id]) {
          D.h2('Reprezentare pe harta UAT');
          D.ensure(96); var iw = CW, ih = Math.round(iw * 0.56);
          try { pdf.addImage(shots[m.id], 'JPEG', ML, D.y, iw, ih, '', 'FAST'); pdf.setDrawColor(200, 208, 220); pdf.rect(ML, D.y, iw, ih, 'S'); } catch (e) {}
          D.setY(D.y + ih + 3); D.source('Captura harta UrbanX · ' + m.t);
        }
        D.sourceBadges([m.src]);
      });
      D.callout('Nota', 'Indici orientativi, calculati cu parametri impliciti pe baza de formule transparente si surse metodologice citate. Pentru analiza pe date reale (OSM/populatie) si scenarii, folositi panoul fiecarui indice si SimLab.');

      G._buildStratTOC && G._buildStratTOC(D, 1);
      var _af = G._asciiFile || function (s) { return String(s || ''); };
      pdf.save('Raport_Indici_Urbani_' + _af(uat).replace(/[^a-zA-Z0-9._-]/g, '_') + '.pdf');
      G.ss && G.ss('✅ Raport indici generat: ' + pdf.getNumberOfPages() + ' pagini');
    } catch (err) { console.error('[IndicesReport]', err); G.ss && G.ss('❌ Eroare raport indici: ' + (err.message || err)); }
  }

  G.UrbanIndicesReport = { generate: generate, INDICI: INDICI };
  console.log('[IndicesReport] raport unic indici incarcat (window.UrbanIndicesReport.generate)');
})(window);
