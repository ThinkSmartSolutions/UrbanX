# MEMORIU TEHNIC DE REZISTENȚĂ — BESS (DTAC)

## 1. Date generale

Infrastructură fundare directă BESS (10-50 MWh, containere Li-ion LFP): platforme/radiere b.a. sub containere + fundații PCS + fundație post transformare cu cuvă retenție + platformă rutieră transport.

| Element | Masă/gabarit |
|---|---|
| Container baterii 40ft plin | ~35-40 t (392 kN) / 20ft ~30 t (294 kN) |
| Radier/platformă b.a. | 25-40 cm |
| PCS | 8-15 t |
| Transformator | 10-30 t |

**Categoria C**, **clasa seismică III γI,e 1,0** — DAR forța seismică **importantă din masa mare baterii** (Fb ∝ m) → **guvernează ancorajele antiseismice** (aspectul determinant). **Expunere:** radiere XC2+XF1/XF3 (C25/30, cnom 40, a/c ≤0,55, aer antrenat XF3), cuvă trafo XA1 (C30/37). **Durată:** beton infrastructură 50 ani (supraviețuiește mai multor generații baterii); echipament 20-25 ani. **Geotehnic (NP 074):** pconv 200 kPa, E 15 MPa, Df 0,8-1,1.

**Normative:** Legea 10/1995, 50/1991, HG 766/1997, CR 0-2012, SR EN 1990/1991-1-1/-1-3/-1-4 + CR 1-1-3/1-1-4, SR EN 1992/1993/1997, **SR EN 1992-4 (ancoraje)**, P100-1/2013, NP 112/2014, NP 074/2022, NE 012.

## 2. Sistem structural

**Infrastructură fundare directă** (echipamentele = produse furnizor pe suprastructuri metalice proprii). Rol structurist: (1) preluare încărcări concentrate mari (30-40 t) cu limitare presiune+tasare; (2) verificare **poansonare** sub reazeme (corner castings ISO); (3) preluare **forțe seismice orizontale** prin **ancoraje antiseismice** (smulgere+forfecare); (4) vânt pe containere; (5) cuvă retenție trafo.

**Soluții:** V1 **radier general b.a. 30-40 cm** (recomandat teren mediu/slab — presiune uniformă + tasări + ancorare + suprafață rutieră); V2 grinzi/tălpi sub șiruri reazem (teren bun). PCS/trafo fundații izolate + cuvă retenție etanșă. Strat balast compactat 30-50 cm (≥98% Proctor) + egalizare C8/10.

## 3. Încărcări + combinații

Permanent: container 40ft 392 kN, radier 8,75 kN/mp, PCS 118, trafo 196. Util: trafic mentenanță 5 kN/mp (cat. E) + autotren montaj (>115 kN/osie, tranzitoriu). Zăpadă (copertine), vânt (§5.4), seism (§5.2). **Combinații (CR 0/SR EN 1990):** SLU fundamentală (γG 1,35, γQ 1,5), seismică (G + γI·AEk + ψ2·Q), SLS (teren/tasări).

## 4. Breviar de calcul

**4.1 Teren + poansonare:** container 40ft 392 kN pe radier A_r ~32 mp; **p_ef = (392+280)/32 = 21,0 kPa ≤ pconv 200 (grad 0,11)** ✓ (presiune medie redusă — problema e concentrarea în 4 puncte + tasări diferențiale + seism). **Poansonare (SR EN 1992-1-1 §6.4):** V_Ed colț = 1,35·392/4 = 132 → +seism ≈156 kN; radier h 350 d 300, ρl 0,005, C25/30: v_Rd,c = 0,12·1,816·(12,5)^⅓ = **0,506 MPa**; u1 (placă 178×162 la 2d) = 4.450 mm → **V_Rd,c = 0,506·4.450·300 = 675 kN**; 156 ≤675 (grad 0,23) ✓.

**4.2 Seism container + ancoraj (DETERMINANT):** **Fb = γI·Sd·m·λ**; Sd = ag·β0/q (q 1,5 ancoraje fragile). Amplasament sever ag 0,30g, β0 2,75: Sd = 0,30·9,81·2,75/1,5 = 5,395 m/s² (~0,55g); **Fb = 1,0·5,395·40.000 = 215,8 kN** (~55% greutate — masa baterii face seismul determinant chiar cu γI 1,0). Vertical F_v = ⅔·ag·m = ±78,9 kN. **Răsturnare:** M_r = Fb·h_cg = 215,8·1,45 = 313 kNm; M_stab = (392−78,9)·1,22 = 382,5 → γ 1,22 (marjă mică → **ancoraj obligatoriu**). **Buloane M24 8.8** (4-8/container): forfecare V = Fb/4 = **54 kN**; F_v,Rd = 0,6·800·353/1,25 = **135,5 kN** (grad 0,40); tracțiune T ~55; F_t,Rd = 0,9·800·353/1,25 = **203 kN** (grad 0,27); **interacțiune V+T = 0,399 + 0,193 = 0,59 ≤1,0** ✓; h_ef ≥200 mm + con beton EOTA (PT).

**4.3 Tasare:** s ≈ Δp·B/E·Is ≈ 21·2,44/15.000·0,8 ≈ **3 mm << 40 adm**; diferențială Δs/L ≤1/500 prin radier general ✓.

**4.4 Vânt (CR 1-1-4):** qb = 0,5·1,25·30² = 0,5625; qp = 1,8·0,5625 = 1,013 kPa; F_w = 1,3·1,013·35,4 = **46,6 kN << Fb 216** → seismul determinant; M_w 67,6 << M_stab 382 ✓.

**4.5 Fundație trafo + cuvă:** p_ef 196,2/9 = 21,8 kPa ≤200 ✓ + ancoraj antiseismic. **Cuvă: V ≥100% ulei + 10%**; trafo 1000 kVA ~400 l → V ≥0,44 (adoptat 0,5-1,0 mc + pietriș); C30/37 etanș XA1 + hidroizolație + pantă separator + probă apă 24h. **4.6 PCS:** p_ef 29,4 ≤200 + ancoraj (Fb 64,7 → 4×M20).

## 5. Grade utilizare + materiale

| Verificare | Grad |
|---|---|
| Presiune teren radier | 0,11 |
| Poansonare colț | 0,23 |
| **Ancoraj V+T (determinant)** | **0,59** |
| Răsturnare container seism | γ 1,22 (+ancoraj) |
| Tasare / vânt | 0,08 / 0,18 |

Beton radiere **C25/30 XC2+XF1/XF3** cnom 40; cuvă **C30/37 XA1** cnom 45; B500C; buloane **M20-M24 8.8 zincate/ancore chimice EOTA**; metal S275/S355 zincat ≥85 μm; **coroziune C3-C4 (SR EN ISO 12944)** sistem duplex.

## 6. Concluzii A1/A2/Af

**A1** toate grade <60%; **A2** containere stabile răsturnare/lunecare seism+vânt + **ancoraje antiseismice dimensionate la Fb ~216 kN/container** (masa mare baterii); **Af** presiuni 11-15% pconv + tasări ~3 mm/diferențiale <1/500 radier general. **Aspectul determinant = ancorarea antiseismică containere grele** (grad interacțiune V+T 0,59). Faze determinante ISC: teren fundare + armare + pozare buloane + probă etanșeitate cuvă. **Verificare A1/A2** verificator atestat MDLPA + con beton EOTA + geotehnic definitiv la PT.
