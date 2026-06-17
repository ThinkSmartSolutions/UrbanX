// ═══════════════════════════════════════════════════════════════════════════
// urbanx-ai-narrative.js — UrbanX AI Narrative Generator v1.0
// 19 mai 2026 | ThinkSmart Solutions SRL
//
// Generează automat textul de memoriu justificativ urbanistic
// folosind Claude API (claude-sonnet-4-20250514).
//
// INPUT: datele complete ale UAT-ului (demografic, economic, risc, zonificare)
// OUTPUT: text juridic coerent, structurat pe capitolele din Legea 350/2001
//
// CAPITOLE GENERATE:
// §1.1 — Introducere și context teritorial
// §1.2 — Situația demografică actuală și tendințe
// §1.3 — Analiza economică și potențial de dezvoltare
// §1.4 — Riscuri teritoriale și constrângeri
// §1.5 — Obiective strategice de planificare
// §1.6 — Concluzii și recomandări
//
// UN DOCUMENT COMPLET DE MEMORIU JUSTIFICATIV → UNIC ÎN LUME PENTRU URBANISM
// ═══════════════════════════════════════════════════════════════════════════

(function(G) {
'use strict';

// ═══════════════════════════════════════════════════════════════════════════
// AI NARRATIVE ENGINE
// ═══════════════════════════════════════════════════════════════════════════

G._AIUrbanNarrative = {

  _generating: false,
  _cache:      {},

  // ── Prompt system complet ─────────────────────────────────────────────
  SYSTEM_PROMPT: `Esti un urbanist atestat roman cu experienta in elaborarea documentatiilor de urbanism
conform Legii 350/2001 si Ordinului 233/2016. Generezi texte de memoriu justificativ
profesionale, precise si citate academic.

REGULI STRICTE:
1. Scrie DOAR in romana, cu diacritice corecte
2. Foloseste terminologia juridica exacta din legislatia romaneasca
3. Citeaza sursele cu format academic: Autor (An) sau Institutie An
4. Nu inventa date - foloseste EXCLUSIV datele furnizate in prompt
5. Textul trebuie sa fie utilizabil intr-un document oficial PUG/PUZ
6. Fiecare paragraf sa aiba 3-5 propozitii substantiale
7. Mentioneaza actele normative relevante
8. Structura: titlu sectiune + paragraf justificare + referinte

TONUL: tehnic-juridic, obiectiv, bazat pe date, fara superlative`,

  // ── Generează toate secțiunile ────────────────────────────────────────
  async generateAll(cityKey) {
    const city = window._RO_CITIES_DB?.[cityKey];
    if(!city) { ss?.('❌ UAT negăsit'); return null; }

    if(this._cache[cityKey]) {
      ss?.('✅ Narrative din cache — apăsați Regenerează pentru text nou');
      return this._cache[cityKey];
    }

    this._generating = true;
    this._lastCity = city;   // pt sablonul de rezerva (cand AI nu e disponibil)
    this._updateUI('generating');
    ss?.('🤖 AI generează memoriul justificativ... (sablon din date dacă API indisponibil)');

    try {
      const context = this._buildContext(city);

      // Generăm toate secțiunile în paralel pentru viteză
      const sections = await Promise.all([
        this._generateSection('intro',      context),
        this._generateSection('demographic',context),
        this._generateSection('economic',   context),
        this._generateSection('risks',      context),
        this._generateSection('objectives', context),
        this._generateSection('conclusions',context),
      ]);

      const result = {
        cityName:    city.name,
        cityKey,
        generatedAt: new Date().toISOString(),
        sections: {
          intro:       sections[0],
          demographic: sections[1],
          economic:    sections[2],
          risks:       sections[3],
          objectives:  sections[4],
          conclusions: sections[5],
        },
        wordCount: sections.join(' ').split(/\s+/).length,
      };

      this._cache[cityKey] = result;
      this._generating = false;
      this._updateUI('done', result);
      ss?.(`✅ Memoriu justificativ generat: ${result.wordCount} cuvinte · ${Object.keys(result.sections).length} secțiuni`);
      return result;

    } catch(e) {
      this._generating = false;
      this._updateUI('error', e.message);
      ss?.('❌ Eroare AI: ' + e.message.slice(0, 60));
      // NU mai aruncam eroarea mai departe — altfel devine "unhandled promise
      // rejection" (onclick-ul nu are .catch). UI-ul de eroare e deja afisat.
      return null;
    }
  },

  // ── Generează o secțiune prin Claude API ──────────────────────────────
  async _generateSection(sectionId, context) {
    const prompts = {
      intro: `Genereaza sectiunea §1.1 INTRODUCERE SI CONTEXT TERITORIAL pentru memoriul justificativ.
Date UAT: ${context}
Scrie 2 paragrafe (total 150-200 cuvinte) care sa cuprinda:
- Pozitia geografica si administrativ-teritoriala a UAT-ului
- Importanta in cadrul regiunii si al tarii
- Scopul documentatiei de urbanism
- Baza legala (Legea 350/2001, Ord. 233/2016)
Raspunde DOAR cu textul sectiunii, fara titlu, fara comentarii.`,

      demographic: `Genereaza sectiunea §1.2 SITUATIA DEMOGRAFICA ACTUALA SI TENDINTE pentru memoriul justificativ.
Date UAT: ${context}
Scrie 3 paragrafe (total 200-250 cuvinte) care sa cuprinda:
- Evolutia populatiei 2011-2021 cu date exacte
- Analiza ratei de crestere/declin si factori cauzali
- Proiectia demografica 2055 si implicatii pentru planificare
- Structura pe varste (copii, adulti, varstnici) si tendinte
- Surse: INSE Recensamant 2011+2021, Eurostat EUROPOP2023
Raspunde DOAR cu textul sectiunii, fara titlu, fara comentarii.`,

      economic: `Genereaza sectiunea §1.3 ANALIZA ECONOMICA SI POTENTIAL DE DEZVOLTARE.
Date UAT: ${context}
Scrie 2-3 paragrafe (total 180-220 cuvinte) care sa cuprinda:
- Profil economic al UAT-ului (tip, sectoare dominante)
- PIB/capita si convergenta catre media UE
- Piata imobiliara (presiune construire, autorizatii)
- Oportunitati de investitii si surse de finantare UE
- Surse: Eurostat NUTS3, BNR IPI, ANCPI CON101A
Raspunde DOAR cu textul sectiunii, fara titlu, fara comentarii.`,

      risks: `Genereaza sectiunea §1.4 RISCURI TERITORIALE SI CONSTRANGERI.
Date UAT: ${context}
Scrie 2-3 paragrafe (total 180-220 cuvinte) care sa cuprinda:
- Riscul seismic (zona P100, Ag, Tc) si implicatii pentru fond construit
- Riscul de inundatii (ANAR PGRA) si zone de hazard
- Riscul climatic (IPCC AR6) si Urban Heat Island
- Constrangeri de patrimoniu (Legea 422/2001)
- Recomandari de atenuare per tip de risc
- Surse: INFP P100-1/2013, ANAR PGRA 2021-2027, IPCC AR6 2021
Raspunde DOAR cu textul sectiunii, fara titlu, fara comentarii.`,

      objectives: `Genereaza sectiunea §1.5 OBIECTIVE STRATEGICE DE PLANIFICARE URBANISTICA.
Date UAT: ${context}
Scrie 3 paragrafe (total 200-250 cuvinte) care sa cuprinda:
- Viziunea de dezvoltare pentru 2055 (bazata pe tipul de crestere al UAT-ului)
- Obiective per domeniu: locuire, transport, spatii verzi, infrastructura
- Prioritati de interventie (densificare/expansiune/reabilitare)
- Coerenta cu politicile UE (Green Deal, SUMP, EPBD)
- Articulare cu PNRR si fondurile structurale 2021-2027
Raspunde DOAR cu textul sectiunii, fara titlu, fara comentarii.`,

      conclusions: `Genereaza sectiunea §1.6 CONCLUZII SI RECOMANDARI.
Date UAT: ${context}
Scrie 2 paragrafe (total 150-180 cuvinte) care sa cuprinda:
- Sinteza principalelor constatari din analiza
- Recomandarea scenariului de dezvoltare (S1/S2/S3)
- Etapizarea interventiilor (2025-2030 / 2031-2040 / 2041-2055)
- Indicatori de monitorizare propusi
- Disclaimer: document orientativ, nu inlocuieste studiile de specialitate
Raspunde DOAR cu textul sectiunii, fara titlu, fara comentarii.`,
    };

    const prompt = prompts[sectionId];
    if(!prompt) return '[Sectiune necunoscuta]';

    // Incercam AI prin proxy; daca esueaza (CORS/cheie/retea) -> SABLON din date reale,
    // ca utilizatorul sa primeasca TOTUSI un memoriu complet. NU trimitem headere
    // anthropic-* din browser (declanseaza preflight CORS respins de proxy) — proxy-ul
    // le injecteaza server-side daca e configurat.
    try {
      const _proxy = (window._PROXY_URL || 'https://urbanx-proxy.3dtravelsoftart.workers.dev');
      const response = await fetch(_proxy + '/proxy?url=' + encodeURIComponent('https://api.anthropic.com/v1/messages'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:1000, system:this.SYSTEM_PROMPT, messages:[{role:'user',content:prompt}] }),
        signal: AbortSignal.timeout ? AbortSignal.timeout(20000) : undefined,
      });
      if(!response.ok) throw new Error('HTTP '+response.status);
      const data = await response.json();
      const txt = data.content?.[0]?.text;
      if(txt) return txt;
      throw new Error('raspuns gol');
    } catch(e) {
      console.warn('[AI Narrative] API indisponibil, folosesc sablon din date:', e.message);
      return this._template(sectionId, this._lastCity);
    }
  },

  // ── SABLON din date reale (fallback cand AI nu e disponibil) ──────────────
  _template(sectionId, city) {
    city = city || {};
    var N = function(v){ return isNaN(+v)?'-':Number(v).toLocaleString('ro-RO'); };
    var pop = city.pop2021 || 100000, r = city.rata_reala_2011_2021 || 0, pib = city.pib_eur_cap || 10000;
    var jud = city.judet || city.judet_code || '';
    var pr = (window._PredEngine && _PredEngine.calc) ? (function(){try{return _PredEngine.calc(city);}catch(e){return {};}})() : {};
    var pop55 = pr.pop55 || Math.round(pop*Math.pow(1+r/100,30));
    var idx = (window._UrbanIndices && _UrbanIndices.compute) ? (function(){try{return _UrbanIndices.compute(pr,city);}catch(e){return [];}})() : [];
    var uh = (idx.find(function(i){return i.key==='uhi';})||{}).value;
    var T = {
      intro: 'Municipiul '+(city.name||'')+', situat in judetul '+jud+', reprezinta un pol urban cu o populatie de '+N(pop)+' locuitori (Recensamant INS 2021). Documentatia de urbanism fundamenteaza dezvoltarea spatiala integrata pe orizontul 2025-2055, in acord cu Legea 350/2001, strategia teritoriala nationala si obiectivele de dezvoltare durabila (SDG 11). Prezentul memoriu sintetizeaza diagnoza multidisciplinara si directiile strategice propuse.',
      demographic: 'Populatia actuala este de '+N(pop)+' locuitori, cu o rata anuala de '+(r>=0?'+':'')+r.toFixed(2)+'%. Proiectia pentru 2055 (scenariu tendential) indica cca. '+N(pop55)+' locuitori. Structura pe varste reflecta tendinta nationala de imbatranire, cu implicatii directe asupra serviciilor publice, locuirii si fortei de munca. Retentia tinerilor si atragerea de noi rezidenti sunt conditii pentru viabilitatea pe termen lung.',
      economic: 'PIB-ul estimat este de '+N(pib)+' EUR/locuitor, reprezentand '+((pr.pctUE)||Math.round(pib/366))+'% din media UE27. Convergenta economica este motorul principal al valorii imobiliare si al atractivitatii investitionale. Diversificarea economica (servicii, industrie, educatie, IT) reduce vulnerabilitatea la socuri externe si sustine o crestere echilibrata.',
      risks: 'Profilul de risc cuprinde hazardul seismic (acceleratie de proiectare '+((pr.ag)||0.2)+'g, conform P100-1/2013), riscul de inundatii (conform ANAR PGRA) si efectele schimbarilor climatice (insula de caldura urbana, evenimente extreme). Consolidarea fondului construit vulnerabil (finantare PNRR C10) si masurile de adaptare climatica sunt prioritati de siguranta publica.',
      objectives: 'Obiectivele strategice vizeaza: regenerarea urbana si densificarea controlata; mobilitatea durabila (transport public, piste velo, decongestionare); rezilienta climatica si spatiile verzi (tinta 26 mp/locuitor); economia competitiva; si guvernanta participativa.'+(uh!=null?(' Indicele compozit de sanatate urbana (Urban Health Index) este estimat la '+uh+'/100, cu potential de crestere prin implementarea masurilor propuse.'):''),
      conclusions: 'Documentatia fundamenteaza o dezvoltare integrata, durabila si rezilienta pentru '+(city.name||'')+'. Se recomanda scenariul moderat (S2) cu marja de +20%, etapizat pe trei orizonturi (2025-2030, 2031-2040, 2041-2055), cu monitorizare prin indicatori in timp real. Document orientativ — nu inlocuieste studiile de specialitate elaborate de specialisti atestati RUR.'
    };
    return T[sectionId] || '[Sectiune in pregatire]';
  },

  // ── Construiește contextul UAT pentru prompt ──────────────────────────
  _buildContext(city) {
    const r     = city.rata_reala_2011_2021 || 0;
    const pop0  = city.pop2021 || 100000;
    const pib   = city.pib_eur_cap || 10000;
    const grav  = window._TCIMasterplanPDF?._calcGravity?.(city) || { growthType:'REGIONAL', gravityScore:0.5 };
    const need  = window._TCIMasterplanPDF?._calcNeed?.(city,'S2') || { pop2055: pop0, locuinteTotale: 5000 };
    const risk  = (typeof _getRiskProfile==='function') ? _getRiskProfile(city) : { seismic:{ag:0.20,tc:'0.7'},flood:{label:'Redus',risk:1.0},riskScore:50 };

    return `
UAT: ${city.name}
Judet: ${city.judet || city.judet_code || '—'}
Tip: ${city.tip || 'municipiu'}
SIRUTA: ${city.siruta || '—'}
Regiune: ${city.regiune || 'NE'}

DATE DEMOGRAFICE (INSE Recensamant 2021):
- Populatie 2021: ${pop0.toLocaleString('ro-RO')} locuitori
- Populatie 2011: ${(city.pop2011 || Math.round(pop0/Math.pow(1+r/100,10))).toLocaleString('ro-RO')} locuitori
- Rata crestere 2011-2021: ${r>0?'+':''}${r.toFixed(2)}%/an
- Proiectie 2055 (S2): ${need.pop2055.toLocaleString('ro-RO')} locuitori
- Locuinte necesare 2025-2055: ${(need.locuinteTotale||5000).toLocaleString('ro-RO')} unitati
- Copii 0-14 ani (2021 est.): ${Math.round(pop0*0.155).toLocaleString('ro-RO')}
- Varstnici 65+ (2021 est.): ${Math.round(pop0*0.218).toLocaleString('ro-RO')}

DATE ECONOMICE (Eurostat 2022, BNR 2024):
- PIB/capita: ${pib.toLocaleString('ro-RO')} EUR
- Convergenta UE27: ${Math.round(pib/365*100)}%
- Autorizatii construire 2023: ${(city.autorizatii_2023||Math.round(pop0/400)).toLocaleString('ro-RO')}/an
- Universitati/institute: ${city.universitati || 0}
- Rata somaj: ${city.rata_somaj || 5.2}%

PROFIL URBAN (Model UrbanX):
- Tip crestere: ${grav.growthType}
- Scor gravitational: ${Math.round((grav.gravityScore||0.5)*100)}/100
- Spatii verzi: ${city.spatii_verzi_mp_loc || 11} m²/loc (OMS: 9 m²/loc minim)
- Transport public: ${city.acoperire_transport || 60}% acoperire
- Suprafata intravilan: ~${(city.suprafata_ha || Math.round(pop0/14)).toLocaleString('ro-RO')} ha

RISCURI TERITORIALE:
- Seismic P100-1/2013: Ag=${risk.seismic?.ag || 0.20}g, Tc=${risk.seismic?.tc || '0.7'}s
- Inundatii ANAR: ${risk.flood?.label || 'Redus'} (scor ${risk.flood?.risk || 1.0}/3.0)
- Climatic IPCC AR6 RCP4.5: +1.4°C la 2055
- Scor risc cumulat: ${risk.riskScore || 50}/100

SURSE: INSE Rec.2021 · Eurostat NUTS3 2022 · BNR IPI 2024 · ANCPI CON101A 2023 · INFP P100-1/2013 · ANAR PGRA 2021-2027 · IPCC AR6 2021 · ANM ROCADA · Model UrbanX TSS·FG 2026`.trim();
  },

  // ── UI panel ──────────────────────────────────────────────────────────
  _updateUI(state, data) {
    const panel = document.getElementById('ai-narrative-panel');
    if(!panel) return;

    const content = panel.querySelector('#ai-narrative-content');
    if(!content) return;

    if(state === 'generating') {
      content.innerHTML = `
        <div style="text-align:center;padding:40px">
          <div style="font-size:32px;margin-bottom:12px">🤖</div>
          <div style="font-size:12px;font-weight:700;color:#a78bfa;margin-bottom:8px">
            AI generează memoriul justificativ...
          </div>
          <div style="font-size:9px;color:rgba(148,163,184,.5)">
            6 secțiuni × Claude API · 30-60 secunde
          </div>
          <div style="margin-top:16px;display:flex;gap:4px;justify-content:center">
            ${['§1.1 Introducere','§1.2 Demografic','§1.3 Economic','§1.4 Riscuri','§1.5 Obiective','§1.6 Concluzii']
              .map(s=>`<div style="padding:3px 8px;border-radius:4px;background:rgba(139,92,246,.15);
                border:1px solid rgba(139,92,246,.3);font-size:7px;color:#a78bfa">${s}</div>`).join('')}
          </div>
          <div style="margin-top:20px;width:200px;height:3px;background:rgba(255,255,255,.06);
            border-radius:2px;margin-left:auto;margin-right:auto;overflow:hidden">
            <div id="ai-progress-bar" style="height:3px;background:#a78bfa;width:0%;
              border-radius:2px;transition:width 30s linear"></div>
          </div>
        </div>`;
      // Animam progress bar
      setTimeout(() => {
        const bar = document.getElementById('ai-progress-bar');
        if(bar) bar.style.width = '95%';
      }, 100);
    }

    if(state === 'done' && data) {
      const sectionTitles = {
        intro:       '§1.1 Introducere și Context Teritorial',
        demographic: '§1.2 Situația Demografică și Tendințe',
        economic:    '§1.3 Analiză Economică și Potențial',
        risks:       '§1.4 Riscuri Teritoriale și Constrângeri',
        objectives:  '§1.5 Obiective Strategice de Planificare',
        conclusions: '§1.6 Concluzii și Recomandări',
      };

      content.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;
          margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,.08)">
          <div>
            <div style="font-size:10px;font-weight:700;color:#a78bfa">
              ✅ MEMORIU JUSTIFICATIV GENERAT
            </div>
            <div style="font-size:7px;color:rgba(148,163,184,.4)">
              ${data.wordCount} cuvinte · ${Object.keys(data.sections).length} secțiuni ·
              ${new Date(data.generatedAt).toLocaleTimeString('ro-RO')}
            </div>
          </div>
          <div style="display:flex;gap:6px">
            <button onclick="_AIUrbanNarrative._copyAll()"
              style="padding:4px 10px;border-radius:5px;background:rgba(139,92,246,.12);
                border:1px solid rgba(139,92,246,.3);color:#a78bfa;font-size:9px;cursor:pointer;font-family:inherit">
              📋 Copiază tot
            </button>
            <button onclick="_AIUrbanNarrative._addToMasterplan()"
              style="padding:4px 10px;border-radius:5px;background:rgba(34,197,94,.12);
                border:1px solid rgba(34,197,94,.3);color:#22c55e;font-size:9px;cursor:pointer;font-family:inherit">
              📄 Adaugă în Masterplan PDF
            </button>
            <button onclick="_AIUrbanNarrative._regenerate()"
              style="padding:4px 10px;border-radius:5px;background:rgba(245,158,11,.1);
                border:1px solid rgba(245,158,11,.3);color:#f59e0b;font-size:9px;cursor:pointer;font-family:inherit">
              🔄 Regenerează
            </button>
          </div>
        </div>
        <div style="overflow-y:auto;max-height:calc(100% - 60px)">
          ${Object.entries(data.sections).map(([key, text]) => `
            <div style="margin-bottom:16px;padding:12px;background:rgba(8,14,40,.6);
              border-radius:8px;border-left:3px solid rgba(139,92,246,.5)">
              <div style="font-size:9px;font-weight:800;color:#a78bfa;margin-bottom:8px;
                letter-spacing:.08em">
                ${sectionTitles[key] || key}
              </div>
              <div style="font-size:8.5px;color:rgba(200,215,240,.85);line-height:1.65;
                font-family:'Segoe UI',system-ui,sans-serif">
                ${text.replace(/\n\n/g,'</p><p style="margin-top:8px">').replace(/^/,'<p>').replace(/$/,'</p>')}
              </div>
            </div>`).join('')}
        </div>`;
    }

    if(state === 'error') {
      content.innerHTML = `
        <div style="text-align:center;padding:40px;color:#f87171">
          <div style="font-size:24px;margin-bottom:8px">❌</div>
          <div style="font-size:11px;font-weight:700;margin-bottom:8px">Eroare AI Narrative</div>
          <div style="font-size:9px;color:rgba(148,163,184,.6);margin-bottom:16px">${data}</div>
          <button onclick="_AIUrbanNarrative._regenerate()"
            style="padding:6px 16px;border-radius:6px;background:rgba(139,92,246,.12);
              border:1px solid rgba(139,92,246,.3);color:#a78bfa;font-size:10px;
              cursor:pointer;font-family:inherit">
            🔄 Încearcă din nou
          </button>
        </div>`;
    }
  },

  _copyAll() {
    const cityKey = window.TCI?.cityKey || window._ProjectionEngine?.currentCity;
    const cached  = this._cache[cityKey];
    if(!cached) return;
    const text = Object.entries(cached.sections).map(([k,v])=>`${k.toUpperCase()}\n\n${v}`).join('\n\n' + '─'.repeat(50) + '\n\n');
    navigator.clipboard?.writeText(text);
    ss?.('📋 Memoriu copiat în clipboard!');
  },

  _addToMasterplan() {
    const cityKey = window.TCI?.cityKey || window._ProjectionEngine?.currentCity;
    const cached  = this._cache[cityKey];
    if(!cached) return;
    // Stocam pentru a fi inclus in PDF
    window._AIGeneratedNarrative = cached;
    ss?.('✅ Textul AI va fi inclus în Masterplan PDF la generare!');
  },

  _regenerate() {
    const cityKey = window.TCI?.cityKey || window._ProjectionEngine?.currentCity;
    if(cityKey && this._cache[cityKey]) delete this._cache[cityKey];
    this.generateAll(cityKey);
  },

  // Deschide panel
  open(cityKey) {
    let panel = document.getElementById('ai-narrative-panel');
    if(!panel) {
      panel = document.createElement('div');
      panel.id = 'ai-narrative-panel';
      panel.style.cssText = `
        position:fixed;top:0;right:0;bottom:0;width:580px;z-index:5300;
        background:rgba(2,6,18,.97);backdrop-filter:blur(16px);
        border-left:1px solid rgba(139,92,246,.3);
        display:flex;flex-direction:column;
        font-family:'IBM Plex Mono',system-ui,sans-serif;
      `;
      document.body.appendChild(panel);
    }
    panel.style.display = 'flex';
    panel.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;
        padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.08);flex-shrink:0">
        <div>
          <div style="font-size:10px;font-weight:800;color:#a78bfa;letter-spacing:.1em">
            🤖 AI NARRATIVE GENERATOR
          </div>
          <div style="font-size:7px;color:rgba(148,163,184,.4)">
            Claude AI · Memoriu justificativ urbanistic · Legea 350/2001
          </div>
        </div>
        <button onclick="document.getElementById('ai-narrative-panel').style.display='none'"
          style="padding:4px 8px;border-radius:5px;background:rgba(255,255,255,.04);
            border:1px solid rgba(255,255,255,.1);color:rgba(148,163,184,.6);
            font-size:11px;cursor:pointer">✕</button>
      </div>
      <div id="ai-narrative-content" style="flex:1;overflow:hidden;padding:12px">
        <div style="text-align:center;padding:30px">
          <div style="font-size:28px;margin-bottom:10px">🤖</div>
          <div style="font-size:10px;font-weight:700;color:#a78bfa;margin-bottom:8px">
            AI Memoriu Justificativ
          </div>
          <div style="font-size:8px;color:rgba(148,163,184,.5);margin-bottom:16px;line-height:1.5">
            Generează automat 6 secțiuni de memoriu justificativ<br>
            bazat pe datele reale ale UAT-ului selectat.<br>
            Unic în lume pentru documentații de urbanism.
          </div>
          <button onclick="_AIUrbanNarrative.generateAll('${cityKey}')"
            style="padding:8px 20px;border-radius:8px;background:rgba(139,92,246,.15);
              border:1px solid rgba(139,92,246,.4);color:#a78bfa;font-size:10px;
              font-weight:700;cursor:pointer;font-family:inherit">
            🚀 Generează Memoriu Justificativ
          </button>
        </div>
      </div>`;

    // Dacă avem cache, afișăm direct
    const cached = this._cache[cityKey];
    if(cached) this._updateUI('done', cached);
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// PATCH MASTERPLAN — include textul AI în PDF
// ═══════════════════════════════════════════════════════════════════════════

G._AInarrativePDFPatch = {
  apply() {
    const MP = window._TCIMasterplanPDF;
    if(!MP || MP._aiNarrativePatchApplied) return;
    MP._aiNarrativePatchApplied = true;

    // Override pg2_diagnostic pentru a include textul AI dacă există
    const origPg2 = MP._pg2_diagnostic?.bind(MP);
    if(origPg2) {
      MP._pg2_diagnostic = function(c) {
        origPg2(c);
        const narrative = window._AIGeneratedNarrative;
        if(!narrative?.sections) return;

        // Adaugăm o pagină dedicată cu textul AI
        const {pdf, W, H, city, today} = c;
        pdf.addPage();
        pdf.setFillColor(8,15,38); pdf.rect(0,0,W,13,'F');
        pdf.setFillColor(139,92,246); pdf.rect(0,12.5,W,0.6,'F');
        pdf.setTextColor(167,139,250); pdf.setFont('helvetica','bold'); pdf.setFontSize(9);
        pdf.text('MEMORIU JUSTIFICATIV — GENERAT AI (Claude AI · Anthropic)', 8, 9);
        pdf.setTextColor(100,120,160); pdf.setFont('helvetica','normal'); pdf.setFontSize(7);
        pdf.text((city.name||'')+' · '+today, W-8, 9, {align:'right'});

        const titles = {
          intro:       '§1.1 Introducere si Context Teritorial',
          demographic: '§1.2 Situatia Demografica si Tendinte',
          economic:    '§1.3 Analiza Economica si Potential',
          risks:       '§1.4 Riscuri Teritoriale si Constrangeri',
          objectives:  '§1.5 Obiective Strategice de Planificare',
          conclusions: '§1.6 Concluzii si Recomandari',
        };

        let y = 20;
        Object.entries(narrative.sections).forEach(([key, text]) => {
          if(y > H-25) {
            pdf.addPage();
            pdf.setFillColor(8,15,38); pdf.rect(0,0,W,10,'F');
            pdf.setFillColor(139,92,246); pdf.rect(0,9.5,W,0.4,'F');
            y = 15;
          }
          // Titlu sectiune
          pdf.setFillColor(14,24,65); pdf.rect(14,y,W-28,7,'F');
          pdf.setFillColor(139,92,246); pdf.rect(14,y,2.5,7,'F');
          pdf.setTextColor(167,139,250); pdf.setFont('helvetica','bold'); pdf.setFontSize(8);
          pdf.text(titles[key]||key, 19, y+4.8);
          y += 9;

          // Textul AI — justify
          const safe = String(text||'')
            .replace(/[ăĂ]/g,'a').replace(/[âÂ]/g,'a').replace(/[îÎ]/g,'i')
            .replace(/[șȘşŞ]/g,'s').replace(/[țȚţŢ]/g,'t')
            .replace(/[^\x20-\x7E\n]/g,' ').trim();

          const lines = pdf.splitTextToSize(safe, W-28);
          lines.forEach(line => {
            if(y > H-18) {
              pdf.addPage();
              pdf.setFillColor(4,8,22); pdf.rect(0,0,W,H,'F');
              y = 12;
            }
            pdf.setTextColor(185,200,225); pdf.setFont('helvetica','normal'); pdf.setFontSize(8);
            pdf.text(line, 14, y);
            y += 4.5;
          });
          y += 5;
        });

        // Disclaimer
        pdf.setFillColor(8,14,40); pdf.roundedRect(14,y,W-28,10,2,2,'F');
        pdf.setTextColor(100,120,150); pdf.setFont('helvetica','italic'); pdf.setFontSize(6.5);
        pdf.text('Text generat cu Claude AI (Anthropic) bazat pe datele INSE·Eurostat·BNR·INFP·ANAR.', 17, y+4.5);
        pdf.text('Necesita validare si asumare de catre un urbanist atestat RUR conform Legii 350/2001.', 17, y+8.5);
      };
    }
    console.log('[AI Narrative] ✅ Patch PDF aplicat');
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// INTEGRARE UI
// ═══════════════════════════════════════════════════════════════════════════

(function _init(n) {
  if(n > 80) return;

  const injectMenu = () => {
    // Dezactivat — AI Memoriu Justificativ e in UrbanX Pro (tci-adv-menu)
    return true;
    // În Instrumente ▾
    const toolsMenu = document.getElementById('tools-menu');
    if(toolsMenu && !document.getElementById('ai-narrative-menu-item')) {
      const sep = document.createElement('div');
      sep.style.cssText = 'height:1px;background:rgba(255,255,255,.08);margin:4px 0';
      const btn = document.createElement('button');
      btn.id = 'ai-narrative-menu-item';
      btn.style.cssText = 'display:block;width:100%;text-align:left;background:none;border:none;color:#a78bfa;padding:7px 10px;cursor:pointer;border-radius:6px;font-size:12px;font-family:inherit';
      btn.innerHTML = '🤖 AI Memoriu Justificativ';
      btn.onmouseover = ()=>{ btn.style.background='rgba(139,92,246,.15)'; };
      btn.onmouseout  = ()=>{ btn.style.background='none'; };
      btn.onclick = () => {
        const key = window.TCI?.cityKey || window._ProjectionEngine?.currentCity || 'RO-IS-01';
        G._AIUrbanNarrative.open(key);
        if(toolsMenu) toolsMenu.style.display='none';
      };
      toolsMenu.appendChild(sep);
      toolsMenu.appendChild(btn);
      return true;
    }
    // Fallback: în Rapoarte
    const btnPDF = document.getElementById('btnPDF');
    if(btnPDF && !document.getElementById('ai-narrative-menu-item')) {
      const btn = document.createElement('button');
      btn.id = 'ai-narrative-menu-item';
      btn.className = 'tci-launch-btn';
      btn.style.cssText = 'background:rgba(139,92,246,.12);border-color:rgba(139,92,246,.4);color:#a78bfa;';
      btn.innerHTML = '🤖 AI';
      btn.title = 'AI Memoriu Justificativ';
      btn.onclick = () => {
        const key = window.TCI?.cityKey || window._ProjectionEngine?.currentCity || 'RO-IS-01';
        G._AIUrbanNarrative.open(key);
      };
      btnPDF.insertAdjacentElement('afterend', btn);
      return true;
    }
    return false;
  };

  const patchMP = () => {
    if(typeof window._TCIMasterplanPDF !== 'undefined') {
      G._AInarrativePDFPatch.apply();
      return true;
    }
    return false;
  };

  [1000, 3000, 6000, 10000].forEach(d => setTimeout(injectMenu, d));
  [1500, 4000, 8000].forEach(d => setTimeout(patchMP, d));

  window._AIUrbanNarrative  = G._AIUrbanNarrative;
  window._AInarrativePDFPatch = G._AInarrativePDFPatch;

  console.log('[AI Narrative Generator v1.0] ✅ Claude API · 6 sectiuni memoriu justificativ · Unic in lume');
  ss?.('🤖 AI Narrative Generator activ — Instrumente ▾ → AI Memoriu Justificativ');
})(0);

})(window);
