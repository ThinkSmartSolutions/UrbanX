// ═══════════════════════════════════════════════════════════════════════════
// urbanx-tourism.js — CULTURĂ & TURISM (motor economic pe 30 de ani)
// Obiective culturale reale (teatre, muzee, cetăți, ruine, monumente UNESCO),
// scor de potențial turistic (cultură + accesibilitate aeroport/autostradă +
// patrimoniu + cazare), Via Transilvanica pe hartă, comparații cu orașe-model
// (Sibiu CCE 2007, Sighișoara UNESCO, Alba Iulia, + EU: Salzburg/Kraków/Florența).
// Alimentează nota UrbanX + cinematic + Masterplan + PMUD.
// 17 iunie 2026 | ThinkSmart Solutions SRL
// ═══════════════════════════════════════════════════════════════════════════
(function(G){
'use strict';
function N(v){ return isNaN(+v)?'-':Math.round(v).toLocaleString('ro-RO'); }
function cl(v,lo,hi){ return Math.max(lo==null?2:lo,Math.min(hi==null?99:hi,Math.round(v))); }

// Obiective culturale reale pentru orașe majore (selecție reprezentativă publică).
// tip: teatru/muzeu/cetate/monument/festival. Pt orașele neacoperite -> estimare.
var CULTURE = {
  'RO-IS-01': {unesco:0, teatre:3, muzee:8, festivaluri:['FILIT (literatură)','Sărbătorile Iașului'], obiective:[
    {n:'Palatul Culturii', tip:'monument', lat:47.1585, lon:27.5874},
    {n:'Teatrul Național „V. Alecsandri" (cel mai vechi din RO, 1840)', tip:'teatru', lat:47.1718, lon:27.5766},
    {n:'Mănăstirea Trei Ierarhi', tip:'monument', lat:47.1592, lon:27.5836},
    {n:'Grădina Botanică', tip:'obiectiv', lat:47.1760, lon:27.5520}]},
  'RO-SV-01': {unesco:1, teatre:1, muzee:5, festivaluri:['Festivalul de Datini','EthnoFest'], obiective:[
    {n:'Cetatea de Scaun a Sucevei', tip:'cetate', lat:47.6430, lon:26.2620},
    {n:'Muzeul Bucovinei', tip:'muzeu', lat:47.6470, lon:26.2560},
    {n:'Mănăstirile pictate (UNESCO, în județ — Voroneț)', tip:'monument', lat:47.5170, lon:25.6580}]},
  'RO-GL-01': {unesco:0, teatre:2, muzee:4, festivaluri:['Festivalul Dunării'], obiective:[
    {n:'Faleza Dunării', tip:'obiectiv', lat:45.4220, lon:28.0560},
    {n:'Muzeul de Artă Vizuală', tip:'muzeu', lat:45.4380, lon:28.0470},
    {n:'Grădina Publică', tip:'obiectiv', lat:45.4350, lon:28.0530}]},
  'RO-NT-01': {unesco:0, teatre:1, muzee:4, festivaluri:['Festivalul Ceahlău'], obiective:[
    {n:'Curtea Domnească + Turnul lui Ștefan', tip:'cetate', lat:46.9270, lon:26.3710},
    {n:'Masivul Ceahlău (turism montan)', tip:'obiectiv', lat:46.9700, lon:25.9500}]},
  'RO-B-01': {unesco:0, teatre:20, muzee:60, festivaluri:['Enescu','TIFF Bucharest','Untold-adjacent'], obiective:[
    {n:'Ateneul Român', tip:'monument', lat:44.4413, lon:26.0972},
    {n:'Muzeul Național de Artă', tip:'muzeu', lat:44.4396, lon:26.0958},
    {n:'Palatul Parlamentului', tip:'monument', lat:44.4275, lon:26.0875}]},
};

// Orașe-model de succes turistic (RO + EU) pentru benchmark.
var MODELS = [
  {n:'Sibiu', note:'Capitală Culturală Europeană 2007 — regenerare prin cultură; +turism susținut'},
  {n:'Sighișoara', note:'cetate medievală UNESCO — turism patrimonial'},
  {n:'Alba Iulia', note:'Cetatea Alba Carolina restaurată — model de regenerare urbană prin turism'},
  {n:'Brașov', note:'cetate + Poiana Brașov — city-break + turism montan'},
  {n:'Salzburg (AT)', note:'oraș-muzeu + festival — turism cultural de top EU'},
  {n:'Kraków (PL)', note:'centru istoric UNESCO — model de city-break est-european'},
];

// VIA TRANSILVANICA — traseu real ~1.400 km (Putna → Drobeta-Turnu Severin),
// Asociația Tășuleasa Social. Waypoints aproximativi (lon,lat).
var VIA = [
  [25.612,47.872],[25.360,47.340],[24.880,47.220],[24.490,47.133],[24.710,46.770],
  [24.792,46.219],[24.350,46.162],[23.890,46.110],[23.570,46.067],[23.570,45.960],
  [23.160,45.890],[22.900,45.880],[22.760,45.300],[22.660,44.630]
];
var VIA_JUDETE = ['SV','BN','MS','HR','SB','AB','HD','CS','GJ','MH'];

function _hav(la1,lo1,la2,lo2){var R=6371,d=Math.PI/180,dla=(la2-la1)*d,dlo=(lo2-lo1)*d;var a=Math.sin(dla/2)*Math.sin(dla/2)+Math.cos(la1*d)*Math.cos(la2*d)*Math.sin(dlo/2)*Math.sin(dlo/2);return 2*R*Math.asin(Math.min(1,Math.sqrt(a)));}

G._UrbanTourism = {
  CULTURE:CULTURE, MODELS:MODELS, VIA:VIA,

  // obiective culturale (reale dacă există, altfel estimate generic)
  assets: function(cityKey, city){
    city=city||{};
    var c = CULTURE[cityKey];
    if(c) return c;
    var pop=city.pop2021||city.pop||30000;
    return { unesco:0, teatre: pop>=150000?2:pop>=60000?1:0, muzee: Math.max(1,Math.round(pop/25000)),
      festivaluri:['eveniment local'], obiective:[ {n:'Centru istoric / obiective locale', tip:'obiectiv', lat:city.lat||47, lon:city.lon||27} ], _est:true };
  },

  // Via Transilvanica trece prin județ / aproape de oraș?
  viaNear: function(city){
    var jud=(city.judet||'').toUpperCase();
    if(VIA_JUDETE.indexOf(jud)>=0) return {near:true, why:'traversează județul'};
    var lat=city.lat||47, lon=city.lon||27, m=1e9;
    VIA.forEach(function(p){ var d=_hav(lat,lon,p[1],p[0]); if(d<m)m=d; });
    return {near:m<=40, dist:Math.round(m), why:m<=40?('la ~'+Math.round(m)+' km'):''};
  },

  // scor turistic 0-100: cultură + accesibilitate (aeroport/autostradă) + patrimoniu
  score: function(cityKey, city){
    city=city||{}; var a=this.assets(cityKey,city);
    var cult = cl(20 + a.unesco*22 + a.teatre*6 + Math.min(24,a.muzee*2.5) + (a.obiective?a.obiective.length*3:0));
    var acc = 30;
    try{ if(G._RegioInfra){ var ap=G._RegioInfra.nearestAirports(city.lat||47,city.lon||27,60,1)[0];
      if(ap&&ap.distKm<=15)acc+=30; else if(ap&&ap.distKm<=40)acc+=18; else acc+=6;
      var hw=G._RegioInfra.relevantHighways(city.lat||47,city.lon||27,60); if(hw.length)acc+=12; } }catch(e){}
    var via=this.viaNear(city); var vbon=via.near?12:0;
    var score=cl(Math.round(cult*0.55 + Math.min(60,acc)*0.30 + vbon + (a.unesco?8:0)));
    return {score:score, cult:cult, acc:Math.min(60,acc), via:via, assets:a};
  },

  // mic bonus pt nota UrbanX (atractivitate/vibrație culturală)
  rankBonus: function(cityKey, city){ var s=this.score(cityKey,city); return s.score>=70?5:s.score>=55?3:s.score>=40?1:0; },

  // features cinematic: obiective + Via Transilvanica (dacă aproape)
  buildFeatures: function(cityKey, city){
    city=city||{}; var a=this.assets(cityKey,city), pts=[], labels=[], lines=[];
    var ic={teatru:'🎭',muzeu:'🏛',cetate:'🏰',monument:'⛪',obiectiv:'📍'};
    (a.obiective||[]).forEach(function(o){
      pts.push({type:'Feature',geometry:{type:'Point',coordinates:[o.lon,o.lat]},properties:{c:'#e879f9',k:o.tip}});
      labels.push({lon:o.lon,lat:o.lat,color:'#e879f9',icon:ic[o.tip]||'📍',title:o.n.slice(0,32),sub:o.tip});
    });
    var via=this.viaNear(city);
    if(via.near){ lines.push({type:'Feature',geometry:{type:'LineString',coordinates:VIA},properties:{c:'#f59e0b'}});
      var mid=VIA[Math.floor(VIA.length/2)]; labels.push({lon:mid[0],lat:mid[1],color:'#f59e0b',icon:'🥾',title:'VIA TRANSILVANICA',sub:'~1.400 km · '+via.why}); }
    return {pts:pts, labels:labels, lines:lines, mainObj:(a.obiective&&a.obiective[0])||null};
  },

  renderChapter: function(D, cityKey, city){
    if(!D||!D.pdf) return; city=city||{};
    var s=this.score(cityKey,city), a=s.assets;
    D.chapter('Cultură și turism — motor economic și de identitate');
    D.P('Cultura și turismul nu sunt „decor": sunt un segment economic cu efecte directe pe 30 de ani — locuri de muncă, venituri la bugetul local, atragerea tinerilor și a investițiilor, imaginea orașului. Un oraș care vibrează cultural (teatre, muzee, festivaluri, cetăți, patrimoniu) reține populația și atrage vizitatori. Accesibilitatea (aeroport, autostradă) și traseele tematice amplifică acest potențial.');
    if(D.kpis) D.kpis([
      {val:s.score+'/100', label:'Potențial turistic', sub:'cultură + accesibilitate'},
      {val:N(a.muzee)+' muzee · '+N(a.teatre)+' teatre', label:'Infrastructură culturală', sub:(a.unesco?a.unesco+' sit UNESCO':'fără UNESCO')},
      {val:(s.via.near?'DA':'NU'), label:'Via Transilvanica', sub:(s.via.why||'la peste 40 km')},
    ]);
    D.h2('Obiective culturale și turistice');
    if(a.obiective&&a.obiective.length) D.bullets(a.obiective.map(function(o){ return [o.n, 'tip: '+o.tip+(a._est?' (estimare)':'')+'.']; }));
    if(a.festivaluri&&a.festivaluri.length) D.P('Evenimente / festivaluri: '+a.festivaluri.join(', ')+'. Festivalurile generează vârfuri de ocupare hotelieră și expunere media — pârghie de dezvoltare.');
    D.h2('Cum devine orașul atractiv pentru turiști');
    D.bullets([
      ['Accesibilitate', 'aeroport + autostradă reduc timpul de acces — turismul de city-break depinde de conexiuni rapide (vezi capitolul Infrastructură regională).'],
      ['Patrimoniu activat', 'cetăți/ruine restaurate și puse în circuit (model Alba Carolina) — regenerare urbană prin turism.'],
      ['Trasee tematice', 'Via Transilvanica (~1.400 km, Putna→Drobeta) și rutele culturale aduc turism lent, distribuit teritorial.'],
      ['Evenimente + sport', 'festivaluri, stadioane și competiții sportive umplu orașul și prelungesc sezonul turistic.'],
      ['Impact UrbanX', 'vibrația culturală ridică scorul de calitate a vieții și atractivitate din nota UrbanX.'],
    ]);
    D.h2('Benchmark — orașe-model de succes turistic');
    D.bullets(MODELS.map(function(m){ return [m.n, m.note]; }));
    if(D.sourceBadges) D.sourceBadges(['INS (turism)','Min. Culturii / LMI','UNESCO','Via Transilvanica (Tășuleasa Social)','Eurostat tourism']);
  }
};
console.log('[UrbanTourism] ✅ modul cultura & turism incarcat');
})(window);
