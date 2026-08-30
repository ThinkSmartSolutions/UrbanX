/* ============================================================================
 * UrbanX — REGISTRUL IMOBILELOR (Modul grup C). Coloana vertebrală: registrul
 * master al imobilelor dintr-un UAT. Fiecare înregistrare = un imobil cu
 * identitate cadastrală + lanțul de documente (prin registrele EXISTENTE, fără
 * dublare) + timeline de status + date proprietar GDPR-compliant.
 *
 * NON-DUPLICARE (regula de aur #8): NU restochează CU/sesizări — acelea rămân
 * în window.CAU.registry / window.Sesizari.registry. Aici stocăm doar
 * IDENTITATEA imobilului + referințe; lanțul complet se cere la runtime din
 * window.Dosar.aggregate(parcel).
 *
 * GDPR (Reg. UE 2016/679): datele proprietarului (nume/CNP/contact) sunt
 * date cu caracter personal → stocate DOAR cu consimțământ explicit,
 * PSEUDONIMIZATE (afișare mascată + hash, fără CNP în clar), cu politică de
 * retenție și drept la ștergere (erase / eraseOwner / purgeExpired).
 * Temei legal: consimțământ (art.6(1)(a)) sau sarcină publică Legea 169/2026 (CATUC)
 * (art.6(1)(e)) când operează primăria. Stocare: localStorage (client-side,
 * onest) — Supabase cu RLS = Faza 2.
 *
 * window.RegistruImobil: list · get · register · update · setStatus · fromParcel
 *   · dossier · erase · eraseOwner · purgeExpired · search · exportRegisterPDF
 * ========================================================================== */
(function (G) {
  'use strict';
  var RKEY = 'urbanx_registru_imobil_v1';
  var DAY = 86400000, RETENTION_YEARS = 10;   // retenție implicită date personale

  // Ciclul de viață al imobilului (aliniat Legea 169/2026 (CATUC) + intabulare)
  var STATUSES = [
    { k: 'teren', l: 'Teren (fără proiect)', c: '#64748b' },
    { k: 'cu_emis', l: 'Certificat de urbanism emis', c: '#3b82f6' },
    { k: 'proiect', l: 'Proiectare (DTAC)', c: '#8b5cf6' },
    { k: 'ac_emis', l: 'Autorizație de construire emisă', c: '#0d9488' },
    { k: 'santier', l: 'În execuție (șantier)', c: '#f59e0b' },
    { k: 'receptie', l: 'Recepție la terminarea lucrărilor', c: '#22c55e' },
    { k: 'intabulat', l: 'Intabulat (CF actualizat)', c: '#16a34a' }
  ];
  function statusMeta(k) { for (var i = 0; i < STATUSES.length; i++) if (STATUSES[i].k === k) return STATUSES[i]; return STATUSES[0]; }

  function all() { try { return JSON.parse(localStorage.getItem(RKEY) || '[]'); } catch (e) { return []; } }
  function saveAll(a) { try { localStorage.setItem(RKEY, JSON.stringify(a)); } catch (e) {} }
  function now() { try { return Date.now(); } catch (e) { return 0; } }
  function cityKey() { try { return (G.TCI && G.TCI.cityKey) || null; } catch (e) { return null; } }
  function cityName() { try { var c = G._RO_CITIES_DB && G.TCI && G._RO_CITIES_DB[G.TCI.cityKey]; if (c) return c.name; } catch (e) {} return ''; }

  // ── GDPR: pseudonimizare date proprietar ──────────────────────────────────
  // Hash simplu (djb2) = marcaj de pseudonimizare, NU stocare reversibilă a CNP.
  function _hash(s) { var h = 5381, i = String(s || '').length; while (i) h = (h * 33) ^ String(s).charCodeAt(--i); return (h >>> 0).toString(36); }
  function _maskName(name) {
    name = String(name || '').trim(); if (!name) return '—';
    return name.split(/\s+/).map(function (w, i) { return i === 0 ? w : (w[0] + '.'); }).join(' ');
  }
  // Construiește blocul owner GDPR-safe. Necesită consent===true dacă sunt date personale.
  function _ownerBlock(owner, consent) {
    if (!owner || !(owner.name || owner.cnp || owner.contact)) return null;
    if (!consent) throw new Error('GDPR: consimțământ necesar pentru stocarea datelor proprietarului.');
    return {
      display: _maskName(owner.name),                    // afișare mascată (ex. "Ion P.")
      hash: _hash((owner.name || '') + '|' + (owner.cnp || '')), // pseudonim, ireversibil pt afișare
      has_cnp: !!owner.cnp,                               // marcaj că exista CNP (NU-l stocam in clar)
      consent: true, consent_at: now(),
      retention_until: now() + RETENTION_YEARS * 365 * DAY,
      legal_basis: owner.legal_basis || 'consimtamant'   // 'consimtamant' | 'sarcina_publica'
    };
  }

  // ── Referințe către registrele existente (NU copii) ───────────────────────
  function _refsFor(nrcad) {
    var refs = { cu: [], sesizari: [] };
    if (!nrcad) return refs;
    try {
      if (G.CAU && G.CAU.registry) G.CAU.registry.list().forEach(function (cu) {
        if (cu.parcel && String(cu.parcel.nrcad) === String(nrcad)) refs.cu.push(cu.id);
      });
    } catch (e) {}
    try {
      if (G.Sesizari && G.Sesizari.registry && G.Sesizari.registry.list) G.Sesizari.registry.list().forEach(function (s) {
        if (String(s.nrcad || (s.parcel && s.parcel.nrcad)) === String(nrcad)) refs.sesizari.push(s.id);
      });
    } catch (e) {}
    return refs;
  }

  // Derivă statusul din lanțul real (CAU) dacă nu e setat manual.
  function _deriveStatus(rec) {
    if (rec.status_manual) return rec.status;
    var st = 'teren';
    try {
      if (G.CAU && G.CAU.registry && rec.nrcad) {
        var cus = G.CAU.registry.list().filter(function (cu) { return cu.parcel && String(cu.parcel.nrcad) === String(rec.nrcad); });
        if (cus.length) {
          st = 'cu_emis';
          cus.forEach(function (cu) {
            if (cu.status === 'acord_unic' || cu.ac_emis) st = 'ac_emis';
            else if (cu.status === 'avize_in_curs') st = 'proiect';
          });
        }
      }
    } catch (e) {}
    return st;
  }

  // ── API registru ──────────────────────────────────────────────────────────
  function list() {
    var a = all();
    // reîmprospătează referințe + status derivat la citire (ieftin)
    a.forEach(function (r) { r.refs = _refsFor(r.nrcad); r.status = _deriveStatus(r); });
    return a;
  }
  function get(id) { return all().filter(function (r) { return r.id === id; })[0] || null; }
  function findByNrcad(nrcad) { return all().filter(function (r) { return String(r.nrcad) === String(nrcad); })[0] || null; }

  // register(imobil, {consent}) — imobil: {nrcad, address, centroid, area_m2, utr, tip, owner, notes}
  function register(imobil, opts) {
    opts = opts || {}; imobil = imobil || {};
    if (!imobil.nrcad && !imobil.address) throw new Error('Imobilul necesită cel puțin nr. cadastral sau adresă.');
    // dacă exista deja pe acelasi nrcad → update in loc de dubla inregistrare
    var existing = imobil.nrcad ? findByNrcad(imobil.nrcad) : null;
    var owner = _ownerBlock(imobil.owner, opts.consent);
    if (existing) return update(existing.id, { address: imobil.address || existing.address, centroid: imobil.centroid || existing.centroid, area_m2: imobil.area_m2 || existing.area_m2, utr: imobil.utr || existing.utr, tip: imobil.tip || existing.tip, notes: imobil.notes != null ? imobil.notes : existing.notes, owner: owner || existing.owner });
    var a = all();
    var rec = {
      id: 'im' + now() + '_' + Math.round((all().length + 1) * 7),
      nrcad: imobil.nrcad || null, address: imobil.address || '',
      cityKey: cityKey(), city: cityName(),
      centroid: imobil.centroid || null, area_m2: imobil.area_m2 || null, utr: imobil.utr || null,
      tip: imobil.tip || 'teren', status: 'teren', status_manual: false,
      owner: owner, notes: imobil.notes || '',
      created_at: now(), updated_at: now()
    };
    rec.refs = _refsFor(rec.nrcad); rec.status = _deriveStatus(rec);
    a.push(rec); saveAll(a); return rec;
  }

  function update(id, patch) {
    var a = all(), rec = a.filter(function (r) { return r.id === id; })[0]; if (!rec) return null;
    Object.keys(patch || {}).forEach(function (k) { rec[k] = patch[k]; });
    rec.updated_at = now(); saveAll(a); return rec;
  }
  function setStatus(id, k) {
    var a = all(), rec = a.filter(function (r) { return r.id === id; })[0]; if (!rec) return null;
    rec.status = k; rec.status_manual = true; rec.updated_at = now(); saveAll(a); return rec;
  }

  // creează imobilul din parcela ACTIVĂ (fără date proprietar — se adaugă separat cu consimțământ)
  function fromParcel(opts) {
    var S = G.S; if (!S || !S.parcels) throw new Error('Nicio parcelă activă. Selectează o parcelă pe hartă.');
    var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel];
    if (!ap) throw new Error('Nicio parcelă activă.');
    var c = null; try { if (ap.geo && G.turf) c = G.turf.centerOfMass(ap.geo).geometry.coordinates; } catch (e) {}
    return register({
      nrcad: ap.nrcad, address: ap.address || '', centroid: c, area_m2: ap.area || null,
      utr: ap.utr || null, tip: (ap.params && ap.params.h > 0) ? 'constructie' : 'teren'
    }, opts || {});
  }

  // lanțul complet la runtime din Dosar (NU stocat aici) → obiect Dosar.aggregate
  function dossier(id) {
    var rec = get(id); if (!rec) return null;
    if (!G.Dosar || !G.Dosar.aggregate) return null;
    var parcel = { nrcad: rec.nrcad, area: rec.area_m2, utr: rec.utr, source: 'registru', params: {}, lat: rec.centroid && rec.centroid[1], lon: rec.centroid && rec.centroid[0] };
    try { return G.Dosar.aggregate(parcel); } catch (e) { return null; }
  }

  function search(q) {
    q = String(q || '').toLowerCase().trim(); if (!q) return list();
    return list().filter(function (r) { return (String(r.nrcad || '').toLowerCase().indexOf(q) >= 0) || (String(r.address || '').toLowerCase().indexOf(q) >= 0); });
  }

  // ── GDPR: ștergere ──────────────────────────────────────────────────────
  function erase(id) { saveAll(all().filter(function (r) { return r.id !== id; })); return true; }          // dreptul la ștergere (imobil întreg)
  function eraseOwner(id) { var a = all(), r = a.filter(function (x) { return x.id === id; })[0]; if (!r) return false; r.owner = null; r.updated_at = now(); saveAll(a); return true; } // anonimizare (păstrează imobilul)
  function purgeExpired() {                                                                                   // retenție: șterge datele personale expirate
    var a = all(), n = 0; a.forEach(function (r) { if (r.owner && r.owner.retention_until && now() > r.owner.retention_until) { r.owner = null; r.updated_at = now(); n++; } }); if (n) saveAll(a); return n;
  }

  // ── PDF: registrul complet (delegă la _initStudyPdf dacă există) ──────────
  function exportRegisterPDF() {
    var recs = list();
    if (!G.jspdf) { if (G.ss) G.ss('Motorul PDF nu e încărcat.'); return; }
    var doc, pdf, W, H, hdr, ftr, sec, body, tblRow;
    if (G._initStudyPdf) {
      doc = G._initStudyPdf('REGISTRUL IMOBILELOR', (cityName() || 'UAT') + ' · document intern', 3, {});
      pdf = doc.pdf; W = doc.W; H = doc.H; hdr = doc.hdr; ftr = doc.ftr; sec = doc.sec; body = doc.body; tblRow = doc.tblRow;
      pdf.addPage(); pdf.setFillColor(248, 249, 252); pdf.rect(0, 0, W, H, 'F');
      if (hdr) hdr('REGISTRUL IMOBILELOR — ' + (cityName() || 'UAT')); if (ftr) ftr();
      var cy = 28;
      cy = sec('REGISTRUL IMOBILELOR (' + recs.length + ' înregistrări)', cy); cy += 2;
      cy = body('Registru intern al imobilelor cu identitate cadastrală și lanțul de documente asociat. Datele cu caracter personal sunt pseudonimizate conform Regulamentului UE 2016/679 (GDPR). Statusul este derivat automat din registrul CAU (certificate/autorizații).', 14, cy); cy += 2;
      cy = tblRow(['Nr. cadastral', 'Adresă / UTR', 'Tip', 'Status', 'CU / Sesiz.'], cy, true, [38, 58, 20, 42, 22]);
      recs.forEach(function (r) {
        cy = tblRow([r.nrcad || '—', (r.address || '—') + (r.utr ? ' · ' + r.utr : ''), r.tip || '—', statusMeta(r.status).l.split(' (')[0], (r.refs.cu.length + ' / ' + r.refs.sesizari.length)], cy, false, [38, 58, 20, 42, 22]);
      });
      cy += 4;
      cy = body('GDPR — temeiuri: consimțământ (art.6(1)(a)) sau sarcină publică Legea 169/2026 (CATUC) (art.6(1)(e)). Retenție implicită date personale: ' + RETENTION_YEARS + ' ani; dreptul la ștergere și anonimizare sunt disponibile în panou. Stocare locală în acest browser; versiunea server (Supabase cu RLS) = Faza 2.', 14, cy);
      pdf.save('Registru_Imobile_' + (cityName() || 'UAT').replace(/\s+/g, '_') + '.pdf');
    } else {
      pdf = new G.jspdf.jsPDF(); pdf.text('REGISTRUL IMOBILELOR (' + recs.length + ')', 14, 20);
      recs.forEach(function (r, i) { pdf.text((i + 1) + '. ' + (r.nrcad || '—') + ' · ' + (r.address || '—') + ' · ' + statusMeta(r.status).l, 14, 30 + i * 7); });
      pdf.save('Registru_Imobile.pdf');
    }
  }

  // purja de retenție la încărcare (GDPR minimizare)
  try { purgeExpired(); } catch (e) {}

  G.RegistruImobil = {
    STATUSES: STATUSES, statusMeta: statusMeta,
    list: list, get: get, findByNrcad: findByNrcad, register: register, update: update, setStatus: setStatus,
    fromParcel: fromParcel, dossier: dossier, search: search,
    erase: erase, eraseOwner: eraseOwner, purgeExpired: purgeExpired, exportRegisterPDF: exportRegisterPDF,
    RETENTION_YEARS: RETENTION_YEARS
  };
  console.log('[RegistruImobil] registrul imobilelor încărcat (window.RegistruImobil)');
})(window);
