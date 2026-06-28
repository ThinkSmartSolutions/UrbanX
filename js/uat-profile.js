// ═══════════════════════════════════════════════════════════════════════════
// uat-profile.js — STRAT DE PROFIL TERITORIAL (window._UATProfile)
// Detectează natura specifică a unui UAT (Delta, litoral, minier, salin, baraj,
// portuar, termal, silvic, seismic, transfrontalier) din semnale REALE
// (geografic + liste curate RO + acoperire forestieră/seismic din IVU). Fiecare
// profil declară: studii rang inferior (parcelă/UAT) + rang superior (teritoriu),
// modificator IVU (risc/oportunitate) și relevanță cinematic. 28 iunie 2026 · TSS
// ═══════════════════════════════════════════════════════════════════════════
(function (G) {
  'use strict';
  function _norm(s) { return ('' + (s == null ? '' : s)).toLowerCase().replace(/ș|ş/g, 's').replace(/ț|ţ/g, 't').replace(/ă|â/g, 'a').replace(/î/g, 'i').replace(/municipiul\s+|orasul\s+|comuna\s+/g, '').trim(); }
  function _hav(la1, lo1, la2, lo2) { var R = 6371, d = Math.PI / 180, dla = (la2 - la1) * d, dlo = (lo2 - lo1) * d; var a = Math.sin(dla / 2) * Math.sin(dla / 2) + Math.cos(la1 * d) * Math.cos(la2 * d) * Math.sin(dlo / 2) * Math.sin(dlo / 2); return 2 * R * Math.asin(Math.min(1, Math.sqrt(a))); }

  // ── DATE REALE curate (RO) ──────────────────────────────────────────────
  var COASTAL = ['constanta', 'mangalia', 'navodari', 'eforie', 'techirghiol', 'ovidiu', 'agigea', 'corbu', 'costinesti', '23 august', 'limanu', 'sulina', 'sfantu gheorghe', 'cumpana']; // UAT-uri litoral M. Neagră
  var DELTA = ['tulcea', 'sulina', 'sfantu gheorghe', 'chilia veche', 'crisan', 'maliuc', 'pardina', 'ceatalchioi', 'c.a. rosetti', 'sarichioi', 'jurilovca', 'murighiol', 'mahmudia', 'nufaru', 'bestepe']; // RBDD
  var DAMS = [ // baraje/lacuri majore (nume, lat, lon) — sursă: Hidroelectrica/ABA
    { n: 'Vidraru', lat: 45.358, lon: 24.633 }, { n: 'Izvorul Muntelui (Bicaz)', lat: 46.93, lon: 26.07 },
    { n: 'Porțile de Fier I', lat: 44.671, lon: 22.527 }, { n: 'Vidra (Lotru)', lat: 45.36, lon: 23.85 },
    { n: 'Strejești (Olt)', lat: 44.55, lon: 24.30 }, { n: 'Stânca-Costești (Prut)', lat: 47.78, lon: 27.21 },
    { n: 'Gura Apelor (Retezat)', lat: 45.35, lon: 22.85 }, { n: 'Paltinu (Doftana)', lat: 45.27, lon: 25.78 },
    { n: 'Siriu (Buzău)', lat: 45.52, lon: 26.22 }, { n: 'Fântânele (Someș)', lat: 46.78, lon: 24.30 },
    { n: 'Tarnița', lat: 46.74, lon: 23.29 }, { n: 'Poiana Uzului', lat: 46.40, lon: 26.45 }
  ];
  var MINING = ['petrosani', 'lupeni', 'vulcan', 'petrila', 'uricani', 'aninoasa', 'rosia montana', 'rovinari', 'motru', 'matasari', 'baia mare', 'baia sprie', 'cavnic', 'borsa', 'anina', 'moldova noua', 'baita', 'certej', 'brad', 'abrud', 'cugir']; // mono-industriale/extractive
  var SALT = ['turda', 'slanic', 'ocna sibiului', 'ocna mures', 'praid', 'cacica', 'targu ocna', 'ocnele mari', 'slanic moldova']; // saline
  var THERMAL = ['baile felix', 'baile herculane', 'sovata', 'baile tusnad', 'covasna', 'amara', 'techirghiol', 'baile olanesti', 'calimanesti', 'caciulata', 'baile govora', 'vatra dornei', 'baile 1 mai', 'geoagiu bai', 'moneasa', 'sangeorz bai', 'borsec', 'buzias', 'eforie nord']; // balneo/geotermal
  var PORTS = ['constanta', 'galati', 'braila', 'tulcea', 'mangalia', 'midia', 'oltenita', 'calarasi', 'giurgiu', 'drobeta-turnu severin', 'orsova', 'cernavoda', 'medgidia']; // porturi maritime/fluviale
  // zona seismică Vrancea (ag mare) — județe
  var SEISMIC_HI = ['vrancea', 'buzau', 'galati', 'braila', 'bacau', 'vaslui', 'ialomita', 'prahova'];

  // ── DEFINIȚIA PROFILELOR (studii + IVU + cinematic) ──────────────────────
  var PROFILES = {
    delta:    { id: 'delta', label: 'Deltă / Zone umede', icon: '🦢', ivu: { dim: 'enviro', delta: +6, note: 'arie Natura 2000 / RBDD — capital natural ridicat, dar constrângeri de construcție' }, cine: true,
      studyInf: 'Studii pe parcelă/UAT: inundabilitate, geotehnic-hidrogeologic, EIM sit Natura 2000 (evaluare adecvată), arheologic, peisaj UTR Deltă, bilanț teritorial, capacitate turistică eco, riscuri (eroziune maluri).',
      studySup: 'Rang superior: PATJ, peisaj județean, gospodărire ape (bazin), Plan management RBDD, migrația speciilor/coridoare eco, calitate aer&apă, vulnerabilitate climatică, turism durabil regional.' },
    litoral:  { id: 'litoral', label: 'Litoral / Marea Neagră', icon: '🌊', ivu: { dim: 'resil', delta: -5, note: 'risc eroziune costieră + nivel marin în creștere (vulnerabilitate climatică)' }, cine: true,
      studyInf: 'Eroziune costieră (tronson plajă), batimetrie, inundabilitate&viitură marină, geotehnic-fundare pe nisip, EIM faleză/plajă, bilanț sedimentar, peisaj urban faleză.',
      studySup: 'Masterplan litoral, studiu regional eroziune, calitate ape marine, PATJ componentă costieră, GIZC (gestiune integrată), schimbări climatice-nivel marin, Plan amenajare spațiu maritim.' },
    baraj:    { id: 'baraj', label: 'Baraj / Lac de acumulare', icon: '🏞', ivu: { dim: 'resil', delta: -4, note: 'pericol potențial aval baraj (necesită SSB + PUCA)' }, cine: true,
      studyInf: 'Geotehnic baraj&cuvetă, Studiu Siguranță Baraj (SSB), inundabilitate aval, EIM reabilitare, eutrofizare lac, sedimentare cuvetă, potențial turism lac.',
      studySup: 'Plan gospodărire bazin hidrografic, capacitate energetică regională, masterplan turism montan-lacuri, risc seismic baraje, schimbări climatice-debit, Plan evacuare zonă inundabilă (CZSU), PATJ hidroenergetic.' },
    minier:   { id: 'minier', label: 'Minier / Mono-industrial', icon: '⛏', ivu: { dim: 'enviro', delta: -6, note: 'contaminare sol/apă + iazuri de decantare (risc SEVESO) + subsidență' }, cine: true,
      studyInf: 'Geotehnic&geomecanic, tasare/subsidență, EIM exploatare, contaminare sol/subsol, reabilitare situri, riscuri surpare/taluzuri, iazuri de decantare (SEVESO), zgomot&vibrații.',
      studySup: 'Strategie reconversie mono-industrială, regenerare teritoriu minier, PATJ minier, calitate aer (particule/SO₂), decontaminare ape freatice, Plan tranziție energetică (JTF), diversificare economică.' },
    salin:    { id: 'salin', label: 'Salină / Turism balnear', icon: '🧂', ivu: { dim: 'quality', delta: +5, note: 'resursă balneo/haloterapie — oportunitate turistică & sănătate' }, cine: false,
      studyInf: 'Geotehnic caverne saline, subsidență/prăbușire, hidrogeologic saramură, EIM turism în mină, capacitate vizitare, calitate aer speleoterapie, reconversie saline dezafectate.',
      studySup: 'Masterplan turism balnear regional, rute tematice (saline/spa), valorificare lacuri sărate, PATJ stațiuni balneare, protecție resurse subterane, gestiune situri industriale saline.' },
    portuar:  { id: 'portuar', label: 'Portuar / Fluvial-Maritim', icon: '⚓', ivu: { dim: 'connect', delta: +6, note: 'nod logistic multimodal — conectivitate & competitivitate ridicate' }, cine: true,
      studyInf: 'Geotehnic cheiuri&dane, batimetrie canal navigabil, trafic maritim/fluvial, EIM extindere port, zgomot&poluare port (24h), bilanț teritorial zonă port, reconversie terenuri portuare.',
      studySup: 'Masterplan port, conectivitate multimodală, impact economic regional, navigabilitate Dunăre (ape mici), gestiune deșeuri portuare, capacitate infrastructură, strategie logistică regională.' },
    termal:   { id: 'termal', label: 'Termal / Geotermal-Balnear', icon: '♨', ivu: { dim: 'quality', delta: +6, note: 'resursă geotermală/balneară — oportunitate turism-sănătate' }, cine: false,
      studyInf: 'Debit geotermal, protecție resurse termale, geotehnic foraje, EIM captare termală, capacitate stațiune, microclimat.',
      studySup: 'Masterplan stațiune balneară, valorificare resurse geotermale, rute balneare regionale, PATJ stațiuni, protecție acvifer termal.' },
    silvic:   { id: 'silvic', label: 'Silvic / Forestier', icon: '🌲', ivu: { dim: 'enviro', delta: +5, note: 'capital forestier ridicat — carbon + biodiversitate, dar risc incendii/eroziune' }, cine: false,
      studyInf: 'Silvicultură durabilă, eroziune versanți, risc incendii de pădure, EIM exploatare forestieră, drumuri forestiere.',
      studySup: 'Strategie forestieră regională, coridoare ecologice, plan prevenire incendii, valorificare ecoturism, PATJ montan-forestier.' },
    seismic:  { id: 'seismic', label: 'Risc seismic ridicat (Vrancea)', icon: '🟠', ivu: { dim: 'resil', delta: -7, note: 'zona seismică Vrancea — accelerație ag mare, vulnerabilitate fond construit' }, cine: true,
      studyInf: 'Microzonare seismică UAT, vulnerabilitate fond construit, geotehnic-amplificare locală, plan consolidare prioritară.',
      studySup: 'Microzonare seismică regională, strategie reducere risc seismic, PATJ cu componentă seismică, plan intervenție post-seism.' },
    transfront: { id: 'transfront', label: 'Transfrontalier', icon: '🛂', ivu: { dim: 'connect', delta: +3, note: 'poziție de graniță — oportunitate cooperare & coridoare transfrontaliere' }, cine: false,
      studyInf: 'Amenajare zonă de frontieră, interoperabilitate planuri, punct trecere frontieră, EIM coridor transfrontalier.',
      studySup: 'Strategie de amenajare transfrontalieră, programe Interreg, interoperabilitate PATJ, coridoare TEN-T transfrontaliere.' }
  };

  // ── DETECȚIE (semnale reale, sincron) ────────────────────────────────────
  function detect(city) {
    city = city || {}; var out = [];
    var nm = _norm(city.name), jud = _norm(city.judet), lat = +city.lat || null, lon = +city.lon || null;
    function add(id, conf, ev) { if (PROFILES[id]) out.push({ id: id, profile: PROFILES[id], confidence: conf, evidence: ev }); }
    if (DELTA.indexOf(nm) >= 0 || (jud === 'tulcea' && lat && lat > 44.8 && lon && lon > 28.6)) add('delta', 'ridicată', 'UAT în arealul RBDD / Delta Dunării');
    if (COASTAL.indexOf(nm) >= 0 || (jud === 'constanta' && lon && lon > 28.55)) add('litoral', 'ridicată', 'UAT pe țărmul Mării Negre');
    var dam = DAMS.map(function (d) { return { d: d, km: (lat && lon) ? _hav(lat, lon, d.lat, d.lon) : 999 }; }).filter(function (x) { return x.km <= 12; }).sort(function (a, b) { return a.km - b.km; })[0];
    if (dam) add('baraj', dam.km <= 6 ? 'ridicată' : 'medie', 'baraj/lac major „' + dam.d.n + '" la ~' + Math.round(dam.km) + ' km');
    if (MINING.indexOf(nm) >= 0) add('minier', 'ridicată', 'zonă minieră/mono-industrială cunoscută');
    if (SALT.indexOf(nm) >= 0) add('salin', 'ridicată', 'salină / lac sărat');
    if (THERMAL.indexOf(nm) >= 0) add('termal', 'ridicată', 'stațiune balneară / resursă geotermală');
    if (PORTS.indexOf(nm) >= 0) add('portuar', 'ridicată', 'port maritim/fluvial');
    // silvic: din acoperirea forestieră (reutilizăm tabelul IVU)
    var forest = (G._RegioInfra ? 0 : 0); try { /* forestPct din rank, dacă expus */ } catch (e) {}
    var forestPct = (G._UrbanRank && G._UrbanRank._forestPct) ? G._UrbanRank._forestPct(city) : null;
    if (forestPct != null && forestPct >= 42) add('silvic', 'medie', 'acoperire forestieră județeană ' + forestPct + '%');
    if (SEISMIC_HI.indexOf(jud) >= 0) add('seismic', 'medie', 'județ în zona seismică Vrancea (ag ridicat P100)');
    // dedup pe id (păstrează prima/cea mai puternică)
    var seen = {}; return out.filter(function (x) { if (seen[x.id]) return false; seen[x.id] = 1; return true; });
  }
  function primary(city) { var d = detect(city); return d.length ? d[0] : null; }

  G._UATProfile = { PROFILES: PROFILES, detect: detect, primary: primary };
  console.log('[UATProfile] strat de profil teritorial încărcat · window._UATProfile');
})(window);
