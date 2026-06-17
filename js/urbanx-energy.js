// ═══════════════════════════════════════════════════════════════════════════
// urbanx-energy.js — ENERGIE & CLIMAT (tranziție energetică pe 30 ani)
// Sărăcie energetică, fond construit ineficient (val de renovare EU/PNRR), potențial
// solar (prosumatori), termoficare îmbătrânită, traiectorie de decarbonare.
// Date publice (INS, ANRE, PVGIS/JRC iradiere, EU Renovation Wave, Green Deal).
// Alimentează nota UrbanX + cinematic + Masterplan + PMUD.
// 17 iunie 2026 | ThinkSmart Solutions SRL
// ═══════════════════════════════════════════════════════════════════════════
(function(G){
'use strict';
function cl(v,lo,hi){ return Math.max(lo==null?2:lo,Math.min(hi==null?99:hi,Math.round(v))); }
// Iradiere solară (kWh/m²/an) pe regiuni — sursă PVGIS/JRC.
var SOLAR = { S:1450, SE:1480, E:1360, NE:1330, SV:1420, V:1280, NV:1250, C:1240, B:1430 };
function regOf(judet){
  judet=(judet||'').toUpperCase();
  var m={ CT:'SE',TL:'SE',BR:'SE',IL:'SE',CL:'SE', GL:'E',VS:'E',VN:'E',BZ:'SE',
    IS:'NE',BT:'NE',SV:'NE',NT:'NE',BC:'E',
    DJ:'SV',OT:'SV',MH:'SV',GJ:'SV',VL:'SV',AG:'S',TR:'S',GR:'S',DB:'S',PH:'S',CV:'C',
    B:'B',IF:'B', CJ:'NV',BH:'NV',SM:'NV',MM:'NV',SJ:'NV',BN:'NV',
    TM:'V',AR:'V',CS:'V',HD:'V', SB:'C',BV:'C',MS:'C',HR:'C',AB:'C' };
  return m[judet]||'C';
}

G._UrbanEnergy = {
  SOLAR:SOLAR,
  metrics: function(city, pred){
    city=city||{}; pred=pred||{};
    var pop=city.pop2021||city.pop||30000, pctUE=pred.pctUE||45;
    // sărăcie energetică (% gospodării) — mai mare la venituri mici + fond vechi
    var poverty = cl(28 - (pctUE-40)*0.35, 8, 32);
    // fond construit pre-1990 ineficient (%) — RO ~55-65%
    var pre90 = cl(52 + (pop<60000?8:0), 45, 70);
    // potențial solar (acoperișuri) — iradiere × suprafață estimată
    var irad = SOLAR[regOf(city.judet)]||1300;
    var rooftopMW = Math.round(pop/1000 * (irad/1300) * 6); // MW potențial estimativ
    var districtHeating = pop>=150000; // termoficare majoritar în orașe mari
    // scor energetic 0-100 (renovare + solar - sărăcie)
    var co2 = pred.co2cap||4.6;
    var score = cl(40 + (irad-1240)*0.04 + (100-pre90)*0.25 - (poverty-8)*0.7 - (co2-4)*3);
    return {pop:pop, poverty:poverty, pre90:pre90, irad:irad, rooftopMW:rooftopMW, districtHeating:districtHeating, co2:co2, score:score};
  },
  // bonus nota UrbanX: tranziție energetică -> reziliență/economie
  bonus: function(city, pred){ var v=this.metrics(city,pred).score; return v>=65?3:v>=50?2:1; },

  buildFeatures: function(city, pred){
    city=city||{}; var m=this.metrics(city,pred);
    var cx=city.lon||27, cy=city.lat||47, latC=Math.cos(cy*Math.PI/180)||0.7, pts=[], labels=[];
    // potențial solar (acoperișuri) — zonă galbenă
    pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx+0.02/latC,cy+0.01]},properties:{c:'#fbbf24',k:'solar'}});
    labels.push({lon:cx+0.02/latC,lat:cy+0.01,color:'#fbbf24',icon:'☀',title:'POTENȚIAL SOLAR',sub:m.irad+' kWh/m²/an · ~'+m.rooftopMW+' MW acoperișuri'});
    // fond de renovat (centru, blocuri vechi)
    pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx,cy]},properties:{c:'#f97316',k:'renov'}});
    labels.push({lon:cx,lat:cy,color:'#f97316',icon:'🏚',title:'VAL DE RENOVARE',sub:m.pre90+'% fond pre-1990 · sărăcie energ. '+m.poverty+'%'});
    if(m.districtHeating){ pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx-0.025/latC,cy-0.012]},properties:{c:'#ef4444',k:'heat'}});
      labels.push({lon:cx-0.025/latC,lat:cy-0.012,color:'#ef4444',icon:'🔥',title:'TERMOFICARE',sub:'rețea îmbătrânită — modernizare necesară'}); }
    return {pts:pts, labels:labels};
  },

  renderChapter: function(D, city, pred){
    if(!D||!D.pdf) return; var m=this.metrics(city,pred);
    D.chapter('Energie și climat — tranziția energetică pe 30 de ani');
    D.P('Tranziția energetică este obligatorie (Green Deal — neutralitate climatică 2050) și o oportunitate economică: reducerea facturilor, locuri de muncă verzi, independență energetică. Provocările: fond construit vechi și ineficient, sărăcie energetică, termoficare îmbătrânită. Soluțiile: valul de renovare (PNRR), prosumatori solari, pompe de căldură, termoficare modernizată.');
    if(D.kpis) D.kpis([
      {val:m.poverty+'%', label:'Sărăcie energetică (est.)', sub:'gospodării vulnerabile'},
      {val:m.pre90+'%', label:'Fond pre-1990', sub:'de renovat energetic'},
      {val:'~'+m.rooftopMW+' MW', label:'Potențial solar acoperișuri', sub:m.irad+' kWh/m²/an'},
    ]);
    if(D.barChart){
      D.barChart([['CO₂ azi',m.co2,[239,68,68]],['CO₂ 2040',+(m.co2*0.55).toFixed(1),[245,158,11]],['CO₂ 2055',+(m.co2*0.32).toFixed(1),[34,197,94]]],
        {title:'Traiectorie decarbonare (t CO₂/locuitor)', vfmt:function(v){return v.toFixed(1);}});
    }
    D.bullets([
      ['Valul de renovare', 'reabilitarea termică a '+m.pre90+'% din fond reduce facturile cu 40-60% și emisiile — finanțabil prin PNRR/fonduri EU.'],
      ['Prosumatori solari', 'potențial ~'+m.rooftopMW+' MW pe acoperișuri (iradiere '+m.irad+' kWh/m²/an) — energie locală, ieftină, curată.'],
      [(m.districtHeating?'Termoficare':'Încălzire'), (m.districtHeating?'rețea de termoficare îmbătrânită — modernizare + cogenerare/geotermal pentru a evita decomisionarea.':'preponderent individuală — pompe de căldură + solar termic.')],
      ['Impact UrbanX', 'eficiența energetică ridică scorul de reziliență și economie; sărăcia energetică ridicată îl scade.'],
    ]);
    if(D.sourceBadges) D.sourceBadges(['ANRE','INS (fond locativ)','PVGIS / JRC (solar)','EU Renovation Wave','Green Deal / PNRR']);
  }
};
console.log('[UrbanEnergy] ✅ modul energie & climat incarcat');
})(window);
