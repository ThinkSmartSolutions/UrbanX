# MEMORIU TEHNIC DE INSTALAȚII ELECTRICE + PSI — BESS (DTAC)

## 1. Date generale

Partea centrală (inima + siguranța): arhitectura electrică, protecții DC/AC/MT, BMS/EMS, racord SEN, **PSI specific Li-ion (thermal runaway)**. Capacitate 10-50 MWh. **Flux:** celulă LFP → modul → rack → container DC → **PCS (invertor bidirecțional DC/AC)** → tablou AC JT → trafo JT/MT → celulă MT 20 kV → SEN. BMS/EMS/SCADA + PSI transversale.

**Normative:** I7-2011, PE 155, NTE 001/007, PE 116/124/132; **IEC 62933 (EES, -5-2 siguranță), IEC 62619, IEC 63056, UL 9540 + UL 9540A, NFPA 855, IEC 61439/62271, SR EN 62305**; P118-1/2/3, Ordin MAI 129/2016, HG 571/2016; Cod RET/RED + **Reg. UE 2016/631 (RfG)** + ATR.

## 2. Arhitectura electrică

**Ierarhie baterii:** celulă LFP (3,2 V, 280-314 Ah) → modul (~48-52 V, 5 kWh) → rack (1000-1500 V DC, 200-400 kWh) → container (2-5 MWh). **Conversie:** container DC (1000-1500 V) → **PCS bidirecțional IGBT/SiC** (invertor descărcare DC→AC 0,4/0,69 kV / redresor încărcare; reglaj P/Q, grid-forming/following) → tablou AC JT (IEC 61439) → trafo ridicător 0,69/20 kV → celulă MT (IEC 62271) → racord SEN (ATR).

## 3. Breviar de calcul

**Capacitate:** E_util = N_module·E_modul·DoD; ex. 20 MWh, DoD 90% → **18 MWh utili**; N_module = 20.000/5 = **4.000**. **Putere/C-rate:** P = E·C-rate; 20 MWh × 0,5C = **10 MW** (2h); 1C → 20 MW; FCR cere C-rate mare, arbitraj mic. **Round-trip:** η_RT = η_PCS²·η_baterie·η_trafo·η_aux = 0,98²·0,96·0,99·0,97 = **88,5%** (85-90% LFP; HVAC = consumator auxiliar dominant). **Trafo:** Sn ≥ P/cosφ = 10/0,95 = 10,53 → **12,5 MVA** (sau 2×6,3) +rezervă Q. **Cabluri:** DC I = P/U = 1M/1000 = **1.000 A** (4×240 Cu, ΔU = 2ρLI/S = 0,074% ✓); AC I = P/(√3·U·cosφ) = 1M/(√3·690·0,95) = **881 A**; MT I = S/(√3·U) = 12,5M/(√3·20k) = **361 A**. Scurtcircuit IEC 60909 → **întreruptoare/fuzibile DC dedicate** (Li-ion livrează Isc DC mari).

## 4. BMS + EMS

**BMS (celulă/modul/rack/sistem — prima linie anti-thermal-runaway):** tensiune celulă (LFP 2,5-3,65 V, alarmă over/under) + temperatură (alarmă >45-55°C, oprire prag critic **precursor thermal runaway**) + SOC (10-95%) + SOH (mentenanță predictivă) + balansare + protecție supracurent DC + detecție izolație (IMD). **EMS (instalație):** comandă PCS (setpoint P/Q) + servicii sistem (FCR/aFRR, semnal OTS) + optimizare arbitraj + interfață SCADA/telecontrol + SOH agregat. **SCADA:** IEC 61850/Modbus TCP/DNP3 + telemăsură + SOE.

## 5. Protecții

**DC (critic):** fuzibile DC rapide/rack + întreruptor/contactor DC/container (BMS) + **monitor izolație IMD** (sistem IT) + protecție supracurent/inversare polaritate/arc DC. **AC JT:** disjunctoare (IEC 61439, Icu ≥Ik'') + **SPD tip 1+2** + diferențială/homopolară. **MT 20 kV:** relee numerice 50/51 + 50N/51N + 27/59 + **81 U/O (frecvență — RfG)** + 25 + 67/67N (81+27/59 = conformitate RfG, LVRT/HVRT). **Priză pământ R_p ≤1 Ω** (OL-Zn + electrozi inel + toate masele) + echipotențializare BEP + **paratrăsnet SR EN 62305** (evaluare risc → **LPL I-II** risc ridicat Li-ion, captare + coborâri + SPD coordonate).

## 6. PSI — partea critică (thermal runaway Li-ion)

**Risc:** ambalare termică exotermă (supraîncărcare/supratemperatură/scurtcircuit intern/mecanic) → **off-gas inflamabile+toxice (H₂, CO, CO₂, HF, hidrocarburi) ÎNAINTE de flacără** + explozie/deflagrație + propagare cascadă. LFP mai stabil ca NMC dar UL 9540A/NFPA 855 obligatorii.

**Detecție multi-strat (ordinea fenomenelor):** (1) **gaze off-gas H₂/CO/VOC (cea mai precoce** — înainte de foc → oprire încărcare + ventilație + alertă); (2) temperatură (senzori + cablu liniar LHD + BMS); (3) fum (aspirativ VESDA); (4) CO. Semnalizare centrală P118-3 + **la distanță 24/7**.

**Stingere (controversat — celula degajă O₂ propriu → înăbușirea nu stinge fără RĂCIRE):** **apă deluge/sprinklere (RĂCIRE — singura care oprește propagarea cascadă, NFPA 855)** + aerosol/gaz inert (stinge flacără inițială, risc reaprindere) → strategie **detecție precoce → oprire BMS → răcire apă** + **retenție ape stingere contaminate** (bazin, protecție mediu).

**Ventilație deflagrație (EN 14994):** panouri decompresie la suprapresiune prag → dirijare undă în siguranță; **A_v = f(V, p_red,max, p_stat, K_G)** (K_G mare pt H₂ ~550 bar·m/s → suprafață mare), orientate spre exterior sigur + ventilație mecanică extracție (menține sub **LEL**).

**Compartimentare (UL 9540A/NFPA 855):** distanțe între containere din test propagare (dacă non-propagare → reducere; altfel **min. 3 m**) + pereți EI baterii↔tehnice + distanțe clădiri/drumuri/limite (P118). **E-stop** (exterior + central, deconectare PCS + contactoare DC). **HVAC 20-25°C** (reduce risc + maximizează viață). **Alarmare distanță 24/7**. Autorizare **ISU** (Ord. 129/2016 + HG 571/2016, risc mare) + scenariu securitate.

## 7. Racordare SEN

**ATR** (OD/OTS) + **RfG (Reg. UE 2016/631)** categorii B/C/D: **fault ride-through LVRT/HVRT** + reglaj U/f + comunicație OTS. **Servicii:** **FCR** (secunde) + **aFRR** + suport tensiune Q + rezervă. Protecții interfață (81/27/59) + certificate conformitate la PIF.

## 8. Concluzii + verificare Ie/Ci

| Mărime | Valoare |
|---|---|
| E_util (DoD 90%) | 18 MWh |
| P (0,5C) / round-trip | 10 MW / η_RT 88,5% |
| Trafo | 12,5 MVA |
| Cabluri DC/AC/MT | 1.000/881/361 A (ΔU <1%) |
| Priză / paratrăsnet | R_p ≤1 Ω / LPL I-II |

Arhitectură completă celulă→PCS→trafo→MT→SEN. **BMS** (protecție celulă, prima linie anti-thermal-runaway) + **EMS** (dispecerizare + FCR/aFRR). Protecții DC (fuzibile+IMD) / AC (disjunctoare+SPD) / MT (50/51/27/59/81) + priză ≤1 Ω + paratrăsnet SR EN 62305. **PSI critic Li-ion:** detecție precoce off-gas + stingere prin răcire apă + retenție ape + **ventilație deflagrație EN 14994** + compartimentare UL 9540A + E-stop + HVAC + monitorizare 24/7. Racord ATR/RfG (FCR/aFRR). Cerințe **B (Ci)** + **E (Ie)** + siguranță electrică. **Verificare Ci** (verificator + expert PSI) + **Ie** + **avizare/autorizare ISU**. Detaliere scheme monofilare + scenariu securitate + calcul UL 9540A/EN 14994 la PT.
