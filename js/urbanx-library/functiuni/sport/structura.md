# MEMORIU TEHNIC DE REZISTENȚĂ — SALĂ DE SPORT POLIVALENTĂ (DTAC + DTOE)

## 1. Date generale

Structură pentru **sală de sport polivalentă** (handbal/baschet/volei/tenis + evenimente public). Două subsisteme solidarizate la infrastructură: **acoperiș metalic deschidere mare (ferme zăbrele 40,0 m, fără stâlpi intermediari)** + **tribune b.a. (~1.500 spectatori, gradene prefabricate pe cadre)**.

| Parametru | Valoare |
|---|---|
| Deschidere acoperiș liber | **40,0 m** (ax ferme) |
| Lungime hală | 60,0 m (10 travei × 6,0) |
| Traveea / pas ferme | 6,0 m |
| H liber coamă / streașină | 12,50 / 9,00 m |
| Cotă coamă | +15,80 m |
| Ac | ~2.400 mp |
| Tribune | 18 rânduri, 1.500 locuri |
| Categoria importanță | **B** (HG 766/1997) |
| Clasa seismică | **II (γI,e 1,20)** (aglomerare >200) |
| Clasa acțiuni climatice | III (zăpadă/vânt) |
| Grad RF | II |

Durată exploatare 50 ani (SR EN 1990); expunere beton XC1 (interior), XC2+XA1 (fundații). **Normative:** Legea 10/1995, SR EN 1990-1998 + NA, CR 0/2012, CR 1-1-3/1-1-4/2012, P100-1/2013, SR EN 1993-1-1/1-5/1-8/1-3, SR EN 1992-1-1, SR EN 1997-1, NP 112/2014, NP 074/2014, STAS 3300/2, P118-1/2/3, SR EN ISO 12944.

## 2. Sistemul structural

**Separare funcțională subsisteme + infrastructură comună:** (1) acoperiș metalic ușor deschidere mare (ferme zăbrele transversale la 6,0 m, masă ~0,55 kN/mp — decisivă seismic); (2) cadre transversale metalice stâlp-fermă (îmbinare articulată/semirigidă); (3) contravântuiri spațiale acoperiș + verticale (efect cutie, forțe longitudinale vânt/seism); (4) tribune b.a. **independente static** de acoperiș (cadre înclinate + gradene prefabricate „L", fundate independent).

**Justificare acoperiș metalic 40 m:** raport rezistență/greutate superior (S355, ferme ~0,25-0,35 kN/mp vs. beton prohibitiv); înălțime fermă **h = L/12÷L/15 = 3,33÷2,67 → adoptat 3,20 m** (L/h 12,5); montaj rapid prefabricat + șuruburi IR; ductilitate la seism. **Fermă triangulată tălpi paralele (N/Pratt), pantă 2%:** tălpi RHS/HEA, diagonale/montanți SHS/cornier, panou ~2,5 m (16 panouri).

## 3. Factor comportare și regularitate

Regulat în plan (40×60 compact, simetric 2 axe) + regulat pe verticală (parter + tribune joase) → **analiză modală cu spectre** (2 subsisteme mase/rigidități diferite). q: cadre metalice DCM q0·αu/α1 = 4,0·1,1 = 4,4, dar **adoptat acoperitor q = 3,0** (parter, îmbinări articulate, disipare redusă); tribune b.a. cadre DCM 3,0·1,15 = 3,45 → **q = 3,0**. **Valoare unică ansamblu q = 3,0** ambele direcții.

## 4. Acoperișul metalic — dimensionare

**Permanente:** tablă cutată 0,12 + vată 200 0,08 + membrană 0,05 + pane/instalații 0,30 = **gk 0,55** + structură ferme 0,30 kN/mp.

**Zăpadă (CR 1-1-3):** s = γIs·μ1·Ce·Ct·sk = 0,8·1,0·1,0·**2,0** = **1,60 kN/mp** (+ aglomerare local μ2 → 2,0 la denivelări/luminatoare).

**Vânt (CR 1-1-4):** qp(15,8) = ce·qb = 2,3·0,5 = **1,15 kN/mp**; we = qp·cpe:

| Zonă | cpe,10 | we | Efect |
|---|---|---|---|
| F colț | −1,8 | −2,07 | **succiune critică** |
| G margine | −1,2 | −1,38 | succiune |
| H interior | −0,7 | −0,81 | succiune |
| I | ±0,2 | ±0,23 | presiune/succiune |

**CRITIC — smulgere acoperiș ușor:** gk − we = 0,55 − 0,81 = **−0,26 kN/mp (smulgere netă)** → grupare **0,9·Gk + 1,5·W_succiune** dimensionează prinderi pane-fermă + ancoraje stâlpi.

**Fermă (interax 6,0, SLU grav.):** qEd = 6,0·[1,35·(0,55+0,30) + 1,5·1,60] = **21,3 kN/m**; MEd = qL²/8 = 21,3·40²/8 = **4.260 kNm**; N_talpă = M/z = 4.260/3,0 = **1.420 kN** (inf. întinsă / sup. comprimată); VEd = qL/2 = **426 kN**; N_diag capăt = V/sinθ = 426/0,79 = **539 kN**.

**Verificări:**
- Talpă întinsă **RHS 300×200×12,5 S355** (A 118 cm²): N_pl,Rd = A·fy/γM0 = 4.189 kN; **1.420/4.189 = 0,34** ✓
- Talpă comprimată (Lcr,ef 3,0 m, i 8,05, λ̄ 0,49, curba a χ 0,90): N_b,Rd = 3.770 kN; **1.420/3.770 = 0,38** ✓ (contravântuiri talpă sup. limitează flambaj)
- **Săgeată SLS** (qk 14,7 kN/m): δ ≈ 128 mm < δ_adm L/250 = 160 ✓; contrasăgeată montaj 100 mm (L/400)
- **Pane IPE 200 S355** (2,5 m interax, L 6,0): M 35,4 < M_Rd 78,1 kNm (grad 0,45) + tiranți mijloc

**Contravântuiri:** acoperiș orizontale (primele/ultimele 2 travei + mijloc, stabilizează tălpi comprimate) + verticale longitudinale „X" (F = F_oriz/(n·cosα), stabilitate generală).

## 5. Tribunele b.a.

Cadre transversale + grinzi rampante (interax 6,0) + gradene prefabricate „L" (treaptă 0,45, contratreaptă 0,80), 18 rânduri, 1.500 locuri (0,50 m front).

**Încărcări:** gradenă proprie 3,8 kN/mp + **util aglomerare C5 qk = 5,0 kN/mp** + orizontal mulțime 3,0 kN/m (mână curentă). **Gradenă „L"** (L 6,0): qEd = 1,35·4,0 + 1,5·4,0 = 11,4 kN/m; M = 51,3 kNm; C30/37 d 400: As = 328 → **3Ø14 (462) BST500C** (grad 0,71) + etrieri Ø8/200.

**CRITIC — vibrații mulțime (IStructE):** frecvență proprie verticală **f1 ≥ 3,5 Hz** (rec. ≥6,0 activitate ritmică/sărituri). Grindă rampantă 40×80 L 8,0 (I 1,71·10⁻², E 33 GPa, m 2.500 kg/m): **f1 = (π/2)√(EI/mL⁴) = 11,7 Hz > 6,0** ✓ (cadre masive → mult peste rezonanță). **Grindă rampantă:** q ~45 kN/m, M = 360 kNm, 40×80 C30/37 d 750 → As 1.226 → **5Ø18 (1.272)** ✓.

## 6. Acțiuni și grupări

| Acțiune | Valoare |
|---|---|
| Permanent acoperiș / tribune | 0,85 / 3,8 kN/mp |
| Zăpadă | 1,60 |
| Vânt presiune / succiune | +0,81 / −2,07 |
| Util spectatori (C) / circulații | 5,0 / 4,0 |

ψ (C): 0,7/0,7/0,6; zăpadă 0,5/0,2/0; vânt 0,6/0,2/0. **SLU:** G1 grav. 1,35G+1,5Q_tr+1,5·0,5·S; G2 zăpadă 1,35G+1,5S+1,5·0,7·Q; **G3 smulgere 0,9G+1,5Ws**. **Seism:** G+γI·AEd+ψ2Q; masă ψE = φ·ψ2 = 0,8·0,6 = 0,48 tribune.

## 7. Calcul seismic

**Intrare (ex.):** ag 0,30g, Tc 0,7s (TB 0,14, TD 3,0), β0 2,50, γI,e 1,20, q 3,0. **T1 = Ct·H^0,75 = 0,085·15,8^0,75 = 0,67 → modal 0,65s** (T1<TC → palier maxim). **Sd = ag·β0/q = 0,30g·2,50/3,0 = 0,25g.**

**Masă seismică:** acoperiș 2.400·0,85 = 2.040 + tribune (1.500·3,8 + 0,48·1.500·5,0) = 9.300 → **G ~11.340 kN (m 1.156 t)**. **Fb = γI·Sd·m·λ = 1,20·0,25·11.340·0,85 = 2.892 kN.** Distribuție Fi = Fb·mizi/Σmjzj (acoperiș z14 → 1.245; tribune z4,5 → 1.823).

**Verificări:** acoperiș masă redusă → determinant vânt/zăpadă (verificare ancorare ferme-stâlpi la F seismic); drift SLS dr = ν·q·dre ≤ 0,005h; tribune cadre DCM (etrieri îndesiți s ≤100 mm zone critice); rost seismic Δ = √(d1²+d2²).

## 8. Sinteză grade utilizare

| Element | Secțiune | Efort | Grad |
|---|---|---|---|
| Talpă inf. fermă | RHS 300×200×12,5 | N 1.420 (întindere) | 0,34 |
| Talpă sup. fermă | RHS 300×200×12,5 | N 1.420 (compresiune) | 0,38 |
| Diagonală capăt | SHS 150×150×10 | N 539 | 0,69 |
| Stâlp metalic | HEB 400 | N+M | 0,66 |
| Pană | IPE 200 | M 35,4 | 0,45 |
| Gradenă | „L" 3Ø14 | M 51,3 | 0,71 |
| Grindă rampantă | 40×80 5Ø18 | M 360 | 0,87 |
| Îmbinare nod | 8×M24 gr.10.9 | N 1.420 | 0,82 |

**Stâlp HEB 400** (9,0 m, articulat bază, N 426 + M 380): interacțiune N+M cu χy 0,72/χLT 0,88 = 0,44 → grad final 0,66 ✓. **Îmbinare nod (SR EN 1993-1-8):** placă capăt + **8 șuruburi M24 gr.10.9** (Fv,Rd 226): 1.420/(8·226) = **0,79** ✓ + suduri a 8 mm; categoria C (pretensionate, rezistente lunecare) în zone alternante vânt.

## 9. Infrastructura

**Geotehnic (NP 074):** umplutură 0-0,8 (îndepărtat) + argilă prăfoasă (pconv 200, strat fundare) + argilă marnoasă >3,5 (300). Df 0,90 (STAS 6054) → **cotă fundare −1,50 m**. 

**Fundații izolate stâlpi metalici** (N 900, M 150): A = Nk/pconv = 650/200 = 3,25 → 2,0×2,0; e 0,167 < B/6 0,33; p_max = (N/A)(1+6e/B) = 244 > 200 → mărit **2,4×2,4** → 174 < 1,2·pconv 240 ✓. **Ancorare smulgere** (vânt): buloane Ø30 pretensionate, greutate bloc echilibrează cu γ ≥1,5. **Fundații tribune** (N 1.200 → 2,6×2,6 h 0,90 Ø16/150) + **grinzi de fundare** legătură (obligatoriu ag ≥0,20g). **Placă pe sol teren joc** C25/30 15 cm + plasă Ø8/150 + balast 30 + rosturi 6×6.

## 10. Protecție anticorozivă și foc

**Anticoroziv (SR EN ISO 12944):** categoria **C3**, durabilitate High (15-25 ani): primer epoxi-zinc 60 + epoxi MIO 100 + PU alifatic 60 = **220 μm DFT**, sablare Sa 2½.

**Foc (P118-1/2013), grad II:** stâlpi **R60** (intumescent DFT ~1.200 μm la Am/V 120), ferme acoperiș **R30** (intumescent ~600 μm sau neprotejat cu justificare scenariu securitate — acoperiș parter deschidere mare, colaps limitat, evacuare rapidă), tribune b.a. R60 inerent. **Desfumare** trape acoperiș ≥1% arie pardoseală (P118-2).

## 11. Materiale

| Material | Element | Clasă |
|---|---|---|
| Oțel | ferme/stâlpi/pane/contravântuiri | **S355 J2** (fy 355, fu 510) |
| Șuruburi IR | îmbinări principale | **gr. 10.9** |
| Beton | cadre/grinzi/gradene | **C30/37** |
| Beton | fundații / placă | C25/30 / C20/25 |
| Armătură | b.a. | **BST500C** (fyd 435, clasa C) |
| Buloane ancoraj | bază stâlpi | Ø30 pretensionate |

γM0 1,0 / γM1 1,0 / γM2 1,25 (oțel, îmbinări); γC 1,50 / γS 1,15. **Detalii:** noduri sudate uzină (K/N, a 6-8) + tronsoane șuruburi pretensionate M24; rezemare fermă-stâlp articulată; pane cleme + tiranți; bază stâlp placă + buloane ancoraj; gradene neopren + dornuri antiseismice; **rost dilatație L 60 m** (verificare ΔT ±40°C, eventual rost mijloc).

## 12. Concluzii și verificare A1/A2

Structură concepută și verificată; toate elementele grad **0,34-0,87 (<1,0)**. Acoperiș ferme 40 m acoperă deschiderea fără stâlpi (săgeată 128 < 160), cu tratare corectă **smulgere vânt** pe acoperiș ușor. Tribune b.a. f1 11,7 Hz >> prag rezonanță mulțime (evită amplificare dinamică). Comportare seismică regulată q 3,0 Fb 2.892 kN. Infrastructură fundații + ancorare smulgere + centuri antiseismice. Satisface **cerința A — rezistență mecanică și stabilitate** (Legea 10/1995). **Verificare** verificatori atestați MDLPA: **A1** (beton armat — tribune, fundații) + **A2** (oțel — ferme, stâlpi) + **Af** (geotehnic). Recomandări execuție: recepție profile (certificate 3.1) + beton, NDT suduri noduri (**EXC3 SR EN 1090-2**), pretensionare controlată șuruburi, stabilitate montaj ferme, monitorizare săgeți/contrasăgeată, control DFT vopsele. Se completează cu piese desenate rezistență + PCCVI (faze determinante ISC) + geotehnic verificat Af. PTh+DE ulterior.
