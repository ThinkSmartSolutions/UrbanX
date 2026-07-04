## S1. Obiectul suplimentului de proiect tehnic (execuție structură)

Supliment P.Th. + D.E. la memoriul de rezistență DTAC pentru **creșă/grădiniță P+1, ~90 copii**. NU reia datele generale/clasa de importanță/sistemul structural (rămân din DTAC), ci detaliază EXECUȚIA: note de calcul pe elemente, planuri de armare descrise, tehnologia betonului (NE 012), detalii de armare seismică, toleranțe, caiet de sarcini.

Reglementări: P100-1/2013, SR EN 1992-1-1 + AN, NE 012-1/2022 (producere beton), NE 012-2/2010 (execuție), NP 007, CR 0/2012, SR EN 206 + SR 13510.

Structură: cadre spațiale b.a. monolit, P+1, DCM, fundare pe grinzi de fundare. **Materiale:** C25/30 (suprastructură + fundații), C8/10 egalizare, **B500C** (bare — clasa C obligatorie în zone seismice), S500 plase.

## S2. Note de calcul — armarea stâlpilor

Stâlpi la compresiune excentrică biaxială (N + Mx + My din combinația seismică). Armătura longitudinală din diagrama de interacțiune; transversală din forța tăietoare + confinare seismică.

Secțiuni: S1 40×40 (curenți), S2 45×45 (colț/marginali), S3 50×50 (interiori mari).

**Stâlp S1 40×40 parter:** NEd = 980 kN; νd = 980.000/(400·400·16,67) = **0,367 ≤ 0,65** (DCM). As,nec = 18,4 cmp → **8Ø20** (25,13 cmp), ρ = 1,57% (între 1,0% și 4,0%). Forță tăietoare VEd = 78 kN; etrieri Ø8/100 zonă critică → VRd,s = 96 kN > 78. Zonă critică lcr = max(400; 500; 450) = **500 mm**; etrieri s ≤ min(bo/3; 125; 6dbL) = 100 mm.

| Tip | Secțiune | Nivel | NEd (kN) | νd | Arm. long. | ρ (%) | Etrieri z. critică | lcr (mm) |
|---|---|---|---|---|---|---|---|---|
| S1 | 40×40 | Parter | 980 | 0,367 | 8Ø20 | 1,57 | Ø8/100 | 500 |
| S1 | 40×40 | Etaj | 520 | 0,195 | 8Ø18 | 1,27 | Ø8/100 | 500 |
| S2 | 45×45 | Parter | 1310 | 0,388 | 8Ø22 | 1,50 | Ø10/100 | 500 |
| S3 | 50×50 | Parter | 1680 | 0,403 | 12Ø22 | 1,82 | Ø10/100 | 500 |

Acoperire cnom = 30 mm (XC1). Înnădiri doar în afara zonelor critice, decalate (max. 50%).

## S3. Note de calcul — grinzi

Grinzi la încovoiere + forță tăietoare; etrieri îndesiți în zonele critice de la capete (DCM).

Secțiuni: GP 30×55 (principale 6,00-6,60 m), GS 25×45 (secundare), GC 25×40 (centuri).

**GP 30×55, L=6,60 m** (C25/30, d=510 mm): câmp MEd = 168 kNm → μ = 0,129 → As = 168×10⁶/(475·434,8) = 813 mmp → **3Ø20** (942 mmp); reazem MEd = 214 kNm → As = 1.061 mmp → **4Ø20** (1.257 mmp). Forfecare VEd,cap = 156 kN; VRd,max = 688 kN (biela OK); etrieri Ø8/100 zonă critică → VRd,s = 203 kN > 156. Zonă critică lcr = 1,0·hw = 550 mm; s ≤ min(hw/4; 24dbw; 150; 8dbL) = 137 → 100 mm; primul etrier ≤ 50 mm de fața reazemului.

| Tip | Secțiune | L (m) | MEd câmp | Arm. câmp | MEd reazem | Arm. reazem | VEd | Etrieri z.critică |
|---|---|---|---|---|---|---|---|---|
| GP | 30×55 | 6,60 | 168 | 3Ø20 | 214 | 4Ø20 | 156 | Ø8/100 |
| GS | 25×45 | 4,50 | 74 | 3Ø16 | 92 | 3Ø16 | 84 | Ø8/100 |
| GC | 25×40 | 3,60 | 42 | 3Ø14 | 54 | 3Ø14 | 58 | Ø8/100 |

Armătură de montaj min. 2Ø14 continuu; bare întinse prelungite cu al = z·cotθ/2.

## S4. Planșee — armare și săgeată

Placă b.a. monolit rezemată pe grinzi, h = 15 cm. **Panou tip 6,00×4,50 m** (d=125 mm, C25/30): pd = 1,35·6,25 + 1,50·3,0 = 12,94 kN/mp. Mx câmp = 13,10 kNm/m → As = 247 mmp/m → **Ø10/200** (393 mmp/m); Mx reazem = 19,13 kNm/m → As = 360 mmp/m → **Ø10/200 călăreți** (lungime 0,25·l = 1.150 mm). As,min = 163 mmp/m. Săgeată: l/d = 4500/125 = 36 ≤ 42 (metoda simplificată SR EN 1992-1-1); fef ≈ 12 mm ≤ l/250 = 18 mm.

| Zonă | h | pd | Rețea inferioară | Bare reazem | Călăreți |
|---|---|---|---|---|---|
| Panou 6,00×4,50 | 15 | 12,94 | Ø10/200 (2 dir.) | Ø10/200 | 1.150 mm |
| Panou 6,00×6,00 | 15 | 12,94 | Ø10/150 | Ø12/150 | 1.500 mm |
| Terasă etaj | 15 | 11,80 | Ø10/200 | Ø10/200 | 1.150 mm |

Goluri (scară, canalizări): bordare 2Ø14/latură.

## S5. Fundații — grinzi de fundare

Grinzi de fundare (tălpi continue) b.a. pe două direcții (rețea), adecvate zonei seismice + clasei II. Beton egalizare C8/10 10 cm.

Secțiuni: GF1 talpă 90×90 cm; GF2 talpă 70×80 cm.

**GF1** (C25/30, d=850 mm): pef = 168/0,90 = **187 kPa ≤ pconv = 200** (fundamentală); seismic 235 ≤ 1,3·200 = 260. M reazem (jos) = 235 kNm → As = 650 mmp → **4Ø18** (1.018 mmp); M câmp (sus) = 148 kNm → **4Ø16** (804 mmp); talpă transversal Ø12/150; etrieri Ø10/200 (150 la stâlpi); armătură de piele 2Ø12/față (h > 700 mm).

| Tip | Talpă×H | pef | M reazem | Arm. jos | M câmp | Arm. sus | Etrieri |
|---|---|---|---|---|---|---|---|
| GF1 | 90×90 | 187 | 235 | 4Ø18 | 148 | 4Ø16 | Ø10/200 |
| GF2 | 70×80 | 165 | 176 | 4Ø16 | 112 | 3Ø16 | Ø10/200 |

Rosturi de turnare doar în câmp (moment minim); mustăți stâlp ancorate pe toată înălțimea grinzii de fundare.

## S6. Scări b.a.

Rampe placă înclinată 15 cm, C25/30, lățime 1,50 m (NP 010 evacuare copii), trepte 15/30 cm, 2 rampe + podest.

**Rampă** (d=125 mm): pd = 1,35·7,265 + 1,50·4,0 = 15,81 kN/mp; Mmax = pd·l²/10 = 27,89 kNm/m → As = 543 mmp/m → **Ø12/150** (754 mmp/m) jos; reazem Ø12/150 călăreți (0,25·l = 1.050 mm); repartiție Ø8/200. **Podest** Ø10/150. **Nod rampă-podest** (colț intrând): armătura NU se continuă pe intrados — bare separate ancorate în masa opusă. **Balustrade min. 1,00 m, interspațiu bare ≤ 10 cm** (siguranță copii), ancorate în beton.

## S7. Tehnologia betonului armat (NE 012)

**Clase beton/expunere:** fundații C25/30 XC2 (Dmax 22, S3, A/C 0,60, ciment 280); stâlpi/grinzi/planșee C25/30 XC1 (S3/S4, A/C 0,65). Beton de la stație autorizată cu declarație de conformitate; interzisă adăugarea de apă pe șantier.

**Punere în operă:** transport ≤ 90 min; turnare de la ≤ 1,5 m (trompe la stâlpi); straturi 30-50 cm; fără rost rece. **Compactare:** pervibratoare (distanță ≤ 50 cm, 5-15 s/punct, fără segregare); rigle vibrante la planșee. **Rosturi de turnare:** în zone de eforturi minime (câmp la grinzi/plăci, fața superioară planșeu la stâlpi); NU în zonele critice; suprafață asperizată + curățată + umezită; nodul stâlp-grindă turnat monolit cu grinzile.

**Tratare (curare):** interior 3 zile (≥15°C)/5 zile (5-15°C); expus normal 4/7 zile; expus intens 7/10 zile — cofraj pe loc/prelate/stropire; fără șoc termic.

**Betonare pe timp friguros** (<+5°C): încălzire agregate/apă, aditivi, protecție; interzis pe strat înghețat. **Timp călduros** (>+30°C): turnare în orele reci, tratare intensivă.

**Decofrare (≥+15°C):** laterale stâlpi/grinzi 2-3 zile (≥2,5 N/mmp); susțineri plăci ≤6 m 14 zile (≥70% fck); susțineri >6 m/grinzi 21-28 zile (≥85%); console 28 zile. Rezistența confirmată prin epruvete de control.

## S8. Detalii de armare seismică

**Nod stâlp-grindă:** etrierii de confinare din stâlp se continuă prin nod (s ≤ 100 mm); limitare dbL/hc; la noduri marginale/colț bare grindă ancorate cu ciocuri 90°. **Zone critice stâlpi:** lcr = 500 mm, etrieri Ø8-Ø10/100 + agrafe; interzisă înnădirea în zone critice. **Zone critice grinzi:** lcr = 550 mm, etrieri Ø8/100, primul la ≤ 50 mm.

**Ancorare (B500C, C25/30, aderență bună):**

| Ø | lb,rqd | lbd întinse | l0 (50% înnădit) |
|---|---|---|---|
| Ø12 | 480 | 460 | 690 |
| Ø14 | 560 | 540 | 810 |
| Ø16 | 640 | 610 | 920 |
| Ø18 | 720 | 690 | 1035 |
| Ø20 | 800 | 760 | 1140 |
| Ø22 | 880 | 840 | 1260 |

Aderență slabă (partea superioară elemente înalte): ×1,43. Îndoire: ≤Ø16 → 4dbL; >Ø16 → 7dbL; ciocuri etrieri 135° cu lungime ≥10dbw. **Detaliul rampă-podest:** bare separate încrucișate ancorate în masa opusă (≥lbd). Acoperiri: XC1 25-30 mm, XC2 fundații 45-50 mm.

## S9. Toleranțe de execuție (NE 012-2, clasa 1)

| Element | Abatere |
|---|---|
| Poziție în plan stâlpi/fundații | ± 10 mm |
| Secțiune stâlpi/grinzi ≤40 cm | ± 8 mm |
| Verticalitate stâlp/nivel | ± 15 mm sau h/300 |
| Verticalitate totală P+1 | max. 25 mm |
| Cota planșeu | ± 10 mm |
| Grosime placă | +10/−5 mm |
| Acoperire stâlpi/grinzi (XC1) | cnom 30 mm, +10/−5 |
| Acoperire fundații (XC2) | cnom 45 mm |
| Distanța între bare/etrieri | ± 10 mm |
| Lungime ancorare/suprapunere | ≥ proiect (fără reduceri) |

Acoperirea asigurată OBLIGATORIU cu distanțieri certificați (nu resturi de armătură/agregate).

## S10. Caiet de sarcini — structură

**Materiale:** beton de la stație autorizată (bon transport: clasă, expunere, Dmax, consistență, oră malaxare; declarație conformitate SR EN 206/SR 13510); oțel B500C clasa C (certificat SR EN 10080, marcaj, probe tracțiune + îndoire-dezdoire); cofraje curate + unse + rezemate.

**Plan de control:** recepție beton proaspăt (fiecare transport), prelevare epruvete (1 set/50 mc), recepție oțel (fiecare lot), recepție armare înainte de turnare (diametre/poziții/etrieri/acoperiri/ancoraje — PV), recepție cofraj (PV), betonare (registru), tratare (registru), decofrare (PV + epruvete).

**Faze determinante** (avizate ISC, cu proiectant + RTE + diriginte + ISC): FD1 recepția terenului de fundare; FD2 armarea fundațiilor; FD3 armarea stâlpi/grinzi parter; FD4 armarea planșeu parter; FD5 armarea structură etaj; FD6 recepția structurii la roșu.

**Recepție:** pe baza PV faze determinante + lucrări ascunse, buletine beton/oțel, verificarea toleranțelor, cartea tehnică. Nu se trece la faza următoare fără recepția celei anterioare; remedierile pe baza soluției proiectantului. Interzisă modificarea secțiunilor/armării/claselor fără dispoziție scrisă verificată A1. Ordinea: infrastructură → suprastructură parter → planșeu parter → suprastructură etaj → planșeu etaj → scări (P100-1/2013, SR EN 1992-1-1, NE 012, NP 007, CR 0/2012).
