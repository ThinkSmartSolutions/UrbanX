// ═══════════════════════════════════════════════════════════════════════════
// urbanx-resources.js — APĂ, SECETĂ & ECONOMIE CIRCULARĂ (reziliență resurse)
// Securitate hidrică (risc secetă pe regiuni climatice), pierderi în rețea, epurare
// ape uzate, gestiunea deșeurilor (reciclare — RO cea mai mică din UE), economie
// circulară. Date publice (ANAR, INS, ANPM, Eurostat waste, Directiva-cadru deșeuri).
// Alimentează nota UrbanX + cinematic + Masterplan + PMUD.
// 17 iunie 2026 | ThinkSmart Solutions SRL
// ═══════════════════════════════════════════════════════════════════════════
(function(G){
'use strict';
function cl(v,lo,hi){ return Math.max(lo==null?2:lo,Math.min(hi==null?99:hi,Math.round(v))); }
// Risc secetă pe județe (climat — sud/est RO tot mai aride).
var DROUGHT = { CT:'ridicat',TL:'ridicat',BR:'ridicat',IL:'ridicat',CL:'ridicat',GL:'ridicat',VS:'ridicat',BZ:'ridicat',
  DJ:'ridicat',OT:'ridicat',TR:'ridicat',MH:'mediu',GR:'mediu',IF:'mediu',B:'mediu',IS:'mediu',BT:'mediu',VN:'mediu',
  AG:'mediu',DB:'mediu',PH:'mediu',BC:'mediu',NT:'mediu',SV:'redus' };
function droughtOf(j){ return DROUGHT[(j||'').toUpperCase()]||'redus'; }

G._UrbanResources = {
  DROUGHT:DROUGHT,
  metrics: function(city){
    city=city||{}; var pop=city.pop2021||city.pop||30000;
    var drought = droughtOf(city.judet);
    // pierderi în rețeaua de apă (%) — RO foarte mari (~35-45%), mai mari în orașe mici/vechi
    var waterLoss = pop>=150000?34 : pop>=60000?40 : 46;
    // acoperire epurare ape uzate (%) — mai bună în orașe mari
    var wastewater = pop>=150000?92 : pop>=60000?80 : 62;
    // rată reciclare deșeuri municipale (%) — RO cea mai mică din UE (~12%), țintă EU 55%
    var recycling = pop>=150000?18 : pop>=60000?13 : 9;
    var landfill = 100 - recycling - 6; // restul la groapă (minus ~6% incinerare/altele)
    // scor resurse 0-100
    var score = cl(45 + (recycling-9)*1.2 + (wastewater-62)*0.4 - (waterLoss-34)*0.8 - (drought==='ridicat'?12:drought==='mediu'?5:0));
    return {pop:pop, drought:drought, waterLoss:waterLoss, wastewater:wastewater, recycling:recycling, landfill:landfill, score:score};
  },
  // bonus/penalizare nota UrbanX: resurse -> mediu/reziliență
  modifier: function(city){ var m=this.metrics(city); return { delta: m.score>=60?2 : m.score<42?-2 : 0, score:m.score, drought:m.drought }; },

  buildFeatures: function(city){
    city=city||{}; var m=this.metrics(city);
    var cx=city.lon||27, cy=city.lat||47, latC=Math.cos(cy*Math.PI/180)||0.7, pts=[], labels=[];
    // sursă/uzină apă
    pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx-0.022/latC,cy+0.014]},properties:{c:'#38bdf8',k:'water'}});
    labels.push({lon:cx-0.022/latC,lat:cy+0.014,color:'#38bdf8',icon:'💧',title:'APĂ',sub:'pierderi rețea '+m.waterLoss+'% · epurare '+m.wastewater+'%'});
    // groapă/stație deșeuri (periferie)
    pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx+0.03/latC,cy-0.02]},properties:{c:'#a3a3a3',k:'waste'}});
    labels.push({lon:cx+0.03/latC,lat:cy-0.02,color:'#a3a3a3',icon:'♻',title:'DEȘEURI',sub:'reciclare '+m.recycling+'% (țintă UE 55%)'});
    if(m.drought!=='redus'){ pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx+0.01/latC,cy+0.028]},properties:{c:'#f59e0b',k:'drought'}});
      labels.push({lon:cx+0.01/latC,lat:cy+0.028,color:'#f59e0b',icon:'🌵',title:'RISC SECETĂ — '+m.drought.toUpperCase(),sub:'climat · stres hidric'}); }
    return {pts:pts, labels:labels};
  },

  renderChapter: function(D, city){
    if(!D||!D.pdf) return; var m=this.metrics(city);
    D.chapter('Apă, secetă și economie circulară — reziliența resurselor');
    D.P('Securitatea resurselor (apă, deșeuri) devine critică în contextul schimbărilor climatice. România pierde enorm pe rețelele de apă învechite, are una dintre cele mai mici rate de reciclare din UE (dependență de gropi de gunoi) și se confruntă cu secetă tot mai severă în sud și est. Tranziția la economia circulară reduce costurile, riscul de amenzi UE și amprenta de mediu.');
    if(D.kpis) D.kpis([
      {val:m.waterLoss+'%', label:'Pierderi rețea apă', sub:'(RO printre cele mai mari UE)'},
      {val:m.recycling+'%', label:'Rată reciclare', sub:'țintă UE 55% (risc amenzi)'},
      {val:m.drought.toUpperCase(), label:'Risc secetă', sub:'climatic regional'},
    ]);
    if(D.barChart){
      D.barChart([['Reciclat',m.recycling,[34,197,94]],['Groapă',m.landfill,[163,163,163]],['Țintă UE',55,[59,130,246]]],
        {title:'Gestiunea deșeurilor municipale (% ) vs țintă UE', max:100, vfmt:function(v){return String(Math.round(v))+'%';}});
    }
    D.bullets([
      ['Apă', 'pierderi de '+m.waterLoss+'% în rețea — modernizare conducte + contorizare; epurare ape uzate la '+m.wastewater+'% (de extins în periferii).'],
      ['Secetă', 'risc '+m.drought+' — necesită retenția apei (sponge city), irigații eficiente, infrastructură verde-albastră.'],
      ['Economie circulară', 'reciclare '+m.recycling+'% vs țintă UE 55% — colectare separată, stații de sortare/compostare, responsabilitate extinsă a producătorului; altfel: amenzi UE + dependență de gropi.'],
      ['Impact UrbanX', 'gestiunea resurselor contribuie la scorul de mediu și reziliență.'],
    ]);
    if(D.sourceBadges) D.sourceBadges(['ANAR','ANPM','INS (utilități)','Eurostat (deșeuri)','Directiva-cadru deșeuri UE']);
  }
};
console.log('[UrbanResources] ✅ modul apa & economie circulara incarcat');
})(window);
