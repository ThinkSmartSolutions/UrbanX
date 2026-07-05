# MEMORIU TEHNIC GENERAL — BESS (STOCARE ENERGIE ÎN BATERII) (DTAC)

## 1. Date generale

Piesă scrisă generală DTAC (Legea 50/1991 Anexa 1) pentru **instalație BESS 25 MW / 50 MWh**, containere Li-ion **LFP**, montaj la sol, adiacentă parc FV, racord SEN.

| Parametru | Valoare |
|---|---|
| Putere P / Capacitate E | 25 MW / 50 MWh (t = E/P = 2 h, C-rate 0,5C) |
| Tehnologie | Li-ion **LFP** (LiFePO₄) containerizat |
| Racord | 20 kV → 110 kV prin stație conexiune |
| Rol | peak-shaving / arbitraj / servicii sistem FCR-aFRR / backup FV |
| η round-trip | 87% proiectat (≥85 garantat) |
| Categoria importanță | **C** (HG 766/1997) |
| Clasa seismică | **III (γI 1,0)** — containere ancorate |
| Risc incendiu | **MARE** (thermal runaway Li-ion) |

**Cadru normativ:** Legea 50/1991, 10/1995, HG 907/2016, 766/1997, 350/2001; Legea energiei 123/2012 (stocarea = activitate distinctă, Dir. UE 2019/944), Ord. ANRE racordare/licențiere, Legea 220/2008, Cod RET/RED; **IEC 62933 (EES), IEC 62619 (baterii industriale), IEC 63056 (Li în EES), UL 9540 + UL 9540A (test thermal runaway propagation — CRITIC), NFPA 855 (instalare — CRITIC)**; P118-1/2/3 + Ordin MAI 129/2016 (ISU risc mare); OUG 195/2005, Legea 292/2018 (EIA), Directiva 2006/66/CE + OUG 5/2015 + Reg. UE 2023/1542 (baterii uzate).

## 2. Categorie și clasă

**HG 766/1997:** categoria **C normală** (6 factori; factor ecologic/risc ridicat → tratare agravantă cerințele Cc/Ci fără schimbarea categoriei). **P100-1/2013 tab. 4.2:** clasa **III γI 1,0**; containere **ancorate** de platforme b.a. **Fb = γI·Sd(T1)·m·λ**; container ~35 t, ag 0,20g, β0 2,5, q 1,5 → Fb ≈ 1,0·(0,20·2,5/1,5)·35t·g ≈ **114 kN** ancoraj (verificare forfecare+smulgere buloane SR EN 1992-4).

## 3. Grad RF și risc incendiu

**Thermal runaway Li-ion** = risc dominant: declanșat de abuz electric (supraîncărcare)/defect intern (dendrite)/abuz termic (>60-80°C)/deteriorare mecanică → **gaze venting inflamabile** (H₂, CO, CH₄, C₂H₄, electroliți) → propagare cell-to-cell → atmosferă explozivă. **LFP mult mai stabil ca NMC** (declanșare ~250-270°C vs. 150-210, fără O₂ din catod) → risc redus, nu eliminat → **LFP preferat**. **Risc MARE**.

| Element | Cerință |
|---|---|
| Anvelopă container | **EI 120** (NFPA 855 §9) |
| Uși | EI2 60-C |
| **Distanță container-container** | **≥3,0 m** (NFPA 855) sau conform UL 9540A |
| Detecție | gaze H₂/CO + fum aspirativ |
| Stingere | aerosol/gaz inert + drencer răcire exterior |
| Venting deflagrație | panouri suprapresiune (NFPA 68/69) |

**UL 9540A CRITIC:** testul (celulă/modul/unit/instalație) determină propagarea, **distanțele reale**, necesarul stingere/venting, fluxul termic la limită. Raport UL 9540A = anexă obligatorie la PTh pentru avizare ISU.

## 4. Necesitate și oportunitate

Integrare SRE (time-shifting FV diurn → livrare vârf seară, reduce curtailment); **servicii sistem Transelectrica (FCR <secunde, aFRR)** (răspuns <1s superior grupuri convenționale); arbitraj (PZU + piața echilibrare); peak-shaving + backup; cadru **PNRR + PNIESC + Fit for 55**.

## 5. Tipuri BESS — tehnologia aleasă

| Tehnologie | Densitate | Siguranță | Aplicație |
|---|---|---|---|
| Li-ion NMC | mare 150-220 Wh/kg | mai redusă (O₂ catod) | mobilitate |
| **Li-ion LFP (adoptat)** | mare 90-160 | **ridicată** (fără O₂) | staționar grid |
| Flow redox VRFB | redusă 15-25 | foarte ridicată (apos) | lungă durată |
| Sodiu-ion | medie | ridicată | perspectivă |

**Adoptat LFP:** siguranță termică + durată >6.000 cicluri (DoD 90%) + fără cobalt + maturitate grid. C-rate = P/E = 25/50 = **0,5C** (moderat, favorabil viață + control termic).

## 6. Încadrare urbanistică

Extravilan/zonă tehnico-industrială energetică → **PUZ** (Legea 350/2001) + RLU: funcțiune stocare energie, POT ≤30-40% / CUT ≤0,4-0,6 (reduse — mult teren pt distanțe), regim parter tehnic H ≤6-7 m, distanțe siguranță NFPA 855/P118/ISU. Orientativ: teren ~12.000-15.000 mp, Sc ~1.800-2.400, **POT ~15-20% / CUT ~0,15-0,20**, verzi ≥20%.

## 7. Descriere tehnică

Ansamblu modular containerizat: (1) **containere baterii** ISO 20' (rack module LFP + **BMS 3 niveluri** modul→rack→sistem + HVAC 15-35°C + detecție/stingere/venting + EI 120); (2) **PCS Power Conversion System** (invertoare bidirecționale DC↔AC, P/Q, grid-forming/following); (3) transformator ridicător 0,8/20 kV; (4) racord SEN (celule MT + stație + eventual 20/110 kV, ATR); (5) **EMS** (dispecerizare arbitraj/servicii + SCADA); (6) auxiliare (CCTV, iluminat, împrejmuire, drumuri, platformă pompieri).

## 8. Indicatori

| Indicator | Valoare |
|---|---|
| E / nr. containere | 50 MWh / 10 (e_c ~5 MWh/container 20') |
| P / C-rate / durată | 25 MW / 0,5C / 2 h |
| η round-trip | 87% (E_in = 50/0,87 ≈ 57,5 MWh) |
| DoD / viață | 90% / >6.000 cicluri, >15 ani |

**E = N_c × e_c = 10 × 5 = 50 MWh.**

## 9. Utilități

Racord SEN + consum auxiliar (HVAC/EMS/iluminat) din rețea; apă (rezervă incendiu + drencer răcire); canal menajer + **bazin retenție ape stingere contaminate** (NU în emisar); comunicații fibră SCADA/telegestiune; drumuri + platformă intervenție pompieri.

## 10. Mediu și siguranță

**Exploatare normală:** impact redus (fără emisii proces/ape uzate, zgomot <STAS 10009); screening EIA (L 292/2018). **Riscuri + măsuri:** thermal runaway (LFP + BMS + HVAC + detecție gaze), gaze inflamabile (ventilație deflagrație NFPA 68/69), propagare (distanțe UL 9540A/3 m + EI 120), incendiu (stingere + răcire apă + acces 2 laturi), ape stingere (bazin retenție etanș), baterii uzate (reciclare autorizată — recuperare Li/Fe/Cu/Al, Dir. 2006/66 + OUG 5/2015 + Reg. UE 2023/1542, opțional second-life).

## 11. Avize

CU, **ATR (OD/Transelectrica)**, **aviz/licență ANRE** (stocare), **aviz ISU CRITIC** (risc mare, Ord. MAI 129/2016 + raport UL 9540A), acord mediu APM (screening EIA), pompieri/protecție civilă (în ISU), utilități, DSP (după caz).

## 12. Concluzii

BESS Li-ion LFP 25 MW/50 MWh, categoria C, clasa III (γI 1,0), **risc MARE** (LFP reduce severitatea). Cadru = construcții + energie + mediu + **standarde BESS (IEC 62933/62619/63056, UL 9540/9540A, NFPA 855)**. Oportun strategic (SRE + servicii sistem + PNRR/PNIESC). Autorizare condiționată de ATR + ANRE + **ISU (critic)** + mediu + **raport UL 9540A** la PTh. Cele 6 cerințe L10/1995 (B tratată agravant). Se completează cu memoriile de specialitate + piese desenate.
