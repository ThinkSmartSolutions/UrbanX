// ═══════════════════════════════════════════════════════════════════════════
// tci-uat-dashboard.js — UrbanX TSS·FG
// Dashboard UAT interactiv — înlocuiește TCI clasic static
// Live indicators · Mini-charts · Alerts · Comparator inter-UAT
// ═══════════════════════════════════════════════════════════════════════════
(function(G){
'use strict';

const N=(v,d=0)=>isNaN(+v)?'—':Number(v).toLocaleString('ro-RO',{minimumFractionDigits:d,maximumFractionDigits:d});
const Pct=(v,d=1)=>isNaN(+v)?'—':(+v>=0?'+':'')+Number(v).toFixed(d)+'%';

G._UATDashboard = {

  _el: null,
  _cityKey: null,
  _liveData: null,
  _visible: false,

  async open(cityKey) {
    this._cityKey = cityKey;
    this._visible = true;

    const city = window._RO_CITIES_DB?.[cityKey];
    if(!city) { window.ss?.('⚠️ UAT negăsit: '+cityKey); return; }

    // Cream/updatam containerul
    let el = document.getElementById('uat-dashboard');
    if(!el) {
      el = document.createElement('div');
      el.id = 'uat-dashboard';
      document.body.appendChild(el);
    }
    this._el = el;
    el.innerHTML = this._renderSkeleton(city);
    el.style.cssText = `
      position:fixed; top:0; right:0; width:min(520px,100vw); height:100vh;
      background:rgba(4,10,28,.97); border-left:1px solid rgba(212,175,55,.3);
      z-index:8500; overflow-y:auto; font-family:'Courier New',monospace;
      display:flex; flex-direction:column;
      transform:translateX(0); transition:transform .3s;
    `;

    // Fetch date live
    window.ss?.('⏳ Se încarcă date live pentru ' + city.name + '…');
    this._liveData = await window._DataEngine?.fetchCityData(cityKey) || city;

    // Re-render cu date reale
    el.innerHTML = this._renderFull(this._liveData, cityKey);
    this._attachHandlers(el);
    window.ss?.('✅ Dashboard actualizat: ' + city.name);
  },

  close() {
    this._visible = false;
    const el = document.getElementById('uat-dashboard');
    if(el) { el.style.transform = 'translateX(100%)'; setTimeout(()=>el.remove(),300); }
  },

  _renderSkeleton(city) {
    return `
      <div style="padding:20px;color:#94a3b8;font-size:13px">
        <div style="color:#D4AF37;font-size:16px;font-weight:700;margin-bottom:16px">
          🏙 ${city.name} · ${city.judet||'—'}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${[...Array(6)].map(()=>`
            <div style="background:rgba(10,20,50,.8);border-radius:8px;padding:12px;flex:1;min-width:120px;
              animation:pulse 1.5s infinite">
              <div style="height:12px;background:rgba(59,130,246,.2);border-radius:4px;margin-bottom:8px"></div>
              <div style="height:20px;background:rgba(59,130,246,.1);border-radius:4px"></div>
            </div>
          `).join('')}
        </div>
        <div style="margin-top:16px;color:#475569">Se încarcă date INSE · Eurostat · OSM…</div>
      </div>
    `;
  },

  _renderFull(data, cityKey) {
    const city = data;
    const proiS2 = data.proiectii?.S2;
    const ghsl = data.ghsl;
    const poi = data.poi;
    const r = city.rata_reala_2011_2021||0;
    const pib = data.pib_eur_cap_live || city.pib_eur_cap || 0;
    const eu27 = 36600;
    const conv = Math.round(pib/eu27*100);

    // Alerte automate
    const alerts = this._generateAlerts(city, data);

    // Serie autorizatii pentru mini-chart
    const authSeries = data.autorizatii_series || {};
    const authYears = Object.keys(authSeries).sort().slice(-8);
    const authVals = authYears.map(yr=>authSeries[yr]||0);
    const authMax = Math.max(...authVals,1);

    // Serie populatie pentru mini-chart
    const popSeries = data.pop_series || {};
    const popYears = Object.keys(popSeries).sort().slice(-8);
    const popVals = popYears.map(yr=>popSeries[yr]||0);
    const popMax = Math.max(...popVals,1);
    const popMin = Math.min(...popVals);

    return `
      <!-- Header -->
      <div style="background:linear-gradient(135deg,rgba(8,14,38,.95),rgba(4,8,22,.95));
        padding:16px 20px; border-bottom:1px solid rgba(212,175,55,.2); position:sticky; top:0; z-index:2">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <div style="color:#D4AF37;font-size:18px;font-weight:700">${city.name}</div>
            <div style="color:#64748b;font-size:11px">
              Jud. ${city.judet||'—'} · SIRUTA ${city.siruta||'—'} · ${city.tip||'—'}
            </div>
          </div>
          <div style="display:flex;gap:8px;align-items:center">
            <button onclick="window._GHSLLayer?.toggle(window.map||window._map)" 
              title="Toggle Copernicus GHSL"
              style="background:rgba(59,130,246,.15);border:1px solid rgba(59,130,246,.4);
                color:#60a5fa;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:11px">
              🛰 GHSL
            </button>
            <button onclick="window._UATDashboard.close()"
              style="background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);
                color:#ef4444;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:16px">
              ✕
            </button>
          </div>
        </div>
      </div>

      <div style="padding:16px;display:flex;flex-direction:column;gap:14px">

        <!-- Alerte -->
        ${alerts.length ? `
          <div style="display:flex;flex-direction:column;gap:6px">
            ${alerts.map(a=>`
              <div style="background:rgba(${a.color},0.12);border:1px solid rgba(${a.color},0.35);
                border-radius:8px;padding:8px 12px;display:flex;gap:8px;align-items:flex-start">
                <span style="font-size:14px">${a.icon}</span>
                <div>
                  <div style="color:rgb(${a.color});font-weight:700;font-size:11px">${a.title}</div>
                  <div style="color:#94a3b8;font-size:10px">${a.text}</div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- KPI Grid -->
        <div>
          <div style="color:#D4AF37;font-size:11px;font-weight:700;letter-spacing:.08em;
            margin-bottom:8px">INDICATORI CHEIE · INSE 2021 + DATE LIVE</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
            ${[
              { l:'Populație 2021', v:N(city.pop2021), sub:'INSE Rec.2021', trend:r>=0?'↑':'↓', tc:r>=0?'#22c55e':'#ef4444' },
              { l:'Creștere an.', v:Pct(r,2), sub:'2011-2021 calibrat', trend:r>=0?'🟢':'🔴', tc:r>=0?'#22c55e':'#ef4444' },
              { l:'PIB/cap', v:pib?N(pib)+' €':'—', sub:'Eurostat NUTS3', trend:conv+'% UE27', tc:conv>=75?'#60a5fa':'#f59e0b' },
              { l:'Autorizații/an', v:N(city.autorizatii_2023||authVals.slice(-1)[0]||'—'), sub:'ANCPI 2023', trend:'', tc:'#94a3b8' },
              { l:'Suprafață construită', v:(data.ghsl_density?.km2_construit||'—')+' km²', sub:'GHSL 2020', trend:'', tc:'#94a3b8' },
              { l:'Score gravitație', v:((data.gravityScore||0.5)*100).toFixed(0)+'/100', sub:'OSM Overpass', trend:'', tc:'#60a5fa' },
            ].map(k=>`
              <div style="background:rgba(10,20,50,.8);border-radius:8px;padding:10px 12px;
                border:1px solid rgba(30,58,138,.4)">
                <div style="color:#64748b;font-size:10px">${k.l}</div>
                <div style="color:${k.tc||'#c8d7f0'};font-size:16px;font-weight:700">${k.v}</div>
                <div style="display:flex;justify-content:space-between;margin-top:2px">
                  <span style="color:#475569;font-size:9px">${k.sub}</span>
                  <span style="color:${k.tc||'#94a3b8'};font-size:9px">${k.trend}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Mini-chart Autorizatii -->
        ${authVals.length>=3 ? `
          <div style="background:rgba(8,14,38,.8);border-radius:8px;padding:12px;
            border:1px solid rgba(30,58,138,.4)">
            <div style="display:flex;justify-content:space-between;margin-bottom:8px">
              <span style="color:#94a3b8;font-size:11px;font-weight:700">AUTORIZAȚII CONSTRUIRE/AN</span>
              <span style="color:#64748b;font-size:10px">Sursa: ANCPI CON101A</span>
            </div>
            <div style="display:flex;align-items:flex-end;gap:3px;height:48px">
              ${authVals.map((v,i)=>`
                <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px">
                  <div style="width:100%;background:rgba(59,130,246,.7);border-radius:2px 2px 0 0;
                    height:${Math.round(v/authMax*44)}px;transition:height .3s"
                    title="${authYears[i]}: ${N(v)} auth."></div>
                  <span style="color:#475569;font-size:8px">${authYears[i]?.slice(2)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Mini-chart Populatie -->
        ${popVals.length>=3 ? `
          <div style="background:rgba(8,14,38,.8);border-radius:8px;padding:12px;
            border:1px solid rgba(30,58,138,.4)">
            <div style="display:flex;justify-content:space-between;margin-bottom:8px">
              <span style="color:#94a3b8;font-size:11px;font-weight:700">EVOLUȚIE POPULAȚIE</span>
              <span style="color:#64748b;font-size:10px">Sursa: INSE POP107D</span>
            </div>
            <svg viewBox="0 0 200 50" width="100%" height="50" style="overflow:visible">
              <polyline points="${popVals.map((v,i)=>
                `${i*(200/(popVals.length-1))},${50-((v-popMin)/(popMax-popMin||1))*46}`
              ).join(' ')}" fill="none" stroke="#22c55e" stroke-width="2"/>
              ${popVals.map((v,i)=>`<circle cx="${i*(200/(popVals.length-1))}" cy="${50-((v-popMin)/(popMax-popMin||1))*46}" r="2.5" fill="#22c55e"/>`).join('')}
            </svg>
            <div style="display:flex;justify-content:space-between;margin-top:2px">
              <span style="color:#475569;font-size:9px">${popYears[0]}</span>
              <span style="color:#22c55e;font-size:10px">${N(popVals.slice(-1)[0])} loc.</span>
              <span style="color:#475569;font-size:9px">${popYears.slice(-1)[0]}</span>
            </div>
          </div>
        ` : ''}

        <!-- Proiectii 2055 -->
        ${proiS2 ? `
          <div>
            <div style="color:#D4AF37;font-size:11px;font-weight:700;letter-spacing:.08em;
              margin-bottom:8px">PROIECȚII 2025-2055 · COHORT-COMPONENT + EUROSTAT</div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">
              ${['S1','S2','S3'].map(sc=>{
                const p = data.proiectii?.[sc];
                const col = sc==='S1'?'#22c55e':sc==='S2'?'#60a5fa':'#f59e0b';
                const label = sc==='S1'?'Optimist':sc==='S2'?'Moderat':'Conservator';
                return `
                  <div style="background:rgba(10,20,50,.8);border-radius:8px;padding:10px;
                    border:1px solid rgba(30,58,138,.4);text-align:center">
                    <div style="color:${col};font-size:10px;font-weight:700">${sc} ${label}</div>
                    <div style="color:#c8d7f0;font-size:14px;font-weight:700;margin:4px 0">
                      ${N(p?.pop2055)}
                    </div>
                    <div style="color:${+p?.years?.slice(-1)[0]?.delta_pct>=0?'#22c55e':'#ef4444'};font-size:10px">
                      ${Pct(p?.years?.slice(-1)[0]?.delta_pct,1)}
                    </div>
                    <div style="color:#475569;font-size:9px">vs. 2025</div>
                  </div>
                `;
              }).join('')}
            </div>
            <div style="color:#475569;font-size:9px;margin-top:6px;text-align:center">
              ${proiS2.metodologie} · ${proiS2.calibrare}
            </div>
          </div>
        ` : ''}

        <!-- Locuinte necesare -->
        ${proiS2?.locuinteNecesare ? `
          <div style="background:rgba(8,14,38,.8);border-radius:8px;padding:12px;
            border:1px solid rgba(212,175,55,.2)">
            <div style="color:#D4AF37;font-size:11px;font-weight:700;margin-bottom:8px">
              NECESAR LOCUINȚE 2025-2055 · Scenariu S2 Moderat
            </div>
            ${[
              ['Locuințe noi (din creștere pop.)', proiS2.locuinteNecesare.noi, '#60a5fa'],
              ['Reînnoire fond uzat moral', proiS2.locuinteNecesare.reinnoire_fond_uzat, '#f59e0b'],
              ['TOTAL', proiS2.locuinteNecesare.total, '#D4AF37'],
              ['Per an (medie)', proiS2.locuinteNecesare.per_an, '#22c55e'],
            ].map(([l,v,c])=>`
              <div style="display:flex;justify-content:space-between;padding:4px 0;
                border-bottom:1px solid rgba(30,58,138,.3)">
                <span style="color:#94a3b8;font-size:11px">${l}</span>
                <span style="color:${c};font-size:12px;font-weight:700">${N(v)} unit.</span>
              </div>
            `).join('')}
            <div style="color:#475569;font-size:9px;margin-top:6px">
              ${proiS2.locuinteNecesare.nota}
            </div>
          </div>
        ` : ''}

        <!-- Infrastructura OSM -->
        ${poi ? `
          <div style="background:rgba(8,14,38,.8);border-radius:8px;padding:12px;
            border:1px solid rgba(30,58,138,.4)">
            <div style="color:#94a3b8;font-size:11px;font-weight:700;margin-bottom:8px">
              INFRASTRUCTURĂ URBANĂ · OSM · raza 2km
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">
              ${[
                ['🏫','Școli',poi.scoli,'scoli'],
                ['🏥','Spitale',poi.spitale,'spitale'],
                ['🚌','Stații TP',poi.transport,'transport'],
                ['🎓','Univers.',poi.universitati,'universitati'],
                ['🌳','Parcuri',poi.parcuri,'parcuri'],
                ['🛒','Supermark.',poi.supermarketuri,'supermarketuri'],
                ['🏛️','Monumente',poi.monumente,'monumente'],
                ['🎭','Turism',poi.turism,'turism'],
                ['🖼️','Muzee',poi.muzee,'muzee'],
                ['🐕','Parc câini',poi.caini,'caini'],
                ['🚲','Piste bike',poi.ciclism,'ciclism'],
              ].map(([icon,l,v,key])=>`
                <div onclick="window._InfraMap&&window._InfraMap.show('${key}')" title="Click — afișează ${l} pe hartă (OSM)"
                  style="text-align:center;background:rgba(15,25,60,.8);border-radius:6px;padding:6px;cursor:pointer;transition:background .15s"
                  onmouseover="this.style.background='rgba(40,70,140,.9)'" onmouseout="this.style.background='rgba(15,25,60,.8)'">
                  <div style="font-size:16px">${icon}</div>
                  <div style="color:#c8d7f0;font-size:13px;font-weight:700">${v||0}</div>
                  <div style="color:#475569;font-size:9px">${l} ▸</div>
                </div>
              `).join('')}
            </div>
            <div style="color:#475569;font-size:9px;margin-top:4px;text-align:center">click pe un card → afișare pe hartă</div>
            <div style="color:#475569;font-size:9px;margin-top:6px">
              OSM Overpass · ${poi.source} · ${new Date(poi.timestamp).toLocaleDateString('ro-RO')}
            </div>
          </div>
        ` : ''}

        <!-- GHSL trend -->
        ${ghsl ? `
          <div style="background:rgba(8,14,38,.8);border-radius:8px;padding:12px;
            border:1px solid rgba(30,58,138,.4)">
            <div style="display:flex;justify-content:space-between;margin-bottom:8px">
              <span style="color:#94a3b8;font-size:11px;font-weight:700">
                🛰 SUPRAFAȚĂ CONSTRUITĂ 1975→2055
              </span>
              <button onclick="window._GHSLLayer?.toggle(window.map||window._map)"
                style="background:rgba(59,130,246,.15);border:1px solid rgba(59,130,246,.4);
                  color:#60a5fa;padding:3px 8px;border-radius:4px;cursor:pointer;font-size:10px">
                Hartă →
              </button>
            </div>
            <div style="display:flex;align-items:flex-end;gap:4px;height:40px;margin-bottom:6px">
              ${ghsl.historical.map((h,i)=>{
                const maxKm2 = Math.max(...ghsl.historical.map(x=>x.km2));
                return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:1px">
                  <div style="width:100%;background:rgba(59,130,246,.7);border-radius:2px 2px 0 0;
                    height:${Math.round(h.km2/maxKm2*36)}px" title="${h.year}: ${h.km2}km²"></div>
                  <span style="color:#475569;font-size:7px">${h.year}</span>
                </div>`;
              }).join('')}
              ${Object.entries(ghsl.forecast).map(([yr,km2])=>{
                const maxKm2 = Math.max(...ghsl.historical.map(x=>x.km2),...Object.values(ghsl.forecast));
                return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:1px">
                  <div style="width:100%;background:rgba(212,175,55,.5);border-radius:2px 2px 0 0;
                    border:1px dashed rgba(212,175,55,.4);
                    height:${Math.round(km2/maxKm2*36)}px" title="${yr}: ${km2}km² (prognoză)"></div>
                  <span style="color:#D4AF37;font-size:7px">${yr}</span>
                </div>`;
              }).join('')}
            </div>
            <div style="color:#475569;font-size:9px">${ghsl.source}</div>
            <div style="color:#475569;font-size:8px;margin-top:2px">${ghsl.citation}</div>
          </div>
        ` : ''}

        <!-- Convergenta UE -->
        <div style="background:rgba(8,14,38,.8);border-radius:8px;padding:12px;
          border:1px solid rgba(30,58,138,.4)">
          <div style="color:#94a3b8;font-size:11px;font-weight:700;margin-bottom:8px">
            POZIȚIONARE · CONVERGENȚĂ UE
          </div>
          ${(()=>{
            const convData = window._DataEngine?.calcEUConvergence(city, data);
            if(!convData) return '';
            const pct = convData.pct_eu27;
            const col = pct<75?'#f59e0b':pct<100?'#60a5fa':'#22c55e';
            return `
              <div style="margin-bottom:8px">
                <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                  <span style="color:#94a3b8;font-size:10px">PIB/cap față de media UE-27</span>
                  <span style="color:${col};font-weight:700">${pct}%</span>
                </div>
                <div style="background:rgba(15,25,60,.8);border-radius:4px;height:8px;overflow:hidden">
                  <div style="background:${col};height:100%;width:${Math.min(pct,100)}%;border-radius:4px;
                    transition:width 1s"></div>
                </div>
                <div style="color:#64748b;font-size:10px;margin-top:4px">${convData.categorie}</div>
              </div>
              <div style="display:flex;justify-content:space-between;padding:6px;
                background:rgba(${pct<75?'245,158,11':pct<100?'59,130,246':'34,197,94'},.08);
                border-radius:6px;border:1px solid rgba(${pct<75?'245,158,11':pct<100?'59,130,246':'34,197,94'},.2)">
                <span style="color:#94a3b8;font-size:10px">Rata co-finanțare FEDR</span>
                <span style="color:${col};font-weight:700;font-size:12px">${convData.fonduri_ue_rate}%</span>
              </div>
            `;
          })()}
          <div style="color:#475569;font-size:9px;margin-top:6px">
            Eurostat NUTS3 · nama_10r_3gdp · Media UE27: 36.600 EUR/cap (2023)
          </div>
        </div>

        <!-- Actiuni -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          ${[
            ['📋 Masterplan PDF','generateMasterplan?.()','rgba(212,175,55,.08)','#D4AF37'],
            ['📊 Export PPTX','generatePPTX?.()','rgba(96,165,250,.08)','#60a5fa'],
            ['🎬 Film Cinematic','_launchCinemaV2?.()','rgba(167,139,250,.08)','#a78bfa'],
            ['⚖️ Matrice Avize','showAvize?.()','rgba(245,158,11,.08)','#f59e0b'],
          ].map(([l,fn,bg,col])=>`
            <button onclick="${fn}"
              style="background:${bg};border:1px solid ${col.replace('#','rgba(').replace(/$/,', .3)')};
                color:${col};padding:10px;border-radius:8px;cursor:pointer;
                font-size:12px;font-weight:700;font-family:inherit">
              ${l}
            </button>
          `).join('')}
        </div>

        <!-- Footer surse -->
        <div style="color:#334155;font-size:9px;text-align:center;padding-bottom:8px">
          Surse: INSE TEMPO-INS · Eurostat NUTS3 · OSM Overpass API · Copernicus GHSL R2023A<br>
          Model: Cohort-Component ONU WPP adaptat · Lowry(1964) gravitational<br>
          Date actualizate: ${new Date().toLocaleString('ro-RO')}
        </div>

      </div>
    `;
  },

  _generateAlerts(city, data) {
    const alerts = [];
    const r = city.rata_reala_2011_2021||0;
    const proiS2 = data.proiectii?.S2;
    const auth = city.autorizatii_2023||0;
    const necesar = proiS2?.locuinteNecesare?.per_an||0;

    // Alerta presiune demografica
    if(r > 1.0) {
      alerts.push({
        icon:'⚡', color:'239,68,68',
        title:'PRESIUNE DEMOGRAFICĂ RIDICATĂ',
        text:`Creștere de +${r.toFixed(2)}%/an (2011-2021). Infrastructura existentă riscă saturare la 2031-2035.`
      });
    } else if(r < -0.5) {
      alerts.push({
        icon:'📉', color:'245,158,11',
        title:'DECLIN DEMOGRAFIC DETECTAT',
        text:`Scădere de ${r.toFixed(2)}%/an. Risc de fond construit neocupat >10% la 2035.`
      });
    }

    // Alerta decalaj autorizatii vs necesar
    if(auth>0 && necesar>0 && auth < necesar*0.6) {
      alerts.push({
        icon:'🏗', color:'245,158,11',
        title:'RITM AUTORIZARE SUB NECESAR',
        text:`${N(auth)} auth/an față de ${N(necesar)} necesar/an. Deficit cumulat la 2055: ${N((necesar-auth)*30)} unități.`
      });
    } else if(auth>0 && necesar>0 && auth > necesar*1.5) {
      alerts.push({
        icon:'⚠️', color:'239,68,68',
        title:'CONSTRUIRE ACCELERATĂ — RISC INFRASTRUCTURĂ',
        text:`${N(auth)} auth/an depășește semnificativ necesarul demografic. Verificați capacitatea rețelelor.`
      });
    }

    // Alerta spatii verzi
    const spV = city.spatii_verzi_mp_loc||0;
    if(spV>0 && spV<9) {
      alerts.push({
        icon:'🌳', color:'34,197,94',
        title:'SUB STANDARDUL OMS SPAȚII VERZI',
        text:`${spV}m²/loc față de minimul OMS de 9m²/loc. Necesitate urgentă de spații verzi suplimentare.`
      });
    }

    return alerts;
  },

  _attachHandlers(el) {
    // GHSL init
    const map = window.map||window._map;
    if(map && window._GHSLLayer) {
      window._GHSLLayer.init(map, this._cityKey);
    }
  }
};

// Expunem global
window._UATDashboard = G._UATDashboard;

// Hook pe TCI — cand se selecteaza un UAT, deschidem dashboard-ul automat (optional)
window._launchUATDashboard = function(cityKey) {
  const k = cityKey || window.TCI?.cityKey || localStorage.getItem('ux_last_city') || 'RO-IS-01';
  window._UATDashboard.open(k);
};

console.log('[UrbanX] UAT Dashboard v1.0 init: live indicators + mini-charts + alerts');
})(window);
