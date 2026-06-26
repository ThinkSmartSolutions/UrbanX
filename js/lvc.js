/* ============================================================================
 * UrbanX Land Value Capture (Modul 09) — engine + UI + PDF, client-side.
 * Cât valoare adaugă infrastructura publică / rezonarea terenului privat și ce
 * contribuție e corect de negociat cu dezvoltatorul. Model: ZAC (Franța),
 * reparcelación (Spania), CIL (UK), TIF (SUA).
 *
 * window.LVC.compute(input) · openPanel() · generatePDF()
 * ONEST: România NU are mecanism LVC în lege (2025). Contribuția = VOLUNTARĂ,
 * negociată în acordul PUZ (Legea 350/2001 Art. 56). Valori manuale (ANCPI = Faza 2).
 * ========================================================================== */
(function (G) {
  'use strict';
  // tabel uplift orientativ (plusvaloare tipică din literatură) — declanșator → % + rază
  var TRIGGERS = {
    drum_nou_major: { label: 'Drum nou major', lo: 25, hi: 40, raza_m: 300 },
    extindere_metrou: { label: 'Extindere metrou/tren urban', lo: 30, hi: 50, raza_m: 800 },
    parc_urban: { label: 'Parc urban nou', lo: 10, hi: 20, raza_m: 200 },
    extindere_utilitati: { label: 'Extindere utilități (apă/canal/gaz)', lo: 15, hi: 25, raza_m: 500 },
    rezoning_rezidential: { label: 'Rezonare (agricol → rezidențial)', lo: 30, hi: 60, raza_m: 0 }
  };
  function compute(inp) {
    var baseline = +inp.baseline_eur_m2 || 0;       // valoare teren înainte (EUR/mp teren)
    var after = +inp.value_after_eur_m2 || 0;        // valoare teren după (EUR/mp teren)
    var landArea = +inp.land_area_m2 || 0;
    var builtArea = +inp.built_area_m2 || 0;
    var recovery = inp.recovery_rate == null ? 0.20 : +inp.recovery_rate; // 10-30%
    var upliftPerM2 = Math.max(0, after - baseline);
    var totalUplift = upliftPerM2 * landArea;
    var totalContribution = totalUplift * recovery;
    var contribPerBuilt = builtArea > 0 ? totalContribution / builtArea : 0;
    var upliftPct = baseline > 0 ? (upliftPerM2 / baseline) * 100 : 0;
    return {
      baseline_eur_m2: baseline, value_after_eur_m2: after, uplift_eur_m2: Math.round(upliftPerM2),
      uplift_pct: Math.round(upliftPct), total_uplift_eur: Math.round(totalUplift),
      recovery_rate_pct: Math.round(recovery * 100), total_contribution_eur: Math.round(totalContribution),
      contribution_per_built_m2: Math.round(contribPerBuilt), land_area_m2: landArea, built_area_m2: builtArea,
      confidence: inp.confidence || 'medie', inputs: inp
    };
  }

  function el(t, a, h) { var e = document.createElement(t); if (a) Object.keys(a).forEach(function (k) { e.setAttribute(k, a[k]); }); if (h != null) e.innerHTML = h; return e; }
  var ST = {
    overlay: 'position:fixed;inset:0;background:rgba(2,6,16,.72);z-index:9000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)',
    modal: 'background:#0b1424;color:#e6edf7;width:min(640px,95vw);max-height:92vh;overflow:auto;border:1px solid rgba(124,58,237,.4);border-radius:14px;font-family:system-ui,sans-serif',
    head: 'padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between',
    body: 'padding:18px 20px', inp: 'background:#0a1120;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:8px;padding:8px 10px;font-size:13px;width:100%;box-sizing:border-box',
    btn: 'background:linear-gradient(180deg,#7c3aed,#6d28d9);color:#fff;border:0;border-radius:9px;padding:11px 16px;font-weight:700;cursor:pointer;font-size:14px',
    ghost: 'background:rgba(255,255,255,.06);color:#cbd5e1;border:1px solid rgba(255,255,255,.12);border-radius:8px;padding:7px 12px;cursor:pointer;font-size:12px',
    label: 'font-size:11px;color:#c4b5fd;text-transform:uppercase;letter-spacing:.06em;margin:12px 0 6px;font-weight:700'
  };
  function prefill() { try { var S = G.S; if (S && S.parcels && S.parcels[S.activeParcel == null ? 0 : S.activeParcel]) { var ap = S.parcels[S.activeParcel == null ? 0 : S.activeParcel]; var reg = (G.REGULI && G.REGULI[ap.utr]) || {}; return { area: ap.area || 0, cut: (ap.params && ap.params.cut) || reg.cut || 1.0, nrcad: ap.nrcad }; } } catch (e) {} return null; }
  function cityName() { try { var c = G._RO_CITIES_DB && G.TCI && G._RO_CITIES_DB[G.TCI.cityKey]; if (c) return c.name; } catch (e) {} return ''; }

  function openPanel() {
    var pre = prefill();
    var ov = el('div', { style: ST.overlay }); ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    var m = el('div', { style: ST.modal });
    var head = el('div', { style: ST.head }); head.appendChild(el('div', null, '<div style="font-weight:800;font-size:16px">📈 Land Value Capture</div><div style="font-size:11px;color:#94a3b8">Plusvaloarea din infrastructură publică · contribuție de negociat</div>'));
    var x = el('button', { style: ST.ghost }, '✕'); x.onclick = function () { ov.remove(); }; head.appendChild(x); m.appendChild(head);
    var body = el('div', { style: ST.body }); m.appendChild(body);
    if (pre) body.appendChild(el('div', { style: 'font-size:11px;color:#34d399;margin-bottom:4px' }, '✓ Parcelă: ' + Math.round(pre.area).toLocaleString('ro-RO') + ' mp · ADC estimat ' + Math.round(pre.area * pre.cut).toLocaleString('ro-RO') + ' mp'));

    body.appendChild(el('div', { style: ST.label }, 'Declanșator (auto-completează „după" din tabelul uplift)'));
    var trig = el('select', { style: ST.inp });
    trig.appendChild(el('option', { value: '' }, '— manual (introduc eu valoarea după) —'));
    Object.keys(TRIGGERS).forEach(function (k) { var t = TRIGGERS[k]; trig.appendChild(el('option', { value: k }, t.label + ' (+' + t.lo + '–' + t.hi + '%' + (t.raza_m ? ', rază ' + t.raza_m + 'm' : '') + ')')); });
    body.appendChild(trig);
    var trigNote = el('div', { style: 'font-size:10px;color:#94a3b8;margin-top:4px' }); body.appendChild(trigNote);

    body.appendChild(el('div', { style: ST.label }, 'Valoare teren (EUR/mp)'));
    var g = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr;gap:8px' });
    var base = el('input', { style: ST.inp, type: 'number', placeholder: 'înainte (baseline)' });
    var after = el('input', { style: ST.inp, type: 'number', placeholder: 'după infrastructură/rezonare' });
    g.appendChild(wrap('Înainte EUR/mp', base)); g.appendChild(wrap('După EUR/mp', after)); body.appendChild(g);
    function applyTrigger() { var t = TRIGGERS[trig.value]; if (!t) { trigNote.textContent = ''; return; } var b = +base.value; var mid = (t.lo + t.hi) / 2; if (b > 0) { after.value = Math.round(b * (1 + mid / 100)); } trigNote.innerHTML = 'Uplift median <b style="color:#c4b5fd">+' + mid + '%</b> (interval +' + t.lo + '–' + t.hi + '%)' + (t.raza_m ? ' · aplicabil în raza de ' + t.raza_m + 'm' : '') + '. Ajustează „după" dacă ai o evaluare locală.'; }
    trig.onchange = applyTrigger; base.addEventListener('input', function () { if (trig.value) applyTrigger(); });
    body.appendChild(el('div', { style: ST.label }, 'Suprafețe & rată recuperare'));
    var g2 = el('div', { style: 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px' });
    var land = el('input', { style: ST.inp, type: 'number' }); land.value = pre ? Math.round(pre.area) : '';
    var built = el('input', { style: ST.inp, type: 'number' }); built.value = pre ? Math.round(pre.area * pre.cut) : '';
    var rec = el('input', { style: ST.inp, type: 'number', value: '20' });
    g2.appendChild(wrap('Teren mp', land)); g2.appendChild(wrap('ADC mp', built)); g2.appendChild(wrap('Recuperare %', rec)); body.appendChild(g2);
    function wrap(l, i) { var w = el('div'); w.appendChild(el('div', { style: 'font-size:11px;color:#cbd5e1;margin-bottom:3px' }, l)); w.appendChild(i); return w; }

    var run = el('button', { style: ST.btn + ';margin-top:12px' }, '▶ Calculează contribuția'); body.appendChild(run);
    var out = el('div', { style: 'margin-top:14px' }); body.appendChild(out);
    var pdfBtn = el('button', { style: ST.btn + ';display:none;margin-top:10px;background:linear-gradient(180deg,#2563eb,#1d4ed8)' }, '⬇ Notă negociere (PDF)'); body.appendChild(pdfBtn);
    var last = null;
    run.onclick = function () {
      var r = compute({ baseline_eur_m2: +base.value, value_after_eur_m2: +after.value, land_area_m2: +land.value, built_area_m2: +built.value, recovery_rate: (+rec.value || 20) / 100 });
      last = r;
      var N = function (x) { return Math.round(x).toLocaleString('ro-RO'); };
      function card(b, s, c) { return '<div style="flex:1;background:#0a1120;border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:11px;text-align:center"><div style="font-size:18px;font-weight:800;color:' + (c || '#c4b5fd') + '">' + b + '</div><div style="font-size:10px;color:#94a3b8">' + s + '</div></div>'; }
      out.innerHTML = '<div style="display:flex;gap:8px;margin-bottom:8px">' +
        card('+' + r.uplift_pct + '%', 'plusvaloare teren', '#34d399') + card(N(r.total_uplift_eur) + ' €', 'plusvaloare totală') + '</div>' +
        '<div style="display:flex;gap:8px">' + card(N(r.total_contribution_eur) + ' €', 'contribuție (' + r.recovery_rate_pct + '%)', '#fbbf24') + card(N(r.contribution_per_built_m2) + ' €/mp', 'per mp ADC', '#fbbf24') + '</div>' +
        '<div style="font-size:11px;color:#94a3b8;margin-top:8px">Comparabile: UK CIL ~100-400 €/mp · Franța ZAC variabil. </div>' +
        '<div style="font-size:10px;color:#64748b;margin-top:6px">⚠ România NU are mecanism LVC în lege. Contribuția e VOLUNTARĂ, negociată în acordul PUZ (L.350/2001 Art.56). Orientativ.</div>';
      pdfBtn.style.display = '';
    };
    pdfBtn.onclick = function () { if (last) generatePDF(last, { site_name: pre && pre.nrcad ? 'CF ' + pre.nrcad : 'Sit', city: cityName() }); };
    ov.appendChild(m); document.body.appendChild(ov);
  }

  function generatePDF(r, meta) {
    meta = meta || {};
    var Jc = (typeof jsPDF !== 'undefined') ? jsPDF : (window.jspdf && window.jspdf.jsPDF) || window.jsPDF; if (!Jc) return;
    var N = function (x) { try { return Math.round(x).toLocaleString('ro-RO'); } catch (e) { return String(x); } };
    if (typeof window._makeStratDoc !== 'function') return _genSimpleLVC(r, meta, Jc, N);
    try {
      var pdf = new Jc({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      var D = window._makeStratDoc(pdf, { docTitle: 'STUDIU LAND VALUE CAPTURE', cityName: (meta.site_name || 'Sit'), accent: [124, 58, 237] });
      var W = 210, ML = D.dims.ML, CW = D.dims.CW, F = 'DejaVuRO';
      D.setSuppress && D.setSuppress(true); D.setPage && D.setPage(1);
      pdf.setFillColor(14, 10, 30); pdf.rect(0, 0, W, 297, 'F'); pdf.setFillColor(124, 58, 237); pdf.rect(0, 60, W, 1.4, 'F');
      try { if (window._drawUrbanxLogo) { window._drawUrbanxLogo(pdf, W / 2 - 9, 16, 18); pdf.__hasCoverLogo = 1; } } catch (e) {}
      pdf.setTextColor(196, 181, 253); pdf.setFont(F, 'bold'); pdf.setFontSize(9); pdf.text('URBANX · LAND VALUE CAPTURE', W / 2, 44, { align: 'center' });
      pdf.setTextColor(255, 255, 255); pdf.setFontSize(24); pdf.text('STUDIU LAND VALUE CAPTURE', W / 2, 90, { align: 'center' });
      pdf.setTextColor(196, 181, 253); pdf.setFontSize(13); pdf.text(D.S2('Captarea plusvalorii urbane · ' + (meta.site_name || 'Sit') + (meta.city ? ' · ' + meta.city : '')), W / 2, 102, { align: 'center' });
      pdf.setTextColor(180, 170, 210); pdf.setFontSize(11); pdf.text('Plusvaloare +' + r.uplift_pct + '% · contribuție propusă ' + N(r.total_contribution_eur) + ' EUR', W / 2, 114, { align: 'center' });
      D.setSuppress && D.setSuppress(false);

      D.chapter('1. Rezumat executiv');
      D.P('Prezentul studiu cuantifică plusvaloarea funciară generată de o decizie de planificare urbană (de regulă o majorare a coeficientului de utilizare a terenului prin PUZ) și estimează contribuția prin care o parte din această plusvaloare poate fi recuperată pentru comunitate — mecanism cunoscut internațional drept Land Value Capture (LVC). Pentru situl analizat, valoarea terenului crește de la ' + N(r.baseline_eur_m2) + ' la ' + N(r.value_after_eur_m2) + ' EUR/mp (+' + r.uplift_pct + '%), generând o plusvaloare totală de ' + N(r.total_uplift_eur) + ' EUR; la o rată de recuperare de ' + r.recovery_rate_pct + '%, contribuția propusă este de ' + N(r.total_contribution_eur) + ' EUR.');
      D.callout && D.callout('Principiu', 'Când o decizie publică (reglementarea urbanistică) creează valoare privată, este echitabil ca o parte din acel câștig „nemeritat" (unearned increment) să se întoarcă la comunitatea care l-a generat, pentru a finanța infrastructura și serviciile care fac posibilă dezvoltarea.');

      D.chapter('2. Ce este Land Value Capture');
      D.P('Land Value Capture (captarea plusvalorii funciare) este o familie de instrumente de politică publică prin care autoritățile recuperează o parte din creșterea valorii terenului generată de investiții publice (infrastructură, transport) sau de decizii de reglementare (rezonare, majorare de densitate). Ideea are rădăcini în economia clasică (Henry George, „Progress and Poverty", 1879) și se bazează pe observația că valoarea terenului crește în mare parte din factori externi proprietarului — locație, accesibilitate, decizii ale comunității — nu din efortul său propriu.');
      D.P('Spre deosebire de impozitarea generală, LVC vizează precis acel surplus de valoare („betterment") creat de acțiunea publică, restituindu-l comunității pentru a finanța chiar infrastructura care îl produce — un cerc virtuos de autofinanțare a dezvoltării urbane. Instrumentele variază de la taxe și contribuții obligatorii până la negocieri voluntare în cadrul aprobărilor de urbanism.');

      D.chapter('3. Metodologie de calcul');
      D.P('Estimarea parcurge patru pași: (1) determinarea valorii de bază a terenului (înainte de decizia de planificare); (2) estimarea valorii după decizie (reflectând potențialul edificabil sporit); (3) calculul plusvalorii (uplift) ca diferență; (4) aplicarea unei rate de recuperare care stabilește ce procent din plusvaloare se recuperează pentru comunitate. Rata de recuperare este o decizie de politică (tipic 10–30%), calibrată astfel încât să nu descurajeze investiția privată.');
      D.formula && D.formula('Contribuția LVC', 'Contribuție = (V_după − V_înainte) × Suprafață teren × Rată recuperare', 'rezultat în EUR, repartizabil pe mp ADC construit');
      D.P('Valorile de bază și de după pot fi estimate prin metoda comparabilelor (tranzacții cu terenuri similare cu/fără potențialul respectiv) sau prin metoda reziduală (din studiul de fezabilitate al dezvoltării permise). Corelarea cu modulul Valori Imobiliare și cu modulul Fezabilitate ale platformei oferă o triangulare a estimării.');

      D.chapter('4. Date de intrare și rezultate');
      D.table && D.table(['Indicator', 'Valoare'], [
        ['Valoare teren înainte', N(r.baseline_eur_m2) + ' EUR/mp'],
        ['Valoare teren după', N(r.value_after_eur_m2) + ' EUR/mp'],
        ['Plusvaloare unitară', N(r.uplift_eur_m2) + ' EUR/mp (+' + r.uplift_pct + '%)'],
        ['Suprafață teren', N(r.land_area_m2) + ' mp'],
        ['Plusvaloare totală', N(r.total_uplift_eur) + ' EUR'],
        ['Rată de recuperare', r.recovery_rate_pct + '%'],
        ['CONTRIBUȚIE PROPUSĂ', N(r.total_contribution_eur) + ' EUR'],
        ['Contribuție pe mp ADC', N(r.contribution_per_built_m2) + ' EUR/mp'],
      ], [CW * 0.55, CW * 0.45]);
      D.P('Contribuția de ' + N(r.contribution_per_built_m2) + ' EUR/mp ADC reprezintă un cost suplimentar pentru dezvoltator, ce se compară cu marja sa de dezvoltare: dacă rămâne sub plusvaloarea netă obținută din rezonare, dezvoltatorul rămâne avantajat de decizia publică, iar comunitatea își recuperează partea echitabilă.');

      D.chapter('5. Cadrul legal românesc');
      D.P('România NU dispune, la nivelul anului 2025, de un mecanism legal direct și obligatoriu de captare a plusvalorii (de tipul CIL britanic sau ZAC francez). Singurul temei utilizabil este Legea nr. 350/2001 privind amenajarea teritoriului și urbanismul, art. 56, care permite negocierea unor contribuții ale dezvoltatorului în cadrul acordului la aprobarea documentațiilor de urbanism (PUZ). Contribuția are astfel caracter VOLUNTAR și negociat, nu de taxă impusă.');
      D.P('În practică, unele municipii au utilizat acorduri de acest tip pentru obținerea de terenuri pentru infrastructură, spații verzi sau dotări, în schimbul aprobării unor parametri urbanistici superiori. Generalizarea necesită însă un cadru legal clar, predictibil și transparent — recomandat de organisme precum Banca Mondială și OCDE ca pârghie esențială de finanțare a urbanizării. Prezentul studiu oferă baza cuantificată pentru o astfel de negociere.');

      D.chapter('6. Instrumente de captare a plusvalorii');
      D.P('Literatura și practica internațională recunosc două mari categorii de instrumente. (A) Instrumente bazate pe TAXE/CONTRIBUȚII: taxa de betterment (pe creșterea valorii), taxele de impact (impact fees — pentru costul infrastructurii induse de dezvoltare), contribuțiile pentru dezvoltare (development charges), taxa pe terenul nedezvoltat. (B) Instrumente bazate pe DEZVOLTARE: vânzarea drepturilor de construire suplimentare (ca în São Paulo — CEPAC), reajustarea funciară (land readjustment — Japonia, Coreea), finanțarea prin incrementul fiscal (Tax Increment Financing — SUA) și acordurile negociate (planning gain — UK Section 106).');
      D.bullets && D.bullets([
        'UK — CIL (Community Infrastructure Levy) ~100–400 EUR/mp + acorduri Section 106;',
        'Franța — ZAC (zone d\'aménagement concerté) și taxe d\'aménagement;',
        'SUA — Tax Increment Financing (TIF) și impact fees;',
        'Brazilia (São Paulo) — CEPAC, vânzarea la licitație a drepturilor de construire;',
        'Japonia/Coreea — reajustare funciară (land readjustment).',
      ]);

      D.chapter('7. Comparabile internaționale');
      D.P('Experiența internațională arată că LVC, bine proiectat, poate finanța o parte semnificativă din infrastructura urbană fără a împovăra bugetul general. În Marea Britanie, CIL și acordurile Section 106 generează miliarde de lire anual pentru infrastructură și locuințe accesibile. În Franța, sistemul ZAC integrează dezvoltarea cu finanțarea echipamentelor publice. Modelul brazilian CEPAC a finanțat regenerări urbane majore prin vânzarea transparentă, la licitație, a drepturilor de construire.');
      D.P('Lecția comună: succesul depinde de predictibilitate (reguli clare, cunoscute dinainte), de transparență (cum se calculează și unde se cheltuie banii) și de calibrarea cotei astfel încât să nu blocheze dezvoltarea. O cotă prea mare descurajează investiția; una prea mică ratează oportunitatea de finanțare. Intervalul de 10–30% din plusvaloare, utilizat în acest studiu, se înscrie în practica internațională prudentă.');

      D.chapter('8. Justificarea economică și echitatea');
      D.P('Argumentul economic central este că plusvaloarea generată de rezonare este un „câștig nemeritat" (unearned increment): proprietarul nu a făcut nimic pentru a o produce — ea rezultă dintr-o decizie a comunității. Recuperarea unei părți este deci echitabilă și eficientă: echitabilă, pentru că redistribuie un câștig de origine publică; eficientă, pentru că nu distorsionează deciziile economice (impozitarea rentei funciare este, teoretic, cea mai puțin distorsionantă formă de taxare — argumentul lui Henry George).');
      D.P('Pentru comunitate, LVC transformă presiunea de dezvoltare dintr-o povară (aglomerare, cerere de infrastructură) într-o resursă de finanțare. Pentru dezvoltator, contribuția este acceptabilă atât timp cât rămâne mult sub plusvaloarea pe care o obține din parametrii superiori — el rămâne, net, avantajat. Echilibrul corect produce un joc cu sumă pozitivă pentru ambele părți.');

      D.chapter('9. Utilizarea fondurilor captate');
      D.P('Pentru ca LVC să fie acceptat și legitim, destinația fondurilor trebuie să fie clară și legată de dezvoltare: infrastructură (drumuri, rețele, transport public), spații verzi și publice, dotări (școli, creșe), locuințe accesibile și reabilitare urbană. Practica recomandă constituirea unui fond dedicat, cu raportare publică, pentru a evita diluarea în bugetul general și pentru a menține încrederea contribuabililor.');
      D.P('Idealul este ca fondurile captate dintr-o zonă să finanțeze, măcar parțial, infrastructura care deservește acea zonă — închizând cercul între cei care beneficiază de dezvoltare și cei care o finanțează. Această trasabilitate întărește acceptabilitatea politică a mecanismului.');

      D.chapter('10. Negocierea contribuției');
      D.P('În cadrul legal actual (negociere voluntară), studiul LVC oferă administrației o poziție obiectivă de pornire: cuantificarea transparentă a plusvalorii și a contribuției echitabile. Aceasta evită două capcane: subevaluarea (administrația cedează parametri fără contrapartidă adecvată) și supraevaluarea (o cerere excesivă blochează proiectul). Negocierea pornește de la plusvaloarea documentată și ajunge la o contribuție acceptabilă pentru ambele părți.');
      D.P('Contribuția poate lua forme diverse: plată în bani către un fond de infrastructură, cedare de teren pentru dotări/spații verzi, realizarea pe cheltuiala dezvoltatorului a unor lucrări de infrastructură, sau o combinație. Forma se alege în funcție de nevoile concrete ale comunității și de structura proiectului.');

      D.chapter('11. Riscuri, obiecții și gestionarea lor');
      D.P('Principalele obiecții și riscuri: (1) descurajarea investiției — gestionată prin calibrarea prudentă a cotei și prin predictibilitate; (2) transferul costului către cumpărători (prețuri mai mari) — limitat de faptul că prețul de piață e dat de cerere, nu de costuri, contribuția erodând în principal renta funciară; (3) lipsa de transparență și riscul de arbitrariu — gestionat prin reguli clare și raportare publică; (4) incertitudinea juridică în absența unui cadru dedicat — de aceea se recomandă consultanță juridică și, pe termen lung, un cadru legislativ explicit.');
      D.P('Evaluarea corectă a plusvalorii este ea însăși o sursă de risc: supraestimarea descurajează, subestimarea ratează oportunitatea. De aceea se recomandă evaluare ANEVAR independentă și triangularea cu metoda reziduală din studiul de fezabilitate.');

      D.chapter('12. Guvernanță și transparență');
      D.P('Credibilitatea LVC depinde de guvernanță: reguli publicate dinainte (nu negociate caz cu caz în mod opac), o metodologie transparentă de evaluare, un fond dedicat cu raportare anuală a încasărilor și cheltuielilor, și un mecanism de contestare. Implicarea publicului și a actorilor economici în definirea regulilor crește acceptabilitatea. Digitalizarea (o platformă publică de evidență a contribuțiilor și a destinației lor) este o bună practică emergentă.');

      D.chapter('13. Aplicabilitate la nivel local');
      D.P('Pentru o administrație locală din România, pașii practici sunt: (1) adoptarea unei politici/regulament local privind contribuțiile la dezvoltare (în limita L350/2001); (2) stabilirea unei metodologii transparente de calcul al plusvalorii; (3) definirea ratei de recuperare și a destinației fondurilor; (4) aplicarea consecventă la documentațiile de urbanism cu majorare de parametri. Studiul de față poate constitui anexa tehnică de fundamentare a unei astfel de politici sau a unei negocieri individuale.');

      D.chapter('14. Concluzii și recomandări');
      D.P('Pentru situl analizat, plusvaloarea de ' + N(r.total_uplift_eur) + ' EUR (+' + r.uplift_pct + '%) generată de decizia de planificare justifică o contribuție de ' + N(r.total_contribution_eur) + ' EUR (' + r.recovery_rate_pct + '% recuperare), echivalentă cu ' + N(r.contribution_per_built_m2) + ' EUR/mp ADC. Această contribuție este echitabilă, sustenabilă pentru proiect și aliniată practicii internaționale.');
      D.P('Recomandări: (1) utilizarea acestui studiu ca bază obiectivă de negociere în cadrul L350/2001; (2) constituirea unui fond local dedicat, cu raportare publică; (3) pe termen lung, susținerea unui cadru legislativ național de LVC, predictibil și transparent; (4) validarea valorilor prin evaluare ANEVAR independentă înainte de finalizarea acordului.');

      D.chapter('15. Surse de plusvaloare: infrastructură vs reglementare');
      D.P('Plusvaloarea funciară are două surse majore, care justifică captarea în moduri ușor diferite. Prima este INVESTIȚIA PUBLICĂ în infrastructură: o nouă linie de metrou, un drum, un parc cresc valoarea terenurilor deservite — uneori spectaculos (studiile arată creșteri de 20–50% pentru terenurile din proximitatea noilor stații de transport public de mare capacitate). A doua este DECIZIA DE REGLEMENTARE: rezonarea sau majorarea coeficienților urbanistici (CUT/POT) crește potențialul edificabil și, implicit, valoarea terenului, fără nicio investiție fizică.');
      D.P('Ambele surse sunt de origine publică și externă proprietarului, deci ambele justifică, în principiu, captarea unei părți din plusvaloare. Captarea din infrastructură finanțează direct investiția care a generat-o (cerc virtuos); captarea din reglementare recuperează un câștig pur administrativ. Studiul de față se concentrează pe a doua sursă (rezonare), cea mai frecventă în contextul aprobărilor de PUZ din România.');

      D.chapter('16. Impactul asupra accesibilității locuirii');
      D.P('Un beneficiu adesea ignorat al LVC este contribuția la accesibilitatea locuirii. Fondurile captate pot finanța direct locuințe accesibile, iar mecanismul în sine temperează specularea terenului: când o parte din câștigul din rezonare este recuperată, presiunea speculativă asupra prețului terenului scade, ceea ce se reflectă, pe termen lung, în prețuri de locuire mai puțin tensionate. Multe jurisdicții condiționează majorările de densitate de includerea unui procent de locuințe accesibile (inclusionary zoning), o formă de LVC „în natură".');
      D.P('Pentru orașele românești, confruntate cu o accesibilitate redusă a locuirii pentru tineri, această dimensiune este deosebit de relevantă: LVC oferă o sursă de finanțare pentru locuințe accesibile fără apel la bugetul general, transformând presiunea imobiliară într-o resursă socială.');

      D.chapter('17. Reajustarea funciară (land readjustment)');
      D.P('Reajustarea funciară este un instrument LVC sofisticat, larg folosit în Japonia, Coreea de Sud și Germania. Mecanismul: într-o zonă de dezvoltare, proprietarii contribuie cu o parte din terenul lor într-un „pool" comun; autoritatea reconfigurează parcelarul, realizează infrastructura (drumuri, utilități, spații verzi) și restituie proprietarilor parcele mai mici, dar mult mai valoroase (servite, regularizate). O parte din teren se vinde pentru a finanța infrastructura. Toți câștigă: proprietarii primesc terenuri cu valoare netă superioară, iar comunitatea obține infrastructură fără expropriere.');
      D.P('Reajustarea este deosebit de potrivită pentru zonele de extindere urbană cu parcelar fragmentat — frecvente la periferia orașelor românești. Adoptarea ei ar necesita un cadru legal dedicat, dar oferă o alternativă elegantă la dezvoltarea haotică, lot cu lot, fără infrastructură coordonată.');

      D.chapter('18. Finanțarea prin increment fiscal (TIF)');
      D.P('Tax Increment Financing (TIF), instrument popular în SUA, funcționează astfel: autoritatea „îngheață" baza de impozitare a unei zone la nivelul actual, investește în infrastructură (eventual prin împrumut), iar creșterea ulterioară a impozitelor (datorată aprecierii generate de investiție) rambursează împrumutul. Practic, investiția se autofinanțează din plusvaloarea fiscală pe care o produce, fără a afecta restul bugetului.');
      D.P('TIF necesită un sistem de impozitare a proprietății bazat pe valoarea de piață (ad valorem) și o capacitate de a izola fiscal o zonă — condiții care în România ar necesita reforme. Totuși, principiul (investiția publică se finanțează din plusvaloarea pe care o creează) este universal valabil și poate inspira instrumente locale adaptate.');

      D.chapter('19. Studiu de caz ilustrativ');
      D.P('Pentru a ilustra mecanismul la scara sitului analizat: o majorare de CUT care ridică valoarea terenului de la ' + N(r.baseline_eur_m2) + ' la ' + N(r.value_after_eur_m2) + ' EUR/mp produce, pe cei ' + N(r.land_area_m2) + ' mp, o plusvaloare de ' + N(r.total_uplift_eur) + ' EUR. Cu o recuperare de ' + r.recovery_rate_pct + '%, comunitatea obține ' + N(r.total_contribution_eur) + ' EUR — suficient, de exemplu, pentru a amenaja un spațiu verde de cartier sau un segment de infrastructură rutieră/edilitară care deservește chiar dezvoltarea aprobată.');
      D.P('Dezvoltatorul, la rândul său, rămâne net avantajat: din plusvaloarea de ' + N(r.total_uplift_eur) + ' EUR generată de rezonare, el cedează doar ' + r.recovery_rate_pct + '% și păstrează restul de ' + (100 - r.recovery_rate_pct) + '%, în plus față de profitul de dezvoltare. Acesta este jocul cu sumă pozitivă pe care LVC bine calibrat îl produce.');

      D.chapter('20. Monitorizarea și evaluarea politicii');
      D.P('O politică LVC eficientă include un mecanism de monitorizare: evidența contribuțiilor încasate, a destinației lor și a efectelor (infrastructură realizată, locuințe accesibile create). Indicatorii de urmărit sunt: valoarea totală captată anual, ponderea din necesarul de infrastructură finanțată prin LVC, numărul de proiecte negociate și eventualul efect descurajant asupra investițiilor (monitorizat prin ritmul autorizărilor). Evaluarea periodică permite recalibrarea ratei de recuperare.');
      D.P('Transparența raportării — un registru public al contribuțiilor și al cheltuielilor — este esențială pentru menținerea încrederii și a legitimității. Platforma UrbanX poate susține acest proces prin evidența digitală a estimărilor de plusvaloare și a contribuțiilor asociate fiecărei documentații de urbanism.');

      D.chapter('21. Limitări și disclaimer');
      D.P('Studiul este ORIENTATIV și de fundamentare. Valorile de teren sunt estimative; recomandăm evaluare ANEVAR și consultanță juridică înainte de orice acord. România nu are, la nivel 2025, un mecanism legal direct de LVC — contribuția este voluntară și negociată (L350/2001 art.56). Rezultatele depind critic de acuratețea valorilor de bază și „după"; o eroare în acestea se propagă proporțional în contribuție.');

      D.chapter('22. Surse, bibliografie și glosar');
      D.P('George H. (1879) „Progress and Poverty"; Banca Mondială — „Land Value Capture" (Urban Development Series); OCDE — „Global Compendium of Land Value Capture Policies" (2022); Lincoln Institute of Land Policy; Legea nr. 350/2001 (art. 56); exemple internaționale CIL (UK), ZAC (FR), CEPAC (BR), TIF (US). Glosar: plusvaloare/uplift = creșterea valorii terenului din decizia de planificare; rată de recuperare = procentul din plusvaloare captat pentru comunitate; betterment = surplusul de valoare creat de acțiunea publică; unearned increment = câștig nemeritat. Metodologie UrbanX · ThinkSmart Solutions.');

      var fn = ('Studiu_LVC_' + (meta.site_name || 'sit') + '_' + new Date().toISOString().slice(0, 10) + '.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
      window._buildStratTOC && window._buildStratTOC(D, 1);
      pdf.save(fn); G.ss && ss('✅ Studiu LVC generat: ' + pdf.getNumberOfPages() + ' pagini');
    } catch (e) { console.error('[LVC PDF]', e); try { return _genSimpleLVC(r, meta, Jc, N); } catch (e2) {} }
  }
  function _genSimpleLVC(r, meta, Jc, N) {
    var pdf = new Jc({ orientation: 'portrait', unit: 'mm', format: 'a4' }); try { window._registerROFont && window._registerROFont(pdf); } catch (e) {}
    var F = 'DejaVuRO', y = 22; pdf.setFont(F, 'bold'); pdf.setFontSize(14); pdf.text('Studiu Land Value Capture', 16, y); y += 10; pdf.setFont(F, 'normal'); pdf.setFontSize(10);
    [['Plusvaloare', '+' + r.uplift_pct + '%'], ['Plusvaloare totală', N(r.total_uplift_eur) + ' EUR'], ['Contribuție', N(r.total_contribution_eur) + ' EUR']].forEach(function (kv) { pdf.text(kv[0] + ': ' + kv[1], 16, y); y += 8; });
    pdf.save('LVC_' + (meta.site_name || 'sit') + '.pdf');
  }

  G.LVC = { compute: compute, openPanel: openPanel, generatePDF: generatePDF, TRIGGERS: TRIGGERS };
  console.log('[LVC] modul Land Value Capture încărcat (window.LVC)');
})(window);
