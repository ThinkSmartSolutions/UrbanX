// ═══════════════════════════════════════════════════════════════════════════
// urbanx-fauna.js — FAUNA URBANA & SIGURANTA (#8 animale fără adăpost, #9 faună sălbatică)
// Statistici + estimări din context public: programe naționale câini fără stăpân
// (OUG 155/2001, Legea 258/2013, ASPA), recensământ urși Min. Mediului 2023
// (~8.000 urși bruni — cea mai mare populație din UE), populații carnivore mari și
// vânat (Romsilva / ICAS / INCDS), expansiunea șacalului auriu, PPA (mistreț), RO-Alert.
// FAUNĂ MULTI-SPECIE per UAT: în unele UAT problema sunt urșii, în altele lupii,
// vulpile, mistreții sau șacalii — modelul alege speciile relevante pentru județ.
// Influențează nota UrbanX (calitatea vieții + siguranță) + apare în cinematic,
// Masterplan și PMUD. Estimările per-UAT sunt MARCATE ca model, nu cifre oficiale.
// 17 iunie 2026 · actualizat 27 iunie 2026 (multi-specie) | ThinkSmart Solutions SRL
// ═══════════════════════════════════════════════════════════════════════════
(function(G){
'use strict';
function N(v){ return isNaN(+v)?'-':Math.round(v).toLocaleString('ro-RO'); }
function U(j){ return (j||'').toUpperCase(); }

// ── Specii de faună sălbatică relevante pentru siguranța comunităților (RO) ──
var SPECIES = {
  urs:     {icon:'🐻', name:'Urs brun',     color:'#b91c1c'},
  lup:     {icon:'🐺', name:'Lup',          color:'#7c3aed'},
  mistret: {icon:'🐗', name:'Mistreț',      color:'#92400e'},
  vulpe:   {icon:'🦊', name:'Vulpe',        color:'#ea580c'},
  sacal:   {icon:'🐾', name:'Șacal auriu',  color:'#a16207'},
  ras:     {icon:'🐆', name:'Râs',          color:'#0891b2'},
};
var LVL_RANK = {'foarte ridicat':4,'ridicat':3,'mediu':2,'scăzut':1,'inexistent':0};

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

// Areale (grupuri de județe) pentru celelalte specii.
// Lup: arc carpatic + dealuri împădurite (~2.500-3.000 ex., a doua populație din UE).
var WOLF = ['HR','CV','BV','MS','SB','AG','BN','NT','SV','VN','BC','MM','CJ','AB','HD','GJ','VL','CS','PH','BZ','AR','TM','MH','DB','SJ','SM'];
// Munte/deal împădurit (mistreț ridicat — pădure); restul = mediu (agricol + PPA).
var FOREST = ['HR','CV','BV','MS','SB','AG','BN','NT','SV','VN','BC','MM','CJ','AB','HD','GJ','VL','CS','PH','BZ','AR','TM','MH','DB','SJ','SM','IS','BT','VS','GL'];
// Șacal auriu — expansiune accentuată în câmpia de sud și sud-est + Dobrogea + Lunca Dunării.
var JACKAL_HIGH = ['TL','CT','IL','CL','GR','TR','BR','GL','MH','CS','DJ','OT'];
var JACKAL_MED  = ['BZ','VN','IF','B','DB','AG','PH','TM','AR','GJ','VL','SV','BC','BT','IS','VS'];

function bearOf(j){ var b=BEARS[U(j)]; return b?{level:b.lvl, note:b.n}:null; }
function inA(arr,j){ return arr.indexOf(U(j))>=0; }

G._UrbanFauna = {
  BEARS:BEARS, SPECIES:SPECIES,
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

  // #9 — FAUNĂ SĂLBATICĂ MULTI-SPECIE per județ. Întoarce lista speciilor relevante,
  // ordonate descrescător după nivelul de risc pentru comunitate.
  wildlife: function(judet){
    var j=U(judet), out=[];
    // Urs
    var b=bearOf(j); if(b) out.push({sp:'urs', level:b.level, note:b.note});
    // Lup
    if(inA(WOLF,j)){
      var wl = (b&&b.level==='foarte ridicat')?'ridicat' : (b&&b.level==='ridicat')?'ridicat':'mediu';
      out.push({sp:'lup', level:wl, note:'Haite în pădurile de munte/deal — atacă turme și câini; atacurile asupra omului sunt rare, dar prezența la stâne și periferii e reală.'});
    }
    // Mistreț — aproape peste tot; pădure = ridicat, câmpie agricolă = mediu (pagube + PPA)
    var mlvl = inA(FOREST,j)?'ridicat':'mediu';
    out.push({sp:'mistret', level:mlvl, note:'Pagube în culturi și grădini, coliziuni rutiere, incursiuni la periferia orașelor; vector al Pestei Porcine Africane (PPA) — restricții sanitar-veterinare.'});
    // Vulpe — pretutindeni; principalul vector al turbării (rabie) silvatice
    out.push({sp:'vulpe', level:'mediu', note:'Prezentă inclusiv în intravilan (gunoaie, gospodării); principalul rezervor al turbării — vaccinare antirabică orală (momeli) coordonată ANSVSA.'});
    // Șacal auriu — în expansiune spre nord
    if(inA(JACKAL_HIGH,j)) out.push({sp:'sacal', level:'ridicat', note:'Populație în creștere rapidă (câmpia de sud/sud-est, Dobrogea, Lunca Dunării); atacă păsări de curte și miei, se apropie de localități.'});
    else if(inA(JACKAL_MED,j)) out.push({sp:'sacal', level:'mediu', note:'Specie în expansiune dinspre câmpie spre dealuri — prezență tot mai frecventă lângă gospodării.'});
    // Râs — doar arc carpatic, discret, rar periculos pentru om
    if(b) out.push({sp:'ras', level:'scăzut', note:'Felina sălbatică a Carpaților, discretă; rar periculoasă pentru om, ocazional pradă animale mici de curte.'});
    // ordonează după risc
    out.sort(function(a,c){ return (LVL_RANK[c.level]||0)-(LVL_RANK[a.level]||0); });
    // atașează meta specie
    out.forEach(function(e){ var s=SPECIES[e.sp]||{}; e.name=s.name; e.icon=s.icon; e.color=s.color; });
    return out;
  },
  // specia dominantă (cel mai mare risc) pentru un județ
  topThreat: function(judet){ var w=this.wildlife(judet); return w.length?w[0]:null; },

  // #9 (compat) — risc urși pentru județul UAT-ului. Păstrat pt apelanții existenți.
  bearRisk: function(judet){
    var b = BEARS[U(judet)];
    return b ? {present:true, level:b.lvl, note:b.n} : {present:false, level:'inexistent', note:'Fără prezență semnificativă a urșilor în acest UAT.'};
  },

  // modificator pt nota UrbanX (calitate viață + siguranță): penalizare mică,
  // transparentă, din presiunea strays + cea mai periculoasă specie sălbatică.
  qolModifier: function(city){
    var s = this.strays(city), b = this.bearRisk(city.judet), w = this.wildlife(city.judet);
    var pen = 0;
    if(s.perK>=12) pen += 4; else if(s.perK>=8) pen += 2;            // strays
    // cea mai periculoasă specie sălbatică (urs/lup/șacal contează mai mult)
    var top = w.length?w[0]:null;
    if(top){
      var heavy = (top.sp==='urs'||top.sp==='lup'||top.sp==='sacal');
      if(top.level==='foarte ridicat') pen += heavy?4:2;
      else if(top.level==='ridicat')   pen += heavy?3:1;
      else if(top.level==='mediu')     pen += 1;
    }
    return { penalty: pen, strays:s, bear:b, wildlife:w, top:top };
  },

  // Features pt cinematic: hotspots strays + padocuri + speciile sălbatice relevante
  buildFeatures: function(city){
    var cx=city.lon||27, cy=city.lat||47, latC=Math.cos(cy*Math.PI/180)||0.7;
    var pts=[], labels=[];
    // hotspot-uri strays (piețe, blocuri, periferie) — cercuri portocalii
    var hot=[[0.0,0.0],[0.025,0.012],[-0.022,0.015],[0.01,-0.025],[-0.018,-0.02]];
    hot.forEach(function(h){ pts.push({type:'Feature',geometry:{type:'Point',coordinates:[cx+h[0]/latC,cy+h[1]]},properties:{c:'#f59e0b',k:'stray'}}); });
    labels.push({lon:cx,lat:cy+0.004,color:'#f59e0b',icon:'🐕',title:'CÂINI FĂRĂ STĂPÂN',sub:'hotspot-uri: piețe, blocuri, periferie'});
    // padocuri
    this.shelters(city).forEach(function(s){ pts.push({type:'Feature',geometry:{type:'Point',coordinates:[s.lon,s.lat]},properties:{c:'#22c55e',k:'shelter'}}); labels.push({lon:s.lon,lat:s.lat,color:'#22c55e',icon:'🏠',title:'PADOC PUBLIC',sub:'sterilizare + adopție (loc. estimată)'}); });
    // faună sălbatică — primele specii relevante (interfața urban–pădure/câmp)
    var w = this.wildlife(city.judet);
    var ring=[[-0.045,0.034],[0.046,0.030],[-0.040,-0.034],[0.040,-0.030]];
    w.slice(0,4).forEach(function(e,i){
      if(e.level==='scăzut') return; // nu aglomera harta cu risc neglijabil
      var off=ring[i%ring.length], lon=cx+off[0]/latC, lat=cy+off[1];
      pts.push({type:'Feature',geometry:{type:'Point',coordinates:[lon,lat]},properties:{c:e.color,k:'wild'}});
      labels.push({lon:lon,lat:lat,color:e.color,icon:e.icon,title:(e.name||'').toUpperCase()+' — '+e.level.toUpperCase(),sub:'interfață urban–natură · RO-Alert/Romsilva'});
    });
    return {pts:pts, labels:labels, bear:this.bearRisk(city.judet), wildlife:w};
  },

  renderChapter: function(D, city){
    if(!D || !D.pdf) return;
    city = city||{};
    var s=this.strays(city), w=this.wildlife(city.judet);
    D.chapter('Faună urbană, bunăstare animală și siguranță');
    D.P('Gestionarea faunei urbane și sălbatice influențează direct calitatea vieții, siguranța locuitorilor și atractivitatea turistică a UAT-ului — de aceea contribuie la nota UrbanX. Cifrele de mai jos sunt estimări de model pe baza populației și a contextului public (OUG 155/2001, Legea 258/2013, programe ASPA, recensământ carnivore mari Min. Mediului/Romsilva); datele exacte se află la primărie, ANSVSA și gestionarul fondului cinegetic.');
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

    // ── Faună sălbatică — MULTI-SPECIE, specifică județului ──
    D.h2('Animale sălbatice periculoase pentru comunitate');
    var dangerous = w.filter(function(e){ return e.level!=='scăzut'; });
    if(dangerous.length){
      var top = w[0];
      D.P('Profilul de risc faunistic al acestui UAT este specific zonei. Specia dominantă pentru comunitate este „'+(top.name||'')+'" (nivel: '+top.level+'). În unele UAT-uri problema principală sunt urșii, în altele lupii, mistreții, vulpile sau șacalii — de aceea măsurile trebuie adaptate speciilor prezente, nu tratate generic.');
      // tabel specii × nivel
      if(D.table){
        D.table(['Specie','Nivel de risc','Observații'],
          w.map(function(e){ return [(e.name||e.sp), e.level, e.note]; }),
          [32,30,114]);
      } else {
        D.bullets(w.map(function(e){ return [(e.name||e.sp)+' — '+e.level, e.note]; }));
      }
      // urs — context național dacă prezent
      if(w.some(function(e){return e.sp==='urs';})){
        D.P('România găzduiește cea mai mare populație de urși bruni din UE (cca. '+N(this.RO_BEARS_TOTAL)+' exemplare, recensământ Min. Mediului 2023). Interfața urban–pădure necesită management: containere anti-urs, interdicția hrănirii, sistem RO-Alert, intervenții Romsilva/jandarmerie.');
      }
      D.bullets([
        ['Măsuri generale', 'managementul deșeurilor (containere anti-urs/închise), eliminarea surselor de hrană din intravilan, garduri electrice la stâne și periferii, semnalistică și avertizare RO-Alert.'],
        ['Specific lup/șacal', 'protecția turmelor (câini de pază, țarcuri de noapte), evidența pagubelor și despăgubiri, descurajarea hrănirii accidentale.'],
        ['Specific mistreț', 'garduri și șanțuri perimetrale la culturi, biosecuritate PPA (Pesta Porcină Africană), reducerea coliziunilor rutiere prin semnalizare.'],
        ['Specific vulpe', 'campanii de vaccinare antirabică orală (momeli, coordonare ANSVSA), securizarea cotețelor și a gunoiului.'],
        ['Turism', 'pe Transfăgărășan și în stațiuni, hrănirea animalelor sălbatice de la șosea este interzisă și periculoasă — campanii de informare.'],
        ['Impact UrbanX', 'riscul ridicat al speciilor dominante penalizează scorul de siguranță și necesită investiții de mitigare adaptate.'],
      ]);
    } else {
      D.P('Nu există specii sălbatice cu risc semnificativ pentru comunitate în acest UAT (predomină fauna comună de câmpie). Atenția se concentrează pe fauna urbană — câini/pisici fără stăpân — și pe profilaxia turbării (vulpe).');
    }

    // HARTA: hotspot-uri caini + padocuri + faună sălbatică
    try{ if(window._PdfMap && D.ensure){ var ff=this.buildFeatures(city);
      var mp=(ff.pts||[]).map(function(f){var c=f.geometry.coordinates;return {lon:c[0],lat:c[1],c:(f.properties&&f.properties.c)||'#f59e0b',r:1.8};});
      var leg=[[[245,158,11],'hotspot câini'],[[34,197,94],'padoc public']];
      w.slice(0,4).forEach(function(e){ if(e.level==='scăzut')return; var h=e.color.replace('#',''); var rgb=[parseInt(h.substr(0,2),16),parseInt(h.substr(2,2),16),parseInt(h.substr(4,2),16)]; leg.push([rgb, e.name]); });
      D.h2('Hartă — faună urbană și sălbatică');
      D.ensure(80); window._PdfMap.draw(D.pdf,{x:D.dims.ML,y:D.y+2,w:Math.min(D.dims.CW,160),h:66,title:'Hotspot-uri câini · padocuri · faună sălbatică (specii dominante)',points:mp,cx:city.lon,cy:city.lat,legend:leg});
      D.setY(D.y+80);
    } }catch(e){ console.warn('[Fauna] harta:',e.message); }
    if(D.sourceBadges) D.sourceBadges(['Min. Mediului (recensământ urși 2023)','Romsilva / ICAS','ANSVSA (turbare, PPA)','RO-Alert','Legea 258/2013','OUG 155/2001','ASPA']);
  }
};
console.log('[UrbanFauna] ✅ modul faună urbană + faună sălbatică multi-specie incarcat');
})(window);
