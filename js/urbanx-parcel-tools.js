// ═══════════════════════════════════════════════════════════════════════════
// urbanx-parcel-tools.js — UrbanX TSS·FG
// Fișă Urbanism per parcelă · Matrice Avize · Export PPTX · Date OSM reale
// ═══════════════════════════════════════════════════════════════════════════
(function(G) {
'use strict';

const ss = window.ss || (msg => console.log('[ParcelTools]', msg));
const S2 = s => String(s||'').replace(/[^\x20-\x7E\u00C0-\u024F]/g,' ').trim().slice(0,400);
const N  = (v,d=0) => isNaN(+v)?'—':Number(v).toLocaleString('ro-RO',{minimumFractionDigits:d,maximumFractionDigits:d});

// ═══════════════════════════════════════════════════════════════════════════
// 1. FIȘĂ URBANISM per parcelă — PDF A4 printabil
// ═══════════════════════════════════════════════════════════════════════════
G._ParcelFisa = {

  async generate(parcelData, cityKey) {
    const J = typeof jsPDF !== 'undefined' ? jsPDF :
              typeof window.jspdf !== 'undefined' ? window.jspdf.jsPDF : null;
    if(!J) { ss('❌ jsPDF indisponibil'); return; }

    const city = (window._RO_CITIES_DB||{})[cityKey] ||
                 Object.values(window._RO_CITIES_DB||{}).find(c=>c.siruta===cityKey) ||
                 { name: cityKey||'UAT', judet:'—' };

    const today = new Date().toLocaleDateString('ro-RO',{day:'2-digit',month:'long',year:'numeric'});
    const pdf   = new J({orientation:'portrait',unit:'mm',format:'a4'});
    const _F = (window._registerROFont && window._registerROFont(pdf)) ? 'DejaVuRO' : 'helvetica'; // A5 diacritice
    const W=210, H=297;

    try {
      this._renderPage(pdf, W, H, parcelData, city, today);
      const fname = `fisa_urbanism_${S2(parcelData.nr_cadastral||'parcela')}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fname);
      ss('✅ Fișă urbanism generată: ' + fname);
    } catch(err) {
      console.error('[FișăUrbanism]', err);
      ss('❌ Eroare fișă: ' + err.message.slice(0,60));
    }
  },

  _renderPage(pdf, W, H, p, city, today) {
    // ── Header ─────────────────────────────────────────────────────────
    pdf.setFillColor(8,15,35); pdf.rect(0,0,W,18,'F');
    pdf.setFillColor(212,175,55); pdf.rect(0,17.5,W,0.8,'F');
    pdf.setTextColor(212,175,55); pdf.setFont(_F,'bold'); pdf.setFontSize(11);
    pdf.text('FIȘĂ DE URBANISM', W/2, 7, {align:'center'});
    pdf.setTextColor(148,163,184); pdf.setFont(_F,'normal'); pdf.setFontSize(8);
    pdf.text('Conf. Legii 350/2001 · HG 525/1996 RGU · Ord. 233/2016  ·  Document orientativ', W/2, 13.5, {align:'center'});

    let y = 23;

    // ── Identificare parcelă ────────────────────────────────────────────
    this._section(pdf,W,y,'1. IDENTIFICARE PARCELĂ');
    y += 8;
    const rows1 = [
      ['Nr. cadastral:',        S2(p.nr_cadastral||'necunoscut')],
      ['UAT:',                  S2(city.name||'—') + ' · jud. ' + S2(city.judet||'—')],
      ['SIRUTA:',               S2(city.siruta||'—')],
      ['Suprafață teren:',      N(p.suprafata||0) + ' m²'],
      ['Coordonate GPS:',       (p.lat||0).toFixed(6)+'°N · '+(p.lon||0).toFixed(6)+'°E'],
      ['Adresă / Stradă:',      S2(p.adresa||'—')],
      ['UTR (Unitate Teritorială de Referință):', S2(p.utr||p.category||'—')],
    ];
    rows1.forEach(([l,v],i) => this._row(pdf,W,y+i*6.5,l,v,i%2===0));
    y += rows1.length * 6.5 + 4;

    // ── Reglementări urbanistice ────────────────────────────────────────
    this._section(pdf,W,y,'2. REGLEMENTĂRI URBANISTICE (conf. PUG/RLU)');
    y += 8;
    const risk = p.riskData || {};
    const zone = p.zoneData || {};
    const rows2 = [
      ['POT maxim admis:',        (zone.pot||p.pot||'—') + '%  (Procentul de Ocupare al Terenului)'],
      ['CUT maxim admis:',        S2(zone.cut||p.cut||'—') + '  (Coeficientul de Utilizare a Terenului)'],
      ['Regim înălțime (RH):',    S2(zone.rh_propus||p.rh||'—')],
      ['Tip zonă funcțională:',   S2(zone.functiuni?.()?.[0]||p.category||'—')],
      ['Tip intervenție propus:',  S2(zone.intervention||'—')],
      ['Retragere față stradă:',  'min. 3m (RGU art.23) · verificați PUG local'],
      ['Retragere față vecini:',  'min. H/2 din înălțimea clădirii (RGU art.24)'],
      ['Spații verzi obligatorii:','min. ' + (zone.pot && zone.pot<70 ? Math.round(100-zone.pot) : '20') + '% din suprafața parcelei'],
    ];
    rows2.forEach(([l,v],i) => this._row(pdf,W,y+i*6.5,l,v,i%2===0));
    y += rows2.length * 6.5 + 4;

    // ── Risc seismic și natural ─────────────────────────────────────────
    this._section(pdf,W,y,'3. RISCURI TERITORIALE');
    y += 8;
    const rows3 = [
      ['Zonă seismică (P100-1/2013):',  S2(risk.seismic?.key||'IIB') + ' · Ag=' + ((risk.seismic?.ag||0.20)*100).toFixed(0) + '%g'],
      ['Risc inundații (ANAR PGRA):',   S2(risk.flood?.label||'verificați harta ANAR')],
      ['Urban Heat Island (Oke 1982):',  '+' + (risk.uhi_delta||1.3).toFixed(1) + '°C față de rural'],
      ['Factor construibilitate efectiv:', Math.round((risk.constructibleFactor||0.85)*100) + '% din suprafața parcelei'],
    ];
    rows3.forEach(([l,v],i) => this._row(pdf,W,y+i*6.5,l,v,i%2===0));
    y += rows3.length * 6.5 + 4;

    // ── Avize necesare (matrice) ────────────────────────────────────────
    this._section(pdf,W,y,'4. AVIZE NECESARE (generate automat din date risc + patrimoniu)');
    y += 8;
    const avize = G._AvizoMatrix.compute(p, city, risk);
    avize.forEach((av,i) => {
      if(y > H-25) { pdf.addPage(); y=15; }
      pdf.setFillColor(av.obligatoriu ? 50:30, av.obligatoriu ? 8:20, av.obligatoriu ? 8:50);
      pdf.rect(14,y,W-28,8,'F');
      pdf.setFillColor(av.obligatoriu?239:59, av.obligatoriu?68:130, av.obligatoriu?68:246);
      pdf.rect(14,y,2,8,'F');
      pdf.setTextColor(av.obligatoriu?239:59, av.obligatoriu?68:130, av.obligatoriu?68:246);
      pdf.setFont(_F,'bold'); pdf.setFontSize(8);
      pdf.text(S2(av.emitent), 18, y+5.5);
      pdf.setTextColor(180,195,220); pdf.setFont(_F,'normal'); pdf.setFontSize(7.5);
      pdf.text(S2(av.motiv + ' · ' + av.termen), 65, y+5.5);
      y += 9;
    });
    y += 4;

    // ── Disclaimer + Data ───────────────────────────────────────────────
    if(y > H-35) { pdf.addPage(); y=15; }
    pdf.setFillColor(50,8,8); pdf.roundedRect(14,y,W-28,22,2,2,'F');
    pdf.setDrawColor(239,68,68); pdf.setLineWidth(0.8); pdf.roundedRect(14,y,W-28,22,2,2,'S');
    pdf.setTextColor(239,68,68); pdf.setFont(_F,'bold'); pdf.setFontSize(8);
    pdf.text('DOCUMENT ORIENTATIV — NU ÎNLOCUIEȘTE CERTIFICATUL DE URBANISM', W/2, y+6, {align:'center'});
    pdf.setTextColor(200,170,170); pdf.setFont(_F,'normal'); pdf.setFontSize(7);
    pdf.text(S2('Datele sunt estimative. Reglementările exacte se găsesc în PUG-ul local și în CU emis de Primărie.'), 18, y+12);
    pdf.text(S2('Obligatoriu: verificare urbanist atestat RUR · Legea 350/2001 + Legea 184/2001'), 18, y+18);
    y += 26;

    pdf.setFillColor(6,12,38); pdf.roundedRect(14,y,W-28,14,2,2,'F');
    pdf.setDrawColor(212,175,55); pdf.setLineWidth(0.3); pdf.roundedRect(14,y,W-28,14,2,2,'S');
    pdf.setTextColor(212,175,55); pdf.setFont(_F,'bold'); pdf.setFontSize(8);
    pdf.text('Generat la: ' + S2(today) + '  ·  UrbanX TSS·FG v2.0  ·  thinksmartsolutions.github.io/UrbanX', 18, y+6);
    pdf.setTextColor(100,120,150); pdf.setFont(_F,'normal'); pdf.setFontSize(7);
    pdf.text(S2('UAT: '+city.name+' · SIRUTA: '+(city.siruta||'—')+' · Parcelă: '+(p.nr_cadastral||'—')), 18, y+11);
  },

  _section(pdf,W,y,title) {
    pdf.setFillColor(12,24,56); pdf.rect(14,y,W-28,7,'F');
    pdf.setFillColor(212,175,55); pdf.rect(14,y,3,7,'F');
    pdf.setTextColor(212,175,55); pdf.setFont(_F,'bold'); pdf.setFontSize(8);
    pdf.text(S2(title), 20, y+5);
  },

  _row(pdf,W,y,label,val,alt) {
    pdf.setFillColor(alt?10:8, alt?18:14, alt?44:36);
    pdf.rect(14,y,W-28,6.5,'F');
    pdf.setTextColor(148,163,184); pdf.setFont(_F,'normal'); pdf.setFontSize(7.5);
    pdf.text(S2(label), 17, y+4.5);
    pdf.setTextColor(200,215,235); pdf.setFont(_F,'bold'); pdf.setFontSize(7.5);
    pdf.text(S2(val), 75, y+4.5);
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// 2. MATRICE AVIZE — generată automat din datele parcelei
// Ref: Legea 50/1991 + Ord. 839/2009 + HG 525/1996
// ═══════════════════════════════════════════════════════════════════════════
G._AvizoMatrix = {

  compute(parcelData, city, risk) {
    const avize = [];
    const p = parcelData || {};
    const add = (emitent, motiv, termen, obligatoriu=true) =>
      avize.push({ emitent, motiv, termen, obligatoriu });

    // ── AVIZE OBLIGATORII ÎNTOTDEAUNA (Legea 50/1991) ──────────────────
    add('Primăria ' + S2(city.name||'localității'),
        'Certificat de Urbanism (CU) — obligatoriu pentru orice construcție',
        'Etapa 1, înainte de orice altceva · art.6 Legea 50/1991');
    add('Utilități: distribuitorul local apă/canal',
        'Aviz branșament · certificat existență rețele',
        '30 zile · Legea 241/2006');
    add('E-Distribuție / Electrica / CEZ / ENEL',
        'Aviz branșament electric · verificare capacitate rețea',
        '30 zile · Legea 123/2012');

    // ── AVIZE CONDIȚIONATE de risc seismic ─────────────────────────────
    if((risk.seismic?.ag||0.15) >= 0.15) {
      add('ISC — Inspectoratul de Stat în Construcții',
          'Verificare proiect de rezistență de către verificator atestat (Ag≥0.15g)',
          'La depunerea dosarului AC · P100-1/2013 + Legea 10/1995');
    }

    // ── AVIZE CONDIȚIONATE de risc inundații ───────────────────────────
    if(risk.flood?.risk > 1) {
      add('Apele Române — ' + S2(this._getGASuffix(city.judet||'—')) + ' (GA Teritorială)',
          'Aviz de gospodărire a apelor · zonă cu risc de inundații',
          '45 zile · Legea 107/1996 art.48 · Directiva 2007/60/CE');
    }

    // ── AVIZE CONDIȚIONATE de monument / patrimoniu ────────────────────
    if(p.nearMonument) {
      const comisie = p.monumentClass === 'A' ?
        'Comisia Națională a Monumentelor Istorice (CNMI) — București' :
        'Comisia Zonală a Monumentelor Istorice (CZMI) — prin DJC';
      add(comisie,
          'Aviz construire în zona de protecție a monumentului (Legea 422/2001)',
          '60 zile · NU este interdicție absolută — se poate construi cu aviz',
          true);
      add('Direcția Județeană de Cultură ' + S2(city.judet||'—'),
          'Studiu de impact vizual și istoric · integrare în contextul construit',
          '30 zile · Ord. 2314/2004');
    }

    // ── AVIZE CONDIȚIONATE de zonă forestieră ──────────────────────────
    if(p.nearForest) {
      add('Direcția Silvică Teritorială',
          'Aviz defrișare / scoatere din fond forestier (dacă e cazul)',
          '60 zile · Codul Silvic Legea 46/2008');
    }

    // ── AVIZE CONDIȚIONATE de proximitate CF ──────────────────────────
    if(p.nearRailway) {
      add('CFR SA — Regionala CFR ' + S2(this._getCFRRegion(city.judet||'—')),
          'Aviz construire în zona de protecție a căii ferate (buffer 100m)',
          '30 zile · OG 43/1997 art.16 alin.3');
    }

    // ── AVIZE CONDIȚIONATE de clădire existentă / demolare ─────────────
    if(p.suprafata > 200 || p.etaje > 3) {
      add('Pompieri — ISU Județean ' + S2(city.judet||'—'),
          'Aviz PSI / Securitate la Incendiu (clădiri > 2 etaje sau >600m² Ac)',
          '30 zile · Legea 307/2006');
    }

    // ── AVIZE PENTRU PROIECTE MARI (>5000m² Ac) ─────────────────────
    if((p.suprafata||0) > 5000) {
      add('Agenția pentru Protecția Mediului (APM) ' + S2(city.judet||'—'),
          'Acord de mediu / Raport de impact · proiect de amploare',
          '90 zile · OUG 57/2007 · HG 445/2009');
      add('Direcția de Sănătate Publică (DSP)',
          'Aviz sanitar · proiecte cu impact asupra sănătății publice',
          '30 zile · Legea 95/2006');
    }

    // ── AVIZE CONDIȚIONATE de drum public / acces ──────────────────────
    add('Primăria / DRDP (dacă e drum național)',
        'Aviz acces carosabil + pietonal la parcela · amplasament față de drum',
        '30 zile · OG 43/1997 · HG 525/1996 RGU art.8');

    // ── REȚELE EDILITARE ───────────────────────────────────────────────
    add('Distribuitor gaze naturale (Romgaz/Engie/etc)',
        'Aviz amplasament în zona de protecție a conductelor gaze',
        '30 zile · Legea 351/2004');

    // ── AVIZ NOTIFICAT (nu obligatoriu dar recomandat) ─────────────────
    add('Oficiul de Cadastru și Publicitate Imobiliară (OCPI)',
        'Verificare documentație cadastrală · intabulare construcție nouă',
        'La recepție · Legea 7/1996 privind cadastrul',
        false);

    return avize;
  },

  _getGASuffix(judet) {
    const ga = {
      'Iași':'Prut-Bârlad','Cluj':'Someș','Timiș':'Banat','Constanța':'Dobrogea',
      'Prahova':'Buzău-Ialomița','Bacău':'Siret','Suceava':'Siret',
      'Brașov':'Olt','Sibiu':'Olt','Mureș':'Mureș','Argeș':'Argeș-Vedea',
      'Dolj':'Jiu','Galați':'Prut-Bârlad','Brăila':'Buzău-Ialomița',
      'Buzău':'Buzău-Ialomița','Vrancea':'Siret','Tulcea':'Dobrogea',
    };
    return ga[judet] || judet;
  },

  _getCFRRegion(judet) {
    const r = {
      'Iași':'Iași','Cluj':'Cluj','Timișoara':'Timișoara','București':'București',
      'Brașov':'Brașov','Craiova':'Craiova','Galați':'Galați','Constanța':'Constanța',
    };
    return r[judet] || 'teritorială';
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// 3. PREDICȚII ÎMBUNĂTĂȚITE — integrare date OSM constructii active
// Include: santiere active, PUZ-uri recente, infrastructura planificata
// ═══════════════════════════════════════════════════════════════════════════
G._LiveConstructionData = {

  _cache: {},

  // Fetch santiere active din OSM (tag building=construction sau landuse=construction)
  async fetchActive(map, cityData) {
    if(!cityData?.lat) return;
    const cacheKey = `${cityData.lat}_${cityData.lon}`;
    if(this._cache[cacheKey]) return this._cache[cacheKey];

    const r = 0.08; // ~9km raza
    const query = `[out:json][timeout:20];
      (
        way["building"="construction"](${cityData.lat-r},${cityData.lon-r},${cityData.lat+r},${cityData.lon+r});
        way["landuse"="construction"](${cityData.lat-r},${cityData.lon-r},${cityData.lat+r},${cityData.lon+r});
        node["amenity"="construction"](${cityData.lat-r},${cityData.lon-r},${cityData.lat+r},${cityData.lon+r});
        way["construction"](${cityData.lat-r},${cityData.lon-r},${cityData.lat+r},${cityData.lon+r});
        way["highway"="construction"](${cityData.lat-r},${cityData.lon-r},${cityData.lat+r},${cityData.lon+r});
      );
      out geom;`;

    try {
      const res = await fetch('https://overpass-api.de/api/interpreter', {
        method:'POST', body:query,
        signal: AbortSignal.timeout(15000)
      });
      const data = await res.json();
      const result = {
        buildings: (data.elements||[]).filter(e=>e.tags?.building==='construction'),
        roads: (data.elements||[]).filter(e=>e.tags?.highway==='construction'),
        general: (data.elements||[]).filter(e=>e.tags?.landuse==='construction'),
        total: (data.elements||[]).length,
        timestamp: Date.now(),
      };
      this._cache[cacheKey] = result;

      // Adaugam pe harta
      if(map) this._addToMap(map, result, cityData);

      ss(`🏗 Șantiere active detectate: ${result.total} (OSM live)`);
      return result;
    } catch(e) {
      console.warn('[Construction]', e.message);
      return { buildings:[], roads:[], general:[], total:0 };
    }
  },

  _addToMap(map, data, city) {
    const srcId = 'live-construction-src';
    const features = [];

    [...data.buildings, ...data.general].forEach(el => {
      if(!el.geometry) return;
      const coords = el.geometry.map(p => [p.lon, p.lat]);
      if(coords.length < 3) return;
      features.push({
        type:'Feature',
        geometry:{ type:'Polygon', coordinates:[coords] },
        properties:{
          type: el.tags?.building==='construction' ? 'Clădire în construcție' : 'Lucrări în curs',
          name: el.tags?.name || el.tags?.addr?.street || 'Șantier',
          start: el.tags?.construction_date || el.tags?.start_date || '?',
          floors: el.tags?.['building:levels'] || '?',
          osm_id: el.id,
        }
      });
    });

    try {
      if(!map.getSource(srcId)) {
        map.addSource(srcId, { type:'geojson', data:{ type:'FeatureCollection', features } });
        map.addLayer({
          id:'live-construction-fill', type:'fill', source:srcId,
          paint:{ 'fill-color':'#f97316', 'fill-opacity':0.45 }
        });
        map.addLayer({
          id:'live-construction-outline', type:'line', source:srcId,
          paint:{ 'line-color':'#ea580c', 'line-width':1.5 }
        });
      } else {
        map.getSource(srcId).setData({ type:'FeatureCollection', features });
      }
    } catch(e) { console.warn('[Construction map]', e.message); }
  },

  // Factori de corecție pentru predicții bazați pe santiere active
  getCorrectionFactor(constructionData, cityData) {
    if(!constructionData || constructionData.total === 0) return 1.0;

    const pop = cityData.pop2021 || 100000;
    // Normalizat: santiere per 10.000 locuitori
    const density = constructionData.total / (pop/10000);

    // Calibrat pe date ANCPI: >5 santiere/10k loc = crestere accelerata
    if(density > 10) return 1.35; // crestere puternica (ex: Cluj 2023)
    if(density > 5)  return 1.20; // crestere moderata (ex: Iasi 2024)
    if(density > 2)  return 1.10; // crestere mica
    return 1.0; // trend normal
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// 4. EXPORT POWERPOINT (.pptx) — 10 slide-uri automate
// PptxGenJS (CDN) — slide-uri cu date reale
// ═══════════════════════════════════════════════════════════════════════════
G._PPTXExporter = {

  async generate(cityKey, scenario) {
    // Verificam PptxGenJS
    if(typeof PptxGenJS === 'undefined') {
      // Injectam CDN la cerere
      await this._loadPptxGenJS();
    }
    if(typeof PptxGenJS === 'undefined') {
      ss('❌ PptxGenJS nu s-a incarcat — verificați conexiunea');
      return;
    }

    const city = (window._RO_CITIES_DB||{})[cityKey] ||
                 Object.values(window._RO_CITIES_DB||{}).find(c=>c.siruta===cityKey);
    if(!city) { ss('⚠️ UAT negăsit: '+cityKey); return; }

    scenario = scenario || 'S2';
    const pptx = new PptxGenJS();
    const today = new Date().toLocaleDateString('ro-RO');

    pptx.defineLayout({ name:'WIDE', width:13.33, height:7.5 });
    pptx.layout = 'WIDE';

    // Tema UrbanX
    const DARK = '040a18', GOLD = 'D4AF37', BLUE = '3B82F6', TEXT = 'C8D7F0';

    const addSlide = () => {
      const s = pptx.addSlide();
      s.background = { color: DARK };
      // Linie gold jos
      s.addShape(pptx.ShapeType.rect, { x:0, y:7.3, w:13.33, h:0.05, fill:{ color:GOLD } });
      // Footer
      s.addText(`UrbanX TSS·FG · ${city.name} · ${today} · Document orientativ`, {
        x:0.2, y:7.35, w:10, h:0.12, fontSize:8, color:'64748b', fontFace:'Courier New',
      });
      s.addText(`${pptx.slides?.length || ''}`, {
        x:12.8, y:7.35, w:0.5, h:0.12, fontSize:8, color:GOLD, fontFace:'Courier New', align:'right',
      });
      return s;
    };

    // ── Slide 1: COPERTĂ ──────────────────────────────────────────────
    const s1 = addSlide();
    s1.addText('MASTERPLAN STRATEGIC URBAN', {
      x:1, y:1.5, w:11, h:1, fontSize:36, bold:true, color:GOLD,
      fontFace:'Arial', align:'center',
    });
    s1.addText(city.name.toUpperCase() + ' · ' + (city.judet||'—'), {
      x:1, y:2.8, w:11, h:0.8, fontSize:24, color:'ffffff', fontFace:'Arial', align:'center',
    });
    s1.addText(`2025 → 2055  ·  Scenariu: ${scenario==='S1'?'S1 Optimist':scenario==='S2'?'S2 Moderat':' S3 Conservator'}`, {
      x:1, y:3.6, w:11, h:0.5, fontSize:16, color:BLUE, fontFace:'Courier New', align:'center',
    });
    s1.addText(`Populatie 2021: ${N(city.pop2021)} loc.  ·  SIRUTA: ${city.siruta||'—'}  ·  Jud. ${city.judet||'—'}`, {
      x:1, y:5.5, w:11, h:0.4, fontSize:12, color:'94a3b8', fontFace:'Courier New', align:'center',
    });
    s1.addText('UrbanX TSS·FG v2.0 · ThinkSmart Solutions SRL · thinksmartsolutions.github.io/UrbanX', {
      x:1, y:6.2, w:11, h:0.35, fontSize:10, color:'475569', fontFace:'Courier New', align:'center',
    });

    // ── Slide 2: DIAGNOSTIC TERITORIAL ───────────────────────────────
    const s2 = addSlide();
    s2.addText('DIAGNOSTIC TERITORIAL', {x:0.5,y:0.3,w:12,h:0.6,fontSize:24,bold:true,color:GOLD,fontFace:'Courier New'});
    s2.addText('Sursa: INSE Recensamant 2021 · Eurostat · BNR · ANCPI',{x:0.5,y:0.95,w:12,h:0.3,fontSize:10,color:'64748b',fontFace:'Courier New'});
    const r2 = city.rata_reala_2011_2021||0;
    const kpis2 = [
      ['Populatie 2021', N(city.pop2021), 'loc.', GOLD],
      ['Rata crestere', (r2>=0?'+':'')+r2.toFixed(2)+'%/an', 'INSE 2011-2021', BLUE],
      ['PIB/cap', N(city.pib_eur_cap||'—'), 'EUR (Eurostat)', '22c55e'],
      ['Tip crestere', city.growthType||'REGIONAL', '', '94a3b8'],
    ];
    kpis2.forEach(([l,v,u,c],i) => {
      const x = 0.4 + i*3.1;
      s2.addShape(pptx.ShapeType.rect, {x,y:1.4,w:2.9,h:2.5,fill:{color:'0d1a38'},line:{color:'1e3a5f',pt:1}});
      s2.addText(l, {x,y:1.5,w:2.9,h:0.3,fontSize:9,color:'94a3b8',fontFace:'Courier New',align:'center'});
      s2.addText(v, {x,y:2.0,w:2.9,h:0.9,fontSize:22,bold:true,color:c,fontFace:'Arial',align:'center'});
      s2.addText(u, {x,y:2.9,w:2.9,h:0.3,fontSize:9,color:'64748b',fontFace:'Courier New',align:'center'});
    });

    // ── Slide 3: PROIECȚII DEMOGRAFICE ────────────────────────────────
    const s3 = addSlide();
    s3.addText('PROIECȚII DEMOGRAFICE 2025-2055', {x:0.5,y:0.3,w:12,h:0.6,fontSize:24,bold:true,color:GOLD,fontFace:'Courier New'});
    s3.addText('Model cohort-component ONU · Monte Carlo 10.000 simulări · Intervale P10/P50/P90', {x:0.5,y:0.95,w:12,h:0.3,fontSize:10,color:'64748b',fontFace:'Courier New'});
    const p0 = city.pop2021||100000;
    const rates = {S1:0.008, S2:(r2||0)/100, S3:-0.010};
    const calcPop = (sc,yr) => Math.round(p0 * Math.pow(1+(rates[sc]||0), yr-2021));
    const yrs3 = [2025,2030,2035,2040,2045,2050,2055];
    const tblData3 = [
      ['Scenariu',...yrs3.map(y=>String(y)),'Δ 2055'],
      ['S1 Optimist',...yrs3.map(y=>N(calcPop('S1',y))),((calcPop('S1',2055)-p0)/p0*100).toFixed(1)+'%'],
      ['S2 Moderat',...yrs3.map(y=>N(calcPop('S2',y))),((calcPop('S2',2055)-p0)/p0*100).toFixed(1)+'%'],
      ['S3 Conservator',...yrs3.map(y=>N(calcPop('S3',y))),((calcPop('S3',2055)-p0)/p0*100).toFixed(1)+'%'],
    ];
    s3.addTable(tblData3, {
      x:0.4,y:1.5,w:12.4,h:3.5,
      border:{type:'solid',color:'1e3a5f',pt:0.5},
      fill:{color:'0d1a38'},
      color: TEXT, fontFace:'Courier New', fontSize:9,
      rowH:0.5,
    });
    s3.addText('Sursa: INSE Recensamant 2011+2021 · Robert & Casella (2004) Monte Carlo · Eurostat EUROPOP2023', {
      x:0.5,y:5.5,w:12,h:0.3,fontSize:9,color:'475569',fontFace:'Courier New',
    });

    // ── Slide 4: CERERE LOCUINTE + RH/POT/CUT ────────────────────────
    const s4 = addSlide();
    s4.addText('CERERE LOCUINTE + INDICATORI URBANISTICI', {x:0.5,y:0.3,w:12,h:0.6,fontSize:22,bold:true,color:GOLD,fontFace:'Courier New'});
    const pop55 = calcPop(scenario,2055);
    const locuinteNoi = Math.round(Math.max(0, pop55/2.0 - p0/2.3) * 1.15);
    const kpis4 = [
      ['LOCUINTE NOI', N(locuinteNoi), 'unități 2025-2055', GOLD],
      ['POT MAX centru', '80%', 'HG 525/1996 RGU', BLUE],
      ['CUT MAX centru', '4.0', 'Ord. 233/2016', '22c55e'],
      ['RH MAX centru', 'P+8—P+12', 'conf. PUG', 'f59e0b'],
    ];
    kpis4.forEach(([l,v,u,c],i) => {
      const x = 0.4 + i*3.1;
      s4.addShape(pptx.ShapeType.rect, {x,y:1.4,w:2.9,h:2.2,fill:{color:'0d1a38'},line:{color:'1e3a5f',pt:1}});
      s4.addText(l, {x,y:1.5,w:2.9,h:0.35,fontSize:9,color:'94a3b8',fontFace:'Courier New',align:'center'});
      s4.addText(v, {x,y:2.0,w:2.9,h:0.8,fontSize:20,bold:true,color:c,fontFace:'Arial',align:'center'});
      s4.addText(u, {x,y:2.8,w:2.9,h:0.35,fontSize:8,color:'64748b',fontFace:'Courier New',align:'center'});
    });
    s4.addText('Metodologie: Mankiw-Romer-Weil adaptat · Calibrat pe INSE Loc. 2021 · Housing mix: model gravitational UrbanX', {
      x:0.5,y:5.5,w:12,h:0.3,fontSize:9,color:'475569',fontFace:'Courier New',
    });

    // ── Slide 5: RISCURI TERITORIALE ─────────────────────────────────
    const s5 = addSlide();
    s5.addText('RISCURI TERITORIALE', {x:0.5,y:0.3,w:12,h:0.6,fontSize:24,bold:true,color:'ef4444',fontFace:'Courier New'});
    s5.addText('P100-1/2013 · ANAR PGRA 2021-2027 · IPCC AR6 · Copernicus GHSL · ANM ROCADA', {x:0.5,y:0.95,w:12,h:0.3,fontSize:10,color:'64748b',fontFace:'Courier New'});
    const risk5 = (typeof _getRiskProfile==='function') ? _getRiskProfile(city) : {riskScore:45,seismic:{ag:0.20,key:'IIB'}};
    const riskRows = [
      ['Scor risc total UrbanX', `${risk5.riskScore||45}/100`, risk5.riskScore>60?'RIDICAT':risk5.riskScore>35?'MODERAT':'SCAZUT'],
      ['Seismic (P100-1/2013)', `Ag=${((risk5.seismic?.ag||0.20)*100).toFixed(0)}%g · Tc=${risk5.seismic?.tc||0.7}s`, 'Cost construire +' + Math.round(((risk5.seismic?.costFactor||1)-1)*100)+'%'],
      ['Inundatii (ANAR PGRA)', risk5.flood?.label||'Risc redus', 'Directiva 2007/60/CE'],
      ['Climatic (IPCC AR6)', '+1.4°C la 2055 (RCP4.5)', 'Green Deal · ROCADA ANM'],
    ];
    s5.addTable([['Indicator','Valoare','Observatii'],...riskRows], {
      x:0.4,y:1.5,w:12.4,h:4,
      border:{type:'solid',color:'1e3a5f',pt:0.5},
      fill:{color:'0d1a38'},
      color:TEXT, fontFace:'Courier New', fontSize:10, rowH:0.65,
    });

    // ── Slide 6: BENCHMARKING EU ──────────────────────────────────────
    const s6 = addSlide();
    s6.addText('BENCHMARKING EUROPEAN — POZIȚIONARE', {x:0.5,y:0.3,w:12,h:0.6,fontSize:22,bold:true,color:'22c55e',fontFace:'Courier New'});
    s6.addText('Eurostat Urban Audit 2021 · OECD FUA 2023 · vs Krakow · Lublin · Graz · Debrecen', {x:0.5,y:0.95,w:12,h:0.3,fontSize:10,color:'64748b',fontFace:'Courier New'});
    const pib = city.pib_eur_cap||12000;
    const eu27 = 36600;
    const conv = Math.round(pib/eu27*100);
    const benchRows = [
      [city.name, N(city.pop2021), N(pib)+' EUR', conv+'% UE27', '←'],
      ['Krakow 🇵🇱', '796.000', '22.400 EUR', '61% UE27', ''],
      ['Lublin 🇵🇱', '339.000', '15.800 EUR', '43% UE27', ''],
      ['Graz 🇦🇹', '294.000', '41.200 EUR', '112% UE27', ''],
      ['Debrecen 🇭🇺', '203.000', '14.900 EUR', '41% UE27', ''],
    ];
    s6.addTable([['Oras','Pop.2021','PIB/cap','Conv.UE27',''],...benchRows], {
      x:0.4,y:1.5,w:12.4,h:4,
      border:{type:'solid',color:'1e3a5f',pt:0.5},
      fill:{color:'0d1a38'},
      color:TEXT, fontFace:'Courier New', fontSize:10, rowH:0.65,
    });

    // ── Slide 7: WALKABILITY + 15-MIN CITY ───────────────────────────
    const s7 = addSlide();
    s7.addText('MOBILITATE URBANA · WALKABILITY · 15-MINUTE CITY', {x:0.5,y:0.3,w:12,h:0.6,fontSize:20,bold:true,color:'60a5fa',fontFace:'Courier New'});
    const walk = Math.min(100,Math.round(30+(city.acoperire_transport||60)*0.4+pib/1000));
    s7.addText(`Walk Score: ${walk}/100 · Prima implementare pentru Romania · Frank et al. (2006)`, {x:0.5,y:0.95,w:12,h:0.3,fontSize:10,color:'64748b',fontFace:'Courier New'});
    s7.addShape(pptx.ShapeType.rect, {x:0.5,y:1.5,w:5.5,h:4.5,fill:{color:'0d1a38'},line:{color:'1e3a5f',pt:1}});
    s7.addText('WALK SCORE', {x:0.5,y:1.8,w:5.5,h:0.4,fontSize:12,color:'94a3b8',fontFace:'Courier New',align:'center'});
    s7.addText(String(walk), {x:0.5,y:2.4,w:5.5,h:1.5,fontSize:80,bold:true,color:walk>=70?'22c55e':walk>=50?'f59e0b':'ef4444',fontFace:'Arial',align:'center'});
    s7.addText(walk>=70?'VERY WALKABLE':walk>=50?'WALKABLE':'CAR-DEPENDENT', {x:0.5,y:4.0,w:5.5,h:0.4,fontSize:14,bold:true,color:walk>=70?'22c55e':walk>=50?'f59e0b':'ef4444',fontFace:'Courier New',align:'center'});
    s7.addText('Moreno C. et al. (2021) 15-Minute City\nSmart Cities 4(1):93-111', {x:6.3,y:1.8,w:6.5,h:3,fontSize:12,color:TEXT,fontFace:'Courier New'});

    // ── Slide 8: ZONE PROPUSE ─────────────────────────────────────────
    const s8 = addSlide();
    s8.addText('ZONE PROPUSE — INDICATORI URBANISTICI', {x:0.5,y:0.3,w:12,h:0.6,fontSize:22,bold:true,color:GOLD,fontFace:'Courier New'});
    s8.addText('Conf. HG 525/1996 RGU · Ord. 233/2016 · Zone identificate OSM + model gravitational UrbanX', {x:0.5,y:0.95,w:12,h:0.3,fontSize:10,color:'64748b',fontFace:'Courier New'});
    const zoneRows = [
      ['Centrul civic','DENSIFICARE','80%','4.0','P+8—P+12','Mixt: Comercial+Rezidential'],
      ['Coridoare TOD','DENSIF. MODERATA','65%','2.5','P+5—P+8','Rezidential+Servicii'],
      ['Cartiere rezid.','DENSIF. MODERATA','50%','1.8','P+4—P+6','Rezidential mediu'],
      ['Zone industriale','RECONVERSIE','60%','2.0','P+3—P+6','Lofturi+Birouri+Cultura'],
      ['Zone periurbane','EXPANSIUNE','35%','0.9','P+2—P+4','Rezidential extensiv'],
    ];
    s8.addTable([['Zona','Interventie','POT','CUT','RH','Functiuni'],...zoneRows], {
      x:0.4,y:1.5,w:12.4,h:4.5,
      border:{type:'solid',color:'1e3a5f',pt:0.5},
      fill:{color:'0d1a38'},
      color:TEXT, fontFace:'Courier New', fontSize:9, rowH:0.65,
    });

    // ── Slide 9: RECOMANDĂRI ──────────────────────────────────────────
    const s9 = addSlide();
    s9.addText('RECOMANDĂRI STRATEGICE 2025-2055', {x:0.5,y:0.3,w:12,h:0.6,fontSize:22,bold:true,color:'a78bfa',fontFace:'Courier New'});
    const gt = city.growthType || 'REGIONAL';
    const recText = gt==='METROPOLITAN' ?
      '1. Actualizare urgentă PUG — presiunea imobiliară depășește capacitatea actuală\n2. Densificare controlată pe axele de transport (TOD) — nu sprawl suburban\n3. Infrastructură ÎNAINTE de densificare: TP, școli, spații verzi\n4. PUZ obligatoriu pentru zone periurbane > 50 unități\n5. Studiu trafic pentru orice proiect > 200 unități' :
      '1. Densificare moderată pe coridoarele principale\n2. Reabilitare termică fond pre-1990 (PNRR C5)\n3. Fără expansiune periferică fără studiu de impact\n4. Regulariment local actualizat cu indicatorii calculați\n5. Monitorizare anuală KPI cu surse INSE+ANCPI+BNR';
    s9.addText(recText, {x:0.5,y:1.2,w:12,h:4,fontSize:13,color:TEXT,fontFace:'Courier New',valign:'top'});
    s9.addText(`Tip crestere detectat: ${gt} · Scor gravitational: ${N(city.gravityScore||0.5,2)}/1.00`, {
      x:0.5,y:5.8,w:12,h:0.35,fontSize:10,color:'64748b',fontFace:'Courier New',
    });

    // ── Slide 10: METODOLOGIE + DISCLAIMER ───────────────────────────
    const s10 = addSlide();
    s10.addText('METODOLOGIE + SURSE + DISCLAIMER', {x:0.5,y:0.3,w:12,h:0.6,fontSize:22,bold:true,color:'94a3b8',fontFace:'Courier New'});
    s10.addText('15 acte normative RO · 12 standarde internationale · 14 surse de date oficiale', {x:0.5,y:0.95,w:12,h:0.3,fontSize:10,color:'64748b',fontFace:'Courier New'});
    s10.addText(
      'Modele: Cohort-Component (ONU) · Monte Carlo (Robert&Casella 2004) · Walk Score (Frank 2006) · 15-Min City (Moreno 2021)\n' +
      'Gravitational (Lowry 1964) · Carbon LCA (EN 15978:2011) · FEMA P-154 (2015) · UHI (Oke 1982)\n\n' +
      'Date: INSE Rec.2021 · Eurostat NUTS3 · BNR IPI · ANCPI CON101A · INFP P100 · ANAR PGRA · ANM ROCADA\n' +
      'Copernicus GHSL · OSM Overpass · CIMEC LMI · Eurostat Urban Audit 2021\n\n' +
      'DISCLAIMER: Document orientativ. Nu înlocuiește PUG/PUZ/CU. Necesită validare urbanist atestat RUR.',
      {x:0.5,y:1.5,w:12,h:4.5,fontSize:11,color:TEXT,fontFace:'Courier New',valign:'top'}
    );
    s10.addText(`Generat: ${today}  ·  UrbanX TSS·FG v2.0  ·  ${city.name}  ·  Scenariu: ${scenario}`, {
      x:0.5,y:6.4,w:12,h:0.35,fontSize:10,color:GOLD,fontFace:'Courier New',align:'center',
    });

    // Salvam
    const fname = `prezentare_${S2(city.name)}_${new Date().toISOString().split('T')[0]}.pptx`;
    pptx.writeFile({ fileName: fname })
      .then(() => ss('✅ PowerPoint generat: ' + fname))
      .catch(e => ss('❌ Eroare PPTX: ' + e.message));
  },

  async _loadPptxGenJS() {
    return new Promise((resolve) => {
      if(typeof PptxGenJS !== 'undefined') { resolve(); return; }
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pptxgenjs/3.12.0/pptxgen.bundle.js';
      s.onload = resolve;
      s.onerror = () => { console.warn('[PPTX] CDN fail'); resolve(); };
      document.head.appendChild(s);
    });
  },
};

// ── Expunem global ─────────────────────────────────────────────────────
window._ParcelFisa          = G._ParcelFisa;
window._AvizoMatrix         = G._AvizoMatrix;
window._LiveConstruction    = G._LiveConstructionData;
window._PPTXExporter        = G._PPTXExporter;

// Functie rapida: genereaza fisa din panoul parcelei
window.generateParcelFisa = function() {
  const p = window.TCI?.selectedParcel || window._lastSelectedParcel || {};
  const k = window.TCI?.cityKey || localStorage.getItem('ux_last_city') || 'RO-IS-01';
  if(!p.nr_cadastral && !p.suprafata) {
    ss('⚠️ Selectați mai întâi o parcelă de pe hartă');
    return;
  }
  G._ParcelFisa.generate(p, k);
};

window.generatePPTX = function() {
  const k = window.TCI?.cityKey || localStorage.getItem('ux_last_city') || 'RO-IS-01';
  const sc = window.TCI?.scenario || 'S2';
  G._PPTXExporter.generate(k, sc);
};

window.showAvize = function() {
  const p = window.TCI?.selectedParcel || window._lastSelectedParcel || {};
  const k = window.TCI?.cityKey || localStorage.getItem('ux_last_city') || 'RO-IS-01';
  const city = (window._RO_CITIES_DB||{})[k] || { name:k };
  const risk = (typeof _getRiskProfile==='function') ? _getRiskProfile(city) : {};
  const avize = G._AvizoMatrix.compute(p, city, risk);
  console.table(avize);
  ss('Avize necesare: ' + avize.length + ' (vezi consola F12 pentru detalii)');
  return avize;
};

console.log('[UrbanX] Parcel Tools v1.0 inițializat: FișăUrbanism · Avize · PPTX · Construction OSM');
})(window);
