## 1. Date generale

Memoriu de rezistență DTAC pentru **centru comercial (mall) S+P+2E, beton armat, sistem dual (cadre + pereți/nuclee)**, GLA ~20.000 mp, cu **atrium central multietajat** (goluri mari suprapuse în planșee).

| Element | Valoare |
|---|---|
| Adc | ~34.500 mp |
| Plan tronson | 108×72 m (3 tronsoane cu rost) |
| H subsol/parter/etaj | 3,20 / 5,40 / 5,00 m |
| H total suprateran | 15,40 m; cotă radier −3,80 |
| Categoria importanță | **B — deosebită** |
| Clasa seismică | **II (γI,e = 1,20)** — aglomerări mari |
| Consecințe | CC2→CC3 (KFI 1,1 zone critice) |

**Amplasament (ex. Iași):** ag 0,20g, Tc 0,70s, β0 2,50, sk 2,50, qb 0,50, cat. geo **3**. **Normative:** Legea 10/1995, HG 766/1997, P100-1/2013, CR 0/2012, CR 1-1-3/1-1-4, CR 2-1-1.1, SR EN 1990/1991/1992/1997/1998, NP 112/2014, NP 074/2022, P118, NE 012, ST 009.

## 2-3. Sistemul structural

**Dual cu pereți/nuclee predominanți** (P100 §5.1): cadre b.a. (gravitațional + parte lateral) + pereți/nuclee (case scări/lift/ghene + contur atrium, preiau ~65% tăietoare). Conciliază spații libere (cadre) cu rigiditate/drift (pereți).

| Zonă | Tramă |
|---|---|
| Retail curent | 8,10×8,10 |
| Ancore/hipermarket | 12,00×12,00 |
| Food-court/cinema | până la 16,00 |
| Parcaj | 8,10×16,20 |

Stâlpi parter 80×80-90×90 (H 5,40), etaje 70×70; pereți 30-40, nuclee 40. **Planșeu dală groasă (flat slab) 32 cm + capiteluri 45** (retail), grinzi la deschideri >12 m; diafragmă rigidă (goluri atrium o întrerup → transfer §9.4).

## 4. Rosturi seismice — tronsonare

Clădire 108×72 → **3 tronsoane** cu rost seismic complet (fundație-acoperiș). Δ_rost ≥ √(d1²+d2²); d_s = c·q·d_e = 1,0·4,8·24 = 115 mm/tronson → Δ = √(115²+115²) = 163 → **rost adoptat 200 mm** (spumă compresibilă + profil glisant + waterstop + EI); radiere separate.

## 5. Factor q și regularitate

**În plan NEREGULAT** (goluri atrium ~28×20, reducere >50% pe fâșia T2) → model 3D + modal cu spectre + verificare diafragmă. **În elevație:** parter H 5,40 → verificare nivel flexibil. **q:** dual DCM q0 = 3,0·αu/α1; regulat 4,0·1,2 = **4,8** (T1/T3); **neregulat T2 (atrium) q = 3,45** (αu/α1 redus 1,15); kw 1,0. Rost dimensionat cu q 4,8 (acoperitor).

## 6. Materiale

| Element | Beton | fcd |
|---|---|---|
| Radier/pereți subsol | C30/37 | 20,0 |
| Stâlpi parter | C35/45 | 23,3 |
| Stâlpi etaje/pereți/planșee | C30/37 | 20,0 |
| Grinzi bordaj/transfer | C35/45 | 23,3 |

Oțel **BST500C** (clasa C obligatoriu zone critice DCM, fyd 435, εuk >7,5%). Acoperiri: radier 50, pereți subsol 45, stâlpi/grinzi 35-40 (R120 foc), planșee 30. Elemente principale **R120** (SR EN 1992-1-2 tabelar).

## 7-8. Acțiuni și grupări

**Permanente planșeu curent:** dală 32 (8,00) + capiteluri 0,50 + finisaje 1,50 + tavane+instalații 1,00 + pereți despărțitori 1,00 = **12,00 kN/mp**; terasă 14,50 (+ echipamente HVAC concentrate: chiller 65 kN/4 puncte). **Utile:** mall/aglomerare D2/C4 **5,00**; food-court/cinema 4,00; parcaj F 2,50; terasă 3,00 + echipamente; depozit E1 7,50; scări C3 5,00.

**Zăpadă:** s = 1,0·0,8·1,0·1,0·2,50 = **2,00** (+aglomerare atice). **Vânt:** qp(15,4) = 1,9·0,50 = 0,95, w ~1,24 kPa (nedeterminant vs. seism).

**Grupări (CR 0):** SLU 1,35G+1,5Qk,1+1,5·0,7Qk (ex. planșeu 1,35·12 + 1,5·5 = **23,7 kN/mp**); seismic G + γI·AEd + 0,6Qk (ψE = 0,8·0,6 = 0,48).

## 9. Planșee — străpungere, goluri atrium

Dală 32 retail: L/d = 8100/285 = 28,4 < 31 ✓. **Străpungere stâlp 90×90 + capitel** (V_Ed 1.555 kN/planșeu, β 1,15 → 1.788): u1 ~10.815 mm, d_capitel 415; v_Ed = 0,40 < v_Rd,c 0,63 MPa ✓ (la ancore >v_Rd,c → studs pe 3 perimetre); v_Rd,max 4,22 >> ✓. Grinzi 12-16 m: food-court L 16 → M_Ed = pL²/10 = 4.915 kNm → 20Ø32 + **post-tensionare** (săgeată <L/300).

**GOLURI ATRIUM — diafragmă întreruptă:** gol 28×20 (~560 mp), reducere local >55%. Model **strut-and-tie/grindă-perete de diafragmă**: M_diaf = F_niv·l/8 = 4.200·72/8 = 37.800 kNm; **colector (chord)** T = M/z_d = 37.800/26 = 1.454 kN → A_s = 3.343 → **7Ø25** în grinda de bordaj, continuu + ancorat în nuclee capăt. **Transfer forfecare** V = 2.100 kN la pereți (shear friction μ 0,7 → A_s 6.897 mmp).

## 10. Calcul seismic

**Masă T2** (arie plină 2.032/nivel): terasă 30.927 + E2/E1/parter 3×29.261 = **W ~118.710 kN**. **T1** empiric 0,05·15,4^0,75 = 0,39 (modal **0,52 lung** / 0,44 scurt), TB<T1<TC → β=β0=2,50. **Sd/g = 0,20·1,20·2,50/3,45 = 0,174**. **Fb = 0,174·118.710·0,85 = 17.557 kN**. Distribuție: terasă 6.021 → E1 1.997.

**Drift** (h 5.000): SLS = 0,5·3,45·5,0 = 8,6 < 25 mm (0,005h) ✓; SLU = 3,45·5,0 = 17,3 < 125 ✓. **P-Δ:** θ = 88.000·0,0173/(15.560·5,0) = **0,020 < 0,10** ✓. **Torsiune:** excentricitate (gol + nuclee asimetrice) + ±0,05L → amplificare pereți atrium δ 1,15-1,25 (modal 3D).

## 11. Verificarea elementelor verticale

**Stâlp parter 90×90 C35/45:** N_Ed 6.800, νd = 6.800·10³/(810.000·23,3) = **0,36 < 0,55** ✓; zveltețe λ 14,5 < λlim 18,0 (scurt) ✓; ρ 2,0% (24Ø32); zonă critică l_cr 900, etrieri Ø12/100 (ωwd ≥0,08). **Pereți/nuclee** (lw 6,0, bw 0,40): V_nuclee ~0,65·Fb = 11.412 kN, M bază ~116.000; V majorat ε 1,5; νd 0,28 < 0,40 ✓; bulbi confinați lc 900 (12Ø25). **Nivel slab parter:** rezistență parter/etaj ≥0,9 + **coloană tare-grindă slabă ΣM_Rc ≥1,3ΣM_Rb** + pereți continui. **Capacity design** (γRd 1,2, rotule în grinzi).

## 12. Grinzi de bordaj atrium și transfer

**Bordaj atrium 50×90 C35/45:** colector T 3.343 mmp + încovoiere margine M = 45·8,1²/10 = 295 kNm (887 mmp) → **8Ø25 sus + 6Ø25 jos + Ø10/100**, continuu + ancorat în nuclee (l_bd 45Ø). **Grinzi de transfer** (stâlp întrerupt parter, N 4.200, L 16,2): M = N·L/4 = **17.010 kNm** → grindă-perete **80×200**, A_s = 22.280 → **28Ø32**; V 2.100 → Ø16/100/4 ramuri; **element critic — suprarezistență γRd 1,3, NU se plastifică** (colaps progresiv).

## 13. Infrastructura

**Cutie rigidă** subsol (radier + pereți 40 + planșeu) → încastrare suprastructură. **Radier general 90 cm** (120 sub nuclee), NP 112/074. p_ef = 380.000/2.592 = **147 < p_adm 200 kPa** ✓; tasare ~3,5 cm (Δs/L <1/500). Cat. geo **3**: capacitate portantă ✓, tasare ✓, alunecare ✓ (cutie), lichefiere neaplicabil (N_SPT >25). **Plutire (UPL):** NHmax −1,50 → hw 2,30, u 23,0 kPa, U 59.616 kN; G_stab 78.000 → **FS = 1,31 > 1,10** ✓ (drenaj/epuismente faze intermediare). Împingere pământ pereți subsol K0 0,63, p_bază 42,6 kPa + seismic (Mononobe-Okabe).

## 14. Detalii armare seismică (DCM)

Stâlpi ρ 1-4% (2,0), νd ≤0,55, l_cr max(h;Hl/6;600) etrieri Ø12/100; grinzi ρmin 0,30%, l_cr 1,5h etrieri Ø10/100; pereți bulbi lc 0,15lw, inimă ρv ≥0,25%, V majorat ε 1,5; noduri confinate; ancoraje l_bd 45Ø în afara zonelor critice. Radier plasă dublă Ø25/150 + concentrat sub nuclee.

## 15. Concluzii și verificare A1/Af

| Verificare | Rezultat | Stare |
|---|---|---|
| νd stâlpi | 0,36 ≤0,55 | ✓ |
| Străpungere | 0,40 ≤0,63 MPa | ✓ |
| Drift SLS/SLU | 8,6/17,3 | ✓ |
| P-Δ θ | 0,020 <0,10 | ✓ |
| Colector atrium | 7Ø25 | ✓ |
| Presiune teren | 147 ≤200 | ✓ |
| Plutire UPL | 1,31 ≥1,10 | ✓ |
| Rost seismic | 200 >163 mm | ✓ |

Sistem dual b.a. + dală groasă + atrium (diafragmă întreruptă tratată) + cutie rigidă/radier satisface cerința A (L10/1995) în grupări fundamentală+seismică (P100/CR 0/SR EN 1992/1998). **Neregularități tratate:** plan (atrium → 3D+modal+q 3,45+colector+torsiune), nivel flexibil parter (capacity design), clădire mare (3 tronsoane rost 200). **Verificare** verificatori atestați MDLPA: **A1** (structură — obligatoriu) + **Af** (fundații/geotehnic cat. 3) + expertizare independentă **grinzi transfer + diafragmă atrium** (colaps progresiv). Urmărire în timp (categoria B). Detalii + model 3D la PT.
