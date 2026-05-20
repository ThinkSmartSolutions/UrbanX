// ═══════════════════════════════════════════════════════════════════════════
// tci-pug-import.js — UrbanX TSS·FG
// Import PUG digital — GeoJSON/Shapefile → UTR-uri pe hartă
// Urbanistul cu PUG aprobat poate importa zonificarea lui în UrbanX
// Corelare automată cu reglementările și proiecțiile platformei
// ═══════════════════════════════════════════════════════════════════════════
(function(G){
'use strict';

G._PUGImport = {

  SOURCE_ID: 'pug-utr-src',
  LAYER_FILL: 'pug-utr-fill',
  LAYER_LINE: 'pug-utr-line',
  LAYER_LABEL:'pug-utr-label',

  _data: null,
  _active: false,

  // Categorii UTR standard conform HG 525/1996 + Ord. 233/2016
  UTR_CATEGORIES: {
    // Rezidential
    'L1':'Locuire de mică densitate (P-P+2)',
    'L2':'Locuire de densitate medie (P+3—P+5)',
    'L3':'Locuire de înaltă densitate (P+6+)',
    'LS':'Locuire specială',
    // Mixt
    'M1':'Mixt rezidential-terțiar',
    'M2':'Mixt comercial-servicii',
    // Comercial
    'C1':'Centru civic · Comercial intensiv',
    'C2':'Comercial de proximitate',
    // Economic
    'IS':'Industrial și depozitare',
    'IP':'Parc industrial/tehnologic',
    // Institutii
    'IE':'Instituții educație',
    'IS2':'Instituții sănătate',
    'IA':'Instituții administrative',
    // Verde
    'V1':'Spații verzi parcuri',
    'V2':'Spații verzi sport-agrement',
    'VN':'Zonă naturală protejată',
    // Mobilitate
    'C3':'Căi comunicație',
    'GC':'Gospodărie comunală',
    // Restrictii
    'ZP':'Zonă protejată patrimoniu',
    'ZR':'Zonă risc natural',
  },

  // Culori standard per categorie UTR (conform practica romaneasca)
  UTR_COLORS: {
    L1:'#FDE68A', L2:'#FCD34D', L3:'#F59E0B', LS:'#FBBF24',
    M1:'#FCA5A1', M2:'#F87171',
    C1:'#F97316', C2:'#FB923C',
    IS:'#6B7280', IP:'#9CA3AF',
    IE:'#86EFAC', IS2:'#34D399', IA:'#A7F3D0',
    V1:'#16A34A', V2:'#22C55E', VN:'#15803D',
    C3:'#94A3B8', GC:'#64748B',
    ZP:'#C4B5FD', ZR:'#FCA5A5',
    DEFAULT:'#CBD5E1',
  },

  // Afiseaza interfata de import
  showImportDialog() {
    const existing = document.getElementById('pug-import-dialog');
    if(existing) { existing.remove(); return; }

    const dialog = document.createElement('div');
    dialog.id = 'pug-import-dialog';
    dialog.style.cssText = `
      position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
      width:min(480px,95vw);max-height:80vh;overflow-y:auto;
      background:rgba(6,12,36,.98);border:1px solid rgba(212,175,55,.4);
      border-radius:14px;z-index:9500;padding:0;
      font-family:'Courier New',monospace;box-shadow:0 20px 60px rgba(0,0,0,.8);
    `;

    dialog.innerHTML = `
      <div style="padding:16px 20px;border-bottom:1px solid rgba(30,58,138,.4);
        display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="color:#D4AF37;font-weight:700;font-size:14px">📐 Import PUG Digital</div>
          <div style="color:#64748b;font-size:10px">GeoJSON · Shapefile · UTR-uri · Regulament</div>
        </div>
        <button onclick="document.getElementById('pug-import-dialog').remove()"
          style="background:none;border:none;color:#64748b;cursor:pointer;font-size:18px">✕</button>
      </div>

      <div style="padding:20px;display:flex;flex-direction:column;gap:14px">

        <!-- Drop zone -->
        <div id="pug-drop-zone"
          ondragover="event.preventDefault();this.style.borderColor='#D4AF37'"
          ondragleave="this.style.borderColor='rgba(59,130,246,.4)'"
          ondrop="window._PUGImport._handleDrop(event)"
          style="border:2px dashed rgba(59,130,246,.4);border-radius:10px;padding:28px;
            text-align:center;cursor:pointer;transition:border-color .2s"
          onclick="document.getElementById('pug-file-input').click()">
          <div style="font-size:32px;margin-bottom:8px">📂</div>
          <div style="color:#c8d7f0;font-size:13px;font-weight:700">Trage fișierul aici sau click</div>
          <div style="color:#64748b;font-size:11px;margin-top:4px">GeoJSON, ZIP (Shapefile), KML</div>
          <input type="file" id="pug-file-input" accept=".geojson,.json,.zip,.kml"
            style="display:none" onchange="window._PUGImport._handleFile(this.files[0])">
        </div>

        <!-- Import manual UTR-uri -->
        <div>
          <div style="color:#94a3b8;font-size:11px;font-weight:700;margin-bottom:8px">
            SAU IMPORTĂ UTR-URI MANUAL
          </div>
          <div style="display:flex;flex-direction:column;gap:6px">
            <textarea id="pug-json-input" placeholder='{"type":"FeatureCollection","features":[...]}'
              style="background:rgba(8,14,38,.8);border:1px solid rgba(30,58,138,.4);
                border-radius:8px;color:#c8d7f0;font-size:10px;padding:10px;
                font-family:'Courier New',monospace;resize:vertical;min-height:80px;
                width:100%;box-sizing:border-box"></textarea>
            <button onclick="window._PUGImport._importJSON()"
              style="background:rgba(59,130,246,.15);border:1px solid rgba(59,130,246,.4);
                color:#60a5fa;padding:8px;border-radius:6px;cursor:pointer;font-size:11px">
              📥 Importă GeoJSON
            </button>
          </div>
        </div>

        <!-- Tipuri UTR acceptate -->
        <div>
          <div style="color:#94a3b8;font-size:11px;font-weight:700;margin-bottom:8px">
            STRUCTURA GEOJSON AȘTEPTATĂ
          </div>
          <div style="background:rgba(8,14,38,.8);border-radius:6px;padding:10px;font-size:9px;color:#64748b">
<pre style="margin:0;overflow-x:auto">{
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "geometry": { "type": "Polygon", ... },
    "properties": {
      "UTR": "L2",           // cod UTR
      "DENUMIRE": "Locuire medie", 
      "POT": 50,             // %
      "CUT": 1.8,
      "RH": "P+4—P+6",
      "FUNCTIUNE": "Rezidential"
    }
  }]
}</pre>
          </div>
        </div>

        <!-- Format Shapefile -->
        <div style="background:rgba(245,158,11,.06);border:1px solid rgba(245,158,11,.2);
          border-radius:8px;padding:10px">
          <div style="color:#f59e0b;font-size:10px;font-weight:700;margin-bottom:4px">
            ⚠️ Shapefile — Cerințe
          </div>
          <div style="color:#92400e;font-size:9px;line-height:1.6">
            ZIP cu: .shp + .shx + .dbf + .prj (EPSG:4326 sau EPSG:3857)<br>
            Câmpuri obligatorii: UTR sau TIP_ZONA, POT, CUT<br>
            Câmpuri opționale: RH, FUNCTIUNE, SUPRAFATA, ADRESA_ACT
          </div>
        </div>

        <!-- Exemple UTR -->
        <div>
          <div style="color:#94a3b8;font-size:11px;font-weight:700;margin-bottom:6px">
            CATEGORII UTR SUPORTATE (HG 525/1996 + Ord. 233/2016)
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:4px">
            ${Object.entries(this.UTR_CATEGORIES).map(([cod,desc])=>`
              <span style="background:${this.UTR_COLORS[cod]||'#334155'}22;
                border:1px solid ${this.UTR_COLORS[cod]||'#334155'}44;
                color:${this.UTR_COLORS[cod]||'#94a3b8'};
                font-size:8px;padding:2px 6px;border-radius:4px" title="${desc}">
                ${cod}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Rezultate import (vizibil dupa import) -->
        <div id="pug-import-results" style="display:none"></div>

      </div>
    `;

    document.body.appendChild(dialog);
  },

  _handleDrop(event) {
    event.preventDefault();
    document.getElementById('pug-drop-zone').style.borderColor='rgba(59,130,246,.4)';
    const file = event.dataTransfer.files[0];
    if(file) this._handleFile(file);
  },

  _handleFile(file) {
    if(!file) return;
    window.ss?.('⏳ Se procesează: '+file.name);

    if(file.name.endsWith('.geojson') || file.name.endsWith('.json')) {
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const data = JSON.parse(e.target.result);
          this._processGeoJSON(data, file.name);
        } catch(err) {
          window.ss?.('❌ GeoJSON invalid: '+err.message.slice(0,60));
        }
      };
      reader.readAsText(file);
    } else if(file.name.endsWith('.zip')) {
      window.ss?.('⚠️ Shapefile: necesită ShapefileLoader — în curs de implementare');
      this._showShapefileNote();
    } else if(file.name.endsWith('.kml')) {
      const reader = new FileReader();
      reader.onload = e => this._processKML(e.target.result, file.name);
      reader.readAsText(file);
    }
  },

  _importJSON() {
    const txt = document.getElementById('pug-json-input')?.value?.trim();
    if(!txt) { window.ss?.('⚠️ Lipsa date GeoJSON'); return; }
    try {
      const data = JSON.parse(txt);
      this._processGeoJSON(data, 'import-manual.geojson');
    } catch(e) {
      window.ss?.('❌ JSON invalid: '+e.message.slice(0,60));
    }
  },

  _processGeoJSON(data, filename) {
    if(!data?.features?.length) {
      window.ss?.('❌ GeoJSON fără features valide'); return;
    }

    // Normalizare properties
    const normalized = {
      type: 'FeatureCollection',
      features: data.features.map((f, i) => {
        const p = f.properties||{};
        const utrCode = p.UTR || p.TIP_ZONA || p.tip_zona || p.COD_UTR || 'DEFAULT';
        return {
          ...f,
          properties: {
            utr: utrCode.toUpperCase(),
            denumire: p.DENUMIRE || p.denumire || this.UTR_CATEGORIES[utrCode.toUpperCase()] || utrCode,
            pot: +(p.POT||p.pot||0),
            cut: +(p.CUT||p.cut||0),
            rh: p.RH||p.rh||'—',
            functiune: p.FUNCTIUNE||p.functiune||'—',
            suprafata: +(p.SUPRAFATA||p.suprafata||0),
            sursa: filename,
            idx: i,
          }
        };
      })
    };

    this._data = normalized;
    this._showOnMap(normalized);
    this._showImportResults(normalized, filename);
  },

  _processKML(kmlText, filename) {
    // Parser KML simplu - extrage Placemarks cu Polygon
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(kmlText, 'text/xml');
      const placemarks = doc.querySelectorAll('Placemark');
      const features = [];
      placemarks.forEach(pm => {
        const name = pm.querySelector('name')?.textContent || '';
        const coords = pm.querySelector('coordinates')?.textContent?.trim();
        if(!coords) return;
        const pts = coords.split('\n').map(c=>{
          const [lon,lat]=c.trim().split(',');
          return [+lon,+lat];
        }).filter(p=>p[0]&&p[1]);
        if(pts.length<3) return;
        features.push({
          type:'Feature',
          geometry:{type:'Polygon',coordinates:[pts]},
          properties:{UTR:'DEFAULT',DENUMIRE:name}
        });
      });
      if(features.length>0) this._processGeoJSON({type:'FeatureCollection',features}, filename);
      else window.ss?.('⚠️ Niciun polygon valid în KML');
    } catch(e) { window.ss?.('❌ KML invalid: '+e.message.slice(0,40)); }
  },

  _showOnMap(geojson) {
    const map = window.map || window._map;
    if(!map) { window.ss?.('⚠️ Harta nu e pregătită'); return; }

    try {
      if(!map.getSource(this.SOURCE_ID)) {
        map.addSource(this.SOURCE_ID, {type:'geojson', data:geojson});

        map.addLayer({
          id: this.LAYER_FILL, type:'fill', source:this.SOURCE_ID,
          paint: {
            'fill-color': [
              'match', ['get','utr'],
              ...Object.entries(this.UTR_COLORS).flatMap(([k,v])=>[k,v]),
              '#CBD5E1'
            ],
            'fill-opacity': 0.55,
          }
        });

        map.addLayer({
          id: this.LAYER_LINE, type:'line', source:this.SOURCE_ID,
          paint: { 'line-color':'rgba(255,255,255,.4)', 'line-width':1 }
        });

        map.on('click', this.LAYER_FILL, e=>{
          const p = e.features?.[0]?.properties;
          if(!p) return;
          const col = this.UTR_COLORS[p.utr]||'#94a3b8';
          // Calculam scorul de conformitate cu proiectiile UrbanX
          const zoneData = window._ZoneEngine?._cache?.[window.TCI?.cityKey];
          const matchingZone = zoneData?.zones?.find(z=>
            Math.abs(z.lat-e.lngLat.lat)<0.01 && Math.abs(z.lon-e.lngLat.lng)<0.01
          );
          new mapboxgl.Popup({maxWidth:'320px'})
            .setLngLat(e.lngLat)
            .setHTML(`<div style="font:11px/1.6 'Courier New',monospace;color:#c8d7f0;padding:8px">
              <div style="color:${col};font-weight:700;font-size:13px">UTR: ${p.utr}</div>
              <div style="color:#94a3b8;margin-bottom:6px">${p.denumire}</div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">
                ${p.pot?`<div><span style="color:#64748b">POT max:</span> <b>${p.pot}%</b></div>`:''}
                ${p.cut?`<div><span style="color:#64748b">CUT max:</span> <b>${p.cut}</b></div>`:''}
                ${p.rh!=='—'?`<div><span style="color:#64748b">RH:</span> <b>${p.rh}</b></div>`:''}
                ${p.functiune!=='—'?`<div><span style="color:#64748b">Funcț.:</span> <b>${p.functiune.slice(0,20)}</b></div>`:''}
              </div>
              ${matchingZone?`
                <div style="margin-top:6px;padding:4px 6px;background:rgba(212,175,55,.08);border-radius:4px;border:1px solid rgba(212,175,55,.2)">
                  <span style="color:#D4AF37;font-size:9px">UrbanX propune: ${matchingZone.rh_propus||'—'} · ${matchingZone.intervention||'—'}</span>
                </div>
              `:''}
              <div style="color:#475569;font-size:9px;margin-top:6px">Sursă: ${p.sursa}</div>
            </div>`)
            .addTo(map);
        });

        map.on('mouseenter', this.LAYER_FILL, ()=>{map.getCanvas().style.cursor='pointer';});
        map.on('mouseleave', this.LAYER_FILL, ()=>{map.getCanvas().style.cursor='';});

      } else {
        map.getSource(this.SOURCE_ID).setData(geojson);
      }

      this._active = true;
      window.ss?.(`✅ PUG importat: ${geojson.features.length} UTR-uri pe hartă`);

      // Fit map la extent
      if(geojson.features[0]?.geometry?.coordinates?.[0]?.[0]) {
        const allCoords = geojson.features.flatMap(f=>f.geometry.coordinates?.[0]||[]);
        if(allCoords.length>1) {
          const lons=allCoords.map(c=>c[0]), lats=allCoords.map(c=>c[1]);
          map.fitBounds([[Math.min(...lons),Math.min(...lats)],[Math.max(...lons),Math.max(...lats)]],
            {padding:40,duration:1000});
        }
      }
    } catch(e) { console.warn('[PUGImport map]', e.message); }
  },

  _showImportResults(data, filename) {
    const el = document.getElementById('pug-import-results');
    if(!el) return;

    const byUTR = {};
    data.features.forEach(f=>{
      const u=f.properties.utr||'?';
      byUTR[u]=(byUTR[u]||0)+1;
    });

    el.style.display='block';
    el.innerHTML = `
      <div style="background:rgba(34,197,94,.06);border:1px solid rgba(34,197,94,.2);
        border-radius:8px;padding:12px">
        <div style="color:#22c55e;font-weight:700;font-size:11px;margin-bottom:8px">
          ✅ Import reușit: ${data.features.length} UTR-uri din "${filename}"
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px">
          ${Object.entries(byUTR).map(([utr,count])=>`
            <span style="background:${(this.UTR_COLORS[utr]||'#334155')}22;
              border:1px solid ${(this.UTR_COLORS[utr]||'#334155')}44;
              color:${this.UTR_COLORS[utr]||'#94a3b8'};
              font-size:9px;padding:2px 8px;border-radius:12px">
              ${utr}: ${count}
            </span>
          `).join('')}
        </div>
        <div style="display:flex;gap:6px">
          <button onclick="window._PUGImport.compareWithUrbanX()"
            style="flex:1;background:rgba(212,175,55,.15);border:1px solid rgba(212,175,55,.3);
              color:#D4AF37;padding:6px;border-radius:6px;cursor:pointer;font-size:10px">
            🔄 Compară cu UrbanX
          </button>
          <button onclick="document.getElementById('pug-import-dialog').remove()"
            style="background:rgba(59,130,246,.15);border:1px solid rgba(59,130,246,.3);
              color:#60a5fa;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:10px">
            ✓ Gata
          </button>
        </div>
      </div>
    `;
  },

  _showShapefileNote() {
    window.ss?.('Shapefile: ZIP cu .shp+.shx+.dbf+.prj. Convertire la GeoJSON: ogr2ogr -f GeoJSON out.geojson in.shp');
  },

  // Compara UTR-urile importate cu propunerile UrbanX
  compareWithUrbanX() {
    if(!this._data) { window.ss?.('⚠️ Importați mai întâi un PUG'); return; }
    const k = window.TCI?.cityKey||localStorage.getItem('ux_last_city')||'RO-IS-01';
    const zoneData = window._ZoneEngine?._cache?.[k];
    if(!zoneData) { window.ss?.('⚠️ Rulați mai întâi analiza zonelor UrbanX'); return; }

    const diffs = [];
    this._data.features.forEach(f=>{
      const p = f.properties;
      const pot_pug = p.pot||0;
      const zones = zoneData.zones||[];
      // Gasim zona UrbanX cea mai apropiata de centrul UTR-ului
      if(!f.geometry?.coordinates?.[0]) return;
      const centroid = this._centroid(f.geometry.coordinates[0]);
      const closest = zones.sort((a,b)=>
        Math.hypot(a.lat-centroid[1],a.lon-centroid[0]) -
        Math.hypot(b.lat-centroid[1],b.lon-centroid[0])
      )[0];
      if(!closest) return;
      const pot_ux = closest.pot||0;
      const diff = pot_ux - pot_pug;
      if(Math.abs(diff)>5) {
        diffs.push({
          utr:p.utr, pug_pot:pot_pug, ux_pot:pot_ux,
          diff, zone:closest.name,
          concluzie: diff>0 ? `UrbanX recomandă densificare (+${diff}% POT)` : `UrbanX recomandă restricție (${diff}% POT)`
        });
      }
    });

    if(diffs.length===0) {
      window.ss?.('✅ Bună corelare PUG ↔ UrbanX: fără diferențe semnificative');
      return;
    }

    window.ss?.(`⚠️ ${diffs.length} diferențe PUG↔UrbanX — vezi consola`);
    console.table(diffs);

    // Afisam in popup
    const popup = document.createElement('div');
    popup.style.cssText=`position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
      width:min(460px,95vw);max-height:60vh;overflow-y:auto;
      background:rgba(6,12,36,.98);border:1px solid rgba(212,175,55,.4);
      border-radius:12px;z-index:9600;padding:16px;font-family:'Courier New',monospace`;
    popup.innerHTML=`
      <div style="display:flex;justify-content:space-between;margin-bottom:12px">
        <div style="color:#D4AF37;font-weight:700">🔄 Comparație PUG ↔ UrbanX (${diffs.length} diferențe)</div>
        <button onclick="this.parentElement.parentElement.remove()" style="background:none;border:none;color:#64748b;cursor:pointer">✕</button>
      </div>
      ${diffs.map(d=>`
        <div style="background:rgba(8,14,38,.8);border-radius:6px;padding:8px;margin-bottom:6px;
          border-left:3px solid ${d.diff>0?'#22c55e':'#f59e0b'}">
          <div style="color:${d.diff>0?'#22c55e':'#f59e0b'};font-size:10px;font-weight:700">
            UTR ${d.utr} ↔ Zona ${d.zone}
          </div>
          <div style="color:#94a3b8;font-size:9px">PUG: POT ${d.pug_pot}% · UrbanX propune: POT ${d.ux_pot}%</div>
          <div style="color:#c8d7f0;font-size:9px">${d.concluzie}</div>
        </div>
      `).join('')}
      <div style="color:#475569;font-size:8px;margin-top:8px">
        Comparație orientativă. Decizia finală aparține urbanistului atestat RUR.
      </div>
    `;
    document.body.appendChild(popup);
  },

  _centroid(coords) {
    const n=coords.length;
    return [coords.reduce((s,c)=>s+c[0],0)/n, coords.reduce((s,c)=>s+c[1],0)/n];
  },

  toggle() {
    const map = window.map||window._map;
    if(!map) return;
    this._active = !this._active;
    const vis = this._active?'visible':'none';
    [this.LAYER_FILL,this.LAYER_LINE].forEach(l=>{
      try{if(map.getLayer(l))map.setLayoutProperty(l,'visibility',vis);}catch(e){}
    });
  },
};

window._PUGImport = G._PUGImport;
window.openPUGImport = () => window._PUGImport.showImportDialog();

console.log('[UrbanX] PUG Import v1.0: GeoJSON · KML · Comparare UrbanX · Legea 350/2001');
})(window);
