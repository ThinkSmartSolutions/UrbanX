/* ============================================================================
 * UrbanX — 003 FAZA 4: celelalte 4 modele urbane (15-min / TOD / Coridor mixt /
 * Sponge City). Fiecare = calculate[Model]() PURĂ → createModelResult complet
 * (metrici concrete + documentContent SIDU/MP/PMUD + mapLayers before≠after).
 * Dialog generic partajat (renderUrbanModelDialog) cu before/after + export docs.
 * Complementar SimLab (care SIMULEAZĂ capacitatea); aici: parametric + text strategic.
 * MAP_VAR = window.map.
 * ========================================================================== */
(function (G) {
  'use strict';
  var roN = function (n) { try { return Math.round(n).toLocaleString('ro'); } catch (e) { return '' + n; } };
  var CR = G.createModelResult;

  // ── 15-MINUTE CITY ──
  function calculate15Min(p) {
    var raza_m = p.raza_m, pop_zona = p.pop_zona, servicii_lipsa = p.servicii_lipsa;
    var arie_ha = Math.PI * Math.pow(raza_m, 2) / 10000;
    var acoperire = Math.min(95, 45 + servicii_lipsa * 6);
    var auto_redus = Math.min(35, servicii_lipsa * 4);
    var co2 = Math.round(pop_zona * auto_redus / 100 * 0.6 * 10) / 10;
    var r = CR('city15', 'Oraș 15 Minute', p);
    r.metrics = [
      { id: 'acop', label: 'Acoperire 15 min', value: acoperire, unit: '%', direction: 'positive' },
      { id: 'serv', label: 'Servicii noi de proximitate', value: servicii_lipsa, unit: 'buc', direction: 'positive' },
      { id: 'pop', label: 'Locuitori deserviți', value: pop_zona, unit: 'loc', direction: 'positive' },
      { id: 'auto', label: 'Reducere deplasări auto', value: -auto_redus, unit: '%', direction: 'positive' },
      { id: 'co2', label: 'Reducere CO₂/an', value: co2, unit: 't CO₂', direction: 'positive' },
      { id: 'arie', label: 'Arie acoperită', value: Math.round(arie_ha), unit: 'ha', direction: 'neutral' }
    ];
    r.mapLayers = [
      { id: 'um-iso', type: 'circle', beforePaint: { 'circle-radius': 6, 'circle-color': '#888780', 'circle-opacity': 0.25 }, afterPaint: { 'circle-radius': 30, 'circle-color': '#BA7517', 'circle-opacity': 0.5 } }
    ];
    r.documentContent = {
      siduSection: {
        projectTitle: 'Cartier al proximității — model „Oraș 15 minute" (C. Moreno)',
        description: 'Proiectul aplică principiul „orașului în 15 minute" (Carlos Moreno, Sorbonne) la o zonă rezidențială cu raza de ' + raza_m + ' m (' + arie_ha.toFixed(1) + ' ha) din municipiul Iași, locuită de aproximativ ' + roN(pop_zona) + ' de persoane. Obiectivul este ca fiecare locuitor să aibă acces, pe jos sau cu bicicleta în maximum 15 minute, la cele șase funcțiuni esențiale ale vieții urbane: locuire, muncă, aprovizionare, sănătate, educație și recreere. Analiza identifică ' + servicii_lipsa + ' funcțiuni de proximitate deficitare, care vor fi completate prin densificarea serviciilor la parterul clădirilor existente, conversia spațiilor subutilizate și amplasarea de dotări publice de cartier. Intervenția ridică gradul de acoperire a nevoilor zilnice la pas de la baseline la aproximativ ' + acoperire + '%, reduce deplasările auto de scurtă distanță cu circa ' + auto_redus + '% și diminuează emisiile cu aproximativ ' + co2 + ' t CO₂/an. Modelul nu presupune construcții noi majore, ci reorganizarea funcțională a țesutului existent, fiind un proiect-cheie de coeziune socială și calitate a vieții în portofoliul SIDU, corelat cu PMUD (mobilitate activă) și transpus în PUG prin reglementarea funcțiunilor mixte la parter.',
        justification: 'Cartierele monofuncționale (dormitor) generează navetă internă excesivă și izolare. Proximitatea serviciilor crește echitatea (acces pentru vârstnici, copii, persoane fără mașină) și vitalitatea economică locală.',
        costEstimate: (Math.round(servicii_lipsa * 0.4 * 10) / 10) + ' M€ – ' + (Math.round(servicii_lipsa * 0.8 * 10) / 10) + ' M€ (dotări de cartier + amenajări pietonale, POR 2021–2027)',
        timeline: 'Termen scurt (2026–2028): cartare deficit + activare parteruri; mediu (2028–2031): dotări publice noi',
        legalBasis: 'Legea 350/2001; HG 525/1996 (dotări urbanistice); HG 874/2019 — PMUD',
        indicators: ['Acces 15 min la 6 funcțiuni: baseline → ' + acoperire + '%', 'Deplasări auto < 3 km: −' + auto_redus + '%', 'Servicii de proximitate noi: ' + servicii_lipsa, 'Emisii evitate: ' + co2 + ' t CO₂/an']
      },
      masterplanSection: {
        interventionType: 'Densificare funcțională de proximitate (mixed-use la parter)',
        affectedArea: '~' + arie_ha.toFixed(1) + ' ha (rază ' + raza_m + ' m)',
        phasing: ['Faza 0 (4 luni): cartarea deficitului de servicii pe izocrone pietonale', 'Faza 1 (12 luni): activarea parterurilor + 2–3 dotări-pilot', 'Faza 2 (18 luni): rețea completă de proximitate + amenajări pietonale', 'Faza 3: monitorizare acces și ajustare'],
        designPrinciples: ['Funcțiuni mixte la parterul clădirilor existente', 'Trasee pietonale sigure și continue', 'Dotări publice la distanță de mers pe jos', 'Reutilizarea spațiilor subutilizate înainte de construcții noi']
      },
      pmudSection: {
        measureType: 'Promovarea mobilității active (mers pe jos + bicicletă) prin proximitate',
        trafficImpact: 'Eliminarea a ~' + roN(pop_zona * auto_redus / 100) + ' deplasări auto scurte/zi',
        modalShift: '−' + auto_redus + '% auto, +' + Math.round(auto_redus * 0.7) + '% pietonal, +' + Math.round(auto_redus * 0.3) + '% ciclistic. −' + co2 + ' t CO₂/an',
        infrastructureNeeded: ['Trasee pietonale continue și iluminate între dotări', 'Treceri de pietoni sigurizate la intersecții', 'Parcaje pentru biciclete la fiecare dotare publică', 'Semnalistică de orientare (timpi de mers pe jos)']
      }
    };
    return r;
  }

  // ── TOD (Transit-Oriented Development) ──
  function calculateTOD(p) {
    var raza_m = p.raza_m, densitate_loc_ha = p.densitate_loc_ha, frecventa_min = p.frecventa_min;
    var arie_ha = Math.PI * Math.pow(raza_m, 2) / 10000;
    var locuinte = Math.round(arie_ha * densitate_loc_ha / 2.3);
    var transfer = Math.min(45, 20 + (10 / Math.max(2, frecventa_min)) * 20);
    var parcari_redus = Math.min(40, transfer * 0.8);
    var co2 = Math.round(locuinte * transfer / 100 * 0.9 * 10) / 10;
    var r = CR('tod', 'TOD — Dezvoltare orientată spre transport', p);
    r.metrics = [
      { id: 'loc', label: 'Locuințe în 800m de stație', value: locuinte, unit: 'loc.', direction: 'positive' },
      { id: 'transf', label: 'Transfer modal spre transport', value: transfer, unit: '%', direction: 'positive' },
      { id: 'park', label: 'Reducere necesar parcări', value: -parcari_redus, unit: '%', direction: 'positive' },
      { id: 'dens', label: 'Densitate țintă', value: densitate_loc_ha, unit: 'loc/ha', direction: 'neutral' },
      { id: 'co2', label: 'Reducere CO₂/an', value: co2, unit: 't CO₂', direction: 'positive' },
      { id: 'freq', label: 'Frecvență transport', value: frecventa_min, unit: 'min', direction: 'neutral' }
    ];
    r.mapLayers = [
      { id: 'um-tod', type: 'circle', beforePaint: { 'circle-radius': 8, 'circle-color': '#888780', 'circle-opacity': 0.2 }, afterPaint: { 'circle-radius': 28, 'circle-color': '#534AB7', 'circle-opacity': 0.45 } }
    ];
    r.documentContent = {
      siduSection: {
        projectTitle: 'Nod TOD — densificare mixtă în jurul unei stații de transport (Calthorpe)',
        description: 'Proiectul propune o dezvoltare orientată spre transport public (Transit-Oriented Development, model Peter Calthorpe) într-o rază de ' + raza_m + ' m (' + arie_ha.toFixed(1) + ' ha) în jurul unei stații majore de transport din municipiul Iași — stație de tren metropolitan, terminal de tramvai sau hub multimodal. Conceptul concentrează locuirea, locurile de muncă și serviciile la densitate ridicată (' + densitate_loc_ha + ' loc/ha) în imediata vecinătate a transportului de mare capacitate, astfel încât transportul public să devină prima opțiune de deplasare, nu ultima. La o frecvență a serviciului de ' + frecventa_min + ' minute, modelul poate găzdui aproximativ ' + roN(locuinte) + ' de locuințe în zona de captare pietonală de 800 m, generând un transfer modal spre transport de circa ' + transfer + '% și permițând reducerea necesarului de parcări cu până la ' + parcari_redus + '% (mai puține locuri impuse prin normă, mai mult spațiu pentru funcțiuni urbane). Emisiile evitate sunt estimate la ' + co2 + ' t CO₂/an. TOD-ul este instrumentul prin care SIDU corelează direct dezvoltarea imobiliară cu investiția în transport (PMUD), evitând extinderea necontrolată și naveta auto; transpunerea în PUG se face prin zone de densitate sporită și coeficienți diferențiați în jurul stațiilor.',
        justification: 'Dezvoltarea imobiliară necorelată cu transportul generează dependență de automobil și congestie. Concentrarea densității lângă stații valorifică investiția publică în transport și reduce costul infrastructurii pe locuință.',
        costEstimate: 'investiție privată majoritară; componenta publică (spațiu public + stație) ' + (Math.round(arie_ha * 0.15 * 10) / 10) + ' M€ – ' + (Math.round(arie_ha * 0.3 * 10) / 10) + ' M€',
        timeline: 'Termen mediu (2027–2032): PUZ de densificare + execuție etapizată corelată cu darea în folosință a stației',
        legalBasis: 'Legea 350/2001 (PUZ); HG 874/2019 — PMUD; politica de coeziune UE 2021/1060',
        indicators: ['Locuințe în 800 m de stație: ' + roN(locuinte), 'Transfer modal spre transport public: ' + transfer + '%', 'Necesar parcări: −' + parcari_redus + '%', 'Emisii evitate: ' + co2 + ' t CO₂/an']
      },
      masterplanSection: {
        interventionType: 'Densificare mixtă orientată spre stație (TOD)',
        affectedArea: '~' + arie_ha.toFixed(1) + ' ha (rază 800 m pietonal)',
        phasing: ['Faza 0 (8 luni): PUZ TOD + studiu de capacitate a stației', 'Faza 1 (18 luni): spațiu public + prima fază de locuințe', 'Faza 2 (24 luni): densificare completă + funcțiuni mixte', 'Faza 3: parcaje de tip park&ride la marginea zonei'],
        designPrinciples: ['Densitate descrescătoare dinspre stație spre exterior', 'Parter activ și front la stradă pe traseele pietonale', 'Parcare redusă și partajată, nu pe parcelă', 'Prioritate pieton/bicicletă pe ultima sută de metri']
      },
      pmudSection: {
        measureType: 'Cuplarea densității urbane cu transportul de mare capacitate',
        trafficImpact: 'Captează ~' + roN(locuinte * 2.3 * transfer / 100) + ' deplasări/zi spre transport public',
        modalShift: '+' + transfer + '% transport public, −parcări ' + parcari_redus + '%. Reducere CO₂: ' + co2 + ' t/an',
        infrastructureNeeded: ['Stație accesibilă, acoperită, cu informare în timp real', 'Park&ride + bike&ride la nodul de transport', 'Benzi dedicate pe arterele de acces', 'Trasee pietonale prioritare stație ↔ locuințe']
      }
    };
    return r;
  }

  // ── CORIDOR MIXT ──
  function calculateCorridor(p) {
    var lungime_m = p.lungime_m, fronturi_active_pct = p.fronturi_active_pct, latime_m = p.latime_m;
    var arie_mp = lungime_m * latime_m;
    var fronturi = Math.round(lungime_m * 2 * fronturi_active_pct / 100);
    var spatii = Math.round(fronturi / 12);
    var locuri_munca = Math.round(spatii * 4.5);
    var trafic_redus = Math.min(20, fronturi_active_pct / 5);
    var r = CR('corridor', 'Coridor urban mixt', p);
    r.metrics = [
      { id: 'front', label: 'Front comercial activ', value: fronturi, unit: 'm', direction: 'positive' },
      { id: 'spat', label: 'Spații comerciale/servicii', value: spatii, unit: 'buc', direction: 'positive' },
      { id: 'munca', label: 'Locuri de muncă locale', value: locuri_munca, unit: 'loc', direction: 'positive' },
      { id: 'traf', label: 'Reducere viteză/trafic tranzit', value: -trafic_redus, unit: '%', direction: 'positive' },
      { id: 'lung', label: 'Lungime coridor', value: lungime_m, unit: 'm', direction: 'neutral' },
      { id: 'arie', label: 'Suprafață reconfigurată', value: Math.round(arie_mp), unit: 'mp', direction: 'neutral' }
    ];
    r.mapLayers = [
      { id: 'um-corridor', type: 'line', beforePaint: { 'line-color': '#888780', 'line-width': 3, 'line-opacity': 0.6 }, afterPaint: { 'line-color': '#1D9E75', 'line-width': 9, 'line-opacity': 0.85 } }
    ];
    r.documentContent = {
      siduSection: {
        projectTitle: 'Coridor urban mixt — reactivarea unui bulevard ca stradă a orașului',
        description: 'Proiectul transformă un coridor stradal de ' + roN(lungime_m) + ' m lungime și ' + latime_m + ' m lățime din municipiul Iași dintr-o arteră dominată de traficul de tranzit într-o stradă urbană vie, cu funcțiuni mixte (locuire la etaje, comerț și servicii la parter) și mobilitate echilibrată între moduri. Reconfigurarea vizează activarea a aproximativ ' + roN(fronturi) + ' m de front comercial (circa ' + fronturi_active_pct + '% din lungimea ambelor laturi), echivalentul a aproximativ ' + spatii + ' spații comerciale și de servicii la parter și estimativ ' + roN(locuri_munca) + ' locuri de muncă de proximitate. Prin reproporționarea profilului stradal — trotuare mai late, plantare de aliniament, locuri de staționare scurtă pentru comerț și, unde e cazul, bandă dedicată transportului — viteza de tranzit scade cu circa ' + trafic_redus + '%, crescând siguranța și confortul. Coridorul devine o coloană vertebrală a vieții urbane care leagă cartiere și polarizează activitatea economică, fiind în portofoliul SIDU un proiect de regenerare cu impact economic și social; corelarea cu PMUD (reechilibrarea profilului) și transpunerea în PUG (funcțiuni mixte obligatorii la parter, regim de aliniere) sunt esențiale pentru aplicabilitate.',
        justification: 'Bulevardele tratate exclusiv ca artere de tranzit „rup" orașul și sufocă comerțul stradal. Reconfigurarea ca stradă mixtă crește valoarea imobiliară, ocuparea parterurilor și siguranța rutieră.',
        costEstimate: (Math.round(arie_mp * 120 / 1000000 * 10) / 10) + ' M€ – ' + (Math.round(arie_mp * 200 / 1000000 * 10) / 10) + ' M€ (reamenajare profil stradal, 120–200 €/mp)',
        timeline: 'Termen mediu (2027–2031): PUZ coridor + execuție pe tronsoane',
        legalBasis: 'Legea 350/2001; HG 874/2019 — PMUD; norme tehnice profil stradal',
        indicators: ['Front comercial activ: ' + roN(fronturi) + ' m (' + fronturi_active_pct + '%)', 'Spații comerciale/servicii: ' + spatii, 'Locuri de muncă locale: ' + roN(locuri_munca), 'Reducere viteză tranzit: −' + trafic_redus + '%']
      },
      masterplanSection: {
        interventionType: 'Reconfigurare profil stradal + activare fronturi (coridor mixt)',
        affectedArea: '~' + roN(arie_mp) + ' mp (' + roN(lungime_m) + ' m × ' + latime_m + ' m)',
        phasing: ['Faza 0 (6 luni): PUZ coridor + studiu de trafic și fronturi', 'Faza 1 (12 luni): tronson pilot reamenajat (trotuare + plantare)', 'Faza 2 (24 luni): extindere pe toată lungimea + activare parteruri', 'Faza 3: monitorizare ocupare comercială și siguranță'],
        designPrinciples: ['Funcțiuni mixte obligatorii la parter', 'Trotuare late, plantare de aliniament continuă', 'Reechilibrarea spațiului: mai puțin carosabil de tranzit', 'Aliniere la stradă și fronturi continue']
      },
      pmudSection: {
        measureType: 'Reproporționarea profilului stradal în favoarea modurilor active și transportului',
        trafficImpact: 'Calmarea traficului de tranzit; viteză −' + trafic_redus + '%',
        modalShift: '+pietonal/ciclistic pe coridor; staționare auto reorganizată pentru comerț',
        infrastructureNeeded: ['Trotuare ≥ 3 m + plantare de aliniament', 'Treceri de pietoni dese și sigure', 'Bandă/stații transport public unde e cazul', 'Locuri de oprire scurtă pentru aprovizionare comerț']
      }
    };
    return r;
  }

  // ── SPONGE CITY ──
  function calculateSponge(p) {
    var suprafata_mp = p.suprafata_mp, impermeabil_actual_pct = p.impermeabil_actual_pct, tinta_permeabil_pct = p.tinta_permeabil_pct;
    var permeabil_nou = suprafata_mp * Math.max(0, tinta_permeabil_pct - (100 - impermeabil_actual_pct)) / 100;
    var apa_retinuta = Math.round(permeabil_nou * 0.04);
    var risc_redus = Math.min(60, tinta_permeabil_pct);
    var verde = Math.round(permeabil_nou * 0.6);
    var racire = Math.min(3, permeabil_nou / 10000 * 0.5);
    var r = CR('sponge', 'Sponge City — oraș-burete', p);
    r.metrics = [
      { id: 'apa', label: 'Apă pluvială reținută', value: apa_retinuta, unit: 'mc/eveniment', direction: 'positive' },
      { id: 'perm', label: 'Suprafață permeabilă nouă', value: Math.round(permeabil_nou), unit: 'mp', direction: 'positive' },
      { id: 'risc', label: 'Reducere risc inundație pluvială', value: -risc_redus, unit: '%', direction: 'positive' },
      { id: 'verde', label: 'Verde nou (infrastructură verde)', value: verde, unit: 'mp', direction: 'positive' },
      { id: 'racire', label: 'Răcire UHI', value: -racire, unit: '°C', direction: 'positive' },
      { id: 'tinta', label: 'Țintă permeabilitate', value: tinta_permeabil_pct, unit: '%', direction: 'neutral' }
    ];
    r.mapLayers = [
      { id: 'um-sponge', type: 'circle', beforePaint: { 'circle-radius': 5, 'circle-color': '#888780', 'circle-opacity': 0.25 }, afterPaint: { 'circle-radius': 22, 'circle-color': '#378ADD', 'circle-opacity': 0.5 } }
    ];
    r.documentContent = {
      siduSection: {
        projectTitle: 'Oraș-burete (Sponge City) — infrastructură verde-albastră pentru apă pluvială',
        description: 'Proiectul aplică principiul „orașului-burete" (sponge city, Kongjian Yu / Turenscape) pe o suprafață de ' + roN(suprafata_mp) + ' mp din municipiul Iași, cu un grad actual de impermeabilizare de aproximativ ' + impermeabil_actual_pct + '%. Obiectivul este creșterea permeabilității țesutului urban până la o țintă de ' + tinta_permeabil_pct + '%, prin infrastructură verde-albastră: grădini de ploaie, șanțuri înierbate (swales), pavaje permeabile, acoperișuri și fațade verzi, bazine de retenție vegetalizate și redeschiderea suprafețelor naturale de infiltrare. Intervenția adaugă aproximativ ' + roN(permeabil_nou) + ' mp de suprafață permeabilă nouă, capabilă să rețină și să infiltreze în jur de ' + roN(apa_retinuta) + ' mc de apă pluvială per eveniment major de precipitații, reducând astfel riscul de inundație pluvială urbană cu până la ' + risc_redus + '% și descărcarea pe rețeaua de canalizare. Pe lângă gestionarea apei, proiectul generează circa ' + roN(verde) + ' mp de spațiu verde nou și o răcire estimată de ' + racire.toFixed(1) + '°C în zilele caniculare, contribuind la atenuarea insulei de căldură. În portofoliul SIDU este un proiect de adaptare la schimbările climatice, corelat cu Masterplanul (spații verzi) și transpus în PUG prin coeficienți minimi de permeabilitate și regim al apelor pluviale.',
        justification: 'Impermeabilizarea excesivă a orașelor produce inundații pluviale la ploi torențiale (tot mai frecvente) și insule de căldură. Soluțiile bazate pe natură sunt mai ieftine și mai reziliente decât extinderea canalizării.',
        costEstimate: (Math.round(permeabil_nou * 60 / 1000000 * 10) / 10) + ' M€ – ' + (Math.round(permeabil_nou * 120 / 1000000 * 10) / 10) + ' M€ (infrastructură verde-albastră, 60–120 €/mp)',
        timeline: 'Termen mediu (2027–2032): proiectare + execuție etapizată pe bazine de risc',
        legalBasis: 'OUG 195/2005 (mediu); Legea 350/2001; HG privind gospodărirea apelor; Directiva UE 2007/60 inundații',
        indicators: ['Permeabilitate: ' + (100 - impermeabil_actual_pct) + '% → ' + tinta_permeabil_pct + '%', 'Apă reținută: ~' + roN(apa_retinuta) + ' mc/eveniment', 'Reducere risc inundație pluvială: −' + risc_redus + '%', 'Verde nou: ' + roN(verde) + ' mp; răcire −' + racire.toFixed(1) + '°C']
      },
      masterplanSection: {
        interventionType: 'Infrastructură verde-albastră (grădini de ploaie, swales, pavaje permeabile)',
        affectedArea: '~' + roN(suprafata_mp) + ' mp',
        phasing: ['Faza 0 (6 luni): cartarea bazinelor de risc pluvial + proiectare SbN', 'Faza 1 (12 luni): grădini de ploaie + pavaje permeabile pilot', 'Faza 2 (24 luni): rețea de swales + bazine de retenție vegetalizate', 'Faza 3: monitorizare infiltrare și întreținere vegetație'],
        designPrinciples: ['Reține–infiltrează–reutilizează apa la sursă', 'Soluții bazate pe natură înainte de soluții „gri"', 'Vegetație nativă rezistentă la secetă și exces de apă', 'Multifuncționalitate: apă + verde + recreere']
      },
      pmudSection: {
        measureType: 'Pavaje permeabile și verde pe coridoare (componentă de mediu a mobilității)',
        trafficImpact: 'Neutru pe capacitate; reduce băltirea și întreruperile la ploi torențiale',
        modalShift: 'Indirect: trasee pietonale/cicliste mai confortabile și umbrite',
        infrastructureNeeded: ['Pavaje permeabile pe parcaje și trasee secundare', 'Swales de aliniament pe coridoare', 'Grădini de ploaie la intersecții', 'Decolmatare/redeschidere suprafețe de infiltrare']
      }
    };
    return r;
  }

  // ── geometrie reprezentativă pe hartă (cerc/linie centrat pe map center) ──
  function addModelToMap(mapInstance, center, modelId, sizeM) {
    if (!mapInstance || !center) return;
    var L = (G.MODEL_LAYERS && G.MODEL_LAYERS[modelId]) || null;
    var dLat = sizeM / 111000, dLng = sizeM / (111000 * Math.cos(center.lat * Math.PI / 180));
    var src, data, layer;
    var calcId = { city15: 'um-iso', tod: 'um-tod', sponge: 'um-sponge', corridor: 'um-corridor' }[modelId];
    if (modelId === 'corridor') {
      data = { type: 'Feature', geometry: { type: 'LineString', coordinates: [[center.lng - dLng * 0.5, center.lat], [center.lng + dLng * 0.5, center.lat]] }, properties: {} };
      layer = { id: calcId, type: 'line', source: calcId + '-src', paint: { 'line-color': '#888780', 'line-width': 3, 'line-opacity': 0.6 } };
    } else {
      data = { type: 'Feature', geometry: { type: 'Point', coordinates: [center.lng, center.lat] }, properties: {} };
      layer = { id: calcId, type: 'circle', source: calcId + '-src', paint: { 'circle-radius': 6, 'circle-color': '#888780', 'circle-opacity': 0.25 } };
    }
    try { if (mapInstance.getSource(calcId + '-src')) mapInstance.getSource(calcId + '-src').setData(data); else mapInstance.addSource(calcId + '-src', { type: 'geojson', data: data }); } catch (e) {}
    try { if (!mapInstance.getLayer(calcId)) mapInstance.addLayer(layer); } catch (e) {}
  }
  function removeModelFromMap(mapInstance) {
    if (!mapInstance) return;
    ['um-iso', 'um-tod', 'um-sponge', 'um-corridor'].forEach(function (id) {
      try { if (mapInstance.getLayer(id)) mapInstance.removeLayer(id); } catch (e) {}
      try { if (mapInstance.getSource(id + '-src')) mapInstance.removeSource(id + '-src'); } catch (e) {}
    });
  }

  // ── registru: calc + schema parametri + dimensiune hartă ──
  var REG = {
    city15: { calc: calculate15Min, color: '#BA7517', icon: '⏱️', title: 'Oraș 15 Minute', size: function (p) { return p.raza_m; }, fields: [{ k: 'raza_m', l: 'Rază proximitate (m)', v: 800 }, { k: 'pop_zona', l: 'Populație zonă (loc)', v: 6000 }, { k: 'servicii_lipsa', l: 'Servicii deficitare (buc)', v: 5 }] },
    tod: { calc: calculateTOD, color: '#534AB7', icon: '🚉', title: 'TOD', size: function (p) { return p.raza_m; }, fields: [{ k: 'raza_m', l: 'Rază captare stație (m)', v: 800 }, { k: 'densitate_loc_ha', l: 'Densitate țintă (loc/ha)', v: 250 }, { k: 'frecventa_min', l: 'Frecvență transport (min)', v: 6 }] },
    corridor: { calc: calculateCorridor, color: '#1D9E75', icon: '🏪', title: 'Coridor Mixt', size: function (p) { return p.lungime_m; }, fields: [{ k: 'lungime_m', l: 'Lungime coridor (m)', v: 1200 }, { k: 'fronturi_active_pct', l: '% fronturi active', v: 70 }, { k: 'latime_m', l: 'Lățime profil (m)', v: 26 }] },
    sponge: { calc: calculateSponge, color: '#378ADD', icon: '💧', title: 'Sponge City', size: function (p) { return Math.sqrt(p.suprafata_mp); }, fields: [{ k: 'suprafata_mp', l: 'Suprafață zonă (mp)', v: 50000 }, { k: 'impermeabil_actual_pct', l: '% impermeabil actual', v: 75 }, { k: 'tinta_permeabil_pct', l: '% țintă permeabil', v: 45 }] }
  };
  var _params = {}, _ov = null, _curId = null;
  Object.keys(REG).forEach(function (id) { _params[id] = {}; REG[id].fields.forEach(function (f) { _params[id][f.k] = f.v; }); });

  function renderUrbanModelDialog(modelId) {
    var cfg = REG[modelId]; if (!cfg) { console.warn('003: model necunoscut ' + modelId); return; }
    closeUrbanModelDialog(); _curId = modelId;
    var ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(2,6,16,.7);z-index:9100;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)';
    ov.onclick = function (e) { if (e.target === ov) closeUrbanModelDialog(); };
    var box = document.createElement('div'); box.id = 'um-dialog';
    box.style.cssText = 'position:relative;background:#0b1424;color:#e6edf7;width:min(560px,96vw);max-height:92vh;overflow:auto;border:1px solid ' + cfg.color + '66;border-radius:14px;font-family:system-ui,sans-serif;padding:18px 20px';
    ov.appendChild(box); document.body.appendChild(ov); _ov = ov;
    box.innerHTML =
      '<div id="um-selector" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px"></div>' +
      '<div style="display:flex;align-items:center;gap:8px"><span style="background:' + cfg.color + ';width:16px;height:16px;border-radius:3px;display:inline-block"></span><h3 style="margin:0;font-size:17px;font-weight:700">' + cfg.icon + ' ' + cfg.title + '</h3></div>' +
      '<p style="margin:4px 0 12px;font-size:12px;opacity:0.55">Model parametric · reflectat în SIDU, Masterplan, PMUD · complementar SimLab (simulare)</p>' +
      '<button onclick="closeUrbanModelDialog()" style="position:absolute;top:12px;right:14px;background:none;border:0;color:#94a3b8;font-size:20px;cursor:pointer">×</button>' +
      '<div style="font-size:11px;font-weight:700;color:' + cfg.color + ';letter-spacing:1px;margin-bottom:10px">PARAMETRI</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px">' +
      cfg.fields.map(function (f) { return '<div><label style="font-size:11px;opacity:0.65;display:block;margin-bottom:4px">' + f.l + '</label><input type="number" value="' + _params[modelId][f.k] + '" oninput="_umSetParam(\'' + f.k + '\',this.value)" style="width:100%;padding:8px 10px;border-radius:6px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:inherit;font-size:13px;box-sizing:border-box"></div>'; }).join('') + '</div>' +
      '<div style="display:flex;gap:10px;margin-bottom:16px"><button class="uxc-btn uxc-btn--primary" style="flex:1" onclick="runUrbanModelCalc()">▶ Calculează + desenează</button><button class="uxc-btn uxc-btn--sec" id="um-save-btn" style="display:none" onclick="saveUrbanModelScenario()">💾 Salvează</button></div>' +
      '<div id="um-slider" style="display:none;margin-bottom:16px;padding:12px;background:rgba(255,255,255,0.04);border-radius:8px"></div>' +
      '<div id="um-metrics" style="display:none;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px"></div>' +
      '<div id="um-export-wrap" style="display:none"><button class="uxc-btn uxc-btn--sec" style="width:100%;color:#93c5fd;border-color:rgba(46,117,182,0.4);background:rgba(46,117,182,0.1)" onclick="_toggleUmExport()">▼ Export SIDU / Masterplan / PMUD</button><div id="um-export" style="display:none;margin-top:8px"></div></div>' +
      '<p style="font-size:11px;opacity:0.35;margin-top:12px;line-height:1.4">Model orientativ. Pentru simulare de capacitate și scenarii detaliate: SimLab.</p>';
    G.renderModelSelector('um-selector', modelId);
  }
  function _umSetParam(k, v) { if (_curId) _params[_curId][k] = parseFloat(v) || 0; }
  function runUrbanModelCalc() {
    var cfg = REG[_curId]; if (!cfg) return;
    var result = cfg.calc(_params[_curId]);
    G.UrbanModelsStore.setActive(result);
    var mapInst = G.map, center = mapInst ? mapInst.getCenter() : null;
    if (center) { addModelToMap(mapInst, { lat: center.lat, lng: center.lng }, _curId, cfg.size(_params[_curId])); G.initMapTransitionListener(mapInst); }
    G.UrbanModelsStore.setTransition(100);
    var sl = document.getElementById('um-slider'); if (sl) { sl.style.display = 'block'; G.renderBeforeAfterSlider('um-slider', 100, false); }
    var me = document.getElementById('um-metrics');
    if (me) {
      me.style.display = 'grid';
      me.innerHTML = result.metrics.map(function (m) {
        var disp = (m.unit === '%' || m.unit === '°C') ? ((m.value > 0 ? '+' : '') + m.value + m.unit) : (m.value > 0 ? roN(m.value) + ' ' + m.unit : m.value + ' ' + m.unit);
        return '<div style="background:rgba(255,255,255,0.05);border-radius:8px;padding:10px 12px;text-align:center"><div style="font-size:15px;font-weight:700;color:' + (m.direction === 'positive' ? '#97C459' : m.direction === 'neutral' ? '#94a3b8' : '#F97316') + '">' + disp + '</div><div style="font-size:11px;opacity:0.55;margin-top:2px">' + m.label + '</div></div>';
      }).join('');
    }
    ['um-export-wrap', 'um-save-btn'].forEach(function (id) { var el = document.getElementById(id); if (el) el.style.display = id === 'um-save-btn' ? 'inline-block' : 'block'; });
  }
  function saveUrbanModelScenario() {
    var r = G.UrbanModelsStore.activeResult; if (!r) return;
    G.UrbanModelsStore.save(r.modelName + ' — ' + new Date().toLocaleDateString('ro'), r);
    var b = document.getElementById('um-save-btn'); if (b) { b.textContent = '✓ Salvat'; setTimeout(function () { b.textContent = '💾 Salvează'; }, 2000); }
  }
  function _toggleUmExport() {
    var el = document.getElementById('um-export'), btn = document.querySelector('#um-export-wrap .uxc-btn'); if (!el) return;
    var open = el.style.display === 'none'; el.style.display = open ? 'block' : 'none';
    if (btn) btn.textContent = open ? '▲ Ascunde' : '▼ Export SIDU / Masterplan / PMUD';
    if (open && G.UrbanModelsStore.activeResult) G.renderDocumentExport('um-export', G.UrbanModelsStore.activeResult.documentContent);
  }
  function closeUrbanModelDialog() { if (_ov) { try { _ov.remove(); } catch (e) {} _ov = null; } try { removeModelFromMap(G.map); } catch (e) {} }

  G.calculate15Min = calculate15Min; G.calculateTOD = calculateTOD; G.calculateCorridor = calculateCorridor; G.calculateSponge = calculateSponge;
  G.renderUrbanModelDialog = renderUrbanModelDialog; G.runUrbanModelCalc = runUrbanModelCalc; G.saveUrbanModelScenario = saveUrbanModelScenario;
  G._toggleUmExport = _toggleUmExport; G._umSetParam = _umSetParam; G.closeUrbanModelDialog = closeUrbanModelDialog;
})(window);
