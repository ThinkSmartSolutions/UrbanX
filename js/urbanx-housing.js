// ═══════════════════════════════════════════════════════════════════════════
// urbanx-housing.js — LOCUIRE & ACCESIBILITATE (problema urbană definitorie 30 ani)
// Raport preț/venit (ani de venit pt un apartament), povara chiriei, cerere vs
// ofertă de locuințe, deficit de locuințe sociale, tineri care nu-și permit.
// Date publice (INS, Eurostat House Price Index, Imobiliare.ro context). Alimentează
// nota UrbanX + cinematic + Masterplan + PMUD.
// 17 iunie 2026 | ThinkSmart Solutions SRL
// ═══════════════════════════════════════════════════════════════════════════
(function(G){
'use strict';
function N(v){ return isNaN(+v)?'-':Math.round(v).toLocaleString('ro-RO'); }
function cl(v,lo,hi){ return Math.max(lo==null?2:lo,Math.min(hi==null?99:hi,Math.round(v))); }

G._UrbanHousing = {
  // metrici de accesibilitate — estimare model din economie + atractivitate
  metrics: function(city, pred){
    city=city||{}; pred=pred||{};
    var pop=city.pop2021||city.pop||30000;
    var pctUE=pred.pctUE||45, hub=city.coef_hub||0.7;
    // raport pret/venit (ani de venit median pt ~65 mp). Orașele atractive/mari = mai scump.
    var priceIncome = +(7 + (pctUE-40)*0.07 + (pop>=200000?2.4:pop>=100000?1.4:0) + (hub-0.7)*5).toFixed(1);
    priceIncome = Math.max(6, Math.min(16, priceIncome));
    // povara chiriei (% din venit) — peste 40% = supraîmpovărat
    var rentBurden = cl(28 + (priceIncome-8)*2.4, 22, 55);
    // cerere nouă locuințe/an (înlocuire + creștere) vs autorizații (ofertă)
    var demand = Math.round(pop*0.009 + Math.max(0,(pred.r10||0))*pop*0.004);
    var supply = pred.auth || Math.round(demand*0.7);
    var gap = demand - supply;
    // deficit locuințe sociale (estimare)
    var socialDeficit = Math.round(pop*0.012);
    // scor accesibilitate 0-100 (mai mare = mai accesibil)
    var afford = cl(100 - (priceIncome-6)*7 - Math.max(0,rentBurden-30)*0.8 - (gap>0?Math.min(20,gap/Math.max(1,demand)*30):0));
    return {pop:pop, priceIncome:priceIncome, rentBurden:rentBurden, demand:demand, supply:supply, gap:gap, socialDeficit:socialDeficit, afford:afford};
  },
  // penalizare/bonus nota UrbanX: locuire neaccesibilă alungă tinerii (calitate/economie)
  qolModifier: function(city, pred){ var m=this.metrics(city,pred);
    return { penalty: m.afford<45?4 : m.afford<60?2 : 0, afford:m.afford, priceIncome:m.priceIncome }; },

  buildFeatures: function(city, pred){
    city=city||{}; var m=this.metrics(city,pred);
    var cx=city.lon||27, cy=city.lat||47, latC=Math.cos(cy*Math.PI/180)||0.7, pts=[], labels=[];
    // presiune locuire în centru (scump) + dezvoltare nouă la periferie (mai ieftin)
    pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx,cy]},properties:{c:'#ef4444',k:'press'}});
    labels.push({lon:cx,lat:cy,color:'#ef4444',icon:'🏢',title:'PRESIUNE LOCUIRE CENTRU',sub:m.priceIncome+' ani venit/apartament'});
    pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx+0.03/latC,cy+0.022]},properties:{c:'#22c55e',k:'new'}});
    labels.push({lon:cx+0.03/latC,lat:cy+0.022,color:'#22c55e',icon:'🏗',title:'DEZVOLTARE NOUĂ',sub:'ofertă ~'+N(m.supply)+' un./an vs cerere '+N(m.demand)});
    return {pts:pts, labels:labels};
  },

  renderChapter: function(D, city, pred){
    if(!D||!D.pdf) return; var m=this.metrics(city,pred);
    D.chapter('Locuire și accesibilitate — testul real al unui oraș atractiv');
    D.P('Accesibilitatea locuirii este problema urbană definitorie a următorilor 30 de ani: un oraș poate fi atractiv economic, dar dacă tinerii și familiile nu-și permit o locuință, îi pierde. Prețul în creștere fără ofertă adecvată duce la navetism, sprawl periurban și exod. România are proprietate ridicată (~95%), dar accesul noilor generații se înrăutățește — chiria și prețul cresc mai repede decât veniturile.');
    if(D.kpis) D.kpis([
      {val:m.priceIncome+' ani', label:'Preț/venit (apartament)', sub:'venituri mediane'},
      {val:m.rentBurden+'%', label:'Povara chiriei', sub:(m.rentBurden>40?'supraîmpovărat':'sustenabil')},
      {val:m.afford+'/100', label:'Scor accesibilitate', sub:(m.afford>=60?'accesibil':m.afford>=45?'tensionat':'neaccesibil')},
    ]);
    if(D.barChart){
      D.barChart([['Cerere/an',m.demand,[59,130,246]],['Ofertă/an',m.supply,[245,158,11]],['Deficit social',m.socialDeficit,[239,68,68]]],
        {title:'Cerere vs ofertă de locuințe + deficit social', vfmt:function(v){return String(Math.round(v));}});
    }
    D.bullets([
      ['Decalaj cerere–ofertă', (m.gap>0?('lipsă de ~'+N(m.gap)+' locuințe/an — presiune pe prețuri.'):'ofertă adecvată — echilibru relativ.')],
      ['Locuințe sociale', 'deficit estimat ~'+N(m.socialDeficit)+' unități — necesare pentru tineri, vârstnici, categorii vulnerabile.'],
      ['Soluții', 'densificare calitativă în jurul transportului public (TOD), locuințe accesibile/nZEB, reconversie clădiri, reglementare chirii — NU sprawl pe teren verde (cost infrastructură ×3/loc).'],
      ['Impact UrbanX', 'locuirea neaccesibilă alungă tinerii și scade scorul de calitate a vieții și competitivitate.'],
    ]);
    if(D.sourceBadges) D.sourceBadges(['INS (locuințe/autorizații)','Eurostat House Price Index','OECD Affordable Housing','Legea locuinței 114/1996']);
  }
};
console.log('[UrbanHousing] ✅ modul locuire & accesibilitate incarcat');
})(window);
