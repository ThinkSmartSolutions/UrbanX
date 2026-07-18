/* ============================================================================
 * UrbanX — REGISTRU NORMATIVE DE PROIECTARE (js/urbanx-normative-registry.js)
 * Regula Florin: "orice normativ/lege folosit în proiectare trebuie verificat
 * periodic că este la zi (nemodificat/neabrogat) — nu proiectăm după un normativ
 * modificat de lege."
 *
 * Diferit de _DataFreshness (surse de DATE). Aici = CURSIVITATEA LEGALĂ a
 * reglementărilor tehnice folosite în biblioteca de documentații + studii.
 * Fiecare normă: {cod, titlu, domeniu, an, stare, verificat, sursa}.
 * check(): marchează 'de_verificat' orice normă neverificată de > REVIEW_LUNI luni
 * (mecanism de re-verificare periodică). openPanel(): tabel + link sursă oficială.
 *
 * window._NormativeRegistry
 * ========================================================================== */
(function (G) {
  'use strict';
  var REVIEW_LUNI = 6; // interval de re-verificare recomandat
  var PROXY = G._PROXY_URL || 'https://urbanx-proxy.3dtravelsoftart.workers.dev';
  var OVR_KEY = 'urbanx_normreg_ovr_v1'; // suprascrieri utilizator (verificat/stare/an/nota) persistate

  // ── PERSISTENȚĂ SUPRASCRIERI (localStorage) — „preluarea" modificărilor ──
  function _loadOvr() { try { return JSON.parse(localStorage.getItem(OVR_KEY) || '{}') || {}; } catch (e) { return {}; } }
  function _saveOvr(o) { try { localStorage.setItem(OVR_KEY, JSON.stringify(o)); } catch (e) {} }
  function _ymNow() { try { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2); } catch (e) { return ''; } }

  // Aplică suprascrierile utilizatorului peste catalogul de bază (fără a-l muta).
  function _merged() {
    var ovr = _loadOvr();
    return NORME.map(function (n) {
      var o = ovr[n.cod]; if (!o) return n;
      var m = {}; for (var k in n) m[k] = n[k];
      if (o.stare) m.stare = o.stare; if (o.an) m.an = o.an;
      if (o.verificat) m.verificat = o.verificat; if (o.nota != null) m.nota = o.nota;
      m._userVerified = !!o.verificat; return m;
    });
  }

  // „Preia" o modificare / marchează verificat: persistă în localStorage.
  function marcheazaVerificat(cod, patch) {
    var ovr = _loadOvr(); patch = patch || {};
    ovr[cod] = ovr[cod] || {};
    ovr[cod].verificat = patch.verificat || _ymNow();
    if (patch.stare) ovr[cod].stare = patch.stare;
    if (patch.an) ovr[cod].an = patch.an;
    if (patch.nota != null) ovr[cod].nota = patch.nota;
    _saveOvr(ovr); return ovr[cod];
  }
  function resetOvr(cod) { var ovr = _loadOvr(); if (cod) delete ovr[cod]; else ovr = {}; _saveOvr(ovr); }

  // ── VERIFICARE ONLINE la sursa oficială (prin proxy Cloudflare, fără CORS) ──
  // Interoghează legislatie.just.ro (căutare după cod) și extrage indicii de
  // stare (rezultate găsite, date, cuvinte „abrogat/modificat"). Best-effort:
  // nu înlocuiește confirmarea manuală, dar aduce informația la sursă.
  function verificaOnline(cod) {
    var q = (cod || '').replace(/\s*\/.*$/, '').replace(/^(SR EN|STAS|Ord\.|Ordin|HG|Legea|Dir\.|CR|NP|PT|P|C|I|NTE|NTPEE)\s*/i, '').trim() || cod;
    var target = 'https://legislatie.just.ro/Public/RezultateCautare?nume=' + encodeURIComponent(cod);
    var url = PROXY + '/proxy?url=' + encodeURIComponent(target);
    return fetch(url).then(function (r) { return r.ok ? r.text() : ''; }).then(function (html) {
      html = html || '';
      var dates = (html.match(/\b\d{2}\.\d{2}\.(19|20)\d{2}\b/g) || []);
      var abrogat = /abrogat|abrogare/i.test(html);
      var modificat = /modificat|modificare|completat/i.test(html);
      var rezultate = (html.match(/RezultateCautare|DetaliiDocument|rezultate/gi) || []).length;
      var lastDate = dates.sort().slice(-1)[0] || null;
      return {
        ok: html.length > 200, found: rezultate > 0 || dates.length > 0,
        abrogat: abrogat, modificat: modificat, lastDate: lastDate,
        url: target, hint: !html ? 'Nu s-a putut prelua pagina (verifică manual la sursă).' :
          (abrogat ? 'Sursa menționează „abrogat/abrogare" — VERIFICĂ dacă norma e încă în vigoare.' :
            modificat ? ('Sursa menționează modificări' + (lastDate ? ' (ultima dată găsită: ' + lastDate + ')' : '') + ' — confirmă forma consolidată.') :
              'Nu s-au detectat marcaje de abrogare/modificare pe pagina de căutare — confirmă vizual la sursă.')
      };
    }).catch(function () { return { ok: false, found: false, hint: 'Eroare rețea/proxy — verifică manual la sursă.', url: target }; });
  }

  // Surse oficiale de verificare a stării legale:
  var SURSE = {
    just: 'https://legislatie.just.ro/Public/RezultateCautare?nume=',       // legislație consolidată
    mdlpa: 'https://www.mdlpa.ro/pages/reglementaritehnicedomeniulconstructiilor', // reglementări tehnice
    ancpi: 'https://www.ancpi.ro', iscir: 'https://www.iscir.ro', anre: 'https://www.anre.ro'
  };

  // Catalog normative de proiectare folosite în platformă (grupate pe domeniu).
  // stare: 'in_vigoare' | 'modificat' | 'de_verificat' | 'abrogat'
  // verificat: 'YYYY-MM' (data ultimei verificări manuale a stării legale)
  // nota: revizuiri cunoscute / atenționări
  var NORME = [
    // — LEGISLAȚIE PRIMARĂ —
    { cod: 'Legea 50/1991', titlu: 'Autorizarea executării lucrărilor de construcții', dom: 'Autorizare', an: '1991 (r. 2004, mod. ulterioare)', stare: 'in_vigoare', verificat: '2026-07', nota: 'Republicată + modificări frecvente — verifică forma consolidată.' },
    { cod: 'Legea 10/1995', titlu: 'Calitatea în construcții', dom: 'Autorizare', an: '1995 (r. 2016)', stare: 'in_vigoare', verificat: '2026-07', nota: '6+1 cerințe fundamentale.' },
    { cod: 'HG 907/2016', titlu: 'Etape + conținut-cadru documentații tehnico-economice', dom: 'Autorizare', an: '2016', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'HG 766/1997', titlu: 'Regulamente calitate — categorii de importanță', dom: 'Autorizare', an: '1997', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'HG 925/1995', titlu: 'Verificarea și expertizarea tehnică a proiectelor', dom: 'Autorizare', an: '1995', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'Legea 350/2001', titlu: 'Amenajarea teritoriului și urbanismul', dom: 'Urbanism', an: '2001 (mod.)', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'HG 525/1996', titlu: 'Regulament General de Urbanism (RGU)', dom: 'Urbanism', an: '1996 (r.)', stare: 'in_vigoare', verificat: '2026-07', nota: 'Anexa 5 — necesar parcaje.' },
    { cod: 'Legea 372/2005', titlu: 'Performanța energetică a clădirilor (nZEB + EV)', dom: 'Energie', an: '2005 (r. + transpunere EPBD)', stare: 'de_verificat', verificat: '2026-07', nota: 'EPBD reformată (Dir. 2024/1275) — transpunere în curs; verifică cerințele nZEB/EV actualizate.' },
    { cod: 'Legea 114/1996', titlu: 'Legea locuinței (Anexa 1 — suprafețe minime)', dom: 'Rezidențial', an: '1996 (r.)', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'Legea 448/2006', titlu: 'Protecția persoanelor cu handicap (accesibilitate)', dom: 'Accesibilitate', an: '2006 (r.)', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'Legea 307/2006', titlu: 'Apărarea împotriva incendiilor', dom: 'Incendiu', an: '2006 (r.)', stare: 'in_vigoare', verificat: '2026-07' },
    // CORECTIE (18 iul, cercetare directa pe Monitorul Oficial, motorul SSI din platforma): Ordinul MAI
    // 129/2016 e ABROGAT/inlocuit de Ordinul MAI 180/2022 (Anexa 5 = modelul de scenariu de securitate
    // la incendiu folosit efectiv de motorul SSI, js/urbanx-docx-builder.js) — registrul general afisa
    // gresit norma veche ca "in_vigoare".
    { cod: 'Ordin MAI 180/2022', titlu: 'Norme metodologice avizare/autorizare securitate la incendiu și protecție civilă (Anexa 4 — model scenariu, Anexa 5 — checklist capitole)', dom: 'Incendiu', an: '2022', stare: 'in_vigoare', verificat: '2026-07', nota: 'Înlocuiește Ordinul MAI 129/2016 (abrogat) — verificat direct în motorul SSI al platformei.' },
    { cod: 'HG 571/2016', titlu: 'Categorii construcții supuse avizării/autorizării ISU', dom: 'Incendiu', an: '2016 (mod. HG 1.181/2022)', stare: 'in_vigoare', verificat: '2026-07', nota: 'Modificată/completată de HG nr. 1.181 din 29.09.2022 — verificat pe text oficial.' },
    // — STRUCTURI / ACȚIUNI —
    { cod: 'P100-1/2013', titlu: 'Cod proiectare seismică — clădiri', dom: 'Structuri', an: '2013', stare: 'de_verificat', verificat: '2026-07', nota: 'Cod major — verifică apariția unei revizii (P100-1 nouă) + hărți zonare a_g/T_C.' },
    { cod: 'CR 0/2012', titlu: 'Bazele proiectării structurilor', dom: 'Structuri', an: '2012', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'CR 1-1-3/2012', titlu: 'Evaluarea acțiunii zăpezii', dom: 'Structuri', an: '2012', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'CR 1-1-4/2012', titlu: 'Evaluarea acțiunii vântului', dom: 'Structuri', an: '2012', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'CR 2-1-1.1', titlu: 'Pereți structurali de beton armat', dom: 'Structuri', an: '2013', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'CR 6-2013', titlu: 'Structuri de zidărie', dom: 'Structuri', an: '2013', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'SR EN 1990…1999', titlu: 'Eurocoduri (baze, acțiuni, beton, oțel, mixt, geotehnic)', dom: 'Structuri', an: '+ Anexe Naționale', stare: 'in_vigoare', verificat: '2026-07', nota: 'A doua generație EN (rev.) în curs de adoptare — verifică ANexele Naționale.' },
    { cod: 'SR EN 1991-4', titlu: 'Acțiuni în silozuri și rezervoare (Janssen)', dom: 'Structuri', an: '—', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'NP 112/2014', titlu: 'Proiectarea fundațiilor de suprafață', dom: 'Geotehnic', an: '2014', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'NP 074/2022', titlu: 'Documentații și studii geotehnice', dom: 'Geotehnic', an: '2022', stare: 'in_vigoare', verificat: '2026-07', nota: 'Revizuit 2022 (fostul NP 074/2014).' },
    // — SECURITATE LA INCENDIU —
    // CORECTIE (18 iul, verificat direct pe Monitorul Oficial, Partea I, Nr. 204 bis/10.III.2025, PDF
    // integral 702 pag. descarcat si citit — nu doar cautare secundara): P118-1/2022 e VERSIUNEA VECHE,
    // inlocuita de P118-1/2025 (Ordinul ministrului LPAT nr. 267/10.03.2025). Motorul SSI al platformei
    // (data/ssi/normative.json, 40+ tabele extrase) foloseste deja P118-1/2025 — registrul general
    // ramasese neactualizat la versiunea anterioara.
    { cod: 'P118-1/2025', titlu: 'Securitatea la incendiu — construcții (corp principal + Anexa A.10 construcții existente)', dom: 'Incendiu', an: '2025', stare: 'in_vigoare', verificat: '2026-07', nota: 'Înlocuiește P118-1/2022 (Ordinul MLPAT nr. 267/10.03.2025, Monitorul Oficial nr. 204 bis/10.III.2025) — verificat pe text integral (702 pag.), folosit direct de motorul SSI al platformei.' },
    { cod: 'P118-2/2013', titlu: 'Instalații de stingere a incendiilor', dom: 'Incendiu', an: '2013 (mod. Ord. 6026/2018)', stare: 'in_vigoare', verificat: '2026-07', nota: 'Modificat de Ordinul MAI nr. 6026/2018 — verificat pe text (criteriile de hidranți interiori/exteriori, Art. 4.1/6.1).' },
    { cod: 'P118-3/2015', titlu: 'Instalații detectare-semnalizare-avertizare', dom: 'Incendiu', an: '2015 (mod. Ord. 6025/2018)', stare: 'in_vigoare', verificat: '2026-07', nota: 'Modificat de Ordinul MAI nr. 6025/2018 — verificat pe text (Art. 3.3.1, cazuri obligativitate IDSAI).' },
    // — FUNCȚIUNI CIVILE —
    { cod: 'NP 057-2002', titlu: 'Proiectarea clădirilor de locuințe', dom: 'Rezidențial', an: '2002', stare: 'de_verificat', verificat: '2026-07', nota: 'Normativ vechi (2002) — verifică revizuire/înlocuire.' },
    { cod: 'NP 068-2002', titlu: 'Siguranța în exploatare — clădiri aglomerate', dom: 'Siguranță', an: '2002', stare: 'de_verificat', verificat: '2026-07', nota: 'Vechi (2002) — verifică statut.' },
    { cod: 'NP 051/2012', titlu: 'Adaptarea clădirilor la nevoile PMR', dom: 'Accesibilitate', an: '2012', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'NP 011', titlu: 'Proiectarea clădirilor industriale', dom: 'Industrial', an: '—', stare: 'de_verificat', verificat: '2026-07', nota: 'Verifică versiunea în vigoare.' },
    { cod: 'NP 010 / NP 065-2002', titlu: 'Clădiri învățământ / săli de sport', dom: 'Funcțiuni', an: '1997/2002', stare: 'de_verificat', verificat: '2026-07', nota: 'Normative vechi — verifică statut/înlocuire.' },
    { cod: 'NP 24-97 / NP 25-97', titlu: 'Parcaje etajate / construcții subterane', dom: 'Parcaje', an: '1997', stare: 'de_verificat', verificat: '2026-07', nota: 'Vechi (1997) — verifică revizuire.' },
    { cod: 'Ord. MS 914/2006', titlu: 'Norme unități sanitare (spital/clinică)', dom: 'Medical', an: '2006', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'Ord. ANT 65/2013', titlu: 'Clasificarea structurilor de primire turistică', dom: 'Turism', an: '2013', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'HG 1252/2012', titlu: 'Norme creșe / educație antepreșcolară', dom: 'Învățământ', an: '2012', stare: 'in_vigoare', verificat: '2026-07' },
    // — INSTALAȚII + FIZICA CONSTRUCȚIEI —
    { cod: 'C107/2005', titlu: 'Calcul termotehnic elemente de construcție', dom: 'Termotehnică', an: '2005', stare: 'de_verificat', verificat: '2026-07', nota: 'Verifică actualizări la coeficienți R normați (nZEB).' },
    { cod: 'C125/2013', titlu: 'Acustica în construcții', dom: 'Acustică', an: '2013', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'I5/2022', titlu: 'Instalații de ventilare și climatizare', dom: 'Instalații', an: '2022', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'I7/2011', titlu: 'Instalații electrice ≤ 1000 V', dom: 'Instalații', an: '2011', stare: 'de_verificat', verificat: '2026-07', nota: 'Verifică revizuire I7.' },
    { cod: 'I9/2015', titlu: 'Instalații sanitare', dom: 'Instalații', an: '2015 (var. 2022)', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'I13/2015', titlu: 'Instalații de încălzire', dom: 'Instalații', an: '2015', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'NP 061-2002', titlu: 'Iluminat artificial în clădiri', dom: 'Instalații', an: '2002 (var. 2012)', stare: 'de_verificat', verificat: '2026-07', nota: 'Verifică versiunea în vigoare.' },
    { cod: 'NTPEE-2018', titlu: 'Norme tehnice gaze naturale', dom: 'Gaze', an: '2018', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'PT C8-2010 / I 31/1999', titlu: 'Instalații GPL (ISCIR) / alimentare GPL', dom: 'Energie', an: '2010/1999', stare: 'de_verificat', verificat: '2026-07', nota: 'Verifică ediția ISCIR în vigoare.' },
    // — IGIENĂ / MEDIU / SANITAR-VET —
    { cod: 'OMS 119/2014', titlu: 'Norme de igienă și sănătate publică (distanțe)', dom: 'Sănătate', an: '2014 (mod. 994/2018 ș.u.)', stare: 'in_vigoare', verificat: '2026-07', nota: 'Modificat prin ordine ulterioare — verifică distanțele actualizate.' },
    { cod: 'Dir. 91/676/CEE', titlu: 'Nitrați + Cod bune practici agricole', dom: 'Mediu', an: '1991 + PAZVN', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'Dir. 2010/75/UE (IED)', titlu: 'Emisii industriale (IPPC) — praguri + BAT', dom: 'Mediu', an: '2010 (Legea 278/2013)', stare: 'de_verificat', verificat: '2026-07', nota: 'IED revizuită la nivel UE (2024) — verifică pragurile/BAT actualizate.' },
    { cod: 'Dir. 98/58/CE', titlu: 'Bunăstarea animalelor de fermă', dom: 'Agrozootehnic', an: '1998 + specifice', stare: 'in_vigoare', verificat: '2026-07' },
    // — STANDARDE SR EN specifice —
    { cod: 'SR EN 858', titlu: 'Separatoare de hidrocarburi', dom: 'Instalații', an: '—', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'SR EN 12845', titlu: 'Instalații sprinklere', dom: 'Incendiu', an: '—', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'SR EN 54 (serie)', titlu: 'Detectare + alarmare vocală incendiu', dom: 'Incendiu', an: '—', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'SR EN 62305', titlu: 'Protecția împotriva trăsnetului', dom: 'Instalații', an: '—', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'SR EN ISO 12944', titlu: 'Protecție anticorozivă (sisteme vopsire)', dom: 'Structuri', an: '—', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'SR EN 12193', titlu: 'Iluminat instalații sportive', dom: 'Sport', an: '—', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'SR EN 12464-1', titlu: 'Iluminat locuri de muncă interioare', dom: 'Instalații', an: '2021', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'STAS 6131 / 10144 / 6054', titlu: 'Înălțimi/gabarite / străzi / adâncime îngheț', dom: 'Diverse', an: '—', stare: 'in_vigoare', verificat: '2026-07' }
  ];

  function _luniDe(ym) {
    // ym 'YYYY-MM' → nr. luni scurse până acum (browser: new Date disponibil)
    try {
      var p = (ym || '').split('-'); if (p.length < 2) return 999;
      var d = new Date(); var ny = d.getFullYear(), nm = d.getMonth() + 1;
      return (ny - (+p[0])) * 12 + (nm - (+p[1]));
    } catch (e) { return 999; }
  }

  function check() {
    var LIST = _merged();
    var out = { total: LIST.length, in_vigoare: 0, de_verificat: 0, modificat: 0, abrogat: 0, expirate: 0, items: [] };
    LIST.forEach(function (n) {
      var luni = _luniDe(n.verificat);
      var stare = n.stare;
      // mecanism periodic: dacă a trecut > REVIEW_LUNI de la ultima verificare → forțează 'de_verificat'
      if (stare === 'in_vigoare' && luni > REVIEW_LUNI) { stare = 'de_verificat'; out.expirate++; }
      out[stare === 'de_verificat' ? 'de_verificat' : stare === 'modificat' ? 'modificat' : stare === 'abrogat' ? 'abrogat' : 'in_vigoare']++;
      out.items.push({ cod: n.cod, titlu: n.titlu, dom: n.dom, an: n.an, stare: stare, verificat: n.verificat, luni: luni, nota: n.nota || '', userVerified: !!n._userVerified });
    });
    // grupare pe domeniu + sortare (de_verificat/modificat/abrogat sus)
    var ord = { abrogat: 0, modificat: 1, de_verificat: 2, in_vigoare: 3 };
    out.items.sort(function (a, b) { return (ord[a.stare] - ord[b.stare]) || a.dom.localeCompare(b.dom); });
    return out;
  }

  function _stColor(s) { return s === 'abrogat' ? '#f87171' : s === 'modificat' ? '#fb923c' : s === 'de_verificat' ? '#fbbf24' : '#34d399'; }
  function _stLabel(s) { return s === 'abrogat' ? 'ABROGAT' : s === 'modificat' ? 'MODIFICAT' : s === 'de_verificat' ? 'DE VERIFICAT' : 'în vigoare'; }

  function _esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

  function openPanel() {
    var ov = document.createElement('div');
    ov.id = 'normreg-ov';
    ov.style.cssText = 'position:fixed;inset:0;background:#070c18;z-index:4300;overflow:auto;font-family:system-ui,-apple-system,sans-serif;color:#e6edf7;-webkit-overflow-scrolling:touch';
    document.body.appendChild(ov);

    function render() {
      var r = check();
      var rows = r.items.map(function (n) {
        var c = _stColor(n.stare);
        var lnk = SURSE.just + encodeURIComponent((n.cod || '').split('/')[0] + '');
        return '<tr data-cod="' + _esc(n.cod) + '" style="border-top:1px solid rgba(148,163,184,.12)">' +
          '<td style="padding:6px 8px;font-weight:700;color:#e6edf7;white-space:nowrap">' + _esc(n.cod) + (n.userVerified ? ' <span title="preluat/verificat de utilizator" style="color:#34d399">✓</span>' : '') + '</td>' +
          '<td style="padding:6px 8px;color:#cbd5e1">' + _esc(n.titlu) + (n.nota ? '<div style="font-size:10px;color:#94a3b8;margin-top:2px">⚠ ' + _esc(n.nota) + '</div>' : '') + '</td>' +
          '<td style="padding:6px 8px;color:#94a3b8;white-space:nowrap">' + _esc(n.dom) + '</td>' +
          '<td style="padding:6px 8px;color:#94a3b8;white-space:nowrap">' + _esc(n.an) + '</td>' +
          '<td style="padding:6px 8px;white-space:nowrap"><span style="background:' + c + '22;color:' + c + ';border:1px solid ' + c + '55;border-radius:20px;padding:2px 9px;font-size:10px;font-weight:700">' + _stLabel(n.stare) + '</span></td>' +
          '<td style="padding:6px 8px;color:#94a3b8;white-space:nowrap;font-size:10px">' + (n.verificat || '—') + '</td>' +
          '<td style="padding:6px 8px;white-space:nowrap">' +
          '<button data-act="verif" data-cod="' + _esc(n.cod) + '" style="background:rgba(56,189,248,.15);color:#7dd3fc;border:1px solid rgba(56,189,248,.4);border-radius:6px;padding:3px 8px;font-size:10px;font-weight:700;cursor:pointer;margin-right:4px">🔎 verifică</button>' +
          '<button data-act="preia" data-cod="' + _esc(n.cod) + '" style="background:rgba(52,211,153,.14);color:#34d399;border:1px solid rgba(52,211,153,.4);border-radius:6px;padding:3px 8px;font-size:10px;font-weight:700;cursor:pointer;margin-right:4px">✓ preia</button>' +
          '<a href="' + lnk + '" target="_blank" rel="noopener" style="color:#64748b;font-size:10px">just.ro ↗</a>' +
          '<div class="normreg-res" data-cod="' + _esc(n.cod) + '" style="font-size:10px;color:#94a3b8;margin-top:3px"></div>' +
          '</td></tr>';
      }).join('');
      var attention = r.de_verificat + r.modificat + r.abrogat;
      ov.innerHTML =
        '<div style="max-width:1180px;margin:0 auto;padding:18px 14px 60px">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;position:sticky;top:0;background:#070c18;padding:8px 0 12px;border-bottom:1px solid rgba(148,163,184,.15)">' +
        '<div><div style="font-size:18px;font-weight:800;color:#7dd3fc">📚 Registru Normative — verificare la zi</div>' +
        '<div style="font-size:11px;color:#94a3b8">Cursivitatea legală a reglementărilor de proiectare · re-verificare la ' + REVIEW_LUNI + ' luni · sursă: legislatie.just.ro + MDLPA</div></div>' +
        '<button id="normreg-x" style="background:none;border:none;color:#94a3b8;font-size:22px;cursor:pointer">✕</button></div>' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap;margin:12px 0;align-items:center">' +
        '<span style="background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.35);color:#34d399;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700">' + r.in_vigoare + ' în vigoare</span>' +
        '<span style="background:rgba(251,191,36,.12);border:1px solid rgba(251,191,36,.35);color:#fbbf24;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700">' + r.de_verificat + ' de verificat</span>' +
        (r.modificat ? '<span style="background:rgba(251,146,60,.12);border:1px solid rgba(251,146,60,.35);color:#fb923c;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700">' + r.modificat + ' modificate</span>' : '') +
        (r.abrogat ? '<span style="background:rgba(248,113,113,.12);border:1px solid rgba(248,113,113,.35);color:#f87171;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700">' + r.abrogat + ' abrogate</span>' : '') +
        '<span style="background:rgba(148,163,184,.12);border:1px solid rgba(148,163,184,.3);color:#cbd5e1;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700">' + r.total + ' total</span>' +
        '<button id="normreg-all" style="background:rgba(56,189,248,.18);color:#7dd3fc;border:1px solid rgba(56,189,248,.45);border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700;cursor:pointer">🔄 Verifică toate online (just.ro)</button>' +
        '<button id="normreg-reset" style="background:rgba(148,163,184,.1);color:#94a3b8;border:1px solid rgba(148,163,184,.3);border-radius:8px;padding:6px 12px;font-size:12px;cursor:pointer">↺ Resetează preluările</button>' +
        '</div>' +
        (attention ? '<div style="background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.35);color:#fcd34d;border-radius:8px;padding:10px 12px;font-size:12px;margin-bottom:12px;line-height:1.5">⚠ <b>' + attention + ' reglementări</b> necesită re-verificarea stării legale la sursa oficială. Apasă <b>🔎 verifică</b> (interoghează just.ro prin proxy) apoi <b>✓ preia</b> pentru a confirma/actualiza starea (persistat local).</div>' : '') +
        '<div id="normreg-msg" style="font-size:11px;color:#7dd3fc;margin-bottom:8px"></div>' +
        '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12px;min-width:760px">' +
        '<tr style="text-align:left;color:#94a3b8;font-size:11px"><th style="padding:6px 8px">Cod</th><th style="padding:6px 8px">Titlu</th><th style="padding:6px 8px">Domeniu</th><th style="padding:6px 8px">An/ver.</th><th style="padding:6px 8px">Stare</th><th style="padding:6px 8px">Verificat</th><th style="padding:6px 8px">Verificare / preluare</th></tr>' +
        rows + '</table></div>' +
        '<div style="font-size:10px;color:#64748b;margin-top:14px;line-height:1.5"><b>Cum funcționează:</b> „🔎 verifică" interoghează legislatie.just.ro prin proxy și semnalează dacă pagina menționează abrogare/modificare + ultima dată găsită. „✓ preia" deschide confirmarea: marchezi norma verificată azi și, dacă e cazul, actualizezi starea (modificat/abrogat) + anul + o notă — salvate local (persistă între sesiuni, marcate ✓). Detecția automată e best-effort (structura just.ro variază) — confirmarea finală o dă proiectantul la sursa oficială.</div>' +
        '</div>';
      var x = document.getElementById('normreg-x'); if (x) x.onclick = function () { ov.remove(); };
      var msg = document.getElementById('normreg-msg');
      // per-rând
      ov.querySelectorAll('button[data-act]').forEach(function (b) {
        b.onclick = function () {
          var cod = b.getAttribute('data-cod'); var act = b.getAttribute('data-act');
          var resEl = ov.querySelector('.normreg-res[data-cod="' + (window.CSS && CSS.escape ? CSS.escape(cod) : cod) + '"]');
          if (act === 'verif') {
            if (resEl) resEl.textContent = '⏳ verific la just.ro…';
            verificaOnline(cod).then(function (o) {
              if (resEl) resEl.innerHTML = (o.abrogat ? '🔴 ' : o.modificat ? '🟠 ' : o.found ? '🟢 ' : '⚪ ') + _esc(o.hint) + ' <a href="' + o.url + '" target="_blank" rel="noopener" style="color:#7dd3fc">deschide ↗</a>';
            });
          } else if (act === 'preia') {
            _preiaModal(cod, render, msg);
          }
        };
      });
      var allBtn = document.getElementById('normreg-all');
      if (allBtn) allBtn.onclick = function () {
        allBtn.disabled = true; allBtn.textContent = '⏳ verific toate…';
        var items = r.items.slice(); var i = 0, flagged = 0;
        (function next() {
          if (i >= items.length) { allBtn.disabled = false; allBtn.textContent = '🔄 Verifică toate online (just.ro)'; if (msg) msg.textContent = '✓ Verificare completă: ' + flagged + ' reglementări cu semnale de abrogare/modificare la sursă. Confirmă și „✓ preia" acolo unde e cazul.'; return; }
          var n = items[i++]; var resEl = ov.querySelector('.normreg-res[data-cod="' + (window.CSS && CSS.escape ? CSS.escape(n.cod) : n.cod) + '"]');
          if (resEl) resEl.textContent = '⏳…';
          if (msg) msg.textContent = 'Verific ' + (i) + '/' + items.length + ': ' + n.cod + '…';
          verificaOnline(n.cod).then(function (o) {
            if (o.abrogat || o.modificat) flagged++;
            if (resEl) resEl.innerHTML = (o.abrogat ? '🔴 ' : o.modificat ? '🟠 ' : o.found ? '🟢 ' : '⚪ ') + _esc(o.hint);
            setTimeout(next, 250); // throttling politicos față de proxy/sursă
          });
        })();
      };
      var resetBtn = document.getElementById('normreg-reset');
      if (resetBtn) resetBtn.onclick = function () { if (confirm('Ștergi toate preluările/verificările salvate local și revii la catalogul de bază?')) { resetOvr(); render(); } };
    }

    // Modal de preluare/confirmare a modificării (persistat)
    function _preiaModal(cod, onDone, msg) {
      var cur = null; check().items.forEach(function (it) { if (it.cod === cod) cur = it; });
      var m = document.createElement('div');
      m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:4400;display:flex;align-items:center;justify-content:center;padding:16px';
      m.innerHTML = '<div style="background:#0f172a;border:1px solid rgba(56,189,248,.35);border-radius:12px;max-width:460px;width:100%;padding:18px;color:#e6edf7;font-family:system-ui,sans-serif">' +
        '<div style="font-size:15px;font-weight:800;color:#7dd3fc;margin-bottom:4px">Preia / confirmă: ' + _esc(cod) + '</div>' +
        '<div style="font-size:11px;color:#94a3b8;margin-bottom:12px">Marchează norma verificată azi și, dacă la sursă găsești o modificare, actualizează starea/anul. Se salvează local.</div>' +
        '<label style="font-size:11px;color:#cbd5e1;display:block;margin-bottom:3px">Stare confirmată</label>' +
        '<select id="nr-stare" style="width:100%;background:#0a1120;border:1px solid rgba(148,163,184,.3);border-radius:7px;color:#e6edf7;padding:7px;margin-bottom:10px;font-size:13px">' +
        '<option value="in_vigoare">în vigoare</option><option value="modificat">modificat</option><option value="de_verificat">de verificat</option><option value="abrogat">abrogat</option></select>' +
        '<label style="font-size:11px;color:#cbd5e1;display:block;margin-bottom:3px">An / versiune (opțional — actualizează dacă s-a schimbat)</label>' +
        '<input id="nr-an" placeholder="' + _esc(cur ? cur.an : '') + '" style="width:100%;background:#0a1120;border:1px solid rgba(148,163,184,.3);border-radius:7px;color:#e6edf7;padding:7px;margin-bottom:10px;font-size:13px;box-sizing:border-box"/>' +
        '<label style="font-size:11px;color:#cbd5e1;display:block;margin-bottom:3px">Notă (opțional)</label>' +
        '<input id="nr-nota" placeholder="ex: verificat forma consolidată just.ro la data …" style="width:100%;background:#0a1120;border:1px solid rgba(148,163,184,.3);border-radius:7px;color:#e6edf7;padding:7px;margin-bottom:14px;font-size:13px;box-sizing:border-box"/>' +
        '<div style="display:flex;gap:8px;justify-content:flex-end">' +
        '<button id="nr-cancel" style="background:rgba(148,163,184,.12);color:#cbd5e1;border:1px solid rgba(148,163,184,.3);border-radius:8px;padding:8px 14px;font-size:12px;cursor:pointer">Anulează</button>' +
        '<button id="nr-save" style="background:#34d399;color:#04231a;border:none;border-radius:8px;padding:8px 16px;font-size:12px;font-weight:700;cursor:pointer">✓ Preia (salvează)</button>' +
        '</div></div>';
      document.body.appendChild(m);
      if (cur) { var sel = m.querySelector('#nr-stare'); if (sel) sel.value = (cur.stare === 'de_verificat' ? 'in_vigoare' : cur.stare); }
      m.querySelector('#nr-cancel').onclick = function () { m.remove(); };
      m.querySelector('#nr-save').onclick = function () {
        var patch = { stare: m.querySelector('#nr-stare').value };
        var an = m.querySelector('#nr-an').value.trim(); if (an) patch.an = an;
        var nota = m.querySelector('#nr-nota').value.trim(); if (nota) patch.nota = nota;
        marcheazaVerificat(cod, patch); m.remove();
        if (msg) msg.textContent = '✓ ' + cod + ' preluat/verificat azi (' + _ymNow() + ') — salvat local.';
        if (typeof onDone === 'function') onDone();
      };
    }

    render();
  }

  G._NormativeRegistry = { NORME: NORME, check: check, openPanel: openPanel, SURSE: SURSE, REVIEW_LUNI: REVIEW_LUNI, verificaOnline: verificaOnline, marcheazaVerificat: marcheazaVerificat, resetOvr: resetOvr };
  try { var r = check(); console.log('[NormativeRegistry] ' + r.total + ' norme · ' + r.in_vigoare + ' în vigoare · ' + r.de_verificat + ' de verificat'); } catch (e) {}
})(window);
