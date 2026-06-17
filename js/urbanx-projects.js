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
      { tip:'pol', icon:'🏥', color:'#ef4444', lat:47.1830, lon:27.6080,
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
    D.sourceBadges(['PNRR','FEDR','CNAIR','SICAP','PMUD','primării']);
  }
};
console.log('[UrbanProjects] ✅ modul proiecte reale per-UAT incarcat');
})(window);
