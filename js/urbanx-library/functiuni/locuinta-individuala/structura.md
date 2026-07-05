## 1. Date generale

Memoriu de rezistență DTAC pentru **locuință unifamilială P+1E, zidărie portantă confinată** (sâmburi + centuri b.a.) + planșee b.a.

| Element | Valoare |
|---|---|
| Ac / Acd | ~90 / ~180 mp |
| H liber / nivel structural | 2,70 / 3,00 m; H total ~8,20 |
| Plan | ~10,0×9,0 m (90 mp/nivel) |
| Categoria importanță | **D — redusă** (HG 766, punctaj 1,4) |
| Clasa seismică | **III (γI,e 1,0)** |
| Consecințe | CC1→CC2 (KFI 1,0) |
| Durata viață | 50 ani |

**Normative:** Legea 10/1995, HG 766/1997, **CR 6-2013** (zidărie), P100-1/2013, CR 0/2012, CR 1-1-3/1-1-4, SR EN 1990/1991, **SR EN 1996** (EC6), SR EN 1998, SR EN 1992/1995, NP 112/2014, NP 074.

**Regularitate:** plan λ = 10/9 = 1,11 <4 + simetric → regulat; elevație pereți continui fără soft-storey → regulat → **metoda forțelor laterale echivalente** + model plan/direcție.

## 2. Sistemul structural — zidărie confinată

Pereți zidărie **t 25 cm** (GVP/cărămidă) + **sâmburi b.a.** (colțuri/intersecții/capete/margini goluri >1,5 m, ≤4,0 m) + **centuri b.a.** la fiecare planșeu + planșee b.a. monolit (diafragmă rigidă). **Justificare:** economic + confinarea dă ductilitate (validat la cutremure RO). **q = 2,5** (P100 tab.8.3, zidărie confinată vs. 1,5-2,0 nearmată).

## 3. Materiale

**Zidărie:** elemente fb 10,0, mortar M5 (fm 5,0); fk = K·fb^0,7·fm^0,3 = 0,45·5,01·1,62 = **3,65 N/mmp**; fvk0 0,30; E 3.650, G 1.460. γM 2,2 (fundamental) / 1,5 (seismic) → **fd = 1,66 / 2,43 N/mmp**.

**Beton:** sâmburi/centuri **C16/20** (fcd 10,67); planșee/fundații **C20/25** (fcd 13,33, Ecm 30.000). **Oțel BST500S** (clasa C, fyd 434,8).

## 4. Amplasament, geotehnic, seism

**Seism (ex.):** ag 0,25g, Tc 0,7s, TB 0,14/TD 3,0, β0 2,50. **Geotehnic:** vegetal 0-0,4 (îndepărtat), argilă prăfoasă vârtoasă (pconv 200 kPa), Df ≥1,00 (îngheț 0,90, STAS 6054), NH sub fundare.

## 5-8. Acțiuni și grupări

**Permanente:** planșeu b.a. 14 + finisaje = **6,08 kN/mp**; perete zidărie 25 + tencuieli = **4,10 kN/mp**; acoperiș (țiglă+șarpantă+termo) = **1,30 kN/mp**. **Utile (cat. A):** locuit 1,50, scări/balcoane 2,00, pod H 0,40. **Zăpadă:** s = 0,8·1,0·1,0·2,0 = **1,60**. **Vânt:** qp ~0,6 kPa (<< seism → seismul guvernează).

**Grupări (CR 0):** SLU 1,35G + 1,5Q + 1,5·0,7·zăpadă; **seismic G + γI·AEd + 0,3Q** (ψ2 0,3 locuit, 0,0 zăpadă).

## 9-10. Model + reguli CR 6

Model: planșee diafragme rigide, pereți montanți (k = 1/(h³/3EI + 1,2h/GA)); Vi = V_nivel·ki/Σki + torsiune. **Reguli CR 6:** t_min 240 (adoptat **250**); zveltețe h_ef/t_ef = 2,25/0,25 = **9,0 <24** ✓; panou ≥0,5 m și ≥0,4h (1,2 m); **sâmburi ≥25×25, ≤4,0 m, 4Ø12 (ρ 0,72%), etrieri Ø6/10-15**; **centuri ≥25×25, 4Ø12, Ø6/15**; buiandrugi 3Ø12. **Densitate pereți min. (ag 0,25g, P+1):** **p ≥5,0%/direcție**.

## 11. Verificarea densității pereților

A_pl 90 mp; A_nec = 0,05·90 = **4,50 mp/direcție**. **X:** PX1-4 (9+4,5+4+9)·0,25 = 6,625 mp → **pX = 7,36%** ✓; **Y:** PY1-3 (10+6+10)·0,25 = 6,50 → **pY = 7,22%** ✓ (>5,0%, rezervă >44%).

## 12. Calcul seismic

**Masă:** m1 (parter) ~100,7 t (planșeu 547 + pereți 400 + utilă 40,5 = 987,7 kN); m2 (acoperiș) ~93,5 t (917,7 kN); **W = 1.905,4 kN**. **T1** = 0,045·6,0^0,75 = **0,17s** (adoptat 0,20), TB<T1<TC → β=β0=2,50. **Sd = ag·β0/q = 0,25g·2,50/2,5 = 0,25g**. **Fb = γI·Sd·m·λ = 1,0·0,25·1.905,4·1,0 = 476,4 kN**. Distribuție: etaj 305,3 + parter 164,4; V_parter 469,7 ≈ Fb.

## 13. Verificarea pereților

**Compresiune** (PX2, N_Ed 571 kN, A 1,125 mp): σ 0,51 N/mmp; N_Rd = Φ·fd·A = 0,9·1,66·1.125.000 = **1.681 kN**; N_Ed/N_Rd = **0,34** ✓. **Forfecare în plan** (seism, σd 0,43): fvk = 0,30 + 0,4·0,43 = 0,472; fvd = 0,472/1,5 = 0,315; V_Rd = fvd·t·lc = 0,315·250·3.600 = **283,5 kN** (+ sâmburi ~315); V_Ed,PX2 = 0,17·469,7·1,3 = 103,7 → **0,37** ✓. Global X: ΣV_Rd 1.670 >> 469,7 ✓; Y: 1.638 >> 469,7 ✓. **Încovoiere din plan** (vânt 0,6): M_Ed = 0,6·9/8 = 0,675 kNm/m; M_Rd = (0,10+0,43)·250²/6 = **5,5 > 0,675** ✓.

| Verificare | Ed/Rd | Stare |
|---|---|---|
| Compresiune | 0,34 | ✓ |
| Forfecare plan | 0,37 | ✓ |
| Forfecare X/Y global | 0,28/0,29 | ✓ |
| Încovoiere din plan | 0,12 | ✓ |

## 14. Planșee b.a.

Placă C20/25 **h 14 cm**, rezemare 4 laturi (panouri 4,0-4,5 m), c 20 mm. p_Ed = 1,35·6,08 + 1,5·1,5 = **10,46 kN/mp**; M_x = 0,045·10,46·4,0² = 7,53 kNm/m; As = 7,53·10⁶/(0,9·115·434,8) = **167 mmp/m** (As_min 150) → **Ø8/15 ambele direcții (335)** ✓. Diafragmă rigidă (continuitate în centuri).

## 15. Acoperiș — șarpantă lemn (SR EN 1995)

Lemn **C24** (fm,k 24, E 11.000). Căprior: p = 1,35·1,30 + 1,5·1,60 = 4,16 kN/mp, interax 0,80 → q 3,33 kN/m, L 2,0: M = qL²/8 = **1,66 kNm**; fm,d = 0,8·24/1,3 = 14,8; W_nec = 112 cmc → **căprior 10×15** (W 375) ✓; săgeată 2,2 < L/250 8 mm ✓. Pane 12×18 (σ 5,7 <14,8), popi 12×12 (flambaj, σ 1,04 <13,0), cosoroabă ancorată centură Ø10/1,0 m (sucțiune).

## 16. Infrastructura

**Tălpi continue b.a.** sub pereți (grinzi încrucișate), Df 1,00, C20/25. q_lin = 571/4,5 + 15 = 142 kN/m; **B_nec = 142/200 = 0,71 → talpă 0,80 m** (H 0,80); p_ef = 142/0,80 = **178 < 200 kPa** ✓. Armare grinzi 4Ø14 sus+jos + Ø8/20, continuitate cu centură soclu, hidroizolație +0,20. **Răsturnare:** M_r = 476·4,0 = 1.904; M_s = 1.905·4,5 = 8.573; **M_s/M_r = 4,5 > 1,5** ✓.

## 17. Detalii + materiale

Sâmbure 25×25 C16/20, 4Ø12 + Ø6/10-15, **ștrepi în zidărie la 3-4 asize** (toarnă DUPĂ zidărie), petrecere 50Ø. Centură 25×25, 4Ø12 + Ø6/15, colțuri continue 60 cm. Buiandrug 3Ø12+2Ø10, rezemare 25 cm. Acoperiri 20 interior / 35-45 fundații.

## 18. Deplasări

**SLS** (ν 0,5, dre ~1,0 mm): d_r = 0,5·2,5·1,0 = **1,25 << 15 mm (0,005h)** ✓. **SLU:** d_r = 2,5·1,0 = **2,5 << 75 mm (0,025h)** ✓ (zidărie f. rigidă, guvernată de rezistență + alcătuire).

## 19-20. Execuție și concluzii

Execuție **categoria B**, elemente cat. I, rosturi pline, sâmburi turnați după zidărie cu ștrepi, centuri monolite cu planșeul, fără șlițuri orizontale în pereți portanți.

Zidărie confinată P+1E + planșee b.a. satisface **A1**: densitate pereți pX 7,36%/pY 7,22% >5,0% (CR 6); verificări compresiune/forfecare/încovoiere ≤0,37 (rezerve mari); comportare seismică favorabilă (regulat, diafragme, confinare, q 2,5); fundații pef 178<200 kPa, răsturnare 4,5; drift neglijabil (1,25 mm). Șarpantă C24 + planșee verificate. **Verificare** verificator atestat MLPAT/MDLPA cerința **A1 (Af)** — obligatoriu. Breviar + planșe (fundații/cofraj-armare/detalii sâmburi-centuri/șarpantă) la PT.
