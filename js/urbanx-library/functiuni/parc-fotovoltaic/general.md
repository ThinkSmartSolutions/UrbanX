# MEMORIU TEHNIC GENERAL — CENTRALĂ ELECTRICĂ FOTOVOLTAICĂ (DTAC)

## 1. Date generale

Piesă scrisă generală DTAC (Legea 50/1991 Anexa 1) pentru **CEF 8,0 MWp / 6,4 MWac** pe teren extravilan: câmp module + stații invertoare + post transformare + racord SEN + drum + împrejmuire + CCTV + clădire comandă/pază.

| Element | Valoare |
|---|---|
| Putere DC / AC | 8,0 MWp / 6,4 MWac (ILR 1,25) |
| Teren | 14 ha extravilan (arabil) |
| Categoria importanță | **C** (structuri/PT/pază; D drumuri/gard) |
| Clasa seismică | **III (γI 1,0)** — vântul determinant |
| Grad RF | I-II (containere/PT incombustibile) |

**Cadru normativ:** Legea 50/1991, 10/1995, HG 907/2016, 766/1997, 350/2001, HG 525/1996, Legea 372/2005 (doar clădire pază); **Legea energiei 123/2012, Legea 220/2008 (E-SRE), Ord. ANRE autorizare + Ord. 59/2013 racordare + NTR (Reg. UE 2016/631 RfG), PE 155/PE 134**; **IEC 62548/61730/61215/62446, SR HD 60364-7-712, SR EN 50583, IEC 61140, SR EN 62305**; mediu OUG 195/2005, Legea 292/2018 (EIA), **Legea 18/1991 + Ord. MADR 83/2018 (scoatere circuit agricol)**, HG 1076/2004 (SEA), OUG 57/2007 (Natura 2000); P118-1/2/3, HG 571/2016, Ordin MAI 129/2016.

## 2. Categorie, clasă, grad RF

**HG 766/1997:** structuri mese FV/PT/invertoare/pază = **C normală**; drumuri/gard = D. **P100-1/2013 tab. 4.2:** clasa **III γI 1,0** (structuri + PT + pază); ag/TC din hărți zonare (ex. câmpie E: ag 0,20-0,35g, TC 0,7-1,6s); **Fb = γI·Sd(T1)·m·λ** — la mese FV vântul e mai defavorabil ca seismul; verificare seismică obligatorie la containere + ancoraje. **Grad RF:** câmp FV = instalație tehnologică (risc arc DC), PT/containere C0(CA1) grad I-II, clădire pază grad II risc mic.

## 3. Cadru normativ complet

(vezi §1 — legislație construcții + energie/racordare ANRE + standarde FV IEC/SR EN + mediu/scoatere agricol + PSI).

## 4. Tipuri de instalații FV — tipul adoptat

| Tip | GCR | Avantaj | Dezavantaj |
|---|---|---|---|
| **Pe sol fix (adoptat)** | 0,35-0,50 | cost minim, mentenanță redusă, robust | producție specifică mai mică |
| Tracker 1 axă | 0,30-0,40 | +15-25% producție | cost + piese mobile |
| Tracker 2 axe | 0,15-0,25 | +30-40% | cost mare, teren mult |
| Plutitoare | — | nu ocupă teren | ancorare, cost (fără luciu apă) |
| Pe acoperiș | — | fără teren nou | limitat |
| Agrivoltaic | 0,25-0,35 | dublă utilizare | cost structuri înalte |

**Adoptat: pe sol, structuri fixe, orientare Sud, unghi ~30-35°** (CAPEX/OPEX minim, fiabilitate, robustețe vânt, execuție piloți bătuți fără beton).

## 5. Necesitate și oportunitate

**PNIESC 2021-2030** (țintă E-SRE), **PNRR Energie**, **Green Deal + REPowerEU**, **Directiva UE 2018/2001 RED II**. Beneficii: **CO₂ evitat = E_anual × f_emisie_SEN** = 10.400 MWh/an × 0,30 tCO₂/MWh ≈ **3.120 tCO₂/an**.

## 6. Descriere tehnică și indicatori

**Componente:** câmp ~14.815 module 540 Wp pe mese fixe 2V + structuri zincate pe piloți bătuți + stații invertoare (skid distribuit) + PT 0,8/20 kV (cuvă retenție ulei) + racord LES 20 kV + drum acces 4-5 m + gard h 2,0 + CCTV + clădire pază 20-30 mp.

| Indicator | Valoare |
|---|---|
| Putere DC / AC / ILR | 8,0 MWp / 6,4 MWac / 1,25 |
| Module | 14.815 (N = P_DC/P_modul = 8.000.000/540) |
| Teren / ocupat module | 14 ha / ~4,9-5,6 ha (GCR 0,35-0,40) |
| Racord | 20 kV MT (string ~26 module, Voc <1500 V) |
| Producție / yield | ~10.400 MWh/an / ~1.300 kWh/kWp·an |

**Producție: E_anual = P_DC × PSH_POA × PR** = 8.000 kWp × 1.450 h × 0,82 ≈ **9.512 MWh/an** (cu overloading 1,25 → ~10.400). **PR 0,80-0,85** (pierderi: temperatură 5-8% + invertor 2-4% + cabluri 1-3% + soiling 1-3% + mismatch 1-2% + disponibilitate 1-2%). Confirmare PVsyst la PT.

## 7. Utilități, mediu, avize

**Utilități:** evacuare MT 20 kV la SEN (ATR); servicii proprii trafo/rețea; comunicații fibră/GSM SCADA; drum acces public (aviz administrator). **Mediu (impact redus):** biodiversitate menținută sub panouri (pajiște + specii melifere, fără erbicide agresive), **sol permeabil** (piloți bătuți, fără impermeabilizare), sticlă antireflex (glare redus), zgomot minor (invertoare/trafo, STAS 10009), **dezafectare/reciclare** (Directiva DEEE 2012/19/UE + OUG 5/2015, piloți extractibili → readucere agricol + plan dezafectare + garanție financiară).

**Avize:** CU, **ATR (Transelectrica/OD)**, **autorizație înființare ANRE**, **acord mediu APM** (Legea 292/2018), Natura 2000 (dacă e cazul), **scoatere circuit agricol DADR/MADR** (Legea 18/1991 + Ord. 83/2018), **ISU** (HG 571/2016), administrator drum (CNAIR/CJ/Primărie), utilități, aviație AACR (dacă servituți aeronautice).

## 8. Încadrare urbanistică

Extravilan → **PUZ Parc Fotovoltaic** (Legea 350/2001, stabilește funcțiunea/reglementările/POT-CUT) + **scoatere circuit agricol** (Legea 18/1991). Indicatori foarte reduși (construcții efective = fracțiune minoritară; câmpul pe piloți reversibil nu se contabilizează ca AC clasică): POT ≤5-10% (PT/pază/platforme), CUT ≤0,1, regim P, retrageri ≥5,0 m + perdea vegetală. **PUZ (rang superior, reglementare) ≠ DTAC (rang inferior, autorizare pe amplasament).**

## 9. Concluzii

CEF 8,0 MWp/6,4 MWac, categoria C, clasa III (γI 1,0), grad I-II RF. Cele 6 cerințe L10/1995; impact mediu redus + țintă PNIESC/PNRR/Green Deal; condiționat de ATR + autorizație ANRE + decizie mediu + scoatere circuit agricol. Producție ~10.400 MWh/an, ~3.120 tCO₂/an evitat. Fezabil tehnic + oportun strategic. Se completează cu memoriile de specialitate (arhitectură/amenajare, rezistență, instalații electrice) + piese desenate. Semnat proiectant (L10/1995).
