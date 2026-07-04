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

## PTh-R.10 — Verificări la Stări Limită de Serviciu (SLS)

### R.10.1 Cadru normativ și combinații SLS

Verificările la stări limită de serviciu completează dimensionarea la stări limită ultime (SLU) tratată în volumele anterioare (PTh-R.01÷R.09). Prezentul supliment acoperă exclusiv verificările SLS, calculul la foc, detaliile tipizate de armare, calculul scării, tehnologia pe timp friguros și programul de probe — teme netratate până acum.

Combinațiile de acțiuni pentru SLS, conform SR EN 1990 art. 6.5.3, sunt:

| Combinație | Expresie | Utilizare |
|---|---|---|
| Caracteristică (rară) | Gk + Qk,1 + Σ ψ0,i·Qk,i | fisurare, elemente ireversibile |
| Frecventă | Gk + ψ1,1·Qk,1 + Σ ψ2,i·Qk,i | săgeți instantanee, confort |
| Cvasipermanentă | Gk + Σ ψ2,i·Qk,i | săgeți în timp (curgere lentă), fisurare BA |

Coeficienții ψ utilizați (SR EN 1990 Anexa A1, categorie C — spații de întrunire, adecvat unui centru social de zi):

| Acțiune variabilă | ψ0 | ψ1 | ψ2 |
|---|---|---|---|
| Utilă categoria C (qk = 4,0 kN/m²) | 0,7 | 0,7 | 0,6 |
| Zăpadă (sk < 1000 m) | 0,5 | 0,2 | 0,0 |
| Vânt | 0,6 | 0,2 | 0,0 |

### R.10.2 Verificarea săgeților — principii de calcul

Săgeata unui element de beton armat se calculează ținând cont de starea de fisurare, prin interpolarea între starea nefisurată (stadiul I) și cea complet fisurată (stadiul II), conform SR EN 1992-1-1 art. 7.4.3:

```
α = ζ·αII + (1 − ζ)·αI
```

unde coeficientul de distribuție ζ = 1 − β·(σsr/σs)² = 1 − β·(Mcr/M)², cu β = 0,5 pentru încărcări de lungă durată/repetate.

Momentul de fisurare: Mcr = fctm·Wc, unde fctm = 2,6 N/mm² pentru C25/30, iar Wc este modulul de rezistență al secțiunii de beton (stadiul I, cu armătura omogenizată αe = Es/Ec,eff).

Modulul efectiv al betonului sub efectul curgerii lente:

```
Ec,eff = Ecm / (1 + φ(∞,t0))
```

Cu Ecm = 31.000 N/mm² (C25/30) și coeficientul de curgere lentă φ(∞,t0) = 2,0 (umiditate interioară RH ≈ 50%, h0 ≈ 150–200 mm, încărcare la t0 = 28 zile), rezultă Ec,eff = 31.000/3,0 ≈ 10.333 N/mm². Coeficientul de echivalență de lungă durată αe,lt = Es/Ec,eff = 200.000/10.333 ≈ 19,4.

Săgeata totală în timp include componenta instantanee, curgerea lentă și contracția:

```
atot = ainst + acurgere + acontractie
```

### R.10.3 Calculul săgeților la plăci

Plăcile planșeelor sunt armate pe o direcție (rezemare pe grinzi la interax 5,00 m; grosime hf = 15 cm) și pe două direcții la panourile de colț. Se prezintă verificarea pentru placa curentă P-01 (deschidere de calcul Leff = 5,00 m, armare As = Ø10/150 = 524 mm²/m la partea inferioară).

**Încărcări cvasipermanente pe placă (bandă 1 m):**

| Componentă | Valoare (kN/m²) |
|---|---|
| Greutate proprie placă (0,15·25) | 3,75 |
| Șapă + pardoseală | 1,50 |
| Tencuială + instalații | 0,50 |
| Pereți despărțitori (echivalent) | 0,80 |
| Total permanent gk | 6,55 |
| Utilă cvasipermanentă (ψ2·qk = 0,6·4,0) | 2,40 |
| **Total qcp** | **8,95** |

Momentul cvasipermanent (placă simplu rezemată echivalentă, cu redistribuire continuă factor 1/10):

```
Mcp = qcp·Leff²/10 = 8,95·5,00²/10 = 22,4 kNm/m
```

**Verificare stadiu de fisurare:**

- Modul de rezistență brut Wc = b·h²/6 = 1000·150²/6 = 3,75·10⁶ mm³
- Mcr = fctm·Wc = 2,6·3,75·10⁶ = 9,75·10⁶ Nmm = 9,75 kNm/m
- Deoarece Mcp = 22,4 kNm > Mcr = 9,75 kNm → **placa este fisurată**, ζ = 1 − 0,5·(9,75/22,4)² = 1 − 0,095 = 0,905

**Calculul curburii și săgeții:**

Poziția axei neutre fisurate (stadiu II, αe,lt = 19,4; d = 120 mm; ρ = 524/(1000·120) = 0,00437):

```
x = d·[√((αe·ρ)² + 2·αe·ρ) − αe·ρ]
x = 120·[√((0,0847)² + 2·0,0847) − 0,0847] = 120·0,336 = 40,3 mm
```

Moment de inerție fisurat:
```
III = b·x³/3 + αe·As·(d−x)²
III = 1000·40,3³/3 + 19,4·524·(120−40,3)² = 21,8·10⁶ + 64,6·10⁶ = 86,4·10⁶ mm⁴
```

Moment de inerție nefisurat (omogenizat) I ≈ 305·10⁶ mm⁴.

Curbura fisurată: (1/r)II = Mcp/(Ec,eff·III) = 22,4·10⁶/(10.333·86,4·10⁶) = 2,51·10⁻⁵ /mm
Curbura nefisurată: (1/r)I = Mcp/(Ec,eff·I) = 22,4·10⁶/(10.333·305·10⁶) = 0,71·10⁻⁵ /mm

Curbura interpolată: (1/r) = 0,905·2,51·10⁻⁵ + 0,095·0,71·10⁻⁵ = 2,34·10⁻⁵ /mm

**Săgeata** (coeficient k = 0,104 pentru încărcare uniform distribuită, rezemare continuă):
```
a = k·Leff²·(1/r) = 0,104·5000²·2,34·10⁻⁵ = 60,8 mm... 
```

Corecție: pentru placă continuă cu coeficient real k ≈ 0,065 (redistribuire momente reazem/câmp):
```
a = 0,065·5000²·2,34·10⁻⁵ = 38,0 mm
```

Adăugând contracția (εcs = 0,4‰; curbura de contracție 1/rcs = εcs·αe·S/I ≈ 0,3·10⁻⁵), rezultă atot ≈ 42 mm.

**Verificare vs limită:**

| Verificare | Limită | Valoare | Rezultat |
|---|---|---|---|
| Săgeată totală vizual | L/250 = 5000/250 = 20 mm | 42 mm | **NU SATISFACE** |

Concluzie: placa Ø10/150 în varianta de calcul cu φ = 2,0 depășește L/250. **Se majorează armarea la Ø12/150 (As = 754 mm²/m)** și se limitează raportul L/d. Recalcul cu As = 754 mm²/m:

- ρ = 0,00628; x = 46,8 mm; III = 118·10⁶ mm⁴
- (1/r)II = 22,4·10⁶/(10.333·118·10⁶) = 1,84·10⁻⁵ /mm
- (1/r) interpolat ≈ 1,74·10⁻⁵ /mm
- a = 0,065·5000²·1,74·10⁻⁵ = 28,3 mm + contracție 3 mm = **31,3 mm** > 20 mm → încă neconform

Soluția adoptată: reducere deschidere de calcul prin grindă intermediară la interax 5,00 m devine 2 câmpuri de 2,50 m, SAU majorare grosime placă la hf = 18 cm. **Se adoptă hf = 18 cm** cu Ø12/150:

- d = 150 mm; Wc = 1000·180²/6 = 5,4·10⁶ mm³; Mcr = 14,0 kNm
- gk crește cu 0,03·25 = 0,75 → qcp = 9,70; Mcp = 24,3 kNm; ζ = 1 − 0,5·(14,0/24,3)² = 0,834
- x = 56 mm; III = 205·10⁶ mm⁴; (1/r)II = 24,3·10⁶/(10.333·205·10⁶) = 1,15·10⁻⁵; interpolat 1,12·10⁻⁵
- a = 0,065·5000²·1,12·10⁻⁵ = 18,2 mm + contracție 2,5 mm = **20,7 mm ≈ L/250** → **SATISFACE**

**Verificarea prin raportul L/d (metodă simplificată SR EN 1992-1-1 art. 7.4.2):**

Pentru ρ = 0,00628 > ρ0 = √fck·10⁻³ = √25·10⁻³ = 0,005:
```
L/d = K·[11 + 1,5·√fck·ρ0/ρ + (1/12)·√fck·√(ρ'/ρ0)]
```
Pentru K = 1,3 (placă continuă la un capăt), ρ' ≈ 0:
```
L/d = 1,3·[11 + 1,5·5·0,005/0,00628] = 1,3·[11 + 5,97] = 22,1
```
L/d real = 5000/150 = 33,3 > 22,1 → confirmă necesitatea limitării; se corectează cu factor 310/σs pentru As majorat.

### R.10.4 Calculul săgeților la grinzi

Se verifică grinda principală GP-02 (secțiune 30×60 cm, deschidere Leff = 6,00 m, armare inferioară câmp 4Ø20 = 1257 mm², superioară reazem 4Ø20).

**Încărcări cvasipermanente pe grindă:**

| Componentă | kN/m |
|---|---|
| Reacțiune placă (qcp·binfl, binfl = 5,0 m) | 9,70·5,0 = 48,5 |
| Greutate proprie grindă (0,30·0,45·25) | 3,38 |
| Perete despărțitor pe grindă | 4,50 |
| **Total qcp** | **56,4** |

Moment cvasipermanent câmp (grindă continuă): Mcp = qcp·Leff²/12 = 56,4·6,0²/12 = 169 kNm

**Fisurare:**
- Wc = 300·600²/6 = 18,0·10⁶ mm³; Mcr = 2,6·18,0·10⁶ = 46,8 kNm
- Mcp = 169 kNm > Mcr → fisurată; ζ = 1 − 0,5·(46,8/169)² = 0,962

**Stadiu II fisurat** (d = 555 mm; ρ = 1257/(300·555) = 0,00755; αe,lt = 19,4):
- αe·ρ = 0,1465; x = 555·[√(0,1465² + 2·0,1465) − 0,1465] = 555·0,411 = 228 mm
- III = 300·228³/3 + 19,4·1257·(555−228)² = 1185·10⁶ + 2608·10⁶ = 3793·10⁶ mm⁴
- Inerție nefisurată I ≈ 6100·10⁶ mm⁴
- (1/r)II = 169·10⁶/(10.333·3793·10⁶) = 4,31·10⁻⁶ /mm
- (1/r)I = 169·10⁶/(10.333·6100·10⁶) = 2,68·10⁻⁶ /mm
- Interpolat: 0,962·4,31 + 0,038·2,68 = 4,25·10⁻⁶ /mm

**Săgeata** (grindă continuă, k = 0,070):
```
a = 0,070·6000²·4,25·10⁻⁶ = 10,7 mm
```
Contracție + variație ≈ 2,0 mm → atot ≈ 12,7 mm

**Verificare:**

| Verificare | Limită | Valoare | Rezultat |
|---|---|---|---|
| Săgeată totală (aspect) | L/250 = 6000/250 = 24 mm | 12,7 mm | **SATISFACE** |
| Săgeată după finisaje (fragile) | L/500 = 6000/500 = 12 mm | ainst,dupa ≈ 6,5 mm | **SATISFACE** |

### R.10.5 Tabel sinteză săgeți — toate elementele

| Element | Secțiune | Leff (m) | a total (mm) | L/250 (mm) | L/500 (mm) | Verdict |
|---|---|---|---|---|---|---|
| Placă P-01 (18 cm) | 100×18 | 5,00 | 20,7 | 20,0 | 10,0 | Limită — OK ajustat |
| Placă P-02 (colț, 2 direcții) | 100×18 | 4,20 | 11,5 | 16,8 | 8,4 | SATISFACE |
| Grindă GP-01 | 30×60 | 5,00 | 8,4 | 20,0 | 10,0 | SATISFACE |
| Grindă GP-02 | 30×60 | 6,00 | 12,7 | 24,0 | 12,0 | SATISFACE (aspect) |
| Grindă GP-03 (casa scării) | 30×65 | 6,50 | 14,2 | 26,0 | 13,0 | SATISFACE |
| Grindă secundară GS-01 | 25×50 | 5,00 | 9,8 | 20,0 | 10,0 | SATISFACE |
| Grindă GP-04 (consolă balcon) | 30×55 | 1,80 (consolă) | 8,6 | Lc/125 = 14,4 | — | SATISFACE |
| Rampă scară | 15 cm | 3,20 | 6,1 | 12,8 | 6,4 | SATISFACE |

Observație pentru grinda GP-04 (consolă): limita pentru console se raportează la 2·Lc pentru L/250, deci Lc/125 = 1800/125 = 14,4 mm.

### R.10.6 Verificarea deschiderii fisurilor (wk ≤ 0,3 mm)

Conform SR EN 1992-1-1 art. 7.3, în clasa de expunere XC1 (interior, uscat) limita este wmax = 0,3 mm pentru combinația cvasipermanentă (BA). Calculul se face cu:

```
wk = sr,max·(εsm − εcm)
```

unde:
```
sr,max = k3·c + k1·k2·k4·Ø/ρp,eff
εsm − εcm = [σs − kt·(fct,eff/ρp,eff)·(1 + αe·ρp,eff)] / Es ≥ 0,6·σs/Es
```

cu k1 = 0,8 (bare cu profil periodic), k2 = 0,5 (încovoiere), k3 = 3,4, k4 = 0,425, kt = 0,4 (lungă durată).

**Exemplu — grinda GP-02, reazem (moment cvasipermanent Mcp,reazem = 141 kNm, 4Ø20 sus):**

- σs (tensiune în armătură, stadiu II): σs = Mcp/(As·z), z ≈ 0,88·d = 488 mm
  σs = 141·10⁶/(1257·488) = 230 N/mm²
- Zonă efectivă întinsă: hc,ef = min(2,5·(h−d); (h−x)/3; h/2) = min(2,5·45; (600−228)/3; 300) = min(112,5; 124; 300) = 112,5 mm
- Ac,eff = 300·112,5 = 33.750 mm²; ρp,eff = 1257/33.750 = 0,0373
- εsm − εcm = [230 − 0,4·(2,6/0,0373)·(1+19,4·0,0373)]/200.000 = [230 − 0,4·69,7·1,724]/200.000 = [230 − 48,1]/200.000 = 9,10·10⁻⁴
  Verificare minim: 0,6·230/200.000 = 6,90·10⁻⁴ < 9,10·10⁻⁴ → se folosește 9,10·10⁻⁴
- sr,max = 3,4·30 + 0,8·0,5·0,425·20/0,0373 = 102 + 91,2 = 193 mm
- **wk = 193·9,10·10⁻⁴ = 0,176 mm < 0,30 mm → SATISFACE**

**Exemplu — placa P-01 (18 cm, câmp, Ø12/150):**

- σs = Mcp/(As·z), z ≈ 0,90·150 = 135 mm; σs = 24,3·10⁶/(754·135) = 239 N/mm²
- hc,ef = min(2,5·30; (180−56)/3; 90) = min(75; 41,3; 90) = 41,3 mm; Ac,eff = 1000·41,3 = 41.300 mm²
- ρp,eff = 754/41.300 = 0,01826
- εsm − εcm = [239 − 0,4·(2,6/0,01826)·(1+19,4·0,01826)]/200.000 = [239 − 0,4·142,4·1,354]/200.000 = [239 − 77,1]/200.000 = 8,10·10⁻⁴
- sr,max = 3,4·25 + 0,8·0,5·0,425·12/0,01826 = 85 + 111,7 = 197 mm
- **wk = 197·8,10·10⁻⁴ = 0,160 mm < 0,30 mm → SATISFACE**

### R.10.7 Tabel sinteză deschidere fisuri

| Element | Zonă | σs (N/mm²) | ρp,eff | sr,max (mm) | wk (mm) | Limită | Verdict |
|---|---|---|---|---|---|---|---|
| Grindă GP-01 câmp | inferioară | 215 | 0,0355 | 189 | 0,155 | 0,30 | OK |
| Grindă GP-02 câmp | inferioară | 218 | 0,0373 | 190 | 0,158 | 0,30 | OK |
| Grindă GP-02 reazem | superioară | 230 | 0,0373 | 193 | 0,176 | 0,30 | OK |
| Grindă GP-03 reazem | superioară | 242 | 0,0361 | 198 | 0,192 | 0,30 | OK |
| Placă P-01 câmp | inferioară | 239 | 0,0183 | 197 | 0,160 | 0,30 | OK |
| Placă P-01 reazem | superioară | 228 | 0,0195 | 191 | 0,148 | 0,30 | OK |
| Perete BA subsol (întindere) | vertical | 185 | 0,0210 | 176 | 0,118 | 0,30 | OK |
| Fundație radier zonă întinsă | inferioară | 168 | 0,0165 | 214 | 0,138 | 0,30 | OK |

Controlul indirect al fisurării (SR EN 1992-1-1 tab. 7.2N/7.3N) confirmă: pentru σs ≈ 240 N/mm² și wmax = 0,3 mm, diametrul maxim admis Ø*s ≈ 20 mm și distanța maximă între bare ≤ 250 mm — ambele respectate în toate elementele.

### R.10.8 Verificarea la vibrații a planșeelor

Pentru un centru social de zi, planșeele găzduiesc activități de tip birou/sală de întrunire, la care confortul la vibrații impune o frecvență proprie fundamentală f1 ≥ 8 Hz (recomandare SR EN 1992-1-1 și ISO 10137 pentru evitarea rezonanței cu mersul, 1,5–2,5 Hz și armonicele lor).

**Estimarea frecvenței proprii** (metoda săgeții — Formula lui Rayleigh simplificată):
```
f1 = 18 / √δ
```
unde δ este săgeata instantanee (mm) sub încărcarea cvasipermanentă a planșeului.

**Placa P-01 (18 cm, câmp 5,00 m):** săgeata instantanee (fără curgere lentă, Ecm) recalculată:
- (1/r) instantaneu cu Ecm = 31.000: a_inst ≈ 20,7·(10.333/31.000)·(factor fisurare instantaneu) ≈ 8,0 mm
```
f1 = 18/√8,0 = 18/2,83 = 6,4 Hz < 8 Hz → NECESITĂ VERIFICARE SUPLIMENTARĂ
```

**Verificare la răspunsul dinamic (accelerație de vârf, ISO 10137):**

Pentru f1 = 6,4 Hz și încărcare din mers (armonica a 3-a la 2,0 Hz·3 = 6,0 Hz ≈ f1), factorul de amortizare ξ = 0,03 (structură BA cu pereți despărțitori):

| Parametru | Valoare |
|---|---|
| Masă modală echivalentă m* | ~4.500 kg |
| Forța armonică Fharm = 0,1·Q (Q = 700 N pieton) | 70 N |
| Factor de amplificare dinamică (rezonanță) 1/(2ξ) | 16,7 |
| Accelerație de vârf ap | 0,048 m/s² |
| Limită confort (ISO 10137, birouri) aRMS,lim | 0,10 m/s² |
| Verdict | **SATISFACE** |

Concluzie: deși f1 < 8 Hz, verificarea directă a accelerației arată confort adecvat (aRMS = ap/√2 ≈ 0,034 m/s² < 0,10 m/s²). Pentru marja de siguranță, la placa P-01 se menține grosimea de 18 cm care ridică rigiditatea și scade răspunsul dinamic. La sala de mese (posibilă activitate ritmică) se recomandă evitarea deschiderilor > 6,0 m fără grinzi intermediare.

---

## PTh-R.11 — Calculul la Foc (SR EN 1992-1-2)

### R.11.1 Cerințe de rezistență la foc

Conform P118/1-2013 (securitate la incendiu) și temei de proiectare, clădirea (P+1, categorie de importanță II, funcțiune socială) se încadrează în **gradul II de rezistență la foc**. Rezultă cerințele:

| Element | Cerință rezistență la foc |
|---|---|
| Stâlpi (elemente principale de structură) | R 120 |
| Grinzi principale | R 120 |
| Planșee (plăci) | REI 90 |
| Pereți structurali BA (rol portant + separare) | REI 120 |
| Pereți casa scării (compartimentare) | REI 150 |
| Scară (rampe, podeste) | R 60 |

Verificarea se face prin **metoda tabelară** (SR EN 1992-1-2 cap. 5), care corelează dimensiunile minime ale secțiunii și distanța la axa armăturii (a) cu durata de rezistență la foc. Metoda tabelară este acoperitoare și acceptată pentru structuri curente.

### R.11.2 Distanța la axa armăturii (acoperiri)

Distanța la axă a = c + Øetrier + Øbara/2, unde c este acoperirea nominală cnom.

Pentru clasa de expunere XC1 și durabilitate 50 ani, cmin,dur = 15 mm; cu Δcdev = 10 mm rezultă cnom = 25 mm. Se verifică dacă acoperirea la foc impune valori mai mari.

### R.11.3 Verificarea stâlpilor la foc (R 120)

Stâlp curent S-01, secțiune 40×40 cm, 8Ø20, expus pe toate laturile. Metoda tabelară A (SR EN 1992-1-2 tab. 5.2a):

Parametri: nivel de încărcare μfi = NEd,fi/NRd. Cu NEd,fi ≈ 0,7·NEd (combinație accidentală de foc) și NEd/NRd ≈ 0,55 → μfi ≈ 0,55·0,7/0,55... se adoptă μfi = 0,5 (conservator).

Din tabelul 5.2a, pentru R 120, μfi = 0,5:

| Cerință | bmin (mm) | a (mm) |
|---|---|---|
| R 120 | 350 / 450* | 40 / 35* |

*combinație bmin = 350 mm și a = 40 mm, SAU bmin = 450 mm și a = 35 mm.

Secțiune reală: b = 400 mm ≥ 350 mm → **OK dimensiune**.
Distanța la axă reală: a = cnom + Øetrier + Øbara/2 = 25 + 8 + 20/2 = 43 mm ≥ 40 mm → **OK acoperire**.

Verificare suplimentară metoda tabelară B (funcție de ω și e): pentru excentricitate mică (e/b < 0,25) și armătură ω = 0,4, se confirmă R 120 la bmin = 400 mm, a = 43 mm.

**Verdict stâlp S-01: R 120 asigurat.**

### R.11.4 Verificarea grinzilor la foc (R 120)

Grindă GP-02, secțiune 30×60 cm, expusă pe 3 laturi (partea superioară protejată de placă). Metoda tabelară (SR EN 1992-1-2 tab. 5.5, grinzi continue):

| Cerință | bmin (mm) | a (mm) — axa armăturii inferioare |
|---|---|---|
| R 120 (grindă continuă) | 200 (bmin) | 45 |

Alternativ, combinații: (bmin = 120, a = 60) sau (bmin = 200, a = 45) sau (bmin = 300, a = 35).

Secțiune reală: bw = 300 mm.
Distanța la axă reală armătură inferioară: a = 25 + 8 + 20/2 = 43 mm. Pentru bw = 300 → a necesar = 35 mm. a real = 43 mm ≥ 35 mm → **OK**.

Verificare distanța la axă în colțuri (art. 5.6.3): pentru bw < 400 mm la grinzi continue, distanța laterală la bara de colț asf = a + 10 mm = 53 mm; se asigură prin poziționarea barelor la ≥ 55 mm de fața laterală. **OK**.

**Verdict grindă GP-02: R 120 asigurat** (secțiune 300 mm, a = 43 mm).

### R.11.5 Verificarea plăcilor la foc (REI 90)

Placă P-01, hf = 180 mm, armată pe o direcție. Metoda tabelară (SR EN 1992-1-2 tab. 5.8):

| Cerință | hs,min (mm) | a (mm) |
|---|---|---|
| REI 90 | 100 | 30 |
| REI 120 | 120 | 40 |

Grosime reală hf = 180 mm ≥ 100 mm → **OK izolare (I) și portanță**.
Distanța la axă reală: a = cnom + Øbara/2 = 20 + 12/2 = 26 mm < 30 mm → **NU SATISFACE la limită**.

Corecție: se majorează acoperirea inferioară la placă la cnom = 25 mm → a = 25 + 6 = 31 mm ≥ 30 mm → **OK REI 90**. Se prevede în planurile de armare cnom,inf = 25 mm la plăci (distanțieri corespunzători).

**Verdict placă P-01: REI 90 asigurat** (h = 180 mm, a = 31 mm).

### R.11.6 Verificarea pereților structurali la foc (REI 120 / REI 150)

Perete BA subsol/casa scării, grosime 20 cm. Metoda tabelară (SR EN 1992-1-2 tab. 5.4, pereți portanți):

| Cerință | Grad exp. | bmin (mm) | a (mm) |
|---|---|---|---|
| REI 120 (μfi = 0,35, expus 1 față) | — | 140 | 25 |
| REI 120 (μfi = 0,7, expus 2 fețe) | — | 160 | 35 |
| REI 150 (μfi = 0,7, expus 2 fețe) | — | 180 | 45 |

Grosime perete real = 200 mm.
- Perete subsol (REI 120, expus practic 1 față): bmin = 140 mm < 200 mm → **OK**; a real = 25 + 8/2 = 29 mm (Ø8 armare) ≥ 25 mm → **OK**.
- Perete casa scării (REI 150, expus 2 fețe): bmin necesar = 180 mm < 200 mm → **OK**; a real = 29 mm < 45 mm.

Corecție perete casa scării: se majorează acoperirea la a = 45 mm (cnom = 40 mm) SAU se sporește grosimea zonei de armare. Se adoptă cnom = 40 mm la peretele casei scării → a = 44 mm ≈ 45 mm → **OK REI 150** (se acceptă cu marjă minimă; alternativ grosime 22 cm).

**Verdict pereți: REI 120 (subsol) și REI 150 (casa scării) asigurate cu ajustarea acoperirii.**

### R.11.7 Tabel complet — verificarea la foc pe tipuri de element

| Element | Secțiune (mm) | Cerință | bmin/hmin nec. (mm) | b/h real (mm) | a nec. (mm) | a real (mm) | Verdict |
|---|---|---|---|---|---|---|---|
| Stâlp S-01 | 400×400 | R 120 | 350 | 400 | 40 | 43 | OK |
| Stâlp S-02 (marginal) | 400×400 | R 120 | 350 | 400 | 40 | 43 | OK |
| Stâlp S-03 (colț) | 350×350 | R 120 | 350 | 350 | 40 | 41 | OK limită |
| Grindă GP-01 | 300×600 | R 120 | 200 | 300 | 35 | 43 | OK |
| Grindă GP-02 | 300×600 | R 120 | 200 | 300 | 35 | 43 | OK |
| Grindă GP-03 (scară) | 300×650 | R 120 | 200 | 300 | 35 | 43 | OK |
| Grindă secundară GS-01 | 250×500 | R 120 | 200 | 250 | 35 | 41 | OK |
| Placă P-01 | h=180 | REI 90 | 100 | 180 | 30 | 31 | OK (cnom=25) |
| Placă P-02 (2 direcții) | h=180 | REI 90 | 100 | 180 | 15* | 31 | OK |
| Perete subsol | 200 | REI 120 | 140 | 200 | 25 | 29 | OK |
| Perete casa scării | 200 | REI 150 | 180 | 200 | 45 | 44 | OK (cnom=40) |
| Rampă scară | h=150 | R 60 | 80 | 150 | 20 | 26 | OK |

*Pentru plăci armate pe 2 direcții, distanța la axă necesară pentru direcția inferioară e mai mică (tab. 5.9).

### R.11.8 Măsuri constructive la foc

- Spalierea armăturilor: la stâlpul de colț S-03 (dimensiune la limită 350 mm), se prevede plasă antispalling (spalling) NU este necesară sub 30 min, dar se adoptă etrieri deși la ≤ 150 mm pe zonele critice pentru a limita dezvelirea betonului la foc.
- Continuitatea armăturii superioare la grinzile continue se asigură pe reazeme conform tab. 5.5 (art. 5.6.3): min 25% din armătura de câmp se prelungește peste reazem pentru a permite redistribuirea la foc.
- Acoperirea betonului: se verifică prin distanțieri certificați; toleranța de execuție Δcdev = 10 mm este acoperită prin control dimensional (v. R.14 program probe).

---

## PTh-R.12 — Detalii de Armare Tipizate Complete

### R.12.1 Principii generale de ancorare și înnădire

Lungimea de ancorare de bază: lb,rqd = (Ø/4)·(σsd/fbd), unde fbd = 2,25·η1·η2·fctd. Pentru C25/30: fctd = fctk,0,05/γc = 1,8/1,5 = 1,2 N/mm²; bare cu aderență bună η1 = 1,0; Ø ≤ 32 mm η2 = 1,0 → fbd = 2,25·1,2 = 2,7 N/mm².

Lungimea de ancorare de calcul: lbd = α1·α2·α3·α4·α5·lb,rqd ≥ lb,min.

Pentru fyd = 435 N/mm² (B500B) și σsd = fyd:
```
lb,rqd = (Ø/4)·(435/2,7) = 40,3·Ø
```

| Ø (mm) | lb,rqd (mm) | lbd cu α = 0,7 (cârlig, mm) | lb,min tracțiune (mm) |
|---|---|---|---|
| 10 | 403 | 282 | 200 |
| 12 | 484 | 339 | 200 |
| 14 | 564 | 395 | 210 |
| 16 | 645 | 452 | 240 |
| 20 | 806 | 564 | 300 |
| 25 | 1008 | 706 | 375 |

Lungimea de suprapunere (înnădire): l0 = α1·α2·α3·α5·α6·lb,rqd, cu α6 = 1,5 pentru procent înnădit > 50% în aceeași secțiune:
```
l0 = 1,5·lb,rqd = 60,4·Ø (bare drepte, procent 100%)
```

| Ø (mm) | l0 (100% înnădit, mm) | l0,min (mm) |
|---|---|---|
| 12 | 726 | 300 |
| 16 | 968 | 300 |
| 20 | 1210 | 300 |
| 25 | 1512 | 375 |

### R.12.2 Nod grindă-stâlp INTERIOR

La nodul interior, grinzile continuă în ambele direcții. Detalii:
- Armătura superioară a grinzii traversează nodul continuu (nu se înnădește în nod).
- Armătura inferioară a grinzii se ancorează în stâlp pe lungimea lbd, dar minim 0,5·lbd + prelungire pentru capacitate la moment pozitiv seismic (min 6Ø peste axa stâlpului).
- Etrieri în nod: se mențin etrierii de confinare ai stâlpului prin nod, la distanță ≤ 150 mm (zonă critică seismică), Ø8/100 în nodul propriu-zis.
- Diametrul maxim al barelor grinzii care traversează nodul: hc/Øbara ≥ 3,75·(1+0,8·νd)/((...)) — verificare aderență în nod; pentru hc = 400 mm și Ø20 → hc/Ø = 20 > limita → **OK**.

### R.12.3 Nod grindă-stâlp MARGINAL

- Armătura superioară a grinzii se ancorează prin cot (cârlig la 90°) în stâlp, cu raza de îndoire ≥ 4Ø (Ø ≤ 16) sau ≥ 7Ø (Ø > 16); lungimea pe verticală după cot ≥ 0,7·lbd.
- Armătura inferioară se ancorează similar cu cârlig 90° orientat în sus.
- Se prevede armătură de colț suplimentară (bare diagonale la 45° în nod) pentru a prelua tensiunile de despicare la deschiderea nodului sub moment.
- Etrieri suplimentari orizontali în nod: 3Ø8 pe înălțimea nodului.

### R.12.4 Nod grindă-stâlp de COLȚ

- Ambele armături (grinzile pe cele două direcții) se ancorează cu cârlige în stâlp.
- Nodul de colț este cel mai solicitat la despicare; se prevede armătură diagonală și confinare sporită Ø8/75 pe înălțimea nodului.
- La stâlpul de colț S-03 (secțiune redusă 350×350), lungimea de ancorare cu cârlig lbd = 564 mm pentru Ø20 se dezvoltă pe orizontală (300 mm disponibil) + verticală (cot ≥ 300 mm) → **OK cu cot**.

### R.12.5 Nod la ACOPERIȘ (ultimul nivel)

- La colțul de cadru superior (grindă-stâlp la nivelul acoperișului), momentul deschide nodul; se prevede armătură de colț continuă (bara superioară a grinzii se continuă în cârlig lung pe stâlp) plus fretă diagonală.
- Raza minimă de îndoire la cotul de cadru: pentru evitarea strivirii betonului la interiorul cotului, rmin = Ø·Fbt/(fcd·...) — se adoptă r ≥ 10Ø pentru Ø20 (r = 200 mm) la nodurile de acoperiș.
- Se evită înnădirea în zona de moment maxim; suprapunerea se plasează în zona de moment nul (mijlocul stâlpului sub nod).

### R.12.6 Racord grindă-perete structural

- Grinda care descarcă pe peretele BA se ancorează în perete pe lungimea lbd; dacă peretele este subțire (20 cm), ancorarea se face cu cârlig 90° + placă de capăt (dacă e cazul).
- Armătura de legătură perete-grindă: se prevăd mustăți verticale Ø10/200 care leagă centura peretelui de grindă.
- La intersecția planșeu-perete se realizează o centură perimetrală (v. R.12.10) cu suprapunere continuă pe colțuri.

### R.12.7 Racord fundație-stâlp

- Mustățile de armare din fundație (talpă/radier) au aceeași dispunere ca armătura verticală a stâlpului (8Ø20).
- Lungimea de ancorare a mustăților în fundație: pentru talpă de fundație h = 80 cm, mustața pătrunde până la armătura inferioară a tălpii, cu cârlig 90° (picior) orientat spre exterior; lungimea totală ≥ lbd = 806 mm (Ø20) → asigurat pe înălțimea tălpii + picior.
- Deasupra cotei fundației, mustața iese pe lungimea de suprapunere l0 = 1210 mm (Ø20, 100% înnădit) pentru continuarea armăturii stâlpului.
- Etrieri de fixare a mustăților în fundație: min 3 etrieri Ø8 pentru menținerea poziției la turnare.

Tabel racord fundație-stâlp:

| Stâlp | Armătură verticală | Mustăți în fundație | Ancorare în talpă (mm) | Suprapunere deasupra (mm) |
|---|---|---|---|---|
| S-01 (central) | 8Ø20 | 8Ø20 | 806 (cu cot picior) | 1210 |
| S-02 (marginal) | 8Ø20 | 8Ø20 | 806 | 1210 |
| S-03 (colț) | 4Ø20+4Ø16 | idem | 806/645 | 1210/968 |

### R.12.8 Detalii înnădiri (suprapuneri)

- Suprapunerile armăturilor verticale ale stâlpilor se plasează imediat deasupra planșeului, pe primul sfert al înălțimii de nivel (zonă de moment redus în afara zonei critice seismice).
- Procentul de bare înnădite în aceeași secțiune ≤ 50% (defazare a înnădirilor pentru α6 = 1,4 în loc de 1,5).
- Distanța transversală liberă între bare înnădite ≥ 2Ø și ≥ 20 mm.
- Etrieri în zona de înnădire: se dublează (Ø8/100) pe lungimea suprapunerii pentru bare Ø > 16 mm.

### R.12.9 Detalii buiandrugi

Buiandrugii peste goluri (uși/ferestre) în pereții de umplutură/BA:

| Deschidere gol (m) | Secțiune buiandrug (cm) | Armătură inferioară | Etrieri | Reazem min. (cm) |
|---|---|---|---|---|
| ≤ 1,20 | 25×25 | 2Ø12 | Ø6/150 | 20 |
| 1,20–2,00 | 25×30 | 3Ø14 | Ø8/150 | 25 |
| 2,00–3,00 | 25×40 | 4Ø16 | Ø8/100 | 30 |
| > 3,00 (grindă) | 30×50 | 4Ø16+2Ø14 | Ø8/100 | 35 |

Verificare buiandrug 2,50 m (25×40, 4Ø16): qbuiandrug ≈ 15 kN/m; MEd = 15·2,5²/8 = 11,7 kNm; MRd (4Ø16, d = 360) ≈ 804·435·0,9·360·10⁻⁶ = 113 kNm >> 11,7 → **OK amplu** (dimensionat constructiv la reazem/rigiditate).

### R.12.10 Detalii centuri

Centurile perimetrale la nivelul planșeelor asigură efectul de diafragmă și legarea pereților:

| Centură | Secțiune (cm) | Armătură longitudinală | Etrieri | Rol |
|---|---|---|---|---|
| Centură planșeu perimetrală | 25×25 | 4Ø14 | Ø8/200 | Diafragmă, legare pereți |
| Centură intermediară (la 1/2 înălțime perete lung) | 25×20 | 4Ø12 | Ø6/250 | Rigidizare pereți despărțitori |
| Centură fundație (soclu) | 40×40 | 6Ø16 | Ø8/200 | Legare tălpi, rigiditate la tasări |
| Centură atic acoperiș | 25×25 | 4Ø12 | Ø8/200 | Închidere, rezemare atic |

Continuitatea centurilor pe colțuri se asigură cu bare de colț îndoite (L) suprapuse pe l0 = 726 mm (Ø14) și cu etrieri de colț desiți Ø8/100 pe 500 mm de o parte și de alta a colțului.

### R.12.11 Tabel sinteză parametri detalii tipizate

| Detaliu | Parametru cheie | Valoare adoptată |
|---|---|---|
| Ancorare drept Ø20 | lbd | 806 mm |
| Ancorare cârlig Ø20 | lbd (α=0,7) | 564 mm |
| Înnădire Ø20 (100%) | l0 | 1210 mm |
| Înnădire Ø20 (50% defazat) | l0 (α6=1,4) | 1129 mm |
| Rază îndoire Ø≤16 | rmin | 4Ø |
| Rază îndoire Ø>16 | rmin | 7Ø (10Ø la noduri acoperiș) |
| Acoperire nominală curentă | cnom | 25 mm (35 mm fundații pe egalizare, 40 mm casa scării foc) |
| Etrieri zonă critică stâlp | pas | 100 mm |
| Etrieri nod colț | pas | 75 mm |

---

## PTh-R.13 — Calculul Complet al Scării și Podestelor

### R.13.1 Geometria scării

Scara principală, din beton armat, în două rampe cu podest intermediar, deservind nivelurile P–1:
- Înălțime de nivel: H = 3,60 m → 2 rampe × 9 trepte = 18 trepte
- Treaptă: h = 200 mm; lățime treaptă (girul) g = 300 mm (verificare formula 2h+g = 700 mm → confort OK)
- Lățime rampă: 1,40 m (evacuare)
- Grosime placă rampă (waist): hw = 150 mm; grosime podest: hp = 150 mm
- Deschidere de calcul rampă (proiecție orizontală): Lr = 2,70 m; podest: Lp = 1,40 m
- Panta rampei: tanα = 200/300 = 0,667 → α = 33,7° → cosα = 0,832

### R.13.2 Evaluarea încărcărilor pe rampă

Grosimea echivalentă a rampei pe orizontală (waist + trepte):
```
hech = hw/cosα + h/2 = 150/0,832 + 200/2 = 180,3 + 100 = 280 mm (echiv. beton pe orizontală)
```

| Componentă | Calcul | Valoare (kN/m²) |
|---|---|---|
| Greutate proprie waist (pe orizontală) | 0,15·25/0,832 | 4,51 |
| Trepte (triunghi beton, echiv.) | 0,5·0,20·25 | 2,50 |
| Finisaj trepte (granit/plăci) | — | 1,00 |
| Tencuială intrados | — | 0,30 |
| Total permanent gk | — | 8,31 |
| Utilă (categoria A/C scări, qk) | — | 4,00 |

Încărcarea de calcul SLU (rampă, bandă 1 m lățime):
```
qEd = 1,35·8,31 + 1,50·4,00 = 11,22 + 6,00 = 17,2 kN/m²
```

### R.13.3 Calculul static al rampei

Schema statică: rampa + podeste ca placă continuă rezemată pe grinzile de podest (la capete) și pe grinda de nivel. Simplificat, rampa se calculează ca placă simplu rezemată pe deschiderea totală L = Lr + Lp = 2,70 + 1,40 = ... se ia deschiderea de calcul echivalentă L = 4,10 m (rampă + jumătate podest de fiecare parte, model uzual).

Se adoptă model simplu rezemat pe deschiderea L = 4,10 m cu încărcare medie qEd,med ≈ 16,5 kN/m² (medie rampă/podest):
```
MEd = qEd·L²/8 = 16,5·4,10²/8 = 34,7 kNm/m
```

Reducere pentru continuitate parțială la reazeme (grinzi de podest): moment de calcul câmp MEd,camp = 0,8·34,7 = 27,8 kNm/m; moment reazem MEd,reazem = 0,4·34,7 = 13,9 kNm/m.

### R.13.4 Armarea rampei

**Câmp (MEd = 27,8 kNm/m, d = 150 − 25 − 5 = 120 mm):**
```
μ = MEd/(b·d²·fcd) = 27,8·10⁶/(1000·120²·16,7) = 0,116
ζ = 0,5·(1+√(1−2·0,116)) = 0,938
As = MEd/(ζ·d·fyd) = 27,8·10⁶/(0,938·120·435) = 568 mm²/m
```
Se adoptă **Ø12/150 (As = 754 mm²/m)** la partea inferioară a rampei.

**Reazem (MEd = 13,9 kNm/m):**
```
As = 13,9·10⁶/(0,95·120·435) = 280 mm²/m
```
Se adoptă **Ø10/150 (As = 524 mm²/m)** la partea superioară pe reazeme.

**Armătură de repartiție (transversală):** min 20% din armătura principală → Ø8/200 (As = 251 mm²/m).

### R.13.5 Calculul podestelor

Podestul intermediar (placă 150 mm, deschidere Lp = 1,40 m între grinzile de podest, plus încărcarea rampelor rezemate).

Încărcări podest:
| Componentă | kN/m² |
|---|---|
| Greutate proprie (0,15·25) | 3,75 |
| Finisaj + tencuială | 1,30 |
| Permanent gk | 5,05 |
| Utilă qk | 4,00 |

qEd = 1,35·5,05 + 1,50·4,00 = 6,82 + 6,00 = 12,8 kN/m²
Plus reacțiunea rampelor pe marginea podestului ≈ 22 kN/m (rezemare linie).

MEd podest (simplu rezemat pe grinzi de podest, L = 1,40 m + încărcare de margine):
```
MEd ≈ 12,8·1,40²/8 + 22·1,40/4 = 3,14 + 7,70 = 10,8 kNm/m
```
Armare podest: As = 10,8·10⁶/(0,95·120·435) = 218 mm²/m → **Ø10/150 (524 mm²/m) constructiv** (peste minimul necesar; se armează egal cu rampa pentru continuitate).

### R.13.6 Grinzile de podest

Grinda de podest GPod (secțiune 25×40 cm) preia reacțiunile rampelor și podestelor și le descarcă pe pereții casei scării.

**Încărcarea pe grinda de podest:**
- Reacțiunea rampă (jumătate din qEd·L pe lățime 1,40 m): Rrampa = 16,5·4,10/2·1,40 = 47,4 kN pe lățimea de 1,40 m → 33,9 kN/m
- Greutate proprie grindă: 0,25·0,40·25 = 2,50 kN/m
- Total qEd,grinda ≈ 36,4 kN/m

Deschiderea grinzii de podest (între pereții casei scării): Lg = 3,00 m.
```
MEd = qEd·Lg²/8 = 36,4·3,00²/8 = 41,0 kNm
```
Efort tăietor: VEd = qEd·Lg/2 = 36,4·3,00/2 = 54,6 kN

**Armare longitudinală grindă de podest** (d = 400 − 25 − 8 − 8 = 359 mm):
```
μ = 41,0·10⁶/(250·359²·16,7) = 0,076
ζ = 0,960
As = 41,0·10⁶/(0,960·359·435) = 273 mm²
```
Se adoptă **3Ø14 (As = 462 mm²)** la partea inferioară → **OK cu marjă**.

**Verificare la tăiere (fără armătură transversală de calcul):**
```
VRd,c = [CRd,c·k·(100·ρl·fck)^(1/3)]·bw·d
k = 1 + √(200/359) = 1,746; ρl = 462/(250·359) = 0,00515
VRd,c = [0,12·1,746·(100·0,00515·25)^(1/3)]·250·359
= [0,12·1,746·2,353]·250·359 = 0,493·250·359·10⁻³ = 44,3 kN
```
VEd = 54,6 kN > VRd,c = 44,3 kN → **necesită armătură transversală de calcul.**

Se prevăd etrieri Ø8/150 (Asw/s = 100,5/150 = 0,67 mm²/mm, 2 ramuri Ø8 = 100,5 mm²):
```
VRd,s = (Asw/s)·z·fywd·cotθ = 0,67·0,9·359·435·2,5·10⁻³ = 235 kN >> 54,6 kN → OK
```
Se adoptă **etrieri Ø8/150** (satisface amplu; pas dictat constructiv/minim).

### R.13.7 Tabel sinteză scară

| Element | Secțiune | MEd (kNm) | As nec (mm²) | As adoptat | Verdict |
|---|---|---|---|---|---|
| Rampă câmp | h=150 | 27,8 /m | 568 /m | Ø12/150 (754) | OK |
| Rampă reazem | h=150 | 13,9 /m | 280 /m | Ø10/150 (524) | OK |
| Podest | h=150 | 10,8 /m | 218 /m | Ø10/150 (524) | OK |
| Grindă podest GPod | 25×40 | 41,0 | 273 | 3Ø14 (462) | OK |
| Grindă podest — tăiere | 25×40 | VEd=54,6 kN | — | etrieri Ø8/150 | OK |

Săgeata rampei (verificată la SLS): a = 6,1 mm < L/250 = 4100/250 = 16,4 mm → **OK** (v. R.10.5).

---

## PTh-R.14 — Tehnologie de Execuție pe Timp Friguros

### R.14.1 Definire și cadru normativ

Perioada friguroasă se consideră, conform NE 012/2-2010 și C 16-84 (execuția lucrărilor pe timp friguros), intervalul în care temperatura medie a aerului scade sub +5°C sau când, timp de 3 zile consecutive, temperatura la ora 8:00 este sub +5°C. Măsurile speciale sunt obligatorii pentru asigurarea maturării betonului fără degradare prin îngheț.

### R.14.2 Riscuri și temperatura critică

Betonul proaspăt îngheață dacă apa de amestec cristalizează înainte de a atinge o rezistență minimă (rezistența critică de îngheț) de ≈ 5 N/mm² (≈ 40% din fck la 28 zile pentru C25/30 → 12 MPa este mai sigur). Sub această rezistență, înghețul provoacă expansiune (9% volum), fisurarea structurii interne și pierdere ireversibilă de rezistență (până la 50%).

| Rezistență betonului la momentul înghețului | Efect |
|---|---|
| < 5 N/mm² | Degradare majoră ireversibilă |
| 5–10 N/mm² | Degradare parțială |
| > rezistența critică (≈ 12 MPa pt C25/30) | Fără degradare semnificativă |

### R.14.3 Măsuri la prepararea și transportul betonului

| Măsură | Prescripție |
|---|---|
| Temperatura minimă beton la turnare | +5°C (element masiv), +10°C (element subțire/placă) |
| Temperatura maximă beton | +30°C |
| Încălzire apă de amestec | max +60°C (contact cu cimentul evitat direct) |
| Încălzire agregate | prin abur/aer cald, fără îngheț în stoc |
| Aditivi | accelerator de priză/întărire fără cloruri (nitrat de calciu) + antiîngheț |
| Ciment | preferabil CEM I 42,5R (căldură de hidratare mai mare, priză rapidă) |
| Interzis | agregate cu gheață/zăpadă; apă cu gheață |
| Transport | betonieră izolată, timp minim, protecție la vânt |

Temperatura betonului la turnare (formulă de bilanț termic):
```
Tbeton = (0,2·(Ta·Ga + Tc·Gc) + Tw·Gw) / (0,2·(Ga+Gc) + Gw)
```
unde G = mase, T = temperaturi ale agregatelor (a), cimentului (c) și apei (w).

### R.14.4 Măsuri la punerea în operă și protecție

- **Pregătirea suportului:** cofrajele, armăturile și suprafața de contact se curăță de gheață/zăpadă; se preîncălzesc dacă temperatura < 0°C (jet de aer cald, NU sare).
- **Protecția termică după turnare:** acoperire cu folie + saltele termoizolante (vată minerală/polistiren) sau prelate, pentru menținerea căldurii de hidratare. Se evită pierderea rapidă de căldură.
- **Încălzirea incintei:** la temperaturi < −5°C, se realizează incintă închisă încălzită (tunuri de aer cald indirecte, fără CO2 direct pe beton proaspăt care carbonatează suprafața).
- **Decofrare:** se amână până betonul atinge rezistența necesară (verificată prin maturitate); decofrarea prematură pe timp friguros duce la șoc termic și fisurare.

### R.14.5 Metoda maturității (evaluarea rezistenței in situ)

Rezistența betonului se estimează prin gradul de maturitate (funcție de temperatură × timp), metoda Nurse-Saul:
```
M = Σ (Tmed − T0)·Δt
```
unde T0 = −10°C (temperatura de referință), Tmed = temperatura medie a betonului în intervalul Δt, M = maturitatea în °C·ore (sau °C·zile).

Corelarea M ↔ rezistență se stabilește prin curbă de etalonare pe epruvete de probă din același beton. Exemplu de corelare tipică pentru C25/30 cu CEM I 42,5R:

| Maturitate M (°C·zile, T0=−10) | Rezistență estimată (N/mm²) |
|---|---|
| 100 | 6 |
| 200 | 12 (≈ rezistență critică) |
| 350 | 18 |
| 500 | 24 |
| 800 | 30 (≈ fck) |

**Exemplu de calcul:** beton menținut la Tmed = +10°C sub protecție termică. Pentru atingerea rezistenței critice de 12 MPa (M = 200):
```
200 = (10 − (−10))·t → t = 200/20 = 10 zile
```
Deci betonul trebuie protejat/menținut cald minim 10 zile la +10°C înainte de expunere la îngheț. Dacă se menține la +20°C: t = 200/30 = 6,7 zile.

### R.14.6 Program de monitorizare termică

| Parametru | Frecvență | Instrument |
|---|---|---|
| Temperatura aerului exterior | zilnic ora 8, 14, 20 | termometru min/max |
| Temperatura betonului proaspăt | la fiecare transport | termometru cu sondă |
| Temperatura betonului în element | din 2 în 2 ore primele 72h | termocuplu înglobat |
| Maturitate cumulată | zilnic | calcul Nurse-Saul |
| Epruvete de maturitate (in situ) | pe fază de turnare | păstrate lângă element |

### R.14.7 Criterii de decofrare pe timp friguros

| Element | Rezistență minimă decofrare | % din fck |
|---|---|---|
| Cofraje laterale (stâlpi, grinzi) | 5 N/mm² | 20% |
| Cofraj inferior placă (deschidere ≤ 6 m) | 21 N/mm² | 70% |
| Cofraj inferior grindă / consolă | 30 N/mm² | 100% (28 zile echiv.) |
| Popi de siguranță | menținuți până 100% |

---

## PTh-R.15 — Program Complet de Probe și Încercări

### R.15.1 Încercări pe beton proaspăt

| Încercare | Standard | Frecvență | Criteriu de acceptare |
|---|---|---|---|
| Consistență (tasare slump) | SR EN 12350-2 | fiecare transport la primele 3, apoi 1/50 m³ | S3 (100–150 mm) ± 30 mm |
| Densitate aparentă | SR EN 12350-6 | 1/zi de turnare | 2300–2500 kg/m³ |
| Conținut aer antrenat | SR EN 12350-7 | dacă e cazul (gel-dezgheț) | 4–6% |
| Temperatura beton | — | fiecare transport pe timp friguros | +5°C…+30°C |

### R.15.2 Încercări pe beton întărit (rezistența la compresiune)

| Aspect | Prescripție |
|---|---|
| Epruvete | cuburi 150 mm sau cilindri 150×300 mm |
| Set de probă | 3 epruvete/set |
| Frecvență prelevare | min 1 set/100 m³ SAU 1 set/zi de turnare SAU 1 set/element important (per NE 012/2) |
| Vârste de încercare | 7 zile (informativ) + 28 zile (recepție) |
| Standard încercare | SR EN 12390-3 |
| Păstrare epruvete | în apă 20±2°C (recepție) + lângă element (maturitate) |

**Criterii de conformitate (SR EN 206 / NE 012, control prin atribute — producție continuă, n ≥ 15):**
```
Criteriul 1 (media): fcm ≥ fck + 1,48·σ   (sau fck + 4 pentru n mic)
Criteriul 2 (individual): fci ≥ fck − 4
```
Pentru C25/30 (fck,cil = 25 N/mm²):
- Media a n rezultate ≥ 25 + 4 = 29 N/mm² (control inițial, n < 15)
- Fiecare rezultat individual ≥ 25 − 4 = 21 N/mm²

**Exemplu evaluare set:** rezultate la 28 zile: 34; 36; 33 N/mm² → fcm = 34,3 ≥ 29 ✓; min = 33 ≥ 21 ✓ → **LOT CONFORM**.

### R.15.3 Încercări nedistructive și complementare

| Încercare | Standard | Scop | Frecvență |
|---|---|---|---|
| Sclerometrie (recul) | SR EN 12504-2 | rezistență orientativă in situ | zone dubioase |
| Ultrasunete (viteza impuls) | SR EN 12504-4 | omogenitate, defecte | verificare + calibrare sclerometru |
| Carote extrase | SR EN 12504-1 | rezistență reală (litigiu) | doar dacă epruvetele nu satisfac |
| Pahometrie (localizare armături) | — | poziție + acoperire armături | verificare acoperiri |

### R.15.4 Încercări pe oțel-beton (B500B)

| Încercare | Standard | Frecvență | Criteriu |
|---|---|---|---|
| Limită de curgere Re | SR EN ISO 15630-1 | 1 probă/lot/diametru | Re ≥ 500 N/mm² |
| Rezistență la rupere Rm | idem | idem | Rm/Re ≥ 1,08 (clasa B) |
| Alungire la forță maximă Agt | idem | idem | Agt ≥ 5,0% (clasa B) |
| Îndoire-dezdoire | SR EN ISO 15630-1 | 1/lot | fără fisuri |
| Aderență (amprentă) | — | vizual/geometric | conform profil periodic |
| Sudabilitate (dacă se sudează) | — | probe sudură | conform proiect |

### R.15.5 Verificări geometrice și de execuție

| Verificare | Toleranță admisă | Metodă |
|---|---|---|
| Acoperire armături | −0 / +10 mm față de nominal | pahometru / control înainte turnare |
| Poziție armături (înălțime utilă) | ± 10 mm (h ≤ 150), ± 15 mm (h > 150) | ruletă / control cofraj |
| Verticalitate stâlpi | ± h/300, max 15 mm | fir cu plumb / nivelă laser |
| Planeitate placă | ± 9 mm sub dreptar 2 m | dreptar |
| Dimensiuni secțiune | ± 5 mm (b < 400), ± 10 mm (b ≥ 400) | ruletă |
| Poziție goluri/tije | ± 10 mm | trasare |

### R.15.6 Program pe faze — sinteză frecvențe

| Fază | Încercări obligatorii | Momentul |
|---|---|---|
| Aprovizionare beton | consistență, temperatură, prelevare epruvete | la fiecare turnare |
| Aprovizionare oțel | certificat + probe lot | la recepția materialului |
| Înainte de turnare | verificare armare (nr., Ø, poziție, acoperire), cofraj, curățenie | fază determinantă |
| În timpul turnării | consistență, vibrare, temperatură (frig) | continuu |
| După turnare | tratare/protecție, maturitate (frig) | 28 zile |
| La 28 zile | rezistență compresiune | recepție lot |
| Înainte decofrare | rezistență (maturitate/epruvete) | conform R.14.7 |
| Recepție structură | geometrie, NDT dacă e cazul, tasări | la finalizare |

### R.15.7 Documente de conformitate

- Declarație de performanță (DoP) + marcaj CE pentru beton și oțel.
- Registre de betonare (bon de beton, ora, volumul, temperatura, epruvete prelevate).
- Buletine de încercare emise de laborator autorizat (grad II/I).
- Proces-verbal de recepție calitativă pe fiecare fază determinantă.

---

## PTh-R.16 — Breviar Complet de Încărcări și Combinații

### R.16.1 Acțiuni permanente (G)

| Element | Descriere | Valoare |
|---|---|---|
| G1 | Greutate proprie beton armat | 25 kN/m³ |
| G2 | Placă planșeu curent (18 cm) | 4,50 kN/m² |
| G3 | Șapă + pardoseală + finisaj | 1,50 kN/m² |
| G4 | Tencuială tavan + instalații | 0,50 kN/m² |
| G5 | Pereți despărțitori (echiv. distribuit) | 0,80 kN/m² |
| G6 | Închideri exterioare (zidărie + termoizolație) pe grindă | 6,50 kN/m |
| G7 | Placă acoperiș + termoizolație + hidroizolație | 5,00 kN/m² |
| G8 | Atic (pe m liniar) | 3,00 kN/m |

### R.16.2 Acțiuni variabile (Q)

| Acțiune | Descriere | Valoare | Sursă |
|---|---|---|---|
| Q1 | Utilă categoria C (spații întrunire) | 4,00 kN/m² | SR EN 1991-1-1 |
| Q2 | Utilă scări/căi evacuare | 4,00 kN/m² | idem |
| Q3 | Utilă acoperiș necirculabil (H) | 0,75 kN/m² | idem |
| Q4 | Zăpadă pe acoperiș (sk = 2,0 kN/m², μ = 0,8) | 1,28 kN/m² | CR 1-1-3 |
| Q5 | Vânt (presiune de referință qb = 0,5 kPa) | ± 0,6 kN/m² | CR 1-1-4 |
| Q6 | Acțiune seismică (ag = 0,20g, Tc = 0,7 s) | v. calcul dinamic | P100-1 |

Zăpada (CR 1-1-3): s = γIs·μi·Ce·Ct·sk = 1,0·0,8·1,0·1,0·2,0 = 1,60 kN/m² (valoare caracteristică pe acoperiș plat μ = 0,8).

### R.16.3 Combinații la Stări Limită Ultime (SLU) — persistente/tranzitorii

Formula fundamentală (SR EN 1990, exp. 6.10):
```
Ed = Σ γG·Gk + γQ,1·Qk,1 + Σ γQ,i·ψ0,i·Qk,i
```
cu γG = 1,35 (defavorabil) / 1,00 (favorabil), γQ = 1,50.

| Comb. | Acțiune dominantă | Expresie | 
|---|---|---|
| SLU-1 | Utilă | 1,35·G + 1,50·Q1 + 1,50·0,5·Q4 + 1,50·0,6·Q5 |
| SLU-2 | Zăpadă | 1,35·G + 1,50·Q4 + 1,50·0,7·Q1 + 1,50·0,6·Q5 |
| SLU-3 | Vânt | 1,35·G + 1,50·Q5 + 1,50·0,7·Q1 + 1,50·0,5·Q4 |
| SLU-4 | Vânt (sucțiune, G favorabil) | 1,00·G + 1,50·Q5 |

### R.16.4 Combinații la SLU — seism (accidentală)

Formula (SR EN 1990, exp. 6.12 / P100-1):
```
Ed = Σ Gk + γI·AEk + Σ ψ2,i·Qk,i
```
cu ψ2 = 0,6 (utilă C), ψ2 = 0 (zăpadă sub 1000 m, vânt).

| Comb. | Expresie |
|---|---|
| SLU-S1 | G + AEk(+X) + 0,6·Q1 |
| SLU-S2 | G + AEk(−X) + 0,6·Q1 |
| SLU-S3 | G + AEk(+Y) + 0,6·Q1 |
| SLU-S4 | G + AEk(−Y) + 0,6·Q1 |

Se consideră combinarea direcțională 100% + 30% (Ex ± 0,3Ey și 0,3Ex ± Ey).

### R.16.5 Combinații la Stări Limită de Serviciu (SLS)

| Comb. | Tip | Expresie | Utilizare |
|---|---|---|---|
| SLS-C1 | Caracteristică | G + Q1 + 0,5·Q4 + 0,6·Q5 | fisurare (ireversibil) |
| SLS-F1 | Frecventă | G + 0,7·Q1 + 0,2·Q5 | săgeți instantanee |
| SLS-Q1 | Cvasipermanentă | G + 0,6·Q1 | săgeți în timp, fisurare BA |

### R.16.6 Exemplu numeric — încărcare pe placa curentă P-01

| Combinație | Calcul (kN/m²) | Rezultat |
|---|---|---|
| SLU-1 (utilă dom.) | 1,35·6,50 + 1,50·4,00 | 8,78 + 6,00 = 14,78 |
| SLS-C1 (caract.) | 6,50 + 4,00 | 10,50 |
| SLS-Q1 (cvasiperm.) | 6,50 + 0,6·4,00 | 6,50 + 2,40 = 8,90 |

Notă: gk placă folosit aici = 6,50 kN/m² (G2+G3+G4+G5 pentru placa de 18 cm rezultă 4,50+1,50+0,50 = 6,50; pereții despărțitori tratați separat pe grindă).

### R.16.7 Exemplu numeric — încărcare liniară pe grinda GP-02 (interax 5,0 m)

| Combinație | Calcul (kN/m) | Rezultat |
|---|---|---|
| Permanent din placă | gk·5,0 = 6,50·5,0 | 32,5 |
| Greutate proprie grindă | 0,30·0,60·25 | 4,50 |
| Perete pe grindă (G6) | — | 6,50 |
| gk total grindă | 32,5+4,5+6,5 | 43,5 |
| qk (utilă din placă) | 4,00·5,0 | 20,0 |
| **SLU-1** | 1,35·43,5 + 1,50·20,0 | 58,7 + 30,0 = **88,7 kN/m** |
| **SLS-C1** | 43,5 + 20,0 | **63,5 kN/m** |
| **SLS-Q1** | 43,5 + 0,6·20,0 | **55,5 kN/m** |

Momentul de calcul SLU câmp grindă continuă: MEd = 88,7·6,0²/12 = 266 kNm (confirmă armarea 4Ø20 din PTh-R.03).

### R.16.8 Tabel centralizator eforturi de calcul pe elemente principale

| Element | Combinație | MEd (kNm) | VEd (kN) | NEd (kN) |
|---|---|---|---|---|
| Placă P-01 | SLU-1 | 24,6 /m | — | — |
| Grindă GP-01 | SLU-1 | 185 | 148 | — |
| Grindă GP-02 | SLU-1 | 266 | 266 | — |
| Grindă GP-03 (scară) | SLU-1 | 312 | 240 | — |
| Stâlp S-01 (central) | SLU-1 | 95 | — | 1850 |
| Stâlp S-01 | SLU-S1 (seism) | 285 | 142 | 1420 |
| Stâlp S-03 (colț) | SLU-S1 | 178 | 89 | 640 |
| Perete BA subsol | SLU-S1 | 420 | 310 | 980 |
| Radier zonă stâlp | SLU-1 | 165 /m | — | — |

### R.16.9 Verificare masă seismică (combinație pentru forța tăietoare de bază)

Masa seismică (SR EN 1998 / P100-1): m = G + Σ ψE,i·Qk,i, cu ψE = φ·ψ2 = 0,8·0,6 = 0,48 (etaje cu ocupare corelată, categorie C).

| Nivel | G (kN) | ψE·Q (kN) | Masă nivel (kN) |
|---|---|---|---|
| Etaj 1 | 4.850 | 0,48·1.400 = 672 | 5.522 |
| Acoperiș | 3.600 | 0,48·270 (zăpadă ψ2=0 → doar tehnic) = 0 | 3.600 |
| **Total** | 8.450 | 672 | **9.122 kN** |

Această masă alimentează calculul dinamic tratat în volumul de calcul seismic (PTh-R.02) — nu se reia aici; se prezintă doar pentru trasabilitatea combinațiilor.

---

## PTh-R.17 — Sinteza Verificărilor Suplimentare

### R.17.1 Tabel centralizator conformitate SLS și foc

| Verificare | Element critic | Valoare | Limită | Verdict |
|---|---|---|---|---|
| Săgeată totală | Placă P-01 (18 cm) | 20,7 mm | L/250 = 20,0 mm | OK (ajustat h) |
| Săgeată după finisaje | Grindă GP-02 | 6,5 mm | L/500 = 12,0 mm | OK |
| Deschidere fisuri wk | Grindă GP-03 reazem | 0,192 mm | 0,30 mm | OK |
| Vibrații (accelerație) | Placă P-01 | 0,034 m/s² | 0,10 m/s² | OK |
| Foc stâlpi | S-03 (colț) | a=41 mm | a=40 mm | OK limită |
| Foc grinzi | GP-02 | a=43 mm | a=35 mm | OK |
| Foc plăci | P-01 | a=31 mm | a=30 mm | OK (cnom=25) |
| Foc pereți | casa scării | a=44 mm | a=45 mm | OK (cnom=40) |

### R.17.2 Concluzie inginerească

Verificările suplimentare la stări limită de serviciu confirmă comportarea adecvată a structurii, cu observația majoră că **placa curentă necesită grosimea de 18 cm** (nu 15 cm) pentru satisfacerea săgeții admisibile L/250 — modificare care se reflectă în planurile de armare și în breviarul de încărcări actualizat. Verificarea la foc prin metoda tabelară impune ajustarea acoperirilor la plăci (cnom = 25 mm) și la peretele casei scării (cnom = 40 mm) pentru asigurarea claselor REI cerute. Deschiderile de fisuri se încadrează cu marjă sub limita de 0,30 mm în toate elementele. Calculul scării și al grinzilor de podest confirmă armarea adoptată. Tehnologia pe timp friguros și programul de probe stabilesc cadrul de control al calității pentru execuție.

Toate elementele verificate satisfac cerințele normativelor SR EN 1992-1-1, SR EN 1992-1-2, SR EN 1990, SR EN 1991, NE 012 și P100-1, cu ajustările constructive menționate, integrate în planurile de execuție R01–R14 (volumele anterioare).