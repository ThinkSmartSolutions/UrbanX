// ═══════════════════════════════════════════════════════════════════════════
// URBANX — SISTEM SALVARE PROIECTE
// IndexedDB — local, offline-first + export/import
// ═══════════════════════════════════════════════════════════════════════════

const _ProjectsManager = {
  DB_NAME:    'UrbanX_Projects',
  DB_VERSION: 1,
  db:         null,

  // ── Initializare DB ────────────────────────────────────────────────────
  async init() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(this.DB_NAME, this.DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if(!db.objectStoreNames.contains('projects')) {
          const store = db.createObjectStore('projects', { keyPath: 'id' });
          store.createIndex('created', 'created');
          store.createIndex('utr', 'utr');
        }
        if(!db.objectStoreNames.contains('snapshots')) {
          db.createObjectStore('snapshots', { keyPath: 'projectId' });
        }
      };
      req.onsuccess = (e) => { this.db = e.target.result; resolve(); };
      req.onerror   = () => reject(req.error);
    });
  },

  // ── Construieste obiectul proiect din starea curenta ──────────────────
  buildCurrentProject() {
    const ap = window.S?.parcels?.[S.activeParcel??0];
    if(!ap) return null;

    return {
      id:       'PRJ-' + Date.now(),
      version:  '3.2.0',
      created:  new Date().toISOString(),
      modified: new Date().toISOString(),
      author:   { email: _USER.email||'', package: _USER.pkg?.id||'professional' },

      // Date parcelă
      parcel: {
        nrCad:   ap.nrCad  || ap.nrCad,
        utr:     ap.utr,
        area:    ap.area,
        lat:     ap.lat,
        lon:     ap.lon,
        uat:     ap.uat    || 'Municipiul Iași',
        judet:   ap.judet  || 'Iași',
        geo:     ap.geo,
        params:  ap.params || {},
      },

      // Configuratie AEDIS
      aedis: window.AEDIS ? JSON.parse(JSON.stringify(AEDIS)) : null,

      // Metadata
      thumbnail: null, // se seteaza separat din canvas 3D
      notes: '',
      tags: [],

      // Studii generate in sesiune (referinte)
      studies_generated: window._generatedStudies || [],

      // Viewport harta
      map_state: window.map ? {
        center: map.getCenter(),
        zoom:   map.getZoom(),
        bearing: map.getBearing(),
        pitch:  map.getPitch(),
      } : null,

      // Stare proiectie urbana
      projection_state: window._ProjectionEngine ? {
        year:     _ProjectionEngine.currentYear,
        scenario: _ProjectionEngine.currentScenario,
      } : null,
    };
  },

  // ── Salveaza proiectul curent ──────────────────────────────────────────
  async saveCurrentProject(name) {
    if(!this.db) await this.init();
    const project = this.buildCurrentProject();
    if(!project) { ss('⚠️ Selectați o parcelă pentru a salva proiectul.'); return; }

    // Snapshot 3D (captura canvas)
    try {
      const canvas = document.querySelector('#viewer3d-container canvas') ||
                     document.querySelector('canvas.mapboxgl-canvas');
      if(canvas) project.thumbnail = canvas.toDataURL('image/jpeg', 0.6);
    } catch(e) {}

    if(name) project.name = name;
    else project.name = 'Proiect ' + (project.parcel.nrCad || new Date().toLocaleDateString('ro-RO'));

    const tx = this.db.transaction(['projects'], 'readwrite');
    tx.objectStore('projects').put(project);

    await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = rej; });

    ss('✅ Proiect salvat: ' + project.name);
    this.renderList();
    return project.id;
  },

  // ── Incarca un proiect ────────────────────────────────────────────────
  async loadProject(projectId) {
    if(!this.db) await this.init();
    const tx = this.db.transaction(['projects'], 'readonly');
    const req = tx.objectStore('projects').get(projectId);

    const project = await new Promise((res, rej) => {
      req.onsuccess = () => res(req.result);
      req.onerror   = rej;
    });
    if(!project) { ss('⚠️ Proiectul nu a fost găsit.'); return; }

    // Restaureaza parcela
    if(project.geo && window.map) {
      // Simuleaza click pe parcela
      if(typeof loadParcelByGeo === 'function') {
        loadParcelByGeo(project.parcel);
      }
    }

    // Restaureaza AEDIS
    if(project.aedis && window.AEDIS) {
      Object.assign(AEDIS, project.aedis);
    }

    // Restaureaza viewport harta
    if(project.map_state && window.map) {
      map.flyTo({
        center: project.map_state.center,
        zoom:   project.map_state.zoom,
        bearing: project.map_state.bearing,
        pitch:  project.map_state.pitch,
        duration: 1500,
      });
    }

    // Restaureaza proiectia
    if(project.projection_state && window._ProjectionEngine) {
      _ProjectionEngine.setYear(project.projection_state.year||2025);
      _ProjectionEngine.setScenario(project.projection_state.scenario||'S2');
    }

    ss('✅ Proiect încărcat: ' + project.name);
    _WorkspaceManager.activateModule('discover');
    return project;
  },

  // ── Lista proiecte ─────────────────────────────────────────────────────
  async getAll() {
    if(!this.db) await this.init();
    const tx = this.db.transaction(['projects'], 'readonly');
    const req = tx.objectStore('projects').getAll();
    return new Promise((res, rej) => {
      req.onsuccess = () => res(req.result||[]);
      req.onerror   = rej;
    });
  },

  async renderList() {
    const container = document.getElementById('wx-projects-list');
    if(!container) return;

    const projects = await this.getAll();
    if(!projects.length) {
      container.innerHTML = `<div style="font-size:10px;color:#4A6080;text-align:center;padding:12px">
        Niciun proiect salvat.<br>Selectați o parcelă și apăsați Salvează.
      </div>`;
      return;
    }

    container.innerHTML = projects
      .sort((a,b) => new Date(b.modified) - new Date(a.modified))
      .map(p => `
        <div class="wx-project-card" onclick="_ProjectsManager.loadProject('${p.id}')">
          ${p.thumbnail ? `<div class="wx-proj-thumb"><img src="${p.thumbnail}" style="width:100%;height:50px;object-fit:cover;border-radius:4px"></div>` : ''}
          <div class="wx-proj-info">
            <div class="wx-proj-name">${p.name||'Proiect'}</div>
            <div class="wx-proj-meta">${p.parcel?.nrCad||'—'} · ${p.parcel?.utr||'—'} · ${p.parcel?.area||'—'}mp</div>
            <div class="wx-proj-date">${new Date(p.modified).toLocaleDateString('ro-RO')}</div>
          </div>
          <div class="wx-proj-actions">
            <button onclick="event.stopPropagation();_ProjectsManager.loadProject('${p.id}')" title="Deschide">▶</button>
            <button onclick="event.stopPropagation();_ProjectsManager.deleteProject('${p.id}')" title="Șterge">🗑</button>
          </div>
        </div>
      `).join('');
  },

  async deleteProject(id) {
    if(!confirm('Ștergi proiectul?')) return;
    const tx = this.db.transaction(['projects'], 'readwrite');
    tx.objectStore('projects').delete(id);
    await new Promise(res => { tx.oncomplete = res; });
    this.renderList();
  },

  // ── Export / Import ────────────────────────────────────────────────────
  async exportGeoJSON() {
    const ap = window.S?.parcels?.[S.activeParcel??0];
    if(!ap?.geo) { ss('Selectați o parcelă.'); return; }
    const gj = JSON.stringify(ap.geo, null, 2);
    _downloadText(gj, 'parcela_' + (ap.nrCad||'export') + '.geojson', 'application/json');
  },

  async exportJSON() {
    const project = this.buildCurrentProject();
    if(!project) { ss('Selectați o parcelă.'); return; }
    _downloadText(JSON.stringify(project, null, 2), project.name+'.json', 'application/json');
  },

  exportPDF() { /* delegat catre studii */ },
};

function _downloadText(text, filename, mime) {
  const blob = new Blob([text], {type: mime||'text/plain'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1000);
}

// Track studii generate in sesiune
window._generatedStudies = [];
const _origSaveMobile = window._pdfSaveMobile;

// Auto-init
window.addEventListener('load', () => {
  setTimeout(() => _ProjectsManager.init(), 800);
});

