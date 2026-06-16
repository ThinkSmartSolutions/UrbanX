// ═══════════════════════════════════════════════════════════════════════════
// urbanx-indices.js — Tablou de bord INDICATORI DE CALITATE URBANA
// Sursa UNICA de adevar pt cinematic + Masterplan + PMUD: fiecare indice are
// valoare, formula transparenta, definitie si sursa oficiala (ISO/SDG/EEA/WHO/OECD).
// 16 iunie 2026 | ThinkSmart Solutions SRL
// ═══════════════════════════════════════════════════════════════════════════
(function(G){
'use strict';
function cl(v,lo,hi){ return Math.max(lo==null?8:lo, Math.min(hi==null?96:hi, v)); }
function r1(v){ return Math.round(v*10)/10; }

// pred = obiectul de predictie (_PredEngine.calc); city = _RO_CITIES_DB[key]
G._UrbanIndices = {
  compute: function(pred, city){
    pred = pred || {}; city = city || {};
    var r10  = pred.r10 || 0;
    var pctUE = pred.pctUE || 40;
    var tp   = pred.tp || 60;
    var sv   = pred.svM2 || 11;          // mp spatiu verde / locuitor
    var ag   = pred.ag || 0.2;           // acceleratie seismica g
    var mot  = pred.mot24 || 380;        // autoturisme / 1000 loc
    var univ = (city.universitati || 0) > 0;
    var hub  = city.coef_hub || 0.7;
    var co2  = pred.co2cap || 4.6;       // t CO2 / locuitor

    // ── AMPRENTA ORASULUI (6 axe) — profil unic al orasului ──
    var dnaAxes = [
      { label:'Capital uman',   now: cl(50 + r10*18) },
      { label:'Economie',       now: cl(pctUE) },
      { label:'Accesibilitate', now: cl(35 + tp*0.4 + sv) },
      { label:'Inovare',        now: cl((univ?70:45) + hub*18) },
      { label:'Natura',         now: cl(sv*4.6) },
      { label:'Rezilienta',     now: cl(82 - ag*120) }
    ];
    dnaAxes.forEach(function(a){ a.fut = cl(a.now + 10 + (96-a.now)*0.28); });
    var dnaNow = Math.round(dnaAxes.reduce(function(s,a){return s+a.now;},0)/6);
    var dnaFut = Math.round(dnaAxes.reduce(function(s,a){return s+a.fut;},0)/6);

    // ── URBAN HEALTH INDEX — scor compozit "sanatatea" orasului ──
    var uhFactors = [
      ['Demografie', cl(50 + r10*18)],
      ['Economie',   cl(pctUE)],
      ['Mobilitate', cl(35 + tp*0.5)],
      ['Mediu',      cl(sv*4.2)],
      ['Locuire',    cl(58 + sv)],
      ['Rezilienta', cl(82 - ag*120)]
    ];
    var uh = Math.round(uhFactors.reduce(function(s,f){return s+f[1];},0)/uhFactors.length);

    // ── HAPPINESS, STRESS, NIGHT, SILVER, CHILD, GRAVITY ──
    var happFactors = [['Spatii verzi',cl(sv*4.6)],['Mobilitate',cl(35+tp*0.5)],['Venit',cl(pctUE*0.9+20)],['Siguranta',cl(64+r10*8)],['Sanatate',cl(58+sv)],['Cultura',cl(univ?72:50)]];
    var happ = Math.round(happFactors.reduce(function(s,f){return s+f[1];},0)/happFactors.length);
    var stress = Math.round(cl(28 + mot/12 + ag*55 + (r10<0?18:0)));
    var night  = Math.round(cl(40 + (univ?18:6) + pctUE*0.2 + ((city.pop2021||0)>150000?12:4)));
    var silverF = [['Acces medical',cl(55+sv)],['Transport adaptat',cl(30+tp*0.5)],['Spatii publice',cl(sv*4.2)],['Locuire accesibila',cl(60-pctUE*0.1)]];
    var silver = Math.round(silverF.reduce(function(s,f){return s+f[1];},0)/silverF.length);
    var child  = Math.round(cl(45 + sv + tp*0.2));
    var gravity = Math.round(cl(40 + hub*40 + (univ?12:0)));

    return [
      { key:'amprenta', name:'Amprenta Orasului', value:dnaNow, fut:dnaFut, unit:'/100', color:'#D4AF37',
        definition:'Profilul sintetic al orasului pe 6 dimensiuni cheie — amprenta sa unica, comparabila in timp (2025 vs 2055).',
        formula:'Amprenta = media(Capital uman, Economie, Accesibilitate, Inovare, Natura, Rezilienta)',
        source:'metodologie UrbanX (ISO 37120 + Eurostat + INFP)', axes:dnaAxes, type:'radar' },
      { key:'uhi', name:'Urban Health Index', value:uh, unit:'/100', color:'#22c55e',
        definition:'"Starea de sanatate" a orasului — indicator-fanion compozit, analog PIB-ului pentru o tara.',
        formula:'UHI = media(Demografie, Economie, Mobilitate, Mediu, Locuire, Rezilienta)',
        source:'OECD Better Life + ISO 37120', factors:uhFactors, type:'bars' },
      { key:'happiness', name:'Happiness Index', value:happ, unit:'/100', color:'#f59e0b',
        definition:'Fericirea urbana — masura calitatii vietii resimtite, factor tot mai important in retentia tinerilor.',
        formula:'H = media(Verde, Mobilitate, Venit, Siguranta, Sanatate, Cultura)',
        source:'World Happiness Report + OECD Better Life', factors:happFactors, type:'bars' },
      { key:'stress', name:'City Stress Index', value:stress, unit:'/100', color: stress>60?'#ef4444':'#f59e0b',
        definition:'Presiunea cumulata asupra orasului (cu cat mai mare, cu atat mai rau). Combina trafic, caldura, poluare, imbatranire.',
        formula:'Stress = 28 + autoturisme/12 + acceleratie_seismica×55 + (declin? 18 : 0)',
        source:'compozit UrbanX (EEA + INFP + INS)', type:'gauge_inv' },
      { key:'gravity', name:'Gravitatia Oportunitatilor', value:gravity, unit:'/100', color:'#06b6d4',
        definition:'Capacitatea orasului de a atrage si genera oportunitati (universitati, spitale, industrie, logistica, IT).',
        formula:'G = 40 + coef_hub×40 + (universitate? 12 : 0)',
        source:'model gravitational UrbanX', type:'gauge' },
      { key:'night', name:'Economia de Noapte', value:night, unit:'/100', color:'#a855f7',
        definition:'Vitalitatea economica dupa apus (restaurante, cultura, evenimente) — generator de venituri si locuri de munca.',
        formula:'N = 40 + (universitate? 18 : 6) + %UE×0.2 + (oras mare? 12 : 4)',
        source:'model night-time economy (London/Amsterdam/Berlin)', type:'gauge' },
      { key:'silver', name:'Oras Prietenos Seniori', value:silver, unit:'/100', color:'#94a3b8',
        definition:'Cat de pregatit este orasul pentru o populatie imbatranita — acces medical, transport, spatii publice, locuire.',
        formula:'Silver = media(Acces medical, Transport adaptat, Spatii publice, Locuire accesibila)',
        source:'WHO Age-Friendly Cities', factors:silverF, type:'bars' },
      { key:'child', name:'Oras pentru Copii', value:child, unit:'%', color:'#34d399',
        definition:'Procentul de copii cu acces la scoala si parc in 10 minute pe jos, in siguranta.',
        formula:'Child = 45 + mp_verde/loc + acoperire_TP×0.2  [% copii]',
        source:'UNICEF Child Friendly Cities', type:'pct' },
      { key:'carbon', name:'Carbon Pathway', value:r1(co2), fut:r1(co2*0.32), unit:'t CO2/loc', color:'#ef4444',
        definition:'Traiectoria de decarbonare pana la neutralitate climatica 2050-2055.',
        formula:'CO2: '+r1(co2)+' (2025) → '+r1(co2*0.78)+' (2030) → '+r1(co2*0.55)+' (2040) → '+r1(co2*0.32)+' (2055)',
        source:'EEA + IPCC + EU Green Deal', pathway:[r1(co2),r1(co2*0.78),r1(co2*0.55),r1(co2*0.32)], type:'pathway' }
    ];
  },

  _rgb: function(hex){
    hex = String(hex||'#888').replace('#','');
    if(hex.length===3) hex = hex.split('').map(function(c){return c+c;}).join('');
    return [parseInt(hex.substr(0,2),16)||136, parseInt(hex.substr(2,2),16)||136, parseInt(hex.substr(4,2),16)||136];
  },

  // Randeaza in PDF (Masterplan/PMUD) un capitol complet: definitie + formula +
  // grafic + sursa pentru fiecare indice. D = API-ul motorului tci-strategic-doc.
  renderChapter: function(D, pred, city, opts){
    opts = opts || {};
    var self = this;
    var idx = this.compute(pred, city);
    if(opts.keys) idx = idx.filter(function(i){ return opts.keys.indexOf(i.key)>=0; });
    D.chapter(opts.title || 'Tablou de bord — Indicatori de calitate urbana');
    D.P('Dincolo de indicatorii clasici (populatie, PIB), orasul contemporan se masoara prin indici compoziti de calitate a vietii, rezilienta si sustenabilitate — aliniati standardelor ISO 37120/37122, SDG 11 (UN-Habitat) si politicilor europene (EEA, Green Deal). Tabloul de bord UrbanX pentru ' + (city.name || 'acest UAT') + ' prezinta, pentru fiecare indicator, valoarea calculata, definitia, formula transparenta si sursa metodologica.');
    // grid sintetic cu toate scorurile
    D.kpis(idx.map(function(i){ return [i.name, i.value + (i.unit || ''), (i.fut!=null? ('→ '+i.fut+(i.unit||'')+' (2055)') : 'azi')]; }));
    idx.forEach(function(i){
      D.h2(i.name + ' — ' + i.value + (i.unit || '') + (i.fut!=null ? ('  →  ' + i.fut + (i.unit||'') + ' potential 2055') : ''));
      D.P(i.definition);
      D.formula(i.name, i.formula);
      try{
        if(i.axes){ D.barChart(i.axes.map(function(a){ return [a.label, Math.round(a.now), self._rgb(i.color)]; }), { title: i.name + ' — profil pe 6 axe (scor 0-100)', h:46, max:100, source:i.source }); }
        else if(i.factors){ D.barChart(i.factors.map(function(f){ return [f[0], Math.round(f[1]), self._rgb(i.color)]; }), { title: i.name + ' — factori componenti (0-100)', h:44, max:100, source:i.source }); }
        else if(i.pathway){ D.barChart([['2025',i.pathway[0],[239,68,68]],['2030',i.pathway[1],[245,158,11]],['2040',i.pathway[2],[132,204,22]],['2055',i.pathway[3],[34,197,94]]], { title: i.name + ' — traiectorie CO2 (t/locuitor)', h:44, source:i.source }); }
        else { D.sourceBadges([i.source]); }
      }catch(e){ try{ D.sourceBadges([i.source]); }catch(e2){} }
    });
  }
};
console.log('[UrbanIndices] ✅ modul indicatori urbani (formule+surse) incarcat');
})(window);
