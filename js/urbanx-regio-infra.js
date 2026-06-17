// ═══════════════════════════════════════════════════════════════════════════
// urbanx-regio-infra.js — INFRASTRUCTURA REGIONALA REALA din surse OFICIALE
// (Wave B: #5 aeroporturi/puncte modale, #7 autostrazi+metrou+geopolitic, #9
// santiere regionale). Date publice verificabile: AACR/ROMATSA (aeroporturi),
// CNAIR + PNRR (autostrazi), Metrou Cluj SA / Metrorex (metrou). Status pe culori.
// Folosit in: cinematic (scena conectivitate + geopolitic) + Masterplan + PMUD.
// 17 iunie 2026 | ThinkSmart Solutions SRL
// ═══════════════════════════════════════════════════════════════════════════
(function(G){
'use strict';

// Status -> culoare (proiectare=albastru, executie=portocaliu, finalizat=verde)
var STATUS = {
  finalizat:  {c:'#22c55e', label:'Finalizat / în operare'},
  executie:   {c:'#f97316', label:'În execuție (șantier)'},
  proiectare: {c:'#3b82f6', label:'În proiectare / licitație'},
};

// ── AEROPORTURI REALE (WGS84) — sursa: AACR / ROMATSA / aeroporturile civile ──
var AIRPORTS = [
  {name:'Aeroportul Internațional Iași',                        iata:'IAS', lat:47.1785, lon:27.6206, tip:'international', info:'~1,9 mil. pax/an — cel mai mare din Moldova'},
  {name:'Aeroportul Internațional „Ștefan cel Mare" Suceava',   iata:'SCV', lat:47.6875, lon:26.3540, tip:'international', info:'Salcea — poartă spre Bucovina și Ucraina'},
  {name:'Aeroportul Internațional „George Enescu" Bacău',       iata:'BCM', lat:46.5219, lon:26.9103, tip:'international', info:'low-cost regional'},
  {name:'Aeroportul Internațional Henri Coandă (Otopeni)',      iata:'OTP', lat:44.5711, lon:26.0858, tip:'hub',           info:'~14 mil. pax/an — hub național'},
  {name:'Aeroportul Internațional Băneasa „Aurel Vlaicu"',      iata:'BBU', lat:44.5032, lon:26.1021, tip:'international', info:'business / charter'},
  {name:'Aeroportul Internațional „Avram Iancu" Cluj-Napoca',   iata:'CLJ', lat:46.7852, lon:23.6862, tip:'international', info:'~3 mil. pax/an — al 2-lea din țară'},
  {name:'Aeroportul Internațional „Traian Vuia" Timișoara',     iata:'TSR', lat:45.8099, lon:21.3379, tip:'international', info:'hub vestic + cargo'},
  {name:'Aeroportul Internațional Craiova',                     iata:'CRA', lat:44.3181, lon:23.8886, tip:'international', info:'poartă Oltenia'},
  {name:'Aeroportul Internațional Sibiu',                       iata:'SBZ', lat:45.7856, lon:24.0913, tip:'international', info:'centru Transilvania'},
  {name:'Aeroportul „Transilvania" Târgu Mureș',                iata:'TGM', lat:46.4677, lon:24.4125, tip:'international', info:'regional'},
  {name:'Aeroportul Internațional Oradea',                      iata:'OMR', lat:47.0253, lon:21.9025, tip:'international', info:'graniță vestică'},
  {name:'Aeroportul Internațional „M. Kogălniceanu" Constanța', iata:'CND', lat:44.3622, lon:28.4883, tip:'international', info:'litoral + cargo strategic'},
  {name:'Aeroportul Internațional Satu Mare',                   iata:'SUJ', lat:47.7033, lon:22.8857, tip:'international', info:'nord-vest'},
  {name:'Aeroportul Maramureș Baia Mare',                       iata:'BAY', lat:47.6584, lon:23.4700, tip:'regional',      info:'regional'},
  {name:'Aeroportul Internațional Arad',                        iata:'ARW', lat:46.1766, lon:21.2620, tip:'international', info:'cargo'},
  {name:'Aeroportul „Delta Dunării" Tulcea',                    iata:'TCE', lat:45.0625, lon:28.7143, tip:'regional',      info:'sezonier'},
];

// ── AUTOSTRAZI / DRUMURI MAJORE — traseu APROXIMAT (puncte-cheie) + status CNAIR/PNRR
var HIGHWAYS = [
  {nume:'A7 Autostrada Moldovei', status:'executie', sursa:'CNAIR / PNRR (2024–2027)',
   traseu:[[26.02,44.94],[26.82,45.15],[27.19,45.70],[26.91,46.57],[26.72,47.13],[26.25,47.64],[26.07,47.95]],
   desc:'Ploiești–Buzău–Focșani–Bacău–Pașcani–Suceava–Siret. Coloana vertebrală a Moldovei; conectează regiunea la rețeaua TEN-T și la frontiera cu Ucraina (Siret).'},
  {nume:'A8 Autostrada Unirii', status:'proiectare', sursa:'CNAIR / PNRR (tronsoane în execuție)',
   traseu:[[24.56,46.54],[25.6,46.85],[26.6,47.05],[27.20,47.12],[27.62,47.16],[28.05,47.22]],
   desc:'Târgu Mureș–Iași–Ungheni. Prima autostradă transcarpatică spre Moldova; capăt la frontiera cu Republica Moldova (Ungheni/Prut).'},
  {nume:'A3 Autostrada Transilvania', status:'executie', sursa:'CNAIR',
   traseu:[[23.62,46.77],[23.1,46.92],[22.6,47.0],[22.0,47.05]],
   desc:'Brașov–Cluj–Oradea–frontiera HU. Axă majoră vest–centru, parțial în operare.'},
  {nume:'A1 / A2 (TEN-T)', status:'finalizat', sursa:'CNAIR',
   traseu:[[26.1,44.43],[25.0,44.5],[24.0,45.0],[23.0,45.3]],
   desc:'București–Pitești–Sibiu (A1) și București–Constanța (A2). Coridoare TEN-T în operare.'},
];

// ── METROURI ──
var METROS = [
  {nume:'Metrou Cluj (Magistrala M1)', oras:'Cluj-Napoca', status:'executie', sursa:'Metrou Cluj SA / PNRR (contract 2023)',
   traseu:[[23.49,46.745],[23.55,46.755],[23.60,46.765],[23.64,46.773],[23.70,46.785]],
   desc:'Florești–Cluj-Napoca–Baciu, ~21 km, 19 stații. Primul metrou din afara Bucureștiului — finanțare PNRR + împrumut BEI.'},
  {nume:'Metrou București M6', oras:'București', status:'executie', sursa:'Metrorex / PNRR',
   traseu:[[26.075,44.45],[26.06,44.50],[26.05,44.55],[26.08,44.571]],
   desc:'1 Mai–Otopeni — conectează rețeaua de metrou la Aeroportul Henri Coandă.'},
];

// ── PUNCTE MODALE & INFRASTRUCTURA STRATEGICA — baraje, porturi, treceri de
// frontiera, noduri extractive (coord reale, surse publice: Hidroelectrica, APM,
// AFDJ/porturi, Poliția de Frontieră). tip -> icon + culoare.
var MODAL = [
  // Baraje / hidro
  {name:'Baraj Izvorul Muntelui–Bicaz', tip:'baraj', lat:46.9300, lon:26.0500, info:'cel mai mare lac de acumulare interior; hidro + apărare la inundații'},
  {name:'Baraj Stânca–Costești (Prut)', tip:'baraj', lat:47.7800, lon:27.2200, info:'baraj comun RO–R. Moldova; rol cheie anti-inundații pe Prut'},
  {name:'Baraj Vidraru (Argeș)', tip:'baraj', lat:45.3600, lon:24.6300, info:'hidrocentrală majoră'},
  {name:'Porțile de Fier I (Dunăre)', tip:'baraj', lat:44.6700, lon:22.5300, info:'cea mai mare hidrocentrală de pe Dunăre (RO–RS)'},
  // Porturi
  {name:'Portul Constanța', tip:'port', lat:44.1700, lon:28.6600, info:'cel mai mare port la Marea Neagră; coridor cereale + NATO'},
  {name:'Portul Galați', tip:'port', lat:45.4300, lon:28.0500, info:'port fluvial-maritim; siderurgie'},
  {name:'Portul Brăila', tip:'port', lat:45.2700, lon:27.9600, info:'port maritim pe Dunăre'},
  {name:'Portul Tulcea', tip:'port', lat:45.1800, lon:28.8000, info:'poartă spre Delta Dunării'},
  {name:'Portul Giurgiu', tip:'port', lat:43.9000, lon:25.9700, info:'port dunărean spre Bulgaria'},
  // Treceri de frontieră / puncte vamale
  {name:'PTF Albița (spre R. Moldova)', tip:'vama', lat:46.9400, lon:28.1300, info:'principala trecere rutieră RO–R. Moldova'},
  {name:'PTF Sculeni (spre R. Moldova)', tip:'vama', lat:47.3200, lon:27.7100, info:'trecere Iași–Ungheni'},
  {name:'PTF Siret (spre Ucraina)', tip:'vama', lat:47.9500, lon:26.0700, info:'principala trecere RO–Ucraina; coridor umanitar'},
  {name:'PTF Halmeu (spre Ucraina)', tip:'vama', lat:48.0000, lon:23.0200, info:'trecere nord-vest RO–Ucraina'},
  // Noduri extractive / industriale
  {name:'Bazinul minier Rovinari–Motru (Gorj)', tip:'mina', lat:44.9200, lon:23.1800, info:'cărbune — producție energetică (în tranziție justă)'},
  {name:'Mina de cupru Moldova Nouă (Caraș)', tip:'mina', lat:44.7400, lon:21.6700, info:'minerit cupru — sit de reconversie'},
];

// ── CONTEXT GEOPOLITIC / FRONTIERA (județe estice) — factual, public ──
var GEO = {
  IS: {border:'~20 km de frontiera cu Republica Moldova (râul Prut)', risk:'La ~200 km de zona de conflict din Ucraina', note:'Iași — cel mai mare oraș al UE la frontiera estică; poartă strategică spre R. Moldova, coridor logistic și umanitar din 2022.'},
  SV: {border:'Frontieră directă cu Ucraina (nord) + R. Moldova', risk:'Alerte de spațiu aerian; tranzit refugiați și cereale', note:'Suceava / Rădăuți — frontieră cu Ucraina; hub logistic și umanitar major după 2022.'},
  BT: {border:'Triplă frontieră RO–Ucraina–R. Moldova', risk:'Zonă de graniță sensibilă', note:'Botoșani — proximitate de tripla frontieră; rol de tranzit.'},
  TL: {border:'Frontieră cu Ucraina (Delta, brațul Chilia)', risk:'Alerte recurente cu drone răzlețe căzute pe teritoriul RO (2023–2024)', note:'Tulcea — cea mai expusă zonă la incidente cu drone; porturile dunărene au devenit strategice pentru cerealele ucrainene.'},
  GL: {border:'Aproape de tripla frontieră RO–UA–MD; port la Dunăre', risk:'Coridor logistic Dunăre–Marea Neagră', note:'Galați — siderurgie + port fluvial strategic pe coridorul Rhin–Dunăre.'},
  VS: {border:'Frontieră cu Republica Moldova (Prut, Albița)', risk:'Punct vamal major spre R. Moldova', note:'Vaslui / Albița — principal punct de trecere rutier spre R. Moldova.'},
  CT: {border:'Litoral Marea Neagră; aproape de zona de conflict maritim', risk:'Port strategic NATO (apropiere de operațiunile din Marea Neagră)', note:'Constanța — cel mai mare port la Marea Neagră; rol NATO și de export cereale.'},
  NT: {border:'Interior, dar pe coridorul A7 spre frontieră', risk:'Indirect — coridor de aprovizionare', note:'Piatra-Neamț — pe axa de legătură cu A7.'},
  BC: {border:'Interior, pe coridorul A7', risk:'Coridor logistic spre frontiera estică', note:'Bacău — nod pe A7, aeroport internațional.'},
  MM: {border:'Frontieră cu Ucraina (nord)', risk:'Graniță nordică', note:'Maramureș — trecere Halmeu spre Ucraina.'},
  SM: {border:'Frontieră cu Ucraina și Ungaria', risk:'Triplă vecinătate UE/non-UE', note:'Satu Mare — coridor nord-vest.'},
  CJ: {border:'Interior — pol al Transilvaniei', risk:'Stabil; pe coridoarele A3/Rin–Dunăre', note:'Cluj — al doilea pol economic; metrou în execuție.'},
  TM: {border:'Frontieră cu Serbia și Ungaria (vest)', risk:'Poartă vestică UE', note:'Timiș — pol vestic; conectat la coridorul IV pan-european.'},
  B:  {border:'Capitală — centru de decizie', risk:'Țintă strategică; hub aerian național', note:'București — centru politic/economic; metrou M6 spre Otopeni.'},
};
var GEO_DEFAULT = {border:'Interior, fără frontieră directă', risk:'Stabilitate geopolitică relativă', note:'Accesul la coridoarele TEN-T determină viteza de convergență economică.'};

function _hav(la1,lo1,la2,lo2){
  var R=6371, d2r=Math.PI/180;
  var dla=(la2-la1)*d2r, dlo=(lo2-lo1)*d2r;
  var a=Math.sin(dla/2)*Math.sin(dla/2)+Math.cos(la1*d2r)*Math.cos(la2*d2r)*Math.sin(dlo/2)*Math.sin(dlo/2);
  return 2*R*Math.asin(Math.min(1,Math.sqrt(a)));
}
function _minDistToTraseu(lat,lon,traseu){
  var m=1e9; traseu.forEach(function(p){ var d=_hav(lat,lon,p[1],p[0]); if(d<m)m=d; }); return m;
}

var MODAL_STYLE = {
  baraj:{c:'#38bdf8', icon:'🌊'}, port:{c:'#60a5fa', icon:'⚓'},
  vama:{c:'#f87171', icon:'🛂'},  mina:{c:'#a78bfa', icon:'⛏'},
};

G._RegioInfra = {
  STATUS:STATUS, AIRPORTS:AIRPORTS, HIGHWAYS:HIGHWAYS, METROS:METROS, GEO:GEO, MODAL:MODAL,

  // cele mai apropiate N aeroporturi reale (in raza maxKm)
  nearestAirports: function(lat, lon, maxKm, n){
    maxKm=maxKm||220; n=n||4;
    return AIRPORTS.map(function(a){ return {a:a, d:_hav(lat,lon,a.lat,a.lon)}; })
      .filter(function(x){ return x.d<=maxKm; })
      .sort(function(x,y){ return x.d-y.d; })
      .slice(0,n).map(function(x){ return Object.assign({distKm:Math.round(x.d)}, x.a); });
  },
  // autostrazi/metrouri relevante (traseu trece la <maxKm de oras)
  relevantHighways: function(lat, lon, maxKm){
    maxKm=maxKm||160;
    return HIGHWAYS.filter(function(h){ return _minDistToTraseu(lat,lon,h.traseu)<=maxKm; });
  },
  relevantMetros: function(lat, lon, maxKm){
    maxKm=maxKm||60;
    return METROS.filter(function(m){ return _minDistToTraseu(lat,lon,m.traseu)<=maxKm; });
  },
  // puncte modale / infrastructura strategica cele mai apropiate
  nearestModal: function(lat, lon, maxKm, n){
    maxKm=maxKm||180; n=n||5;
    return MODAL.map(function(m){ return Object.assign({distKm:Math.round(_hav(lat,lon,m.lat,m.lon))}, m); })
      .filter(function(x){ return x.distKm<=maxKm; })
      .sort(function(a,b){ return a.distKm-b.distKm; }).slice(0,n);
  },
  geoContext: function(judet){ return GEO[(judet||'').toUpperCase()]||GEO_DEFAULT; },

  // Features pt harta (cinematic): {lines, airportPts, labels}
  buildFeatures: function(city){
    var lat=(city&&city.lat)||47, lon=(city&&city.lon)||27;
    var lines=[], labels=[], pts=[];
    var hw=this.relevantHighways(lat,lon).concat(this.relevantMetros(lat,lon));
    hw.forEach(function(h){
      var col=(STATUS[h.status]||STATUS.proiectare).c;
      lines.push({type:'Feature',geometry:{type:'LineString',coordinates:h.traseu},properties:{c:col,nume:h.nume,status:h.status}});
      var mid=h.traseu[Math.floor(h.traseu.length/2)];
      // santierele active (executie) marcate cu semn de constructie 🏗 (#9)
      var ic = h.status==='executie' ? '🏗' : (h.oras?'🚇':'🛣');
      labels.push({lon:mid[0], lat:mid[1], color:col, icon:ic, title:h.nume, sub:(STATUS[h.status]||{}).label||h.status});
    });
    this.nearestAirports(lat,lon,220,4).forEach(function(a){
      var col=a.tip==='hub'?'#fbbf24':'#22d3ee';
      pts.push({type:'Feature',geometry:{type:'Point',coordinates:[a.lon,a.lat]},properties:{c:col,n:a.name}});
      labels.push({lon:a.lon, lat:a.lat, color:col, icon:'✈', title:a.name.replace('Aeroportul Internațional ','Aeroport ').slice(0,30), sub:a.iata+' · '+a.distKm+' km · '+a.info});
    });
    // PUNCTE MODALE: baraje, porturi, treceri frontiera, mine
    this.nearestModal(lat,lon,170,5).forEach(function(m){
      var st=MODAL_STYLE[m.tip]||{c:'#94a3b8',icon:'•'};
      pts.push({type:'Feature',geometry:{type:'Point',coordinates:[m.lon,m.lat]},properties:{c:st.c,n:m.name}});
      labels.push({lon:m.lon, lat:m.lat, color:st.c, icon:st.icon, title:m.name.slice(0,30), sub:m.distKm+' km · '+m.info});
    });
    return {lines:lines, airportPts:pts, labels:labels};
  },

  // Capitol PDF (Masterplan + PMUD)
  renderChapter: function(D, cityKey, city){
    if(!D || !D.pdf) return;
    city=city||{}; var lat=city.lat||47, lon=city.lon||27;
    var judet=(city.judet||cityKey||'').toString().toUpperCase().replace('RO-','').slice(0,2);
    D.chapter('Infrastructura regională și context geostrategic');
    D.P('Capitol bazat pe date publice oficiale: CNAIR și PNRR (autostrăzi), AACR/ROMATSA (aeroporturi), Metrou Cluj SA / Metrorex (metrou). Investițiile regionale generează coridoare de influență noi care schimbă potențialul de dezvoltare al UAT-ului. Statusul fiecărui proiect este marcat: finalizat, în execuție sau în proiectare.');

    D.h2('Autostrăzi și coridoare TEN-T relevante');
    var hw=this.relevantHighways(lat,lon,180);
    if(hw.length){
      D.bullets(hw.map(function(h){ return [h.nume+' ['+((STATUS[h.status]||{}).label||h.status)+']', h.desc+' (sursă: '+h.sursa+').']; }));
    } else { D.P('Nu există autostrăzi majore în imediata proximitate; accesul se face prin drumuri naționale.'); }

    var mt=this.relevantMetros(lat,lon,60);
    if(mt.length){ D.h2('Transport greu urban (metrou)'); D.bullets(mt.map(function(m){ return [m.nume+' ['+((STATUS[m.status]||{}).label||m.status)+']', m.desc+' (sursă: '+m.sursa+').']; })); }

    D.h2('Aeroporturi');
    var ap=this.nearestAirports(lat,lon,260,5);
    if(ap.length){
      D.bullets(ap.map(function(a){ return [a.name+' ('+a.iata+')', '~'+a.distKm+' km · '+a.tip+' · '+a.info+'.']; }));
    }
    var md=this.nearestModal(lat,lon,200,6);
    if(md.length){
      D.h2('Puncte modale și infrastructură strategică (baraje, porturi, treceri de frontieră, noduri extractive)');
      D.bullets(md.map(function(m){ return [m.name, '~'+m.distKm+' km · '+m.tip+' · '+m.info+'.']; }));
    }

    var g=this.geoContext(judet);
    if(g){
      D.h2('Context geostrategic și de frontieră');
      D.P('Poziția la frontiera estică a UE conferă UAT-ului un rol strategic, dar și o expunere specifică. Acestea trebuie reflectate în planificarea rezilienței și a infrastructurii critice.');
      D.bullets([
        ['Frontieră', g.border],
        ['Risc / context', g.risk],
        ['Rol regional', g.note],
      ]);
    }
    if(D.sourceBadges) D.sourceBadges(['CNAIR','PNRR','AACR / ROMATSA','Metrou Cluj SA','Metrorex','MApN / context public']);
  }
};
console.log('[RegioInfra] ✅ infrastructura regionala reala incarcata:', AIRPORTS.length,'aeroporturi,',HIGHWAYS.length,'autostrazi,',METROS.length,'metrouri');
})(window);
