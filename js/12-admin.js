// UrbanX — Admin panel, utilizatori

function _adminOpen() {
  if(!_isAdmin) return;
  const ov = document.getElementById('admin-overlay');
  if(ov) ov.style.display = 'flex';
  const lbl = document.getElementById('adm-logged-as');
  if(lbl) lbl.textContent = 'logat ca ' + (_authUser?.email || '');

  // Adăugăm tabs dacă nu există
  if(!document.getElementById('adm-tabs')){
    const header = document.querySelector('#admin-overlay > div > div:first-child');
    const body   = document.getElementById('adm-body') || 
                   document.querySelector('#admin-overlay [id="adm-body"]');
    if(header){
      const tabBar = document.createElement('div');
      tabBar.id='adm-tabs';
      tabBar.style.cssText='display:flex;gap:2px;padding:8px 22px 0;background:#080f1c;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,.06)';
      tabBar.innerHTML=[
        ['users','\uD83D\uDC65 Utilizatori'],
        ['roles','\uD83D\uDD10 Roluri & Acces'],
        ['uat','\uD83D\uDDFA UAT & Date'],
        ['demo','\uD83E\uDDEA Conturi Demo'],
        ['guide','\uD83D\uDCD6 Ghid Admin'],
      ].map(([id,l])=>'<button id="adm-tab-'+id+'" onclick="_admTab(\''+id+'\')"'
        +' style="padding:7px 14px;border:none;border-radius:8px 8px 0 0;font-size:11px;font-weight:700;cursor:pointer;transition:all .15s;background:transparent;color:#475569;border-bottom:2px solid transparent"'
        +'>'+l+'</button>').join('');
      header.insertAdjacentElement('afterend', tabBar);
    }
  }

  _admTab('users');
}

function _admTab(tab){
  // Stiluri tabs
  ['users','roles','uat','demo','guide'].forEach(t=>{
    const btn=document.getElementById('adm-tab-'+t);
    if(!btn) return;
    const active=t===tab;
    btn.style.background=active?'#0f172a':'transparent';
    btn.style.color=active?'#d4af37':'#475569';
    btn.style.borderBottom=active?'2px solid #d4af37':'2px solid transparent';
  });
  // Conținut
  const body=document.getElementById('adm-body');
  if(!body) return;
  if(tab==='roles'){
    // deschide managerul de roluri (fereastra proprie) + scurtatura in panou
    try{ window.UXRoles && window.UXRoles.openManager && window.UXRoles.openManager(); }catch(e){}
    body.innerHTML='<div style="padding:24px;text-align:center"><div style="font-size:15px;color:#e6edf7;font-weight:700;margin-bottom:8px">🔐 Roluri & Acces</div>'
      +'<div style="color:#94a3b8;font-size:13px;margin-bottom:16px">Creezi/editezi roluri și le aloci acces pe module, și asignezi roluri utilizatorilor (pe email).</div>'
      +'<button onclick="window.UXRoles&&window.UXRoles.openManager&&window.UXRoles.openManager()" style="background:linear-gradient(180deg,#a855f7,#7c3aed);color:#fff;border:0;border-radius:9px;padding:11px 22px;font-weight:700;cursor:pointer;font-size:13px">Deschide managerul de roluri</button></div>';
    return;
  }
  if(tab==='users'){
    body.innerHTML=`
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">
        ${[['adm-total','—','#3b82f6','Total'],['adm-confirmed','—','#34d399','Confirmați'],
           ['adm-pending','—','#fbbf24','Neconfirmați'],['adm-admins','—','#d4af37','Admini']].map(([id,v,c,l])=>`
          <div style="background:#080f1c;border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:12px;text-align:center">
            <div style="font-size:24px;font-weight:800;color:${c}" id="${id}">${v}</div>
            <div style="font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:.05em;margin-top:3px">${l}</div>
          </div>`).join('')}
      </div>
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.07em">Utilizatori înregistrați</div>
          <button onclick="_adminLoadUsers()" id="adm-reload-btn" style="background:rgba(59,130,246,.15);border:1px solid rgba(59,130,246,.3);color:#60a5fa;border-radius:7px;padding:5px 12px;font-size:11px;cursor:pointer;font-weight:600">🔄 Reîncarcă</button>
        </div>
        <div id="adm-msg" style="font-size:12px;margin-bottom:8px"></div>
        <div id="adm-users" style="border:1px solid rgba(255,255,255,.08);border-radius:10px;overflow:hidden;min-height:60px">
          <div style="padding:24px;text-align:center;color:#64748b;font-size:12px">Se încarcă...</div>
        </div>
      </div>
      <div style="background:#080f1c;border:1px solid rgba(59,130,246,.2);border-radius:10px;padding:14px">
        <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.07em;margin-bottom:10px">✉️ Invită utilizator nou</div>
        <div style="display:flex;gap:8px">
          <input id="adm-invite-email" type="email" placeholder="email@exemplu.ro" style="flex:1;padding:9px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.15);background:#0b1220;color:#e2e8f0;font-size:13px;outline:none" onkeydown="if(event.key==='Enter')_adminInvite()">
          <button onclick="_adminInvite()" style="background:rgba(59,130,246,.2);border:1px solid rgba(59,130,246,.4);color:#60a5fa;border-radius:8px;padding:9px 16px;cursor:pointer;font-size:12px;font-weight:700">Invită</button>
        </div>
        <div id="adm-invite-msg" style="font-size:11px;margin-top:7px"></div>
      </div>
      <div style="background:#080f1c;border:1px solid rgba(212,175,55,.15);border-radius:10px;padding:14px">
        <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.07em;margin-bottom:10px">👑 Schimbă rolul unui utilizator (rol unic — acces + meniu)</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <input id="adm-role-email" type="email" placeholder="email@exemplu.ro" style="flex:1;min-width:180px;padding:9px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.15);background:#0b1220;color:#e2e8f0;font-size:13px;outline:none">
          <select id="adm-role-sel" style="padding:9px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.15);background:#0b1220;color:#e2e8f0;font-size:13px;outline:none">${_admRoleOpts()}</select>
          <button onclick="_adminSetGranularRole()" style="background:rgba(212,175,55,.15);border:1px solid rgba(212,175,55,.4);color:#d4af37;border-radius:8px;padding:9px 16px;cursor:pointer;font-size:12px;font-weight:700">Aplică</button>
        </div>
        <div style="font-size:10px;color:#64748b;margin-top:6px">Rol unic per utilizator. <b style="color:#c4b5fd">Super Administrator</b> = acces complet + admin. Definițiile rolurilor se editează în tab-ul „🔐 Roluri & Acces".</div>
        <div id="adm-role-msg" style="font-size:11px;margin-top:7px"></div>
      </div>`;
    _adminLoadUsers();
  } else if(tab==='uat'){
    _admRenderUAT(body);
  } else if(tab==='demo'){
    _admRenderDemo(body);
  } else if(tab==='guide'){
    _admRenderGuide(body);
  }
}

function _admRenderUAT(body){
  const list=Object.entries(UAT_REGISTRY);
  const complet=list.filter(([,u])=>u.status==='complet').length;
  const total=list.length;
  body.innerHTML=`
    <!-- Stats UAT -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
      ${[['Total UAT',total,'#94a3b8'],['✅ Complet',complet,'#4ade80'],['⭕ Incomplete',total-complet,'#fbbf24']].map(([l,v,c])=>`
        <div style="background:#080f1c;border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:12px;text-align:center">
          <div style="font-size:22px;font-weight:800;color:${c}">${v}</div>
          <div style="font-size:10px;color:#64748b;margin-top:3px">${l}</div>
        </div>`).join('')}
    </div>

    <!-- UAT activ -->
    <div style="background:rgba(212,175,55,.07);border:1px solid rgba(212,175,55,.25);border-radius:10px;padding:14px">
      <div style="font-size:11px;color:#d4af37;font-weight:700;margin-bottom:8px">📍 UAT ACTIV CURENT</div>
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div>
          <div style="color:#e2e8f0;font-size:14px;font-weight:800">${S_UAT.label}</div>
          <div style="color:#64748b;font-size:10px;margin-top:2px">jud. ${S_UAT.judet} · status: <span style="color:${S_UAT.status==='complet'?'#4ade80':'#fbbf24'}">${S_UAT.status}</span></div>
        </div>
        <button onclick="showUATSelector();_adminClose()" style="background:rgba(212,175,55,.15);border:1px solid rgba(212,175,55,.3);color:#d4af37;border-radius:8px;padding:7px 14px;font-size:11px;font-weight:700;cursor:pointer">🔄 Schimbă UAT</button>
      </div>
    </div>

    <!-- Lista UAT-uri -->
    <div>
      <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.07em;margin-bottom:8px">Toate UAT-urile configurate</div>
      <div style="display:flex;flex-direction:column;gap:3px;max-height:260px;overflow-y:auto">
        ${list.map(([id,u])=>`
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#080f1c;border-radius:8px;border:1px solid rgba(255,255,255,.05)">
            <div>
              <span style="color:#e2e8f0;font-size:11px;font-weight:600">${u.label}</span>
              <span style="color:#334155;font-size:9px;margin-left:6px">${id}</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              ${u.aeroport?'<span title="Aeroport" style="font-size:10px">✈</span>':''}
              <span style="font-size:8px;padding:2px 7px;border-radius:4px;font-weight:700;
                background:${u.status==='complet'?'rgba(34,197,94,.15)':'rgba(100,116,139,.1)'};
                color:${u.status==='complet'?'#4ade80':'#475569'}">
                ${u.status==='complet'?'✅ Complet':'⭕ Gol'}
              </span>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <!-- Cum adaugi un UAT -->
    <div style="background:#080f1c;border:1px solid rgba(56,189,248,.2);border-radius:10px;padding:14px">
      <div style="font-size:11px;font-weight:700;color:#38bdf8;text-transform:uppercase;letter-spacing:.07em;margin-bottom:10px">➕ Cum adaugi date pentru un UAT nou</div>
      ${['1. Exportezi harta PUG din QGIS ca <code style="color:#fbbf24;background:rgba(251,191,36,.1);padding:1px 4px;border-radius:3px">GeoJSON</code> cu proiecție WGS84 (EPSG:4326). Câmp obligatoriu: <code style="color:#fbbf24">utr</code> (codul zonei urbanistice).',
        '2. Generezi <code style="color:#fbbf24;background:rgba(251,191,36,.1);padding:1px 4px;border-radius:3px">cadastru_index.json</code> — dicționar <code style="color:#fbbf24">{nrcad: [lng, lat]}</code> pentru căutare rapidă parcele.',
        '3. Creezi <code style="color:#fbbf24;background:rgba(251,191,36,.1);padding:1px 4px;border-radius:3px">reguli.json</code> cu parametrii PUG per UTR: <code style="color:#fbbf24">{&quot;P1&quot;:{&quot;d&quot;:&quot;...&quot;,&quot;pot&quot;:35,&quot;cut&quot;:1.2,&quot;niv&quot;:2,...}}</code>',
        '4. Plasezi fișierele în <code style="color:#fbbf24;background:rgba(251,191,36,.1);padding:1px 4px;border-radius:3px">data/&#123;uat-id&#125;/</code> în repo GitHub.',
        '5. În <code style="color:#fbbf24">UAT_REGISTRY</code> din index.html: schimbi <code style="color:#4ade80">status:\'empty\'</code> → <code style="color:#4ade80">status:\'complet\'</code> și completezi <code style="color:#fbbf24">pugFile</code>, <code style="color:#fbbf24">cadastruIndex</code>, <code style="color:#fbbf24">reguliFile</code> cu căile corecte.',
        '6. Testezi: apeși butonul 📍 din topbar, selectezi UAT-ul → harta PUG se încarcă automat.'
      ].map((s,i)=>`<div style="display:flex;gap:10px;margin-bottom:8px;align-items:flex-start">
          <span style="background:rgba(56,189,248,.15);color:#38bdf8;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;flex-shrink:0;margin-top:1px">${i+1}</span>
          <span style="color:#94a3b8;font-size:11px;line-height:1.6">${s}</span>
        </div>`).join('')}
    </div>`;
}

function _admRenderGuide(body){
  const S = [
    {t:'Adaugare UAT nou — flux complet GitHub', c:'#38bdf8', ico:'Map',
     steps:[
      'Obtii datele de la primarie sau OCPI: harta PUG (SHP/DXF/PDF georef.) + Regulamentul Local de Urbanism (RLU) in format CSV/Excel/Word.',
      'Convertesti PUG in QGIS: Layer > Export > Save Features As > GeoJSON, CRS: EPSG:4326 (WGS84). Camp obligatoriu in attributes: utr (codul zonei, ex: P1, CM, AI2A).',
      'Generezi reguli.json din CSV-ul RLU. Script in repo: tools/gen_reguli.py pug_reguli.csv > reguli.json',
      'Generezi cadastru_index.json din exportul ANCPI: tools/gen_cadastru_index.py export_ancpi.csv > cadastru_index.json',
      'Creezi folderul in GitHub: in repo > Add file > Create new file > scrii data/municipiul-bacau/meta.json (GitHub creeaza automat folderul).',
      'Urci cele 4 fisiere in data/{uat-id}/: pug.geojson, cadastru_index.json, reguli.json, meta.json',
      'Actualizezi UAT_REGISTRY in index.html: schimbi status:"empty" in status:"complet" si completezi pugFile si cadastruIndex.',
      'GitHub Pages se actualizeaza automat in 1-2 minute dupa push. Testezi: selectezi UAT-ul din butonul Iasi > PUG se incarca pe harta.',
    ]},
    {t:'Structura folderelor in GitHub repo', c:'#a78bfa', ico:'Folder',
     steps:[
      'data/municipiul-iasi/ — date complete existente (pug.geojson, cadastru_index.json, reguli.json)',
      'data/municipiul-bacau/ — de creat cand ai datele',
      'data/municipiul-suceava/ — de creat cand ai datele',
      'tools/ — scripturi Python pentru conversie (gen_reguli.py, gen_cadastru_index.py, validate_pug.py)',
      'NU mai pune fisiere direct in root — fisierele vechi sunt mentinute doar ca fallback temporar.',
    ]},
    {t:'Format fisiere — referinta rapida', c:'#4ade80', ico:'File',
     steps:[
      'pug.geojson — FeatureCollection de Polygon/MultiPolygon. Camp obligatoriu: utr. Optional: denumire, regim_h, indici.',
      'cadastru_index.json — obiect JSON simplu: {"NR_CAD":[lng,lat],...}. Dimensiune tipica: 1-5MB pentru un municipiu.',
      'reguli.json — obiect JSON: {"UTR":{"d":"desc","pot":40,"cut":2.0,"niv":4,"h":16,"rf":5,"rl":3,"rs":5,"sv":25,"pk":1}}',
      'meta.json — info UAT: {"id":"municipiul-bacau","label":"Municipiul Bacau","judet":"Bacau","status":"complet","data_actualizare":"2024-01"}',
    ]},
    {t:'Actualizare date existente', c:'#fbbf24', ico:'Refresh',
     steps:[
      'Inlocuiesti fisierul direct in GitHub: navigezi la data/{uat-id}/pug.geojson > Edit (creion) sau Upload > Commit changes.',
      'SAU prin git: git add data/municipiul-iasi/pug.geojson && git commit -m "Update PUG Iasi v2" && git push',
      'GitHub Pages se actualizeaza automat. Utilizatorii vad noile date dupa Ctrl+Shift+R (hard refresh).',
      'Daca actualizezi reguli.json, schimbi si data_actualizare in meta.json pentru tracking.',
    ]},
    {t:'Gestionare utilizatori', c:'#fb923c', ico:'Users',
     steps:[
      'Tab Utilizatori > statistici + tabel cu toti userii inregistrati (email, rol, status confirmare, data).',
      'Invitatie: introduce email > buton Invita > userul primeste email cu link de confirmare.',
      'Roluri: admin = acces complet + panou Admin | user = acces standard la platforma.',
      'Confirmare manuala (daca emailul nu ajunge): Supabase Dashboard > Authentication > Users > Edit > Confirm.',
      'Resetare parola: Supabase Dashboard > Authentication > Users > Send recovery email.',
    ]},
    {t:'Troubleshooting', c:'#f87171', ico:'Fix',
     steps:[
      'PUG nu se incarca: Testeaza URL direct: https://thinksmartsolutions.github.io/UrbanX/data/{id}/pug.geojson — trebuie sa returneze JSON valid.',
      'UTR-uri fara culoare: Campul utr lipseste sau are alt nume in GeoJSON. Verifica in QGIS: Open Attribute Table > cauta coloana cu codurile de zona.',
      'Parcele nu se gasesc: Numarul cadastral nu exista in cadastru_index.json. Adauga manual sau regenereaza din export ANCPI mai complet.',
      'Reguli gresite: Valorile pot, cut, h trebuie sa fie numere (nu string). Valideaza cu: tools/validate_reguli.py data/{id}/reguli.json',
      'GitHub Pages 404: Verifica ca fisierul e in branch main si ca GitHub Pages e setat pe main/root.',
    ]},
  ];

  let html = '<div class="adm-guide-header">📖 Ghid complet administrator UrbanX</div>';
  S.forEach(sec=>{
    html += '<div class="adm-guide-sec">';
    html += '<div class="adm-guide-sec-title" style="color:'+sec.c+'">'+sec.ico+' — '+sec.t+'</div>';
    sec.steps.forEach((step,i)=>{
      html += '<div class="adm-guide-step">';
      html += '<span class="adm-guide-num">'+( i+1)+'</span>';
      html += '<span class="adm-guide-txt">'+step+'</span>';
      html += '</div>';
    });
    html += '</div>';
  });
  body.innerHTML = html;
}

function _adminClose() {
  const ov = document.getElementById('admin-overlay');
  if(ov) ov.style.display = 'none';
}

async function _adminLoadUsers() {
  const msg       = document.getElementById('adm-msg');
  const container = document.getElementById('adm-users');
  const btn       = document.getElementById('adm-reload-btn');
  if(!_supabase) { _admMsg(msg, '⚠ Supabase neconfigurat.', 'warn'); return; }

  if(btn) btn.disabled = true;
  _admMsg(msg, '⏳ Se încarcă...', 'info');

  try {
    // RPC securizat — necesită SQL setup (supabase-setup.sql)
    const { data: rpcData, error: rpcErr } = await _supabase.rpc('list_all_users');

    if(!rpcErr && rpcData) {
      _adminRender(rpcData, msg, container);
      _admMsg(msg, '✓ Date actualizate via RPC securizat', 'ok');
    } else {
      // Fallback: SELECT direct pe profiles
      const { data: profData, error: profErr } = await _supabase
        .from('profiles').select('*').order('created_at', { ascending: false }).limit(100);

      if(!profErr && profData?.length) {
        _adminRender(profData, msg, container);
        _admMsg(msg, '✓ Date din tabela profiles (RPC indisponibil)', 'ok');
      } else {
        // RPC lipsește — afișăm instrucțiuni setup
        const isRpcMissing = rpcErr?.message?.includes('Could not find') || rpcErr?.code === '404' || rpcErr?.code === 'PGRST202';
        if(isRpcMissing || rpcErr?.message?.includes('400')){
          container.innerHTML = `
            <div style="padding:20px 24px;color:#fbbf24">
              <div style="font-size:13px;font-weight:700;margin-bottom:8px">⚙️ Setup SQL necesar în Supabase</div>
              <div style="font-size:11px;color:#94a3b8;line-height:1.7;margin-bottom:12px">
                Funcțiile RPC <code style="color:#a78bfa">list_all_users</code> și <code style="color:#a78bfa">set_user_role</code> nu sunt create.<br>
                Rulează <b style="color:#fff">supabase-setup.sql</b> în Supabase → SQL Editor.
              </div>
              <a href="https://supabase.com/dashboard/project/_/sql" target="_blank"
                style="display:inline-block;padding:7px 14px;background:rgba(59,130,246,.2);border:1px solid rgba(59,130,246,.4);color:#60a5fa;border-radius:7px;font-size:11px;font-weight:700;text-decoration:none">
                🔗 Deschide SQL Editor →
              </a>
            </div>`;
          _admMsg(msg, '⚠ RPC functions lipsesc — rulează supabase-setup.sql', 'warn');
        } else {
          _admMsg(msg, '⚠ ' + (profErr?.message || rpcErr?.message || 'Eroare necunoscută'), 'warn');
          _adminRender(_authUser ? [{
            id: _authUser.id, email: _authUser.email,
            role: 'admin', confirmed: true,
            created_at: new Date().toISOString()
          }] : [], null, container);
        }
      }
    }
  } catch(e) {
    _admMsg(msg, '❌ Eroare: ' + e.message, 'err');
  } finally {
    if(btn) btn.disabled = false;
  }
}

function _adminRender(users, msg, container) {
  const total     = users.length;
  const confirmed = users.filter(u => u.confirmed !== false && u.email_confirmed_at !== null).length;
  const pending   = total - confirmed;
  const admins    = users.filter(u => u.role === 'admin').length;

  document.getElementById('adm-total').textContent     = total;
  document.getElementById('adm-confirmed').textContent = confirmed;
  document.getElementById('adm-pending').textContent   = pending;
  document.getElementById('adm-admins').textContent    = admins;

  if(!total) {
    container.innerHTML = '<div style="padding:24px;text-align:center;color:#64748b;font-size:12px">Niciun utilizator găsit.<br>Rulează SQL setup-ul din Supabase.</div>';
    return;
  }

  container.innerHTML = `
    <table style="width:100%;border-collapse:collapse;font-size:12px">
      <thead>
        <tr style="background:#060d18;position:sticky;top:0">
          <th style="padding:9px 11px;text-align:left;color:#64748b;font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid rgba(255,255,255,.08)">Email</th>
          <th style="padding:9px 11px;text-align:left;color:#64748b;font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid rgba(255,255,255,.08)">Rol</th>
          <th style="padding:9px 11px;text-align:left;color:#64748b;font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid rgba(255,255,255,.08)">Status</th>
          <th style="padding:9px 11px;text-align:left;color:#64748b;font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid rgba(255,255,255,.08)">Înregistrat</th>
          <th style="padding:9px 11px;text-align:center;color:#64748b;font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid rgba(255,255,255,.08)">Acțiuni</th>
        </tr>
      </thead>
      <tbody>
        ${users.map(u => {
          const email     = u.email || '—';
          const isAdmin   = u.role === 'admin';
          const isCurrent = u.email === _authUser?.email;
          const isConf    = u.confirmed !== false;
          const dateStr   = u.created_at ? new Date(u.created_at).toLocaleDateString('ro-RO') : '—';
          return `<tr style="border-bottom:1px solid rgba(255,255,255,.04);transition:background .1s${isCurrent ? ';background:rgba(59,130,246,.06)' : ''}" onmouseover="this.style.background='rgba(255,255,255,.03)'" onmouseout="this.style.background='${isCurrent ? 'rgba(59,130,246,.06)' : 'transparent'}'">
            <td style="padding:9px 11px;color:#e2e8f0;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
              ${email}
              ${isCurrent ? '<span style="font-size:9px;background:rgba(59,130,246,.2);color:#60a5fa;border-radius:999px;padding:1px 6px;margin-left:4px;font-weight:700">TU</span>' : ''}
            </td>
            <td style="padding:9px 11px">
              ${isAdmin
                ? '<span style="font-size:10px;background:rgba(212,175,55,.15);color:#d4af37;border-radius:999px;padding:2px 9px;font-weight:700">👑 Admin</span>'
                : '<span style="font-size:10px;background:rgba(100,116,139,.12);color:#94a3b8;border-radius:999px;padding:2px 9px;font-weight:600">👤 User</span>'}
            </td>
            <td style="padding:9px 11px">
              ${isConf
                ? '<span style="color:#34d399;font-size:11px;font-weight:600">✓ Confirmat</span>'
                : '<span style="color:#fbbf24;font-size:11px;font-weight:600">⏳ Neconfirmat</span>'}
            </td>
            <td style="padding:9px 11px;color:#64748b;font-size:11px">${dateStr}</td>
            <td style="padding:9px 11px;text-align:center">
              ${!isCurrent ? `<button onclick="_adminQuickRole('${u.id}','${email}','${isAdmin ? 'user' : 'admin'}')" style="font-size:10px;padding:3px 8px;border-radius:6px;border:1px solid ${isAdmin ? 'rgba(239,68,68,.3)' : 'rgba(212,175,55,.3)'};background:${isAdmin ? 'rgba(239,68,68,.1)' : 'rgba(212,175,55,.1)'};color:${isAdmin ? '#f87171' : '#d4af37'};cursor:pointer;font-weight:600">${isAdmin ? '↓ User' : '↑ Admin'}</button>` : '<span style="font-size:10px;color:#334155">—</span>'}
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>`;
}

async function _adminQuickRole(userId, email, newRole) {
  if(!confirm(`Schimbi rolul lui ${email} în "${newRole}"?`)) return;
  const msg = document.getElementById('adm-msg');
  try {
    const { error } = await _supabase.rpc('set_user_role', { target_id: userId, new_role: newRole });
    if(error) throw error;
    _admMsg(msg, `✅ ${email} → ${newRole}`, 'ok');
    // Actualizăm și ADMIN_EMAILS local
    if(newRole === 'admin' && !ADMIN_EMAILS.includes(email)) ADMIN_EMAILS.push(email);
    if(newRole === 'user') { const i = ADMIN_EMAILS.indexOf(email); if(i > -1) ADMIN_EMAILS.splice(i,1); }
    setTimeout(() => _adminLoadUsers(), 600);
  } catch(e) {
    _admMsg(msg, '❌ ' + e.message, 'err');
  }
}

async function _adminSetRole() {
  const email  = document.getElementById('adm-role-email').value.trim();
  const role   = document.getElementById('adm-role-sel').value;
  const msg    = document.getElementById('adm-role-msg');
  if(!email) { _admMsg(msg, '⚠ Introduceți un email.', 'warn'); return; }

  try {
    // Găsim ID-ul userului după email
    const { data: prof, error: pErr } = await _supabase
      .from('profiles').select('id').eq('email', email).single();
    if(pErr || !prof) throw new Error('User negăsit în profiles.');

    const { error } = await _supabase.rpc('set_user_role', { target_id: prof.id, new_role: role });
    if(error) throw error;
    _admMsg(msg, `✅ ${email} setat ca ${role}`, 'ok');
    document.getElementById('adm-role-email').value = '';
    setTimeout(() => _adminLoadUsers(), 600);
  } catch(e) {
    _admMsg(msg, '❌ ' + e.message, 'err');
  }
}

// ── UNIFICAT: rol granular (cele 7+ roluri) scris în user_roles via UXRoles ──
function _admRoleOpts() {
  try {
    var R = (window.UXRoles && window.UXRoles.ROLES) || {};
    return Object.keys(R).map(function (id) { return '<option value="' + id + '">' + (R[id].label || id) + '</option>'; }).join('');
  } catch (e) { return '<option value="FULL">Acces complet</option>'; }
}
async function _adminSetGranularRole() {
  const email = (document.getElementById('adm-role-email').value || '').trim();
  const role  = document.getElementById('adm-role-sel').value;
  const msg   = document.getElementById('adm-role-msg');
  if(!email) { _admMsg(msg, '⚠ Introduceți un email.', 'warn'); return; }
  try {
    // 1) rolul granular (meniu + acces) → user_roles
    if(window.UXRoles && window.UXRoles.assignRole) { const p = window.UXRoles.assignRole(email, role); if(p && p.then) await p; }
    // 2) privilegiul de admin (panou) sincronizat: SUPER_ADMIN/ADMIN_UAT ⇒ admin; altfel user
    const wantAdmin = (role === 'SUPER_ADMIN' || role === 'ADMIN_UAT');
    try {
      const { data: prof } = await _supabase.from('profiles').select('id').eq('email', email).single();
      if(prof && prof.id) await _supabase.rpc('set_user_role', { target_id: prof.id, new_role: wantAdmin ? 'admin' : 'user' });
    } catch(e2) {}
    _admMsg(msg, `✅ ${email} → ${role}` + (wantAdmin ? ' (+ admin)' : ''), 'ok');
    document.getElementById('adm-role-email').value = '';
    setTimeout(() => _adminLoadUsers(), 600);
  } catch(e) { _admMsg(msg, '❌ ' + e.message, 'err'); }
}

async function _adminInvite() {
  const email = document.getElementById('adm-invite-email').value.trim();
  const msg   = document.getElementById('adm-invite-msg');
  if(!email || !email.includes('@')) { _admMsg(msg, '⚠ Email invalid.', 'warn'); return; }
  if(!_supabase) { _admMsg(msg, '⚠ Supabase neconfigurat.', 'warn'); return; }

  try {
    // Supabase trimite magic link / invite email
    const { error } = await _supabase.auth.admin?.inviteUserByEmail?.(email) ||
      await _supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
    if(error) throw error;
    _admMsg(msg, `✅ Invitație trimisă la ${email}`, 'ok');
    document.getElementById('adm-invite-email').value = '';
    setTimeout(() => _adminLoadUsers(), 1500);
  } catch(e) {
    // Fallback informativ dacă admin API nu e disponibil cu anon key
    _admMsg(msg, `⚠ ${e.message}. Invitați manual din Supabase Dashboard → Authentication → Users → Add user.`, 'warn');
  }
}

function _admMsg(el, txt, type) {
  if(!el) return;
  const colors = { ok: '#34d399', warn: '#fbbf24', err: '#f87171', info: '#60a5fa' };
  el.style.color = colors[type] || '#94a3b8';
  el.textContent = txt;
}

// ── TAB CONTURI DEMO (js/urbanx-demo-system.js — RPC-uri admin_*) ───────────
function _admRenderDemo(body){
  body.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">
      ${[['adm-demo-total','—','#3b82f6','Total conturi'],['adm-demo-activ','—','#34d399','Active'],
         ['adm-demo-expirat','—','#fbbf24','Expirate'],['adm-demo-revocat','—','#f87171','Revocate']].map(([id,v,c,l])=>`
        <div style="background:#080f1c;border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:12px;text-align:center">
          <div style="font-size:24px;font-weight:800;color:${c}" id="${id}">${v}</div>
          <div style="font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:.05em;margin-top:3px">${l}</div>
        </div>`).join('')}
    </div>
    <div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.07em">Conturi demo (investitori/presă/testeri)</div>
        <button onclick="_admLoadDemoAccounts()" id="adm-demo-reload-btn" style="background:rgba(45,212,191,.15);border:1px solid rgba(45,212,191,.3);color:#5eead4;border-radius:7px;padding:5px 12px;font-size:11px;cursor:pointer;font-weight:600">🔄 Reîncarcă</button>
      </div>
      <div id="adm-demo-msg" style="font-size:12px;margin-bottom:8px"></div>
      <div id="adm-demo-list" style="border:1px solid rgba(255,255,255,.08);border-radius:10px;overflow:hidden;min-height:60px">
        <div style="padding:24px;text-align:center;color:#64748b;font-size:12px">Se încarcă...</div>
      </div>
    </div>
    <div style="background:#080f1c;border:1px solid rgba(45,212,191,.15);border-radius:10px;padding:14px">
      <div style="font-size:11px;font-weight:700;color:#5eead4;text-transform:uppercase;letter-spacing:.07em;margin-bottom:10px">📊 Cele mai folosite module (toate conturile demo)</div>
      <div id="adm-demo-usage" style="font-size:11px;color:#64748b">Se încarcă...</div>
    </div>
    <div id="adm-demo-sessions-modal" style="display:none;position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.6);align-items:center;justify-content:center">
      <div style="background:#0b1220;border:1px solid rgba(255,255,255,.1);border-radius:14px;max-width:640px;width:92%;max-height:80vh;overflow:auto;padding:20px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <div style="font-size:14px;font-weight:800;color:#e6edf7">Istoric sesiuni</div>
          <button onclick="document.getElementById('adm-demo-sessions-modal').style.display='none'" style="background:none;border:none;color:#64748b;font-size:18px;cursor:pointer">×</button>
        </div>
        <div id="adm-demo-sessions-body" style="font-size:11px;color:#94a3b8"></div>
      </div>
    </div>`;
  _admLoadDemoAccounts();
  _admLoadDemoUsage();
}

async function _admLoadDemoAccounts(){
  const msg = document.getElementById('adm-demo-msg');
  const container = document.getElementById('adm-demo-list');
  const btn = document.getElementById('adm-demo-reload-btn');
  if(!_supabase){ _admMsg(msg, '⚠ Supabase neconfigurat.', 'warn'); return; }
  if(btn) btn.disabled = true;
  _admMsg(msg, '⏳ Se încarcă...', 'info');
  try{
    const { data, error } = await _supabase.rpc('admin_list_demo_accounts');
    if(error){
      const missing = error.message && (error.message.includes('Could not find') || error.code === 'PGRST202');
      if(missing){
        container.innerHTML = `<div style="padding:20px 24px;color:#fbbf24">
          <div style="font-size:13px;font-weight:700;margin-bottom:8px">⚙️ Setup SQL necesar</div>
          <div style="font-size:11px;color:#94a3b8;line-height:1.7">Funcțiile RPC pentru conturi demo nu sunt create încă. Rulează SQL-ul din
          <code style="color:#a78bfa">UrbanXDemo.setupSQL()</code> (js/urbanx-demo-system.js) în Supabase → SQL Editor.</div></div>`;
        _admMsg(msg, '⚠ RPC-uri demo lipsesc', 'warn');
      } else { _admMsg(msg, '❌ ' + error.message, 'err'); }
      return;
    }
    const rows = data || [];
    document.getElementById('adm-demo-total').textContent = rows.length;
    document.getElementById('adm-demo-activ').textContent = rows.filter(r=>r.status==='activ').length;
    document.getElementById('adm-demo-expirat').textContent = rows.filter(r=>r.status==='expirat').length;
    document.getElementById('adm-demo-revocat').textContent = rows.filter(r=>r.status==='revocat').length;
    _admRenderDemoTable(rows, container);
    _admMsg(msg, `✓ ${rows.length} conturi`, 'ok');
  } catch(e){
    _admMsg(msg, '❌ ' + e.message, 'err');
  } finally {
    if(btn) btn.disabled = false;
  }
}

function _admRenderDemoTable(rows, container){
  if(!rows.length){ container.innerHTML = '<div style="padding:24px;text-align:center;color:#64748b;font-size:12px">Niciun cont demo încă.</div>'; return; }
  const badge = (status) => {
    const map = { activ: ['#34d399','rgba(52,211,153,.12)','✓ Activ'], expirat: ['#fbbf24','rgba(251,191,36,.12)','⏳ Expirat'], revocat: ['#f87171','rgba(248,113,113,.12)','✕ Revocat'] };
    const [c,bg,l] = map[status] || ['#94a3b8','rgba(148,163,184,.12)',status];
    return `<span style="font-size:10px;background:${bg};color:${c};border-radius:999px;padding:2px 9px;font-weight:700">${l}</span>`;
  };
  container.innerHTML = `
    <table style="width:100%;border-collapse:collapse;font-size:12px">
      <thead><tr style="background:#060d18">
        ${['Contact','Organizație','Status','Zile rămase','Sesiuni','Creat','Acțiuni'].map(h=>
          `<th style="padding:9px 11px;text-align:left;color:#64748b;font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid rgba(255,255,255,.08)">${h}</th>`).join('')}
      </tr></thead>
      <tbody>
        ${rows.map(r => `
          <tr style="border-bottom:1px solid rgba(255,255,255,.04)">
            <td style="padding:9px 11px;color:#e2e8f0">
              <div style="font-weight:600">${r.nume || '—'}</div>
              <div style="color:#64748b;font-size:10px">${r.email}</div>
            </td>
            <td style="padding:9px 11px;color:#94a3b8">${r.organizatie || '—'}</td>
            <td style="padding:9px 11px">${badge(r.status)}</td>
            <td style="padding:9px 11px;color:${r.days_remaining<=3 && r.status==='activ' ? '#fbbf24' : '#e2e8f0'}">${r.status==='activ' ? r.days_remaining+'z' : '—'}</td>
            <td style="padding:9px 11px;color:#94a3b8">
              <button onclick="_admDemoShowSessions('${r.id}')" style="background:none;border:1px solid rgba(255,255,255,.12);color:#94a3b8;border-radius:6px;padding:2px 8px;font-size:10px;cursor:pointer">${r.session_count} 👁</button>
            </td>
            <td style="padding:9px 11px;color:#64748b;font-size:11px">${new Date(r.created_at).toLocaleDateString('ro-RO')}</td>
            <td style="padding:9px 11px">
              <div style="display:flex;gap:5px;flex-wrap:wrap">
                ${r.status==='activ' ? `
                  <button onclick="_admDemoAction('extend','${r.id}',7)" title="Extinde 7 zile" style="font-size:10px;padding:3px 7px;border-radius:6px;border:1px solid rgba(45,212,191,.3);background:rgba(45,212,191,.1);color:#5eead4;cursor:pointer;font-weight:600">+7z</button>
                  <button onclick="_admDemoAction('revoke','${r.id}')" title="Revocă acces" style="font-size:10px;padding:3px 7px;border-radius:6px;border:1px solid rgba(239,68,68,.3);background:rgba(239,68,68,.1);color:#f87171;cursor:pointer;font-weight:600">Revocă</button>
                ` : `
                  <button onclick="_admDemoAction('reactivate','${r.id}',14)" title="Reactivează 14 zile" style="font-size:10px;padding:3px 7px;border-radius:6px;border:1px solid rgba(212,175,55,.3);background:rgba(212,175,55,.1);color:#d4af37;cursor:pointer;font-weight:600">Reactivează</button>
                `}
              </div>
            </td>
          </tr>`).join('')}
      </tbody>
    </table>`;
}

async function _admDemoAction(kind, accountId, days){
  const msg = document.getElementById('adm-demo-msg');
  const fnMap = { extend: 'admin_extend_demo', revoke: 'admin_revoke_demo', reactivate: 'admin_reactivate_demo' };
  const labelMap = { extend: 'Extinzi', revoke: 'Revoci', reactivate: 'Reactivezi' };
  if(!confirm(`${labelMap[kind]} acest cont demo?`)) return;
  try{
    const params = { p_account_id: accountId };
    if(kind !== 'revoke') params.p_days = days;
    const { error } = await _supabase.rpc(fnMap[kind], params);
    if(error) throw error;
    _admMsg(msg, '✅ Actualizat', 'ok');
    setTimeout(() => _admLoadDemoAccounts(), 400);
  } catch(e){ _admMsg(msg, '❌ ' + e.message, 'err'); }
}

async function _admDemoShowSessions(accountId){
  const modal = document.getElementById('adm-demo-sessions-modal');
  const body = document.getElementById('adm-demo-sessions-body');
  modal.style.display = 'flex';
  body.innerHTML = 'Se încarcă...';
  try{
    const { data, error } = await _supabase.rpc('admin_demo_sessions', { p_account_id: accountId });
    if(error) throw error;
    const rows = data || [];
    if(!rows.length){ body.innerHTML = 'Niciun login încă.'; return; }
    body.innerHTML = rows.map(s => `
      <div style="border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:10px 12px;margin-bottom:8px">
        <div style="display:flex;justify-content:space-between;color:#e2e8f0;font-weight:600;margin-bottom:4px">
          <span>${new Date(s.login_at).toLocaleString('ro-RO')}</span>
          <span style="color:#64748b;font-weight:400">${s.ip || 'IP necunoscut'}</span>
        </div>
        <div style="color:#94a3b8">
          Durată: ${Math.round((s.duration_seconds||0)/60)} min ·
          Module: ${(s.modules||[]).length} ·
          Funcții: ${(s.features||[]).length} ·
          Click-uri: ${(s.clicks||[]).length} ·
          Documente: ${(s.documents||[]).reduce((a,d)=>a+(d.count||1),0)}
        </div>
      </div>`).join('');
  } catch(e){ body.innerHTML = '❌ ' + e.message; }
}

async function _admLoadDemoUsage(){
  const el = document.getElementById('adm-demo-usage');
  try{
    const { data, error } = await _supabase.rpc('admin_demo_usage_summary');
    if(error) throw error;
    const rows = data || [];
    if(!rows.length){ el.textContent = 'Fără date încă — apar după primele sesiuni demo.'; return; }
    const max = Math.max(...rows.map(r=>Number(r.uses)));
    el.innerHTML = rows.map(r => `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
        <div style="width:120px;color:#e2e8f0;font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.item}</div>
        <div style="flex:1;background:rgba(255,255,255,.05);border-radius:4px;height:8px;overflow:hidden">
          <div style="width:${Math.max(4,(r.uses/max)*100)}%;height:100%;background:#2dd4bf"></div>
        </div>
        <div style="width:24px;text-align:right;color:#64748b;font-size:11px">${r.uses}</div>
      </div>`).join('');
  } catch(e){ el.textContent = '❌ ' + e.message; }
}

// Escape închide panoul
document.addEventListener('keydown', e => { if(e.key === 'Escape') _adminClose(); });

