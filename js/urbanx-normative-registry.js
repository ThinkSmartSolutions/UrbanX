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
    { cod: 'Ordin MAI 129/2016', titlu: 'Norme avizare/autorizare securitate la incendiu', dom: 'Incendiu', an: '2016', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'HG 571/2016', titlu: 'Categorii construcții supuse avizării/autorizării ISU', dom: 'Incendiu', an: '2016', stare: 'in_vigoare', verificat: '2026-07' },
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
    { cod: 'P118-1/2022', titlu: 'Securitatea la incendiu — construcții', dom: 'Incendiu', an: '2022', stare: 'in_vigoare', verificat: '2026-07', nota: 'A înlocuit P118/1999; verifică erate/actualizări.' },
    { cod: 'P118-2/2013', titlu: 'Instalații de stingere a incendiilor', dom: 'Incendiu', an: '2013 (act. 2019)', stare: 'in_vigoare', verificat: '2026-07' },
    { cod: 'P118-3/2015', titlu: 'Instalații detectare-semnalizare-avertizare', dom: 'Incendiu', an: '2015', stare: 'in_vigoare', verificat: '2026-07' },
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
    var out = { total: NORME.length, in_vigoare: 0, de_verificat: 0, modificat: 0, abrogat: 0, expirate: 0, items: [] };
    NORME.forEach(function (n) {
      var luni = _luniDe(n.verificat);
      var stare = n.stare;
      // mecanism periodic: dacă a trecut > REVIEW_LUNI de la ultima verificare → forțează 'de_verificat'
      if (stare === 'in_vigoare' && luni > REVIEW_LUNI) { stare = 'de_verificat'; out.expirate++; }
      out[stare === 'de_verificat' ? 'de_verificat' : stare === 'modificat' ? 'modificat' : stare === 'abrogat' ? 'abrogat' : 'in_vigoare']++;
      out.items.push({ cod: n.cod, titlu: n.titlu, dom: n.dom, an: n.an, stare: stare, verificat: n.verificat, luni: luni, nota: n.nota || '' });
    });
    // grupare pe domeniu + sortare (de_verificat/modificat/abrogat sus)
    var ord = { abrogat: 0, modificat: 1, de_verificat: 2, in_vigoare: 3 };
    out.items.sort(function (a, b) { return (ord[a.stare] - ord[b.stare]) || a.dom.localeCompare(b.dom); });
    return out;
  }

  function _stColor(s) { return s === 'abrogat' ? '#f87171' : s === 'modificat' ? '#fb923c' : s === 'de_verificat' ? '#fbbf24' : '#34d399'; }
  function _stLabel(s) { return s === 'abrogat' ? 'ABROGAT' : s === 'modificat' ? 'MODIFICAT' : s === 'de_verificat' ? 'DE VERIFICAT' : 'în vigoare'; }

  function openPanel() {
    var r = check();
    var ov = document.createElement('div');
    ov.id = 'normreg-ov';
    ov.style.cssText = 'position:fixed;inset:0;background:#070c18;z-index:4300;overflow:auto;font-family:system-ui,-apple-system,sans-serif;color:#e6edf7;-webkit-overflow-scrolling:touch';
    var rows = r.items.map(function (n) {
      var c = _stColor(n.stare);
      var lnk = SURSE.just + encodeURIComponent((n.cod || '').split('/')[0].replace(/SR EN|STAS|Ord\.|HG|Legea|Dir\.|CR|NP|PT|Normativ/gi, '').trim() || n.cod);
      return '<tr style="border-top:1px solid rgba(148,163,184,.12)">' +
        '<td style="padding:6px 8px;font-weight:700;color:#e6edf7;white-space:nowrap">' + n.cod + '</td>' +
        '<td style="padding:6px 8px;color:#cbd5e1">' + n.titlu + (n.nota ? '<div style="font-size:10px;color:#94a3b8;margin-top:2px">⚠ ' + n.nota + '</div>' : '') + '</td>' +
        '<td style="padding:6px 8px;color:#94a3b8;white-space:nowrap">' + n.dom + '</td>' +
        '<td style="padding:6px 8px;color:#94a3b8;white-space:nowrap">' + n.an + '</td>' +
        '<td style="padding:6px 8px;white-space:nowrap"><span style="background:' + c + '22;color:' + c + ';border:1px solid ' + c + '55;border-radius:20px;padding:2px 9px;font-size:10px;font-weight:700">' + _stLabel(n.stare) + '</span></td>' +
        '<td style="padding:6px 8px;color:#94a3b8;white-space:nowrap;font-size:10px">' + (n.verificat || '—') + '</td>' +
        '<td style="padding:6px 8px;white-space:nowrap"><a href="' + lnk + '" target="_blank" rel="noopener" style="color:#7dd3fc;font-size:11px">verifică ↗</a></td>' +
        '</tr>';
    }).join('');
    var attention = r.de_verificat + r.modificat + r.abrogat;
    ov.innerHTML =
      '<div style="max-width:1100px;margin:0 auto;padding:18px 14px 60px">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;position:sticky;top:0;background:#070c18;padding:8px 0 12px;border-bottom:1px solid rgba(148,163,184,.15)">' +
      '<div><div style="font-size:18px;font-weight:800;color:#7dd3fc">📚 Registru Normative — verificare la zi</div>' +
      '<div style="font-size:11px;color:#94a3b8">Cursivitatea legală a reglementărilor de proiectare · re-verificare recomandată la ' + REVIEW_LUNI + ' luni · sursă: legislatie.just.ro + MDLPA</div></div>' +
      '<button id="normreg-x" style="background:none;border:none;color:#94a3b8;font-size:22px;cursor:pointer">✕</button></div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin:12px 0">' +
      '<span style="background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.35);color:#34d399;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700">' + r.in_vigoare + ' în vigoare</span>' +
      '<span style="background:rgba(251,191,36,.12);border:1px solid rgba(251,191,36,.35);color:#fbbf24;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700">' + r.de_verificat + ' de verificat</span>' +
      (r.modificat ? '<span style="background:rgba(251,146,60,.12);border:1px solid rgba(251,146,60,.35);color:#fb923c;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700">' + r.modificat + ' modificate</span>' : '') +
      (r.abrogat ? '<span style="background:rgba(248,113,113,.12);border:1px solid rgba(248,113,113,.35);color:#f87171;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700">' + r.abrogat + ' abrogate</span>' : '') +
      '<span style="background:rgba(148,163,184,.12);border:1px solid rgba(148,163,184,.3);color:#cbd5e1;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700">' + r.total + ' total</span>' +
      '</div>' +
      (attention ? '<div style="background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.35);color:#fcd34d;border-radius:8px;padding:10px 12px;font-size:12px;margin-bottom:12px;line-height:1.5">⚠ <b>' + attention + ' reglementări</b> necesită re-verificarea stării legale la sursa oficială înainte de a fi folosite ca bază de proiectare. Codurile mari (P100-1, Eurocoduri, IED, EPBD) au revizuiri în curs la nivel național/UE.</div>' : '') +
      '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12px;min-width:720px">' +
      '<tr style="text-align:left;color:#94a3b8;font-size:11px"><th style="padding:6px 8px">Cod</th><th style="padding:6px 8px">Titlu</th><th style="padding:6px 8px">Domeniu</th><th style="padding:6px 8px">An/ver.</th><th style="padding:6px 8px">Stare</th><th style="padding:6px 8px">Verificat</th><th style="padding:6px 8px">Sursă</th></tr>' +
      rows + '</table></div>' +
      '<div style="font-size:10px;color:#64748b;margin-top:14px;line-height:1.5">Notă onestă: detectarea automată a modificărilor legislative necesită o interfață cu legislatie.just.ro (monitorizare continuă) — nedisponibilă client-side. Acest registru asigură <b>transparența + cadența de re-verificare</b>: fiecare normă are dată de verificare și link direct la sursa oficială pentru confirmare manuală. Reglementările neverificate de peste ' + REVIEW_LUNI + ' luni sunt marcate automat „de verificat".</div>' +
      '</div>';
    document.body.appendChild(ov);
    var x = document.getElementById('normreg-x'); if (x) x.onclick = function () { ov.remove(); };
  }

  G._NormativeRegistry = { NORME: NORME, check: check, openPanel: openPanel, SURSE: SURSE, REVIEW_LUNI: REVIEW_LUNI };
  try { var r = check(); console.log('[NormativeRegistry] ' + r.total + ' norme · ' + r.in_vigoare + ' în vigoare · ' + r.de_verificat + ' de verificat'); } catch (e) {}
})(window);
