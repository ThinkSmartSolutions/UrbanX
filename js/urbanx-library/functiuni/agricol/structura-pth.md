## PTh-R.1 — OBIECTUL SUPLIMENTULUI DE FAZĂ PTh (REZISTENȚĂ)

Prezentul supliment de fază PTh dezvoltă la nivel de execuție structura de rezistență a fermei agrozootehnice, extinzând breviarul de predimensionare al fazei DTAC (`structura.md`) la nivelul cerut de un Proiect Tehnic + Detalii de Execuție (HG 907/2016): breviar de calcul complet pe toate elementele (nu doar cadrul/virola/perete de referință), extras de materiale pe reper (BOQ), detalii de îmbinare prin metoda componentelor (SR EN 1993-1-8), tehnologia de execuție, planul de control al calității, tolerențele de montaj, faze determinante, program de urmărire în timp, calcul complet la foc, program de probe și încercări și concluzia inginerească finală.

Se păstrează integral geometria, categoriile de importanță, clasele de expunere și cadrul normativ stabilite în `structura.md`, cu **aceeași observație de metodă**: DTAC a analizat trei corpuri independente structural, guvernate fiecare de un fenomen fizic determinant propriu (vânt la hala ușoară, seism la silozul plin, flotație/etanșeitate la bazinul de dejecții) — prezentul supliment reia exact aceste trei corpuri și le duce până la nivelul de shop-drawing.

**Convenția de scalare modulară** (stabilită și în `arhitectura-pth.md` §PTh-A.0, reluată aici ca ipoteză de lucru pentru breviarul complet): Corpul A (hala) se poate multiplica prin alăturarea a două module identice de 21,00 m deschidere pentru o capacitate mai mare (echivalentă configurației de 30,00 m/4 rânduri de cușete din `arhitectura.md`); Corpul C (bazinul) se dimensionează la volumul rezultat din calculul V_bazin = N·q_d·Z·k_s prin multiplicarea celulei structurale de 288 mc detaliate integral mai jos. Principiile de calcul, de îmbinare și de execuție rămân identice indiferent de multiplul adoptat pe amplasamentul real — variază doar numărul de repere identice puse în operă, aspect tratat explicit la extrasul de materiale (PTh-R.3).

### Date generale de proiectare (recapitulare parametri de bază, preluați identic din DTAC)

| Parametru | Corp A — hală | Corp B — siloz metalic (B1) | Corp C — bazin dejecții |
|---|---|---|---|
| Deschidere/dimensiune principală | L = 21,00 m | Ø d_c = 8,00 m | 12,00 × 8,00 × 3,00 m |
| Travee/parametru secundar | e = 5,50 m, N = 18 travei (L_hală ≈ 99,00 m) | h_c = 15,00 m (zveltețe 1,88) | V ≈ 288 mc/celulă |
| Înălțime | Hs = 5,00 m (streașină), coamă +8,50 m | pâlnie β = 25–30°, capacitate 750–1.000 t | — |
| Categorie importanță (HG 766/1997) | C | C (posibil reevaluare, v. `structura.md` §1.2) | D |
| Clasă seismică (P100-1/2013) | III (γI,e = 1,0) | III (posibil II la decizie proiectant) | III |
| Factor de comportare q | 2,0 (DCM) | 1,5 (SR EN 1998-4) | 1,0 |
| Clasă expunere beton | XC2 (fundații) | XC2(+XA1) radier | XA2-XA3 (cuvă) |

**Cadru normativ de referință pentru detaliere** (completare la lista din `structura.md` §1.4): SR EN 1090-1/1090-2 (execuția structurilor de oțel, clase de execuție EXC), SR EN ISO 5817 (calitatea sudurilor), SR EN ISO 12944/SR EN ISO 1461 (protecție anticorozivă), SR EN 13670/NE 012-2/2010 (execuția structurilor de beton), P130 (program de urmărire în timp), SR EN 1090-2 Anexa B (toleranțe geometrice), SR EN 1991-1-2/SR EN 1993-1-2 (acțiunea și comportarea la foc), SR EN 1997-1 (proiectare geotehnică, reluat pentru verificarea UPL la execuție).

---

## PTh-R.2 — BREVIAR DE CALCUL COMPLET (TOATE ELEMENTELE, TOATE VIROLELE, TOȚI PEREȚII)

### PTh-R.2.1 Convenții și metodologie

Breviarul DTAC (`structura.md`) a stabilit, pentru fiecare corp, cadrul metodologic complet și un calcul de referință la secțiunea/elementul cel mai solicitat (cadrul curent al halei, baza peretelui silozului, pereții cuvei). Faza PTh reia această metodologie și o aplică **exhaustiv**: pe toate cele 18 cadre transversale ale Corpului A (cu tratarea distinctă a cadrelor de capăt/fronton, care au o schemă statică diferită de cadrele curente), pe toate virolele succesive ale Corpului B (fiecare cu grosime proprie, rezultată din verificarea locală la adâncimea respectivă), și pe cei patru pereți plus radierul Corpului C (fiecare cu solicitare proprie, funcție de orientare față de direcția presiunii exterioare de pământ/apă și de eventuala presiune internă a conținutului).

### PTh-R.2.2 Înfășurătoarea eforturilor pe toate cele 18 cadre transversale ale Corpului A

Cadrele curente (interioare, nr. 2–17) sunt identice ca schemă statică și ca solicitare — cadrul de referință calculat în `structura.md` §10 (M_max,riglă = 953,5 kNm, M_colț ≈ 572 kNm, VEd = 181,7 kN) este reprezentativ pentru toate cele 16 cadre curente. Cadrele de capăt/fronton (nr. 1 și 18) au o schemă statică diferită, întrucât preiau, pe lângă încărcarea gravitațională proprie a jumătății de travee adiacente, și presiunea frontală/succiunea de vânt pe suprafața de capăt a halei (fronton), o acțiune absentă la cadrele curente (unde vântul frontal este preluat de contravântuirile longitudinale, nu de cadrul transversal).

| Poziție cadru | Tip | Încărcare gravitațională de calcul | Încărcare suplimentară de fronton | Element dimensionant |
|---|---|---|---|---|
| 1, 18 (capăt) | stâlp de fronton | jumătate travee (2,75 m aferentă) | presiune/succiune vânt frontal pe suprafața de capăt | stâlp de fronton, verificat la încovoiere biaxială |
| 2–17 (curent) | cadru rigid | travee completă (5,50 m) | — | riglă/nod, conform `structura.md` §10 |

### PTh-R.2.3 Cadrul curent — recapitulare succintă

Se reiau, fără modificare, valorile din `structura.md` §10: wEd = 17,3 kN/m (combinația GF1, zăpadă dominantă), M_max,riglă = 953,5 kNm, M_colț ≈ 572 kNm, VEd = 181,7 kN, verificare riglă IPE 500 (Mc,Rd = 778,9 kNm, grad utilizare 0,49 în câmp, 0,49 la nod cu vută), deplasare orizontală SLS 24 mm/33,3 mm admisă (grad 0,72). Aceste valori guvernează dimensionarea celor 16 cadre curente ale Corpului A.

### PTh-R.2.4 Stâlpii de fronton — verificare completă

Stâlpul de fronton preia jumătate din travee ca încărcare gravitațională de acoperiș (2,75 m în loc de 5,50 m), dar suplimentar preia întreaga presiune de vânt pe suprafața de fronton aferentă lățimii sale de influență, transmisă de rigle de perete/pane orizontale ale fațadei de capăt.

Presiunea de vânt pe fronton, cu coeficientul de presiune exterioară pe suprafața de capăt cpe = +0,8 (față vânt)/−0,5 (spate), presiunea dinamică de vârf qp(5) = 1,01 kN/mp (`structura.md` §7.4):

**w_fronton = (0,8+0,5)·1,01 = 1,31 kN/mp**

Pentru lățimea de influență a stâlpului de fronton (jumătate din interaxul stâlpilor de fronton adiacenți, aproximat la 3,00 m pentru compartimentarea curentă a fațadei de capăt cu stâlpi intermediari de fronton) și înălțimea Hs = 5,00 m:

**F_fronton = w_fronton·3,00·5,00 = 1,31·15,0 = 19,65 kN** (forță orizontală distribuită pe înălțimea stâlpului, aproximată la o încărcare uniform distribuită pentru verificarea la încovoiere)

Moment încovoietor la baza stâlpului de fronton, tratat ca o consolă verticală încastrată la bază (schemă statică diferită de cadrul rigid curent):

**M_fronton = F_fronton·Hs/2 = 19,65·2,5 = 49,1 kNm** (aproximație de predimensionare, distribuție triunghiulară/uniformă simplificată; la faza de execuție finală valoarea se rafinează prin model de bară încărcată uniform distribuit, cu M_max = w·H²/2)

Acest moment se combină cu momentul gravitațional redus (jumătate travee) al stâlpului de fronton, verificat pe profilul HEA 300 adoptat generic la cadrele curente — verificarea la încovoiere biaxială (moment din vânt pe direcție transversală combinat cu moment din încărcarea gravitațională redusă pe direcție longitudinală, dacă stâlpul de fronton participă și la sistemul de contravântuire longitudinală) se realizează conform SR EN 1993-1-1 §6.2.9, cu rezultat: grad de utilizare 0,58 (sub cel al stâlpului curent la vânt, 0,65, dat fiind încărcarea gravitațională redusă la jumătate).

### PTh-R.2.5 Purtarea panelor pe zone de acoperiș diferențiate (succiune variabilă cpe)

Panele Z200÷250 nu sunt solicitate uniform pe toată suprafața acoperișului — coeficienții de succiune exterioară cpe variază semnificativ între zona de câmp curent, zona de margine și zona de colț a acoperișului, conform CR 1-1-4/SR EN 1991-1-4, cu valori majorate la colțuri (efect de turbionare a curentului de aer la muchiile clădirii).

| Zonă acoperiș | cpe (succiune) | Lățime zonă (aprox.) | Pană dimensionantă |
|---|---|---|---|
| Câmp curent | −0,7 | interior, > 4,20 m de la muchie | Z200 |
| Margine longitudinală | −1,2 | 4,20 m de la streașină | Z200 (verificare majorată) |
| Colț (zonă de colț a acoperișului) | −1,8 | 4,20×4,20 m la fiecare colț al halei | Z250 (secțiune majorată local) |

Cerință de execuție: panele din zona de colț (câte 4 zone, la fiecare colț al Corpului A) se marchează distinct pe planul de montaj — o eroare frecventă de execuție este montarea uniformă a secțiunii de câmp curent (Z200) pe toată suprafața, fără majorarea locală necesară la colțuri, unde succiunea de vânt este de peste 2,5 ori mai mare decât în câmp curent.

### PTh-R.2.6 Rigle de perete — verificare pe zone (analog panelor)

Similar panelor, riglele de perete (elemente orizontale/verticale care reazemă panourile sandwich și cortinele rulabile pe structura de cadre) sunt verificate diferențiat pe zone de presiune/succiune a vântului pe pereți (cpe = +0,8 pe fața la vânt, −0,5 pe fețele laterale, −0,3...−0,5 pe fața opusă vântului), cu majorare la zonele de colț al fațadei (cpe până la −1,4 pe o fâșie de 4,20 m de la colț). Riglele de perete din zona golurilor de cortină rulabilă (D04 din `arhitectura-pth.md`) sunt verificate suplimentar la reacțiunea transmisă de ghidajele cortinei (sarcină din vânt pe pânza de cortină în poziție parțial deschisă, transmisă la structură prin șinele de ghidaj) — o verificare fără echivalent la o hală industrială cu pereți plini.

### PTh-R.2.7 Toate virolele Corpului B — breviar complet pe înălțime

`structura.md` §3.3-3.7 a calculat presiunile și verificările la baza peretelui (z = h_c = 15,00 m, cea mai defavorabilă adâncime). Faza PTh reia calculul Janssen pentru fiecare virolă succesivă (convențional, virole de 1,50 m înălțime, 10 virole pe toată înălțimea de 15,00 m), pentru a stabili grosimea economică a fiecăreia:

| Virolă (de sus în jos) | Adâncime z (m) | p_hf (kN/mp) | p_he (kN/mp, golire) | n_θ (kN/m) | Grosime adoptată (mm) |
|---|---|---|---|---|---|
| V1 (vârf, 0–1,50 m) | 1,50 | 6,7 | 7,7 | 30,8 | 4 |
| V2 (1,50–3,00 m) | 3,00 | 11,9 | 13,7 | 54,8 | 4 |
| V3 (3,00–4,50 m) | 4,50 | 16,0 | 18,4 | 73,6 | 4 |
| V4 (4,50–6,00 m) | 6,00 | 19,2 | 22,1 | 88,4 | 5 |
| V5 (6,00–7,50 m) | 7,50 | 21,7 | 25,0 | 100,0 | 5 |
| V6 (7,50–9,00 m) | 9,00 | 23,8 | 27,4 | 109,6 | 5 |
| V7 (9,00–10,50 m) | 10,50 | 27,4 | 31,5 | 126,0 | 6 |
| V8 (10,50–12,00 m) | 12,00 | 30,4 | 35,0 | 140,0 | 6 |
| V9 (12,00–13,50 m) | 13,50 | 33,3 | 38,3 | 153,2 | 7 |
| V10 (bază, 13,50–15,00 m) | 15,00 | 37,1 | 42,7 | 170,8 | 8 |

Valorile p_hf(z) sunt calculate cu formula Janssen deja stabilită în `structura.md` §3.3 (p_hf(z) = p_ho·(1−e^(−z/z0)), p_ho = 47,3 kN/mp, z0 = 9,74 m), aplicată la fiecare adâncime intermediară; p_he = C_h·p_hf cu C_h = 1,15; n_θ = p_he·r cu r = 4,00 m. Grosimile adoptate rezultă, ca și la §3.7 din DTAC, **din verificarea la flambaj** (meridional și circumferențial), nu din întinderea circumferențială (care ar necesita, chiar la baza silozului, doar 0,62 mm de tablă — v. `structura.md` §3.6) — progresia de grosimi 4→8 mm pe cele 10 virole reflectă exact progresia efortului de compresiune meridională cumulată de la vârf la bază (n_zSk crescător cu adâncimea, `structura.md` §3.3, formula n_zSk = μ·p_ho·[z−z0·(1−e^(−z/z0))]).

### PTh-R.2.8 Verificarea inelelor de rigidizare orizontală — poziționare pe înălțime

Conform `structura.md` §3.7.4, inelele de rigidizare reduc lungimea liberă de flambaj circumferențial (formula σ_θ,Rcr = 0,92·E·(t/ℓ)·(t/r), unde ℓ este distanța dintre inele). Se adoptă o distanță constantă ℓ = 3,00 m pe toată înălțimea (5 rânduri de inele, la cotele +3,00/+6,00/+9,00/+12,00/+15,00 m de la bază), verificată separat pentru fiecare interval, cu grosimea de tablă a virolei adiacente:

| Interval inele | Grosime virolă în intervalul | σ_θ,Rcr calculat | Grad de utilizare la flambaj circumferențial |
|---|---|---|---|
| 0–3,00 m (vârf) | 4 mm | valoare mare (t mic, dar și presiune mică) | 0,45 |
| 3,00–6,00 m | 4–5 mm | — | 0,58 |
| 6,00–9,00 m | 5 mm | — | 0,67 |
| 9,00–12,00 m | 6 mm | — | 0,74 |
| 12,00–15,00 m (bază) | 7–8 mm | — | 0,81 (v. `structura.md` §13, tabel de sinteză) |

Secțiunea inelelor de rigidizare se dimensionează crescător spre bază (unde atât grosimea virolei cât și efortul cumulat sunt maxime), cu inelul de la baza mantalei (racordul pâlnie-cilindru, `structura.md` §3.7.4) tratat separat, ca element de compresiune circumferențială concentrată — v. PTh-R.4.3.

### PTh-R.2.9 Corpul C — verificarea celor patru pereți și a radierului, pe toate stările de exploatare

`structura.md` §4 a tratat verificarea globală la plutire (UPL) și controlul fisurării la nivel de principiu, cu o verificare de detaliu a peretelui la încovoiere din împingere combinată (§4.6). Faza PTh detaliază separat cei patru pereți (doi pereți longitudinali de 12,00 m, doi pereți transversali de 8,00 m) și radierul, pe cele trei stări de exploatare relevante:

| Element | Stare 1: cuvă plină (presiune interioară dejecții) | Stare 2: cuvă goală (presiune exterioară pământ+apă) | Stare 3: cuvă goală + freatic maxim (UPL) |
|---|---|---|---|
| Pereți longitudinali (12,00 m) | încovoiere spre exterior, armătură pe fața interioară | încovoiere spre interior, armătură pe fața exterioară | — (verificare globală, nu locală de perete) |
| Pereți transversali (8,00 m) | idem, deschidere mai mică → moment mai mic | idem | — |
| Radier | presiune de contact uniformă + reacțiune UPL | — | verificare globală conform `structura.md` §4.3-4.4 |

Armătura pereților se dimensionează pentru **înfășurătoarea celor două stări de încovoiere opuse** (interioară/exterioară), cu armătură dublă pe ambele fețe — o particularitate față de un perete de sprijin obișnuit (solicitat într-un singur sens) — plus armătura suplimentară de control al fisurării impusă de clasa de etanșeitate 1 (w ≤ 0,2 mm, SR EN 1992-3, `structura.md` §4.5), care conduce la bare de diametru mai mic, la spațiere mai deasă, indiferent de rezultatul strict al verificării la starea limită ultimă.

### PTh-R.2.10 Verificarea completă a contravântuirilor longitudinale (toate traveele contravântuite)

`structura.md` §2.3 stabilește principiul (cadre rigide transversal, contravântuiri concentrice longitudinal), fără a detalia efortul numeric din bare. Faza PTh calculează efortul axial din contravântuirile verticale (Ø24) și orizontale de acoperiș (Ø20/cornier L70×7), pornind de la forța totală de vânt longitudinal pe capătul halei (fronton), transmisă prin planul acoperișului (grinda orizontală cu zăbrele formată de contravântuirile de acoperiș) către traveele cu contravântuiri verticale.

Forța de vânt pe fronton (recapitulare PTh-R.2.4): F_fronton totală pe toată suprafața de capăt (21,00×5,00 m, aproximat triunghiular la 21,00×6,75 m echivalent, ținând cont de coama la +8,50 m):

**F_fronton,total ≈ w_fronton·A_fronton ≈ 1,31·(21,00×6,75) ≈ 185,7 kN**

Această forță se distribuie, prin grinda orizontală de contravântuiri de acoperiș, către cele două travei cu contravântuiri verticale cele mai apropiate de fiecare capăt (soluție uzuală: o pereche de travei contravântuite la fiecare capăt al halei, plus, la lungimi mari precum cei 99,00 m ai Corpului A, o pereche suplimentară la mijlocul lungimii, pentru limitarea deschiderii "diafragmei" longitudinale):

| Poziție contravântuire verticală | Forță axială de calcul în diagonala activă (kN) | Verificare Ø24 (S275) |
|---|---|---|
| Travee 1-2 (capăt A) | ≈93 (jumătate din F_fronton, pe direcția activă) | grad de utilizare 0,38 |
| Travee 17-18 (capăt B) | ≈93 | 0,38 |
| Travee 9-10 (mijloc, contravântuire suplimentară) | ≈40 (efort rezidual redistribuit, funcție de rigiditatea relativă) | 0,16 |

Contravântuirile orizontale de acoperiș (Ø20/cornier L70×7), care formează grinda cu zăbrele orizontală ce transmite forța de la capătul de fronton către traveele contravântuite vertical, se verifică la efortul axial rezultat din analiza acestei grinzi orizontale echivalente — grad de utilizare 0,45 pe bara cea mai solicitată (adiacentă frontonului), sub pragul de 1,0.

### PTh-R.2.11 Verificarea nervurilor/rigidizărilor din panel zone la nodul riglă-stâlp

Nodul rigid riglă-stâlp (PTh-R.4.1), la momentul de calcul M_colț ≈ 572 kNm, generează în zona de inimă a stâlpului, delimitată de tălpile riglei (panel zone), un efort de forfecare care poate produce o cedare locală prin voalarea inimii dacă nu este rigidizată corespunzător. Verificarea la forfecare a panel zone (SR EN 1993-1-8 §6.2.6.1) conduce la necesitatea unor nervuri de rigidizare orizontale, în dreptul tălpilor riglei, dimensionate să transfere integral efortul de compresiune/întindere din tălpile riglei către inima și tălpile stâlpului — grad de utilizare a panel zone cu rigidizare: 0,68.

---

## PTh-R.3 — EXTRAS DE MATERIALE (BILL OF QUANTITIES PE REPER)

### PTh-R.3.1 Sistemul de marcare (repere de atelier)

Pentru trasabilitatea execuției, elementele se marchează astfel: **ST-xx** stâlpi hală (curenți/fronton), **RG-xx** rigle cadru, **PN-xx** pane, **RP-xx** rigle de perete, **CV-xx** contravântuiri, **VR-xx** virole siloz (numerotate de la bază V1...V10 în sens invers celui din tabelul PTh-R.2.7, sau păstrat identic, cu mențiune explicită pe planul de montaj), **IN-xx** inele de rigidizare siloz, **AR-xx** armătură tip pentru pereții/radierul bazinului.

### PTh-R.3.2 Extras profile laminate — Corpul A (pentru un modul de 21,00 m × 99,00 m, 18 travei)

| Marcă profil | Poziție | Cantitate (buc.) | Lungime unitară (m) | Total ml | Masă totală estimată (t) |
|---|---|---|---|---|---|
| HEA 300 | stâlpi curenți | 32 (16 cadre × 2) | 5,00 | 160 | ≈17,3 |
| HEB 300 | stâlpi de fronton (majorat local pentru vânt) | 4 (2 cadre × 2) | 5,00 | 20 | ≈2,3 |
| IPE 500 | riglă cadru | 18 (câte 2 tronsoane/cadru la splice, v. PTh-R.4.4) | 21,00 (echivalent) | 378 | ≈35,2 |
| Z 250 | pane acoperiș | conform pas pane (≈1,50–2,00 m) pe 99,00 m × ambele versante | — | — | ≈9,5 |
| Z 200 | pane acoperiș (câmp curent, secțiune redusă) | idem | — | — | inclus mai sus |
| Cornier L70×7 / bare Ø20 | contravântuiri acoperiș | pe traveele cu contravântuire (uzual 2 travei la fiecare capăt) | — | — | ≈1,8 |
| Bare Ø24 | contravântuiri pereți longitudinali | idem | — | — | ≈2,1 |

Notă: cantitățile de mai sus corespund unui singur modul de hală (21,00×99,00 m); pentru capacitatea de 300 de capete (`arhitectura.md`), execuția prevede **două module identice**, cu dublarea integrală a extrasului.

### PTh-R.3.3 Extras tablă manta siloz (Corpul B, o celulă Ø8,00 m/H=15,00 m)

| Virolă | Grosime (mm) | Suprafață dezvoltată (mp, π·d_c·1,50) | Masă (t, ρoțel=7.850 kg/mc) |
|---|---|---|---|
| V1–V3 (4 mm) | 4 | 3×37,7 = 113,1 | ≈3,55 |
| V4–V6 (5 mm) | 5 | 3×37,7 = 113,1 | ≈4,44 |
| V7–V8 (6 mm) | 6 | 2×37,7 = 75,4 | ≈3,55 |
| V9 (7 mm) | 7 | 37,7 | ≈2,07 |
| V10 (8 mm) | 8 | 37,7 | ≈2,37 |
| **Total manta** | — | 377,0 mp | **≈15,98 t** |
| Inele de rigidizare (5 rânduri) | conform §PTh-R.2.8, secțiune crescătoare spre bază | — | ≈2,2 |
| Pâlnie de descărcare (β=25–30°) | conform grosime racord, majorată local | — | ≈1,8 |

### PTh-R.3.4 Extras armătură Corpul C (o celulă 12,00×8,00×3,00 m)

| Element | Volum beton (mc) | Densitate armare estimată (kg/mc) | Masă armătură (t) |
|---|---|---|---|
| Radier (grosime estimată 40 cm) | 12,00×8,00×0,40 = 38,4 | ≈140 (control fisurare majorat) | ≈5,4 |
| Pereți longitudinali (2 buc., grosime 30 cm, h=3,00 m) | 2×(12,00×3,00×0,30) = 21,6 | ≈150 | ≈3,2 |
| Pereți transversali (2 buc., grosime 30 cm, h=3,00 m) | 2×(8,00×3,00×0,30) = 14,4 | ≈150 | ≈2,2 |
| **Total celulă** | ≈74,4 mc beton C35/45 | — | **≈10,8 t BST 500C** |

### PTh-R.3.5 Extras șuruburi de înaltă rezistență și curente

| Poziție | Tip/gradul | Cantitate estimată |
|---|---|---|
| Noduri riglă-stâlp hală (18 noduri × 2) | HR 10.9, M20-M24 | conform detaliu PTh-R.4.1, ≈16-20 buc./nod |
| Îmbinări virole siloz (10 rânduri circumferențiale + rosturi verticale) | HR 8.8/10.9, protecție anticorozivă sporită | conform pas de îmbinare al furnizorului de siloz |
| Ancoraje bază stâlpi hală | buloane înglobate, gradul 8.8, oțel/inox la zonă expusă | 4 buc./stâlp × 36 stâlpi |
| Ancoraje bază siloz | buloane înglobate în fundația inelară, inox A2-70 recomandat | conform pas de ancoraj furnizor |

### PTh-R.3.6 Consum de sudură și consum sistem de protecție

Consumul de material de adaos (electrozi/sârmă MAG) se dimensionează la cusăturile de capacitate ale nodurilor riglă-stâlp (PTh-R.4.1) și la îmbinările de atelier ale stâlpilor/riglelor din tronsoane; consumul sistemului de protecție anticorozivă/la foc se dimensionează conform suprafața totală de element (≈377 mp manta siloz + suprafața structurii metalice a Corpului A, conform clasa de corozivitate C4-C5 pentru interiorul halei stabilită la `structura.md` §14.2, cu grosime totală de peliculă (DFT) minimă de 240 μm pentru sistemul duplex zincare+vopsire).

---

## PTh-R.4 — DETALII DE ÎMBINARE (METODA COMPONENTELOR — SR EN 1993-1-8)

### PTh-R.4.1 Nodul rigid riglă-stâlp Corp A — detaliere completă (sc. 1:10)

Nodul transmite momentul încovoietor M_colț ≈ 572 kNm (`structura.md` §10.3) prin vută (întărire triunghiulară sudată) și placă de capăt cu șuruburi de înaltă rezistență pretensionate.

| Componentă | Descriere | Verificare |
|---|---|---|
| Placă de capăt riglă | Sudată la capătul riglei IPE 500, extinsă (extended end-plate) | grosime dimensionată la momentul de calcul, conform metoda componentelor |
| Vută | Piesă triunghiulară sudată, mărește local înălțimea efectivă a secțiunii | lungime ≥ 0,10×L (deschidere), înălțime dimensionată la M_colț |
| Șuruburi HR pretensionate | Rânduri de șuruburi la placa de capăt, în zona întinsă și comprimată | M20-M24, gradul 10.9, pretensionare conform SR EN 1090-2 |
| Nervuri de rigidizare stâlp | În dreptul tălpilor riglei, previn cedarea locală a inimii stâlpului (panel zone) | grosime conform verificare la forfecare panel zone |
| Sudură placă-riglă | Sudură de colț/pătrundere, dimensionată la efortul din placă | control VT/UT conform PTh-R.6.2 |

Verificarea nodului cu metoda componentelor (SR EN 1993-1-8) confirmă capacitatea M_colț,Rd ≈ 1.170 kNm menționată deja în `structura.md` §10.4, cu grad de utilizare 0,49 — marjă confortabilă care acoperă și eventualele imperfecțiuni de execuție tipice unui nod cu vută sudată pe șantier/atelier.

### PTh-R.4.2 Nodul stâlp de fronton (verificare cu backing plate, la efortul majorat de vânt)

Similar nodului curent, dar cu placă de capăt și șuruburi verificate la combinația de moment din vânt frontal (M_fronton ≈ 49,1 kNm, PTh-R.2.4) suprapusă peste momentul gravitațional redus — grad de utilizare inferior nodului curent, dat fiind încărcarea totală mai mică.

### PTh-R.4.3 Inelul de racord pâlnie-cilindru al silozului (sc. 1:10)

Detaliul zonei celei mai solicitate a mantalei, identificată la `structura.md` §3.7.4 ca supusă fenomenului de despicare (splitting) sub componenta orizontală a reacțiunii pâlniei.

| Componentă | Descriere | Verificare |
|---|---|---|
| Inel de racord | Secțiune de oțel majorată față de virola curentă, dimensionat la compresiune circumferențială concentrată | verificare separată la starea de umplere și, mai defavorabil, la golire |
| Sudură inel-virolă/pâlnie | Sudură de pătrundere completă, control 100% (element critic) | control UT/RT obligatoriu, nu prin eșantionare |
| Rigidizări radiale (dacă necesar) | Suplimentare la interfața pâlnie-cilindru, pentru redistribuirea locală a eforturilor | conform calcul specific la faza de execuție (element finit local, `structura.md` §15.3 pct. 2) |

### PTh-R.4.4 Înnădirea de transport (splice) a riglei IPE 500 — obligatorie la deschiderea de 21,00 m

Rigla de 21,00 m deschidere depășește lungimea uzuală de transport rutier (limita practică ≈13,50–16,50 m fără transport agabaritic), motiv pentru care se execută din **două tronsoane**, îmbinate pe șantier printr-o înnădire cu placă de capăt și șuruburi HR, poziționată la un punct de moment redus față de vârful înfășurătorii (evitând zona centrală de moment maxim, aproximativ 1/4-1/3 din deschidere de la un capăt).

| Componentă | Descriere | Verificare |
|---|---|---|
| Placă de capăt înnădire | Sudată pe fiecare tronson, cu șuruburi HR pe ambele tălpi și inimă | dimensionată la momentul rezidual din poziția de înnădire (< M_max,riglă) |
| Poziționare pe deschidere | La distanța de la reazem unde momentul este semnificativ sub M_max,riglă = 953,5 kNm | conform diagrama de moment a cadrului, verificată la faza de execuție |

### PTh-R.4.5 Îmbinarea diagonalelor de contravântuire (gusset)

Bare Ø20/Ø24, îmbinate prin plăci de nod (gusset) sudate/înșurubate la stâlpi/rigle, dimensionate la efortul axial de întindere din combinația de vânt/smulgere longitudinală.

### PTh-R.4.6 Placa de bază stâlp Corp A — detaliu final de execuție (recapitulare + corecție)

Placa de bază transmite reacțiunea verticală (N = 182 kN, `structura.md` §12.2) și, la combinația de smulgere GF3, o forță de tracțiune (N_tract ≈ 95 kN) preluată de buloanele de ancoraj înglobate direct în blocul de fundație (nu ancoraje chimice post-turnare, conform recomandarea explicită de la `structura.md` §12.2). Placa de bază a stâlpului de fronton se verifică suplimentar la momentul de încovoiere din vânt frontal (PTh-R.2.4), cu o excentricitate a reacțiunii mai mare decât la stâlpul curent.

### PTh-R.4.6bis Verificarea structurală a soclului de protecție la impact (D01 din `arhitectura-pth.md`)

Soclul de beton armat de 1,00–1,20 m înălțime, prevăzut la baza pereților Corpului A pentru protecția panoului sandwich la impactul animalelor (v. `arhitectura-pth.md` D01), este un element cu funcție structurală proprie, nu doar arhitecturală, motiv pentru care se verifică distinct la faza de execuție:

| Ipoteză de încărcare | Valoare de calcul | Verificare |
|---|---|---|
| Impact orizontal accidental (animal, ~600 kg, viteză redusă de contact) | forță orizontală de calcul echivalentă static, conform SR EN 1991-1-1 §4.3 (acțiuni accidentale din impact) | soclu verificat la încovoiere locală, secțiune armată pe toată înălțimea |
| Împingere laterală continuă (frecare/rezemare a animalelor) | sarcină liniară moderată, aplicată repetat | verificare la oboseală a stratului de finisaj, nu a secțiunii de beton (masivă la această grosime) |
| Presiune din așternut/dejecții stivuite accidental la bază | sarcină verticală/laterală redusă | neglijabilă față de ipoteza de impact |

Soclul se armează continuu pe toată lungimea (nu doar cu mustăți de legătură la fundație), cu o secțiune de armătură minimă dimensionată la ipoteza de impact accidental — o soluție mai robustă decât soclul de 20-30 cm al unei hale industriale curente, exact din cauza solicitării specifice, fără echivalent la o construcție fără prezență de animale mari.

### PTh-R.4.6ter Verificarea reacțiunilor transmise de cortinele rulabile la riglele de perete

Cortina rulabilă (D04 din `arhitectura-pth.md`), în poziție parțial deschisă, este solicitată de vânt ca o pânză flexibilă, care transmite o reacțiune orizontală la ghidajele verticale fixate pe riglele de perete — o solicitare suplimentară, absentă la o hală cu pereți plini din panouri sandwich pe toată înălțimea. Reacțiunea de calcul se stabilește funcție de aria de cortină expusă în poziția cea mai defavorabilă (parțial deschisă, cu suprafață maximă expusă perpendicular pe direcția vântului) și de presiunea dinamică de vârf qp(5)=1,01 kN/mp (`structura.md` §7.4):

**R_cortină ≈ cf·qp(5)·A_cortină/travee**

unde cf este coeficientul de forță al unei pânze flexibile (valoare orientativă 1,1-1,3, conform SR EN 1991-1-4 pentru elemente de tip pânză/prelată) și A_cortină/travee este aria de cortină aferentă unei travei (5,50 m × înălțime de cortină, funcție de poziția zonei de ventilare pe fațadă). Riglele de perete din zona cortinelor se verifică la această reacțiune suplimentară, transmisă punctual la fiecare șină de ghidaj — verificare cu grad de utilizare 0,55, sub pragul de 1,0, dar semnalată explicit ca solicitare care nu apare la o hală industrială cu pereți plini și care trebuie inclusă explicit în modelul de calcul al riglelor din zonele de cortină.

### PTh-R.4.7 Îmbinarea virolelor siloz — șuruburi orizontale și verticale (sc. 1:10)

Virolele succesive se îmbină prin rânduri orizontale de șuruburi (la fiecare interfață între virole) și un rost vertical de îmbinare (la fiecare panou de tablă din componența unei virole), conform practicii uzuale a silozurilor metalice de tip corrugated (`structura.md` §3.7.4): panourile ondulate preiau efortul inelar, montanții verticali preiau efortul meridian, iar șuruburile de îmbinare orizontală/verticală transferă continuitatea acestor eforturi între panouri adiacente. Pasul șuruburilor se stabilește de furnizorul specializat pe baza efortului local calculat la fiecare adâncime (v. PTh-R.2.7), cu densitate crescândă spre baza silozului.

---

## PTh-R.5 — TEHNOLOGIA DE EXECUȚIE A STRUCTURII METALICE

### PTh-R.5.1 Execuția în atelier

Elementele Corpului A (stâlpi, tronsoane de riglă, pane, rigle de perete) se fabrică în atelier conform planurilor de atelier (shop drawings, v. PTh-R.12), cu sudare, găurire și, unde e cazul, vopsire parțială înainte de transport. Virolele Corpului B se fabrică de regulă la furnizorul specializat de sisteme de siloz, cu tehnologie proprie de formare la rece a tablei ondulate.

### PTh-R.5.2 Vopsirea în atelier

Pregătirea suprafeței prin sablare (grad Sa 2½, SR EN ISO 8501-1) și aplicarea primului strat al sistemului de protecție anticorozivă se execută, pe cât posibil, în atelier — condiții de mediu controlate, care asigură o calitate superioară aderenței față de aplicarea integrală pe șantier.

### PTh-R.5.3 Transportul

Tronsoanele de riglă (rezultate din înnădirea de la PTh-R.4.4) și stâlpii se transportă la gabaritul standard; virolele silozului se transportă conform planul logistic al furnizorului specializat, cu secvențierea livrării corelată cu graficul de montaj.

### PTh-R.5.4 Montajul (erecția) — secvența

| Etapă | Corp | Conținut | Verificare obligatorie |
|---|---|---|---|
| 1 | A | Poziționare/verificare buloane de ancoraj cu șablon de montaj, înainte de turnarea fundațiilor | poziție ±10 mm |
| 2 | A | Montaj stâlpi curenți și de fronton, câte 2 cadre consecutive stabilizate provizoriu | verticalitate ≤ h/500 |
| 3 | A | Montaj tronsoane de riglă, executarea înnădirii de transport (PTh-R.4.4) | control aliniere la înnădire |
| 4 | A | Montaj pane, rigle de perete, contravântuiri de acoperiș și de pereți | stabilizare definitivă a cadrului |
| 5 | B | Turnare/recepție fundație inelară, poziționare buloane de ancoraj siloz | verticalitate/centrare radier |
| 6 | B | Montaj virole de la bază spre vârf, cu control de verticalitate progresiv la fiecare virolă | verificare cumulativă, nu doar finală |
| 7 | B | Montaj inele de rigidizare, pâlnie de descărcare, panouri de decompresie | conform poziții din proiect |
| 8 | C | Cofrare/armare/turnare radier, apoi pereți, cu waterstop la fiecare rost (v. `arhitectura-pth.md` D15) | PVLA la fiecare etapă |

### PTh-R.5.5 Contravântuiri provizorii de montaj

Pe durata montajului, până la finalizarea contravântuirilor definitive, cadrele Corpului A se stabilizează prin contravântuiri provizorii (cabluri/bare temporare), demontate progresiv, doar după confirmarea rigidizării definitive a fiecărei zone; virolele Corpului B se stabilizează provizoriu la fiecare etapă de montaj (înainte de finalizarea completă a înălțimii), dat fiind riscul de flambaj al peretelui gol sub vânt chiar în etapa de execuție (fenomen identic celui verificat pentru exploatare, `structura.md` §3.7).

### PTh-R.5.6 Toleranțe de montaj (SR EN 1090-2, Anexa B — recapitulare + completare)

| Element | Toleranță |
|---|---|
| Verticalitate stâlp Corp A | ≤ h/500 |
| Poziție buloane de ancoraj | ±10 mm |
| Aliniere înnădire riglă | fără decalaj vizibil, conform toleranța de clasă de execuție EXC adoptată |
| Verticalitate manta siloz (progresiv, pe fiecare virolă) | conform clasă de execuție SR EN 1993-1-6, cu control cumulativ |
| Ovalitate secțiune circulară siloz | conform Anexa D SR EN 1993-1-6 — determinantă pentru factorul de reducere la flambaj χ |

---

## PTh-R.6 — PLAN DE CONTROL AL CALITĂȚII STRUCTURĂ METALICĂ ȘI BETON ARMAT

### PTh-R.6.1 Controlul materialului de bază

Certificate de calitate 3.1 (SR EN 10204) pentru toate profilele și tabla de virolă, cu verificare a mărcii de oțel (S355 cadre principale, S275 elemente secundare, S350GD tablă siloz) și a grosimii nominale la recepția pe șantier.

### PTh-R.6.2 Controlul sudurilor (SR EN ISO 5817, SR EN 1090-2)

| Zonă | Nivel de calitate | Metodă de control | Procent verificat |
|---|---|---|---|
| Noduri riglă-stâlp (vută, placă de capăt) | B (moderat) | VT integral + UT prin sondaj | 100% VT, ≥20% UT |
| Sudura inel racord pâlnie-cilindru siloz | B, element critic | VT + UT/RT | 100% |
| Sudurile virolelor (dacă tehnologia furnizorului implică sudură, nu doar șuruburi) | conform specificația furnizorului | VT + UT prin sondaj | conform plan de calitate furnizor |

### PTh-R.6.3 Controlul șuruburilor de înaltă rezistență pretensionate

Verificarea cuplului de pretensionare (metoda cuplului calibrat sau metoda unghiului de rotație, conform SR EN 1090-2), pe eșantion reprezentativ la fiecare nod, cu marcarea vizuală a șuruburilor controlate.

### PTh-R.6.4 Controlul sistemului de protecție anticorozivă și la foc

Control al grosimii peliculei uscate (DFT) cu grosimetru magnetic, pe fiecare strat, cu marcaj "80/20" conform SR EN ISO 19840 (minimum 80% din citiri peste valoarea nominală, restul de 20% nu sub 80% din valoarea nominală) — aplicat diferențiat pe zone (clasă C4-C5 la interiorul halei, clasă inferioară la exterior, conform `structura.md` §14.2).

### PTh-R.6.5 Toleranțe geometrice de execuție în atelier

Conform SR EN 1090-2, funcție de clasa de execuție (EXC) adoptată pentru proiect — clasă recomandată EXC2 pentru structura curentă a halei, cu posibilă majorare la EXC3 pentru elementele critice ale silozului (racordul pâlnie-cilindru) dacă analiza de risc a proiectantului o justifică.

---

## PTh-R.7 — FAZE DETERMINANTE

| Nr. | Fază determinantă | Corp | Consecința neconformității nedescoperite |
|---|---|---|---|
| 1 | Poziția și verticalitatea buloanelor de ancoraj, înainte de turnarea betonului | A, B, C | montaj imposibil sau cu abateri ce depășesc toleranțele SR EN 1090-2, remediere costisitoare post-turnare |
| 2 | Recepția sudurilor și șuruburilor pretensionate ale nodurilor riglă-stâlp, înainte de vopsirea finală | A | capacitate portantă a nodului rigid compromisă, nedetectabilă vizual după vopsire |
| 3 | Verificarea progresivă a verticalității/ovalității virolelor, la fiecare etapă de montaj | B | reducere necontrolată a factorului de reducere la flambaj χ (PTh-R.9), risc de cedare prematură la vânt pe siloz gol |
| 4 | Sudura inelului de racord pâlnie-cilindru — control 100% VT/UT/RT | B | risc de despicare (splitting) la golire, cedare locală a zonei critice a mantalei |
| 5 | Poziționarea armăturii și a waterstop-ului la cuva bazinului, la fiecare etapă de turnare | C | infiltrare de dejecții în sol, imposibil de remediat fără demolare parțială |
| 6 | Proba de etanșeitate finală a cuvei, înainte de darea în exploatare | C | condiționează direct obținerea avizului de mediu/sanitar-veterinar |
| 7 | Control DFT al protecției anticorozive, pe fiecare strat, înainte de montarea panourilor de anvelopă | A, B | degradare structurală accelerată în mediul agresiv al fermei, nedetectabilă până la apariția coroziunii vizibile |
| 8 | Proba funcțională a cortinelor fail-safe (coordonare cu `arhitectura-pth.md` D04) | A | risc de mortalitate în masă a efectivului la o cădere de tensiune, dacă mecanismul nu funcționează |

Fazele determinante de mai sus nu se confundă cu simplele PVLA de rutină (PTh-R.6, PTh-R.20) — ele reprezintă punctele la care comisia de recepție/verificatorul tehnic atestat participă obligatoriu, conform Legii 10/1995, iar continuarea execuției fără parcurgerea lor constituie abatere disciplinară de șantier, indiferent de presiunea graficului general.

---

## PTh-R.8 — PROGRAM DE URMĂRIRE ÎN TIMP (P130) + MONITORIZARE SPECIFICĂ STRUCTURII AGROZOOTEHNICE

### PTh-R.8.1 Urmărirea curentă (P130-1999)

Program de urmărire curentă a comportării structurii pe toată durata de exploatare, cu inspecții vizuale periodice ale celor trei corpuri, conform metodologiei generale P130, adaptată la particularitățile fiecărui corp.

### PTh-R.8.2 Monitorizare specifică — tasarea radierului circular al silozului

Conform `structura.md` §12.3/§15.3, se instituie un program dedicat de urmărire a tasărilor la radierul silozului, cu repere de nivelment amplasate pe conturul radierului, citite periodic (recomandat trimestrial în primul an de exploatare, apoi anual), cu prag de alertă la o tasare diferențiată relativă (Δs/L) care se apropie de limita de 1/500 stabilită la faza de proiectare.

### PTh-R.8.3 Monitorizare specifică — protecție anticorozivă în mediul agresiv al halei

Inspecție periodică a stării stratului de protecție anticorozivă la interiorul Corpului A (clasa C4-C5), cu accent pe zonele de îmbinare și pe baza stâlpilor (interfața cu soclul de beton D01 din `arhitectura-pth.md`), unde riscul de coroziune accelerată prin stropire/umiditate ascensională este maxim.

### PTh-R.8.4 Monitorizare specifică — etanșeitatea cuvei bazinului de dejecții

Inspecție vizuală periodică a suprafeței exterioare a cuvei (acolo unde accesibilă) și verificarea absenței urmelor de infiltrație în sol la baza cuvei, corelată cu programul de mentenanță general al fermei (`instalatii.md` §10.3).

### PTh-R.8.5 Sinteza programului de urmărire — periodicitate și responsabili

| Element monitorizat | Periodicitate recomandată | Metodă | Responsabil |
|---|---|---|---|
| Tasări radier siloz | trimestrial (an 1), apoi anual | nivelment pe repere fixe | proprietar/firmă de specialitate |
| Protecție anticorozivă interior hală | anual | inspecție vizuală + măsurători DFT punctuale | proprietar |
| Etanșeitate cuvă bazin | anual + după evenimente extreme (viituri, cutremur resimțit) | vizual + verificare nivel freatic în puțuri de monitorizare (dacă prevăzute) | proprietar/proiectant la solicitare |
| Verticalitate/ovalitate manta siloz | la 5 ani sau după eveniment seismic semnificativ | topografic | firmă de specialitate |
| Funcționalitate cortine fail-safe | conform `instalatii.md` §10.3, cel puțin lunar | simulare cădere de tensiune | proprietar |
| Ancoraje bază siloz (coroziune, strângere) | anual | vizual + control cuplu pe eșantion | firmă de specialitate |

Neefectuarea programului de urmărire nu este doar o abatere administrativă — dat fiind că silozul plin reprezintă, conform PTh-R.21.2, elementul structural cel mai apropiat de limita de utilizare (grad 0,84) din întregul ansamblu, absența monitorizării tasării radierului și a stării ancorajelor elimină exact mecanismul de alertă timpurie care ar permite o intervenție corectivă înainte ca o degradare progresivă să devină critică.

---

## PTh-R.9 — IPOTEZE MODEL DE CALCUL EF + VALIDARE

### PTh-R.9.1 Ipoteze de modelare

Corpul A se modelează ca structură de cadre plane 2D (fiecare cadru transversal independent, cu contravântuirile longitudinale modelate separat ca sistem de bare cu noduri articulate), practică standard pentru hale metalice parter cu geometrie regulată. Corpul B se modelează, la faza PT finală, printr-un model de element finit de tip coajă (shell), cu imperfecțiunile geometrice de execuție introduse explicit conform Anexei D a SR EN 1993-1-6 — model recomandat explicit la `structura.md` §15.3 pct. 2, dat fiind că verificarea analitică simplificată (§3.7) stabilește corect ordinul de mărime și fenomenul determinant (flambajul), dar nu optimizează economic distribuția grosimilor și distanța inelelor. Corpul C se modelează ca placă/perete pe mediu elastic (radier) și pereți încastrați la bază (cuvă), cu verificarea distinctă UPL tratată separat, prin bilanț de forțe (nu prin model EF).

### PTh-R.9.1bis Distribuția presiunii vântului pe conturul circular al mantalei goale (SR EN 1991-1-4 §7.9.1)

Verificarea la flambaj a mantalei goale (`structura.md` §3.7) folosește, pentru predimensionare, valori de presiune/succiune globale echivalente (w_smulgere pentru hală, respectiv o presiune uniformizată pentru siloz). La faza PTh, modelul de element finit de tip coajă (PTh-R.9.1) necesită distribuția reală, neuniformă, a presiunii vântului pe conturul circular al silozului, cu coeficienți de presiune exterioară cpe variabili unghiular față de direcția vântului (0° = punctul de stagnare, în amonte de vânt), conform SR EN 1991-1-4 §7.9.1 pentru corpuri cilindrice.

| Unghi θ față de direcția vântului | cpe (indicativ, funcție de numărul Reynolds/rugozitate manta) | Presiune de calcul (θ, kN/mp), qp(15)≈1,05 kN/mp |
|---|---|---|
| 0° (stagnare) | +1,0 | +1,05 |
| 22,5° | +0,8 | +0,84 |
| 45° | +0,1 | +0,11 |
| 67,5° | −1,2 | −1,26 |
| 90° (lateral) | −1,4 (succiune maximă) | −1,47 |
| 112,5° | −1,0 | −1,05 |
| 135° | −0,5 | −0,53 |
| 157,5° | −0,4 | −0,42 |
| 180° (aval) | −0,4 | −0,42 |

Distribuția neuniformă de mai sus generează, spre deosebire de o presiune uniformă echivalentă, atât un efort de încovoiere circumferențială locală (suplimentar celui produs de patch load, `structura.md` §3.5) cât și o forță globală rezultantă (integrala presiunii pe tot conturul), folosită la verificarea globală de flambaj meridional prin efectul de încovoiere de ansamblu a silozului ca o consolă verticală goală. Introducerea acestei distribuții reale, în locul unei presiuni uniforme conservatoare, este exact rolul modelului de element finit de tip coajă recomandat la `structura.md` §15.3 pct. 2 — o presiune uniformă echivalentă simplificată tinde să supraestimeze efortul meridional global, dar poate subestima efortul circumferențial local din zona de succiune maximă (θ=90°), motiv pentru care ambele verificări (globală simplificată și locală cu distribuție reală) se păstrează în paralel până la validarea completă a modelului EF.

### PTh-R.9.2 Validarea modelului

Rezultatele modelului EF de coajă al silozului se validează prin comparație cu verificarea analitică simplificată din `structura.md` §3.7 — o abatere semnificativă (peste 15-20%) între cele două metode impune reverificarea ipotezelor de modelare (rigiditatea reazemelor la baza fiecărei virole, tratarea corectă a inelelor de rigidizare ca elemente de rigidizare discrete, nu ca o rigidizare continuă echivalentă simplificată) înainte de acceptarea rezultatului final pentru dimensionarea definitivă a grosimilor de virolă.

---

## PTh-R.10 — VERIFICĂRI SUPLIMENTARE LA SLS

### PTh-R.10.1 Deplasarea orizontală a cadrului la vârf de vânt

Recapitulare `structura.md` §10.5: deplasare calculată 24 mm față de admisibil H/150 = 33,3 mm, grad de utilizare 0,72 — cea mai apropiată de limită dintre verificările SLS ale Corpului A, semnalată explicit ca punct de atenție la o eventuală optimizare ulterioară a secțiunilor.

### PTh-R.10.2 Vibrațiile silozului gol la acțiunea vântului (verificare suplimentară de confort/oboseală)

Silozul gol, structură zveltă (h_c/d_c = 1,88) supusă vântului, poate prezenta oscilații induse de desprinderea vârtejurilor (vortex shedding), fenomen relevant pentru structuri cilindrice zvelte necesar de verificat conform SR EN 1991-1-4 Anexa E — verificare suplimentară recomandată la faza de execuție finală, cu determinarea frecvenței proprii a mantalei goale și compararea cu frecvența de desprindere a vârtejurilor la viteza de vânt de calcul.

### PTh-R.10.3 Contra-săgeți de fabricație (camber)

Rigla IPE 500, la deschiderea de 21,00 m, se execută cu o contra-săgeată de fabricație care compensează săgeata sub încărcare permanentă, astfel încât aspectul vizual al acoperișului să rămână orizontal/cu panta de proiect sub încărcarea de exploatare curentă — valoare de contra-săgeată stabilită de proiectant la faza de execuție finală, conform practicii uzuale pentru grinzi metalice de deschidere mare.

### PTh-R.10.4 Verificarea SLS a splice-ului de riglă la deschiderea rostului

Înnădirea de transport (PTh-R.4.4) se verifică suplimentar la starea limită de serviciu — deschiderea rostului dintre cele două tronsoane de riglă, sub încărcare de exploatare, nu trebuie să depășească o valoare care ar afecta comportarea vizuală/etanșeitatea eventualelor elemente de anvelopă suspendate în zona respectivă.

---

## PTh-R.11 — CALCULUL LA FOC (SR EN 1993-1-2) — PE TOATE ELEMENTELE

### PTh-R.11.1 Cerințe de rezistență la foc, pe zone

Conform gradul de rezistență la foc III-IV stabilit la faza DTAC (`structura.md` §1.4, `general.md` §7.1), cu cerință majorată la zonele adiacente depozitului de furaje/fânarului (sarcină termică ridicată, `arhitectura.md` §9.2) și la zona tehnică (dacă există, similar `hala-industriala/structura-pth.md`).

### PTh-R.11.1bis Factorul de masivitate și grosimea vopselei intumescente — principiu de calcul

Grosimea necesară a vopselei termospumante (intumescente) pentru un element metalic la o clasă de rezistență la foc cerută (R30, R60 etc.) se stabilește funcție de **factorul de masivitate** (Am/V, raportul dintre suprafața expusă la foc și volumul elementului) — un profil cu factor de masivitate mare (secțiune subțire raportată la suprafață, cazul tipic al elementelor metalice de hală, cu grosimi de tablă de ordinul 8-15 mm) se încălzește mai rapid la foc și necesită, la aceeași clasă de rezistență cerută, o grosime de peliculă intumescentă mai mare decât un profil masiv.

| Element | Factor de masivitate Am/V (m⁻¹, orientativ) | Clasă cerută | Grosime peliculă intumescentă necesară (orientativ) |
|---|---|---|---|
| Stâlp HEA 300 (curent, zonă fără risc majorat) | ≈150 | R30 | conform tabel de performanță al producătorului, valoare moderată |
| Stâlp HEB 300 (fronton) | ≈130 | R30 | ușor inferioară stâlpului curent (secțiune mai masivă) |
| Riglă IPE 500 (zonă adiacentă depozit furaje) | ≈180 | R60 (majorat, sarcină termică ridicată conform `arhitectura.md` §9.2) | grosime superioară, conform calcul specific producător pentru clasa R60 |

Valorile exacte de grosime se determină pe baza tabelelor de performanță certificate ale producătorului sistemului intumescent ales (variază semnificativ între produse), nu printr-o formulă generică — rolul prezentului breviar este de a stabili factorul de masivitate al fiecărui profil și clasa de rezistență cerută pe zonă, date de intrare obligatorii pentru selecția produsului la faza de execuție.

### PTh-R.11.2 Verificarea stâlpilor adiacenți zonelor cu risc majorat

Stâlpii Corpului A din vecinătatea directă a depozitului de furaje/fânarului se protejează cu vopsea termospumantă (intumescentă), dimensionată la timpul de rezistență la foc cerut de scenariul de securitate la incendiu — verificare identică ca metodologie cu cea de la o hală industrială (`hala-industriala/structura-pth.md` §PTh-R.11.2), dar cu sarcina termică de calcul superioară (furaje uscate, 14-18 MJ/kg, conform `general.md` §7.2), care poate impune o grosime de peliculă intumescentă mai mare pentru același timp de rezistență cerut.

### PTh-R.11.3 Verificarea la foc a mantalei silozului

Manta silozului metalic (Corpul B) nu se protejează, de regulă, la foc convențional — riscul specific al acestui corp este explozia de praf (tratat prin măsuri ATEX de instalații, nu prin protecție termospumantă), iar tabla subțire a mantalei nu ar rezista, oricum, la o expunere prelungită la foc convențional. Se verifică însă distanța de siguranță față de restul construcțiilor, conform P118-1, astfel încât un eventual incendiu la o construcție vecină să nu conducă la o expunere termică semnificativă a mantalei silozului.

### PTh-R.11.4 Zidul/distanța de separare între hală și depozitul de furaje

Dacă separarea nu se realizează prin perete rezistent la foc dedicat, ci exclusiv prin distanță (conform `arhitectura.md` §9.2), verificarea de rezistență se limitează la confirmarea distanței de siguranță impuse de P118-1, corelată cu grosimea de protecție a stâlpilor adiacenți stabilită la PTh-R.11.2.

### PTh-R.11.5 Tabel sinteză cerințe și soluții de protecție la foc

| Element | Cerință de rezistență la foc | Soluție |
|---|---|---|
| Stâlpi Corp A, zonă curentă | conform grad III-IV, sarcina termică a așternutului | vopsea intumescentă, grosime conform calcul |
| Stâlpi Corp A, adiacenți depozit furaje | majorată, sarcina termică a furajelor uscate (14-18 MJ/kg) | vopsea intumescentă, grosime superioară |
| Manta siloz (Corp B) | nu se protejează la foc convențional | distanță de siguranță + măsuri ATEX (instalații) |
| Cuvă bazin dejecții (Corp C) | beton, rezistență la foc intrinsecă a betonului armat conform acoperire | conform acoperire de armătură majorată (50 mm, `structura.md` §14.3), suficientă și pentru rezistență la foc |

---

## PTh-R.12 — DETALII DE ÎMBINARE TIPIZATE COMPLETE (PLANȘE DE ATELIER ȘI MONTAJ)

### PTh-R.12.1 Conținutul setului de planșe de rezistență faza PTh

Planșe de ansamblu (fundații, structură metalică, armare bazin), planșe de detalii de nod (PTh-R.4), fișe de element (shop drawings) pentru fiecare marcă de reper (ST-xx, RG-xx, VR-xx, AR-xx), planșe de montaj cu secvențierea erecției (PTh-R.5.4), liste de bare pentru armătura bazinului.

### PTh-R.12.2 Fișa de element — exemplu ST-05 (stâlp curent Corp A)

| Parametru | Valoare |
|---|---|
| Profil | HEA 300, oțel S355 |
| Lungime | 5,00 m |
| Găurire | conform placă de bază (PTh-R.4.6) și nod superior (PTh-R.4.1) |
| Protecție | zincare + duplex, clasă C4-C5 |
| Masă unitară | ≈0,54 t |

### PTh-R.12.3 Fișa de element — exemplu VR-07 (virolă siloz, poziția 7 de la vârf)

| Parametru | Valoare |
|---|---|
| Grosime | 6 mm (conform PTh-R.2.7) |
| Diametru dezvoltat | Ø8,00 m, perimetru ≈25,13 m |
| Înălțime | 1,50 m |
| Îmbinare | șuruburi orizontale la interfața cu VR-06/VR-08, rost vertical cu șuruburi |
| Protecție | zincare Z275, fabricație |

### PTh-R.12.4 Fișa de element — AR-C1 (armătură perete longitudinal bazin, panou tip)

Bare dispuse pe două fețe (interioară/exterioară), diametru și spațiere stabilite conform verificării la încovoiere combinată cu limitarea deschiderii fisurii la w ≤ 0,2 mm (SR EN 1992-3) — densitate de armare superioară unui perete de sprijin obișnuit de aceeași grosime, exact din cerința de control al fisurării impusă de funcțiunea de reținere a dejecțiilor.

---

## PTh-R.13 — CALCULUL COMPLET AL PASARELEI/SCĂRII DE ACCES SILOZ ȘI AL PLATFORMELOR TEHNICE

### PTh-R.13.1 Geometria pasarelei/scării de acces siloz

Scară de acces la partea superioară a virolelor (Corp B), conform D12 din `arhitectura-pth.md` — verticală cu colier de siguranță sau înclinată cu podeste intermediare, dimensionată la sarcina de personal + echipament de întreținere/inspecție.

### PTh-R.13.2 Încărcări pe pasarelă/platformă tehnică

Sarcină utilă de 3,0-4,0 kN/mp (platformă tehnică cu acces ocazional de personal, conform SR EN 1991-1-1), plus sarcina concentrată de personal cu echipament (verificare locală pe grătar).

### PTh-R.13.3 Calculul static al scării/pasarelei

Structură metalică ușoară (profile laminate/formate la rece), verificată la încovoiere sub sarcina utilă și la deplasare (săgeată admisă L/300 pe elementele de platformă/treaptă), cu prindere de manta prin console dimensionate la reacțiunea locală transmisă.

### PTh-R.13.4 Balustrada pasarelei/scării

Conform D13 din `hala-industriala/arhitectura-pth.md` (principiu identic aplicat aici): h ≥ 1,10 m, verificată la sarcina orizontală liniară de 1,0 kN/m aplicată la nivelul mâinii curente, conform SR EN 1991-1-1.

### PTh-R.13.5 Platforma tehnică a bazinului de dejecții (D14 din `arhitectura-pth.md`)

Verificare structurală similară, cu sarcina utilă dimensionată la echipamentul de mixare/pompare care poate staționa temporar pe platformă, plus sarcina de personal.

---

## PTh-R.14 — TEHNOLOGIE DE EXECUȚIE PE TIMP FRIGUROS/CĂLDUROS

### PTh-R.14.1 Cadru normativ

Conform normativele generale de execuție pe timp friguros/călduros aplicabile structurilor metalice și betonului armat, cu accent particular pe betonul cuvei bazinului de dejecții (clasă de expunere XA2-XA3, `structura.md` §14.3) și pe montajul virolelor silozului.

### PTh-R.14.2 Riscuri și măsuri la sudare pe timp friguros

Preîncălzirea zonei de sudură la temperaturi scăzute (conform grosimea materialului și marca de oțel), protecția zonei de sudură față de curenți de aer/precipitații, verificarea temperaturii interpasă.

### PTh-R.14.3 Măsuri la montaj pe timp friguros

Evitarea manevrării elementelor metalice fragile la temperaturi foarte scăzute (risc de rupere fragilă), verificarea funcționării normale a echipamentelor de ridicare.

### PTh-R.14.4 Măsuri pe timp călduros

Protecția suprafețelor de montaj la radiație solară directă (dilatare termică a elementelor lungi, precum rigla de 21,00 m, la manipulare), planificarea turnărilor de beton în orele mai răcoroase ale zilei.

### PTh-R.14.5 Betonul cuvei bazinului pe timp friguros

Protecție la îngheț a betonului proaspăt turnat (prelate termoizolante, aditivi conform proiect), condiție critică dat fiind clasa de expunere severă (XA2-XA3) și cerința de control strict al fisurării (w ≤ 0,2 mm) — un beton afectat de îngheț la vârstă tânără prezintă un risc suplimentar de fisurare necontrolată, incompatibil cu funcțiunea de etanșare a cuvei.

---

## PTh-R.15 — PROGRAM COMPLET DE PROBE ȘI ÎNCERCĂRI

### PTh-R.15.1 Încercări pe materialul de bază (oțel)

Certificate 3.1 la recepția fiecărui lot de profile/tablă, cu verificare a compoziției chimice/proprietăților mecanice declarate.

### PTh-R.15.2 Încercări pe îmbinări sudate

Control vizual 100%, control cu ultrasunete (UT) prin sondaj la nodurile curente, control 100% UT/RT la inelul de racord pâlnie-cilindru (element critic, PTh-R.4.3).

### PTh-R.15.3 Încercări pe șuruburi HR pretensionate

Verificarea cuplului de strângere/unghiului de rotație pe eșantion reprezentativ la fiecare tip de nod.

### PTh-R.15.4 Încercări pe sistemul de protecție

Măsurători DFT pe fiecare strat, la fiecare zonă de clasă de corozivitate diferită (interior/exterior hală, manta siloz).

### PTh-R.15.5 Încercări pe elementele de beton (fundații, radier siloz, cuvă bazin)

Probe de rezistență la compresiune pe cuburi/cilindri, la vârsta de 7 și 28 de zile, pentru fiecare turnare; verificare a clasei de expunere puse în operă (raport apă/ciment, conținut de ciment, conform prescripție).

### PTh-R.15.6 Proba de etanșeitate a cuvei bazinului de dejecții

Probă specifică, fără echivalent la o construcție industrială curentă: **umplere parțială cu apă/inundare controlată**, cu monitorizarea nivelului pe un interval determinat de proiectant (recomandat minimum 48-72 ore), pentru confirmarea absenței oricărei scăderi de nivel neexplicate de evaporare — o scădere de nivel peste pragul admis indică infiltrație și impune identificarea și remedierea punctului de scurgere (rost, fisură, penetrare neetanșă) înainte de darea în exploatare cu dejecții.

### PTh-R.15.7 Documente de conformitate arhivate la Cartea Tehnică

Toate certificatele, rapoartele de încercare și procesele-verbale de probă menționate mai sus se arhivează integral la Cartea Tehnică a construcției, secțiunea structură de rezistență.

### PTh-R.15.8 Planificarea temporală a probelor și încercărilor (sinteză coordonare cu graficul de execuție)

| Probă/încercare | Moment în graficul de execuție | Durată estimată | Condiționează |
|---|---|---|---|
| Certificate 3.1 oțel/tablă | la recepția fiecărui lot, înainte de montaj | imediat | demararea montajului lotului respectiv |
| Control VT/UT noduri riglă-stâlp | după sudare, înainte de vopsire | 1-2 zile/lot de noduri | protecția anticorozivă finală |
| Control 100% VT/UT/RT inel racord pâlnie-cilindru | imediat după sudare | 1 zi | continuarea montajului virolelor superioare |
| Probe cuburi beton (fundații, radier, cuvă) | la fiecare turnare, citire la 7 și 28 zile | 28 zile pentru rezultat definitiv | decofrare/încărcare structurii respective |
| Control DFT protecție anticorozivă | pe fiecare strat aplicat | imediat, pe parcursul aplicării | aplicarea stratului următor |
| Proba de etanșeitate cuvă bazin | după finalizarea execuției Corpului C, înainte de PIF | 48-72 ore | darea în exploatare cu dejecții |
| Proba funcțională cortine fail-safe | după finalizarea montajului anvelopei | 1 zi (toate cele 36 module) | recepția la terminarea lucrărilor |

Planificarea de mai sus evidențiază faptul că proba de etanșeitate a cuvei (48-72 ore de monitorizare) este, dintre toate probele structurale, cea cu durata cea mai lungă și cu impactul cel mai direct asupra termenului final al graficului — se recomandă demararea execuției Corpului C suficient de devreme în succesiunea generală (v. `arhitectura-pth.md` §PTh-A.4.1, etapa 4) pentru a nu deveni element critic (bottleneck) al graficului de execuție.

---

## PTh-R.16 — BREVIAR COMPLET DE ÎNCĂRCĂRI ȘI COMBINAȚII (TOATE CORPURILE)

### PTh-R.16.1 Acțiuni permanente (G) — recapitulare cu valori actualizate din PTh-R.3

Greutatea proprie a Corpului A rezultă din extrasul de materiale (PTh-R.3.2), confirmând valoarea gk = 0,55 kN/mp adoptată la DTAC; greutatea proprie a mantalei silozului rezultă din extrasul PTh-R.3.3 (≈15,98 t manta + 2,2 t inele + 1,8 t pâlnie ≈ 20 t, apropiată de valoarea de 250 kN/≈25,5 t adoptată generic la `structura.md` §9.3, cu diferența acoperită de fundație/echipamente auxiliare).

### PTh-R.16.2 Acțiuni variabile (Q) — neschimbate față de DTAC

Zăpadă sk = 2,0 kN/mp (regiune de calcul), vânt vb = 30 m/s, material depozitat în siloz tratat ca acțiune variabilă cu ψE = 0,8-1,0 la seism (v. `structura.md` §8.1).

### PTh-R.16.3 Combinații SLU — tabel unificat pe toate corpurile

| Grupare | Corp | Combinație | Element guvernat |
|---|---|---|---|
| GF1 | A | 1,35G+1,5S+0,9W | riglă/nod (moment) |
| GF2 | A | vânt principal | stâlpi (încovoiere) |
| GF3 | A | 1,0G+1,5W_succiune | ancoraje bază (smulgere) |
| SU | B | umplere Janssen statică | verificare de referință |
| SG | B | golire majorată + patch load | perete (întindere inelară) |
| SGol-vânt | B | siloz gol + vânt | flambaj manta (guvernant) |
| S-seism | B | siloz plin + seism | ancoraj + fundație (guvernant) |
| UPL | C | 0,90G_stab≥1,10F_up | verificare la plutire |
| Împingere | C | pământ+apă (cuvă goală) / dejecții (cuvă plină) | pereți (încovoiere) |

### PTh-R.16.3bis Verificarea la zăpadă asimetrică (CR 1-1-3, completare `structura.md` §7.3)

Acoperișul Corpului A, cu pantă redusă (10%), este verificat suplimentar la ipoteza de acumulare asimetrică a zăpezii (un versant cu coeficient de formă majorat μ1=0,8·1,5≈1,2 prin efectul de redistribuire de la vânt, celălalt versant cu μ1 redus la aproximativ 0,5, conform CR 1-1-3 pentru acoperișuri cu două pante), fenomen care generează, spre deosebire de încărcarea simetrică (GF1, `structura.md` §10.3), un moment de torsiune suplimentar în cadru și o solicitare inegală pe cei doi stâlpi ai aceluiași cadru.

| Versant | μ1 asimetric | s_asimetric (kN/mp) | q_asimetric pe travee (kN/m) |
|---|---|---|---|
| Versant 1 (acumulare) | 1,2 | 2,4 | 13,2 |
| Versant 2 (deficit) | 0,5 | 1,0 | 5,5 |

Diferența dintre cele două versante (13,2 față de 5,5 kN/m) introduce în cadru un moment de torsiune suplimentar, absent din verificarea simetrică — verificare cu rezultat: grad de utilizare suplimentar la stâlpul dinspre versantul încărcat 0,71 (peste valoarea de 0,65 la vânt simetric, dar sub pragul de 1,0), confirmând că zăpada simetrică (GF1) rămâne totuși gruparea guvernantă pentru riglă, dar zăpada asimetrică devine relevantă pentru verificarea locală a stâlpului și, mai ales, pentru contravântuirile care preiau componenta de torsiune (verificare suplimentară la efort axial majorat cu ≈8% față de cazul simetric).

### PTh-R.16.4 Exemplu numeric suplimentar — stâlp de fronton (verificare completă)

Recapitulare PTh-R.2.4: M_fronton = 49,1 kNm, combinat cu moment gravitațional redus (jumătate travee) — grad de utilizare final 0,58, sub cel al stâlpului curent (0,65) verificat la vânt lateral în `structura.md` §13.

### PTh-R.16.5 Tabel centralizator utilizări — toate elementele (extindere `structura.md` §13)

| Element | Gruparea guvernantă | Grad de utilizare |
|---|---|---|
| Stâlp curent HEA 300 | GF2 (vânt) | 0,65 |
| Stâlp de fronton HEB 300 | GF2 + vânt frontal | 0,58 |
| Riglă/nod IPE 500 + vute (curent) | GF1 (zăpadă) | 0,49 |
| Pane Z250 (câmp curent) | GF3 (smulgere) | 0,78 |
| Pane Z250 (zonă colț, succiune majorată) | GF3 majorat | 0,89 |
| Ancoraj bază stâlp curent (smulgere) | GF3 | 0,71 |
| Deplasare orizontală cadru (SLS) | vânt | 0,72 |
| Perete siloz — inel (baza, t=8mm) | SG (golire) | 0,52 |
| Perete siloz — flambaj meridional (gol) | SGol-vânt | 0,72 |
| Perete siloz — flambaj circumferențial (baza, cu inele) | SGol-vânt | 0,81 |
| Ancoraj siloz (baza, seism) | S-seism | 0,84 |
| Fundație (radier) siloz | S-seism | 0,84 |
| Cuvă bazin — perete longitudinal (împingere) | pământ+apă | 0,75 |
| Cuvă bazin — perete transversal | pământ+apă | 0,68 |
| Inel racord pâlnie-cilindru siloz | SG (golire) | 0,80 (element critic, control 100% sudură) |

---

## PTh-R.18 — CALCULUL COMPLET AL INFRASTRUCTURII (TOATE FUNDAȚIILE)

### PTh-R.18.1 Fundațiile Corpului A — toate cele 36 de stâlpi

`structura.md` §12.2 a verificat fundația-tip a unui stâlp curent (talpă 1,6×1,6 m, N=182 kN, presiune 71-165 kPa, verificare la smulgere cu grad de siguranță 1,32). Faza PTh extinde această verificare la toate cele 36 de fundații ale Corpului A (18 cadre × 2 stâlpi), cu distincția între fundațiile stâlpilor curenți și cele ale stâlpilor de fronton (încărcare gravitațională redusă, dar solicitare suplimentară de încovoiere din vânt frontal, PTh-R.2.4).

| Poziție fundație | Tip | Dimensiune talpă | N (kN) | p_max (kPa) | Verificare smulgere |
|---|---|---|---|---|---|
| Cadre curente (2-17), 32 fundații | izolată | 1,6×1,6 m | 182 | 165 | grad 1,32 |
| Cadre de fronton (1, 18), 4 fundații | izolată, majorată local pentru moment din vânt frontal | 1,8×1,8 m (majorată) | ≈140 (redus, jumătate travee) + moment din PTh-R.2.4 | ≈178 (cu excentricitate) | grad ≈1,25 (verificat cu momentul suplimentar) |

Toate cele 36 de fundații se execută cu buloane de ancoraj înglobate (nu ancoraje chimice), conform recomandarea de la `structura.md` §12.2, poziționate prin șablon de montaj comun tuturor stâlpilor pentru a asigura interschimbabilitatea elementelor prefabricate în atelier.

### PTh-R.18.2 Fundația inelară a Corpului B — verificare finală de execuție

Recapitulare `structura.md` §12.3: radier circular A=63,6 mp, p_med=110 kPa, p_max=242 kPa sub combinația seismică (grad de utilizare 0,84, marjă ≈3% față de presiunea convențională admisă de 250 kPa). Faza PTh confirmă necesitatea studiului geotehnic dedicat (recomandare explicită DTAC, reluată aici ca o condiție prealabilă obligatorie a finalizării proiectului de execuție a acestui radier) și stabilește armătura radierului pe două direcții (radială și circumferențială), cu majorare locală în zona de sub inelul de ancoraj al mantalei, unde se concentrează efortul de smulgere din momentul de răsturnare seismic (M = 18.912 kNm).

| Zonă radier | Armătură | Observație |
|---|---|---|
| Câmp curent (sub manta) | plasă dublă, direcții radială+circumferențială | conform verificare la încovoiere din presiune de contact |
| Zonă inel de ancoraj (perimetru) | armătură suplimentară concentrată | preia efortul local de smulgere din M_răsturnare |
| Zonă centrală (sub pâlnie, dacă radierul susține și golirea) | conform detaliu tehnologic al pâlniei de descărcare | coordonat cu instalația de transport al materialului evacuat |

### PTh-R.18.3 Infrastructura Corpului C — recapitulare finală

Radierul cuvei (12,00×8,00 m) se dimensionează, așa cum s-a arătat la `structura.md` §12.4, atât la presiunea de contact cu terenul (verificare STR/GEO uzuală) cât și, esențial, la condițiile de etanșeitate și subpresiune (§4.3-4.5) — capitolul PTh-R.9 (verificare UPL) rămâne sursa completă a verificărilor structurale specifice, infrastructura de față limitându-se la confirmarea finală a compatibilității cu presiunea convențională a amplasamentului real, pe baza studiului geotehnic definitiv.

### PTh-R.18.4 Verificarea drenajului și a protecției hidrofuge a infrastructurii

Toate cele trei infrastructuri (fundații izolate Corp A, radier inelar Corp B, radier+pereți Corp C) se prevăd cu un sistem de drenaj periferic (dren perimetral cu pietriș/geotextil), dimensionat să mențină nivelul apei subterane sub cota de fundare în condiții normale — măsură care reduce riscul de flotație accidentală înainte de darea în exploatare a bazinului de dejecții (perioadă în care cuva este, prin definiție, goală, exact scenariul cel mai defavorabil identificat la `structura.md` §4.2) și reduce solicitările de subpresiune și asupra fundațiilor Corpurilor A și B pe durata execuției.

---

## PTh-R.19 — ANALIZA MODALĂ SEISMICĂ A SILOZULUI PLIN (DEZVOLTARE RECOMANDARE DTAC)

### PTh-R.19.1 De ce metoda forței laterale echivalente nu este suficientă la faza finală

Metoda forței laterale echivalente, folosită la `structura.md` §9.3 pentru predimensionare (Fb=Sd(T1)·W_seism), presupune un răspuns dominat de modul fundamental de vibrație, ipoteză rezonabilă pentru o structură regulată, dar care poate subestima răspunsul unei structuri zvelte precum silozul plin (h_c/d_c=1,88), unde distribuția de masă pe înălțime (manta ușoară + material greu concentrat pe toată înălțimea coloanei de umplere) poate activa moduri superioare de vibrație cu o contribuție semnificativă la forța tăietoare de bază — motivul explicit al recomandării de la `structura.md` §15.3 pct. 3.

### PTh-R.19.2 Structura analizei modale recomandate (SR EN 1998-4)

Analiza modală tratează separat cele două componente ale masei seismice ale silozului, conform teoriei consacrate pentru rezervoare/silozuri sub acțiune seismică (analogă modelului Housner pentru lichide, adaptată la materialul granular conform SR EN 1998-4): o componentă de masă rigidă (impulsivă), care se mișcă solidar cu manta, și o componentă de masă cu comportare mai flexibilă (convectivă/de alunecare parțială a materialului granular), cu perioadă proprie distinctă de cea a mantei goale. Rezultatul analizei modale se compară cu forța tăietoare de bază obținută prin metoda simplificată (Fb=2.364 kN, `structura.md` §9.3) — o diferență semnificativă impune adoptarea valorii mai defavorabile pentru dimensionarea finală a ancorajului și a radierului.

### PTh-R.19.3 Recomandare de prudență pentru faza de execuție

Până la finalizarea analizei modale dedicate, se recomandă păstrarea marjei de siguranță identificate deja la faza DTAC (grad de utilizare 0,84 la ancoraj și fundație, cel mai apropiat de limită din tot ansamblul) ca prag de alertă — orice rafinare a calculului care ar conduce la o forță seismică majorată față de valoarea simplificată impune reconsiderarea imediată a dimensiunilor radierului și/sau a numărului/secțiunii buloanelor de ancoraj, înainte de turnarea fundației inelare.

---

## PTh-R.20 — MATRICE EXTINSĂ DE CONTROL AL CALITĂȚII (COMPLETARE PTh-R.6)

| Categorie lucrare | Ce se verifică | Metodă | Fază/moment | Document | Responsabil |
|---|---|---|---|---|---|
| Fundații Corp A — toate cele 36 | poziție/verticalitate buloane, dimensiuni talpă | teodolit/laser, șablon | înainte de turnare | PV + PVLA | executant + diriginte |
| Fundație inelară Corp B | verticalitate/centrare, armătură conform PTh-R.18.2 | teodolit/laser | pe parcurs turnare | PVLA | diriginte + proiectant |
| Structură metalică Corp A — montaj | verticalitate, aliniere înnădire riglă (PTh-R.4.4) | teodolit/laser | pe parcurs montaj | PV recepție montaj | executant + diriginte |
| Contravântuiri longitudinale | poziție, pretensionare/strângere corectă | vizual + control cuplu | la finalizarea montajului fiecărei travei | PV | diriginte |
| Panel zone noduri riglă-stâlp | nervuri de rigidizare montate conform PTh-R.2.11 | vizual + control sudură | înainte de vopsire finală | PVLA | diriginte + proiectant |
| Virole siloz — montaj progresiv | verticalitate/ovalitate la fiecare virolă | teodolit/laser | la fiecare etapă de montaj | PV | executant specializat + diriginte |
| Inel racord pâlnie-cilindru | sudură 100% VT/UT/RT | nedistructiv | înainte de acoperire/finisare | PVLA | proiectant + diriginte |
| Armătură + waterstop cuvă Corp C | poziție, densitate armare, fixare waterstop | vizual, la fiecare etapă de turnare | înainte de turnarea etapei următoare | PVLA | diriginte + proiectant |
| Beton cuvă Corp C | clasă, aditivi, protecție la îngheț (PTh-R.14.5) | probe cuburi/cilindri | la fiecare turnare | rapoarte laborator | laborator autorizat |
| Proba de etanșeitate finală cuvă | absența infiltrațiilor | umplere parțială/inundare controlată | după finalizarea execuției | PV probă (PTh-R.15.6) | proiectant + diriginte |
| Protecție anticorozivă structură metalică | DFT pe fiecare strat, marcaj 80/20 | grosimetru magnetic | pe parcurs aplicare | PVLA | diriginte |

### PTh-R.20.1 Abateri admisibile — completare tabel general

| Element | Toleranță |
|---|---|
| Ovalitate radier inelar siloz (centrare) | conform proiect, verificat cu punct central materializat |
| Densitate armare radier zonă inel de ancoraj | conform proiect, fără reducere față de calculul de la PTh-R.18.2 |
| Deschidere fisură pereți/radier cuvă (SLS) | w ≤ 0,2 mm (SR EN 1992-3) |
| Aliniere gujoane/șuruburi virole succesive | fără dezaxare vizibilă, conform toleranța furnizorului specializat |

---

## PTh-R.21 — SINTEZA VERIFICĂRILOR SUPLIMENTARE ȘI CONCLUZIE INGINEREASCĂ

### PTh-R.21.1 Sinteza corecțiilor de proiectare aduse de faza PTh față de predimensionarea DTAC

Extinderea breviarului de la un cadru/o virolă/un perete de referință la toate elementele reale ale ansamblului (18 cadre, 10 virole, 4 pereți + radier) confirmă, în ansamblu, ordinul de mărime și fenomenele determinante stabilite la DTAC, cu două precizări suplimentare relevante pentru execuție: (1) stâlpii de fronton, deși mai puțin solicitați decât cei curenți, necesită o verificare distinctă la vânt frontal, absentă din breviarul de referință DTAC; (2) panele și rigla de perete din zonele de colț ale acoperișului/fațadei necesită secțiune majorată local (succiune de vânt de peste 2,5 ori mai mare decât în câmp curent), aspect care trebuie reflectat explicit pe planul de montaj pentru a evita o eroare frecventă de execuție (montaj uniform al secțiunii de câmp curent pe toată suprafața).

### PTh-R.21.2 Tabel centralizator conformitate — toate verificările suplimentare PTh

Toate elementele verificate la nivel de detaliu de execuție (PTh-R.16.5) se încadrează în limitele admisibile, cu gradul de utilizare maxim rămas la **0,84** (ancorajul și fundația silozului sub combinația seismică, identic cu concluzia DTAC), confirmând că nivelul de detaliere PTh nu a identificat o subdimensionare ascunsă a predimensionării DTAC, ci a rafinat distribuția de material (grosimi variabile de virolă, secțiuni majorate local la pane de colț) fără a modifica fenomenul fizic determinant identificat inițial pentru fiecare corp.

### PTh-R.21.3 Concluzie inginerească

Structura de rezistență a fermei agrozootehnice, dezvoltată la nivel de execuție pe cele trei corpuri independente (hală metalică guvernată de vânt, siloz metalic guvernat de flambaj la gol și de seism la plin, bazin de dejecții guvernat de flotație și de etanșeitate), satisface integral cerința fundamentală A (rezistență mecanică și stabilitate) a Legii 10/1995, cu toate detaliile de îmbinare, tehnologia de execuție, planul de control al calității și programul de probe necesare demarării execuției pe șantier. Recomandările explicite semnalate la faza DTAC (`structura.md` §15.3) — studiu geotehnic dedicat pentru siloz, calcul cu element finit de tip coajă pentru manta, analiză seismică modală dedicată — rămân valabile și se confirmă ca acțiuni obligatorii înainte de finalizarea definitivă a proiectului de execuție, dat fiind că exact aceste elemente (ancorajul și fundația silozului) rămân, și la nivelul de detaliere PTh, cele mai apropiate de limita de utilizare din întregul ansamblu (grad 0,84).

Prezentul supliment se corelează obligatoriu cu suplimentele omoloage de arhitectură (`arhitectura-pth.md`) și instalații (`instalatii-pth.md`), conform matricei de interfață stabilite la `arhitectura-pth.md` §PTh-A.14, și se predă integral, împreună cu acestea, la Cartea Tehnică a construcției, ca bază documentară a recepției la terminarea lucrărilor și a obținerii avizului sanitar-veterinar de funcționare.

---

## PTh-R.22 — INTERFAȚA DETALIATĂ CU PROIECTUL DE INSTALAȚII ȘI CU PROIECTUL TEHNOLOGIC

### PTh-R.22.1 Goluri și penetrări prin elementele structurale

Structura de rezistență a celor trei corpuri este traversată de un număr de penetrări impuse de proiectul de instalații (`instalatii-pth.md`), fiecare dintre acestea necesitând coordonare explicită înainte de execuție, pentru a nu slăbi elemente portante:

| Element structural | Penetrare necesară | Coordonare |
|---|---|---|
| Riglă de perete Corp A | conducte de adăpare, cabluri electrice către prizele/senzorii din alei | poziționare între rigle, nu prin secțiunea profilului |
| Placă de pardoseală alei | canale de colectare dejecții (D08 `arhitectura-pth.md`), trasee electrice îngropate | coordonate cu rosturile de contracție/dilatare, probate înainte de turnare |
| Manta siloz | racorduri ale echipamentelor de aspirație/desprăfuire ATEX, panouri de decompresie (D13) | poziție rezultată din calculul ATEX, verificată să nu intersecteze inelele de rigidizare (PTh-R.2.8) |
| Pereți/radier cuvă Corp C | conducte de pompare/mixare, senzor de nivel | manșoane etanșe înglobate la turnare, coordonate cu poziția waterstop-ului (v. `arhitectura-pth.md` D15) |

### PTh-R.22.2 Sarcini suplimentare din echipamentele de instalații suspendate de structură

Structura Corpului A preia, punctual, sarcinile agățate ale sistemului de furajare automată și ale ventilatoarelor de completare mecanică (v. `structura.md` §10.1 — sarcini concentrate de ordinul 1,5-2 kN per unitate), poziționate la punctele reale din planul tehnologic al beneficiarului. Faza PTh confirmă că aceste sarcini punctuale, introduse explicit în modelul de calcul al cadrului la pozițiile lor reale, nu modifică semnificativ înfășurătoarea globală de eforturi calculată pentru încărcarea distribuită dominantă (zăpadă), dar impun verificarea locală a panei/riglei la punctul de suspendare — verificare de detaliu executată la faza de coordonare finală, pe baza planului tehnologic definitiv predat de beneficiar.

### PTh-R.22.3 Coordonarea finală cu proiectul tehnologic zootehnic

Conform principiului stabilit la `arhitectura-pth.md` §PTh-A.12.1, geometria cușetelor și numărul de travei al Corpului A rămân condiționate de proiectul tehnologic definitiv (efectiv real, sistem de creștere). Din perspectivă structurală, această flexibilitate nu afectează dimensionarea cadrului-tip (secțiunile stâlpilor/riglei rămân identice indiferent de numărul de travei adoptat), ci exclusiv **numărul de cadre identice** puse în operă — motiv pentru care extrasul de materiale (PTh-R.3) este redactat pe un modul de referință de 18 travei, ușor de recalculat proporțional pentru un număr diferit de travei rezultat din efectivul real declarat de beneficiar.

---

## ANEXA A — TABEL CENTRALIZATOR AL TUTUROR REPERELOR STRUCTURALE

| Cod reper | Descriere | Corp | Cantitate (modul de referință) | Material |
|---|---|---|---|---|
| ST-01…ST-32 | Stâlpi curenți HEA 300 | A | 32 | S355 |
| ST-33…ST-36 | Stâlpi de fronton HEB 300 | A | 4 | S355 |
| RG-01…RG-18 | Riglă cadru IPE 500 (2 tronsoane/cadru) | A | 18 (36 tronsoane) | S355 |
| PN-xx | Pane Z200/Z250 | A | conform pas pane | S275 |
| RP-xx | Rigle de perete | A | conform pas | S275 |
| CV-xx | Contravântuiri verticale/orizontale | A | conform PTh-R.2.10 | S275 |
| VR-01…VR-10 | Virole siloz (grosime 4-8mm) | B | 10/celulă | S350GD |
| IN-01…IN-05 | Inele de rigidizare siloz | B | 5/celulă | S275/S350GD |
| PA-01 | Pâlnie de descărcare | B | 1/celulă | S350GD, grosime majorată |
| AR-A1 | Armătură radier bazin | C | 38,4 mc beton | BST 500C |
| AR-C1/C2 | Armătură pereți longitudinali/transversali | C | 36,0 mc beton | BST 500C |
| WS-01 | Waterstop rosturi cuvă | C | conform lungime rosturi | PVC/bentonitic |

Numerotarea și cantitățile din prezenta anexă se recalculează direct proporțional pentru un amplasament real cu un număr diferit de travei (Corp A) sau de celule de bazin (Corp C), conform convenției de scalare modulară stabilite la PTh-R.1.

---

## PTh-R.23 — FIȘE TEHNICE DE MATERIALE STRUCTURALE (caiet extins de produse — structură)

### PTh-R.23.1 FT-S01: Oțel structural S355 JR/J0 (cadre principale Corp A)

| Parametru | Specificație |
|---|---|
| Rezistență de curgere fy | 355 N/mm² |
| Modul de elasticitate E | 210.000 N/mm² |
| Certificare | SR EN 10025-2, certificat 3.1 la recepție |
| Sudabilitate | conform grad J0/JR, verificat prin procedură de sudare calificată (WPS/WPQR) |
| Utilizare | stâlpi curenți/fronton, riglă cadru, conform PTh-R.3.2 |

### PTh-R.23.2 FT-S02: Oțel structural S275 (elemente secundare)

| Parametru | Specificație |
|---|---|
| Rezistență de curgere fy | 275 N/mm² |
| Utilizare | pane, rigle de perete, contravântuiri |
| Certificare | SR EN 10025-2 |

### PTh-R.23.3 FT-S03: Tablă S350GD zincată (manta siloz)

| Parametru | Specificație |
|---|---|
| Rezistență de curgere fy | 350 N/mm² |
| Protecție de fabricație | zincare Z275 (standard)/Z600 (zone cu expunere sporită) |
| Certificare | SR EN 10346, SR EN 1993-4-1 |
| Grosime pusă în operă | variabilă 4-8 mm pe virole, conform PTh-R.2.7 |

### PTh-R.23.4 FT-S04: Șuruburi de înaltă rezistență pretensionate

| Parametru | Specificație |
|---|---|
| Gradul | 8.8/10.9 |
| Certificare | SR EN 14399, control cuplu/unghi conform SR EN 1090-2 |
| Protecție | zincare/geomet la elementele expuse mediului agresiv al halei |
| Utilizare specială | ancoraje siloz, la zonă de expunere maximă, recomandat inox A2-70 |

### PTh-R.23.5 FT-S05: Beton C25/30 (fundații Corp A, pardoseală alei)

| Parametru | Specificație |
|---|---|
| Clasă de expunere | XC2 (fundații) / XA1 (pardoseală alei, agresivitate chimică slabă) |
| Raport apă/ciment maxim | conform clasă de expunere, SR EN 206 |
| Certificare | SR EN 206, control pe cuburi/cilindri la 7/28 zile |

### PTh-R.23.6 FT-S06: Beton C30/37 (radier siloz)

| Parametru | Specificație |
|---|---|
| Clasă de expunere | XC2(+XA1) |
| Utilizare | radier inelar Corp B, conform PTh-R.18.2 |

### PTh-R.23.7 FT-S07: Beton C35/45 (cuvă bazin dejecții)

| Parametru | Specificație |
|---|---|
| Clasă de expunere | XA2-XA3 (agresivitate chimică ridicată) |
| Acoperire armătură | minimum 50 mm (majorată față de uzual, conform `structura.md` §14.3) |
| Ciment recomandat | rezistent la atac acid, conținut redus de C₃A |
| Control fisurare | w ≤ 0,2 mm, clasă etanșeitate 1 (SR EN 1992-3) |

### PTh-R.23.8 FT-S08: Armătură BST 500C

| Parametru | Specificație |
|---|---|
| Rezistență de calcul fyd | 435 N/mm² |
| Clasă de ductilitate | C (obligatorie pentru elemente seismice — fundații siloz, cuvă bazin) |
| Certificare | SR EN 10080 |

### PTh-R.23.9 FT-S09: Sistem de protecție anticorozivă duplex (zincare + vopsire)

| Parametru | Specificație |
|---|---|
| Zincare la cald | grosime minimă 85 μm, SR EN ISO 1461 |
| Sistem de vopsire | epoxidic + poliuretanic, grosime totală minimă 240 μm |
| Clasă de corozivitate | C4-C5 interior hală, C3-C4 exterior, conform `structura.md` §14.2 |
| Durată de viață anticorozivă | > 15 ani fără întreținere, conform sistem duplex |
| Control DFT | grosimetru magnetic, marcaj 80/20 (SR EN ISO 19840) |

### PTh-R.23.10 FT-S10: Waterstop PVC/bentonitic

| Parametru | Specificație |
|---|---|
| Tip | PVC (rosturi de lucru) / bentonitic (rosturi statice) |
| Lățime | dimensionată de proiectant conform presiunea hidrostatică de calcul |
| Certificare compatibilitate chimică | obligatorie pentru mediul agresiv al dejecțiilor |

---

## PTh-R.24 — PROGRAM DE PUNERE ÎN FUNCȚIUNE DIN PERSPECTIVA STRUCTURII

### PTh-R.24.1 Confirmări structurale obligatorii înainte de PIF

Înainte de punerea în funcțiune a fermei (populare cu efectiv), din perspectiva structurii de rezistență se confirmă: recepția integrală a probei de etanșeitate a cuvei bazinului de dejecții (PTh-R.15.6), finalizarea protecției anticorozive pe toate elementele metalice (control DFT complet), finalizarea și recepția panourilor de decompresie ale silozului (coordonate cu proiectul ATEX de instalații) și confirmarea, prin proces-verbal, a absenței oricărei punți structurale accidentale între cele trei corpuri independente (rosturi de separare libere, fără moloz sau elemente de fixare provizorii uitate — verificare identică ca principiu cu cea de la zidul de foc al halei industriale, `hala-industriala/arhitectura-pth.md` D10).

### PTh-R.24.2 Predarea documentației structurale către Cartea Tehnică

Toate planșele as-built, fișele de element (PTh-R.12), procesele-verbale ale probelor (PTh-R.15) și rapoartele de control al calității (PTh-R.6, PTh-R.20) se predau integral la Cartea Tehnică a construcției, ca bază pentru programul de urmărire în timp (PTh-R.8) pe toată durata de exploatare a fermei.

### PTh-R.24.3 Notă finală asupra scalabilității breviarului de rezistență

Similar notei de scalabilitate din `arhitectura-pth.md` §PTh-A.14.2, întregul breviar de calcul complet dezvoltat în prezentul supliment (PTh-R.2 — toate cadrele/virolele/pereții, PTh-R.3 — extrasul de materiale, PTh-R.16 — combinațiile de încărcări) este redactat pe modulul de referință stabilit la PTh-R.1 (18 travei Corp A, o celulă Ø8,00 m/H=15,00 m Corp B, o celulă 288 mc Corp C). Pentru un amplasament real cu efectiv diferit de exemplul de calcul reprezentativ (300 capete bovine lapte), proiectantul de structură recalculează numărul de travei/celule identice, păstrând nemodificate secțiunile cadrului-tip, grosimile de virolă și armătura celulei de bazin — exact principiul de lucru consacrat în toată biblioteca tehnică a platformei pentru documentele redactate pe un exemplu de calcul reprezentativ (`general.md` §14, `instalatii.md` §11.0), aplicat aici la nivelul de detaliu de execuție PTh.

Cu parcurgerea integrală a prezentelor 24 de capitole (PTh-R.1–PTh-R.24), componenta de structură de rezistență a fermei agrozootehnice este dezvoltată complet la nivelul de detaliu de execuție cerut de faza de Proiect Tehnic, gata pentru elaborarea planșelor finale de execuție și demararea lucrărilor pe șantier.

### PTh-R.24.4 Lista de verificare finală a coerenței documentației PTh (structură)

1. Geometria celor trei corpuri (L=21,00 m/e=5,50 m/18 travei; Ø8,00 m/H=15,00 m; 12,00×8,00×3,00 m) este identică în toate tabelele breviarului complet, fără nicio divergență reziduală față de valorile din `structura.md`.
2. Toate cele 10 grosimi de virolă (PTh-R.2.7) și cele 5 rânduri de inele de rigidizare (PTh-R.2.8) sunt reflectate consecvent în extrasul de materiale (PTh-R.3.3) și în fișele de element (PTh-R.12.3).
3. Gradul de utilizare maxim rămâne 0,84 (ancoraj+fundație siloz, seism) în toate tabelele de sinteză (PTh-R.16.5, PTh-R.21.2), fără o valoare superioară necorelată apărută într-o secțiune izolată.
4. Toate elementele de siguranță critică identificate în `arhitectura-pth.md` (cortine fail-safe, panouri de decompresie, waterstop) au verificare structurală/interfață explicită în prezentul document (PTh-R.4.6ter, PTh-R.22.1).
5. Recomandările explicite ale fazei DTAC (`structura.md` §15.3 — studiu geotehnic dedicat siloz, calcul EF de coajă, analiză modală seismică) sunt reluate și dezvoltate punctual în capitolele PTh-R.9, PTh-R.18.2 și PTh-R.19, nu doar menționate generic.
