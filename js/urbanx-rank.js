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

// Acoperire forestieră pe județ (% din suprafață) — date naționale (INS/Romsilva, orientativ).
// Folosit pt componenta „păduri din jurul UAT" în dimensiunea Mediu/biodiversitate.
var _FOREST_BY_JUDET = {
  SV:52,NT:44,HR:37,CV:46,VN:38,BV:38,MM:43,BC:42,GJ:46,CS:46,HD:43,VL:48,AG:40,AB:35,MS:33,SB:35,BN:36,
  AR:30,BH:28,CJ:25,SJ:28,MH:30,PH:35,DB:30,BZ:24,SM:18,TM:13,VS:14,IS:10,DJ:9,TL:9,GL:8,OT:8,BT:7,CT:6,BR:5,TR:5,IL:3,CL:4,B:5,IF:6
};
// city.judet vine ca NUME complet ("Suceava","Iași") — mapăm la cod ca să citim acoperirea forestieră
var _JUD_CODE = { 'iasi':'IS','suceava':'SV','cluj':'CJ','botosani':'BT','neamt':'NT','bacau':'BC','vaslui':'VS',
  'galati':'GL','vrancea':'VN','brasov':'BV','timis':'TM','sibiu':'SB','mures':'MS','bihor':'BH','arad':'AR',
  'prahova':'PH','dolj':'DJ','constanta':'CT','harghita':'HR','covasna':'CV','maramures':'MM','gorj':'GJ',
  'caras-severin':'CS','hunedoara':'HD','valcea':'VL','arges':'AG','dambovita':'DB','buzau':'BZ','satu mare':'SM',
  'salaj':'SJ','mehedinti':'MH','alba':'AB','bistrita-nasaud':'BN','tulcea':'TL','olt':'OT','braila':'BR',
  'teleorman':'TR','ialomita':'IL','calarasi':'CL','giurgiu':'GR','ilfov':'IF','bucuresti':'B' };
function _judCode(j){ if(!j)return null; var s=String(j).trim();
  if(_FOREST_BY_JUDET[s]!=null)return s;                                   // deja cod ('SV')
  var n=s.toLowerCase().replace(/ș|ş/g,'s').replace(/ț|ţ/g,'t').replace(/ă|â/g,'a').replace(/î/g,'i').replace(/municipiul\s+/,'').trim();
  return _JUD_CODE[n]||null;
}
function _forestPct(city){ var c=_judCode(city&&city.judet); return (c&&_FOREST_BY_JUDET[c]!=null)?_FOREST_BY_JUDET[c]:27; }

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
    var pop=(city.pop2021||city.pop||0), key=city&&(city.key||city.cityKey);

    // ── BONUSURI din motoarele reale (calculate ÎNTÂI, ca să alimenteze fațetele) ──
    var econNote='', resilNote='';
    var econ = cl(pred.pctUE||40);
    try{ if(G._UrbanServices){ var db=G._UrbanServices.digitalBonus(key,city)||0; if(db){ econ=cl(econ+db); econNote=' + '+db+' pct digital'; } } }catch(e){}
    var faunaPen=0, faunaNote='';
    try{ if(G._UrbanFauna){ var fm=G._UrbanFauna.qolModifier(city); faunaPen=fm.penalty||0; faunaNote=' (câini fără stăpân ~'+fm.strays.perK+'/1000'+(fm.bear.present?', risc urși '+fm.bear.level:'')+')'; } }catch(e){}
    var tourBonus=0; try{ if(G._UrbanTourism) tourBonus=G._UrbanTourism.rankBonus(key,city)||0; }catch(e){}
    var sportBonus=0; try{ if(G._UrbanVitality) sportBonus=G._UrbanVitality.sportBonus(key,city)||0; }catch(e){}
    var eduBonus=0; try{ if(G._UrbanVitality) eduBonus=G._UrbanVitality.eduBonus(key,city)||0; }catch(e){}
    var houPen=0; try{ if(G._UrbanHousing){ var hm=G._UrbanHousing.qolModifier(city,pred); houPen=hm.penalty||0; } }catch(e){}
    var healthBonus=0; try{ if(G._UrbanServices) healthBonus=G._UrbanServices.healthBonus(key,city)||0; }catch(e){}
    var nSpec=0; try{ if(G._UrbanFauna&&G._UrbanFauna.wildlife) nSpec=(G._UrbanFauna.wildlife(city.judet)||[]).length; }catch(e){}

    // ── NATURĂ: parcuri/verde + păduri (jud.) + biodiversitate (floră/faună) ──
    var forestPct = _forestPct(city);
    var greenScore  = cl((pred.svM2||11)*4.6);              // parcuri + spații verzi /cap
    var forestScore = cl(20 + forestPct*1.5);              // păduri din jurul UAT
    var bioScore    = cl(40 + nSpec*7 + (forestPct>=35?12:0)); // biodiversitate (specii + habitat)

    // ── FAȚETE CALITATEA VIEȚII (pe categorii — fiecare cu scor + formulă demonstrate) ──
    var hap=gv('happiness',55), uhiv=gv('uhi',55), walk=gv('walk15', gv('walkscore',55)), seism=(pred.ag||0.2);
    var QF=[]; function qf(label,score,formula){ score=cl(score); QF.push({label:label,score:score,formula:formula}); return score; }
    qf('Bunăstare generală', (hap+uhiv)/2, 'media(Happiness Index, Urban Health Index)');
    qf('Cultură & turism', 48 + tourBonus*4, 'atracții/UNESCO/muzee/teatre/festivaluri (motor Turism) → +'+tourBonus+' pct');
    qf('Sport & recreere', 50 + sportBonus*5, 'infrastructură sportivă & evenimente (motor Vitalitate) → +'+sportBonus+' pct');
    qf('Verde & natură', (greenScore+forestScore+bioScore)/3, 'parcuri+verde/cap ('+greenScore+') · pădure jud. '+forestPct+'% ('+forestScore+') · biodiversitate '+nSpec+' specii ('+bioScore+')');
    qf('Viață de noapte & socializare', 42 + tourBonus*3 + (pop>=150000?14:pop>=60000?9:pop>=25000?4:0), 'masă urbană ('+(pop>=150000?'mare':pop>=60000?'medie':'mică')+') + ofertă culturală (proxy)');
    qf('Siguranță', 74 - faunaPen*2 - seism*40, 'risc faună urbană'+faunaNote+' − accelerație seismică');
    qf('Prietenos cu seniorii', 55 + healthBonus*2 + greenScore*0.15 + walk*0.15 - faunaPen, 'acces sănătate (+'+healthBonus+') + verde + walkability − risc faună');
    qf('Prietenos cu familiile', 52 + eduBonus*3 + greenScore*0.12 - houPen - faunaPen*0.5, 'educație (+'+eduBonus+') + parcuri − locuire neaccesibilă − risc');
    var quality = cl(QF.reduce(function(s,f){return s+f.score;},0)/QF.length);
    var qNote = ' [fațete: '+QF.map(function(f){return f.label.split(' ')[0]+' '+f.score;}).join(' · ')+']';

    // ── MEDIU, VERDE & BIODIVERSITATE ──
    var enviro = cl((uhiv + greenScore + cl(82-(pred.co2cap||4.6)*6) + forestScore + bioScore)/5);
    var enviroNote = ' — UHI · parcuri+verde/cap · CO₂ · pădure '+forestPct+'% · biodiv. '+nSpec+' specii';

    // ── DEMOGRAFIE & CAPITAL UMAN ──
    var demo = cl(50 + (pred.r10||0)*18); var eduNote='';
    if(eduBonus){ demo=cl(demo+eduBonus); eduNote=' + '+eduBonus+' pct educație/talent'; }

    // ── REZILIENȚĂ & RISC ──
    var resil = cl(82 - seism*120);
    if(healthBonus){ resil=cl(resil+healthBonus); resilNote=' + '+healthBonus+' pct sănătate'; }
    try{ if(G._UrbanEnergy){ var enb=G._UrbanEnergy.bonus(city,pred)||0; if(enb){ resil=cl(resil+enb); resilNote+=' + '+enb+' pct energie'; } } }catch(e){}
    try{ if(G._UrbanResources){ var rd=G._UrbanResources.modifier(city); if(rd.delta){ resil=cl(resil+rd.delta); resilNote+=' '+(rd.delta>0?'+':'−')+' '+Math.abs(rd.delta)+' pct resurse'; } } }catch(e){}

    // ── CONECTIVITATE & POZIȚIE ──
    var connect = cl(gv('gravity',50)); var cbon=0;
    try{ if(G._RegioInfra){ var apr=G._RegioInfra.nearestAirports(city.lat||47,city.lon||27,60,1)[0]; if(apr&&apr.distKm<=15)cbon+=7; else if(apr&&apr.distKm<=40)cbon+=4; var hw=G._RegioInfra.relevantHighways(city.lat||47,city.lon||27,60); if(hw.some(function(h){return h.status==='finalizat';}))cbon+=5; else if(hw.length)cbon+=3; } }catch(e){}
    connect = cl(connect+cbon);

    var dims = [
      {label:'Economie & convergență UE', score:econ,    w:0.20, formula:'% din PIB/cap media UE27'+econNote, src:'Eurostat / INS + DESI'},
      {label:'Calitate a vieții',         score:quality, w:0.20, formula:'media celor 8 fațete (bunăstare · cultură/turism · sport · verde/natură · viață de noapte · siguranță · seniori · familii)'+qNote, src:'OECD Better Life + Turism + Vitalitate + Faună + Sănătate'},
      {label:'Conectivitate & poziție',   score:connect, w:0.15, formula:'Gravitația oportunităților + bonus aeroport/autostradă reală', src:'model UrbanX + CNAIR/AACR'},
      {label:'Mediu, verde & biodiversitate', score:enviro, w:0.15, formula:'media(UHI, parcuri+verde/cap, traiectorie CO₂, pădure județeană, biodiversitate)'+enviroNote, src:'EEA / WHO / INS-Romsilva + Faună'},
      {label:'Demografie & capital uman', score:demo,    w:0.15, formula:'50 + ritm populație 10 ani × 18'+eduNote, src:'INS / recensământ 2021 + ARACIS'},
      {label:'Reziliență & risc',         score:resil,   w:0.15, formula:'82 − accelerație seismică(g) × 120'+resilNote, src:'INFP P100 / ANAR + sănătate'},
    ];
    var score = Math.round(dims.reduce(function(s,d){return s+d.score*d.w;},0));
    var grade = gradeOf(score);

    var tier = tierOf(city);
    var peers = (EU_PEERS[tier]||[]).slice();
    var withCity = peers.concat([{n:(city.name||'Acest oraș'),s:score,self:true}]).sort(function(a,b){return b.s-a.s;});
    var rank = withCity.findIndex(function(x){return x.self;})+1;

    return {
      score:score, grade:grade, dims:dims, qualityFacets:QF,
      nature:{ forestPct:forestPct, species:nSpec, greenScore:greenScore, forestScore:forestScore, bioScore:bioScore },
      tier:tier, tierLabel:TIER_LABEL[tier],
      peers:peers, peersWithCity:withCity, rankInPeers:rank, peerCount:withCity.length,
      formula:'Nota UrbanX = Σ (dimensiune × pondere): Economie 20% · Calitate vieții 20% (8 fațete) · Conectivitate 15% · Mediu/verde/biodiversitate 15% · Demografie 15% · Reziliență 15%',
      source:'Index compozit UrbanX pe baza ISO 37120 + Eurostat + OECD + INFP + EEA + INS-Romsilva (toate sub-scorurile din date reale/modele analizate de platformă).'
    };
  },

  // Capitol PDF (Masterplan + PMUD)
  renderChapter: function(D, pred, city){
    if(!D || !D.pdf) return;
    // SURSA UNICA: dacă avem cityKey, folosim UrbanXIVU.scoreFor (identic cu cinematic + panou IVU)
    var R = null;
    try { var _k = city && (city.key || city.cityKey); if (_k && G.UrbanXIVU && G.UrbanXIVU.scoreFor) { var _s = G.UrbanXIVU.scoreFor(_k); if (_s) R = _s.R; } } catch (e) {}
    if (!R) R = this.compute(pred, city);
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
    // DEMONSTRAȚIE: fațetele calității vieții (pe categorii) — notare arătată, nu declarată
    if(R.qualityFacets && R.qualityFacets.length){
      D.h2('Calitatea vieții — descompunere pe categorii');
      D.P('Dimensiunea „Calitate a vieții" (20% din notă) este media a 8 fațete, fiecare cu scor și formulă proprie — nota este demonstrată, nu declarată. Include explicit cultura/turismul, sportul, verdele/natura, viața de noapte și prietenia față de seniori și familii.');
      if(D.barChart) D.barChart(R.qualityFacets.map(function(f){return [f.label.split(' ')[0], f.score, [110,180,140]];}),{title:'Fațetele calității vieții (0–100)', max:100, vfmt:function(v){return String(Math.round(v));}});
      D.bullets(R.qualityFacets.map(function(f){ return [f.label+' — '+f.score+'/100', f.formula]; }));
    }
    if(R.nature){
      D.h2('Natură, parcuri & biodiversitate');
      D.P('Componenta de mediu include explicit: parcuri și spații verzi pe cap de locuitor (scor '+R.nature.greenScore+'/100), acoperirea forestieră a județului ('+R.nature.forestPct+'% → scor '+R.nature.forestScore+'/100) și biodiversitatea — '+R.nature.species+' specii de faună sălbatică inventariate în județ (scor '+R.nature.bioScore+'/100). Pădurile din jurul UAT, flora și fauna sălbatică sunt astfel parte cuantificată din notă, nu omise.');
    }
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
