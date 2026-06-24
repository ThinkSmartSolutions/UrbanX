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

  // ── 3-30-300 (Konijnendijk 2021) — 3 copaci vizibili / 30% canopy / 300m la parc ──
  function calculate330300(p) {
    var canopy_pct = p.canopy_pct, copaci_vizibili = p.copaci_vizibili, dist_parc_m = p.dist_parc_m, pop_zona = p.pop_zona;
    var c1 = copaci_vizibili >= 3, c2 = canopy_pct >= 30, c3 = dist_parc_m <= 300;
    var indeplinite = (c1 ? 1 : 0) + (c2 ? 1 : 0) + (c3 ? 1 : 0);
    var scor = Math.round(indeplinite / 3 * 100);
    var deficit_canopy = Math.max(0, 30 - canopy_pct);
    var racire = Math.round(Math.min(3, canopy_pct / 30 * 1.5) * 10) / 10;
    // copaci de plantat ca să atingă 30% canopy pe zonă (~50 mp coronament/arbore matur)
    var arie_lipsa_mp = pop_zona > 0 ? Math.round(deficit_canopy / 100 * (pop_zona * 35)) : 0;
    var copaci_necesari = Math.round(arie_lipsa_mp / 50);
    var pop_fara_parc = c3 ? 0 : Math.round(pop_zona * Math.min(0.9, (dist_parc_m - 300) / 700));
    var r = CR('r330300', 'Regula 3-30-300', p);
    r.metrics = [
      { id: 'scor', label: 'Conformitate 3-30-300', value: scor, unit: '%', direction: 'positive' },
      { id: 'crit', label: 'Criterii îndeplinite (din 3)', value: indeplinite, unit: '/3', direction: 'positive' },
      { id: 'canopy', label: 'Deficit canopy la 30%', value: -Math.round(deficit_canopy), unit: 'pp', direction: 'positive' },
      { id: 'copaci', label: 'Arbori de plantat', value: copaci_necesari, unit: 'buc', direction: 'neutral' },
      { id: 'pop', label: 'Locuitori fără parc < 300m', value: -pop_fara_parc, unit: 'loc', direction: 'positive' },
      { id: 'racire', label: 'Răcire din canopy', value: -racire, unit: '°C', direction: 'positive' }
    ];
    r.mapLayers = [
      { id: 'um-330', type: 'circle', beforePaint: { 'circle-radius': 6, 'circle-color': '#888780', 'circle-opacity': 0.25 }, afterPaint: { 'circle-radius': 30, 'circle-color': '#2E9E5B', 'circle-opacity': 0.5 } }
    ];
    r.documentContent = {
      siduSection: {
        projectTitle: 'Regula 3-30-300 — infrastructură verde la nivel de cartier (Konijnendijk)',
        description: 'Proiectul aplică regula 3-30-300 (Cecil Konijnendijk, 2021), standard internațional de acces la natură urbană, asupra unei zone locuite de aproximativ ' + roN(pop_zona) + ' de persoane din municipiul Iași. Regula impune trei praguri obiective: fiecare locuitor trebuie să vadă cel puțin 3 arbori maturi de la locuință/loc de muncă/școală, cartierul trebuie să aibă minimum 30% acoperire cu coronament arboricol (canopy), iar un spațiu verde public de cel puțin 0,5 ha trebuie să fie la maximum 300 m. Situația analizată îndeplinește ' + indeplinite + ' din 3 criterii (conformitate ' + scor + '%), cu un deficit de canopy de ' + Math.round(deficit_canopy) + ' puncte procentuale până la pragul de 30%. Intervenția propune plantarea a aproximativ ' + roN(copaci_necesari) + ' de arbori (aliniamente, scuaruri, curți), amenajarea/apropierea de spații verzi publice și verde de proximitate, reducând cu circa ' + pop_fara_parc + ' numărul locuitorilor fără parc accesibil la 300 m și generând o răcire estimată de ' + racire.toFixed(1) + '°C în zilele caniculare. În portofoliul SIDU este un proiect-cheie de sănătate publică și adaptare climatică, corelat cu Masterplanul (spații verzi) și transpus în PUG prin coeficient minim de spațiu verde și regim al plantațiilor de aliniament.',
        justification: 'Accesul la natură urbană are beneficii dovedite asupra sănătății mintale, răcirii și coeziunii sociale (OMS, IUCN). Regula 3-30-300 oferă praguri măsurabile, ușor de monitorizat și de transpus în reglementări.',
        costEstimate: (Math.round(copaci_necesari * 0.0006 * 10) / 10) + ' M€ – ' + (Math.round(copaci_necesari * 0.0012 * 10) / 10) + ' M€ (plantare + amenajări verzi, 600–1200 €/arbore matur cu întreținere)',
        timeline: 'Termen scurt (2026–2028): plantări de aliniament + scuaruri; mediu (2028–2032): parcuri de proximitate noi',
        legalBasis: 'Legea 24/2007 (spații verzi); OUG 195/2005 (mediu); HG 525/1996; standard OMS spații verzi',
        indicators: ['Conformitate 3-30-300: ' + scor + '%', 'Canopy: ' + canopy_pct + '% → țintă 30%', 'Arbori plantați: ~' + roN(copaci_necesari), 'Locuitori cu parc < 300m: în creștere; răcire −' + racire.toFixed(1) + '°C']
      },
      masterplanSection: {
        interventionType: 'Infrastructură verde de cartier (aliniamente, scuaruri, parcuri de proximitate)',
        affectedArea: 'cartier ~' + roN(pop_zona) + ' loc.',
        phasing: ['Faza 0 (4 luni): cartare canopy (GIS) + deficit acces parc 300m', 'Faza 1 (12 luni): plantări de aliniament + curți de școli/instituții', 'Faza 2 (24 luni): parcuri de proximitate ≥ 0,5 ha în zonele deficitare', 'Faza 3: monitorizare canopy și întreținere'],
        designPrinciples: ['Arbori maturi vizibili din fiecare locuință (3)', 'Coronament ≥ 30% pe cartier', 'Parc public ≥ 0,5 ha la ≤ 300 m', 'Specii native rezistente la secetă și UHI']
      },
      pmudSection: {
        measureType: 'Verde de aliniament și parcuri de proximitate (componentă de mediu și confort)',
        trafficImpact: 'Neutru pe capacitate; umbrire și confort termic pe traseele pietonale/cicliste',
        modalShift: 'Indirect: trasee mai atractive pentru mers pe jos și bicicletă',
        infrastructureNeeded: ['Aliniamente de arbori pe coridoarele de mobilitate activă', 'Scuaruri și mici parcuri la noduri', 'Sol și spațiu subteran pentru rădăcini', 'Sistem de irigare/întreținere']
      }
    };
    return r;
  }

  // ── SDG 11.7.1 — Spațiu public deschis (UN-Habitat) ──
  function calculateSDG117(p) {
    var construit_ha = p.construit_ha, spatiu_public_ha = p.spatiu_public_ha, pop_zona = p.pop_zona, acces_400m_pct = p.acces_400m_pct;
    var share = construit_ha > 0 ? Math.round(spatiu_public_ha / construit_ha * 1000) / 10 : 0; // % din suprafața construită
    var mp_loc = pop_zona > 0 ? Math.round(spatiu_public_ha * 10000 / pop_zona * 10) / 10 : 0;
    var deficit_share = Math.max(0, 15 - share);       // țintă non-stradal UN-Habitat ~15%
    var deficit_oms = Math.max(0, 26 - mp_loc);        // țintă OMS ~26 mp/loc
    var pop_fara_acces = Math.round(pop_zona * Math.max(0, 100 - acces_400m_pct) / 100);
    var r = CR('sdg117', 'SDG 11.7 — Spațiu public', p);
    r.metrics = [
      { id: 'share', label: 'Spațiu public din suprafața construită', value: share, unit: '%', direction: 'positive' },
      { id: 'mploc', label: 'Spațiu public / locuitor', value: mp_loc, unit: 'mp/loc', direction: 'positive' },
      { id: 'acces', label: 'Populație cu acces < 400m', value: acces_400m_pct, unit: '%', direction: 'positive' },
      { id: 'fara', label: 'Locuitori fără acces < 400m', value: -pop_fara_acces, unit: 'loc', direction: 'positive' },
      { id: 'd1', label: 'Deficit la țintă 15%', value: -Math.round(deficit_share * 10) / 10, unit: 'pp', direction: 'positive' },
      { id: 'd2', label: 'Deficit la 26 mp/loc (OMS)', value: -Math.round(deficit_oms * 10) / 10, unit: 'mp/loc', direction: 'positive' }
    ];
    r.mapLayers = [
      { id: 'um-sdg117', type: 'circle', beforePaint: { 'circle-radius': 7, 'circle-color': '#888780', 'circle-opacity': 0.22 }, afterPaint: { 'circle-radius': 26, 'circle-color': '#C2410C', 'circle-opacity': 0.45 } }
    ];
    r.documentContent = {
      siduSection: {
        projectTitle: 'Spațiu public pentru toți — indicator SDG 11.7.1 (UN-Habitat)',
        description: 'Proiectul vizează indicatorul ONU 11.7.1 (Obiectivul de Dezvoltare Durabilă 11 — orașe durabile): proporția suprafeței construite alocată spațiului public deschis pentru toți și ponderea populației cu acces la un spațiu public la maximum 400 m. Pe zona analizată (' + roN(construit_ha) + ' ha construit, ' + roN(pop_zona) + ' locuitori), spațiul public deschis reprezintă aproximativ ' + share + '% din suprafața construită și ' + mp_loc + ' mp/locuitor, iar circa ' + acces_400m_pct + '% din populație are acces la un spațiu public în 400 m. Față de țintele de referință (UN-Habitat recomandă ca spațiul public — inclusiv străzile — să atingă o pondere semnificativă din oraș, iar componenta non-stradală ~15%; OMS recomandă ~26 mp spațiu verde/locuitor), rezultă un deficit de ' + (Math.round(deficit_share * 10) / 10) + ' pp și respectiv ' + (Math.round(deficit_oms * 10) / 10) + ' mp/loc. Aproximativ ' + roN(pop_fara_acces) + ' de locuitori nu au acces la 400 m. Intervenția propune crearea/deschiderea de spații publice (scuaruri, piațete, maluri, curți deschise) prioritar în zonele deficitare. În SIDU este un proiect de echitate spațială și calitate a vieții, corelat cu Masterplanul și transpus în PUG prin rezervarea de spații publice.',
        justification: 'Spațiul public accesibil tuturor este un determinant al sănătății, coeziunii și democrației urbane (UN-Habitat). Indicatorul SDG 11.7.1 este măsurabil din date OSM + populație și permite monitorizarea echității.',
        costEstimate: (Math.round((deficit_oms * pop_zona / 10000) * 80 / 1000 * 10) / 10) + ' M€ – ' + (Math.round((deficit_oms * pop_zona / 10000) * 150 / 1000 * 10) / 10) + ' M€ (amenajare spații publice, 80–150 €/mp)',
        timeline: 'Termen scurt-mediu (2026–2031): deschidere + amenajare spații publice pe zone deficitare',
        legalBasis: 'Agenda 2030 ONU (SDG 11.7); Legea 350/2001; Legea 24/2007; Noua Cartă de la Leipzig',
        indicators: ['Spațiu public / construit: ' + share + '%', 'Spațiu public/loc: ' + mp_loc + ' mp', 'Acces < 400m: ' + acces_400m_pct + '%', 'Locuitori fără acces: ' + roN(pop_fara_acces)]
      },
      masterplanSection: {
        interventionType: 'Creare și deschidere de spații publice (scuaruri, piațete, maluri)',
        affectedArea: '~' + roN(construit_ha) + ' ha construit; ' + roN(pop_zona) + ' loc.',
        phasing: ['Faza 0 (6 luni): cartare SDG 11.7.1 (OSM + populație) și zone deficitare', 'Faza 1 (12 luni): piațete și scuaruri de proximitate pilot', 'Faza 2 (24 luni): rețea de spații publice + maluri/curți deschise', 'Faza 3: monitorizare acces 400m și utilizare'],
        designPrinciples: ['Acces universal la ≤ 400 m', 'Spații publice de calitate, sigure, incluzive', 'Continuitate pietonală între spații', 'Multifuncționalitate: recreere + verde + eveniment']
      },
      pmudSection: {
        measureType: 'Spații publice conectate la rețeaua pietonală',
        trafficImpact: 'Reducerea spațiului auto în favoarea spațiului public; calmarea traficului local',
        modalShift: 'Încurajează mersul pe jos prin destinații publice de proximitate',
        infrastructureNeeded: ['Trasee pietonale continue spre spațiile publice', 'Treceri sigure și accesibilitate universală', 'Mobilier urban și umbrire', 'Conexiuni cu stațiile de transport']
      }
    };
    return r;
  }

  // ── WALK SCORE (walkability, proximitate amenități + conectivitate) ──
  function calculateWalkScore(p) {
    var amenitati = p.amenitati, dist_medie_m = p.dist_medie_m, intersectii_km2 = p.intersectii_km2, pop_zona = p.pop_zona;
    // distance-decay: amenități în 5–15 min de mers; penalizare distanță + bonus conectivitate
    var ampts = Math.min(60, amenitati * 3.2);
    var distpts = Math.max(0, 25 * (1 - Math.min(1, dist_medie_m / 800)));
    var connpts = Math.min(15, intersectii_km2 / 10);
    var scor = Math.max(0, Math.min(100, Math.round(ampts + distpts + connpts)));
    var categorie = scor >= 90 ? 'Paradisul pietonului' : scor >= 70 ? 'Foarte pietonal' : scor >= 50 ? 'Parțial pietonal' : scor >= 25 ? 'Dependent de auto' : 'Total dependent de auto';
    var auto_redus = Math.round(Math.min(30, (scor - 40) * 0.4));
    if (auto_redus < 0) auto_redus = 0;
    var r = CR('walkscore', 'Walk Score', p);
    r.metrics = [
      { id: 'scor', label: 'Walk Score', value: scor, unit: '/100', direction: 'positive' },
      { id: 'cat', label: categorie, value: scor, unit: '', direction: 'neutral' },
      { id: 'amen', label: 'Amenități accesibile pe jos', value: amenitati, unit: 'buc', direction: 'positive' },
      { id: 'inter', label: 'Densitate intersecții', value: intersectii_km2, unit: '/km²', direction: 'positive' },
      { id: 'dist', label: 'Distanță medie la amenități', value: dist_medie_m, unit: 'm', direction: 'negative' },
      { id: 'auto', label: 'Potențial reducere auto', value: -auto_redus, unit: '%', direction: 'positive' }
    ];
    r.mapLayers = [
      { id: 'um-walk', type: 'circle', beforePaint: { 'circle-radius': 6, 'circle-color': '#888780', 'circle-opacity': 0.25 }, afterPaint: { 'circle-radius': 28, 'circle-color': '#0E7C5A', 'circle-opacity': 0.5 } }
    ];
    r.documentContent = {
      siduSection: {
        projectTitle: 'Walkability (Walk Score) — creșterea pietonabilității cartierului',
        description: 'Proiectul evaluează și îmbunătățește pietonabilitatea (Walk Score) unei zone din municipiul Iași cu aproximativ ' + roN(pop_zona) + ' de locuitori. Walk Score (metodologie consacrată internațional) măsoară accesul pe jos la amenitățile cotidiene, ponderat cu distanța (distance-decay), densitatea intersecțiilor și lungimea cvartalelor. Scorul actual estimat este ' + scor + '/100 (' + categorie + '), pe baza a aproximativ ' + amenitati + ' amenități accesibile pe jos, o distanță medie de ' + dist_medie_m + ' m și ' + intersectii_km2 + ' intersecții/km². Intervențiile (densificarea serviciilor la parter, trasee pietonale continue, sporirea conectivității prin pasaje și treceri) pot ridica scorul și pot reduce deplasările auto scurte cu circa ' + auto_redus + '%. În SIDU este un indicator transversal de calitate a vieții, corelat cu modelul „15 minute" și cu PMUD (mobilitate activă).',
        justification: 'Pietonabilitatea ridicată corelează cu sănătate publică mai bună, comerț local mai viu, valori imobiliare mai mari și emisii mai reduse. Walk Score este comparabil între orașe și ușor de monitorizat din date OSM.',
        costEstimate: 'variabil (amenajări pietonale + activare parteruri); componenta publică modestă, impact ridicat',
        timeline: 'Termen scurt (2026–2028): trasee pietonale + activare servicii de proximitate',
        legalBasis: 'Legea 350/2001; HG 874/2019 — PMUD; norme accesibilitate pietonală',
        indicators: ['Walk Score: ' + scor + '/100 (' + categorie + ')', 'Amenități pe jos: ' + amenitati, 'Densitate intersecții: ' + intersectii_km2 + '/km²', 'Reducere auto: −' + auto_redus + '%']
      },
      masterplanSection: {
        interventionType: 'Creșterea pietonabilității (amenități de proximitate + conectivitate)',
        affectedArea: 'cartier ~' + roN(pop_zona) + ' loc.',
        phasing: ['Faza 0: calcul Walk Score (OSM) + identificare deficite', 'Faza 1: trasee pietonale continue + treceri sigure', 'Faza 2: activare parteruri + amenități de proximitate', 'Faza 3: monitorizare scor'],
        designPrinciples: ['Amenități la distanță de mers pe jos', 'Rețea densă de străzi și treceri', 'Cvartale scurte, fronturi active', 'Trasee sigure, umbrite, accesibile']
      },
      pmudSection: {
        measureType: 'Promovarea mersului pe jos prin proximitate și conectivitate',
        trafficImpact: 'Reducerea deplasărilor auto scurte cu ~' + auto_redus + '%',
        modalShift: '+pietonal pe distanțe < 1 km',
        infrastructureNeeded: ['Trotuare continue și late', 'Treceri de pietoni dese și sigure', 'Pasaje/scurtături pietonale', 'Iluminat și mobilier urban']
      }
    };
    return r;
  }

  // ── GREEN VIEW INDEX (verde stradal vizibil, street-level) ──
  function calculateGVI(p) {
    var gvi_actual_pct = p.gvi_actual_pct, strazi_km = p.strazi_km, arbori_aliniament = p.arbori_aliniament, pop_zona = p.pop_zona;
    var tinta = 25; // GVI „bun" ~ 25–30% (literatura street-level greenery)
    var deficit = Math.max(0, tinta - gvi_actual_pct);
    // ~1 arbore matur la 8 m de stradă pentru aliniament continuu pe ambele laturi
    var arbori_tinta = Math.round(strazi_km * 1000 / 8 * 2);
    var arbori_de_plantat = Math.max(0, arbori_tinta - arbori_aliniament);
    var racire = Math.round(Math.min(2.5, gvi_actual_pct / tinta * 1.5) * 10) / 10;
    var calitate = gvi_actual_pct >= 25 ? 'verde (excelent)' : gvi_actual_pct >= 15 ? 'moderat' : 'sărac în verde';
    var r = CR('gvi', 'Green View Index', p);
    r.metrics = [
      { id: 'gvi', label: 'Green View Index actual', value: gvi_actual_pct, unit: '%', direction: 'positive' },
      { id: 'cal', label: 'Calitate percepută: ' + calitate, value: gvi_actual_pct, unit: '', direction: 'neutral' },
      { id: 'def', label: 'Deficit la țintă 25%', value: -Math.round(deficit), unit: 'pp', direction: 'positive' },
      { id: 'plant', label: 'Arbori de aliniament de plantat', value: arbori_de_plantat, unit: 'buc', direction: 'neutral' },
      { id: 'strazi', label: 'Lungime străzi tratate', value: strazi_km, unit: 'km', direction: 'neutral' },
      { id: 'racire', label: 'Răcire/umbrire', value: -racire, unit: '°C', direction: 'positive' }
    ];
    r.mapLayers = [
      { id: 'um-gvi', type: 'line', beforePaint: { 'line-color': '#888780', 'line-width': 3, 'line-opacity': 0.55 }, afterPaint: { 'line-color': '#3FA34D', 'line-width': 9, 'line-opacity': 0.85 } }
    ];
    r.documentContent = {
      siduSection: {
        projectTitle: 'Green View Index — verde stradal vizibil la nivelul ochiului',
        description: 'Proiectul vizează Green View Index (GVI), indicator street-level care măsoară procentul de vegetație vizibilă din perspectiva pietonului (din imagini panoramice / vedere de stradă). GVI completează indicatorii „de sus" (canopy) cu percepția reală a verdelui la nivelul ochiului, corelată cu starea de bine, confortul termic și utilizarea spațiului public. Pe rețeaua analizată (' + strazi_km + ' km de stradă, ' + roN(pop_zona) + ' locuitori), GVI actual este de aproximativ ' + gvi_actual_pct + '% (' + calitate + '), față de un prag recomandat de ~25%. Acoperirea deficitului de ' + Math.round(deficit) + ' pp presupune plantarea a circa ' + roN(arbori_de_plantat) + ' de arbori de aliniament și verde vertical/pe fațade, cu o răcire estimată de ' + racire.toFixed(1) + '°C. În SIDU este un proiect de calitate a spațiului public și adaptare climatică, complementar regulii 3-30-300.',
        justification: 'Verdele perceput la nivelul străzii influențează direct sănătatea mintală, confortul și mersul pe jos (studii GVI globale). Este măsurabil din street-view și permite prioritizarea plantărilor pe coridoarele cele mai „goale".',
        costEstimate: (Math.round(arbori_de_plantat * 0.0006 * 10) / 10) + ' M€ – ' + (Math.round(arbori_de_plantat * 0.0012 * 10) / 10) + ' M€ (aliniamente + verde vertical)',
        timeline: 'Termen scurt-mediu (2026–2031): plantări pe coridoarele cu GVI scăzut',
        legalBasis: 'Legea 24/2007 (spații verzi); Legea 350/2001; OUG 195/2005',
        indicators: ['GVI: ' + gvi_actual_pct + '% → țintă 25%', 'Arbori de aliniament: +' + roN(arbori_de_plantat), 'Străzi tratate: ' + strazi_km + ' km', 'Răcire: −' + racire.toFixed(1) + '°C']
      },
      masterplanSection: {
        interventionType: 'Verde stradal (aliniamente + verde vertical/fațade)',
        affectedArea: strazi_km + ' km străzi · ~' + roN(pop_zona) + ' loc.',
        phasing: ['Faza 0: calcul GVI pe rețea (street-view) + prioritizare coridoare', 'Faza 1: aliniamente pe coridoarele cu GVI < 10%', 'Faza 2: verde vertical + fațade verzi în zone dense', 'Faza 3: monitorizare GVI'],
        designPrinciples: ['Aliniamente continue pe ambele laturi', 'Specii cu coronament generos, rezistente urban', 'Verde vertical unde nu încap arbori', 'Continuitate vizuală a verdelui pe coridor']
      },
      pmudSection: {
        measureType: 'Verde de aliniament pe coridoarele de mobilitate activă',
        trafficImpact: 'Neutru pe capacitate; umbrire și confort pe trasee',
        modalShift: 'Indirect: trasee mai atractive pentru mers/bicicletă',
        infrastructureNeeded: ['Spațiu de plantare pe profil', 'Sol/structură pentru rădăcini', 'Irigare', 'Coordonare cu rețelele edilitare']
      }
    };
    return r;
  }

  // ── SPACE SYNTAX — Integrare (accesibilitate configurațională a rețelei) ──
  function calculateSpaceSyntax(p) {
    var segmente = p.segmente, conectivitate_medie = p.conectivitate_medie, lungime_retea_km = p.lungime_retea_km, intersectii = p.intersectii;
    // proxy normalizat de integrare: conectivitate medie + densitate intersecții (0..1)
    var dens = lungime_retea_km > 0 ? intersectii / lungime_retea_km : 0; // intersecții/km
    var integrare = Math.max(0, Math.min(1, (conectivitate_medie / 6) * 0.6 + (dens / 25) * 0.4));
    var integrare100 = Math.round(integrare * 1000) / 10;
    var core_pct = Math.round(Math.min(100, integrare * 100 * 0.5 + 10)); // % „nucleu de integrare"
    var miscare = Math.round(integrare * 100); // potențial de mișcare naturală pietonală
    var calitate = integrare >= 0.66 ? 'rețea bine integrată' : integrare >= 0.4 ? 'integrare medie' : 'rețea fragmentată';
    var r = CR('spacesyntax', 'Space Syntax — Integrare', p);
    r.metrics = [
      { id: 'integ', label: 'Integrare (normalizată)', value: integrare100, unit: '/100', direction: 'positive' },
      { id: 'cal', label: calitate, value: integrare100, unit: '', direction: 'neutral' },
      { id: 'core', label: 'Nucleu de integrare', value: core_pct, unit: '%', direction: 'positive' },
      { id: 'misc', label: 'Potențial mișcare pietonală', value: miscare, unit: '/100', direction: 'positive' },
      { id: 'conn', label: 'Conectivitate medie', value: conectivitate_medie, unit: 'racord', direction: 'positive' },
      { id: 'dens', label: 'Densitate intersecții', value: Math.round(dens), unit: '/km', direction: 'positive' }
    ];
    r.mapLayers = [
      { id: 'um-ss', type: 'line', beforePaint: { 'line-color': '#888780', 'line-width': 3, 'line-opacity': 0.55 }, afterPaint: { 'line-color': '#7C3AED', 'line-width': 9, 'line-opacity': 0.85 } }
    ];
    r.documentContent = {
      siduSection: {
        projectTitle: 'Space Syntax — integrarea configurațională a rețelei stradale (Hillier)',
        description: 'Proiectul aplică principii de Space Syntax (Bill Hillier, UCL) pentru a evalua cât de „integrată" este rețeaua stradală — adică cât de accesibilă și ușor de parcurs este fiecare stradă în raport cu întregul oraș. Integrarea ridicată prezice mișcare naturală pietonală mai mare, vitalitate economică și siguranță („eyes on the street"). Pe rețeaua analizată (' + roN(segmente) + ' segmente, ' + lungime_retea_km + ' km, conectivitate medie ' + conectivitate_medie + '), indicele normalizat de integrare este ' + integrare100 + '/100 (' + calitate + '), cu un nucleu de integrare de circa ' + core_pct + '% și un potențial de mișcare pietonală de ' + miscare + '/100. Intervențiile (deschiderea de străzi/pasaje, eliminarea fundăturilor, conectarea ansamblurilor izolate) cresc integrarea și activează comerțul stradal. În SIDU fundamentează prioritizarea coridoarelor și amplasarea funcțiunilor; este un proxy orientativ — analiza completă necesită un model axial/segmental calibrat.',
        justification: 'Configurarea rețelei (nu doar densitatea) determină unde apare mișcarea pietonală și viața urbană. Space Syntax oferă o bază obiectivă pentru a localiza centrele de activitate și a evita „insulele" izolate.',
        costEstimate: 'analitic (studiu de rețea); intervențiile de conectare variază — pasaje, deschideri de stradă',
        timeline: 'Termen mediu: studiu axial + intervenții de conectare pe etape',
        legalBasis: 'Legea 350/2001 (PUG/PUZ); norme tehnice rețea stradală',
        indicators: ['Integrare normalizată: ' + integrare100 + '/100', 'Nucleu de integrare: ' + core_pct + '%', 'Potențial mișcare: ' + miscare + '/100', 'Conectivitate medie: ' + conectivitate_medie]
      },
      masterplanSection: {
        interventionType: 'Creșterea integrării rețelei (conectare, deschideri, eliminare fundături)',
        affectedArea: lungime_retea_km + ' km rețea · ' + roN(segmente) + ' segmente',
        phasing: ['Faza 0: model axial/segmental + hartă de integrare', 'Faza 1: conectarea ansamblurilor izolate', 'Faza 2: pasaje/deschideri pe nucleul de integrare', 'Faza 3: amplasarea funcțiunilor pe străzile integrate'],
        designPrinciples: ['Rețea conectată, fără fundături inutile', 'Funcțiuni active pe străzile cel mai integrate', 'Continuitate și permeabilitate a țesutului', 'Evitarea „insulelor" rezidențiale izolate']
      },
      pmudSection: {
        measureType: 'Optimizarea configurației rețelei pentru mișcare pietonală naturală',
        trafficImpact: 'Redistribuie mișcarea spre străzile integrate; reduce ocolirile',
        modalShift: '+pietonal pe coridoarele integrate',
        infrastructureNeeded: ['Pasaje/legături pietonale', 'Deschideri de stradă unde e fezabil', 'Continuitate trotuare pe nucleul de integrare', 'Semnalistică de orientare']
      }
    };
    return r;
  }

  // ── EXPUNERE ZGOMOT (END / Directiva 2002/49/CE) ──
  function calculateNoise(p) {
    var trafic_vmd = p.trafic_vmd, viteza_kmh = p.viteza_kmh, dist_locuinte_m = p.dist_locuinte_m, pop_zona = p.pop_zona;
    // estimare orientativă Lden (model simplificat tip RLS/CNOSSOS): trafic + viteză − atenuare distanță
    var lden = 38 + 10 * Math.log10(Math.max(1, trafic_vmd)) + 0.18 * Math.max(0, viteza_kmh - 30) - 12 * Math.log10(Math.max(1, dist_locuinte_m / 10));
    lden = Math.max(40, Math.min(85, Math.round(lden)));
    var peste55 = lden > 55, peste65 = lden > 65;
    var pct_expus = lden <= 55 ? 0 : Math.min(95, Math.round((lden - 55) * 4.5));
    var pop_expusa = Math.round(pop_zona * pct_expus / 100);
    // reducere posibilă: asfalt fonoabsorbant + calmare + ecranare/verde
    var reducere = Math.min(12, Math.round((lden - 50) * 0.4));
    if (reducere < 0) reducere = 0;
    var r = CR('noise', 'Expunere la zgomot (END)', p);
    r.metrics = [
      { id: 'lden', label: 'Nivel Lden estimat', value: lden, unit: 'dB(A)', direction: 'negative' },
      { id: 'prag', label: peste65 ? 'Peste 65 dB (acțiune prioritară)' : peste55 ? 'Peste 55 dB (prag OMS/END)' : 'Sub pragul de 55 dB', value: lden, unit: '', direction: peste55 ? 'negative' : 'positive' },
      { id: 'exp', label: 'Populație expusă > 55 dB', value: -pop_expusa, unit: 'loc', direction: 'positive' },
      { id: 'pct', label: 'Procent populație expusă', value: pct_expus, unit: '%', direction: 'negative' },
      { id: 'red', label: 'Reducere posibilă (măsuri)', value: -reducere, unit: 'dB', direction: 'positive' },
      { id: 'dist', label: 'Distanță sursă-locuințe', value: dist_locuinte_m, unit: 'm', direction: 'positive' }
    ];
    r.mapLayers = [
      { id: 'um-noise', type: 'circle', beforePaint: { 'circle-radius': 8, 'circle-color': '#9a3412', 'circle-opacity': 0.28 }, afterPaint: { 'circle-radius': 24, 'circle-color': '#0EA5A5', 'circle-opacity': 0.45 } }
    ];
    r.documentContent = {
      siduSection: {
        projectTitle: 'Reducerea expunerii la zgomot — hartă de acțiune (END)',
        description: 'Proiectul evaluează expunerea la zgomotul de trafic conform Directivei 2002/49/CE (END, transpusă prin Legea 121/2019) pentru o zonă cu aproximativ ' + roN(pop_zona) + ' de locuitori din municipiul Iași. Pe baza traficului mediu zilnic (' + roN(trafic_vmd) + ' vehicule/zi), a vitezei (' + viteza_kmh + ' km/h) și a distanței sursă-locuințe (' + dist_locuinte_m + ' m), nivelul Lden estimat este de aproximativ ' + lden + ' dB(A). Aceasta expune circa ' + roN(pop_expusa) + ' de locuitori (' + pct_expus + '%) peste pragul de 55 dB recomandat de OMS. Măsurile propuse — calmarea traficului, asfalt fonoabsorbant, ecranare verde și redistribuirea traficului — pot reduce nivelul cu până la ' + reducere + ' dB. În SIDU este o componentă de sănătate publică și calitate a mediului, corelată cu PMUD (calmarea traficului) și transpusă în PUG prin retrageri și perdele de protecție. Estimare orientativă — harta strategică de zgomot oficială se realizează cu modelul CNOSSOS-EU și măsurători.',
        justification: 'Zgomotul de trafic este al doilea factor de mediu ca impact asupra sănătății în UE (OMS/AEM): tulburări de somn, boli cardiovasculare. Hărțile strategice de zgomot și planurile de acțiune sunt obligatorii pentru aglomerări.',
        costEstimate: 'variabil (asfalt fonoabsorbant ~15–25 €/mp; ecranare verde; calmare trafic)',
        timeline: 'Termen scurt-mediu: calmare trafic + asfalt fonoabsorbant pe coridoarele critice',
        legalBasis: 'Directiva 2002/49/CE (END); Legea 121/2019; OMS Environmental Noise Guidelines 2018',
        indicators: ['Lden estimat: ' + lden + ' dB(A)', 'Populație > 55 dB: ' + roN(pop_expusa) + ' (' + pct_expus + '%)', 'Reducere posibilă: −' + reducere + ' dB', 'Trafic: ' + roN(trafic_vmd) + ' veh/zi']
      },
      masterplanSection: {
        interventionType: 'Reducerea zgomotului (calmare trafic + asfalt fonoabsorbant + ecranare verde)',
        affectedArea: 'coridor + zonă adiacentă · ~' + roN(pop_zona) + ' loc.',
        phasing: ['Faza 0: hartă de zgomot (CNOSSOS) + identificare puncte critice', 'Faza 1: calmare trafic + asfalt fonoabsorbant', 'Faza 2: ecranare verde + retrageri', 'Faza 3: monitorizare Lden'],
        designPrinciples: ['Sursa la distanță de locuințe', 'Perdele verzi și ecrane acustice', 'Asfalt fonoabsorbant pe artere', 'Fațade orientate dinspre zgomot']
      },
      pmudSection: {
        measureType: 'Calmarea traficului și reducerea vitezei pentru atenuarea zgomotului',
        trafficImpact: 'Viteză redusă → zgomot redus; redistribuirea traficului de tranzit',
        modalShift: 'Indirect: medii mai liniștite favorizează mersul pe jos/bicicletă',
        infrastructureNeeded: ['Asfalt fonoabsorbant', 'Limitatoare de viteză', 'Perdele verzi de protecție', 'Ecrane acustice unde e necesar']
      }
    };
    return r;
  }

  // ── INSULĂ DE CĂLDURĂ URBANĂ (LST / UHI) ──
  function calculateLST(p) {
    var delta_uhi = p.delta_uhi, verde_pct = p.verde_pct, albedo_pct = p.albedo_pct, pop_zona = p.pop_zona;
    var racire = Math.min(delta_uhi, Math.round((verde_pct / 100 * 2.8 + albedo_pct / 100 * 1.6) * 10) / 10);
    var rezidual = Math.max(0, Math.round((delta_uhi - racire) * 10) / 10);
    // populație vulnerabilă la caniculă (vârstnici/copii ~ 30%), accentuată de UHI rezidual
    var pop_vulnerabila = Math.round(pop_zona * 0.30 * Math.min(1, rezidual / 4));
    var sever = delta_uhi >= 4 ? 'sever' : delta_uhi >= 2.5 ? 'moderat' : 'redus';
    var r = CR('lst', 'Insulă de căldură (LST)', p);
    r.metrics = [
      { id: 'uhi', label: 'Intensitate UHI (oraș−rural)', value: delta_uhi, unit: '°C', direction: 'negative' },
      { id: 'sev', label: 'Nivel: ' + sever, value: delta_uhi, unit: '', direction: 'neutral' },
      { id: 'rac', label: 'Răcire posibilă (verde+albedo)', value: -racire, unit: '°C', direction: 'positive' },
      { id: 'rez', label: 'ΔT rezidual după măsuri', value: rezidual, unit: '°C', direction: 'negative' },
      { id: 'verde', label: 'Acoperire verde', value: verde_pct, unit: '%', direction: 'positive' },
      { id: 'vuln', label: 'Populație vulnerabilă la caniculă', value: -pop_vulnerabila, unit: 'loc', direction: 'positive' }
    ];
    r.mapLayers = [
      { id: 'um-lst', type: 'circle', beforePaint: { 'circle-radius': 8, 'circle-color': '#b91c1c', 'circle-opacity': 0.30 }, afterPaint: { 'circle-radius': 24, 'circle-color': '#2E9E5B', 'circle-opacity': 0.45 } }
    ];
    r.documentContent = {
      siduSection: {
        projectTitle: 'Atenuarea insulei de căldură urbană (LST/UHI)',
        description: 'Proiectul vizează atenuarea insulei de căldură urbană (UHI) într-o zonă cu aproximativ ' + roN(pop_zona) + ' de locuitori din municipiul Iași, unde diferența de temperatură oraș-rural este de aproximativ ' + delta_uhi + '°C (nivel ' + sever + '), estimată din temperatura suprafeței terestre (LST, satelit Landsat/Sentinel) și acoperirea actuală cu verde (' + verde_pct + '%). Prin creșterea verdelui urban, a albedoului suprafețelor (pavaje și acoperișuri reflectorizante) și a umbririi, se poate obține o răcire de aproximativ ' + racire.toFixed(1) + '°C, reducând ΔT rezidual la circa ' + rezidual.toFixed(1) + '°C și protejând aproximativ ' + roN(pop_vulnerabila) + ' de persoane vulnerabile la caniculă (vârstnici, copii). În SIDU este un proiect de adaptare climatică și sănătate publică, corelat cu regula 3-30-300, Sponge City și Masterplanul, transpus în PUG prin coeficienți de verde și cerințe de albedo. Estimare orientativă — analiza completă folosește imagini termice satelitare și măsurători.',
        justification: 'Valurile de căldură sunt principalul risc climatic pentru orașe (mortalitate excesivă). Verdele și albedoul sunt cele mai cost-eficiente soluții de răcire, cu beneficii multiple (sănătate, energie, confort).',
        costEstimate: 'variabil (plantare + acoperișuri/pavaje reflectorizante + umbrire)',
        timeline: 'Termen mediu (2027–2032): verde + albedo pe zonele cele mai fierbinți (LST)',
        legalBasis: 'OUG 195/2005; Legea 24/2007; Strategia națională de adaptare la schimbări climatice; IPCC AR6',
        indicators: ['UHI: ' + delta_uhi + '°C (' + sever + ')', 'Răcire posibilă: −' + racire.toFixed(1) + '°C', 'ΔT rezidual: ' + rezidual.toFixed(1) + '°C', 'Populație vulnerabilă protejată: ' + roN(pop_vulnerabila)]
      },
      masterplanSection: {
        interventionType: 'Răcire urbană (verde + albedo + umbrire)',
        affectedArea: 'zonă fierbinte (LST) · ~' + roN(pop_zona) + ' loc.',
        phasing: ['Faza 0: hartă LST (satelit) + identificare puncte fierbinți', 'Faza 1: plantare + umbrire pe spațiile publice fierbinți', 'Faza 2: acoperișuri/pavaje reflectorizante', 'Faza 3: monitorizare LST'],
        designPrinciples: ['Verde și umbră pe spațiile publice', 'Albedo ridicat (pavaje/acoperișuri deschise)', 'Coridoare de ventilație urbană', 'Apă și vegetație pentru răcire evaporativă']
      },
      pmudSection: {
        measureType: 'Umbrire și verde pe traseele pietonale (confort termic)',
        trafficImpact: 'Neutru pe capacitate; trasee utilizabile pe caniculă',
        modalShift: 'Indirect: trasee umbrite favorizează mersul pe jos vara',
        infrastructureNeeded: ['Aliniamente și umbrare pe trasee', 'Pavaje reflectorizante', 'Puncte de apă/răcorire', 'Adăposturi umbrite la stații']
      }
    };
    return r;
  }

  // ── MIX FUNCȚIONAL (entropie utilizare teren — Frank et al.) ──
  function calculateMixUse(p) {
    var rezid_pct = p.rezid_pct, comert_pct = p.comert_pct, munca_pct = p.munca_pct, pop_zona = p.pop_zona;
    var public_pct = Math.max(0, 100 - rezid_pct - comert_pct - munca_pct);
    var shares = [rezid_pct, comert_pct, munca_pct, public_pct].map(function (v) { return Math.max(0, v) / 100; });
    var prezente = shares.filter(function (s) { return s > 0.01; }).length;
    // entropie normalizată (Land Use Mix, 0..1)
    var H = 0; shares.forEach(function (s) { if (s > 0) H += s * Math.log(s); });
    var entropie = prezente > 1 ? Math.round((-H / Math.log(prezente)) * 1000) / 10 : 0;
    var calitate = entropie >= 75 ? 'foarte echilibrat' : entropie >= 50 ? 'mixt' : entropie >= 25 ? 'predominant monofuncțional' : 'monofuncțional';
    var r = CR('mixuse', 'Mix funcțional (entropie)', p);
    r.metrics = [
      { id: 'ent', label: 'Indice mix funcțional (entropie)', value: entropie, unit: '/100', direction: 'positive' },
      { id: 'cal', label: 'Caracter: ' + calitate, value: entropie, unit: '', direction: 'neutral' },
      { id: 'fn', label: 'Funcțiuni prezente', value: prezente, unit: '/4', direction: 'positive' },
      { id: 'rez', label: 'Rezidențial', value: rezid_pct, unit: '%', direction: 'neutral' },
      { id: 'com', label: 'Comerț/servicii', value: comert_pct, unit: '%', direction: 'neutral' },
      { id: 'pub', label: 'Public/verde', value: public_pct, unit: '%', direction: 'neutral' }
    ];
    r.mapLayers = [
      { id: 'um-mix', type: 'circle', beforePaint: { 'circle-radius': 7, 'circle-color': '#888780', 'circle-opacity': 0.25 }, afterPaint: { 'circle-radius': 26, 'circle-color': '#D97706', 'circle-opacity': 0.45 } }
    ];
    r.documentContent = {
      siduSection: {
        projectTitle: 'Creșterea mixului funcțional — indice de entropie a utilizării terenului',
        description: 'Proiectul evaluează și îmbunătățește mixul funcțional al unei zone cu aproximativ ' + roN(pop_zona) + ' de locuitori din municipiul Iași, folosind indicele de entropie a utilizării terenului (Land Use Mix, Frank et al.), un indicator-cheie de walkability. Pe distribuția actuală (rezidențial ' + rezid_pct + '%, comerț/servicii ' + comert_pct + '%, locuri de muncă ' + munca_pct + '%, public/verde ' + public_pct + '%), indicele de mix este ' + entropie + '/100 (' + calitate + '). Un mix echilibrat (entropie ridicată) reduce naveta, susține comerțul local și vitalitatea pe tot parcursul zilei. Intervențiile — funcțiuni mixte la parter, conversia zonelor monofuncționale, atragerea locurilor de muncă în cartierele-dormitor — cresc indicele. În SIDU fundamentează zonificarea mixtă, corelat cu modelul „15 minute" și cu coridoarele mixte; se transpune în PUG prin reglementarea funcțiunilor admise.',
        justification: 'Zonarea monofuncțională (dormitor / pol de birouri) generează navetă, congestie și spații moarte la anumite ore. Mixul funcțional este un predictor robust al mersului pe jos și al vitalității urbane.',
        costEstimate: 'reglementar + stimulente (conversie funcțiuni, parteruri active) — cost public redus',
        timeline: 'Termen mediu: reglementare funcțiuni mixte + conversii pilot',
        legalBasis: 'Legea 350/2001 (PUG/PUZ — funcțiuni admise); ghiduri de zonificare mixtă',
        indicators: ['Indice mix (entropie): ' + entropie + '/100 (' + calitate + ')', 'Funcțiuni prezente: ' + prezente + '/4', 'Rezidențial/comerț/muncă/public: ' + rezid_pct + '/' + comert_pct + '/' + munca_pct + '/' + public_pct + '%']
      },
      masterplanSection: {
        interventionType: 'Creșterea mixului funcțional (parter activ + conversii)',
        affectedArea: 'cartier ~' + roN(pop_zona) + ' loc.',
        phasing: ['Faza 0: cartare funcțiuni (OSM/teren) + calcul entropie', 'Faza 1: funcțiuni mixte la parter pe coridoare', 'Faza 2: conversia zonelor monofuncționale', 'Faza 3: monitorizare indice'],
        designPrinciples: ['Funcțiuni mixte la parter', 'Locuri de muncă în zonele rezidențiale', 'Servicii de proximitate', 'Evitarea zonării rigide monofuncționale']
      },
      pmudSection: {
        measureType: 'Reducerea navetei prin apropierea funcțiunilor',
        trafficImpact: 'Mai puține deplasări obligate; cerere distribuită pe parcursul zilei',
        modalShift: '+pietonal/bicicletă pentru nevoi cotidiene',
        infrastructureNeeded: ['Parter activ pe coridoare', 'Trasee pietonale între funcțiuni', 'Acces la transport pentru funcțiuni mixte']
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
    var calcId = { city15: 'um-iso', tod: 'um-tod', sponge: 'um-sponge', corridor: 'um-corridor', r330300: 'um-330', sdg117: 'um-sdg117', walkscore: 'um-walk', gvi: 'um-gvi', spacesyntax: 'um-ss', noise: 'um-noise', lst: 'um-lst', mixuse: 'um-mix' }[modelId];
    // culoare per indice (vizibil direct pe harta, nu gri prin setTransition)
    var COL = { 'um-iso': '#BA7517', 'um-tod': '#534AB7', 'um-sponge': '#378ADD', 'um-corridor': '#1D9E75', 'um-330': '#2E9E5B', 'um-sdg117': '#C2410C', 'um-walk': '#0E7C5A', 'um-gvi': '#3FA34D', 'um-ss': '#7C3AED', 'um-noise': '#0EA5A5', 'um-lst': '#B91C1C', 'um-mix': '#D97706' };
    var _c = COL[calcId] || '#7C3AED';
    if (modelId === 'corridor' || modelId === 'gvi' || modelId === 'spacesyntax') {
      data = { type: 'Feature', geometry: { type: 'LineString', coordinates: [[center.lng - dLng * 0.5, center.lat], [center.lng + dLng * 0.5, center.lat]] }, properties: {} };
      layer = { id: calcId, type: 'line', source: calcId + '-src', paint: { 'line-color': _c, 'line-width': 9, 'line-opacity': 0.9 } };
    } else {
      data = { type: 'Feature', geometry: { type: 'Point', coordinates: [center.lng, center.lat] }, properties: {} };
      layer = { id: calcId, type: 'circle', source: calcId + '-src', paint: { 'circle-radius': ['interpolate', ['linear'], ['zoom'], 10, 26, 14, 90], 'circle-color': _c, 'circle-opacity': 0.4, 'circle-stroke-color': _c, 'circle-stroke-width': 2 } };
    }
    try { if (mapInstance.getSource(calcId + '-src')) mapInstance.getSource(calcId + '-src').setData(data); else mapInstance.addSource(calcId + '-src', { type: 'geojson', data: data }); } catch (e) {}
    try { if (!mapInstance.getLayer(calcId)) mapInstance.addLayer(layer); } catch (e) {}
  }
  function removeModelFromMap(mapInstance) {
    if (!mapInstance) return;
    ['um-iso', 'um-tod', 'um-sponge', 'um-corridor', 'um-330', 'um-sdg117', 'um-walk', 'um-gvi', 'um-ss', 'um-noise', 'um-lst', 'um-mix'].forEach(function (id) {
      try { if (mapInstance.getLayer(id)) mapInstance.removeLayer(id); } catch (e) {}
      try { if (mapInstance.getSource(id + '-src')) mapInstance.removeSource(id + '-src'); } catch (e) {}
    });
  }

  // ── registru: calc + schema parametri + dimensiune hartă ──
  var REG = {
    city15: { calc: calculate15Min, color: '#BA7517', icon: '⏱️', title: 'Oraș 15 Minute', size: function (p) { return p.raza_m; }, fields: [{ k: 'raza_m', l: 'Rază proximitate (m)', v: 800 }, { k: 'pop_zona', l: 'Populație zonă (loc)', v: 6000 }, { k: 'servicii_lipsa', l: 'Servicii deficitare (buc)', v: 5 }] },
    tod: { calc: calculateTOD, color: '#534AB7', icon: '🚉', title: 'TOD', size: function (p) { return p.raza_m; }, fields: [{ k: 'raza_m', l: 'Rază captare stație (m)', v: 800 }, { k: 'densitate_loc_ha', l: 'Densitate țintă (loc/ha)', v: 250 }, { k: 'frecventa_min', l: 'Frecvență transport (min)', v: 6 }] },
    corridor: { calc: calculateCorridor, color: '#1D9E75', icon: '🏪', title: 'Coridor Mixt', size: function (p) { return p.lungime_m; }, fields: [{ k: 'lungime_m', l: 'Lungime coridor (m)', v: 1200 }, { k: 'fronturi_active_pct', l: '% fronturi active', v: 70 }, { k: 'latime_m', l: 'Lățime profil (m)', v: 26 }] },
    sponge: { calc: calculateSponge, color: '#378ADD', icon: '💧', title: 'Sponge City', size: function (p) { return Math.sqrt(p.suprafata_mp); }, fields: [{ k: 'suprafata_mp', l: 'Suprafață zonă (mp)', v: 50000 }, { k: 'impermeabil_actual_pct', l: '% impermeabil actual', v: 75 }, { k: 'tinta_permeabil_pct', l: '% țintă permeabil', v: 45 }] },
    r330300: { calc: calculate330300, color: '#2E9E5B', icon: '🌳', title: 'Regula 3-30-300', size: function (p) { return Math.max(150, p.dist_parc_m); }, fields: [{ k: 'canopy_pct', l: '% canopy actual', v: 18 }, { k: 'copaci_vizibili', l: 'Copaci vizibili (din locuință)', v: 2 }, { k: 'dist_parc_m', l: 'Distanță la parc (m)', v: 450 }, { k: 'pop_zona', l: 'Populație zonă (loc)', v: 6000 }] },
    sdg117: { calc: calculateSDG117, color: '#C2410C', icon: '🏛️', title: 'SDG 11.7 — Spațiu public', size: function (p) { return 400; }, fields: [{ k: 'construit_ha', l: 'Suprafață construită (ha)', v: 120 }, { k: 'spatiu_public_ha', l: 'Spațiu public actual (ha)', v: 12 }, { k: 'pop_zona', l: 'Populație zonă (loc)', v: 20000 }, { k: 'acces_400m_pct', l: '% pop. cu acces < 400m', v: 55 }] },
    walkscore: { calc: calculateWalkScore, color: '#0E7C5A', icon: '🚶', title: 'Walk Score', size: function (p) { return Math.max(150, p.dist_medie_m); }, fields: [{ k: 'amenitati', l: 'Amenități pe jos (buc)', v: 14 }, { k: 'dist_medie_m', l: 'Distanță medie amenități (m)', v: 420 }, { k: 'intersectii_km2', l: 'Intersecții / km²', v: 90 }, { k: 'pop_zona', l: 'Populație zonă (loc)', v: 6000 }] },
    gvi: { calc: calculateGVI, color: '#3FA34D', icon: '🌿', title: 'Green View Index', size: function (p) { return Math.max(200, p.strazi_km * 200); }, fields: [{ k: 'gvi_actual_pct', l: 'GVI actual (%)', v: 14 }, { k: 'strazi_km', l: 'Lungime străzi (km)', v: 8 }, { k: 'arbori_aliniament', l: 'Arbori aliniament (buc)', v: 600 }, { k: 'pop_zona', l: 'Populație zonă (loc)', v: 6000 }] },
    spacesyntax: { calc: calculateSpaceSyntax, color: '#7C3AED', icon: '🔗', title: 'Space Syntax — Integrare', size: function (p) { return Math.max(200, p.lungime_retea_km * 100); }, fields: [{ k: 'segmente', l: 'Segmente rețea (buc)', v: 320 }, { k: 'conectivitate_medie', l: 'Conectivitate medie', v: 3.4 }, { k: 'lungime_retea_km', l: 'Lungime rețea (km)', v: 22 }, { k: 'intersectii', l: 'Intersecții (buc)', v: 280 }] },
    noise: { calc: calculateNoise, color: '#0EA5A5', icon: '🔊', title: 'Expunere zgomot (END)', size: function (p) { return Math.max(120, p.dist_locuinte_m); }, fields: [{ k: 'trafic_vmd', l: 'Trafic mediu zilnic (veh/zi)', v: 12000 }, { k: 'viteza_kmh', l: 'Viteză (km/h)', v: 50 }, { k: 'dist_locuinte_m', l: 'Distanță sursă-locuințe (m)', v: 20 }, { k: 'pop_zona', l: 'Populație zonă (loc)', v: 6000 }] },
    lst: { calc: calculateLST, color: '#B91C1C', icon: '🌡️', title: 'Insulă de căldură (LST)', size: function (p) { return 350; }, fields: [{ k: 'delta_uhi', l: 'Intensitate UHI (°C)', v: 3.5 }, { k: 'verde_pct', l: 'Acoperire verde (%)', v: 18 }, { k: 'albedo_pct', l: 'Albedo suprafețe (%)', v: 25 }, { k: 'pop_zona', l: 'Populație zonă (loc)', v: 12000 }] },
    mixuse: { calc: calculateMixUse, color: '#D97706', icon: '🧩', title: 'Mix funcțional (entropie)', size: function (p) { return 300; }, fields: [{ k: 'rezid_pct', l: 'Rezidențial (%)', v: 70 }, { k: 'comert_pct', l: 'Comerț/servicii (%)', v: 12 }, { k: 'munca_pct', l: 'Locuri de muncă (%)', v: 8 }, { k: 'pop_zona', l: 'Populație zonă (loc)', v: 8000 }] }
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
      '<div style="display:flex;gap:10px;margin-bottom:10px"><button class="uxc-btn uxc-btn--primary" style="flex:1" onclick="runUrbanModelCalc()">▶ Calculează + desenează</button><button class="uxc-btn uxc-btn--sec" id="um-save-btn" style="display:none" onclick="saveUrbanModelScenario()">💾 Salvează</button></div>' +
      '<button style="width:100%;margin-bottom:14px;padding:10px;border-radius:8px;border:1px solid rgba(124,58,237,.45);background:rgba(124,58,237,.14);color:#c4b5fd;font-weight:700;font-size:12px;cursor:pointer" onclick="window.UrbanIndicesReport&&UrbanIndicesReport.generate(window.TCI&&window.TCI.cityKey)">📊 Raport cu TOȚI indicii (PDF) — definiții · formule · hărți</button>' +
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
    // fa dialogul translucid + lasa harta interactiva, ca sa se VADA indicele desenat
    try { if (_ov) { _ov.style.background = 'transparent'; _ov.style.pointerEvents = 'none'; } var _bx = document.getElementById('um-dialog'); if (_bx) { _bx.style.pointerEvents = 'auto'; _bx.style.opacity = '0.97'; _bx.style.marginLeft = 'auto'; _bx.style.marginRight = '14px'; } } catch (e) {}
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
  G.calculate330300 = calculate330300; G.calculateSDG117 = calculateSDG117;
  G.calculateWalkScore = calculateWalkScore; G.calculateGVI = calculateGVI; G.calculateSpaceSyntax = calculateSpaceSyntax;
  G.calculateNoise = calculateNoise; G.calculateLST = calculateLST; G.calculateMixUse = calculateMixUse;
  G.renderUrbanModelDialog = renderUrbanModelDialog; G.runUrbanModelCalc = runUrbanModelCalc; G.saveUrbanModelScenario = saveUrbanModelScenario;
  G._toggleUmExport = _toggleUmExport; G._umSetParam = _umSetParam; G.closeUrbanModelDialog = closeUrbanModelDialog;
})(window);
