// inse-connector.js — UrbanX v5.0
// INSE Tempo Online API v2 — date demografice și economice per UAT
// Documentație: https://statistici.insse.ro/shop/
// Cont necesar: statistici.insse.ro → Înregistrare → Aprobare 1-2 zile

window._INSEConnector = {
  _cache: {},
  get _proxy() { return window._PROXY_URL || null; },

  // Matricele INSE relevante pentru UrbanX
  MATRICES: {
    populatie:    'POP107A',  // Populația după medii de rezidență și județe
    nasteri:      'NAT101A',  // Nașteri vii după județe
    decese:       'DEC101A',  // Decese după județe
    migratie:     'MIG101A',  // Migrația internă
    salarii:      'FOM101B',  // Câștiguri salariale medii
    somaj:        'SOM101A',  // Șomaj înregistrat
    autorizatii:  'CON101A',  // Autorizații construire
    suprafata:    'TER101A',  // Suprafața teritorială
  },

  // Fetch o matrice INSE
  async fetchMatrix(matriceCode, params = {}) {
    const key = `${matriceCode}_${JSON.stringify(params)}`;
    if (this._cache[key]) return this._cache[key];

    const baseUrl = this._proxy
      ? `${this._proxy}/inse?matrice=${matriceCode}`
      : `https://statistici.insse.ro:8077/tempo-ins/matrix/${matriceCode}?language=ro`;

    try {
      const resp = await fetch(baseUrl, {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(15000),
      });
      if (!resp.ok) {
        console.warn(`[INSE] ${matriceCode}: HTTP ${resp.status}`);
        return null;
      }
      const data = await resp.json();
      this._cache[key] = data;
      return data;
    } catch(e) {
      console.warn(`[INSE] ${matriceCode}:`, e.message);
      return null;
    }
  },

  // Extrage valoarea pentru un UAT specific din răspunsul INSE
  _extractValue(data, judetCode, an = '2021') {
    if (!data) return null;
    try {
      // Structura INSE: data.dimensionsMap → data.data
      const dims = data.dimensionsMap || {};
      const rows = data.data || [];
      // Căutăm după cod județ și an
      for (const row of rows) {
        if (row.label?.includes(judetCode) && row.label?.includes(an)) {
          return parseFloat(row.value) || null;
        }
      }
      // Fallback: caută în hierarchyItems
      const items = data.hierarchyItems || [];
      for (const item of items) {
        if (item.code === judetCode || item.name?.includes(judetCode)) {
          const val = item.values?.[an] || item.value;
          if (val) return parseFloat(val);
        }
      }
    } catch(e) {}
    return null;
  },

  // Îmbogățește city{} cu date live INSE
  async enrichCity(city) {
    const judet = city.judet_code || city.judet?.slice(0,2).toUpperCase() || '';
    if (!judet) return city;

    console.log(`[INSE] Fetch date pentru ${city.name} (${judet})...`);

    const [popData, natData, decData, salData, somData, autData] = await Promise.allSettled([
      this.fetchMatrix(this.MATRICES.populatie),
      this.fetchMatrix(this.MATRICES.nasteri),
      this.fetchMatrix(this.MATRICES.decese),
      this.fetchMatrix(this.MATRICES.salarii),
      this.fetchMatrix(this.MATRICES.somaj),
      this.fetchMatrix(this.MATRICES.autorizatii),
    ]);

    const enriched = { ...city };

    // Populație
    const pop = this._extractValue(popData.value, judet, '2021');
    if (pop) { enriched.pop2021 = pop; enriched._inse_pop = true; }

    const pop11 = this._extractValue(popData.value, judet, '2011');
    if (pop11) { enriched.pop2011 = pop11; enriched._inse_pop11 = true; }

    // Natalitate / mortalitate → spor natural → rată reală
    const nasc = this._extractValue(natData.value, judet, '2021');
    const dec  = this._extractValue(decData.value, judet, '2021');
    if (nasc && enriched.pop2021) enriched.natalitate_inse = Math.round(nasc / enriched.pop2021 * 1000 * 10) / 10;
    if (dec  && enriched.pop2021) enriched.mortalitate_inse= Math.round(dec  / enriched.pop2021 * 1000 * 10) / 10;

    // Salariu mediu net
    const sal = this._extractValue(salData.value, judet, '2021');
    if (sal) { enriched.salariu_net_inse = Math.round(sal * 0.75); enriched._inse_sal = true; } // brut → net

    // Șomaj
    const som = this._extractValue(somData.value, judet, '2021');
    if (som && enriched.pop2021) enriched.rata_somaj_inse = Math.round(som / enriched.pop2021 * 100 * 10) / 10;

    // Autorizații construire
    const aut = this._extractValue(autData.value, judet, '2023');
    if (aut) { enriched.autorizatii_2023 = aut; enriched._inse_aut = true; }

    // Rata reală recalculată din date INSE
    if (enriched.pop2021 && enriched.pop2011) {
      enriched.rata_reala_2011_2021 = Math.round((enriched.pop2021 - enriched.pop2011) / enriched.pop2011 / 10 * 100 * 100) / 100;
    }

    const surse = [
      enriched._inse_pop && 'POP',
      enriched._inse_sal && 'SAL',
      enriched._inse_aut && 'AUT',
    ].filter(Boolean).join('+');

    console.log(`[INSE] ${city.name}: date live ${surse || 'indisponibile — folosim estimări'}`);
    return enriched;
  },

  // Verifică dacă INSE API este accesibil
  async healthCheck() {
    try {
      const url = this._proxy ? `${this._proxy}/health` : 'https://statistici.insse.ro:8077/tempo-ins/matrix/POP107A?language=ro';
      const resp = await fetch(url, { signal: AbortSignal.timeout(5000) });
      return resp.ok;
    } catch(e) { return false; }
  },
};
