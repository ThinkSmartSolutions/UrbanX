// ═══════════════════════════════════════════════════════════════════════════
// urbanx-compare-pro.js — UrbanX Advanced Urban Tools v1.0
// 19 mai 2026 | ThinkSmart Solutions SRL
// ① URBAN COMPARE PRO  ② PLANNING SCORE  ③ PRESENTATION MODE
// ═══════════════════════════════════════════════════════════════════════════

(function(G) {
'use strict';

const N=(v,d=0)=>isNaN(+v)?'—':Number(v).toLocaleString('ro-RO',{minimumFractionDigits:d,maximumFractionDigits:d});
const Pct=(v,d=1)=>(v>=0?'+':'')+Number(v).toFixed(d)+'%';

// ═══════════════════════════════════════════════════════════════════════════
// ① URBAN COMPARE PRO — 2-5 UAT-uri, 20 indicatori, radar, gap analysis
// ═══════════════════════════════════════════════════════════════════════════

G._CompareProEngine = {
  _cities: [],

  INDICATORS: [
    {id:'pop21',    label:'Populație 2021',    unit:'loc',    dir:1,  src:'INSE Rec.2021'},
    {id:'rata',     label:'Rată creștere',     unit:'%/an',   dir:1,  src:'INSE 2011-2021'},
    {id:'pib',      label:'PIB/cap',           unit:'EUR',    dir:1,  src:'Eurostat 2022'},
    {id:'densit',   label:'Densitate',         unit:'loc/km²',dir:1,  src:'INSE Rec.2021'},
    {id:'auth',     label:'Autorizații/an',    unit:'nr',     dir:1,  src:'ANCPI 2023'},
    {id:'spverzi',  label:'Spații verzi',      unit:'m²/loc', dir:1,  src:'Primărie'},
    {id:'transport',label:'Acoperire TP',      unit:'%',      dir:1,  src:'Operator'},
    {id:'walk',     label:'Walkability est.',  unit:'/100',   dir:1,  src:'UrbanX/OSM'},
    {id:'seismic',  label:'Risc seismic',      unit:'Ag',     dir:-1, src:'INFP P100'},
    {id:'flood',    label:'Risc inundații',    unit:'0-3',    dir:-1, src:'ANAR PGRA'},
    {id:'uhi',      label:'UHI ΔT',            unit:'°C',     dir:-1, src:'Copernicus'},
    {id:'sdg11',    label:'SDG 11 Score',      unit:'/100',   dir:1,  src:'ONU 2030'},
    {id:'convergUE',label:'Convergență UE',    unit:'%',      dir:1,  src:'Eurostat'},
    {id:'co2',      label:'CO₂ fond clăd.',    unit:'kg/m²',  dir:-1, src:'ICE DB v3'},
    {id:'scolDef',  label:'Deficit școlar',    unit:'elevi',  dir:-1, src:'INS+INSE'},
    {id:'medDef',   label:'Deficit medical',   unit:'paturi', dir:-1, src:'INSP 2023'},
    {id:'intravilan',label:'Expansiune intrav.',unit:'ha/an', dir:-1, src:'GHSL R2023'},
    {id:'gravity',  label:'Scor gravitațional',unit:'/100',   dir:1,  src:'UrbanX model'},
    {id:'pnrr',     label:'Eligib. PNRR',      unit:'/5',     dir:1,  src:'MDLPA 2024'},
    {id:'pop55',    label:'Populație 2055',     unit:'loc',    dir:1,  src:'Model UrbanX'},
  ],

  NATIONAL_AVG: {
    pop21:320000,rata:-0.6,pib:11800,densit:850,auth:420,
    spverzi:11,transport:62,walk:52,seismic:0.20,flood:1.2,
    uhi:2.1,sdg11:61,convergUE:72,co2:420,scolDef:180,
    medDef:95,intravilan:8,gravity:55,pnrr:2.8,pop55:290000,
  },

  EU_AVG: {
    spverzi:16,transport:78,walk:71,seismic:0.12,uhi:1.8,
    sdg11:74,convergUE:100,co2:310,gravity:68,
  },

  extractIndicators(city) {
    const pop=city.pop2021||100000;
    const r=city.rata_reala_2011_2021||0;
    const grav=window._TCIMasterplanPDF?._calcGravity?.(city)||{gravityScore:0.5};
    const risk=typeof _getRiskProfile==='function'?_getRiskProfile(city):null;
    const need=window._TCIMasterplanPDF?._calcNeed?.(city,'S2')||{pop2055:pop,locuinteTotale:5000};
    return {
      pop21:pop, rata:r, pib:city.pib_eur_cap||10000,
      densit:Math.round(pop/(city.suprafata_ha||Math.max(100,pop/14))*100),
      auth:city.autorizatii_2023||Math.round(pop/400),
      spverzi:city.spatii_verzi_mp_loc||11,
      transport:city.acoperire_transport||60,
      walk:Math.round((city.pib_eur_cap||8000)/300+(city.acoperire_transport||60)*0.3),
      seismic:risk?.seismic?.ag||0.20,
      flood:risk?.flood?.risk||1.0,
      uhi:Math.min(5,2.0+Math.max(0,pop-50000)/100000),
      sdg11:Math.round(50+(grav.gravityScore||0.5)*40+Math.max(0,r)*5),
      convergUE:Math.round(Math.min(100,(city.pib_eur_cap||8000)/365*100)),
      co2:Math.round(450-(city.spatii_verzi_mp_loc||11)*5),
      scolDef:Math.max(0,Math.round(pop*0.14/400-pop*0.155/400)*(-400)),
      medDef:Math.max(0,Math.round(pop*0.25/1500-pop*0.218/1500)*(-50)),
      intravilan:Math.round((city.suprafata_ha||pop/14)*0.006*(1+Math.max(0,r)/100*20)),
      gravity:Math.round((grav.gravityScore||0.5)*100),
      pnrr:Math.round(2+(risk?.seismic?.ag||0.2)*5+Math.max(0,-r)*1.5),
      pop55:need.pop2055,
    };
  },

  normalize(val,ind) {
    const avg=this.NATIONAL_AVG[ind.id]||1;
    const norm=Math.min(100,Math.max(0,(val/avg)*50));
    return ind.dir===-1?100-norm:norm;
  },

  gapAnalysis(cityKey) {
    const entry=this._cities.find(c=>c.key===cityKey);
    if(!entry) return [];
    return this.INDICATORS.map(i=>{
      const val=entry.indicators[i.id]??this.NATIONAL_AVG[i.id];
      const avg=this.NATIONAL_AVG[i.id];
      const gap=((val-avg)/avg*100);
      const good=(i.dir===1&&gap>0)||(i.dir===-1&&gap<0);
      return {...i,val,avg,gap,good,status:Math.abs(gap)<10?'🟡':good?'🟢':'🔴'};
    });
  },

  generateNarrative(cityKey) {
    const entry=this._cities.find(c=>c.key===cityKey);
    if(!entry) return '';
    const {city,indicators:ind}=entry;
    const reasons=[];
    if(ind.rata>1) reasons.push(`creștere +${ind.rata.toFixed(1)}%/an — pol de atracție regional`);
    if(ind.rata<-0.5) reasons.push(`declin ${ind.rata.toFixed(1)}%/an — emigrare forță muncă`);
    if(ind.pib>15000) reasons.push(`PIB/cap ${N(ind.pib)} EUR — pol economic puternic`);
    if(ind.pib<8000) reasons.push(`PIB/cap ${N(ind.pib)} EUR — sub media națională`);
    if(ind.auth>600) reasons.push(`${N(ind.auth)} autorizații/an — presiune construire intensă`);
    if(ind.seismic>0.25) reasons.push(`Ag=${ind.seismic}g — zonă seismică I (P100)`);
    if(city.coef_hub>1.0) reasons.push(`hub universitar/economic — magnet regional`);
    return reasons.length
      ? `${city.name}: ${reasons.slice(0,3).join('; ')}.`
      : `${city.name}: profil urban echilibrat.`;
  },

  addCity(cityKey) {
    const city=window._RO_CITIES_DB?.[cityKey];
    if(!city||this._cities.find(c=>c.key===cityKey)) return false;
    if(this._cities.length>=5) {ss?.('Maximum 5 UAT-uri');return false;}
    this._cities.push({key:cityKey,city,indicators:this.extractIndicators(city)});
    this.render(); return true;
  },

  removeCity(cityKey) {
    this._cities=this._cities.filter(c=>c.key!==cityKey);
    this.render();
  },

  render() {
    let panel=document.getElementById('compare-pro-panel');
    if(!panel){
      panel=document.createElement('div');
      panel.id='compare-pro-panel';
      panel.style.cssText=`position:fixed;inset:0;z-index:5000;background:rgba(2,6,18,.97);
        backdrop-filter:blur(16px);display:flex;flex-direction:column;
        font-family:'IBM Plex Mono','Space Grotesk',sans-serif;overflow:hidden;`;
      document.body.appendChild(panel);
    }
    if(!this._cities.length){panel.style.display='none';return;}
    panel.style.display='flex';
    panel.innerHTML=this._buildHTML();
  },

  _buildHTML() {
    const cities=this._cities;
    const COLORS=['#D4AF37','#60a5fa','#22c55e','#f97316','#a78bfa'];
    return `
      <div style="display:flex;align-items:center;justify-content:space-between;
        padding:12px 20px;border-bottom:1px solid rgba(255,255,255,.08);flex-shrink:0">
        <div>
          <div style="font-size:11px;font-weight:800;color:#D4AF37;letter-spacing:.15em">🏙 URBAN COMPARE PRO</div>
          <div style="font-size:8px;color:rgba(148,163,184,.5)">${cities.length} UAT-uri · 20 indicatori · INSE · Eurostat · BNR · INFP</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button onclick="_PresentationMode.open(_CompareProEngine._cities[0]?.key,_CompareProEngine._cities)"
            style="padding:5px 12px;border-radius:6px;background:rgba(139,92,246,.12);
              border:1px solid rgba(139,92,246,.3);color:#a78bfa;font-size:10px;cursor:pointer;font-family:inherit">
            🎯 Prezentare
          </button>
          <button onclick="document.getElementById('compare-pro-panel').style.display='none'"
            style="padding:5px 10px;border-radius:6px;background:rgba(255,255,255,.04);
              border:1px solid rgba(255,255,255,.1);color:rgba(148,163,184,.6);font-size:12px;cursor:pointer">✕</button>
        </div>
      </div>
      <div style="display:flex;gap:8px;padding:10px 20px;flex-shrink:0;flex-wrap:wrap;border-bottom:1px solid rgba(255,255,255,.05)">
        ${cities.map((c,i)=>`
          <div style="display:flex;align-items:center;gap:6px;padding:4px 10px;border-radius:20px;
            background:rgba(${['212,175,55','59,130,246','34,197,94','249,115,22','139,92,246'][i]},.12);
            border:1px solid ${COLORS[i]}40">
            <span style="width:8px;height:8px;border-radius:50%;background:${COLORS[i]};display:inline-block"></span>
            <span style="font-size:10px;font-weight:700;color:${COLORS[i]}">${c.city.name}</span>
            <button onclick="_CompareProEngine.removeCity('${c.key}')"
              style="background:none;border:none;color:rgba(148,163,184,.4);cursor:pointer;font-size:11px;padding:0 2px">✕</button>
          </div>`).join('')}
        ${cities.length<5?`
          <button onclick="_CompareProEngine._showAddCity()"
            style="padding:4px 12px;border-radius:20px;background:rgba(255,255,255,.04);
              border:1px dashed rgba(255,255,255,.2);color:rgba(148,163,184,.5);font-size:10px;cursor:pointer;font-family:inherit">
            + Adaugă UAT
          </button>`:''}
      </div>
      <div style="display:grid;grid-template-columns:280px 1fr;flex:1;overflow:hidden">
        <div style="padding:15px;border-right:1px solid rgba(255,255,255,.06);overflow-y:auto">
          <div style="font-size:8px;font-weight:700;color:rgba(148,163,184,.5);margin-bottom:8px">RADAR — 8 INDICATORI CHEIE</div>
          ${this._buildRadar(cities,COLORS)}
          <div style="margin-top:12px">
            <div style="font-size:8px;font-weight:700;color:rgba(148,163,184,.5);margin-bottom:6px">ANALIZĂ DINAMICĂ</div>
            ${cities.map((c,i)=>`
              <div style="background:rgba(8,14,34,.6);border-radius:6px;padding:7px;margin-bottom:5px;border-left:2px solid ${COLORS[i]}">
                <div style="font-size:8px;font-weight:700;color:${COLORS[i]};margin-bottom:3px">${c.city.name}</div>
                <div style="font-size:7px;color:rgba(148,163,184,.7);line-height:1.5">${this.generateNarrative(c.key)}</div>
              </div>`).join('')}
          </div>
        </div>
        <div style="overflow-y:auto;padding:15px">
          <div style="font-size:8px;font-weight:700;color:rgba(148,163,184,.5);margin-bottom:8px">TABEL COMPARATIV — 20 INDICATORI</div>
          <div style="display:grid;grid-template-columns:140px ${cities.map(()=>'1fr').join(' ')} 80px;gap:2px;margin-bottom:4px;
            position:sticky;top:0;background:rgba(2,6,18,.97);z-index:1;padding-bottom:4px">
            <div style="font-size:7px;color:rgba(100,120,150,.5)">INDICATOR</div>
            ${cities.map((c,i)=>`<div style="font-size:8px;font-weight:700;color:${COLORS[i]};text-align:center">${c.city.name.slice(0,12)}</div>`).join('')}
            <div style="font-size:7px;color:rgba(100,120,150,.5);text-align:center">Media RO</div>
          </div>
          ${this.INDICATORS.map(ind=>{
            const vals=cities.map(c=>c.indicators[ind.id]??this.NATIONAL_AVG[ind.id]);
            const best=ind.dir===1?Math.max(...vals):Math.min(...vals);
            const avg=this.NATIONAL_AVG[ind.id];
            const fmt=v=>v==null?'—':ind.id==='rata'?Pct(v):ind.id==='seismic'?Number(v).toFixed(2)+'g':N(v);
            return `<div style="display:grid;grid-template-columns:140px ${cities.map(()=>'1fr').join(' ')} 80px;
              gap:2px;margin-bottom:1px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,.03)">
              <div>
                <div style="font-size:7.5px;color:rgba(148,163,184,.8)">${ind.label}</div>
                <div style="font-size:6px;color:rgba(100,120,150,.4)">${ind.unit} · ${ind.src}</div>
              </div>
              ${vals.map((v,i)=>{
                const isBest=v===best;
                const vsAvg=avg?((v-avg)/avg*100):0;
                const isGood=(ind.dir===1&&vsAvg>0)||(ind.dir===-1&&vsAvg<0);
                return `<div style="text-align:center;padding:2px">
                  <div style="font-size:9px;font-weight:${isBest?'900':'600'};color:${isBest?COLORS[i]:'rgba(200,215,235,.7)'};font-family:'IBM Plex Mono'">${fmt(v)}</div>
                  <div style="font-size:6px;color:${isGood?'rgba(34,197,94,.6)':'rgba(239,68,68,.5)'}">${avg?Pct(vsAvg,0):''}</div>
                </div>`;}).join('')}
              <div style="text-align:center;font-size:8px;color:rgba(148,163,184,.4);font-family:'IBM Plex Mono'">${fmt(avg)}</div>
            </div>`;}).join('')}
          ${cities.length>0?`
          <div style="margin-top:16px">
            <div style="font-size:8px;font-weight:700;color:rgba(148,163,184,.5);margin-bottom:8px">
              GAP ANALYSIS — ${cities[0].city.name} vs Media Națională
            </div>
            ${this.gapAnalysis(cities[0].key).map(g=>`
              <div style="display:flex;align-items:center;gap:6px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,.03)">
                <span style="font-size:10px">${g.status}</span>
                <span style="flex:1;font-size:7.5px;color:rgba(148,163,184,.8)">${g.label}</span>
                <span style="font-size:7.5px;font-weight:700;color:${g.good?'#22c55e':'#ef4444'};font-family:'IBM Plex Mono'">
                  ${g.gap>=0?'+':''}${g.gap.toFixed(0)}% vs RO
                </span>
              </div>`).join('')}
          </div>`:''}
        </div>
      </div>
      <div id="compare-add-modal" style="display:none;position:absolute;inset:0;z-index:5100;
        background:rgba(0,0,0,.7);align-items:center;justify-content:center">
        <div style="background:rgba(4,10,24,.98);border-radius:12px;padding:20px;width:400px;border:1px solid rgba(212,175,55,.3)">
          <div style="font-size:11px;font-weight:800;color:#D4AF37;margin-bottom:10px">Alege UAT pentru comparație</div>
          <input id="compare-search-input" type="text" placeholder="Caută municipiu/oraș..."
            oninput="_CompareProEngine._filterCities(this.value)"
            style="width:100%;padding:8px 12px;background:rgba(8,16,40,.8);border:1px solid rgba(255,255,255,.1);
              color:#e2e8f0;border-radius:6px;font-size:11px;font-family:'IBM Plex Mono',monospace;box-sizing:border-box">
          <div id="compare-search-results" style="margin-top:8px;max-height:220px;overflow-y:auto"></div>
          <button onclick="document.getElementById('compare-add-modal').style.display='none'"
            style="margin-top:10px;width:100%;padding:7px;border-radius:6px;background:transparent;
              border:1px solid rgba(255,255,255,.1);color:rgba(148,163,184,.6);font-size:10px;cursor:pointer;font-family:inherit">Anulează</button>
        </div>
      </div>`;
  },

  _buildRadar(cities,colors) {
    if(!cities.length) return '';
    const SZ=260,cx=130,cy=130,R=95;
    const inds=this.INDICATORS.slice(0,8);
    const step=(Math.PI*2)/8;
    let svg=`<svg width="${SZ}" height="${SZ}" xmlns="http://www.w3.org/2000/svg">`;
    [25,50,75,100].forEach(r=>{svg+=`<circle cx="${cx}" cy="${cy}" r="${R*r/100}" fill="none" stroke="rgba(255,255,255,.05)" stroke-width="0.5"/>`;});
    inds.forEach((_,i)=>{
      const a=i*step-Math.PI/2;
      svg+=`<line x1="${cx}" y1="${cy}" x2="${cx+R*Math.cos(a)}" y2="${cy+R*Math.sin(a)}" stroke="rgba(255,255,255,.1)" stroke-width="0.5"/>`;
      const lx=cx+(R+16)*Math.cos(a),ly=cy+(R+16)*Math.sin(a);
      svg+=`<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" fill="rgba(148,163,184,.6)" font-size="7.5" font-family="IBM Plex Mono">${inds[i].label.slice(0,10)}</text>`;
    });
    cities.forEach((c,ci)=>{
      const pts=inds.map((ind,i)=>{
        const v=c.indicators[ind.id]||0;
        const norm=this.normalize(v,ind);
        const a=i*step-Math.PI/2;
        return [cx+R*norm/100*Math.cos(a),cy+R*norm/100*Math.sin(a)];
      });
      const d=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ')+'Z';
      svg+=`<path d="${d}" fill="${colors[ci]}" fill-opacity="0.12" stroke="${colors[ci]}" stroke-width="1.5" stroke-opacity="0.8"/>`;
      pts.forEach(p=>{svg+=`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3" fill="${colors[ci]}" fill-opacity="0.9"/>`;});
    });
    cities.forEach((c,ci)=>{
      svg+=`<rect x="8" y="${SZ-14-ci*13}" width="7" height="7" rx="1" fill="${colors[ci]}"/>`;
      svg+=`<text x="19" y="${SZ-9-ci*13}" fill="${colors[ci]}" font-size="8" font-family="IBM Plex Mono" font-weight="700">${c.city.name.slice(0,16)}</text>`;
    });
    svg+='</svg>';
    return svg;
  },

  _showAddCity() {
    const m=document.getElementById('compare-add-modal');
    if(m){m.style.display='flex';}
    setTimeout(()=>document.getElementById('compare-search-input')?.focus(),100);
    this._filterCities('');
  },

  _filterCities(q) {
    const el=document.getElementById('compare-search-results');
    if(!el) return;
    const db=window._RO_CITIES_DB||{};
    const matches=Object.entries(db)
      .filter(([k,c])=>(c.name||'').toLowerCase().includes(q.toLowerCase())&&!this._cities.find(x=>x.key===k))
      .slice(0,12);
    el.innerHTML=matches.map(([k,c])=>`
      <button onclick="_CompareProEngine.addCity('${k}');document.getElementById('compare-add-modal').style.display='none'"
        style="display:block;width:100%;text-align:left;padding:6px 10px;background:none;border:none;
          color:#e2e8f0;font-size:10px;cursor:pointer;border-radius:5px;font-family:inherit;
          border-bottom:1px solid rgba(255,255,255,.04)"
        onmouseover="this.style.background='rgba(255,255,255,.06)'" onmouseout="this.style.background='none'">
        <span style="font-weight:700">${c.name}</span>
        <span style="color:rgba(148,163,184,.4);font-size:9px;margin-left:8px">
          ${c.judet_code||''} · ${N(c.pop2021)} loc · ${(c.rata_reala_2011_2021>=0?'+':'')+c.rata_reala_2011_2021?.toFixed(1)||'—'}%/an
        </span>
      </button>`).join('');
  },

  open(cityKey) {
    this._cities=[];
    if(cityKey) this.addCity(cityKey);
    this.render();
    setTimeout(()=>this._showAddCity(),300);
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ② PLANNING SCORE per PARCELĂ
// ═══════════════════════════════════════════════════════════════════════════

G._PlanningScore = {
  calculate(city,parcel,risk) {
    const utr=parcel?.params?.fn||parcel?.utr||'M';
    const grav=window._TCIMasterplanPDF?._calcGravity?.(city)||{gravityScore:0.5};
    const tp=city?.acoperire_transport||60;
    const acc=Math.min(100,Math.round(30+tp*0.4+(city?.pib_eur_cap||8000)/1000));
    const pres=Math.min(100,Math.max(0,Math.round((grav.gravityScore||0.5)*100*(1+(city?.rata_reala_2011_2021||0)/100*5))));
    const ag=risk?.seismic?.ag||0.20;
    const ris=Math.max(0,Math.min(100,Math.round(100-ag*200-(risk?.flood?.risk||1.0)*15)));
    const utrScores={L:60,Lc:75,C:85,M:80,Is:40,A:50,P:70,V:90,T:65};
    const utrScore=utrScores[utr]||65;
    const carb=Math.min(100,Math.max(0,Math.round(40+(city?.spatii_verzi_mp_loc||11)*2+(tp-60)*0.5)));
    const total=Math.round(acc*0.25+pres*0.25+ris*0.20+utrScore*0.15+carb*0.15);
    const label=total>=80?'EXCELENT':total>=65?'BUN':total>=50?'MEDIU':total>=35?'RISC MODERAT':'RISC RIDICAT';
    const color=total>=80?'#22c55e':total>=65?'#D4AF37':total>=50?'#f59e0b':total>=35?'#f97316':'#ef4444';
    return {
      total,label,color,
      components:{
        accesibilitate:{score:acc,weight:25,label:'Accesibilitate',color:'#22c55e',src:'Transport+POI'},
        presiune:{score:pres,weight:25,label:'Potențial construire',color:'#60a5fa',src:'Model gravitațional'},
        risc:{score:ris,weight:20,label:'Risc cumulat',color:'#f59e0b',src:'P100+ANAR'},
        utr:{score:utrScore,weight:15,label:'Compatib. UTR '+utr,color:'#a78bfa',src:'RGU+PUG'},
        carbon:{score:carb,weight:15,label:'Sustenabilitate',color:'#34d399',src:'EN 15978'},
      },
      source:'UrbanX composite · INSE · P100-1/2013 · RGU · ANAR · EN 15978',
    };
  },

  render(result,containerId) {
    const el=document.getElementById(containerId);
    if(!el||!result) return;
    const {total,label,color,components}=result;
    const radius=45,circ=2*Math.PI*radius,dash=circ*total/100;
    el.innerHTML=`
      <div style="background:rgba(8,14,34,.85);border-radius:10px;padding:10px;border:1px solid rgba(255,255,255,.07)">
        <div style="font-size:7.5px;font-weight:800;color:rgba(212,175,55,.8);margin-bottom:8px;letter-spacing:.1em">
          PLANNING SCORE · Scor compozit
        </div>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="${radius}" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="8"/>
            <circle cx="50" cy="50" r="${radius}" fill="none" stroke="${color}" stroke-width="8"
              stroke-dasharray="${dash.toFixed(1)} ${circ.toFixed(1)}" stroke-linecap="round" transform="rotate(-90 50 50)"/>
            <text x="50" y="46" text-anchor="middle" fill="${color}" font-size="20" font-weight="900" font-family="IBM Plex Mono">${total}</text>
            <text x="50" y="60" text-anchor="middle" fill="rgba(148,163,184,.5)" font-size="8" font-family="IBM Plex Mono">/100</text>
          </svg>
          <div>
            <div style="font-size:12px;font-weight:800;color:${color}">${label}</div>
            <div style="font-size:7px;color:rgba(148,163,184,.5);margin-top:2px">5 componente ponderate</div>
          </div>
        </div>
        ${Object.values(components).map(c=>`
          <div style="margin-bottom:4px">
            <div style="display:flex;justify-content:space-between;margin-bottom:1px">
              <span style="font-size:7px;color:rgba(148,163,184,.7)">${c.label} (${c.weight}%)</span>
              <span style="font-size:7.5px;font-weight:700;color:${c.color};font-family:'IBM Plex Mono'">${c.score}</span>
            </div>
            <div style="height:3px;background:rgba(255,255,255,.05);border-radius:2px">
              <div style="height:3px;width:${c.score}%;background:${c.color};border-radius:2px"></div>
            </div>
            <div style="font-size:5.5px;color:rgba(100,120,150,.4)">${c.src}</div>
          </div>`).join('')}
        <div style="font-size:6px;color:rgba(60,80,110,.5);margin-top:5px">${result.source}</div>
      </div>`;
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ③ PRESENTATION MODE
// ═══════════════════════════════════════════════════════════════════════════

G._PresentationMode = {
  _slide:0, _cities:[],

  open(cityKey,compareList) {
    const city=window._RO_CITIES_DB?.[cityKey];
    if(!city){ss?.('Selectați un UAT mai întâi');return;}
    this._cities=compareList||[{key:cityKey,city}];
    this._slide=0;
    let m=document.getElementById('presentation-modal');
    if(!m){
      m=document.createElement('div');
      m.id='presentation-modal';
      m.style.cssText=`position:fixed;inset:0;z-index:6000;background:#020612;
        font-family:'Space Grotesk','IBM Plex Mono',sans-serif;display:flex;flex-direction:column;`;
      document.body.appendChild(m);
    }
    m.style.display='flex';
    this._render(city);
    const kh=this._keyHandler.bind(this);
    document.removeEventListener('keydown',kh);
    document.addEventListener('keydown',kh);
  },

  close() {
    const m=document.getElementById('presentation-modal');
    if(m) m.style.display='none';
  },

  _keyHandler(e) {
    if(e.key==='Escape') this.close();
    if(e.key==='ArrowRight'||e.key==='ArrowDown') this._next();
    if(e.key==='ArrowLeft'||e.key==='ArrowUp') this._prev();
  },

  _next() {
    this._slide=Math.min(4,this._slide+1);
    const city=this._cities[0]?.city;
    if(city) this._render(city);
  },

  _prev() {
    this._slide=Math.max(0,this._slide-1);
    const city=this._cities[0]?.city;
    if(city) this._render(city);
  },

  _render(city) {
    const m=document.getElementById('presentation-modal');
    if(!m) return;
    const need=window._TCIMasterplanPDF?._calcNeed?.(city,'S2')||{pop2055:city.pop2021,locuinteTotale:5000};
    const grav=window._TCIMasterplanPDF?._calcGravity?.(city)||{gravityScore:0.5,growthType:'REGIONAL'};
    const titles=['Context Demografic','Zone de Dezvoltare','Necesități Infrastructură','Benchmarking','Recomandări Strategice'];
    const slides=[
      this._s1(city,need,grav),
      this._s2(city,need),
      this._s3(city,need),
      this._s4(city),
      this._s5(city,need,grav),
    ];
    m.innerHTML=`
      <div style="display:flex;align-items:center;justify-content:space-between;
        padding:14px 28px;border-bottom:1px solid rgba(255,255,255,.06);flex-shrink:0">
        <div>
          <div style="font-size:9px;color:#D4AF37;font-weight:800;letter-spacing:.15em">
            URBAN MASTERPLAN · ${(city.name||'').toUpperCase()}
          </div>
          <div style="font-size:14px;font-weight:900;color:#fff">${titles[this._slide]}</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <div style="display:flex;gap:4px">
            ${[0,1,2,3,4].map(i=>`
              <div onclick="_PresentationMode._slide=${i};_PresentationMode._render(window._RO_CITIES_DB?.['${this._cities[0]?.key}'])"
                style="width:${i===this._slide?20:6}px;height:6px;border-radius:3px;
                  background:${i===this._slide?'#D4AF37':'rgba(255,255,255,.2)'};cursor:pointer;transition:all .3s"></div>`).join('')}
          </div>
          <button onclick="_PresentationMode._prev()" style="padding:5px 10px;border-radius:6px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#e2e8f0;font-size:12px;cursor:pointer">←</button>
          <button onclick="_PresentationMode._next()" style="padding:5px 10px;border-radius:6px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:#e2e8f0;font-size:12px;cursor:pointer">→</button>
          <span style="font-size:8px;color:rgba(148,163,184,.4)">${this._slide+1}/5 · ESC</span>
          <button onclick="_PresentationMode.close()" style="padding:5px 10px;border-radius:6px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);color:#f87171;font-size:12px;cursor:pointer">✕</button>
        </div>
      </div>
      <div style="flex:1;overflow:auto;padding:24px 28px">${slides[this._slide]}</div>
      <div style="padding:8px 28px;border-top:1px solid rgba(255,255,255,.04);flex-shrink:0;display:flex;justify-content:space-between">
        <span style="font-size:7px;color:rgba(100,120,150,.4)">UrbanX TSS·FG · ${new Date().toLocaleDateString('ro-RO')} · INSE · Eurostat · BNR · INFP · Copernicus</span>
        <span style="font-size:7px;color:rgba(100,120,150,.4)">Proiecție: Model cohort UrbanX 2.0 · Incertitudine ±15% la 30 ani</span>
      </div>`;
  },

  _s1(city,need,grav) {
    const pop0=city.pop2021||100000,pop55=need.pop2055||pop0;
    return `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px">
      ${[
        ['Populație 2021','#D4AF37',N(pop0),'INSE Rec.2021','🟢 Date oficiale'],
        ['Proiecție 2055 (S2)','#22c55e',N(pop55)+' ('+((pop55-pop0)>=0?'+':'')+N(pop55-pop0)+')','Model cohort UrbanX','🟡 ±15% incertitudine'],
        ['Tip creștere','#60a5fa',grav.growthType||'—','Scor gravitațional','🟡 Model calibrat'],
      ].map(([l,c,v,s,b])=>`
        <div style="background:rgba(8,14,34,.7);border-radius:12px;padding:20px;border:1px solid rgba(255,255,255,.07);border-top:3px solid ${c}">
          <div style="font-size:9px;color:rgba(148,163,184,.6);margin-bottom:8px">${l}</div>
          <div style="font-size:26px;font-weight:900;color:${c};font-family:'IBM Plex Mono';margin-bottom:8px">${v}</div>
          <div style="font-size:8px;color:rgba(100,120,150,.5)">${s}</div>
          <div style="font-size:8px;color:rgba(148,163,184,.5);margin-top:4px">${b}</div>
        </div>`).join('')}
    </div>`;
  },

  _s2(city,need) {
    const cached=window._ZoneEngine?._cache?.[`zones_${city.siruta||city.lat}_${city.lon}`];
    const zones=cached?.zones?.slice(0,6)||[];
    if(!zones.length) return `<div style="color:rgba(148,163,184,.5);padding:30px;text-align:center;font-size:14px">
      Zone se calculează... Lansați TCI Cinematic v2 mai întâi (Vizualizare ▾ → TCI Cinematic v2)</div>`;
    return `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
      ${zones.map(z=>`
        <div style="background:rgba(8,14,34,.7);border-radius:10px;padding:14px;border:1px solid rgba(255,255,255,.06);border-left:3px solid ${z.pressureColor||'#D4AF37'}">
          <div style="font-size:11px;font-weight:800;color:#e2e8f0;margin-bottom:6px">${z.name}</div>
          <div style="font-size:22px;font-weight:900;color:${z.pressureColor||'#D4AF37'};font-family:'IBM Plex Mono'">
            ${(z.densif_pct>=0?'+':'')+z.densif_pct}%
          </div>
          <div style="font-size:8px;color:rgba(148,163,184,.5);margin-bottom:6px">densificare 2025-2055</div>
          ${[['Locuințe noi',N(z.locuinte_noi)],['Pop. 2055',N(z.pop2055)]].map(([l,v])=>`
            <div style="display:flex;justify-content:space-between;padding:2px 0;border-bottom:1px solid rgba(255,255,255,.04)">
              <span style="font-size:7.5px;color:rgba(148,163,184,.5)">${l}</span>
              <span style="font-size:8px;font-weight:700;color:#e2e8f0">${v}</span>
            </div>`).join('')}
          <div style="font-size:7px;color:${z.pressureColor||'#D4AF37'};margin-top:4px;font-weight:700">${z.pressureLabel||'—'}</div>
        </div>`).join('')}
    </div>`;
  },

  _s3(city,need) {
    const r=window._InfrastructureDeficit?.analyze(city,need)||{alerts:[],source:'—'};
    return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div>
        <div style="font-size:10px;font-weight:800;color:rgba(148,163,184,.5);margin-bottom:10px">ALERTE INFRASTRUCTURĂ</div>
        ${r.alerts.length
          ?r.alerts.map(a=>`
            <div style="background:rgba(${a.severity==='HIGH'?'239,68,68':'245,158,11'},.08);border-radius:8px;padding:10px;margin-bottom:8px;border-left:3px solid rgba(${a.severity==='HIGH'?'239,68,68':'245,158,11'},.6)">
              <div style="font-size:10px;font-weight:800;color:${a.severity==='HIGH'?'#fca5a5':'#fcd34d'}">${a.type==='education'?'🏫':a.type==='health'?'🏥':a.type==='green'?'🌳':'🚌'} ${a.label}</div>
              <div style="font-size:9px;color:#e2e8f0;margin:4px 0">${a.value}</div>
              <div style="font-size:8px;color:rgba(148,163,184,.6)">→ ${a.action}</div>
            </div>`).join('')
          :'<div style="color:#22c55e;font-size:11px;padding:12px">✅ Infrastructura face față creșterii proiectate</div>'}
      </div>
      <div>
        <div style="font-size:10px;font-weight:800;color:rgba(148,163,184,.5);margin-bottom:10px">INDICATORI DEMOGRAFICI</div>
        ${[['👶 Copii 0-14',N(Math.round((city.pop2021||100000)*0.155)),N(Math.round((need.pop2055||city.pop2021)*0.130))],
           ['👴 Vârstnici 65+',N(Math.round((city.pop2021||100000)*0.218)),N(Math.round((need.pop2055||city.pop2021)*0.320))],
           ['🏠 Gospodării',N(Math.round((city.pop2021||100000)/2.3)),N(Math.round((need.pop2055||city.pop2021)/2.0))],
           ['🏗 Locuințe noi','—',N(need.locuinteTotale||0)],
          ].map(([l,v25,v55])=>`
            <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.05)">
              <span style="font-size:10px;color:rgba(148,163,184,.7)">${l}</span>
              <span style="font-size:9px;color:rgba(148,163,184,.5)">${v25}</span>
              <span style="font-size:12px;font-weight:800;color:#60a5fa;font-family:'IBM Plex Mono'">→ ${v55}</span>
            </div>`).join('')}
        <div style="font-size:7px;color:rgba(100,120,150,.4);margin-top:8px">${r.source}</div>
      </div>
    </div>`;
  },

  _s4(city) {
    const db=window._RO_CITIES_DB||{};
    const pop=city.pop2021||100000;
    const similar=Object.values(db)
      .filter(c=>c!==city&&Math.abs((c.pop2021||0)-pop)<pop*0.5&&c.pop2021>0)
      .sort((a,b)=>Math.abs(a.pop2021-pop)-Math.abs(b.pop2021-pop)).slice(0,4);
    const all=[city,...similar];
    const COLORS=['#D4AF37','#60a5fa','#22c55e','#f97316','#a78bfa'];
    const metrics=[
      ['Populație 2021',c=>N(c.pop2021)],
      ['Rată creștere',c=>(c.rata_reala_2011_2021>=0?'+':'')+c.rata_reala_2011_2021?.toFixed(1)||'—'+'%/an'],
      ['PIB/cap',c=>N(c.pib_eur_cap||0)+' €'],
      ['Autorizații/an',c=>N(c.autorizatii_2023||0)],
      ['Spații verzi',c=>N(c.spatii_verzi_mp_loc||11)+' m²/loc'],
    ];
    return `<div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr>
            <th style="text-align:left;padding:8px;font-size:9px;color:rgba(148,163,184,.5);border-bottom:1px solid rgba(255,255,255,.08)">INDICATOR</th>
            ${all.map((c,i)=>`<th style="text-align:center;padding:8px;border-bottom:1px solid rgba(255,255,255,.08)">
              <div style="font-size:11px;font-weight:800;color:${COLORS[i]}">${c.name}</div>
              <div style="font-size:8px;color:rgba(148,163,184,.4)">${c.judet_code||''}</div>
            </th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${metrics.map(([l,fn])=>`<tr>
            <td style="padding:9px 8px;font-size:9px;color:rgba(148,163,184,.7);border-bottom:1px solid rgba(255,255,255,.04)">${l}</td>
            ${all.map((c,i)=>`<td style="padding:9px 8px;text-align:center;border-bottom:1px solid rgba(255,255,255,.04)">
              <span style="font-size:11px;font-weight:700;color:${COLORS[i]};font-family:'IBM Plex Mono'">${fn(c)}</span>
            </td>`).join('')}
          </tr>`).join('')}
        </tbody>
      </table>
      <div style="font-size:7px;color:rgba(100,120,150,.4);margin-top:8px">Sursa: INSE Rec.2021 · ANCPI 2023 · Eurostat 2022</div>
    </div>`;
  },

  _s5(city,need,grav) {
    const r=city.rata_reala_2011_2021||0;
    const gt=grav.growthType||'REGIONAL';
    const recs=[
      gt==='METROPOLITAN'||gt==='GROWING'
        ?{icon:'🏗',title:'Densificare prioritară',color:'#22c55e',text:`Cu +${r.toFixed(1)}%/an creștere, densificați centrul față de expansiunea periferică. POT minim în UTR Lc/C poate fi redus.`}
        :{icon:'🏚',title:'Reabilitare fond existent',color:'#f59e0b',text:`Cu ${r.toFixed(1)}%/an declin, consolidați fondul existent. Fond pre-1990 eligibil PNRR C10-I2 pentru consolidare seismică.`},
      {icon:'🚌',title:'Coridor TOD',color:'#3b82f6',text:'Densificați pe axele de transport public. Buffer 500m stații TP = zone prioritare. Referință: Cervero & Kockelman (1997).'},
      {icon:'🌳',title:'Spații verzi necesare',color:'#22c55e',text:`Standard OMS: 9m²/loc. Actual: ${city.spatii_verzi_mp_loc||'—'} m²/loc. Rezervați terenuri în PUG pentru parcuri urbane.`},
      {icon:'🤝',title:'Coordonare metropolitană',color:'#a78bfa',text:'Integrați comunele periurbane cu creștere rapidă. PUZ coordonat cu municipiul. Zone metropolitane necesită strategie comună.'},
    ];
    return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      ${recs.map(r=>`
        <div style="background:rgba(8,14,34,.7);border-radius:10px;padding:16px;border:1px solid rgba(255,255,255,.06);border-left:3px solid ${r.color}">
          <div style="font-size:18px;margin-bottom:6px">${r.icon}</div>
          <div style="font-size:11px;font-weight:800;color:${r.color};margin-bottom:8px">${r.title}</div>
          <div style="font-size:9px;color:rgba(148,163,184,.8);line-height:1.55">${r.text}</div>
        </div>`).join('')}
      <div style="grid-column:1/-1;background:rgba(212,175,55,.05);border-radius:8px;padding:10px;border:1px solid rgba(212,175,55,.2)">
        <div style="font-size:8px;color:rgba(212,175,55,.7)">⚠ Recomandări orientative. Necesită validare de urbaniști atestați. UrbanX nu înlocuiește documentațiile PUG/PUZ/PUD.</div>
      </div>
    </div>`;
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// INTEGRARE UI
// ═══════════════════════════════════════════════════════════════════════════

(function _init(n){
  if(n>80) return;
  if(!document.getElementById('panel-tabs')){setTimeout(()=>_init(n+1),300);return;}

  // Planning Score în tab Analytics
  const addPS=()=>{
    const tc=document.getElementById('tc-analytics');
    if(!tc||document.getElementById('planning-score-section')) return;
    const div=document.createElement('div');
    div.id='planning-score-section';
    div.innerHTML=`
      <div style="margin-bottom:6px">
        <div style="font-size:7.5px;font-weight:700;color:rgba(148,163,184,.6);margin-bottom:3px">
          PLANNING SCORE · Scor compozit 0-100
        </div>
        <div id="planning-score-result">
          <button onclick="window._PlanningScorePanel&&_PlanningScorePanel.run()"
            style="width:100%;padding:6px;border-radius:6px;background:rgba(212,175,55,.1);
              border:1px solid rgba(212,175,55,.3);color:#D4AF37;font-size:9px;
              font-weight:700;cursor:pointer;font-family:inherit">
            🎯 Calculează Planning Score
          </button>
        </div>
      </div>`;
    tc.insertBefore(div,tc.firstChild);
  };

  // Compare Pro + Presentation în Vizualizare menu
  const addMenuItems=()=>{
    const vizMenu=document.getElementById('viz-menu');
    if(!vizMenu||document.getElementById('compare-pro-menu-item')) return;
    const sep=document.createElement('div');
    sep.style.cssText='height:1px;background:rgba(255,255,255,.08);margin:4px 0';
    vizMenu.appendChild(sep);
    [
      {id:'compare-pro-menu-item',icon:'🏙',label:'Compare Pro (2-5 UAT-uri)',col:'#60a5fa',
       action:`window._closeAllMenusAndOverlay&&_closeAllMenusAndOverlay();window._launchComparePro()`},
      {id:'presentation-menu-item',icon:'🎯',label:'Prezentare Primărie (5 slide-uri)',col:'#a78bfa',
       action:`window._closeAllMenusAndOverlay&&_closeAllMenusAndOverlay();window._launchPresentation()`},
    ].forEach(({id,icon,label,col,action})=>{
      const btn=document.createElement('button');
      btn.id=id;
      btn.style.cssText=`display:block;width:100%;text-align:left;background:none;border:none;
        color:${col};padding:11px 10px;cursor:pointer;border-radius:6px;font-size:13px;
        font-family:inherit;min-height:44px;-webkit-tap-highlight-color:transparent`;
      btn.innerHTML=`${icon} ${label}`;
      btn.onmouseover=()=>{btn.style.background='rgba(255,255,255,.06)'};
      btn.onmouseout=()=>{btn.style.background='none'};
      // addEventListener in loc de setAttribute — merge pe iOS Safari
      btn.addEventListener('click', ()=>{
        try { eval(action); } catch(e){ console.error('[Menu]',e); }
      });
      btn.addEventListener('touchend', (e)=>{
        e.preventDefault();
        try { eval(action); } catch(e){ console.error('[Menu touch]',e); }
      }, {passive:false});
      vizMenu.appendChild(btn);
    });
  };

  window._PlanningScorePanel={
    run(){
      const ap=window.S?.parcels?.[window.S?.activeParcel??0];
      const city=window._AnalyticsPanel?._getCity?.();
      if(!city){ss?.('Selectați o parcelă mai întâi');return;}
      const risk=typeof _getRiskProfile==='function'?_getRiskProfile(city):null;
      const result=G._PlanningScore.calculate(city,ap,risk);
      G._PlanningScore.render(result,'planning-score-result');
    },
  };

  const obs=setInterval(()=>{
    addPS(); addMenuItems();
    if(document.getElementById('planning-score-section')&&document.getElementById('compare-pro-menu-item'))
      clearInterval(obs);
  },600);
  setTimeout(()=>clearInterval(obs),15000);

  window._CompareProEngine=G._CompareProEngine;
  window._PlanningScore=G._PlanningScore;
  window._PresentationMode=G._PresentationMode;

  console.log('[Compare Pro v1.0] ✅ Compare Pro + Planning Score + Presentation Mode');
  ss?.('🏙 Compare Pro + Planning Score + Prezentare activ · Vizualizare ▾');
})(0);

// EXPUNERE IMEDIATA — indiferent de panel-tabs
// Astfel butoanele din viz-menu functioneaza inainte de init complet
window._CompareProEngine  = window._CompareProEngine  || G._CompareProEngine;
window._PlanningScore     = window._PlanningScore     || G._PlanningScore;
window._PresentationMode  = window._PresentationMode  || G._PresentationMode;

})(window);
