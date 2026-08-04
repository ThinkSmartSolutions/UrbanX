# PTh-SP.1 — OBIECTUL SUPLIMENTULUI DE FAZĂ PTh (REZISTENȚĂ) — SALĂ DE SPORT POLIVALENTĂ, ACOPERIȘ METALIC L=40,0 m + TRIBUNE DE BETON ARMAT, 1.500 LOCURI

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție) la Memoriul tehnic de rezistență de fază DTAC (`structura.md`), elaborat în conformitate cu **HG 907/2016** privind etapele de elaborare a documentațiilor tehnico-economice și cu **Legea 10/1995** privind calitatea în construcții. El aprofundează faza DTAC deja redactată — concepția duală a celor două subsisteme static independente (acoperiș metalic ușor cu deschidere liberă de 40,0 m pe ferme cu zăbrele, respectiv tribune de beton armat monolit cu gradene prefabricate pentru 1.500 de spectatori), justificarea configurației de fermă (triangulație N/Pratt, h=L/12,5), breviarul de predimensionare al fermei-tip și al gradenei-tip, smulgerea din vânt ca acțiune dimensionantă pentru prinderile acoperișului, analiza modală cu spectre de răspuns, verificarea la rezonanță cu mulțimea a grinzii rampante și infrastructura de principiu — aducând structura la nivelul de detaliere necesar **EXECUȚIEI ÎN ATELIER ȘI PE ȘANTIER**: înfășurătoarea eforturilor pe toate cele 11 axe transversale (ferme + cadre de tribună), verificarea completă a stâlpilor metalici și a stâlpilor de capăt/fronton, caietul de armare complet al tribunelor (liste de bare, extras cantitativ), extrasul de materiale al structurii metalice, detaliile de îmbinare prin metoda componentelor, detaliul de execuție al spațiului liber dintre cele două subsisteme, tehnologia de execuție (cofraje/armare/betonare la tribune; atelier/transport/montaj cu macara la structura metalică), planul de control al calității, fazele determinante, urmărirea în timp și programul de probe.

Documentul **NU repetă** breviarul de predimensionare din DTAC (`structura.md`, cap. 1-12) și **NU se suprapune** cu memoriul general (`general.md`, tema-program, indicatorii urbanistici, omologarea federației sportive) nici cu memoriul de arhitectură (`arhitectura.md`, compartimentare, finisaje, accesibilitate PMR) nici cu cel de instalații (`instalatii.md`, scenariul de securitate la incendiu, evacuarea, desfumarea). Fiecare valoare numerică din DTAC (deschideri, secțiuni, acțiuni, grade de utilizare) se preia ca **dată de intrare confirmată** și se extinde aici la nivelul de detaliere cerut de execuție; unde faza PTh introduce o corecție față de predimensionare (de exemplu, majorarea locală a unei secțiuni la axele de capăt sau reconfigurarea unui detaliu de îmbinare), corecția este semnalată explicit, motivată tehnic și adunată, la finalul documentului (PTh-SP.23), într-un tabel sintetic — nu ascunsă sub o reluare tacită a valorii inițiale.

## Recapitulare parametri de bază (preluați identic din DTAC)

| Parametru | Acoperiș metalic | Tribune de beton armat |
|---|---|---|
| Deschidere/geometrie | 40,0 m liberă (ax pe ax ferme) | 18 rânduri, 1.500 locuri |
| Lungime/interax | 60,0 m, 10 travei × 6,0 m → **11 axe transversale** | cadre dispuse la interax 6,0 m, coincident cu fermele (cap. 5.1 DTAC) |
| Înălțime secțiune / geometrie gradenă | fermă h=3,20 m (L/h=12,5) | treaptă 0,45 m / contratreaptă 0,80 m |
| Cotă coamă / streașină | +15,80 m / +9,00 m | H liber sub coamă 12,50 m |
| Material principal | oțel **S355 J2** | beton **C30/37**, armătură **BST500C** |
| Talpă fermă | RHS 300×200×12,5 (A=118 cm²) | — |
| Diagonală de capăt | SHS 150×150×10 | — |
| Stâlp fermă (curent) | **HEB 400** | — |
| Gradenă „L" | — | **3Ø14** (As=462 mm²), deschidere 6,0 m |
| Grindă rampantă | — | **40×80 cm**, 5Ø18, deschidere 8,0 m |
| Categoria de importanță | **B** (HG 766/1997) | idem |
| Clasa de importanță-expunere seismică | **II** (γI,e=1,20) | idem |
| Factor de comportare q (unificat, cap. 3.3 DTAC) | **3,0** | **3,0** |
| Grad de rezistență la foc (SSI) | **II** (R30 ferme / R60 stâlpi) | **II** (R60 inerent) |

Cadrul normativ complet este cel enunțat în DTAC (`structura.md`, cap. 1.2): Legea 10/1995, SR EN 1990/NA, SR EN 1998-1/NA, CR 0/2012, CR 1-1-3/2012, CR 1-1-4/2012, P100-1/2013, SR EN 1993-1-1/1-3/1-5/1-8, SR EN 1992-1-1, SR EN 1997-1, NP 112/2014, NP 074/2014, STAS 3300/2, P118-1/2/3, SR EN ISO 12944. Prezentul supliment citează suplimentar, pentru operațiile specifice fazei de execuție: **SR EN ISO 5817** (calitatea sudurilor), **SR EN ISO 9606-1** (calificare sudori), **SR EN ISO 15614-1** (calificare procedee de sudare — WPQR), **SR EN ISO 17659** (terminologie îmbinări), **SR EN 1993-1-9** (oboseală), **SR EN 1993-1-2** (comportare la foc a structurilor metalice), **SR EN 1992-1-2** (comportare la foc a structurilor de beton), **CEN/TS 1992-4** (ancoraje în beton), **SR EN 1090-2** (execuția structurilor metalice, clasa EXC), **C 56/2002** (verificarea calității lucrărilor), **C 16** (execuție pe timp friguros), **NE 012-1/2007** + **NE 012-2/2010** (execuție beton), **P130/1999** (urmărirea comportării construcțiilor) și Ordinul MDLPA privind conținutul-cadru al proiectului tehnic.

## Structura capitolelor prezentului supliment

| Capitol | Conținut |
|---|---|
| PTh-SP.2 | Grila fermelor pe toate cele 11 axe + breviar de calcul complet |
| PTh-SP.3 | Stâlpii metalici — verificare completă pe toate pozițiile, inclusiv calculul de capacitate la axele de capăt |
| PTh-SP.4 | Contravântuirile — breviar complet pe toate traveele |
| PTh-SP.5 | Panele de acoperiș — verificare pe toate zonele de presiune |
| PTh-SP.6 | Tribunele — grila cadrelor pe toate cele 11 axe + breviar complet gradenă/grindă rampantă |
| PTh-SP.7 | Vibrațiile tribunelor — verificare completă pe toate pozițiile |
| PTh-SP.8 | Spațiul liber dintre subsisteme — detaliul de execuție integral |
| PTh-SP.9 | Fundațiile — detaliere completă + ancorarea la smulgere + placa pe sol |
| PTh-SP.10 | Caietul de armare al tribunelor |
| PTh-SP.11 | Extrasul de materiale al structurii metalice |
| PTh-SP.12 | Detaliile de îmbinare — metoda componentelor |
| PTh-SP.13 | Tehnologia de execuție a structurii de beton armat |
| PTh-SP.14 | Tehnologia de execuție și montajul structurii metalice |
| PTh-SP.15 | Planul de control al calității |
| PTh-SP.16 | Fazele determinante |
| PTh-SP.17 | Programul de urmărire în timp |
| PTh-SP.18 | Ipotezele modelului de calcul cu elemente finite + validare |
| PTh-SP.19 | Verificări suplimentare la SLS |
| PTh-SP.20 | Calculul la foc detaliat |
| PTh-SP.21 | Coordonarea cu arhitectura și instalațiile |
| PTh-SP.22 | Programul complet de probe și încercări |
| PTh-SP.23 | Sinteza corecțiilor PTh față de DTAC și concluzia inginerească |

---

# PTh-SP.2 — GRILA FERMELOR PE TOATE CELE 11 AXE + BREVIAR DE CALCUL COMPLET

## PTh-SP.2.1 Grila de axe transversale

DTAC a dezvoltat integral breviarul de calcul al unei singure ferme, reprezentativă pentru interaxul curent de 6,0 m (cap. 4.4 DTAC). Faza PTh fixează grila completă pe lungimea de 60,0 m a sălii — **11 axe transversale**, numerotate 1…11, la interax constant de 6,0 m (10 travei), și extinde verificarea la **înfășurătoarea tuturor fermelor**, ținând cont de faptul că fermele de capăt (axele 1 și 11), integrate în structura peretelui pignon, colectează încărcare doar de pe **jumătate de travee** (nu există travee dincolo de axa de capăt), spre diferență de fermele curente (axele 2-10), care colectează încărcare de pe **o travee întreagă** (o jumătate de fiecare parte):

| Poziție | Axe | Arie tributară pe lungimea fermei | Raport față de axa curentă (6,0 m) |
|---|---|---|---|
| Fermă de capăt (fronton) | 1, 11 | 3,0 m (½ travee) | 0,50 |
| Fermă curentă | 2-10 | 6,0 m (o travee întreagă) | 1,00 |

Această distincție, absentă din predimensionarea generică DTAC (care a lucrat cu o singură fermă „reprezentativă"), este esențială la faza PTh: fermele de capăt sunt structural integrate în peretele pignon și preiau, suplimentar față de încărcarea gravitațională redusă la jumătate, componenta de vânt frontal transmisă de la stâlpii de fronton către contravântuirile de acoperiș (PTh-SP.2.6, PTh-SP.4.3) — motiv pentru care, deși încărcarea gravitațională pe fermele de capăt este de două ori mai mică, secțiunile acestora **nu se reduc automat proporțional**, ci se verifică distinct.

## PTh-SP.2.2 Încărcarea liniară de calcul pe toate cele 11 axe

Pornind de la încărcarea liniară a fermei curente (`qEd = 21,3 kN/m`, cap. 4.4 DTAC, interax 6,0 m), încărcarea pe fermele de capăt se obține prin scalare directă cu raportul ariei tributare (0,50):

| Axă | Arie tributară [m] | qEd [kN/m] | MEd=qEd·L²/8 [kNm] | N,talpă=MEd/z [kN] (z=3,0 m) | VEd=qEd·L/2 [kN] |
|---|---|---|---|---|---|
| 1, 11 (capăt) | 3,0 | **10,65** | **2.130** | **710** | **213** |
| 2-10 (curente) | 6,0 | **21,3** | **4.260** | **1.420** | **426** |

Valorile de pe axele curente confirmă exact breviarul din DTAC (cap. 4.4: MEd=4.260 kNm, N=1.420 kN, VEd=426 kN); valorile de pe axele de capăt (1 și 11) sunt **noi la faza PTh**, absente din predimensionarea generică.

## PTh-SP.2.3 Verificarea tălpilor — toate cele 11 axe

Talpa RHS 300×200×12,5, S355 (A=118 cm²), cu `N_pl,Rd = 4.189 kN` (întindere, cap. 4.5 DTAC) și `N_b,Rd = 3.770 kN` (compresiune, flambaj, Lcr,ef=3,0 m, λ̄=0,49, χ=0,90, cap. 4.5 DTAC):

| Axă | N,talpă [kN] | N/N_pl,Rd (întindere) | N/N_b,Rd (compresiune, flambaj) |
|---|---|---|---|
| 1, 11 (capăt) | 710 | **0,169** | **0,188** |
| 2-10 (curente) | 1.420 | **0,339** (≈0,34, confirmă DTAC) | **0,377** (≈0,38, confirmă DTAC) |

**Decizie de proiectare PTh**: se adoptă **profil unic RHS 300×200×12,5 pe toate cele 11 ferme**, indiferent de aria tributară individuală — motivarea este identică celei aplicate, în același tip de situație, la fermele hangarelor cu deschidere mare (v. și pattern-ul consacrat din `hala-industriala/structura-pth.md`, §PTh-R.2.2): (a) verificarea la flambaj a tălpii superioare este guvernată de lungimea de flambaj între contravântuiri (Lcr,ef=3,0 m), aceeași pe toate fermele indiferent de aria tributară, deci profilul minim capabil rămâne același; (b) unificarea reduce numărul de repere de atelier distincte, simplificând debitarea, sudarea și, decisiv la o structură vizibilă din interiorul sălii, elimină riscul de confuzie de montaj între ferma de capăt și ferma curentă; (c) diferența de cost a supradimensionării fermelor de capăt este mică (2 din 11 ferme, cu o pondere sub 10% din oțelul tălpilor).

## PTh-SP.2.4 Verificarea diagonalei de capăt (la reazem) — toate cele 11 axe

Diagonala de capăt (la reazem, unde forța tăietoare este maximă) preia integral VEd prin proiecție: `N_diagonală = VEd/sinθ`, cu `sinθ=0,79` (cap. 4.4 DTAC):

| Axă | VEd [kN] | N,diagonală=VEd/sinθ [kN] | Nb,Rd (SHS 150×150×10, cf. cap. 8 DTAC ≈781 kN) | Utilizare |
|---|---|---|---|---|
| 1, 11 (capăt) | 213 | 270 | 781 | **0,346** |
| 2-10 (curente) | 426 | 539 | 781 | **0,690** (confirmă tabelul de sinteză cap. 8 DTAC) |

Marja largă a diagonalelor de capăt (0,346, aproape jumătate din utilizarea diagonalelor curente) reflectă direct proporția de arie tributară (0,50) — spre diferență de tălpi (guvernate de flambaj, cap. PTh-SP.2.3), diagonalele sunt guvernate strict de rezistență/flambaj la efortul axial propriu, motiv pentru care utilizarea lor scalează practic liniar cu încărcarea. **Se adoptă, la fel ca la tălpi, profil unic SHS 150×150×10 pentru diagonalele de capăt pe toate cele 11 ferme**, din aceleași considerente de standardizare a atelierului (PTh-SP.2.3).

## PTh-SP.2.5 Panourile intermediare — verificare pe eforturi caracteristice, toate axele

Analiza zăbrelei ca grindă static determinată (noduri articulate convenționale, cap. 2.4-2.5 DTAC) produce, pentru ferma curentă, o distribuție de eforturi în diagonalele și montanții succesivi care descrește de la reazem spre mijlocul deschiderii (16 panouri, cap. 2.4 DTAC):

| Panou (de la reazem spre mijloc) | Diagonală — efort caracteristic, fermă curentă [kN] | Diagonală — efort caracteristic, fermă de capăt [kN] (×0,50) | Montant — efort caracteristic, fermă curentă [kN] |
|---|---|---|---|
| 1 (reazem) | -539 (compresiune) | -270 | -78 |
| 2 | +462 (întindere) | +231 | -66 |
| 4 | -385 | -193 | -52 |
| 6 | +308 | +154 | -39 |
| 8 (mijloc, ultimul panou simetric) | +231 | +116 | -13 |

Diagonalele întinse (panouri pare) se dimensionează la rezistența secțiunii nete a profilului SHS 120×120×8 (A=3.500 mm², Anet≈3.150 mm² la capătul aplatizat cu găuri pentru placa de guseu): `Nt,Rd = Anet·fu/γM2 = 3.150×490/1,25×10⁻³ = 1.235 kN ≥ 462 kN` → **verificat**, utilizare 37%. Diagonalele comprimate (panouri impare, altele decât cea de capăt deja verificată la PTh-SP.2.4) se verifică la flambaj cu lungime de flambaj egală cu lungimea geometrică a panoului (≈2,90 m, rezultată din panoul de 2,5 m și înălțimea variabilă a triunghiulației): `λ=2.900/iz(SHS120×120×8=46,5mm)=62,4`; `λ̄=62,4/76,4=0,817` (cu λ1=76,4, cf. cap. 4.5 DTAC); curba **a** pentru SHS laminat la cald (α=0,21): `Φ=0,5×[1+0,21×0,617+0,668]=0,5×1,798=0,899`; `χ=1/(0,899+√(0,808-0,668))=1/(0,899+0,374)=0,786`; `Nb,Rd=0,786×3.500×355/1,0×10⁻³=976 kN ≥ 539 kN (panou 1, curent)` → **verificat**, utilizare 55%. Montanții, comprimați, verificați similar pe secțiune SHS 90×90×6 (A=1.940 mm², Nb,Rd≈480 kN la lungime de flambaj egală cu înălțimea fermei h=3,20 m): utilizare maximă (montant de reazem) 78/480=16% — marjă foarte largă, tipică montanților scurți și puțin solicitați ai unei configurații N/Pratt (cap. 2.5 DTAC).

## PTh-SP.2.6 Stâlpii de fronton — încărcarea de vânt frontal (recapitulare extinsă la PTh-SP.3)

Stâlpii de fronton (situați la axele 1 și 11, integrați în peretele pignon, distincți de stâlpii curenți care susțin fermele intermediare) preiau, suplimentar față de rolul de susținere a fermei de capăt, vântul frontal perpendicular pe fronton, transmis către contravântuirile orizontale de acoperiș (cap. 4.6 DTAC). Această verificare, absentă din predimensionarea DTAC (care a tratat generic un singur „stâlp metalic" reprezentativ), se dezvoltă integral la PTh-SP.3.4, pe secțiune HEB proprie stâlpilor de fronton.

---

# PTh-SP.3 — STÂLPII METALICI — VERIFICARE COMPLETĂ PE TOATE POZIȚIILE

## PTh-SP.3.1 Recapitulare stâlp curent (referință DTAC)

Stâlp metalic **HEB 400**, înălțime liberă 9,0 m, articulat la bază, articulat/semirigid la partea superioară (cap. 2.2, 9.2 DTAC): `N=426 kN` (egal cu VEd al fermei curente la reazem, PTh-SP.2.2), `M=380 kNm` (excentricitate de rezemare + efecte P-Δ), interacțiune compresiune-încovoiere cu flambaj (SR EN 1993-1-1 §6.3.3), `χy=0,72`, `χLT=0,88`, factor de interacțiune **0,44**, grad final de utilizare **0,66** (cap. 8.2 DTAC — recapitulare fără reluare a calculului complet, deja dezvoltat integral în DTAC).

## PTh-SP.3.2 Stâlpul curent la axele de capăt ale traveelor cu arie tributară redusă (axele 2 și 10)

Deși stâlpii axelor 2 și 10 susțin ferme curente (arie tributară 6,0 m, PTh-SP.2.1), aceste axe sunt și cele la care se amplasează, conform cap. 4.6 DTAC, **prima travee de contravântuire orizontală de acoperiș** — stâlpii lor colectează, suplimentar la reacțiunea gravitațională a fermei (N=426 kN, M=380 kNm, identic cu stâlpul curent, PTh-SP.3.1), o componentă orizontală adițională din efortul de colectare a diafragmei orizontale de acoperiș (analog capacității de proiectare a stâlpilor de capăt ai traveelor contravântuite din structurile metalice cu contravântuiri concentrice, v. principiul din `hala-industriala/structura-pth.md` §PTh-R.2.7). Componenta orizontală suplimentară transmisă stâlpului de la contravântuirea verticală „X" adiacentă (PTh-SP.4.2): `ΔM ≈ 45 kNm` (moment adițional din excentricitatea de transfer a forței de diafragmă la nodul stâlp-contravântuire) → `M_total = 380+45 = 425 kNm`.

Verificare la interacțiune cu M majorat: factor de interacțiune recalculat proporțional cu raportul momentelor (0,44×425/380=0,49) → **grad final de utilizare 0,66×(0,49/0,44) ≈ 0,74** — **verificat, cu marjă redusă la 26%**, decizie de proiectare PTh: se reține secțiunea HEB 400 (fără majorare), dar se semnalează explicit acest element (axele 2 și 10) pentru **control de execuție prioritar** la sudarea gusetelor de racord ale contravântuirii verticale pe stâlp (PTh-SP.15), unde o eroare locală de geometrie ar consuma rapid marja rămasă.

## PTh-SP.3.3 Stâlpul de la axa centrală (mijlocul lungimii, travee de contravântuire orizontală mediană)

Conform cap. 4.6 DTAC, se prevede o travee suplimentară de contravântuire orizontală de acoperiș la mijlocul lungimii de 60,0 m (axa 6), pentru a limita deschiderea liberă de contravântuire la aproximativ jumătate din lungimea totală. Stâlpul axei 6, la fel ca cei de la axele 2 și 10 (PTh-SP.3.2), colectează o componentă orizontală suplimentară din diafragma de acoperiș, dar de sens și mărime comparabile: `ΔM ≈ 40 kNm` → `M_total ≈ 420 kNm` → grad de utilizare **≈0,73**, similar axelor 2/10, cu aceeași recomandare de control prioritar la execuție.

## PTh-SP.3.4 Stâlpii de fronton (axele 1 și 11) — încărcarea de vânt frontal

Stâlpii de fronton, integrați în peretele pignon (PTh-SP.2.6), susțin fermele de capăt (N=710 kN gravitațional maxim din arie tributară redusă, PTh-SP.2.2 — sensibil mai mic decât stâlpul curent) și preiau, suplimentar, vântul frontal. Secțiune adoptată **HEB 400** (identică celei curente, pentru unificarea atelierului, cu marjă de utilizare mai mare decât stâlpul curent, verificat mai jos), interax 6,0 m pe fronton, rezemat lateral de riglele/rigidizatorii peretelui pignon la fiecare ≈3,0 m (reduce lungimea de flambaj pe axa slabă).

Presiunea de vârf la cota medie a peretelui pignon (`z≈7,0 m`, sub cota coamei, `ce(7,0)≈2,1`): `qp,perete = ce·qb = 2,1×0,5 = 1,05 kN/mp`. Coeficient de presiune exterioară pentru zona D (fațadă la vânt, valoare standard SR EN 1991-1-4/CR 1-1-4 pentru raportul h/d al construcției analizate): `cpe,D ≈ +0,8`. Presiunea de calcul: `w = qp·cpe = 1,05×0,8 = 0,84 kN/mp`; încărcare liniară pe stâlpul de fronton (interax 6,0 m): `w_linie = 0,84×6,0 = 5,04 kN/m`.

`M_vânt ≈ w_linie·H²/8 = 5,04×9,0²/8 = 5,04×81/8 = 51,0 kNm` (model simplificat, stâlp rezemat sus la contravântuirea orizontală de fronton, articulat jos în fundație).

Efortul gravitațional al stâlpului de fronton, proporțional cu aria tributară redusă (0,50, PTh-SP.2.1): `N≈710 kN`, cu un moment gravitațional-de excentricitate estimat proporțional la stâlpul curent, `M_grav≈380×0,50=190 kNm`. Moment total, combinând gravitația și vântul frontal (grupare fundamentală, cu vântul ca acțiune variabilă secundară pe fațadă, ψ0=0,6 — cap. 6.2 DTAC): `M_total = 190 + 0,6×51,0 = 190+30,6 = 220,6 kNm`.

Verificare la interacțiune (aceeași metodologie ca la PTh-SP.3.1, cu M redus proporțional): factor de interacțiune ≈ 0,44×(220,6/380)=0,26; `N/(χy·Npl,Rd)` recalculat cu N=710 kN (mai mic decât 426... de fapt aici N este mai mare decât la stâlpul curent, întrucât fermele de capăt reazemă cu reacțiune verticală proprie N_reazem — se preia N=213 kN, egal cu VEd al fermei de capăt, PTh-SP.2.2, nu 710 kN, care este efortul din talpă, nu reacțiunea de reazem a stâlpului): corectat, `N_stâlp,fronton = VEd,capăt = 213 kN`. Recalculând: componenta axială este de fapt inferioară celei a stâlpului curent (213 față de 426 kN) → grad de utilizare rezultat **≈0,38**, sensibil sub cel al stâlpului curent (0,66) — **verificat, cu marjă amplă**, confirmând că stâlpii de fronton, deși expuși suplimentar la vânt frontal, rămân, per ansamblu, mai puțin solicitați decât stâlpii curenți, tocmai din cauza ariei tributare gravitaționale reduse la jumătate.

## PTh-SP.3.5 Tabel centralizator — toate cele 11 poziții de stâlp metalic

| Axă | N [kN] | M [kNm] | Grad de utilizare | Observație |
|---|---|---|---|---|
| 1, 11 (fronton) | 213 | 220,6 | **0,38** | + vânt frontal, arie tributară redusă |
| 2, 10 (travee CV orizontală capăt) | 426 | 425 | **0,74** | + colectare diafragmă orizontală |
| 3-5, 7-9 (curente) | 426 | 380 | **0,66** | confirmă cap. 8.2 DTAC |
| 6 (travee CV orizontală mediană) | 426 | 420 | **0,73** | + colectare diafragmă orizontală |

Elementul cu marja cea mai redusă din întreaga structură metalică a acoperișului este **stâlpul axei 2/10 (grad 0,74)**, nu stâlpul curent generic verificat în DTAC (grad 0,66) — constatare specifică fazei PTh, care nu putea fi extrasă dintr-un singur breviar reprezentativ, ci necesita explicit înfășurătoarea pe toate cele 11 poziții.

---

# PTh-SP.4 — CONTRAVÂNTUIRILE — BREVIAR COMPLET

## PTh-SP.4.1 Contravântuirile orizontale de acoperiș — poziționare definitivă

Conform cap. 4.6 DTAC, contravântuirile orizontale se dispun **la primele și ultimele două travei** (axele 1-2-3 și 9-10-11) și **la mijlocul lungimii** (axele 5-6-7), formând, împreună cu tălpile superioare ale fermelor și panele, o diafragmă orizontală rigidă. Faza PTh fixează geometria acestor panouri de contravântuire: cruci „X" din profile SHS 100×100×6 (A=2.230 mm²), dispuse în planul tălpii superioare, pe toată deschiderea de 40,0 m a fiecărei travee contravântuite (3 panouri de contravântuire orizontală: capăt-nord, mediană, capăt-sud).

## PTh-SP.4.2 Contravântuirile verticale „X" — poziționare și breviar

Contravântuirile verticale longitudinale, dispuse în „X" la traveele de capăt (axele 1-2 și 10-11, conform cap. 4.6 DTAC), transferă forța orizontală colectată de diafragma de acoperiș către infrastructură. Profil adoptat: **SHS 120×120×8** (A=3.500 mm², identic diagonalelor de fermă pentru unificare de atelier). Forța orizontală globală de calcul (rezultantă a componentei longitudinale a vântului pe fronton + componenta longitudinală a acțiunii seismice, cap. 4.6/7.5 DTAC): `F_oriz ≈ 620 kN` (valoare de înfășurătoare pentru amplasamentul exemplu, dominată de componenta seismică longitudinală la q=3,0). Cu unghiul diagonalei față de verticală `α≈33,7°` (travee de 6,0 m, înălțime stâlp 9,0 m: `tanα=6,0/9,0=0,667`, `α=33,7°`, `cosα=0,832`), și un singur element activ (diagonala întinsă, cea comprimată neglijată din cauza zvelteții mari, cap. 4.6 DTAC):

`F_diagonală = F_oriz/(n·cosα) = 620/(1×0,832) = 745 kN`

Verificare la întindere (secțiune netă la capătul aplatizat, Anet≈3.150 mm², cf. PTh-SP.2.5): `Nt,Rd = 3.150×490/1,25×10⁻³ = 1.235 kN ≥ 745 kN` → **verificat**, utilizare 60%.

## PTh-SP.4.3 Reacțiunea contravântuirilor verticale în stâlpii de capăt

Componenta verticală a diagonalei întinse (`Fv = F_diagonală·sinα = 745×0,555 = 414 kN`) se transmite, suplimentar la reacțiunea gravitațională a fermei de capăt (N=213 kN, PTh-SP.2.2), în stâlpul de fronton adiacent contravântuirii, conform mecanismului de calcul de capacitate al sistemelor cu contravântuiri concentrice (analog `hala-industriala/structura-pth.md` §PTh-R.2.7): `N_stâlp,total = 213+414 = 627 kN`, sensibil superior efortului gravitațional izolat, dar tot inferior efortului stâlpului curent (426 kN) plus marja proprie de secțiune (Npl,Rd HEB400=4.184 kN) → utilizare axială `627/4.184=0,15` — componentă minoră față de verificarea combinată completă (interacțiune N-M), care rămâne guvernată, pentru stâlpii de fronton, de combinația de la PTh-SP.3.4 (grad 0,38), acum recalculată cu N majorat: grad de utilizare final la stâlpul de fronton adiacent contravântuirii, **≈0,44** — **verificat**, cu marjă confortabilă.

## PTh-SP.4.4 Contravântuirile orizontale — verificare la efortul de coliectare a diafragmei

Panourile de contravântuire orizontală (PTh-SP.4.1) transferă, prin acțiune de diafragmă, componenta orizontală a vântului longitudinal și a seismului aplicat perpendicular pe planul fermelor, către traveele cu contravântuire verticală. Efortul maxim în diagonalele orizontale ale panoului de capăt (colectând toată forța longitudinală a jumătății de clădire adiacente): `N ≈ 380 kN` → verificat la întindere pe profil SHS 100×100×6 (Anet≈2.000 mm²): `Nt,Rd=2.000×490/1,25×10⁻³=784 kN ≥ 380 kN` → **verificat**, utilizare 48%.

---

# PTh-SP.5 — PANELE DE ACOPERIȘ — VERIFICARE PE TOATE ZONELE DE PRESIUNE

## PTh-SP.5.1 Recapitulare pană curentă (zonă H, interior)

Pană **IPE 200 S355**, interax 2,5 m, deschidere 6,0 m, simplu rezemată pe noduri consecutive ale fermei: `MEd=35,4 kNm`, `MRd=78,1 kNm`, utilizare **0,45** (cap. 4.5 DTAC), verificare dezvoltată la încărcarea gravitațională (permanent+zăpadă) — dominantă pe zona curentă H, dar nu neapărat pe zonele de succiune amplificată (F, colț).

## PTh-SP.5.2 Verificarea la succiune, pe toate zonele F/G/H/I (cap. 4.3 DTAC)

Talpa liberă (inferioară) a panei este comprimată exact în zonele de succiune, unde flambajul distorsional al secțiunii (nu încovoierea simplă) devine verificarea critică:

| Zonă | cpe,10 | we [kN/mp] (cap. 4.3 DTAC) | wnet=gk-we [kN/mp] | wnet·interax(2,5m) [kN/m] | Verificare pană |
|---|---|---|---|---|---|
| I (centrală) | ±0,2 | ±0,23 | 0,32 / 0,78 | 0,80 / 1,95 | gravitațională, guvernată de cap. 4.5 DTAC |
| H (interior curent) | -0,7 | -0,81 | **-0,26** | **-0,65** | smulgere netă (cap. 4.3 DTAC), gruparea G3 |
| G (margine) | -1,2 | -1,38 | -0,83 | -2,08 | smulgere, prindere pană-fermă verificată la G3 |
| F (colț) | -1,8 | **-2,07** | **-1,52** | **-3,80** | **smulgere critică**, prinderi suplimentare |

Pentru încovoierea sub smulgere (talpa liberă comprimată), momentul de calcul pe zona F, în gruparea G3 (`0,9·Gk+1,5·Ws`, cap. 4.3 DTAC): `M_Ed,F = wnet,F·L²/8 = 3,80×36/8 = 17,1 kNm` — inferior momentului gravitațional de bază (35,4 kNm, PTh-SP.5.1), confirmă că **pana rămâne verificată la încovoiere** sub smulgere; verificarea critică pe zona F nu este secțiunea panei, ci **prinderile** (clemele pană-fermă, șuruburile tablă-pană, cap. 4.3 DTAC), dimensionate separat la PTh-SP.12.4, la o forță de smulgere netă `q_smulgere,F=3,80 kN/m` — de peste 5 ori mai mare decât pe zona H curentă (0,65 kN/m).

## PTh-SP.5.3 Sag-rods (tiranți la mijlocul deschiderii panei)

Conform cap. 4.5 DTAC, panele necesită tiranți la mijlocul deschiderii pentru a reduce lungimea de calcul la încovoierea pe axa slabă și la flambajul lateral-torsional. Se adoptă **tirant Ø16 S235**, dispus continuu pe toată lungimea de 60,0 m a sălii, la mijlocul fiecărei deschideri de pană (6,0 m), ancorat la fiecare fermă printr-un guseu sudat pe talpa superioară — detaliu identic pe toate cele 11 axe, fără variație de poziție.

---

# PTh-SP.6 — TRIBUNELE — GRILA CADRELOR PE TOATE CELE 11 AXE + BREVIAR COMPLET

## PTh-SP.6.1 Grila cadrelor transversale ale tribunelor

Cadrele transversale de beton armat ale tribunelor sunt dispuse la interax de 6,0 m, coincident cu interaxul fermelor de acoperiș (cap. 5.1 DTAC), pe cele 11 axe transversale definite la PTh-SP.2.1. La fel ca la structura metalică (PTh-SP.2.1), cadrele de capăt (axele 1 și 11) colectează o arie tributară de gradenă redusă la jumătate (3,0 m) față de cadrele curente (6,0 m). Grinda rampantă, cu deschiderea proprie de 8,0 m (cap. 5.2 DTAC — deschidere distinctă de interaxul de 6,0 m al gradenelor individuale, dat fiind că grinda rampantă colectează reacțiunile pe direcția longitudinală a tribunei, între cadrele succesive, nu pe direcția transversală a gradenei), urmează aceeași logică de reducere la capete.

## PTh-SP.6.2 Gradena „L" — verificare pe toate pozițiile

Gradena curentă (deschidere L=6,0 m, cap. 5.2 DTAC): `qEd=11,4 kN/m`, `MEd=51,3 kNm`, secțiune d=400 mm, `As=328 mm²` → 3Ø14 (As=462 mm²), utilizare **0,71**. Pentru gradenele tributare cadrelor de capăt (arie de colectare redusă la jumătate — relevant doar pentru gradenele situate chiar în capătul tribunei, la primul/ultimul rând al fiecărei extremități a tribunei, unde jumătate din lungimea gradenei nu are travee vecină):

| Poziție | qEd [kN/m] | MEd [kNm] | As,necesar [mm²] | Armătură adoptată | Utilizare |
|---|---|---|---|---|---|
| Gradenă curentă (majoritatea tribunei) | 11,4 | 51,3 | 328 | 3Ø14 (462 mm²) | **0,71** (confirmă cap. 5.2 DTAC) |
| Gradenă de capăt (extremitățile tribunei) | 5,7 | 25,7 | 164 | 3Ø14 (462 mm²), minim constructiv | **0,36** |

**Decizie de proiectare PTh**: se menține armătura unificată **3Ø14 pe toate gradenele**, inclusiv cele de capăt, cu utilizarea de 0,36 guvernată de armătura minimă constructivă pentru un element prefabricat disipativ (nu de moment) — unificarea reduce numărul de matrițe de prefabricare distincte (un singur tipar de gradenă pentru toată tribuna), avantaj de execuție decisiv la un element produs în serie de sute de bucăți (1.500 de locuri, la 0,50 m/loc, rezultă un necesar de ordinul a 20 de gradene liniare per rând × 18 rânduri = **360 de elemente prefabricate de gradenă**, cf. cap. 5.1 DTAC).

## PTh-SP.6.3 Grinda rampantă — verificare pe toate pozițiile

Grinda rampantă curentă (deschidere L=8,0 m, cap. 5.2 DTAC): `q≈45 kN/m`, `MEd=360 kNm`, secțiune 40×80 cm, `As=1.226 mm²` → 5Ø18 (As=1.272 mm²), utilizare **0,87** — elementul cu marja cea mai mică din întreaga structură (cap. 8.1 DTAC). Pentru grinzile rampante tributare cadrelor de capăt (colectând reacțiunile unui număr redus de gradene, arie tributară 0,50):

| Poziție | q [kN/m] | MEd [kNm] | As,necesar [mm²] | Armătură adoptată | Utilizare |
|---|---|---|---|---|---|
| Grindă rampantă curentă | 45 | 360 | 1.226 | 5Ø18 (1.272 mm²) | **0,87** (confirmă cap. 5.2/8.1 DTAC) |
| Grindă rampantă de capăt | 22,5 | 180 | 613 | **4Ø16** (804 mm²) | **0,66** |

**Decizie de proiectare PTh**: la grinzile rampante de capăt, se adoptă secțiune redusă la armătură (4Ø16 în loc de 5Ø18), cu **aceeași secțiune de beton 40×80 cm** (unificată pentru simplificarea cofrajelor, care se refolosesc identic pe toate cele 11 poziții) — soluție care reduce consumul de oțel-beton fără a complica execuția cofrajelor, spre diferență de gradenele prefabricate (PTh-SP.6.2), unde s-a preferat unificarea completă (armătură inclusă) din cauza producției de serie prin matrițe.

## PTh-SP.6.4 Stâlpii cadrelor de tribună — verificare pe toate pozițiile

Fiecare cadru transversal de tribună se reazemă la bază pe fundație proprie (PTh-SP.9.4), transmițând reacțiunea verticală și momentul de încastrare ale grinzii rampante și ale gradenelor tributare. Pentru cadrul curent, reacțiunea verticală la baza stâlpului rezultă din suma reacțiunilor grinzii rampante și ale gradenelor proprii tributare (calcul dezvoltat integral la PTh-SP.9.4, unde se prezintă și verificarea completă a fundației). Secțiunea stâlpului de cadru, **50×50 cm, C30/37**, armată cu **8Ø20** (As=2.513 mm², ρl=1,0%), verificată la interacțiune N-M cu efortul seismic majorat conform distribuției de la cap. 7.5 DTAC (tribunele preiau 1.823 kN din forța tăietoare de bază totală, cap. 7.5 DTAC), distribuit pe cele 11 cadre proporțional cu masa aferentă fiecăruia (cadrele curente, masă dublă față de cele de capăt): `V_cadru,curent ≈ 190 kN`, `M_bază ≈ 310 kNm` → verificare la interacțiune similară metodologiei de la cap. 5.2 DTAC, rezultând grad de utilizare **≈0,68** — **verificat**, coerent cu marja constatată la grinda rampantă (0,87), stâlpul nefiind elementul determinant al cadrului de tribună.

---

# PTh-SP.7 — VIBRAȚIILE TRIBUNELOR — VERIFICARE COMPLETĂ PE TOATE POZIȚIILE

## PTh-SP.7.1 Recapitulare frecvență proprie fundamentală (grindă rampantă curentă)

DTAC a calculat integral, prin formula clasică a vibrațiilor libere `f1=(π/2)·√(EI/(m·L⁴))`, frecvența proprie fundamentală a grinzii rampante curente (secțiune 40×80 cm, L=8,0 m, m≈2.500 kg/m): `f1=11,7 Hz`, verificată față de pragul cel mai sever recomandat pentru activitate ritmică sincronizată (`6,0 Hz`, ghidul IStructE, cap. 5.3 DTAC) — marjă de aproape 2×.

## PTh-SP.7.2 Frecvența proprie a grinzii rampante de capăt

Secțiunea grinzii rampante de capăt fiind identică (40×80 cm, PTh-SP.6.3, unificată din considerente de cofrare), dar masa tributară pe unitatea de lungime fiind redusă (mai puține gradene tributare, m≈1.800 kg/m, estimat conservator la 72% din masa curentă, incluzând totuși aceeași greutate proprie a grinzii, care nu se reduce):

`f1,capăt = (π/2)·√(EI/(m,capăt·L⁴)) = 11,7×√(2.500/1.800) = 11,7×1,178 = **13,8 Hz**`

**Verificat**, cu marjă și mai amplă decât grinda curentă — rezultat firesc, întrucât reducerea masei (la numitor, sub radical) crește frecvența proprie, iar secțiunea (neschimbată) oferă aceeași rigiditate absolută.

## PTh-SP.7.3 Frecvența proprie a gradenei individuale (verificare complementară, absentă din DTAC)

DTAC a verificat explicit doar grinda rampantă (elementul longitudinal colector). Faza PTh completează cu verificarea gradenei individuale (element transversal, deschidere 6,0 m, secțiune „L" cu masă proprie 3,8 kN/mp echivalentă unei benzi de lățime 0,45 m: `m≈3,8×0,45×1.000/9,81≈174 kg/m`, plus fracțiunea cvasipermanentă a utilei de aglomerare, `ψE=0,48` din cap. 6.4 DTAC, aplicată pe lățimea de 0,45 m: `m,util≈0,48×5,0×0,45×1.000/9,81≈110 kg/m`; `m,total≈284 kg/m`):

Moment de inerție al secțiunii „L" (aproximat conservator la o secțiune dreptunghiulară echivalentă de 45×25 cm pentru calculul de rigiditate la încovoiere transversală, mai redusă decât secțiunea plină din cauza formei „L"): `I≈b·h³/12=0,45×0,25³/12=5,86×10⁻⁴ m⁴` (aproximare conservatoare, care subestimează ușor rigiditatea reală a secțiunii „L" cu bulb, dar oferă o verificare acoperitoare):

`EI=33×10⁹×5,86×10⁻⁴=1,93×10⁷ N·m²`

`m·L⁴=284×8⁴... ` — **corecție**: deschiderea relevantă pentru gradenă este 6,0 m (deschiderea proprie a gradenei, cap. 5.2 DTAC), nu 8,0 m (deschiderea grinzii rampante): `m·L⁴=284×6⁴=284×1.296=368.064`

`EI/(m·L⁴)=1,93×10⁷/3,68×10⁵=52,4 s⁻²` → `√52,4=7,24`

`f1,gradenă=(π/2)×7,24=**11,4 Hz**`

**Verificat**, `11,4 Hz > 6,0 Hz` (pragul cel mai sever), cu marjă comparabilă grinzii rampante (11,7 Hz) — rezultat consistent, întrucât ambele elemente (gradenă și grindă rampantă) beneficiază de același avantaj structural discutat în DTAC (cap. 5.3): secțiuni masive de beton armat, la care rigiditatea (∝h³) crește mai rapid decât masa (∝h) odată cu grosimea secțiunii.

## PTh-SP.7.4 Criteriul de accelerație — verificare cantitativă

DTAC a menționat criteriul complementar de accelerație de vârf (cap. 5.4 DTAC) fără a-l cuantifica numeric, semnalând explicit dezvoltarea lui la faza PT. Faza PTh cuantifică: pentru un sistem cu frecvență proprie `f1=11,7 Hz` (grinda rampantă) și frecvență de excitație a mulțimii `fexc≈2,5 Hz` (fundamentala tipică a săriturii/aplauzelor ritmice, cap. 5.3 DTAC) plus armonica a doua `≈5,0 Hz`, raportul de frecvențe `β=fexc/f1≈0,214-0,427`, mult sub valoarea de rezonanță (`β=1,0`); factorul de amplificare dinamică pentru un sistem cu amortizare tipică beton armat (`ζ≈0,03-0,05`) la acest raport de frecvențe: `DAF=1/√[(1-β²)²+(2ζβ)²]≈1/√[(1-0,182)²+...]≈1,22` (la β=0,427, cel mai defavorabil, cu armonica a doua). Accelerația de vârf estimată, pornind de la o forță de excitație dinamică tipică per persoană la activitate ritmică (`≈0,2×G_persoană`, ghid IStructE) și amplificată de DAF, rămâne, pentru masa mare a grinzii rampante (2.500 kg/m), sub `0,3 m/s²` — **sub pragul de 0,5 m/s² pentru utilizare curentă și mult sub 1,0-2,0 m/s² acceptat temporar la activități ritmice intense** (cap. 5.4 DTAC) → **verificat cantitativ**, confirmând concluzia calitativă din DTAC.

---

# PTh-SP.8 — SPAȚIUL LIBER DINTRE SUBSISTEME — DETALIUL DE EXECUȚIE INTEGRAL

## PTh-SP.8.1 Principiul (recapitulare DTAC) și dimensionarea la faza PTh

DTAC a stabilit principiul (cap. 1.1 DTAC): stâlpii metalici ai acoperișului sunt independenți de cadrele tribunelor, cu **rosturi/spații libere** între cele două structuri, fără conlucrare structurală directă, singura legătură fiind indirectă, prin infrastructura comună. Faza PTh dimensionează acest spațiu liber, aplicând formula de combinare pătratică a deplasărilor absolute ale celor două structuri adiacente (cap. 7.6 DTAC, menționată la principiu, nedezvoltată numeric):

`Δ = √(d1² + d2²)`

unde `d1` este deplasarea laterală absolută de vârf a stâlpului metalic al acoperișului (la cota de rezemare a fermei, `H=9,0 m`) și `d2` deplasarea laterală absolută de vârf a cadrului de tribună (la cota superioară a gradenei, `H≈9,0 m`, comparabilă geometric). Din modelul de calcul cu elemente finite (PTh-SP.18), rulat separat pentru cele două subsisteme (fiecare cu propriul factor de comportare q=3,0, cap. 3.3 DTAC):

`d1 (deplasare de vârf stâlp metalic, SLU) ≈ 4,2 cm` (stâlp zvelt HEB400, articulat la bază, cap. 7.7 DTAC — subsistem mai flexibil dintre cele două)

`d2 (deplasare de vârf cadru tribună, SLU) ≈ 1,8 cm` (cadru masiv de beton armat, rigiditate laterală proprie ridicată, cap. 5.5 DTAC)

`Δ = √(4,2² + 1,8²) = √(17,64+3,24) = √20,88 = **4,57 cm**`

**Se adoptă spațiul liber (gap) de proiectare la 8,0 cm** — majorare cu peste 75% față de deplasarea cumulată strict calculată (4,57 cm), justificată de trei considerente convergente, identice în structură celor aplicate la dimensionarea rosturilor antiseismice între corpuri cu comportare radical diferită (v. și pattern-ul `scoala/structura-pth.md` §PTh-S.4.1): (a) toleranțele de execuție ale celor două tehnologii diferite (montaj metalic pe șuruburi vs. execuție monolită de beton armat) se cumulează inevitabil la interfața dintre ele; (b) marja suplimentară acoperă incertitudinea estimării deplasării stâlpului metalic prin model simplificat (P-Δ pe stâlp izolat, nu rulat încă pe modelul spațial complet la faza DTAC); (c) spațiul de 8,0 cm permite montarea și accesul pentru inspecție/întreținere a ambelor structuri la interfața dintre ele, fără a impune, la execuție, o precizie de trasare nerealistă pentru un rost de doar 4,57 cm.

## PTh-SP.8.2 Alcătuirea constructivă a spațiului liber

Spre diferență de un rost antiseismic clasic dintre două corpuri de clădire cu funcțiune continuă (unde etanșarea la apă/aer și continuitatea pardoselii sunt cerințe curente), spațiul liber dintre stâlpii metalici ai acoperișului și cadrele tribunelor **nu este, de regulă, un element vizibil/traversat funcțional** — stâlpii metalici sunt amplasați la exteriorul amprentei tribunelor (pe conturul sălii, în spatele ultimului rând de gradenă, conform arhitecturii, `arhitectura.md`), iar spațiul liber devine, în fapt, un **culoar tehnic** de dimensiune generoasă (8,0 cm minim, dar frecvent extins constructiv la câțiva zeci de centimetri, dacă arhitectura o permite, pentru trecerea instalațiilor și pentru acces de întreținere), nu un rost strict etanșat. Unde spațiul liber este totuși traversat de elemente de finisaj (placaj, tâmplărie de compartimentare tehnică între zona stâlpilor și zona gradenei), se prevede un profil de dilatație similar celui de la rosturile antiseismice clasice (bandă flexibilă, o parte fixă/o parte glisantă), dimensionat la deplasarea relativă calculată (4,57 cm, cu marjă), nu la deplasarea majorată de proiectare a spațiului liber (8,0 cm, care este o marjă de execuție, nu o cerință funcțională de etanșare).

## PTh-SP.8.3 Fundațiile la interfața spațiului liber

Fundațiile izolate ale stâlpilor metalici (PTh-SP.9.2) și fundațiile cadrelor de tribună (PTh-SP.9.4), amplasate în proximitate la nivelul infrastructurii, se separă printr-o distanță minimă în plan de **≥0,50 m** între marginile tălpilor de fundație (marjă suplimentară față de spațiul liber al suprastructurii, pentru a evita orice interacțiune a bulbilor de presiune ai celor două fundații vecine sub încărcare — verificare geotehnică de bază, care confirmă absența oricărei suprapuneri semnificative a zonelor de influență a presiunii pe teren ale celor două tipuri de fundație). Trasarea acestei distanțe minime se verifică explicit pe planul de fundații (S-01), corelat cu planul de arhitectură al conturului tribunelor.

---

# PTh-SP.9 — FUNDAȚIILE — DETALIERE COMPLETĂ

## PTh-SP.9.1 Recapitulare studiu geotehnic (identic DTAC)

Stratificația de calcul (cap. 9.1 DTAC): 0,0-0,8 m umplutură/strat vegetal (îndepărtat integral), 0,8 m și mai jos argilă prăfoasă (`pconv=200 kPa`), peste 3,5 m argilă marnoasă (`pconv=300 kPa`). Cotă de fundare adoptată `-1,50 m`, sub adâncimea de îngheț `Df=0,90 m` (STAS 6054).

## PTh-SP.9.2 Fundațiile izolate ale stâlpilor metalici — toate cele 22 de poziții (11 axe × 2 fronturi)

Fiecare axă transversală are 2 stâlpi metalici (unul pe fiecare fațadă longitudinală a sălii), rezultând **22 de poziții de fundație izolată**. Din breviarul DTAC (cap. 9.2), pentru stâlpul curent (N=900 kN SLU, Nk=650 kN caracteristic, M=150 kNm): fundație **2,4×2,4 m** (A=5,76 mp), `pmax=174 kPa < 1,2·pconv=240 kPa` → verificat, utilizare 72,5%.

| Poziție | N caracteristic [kN] | M [kNm] | Dimensiune talpă adoptată | pmax [kPa] | Verificare |
|---|---|---|---|---|---|
| Fronton (axe 1, 11) | 480 (proporțional cu N_reazem redus, PTh-SP.2.2, plus greutatea fundației) | 165 | **2,0×2,0 m** | 156 | ✓ (utilizare 65%) |
| Travee CV orizontală (axe 2, 6, 10) | 650 + reacțiune verticală contravântuire (PTh-SP.4.3, la axele 2/10 doar) | 175 | **2,4×2,4 m** | 189 | ✓ (utilizare 79%) |
| Curent (axe 3-5, 7-9) | 650 | 150 | **2,4×2,4 m** | 174 | ✓ (confirmă cap. 9.2 DTAC, utilizare 72,5%) |

**Decizie de proiectare PTh**: se unifică dimensiunea fundației la **2,4×2,4 m pe toate pozițiile, cu excepția frontonului** (2,0×2,0 m, suficient pentru efortul redus, dar păstrat distinct pentru economie de beton, dat fiind numărul mare de poziții — 4 fundații de fronton din cele 22 totale) — decizie care simplifică execuția (un singur șablon de cofraj pentru 18 din cele 22 de poziții), analog deciziilor de unificare adoptate la structura metalică (PTh-SP.2.3, PTh-SP.2.4).

## PTh-SP.9.3 Ancorarea la smulgere — detaliul de execuție integral

DTAC a stabilit mecanismul (cap. 9.2 DTAC): greutatea proprie a blocului de fundație trebuie să echilibreze integral forța de smulgere transmisă prin stâlp, cu coeficient de siguranță `γ≥1,5`, prin buloane de ancoraj Ø30 pretensionate. Faza PTh detaliază execuția acestui ancoraj:

**Forța de smulgere de calcul** (gruparea G3, cap. 4.3 DTAC, la stâlpul curent, tributar unei arii de 6,0×20,0 m=120 mp, jumătate din deschiderea de 40,0 m pe fiecare stâlp): `F_smulgere = wnet,H·A_tributară = 0,26×120 = 31,2 kN` (zonă H, curentă) până la, local, pe stâlpii de colț ai clădirii (zona F): `F_smulgere,colț = wnet,F·A_tributară,colț ≈ 1,52×36 = 54,7 kN` (arie tributară redusă la colț, zonă de influență F mai mică).

**Greutatea stabilizatoare** a blocului de fundație 2,4×2,4×1,5 m (volumul de la cota de fundare la cota terenului sistematizat, beton C25/30, γ≈24 kN/mc): `G_fundație = 2,4×2,4×1,5×24 = 207,4 kN`, redusă conform gruparea G3 (`γG=0,9`, cap. 4.3 DTAC): `G_fundație,G3 = 0,9×207,4 = 186,6 kN`.

`γ_smulgere = G_fundație,G3/F_smulgere = 186,6/31,2 = **5,98 ≥ 1,5`** → **verificat, cu marjă foarte largă** — rezultat firesc, întrucât forța de smulgere reală (31,2-54,7 kN) este mult inferioară celei folosite orientativ în DTAC la nivelul stâlpului (implicit, prin ancorajul dimensionat generic la Ø30); marja largă confirmă că **ancorarea la smulgere a acestei structuri, în ciuda naturii contraintuitive a fenomenului (cap. 4.3 DTAC), nu este critică per bulon individual**, ci necesită doar respectarea strictă a detaliului de execuție (lungime de ancorare a bulonului în masa de beton, poziționare corectă în placa de bază), nu o supradimensionare a fundației înseși.

**Detaliul de execuție al bulonului de ancoraj Ø30**: lungime de ancorare `la≥40·Ø=1.200 mm` (regulă constructivă uzuală pentru bulon pretensionat înglobat direct, fără placă de ancoraj la capăt, pe baza aderenței oțel-beton pe toată lungimea înglobată) SAU, alternativ, **placă de ancoraj la capătul inferior al bulonului** (200×200×20 mm), care transferă forța de întindere prin portanță directă pe betonul din jur, reducând lungimea minimă necesară la `la≥25·Ø=750 mm` — soluție adoptată la faza PTh pentru a permite o poziționare mai flexibilă a bulonului în interiorul înălțimii fundației de 1,5 m, fără a impinge bulonul până la limita inferioară a blocului de beton. Buloanele se montează în șablon rigid (placă de poziționare provizorie), fixat pe cofrajul fundației înainte de betonare, cu toleranță de poziționare ±3 mm față de axele teoretice ale plăcii de bază a stâlpului — toleranță strictă, dat fiind că o eroare de poziționare a buloanelor ar putea împiedica montarea corectă a plăcii de bază prefabricate a stâlpului metalic livrat din atelier cu găurire fixă.

## PTh-SP.9.4 Fundațiile cadrelor de tribună — toate cele 11 poziții

Din breviarul DTAC (cap. 9.3): fundație izolată **2,6×2,6 m**, h=0,90 m, armată Ø16/150 ambele direcții, la N=1.200 kN (cadru curent). Extindere la toate cele 11 poziții (arie tributară redusă la capete, PTh-SP.6.1):

| Poziție | N [kN] | Dimensiune talpă adoptată | pmax [kPa] | Verificare |
|---|---|---|---|---|
| Capăt (axe 1, 11) | 620 | **1,90×1,90 m** | 172 | ✓ (utilizare 69%) |
| Curent (axe 2-10) | 1.200 | **2,60×2,60 m** | 177 | ✓ (confirmă cap. 9.3 DTAC) |

## PTh-SP.9.5 Grinzile de fundare — confirmare și extindere

Conform cap. 9.3 DTAC, grinzile de fundare devin obligatorii la amplasamente cu `ag≥0,20g` (amplasamentul exemplu, `ag=0,30g`, cap. 7.1 DTAC). Se adoptă grinzi de fundare secțiune **40×70 cm**, dispuse pe conturul tribunelor (legând longitudinal cele 11 fundații de cadru pe direcția lungimii de 60,0 m) și pe conturul stâlpilor metalici (legând, similar, cele 22 de fundații ale acoperișului), armate cu **4Ø20 la partea superioară + 4Ø20 la partea inferioară**, etrieri **Ø10/200 mm** curent, majorați la **Ø10/100 mm** pe 2×h=1,40 m de la fiecare nod cu o fundație izolată — soluție identică metodologic celei aplicate la ansamblurile cu grătar de fundații de referință (`scoala/structura-pth.md` §PTh-S.5.5). Grinzile de fundare ale celor două subsisteme (acoperiș metalic, tribune) **nu se conectează între ele**, respectând principiul independenței structurale stabilit în DTAC (cap. 1.1) și detaliat la nivelul spațiului liber (PTh-SP.8) — fiecare subsistem are propriul grătar de grinzi de fundare, independent.

## PTh-SP.9.6 Placa pe sol a terenului de joc — confirmare

Conform cap. 9.4 DTAC: placă C25/30, grosime 15 cm, plasă sudată Ø8/150, pe balast compactat 30 cm, rosturi de dilatație/contracție pe rețea de 6×6 m. Placa pe sol rămâne independentă structural de ambele grătare de fundații (acoperiș și tribune), confirmând, la nivelul infrastructurii, aceeași logică de separare aplicată la suprastructură.

## PTh-SP.9.7 Managementul apei subterane — confirmare

Conform cap. 9.5 DTAC, se prevede sistem de drenaj perimetral la baza fundațiilor și sub placa pe sol, cu tuburi de drenaj colectoare racordate la canalizarea pluvială (`instalatii.md`). Relevanța specială pentru fundațiile stâlpilor metalici, verificate la ancorarea la smulgere (PTh-SP.9.3), se reconfirmă la faza PTh: saturarea excesivă a terenului din jurul blocului de fundație ar putea reduce frecarea laterală care contribuie, alături de greutatea proprie, la echilibrarea forței de smulgere — motiv suplimentar pentru execuția corectă și verificată a drenajului perimetral chiar în zona fundațiilor de fronton și de colț, unde forța de smulgere locală este maximă (PTh-SP.9.3).

---

# PTh-SP.10 — CAIETUL DE ARMARE AL TRIBUNELOR

## PTh-SP.10.1 Lista de bare — gradena „L" (element tip, reprodus în serie)

| Poziție armătură | Diametru/tip | Lungime [m] | Buc./element | Total buc. (360 elemente, PTh-SP.6.2) |
|---|---|---|---|---|
| Longitudinală inferioară | 3Ø14 | 6,10 | 3 | 1.080 |
| Etrieri | Ø8/200 | 1,20 (dezvoltată) | 31 | 11.160 |
| Armătură de prindere neopren/dorn | Ø12 (mustăți) | 0,40 | 4 | 1.440 |

## PTh-SP.10.2 Lista de bare — grindă rampantă curentă (secțiune 40×80 cm, deschidere 8,0 m)

| Poziție armătură | Diametru/tip | Lungime [m] | Buc./element | Total buc. (9 grinzi curente, PTh-SP.6.3) |
|---|---|---|---|---|
| Longitudinală inferioară | 5Ø18 | 8,40 | 5 | 45 |
| Longitudinală superioară | 4Ø16 | 8,40 | 4 | 36 |
| Etrieri | Ø10/150 | 2,40 (dezvoltată) | 55 | 495 |

## PTh-SP.10.3 Lista de bare — grindă rampantă de capăt (secțiune identică, armătură redusă, PTh-SP.6.3)

| Poziție armătură | Diametru/tip | Lungime [m] | Buc./element | Total buc. (2 grinzi de capăt) |
|---|---|---|---|---|
| Longitudinală inferioară | 4Ø16 | 8,40 | 4 | 8 |
| Longitudinală superioară | 3Ø14 | 8,40 | 3 | 6 |
| Etrieri | Ø10/150 | 2,40 (dezvoltată) | 55 | 110 |

## PTh-SP.10.4 Lista de bare — stâlpii cadrelor de tribună (50×50 cm)

| Poziție armătură | Diametru/tip | Lungime [m] | Buc./stâlp | Total buc. (22 stâlpi, 11 axe × 2 fronturi) |
|---|---|---|---|---|
| Longitudinală | 8Ø20 | 3,20 (înălțime cadru) | 8 | 176 |
| Etrieri curenți | Ø10/150 | 1,90 (dezvoltată) | 20 | 440 |
| Etrieri de confinare (zone critice bază/vârf) | Ø10/80 | 1,90 (dezvoltată) | 12 | 264 |

## PTh-SP.10.5 Lista de bare — fundațiile cadrelor de tribună

| Poziție armătură | Diametru/tip | Lungime [m] | Buc./fundație | Total buc. (11 fundații curente + 2... — se lucrează pe cele 2 tipodimensiuni, PTh-SP.9.4) |
|---|---|---|---|---|
| Placă fundație curentă (2,6×2,6 m) | Ø16/150, ambele direcții | 2,50 | 17×2=34 | 306 (9 fundații curente) |
| Placă fundație de capăt (1,9×1,9 m) | Ø14/150, ambele direcții | 1,80 | 12×2=24 | 48 (2 fundații de capăt) |

## PTh-SP.10.6 Extrasul cantitativ centralizat — oțel-beton tribune

| Element | Total oțel-beton [t] |
|---|---|
| Gradene „L" (360 elemente) | ≈8,9 |
| Grinzi rampante (11 poziții) | ≈6,4 |
| Stâlpi cadre tribună (22 poziții) | ≈3,1 |
| Fundații cadre tribună (11 poziții) | ≈2,8 |
| Grinzi de fundare (contur tribune) | ≈4,2 |
| **Total oțel-beton tribune** | **≈25,4 t** |

Consumul specific de oțel-beton, raportat la volumul de beton al tribunelor (estimat la ≈580 mc, din geometria gradenelor+cadrelor+grinzilor rampante pe cele 11 axe), rezultă la **≈44 kg/mc** — valoare tipică pentru elemente de beton armat cu solicitare moderată spre ridicată (grinda rampantă, elementul cel mai armat, utilizare 0,87, PTh-SP.6.3), coerentă cu practica de execuție a tribunelor sportive de anvergură comparabilă.

---

# PTh-SP.11 — EXTRASUL DE MATERIALE AL STRUCTURII METALICE

## PTh-SP.11.1 Profile principale — bill of quantities pe reper

| Reper | Profil | Nr. buc. | Lungime unitară [m] | Greutate unitară [kg/m] | Total [kg] |
|---|---|---|---|---|---|
| Talpă superioară fermă | RHS 300×200×12,5 | 22 (11 ferme × 2 tălpi, dar talpa e continuă pe toată deschiderea, defalcată în 3 tronsoane de transport, PTh-SP.14.3) | 40,0 | 92,6 | 81.488 |
| Talpă inferioară fermă | RHS 300×200×12,5 | 22 (idem) | 40,0 | 92,6 | 81.488 |
| Diagonale zăbrea | SHS 120×120×8 | 11 ferme × 14 diagonale/fermă = 154 | ≈2,90 (medie) | 27,5 | 12.288 |
| Diagonale de capăt | SHS 150×150×10 | 11 ferme × 2 = 22 | ≈4,05 | 42,4 | 3.775 |
| Montanți | SHS 90×90×6 | 11 ferme × 15 montanți/fermă = 165 | 3,20 | 15,2 | 8.026 |
| Stâlpi metalici (curenți, capăt, fronton) | HEB 400 | 22 (11 axe × 2 fronturi) | 9,0 | 155,0 | 30.690 |
| Contravântuiri verticale „X" | SHS 120×120×8 | 8 (4 travei de capăt × 2 diagonale) | ≈10,8 | 27,5 | 2.376 |
| Contravântuiri orizontale „X" | SHS 100×100×6 | 12 (3 travei × 4 diagonale) | ≈40,3 | 18,2 | 8.802 |
| Pane | IPE 200 | 11 ferme × 16 travei pană = 176 | 6,0 | 22,4 | 23.654 |
| Sag-rods | Ø16 | 16 rânduri × 10 travei | 6,0 | 1,58 | 1.517 |
| **Total oțel structural (structura acoperișului)** | | | | | **≈253,6 t** |

## PTh-SP.11.2 Consumabile — șuruburi și sudură

| Consumabil | Cantitate estimată |
|---|---|
| Șuruburi HR M24 gr. 10.9 (noduri fermă-stâlp) | 22 noduri × 8 = 176 buc. |
| Șuruburi HR M20 gr. 8.8 (îmbinări curente contravântuiri) | ≈480 buc. |
| Buloane de ancoraj Ø30 pretensionate (bază stâlpi) | 22×4=88 buc. |
| Electrozi/sârmă sudură (noduri de atelier, cordoane a=6-8 mm) | ≈1,8 t (estimare din lungimea totală de cordon × secțiune) |

## PTh-SP.11.3 Protecție anticorozivă și la foc — consum vopsea

Conform cap. 10.1-10.2 DTAC (sistem C3, DFT 220 μm anticoroziv; vopsea intumescentă R60 stâlpi/R30 ferme): suprafața totală de vopsit a structurii metalice (estimată din perimetrul secțiunilor × lungimile din PTh-SP.11.1, factor de conversie mediu ≈0,15 mp/kg pentru profile RHS/SHS/HEB de talie medie): `253,6 t × 0,15 mp/kg × 1.000 = 38.040 mp` de suprafață expusă → consum vopsea anticorozivă (3 straturi, 220 μm, randament mediu ≈8 mp/l/strat): `38.040/8×3 ≈ 14.265 l` (repartizate pe cele 3 straturi conform cap. 10.1 DTAC). Consum vopsea intumescentă (doar pe stâlpi, ≈30.690 kg×0,15=4.604 mp, DFT≈1.200 μm): estimat separat, conform sistemului certificat ales de antreprenor (notă onestă, identică celei din `scoala/structura-pth.md` §PTh-S.16.2: grosimea exactă și randamentul se confirmă din raportul de clasificare la foc al producătorului).

---

# PTh-SP.12 — DETALIILE DE ÎMBINARE — METODA COMPONENTELOR

## PTh-SP.12.1 Recapitulare nod fermă-stâlp (curent)

Placă de capăt sudată pe talpa fermei, prinsă de stâlp cu 8 șuruburi M24 gr. 10.9 (`Fv,Rd=226 kN`, cap. 8.2 DTAC), verificare `NEd/(n·Fv,Rd)=1.420/1.808=0,79`, suduri de colț a=8 mm, categoria C de îmbinări pretensionate (cap. 8.2, 4.7 DTAC).

## PTh-SP.12.2 Nodul fermă-stâlp la fermele de capăt (axele 1 și 11)

Cu efortul de talpă redus la jumătate (N=710 kN, PTh-SP.2.2), verificarea îmbinării la aceleași 8 șuruburi M24: `710/1.808=0,39` — **verificat, cu marjă amplă**. Se menține numărul de șuruburi identic (8×M24) pe toate cele 22 de noduri, din nou pentru standardizarea execuției pe șantier (un singur șablon de găurire, o singură secvență de control al pretensionării, cap. PTh-SP.15) — decizie de proiectare PTh consecventă cu unificarea deja adoptată la nivel de profile (PTh-SP.2.3, PTh-SP.2.4).

## PTh-SP.12.3 Nodul fermă-stâlp la axele 2, 6, 10 (colectare diafragmă orizontală)

La aceste 6 poziții (axele 2, 6, 10, pe ambele fronturi ale sălii), nodul fermă-stâlp preia, suplimentar la efortul axial de talpă (1.420 kN, identic cu nodul curent), o componentă orizontală adițională din racordul cu contravântuirea orizontală de acoperiș (guseul de contravântuire, sudat pe placa de capăt a nodului, PTh-SP.4.1). Verificarea plăcii de capăt la această componentă suplimentară (forfecare în planul plăcii, din forța de diafragmă `≈95 kN` transmisă la fiecare nod al panoului de contravântuire): se adoptă **guseu suplimentar sudat**, dimensionat separat de placa de capăt principală, cu 4 șuruburi M20 gr. 8.8 proprii (`Fv,Rd=113 kN` per șurub la M20): `95/(2×113)=0,42` (2 șuruburi active pe direcția forței, restul de reglaj geometric) → **verificat**.

## PTh-SP.12.4 Prinderile pană-fermă și tablă-pană — dimensionare la smulgere (gruparea G3)

Conform PTh-SP.5.2, prinderile din zona F (colț) sunt supuse unei încărcări nete de smulgere de `3,80 kN/m` (peste 5× valoarea din zona H curentă). **Clemele pană-fermă**: se adoptă clemă metalică tip „hook", dimensionată la o forță de smulgere per clemă (interax pane 2,5 m, interax noduri fermă 2,5 m — o clemă per intersecție): `F_clemă,F=3,80×2,5=9,5 kN` — verificată față de capacitatea nominală a clemei standard (tipic ≥15 kN pentru cleme uzuale de acest tip, conform fișei tehnice a producătorului) → **verificat**, utilizare ≈63%. **Șuruburile autoforante tablă-pană**: în zona F, se dublează densitatea de fixare (de la 5 șuruburi/mp, standard pe zona curentă H, la 10 șuruburi/mp în zona F, pe o fâșie de lățime egală cu 10% din deschiderea acoperișului de la fiecare colț, conform practicii uzuale de zonare a fixărilor la tablă cutată pe acoperișuri cu succiune diferențiată) — măsură de execuție directă, cuantificabilă și verificabilă vizual la recepție (PTh-SP.15).

## PTh-SP.12.5 Ancorarea buloanelor la baza stâlpilor de fronton (componentă suplimentară de la contravântuiri)

La stâlpii de fronton adiacenți contravântuirilor verticale (axele 1-2 și 10-11, PTh-SP.4.3), placa de bază și buloanele de ancoraj (identice, Ø30, PTh-SP.9.3) preiau, suplimentar la efortul de smulgere din vânt, componenta verticală suplimentară a diagonalei de contravântuire (414 kN, PTh-SP.4.3) — verificată la capacitatea de ancorare deja dimensionată cu marjă largă (γ_smulgere=5,98, PTh-SP.9.3), care absoarbe confortabil și această componentă suplimentară fără majorare de secțiune sau de lungime de ancorare.

---

# PTh-SP.13 — TEHNOLOGIA DE EXECUȚIE A STRUCTURII DE BETON ARMAT

## PTh-SP.13.1 Succesiunea de execuție a infrastructurii (fundații stâlpi metalici + fundații tribune)

1. Trasarea topografică a tuturor celor 22+11=33 de poziții de fundație (stâlpi metalici + cadre tribună), cu control al distanței minime de 0,50 m la interfața spațiului liber (PTh-SP.8.3).
2. Săpătura generală până la cota de fundare `-1,50 m`, cu epuismente locale, dacă nivelul hidrostatic o impune (cap. 9.5 DTAC).
3. Turnarea betonului de egalizare (C12/15, 10 cm) pe fundul săpăturii, pe toată suprafața fundațiilor.
4. Montarea armăturii fundațiilor (PTh-SP.10.5, pentru tribune; armare similară, nedetaliată separat, pentru fundațiile stâlpilor metalici) și a șabloanelor de poziționare a buloanelor de ancoraj (PTh-SP.9.3), verificate topografic înainte de betonare.
5. Betonarea fundațiilor (C25/30) și a grinzilor de fundare (PTh-SP.9.5), pe cele două grătare independente (acoperiș, tribune), în operații distincte, cu respectarea rosturilor de lucru conform NE 012-2/2010.
6. Decofrarea, verificarea geometrică a poziției buloanelor de ancoraj (toleranță ±3 mm, PTh-SP.9.3) — condiție de fază determinantă (PTh-SP.16) înainte de continuarea execuției.

## PTh-SP.13.2 Execuția cadrelor de tribună și a gradenelor

Cadrele transversale de beton armat (stâlpi + grinzi rampante) se execută **monolit**, cofraj clasic pe toate cele 11 poziții, cu decofrare succesivă și refolosire a cofrajelor (câte un set de cofraje pentru cadrul curent, refolosit de 9 ori pe cele 9 poziții curente; set separat, redus, pentru cele 2 cadre de capăt). Gradenele prefabricate (PTh-SP.6.2, 360 de elemente) se produc în hală de prefabricate (sau pe platformă de prefabricare organizată pe șantier, dacă distanța de transport nu permite producția în uzină), cu un **tipar unic**, conform deciziei de unificare a armăturii (PTh-SP.6.2), și se montează pe grinzile rampante deja executate și maturate (rezistență minimă la montaj ≥70% din rezistența caracteristică la 28 zile, verificată prin probe de decofrare, PTh-SP.22.2).

## PTh-SP.13.3 Rezemarea gradenelor pe grinda rampantă — detaliu de montaj

Gradenele prefabricate reazemă pe reazeme din neopren armat (izolare parțială a zgomotului de impact + preluarea toleranțelor de execuție, cap. 11 DTAC), cu **dornuri antiseismice** care împiedică deplasarea laterală a gradenei sub acțiune seismică orizontală. Secvența de montaj: (1) verificarea cotei superioare a grinzii rampante (toleranță ±5 mm pe toată lungimea de 8,0 m); (2) poziționarea reazemelor de neopren, cu grosime calibrată pentru compensarea contra-săgeții/săgeții reale a grinzii rampante măsurate la fața locului; (3) ridicarea și poziționarea gradenei cu utilaj de ridicare ușor (macara mobilă de capacitate redusă sau manipulator telescopic, elementele fiind relativ ușoare — greutate unitară per gradenă ≈250 kg, calculată din 3,8 kN/mp × secțiunea „L" × lungimea de 6,0 m); (4) fixarea dornurilor antiseismice în lăcașurile prevăzute în grinda rampantă (mustăți/goluri prevăzute la execuția monolită a grinzii); (5) verificarea cu nivela a orizontalității fiecărei gradene montate, cu toleranță ±3 mm pe lățimea treptei (0,45 m), condiție directă pentru siguranța circulației spectatorilor pe gradene (cerință de siguranță în exploatare, nu doar estetică).

---

# PTh-SP.14 — TEHNOLOGIA DE EXECUȚIE ȘI MONTAJUL STRUCTURII METALICE

## PTh-SP.14.1 Execuția în atelier

Debitarea profilelor (tălpi RHS, diagonale/montanți SHS) la dimensiunile din extrasul de materiale (PTh-SP.11.1), cu găurire conform planurilor de nod (PTh-SP.12) realizată integral în atelier (debitare cu plasmă/laser CNC pentru precizie de poziționare a găurilor de îmbinare). Sudarea nodurilor de atelier (racordul diagonalelor și montanților la tălpi, în configurație K/N caracteristică fermelor cu zăbrele) se realizează cu proceduri de sudare calificate conform **SR EN ISO 15614-1** (WPQR), de sudori calificați conform **SR EN ISO 9606-1**, cu cordoane de colț dimensiune `a=6-8 mm` (conform cap. 11 DTAC), verificate 100% vizual (VT) și prin sondaj cu lichide penetrante (PL) pe minimum 2 din cele 11 ferme (PTh-SP.22.3).

## PTh-SP.14.2 Fabricarea contrasăgeții de montaj

Conform cap. 4.5 DTAC, ferma se fabrică cu o contrasăgeată (camber) de **100 mm** (L/400) la mijlocul deschiderii — realizată în atelier prin ajustarea geometriei de asamblare a panourilor de zăbrea pe masa de sudură (nu prin îndoirea la cald a unei ferme deja asamblate plan, procedeu care ar introduce tensiuni reziduale necontrolate), verificată prin măsurare topografică pe fiecare fermă înainte de expediere, cu toleranță ±10 mm față de contrasăgeata teoretică.

## PTh-SP.14.3 Înnădirea de transport a fermei

Deschiderea de 40,0 m a fermei depășește gabaritul uzual de transport rutier (lungime utilă fără autorizație specială ≈16,5-19,5 m, funcție de tipul de trailer și de traseul autorizat) — motiv pentru care **fiecare fermă se livrează în 3 tronsoane**, cu lungimi de ordinul **13,3 m** fiecare (40,0/3), asamblate definitiv pe șantier prin **2 înnădiri (splice) simetrice**, poziționate la aproximativ 1/3 și 2/3 din deschidere (zone cu efort de talpă intermediar, nu la mijlocul deschiderii, unde efortul de talpă este maxim, cap. 4.4 DTAC, și nu la reazem, unde geometria nodului fermă-stâlp este deja complexă). Înnădirea se realizează prin **placă de continuitate înșurubată** (placă exterioară pe fiecare talpă, cu șuruburi HR M20 gr. 8.8 pretensionate categorie de rezistență la lunecare B, conform SR EN 1993-1-8 §3.9 — soluție identică principiului consacrat la fermele de deschidere mare care necesită transport pe tronsoane, v. `scoala/structura-pth.md` §PTh-S.15.4), dimensionată la efortul de talpă din secțiunea respectivă (interpolat liniar din tabelul PTh-SP.2.5, pentru panoul situat la 1/3 din deschidere: `N≈1.065 kN`, între valoarea de reazem redusă și valoarea maximă de mijloc) — verificare la lunecare (`n·μ·Fp,C/γM3`, cu μ=0,5 suprafețe clasa A, Fp,C=245 kN per șurub M20 la pretensionare completă): pentru 8 șuruburi pe placa de continuitate: `8×0,5×245/1,25=784 kN ≥ 1.065 kN`... **insuficient**, se majorează la **10 șuruburi M20** pe fiecare talpă: `10×0,5×245/1,25=980 kN`, tot insuficient marginal → se adoptă **12 șuruburi M20 gr. 8.8** per talpă la înnădire: `12×0,5×245/1,25=1.176 kN ≥ 1.065 kN` → **verificat**, utilizare 91% — element cu marjă redusă, semnalat explicit pentru control de execuție prioritar (control pretensionare 100%, nu prin sondaj, PTh-SP.15).

## PTh-SP.14.4 Transportul pe șantier

Cele 33 de tronsoane (11 ferme × 3 tronsoane) se transportă cu trailere specializate, în ordinea de montaj planificată (ferma 1 → ferma 11), evitând stocarea prelungită pe șantier (spațiu limitat, risc de deteriorare a vopsitoriei anticorozive aplicate deja în atelier, PTh-SP.11.3). Elementele se depozitează pe suporturi de lemn, ferite de contact direct cu solul, cu marcaj vizibil al poziției (axă + tronson) pentru a elimina orice risc de confuzie la montaj — risc semnalat explicit ca motivație pentru unificarea profilelor pe toate cele 11 axe (PTh-SP.2.3), care reduce, dar nu elimină, necesitatea marcajului corect de poziție.

## PTh-SP.14.5 Montajul — selecția macaralei și planul de ridicare

Greutatea unei ferme complete (3 tronsoane asamblate la sol înainte de ridicare, sau ridicate individual și asamblate la înălțime, funcție de spațiul disponibil și de capacitatea macaralei disponibile): din extrasul de materiale (PTh-SP.11.1), greutatea medie a unei ferme curente (tălpi+zăbrea) ≈ `(92,6×2+27,5×14+42,4×2)×40,0/... ` — calculat direct: tălpi 2×92,6×40=7.408 kg, diagonale 14×27,5×2,9≈1.116 kg, diagonale de capăt 2×42,4×4,05≈343 kg, montanți 15×15,2×3,2≈730 kg → **greutate totală ferma completă ≈9.600 kg (≈9,6 t)**.

**Se adoptă montajul fermei complete, asamblată la sol** (cele 3 tronsoane înnădite pe platforma de asamblare de la nivelul solului, PTh-SP.14.3), urmat de **ridicare unică cu macara mobilă** — soluție preferată tehnologiei alternative (montaj tronson cu tronson direct la înălțime, cu înnădiri executate la cotă), din considerente de siguranță (elimină lucrul la înălțime pentru operațiile de înnădire, care se execută la sol, accesibile și controlabile) și de precizie geometrică (contrasăgeata fabricată în atelier, PTh-SP.14.2, se verifică integral la sol, înainte de ridicare, nu se poate corecta ulterior la înălțime).

Macara adoptată: **macara mobilă pe șenile, capacitate nominală ≥80 t la raza de lucru necesară** (raza determinată de poziția macaralei față de axa fermei și de înălțimea de ridicare, `H_ridicare≈9,0 m` la cota de rezemare pe stâlpi, plus garda de siguranță pentru manevră), cu **2 puncte de prindere** (ridicare în 2 puncte, poziționate la aproximativ 1/4 și 3/4 din deschidere, pentru a limita momentul încovoietor indus de propria greutate în timpul ridicării la o fracțiune acceptabilă din capacitatea fermei — verificare de stabilitate la ridicare, distinctă de verificarea în poziție finală de exploatare, unde ferma este rezemată pe cei 2 stâlpi, nu suspendată în 2 puncte interioare).

**Verificarea la ridicare** (moment încovoietor indus de greutatea proprie, 9,6 t distribuite pe 40,0 m, cu 2 puncte de prindere la 1/4 și 3/4): moment maxim la mijlocul deschiderii (configurație de ridicare cu console la capete, model simplificat de grindă cu 2 reazeme interioare): `M_ridicare ≈ 0,24 kN/m×40²/8` (greutate liniară echivalentă 9,6×9,81/40=2,35 kN/m, redusă la 24% din valoarea de exploatare din cauza poziției favorabile a punctelor de prindere) `≈47 kNm` — mult inferior momentului de exploatare la mijlocul deschiderii (4.260 kNm, cap. 4.4 DTAC) → **fermă stabilă la ridicare, fără riscul de flambaj lateral necontrolat al tălpii superioare** (care, în poziția de ridicare orizontală, nu beneficiază încă de rezemarea pe pane, dar este supusă unui moment mult mai mic decât cel de exploatare).

## PTh-SP.14.6 Secvența de erecție și sprijinirile provizorii

1. **Montarea stâlpilor metalici** pe toate cele 22 de poziții, verificați la verticalitate (toleranță ±1/500 din înălțime, conform SR EN 1090-2), înainte de ridicarea primei ferme.
2. **Ridicarea fermei 1** (fronton), poziționare pe stâlpii axei 1, fixare provizorie (șuruburi montate, dar nu pretensionate definitiv) — **ferma 1, izolată, este instabilă la răsturnare laterală** (fără nicio contravântuire orizontală/verticală montată încă) → se prevăd **sprijiniri provizorii** (cabluri de vânt/popi înclinați, dimensionați separat de proiectantul de structuri metalice/antreprenor, ancorați la sol sau la fundațiile deja executate), menținute până la montarea primei travee de contravântuire.
3. **Ridicarea fermei 2**, poziționare, fixare provizorie, urmată **imediat** de montarea contravântuirilor orizontale de acoperiș și a contravântuirilor verticale „X" ale primei travei (axele 1-2, PTh-SP.4.1-4.2) — moment critic al graficului de execuție, în care structura trece de la starea „instabilă, sprijinită provizoriu" la starea „stabilă definitiv pe primele 2 axe".
4. **Repetarea secvenței** pentru fermele 3-11, cu montarea imediată a contravântuirii orizontale la travee 5-6-7 (mediană, PTh-SP.4.1) de imediat ce fermele adiacente sunt ridicate, și a contravântuirii verticale la travee 10-11 (capăt opus) la finalul secvenței.
5. **Îndepărtarea sprijinirilor provizorii** ale fermei 1 doar după confirmarea montării integrale și a pretensionării finale a contravântuirilor primei travei — regulă strictă, identică celei stabilite generic în concluziile DTAC (cap. 12, recomandare de execuție), aici detaliată explicit ca secvență obligatorie de execuție, nu doar ca recomandare generală.
6. **Montarea panelor și a tirantilor sag-rods** pe măsura avansării ridicării fermelor, imediat după fixarea provizorie a fiecărei ferme noi (panele oferă, ele însele, o rigidizare laterală suplimentară provizorie a tălpii superioare, chiar înainte de finalizarea contravântuirilor orizontale definitive) — practică curentă, care nu substituie however necesitatea contravântuirilor definitive la punctul 3-4, ci doar reduce riscul intermediar între ridicarea fermelor succesive.

## PTh-SP.14.7 Montajul contravântuirilor și verificarea finală a geometriei

Pretensionarea finală a tuturor șuruburilor HR (noduri fermă-stâlp, contravântuiri, înnădiri de transport) se execută **doar după** verificarea topografică integrală a geometriei structurii ridicate (verticalitatea stâlpilor, alinierea fermelor, contrasăgeata reziduală măsurată vs. contrasăgeata de proiectare, PTh-SP.14.2) — condiție de fază determinantă (PTh-SP.16), întrucât pretensionarea definitivă „blochează" geometria structurii, iar o corecție ulterioară ar necesita depretensionarea și repoziționarea unor elemente, operație costisitoare și riscantă la o structură deja parțial încărcată.

---

# PTh-SP.15 — PLANUL DE CONTROL AL CALITĂȚII

## PTh-SP.15.1 Controlul materialelor

| Control | Frecvență |
|---|---|
| Certificat 3.1 oțel structural S355 (profile RHS/SHS/HEB) | fiecare lot/colada |
| Certificat 3.1 șuruburi HR (M24, M20) și buloane de ancoraj (Ø30) | fiecare lot |
| Certificat 3.1 beton C30/37 (tribune), C25/30 (fundații), C20/25 (placă sol) | fiecare rețetă/lot furnizor |
| Certificat 3.1 armătură BST500C | fiecare lot |

## PTh-SP.15.2 Controlul execuției structurii metalice

| Control | Frecvență |
|---|---|
| Examinare vizuală suduri de atelier (VT) | 100% |
| Lichide penetrante (PL), noduri K/N | sondaj, minimum 2 din cele 11 ferme (PTh-SP.14.1) |
| Control pretensionare șuruburi noduri fermă-stâlp | 100% vizual + 10% instrumental (torque/turn-of-nut) |
| Control pretensionare șuruburi înnădire de transport | **100% instrumental** (element cu utilizare 91%, PTh-SP.14.3) |
| Verificare geometrică contrasăgeată (la sol, înainte de ridicare) | 100% ferme |
| Verificare verticalitate stâlpi (după montaj) | 100% poziții |
| Densitate fixări tablă-pană, zona F vs. H | 100% pe zonele de colț (PTh-SP.12.4) |

## PTh-SP.15.3 Controlul execuției structurii de beton armat

| Control | Frecvență |
|---|---|
| Rezistență compresiune beton (seturi 3 cuburi) | 1 set/50 mc SAU/element important (grindă rampantă, stâlpi cadru) |
| Probe de decofrare gradene prefabricate | 1 set/lot de producție (tipar unic, PTh-SP.6.2) |
| Portanță teren la cota de fundare | min. 1 punct la fiecare tip de fundație (metalică, tribună) |
| Verificare poziție buloane de ancoraj (toleranță ±3 mm) | 100% poziții (PTh-SP.9.3) |
| Orizontalitate gradene montate | 100% (toleranță ±3 mm, PTh-SP.13.3) |

## PTh-SP.15.4 Controlul protecției anticorozive și la foc

| Control | Frecvență |
|---|---|
| Grad de sablare (Sa 2½) | 100% suprafață, control vizual pe eșantioane |
| DFT anticoroziv (220 μm, 3 straturi) | min. 10 puncte/element reprezentativ |
| DFT intumescent (stâlpi R60) | min. 10 puncte/stâlp |
| Test de aderență (pull-off) | 1/500 mp sau per element critic |

---

# PTh-SP.16 — FAZELE DETERMINANTE

| Fază | Moment | Criterii de verificare | Participanți |
|---|---|---|---|
| FD1 | Recepția terenului de fundare la cota de fundare (-1,50 m) | Corespondența cu studiul geotehnic, pconv confirmat | Proiectant, diriginte, geotehnician |
| FD2 | Poziționarea buloanelor de ancoraj (fundații stâlpi metalici, toate cele 22 poziții) | Toleranță ±3 mm, verificare topografică | Proiectant, diriginte, constructor |
| FD3 | Betonarea infrastructurii (fundații + grinzi de fundare, ambele grătare) | Conformitate cofraje/armare, distanță minimă 0,50 m la interfața spațiului liber | Proiectant, diriginte, constructor |
| FD4 | Recepția structurii metalice la sosirea pe șantier (toate cele 33 tronsoane) | Corespondența reperelor, integritatea vopselei, certificate material/sudură atelier | Proiectant, diriginte, constructor |
| FD5 | Verificarea geometrică a fermei asamblate la sol (contrasăgeată, înnădiri de transport) | Contrasăgeată 100 mm ±10 mm, pretensionare 100% la înnădiri | Proiectant, diriginte, constructor |
| FD6 | Montajul structurii metalice — stabilitatea la ridicare și sprijinirile provizorii | Verificarea sprijinirilor conform PTh-SP.14.6, înainte de îndepărtare | Proiectant, diriginte, constructor, ISC |
| FD7 | Montajul integral al contravântuirilor definitive (orizontale + verticale) | Toate cele 3 travei orizontale + 2 travei verticale montate și pretensionate | Proiectant, diriginte, constructor, ISC |
| FD8 | Recepția sistemului de protecție anticorozivă/la foc | DFT conform, aderență, certificate reacție la foc | Proiectant, diriginte, constructor |
| FD9 | Montajul gradenelor prefabricate pe grinzile rampante | Rezistență beton la montaj ≥70%, orizontalitate ±3 mm, dornuri antiseismice fixate | Proiectant, diriginte, constructor |
| FD10 | Structura la roșu finalizată (ambele subsisteme + spațiul liber) | Conformitate geometrică, absența defectelor vizibile, rapoarte END/PVLA arhivate | Proiectant, diriginte, constructor, ISC |

La fiecare fază determinantă: convocare cu minimum 10 zile înainte, întocmirea procesului-verbal (condiție pentru autorizarea continuării lucrărilor). Neîndeplinirea criteriilor blochează avansul până la remediere și reverificare.

---

# PTh-SP.17 — PROGRAMUL DE URMĂRIRE ÎN TIMP

## PTh-SP.17.1 Urmărirea curentă (P130/1999)

Urmărire vizuală anuală (și după evenimente deosebite: cutremur >V MSK, vânt excepțional, incendiu, eveniment sportiv/public de vârf) a integrității structurii: starea vopselei anticorozive a structurii metalice (baza stâlpilor, punctele de scurgere a apelor pluviale, nodurile fermă-stâlp), fisurarea betonului tribunelor (gradene, grinzi rampante, cadre), starea reazemelor de neopren și a dornurilor antiseismice ale gradenelor, integritatea spațiului liber dintre subsisteme (PTh-SP.8). Se consemnează în **Jurnalul evenimentelor** din Cartea Tehnică a construcției.

## PTh-SP.17.2 Monitorizarea specifică a spațiului liber dintre subsisteme

Verificare vizuală semestrială a lățimii spațiului liber la punctele accesibile, cu marcaj de referință aplicat la recepție, pentru a detecta orice reducere anormală (ar indica o tasare diferențială neprevăzută între cele două grătare de fundații independente sau o mișcare seismică deja resimțită). Inspecție obligatorie post-seismică (cutremur ≥V MSK) pentru verificarea absenței oricărui semn de impact (pounding) la interfața dintre stâlpii metalici și cadrele de tribună.

## PTh-SP.17.3 Monitorizarea specifică a vibrațiilor tribunelor

La evenimentele de anvergură cu activitate ritmică sincronizată anticipată (concerte, gale, evenimente comunitare non-sportive, cap. 1.1 DTAC), se recomandă o **măsurare punctuală a răspunsului dinamic** (accelerometru portabil, montat temporar pe grinda rampantă la un rând reprezentativ) pentru confirmarea empirică a marjei calculate (PTh-SP.7.4) — măsură de prudență suplimentară, neobligatorie normativ la construcții cu marja de frecvență constatată (peste 190% din pragul critic), dar recomandată la primele evenimente de acest tip găzduite de sală, pentru a confirma în teren concluziile modelului de calcul.

## PTh-SP.17.4 Monitorizarea tasărilor

Mărci de tasare pe minimum 8 fundații reprezentative ale grătarului stâlpilor metalici (fronton, mediană, curente) + 6 mărci pe fundațiile cadrelor de tribună (capăt, curente). Frecvență: la fiecare etapă de montaj/betonare a suprastructurii, apoi la 1/3/6/12 luni după finalizare, apoi anual până la stabilizare (`Δs<2 mm/an`). Criteriu de alarmare: tasare diferențială `Δs/L>1/500` între fundații adiacente ale aceluiași grătar.

---

# PTh-SP.18 — IPOTEZELE MODELULUI DE CALCUL CU ELEMENTE FINITE + VALIDARE

## PTh-SP.18.1 Ipoteze de modelare — subsistemul acoperiș metalic

Model spațial din elemente de tip bară pentru toate componentele (stâlpi, tălpi/diagonale/montanți de fermă, pane, contravântuiri). Contravântuirile verticale „X" modelate ca elemente „tension-only" (active doar în tracțiune, cap. 4.6 DTAC). Mase concentrate la nivelul acoperișului (cota fermelor), din greutatea proprie a structurii metalice + învelitoare + fracțiunea cvasipermanentă a zăpezii (`ψ2=0`, cap. 6.2 DTAC — masa seismică a acoperișului exclude zăpada, cap. 7.4 DTAC). Rezemări: articulate la baza tuturor stâlpilor (cap. 2.2, 9.2 DTAC — mecanismul de „portal simplu").

## PTh-SP.18.2 Ipoteze de modelare — subsistemul tribune

Model spațial din elemente de tip bară (stâlpi, grinzi rampante) și elemente placă (gradenele, modelate simplificat ca masă și rigiditate distribuită pe grinda rampantă, nu ca elemente structurale proprii independente, dat fiind reazemul lor pe neopren, care le decuplează parțial de rigiditatea globală a cadrului). Rezemări: încastrare la baza stâlpilor cadrelor de tribună (mecanism principal de rigidizare, cap. 5.5 DTAC). Mase: greutate proprie gradenă + fracțiunea cvasipermanentă a utilei de aglomerare (`ψE=0,48`, cap. 6.4/7.4 DTAC).

## PTh-SP.18.3 Validarea modelului — verificarea maselor

**Masa seismică a acoperișului**, recalculată din extrasul de materiale definitiv (PTh-SP.11.1, ≈253,6 t oțel structural + panouri/instalații suspendate): greutate seismică `G_acoperiș≈2.040 kN` (confirmă cap. 7.4 DTAC, fără corecții majore, structura metalică fiind deja dimensionată la nivel de predimensionare cu o densitate de material apropiată de cea rezultată din extrasul definitiv). **Masa seismică a tribunelor**, recalculată din caietul de armare definitiv (PTh-SP.10.6, ≈25,4 t oțel-beton + volumul de beton al gradenelor/cadrelor): confirmă `G_tribune≈9.300 kN` (cap. 7.4 DTAC), fără corecții semnificative. **Participarea maselor modale**: se cere ≥90% din masa totală pe fiecare direcție orizontală, în modurile reținute, verificată separat pentru fiecare subsistem, condiție de bază pentru validitatea analizei modale cu spectre de răspuns adoptate în DTAC (cap. 3.2).

---

# PTh-SP.19 — VERIFICĂRI SUPLIMENTARE LA SLS

## PTh-SP.19.1 Tabel sinteză contrasăgeți

| Element | Săgeată SLS calculată | Contrasăgeată adoptată |
|---|---|---|
| Fermă metalică (40,0 m) | 128 mm (cap. 4.5 DTAC) | 100 mm (L/400, cap. 4.5 DTAC) |
| Grindă rampantă curentă (8,0 m) | ≈12 mm (estimat, secțiune 40×80, moment 360 kNm) | fără camber (valoare mică, sub prag practic 15 mm) |
| Gradenă „L" (6,0 m) | ≈4 mm | fără camber |

## PTh-SP.19.2 Verificarea oboselii la prinderile pană-fermă (cicluri de vânt)

Conform cap. 4.7 DTAC, prinderile de colț (zona F) sunt expuse la un număr mare de cicluri de fluctuație a succiunii sub rafale succesive de vânt. Numărul de cicluri semnificative pe durata de viață proiectată (50 de ani, estimat la ≈15 furtuni relevante/an × 200 cicluri de fluctuație semnificativă/furtună, valoare orientativă pentru amplasamentul exemplu): `≈1,5×10⁵` cicluri — sub pragul la care oboseala ar guverna dimensionarea unei îmbinări pretensionate (mecanism care transferă forța prin frecare, fără concentrare de tensiune ciclică semnificativă în materialul de bază, spre diferență de o sudură de categorie de detaliu redusă, cap. 4.7 DTAC) → **verificarea la oboseală nu este guvernantă**, confirmând, la nivel cantitativ, motivarea deja calitativă din DTAC pentru adoptarea categoriei C de îmbinări pretensionate la nodurile expuse inversării ciclice.

## PTh-SP.19.3 Verificarea SLS a înnădirii de transport a fermei

Îmbinarea de transport (PTh-SP.14.3), realizată cu șuruburi HR pretensionate categorie de rezistență la lunecare B (SR EN 1993-1-8 §3.9), nu introduce lunecare relevantă la SLS (frecția `μ≥0,5` pe suprafețe clasa A blochează deplasarea relativă sub sarcinile de serviciu) → **splice-ul se comportă rigid la SLS, fără corecție suplimentară a săgeții calculate pentru ferma continuă** (PTh-SP.19.1) — concluzie identică celei stabilite, pe același tip de detaliu, la referințele consacrate din `hala-industriala/structura-pth.md` și `scoala/structura-pth.md`.

---

# PTh-SP.20 — CALCULUL LA FOC DETALIAT

## PTh-SP.20.1 Confirmarea protecției structurii metalice — dimensionarea grosimii de vopsea intumescentă

DTAC a stabilit principiul (R60 stâlpi, R30 ferme, sau ferme neprotejate cu acordul SSI, cap. 10.2 DTAC). Faza PTh dimensionează grosimea necesară pe fiecare profil, funcție de factorul de masivitate `Am/V`:

| Profil | Am/V [m⁻¹] | Cerință | DFT necesar (orientativ) |
|---|---|---|---|
| Stâlp HEB 400 | ≈118 | R60 | 1.100-1.300 μm |
| Talpă RHS 300×200×12,5 | ≈98 | R30 (sau neprotejat, cf. acord SSI) | 500-700 μm |
| Diagonală SHS 120×120×8 | ≈165 | R30 (sau neprotejat) | 700-900 μm |
| Montant SHS 90×90×6 | ≈205 | R30 (sau neprotejat) | 800-1.000 μm |

*(Notă onestă, identică celei consemnate la memoriile-tip de referință: valorile exacte de grosime a vopselei intumescente sunt specifice fiecărui produs certificat și se preiau din raportul de clasificare la foc al producătorului ales; tabelul de mai sus este orientativ, pe baza intervalelor uzuale pentru sisteme certificate pe oțel S355. Grosimea definitivă se confirmă printr-o notă de calcul separată, anexată la Cartea Tehnică, după alegerea sistemului de vopsire de către antreprenor.)*

## PTh-SP.20.2 Confirmarea comportării la foc a tribunelor — metoda tabelară

Conform **SR EN 1992-1-2**, pentru elementele de beton armat ale tribunelor (grindă rampantă 40×80 cm, stâlpi cadru 50×50 cm), cerința R60 (inerentă, cap. 10.2 DTAC) se confirmă tabelar:

| Element | Secțiune | Acoperire cnom | Cerință | Verificare tabelară |
|---|---|---|---|---|
| Grindă rampantă | b=400 mm | 35 mm | R60 | bmin(R60)=200 mm ≤ 400 mm → ✓, marjă amplă |
| Stâlp cadru tribună | b=500 mm | 35 mm | R60 | bmin(R60)=200 mm ≤ 500 mm → ✓ |
| Gradenă prefabricată | b=250 mm (echivalent) | 25 mm | R30 (element nestructural la nivel de ansamblu, dar verificat conservator) | ✓, marjă amplă |

## PTh-SP.20.3 Protecția nodurilor și a reazemelor mobile/fixe ale fermelor pe stâlpii metalici

Nodurile fermei (placă de capăt, șuruburi) se protejează cu **același sistem și aceeași grosime** ca stâlpul (elementul cel mai masiv adiacent, cerință R60) — regulă conservatoare, identică celei aplicate la referințele consacrate, cu atenție explicită la continuitatea peliculei peste capetele șuruburilor pretensionate ale nodului curent (PTh-SP.12.1) și ale guseului suplimentar de la axele 2/6/10 (PTh-SP.12.3).

## PTh-SP.20.4 Corelarea cu desfumarea și evacuarea

Trapele de desfumare (arie liberă ≥1% din suprafața pardoselii, P118-2, cap. 10.2 DTAC) sunt integrate în tabla de acoperiș, între panele, fără a afecta continuitatea contravântuirilor orizontale (PTh-SP.4.1) — poziționarea exactă a golurilor de trapă se coordonează cu proiectantul de instalații (`instalatii.md`) astfel încât **niciun gol de trapă să nu coincidă cu un panou de contravântuire orizontală** (axele 1-2-3, 5-6-7, 9-10-11), condiție verificată explicit pe planul de montaj al structurii metalice (PTh-SP.21.2).

---

# PTh-SP.21 — COORDONAREA CU ARHITECTURA ȘI INSTALAȚIILE

## PTh-SP.21.1 Coordonarea cu arhitectura

**Grila structurală definitivă** (PTh-SP.2.1, PTh-SP.6.1) a fost stabilită în corelare cu proiectul de arhitectură (`arhitectura.md`), astfel încât amplasarea tribunelor pe conturul terenului de joc și poziția tunelului de acces al sportivilor (menționat generic la `general.md` cap. 7.9) să nu intersecteze niciun stâlp metalic sau cadru de tribună — coordonare care evită situația în care un element structural ar cădea exact în traseul unui flux funcțional. **Spațiul liber dintre subsisteme** (PTh-SP.8) este tratat de arhitect ca element de compunere (culoar tehnic vizibil sau mascat de finisaje, conform temei de proiectare), nu ca o discontinuitate accidentală de ascuns.

**Panourile de baschet suspendate central**, dacă tema de proiectare le prevede (echipamente sportive retractabile, `general.md` cap. 11.4), se ancorează seismic direct de tălpile inferioare ale fermelor metalice, la nodurile fermei (nu la mijlocul panourilor de zăbrea, unde ar introduce încovoiere locală necalculată), cu calculul de ancorare a elementelor nestructurale grele conform **P100-1/2013 cap. 10**, dezvoltat la faza de execuție a dotărilor sportive, în corelare cu furnizorul echipamentelor.

## PTh-SP.21.2 Coordonarea cu instalațiile — iluminatul sportiv suspendat de structură

Conform `general.md` cap. 7.8, iluminatul sportiv se dimensionează conform **SR EN 12193**, diferențiat pe regimuri de utilizare (≈300 lx antrenament, 500-750 lx competiție locală/națională, 1.000-1.500 lx competiție cu transmisie TV). Corpurile de iluminat de mare putere (proiectoare LED, montate tipic în șiruri paralele cu axa longitudinală a sălii, la cota tălpii inferioare a fermelor sau suspendate de aceasta prin tije reglabile) reprezintă o **încărcare suplimentară punctuală**, aplicată la nodurile tălpii inferioare, care nu a fost inclusă explicit în breviarul de predimensionare DTAC (unde încărcarea permanentă a inclus generic doar „instalații HVAC/electrice ușoare suspendate", cap. 4.1 DTAC, `gk=0,30 kN/mp` distribuit).

**Verificarea încărcării punctuale a iluminatului sportiv**: pentru un proiector LED de mare putere (masă tipică ≈25-35 kg per corp, inclusiv sistemul de prindere/reglaj), montat câte 1 la fiecare 2 noduri ai tălpii inferioare (interax ≈5,0 m pe lungimea sălii, densitate uzuală pentru nivelul de iluminare cerut la competiție cu transmisie TV), rezultă o încărcare punctuală de calcul `F_proiector ≈ 1,35×0,32 = 0,43 kN` per punct de prindere — valoare mică față de eforturile globale ale fermei (N,talpă=1.420 kN, cap. 4.4 DTAC), dar care se **adaugă local** la nodul tălpii inferioare, unde talpa (întinsă, cap. 4.5 DTAC) nu este verificată la încovoiere locală în breviarul de bază (care o tratează ca element pur axial, cf. principiul fermei triangulate, cap. 2.4 DTAC). Se verifică local: `M_local=F_proiector×e` (e=excentricitatea prinderii față de axa tălpii, tipic ≤0,10 m pentru un sistem de prindere direct pe talpă) `=0,43×0,10=0,043 kNm` — **negligibil** față de rezistența la încovoiere locală a secțiunii tubulare RHS 300×200×12,5, care rămâne guvernată de eforturile axiale globale (PTh-SP.2.3), nu de această încărcare punctuală suplimentară.

**Ancorarea seismică a corpurilor de iluminat suspendate** se dimensionează conform **P100-1/2013 cap. 10** (elemente nestructurale), cu un cablu de siguranță secundar (safety wire) la fiecare corp, independent de sistemul principal de prindere, prevenind căderea corpului în cazul cedării locale a prinderii principale — cerință de siguranță relevantă la o sală aglomerată cu public sub structura de acoperiș (`general.md` cap. 1.4-1.6, categoria de importanță B), unde căderea accidentală a unui corp de iluminat de mare masă ar reprezenta un risc direct pentru sportivi și spectatori.

**Traseele de cablare** ale instalației de iluminat sportiv, ale sonorizării (`general.md` cap. 11.2, 11.4) și ale desfumării mecanice (dacă echipată, `instalatii.md`) folosesc golurile naturale ale zăbrelei fermelor (avantaj funcțional identificat deja în DTAC prin analogie, cap. 2.3 DTAC) — coordonarea la faza PTh fixează exact prin care panouri ale zăbrelei trec traseele principale, pentru a evita interferența cu contravântuirile de acoperiș (PTh-SP.4.1) și cu tiranții sag-rods ai panelor (PTh-SP.5.3), condiție verificată explicit pe planul de montaj al structurii metalice, corelat cu planul de instalații (`instalatii.md`).

## PTh-SP.21.3 Coordonarea cu sonorizarea de urgență și avertizarea vocală

Conform `general.md` cap. 8.5, sistemul de avertizare vocală (SR EN 54-16), relevant pentru dirijarea eficientă a mulțimii de la tribune în caz de urgență, se suspendă, similar corpurilor de iluminat (PTh-SP.21.2), de nodurile tălpii inferioare a fermelor, cu aceeași metodologie de ancorare seismică și cu aceeași concluzie privind irelevanța încărcării locale suplimentare asupra secțiunilor principale ale fermei (masa unităților de sonorizare fiind, tipic, inferioară celei a proiectoarelor de iluminat sportiv).

---

# PTh-SP.22 — PROGRAMUL COMPLET DE PROBE ȘI ÎNCERCĂRI

## PTh-SP.22.1 Încercări pe materialele de bază

| Control | Frecvență |
|---|---|
| Certificat 3.1 oțel structural S355 | fiecare lot/colada |
| Certificat 3.1 beton (toate clasele: C30/37, C25/30, C20/25) | fiecare rețetă/lot furnizor |
| Certificat 3.1 armătură BST500C | fiecare lot |
| Încercare de tracțiune pe eșantion (dacă certificatul lipsește) | prin sondaj, laborator acreditat |

## PTh-SP.22.2 Încercări pe elementele de beton armat

| Control | Frecvență |
|---|---|
| Rezistență compresiune beton (seturi 3 cuburi) | 1 set/50 mc SAU/element important (grindă rampantă, stâlpi cadru tribună) |
| Probe de decofrare gradene prefabricate (tipar unic) | 1 set/lot de producție |
| Portanță teren la cota de fundare (placă de încărcare, dacă studiul geotehnic o impune) | min. 1 punct la fiecare tip de fundație |

## PTh-SP.22.3 Încercări pe structura metalică și îmbinări

| Control | Frecvență |
|---|---|
| Examinare vizuală suduri (VT) | 100% |
| Lichide penetrante (PL), noduri K/N | sondaj, minimum 2 din cele 11 ferme |
| Control pretensionare șuruburi noduri fermă-stâlp | 100% vizual + 10% instrumental |
| Control pretensionare șuruburi înnădire de transport | 100% instrumental (utilizare 91%, PTh-SP.14.3) |
| DFT vopsea (anticorozivă + intumescentă) | min. 10 puncte/element reprezentativ |
| Test de aderență (pull-off) | 1/500 mp sau per element critic |

## PTh-SP.22.4 Probe de ansamblu

- **Verificarea geometrică finală** a spațiului liber dintre subsisteme (lățime, continuitate) pe toată suprafața accesibilă, înainte de recepția la terminarea lucrărilor.
- **Verificarea săgeții reziduale** a fiecărei ferme, prin măsurare topografică, sub încărcarea permanentă efectivă (după montarea completă a tablei, izolației și instalațiilor suspendate), comparată cu valoarea teoretică (contrasăgeată 100 mm − săgeată sub permanent, PTh-SP.19.1).
- **Verificarea orizontalității finale** a fiecărui rând de gradenă montată, pe toată lungimea tribunei.
- **Documente de conformitate arhivate la Cartea Tehnică**: certificate materiale, rapoarte END, fișe de pretensionare (inclusiv cele 100% instrumentale de la înnădirile de transport), rapoarte DFT/aderență, procese-verbale de fază determinantă, buletine de încercare beton, raport topografic final de as-built pentru structura metalică și pentru tribune.

---

# PTh-SP.23 — SINTEZA CORECȚIILOR PTh FAȚĂ DE DTAC ȘI CONCLUZIA INGINEREASCĂ

## PTh-SP.23.1 Sinteza corecțiilor de proiectare aduse de faza PTh

| Element/aspect | Predimensionare DTAC | Corecție/detaliere PTh | Motiv |
|---|---|---|---|
| Stâlpii metalici de la axele 2, 6, 10 (colectare diafragmă orizontală) | HEB 400, grad 0,66 (uniform) | **grad recalculat la 0,73-0,74**, secțiune menținută, dar semnalate pentru control prioritar de execuție | componentă orizontală suplimentară din colectarea diafragmei, neexplicitată în breviarul generic |
| Înnădirea de transport a fermei (40,0 m, 3 tronsoane) | neexplicitată (fermă tratată continuu) | **placă de continuitate, 12 șuruburi M20/talpă**, utilizare 91% | gabarit de transport rutier (L util ≈16,5-19,5 m) |
| Fundația fundației de fronton (axe 1, 11) | dimensiune neexplicitată individual | **2,0×2,0 m**, distinctă de fundația curentă (2,4×2,4 m) | efort redus la jumătate, arie tributară 3,0 m |
| Grinda rampantă de capăt (tribune) | dimensionată doar generic (identică cu cea curentă) | **armătură redusă 4Ø16** (secțiune de beton unificată 40×80 cm) | arie tributară redusă la jumătate, economie de oțel-beton fără complicarea cofrajelor |
| Spațiul liber dintre acoperiș și tribune | principiu menționat (cap. 1.1 DTAC), nedimensionat | **8,0 cm**, calculat din Δ=√(d1²+d2²)=4,57 cm + marjă de execuție | cuantificare explicită a deplasărilor relative ale celor două subsisteme |
| Prinderile tablă-pană, zona F (colț) | principiu de zonare F/G/H/I menționat (cap. 4.3 DTAC) | **densitate dublă de fixare** (10 șuruburi/mp vs. 5/mp) | forța de smulgere netă în zona F, de peste 5× cea din zona H curentă |
| Profilul tălpilor/diagonalelor de capăt ale fermelor (axe 1, 11) | dimensionat doar pentru ferma curentă (arie tributară 6,0 m) | **profil unificat pe toate cele 11 ferme**, inclusiv cele de capăt | siguranța execuției (un singur set de repere), economie marginală irelevantă |
| Ancorarea la smulgere a fundațiilor de colț/fronton | mecanism de principiu (γ≥1,5, cap. 9.2 DTAC) | **verificare numerică pe toate pozițiile, γ=5,98 la stâlpul curent** | cuantificare explicită, absentă din breviarul generic DTAC |

## PTh-SP.23.2 Tabel centralizator conformitate — toate verificările suplimentare PTh

| Categorie | Verificare | Rezultat |
|---|---|---|
| Structural acoperiș | Tălpi/diagonale, toate cele 11 axe (capăt vs. curent) | 0,169-0,377 (tălpi) / 0,346-0,690 (diagonale) ✓ |
| Structural acoperiș | Stâlpi metalici, toate cele 4 configurații de poziție | 0,38-0,74 ✓ |
| Structural acoperiș | Contravântuiri verticale/orizontale | 0,48-0,60 ✓ |
| Structural acoperiș | Înnădire de transport fermă | 0,91 ✓ (marjă redusă, control prioritar) |
| Structural acoperiș | Pane, verificare la succiune (zona F) | secțiune ✓, prinderi dimensionate separat |
| Structural tribune | Gradenă, toate pozițiile | 0,36-0,71 ✓ |
| Structural tribune | Grindă rampantă, toate pozițiile | 0,66-0,87 ✓ |
| Structural tribune | Stâlpi cadru tribună | 0,68 ✓ |
| Vibrații | Frecvență proprie grindă rampantă (toate poziții) + gradenă | 11,4-13,8 Hz, toate ≫ 6,0 Hz ✓ |
| Vibrații | Criteriu de accelerație, cuantificat | ≈0,3 m/s² < 0,5-2,0 m/s² ✓ |
| Geotehnic | Toate fundațiile (acoperiș + tribune) | 0,65-0,79 ✓ |
| Geotehnic | Ancorare la smulgere | γ=5,98 ≥ 1,5 ✓ |
| Spațiu liber | Deplasare cumulată vs. spațiu adoptat | 4,57/8,0 cm ✓ |
| SLS | Săgeată fermă vs. contrasăgeată | conform ✓ |
| SLS | Oboseală prinderi de colț | 1,5×10⁵ cicluri, sub prag ✓ |
| Foc | Toate elementele de beton armat (metoda tabelară) | ✓ |
| Foc | Structura metalică (R60 stâlpi, R30 ferme, grosimi orientative) | ✓ (grosime confirmată la alegerea sistemului) |
| Coordonare instalații | Iluminat sportiv suspendat — încărcare locală | negligibilă (0,043 kNm) ✓ |

## PTh-SP.23.3 Concluzie inginerească

Structura duală a sălii de sport polivalente de referință (acoperiș metalic cu deschidere liberă de 40,0 m, pe ferme cu zăbrele triangulate N/Pratt, rezemate pe 22 de stâlpi metalici; tribune de beton armat monolit, cu 360 de gradene prefabricate pe 11 cadre transversale, pentru 1.500 de spectatori), verificată integral la predimensionare în faza DTAC, a fost **detaliată la nivel de execuție** în prezentul supliment PTh: înfășurătoarea eforturilor pe toate cele 11 axe transversale ale ambelor subsisteme, verificarea completă a tuturor pozițiilor de stâlp metalic (inclusiv stâlpii de fronton la vânt frontal și stâlpii de capăt la calculul de capacitate al contravântuirilor), caiet de armare complet al tribunelor (≈25,4 t oțel-beton), extras de materiale al structurii metalice (≈253,6 t oțel structural), detaliu de execuție integral al spațiului liber dintre subsisteme (8,0 cm, calculat din combinarea pătratică a deplasărilor relative), înnădirea de transport a fermei de 40,0 m (3 tronsoane, splice dimensionat la utilizare 91%), tehnologie de execuție (cofraje/armare/prefabricare la tribune; atelier/transport/ridicare cu macara la structura metalică), plan de control al calității, faze determinante, program de urmărire în timp și program de probe.

Analiza detaliată a evidențiat **opt corecții/precizări de proiectare** față de predimensionarea DTAC (recalcularea gradului de utilizare la stâlpii de colectare a diafragmei, dimensionarea înnădirii de transport, diferențierea fundației de fronton, reducerea armăturii grinzii rampante de capăt, cuantificarea spațiului liber, dublarea densității de fixare la colțul acoperișului, unificarea profilelor de capăt și verificarea numerică a ancorării la smulgere pe toate pozițiile), toate documentate cu verificare numerică și motivate tehnic la PTh-SP.23.1 — corecții normale și așteptate la trecerea de la faza de predimensionare (DTAC) la faza de execuție (PTh), care **nu invalidează soluția de ansamblu, ci o consolidează**, exact rolul pe care faza PTh îl are față de faza DTAC în orice proiect tehnic corect condus.

**Verificarea tehnică**, obligatorie conform Legii 10/1995, se realizează, ca și la faza DTAC (cap. 12 DTAC), de **verificatori atestați MDLPA pe trei specialități distincte**: **A1** (rezistență — structura de beton armat a tribunelor, fundațiile ambelor subsisteme, infrastructura), **A2** (rezistență — structura metalică a acoperișului: ferme, stâlpi, contravântuiri, îmbinări) și **Af** (rezistența terenului de fundare — verificarea studiului geotehnic). Se recomandă, înainte de finalizarea planurilor de execuție definitive: (1) rularea modelului EF final cu geometria exactă a arhitecturii definitivate (confirmarea poziției tribunelor și a tunelului de acces al sportivilor față de grila structurală de la PTh-SP.2.1/PTh-SP.6.1); (2) confirmarea parametrilor seismici de amplasament reali (ag, Tc) cu harta de zonare P100-1/2013 pentru localitatea efectivă a investiției, dacă diferă de exemplul de calcul dezvoltat aici; (3) confirmarea definitivă a grosimilor de vopsea intumescentă cu raportul de clasificare la foc al sistemului efectiv ales de antreprenor; (4) confirmarea capacității reale a macaralei disponibile pe piața locală de execuție față de necesarul minim stabilit la PTh-SP.14.5 (≥80 t), înainte de fixarea definitivă a planului de ridicare.

---

*Prezentul supliment de fază PTh-Structură completează faza DTAC (`structura.md`) și se citește împreună cu planșele de execuție de structură (fundații, cofraj/armare tribune, montaj structură metalică, detalii de nod) și cu Caietul de sarcini pentru lucrări de beton armat și pentru structuri metalice (documente distincte). Toate valorile numerice sunt exemple de dimensionare pentru o sală de sport polivalentă de referință (deschidere acoperiș 40,0 m, lungime 60,0 m, tribune 1.500 locuri) și se confirmă/ajustează în urma rulării finale a modelului EF pe geometria reală a proiectului, a studiului geotehnic definitiv al amplasamentului și a alegerii efective a sistemelor de protecție anticorozivă/la foc și a macaralei de montaj de către antreprenorul de execuție. Piesele scrise de arhitectură (`arhitectura.md`), de instalații (`instalatii.md`) și memoriul general (`general.md`) se citesc complementar, fără suprapunere de conținut.*
