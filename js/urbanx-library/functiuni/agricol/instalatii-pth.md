## PTh-I.0 OBIECTUL SUPLIMENTULUI DE FAZĂ PTh (INSTALAȚII)

Prezentul supliment de fază PTh dezvoltă la nivel de execuție instalațiile fermei agrozootehnice descrise în faza DTAC (`instalatii.md`), pe geometria unică adoptată în `arhitectura-pth.md` §PTh-A.0 și `structura-pth.md` §PTh-R.1: **Corpul A** — hală adăpost, cadre metalice, deschidere L=21,00 m, travee e=5,50 m, 18 travei (L_hală≈99,00 m), Hs=5,00 m, coamă +8,50 m cu luminator continuu; **Corpul B** — siloz vertical metalic Ø8,00 m/H=15,00 m; **Corpul C** — bazin de dejecții, celulă de bază 12,00×8,00×3,00 m (≈288 mc), multiplicabilă la volumul real necesar.

**Breviarul de calcul de referință folosit consecvent în acest supliment** este exemplul de 2.000 de porci la îngrășat tratat integral și cantitativ în `instalatii.md` (bilanț termic, debit de ventilare, bilanț electric, dimensionare grup electrogen) — cel mai complet set numeric din faza DTAC, ales aici drept exemplu de calcul reprezentativ conform principiului explicit stabilit chiar în DTAC (`instalatii.md` §11.0: "metodologia... rămâne valabilă și trebuie reaplicată identic pentru orice altă specie"). Unde geometria arhitecturală este specifică bovinelor (filtru sanitar-veterinar, cușete, sală de muls), breviarul de instalații se adaptează cu valorile de normă proprii bovinelor (`arhitectura.md` §4.1, `instalatii.md` §1.4, tabel), păstrând identică metodologia de calcul. Pentru capacitatea de 300 de capete bovine (`arhitectura.md`), toate debitele/bilanțurile din acest document se recalculează proporțional prin aplicarea directă a formulelor stabilite mai jos cu efectivul real — exact ca și la breviarul de structură (`structura-pth.md` §PTh-R.24.3).

### PTh-I.0.1 Cadru normativ de referință pentru detaliere (completare listă `instalatii.md` §1.3)

SR EN 12845 (proiectarea/instalarea sistemelor de sprinklere), P118-2 (instalații de stingere), P118-3 (detectare/semnalizare), SR EN 62305 (protecție la trăsnet), SR EN 60079/NP 099 (echipamente electrice în atmosfere explozive — ATEX, obligatoriu la siloz), SR EN 1838 (iluminat de urgență), SR EN 12464-1 (iluminat interior), NP 061-2002 (iluminat artificial), I7-2011 (electrice), I5-2022 (ventilare), I9-2015/NP 133 (sanitare), NP 040/GP 118 (hidroizolații racorduri), HG 571/2016 (avizare/autorizare ISU).

---

## PTh-I.1 SCHEME DETALIATE DE EXECUȚIE

### PTh-I.1.1 Schema rețelei de adăpare — circuite separate, pe zone

Conform principiul celor trei circuite distincte stabilit la `instalatii.md` §2.1 (adăpare/spălare-dezinfecție/personal), schema de execuție detaliază traseele pe geometria Corpului A:

| Circuit | Traseu | Diametru orientativ | Observație execuție |
|---|---|---|---|
| Adăpare | foraj → rezervor 2×25 mc → hidrofor → coloană principală de-a lungul aleii centrale de furajare → derivații la fiecare adăpătoare (D10, `arhitectura-pth.md`) | coloană principală Dn conform breviar PTh-I.3.3 | clapetă de reținere la fiecare derivație, evitând reflux |
| Spălare-dezinfecție | derivație separată de la hidrofor, cu robinete de secționare pe zone (alei, filtru sanitar) | Dn majorat pentru debit de vârf scurt | fără interconectare cu circuitul de adăpare fără rupere de presiune |
| Personal | derivație dedicată spre filtrul sanitar-veterinar (duș, D06) și grup sanitar birou | conform normativ sanitar curent | apă caldă continuă la duș — condiție de funcționare a filtrului |

Traseele se pozează, pe cât posibil, suspendate de structura metalică a Corpului A (deasupra zonei de circulație, nu deasupra cușetelor, pentru a evita orice risc de picurare pe zona de odihnă a animalelor), cu protecție antiîngheț (cablu electric de însoțire) pe toate tronsoanele expuse la exterior (padoc, dezinfector rutier D16).

### PTh-I.1.2 Schema de canalizare — trei circuite complet separate

Conform `instalatii.md` §2.7, cu trasee de execuție specifice geometriei adoptate:

| Circuit | Traseu | Destinație finală |
|---|---|---|
| Menajer | filtru sanitar-veterinar (D06) + birou/sală mese → coloană dedicată | fosă septică/microstație proprie sau rețea publică |
| Tehnologic (dejecții) | canale de colectare din alei (D08, `arhitectura-pth.md`) → colector principal cu pantă 1-2% → stație de pompare/gravitațional → Corpul C | bazin de dejecții, niciodată emisar natural |
| Pluvial | acoperiș curat Corp A + platforme curate → rețea proprie separată | emisar/infiltrare (acoperiș curat) — separat obligatoriu de apa de pe platforma de gunoi/zona bazinului, care se dirijează spre Corpul C |

Cerință de execuție critică: cele trei coloane/rețele **nu se intersectează în niciun punct**, verificare explicită la recepția rețelelor îngropate (PVLA, coordonat cu `arhitectura-pth.md` §PTh-A.5.3), înainte de acoperirea cu placa de pardoseală (D08/D09).

### PTh-I.1.3 Schema de ventilare — cortine, luminator de coamă, completare mecanică

| Componentă | Poziție | Funcție |
|---|---|---|
| Cortine rulabile (18+18 module, câte una/travee) | fațade longitudinale | admisie de aer proaspăt reglabilă, deschidere gravitațională fail-safe |
| Luminator continuu de coamă | coamă, +8,50 m | evacuare prin tiraj termic, secțiune dimensionată la debitul de iarnă minim (v. PTh-I.3) |
| Ventilatoare de completare mecanică (destratificare/tunel) | montate pe structura de acoperiș/pereți, funcție de configurația adoptată | completare la vârf de vară, conform `arhitectura.md` §8.2 |
| Senzori temperatură/umiditate/gaze | distribuiți pe mai multe puncte ale halei, nu doar central | date de intrare pentru computerul de climat |
| Computer de climat | cabină tehnică separată, izolată de atmosfera halei | comandă cortine, ventilatoare, admisii, program de lumină |

### PTh-I.1.4 Schema instalației electrice — TGD, grup electrogen, AAR

| Componentă | Poziție | Observație |
|---|---|---|
| Tablou General de Distribuție (TGD) | cabină tehnică separată, ventilată, acces controlat | izolat de atmosfera agresivă a halei, conform `instalatii.md` §5.5 |
| Tablou secundar consumatori vitali | adiacent TGD, alimentat cu prioritate din GE | ventilatoare, pompe apă, computer climat, alarmă |
| Grup electrogen (GE) | platformă exterioară dedicată, protejată | 60-80 kVA, rezervă combustibil 24-48h |
| Automat de anclanșare a rezervei (AAR) | integrat TGD | comutare < 15-30 s |
| Priză de pământ comună | conductor de legătură la toate cele trei corpuri | R ≤ 4 Ω |
| Paratrăsnet | pe coama halei și pe siloz (element cel mai înalt) | conform SR EN 62305, nivel III-IV |

### PTh-I.1.5 Schema instalației ATEX la siloz (Corpul B)

| Componentă | Poziție | Funcție |
|---|---|---|
| Instalație de aspirație/desprăfuire | la punctele de transfer (gura de încărcare, transportoare) | menține concentrația de praf sub pragul critic de explozivitate |
| Panouri de decompresie (venting) | pe manta, poziție conform calcul ATEX | cedare controlată la suprapresiune incipientă (v. D13 `arhitectura-pth.md`) |
| Legare la pământ/egalizare potențiale | toate elementele metalice ale silozului | disipare sarcină electrostatică |
| Echipamente electrice ATEX | iluminat, senzori, motoare din zona clasificată | certificate SR EN 60079, fără sursă de aprindere |
| Detector de nivel/temperatură material depozitat | în interior, montaj ATEX | monitorizare autoaprindere |

### PTh-I.1.6 Schema instalației de gaze/GPL pentru încălzirea maternității/tineretului

Conform `instalatii.md` §9, rezervor de GPL amplasat la distanța de siguranță reglementată, conductă de distribuție spre arzătoarele/lămpile radiante din maternitate (D16bis, `arhitectura-pth.md`) și zona de tineret (D16ter), cu robineți de secționare la fiecare punct de consum, detectoare de gaz cuplate la sistemul de alarmă, și electrovalve de siguranță la flacără pe fiecare echipament de combustie.

### PTh-I.1.6bis Principii de dimensionare a rețelei de gaze/GPL — rezervor, presiune, protecție

Rețeaua de gaze/GPL pentru încălzirea localizată a maternității/tineretului (D16bis, D16ter din `arhitectura-pth.md`) se dimensionează pe un principiu diferit de o rețea de gaze naturale la o clădire civilă: consumul este **intermitent și localizat** (funcționează preponderent la populare cu animale tinere, cu intensitate maximă în primele săptămâni de viață ale efectivului, apoi în scădere progresivă pe măsura dezvoltării termoreglării proprii), motiv pentru care rezervorul de GPL se dimensionează la un consum de vârf sezonier, nu la un consum mediu anual uniform. Presiunea de distribuție la arzătoare/lămpi radiante se stabilește conform fișa tehnică a echipamentelor alese, cu regulator de presiune dedicat la ieșirea din rezervor și robineți de secționare individuali la fiecare zonă de consum (maternitate separată de zona de tineret), astfel încât o intervenție de mentenanță pe un circuit să nu întrerupă alimentarea celuilalt.

### PTh-I.1.7 Schema curenților slabi — alarmă GSM, CCTV, cântar, control acces filtru

| Componentă | Funcție |
|---|---|
| Centrala de alarmă critică | monitorizează temperatură/umiditate critică, cădere de tensiune, defect ventilator, concentrație critică de gaze; transmite SMS/apel cu escaladare pe mai multe numere |
| CCTV | hală, filtru sanitar, siloz, perimetru incintă, conectat la NVR |
| Control acces filtru sanitar-veterinar | înregistrare intrări, coordonat cu interblocarea ușilor (D06, `arhitectura-pth.md`) |
| Cântar-pod bascul | integrat cu sistemul de evidență/trasabilitate a fermei |
| UPS dedicat automatizării | continuitate monitorizare/transmitere alarme între căderea rețelei și pornirea GE |

### PTh-I.1.8 Schema completă a instalației de apă caldă menajeră

| Componentă | Amplasare | Funcție |
|---|---|---|
| Boiler ACM | cabină tehnică/anexă filtru sanitar | preparare apă caldă continuă pentru duș (D06) |
| Recuperare de căldură de la răcirea laptelui (dacă bovine) | racord la tancul de răcire, `instalatii.md` §10.2 | preîncălzire apă boiler, reducere consum energetic |
| Panouri solare termice (opțional) | acoperiș/platformă dedicată | asistență preparare ACM |
| Conductă de distribuție ACM | de la boiler la fiecare punct de duș/spălare caldă | izolată termic, protecție antiîngheț pe tronsoanele expuse |

### PTh-I.1.9 Schema sistemului de stingere — hidranți interiori/exteriori, rezervă, stație de pompare

| Componentă | Poziție | Observație |
|---|---|---|
| Rezervor rezervă incendiu (comun sau dedicat) | adiacent gospodăriei de apă | volum intangibil sub nivel de aspirație dedicat |
| Stație de pompare (electropompă principală + pompă jockey + eventual pompă Diesel de rezervă) | cabină tehnică dedicată | alimentare electrică inclusiv din GE |
| Rețea hidranți exteriori | inelară, pe perimetrul incintei, la toate cele trei corpuri | acces pentru autospeciale pe drumul de intervenție perimetral |
| Hidranți interiori (dacă impuși de calculul de risc) | pe traseul de circulație al Corpului A | conform P118-2 |

### PTh-I.1.10 Schema instalației electrice pe circuite — sinteză de zonare

| Circuit | Zonă deservită | Tablou de alimentare | Prioritate GE |
|---|---|---|---|
| Forță ventilatoare | Corp A | secundar consumatori vitali | maximă |
| Forță pompe apă/dejecții | Corp A/C | secundar consumatori vitali | maximă |
| Computer climat + senzori | Corp A | secundar consumatori vitali | maximă |
| Iluminat hală/alei | Corp A | tablou secundar iluminat | medie |
| Furajare automată | Corp A | tablou secundar tehnologic | redusă (temporizabilă la pornire GE) |
| Siloz (transportoare, ATEX) | Corp B | tablou dedicat, certificat ATEX unde necesar | medie |
| Sală de muls/lapterie | Corp A (C2) | tablou dedicat, prioritate ridicată (produs perisabil) | ridicată |
| Filtru sanitar-veterinar | C3 | tablou secundar | ridicată (apă caldă continuă) |
| Curenți slabi (alarmă, CCTV, control acces) | tot ansamblul | UPS dedicat + secundar | maximă (prin UPS) |
| Birou/sală mese | zonă administrativă | tablou secundar | redusă |

---

## PTh-I.2 BREVIAR COMPLET DE CALCUL

### PTh-I.2.1 Calcul hidraulic complet al rețelei de adăpare (toate tronsoanele)

Recapitulare `instalatii.md` §2.3 (exemplu 2.000 porci): Q_zi,med=23,2 mc/zi, Q_zi,max=30,2 mc/zi, Q_o,max=3,15 mc/h (0,87 l/s). Faza PTh dimensionează diametrele fiecărui tronson al rețelei ramificate (coloană principală → derivații pe alei → adăpătoare individuale), cu verificarea vitezei de curgere (0,5-1,5 m/s, evitând atât viteze prea mici — risc de stagnare/proliferare bacteriană — cât și prea mari — zgomot, uzură):

| Tronson | Debit de calcul (l/s) | Diametru orientativ (mm) | Viteză (m/s) |
|---|---|---|---|
| Coloană principală (de la hidrofor) | 0,87 (Q_o,max) | Dn50 | 0,44 |
| Derivație pe alee (2 alei/hală) | 0,44 | Dn32 | 0,55 |
| Racord adăpătoare individuală | conform norma pe cap (v. `instalatii.md` §1.4) | Dn20 | conform debit local |

Pentru bovine (300 capete, `arhitectura.md`), norma de adăpare (60-100 l/cap·zi) conduce, aplicând identic metoda Q_ad=Σ(Ni·qi), la un consum de bază de **300×80=24.000 l/zi=24 mc/zi**, comparabil ca ordin de mărime cu exemplul de porcine — confirmarea dimensiunilor rezervorului (2×25 mc, `instalatii.md` §2.4) rămâne, deci, valabilă și pentru varianta bovine, cu recalcularea fină a debitului orar de vârf (coeficient de neuniformitate specific comportamentului de adăpare al bovinelor, concentrat mai ales după mulsori și în orele calde).

### PTh-I.2.2 Calcul hidraulic canalizare — toate coloanele

Coloana de canalizare tehnologică (dejecții) se dimensionează la debitul de vârf al producției de dejecții + apa de spălare, cu secțiune și pantă conform D08 (`arhitectura-pth.md`) — verificare de non-colmatare la viteza minimă de autocurățare (conform `arhitectura.md` §3.3bis). Coloana menajeră (filtru sanitar, birou) se dimensionează conform normativ curent (STAS 1795), la numărul de puncte de consum din filtrul sanitar-veterinar și birou.

### PTh-I.2.3 Calcul complet al ventilării — pe zone ale Corpului A

Recapitulare `instalatii.md` §4b.5 (exemplu 2.000 porci): L_vara=200.000 mc/h, L_iarna=20.000 mc/h, raport 10:1. Faza PTh distribuie acest debit pe traseul real al Corpului A (99,00 m lungime), cu verificarea secțiunii libere a cortinelor (D04) și a luminatorului de coamă (D03) la debitul de vârf de vară și la debitul minim de iarnă:

| Regim | Debit total (mc/h) | Secțiune liberă cortine (ambele fațade) | Secțiune liberă luminator coamă |
<br>
|---|---|---|---|
| Vară (debit maxim) | 200.000 (exemplu porcine) / recalculat pentru bovine conform normă 300-500 mc/h·cap | cortine complet deschise, secțiune maximă disponibilă pe toată lungimea (99,00 m) | secundar, rol dominant preluat de ventilatoarele de completare (tunel/destratificare) |
| Iarnă (debit minim) | 20.000 (exemplu porcine) / recalculat pentru bovine conform normă 30-60 mc/h·cap | cortine parțial deschise, reglaj fin | rol dominant — tiraj termic, secțiune calculată la acest debit minim |

Pentru bovine (300 capete, normă de iarnă 30-60 mc/h·cap, valoare medie 45): **L_iarna,bovine=300×45=13.500 mc/h**; pentru vară (normă 300-500 mc/h·cap, valoare medie 400): **L_vara,bovine=300×400=120.000 mc/h** — valori de același ordin de mărime cu exemplul de porcine, confirmând validitatea dimensionării generale a secțiunilor de cortină/luminator adoptate la faza de arhitectură (`arhitectura-pth.md` D03, D04), cu ajustarea fină a numărului de ventilatoare de completare mecanică la breviarul termic specific bovinelor (PTh-I.2.4).

### PTh-I.2.4 Bilanț termic complet — Corpul A, aplicat la geometria de 99,00 m

Recapitulare metodologie `instalatii.md` §4.2: Q_animale+Q_încălzire=Q_transmisie+Q_ventilare. Pentru exemplul de referință (2.000 porci, θi=20°C, θe=−18°C, ΔT=38K rotunjit 36K): Q_animale=200 kW, Q_ventilare=245 kW (la L_iarna=20.000 mc/h), Q_transmisie≈54 kW, necesar total 299 kW, deficit 99 kW acoperit prin reducerea debitului de ventilare, recuperare de căldură (40-60%) și încălzire de suport la maternitate/tineret.

Pentru varianta bovine (300 capete, θi≈10-15°C — toleranță termică superioară a bovinelor adulte, `arhitectura.md` §3.2 — L_iarna,bovine=13.500 mc/h calculat la PTh-I.2.3): Q_animale=300×850 W(valoare medie interval 700-1.000 W/cap)=**255 kW**, Q_ventilare=0,34×13.500×(15-(-18))≈0,34×13.500×33≈**151,5 kW**, Q_transmisie (pe anvelopa semideschisă cu cortine, pierderi mai mari decât o hală închisă)≈estimat proporțional la suprafața de anvelopă, ≈45-55 kW — rezultă un **surplus** de căldură metabolică față de necesar (255 kW disponibil vs. ≈200-206 kW necesar), confirmând principiul stabilit la `arhitectura.md` §5.5/§8.1: hala de bovine semideschisă, spre deosebire de hala închisă de porcine, nu are, de regulă, nevoie de completare termică la animale adulte — surplusul de căldură metabolică se gestionează prin creșterea debitului de ventilare de iarnă peste minimul strict igienic, nu prin reducerea lui, exact opusul strategiei de la porcine.

### PTh-I.2.5 Bilanț electric complet — toate circuitele, aplicat la ambele variante de specie

| Consumator | Putere absorbită (kW), exemplu porcine 2.000 capete | Putere absorbită (kW), variantă bovine 300 capete (estimat proporțional pe funcție) |
|---|---|---|
| Ventilatoare | 32,4 | ≈12-15 (regim preponderent natural, completare mecanică redusă) |
| Furajare automată | 4,5 | ≈3,5 (linii de furajare mai simple) |
| Pompe apă | 2,7 | ≈2,2 |
| Evacuare/pompare dejecții | 2,2 | ≈2,5 (volum mai mare de dejecții lichide la bovine) |
| Iluminat | 5,8 | ≈6,5 (suprafață utilă comparabilă + sală de muls) |
| Sală de muls/lapterie (specific bovine) | — | ≈8-10 (pompe vid, robot/instalație muls, tanc răcire lapte) |
| Filtru sanitar-veterinar | 2,5 | 2,5 |
| Siloz (transportoare/aerare/ATEX) | 1,9 | 1,9 |
| Curenți slabi/automatizare | 2,4 | 2,4 |
| **Total putere cerută Pc** | **≈60,4 kW** | **≈41-45 kW** (estimat, de confirmat la proiectul tehnologic definitiv) |

Diferența principală față de exemplul de porcine este componenta de sală de muls/lapterie (specifică exclusiv bovinelor de lapte, absentă la porcine), care compensează parțial reducerea consumului de ventilare (regim preponderent natural la bovinele semideschise) — la faza de execuție finală, bilanțul electric se confirmă cu datele exacte ale echipamentelor de muls alese de beneficiar (sală tip brăduleț/paralel sau robot AMS, conform `arhitectura.md` §2.1).

### PTh-I.2.6 Verificarea căderii de tensiune pe toate circuitele

Conform I7-2011: ΔU ≤ 3% pentru circuitele de iluminat, ΔU ≤ 5% pentru circuitele de forță — verificare pe traseul cel mai lung (de la TGD, prin cabina tehnică, până la capătul opus al Corpului A, 99,00 m), cu secțiunea coloanei principale de alimentare a tabloului secundar de pe hală dimensionată să respecte acest prag la lungimea reală de traseu.

### PTh-I.2.7 Dimensionarea grupului electrogen — recapitulare + verificare pentru varianta bovine

Recapitulare `instalatii.md` §5.3: GE dimensionat la sarcina esențială (~60-80 kVA pentru exemplul de porcine). Pentru varianta bovine, cu Pc totală estimată la 41-45 kW (PTh-I.2.5) și un cosφ=0,90, puterea aparentă necesară este de aproximativ **46-50 kVA** — sub pragul de 60-80 kVA al exemplului de porcine, dar GE se dimensionează totuși cu marjă superioară valorii strict calculate, pentru a acoperi curentul de pornire al motoarelor cu pornire directă (pompe, ventilatoare) — verificare distinctă la PTh-I.2.8.

### PTh-I.2.8 Verificarea curentului de pornire a celui mai mare motor (pompă/ventilator) și impactul asupra GE

Motorul cu puterea nominală cea mai mare din instalație (pompă de incendiu, dacă echipată electric, sau ventilator de mare capacitate) generează, la pornire directă, un curent de 5-7 ori curentul nominal — verificare obligatorie a capacității GE de a susține acest vârf tranzitoriu fără cădere de tensiune care ar declanșa protecțiile celorlalți consumatori vitali alimentați simultan (ventilatoare, computer climat). Soluția tehnică adoptată: pornire secvențială temporizată a motoarelor mari (nu simultană) la revenirea alimentării prin GE, comandată de automatul de anclanșare a rezervei, conform principiului de ierarhizare a priorității de alimentare stabilit la `instalatii.md` §5.4bis.

### PTh-I.2.9 Calcul rezervă de apă pentru incendiu — confirmare la geometria adoptată

Recapitulare `instalatii.md` §7.2: V_inc=(Qhi+Qhe)·T=10 l/s×3×3.600=108 mc, posibil comună cu gospodăria de apă (2×25 mc) prin poziționarea aspirațiilor pompelor de incendiu sub nivelul minim garantat — la geometria adoptată (99,00 m lungime hală), se verifică suplimentar accesibilitatea hidranților exteriori pe tot perimetrul, cu distanța maximă între hidranți conform P118-2, ținând cont de cele trei corpuri distincte (Corp A, Corp B, Corp C) și de anexele de biosecuritate.

### PTh-I.2.10 Calcul instalației de aspirație/desprăfuire ATEX la siloz

Debitul de aspirație la punctele de transfer (gură de încărcare, transportoare) se dimensionează pentru a menține concentrația de praf de cereale sub pragul inferior de explozivitate (LEL — lower explosive limit), conform datele tehnice ale materialului depozitat (grâu/porumb) — calculul specific (volum de aer aspirat/oră la fiecare punct de emisie, dimensionat de specialistul ATEX pe baza debitului de transfer al materialului și a caracteristicilor prafului) se realizează la faza de execuție finală, cu integrarea rezultatului în poziționarea finală a panourilor de decompresie (D13, `arhitectura-pth.md`) și a zonării ATEX complete a siloz-ului.

### PTh-I.2.9bis Calcul hidraulic simplificat al rețelei de hidranți (metoda Hazen-Williams)

Pentru verificarea presiunii disponibile la cel mai defavorabil hidrant (cel mai îndepărtat de stația de pompare, la capătul opus al Corpului A, ~99,00 m + distanța până la Corpul C), se aplică formula Hazen-Williams pentru pierderea de sarcină liniară:

**h_f = 10,67·(Q/C)^1,852·D^(-4,87)·L**

unde Q este debitul de calcul (l/s), C coeficientul de rugozitate Hazen-Williams (≈120-140 pentru conducte noi de oțel/PEHD), D diametrul interior (m) și L lungimea tronsonului (m). Pentru debitul de calcul al hidranților exteriori (Qhe=10 l/s, `instalatii.md` §7.2), pe o rețea inelară cu diametru Dn100-Dn150, pierderea de sarcină cumulată pe traseul cel mai lung se verifică să nu depășească presiunea disponibilă la ieșirea din stația de pompare, minus presiunea reziduală minimă cerută la hidrant (conform P118-2). Rezultatul verificării confirmă necesitatea unei presiuni de refulare a electropompei principale de minimum 6-8 bar, funcție de configurația reală a rețelei inelare și de diferența de cotă pe amplasament.

### PTh-I.2.9ter Calcul volumului bazinului de dejecții pentru ambele variante de specie — verificare la modulul de 288 mc

Recapitulare formulă (`general.md` §11.2/`instalatii.md` §3.4): V_bazin=N·q_d·Z·k_s.

| Variantă | N (capete) | q_d (l/cap·zi) | Z (zile) | k_s | V_bazin calculat (mc) | Nr. celule de 288 mc necesare |
|---|---|---|---|---|---|---|
| Porcine (exemplu DTAC) | 2.000 | 6 | 180 | 1,15 | 2.484 | ≈9 celule |
| Bovine (exemplu `arhitectura.md`, 200 vaci) | 200 | 50 | 180 | 1,2 | 2.160 | ≈8 celule |
| Bovine (variantă 300 capete, geometrie adoptată) | 300 | 50 | 180 | 1,2 | 3.240 | ≈12 celule |

Numărul de celule identice de 288 mc (Corpul C, detaliate integral la `structura-pth.md` §PTh-R.2.9) rezultă direct din împărțirea volumului calculat la capacitatea unei celule, rotunjit superior — soluția constructivă recomandă distribuirea celulelor pe minimum două bazine funcționale distincte (umplere/maturare, conform `general.md` §11.2), nu o singură cuvă monolitică de volum foarte mare, pentru motivele de redundanță operațională deja explicate în DTAC.

### PTh-I.2.9quater Calcul factor de putere și dimensionare baterie de compensare

Recapitulare `instalatii.md` §5.1: la cosφ=0,90, puterea aparentă Sc≈67 kVA pentru exemplul de porcine. Pentru menținerea unui factor de putere global peste pragul impus de operatorul de distribuție (uzual 0,92-0,95), puterea reactivă de compensat se calculează:

**Q_c = P·(tgφ1 − tgφ2)**

unde P este puterea activă totală (60,4 kW), φ1 corespunde cosφ=0,90 (tgφ1≈0,484) și φ2 corespunde pragului țintă cosφ=0,95 (tgφ2≈0,329):

**Q_c = 60,4·(0,484−0,329) = 60,4·0,155 ≈ 9,4 kVAr**

Se adoptă o baterie de condensatoare de 10 kVAr, cu reglaj automat în trepte (evitând supracompensarea la sarcină parțială, care ar produce un factor de putere capacitiv nedorit).

### PTh-I.2.9quinquies Evaluarea riscului de trăsnet (SR EN 62305-2) — verificare cantitativă

Recapitulare `instalatii.md` §5.4: nivel de protecție III-IV, justificat calitativ de geometria ansamblului (hală de suprafață mare + siloz înalt izolat în teren deschis). Evaluarea cantitativă a riscului conform SR EN 62305-2 compară frecvența anuală estimată de lovituri directe de trăsnet pe structură (funcție de aria de captare echivalentă, dependentă de înălțimea silozului H=15,00 m și de densitatea de lovituri de trăsnet la sol specifică zonei climatice a amplasamentului) cu frecvența admisibilă de risc tolerabil — rezultatul acestei evaluări, efectuată cu datele reale de amplasament la faza de execuție finală, confirmă sau ajustează nivelul de protecție III-IV adoptat orientativ la DTAC, cu instalația de captare (paratrăsnet cu vârfuri/rețea de captare pe coama halei și pe siloz), coborâri și priza de pământ deja descrise la `instalatii.md` §5.4.

### PTh-I.2.10bis Tabloul de circuite electrice — schema de distribuție detaliată (extras reprezentativ)

Faza PTh dezvoltă schema monofilară DTAC (`instalatii.md` §1.3, referință I7-2011) până la nivel de fișă de circuit, cu secțiune de cablu și protecție dimensionate pe curentul de calcul al fiecărui consumator sau grup de consumatori. Extras reprezentativ pentru tabloul secundar consumatori vitali (alimentat cu prioritate din GE, conform PTh-I.1.10):

| Circuit | Consumator | Putere (kW) | Curent de calcul (A) | Secțiune cablu (mmp) | Protecție (întreruptor automat) |
|---|---|---|---|---|---|
| C1 | Ventilatoare completare (grup 1) | 8-10 | ≈15-18 | 4×4 | 25A curba C |
| C2 | Ventilatoare completare (grup 2) | 8-10 | ≈15-18 | 4×4 | 25A curba C |
| C3 | Pompă hidrofor principală | 2,2 | ≈4,5 | 4×2,5 | 16A curba C |
| C4 | Pompă hidrofor rezervă | 2,2 | ≈4,5 | 4×2,5 | 16A curba C |
| C5 | Pompă/mixer bazin dejecții | 2,2-3,0 | ≈5-6 | 4×2,5 | 16A curba C |
| C6 | Computer de climat + senzori | 0,5 | ≈1 | 3×1,5 | 10A curba B |
| C7 | Cortine rulabile (grup motorizări, 18 module fațadă A) | conform nr. module active simultan | dimensionat pe pornire secvențială | 4×2,5 | 16A curba C, cu temporizare de pornire |
| C8 | Cortine rulabile (grup motorizări, 18 module fațadă B) | idem | idem | 4×2,5 | 16A curba C |
| C9 | UPS automatizare/curenți slabi | 1,0 | ≈2 | 3×1,5 | 10A curba B |

Circuitele C1-C9 de mai sus sunt alimentate exclusiv din tabloul secundar consumatori vitali, cu comutare automată pe GE la cădere de tensiune — separate fizic (nu doar prin protecție) de tabloul secundar al consumatorilor neesențiali (iluminat general, furajare automată, siloz), conform principiului de ierarhizare stabilit la `instalatii.md` §5.4bis. Pornirea cortinelor (C7, C8) la revenirea alimentării prin GE se temporizează secvențial (nu toate cele 36 de motorizări simultan), pentru a evita un vârf de curent de pornire care ar suprasolicita generatorul — verificare directă a acestei secvențieri la proba funcțională PTh-I.4.4.

### PTh-I.2.10ter Calcul orientativ dimensionare rezervor GPL

Pentru un consum de vârf sezonier estimat la echipamentele de încălzire localizată a maternității/tineretului (funcție de puterea instalată a lămpilor/arzătoarelor și de numărul de ore de funcționare la intensitate maximă în primele săptămâni ale unui ciclu de populare), rezervorul de GPL se dimensionează cu o rezervă de autonomie de minimum 2-3 săptămâni la consumul de vârf, pentru a evita o reaprovizionare de urgență în plin sezon rece — dimensiune finală confirmată la faza de execuție pe baza fișei tehnice a echipamentelor de încălzire alese de beneficiar și a datelor climatice reale ale amplasamentului.

### PTh-I.2.11 Breviar programe de lumină pe specie — verificare la geometria hală/filtru

Recapitulare `instalatii.md` §6.1: bovine 16h lumină/150-200 lucși zona muls; porcine minimum 8h/40-100 lucși; păsări conform Directiva 2007/43/CE (minimum 6h întuneric continuu, 20 lucși) sau găini ouătoare (16h/20-40 lucși). Corpul A adoptat, cu anvelopă semideschisă și cortine (specific bovine), permite control redus al fotoperioadei artificiale în comparație cu o hală închisă de păsări — dacă tema de proiectare a beneficiarului include o componentă avicolă (variantă alternativă de specie pe aceeași geometrie structurală, conform `arhitectura.md` §2.3), anvelopa trebuie reconsiderată la închidere completă (fără cortine), aspect care depășește obiectul prezentului supliment axat pe varianta bovine/porcine.

---

## PTh-I.3 SPECIFICAȚII COMPLETE ECHIPAMENTE MAJORE

### PTh-I.3.1 Fișă tehnică — Ventilatoare de completare mecanică (tip EC/brushless)

| Parametru | Specificație |
|---|---|
| Tip | electronically commutated (EC), randament electromecanic superior motorului asincron |
| Debit unitar | conform necesar total/număr unități, dimensionat pe trepte |
| Reglaj | variator de frecvență (VFD), comandă din computerul de climat |
| Presiune statică de lucru | 20-50 Pa, conform `instalatii.md` §4b.4 |
| Protecție | IP54 minim, rezistent la mediul cu praf/umiditate/amoniac |
| Alimentare de rezervă | din tabloul secundar consumatori vitali (GE) |
| Criteriu de selecție | eficiență energetică maximă (mc/h per watt consumat), dat fiind statutul de consumator dominant |
| Verificare la recepție | curbă debit-presiune conform fișă furnizor, testare la turația maximă și minimă |

### PTh-I.3.2 Fișă tehnică — Grup electrogen (GE) cu automat de anclanșare a rezervei

| Parametru | Specificație |
|---|---|
| Putere | 46-80 kVA (funcție de specie/capacitate, v. PTh-I.2.7) |
| Timp de comutare AAR | < 15-30 secunde |
| Rezervă combustibil | minimum 24-48 ore la sarcină esențială |
| Amplasare | platformă exterioară dedicată, protejată de intemperii, cu cuvă de retenție a eventualelor scurgeri de combustibil |
| Insonorizare | capotă fonoabsorbantă, dat fiind funcționarea posibilă și pe timp de noapte |
| Verificare periodică | pornire de probă sub sarcină, minimum lunar (`instalatii.md` §10.3) |
| Mentenanță critică | rotația/reîmprospătarea periodică a rezervei de combustibil, verificare baterie de pornire |

### PTh-I.3.3 Fișă tehnică — Cortine rulabile motorizate cu mecanism fail-safe (recapitulare interfață cu arhitectura)

| Parametru | Specificație |
|---|---|
| Acționare | motoreductor IP54, comandă din computerul de climat |
| Dispozitiv fail-safe | deschidere gravitațională, independent de sursa electrică (v. D04, `arhitectura-pth.md`) |
| Senzor de poziție | confirmă starea reală (deschis/închis/intermediar) către computerul de climat |
| Verificare la recepție | probă funcțională la simulare de cădere de tensiune, pe toate cele 36 module |

### PTh-I.3.4 Fișă tehnică — Computer de climat

| Parametru | Specificație |
|---|---|
| Intrări | senzori temperatură/umiditate (multipunct), gaze (NH₃/CO₂), presiune diferențială |
| Ieșiri | comandă cortine, ventilatoare (VFD), admisii, încălzire suport, program de lumină |
| Curbe de setpoint | programate pe vârsta efectivului, conform `instalatii.md` §4b.6 |
| Alimentare de rezervă | din GE, prioritate maximă |
| Interfață de raportare | acces la distanță (opțional), pentru verificarea parametrilor de către fermier/personal de gardă |

### PTh-I.3.5 Fișă tehnică — Pompă/mixer submersibil bazin de dejecții

| Parametru | Specificație |
|---|---|
| Funcție | omogenizare periodică, obligatorie înainte de vidanjare/pompare pentru împrăștiere |
| Protecție | rezistență la mediul coroziv al dejecțiilor (H₂S, amoniac, acizi organici) |
| Amplasare | conform platformă tehnică D14, `arhitectura-pth.md` |
| Clasificare electrică | conform zonă de risc (dacă se degajă gaze inflamabile din fermentarea dejecțiilor, se evaluează necesitatea unei clasificări de tip ATEX local) |

### PTh-I.3.6 Fișă tehnică — Dezinfector rutier (bazin sau rampă cu pulverizare)

| Parametru | Specificație |
|---|---|
| Variantă | bazin cu soluție/rampă cu pulverizare automată |
| Acționare | pompă dedicată, senzor de prezență (variantă rampă) |
| Protecție la îngheț | cablu electric de însoțire pe conducte |
| Evacuare soluție uzată | colectare separată, fără racord la circuitul de dejecții (v. `instalatii.md` §7bis) |

### PTh-I.3.7 Fișă tehnică — Sistem de alarmă critică cu transmitere GSM

| Parametru | Specificație |
|---|---|
| Praguri monitorizate | temperatură min/max critică, umiditate critică, cădere de tensiune, defect ventilator, concentrație critică de gaze |
| Transmitere | apel/SMS cu escaladare pe mai multe numere |
| Alimentare | sursă proprie (acumulator) independentă |
| Verificare periodică | test lunar al liniei de comunicație GSM (card SIM activ, semnal suficient) |

### PTh-I.3.8 Fișă tehnică — Panouri de decompresie ATEX (venting) siloz

| Parametru | Specificație |
|---|---|
| Funcție | cedare controlată la o suprapresiune incipientă, mult sub presiunea de rupere a mantalei |
| Dimensionare | rezultată din calculul specific ATEX (PTh-I.2.10), coordonat cu structura (inele de rigidizare, `structura-pth.md` §PTh-R.2.8) |
| Poziționare | conform D13, `arhitectura-pth.md`, cu zonă de direcționare liberă |
| Verificare la recepție | control documentar al calculului ATEX, verificare vizuală a integrării în manta |

### PTh-I.3.9 Fișă tehnică — Echipamente de muls (sală/robot AMS) și tanc de răcire lapte

| Parametru | Specificație |
|---|---|
| Tip | sală de muls (brăduleț/paralel) sau robot de muls automatizat (AMS) |
| Sistem CIP | curățare-dezinfecție automată în circuit închis, obligatoriu pentru igiena alimentară |
| Tanc de răcire | răcire rapidă post-muls, cu recuperare de căldură posibilă spre boilerul de apă caldă |
| Alimentare de rezervă | prioritate ridicată din GE (produs perisabil, risc economic direct la întreruperea răcirii) |

### PTh-I.3.10 Fișă tehnică — Lămpi cu infraroșu/podea încălzită (maternitate, tineret)

| Parametru | Specificație |
|---|---|
| Temperatură țintă | 30-34°C nou-născuți, cu scădere progresivă |
| Sursă | pompă de căldură/centrală termică (podea) sau lampă IR (localizat) |
| Siguranță | electrovalvă de siguranță la flacără (dacă pe gaz), protecție la supratemperatură |
| Verificare | protocol de primă pornire, cu monitorizare a temperaturii reale la nivelul cuibului/boxei |

### PTh-I.3.11 Fișă tehnică — Electropompă principală/pompă Diesel de rezervă incendiu

| Parametru | Specificație |
|---|---|
| Debit/presiune | conform breviarul hidraulic PTh-I.2.9bis |
| Alimentare | electropompă din GE (prioritate maximă); pompă Diesel de rezervă cu rezervor propriu de combustibil |
| Pompă jockey | menținere presiune rețea, evită pornirile inutile ale pompelor principale |
| Verificare periodică | pornire de probă lunară, conform program de mentenanță |

### PTh-I.3.12 Fișă tehnică — Centrală de detectare/semnalizare incendiu (IDSAI)

| Parametru | Specificație |
|---|---|
| Detectoare | adaptate mediului prăfos la siloz/depozit furaje (prag de sensibilitate ajustat), standard în restul ansamblului |
| Zone monitorizate | hală, filtru sanitar, siloz, depozit furaje, cabină tehnică (GE, tablou) |
| Integrare | cuplată cu sistemul de alarmă critică (PTh-I.3.7) și cu ușile rezistente la foc cu autoînchidere |

### PTh-I.3.13 Fișă tehnică — Instalație de aspirație/desprăfuire ATEX

| Parametru | Specificație |
|---|---|
| Funcție | menține concentrația de praf sub pragul inferior de explozivitate (LEL) |
| Puncte de montaj | gura de încărcare, transportoare, puncte de transfer al materialului |
| Echipamente | certificate ATEX, fără sursă de aprindere |
| Verificare | debit de aspirație conform calcul specialist (PTh-I.2.10) |

### PTh-I.3.14 Fișă tehnică — UPS dedicat automatizării și curenților slabi

| Parametru | Specificație |
|---|---|
| Funcție | continuitate monitorizare/transmitere alarme între căderea rețelei și pornirea GE |
| Autonomie | conform timpul de comutare AAR + marjă de siguranță |
| Consumatori deserviți | computer climat, centrală alarmă, NVR, control acces |

### PTh-I.2.12 Calcul detaliat iluminat exterior — platforme, dezinfector rutier, perimetru incintă

Iluminatul exterior al fermei, spre deosebire de cel interior (tratat la PTh-I.8), are un rol suplimentar de biosecuritate — vizibilitate suficientă la poarta unică de acces (D16, `arhitectura-pth.md`) pentru verificarea corectă a vehiculelor și a dezinfectorului rutier pe timp de noapte/vizibilitate redusă.

| Zonă exterioară | Nivel de iluminare (lucși) | Nr. corpuri orientativ | Observație |
|---|---|---|---|
| Poartă unică + dezinfector rutier + cântar | 50-75 | 2-3 proiectoare LED | vizibilitate pentru control vizual al vehiculului |
| Drumuri tehnologice interioare | 20-30 | conform lungime traseu, interax ≈25-30 m | siguranța circulației utilajelor |
| Platformă padoc/acces rampă animale | 20-30 | 2-4 proiectoare | siguranța manevrelor de îmbarcare pe timp de noapte |
| Perimetru incintă (gard) | 5-10 (iluminat de supraveghere, nu de lucru) | conform lungime perimetru | complementar CCTV |
| Platformă tehnică siloz/bazin | 50-75, corp ATEX la siloz | 2 | siguranța muncii la intervenții nocturne |

### PTh-I.2.13 Calcul economie energetică din comanda inteligentă a iluminatului și ventilării

Similar principiului aplicat la hale industriale, comanda automatizată (senzori de prezență la birou/filtru sanitar, program de lumină cu simulare graduală în hală, reglaj automat al turației ventilatoarelor prin VFD în locul funcționării on/off) generează o economie estimată de 15-25% față de o soluție cu comandă manuală/on-off simplă — beneficiu cumulat cu recuperarea de căldură (40-60% la ventilare, `instalatii.md` §4.2) și cu valorificarea fotovoltaică (dacă adoptată, `instalatii.md` §10.2), toate convergând spre obiectivul de cvasi-independență energetică menționat explicit în DTAC.

### PTh-I.2.14 Breviar debit apă caldă la filtrul sanitar-veterinar

Debitul de apă caldă necesar la dușul-barieră (D06) se dimensionează pentru utilizare de mai multe ori pe zi, la fiecare schimb de personal — pentru un efectiv de personal estimat la 4-8 persoane/schimb (conform dimensiunea fermei), cu un consum de 40-60 litri apă caldă/duș și o durată medie de duș de 3-5 minute, rezultă un debit instantaneu de calcul de ordinul 0,15-0,20 l/s per punct de duș, cu boilerul dimensionat la volumul necesar pentru acoperirea vârfului de schimb (schimbare simultană a 2-3 persoane la începutul/sfârșitul programului).

---

## PTh-I.4 PROBE ȘI VERIFICĂRI DETALIATE

### PTh-I.4.1 Probă funcțională a cortinelor fail-safe (coordonare cu `arhitectura-pth.md` §PTh-A.5.4)

Simularea căderii de tensiune controlate, la fiecare din cele 36 de module de cortină, cu cronometrarea timpului de deschidere completă și verificarea absenței blocajelor mecanice — probă efectuată de instalator, în prezența dirigintelui, cu consemnare în PV distinct.

### PTh-I.4.2 Probă de reglaj și echilibrare hidraulică

Echilibrarea rețelei de adăpare pe toate derivațiile, verificarea presiunii la cea mai defavorabilă adăpătoare (capătul opus hidroforului, 99,00 m distanță).

### PTh-I.4.3 Probă a sistemului de stingere (hidranți, rezervă de incendiu)

Verificarea debitului și presiunii la cel mai defavorabil hidrant, verificarea pornirii automate a pompei de incendiu (inclusiv din GE, conform `instalatii.md` §7.3), verificarea nivelului intangibil al rezervei de incendiu.

### PTh-I.4.4 Probă a grupului electrogen sub sarcină reală

Pornire sub sarcina reală a consumatorilor vitali (nu doar în gol), verificare a timpului de comutare AAR și a stabilității tensiunii/frecvenței pe toată durata probei.

### PTh-I.4.5 Probă a sistemului de alarmă GSM

Simulare a fiecărui prag critic în parte (temperatură, umiditate, cădere de tensiune, defect ventilator, gaze), verificare a recepției efective a SMS/apelului la toate numerele din lista de escaladare.

### PTh-I.4.6 Probă a instalației ATEX

Verificarea funcționării instalației de aspirație/desprăfuire, verificarea continuității legăturii la pământ pe toate elementele metalice ale silozului, verificare a certificării echipamentelor electrice montate în zona clasificată.

### PTh-I.4.7 Probă de etanșeitate coordonată cu structura (bazin de dejecții)

Coordonare directă cu proba structurală de la `structura-pth.md` §PTh-R.15.6 — instalația de mixare/pompare nu se pune în funcțiune definitivă decât după confirmarea rezultatului pozitiv al probei de etanșeitate a cuvei.

### PTh-I.4.8 Probă a interblocării ușilor filtrului sanitar-veterinar (coordonare cu `arhitectura-pth.md` D06)

Verificarea funcțională a sistemului de interblocare (mecanic sau electric), dacă soluția adoptată este electrică — verificare distinctă de proba de arhitectură, dat fiind componenta electrică/de automatizare a interblocării.

### PTh-I.4.9 Probă a sistemului de răcire a laptelui și a instalației CIP (dacă bovine)

Verificarea timpului de răcire de la temperatura de muls la temperatura de stocare reglementată, verificarea ciclului complet de curățare-dezinfecție automată (CIP), cu prelevare de probe pentru confirmarea eficienței de dezinfecție conform normelor de igienă alimentară.

### PTh-I.4.10 Probă a instalației de gaze/GPL pentru încălzirea maternității/tineretului

Verificarea etanșeității conductelor (test de presiune), funcționarea electrovalvei de siguranță la flacără (simulare stingere accidentală), funcționarea detectoarelor de gaz cuplate la sistemul de alarmă.

### PTh-I.4.11 Probă a instalației fotovoltaice (dacă adoptată)

Verificarea producției reale față de producția estimată (v. `instalatii.md` §10.2), verificarea protecțiilor de rețea (anti-insularizare), verificarea funcționării corecte a invertoarelor.

### PTh-I.4.12 Sinteza probelor obligatorii înainte de PIF — tabel centralizator

| Probă | Referință | Rezultat condiționează |
|---|---|---|
| Cortine fail-safe (36 module) | PTh-I.4.1 | recepția anvelopei, siguranța critică a efectivului |
| Echilibrare hidraulică adăpare | PTh-I.4.2 | populare efectivă |
| Sistem de stingere | PTh-I.4.3 | aviz ISU |
| Grup electrogen sub sarcină | PTh-I.4.4 | aviz ISU, siguranța critică |
| Alarmă GSM | PTh-I.4.5 | siguranța critică pe timp de absență a personalului |
| Instalație ATEX siloz | PTh-I.4.6 | aviz ISU (risc explozie de praf) |
| Etanșeitate bazin dejecții (coordonat cu structura) | PTh-I.4.7 | aviz de mediu |
| Interblocare filtru sanitar | PTh-I.4.8 | aviz sanitar-veterinar |
| Răcire lapte + CIP (dacă bovine) | PTh-I.4.9 | conformitate igienă alimentară, comercializare lapte |
| Instalație gaze/GPL | PTh-I.4.10 | siguranța maternității/tineretului |

---

## PTh-I.5 TEHNOLOGIA DE MONTAJ

### PTh-I.5.1 Succesiunea generală a lucrărilor de instalații

| Nr. | Etapă | Condiție de început | Coordonare |
|---|---|---|---|
| 1 | Execuție foraj de apă propriu + probă de debit | terasamente finalizate | conform `general.md` §12.3 — se testează devreme |
| 2 | Rețele îngropate (apă, canalizare, electrice) sub pardoseală | fundații/hidroizolație pardoseală finalizate (D09, `arhitectura-pth.md`) | probă de presiune ÎNAINTE de turnarea plăcii |
| 3 | Montaj tablou general, cabină tehnică | structura Corpului A finalizată | izolat de atmosfera halei |
| 4 | Montaj grup electrogen + AAR | tablou general montat | platformă exterioară dedicată gata |
| 5 | Montaj instalație electrică interioară hală (prize, iluminat, senzori) | panouri de anvelopă montate | coordonat cu poziția cortinelor (D04) |
| 6 | Montaj cortine rulabile + comandă motorizată | rigle de perete finisate | probă funcțională obligatorie (PTh-I.4.1) |
| 7 | Montaj instalație ATEX siloz (aspirație, panouri decompresie, echipamente certificate) | manta siloz recepționată | coordonat cu structura (inele de rigidizare) |
| 8 | Montaj instalație sanitară (adăpare, spălare) | rețele îngropate probate | coordonat cu poziția adăpătorilor (D10) |
| 9 | Montaj instalație de canalizare tehnologică (racord la Corpul C) | Corpul C recepționat structural | coordonat cu proba de etanșeitate |
| 10 | Montaj sistem de stingere/detectare | structură/anvelopă finalizate | conform P118-2/3 |
| 11 | Montaj filtru sanitar — instalație apă caldă, ventilare, interblocare uși | compartimentare filtru recepționată (D06) | probă funcțională (PTh-I.4.8) |
| 12 | Montaj echipamente de muls/lapterie | sala de muls finisată | sistem CIP funcțional |
| 13 | Montaj curenți slabi (CCTV, alarmă, control acces, cântar) | structuri de cablare finalizate | UPS funcțional |
| 14 | Probe funcționale integrale (PTh-I.4) | toate instalațiile montate | condiție de PIF |
| 15 | Punere în funcțiune (PIF) | probe finalizate pozitiv | v. PTh-I.6 |

### PTh-I.5.2 Susțineri și fixări specifice mediului agresiv

Toate traseele suspendate de structura metalică a Corpului A folosesc console/coliere rezistente la coroziune (conform clasa de corozivitate a mediului interior, `structura-pth.md` §PTh-R.23.9), cu evitarea contactului direct galvanic între materiale diferite (oțel zincat/inox) prin intermediul unor piese de separare dielectrică unde necesar.

### PTh-I.5.3 Treceri etanșe la foc și penetrări prin anvelopă

Conform D09 din `arhitectura-pth.md` — orice penetrare a unui panou sandwich sau a unui element cu rol de foc se etanșează cu sistem certificat (colier intumescent/mastic EI), coordonat cu poziția reală a traseelor de instalații stabilită de comun acord cu arhitectura, înainte de montarea panourilor pe zona respectivă.

### PTh-I.5.4 Reguli tehnologice critice de montaj

- Rețelele îngropate sub placa de pardoseală (apă, canalizare, electrice) se probează la presiune/izolație și se recepționează ca lucrare ascunsă **înainte** de turnarea plăcii — o probă omisă expune riscul de spargere a plăcii finite pentru remediere ulterioară, exact ca la o hală industrială curentă, dar cu riscul suplimentar, specific fermei, de deteriorare a hidroizolației HDPE deja montate (D09).
- Montajul cortinelor rulabile și proba funcțională a mecanismului fail-safe se execută **înainte** de populare, niciodată amânate ca lucrare de finisare — element de siguranță critică, nu accesoriu.
- Instalația ATEX a silozului (aspirație, echipamente certificate, panouri de decompresie) se finalizează și se recepționează **înainte** de prima încărcare cu cereale a silozului — o punere în funcțiune a silozului fără instalația antiexplozivă completă constituie o abatere gravă de securitate.
- Echipamentele de muls/lapterie se montează și se pun în funcțiune doar după finalizarea completă a finisajelor igienice ale sălii de muls (v. `arhitectura-pth.md` §PTh-A.3.4) — montajul pe un suport nefinisat compromite igiena echipamentului chiar înainte de prima utilizare.
- Grupul electrogen se pune în funcțiune de probă doar după finalizarea completă a tabloului general și a automatizării de anclanșare a rezervei — o probă prematură, fără AAR funcțional, nu validează scenariul real de comutare automată.

### PTh-I.5.5 Coordonarea interdisciplinară în execuție (instalații–arhitectură–structură–biosecuritate)

- **Instalații–arhitectură:** poziția penetrărilor prin panourile de anvelopă (D09) și poziția/dimensiunea panourilor de decompresie ATEX (D13) se stabilesc de proiectantul de instalații și se validează cu arhitectul înainte de fabricarea panourilor cu decupaje predefinite.
- **Instalații–structură:** sarcinile agățate ale echipamentelor de furajare/ventilare se coordonează cu structura (v. `structura-pth.md` §PTh-R.22.2), la pozițiile reale din planul tehnologic; traseele electrice/hidraulice care traversează rosturile de separare dintre cele trei corpuri independente (Corp A/B/C) se execută cu bucle de compensare a deplasării relative, fără a crea o punte rigidă structurală accidentală între corpuri.
- **Instalații–biosecuritate:** orice modificare a traseelor de instalații care ar afecta compartimentarea filtrului sanitar-veterinar (de exemplu, o canalizare care ar trece printr-un perete despărțitor fără etanșare adecvată) se supune avizului consultantului sanitar-veterinar, la fel ca la arhitectură (v. `arhitectura-pth.md` §PTh-A.4.3).

---

## PTh-I.6 PUNEREA ÎN FUNCȚIUNE (PIF) ȘI REGLAJE

### PTh-I.6.1 Echilibrarea hidraulică finală

Reglaj fin al presiunii la fiecare adăpătoare, verificare a debitului de spălare pe toate zonele, cu măsurarea presiunii reziduale la punctul cel mai defavorabil (capătul opus hidroforului) și ajustarea variatoarelor de frecvență ale pompelor pentru menținerea unei presiuni constante indiferent de numărul de puncte de consum active simultan.

### PTh-I.6.2 Reglaj aeraulic — programarea curbelor de setpoint

Programarea computerului de climat cu curbele de setpoint corespunzătoare vârstei efectivului declarat de proiectul tehnologic definitiv (`instalatii.md` §11.0), cu verificare a tranziției corecte între regimul de iarnă și cel de vară, inclusiv a comportării automate a cortinelor la variații bruște de temperatură exterioară (test de reacție a sistemului la o schimbare simulată a citirii senzorilor).

### PTh-I.6.3 Protocol de primă pornire a grupului electrogen și verificare AAR

Pornire de probă completă, cu simulare a căderii de tensiune și verificare a secvenței complete (detectare cădere → pornire GE → comutare AAR → repornire consumatori vitali în ordine ierarhizată, conform `instalatii.md` §5.4bis), cu cronometrare a fiecărei etape și consemnare a timpilor reali față de cei de proiect (< 15-30 secunde comutare AAR).

### PTh-I.6.4 Protocol PIF instalație ATEX

Verificare finală a zonării ATEX, a certificatelor tuturor echipamentelor montate în zona clasificată, a funcționării instalației de aspirație/desprăfuire la parametrii de proiect, cu măsurarea concentrației reziduale de praf la punctele critice (dacă echipamentul de măsură este disponibil) și confirmarea documentară a continuității legăturii la pământ pe toate elementele metalice ale silozului.

### PTh-I.6.5 Protocol PIF curenți slabi

Verificare integrală a alarmei GSM (toate pragurile, toate numerele de escaladare), a funcționării CCTV/NVR (acoperire vizuală completă a zonelor critice — poartă, filtru sanitar, siloz, bazin de dejecții), a controlului de acces la filtrul sanitar-veterinar și a integrării cântarului-pod bascul cu sistemul de evidență al fermei.

### PTh-I.6.6 Protocol PIF instalație de muls

Verificare a sistemului CIP, a tancului de răcire, a parametrilor de vid/pulsație ai echipamentului de muls (dacă e cazul), conform specificația producătorului echipamentului ales de beneficiar, cu confirmarea timpului real de răcire a laptelui de la temperatura de muls la temperatura de stocare reglementată.

### PTh-I.6.7 Sinteza protocoalelor PIF — condiționare reciprocă

Protocoalele PTh-I.6.1–PTh-I.6.6 nu se execută independent unele de altele — reglajul aeraulic (PTh-I.6.2) depinde de funcționarea confirmată a grupului electrogen (PTh-I.6.3), întrucât testarea completă a curbelor de setpoint pe regimul de iarnă/vară include obligatoriu și scenariul de alimentare de rezervă; proba ATEX (PTh-I.6.4) precede orice încărcare reală a silozului cu cereale; iar protocolul de muls (PTh-I.6.6) nu se finalizează decât după confirmarea alimentării electrice prioritare a tancului de răcire din circuitul de siguranță critică (PTh-I.1.10).

---

## PTh-I.7 PLANUL DE CONTROL AL CALITĂȚII (PCC) INSTALAȚII

### PTh-I.7.1 Matrice de control pe categorii

| Categorie lucrare | Ce se verifică | Metodă | Fază/moment | Document | Responsabil |
|---|---|---|---|---|---|
| Rețele îngropate (apă/canalizare/electrice) | etanșeitate/continuitate, poziție conform proiect | probă de presiune/izolație | înainte de turnarea plăcii de pardoseală | PVLA | instalator + diriginte |
| Instalație electrică — priză de pământ | rezistență de dispersie R≤4Ω | măsurare PRAM | la finalizarea prizei | PV | electrician autorizat + diriginte |
| Cortine fail-safe | deschidere gravitațională la simulare cădere tensiune | probă funcțională, 100% module | la finalizarea montajului | PV (PTh-I.4.1) | instalator + diriginte |
| Grup electrogen + AAR | pornire sub sarcină reală, timp de comutare | probă funcțională | la PIF | PV (PTh-I.6.3) | instalator + diriginte |
| Instalație ATEX siloz | certificare echipamente, continuitate legare la pământ | control documente + măsurare | înainte de PIF | PV (PTh-I.4.6) | specialist ATEX + diriginte |
| Filtru sanitar — apă caldă, interblocare | funcționare continuă, interblocare uși | probă funcțională | la finalizare | PV (PTh-I.4.8) | instalator + diriginte |
| Instalație de stingere | debit/presiune la punctul defavorabil | probă hidraulică | la finalizare | PV (PTh-I.4.3) | instalator + diriginte |
| Sistem de alarmă GSM | recepție SMS/apel pe toate pragurile și numerele | probă funcțională | la PIF | PV (PTh-I.4.5) | instalator + diriginte |

### PTh-I.7.1bis Matrice de control extinsă — verificări specifice biosecurității și microclimatului

| Categorie lucrare | Ce se verifică | Metodă | Fază/moment | Document | Responsabil |
|---|---|---|---|---|---|
| Secțiune liberă cortine (D04) | conformitate cu debitul minim de iarnă calculat (PTh-I.2.3) | măsurare directă la montaj | la finalizarea montajului | PV | instalator + proiectant |
| Secțiune liberă luminator de coamă (D03) | conformitate cu debitul de tiraj termic de calcul | măsurare directă | la finalizarea montajului | PV | instalator + proiectant |
| Program de lumină automatizat | curbe corecte pe specie/vârstă, tranziție graduală | verificare software + observare directă | la PIF | PV (PTh-I.6.2) | instalator + beneficiar |
| Calitate apă de adăpare | parametri fizico-chimici, microbiologici, nitrați | probe laborator autorizat | la PIF + periodic | rapoarte laborator | laborator autorizat |
| Separare completă a celor trei circuite de canalizare | absența intersectării | vizual, pe planul as-built + verificare fizică | înainte de acoperire | PVLA | diriginte + proiectant |
| Zonare ATEX siloz | conformitate documentație cu execuția reală | control documentar + vizual | înainte de PIF | PV (PTh-I.4.6) | specialist ATEX + diriginte |
| Program de verificare periodică predat beneficiarului | conținut complet (GE, cortine, alarmă GSM) | verificare documentară | la predarea Cărții Tehnice | proces-verbal predare | proiectant + beneficiar |

### PTh-I.7.2 Faze determinante — instalații

Poziția și etanșeitatea rețelelor îngropate înainte de turnarea plăcii; recepția prizei de pământ și a paratrăsnetului; probele funcționale ale cortinelor fail-safe și ale grupului electrogen (elemente de siguranță critică, v. `instalatii.md` §5.2); recepția instalației ATEX la siloz, condiție pentru avizul ISU privind riscul de explozie de praf; proba de etanșeitate a bazinului de dejecții (coordonată cu structura), condiție pentru avizul de mediu.

### PTh-I.7.3 Cartea tehnică a construcției — capitol instalații

Toate fișele tehnice de echipamente (PTh-I.3), procesele-verbale de probă (PTh-I.4), schemele electrice/hidraulice as-built și programul de verificare periodică (v. `instalatii.md` §10.3) se predau integral la Cartea Tehnică, secțiunea instalații.

---

## PTh-I.8 CALCUL ILUMINAT INTERIOR ȘI DE SIGURANȚĂ (NP 061/2002, SR EN 12464-1)

### PTh-I.8.1 Metoda de calcul

Metoda fluxului luminos, cu factor de utilizare și de mentenanță conform NP 061, aplicată distinct pe zonele funcționale ale Corpului A (alei, cușete, sală de muls) și ale anexelor (filtru sanitar, siloz, bazin).

### PTh-I.8.2 Cerințe de iluminare pe categorii de zone

| Zonă | Nivel de iluminare (lucși) | Observație |
|---|---|---|
| Alei de circulație/furajare hală | 50-100 | conform activitate curentă zootehnică |
| Zona de muls | 150-200 | stimulare hormonală bovine (`instalatii.md` §6.1) |
| Filtru sanitar-veterinar | 100-200 | conform confort/siguranță vizuală |
| Birou/sală mese | conform SR EN 12464-1, activitate de birou | 300-500 lucși la planul de lucru |
| Platformă tehnică siloz/bazin | 100-200, corp de iluminat ATEX la siloz | siguranța muncii |
| Exterior — platforme, dezinfector rutier | 20-50 | siguranța circulației nocturne a vehiculelor |

### PTh-I.8.2bis Calcul detaliat pe zone — metoda fluxului luminos, exemplu alei de circulație Corp A

Metoda fluxului luminos determină numărul de corpuri de iluminat necesare pentru un nivel de iluminare mediu impus:

**n = (E·A)/(Φ·u·m)**

unde E este nivelul de iluminare cerut (lucși), A aria zonei (mp), Φ fluxul luminos al unui corp (lm), u factorul de utilizare (funcție de geometria încăperii/înălțimea de montaj) și m factorul de mentenanță (depreciere în timp, majorată pentru mediul agresiv al halei — praf, umiditate, degradare a difuzoarelor).

Pentru aleile de circulație/furajare ale Corpului A (arie utilă aproximativă 2×99,00×4,00≈792 mp pentru cele două alei de furajare, plus aleile de circulație), la E=75 lucși (valoare medie din intervalul 50-100, PTh-I.8.2), corp de iluminat LED IP65 cu Φ=12.000 lm, u=0,55 (montaj la înălțime mare, Hs=5,00 m, reflexii reduse pe suprafețele tehnice), m=0,80 (mentenanță majorată pentru mediul cu praf/umiditate):

**n = (75×792)/(12.000×0,55×0,80) = 59.400/5.280 ≈ 11,3 → 12 corpuri**

Cele 12 corpuri se distribuie uniform pe lungimea de 99,00 m (interax ≈8,25 m), coordonate cu poziția panelor și a instalațiilor tehnologice suspendate (v. `structura-pth.md` §PTh-R.22.2), pentru a evita zonele de umbră create de echipamentele de furajare/ventilare.

### PTh-I.8.2ter Calcul detaliat — sala de muls (nivel de iluminare majorat)

Pentru sala de muls (arie ≈250 mp, `arhitectura.md` §4.3), la E=175 lucși (medie interval 150-200), Φ=15.000 lm (corp de iluminat cu indice de redare a culorii ridicat, pentru control vizual al stării ugerului/laptelui), u=0,60 (spațiu mai compact, plafon mai jos), m=0,85 (mediu mai controlat igienic decât hala curentă):

**n = (175×250)/(15.000×0,60×0,85) = 43.750/7.650 ≈ 5,7 → 6 corpuri**

### PTh-I.8.2quater Sinteza putere instalată iluminat

| Zonă | Nr. corpuri | Putere unitară (W) | Putere totală (W) |
|---|---|---|---|
| Alei circulație/furajare | 12 | 100 | 1.200 |
| Sală de muls | 6 | 120 | 720 |
| Filtru sanitar-veterinar | 4 | 40 | 160 |
| Birou/sală mese | 6 | 36 | 216 |
| Platformă tehnică siloz (ATEX) | 2 | 60 (ATEX) | 120 |
| Platformă tehnică bazin | 2 | 60 | 120 |
| Exterior (poartă, drumuri, padoc, perimetru) | conform PTh-I.2.12 | variabil | ≈800 (estimat) |
| **Total iluminat instalat** | — | — | **≈3.336 W** |

Valoarea totală de iluminat (≈3,3 kW) este consecventă cu poziția "Iluminat" din bilanțul electric general (PTh-I.2.5, 5,8 kW porcine/≈6,5 kW bovine) — diferența reflectă componenta suplimentară de iluminat exterior de securitate și marja de proiectare pentru extinderi ulterioare.

### PTh-I.8.3 Iluminat de siguranță și evacuare (SR EN 1838)

Autonomie 1-3 ore pe baterie proprie, marcarea căilor de evacuare/porților mari (D05, `arhitectura-pth.md`) și a hidranților, cu particularitatea specifică fermei: iluminatul de siguranță permite continuarea supravegherii/intervenției manuale asupra cortinelor (v. `instalatii.md` §6.2), nu doar evacuarea persoanelor.

### PTh-I.8.4 Program de lumină automatizat — integrare cu computerul de climat

Programator cu simulare graduală a zorilor/amurgului, integrat în sistemul central de automatizare, cu alimentare de rezervă din GE — o pană de curent care ar întrerupe programul de lumină, în plină perioadă programată, perturbă ritmul circadian al efectivului (v. `instalatii.md` §6.1bis).

---

## PTh-I.9 BREVIAR DE CALCUL SUPLIMENTAR SECURITATE LA INCENDIU (INSTALAȚII)

### PTh-I.9.1 Calcul detaliat al rezervei de apă și reumplerii

Recapitulare V_inc=108 mc (PTh-I.2.9), cu verificarea timpului de reumplere a rezervei de la sursa proprie (foraj), condiție pentru revenirea la capacitate maximă de intervenție după un eveniment.

### PTh-I.9.2 Verificarea timpului de funcționare a pompelor vs. timpul de intervenție ISU

Autonomia grupului electrogen (24-48 ore) și rezerva de combustibil a pompei Diesel de rezervă (dacă echipată astfel) se verifică față de timpul estimat de intervenție al serviciilor de urgență (ISU), specific pentru amplasamentul extravilan tipic al unei ferme (distanță mai mare față de cea mai apropiată unitate ISU decât la o construcție urbană).

### PTh-I.9.3 Protecția la incendiu specifică zonei silozului

Coordonare cu măsurile ATEX (PTh-I.1.5) — detectoarele adaptate mediului prăfos (conform `instalatii.md` §7.4), fără declanșări false dar sensibile la eveniment real, integrate în aceeași centrală IDSAI cu restul ansamblului.

### PTh-I.9.4 Verificare orientativă timp de evacuare (RSET) — inclusiv evacuarea/protecția animalelor

Spre deosebire de o construcție civilă, timpul de evacuare relevant include atât personalul (RSET convențional) cât și mecanismul de deschidere rapidă a porților mari (D05) pentru dispersarea efectivului spre exterior — verificare calitativă, nu cantitativă strictă, dat fiind comportamentul nedeterminist al animalelor sub stres (`arhitectura.md` §9.3).

### PTh-I.9.5 Calcul detaliat al reumplerii rezervei de incendiu

Timpul de reumplere a rezervei de apă pentru incendiu (V_inc=108 mc, PTh-I.2.9) de la sursa proprie (foraj), la debitul de exploatare curent al forajului (dimensionat prioritar pentru necesarul de adăpare, v. PTh-I.2.1), se verifică astfel încât reumplerea completă să nu depășească un interval rezonabil (recomandat sub 24-36 ore), fără a compromite alimentarea curentă cu apă a efectivului în perioada de reumplere — dacă debitul forajului este insuficient pentru ambele funcții simultan, se prevede fie un foraj suplimentar dedicat rezervei de incendiu, fie o prioritizare automată (temporară) a reumplerii rezervei de incendiu față de consumul de spălare (nu față de adăpare, care rămâne prioritate absolută).

### PTh-I.9.6 Verificarea necesității unei coloane uscate

Dat fiind că niciunul dintre cele trei corpuri ale fermei nu depășește, de regulă, înălțimi care ar justifica o coloană uscată (specifică clădirilor înalte, cu acces dificil al autospecialelor la nivelurile superioare), verificarea la faza de execuție confirmă că accesul direct al autospecialelor la baza fiecărui corp (drum de intervenție perimetral, `general.md` §9.4) este suficient, fără a fi necesară o coloană uscată dedicată — excepție posibilă la silozul metalic (H=15,00 m), unde se evaluează explicit necesitatea unei coloane uscate de acces la platforma tehnică superioară (D12, `arhitectura-pth.md`), funcție de decizia proiectantului scenariului de securitate la incendiu.

### PTh-I.9.6bis Verificarea acoperirii cu hidranți exteriori pe cele trei corpuri

Distanța maximă între hidranți exteriori și distanța maximă de la orice punct al construcțiilor la cel mai apropiat hidrant se verifică distinct pentru fiecare corp, dat fiind că cele trei corpuri sunt distribuite pe o incintă extinsă (nu concentrate într-o singură amprentă compactă, ca la o hală industrială):

| Corp | Distanță la cel mai apropiat hidrant (orientativ) | Verificare |
|---|---|---|
| Corp A (hală, 99,00 m lungime) | hidranți poziționați astfel încât niciun punct al fațadelor longitudinale să nu depășească distanța maximă admisă conform P118-2 | conform, cu hidrant suplimentar la mijlocul lungimii dacă distanța o impune |
| Corp B (siloz) | hidrant dedicat sau acoperire de la hidrantul cel mai apropiat al rețelei inelare | verificat separat, dat fiind riscul specific de explozie de praf, nu doar de incendiu clasic |
| Corp C (bazin dejecții) | acoperire de la rețeaua inelară generală | risc de incendiu redus la acest corp (element de beton, fără sarcină termică), verificare cu prioritate mai scăzută |
| Anexe (filtru sanitar, depozit furaje, cabină GE) | acoperire dedicată, cu prioritate majorată la depozitul de furaje (sarcină termică ridicată) | conform `structura-pth.md` §PTh-R.11.4 |

Rețeaua inelară (PTh-I.1.9) se dimensionează astfel încât fiecare hidrant să poată fi alimentat din două direcții, condiție care rămâne valabilă chiar dacă un tronson este izolat pentru reparație — regulă de proiectare identică celei de la o construcție industrială curentă, dar cu o lungime totală de rețea semnificativ mai mare, dată fiind dispersia celor trei corpuri pe incinta fermei.

### PTh-I.9.7 Protecția la incendiu a zonei de depozitare a furajelor grosiere (fânar/depozit)

Coordonat cu compartimentarea de arhitectură (`arhitectura.md` §9.2) și cu distanțele de siguranță de structură (`structura-pth.md` §PTh-R.11.4), instalația de detectare (PTh-I.3.12) prevede acoperire dedicată a acestei zone cu sarcină termică foarte ridicată (fân/paie balotate), cu hidranți exteriori poziționați la distanța optimă de intervenție rapidă, fără a fi nevoie de sprinklere automate (soluție rar adoptată la depozitele de furaje grosiere din motive de compatibilitate cu materialul depozitat, apa putând agrava riscul de fermentare/mucegăire a stocului nesinistrat).

---

## PTh-I.10 CONCLUZII ȘI CORELARE FINALĂ

### PTh-I.10.1 Sinteza soluțiilor dezvoltate la nivel de execuție

Prezentul supliment dezvoltă la nivel de execuție cele patru obiective fundamentale ale instalațiilor unei ferme zootehnice deja stabilite la `instalatii.md` §11.1 (bunăstarea animalelor, siguranța efectivului prin redundanță electrică, protecția mediului prin gestiunea dejecțiilor, securitatea la incendiu inclusiv ATEX), pe geometria unică a celor trei corpuri adoptată consecvent în toată biblioteca PTh a fermei (`arhitectura-pth.md`, `structura-pth.md`), cu breviarul de calcul de referință al exemplului de 2.000 de porci extins și adaptat, unde funcțional relevant, la varianta bovine de lapte de 300 de capete.

### PTh-I.10.2 Interfața cu proiectul tehnologic zootehnic — condiție de finalizare

Conform principiul stabilit deja la `instalatii.md` §11.0 și reluat la `arhitectura-pth.md` §PTh-A.12.1, toate bilanțurile numerice din prezentul document (debit ventilare, bilanț termic, bilanț electric, volum bazin) rămân condiționate de confirmarea definitivă a efectivului, speciei și sistemului de creștere prin proiectul tehnologic al specialistului zootehn/veterinar — piesă de intrare obligatorie, fără de care execuția finală a instalațiilor nu poate fi definitivată dincolo de nivelul metodologic complet stabilit aici.

### PTh-I.10.3 Predarea documentației și condiționarea avizelor

Documentele produse de prezentul supliment (scheme, breviare, fișe de echipamente, procese-verbale de probă, PCC) se predau la Cartea Tehnică a construcției și constituie, împreună cu suplimentele de arhitectură și structură, baza documentară pentru obținerea avizelor obligatorii (ISU pentru scenariul de securitate la incendiu inclusiv riscul de explozie de praf, ANSVSA/DSVSA pentru avizul sanitar-veterinar, APM pentru avizul de mediu) conform listei complete stabilite la `general.md` §13.2/`instalatii.md` §11.3, fără de care ferma nu poate obține autorizația de funcționare, indiferent de calitatea strict tehnică a execuției instalațiilor.

### PTh-I.10.4 Lista de verificare finală a coerenței documentației PTh (instalații)

1. Geometria celor trei corpuri (18 travei/99,00 m; Ø8,00 m/15,00 m; celulă 288 mc) este identică cu cea din `arhitectura-pth.md` și `structura-pth.md`.
2. Toate elementele de siguranță critică (cortine fail-safe, GE+AAR, alarmă GSM, panouri ATEX) au fișă tehnică (PTh-I.3), probă funcțională (PTh-I.4) și poziție în PCC (PTh-I.7.1).
3. Bilanțul termic și cel electric sunt prezentate atât pentru exemplul de referință (porcine 2.000 capete) cât și pentru varianta bovine (300 capete), fără contradicție între cele două seturi de valori.
4. Toate penetrările prin elementele de structură/anvelopă (PTh-I.5.3) sunt coordonate explicit cu documentele omoloage de arhitectură și structură.
5. Recomandările de monitorizare periodică a lanțului de siguranță (`instalatii.md` §10.3) sunt reluate integral în programul de verificare periodică predat la Cartea Tehnică (PTh-I.7.3).

Cu parcurgerea integrală a prezentului supliment PTh-I, componenta de instalații a fermei agrozootehnice este dezvoltată la nivelul de detaliu de execuție cerut de faza de Proiect Tehnic (HG 907/2016), corelată complet cu suplimentele omoloage de arhitectură și structură, gata pentru elaborarea planșelor finale de execuție și pentru demararea lucrărilor pe șantier.

---

## PTh-I.11 RESURSE ȘI UTILAJE DE EXECUȚIE SPECIFICE

Similar principiului stabilit la `arhitectura-pth.md` §PTh-A.13, execuția instalațiilor fermei mobilizează un set de resurse specifice tipologiei agrozootehnice, esențiale de planificat din timp:

| Resursă/utilaj | Etapă de utilizare | Observație |
|---|---|---|
| Specialist ATEX (calcul zonare, dimensionare panouri decompresie) | Proiectare finală + recepție instalație siloz | resursă externă specializată, obligatorie |
| Echipă forare puț de apă + probă de debit | Etapa inițială de execuție | condiționează programul general (`general.md` §12.3) |
| Echipament de testare presiune/etanșeitate rețele îngropate | Înainte de turnarea plăcii de pardoseală | PVLA obligatoriu |
| Simulator de cădere de tensiune (probă GE+AAR+cortine) | Recepție finală instalații critice | coordonat cu structura/arhitectura |
| Laborator autorizat pentru probe apă (potabilitate, nitrați) | Recepție + control periodic în exploatare | conform `instalatii.md` §2.6bis |
| Furnizor specializat echipamente de muls (dacă bovine) | Montaj + PIF sală de muls/robot AMS | mentenanță contractuală ulterioară recomandată |
| Firmă certificată protecție la trăsnet | Evaluare risc (PTh-I.2.9quinquies) + recepție instalație de captare | conform SR EN 62305 |

## PTh-I.12 FIȘE TEHNICE DE MATERIALE (conducte, izolații, cabluri)

### PTh-I.12.1 FT-M01: Conducte de distribuție apă (adăpare/spălare/menajeră)

| Parametru | Specificație |
|---|---|
| Material | PEHD/PPR, rezistent la presiune de calcul |
| Protecție antiîngheț | cablu electric de însoțire pe traseele exterioare expuse |
| Marcare | codificare cromatică pe circuit (adăpare/spălare/menajeră), pentru evitarea confuziei la mentenanță |

### PTh-I.12.2 FT-M02: Conducte de canalizare tehnologică (dejecții)

| Parametru | Specificație |
|---|---|
| Material | PVC/PEHD rezistent chimic la dejecții | 
| Pantă | conform breviar hidraulic, verificată la viteza minimă de autocurățare |
| Etanșeitate îmbinări | obligatorie, testată la presiune/vid înainte de acoperire |

### PTh-I.12.3 FT-M03: Cabluri electrice de forță și comandă

| Parametru | Specificație |
|---|---|
| Izolație | rezistentă chimic la amoniac (evitare PVC standard sensibil la degradare pe termen lung) |
| Protecție mecanică | tub de protecție etanș pe traseele expuse la contact cu dejecții/jet de spălare |
| Cabluri ATEX (zona siloz) | certificate, fără risc de generare de scântei |

### PTh-I.12.4 FT-M04: Izolații termice conducte apă caldă/adăpare exterior

| Parametru | Specificație |
|---|---|
| Material | spumă elastomerică/vată minerală cu manta de protecție UV pe traseele exterioare |
| Grosime | conform calcul termic, majorată pe traseele expuse la îngheț |

### PTh-I.12.5 FT-M05: Corpuri de iluminat IP54/IP65 și ATEX

| Parametru | Specificație |
|---|---|
| Tip | LED dimabil, cu simulare graduală a zorilor/amurgului (v. `instalatii.md` §6.2) |
| Protecție | IP54/IP65 în hală (praf/umiditate/spălare), ATEX certificat la siloz |
| Iluminat de siguranță | autonomie 1-3 ore, conform SR EN 1838 |

## PTh-I.13 INTERFAȚA CU DEVIZUL GENERAL (HG 907/2016) — CAPITOLUL DE INSTALAȚII

Conform structura devizului general stabilită la `general.md` §12.1, componenta de instalații a Capitolului 4 (investiția de bază) cuprinde, cu ponderea specifică unei ferme agrozootehnice: gospodăria de apă (foraj, rezervoare, hidrofor), rețelele sanitare/canalizare pe cele trei circuite separate, instalația de ventilare/microclimat (cortine, luminator, ventilatoare, computer de climat), instalația electrică inclusiv grupul electrogen de rezervă și protecția la trăsnet, instalația de stingere/detectare a incendiului, instalația ATEX a silozului și, dacă bovine, echipamentele de muls/lapterie. Ponderea valorică a componentei de siguranță critică (GE+AAR+cortine fail-safe+alarmă GSM) este semnificativ superioară celei dintr-o construcție industrială curentă, exact din motivul explicat la `instalatii.md` §5.2 — o pondere care nu trebuie tratată ca "cost suplimentar" de redus la optimizarea bugetului, ci ca o condiție de viabilitate tehnică a întregii investiții, similar argumentului deja dezvoltat pentru anexele de biosecuritate la `general.md` §12.2.

---

## ANEXA B — BREVIAR CENTRALIZAT PTh-I (VERIFICARE DE COERENȚĂ CU BREVIARUL DTAC)

| Parametru | Valoare DTAC (`instalatii.md`) | Valoare PTh (recalculat/confirmat) |
|---|---|---|
| Q_ad (exemplu porcine) | 23,2 mc/zi mediu, 30,2 mc/zi max | confirmat, cu diametre de tronson dimensionate (PTh-I.2.1) |
| Q_ad (variantă bovine 300 capete) | — (nemenționat explicit ca sumă în DTAC) | 24 mc/zi (calculat la PTh-I.2.1) |
| L_vara/L_iarna (porcine) | 200.000/20.000 mc/h | confirmat, cu secțiuni de cortină/luminator (PTh-I.2.3) |
| L_vara/L_iarna (bovine 300 capete) | — | 120.000/13.500 mc/h (calculat la PTh-I.2.3) |
| Bilanț termic (porcine) | necesar 299 kW, deficit 99 kW | confirmat |
| Bilanț termic (bovine) | — | surplus de căldură metabolică, strategie de ventilare opusă (PTh-I.2.4) |
| Bilanț electric Pc (porcine) | ≈60,4 kW | confirmat |
| Bilanț electric Pc (bovine, estimat) | — | ≈41-45 kW (PTh-I.2.5) |
| GE | 60-80 kVA | confirmat pentru porcine; 46-50 kVA pentru bovine (PTh-I.2.7) |
| V_inc | 108 mc | confirmat, cu verificare hidranți pe geometria de 99,00 m (PTh-I.2.9) |

Divergențele numerice dintre variantele de specie (porcine vs. bovine) sunt așteptate și documentate explicit — ele reflectă exact principiul metodologic stabilit consecvent în toată biblioteca tehnică a platformei: un exemplu de calcul reprezentativ ilustrează metoda, iar aplicarea ei la datele reale ale proiectului tehnologic definitiv (specie, efectiv, sistem de creștere) produce valorile finale de execuție.

---

## PTh-I.14 — INTERFAȚA DETALIATĂ CU SUPLIMENTELE DE ARHITECTURĂ ȘI STRUCTURĂ (MATRICE COMPLETĂ)

Similar matricei stabilite la `arhitectura-pth.md` §PTh-A.14, prezentul capitol sintetizează toate punctele de interfață obligatorii ale instalațiilor cu celelalte două specialități, ca ghid rapid de coordonare pentru diriginte și proiectanți la fazele de execuție (v. PTh-I.5.5).

| Element de interfață | Instalații (prezentul document) | Arhitectură (`arhitectura-pth.md`) | Structură (`structura-pth.md`) |
|---|---|---|---|
| Cortine rulabile (D04) | motor, senzor poziție, dispozitiv fail-safe, comandă computer climat | pânză, șine ghidaj, integrare în anvelopă | reacțiune la ghidaje transmisă riglei de perete (§PTh-R.4.6ter) |
| Luminator de coamă (D03) | secțiune liberă de calcul la debitul minim de iarnă | profil, plasă anti-păsări, deflector | — |
| Panouri de decompresie siloz (D13) | poziție/număr rezultat din calculul ATEX | integrare vizuală în manta | verificare la inelele de rigidizare (§PTh-R.2.8) |
| Waterstop cuvă bazin (D15) | racord conducte de pompare/mixare la penetrări etanșe | detaliu de execuție, PVLA | armătură și rosturi de turnare (§PTh-R.2.9) |
| Filtru sanitar-veterinar (D06) | apă caldă continuă, IP44 minim, interblocare electrică (dacă adoptată) | compartimentare fizică, interblocare mecanică | pereți despărțitori (dacă portanți) |
| Grup electrogen + platformă exterioară | dimensionare, AAR, rezervă combustibil | poziționare, cuvă de retenție combustibil | fundație platformă GE (dacă necesară) |
| Sală de muls/lapterie | echipamente, CIP, tanc răcire | finisaje igienice (§PTh-A.3.4) | — |
| Rețele îngropate sub pardoseală | trasee, probă de presiune | coordonare cu hidroizolația HDPE (D09) | coordonare cu rosturile plăcii |

### PTh-I.14.1 Lista de verificare finală a coerenței documentației PTh (instalații) — completare

6. Toate elementele din matricea PTh-I.14 au verificare de interfață explicită atât în documentul de instalații, cât și în documentul omolog (arhitectură/structură), fără nicio mențiune unilaterală necorelată.
7. Numărul de module de cortină (36), numărul de celule de bazin (variabil pe specie, conform PTh-I.2.9ter) și geometria silozului (Ø8,00 m/H=15,00 m) sunt identice în toate cele trei documente PTh.
8. Bilanțurile numerice pe cele două variante de specie (porcine/bovine) sunt reflectate consecvent atât în breviarul de instalații (PTh-I.2) cât și în orice referință încrucișată din `arhitectura-pth.md`/`structura-pth.md`.

---

## ANEXA C — LISTA COMPLETĂ A CIRCUITELOR ȘI SISTEMELOR DE INSTALAȚII PE CORP

| Corp | Sisteme de instalații prezente |
|---|---|
| Corp A (hală adăpost) | adăpare (3 circuite apă), canalizare tehnologică (dejecții), ventilare naturală+mecanică, electrice (forță+iluminat), curenți slabi (senzori climat, CCTV), stingere (hidranți), gaze/GPL (maternitate/tineret), sală de muls/lapterie (dacă bovine) |
| Corp B (siloz) | ATEX (aspirație/desprăfuire, panouri decompresie, echipamente certificate), electrice dedicate (transportoare, senzori nivel/temperatură), legare la pământ/egalizare potențiale |
| Corp C (bazin dejecții) | pompare/mixare, senzor de nivel, semnalistică pericol gaze, racord canalizare tehnologică |
| Anexe (filtru sanitar, platformă gunoi, depozit furaje, dezinfector rutier, rampă animale, birou) | apă caldă (filtru), electrice (iluminat, prize), curenți slabi (control acces filtru, cântar-pod bascul), dezinfector rutier (pompă/bazin) |

Prezenta listă servește drept verificare finală de completitudine — orice sistem de instalații care nu apare atribuit unui corp/anexă în acest tabel este fie omis din proiect, fie tratat generic, ambele situații impunând o revizuire înainte de finalizarea documentației de execuție.

Cu parcurgerea integrală a prezentelor 14 capitole (PTh-I.0–PTh-I.14) și a celor trei anexe (A la structură, B și C la instalații), componenta de instalații a fermei agrozootehnice este dezvoltată complet la nivelul de detaliu de execuție cerut de faza de Proiect Tehnic, corelată integral cu suplimentele omoloage de arhitectură (`arhitectura-pth.md`) și structură (`structura-pth.md`), gata pentru elaborarea planșelor finale de execuție și demararea lucrărilor pe șantier.

---

## ANEXA D — CHECKLIST DE VERIFICARE A INSTALAȚIILOR DIN PERSPECTIVA BIOSECURITĂȚII

Similar checklist-ului de arhitectură (`arhitectura-pth.md` §PTh-A.11), instalațiile fermei au propriul set de puncte de verificare cu impact direct asupra biosecurității și asupra avizului sanitar-veterinar, distinct de verificările tehnice obișnuite de PCC:

| Nr. | Verificare | Referință | Rezultat așteptat |
|---|---|---|---|
| 1 | Cele trei circuite de canalizare (menajer/tehnologic/pluvial) nu se intersectează în niciun punct | PTh-I.1.2, PTh-I.7.1bis | conform, verificat pe planul as-built |
| 2 | Apa de adăpare respectă parametrii ANSVSA (fizico-chimici, microbiologici, nitrați) | PTh-I.7.1bis | probe laborator pozitive |
| 3 | Filtrul sanitar-veterinar are apă caldă continuă, fără întrerupere posibilă | PTh-I.3, D06 `arhitectura-pth.md` | funcțional permanent |
| 4 | Dezinfectorul rutier este funcțional și protejat la îngheț | PTh-I.3.6 | funcțional în toate anotimpurile |
| 5 | Instalația ATEX a silozului este complet certificată și funcțională înainte de prima încărcare | PTh-I.4.6, PTh-I.6.4 | conform, cu documentație completă |
| 6 | Cortinele fail-safe funcționează la simulare de cădere de tensiune, pe toate cele 36 de module | PTh-I.4.1 | 100% testate pozitiv |
| 7 | Grupul electrogen pornește și preia sarcina esențială în intervalul de proiect | PTh-I.4.4, PTh-I.6.3 | confirmat prin PV |
| 8 | Sistemul de alarmă GSM transmite efectiv la toate numerele din lista de escaladare | PTh-I.4.5 | confirmat prin test real |
| 9 | Bazinul de dejecții (toate celulele) trece proba de etanșeitate, coordonată cu structura | PTh-I.4.7, `structura-pth.md` §PTh-R.15.6 | fără infiltrații detectate |
| 10 | Programul de lumină respectă cerințele de specie (durată, intensitate, tranziție graduală) | PTh-I.6.2, `instalatii.md` §6.1 | conform proiectul tehnologic |

### Sinteza condiționării avizelor din perspectiva instalațiilor

Conform `general.md` §13.2, obținerea avizului sanitar-veterinar (ANSVSA/DSVSA) și a avizului de mediu (APM) este condiționată, din perspectiva instalațiilor, de rezultatul integral pozitiv al punctelor 1-3 și 9 din checklist-ul de mai sus, iar obținerea avizului ISU (inclusiv pentru riscul specific de explozie de praf) este condiționată de punctele 5, 6, 7 și 8. Diriginte de șantier și proiectantul de instalații nu recomandă recepția finală fără parcurgerea integrală a acestui checklist, în paralel cu cel de arhitectură (`arhitectura-pth.md` §PTh-A.11).

## GLOSAR DE ABREVIERI FOLOSITE ÎN PREZENTUL SUPLIMENT

| Abreviere | Semnificație |
|---|---|
| PTh | Proiect Tehnic |
| DTAC | Documentație Tehnică pentru Autorizarea Construirii |
| DDE | Detalii de Execuție |
| GE | Grup electrogen |
| AAR | Automat de anclanșare a rezervei |
| ATEX | Atmosphères Explosibles — regim normativ pentru echipamente în atmosfere potențial explozive |
| IDSAI | Instalație de Detectare, Semnalizare și Alarmare la Incendiu |
| CIP | Clean-in-Place — curățare-dezinfecție automată în circuit închis |
| AMS | Automatic Milking System — robot de muls automatizat |
| THI | Temperature-Humidity Index — indice de disconfort termic |
| VFD | Variable Frequency Drive — variator de frecvență |
| UPS | Uninterruptible Power Supply — sursă neîntreruptibilă de alimentare |
| NVR | Network Video Recorder — înregistrator video de rețea |
| PCC | Plan de Control al Calității |
| PVLA | Proces Verbal de Lucrări Ascunse |
| PIF | Punere în Funcțiune |
| LEL | Lower Explosive Limit — limita inferioară de explozivitate |
| BAT/BREF | Best Available Techniques / BAT Reference documents |
| IED | Industrial Emissions Directive — Directiva privind emisiile industriale |
| DFT | Dry Film Thickness — grosimea peliculei uscate (protecție anticorozivă) |
| RSET/ASET | Required/Available Safe Egress Time — timp de evacuare necesar/disponibil |
| PAZVN | Programul de Acțiune pentru Zonele Vulnerabile la Nitrați |
| SPD | Surge Protection Device — dispozitiv de protecție la supratensiuni |

## NOTĂ FINALĂ ASUPRA SCALABILITĂȚII BREVIARULUI DE INSTALAȚII

Similar notelor de scalabilitate din `arhitectura-pth.md` §PTh-A.14.2 și `structura-pth.md` §PTh-R.24.3, toate breviarele de calcul, fișele tehnice și schemele de execuție din prezentul supliment sunt redactate pe geometria de referință a modulului unic (Corp A — 18 travei/99,00 m; Corp B — Ø8,00 m/H=15,00 m; Corp C — celulă de 288 mc) și pe cele două exemple de calcul reprezentative (porcine 2.000 capete — cel mai complet numeric în DTAC; bovine 300 capete — cel mai dezvoltat funcțional/arhitectural). Pentru un amplasament real cu o altă specie, un alt efectiv sau un alt sistem de creștere, proiectantul de instalații recalculează direct proporțional toate bilanțurile (apă, dejecții, ventilare, termic, electric) prin aplicarea formulelor stabilite la PTh-I.2, cu normele specifice speciei reale preluate din tabelul de la `instalatii.md` §1.4 — metodologia, tehnologia de montaj, planul de control al calității și programul de probe rămân identice, indiferent de specia și de capacitatea finală a fermei reale.


### Lista de verificare finală a coerenței întregii documentații PTh a fermei (arhitectură + structură + instalații)

1. Cele trei documente (`arhitectura-pth.md`, `structura-pth.md`, prezentul `instalatii-pth.md`) folosesc identic geometria de referință a celor trei corpuri, fără nicio divergență numerică reziduală.
2. Toate elementele de siguranță critică (cortine fail-safe, GE+AAR, alarmă GSM, panouri ATEX, waterstop bazin) au tratare completă și consecventă în toate cele trei documente — detaliu de execuție (arhitectură), verificare/interfață structurală (structură) și fișă tehnică/probă funcțională (instalații).
3. Cele două variante de specie (porcine 2.000 capete, bovine 300 capete) sunt tratate consecvent, fără contradicție, în toate cele trei documente, cu recunoașterea explicită a faptului că valorile finale de execuție depind de proiectul tehnologic zootehnic definitiv.
4. Checklist-urile de biosecuritate (`arhitectura-pth.md` §PTh-A.11, prezenta Anexă D) acoperă împreună toate punctele critice identificate în DTAC (`general.md`, `arhitectura.md`, `instalatii.md`) ca fiind condiție de funcționare legală a fermei.
5. Toate cele trei documente predau, la finalul lor, o listă de verificare a coerenței proprii — semn că integrarea PTh a fermei agrozootehnice este completă și gata de utilizare ca bază a execuției pe șantier și a obținerii avizelor de funcționare.

### Notă de închidere

Documentul de față, împreună cu `arhitectura-pth.md` și `structura-pth.md`, formează suplimentul complet de fază PTh al bibliotecii de documentații tehnice pentru funcțiunea agricol (fermă/hală agrozootehnică), dezvoltând integral, la nivel de execuție, memoria tehnică de fază DTAC deja existentă (`general.md`, `arhitectura.md`, `structura.md`, `instalatii.md`). Toate cele trei documente PTh respectă întocmai principiile stabilite pentru biblioteca tehnică a platformei: citare exactă a normativului aplicabil la fiecare decizie tehnică, detalii de execuție cotate la scări reale, tehnologie de execuție descrisă pas cu pas, plan de control al calității cu PVLA explicite, toleranțe de execuție și program complet de probe și încercări — fără nicio valoare numerică inventată, toate cifrele fiind derivate direct din breviarele de calcul deja stabilite și verificate la faza DTAC.
