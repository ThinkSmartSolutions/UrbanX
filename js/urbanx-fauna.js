// ═══════════════════════════════════════════════════════════════════════════
// urbanx-fauna.js — FAUNA URBANA & SIGURANTA (#8 animale fără adăpost, #9 urși)
// Statistici + estimări din context public: programe naționale câini fără stăpân
// (OUG 155/2001, Legea 258/2013, ASPA), recensământ urși Min. Mediului 2023
// (~8.000 urși bruni — cea mai mare populație din UE), RO-Alert / Romsilva.
// Influențează nota UrbanX (calitatea vieții + siguranță) + apare în cinematic,
// Masterplan și PMUD. Estimările per-UAT sunt MARCATE ca model, nu cifre oficiale.
// 17 iunie 2026 | ThinkSmart Solutions SRL
// ═══════════════════════════════════════════════════════════════════════════
(function(G){
'use strict';
function N(v){ return isNaN(+v)?'-':Math.round(v).toLocaleString('ro-RO'); }

// Județe cu prezență confirmată a ursului brun (Romsilva / Min. Mediului) + nivel.
// AG include Transfăgărășanul (hotspot turistic cu hrănire ilegală).
var BEARS = {
  HR:{lvl:'foarte ridicat', n:'Harghita — nucleu major al populației de urși'},
  CV:{lvl:'foarte ridicat', n:'Covasna — densitate mare, conflicte frecvente'},
  BV:{lvl:'ridicat',        n:'Brașov — urși la marginea orașului (Răcădău, Poiana); RO-Alert frecvent'},
  MS:{lvl:'ridicat',        n:'Mureș — păduri întinse, conflicte agricole'},
  SB:{lvl:'ridicat',        n:'Sibiu — zona montană + Transfăgărășan (nord)'},
  AG:{lvl:'ridicat',        n:'Argeș — Transfăgărășan: urși obișnuiți cu hrănirea de la turiști (interzisă)'},
  BN:{lvl:'ridicat',        n:'Bistrița-Năsăud — păduri de munte'},
  PH:{lvl:'mediu',          n:'Prahova — Valea Prahovei, stațiuni montane'},
  BZ:{lvl:'mediu',          n:'Buzău — zona subcarpatică'},
  NT:{lvl:'mediu',          n:'Neamț — masivul Ceahlău și împrejurimi'},
  SV:{lvl:'mediu',          n:'Suceava — Obcinele Bucovinei'},
  VN:{lvl:'mediu',          n:'Vrancea — munți împăduriți'},
  BC:{lvl:'mediu',          n:'Bacău — vest montan'},
  MM:{lvl:'mediu',          n:'Maramureș — masive nordice'},
  CJ:{lvl:'mediu',          n:'Cluj — Apuseni (vest)'},
  AB:{lvl:'mediu',          n:'Alba — Apuseni'},
  HD:{lvl:'mediu',          n:'Hunedoara — Retezat, Parâng'},
  GJ:{lvl:'mediu',          n:'Gorj — sud-vest montan'},
  VL:{lvl:'mediu',          n:'Vâlcea — subcarpați'},
  CS:{lvl:'mediu',          n:'Caraș-Severin — munții Banatului'},
};

G._UrbanFauna = {
  BEARS:BEARS,
  RO_BEARS_TOTAL: 8000, // recensământ Min. Mediului 2023 (cca.), cea mai mare populație UE

  // #8 — câini/pisici fără stăpân: estimare model pe baza populației + nivel
  // de management (orașele mari rulează mai bine programele de sterilizare).
  strays: function(city){
    city = city||{};
    var pop = city.pop2021 || city.pop || 50000;
    // câini fără stăpân la 1.000 loc (estimare model): orașe mari = programe mai
    // bune; orașe mici = control mai slab. (context: post-Legea 258/2013).
    var perK = pop>=250000?5 : pop>=100000?8 : pop>=40000?12 : 16;
    var est = Math.round(pop/1000*perK);
    var sterilNeed = Math.round(est*0.7);                 // % nesterilizați
    var shelterCap = Math.round(est*0.18);                // capacitate padoc estimată
    var pred2030NoAction = Math.round(est*1.6);           // fără sterilizare susținută
    var pred2030Action   = Math.round(est*0.40);          // CNVSU + sterilizare masivă
    return {pop:pop, perK:perK, est:est, sterilNeed:sterilNeed, shelterCap:shelterCap,
            pred2030NoAction:pred2030NoAction, pred2030Action:pred2030Action};
  },
  // padocuri publice (locații estimate la periferie — date exacte la primărie/ASPA)
  shelters: function(city){
    var cx=city.lon||27, cy=city.lat||47, n=(city.pop2021||0)>=150000?2:1, out=[];
    var off=[[0.035,-0.028],[-0.030,0.030]];
    for(var i=0;i<n;i++) out.push({lon:cx+off[i][0], lat:cy+off[i][1], name:'Adăpost public (padoc) — locație estimată'});
    return out;
  },
  // #9 — risc urși pentru județul UAT-ului
  bearRisk: function(judet){
    var b = BEARS[(judet||'').toUpperCase()];
    return b ? {present:true, level:b.lvl, note:b.n} : {present:false, level:'inexistent', note:'Fără prezență semnificativă a urșilor în acest UAT.'};
  },

  // modificator pt nota UrbanX (calitate viață + siguranță): penalizare mică,
  // transparentă, dacă presiunea strays e mare sau riscul de urși ridicat.
  qolModifier: function(city){
    var s = this.strays(city), b = this.bearRisk(city.judet);
    var pen = 0;
    if(s.perK>=12) pen += 4; else if(s.perK>=8) pen += 2;            // strays
    if(b.level==='foarte ridicat') pen += 4; else if(b.level==='ridicat') pen += 2; else if(b.present) pen += 1;
    return { penalty: pen, strays:s, bear:b };
  },

  // Features pt cinematic: hotspots strays + padocuri + (dacă e cazul) zona-tampon urși
  buildFeatures: function(city){
    var cx=city.lon||27, cy=city.lat||47, latC=Math.cos(cy*Math.PI/180)||0.7;
    var pts=[], labels=[];
    // hotspot-uri strays (piețe, blocuri, periferie) — cercuri portocalii
    var hot=[[0.0,0.0],[0.025,0.012],[-0.022,0.015],[0.01,-0.025],[-0.018,-0.02]];
    hot.forEach(function(h,i){ pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx+h[0]/latC,cy+h[1]]},properties:{c:'#f59e0b',k:'stray'}}); });
    labels.push({lon:cx,lat:cy+0.004,color:'#f59e0b',icon:'🐕',title:'CÂINI FĂRĂ STĂPÂN',sub:'hotspot-uri: piețe, blocuri, periferie'});
    // padocuri
    this.shelters(city).forEach(function(s){ pts.push({type:'Feature',geometry:{type:'Point',coordinates:[s.lon,s.lat]},properties:{c:'#22c55e',k:'shelter'}}); labels.push({lon:s.lon,lat:s.lat,color:'#22c55e',icon:'🏠',title:'PADOC PUBLIC',sub:'sterilizare + adopție (loc. estimată)'}); });
    // zona-tampon urși (spre pădure) — dacă județ montan
    var br=this.bearRisk(city.judet);
    if(br.present){
      labels.push({lon:cx-0.04/latC,lat:cy+0.035,color:'#b91c1c',icon:'🐻',title:'RISC URȘI — '+br.level.toUpperCase(),sub:'interfață urban–pădure · RO-Alert'});
      pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx-0.04/latC,cy+0.035]},properties:{c:'#b91c1c',k:'bear'}});
    }
    return {pts:pts, labels:labels, bear:br};
  },

  renderChapter: function(D, city){
    if(!D || !D.pdf) return;
    city = city||{};
    var s=this.strays(city), b=this.bearRisk(city.judet);
    D.chapter('Faună urbană, bunăstare animală și siguranță');
    D.P('Gestionarea faunei urbane influențează direct calitatea vieții, siguranța locuitorilor și atractivitatea turistică a UAT-ului — de aceea contribuie la nota UrbanX. Cifrele de mai jos sunt estimări de model pe baza populației și a contextului legislativ public (OUG 155/2001, Legea 258/2013, programe ASPA); datele exacte se află la primărie / serviciul de gestionare a animalelor.');
    D.h2('Câini fără stăpân — situație și prognoză');
    if(D.kpis) D.kpis([
      {val:N(s.est), label:'Câini fără stăpân (est.)', sub:'~'+s.perK+'/1.000 loc'},
      {val:N(s.sterilNeed), label:'Necesar sterilizare', sub:'pentru stabilizare'},
      {val:N(s.shelterCap), label:'Capacitate padoc (est.)', sub:'adăposturi publice'},
    ]);
    if(D.barChart){
      D.barChart([['Azi',s.est,[245,158,11]],['2030 fără acțiune',s.pred2030NoAction,[239,68,68]],['2030 cu sterilizare',s.pred2030Action,[34,197,94]]],
        {title:'Prognoză populație câini fără stăpân (scenarii)', vfmt:function(v){return String(Math.round(v));}});
    }
    D.bullets([
      ['Fără acțiune', 'populația și reclamațiile cresc (~+60% până în 2030), risc sanitar (rabie, mușcături) și imagine turistică afectată.'],
      ['Cu acțiune (CNVSU + sterilizare masivă + adopție)', 'reducere ~−60% și control durabil; cost mult mai mic decât capturarea repetată.'],
      ['Impact UrbanX', 'presiunea ridicată a câinilor fără stăpân scade scorul de calitate a vieții și siguranță.'],
    ]);
    D.h2('Animale sălbatice — risc urși');
    if(b.present){
      D.P('UAT-ul se află într-un județ cu prezență a ursului brun (nivel: '+b.level+'). '+b.note+' România găzduiește cea mai mare populație de urși bruni din UE (cca. '+N(this.RO_BEARS_TOTAL)+' exemplare, recensământ Min. Mediului 2023). Interfața urban–pădure necesită management: containere anti-urs, interdicția hrănirii, sistem RO-Alert, intervenții Romsilva/jandarmerie.');
      D.bullets([
        ['Măsuri urbane', 'containere de gunoi anti-urs, eliminarea surselor de hrană, garduri electrice la periferie, semnalistică.'],
        ['Turism', 'pe Transfăgărășan și în stațiuni, hrănirea urșilor de la șosea este interzisă și periculoasă — campanii de informare.'],
        ['Impact UrbanX', 'riscul ridicat de urși penalizează scorul de siguranță și necesită investiții de mitigare.'],
      ]);
    } else {
      D.P('Nu există prezență semnificativă a ursului brun în acest UAT. Riscul faunistic sălbatic este redus; atenția se concentrează pe fauna urbană (câini/pisici fără stăpân).');
    }
    // HARTA: hotspot-uri caini + padocuri + risc ursi
    try{ if(window._PdfMap && D.ensure){ var ff=this.buildFeatures(city);
      var mp=(ff.pts||[]).map(function(f){var c=f.geometry.coordinates;return {lon:c[0],lat:c[1],c:(f.properties&&f.properties.c)||'#f59e0b',r:1.8};});
      D.h2('Hartă — faună urbană');
      D.ensure(80); window._PdfMap.draw(D.pdf,{x:D.dims.ML,y:D.y+2,w:Math.min(D.dims.CW,160),h:66,title:'Hotspot-uri câini fără stăpân · padocuri · risc urși',points:mp,cx:city.lon,cy:city.lat,legend:[[[245,158,11],'hotspot câini'],[[34,197,94],'padoc public'],[[185,28,28],'risc urși']]});
      D.setY(D.y+80);
    } }catch(e){ console.warn('[Fauna] harta:',e.message); }
    if(D.sourceBadges) D.sourceBadges(['Min. Mediului (recensământ urși 2023)','Romsilva','RO-Alert','Legea 258/2013','OUG 155/2001','ASPA']);
  }
};
console.log('[UrbanFauna] ✅ modul faună urbană + urși incarcat');
})(window);
