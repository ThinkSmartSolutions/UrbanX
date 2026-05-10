// ═══════════════════════════════════════════════════════════════════════════
// URBANX — CLOUD SYNC ENGINE
// Supabase (PostgreSQL gratuit) + Service Worker + IndexedDB sync
// ═══════════════════════════════════════════════════════════════════════════

// ── CONFIGURARE SUPABASE ───────────────────────────────────────────────────
// Instrucțiuni setup:
// 1. Creati cont gratuit pe supabase.com
// 2. New Project → notati URL si anon key
// 3. Rulati SQL-ul din _CloudSync.setupSQL() in Supabase SQL Editor
// 4. Completati _SUPABASE_CONFIG mai jos

const _SUPABASE_CONFIG = {
  url:    localStorage.getItem('wx_supabase_url')  || 'YOUR_SUPABASE_URL',
  key:    localStorage.getItem('wx_supabase_key')  || 'YOUR_SUPABASE_ANON_KEY',
  table:  'urbanx_projects',
  configured: false, // se seteaza automat
};

_SUPABASE_CONFIG.configured =
  !_SUPABASE_CONFIG.url.includes('YOUR_') &&
  !_SUPABASE_CONFIG.key.includes('YOUR_') &&
  _SUPABASE_CONFIG.url.startsWith('https://');

// ── SQL SCHEMA (rulati in Supabase SQL Editor) ─────────────────────────────
const _CLOUD_SQL_SCHEMA = `
-- Tabel proiecte UrbanX
CREATE TABLE IF NOT EXISTS urbanx_projects (
  id           TEXT PRIMARY KEY,
  user_id      TEXT NOT NULL DEFAULT 'anonymous',
  name         TEXT NOT NULL,
  data         JSONB NOT NULL,
  thumbnail    TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW(),
  version      TEXT DEFAULT '3.2.0',
  package_tier TEXT DEFAULT 'professional'
);

-- Index pentru cautare rapida
CREATE INDEX IF NOT EXISTS idx_urbanx_user_id ON urbanx_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_urbanx_created ON urbanx_projects(created_at DESC);

-- Row Level Security (proiecte private per utilizator)
ALTER TABLE urbanx_projects ENABLE ROW LEVEL SECURITY;

-- Policy: fiecare utilizator vede doar proiectele lui
CREATE POLICY "Users see own projects" ON urbanx_projects
  FOR ALL USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub'
                 OR user_id = 'anonymous');

-- Functie pentru updated_at automat
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TRIGGER urbanx_projects_updated
  BEFORE UPDATE ON urbanx_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
`;

// ── CLOUD SYNC ENGINE ──────────────────────────────────────────────────────
const _CloudSync = {
  userId: null,
  syncQueue: [],
  isSyncing: false,

  // ── Initializare ──────────────────────────────────────────────────────────
  init() {
    // User ID persistent (anonym, bazat pe device)
    this.userId = localStorage.getItem('wx_user_id');
    if(!this.userId) {
      this.userId = 'anon_' + Date.now() + '_' + Math.random().toString(36).slice(2,9);
      localStorage.setItem('wx_user_id', this.userId);
    }

    // Inregistrare Service Worker
    this.registerSW();

    // Sync periodic (la 5 minute)
    if(_SUPABASE_CONFIG.configured) {
      setInterval(() => this.syncAll(), 5 * 60 * 1000);
    }

    console.log('[CloudSync] User ID:', this.userId,
      '| Supabase:', _SUPABASE_CONFIG.configured ? '✅ configurat' : '❌ neconfigurat');
  },

  // ── Service Worker ─────────────────────────────────────────────────────────
  async registerSW() {
    if(!('serviceWorker' in navigator)) return;
    try {
      const reg = await navigator.serviceWorker.register('./sw.js');
      console.log('[SW] Inregistrat:', reg.scope);

      // Asculta mesaje de la SW
      navigator.serviceWorker.addEventListener('message', e => {
        if(e.data?.type === 'SW_SYNC_COMPLETE') {
          console.log('[SW] Background sync complet');
          typeof _Toast !== 'undefined' && _Toast.success('Proiecte sincronizate', 2000);
        }
        if(e.data?.type === 'CACHE_STATS') {
          console.log('[SW] Cache:', e.data.static, 'static,', e.data.api, 'API');
        }
      });

      // Update disponibil
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          if(newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            typeof _Toast !== 'undefined' &&
              _Toast.info('Update UrbanX disponibil — reîncarcă pagina pentru a aplica', 8000);
          }
        });
      });
    } catch(e) {
      console.warn('[SW] Nu s-a putut înregistra:', e.message);
    }
  },

  // ── Salveaza proiect în cloud ──────────────────────────────────────────────
  async saveToCloud(project) {
    if(!_SUPABASE_CONFIG.configured) {
      console.log('[Cloud] Supabase neconfigurat — salvat local');
      return { success: false, reason: 'not_configured' };
    }

    const payload = {
      id:           project.id,
      user_id:      this.userId,
      name:         project.name || 'Proiect UrbanX',
      data:         project,
      thumbnail:    project.thumbnail || null,
      version:      '3.2.0',
      package_tier: typeof _USER !== 'undefined' ? (_USER.pkg?.id || 'professional') : 'professional',
    };

    try {
      const resp = await fetch(`${_SUPABASE_CONFIG.url}/rest/v1/${_SUPABASE_CONFIG.table}`, {
        method: 'POST',
        headers: {
          'apikey':        _SUPABASE_CONFIG.key,
          'Authorization': 'Bearer ' + _SUPABASE_CONFIG.key,
          'Content-Type':  'application/json',
          'Prefer':        'resolution=merge-duplicates',
        },
        body: JSON.stringify(payload),
      });

      if(resp.ok) {
        console.log('[Cloud] Proiect salvat:', project.name);
        typeof _Toast !== 'undefined' && _Toast.success('☁️ Salvat în cloud', 2000);
        return { success: true };
      } else {
        const err = await resp.text();
        throw new Error(err);
      }
    } catch(e) {
      console.warn('[Cloud] Eroare save:', e.message);
      // Adauga in coada pentru retry
      this.syncQueue.push({ action: 'save', project, timestamp: Date.now() });
      return { success: false, reason: e.message };
    }
  },

  // ── Incarca proiecte din cloud ─────────────────────────────────────────────
  async loadFromCloud() {
    if(!_SUPABASE_CONFIG.configured) return [];

    try {
      const resp = await fetch(
        `${_SUPABASE_CONFIG.url}/rest/v1/${_SUPABASE_CONFIG.table}` +
        `?user_id=eq.${encodeURIComponent(this.userId)}&order=updated_at.desc&limit=50`,
        {
          headers: {
            'apikey':        _SUPABASE_CONFIG.key,
            'Authorization': 'Bearer ' + _SUPABASE_CONFIG.key,
            'Accept':        'application/json',
          },
        }
      );

      if(!resp.ok) throw new Error(await resp.text());
      const projects = await resp.json();
      console.log('[Cloud] Proiecte incarcate:', projects.length);
      return projects.map(p => ({ ...p.data, cloud_id: p.id, cloud_updated: p.updated_at }));
    } catch(e) {
      console.warn('[Cloud] Eroare load:', e.message);
      return [];
    }
  },

  // ── Sterge proiect din cloud ───────────────────────────────────────────────
  async deleteFromCloud(projectId) {
    if(!_SUPABASE_CONFIG.configured) return;
    try {
      await fetch(
        `${_SUPABASE_CONFIG.url}/rest/v1/${_SUPABASE_CONFIG.table}?id=eq.${projectId}`,
        {
          method: 'DELETE',
          headers: {
            'apikey':        _SUPABASE_CONFIG.key,
            'Authorization': 'Bearer ' + _SUPABASE_CONFIG.key,
          },
        }
      );
      console.log('[Cloud] Proiect sters:', projectId);
    } catch(e) {
      console.warn('[Cloud] Eroare delete:', e.message);
    }
  },

  // ── Sync bidirectional (local + cloud) ────────────────────────────────────
  async syncAll() {
    if(this.isSyncing || !_SUPABASE_CONFIG.configured) return;
    this.isSyncing = true;

    try {
      // Incarca din cloud
      const cloudProjects = await this.loadFromCloud();

      // Incarca local
      if(typeof _ProjectsManager !== 'undefined') {
        const localProjects = await _ProjectsManager.getAll();

        // Merge: cloud + local, deduplicate by id, prefer newer
        const merged = {};
        [...localProjects, ...cloudProjects].forEach(p => {
          if(!p.id) return;
          const existing = merged[p.id];
          if(!existing || new Date(p.modified) > new Date(existing.modified)) {
            merged[p.id] = p;
          }
        });

        // Salveaza merged in IndexedDB
        const db = _ProjectsManager.db;
        if(db) {
          const tx = db.transaction(['projects'], 'readwrite');
          Object.values(merged).forEach(p => tx.objectStore('projects').put(p));
          await new Promise(res => tx.oncomplete = res);
        }

        console.log('[CloudSync] Sync complet:', Object.keys(merged).length, 'proiecte');
      }
    } finally {
      this.isSyncing = false;
    }
  },

  // ── Setup wizard UI ────────────────────────────────────────────────────────
  showSetupModal() {
    const modal = document.createElement('div');
    modal.id = 'wx-cloud-setup';
    modal.style.cssText = `
      position:fixed;inset:0;z-index:6000;
      background:rgba(2,6,15,0.95);
      display:flex;align-items:center;justify-content:center;
      font-family:'Space Grotesk',sans-serif;
    `;
    modal.innerHTML = `
      <div style="background:#0b1426;border:1px solid rgba(212,175,55,0.2);
        border-radius:12px;padding:24px;max-width:480px;width:90%">
        <div style="font-size:18px;font-weight:800;color:#fff;margin-bottom:6px">
          ☁️ Conectare Cloud (Supabase)
        </div>
        <div style="font-size:11px;color:rgba(148,163,184,0.7);margin-bottom:16px">
          Salvează proiectele în cloud gratuit. Supabase free tier: 500MB, nelimitat.
        </div>

        <div style="background:rgba(212,175,55,0.06);border-radius:8px;padding:12px;margin-bottom:16px;font-size:10px;color:rgba(148,163,184,0.8)">
          <b style="color:#D4AF37">Setup rapid (5 minute):</b><br>
          1. Creează cont gratuit pe <a href="https://supabase.com" target="_blank" style="color:#38bdf8">supabase.com</a><br>
          2. New Project → Dashboard → Settings → API<br>
          3. Copiază URL și anon key mai jos<br>
          4. În SQL Editor, rulează: <code style="color:#22c55e">window._CloudSync.showSchema()</code>
        </div>

        <div style="margin-bottom:10px">
          <div style="font-size:10px;color:rgba(148,163,184,0.6);margin-bottom:4px">Project URL</div>
          <input type="text" id="wx-sb-url" placeholder="https://xxxx.supabase.co"
            value="${localStorage.getItem('wx_supabase_url')||''}"
            style="width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);
            color:#fff;padding:8px;border-radius:6px;font-size:11px;box-sizing:border-box">
        </div>
        <div style="margin-bottom:16px">
          <div style="font-size:10px;color:rgba(148,163,184,0.6);margin-bottom:4px">Anon (public) key</div>
          <input type="password" id="wx-sb-key" placeholder="eyJh..."
            value="${localStorage.getItem('wx_supabase_key')||''}"
            style="width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);
            color:#fff;padding:8px;border-radius:6px;font-size:11px;box-sizing:border-box">
        </div>

        <div style="display:flex;gap:8px">
          <button onclick="document.getElementById('wx-cloud-setup').remove()"
            style="padding:9px 16px;border-radius:6px;border:1px solid rgba(255,255,255,0.1);
            background:transparent;color:rgba(148,163,184,0.7);font-size:11px;cursor:pointer;font-family:inherit">
            Anulează
          </button>
          <button onclick="_CloudSync.saveConfig()"
            style="flex:1;padding:9px;border-radius:6px;border:1px solid rgba(212,175,55,0.35);
            background:rgba(212,175,55,0.12);color:#D4AF37;font-size:12px;font-weight:700;
            cursor:pointer;font-family:inherit">
            ☁️ Conectează
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  },

  saveConfig() {
    const url = document.getElementById('wx-sb-url')?.value?.trim();
    const key = document.getElementById('wx-sb-key')?.value?.trim();

    if(!url?.startsWith('https://') || !key?.startsWith('eyJ')) {
      typeof _Toast !== 'undefined' && _Toast.error('URL sau cheie invalidă. Verificați datele din Supabase.');
      return;
    }

    localStorage.setItem('wx_supabase_url', url);
    localStorage.setItem('wx_supabase_key', key);
    _SUPABASE_CONFIG.url = url;
    _SUPABASE_CONFIG.key = key;
    _SUPABASE_CONFIG.configured = true;

    document.getElementById('wx-cloud-setup')?.remove();
    typeof _Toast !== 'undefined' && _Toast.success('☁️ Cloud conectat! Se sincronizează...');
    this.syncAll();
  },

  showSchema() {
    console.log('=== SQL SCHEMA — Rulati in Supabase SQL Editor ===');
    console.log(_CLOUD_SQL_SCHEMA);
    console.log('=====================================================');
    typeof _Toast !== 'undefined' && _Toast.info('Schema afișată în Console (F12)', 4000);
    return _CLOUD_SQL_SCHEMA;
  },

  getCacheStats() {
    navigator.serviceWorker?.controller?.postMessage({ type: 'GET_CACHE_STATS' });
  },

  clearAPICache() {
    navigator.serviceWorker?.controller?.postMessage({ type: 'CLEAR_API_CACHE' });
    typeof _Toast !== 'undefined' && _Toast.info('Cache API șters — datele se vor reîncărca live', 3000);
  },
};

// ── Patch _ProjectsManager sa foloseasca cloud ────────────────────────────
if(typeof _ProjectsManager !== 'undefined') {
  const _origSave = _ProjectsManager.saveCurrentProject.bind(_ProjectsManager);
  _ProjectsManager.saveCurrentProject = async function(name) {
    const projectId = await _origSave(name);
    // Sync in cloud in background
    if(projectId && _SUPABASE_CONFIG.configured) {
      const all = await this.getAll();
      const project = all.find(p => p.id === projectId);
      if(project) _CloudSync.saveToCloud(project);
    }
    return projectId;
  };

  const _origRenderList = _ProjectsManager.renderList.bind(_ProjectsManager);
  _ProjectsManager.renderList = async function() {
    await _origRenderList();
    // Adauga buton cloud setup daca neconfigurat
    const container = document.getElementById('wx-projects-list');
    if(container && !_SUPABASE_CONFIG.configured) {
      const cloudBtn = document.createElement('button');
      cloudBtn.className = 'wx-btn-secondary full';
      cloudBtn.style.marginTop = '6px';
      cloudBtn.textContent = '☁️ Activare cloud sync';
      cloudBtn.onclick = () => _CloudSync.showSetupModal();
      container.appendChild(cloudBtn);
    }
  };
}

// ── Init la load ──────────────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    _CloudSync.init();
    // Sync initial daca e configurat
    if(_SUPABASE_CONFIG.configured) {
      setTimeout(() => _CloudSync.syncAll(), 2000);
    }
  }, 1000);
});

window._CloudSync = _CloudSync;

