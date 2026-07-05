# MEMORIU TEHNIC DE REZISTENȚĂ — FERMĂ AGROZOOTEHNICĂ (DTAC + DTOE)

Cerința A. Trei corpuri independente structural (rosturi): **Corp A hală metalică** adăpost + **Corp B siloz** (B1 metalic cilindric / B2 celule beton) + **Corp C bazin dejecții** (cuvă etanșă beton hidrotehnic).

## 1. Date generale, geometrie, clase

| Corp A hală | Corp B siloz (B1) | Corp C bazin |
|---|---|---|
| Deschidere L 18-24 m (analizat 21,0) | Ø d_c 6-10 m (analizat 8,0) | 12×8×3 m |
| Travee e 5-6 m (5,50) | H perete h_c 12-20 m (15,0) | V util ~288 mc |
| H streașină 4-6 m (5,0) | Zveltețe h_c/d_c 1,88 (zvelt) | b.a. etanș |
| Parter, pantă 10% | Pâlnie β 25-30°, cap. 750-1.000 t | |

**Categorie (HG 766/1997):** A hală C, B siloz C, C bazin D (etanșeitate/mediu ridicată). **Clasa seismică III γI,e 1,0** toate. **Expunere beton (SR EN 206):** fundații hală XC2, radier siloz XC2(+XA1), perete siloz beton XA1+XM1, **cuvă dejecții interior XA2-XA3**, platformă XF3+XM1. Durată 50 ani.

**Normative:** Legea 10/1995, HG 766/1997, CR 0-2012, SR EN 1990/1991-1-1/-1-3/-1-4 + CR 1-1-3/1-1-4, **SR EN 1991-4** (silozuri — critic), SR EN 1993-1-1/-1-5/-1-6/-1-8, **SR EN 1993-4-1** (silozuri metalice), SR EN 1992-1-1/-3, P100-1/2013, **SR EN 1998-4** (silozuri seismic), NP 112/2014, NP 074/2022, SR EN 1997-1, SR EN ISO 12944/1461.

## 2. Sistemul structural — hala (Corp A)

**Cadre metalice transversale** pas 5,50, noduri rigide riglă-stâlp (vute), riglă grindă inimă plină + vute (L ≤21) sau fermă zăbrele (L 24). Stâlpi HEA 300/IPE 450, riglă IPE 500+vute, pane Z200/250, contravântuiri acoperiș Ø20/L70×7 + pereți Ø24, sandwich 100/120. **Justificare metalic:** deschideri 18-24 m fără stâlpi intermediari + masă mică (seism redus) + montaj rapid + sarcini agățate (furajare/ventilatoare) + mediu agresiv compensat prin anticoroziv sporit C4-C5. Rezistență orizontală: transversal cadre rigide, longitudinal contravântuiri verticale (portale) + diafragmă acoperiș.

## 3. Silozul — capitol dedicat (SR EN 1991-4)

Material granular → presiuni **Janssen** (nu hidrostatic — plafonate de frecare perete + efect boltă). **AAC 2** (100-10.000 t). Zvelt (h_c/d_c 1,88 → limita 2,0). **Grâu:** γ 9,0 kN/mc, φi 30°, K_m 0,54, μ_m 0,38 (perete oțel).

**Umplere (Janssen):** z0 = d_c/(4·K·μ) = 8,0/(4·0,54·0,38) = **9,74 m**; p_ho = γ·K·z0 = 9,0·0,54·9,74 = **47,3 kN/mp**; **p_hf(z) = p_ho·(1−e^(−z/z0))**; p_wf = μ·p_hf; n_zSk = μ·p_ho·[z − z0(1−e^(−z/z0))]. La bază z 15: **p_hf 37,1 kN/mp, p_wf 14,11, n_zSk 119 kN/m** (compresiune meridiană — critic flambaj).

**Golire (majorare):** p_he = C_h·p_hf, **C_h 1,15** (zvelt) → p_he(15) = **42,7 kN/mp**; n_zSk,e = 1,10·119 = **131 kN/m**. **Patch load** (asimetrii): p_pf = C_pf·p_hf, C_pf ≈0,087 → ~3,2 kN/mp (golire ×C_h = 3,7), pe zonă s = π·d_c/16 → încovoiere circumferențială + inele.

**Verificări perete metalic:** (a) inel întindere n_θ = p_he·r = 42,7·4,0 = 170,8 kN/m → t_nec = 170,8/(275·10³) = 0,62 mm (nedeterminant, min. tehnologic 4-5 mm domină). **(b) FLAMBAJ siloz GOL sub VÂNT (SR EN 1993-1-6 — CRITIC):** σ_x,Rcr = 0,605·E·t/r = 0,605·210.000·5/4.000 = **158,8 N/mm²** (redus cu α·χ → σ_x,Rd = χ·fy/γM1); σ_θ,Rcr = 0,92·E·(t/ℓ)·(t/r). **Determinant flambaj gol, NU întindere plin** → **inele rigidizare** (reduc ℓ) + **virole grosime variabilă** (4 sus → 6-8 bază); ondulat: panouri preiau inelar, montanți verticali preiau meridian + frecare. **Pâlnie:** inel racord pâlnie-cilindru foarte solicitat (despicare → inel compresiune). **B2 celule beton:** armătură inelară (n_θ/fyd) + încovoiere patch, XA1+XM1 acoperire ≥40, w ≤0,2 mm (SR EN 1992-3).

## 4. Factor comportare q

Hala cadre metalice DCM → **q = 2,0** (adoptat acoperitor, seism nedeterminant; DCM ar permite 4,0). Siloz (SR EN 1998-4) **q = 1,5** (disipare limitată, masă mare material). Bazin îngropat **q = 1,0**.

## 5. Hala — dimensionare cadru (breviar)

**Permanente:** sandwich 0,15 + pane 0,10 + riglă 0,20 + tehnologic 0,10 = **gk 0,55 kN/mp** (×e = 3,03 kN/m). Sarcini agățate (furajare 2 kN, ventilatoare 1,5). **Zăpadă (CR 1-1-3):** s = γIs·μ1·Ce·Ct·sk = 1,0·0,8·1,0·1,0·2,0 = **1,6 kN/mp** (×e 8,8) + asimetrică. **Vânt (CR 1-1-4):** qb = 0,5·1,25·30² = 0,56; qp(5) = 1,8·0,56 = **1,01 kN/mp**; hală semideschisă → cpi mare → **smulgere acoperiș ~(0,9+0,7)·1,01 = 1,6 kN/mp** (critic ancoraje bază + pane).

**Cadru:** wEd = 1,35·3,03 + 1,5·8,8 = **17,3 kN/m**; M_max,riglă = wL²/8 = 17,3·21²/8 = **953,5 kNm**; M_colț ≈ 0,60·953,5 = **572 kNm**; VEd = wL/2 = **181,7 kN**. **Riglă IPE 500 (S355):** M_c,Rd = Wpl·fy = 2.194·355 = **778,9 kNm** (câmp 381 OK); colț cu vute M_Rd ~1.170 > 572 (**grad 0,49**). **Deplasare SLS:** δ_adm = H/150 = 5.000/150 = **33,3 mm**; δ_calc ~24 (grad 0,72) ✓.

## 6. Acțiuni și grupări

γG 1,35/1,0 (favorabil), γQ 1,5; ψ0 zăpadă 0,5, vânt 0,6; ψE material siloz seism 0,8-1,0. **Hală SLU:** GF1 1,35G+1,5S+0,9W (moment cadru), GF2 vânt (stâlpi), **GF3 1,0G+1,5W_succiune (smulgere ancoraje)**. **Siloz:** SU umplere, **SG golire (p_he+patch — inel)**, **SGol-vânt (flambaj coajă)**, S-seism. Material = acțiune variabilă γQ 1,5.

## 7. Calcul seismic

Parametri (ex.): ag 0,25g, Tc 0,7, β0 2,5, γI 1,0. **Hală (masă mică):** G_total = 0,55·1.260 = 693 kN (m ~70,6 t); T1 ~0,5; Sd = 0,25·2,5/2,0 = 0,3125g; Fb = 0,3125·693 = **216,6 kN** < vânt total ~390 kN → **VÂNTUL determinant, nu seismul**. **Siloz (masă mare):** G_material = 9,0·753,6 = **6.782 kN (691 t)**; m_seism = (250 + 0,8·6.782)/9,81 = **578 t**; Sd = 0,25·2,5/1,5 = 0,417g; **Fb = 0,417·5.670 = 2.364 kN** → **SEISMUL siloz plin ACȚIUNE MAJORĂ**; M_răsturnare = 2.364·8,0 = **18.912 kNm** (presiuni neuniforme radier + smulgere ancoraj opus).

## 8. Grade utilizare (max 0,84 <1,0)

| Element | Gruparea | Grad |
|---|---|---|
| Stâlp hală HEA 300 | GF2 vânt | 0,65 |
| Riglă/colț IPE 500+vute | GF1 zăpadă | 0,49 |
| Pane Z250 (succiune) | GF3 | 0,78 |
| Ancoraj bază (smulgere) | GF3 | 0,71 |
| Deplasare cadru SLS | vânt | 0,72 |
| **Perete siloz inel** | SG golire | 0,52 (t 6mm) |
| **Perete siloz flambaj meridian gol** | SGol-vânt | 0,72 |
| **Perete siloz flambaj circumf. gol** | SGol-vânt | 0,81 (cu inele) |
| Ancoraj siloz (seism) | S-seism | 0,84 |
| Fundație inelară siloz | S-seism | 0,84 |
| Cuvă bazin perete | împingere | 0,75 (w 0,15) |

## 9. Infrastructură

**Geotehnic (NP 074):** p_conv 220-250 kPa, NHA −3,0, Df 0,90-1,10, cat. geo 2. **Fundații hală izolate** (bloc+cuzinet): A = 182/250 = 0,73 → **1,6×1,6** (p 71<250, cu moment 165<250). **Smulgere vânt:** N_tract ~95 kN; G_ancoraj = 3,07·25 + 2,0·18 = 112,8 kN; 112,8/(95·0,9) = **1,32 >1,0** ✓ + buloane înglobate. **Fundație siloz radier circular** (încărcare mare + moment seismic): p_med = 7.030/63,6 = **110 kPa <250**; seism p_max = 110 + 18.912/143 = **242 ≈ p_conv** (limită) ✓; tasare ≤4-5 cm, Δs/L ≤1/500 (altfel piloți). **Cuvă dejecții (C mediu critic):** b.a. C30/37 impermeabil P8, **w ≤0,2 mm** (SR EN 1992-3 clasa etanșeitate 1) + waterstop + protecție XA3; **plutire** G_beton/F_Arh ≥1,1 (radier lestat/lățit dacă insuficient); pereți la împingere K_a·γ·z + γw·zw.

## 10. Durabilitate/anticoroziv

**Mediu fermă agresiv** (NH₃ + umiditate + H₂S + acizi + abraziune). **Oțel (SR EN ISO 12944):** hală interior **C4-C5-I** (zincare ≥85 μm + duplex epoxi/PU ≥240 μm, >15 ani), exterior C3-C4, siloz Z600 + vopsire, ancoraje inox/zincat; soclu beton +30 cm + protecție bază. **Beton:** cuvă dejecții **XA3 C35/45 impermeabil c_nom 50 mm + epoxi + ciment rezistent acizi**, siloz beton XA1+XM1 C35/45 c 45, radier XC2(+XA1) C30/37 c 45, platformă XF3 C30/37 aer antrenat.

## 11. Materiale

Oțel **S355 JR/J0** (cadre, fy 355), S275/S350GD (pane, siloz), gr. 8.8/10.9 (șuruburi), inox A2-70 (ancoraje). E 210.000. Beton: fundații hală C25/30, radier siloz C30/37, cuvă/celule C35/45; γc 1,5. **BST 500 C** (fyd 435, clasa C ductilă seismic), γs 1,15.

## 12. Concluzii + verificare A1/A2/Af

Toate gradele ≤0,84 <1,0. Hală = **vânt/smulgere determinant** (nu seism). Siloz = **flambaj perete gol vânt + seism plin** (Fb 2.364 kN, M 18.912). Infrastructură: fundații izolate (presiune+smulgere), radier siloz (moment seismic p_max 242 limită), cuvă etanșă. Durabilitate C4-C5 + XA3 → 50 ani mediu agresiv. Satisface cerința A. **Verificare: A1** (beton — fundații/cuvă/celule) + **A2** (metal — cadre/siloz metalic) + **Af** (geotehnic) atestați MDLPA + B/C. **Recomandări PT:** geotehnic detaliat siloz, calcul coajă EF (SR EN 1993-1-6 imperfecțiuni), analiză seismică modală siloz plin (SR EN 1998-4), detalii ancoraje/inele/waterstop, urmărire tasări/coroziune. Valori hazard/geotehnice de actualizat cu amplasamentul real.
