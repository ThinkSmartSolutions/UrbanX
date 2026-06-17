// ═══════════════════════════════════════════════════════════════════════════
// urbanx-vitality.js — EDUCAȚIE & SPORT (magnet de talent + vibrație urbană)
// Universități (pol de tineri/talent → retenție + economie pe 30 ani) și
// infrastructură sportivă (stadioane/arene + evenimente). Date publice (ARACIS/
// universități, federații, primării). Alimentează nota UrbanX + cinematic + MP + PMUD.
// 17 iunie 2026 | ThinkSmart Solutions SRL
// ═══════════════════════════════════════════════════════════════════════════
(function(G){
'use strict';
function N(v){ return isNaN(+v)?'-':Math.round(v).toLocaleString('ro-RO'); }
function cl(v,lo,hi){ return Math.max(lo==null?2:lo,Math.min(hi==null?99:hi,Math.round(v))); }

// Poli universitari reali (selecție publică) — studenți (ordin de mărime).
var EDU = {
  'RO-IS-01': {studenti:55000, univ:['UAIC (1860 — cea mai veche univ. modernă din RO)','Univ. Tehnică „Gh. Asachi"','UMF „Gr. T. Popa"','USAMV','Univ. de Arte'], pol:'major (#2–3 național)'},
  'RO-SV-01': {studenti:10000, univ:['Univ. „Ștefan cel Mare" Suceava (USV)'], pol:'regional'},
  'RO-GL-01': {studenti:13000, univ:['Univ. „Dunărea de Jos" Galați (UDJ)'], pol:'regional'},
  'RO-NT-01': {studenti:3000,  univ:['extensii universitare'], pol:'redus'},
  'RO-B-01':  {studenti:160000,univ:['Univ. București','Politehnica','ASE','UMF Carol Davila','+ zeci'], pol:'capital — cel mai mare'},
};
// Stadioane / arene majore reale (coord aproximative).
var SPORT = {
  'RO-IS-01': {arene:[{n:'Stadionul „Emil Alexandrescu"', cap:11000, lat:47.1730, lon:27.5790}], note:'CSM Politehnica Iași (fotbal)'},
  'RO-SV-01': {arene:[{n:'Stadionul Areni', cap:12500, lat:47.6500, lon:26.2480}], note:'Foresta / sport local'},
  'RO-GL-01': {arene:[{n:'Stadionul „Dunărea"', cap:8200, lat:45.4300, lon:28.0400}], note:'Oțelul Galați'},
  'RO-NT-01': {arene:[{n:'Stadionul Ceahlăul', cap:18000, lat:46.9250, lon:26.3650}], note:'Ceahlăul P. Neamț'},
  'RO-B-01':  {arene:[{n:'Arena Națională', cap:55600, lat:44.4378, lon:26.1526},{n:'Stadionul Steaua (Ghencea)', cap:31000, lat:44.4100, lon:26.0510}], note:'capitală — multiple arene + evenimente internaționale'},
};
// Modele: poli universitari/sportivi de succes (RO + EU).
var MODELS = [
  {n:'Cluj-Napoca', note:'UBB (cea mai mare univ. RO) + Cluj Arena + Untold/TIFF — magnet de tineri'},
  {n:'Craiova', note:'Stadionul „Ion Oblemenco" (modern 2017) — regenerare prin sport'},
  {n:'München (DE)', note:'universități + Allianz Arena — ecosistem talent + sport'},
];

G._UrbanVitality = {
  EDU:EDU, SPORT:SPORT, MODELS:MODELS,
  edu: function(cityKey, city){
    city=city||{}; var e=EDU[cityKey];
    if(e) return e;
    var pop=city.pop2021||city.pop||30000, hasU=(city.universitati||0)>0||pop>=120000;
    return {studenti: hasU?Math.round(pop*0.07):Math.round(pop*0.01), univ: hasU?['universitate locală/regională']:['fără universitate proprie'], pol: hasU?'regional':'redus', _est:true};
  },
  sport: function(cityKey, city){
    city=city||{}; var s=SPORT[cityKey];
    if(s) return s;
    var cx=city.lon||27, cy=city.lat||47, pop=city.pop2021||city.pop||30000;
    return {arene:[{n:'Stadion municipal', cap: pop>=100000?15000:6000, lat:cy+0.012, lon:cx+0.012}], note:'sport local', _est:true};
  },
  // scoruri 0-100
  eduScore: function(cityKey, city){ var e=this.edu(cityKey,city); var pop=(city&&(city.pop2021||city.pop))||50000;
    return cl(20 + Math.min(60, (e.studenti/Math.max(20000,pop))*180) + (e.univ&&e.univ.length>1?12:0) + (e.pol&&e.pol.indexOf('major')>=0?10:e.pol&&e.pol.indexOf('capital')>=0?14:0)); },
  sportScore: function(cityKey, city){ var s=this.sport(cityKey,city); var cap=(s.arene||[]).reduce(function(a,x){return a+(x.cap||0);},0);
    return cl(25 + Math.min(55, cap/1000) + ((s.arene||[]).length>1?12:0)); },
  // bonusuri nota UrbanX
  eduBonus: function(cityKey, city){ var v=this.eduScore(cityKey,city); return v>=70?6:v>=55?4:v>=40?2:0; },     // capital uman
  sportBonus: function(cityKey, city){ var v=this.sportScore(cityKey,city); return v>=65?3:v>=45?2:1; },          // calitate/atractivitate

  buildFeatures: function(cityKey, city){
    city=city||{}; var e=this.edu(cityKey,city), s=this.sport(cityKey,city), pts=[], labels=[];
    var cx=city.lon||27, cy=city.lat||47, latC=Math.cos(cy*Math.PI/180)||0.7;
    // campus universitar (un marker langa centru) + eticheta cu studenti
    pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx+0.012/latC,cy+0.008]},properties:{c:'#38bdf8',k:'edu'}});
    labels.push({lon:cx+0.012/latC,lat:cy+0.008,color:'#38bdf8',icon:'🎓',title:'POL UNIVERSITAR',sub:N(e.studenti)+' studenți · '+e.pol});
    (s.arene||[]).forEach(function(ar){
      pts.push({type:'Feature',geometry:{type:'Point',coordinates:[ar.lon,ar.lat]},properties:{c:'#22c55e',k:'sport'}});
      labels.push({lon:ar.lon,lat:ar.lat,color:'#22c55e',icon:'🏟',title:ar.n.slice(0,28),sub:N(ar.cap)+' locuri'});
    });
    return {pts:pts, labels:labels};
  },

  renderChapter: function(D, cityKey, city){
    if(!D||!D.pdf) return; city=city||{};
    var e=this.edu(cityKey,city), s=this.sport(cityKey,city);
    var es=this.eduScore(cityKey,city), ss=this.sportScore(cityKey,city);
    var cap=(s.arene||[]).reduce(function(a,x){return a+(x.cap||0);},0);
    D.chapter('Educație, talent și sport — atractivitate și capital uman');
    D.P('Universitățile sunt cel mai puternic magnet de tineri și talent: un pol universitar puternic înseamnă populație tânără, forță de muncă calificată, antreprenoriat și retenție pe termen lung — factori decisivi pentru economia următorilor 30 de ani. Infrastructura sportivă (stadioane, arene, baze) și evenimentele aduc vibrație, sănătate publică, turism sportiv și imagine.');
    if(D.kpis) D.kpis([
      {val:N(e.studenti), label:'Studenți (ordin de mărime)', sub:'pol '+e.pol},
      {val:es+'/100', label:'Scor educație/talent', sub:'magnet de tineri'},
      {val:ss+'/100', label:'Scor sport', sub:N(cap)+' locuri arene'},
    ]);
    D.h2('Pol universitar');
    D.bullets((e.univ||[]).map(function(u){ return ['Instituție', u]; }));
    D.P('Retenția absolvenților este cheia: orașele care oferă locuri de muncă, locuințe accesibile și calitate a vieții își păstrează tinerii; altfel finanțează gratuit forța de muncă a altor orașe. Iași și Cluj sunt exemple de poli care convertesc studenția în economie (IT, servicii).');
    D.h2('Infrastructură sportivă și evenimente');
    if(s.arene&&s.arene.length) D.bullets(s.arene.map(function(ar){ return [ar.n, N(ar.cap)+' locuri'+(s._est?' (estimare)':'')+'.']; }));
    D.bullets([
      ['Turism sportiv', 'meciurile, competițiile și maratoanele umplu hotelurile și prelungesc sezonul (vezi capitolul Cultură & turism).'],
      ['Sănătate publică', 'bazele sportive accesibile reduc costurile de sănătate și cresc calitatea vieții.'],
      ['Impact UrbanX', 'educația ridică scorul de capital uman, iar sportul pe cel de calitate a vieții/atractivitate.'],
    ]);
    D.h2('Benchmark');
    D.bullets(MODELS.map(function(m){ return [m.n, m.note]; }));
    if(D.sourceBadges) D.sourceBadges(['ARACIS / universități','INS educație','Federații sportive','Primării / baze sportive','Eurostat']);
  }
};
console.log('[UrbanVitality] ✅ modul educatie & sport incarcat');
})(window);
