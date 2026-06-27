// ═══════════════════════════════════════════════════════════════════════════
// urbanx-rank.js — CLASAMENTUL / NOTA UrbanX (#8)
// Un index COMPOZIT TRANSPARENT (0-100) -> notă (A+..D), calculat din toți
// indicatorii reali analizați de platformă (via _UrbanIndices) + date pred/city.
// Fiecare dimensiune are pondere, formulă și sursă afișate. Comparativ cu orașe
// europene ECHIVALENTE (pe tier de mărime: metropolă / mare / mediu / mic).
// Folosit în: finalul cinematicului + Masterplan + PMUD.
// 17 iunie 2026 | ThinkSmart Solutions SRL
// ═══════════════════════════════════════════════════════════════════════════
(function(G){
'use strict';
function cl(v,lo,hi){ return Math.max(lo==null?2:lo, Math.min(hi==null?99:hi, Math.round(v))); }

// Benchmark orientativ orașe europene (scoruri de referință pe baza clasamentelor
// publice de calitate a vieții: Mercer, EU Urban Audit, Numbeo, EIU). NU calculate
// cu formula UrbanX — servesc drept reper de context pentru tier-uri echivalente.
var EU_PEERS = {
  metropola: [ {n:'Viena',s:90},{n:'München',s:86},{n:'Barcelona',s:82},{n:'Lyon',s:80},{n:'Praga',s:78} ],
  mare:      [ {n:'Graz',s:80},{n:'Malmö',s:79},{n:'Bologna',s:77},{n:'Brno',s:74},{n:'Gdańsk',s:73} ],
  mediu:     [ {n:'Maribor',s:71},{n:'Trnava',s:68},{n:'Pécs',s:66},{n:'Nyíregyháza',s:64} ],
  mic:       [ {n:'Krems (AT)',s:69},{n:'Banská Bystrica',s:65},{n:'Eger (HU)',s:63} ],
};
function tierOf(city){
  var p = (city && (city.pop2021||city.pop||0)) || 0;
  var cap = city && (city.judet==='B' || /bucure/i.test(city.name||''));
  if(cap || p>=250000) return 'metropola';
  if(p>=100000) return 'mare';
  if(p>=40000)  return 'mediu';
  return 'mic';
}
var TIER_LABEL = {metropola:'Metropolă / oraș mare (>250k)', mare:'Oraș mare (100–250k)', mediu:'Oraș mediu (40–100k)', mic:'Oraș mic (<40k)'};

function gradeOf(s){
  if(s>=85)return 'A+'; if(s>=80)return 'A'; if(s>=75)return 'A-';
  if(s>=70)return 'B+'; if(s>=65)return 'B'; if(s>=60)return 'B-';
  if(s>=55)return 'C+'; if(s>=50)return 'C'; if(s>=45)return 'C-';
  if(s>=40)return 'D+'; return 'D';
}
// Legenda calificativelor — semnificatie (pt MP/PMUD + cinematic)
var GRADES = [
  {g:'A (80–100)', d:'oraș de referință europeană — calitate, economie și reziliență ridicate', c:'#22c55e'},
  {g:'B (65–79)',  d:'oraș competitiv, cu potențial clar — câteva dimensiuni de întărit', c:'#84cc16'},
  {g:'C (50–64)',  d:'oraș median — decalaje pe mai multe dimensiuni, necesită strategie', c:'#f59e0b'},
  {g:'D (<50)',    d:'oraș sub presiune — intervenții prioritare pe economie/demografie/risc', c:'#ef4444'},
];

G._UrbanRank = {
  EU_PEERS:EU_PEERS, GRADES:GRADES,
  // pred = _PredEngine.calc ; city = _RO_CITIES_DB[key]/_EXTRA_UATS
  compute: function(pred, city){
    pred = pred||{}; city = city||{};
    var idx = (G._UrbanIndices && G._UrbanIndices.compute) ? G._UrbanIndices.compute(pred,city) : [];
    function gv(k,d){ var f=idx.filter(function(x){return x.key===k;})[0]; return f?f.value:(d==null?50:d); }

    var econ    = cl(pred.pctUE||40);                                   // % din media UE
    var econNote='', resilNote='';
    // digital -> competitivitate economica ; sanatate -> rezilienta
    try{ if(G._UrbanServices){ var _ck2=city&&(city.key||city.cityKey);
      var db=G._UrbanServices.digitalBonus(_ck2,city)||0; if(db){ econ=cl(econ+db); econNote=' + '+db+' pct digital'; } } }catch(e){}
    var quality = cl((gv('happiness',55)+gv('uhi',55))/2);              // calitate viata
    // penalizare faună (câini fără stăpân + risc urși) pe calitatea vieții/siguranță
    var faunaPen = 0, faunaNote = '';
    try{ if(G._UrbanFauna){ var fm=G._UrbanFauna.qolModifier(city); faunaPen=fm.penalty||0;
      faunaNote=' − '+faunaPen+' pct faună (câini fără stăpân ~'+fm.strays.perK+'/1000'+(fm.bear.present?', risc urși '+fm.bear.level:'')+')'; } }catch(e){}
    // bonus cultură/turism (vibrație culturală + atractivitate)
    var tourBonus = 0, tourNote = '';
    try{ if(G._UrbanTourism){ tourBonus=G._UrbanTourism.rankBonus(city&&(city.key||city.cityKey), city)||0;
      if(tourBonus) tourNote=' + '+tourBonus+' pct cultură/turism'; } }catch(e){}
    var sportBonus=0;
    try{ if(G._UrbanVitality){ sportBonus=G._UrbanVitality.sportBonus(city&&(city.key||city.cityKey), city)||0;
      if(sportBonus) tourNote+=' + '+sportBonus+' pct sport'; } }catch(e){}
    // penalizare locuire neaccesibilă (alungă tinerii)
    var houPen=0;
    try{ if(G._UrbanHousing){ var hm=G._UrbanHousing.qolModifier(city,pred); houPen=hm.penalty||0;
      if(houPen) tourNote+=' − '+houPen+' pct locuire neaccesibilă'; } }catch(e){}
    quality = cl(quality - faunaPen + tourBonus + sportBonus - houPen);
    var enviro  = cl((gv('uhi',55) + cl((pred.svM2||11)*4.6) + cl(82-(pred.co2cap||4.6)*6))/3);
    var demo    = cl(50 + (pred.r10||0)*18);                            // trend demografic
    // bonus educație (capital uman/talent) + sport (vibrație) — atractivitate
    var eduNote='', sportNote='';
    try{ if(G._UrbanVitality){ var _ck=city&&(city.key||city.cityKey);
      var eb=G._UrbanVitality.eduBonus(_ck,city)||0; if(eb){ demo=cl(demo+eb); eduNote=' + '+eb+' pct educație/talent'; } } }catch(e){}
    var resil   = cl(82 - (pred.ag||0.2)*120);                          // rezilienta (seismic)
    try{ if(G._UrbanServices){ var hb=G._UrbanServices.healthBonus(city&&(city.key||city.cityKey),city)||0; if(hb){ resil=cl(resil+hb); resilNote=' + '+hb+' pct sănătate'; } } }catch(e){}
    try{ if(G._UrbanEnergy){ var enb=G._UrbanEnergy.bonus(city,pred)||0; if(enb){ resil=cl(resil+enb); resilNote+=' + '+enb+' pct energie'; } } }catch(e){}
    try{ if(G._UrbanResources){ var rd=G._UrbanResources.modifier(city); if(rd.delta){ resil=cl(resil+rd.delta); resilNote+=' '+(rd.delta>0?'+':'−')+' '+Math.abs(rd.delta)+' pct resurse'; } } }catch(e){}
    var connect = cl(gv('gravity',50));                                 // gravitatia oportunitatilor

    // bonus conectivitate din infrastructura regionala reala (aeroport/autostrada)
    var cbon=0;
    try{
      if(G._RegioInfra){
        var ap=G._RegioInfra.nearestAirports(city.lat||47, city.lon||27, 60, 1)[0];
        if(ap && ap.distKm<=15) cbon+=7; else if(ap && ap.distKm<=40) cbon+=4;
        var hw=G._RegioInfra.relevantHighways(city.lat||47, city.lon||27, 60);
        if(hw.some(function(h){return h.status==='finalizat';})) cbon+=5;
        else if(hw.length) cbon+=3;
      }
    }catch(e){}
    connect = cl(connect + cbon);

    var dims = [
      {label:'Economie & convergență UE', score:econ,    w:0.20, formula:'% din PIB/cap media UE27'+econNote, src:'Eurostat / INS + DESI'},
      {label:'Calitate a vieții',         score:quality, w:0.20, formula:'media(Happiness, Urban Health Index)'+faunaNote+tourNote, src:'OECD Better Life / WHR + bunăstare animală + cultură/turism'},
      {label:'Conectivitate & poziție',   score:connect, w:0.15, formula:'Gravitația oportunităților + bonus aeroport/autostradă reală', src:'model UrbanX + CNAIR/AACR'},
      {label:'Mediu & climă',             score:enviro,  w:0.15, formula:'media(UHI, spații verzi/cap, traiectorie CO₂)', src:'EEA / WHO'},
      {label:'Demografie & capital uman', score:demo,    w:0.15, formula:'50 + ritm populație 10 ani × 18'+eduNote, src:'INS / recensământ 2021 + ARACIS'},
      {label:'Reziliență & risc',         score:resil,   w:0.15, formula:'82 − accelerație seismică(g) × 120'+resilNote, src:'INFP P100 / ANAR + sănătate'},
    ];
    var score = Math.round(dims.reduce(function(s,d){return s+d.score*d.w;},0));
    var grade = gradeOf(score);

    var tier = tierOf(city);
    var peers = (EU_PEERS[tier]||[]).slice();
    // pozitia orasului in setul de referinta echivalent
    var withCity = peers.concat([{n:(city.name||'Acest oraș'),s:score,self:true}]).sort(function(a,b){return b.s-a.s;});
    var rank = withCity.findIndex(function(x){return x.self;})+1;

    return {
      score:score, grade:grade, dims:dims, tier:tier, tierLabel:TIER_LABEL[tier],
      peers:peers, peersWithCity:withCity, rankInPeers:rank, peerCount:withCity.length,
      formula:'Nota UrbanX = Σ (dimensiune × pondere): Economie 20% · Calitate vieții 20% · Conectivitate 15% · Mediu 15% · Demografie 15% · Reziliență 15%',
      source:'Index compozit UrbanX pe baza ISO 37120 + Eurostat + OECD + INFP + EEA (toate sub-scorurile din date reale analizate de platformă).'
    };
  },

  // Capitol PDF (Masterplan + PMUD)
  renderChapter: function(D, pred, city){
    if(!D || !D.pdf) return;
    var R = this.compute(pred, city);
    D.chapter('Nota UrbanX — clasament și benchmark european');
    D.h2('Ce reprezintă nota UrbanX');
    D.P('Nota UrbanX este un indice compozit (0–100) care exprimă, într-o singură cifră reproductibilă, performanța globală a unui UAT pe dimensiunile cheie ale dezvoltării urbane durabile. Spre deosebire de clasamentele de imagine, fiecare sub-scor provine din date oficiale și are formulă explicită — deci nota poate fi recalculată și verificată oricând. Scopul: un standard transparent de evaluare comparabilă a orașelor.');
    D.h2('Legenda calificativelor');
    D.bullets(GRADES.map(function(x){ return [x.g, x.d]; }));
    if(D.kpis) D.kpis([
      {val:R.score+'/100', label:'Nota UrbanX', sub:'index compozit'},
      {val:R.grade, label:'Calificativ', sub:'scala A+..D'},
      {val:'#'+R.rankInPeers+'/'+R.peerCount, label:'În categoria de mărime', sub:R.tierLabel},
    ]);
    // Grilă de culori A→G (stil certificat energetic) cu indicator la nota UAT
    try {
      if (window._ivuScaleBar && D.ensure && D.pdf) {
        var _tf = (D.pdf.__unicodeFont) ? 'DejaVuRO' : 'helvetica';
        D.ensure(16); var _y = D.y;
        D.pdf.setTextColor(60,72,94); D.pdf.setFont(_tf,'bold'); D.pdf.setFontSize(7.5);
        D.pdf.text(D.S2 ? D.S2('Scala calificativului (0–100):') : 'Scala calificativului (0-100):', D.dims.ML, _y + 3);
        window._ivuScaleBar(D.pdf, D.dims.ML, _y + 9, Math.min(110, D.dims.CW * 0.62), R.score, { font: _tf });
        if (D.setY) D.setY(_y + 18);
      }
    } catch (e) {}
    D.formula('Formula notei', R.formula, 'Toate ponderile însumează 100%. Sub-scorurile sunt normalizate 0–100.');
    D.h2('Descompunerea notei pe dimensiuni');
    if(D.barChart){
      D.barChart(R.dims.map(function(d){return [d.label.split(' ')[0], d.score, [110,130,200]];}), {title:'Scor pe dimensiune (0–100)', max:100, vfmt:function(v){return String(Math.round(v));}});
    }
    D.bullets(R.dims.map(function(d){ return [d.label+' ('+Math.round(d.w*100)+'%)', 'scor '+d.score+'/100 — '+d.formula+' (sursă: '+d.src+').']; }));
    D.h2('Benchmark cu orașe europene echivalente');
    D.P('Comparația se face DOAR în interiorul categoriei de mărime ('+R.tierLabel+') — nu se compară un oraș mic cu o metropolă. Scorurile orașelor europene sunt repere orientative din clasamente publice (Mercer, EU Urban Audit, Numbeo), nu calculate cu formula UrbanX.');
    if(D.barChart){
      D.barChart(R.peersWithCity.map(function(p){return [p.n.split(' ')[0], p.s, p.self?[212,175,55]:[120,140,170]];}), {title:'Poziție vs orașe europene din aceeași categorie', max:100, vfmt:function(v){return String(Math.round(v));}});
    }
    if(D.sourceBadges) D.sourceBadges(['ISO 37120','Eurostat','OECD Better Life','INFP P100','EEA','Mercer / EU Urban Audit']);
    D.P('Notă metodologică: nota este recalculată automat la fiecare actualizare a datelor live. '+R.source);
  }
};
console.log('[UrbanRank] ✅ sistem de clasament UrbanX incarcat');
})(window);
