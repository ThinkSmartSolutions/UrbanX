// ═══════════════════════════════════════════════════════════════════════════
// urbanx-public-participation.js — UrbanX TSS·FG
// Participare Publică Digitală — comentarii geolocalizate pe hartă
// Inspirat: Helsinki City Plan 2050 · Barcelona Decidim · Paris Budget Participatif
// ═══════════════════════════════════════════════════════════════════════════
(function(G) {
'use strict';

// ── Config Supabase ────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://xzctxxchdykowysgjzkq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6Y3R4eGNoZHlrb3d5c2dqemtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5NTI4MDAsImV4cCI6MjAzMTUyODgwMH0.urbanx_anon_key';
const TABLE = 'urban_comments';

// ── Categorii cu icoane și culori ──────────────────────────────────────────
const CATEGORIES = {
  mobilitate:   { label:'Mobilitate',    icon:'🚌', color:'#60a5fa', desc:'Transport, trafic, parcări, bicicliști, pietoni' },
  locuire:      { label:'Locuire',       icon:'🏠', color:'#22c55e', desc:'Blocuri noi, demolare, reabilitare, prețuri' },
  spatii_verzi: { label:'Spații verzi',  icon:'🌳', color:'#4ade80', desc:'Parcuri, copaci, spații publice' },
  risc:         { label:'Risc/Siguranță',icon:'⚠️', color:'#ef4444', desc:'Inundații, seismic, accidente, iluminat' },
  patrimoniu:   { label:'Patrimoniu',    icon:'🏛', color:'#f59e0b', desc:'Clădiri istorice, zone protejate' },
  economic:     { label:'Economic',      icon:'💼', color:'#a78bfa', desc:'Locuri de muncă, investiții, comerț' },
  general:      { label:'General',       icon:'💬', color:'#94a3b8', desc:'Orice altceva despre oraș' },
};

// ── Session ID (anti-spam fără autentificare) ──────────────────────────────
const SESSION_ID = (()=>{
  let s = localStorage.getItem('ux_session');
  if(!s) { s = Math.random().toString(36).slice(2)+Date.now().toString(36); localStorage.setItem('ux_session',s); }
  return s;
})();

// ══════════════════════════════════════════════════════════════════════════
// MODUL PRINCIPAL
// ══════════════════════════════════════════════════════════════════════════
G._PublicParticipation = {

  _map:       null,
  _markers:   [],
  _active:    false,
  _addMode:   false,
  _supabase:  null,
  _channel:   null,
  _comments:  [],
  _cityKey:   null,
  CATEGORIES: CATEGORIES,

  // ── Snapshot sincron pt cinematic + Masterplan/PMUD (comentarii + statistici).
  // Foloseste comentariile live daca exista, altfel un set demo reprezentativ.
  snapshot: function(){
    var cm = (this._comments && this._comments.length) ? this._comments : [
      { lat:47.162, lon:27.598, category:'mobilitate',  comment:'Lipsesc piste de bicicliști pe Bd. Independenței', vote_up:12, vote_down:1 },
      { lat:47.158, lon:27.601, category:'spatii_verzi', comment:'Parcul Copou are nevoie de mai multe bănci și iluminat', vote_up:8, vote_down:0 },
      { lat:47.155, lon:27.605, category:'risc',         comment:'Zona inundabilă în apropierea Bahluiului — avertizare necesară', vote_up:15, vote_down:2 },
    ];
    var votes=0, cats={};
    cm.forEach(function(c){ votes += (c.vote_up||0); cats[c.category||'general']=1; }); // vote_up — consistent cu panoul
    return { comments:cm, n:cm.length, votes:votes, categories:Object.keys(cats).length, live:!!(this._comments&&this._comments.length) };
  },

  // ── Capitol PDF (Masterplan + PMUD) — transparență decizională / consultare ──
  renderChapter: function(D, city){
    if(!D || !D.pdf) return;
    var s = this.snapshot();
    D.chapter('Participare publică și transparență decizională');
    D.P('Urbanismul modern nu se face „de sus în jos": planurile sunt cu atât mai bune și mai ușor de implementat cu cât comunitatea este consultată din timp. UrbanX integrează un strat de participare publică (model Helsinki) — cetățenii adaugă comentarii geolocalizate pe hartă, votează prioritățile, iar administrația vede în timp real unde sunt problemele. Consultarea publică este și o cerință legală pentru PMUD și PUG (Legea 350/2001).');
    if(D.kpis) D.kpis([
      {val:String(s.n), label:'Comentarii cetățeni', sub:(s.live?'date live':'demo')},
      {val:String(s.votes), label:'Voturi exprimate', sub:'priorități'},
      {val:String(s.categories), label:'Categorii active', sub:'mobilitate, verde, risc...'},
    ]);
    D.h2('Vocea cetățenilor — comentarii recente (top)');
    var top = s.comments.slice().sort(function(a,b){return ((b.vote_up||0)-(b.vote_down||0))-((a.vote_up||0)-(a.vote_down||0));}).slice(0,6);
    D.bullets(top.map(function(c){ var cat=(CATEGORIES[c.category]||CATEGORIES.general); return [cat.label+' (+'+((c.vote_up||0)-(c.vote_down||0))+')', c.comment]; }));
    D.bullets([
      ['De ce contează', 'comentariile geolocalizate identifică problemele reale (congestie, lipsă piste, zone de risc) acolo unde sunt — informație pe care datele statistice nu o prind.'],
      ['Transparență', 'deciziile fundamentate pe consultare au legitimitate mai mare și contestații mai puține.'],
      ['Invitație la dialog', 'platforma este deschisă: orice cetățean poate contribui — „Adaugă comentariu pe hartă".'],
    ]);
    if(D.sourceBadges) D.sourceBadges(['Model Helsinki (participatory budgeting)','Legea 350/2001','Aarhus Convention','UrbanX live (Supabase)']);
  },

  // ── Inițializare ─────────────────────────────────────────────────────
  init(map) {
    this._map = map;
    this._cityKey = window.TCI?.cityKey || localStorage.getItem('ux_last_city') || 'RO-IS-01';

    // Inițializare Supabase
    try {
      this._supabase = window.supabase?.createClient(SUPABASE_URL, SUPABASE_KEY) || null;
      if(!this._supabase) {
        console.warn('[Participare] Supabase indisponibil — mod offline');
      }
    } catch(e) { console.warn('[Participare] Supabase init:', e.message); }

    // Adaugam butonul pe hartă
    this._injectButton();
    console.log('[UrbanX] Participare Publică inițializată');
  },

  // ── Toggle modul participare ──────────────────────────────────────────
  toggle() {
    this._active ? this.close() : this.open();
  },

  async open() {
    this._active = true;
    this._updateButton(true);
    await this._loadComments();
    this._subscribeRealtime();
    this._showPanel();
    window.ss?.('💬 Mod participare activat — click pe hartă pentru a adăuga comentariu');
  },

  close() {
    this._active = false;
    this._addMode = false;
    this._updateButton(false);
    this._unsubscribeRealtime();
    this._hidePanel();
    this._clearMarkers();
    window.ss?.('💬 Participare publică închisă');
  },

  // ── Încarcă comentariile din Supabase ─────────────────────────────────
  async _loadComments() {
    if(!this._supabase) {
      this._loadLocalFallback();
      return;
    }
    try {
      const city = window._RO_CITIES_DB?.[this._cityKey];
      const bounds = this._map?.getBounds();

      let query = this._supabase
        .from(TABLE)
        .select('*')
        .eq('status','public')
        .order('created_at', { ascending: false })
        .limit(200);

      if(this._cityKey) query = query.eq('city_key', this._cityKey);

      const { data, error } = await query;
      if(error) throw error;

      this._comments = data || [];
      this._renderMarkers();
      this._updateCount();
      console.log('[Participare] Încărcate:', this._comments.length, 'comentarii');
    } catch(e) {
      console.warn('[Participare] Load error:', e.message);
      this._loadLocalFallback();
    }
  },

  _loadLocalFallback() {
    // Demo comments cand Supabase nu e disponibil
    this._comments = [
      { id:'demo1', lat:47.162, lon:27.598, category:'mobilitate',
        comment:'Lipsesc piste de bicicliști pe Bd. Independenței', author:'Cetățean', vote_up:12, vote_down:1, created_at:new Date().toISOString() },
      { id:'demo2', lat:47.158, lon:27.601, category:'spatii_verzi',
        comment:'Parcul Copou are nevoie de mai multe bănci și iluminat', author:'Cetățean', vote_up:8, vote_down:0, created_at:new Date().toISOString() },
      { id:'demo3', lat:47.155, lon:27.605, category:'risc',
        comment:'Zona inundabilă în apropierea Bahluiului — avertizare necesară', author:'Cetățean', vote_up:15, vote_down:2, created_at:new Date().toISOString() },
    ];
    this._renderMarkers();
    this._updateCount();
    window.ss?.('💬 Mod demo — conectați Supabase pentru date live');
  },

  // ── Randare markers pe hartă ──────────────────────────────────────────
  _renderMarkers() {
    this._clearMarkers();
    if(!this._map) return;

    // Grupam pe categorii pentru clustering vizual
    const features = this._comments.map(c => ({
      type: 'Feature',
      geometry: { type:'Point', coordinates:[c.lon, c.lat] },
      properties: {
        id: c.id,
        category: c.category || 'general',
        comment: c.comment?.slice(0,60) || '',
        author: c.author || 'Anonim',
        vote_up: c.vote_up || 0,
        created_at: c.created_at,
        color: CATEGORIES[c.category]?.color || '#94a3b8',
        icon: CATEGORIES[c.category]?.icon || '💬',
      }
    }));

    // Source + layers Mapbox
    const srcId = 'participation-src';
    const lyId  = 'participation-circles';
    const lyIdText = 'participation-icons';

    try {
      if(this._map.getSource(srcId)) {
        this._map.getSource(srcId).setData({ type:'FeatureCollection', features });
      } else {
        this._map.addSource(srcId, { type:'geojson', data:{ type:'FeatureCollection', features }, cluster:true, clusterMaxZoom:14, clusterRadius:40 });

        // Clustere
        this._map.addLayer({
          id:'participation-clusters', type:'circle', source:srcId,
          filter:['has','point_count'],
          paint:{
            'circle-color':['step',['get','point_count'],'#22c55e',5,'#f59e0b',15,'#ef4444'],
            'circle-radius':['step',['get','point_count'],18,5,24,15,32],
            'circle-stroke-color':'rgba(255,255,255,.4)','circle-stroke-width':2,
          }
        });
        this._map.addLayer({
          id:'participation-cluster-count', type:'symbol', source:srcId,
          filter:['has','point_count'],
          layout:{ 'text-field':['get','point_count_abbreviated'], 'text-size':13, 'text-font':['DIN Offc Pro Medium','Arial Unicode MS Bold'] },
          paint:{ 'text-color':'#fff' }
        });

        // Puncte individuale
        this._map.addLayer({
          id: lyId, type:'circle', source:srcId,
          filter:['!',['has','point_count']],
          paint:{
            'circle-color':['get','color'],
            'circle-radius':10,
            'circle-stroke-color':'rgba(255,255,255,.6)',
            'circle-stroke-width':2,
            'circle-opacity':0.9,
          }
        });

        // Click pe punct → popup
        this._map.on('click', lyId, (e) => {
          const p = e.features[0].properties;
          this._showCommentPopup(e.lngLat, p);
        });

        // Click pe cluster → zoom
        this._map.on('click','participation-clusters',(e)=>{
          const f=this._map.queryRenderedFeatures(e.point,{layers:['participation-clusters']});
          const cId=f[0].properties.cluster_id;
          this._map.getSource(srcId).getClusterExpansionZoom(cId,(err,zoom)=>{
            if(err) return;
            this._map.easeTo({center:f[0].geometry.coordinates,zoom:zoom+1});
          });
        });

        // Cursor pointer
        this._map.on('mouseenter',lyId,()=>this._map.getCanvas().style.cursor='pointer');
        this._map.on('mouseleave',lyId,()=>this._map.getCanvas().style.cursor='');
        this._map.on('mouseenter','participation-clusters',()=>this._map.getCanvas().style.cursor='pointer');
        this._map.on('mouseleave','participation-clusters',()=>this._map.getCanvas().style.cursor='');
      }
    } catch(e) { console.warn('[Participare markers]', e.message); }
  },

  _clearMarkers() {
    if(!this._map) return;
    ['participation-cluster-count','participation-clusters','participation-circles','participation-icons']
      .forEach(id => { try{ if(this._map.getLayer(id)) this._map.removeLayer(id); }catch(e){} });
    try{ if(this._map.getSource('participation-src')) this._map.removeSource('participation-src'); }catch(e){}
  },

  // ── Popup comentariu existent ─────────────────────────────────────────
  _showCommentPopup(lngLat, props) {
    const cat = CATEGORIES[props.category] || CATEGORIES.general;
    const date = new Date(props.created_at).toLocaleDateString('ro-RO');
    const html = `
      <div style="background:#0d1a38;border:1px solid ${cat.color}44;border-radius:10px;padding:14px;min-width:240px;max-width:300px;font-family:'IBM Plex Mono',monospace">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <span style="font-size:18px">${cat.icon}</span>
          <span style="color:${cat.color};font-size:11px;font-weight:700;text-transform:uppercase">${cat.label}</span>
          <span style="color:#475569;font-size:10px;margin-left:auto">${date}</span>
        </div>
        <p style="color:#c8d7f0;font-size:12px;line-height:1.5;margin:0 0 10px">${props.comment}</p>
        <div style="display:flex;align-items:center;gap:12px;border-top:1px solid rgba(255,255,255,.06);padding-top:8px">
          <span style="color:#64748b;font-size:10px">— ${props.author || 'Anonim'}</span>
          <div style="margin-left:auto;display:flex;gap:8px">
            <button onclick="window._PublicParticipation?.vote('${props.id}',1)"
              style="background:rgba(34,197,94,.15);border:1px solid rgba(34,197,94,.3);color:#22c55e;
                     border-radius:6px;padding:3px 10px;cursor:pointer;font-size:11px;font-family:inherit">
              👍 ${props.vote_up || 0}
            </button>
            <button onclick="window._PublicParticipation?.vote('${props.id}',-1)"
              style="background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);color:#ef4444;
                     border-radius:6px;padding:3px 10px;cursor:pointer;font-size:11px;font-family:inherit">
              👎 ${props.vote_down || 0}
            </button>
          </div>
        </div>
      </div>`;

    new mapboxgl.Popup({ offset:12, closeButton:true, className:'ux-participation-popup' })
      .setLngLat(lngLat)
      .setHTML(html)
      .addTo(this._map);
  },

  // ── Adaugă comentariu nou ─────────────────────────────────────────────
  startAddMode() {
    this._addMode = true;
    this._map.getCanvas().style.cursor = 'crosshair';
    window.ss?.('🎯 Click pe hartă pentru a plasa comentariul');

    const onClick = (e) => {
      if(!this._addMode) return;
      this._addMode = false;
      this._map.getCanvas().style.cursor = '';
      this._map.off('click', onClick);
      this._showAddForm(e.lngLat.lat, e.lngLat.lng);
    };
    this._map.once('click', onClick);
  },

  _showAddForm(lat, lon) {
    // Eliminam formular existent
    document.getElementById('ux-add-comment-form')?.remove();

    const city = window._RO_CITIES_DB?.[this._cityKey];

    const form = document.createElement('div');
    form.id = 'ux-add-comment-form';
    form.style.cssText = `
      position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
      z-index:99000;background:#0a1628;border:1px solid rgba(212,175,55,.4);
      border-radius:14px;padding:22px;width:min(420px,92vw);max-height:90vh;overflow-y:auto;
      box-shadow:0 20px 60px rgba(0,0,0,.8);font-family:'IBM Plex Mono',monospace;
    `;

    form.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <div>
          <div style="color:#D4AF37;font-size:14px;font-weight:700">💬 Adaugă Comentariu</div>
          <div style="color:#475569;font-size:10px;margin-top:2px">
            ${city?.name || 'UAT'} · ${lat.toFixed(5)}°N ${lon.toFixed(5)}°E
          </div>
        </div>
        <button onclick="document.getElementById('ux-add-comment-form')?.remove()"
          style="background:none;border:none;color:#64748b;cursor:pointer;font-size:18px;line-height:1">✕</button>
      </div>

      <!-- Categorie -->
      <div style="margin-bottom:14px">
        <label style="color:#94a3b8;font-size:10px;display:block;margin-bottom:6px;text-transform:uppercase">Categoria</label>
        <div style="display:flex;flex-wrap:wrap;gap:6px" id="cat-btns">
          ${Object.entries(CATEGORIES).map(([k,v])=>`
            <button data-cat="${k}" onclick="window._PublicParticipation._selectCat(this,'${k}')"
              style="background:rgba(${k==='general'?'148,163,184':'100,120,200'},.1);
                     border:1px solid rgba(${k==='general'?'148,163,184':'100,120,200'},.2);
                     color:#94a3b8;border-radius:20px;padding:4px 10px;cursor:pointer;
                     font-size:11px;font-family:inherit;transition:all .15s"
              title="${v.desc}">
              ${v.icon} ${v.label}
            </button>`).join('')}
        </div>
      </div>

      <!-- Comentariu -->
      <div style="margin-bottom:14px">
        <label style="color:#94a3b8;font-size:10px;display:block;margin-bottom:6px;text-transform:uppercase">Comentariul tău *</label>
        <textarea id="comment-text" placeholder="Descrie ce observi, ce lipsește sau ce ar trebui schimbat în această zonă..."
          style="width:100%;height:90px;background:#060d1e;border:1px solid rgba(255,255,255,.1);
                 border-radius:8px;padding:10px;color:#c8d7f0;font-size:12px;
                 font-family:'IBM Plex Mono',monospace;resize:vertical;box-sizing:border-box;
                 outline:none"
          maxlength="500"></textarea>
        <div style="color:#475569;font-size:10px;text-align:right;margin-top:3px">
          <span id="char-count">0</span>/500 caractere
        </div>
      </div>

      <!-- Nume (optional) -->
      <div style="margin-bottom:18px">
        <label style="color:#94a3b8;font-size:10px;display:block;margin-bottom:6px;text-transform:uppercase">Nume (opțional)</label>
        <input id="author-name" type="text" placeholder="Anonim"
          style="width:100%;background:#060d1e;border:1px solid rgba(255,255,255,.1);
                 border-radius:8px;padding:8px 10px;color:#c8d7f0;font-size:12px;
                 font-family:'IBM Plex Mono',monospace;box-sizing:border-box;outline:none"
          maxlength="50">
      </div>

      <!-- Disclaimer -->
      <div style="background:rgba(245,158,11,.06);border:1px solid rgba(245,158,11,.2);
                  border-radius:8px;padding:10px;margin-bottom:16px;font-size:10px;color:#78716c">
        ⚠️ Comentariile sunt publice și vizibile pe hartă. Nu includeți date personale sensibile.
        Comentariile ofensatoare vor fi moderate.
      </div>

      <!-- Butoane -->
      <div style="display:flex;gap:8px">
        <button onclick="document.getElementById('ux-add-comment-form')?.remove()"
          style="flex:1;padding:10px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);
                 color:#64748b;border-radius:8px;cursor:pointer;font-size:12px;font-family:inherit">
          Anulează
        </button>
        <button onclick="window._PublicParticipation._submitComment(${lat},${lon})"
          style="flex:2;padding:10px;background:rgba(212,175,55,.15);border:1px solid rgba(212,175,55,.4);
                 color:#D4AF37;border-radius:8px;cursor:pointer;font-size:12px;font-weight:700;
                 font-family:inherit">
          📤 Trimite Comentariul
        </button>
      </div>
    `;

    document.body.appendChild(form);

    // Counter caractere
    form.querySelector('#comment-text').addEventListener('input', function() {
      form.querySelector('#char-count').textContent = this.value.length;
    });

    // Selectam implicit "general"
    this._selectCat(form.querySelector('[data-cat="general"]'), 'general');
    this._pendingLat = lat;
    this._pendingLon = lon;
  },

  _selectCat(btn, cat) {
    // Reset toate
    document.querySelectorAll('#cat-btns button').forEach(b => {
      b.style.background = 'rgba(100,120,200,.08)';
      b.style.borderColor = 'rgba(100,120,200,.15)';
      b.style.color = '#64748b';
    });
    // Highlight selectat
    if(btn) {
      const c = CATEGORIES[cat] || CATEGORIES.general;
      btn.style.background = c.color + '25';
      btn.style.borderColor = c.color + '60';
      btn.style.color = c.color;
    }
    this._pendingCat = cat;
  },

  async _submitComment(lat, lon) {
    const text = document.getElementById('comment-text')?.value?.trim();
    const author = document.getElementById('author-name')?.value?.trim() || 'Cetățean anonim';
    const cat = this._pendingCat || 'general';
    const cityKey = window.TCI?.cityKey || localStorage.getItem('ux_last_city') || 'RO-IS-01';
    const city = window._RO_CITIES_DB?.[cityKey];

    if(!text || text.length < 10) {
      window.ss?.('⚠️ Comentariul trebuie să aibă cel puțin 10 caractere');
      return;
    }

    const payload = {
      lat, lon,
      city_key:   cityKey,
      city_name:  city?.name || cityKey,
      comment:    text.slice(0,500),
      author:     author.slice(0,50),
      category:   cat,
      session_id: SESSION_ID,
      status:     'public',
    };

    try {
      if(this._supabase) {
        const { data, error } = await this._supabase.from(TABLE).insert([payload]).select();
        if(error) throw error;
        window.ss?.('✅ Comentariul a fost adăugat pe hartă');
        document.getElementById('ux-add-comment-form')?.remove();
        // Adaugam local imediat (fara sa mai asteptam realtime)
        if(data?.[0]) { this._comments.unshift(data[0]); this._renderMarkers(); }
      } else {
        // Fallback offline - salvam local
        const localComment = { ...payload, id:'local_'+Date.now(), vote_up:0, vote_down:0, created_at:new Date().toISOString() };
        this._comments.unshift(localComment);
        this._renderMarkers();
        this._saveLocalComment(localComment);
        window.ss?.('✅ Comentariu salvat local (Supabase indisponibil)');
        document.getElementById('ux-add-comment-form')?.remove();
      }
      this._updateCount();
    } catch(e) {
      console.error('[Participare submit]', e);
      window.ss?.('❌ Eroare trimitere: ' + e.message.slice(0,50));
    }
  },

  _saveLocalComment(comment) {
    try {
      const stored = JSON.parse(localStorage.getItem('ux_comments_offline')||'[]');
      stored.push(comment);
      localStorage.setItem('ux_comments_offline', JSON.stringify(stored.slice(-50)));
    } catch(e) {}
  },

  // ── Vot comentariu ────────────────────────────────────────────────────
  async vote(commentId, direction) {
    if(!commentId) return;
    const local = this._comments.find(c=>c.id===commentId);
    if(local) {
      if(direction > 0) local.vote_up = (local.vote_up||0) + 1;
      else local.vote_down = (local.vote_down||0) + 1;
    }
    if(this._supabase && !commentId.startsWith('local_') && !commentId.startsWith('demo')) {
      const field = direction > 0 ? 'vote_up' : 'vote_down';
      await this._supabase.rpc('increment_vote', { comment_id:commentId, field_name:field })
        .catch(()=>{
          // Fallback: update direct
          if(local) {
            this._supabase.from(TABLE)
              .update({ [field]: local[field] })
              .eq('id', commentId)
              .catch(e=>console.warn('[Vote]',e.message));
          }
        });
    }
    window.ss?.('✅ Vot înregistrat');
  },

  // ── Realtime Supabase ─────────────────────────────────────────────────
  _subscribeRealtime() {
    if(!this._supabase) return;
    const cityKey = window.TCI?.cityKey || localStorage.getItem('ux_last_city') || 'RO-IS-01';
    try {
      this._channel = this._supabase
        .channel('urban_comments_' + cityKey)
        .on('postgres_changes', {
          event:'INSERT', schema:'public', table:TABLE,
          filter:`city_key=eq.${cityKey}`
        }, (payload) => {
          if(payload.new?.status === 'public') {
            this._comments.unshift(payload.new);
            this._renderMarkers();
            this._updateCount();
            window.ss?.(`💬 Comentariu nou de la ${payload.new.author||'Anonim'}: "${(payload.new.comment||'').slice(0,30)}..."`);
          }
        })
        .subscribe();
      console.log('[Participare] Realtime activ pentru', cityKey);
    } catch(e) { console.warn('[Realtime]', e.message); }
  },

  _unsubscribeRealtime() {
    try { this._channel?.unsubscribe(); } catch(e) {}
    this._channel = null;
  },

  // ── Panel lateral participare ─────────────────────────────────────────
  _showPanel() {
    document.getElementById('ux-participation-panel')?.remove();

    const panel = document.createElement('div');
    panel.id = 'ux-participation-panel';
    panel.style.cssText = `
      position:fixed;bottom:80px;left:16px;z-index:8000;
      background:rgba(7,14,28,.97);border:1px solid rgba(212,175,55,.3);
      border-radius:12px;padding:0;width:min(300px,88vw);
      box-shadow:0 8px 32px rgba(0,0,0,.7);font-family:'IBM Plex Mono',monospace;
      backdrop-filter:blur(16px);overflow:hidden;
    `;

    panel.innerHTML = `
      <!-- Header -->
      <div style="background:rgba(212,175,55,.08);padding:12px 14px;border-bottom:1px solid rgba(255,255,255,.06)">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:16px">💬</span>
          <div>
            <div style="color:#D4AF37;font-size:12px;font-weight:700">Participare Publică</div>
            <div style="color:#475569;font-size:9px">Helsinki model · date live Supabase</div>
          </div>
          <button onclick="window._PublicParticipation?.close()"
            style="margin-left:auto;background:none;border:none;color:#475569;cursor:pointer;font-size:16px">✕</button>
        </div>
      </div>

      <!-- Stats -->
      <div style="display:flex;border-bottom:1px solid rgba(255,255,255,.05)">
        <div style="flex:1;padding:10px;text-align:center;border-right:1px solid rgba(255,255,255,.05)">
          <div style="color:#D4AF37;font-size:18px;font-weight:700" id="pp-count">0</div>
          <div style="color:#475569;font-size:9px">comentarii</div>
        </div>
        <div style="flex:1;padding:10px;text-align:center;border-right:1px solid rgba(255,255,255,.05)">
          <div style="color:#22c55e;font-size:18px;font-weight:700" id="pp-votes">0</div>
          <div style="color:#475569;font-size:9px">voturi totale</div>
        </div>
        <div style="flex:1;padding:10px;text-align:center">
          <div style="color:#60a5fa;font-size:18px;font-weight:700" id="pp-cats">0</div>
          <div style="color:#475569;font-size:9px">categorii</div>
        </div>
      </div>

      <!-- Categorii filter -->
      <div style="padding:10px 14px;border-bottom:1px solid rgba(255,255,255,.05)">
        <div style="color:#475569;font-size:9px;margin-bottom:6px;text-transform:uppercase">Filtrează după categorie</div>
        <div style="display:flex;flex-wrap:wrap;gap:4px" id="pp-filter-btns">
          <button onclick="window._PublicParticipation?._filterCat(null,this)"
            data-cat="all"
            style="background:rgba(212,175,55,.15);border:1px solid rgba(212,175,55,.3);color:#D4AF37;
                   border-radius:16px;padding:3px 10px;cursor:pointer;font-size:10px;font-family:inherit">
            Toate
          </button>
          ${Object.entries(CATEGORIES).map(([k,v])=>`
            <button onclick="window._PublicParticipation?._filterCat('${k}',this)"
              data-cat="${k}"
              style="background:rgba(100,120,200,.08);border:1px solid rgba(100,120,200,.15);
                     color:#64748b;border-radius:16px;padding:3px 10px;cursor:pointer;
                     font-size:10px;font-family:inherit">
              ${v.icon} ${v.label}
            </button>`).join('')}
        </div>
      </div>

      <!-- Top comentarii -->
      <div style="max-height:200px;overflow-y:auto;padding:8px 0" id="pp-list">
        <div style="color:#475569;font-size:11px;text-align:center;padding:20px">
          Se încarcă comentariile...
        </div>
      </div>

      <!-- Buton adaugă -->
      <div style="padding:10px 14px;border-top:1px solid rgba(255,255,255,.06)">
        <button onclick="window._PublicParticipation?.startAddMode()"
          style="width:100%;padding:10px;background:rgba(212,175,55,.12);
                 border:1px solid rgba(212,175,55,.35);color:#D4AF37;
                 border-radius:8px;cursor:pointer;font-size:12px;font-weight:700;
                 font-family:inherit;transition:all .2s"
          onmouseover="this.style.background='rgba(212,175,55,.22)'"
          onmouseout="this.style.background='rgba(212,175,55,.12)'">
          📍 Adaugă comentariu pe hartă
        </button>
      </div>
    `;

    document.body.appendChild(panel);
    this._updateCount();
    this._renderList();
  },

  _hidePanel() {
    document.getElementById('ux-participation-panel')?.remove();
  },

  _filterCat(cat, btn) {
    // Reset butoane
    document.querySelectorAll('#pp-filter-btns button').forEach(b => {
      b.style.background = 'rgba(100,120,200,.08)';
      b.style.borderColor = 'rgba(100,120,200,.15)';
      b.style.color = '#64748b';
    });
    if(btn) {
      btn.style.background = 'rgba(212,175,55,.15)';
      btn.style.borderColor = 'rgba(212,175,55,.3)';
      btn.style.color = '#D4AF37';
    }
    this._activeFilter = cat;
    this._renderList();
    // Filtram si markerii de pe harta
    this._applyMapFilter(cat);
  },

  _applyMapFilter(cat) {
    if(!this._map || !this._map.getLayer('participation-circles')) return;
    const filter = cat
      ? ['all',['!',['has','point_count']],['==',['get','category'],cat]]
      : ['!',['has','point_count']];
    this._map.setFilter('participation-circles', filter);
  },

  _renderList() {
    const list = document.getElementById('pp-list');
    if(!list) return;
    const filtered = this._activeFilter
      ? this._comments.filter(c=>c.category===this._activeFilter)
      : this._comments;
    const sorted = [...filtered].sort((a,b)=>(b.vote_up||0)-(a.vote_up||0)).slice(0,10);

    if(!sorted.length) {
      list.innerHTML = '<div style="color:#475569;font-size:11px;text-align:center;padding:16px">Nicio înregistrare în această categorie</div>';
      return;
    }

    list.innerHTML = sorted.map(c => {
      const cat = CATEGORIES[c.category] || CATEGORIES.general;
      const date = new Date(c.created_at).toLocaleDateString('ro-RO');
      return `
        <div style="padding:8px 14px;border-bottom:1px solid rgba(255,255,255,.04);cursor:pointer"
          onclick="window._PublicParticipation?._flyToComment(${c.lat},${c.lon},'${c.id}')"
          onmouseover="this.style.background='rgba(255,255,255,.03)'"
          onmouseout="this.style.background='transparent'">
          <div style="display:flex;align-items:flex-start;gap:6px">
            <span style="font-size:13px;flex-shrink:0">${cat.icon}</span>
            <div style="flex:1;min-width:0">
              <div style="color:#c8d7f0;font-size:11px;line-height:1.4;
                          overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">
                ${c.comment?.slice(0,80) || ''}
              </div>
              <div style="color:#475569;font-size:9px;margin-top:3px">
                ${c.author||'Anonim'} · ${date} · 👍 ${c.vote_up||0}
              </div>
            </div>
          </div>
        </div>`;
    }).join('');
  },

  _flyToComment(lat, lon, id) {
    this._map?.flyTo({ center:[lon,lat], zoom:16, duration:800 });
  },

  _updateCount() {
    const el = document.getElementById('pp-count');
    if(el) el.textContent = this._comments.length;
    const votes = document.getElementById('pp-votes');
    if(votes) votes.textContent = this._comments.reduce((s,c)=>(s+(c.vote_up||0)),0);
    const cats = document.getElementById('pp-cats');
    if(cats) cats.textContent = new Set(this._comments.map(c=>c.category)).size;
    this._renderList();
  },

  // ── Buton pe hartă ────────────────────────────────────────────────────
  _injectButton() {
    if(document.getElementById('btn-participation')) return;
    const btn = document.createElement('button');
    btn.id = 'btn-participation';
    btn.title = 'Participare Publică — adaugă comentarii pe hartă (Helsinki model)';
    btn.textContent = '💬';
    btn.style.cssText = `
      position:fixed;bottom:130px;right:14px;z-index:1100;
      width:40px;height:40px;border-radius:50%;
      background:rgba(7,14,28,.92);border:1px solid rgba(212,175,55,.35);
      color:#D4AF37;font-size:18px;cursor:pointer;
      box-shadow:0 4px 16px rgba(0,0,0,.5);transition:all .2s;
      display:flex;align-items:center;justify-content:center;
    `;
    btn.onclick = () => this.toggle();
    btn.onmouseover = () => { btn.style.background='rgba(212,175,55,.15)'; btn.style.transform='scale(1.08)'; };
    btn.onmouseout  = () => { btn.style.background='rgba(7,14,28,.92)';    btn.style.transform='scale(1)'; };
    document.body.appendChild(btn);
  },

  _updateButton(active) {
    const btn = document.getElementById('btn-participation');
    if(!btn) return;
    btn.style.background = active ? 'rgba(212,175,55,.2)' : 'rgba(7,14,28,.92)';
    btn.style.borderColor = active ? 'rgba(212,175,55,.7)' : 'rgba(212,175,55,.35)';
    btn.textContent = active ? '✕' : '💬';
  },

  // ── Export comentarii în Masterplan PDF ───────────────────────────────
  exportForMasterplan() {
    const total = this._comments.length;
    if(!total) return null;

    const byCat = {};
    this._comments.forEach(c => {
      const cat = c.category || 'general';
      if(!byCat[cat]) byCat[cat] = [];
      byCat[cat].push(c);
    });

    const topByVotes = [...this._comments]
      .sort((a,b)=>(b.vote_up||0)-(a.vote_up||0))
      .slice(0,5);

    return {
      total,
      byCat,
      topByVotes,
      summary: `${total} comentarii de la cetățeni · ${Object.keys(byCat).length} categorii · ${this._comments.reduce((s,c)=>s+(c.vote_up||0),0)} voturi totale`,
    };
  },
};

// ── Expunere globală ───────────────────────────────────────────────────────
window._PublicParticipation = G._PublicParticipation;

// Auto-inițializare după ce harta e gata
const _tryInit = () => {
  if(window.map && window.mapboxgl) {
    G._PublicParticipation.init(window.map);
  } else {
    setTimeout(_tryInit, 800);
  }
};
setTimeout(_tryInit, 1500);

console.log('[UrbanX] Participare Publică v1.0 — Helsinki City Plan model');
})(window);
