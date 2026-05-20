// ═══════════════════════════════════════════════════════════════════════════
// pug-suceava-layer.js — UrbanX TSS·FG
// PUG Suceava vectorizat — 713 UTR-uri · Stereo70→WGS84
// Import direct în hartă Mapbox — fără server, fără Supabase
// ═══════════════════════════════════════════════════════════════════════════
(function(G){
'use strict';

// ── Metadata PUG Suceava ───────────────────────────────────────────────────
const PUG_META = {
  uat: 'RO-SV-01',
  oras: 'Suceava',
  judet: 'Suceava',
  nr_utr: 713,
  utr_unice: 42,
  proiectie_orig: 'Stereo70 EPSG:31700',
  proiectie_web: 'WGS84 EPSG:4326',
  sursa: 'sv_pug.shp — PUG Suceava vectorizat',
  centru: [26.26402, 47.66206],
  bbox: [[26.168, 47.602], [26.360, 47.720]],
  data_import: '2026-05-20',
  note: '2 features corupte în shapefile original — ignorate',
};

// ── Legenda UTR Suceava ────────────────────────────────────────────────────
const UTR_LEGEND = {
  'L1a': { den:'Locuire mică densitate — P-P+1', col:'#FDE68A', cat:'LOCUIRE', pot:30, cut:0.8, rh:'P-P+1' },
  'L1b': { den:'Locuire mică densitate — P-P+2', col:'#FCD34D', cat:'LOCUIRE', pot:35, cut:0.9, rh:'P-P+2' },
  'L1c': { den:'Locuire înșiruită — P-P+2',      col:'#F59E0B', cat:'LOCUIRE', pot:40, cut:1.0, rh:'P-P+2' },
  'L2':  { den:'Locuire medie — P+3—P+5',         col:'#FB923C', cat:'LOCUIRE', pot:50, cut:1.8, rh:'P+3—P+5' },
  'L3':  { den:'Locuire înaltă — P+6—P+9',        col:'#F97316', cat:'LOCUIRE', pot:60, cut:2.5, rh:'P+6—P+9' },
  'L4':  { den:'Locuire colectivă — P+10+',       col:'#EA580C', cat:'LOCUIRE', pot:70, cut:3.5, rh:'P+10+' },
  'Li':  { den:'Locuire individuală izolată',      col:'#FEF3C7', cat:'LOCUIRE', pot:25, cut:0.6, rh:'P-P+1' },
  'Lc':  { den:'Locuire colectivă mixtă',          col:'#FED7AA', cat:'LOCUIRE', pot:45, cut:1.5, rh:'P+2—P+4' },
  'M1':  { den:'Mixt rezidențial-servicii mic',    col:'#FCA5A1', cat:'MIXT',    pot:50, cut:1.8, rh:'P+3—P+5' },
  'M1b': { den:'Mixt rezidențial tip B',           col:'#FBB0B0', cat:'MIXT',    pot:50, cut:1.8, rh:'P+3—P+5' },
  'M2':  { den:'Mixt medie densitate',             col:'#F87171', cat:'MIXT',    pot:60, cut:2.5, rh:'P+5—P+8' },
  'M3':  { den:'Mixt înaltă densitate',            col:'#EF4444', cat:'MIXT',    pot:70, cut:3.0, rh:'P+8—P+12' },
  'M4':  { den:'Mixt servicii dominante',          col:'#DC2626', cat:'MIXT',    pot:75, cut:3.5, rh:'P+8—P+14' },
  'Mc':  { den:'Mixt comercial',                   col:'#B91C1C', cat:'MIXT',    pot:65, cut:2.8, rh:'P+4—P+8' },
  'Mi':  { den:'Mixt industrial reconversie',      col:'#7F1D1D', cat:'MIXT',    pot:55, cut:2.0, rh:'P+3—P+6' },
  'C0':  { den:'Centru civic',                     col:'#F97316', cat:'CENTRU',  pot:80, cut:4.0, rh:'P+8—P+14' },
  'C1':  { den:'Comercial intensiv',               col:'#FB923C', cat:'CENTRU',  pot:75, cut:3.5, rh:'P+6—P+10' },
  'C2a': { den:'Comercial general',                col:'#FDBA74', cat:'CENTRU',  pot:65, cut:2.5, rh:'P+4—P+8' },
  'C2b': { den:'Comercial proximitate',            col:'#FED7AA', cat:'CENTRU',  pot:55, cut:2.0, rh:'P+2—P+5' },
  'C2c': { den:'Comercial specializat',            col:'#FFEDD5', cat:'CENTRU',  pot:55, cut:2.0, rh:'P+2—P+5' },
  'F':   { den:'Funcțiuni speciale',               col:'#86EFAC', cat:'INST',    pot:50, cut:1.5, rh:'variabil' },
  'G1':  { den:'Gospodărie comunală — utilități',  col:'#6B7280', cat:'GOSP',    pot:60, cut:1.5, rh:'P+2—P+4' },
  'G2':  { den:'Gospodărie — depozite/service',    col:'#9CA3AF', cat:'GOSP',    pot:65, cut:1.8, rh:'P+2—P+4' },
  'S':   { den:'Servicii specializate',            col:'#A5B4FC', cat:'SERV',    pot:55, cut:2.0, rh:'P+3—P+6' },
  'T1':  { den:'Transport — gară/autogară',        col:'#C4B5FD', cat:'TRANSP',  pot:40, cut:1.0, rh:'P+1—P+3' },
  'T2':  { den:'Transport — infrastructură',       col:'#DDD6FE', cat:'TRANSP',  pot:30, cut:0.5, rh:'P+1' },
  'V1':  { den:'Spații verzi — parcuri',           col:'#16A34A', cat:'VERDE',   pot:5,  cut:0.1, rh:'P' },
  'V1a': { den:'Spații verzi — parcuri cartier',   col:'#22C55E', cat:'VERDE',   pot:5,  cut:0.1, rh:'P' },
  'V1b': { den:'Spații verzi — scuaruri',          col:'#4ADE80', cat:'VERDE',   pot:3,  cut:0.05,rh:'P' },
  'V2a': { den:'Sport și agrement',                col:'#86EFAC', cat:'VERDE',   pot:15, cut:0.3, rh:'P+1' },
  'V2b': { den:'Baze sportive',                    col:'#BBF7D0', cat:'VERDE',   pot:20, cut:0.5, rh:'P+1—P+2' },
  'V2c': { den:'Agrement',                         col:'#D1FAE5', cat:'VERDE',   pot:10, cut:0.2, rh:'P' },
  'V3':  { den:'Cimitire',                         col:'#34D399', cat:'VERDE',   pot:5,  cut:0.1, rh:'P' },
  'V4':  { den:'Păduri periurbane',                col:'#059669', cat:'VERDE',   pot:0,  cut:0.0, rh:'—' },
  'A1':  { den:'Agricol — teren arabil',           col:'#D9F99D', cat:'AGRIC',   pot:0,  cut:0.0, rh:'—' },
  'A2':  { den:'Agricol — livezi/vii',             col:'#BEF264', cat:'AGRIC',   pot:5,  cut:0.1, rh:'P' },
  'ZCP 1':{ den:'Zonă Construită Protejată 1',     col:'#C4B5FD', cat:'PATRIM',  pot:35, cut:1.0, rh:'conform aviz MCID' },
  'ZCP 2':{ den:'Zonă Construită Protejată 2',     col:'#A78BFA', cat:'PATRIM',  pot:35, cut:1.0, rh:'conform aviz MCID' },
  'ZCP 3':{ den:'Zonă Construită Protejată 3',     col:'#8B5CF6', cat:'PATRIM',  pot:35, cut:1.0, rh:'conform aviz MCID' },
  'ZCP 4':{ den:'Zonă Construită Protejată 4',     col:'#7C3AED', cat:'PATRIM',  pot:35, cut:1.0, rh:'conform aviz MCID' },
  'ZCP 5':{ den:'Zonă Construită Protejată 5',     col:'#6D28D9', cat:'PATRIM',  pot:35, cut:1.0, rh:'conform aviz MCID' },
  'ZCP6': { den:'Zonă Construită Protejată 6',     col:'#5B21B6', cat:'PATRIM',  pot:35, cut:1.0, rh:'conform aviz MCID' },
};

G._PUGSuceava = {

  SOURCE_ID: 'pug-sv-src',
  LAYER_FILL: 'pug-sv-fill',
  LAYER_LINE: 'pug-sv-line',
  LAYER_LABEL:'pug-sv-label',
  _active: false,
  _loaded: false,
  _geojson: null,

  meta: PUG_META,
  legend: UTR_LEGEND,

  // Incarca GeoJSON si afiseaza pe harta
  async load(map) {
    if(!map) { console.warn('[PUGSuceava] map null'); return; }

    window.ss?.('⏳ Se încarcă PUG Suceava (713 UTR-uri)…');

    try {
      // Incarca GeoJSON din acelasi server (GitHub Pages)
      const url = 'js/pug_suceava_wgs84.geojson';
      const res = await fetch(url);
      if(!res.ok) throw new Error(`HTTP ${res.status} — ${url}`);
      this._geojson = await res.json();
      this._initLayers(map);
      window.ss?.('✅ PUG Suceava: ' + this._geojson.features.length + ' UTR-uri pe hartă');
    } catch(e) {
      console.warn('[PUGSuceava] fetch failed, using inline data:', e.message);
      window.ss?.('⚠️ PUG Suceava: ' + e.message.slice(0,60));
    }
  },

  // Initializeaza layerele Mapbox
  _initLayers(map) {
    if(!this._geojson?.features?.length) return;

    // Adaugam UTR metadata in properties daca lipseste
    this._geojson.features.forEach(ft => {
      const utr = ft.properties.utr || '';
      const info = UTR_LEGEND[utr] || {};
      ft.properties.denumire = ft.properties.denumire || info.den || utr;
      ft.properties.culoare  = ft.properties.culoare  || info.col || '#CBD5E1';
      ft.properties.pot      = info.pot || 0;
      ft.properties.cut      = info.cut || 0;
      ft.properties.rh       = info.rh  || '—';
      ft.properties.categorie= info.cat || '—';
    });

    try {
      if(map.getSource(this.SOURCE_ID)) {
        map.getSource(this.SOURCE_ID).setData(this._geojson);
      } else {
        map.addSource(this.SOURCE_ID, {
          type: 'geojson',
          data: this._geojson,
        });

        // Fill layer — culori din properties
        map.addLayer({
          id: this.LAYER_FILL,
          type: 'fill',
          source: this.SOURCE_ID,
          layout: { visibility: 'visible' },
          paint: {
            'fill-color': ['coalesce', ['get','culoare'], '#CBD5E1'],
            'fill-opacity': [
              'interpolate', ['linear'], ['zoom'],
              10, 0.6,
              14, 0.45,
              17, 0.30,
            ],
          }
        });

        // Outline layer
        map.addLayer({
          id: this.LAYER_LINE,
          type: 'line',
          source: this.SOURCE_ID,
          layout: { visibility: 'visible' },
          paint: {
            'line-color': 'rgba(30,30,60,0.7)',
            'line-width': [
              'interpolate', ['linear'], ['zoom'],
              10, 0.3,
              13, 0.8,
              16, 1.5,
            ],
          }
        });

        // Click popup
        map.on('click', this.LAYER_FILL, e => {
          const p = e.features?.[0]?.properties;
          if(!p) return;
          const col = p.culoare || '#94a3b8';
          const isProtejat = (p.utr||'').includes('ZCP');

          new mapboxgl.Popup({ maxWidth:'320px' })
            .setLngLat(e.lngLat)
            .setHTML(`
              <div style="font:11px/1.6 'Courier New',monospace;color:#1e293b;padding:8px">
                <div style="background:${col};color:${_contrastColor(col)};
                  font-weight:700;font-size:13px;padding:4px 8px;border-radius:4px;
                  margin-bottom:8px;display:inline-block">
                  UTR ${p.utr}
                </div>
                <div style="font-weight:600;margin-bottom:6px;color:#1e293b">
                  ${p.denumire}
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;font-size:10px">
                  ${p.pot?`<div><span style="color:#64748b">POT max:</span> <b>${p.pot}%</b></div>`:''}
                  ${p.cut?`<div><span style="color:#64748b">CUT max:</span> <b>${p.cut}</b></div>`:''}
                  ${p.rh&&p.rh!=='—'?`<div style="grid-column:span 2"><span style="color:#64748b">RH:</span> <b>${p.rh}</b></div>`:''}
                </div>
                ${isProtejat ? `
                  <div style="background:#ede9fe;border:1px solid #7c3aed;border-radius:4px;
                    padding:4px 8px;margin-top:6px;font-size:9px;color:#5b21b6">
                    ⚠️ Zonă construită protejată — aviz MCID/CNMI obligatoriu
                    (Legea 422/2001)
                  </div>
                ` : ''}
                <div style="color:#94a3b8;font-size:8px;margin-top:6px;
                  border-top:1px solid #e2e8f0;padding-top:4px">
                  ${p.sursa || 'PUG Suceava'}
                </div>
              </div>
            `)
            .addTo(map);
        });

        map.on('mouseenter', this.LAYER_FILL, () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', this.LAYER_FILL, () => {
          map.getCanvas().style.cursor = '';
        });
      }

      this._loaded = true;
      this._active = true;

      // Zoom la Suceava daca suntem departe
      const center = map.getCenter();
      if(Math.abs(center.lat - PUG_META.centru[1]) > 0.5) {
        map.flyTo({
          center: PUG_META.centru,
          zoom: 13,
          duration: 2000,
        });
      }

    } catch(e) {
      console.error('[PUGSuceava layers]', e.message);
    }
  },

  toggle(map) {
    this._active = !this._active;
    const vis = this._active ? 'visible' : 'none';
    [this.LAYER_FILL, this.LAYER_LINE].forEach(l => {
      try { if(map?.getLayer(l)) map.setLayoutProperty(l, 'visibility', vis); }
      catch(e) {}
    });
    window.ss?.((this._active ? '✅' : '⏸') + ' PUG Suceava ' + (this._active ? 'vizibil' : 'ascuns'));
  },

  // Statistica rapida
  stats() {
    if(!this._geojson) return null;
    const dist = {};
    this._geojson.features.forEach(f => {
      const u = f.properties.utr;
      dist[u] = (dist[u]||0)+1;
    });
    return {
      total: this._geojson.features.length,
      utr_unice: Object.keys(dist).length,
      distributie: dist,
    };
  },

  // Cauta UTR la coordonate
  queryPoint(lat, lon) {
    if(!this._geojson) return null;
    // Point-in-polygon simplu — pentru productie folosim turf.js
    if(window.turf) {
      const pt = turf.point([lon, lat]);
      const results = [];
      this._geojson.features.forEach(f => {
        try {
          if(turf.booleanPointInPolygon(pt, f)) {
            results.push(f.properties);
          }
        } catch(e) {}
      });
      return results;
    }
    return null;
  },

  // Render legenda compacta
  renderLegend() {
    const cats = {};
    Object.entries(UTR_LEGEND).forEach(([utr, info]) => {
      if(!cats[info.cat]) cats[info.cat] = [];
      cats[info.cat].push({ utr, ...info });
    });

    const catLabels = {
      LOCUIRE:'🏠 Locuire', MIXT:'🏢 Mixt', CENTRU:'🏛 Centru/Comercial',
      INST:'🏫 Instituții', GOSP:'⚙️ Gospodărie', SERV:'💼 Servicii',
      TRANSP:'🚌 Transport', VERDE:'🌳 Spații Verzi', AGRIC:'🌾 Agricol',
      PATRIM:'🏰 Patrimoniu',
    };

    return `
      <div style="font-family:'Courier New',monospace;font-size:9px;
        background:rgba(255,255,255,.95);border-radius:8px;padding:10px;
        max-height:400px;overflow-y:auto;min-width:220px">
        <div style="font-weight:700;font-size:11px;margin-bottom:8px;color:#1e293b">
          Legendă PUG Suceava · ${PUG_META.nr_utr} UTR-uri
        </div>
        ${Object.entries(cats).map(([cat, items]) => `
          <div style="margin-bottom:6px">
            <div style="color:#475569;font-size:8px;font-weight:700;margin-bottom:3px">
              ${catLabels[cat]||cat}
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:3px">
              ${items.map(it => `
                <div style="display:flex;align-items:center;gap:3px;
                  background:#f8fafc;border-radius:3px;padding:1px 4px">
                  <div style="width:10px;height:10px;background:${it.col};
                    border-radius:2px;border:1px solid rgba(0,0,0,.1);flex-shrink:0"></div>
                  <span style="color:#1e293b;font-size:8px">${it.utr}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
        <div style="color:#94a3b8;font-size:7px;margin-top:6px;
          border-top:1px solid #e2e8f0;padding-top:4px">
          Sursă: ${PUG_META.sursa}<br>
          Proiecție: ${PUG_META.proiectie_orig} → ${PUG_META.proiectie_web}
        </div>
      </div>
    `;
  },
};

// Contrast color helper
function _contrastColor(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return (r*299+g*587+b*114)/1000 > 128 ? '#1e293b' : '#ffffff';
}

// Expune global
window._PUGSuceava = G._PUGSuceava;

// Buton in meniu — se inregistreaza automat
window._launchPUGSuceava = async function() {
  const map = window.map || window._map;
  if(!map) { window.ss?.('⚠️ Harta nu e pregătită'); return; }
  
  if(window._PUGSuceava._loaded) {
    window._PUGSuceava.toggle(map);
    return;
  }
  
  // Prima data — schimbam UAT pe Suceava si incarcam
  if(window.TCI?._loadCity && window._RO_CITIES_DB?.['RO-SV-01']) {
    window.TCI._loadCity('RO-SV-01');
  }
  
  await window._PUGSuceava.load(map);
  
  // Afisam legenda
  let leg = document.getElementById('pug-sv-legend');
  if(!leg) {
    leg = document.createElement('div');
    leg.id = 'pug-sv-legend';
    leg.style.cssText = `
      position:fixed; bottom:80px; right:20px; z-index:8000;
      box-shadow:0 4px 20px rgba(0,0,0,.3);
    `;
    leg.innerHTML = window._PUGSuceava.renderLegend();
    // Buton close
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
      position:absolute;top:6px;right:6px;background:none;border:none;
      cursor:pointer;color:#64748b;font-size:12px;
    `;
    closeBtn.onclick = () => leg.remove();
    leg.firstElementChild.appendChild(closeBtn);
    document.body.appendChild(leg);
  } else {
    leg.remove();
  }
};

console.log('[UrbanX] PUG Suceava v1.0: 713 UTR-uri · 42 categorii · Stereo70→WGS84');
})(window);
