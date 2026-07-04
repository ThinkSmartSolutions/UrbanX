## 1. Date generale

Memoriu de rezistență DTAC pentru **imobil de locuințe colective S+P+4E**, zonă seismică ag = 0,25g, Tc = 0,7 s.

| Parametru | Valoare | Referință |
|---|---|---|
| Clasa de importanță-expunere | **III** (γI,e = 1,0) | P100-1/2013 tab. 4.2 |
| Clasa de consecințe | CC2 (KFI = 1,0) | CR 0/2012 |
| Categoria de importanță | C | HG 766/1997 |
| Categoria geotehnică | 2 (risc moderat) | NP 074 |

Cerința A1 (Legea 10/1995): siguranța vieții la IMR 225 ani (SLU) + limitarea degradărilor la IMR 40 ani (SLS). Amprentă ~24,00×15,00 m (~360 mp/nivel), corp compact. Cote: subsol −3,00, parter +3,00, etaje la 2,90 m, H suprastructură ~14,60 m, de la radier ~17,60 m.

## 2. Sistemul structural și justificare

**Sistem cu PEREȚI STRUCTURALI DIN BETON ARMAT (diafragme)** pe ambele direcții; la parter (deschideri mari) **sistem dual cu pereți predominanți** (pereții preiau ≥ 65% din forța tăietoare — P100 §5.2.2.1). Subsol = **cutie rigidă** (pereți perimetrali 30 cm, planșeu peste subsol 20 cm diafragmă, radier).

**Justificare:** (a) rigiditate laterală superioară cadrelor → drift sub limite la ag=0,25g; (b) la Tc=0,7s, structura cu pereți are T1 mic (rigidă); (c) densitate firească de pereți la locuințe (2,5-2,9% arie/direcție); (d) mecanism ductil stabil DCM fără soft-storey; (e) tehnologie eficientă (cofraje perete + planșee dală).

**Ductilitate DCM.** Factor de comportare: q = q0·kw = 3,0·1,15·1,0 = **3,45** (pereți/dual, αu/α1=1,15, kw=1,0).

## 3. Regularitate

**În plan:** λ = 24/15 = 1,60 ≤ 4; excentricitate e0 ≈ 0,06·L ≤ 0,30·rx; r > ls (X 1,25, Y 1,31); goluri planșeu (scară+lift) ~9% < 15% → **regulată**. **În elevație:** pereți continui S→E4, rigiditate/masă constante, fără retrageri → **regulată**. Metodă: forțe laterale echivalente + validare modală spațială; fără penalizări q.

## 4. Infrastructura

**Geotehnic:** strat 2 argilă prăfoasă vârtoasă (φ'18°, c'25), strat 3 nisip argilos îndesat (φ'30°, Eoed 22.000), NHmax −2,00 m, pconv = 250 kPa, cotă fundare −3,20 m (strat 3).

**Radier general b.a.** (rol: uniformizare presiuni + cuvă etanșă XC2/XA1 + diafragmă bază): grosime 50 cm (70 sub pereți încărcați), C30/37.
- **Presiune teren (SLS):** Ntot ≈ 28.840 kN / A 383,8 mp = **75,1 kPa < 250** ✓ (tasare ~1,5-2,5 cm, Δs/L < 1/500).
- **Plutire (UPL/EQU):** subpresiune Fsub = 10·1,20·383,8 ≈ 4.606 kN; Gstab·0,9 = 7.200 ≥ Fsub·1,1 = 5.067 ✓ (epuisment provizoriu în execuție).

**Pereți subsol** (30 cm, C30/37) la împingere pământ (K0 = 1−sin18° = 0,691) + hidrostatic: σh,bază ≈ 57,3 kPa; MEd ≈ 58 kNm/m încastrare → **Ø12/15 (754 mmp/m)** față pământ ✓. **Planșeu peste subsol** 20 cm = diafragmă de bază (colectori + centuri).

## 5. Suprastructura

| Element | Grosime | Beton |
|---|---|---|
| Pereți S+P | 30 cm | C30/37 (bulbi) |
| Pereți E1-E2 | 25 cm | C30/37 |
| Pereți E3-E4 | 20 cm | C25/30 |
| Nucleu scară/lift | 25 cm | C30/37 (tub închis) |
| Planșee curente | 15 cm | C25/30 |
| Planșeu subsol/terasă | 20/15 cm | C25/30 |

Densitate pereți: X 2,9%, Y 2,6% (> 1,5%). bw,min ≥ max(150; hetaj/20=145) ✓. Planșee dală = diafragmă rigidă (L/d ~37, verificat săgeată). Nucleu = tub închis (rigidizare + torsiune), buiandrugi de cuplare armați seismic.

## 6. Acțiuni (SR EN 1991, CR 0/2012)

**Permanente:** planșeu 5,55 kN/mp, pereți despărțitori 1,50, terasă 6,50, anvelopă 7,0 kN/m. **Utile (categ. A):** camere 2,0; balcoane 3,0; scări 3,0; parcare subsol (F) 2,5; terasă (H) 0,75 kN/mp; ψ0=0,7/ψ1=0,5/ψ2=0,3. **Zăpadă:** s = 0,8·2,0 = 1,60 kN/mp. **Vânt:** qb 0,5 kPa; wnet ~1,3 kPa; Fw ~410 kN << Fb seismic → **seismul guvernează**. Împingere pământ subsol (§4). Masă seismică ψE = 0,8·0,3 = 0,24.

## 7. Calcul seismic

**Spectru:** ag=0,25g, Tc=0,7s, TB=0,14, β0=2,50; Sd(palier) = 0,25g·2,50/3,45 = **0,181g**. **T1** = 0,05·14,6^0,75 ≈ 0,37 s (modal X 0,41, Y 0,38) → palier maxim.

**Forța de bază:** Fb = γI·(Sd/g)·G·λ (λ=0,85). Gtot,seism ≈ 21.834 kN → **Fb ≈ 3.359 kN/direcție**; coeficient seismic **0,154**. Mrast bază ≈ 30.900 kNm. Distribuție pe niveluri triunghiulară (terasă 927 → E1 207 kN).

**Drift** (dre din pereți rigizi):

| Nivel | h | dr,SLS (mm) | ≤ 0,005h | dr,SLU (mm) | ≤ 0,025h |
|---|---|---|---|---|---|
| E4-E1 | 2,90 | 1,5-1,9 | 14,5 ✓ | 3,1-3,8 | 72,5 ✓ |
| Parter | 3,00 | 1,47 | 15,0 ✓ | 2,93 | 75,0 ✓ |

Marjă > 7× la SLS (avantajul pereților la ag=0,25g); dtop ~16 mm elastic, ~55 mm SLU (< H/50).

## 8. Verificări de rezistență

**Perete de capăt** (lw 4,0, bw 30, C30/37): νd = 3.200.000/(300·4000·20) = **0,133 < 0,4** (DCM) ✓; MEd ≈ 6.500 kNm; bulbi 6Ø20 → MRd ≈ 7.400 kNm ✓; ρv,min câmp 0,25% (Ø10/20). **Forfecare:** VEd = 1,5·850 = 1.275 kN; VRd,max ≈ 2.850 (biela OK); armătură orizontală Ø10/15 → VRd,s ≈ 1.400 kN ✓; ρh,min 0,20%.

**Planșee** (pd 10,49 kN/mp): MEd câmp ~7,0 / reazem ~10,5 kNm/m → As,min guvernează Ø8/20 + suplimentar reazem Ø10/20 ✓. **Stâlpi subsol** (40×40, C30/37): NEd 1.800 kN, νd 0,56, 8Ø20 (1,57%), NRd 4.293 kN ✓ + îngroșare placă anti-străpungere. **Radier:** MEd ~280 kNm/m → Ø20/18 rețea dublă ✓.

## 9. Detalii de armare seismică (DCM)

**Zonă critică** perete: hcr = max(lw; Hw/6) = 4,0 m (fără înnădiri suprapuse, confinare sporită, ρv bulbi ≥ 0,5%). **Bulbi (elemente de margine):** lc ≥ max(bw; 0,15lw) = 600 mm, 6Ø20, **etrieri de confinare Ø10/10** cu agrafe (anti-flambaj armături + confinare beton). **Buiandrugi de cuplare** (nucleu, l/h ≤ 2): **armare diagonală** în carcase 4Ø16 + etrieri Ø8/10 (forfecarea guvernează, P100 §5.4.3.5). Acoperiri: pereți 25 mm, radier 45 mm (XC2/XA1), subsol 35-40 mm. Mustăți radier→pereți; infrastructura protejată prin suprarezistență (rămâne elastică).

## 10. Materiale

| Element | Beton | fcd | Expunere |
|---|---|---|---|
| Radier, pereți subsol | C30/37 | 20,0 | XC2+XA1 (impermeabil) |
| Pereți S-E2, nucleu | C30/37 | 20,0 | XC1 |
| Pereți E3-E4, planșee | C25/30 | 16,7 | XC1 |

Oțel **BST500C** (clasa C obligatorie DCM, εuk > 7,5%, ft/fy 1,15-1,35), fyd = 435 MPa. Cuvă etanșă beton W8/P8 + waterstop la rosturi.

## 11. Rezistența la foc

Grad II (P118): pereți portanți **REI 120** (b.a. ≥ 20 cm + acoperire 25 mm), planșee **REI 60**, stâlpi subsol **R 120**, casa scării **REI 120**. Asigurat intrinsec (SR EN 1992-1-2 tabelar), fără protecții suplimentare.

## 12. Concluzii și verificare

Structură cu pereți b.a. (dual la parter) + cutie rigidă pe radier, optimă la ag=0,25g/Tc=0,7s: T1 ≈ 0,41 s, Fb ≈ 3.359 kN (c ≈ 0,154), drift verificat cu marjă mare (SLS/SLU), pereți verificați la M-N (νd 0,133) + forfecare, infrastructură (75 < 250 kPa, plutire EQU ✓, împingere pământ), detalii DCM (bulbi confinați, buiandrugi diagonali), materiale C25/30-C30/37 + BST500C, RF grad II. Satisface cerința A1 (Legea 10/1995). **Verificare** verificatori atestați MDLPA: **A1** (rezistență), **Af** (geotehnic), coordonare Cc (incendiu). Recomandat program de control cu faze determinante (ag=0,25g, clasa III). Breviar + planuri cofraj/armare/fundații la P.Th.
