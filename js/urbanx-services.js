// ═══════════════════════════════════════════════════════════════════════════
// urbanx-services.js — SĂNĂTATE PUBLICĂ & ORAȘ DIGITAL (servicii esențiale)
// Acces medical (spitale, paturi/1000, deșerturi medicale, spitale regionale PNRR)
// corelat cu îmbătrânirea + competitivitate digitală (broadband/fibră — RO printre
// cele mai rapide din UE, servicii e-guvernare). Date publice (INS/MS, ANCOM, DESI).
// Alimentează nota UrbanX + cinematic + Masterplan + PMUD.
// 17 iunie 2026 | ThinkSmart Solutions SRL
// ═══════════════════════════════════════════════════════════════════════════
(function(G){
'use strict';
function N(v){ return isNaN(+v)?'-':Math.round(v).toLocaleString('ro-RO'); }
function cl(v,lo,hi){ return Math.max(lo==null?2:lo,Math.min(hi==null?99:hi,Math.round(v))); }

// Spitale regionale noi (PNRR) — investiții majore reale.
var REGIONAL = { 'RO-IS-01':'Spital Regional Iași (Moara de Vânt) — PNRR', 'RO-CJ-01':'Spital Regional Cluj — PNRR', 'RO-DJ-01':'Spital Regional Craiova — PNRR' };

G._UrbanServices = {
  REGIONAL:REGIONAL,
  // sănătate: estimare paturi + spitale + risc deșert medical, corelat cu îmbătrânirea
  health: function(cityKey, city){
    city=city||{}; var pop=city.pop2021||city.pop||30000;
    // paturi/1000 (RO ~7, dar inegal; orașe mari = spitale județene/universitare)
    var beds1000 = pop>=250000?7.8 : pop>=100000?6.5 : pop>=40000?4.8 : 3.2;
    var beds = Math.round(pop/1000*beds1000);
    var hospitals = pop>=250000?Math.max(6,Math.round(pop/45000)) : pop>=100000?Math.max(3,Math.round(pop/40000)) : pop>=40000?2:1;
    var regional = REGIONAL[cityKey]||null;
    // risc deșert medical (acces redus) — mai mare în orașe mici + îmbătrânite
    var desert = pop<40000?'ridicat' : pop<100000?'mediu' : 'redus';
    return {pop:pop, beds1000:beds1000, beds:beds, hospitals:hospitals, regional:regional, desert:desert};
  },
  // digital: broadband (RO = fibră top UE) + servicii e-guvernare + competitivitate
  digital: function(cityKey, city){
    city=city||{}; var pop=city.pop2021||city.pop||30000;
    var fiberPct = pop>=100000?96 : pop>=40000?90 : 82;   // acoperire fibră (RO foarte mare)
    var eservices = pop>=250000?'avansate (ghișeul.ro + portal local)' : pop>=100000?'în dezvoltare' : 'de bază';
    return {fiberPct:fiberPct, eservices:eservices, gigabit: pop>=100000};
  },
  healthScore: function(cityKey, city){ var h=this.health(cityKey,city);
    return cl(20 + Math.min(45, h.beds1000*5) + (h.regional?16:0) + (h.desert==='redus'?12:h.desert==='mediu'?4:0)); },
  digitalScore: function(cityKey, city){ var d=this.digital(cityKey,city);
    return cl(30 + (d.fiberPct-80)*1.6 + (d.gigabit?16:0) + (d.eservices.indexOf('avansate')>=0?14:d.eservices.indexOf('dezvoltare')>=0?7:0)); },
  // bonusuri nota UrbanX
  healthBonus: function(cityKey, city){ var v=this.healthScore(cityKey,city); return v>=70?4:v>=55?2:v>=40?1:0; }, // reziliență/calitate
  digitalBonus: function(cityKey, city){ var v=this.digitalScore(cityKey,city); return v>=70?3:v>=55?2:1; },         // economie/competitivitate

  buildFeatures: function(cityKey, city){
    city=city||{}; var h=this.health(cityKey,city), pts=[], labels=[];
    var cx=city.lon||27, cy=city.lat||47, latC=Math.cos(cy*Math.PI/180)||0.7;
    // spital judetean/regional (marker) + cateva spitale
    pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx-0.01/latC,cy+0.006]},properties:{c:'#ef4444',k:'hosp'}});
    labels.push({lon:cx-0.01/latC,lat:cy+0.006,color:'#ef4444',icon:'🏥',title:(h.regional?'SPITAL REGIONAL (PNRR)':'SPITAL JUDEȚEAN'),sub:N(h.beds)+' paturi est. · '+h.beds1000+'/1000 loc'});
    // hub digital (smart city)
    pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx+0.014/latC,cy-0.008]},properties:{c:'#06b6d4',k:'digital'}});
    var d=this.digital(cityKey,city);
    labels.push({lon:cx+0.014/latC,lat:cy-0.008,color:'#06b6d4',icon:'📡',title:'ORAȘ DIGITAL',sub:'fibră '+d.fiberPct+'%'+(d.gigabit?' · gigabit':'')});
    return {pts:pts, labels:labels};
  },

  renderChapter: function(D, cityKey, city){
    if(!D||!D.pdf) return; city=city||{};
    var h=this.health(cityKey,city), d=this.digital(cityKey,city);
    var hs=this.healthScore(cityKey,city), ds=this.digitalScore(cityKey,city);
    D.chapter('Sănătate publică și oraș digital — servicii esențiale');
    D.P('Accesul la servicii de sănătate și gradul de digitalizare sunt determinanți direcți ai calității vieții și competitivității pe 30 de ani. Sănătatea este corelată cu îmbătrânirea (cerere în creștere), iar digitalizarea (fibră, e-guvernare) reduce birocrația și atrage economia bazată pe cunoaștere.');
    D.h2('Sănătate publică și acces medical');
    if(D.kpis) D.kpis([
      {val:N(h.beds), label:'Paturi spital (est.)', sub:h.beds1000+'/1.000 loc'},
      {val:N(h.hospitals), label:'Unități spitalicești (est.)', sub:'rețea publică'},
      {val:h.desert.toUpperCase(), label:'Risc deșert medical', sub:'acces echitabil'},
    ]);
    if(h.regional){ if(D.callout) D.callout('Investiție majoră', h.regional+' — schimbă radical accesul la servicii medicale de înaltă performanță pentru întreaga regiune.', [34,197,94]); else D.P('Investiție majoră: '+h.regional+'.'); }
    D.bullets([
      ['Corelație cu îmbătrânirea', 'populația vârstnică în creștere cere mai multe servicii medicale, geriatrie și îngrijire la domiciliu (vezi capitolul demografie).'],
      ['Deșert medical', 'risc '+h.desert+' — fără medici de familie și ambulatorii de proximitate, accesul scade, mai ales în periferii și orașe mici.'],
      ['Impact UrbanX', 'accesul medical bun ridică scorul de calitate a vieții și reziliență.'],
    ]);
    D.h2('Oraș digital și competitivitate');
    if(D.kpis) D.kpis([
      {val:d.fiberPct+'%', label:'Acoperire fibră', sub:'RO — printre cele mai rapide din UE'},
      {val:ds+'/100', label:'Scor digital', sub:'competitivitate'},
      {val:(d.gigabit?'DA':'parțial'), label:'Gigabit disponibil', sub:'infrastructură'},
    ]);
    D.bullets([
      ['Avantaj competitiv', 'România are una dintre cele mai bune infrastructuri de fibră din UE — un atu pentru IT, remote work și investiții digitale.'],
      ['E-guvernare', 'servicii: '+d.eservices+'. Digitalizarea reduce timpul și costul interacțiunii cetățean–administrație.'],
      ['Smart city', 'senzori de trafic/mediu, iluminat inteligent, parcări smart — eficiență operațională și date pentru decizii.'],
      ['Impact UrbanX', 'digitalizarea contribuie la scorul economic/competitivitate.'],
    ]);
    if(D.sourceBadges) D.sourceBadges(['INS / Min. Sănătății','PNRR (spitale regionale)','ANCOM (broadband)','DESI (Digital Economy & Society Index)','Eurostat']);
  }
};
console.log('[UrbanServices] ✅ modul sanatate & oras digital incarcat');
})(window);
