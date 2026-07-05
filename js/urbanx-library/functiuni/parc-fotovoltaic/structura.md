# MEMORIU TEHNIC DE REZISTENȚĂ — CENTRALĂ ELECTRICĂ FOTOVOLTAICĂ (DTAC)

## 1. Date generale

Structuri suport module + fundații + posturi transformare/clădiri tehnologice. CEF 5-10 MWp, teren 8-15 ha extravilan.

**Obiecte:** (a) structuri suport mese FV fixe (cadre profile Z/C/sigma/U zincate pe piloți) sau tracker 1 axă (torque tube, IEC 62817) — suprafață mare + greutate mică → **vânt determinant (smulgere/răsturnare)**; (b) fundații piloți bătuți / șuruburi fundare / beton prefab (balast); (c) posturi PTAB beton prefab / containere pe radier b.a.; (d) platforme + gard + drumuri.

**Durată:** structuri FV + piloți 25-30 ani (durata CEF); posturi/clădiri 50 ani (SR EN 1990). Verificare climatică la IMR 50 ani (acoperitor). **Categoria C**; **clasa seismică III γI 1,0** (seism nedeterminant la mese, determinant la posturi cu transformator). **Expunere beton XC2** (fundații sol umed, +XF1/XA după caz), cnom 45-75 mm (turnat pe teren).

**Normative:** Legea 10/1995, 50/1991, HG 766/1997, CR 0-2012, SR EN 1990/1991-1-1/-1-3/-1-4 + **CR 1-1-3/1-1-4/2012**, SR EN 1993-1-1/-1-3/-1-8, SR EN 1992-1-1, SR EN 1997-1/NP 122-2010, P100-1/2013, NP 112-2014, NP 123-2010 (piloți), IEC 62817 (tracker), SR EN ISO 1461/12944, SR EN 1090-2 (EXC2). Metoda stărilor limită; combinații SLU 6.10; **EQU** (răsturnare/smulgere): destabilizator γ 1,10-1,50, stabilizator γG,stb 0,90.

## 2. Structuri suport module

**Masă fixă:** purlins Z/C (module cu cleme) + cadre C/sigma/U + stâlpi H/I/U + contravântuiri. Geometrie: β 25°, h1 0,8 / h2 2,8 m, L (pantă) ~4,3 m, deschidere 20-30 m, interax stâlpi 3,0 m, gk ~0,18 kN/mp. **Tracker 1 axă:** torque tube rotativ ±55° + acționare + stow la vânt; verificare IEC 62817 + **flutter/galoping torsional** (frecvență proprie + amortizare/blocaj stow).

**Materiale:** purlins S350GD+Z (SR EN 10346), stâlpi/piloți S275/S355JR (SR EN 10025-2), șuruburi 8.8, zincare Z275-Z600/termic (SR EN ISO 1461).

## 3. Încărcări

**Permanent:** module 0,12-0,15 + structură 0,05-0,08 = **gk ~0,18 kN/mp** (redus → vânt determinant). **Zăpadă (CR 1-1-3):** s = μ1·Ce·Ct·s0k = 0,8·1,0·1,0·2,0 = **1,6 kN/mp** (alunecă de pe sticlă; h1 ≥0,8 evită îngroparea; NU se cumulează cu vânt-smulgere).

**Vânt (CR 1-1-4 — CAPITOL CENTRAL):** vb 30 m/s → **qb = ½ρvb² = 0,5625 kN/mp**; qp(z) = cpq·qb, teren II, ze 2,8 m, cpq ~2,0 → **qp ≈ 1,125 kN/mp**. Panouri = marchize monopantă (SR EN 1991-1-4 §7.3), cp,net:

| Poziție | Presiune ↓ | Sucțiune ↑ (smulgere) |
|---|---|---|
| Câmp curent | +0,5…+1,2 | −0,9…−1,5 |
| **Margine/colț (mese contur)** | +1,5…+2,0 | **−2,0…−2,7** |

**Efect de margine** (mese contur ~1,5-2× interior) → dimensionare diferențiată. we_sucțiune = 1,125·(−2,5) = **−2,81 kN/mp**; we_presiune = 1,125·1,8 = **+2,03 kN/mp**.

## 4. Breviar structuri suport

**Forța vânt/masă** (A = 24×4,3 = 103,2 mp): F_w↑ = 2,81·103,2 = **290 kN**; vertical Fz = 290·cos25 = **263 kN** ⋙ G_masă = 0,18·103,2 = **18,6 kN** → **net smulgere, echilibru DOAR prin ancoraj piloți** (dimensionează adâncimea). Orizontal F_wH = 290·sin25 = **122 kN** la zcp 1,8 m. Smulgere/stâlp (9 stâlpi) = 263/9 = 29,2 → ×1,3 capăt ≈ 38 → **N_Ed = 1,5·38 − 0,9·2,07 = 55,1 kN/pilot**.

**Stâlp (SR EN 1993-1-1):** M_y,Ed = 1,5·13,6·1,8 = 36,7 kNm; HEA 100 M_c,Rd 22,8 < 36,7 ✗ → **HEA 140** M_Rd 47,6 (**grad 0,77**) ✓. **Purlin Z:** M 3,98; Z150 4,2 (grad 0,95 la limită) → **Z180** M_Rd 5,95 (**grad 0,67**) ✓.

## 5. Fundații — ancoraj piloți

**Smulgere pilot (SR EN 1997-1/NP 123):** R_t,k = π·d·Σqs·ΔL. Nisip qs = K·γ'·z·tanδ; conservativ qs 15 kN/mp constant, perimetru 0,45: R_t,k = 6,75·D; R_t,d = 6,75D/1,75 = 3,86D ≥ 55,1 → **D ≥ 1,43 m** → adoptat **D 1,8-2,2 m (curent), 2,5 m (contur)** + **pull-out test in situ obligatoriu**.

**Lateral (împingere pasivă Rankine):** Kp = tan²(45+φ/2) = 3,0 (φ 30°); Pp = ½Kp·γ·D²·b; cu factor formă 2,5: Pp,ef = 2,5·3,24·2,2² = **39,2 > 20,4 kN (grad 0,52)** ✓ → **D 2,2 m** verificat smulgere + lateral.

**Variantă beton (balast):** EQU M_stb ≥ M_dst → 0,9·G·b/2 ≥ 1,5·F_wH·zcp; ex. ~2,25 mc beton/bloc (voluminos → preferă piloți).

## 6. Posturi transformare

PTAB beton prefab pe **radier b.a. C25/30** + container invertoare pe grinzi/radier. Transformator 10-16 t → încărcare concentrată (poansonare + presiune teren). **Seism (P100):** Sd = ag·β0/q = 0,20g·2,5/1,5 = 3,27 m/s²; m 51 t → **Fb = 167 kN** → radier + **ancorare antiseismică transformator** (buloane). Presiune teren p_ef = 500/12 = 41,7 < pconv 200 (grad 0,21) + verificare tasare SLS.

## 7. Protecție anticorozivă

**SR EN ISO 12944:** atmosferă rurală **C2-C3**, sol **Im3**. Purlins Z275-Z450 (20-35 μm/față); piloți/stâlpi **zincare termică ≥70-85 μm (SR EN ISO 1461)** (piese >6 mm → 85 μm); viteză coroziune zinc sol 2-4 μm/an → 85/3 ≈ 28 ani (acoperă 25-30 ani CEF) + **rezervă coroziune 1-2 mm** perete pilot.

## 8. Materiale

Beton fundații/radiere **C25/30 XC2** (XA1-2 dacă sol agresiv), armătură B500C; oțel S275/S355JR (laminate), S350GD+Z (formate rece), șuruburi 8.8 zincate; zinc 70-85 μm. Execuție **EXC2** (SR EN 1090-2).

## 9. Concluzii + verificare A1/Af

1. Structuri FV = **metalice ușoare guvernate de VÂNT** (nu greutate/seism), determinant **smulgere/răsturnare** echilibrat prin ancoraj piloți. 2. **Efect margine** → mese contur dimensionate diferențiat (piloți 2,5 vs 2,2 m + profile mai mari). 3. Adâncime piloți (2,0-2,5 m) **confirmată prin pull-out test in situ** + geotehnic. 4. Zăpada + seism nedeterminante la mese, dar **seism determinant la posturi** (transformator ancorat antiseismic Fb 167 kN). 5. Anticoroziv zincare 70-85 μm → 25-30 ani + rezervă. 6. Toate gradele **η <1,0** (SLU) + deformații SLS. Categoria C, clasa III (γI 1,0), XC2. **Verificare A1 + Af** (verificator atestat MDLPA obligatoriu). Corespunde cerinței A — rezistență mecanică și stabilitate (L10/1995).
