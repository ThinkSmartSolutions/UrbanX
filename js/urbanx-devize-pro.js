/* ============================================================================
 * UrbanX — DEVIZE & COST MANAGEMENT (motor complet, window.UXDevizePro)
 * Implementare INTEGRALĂ a specificației: articole de deviz cu resurse (materiale/
 * manoperă/utilaj/transport), bibliotecă de norme, deviz pe obiect (Anexa 8 HG907)
 * + deviz general (reutilizează UXDevize existent pt Cap.1-7), preț pe 4 niveluri
 * versionat (referință→actualizat cu indice INSSE CNS107D→ofertă furnizor→folosit),
 * ofertare→contract→situații de lucrări→decontare, garanții de bună execuție,
 * flux de aprobare pe stări + audit trail, alertare preț/buget, relevee pe nivel,
 * card GIS de investiție. Fundamentul HG907 (Cap.1-7) rămâne în urbanx-deviz-engine.js
 * (UXDevize) — NU se dublează, se reutilizează prin computeDevizGeneral() de mai jos.
 *
 * Persistență: Supabase (window._supabase, deja configurat în 00-globals.js) —
 * schema completă în js/urbanx-devize-pro-schema.sql (rulați o singură dată în
 * Supabase SQL Editor). Fallback: dacă Supabase indisponibil, coadă locală
 * (localStorage) + sincronizare la reconectare, ca la _CloudSync.
 *
 * window.UXDevizePro — vezi lista completă de metode la finalul fișierului.
 * ========================================================================== */
(function (G) {
  'use strict';

  // ── Config & helpers Supabase ──────────────────────────────────────────────
  function sb() { return G._supabase || null; }
  function userEmail() { try { return (G._authUser && G._authUser.email) || (G._USER && G._USER.email) || 'anonim'; } catch (e) { return 'anonim'; } }
  function uuid() { try { return crypto.randomUUID(); } catch (e) { return 'id' + Date.now() + '_' + Math.random().toString(36).slice(2, 10); } }
  function nowIso() { return new Date().toISOString(); }

  // Coadă locală pt operații care nu au putut ajunge la Supabase (offline/eroare/schema
  // încă nerulată) — sincronizată la reconectare. Suportă cerința 5bis (offline șantier).
  var QKEY = 'ux_devize_offline_queue_v1';
  function queueGet() { try { return JSON.parse(localStorage.getItem(QKEY) || '[]'); } catch (e) { return []; } }
  function queueSet(a) { try { localStorage.setItem(QKEY, JSON.stringify(a)); } catch (e) {} }
  function queuePush(op) { var a = queueGet(); a.push(Object.assign({ ts: Date.now() }, op)); queueSet(a); }

  // OGLINDĂ LOCALĂ (cache pe tabel) — fără ea, sbSelect ar întoarce mereu [] cât timp
  // Supabase e indisponibil sau schema nu a fost încă rulată, deși sbInsert ACCEPTĂ scrierea
  // (o pune în coadă). Rezultat fără oglindă: un proiect/articol creat DISPARE la următorul
  // re-render al UI-ului. Cu oglinda, citirile rămân corecte local până la sincronizare.
  var MKEY = 'ux_devize_local_mirror_v1';
  function mirrorGet() { try { return JSON.parse(localStorage.getItem(MKEY) || '{}'); } catch (e) { return {}; } }
  function mirrorSet(m) { try { localStorage.setItem(MKEY, JSON.stringify(m)); } catch (e) {} }
  function mirrorUpsert(table, row) { var m = mirrorGet(); var a = m[table] || []; var i = a.findIndex(function (r) { return r.id === row.id; }); if (i >= 0) a[i] = Object.assign({}, a[i], row); else a.push(row); m[table] = a; mirrorSet(m); }
  function mirrorRemove(table, id) { var m = mirrorGet(); m[table] = (m[table] || []).filter(function (r) { return r.id !== id; }); mirrorSet(m); }
  function mirrorRows(table, filters) {
    var rows = (mirrorGet()[table] || []);
    (filters || []).forEach(function (f) { if (!f.op || f.op === 'eq') rows = rows.filter(function (r) { return r[f.col] === f.val; }); });
    return rows;
  }

  // wrapper generic peste supabase-js: table+method, cu fallback la coadă offline pt scrieri
  // + oglindă locală (mereu actualizată, indiferent dacă scrierea a mers direct sau a intrat în coadă)
  function sbInsert(table, row) {
    mirrorUpsert(table, row);
    var s = sb();
    if (!s) { queuePush({ op: 'insert', table: table, row: row }); return Promise.resolve(Object.assign({ _offline: true }, row)); }
    return s.from(table).insert(row).select().then(function (res) {
      if (res.error) { queuePush({ op: 'insert', table: table, row: row }); return Object.assign({ _offline: true, _error: res.error.message }, row); }
      var saved = (res.data && res.data[0]) || row; mirrorUpsert(table, saved); return saved;
    }).catch(function (e) { queuePush({ op: 'insert', table: table, row: row }); return Object.assign({ _offline: true, _error: e.message }, row); });
  }
  function sbUpdate(table, id, patch) {
    mirrorUpsert(table, Object.assign({ id: id }, patch));
    var s = sb();
    if (!s) { queuePush({ op: 'update', table: table, id: id, patch: patch }); return Promise.resolve(Object.assign({ id: id, _offline: true }, patch)); }
    return s.from(table).update(patch).eq('id', id).select().then(function (res) {
      if (res.error) { queuePush({ op: 'update', table: table, id: id, patch: patch }); return Object.assign({ id: id, _offline: true }, patch); }
      var saved = (res.data && res.data[0]) || Object.assign({ id: id }, patch); mirrorUpsert(table, saved); return saved;
    }).catch(function () { queuePush({ op: 'update', table: table, id: id, patch: patch }); return Object.assign({ id: id, _offline: true }, patch); });
  }
  function sbDelete(table, id) {
    mirrorRemove(table, id);
    var s = sb();
    if (!s) { queuePush({ op: 'delete', table: table, id: id }); return Promise.resolve({ id: id, _offline: true }); }
    return s.from(table)['delete']().eq('id', id).then(function (res) { return res.error ? { id: id, _error: res.error.message } : { id: id }; }).catch(function (e) { return { id: id, _error: e.message }; });
  }
  // citire: interoghează Supabase (dacă disponibil) + COMBINĂ cu oglinda locală, deduplicat pe
  // id (varianta din Supabase câștigă la conflict, fiind sursa autoritativă odată sincronizată)
  function sbSelect(table, filters) {
    var local = mirrorRows(table, filters);
    var s = sb();
    if (!s) return Promise.resolve(local);
    var q = s.from(table).select('*');
    (filters || []).forEach(function (f) { q = q[f.op || 'eq'](f.col, f.val); });
    return q.then(function (res) {
      var remote = res.error ? [] : (res.data || []);
      var byId = {}; local.forEach(function (r) { byId[r.id] = r; }); remote.forEach(function (r) { byId[r.id] = r; });
      return Object.keys(byId).map(function (k) { return byId[k]; });
    }).catch(function () { return local; });
  }
  function syncOfflineQueue() {
    var s = sb(); if (!s) return Promise.resolve(0);
    var q = queueGet(); if (!q.length) return Promise.resolve(0);
    var rest = [];
    var chain = q.reduce(function (p, op) {
      return p.then(function () {
        var t = op.table;
        if (op.op === 'insert') return s.from(t).insert(op.row).then(function (r) { if (r.error) rest.push(op); });
        if (op.op === 'update') return s.from(t).update(op.patch).eq('id', op.id).then(function (r) { if (r.error) rest.push(op); });
        if (op.op === 'delete') return s.from(t)['delete']().eq('id', op.id).then(function (r) { if (r.error) rest.push(op); });
        return Promise.resolve();
      }).catch(function () { rest.push(op); });
    }, Promise.resolve());
    return chain.then(function () { queueSet(rest); return q.length - rest.length; });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 1. PROIECTE / OBIECTE / CATEGORII
  // ══════════════════════════════════════════════════════════════════════════
  function listProiecte() { return sbSelect('deviz_proiecte').then(function (a) { return a.sort(function (x, y) { return new Date(y.created_at) - new Date(x.created_at); }); }); }
  function getProiect(id) { return sbSelect('deviz_proiecte', [{ col: 'id', val: id }]).then(function (a) { return a[0] || null; }); }
  function createProiect(p) {
    var row = { id: uuid(), nume: p.nume || 'Proiect nou', uat_key: p.uat_key || null, sursa_finantare: p.sursa_finantare || 'buget_local', status: 'activ', parcel_centroid: p.parcel_centroid || null, created_by: userEmail(), created_at: nowIso(), updated_at: nowIso() };
    return sbInsert('deviz_proiecte', row).then(function (r) { logAudit({ entitate: 'proiect', entitate_id: row.id, camp_modificat: '(creare)', valoare_noua: row.nume }); return r; });
  }
  function updateProiect(id, patch) { return sbUpdate('deviz_proiecte', id, Object.assign({ updated_at: nowIso() }, patch)); }

  function listObiecte(proiectId) { return sbSelect('deviz_obiecte', [{ col: 'proiect_id', val: proiectId }]).then(function (a) { return a.sort(function (x, y) { return (x.ordine || 0) - (y.ordine || 0); }); }); }
  function createObiect(proiectId, o) {
    var row = { id: uuid(), proiect_id: proiectId, cod: o.cod || '', denumire: o.denumire || 'Obiect', ordine: o.ordine || 0, created_at: nowIso() };
    return sbInsert('deviz_obiecte', row);
  }
  function listCategorii(obiectId) { return sbSelect('deviz_categorii', [{ col: 'obiect_id', val: obiectId }]).then(function (a) { return a.sort(function (x, y) { return (x.ordine || 0) - (y.ordine || 0); }); }); }
  function createCategorie(obiectId, c) {
    var row = { id: uuid(), obiect_id: obiectId, cod: c.cod || '', denumire: c.denumire || 'Categorie', ordine: c.ordine || 0 };
    return sbInsert('deviz_categorii', row);
  }
  // Categoriile-tip standard din specificație (ARHITECTURĂ/INSTALAȚII/CONSTRUCȚII SPECIALE)
  var CATEGORII_STD = {
    arhitectura: ['Terasamente', 'Fundații', 'Beton', 'Cofraje', 'Armături', 'Zidării', 'Tencuieli', 'Gleturi', 'Zugrăveli', 'Pardoseli', 'Fațade', 'Tâmplărie', 'Acoperișuri'],
    instalatii: ['Sanitare', 'Termice', 'HVAC', 'Electrice', 'Curenți slabi', 'PSI', 'Fotovoltaice'],
    constructii_speciale: ['Drumuri', 'Rețele apă', 'Canalizare', 'Alimentare energie', 'Iluminat', 'Amenajări exterioare']
  };
  function creazaCategoriiStandard(obiectId, domenii) {
    domenii = domenii || ['arhitectura', 'instalatii'];
    var lista = []; domenii.forEach(function (d) { (CATEGORII_STD[d] || []).forEach(function (den) { lista.push(den); }); });
    return Promise.all(lista.map(function (den, i) { return createCategorie(obiectId, { denumire: den, ordine: i }); }));
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 2. RESURSE / NORME (bibliotecă) — secțiunea 2 din specificație
  // ══════════════════════════════════════════════════════════════════════════
  function listResurse(categorie) { return sbSelect('deviz_resurse', categorie ? [{ col: 'categorie', val: categorie }] : []); }
  function createResursa(r) {
    var row = { id: uuid(), cod: r.cod || '', denumire: r.denumire, um: r.um, categorie: r.categorie || 'material' };
    return sbInsert('deviz_resurse', row);
  }
  function listNorme(domeniu) { return sbSelect('deviz_norme', domeniu ? [{ col: 'domeniu', val: domeniu }] : []); }
  function normaResurse(normaId) { return sbSelect('deviz_norme_resurse', [{ col: 'norma_id', val: normaId }]); }
  // creazaNorma({cod_norma,denumire,um,domeniu,sursa,versiune}, resurse:[{resursa_id,tip,consum_unitar,um}])
  function creazaNorma(n, resurse) {
    var row = { id: uuid(), cod_norma: n.cod_norma || '', denumire: n.denumire, um: n.um, domeniu: n.domeniu || 'constructii', sursa: n.sursa || 'introdusa_user', versiune: n.versiune || '' };
    return sbInsert('deviz_norme', row).then(function (norma) {
      var nid = norma.id || row.id;
      return Promise.all((resurse || []).map(function (r) {
        return sbInsert('deviz_norme_resurse', { id: uuid(), norma_id: nid, resursa_id: r.resursa_id, tip: r.tip, consum_unitar: r.consum_unitar, um: r.um || null });
      })).then(function () { return norma; });
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 3. PREȚURI PE 4 NIVELURI — versionate, cu sursă+dată (secțiunea 7)
  // ══════════════════════════════════════════════════════════════════════════
  var NIVELURI = ['referinta', 'actualizat', 'oferta_furnizor', 'folosit'];
  function _marcheazaIstoric(resursaId, nivel) {
    var s = sb(); if (!s) return Promise.resolve();
    return s.from('deviz_preturi').update({ status: 'istoric' }).eq('resursa_id', resursaId).eq('nivel', nivel).eq('status', 'activ').then(function () {});
  }
  function _setPret(resursaId, nivel, valoare, sursaText, furnizorId) {
    return _marcheazaIstoric(resursaId, nivel).then(function () {
      var row = { id: uuid(), resursa_id: resursaId, nivel: nivel, valoare: valoare, data_valabilitate: new Date().toISOString().slice(0, 10), sursa_text: sursaText || '', furnizor_id: furnizorId || null, status: 'activ', created_by: userEmail(), created_at: nowIso() };
      return sbInsert('deviz_preturi', row);
    });
  }
  function setPretReferinta(resursaId, valoare, sursaText) { return _setPret(resursaId, 'referinta', valoare, sursaText || 'Bază proprie UrbanX'); }
  function setPretOfertaFurnizor(resursaId, valoare, furnizorId, sursaText) { return _setPret(resursaId, 'oferta_furnizor', valoare, sursaText || 'Ofertă furnizor', furnizorId); }
  function pretCurent(resursaId, nivel) {
    return sbSelect('deviz_preturi', [{ col: 'resursa_id', val: resursaId }, { col: 'nivel', val: nivel }, { col: 'status', val: 'activ' }]).then(function (a) { return a[0] || null; });
  }
  function istoricPreturi(resursaId) { return sbSelect('deviz_preturi', [{ col: 'resursa_id', val: resursaId }]).then(function (a) { return a.sort(function (x, y) { return new Date(y.created_at) - new Date(x.created_at); }); }); }
  // Nivel 2: preț actualizat = preț referință × (1 + indice_CNS107D%/100 față de baza salvată la referință)
  function setPretActualizat(resursaId) {
    return Promise.all([pretCurent(resursaId, 'referinta'), insIndexLatest('CNS107D', 'Total', 'Total')]).then(function (r) {
      var ref = r[0], idx = r[1];
      if (!ref) return { error: 'Nu există preț de referință pentru această resursă.' };
      var factor = idx ? (idx.valoare / 100) : 1;   // CNS107D e index Laspeyres (2021=100) — folosit ca factor relativ
      var valoare = Math.round(ref.valoare * factor * 100) / 100;
      var sursa = idx ? ('Preț referință × indice CNS107D ' + idx.perioada + ' (' + idx.valoare + '%, ' + idx.status + ')') : 'Preț referință (fără indice disponibil)';
      return _setPret(resursaId, 'actualizat', valoare, sursa);
    });
  }
  // Nivel 4: utilizatorul alege sursa (referinta|actualizat|oferta_furnizor) → copiază valoarea ca 'folosit', păstrând proveniența
  function alegePretFolosit(resursaId, nivelSursa) {
    return pretCurent(resursaId, nivelSursa).then(function (p) {
      if (!p) return { error: 'Nu există preț activ la nivelul ' + nivelSursa };
      return _setPret(resursaId, 'folosit', p.valoare, 'Ales din nivel „' + nivelSursa + '" · ' + (p.sursa_text || '') + ' · ' + p.data_valabilitate);
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 4. INDICI INSSE — CNS107D (generic INSSE Data Connector, secțiunea 5ter)
  // Citește data/ins-cns107d.json (generat offline de scripts/refresh_inse.py,
  // exact ca la datele demografice — verificat funcțional 11 aug 2026, fără
  // autentificare, fără dependență de vreun cont INSSE).
  // ══════════════════════════════════════════════════════════════════════════
  var _insCache = null;
  function _loadInsJson() {
    if (_insCache) return Promise.resolve(_insCache);
    return fetch('data/ins-cns107d.json?v=' + Date.now()).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) { _insCache = j || { serii: [] }; return _insCache; }).catch(function () { _insCache = { serii: [] }; return _insCache; });
  }
  function insIndexLatest(matrixCode, tipConstructie, tipLucrari) {
    return _loadInsJson().then(function (j) {
      var serii = (j.serii || []).filter(function (s) { return s.matrix_code === (matrixCode || 'CNS107D') && (!tipConstructie || s.tip_constructie === tipConstructie) && (!tipLucrari || s.tip_lucrari === tipLucrari); });
      if (!serii.length) return null;
      serii.sort(function (a, b) { return b.perioada.localeCompare(a.perioada); });
      return serii[0];
    });
  }
  function insIndexIstoric(matrixCode, tipConstructie, tipLucrari) {
    return _loadInsJson().then(function (j) {
      return (j.serii || []).filter(function (s) { return s.matrix_code === (matrixCode || 'CNS107D') && (!tipConstructie || s.tip_constructie === tipConstructie) && (!tipLucrari || s.tip_lucrari === tipLucrari); })
        .sort(function (a, b) { return a.perioada.localeCompare(b.perioada); });
    });
  }
  // sincronizează JSON-ul static în Supabase (opțional, pt interogare SQL/dashboard admin)
  function insIndexSync() {
    return _loadInsJson().then(function (j) {
      var serii = j.serii || []; if (!serii.length) return 0;
      var s = sb(); if (!s) return 0;
      return s.from('deviz_ins_index').upsert(serii.map(function (r) {
        return { source: 'INSSE', matrix_code: r.matrix_code, tip_constructie: r.tip_constructie, tip_lucrari: r.tip_lucrari, perioada: r.perioada, valoare: r.valoare, unitate: r.unitate || '%', status: r.status || 'provizoriu', retrieved_at: nowIso() };
      }), { onConflict: 'matrix_code,tip_constructie,tip_lucrari,perioada' }).then(function (res) { return res.error ? 0 : serii.length; }).catch(function () { return 0; });
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 5. ARTICOLE DE DEVIZ + CALCUL COST (secțiunile 1, 3, 3bis, 4)
  // ══════════════════════════════════════════════════════════════════════════

  // ── IMPORT AUTOMAT DIN PROIECTAREA UrbanX (AEDIS/Relevee) — date REALE, live ──
  // Nu depinde de o bază de norme populată manual: citește geometria REALĂ a
  // clădirii deja generată în modulul de relevee (window._RV.building/parcelParams),
  // calculează cantitățile cu FORMULELE DEJA EXISTENTE (js/15-relevee-deviz.js →
  // window._rvComputeQuantitati, sursă unică — nu se duplică) și prețurile de
  // referință deja încorporate (window._rvPreturiMateriale, surse INS/MDLPA).
  // Fiecare linie devine: 1 resursă + 1 normă-wrapper (1:1, consum=1) + 1 articol —
  // astfel prețul rămâne LIV actualizabil (indice CNS107D, ofertă furnizor) prin
  // motorul de preț pe 4 niveluri, nu îngheață o valoare fixă la import.
  function importDinProiectareUrbanX(obiectId) {
    var RV = G._RV;
    if (!RV || !RV.building || !RV.parcelParams || typeof G._rvComputeQuantitati !== 'function') {
      return Promise.resolve({ error: 'Niciun proiect AEDIS/Relevee activ pe hartă. Deschide un proiect (AEDIS → Generează relevee) înainte de import.' });
    }
    var calc = G._rvComputeQuantitati(RV.building, RV.parcelParams);
    var Q = calc.Q || {};
    var PRET_MAT = G._rvPreturiMateriale || {};
    var CATEG_MAP = G._rvCategoriiMateriale || {};
    var cursEur = (G.UXDevize && G.UXDevize.PRETURI && G.UXDevize.PRETURI._meta && G.UXDevize.PRETURI._meta.curs_eur) || 5.05;

    var keys = Object.keys(Q);
    var grupePeCategorie = {};
    keys.forEach(function (k) {
      var catKey = Object.keys(CATEG_MAP).filter(function (ck) { return k.indexOf(ck) === 0; })[0];
      var den = CATEG_MAP[catKey] || 'ALTE LUCRĂRI (import relevee)';
      (grupePeCategorie[den] = grupePeCategorie[den] || []).push(k);
    });
    var catDenumiri = Object.keys(grupePeCategorie);

    return listCategorii(obiectId).then(function (existente) {
      var existenteByName = {}; existente.forEach(function (c) { existenteByName[c.denumire] = c; });
      return Promise.all(catDenumiri.map(function (den, i) {
        return existenteByName[den] || createCategorie(obiectId, { denumire: den, ordine: i });
      }));
    }).then(function (categorii) {
      // procesare SECVENȚIALĂ (nu paralel) — evită supraîncărcarea Supabase la import mare
      var totalCreat = 0;
      return categorii.reduce(function (chain, cat, i) {
        var den = catDenumiri[i];
        var ks = grupePeCategorie[den];
        return chain.then(function () {
          return ks.reduce(function (inner, k) {
            return inner.then(function () {
              var row = Q[k];
              var pretEur = PRET_MAT[k] || 0;
              var pretRon = Math.round(pretEur * cursEur * 100) / 100;
              return createResursa({ cod: k, denumire: row.desc, um: row.u, categorie: 'material' }).then(function (res) {
                return creazaNorma({ cod_norma: k, denumire: row.desc, um: row.u, domeniu: 'constructii', sursa: 'proiectare_urbanx' },
                  [{ resursa_id: res.id, tip: 'material', consum_unitar: 1, um: row.u }]).then(function (norma) {
                  return (pretRon ? setPretReferinta(res.id, pretRon, 'Import automat din proiectarea UrbanX (relevee) — sursă INS/MDLPA, ' + pretEur + ' €/' + row.u + ' × curs ' + cursEur).then(function () { return alegePretFolosit(res.id, 'referinta'); }) : Promise.resolve())
                    .then(function () {
                      return createArticol(cat.id, { norma_id: norma.id, cod: k, denumire: row.desc, um: row.u, cantitate: Math.round((row.q || 0) * 100) / 100, sursa_cantitate: 'proiectat' });
                    });
                });
              }).then(function () { totalCreat++; });
            });
          }, Promise.resolve());
        });
      }, Promise.resolve()).then(function () {
        logAudit({ entitate: 'obiect', entitate_id: obiectId, camp_modificat: 'import_relevee', valoare_noua: totalCreat + ' articole', motiv: 'Import automat din proiectarea UrbanX (geometrie reală + preț referință INS/MDLPA)' });
        return { success: true, articole_create: totalCreat, categorii_create: catDenumiri.length, sc: calc.sc, sda: calc.sda };
      });
    });
  }

  // ── IMPORT FIȘIER (CSV) — bază de prețuri/articole externă (secțiunea 7, "oferte furnizor") ──
  function _parseCSV(text) {
    var sep = text.indexOf(';') > -1 ? ';' : ',';
    var linii = String(text || '').split(/\r?\n/).filter(function (l) { return l.trim().length; });
    if (!linii.length) return [];
    var head = linii[0].split(sep).map(function (h) { return h.trim().toLowerCase(); });
    return linii.slice(1).map(function (l) {
      var cel = l.split(sep), o = {};
      head.forEach(function (h, i) { o[h] = (cel[i] || '').trim(); });
      return o;
    });
  }
  function _num(s) { var n = parseFloat(String(s || '0').replace(',', '.')); return isNaN(n) ? 0 : n; }
  // coloane așteptate: cod;denumire;um;categorie;pret (referință) — o resursă+preț per rând
  function importCSVResurse(csvText) {
    var rows = _parseCSV(csvText).filter(function (r) { return r.denumire; });
    return rows.reduce(function (chain, r) {
      return chain.then(function (acc) {
        return createResursa({ cod: r.cod, denumire: r.denumire, um: r.um || 'buc', categorie: r.categorie || 'material' }).then(function (res) {
          var pret = _num(r.pret || r.pretreferinta || r['preț'] || 0);
          if (!pret) { acc.push(res); return acc; }
          return setPretReferinta(res.id, pret, 'Import CSV — bază de prețuri externă').then(function () { return alegePretFolosit(res.id, 'referinta'); }).then(function () { acc.push(res); return acc; });
        });
      });
    }, Promise.resolve([])).then(function (created) { return { imported: created.length }; });
  }
  // coloane așteptate: cod;denumire;um;cantitate;pretunitar — un articol liber per rând, direct într-o categorie
  function importCSVArticole(categorieId, csvText) {
    var rows = _parseCSV(csvText).filter(function (r) { return r.denumire; });
    return rows.reduce(function (chain, r) {
      return chain.then(function (acc) {
        return createArticol(categorieId, { cod: r.cod, denumire: r.denumire, um: r.um || 'buc', cantitate: _num(r.cantitate), pret_unitar_manual: _num(r.pretunitar || r.pret || r['preț unitar']), sursa_cantitate: 'manual' }).then(function (a) { acc.push(a); return acc; });
      });
    }, Promise.resolve([])).then(function (created) { return { imported: created.length }; });
  }

  function listArticole(categorieId) { return sbSelect('deviz_articole', [{ col: 'categorie_id', val: categorieId }]); }
  function createArticol(categorieId, a) {
    var row = {
      id: uuid(), categorie_id: categorieId, norma_id: a.norma_id || null, cod: a.cod || '', denumire: a.denumire,
      um: a.um, cantitate: +a.cantitate || 0, sursa_cantitate: a.sursa_cantitate || 'manual', relevee_id: a.relevee_id || null,
      pret_unitar_manual: a.pret_unitar_manual != null ? +a.pret_unitar_manual : null, created_by: userEmail(), created_at: nowIso()
    };
    return sbInsert('deviz_articole', row);
  }
  function updateArticol(id, patch, motiv) {
    return sbSelect('deviz_articole', [{ col: 'id', val: id }]).then(function (a) {
      var old = a[0] || {};
      return sbUpdate('deviz_articole', id, patch).then(function (r) {
        Object.keys(patch).forEach(function (k) {
          if (old[k] !== patch[k]) logAudit({ entitate: 'articol', entitate_id: id, camp_modificat: k, valoare_veche: String(old[k]), valoare_noua: String(patch[k]), motiv: motiv || '' });
        });
        return r;
      });
    });
  }
  function deleteArticol(id) { return sbDelete('deviz_articole', id); }

  // Cost articol: dacă are normă → sumă (consum_unitar × cantitate_articol) × preț_folosit_resursă, pe cele 4 tipuri;
  // altfel (articol liber) → cantitate × pret_unitar_manual.
  function costArticol(articol) {
    if (!articol.norma_id) {
      var v = (+articol.cantitate || 0) * (+articol.pret_unitar_manual || 0);
      return Promise.resolve({ materiale: 0, manopera: 0, utilaj: 0, transport: 0, total: v, detaliu: [] });
    }
    return normaResurse(articol.norma_id).then(function (nr) {
      return Promise.all(nr.map(function (r) {
        return pretCurent(r.resursa_id, 'folosit').then(function (p) {
          if (!p) return pretCurent(r.resursa_id, 'referinta'); // fallback dacă nu s-a ales încă un preț folosit
          return p;
        }).then(function (p) {
          var pretUnitar = p ? +p.valoare : 0;
          var valoare = (+r.consum_unitar || 0) * (+articol.cantitate || 0) * pretUnitar;
          return { tip: r.tip, resursa_id: r.resursa_id, consum_unitar: r.consum_unitar, pret_unitar: pretUnitar, valoare: valoare };
        });
      })).then(function (detaliu) {
        var sum = { materiale: 0, manopera: 0, utilaj: 0, transport: 0 };
        detaliu.forEach(function (d) {
          if (d.tip === 'material') sum.materiale += d.valoare;
          else if (d.tip === 'manopera') sum.manopera += d.valoare;
          else if (d.tip === 'utilaj') sum.utilaj += d.valoare;
          else if (d.tip === 'transport') sum.transport += d.valoare;
        });
        var total = sum.materiale + sum.manopera + sum.utilaj + sum.transport;
        return Object.assign({ total: total, detaliu: detaliu }, sum);
      });
    });
  }

  // Deviz pe obiect (Anexa 8 HG907/2016) — categorii → articole → cost
  function computeDevizObiect(obiectId) {
    return listCategorii(obiectId).then(function (categorii) {
      return Promise.all(categorii.map(function (cat) {
        return listArticole(cat.id).then(function (articole) {
          return Promise.all(articole.map(function (a) { return costArticol(a).then(function (c) { return Object.assign({ articol: a }, c); }); }))
            .then(function (costuri) {
              var subtotal = costuri.reduce(function (s, c) { return s + c.total; }, 0);
              return { categorie: cat, articole: costuri, subtotal: subtotal };
            });
        });
      })).then(function (cats) {
        var total = cats.reduce(function (s, c) { return s + c.subtotal; }, 0);
        return { obiect_id: obiectId, categorii: cats, total: total };
      });
    });
  }

  // Deviz general — REUTILIZEAZĂ UXDevize.computeDeviz (Cap.1-7 HG907, deja existent),
  // dar suprascrie Cap.4.1 (c41) cu suma REALĂ pe articole când există, altfel fallback
  // pe vechiul estimator top-down (Sc × cost_mp_functiune) — extensie neinvazivă.
  function computeDevizGeneral(proiectId, Dparams) {
    return listObiecte(proiectId).then(function (obiecte) {
      return Promise.all(obiecte.map(function (o) { return computeDevizObiect(o.id); }));
    }).then(function (devizeObiecte) {
      var sumaArticole = devizeObiecte.reduce(function (s, d) { return s + d.total; }, 0);
      var D = Object.assign({}, Dparams || {});
      if (sumaArticole > 0) D.deviz = Object.assign({}, D.deviz, { c41: Math.round(sumaArticole) });
      var dz = (G.UXDevize && G.UXDevize.computeDeviz) ? G.UXDevize.computeDeviz(D) : null;
      return { proiect_id: proiectId, obiecte: devizeObiecte, suma_articole_c41: sumaArticole, deviz_general: dz, sursa_c41: sumaArticole > 0 ? 'articole_reale' : 'estimare_top_down' };
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 6. RELEVEE PE NIVEL (secțiunea 3bis)
  // ══════════════════════════════════════════════════════════════════════════
  function listRelevee(proiectId) { return sbSelect('deviz_relevee', [{ col: 'proiect_id', val: proiectId }]); }
  function addRelevee(proiectId, r) {
    var row = { id: uuid(), proiect_id: proiectId, nivel_nume: r.nivel_nume, fisier_url: r.fisier_url || null, fisier_nume: r.fisier_nume || null, tip_fisier: r.tip_fisier || 'pdf', data_masurare: r.data_masurare || new Date().toISOString().slice(0, 10), autor: r.autor || userEmail(), versiune: r.versiune || 1, created_at: nowIso() };
    return sbInsert('deviz_relevee', row);
  }
  // upload fișier în Supabase Storage (bucket 'devize-relevee') — dacă bucket-ul nu e creat, degradare
  // gracioasă la salvarea doar a metadatelor (fără fișier atașat, doar referință text).
  function uploadReleveeFile(proiectId, nivelNume, file) {
    var s = sb();
    if (!s || !s.storage) return addRelevee(proiectId, { nivel_nume: nivelNume, fisier_nume: file ? file.name : null, tip_fisier: (file && file.name.split('.').pop()) || 'pdf' });
    var path = proiectId + '/' + nivelNume + '/' + Date.now() + '_' + file.name;
    return s.storage.from('devize-relevee').upload(path, file).then(function (res) {
      if (res.error) return addRelevee(proiectId, { nivel_nume: nivelNume, fisier_nume: file.name, tip_fisier: file.name.split('.').pop() });
      var pub = s.storage.from('devize-relevee').getPublicUrl(path);
      return addRelevee(proiectId, { nivel_nume: nivelNume, fisier_url: pub && pub.data && pub.data.publicUrl, fisier_nume: file.name, tip_fisier: file.name.split('.').pop() });
    }).catch(function () { return addRelevee(proiectId, { nivel_nume: nivelNume, fisier_nume: file.name, tip_fisier: file.name.split('.').pop() }); });
  }
  // compară cantitatea din articol (proiectat) cu cantitatea introdusă manual din relevee (relevat)
  function comparaProiectatVsRelevat(articolProiectatId, cantitateRelevata) {
    return sbSelect('deviz_articole', [{ col: 'id', val: articolProiectatId }]).then(function (a) {
      var art = a[0]; if (!art) return null;
      var proiectat = +art.cantitate || 0;
      var abatere = proiectat ? Math.round(((cantitateRelevata - proiectat) / proiectat) * 10000) / 100 : null;
      return { proiectat: proiectat, relevat: cantitateRelevata, abatere_pct: abatere };
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 7. FURNIZORI / OFERTARE → CONTRACT → SITUAȚII DE LUCRĂRI → DECONTARE (8-10, 16)
  // ══════════════════════════════════════════════════════════════════════════
  function listFurnizori() { return sbSelect('deviz_furnizori'); }
  function creazaFurnizor(f) { var row = { id: uuid(), nume: f.nume, contact: f.contact || '', cui: f.cui || '' }; return sbInsert('deviz_furnizori', row); }

  function listContracte(proiectId) { return sbSelect('deviz_contracte', [{ col: 'proiect_id', val: proiectId }]); }
  function creazaContract(proiectId, c) {
    var row = { id: uuid(), proiect_id: proiectId, furnizor_id: c.furnizor_id || null, numar: c.numar || ('CTR-' + new Date().getFullYear() + '-' + Date.now() % 10000), valoare: +c.valoare || 0, data_semnare: c.data_semnare || new Date().toISOString().slice(0, 10), procent_garantie_retinere: c.procent_garantie_retinere != null ? +c.procent_garantie_retinere : 5, garantie_acumulata: 0, garantie_eliberata: 0, status: 'activ', created_at: nowIso() };
    return sbInsert('deviz_contracte', row).then(function (r) { tranzitioneazaStare('contract', row.id, 'contractat', 'Contract creat'); return r; });
  }

  function listSituatii(contractId) { return sbSelect('deviz_situatii_lucrari', [{ col: 'contract_id', val: contractId }]); }
  function creazaSituatie(contractId, s) {
    var row = { id: uuid(), contract_id: contractId, perioada: s.perioada || new Date().toISOString().slice(0, 7), status: 'in_lucru', created_by: userEmail(), created_at: nowIso() };
    return sbInsert('deviz_situatii_lucrari', row).then(function (r) { tranzitioneazaStare('situatie', row.id, 'in_executie', 'Situație de lucrări creată pentru ' + row.perioada); return r; });
  }
  function listSituatieArticole(situatieId) { return sbSelect('deviz_situatii_articole', [{ col: 'situatie_id', val: situatieId }]); }
  // secțiunea 9: articol contractat/executat anterior/executat luna aceasta/total executat/rest
  function addSituatieArticol(situatieId, a) {
    var row = { id: uuid(), situatie_id: situatieId, articol_id: a.articol_id, cantitate_executata_anterior: +a.cantitate_executata_anterior || 0, cantitate_executata_luna: +a.cantitate_executata_luna || 0, atasamente: a.atasamente || [] };
    return sbInsert('deviz_situatii_articole', row);
  }
  // atașamente foto/video (secțiunea 17) — {url, tip:'foto'|'video', geo:[lon,lat], data}
  function addAtasamentSituatieArticol(situatieArticolId, atasament) {
    return sbSelect('deviz_situatii_articole', [{ col: 'id', val: situatieArticolId }]).then(function (a) {
      var row = a[0]; if (!row) return null;
      var atas = (row.atasamente || []).concat([Object.assign({ data: nowIso() }, atasament)]);
      return sbUpdate('deviz_situatii_articole', situatieArticolId, { atasamente: atas });
    });
  }
  function uploadAtasamentFoto(situatieArticolId, file, geo) {
    var s = sb();
    if (!s || !s.storage) return addAtasamentSituatieArticol(situatieArticolId, { tip: /video/.test(file.type || '') ? 'video' : 'foto', geo: geo || null, fisier_nume: file.name });
    var path = 'situatii/' + situatieArticolId + '/' + Date.now() + '_' + file.name;
    return s.storage.from('devize-relevee').upload(path, file).then(function (res) {
      var url = null; if (!res.error) { var pub = s.storage.from('devize-relevee').getPublicUrl(path); url = pub && pub.data && pub.data.publicUrl; }
      return addAtasamentSituatieArticol(situatieArticolId, { tip: /video/.test(file.type || '') ? 'video' : 'foto', url: url, geo: geo || null, fisier_nume: file.name });
    }).catch(function () { return addAtasamentSituatieArticol(situatieArticolId, { tip: 'foto', geo: geo || null, fisier_nume: file.name }); });
  }

  // Valoarea situației de plată (articol × preț folosit) + garanție reținută (secțiunea 16)
  function computeSituatiePlata(situatieId) {
    return Promise.all([listSituatieArticole(situatieId), sbSelect('deviz_situatii_lucrari', [{ col: 'id', val: situatieId }])]).then(function (r) {
      var articole = r[0], situatie = r[1][0]; if (!situatie) return null;
      return sbSelect('deviz_contracte', [{ col: 'id', val: situatie.contract_id }]).then(function (ca) {
        var contract = ca[0] || {};
        return Promise.all(articole.map(function (sa) {
          return sbSelect('deviz_articole', [{ col: 'id', val: sa.articol_id }]).then(function (aa) {
            var art = aa[0]; if (!art) return null;
            return costArticol(Object.assign({}, art, { cantitate: sa.cantitate_executata_luna })).then(function (c) {
              return {
                articol: art, cantitate_contractata: art.cantitate, executat_anterior: sa.cantitate_executata_anterior,
                executat_luna: sa.cantitate_executata_luna, total_executat: sa.cantitate_executata_anterior + sa.cantitate_executata_luna,
                rest: art.cantitate - (sa.cantitate_executata_anterior + sa.cantitate_executata_luna), valoare_luna: c.total
              };
            });
          });
        })).then(function (linii) {
          linii = linii.filter(Boolean);
          var valoareBruta = linii.reduce(function (s, l) { return s + l.valoare_luna; }, 0);
          var procentGarantie = contract.procent_garantie_retinere != null ? contract.procent_garantie_retinere : 5;
          var garantieRetinuta = Math.round(valoareBruta * (procentGarantie / 100) * 100) / 100;
          var valoareNeta = valoareBruta - garantieRetinuta;
          return { situatie: situatie, contract: contract, linii: linii, valoare_bruta: valoareBruta, procent_garantie: procentGarantie, garantie_retinuta: garantieRetinuta, valoare_neta_plata: valoareNeta };
        });
      });
    });
  }
  function deconteazaSituatie(situatieId) {
    return computeSituatiePlata(situatieId).then(function (calc) {
      if (!calc) return { error: 'Situație inexistentă' };
      return sbUpdate('deviz_situatii_lucrari', situatieId, { status: 'decontat' }).then(function () {
        return sbUpdate('deviz_contracte', calc.contract.id, { garantie_acumulata: (calc.contract.garantie_acumulata || 0) + calc.garantie_retinuta });
      }).then(function () {
        tranzitioneazaStare('situatie', situatieId, 'decontat', 'Decontat: ' + calc.valoare_neta_plata + ' RON net (garanție reținută ' + calc.garantie_retinuta + ' RON)');
        return calc;
      });
    });
  }
  // eliberare garanție de bună execuție la recepție (parțială/finală, secțiunea 16)
  function elibereazaGarantie(contractId, suma, motiv) {
    return sbSelect('deviz_contracte', [{ col: 'id', val: contractId }]).then(function (a) {
      var c = a[0]; if (!c) return { error: 'Contract inexistent' };
      var disponibil = (c.garantie_acumulata || 0) - (c.garantie_eliberata || 0);
      var deEliberat = Math.min(suma, disponibil);
      return sbUpdate('deviz_contracte', contractId, { garantie_eliberata: (c.garantie_eliberata || 0) + deEliberat }).then(function () {
        tranzitioneazaStare('contract', contractId, 'receptionat', 'Garanție eliberată: ' + deEliberat + ' RON · ' + (motiv || ''));
        return { eliberat: deEliberat, ramas_retinut: disponibil - deEliberat };
      });
    });
  }
  function garantieStatus(contractId) {
    return sbSelect('deviz_contracte', [{ col: 'id', val: contractId }]).then(function (a) {
      var c = a[0]; if (!c) return null;
      return { acumulata: c.garantie_acumulata || 0, eliberata: c.garantie_eliberata || 0, disponibil_retinut: (c.garantie_acumulata || 0) - (c.garantie_eliberata || 0), procent: c.procent_garantie_retinere };
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 8. FLUX DE APROBARE PE STĂRI + AUDIT TRAIL (secțiunile 13, 13bis)
  // ══════════════════════════════════════════════════════════════════════════
  var STARI_VALIDE = ['emis', 'aprobat', 'contractat', 'in_executie', 'decontat', 'receptionat'];
  function tranzitioneazaStare(refTip, refId, staraNoua, comentariu) {
    var row = { id: uuid(), ref_tip: refTip, ref_id: refId, stare: staraNoua, user_email: userEmail(), comentariu: comentariu || '', created_at: nowIso() };
    return sbInsert('deviz_stari', row);
  }
  function istoricStari(refTip, refId) {
    return sbSelect('deviz_stari', [{ col: 'ref_tip', val: refTip }, { col: 'ref_id', val: refId }]).then(function (a) { return a.sort(function (x, y) { return new Date(x.created_at) - new Date(y.created_at); }); });
  }
  function staraCurenta(refTip, refId) { return istoricStari(refTip, refId).then(function (a) { return a.length ? a[a.length - 1].stare : null; }); }

  function logAudit(a) {
    var row = { id: uuid(), entitate: a.entitate, entitate_id: a.entitate_id || null, user_email: userEmail(), camp_modificat: a.camp_modificat || '', valoare_veche: a.valoare_veche != null ? String(a.valoare_veche) : null, valoare_noua: a.valoare_noua != null ? String(a.valoare_noua) : null, motiv: a.motiv || '', created_at: nowIso() };
    return sbInsert('deviz_audit_log', row);
  }
  function istoricAudit(entitate, entitateId) {
    return sbSelect('deviz_audit_log', [{ col: 'entitate', val: entitate }, { col: 'entitate_id', val: entitateId }]).then(function (a) { return a.sort(function (x, y) { return new Date(y.created_at) - new Date(x.created_at); }); });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 9. ALERTARE PREȚ/BUGET (secțiunea 19)
  // ══════════════════════════════════════════════════════════════════════════
  function verificaAlertaPret(resursaId, proiectId, pragPct) {
    pragPct = pragPct || 10;
    return Promise.all([pretCurent(resursaId, 'folosit'), pretCurent(resursaId, 'actualizat')]).then(function (r) {
      var folosit = r[0], actualizat = r[1];
      if (!folosit || !actualizat) return null;
      var abatere = Math.round(((actualizat.valoare - folosit.valoare) / folosit.valoare) * 10000) / 100;
      if (Math.abs(abatere) < pragPct) return null;
      var row = { id: uuid(), proiect_id: proiectId || null, tip: 'pret_resursa', ref_id: resursaId, mesaj: 'Prețul actualizat (' + actualizat.valoare + ') diferă cu ' + abatere + '% față de prețul folosit în deviz (' + folosit.valoare + ')', procent_abatere: abatere, vazuta: false, created_at: nowIso() };
      return sbInsert('deviz_alerte', row);
    });
  }
  function verificaAlertaBuget(proiectId, valoareExecutata, valoareContractata, pragPct) {
    pragPct = pragPct || 90;
    if (!valoareContractata) return Promise.resolve(null);
    var procent = Math.round((valoareExecutata / valoareContractata) * 10000) / 100;
    if (procent < pragPct) return Promise.resolve(null);
    var row = { id: uuid(), proiect_id: proiectId, tip: 'buget_articol', ref_id: null, mesaj: 'Valoare executată/decontată (' + procent + '%) se apropie sau depășește valoarea contractată', procent_abatere: procent, vazuta: false, created_at: nowIso() };
    return sbInsert('deviz_alerte', row);
  }
  function listAlerte(proiectId) { return sbSelect('deviz_alerte', proiectId ? [{ col: 'proiect_id', val: proiectId }] : []).then(function (a) { return a.sort(function (x, y) { return new Date(y.created_at) - new Date(x.created_at); }); }); }
  function marcheazaAlertaVazuta(id) { return sbUpdate('deviz_alerte', id, { vazuta: true }); }

  // ══════════════════════════════════════════════════════════════════════════
  // 10. CARD GIS DE INVESTIȚIE (secțiunea 11)
  // ══════════════════════════════════════════════════════════════════════════
  function cardInvestitie(proiectId) {
    return Promise.all([getProiect(proiectId), computeDevizGeneral(proiectId), listContracte(proiectId)]).then(function (r) {
      var proiect = r[0], deviz = r[1], contracte = r[2];
      var valoareInvestitie = (deviz.deviz_general && deviz.deviz_general.v && deviz.deviz_general.v.total) || deviz.suma_articole_c41 || 0;
      var valoareContract = contracte.reduce(function (s, c) { return s + (+c.valoare || 0); }, 0);
      return Promise.all(contracte.map(function (c) { return listSituatii(c.id); })).then(function (situatiiPerContract) {
        var toateSituatiile = [].concat.apply([], situatiiPerContract);
        return Promise.all(toateSituatiile.map(function (s) { return computeSituatiePlata(s.id); })).then(function (calcuri) {
          calcuri = calcuri.filter(Boolean);
          var executat = calcuri.reduce(function (s, c) { return s + c.valoare_bruta; }, 0);
          var platit = calcuri.filter(function (c) { return c.situatie.status === 'decontat'; }).reduce(function (s, c) { return s + c.valoare_neta_plata; }, 0);
          var progresFinanciar = valoareContract ? Math.round((executat / valoareContract) * 1000) / 10 : 0;
          return {
            proiect: proiect, valoare_investitie: Math.round(valoareInvestitie), valoare_contract: Math.round(valoareContract),
            executat: Math.round(executat), progres_financiar_pct: progresFinanciar, platit: Math.round(platit),
            rest_contract: Math.round(valoareContract - executat)
          };
        });
      });
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 11. EXPORT DOCUMENTE — F1-F5 + Deviz pe obiect (secțiunile 4, 6)
  // Reutilizează G.UXDocBuilder.docHtml (același stil vizual ca restul platformei)
  // ══════════════════════════════════════════════════════════════════════════
  function _esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function _tbl(rows, head) {
    var h = head ? ('<tr>' + head.map(function (c) { return '<th>' + _esc(c) + '</th>'; }).join('') + '</tr>') : '';
    var b = rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + _esc(c) + '</td>'; }).join('') + '</tr>'; }).join('');
    return '<table>' + h + b + '</table>';
  }
  function _lei(n) { return Math.round(n || 0).toLocaleString('ro-RO'); }

  function htmlDevizObiect(devizObiect, obiect) {
    var rows = [];
    devizObiect.categorii.forEach(function (cat) {
      rows.push(['', '<b>' + _esc(cat.categorie.denumire) + '</b>', '', '']);
      cat.articole.forEach(function (c) {
        rows.push([c.articol.cod || '', c.articol.denumire, c.articol.cantitate + ' ' + c.articol.um, _lei(c.total)]);
      });
      rows.push(['', '<b>Subtotal ' + _esc(cat.categorie.denumire) + '</b>', '', '<b>' + _lei(cat.subtotal) + '</b>']);
    });
    return '<p style="text-align:center;font-weight:bold">DEVIZ PE OBIECT ' + _esc(obiect.cod || '') + ' — ' + _esc(obiect.denumire) + '</p>' +
      '<p style="font-size:10pt">conform HG 907/2016, Anexa nr. 8</p>' +
      _tbl(rows, ['Cod', 'Denumire', 'Cantitate', 'Valoare (lei)']) +
      '<p><b>TOTAL OBIECT: ' + _lei(devizObiect.total) + ' lei</b> (fără TVA)</p>';
  }

  // F1 — Centralizatorul cheltuielilor pe obiectiv
  function htmlF1(proiect, devizeObiecte) {
    var rows = devizeObiecte.map(function (d, i) { return [(i + 1), d.obiect_denumire || ('Obiect ' + (i + 1)), _lei(d.total)]; });
    var total = devizeObiecte.reduce(function (s, d) { return s + d.total; }, 0);
    rows.push(['', '<b>TOTAL</b>', '<b>' + _lei(total) + '</b>']);
    return '<p style="text-align:center;font-weight:bold">FORMULARUL F1 — Centralizatorul cheltuielilor pe obiectiv</p>' +
      '<p style="font-size:10pt">Obiectiv: ' + _esc(proiect.nume) + '</p>' + _tbl(rows, ['Nr.', 'Obiect', 'Valoare (lei)']);
  }
  // F2 — Centralizatorul cheltuielilor pe categorii de lucrări (pt un obiect dat)
  function htmlF2(obiect, devizObiect) {
    var rows = devizObiect.categorii.map(function (c, i) { return [(i + 1), c.categorie.denumire, _lei(c.subtotal)]; });
    return '<p style="text-align:center;font-weight:bold">FORMULARUL F2 — Centralizator pe categorii de lucrări</p>' +
      '<p style="font-size:10pt">Obiect: ' + _esc(obiect.denumire) + '</p>' + _tbl(rows, ['Nr.', 'Categorie', 'Valoare (lei)']);
  }
  // F3 — Lista cu cantități de lucrări
  function htmlF3(obiect, devizObiect) {
    var rows = [];
    devizObiect.categorii.forEach(function (cat) { cat.articole.forEach(function (c) { rows.push([c.articol.cod || '', c.articol.denumire, c.articol.um, c.articol.cantitate, _lei(c.total / (c.articol.cantitate || 1)), _lei(c.total)]); }); });
    return '<p style="text-align:center;font-weight:bold">FORMULARUL F3 — Lista cu cantități de lucrări</p>' +
      '<p style="font-size:10pt">Obiect: ' + _esc(obiect.denumire) + '</p>' + _tbl(rows, ['Cod', 'Denumire', 'UM', 'Cantitate', 'Preț unitar', 'Valoare']);
  }
  // F4 — Utilaje/echipamente (extras din resursele de tip utilaj ale articolelor)
  function htmlF4(obiect, devizObiect) {
    var util = {};
    devizObiect.categorii.forEach(function (cat) { cat.articole.forEach(function (c) { (c.detaliu || []).filter(function (d) { return d.tip === 'utilaj'; }).forEach(function (d) { util[d.resursa_id] = (util[d.resursa_id] || 0) + d.valoare; }); }); });
    var rows = Object.keys(util).map(function (k, i) { return [(i + 1), k, _lei(util[k])]; });
    return '<p style="text-align:center;font-weight:bold">FORMULARUL F4 — Utilaje, echipamente tehnologice</p>' +
      '<p style="font-size:10pt">Obiect: ' + _esc(obiect.denumire) + '</p>' + (rows.length ? _tbl(rows, ['Nr.', 'Resursă (id)', 'Valoare (lei)']) : '<p>Nicio resursă de tip utilaj identificată în articolele acestui obiect.</p>');
  }
  // F5 — Fișe tehnice (placeholder structurat — se completează per echipament)
  function htmlF5(obiect) {
    return '<p style="text-align:center;font-weight:bold">FORMULARUL F5 — Fișe tehnice utilaje/echipamente</p>' +
      '<p style="font-size:10pt">Obiect: ' + _esc(obiect.denumire) + '</p>' +
      '<p>Fișa tehnică se completează per echipament (producător, model, parametri, garanție) — secțiune de editare disponibilă în modulul Devize.</p>';
  }

  function generateDocumenteF1F5(proiectId) {
    return getProiect(proiectId).then(function (proiect) {
      return listObiecte(proiectId).then(function (obiecte) {
        return Promise.all(obiecte.map(function (o) { return computeDevizObiect(o.id).then(function (d) { return { obiect: o, devizObiect: Object.assign({ obiect_denumire: o.denumire }, d) }; }); }))
          .then(function (perechi) {
            var docs = [];
            docs.push({ cat: 'Devize', file: 'F1_Centralizator_obiectiv.doc', html: G.UXDocBuilder.docHtml({ titlu: 'FORMULARUL F1', subtitlu: 'Centralizatorul cheltuielilor pe obiectiv', proiect: proiect.nume }, [{ h: null, html: htmlF1(proiect, perechi.map(function (p) { return p.devizObiect; })) }]) });
            perechi.forEach(function (p) {
              var suf = '_' + (p.obiect.cod || p.obiect.denumire).replace(/[^a-zA-Z0-9]+/g, '_');
              docs.push({ cat: 'Devize', file: 'DevizObiect' + suf + '.doc', html: G.UXDocBuilder.docHtml({ titlu: 'DEVIZ PE OBIECT', subtitlu: p.obiect.denumire, proiect: proiect.nume }, [{ h: null, html: htmlDevizObiect(p.devizObiect, p.obiect) }]) });
              docs.push({ cat: 'Devize', file: 'F2' + suf + '.doc', html: G.UXDocBuilder.docHtml({ titlu: 'FORMULARUL F2', subtitlu: p.obiect.denumire, proiect: proiect.nume }, [{ h: null, html: htmlF2(p.obiect, p.devizObiect) }]) });
              docs.push({ cat: 'Devize', file: 'F3' + suf + '.doc', html: G.UXDocBuilder.docHtml({ titlu: 'FORMULARUL F3', subtitlu: p.obiect.denumire, proiect: proiect.nume }, [{ h: null, html: htmlF3(p.obiect, p.devizObiect) }]) });
              docs.push({ cat: 'Devize', file: 'F4' + suf + '.doc', html: G.UXDocBuilder.docHtml({ titlu: 'FORMULARUL F4', subtitlu: p.obiect.denumire, proiect: proiect.nume }, [{ h: null, html: htmlF4(p.obiect, p.devizObiect) }]) });
              docs.push({ cat: 'Devize', file: 'F5' + suf + '.doc', html: G.UXDocBuilder.docHtml({ titlu: 'FORMULARUL F5', subtitlu: p.obiect.denumire, proiect: proiect.nume }, [{ h: null, html: htmlF5(p.obiect) }]) });
            });
            return computeDevizGeneral(proiectId, { Sc: 0 }).then(function (dg) {
              if (dg.deviz_general) docs.push({ cat: 'Devize', file: 'Deviz_general_HG907.doc', html: G.UXDocBuilder.docHtml({ titlu: 'DEVIZ GENERAL', subtitlu: 'conform HG 907/2016 · Cap.4.1 din ' + (dg.sursa_c41 === 'articole_reale' ? 'articole reale' : 'estimare'), proiect: proiect.nume }, [{ h: null, html: G.UXDevize.devizGeneralHtml({ deviz: { c41: dg.suma_articole_c41 } }) }]) });
              return docs;
            });
          });
      });
    });
  }
  function exportProiectDocx(proiectId) {
    return generateDocumenteF1F5(proiectId).then(function (docs) {
      if (typeof JSZip === 'undefined') { docs.forEach(function (d) { var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿', d.html], { type: 'application/msword' })); a.download = d.file; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1200); }); return docs.length; }
      var zip = new JSZip();
      docs.forEach(function (d) { zip.file(d.file, new Blob(['﻿', d.html], { type: 'application/msword' })); });
      return zip.generateAsync({ type: 'blob' }).then(function (blob) {
        var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'Devize_' + Date.now() + '.zip'; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
        return docs.length;
      });
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // API PUBLIC
  // ══════════════════════════════════════════════════════════════════════════
  G.UXDevizePro = {
    // proiecte/obiecte/categorii
    listProiecte: listProiecte, getProiect: getProiect, createProiect: createProiect, updateProiect: updateProiect,
    listObiecte: listObiecte, createObiect: createObiect, listCategorii: listCategorii, createCategorie: createCategorie,
    creazaCategoriiStandard: creazaCategoriiStandard, CATEGORII_STD: CATEGORII_STD,
    // resurse/norme
    listResurse: listResurse, createResursa: createResursa, listNorme: listNorme, normaResurse: normaResurse, creazaNorma: creazaNorma,
    // prețuri (4 niveluri)
    NIVELURI: NIVELURI, setPretReferinta: setPretReferinta, setPretActualizat: setPretActualizat, setPretOfertaFurnizor: setPretOfertaFurnizor,
    alegePretFolosit: alegePretFolosit, pretCurent: pretCurent, istoricPreturi: istoricPreturi,
    // indici INSSE
    insIndexLatest: insIndexLatest, insIndexIstoric: insIndexIstoric, insIndexSync: insIndexSync,
    // articole + calcul
    listArticole: listArticole, createArticol: createArticol, updateArticol: updateArticol, deleteArticol: deleteArticol,
    costArticol: costArticol, computeDevizObiect: computeDevizObiect, computeDevizGeneral: computeDevizGeneral,
    importDinProiectareUrbanX: importDinProiectareUrbanX, importCSVResurse: importCSVResurse, importCSVArticole: importCSVArticole,
    // relevee
    listRelevee: listRelevee, addRelevee: addRelevee, uploadReleveeFile: uploadReleveeFile, comparaProiectatVsRelevat: comparaProiectatVsRelevat,
    // furnizori/contracte/situații/decontare/garanții
    listFurnizori: listFurnizori, creazaFurnizor: creazaFurnizor,
    listContracte: listContracte, creazaContract: creazaContract,
    listSituatii: listSituatii, creazaSituatie: creazaSituatie, listSituatieArticole: listSituatieArticole, addSituatieArticol: addSituatieArticol,
    addAtasamentSituatieArticol: addAtasamentSituatieArticol, uploadAtasamentFoto: uploadAtasamentFoto,
    computeSituatiePlata: computeSituatiePlata, deconteazaSituatie: deconteazaSituatie,
    elibereazaGarantie: elibereazaGarantie, garantieStatus: garantieStatus,
    // stări/audit
    STARI_VALIDE: STARI_VALIDE, tranzitioneazaStare: tranzitioneazaStare, istoricStari: istoricStari, staraCurenta: staraCurenta,
    logAudit: logAudit, istoricAudit: istoricAudit,
    // alertare
    verificaAlertaPret: verificaAlertaPret, verificaAlertaBuget: verificaAlertaBuget, listAlerte: listAlerte, marcheazaAlertaVazuta: marcheazaAlertaVazuta,
    // GIS
    cardInvestitie: cardInvestitie,
    // export documente
    htmlDevizObiect: htmlDevizObiect, htmlF1: htmlF1, htmlF2: htmlF2, htmlF3: htmlF3, htmlF4: htmlF4, htmlF5: htmlF5,
    generateDocumenteF1F5: generateDocumenteF1F5, exportProiectDocx: exportProiectDocx,
    // offline queue
    syncOfflineQueue: syncOfflineQueue, offlineQueueSize: function () { return queueGet().length; }
  };

  // sincronizare coadă offline la reconectare + periodic (5 min, ca la _CloudSync)
  G.addEventListener && G.addEventListener('online', function () { syncOfflineQueue(); });
  setTimeout(function () { syncOfflineQueue(); setInterval(syncOfflineQueue, 5 * 60 * 1000); }, 3000);

  console.log('[UXDevizePro] motor Devize & Cost Management (integral) încărcat — window.UXDevizePro');
})(window);
