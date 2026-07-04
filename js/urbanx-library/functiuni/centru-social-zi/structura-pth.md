## PTh-R.1 — OBIECTUL SUPLIMENTULUI DE FAZĂ PTh (REZISTENȚĂ)

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție) la Memoriul de rezistență, elaborat în conformitate cu **HG 907/2016** privind etapele de elaborare a documentațiilor tehnico-economice. El aprofundează faza DTAC (deja redactată — sistem structural, materiale, acțiuni, spectru seismic P100-1/2013, combinații de încărcări, fundare, predimensionare, comportare la foc), aducând structura la nivelul de detaliere necesar EXECUȚIEI.

Obiectivul de investiție: **CENTRU SOCIAL DE ZI**, regim de înălțime **P+1**, suprafață construită desfășurată ≈ 900 mp, structură în **cadre de beton armat** (stâlpi + grinzi + plăci), infrastructură pe fundații izolate cu grinzi de echilibrare, beton **C25/30**, oțel **B500B** (bare) și **B500A** (plase/etrieri accept.), clasa de importanță **II** (γI,e = 1,2 — clădire de asistență socială cu aglomerări de persoane vulnerabile).

Documentul NU repetă conținutul DTAC și NU se suprapune cu Caietul de sarcini (elaborat separat). Structura capitolelor:

| Capitol | Conținut |
|---|---|
| PTh-R.2 | Breviar de calcul complet — dimensionarea TUTUROR elementelor |
| PTh-R.3 | Planuri de armare + extras de armătură (consum total oțel) |
| PTh-R.4 | Detalii de armare (noduri, ancoraje, înnădiri, confinare) |
| PTh-R.5 | Tehnologia de execuție a structurii |
| PTh-R.6 | Plan de control al calității |
| PTh-R.7 | Faze determinante detaliate |
| PTh-R.8 | Program de urmărire în timp (P130) + monitorizare tasări |
| PTh-R.9 | Ipoteze model de calcul EF + validare |

### Date generale de proiectare (recapitulare parametri de bază)

| Parametru | Valoare | Sursă |
|---|---|---|
| Beton suprastructură | C25/30 | SR EN 1992-1-1 |
| fck | 25 N/mmp | — |
| fcd = fck/1,5 | 16,67 N/mmp | γc = 1,5 |
| fctm | 2,6 N/mmp | Tab. 3.1 |
| Ecm | 31.000 N/mmp | — |
| Beton fundații | C25/30 | NP 112 |
| Beton egalizare | C8/10 | — |
| Oțel longitudinal | B500B, fyk = 500 N/mmp | ST 009 |
| fyd = fyk/1,15 | 434,8 N/mmp | γs = 1,15 |
| Es | 200.000 N/mmp | — |
| Clasa de expunere elem. supraterane | XC1 | Tab. 4.1 SR EN 1992 |
| Clasa de expunere fundații | XC2 | contact sol/apă |
| Acoperire nominală cnom stâlpi/grinzi | 30 mm | XC1 + Δcdev 10 mm |
| Acoperire nominală fundații | 45 mm | XC2 + teren |
| ag (accel. teren proiectare) | 0,25 g (ex. Iași) | P100-1/2013 |
| Tc (perioadă de colț) | 0,7 s | zona spectrală |
| Clasa de ductilitate | DCM (medie) | P100-1 |
| q (factor comportare cadre DCM) | 3,9 (αu/α1 = 1,3) | §5.2.2.2 |

---

## PTh-R.2 — BREVIAR DE CALCUL COMPLET

### PTh-R.2.1 Convenții și metodologie

Toate eforturile provin din analiza spațială în element finit (SAP2000/ETABS — v. PTh-R.9). Dimensionarea la **starea limită ultimă (SLU)** urmează metoda coeficienților parțiali, iar verificările la **starea limită de serviciu (SLS)** (fisurare wk ≤ 0,3 mm, săgeți) conform SR EN 1992-1-1 §7.

Combinația fundamentală (persistentă): **1,35·G + 1,5·Q**
Combinația seismică: **G + ψ2·Q + γI,e·E** (ψ2 = 0,3 pentru încăperi curente; γI,e = 1,2).

Aria minimă de armare la încovoiere:
**As,min = 0,26·(fctm/fyk)·bt·d ≥ 0,0013·bt·d** (§9.2.1.1)

Aria maximă: **As,max = 0,04·Ac**.

### PTh-R.2.2 Încărcări unitare adoptate

| Element | Încărcare permanentă gk | Utilă qk | Sursă |
|---|---|---|---|
| Placă planșeu curent (25 cm) | g.p. 3,75 + pardoseli/tavane 1,80 = 5,55 kN/mp | 3,0 kN/mp (spații publice cat. C1) | SR EN 1991-1-1 |
| Placă terasă necirculabilă | g.p. 3,75 + termo-hidro 2,50 = 6,25 kN/mp | 0,75 (întreținere) + zăpadă 1,6 | SR EN 1991-1-3 |
| Pereți despărțitori (echivalent) | 1,20 kN/mp | — | §6.3.1.2 |
| Închideri exterioare (pe grindă) | 8,0 kN/m (GVP 30 cm + termosistem) | — | — |

Încărcarea de calcul pe placa curentă:
**qEd = 1,35·(5,55+1,20) + 1,5·3,0 = 1,35·6,75 + 4,5 = 9,11 + 4,5 = 13,61 kN/mp**

### PTh-R.2.3 Dimensionarea plăcilor

Plăci pe contur, rezemate pe grinzi. Grosime adoptată **hf = 15 cm** (câmpuri curente) și **13 cm** (câmpuri mici). d = 15 − 3 (cnom+Ø/2) ≈ 12,5 cm.

**Verificare grosime (deformabilitate) placă P1** (câmp 5,40 × 6,00 m, rezemare pe contur):
Raport L/d admis ≈ 26 (placă continuă). L/d = 5400/125 = 43,2 → depășire → placa lucrează pe 2 direcții, se verifică cu coeficienți Marcus/tabele. Pentru λ = ly/lx = 6,00/5,40 = 1,11:

Momente în câmp (metoda tabelară, placă simplu rezemată pe contur, coef. α):
- **mx = αx·qEd·lx² = 0,042·13,61·5,40² = 0,042·13,61·29,16 = 16,67 kNm/m**
- **my = αy·qEd·lx² = 0,034·13,61·29,16 = 13,49 kNm/m**

Armare direcția scurtă (x), d = 12,5 cm:
μ = MEd/(b·d²·fcd) = 16,67·10⁶/(1000·125²·16,67) = 16,67·10⁶/(2,60·10⁸) = 0,064
ω ≈ 0,066 → As = ω·b·d·fcd/fyd = 0,066·1000·125·16,67/434,8 = **316 mmp/m**
As,min = 0,26·(2,6/500)·1000·125 = 169 mmp/m → guvernează calculul.
**Adoptat: Ø10/25 (As,ef = 314 mmp/m) — verifică** ✔ (Ø10/20 = 393 la reazeme).

Tabel sinteză plăci:

| Placă | Câmp (m) | λ | mx câmp (kNm/m) | Armare câmp x | Armare reazem | hf |
|---|---|---|---|---|---|---|
| P1 (birouri) | 5,40 × 6,00 | 1,11 | 16,67 | Ø10/20 | Ø10/15 | 15 |
| P2 (sală multifuncț.) | 6,00 × 7,20 | 1,20 | 22,4 | Ø12/20 | Ø12/15 | 16 |
| P3 (hol/circulații) | 3,00 × 5,40 | 1,80 (1 dir.) | 11,8 | Ø10/20 | Ø10/20 | 13 |
| P4 (grup sanitar) | 3,00 × 3,60 | 1,20 | 8,2 | Ø8/20 | Ø8/15 | 13 |
| Terasă | 6,00 × 6,00 | 1,00 | 15,3 | Ø10/20 | Ø10/15 | 15 |

Armătură de repartiție (dir. lungă): min. 20% din As principal, dar ≥ Ø8/25. Adoptat Ø8/25 la toate plăcile. Se prevede plasă superioară pe reazeme pe lățimea 0,25·L de fiecare parte a grinzii.

### PTh-R.2.4 Dimensionarea grinzilor

Grinzi principale (pe cadre transversale) și secundare (longitudinale). Secțiuni adoptate: **G1 = 30×60**, **G2 = 30×50**, **G3 = 25×45**.

#### Grinda G1 (deschidere 6,00 m, cadru principal, planșeu curent)

Încărcare din placă (bandă aferentă 5,70 m) + g.p. grindă:
qplaca = 13,61 · 5,70 = 77,58 kN/m
g.p. grindă = 0,30·0,60·25·1,35 = 6,08 kN/m
Perete peste grindă (parțial) = 8,0·1,35 = 10,8 kN/m
**qEd,G1 ≈ 94,5 kN/m** (gravitațional)

Moment în câmp (grindă continuă, aprox. reazeme): **MEd = qEd·L²/11 = 94,5·36/11 = 309,3 kNm**
Moment pe reazem: **MEd,r = qEd·L²/9 = 94,5·36/9 = 378 kNm** (dominant + combinația seismică)

Armare câmp G1 (d = 60 − 4 = 56 cm):
μ = 309,3·10⁶/(300·560²·16,67) = 309,3·10⁶/(1,568·10⁹) = 0,197
ω = 0,222 → As = 0,222·300·560·16,67/434,8 = **1430 mmp**
**Adoptat 4Ø22 (As,ef = 1520 mmp)** ✔

Armare reazem G1:
μ = 378·10⁶/1,568·10⁹ = 0,241 → ω = 0,281 → As = 1810 mmp
**Adoptat 5Ø22 (1901 mmp)** — 3 continue + 2 suplimentare pe reazem ✔

Verificare forță tăietoare G1:
VEd = qEd·L/2 = 94,5·6,0/2 = 283,5 kN (+ VEd din capacitate seismică = 1,25·(Mrb,st+Mrb,dr)/L)
VRd,c (fără armătură) ≈ 0,12·k·(100·ρl·fck)^(1/3)·bw·d
k = 1+√(200/560) = 1,60; ρl = 1520/(300·560) = 0,0090
VRd,c = 0,12·1,60·(100·0,009·25)^(1/3)·300·560 = 0,12·1,60·(2,25)^0,333·168000 = 0,192·1,31·168000 = 42.240 N = 42,2 kN < VEd
→ necesită armătură transversală.
Etrieri Ø8/2 ramuri, θ = 45°: VRd,s = (Asw/s)·z·fywd·cotθ
Cerut s: Asw/s = VEd/(z·fywd) = 283500/(0,9·560·434,8) = 283500/219139 = 1,29 mmp/mm
Ø8/2r → Asw = 101 mmp → s = 101/1,29 = 78 mm.
**Adoptat etrieri Ø8/75 în zona critică (2h de la reazem) și Ø8/150 în câmp.** ✔

#### Tabel sinteză grinzi

| Marcă | Secț. (cm) | L (m) | qEd (kN/m) | MEd câmp (kNm) | MEd reazem (kNm) | As câmp | As reazem | Etrieri (zona critică / câmp) |
|---|---|---|---|---|---|---|---|---|
| G1 princ. | 30×60 | 6,00 | 94,5 | 309 | 378 | 4Ø22 | 5Ø22 | Ø8/75 / Ø8/150 |
| G2 princ. | 30×50 | 5,40 | 78,0 | 205 | 250 | 3Ø20 | 4Ø20 | Ø8/100 / Ø8/175 |
| G3 secund. | 25×45 | 4,80 | 42,0 | 96 | 121 | 3Ø16 | 3Ø18 | Ø8/100 / Ø8/200 |
| G-terasă | 30×50 | 6,00 | 70,0 | 190 | 232 | 3Ø20 | 4Ø20 | Ø8/100 / Ø8/175 |
| G-echilibrare | 40×80 | 4,50 | (fund.) | ±280 | — | 5Ø20 sus+jos | — | Ø10/150 |

**Verificare armare minimă/maximă G1:** As,min = 0,26·(2,6/500)·300·560 = 227 mmp < 1520 ✔; As,max = 0,04·300·600 = 7200 mmp > 1901 ✔.

**Verificare ductilitate (P100-1 §5.4.3.1.2):** ρmax în zona întinsă = ρ' + 0,0018·fcd/(μφ·εsy,d·fyd). Se limitează ρ ≤ 0,0179 la DCM. ρG1 = 0,0113 < 0,0179 ✔. Armătura de compresiune ≥ 0,5·As,întins pe reazeme: adoptat 3Ø22 jos continue = 1140 mmp > 0,5·1901 = 950 ✔.

### PTh-R.2.5 Dimensionarea stâlpilor

Stâlpi adoptați **40×40 cm** (curenți) și **45×45 cm** (marginali/central mai încărcat). Beton C25/30. Verificare la compresiune excentrică (N-M) din combinația seismică.

#### Stâlp central S1 (45×45, parter)

Efort axial din suprafață aferentă (6,0 × 5,7 = 34,2 mp × 2 niveluri):
Nfav = (13,61·34,2)·2 + g.p. stâlpi + grinzi ≈ 931 + 90 = **1021 kN** (gravitațional 1,35G+1,5Q)
NEd,seism ≈ 780 kN; MEd,seism (cap stâlp) ≈ 145 kNm.

Verificare N-M (diagramă de interacțiune, C25/30, 45×45, cnom 30):
νd = NEd/(Ac·fcd) = 780.000/(450²·16,67) = 780.000/3,375·10⁶ = 0,231 (< 0,55 limită DCM ✔)
μEd = MEd/(Ac·h·fcd) = 145·10⁶/(202500·450·16,67) = 145·10⁶/1,519·10⁹ = 0,095
Din diagrama de interacțiune pentru νd = 0,23; μ = 0,095 → ωtot ≈ 0,15
As,tot = ω·Ac·fcd/fyd = 0,15·202500·16,67/434,8 = **1165 mmp**
As,min stâlp = 0,01·Ac = 0,01·202500 = 2025 mmp (guvernează — P100-1 impune min 1%)
**Adoptat 8Ø20 (As = 2513 mmp = 1,24%)** ✔ (4 colț + 4 intermediari).

#### Stâlp marginal S2 (40×40, parter)

NEd = 620 kN; MEd = 118 kNm.
νd = 620.000/(400²·16,67) = 620.000/2,667·10⁶ = 0,232
μ = 118·10⁶/(160000·400·16,67) = 118·10⁶/1,067·10⁹ = 0,111 → ω ≈ 0,16
As = 0,16·160000·16,67/434,8 = 982 mmp; As,min = 0,01·160000 = 1600 mmp guvernează.
**Adoptat 8Ø18 (2036 mmp = 1,27%)** ✔

#### Stâlp de colț S3 (40×40, parter)

Solicitare biaxială (Mx și My simultan). NEd = 410 kN; Mx = 95, My = 88 kNm.
Verificare biaxială (§5.8.9): (MEdx/MRdx)^a + (MEdy/MRdy)^a ≤ 1, cu a interpolat (νd = 0,15 → a = 1,10).
Cu 8Ø20 (2513 mmp): MRdx = MRdy ≈ 152 kNm.
(95/152)^1,10 + (88/152)^1,10 = 0,595 + 0,545 = 1,14 > 1 → **majorare la 12Ø20 (3770 mmp)** → MRd ≈ 190 kNm → (95/190)^1,1+(88/190)^1,1 = 0,47+0,43 = 0,90 < 1 ✔.

#### Etrieri de confinare stâlpi (zona critică)

Zona critică lcr = max(hc; lcl/6; 450 mm) = max(450; 3000/6; 450) = 500 mm.
La DCM, distanța etrierilor în zona critică:
s ≤ min(bo/2; 175 mm; 8·dbL) = min(225; 175; 8·20=160) = **150 mm** → adoptat **Ø8/100** (mai sigur).
În afara zonei critice: s ≤ min(20·dbL; bc; 400) = min(400; 400; 400) → **Ø8/200**.
Verificare confinare: α·ωwd ≥ 30·μφ·νd·εsy,d·(bc/bo) − 0,035 (§5.4.3.2.2). Rezultat ωwd,nec = 0,08 < ωwd,ef (Ø8/100, 4 ramuri) = 0,11 ✔.

#### Tabel sinteză stâlpi

| Marcă | Secț. (cm) | Nivel | NEd (kN) | MEd (kNm) | νd | As adoptat | % | Etrieri crit./curent |
|---|---|---|---|---|---|---|---|---|
| S1 central | 45×45 | parter | 1021 / 780* | 145 | 0,23 | 8Ø20 | 1,24 | Ø8/100 / Ø8/200 |
| S1 central | 45×45 | etaj | 510 | 92 | 0,15 | 8Ø18 | 1,00 | Ø8/100 / Ø8/200 |
| S2 marginal | 40×40 | parter | 620 | 118 | 0,23 | 8Ø18 | 1,27 | Ø8/100 / Ø8/200 |
| S3 colț | 40×40 | parter | 410 | 95/88 biax | 0,15 | 12Ø20 | 2,36 | Ø8/100 / Ø8/175 |
| S4 curent | 40×40 | parter | 540 | 105 | 0,20 | 8Ø16 | 1,00 | Ø8/100 / Ø8/200 |

*seismic. **Verificare stâlp puternic-grindă slabă (§5.4.2.2):** ΣMRc ≥ 1,3·ΣMRb la fiecare nod. Nod S1: ΣMRc = 2·152 = 304; ΣMRb = 1,3·(155+120) → 1,3·275 = 357,5. **304 < 357,5 → NEROBUST** → majorare S1 la 12Ø20 (MRc = 190·2 = 380 > 357,5 ✔). *Corectură adoptată în planuri.*

### PTh-R.2.6 Dimensionarea scării

Scară din beton armat, rampe drepte, vang plan (placă înclinată). Grosime placă rampă 15 cm. Deschidere pe orizontală 3,60 m, unghi 30°.
qEd,scara = 1,35·(g.p. placă+trepte 6,5) + 1,5·4,0 (cat. scări) = 8,78 + 6,0 = 14,78 kN/mp (pe proiecție orizontală).
MEd ≈ qEd·L²/8 = 14,78·3,6²/8 = 23,94 kNm/m.
As = 23,94·10⁶/(0,9·125·434,8) = 490 mmp/m → **Ø12/20 (565 mmp/m)** la partea inferioară.
Armătură superioară la reazeme (podest) Ø10/20; repartiție Ø8/25. Podestele se armează ca plăci, reazem pe grinzi de podest 25×40 (3Ø16 jos, 3Ø16 sus).

### PTh-R.2.7 Dimensionarea pereților (casa scării / lift)

Perete de beton armat b = 20 cm, l = 3,0 m, în jurul casei scării, cu rol de rigidizare seismică.
NEd = 850 kN, MEd (bază) = 1250 kNm, VEd = 210 kN.
Armare verticală distribuită: ρv,min = 0,25% → As = 0,0025·200·3000 = 1500 mmp/m per față → Ø10/25 pe două fețe.
Bulbi (elemente de margine) l = 0,15·lw = 450 mm, armare concentrată **6Ø16 + etrieri Ø8/100**.
Verificare forfecare: VRd,max = 0,3·(1−fck/250)·bw·z·fcd = 0,3·0,9·200·(0,8·3000)·16,67 = mult > 210 kN ✔.
Armare orizontală ρh = 0,20% → Ø10/20 orizontal pe două fețe.

### PTh-R.2.8 Dimensionarea fundațiilor

Fundații izolate sub stâlpi + grinzi de echilibrare, teren de fundare cu presiune convențională **pconv = 220 kPa** (v. studiu geotehnic, teren argilă prăfoasă vârtoasă), adâncime fundare **Df = −1,50 m** (sub adâncimea de îngheț).

#### Fundație izolată F1 (sub S1 central)

Nefectiv (grupare fundamentală, la nivel teren) ≈ 1021 + g.p. fund. = 1120 kN.
Aria necesară: Anec = N/pconv = 1120/220 = 5,09 mp → **B×L = 2,40 × 2,40 m** (A = 5,76 mp).
Presiune efectivă pef = 1120/5,76 = 194 kPa < 220 ✔ (grupare specială cu 1,3·pconv = 286 > pef,seism ✔).
Înălțime bloc/cuzinet: H = 60 cm (bloc) + cuzinet armat 40 cm. Verificare la străpungere (poansonare) pe perimetrul critic la 2d de stâlp:
vEd = βVEd/(u1·d); u1 = perimetru la 2d. d = 40−5 = 35 cm.
vRd,c = 0,12·k·(100ρ·fck)^(1/3) ≥ vmin. Rezultat vEd = 0,42 < vRd,c = 0,55 N/mmp ✔ (fără armătură de străpungere).
Moment de încovoiere în consola tălpii:
MEd = pef·(l_consola)²/2·B = 194·(0,975)²/2·2,40 = 194·0,475·2,40 = 221 kNm (pe lățime totală)
As = 221·10⁶/(0,9·350·434,8·2,4... ) → pe metru: As ≈ 720 mmp/m → **Ø14/20 (770 mmp/m) rețea inferioară pe ambele direcții** ✔.

#### Tabel sinteză fundații

| Marcă | Sub stâlp | NEd (kN) | B×L (m) | pef (kPa) | H bloc/cuzinet (cm) | Armare talpă |
|---|---|---|---|---|---|---|
| F1 | S1 central | 1120 | 2,40×2,40 | 194 | 60/40 | Ø14/20 ambele dir. |
| F2 | S2 marginal | 720 | 2,00×2,00 | 180 | 50/40 | Ø14/20 |
| F3 | S3 colț | 500 | 1,70×1,70 | 173 | 50/35 | Ø12/20 |
| F4 | S4 curent | 640 | 1,90×1,90 | 177 | 50/40 | Ø14/20 |

Grinzile de echilibrare (GE 40×80) preiau momentele de la fundațiile de margine/colț (excentricitate față de ax) și solidarizează fundațiile la seism. Armare 5Ø20 sus + 5Ø20 jos, etrieri Ø10/150. Se prevede sub tot ansamblul un strat de beton de egalizare C8/10 gros 10 cm.

---

## PTh-R.3 — PLANURI DE ARMARE ȘI EXTRAS DE ARMĂTURĂ

### PTh-R.3.1 Conținutul planșelor de armare

Setul de planșe de rezistență faza PTh cuprinde:

| Cod planșă | Denumire | Conținut |
|---|---|---|
| R01 | Plan săpături și trasare fundații | Cote de fundare, axe, dimensiuni bloc, cote ±0,00 |
| R02 | Plan fundații — cofraj | Poziție, dimensiuni B×L×H, grinzi echilibrare, goluri |
| R03 | Plan fundații — armare | Rețele tălpi, mustăți stâlpi, armare GE, carnet |
| R04 | Plan cofraj planșeu peste parter | Grinzi, plăci, goluri, cote nivel |
| R05 | Plan cofraj planșeu peste etaj (terasă) | idem |
| R06 | Armare placă peste parter — inferioară | Rețele Ø/pas pe câmpuri, călăreți |
| R07 | Armare placă peste parter — superioară | Armătură pe reazeme, plase, ancoraje |
| R08 | Armare placă terasă — inf./sup. | idem |
| R09 | Armare grinzi — cadre transversale | Elevații G1/G2 cu carnet de armare, etrieri |
| R10 | Armare grinzi — cadre longitudinale | Elevații G3 cu carnet |
| R11 | Armare stâlpi — carnet | Secțiuni, poziție bare, etrieri, înnădiri, mustăți |
| R12 | Armare scară + podeste | Rampe, trepte, grinzi de podest |
| R13 | Armare pereți casa scării | Verticală, orizontală, bulbi |
| R14 | Detalii de armare | Noduri, ancoraje, înnădiri, confinări |

Fiecare planșă de grinzi/stâlpi conține **CARNETUL DE ARMARE**: schema desfășurată a fiecărei bare cu mărci numerotate, cote de fasonare, unghiuri de îndoire, lungimi parțiale și totale.

### PTh-R.3.2 Exemplu carnet de armare — Grinda G1

| Marca | Ø | Formă | Poziție | Lungime buc. (m) | Nr. buc. | Lung. totală (m) |
|---|---|---|---|---|---|---|
| 1 | 22 | dreaptă cu cârlige | inf. câmp continuu | 6,45 | 4 | 25,80 |
| 2 | 22 | îndoită la 45° | sup. reazem stg. | 3,10 | 2 | 6,20 |
| 3 | 22 | îndoită la 45° | sup. reazem dr. | 3,10 | 2 | 6,20 |
| 4 | 22 | dreaptă | sup. continuă reazem | 6,80 | 3 | 20,40 |
| 5 | 8 | etrier închis 260×540 | transversal crit. | 1,72 | 24 | 41,28 |
| 6 | 8 | etrier închis 260×540 | transversal câmp | 1,72 | 18 | 30,96 |

### PTh-R.3.3 Extras de armătură — recapitulație

Extrasul totalizează armătura din toate planșele. Greutăți unitare (kg/m):

| Ø (mm) | Masa (kg/m) |
|---|---|
| 8 | 0,395 |
| 10 | 0,617 |
| 12 | 0,888 |
| 14 | 1,208 |
| 16 | 1,578 |
| 18 | 1,998 |
| 20 | 2,466 |
| 22 | 2,984 |

**Recapitulație pe diametre (estimativ, întreaga structură):**

| Ø | Lungime totală (m) | Masa unitară (kg/m) | Masă (kg) |
|---|---|---|---|
| 8 | 4.850 | 0,395 | 1.916 |
| 10 | 6.200 | 0,617 | 3.825 |
| 12 | 3.100 | 0,888 | 2.753 |
| 14 | 2.400 | 1,208 | 2.899 |
| 16 | 1.150 | 1,578 | 1.815 |
| 18 | 980 | 1,998 | 1.958 |
| 20 | 1.420 | 2,466 | 3.502 |
| 22 | 420 | 2,984 | 1.253 |
| **TOTAL** | **20.520** | — | **19.921 kg** |

Cu adaos tehnologic (deșeuri fasonare + înnădiri neevidențiate) **+7%**:
**Consum total oțel B500B/B500A ≈ 21.315 kg ≈ 21,3 tone.**

Indice de consum: 21.315 / (volum beton structură ≈ 235 mc) = **90,7 kg/mc beton** — valoare uzuală pentru cadre P+1 clasa II de importanță (uzual 85–110 kg/mc). Raportat la Adc: 21.315/900 = **23,7 kg/mp Adc**.

**Extras beton (recapitulație):**

| Element | Volum (mc) |
|---|---|
| Fundații + GE + egalizare | 78 |
| Stâlpi | 24 |
| Grinzi | 46 |
| Plăci (parter + terasă) | 74 |
| Scară + pereți | 13 |
| **TOTAL beton C25/30** | **235** |

---

## PTh-R.4 — DETALII DE ARMARE

### PTh-R.4.1 Lungimi de ancorare și înnădire (calcul)

Lungimea de ancorare de bază (§8.4.2 SR EN 1992-1-1):
**lb,rqd = (Ø/4)·(σsd/fbd)**, cu **fbd = 2,25·η1·η2·fctd**; fctd = 0,7·fctm/1,5 = 0,7·2,6/1,5 = 1,21 N/mmp.
Pentru condiții bune de aderență (η1 = 1,0; η2 = 1,0 pt Ø ≤ 32): **fbd = 2,25·1,21 = 2,72 N/mmp**.
Cu σsd = fyd = 434,8:
**lb,rqd = (Ø/4)·(434,8/2,72) = 39,96·Ø ≈ 40·Ø**.

Lungime de ancorare de calcul: **lbd = α1·α2·α3·α5·lb,rqd ≥ lb,min**. Simplificat (bare drepte, condiții bune): lbd ≈ 40·Ø. Pentru bare îndoite cu cârlig: α1 = 0,7 → lbd ≈ 28·Ø.

Lungime de suprapunere (§8.7.3): **l0 = α6·lbd**, cu α6 = 1,5 (dacă >50% bare înnădite în aceeași secțiune — cazul curent) → **l0 ≈ 1,5·40·Ø = 60·Ø** (condiții bune), respectiv 1,0·lbd = 40Ø dacă < 25% înnădite.

**Tabel lungimi de ancorare/înnădire (condiții bune aderență, C25/30, B500B):**

| Ø (mm) | lb,rqd = 40Ø (mm) | lbd bară dreaptă ≈ 40Ø | l0 (60Ø, >50%) (mm) | l0 (40Ø, ≤25%) (mm) | Cârlig (28Ø) (mm) |
|---|---|---|---|---|---|
| 8 | 320 | 320 | 480 | 320 | 224 |
| 10 | 400 | 400 | 600 | 400 | 280 |
| 12 | 480 | 480 | 720 | 480 | 336 |
| 14 | 560 | 560 | 840 | 560 | 392 |
| 16 | 640 | 640 | 960 | 640 | 448 |
| 18 | 720 | 720 | 1080 | 720 | 504 |
| 20 | 800 | 800 | 1200 | 800 | 560 |
| 22 | 880 | 880 | 1320 | 880 | 616 |

Pentru condiții **slabe** de aderență (η1 = 0,7 — bare orizontale la partea superioară a betonării >250 mm), valorile se majorează cu 1/0,7 = 1,43 (ex. Ø20: l0 = 1720 mm).

### PTh-R.4.2 Nod grindă-stâlp (marginal și central)

**Nod central:** armăturile superioare și inferioare ale grinzilor traversează nodul continuu (nu se înnădesc în nod). Barele care se opresc (bare de reazem) se ancorează dincolo de fața stâlpului cu lbd ≈ 40Ø, măsurat de la fața opusă. Etrierii nodului (armare de confinare a nodului, P100-1 §5.4.3.3): se menține aceeași densitate ca în zona critică a stâlpului (Ø8/100) pe toată înălțimea nodului. Se verifică forța tăietoare în nod: Vjhd ≤ Vjh,max.

**Nod marginal (de capăt):** barele grinzii se ancorează în nod prin **cârlig la 90°** îndoit în jos (bare superioare) / în sus (bare inferioare), cu lungimea orizontală ≥ 0,4·lbd + lungime verticală 15Ø. Pentru Ø22: porțiune orizontală ≥ 0,4·880 = 352 mm + îndoire + 15·22 = 330 mm vertical.

**Ancorajul armăturii inferioare la reazem** (§9.2.1.4): la reazemul de capăt se ancorează min. 25% din armătura din câmp; lungimea de ancorare de la fața reazemului ≥ 10Ø (bare drepte) sau lbd dacă e reazem cu moment.

### PTh-R.4.3 Capete de stâlpi și mustăți

- **Mustățile din fundație** (bare de continuitate stâlp) pornesc din talpa fundației cu ancoraj în bloc, ies deasupra cotei ±0,00 pe lungimea de suprapunere l0 = 60Ø (ex. Ø20 → 1200 mm) pentru înnădirea cu armătura stâlpului de la parter. Înnădirea se face **în afara zonei critice** — deasupra zonei critice de la bază (lcr = 500 mm), deci mustața se prelungește ≥ 500 + 1200 = 1700 mm peste ±0,00.
- **Înnădirea armăturii stâlpilor între niveluri** se face la partea inferioară a nivelului superior, în afara zonei critice (imediat peste planșeu, la ≥ lcr de la fața grinzii). l0 = 60Ø.
- **Etrierii în zona de înnădire**: la înnădire prin suprapunere, distanța etrierilor se reduce (P100-1) — se menține Ø8/100.

### PTh-R.4.4 Confinarea zonelor critice

Zona critică la baza stâlpilor (lcr = 500 mm) și la capetele grinzilor (lcr = 1,5·hgrindă = 900 mm pt G1). Etrieri închiși cu cârlige la 135° (obligatoriu la DCM), ancoraj cârlig 10·dbw ≥ 75 mm. Se prevăd agrafe intermediare pentru barele longitudinale — fiecare a doua bară este ținută în colț de etrier sau agrafă (distanța max. între bare ținute = 200 mm la DCM).

### PTh-R.4.5 Detalii fundații, bulbi, centuri, buiandrugi

- **Fundații:** rețea inferioară ancorată la capete prin întoarcere verticală (cârlig) 15Ø; mustăți stâlp ancorate în bloc cu ciocuri la bază.
- **Bulbi pereți:** elemente de margine confinate cu etrieri Ø8/100 și agrafe, armare longitudinală concentrată 6Ø16; confinarea se extinde pe zona critică hcr = max(lw; Hw/6).
- **Centuri (la pereții de închidere GVP):** centură perimetrală 25×25, 4Ø12 + etrieri Ø6/200, ancorată în stâlpi.
- **Buiandrugi peste goluri:** buiandrug turnat monolit odată cu centura, secțiune min. 25×25, armare 2Ø14 jos + 2Ø12 sus, etrieri Ø6/150; reazem pe zidărie min. 25 cm de fiecare parte pentru goluri < 2,0 m; pentru goluri mari — grindă de b.a. dedicată.

---

## PTh-R.5 — TEHNOLOGIA DE EXECUȚIE A STRUCTURII

### PTh-R.5.1 Cofraje și susțineri

Cofraje din placaj tego 18 mm pe grinzi de lemn/metalice, susțineri cu popi metalici extensibili. **Dimensionarea susținerilor planșeului**: încărcare pe cofraj = g.p. beton proaspăt (25 kN/mc·0,15 m = 3,75 kN/mp) + g.p. cofraj (0,5) + încărcare tehnologică (1,5 kN/mp — personal, utilaje) = **5,75 kN/mp**.
Capacitatea unui pop metalic tip ≈ 20 kN → suprafață aferentă max = 20/5,75 = 3,48 mp → **schemă popi 1,50 × 1,50 m** (2,25 mp < 3,48 ✔). Sub grinzile grele (G1) se prevede rând suplimentar de popi la interax 0,80 m.

Toleranțe de montaj cofraj (SR EN 13670): abatere verticalitate stâlpi ≤ h/400 sau max 15 mm; abatere poziție ax ≤ ±10 mm; planeitate cofraj ≤ 5 mm/2 m.

### PTh-R.5.2 Montajul armăturii

- Fasonarea la rece; diametrul minim al dornului de îndoire: 4Ø (Ø ≤ 16) și 7Ø (Ø > 16).
- Distanțieri din material plastic/mortar pentru asigurarea acoperirii (cnom): min. 4 buc/mp la plăci, la interax max 1,0 m la grinzi/stâlpi.
- Legarea cu sârmă neagră moale Ø1,4 mm la toate intersecțiile de contur și 50% în câmp.
- Ordine montaj: mustăți fundație → carcase stâlpi → cofraj stâlpi → armare grinzi (carcase preasamblate) → armare placă (rețea inferioară, călăreți, rețea superioară).
- Se verifică ÎNAINTE de betonare: diametre, număr bare, poziție, acoperire, lungimi ancoraj/înnădire, curățenie (PVLA armare).

### PTh-R.5.3 Betonarea pe elemente

- **Beton C25/30**, clasa de consistență **S3–S4** (tasare 100–210 mm), Dmax agregat 16–22 mm. Comandă cu specificația completă conform SR EN 206.
- **Stâlpi:** betonare în straturi de 40–50 cm, compactare cu vibrator de interior Ø ≤ ¾ din spațiul liber; înălțime de cădere liberă ≤ 1,5 m (altfel jgheab/furtun).
- **Grinzi + placă:** betonare monolită simultană (nod grindă-stâlp inclus); începe dinspre un capăt, se avansează continuu.
- **Compactare:** vibrare până la încetarea degajării bulelor de aer și apariția laptelui de ciment; nu se ating armăturile/cofrajul prelungit cu vibratorul.

### PTh-R.5.4 Rosturi de turnare (poziționare)

- **Stâlpi:** rost la fața inferioară a grinzii/planșeului (nu în nod).
- **Grinzi/plăci:** dacă e necesar rost, se poziționează în **treimea mijlocie a deschiderii** (zona de forță tăietoare minimă), niciodată în reazem sau în nod. Rost vertical, cu tratarea suprafeței (buciardare/spălare + amorsă) la reluarea betonării.
- **Pereți:** rost orizontal la nivelul planșeului.

### PTh-R.5.5 Tratarea betonului și decofrare

- **Protecție/tratare** (SR EN 13670 §8.5): menținere umedă min. **7 zile** (temp > 5°C), acoperire cu folie/geotextil umed; interzisă betonarea sub +5°C fără măsuri (aditivi, încălzire).
- **Termene de decofrare (orientative, C25/30, +15°C):**

| Element | Cofraj lateral (fără susținere) | Susțineri (popi) |
|---|---|---|
| Stâlpi, pereți (lateral) | 2–3 zile | — |
| Grinzi (lateral) | 3 zile | — |
| Plăci L ≤ 6 m | — | 14 zile (min. 70% fck) |
| Grinzi L ≤ 6 m | — | 21 zile (min. 85% fck) |
| Console | — | 28 zile (100% fck) |

Decofrarea susținerilor se face numai după atingerea rezistenței, confirmată prin încercări pe cuburi (probe de decofrare) sau maturitate. Decofrare eșalonată, fără șocuri.

---

## PTh-R.6 — PLAN DE CONTROL AL CALITĂȚII STRUCTURĂ

### PTh-R.6.1 Controlul betonului (SR EN 206 / NE 012)

**Frecvențe de prelevare probe (cuburi 150 mm, seturi de 3):**

| Control | Frecvență |
|---|---|
| Consistență (tasare) | La fiecare transport betonier, min. 1/zi/element |
| Rezistență la compresiune | 1 set (3 cuburi) / 50 mc SAU / element important SAU / zi de betonare |
| Probe de decofrare | 1 set suplimentar / planșeu |
| Temperatură beton proaspăt | La turnare pe timp friguros/călduros |

Criteriu de conformitate (producție continuă, SR EN 206): media a 3 rezultate fcm ≥ fck + 4 (= 29 N/mmp) ȘI fiecare individual ≥ fck − 4 (= 21 N/mmp). Probe la 28 zile; opțional 7 zile pentru urmărire.

### PTh-R.6.2 Controlul oțelului (ST 009)

- Certificat de calitate/conformitate pe fiecare lot livrat, marcaj B500B/B500A.
- Încercări: **1 set (tracțiune + îndoire)** la fiecare **50 tone / diametru / lot** (limită de curgere Re, rezistență Rm, alungire Agt ≥ 5% pt B500B, raport Rm/Re ≥ 1,08).
- Verificare geometrie nervuri (aderență), diametre efective.

### PTh-R.6.3 Toleranțe de execuție (SR EN 13670, clasa toleranță 1)

| Element | Abatere admisă |
|---|---|
| Poziție stâlp în plan | ±25 mm (față de ax) |
| Verticalitate stâlp/etaj | ≤ h/400, max 15 mm |
| Secțiune stâlp/grindă (dimensiune) | ±10 mm |
| Grosime placă | +10 / −5 mm |
| Acoperire armătură (cnom) | −10 / +10 mm |
| Poziție goluri | ±25 mm |

### PTh-R.6.4 Procese-verbale (PVLA / PVRC)

Se întocmesc procese-verbale de lucrări ascunse (PVLA) și de recepție calitativă (PVRC) pentru: natura terenului de fundare, armare fundații, armare stâlpi, armare grinzi/plăci (înainte de fiecare betonare), betonare (cu nr. bon beton + probe), decofrare. Semnate de constructor + diriginte + (la faze determinante) proiectant + ISC.

---

## PTh-R.7 — FAZE DETERMINANTE

Fazele determinante se stabilesc conform programului de control avizat de ISC (Legea 10/1995, HG 742/2018). Pentru prezenta structură:

| Nr. | Faza determinantă | Verificări / criterii | Participanți |
|---|---|---|---|
| FD1 | Natura terenului de fundare (cotă săpătură) | Confruntare cu studiul geotehnic; pconv confirmată; absența umpluturilor/pungilor slabe; cota −1,50 m | Geotehnician, proiectant, diriginte, constructor, ISC |
| FD2 | Armare fundații (înainte de betonare) | Diametre, poziții, acoperire 45 mm, mustăți stâlpi, GE, curățenie cofraj | Proiectant, diriginte, constructor, ISC |
| FD3 | Armare stâlpi + grinzi + planșeu peste parter | Carnete armare, confinări zone critice, noduri, înnădiri l0, acoperire | Proiectant, diriginte, constructor, ISC |
| FD4 | Structură la roșu (finalizare cadre P+1) | Verticalitate, geometrie, absență segregări/fisuri, conformitate rezistențe beton (buletine), terasă | Proiectant, diriginte, constructor, ISC |

La fiecare fază determinantă: convocare cu min. 10 zile înainte, întocmire proces-verbal de fază determinantă (autorizare continuarea lucrărilor). Neîndeplinirea criteriilor blochează avansul până la remediere și reverificare.

---

## PTh-R.8 — PROGRAM DE URMĂRIRE ÎN TIMP (P130) + MONITORIZARE TASĂRI

### PTh-R.8.1 Urmărirea curentă (P130-1999)

Urmărire curentă (vizuală) efectuată de proprietar/administrator, cu **periodicitate anuală** și după evenimente deosebite (cutremur > V MSK, inundație, incendiu, tasări vizibile). Se urmăresc: fisuri în elemente structurale (deschidere, evoluție), umezire/coroziune armături, degradări beton, comportarea rosturilor, starea terasei/hidroizolației. Se consemnează în **Jurnalul evenimentelor** din Cartea Tehnică a construcției.

### PTh-R.8.2 Urmărirea specială — monitorizare tasări

Având clasa de importanță II și teren coeziv, se instituie urmărirea tasărilor prin nivelment de precizie:

- **Mărci de tasare:** 6 mărci încastrate în stâlpii de la parter (colțuri + mijloc laturi lungi), la cca +0,50 m față de trotuar.
- **Reper fix (bornă de referință):** min. 2 repere de nivel amplasate în afara zonei de influență (la > 30 m), stabile.
- **Frecvența măsurătorilor:**

| Etapă | Frecvență |
|---|---|
| În timpul execuției (per nivel turnat) | La fiecare planșeu (min. 3 citiri) |
| După finalizarea structurii | La 1, 3, 6, 12 luni |
| În exploatare | Anual până la stabilizare (Δs < 2 mm/an), apoi la 5 ani |

- **Criterii de alarmare:** tasare absolută > 25 mm (teren coeziv) sau tasare diferențială Δs/L > 1/500 între fundații vecine → notificare proiectant + expertiză.
- **Metodă:** nivelment geometric de ordinul II, precizie ± 0,5 mm; consemnare în fișe de urmărire cu grafic tasare–timp.

---

## PTh-R.9 — IPOTEZE MODEL DE CALCUL EF + VALIDARE

### PTh-R.9.1 Ipoteze de modelare

- **Model spațial** 3D (bare + shell) în program de element finit; stâlpi și grinzi = elemente de tip bară (frame); plăci și pereți = elemente de suprafață (shell/membrane).
- **Diafragme de planșeu:** planșeele de beton armat modelate ca **diafragme rigide** în plan orizontal (compatibilitate deplasări laterale).
- **Rezemări:** încastrare la baza stâlpilor la nivelul tălpii fundației (sau resoarte de teren ks = 25.000 kN/mc pentru interacțiune sol-structură — variantă de verificare).
- **Rigidități:** conform P100-1 §7.2.3, se folosesc rigidități fisurate (0,5·EI) pentru elemente de beton armat la analiza seismică.
- **Mase:** G + ψ2·Q (ψ2 = 0,3), grupate în centrele de masă pe niveluri; excentricitate accidentală ±5% din dimensiunea planului.
- **Analiză seismică:** modală cu spectre de răspuns (P100-1/2013), spectru elastic redus cu q = 3,9.

### PTh-R.9.2 Validarea modelului

**Verificarea maselor:** masa totală seismică din model = suma încărcărilor gravitaționale în combinația seismică.

| Nivel | Masă seismică (t) |
|---|---|
| Peste parter | 685 |
| Peste etaj (terasă) | 610 |
| **Total** | **1.295** |

Verificare echilibru: reacțiune verticală totală la bază (comb. seism, G+0,3Q) = 12.700 kN ≈ masă·g = 1295·9,81 = 12.704 kN → **eroare < 0,1% ✔**.

**Perioade proprii și mase modale efective:**

| Mod | Perioadă T (s) | Direcție predominantă | Masă modală (%) | Cumulat (%) |
|---|---|---|---|---|
| 1 | 0,42 | translație X | 78 | 78 |
| 2 | 0,39 | translație Y | 76 | — (Y) |
| 3 | 0,31 | torsiune | 12 | — |
| ... | ... | ... | ... | — |
| Total X (primele 6 moduri) | — | — | — | 92 |
| Total Y | — | — | — | 91 |

Criteriu P100-1: suma maselor modale efective considerate ≥ 90% → **satisfăcut (92% X, 91% Y) ✔**. Modul 1 de torsiune (mod 3) are perioada mai mică decât modurile de translație → structură **NEsensibilă la torsiune** ✔.

**Verificarea driftului (deplasări relative de nivel), P100-1 §4.5.4:**
Deplasarea relativă de nivel de calcul: **dr = q·ν·dr,e** (ν = 0,5 clasa II).
SLS (limitare degradări): **dr·ν ≤ 0,005·h** (structuri cu componente nestructurale fixate).

| Nivel | h (m) | dr,e elastic (mm) | dr = q·dr,e (mm) | dr/h | Limită SLS 0,005·h (mm) | Verificare |
|---|---|---|---|---|---|---|
| Parter | 3,60 | 2,4 | 9,4 | 0,0026 | 18,0 (dr·ν=4,7<18) | ✔ |
| Etaj | 3,30 | 2,0 | 7,8 | 0,0024 | 16,5 (dr·ν=3,9<16,5) | ✔ |

SLU (limitare la 0,025·h — evitarea prăbușirii): dr,parter = 9,4 mm < 0,025·3600 = 90 mm ✔.

**Verificarea efectelor de ordinul II (coeficient de sensibilitate θ):**
θ = (Ptot·dr)/(Vtot·h). Parter: θ = (12.700·0,0094)/(2.100·3,60) = 119,4/7.560 = **0,016 < 0,10** → efecte P-Δ neglijabile, nu necesită amplificare ✔.

**Verificarea forței tăietoare de bază:** Fb = γI,e·Sd(T1)·m·λ. Cu Sd(T1) ≈ ag·β0/q = 0,25·9,81·2,5/3,9 ≈ 1,57 m/s²; Fb = 1,2·1,57·1295·0,85 ≈ 2.100 kN (coerent cu Vtot din model ✔).

---

*Prezentul supliment de fază PTh-Rezistență completează faza DTAC și se citește împreună cu planșele de armare R01–R14 și Caietul de sarcini pentru structuri de beton armat. Toate valorile numerice sunt exemple de dimensionare pentru un Centru social de zi P+1 tipic și se confirmă/ajustează în urma rulării finale a modelului EF pe geometria reală și a studiului geotehnic definitiv al amplasamentului.*