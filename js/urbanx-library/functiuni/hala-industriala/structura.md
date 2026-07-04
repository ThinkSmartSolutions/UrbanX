## 1. Date generale

Memoriu de rezistență DTAC+PTh pentru **hală industrială parter înalt cu structură METALICĂ** (cadre transversale, deschidere L=24,00 m, travee t=6,00 m, lungime ~60 m/10 travee, H cârlig ~8,00, H streașină 9,50, H coamă ~10,70), pod rulant Q=8 t opțional + mezanin birouri ~150 mp.

| Parametru | Valoare | Referință |
|---|---|---|
| Categoria importanță | C — normală | HG 766/1997 |
| Clasa importanță seismică | **III** (γI,e = 1,0) | P100-1/2013 tab.4.2 |
| Clasa consecințe | CC2 → RC2, EXC2, DSL2 | SR EN 1990 An.B |
| Durata viață proiectată | 50 ani | SR EN 1990 |

*Notă:* la substanțe periculoase/aglomerări >300 pers → clasa **II** (γI,e 1,2), forțele seismice se rescalează ×1,20.

**Normative:** Legea 10/1995, HG 907/2016, CR 0/2012, SR EN 1990/1991 (-1-1/-1-3/-1-4/-1-5/-3), CR 1-1-3 (zăpadă) + CR 1-1-4 (vânt), NP 042 (pod rulant), SR EN 1993 (-1-1/-1-3/-1-5/-1-8/-1-9), SR EN 1994 (mixt), SR EN 1992, SR EN 1998/P100-1, NP 112, SR EN 1090-2, P118, C107.

## 2. Tipuri de hală și influența asupra structurii

**Portal inimă plină (12-30 m) vs. zăbrele (24-60 m):** pentru L=24 m se adoptă **cadru cu inimă plină + vute la noduri riglă-stâlp și coamă** (I sudat variabil) — raport cost/comportare seismică optim, îmbinări rigide cu rotule plastice controlate. **Cu pod rulant:** console de sprijin cale rulare (+6,50 m), compresiune excentrică în stâlpi, oboseală grindă rulare, fundații mai mari. **Mezanin:** planșeu compozit oțel-beton (IPE + tablă cutată colaborantă + placă C25/30 12 cm, gujoane), stâlpi proprii HEB, legat în plan pt. diafragmă. **Frigorifică:** panouri 100-200 mm → G mai mare, punți termice, izolant sub placă + antiîngheț (reduce k) — nu e cazul.

## 3. Structura adoptată

**Spațială:** 11 cadre transversale (interax 6 m, stâlpi articulați la bază + rigle cu vute rigide) + stabilitate longitudinală (contravântuiri verticale X/V în pereți + contravântuiri orizontale acoperiș „vânt de acoperiș" + rigle streașină/tiranți) + pane Z (interax 1,75 m, sag-rods) + rigle perete Z/C + stâlpi fronton + infrastructură (fundații izolate pahar + grinzi soclu + placă pe pat elastic cu rost).

**Justificare:** cadre articulate la bază + noduri rigide → fundații economice + disipare în vute/baza stâlpilor (mecanism controlabil); contravântuiri concentrice pe 60 m (rigiditate mare, consum mic); separarea funcțiilor (cadre=transversal, contravântuiri=longitudinal); regularitate → metoda forțelor laterale echivalente.

## 4. Materiale

| Element | Oțel | fy | fu |
|---|---|---|---|
| Stâlpi/rigle (t≤40) | **S355 J2** | 355 | 490 |
| Contravântuiri/secundare | S275 J0 | 275 | 430 |
| Pane/rigle (formate rece) | S350 GD+Z | 350 | 420 |

E=210.000 N/mmp; fu/fy≥1,10, KV≥27J (J2 la elemente disipative). Șuruburi noduri rigide **M27 gr.10.9 pretensionate**, curente 8.8, buloane ancoraj 8.8. Beton: fundații C20/25, **placă C30/37** (fcd 20), mezanin C25/30, zid foc C25/30. Armătură **B500B** (fyd 434,8). Fibre metalice l/d 45-65, ≥1.100 N/mmp, 25-40 kg/mc.

## 5. Amplasament, teren, seism, climat

**Geotehnic (cat. 2):** Df −1,50 m (sub îngheț 0,90-1,10), **pconv 250 kPa**, NH >3,0 m, modul reacție Winkler **k = 60 MN/mc** (placă).

**Seism (exemplu):** ag 0,25g, Tc 0,7s, TB 0,14/TD 3,0, β0 2,75, γI,e 1,0. **Climat:** sk 2,0 kN/mp; qb 0,5 kN/mp (vb≈28,3 m/s), teren cat. II-III; temp. referință tenacitate −20°C.

## 6. Factor de comportare q și ductilitate

**Regularitate:** dreptunghi 24×60 simetric → regulat în plan (excentricitate accidentală ±0,05L); parter unic fără retrageri → regulat în elevație → metoda forțelor laterale echivalente aplicabilă (T1 < 4Tc și < 1,5s).

**Decizie: DCM** cu **q_transversal = 4,0** (MRF, rotule în vute/baza stâlpilor, αu/α1 1,2 → q teoretic 4,8 adoptat conservator 4,0) și **q_longitudinal = 4,0** (CBF diagonale întinse). Alternativă DCL q=1,5-2,0 dacă vântul guvernează. Elementele nedisipative verificate la Ω·efect seismic (capacity design).

## 7-8. Acțiuni (SR EN 1991)

**Permanente acoperiș:** sandwich 0,15 + pane 0,08 + instalații 0,20 + tavan 0,05 = **gk 0,48 kN/mp** (+greutate cadre ~0,25-0,35 din model); perete sandwich 0,18 + rigle 0,06.

**Zăpadă:** s = μ1·Ce·Ct·sk = 0,8·1,0·1,0·2,0 = **1,60 kN/mp** (pantă <30°); pe riglă qZ = 1,60·6 = 9,60 kN/m; verificare aglomerare μ2 la denivelări.

**Vânt (critic la hale ușoare):** qp(ze=10,7) = ce·qb = 2,1·0,50 = **1,05 kN/mp**. Perete presiune +0,84, succiune −0,53, lateral A −1,26; acoperiș F −1,89…−0,95, G −1,26, H −0,74, I ±0,21; cpi +0,2/−0,3. **Succiune netă acoperiș → ridicare** preluată de ancoraje/îmbinări. Fw,transv ≈ (0,84+0,53)·9,5·6 ≈ **78 kN/cadru interior**.

**Utile:** acoperiș necirculabil H 0,4 (nu se cumulează cu zăpada); mezanin B **3,0** + pereți 0,8; placa v. cap.11.

**Pod rulant (SR EN 1991-3, NP 042):** Q=8t, Gpod 40 kN, cărucior 8 kN. R_v,max ≈ 95-105 kN/roată; φ2 1,15 → **R_v,d ≈ 115 kN/roată**. Transversal HT ≈ 8,8 kN (la +6,50 → moment mare stâlp); longitudinal HL 5-10 kN (la contravântuiri). Grinda rulare la oboseală (SR EN 1993-1-9) + săgeată L/600-L/750.

**Seism (P100-1):** W ≈ 4.500 kN; T1 ≈ 0,085·10,7^0,75 ≈ **0,50s** (transversal), 0,25s longitudinal; Sd(T1) = 0,25·1,0·2,75/4,0 ≈ **0,172g**; **Fb = 0,172·4.500·0,85 ≈ 658 kN**. Vânt transversal ~780 kN vs. seism 658 → **comparabile**, se verifică ambele.

## 9. Grupări (CR 0/2012)

**SLU fundamentală:** γG 1,35/1,0 (favorabil la ridicare!), γQ 1,5, ψ0 zăpadă 0,7/vânt 0,6/util 0,7. Combinații: (1) 1,35G+1,5Z+... gravitațional max; **(2) 1,0G+1,5V succiune → ridicare/ancoraje**; (3) cu pod; (4) cu mezanin. **Seismic:** G + γI·AEd + ψ2·Qi (100/30, ±0,05L).

**SLS:** săgeată riglă L/200 = **120 mm**; deplasare streașină H/150 ≈ 63 mm; drift seismic dr ≤ 0,005h; grindă rulare L/600-750; mezanin L/250.

## 10. Analiza și verificarea elementelor

Model 3D bare, analiză elastică ordinul II (P-Δ) + imperfecțiuni φ 1/200; verificare stabilitate globală αcr ≥ 3.

**Stâlp HEB 450 S355:** NEd 380, MEd,y 520 kNm, **clasa 1** (DCM). Npl,Rd 7.739 kN → n 0,049; Mpl,y,Rd 1.260 kNm; M_N,Rd ≈ 1.379 > 520 ✓. Flambaj: χy 0,72, χLT 0,85 → interacțiune **0,53 < 1,0** ✓.

**Riglă I sudat (900 la nod / IPE550 câmp) S355:** MEd nod 620, câmp 320; Mpl,Rd 990 > 620 ✓; deversare cu fly-braces Lcr,LT 1,75, χLT 0,92 → utilizare **0,74** ✓. Vute → rotula plastică lângă vută.

**Pane Z200×2,0:** q=(0,15+1,60)·1,75 = 3,06 kN/m; MEd,y 13,8 kNm; încovoiere biaxială + succiune (flambaj distorsional talpă liberă guvernează); săgeată ≤ L/200=30 mm ✓.

**Contravântuiri X SHS 120×120×6 S275:** Ftracțiune ≈ 218 kN; Npl,Rd 718 > 218 ✓ (diagonală întinsă activă, comprimata neglijată DCM); zveltețe 1,3 ≤ λ̄ ≤ 2,0; stâlpi/colectori la Ω·seism.

**Îmbinare rigidă riglă-stâlp (placă capăt + vută, M27 gr.10.9):** Ft,Rd/șurub 330,5 kN, Fv,Rd 220 kN/plan; Mj,Rd ≥ 1,1·γov·Mpl,riglă (suprarezistentă, γov 1,25) → rămâne elastică; panou inimă stâlp cu doubler plate dacă e necesar. Sudură a=6-8 mm (metoda direcțională, √[σ⊥²+3(τ⊥²+τ‖²)] ≤ 435). Pane/contravântuiri M16/M20 gr.8.8.

## 11. PLACA PARDOSELII INDUSTRIALE — dimensionare completă (A + B)

**Încărcări:** stivuire uniformă 30-50 kN/mp; motostivuitor 3,5t → 35-45 kN/roată (amprentă 200×200, p~1,0-1,1); rafturi → 60-90 kN/picior (placă bază 150×150, p~3-4).

### Caz A — placă suprateranã pe pat elastic (Westergaard/Winkler)

Placă **C30/37** pe balast (Ev2≥100 MPa) + folie PE; k=60 MN/mc.

Raza rigiditate: ℓ = ⁴√[E·h³/(12(1−ν²)k)]; h=200, E=33.000, ν=0,15 → **ℓ = 783 mm**.

Moment sarcină interioară (raft P=80 kN, a≈85): M = P/(4π)·[ln(2ℓ/a)+0,6159] = 6.366·(2,913+0,616) = **22,47 kNm/m**; σ = 6M/h² = **3,37 N/mmp** > fctd,fl 1,73 → **necesită armare/fibre**. Soluție: plasă **Ø8/150 dublă** (sus+jos) SAU **fibre 30 kg/mc** (M_Rd,fibre 13,3 kNm/m insuficient singur la raft greu → combinație fibre+plasă sau h 220 sub rafturi). Motostivuitor P=45: M 11,62 kNm/m, σ 1,74 ≈ fctd,fl (la limită, acoperit de armare). Poansonare raft: VRd,punch ≈ 209 > 80 kN ✓. Portanță ~40-50 kN/mp (limitată de teren, δ ≤ 20 mm).

**Adoptat A: h 20 cm C30/37 armată/fibrată; local rafturi 22 cm sau fundații punctuale independente sub picioarele de raft (recomandat — decuplează sarcina concentrată).**

### Caz B — placă pe subsol/goluri (pe grinzi)

Fără reazem continuu pe teren → **element structural încovoiat** pe grilă de grinzi la 5-6 m. q_ed = 1,35·5 + 1,5·50 = **81,75 kN/mp**; M câmp ≈ q·lc²/10 = 81,75·25/10 = **204 kNm/m** (foarte mare). d nec ≈ 261 → **h ≈ 30 cm**; As = 204·10⁶/(0,9·270·434,8) = 1.930 → **Ø20/150 (2.094) pe 2 direcții sus+jos**; verificare săgeată L/250 + poansonare pe reazeme.

| Parametru | A — pe teren | B — pe subsol/goluri |
|---|---|---|
| Model | Westergaard/Winkler | placă b.a. pe reazeme |
| Grosime | **20 cm** (22 local) | **25-30 cm** |
| Armare | Ø8/150 dublă + fibre 30 kg/mc | Ø20/150 2 direcții sus+jos |
| Guvernant | concentrat raft/stivuitor | stivuire+concentrat pe 5 m |
| Portanță | ~40-50 kN/mp (teren) | ~50 kN/mp (placă) |

**Rosturi:** contracție 5-6 m (tăiere 1/3 la ≤24h, gujoane Ø20/300) · turnare (tije/gujoane) · dilatație perimetral + la stâlpi (placă flotantă, decuplată).

## 12. Zidul de foc (perete antifoc autostabil)

**Cerință P118-1:** rămâne în picioare chiar dacă structura metalică de o parte se prăbușește. **Soluție:** stâlpi proprii b.a. (sau metalici protejați REI 180) încastrați în fundații proprii, interax 6 m, funcționează **în consolă** (rezemat doar la bază); umplutură zidărie/BCA/beton REI ≥180; **fără legături de transfer** cu cadrele (sau fuzibile).

**Verificare (stâlp b.a. consolă H 10,7):** vânt perete liber cf 1,5 → we 1,58 kN/mp → w 9,45 kN/m → M bază = w·H²/2 = **541 kNm/stâlp** + efect termic/împingere colaps. Secțiune 40×60 C25/30: M_Rd nec ≥ 1,5·541 = 812 kNm → As = 812·10⁶/(550·434,8) = 3.395 → **6Ø28/față** ✓; răsturnare Mstabil/Mrăst ≥ 1,5. Fundație proprie lată B 2,5-3,0 (e ≤ B/6). Depășire **+0,60 m** peste acoperiș; uși REI cu autoînchidere; rost decuplare pe toată înălțimea.

## 13. Infrastructura

**Fundații izolate bloc+cuzinet** (Df −1,50) + grinzi soclu perimetrale/legătură + placă independentă cu rost.

**Fundație tip:** NEd 480, VEd 55 (grav.) / NEd 350, VEd 120 (seism). A nec = 355/250 = 1,42 → talpă **2,0×2,0 m**; p_max = 100 + 30 = **130 kPa < 250** ✓ (e 0,10 < B/6 0,33); lunecare VEd 120 ≤ 350·tan20°=127 + grinzi soclu ✓. Armare talpă Ø14/150 (constructiv) ambele direcții. Cuzinet 90×90×60; placă bază S355 (fjd = βj·kj·fcd, βj 2/3).

**Buloane ancoraj (SR EN 1993-1-8, CEN/TS 1992-4):** cazul critic **ridicare** (1,0G+1,5V succiune) Nt ≈ **90 kN**. **4×M30 gr.8.8:** Ft,Rd 323 kN/bulon → 4×323=1.292 ✓; smulgere con beton → **hef ≥ 500 mm** + armătură suspendare (evită cedare fragilă). Forfecare VEd 120/4 = 30 kN/bulon < Fv,Rd 215 ✓ (+pinten shear key opțional); interacțiune N-V ✓. Răsturnare/lunecare ansamblu ≥ 1,5 (grinzi soclu leagă tot).

## 14. Protecție anticorozivă și la foc

**Anticoroziv (SR EN ISO 12944, C3, durabilitate H 15-25 ani):** sablare Sa 2½ + grund epoxidic zinc 60 + intermediar 100 + finisaj PU 60 → **DFT ~220 µm**; buloane zincate termic.

**La foc (P118-1, SR EN 1993-1-2):** hală parter + compartiment ≤ arie admisă + zid foc autostabil → **structură metalică majoritar neprotejată** justificată (colaps parter nu afectează niveluri superioare, evacuare rapidă). Dacă se cere R15/R30: **vopsea intumescentă** (θcr ≈ 550-585°C, μ0 0,6; HEB450 Am/V~100 → DFT 0,4-0,8 mm la R30) sau placare vată/plăci. **Excepție protejată R30: stâlpii adiacenți zidului de foc + căi evacuare.** Soluția finală în scenariul de securitate la incendiu (verificator Ci).

## 15-16. Concluzii și verificare

Cadre MRF q=4 + CBF q=4 satisfac cerința A (L10/1995) în toate grupările, utilizări <0,80. Vântul de succiune guvernează ancorajele (ridicare ~90 kN/stâlp). Pod rulant 8t → compresiune excentrică + oboseală cale rulare. Placa dimensionată **ambele cazuri** (A: 20 cm pe teren armată/fibrată; B: 25-30 cm pe goluri Ø20/150 2 direcții — grosime/armare mult mai mari fără reazem continuu; fundații punctuale sub rafturi grele recomandate). Zid de foc autostabil verificat (M 541 kNm/stâlp) + suprarezistență colaps. Fundații 2,0×2,0 (pmax 130 < 250). Execuție **EXC2** (SR EN 1090-2), control sudurilor VT 100%+UT/RT, pretensionare 10.9, certificate 3.1.

**Verificare tehnică** (Legea 10/1995, HG 925/1995) verificatori atestați MDLPA: **Af** (structură metalică, îmbinări, contravântuiri — obligatoriu), **A1** (fundații, cuzineți, placă, zid foc b.a.), **Ag** (geotehnic), **Ci** (scenariu securitate incendiu). Valabil pentru DTAC doar cu referatele Af/A1 favorabile + studiu geotehnic verificat Ag. Detalii (planșe armare/îmbinare, liste bare, caiet sarcini) la PTh+DE; valorile de amplasament (ag, Tc, sk, qb, pconv) se confirmă cu datele reale.
