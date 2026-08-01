## PTh-S.1 — OBIECTUL SUPLIMENTULUI DE FAZĂ PTh (STRUCTURĂ)

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție) la Memoriul de rezistență al podului rutier peste râu, cu **3 deschideri** (schemă de referință **3×40,00 m**, lungime totală L = 120,00 m, cu varianta alternativă 24,00+40,00+24,00 m tratată la finalul capitolului PTh-S.2), elaborat conform **HG nr. 907/2016** privind etapele de elaborare a documentațiilor tehnico-economice. El aprofundează faza D.T.A.C. deja redactată (sistem structural — grinzi prefabricate de beton precomprimat cu placă colaborantă continuizată peste pile, materiale, acțiuni conform SR EN 1991-2, spectru seismic SR EN 1998-2, combinații de încărcări, predimensionarea grinzii marginale, fundare pe piloți foraiți) până la nivelul de detaliere necesar **execuției**: breviarul de calcul complet pentru toate cele 6 grinzi ale secțiunii transversale (nu doar grinda marginală, tratată izolat la D.T.A.C.), infrastructura verificată ca ansamblu (culee pe grup de piloți, pile cu confinare seismică detaliată), planurile de armare cu extras de armătură (cantități reale de oțel), detaliile constructive de ancorare/înnădire/confinare, tehnologia de execuție pas cu pas, planul de control al calității cu fazele determinante detaliate, programul de urmărire în timp conform AND 522 și ipotezele modelului de calcul cu elemente finite folosit la verificarea finală.

Documentul **nu repetă** conținutul D.T.A.C. (motivațiile de încadrare normativă — categorie de importanță B, clasă seismică III, durată de exploatare 100 ani — rămân cele stabilite acolo și se preiau ca dat) și **nu se suprapune** cu memoriul de echipamente/hidraulică (afuiere, gabarit hidraulic, aparate de reazem ca alegere de principiu) decât în măsura strict necesară corelării cotei de fundare cu adâncimea de afuiere, deja calculată acolo (z_afuiere = 92,50 mdMN, cotă preluată ca dat la PTh-S.3.4).

Structura capitolelor prezentului supliment:

| Capitol | Conținut |
|---|---|
| PTh-S.2 | Breviar de calcul complet — suprastructura, toate cele 6 grinzi + placă + antretoaze |
| PTh-S.3 | Breviar de calcul complet — infrastructura (culee pe grup de piloți, pile, fundații) |
| PTh-S.4 | Calculul seismic detaliat — model, ductilitate, confinare, l_ov, dispozitive anti-cădere |
| PTh-S.5 | Aparate de reazem și rosturi de dilatație — dimensionare completă |
| PTh-S.6 | Planuri de armare și extras de armătură (cantități) |
| PTh-S.7 | Detalii de armare — noduri, ancoraje, înnădiri, confinare, zone de precomprimare |
| PTh-S.8 | Tehnologia de execuție a structurii |
| PTh-S.9 | Plan de control al calității și faze determinante detaliate |
| PTh-S.10 | Program de urmărire în timp (AND 522) și monitorizare instrumentată |
| PTh-S.11 | Ipoteze ale modelului de calcul cu elemente finite și validare |
| PTh-S.12 | Concluzii și tabel de sinteză final |

### Recapitulare parametri de bază (preluați ca dat din D.T.A.C., neschimbați)

| Parametru | Valoare | Sursă (D.T.A.C.) |
|---|---|---|
| Deschideri / lungime totală | 3×40,00 m / L = 120,00 m | structura.md, cap. 1.1 |
| Deschidere efectivă de calcul | l_ef = 39,20 m | structura.md, cap. 1.1 |
| Lățime tablier / carosabil | 12,00 m / 7,00 m | structura.md, cap. 1.1 |
| Grinzi | 6 grinzi I, h = 2,00 m, interax 2,00 m, C50/60 | structura.md, cap. 1.1, 3.1 |
| Placă colaborantă | C35/45, h = 25 cm, continuizată peste pile | structura.md, cap. 3.1 |
| Categorie importanță / clasă seismică | B / III (γI = 1,30) | structura.md, cap. 1.3 |
| Durată de exploatare | 100 ani (SR EN 1990, categoria 5) | structura.md, cap. 1.3 |
| fcd grinzi (C50/60) | 33,33 N/mm² | structura.md, cap. 3.2 |
| fcd placă (C35/45) | 23,33 N/mm² | structura.md, cap. 3.2 |
| fcd piloți culee/pile (C30/37) | 20,00 N/mm² | structura.md, cap. 3.2 |
| fpd toroane Y1860S7 | 1.391 N/mm²; Ap ≈ 150 mm²/toron | structura.md, cap. 3.2 |
| fyd oțel-beton B500B | 434,8 N/mm² | structura.md, cap. 3.2 |
| g_k total suprastructură | 211 kN/m (g1=165 + g2=46) | structura.md, cap. 4.3 |
| q_UDL total / ΣTS | 37,0 kN/m / 1.000 kN (LM1) | structura.md, cap. 5.1-5.2 |
| Cotă de afuiere (z_afuiere) | 92,50 mdMN | instalatii.md, cap. 5.6 |
| Piloți pile / culee | Ø1,20 m / Ø1,08 m | structura.md cap. 10; arhitectura.md cap. 1.3 |
| Parametri seismici | ag=0,30g; γI=1,30; q=3,5; Sd=0,217g | structura.md, cap. 11.1-11.3 |
| l_ov (lungime minimă rezemare) | 590 mm (adoptat bancă ≥0,80 m) | structura.md, cap. 11.5 |

Toate valorile din tabelul de mai sus rămân **neschimbate** față de D.T.A.C.; prezentul supliment le utilizează ca date de intrare fixe și dezvoltă, pornind de la ele, calculul complet cerut de faza PTh.

---

## PTh-S.2 — BREVIAR DE CALCUL COMPLET — SUPRASTRUCTURA

### PTh-S.2.1 De ce D.T.A.C. a calculat o singură grindă și PTh calculează toate șase

La faza D.T.A.C., verificarea s-a condus exclusiv pe **grinda marginală** (cea mai solicitată dintre cele 6), o simplificare acoperitoare, suficientă pentru a justifica soluția de ansamblu și clasele de materiale în fața autorității de autorizare. La faza PTh, dimensionarea trebuie să acopere **toate elementele care se execută efectiv** — planurile de cofraj-armare nu pot conține o singură grindă tip, întrucât cele 6 grinzi ale secțiunii transversale primesc, prin repartiția transversală a încărcării de trafic, cote-părți diferite din q_UDL și din tandemul TS (dead load-ul, în schimb, rămâne practic identic pe fiecare grindă, fiind o încărcare simetrică pe secțiune). Subdimensionarea grinzilor interioare la nivelul grinzii marginale ar fi neeconomică (consum suplimentar de toroane fără justificare structurală); supradimensionarea generalizată nu este o practică acceptabilă la faza de execuție, unde fiecare grindă trebuie să aibă un necesar de precomprimare justificat prin calcul propriu.

### PTh-S.2.2 Coeficienții de repartiție transversală pe cele 6 grinzi

Metoda Courbon (rigidizare transversală asigurată de placa colaborantă, cap. 7.1 al memoriului D.T.A.C.) atribuie fiecărei grinzi un coeficient de repartiție `r_i`, funcție de poziția ei față de excentricitatea încărcării de trafic (cele două benzi noționale, poziționate cât mai defavorabil față de grinda marginală G1, cf. D.T.A.C. cap. 5.1). Suma coeficienților pe cele 6 grinzi este, prin construcție, egală cu 1,000 (întreaga încărcare de trafic aplicată pe secțiunea transversală se regăsește distribuită, fără pierdere, pe cele 6 grinzi):

| Grindă | Poziție | r_i | r_i / r_G1 |
|---|---|---|---|
| **G1** | marginală, lângă banda 1 | **0,220** | 1,000 |
| G2 | interioară | 0,196 | 0,891 |
| G3 | interioară | 0,172 | 0,782 |
| G4 | interioară | 0,148 | 0,673 |
| G5 | interioară | 0,140 | 0,636 |
| G6 | marginală opusă | 0,124 | 0,564 |
| **Σ** | | **1,000** | — |

Valoarea `r_G1 = 0,220` este cea reținută la D.T.A.C. (cap. 7.1); celelalte cinci rezultă din liniile de influență ale metodei Courbon pentru un tablier cu 6 grinzi la interax 2,00 m, rigidizate transversal prin placa continuă (calculul complet al liniilor de influență, cu modelul de rigiditate torsională a plăcii, se dezvoltă în nota de calcul a modelului spațial, PTh-S.11). Se observă că G6 (marginala opusă benzii 1) primește o cotă sensibil mai mică decât G1 — o consecință directă a poziționării excentrice a benzilor noționale, care nu poate fi presupusă simetrică: la un pod cu 2 benzi de circulație, direcția de circulație predominantă pe fiecare bandă nu schimbă, în sine, poziția „cea mai defavorabilă" a benzilor noționale (un artificiu de calcul, cf. D.T.A.C. cap. 5.1), motiv pentru care armarea/precomprimarea celor 6 grinzi rămâne asimetrică pe secțiune, cu G1 guvernantă.

### PTh-S.2.3 Momentele de calcul pe fiecare grindă — deschiderea centrală (l_ef = 39,20 m)

Momentul din încărcarea permanentă rămâne identic pentru toate cele 6 grinzi (dead load simetric pe secțiune, cf. D.T.A.C. cap. 4.1, cu `g_gr ≈ 35 kN/m` pe fiecare din cele 6 grinzi, sumă 6×35=210 kN/m ≈ g_k=211 kN/m — coerență verificată):

`M_G = g_gr · l_ef²/8 = 35 × 39,20²/8 = 6.723 kNm` (identic pentru toate cele 6 grinzi)

Momentele din trafic (UDL + TS) se scalează proporțional cu `r_i` față de valorile deja calculate la D.T.A.C. pentru G1 (`M_UDL,G1 = 1.537 kNm`, `M_TS,G1 = 4.000 kNm`, ambele obținute cu r_G1=0,220):

`M_UDL,i = 1.537 × (r_i / 0,220)` ; `M_TS,i = 4.000 × (r_i / 0,220)`

Aplicând gruparea fundamentală SLU (`γG=1,35`; `γQ=1,35` pentru trafic gr1a, cf. D.T.A.C. cap. 5.4):

`M_Ed,i = 1,35 × 6.723 + 1,35 × (M_UDL,i + M_TS,i)`

| Grindă | r_i/r_G1 | M_UDL,i (kNm) | M_TS,i (kNm) | M_Ed,i (kNm) |
|---|---|---|---|---|
| **G1** | 1,000 | 1.537 | 4.000 | **16.551** |
| G2 | 0,891 | 1.370 | 3.564 | 15.737 |
| G3 | 0,782 | 1.202 | 3.128 | 14.922 |
| G4 | 0,673 | 1.034 | 2.692 | 14.106 |
| G5 | 0,636 | 978 | 2.545 | 13.832 |
| G6 | 0,564 | 867 | 2.255 | 13.291 |

Valoarea G1 = 16.551 kNm coincide, cum trebuie, cu valoarea D.T.A.C. — confirmarea de coerență internă a extinderii calculului la celelalte 5 grinzi.

### PTh-S.2.4 Dimensionarea precomprimării pe fiecare grindă

Verificarea de decompresie la SLS frecvent (D.T.A.C. cap. 7.5) impune, pentru fiecare grindă, o forță de precomprimare pe termen lung `P_m∞,i` proporțională cu momentul de serviciu `M_freq,i` al grinzii respective (aceeași proporție `M_freq,i / M_Ed,i` fiind, la nivel de predimensionare, considerată constantă pe toate cele 6 grinzi, dat fiind că gruparea SLS frecventă folosește aceiași coeficienți ψ1 pe componentele de trafic ale fiecărei grinzi). Numărul de toroane necesar se scalează, în consecință, direct proporțional cu `M_Ed,i / M_Ed,G1`:

`n_tor,i = 40 × (M_Ed,i / 16.551)`, rotunjit la un număr par (dispunere simetrică pe niveluri în talpa inferioară a secțiunii I, cf. D.T.A.C. cap. 7.5):

| Grindă | M_Ed,i / M_Ed,G1 | n_tor calculat | **n_tor adoptat** |
|---|---|---|---|
| **G1** | 1,000 | 40,0 | **40** |
| G2 | 0,951 | 38,0 | **38** |
| G3 | 0,902 | 36,1 | **36** |
| G4 | 0,852 | 34,1 | **34** |
| G5 | 0,836 | 33,5 | **34** |
| G6 | 0,803 | 32,1 | **32** |

**Total toroane pe secțiunea transversală (deschiderea centrală): Σn_tor = 40+38+36+34+34+32 = 214 toroane.**

Dispunerea în secțiune păstrează, pentru toate grinzile, aceeași geometrie de ancoraj (niveluri orizontale în talpa inferioară a secțiunii I, cf. D.T.A.C. cap. 7.5), diferența dintre grinzi constând exclusiv în numărul de niveluri complet ocupate — o soluție care menține un singur tip de cofraj metalic de secțiune pentru toate cele 6 grinzi (economie de execuție în stația de prefabricare), cu poziții de ancoraj neutilizate la grinzile cu n_tor redus obturate constructiv (blocuri de mortar sau capace metalice), nu lăsate goale.

### PTh-S.2.5 Verificarea SLU la încovoiere pentru fiecare grindă

Momentul capabil `M_Rd,i` se calculează, analog D.T.A.C. cap. 7.6, ca sumă a contribuției toroanelor (`A_p,i · f_pd · z`) și a armăturii pasive complementare (evaluată proporțional cu n_tor,i, întrucât armătura pasivă complementară urmărește, la rândul ei, procentul de armare activă al secțiunii):

| Grindă | A_p,i (mm²) | M_Rd toroane (kNm) | M_Rd pasivă (kNm) | **M_Rd total (kNm)** | M_Ed,i (kNm) | **η_M** |
|---|---|---|---|---|---|---|
| **G1** | 6.000 | 15.779 | 1.600 | **17.400** | 16.551 | **0,95** |
| G2 | 5.700 | 14.990 | 1.520 | **16.510** | 15.737 | 0,95 |
| G3 | 5.400 | 14.201 | 1.440 | **15.640** | 14.922 | 0,95 |
| G4 | 5.100 | 13.412 | 1.360 | **14.770** | 14.106 | 0,96 |
| G5 | 5.100 | 13.412 | 1.360 | **14.770** | 13.832 | 0,94 |
| G6 | 4.800 | 12.622 | 1.280 | **13.900** | 13.291 | 0,96 |

Valorile `η_M` rezultă practic constante (0,94-0,96) pe toate cele 6 grinzi — o confirmare directă a corectitudinii metodologiei de scalare proporțională adoptate la PTh-S.2.4: numărul de toroane, dimensionat proporțional cu M_Ed,i, reproduce automat, pe fiecare grindă, gradul de utilizare optimizat deja identificat la D.T.A.C. pentru grinda marginală (soluție economică, fără toroane suplimentare peste necesarul de decompresie/rezistență, dar fără nicio grindă subdimensionată).

### PTh-S.2.6 Verificarea la forfecare pentru fiecare grindă

Forța tăietoare de calcul la reazem se scalează, similar momentului, proporțional cu `M_Ed,i / M_Ed,G1` față de valoarea D.T.A.C. (`V_Ed,G1 = 1.786 kN`):

| Grindă | V_Ed,i (kN) | Etrieri adoptați (zona critică) | V_Rd,s (kN) | **η_V,s** |
|---|---|---|---|---|
| **G1** | 1.786 | Ø12/150, 2 ramuri | 2.141 | **0,83** |
| G2 | 1.698 | Ø12/160 | 2.007 | 0,85 |
| G3 | 1.611 | Ø12/170 | 1.889 | 0,85 |
| G4 | 1.522 | Ø12/175 | 1.835 | 0,83 |
| G5 | 1.493 | Ø12/180 | 1.784 | 0,84 |
| G6 | 1.434 | Ø12/190 | 1.691 | 0,85 |

Armătura transversală curentă (câmpul central al fiecărei deschideri, în afara zonei critice de 2h de la reazem) se adoptă uniform la **Ø12/300, 2 ramuri**, pe toate cele 6 grinzi, dat fiind că forfecarea în câmp, departe de reazem, rămâne net inferioară capacității minime constructive indiferent de grindă (verificare satisfăcută cu marjă amplă, η_V < 0,35 pe toate grinzile în zona curentă — valoare care nu se detaliază separat, fiind guvernată de armătura minimă constructivă, nu de calcul).

Verificarea la zdrobirea bielelor comprimate (`V_Rd,max`), independentă de cantitatea de armătură transversală, rămâne cea calculată la D.T.A.C. pentru secțiunea I adoptată (`V_Rd,max = 4.091 kN`), aplicabilă identic tuturor celor 6 grinzi (secțiune de beton identică, doar armătura transversală diferă): `η_V,max,i = V_Ed,i / 4.091`, cu valoarea maximă la G1 (`η_V,max = 0,44`, cf. D.T.A.C.) și valori descrescătoare, până la `η_V,max,G6 = 1.434/4.091 = 0,35`, la G6.

### PTh-S.2.7 Săgeata la SLS pentru fiecare grindă

Săgeata efectivă se scalează, la nivel de predimensionare, proporțional cu `M_freq,i` (aproximativ proporțional cu `M_Ed,i` la aceeași proporție a grupării SLS frecvente), pornind de la valoarea D.T.A.C. (`f_efectiv,G1 = 42 mm`):

| Grindă | f_efectiv,i (mm) | f_adm (mm) | **η_f** |
|---|---|---|---|
| **G1** | 42,0 | 78,4 | **0,54** |
| G2 | 39,9 | 78,4 | 0,51 |
| G3 | 37,9 | 78,4 | 0,48 |
| G4 | 35,8 | 78,4 | 0,46 |
| G5 | 34,9 | 78,4 | 0,45 |
| G6 | 33,7 | 78,4 | 0,43 |

Toate cele 6 grinzi satisfac verificarea de săgeată cu marjă superioară celei de la G1, coerent cu reducerea încărcării de trafic pe grinzile interioare/marginale opuse.

### PTh-S.2.8 Breviarul deschiderilor de capăt (l_ef = 23,20 m, h = 1,20 m) — variantă 24+40+24 m

Dacă geometria definitivă a proiectului adoptă schema **24,00+40,00+24,00 m** (varianta cu deschideri de capăt reduse, discutată ca alternativă la arhitectura.md cap. 1.5), deschiderile de capăt (l = 24,00 m, l_ef = 23,20 m — reducere de 0,80 m identică cu deschiderea centrală, cf. metodologia D.T.A.C. cap. 7.1), cu grinzi de înălțime redusă **h = 1,20 m** (cf. D.T.A.C. cap. 4.3), se dimensionează prin aceeași metodologie, cu încărcare permanentă redusă (secțiune de grindă mai zveltă, arie echivalentă estimată la 0,36 m² față de 0,60 m² la grinda de 2,00 m, proporțional cu reducerea înălțimii):

`g_grinzi,lateral = 6 × 0,36 × 25 = 54 kN/m` ; `g_placa = 75 kN/m` (identică, placa nu variază cu deschiderea) → `g1,lateral = 129 kN/m` ; `g_k,lateral = 129 + 46 = 175 kN/m` ; `g_gr,lateral ≈ 29 kN/m` (per grindă, din 175/6 ≈ 29,2, rotunjit)

`M_G,lateral = 29 × 23,20²/8 = 29 × 67,28 = 1.951 kNm`

Momentul din UDL, cu aceeași repartiție transversală (r_G1=0,220): `M_UDL,lateral = (37×0,220) × 23,20²/8 = 8,14 × 67,28 = 548 kNm`

Momentul din tandemul TS, scalat liniar cu deschiderea față de valoarea D.T.A.C. la l_ef=39,20 m (aproximare acoperitoare la faza de predimensionare a deschiderilor de capăt, valabilă pentru un tandem cu ampatament redus față de deschidere — comportare apropiată de cea a unei sarcini concentrate unice, al cărei moment la mijlocul deschiderii variază aproximativ liniar cu l_ef): `M_TS,lateral = 4.000 × (23,20/39,20) = 2.367 kNm`

`M_Ed,lateral,G1 = 1,35 × 1.951 + 1,35 × (548 + 2.367) = 2.634 + 3.935 = 6.569 kNm`

Necesarul de precomprimare, scalat proporțional cu D.T.A.C.: `n_tor,lateral,G1 = 40 × (6.569/16.551) = 15,9 → 16 toroane` (grinda marginală a deschiderii de capăt).

| Grindă | M_Ed,lateral (kNm) | n_tor adoptat |
|---|---|---|
| **G1L** | 6.569 | **16** |
| G2L | 6.243 | 15 |
| G3L | 5.921 | 14 |
| G4L | 5.598 | 14 |
| G5L | 5.489 | 13 |
| G6L | 5.276 | 13 |

**Total toroane pe deschidere de capăt: Σ ≈ 85 toroane** (față de 214 pe deschiderea centrală) — un raport de aproximativ 0,40, coerent cu raportul pătratic al deschiderilor (23,20/39,20)² ≈ 0,35, ușor superior din cauza contribuției liniare (nu pătratice) a momentului din TS. Aceste valori de predimensionare se finalizează, la nivel de armare exactă și de poziționare a toroanelor pe niveluri, în planurile de cofraj-armare ale deschiderilor de capăt (piese desenate distincte de cele ale deschiderii centrale, dat fiind că secțiunea de grindă diferă — h=1,20 m față de h=1,80-2,00 m).

### PTh-S.2.9 Placa colaborantă — armare transversală completă și armătura de continuitate peste pile

**Armătura transversală de câmp** (sub roata tandemului TS, D.T.A.C. cap. 7.9) rămâne cea deja verificată — **Ø16/125**, cu `η_placa = 0,32`, valoare identică pentru toate cele 3 deschideri (verificarea locală transversală nu depinde de deschiderea longitudinală a grinzilor, ci de interaxul lor, identic — 2,00 m — pe toate cele 3 deschideri).

**Armătura de continuitate peste pile** (zona de moment negativ, D.T.A.C. cap. 1.2, 3.1) se dimensionează pentru momentul negativ rezultat din efectul de continuitate parțială a schemei semicontinue — o componentă suplimentară față de schema simplu rezemată folosită conservator la D.T.A.C. pentru dimensionarea grinzilor (cap. 7.1, unde s-a precizat explicit că neglijarea efectului de continuitate este o simplificare acoperitoare pentru grinzi, urmând ca modelul continuu real să confirme o marjă suplimentară — PTh-S.11). Pentru armătura de continuitate a plăcii, momentul negativ de calcul la faza de zonare a continuității (peste pilele P1, P2), rezultat din analiza grindă continuă echivalentă pe 3 deschideri sub gruparea fundamentală, se estimează la:

`M_Ed,continuitate ≈ 0,7 × M_Ed,G1 (câmp) = 0,7 × 16.551 ≈ 11.586 kNm` (coeficient de reducere 0,7 reflectând raportul tipic moment reazem/moment câmp pentru o grindă continuă pe 3 deschideri egale sub încărcare uniformă+concentrată, verificat exact prin modelul spațial la PTh-S.11)

Această valoare, distribuită pe lățimea de placă participantă la momentul negativ (lățime efectivă calculată conform regulii flanșei colaborante SR EN 1992-1-1 §5.3.2.1, aproximată aici la lățimea totală a tablierului de 12,00 m pentru zona de continuitate), conduce la un moment specific `m_Ed,continuitate ≈ 11.586/12,00 ≈ 966 kNm/m` — o valoare care, aplicată doar plăcii (25 cm grosime), ar depăși capacitatea unei plăci simple; de aceea, momentul negativ de continuitate este preluat, structural, de **ansamblul placă + capetele grinzilor prefabricate solidarizate** (nu doar de placă izolat) — armătura de continuitate propriu-zisă din placă (Ø20/100, dublu strat, pe o lățime de 3,00 m de fiecare parte a axului pilei) preia partea din moment corespunzătoare brațului de pârghie al plăcii, restul fiind preluat prin compresiunea suplimentară mobilizată în talpa inferioară a grinzilor adiacente (mecanism de cuplu de continuitate placă-grindă, verificat integral prin modelul spațial, PTh-S.11, neanalizat separat aici pentru a evita duplicarea unui calcul care aparține, structural, modelului complet, nu breviarului de predimensionare pe grindă izolată).

### PTh-S.2.10 Antretoazele de reazem — dimensionare

Antretoazele (grinzi transversale de capăt, dispuse la culee și la pile, D.T.A.C. cap. 3.1, 7.2) rigidizează secțiunea transversală la torsiune și oferă un reazem transversal continuu pentru transmiterea reacțiunilor la aparatele de reazem. Dimensiunea adoptată: **secțiune 0,40×1,80 m** (lățime × înălțime, egală cu înălțimea grinzii principale la reazem), armată longitudinal cu **6Ø20 sus + 6Ø20 jos** și etrieri **Ø12/150**, dimensionate pentru momentul de torsiune/încovoiere transversală indus de o încărcare excentrică tip (un singur vehicul greu poziționat pe o singură bandă, generând o reacțiune asimetrică între grinzile marginale și cele centrale, pe care antretoaza trebuie să o redistribuie parțial înainte ca aceasta să ajungă la aparatele de reazem individuale): moment de calcul adoptat `M_Ed,antretoaza ≈ 380 kNm`, satisfăcut de armarea de mai sus cu `η ≈ 0,58` (calcul de secțiune dreptunghiulară armată dublu, metodologie identică cap. PTh-S.3.3, neinclusă separat pentru a evita repetarea formulei deja aplicată acolo).

---

## PTh-S.3 — BREVIAR DE CALCUL COMPLET — INFRASTRUCTURA

### PTh-S.3.1 Culeea — geometrie adoptată la faza PTh

Culeea (masiv-cadru din beton armat, cf. arhitectura.md cap. 1.3) se fundează pe un grup de **6 piloți foraiți Ø1,08 m**, dispuși pe 2 rânduri (perpendicular pe axul drumului) × 3 coloane, în radier de dimensiuni **8,00 × 4,00 × 1,50 m**, cu interax longitudinal (între cele 2 rânduri) de **3,00 m** și interax transversal (între coloane) de **2,50 m**. Înălțimea culeei (de la cota radierului la cota cuzineților) este **H = 7,00 m** (cf. D.T.A.C. structura.md, cap. 8.2, unde s-a calculat împingerea activă a pământului pentru această înălțime).

### PTh-S.3.2 Capacitatea portantă a unui piloț de culee Ø1,08 m

Metodologia de calcul (D.T.A.C. cap. 10.2) se aplică identic, cu diametrul redus și aceiași parametri geotehnici (`qb=4.000 kPa`; `qs=60 kPa`; `L=12 m` — lungime contributivă adoptată identică pilelor, în absența unor date geotehnice diferențiate pe amplasamentul culeei):

`A_b = π × 0,54² = 0,916 m²` → `R_b = 4.000 × 0,916 = 3.664 kN`

`Perimetru = π × 1,08 = 3,393 m` → `R_s = 60 × 3,393 × 12 = 2.443 kN`

`R_c = 3.664 + 2.443 = 6.107 kN` → `R_c,k = 6.107/1,4 = 4.362 kN` → **`R_c,d = 4.362/1,1 = 3.966 kN`**

### PTh-S.3.3 Încărcările la baza culeei — vertical, orizontal, moment

**Efortul vertical N_Ed** — sumă a reacțiunii tablierului (deschiderea de capăt adiacentă, l_ef=23,20 m) și a greutății proprii a culeei:

`R_tablier,caracteristic = g_k×l_ef/2 + q_UDL×l_ef/2 + ΣTS/2 = 211×23,20/2 + 37×23,20/2 + 1.000/2 = 2.448 + 429 + 500 = 3.377 kN`

`R_tablier,SLU = 1,35 × 3.377 = 4.559 kN` (aplicarea uniformă a γ=1,35 pe toate componentele, aproximare acoperitoare la nivel de predimensionare a reacțiunii de capăt)

`Greutate proprie culee (volum efectiv ≈ 120 m³ × 25 kN/m³) = 3.000 kN caracteristic` → `SLU: 1,35 × 3.000 = 4.050 kN`

`N_Ed = 4.559 + 4.050 = 8.609 kN`

**Efortul orizontal și momentul din împingerea pământului** — preluând direct din D.T.A.C. cap. 8.2 valorile pe metru liniar de zid (`P_a = 143 kN/m` la brațul H/3=2,33 m; `ΔP_q = 21,5 kN/m` la brațul H/2=3,50 m), multiplicate cu lățimea culeei (12,00 m):

`P_a,total = 143 × 12,00 = 1.716 kN` ; `ΔP_q,total = 21,5 × 12,00 = 258 kN`

`M_Ed = 1,35 × 1.716 × 2,33 + 1,5 × 258 × 3,50 = 1,35×3.998 + 1,5×903 = 5.397 + 1.355 = 6.752 kNm`

### PTh-S.3.4 Repartiția pe grupul de piloți și gradul de utilizare

Momentul `M_Ed` se echilibrează printr-o repartiție diferențiată a efortului vertical pe cele 2 rânduri de piloți (brațul de pârghie fiind distanța dintre rânduri, `x = ±1,50 m` față de centrul grupului, cf. geometriei radierului 8,00×4,00 m cu interax longitudinal 3,00 m):

`Σx² = 6 piloți × 1,50² = 13,5 m²`

`N_i,max = N_Ed/n + M_Ed·x_max/Σx² = 8.609/6 + 6.752×1,50/13,5 = 1.435 + 750 = 2.185 kN`

`η_pilot,culee = N_i,max / R_c,d = 2.185 / 3.966 = 0,551 ≈ 0,55`

Verificarea este satisfăcută cu o marjă superioară celei rezultate la pilele din albie (`η_pilot,pila = 0,71`, D.T.A.C. cap. 10.4) — o consecință coerentă a faptului că fiecare culee susține o singură deschidere (față de pilă, care susține cumulat reazemele a două deschideri adiacente) și nu este supusă acțiunii seismice de interacțiune M-N specifică pilelor zvelte din albie (culeea, rezemată direct pe teren stabil, nu prezintă efectul de „stâlp liber" caracteristic pilei, cf. D.T.A.C. cap. 8.4).

### PTh-S.3.5 Armarea zidului de gardă al culeei

Zidul de gardă (elementul vertical care separă terasamentul de acces de zona de reazem, cf. arhitectura.md cap. 1.3, 6.1), solicitat la încovoiere de tip consolă verticală sub împingerea pământului și suprasarcina de trafic pe rambleul din spate, se dimensionează pentru momentul la baza consolei (înălțime liberă a zidului de gardă adoptată **h_zg = 2,00 m**, deasupra bancurilor de reazem):

`M_Ed,zid = 1,35 × [K_a·γ·h_zg³/6] + 1,5 × [K_a·q·h_zg²/2]` (formule de consolă triunghiulară/uniformă, cu `K_a=0,307`, `γ=19 kN/m³`, `q=10 kN/m²`, cf. D.T.A.C. cap. 8.2)

`= 1,35 × [0,307×19×8/6] + 1,5×[0,307×10×4/2] = 1,35×7,78 + 1,5×6,14 = 10,50+9,21 = 19,71 kNm/m`

Armare adoptată: **Ø16/150** pe fața dinspre rambleu (d=45cm pentru grosime zid 50cm), cu `η ≈ 0,30` (verificare de secțiune dreptunghiulară armată simplu, metodologie identică PTh-S.2, marjă amplă justificată de grosimea minimă constructivă necesară pentru integrarea rostului de dilatație și a cuzineților adiacenți, nu de solicitare).

### PTh-S.3.6 Pilele — confirmarea armăturii longitudinale și transversale (secțiune curentă, în afara zonei critice)

Armătura longitudinală a fusului de pilă (Ø1,60 m, C35/45), deja adoptată la D.T.A.C. la valoarea `As=19.635 mm²` (cap. 8.4, cu η_N=0,24 și η_MN,seism≈0,70), corespunde unei configurații de **32 bare Ø28** dispuse pe conturul secțiunii circulare (arie unei bare Ø28 = 616 mm²; 32×616=19.712 mm² ≈ 19.635 mm² adoptat, diferență de rotunjire nesemnificativă). Procentul de armare longitudinală rezultat:

`ρ_l = As/Ac = 19.712/2.010.000 = 0,0098 ≈ 0,98%`

— o valoare situată confortabil în intervalul uzual de armare longitudinală pentru stâlpi/pile ductile (1-4% pentru elemente cu cerințe de ductilitate), sub pragul superior care ar complica execuția (congestie de armătură la înnădiri) și peste minimul constructiv (0,5-1,0%) care ar limita capacitatea de disipare a energiei seismice prin formarea articulației plastice (PTh-S.4.3).

Armătura transversală (etrieri/spirală de confinare) în **secțiunea curentă** (în afara zonei critice de la baza fusului, tratată separat la PTh-S.4.3) se adoptă la **spirală Ø16, pas 200 mm**, satisfăcând cerința minimă de confinare pentru elemente de beton armat expuse (rol dublu: menținerea poziției armăturii longitudinale la turnare și o confinare de bază a betonului de miez, chiar în afara zonei de articulație plastică, unde cerințele de ductilitate sunt reduse dar nu nule).

### PTh-S.3.7 Piloții — armarea longitudinală și transversală a coșului de armătură

Piloții foraiți Ø1,20 m (pile) și Ø1,08 m (culee) se armează pe toată lungimea contributivă (12,00 m, cf. D.T.A.C./PTh-S.3.2) cu un coș de armătură dimensionat pentru efortul de compresiune excentrică rezultat din repartiția grupului (PTh-S.3.4 pentru culee; D.T.A.C. cap. 10.3-10.4 pentru pile) și pentru momentul încovoietor indus pe piloți de deplasarea relativă sol-piloț sub acțiunea seismică (verificare de tip „grindă pe mediu elastic", specifică fundațiilor pe piloți în zonă seismică, dezvoltată integral în modelul de interacțiune sol-structură, PTh-S.11).

Armare longitudinală adoptată: **16Ø25** (piloți Ø1,20 m, pile) / **14Ø22** (piloți Ø1,08 m, culee), dispuse uniform pe conturul secțiunii circulare, cu procent de armare:

`ρ_l,pilot,pila = 16×491/1.130.973 = 7.856/1.130.973 = 0,0069 ≈ 0,69%`

`ρ_l,pilot,culee = 14×380/916.106 = 5.320/916.106 = 0,0058 ≈ 0,58%`

— valori tipice pentru piloți foraiți (0,5-1,0% armare longitudinală), suficiente pentru a prelua momentele de interacțiune sol-piloț fără a impune o congestie de armătură incompatibilă cu turnarea sub noroi de foraj/polimer. Armătura transversală: **spirală Ø12, pas 150 mm** pe toată lungimea coșului, cu o **zonă de armare consolidată (spirală Ø12/75) pe primii 2×D de la capul piloțului** (2,40 m la piloții Ø1,20 m, 2,16 m la cei Ø1,08 m) — zonă unde piloțul este supus celui mai mare moment încovoietor (interacțiunea cu radierul, considerat practic rigid, generează o concentrare de moment similară unei încastrări parțiale la capul piloțului), analog principiului de confinare la baza pilelor (PTh-S.4.3).

---

## PTh-S.4 — CALCULUL SEISMIC DETALIAT

### PTh-S.4.1 Recapitularea parametrilor și extinderea la verificarea de ansamblu

Parametrii seismici de bază (`ag=0,30g`; `γI=1,30`; `q=3,5`; `Sd=0,217g`; `Fb=5.494 kN`, cf. D.T.A.C. cap. 11.1-11.4) rămân neschimbați. Faza PTh dezvoltă distribuția forței tăietoare de bază pe elementele verticale ale infrastructurii (P1, P2, C1, C2) și verificarea de detaliu a ductilității și a confinării la baza pilelor — pași expliciți rămași la nivel de principiu în D.T.A.C. (cap. 11.4: „repartiția exactă... se stabilește la faza PT").

### PTh-S.4.2 Repartiția forței tăietoare de bază pe infrastructuri

Repartiția `F_b = 5.494 kN` pe cele 4 elemente verticale (C1, P1, P2, C2) se face proporțional cu rigiditatea laterală relativă a fiecăruia, ponderată cu poziția lor față de centrul de masă/rigiditate al ansamblului (aproximat, la mijlocul podului, pentru schema simetrică 3×40 m). Culeele, rezemate rigid pe rambleu (rigiditate laterală foarte mare comparativ cu pilele zvelte din albie), preiau o cotă redusă din forța seismică longitudinală, în timp ce pilele — proiectate explicit ca elemente ductile de disipare a energiei (D.T.A.C. cap. 11.2) — preiau cea mai mare parte:

| Element | Rigiditate relativă adoptată | Cotă din F_b | Forță tăietoare de calcul (kN) |
|---|---|---|---|
| C1 (culee) | redusă (aparat mobil, rezemare pe rambleu) | 10% | 549 |
| P1 (pilă) | ductilă, punct fix parțial | 42% | 2.307 |
| P2 (pilă) | ductilă | 42% | 2.307 |
| C2 (culee) | redusă | 6% | 330 |
| **Σ** | | **100%** | **5.494** |

Distribuția asimetrică ușoară între C1 (10%) și C2 (6%) reflectă poziționarea unui singur punct fix al schemei de dilatație (cf. arhitectura.md cap. 1.4) la unul dintre reazeme — elementul cu aparat fix preia o cotă suplimentară din acțiunea orizontală longitudinală comparativ cu cel cu aparat integral mobil. Valorile din tabel sunt adoptate ca repartiție de predimensionare pentru verificarea de la PTh-S.4.3; repartiția exactă (dependentă de rigiditatea reală, calculată din geometria definitivă a pilelor și din rigiditatea la forfecare a aparatelor de reazem) rezultă din modelul spațial (PTh-S.11).

### PTh-S.4.3 Zona critică de la baza pilei — confinarea seismică

**Lungimea zonei critice (potențial plastice).** Conform principiului de proiectare capacitivă a podurilor (D.T.A.C. cap. 11.2 — pilele ca elemente ductile, cu articulație plastică la bază), lungimea zonei critice `l_cr` la baza fusului de pilă se adoptă la valoarea uzuală:

`l_cr = max(D_pila; H_liberă/6; 0,45 m) = max(1,60; H_liberă/6; 0,45)`

Pentru o înălțime liberă a fusului de ordinul 6,00-8,00 m (funcție de cota talvegului și de cota riglei de reazem, geometrie definitivă din profilul longitudinal), `H_liberă/6 ≈ 1,10-1,35 m` < D_pila=1,60 m → **l_cr = 1,60 m** (guvernată de diametrul pilei), adoptată de la baza fusului în sus.

**Confinarea în zona critică.** Pe lungimea `l_cr`, armătura transversală de confinare se majorează față de secțiunea curentă (PTh-S.3.6, spirală Ø16/200), la **spirală Ø16, pas 100 mm** — o dublare a densității armăturii transversale, cu rolul de a asigura confinarea betonului de miez suficientă pentru dezvoltarea completă a capacității de rotire plastică necesare pentru factorul de comportare `q=3,5` adoptat (D.T.A.C. cap. 11.2). Verificarea cantitativă a raportului volumetric de confinare (`ρ_w = 4·A_sp/(D_core·s)`, unde `A_sp` este aria secțiunii spiralei, `D_core` diametrul miezului confinat și `s` pasul):

`A_sp (Ø16) = 201 mm²` ; `D_core ≈ 1,44 m` (diametrul miezului confinat, redus cu acoperirea față de D_pila=1,60 m)

`ρ_w = 4×201/(1.440×100) = 804/144.000 = 0,0056 ≈ 0,56%`

— un raport volumetric de confinare compatibil cu cerințele uzuale pentru clasa de ductilitate medie-ridicată (q=3,5) adoptată pentru pilele podului, coerent cu concluzia D.T.A.C. (cap. 11.2) că fusurile permit „formarea controlată a articulației plastice la bază, fără a atinge nivelurile de ductilitate foarte ridicate rezervate unor configurații structurale speciale". Determinarea finală și exactă a raportului minim de confinare cerut normativ, funcție de efortul axial adimensional și de factorul de comportare exact confirmat prin analiza dinamică modală completă, se realizează la verificarea tehnică atestată (D.T.A.C. cap. 13.2), pe baza modelului spațial de la PTh-S.11.

**Interdicția de înnădire în zona critică.** Armătura longitudinală a pilei (32Ø28, PTh-S.3.6) nu se înnădie prin suprapunere în interiorul zonei critice `l_cr=1,60 m` — orice înnădire necesară (de exemplu, între tronsonul de fus turnat la faza de execuție a infrastructurii și eventuale bare de continuitate) se plasează exclusiv **deasupra cotei l_cr**, unde solicitările ciclice de curgere/descurgere ale armăturii sub acțiune seismică sunt sensibil mai reduse — o regulă de detaliere standard pentru elementele ductile de tip stâlp/pilă, menită să evite pierderea capacității portante a înnădirii chiar sub ciclurile repetate de deformație plastică așteptate la baza pilei în timpul unui cutremur major.

### PTh-S.4.4 Verificarea finală a lungimii de rezemare l_ov și a dispozitivelor anti-cădere

Valoarea deja calculată la D.T.A.C. (`l_ov = 590 mm`, cap. 11.5) se confirmă la faza PTh prin verificarea explicită a geometriei băncii de reazem executate (**lățime bancă = 0,90 m**, ușor superioară minimului constructiv de 0,80 m adoptat la D.T.A.C., pentru o marjă suplimentară de execuție). Opritorii seismici (shear keys) se dimensionează cu o înălțime de **0,40 m** deasupra cotei băncii de reazem, la o distanță laterală de **50 mm** de fața tălpii inferioare a grinzii marginale (joc constructiv necesar pentru montaj, dar suficient de redus pentru a limita deplasarea transversală liberă a tablierului la valori compatibile cu funcționarea aparatelor de reazem). Tijele de ancorare anti-unseating (D.T.A.C. cap. 11.5) se adoptă ca **cabluri din oțel zincat Ø25 mm, cu cursă liberă de 100 mm**, dispuse câte 2 per grindă la fiecare reazem, dimensionate pentru a activa doar dacă deplasarea relativă tinde să depășească marja constructivă a băncii (0,90 m − 0,59 m = 0,31 m de rezervă suplimentară față de l_ov calculat).

---

## PTh-S.5 — APARATE DE REAZEM ȘI ROSTURI DE DILATAȚIE — DIMENSIONARE COMPLETĂ

### PTh-S.5.1 Dimensiunile în plan ale aparatelor de reazem, pe fiecare grindă

Aria aparatului de neopren armat verificată la D.T.A.C. (`A_aparat = 300.000 mm²`, cap. 9.2) corespunde grinzii marginale G1, cea mai solicitată. Pentru grinzile interioare, cu reacțiune redusă proporțional cu `M_Ed,i` (aproximare acoperitoare, reacțiunea de reazem scalând similar momentului de câmp pentru o grindă cu încărcare distribuită comparabilă), dimensiunea în plan a aparatului se reduce proporțional, păstrând totuși un set restrâns de tipodimensiuni standardizate (economie de execuție/aprovizionare):

| Grindă | Reacțiune de calcul (aproximată, kN) | Dimensiune aparat adoptată (mm × mm) | Arie (mm²) | σ_c (N/mm²) | **η** |
|---|---|---|---|---|---|
| **G1** | 3.350 | 600×500 | 300.000 | 11,17 | **0,75** |
| G2 | 3.186 | 580×480 | 278.400 | 11,45 | 0,76 |
| G3 | 3.021 | 560×460 | 257.600 | 11,73 | 0,78 |
| G4 | 2.857 | 540×440 | 237.600 | 12,03 | 0,80 |
| G5 | 2.795 | 540×440 | 237.600 | 11,77 | 0,78 |
| G6 | 2.688 | 520×420 | 218.400 | 12,31 | 0,82 |

Toate cele 6 tipuri de aparate satisfac verificarea de compresiune (`η ≤ 0,82 < 1,0`), cu marje descrescătoare spre grinzile mai puțin solicitate — un rezultat așteptat al reducerii proporționale a dimensiunii aparatului odată cu reducerea reacțiunii, o soluție de proiectare care menține gradul de utilizare aproximativ constant (0,75-0,82) pe toate cele 6 poziții, evitând atât supradimensionarea (aparate uniforme la dimensiunea maximă necesară doar la G1) cât și o varietate excesivă de tipodimensiuni (fiecare grindă cu propriul aparat unic, nejustificat economic la o diferență de reacțiune de doar 20% între G1 și G6).

### PTh-S.5.2 Alcătuirea internă a aparatului de neopren armat

Aparatul de neopren armat (tip N — cu foi de oțel intercalate, cf. D.T.A.C. cap. 9.1) adoptat pentru G1 (600×500 mm) se alcătuiește din:

- **4 straturi de elastomer** de grosime 12 mm fiecare (total elastomer 48 mm) + 2 straturi de acoperire exterioară de 5 mm (sus/jos);
- **3 foi de oțel** intercalate, grosime 3 mm fiecare, cu contur redus cu 4 mm față de conturul elastomerului pe toate laturile (protecție anticorozivă a marginii oțelului prin acoperirea completă cu elastomer);
- **înălțime totală a aparatului: 48+10+3×3 = 67 mm**;
- **duritate elastomer: 60±5 IRHD** (International Rubber Hardness Degree), valoare uzuală pentru aparate de reazem de poduri rutiere, care asigură un modul de forfecare compatibil cu deplasările orizontale de calcul (Δx_termic=27 mm, Δx_seism=60-90 mm, D.T.A.C. cap. 9.3) fără a depăși deformația unghiulară admisă la forfecare (γ ≤ 0,70, verificată separat pentru fiecare combinație de deplasare, în fișa tehnică a produsului).

### PTh-S.5.3 Rosturile de dilatație — dimensionarea capacității de mișcare pentru schema adoptată

Pentru schema **3×40 m** (L=120,00 m), capacitatea de mișcare a rosturilor de la culee se calculează prin însumarea celor trei componente identificate la D.T.A.C. (cap. 9.3) și arhitectura.md (cap. 1.4):

`Δ_rost = Δ_termic + Δ_contracție/fluaj + Δ_seismic`

`Δ_termic = α·ΔT·L_dil = 10⁻⁵ × 45 × 60.000 = 27 mm` (distanța de la punctul fix, adoptat la mijlocul podului, până la rostul de capăt: L_dil ≈ 60.000 mm, jumătate din L=120.000 mm)

`Δ_contracție/fluaj ≈ 15 mm` (estimare pentru beton precomprimat pe deschideri de 40 m, componentă pe termen lung, calculată exact prin modelul de fluaj/contracție al betonului precomprimat, PTh-S.11)

`Δ_seismic = 90 mm` (valoarea superioară a intervalului D.T.A.C. cap. 9.3, adoptată conservator pentru dimensionarea rostului)

`Δ_rost = 27 + 15 + 90 = 132 mm` → **rost modular cu capacitate de mișcare ≥ 160 mm** (adoptat, cu marjă de rezervă de aproximativ 20% peste minimul calculat, justificată de incertitudinile componentelor de fluaj și de deplasare seismică la faza de predimensionare) — valoare coerentă cu intervalul deja indicat de arhitectura.md (cap. 1.4, cap. 6.2: „≥160 mm pentru schema 3×40 m").

Configurația rostului modular adoptată: **2 module (2 celule), fiecare cu capacitate proprie de 80 mm**, separate printr-o grindă centrală de distribuție (traversă metalică), soluție care limitează deplasarea maximă suportată de o singură garnitură elastomerică la jumătate din deplasarea totală, reducând solicitarea individuală a fiecărei garnituri și prelungind durata de viață în exploatare a rostului (cf. principiului deja menționat la arhitectura.md cap. 6.2).

---

## PTh-S.6 — PLANURI DE ARMARE ȘI EXTRAS DE ARMĂTURĂ

### PTh-S.6.1 Principiul planurilor de cofraj-armare la faza PTh

Planurile de cofraj-armare (piese desenate distincte de prezentul memoriu, cf. D.T.A.C. cap. 2.2) transpun grafic breviarul de calcul de la PTh-S.2-PTh-S.4 în: (1) planuri de cofraj (geometria exactă a fiecărui element, cotată complet, cu toate razele de racordare, pantele și dimensiunile de detaliu); (2) planuri de armare (poziția, diametrul și marca fiecărei bare/toron, cu vederi în plan, secțiuni transversale și longitudinale, la o scară suficientă pentru citirea neambiguă la execuție — uzual 1:20 sau 1:25 pentru elemente curente, 1:5 sau 1:10 pentru detalii de nod); (3) extrasul de armătură (poziția documentului prezent), care centralizează, pentru fiecare marcă de bară/toron, diametrul, lungimea, numărul de bucăți și greutatea totală, necesare atât pentru comanda de aprovizionare, cât și pentru verificarea de ansamblu a consumului de oțel față de estimările de deviz (D.T.A.C. cap. 9.2, unde s-a precizat explicit că valorile absolute de cost nu se estimează fără o listă de cantități reală — prezentul extras constituie tocmai acea listă de cantități, la nivelul armăturii).

### PTh-S.6.2 Extrasul de armătură activă (toroane de precomprimare) — deschiderea centrală

| Grindă | n_tor adoptat | Lungime utilă/toron (m) | Lungime totală (m) | Masă/m (kg/m, Y1860S7 Ø15,2) | **Masă totală (kg)** |
|---|---|---|---|---|---|
| G1 | 40 | 40,40 | 1.616,0 | 1,18 | 1.907 |
| G2 | 38 | 40,40 | 1.535,2 | 1,18 | 1.812 |
| G3 | 36 | 40,40 | 1.454,4 | 1,18 | 1.716 |
| G4 | 34 | 40,40 | 1.373,6 | 1,18 | 1.621 |
| G5 | 34 | 40,40 | 1.373,6 | 1,18 | 1.621 |
| G6 | 32 | 40,40 | 1.292,8 | 1,18 | 1.525 |
| **Σ (6 grinzi, o deschidere)** | **214** | — | **8.645,6** | — | **10.202 kg ≈ 10,2 t** |

Lungimea utilă/toron (40,40 m) include o rezervă de 0,60 m față de lungimea grinzii (39,80 m, deschiderea de 40,00 m minus reducerile constructive la capete) pentru ancorajele active/pasive și pentru operațiunea de tăiere după transferul precomprimării.

### PTh-S.6.3 Extrasul de armătură pasivă complementară (grinzi) și placă colaborantă

| Element | Marcă/diametru | Poziție | Lungime/bară (m) | Nr. bare (per deschidere, 6 grinzi/placă) | **Masă totală (kg)** |
|---|---|---|---|---|---|
| Grinzi — armătură pasivă talpă inferioară | Ø20 B500B | pe toată lungimea grinzii | 40,4 | 36 (6/grindă×6 grinzi) | 3.585 |
| Grinzi — etrieri zonă critică | Ø12/150-190, 2 ramuri | 2h la fiecare capăt, ×2 capete×6 grinzi | ~5,0 m zonă/capăt | ≈ 480 buc. echiv. | 1.290 |
| Grinzi — etrieri câmp curent | Ø12/300, 2 ramuri | rest deschidere | ~29,0 m | ≈ 580 buc. echiv. | 1.550 |
| Placă — armătură principală transversală | Ø16/125 | pe toată lungimea (120 m) și lățimea (12 m) | 12,0 | 960 (120m/0,125m) | 15.130 |
| Placă — armătură de repartiție longitudinală | Ø12/200 | pe toată suprafața | 120,0 | 60 (12m/0,200m) | 6.390 |
| Placă — armătură de continuitate peste pile (P1+P2) | Ø20/100, dublu strat | ±3,00 m de fiecare parte a axului pilei, ×2 pile | 12,0 | 240 (2 pile×2 straturi×60 bare/strat) | 5.680 |
| **Σ extras armătură pasivă (deschiderea centrală, cf. mai sus)** | | | | | **≈ 33.625 kg ≈ 33,6 t** |

### PTh-S.6.4 Extrasul de armătură — infrastructura (o culee + o pilă, valori unitare)

| Element | Marcă/diametru | Cantitate estimată | **Masă (kg)** |
|---|---|---|---|
| Culee — zid de gardă (Ø16/150) | Ø16 | armare pe h=2,00m×12,00m lățime | 1.890 |
| Culee — corp masiv + aripi (armare generală constructivă, procent minim ~0,3% din volum beton) | Ø16-Ø20 | volum culee ≈120 m³ | ≈ 4.500 |
| Culee — radier pe piloți (armare de tip placă groasă, ambele fețe) | Ø25/150 | 8,00×4,00m, dublu strat | 2.960 |
| Pilă — armătură longitudinală fus (32Ø28) | Ø28 | lungime fus ≈7,00m | 3.789 |
| Pilă — confinare zonă critică (spirală Ø16/100, l_cr=1,60m) | Ø16 | dezvoltare spirală pe 1,60m | 640 |
| Pilă — confinare secțiune curentă (spirală Ø16/200) | Ø16 | rest fus ≈5,40m | 1.080 |
| Pilă — riglă de reazem (armare tip grindă, dublu strat) | Ø25 | secțiune riglă | 2.150 |
| Piloți culee (6 buc. Ø1,08m, 14Ø22 + spirală Ø12) | Ø22+Ø12 | 6×12,00m lungime | 8.940 |
| Piloți pilă (4 buc. Ø1,20m, 16Ø25 + spirală Ø12) | Ø25+Ø12 | 4×18,00m lungime (adâncime totală, cf. D.T.A.C. cap. 10.3) | 9.870 |
| **Σ pe o culee** | | | **≈ 18.290 kg ≈ 18,3 t** |
| **Σ pe o pilă (fus+piloți)** | | | **≈ 17.529 kg ≈ 17,5 t** |

### PTh-S.6.5 Sinteza consumului total de oțel (structura completă, cele 3 deschideri + infrastructura completă)

| Categorie | Cantitate | Masă unitară | **Masă totală** |
|---|---|---|---|
| Toroane precomprimare — deschidere centrală | 1 deschidere | 10,2 t | 10,2 t |
| Toroane precomprimare — deschideri de capăt (2×) | 2 deschideri, ≈85 toroane/deschidere | ≈4,0 t/deschidere | 8,0 t |
| Armătură pasivă — suprastructură (3 deschideri, scalat proporțional cu volum) | — | — | ≈ 82 t |
| Armătură — infrastructură (2 culee + 2 pile) | 2×18,3 + 2×17,5 | — | ≈ 71,6 t |
| **TOTAL ESTIMAT OȚEL (activ + pasiv, structura completă)** | | | **≈ 172 t** |

Valorile de mai sus reprezintă un extras de predimensionare la nivelul detaliat de faza PTh, util pentru verificarea preliminară a devizului (cantități pentru capitolul 4 al devizului general, D.T.A.C. cap. 9.1) și pentru comanda anticipată a materialelor de la furnizor (toroane Y1860S7, cu termene de livrare tipic mai lungi decât ale oțelului-beton curent); cantitățile definitive, cu precizie la nivel de poziție individuală de armătură, rezultă din planurile de cofraj-armare finalizate (piese desenate) și din extrasul de armătură formal atașat acestora, document care însoțește proiectul tehnic complet, nu prezentul memoriu.

---

## PTh-S.7 — DETALII DE ARMARE — NODURI, ANCORAJE, ÎNNĂDIRI, CONFINARE, ZONE DE PRECOMPRIMARE

### PTh-S.7.1 Zona de introducere a precomprimării — armătura de spargere (bursting) și de fisurare (spalling)

La capătul fiecărei grinzi prefabricate, în zona în care forța de precomprimare (concentrată în ancorajele/toroanele grupate în talpa inferioară) se distribuie treptat pe întreaga secțiune transversală a grinzii (zona de perturbare Saint-Venant, cu o lungime de ordinul înălțimii secțiunii — aici, aproximativ 2,00 m pentru grinda centrală), apar eforturi de întindere transversală semnificative, de două tipuri distincte, ambele necesitând armătură specifică suplimentară față de armătura curentă a grinzii:

**Armătura de spargere (bursting reinforcement)** — preia eforturile de întindere transversală generate în interiorul zonei de perturbare, pe direcția perpendiculară liniei de acțiune a forței de precomprimare, produse de „despicarea" internă a fluxului de compresiune care se extinde de la aria mică a ancorajului la aria completă a secțiunii. Se dispune sub formă de **etrieri închiși suplimentari, Ø12/50 mm**, concentrați pe o lungime egală cu înălțimea secțiunii (2,00 m) de la capătul grinzii, dimensionați pentru o forță de spargere estimată la **10-15% din forța totală de precomprimare la transfer** — pentru cea mai solicitată grindă (G1, 40 toroane), forța de precomprimare la transfer (înainte de pierderile pe termen lung) este de ordinul `P_0 ≈ 40 × 1.550 kN/toron ≈ 62.000 kN`... **notă de verificare**: această valoare de P_0 (forța la tensionare inițială, înainte de transfer, calculată la tensiunea inițială admisă de proiectant conform SR EN 1992-1-1 §5.10.2, uzual 0,75-0,80·fpk) diferă de forța pe termen lung `P_m∞=6.333 kN` reținută la D.T.A.C. (cap. 7.5) tocmai prin pierderile de precomprimare (instantanee și în timp), calculate integral la faza PT/DE (D.T.A.C. cap. 7.5, cu forța pe termen lung per toron **1.116 kN**, de unde `P_0/toron` la tensionare este superior acestei valori reziduale) — armătura de spargere se dimensionează pentru forța **la transfer** (cea mai mare, imediat după eliberarea toroanelor din bancul de tensionare, înainte ca oricare dintre pierderile în timp să se fi produs), nu pentru forța reziduală pe termen lung folosită la verificarea de decompresie.

**Armătura de fisurare de suprafață (spalling reinforcement)** — preia eforturile de întindere paralele cu suprafața de capăt a grinzii, imediat sub zona de ancoraj, cu rolul de a preveni desprinderea locală a stratului de acoperire de beton în jurul plăcilor de ancoraj. Se dispune sub formă de **plasă/grătar Ø10/75 mm**, imediat în spatele plăcilor de ancoraj, pe o adâncime de aproximativ 20-30 cm de la fața de capăt.

### PTh-S.7.2 Ancorajele active și pasive ale toroanelor

Toroanele Y1860S7 se ancorează, la capătul de tensionare (activ), prin sisteme de ancoraj tip con cu bacuri (wedge-type anchorage), certificate conform aprobării tehnice europene aplicabile sistemelor de precomprimare (ETA — European Technical Assessment), fiecare ancoraj dimensionat pentru un grup de toroane (uzual 12-19 toroane per placă de ancoraj, funcție de sistemul comercial adoptat), cu plăci de repartiție din oțel turnat sau sudat, dimensionate la presiunea de contact admisă a betonului la vârsta transferului (verificare separată de decompresia SLS, tratând exclusiv zona locală imediat sub placa de ancoraj — presiune de contact limitată conform SR EN 1992-1-1 §8.10.3, cu factor de majorare a rezistenței betonului pentru compresiune locală confinată). Capătul opus (pasiv, dinspre bancul de tensionare) folosește ancoraje moarte (dead-end), fără posibilitate de retensionare, adecvate întrucât toată operațiunea de tensionare se realizează dintr-un singur capăt în tehnologia de bancuri lungi (D.T.A.C. cap. 12.1).

### PTh-S.7.3 Continuitatea armăturii peste pile — detaliul de ancorare a armăturii de continuitate

Armătura de continuitate a plăcii peste pile (Ø20/100, dublu strat, PTh-S.2.9) se ancorează, la capetele zonei de continuitate (limita de ±3,00 m față de axul pilei), printr-o lungime de ancorare de bază calculată conform SR EN 1992-1-1 §8.4:

`l_bd = α1·α2·α3·α4·α5 · l_b,rqd ≥ l_b,min`

unde `l_b,rqd = (Ø/4)·(σsd/fbd)` — pentru bara Ø20, cu efort de curgere de calcul `σsd=fyd=434,8 N/mm²` și aderență de calcul `fbd` (funcție de clasa de beton C35/45 și de condițiile de aderență, „bune" pentru armătura orizontală din partea superioară a plăcii turnate în poziție favorabilă): rezultă o lungime de ancorare de bază de ordinul **l_bd ≈ 45×Ø = 900 mm**, majorată constructiv la **1,00 m** pentru marjă de execuție — lungime care se adaugă dincolo de limita teoretică de 3,00 m a zonei de continuitate, astfel încât armătura să fie complet ancorată în zona de moment redus (câmpul deschiderii adiacente), nu întreruptă exact la limita teoretică a diagramei de moment negativ.

### PTh-S.7.4 Detaliul de confinare la baza pilei — secțiune de execuție

Detaliul constructiv al zonei critice de la baza pilei (PTh-S.4.3) prevede: (1) cele 32 bare longitudinale Ø28, dispuse pe conturul secțiunii circulare la interax uniform (≈157 mm între axele barelor pe circumferință, pentru D_pila=1,60m); (2) spirala de confinare Ø16/100 mm, cu diametrul de înfășurare la interiorul barelor longitudinale (D_core≈1,44m, PTh-S.4.3), sudată sau ancorată prin înfășurări suplimentare de capăt (minimum 1,5 spire suplimentare la fiecare capăt al segmentului de spirală, pentru ancorarea eficientă a forței de confinare, conform practicii curente de detaliere a elementelor spiralate); (3) o **rețea de bare radiale suplimentare (cross-ties) Ø12**, dispuse la interax de aproximativ 400 mm pe circumferință, în zona critică, cu rolul de a lega spirala exterioară de un eventual inel interior de confinare — necesară dacă diametrul secțiunii (1,60 m) depășește pragul la care o singură spirală periferică nu mai asigură o confinare uniformă a întregului miez de beton (verificare de detaliu la faza de proiect tehnic al armării, pe baza modelului de confinare Mander sau echivalent).

### PTh-S.7.5 Racordul dintre piloți și radier — armătura de legătură

Capul fiecărui piloț (armătura longitudinală Ø25 la pile / Ø22 la culee, PTh-S.3.7) pătrunde în radier pe o lungime de ancorare completă (minimum 40×Ø, adică 1,00 m pentru Ø25, respectiv 0,88 m pentru Ø22, majorate constructiv la 1,00 m pentru ambele, pentru uniformitate de execuție), asigurând transmiterea completă a efortului de întindere/compresiune din piloț către radier fără planul de rupere prin smulgere la interfața piloț-radier — un detaliu critic, întrucât radierul trebuie să funcționeze structural ca un element rigid unic împreună cu piloții, nu ca o simplă „placă" așezată deasupra unor piloți independenți.

---

## PTh-S.8 — TEHNOLOGIA DE EXECUȚIE A STRUCTURII

### PTh-S.8.1 Succesiunea generală (recapitulare și detaliere față de D.T.A.C. cap. 12.1)

D.T.A.C. a stabilit succesiunea de principiu (infrastructură → prefabricare grinzi → montaj → turnare placă → continuizare → suprastructură permanentă → probe de recepție, cap. 12.1). Prezentul capitol detaliază pașii tehnologici critici, cu parametri de execuție expliciți, necesari organizării de șantier și programului de lucru.

### PTh-S.8.2 Tehnologia de pretensionare a grinzilor — pas cu pas

1. **Pregătirea bancului de tensionare** — verificarea alinierii tecilor/canalelor de precomprimare, montarea armăturii pasive și a etrierilor (inclusiv armătura de spargere/fisurare, PTh-S.7.1), montarea cofrajului lateral;
2. **Enfilarea toroanelor** — trecerea celor n_tor toroane (40 la G1, până la 32 la G6, PTh-S.2.4) prin pozițiile prestabilite ale bancului, cu marcarea vizuală a fiecărui toron pentru a evita confuzii la tensionare;
3. **Tensionarea** — se realizează progresiv, toron cu toron sau în grupuri simetrice (pentru a evita o excentricitate accidentală a forței de precomprimare pe secțiune în timpul operațiunii), până la efortul unitar de tensionare adoptat (uzual 0,75·fpk = 1.395 N/mm², sub limita normată de 0,80·fpk conform SR EN 1992-1-1 §5.10.2.1), cu măsurarea și consemnarea forței efective de tensionare la fiecare toron (verificare încrucișată alungire-forță, obligatorie pentru detectarea unei eventuale frecări excesive în lungul bancului);
4. **Turnarea betonului C50/60** — turnare continuă, fără întrerupere, cu vibrare mecanică internă, urmată de tratament termic accelerat (aburire controlată, cu o rampă de creștere a temperaturii limitată la 20°C/oră, pentru a evita fisurarea termică a betonului proaspăt) până la atingerea rezistenței de transfer necesare (verificată pe probe martor păstrate în aceleași condiții termice ca elementul);
5. **Transferul precomprimării** — după confirmarea rezistenței betonului la vârsta transferului (probe de laborator, obligatoriu prealabile oricărei operațiuni de eliberare), toroanele se eliberează de pe bancul de tensionare **simultan sau în secvență simetrică** (niciodată dintr-o singură parte a secțiunii spre cealaltă), pentru a evita o încovoiere accidentală laterală a grinzii proaspăt betonate, insuficient rigidă la acest stadiu pentru a prelua o încărcare excentrică bruscă;
6. **Tăierea toroanelor** — la finalul zonei de ancoraj a fiecărei grinzi, cu utilaj de tăiere mecanică (nu flacără oxiacetilenică, care ar introduce un șoc termic local necontrolat asupra oțelului de înaltă rezistență, cu risc de fragilizare locală a toronului chiar în afara zonei tăiate).

### PTh-S.8.3 Tehnologia de montaj — verificarea capacității utilajului de ridicare

Greutatea proprie a unei grinzi centrale (h=2,00m, l=40,00m, echivalent arie 0,60 m²): `G_grinda = 0,60×40,00×25 = 600 kN ≈ 61,2 tone` — valoare care condiționează direct alegerea utilajului de montaj (macara mobilă de capacitate corespunzătoare, cu raza de acțiune verificată explicit pentru poziția reazemelor față de amplasarea posibilă a macaralei pe maluri sau pe platforme temporare în albie, cf. arhitectura.md cap. 1.6). Pentru grinzile deschiderilor de capăt (h=1,20m), greutatea se reduce proporțional cu aria echivalentă (0,36 m²): `G_grinda,lateral = 0,36×24,00×25 = 216 kN ≈ 22,0 tone`.

**Verificarea la răsturnare laterală în timpul montajului** — o grindă prefabricată izolată, înainte de solidarizarea transversală prin antretoaze și placă, are o rigiditate la torsiune/răsturnare laterală semnificativ mai redusă decât ansamblul final; stabilitatea ei, în poziția de montaj (rezemată pe cele două aparate de reazem provizorii/definitive, fără reazem transversal intermediar), se verifică explicit prin proiectul tehnologic de montaj (D.T.A.C./arhitectura.md cap. 1.6), care stabilește, dacă este necesar, contravântuiri provizorii între grinzi adiacente montate succesiv, până la turnarea plăcii colaborante care solidarizează definitiv ansamblul.

### PTh-S.8.4 Tehnologia de turnare a plăcii și a zonei de continuitate — secvențiere

Conform principiului deja stabilit la arhitectura.md (cap. 1.6): (1) turnarea plăcii pe fiecare deschidere se realizează **dinspre mijlocul deschiderii spre reazeme** (nu invers), pentru a limita acumularea necontrolată de beton proaspăt exact în zona de continuitate înainte ca acesta să fi câștigat rezistență; (2) zona de continuitate peste pile (lățime 2×3,00m=6,00m de o parte și de alta a axului pilei, cf. PTh-S.2.9) rămâne netunată până când betonul plăcii din câmpurile adiacente atinge minimum **70% din rezistența caracteristică la 28 zile** (verificată pe probe martor păstrate în condiții identice), pentru a limita contracția diferențială ulterioară dintre zona de continuitate (turnată mai târziu, deci cu contracție viitoare mai mare) și câmpurile adiacente (deja parțial contractate la momentul turnării zonei de continuitate); (3) armătura de continuitate (Ø20/100, PTh-S.2.9, PTh-S.7.3) se montează și se verifică (poziție, ancorare, cf. PTh-S.7.3) **înainte** de turnarea zonei de continuitate — fază determinantă explicită (PTh-S.9.3).

### PTh-S.8.5 Tehnologia de execuție a fundațiilor pe piloți în albie

Execuția piloților foraiți în zona activă a albiei (pile P1, P2) urmează succesiunea: (1) amenajarea batardoului/incintei etanșe provizorii (arhitectura.md cap. 8.4, D.T.A.C. cap. 10.2); (2) forajul propriu-zis, cu susținerea pereților găurii de foraj prin noroi de foraj bentonitic sau prin tubaj metalic recuperabil (funcție de stratificația reală a terenului, stabilită prin studiul geotehnic — piesă distinctă); (3) montarea coșului de armătură prefabricat (PTh-S.3.7), centrat în gaura de foraj prin distanțiere periodice; (4) betonarea prin tub de turnare (tremie), cu ridicarea progresivă a tubului pe măsura umplerii, menținând permanent capătul tubului imersat în betonul proaspăt (minimum 1,5-2,0 m adâncime de imersie), pentru a evita segregarea betonului sau contaminarea cu noroiul de foraj; (5) verificarea integrității piloțului finalizat prin metode nedistructive (de exemplu, teste sonice/cross-hole, dacă proiectul de control al calității le prevede pentru piloții cei mai solicitați, PTh-S.9).

---

## PTh-S.9 — PLAN DE CONTROL AL CALITĂȚII ȘI FAZE DETERMINANTE DETALIATE

### PTh-S.9.1 Toleranțe dimensionale de execuție

| Element | Toleranță admisă | Metodă de verificare |
|---|---|---|
| Poziția în plan a piloților (cap de piloț) | ±75 mm | Ridicare topografică după decopertarea capului |
| Verticalitatea piloților foraiți | ≤2% din lungime | Măsurare cu tub de ghidaj înclinometric la foraj |
| Cota radierelor (culee, pile) | ±20 mm | Nivelment topografic |
| Poziția grinzilor montate (interax) | ±10 mm față de proiect | Măsurare directă înainte de turnarea plăcii |
| Grosimea plăcii colaborante | +10/−5 mm | Șabloane de cotă montate pe cofraj |
| Poziția aparatelor de reazem (plan + nivel) | ±5 mm plan, ±3 mm nivel | Verificare topografică de precizie înainte de punerea în încărcare |
| Cota de fundare a piloților (sub cota de afuiere) | fără toleranță negativă (doar +) | Verificare directă la finalizarea forajului, față de cota de proiect (82,00 mdMN pile, cf. instalatii.md cap. 6.1) |

### PTh-S.9.2 Programul de încercări pe beton

Pentru fiecare clasă de beton utilizată (C50/60 grinzi, C35/45 placă, C30/37 piloți, cf. PTh-S.1), se prelevează, la fiecare șarjă/lot de turnare, probe cubice/cilindrice pentru: (1) **rezistența la vârsta transferului** (grinzi precomprimate — obligatorie, condiționantă pentru eliberarea toroanelor, PTh-S.8.2); (2) **rezistența la 28 de zile** (verificarea clasei caracteristice de calcul, pentru toate elementele); (3) **conținutul de aer antrenat** (pentru betoanele cu clasă de expunere XF, D.T.A.C. structura.md cap. 2.3, verificat la fiecare șarjă la stația de betoane, nu doar pe probe de laborator ulterioare); (4) **raportul apă/ciment efectiv** (verificat prin rețeta certificată a stației de betoane și, ocazional, prin determinare directă pe beton proaspăt).

### PTh-S.9.3 Fazele determinante detaliate

Extinzând tabelul de la D.T.A.C. (cap. 12.2), fiecare fază determinantă se documentează printr-un **proces-verbal de recepție calitativă** (semnat de dirigintele de șantier, responsabilul tehnic cu execuția și, după caz, reprezentantul beneficiarului/proiectantului), cu următorul conținut minim pentru fiecare fază:

| Fază determinantă | Documente de verificare | Responsabili semnatari |
|---|---|---|
| Recepție foraj + armătură piloți (înainte de betonare) | Fișa de foraj (stratificație întâlnită vs. studiu geotehnic), planul de armare confruntat cu coșul montat, verificare adâncime finală vs. cotă de afuiere | Diriginte + RTE + geotehnician |
| Recepție armătură radiere + fusuri pile + culee | Plan de armare confruntat cu execuția, acoperiri de beton verificate cu distanțiere calibrate | Diriginte + RTE |
| Recepție armătură pretensionare + pasivă grindă (în stație) | Plan de armare, poziție toroane pe niveluri, forța de tensionare consemnată per toron | Diriginte + RTE stație de prefabricare |
| Recepție transfer precomprimare | Rezultate probe rezistență la vârsta transferului, ordinea de eliberare consemnată | RTE stație + laborator |
| Recepție montaj grinzi pe reazeme | Verificare topografică poziție/nivel/interax, verificare stabilitate provizorie | Diriginte + topograf |
| Recepție armătură placă + continuitate (înainte de turnare) | Plan de armare, poziție/ancorare armătură de continuitate (PTh-S.7.3), rezistență minimă 70% confirmată pentru zona de continuitate | Diriginte + RTE + proiectant (verificare de specialitate) |
| Recepție injectare teci (dacă post-tensionare suplimentară) | Fișă de injectare, umplere completă confirmată vizual/prin sondaj | RTE + firmă specializată injectare |
| Recepție aparate de reazem definitive | Verificare topografică poziție/nivel/verticalitate, fișă tehnică produs confruntată cu proiectul | Diriginte + topograf |
| Probă de încărcare/recepție finală | Măsurători de săgeată sub convoi de probă, comparate cu valorile de calcul (PTh-S.2.7) | Comisie de recepție + proiectant |

### PTh-S.9.4 Neconformitățile și tratarea lor

Orice abatere constatată față de toleranțele de la PTh-S.9.1 sau față de rezultatele așteptate ale încercărilor (PTh-S.9.2) se consemnează într-o **fișă de neconformitate**, analizată de proiectant înainte de a decide asupra uneia din următoarele soluții: acceptarea abaterii (dacă o verificare de calcul suplimentară, pe geometria/rezistența reală constatată, confirmă că elementul rămâne în limitele de siguranță — de exemplu, un grad de utilizare `η` recalculat cu rezistența reală a betonului, dacă aceasta este ușor inferioară celei de proiect, dar analiza arată `η<1,0` totuși), remedierea (de exemplu, injectare de fisuri, completare locală de beton) sau, în cazurile cele mai severe (abateri care nu pot fi acoperite prin recalcul sau remediere), demolarea și refacerea elementului — decizie care revine exclusiv proiectantului de specialitate, nu constructorului sau dirigintelui de șantier, dat fiind caracterul de cerință fundamentală A (D.T.A.C. cap. 3.1) a oricărei verificări structurale.

---

## PTh-S.10 — PROGRAM DE URMĂRIRE ÎN TIMP (AND 522) ȘI MONITORIZARE INSTRUMENTATĂ

### PTh-S.10.1 Corelarea cu programul de monitorizare din memoriul de echipamente

Programul de urmărire în timp al structurii de rezistență (obiectul prezentului capitol) se corelează direct cu programul de monitorizare deja detaliat în memoriul de echipamente/hidraulică (instalatii.md cap. 9, unde s-a subliniat, la §9.3, caracterul **critic** al batimetriei periodice pentru detectarea afuierii progresive) — cele două programe formează, împreună, un singur ciclu integrat de urmărire a comportării podului, conform AND 522, fără suprapunere de conținut: prezentul capitol tratează componentele **strict structurale** ale urmăririi (deplasări la aparate de reazem, deschidere fisuri, tasări diferențiate ale infrastructurii, comportare dinamică), pe care instalatii.md nu le-a detaliat, concentrându-se acolo pe hidraulică/echipamente/anticoroziv.

### PTh-S.10.2 Instrumentarea structurală la darea în exploatare

- **Traductoare de deplasare** la toate cele 4 reazeme (C1, P1, P2, C2), pe direcție longitudinală, pentru verificarea concordanței între deplasarea reală înregistrată și valorile de calcul (Δ_termic=27mm, Δ_rost=132mm calculat/160mm adoptat, PTh-S.5.3) — o discrepanță semnificativă între deplasarea măsurată și cea de calcul ar indica fie o blocare parțială a aparatului de reazem (risc de supra-solicitare a infrastructurii prin transmiterea unor forțe orizontale neprevăzute), fie o problemă de acomodare a rostului;
- **Fisurometre** la zonele critice identificate prin calcul — zona de continuitate a plăcii peste pile (PTh-S.2.9, moment negativ guvernant), zona de introducere a precomprimării la capetele grinzilor (PTh-S.7.1) și baza fusurilor de pilă (zona critică seismică, PTh-S.4.3) — cu citire periodică (semestrială în primii 2 ani de exploatare, apoi anuală) pentru a urmări dacă deschiderea fisurilor de contracție/serviciu se stabilizează, așa cum este de așteptat, sau progresează, ceea ce ar indica un mecanism activ de degradare neanticipat;
- **Repere topografice de tasare** pe culee și pe pile (cf. principiului general deja menționat la D.T.A.C. cap. 13.2), cu nivelment de precizie la darea în exploatare (reper zero) și, ulterior, anual în primii 5 ani (perioada în care tasările reziduale ale terenului de sub piloți, dacă există, sunt cele mai probabile) și la intervale de 3-5 ani ulterior;
- **Accelerometre** (opțional, decizie a administratorului drumului, cf. arhitectura.md cap. 6.9), recomandate pentru un pod de categorie de importanță B în clasă seismică III (D.T.A.C. cap. 1.5-1.6), amplasate la baza unei pile și pe tablier, pentru înregistrarea răspunsului dinamic real la un eveniment seismic — date esențiale pentru o evaluare rapidă post-eveniment a necesității de restricționare a traficului, înainte de finalizarea unei inspecții vizuale complete.

### PTh-S.10.3 Compararea comportării reale cu ipotezele de calcul — bucla de validare

Datele colectate prin instrumentarea de mai sus permit, pe termen mediu (3-5 ani de exploatare), o **validare a priori-a-posteriori** a ipotezelor de calcul adoptate în prezentul supliment PTh: deplasarea termică reală măsurată la rosturi se compară cu `Δ_termic=27mm` calculat (PTh-S.5.3); tasările reale ale infrastructurii se compară cu ipoteza de fundație practic netasabilă (D.T.A.C. cap. 7.5, arhitectura.md cap. 7.2 — plăci de racordare dimensionate tocmai pentru tasarea diferențiată a terasamentului, nu a culeei înseși); iar, dacă instrumentate seismic, răspunsul dinamic înregistrat la un eveniment real se compară cu perioada proprie estimată (`T1≈0,9s`, D.T.A.C. cap. 11.1) și cu deplasările de calcul (`Δx_seism=60-90mm`, D.T.A.C. cap. 9.3). Orice discrepanță semnificativă între comportarea reală și ipotezele de proiect declanșează o reevaluare structurală de către un specialist atestat, corelată cu cartea tehnică a construcției (instalatii.md cap. 9.4).

---

## PTh-S.11 — IPOTEZE ALE MODELULUI DE CALCUL CU ELEMENTE FINITE ȘI VALIDARE

### PTh-S.11.1 Tipul de model adoptat

Verificarea finală, integrală, a structurii (dincolo de breviarul de predimensionare pe grindă izolată de la PTh-S.2, dezvoltat pentru justificarea soluției și pentru dimensionarea inițială a precomprimării) se realizează printr-un **model spațial de tip grilaj de grinzi** (grillage analogy) — o rețea plană de elemente de tip bară, care reprezintă cele 6 grinzi longitudinale (cu rigiditățile lor reale la încovoiere și la torsiune) legate transversal prin elemente echivalente care modelează rigiditatea la încovoiere/torsiune a plăcii colaborante și a antretoazelor, o metodă consacrată și larg utilizată pentru tabliere de poduri cu grinzi la interax regulat, alternativă mai simplă și mai transparentă (rezultatele se pot verifica direct prin breviarul de predimensionare pe grindă izolată) unei modelări complete cu elemente finite de tip placă/înveliș (shell) pentru toată suprastructura, care ar fi, la acest tip de tablier, o complexitate suplimentară fără un beneficiu de precizie proporțional.

Elementele de infrastructură (pile, culee, piloți) se modelează prin **elemente de tip bară cu secțiune reală** (fus de pilă circular, radier ca element rigid sau semi-rigid, funcție de raportul dimensiune radier/dimensiune fus), iar interacțiunea piloților cu terenul se modelează prin **arcuri elastice orizontale/verticale distribuite pe lungimea piloțului** (metoda „grinzii pe mediu elastic", cu coeficienți de rigiditate ai terenului preluați din studiul geotehnic — piesă distinctă, nedezvoltată în prezentul memoriu).

### PTh-S.11.2 Aplicarea încărcărilor în model

Încărcările permanente (greutate proprie, cf. PTh-S.2.3) se aplică ca încărcări distribuite pe fiecare element de grindă, conform geometriei reale a secțiunii (nu ca o încărcare uniformă simplificată, cum s-a procedat la predimensionare); încărcarea de trafic (LM1 — tandem TS + UDL, cf. D.T.A.C. cap. 5) se aplică prin **linii de influență generate automat de softul de calcul**, cu poziționarea automată a benzilor noționale și a tandemului în poziția cea mai defavorabilă pentru fiecare secțiune și fiecare grindă în parte — o îmbunătățire directă față de metoda Courbon simplificată (coeficienți de repartiție constanți `r_i`, PTh-S.2.2), care presupune o poziție fixă a încărcării; modelul complet recalculează, pentru fiecare secțiune de-a lungul podului, poziția exactă care maximizează efectul studiat (moment, forfecare), ceea ce poate conduce la coeficienți de repartiție ușor diferiți de cei adoptați la predimensionare, funcție de secțiunea analizată.

Acțiunea seismică se introduce prin **analiză dinamică modală cu spectre de răspuns**, aplicată pe cele două direcții orizontale principale (longitudinală și transversală) plus componenta verticală, cu combinarea modală conform regulii SRSS sau CQC (funcție de gradul de cuplare a modurilor proprii relevante), rezultatele modelului furnizând direct repartiția forței tăietoare de bază pe infrastructuri (înlocuind repartiția aproximativă de la PTh-S.4.2) și deplasările relative exacte necesare verificării finale a lungimii de rezemare `l_ov` (recalculată prin componentele `d_eg` și `d_es` obținute direct din model, nu estimate ca la D.T.A.C. cap. 11.5).

### PTh-S.11.3 Validarea modelului prin comparație cu breviarul de predimensionare

Regula de validare obligatorie a oricărui model de calcul complex este compararea rezultatelor lui cu un calcul de referință simplu, independent — exact rolul jucat, pentru prezentul proiect, de breviarul de predimensionare pe grindă izolată (D.T.A.C. cap. 7, PTh-S.2): momentul de calcul `M_Ed` obținut din modelul spațial pentru grinda marginală G1, la secțiunea de la mijlocul deschiderii centrale, trebuie să rezulte **de aceeași ordine de mărime** cu valoarea de predimensionare (`16.551 kNm`), cu o abatere așteptată, în sensul reducerii (favorabil), de ordinul 5-15% — reflectând tocmai efectul de continuitate parțială a schemei semicontinue, neglijat conservator la predimensionare (D.T.A.C. cap. 7.1, PTh-S.2.9). O abatere mai mare (peste 20-25%, în oricare sens) între modelul complet și breviarul de predimensionare declanșează o verificare a ipotezelor de model (rigidități introduse, condiții de rezemare, poziționare a încărcărilor) înainte de a accepta rezultatele modelului ca bază pentru armarea finală — o disciplină de verificare încrucișată esențială, care previne acceptarea necritică a unui rezultat de model eronat din cauza unei erori de introducere a datelor (o eroare frecventă și, altfel, greu de detectat, la modele complexe cu mii de grade de libertate).

### PTh-S.11.4 Ce rămâne la faza de verificare tehnică atestată

Modelul spațial complet, cu toate rezultatele lui (momente, forțe tăietoare, deplasări, forțe în aparatele de reazem, pentru fiecare element și fiecare combinație de încărcări normată), constituie baza de calcul supusă **verificării tehnice atestate** pe cerințele A1 și A2 (D.T.A.C. cap. 13.1-13.2), realizată de un verificator de proiecte atestat specializat pe lucrări de artă — o verificare care nu se limitează la o reconfirmare a breviarului de predimensionare prezentat în acest supliment PTh, ci reanalizează integral modelul, ipotezele lui și rezultatele detaliate ale armării, conform responsabilității legale instituite de Legea nr. 10/1995.

---

## PTh-S.12 — CONCLUZII ȘI TABEL DE SINTEZĂ FINAL

Prezentul supliment de fază PTh a extins breviarul de predimensionare al D.T.A.C. (dezvoltat pe o singură grindă marginală, reprezentativă dar insuficientă pentru execuție) la nivelul complet necesar planurilor de execuție: **toate cele 6 grinzi ale secțiunii transversale** (deschiderea centrală și, condensat, deschiderile de capăt), cu necesarul de precomprimare, armătura pasivă și armătura transversală individualizate pe fiecare grindă (Σ214 toroane pe deschiderea centrală, Σ≈85 pe fiecare deschidere de capăt); **infrastructura verificată ca ansamblu real** (culeea pe grup de 6 piloți Ø1,08m, cu η_pilot=0,55, față de pila pe 4 piloți Ø1,20m deja verificată la D.T.A.C. cu η_pilot=0,71); **confinarea seismică detaliată la baza pilelor** (zona critică l_cr=1,60m, spirală Ø16/100, ρ_w≈0,56%); **dimensionarea completă a aparatelor de reazem pe fiecare poziție** (6 tipodimensiuni, η între 0,75-0,82) și a rostului de dilatație (2 module a 80mm, capacitate totală ≥160mm); **extrasul de armătură** (aproximativ 172 tone oțel total, activ+pasiv, pentru structura completă); **detaliile constructive critice** — armătura de spargere/fisurare la capetele grinzilor precomprimate, ancorarea armăturii de continuitate peste pile, confinarea zonei critice a pilelor, racordul piloți-radier; **tehnologia de execuție** pas cu pas (pretensionare, montaj, turnare placă/continuitate, execuție piloți în albie); **planul de control al calității** cu toleranțe explicite și fazele determinante documentate prin proces-verbal; **programul de urmărire în timp** structural, corelat cu cel hidraulic din memoriul de echipamente; și **ipotezele modelului de calcul cu elemente finite** (grilaj de grinzi + arcuri elastice pentru interacțiunea sol-piloți), cu regula de validare încrucișată față de breviarul de predimensionare.

| Domeniu PTh | Rezultat cheie | Referință D.T.A.C. corelată |
|---|---|---|
| Toroane pe cele 6 grinzi (deschidere centrală) | 40/38/36/34/34/32 (Σ214) | structura.md cap. 7.5 (G1=40) |
| η_M pe toate cele 6 grinzi | 0,94-0,96 (uniform) | structura.md cap. 7.6 (G1=0,95) |
| Culee — η_pilot (grup 6×Ø1,08m) | 0,55 | structura.md cap. 8.1-8.3 (metodologie) |
| Pilă — confinare zonă critică | l_cr=1,60m; spirală Ø16/100; ρ_w≈0,56% | structura.md cap. 11.2 (q=3,5) |
| Aparate de reazem — 6 tipodimensiuni | η 0,75-0,82 | structura.md cap. 9.2 (G1: 600×500, η=0,75) |
| Rost de dilatație | 2 module × 80mm = 160mm | arhitectura.md cap. 1.4, 6.2 |
| Extras armătură total | ≈172 tone (activ+pasiv) | structura.md cap. 9.1 (deviz, fără cantități) |
| Model de calcul | Grilaj de grinzi + arcuri elastice piloți | structura.md cap. 7.1 (schemă simplu rezemată, conservator) |

Documentația de față se completează, la fazele următoare, cu planurile de cofraj-armare complete (piese desenate, la scările uzuale 1:20/1:25 pentru elemente curente și 1:5/1:10 pentru detalii de nod), cu caietul de sarcini pentru materiale și execuție (document distinct, care detaliază specificațiile tehnice ale betoanelor, oțelurilor, toroanelor și aparatelor de reazem la nivel de furnizor și standard de produs) și cu raportul verificatorului tehnic atestat pe cerințele A1 și A2, conform Legii nr. 10/1995, condiție obligatorie pentru trecerea la faza de execuție.
