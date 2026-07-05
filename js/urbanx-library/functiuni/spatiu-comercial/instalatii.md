## 1. Date generale și cadru

Memoriu de instalații DTAC pentru **supermarket alimentar** (~1.500 mp sală vânzare + depozit + camere frig + back-office), Acd ~2.350 mp, P (+mezanin tehnic).

| Element | Valoare |
|---|---|
| H liber sală | 4,50 m (intrados 5,20) |
| Categoria importanță | C — normală |
| Clasa seismică | III |
| Grad RF | II; risc mediu (depozit combustibile) |

**Aglomerare:** suprafață netă circulabilă 1.500·0,55 = 825 mp; **N public = 825/1,5 = 550 pers** + personal 45 = **~595** → **sală aglomerată** (>200) → cerințe majorate evacuare/desfumare/detecție/stingere.

**Normative:** I9-2022, I13-2015, I5-2010, I7-2011, NP 061, P118-1/2/3, OMS 119/2014, C107, Legea 372/2005+Mc001, SR EN 16798-1, **SR EN 378** (frig), **Reg. UE 517/2014 F-gas**, **Reg. CE 852/2004 HACCP**, SR EN 1825 (separator grăsimi).

## 2. Instalații sanitare

**Apă rece** (branșament DN65 + clapetă antiretur EN 1717): ΣE = 8,0 (8 lavoare public + 12 WC + 4 pisoare + 6 lavoare personal + 4 dușuri + 8 chiuvete tehnologice + 6 spălare pardoseli + 2 recepție); qc = 1,4·√8,0 + 0,004·8,0 = **3,99 ≈ 4,0 l/s**. Necesar zilnic: personal 45×60 + public 550×5 + igienizare 3.500 + spălare 1.200 = **~10,2 mc/zi**. Presiune: H_nec = 0,52 + 1,4 + 0,5 = 2,42 bar < 3,2 → fără pompare menajer (dar **stație pompare pt. hidranți+sprinklere**). PPR/PEX-Al-PEX izolat.

**ACM (anti-Legionella):** boiler bivalent 500 l cuplat la CT + recirculare (retur ≥50°C, dezinfecție 60°C); necesar 45×20 + 3.500 tehnol = 4.400 l/zi la 45°C; P = 500·4,186·45/(3600·2) = **13,1 kW**.

**Canal menajer:** q_ww = 0,7·√35,4 = **4,16 l/s**; coloane DN110 + colector DN160 (1,5%). **Canal tehnologic (carne/pește/lactate):** sifoane pardoseală inox + rigole + **separator grăsimi (SR EN 1825):** NS = 4,0·1,0·1,3·1,0 = 5,2 → **NS 7** (nămol 1.400 l); condens camere frig cu **gardă hidraulică încălzită** (anti-îngheț negativ). **Pluvială** (2.100 mp, i 300, φ 1,0): Q_p = 300·2.100·1,0/10.000 = **63 l/s** → **8 receptoare** (~8 l/s Ø110) + preaplinuri avarie + coloane DN110/125.

## 3. Instalații termice

**Sursă:** **2 cazane condensație gaz 120 kW cascadă** (ηs 106%) + **recuperare de la centrala frigorifică** (bază — cap.4.5, cazane pe vârf/backup).

**Necesar** (SR 1907/C107, te −15°C): sală vânzare +19 (1.500×55 = 82,5) + depozit +12 (320×45 = 14,4) + back-office +20 (7,2) + vestiare +22 (3,4) = transmisie 107,5 + aer proaspăt 65 = **~172,5 kW**. Regim **55/45°C** (condensație + recuperare frig), reglaj după curbă exterioară + BMS. Corpuri: baterii CTA + destratificatoare sală, aeroterme depozit (2×12), radiatoare termostatice birouri, VCV vestiare, **perdea de aer caldă intrare** (2×9 kW).

## 4. Ventilare-climatizare

Cat. II (SR EN 16798): sală 24-26/19-21°C, 40-60% UR, aer proaspăt 15 mc/h·pers; depozit +12 ventilat; GS evacuare.

**Aer proaspăt sală** = 550×15 = **8.250 mc/h** (guvernant vs. 6.000 pe suprafață). **Sarcină răcire sală:** oameni 49,5 + iluminat LED 22,5 + solar/anvelopă 38 + aer proaspăt 42 = **~152 kW**; debit aer = 152.000/(1,2·1,005·10) ≈ **12.600 mc/h** → **2 CTA × 7.000** cu **recuperator entalpic η≥75%** + baterie răcire (frig) + încălzire (apă + preîncălzire recuperare frig) + filtre ePM1 50% + **VAV pe CO₂**. Distribuție anemostate + evacuare grile, <45 dB(A).

**Depozit:** 1,5 sch/h = 2.400 mc/h. **Back-office** 240 mc/h + **GS** evacuare 25 mc/h·WC.

**RECUPERARE CĂLDURĂ DE LA FRIG (esențial):** Q_cond = Q₀ + P_el = 210 + 68 = **278 kW**; recuperabil util 60-75% = **170-200 kW** → acoperă practic integral încălzirea sălii (82,5) + post-încălzire aer + preîncălzire ACM; **economie 40-55% gaz**. Schemă: condensatoare → schimbător desuperheat → tampon 1.000 l → baterii CTA + boiler ACM (prioritate recuperare > cazane, BMS).

## 5. Instalația frigorifică comercială (inima tehnică)

Două paliere: **MT** (vaporizare −8…−10, spațiu +2/+4: vitrine lactate/carne, camere frig) + **LT** (−32…−35, spațiu −18/−22: congelate). **Agent: CO₂ transcritic R744 (GWP 1)** booster MT+LT — fără taxă F-gas + recuperare la temp. înaltă (gaze 80-100°C, sinergie cu încălzirea). Cameră tehnică cu **detector CO₂** + ventilare avarie (SR EN 378).

| Componentă | Caracteristici |
|---|---|
| Rack booster CO₂ | compresoare MT (4, unul inverter) + LT (2) |
| Q₀,MT | ~160 kW (−10/+35) |
| Q₀,LT | ~50 kW (−35/−10) |
| Gas cooler | răcit aer, ventilatoare EC, acoperiș |
| Recuperare | desuperheat + condensator (cap.4.5) |

**Sarcină:** vitrine frig pozitiv 40 ml×0,9 (36) + multideck 60 ml×1,1 (66) + camere pozitiv 4×6 (24) + vitrine congelate 25 ml×0,7 (17,5) + camere congelare 2×8 (16) + pește (5) → **MT ~160 + LT ~50 = Q₀ ~210 kW**.

**Mobilier:** multideck cu **uși de sticlă** (−30-40% consum, nZEB), vitrine congelate cu capac, vitrine servite LED; degivrare electrică (LT) / aer (MT). **Camere frig:** pozitiv PU 100 mm, negativ PU 150 mm + **pardoseală încălzită antiîngheț**, uși frig + cortină, vaporizator cu degivrare, termometru exterior, **antiblocare persoane** (deschidere interior + buton + iluminat), sifon condens încălzit.

**HACCP (852/2004):** sondă/vitrină+cameră, înregistrare continuă (arhivă 12 luni, raport DSVSA), **alarmare** (local + SMS la depășire/pană — protejează marfa), integrare BMS. Degivrare optimizată BMS (evită vârfuri electrice).

## 6. Instalații electrice

**Racord MT + PT propriu 630 kVA** (Pi >250 kW). **Bilanț** (Pi 312,5): iluminat sală LED 22,5 + anexe 12 + **frig compresoare 95 (Ku 0,85 → 80,8)** + mobilier frig 45 + climatizare 55 + CT 8 + case/IT 15 + prize 20 + patiserie 30 + ACM 10 → **Pc ~250,5 kW; S = 250,5/0,92 = 272 kVA** (trafo 630 la 43%, rezervă FV). Compensare cos φ 0,80→0,95.

**Tablouri:** TG + TD-FRIG (prioritar grup) + TD-HVAC + TD-ILUM + TD-FORȚĂ + TD-CASE (UPS) + TD-CT + TD-SI (siguranță). **Grup electrogen 250 kVA** (ATS <15 s, autonomie 8h) — **marfa din frig nu se pierde** → prioritar TD-FRIG + TD-SI + TD-CASE; consumatori securitate incendiu (pompe, desfumare, detecție, iluminat securitate) pe sursă siguranță (I7/P118-2) + UPS detecție.

**Priză pământ** de fundare **R ≤ 1 Ω** (comună paratrăsnet); **paratrăsnet LPL III** (SR EN 62305, rețea 15×15 m + coborâri 15 m); **SPD** T1+2 (TG) + T2 (zone) + T3 (IT/frig); TN-S, RCD 30 mA prize.

## 7. Iluminat (NP 061, SR EN 12464-1)

Sală general **500 lx** (UGR 22, Ra ≥80) + **accent marfă 750-1.000 (Ra ≥90)**; case 500; depozit 200; camere frig 150 (etanș rezistent frig); birouri 500; GS 200; exterior 20-50. LED ≥130 lm/W, 4000 K general + spoturi Ra≥90 pe raioane (carne 2700-3000, legume 4000, pâine 3000); DALI + daylight harvesting + program orar. Verificare flux: Φ = 500·1.500/(0,65·0,80) = 1.442.308 lm → ~96 corpuri 15.000 lm ≈ 10,6 kW general. **Securitate (SR EN 1838):** evacuare 1 lx ax + 5 lx PSI, antipanică 0,5 lx, autonomie 1h, corpuri cu acumulator + supraveghere adresabilă.

## 8. PSI (P118-2/3)

Sală aglomerată 595 pers + depozit q>840 MJ/mp → complet. **Sprinklere (SR EN 12845, obligatorii S>600 mp + depozit):** OH3 sală (5 mm/min pe 260 mp → Q = **21,7 l/s**), HHS3 depozit (7,5-12,5 mm/min); **rezervor incendiu propriu ~200-300 mc** (sprinkler 60 min + hidranți int. 10 + ext. 3h) + **stație pompare** (principală electrică + pilot + rezervă Diesel/grup). **Hidranți:** interiori 2 jeturi 2×2,1 l/s + exteriori 20 l/s (≤100 m).

**Detecție adresabilă (P118-3):** optice sală/depozit/back-office/tehnice + termice patiserie + **aspirative ASD depozit rafturi înalte** + butoane (≤30 m) + sirene+optic; integrare oprire ventilație + desfumare + deblocare acces + transmisie pompieri. **Desfumare:** trape acoperiș **A ≥1% = 15 mp** + cantoane ≤1.600 mp (ecrane ≥0,50) + aer compensare jos; depozit mecanic. **EVAC (SR EN 54-16)** obligatoriu sală aglomerată + iluminat securitate.

## 9. Curenți slabi

Case/POS (UPS, PCI-DSS) + **antifurt EAS** (antene AM/RF + dezactivatoare) + CCTV IP (NVR ≥30 zile, GDPR) + control acces (deblocare la alarmă) + rețea date Cat.6/6A (rack climatizat) + sonorizare/PA integrată EVAC + **afișaj electronic preț ESL** (wireless) + **BMS**. Curenți slabi în jgheaburi separate de forță (EMC).

**BMS (nucleul integrării):** monitorizare temperaturi frig HACCP + optimizare recuperare frig→încălzire + reglaj HVAC (VAV CO₂) + iluminat DALI + degivrare (anti-vârf) + contorizare energetică + interfață detecție (doar semnalizare, comanda SSI independentă).

## 10. nZEB (Legea 372/2005)

**Recuperare frig** 170-200 kW gratuit (−40-55% gaz) + **vitrine cu uși sticlă** (−30-40% frig) + LED DALI daylight (−55%) + recuperare CTA η≥75% + compresoare inverter (−20-25%) + **CO₂ R744** (GWP 1) + BMS + termoizolație C107. **Fotovoltaic acoperiș:** util ~1.500 mp → potențial 300 kWp, adoptat **150-200 kWp** (autoconsum >90% — sarcina frig diurnă coincide cu producția solară), E 220.000-280.000 kWh/an. **Sinergia frig↔soare↔încălzire** face supermarketul consumator ideal nZEB.

## 11. Concluzii și verificare

| Instalație | Soluție | Capacitate |
|---|---|---|
| Sanitare | branșament + boiler 500 l + separator NS 7 | qc 4,0 l/s |
| Canalizare | menajer + tehnologic + pluvial | 63 l/s (8 receptoare) |
| Termice | 2 cazane 120 kW + recuperare frig | 172,5 kW |
| HVAC | 2 CTA 7.000, recuperare entalpică | 14.000 mc/h; 152 kW răcire |
| **Frig** | **rack CO₂ transcritic MT+LT** | **Q₀ 210 kW** |
| Recuperare frig→încălzire | desuperheat + tampon 1.000 l | 170-200 kW |
| Electrice | PT 630 kVA + GE 250 kVA | Pc 250 kW |
| Iluminat | LED 500-750 lx DALI | 22,5 kW |
| PSI | sprinkler + hidranți + IDSAI + desfumare + EVAC | Q sprk 21,7 l/s |
| nZEB | recuperare frig + LED + FV 150-200 kWp | economie majoră |

**Verificare (Legea 10/1995)** verificatori atestați MDLPA: **Is** (sanitare), **It** (termice/ventilare/frig/gaze), **Ie** (electrice + paratrăsnet + curenți slabi), **Cc** (securitate incendiu). **Avize:** **ISU** (scenariu securitate, obligatoriu aglomerare), energie (MT+PT), gaze (I6/NTPEE), apă-canal (+ ape tehnologice separator), mediu/ANAR, **DSVSA** (lanț frig HACCP), F-gas. Element definitoriu: **integrarea frig↔încălzire prin recuperare** → nZEB + protecția lanțului de frig (grup electrogen dedicat). Detaliere breviare/scheme la PT.
