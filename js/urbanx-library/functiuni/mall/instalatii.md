## 1. Date generale și cadru

Memoriu de instalații DTAC pentru **centru comercial (mall) GLA ~20.000 mp** (galerie+atrium, hipermarket, food-court, cinema multiplex, parcaj subteran). SCD ~52.000 mp. Consum uriaș, complexitate mare.

| Componentă | Su (mp) |
|---|---|
| Galerie + atrium | 6.500 |
| Unități (90-110) | 9.000 |
| Hipermarket | 4.000 |
| Food-court (12-16) | 2.200 |
| Cinema (6-8 săli, 1.400-1.700 locuri) | 2.500 |
| Tehnic/BOH | 3.800 |
| Parcaj subteran | 22.000 |

**Aglomerare (P118-2/NP 068):** galerie 6.500/2,0 (3.250) + unități 9.000/3,0 (3.000) + hipermarket 3.000/2,0 (1.500) + food-court 1.400/1,2 (1.170) + cinema 1.600 locuri = **~10.500 pers vârf**; cu simultaneitate 0,55-0,65 → **~6.500-7.000 pers calcul**. Categoria B, clasa II (γI 1,2), grad I-II RF.

**Normative:** I9-2022, I13-2015, I5-2022, I6, STAS 1478/1795/1846/1343; C107, Legea 372/2005+Mc001, SR EN 16798-1, Ord. 2641/2017, HG 571/2016; OMS 119/2014, Reg. CE 852/2004; P118-1/2/3, NP 061, NP 068, Legea 307/2006; I7-2011, SR EN 62305, SR HD 60364.

## 2. Sanitare

**Necesar apă:** public 6.500×10 + personal 900×40 + food-court 3.000 mese×25 + hipermarket 40 + curățenie 15 + udare 6 = **~237 mc/zi**. **Debit calcul** (E ~3.200): qc = 0,20·√3.200 + 0,004·3.200 = 11,3 + 12,8 = **24,1 l/s (86,4 mc/h)**. Branșament dublu Dn200 + disconnector BA. **178 obiecte sanitare** (NP 068/OMS 119, GS pe niveluri + PMR).

**ACM** descentralizat (food-court boilere/concesiune + hipermarket propriu + GS boilere locale); necesar ~40 mc/zi 60°C; Q_ACM vârf 8 mc/h·ΔT50 = **465 kW**; recirculare ≥55°C (anti-Legionella).

**Canal menajer** q = 24+2 = 26 l/s (coloane PP fonic + ventilare). **Grasă:** separatoare SR EN 1825 food-court NS = 12·1,3·1,0·1,3 ≈ 20 → **2× NS 10 + hipermarket NS 7** (subterane, alarmă BMS). **Pluvială** (acoperiș 13.000 mp, i 300, φ 1,0): Q_p = 300·1,3·1,0 = **390 l/s** → **sistem sifonic** + **bazin retenție ~250 mc** (deversare <100 l/s) + separator hidrocarburi platforme NS 65. **Hidrofor** menajer VSD (3+1, 90 mc/h, 55 mCA).

## 3. Termice

**Necesar ~5,3 MW:** preîncălzire aer proaspăt CTA 3.200 + galerie/atrium 850 + tehnice/BOH 450 + ACM 465 + rezervă 335. **Sursă mixtă:** **pompe căldură aer-apă/apă-apă ~2,8 MW** (COP 3,4, reversibile — frig) + **cazane condensație gaz 2×1.400 kW ~2,8 MW** (vârf/rezervă). Butelie egalizare + distribuitor multi-circuit + pompe VSD; regim 70/55 (cazane) + 45/40 (PC/CTA). Galerie: aer cald CTA + cortine aer intrări; unități: racord + **contorizare individuală** energie termică; reglaj vane 2 căi + compensare exterioară.

## 4. Ventilare-climatizare

**Aer proaspăt** (SR EN 16798 cat. II, galerie 12,5 l/s·pers): Q = 7.000·45 = **315.000 mc/h**; total tratat (+recirculare/climatizare) **~550.000-600.000 mc/h**. **18 CTA** cu recuperare (roți entalpice η≥73% EU 1253/2014): galerie 6×45.000, hipermarket 3×30.000, food-court 2×25.000, cinema 3×20.000, BOH 4×8.000 = **~502.000 mc/h**; ventilatoare EC (SFP ≤1,6), filtre ePM1 55-60%, baterii C/R + umidificare + atenuatoare.

**Unități:** aer proaspăt din CTA galerie (VAV + contorizare) + climatizare proprie (VCV central sau VRF mari); **contorizare individuală**. **Food-court:** hote profesionale (filtre + UV/electrostatic) + canal grăsimi inox + ventilator F400 + aport 85% make-up încălzit (depresiune anti-miros); exhaustare ~90.000 mc/h. **Cinema:** 8,5 l/s·loc displacement + VAV pe CO₂; Q = 1.600·8,5·3,6 = 48.960 mc/h. **Parcaj:** **jet-fans** reversibile + senzori CO (30/100 ppm) + NO₂, 6 sch/h; **desfumare F400** (compartiment fum ≤2.600 mp, 3-6 vol/h).

**DESFUMARE ATRIUM (critic, SHEVS SR EN 12101):** volum ~35.000 mc, strat liber ≥2,5 m peste ultimul nivel. Foc proiectare HRR 5 MW (Qc 3.500 kW, Y 12 m): ṁ = 0,071·Qc^⅓·Y^5/3 + 0,0018·Qc = 67,9 + 6,3 ≈ **74 kg/s**; la 300°C (ρ 0,62) → V̇ = 74/0,62 ≈ **119 mc/s = 428.000 mc/h** → **4 ventilatoare F400 pe terasă** (4×110.000, unul rezervă) + aer compensator parter (v <5 m/s) + **cortine de fum DH60** pe niveluri; comandă detecție + manual pompieri + grup electrogen; verificare CFD la DDE.

## 5. Frig

**Frig confort ~5,85 MW:** galerie/atrium 2.100 + hipermarket 700 + food-court 900 + cinema 650 + unități 1.500. **3 chillere 1.400 kW** (R1234ze/R513A GWP redus, EER ≥3,2, SEER ≥5,5, free-cooling) + **PC reversibile ~1.500 kW** + dry-coolers/turnuri (anti-Legionella). **Frig alimentar hipermarket ~1,2 MW CO₂ transcritic R744** (MT +2/+4 750 kW + LT −22 450 kW) cu **recuperare căldură** (gaz cald → ACM/încălzire 60-70°C) + vitrine cu uși (−30-40%).

## 6. Electrice

**Bilanț ~8,0 MW** (Pi 12.000, Pc ~7.970): chillere+PC 2.320 + frig alimentar 468 + CTA/ventilare/desfumare 1.015 + iluminat 1.080 + scări rulante/lifturi 372 + prize chiriași 1.440 + hipermarket 630 + cinema 312 + pompe/slabi 330. cos φ 0,95 → **S ~8.390 kVA**. **3 posturi trafo** (PT1 frig 2×1.600 + PT2 galerie 2×1.600 + PT3 hiper/parcaj 2×1.250 = **~8.900 kVA**, MT 20 kV buclă, rezervă N-1).

**Distribuție:** TGJT/post withdrawable + selectivitate ZSI; **tablouri chiriași cu contorizare individuală** (Modbus); busbar vertical + cabluri LSZH + **E90/PH90** securitate. **Grup electrogen 2×1.000 kVA** (AAR <15 s, 8h) — pompe incendiu, desfumare, iluminat securitate, lift pompieri, BMS/detecție; **UPS 2×200 kVA** (detecție, EVAC, CCTV, servere, casierii). **Priză pământ R ≤1 Ω** + **paratrăsnet nivel II** (SR EN 62305, PDA/Faraday, coborâri ≤20 m, SPD 1+2/2+3).

## 7. Iluminat (NP 061)

Galerie 200-300 lx (UGR 22, 6-8 W/mp), atrium 300+scenografic, unități 300-500 (10-15 W/mp), food-court 200, cinema foaier 150/săli 50-100 dimming, parcaj 75/20, BOH 300-500. LED ≥130 lm/W + DALI + senzori (atrium daylight dimming). **Securitate (autonomie ≥1h, grup):** evacuare ≥1 lx ax (5 la critice), antipanică ≥0,5 lx (galerie/atrium/food-court), continuarea lucrului (casierii/dispecerat), marcare PSI; comutare <5 s (0,5 risc).

## 8. PSI (P118-2/3 — miză maximă)

**Sprinklere GENERALIZATE** (SR EN 12845): OH3 galerie/unități (5 mm/min pe 260 → Q 21,7, real ~35 l/s), HHS ESFR depozit hipermarket, OH2 parcaj; **grup pompare** (principală electrică + pilot + rezervă Diesel). **Hidranți interiori** 2 jeturi 2×2,1 l/s (rază ≤30) + coloane + **exteriori 40 l/s** inelar.

**Rezervă apă incendiu:** Q_inc = sprinklere 35 + HI 4,2 + HE 40 = **79,2 l/s**; V = (35·60 + 4,2·10 + 40·180)·0,06 = 9.342·0,06 ≈ 560 → **rezervor 650 mc** (compartimentat, completare <24h).

**Detecție adresabilă redundantă** (optice + termice bucătării + **VESDA aspirativ atrium** + butoane). **Alarmare vocală zonată EVAC (SR EN 54-16/24)** obligatoriu (evacuare fazată, STI ≥0,5); interfață desfumare + oprire CTA + deblocare acces + lifturi parter + oprire scări rulante. **Desfumare:** atrium (§4, ~428.000 mc/h) + galerii + parcaj + case scări presurizate (20-50 Pa EN 12101-6).

## 9. Curenți slabi și BMS

**CCTV** 350-450 camere IP (NVR ≥30 zile + analytics + LPR parcaj) + **control acces** (deblocare la incendiu) + efracție + **rețea fibră redundant** + WiFi + telefonie IP + **sonorizare PA** (integrat EVAC prioritar) + **signage digital** + **ghidare parcare PGS** (senzori + afișaje locuri libere). **BMS** (BACnet/IP + Modbus, dispecerat 24/7): HVAC (CTA/chillere/PC/VAV/free-cooling) + **contorizare energie pe chiriași** + pompe/rezervoare/separatoare (alarmă) + iluminat DALI + **mall management (CMMS, KPI)** + interfață detecție (doar monitorizare, comanda PSI independentă).

## 10. nZEB (Legea 372/2005)

Recuperare CTA η≥73% (−60% termic aer) + recuperare frig alimentar (CO₂ → ACM/încălzire) + PC reversibile (SCOP 3,4/SEER 5,5) + free-cooling (−15-20%) + LED DALI (−55%) + vitrine cu uși (−30-40%) + BMS (−8-12%) + cortine aer + anvelopă C107. **Fotovoltaic acoperiș** (util ~7.500 mp): P = 7.500·0,21 = **~1.575 kWp**; E = 1.575·1.150 ≈ **1,81 GWh/an** (autoconsum, 10-14% din consum electric) + **stații EV ≥10% locuri** (EPBD).

## 11. Concluzii și verificare

| Indicator | Valoare |
|---|---|
| Apă mediu / debit calcul | 237 mc/zi / 24 l/s |
| Debit incendiu / rezervă | 79 l/s / 650 mc |
| Termic / frig confort / frig alimentar | 5,3 / 5,85 / 1,2 MW |
| Aer proaspăt vârf | 315.000 mc/h |
| Desfumare atrium | 428.000 mc/h |
| Electric cerut | 8,0 MW (8.390 kVA) |
| Posturi trafo / grup | 3 (8.900 kVA) / 2×1.000 kVA |
| Fotovoltaic | 1,58 MWp (1,81 GWh/an) |

Instalații mall (peak ~10.500, calcul ~7.000 pers) cu surse sinergetice (PC reversibile + recuperare frig + FV + free-cooling) → nZEB. **Verificare (Legea 10/1995)** verificatori atestați MDLPA: **Is** (sanitare/gaze), **It** (termice/ventilare/climatizare/frig), **Ie** (electrice/paratrăsnet/iluminat securitate), **cerința C** (securitate incendiu — scenariu Ord. 129/2016). **Avize:** **ISU** obligatoriu (HG 571/2016 — aviz proiectare + autorizație PIF), energie MT, gaze, apă-canal, mediu/ANAR, DSVSA (food). Detaliere breviare/scheme/planuri + CFD desfumare la PT+DDE.
