# MEMORIU TEHNIC DE REZISTENȚĂ — STAȚIE DE TRANSFORMARE 110/20 kV (DTAC)

## 1. Date generale

4 obiecte: (1) **fundații transformator** (bloc masiv b.a. + cale rulare + amortizare vibrații, echipament 40-80 t); (2) **cadre/portale metalice 110 kV** (susținere conductoare + echipamente, vânt + chiciură + tracțiune); (3) **clădire comandă** (cadre b.a. + zidărie); (4) **cuvă retenție ulei** (b.a. hidrotehnic etanș).

| Element | Valoare |
|---|---|
| Categoria importanță | **B** (clădire comandă + fundații trafo); C anexe |
| Clasa seismică | **II γI,e 1,20** (infrastructură energetică + echipament greu) |
| Categoria geotehnică | 2 (NP 074/2022) |
| Durată viață | 50 ani (S4) |
| Expunere beton | XC2 (fundații), XC4/XF1 (suprateran), **XA1-2 + etanș** (cuvă ulei) |

**Parametri (ex.):** ag 0,30g, TC 1,6s, s0k 2,0, qb 0,60 (vb ~31 m/s), chiciură (zonare CR 1-1-3), Df 0,90-1,10, pconv 200 kPa. **Normative:** Legea 10/1995, 50/1991, HG 766/1997, CR 0-2012, SR EN 1990/1991-1-1/-1-3/-1-4 + CR 1-1-3/1-1-4, SR EN 1992/1993/1997, P100-1/2013, NP 112/2014, NP 074/2022, NE 012, STAS 6054, **NTE 007** (fundații stații).

## 2. Sistem structural

Structuri cu comportări diferite: **masive** (fundații trafo, cuvă — compresiune + tasare/etanșeitate), **zvelte metalice** (portale — deformabilitate + vânt/gheață/tracțiune), **adăpost** (clădire comandă cadre b.a.).

**Particularitate critică: fragilitatea seismică a echipamentelor** — izolatoarele ceramice (casante, rupere fragilă) montate în vârful unor suporți zvelți care **amplifică** accelerația → verificarea seismică include **accelerația transmisă echipamentului**, nu doar structura.

**(1) Fundație trafo:** bloc masiv b.a. C25/30 (radier/bloc pe pernă) + cale rulare montaj + **anti-vibrații** (masă mare + plăci elastomerice, evită rezonanța cu 100 Hz — armonica 2 rețea prin magnetostricțiune) + amplasare în conturul cuvei. **(2) Portale 110 kV:** cadre metalice S235/S355 zincate (stâlpi zăbreliți + rigle/ferme), deschideri mari, H 8-14 m (gabarite izolație), fundații izolate + ancoraje pretensionate. **(3) Clădire comandă:** cadre b.a. C25/30 + planșee + grinzi fundare legare (obligatorii clasa II). **(4) Cuvă:** b.a. C30/37 P8, monolit fără rosturi necontrolate (waterstop), V ≥100% ulei + rezervă, verificare fisurare wk ≤0,2 (SR EN 1992-3) + plutire + împingere.

## 3. Breviar de calcul

**Combinații (SR EN 1990/CR 0):** SLU fundamentală (γG 1,35, γQ 1,5), seismică (G + γI·AEd + ψ2·Q, γI 1,20), SLS (teren/fisurare).

**3.1 Fundație trafo — teren/tasare:** trafo 70 t = 687 kN; bloc 6,0×5,0×1,20 = 900 kN; A 30 mp. N_Ed = 1,35·(687+900) = **2.142 kN**. **p_ef = (687+900)/30 = 52,9 kPa ≤ pconv 200 (grad 0,26)** ✓ (rezervă mare — limitare tasări+vibrații). Tasare edometrică ~mm; vibrații f_n ≈15-30 Hz ≪100 Hz (sub-rezonant) ✓.

**3.2 Seism echipament + amplificare izolatoare (P100 §10):** **Fb = γI·Sd·m·λ**; Sd = ag·β0/q (q 1,5 echipament rigid, aproape elastic). Ex. suport 3 t, ag 0,30g, β0 2,75, q 1,5: Sd = 0,30·9,81·2,75/1,5 = **0,50g**; Fb = 1,20·0,50·(3.000·9,81) = **17,66 kN**. **Amplificare element nestructural:** Fa = γa·Sa·ma/qa; Sa = ag·[3(1+z/H)/(1+(1−Ta/T1)²)] − 0,5; izolator la vârf z/H=1 + rezonanță Ta≈T1 → factor **≈5,5·ag** (qa 1,0 fragil). M_izolator = Fa·h vs. **moment rupere garantat** (catalog, IEC 62271-207/61463). Măsuri: rigidizare suport (decalaj frecvențe) + izolatoare clasă seismică calificată + limitare drift.

**3.3 Portal 110 kV — vânt+chiciură+tracțiune:** vânt conductoare F_w = qp·cf·d·L·cscd; ex. qp 0,9, cf 1,1, d 0,024, L 60, 3 cond = **4,3 kN**. **Chiciură (CR 1-1-3):** g_ice = ρ_ice·g·(π/4)[(d+2tk)²−d²]; d 24, tk 20 mm → 24,4 N/m; ×60×3 = **4,39 kN** vertical (+ grupare vânt+gheață). **Tracțiune conductoare** (portal terminal, nechilibrat): M_bază = ΣT_max·h; 3 cond × 20 kN × 11 m = **660 kNm/stâlp**. Verificare N-M (SR EN 1993-1-1) + drift ≤H/150 + răsturnare fundație M_stab/M_răst ≥1,5 + smulgere buloane.

**3.4 Cuvă retenție:** V ≥100% ulei + stingere/pluvial (trafo 40 MVA ~30-40 mc → adoptat ~50 mc, 7,0×5,0×1,5 = 52,5); **fisurare wk ≤0,2 mm** (SR EN 1992-3 clasa etanșeitate 1, armătură deasă + acoperire ≥40 + beton P8); **plutire (UPL)** G·0,9/(U·1,1) ≥1,0; ex. A 35 mp, hw 1,3 → U = 10·1,3·35 = 455 kN; G_cuvă (radier 350 + pereți 270) = 620; 620·0,9/(455·1,1) = **1,12 ≥1,0** ✓; pereți la împingere K0·γ·z + γw·z.

## 4-5. Materiale + grade utilizare

| Element | Beton/Oțel |
|---|---|
| Fundație trafo | C25/30 XC2, cnom 45 |
| Portale metalice | S355J2 + buloane 8.8/10.9, zincare ≥85 μm (50 ani) |
| Clădire comandă | C25/30 |
| **Cuvă retenție** | **C30/37 P8 XA1-2**, wk ≤0,2, cnom 40-50, rezistent ulei |
| Armătură | B500C (clasa C ductil seismic) |

| Verificare | Grad |
|---|---|
| Presiune teren fundație trafo | 0,26 |
| Vibrații (f_n vs 100 Hz) | sub-rezonant |
| **Moment izolator (seism amplificat)** | verificare critică vs. catalog |
| Portal N-M (vânt+gheață+tracțiune) | ~0,85 |
| Portal răsturnare fundație | ≥1,5 |
| Cuvă fisurare / plutire | ≤1,0 / 0,89 (γ 1,12) |

## 6. Concluzii A1/A2/Af

**A1** rezistență (toate SLU + seism ≤capacitate); **A2 seism** — critic **protejarea izolatoarelor fragile** (rigidizare suporți evită rezonanță + echipamente clasă seismică IEC 61463/62271-207 + limitare drift conexiuni rigide); **Af** durabilitate (expuneri + acoperiri 50 ani; **cuva** simultan capacitate ≥100% ulei + etanșeitate wk ≤0,2 + plutire γ 1,12). Coordonat cu instalații electrice (nivele fundare + priză pământ + gabarite portale din distanțe izolație). **Verificare A1/A2/Af** verificator atestat MDLPA. Detaliere armare/ancoraje/con beton EOTA + geotehnic definitiv la PT.
