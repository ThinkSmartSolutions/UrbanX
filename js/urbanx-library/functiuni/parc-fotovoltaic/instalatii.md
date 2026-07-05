# MEMORIU TEHNIC DE INSTALAȚII ELECTRICE — CEF (DTAC)

## 1. Date generale

**Partea electrică = inima CEF:** producere → colectare → conversie → transformare → evacuare în SEN.

| Parametru | Valoare |
|---|---|
| P DC / AC | 5,5-12 MWp / 5,0-10 MW (ILR ~1,1-1,25) |
| cos φ reglabil | 0,9 ind ÷ 0,9 cap (cod tehnic) |
| Tensiune evacuare | 20 kV MT (racord conform ATR) |
| Producție / PR | ~1.250-1.400 kWh/kWp·an / 0,80-0,84 |

**nZEB NU se aplică** (CEF = producător, nu clădire cu consum; posturi = construcții tehnice nelocuite).

**Normative:** Legea 10/1995, 123/2012, PE 155, **I7-2011**, NTE 001/03, **IEC 62548, SR EN IEC 61730, IEC 62446, SR EN IEC 60364-7-712, SR EN 50583, SR EN 62305**, **Ord. ANRE cod tehnic/NTR (Ord. 228/2018)**, NTE 401/006, IEC 61439, IEC 62109, IEC 60076/62271, P118.

## 2. Arhitectura electrică

**Lanț:** module → string-uri (module serie) → **cutii joncțiune DC/combiner** (siguranțe gPV + SPD DC + secționare) → **invertoare** (string/central, MPPT, cc→ca) → tablou AC JT → **PT JT/MT 0,8/20 kV** → **stație racord MT** (celule + protecții + măsură fiscală) → **punct racord SEN (ATR)**. Modul 550 Wp (Voc 49,5 / Vmp 41,7 / Isc 14 / Imp 13,2 A); string 20-30 module; invertor string 100-350 kW sau central 1-4 MW; trafo 0,8/20 kV 1000-3150 kVA.

## 3. Breviar electric

**String — nr. module serie:**
- **N_max = V_DC,max,inv / [Voc·(1+βVoc·(Tmin−25))]**; Voc(−20°C) = 49,5·(1+(−0,0025)(−45)) = **55,1 V** → N_max = 1500/55,1 = **27**.
- **N_min = V_MPPT,min / [Vmp·(1+βVmp·(Tmax−25))]**; Vmp(70°C) = 41,7·0,8425 = 35,1 → N_min = 600/35,1 = **18**.
- **Adoptat N = 26**; Voc_string frig = 26·55,1 = **1.433 V < 1.500 V** ✓.

**Curent string:** I_calcul = 1,25·Isc = **17,5 A**; siguranță gPV **In 20 A** (1,4-2,4·Isc, ≤ OCPD modul).

**Nr. echipamente (Pdc 6,6 MWp):** 12.000 module → 462 string-uri (14,3 kWp/string); invertoare 250 kW → **24 buc** (Pac 6 MW), DC/AC 1,10.

**Transformator: Sn ≥ Pac/cosφ = 6.000/0,90 = 6.667 kVA** → **3 × 2.500 kVA** (grad 0,89) ✓.

**Cablu DC (≤1%):** Δu% = 2·L·I·ρ/(S·Vmp_string)·100; L 100, I 13,2, ρCu 0,0178, Vmp_string 1.084, S 6 mm² → **0,72% < 1%** ✓ (6 mm² OK și termic Iz 55 A).

**Cablu AC (≤3%):** I_AC = P/(√3·U·cosφ) = 250.000/(√3·400) = **361 A**; Δu% = √3·L·I·(Rcosφ+Xsinφ)/Un·100; L 50, 3×185 Al (R 0,164) → **1,28%**; total DC+AC = 0,72+1,28 = **2,0% < 3%** ✓.

**PR = Π(1−pi):** temperatură 5 + soiling 2,5 + mismatch 1 + cabluri DC 1 + invertor 1,5 + trafo 1 + cabluri AC 1 + indisponibilitate 2 + altele 3 → **PR ≈ 0,82** (țintă 0,80-0,84).

## 4. Protecții

**DC (IEC 60364-7-712/62548):** siguranțe gPV string (In 20 A) + **SPD DC tip 2** (Ucpv ≥1500 V) combiner+invertor + separator DC/invertor + monitorizare izolație Riso + AFCI (arc DC). **AC (I7):** disjunctor/invertor (In ≥1,1·IAC = 400 A) + SPD AC tip 2 (+tip 1 dacă LPS) + RCD tip B (dacă TN/IT) + **anti-insularizare** (ROCOF/vector shift). **MT (PE 155/NTE):** relee 50/51 (scurtcircuit) + 50N/51N (homopolar) + 27/59 (tensiune) + 81 (frecvență) + separatoare+întrerupător MT + 87T (diferențial trafo posturi mari); reglaje corelate cu **ATR (OD/OTS)** + selectivitate.

## 5. Priză pământ, echipotențializare, paratrăsnet

**Priză pământ** buclă (bandă OL-Zn 40×4 la 0,8 m + electrozi verticali), **Rp ≤1 Ω** (comună JT+MT+paratrăsnet). **Echipotențializare TOATE mesele FV** (bandă/conductor Cu 6-16 sau OL-Zn) → rețea echipotențială câmp; continuitate module(rame)-structură-pilot-priză (cleme certificate); verificare tensiune atingere/pas (NTE 006). **Paratrăsnet (SR EN 62305):** câmp mare deschis → **evaluare risc R = ΣRx** (SR EN 62305-2) vs. RT → nivel LPS I-IV; **LPS extern posturi** (LPL III uzual); câmp panouri = **echipotențializare + SPD** (fără catarge care umbresc); **SPD coordonate** (tip 1 intrare posturi cu LPS, tip 2 combiner+invertor, tip 3 sensibile); distanțe separare s.

## 6. Monitorizare, SCADA, contorizare

Monitorizare invertoare (producție/tensiuni/curenți/temperaturi/alarme MPPT) + **contorizare fiscală bidirecțională** (clasă 0,2S/0,5S, TC/TT, cod măsurare ANRE) + **stație meteo** (piranometru POA+orizontal, temperatură modul/ambient, vânt → PR live) + **Power Plant Controller** (reglaj P/Q, curtailment la comanda OD) + comunicație fibră/GSM (IEC 60870-5-104/DNP3) + securitate cibernetică. Permite reglaj P/Q + suport tensiune/frecvență.

## 7. Iluminat și siguranță posturi

Iluminat perimetral LED (crepuscular + supraveghere, nivel redus) + interior posturi/containere LED + **iluminat securitate** (evacuare, sursă neîntreruptibilă) + tablou servicii proprii (TSP) + CCTV/antiefracție perimetru. I7-2011/NP 061.

## 8. PSI posturi (cerința C)

**PT ulei:** cuvă retenție 100% + pereți REI + stingere pulbere/CO₂ (sau trafo uscat fără ulei). **Container invertoare:** ventilație + detecție fum + stingere automată (aerosol/gaz inert) + compartimentare. **Cabluri LSZH** + opriri foc. **Câmp:** AFCI + rapid shutdown. Scenariu securitate + dotare PSI clasa E (electric) + distanțe siguranță + acces pompieri/hidranți (P118 dacă aplicabil).

## 9. Racordare la SEN

Conform **ATR** (OD/OTS): (1) cerere racordare + fișă tehnică CEF; (2) studiu soluție → punct/schemă racord MT 20 kV; (3) **ATR** (tensiune/protecții/reglaje/curtailment/telecomandă); (4) contract racordare + execuție; (5) **PIF probe IEC 62446** (string-uri, izolație, polaritate, protecții, PR) + PV; (6) certificat racordare + **notificare conformitate RfG (Reg. UE 2016/631)**. Cerințe RfG: domenii U/f, capabilitate reactivă, LFSM, **FRT (fault ride through)**.

## 10. Concluzii + verificare Ie

1. Arhitectură completă module→string→combiner→invertor→AC JT→PT JT/MT→stație→SEN (Pac 5-10 MW, 20 kV). 2. String **26 module** validat pe Voc frig (1.433<1.500) + Vmp caniculă (Nmin 18). 3. Posturi **3×2.500 kVA** ≥ 6.667. 4. Cabluri: ΔuDC 0,72% + ΔuAC 1,28% = **2,0% <3%** + curent admisibil. 5. **PR 0,82**. 6. Protecții complete DC/AC/MT coordonate. 7. **Priză Rp ≤1 Ω + echipotențializare toate structurile + paratrăsnet SR EN 62305** (esențial câmp deschis). 8. SCADA + contorizare fiscală + meteo + reglaj P/Q. 9. Racord ATR + RfG; nZEB N/A. 10. **Verificare Ie** (verificator atestat MDLPA obligatoriu) + C. Corespunde cerințelor D (siguranță exploatare) + C (incendiu) — L10/1995 — și codului tehnic racordare SEN.
