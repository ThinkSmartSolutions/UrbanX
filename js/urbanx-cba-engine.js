/* ============================================================================
 * UrbanX — MOTOR ANALIZĂ COST-BENEFICIU (js/urbanx-cba-engine.js)
 * VNA/RIR financiar + economic, conform metodologia HG 907/2016 + Documentul de
 * lucru nr. 4 al Comisiei Europene ("Orientări privind metodologia de realizare
 * a analizei cost-beneficiu"). Formule REALE (actualizare flux de numerar), nu
 * text generic — vezi lipsa confirmată: zero funcții VNA/RIR existau în platformă
 * înainte de acest fișier (cerere Florin, verificare pe exemplu real DALI Bătești).
 *
 * VAN = -I0 + Σ(t=1..n) FNt/(1+k)^t + VR/(1+k)^n,  VR = FN(n+1)/(k-g)  [perpetuitate]
 * RIR = rata k pentru care VAN(k) = 0 (rezolvare numerică, Newton-Raphson + bisecție fallback)
 * Raport B/C = Σ venituri actualizate / Σ cheltuieli actualizate
 *
 * window.UXCBA: calculVAN · calculRIR · calculRaportBC · analizaCostBeneficiu
 * ========================================================================== */
(function (G) {
  'use strict';

  // ── VAN (NPV) — flux de numerar NET pe fiecare an (FN[1..n]), + valoare reziduală la anul n ──
  function calculVAN(I0, fluxuriNete, k, valoareReziduala) {
    var van = -I0;
    for (var t = 1; t <= fluxuriNete.length; t++) van += fluxuriNete[t - 1] / Math.pow(1 + k, t);
    if (valoareReziduala) van += valoareReziduala / Math.pow(1 + k, fluxuriNete.length);
    return van;
  }

  // ── RIR (IRR) — rata k* pentru care VAN(k*) = 0. Newton-Raphson pe derivata numerică a VAN,
  // cu fallback bisecție pe [-0.99, 5] dacă Newton nu converge (flux cu semn neconvențional). ──
  function calculRIR(I0, fluxuriNete, valoareReziduala) {
    function van(k) { return calculVAN(I0, fluxuriNete, k, valoareReziduala); }
    var k = 0.1, iter = 0, h = 1e-6;
    while (iter++ < 100) {
      var v = van(k), d = (van(k + h) - van(k - h)) / (2 * h);
      if (Math.abs(d) < 1e-9) break;
      var kNou = k - v / d;
      if (Math.abs(kNou - k) < 1e-9) return kNou;
      k = kNou;
      if (k < -0.99 || k > 50) break; // divergență — trecem la bisecție
    }
    // Fallback: bisecție (necesită schimbare de semn pe interval)
    var lo = -0.99, hi = 5, vLo = van(lo), vHi = van(hi);
    if (vLo * vHi > 0) return null; // nicio rădăcină pe intervalul căutat (flux fără schimbare de semn)
    for (var i = 0; i < 200; i++) {
      var mid = (lo + hi) / 2, vMid = van(mid);
      if (Math.abs(vMid) < 1e-6) return mid;
      if (vLo * vMid < 0) { hi = mid; vHi = vMid; } else { lo = mid; vLo = vMid; }
    }
    return (lo + hi) / 2;
  }

  // ── Raport B/C — venituri actualizate / cheltuieli actualizate (fluxuri separate, nu nete) ──
  function calculRaportBC(venituriAnuale, cheltuieliAnuale, k) {
    var vAct = 0, cAct = 0;
    for (var t = 1; t <= venituriAnuale.length; t++) {
      vAct += (venituriAnuale[t - 1] || 0) / Math.pow(1 + k, t);
      cAct += (cheltuieliAnuale[t - 1] || 0) / Math.pow(1 + k, t);
    }
    return cAct > 0 ? vAct / cAct : null;
  }

  // ── Analiza completă financiară + economică, pornind de la Devizul General al proiectului ──
  // opts: { investitieCuTva, investitieFaraTva, aniReferinta, kFinanciar, kEconomic,
  //         economieAnualaUtilitati, costIntretinereAnuala, externalitatiAnuale }
  // Toate valorile de intrare sunt VIZIBILE și EDITABILE — motorul nu ascunde nicio ipoteză.
  function analizaCostBeneficiu(opts) {
    opts = opts || {};
    var n = opts.aniReferinta != null ? +opts.aniReferinta : 15; // Ord. MDLPL 863/2008 — perioadă de referință clădiri publice
    var kF = opts.kFinanciar != null ? +opts.kFinanciar : 0.08;  // rată actualizare financiară, uzuală RO
    var kE = opts.kEconomic != null ? +opts.kEconomic : 0.055;   // rată recomandată CE (Doc. lucru nr.4)
    var I0cuTva = +opts.investitieCuTva || 0;
    var I0faraTva = +opts.investitieFaraTva || (I0cuTva / 1.21);
    var economieUtil = +opts.economieAnualaUtilitati || 0;   // beneficiu financiar direct (reducere factură energie)
    var costIntretinere = +opts.costIntretinereAnuala || 0;  // cost financiar anual (întreținere/operare suplimentară)
    var externalitati = +opts.externalitatiAnuale || 0;      // beneficiu economic suplimentar, nemonetar/indirect, monetizat

    // ── Analiza financiară: flux net anual = economie utilități − cost întreținere (constant, fără creștere) ──
    var fluxNetF = []; for (var t = 1; t <= n; t++) fluxNetF.push(economieUtil - costIntretinere);
    var fnPlus1F = fluxNetF[fluxNetF.length - 1] || 0;
    var vrF = (kF - 0) !== 0 ? fnPlus1F / kF : 0; // g=0 (fără creștere reală în perpetuitate)
    var vanF = calculVAN(I0cuTva, fluxNetF, kF, vrF);
    var rirF = calculRIR(I0cuTva, fluxNetF, vrF);
    var bcF = calculRaportBC(Array(n).fill(economieUtil), Array(n).fill(costIntretinere).map(function (c, i) { return i === n - 1 ? c : c; }), kF);

    // ── Analiza economică: se pornește de la fluxul financiar, se elimină TVA/transferuri bugetare
    // (corecție fiscală) și se adaugă externalitățile monetizate (beneficii indirecte pt. comunitate) ──
    var fluxNetE = []; for (var t2 = 1; t2 <= n; t2++) fluxNetE.push((economieUtil - costIntretinere) + externalitati);
    var fnPlus1E = fluxNetE[fluxNetE.length - 1] || 0;
    var vrE = kE !== 0 ? fnPlus1E / kE : 0;
    var vanE = calculVAN(I0faraTva, fluxNetE, kE, vrE);
    var rirE = calculRIR(I0faraTva, fluxNetE, vrE);
    var bcE = calculRaportBC(Array(n).fill(economieUtil + externalitati), Array(n).fill(costIntretinere), kE);

    return {
      metodologie: 'HG 907/2016 + Documentul de lucru nr. 4 CE ("Orientări privind metodologia de realizare a analizei cost-beneficiu") · perioadă de referință conform Ord. MDLPL 863/2008',
      intrari: { n: n, kF: kF, kE: kE, I0cuTva: I0cuTva, I0faraTva: I0faraTva, economieUtil: economieUtil, costIntretinere: costIntretinere, externalitati: externalitati },
      financiar: { VAN: Math.round(vanF), RIR: rirF, raportBC: bcF, VR: Math.round(vrF), fluxNetAnual: Math.round(economieUtil - costIntretinere), concluzie: vanF < 0 ? 'VAN < 0 — necesară finanțare nerambursabilă/publică (proiect fără rentabilitate financiară proprie, tipic pentru infrastructură educațională)' : 'VAN ≥ 0 — proiect financiar viabil independent' },
      economic: { VAN: Math.round(vanE), RIR: rirE, raportBC: bcE, VR: Math.round(vrE), fluxNetAnual: Math.round(economieUtil - costIntretinere + externalitati), concluzie: vanE > 0 ? 'VAN > 0 — investiția generează beneficii economico-sociale nete pentru comunitate; se recomandă realizarea' : 'VAN ≤ 0 — beneficiile economico-sociale estimate nu acoperă costul investiției la rata de actualizare folosită' }
    };
  }

  G.UXCBA = { calculVAN: calculVAN, calculRIR: calculRIR, calculRaportBC: calculRaportBC, analizaCostBeneficiu: analizaCostBeneficiu };
  console.log('[UXCBA] motor analiză cost-beneficiu (VNA/RIR financiar+economic) încărcat — window.UXCBA');
})(window);
