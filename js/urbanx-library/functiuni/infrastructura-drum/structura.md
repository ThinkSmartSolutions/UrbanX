# MEMORIU DE STRUCTURĂ RUTIERĂ ȘI TERASAMENTE — DRUM (DTAC)

## 1. Date generale

Structură rutieră + terasamente, sector ~1,00 km, drum public. Carosabil 7,00 m + acostamente 2×1,00 (0,75 consolidat), platformă 9,00, pantă transversală 2,5%, durată perspectivă 15 ani.

**Normative:** Legea 10/1995, 50/1991, OG 43/1997, HG 766/1997; **NP 116-2004 (dimensionare suple/semirigide — metoda analitică deformații), PD 177-2001 (rigide), AND 584-2012, CD 148-2003 (îmbunătățire pământ)**; SR EN 13108/13043/13877, AND 605 (mixturi); **STAS 1913 (pământuri), NP 074-2014, STAS 2914 (terasamente)**.

## 2. Încadrare

**Clasa tehnică IV** (MZA 750-4.500 veh. etalon), **categoria importanță C**, **tip climateric II** (regim hidric mediu).

## 3. Trafic de calcul

**Osia standard 115 kN** (roată 57,5 kN, p 0,625 MPa, a 0,171 m). Coef. echivalare osii standard (f.o.s.): camion 2 osii 0,30, 3-4 osii 0,55, TIR 1,00, autobuz 0,50, remorcă 0,30. **n_c,zi = Σ(ni·f_os)**; ex. 260·0,30 + 120·0,55 + 90·1,00 + 40·0,50 + 60·0,30 = **272 osii std./zi**.

**Trafic cumulat: N_c = 365·10⁻⁶·n_c,zi·f_ev·c_rp·c_bd**; f_ev = ((1+r)^p − 1)/r = ((1,04)^15 − 1)/0,04 = **20,02**; N_c = 365·272·20,02·0,50 = 993.700 → **N_c ≈ 1,0 milioane osii standard** (trafic mediu).

## 4. Geotehnic + portanță pat

Foraje (~250 m) + laborator (STAS 1913). **Tipuri pământ P1-P4** (sensibilitate îngheț): P1 necoezive CBR >20 / P2 coezive redusă 10-20 / **P3 prafuri-nisipuri argiloase mijlocie CBR 5-10 Ep 50-70** / P4 argile ridicată <5. Adoptat **P3** (CBR 6%, **Ep 70 MPa**, μ 0,35). **Portanță pat: Ev2 ≥45 MPa**, raport Ev2/Ev1 ≤2,5 (placă Lucas Ø300).

## 5. Dimensionare sistem rutier suplu (NP 116-2004)

| Strat | Material | h (cm) | E (MPa) | μ |
|---|---|---|---|---|
| Uzură | BA16 | 4 | 3.600 | 0,35 |
| Legătură | BAD22,4 | 6 | 3.000 | 0,35 |
| Bază | AB31,5 | 8 | 3.600 | 0,35 |
| Fundație sup. | piatră spartă | 15 | 500 | 0,27 |
| Fundație inf. | balast | 25 | 350 | 0,27 |
| Pat P3 | pământ | ∞ | 70 | 0,35 |

Asfalt total 18 cm; structură **58 cm** (+ strat formă). **Metoda analitică (semispațiu multistrat Burmister, CALDEROM):** puncte critice **εr** (întindere bază asfalt — oboseală fisurare) + **εz** (compresiune vârf pământ — făgășire).

## 6. Verificare deformații (NP 116)

**εr,adm = 360·N_c^(−0,27)** → N_c 1,0 m.o.s. = **360 μɛ**; **εz,adm = 600·N_c^(−0,28)** = **600 μɛ**. Rezultate CALDEROM: **εr,ef 285 ≤ 360 (grad 1,26)** ✓; **εz,ef 480 ≤ 600 (grad 1,25)** ✓. Ambele criterii îndeplinite — structura rezistă 15 ani; rezervă ~1,25 (optimizat, nesupradimensionat).

## 7. Alternativa rigidă (PD 177-2001)

Dală **BcR 4,5 22 cm** + strat rezemare 5 + fundație 20 + strat formă 15. Dimensionare la **tensiune întindere din încovoiere: σ_t ≤ σ_adm = R_ti/γ** (R_ti ~4,5 MPa, γ oboseală funcție N_c); k 60-80 MPa/m → h_dală 22 cm + rosturi contracție ~5 m + dilatație 40-60 m + gujoane Ø25. Comparație: suplu cost mic/15 ani/întreținere frecventă vs. rigid cost mare/25-30 ani/întreținere redusă. **Adoptat suplu** (cost/performanță optim traseu curent); rigid la intersecții/trafic greu canalizat.

## 8. Terasamente (STAS 2914)

Taluze: rambleu h ≤6 **1:1,5** (h>6 1:1,75+banchete), debleu pământ 1:1-1:1,5 / rocă 1:0,5-1:1. **Compactare (Proctor Modificat, STAS 1913/13): D = ρd,ef/ρd,max·100**; corp rambleu ≥**97%** (95 minim), **pat drum ≥98%** (96 minim), necoezive ≥100%. **Strat de formă** balast 15-30 cm (uniformizare + anticapilar), **Ev2 ≥45 MPa** + Ev2/Ev1 ≤2,5. **Îmbunătățire pământ P4** (CD 148/AND 530): var 2-4% (argile) / ciment 4-8% (prafuri/nisipuri) / mixt, strat 25-30 cm → reverificare Ev2 (P3 nu necesită generalizat, doar punctual).

## 9. Îngheț-dezgheț (STAS 1709)

Adâncime îngheț Z funcție indice îngheț + tip climateric. Verificare H_SR ≥ H_SR,nec = K·Z (K funcție sensibilitate). P3 Z ~80-90 cm; structură 58 + strat formă 20 = 78 cm; **strat formă balast ≥20 cm** (insensibil îngheț) → K_ef ≥ K_adm ✓.

## 10. Concluzii

Clasa tehnică IV, categoria C, tip climateric II. **Trafic N_c ≈ 1,0 m.o.s.** (f_ev 20,02). **Sistem suplu (18 asfalt + 15 piatră + 25 balast) verifică NP 116:** εr 285 ≤360, εz 480 ≤600 (grad 1,25). Alternativă rigidă (dală BcR 22 cm) la intersecții/trafic greu. Terasamente taluze 1:1,5 + compactare ≥98% pat + strat formă Ev2 ≥45. P4 → stabilizare var/ciment. Verificat îngheț-dezgheț. **Verificare A4 (structuri rutiere) + Af (drumuri)** verificator atestat + RTE atestat execuție. Se completează cu geometria + scurgere/siguranță/semnalizare + piese desenate.
