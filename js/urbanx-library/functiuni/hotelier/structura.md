## 1. Date generale

Memoriu de rezistență DTAC pentru **HOTEL S+P+6E, beton armat, sistem dual (cadre + pereți structurali)**, ~100 camere, cu spații mari deschise la parter + subsol parcare.

| Element | Valoare |
|---|---|
| Plan etaj curent | ~48,0 × 22,0 m; Acd ~8.400 mp |
| H_subsol/parter/etaj | 3,20 / **4,50** / 3,00 m |
| H total suprateran | 25,50 m; H_seism ~21,0 m (de la planșeu peste subsol) |
| Categoria importanță | **B — deosebită** |
| Clasa seismică | **II (γI,e = 1,20)** — aglomerări (conferință >100 pers) |
| Consecințe | CC2 (KFI 1,0 grupare fundamentală) |

**Amplasament (ex. Moldova):** ag 0,30g, Tc 0,70s, β0 2,75, TB 0,14/TD 3,0. **Normative:** Legea 10/1995, CR 0/2012, SR EN 1990/1991, CR 1-1-3/1-1-4, P100-1/2013, SR EN 1992/1998, NP 112/2014, SR EN 1997/NP 074.

## 2. Sistemul structural — provocarea de transfer parter-etaje

Sistem **dual cu pereți predominanți** b.a. **PROVOCAREA:** etaje curente cu **pereți deși** (camere mici 3,60-4,20 m, ρ_w 2,5-3,5%) DAR parter cu **spații mari deschise** (restaurant/conferință 200-300 mp fără stâlpi). Pereții „aterizează" pe planșeul peste parter → **discontinuitate verticală**.

**Riscul critic: nivel flexibil (soft-storey) la parter** — rigiditate/rezistență parter << etaje → concentrare deformare inelastică pe stâlpii înalți (4,50 m) → risc colaps. P100-1 §4.4.2/5.2.4 penalizează (reducere rigiditate nivel <70% din superior, rezistență <80%).

**Soluția adoptată — combinată:**
- **(a) Nucleu central continuu** (scări+lift) de la fundație la terasă, traversează parterul, preia **55-65% din tăietoarea de bază** — „ocolește" transferul;
- **(b) Pereți continui** pe conturul care nu deranjează funcțiunea parterului (spate restaurant, tehnic) → coborâți la fundație;
- **(c) Grinzi + planșeu de transfer masiv** peste parter pentru pereții discontinui → redistribuie încărcările la stâlpi puternici de parter.

**Principiu:** elementele de transfer se dimensionează la **suprarezistență (Ω) și rămân ELASTICE**; disiparea inelastică se dirijează spre nucleu/pereți continui + grinzi de cuplare, NU spre transfer.

| Element | Funcție seismică | Continuitate | Regim |
|---|---|---|---|
| Nucleu b.a. (t 30) | rigiditate principală + torsiune | continuu | ductil DCM, zonă critică bază |
| Pereți continui | rigiditate suplim. | continui | ductil DCM |
| Pereți etaje | doar etaje | se opresc la planșeu P | ductil la etaje |
| Grinzi transfer | suport gravitațional | local parter | **ELASTIC (Ω)** |
| Planșeu transfer (40 cm) | diafragmă + transfer | nivel P | elastic |
| Stâlpi parter | coloane sub transfer | S→P | elastic protejat |

## 3. Factor de comportare, ductilitate, regularitate

**DCM.** q = q0·kw = (3,0·αu/α1 1,20)·1,0 = **3,60**. **Penalizare neregularitate în elevație (transfer, P100-1 §4.4.3.1): −20%** → **q adoptat = 2,90**. Regularitate: cvasi-regulat în plan (nucleu ~central, e0 <0,30r), **NEREGULAT în elevație (transfer)** → model spațial 3D + **analiză modală cu spectre** obligatorie.

## 4. Planșee. Planșeul de transfer

Etaje: dală b.a. **15 cm** (deschideri ≤4,20), 18 cm (deschideri 6,0 m); diafragme rigide. **Planșeu de transfer peste parter (+4,50):** placă **40 cm** (local 50 sub reazeme pereți discontinui) + grinzi de transfer.

**Grindă de transfer tipică** (perete etaj pe grindă rezemată pe stâlpi la L=8,0 m): q_transfer = perete 6×15 (90) + planșee 216 ≈ **306 kN/m**; M_Ed = q·L²/8 = 306·64/8 = **2.448 kNm**; V_Ed = q·L/2 = **1.224 kN**. Secțiune **60×120 cm C35/45**: z ≈ 1,035; As = 2.448·10⁶/(1.035·435) = 5.437 → **8Ø32 (6.434 mmp)** jos 2 rânduri; etrieri Ø12/100/4 ramuri + armătură inimă; V_Rd,max ≈ 3.900 > 1.224 ✅. **Se majorează cu Ω** (§9). Străpungere planșeu transfer sub stâlpi (N ~6.000 kN, h 40) → armătură de străpungere + capiteluri ascunse.

## 5. Acțiuni (SR EN 1991)

**Permanente:** greutate proprie b.a. + planșeu (finisaje+tavan+MEP) 2,0 + pereți despărțitori 1,0 + fațadă 6,0 kN/m + terasă 3,5 + parter public (placaje) 2,5.

**Utile:** camere A 2,0; coridoare 3,0; restaurant C1 4,0; **conferință/lobby C2/C3 5,0**; terasă circulabilă 4,0; parcare F 2,5; tehnice ≥5,0. ψ0 0,7; ψ2 0,3 (A) / 0,6 (C).

**Zăpadă:** utila terasă (4,0) guvernează (s ≈1,6). **Vânt** (H 25,50, qb 0,5-0,6): << seism → seismul guvernează lateral. **Grupări (CR 0):** SLU 1,35G+1,5Qk,1+1,5ψ0Qk; **seismic G + 1,20·AEk + ψ2Qk**.

## 6. Analiza seismică

Model 3D EF (shell pereți/nucleu, bare cadre, diafragme), încastrat la planșeu peste subsol (cutie rigidă). Modal cu spectre (obligatoriu neregulat), ≥90% mase, CQC, 100/30.

**Masă:** terasă 867 t + E1-6 6×1.122 + parter 1.500 = **~9.100 t (W ~89.300 kN)**. **T1** = 0,05·21^0,75 = 0,49 (modal ~0,55 transversal / 0,45 long) < Tc 0,70 → **palier max β=β0=2,75**. **Sd(T1) = ag·β0/q = 0,30g·2,75/2,90 = 0,284g**. **Fb = γI·Sd·m·λ = 1,20·0,284·89.300·0,85 = 25.870 kN** (cs = **0,29** — mare, firesc la clasa II + q redus + ag 0,30). Distribuție triunghiulară (terasă 4.020 → E1 743 kN).

**Drift** (SLS ν=0,5; SLU c=1,0), h etaj 3,00 → SLS ≤15 mm, SLU ≤75:

| Nivel | d_r,e | SLU (q·d) | SLS (0,5q·d) | Stare |
|---|---|---|---|---|
| E6 | 4,8 | 13,9 | 6,9 | ✅ |
| E4 | 6,5 | 18,9 | 9,4 | ✅ |
| E2 | 7,2 | 20,9 | 10,4 | ✅ |
| **Parter (transfer)** | 9,0 | 26,1 (≤112) | 13,0 (≤22,5) | ✅ critic |

**Verificarea decisivă:** driftul de parter (26 mm) sub limită + rigiditate parter/etaj >70% grație nucleului → **NU se formează mecanism de nivel flexibil**.

## 7. Verificarea elementelor

**Pereți/nucleu** (l_w 5,0, t 30, C35/45): N_Ed 4.500, M_Ed 22.000, V_Ed 1.800 kN → bulbi 12Ø25/capăt + Ø14/150 distribuit, M_Rd > M_Ed; V majorat capacity design (ε≥1,5); zonă critică h_cr confinată. **Stâlpi parter transfer 70×70 (80×80) C35/45:** N_Ed 8.000; N_Rd = 490.000·23,3 + 7.854·435 = **14.833 > 8.000** ✅ (protejat); coloană tare-grindă slabă ΣM_Rc ≥1,3ΣM_Rb; confinare integrală. **Grinda transfer:** 2.448 kNm → 8Ø32 (majorat Ω §9); w_k ≤0,3 mm. **Grinzi cuplare nucleu** (l/h<3): carcasă diagonală. **Planșee-diafragmă:** colectori/tiranți, planșeul de transfer redistribuie forțe orizontale mari.

## 8. Infrastructura

**Geotehnic (ex.):** argilă prăfoasă / nisip îndesat, **pconv 250 kPa** la −3,50, NHA **−2,20** (subsol parțial sub apă), cat. geo **3**.

**Radier general b.a.** (N stâlpi transfer 8.000 kN + apă): grosime **90 cm** (120 sub transfer/nucleu), C30/37 XC2+XA cuvă. Presiune p = 89.300/(48·22) = **85 kPa < 250** ✅; local sub transfer verificat cu difuzie. Plase Ø20/15 + armătură străpungere.

**Subsol = cutie rigidă** (pereți 30 + radier + planșeu) → încastrează suprastructura + preia împingere pământ (K0 0,5, σ_bază 30,4 + hidrostatic 10 kPa). **Plutire (UPL):** hw 1,30 → U = 10·1,30·1.056 = 13.730 kN; G_stab (radier 23.760 + subsol 6.000) = 29.760; **G·0,9/(U·1,1) = 26.784/15.103 = 1,77 > 1,0** ✅ (chiar în faza critică subsol gol; epuismente la execuție).

## 9. Detalii armare seismică (DCM). Elemente de transfer

Capacity design (coloană tare-grindă slabă ΣM_Rc ≥1,3ΣM_Rb, V majorat). Zone critice: stâlpi cadre l_cr max(h;Hlib/6;45), **stâlpi parter confinare integrală H 4,50 Ø12/100**, pereți bază h_cr bulbi Ø10/100, grinzi 2h. Confinare ωwd ≥0,08.

**Elemente de transfer — regim special:** rămân **elastice**, solicitări majorate **E_d,transfer = Ω·E_d,seism (Ω 1,3-1,5)** → grinda transfer M = 1,4·2.448 = 3.427 kNm → **10Ø32**; armare continuă sus+jos (ambele sensuri); **armătură de suspendare** în planșeu la reazeme pereți discontinui; ancorare majorată pereți discontinui în planșeu. Acoperiri: interior XC1 25 mm, subsol/apă XC2/XA 40-50 mm.

## 10. Materiale

| Element | Beton | Oțel |
|---|---|---|
| Radier/pereți subsol | C30/37 (XC2/XA) | BST500C |
| Stâlpi parter + grinzi transfer | **C35/45** | BST500C |
| Pereți/nucleu | C30/37-C35/45 | BST500C |
| Planșee curente | C25/30-C30/37 | BST500C |

C35/45: fcd 23,3; C30/37: fcd 20,0. **BST500C** (clasa C obligatoriu DCM, fyd 435, εuk >7,5%, ft/fy ≥1,15).

## 11. Concluzii și verificarea deplasărilor

Sistem dual DCM cu **provocarea de transfer parter rezolvată** prin: nucleu central continuu (55-65% din seism) + pereți continui + grinzi/planșeu transfer masiv (Ω 1,4) + penalizare q −20% (2,90) + model 3D modal. **Decisiv: NU se formează nivel flexibil** (drift parter 26 mm sub limită, rigiditate >70%).

| Verificare | Cerință | Calculat | Stare |
|---|---|---|---|
| Drift SLU parter | ≤112 mm | 26 | ✅ |
| Drift SLS etaj | ≤15 mm | ≤13 | ✅ |
| Presiune teren | ≤250 kPa | 85 | ✅ |
| Plutire UPL | ≥1,0 | 1,77 | ✅ |
| Grindă transfer M | M_Rd > M_Ed·Ω | 3.427 acoperit | ✅ |
| Stâlp parter N | N_Rd > N_Ed | 14.833 > 8.000 | ✅ |
| Rigiditate parter | ≥70% | >70% | ✅ |
| Coloană tare-grindă slabă | ΣM_Rc ≥1,3ΣM_Rb | ✅ | ✅ |

Satisface cerința **A1/Af** (Legea 10/1995): rezistență+stabilitate (SLU+SLS, P100/CR 0/SR EN 1992/1998), fundare (radier pconv 250, cutie rigidă, UPL 1,77, cat. geo 3). **Verificare** verificator atestat MDLPA cerința A/Af — **atenție specială la soluția de transfer** (risc seismic major). Detalii + breviar la PT; studiu geotehnic + epuismente execuție sub NHA.
