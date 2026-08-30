/* ============================================================================
 * UrbanX — INGESTIE documente sursă → prefill model (al 3-lea drum de intrare).
 *  • Topo DWG/DXF → conturul parcelei + suprafața (Steren) [client-side, DXF; DWG via ODA].
 *  • Certificat de Urbanism (text) → POT/CUT/H max, retrageri, nr CU, județ [regex determinist].
 *  • Studiu geotehnic (text) → presiune convențională, adâncime fundare [regex].
 *  • Audit energetic (text) → clasă energetică, consum specific, R'm anvelopă [regex].
 *  • Expertiză tehnică (text) → clasă risc seismic, categorie importanță, concluzii expert [regex].
 * Datele extrase se PROPUN; utilizatorul confirmă înainte de generare (nu încredere oarbă).
 * window.UXIngest.{parseDXF, extractCU, extractGeo, extractAuditEnergetic, extractExpertiza, open}
 * ========================================================================== */
(function (G) {
  'use strict';
  function el(t, a, h) { var e = document.createElement(t); if (a) for (var k in a) e.setAttribute(k, a[k]); if (h != null) e.innerHTML = h; return e; }

  // ── DXF: extrage polilinii (LWPOLYLINE / POLYLINE+VERTEX) și alege conturul cu aria maximă ──
  function parseDXF(text) {
    var lines = String(text || '').split(/\r\n|\r|\n/);
    var pairs = []; for (var i = 0; i + 1 < lines.length; i += 2) pairs.push([lines[i].trim(), lines[i + 1]]);
    var polys = [], cur = null, mode = null, vx = null;
    for (var k = 0; k < pairs.length; k++) {
      var code = pairs[k][0], val = pairs[k][1];
      if (code === '0') {
        if (val === 'LWPOLYLINE') { cur = []; mode = 'lw'; polys.push(cur); }
        else if (val === 'POLYLINE') { cur = []; mode = 'pl'; polys.push(cur); }
        else if (val === 'VERTEX' && mode === 'pl' && cur) { vx = { x: null, y: null }; }
        else if (val === 'SEQEND' && vx) { vx = null; }
        else if (mode === 'lw') { mode = null; cur = null; }
        else { if (val !== 'VERTEX') { mode = (mode === 'pl' && val === 'SEQEND') ? mode : mode; } }
      } else if (mode === 'lw' && cur) {
        if (code === '10') cur.push({ x: parseFloat(val), y: null });
        else if (code === '20' && cur.length) cur[cur.length - 1].y = parseFloat(val);
      } else if (mode === 'pl' && vx) {
        if (code === '10') vx.x = parseFloat(val);
        else if (code === '20') { vx.y = parseFloat(val); if (cur) cur.push({ x: vx.x, y: vx.y }); }
      }
    }
    function area(p) { var a = 0; for (var j = 0; j < p.length; j++) { var q = p[(j + 1) % p.length]; if (!p[j] || !q || p[j].x == null || q.x == null) continue; a += p[j].x * q.y - q.x * p[j].y; } return Math.abs(a) / 2; }
    var best = null, bestA = 0;
    polys.forEach(function (p) { var pts = p.filter(function (v) { return v && v.x != null && v.y != null; }); if (pts.length >= 3) { var ar = area(pts); if (ar > bestA) { bestA = ar; best = pts; } } });
    return { boundary: best || [], area: Math.round(bestA), polylines: polys.length };
  }

  // ── Certificat de Urbanism (text extras din PDF/OCR) → indicatori ──
  var _JUD = ['alba', 'arad', 'arges', 'argeș', 'bacau', 'bacău', 'bihor', 'bistrita', 'bistrița', 'botosani', 'botoșani', 'braila', 'brăila', 'brasov', 'brașov', 'buzau', 'buzău', 'calarasi', 'călărași', 'caras', 'caraș', 'cluj', 'constanta', 'constanța', 'covasna', 'dambovita', 'dâmbovița', 'dolj', 'galati', 'galați', 'giurgiu', 'gorj', 'harghita', 'hunedoara', 'ialomita', 'ialomița', 'iasi', 'iași', 'ilfov', 'maramures', 'maramureș', 'mehedinti', 'mehedinți', 'mures', 'mureș', 'neamt', 'neamț', 'olt', 'prahova', 'salaj', 'sălaj', 'satu mare', 'sibiu', 'suceava', 'teleorman', 'timis', 'timiș', 'tulcea', 'valcea', 'vâlcea', 'vaslui', 'vrancea', 'bucuresti', 'bucurești'];
  function extractCU(text) {
    var t = ' ' + String(text || '').replace(/\s+/g, ' ') + ' '; var o = {}; var m;
    if ((m = t.match(/POT\s*(?:max(?:im)?)?\s*[:=]?\s*(\d{1,3})\s*%/i))) o.POT_max = +m[1];
    if ((m = t.match(/CUT\s*(?:max(?:im)?)?\s*[:=]?\s*(\d(?:[.,]\d+)?)/i))) o.CUT_max = +m[1].replace(',', '.');
    if ((m = t.match(/(?:H(?:\s*max(?:im)?)?|[iî]n[aă]l[țt]ime\s*max(?:im[aă]?)?)\s*[:=]?\s*(\d{1,2}(?:[.,]\d+)?)\s*m\b/i))) o.H_max = +m[1].replace(',', '.');
    if ((m = t.match(/(?:regim|niveluri)\s*(?:max(?:im)?)?\s*[:=]?\s*P\s*\+\s*(\d)/i))) o.niv_max = 1 + (+m[1]);
    if ((m = t.match(/(?:certificat\s+de\s+urbanism|C\.?U\.?)\s*(?:nr\.?|num[aă]r)?\s*(\d{1,5}(?:\s*\/\s*\d{2,4})?)/i))) o.nrCU = m[1].replace(/\s+/g, '');
    if ((m = t.match(/(?:suprafa[țt][aă]\s*(?:teren)?)\s*[:=]?\s*([\d.]+)\s*(?:mp|m2|m²)/i))) o.Steren = +m[1].replace(/\./g, '');
    var low = t.toLowerCase();
    for (var i = 0; i < _JUD.length; i++) { if (low.indexOf(' ' + _JUD[i] + ' ') >= 0 || low.indexOf('jud. ' + _JUD[i]) >= 0 || low.indexOf('județul ' + _JUD[i]) >= 0) { o.judet = _JUD[i].charAt(0).toUpperCase() + _JUD[i].slice(1); break; } }
    return o;
  }
  // Extins (cerere Florin: "trebuie preluate informatii" din studiul geotehnic real, nu doar 3 câmpuri) —
  // adaugă nivelul apei subterane, adâncimea de îngheț (STAS 6054), tipul/natura terenului de fundare
  // și recomandarea explicită a sistemului de fundare a geotehnicianului. Regex, nu listă exactă — un
  // studiu geotehnic real variază formularea, de-aia fiecare pattern acceptă sinonimele uzuale întâlnite.
  // Text real (mai ales extras din PDF) intercalează adesea cuvinte între ancoră și valoare
  // ("presiunea convențională DE CALCUL ESTE 180 kPa") și poate lipsi de diacritice — de-aia
  // pattern-urile de mai jos folosesc goluri largi (.{0,N}?) și clase de caractere diacritic/ASCII,
  // nu o potrivire strictă imediat după cuvântul-cheie (lecție din parserul de antemăsurători).
  function extractGeo(text) {
    var t = String(text || '').replace(/\s+/g, ' '); var o = {}; var m;
    if ((m = t.match(/presiune(?:a)?\s*conven[țt]ional[aă].{0,40}?(\d{2,3})\s*(?:kPa)?/i))) o.p_conv = +m[1];
    if ((m = t.match(/ad[aâ]ncime(?:a)?\s*(?:de\s*)?fundare.{0,40}?(\d(?:[.,]\d+)?)\s*m\b/i))) o.adancime_fundare = +m[1].replace(',', '.');
    if ((m = t.match(/categoria?\s*geotehnic[aă].{0,40}?(\d)\b/i))) o.cat_geo = +m[1];
    // Nivelul apei subterane — „nu s-a interceptat" e un rezultat valid, distinct de o adâncime numerică
    if (/nu\s*s-?a[u]?\s*(?:interceptat|[îi]nt[aâ]lnit|identificat).{0,25}?(?:nivelul\s*)?(?:apei|apelor|ap[aă]|ape)\s*subteran/i.test(t)) o.nivel_apa = 'neinterceptată la adâncimea forată';
    else if ((m = t.match(/nivel(?:ul)?\s*(?:apei|apelor)\s*subterane?.{0,30}?(\d(?:[.,]\d+)?)\s*m\b/i))) o.nivel_apa = m[1].replace(',', '.') + ' m';
    if ((m = t.match(/ad[aâ]ncime(?:a)?\s*(?:de\s*)?[îi]nghe[țt].{0,60}?(\d(?:[.,]\d+)?)\s*m\b/i))) o.adancime_inghet = m[1].replace(',', '.');
    // Natura/tipul terenului de fundare — categorii uzuale, tolerante la diacritice/ASCII
    if ((m = t.match(/\b(argil[aă]\s*(?:pr[aă]foas[aă]|nisipoas[aă])?|praf\s*argilos|nisip(?:\s*(?:pr[aă]fos|argilos))?|pietri[șs]|loess|umplutur[aă])\b/i))) o.tip_teren = m[1].trim();
    // Recomandarea SISTEMULUI de fundare — distinctă de o simplă mențiune a adâncimii de fundare.
    // Preferăm propoziția care numește TIPUL de fundare (directă/continuă/pe piloți/radier), nu doar
    // orice propoziție cu „fundare" (altfel se poate prinde greșit „adâncime de fundare X m").
    var propGeo = t.split(/(?<=[.!?])\s+/);
    var candFundare = propGeo.filter(function (p) { return /fundare/i.test(p) && p.length < 260; });
    var tipFundareRe = /direct[aă]|continu[aă]|izolat[aă]|pe\s*pilo[țt]i|radier|indirect[aă]/i;
    var alesa = candFundare.filter(function (p) { return tipFundareRe.test(p); })[0] || candFundare[0];
    if (alesa) o.recomandare_fundare = alesa.trim();
    return o;
  }

  // ── Audit energetic — motor NOU (nu exista deloc inainte). Nu incearca sa reconstruiasca tabelul
  // strat-cu-strat perete-cu-perete (nesigur pe text PDF aplatizat, ordinea coloanelor nu se pastreaza) —
  // extrage in schimb valorile-rezumat care apar de regula ca propozitii de sine statatoare chiar si in
  // text aplatizat: clasa energetica, consum specific, rezistente termice CORECTATE ale anvelopei (R'm),
  // si lista masurilor de reabilitare recomandate. Candidati cu incredere marcata, confirmati de user.
  function extractAuditEnergetic(text) {
    var t = String(text || '').replace(/\s+/g, ' '); var o = {};
    var m;
    // clasa energetica: cautare CASE-SENSITIVE a literei in fereastra ancorei — la fel ca la categoria de
    // importanta (extractExpertiza) — altfel articolul romanesc "a" ("energetica A cladirii") se confunda cu clasa A.
    if ((m = t.match(/clas[aă]\s*energetic[aă][^.]{0,60}/i))) { var mmCE = m[0].match(/\b([A-G]\+?)\b(?!\w)/); if (mmCE) o.clasa_energetica = mmCE[1].toUpperCase(); }
    if ((m = t.match(/consum(?:ul)?\s*specific.{0,50}?(\d+(?:[.,]\d+)?)\s*kWh\s*\/?\s*(?:m[²2]|mp)\s*\/?\s*an/i))) o.consum_specific_kwh_mp_an = +m[1].replace(',', '.');
    if ((m = t.match(/zona\s*climatic[aă].{0,20}?\b(I{1,3}V?|IV|V)\b.{0,60}?T[eE][a-z]*\.?\s*=?\s*(-?\d{1,2})\s*°?C/i))) { o.zona_climatica = m[1]; o.te_calcul = +m[2]; }
    if ((m = t.match(/R\s*'?\s*m\.?\s*pere[țt]i(?:\s*exteriori)?.{0,20}?(\d(?:[.,]\d+)?)\s*m[²2]\s*K\s*\/\s*W/i))) o.rm_pereti = +m[1].replace(',', '.');
    if ((m = t.match(/R\s*'?\s*m\.?\s*(?:acoperi[șs]|terasa|plan[șs]eu\s*peste\s*ultimul\s*nivel).{0,20}?(\d(?:[.,]\d+)?)\s*m[²2]\s*K\s*\/\s*W/i))) o.rm_acoperis = +m[1].replace(',', '.');
    // tampl[aă]ri + e/a — accepta si forma articulata "tamplaria" (subiect de propozitie), nu doar "tamplarie";
    // accepta ambele ordini uzuale in romana — "geam dublu" SI "dublu geam" (ex. "PVC cu dublu geam")
    if ((m = t.match(/t[aâ]mpl[aă]ri[ea](?:\s*exterioar[aă])?.{0,50}?(?:geam\s*(dublu|triplu|simplu)|(dublu|triplu|simplu)\s*geam)/i))) o.tip_tamplarie = 'geam ' + (m[1] || m[2]);
    // Recomandările auditorului — cuvinte-cheie tipice (diacritic/ASCII), se colectează propozițiile care le conțin
    var masuriKeywords = /termosistem|termoizola[țt]i[ei]|t[aâ]mpl[aă]rie\s*nou[aă]|pomp[aă]\s*de\s*c[aă]ldur[aă]|panouri\s*fotovoltaice|central[aă]\s*(?:termic[aă]\s*)?[îi]n\s*condensa[țt]ie|recuperator\s*de\s*c[aă]ldur[aă]/gi;
    var propozitii = t.split(/(?<=[.!?])\s+/);
    var masuri = [];
    propozitii.forEach(function (p) { if (masuriKeywords.test(p) && p.length < 260) masuri.push(p.trim()); masuriKeywords.lastIndex = 0; });
    if (masuri.length) o.masuri_recomandate = masuri.slice(0, 8);
    return o;
  }

  // ── Expertiza tehnică — motor NOU (nu exista deloc inainte, cerere explicita Florin). Extrage
  // clasa de risc seismic (Rs I-IV, terminologie veche P100-3/2008, sau incadrarea noua "grad de
  // asigurare seismica"/indicator R1/R2/R3 conform P100-3/2019), categoria de importanta a
  // constructiei, si concluziile/solutiile de interventie recomandate de expert. La fel ca la audit
  // energetic — NU se presupune un format unic de raport, se extrag valorile-rezumat pe care experti
  // diferiti le formuleaza in propozitii de sine statatoare, cu goluri largi intre ancora si valoare.
  function extractExpertiza(text) {
    var t = String(text || '').replace(/\s+/g, ' '); var o = {};
    var m;
    if ((m = t.match(/clas[aă]\s*de\s*risc\s*seismic.{0,20}?\b(R[sS]?\s*[IV]{1,3}|[IV]{1,3})\b/i))) o.clasa_risc_seismic = m[1].toUpperCase().replace(/\s+/g, '');
    if ((m = t.match(/(?:categoria|clasa)\s*de\s*importan[țt][aă][^.]{0,60}/i))) {
      // fereastra gasita case-insensitive (ancora); litera de categorie (A-D) se cauta case-SENSITIVE
      // in interiorul ferestrei, ca sa nu se confunde cu articolul "a" din romana ("importanta A constructiei")
      var mmLit = m[0].match(/\b([A-D])\b(?!\w)/);
      if (mmLit) o.categorie_importanta = mmLit[1];
      else { var mmTxt = m[0].match(/\b(excep[țt]ional[aă]|deosebit[aă]|normal[aă]|redus[aă])\b/i); if (mmTxt) o.categorie_importanta = mmTxt[1]; }
    }
    // gol intre "prioritate" si litera R — textul real spune des "prioritate DE INTERVENTIE R1", nu "prioritate R3" direct;
    // valoarea trebuie sa aiba zecimale (indicatorul R1/R2/R3 e mereu un coeficient subunitar) ca sa nu prinda
    // gresit un numar intreg din vecinatate (ex. anul normativului "P100-3/2019" citat langa indicator)
    if ((m = t.match(/(?:indicator(?:ul)?|grad(?:ul)?)\s*(?:de\s*)?(?:asigurare\s*seismic[aă]|prioritate(?:\s*de\s*interven[țt]ie)?)\s*.{0,15}?R\s*[123]?\s*.{0,40}?(\d(?:[.,]\d+))/i))) o.indicator_r3 = +m[1].replace(',', '.');
    if ((m = t.match(/an(?:ul)?\s*(?:de\s*)?(?:construc[țt]ie|edificare|punere\s*[îi]n\s*func[țt]iune).{0,40}?(\d{4})/i))) o.an_constructie = +m[1];
    else if ((m = t.match(/construit[aăe]?.{0,20}?an(?:ul)?\s+(\d{4})/i))) o.an_constructie = +m[1];
    if ((m = t.match(/sistem(?:ul)?\s*(?:constructiv|structural).{0,30}?(cadre\s*(?:din\s*|de\s*)?beton\s*armat|zid[aă]rie\s*(?:portant[aă])?|structur[aă]\s*metalic[aă]|panouri\s*mari|diafragme)/i))) o.sistem_structural = m[1];
    // Concluzia expertului — de regulă o propoziție care conține "se recomandă"/"expertul recomandă" + o soluție
    var propExp = t.split(/(?<=[.!?])\s+/);
    var recomandariKeywords = /se\s*recomand[aă]|expertul\s*recomand[aă]|solu[țt]ia\s*(?:de\s*)?interven[țt]ie|necesit[aă]\s*consolidare|necesit[aă]\s*interven[țt]ii/i;
    var recomandari = [];
    propExp.forEach(function (p) { if (recomandariKeywords.test(p) && p.length < 300) recomandari.push(p.trim()); });
    if (recomandari.length) o.recomandari_expert = recomandari.slice(0, 6);
    // Degradările constatate — cuvinte-cheie tipice de expertiză (fisuri, tasări, coroziune)
    var degradareKeywords = /fisur\w*|tasar\w*|coroziun\w*|degradar\w*|infiltra[țt]i\w*|deforma[țt]i\w*\s*excesiv\w*/i;
    var degradari = [];
    propExp.forEach(function (p) { if (degradareKeywords.test(p) && p.length < 260) degradari.push(p.trim()); });
    if (degradari.length) o.degradari_constatate = degradari.slice(0, 6);
    return o;
  }

  // ADAUGAT (18 iul — Florin a semnalat repetat, cu capturi de ecran, ca nu gaseste optiune de INCARCARE
  // pt Certificat de Urbanism/studiu geotehnic, doar o casuta goala de lipit text — se astepta la un
  // buton de upload ca la sectiunea 1 (DXF). FIX real: adauga incarcare de fisier (.pdf/.txt) langa
  // fiecare textarea, care extrage textul automat (PDF via pdf.js, deja folosit in platforma la
  // js/25-ssi-materiale-extractie.js — acelasi tipar de asteptare CDN) si il pune in caseta + extrage automat.
  function _asteaptaPdfjs(timeoutMs) {
    return new Promise(function (resolve) {
      var trecut = 0;
      var iv = setInterval(function () {
        trecut += 200;
        if (window.pdfjsLib || trecut >= (timeoutMs || 8000)) { clearInterval(iv); resolve(!!window.pdfjsLib); }
      }, 200);
    });
  }
  async function _extrageTextDinFisier(file) {
    if (/\.pdf$/i.test(file.name || '')) {
      if (!window.pdfjsLib) {
        try { pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js'; } catch (e) { /* noop */ }
        var gata = await _asteaptaPdfjs(8000);
        if (!gata) throw new Error('pdf.js nu s-a încărcat de pe CDN după 8 secunde — verifică conexiunea la internet sau un blocker de reclame; poți copia manual textul din PDF (Select All → Copy) în caseta de mai jos.');
      }
      var buf = await file.arrayBuffer();
      var doc = await pdfjsLib.getDocument({ data: buf }).promise;
      var texte = [];
      for (var i = 1; i <= doc.numPages; i++) {
        var pagina = await doc.getPage(i);
        var continut = await pagina.getTextContent();
        texte.push(continut.items.map(function (it) { return it.str; }).join(' '));
      }
      return texte.join('\n');
    }
    return await file.text();
  }
  function _cardFisierExtragere(titlu, textarea, btnExtrage, res) {
    var wrap = el('div', { style: 'margin-top:8px;display:flex;align-items:center;gap:8px' });
    wrap.appendChild(el('span', { style: 'font-size:11px;color:#94a3b8' }, 'SAU încarcă fișierul (.pdf/.txt):'));
    var inp = el('input', { type: 'file', accept: '.pdf,.txt', style: 'font-size:12px;color:#cbd5e1' });
    inp.onchange = function () {
      var f = inp.files[0]; if (!f) return;
      res.textContent = '⏳ Se extrage textul din „' + f.name + '"…';
      _extrageTextDinFisier(f).then(function (txt) {
        textarea.value = txt;
        res.textContent = '✓ Text extras din „' + f.name + '" (' + txt.length + ' caractere) — apasă „' + titlu + '" pentru a identifica datele, sau editează textul mai întâi.';
        btnExtrage.click();
      }).catch(function (e) {
        res.textContent = '⚠ ' + (e && e.message || 'Eroare la citirea fișierului.');
      });
    };
    wrap.appendChild(inp);
    return wrap;
  }

  function open(D, onApply) {
    var ov = el('div', { id: 'uxing-ov', style: 'position:fixed;inset:0;background:#070c18;z-index:4400;overflow:auto;font-family:system-ui;color:#e6edf7' });
    var wrap = el('div', { style: 'max-width:820px;margin:0 auto;padding:18px 16px 60px' });
    var head = el('div', { style: 'display:flex;justify-content:space-between;align-items:center;margin-bottom:12px' });
    head.appendChild(el('div', null, '<div style="font-size:17px;font-weight:800;color:#93c5fd">📥 Import documente sursă</div><div style="font-size:11px;color:#94a3b8">Topo DXF · Certificat de Urbanism (text) · Geotehnic (text) → extrage și propune datele (le confirmi tu)</div>'));
    var bX = el('button', { style: 'background:none;border:none;color:#94a3b8;font-size:22px;cursor:pointer' }, '✕'); bX.onclick = function () { ov.remove(); }; head.appendChild(bX); wrap.appendChild(head);
    var found = {};
    function card(title, note) { var c = el('div', { style: 'background:#0b1220;border:1px solid rgba(148,163,184,.2);border-radius:10px;padding:12px;margin-bottom:12px' }); c.appendChild(el('div', { style: 'font-size:13px;font-weight:700;color:#93c5fd;margin-bottom:4px' }, title)); if (note) c.appendChild(el('div', { style: 'font-size:11px;color:#94a3b8;margin-bottom:8px' }, note)); return c; }
    var res = el('div', { id: 'uxing-res', style: 'font-size:12px;color:#6ee7b7;white-space:pre-wrap;margin-top:6px' });
    // Topo DXF
    var cTopo = card('1 · Ridicare topografică (DXF / DWG)', 'Recomandat: DXF (se citește direct în browser). DWG-ul e format binar — nu poate fi parsat client-side; exportă DXF din CAD (Save As → DXF R12/2013) sau rulează pipeline-ul de la pasul 4. Se extrage conturul cu aria maximă = parcela.');
    var fTopo = el('input', { type: 'file', accept: '.dxf,.dwg', style: 'font-size:12px;color:#cbd5e1' });
    fTopo.onchange = function () { var f = fTopo.files[0]; if (!f) return; var isDwgName = /\.dwg$/i.test(f.name || ''); var rd = new FileReader(); rd.onload = function () {
        var txt = String(rd.result || '');
        // DWG binar: începe cu semnătura ACxxxx (ex. AC1027). Nu se poate parsa în browser.
        if (isDwgName || /^AC10[0-9][0-9]/.test(txt.slice(0, 6))) {
          res.textContent = '⚠ „' + (f.name || 'fișier') + '" este DWG (binar) — nu poate fi citit direct în browser.\n→ Deschide-l în CAD și salvează ca DXF (Save As → AutoCAD DXF, versiune R12 sau 2013), apoi încarcă DXF-ul aici.\n→ SAU: rulează „scripts/dwg-to-urbanx.py <fișier.dwg>" (ODA + ezdxf) și importă urbanx_import.json la pasul 4 (extrage și Sc/Sd/regim din desen).';
          fTopo.value = ''; return;
        }
        try { var r = parseDXF(txt); if (r.area > 0) { found.Steren = r.area; found._boundary = r.boundary; res.textContent = '✓ Topo: ' + r.polylines + ' polilinii, parcela ≈ ' + r.area.toLocaleString('ro-RO') + ' mp (contur ' + r.boundary.length + ' vârfuri).'; } else res.textContent = '⚠ Nu am găsit un contur închis în DXF (verifică layerul parcelei — trebuie o polilinie închisă LWPOLYLINE/POLYLINE).'; } catch (e) { res.textContent = '⚠ Eroare la citirea DXF: ' + e.message; } }; rd.readAsText(f); };
    cTopo.appendChild(fTopo); wrap.appendChild(cTopo);
    // CU text
    var cCU = card('2 · Certificat de Urbanism (text)', 'Lipește textul din CU (sau din PDF-ul deschis). Extrage POT/CUT/H max, nr. CU, județ, suprafață.');
    var taCU = el('textarea', { style: 'width:100%;height:90px;background:#0a1120;border:1px solid rgba(148,163,184,.25);border-radius:7px;color:#e6edf7;padding:8px;font-size:12px;box-sizing:border-box', placeholder: 'ex: Certificat de urbanism nr. 123/2026 ... POT max 40% ... CUT max 1,2 ... înălțime maximă 10 m ... jud. Iași ...' });
    var bCU = el('button', { style: 'margin-top:8px;background:rgba(59,130,246,.2);color:#93c5fd;border:1px solid rgba(59,130,246,.4);border-radius:7px;padding:7px 13px;font-size:12px;cursor:pointer' }, 'Extrage din CU');
    bCU.onclick = function () { var o = extractCU(taCU.value); for (var k in o) found[k] = o[k]; res.textContent = '✓ CU: ' + (Object.keys(o).length ? Object.keys(o).map(function (k) { return k + '=' + o[k]; }).join(', ') : 'nimic recunoscut — verifică textul'); };
    cCU.appendChild(taCU); cCU.appendChild(bCU); cCU.appendChild(_cardFisierExtragere('Extrage din CU', taCU, bCU, res)); wrap.appendChild(cCU);
    // Geo text
    var cGeo = card('3 · Studiu geotehnic (text)', 'Lipește textul (sau încarcă PDF-ul studiului). Extrage presiunea convențională, adâncimea de fundare, categoria geotehnică, nivelul apei subterane, adâncimea de îngheț, tipul de teren și recomandarea de fundare.');
    var taGeo = el('textarea', { style: 'width:100%;height:70px;background:#0a1120;border:1px solid rgba(148,163,184,.25);border-radius:7px;color:#e6edf7;padding:8px;font-size:12px;box-sizing:border-box', placeholder: 'ex: presiunea convențională 200 kPa ... adâncime de fundare 1,5 m ... categorie geotehnică 2 ... nivelul apei subterane la 3,2 m ... se recomandă fundare directă' });
    var bGeo = el('button', { style: 'margin-top:8px;background:rgba(59,130,246,.2);color:#93c5fd;border:1px solid rgba(59,130,246,.4);border-radius:7px;padding:7px 13px;font-size:12px;cursor:pointer' }, 'Extrage din geotehnic');
    bGeo.onclick = function () {
      var o = extractGeo(taGeo.value);
      ['p_conv', 'adancime_fundare', 'cat_geo', 'nivel_apa', 'adancime_inghet', 'tip_teren', 'recomandare_fundare'].forEach(function (k) { if (o[k] != null) found[k] = o[k]; });
      res.textContent = '✓ Geo: ' + (Object.keys(o).length ? Object.keys(o).map(function (k) { return k + '=' + o[k]; }).join(', ') : 'nimic recunoscut — verifică textul');
    };
    cGeo.appendChild(taGeo); cGeo.appendChild(bGeo); cGeo.appendChild(_cardFisierExtragere('Extrage din geotehnic', taGeo, bGeo, res)); wrap.appendChild(cGeo);
    // Audit energetic — NOU (nu exista deloc inainte). Nu reconstruieste tabelul strat-cu-strat (nesigur
    // pe text PDF aplatizat) — extrage valorile-rezumat (clasa energetica, consum specific, R'm anvelopa,
    // masuri recomandate), afisate ca fiind ce sunt: extrase, de verificat, nu masuratori garantate 100%.
    var cAudit = card('4 · Audit energetic (text)', 'Lipește textul (sau încarcă PDF-ul auditului). Extrage clasa energetică, consumul specific, rezistențele termice corectate ale anvelopei (R\'m) și măsurile de reabilitare recomandate. NU reconstruiește tabelul strat-cu-strat al pereților (text PDF aplatizat, ordinea coloanelor nu se păstrează fiabil) — pentru acela, verifică manual raportul.');
    var taAudit = el('textarea', { style: 'width:100%;height:70px;background:#0a1120;border:1px solid rgba(148,163,184,.25);border-radius:7px;color:#e6edf7;padding:8px;font-size:12px;box-sizing:border-box', placeholder: 'ex: clasa energetică C ... consum specific 180 kWh/m²/an ... zona climatică III Te=-18°C ... R\'m pereți = 0.69 m²K/W ... se recomandă montarea termosistemului' });
    var bAudit = el('button', { style: 'margin-top:8px;background:rgba(59,130,246,.2);color:#93c5fd;border:1px solid rgba(59,130,246,.4);border-radius:7px;padding:7px 13px;font-size:12px;cursor:pointer' }, 'Extrage din audit energetic');
    bAudit.onclick = function () {
      var o = extractAuditEnergetic(taAudit.value);
      found._audit_energetic = o;
      var rez = [];
      if (o.clasa_energetica) rez.push('clasă=' + o.clasa_energetica);
      if (o.consum_specific_kwh_mp_an) rez.push('consum=' + o.consum_specific_kwh_mp_an + ' kWh/m²an');
      if (o.rm_pereti) rez.push('R\'m pereți=' + o.rm_pereti);
      if (o.rm_acoperis) rez.push('R\'m acoperiș=' + o.rm_acoperis);
      if (o.masuri_recomandate) rez.push(o.masuri_recomandate.length + ' măsuri identificate');
      res.textContent = '✓ Audit energetic: ' + (rez.length ? rez.join(', ') : 'nimic recunoscut — verifică textul');
    };
    cAudit.appendChild(taAudit); cAudit.appendChild(bAudit); cAudit.appendChild(_cardFisierExtragere('Extrage din audit energetic', taAudit, bAudit, res)); wrap.appendChild(cAudit);
    // Expertiza tehnica — NOU (nu exista deloc inainte, cerere explicita Florin). Utila mai ales la
    // DALI (constructie existenta/interventie) — clasa de risc seismic + categoria de importanta +
    // concluziile/solutiile de interventie recomandate de expert alimenteaza direct anexele DALI/SF.
    var cExp = card('5 · Expertiza tehnică (text)', 'Lipește textul (sau încarcă PDF-ul expertizei tehnice). Extrage clasa de risc seismic, categoria de importanță, sistemul structural, degradările constatate și concluziile/recomandările expertului. NU inventează concluzii care nu apar în text — dacă un câmp lipsește, nu apare în rezultat.');
    var taExp = el('textarea', { style: 'width:100%;height:70px;background:#0a1120;border:1px solid rgba(148,163,184,.25);border-radius:7px;color:#e6edf7;padding:8px;font-size:12px;box-sizing:border-box', placeholder: 'ex: clasa de risc seismic Rs II ... categoria de importanță C ... sistem structural cadre din beton armat ... se constată fisuri în zona nodurilor ... expertul recomandă consolidare prin cămășuire' });
    var bExp = el('button', { style: 'margin-top:8px;background:rgba(59,130,246,.2);color:#93c5fd;border:1px solid rgba(59,130,246,.4);border-radius:7px;padding:7px 13px;font-size:12px;cursor:pointer' }, 'Extrage din expertiza tehnică');
    bExp.onclick = function () {
      var o = extractExpertiza(taExp.value);
      found._expertiza_tehnica = o;
      var rez = [];
      if (o.clasa_risc_seismic) rez.push('Rs=' + o.clasa_risc_seismic);
      if (o.categorie_importanta) rez.push('categorie=' + o.categorie_importanta);
      if (o.sistem_structural) rez.push('sistem=' + o.sistem_structural);
      if (o.recomandari_expert) rez.push(o.recomandari_expert.length + ' recomandări identificate');
      if (o.degradari_constatate) rez.push(o.degradari_constatate.length + ' degradări constatate');
      res.textContent = '✓ Expertiză tehnică: ' + (rez.length ? rez.join(', ') : 'nimic recunoscut — verifică textul');
    };
    cExp.appendChild(taExp); cExp.appendChild(bExp); cExp.appendChild(_cardFisierExtragere('Extrage din expertiza tehnică', taExp, bExp, res)); wrap.appendChild(cExp);
    // JSON din pipeline DWG (scripts/dwg-to-urbanx.py — ODA+ezdxf desktop)
    // FIX BUG REAL (18 iul — Florin, cu capturi de ecran: "spui sa incarc un dwg... CUM?"): textul vechi
    // era ambiguu — parea ca aici se incarca DIRECT fisierul .dwg, cand de fapt aceasta sectiune asteapta
    // un JSON produs de un script Python rulat separat, in Terminal, pe calculator (nu in browser). Pentru
    // majoritatea utilizatorilor care au deja export DXF (ca in cazul lui Florin), sectiunea 1 e suficienta
    // si mult mai simpla — aceasta sectiune 4 e doar pt DWG-uri fara DXF exportat, cu pas tehnic separat.
    var cJson = card('6 · (Avansat, opțional) Import JSON dintr-un DWG procesat separat', 'NU se încarcă aici fișierul .dwg direct — dacă ai deja fișiere .dxf (ca la pasul 1), ignoră complet această secțiune, e mai simplu. Această secțiune e utilă DOAR dacă ai NUMAI .dwg, fără .dxf: necesită rularea unui script pe calculatorul tău (nu în browser) — deschide Terminal, rulează python3 scripts/dwg-to-urbanx.py fisierul_tau.dwg, apoi încarcă AICI fișierul urbanx_import.json rezultat (nu .dwg-ul).');
    var fJson = el('input', { type: 'file', accept: '.json', style: 'font-size:12px;color:#cbd5e1' });
    function _regimNiv(r) { r = String(r || '').toLowerCase(); var m = r.match(/p\s*\+\s*(\d)/); if (m) return 1 + (+m[1]); if (/d\s*\+\s*p/.test(r)) return 2; if (/parter|^p\b/.test(r)) return 1; return null; }
    fJson.onchange = function () { var f = fJson.files[0]; if (!f) return; var rd = new FileReader(); rd.onload = function () { try { var j = JSON.parse(rd.result); var ind = j.indicatori || {}; var got = []; if (ind.Sc) { found.Sc = +String(ind.Sc).replace(/\./g, '').replace(',', '.'); got.push('Sc=' + found.Sc); } if (ind.Sd) { found.Sd = +String(ind.Sd).replace(/\./g, '').replace(',', '.'); got.push('Sd=' + found.Sd); } var nv = _regimNiv(ind.regim); if (nv) { found.niv_supraterane = nv; got.push('niv=' + nv); } if (ind.grad_foc) { found.grad = ind.grad_foc; got.push('grad=' + ind.grad_foc); } if (j.dotari_inventar) found._dotari = j.dotari_inventar; res.textContent = '✓ JSON DWG (' + (j.sursa || '') + '): ' + (got.join(', ') || 'fără indicatori') + (j.are_model_3D ? ' · model 3D prezent (BIM)' : ''); } catch (e) { res.textContent = '⚠ JSON invalid: ' + e.message; } }; rd.readAsText(f); };
    cJson.appendChild(fJson); wrap.appendChild(cJson);
    wrap.appendChild(res);
    var bApply = el('button', { style: 'width:100%;margin-top:16px;background:#8b5cf6;color:#fff;border:none;border-radius:9px;padding:12px;font-size:13px;font-weight:700;cursor:pointer' }, '✓ Aplică datele extrase la proiect');
    bApply.onclick = function () {
      ['Steren', 'POT_max', 'CUT_max', 'H_max', 'niv_max', 'nrCU', 'judet', 'p_conv', 'adancime_fundare', 'cat_geo', 'nivel_apa', 'adancime_inghet', 'tip_teren', 'recomandare_fundare', 'Sc', 'Sd', 'niv_supraterane', 'grad'].forEach(function (k) { if (found[k] != null) { D[k] = found[k]; if (k === 'Sc' || k === 'Sd' || k === 'niv_supraterane') D['__auto_' + k] = false; } });
      if (found.adancime_fundare) D.fundare = 'directă la ' + found.adancime_fundare + ' m (studiu geotehnic' + (found.p_conv ? ', p_conv ' + found.p_conv + ' kPa' : '') + ')';
      if (found._boundary) D._parcelBoundary = found._boundary;
      if (found._audit_energetic && Object.keys(found._audit_energetic).length) D.audit_energetic = found._audit_energetic;
      if (found._expertiza_tehnica && Object.keys(found._expertiza_tehnica).length) D.expertiza_tehnica = found._expertiza_tehnica;
      var nrCampuri = Object.keys(found).filter(function (k) { return k[0] !== '_'; }).length + (found._audit_energetic ? Object.keys(found._audit_energetic).length : 0) + (found._expertiza_tehnica ? Object.keys(found._expertiza_tehnica).length : 0);
      if (G.ss) G.ss('✓ Date importate aplicate: ' + nrCampuri + ' câmpuri (le poți edita).');
      ov.remove(); if (typeof onApply === 'function') onApply(D);
    };
    wrap.appendChild(bApply);
    ov.appendChild(wrap); document.body.appendChild(ov);
  }

  // expus și pt modulul Devize & Cost Management (relevee — extragere text din PDF, aceeași
  // înfășurare pdf.js deja verificată aici) — NU se duplică wiring-ul CDN/worker în alt fișier.
  G.UXIngest = { parseDXF: parseDXF, extractCU: extractCU, extractGeo: extractGeo, extractAuditEnergetic: extractAuditEnergetic, extractExpertiza: extractExpertiza, open: open, extractTextFromFile: _extrageTextDinFisier };
})(window);
