## 1. Date generale și specific

Memoriu de instalații DTAC pentru **bloc de locuințe colective S+P+4E, 40 apartamente, subsol tehnic + parcaj**. Tratează sanitare, termice, gaze, ventilare-climatizare, electrice (tari+slabi), PSI, nZEB.

**Cadru normativ:** I9/2015, I13/2015, I5/2010, I7/2011, NP 061/2002, P118-2/2013, P118-3/2015, NTPEE-2018, OMS 119/2014, C107/2005, Legea 372/2005, Legea 121/2014 (eficiență energetică — contorizare individuală).

| Element | Valoare |
|---|---|
| Regim | S+P+4E, 5 niveluri supraterane |
| Apartamente | 40; H liber 2,70 m; Sc ~620 mp; Sd ~3.400 |
| Parcare subsol | 22 locuri; boxe 40 |

**Utilizatori (I9):** garsonieră 1,5 pers ×8 + 2cam 2,5×16 + 3cam 3,5×12 + 4cam 4,5×4 = **112 persoane**.

**Contorizare individuală** (Legea 372 + 121/2014): apă rece, ACM, energie termică, gaze, energie electrică — contor/apartament pe palier. **Vârfuri:** dimineața 06:30-08:30 + seara 18:00-22:00.

## 2. Instalații sanitare (I9/2015)

**Apă rece** din rețea publică (cămin + contor general), H_disp 2,5 bar. H_nec la etaj 4 ≈ 26 mCA > H_disp → **hidrofor turație variabilă** (2 pompe 1A+1R + vas expansiune) în subsol.

**Necesar:** Q_zi_med = 112×120 = 13.440 l/zi; Q_zi_max = ×1,35 = 18,14 mc/zi; Q_orar_max = (18,14/24)×2,0 = **1,51 mc/h**. Debit de calcul q_c = a·c·√E + 0,004·E (locuințe a=0,15).

**Coloane cu contorizare** (3 coloane în ghene): robinet izolare + contor R160 cu impuls + filtru Y + clapetă/apartament; distribuție interioară PP-R/PEX îngropată izolată.

| Coloană | Ap. | q_c (l/s) | Ø | v (m/s) |
|---|---|---|---|---|
| CAR-1/2 | 15 | 0,58 | Dn40 | 1,15 |
| CAR-3 | 10 | 0,48 | Dn32 | 1,05 |
| Colector general | 40 | 0,90 | Dn65 | 1,20 |

**ACM:** preparare individuală în centrala de apartament (instant 45-50°C); alternativ boiler central cu recirculare (retur ≥ 50°C, dezinfecție 60°C anti-Legionella). q_ACM 60 l/pers·zi → 6.720 l/zi.

**Canalizare menajeră** PP fonoabsorbant 3 straturi; q_c = K·√ΣUS (K=0,5 locuințe): coloane WC Dn110, bucătării Dn110, băi Dn90, colector Dn160 (i=2%). Ventilare primară peste acoperiș (+0,50 m) + secundară + aeratoare; sifoane gardă ≥ 50 mm.

**Pluvială:** terasă 620 mp; Q_p = 0,0001·150·620·0,90 ≈ **8,37 l/s**; 3 receptoare + preaplin, 2×Dn110.

## 3. Instalații termice (I13/2015)

**Soluție: centrale termice individuale murale pe gaz, în condensație, etanșe** (contorizare naturală, responsabilizare, fără pierderi pe rețea), 24 kW (garsonieră/2cam), 28-31 kW (3-4 cam), încălzire + ACM instant, evacuare coaxială.

**Necesar (SR 1907, C107, t_e = −18°C):** săli/dormitor 20°C, baie 22°C, bucătărie 18°C, casa scării 10°C.

| Tip | Su (mp) | q (W/mp) | Q_înc (kW) | CT (kW) |
|---|---|---|---|---|
| Garsonieră | 38 | 45 | 1,71 | 24 |
| 2 camere | 55 | 45 | 2,48 | 24 |
| 3 camere | 78 | 42 | 3,28 | 28 |
| 4 camere | 98 | 42 | 4,12 | 31 |

Q_înc cumulat (simult. 0,7) ≈ 82,6 kW (pt racord gaze); comune ~6 kW. Distribuție bitubulară orizontală PEX-Al-PEX îngropată, radiatoare oțel cu cap termostatic (75/60/20°C condensație), port-prosop băi; vas expansiune + supapă/centrală. Contorizare termică = prin contor gaz individual.

## 4. Instalații gaze (NTPEE-2018)

Branșament cu SRM la limită. Coloane oțel în **ghene ventilate dedicate gazului**; la palier/apartament: robinet + **contor G4** + robinet siguranță. Debit/ap (3cam): CT 28kW 3,3 + aragaz 1,1 = ~4,4 mc/h. Coloană bloc: Q = Σ×K_sim(0,25) ≈ **44 mc/h** (racord Dn65, coloană Dn50, racord ap Dn20).

**Siguranță:** detector gaz metan (sus) în bucătărie + centrală, cuplat cu **electrovalvă** (închide la 20% LIE + alarmă). Ventilare: priză aer ≥ 200 cmp jos + evacuare sus, volum ≥ 18 mc bucătărie; centrale etanșe (aer/gaze coaxial exterior).

## 5. Instalații ventilare (I5/2010)

**Apartamente:** ventilare naturală organizată (grile higro + coșuri verticale băi/bucătării tip șuntă). Debite: baie 50, WC 25, bucătărie 90 mc/h; hotă + ventilator higro băi interioare.

**Parcare subsol (dublu rol):** (a) **ventilare CO** 6 vol/h (~10.000 mc/h), senzori CO 50 ppm (treapta 1) / 100 ppm (treapta 2); (b) **desfumare** 10-12 vol/h cu **ventilatoare F400** (400°C/2h), introducere jos + evacuare sus, comandă de la centrala de incendiu + manual pompieri.

**Tehnice/boxe/casa scării:** ventilare naturală/mecanică; casa scării cu desfumare/presurizare (cap. 7).

## 6. Instalații electrice (I7/2011, NP 061)

Branșament trifazat → BMPT → TEG subsol.

**Bilanț puteri:** apartamente 40×8 kW (simult. 0,40) = 128 + comune 9,6 + ventilare parcare 11 + hidrofor 3 + **grup pompare incendiu 30** + ascensor 7,7 + iluminat securitate 3 = **~192 kW**; cos φ 0,92 → I_c ≈ 302 A (întrerupător general 400 A).

**Tablouri:** TEG (întrerupător general, selectivitate, circuit incendiu separat prioritar) + **TE-apartament** cu contor pe palier (RCD 30 mA pe prize/băi, magnetotermice pe circuite). Servicii de siguranță (pompe incendiu, desfumare, iluminat securitate, ascensor) pe circuit protejat la foc + sursă de rezervă.

**Iluminat (NP 061):** comune LED cu senzori (casa scării/holuri 100 lx, tehnice 200, parcare 75 circulație/20 loc). **Iluminat de securitate** autonom (evacuare/antipanică/marcare hidranți, 1-3 h). **Priză de pământ** de fundație R ≤ 1 Ω (comună paratrăsnet) / ≤ 4 Ω, TN-S, echipotențializare. **Paratrăsnet (SR EN 62305):** nivel III (P+4), captare pe terasă + min. 2 coborâri + priză.

## 7. Instalații PSI (P118-2/3)

**Hidranți interiori:** 2 jeturi × 2,1 l/s = **4,2 l/s**, presiune ≥ 2,5 bar, 10 min, rezervă ~2,5 mc; pe fiecare palier; gospodărie apă incendiu (rezervor + pompă activă+rezervă+pilot) subsol + racord pompieri.

**Desfumare:** casa scării — trapă de fum ≥ 1 mp (automat + manual parter) / presurizare; parcare — mecanică F400.

**Detecție (P118-3):** IDSAI cu centrală la parter — parcare + spații tehnice + casa scării/holuri + butoane manuale/palier + sirene. Comenzi: desfumare, oprire ventilare curentă, ascensor la parter, alarmă generală.

**Iluminat de securitate** (cap. 6). **Coloană uscată** Dn75 în casa scării (racord B exterior + robinete C/nivel).

## 8. Curenți slabi

**Videointerfon** (panou apel cu cameră la intrare + post video/apartament + yală electromagnetică). **TV/date/fibră** (coloană cu tub + cutii palier, rack la parter, FTTH). **Control acces** intrare + parcare (yală/cititor, automatizare poartă). Ghene separate de curenți tari (I7).

## 9. nZEB (Legea 372/2005)

**Fotovoltaic comun** ~10 kWp pe terasă (servicii comune, invertor + contorizare bidirecțională/prosumator). **Solar termic** preîncălzire ACM (boiler bivalent). **Eficiență:** LED cu senzori comune, anvelopă nZEB (C107), centrale în condensație, recuperare căldură, contorizare individuală.

## 10. Instalațiile parcajului subteran (sinteză)

| Instalație | Rol | Caracteristică |
|---|---|---|
| Ventilare CO | noxe curent | 6 vol/h, senzori 50/100 ppm |
| Desfumare | fum incendiu | F400, 10-12 vol/h |
| Detecție | semnalizare | detectoare + centrală |
| Iluminat + securitate | vizibilitate/evacuare | LED IP65 + autonom |
| Sprinklere (după caz) | stingere | analizat pe arie/nr. locuri (SR EN 12845, 5 mm/min) |
| Sifoane + separator hidrocarburi | scurgere + reținere uleiuri | înainte de canalizare |

Sprinklere: pentru ~620 mp/22 locuri, corelat cu compartimentarea antifoc; se prevăd unde depășesc pragurile P118-2.

## 11. Concluzii și verificare tehnică

Soluțiile asigură: funcționalitate/confort (OMS 119), contorizare individuală completă (facturare echitabilă), siguranță la incendiu (hidranți + desfumare + detecție + iluminat securitate + coloană uscată + ventilare F400), eficiență nZEB (fotovoltaic + solar + LED + anvelopă), sănătate/mediu (ventilare, separator hidrocarburi, anti-Legionella).

**Verificare tehnică** (Legea 10/1995) verificatori atestați MDLPA: **Is** (sanitare, apă-canal), **It** (termice, gaze, ventilare), **Ie** (electrice, curenți slabi, paratrăsnet). Securitate la incendiu → avizare/autorizare ISU; gaze → verificare ANRE (NTPEE-2018). Breviare complete + planuri + scheme la faza P.Th.; execuție cu personal autorizat ANRE; recepție cu probe (presiune, funcționare, PRAM, priză pământ) în PV.
