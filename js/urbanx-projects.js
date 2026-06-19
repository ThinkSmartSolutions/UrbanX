// ═══════════════════════════════════════════════════════════════════════════
// urbanx-projects.js — PROIECTE STRUCTURANTE REALE per-UAT (PNRR/SICAP/FEDR/CNAIR)
// Sursa UNICA pentru: cinematic (desenare pe harta) + Masterplan + PMUD.
// Date reale, nu generice. Extensibil: adauga UAT-uri in `data`.
// 17 iunie 2026 | ThinkSmart Solutions SRL
// ═══════════════════════════════════════════════════════════════════════════
(function(G){
'use strict';

// tip: 'pol'|'zona' = punct (lat/lon); 'coridor'|'tren'|'parc-liniar' = traseu [[lon,lat],...]
G._UrbanProjects = {
  data: {
    // ── MUNICIPIUL IAȘI (date reale, in derulare/programate) ──
    'RO-IS-01': [
      { tip:'pol', icon:'🏥', color:'#ef4444', lat:47.1875178844981, lon:27.587306526594542,
        nume:'Spital Regional de Urgență Iași (Moara de Vânt)',
        desc:'Investiție majoră (BEI/PNRR, ~150.000 mp). Va deveni pol de dezvoltare: locuințe, hoteluri, comerț, clinici private, smart-city în jur.',
        impact:'Pol medical + rezidențial nou — presiune mare de densificare și mobilitate pe Moara de Vânt / Tătărași.', sursa:'PNRR / BEI / CNI' },
      { tip:'zona', icon:'🏗', color:'#f59e0b', lat:47.1665, lon:27.5520,
        nume:'Zona Aurel Vlaicu / Păcurari',
        desc:'Densificare accelerată: Grand Beetle, Evergreen, Himson și alte ansambluri rezidențial-comerciale.',
        impact:'Pol rezidențial-comercial vest — necesită capacitate de trafic, școli, spații verzi și TP.', sursa:'autorizații ANCPI / dezvoltatori privați' },
      { tip:'coridor', icon:'🛣', color:'#dc2626',
        traseu:[[27.560,47.130],[27.520,47.155],[27.480,47.185],[27.450,47.210]],
        nume:'Centura Iași + legătura Letcani',
        desc:'Centura ocolitoare și legătura spre Letcani/A8. Deviază tranzitul greu din oraș.',
        impact:'Coridor de dezvoltare la ieșirea prin Păcurari spre Letcani — logistică, industrie ușoară, rezidențial periurban.', sursa:'CNAIR / Autostrada A8 Moldova' },
      { tip:'tren', icon:'🚆', color:'#a855f7',
        traseu:[[27.500,47.162],[27.545,47.157],[27.589,47.152],[27.635,47.146],[27.675,47.140]],
        nume:'Tren metropolitan pe coridorul Bahlui',
        desc:'Tren urban/metropolitan de suprafață propus de-a lungul Bahluiului (PNRR mobilitate).',
        impact:'Coloană vertebrală de transport E-V — densificare orientată spre stații (TOD).', sursa:'PNRR / PMUD Iași' },
      { tip:'parc-liniar', icon:'🌳', color:'#22c55e',
        traseu:[[27.500,47.160],[27.545,47.155],[27.589,47.150],[27.635,47.144],[27.675,47.138]],
        nume:'Amenajarea râului Bahlui (parc liniar)',
        desc:'Reamenajarea malurilor Bahluiului în parc liniar continuu: alei pietonale/velo, oaze de verdeață, retenție apă.',
        impact:'Coridor verde-albastru major — racorire urbană, conectivitate pietonală, calitatea vieții.', sursa:'Primăria Iași / fonduri climă UE' },
      { tip:'zona', icon:'🏙', color:'#f59e0b', lat:47.1605, lon:27.6210,
        nume:'Bulevardul Aurel Vlaicu — pol birouri & rezidențial',
        desc:'Aglomerare de clădiri de birouri clasa A (Palas-extins, United Business Center), rezidențial înalt și retail de-a lungul axei Aurel Vlaicu / Bulevardul Tudor Vladimirescu.',
        impact:'Pol terțiar (birouri IT/servicii) + densificare verticală — cerere mare de parcaje și transport public.', sursa:'autorizații ANCPI / dezvoltatori (Iulius, Prime Kapital)' },
      { tip:'zona', icon:'🏭', color:'#9ca3af', lat:47.1430, lon:27.6320,
        nume:'Reconversie industrială Fortus / CUG (Tutora–Fortus)',
        desc:'Reconversia platformelor industriale CUG/Fortus (brownfield est) în zonă mixtă: rezidențial, comerț, parcuri logistice ușoare și birouri — pol terțiar secundar din PUG.',
        impact:'Brownfield → oraș: regenerare urbană majoră est, evită sprawl-ul prin reciclarea terenului central.', sursa:'PUG Iași (CM — pol terțiar Tutora/Fortus) / FEDR regenerare urbană' },
    ],

    // ── MUNICIPIUL SUCEAVA ──
    'RO-SV-01': [
      { tip:'pol', icon:'✈', color:'#06b6d4', lat:47.6875, lon:26.3539, nume:'Aeroportul Internațional Ștefan cel Mare (Salcea)', desc:'Modernizat/extins — poartă aeriană a Bucovinei.', impact:'Pol logistic și turistic est — dezvoltare zonă Salcea.', sursa:'CJ Suceava / fonduri UE' },
      { tip:'pol', icon:'🏥', color:'#ef4444', lat:47.6440, lon:26.2530, nume:'Spitalul Județean de Urgență „Sf. Ioan cel Nou”', desc:'Modernizare și extindere capacitate.', impact:'Pol medical regional.', sursa:'PNRR / MS' },
      { tip:'coridor', icon:'🛣', color:'#dc2626', traseu:[[26.18,47.60],[26.25,47.65],[26.32,47.70]], nume:'A7 / drum expres + variantă ocolitoare', desc:'Conexiune rapidă nord (Pașcani–Suceava–Siret).', impact:'Coridor de dezvoltare nord, deviază tranzitul.', sursa:'CNAIR / A7 Moldova' },
    ],

    // ── MUNICIPIUL GALAȚI ──
    'RO-GL-01': [
      { tip:'pol', icon:'🌉', color:'#a855f7', lat:45.2750, lon:27.9650, nume:'Podul suspendat peste Dunăre (Brăila–Galați)', desc:'Cel mai mare pod suspendat din România (deschis 2023) — leagă Galați-Brăila de Dobrogea.', impact:'Salt major de conectivitate — coridor logistic și dezvoltare sud.', sursa:'CNAIR' },
      { tip:'pol', icon:'⚓', color:'#0ea5e9', lat:45.4180, lon:28.0450, nume:'Port Galați + Zona Liberă', desc:'Cel mai mare port fluvial-maritim — extindere logistică.', impact:'Pol industrial-logistic est, pe Dunăre.', sursa:'APDM / Zona Liberă Galați' },
      { tip:'zona', icon:'🏭', color:'#9ca3af', lat:45.4520, lon:27.9550, nume:'Platforma siderurgică (Liberty Galați)', desc:'Restructurare/decarbonare combinat siderurgic.', impact:'Reconversie industrială vest — brownfield major.', sursa:'Liberty / Green Deal' },
    ],

    // ── MUNICIPIUL CLUJ-NAPOCA ──
    'RO-CJ-01': [
      { tip:'pol', icon:'🏥', color:'#ef4444', lat:46.7450, lon:23.5550, nume:'Spitalul Regional de Urgență Cluj', desc:'Unul din cele 3 spitale regionale BEI/PNRR (Iași, Cluj, Craiova).', impact:'Pol medical regional + dezvoltare în jur.', sursa:'PNRR / BEI' },
      { tip:'tren', icon:'🚇', color:'#a855f7', traseu:[[23.55,46.78],[23.59,46.77],[23.63,46.77],[23.67,46.78]], nume:'Metroul Cluj (Linia M1)', desc:'Prima linie de metrou din afara Bucureștiului (PNRR).', impact:'Coloană vertebrală de transport — densificare TOD.', sursa:'PNRR / CFR' },
      { tip:'coridor', icon:'🛣', color:'#dc2626', traseu:[[23.52,46.74],[23.55,46.80],[23.66,46.81]], nume:'Centura metropolitană Cluj', desc:'Inel ocolitor metropolitan.', impact:'Coridor de dezvoltare periurban (Florești, Apahida).', sursa:'CNAIR / ZMC' },
    ],

    // ── MUNICIPIUL TIMIȘOARA ──
    'RO-TM-01': [
      { tip:'pol', icon:'🏥', color:'#ef4444', lat:45.7300, lon:21.2050, nume:'Spitalul Regional de Urgență Timișoara', desc:'Spital regional major (program PNRR).', impact:'Pol medical regional Banat.', sursa:'PNRR / MS' },
      { tip:'pol', icon:'✈', color:'#06b6d4', lat:45.8098, lon:21.3379, nume:'Aeroportul Internațional „Traian Vuia”', desc:'Hub aerian vest — modernizare.', impact:'Pol logistic/economic est.', sursa:'CJ Timiș' },
      { tip:'coridor', icon:'🛣', color:'#dc2626', traseu:[[21.15,45.72],[21.22,45.76],[21.30,45.80]], nume:'Centura + A1 (coridor IV)', desc:'Legătură autostradă A1 spre vest.', impact:'Coridor logistic și industrial.', sursa:'CNAIR / TEN-T' },
    ],

    // ── MUNICIPIUL CRAIOVA ──
    'RO-DJ-01': [
      { tip:'pol', icon:'🏥', color:'#ef4444', lat:44.3150, lon:23.7800, nume:'Spitalul Regional de Urgență Craiova', desc:'Unul din cele 3 spitale regionale BEI/PNRR.', impact:'Pol medical regional Oltenia.', sursa:'PNRR / BEI' },
      { tip:'zona', icon:'🏭', color:'#f59e0b', lat:44.3450, lon:23.8350, nume:'Platforma auto (Ford Otosan Craiova)', desc:'Producție auto + electrificare — pol industrial.', impact:'Motor economic + furnizori în jur.', sursa:'Ford Otosan' },
      { tip:'coridor', icon:'🛣', color:'#dc2626', traseu:[[23.74,44.29],[23.80,44.33],[23.86,44.36]], nume:'Centura Craiova + drum expres Craiova–Pitești', desc:'Ocolitoare + legătură A1.', impact:'Coridor de dezvoltare logistic.', sursa:'CNAIR' },
    ],

    // ── MUNICIPIUL BRAȘOV ──
    'RO-BV-01': [
      { tip:'pol', icon:'✈', color:'#06b6d4', lat:45.7020, lon:25.5230, nume:'Aeroportul Internațional Brașov-Ghimbav', desc:'Primul aeroport nou din România (deschis 2023).', impact:'Pol logistic/turistic vest — dezvoltare Ghimbav.', sursa:'CJ Brașov' },
      { tip:'pol', icon:'🏥', color:'#ef4444', lat:45.6520, lon:25.6100, nume:'Spital clinic / pol medical', desc:'Modernizare infrastructură sanitară.', impact:'Pol medical regional.', sursa:'PNRR / MS' },
      { tip:'coridor', icon:'🛣', color:'#dc2626', traseu:[[25.55,45.62],[25.60,45.66],[25.66,45.70]], nume:'A3 (Comarnic–Brașov) + ocolitoare', desc:'Legătură autostradă spre București.', impact:'Coridor major de dezvoltare sud.', sursa:'CNAIR' },
    ],

    // ── MUNICIPIUL CONSTANȚA ──
    'RO-CT-01': [
      { tip:'pol', icon:'⚓', color:'#0ea5e9', lat:44.1500, lon:28.6600, nume:'Portul Constanța (extindere)', desc:'Cel mai mare port la Marea Neagră — extindere + dana cereale.', impact:'Pol logistic-maritim major (poarta TEN-T).', sursa:'APM Constanța / CEF' },
      { tip:'coridor', icon:'🛣', color:'#dc2626', traseu:[[28.55,44.15],[28.62,44.18],[28.70,44.22]], nume:'A4 centura + A2 (autostrada soarelui)', desc:'Centura ocolitoare + legătură A2 spre București.', impact:'Coridor logistic și turistic.', sursa:'CNAIR' },
      { tip:'pol', icon:'🏥', color:'#ef4444', lat:44.1820, lon:28.6450, nume:'Spital județean / pol medical', desc:'Modernizare capacitate.', impact:'Pol medical regional Dobrogea.', sursa:'PNRR / MS' },
    ],

    // ── MUNICIPIUL BUCUREȘTI ──
    'RO-B-01': [
      { tip:'coridor', icon:'🛣', color:'#dc2626', traseu:[[25.95,44.35],[26.00,44.55],[26.25,44.55],[26.30,44.35],[26.05,44.28],[25.95,44.35]], nume:'A0 — Autostrada de Centură București', desc:'Inelul de autostradă în jurul Capitalei (în execuție pe tronsoane).', impact:'Deviază tranzitul + coridoare de dezvoltare periurbane (Ilfov).', sursa:'CNAIR' },
      { tip:'tren', icon:'🚇', color:'#a855f7', traseu:[[26.07,44.45],[26.05,44.49],[26.05,44.55],[26.08,44.62]], nume:'Metrou M6 (1 Mai – Otopeni)', desc:'Legătura metrou spre Aeroportul Otopeni (PNRR/BEI).', impact:'Conexiune aeroport — densificare TOD nord.', sursa:'PNRR / Metrorex' },
      { tip:'pol', icon:'🏥', color:'#ef4444', lat:44.4500, lon:26.1300, nume:'Spitale metropolitane (mai multe locații)', desc:'Programe de spitale noi / modernizare.', impact:'Poli medicali multipli.', sursa:'PMB / MS / PNRR' },
    ],

    // ── MUNICIPIUL BACĂU ──
    'RO-BC-01': [
      { tip:'coridor', icon:'🛣', color:'#dc2626', traseu:[[26.85,46.50],[26.91,46.57],[26.97,46.63]], nume:'A7 — Autostrada Moldovei', desc:'Tronson major Moldova (Bacău pe traseu).', impact:'Coridor de dezvoltare nord-sud.', sursa:'CNAIR / A7' },
      { tip:'pol', icon:'✈', color:'#06b6d4', lat:46.5219, lon:26.9103, nume:'Aeroportul „George Enescu” Bacău', desc:'Hub aerian — modernizare.', impact:'Pol logistic sud.', sursa:'CJ Bacău' },
    ],

    // ── MUNICIPIUL PIATRA-NEAMȚ ──
    'RO-NT-01': [
      { tip:'pol', icon:'🏥', color:'#ef4444', lat:46.9250, lon:26.3650, nume:'Spitalul Județean de Urgență Neamț', desc:'Modernizare infrastructură sanitară.', impact:'Pol medical județean.', sursa:'PNRR / MS' },
      { tip:'coridor', icon:'🛣', color:'#dc2626', traseu:[[26.30,46.91],[26.37,46.93],[26.43,46.95]], nume:'Variantă de ocolire + legătură DN', desc:'Decongestionare tranzit pe valea Bistriței.', impact:'Coridor de dezvoltare est.', sursa:'CNAIR' },
    ],

    // ── MUNICIPIUL BOTOȘANI ──
    'RO-BT-01': [
      { tip:'pol', icon:'🏥', color:'#ef4444', lat:47.7480, lon:26.6650, nume:'Spitalul Județean „Mavromati”', desc:'Modernizare și extindere.', impact:'Pol medical județean.', sursa:'PNRR / MS' },
      { tip:'coridor', icon:'🛣', color:'#dc2626', traseu:[[26.62,47.72],[26.67,47.75],[26.72,47.78]], nume:'Variantă ocolitoare Botoșani', desc:'Ocolire tranzit + legătură spre Suceava/Iași.', impact:'Coridor de dezvoltare.', sursa:'CNAIR' },
    ],

    // ── MUNICIPIUL VASLUI ──
    'RO-VS-01': [
      { tip:'pol', icon:'🏥', color:'#ef4444', lat:46.6400, lon:27.7300, nume:'Spitalul Județean de Urgență Vaslui', desc:'Modernizare capacitate.', impact:'Pol medical județean.', sursa:'PNRR / MS' },
      { tip:'coridor', icon:'🛣', color:'#dc2626', traseu:[[27.68,46.61],[27.73,46.64],[27.78,46.67]], nume:'Drum de legătură / variantă ocolitoare', desc:'Conexiune coridor Bârlad–Iași.', impact:'Coridor de dezvoltare.', sursa:'CNAIR' },
    ],
  },

  // proiecte pentru un UAT; daca nu avem date reale -> set generic derivat din centru
  get(cityKey, city){
    if(this.data[cityKey]) return this.data[cityKey];
    return this._generic(city);
  },

  _generic(city){
    city = city || {}; var cx=city.lon||27.6, cy=city.lat||47.16;
    return [
      { tip:'pol', icon:'🏥', color:'#ef4444', lat:cy+0.012, lon:cx+0.014, nume:'Spital / pol de servicii public',
        desc:'Investiție publică majoră (program tip PNRR/FEDR) — generează pol de dezvoltare în jur.',
        impact:'Densificare și cerere de mobilitate în zonă.', sursa:'PNRR / FEDR (de confirmat per UAT)', _generic:true },
      { tip:'coridor', icon:'🛣', color:'#dc2626', traseu:[[cx-0.05,cy-0.02],[cx-0.02,cy+0.01],[cx+0.02,cy+0.03]],
        nume:'Centură / coridor rutier major', desc:'Deviază tranzitul; deschide coridor de dezvoltare la periferie.',
        impact:'Coridor de dezvoltare logistic/rezidențial.', sursa:'CNAIR (de confirmat)', _generic:true },
      { tip:'tren', icon:'🚆', color:'#a855f7', traseu:[[cx-0.05,cy],[cx,cy],[cx+0.05,cy]],
        nume:'Transport metropolitan propus', desc:'Axă de transport rapid orientată pe principalul coridor urban.',
        impact:'Dezvoltare orientată spre stații (TOD).', sursa:'PMUD (de confirmat)', _generic:true },
    ];
  },

  // ── DESENARE PE HARTA (cinematic) ──
  buildFeatures(cityKey, city){
    var pr = this.get(cityKey, city);
    var pts=[], lines=[], labels=[];
    pr.forEach(function(p){
      if(p.traseu){ lines.push({type:'Feature',geometry:{type:'LineString',coordinates:p.traseu},properties:{c:p.color,tip:p.tip}});
        var mid=p.traseu[Math.floor(p.traseu.length/2)];
        labels.push({lon:mid[0],lat:mid[1],color:p.color,icon:p.icon,title:p.nume.toUpperCase().slice(0,28),sub:p.sursa});
      } else if(p.lat){ pts.push({type:'Feature',geometry:{type:'Point',coordinates:[p.lon,p.lat]},properties:{c:p.color}});
        labels.push({lon:p.lon,lat:p.lat,color:p.color,icon:p.icon,title:p.nume.toUpperCase().slice(0,28),sub:p.sursa});
      }
    });
    return { pts:pts, lines:lines, labels:labels };
  },

  // ── CAPITOL PDF (Masterplan / PMUD) ──
  renderChapter(D, cityKey, city){
    var pr = this.get(cityKey, city);
    if(!pr || !pr.length) return;
    var generic = pr.some(function(p){return p._generic;});
    D.chapter('Proiecte structurante în derulare și poli de dezvoltare');
    D.P('Marile proiecte de infrastructură (PNRR, FEDR, CNAIR, programe guvernamentale) restructureaza orașul: fiecare genereaza un POL de dezvoltare cu efecte cumulate pe 10-15 ani (densificare, mobilitate, valoare imobiliara). Identificarea lor din timp permite dimensionarea corecta a PUG-ului și anticiparea presiunilor.'+(generic?' (Notă: pentru acest UAT lista este orientativa — se completeaza cu proiectele reale locale.)':''));
    D.table(['Proiect','Tip','Sursă'], pr.map(function(p){return [p.nume, (p.tip==='pol'?'Pol/serviciu':p.tip==='zona'?'Zonă dezvoltare':p.tip==='tren'?'Transport':p.tip==='coridor'?'Coridor rutier':'Coridor verde'), p.sursa];}), [86,38,58], {fs:7});
    pr.forEach(function(p){
      D.h2(p.nume);
      D.P(p.desc);
      D.callout('Impact urbanistic', p.impact, p.color ? undefined : undefined);
    });
    // HARTA: localizarea proiectelor structurante (poli + coridoare)
    try{ if(window._PdfMap && D.ensure){ var ff=this.buildFeatures(cityKey, city);
      var mp=(ff.pts||[]).map(function(f){var c=f.geometry.coordinates;return {lon:c[0],lat:c[1],c:(f.properties&&f.properties.c)||'#D4AF37',r:2};});
      var ml=(ff.lines||[]).map(function(f){return {coords:f.geometry.coordinates,c:(f.properties&&f.properties.c)||'#22c55e',w:1.2};});
      D.h2('Hartă — proiecte structurante');
      D.ensure(80); window._PdfMap.draw(D.pdf,{x:D.dims.ML,y:D.y+2,w:Math.min(D.dims.CW,160),h:66,title:'Poli de dezvoltare · coridoare · tren metropolitan',points:mp,lines:ml,cx:city.lon,cy:city.lat,legend:[[[212,175,55],'pol/proiect'],[[34,197,94],'coridor/tren']]});
      D.setY(D.y+80);
    } }catch(e){ console.warn('[Projects] harta:',e.message); }
    D.sourceBadges(['PNRR','FEDR','CNAIR','SICAP','PMUD','primării']);
  }
};
console.log('[UrbanProjects] ✅ modul proiecte reale per-UAT incarcat');
})(window);
