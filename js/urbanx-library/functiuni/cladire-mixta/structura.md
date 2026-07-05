## 1. Date generale

Memoriu de rezistență DTAC pentru **clădire mixtă (comercial + rezidențial) S+P+5E, beton armat, sistem dual (nucleu + pereți contur + cadre)** cu **planșeu de transfer la +5,10 m** (peste mezanin).

| Element | Valoare |
|---|---|
| Ac / Ad | 1.180 / 8.640 mp |
| Plan ax-ax | 42,00×26,00 m (2 tronsoane cu rost) |
| H atic / structură | +21,10 / 24,60 m |
| Categoria importanță | **C** (sub cat. B) |
| Clasa seismică | **II (γI,e = 1,20)** — aglomerări comercial >100 pers/nivel |
| Consecințe | CC2/RC2 (KFI 1,0); cat. geo 2; grad II RF |

**Amplasament (ex. Vrancea):** ag 0,30g, Tc 1,6s, β0 2,50, sk 2,0, qb 0,5. **Normative:** Legea 10/1995, CR 0/2012, CR 1-1-3/1-1-4, P100-1/2013, CR 2-1-1.1, SR EN 1990/1991/1992/1998, NP 112/2014, NP 074, P118.

## 2-3. Sistemul structural — provocarea transfer

**Contradicție fundamentală:** parter comercial (H 4,50, spații mari deschise, vitrine — minim pereți) vs. etaje rezidențiale (H 2,80, pereți deși). Pereții etajelor NU coboară continuu → **transfer**.

**Sistem dual:** (1) **nucleu central continuu** (scară+lift, tub 6,80×5,20, pereți 30 — coloană vertebrală seismică); (2) **pereți de contur continui** (calcane, 25-30); (3) cadre b.a.; (4) pereți etaje **discontinui** (se opresc la transfer).

**Riscuri și rezolvare:** **(a) soft-storey parter** — verificare K_parter ≥0,70 K_etaj (0,80-0,94 ✔), evitat prin nucleu+pereți contur continui + stâlpi parter 80×80-90×90 + stâlp tare-grindă slabă; **(b) transfer** — grinzi de transfer +5,10 preiau pereții discontinui (element critic elastic); **(c) rost seismic** (L 42 m >40) → 2 tronsoane (T1 24, T2 18 m).

## 4. Factor q și regularitate

Regulat în plan (per tronson, e_x 0,08L, e_y 0,06L) dar **NEREGULAT în elevație** (transfer + salt rigiditate parter). q dual DCM = q0·kw·(αu/α1) = 3,5·1,0·1,20 = 4,20; **penalizare neregularitate −20% → 3,36 → adoptat q = 3,00**. Transfer proiectat **elastic** (suprarezistență, independent de q).

## 5. Planșee și transfer

| Nivel | Tip | Grosime | Deschideri |
|---|---|---|---|
| Peste subsol | dală + grinzi 40×70 | 18 | 6-8 |
| Peste parter | dală + grinzi 40×80 | 16 | 8-10 (comercial) |
| **Transfer +5,10** | **placă 30 + grinzi 80×140** | 30 | redistribuie |
| Etaje | dală pe pereți | 14 | 3,5-5 |
| Terasă | dală | 15 | 3,5-5 |

**Planșeu curent** (dală 14, L 4,80): p_d = 1,35·5,8 + 1,5·2,0 = 10,83; M = pL²/11 = 22,68 kNm/m → As 504 → **Ø10/15 (524)** ✓. **Străpungere dală parter** (stâlp 80×80, V 1.480, β 1,15): v_Ed = 2,71 > v_Rd,c 0,56 → **armătură/capitel + grinzi 40×80 sub stâlpi**; v_Rd,max 5,28 ✓.

**Grinda de transfer GT1** (perete etaj pe 2 stâlpi la 9,60 m): w 430 kN/m; M = wL²/8 = **4.954 kNm**; V = wL/2 = **2.064 kN**. Secțiune **80×140 C35/45** (d 1.320): As = 4.954·10⁶/(0,9·1.320·435) = 9.585 → **13Ø32 (10.455)** ✓; V_Rd,s (Ø14/10 4 ramuri) = 4.776 > 2.064 ✓. **γRd 1,3, elastic**, săgeată L/500 (11,8 <19,2) ✓.

## 6. Acțiuni

**Permanente:** planșeu etaj 5,80; peste parter 5,80; transfer 8,70; terasă 6,00; perete exterior 3,20; perete BA 6,25 kN/mp. **Utile:** comercial D1/D2 **5,00**; locuințe A 2,00; balcoane 3,00; terasă H 0,75; scări C3 4,00; parcaj F 2,50. **Zăpadă** 1,60; **vânt** qp(21) 1,10, we 0,88 (<seism). **Grupări (CR 0):** SLU 1,35G+1,5Q+1,5·0,7·zăpadă; seismic G+γI·AEd+ψ2Q (ψ2 0,3 locuit / 0,6 comercial).

## 7. Calcul seismic

**Masă T1:** terasă 644 + etaje 5×740 + E1 760 + transfer 1.104 + parter 940 = **Σ 6.408 t (W 62.850 kN)**. **T1** empiric 0,05·21,2^0,75 = 0,49; modal **0,58 X / 0,53 Y** (torsiune 0,41), masă modală 71-74% (min. 3 moduri >90%). TB<T1<TC → β = β0 = 2,50. **Sd = ag·β0/q = 0,30·9,81·2,50/3,00 = 2,45 m/s²**. **Fb = γI·(Sd/g)·m·λ = 1,20·(2,45/9,81)·62.850·0,85 = 15.619 kN** (cs = 0,248). Distribuție: terasă 2.402 → parter 372.

**Drift** (h etaj 2.800 / parter 4.500): SLS (ν 0,5): parter 8,70 < 22,5 (0,005h) ✓, etaje 3,15-3,60 < 14 ✓; ULS (c 1,0): parter 17,4 < 112,5 (0,025h) ✓ → **soft-storey evitat** (nucleu + pereți contur controlează).

## 8. Verificarea elementelor

**Stâlp parter 90×90 C35/45** (H 4,50): N_Ed 6.850, νd = 6.850·10³/(810.000·23,3) = **0,363 < 0,55** ✓; zveltețe λ 12,1 < 26 (scurt); ρ 1,21% (20Ø25); **ΣM_Rc ≥ 1,3ΣM_Rb** (stâlp tare); etrieri Ø10/10 l_cr 900, ωwd ≥0,08. **Nucleu** (65% tăietoare): V_Ed = 1,5·6.100 = 9.150 kN; M bază ~139.750 kNm; V_Rd,max (2 inimi) 13.700 > 9.150 ✓; bulbi 16Ø25 + inimă Ø12/15 (ρ 0,50%). **Grinda transfer** (§5, γRd 1,3): M 6.440 < M_Rd 6.720 (0,96), V 2.683 < 4.776 (0,56), **element critic elastic** (colaps progresiv). **Grinzi cadru parter** (8,0 m, 40×80): M 1.145 → 8Ø25.

## 9. Infrastructura

**Geotehnic:** umplutură 0-1,2, argilă prăfoasă vârtoasă (pconv 200), argilă marnoasă (**280**), nisip îndesat (320); **NHS −2,80** (deasupra tălpii −3,50) → plutire + cuvă etanșă. Cat. geo 2.

**Radier general 90 cm** (120 sub nucleu): p_ef = 112.000/(42·26) = **102,6 < 280 kPa** ✓; seism p_max = 102,6 + 28,1 = 130,7 / p_min 74,5 >0 (fără desprindere) ✓. **Plutire (UPL):** hw ~1,0 → U = 10·1,0·1.092 = 10.920; G_stab 112.000 → **γfl = 10,3 >> 1,1** ✓ (execuție subsol gol 2,2 + epuismente). **Cutie rigidă subsol** (pereți 30 continui, K0 0,658, σ_bază 44,5 kPa + hidrostatic, Ø14/15) → încastrare suprastructură la ±0,00.

## 10. Detalii armare + materiale

| Element | Beton |
|---|---|
| Radier/fundații | C30/37 XC2 |
| Stâlpi parter/nucleu/pereți | **C35/45** |
| Grinzi transfer | **C35/45** |
| Etaje/planșee | C30/37 |

**BST500C** (clasa C obligatoriu DCM, fyd 435, εuk >7,5%). Stâlpi ρ 1-4%, l_cr 900, etrieri Ø10/10 ωwd ≥0,08; grinzi ρmin, l_cr h, V din capacity design; pereți bulbi confinați + ρv/ρh ≥0,25%; **transfer** armare 2 rânduri ancorată + Ø14/10 4 ramuri pe toată deschiderea + piele Ø12/20 + bielă-tirant noduri (fără petreceri la M max). Acoperiri radier 45, subsol 40, stâlpi/grinzi 30, planșee 25.

## 11. Deplasări, rosturi, SLS

| Verificare | Grad | Stare |
|---|---|---|
| Stâlp νd | 0,66 | ✓ |
| Nucleu V | 0,67 | ✓ |
| Grindă transfer M/V | 0,96/0,56 | ✓ |
| Radier p_max seism | 0,47 | ✓ |
| Planșeu M | 0,92 | ✓ |
| Străpungere | 0,51 (+armare) | ✓ |

Săgeți: planșeu 6,4 <L/250; transfer 11,8 <L/500. Vibrații planșeu comercial (9 m) f1 4,8 Hz >3 ✓. **Rost seismic:** d_max = 1,0·3,0·14,5 = 43,5/tronson; Δ ≥ √(43,5²+39²) = 58,4 → **rost 80 mm** continuu fundație-atic, radier separat.

## 12. Concluzii și verificare A1/Af

Sistem dual b.a. (nucleu + pereți contur continui + cadre) + **planșeu de transfer** rezolvă contradicția parter comercial deschis / etaje rezidențiale dense: **soft-storey evitat** (K_parter ≥0,80 K_etaj, drift parter 17,4 << 112,5); **transfer elastic** (γRd 1,3, cedare ductilă în grinzi cadru reparabile, nu în transfer); **neregularitate penalizată** (q 4,20→3,00); infrastructură radier (p 102,6<280) + cutie rigidă + plutire γfl 10,3. Toate elementele grad ≤0,96. Satisface cerința **A1** (P100/CR 0/SR EN 1992/1998, clasa II γI 1,20, ag 0,30g) + **Af** (foc REI 90-120). **Verificare** verificator atestat MLPAT/MDLPA **A1** (obligatoriu) + studiu geotehnic definitiv + detalii transfer (strut-and-tie) + rost + urmărire P130. PT/DE ulterior.
