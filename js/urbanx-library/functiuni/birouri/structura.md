## 1. Date generale

Memoriu de rezistență DTAC pentru **clădire de birouri clasa A, S+P+6E, beton armat, sistem dual (cadre + nucleu central rigidizant)**, open-space cu flexibilitate maximă.

| Parametru | Valoare |
|---|---|
| Regim | S+P+6E |
| Ac / Ad | ~730 / ~5.480 mp (8 niv × ~685) |
| Plan ax-ax | 32,40 × 24,30 m |
| Tramă | 8,10 × 8,10 m (4×3 travei) |
| H etaj / parter / subsol | 3,60 / 4,20 / 3,00 m |
| Htot suprateran | 4,20 + 6×3,60 = **25,80 m** |
| Cotă fundare | ~−3,80 m |

**Clasificare:** categoria importanță **C** (adoptat conservator **B**); clasa seismică III (γI,e 1,0), ipoteză acoperitoare **II (γI,e = 1,2)**; consecințe **CC2/RC2** (KFI 1,0).

**Normative:** Legea 10/1995, SR EN 1990/NA, CR 0/2012, SR EN 1991 + CR 1-1-3/1-1-4, SR EN 1992 (EC2), SR EN 1998 (EC8), **P100-1/2013**, NP 112/2014, NP 074/2014, P118-1/2/3, NE 012.

## 2. Sistemul structural — dual

**Cadre spațiale** (stâlpi + dală, tramă 8,10) gravitațional + parte laterală + **nucleu central rigidizant** (pereți b.a. în jurul scării+lifturi = tub închis) principal la forțe laterale. Nucleul preia **~65-75%** din forța tăietoare → **sistem dual cu pereți predominanți** (P100-1 §5.1).

**Justificare:** rigiditate torsională/translație mare (drift la H 25,80 m), flexibilitate open-space (dală fără pereți în câmp), ductilitate+redundanță (cadre ductile + pereți), excentricitate mică (nucleu la centrul de masă), control fisurare fațadă cortină la SLS.

**Regularitate:** în plan (simetric, e0 < 0,30r, r > ls, compact) + în elevație (nucleu continuu, fără variații masă >50%, parter 4,20 vs 3,60 dar rigiditate relativă >70% → fără soft-storey) → **metoda forțelor laterale echivalente** + validare modală cu spectru.

## 3. Factor de comportare q

Sistem dual DCM: q = q0·kw; q0 = 3,0·αu/α1 = 3,0·1,2 = 3,6; kw = 1,0 (nucleu zvelt α0 = 25,80/8,10 ≈ 3,2 > 2). **q = 3,6** (DCM). Amplificare deplasări c = q = 3,6.

## 4. Planșee — dală groasă (flat slab)

**Dală fără grinzi** rezemată pe stâlpi (open-space + plenum HVAC), grinzi doar bordaj + axe nucleu. Economie ~0,45-0,60 m/nivel. h = L/(28-32) = 8100/30 = 270 → **h 280 mm C35/45**; L/d = 8100/250 = 32,4 (< ~34 OK). Grinzi bordaj/buiandrugi 300×600.

**Străpungere stâlp interior 700×700** (SR EN 1992-1-1 §6.4): d = 280−30−16 = 235 mm; V_Ed = p_Ed·A_af = 14,8·65,6 = 970 kN; β 1,15 → V_Ed,β = 1116 kN. u0 = 2800, u1 = 5753 mm. v_Ed = 1116·10³/(5753·235) = **0,826 N/mmp**; v_Rd,c = 0,12·1,92·(100·0,010·35)^⅓ = **0,753** < v_Ed → **necesită armătură de străpungere**. v_Ed,u0 = 1,70 < v_Rd,max 6,01 (fără zdrobire biele) ✓. A_sw = 567 mmp/perimetru → **etrieri Ø10, ~8/perimetru, min. 2 perimetre** până la u_out = 6307 mm; alternativ **capiteluri ascunse** (îngroșare 380 mm pe 2,4×2,4).

## 5. Acțiuni (SR EN 1991)

**Permanente planșeu curent:** dală 280 (7,00) + raised floor (0,60) + plafon+instalații (0,50) + șapă (0,40) = **8,50 kN/mp**; fațadă cortină 0,80-1,00 kN/mp (liniar ~3,2 kN/m). Terasă: dală 7,00 + termo/hidro/protecție 2,50 + tehnic 0,50 = **10,00**.

**Utile:** birouri B 3,00 + pereți mobili 1,00 = **4,00**; coridoare C1 3,0-4,0; terasă H 0,40; parcare F 2,50; scări 4,00.

**Zăpadă (CR 1-1-3):** s = 1,0·0,8·1,0·1,0·2,0 = **1,60 kN/mp**. **Vânt (CR 1-1-4):** qb 0,5, qp(25,80) = 2,1·0,5 = 1,05; we = 1,3·1,05 = 1,37 kPa; **Fw ≈ 1145 kN** (față 836 mp) < seism → seismul dimensionant.

## 6. Calcul seismic

**Amplasament (ex. NE Iași):** ag 0,20g, Tc 0,70s, TB 0,14/TD 3,0, β0 2,50, γI,e 1,2, q 3,6.

**Masă:** g_seism = 8,50 + 0,24·4,0 = 9,46 kN/mp (ψE = 0,8·0,3 = 0,24); +stâlpi/nucleu/fațadă ~2,5 → G_nivel ≈ 8.190 kN (~835 t); **W ≈ 56.200 kN (~5.730 t)**.

**T1** = Ct·H^0,75 = 0,05·25,80^0,75 = **0,57s** (Rayleigh 0,62; adoptat 0,60); TB < T1 < TC → palier β = β0 = 2,50.

**Sd(T1)** = ag·β/q = 0,20g·2,50/3,6 = **0,139g**. **Fb = γI,e·Sd·m·λ = 1,2·0,139·56.200·0,85 ≈ 7.970 kN** (cs = 14,2%) > Fw 1145. Distribuție triunghiulară (terasă 1810 → parter 295 kN).

**Drift** (c = q = 3,6; ν = 0,5 SLS), h = 3600:

| Verificare | d_r,e | amplificat | limită | grad |
|---|---|---|---|---|
| SLS (0,5q) | 4,0 | 7,2 mm | 27,0 (0,0075h) | 0,27 ✓ |
| SLU (q) | 4,0 | 14,4 mm | 90,0 (0,025h) | 0,16 ✓ |

Nucleul rigidizant → drift mult sub limite (marjă amplă, integritate fațadă cortină).

## 7. Verificarea elementelor

**Nucleu (pereți t 400, C35/45, ~8,10×6,20 tub, Ac 11,44 mp):** N_Ed ~12.000 kN; V_Ed = 0,70·Fb = 5.580 kN; M_Ed ≈ Fb·0,67H = 137.700 kNm. νd = 12.000·10³/(11,44·10⁶·23,3) = **0,045 << 0,40** ✓. V_Rd,max = 0,24·0,86·0,40·6,48·23,3·10³ = **12.470 > 5.580** ✓; armătură orizontală Ø14/150 pe 2 fețe + bulbi confinați. **Buiandrugi de cuplare** (l/h < 2) armare diagonală (P100-1 §5.5.3.5).

**Stâlpi 700×700 C35/45:** N_Ed ≈ 14,8·65,6·7 = 6.800 kN; νd = 6.800·10³/(490.000·23,3) = **0,396 < 0,45** (DCM) ✓; armare simetrică 12Ø25 (ρ 1,20%); reducere 600×600, 500×500 la etaje superioare. Condiție **stâlp-tare** ΣM_Rc ≥ 1,3·ΣM_Rb ✓.

**Dală:** m_Ed⁻ = 0,65·p·L²/8 = 79 kNm/m → Ø16/120 fâșie stâlp, Ø14/150 câmp + străpungere (§4).

**Ordinul II:** θ = P_tot·d_r/(V_tot·h) = 45.000·14,4/(6.335·3600) = **0,028 < 0,10** → neglijabil.

## 8. Nucleul central — element principal lateral

Tub închis b.a. (8,10×6,20 ext., pereți 400 mm), preia **~65-75%** din tăietoare+răsturnare; goluri uși legate prin buiandrugi de cuplare ductili (pereți cuplați, disipare); zonă critică bază h_cr = max(lw; Hw/6) = 8,10 m (~2 niveluri) cu bulbi confinați. I_nucleu ≈ 90 m⁴ (dominant vs. I_cadre ~15 m⁴).

## 9. Infrastructura

Subsol = **cutie rigidă** (pereți perimetrali + planșeu + radier), încastrare la ±0,00. **Radier general** (N nucleu ~12.000 kN + uniformizare tasări + răsturnare).

**Geotehnic (ex.):** argilă prăfoasă vârtoasă 1,2-8 m, pietriș >8 m, pconv 250 kPa, NHS −2,50, E 12-18 MPa, cat. 2.

**Radier:** p_ef = (62.000 + 19.700)/787 = **104 kPa < 250** ✓ (SLU ~130, Fs > 1,8); grosime **1,00 m** (1,20 sub nucleu), 0,80 rest. **Plutire (UPL):** hw 1,30 m → U = 10·1,30·787 = 10.230 kN; G_stab 45.000 → **G/U = 4,4 > 1,1** ✓. Săpătură: **berlinez** (piloți Ø400 la 1,5 m + dulapi) sau **pereți mulați 600** etanși (top-down opțional).

## 10. Detalii armare seismică (DCM)

**Stâlpi:** ρ 1-4%, l_cr = max(hc; lcl/6; 450), etrieri ≥8 mm la s = min(b0/2; 175; 8Ø_long), confinare ωwd ≥ 0,08. **Grinzi:** armare comprimată ≥50% întinsă, l_cr = hw, V din capacity design. **Pereți nucleu:** bulbi confinați lc ≥ max(0,15lw; 1,5bw), ρv bulbi ≥0,5%, inimă ≥0,20%/direcție, ωwd ≥0,08. **Noduri:** armare de nod + ancoraje majorate.

## 11. Materiale

| Element | Beton | Oțel |
|---|---|---|
| Radier/pereți subsol | C30/37 (XC2/XC3) | BST500C |
| Nucleu | C35/45 | BST500C |
| Stâlpi P-E3 | C35/45 | BST500C |
| Stâlpi E4-E6 | C30/37 | BST500C |
| Dală/grinzi | C35/45 | BST500C |

fcd = 35/1,5 = 23,3 MPa; fyd = 500/1,15 = 435 MPa. BST500C (εuk ≥7,5%, ft/fy ≥1,15). Acoperiri: 25 interior, 35 subsol, 40 radier la teren.

## 12. Rezistența la foc (P118-1/2013)

Grad **II RF** (birouri clasa A): stâlpi/pereți portanți R180, planșee dală REI90-120, grinzi R120, casa scării R180 + compartimentare REI180. Asigurat prin acoperiri (SR EN 1992-1-2 tabelar): dală 280 cu c≥25 → REI120; stâlpi 700×700 c≥35 → R180. Fără protecții suplimentare.

## 13. Concluzii și verificare

| Verificare | Rezultat | Stare |
|---|---|---|
| Sistem dual DCM, regulat | confirmat | OK |
| q | 3,6 | OK |
| Dală (săgeată) | 280 mm (L/29) | OK |
| Străpungere | armătură Ø10 + capitel | OK |
| Fb | 7.970 kN (cs 14,2%) | — |
| Drift SLS/SLU | 0,27 / 0,16 grad | OK |
| νd stâlpi / pereți | 0,396 / 0,045 | OK |
| Forfecare nucleu | 5.580 < 12.470 | OK |
| Ordin II θ | 0,028 < 0,10 | OK |
| Presiune teren | 104 < 250 kPa | OK |
| Plutire UPL | 4,4 > 1,1 | OK |
| Foc grad II | R180/REI120 acoperiri | OK |

Sistem dual cadre b.a. + nucleu central rigidizant + dală 280 mm + radier general satisface cerința A (Legea 10/1995) în toate grupările (P100-1/2013, CR 0/2012, SR EN 1992/1998). Nucleul preia dominant forțele laterale cu drift mult sub limite. Cadre 8,10×8,10 + dală fără grinzi = flexibilitate open-space clasa A + H liber maxim. **Verificare tehnică** verificatori atestați MDLPA: **A1** (rezistență b.a.) + **Af** (teren/fundații). Calcule detaliate, cofraj/armare, extrase la DTAC→PT+DE pe model spațial EF (modal cu spectru + eventual dinamic neliniar).
