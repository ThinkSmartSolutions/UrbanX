/* ============================================================================
 * UrbanX — SSI: UI TIP LUCRARE + VECINĂTĂȚI + IMPORT DXF (js/25-ssi-ui.js)
 * Panou aditiv, independent de fluxul existent al generatorului de documente —
 * NU modifică UXDoc.openPanel/collectOpts, ci alimentează cascada M0-M17
 * (js/25-ssi-engine*.js) prin window._SSI_PENDING, preluat automat de
 * UXDocBuilder.genereazaDosar() înainte de generarea documentelor.
 *
 * Regula critică v2.1 #8: DWG-ul dă DOAR geometrie — destinația și gradul de
 * rezistență al vecinilor rămân input uman validat, afișat explicit aici.
 * Regula #10: variantă conservatoare (grad V) implicită dacă necunoscut.
 *
 * window.SSI_UI: openPanel() · getPending() · clearPending()
 * ========================================================================== */
(function (G) {
  'use strict';
  var D = document;

  var STATE = { tip_lucrare: null, fazaDocument: 'AVIZ', vecinatati: [], geometrie_teren: null, elemente_structurale: [], pendingDxf: null, modFinal: false, normativeConfirmate: false, cladiriPropuse: [], tipuriCladiri: {}, relevee: {}, materialeExtrase: [], camereExtrase: [], usiExtrase: [], cartusExtras: {}, planSituatieInfo: null, distantaIsuKm: null, inaltimiDetectate: null, atex: { are: false, gaze: '', vapori: '', pulberi: '', frecventa: 'ocazionala' } };
  var TIPURI_ACOPERIS = { plat: 'Terasă/plat', sarpanta_doua_ape: 'Șarpantă 2 ape', sarpanta_patru_ape: 'Șarpantă 4 ape' };

  var DESTINATII = ['locuinta', 'birou', 'comert', 'depozit', 'hala_productie', 'statie_transformare', 'skid_gpl', 'altele', 'fara_constructie', 'strada_drum_public'];
  // Vecinătăți fără construcție reală (teren liber sau limită spre stradă) — nu se aplică distanța minimă
  // între construcții (Tabelul 4/145), pentru că nu există nicio construcție de protejat pe acea latură.
  var FARA_VECIN_CONSTRUIT = { fara_constructie: 1, strada_drum_public: 1 };
  var DESTINATII_LABEL = {
    fara_constructie: '🟩 fără construcție (teren liber)', strada_drum_public: '🛣️ stradă / drum public'
  };
  var GRADE = ['I', 'II', 'III', 'IV', 'V'];

  function _style() {
    if (D.getElementById('ssi-ui-style')) return;
    var s = D.createElement('style'); s.id = 'ssi-ui-style';
    s.textContent = [
      '#ssi-ui-modal{position:fixed;inset:0;z-index:9500;display:none;align-items:center;justify-content:center;background:rgba(6,10,20,.72);backdrop-filter:blur(4px)}',
      '#ssi-ui-modal.open{display:flex}',
      '.ssiui-box{width:min(900px,94vw);max-height:88vh;overflow-y:auto;background:#0b1424;border:1px solid rgba(239,68,68,.4);border-radius:14px;padding:20px 22px;color:#e6edf7;font-family:system-ui,sans-serif;box-shadow:0 20px 60px rgba(0,0,0,.6)}',
      '.ssiui-h{font-size:16px;font-weight:800;color:#f87171;margin-bottom:4px}',
      '.ssiui-sub{font-size:11px;color:#94a3b8;margin-bottom:14px}',
      '.ssiui-lbl{font-size:11px;color:#cbd5e1;font-weight:700;margin:10px 0 4px;text-transform:uppercase;letter-spacing:.04em}',
      '.ssiui-sel,.ssiui-inp{width:100%;background:#0f1a2e;border:1px solid rgba(255,255,255,.14);color:#e6edf7;border-radius:7px;padding:7px 9px;font-size:13px}',
      '.ssiui-row{display:grid;grid-template-columns:1.4fr 1fr .7fr 1fr .8fr auto;gap:6px;align-items:end;margin-bottom:8px;padding:8px;background:rgba(255,255,255,.03);border-radius:8px}',
      '.ssiui-btn{background:rgba(239,68,68,.18);border:1px solid rgba(239,68,68,.4);color:#fca5a5;border-radius:7px;padding:8px 14px;cursor:pointer;font-size:12px;font-weight:700}',
      '.ssiui-btn.pri{background:rgba(34,197,94,.2);border-color:rgba(34,197,94,.45);color:#86efac}',
      '.ssiui-btn.sec{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.15);color:#cbd5e1}',
      '.ssiui-foot{display:flex;justify-content:space-between;margin-top:16px;gap:8px}',
      '.ssiui-note{font-size:10px;color:#fbbf24;background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.25);border-radius:7px;padding:8px 10px;margin:8px 0}'
    ].join('');
    D.head.appendChild(s);
  }

  function _optTip() {
    var T = (G.SSI_ENGINE && G.SSI_ENGINE.TIPURI_LUCRARE) || {};
    return Object.keys(T).map(function (k) { return '<option value="' + k + '"' + (STATE.tip_lucrare === k ? ' selected' : '') + '>' + T[k].label + '</option>'; }).join('');
  }

  function _sursaLabel(v) {
    if (v.sursa_distanta === 'harta_osm') return '📍 din hartă (OSM)';
    if (v.sursa_distanta === 'dwg') return '📐 din DXF';
    return '✏️ manual';
  }

  function _rowVecinatate(v, idx) {
    v = v || {};
    var faraVecin = FARA_VECIN_CONSTRUIT[v.destinatie_declarata];
    var estimatNeconfirmat = !faraVecin && v.sursa_clasificare === 'estimare_conservatoare_neconfirmata' && !v.confirmat;
    var optDestinatie = '<select class="ssiui-sel" onchange="SSI_UI._set(' + idx + ',\'destinatie_declarata\',this.value)">' +
      DESTINATII.map(function (d) { return '<option value="' + d + '"' + (v.destinatie_declarata === d ? ' selected' : '') + '>' + (DESTINATII_LABEL[d] || d.replace(/_/g, ' ')) + '</option>'; }).join('') + '</select>';
    if (faraVecin) {
      // Nu există construcție vecină pe această latură (teren liber sau limită spre stradă/drum public) —
      // Tabelul 4/145 (distanțe MINIME ÎNTRE CONSTRUCȚII) nu se aplică: nu cerem grad/perete CF/distanță,
      // nu marcăm ca „estimare neconfirmată" (nu e nimic de confirmat).
      return '<div class="ssiui-row" data-idx="' + idx + '" style="grid-template-columns:1.4fr 2.4fr auto">' +
        '<div><div class="ssiui-lbl">Destinație vecin</div>' + optDestinatie + '</div>' +
        '<div style="font-size:10px;color:#6ee7b7;align-self:end;padding-bottom:8px">✓ Nu se aplică distanța minimă (Tabelul 4/145) — nu există construcție de protejat pe această latură.</div>' +
        '<button class="ssiui-btn sec" onclick="SSI_UI._remove(' + idx + ')">✕</button>' +
        '</div>';
    }
    return '<div class="ssiui-row" data-idx="' + idx + '"' + (estimatNeconfirmat ? ' style="border:1px solid rgba(251,191,36,.4)"' : '') + '>' +
      '<div><div class="ssiui-lbl">Destinație vecin</div>' + optDestinatie + '</div>' +
      '<div><div class="ssiui-lbl">Grad rezistență</div><select class="ssiui-sel" onchange="SSI_UI._set(' + idx + ',\'grad_rezistenta_estimat\',this.value)">' +
      GRADE.map(function (g) { return '<option value="' + g + '"' + (v.grad_rezistenta_estimat === g ? ' selected' : '') + '>' + g + (g === 'V' ? ' (conservator)' : '') + '</option>'; }).join('') + '</select></div>' +
      '<div><div class="ssiui-lbl">Perete CF</div><select class="ssiui-sel" onchange="SSI_UI._set(' + idx + ',\'perete_CF_pe_fatada_comuna\',this.value===\'da\')"><option value="nu"' + (!v.perete_CF_pe_fatada_comuna ? ' selected' : '') + '>nu</option><option value="da"' + (v.perete_CF_pe_fatada_comuna ? ' selected' : '') + '>da</option></select></div>' +
      '<div><div class="ssiui-lbl">Distanță reală (m)</div><input class="ssiui-inp" type="number" step="0.1" value="' + (v.distanta_masurata_m != null ? v.distanta_masurata_m : '') + '" onchange="SSI_UI._set(' + idx + ',\'distanta_masurata_m\',parseFloat(this.value)||null)"></div>' +
      '<div style="font-size:9px;color:#64748b;line-height:1.3">' + _sursaLabel(v) + (v.detaliu_sursa ? '<br><span title="' + esc(v.detaliu_sursa) + '" style="cursor:help">ⓘ detaliu</span>' : '') + '</div>' +
      '<button class="ssiui-btn sec" onclick="SSI_UI._remove(' + idx + ')">✕</button>' +
      (v.cf_numar ? '<div style="grid-column:1/-1;font-size:10px;color:#6ee7b7;margin-top:-4px">📋 identificare reală din ridicarea topografică: <b>CF ' + esc(v.cf_numar) + '</b>' + (v.identificare_text && v.identificare_text !== ('CF ' + v.cf_numar) && !/^C\.?F\.?/i.test(v.identificare_text) ? ' — ' + esc(v.identificare_text) : '') + '</div>' : '') +
      (estimatNeconfirmat ? '<label style="grid-column:1/-1;display:flex;gap:6px;align-items:center;font-size:10px;color:#fbbf24;margin-top:-4px">' +
        '<input type="checkbox" onchange="SSI_UI._confirmaVecinatate(' + idx + ', this.checked)"> Estimare conservatoare neconfirmată (grad V, risc mare) — bifează după ce verifici/corectezi (necesar pentru scenariul FINAL)</label>' : '') +
      '</div>';
  }

  // Sinteza cladirilor detectate automat din planul de situatie (layerul "constructie propusa"
  // mapat de utilizator) — grupate pe amprenta la sol (Sc), cu Sd/POT/CUT reale citite din
  // adnotarile proiectantului in desen, NU recalculate. Denumirea tipului (individuala/duplex/etc.)
  // se da o singura data PE GRUP, nu per cladire (60+ cladiri -> 2-3 click-uri, nu 60+).
  function renderCladiriDetectate() {
    if (!STATE.cladiriPropuse.length) return '';
    var grupuri = _grupeazaCladiri(STATE.cladiriPropuse);
    var totalSc = STATE.cladiriPropuse.reduce(function (s, c) { return s + (c.urbanism_adnotat && c.urbanism_adnotat.sc_mp != null ? c.urbanism_adnotat.sc_mp : c.arie_mp); }, 0);
    var totalSd = STATE.cladiriPropuse.reduce(function (s, c) { return s + (c.urbanism_adnotat && c.urbanism_adnotat.sd_mp != null ? c.urbanism_adnotat.sd_mp : 0); }, 0);
    var teren = STATE.geometrie_teren && STATE.geometrie_teren.limita_proprietate && STATE.geometrie_teren.limita_proprietate.arie_mp;
    var nrDist = (STATE.geometrie_teren && STATE.geometrie_teren.distante_intre_cladiri) ? STATE.geometrie_teren.distante_intre_cladiri.length : 0;
    return '<div class="ssiui-lbl" style="margin-top:14px">Clădiri proprii detectate din plan (' + STATE.cladiriPropuse.length + ')</div>' +
      '<div class="ssiui-note" style="border-color:rgba(52,211,153,.4);background:rgba(52,211,153,.08);color:#6ee7b7">' +
      STATE.cladiriPropuse.length + ' amprente de clădire găsite pe layerul mapat mai sus, grupate în ' + grupuri.length + ' tip/tipuri după suprafața construită (Sc). ' +
      'Total Sc≈' + Math.round(totalSc) + ' mp' + (totalSd ? ', Sd≈' + Math.round(totalSd) + ' mp' : '') +
      (teren ? ', teren≈' + Math.round(teren) + ' mp → POT ansamblu≈' + (100 * totalSc / teren).toFixed(1) + '%' + (totalSd ? ', CUT ansamblu≈' + (totalSd / teren).toFixed(2) : '') : '') +
      (nrDist ? '. ' + nrDist + ' perechi de distanțe între clădiri calculate (Tabelul 4/145).' : '') + '</div>' +
      grupuri.map(function (g) {
        return '<div class="ssiui-row" style="grid-template-columns:1fr 2fr">' +
          '<div style="font-size:11px;color:#94a3b8;align-self:center">' + g.n + ' clădiri · Sc=' + g.sc_mp + ' mp</div>' +
          '<input class="ssiui-inp" value="' + esc(STATE.tipuriCladiri[g.cheie] || '') + '" placeholder="ex. Locuință individuală" onchange="SSI_UI._setTipCladire(\'' + g.cheie + '\', this.value)">' +
          '</div>';
      }).join('') + renderRelevee();
  }

  // v5.0 — Motor relevee: planul de situație dă Sc/Sd/regim ca text, NU volumul real (nu spune
  // nimic despre panta/forma acoperișului sau dacă podul e amenajabil) — volumul cere date dintr-un
  // releveu (plan+fațadă/secțiune), o singură dată PER TIP de clădire (nu per clădire individuală).
  // Daca nu se completeaza, volumul ramane necalculat si marcat explicit, nu se presupune Sc×3m.
  function _grupeazaPeTipReleveu(cladiri) {
    var grupuri = {};
    (cladiri || []).forEach(function (c) {
      var ua = c.urbanism_adnotat || {};
      var sc = ua.sc_mp != null ? ua.sc_mp : c.arie_mp;
      var cheie = G.SSI_RELEVEE ? G.SSI_RELEVEE.cheieTipReleveu(ua.regim, sc) : ((ua.regim || '?') + '_' + sc);
      if (!grupuri[cheie]) grupuri[cheie] = { cheie: cheie, regim: ua.regim || '—', sc_mp: sc, n: 0 };
      grupuri[cheie].n++;
    });
    return Object.keys(grupuri).map(function (k) { return grupuri[k]; }).sort(function (a, b) { return b.n - a.n; });
  }
  function renderRelevee() {
    if (!STATE.cladiriPropuse.length) return '';
    var tipuri = _grupeazaPeTipReleveu(STATE.cladiriPropuse);
    return '<div class="ssiui-lbl" style="margin-top:14px">Relevee per tip de clădire (volum real — opțional, dar necesar pt. volum/sarcină termică)</div>' +
      '<div class="ssiui-note">Planul de situație dă Sc/Sd/regim ca text, nu volumul real (nu spune nimic despre panta/forma acoperișului sau dacă podul e amenajabil). <b>Încarcă fișierul (DXF/PDF)</b> cu fațada/secțiunea — dacă are cote de nivel scrise ca text în DXF, H cornișă/H coamă se pre-completează automat; dacă nu, sau ai un PDF, completează cele 3 câmpuri manual, o singură dată per tip (se aplică pe toate amprentele identice din plan). Dacă lași necompletat, volumul rămâne necalculat (nu se presupune Sc×3m).</div>' +
      tipuri.map(function (t) {
        var r = STATE.relevee[t.cheie] || {};
        var ePlat = r.tip_acoperis === 'plat';
        return '<div class="ssiui-row" style="grid-template-columns:1.1fr .8fr .8fr 1fr .8fr auto">' +
          '<div style="font-size:11px;color:#94a3b8;align-self:center">' + t.n + ' clădiri · ' + esc(t.regim) + ', Sc=' + t.sc_mp + ' mp</div>' +
          '<div><div class="ssiui-lbl">H cornișă (m)</div><input class="ssiui-inp" type="number" step="0.1" value="' + (r.inaltime_cornisa != null ? r.inaltime_cornisa : '') + '" onchange="SSI_UI._setRelevee(\'' + t.cheie + '\',\'inaltime_cornisa\',parseFloat(this.value)||null)"></div>' +
          (ePlat
            ? '<div><div class="ssiui-lbl">H coamă (m)</div><input class="ssiui-inp" type="text" value="nu se aplică" disabled title="Acoperiș plat/terasă — nu are coamă, nu e nevoie de această valoare." style="opacity:.5"></div>'
            : '<div><div class="ssiui-lbl">H coamă (m)</div><input class="ssiui-inp" type="number" step="0.1" value="' + (r.inaltime_coama != null ? r.inaltime_coama : '') + '" onchange="SSI_UI._setRelevee(\'' + t.cheie + '\',\'inaltime_coama\',parseFloat(this.value)||null)"></div>') +
          '<div><div class="ssiui-lbl">Tip acoperiș</div><select class="ssiui-sel" onchange="SSI_UI._setRelevee(\'' + t.cheie + '\',\'tip_acoperis\',this.value)"><option value="">— selectează —</option>' +
          Object.keys(TIPURI_ACOPERIS).map(function (k) { return '<option value="' + k + '"' + (r.tip_acoperis === k ? ' selected' : '') + '>' + TIPURI_ACOPERIS[k] + '</option>'; }).join('') + '</select></div>' +
          '<label style="display:flex;gap:4px;align-items:center;font-size:10px;color:#cbd5e1;align-self:end;padding-bottom:8px"><input type="checkbox"' + (r.poduri_amenajabile ? ' checked' : '') + ' onchange="SSI_UI._setRelevee(\'' + t.cheie + '\',\'poduri_amenajabile\',this.checked)"' + (ePlat ? ' disabled title="Acoperiș plat — nu are pod"' : '') + '> pod amenajabil</label>' +
          '<div></div>' +
          '<div style="grid-column:1/-1;display:flex;flex-direction:column;gap:6px;margin-top:2px">' +
          '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">' +
          '<input type="file" accept=".dxf,.pdf" multiple class="ssiui-inp" style="font-size:10px;flex:1;min-width:180px" onchange="SSI_UI._onFileRelevee(\'' + t.cheie + '\', this.files)">' +
          '<span style="font-size:9.5px;color:#94a3b8">Formate acceptate: <b>.dxf</b> (export ASCII din CAD) și <b>.pdf</b> (plan/secțiune/fațadă, cu text selectabil — nu scanat). Poți selecta mai multe fișiere deodată, sau le încarci pe rând — toate se adaugă la listă, niciunul nu se pierde.</span>' +
          '</div>' +
          (r.fisiere && r.fisiere.length
            ? '<div style="font-size:10px;color:#94a3b8;font-weight:700">' + r.fisiere.length + ' fișier(e) încărcat(e) pentru acest tip:</div>' +
              '<div style="display:flex;flex-direction:column;gap:3px">' + r.fisiere.map(function (f, idx) {
                return '<div style="display:flex;gap:6px;align-items:flex-start;font-size:10px;background:#0f1a2e;border:1px solid rgba(255,255,255,.08);border-radius:6px;padding:5px 8px">' +
                  '<span>' + (f.tip === 'DXF' ? '📐' : '📄') + '</span>' +
                  '<span style="flex:1"><b style="color:#e6edf7">' + esc(f.nume) + '</b> <span style="color:#64748b">(' + f.tip + ', ' + f.marime + ')</span><br>' +
                  '<span style="color:#6ee7b7">' + esc(f.continut.join(' · ')) + '</span></span>' +
                  '<span style="cursor:pointer;color:#f87171" title="Elimină fișierul din listă (nu retrage datele deja extrase)" onclick="SSI_UI._eliminaFisierRelevee(\'' + t.cheie + '\',' + idx + ')">✕</span>' +
                  '</div>';
              }).join('') + '</div>'
            : '<div style="font-size:10px;color:#64748b">Niciun fișier încărcat încă pentru acest tip.</div>') +
          '</div>' +
          '</div>';
      }).join('');
  }

  function render() {
    var el = D.getElementById('ssi-ui-body'); if (!el) return;
    el.innerHTML =
      '<div class="ssiui-lbl">1.0 — Tip de lucrare (obligatoriu, decide tabelele P118-1/2025 aplicabile)</div>' +
      '<select class="ssiui-sel"' + (STATE.tip_lucrare ? '' : ' style="border:1px solid #f87171"') + ' onchange="SSI_UI._setTip(this.value)"><option value="">— selectează —</option>' + _optTip() + '</select>' +
      (STATE.tip_lucrare ? '' : '<div class="ssiui-note" style="border-color:#f87171;background:rgba(248,113,113,.1);color:#fca5a5">⚠ Fără această selecție, scenariul de securitate la incendiu se generează ca document GENERIC (3 paragrafe, fără cascada M0-M17, fără sarcina termică pe încăperi, fără timpii de intervenție) — indiferent câte alte câmpuri completezi mai jos (vecinătăți, relevee, distanță ISU etc.). Selectează tipul de lucrare ÎNAINTE de a genera documentele finale.</div>') +
      '<div class="ssiui-lbl" style="margin-top:14px">0.1 — Faza documentului</div>' +
      '<select class="ssiui-sel" onchange="SSI_UI._setFaza(this.value)">' +
      '<option value="AVIZ"' + (STATE.fazaDocument !== 'AUTORIZARE' ? ' selected' : '') + '>Aviz ISU (fază de proiectare, D.T.A.C.) — soluții propuse</option>' +
      '<option value="AUTORIZARE"' + (STATE.fazaDocument === 'AUTORIZARE' ? ' selected' : '') + '>Autorizație de securitate la incendiu (recepție/as-built)</option>' +
      '</select>' +
      '<div class="ssiui-note">' + (STATE.fazaDocument === 'AUTORIZARE'
        ? 'Documentul va avea titlul „DOCUMENTAȚIE TEHNICĂ PENTRU OBȚINEREA AUTORIZAȚIEI DE SECURITATE LA INCENDIU" și include o anexă de verificare funcțională la recepție (Legea 307/2006, art. 30) — restul secțiunilor rămân aceeași fundamentare tehnică, folosită acum pentru atestarea execuției conforme.'
        : 'Documentul va avea titlul „SCENARIU DE SECURITATE LA INCENDIU" (fază de proiectare/D.T.A.C.) — comportamentul implicit, neschimbat.') + '</div>' +
      '<div class="ssiui-lbl" style="margin-top:18px">Import geometrie din DXF (opțional — export din CAD, format ASCII)</div>' +
      '<input type="file" accept=".dxf" class="ssiui-inp" onchange="SSI_UI._onFile(this.files[0])">' +
      (STATE.planSituatieInfo
        ? (function () {
          // FIX BUG REAL (Florin, 17 iul — a incarcat .dwg, motorul l-a respins CORECT cu mesaj clar,
          // dar starea se afisa mereu in verde #6ee7b7 (culoare de succes), inclusiv pt un mesaj de
          // eroare de forma "eroare: fisier .dwg detectat...") — utilizatorul a citit rapid o linie
          // verde si a presupus ca planul a fost preluat, cand de fapt fusese respins integral.
          var eEroare = /^eroare/i.test(STATE.planSituatieInfo.stare || '');
          return '<div style="display:flex;gap:6px;align-items:flex-start;font-size:10px;background:' + (eEroare ? 'rgba(248,113,113,.08)' : '#0f1a2e') + ';border:1px solid ' + (eEroare ? '#f87171' : 'rgba(255,255,255,.08)') + ';border-radius:6px;padding:5px 8px;margin-top:6px">' +
            '<span>' + (eEroare ? '⚠️' : '📐') + '</span><span style="flex:1"><b style="color:#e6edf7">' + esc(STATE.planSituatieInfo.nume) + '</b> <span style="color:#64748b">(' + STATE.planSituatieInfo.marime + ')</span><br>' +
            '<span style="color:' + (eEroare ? '#fca5a5;font-weight:600' : '#6ee7b7') + '">' + esc(STATE.planSituatieInfo.stare) + '</span></span>' +
            '<span style="cursor:pointer;color:#f87171" title="Uită acest fișier (nu retrage datele deja aplicate)" onclick="SSI_UI._uitaPlanSituatie()">✕</span>' +
            '</div>';
        })()
        : '<div style="font-size:10px;color:#64748b;margin-top:4px">Niciun fișier încărcat încă.</div>') +
      '<div class="ssiui-note">⚠ DXF-ul dă DOAR geometrie (poligoane, distanțe măsurate) — destinația și gradul de rezistență al fiecărei vecinătăți rămân input uman validat de proiectant. Layere așteptate: LIMITA_PROPRIETATE, VECINATATI, CONSTRUCTIE_PROPUSA (sau echivalente).</div>' +
      renderMapareManuala() +
      renderCladiriDetectate() +
      '<div class="ssiui-lbl" style="margin-top:14px">3.3 — Vecinătăți (clasificare + distanțe minime, Tabelul 4/145)</div>' +
      '<div class="ssiui-note" style="border-color:rgba(52,211,153,.4);background:rgba(52,211,153,.08);color:#6ee7b7">📍 Recomandat: auto-detectează din harta platformei (clădiri OSM reale din jurul parcelei active) — se pre-completează cu estimare conservatoare (grad V, risc mare) + distanța reală calculată; tu doar confirmi sau corectezi, ca la o vizită de teren.</div>' +
      '<button class="ssiui-btn pri" onclick="SSI_UI._autoDetecteaza()" style="margin-bottom:10px">📍 Auto-detectează vecinătățile din hartă</button>' +
      STATE.vecinatati.map(function (v, i) { return _rowVecinatate(v, i); }).join('') +
      '<button class="ssiui-btn sec" onclick="SSI_UI._addVecinatate()">+ Adaugă vecinătate manual</button>' +
      '<div class="ssiui-lbl" style="margin-top:14px">3.4 — Timpi de intervenție ISU (distanța la cea mai apropiată subunitate)</div>' +
      '<div class="ssiui-note">Fără această valoare, timpul de deplasare (T3) se estimează conservator (15 min) — completează distanța reală (confirmată cu ISU județean) pentru un calcul precis al cascadei T1–T14.</div>' +
      '<div><div class="ssiui-lbl">Distanță la subunitatea ISU (km)</div><input class="ssiui-inp" type="number" step="0.1" min="0" value="' + (STATE.distantaIsuKm != null ? STATE.distantaIsuKm : '') + '" onchange="SSI_UI._setDistantaIsu(parseFloat(this.value)||null)"></div>' +
      '<div class="ssiui-lbl" style="margin-top:14px">2.1 — Sarcina termică (tabel material-cu-material)</div>' +
      '<div class="ssiui-note">' + (STATE.camereExtrase && STATE.camereExtrase.length ? STATE.camereExtrase.length + ' încăpere/încăperi calculate — descarcă tabelul complet (deschide direct în Excel/Numbers/Sheets), independent de generarea scenariului complet.' : 'Niciun tabel calculat încă. Sursa cea mai bună: <b>planul/releveul real</b> al clădirii (buton mai jos). Dacă nu ai încă un relevee, poți genera o estimare din programul funcțional STANDARD al funcțiunii proiectului curent (buton „Generează camere standard" — arată explicit ce funcțiune s-a folosit, ca să poți verifica dacă e cea corectă).') + '</div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">' +
      '<button class="ssiui-btn sec" onclick="SSI_UI._deschideRelevee()">📐 Deschide Relevee (plan/secțiuni/fațade pe clădire)</button>' +
      '<button class="ssiui-btn sec" onclick="SSI_UI._genereazaCamereStandardAcum()">⚙ Generează camere standard din program funcțional</button>' +
      '</div>' +
      '<button class="ssiui-btn sec" onclick="SSI_UI._exportSarcinaTermicaCSV()">⬇ Descarcă tabel sarcină termică (CSV/Excel)</button>' +
      renderAtex() +
      '<div style="margin-top:16px;padding:10px;border-radius:8px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08)">' +
      '<label style="display:flex;gap:8px;align-items:center;font-size:12px;color:#e6edf7;cursor:pointer">' +
      '<input type="checkbox"' + (STATE.modFinal ? ' checked' : '') + ' onchange="SSI_UI._setModFinal(this.checked)"> ' +
      '<b>🔒 Generează ca FINAL</b> (pentru depunere la ISU — necesită toate vecinătățile confirmate; altfel se generează DRAFT, mereu disponibil)</label>' +
      '<label style="display:flex;gap:8px;align-items:center;font-size:11px;color:#cbd5e1;cursor:pointer;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,.06)">' +
      '<input type="checkbox"' + (STATE.normativeConfirmate ? ' checked' : '') + ' onchange="SSI_UI._setNormativeConfirmate(this.checked)"> ' +
      'Confirm, ca proiectant/inginer atestat, că am verificat pe text oficial (M.Of. 204 bis/2025) tabelele P118-1/2025 folosite în acest scenariu — asum răspunderea profesională pentru sursele normative citate.</label></div>';
  }

  function open() {
    _style();
    if (!D.getElementById('ssi-ui-modal')) {
      var m = D.createElement('div'); m.id = 'ssi-ui-modal';
      m.innerHTML = '<div class="ssiui-box">' +
        '<div class="ssiui-h">🔥 Scenariu SSI — Tip lucrare & Vecinătăți</div>' +
        '<div class="ssiui-sub">Ord. MAI 180/2022, Anexa 5 · P118-1/2025 — se completează înainte de generarea Scenariului de Securitate la Incendiu</div>' +
        '<div id="ssi-ui-body"></div>' +
        '<div class="ssiui-foot"><button class="ssiui-btn sec" onclick="SSI_UI._close()">Renunță</button><button class="ssiui-btn pri" onclick="SSI_UI._save()">Salvează pentru scenariu</button></div>' +
        '</div>';
      D.body.appendChild(m);
    }
    render();
    D.getElementById('ssi-ui-modal').classList.add('open');
  }
  function close() { var m = D.getElementById('ssi-ui-modal'); if (m) m.classList.remove('open'); }

  // Grupeaza cladirile detectate dupa amprenta la sol (Sc din adnotarea "Locuinta", daca exista,
  // altfel aria poligonului rotunjita) — un ansamblu tipic are 2-3 amprente distincte (ex. individuala
  // vs duplex/cuplata), nu o denumire per cladire. Proiectantul da numele REAL clusterului o singura
  // data (2 click-uri, nu 60+), nu clasifica fiecare cladire in parte.
  function _cheieCluster(c) {
    var sc = c.urbanism_adnotat && c.urbanism_adnotat.sc_mp != null ? c.urbanism_adnotat.sc_mp : c.arie_mp;
    return 'Sc_' + sc;
  }
  function _grupeazaCladiri(cladiri) {
    var grupuri = {};
    (cladiri || []).forEach(function (c) {
      var k = _cheieCluster(c);
      if (!grupuri[k]) grupuri[k] = { cheie: k, sc_mp: (c.urbanism_adnotat && c.urbanism_adnotat.sc_mp != null) ? c.urbanism_adnotat.sc_mp : c.arie_mp, n: 0 };
      grupuri[k].n++;
    });
    return Object.keys(grupuri).map(function (k) { return grupuri[k]; }).sort(function (a, b) { return b.n - a.n; });
  }

  function _aplicaGeometrie(parsed, mapareFinala) {
    var geo = G.SSI_DWG_IMPORT.extractGeometrie(parsed, mapareFinala);
    STATE.geometrie_teren = geo;
    (geo.vecinatati_geometrie || []).forEach(function (vg) {
      // CF/proprietar reale (ex. ridicare topografica Eterra) — identificare REALA a vecinului,
      // nu doar geometrie anonima; destinatia/gradul raman tot input uman (CF-ul nu spune ce fel
      // de cladire e, doar cine e proprietarul terenului).
      STATE.vecinatati.push({ id: vg.id, distanta_masurata_m: vg.distanta_min_la_propriu_m, sursa_distanta: 'dwg', destinatie_declarata: null, grad_rezistenta_estimat: null, perete_CF_pe_fatada_comuna: false, cf_numar: vg.cf_numar || null, identificare_text: vg.identificare_text || null });
    });
    STATE.cladiriPropuse = geo.cladiri_propuse || [];
    STATE.tipuriCladiri = {};
    _grupeazaCladiri(STATE.cladiriPropuse).forEach(function (g, idx) {
      STATE.tipuriCladiri[g.cheie] = 'Tip ' + String.fromCharCode(65 + idx) + ' (Sc=' + g.sc_mp + ' mp)';
    });
    STATE.pendingDxf = null;
    var msgCladiri = STATE.cladiriPropuse.length > 1 ? (' · ' + STATE.cladiriPropuse.length + ' clădiri proprii detectate în plan (denumește tipurile mai jos)') : '';
    if (STATE.planSituatieInfo) STATE.planSituatieInfo.stare = 'confirmat: ' + parsed.nrEntitati + ' entități, ' + (geo.vecinatati_geometrie || []).length + ' vecinătăți geometrice' + msgCladiri;
    render();
    if (G.ss) G.ss('DXF importat: ' + parsed.nrEntitati + ' entități, ' + (geo.vecinatati_geometrie || []).length + ' vecinătăți geometrice detectate' + msgCladiri + ' — completează clasificarea manual unde e cazul.');
  }

  var CATEGORII_LABEL = {
    limita_proprietate: 'Limită de proprietate', vecinatati: 'Vecinătăți (clădiri învecinate)',
    constructie_existenta: 'Construcție existentă', constructie_propusa: 'Construcție propusă',
    acces_auto_speciale: 'Acces autospeciale', cote_nivel: 'Cote de nivel', aliniament: 'Linie de aliniament'
  };

  // Descrierea "in cuvinte", pt utilizatori care nu stiu CAD — nu trebuie sa inteleaga ce e un
  // "layer" sau denumirile ArchiCAD (ex. "Pen_No"), doar sa recunoasca forma continutului.
  var CATEGORII_AJUTOR = {
    limita_proprietate: 'linia care marchează marginea terenului tău (parcelă/teren) — de obicei UN singur contur mare, care înconjoară tot planul.',
    vecinatati: 'conturul clădirilor de pe terenurile ALĂTURATE (ale vecinilor), dacă apar desenate în plan.',
    constructie_existenta: 'conturul unei clădiri care EXISTĂ deja pe teren (dacă e cazul).',
    constructie_propusa: 'conturul clădirii/clădirilor pe care le construiești (amprenta la sol a casei/caselor din proiect) — de obicei MAI MULTE contururi mici, de mărimea unei case (zeci-sute de mp).',
    acces_auto_speciale: 'drumul/aleea pe care ar intra o mașină de pompieri, dacă e desenat distinct.',
    cote_nivel: 'liniile de nivel/cotă ale terenului (dacă sunt desenate).',
    aliniament: 'linia frontului stradal față de care se măsoară retragerea minimă impusă de PUG/RLU (o linie/polilinie DESCHISĂ, diferită de limita de proprietate) — dacă e desenată distinct.'
  };

  // Layerele NU sunt standardizate in Romania (multe CAD-uri, ex. ArchiCAD, au denumiri proprii de tip
  // "055_EXT_Gard" sau "131_REF_Topo") — cand maparea automata esueaza, cerem mapare manuala explicita
  // (regula B.2/B.3 addendum v2.1), NU presupunem o corespondenta. Pentru utilizatorii care nu stiu
  // CAD, aratam langa fiecare layer CATE forme inchise are si CE MARIME au (nu doar numele criptic) —
  // asa poti recunoaste "conturul casei" dupa forma (zeci-sute de poligoane mici) fara sa stii ce
  // inseamna "Pen_No" in ArchiCAD.
  function _hintLayer(stats, l) {
    var s = stats && stats[l];
    if (!s || !s.n) return '';
    var arieTxt = s.arieMin === s.arieMax ? ('~' + s.arieMed + ' mp') : (s.arieMin + '–' + s.arieMax + ' mp');
    var subsetTxt = (s.nInRangeCladire > 0 && s.nInRangeCladire < s.n) ? (', din care ' + s.nInRangeCladire + ' de mărimea unei case') : '';
    return ' — ' + s.n + ' ' + (s.n === 1 ? 'formă' : 'forme') + ' (' + arieTxt + subsetTxt + ')';
  }
  function _rowMapareLayer(categorie, layereDisponibile, valoareCurenta, stats) {
    var opts = '<option value="">— niciun layer / nu există —</option>' +
      layereDisponibile.map(function (l) { return '<option value="' + esc(l) + '"' + (l === valoareCurenta ? ' selected' : '') + '>' + esc(l) + esc(_hintLayer(stats, l)) + '</option>'; }).join('');
    return '<div class="ssiui-row" style="grid-template-columns:1fr 2fr">' +
      '<div><div class="ssiui-lbl" style="margin:0">' + esc(CATEGORII_LABEL[categorie] || categorie) + '</div>' +
      '<div style="font-size:10px;color:#94a3b8;margin-top:2px;max-width:220px">' + esc(CATEGORII_AJUTOR[categorie] || '') + '</div></div>' +
      '<select class="ssiui-sel" onchange="SSI_UI._setMapareLayer(\'' + categorie + '\', this.value)">' + opts + '</select>' +
      '</div>';
  }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  // ADAUGAT (18 iul, cerere Florin: "vreau sa am o sectiune de unde sa fac download la tabelul de
  // sarcina termica.... excel. Nu doar in scenariu, uneori am nevoie doar de acel tabel"). Tipar CSV
  // identic cu cel deja folosit la deviz (js/urbanx-deviz-engine.js, _csvCell/BOM/Blob), aceeasi
  // structura per-material ca in scenariul SSI (2.1, D._camere[].detaliu_materiale) — nu o lista noua,
  // ci exportul aceluiasi tabel deja calculat. Replica formatul real "Sarcina termica Fruntiseni.xlsx"
  // (Incapere/tip/denumire/cantitate/greutate/Mi/Qi/Sq/As/qs/risc).
  function _csvCell(s) { s = String(s == null ? '' : s); return /[;"\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
  function _csvSarcinaTermica(camere) {
    var linii = ['Încăpere;Material;Cantitate;Unitate;Greutate unitară (kg);Total Mi (kg);Putere calorică Qi (MJ/kg);Sarcină termică Ii (MJ);Arie As (m²);Densitate sarcină termică qs (MJ/m²);Încadrare risc'];
    (camere || []).forEach(function (c) {
      var materiale = c.detaliu_materiale || [];
      if (!materiale.length) {
        linii.push([_csvCell(c.nume), '(fără detaliu material)', '', '', '', '', '', '', c.arie_mp || '', c.densitate_mj_mp || '', _csvCell(c.risc_incadrare || '')].join(';'));
        return;
      }
      materiale.forEach(function (m) {
        linii.push([_csvCell(c.nume), _csvCell(m.nume), m.cantitate, _csvCell(m.unitate), m.greutate_kg, m.total_kg, m.putere_calorica_mj_kg, m.sarcina_termica_mj, c.arie_mp || '', c.densitate_mj_mp || '', _csvCell(c.risc_incadrare || '')].join(';'));
      });
      linii.push([_csvCell(c.nume + ' — TOTAL'), '', '', '', '', '', '', c.sarcina_termica_mj, c.arie_mp || '', c.densitate_mj_mp || '', _csvCell(c.risc_incadrare || '')].join(';'));
    });
    return '﻿' + linii.join('\r\n');
  }
  function _exportSarcinaTermicaCSV() {
    var camere = STATE.camereExtrase || [];
    if (!camere.length) { if (G.ss) G.ss('⚠ Niciun tabel de sarcină termică calculat încă — încarcă un plan/releveu la secțiunea de relevee sau generează camere standard din program funcțional.'); return; }
    try {
      var blob = new Blob([_csvSarcinaTermica(camere)], { type: 'text/csv;charset=utf-8' });
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'Sarcina_termica.csv';
      document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
    } catch (e) { if (G.ss) G.ss('⚠ Eroare la export: ' + e.message); }
  }
  function _listaDinText(t) { return String(t || '').split(',').map(function (x) { return x.trim(); }).filter(Boolean); }

  // Ghiceste layerul cel mai probabil pt "constructie propusa": cel cu cele mai multe forme in
  // intervalul de marime plauzibil pt o cladire (20-500mp) — doar o PRESELECTIE, editabila liber;
  // nu se aplica automat fara confirmarea explicita a utilizatorului (butonul Confirmă ramane necesar).
  function _ghicesteConstructiePropusa(stats) {
    // Ordonam dupa CATE poligoane individuale au marimea unei cladiri (nInRangeCladire), NU dupa
    // media pe layer — media e distorsionata cand layerul mixeaza detalii mici cu elemente mari
    // de sit pe langa amprentele reale (verificat pe fisier real: media trecea layerul cu adevarat
    // relevant in afara filtrului, in timp ce un layer de limite de loturi, uniform ca marime, "castiga").
    var candidati = Object.keys(stats || {}).map(function (l) { return { l: l, s: stats[l] }; })
      .filter(function (x) { return x.s.nInRangeCladire > 0; })
      .sort(function (a, b) { return b.s.nInRangeCladire - a.s.nInRangeCladire; });
    return candidati.length ? candidati[0].l : null;
  }

  // ADAUGAT (18 iul, cerere Florin — motorul M13 ATEX (js/25-ssi-atex.js) exista si functioneaza corect,
  // dar D._spatii_atex nu avea NICIUN drum de intrare din UI (doar implicit auto pt functiunea 'skid') —
  // pt orice alt proiect cu substante reale (hala industriala cu solvent, agricol cu siloz de faina etc.)
  // utilizatorul nu putea declara nimic, desi motorul de analiza le-ar fi procesat corect daca ar fi primit
  // date. Declaratie SIMPLA (o singura zona "ansamblul constructiei"), nu un builder complet per incapere —
  // suficient pt marea majoritate a proiectelor reale, unde substantele periculoase sunt fie absente, fie
  // concentrate intr-un singur spatiu tehnic declarat global (centrala GPL, depozit solventi etc.).
  function renderAtex() {
    var a = STATE.atex;
    return '<div class="ssiui-lbl" style="margin-top:14px">3.5 — Substanțe cu potențial exploziv (ATEX)</div>' +
      '<label style="display:flex;gap:8px;align-items:center;font-size:12px;color:#e6edf7;cursor:pointer">' +
      '<input type="checkbox"' + (a.are ? ' checked' : '') + ' onchange="SSI_UI._setAtexAre(this.checked)"> ' +
      'Proiectul are/poate avea gaze, vapori sau pulberi inflamabile/combustibile (GPL, gaz metan, hidrogen, solvenți, benzină, făină, rumeguș, praf metalic etc.)</label>' +
      (a.are
        ? '<div style="margin-top:6px;padding:8px;border-radius:6px;background:rgba(217,119,6,.08);border:1px solid rgba(217,119,6,.3)">' +
          '<div class="ssiui-lbl">Gaze (ex: GPL, gaz metan, hidrogen)</div><input class="ssiui-inp" value="' + esc(a.gaze) + '" onchange="SSI_UI._setAtexCamp(\'gaze\',this.value)">' +
          '<div class="ssiui-lbl">Vapori inflamabili (ex: solvenți, benzină, alcool)</div><input class="ssiui-inp" value="' + esc(a.vapori) + '" onchange="SSI_UI._setAtexCamp(\'vapori\',this.value)">' +
          '<div class="ssiui-lbl">Pulberi combustibile (ex: făină, rumeguș, praf aluminiu)</div><input class="ssiui-inp" value="' + esc(a.pulberi) + '" onchange="SSI_UI._setAtexCamp(\'pulberi\',this.value)">' +
          '<div class="ssiui-lbl">Frecvența de scăpare (determină zona ATEX propusă)</div>' +
          '<select class="ssiui-sel" onchange="SSI_UI._setAtexCamp(\'frecventa\',this.value)">' +
          ['continua', 'frecventa', 'ocazionala', 'improbabila'].map(function (f) { return '<option value="' + f + '"' + (a.frecventa === f ? ' selected' : '') + '>' + f + '</option>'; }).join('') +
          '</select>' +
          '<div class="ssiui-note" style="margin-top:6px">Motorul propune o zonă ATEX DE PRINCIPIU (0/1/2 pt. gaze-vapori, 20/21/22 pt. pulberi) — extinderea geometrică exactă pe plan rămâne responsabilitatea proiectantului de specialitate ATEX.</div>' +
          '</div>'
        : '') +
      '';
  }

  function renderMapareManuala() {
    var pd = STATE.pendingDxf; if (!pd) return '';
    var stats = pd.statsLayere || {};
    return '<div class="ssiui-note" style="border-color:rgba(56,189,248,.4);background:rgba(56,189,248,.08);color:#7dd3fc">' +
      'Layerele acestui DXF (' + pd.parsed.layers.length + ' găsite) nu corespund denumirilor standard așteptate — CAD-urile (ex. ArchiCAD) au propriile convenții, deseori criptice. ' +
      'Nu trebuie să știi ce înseamnă numele — uită-te la „X forme, Y mp" de lângă fiecare opțiune și alege ce se potrivește cu descrierea de sub fiecare categorie. ' +
      'Am pre-completat un ghicit rezonabil pentru „Construcție propusă" (layerul cu cele mai multe forme de mărime unei case) — verifică-l și corectează dacă nu e cel corect, apoi apasă Confirmă.</div>' +
      Object.keys(CATEGORII_LABEL).map(function (cat) { return _rowMapareLayer(cat, pd.parsed.layers, pd.mapareCurenta[cat], stats); }).join('') +
      '<button class="ssiui-btn pri" onclick="SSI_UI._confirmaMapare()">✓ Confirmă layerele și extrage geometria</button>';
  }

  // Numele-eticheta afisate pt fiecare tip de plansa detectata (window.SSI_DWG_MULTISHEET.clasificaPlansa)
  var ETICHETA_TIP_PLANSA = {
    plan_situatie: 'Plan de situație', plan_nivel: 'Plan de nivel', fatada: 'Fațadă', sectiune: 'Secțiune',
    plan_acoperis: 'Plan acoperiș', plan_fundatii: 'Plan fundații', necunoscut: 'neclasificată'
  };
  // Construieste un "sub-parsedDXF" continand DOAR entitatile unei insule — reutilizeaza exact
  // acelasi extractGeometrie()/mapLayers() ca la un fisier cu o singura plansa, fara sa dubleze cod.
  function _subParsed(parsed, insula) {
    var layers = {}; insula.entitati.forEach(function (e) { var l = e.layer || '0'; layers[l] = (layers[l] || 0) + 1; });
    return { entities: insula.entitati, layers: Object.keys(layers), layerCounts: layers, nrEntitati: insula.entitati.length, unitateDetectata: parsed.unitateDetectata, scaraLaMetri: parsed.scaraLaMetri };
  }

  // ADAUGAT (18 iul, cerere Florin — a aratat un DWG real cu 6 planse (plan situatie + 2 fatade +
  // 2 sectiuni + 2 planuri de nivel) TOATE in acelasi fisier, cerand explicit ca platforma sa
  // recunoasca si foloseasca fiecare, nu doar planul de situatie): daca fisierul incarcat contine
  // MAI MULTE planse detectabile (js/25-ssi-dwg-multisheet.js), fiecare se proceseaza cu motorul
  // POTRIVIT tipului ei, in loc sa se trateze tot fisierul ca un singur plan de situatie (comportament
  // vechi, singurul posibil pana acum). Daca se detecteaza O SINGURA insula (fisier cu o singura
  // plansa, cazul obisnuit), comportamentul ramane EXACT cel vechi (backward-compatible).
  function _proceseazaPlanseMultiple(parsed) {
    var insule = G.SSI_DWG_MULTISHEET.detecteazaPlanse(parsed);
    if (insule.length <= 1) return null; // o singura insula -> nu e cazul multi-plansa, fallback la vechi
    // Re-separa insulele care contin de fapt MAI MULTE plansa fizice asezate compact (aceeasi
    // "pagina" de modelspace) — bug real gasit pe fisier Cresa Pogana: o insula uriasa continea
    // plan parter + fatada + sectiune + plan invelitoare deodata, clasificata gresit ca un singur tip.
    if (G.SSI_DWG_MULTISHEET.separaPlanseSuprapuse) insule = G.SSI_DWG_MULTISHEET.separaPlanseSuprapuse(insule);
    var rezumat = [];
    var gasitPlanSituatie = false;
    insule.forEach(function (insula) {
      var clasa = G.SSI_DWG_MULTISHEET.clasificaPlansa(insula);
      insula.clasificare = clasa;
      if (clasa.tip === 'plan_situatie' && !gasitPlanSituatie) {
        gasitPlanSituatie = true;
        var subParsed = _subParsed(parsed, insula);
        var mapare = G.SSI_DWG_IMPORT.mapLayers(subParsed);
        if (mapare.automata_completa) {
          var geo = G.SSI_DWG_IMPORT.extractGeometrie(subParsed, mapare);
          STATE.geometrie_teren = geo;
          rezumat.push(ETICHETA_TIP_PLANSA.plan_situatie + ': ' + (geo.cladiri_propuse.length || (geo.volum_propus ? 1 : 0)) + ' clădire/clădiri, ' + (geo.vecinatati_geometrie.length) + ' vecinătate/vecinătăți detectate din geometrie');
        } else {
          STATE.pendingDxf = { parsed: subParsed, mapareCurenta: mapare.mapare, statsLayere: G.SSI_DWG_IMPORT.analizeazaLayerePoligoane(subParsed) };
          rezumat.push(ETICHETA_TIP_PLANSA.plan_situatie + ': layere neclare — confirmă maparea mai jos');
        }
      } else if (clasa.tip === 'plan_nivel') {
        var camereNivel = G.SSI_DWG_MULTISHEET.extrageCamereDinPlansaNivel(insula, G.SSI_DWG_IMPORT);
        if (!STATE.camereExtrase) STATE.camereExtrase = [];
        camereNivel.forEach(function (c) { if (!STATE.camereExtrase.some(function (x) { return x.nume === c.nume && x.nivel === c.nivel && x.arie_mp === c.arie_mp; })) STATE.camereExtrase.push(c); });
        rezumat.push((clasa.nivel || ETICHETA_TIP_PLANSA.plan_nivel) + ': ' + camereNivel.length + ' încăpere/încăperi detectate' + (camereNivel.length ? ' (' + camereNivel.map(function (c) { return c.nume; }).join(', ') + ')' : ''));
      } else if (clasa.tip === 'fatada' || clasa.tip === 'sectiune') {
        var h = _extrageInaltimiDinDXF(_subParsed(parsed, insula));
        if (h.cornisa != null || h.coama != null) {
          STATE.inaltimiDetectate = STATE.inaltimiDetectate || {};
          if (h.cornisa != null && STATE.inaltimiDetectate.cornisa == null) STATE.inaltimiDetectate.cornisa = h.cornisa;
          if (h.coama != null && STATE.inaltimiDetectate.coama == null) STATE.inaltimiDetectate.coama = h.coama;
          rezumat.push(ETICHETA_TIP_PLANSA[clasa.tip] + ': H cornișă=' + (h.cornisa != null ? h.cornisa + 'm' : '—') + ', H coamă=' + (h.coama != null ? h.coama + 'm' : '—'));
        } else {
          rezumat.push(ETICHETA_TIP_PLANSA[clasa.tip] + ': nicio cotă de nivel găsită ca text');
        }
      } else {
        rezumat.push('Planșă neclasificată (' + insula.entitati.length + ' entități) — ignorată; adaugă un text cu titlul planșei (ex. "PLAN PARTER") pe desen pentru recunoaștere automată.');
      }
    });
    return { nrPlanse: insule.length, rezumat: rezumat, gasitPlanSituatie: gasitPlanSituatie };
  }

  async function onFile(file) {
    if (!file) return;
    STATE.planSituatieInfo = { nume: file.name, marime: _fmtKB(file.size), stare: 'se citește…' };
    render();
    var fmt = G.SSI_DWG_IMPORT.detectFormat(file);
    if (!fmt.ok) { STATE.planSituatieInfo.stare = 'eroare: ' + fmt.mesaj; render(); if (G.ss) G.ss(fmt.mesaj); return; }
    try {
      var parsed = await G.SSI_DWG_IMPORT.parseDXFFile(file);
      STATE.planSituatieInfo.stare = parsed.nrEntitati + ' entități, ' + parsed.layers.length + ' layere citite';
      // Detectare multi-plansa INAINTEA fluxului vechi (single-plansa) — daca fisierul are mai multe
      // planse desenate impreuna (chenare/cartuse separate in acelasi DXF), fiecare se proceseaza cu
      // motorul potrivit tipului ei; daca are UNA singura, cade exact pe comportamentul vechi.
      if (G.SSI_DWG_MULTISHEET) {
        var rezMulti = _proceseazaPlanseMultiple(parsed);
        if (rezMulti) {
          STATE.planSituatieInfo.stare = 'Fișier cu ' + rezMulti.nrPlanse + ' planșe detectate: ' + rezMulti.rezumat.join(' · ');
          render();
          if (G.ss) G.ss('✓ Am detectat ' + rezMulti.nrPlanse + ' planșe în același fișier — vezi rezumatul de mai sus. ' + (rezMulti.gasitPlanSituatie ? '' : 'Nicio planșă nu a fost recunoscută ca plan de situație — verifică maparea layerelor manual dacă e cazul.'));
          return;
        }
      }
      var mapare = G.SSI_DWG_IMPORT.mapLayers(parsed);
      if (mapare.automata_completa) { _aplicaGeometrie(parsed, mapare); return; }
      var stats = G.SSI_DWG_IMPORT.analizeazaLayerePoligoane(parsed);
      // Preselectie doar pt "constructie propusa" (categoria cea mai greu de ghicit din nume) —
      // ramane pe deplin editabila, nu se aplica fara apasarea explicita a Confirmă.
      if (!mapare.mapare.constructie_propusa) mapare.mapare.constructie_propusa = _ghicesteConstructiePropusa(stats);
      // mapare partiala/esuata -> cerem confirmare/completare manuala explicita (NU presupunem)
      STATE.pendingDxf = { parsed: parsed, mapareCurenta: mapare.mapare, statsLayere: stats };
      render();
      if (G.ss) G.ss('DXF citit (' + parsed.nrEntitati + ' entități, ' + parsed.layers.length + ' layere) — confirmă manual maparea layerelor mai jos.');
    } catch (e) { STATE.planSituatieInfo.stare = 'eroare la citire: ' + e.message; render(); if (G.ss) G.ss('Eroare la citirea DXF: ' + e.message); }
  }

  // Cauta in textele unui releveu DXF (de regula fisierul de SECTIUNE) cotele de nivel — verificat
  // pe fisiere reale de proiect (Cătămărăști): eticheta uzuala NU e "H cornisa = 6.00" intr-un singur
  // text, ci DOUA linii separate de \P intr-un cartus de cota: valoarea ("+6.00"/"±0.00"/"-3.00") pe
  // primul rand, denumirea nivelului ("Parter"/"Etaj 1"/"Subsol"/"Invelitoare") pe al doilea. Constituie
  // practic un "tabel de cote" — se parcurg toate etichetele astfel gasite, se construieste o harta
  // nivel->valoare, apoi se deriva H cornisa (nivelul de invelitoare/cornisa/streasina) si H coama
  // (nivelul explicit de coama, sau — daca nu exista un nume explicit — cel mai inalt nivel gasit
  // PESTE cornisa, semn ca acoperisul are un varf; daca nu exista niciun nivel peste cornisa,
  // acoperisul e probabil plat/terasa).
  function _extrageInaltimiDinDXF(parsed) {
    var niveluri = []; // {valoare, nume}
    (parsed.entities || []).forEach(function (e) {
      if (e.type !== 'TEXT' && e.type !== 'MTEXT') return;
      var raw = String(e.text || '');
      var clean = raw.replace(/\\P/g, ' | ').replace(/\{\\[^;{}]*;/g, '').replace(/[{}]/g, '').replace(/\\[A-Za-z][^;\\]*;/g, '').replace(/\s+/g, ' ').trim();
      // format "cota de nivel": valoare, apoi (dupa separator) numele nivelului
      var m = clean.match(/^([±+\-]\s?\d+[.,]\d+)\s*\|\s*([A-Za-zĂÂÎȘȚăâîșț0-9 ]{2,30})/);
      if (m) {
        var val = parseFloat(m[1].replace('±', '').replace(',', '.').replace(/\s/g, ''));
        niveluri.push({ valoare: val, nume: m[2].trim() });
        return;
      }
      // fallback: format direct "H cornisa = 6.00" / "cota coama +8.50" intr-un singur text
      var mCornisaDirect = clean.match(/corni[sș]\w*\D{0,10}([+\-]?\d+[.,]\d+|\d+)/i);
      var mCoamaDirect = clean.match(/coam\w*\D{0,10}([+\-]?\d+[.,]\d+|\d+)/i);
      if (mCornisaDirect) niveluri.push({ valoare: parseFloat(mCornisaDirect[1].replace(',', '.')), nume: 'Cornișă' });
      if (mCoamaDirect) niveluri.push({ valoare: parseFloat(mCoamaDirect[1].replace(',', '.')), nume: 'Coamă' });
    });
    if (!niveluri.length) return { cornisa: null, coama: null };
    var nivelCornisa = niveluri.find(function (n) { return /invelitoare|corni[sș]|strea[sș]in/i.test(n.nume); });
    var nivelCoama = niveluri.find(function (n) { return /coam|creast[aă]|v[aâ]rf/i.test(n.nume); });
    var cornisa = nivelCornisa ? nivelCornisa.valoare : null;
    var coama = nivelCoama ? nivelCoama.valoare : null;
    // fara nume explicit de coama: daca exista un nivel mai inalt decat cornisa, e probabil coama
    // (acoperis in panta); daca nu, cornisa e cel mai inalt nivel -> probabil plat/terasa.
    if (coama == null && cornisa != null) {
      var maiInalt = niveluri.filter(function (n) { return n.valoare > cornisa + 0.05; }).sort(function (a, b) { return b.valoare - a.valoare; })[0];
      if (maiInalt) coama = maiInalt.valoare;
    }
    return { cornisa: cornisa, coama: coama, niveluri_gasite: niveluri, plat_probabil: cornisa != null && coama == null };
  }

  function _fmtKB(bytes) { return bytes != null ? Math.round(bytes / 1024) + ' KB' : '—'; }

  // Proceseaza UN singur fisier (DXF sau PDF) pt un tip de cladire — returneaza un rezumat afisabil,
  // nu mai afiseaza direct (Florin, 12 iul: "vreau sa vad ce fisiere am incarcat, cate" — nevoie de o
  // LISTA persistenta per camp, nu doar ultimul nume de fisier suprascris peste cel anterior).
  async function _proceseazaFisierRelevee(cheie, file) {
    var rezumat = { nume: file.name, tip: /\.dxf$/i.test(file.name) ? 'DXF' : /\.pdf$/i.test(file.name) ? 'PDF' : '?', marime: _fmtKB(file.size), continut: [] };
    if (rezumat.tip === 'DXF') {
      try {
        var parsed = await G.SSI_DWG_IMPORT.parseDXFFile(file);
        var h = _extrageInaltimiDinDXF(parsed);
        if (h.cornisa != null || h.coama != null) {
          if (h.cornisa != null && STATE.relevee[cheie].inaltime_cornisa == null) STATE.relevee[cheie].inaltime_cornisa = h.cornisa;
          if (h.coama != null && STATE.relevee[cheie].inaltime_coama == null) STATE.relevee[cheie].inaltime_coama = h.coama;
          if (h.plat_probabil && !STATE.relevee[cheie].tip_acoperis) STATE.relevee[cheie].tip_acoperis = 'plat';
          else if (h.coama != null && !STATE.relevee[cheie].tip_acoperis) STATE.relevee[cheie].tip_acoperis = 'sarpanta_doua_ape';
          STATE.relevee[cheie].extras_din_fisier = true;
          rezumat.continut.push('cote de nivel: H cornișă=' + (h.cornisa != null ? h.cornisa + 'm' : '—') + ', H coamă=' + (h.coama != null ? h.coama + 'm' : (h.plat_probabil ? 'plat/terasă' : '—')));
        } else {
          rezumat.continut.push('nicio cotă de nivel găsită ca text — completează H manual');
        }
        // Tablou de tâmplărie (uși) — extras din TOATE adnotările TEXT/MTEXT ale planșei DXF (18 iul,
        // Florin: "liste de uși, caracteristici... REI de cat, câte deschideri"). Funcționează dacă
        // proiectantul a scris deja tabloul de uși ca text pe planșă (uzual în practică) — NU se
        // parsează geometria blocurilor CAD ale ușilor (ar necesita definiții BLOCK, mult mai fragil).
        var texteDxf = (parsed.entities || []).filter(function (e) { return (e.type === 'TEXT' || e.type === 'MTEXT') && e.text; }).map(function (e) { return e.text; }).join('\n');
        var usiDxf = G.SSI_MATERIALE_EXTRACTIE ? G.SSI_MATERIALE_EXTRACTIE.extrageTablouTamplarieDinText(texteDxf) : [];
        if (usiDxf.length) {
          usiDxf.forEach(function (u) { if (!STATE.usiExtrase.some(function (x) { return x.width === u.width && x.height === u.height && x.referinta === u.referinta; })) STATE.usiExtrase.push(u); });
          rezumat.continut.push(usiDxf.length + ' uși identificate din text (tablou tâmplărie)');
        }
      } catch (e) { rezumat.continut.push('eroare la citirea geometriei: ' + e.message); }
    } else if (rezumat.tip === 'PDF') {
      // Fix real (Florin, 12 iul): planurile/sectiunile PDF contin date reale — stratigrafia peretilor
      // (materiale), inventarul de incaperi cu arie + finisaj pardoseala (deci sarcina termica REALA
      // a finisajului), si uneori gradul de stabilitate/categoria de importanta declarate in cartus —
      // se citesc automat pe orice PDF incarcat, nu se mai presupune ceva generic cand fisierul chiar
      // contine datele.
      try {
        var buf = await file.arrayBuffer();
        var bufDatePlan = buf.slice(0); // pdf.js poate detasa bufferul original — clonat INAINTE de prima citire
        var materiale = await G.SSI_MATERIALE_EXTRACTIE.extrageMaterialeDinPDF(buf);
        var datePlan = await G.SSI_MATERIALE_EXTRACTIE.extrageDatePlanPDF(bufDatePlan);
        if (materiale.length) {
          materiale.forEach(function (m) {
            if (!STATE.materialeExtrase.some(function (x) { return x.nume === m.nume; })) STATE.materialeExtrase.push(m);
          });
          rezumat.continut.push(materiale.length + ' materiale reale: ' + materiale.map(function (m) { return m.nume; }).join(', '));
        }
        if (datePlan.camere && datePlan.camere.length) {
          datePlan.camere.forEach(function (c) {
            if (!STATE.camereExtrase) STATE.camereExtrase = [];
            if (!STATE.camereExtrase.some(function (x) { return x.nume === c.nume && x.arie_mp === c.arie_mp; })) STATE.camereExtrase.push(c);
          });
          rezumat.continut.push(datePlan.camere.length + ' încăperi (' + datePlan.camere.filter(function (c) { return c.sarcina_termica_mj > 0; }).length + ' cu pardoseală combustibilă → sarcină termică calculată)');
        }
        if (datePlan.cartus && (datePlan.cartus.grad_stabilitate || datePlan.cartus.categorie_importanta)) {
          STATE.cartusExtras = Object.assign({}, STATE.cartusExtras, datePlan.cartus);
          rezumat.continut.push('cartuș: ' + (datePlan.cartus.grad_stabilitate ? 'grad ' + datePlan.cartus.grad_stabilitate : '') + (datePlan.cartus.categorie_importanta ? ', categorie ' + datePlan.cartus.categorie_importanta : ''));
        }
        if (datePlan.usi && datePlan.usi.length) {
          datePlan.usi.forEach(function (u) { if (!STATE.usiExtrase.some(function (x) { return x.width === u.width && x.height === u.height && x.referinta === u.referinta; })) STATE.usiExtrase.push(u); });
          rezumat.continut.push(datePlan.usi.length + ' uși identificate din text (tablou tâmplărie)');
        }
        if (!rezumat.continut.length) rezumat.continut.push('nu am recunoscut date structurate pe text (poate fi PDF scanat/imagine) — completează manual');
      } catch (e) { rezumat.continut.push('nu s-a putut citi textul PDF: ' + e.message); }
    } else {
      rezumat.continut.push('format neacceptat — folosește .dxf sau .pdf');
    }
    return rezumat;
  }

  // Accepta FIE un singur File, FIE un FileList/array (input multiple) — fiecare fisier se ADAUGA la
  // lista existenta a campului (nu o suprascrie), ca sa poti incarca Plan Parter + Plan Etaj + Sectiune
  // + Fatade etc., toate la acelasi tip de cladire, unul cate unul sau tot deodata.
  async function onFileRelevee(cheie, filesInput) {
    if (!filesInput) return;
    var files = filesInput.length != null ? Array.prototype.slice.call(filesInput) : [filesInput];
    if (!files.length) return;
    if (!STATE.relevee[cheie]) STATE.relevee[cheie] = {};
    if (!STATE.relevee[cheie].fisiere) STATE.relevee[cheie].fisiere = [];
    for (var i = 0; i < files.length; i++) {
      var rezumat = await _proceseazaFisierRelevee(cheie, files[i]);
      STATE.relevee[cheie].fisiere.push(rezumat);
      if (G.ss) G.ss('📎 ' + rezumat.nume + ' (' + rezumat.tip + ', ' + rezumat.marime + '): ' + rezumat.continut.join(' · ') + '.');
    }
    render();
  }

  G.SSI_UI = {
    open: open, getPending: function () {
      // FIX BUG REAL (Florin, 17 iul — proiect Catamarasti/154452): daca proiectantul completeaza tot
      // panoul (DXF, relevee, vecinatati, distanta ISU, bifele FINAL) dar UITA sa selecteze "1.0 Tip de
      // lucrare", acest getter intorcea INTREG obiectul ca null (gate pe STATE.tip_lucrare) → TOATE
      // datele introduse manual erau aruncate silentios, nu doar cascada M0-M17 (care oricum verifica
      // D.tip_lucrare separat in _buildScenariuSSICascada). Rezultatul: un "SSI" de 3 paragrafe generic,
      // fara nicio urma a muncii depuse in panou, fara nicio eroare vizibila. FIX: se intoarce intotdeauna
      // obiectul cu tot ce exista (vecinatati/relevee/camere/distanta ISU raman aplicate chiar daca tipul
      // de lucrare lipseste inca) — doar cascada completa ramane conditionata de tip_lucrare, nu restul.
      var nimicCompletat = !STATE.tip_lucrare && !STATE.vecinatati.length && !STATE.materialeExtrase.length &&
        !(STATE.camereExtrase && STATE.camereExtrase.length) && !(STATE.usiExtrase && STATE.usiExtrase.length) && !Object.keys(STATE.relevee).length &&
        !STATE.cladiriPropuse.length && STATE.distantaIsuKm == null;
      if (nimicCompletat) return null; // panoul e complet neatins — comportament neschimbat
      return {
        tip_lucrare: STATE.tip_lucrare, faza_document: STATE.fazaDocument, _vecinatati: STATE.vecinatati, geometrie_teren: STATE.geometrie_teren,
        _elemente_structurale: STATE.elemente_structurale, _ssi_final_mode: STATE.modFinal,
        _normative_confirmate_de_proiectant: STATE.normativeConfirmate,
        _cladiri_propuse: STATE.cladiriPropuse, _tipuri_cladiri: STATE.tipuriCladiri, _relevee: STATE.relevee,
        _materiale: STATE.materialeExtrase.length ? STATE.materialeExtrase : undefined,
        _camere: (STATE.camereExtrase && STATE.camereExtrase.length) ? STATE.camereExtrase : undefined,
        _usi: (STATE.usiExtrase && STATE.usiExtrase.length) ? STATE.usiExtrase : undefined,
        _detasament_isu: STATE.distantaIsuKm != null ? { distanta_km: STATE.distantaIsuKm } : undefined,
        _spatii_atex: STATE.atex.are ? [{
          nume: 'Ansamblul construcției (declarație proiectant)',
          substante_declarate: {
            gaze: _listaDinText(STATE.atex.gaze), vapori: _listaDinText(STATE.atex.vapori), pulberi: _listaDinText(STATE.atex.pulberi)
          },
          date_exploatare: { frecventa_scurgere: STATE.atex.frecventa }
        }] : undefined,
        grad_stabilitate: STATE.cartusExtras && STATE.cartusExtras.grad_stabilitate,
        categorie_importanta: STATE.cartusExtras && STATE.cartusExtras.categorie_importanta
      };
    },
    clearPending: function () { STATE = { tip_lucrare: null, fazaDocument: 'AVIZ', vecinatati: [], geometrie_teren: null, elemente_structurale: [], pendingDxf: null, modFinal: false, normativeConfirmate: false, cladiriPropuse: [], tipuriCladiri: {}, relevee: {}, materialeExtrase: [], camereExtrase: [], usiExtrase: [], cartusExtras: {}, planSituatieInfo: null, distantaIsuKm: null, inaltimiDetectate: null, atex: { are: false, gaze: '', vapori: '', pulberi: '', frecventa: 'ocazionala' } }; },
    _setDistantaIsu: function (v) { STATE.distantaIsuKm = v; render(); },
    _setModFinal: function (v) { STATE.modFinal = !!v; },
    _setNormativeConfirmate: function (v) { STATE.normativeConfirmate = !!v; },
    _setTipCladire: function (cheie, denumire) { STATE.tipuriCladiri[cheie] = denumire; },
    _setRelevee: function (cheie, camp, val) { if (!STATE.relevee[cheie]) STATE.relevee[cheie] = {}; STATE.relevee[cheie][camp] = val; if (camp === 'tip_acoperis') render(); },
    _onFileRelevee: onFileRelevee,
    // Elimina un fisier din LISTA afisata pt acel tip (nu retrage retroactiv materialele/incaperile
    // deja acumulate in STATE.materialeExtrase/camereExtrase — acelea raman validate pana la re-generare;
    // scopul e doar sa curete lista vizuala de un fisier incarcat gresit/duplicat).
    _eliminaFisierRelevee: function (cheie, idx) { if (STATE.relevee[cheie] && STATE.relevee[cheie].fisiere) { STATE.relevee[cheie].fisiere.splice(idx, 1); render(); } },
    _uitaPlanSituatie: function () { STATE.planSituatieInfo = null; render(); },
    _setTip: function (v) { STATE.tip_lucrare = v || null; },
    // ADAUGAT (18 iul, cerere Florin — a dat 2 exemple reale, unul de AVIZ ISU altul de AUTORIZAȚIE de
    // securitate la incendiu): fara acest control, D.faza_document (motorul din urbanx-docx-builder.js,
    // _buildScenariuSSICascada) nu era NICIODATA setat de UI — feature-ul backend era corect dar de
    // negasit/inaccesibil pt un utilizator real.
    _setFaza: function (v) { STATE.fazaDocument = v || 'AVIZ'; render(); },
    _setAtexAre: function (v) { STATE.atex.are = !!v; render(); },
    _setAtexCamp: function (camp, v) { STATE.atex[camp] = v; },
    _exportSarcinaTermicaCSV: _exportSarcinaTermicaCSV,
    _addVecinatate: function () { STATE.vecinatati.push({ id: 'V' + (STATE.vecinatati.length + 1), sursa_distanta: 'manual' }); render(); },
    _remove: function (i) { STATE.vecinatati.splice(i, 1); render(); },
    _set: function (i, key, val) { if (STATE.vecinatati[i]) STATE.vecinatati[i][key] = val; },
    _setMapareLayer: function (categorie, layer) { if (STATE.pendingDxf) STATE.pendingDxf.mapareCurenta[categorie] = layer || null; },
    _confirmaMapare: function () {
      if (!STATE.pendingDxf) return;
      _aplicaGeometrie(STATE.pendingDxf.parsed, { mapare: STATE.pendingDxf.mapareCurenta });
    },
    _onFile: onFile, _close: close, _save: function () { close(); if (G.ss) G.ss('✅ Date SSI salvate — se vor include la generarea Scenariului de Securitate la Incendiu.'); },
    _confirmaVecinatate: function (i, checked) { if (STATE.vecinatati[i]) STATE.vecinatati[i].confirmat = !!checked; render(); },
    _autoDetecteaza: async function () {
      if (!G.SSI_MAP_VECINATATI) { if (G.ss) G.ss('Motorul de auto-detectare nu e încărcat.'); return; }
      if (G.ss) G.ss('📍 Se caută clădirile din jurul parcelei active…');
      var r = await G.SSI_MAP_VECINATATI.autoDetecteazaVecinatati();
      if (!r.ok) { if (G.ss) G.ss('⚠ ' + r.mesaj); return; }
      if (!r.nrDetectate) { if (G.ss) G.ss('Nicio clădire găsită în raza de detecție — adaugă vecinătățile manual.'); return; }
      r.vecinatati.forEach(function (v) { STATE.vecinatati.push(v); });
      render();
      if (G.ss) G.ss('📍 ' + r.nrDetectate + ' vecinătăți detectate din hartă (estimare conservatoare, grad V/risc mare) — verifică și corectează unde e cazul.');
    },
    // Raspuns direct la "unde incarc releveele pe cladiri? sectiuni, fatade etc?" (Florin, 20 iul) —
    // panoul de sarcina termica nu avea NICIUN buton catre uneltele reale, doar o nota pasiva.
    _deschideRelevee: function () {
      if (typeof G.generateRelevee !== 'function') { if (G.ss) G.ss('⚠ Modulul Relevee nu e încărcat.'); return; }
      close();
      G.generateRelevee();
      if (G.ss) G.ss('📐 Relevee — desenează/încarcă planul (parter/etaje/secțiuni/fațade). Datele completate aici alimentează automat sarcina termică la revenirea în Scenariul SSI.');
    },
    // Genereaza explicit camere standard din functiunea PROIECTULUI ACTIV (nu ascuns, nu la generarea
    // finala) — arata clar ce functiune s-a folosit, ca sa se vada imediat daca nu e cea corecta
    // (Florin, 20 iul: "de unde naiba asistent social" — venea dintr-o functiune gresita, netransmisa).
    _genereazaCamereStandardAcum: function () {
      var Dproj = (G.UXDoc && G.UXDoc.getD) ? G.UXDoc.getD() : null;
      var functiune = Dproj && Dproj.functiune;
      if (!functiune) { if (G.ss) G.ss('⚠ Nicio funcțiune selectată — deschide Generatorul de Documentații Tehnice și alege funcțiunea proiectului înainte de a genera camere standard.'); return; }
      if (!G.SSI_SARCINA_TERMICA || typeof G.SSI_SARCINA_TERMICA.genereazaCamereStandard !== 'function') { if (G.ss) G.ss('⚠ Motorul de sarcină termică nu e încărcat.'); return; }
      var fnLabel = (G.UXDoc.FUNCTIUNI && G.UXDoc.FUNCTIUNI[functiune] && G.UXDoc.FUNCTIUNI[functiune].label) || functiune;
      var camere = G.SSI_SARCINA_TERMICA.genereazaCamereStandard(functiune, Dproj);
      if (!camere || !camere.length) { if (G.ss) G.ss('⚠ Nu există încă un program funcțional standard pentru funcțiunea „' + fnLabel + '" — completează un relevee real (buton „Deschide Relevee").'); return; }
      STATE.camereExtrase = camere;
      render();
      if (G.ss) G.ss('⚙ ' + camere.length + ' camere estimate din programul funcțional STANDARD al funcțiunii „' + fnLabel + '" (estimare conservatoare — verifică dacă aceasta e funcțiunea corectă a proiectului tău).');
    }
  };

  // Preia automat STATE in D la fiecare generare de dosar (aditiv — nu modifica genereazaDosar existent daca nu exista date SSI)
  function _patchGenerator() {
    if (!G.UXDocBuilder || G.UXDocBuilder.__ssiUiPatched) return;
    var orig = G.UXDocBuilder.genereazaDosar;
    G.UXDocBuilder.genereazaDosar = function (Dproj, v) {
      var pending = G.SSI_UI.getPending();
      if (pending) { Dproj.tip_lucrare = Dproj.tip_lucrare || pending.tip_lucrare; Dproj.faza_document = pending.faza_document || Dproj.faza_document; Dproj._vecinatati = Dproj._vecinatati || pending._vecinatati; Dproj._elemente_structurale = Dproj._elemente_structurale || pending._elemente_structurale; Dproj._ssi_final_mode = pending._ssi_final_mode; Dproj._normative_confirmate_de_proiectant = pending._normative_confirmate_de_proiectant; Dproj._cladiri_propuse = Dproj._cladiri_propuse || pending._cladiri_propuse; Dproj._tipuri_cladiri = Dproj._tipuri_cladiri || pending._tipuri_cladiri; Dproj._relevee = Dproj._relevee || pending._relevee; Dproj._spatii_atex = Dproj._spatii_atex || pending._spatii_atex;
        // BUG REAL gasit (raport Florin): geometrie_teren (distante_intre_cladiri, grupuri_constructive,
        // limita_proprietate, adnotari_urbanism, faza_dwg) nu era MERGE-uit niciodata aici — doar
        // testele mele manuale (care setau D.geometrie_teren direct) mascau asta; in fluxul REAL din
        // UI, Dproj.geometrie_teren era mereu undefined, ceea ce facea ca verificarea de distante intre
        // cladiri sa ruleze pe 0 perechi si compartimentarea sa cada pe fallback "toate individuale".
        Dproj.geometrie_teren = Dproj.geometrie_teren || pending.geometrie_teren;
        // Materiale REALE extrase din PDF-urile de secțiune (stratigrafie perete/planșeu/acoperiș,
        // scrisă de proiectant pe desen — Florin, 12 iul: "ai toate datele pentru DoP, nu mai spune
        // nedeclarat") — au prioritate față de lista implicită generică, la fel ca restul câmpurilor.
        Dproj._materiale = Dproj._materiale || pending._materiale;
        // Incaperi cu arie + sarcina termica REALA a pardoselii (din planurile Parter/Etaj — Florin,
        // 12 iul: "ai plansele pe fiecare nivel, ce lipseste?") + grad de stabilitate/categorie de
        // importanta DECLARATE de proiectant in cartus (sursa cea mai autoritara — desenul lui,
        // nu un implicit al motorului).
        Dproj._camere = Dproj._camere || pending._camere;
        Dproj.grad_stabilitate = Dproj.grad_stabilitate || pending.grad_stabilitate;
        Dproj.categorie_importanta = Dproj.categorie_importanta || pending.categorie_importanta;
        Dproj._detasament_isu = Dproj._detasament_isu || pending._detasament_isu;
      }
      // Fallback in CASCADA (17 iul, Florin: "vreau sa calculeze automat in functie de relevee si
      // planuri de mobilare: pe orice functiune"), de la sursa cea mai autoritara la cea mai generica:
      // (1) camere reale extrase din PDF/DXF incarcat (deja aplicat mai sus, pending._camere);
      // (2) geometria REALA din motorul de relevee (window._RV.floors — planul de nivel trasat/generat
      //     in aplicatie pt acest proiect anume, w x h reale per camera, functioneaza pe orice functiune
      //     fiindca releveul insusi e generic) — mai buna decat o estimare, fiindca e geometria proprie;
      // (3) daca nici asta nu exista, estimare din programul functional standard al functiunii
      //     (js/urbanx-space-program.js TIPOLOGII+SPACES), la fel cum vecinatatile se auto-detecteaza
      //     conservator din harta. Auto-estimeaza, nu bloca: draftul are mereu cifre reale calculate;
      //     utilizatorul confirma/corecteaza cu inventarul REAL cand il are.
      if ((!Dproj._camere || !Dproj._camere.length) && G.SSI_SARCINA_TERMICA) {
        var dinRelevee = G.SSI_SARCINA_TERMICA.dinRelevee && G.SSI_SARCINA_TERMICA.dinRelevee(G._RV && G._RV.floors);
        if (dinRelevee && dinRelevee.length) {
          Dproj._camere = dinRelevee;
        } else if (Dproj.functiune) {
          var estimateCamere = G.SSI_SARCINA_TERMICA.genereazaCamereStandard(Dproj.functiune, Dproj);
          if (estimateCamere && estimateCamere.length) Dproj._camere = estimateCamere;
        }
      }
      return orig(Dproj, v);
    };
    G.UXDocBuilder.__ssiUiPatched = true;
  }
  var _iv = setInterval(function () { _patchGenerator(); if (G.UXDocBuilder && G.UXDocBuilder.__ssiUiPatched) clearInterval(_iv); }, 300);

  console.log('[SSI] UI tip_lucrare + vecinatati + import DXF incarcata (window.SSI_UI.open())');
})(window);
