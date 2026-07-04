## 1. Date generale, clasa de importanță și risc

Memoriu de rezistență DTAC pentru **SKID GPL**. Obiecte de construcție:

| Obiect | Tip structural | Fundare |
|---|---|---|
| C1 rezervor GPL suprateran 4,85 mc pe 2 șei (var. A) | recipient sub presiune + suporți | radier general b.a. |
| C1' rezervor GPL subteran (var. B) | recipient îngropat | cuvă/dală b.a. anti-flotație |
| C2 pompă + dispenser | cadru metalic pe postament | fundație izolată |
| C3 cabină operator 3×4 m | cadre b.a./container | radier b.a. |
| C4 copertină 6×5 m, H 4,20 m | stâlpi + grinzi metalice | fundații izolate |
| C5 zid de foc L=8, H=3 m | perete b.a. autoportant (consolă) | fundație continuă |

Se tratează **ambele variante** (suprateran + subteran).

**Date de teren:** ag = 0,25 g; Tc = 0,7 s; qb = 0,60 kPa vânt; s0,k = 2,0 kN/mp; teren cat. III; pconv = 200 kPa; îngheț −0,90 m (adoptat −1,10); NHmax = −1,50 m (critic la subteran); categoria geotehnică 2.

**Clasa de importanță:** rezervorul GPL (recipient cu gaz inflamabil sub presiune, avarie → BLEVE/UVCE) → **clasa II, γI = 1,2**; zidul de foc II; copertina/cabina III. Cantitate ~2,1 t GPL (sub prag SEVESO 50 t, dar risc tehnologic ridicat). Recipientul propriu-zis e proiectat/certificat de producător (ISCIR PT C4); memoriul tratează **structurile de susținere/fundare/ancorare**.

Reglementări: P100-1/2013, CR 0/CR 1-1-3/CR 1-1-4/2012, NP 112/2014, NP 074/2014, SR EN 1990-1998 (incl. 1998-4 rezervoare), ISCIR PT C4/C7, NTPEE-2018, Legea 10/1995.

## 2. Dimensionarea plăcii/radierului rezervorului

**Geometrie recipient:** V = 4,85 mc; D = 1,25 m; L ≈ 4,50 m; distanță șei a = 3,00 m; grad umplere 85% → 4,12 mc lichid; ρ GPL = 0,54 t/mc.

**Mase:** tară 1,60 t; GPL lichid 2,22 t; **exploatare (plin) 3,82 t → G_rez = 37,5 kN**; probă hidraulică (apă) 6,45 t → 63,3 kN.

### 2.1. Radier suprateran (var. A)

Radier b.a. 4,00×2,00×0,40 m, C25/30, BST500; greutate 80 kN. N total = 37,5 + 80 + 4 = **121,5 kN**. p_med = 121,5/8,0 = **15,2 kPa << 200 kPa** (radierul e dimensionat din stabilitate la răsturnare, nu din portanță).

**Răsturnare seism:** M_r = F_b·(h_cg+h_r) = 11,3·(1,00+0,40) = 15,8 kNm; e = 15,8/121,5 = 0,13 m < L/6 = 0,67 m (fără desprindere); p_max = 15,2 + 15,8/5,33 = **18,2 kPa < 1,2·200 = 240 kPa**. **VERIFICAT.**

**Armare radier** (constructiv, ρ_min): Ø14/150 sus și jos, ambele direcții; armare locală sub șei Ø16 + etrieri; verificare la străpungere (poanç) sub placa de bază — acoperită.

### 2.2. Placă/cuvă subterană (var. B) — VERIFICARE FLOTAȚIE

Dală 5,00×2,20×0,40 m, fund la −2,60 m; rezervor între −0,85 și −2,10 m; NHmax −1,50 m.

**Flotație (scenariu acoperitor freatic la CTN):** V dislocuit ≈ 9,90 mc → **F_up = 10,0·9,90 = 99,0 kN**.

**Stabilizatoare (rezervor GOL — critic):** dală b.a. 110,0 + rezervor gol 15,7 + pământ acoperire (submersat) 42,0 = **167,7 kN**.

**Verificare UPL (SR EN 1997-1):** FS = (0,90·167,7)/(1,10·99,0) = 150,9/108,9 = **1,39 > 1,00**; simplu 167,7/99,0 = **1,69 > 1,10**. **VERIFICAT.** Dacă freaticul e mai ridicat → lestare (h_d 0,50 m) sau **chingi de ancorare** (platbandă 60×6, N_Rd ≈ 111 kN >> solicitare).

**Armare dală** C30/37 (XC2/XA1), Ø16/150 sus/jos ambele direcții; verificare la încovoiere din subpresiune (M ≈ 7,3 kNm/m) — acoperită.

## 3. Comparație suprateran vs subteran

| Criteriu | Suprateran (A) | Subteran (B) |
|---|---|---|
| Fundație | radier 4,0×2,0×0,4 | cuvă/dală 5,0×2,2×0,4 + umplutură |
| Fenomen critic | răsturnare + smulgere buloane | **flotație (uplift) gol + freatic** |
| Ancorare | buloane șa → radier (seism) | chingi rezervor → dală (anti-flotație) |
| Vânt | semnificativ | neglijabil (îngropat) |
| Seism | mare (masă sus, h_cg) | redus (mișcare cu solul) |
| Protecție foc | zid de foc + distanțe | protejat de sol (BLEVE redus) |
| Cost | mic | mare (excavație, hidroizolare) |

Dimensionant: suprateran = combinația seismică cu răsturnare (plin); subteran = flotația UPL (gol + freatic).

## 4. Ancorarea seismică a rezervorului suprateran

**Forța de bază** (SR EN 1998-4, sistem rigid ancorat): F_b = γI·(ag/g)·β·G/q = 1,2·0,25·2,75·37,5/1,5. c_s = 1,2·0,25·2,75/1,5 = **0,55**; **F_b = 20,6 kN** (acoperitor pt ancoraje). Componentă verticală F_v = 0,1125·1,2·G ≈ 5,1 kN.

**Forțe în buloane** (2 șei × 2 buloane = 4): M_răst = 20,6·1,00 = 20,6 kNm; smulgere netă/bulon ≈ **3,3 kN**; forfecare/bulon V = 20,6/4 = **5,2 kN**.

**Buloane M20 gr. 5.6** (A_s = 245 mmp), înglobare ≥ 40Ø = 800 mm:

| Verificare | Solicitare | Rezistență | Stare |
|---|---|---|---|
| Întindere | 3,3 kN | 88,2 kN | ✔ |
| Forfecare | 5,2 kN | 58,8 kN | ✔ |
| Interacțiune M+V | 0,10 | ≤ 1,0 | ✔ |
| Smulgere con beton | 3,3 kN | > 40 kN | ✔ |

Piulițe duble + șaibe elastice (anti-desfacere din vibrații). **Alunecare ansamblu:** R_fr = 0,45·121,5 = 54,7 kN; FS = 54,7/20,6 = **2,66 > 1,5**. **VERIFICAT.**

## 5. Zidul de foc — perete b.a. autoportant (consolă)

L = 8,00 m, H = 3,00 m, t = 0,25 m, C25/30, BST500, REI 180 (240 dacă separă direct). Greutate 18,75 kN/m.

**Vânt** (perete liber, c_p,net = 1,8): q_p = 1,02 kPa; w = 1,84 kPa; M_v = (1,84·3,00)·1,50 = **8,28 kNm/m**.

**Seism** (element propriu, q = 2,0): c_s = 1,2·0,25·2,75/2,0 = 0,41; F_s = 0,41·18,75 = 7,7 kN/m; M_s = 7,7·1,50 = **11,5 kNm/m** → **dimensionant seismul**.

**Armătură verticală:** A_s,nec = 11,5×10⁶/(0,9·210·435) = 140 mmp/m < ρ_min 325 → **Ø12/150 (753 mmp/m) fața exterioară** + Ø10/200 interior; orizontală Ø10/200 ambele fețe.

**Fundație zid** (talpă 1,20×0,45 m, adoptat lărgire 1,50): N_stab = 46,25 kN/m; M_răst = 7,7·(1,50+0,45) = 15,0 kNm/m; M_stab = 27,75; **FS răsturnare = 1,85 > 1,5**; p_max (talpă parțial activă) ≈ 110 kPa < 240 kPa; alunecare FS = 2,70. **VERIFICAT.**

**Rezistență la foc:** t = 0,25 m beton + acoperire ≥ 35 mm → **REI 240** (SR EN 1992-1-2) ≥ 180 impus.

## 6. Structura copertinei

6,00×5,00 m, H 4,20 m; 4 stâlpi HEA 160 (S235), grinzi IPE 200 + IPE 140, învelitoare tablă cutată.

| Acțiune | Valoare |
|---|---|
| Greutate proprie | 0,35 kN/mp |
| Zăpadă | 1,60 kN/mp |
| **Vânt SUCȚIUNE (critic)** | **−1,3 kN/mp** (smulge) |

**Sucțiune (critic):** stâlp de colț (arie 7,5 mp): F_up = 9,75 kN; G aferentă 2,6 kN; **smulgere netă 7,15 kN**. Fundație izolată 1,0×1,0×0,8 (G = 28 kN cu pământ): FS anti-smulgere = 28/7,15 = **3,9 > 1,5**. Grindă IPE 200: M = 26,3 kNm; M_Rd = 49,2 kNm → η = 0,53. **VERIFICAT.**

## 7. Structura cabinei operator

3×4 m, H 2,80 m; cadre b.a. (stâlpi 25×25, grinzi 25×25, placă 12 cm) sau container. G ≈ 95 kN. Seism (q = 2,5): c_s = 0,275; F_b = 26,1 kN (6,5/stâlp); M = 18,3 kNm < capacitate stâlp 4Ø14. Radier p_med = 6,3 kPa. Container: ancorare M16 la colțuri (6,5 kN/colț). **VERIFICAT.**

## 8. Acțiuni și combinații (CR 0/2012, SR EN 1990)

| Simbol | Acțiune | Valoare |
|---|---|---|
| G_k | permanente | cap. 2-7 |
| Q_liq | rezervor plin GPL | 21,8 kN |
| Q_test | probă hidraulică | 47,6 kN |
| S_k | zăpadă | 1,60 kN/mp |
| W_k | vânt | +0,5/−1,3 kN/mp; perete 1,84 |
| A_Ed | seism | ag=0,25g, γI=1,2 (rez./zid) |
| F_up | subpresiune freatic | 99 kN (dală subterană) |

Grupări: fundamentală SLU (1,35G + 1,5Q + 1,5ψ0S/W); **seismică** (G + ψ2·Q_liq + A_Ed; ψ2,GPL = 1,0 — dimensionantă rezervor/ancoraje); **flotație UPL** (0,90·G_stab ≥ 1,10·F_up, rezervor gol — dimensionantă dală subterană); probă hidraulică (1,0G + 1,0Q_test).

## 9. Calcul seismic — sinteză

| Obiect | γI | q | c_s | G (kN) | F_b (kN) | Dimensionează |
|---|---|---|---|---|---|---|
| Rezervor suprateran plin (ancoraje) | 1,2 | 1,5 | 0,55 | 37,5 | 20,6 | buloane, șei |
| Rezervor suprateran (fundație) | 1,2 | 2,0 | 0,41 | 37,5 | 15,4 | radier răsturnare |
| Zid de foc (per m) | 1,2 | 2,0 | 0,41 | 18,75 | 7,7 | armătură, talpă |
| Copertină | 1,0 | 2,5 | 0,275 | ~20 | ~5,5 | (vântul e critic) |
| Cabină | 1,0 | 2,5 | 0,275 | 95 | 26,1 | stâlpi |
| Rezervor subteran | 1,2 | — | mișcare cu solul | — | redus | (flotația) |

Racordurile GPL — compensatoare/racorduri flexibile la deplasarea diferențiată seismică (NTPEE, ISCIR).

## 10. Materiale

| Material | Clasă | Utilizare |
|---|---|---|
| Beton radier suprateran | C25/30 (XC2) | radier, fundații |
| Beton dală subterană | C30/37 (XC2/XA1) | contact apă/sol agresiv |
| Beton zid de foc | C25/30 | perete parafoc |
| Oțel-beton | BST500S | armături |
| Oțel profile | S235JR | copertină, șei |
| Buloane ancoraj | gr. 5.6/8.8 | ancoraje recipient, stâlpi |
| Oțel recipient (informativ) | P265GH | manta (ISCIR PT C4, producător) |

## 11. Rezistența la foc

Zid de foc **REI 180-240** (beton 250 mm + acoperire 35 mm); stâlpi copertină metalici R 15-30 (aer liber); radier/dală REI 120+; cabină REI 60-90. Zidul de foc = element de siguranță; grosime 250 mm C25/30 → REI 240.

## 12. Concluzii și verificare tehnică

| Verificare | Rezultat | Stare |
|---|---|---|
| Presiune teren radier | 15,2 < 200 kPa | ✔ |
| Răsturnare radier (seism) | fără desprindere | ✔ |
| Alunecare suprateran | FS 2,66 | ✔ |
| Flotație dală subterană | FS 1,39/1,69 | ✔ |
| Ancorare buloane recipient | << capacitate | ✔ |
| Zid de foc armătură + răsturnare | FS 1,85 | ✔ |
| Copertină sucțiune | FS 3,9 | ✔ |
| Rezistență foc zid | REI 240 ≥ 180 | ✔ |

Dimensionante: suprateran = seism cu răsturnare + smulgere ancoraje (plin); subteran = flotație UPL (gol + freatic); zid de foc = seism pe consolă; copertină = sucțiune vânt. **Verificare tehnică** verificatori atestați MDLPA: **A1/A2** (structuri beton + metal), **Af** (geotehnic), **C** (securitate la incendiu — zid de foc). Recipientul sub presiune = documentație ISCIR separată (producător). Detaliile la faza P.Th. + D.E.
