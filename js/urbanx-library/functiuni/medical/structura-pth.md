## PTh-R.1 — OBIECTUL SUPLIMENTULUI DE FAZĂ PTh (REZISTENȚĂ) ȘI CORELAREA CU DTAC

### PTh-R.1.1 Obiectul și limitele documentului

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție) la Memoriul de rezistență DTAC al aceleiași documentații (`structura.md`), elaborat conform **HG 907/2016** privind etapele de elaborare a documentațiilor tehnico-economice, pentru unitatea medicală (spital privat / clinică multifuncțională) cu bloc operator, terapie intensivă (ATI) și departament de imagistică, regim de înălțime **S+P+4E**, **90 de paturi** (80 spitalizare + 10 ATI), **categorie de importanță A** (importanță excepțională, HG 766/1997, justificată integral la cap. 1.4 din `general.md`) și **clasă de importanță și expunere seismică I** (`γI,e = 1,40`, P100-1/2013), grad de rezistență la foc **I**.

Documentul **NU reia** breviarul de predimensionare al DTAC — modelul de calcul spațial, analiza modală, spectrul de proiectare, evaluarea forței seismice de bază (`Fb = 13.500 kN`), verificările de interacțiune N-M ale elementelor, verificarea drift-ului la SLS/ULS și verificarea de vibrații a planșeului de imagistică rămân integral cele stabilite în `structura.md` (cap. 1-18), la care se face trimitere explicită, fără duplicare. Ceea ce prezentul supliment adaugă este **nivelul de detaliere necesar execuției efective în șantier**: secvența și tehnologia de execuție a infrastructurii și a suprastructurii, hidroizolația cuvei etanșe, detaliile de armare la noduri critice puse în operă, coordonarea structurală cu rețeaua de gaze medicale și cu echipamentele medicale grele, toleranțele de execuție, planul de control al calității cu punctele de verificare a lucrărilor ascunse (PVLA), fazele determinante și corelarea cu arhitectura și cu instalațiile — toate cerute de trecerea de la faza de predimensionare/verificare (DTAC) la faza de execuție propriu-zisă (PT + DE).

Documentul nu se suprapune nici cu memoriul general (`general.md` — încadrare, temă, circuite funcționale), nici cu memoriul de arhitectură (compartimentare, finisaje, accesibilitate), nici cu memoriul de instalații și cu suplimentul său de fază PTh (`instalatii-pth.md`, în aceeași convenție de bibliotecă, document distinct — dimensionarea exactă a debitelor, presiunilor și traseelor de gaze medicale, HVAC de presiune controlată și electrice), nici cu studiul de siguranță la incendiu (scenariul complet de evacuare orizontală pe compartimente și clasele de rezistență la foc ale compartimentărilor). Fiecare intersecție cu aceste documente este tratată aici **exclusiv din perspectiva structurii** — coordonarea geometrică și de execuție a golurilor, a supraîncărcărilor locale și a compartimentărilor —, cu trimitere la documentul de specialitate pentru dimensionarea proprie a fiecărei instalații sau finisaj.

### PTh-R.1.2 Structura capitolelor prezentului supliment

| Capitol | Conținut |
|---|---|
| PTh-R.2 | Execuția infrastructurii: trasare, săpătură, sprijiniri și radier general |
| PTh-R.3 | Hidroizolația cuvei etanșe a subsolului tehnic |
| PTh-R.4 | Execuția suprastructurii: cadre, pereți structurali și planșee |
| PTh-R.5 | Rosturi de dilatare/seismice — justificarea absenței și tratarea retragerii de volum |
| PTh-R.6 | Detalii de armare la noduri critice — execuție |
| PTh-R.7 | Coordonarea structurală cu rețeaua de gaze medicale |
| PTh-R.8 | Fundații și planșee supradimensionate local pentru echipamente medicale grele |
| PTh-R.9 | Controlul vibrațiilor planșeelor la sălile de operație și imagistică — execuție |
| PTh-R.10 | Execuția pentru clasa de importanță I / categoria A: regularitate, control sporit, urmărire specială |
| PTh-R.11 | Toleranțe de execuție |
| PTh-R.12 | Planul de control al calității (PVLA — puncte de verificare a lucrărilor ascunse) |
| PTh-R.13 | Faze determinante |
| PTh-R.14 | Corelarea cu arhitectura și cu instalațiile |
| PTh-R.15 | Organizarea execuției și extras orientativ de cantități |
| PTh-R.16 | Recapitulare finală, checklist PTh și concluzie inginerească |

### PTh-R.1.3 Date generale de proiectare — recapitulare din DTAC (fără recalculare)

| Parametru | Valoare | Sursă (DTAC) |
|---|---|---|
| Regim de înălțime | S+P+4E (6 niveluri) | `general.md` §1.1, `structura.md` §1.2 |
| Dimensiuni în plan, etaj curent (ax-ax) | 42,00 × 24,00 m | `structura.md` §1.2 |
| Trama structurală | 7,20 × 7,20 m curent; 8,10 m la traveea blocului operator | `structura.md` §1.2, §4.3 |
| Categoria de importanță (HG 766/1997) | **A** — importanță excepțională | `general.md` §1.4 |
| Clasa de importanță și expunere seismică (P100-1) | **I**, γI,e = 1,40 | `general.md` §6.5, `structura.md` §2 |
| Gradul de rezistență la foc | I | `general.md` §14.1 |
| Sistem structural | Dual, beton armat monolit, pereți predominanți (~72% din tăietoarea de bază) | `structura.md` §4 |
| Beton | C30/37 (radier, pereți/planșee etaje curente); C35/45 (stâlpi subsol/parter, zone critice pereți la bază) | `structura.md` §6.1 |
| Oțel-beton | BST500C, clasa de ductilitate C | `structura.md` §6.2 |
| Factor de comportare q | 3,50 (adoptat conservator, DCM) | `structura.md` §5.5 |
| Stâlpi | 60×60 cm etaje curente; 70×70 cm subsol/parter | `structura.md` §4.3 |
| Pereți structurali/nuclee | 30 cm etaje curente; 40 cm subsol | `structura.md` §4.3 |
| Grinzi | principale 30×65 cm; secundare 25×55 cm | `structura.md` §4.3 |
| Planșeu | 15 cm curent; 18 cm bloc operator; 25-30 cm imagistică | `structura.md` §4.3, §10 |
| Radier general | 90 cm curent, 120-150 cm sub pereți/nuclee; cotă fund radier −4,25 m | `structura.md` §13.2, §14.2 |
| Nivel hidrostatic (NH) | −3,00 m (deasupra cotei de fundare) | `structura.md` §14.3 |
| Categoria geotehnică | 3 (NP 074/2014) | `general.md` §5.4, `structura.md` §14.1 |
| Acoperiri de beton (cnom) | 35 mm elemente curente; 45-50 mm radier/subsol (XC2/XA1) | `structura.md` §6.3 |
| Tasare admisă | s ≤ 3,5 cm; Δs/L ≤ 1/500 (sub RMN: < 1 mm/m) | `structura.md` §14.4 |
| Drift SLS / ULS | 8,8 mm (0,24% h) ≤ 18,0 mm; 17,5 mm ≤ 90 mm | `structura.md` §10 |
| Control execuție | Nivel III (impus de clasa de importanță I) | `structura.md` §2.4, §17.2 |

Toate valorile de mai sus sunt **preluate identic din DTAC**, fără nicio modificare — prezentul supliment nu recalculează geometria, materialele sau forța seismică de bază, ci le duce la nivelul de detaliere necesar punerii în operă. Orice diferență care ar rezulta, la faza PT propriu-zisă, din rularea modelului de calcul definitiv pe geometria exactă a proiectului (de exemplu o ajustare marginală a greutății seismice ca urmare a cantităților reale de armătură) se tratează prin actualizarea breviarului de calcul al `structura.md`, nu prin acest document de execuție.

### PTh-R.1.4 Index de trimiteri încrucișate DTAC ↔ PTh

| Temă | Capitol DTAC (`structura.md`) | Capitol PTh (prezentul document) |
|---|---|---|
| Radier general, dimensionare | §13 | §PTh-R.2, §PTh-R.8 |
| Cuvă etanșă, nivel hidrostatic | §13.1, §14.3 | §PTh-R.3 |
| Sistem dual, continuitate verticală | §4 | §PTh-R.4, §PTh-R.5 |
| Regularitate, factor q | §5 | §PTh-R.10 |
| Zone critice, confinare DCM | §15 | §PTh-R.6 |
| Fundații antivibratile, cușcă Faraday | §13.4, §13.5 | §PTh-R.8 |
| Vibrații imagistică (frecvență proprie, criterii VC) | §12 | §PTh-R.9 |
| Ancorarea seismică a echipamentelor medicale | §16 | §PTh-R.7, §PTh-R.8 |
| Fazele determinante, control calitate | §17 | §PTh-R.11, §PTh-R.12, §PTh-R.13 |

---

## PTh-R.2 — EXECUȚIA INFRASTRUCTURII: TRASARE, SĂPĂTURĂ, SPRIJINIRI ȘI RADIER GENERAL

### PTh-R.2.1 Trasarea și verificarea cotei de fundare

Trasarea axelor structurale (grila 7,20 × 7,20 m, cu extinderea locală la 8,10 m la traveea blocului operator, `structura.md` §1.2) se realizează prin stație totală, cu bornare de referință materializată în afara amprentei de excavație și cu minimum două repere de control independente, verificabile pe toată durata execuției infrastructurii. Cota de fundare a radierului general, **−4,25 m** față de cota ±0,00 a construcției, se confirmă la fața locului prin **verificarea explicită a naturii terenului** de către geotehnician, în contradictoriu cu studiul geotehnic de categorie 3 (`general.md` §5.4): concordanța stratificației reale cu cea de calcul (argilă prăfoasă vârtoasă la suprafață, urmată de nisip îndesat la cota de fundare, `structura.md` §14.2), absența pungilor de teren slab sau a umpluturilor necontrolate pe toată amprenta radierului, și poziția reală a nivelului hidrostatic la data execuției (valoare de calcul −3,00 m, `structura.md` §14.3, care poate varia sezonier și trebuie reconfirmată punctual). Această verificare este, pentru o construcție de categorie geotehnică 3 cu radier de fundare direct, **faza determinantă FD1** (§PTh-R.13), obligatorie înainte de turnarea betonului de egalizare.

Dat fiind că subsolul găzduiește gospodăria de apă, stația de gaze medicale, tablourile electrice generale și grupul electrogen (`general.md` §6.8) — spații care nu admit, prin funcțiune, nicio infiltrație sau tasare ulterioară necontrolată —, cota de fundare confirmată la trasare devine reperul de control pentru toate verificările ulterioare de nivel (§PTh-R.11.3), iar orice abatere constatată față de studiul geotehnic (portanță locală inferioară, pungi de teren compresibil, nivel hidrostatic mai ridicat decât cel de calcul) se comunică imediat proiectantului de structuri și de geotehnică, înainte de continuarea excavației, pentru reevaluarea soluției de fundare (eventuala trecere de la radier general la o soluție cu piloți forați local, opțiune menționată de principiu la `general.md` §5.4).

### PTh-R.2.2 Sprijinirea săpăturii și epuismentul pe durata execuției

Excavația pentru subsolul tehnic, cu adâncime până la cota −4,25 m (plus grosimea radierului și a stratului de egalizare), se execută cu **sprijiniri** dimensionate la împingerea pământului și la sarcinile din vecinătate (`general.md` §10), soluția constructivă (palplanșe, piloți secanți sau perete mulat, funcție de spațiul disponibil la limita de proprietate și de distanța față de vecinătăți) fiind stabilită prin proiectul de organizare a execuției, pe baza parametrilor geotehnici definitivi. Dat fiind că nivelul hidrostatic de calcul (−3,00 m) se situează **deasupra** cotei de fundare (−4,25 m, `structura.md` §14.3), excavația traversează pânza freatică pe ultimul 1,25 m înainte de a atinge cota de fundare, motiv pentru care se prevede un **program de epuisment/drenaj controlat**, activ pe toată durata deschiderii excavației: puțuri de epuisment dispuse perimetral incintei, cu pompe submersibile dimensionate pentru debitul estimat de infiltrație al stratului de nisip îndesat de la cota de fundare, menținute în funcțiune de la deschiderea excavației până la finalizarea radierului și a hidroizolației acestuia (§PTh-R.3).

Monitorizarea deplasărilor sprijinirii și a nivelului apei în incintă se realizează zilnic pe durata acestei faze critice, cu prag de alertă la orice creștere bruscă și neexplicată a nivelului apei (semnal posibil de colmatare a puțurilor de epuisment sau de o cale de infiltrație suplimentară neidentificată de studiul geotehnic) și cu prag de alertă la orice deplasare a sprijinirii care depășește valorile admise de proiectul de organizare a execuției — regim de monitorizare superior celui aplicabil unei excavații obișnuite, justificat de încadrarea amplasamentului în categoria geotehnică 3 (`general.md` §5.4).

### PTh-R.2.3 Cofrarea radierului general

Radierul general, de grosime **90 cm** în câmp curent și majorată local la **120-150 cm** sub pereții structurali și sub cele două nuclee de circulație (`structura.md` §13.2), se cofrează perimetral cu cofraj de margine rigid, rezemat pe stratul de egalizare, cu tratarea explicită, la nivelul cofrajului, a următoarelor puncte singulare: (a) treptele de trecere între zona curentă (90 cm) și zonele îngroșate (120-150 cm), executate cu cofraj în trepte, nu în pantă continuă, pentru a păstra secțiunile de calcul exacte ale benzilor de armătură suplimentară sub pereți/nuclee; (b) poziția golurilor de trecere pentru rețelele care traversează radierul (coloane de gaze medicale, cabluri electrice, conducte sanitare către gospodăria de apă) — pozițiile exacte se preiau din planul de coordonare cu instalațiile (§PTh-R.7.2) și se materializează în cofraj cu manșoane sau doze de trecere, **niciodată prin spargere ulterioară a radierului deja turnat**; (c) poziția reperelor topografice de control al cotei superioare a radierului, menținute vizibile pentru verificarea ulterioară a cotei de nivel (§PTh-R.11.3).

### PTh-R.2.4 Armarea radierului general — execuție

Armarea radierului se pune în operă conform caietului de armare al fazei PT (derivat din principiul stabilit în DTAC, `structura.md` §13.2: **plase Ø20/15 cm, superioare și inferioare**, pe toată suprafața, completate local cu **armătură de străpungere** sub stâlpii și pereții cu reacțiune concentrată mare), cu următoarea secvență de montaj: montarea plasei inferioare pe distanțiere de tip „scaun" din beton sau plastic (nu din metal expus, pentru a evita coridoare de coroziune), calibrate exact pentru acoperirea de 45-50 mm impusă radierului (clase de expunere XC2/XA1, `structura.md` §6.3); montarea armăturii de străpungere (etrieri verticali sau sisteme prefabricate tip stud-rail, dimensionate la faza PT conform verificării de la `structura.md` §13.3) sub stâlpul cel mai solicitat (secțiune 70×70 cm), fixată pe o bandă metalică sau pe un șablon care menține interaxul corect pe perimetrul critic; montarea armăturii suplimentare a benzilor îngroșate sub pereți/nuclee, cu continuitate explicită față de armătura verticală a pereților de subsol care se ridică din radier; montarea plasei superioare pe capre de distanțare (chairs) dimensionate să mențină poziția exactă la cota de proiect pe toată durata betonării; și, în final, montarea manșoanelor/dozelor de trecere a instalațiilor prevăzute la cofraj (§PTh-R.2.3), cu verificarea explicită că poziția acestora **nu intersectează** armătura de străpungere sau banda de armătură suplimentară sub pereți/nuclee (regulă de coordonare detaliată la §PTh-R.7.2).

Verificarea acoperirii minime, prin control cu șablon pe toată suprafața înainte de turnare, constituie punct de control obligatoriu al PVLA (§PTh-R.12), dat fiind rolul dublu al acoperirii la radier: protecția armăturii în clasa de expunere XA1 (agresivitate chimică a apei subterane) și contribuția, prin acoperirea generoasă, la durabilitatea pe termen lung a elementului care formează, împreună cu pereții de subsol, cuva etanșă a spațiilor tehnice critice (§PTh-R.3).

### PTh-R.2.5 Betonarea radierului — secvență, rosturi de lucru, control

Betonarea radierului general se organizează pe zone/travee, dimensionate astfel încât fiecare zonă să poată fi turnată **continuu**, fără întrerupere de peste 2 ore între loturi succesive de beton (limită de reluare a prizei, conform practicii NE 012), cu o atenție specială la zonele îngroșate (120-150 cm sub pereți/nuclee), unde volumul mare de beton pe unitatea de suprafață și densitatea armăturii de străpungere impun un ritm de turnare mai lent și o vibrare mai atentă, pentru a evita segregarea și golurile de compactare (bulgări de aer) la interfața dintre armătura densă și beton. Rosturile de lucru dintre zonele/traveele succesive de turnare se poziționează, pe cât posibil, la mijlocul distanței dintre elementele verticale (departe de zonele de concentrare a eforturilor de la baza pereților/nucleelor și de la stâlpii cu reacțiune concentrată mare), se pregătesc prin curățarea și rugozarea suprafeței de beton întărit (sablare ușoară sau spălare sub presiune imediat înainte de continuarea turnării, pentru asigurarea aderenței), și se prevăd cu **profil waterstop** (§PTh-R.3.3), dat fiind că întregul radier se află sub nivelul hidrostatic de calcul.

Controlul betonului la punerea în operă (test de tasare/slump la fiecare transport pentru zonele îngroșate și armătura densă, prin sondaj pentru zona curentă), prelevarea probelor de rezistență (seturi de cuburi/cilindri, minimum un set per zonă/etapă de turnare, cu verificare `fck` la 28 de zile conform NE 012) și respectarea clasei de expunere adoptate (XC2 + XA1, cu raport A/C ≤ 0,55 și dozaj de ciment ≥ 300 kg/mc, `general.md` §10.1 și `structura.md` §6.4) sunt puncte de control obligatorii, detaliate integral la §PTh-R.10.2 și la planul de control al calității (§PTh-R.12).

### PTh-R.2.6 Verificarea la subpresiune (plutire) pe fazele intermediare de execuție

Nivelul hidrostatic de calcul (−3,00 m) situat deasupra cotei de fundare (−4,25 m, `structura.md` §14.3) generează, la baza radierului, o subpresiune de calcul `u ≈ γw · (4,25 − 3,00) = 10 kN/mc · 1,25 m ≈ 12,5 kPa`, care, aplicată pe amprenta radierului (≈ 1.008 mp, geometria de referință a DTAC, `structura.md` §1.2), rezultă într-o forță de subpresiune totală de ordinul `U ≈ 12,5 · 1.008 ≈ 12.600 kN`. Spre deosebire de construcțiile cu subsoluri adânci și niveluri hidrostatice mult superioare cotei de fundare, la care riscul de plutire pe fazele intermediare de execuție (radier turnat, fără greutatea stabilizatoare a suprastructurii) este critic, la amplasamentul de referință al prezentului spital submersiunea este moderată (1,25 m), iar greutatea proprie a radierului general — grosime medie efectivă de ordinul 1,0-1,1 m pe toată amprenta, dat fiind procentul important de suprafață ocupat de benzile îngroșate de 120-150 cm sub pereți/nuclee — depășește, singură, forța de subpresiune calculată:

`G_radier ≈ 1.008 mp · 1,05 m · 25 kN/mc ≈ 26.460 kN > U ≈ 12.600 kN`, `FS ≈ 2,10`

Această marjă confirmă că, **spre deosebire de construcțiile cu subsol adânc și submersiune mare**, radierul general al acestui spital nu prezintă un risc critic de plutire imediat după turnare — greutatea sa proprie este suficientă pentru a-l menține stabil, fără a depinde de greutatea suprastructurii ridicate ulterior. Riscul de subpresiune rămâne, prin urmare, limitat exclusiv la **faza de excavație și de turnare** a radierului, înainte ca acesta să atingă rezistența și greutatea sa finală — motiv pentru care programul de epuisment activ de la §PTh-R.2.2 rămâne obligatoriu pe toată durata acestor două etape, dar poate fi redus/oprit imediat după atingerea prizei betonului radierului, spre deosebire de situațiile în care epuismentul trebuie menținut până la ridicarea a două sau mai multe niveluri suprateran. Se recomandă, totuși, ca proiectantul să reconfirme explicit acest calcul la faza PT, cu geometria exactă a radierului rezultată din planurile de cofraj definitive și cu nivelul hidrostatic măsurat efectiv la data execuției, dat fiind caracterul sezonier al pânzei freatice.

---

## PTh-R.3 — HIDROIZOLAȚIA CUVEI ETANȘE A SUBSOLULUI TEHNIC

### PTh-R.3.1 Cerința de etanșeitate absolută — motivare funcțională

Subsolul tehnic al spitalului găzduiește, conform zonării funcționale stabilite în `general.md` §6.8, **gospodăria de apă** (rezervor de acumulare, pompe de incendiu), **stația de gaze medicale** (rezervor criogenic de oxigen și/sau baterie de butelii, compresoare de aer medical, pompe de vacuum), **tablourile electrice generale și grupul electrogen de rezervă**, și, dacă profilul de exploatare o impune, **sterilizarea centralizată (CSSD)**. Niciunul dintre aceste spații nu admite, prin natura funcțiunii, infiltrații de apă subterană: o infiltrație la stația de gaze medicale ar compromite siguranța electrică și de presiune a instalației care alimentează, direct, ventilația mecanică și gazele de anestezie ale pacienților aflați sub anestezie sau în stare critică; o infiltrație la tablourile electrice generale sau la grupul electrogen ar compromite exact sursa de rezervă de care depinde continuitatea actului medical în cazul unei întreruperi a rețelei publice (`general.md` §11.2); iar o infiltrație la gospodăria de apă ar contamina rezerva de apă care alimentează, printre altele, sterilizarea și necesarul clinic al zonelor critice.

Această cerință funcțională, superioară celei aplicabile unui subsol tehnic obișnuit (parcaj, depozite), justifică proiectarea infrastructurii ca **cuvă etanșă completă** — radier general și pereți de subsol continui, fără întreruperi, tratați ca un singur sistem de etanșare, conform principiului stabilit în DTAC (`structura.md` §13.1) — și impune, la faza de execuție, un standard de control superior celui aplicabil unei hidroizolații curente de subsol.

### PTh-R.3.2 Sistemul de hidroizolație — infrastructură

Hidroizolația radierului general se aplică **sub presiune** (dat fiind că radierul se află sub nivelul hidrostatic de calcul, `structura.md` §14.3), printr-un sistem cu membrană bituminoasă armată cu poliester, în **dublu strat**, aplicată pe stratul de egalizare (beton de curățare, clasa C8/10, grosime minimă 10 cm), cu sudare termică completă la fiecare cusătură și cu suprapunere minimă de 10 cm între foile succesive, verificată prin control vizual al sudurii pe toată lungimea. Hidroizolația se continuă vertical, fără întrerupere, pe fața exterioară a pereților de subsol (grosime 40 cm, `structura.md` §4.3), până deasupra cotei nivelului hidrostatic de calcul (−3,00 m), cu o marjă de siguranță suplimentară de minimum 50 cm peste această cotă, pentru a acoperi variațiile sezoniere ale pânzei freatice nedeterminate cu precizie absolută de studiul geotehnic.

Se prevede, imediat peste membrana de hidroizolație, un **strat de protecție mecanică** (șapă de protecție armată sau geotextil greu, funcție de soluția adoptată la faza PT), aplicat înainte de montarea armăturii radierului/pereților, pentru a preveni perforarea membranei la manipularea și fixarea armăturii, la circulația personalului pe șantier sau la eventuala cădere de unelte — o precauție de execuție simplă, dar esențială, dat fiind că orice perforare nedetectată a membranei anulează local funcția de etanșare exact în zona cu cel mai ridicat risc funcțional al construcției.

### PTh-R.3.3 Waterstop la rosturile de lucru și de tasare

Toate rosturile radierului și ale pereților de subsol — rosturile de lucru rezultate din secvența de turnare pe zone/travee (§PTh-R.2.5), rostul orizontal dintre radier și baza pereților de subsol, și orice rost vertical de execuție al pereților de subsol (dacă lungimea perimetrului impune mai multe etape de turnare) — se prevăd cu **profil waterstop din PVC sau bentonită expandabilă**, poziționat central în grosimea elementului, montat înainte de turnare și fixat rigid pe armătură pentru a preveni deplasarea acestuia în timpul betonării. Alegerea între PVC (soluție consacrată, rezistentă la agresivitatea chimică ușoară XA1 a apei subterane) și bentonită expandabilă (soluție cu montaj mai simplu, dar sensibilă la expunere prelungită la ploaie înainte de acoperire) revine proiectului tehnic de execuție, funcție de succesiunea reală a etapelor de turnare și de condițiile meteorologice preconizate pe durata execuției infrastructurii.

La interfața radier-perete de subsol, unde concentrarea armăturii verticale a pereților (plasă dublă Ø18/175 mm, majorată la Ø18/125 mm pe fâșia inferioară de 1,5 m, conform predimensionării de principiu preluate din practica curentă pentru pereți de subsol de 40 cm) este maximă, poziționarea corectă a waterstop-ului se verifică explicit înainte de turnarea pereților — punct de control distinct în cadrul PVLA (§PTh-R.12), dat fiind că acest rost orizontal este singurul care traversează, pe toată lungimea perimetrului cuvei etanșe, întreaga suprafață de contact cu apa subterană.

### PTh-R.3.4 Manșoane etanșe la traversările de instalații

Fiecare traversare a radierului sau a pereților de subsol de către o conductă, un cablu sau o coloană tehnică (alimentare cu apă către gospodăria de apă, coloane de gaze medicale, cabluri de forță către tablourile electrice generale, canalizare) se echipează cu **manșon etanș cu inel de etanșare** (de tip Link-Seal sau echivalent tehnic), poziționat exact la interfața dintre elementul de beton și traversare, montat în golul pregătit la faza de cofrare (§PTh-R.2.3), niciodată prin carotare ulterioară a betonului deja turnat și hidroizolat. Poziția exactă a fiecărei traversări se preia din planul de coordonare cu instalațiile (§PTh-R.7), verificat și avizat de proiectantul de structuri înainte de montarea armăturii, pentru a garanta că niciun manșon nu intersectează armătura de străpungere, banda de armătură suplimentară sub pereți/nuclee sau profilul waterstop al unui rost adiacent.

### PTh-R.3.5 Proba de etanșeitate și criteriile de acceptanță

Înainte de acoperirea finală a radierului și a pereților de subsol cu finisajele și cu echipamentele tehnice (stația de gaze medicale, tablourile electrice, gospodăria de apă), se efectuează o **verificare a etanșeității infrastructurii**, constând în monitorizarea vizuală și instrumentală (umidometru pe suprafața interioară a pereților și a radierului) pe o perioadă determinată după decofrare și după atingerea nivelului hidrostatic real de exploatare (sau, dacă execuția se desfășoară în perioadă secetoasă, după reconstituirea artificială a nivelului prin recircularea apei din puțurile de epuisment în jurul incintei, pentru a solicita efectiv hidroizolația înainte de darea în exploatare). Criteriul de acceptanță este **absența oricărei urme vizibile de umiditate sau infiltrație** pe suprafața interioară a radierului și a pereților de subsol, pe toată durata de observare — un standard mai sever decât cel aplicabil unui subsol tehnic obișnuit (unde se tolerează, de regulă, un grad limitat de umiditate capilară la suprafață), justificat de prezența gospodăriei de apă și a stației de gaze medicale în acest spațiu (§PTh-R.3.1). Constatarea oricărei infiltrații, oricât de mică, impune remedierea completă (injecții de etanșare, refacerea locală a hidroizolației) și repetarea probei, înainte de a permite montajul echipamentelor tehnice — punct de control obligatoriu al PVLA (§PTh-R.12) și condiție prealabilă declarată explicit pentru continuarea lucrărilor de instalații la acest nivel.

---

## PTh-R.4 — EXECUȚIA SUPRASTRUCTURII: CADRE, PEREȚI STRUCTURALI ȘI PLANȘEE

### PTh-R.4.1 Cofrarea și armarea stâlpilor și pereților structurali

Stâlpii (60×60 cm la etajele curente, 70×70 cm la subsol/parter) și pereții structurali/nucleele de circulație (30 cm la etajele curente, 40 cm la subsol, `structura.md` §4.3) se cofrează cu sisteme de cofraj recuperabile, tip panou metalic sau mixt, dimensionate pentru presiunea de turnare a betonului proaspăt la înălțimea de nivel adoptată (3,60 m la etajele curente, 3,80 m la subsol, `structura.md` §1.2), cu o atenție particulară la cofrarea nucleelor de circulație — secțiuni închise, cu pereți pe toate laturile, la care accesul pentru vibrarea betonului este mai dificil decât la un perete simplu; se recomandă, pentru aceste elemente, un sistem de cofraj cu ferestre de control/vibrare intermediare, sau, alternativ, un ritm de turnare pe straturi mai subțiri, cu vibrare internă sistematică la fiecare strat, pentru a evita zonele de segregare sau de compactare insuficientă în colțurile secțiunii închise.

Armarea stâlpilor și pereților urmează caietul de armare al fazei PT (derivat din procentele de armare stabilite de principiu în DTAC — armătură longitudinală de stâlp cu procent uzual în intervalul 1-4% recomandat pentru elemente DCM, `structura.md` §11.2, și armătură de bulb confinat la baza pereților, `structura.md` §15.3), cu prefabricarea, pe cât posibil, a carcaselor de armătură ale zonelor critice (§PTh-R.6) la sol, pe un șablon dimensional, urmată de ridicarea și poziționarea lor în cofraj — soluție de execuție care reduce erorile de poziționare a etrierilor la pas redus, frecvente la montarea manuală pe verticală în spații de lucru înguste.

### PTh-R.4.2 Secvența de execuție pe niveluri

Execuția suprastructurii urmează secvența firească a unei structuri duale de beton armat monolit fără discontinuități verticale (`structura.md` §1.2): la fiecare nivel, se toarnă întâi stâlpii și pereții structurali/nucleele, se așteaptă atingerea unei rezistențe minime la vârstă tânără suficientă pentru decofrarea laterală (verificată prin epruvete martor, conform NE 012), apoi se montează cofrajul și armătura planșeului nivelului respectiv, se toarnă planșeul, iar ciclul se reia la nivelul următor. Continuitatea verticală integrală a pereților și nucleelor — cerință centrală a concepției structurale, fără nicio întrerupere, reducere bruscă de secțiune sau element de transfer (`structura.md` §4.3) — se verifică la fiecare nivel prin controlul explicit al alinierii armăturii verticale ieșite din nivelul inferior cu poziția cofrajului nivelului superior, înainte de montarea noii armături, pentru a preveni orice decalaj accidental de poziție care ar introduce o excentricitate nedorită.

La interfața dintre corpul de bază (S+P+E1) și corpul de spitalizare retras (E2-E4), unde amprenta construcției se reduce (§PTh-R.5.2), execuția planșeului de la nivelul E1 — care devine, pe zona de retragere, terasă tehnică — necesită o coordonare suplimentară cu proiectul de arhitectură și de instalații (poziția parapetului, a hidroizolației de terasă și a punctelor de fixare a unităților exterioare de climatizare, `general.md` §6.7), tratată integral la §PTh-R.14.

### PTh-R.4.3 Cofrarea, armarea și betonarea planșeelor (curent / bloc operator / imagistică)

Planșeele acestei clădiri se execută în trei variante de grosime, corespunzătoare zonării funcționale stabilite prin DTAC (`structura.md` §4.3, §10): **15 cm** la planșeele curente (spitalizare, circulații), **18 cm** la planșeul blocului operator (deschidere locală mărită la 8,10 m, `structura.md` §1.2) și **25-30 cm** la planșeul departamentului de imagistică (grosime majorată pentru a ridica frecvența proprie a plăcii peste pragul de vibrație admis, `structura.md` §12.4). Această diferențiere de grosime pe același nivel (etajul 1, care găzduiește simultan bloc operator, ATI, imagistică și laborator, `general.md` §6.2) impune, la cofrare, o **tratare explicită a tranzițiilor de grosime**: cofraj în trepte (nu în pantă) la interfața dintre zona curentă de 15-18 cm și zona de imagistică de 25-30 cm, cu poziționarea corectă a armăturii de continuitate la fiecare treaptă, verificată separat de cea a planșeului curent, dat fiind rolul critic al grosimii exacte a plăcii de imagistică pentru atingerea frecvenței proprii de calcul (`structura.md` §12.4: `f_n = 12,4 Hz`, verificare reluată la nivel de execuție la §PTh-R.9.1).

Armarea urmează secvența: montarea plasei inferioare pe distanțiere, montarea armăturii de străpungere la stâlpii cu reacțiune concentrată (dacă e cazul la interfața cu zonele îngroșate), montarea plasei superioare pe capre de distanțare, verificarea acoperirii minime (35 mm la planșeele curente) prin control cu șablon, și, la planșeul de imagistică, verificarea suplimentară a grosimii efective a stratului de beton prin măsurarea cotei superioare a cofrajului față de cota inferioară, înainte de turnare — control specific, fără echivalent la restul construcției, dat fiind că orice reducere a grosimii turnate față de proiect (25-30 cm) scade direct frecvența proprie calculată și poate compromite îndeplinirea criteriului de vibrație cerut de echipamentele RMN/CT (§PTh-R.9). Turnarea planșeului fiecărui nivel se realizează, pe cât posibil, într-o singură zi de lucru, pentru a evita rosturi de lucru necontrolate în câmpul plăcii; unde organizarea de șantier impune totuși un rost de lucru intermediar, acesta se poziționează la aproximativ o treime din deschidere de la reazem (zonă de moment redus), niciodată la mijlocul deschiderii sau în banda de colector a diafragmei.

### PTh-R.4.4 Rosturi de lucru la planșee și grinzi

Rosturile de lucru la grinzile principale (30×65 cm) și secundare (25×55 cm) se poziționează, analog planșeelor, la aproximativ o treime din deschidere de la reazem, cu suprafața de beton întărit curățată și rugozată imediat înainte de continuarea turnării, pentru asigurarea aderenței la interfața de reluare. La grinda tipică cu armare de 6Ø20 (`structura.md` §11.3), rostul de lucru nu intersectează, în poziția adoptată, lungimea de ancorare a armăturii de reazem, condiție verificată explicit la faza de proiectare a planurilor de cofraj/armare definitive.

### PTh-R.4.5 Decofrarea — termene diferențiate pe grosime de element

Termenele de decofrare se stabilesc, pentru fiecare categorie de element, funcție de rezistența la vârstă tânără confirmată prin epruvete martor (nu prin calendaristica generică), cu o diferențiere explicită între planșeul curent (15-18 cm, decofrare relativ rapidă, dat fiind grosimea redusă și rata de întărire favorabilă) și planșeul de imagistică (25-30 cm, decofrare amânată suplimentar, dat fiind volumul mai mare de beton pe unitatea de suprafață și rata de întărire mai lentă în miezul secțiunii groase) — regulă analogă principiului de decofrare diferențiată aplicat, la alte tipologii structurale ale bibliotecii, planșeelor de tip flat slab cu capiteluri. Stâlpii și pereții se decofrează lateral la o rezistență minimă suficientă pentru autoportanță și pentru a nu deteriora muchiile elementului, dar nu se încarcă cu greutatea planșeului superior până la atingerea rezistenței de proiect confirmate prin epruvete, condiție verificată explicit înainte de a permite montarea cofrajului nivelului următor.

---

## PTh-R.5 — ROSTURI DE DILATARE/SEISMICE — JUSTIFICAREA ABSENȚEI ȘI TRATAREA RETRAGERII DE VOLUM

### PTh-R.5.1 Justificarea absenței rostului de dilatare/seismic pentru corpul unic compact

Construcția analizată este un **corp unic, compact**, fără tronsonare — spre deosebire de alte tipologii ale bibliotecii (de exemplu centrele comerciale de suprafață mare, tronsonate prin rosturi seismice complete în corpuri independente), spitalul nu necesită, la geometria sa de referință (plan 42,00 × 24,00 m, `structura.md` §1.2), niciun rost de dilatare sau rost seismic intermediar, pentru trei motive convergente:

1. **Dimensiunea în plan** — 42,00 m pe direcția lungă — se situează confortabil sub pragul uzual de 40-60 m dincolo de care practica de proiectare a structurilor de beton armat monolit recomandă, de regulă, introducerea unui rost de dilatare pentru limitarea eforturilor din variații de temperatură și din contracția betonului; la această dimensiune, efectele termice și de contracție se controlează prin armătura minimă distribuită și prin tehnologia de execuție (cure de beton, protecție la variații termice bruște în primele zile după turnare), fără a necesita separarea fizică a structurii;
2. **Regularitatea deplină în plan și în elevație**, confirmată la `structura.md` §5.3, care exclude atât concentrările de eforturi asociate unei geometrii neregulate, cât și necesitatea unui rost pentru separarea unor corpuri cu comportare dinamică diferită (situație care ar apărea, de exemplu, la o clădire cu o aripă mult mai înaltă sau mult mai rigidă decât restul construcției);
3. **Continuitatea verticală integrală a sistemului structural**, de la radier la ultimul nivel, fără transfer și fără discontinuități de rigiditate (`structura.md` §1.2, §4.3), care menține o comportare seismică unitară a întregii construcții, fără subansambluri cu perioade proprii de vibrație distincte care ar necesita separare prin rost.

Absența rostului de dilatare/seismic simplifică semnificativ execuția infrastructurii (cuvă etanșă unică, fără rosturi suplimentare de tratat la hidroizolație, §PTh-R.3) și a suprastructurii (fără duplicarea elementelor structurale de-a lungul unui rost, fără detalii de rezemare glisantă la interfața dintre corpuri), coerent cu strategia generală de proiectare conservatoare adoptată pentru clasa de importanță I (`structura.md` §5.5).

### PTh-R.5.2 Tratarea retragerii de volum de la etajul 1 la etajul 2 (corp de bază → corp de spitalizare)

Configurația volumetrică „podium + turn de îngrijire" descrisă în memoriul general (`general.md` §6.1) — corpul de bază (subsol + parter + etajul 1) cu amprentă mai extinsă, retras la nivelul etajelor 2-4 (corpul de spitalizare), cu eliberarea unei terase tehnice perimetrale la nivelul etajului 1 — **nu constituie o discontinuitate structurală și nu necesită rost**: retragerea de amprentă este o simplă reducere a conturului construit la partea superioară, nu o întrerupere sau un transfer al elementelor verticale portante. Toți stâlpii și pereții structurali care susțin corpul de spitalizare (etajele 2-4) coboară, fără excepție, continuu până la radier, exact ca la restul construcției (`structura.md` §1.2); elementele verticale ale corpului de bază situate la periferia amprentei extinse — cele care nu au corespondent la nivelurile superioare, dat fiind că acolo construcția se retrage — pur și simplu **se opresc la partea superioară a etajului 1**, fără ca acest lucru să implice o grindă de transfer sau o descărcare concentrată a unei încărcări discontinuate: planșeul de la partea superioară a acestor elemente devine planșeul terasei tehnice, încărcat doar cu greutatea proprie, cu echipamentele tehnice amplasate acolo (unități exterioare de climatizare, `general.md` §6.7) și cu acțiunea climatică (zăpadă, vânt), fără nicio sarcină „moștenită" de la niveluri superioare.

La execuție, acest punct necesită o coordonare atentă cu arhitectura și cu instalațiile, nu o soluție structurală specială: poziționarea parapetului perimetral al terasei tehnice (element nestructural, ancorat de planșeul etajului 1), continuitatea hidroizolației terasei peste toată suprafața eliberată de retragere, cu racordurile verticale la fațada corpului de spitalizare care se ridică deasupra, și poziționarea punctelor de fixare/postamentelor elastice ale echipamentelor de climatizare (izolare vibro-acustică față de saloanele de deasupra, `general.md` §14.8) — toate tratate integral la §PTh-R.14, fără implicații asupra sistemului structural principal.

### PTh-R.5.3 Prevederea de principiu pentru un eventual rost față de o extindere/corp vecin viitor

Deși construcția de referință nu are, în ipoteza de bază, corpuri adiacente la distanță critică, `structura.md` §2.4 semnalează, ca cerință specifică clasei de importanță I, obligativitatea dimensionării cu marjă suplimentară anti-pounding a oricărui rost față de o eventuală extindere ulterioară sau corp vecin: rostul respectiv trebuie calculat pentru suma deplasărilor amplificate ale ambelor structuri, majorate fiecare cu propriul factor `γI,e`. Această prevedere rămâne, la faza actuală de proiectare, o **recomandare de principiu pentru fazele viitoare de dezvoltare** a amplasamentului (de exemplu o extindere a ambulatoriului menționată ca rezervă la `general.md` §5.2, pe latura de vest a parcelei), nu o soluție de execuție a prezentului obiect de investiție — la momentul proiectării unei asemenea extinderi, deplasarea de calcul a construcției existente (17,5 mm la ULS, `structura.md` §10.2) se preia ca dată de intrare obligatorie pentru dimensionarea rostului dintre cele două corpuri.

---

## PTh-R.6 — DETALII DE ARMARE LA NODURI CRITICE — EXECUȚIE

### PTh-R.6.1 Zonele critice ale grinzilor

La capetele grinzilor, în lungimea critică `l_cr = 1,5·h` (pentru grinda principală de 65 cm înălțime, `l_cr ≈ 975 mm`, `structura.md` §15.1), etrierii se dispun la pasul redus rezultat din `s ≤ min(h/4; 24·Øe; 150 mm)`. La execuție, această zonă se tratează cu prioritate la prefabricarea carcasei de armătură (§PTh-R.4.1): etrierii la pas redus se montează pe carcasa prefabricată la sol, cu poziția lor fixată definitiv înainte de ridicarea în cofraj, evitând astfel corectările de poziție dificile și inexacte care ar rezulta dintr-o montare directă în cofraj, la înălțime, într-un spațiu de lucru îngust. Se verifică, la fiecare grindă, ca zona critică să acopere integral porțiunea în care se așteaptă formarea articulației plastice (conform verificării „grindă slabă/stâlp puternic" de la `structura.md` §11.2), fără a fi întreruptă de un rost de lucru (§PTh-R.4.4) sau de o înnădire a armăturii longitudinale (§PTh-R.6.5).

### PTh-R.6.2 Zonele critice ale stâlpilor

La stâlpi, lungimea critică `l_cr = max(h; l_lib/6; 600 mm)` (pentru stâlpul de 70×70 cm cu înălțime liberă de nivel de ordinul 3,00-3,20 m, `l_cr` rezultă, tipic, egal cu `h = 700 mm` sau ușor superior, funcție de valoarea exactă a înălțimii libere) se confinează cu etrieri la pasul `s ≤ min(b/3; 125 mm)` și cu indicele mecanic de confinare `ωwd ≥ 0,08` (`structura.md` §15.2). Executarea corectă a acestei confinări, mai densă decât la restul stâlpului, este condiționată de o atenție deosebită la **congestia de armătură**: la stâlpul de 70×70 cm cu procent de armare longitudinală în intervalul uzual (1-4%, `structura.md` §11.2) și etrieri la pas 100-125 mm pe 4 ramuri, spațiul liber între bare poate deveni insuficient pentru introducerea corectă a betonului și pentru vibrarea completă a acestuia — problemă tratată la §PTh-R.6.4.

Zona critică majorată local la stâlpii de la parter și subsol (unde efortul axial normalizat atinge valoarea sa maximă, `νd = 0,50`, `structura.md` §11.2, §15.4) se marchează explicit pe planurile de cofraj/armare definitive, cu o notă de atenție distinctă pentru echipa de armare, dat fiind riscul de confuzie cu zona curentă (etrieri la pas mai mare) de la etajele superioare, unde efortul axial este sensibil mai redus.

### PTh-R.6.3 Bulbii confinați ai pereților structurali

La baza pereților structurali și a nucleelor de circulație, pe lungimea critică `h_cr = max(l_w; H/6)` (`structura.md` §15.3), se execută **bulbi confinați** la extremitățile secțiunii, cu procent minim de armare longitudinală `ρ ≥ 0,20%` și confinare transversală densă, analogă stâlpilor. Execuția bulbilor necesită un cofraj dedicat, diferit de cel al inimii curente a peretelui (secțiune locală majorată sau, cel puțin, densitate de armătură vizibil superioară, care impune o atenție suplimentară la introducerea și compactarea betonului), și o secvență de armare care asigură continuitatea între armătura verticală a bulbului de la un nivel și cea a nivelului imediat superior — verificată explicit la fiecare etaj, dat fiind rolul bulbilor confinați ca zonă unică de plastificare a peretelui pe toată înălțimea sa (principiu de proiectare la capacitate reluat din `structura.md` §15.3).

### PTh-R.6.4 Congestia de armătură la noduri — soluții de execuție

La nodurile cu cea mai ridicată densitate de armătură — intersecția stâlp-grindă-planșeu la parter/subsol, zona bulbilor confinați ai pereților, și interfața dintre armătura de confinare și acoperirea de beton impusă (45-50 mm la subsol, `structura.md` §6.3, §15.5) —, se aplică principiul de optimizare recomandat de principiu în DTAC: **bare de diametru mai mare la pas mai mare**, în locul unor bare subțiri la pas foarte redus, acolo unde ambele soluții satisfac egal cerința de arie de armătură transversală de confinare. Această alegere, făcută la faza de proiectare a planurilor de cofraj/armare definitive (nu la execuție, unde orice modificare a diametrelor ar necesita reverificare de calcul), reduce riscul de segregare a betonului și de goluri de compactare la nodurile cele mai aglomerate, fără a compromite performanța seismică a confinării.

La execuție propriu-zisă, congestia rezidivă se gestionează prin: (a) verificarea, înainte de turnare, a spațiului liber minim între bare pentru trecerea furtunului de vibrare internă (sau, la nodurile cele mai dense, prevederea unor ferestre de acces suplimentare în cofraj, dedicate exclusiv vibrării); (b) utilizarea, unde specificată la faza PT, a unui beton cu clasă de consistență majorată (S4/S5, eventual autocompactant) la nodurile cele mai dens armate, similar principiului aplicat la alte structuri ale bibliotecii cu noduri critice comparabile; și (c) control vizual sistematic, prin fereastră de cofraj sau prin decofrare parțială de probă la primul element executat de fiecare tip, pentru a confirma absența golurilor de compactare înainte de generalizarea soluției pe restul construcției.

### PTh-R.6.5 Înnădirea armăturii — poziționare și tehnologie

Înnădirile armăturii longitudinale (prin suprapunere, conform SR EN 1992-1-1 §8.7) se poziționează, la toate elementele verticale disipative (stâlpi, pereți, nuclee), **în afara zonelor critice** definite la §PTh-R.6.1-6.3 — regulă obligatorie pentru elementele proiectate la ductilitate medie (DCM), dat fiind riscul de degradare a înnădirii sub solicitări ciclice repetate exact în zona unde se așteaptă formarea articulațiilor plastice. La grinda tipică armată cu 6Ø20 (`structura.md` §11.3) și la stâlpii/pereții acestei construcții, diametrele de armătură rămân în intervalul curent (Ø20-Ø28, funcție de element), pentru care înnădirea prin suprapunere clasică rămâne soluția tehnică uzuală și suficientă; utilizarea unor cuplaje mecanice de înnădire (soluție recomandată, la alte tipologii ale bibliotecii, pentru diametre foarte mari, peste Ø28-Ø32) rămâne o opțiune de execuție disponibilă, dacă antreprenorul o consideră avantajoasă pentru accelerarea montajului la nodurile cele mai congestionate, dar nu este o cerință obligatorie la diametrele curente ale acestei structuri.

---

## PTh-R.7 — COORDONAREA STRUCTURALĂ CU REȚEAUA DE GAZE MEDICALE

### PTh-R.7.1 Principiul de coordonare și regula de aviz obligatoriu

Rețeaua de gaze medicale (oxigen, aer comprimat medical, vacuum și, dacă tema o cere, protoxid de azot), proiectată și executată conform **SR EN ISO 7396-1** (`general.md` §1.3, §7.3), traversează structura pe verticală (de la stația centrală din subsolul tehnic către fiecare nivel cu puncte de utilizare — bloc operator, ATI, saloane) și pe orizontală (distribuția pe fiecare nivel către prizele de la paturi și de la mesele de operație). Prezentul capitol tratează **exclusiv coordonarea geometrică și de execuție** a golurilor și traseelor prin elementele structurale — poziționarea și dimensionarea golurilor de trecere fără afectarea capacității portante a elementului traversat —, nu dimensionarea presiunilor, debitelor sau redundanței rețelei, care revine integral memoriului de instalații și suplimentului său de fază PTh (`instalatii-pth.md`).

Regula de coordonare aplicată, analogă principiului consacrat la alte tipologii structurale ale bibliotecii cu instalații speciale dense: **nicio traversare cu diametrul peste 100 mm a unui element structural principal (grindă, perete structural, zonă de colector de diafragmă) nu se execută fără avizul explicit, în scris, al proiectantului de structuri**, acordat pe baza planului de coordonare definitiv (BIM sau suprapunere 2D structură-instalații), înainte de armarea elementului respectiv. Traversările de diametru mic (sub 100 mm, tipice pentru coloanele individuale de gaz către un singur punct de utilizare) prin planșee, în afara benzilor de stâlpi și a colectorilor, nu necesită aviz individual, ci se conformează regulilor generale de poziționare de la §PTh-R.7.2.

### PTh-R.7.2 Goluri și trasee în planșee

| Zonă de planșeu | Goluri admise | Restricții |
|---|---|---|
| Câmp curent (planșeu 15 cm) | Ø ≤ 150 mm, izolate, distanță minimă 3×Ø între goluri | fără armătură suplimentară dacă respectă limita |
| Banda de stâlpi (armătură superioară majorată, `structura.md` §4.3) | Ø ≤ 100 mm | evitate pe cât posibil; peste 100 mm necesită aviz + armătură de contur |
| Planșeu bloc operator (18 cm) | Ø ≤ 150 mm | idem câmp curent, cu atenție la coordonarea cu tavanul tehnic laminar |
| Planșeu imagistică (25-30 cm) | Ø ≤ 200 mm, poziționate în afara amprentei directe a echipamentului (CT/RMN) | interzise în banda centrală de rigiditate maximă sub magnet (§PTh-R.8.2); orice gol necesită aviz explicit, dat fiind rolul grosimii integrale a plăcii în verificarea de frecvență proprie (`structura.md` §12.4) |
| Zona de colector de diafragmă (dacă aplicabilă la conturul unui gol funcțional mare) | interzise fără aviz expres | rol critic în transferul forței seismice orizontale |

Toate golurile cu diametrul peste limitele tabelului de mai sus, sau grupate la o distanță mai mică decât cea admisă, se tratează prin armătură de contur suplimentară (bare diagonale la colțurile golurilor dreptunghiulare, plasă de contur la golurile circulare mari), dimensionată la faza PT pe baza poziției definitive rezultate din proiectul de instalații — o cerință de coordonare mai strictă decât la o clădire civilă obișnuită, dată fiind densitatea rețelei de gaze medicale, dublată de rețeaua electrică de rezervă și de tavanele tehnice ale zonelor critice (`general.md` §6.9).

### PTh-R.7.3 Goluri și trasee în pereți structurali

Pereții structurali și nucleele de circulație (30-40 cm grosime) nu admit **nicio traversare** în zonele critice de la bază (bulbii confinați, `structura.md` §15.3, §PTh-R.6.3) și în lungimea critică `h_cr` de la fiecare capăt de perete — regulă absolută, fără excepție de aviz, dat fiind rolul acestor zone ca locație unică de disipare inelastică a energiei seismice pe toată înălțimea peretelui. În afara zonelor critice (inima curentă a peretelui, la nivelurile intermediare ale înălțimii), traversările de diametru mic (coloane individuale de gaz sau cabluri electrice) se admit cu aviz al proiectantului de structuri, poziționate preferențial în zona centrală a inimii peretelui (departe de fețele exterioare, unde armătura verticală/orizontală este mai densă) și niciodată aliniate vertical pe mai multe niveluri succesive fără o verificare explicită a secțiunii nete rămase.

Nucleele de circulație, care găzduiesc de regulă și ghenele verticale principale ale rețelei de gaze medicale (§PTh-R.7.5), se proiectează, la faza PT, cu goluri de trecere **predefinite** în plăcile de contur ale nucleului la fiecare nivel, dimensionate generos pentru întreaga durată de exploatare a construcției (inclusiv pentru evoluția viitoare a rețelei, `general.md` §6.9), astfel încât execuția să nu necesite, ulterior, carotarea betonului deja turnat.

### PTh-R.7.4 Goluri și trasee în grinzi

La grinzile principale (30×65 cm) și secundare (25×55 cm), traversările de instalații se admit exclusiv în **treimea mijlocie a deschiderii** (zonă de forfecare redusă), cu diametrul golului limitat la maximum 0,10-0,15 din înălțimea secțiunii (analog principiului general aplicat la structurile bibliotecii cu grinzi traversate de instalații), poziționate sub axa neutră a secțiunii (în zona întinsă la partea inferioară, unde traversarea afectează mai puțin capacitatea la încovoiere decât o traversare în zona comprimată superioară) și cu o distanță minimă între goluri succesive egală cu de trei ori diametrul golului mai mare. Sunt **interzise fără excepție** traversările în treimea de capăt a grinzii (zona critică de la §PTh-R.6.1, unde se așteaptă formarea articulației plastice) și în zona de rezemare pe stâlp/perete, unde forfecarea de calcul este maximă.

### PTh-R.7.5 Nucleul central de circulație — ghene verticale dedicate

Zonarea funcțională stabilită prin memoriul general (`general.md` §6.2) prevede un nucleu central constant pe verticală, care aliniază circulațiile, grupurile sanitare și ghenele de instalații, inclusiv coloanele de gaze medicale. La execuție, această decizie de concepție se traduce prin **ghene verticale dedicate**, integrate în conturul nucleelor de circulație structurale (§PTh-R.7.3) sau imediat adiacente acestora, cu goluri de trecere predefinite la fiecare planșeu (nu carotate ulterior), dimensionate la faza PT pe baza numărului și diametrului final al coloanelor de gaze medicale, electrice și sanitare stabilite de memoriul de instalații și de suplimentul său de fază PTh. Poziționarea ghenelor imediat adiacent nucleelor structurale, în locul dispersării traseelor prin câmpul curent al planșeelor, simplifică atât execuția (un singur set de goluri predefinite, verificat o singură dată la structura), cât și mentenanța pe durata exploatării (acces concentrat la toate coloanele verticale critice, `general.md` §18.3).

### PTh-R.7.6 Protecția la foc a traversărilor

Fiecare traversare a unui element structural sau a unei compartimentări rezistente la foc de către o coloană de gaze medicale, un cablu electric sau o conductă sanitară se etanșează, după montarea instalației, cu un sistem de etanșare la foc (manșoane intumescente, mortar/vată minerală rezistentă la foc, funcție de diametrul și de natura traversării), dimensionat pentru a restabili integral clasa de rezistență la foc a elementului traversat (R/REI corelat cu gradul I de rezistență la foc al construcției, `general.md` §14.1). Această cerință, deși aparține în principal scenariului de securitate la incendiu, se coordonează structural prin faptul că **poziția și dimensiunea golului**, stabilite conform §PTh-R.7.2-7.4, trebuie să rămână compatibile cu montarea ulterioară a acestor sisteme de etanșare (spațiu de lucru suficient în jurul traversării), condiție verificată la faza de coordonare BIM/2D dintre structură, instalații și scenariul de securitate la incendiu.

---

## PTh-R.8 — FUNDAȚII ȘI PLANȘEE SUPRADIMENSIONATE LOCAL PENTRU ECHIPAMENTE MEDICALE GRELE

### PTh-R.8.1 Computer tomograf — placa groasă și ecranarea radiologică

Sala de CT se amplasează, conform recomandării de principiu din DTAC (`structura.md` §12.5), preferențial la subsol sau la parter, pe planșeul de imagistică majorat la 25-30 cm (§PTh-R.4.3). Greutatea proprie a echipamentului (2-3 tone, `structura.md` §7.3, §16.2) nu impune, prin ea însăși, o fundație dedicată — grosimea de placă adoptată acoperă cu marjă atât verificarea de rezistență statică, cât și verificarea de frecvență proprie (`structura.md` §12.4) —, dar poziția și fixarea bazei echipamentului se coordonează la faza PT cu documentația tehnică a furnizorului, pentru **ancorarea seismică** obligatorie la clasa de importanță I (`structura.md` §16.2), constând, tipic, în inserții metalice sau bucșe filetate montate în planșeu **înainte de turnare**, la pozițiile exacte comunicate de furnizor, verificate la forfecare și, dacă geometria bazei aparatului o impune, la smulgere.

Ecranarea radiologică a sălii de CT (plumb sau baritină în pereți, planșeu și, dacă e cazul, în tavan, cu grosimea de calcul stabilită de specialistul de radioprotecție avizat CNCAN, funcție de kV-ul echipamentului, `general.md` §6.4) se execută, la partea de planșeu, prin montarea foilor de plumb (sau prin utilizarea unei șape cu agregat de baritină) **între stratul structural de beton armat și șapa de finisaj**, fără a fi integrată în calculul de rezistență al plăcii structurale — ecranarea este un strat nestructural, adăugat, a cărui greutate proprie (relativ redusă comparativ cu greutatea utilă generală a zonei, dar concentrată uniform pe suprafață) se include în încărcarea permanentă de calcul a planșeului la faza PT, ca o corecție minoră față de valoarea generică din DTAC. Coordonarea cu structura se limitează la: (a) confirmarea faptului că planșeul suportă și această greutate suplimentară, deja acoperită de marja generoasă a grosimii de 25-30 cm, și (b) evitarea perforării accidentale a stratului de ecranare de către eventuale traversări de instalații ulterioare, printr-o poziționare predefinită a golurilor (§PTh-R.7.2) înainte de montarea ecranării.

### PTh-R.8.2 Rezonanța magnetică nucleară — fundația antivibratilă și cușca Faraday

Sala de RMN necesită, dincolo de grosimea majorată a planșeului (25-30 cm), o **fundație antivibratilă dedicată**, dimensionată conform principiilor stabilite în DTAC (`structura.md` §13.4): un bloc inerțial de masă egală cu 5-10 ori masa echipamentului (RMN, 5-7 tone, plus până la câteva tone pentru ecranarea cuștii Faraday, `structura.md` §7.3), rezemat pe elemente elastice calibrate pentru o frecvență proprie a sistemului decuplat `f0 ≈ 3-5 Hz`.

**Execuția fundației antivibratile** urmează o secvență distinctă de restul planșeului: (1) delimitarea, prin cofraj perimetral separat, a zonei blocului inerțial față de restul planșeului structural, cu un **rost continuu** pe tot conturul, dimensionat pentru a primi materialul elastic de decuplare (nu se admite niciun punct de contact rigid accidental — o eclisă de cofraj uitată, o armătură care traversează rostul fără întrerupere — care ar anula funcția de izolare, exact fenomenul semnalat de principiu la `structura.md` §12.2 privind transmisibilitatea); (2) poziționarea elementelor elastice de reazem (elastomeri, neopren sau arcuri metalice calibrate, funcție de soluția adoptată la faza PT) la cotele și interaxul de proiect, **înainte** de turnarea blocului inerțial, cu verificarea rigidității `k` a fiecărui element prin certificatul de conformitate al furnizorului (§PTh-R.10.2, controlul materialelor); (3) turnarea blocului inerțial ca element independent, monolit, cu propria armătură de distribuție (fără rol structural seismic, dar cu rol de integritate a blocului sub greutatea proprie și sub sarcinile dinamice ale echipamentului); (4) montarea, ulterior întăririi blocului, a ancorajelor magnetului — compatibile cu elementele elastice de decuplare (nu rigide direct pe placa structurală, condiție care ar anula izolarea la vibrații de exploatare), dar suficient de rezistente pentru a preveni deplasarea sau răsturnarea magnetului la acțiunea seismică (`structura.md` §16.3).

**Cușca Faraday**: panourile de ecranare electromagnetică a sălii de RMN, care pot însuma, împreună cu eventuala componentă de ecranare magnetică suplimentară, câteva tone (`structura.md` §13.5), se ancorează de structura de pereți/tavan a sălii prin ancoraje verificate atât la încărcarea gravitationlă proprie, cât și, obligatoriu la clasa de importanță I, la acțiunea seismică — inserțiile de fixare se montează în elementele de beton **înainte** de turnare, la pozițiile stabilite de furnizorul cuștii, cu o verificare de coordonare suplimentară, specifică acestei încăperi: dacă furnizorul RMN impune o **zonă de excludere feromagnetică** în imediata vecinătate a magnetului (linia de câmp de 0,5 mT, `structura.md` §13.5, `general.md` §6.4), armătura obișnuită de oțel-beton din acea zonă se înlocuiește, la execuție, cu o plasă de armare nemagnetică (fibră de sticlă/compozit), soluție care se stabilește explicit la faza PT, în coordonare directă cu furnizorul echipamentului, și se marchează distinct pe planurile de armare, pentru a evita confuzia de material la punerea în operă.

### PTh-R.8.3 Angiograful — ancorarea la smulgere a planșeului superior

Dacă programul funcțional prevede un angiograf (cardiologie/radiologie intervențională), particularitatea sa structurală — brațul C suspendat de planșeul superior, nu rezemat pe pardoseală (`structura.md` §7.3, §13.6) — impune montarea, **înainte de turnarea planșeului respectiv**, a inserțiilor metalice sau bucșelor filetate de fixare, poziționate exact conform documentației tehnice a furnizorului, verificate la faza PT explicit la **smulgere (pull-out)**, în plus față de verificarea uzuală la forfecare aplicabilă echipamentelor rezemate pe pardoseală (`structura.md` §16.4). Coordonarea cu furnizorul echipamentului este, pentru acest punct, o condiție prealabilă obligatorie a turnării planșeului — spre deosebire de CT/RMN, unde o parte a coordonării poate fi finalizată și după structura la roșu (ancorele de bază montate ulterior prin chimice), la angiograf inserțiile trebuie integrate în armătura planșeului chiar la faza de armare, dat fiind că brațul suspendat solicită planșeul la o încărcare concentrată de smulgere care nu poate fi acoperită retroactiv, cu suficientă siguranță, printr-o simplă ancoră chimică montată după turnare.

### PTh-R.8.4 Acceleratorul liniar (dacă prevăzut) — radier propriu local

Dacă programul funcțional extins include un accelerator liniar de radioterapie (greutate peste 8 tone, `structura.md` §7.3), acesta se amplasează, conform recomandării de principiu a DTAC, la subsol, pe **radier propriu local îngroșat**, dedicat exclusiv acestui echipament, separat de radierul general al restului construcției printr-un rost (analog conceptual rostului fundației antivibratile de la RMN, dar dimensionat pentru o încărcare statică mult mai mare, nu pentru decuplare dinamică) — execuția acestui radier local urmează aceleași principii de cofrare, armare și betonare stabilite pentru radierul general (§PTh-R.2), cu o coordonare suplimentară obligatorie cu proiectul de ecranare radiologică grea (pereți de beton cu densitate sporită sau cu adaos de baritină, grosime stabilită de specialistul de radioprotecție avizat CNCAN), ale cărei greutăți proprii intră direct în încărcarea permanentă de calcul a acestui radier local.

### PTh-R.8.5 Mesele de operație și echipamentele fixe ale blocului operator

Mesele de operație, echipamentele de anestezie fixe și celelalte dotări grele ale sălilor de operație (4 săli, `general.md` §6.4) se ancorează în pardoseala/planșeul blocului operator (grosime 18 cm, §PTh-R.4.3) prin inserții sau ancore chimice, dimensionate la faza PT conform metodologiei generale de ancorare seismică a componentelor (`structura.md` §16.1, formula `Fa = γa·ma·Sa/qa`), cu factor de importanță al componentei sporit, dat fiind rolul critic al mesei de operație pe durata unei intervenții chirurgicale în curs la momentul unui eventual eveniment seismic. Poziționarea exactă a punctelor de ancorare se stabilește în coordonare cu planul de dotare a fiecărei săli de operație, comunicat de arhitectură/echipamente medicale înainte de finalizarea armăturii planșeului respectiv, pentru a permite montarea inserțiilor la faza de armare, nu prin carotare ulterioară a planșeului finit.

---

## PTh-R.9 — CONTROLUL VIBRAȚIILOR PLANȘEELOR LA SĂLILE DE OPERAȚIE ȘI IMAGISTICĂ — EXECUȚIE

### PTh-R.9.1 Verificarea în șantier a grosimii de placă

Verificarea de frecvență proprie a planșeului de imagistică, realizată la faza DTAC pe baza grosimii de proiect (25-30 cm, `structura.md` §12.4: `f_n = 12,4 Hz > 8 Hz` minim normat, cu marjă către recomandarea de bună practică de 10 Hz), este condiționată integral de **execuția exactă a grosimii de proiect** — relația `f_n = 18/√δ` folosită la predimensionare este sensibilă la săgeata statică `δ`, care depinde direct de grosimea reală a plăcii. La execuție, această dependență se traduce într-o cerință de control specifică, fără echivalent la restul planșeelor curente ale construcției: măsurarea cotei superioare a cofrajului planșeului de imagistică față de cota inferioară, **înainte de turnare**, cu confirmarea grosimii nominale pe toată suprafața zonei (nu doar punctual), și repetarea măsurătorii după decofrare, pe câteva puncte de control, pentru a confirma absența unor reduceri locale de grosime (de exemplu, la o eventuală deformare a cofrajului sub greutatea betonului proaspăt). Orice abatere constatată în minus față de grosimea de proiect se comunică imediat proiectantului de structuri, pentru reevaluarea frecvenței proprii rezultate și, dacă e necesar, pentru stabilirea unei măsuri corective (de exemplu suplimentarea locală a măsurilor de la §PTh-R.9.2) înainte de continuarea lucrărilor la acel nivel.

### PTh-R.9.2 Execuția dalei flotante pe amortizoare

Măsura constructivă complementară grosimii de placă majorate, dala flotantă pe amortizoare dispusă local sub echipamentele cele mai sensibile (RMN, `structura.md` §12.5), se execută conform secvenței deja detaliate la §PTh-R.8.2 pentru fundația antivibratilă: delimitare prin rost continuu, poziționarea elementelor elastice înainte de turnare, verificarea absenței oricărei punți rigide accidentale peste rostul de decuplare. La execuție, punctul cel mai sensibil la eroare este tocmai această din urmă condiție: un capăt de armătură lăsat neintenționat să traverseze rostul, un reziduu de mortar scurs în rostul de decuplare în timpul turnării zonei adiacente, sau un element de instalații (conductă, cablu) fixat rigid pe ambele părți ale rostului anulează, parțial sau total, funcția de izolare — motiv pentru care controlul vizual al rostului, imediat înainte de acoperirea sa finală (pardoseală, finisaje), constituie un punct de control obligatoriu al PVLA (§PTh-R.12), distinct de verificarea de rezistență a blocului inerțial însuși.

### PTh-R.9.3 Intervalul tehnic de vibrație — verificare prin măsurători de probă

Criteriile VC (Vibration Criteria) menționate în DTAC (`structura.md` §12.3: VC-C, 12,5 µm/s RMS, pentru RMN uzual/CT de rezoluție standard; VC-D, 6,3 µm/s RMS, pentru RMN de înaltă rezoluție) reprezintă un **interval tehnic de referință**, consacrat în practica internațională de proiectare a spațiilor sensibile la vibrații, nu o cerință normativă românească de rang de lege — precizare necesară pentru onestitatea documentației, dat fiind că niciun normativ românesc de construcții nu stabilește explicit aceste praguri. Verificarea încadrării reale în intervalul VC-C ÷ VC-D nu se poate confirma prin calcul la faza de proiectare (depinde de spectrul real de vibrație ambientală al amplasamentului definitiv, de calitatea efectivă a execuției dalei flotante și de caracteristicile exacte ale echipamentului selectat), ci se **măsoară efectiv**, prin încercări de vibrație cu echipament de măsură dedicat (accelerometre/velocimetre de precizie), executate în două etape: (a) o măsurătoare de fond, după finalizarea structurii la roșu și înainte de montajul echipamentului, pentru a confirma nivelul de vibrație ambientală rezidual al planșeului finit; și (b) o măsurătoare de recepție, după montarea completă a echipamentului și punerea sa în funcțiune (inclusiv sursele proprii de vibrație ale echipamentului — ventilatoare de răcire ale magnetului RMN, pompe ale compresorului de aer medical din apropiere), înainte de darea în exploatare clinică, condiție de comisionare (`general.md` §12.1) tratată integral de memoriul de instalații și de proiectantul de echipamente medicale, la care structura contribuie prin execuția corectă și verificată a măsurilor constructive de la §PTh-R.9.1-9.2.

### PTh-R.9.4 Poziționarea echipamentelor mecanice generatoare de vibrații

Coerent cu principiul stabilit în DTAC (`structura.md` §12.5) și cu măsurile de protecție acustică de la `general.md` §14.8, echipamentele mecanice ale clădirii cu potențial de vibrație (pompe ale gospodăriei de apă și ale stației de gaze medicale, grup electrogen, unități exterioare de climatizare de pe terasa tehnică a etajului 1) se poziționează, la faza de coordonare cu instalațiile, cât mai departe posibil de sălile de imagistică și de blocul operator, și se montează pe postamente elastice/izolatoare de vibrație dedicate, indiferent de distanță — dublă măsură (distanță + izolare la sursă) care reduce riscul ca vibrațiile transmise structural de aceste echipamente să se adauge, la nivelul planșeului de imagistică, peste marja deja consumată de sursele de vibrație ambientală generale (trafic exterior, circulație pietonală) considerate la verificarea de frecvență proprie.

---

## PTh-R.10 — EXECUȚIA PENTRU CLASA DE IMPORTANȚĂ I / CATEGORIA A: REGULARITATE, CONTROL SPORIT, URMĂRIRE SPECIALĂ

### PTh-R.10.1 Regularitatea de execuție

Regularitatea structurală confirmată la faza DTAC (`structura.md` §5: regulată în plan și în elevație, fără penalizări ale factorului de comportare) trebuie **menținută la execuție**, nu doar la proiectare: orice abatere semnificativă de execuție care ar introduce o asimetrie nedorită — o poziționare eronată a unui perete structural, o secțiune redusă local la un stâlp de colț, o grosime de planșeu inconsecventă între zone simetrice — ar compromite exact premisa pe care se bazează neaplicarea penalizărilor de q (`structura.md` §5.3). Controlul topografic sistematic al poziției elementelor verticale, la fiecare nivel, față de axele de trasare (§PTh-R.2.1), constituie măsura principală de garantare a regularității de execuție, cu o toleranță de poziționare în plan mai strictă decât cea general admisă pentru o construcție de clasă de importanță III (§PTh-R.11.3).

### PTh-R.10.2 Controlul sporit al calității betonului

Clasele de expunere adoptate pentru beton (`structura.md` §6.1: XC1 la elementele curente, XC2+XA1 la radier/subsol) se dublează, la faza de execuție, de un regim de control **superior** celui aplicabil unei construcții de clasă de importanță III curentă, justificat de clasa de importanță I: (a) frecvență majorată a probelor de rezistență (minimum un set de cuburi/cilindri per etapă de turnare a fiecărui element critic — radier, stâlpi și pereți de la parter/subsol, planșeu de imagistică —, nu doar prin sondaj statistic generic pe volum); (b) verificarea explicită, la fiecare livrare de beton pentru elementele critice, a rapoartelor A/C și a dozajului de ciment, prin certificatele stației de betoane, în completarea testului de tasare la punerea în operă; (c) epruvete martor suplimentare, păstrate în condiții identice cu elementul real, pentru elementele a căror decofrare sau a căror continuare a execuției depinde de atingerea unui procent explicit din rezistența de proiect (decofrarea stâlpilor înainte de încărcare, §PTh-R.4.5; atingerea rezistenței minime pentru montajul echipamentelor grele, §PTh-R.8).

### PTh-R.10.3 Turnarea continuă la elementele critice

Elementele declarate critice prin concepția structurală — radierul general (integral, dat fiind rolul său dublu de fundație și de cuvă etanșă, §PTh-R.2.5), zonele de bază ale pereților structurali și nucleelor (bulbii confinați, §PTh-R.6.3) și blocul inerțial al fundației antivibratile RMN (§PTh-R.8.2) — se toarnă, pe cât permite organizarea de șantier, **fără întrerupere** pe toată secțiunea elementului, evitând rosturi de lucru intermediare în zonele unde acestea ar compromite fie etanșeitatea (radier), fie continuitatea confinării (bulbi), fie omogenitatea masei inerțiale (bloc RMN). Unde un rost de lucru este totuși inevitabil din motive de organizare (volum de beton care depășește capacitatea de turnare continuă într-o singură zi de lucru), acesta se poziționează exclusiv conform regulilor de la §PTh-R.2.5 (radier) și §PTh-R.6.1 (grinzi/planșee), niciodată în interiorul unei zone critice de confinare sau a blocului inerțial.

### PTh-R.10.4 Programul de urmărire specială în timp (P130/1999)

Încadrarea în categoria de importanță A atrage obligativitatea urmăririi speciale a comportării construcției în timp (P130/1999), cu program de monitorizare superior celui aplicabil unei construcții de categorie C (`general.md` §1.4, §10.1). Prezentul supliment de execuție reține, ca puncte de coordonare cu acest program — a cărui metodologie completă (frecvența măsurătorilor, poziția și tipul instrumentației) revine documentului dedicat de urmărire în timp, elaborat distinct, la faza PT, de proiectantul de structuri —, necesitatea de a **prevedea la execuție** eventualele repere fixe de monitorizare topografică (mărci de tasare pe radier și pe pereții de subsol, mărci de deplasare la ultimul nivel, dacă programul de urmărire adoptă instrumentare topografică) și, dacă proiectul de urmărire în timp o impune, poziționarea de senzori (extensometre, înclinometre) integrați în elementele structurale critice (radier, bază pereți structurali) **înainte de turnare**, la pozițiile comunicate de proiectantul programului de urmărire — condiție de coordonare analogă celei aplicate la ancorele echipamentelor medicale (§PTh-R.8), care nu se poate suplini printr-o instalare ulterioară fără afectarea integrității elementului. Decizia finală privind necesitatea și tipul exact de instrumentare (monitorizare pur topografică, suficientă pentru majoritatea construcțiilor de categorie A, sau instrumentare senzorială permanentă, rezervată situațiilor cu risc geotehnic sau structural deosebit) revine proiectantului de structuri, în corelare cu categoria geotehnică 3 a amplasamentului (`general.md` §5.4).

---

## PTh-R.11 — TOLERANȚE DE EXECUȚIE

### PTh-R.11.1 Verticalitatea stâlpilor și pereților

Verticalitatea stâlpilor (60×60 cm etaje curente, 70×70 cm subsol/parter) și a pereților structurali/nucleelor se verifică la fiecare nivel, prin fir cu plumb sau stație totală, față de abaterile admise de practica de execuție a structurilor de beton armat (categoria de toleranțe curentă pentru elemente verticale de clădiri civile/de sănătate, aplicabilă atât la elementul individual cât și la abaterea cumulată pe toată înălțimea construcției). Dat fiind regimul de control execuție nivel III impus de clasa de importanță I (§PTh-R.10, `structura.md` §17.2), verificarea verticalității nu se limitează la un control final la structura la roșu, ci se realizează **la fiecare nivel**, imediat după decofrare, pentru a permite corectarea eventualelor abateri înainte ca acestea să se cumuleze pe niveluri succesive — o abatere mică, necorectată la un nivel, se poate amplifica vizual și structural pe măsură ce construcția se ridică, motiv pentru care controlul progresiv, nivel cu nivel, este superior unui control unic la finalul structurii.

### PTh-R.11.2 Planeitatea planșeelor — cerință specială la sălile de operație/imagistică

Planeitatea generală a planșeelor construcției se verifică prin control cu regla/dreptarul, conform practicii curente de execuție a structurilor de beton armat monolit. La planșeele blocului operator și ale departamentului de imagistică, planeitatea capătă însă o **relevanță funcțională suplimentară**, dincolo de cea structurală: mesele de operație și mobilierul mobil pe roți al blocului operator, cărucioarele de transport al pacienților critici și, la imagistică, poziționarea de precizie a paturilor/brancardelor la interfața cu echipamentul, necesită o suprafață de bază cât mai plană, pentru a evita atât dificultăți de manevrare, cât și vibrații suplimentare induse de trecerea peste denivelări locale ale pardoselii de finisaj (denivelări care, la rândul lor, provin din denivelări ale planșeului structural suport). Pentru aceste zone, **se recomandă**, ca cerință de bună practică de execuție stabilită de comun acord cu proiectantul de arhitectură și cu specialistul de echipamente medicale la faza PT — nu ca literă a unui normativ specific de rezistență inexistent —, o planeitate superioară celei general acceptate pentru restul construcției, verificată printr-un control mai dens (interval de măsurare redus) și cu o abatere admisă redusă proporțional; valoarea exactă a acestei toleranțe majorate se stabilește explicit în caietul de sarcini de execuție al fazei PT, corelată cu cerințele producătorului echipamentelor selectate (mese de operație, CT, RMN), nu se prescrie generic în prezentul document.

### PTh-R.11.3 Cotele de nivel

Cota fiecărui planșeu se verifică topografic la finalizarea turnării, față de cota de proiect stabilită de la cota de fundare a radierului (§PTh-R.2.1), cu o atenție particulară la interfața dintre corpul de bază și corpul de spitalizare retras (§PTh-R.5.2), unde eventuale abateri cumulate ale cotei ar afecta racordul dintre terasa tehnică a etajului 1 și baza corpului de spitalizare de deasupra, și la interfața dintre planșeul curent și planșeul de imagistică majorat local (§PTh-R.4.3), unde cota superioară finită trebuie să rămână continuă în ciuda diferenței de grosime structurală dintre cele două zone.

### PTh-R.11.4 Acoperirea cu beton a armăturii

Acoperirea de beton, diferențiată pe clase de expunere (35 mm elemente curente, 45-50 mm radier/subsol, `structura.md` §6.3), se verifică prin control cu șablon calibrat, înainte de fiecare turnare, cu o atenție suplimentară la zonele de confinare densă (§PTh-R.6.2-6.3), unde congestia de armătură (§PTh-R.6.4) poate împinge accidental etrierii mai aproape de cofraj decât proiectul o permite — verificare care se face, la aceste zone, punct cu punct, nu prin sondaj statistic, dat fiind rolul dublu al acoperirii: protecția armăturii pe durata de exploatare (durabilitate, `structura.md` §6.4) și rezistența la foc tabelară a elementului (grad de rezistență la foc I, `structura.md` §6.3), ambele condiționate direct de respectarea acoperirii de proiect.

---

## PTh-R.12 — PLANUL DE CONTROL AL CALITĂȚII (PVLA — PUNCTE DE VERIFICARE A LUCRĂRILOR ASCUNSE)

| Nr. | Punct de verificare | Criterii de acceptanță | Referință |
|---|---|---|---|
| PVLA-1 | Trasarea și verificarea cotei de fundare | Concordanță cu studiul geotehnic (categorie 3); cota −4,25 m; nivel hidrostatic real confirmat | §PTh-R.2.1 |
| PVLA-2 | Armătura radierului general, înainte de turnare | Poziție/diametre conform caiet de armare; acoperire 45-50 mm; poziția armăturii de străpungere; poziția manșoanelor de trecere instalații fără intersectare cu armătura critică | §PTh-R.2.4 |
| PVLA-3 | Poziționarea profilului waterstop la toate rosturile radierului | Poziție centrată, fixare rigidă pe armătură, fără deplasare la turnare | §PTh-R.3.3 |
| PVLA-4 | Hidroizolația radierului și a pereților de subsol, înainte de acoperire | Continuitate fără întrerupere; suduri termice complete la cusături; strat de protecție mecanică aplicat | §PTh-R.3.2 |
| PVLA-5 | Manșoanele etanșe la traversările de instalații prin radier/pereți de subsol | Poziție conformă planului de coordonare; etanșare completă; fără intersectare cu armătura critică | §PTh-R.3.4 |
| PVLA-6 | Proba de etanșeitate a cuvei subsolului tehnic | Absența oricărei urme de umiditate/infiltrație pe durata de observare stabilită | §PTh-R.3.5 |
| PVLA-7 | Armătura stâlpilor/pereților/nucleelor, înainte de turnare (fiecare nivel) | Poziție/diametre conform caiet de armare; confinare la pas redus în zonele critice; continuitate cu armătura nivelului inferior; acoperire conform clasei de expunere | §PTh-R.4.1, §PTh-R.6 |
| PVLA-8 | Armătura planșeelor (curent/bloc operator/imagistică), înainte de turnare | Poziție/diametre conform caiet de armare; grosime de placă confirmată prin măsurare cotă cofraj la imagistică; acoperire conform clasei de expunere | §PTh-R.4.3, §PTh-R.9.1 |
| PVLA-9 | Recepția calitativă a betonului | Rezultate probe (cuburi/cilindri) la 7/28 zile conform NE 012; consistență la punerea în operă conform clasei prescrise | §PTh-R.2.5, §PTh-R.10.2 |
| PVLA-10 | Goluri de trecere pentru rețeaua de gaze medicale, înainte de turnare | Poziție/dimensiune conform planul de coordonare avizat de proiectantul de structuri; respectarea zonelor interzise (bulbi confinați, treimi de capăt grinzi, colector diafragmă) | §PTh-R.7 |
| PVLA-11 | Fundația antivibratilă a sălii de RMN, înainte de acoperire | Rost de decuplare continuu, fără punți rigide accidentale; elemente elastice poziționate conform proiect, cu certificat de rigiditate `k`; ancoraje cuștii Faraday poziționate conform furnizor | §PTh-R.8.2, §PTh-R.9.2 |
| PVLA-12 | Inserții/ancoraje pentru echipamente grele (CT, RMN, angiograf, mese de operație), înainte de turnare | Poziție conformă documentației tehnice a furnizorului; verificare la forfecare/smulgere conform calcul PT | §PTh-R.8 |
| PVLA-13 | Verificarea structurală a zonelor de reazem ale echipamentelor grele, înainte de montajul echipamentului | Rezistență beton confirmată (procent minim din fck); poziție și integritate ancoraje; absența degradărilor de execuție vizibile | §PTh-R.8, §PTh-R.10.3 |
| PVLA-14 | Verticalitatea și cotele de nivel, la fiecare etaj | Abateri în limitele toleranțelor de execuție adoptate | §PTh-R.11.1, §PTh-R.11.3 |
| PVLA-15 | Repere/instrumentație pentru urmărirea specială în timp (dacă prevăzută), înainte de turnare | Poziție conform proiectul de urmărire în timp, integritate senzori după turnare | §PTh-R.10.4 |

Toate punctele PVLA de mai sus se consemnează în proces-verbal de verificare a lucrărilor ascunse, semnat de proiectant, diriginte de șantier și constructor, condiție obligatorie pentru continuarea lucrărilor la elementul respectiv; neîndeplinirea unui criteriu de acceptanță blochează avansul execuției până la remediere și reverificare.

---

## PTh-R.13 — FAZE DETERMINANTE

| Nr. | Faza determinantă | Verificări/criterii | Participanți |
|---|---|---|---|
| FD1 | Natura terenului de fundare (cota −4,25 m, pe toată amprenta radierului) | Confruntare cu studiul geotehnic definitiv; categoria geotehnică 3 confirmată; absența pungilor slabe; poziția reală a nivelului hidrostatic | Geotehnician, proiectant, diriginte, constructor, ISC |
| FD2 | Armarea radierului general, înainte de turnare | Conformitate PVLA-2; poziționare corectă waterstop (PVLA-3) | Proiectant, diriginte, constructor, ISC |
| FD3 | Hidroizolația infrastructurii, înainte de acoperire | Conformitate PVLA-4, PVLA-5 | Proiectant, diriginte, constructor |
| FD4 | Proba de etanșeitate a cuvei subsolului tehnic | Conformitate PVLA-6, condiție prealabilă montajului echipamentelor tehnice | Proiectant, diriginte, constructor |
| FD5 | Structura la roșu a nivelului parter/etajul 1, înainte de fixarea inserțiilor pentru echipamente grele | Rezistență beton confirmată; poziție inserții conform documentației furnizorilor de echipamente | Proiectant, diriginte, constructor, ISC |
| FD6 | Realizarea fundației antivibratile dedicate zonei RMN | Verificarea poziționării elementelor elastice, a masei inerțiale și a golurilor pregătite pentru cușca Faraday, înainte de finisarea sălii | Proiectant, diriginte, constructor |
| FD7 | Armarea și turnarea planșeelor din zona de imagistică și a blocului operator | Verificarea grosimii efective turnate (25-30 cm imagistică, 18 cm bloc operator) și a poziției armăturii | Proiectant, diriginte, constructor, ISC |
| FD8 | Verificarea zonelor de reazem ale echipamentelor grele, înainte de montajul echipamentului | Conformitate PVLA-13 | Proiectant, diriginte, constructor, furnizor echipament |
| FD9 | Armarea și turnarea planșeelor curente ale etajelor de spitalizare | Verificare standard, similară fiecărui nivel | Proiectant, diriginte, constructor |
| FD10 | Măsurătoarea de fond a vibrațiilor la sălile de imagistică, după structura la roșu | Conformitate cu intervalul tehnic de referință VC-C÷VC-D, înainte de montajul echipamentului | Proiectant, diriginte, constructor, specialist vibrații |
| FD11 | Structura la roșu finalizată (ansamblu) | Conformitate geometrică generală; toate PV-urile de fază determinantă și rapoartele de încercare arhivate | Proiectant, diriginte, constructor, ISC |

La fiecare fază determinantă: convocare cu minimum 10 zile înainte, întocmirea procesului-verbal de fază determinantă, condiție obligatorie pentru continuarea lucrărilor; neîndeplinirea criteriilor blochează avansul până la remediere și reverificare — regim identic celui aplicat la fazele determinante generale ale construcțiilor de clasă de importanță I (`structura.md` §17.1), extins aici cu punctele specifice unei unități medicale (FD4, FD6, FD8, FD10), fără echivalent la o clădire civilă obișnuită.

---

## PTh-R.14 — CORELAREA CU ARHITECTURA ȘI CU INSTALAȚIILE

### PTh-R.14.1 Compartimentarea rezistentă la foc

Gradul de rezistență la foc I, cu evacuare orizontală pe compartimente pentru pacienții imobilizați (`general.md` §14.1), impune ca fiecare secție să fie separată în minimum două compartimente rezistente la foc (REI), condiție care se materializează, în bună măsură, chiar prin pereții structurali și nucleele de circulație ale sistemului dual (`structura.md` §4) — aceștia, prin grosimea lor (30-40 cm) și prin acoperirea de beton adoptată (35-50 mm, `structura.md` §6.3, verificată tabelar la foc conform SR EN 1992-1-2), ating cu marjă clasele de rezistență la foc R120-180 impuse elementelor portante, fără protecție suplimentară. Coordonarea structurii cu compartimentarea la foc constă, la execuție, în: verificarea ca poziția reală a pereților structurali (care servesc, în multe cazuri, și ca perete de compartimentare REI între cele două compartimente ale unei secții) să coincidă exact cu linia de compartimentare stabilită de scenariul de securitate la incendiu; și în etanșarea la foc a tuturor traversărilor prin acești pereți (§PTh-R.7.6), astfel încât integritatea la foc a compartimentării să nu fie compromisă de o traversare de instalații executată fără etanșare corespunzătoare.

### PTh-R.14.2 Finisajele pe elementele structurale vizibile

În zonele unde elementele structurale rămân parțial vizibile sau primesc finisaj direct (parcajul de la subsol, casele de scări, eventual anumite zone tehnice), suprafața de beton a stâlpilor, pereților și planșeelor se execută cu o calitate de finisare corespunzătoare tipului de finisaj ulterior prevăzut de arhitectură (beton aparent, tencuială direct pe beton, vopsea de rezistență chimică la zonele tehnice cu expunere la agenți de curățenie/dezinfectanți) — cerință de coordonare care revine cofrajului utilizat (panouri cu suprafață adecvată, tratamente demulante compatibile cu finisajul ulterior) și care se stabilește explicit în caietul de sarcini de execuție al fazei PT, în corelare cu memoriul de arhitectură.

### PTh-R.14.3 Integrarea traseelor verticale de gaze medicale și electrice

Nucleul central de circulație, care aliniază, conform concepției de ansamblu (`general.md` §6.2), circulațiile, grupurile sanitare și ghenele de instalații, constituie și traseul preferat al coloanelor verticale principale de gaze medicale și electrice (redundanță, `general.md` §11.2). Coordonarea structurală a acestei integrări — deja tratată la nivel de goluri și trasee la §PTh-R.7.5 — se completează, la interfața cu arhitectura, prin poziționarea corectă a ușilor/trapelor de acces la ghenele tehnice pe fiecare nivel (pentru mentenanța prevăzută la `general.md` §18.3), care nu trebuie să intersecteze zonele de armătură de contur ale golurilor structurale (§PTh-R.7.2) și nici zonele critice ale pereților/nucleelor adiacente (§PTh-R.6.3).

---

## PTh-R.15 — ORGANIZAREA EXECUȚIEI ȘI EXTRAS ORIENTATIV DE CANTITĂȚI

### PTh-R.15.1 Etapizarea execuției structurii

| Etapă | Conținut | Observație |
|---|---|---|
| 1 | Organizare de șantier, împrejmuire, platforme | — |
| 2 | Terasamente, sprijiniri (categorie geotehnică 3), epuisment inițial | §PTh-R.2.2 |
| 3 | Radier general (cofrare, armare, betonare) | §PTh-R.2.3-2.5 |
| 4 | Hidroizolația infrastructurii și pereții de subsol | §PTh-R.3 |
| 5 | Proba de etanșeitate a cuvei | §PTh-R.3.5 — condiționează etapa 9 |
| 6 | Suprastructura corpului de bază (subsol-parter-etajul 1), inclusiv fundația antivibratilă RMN și planșeele de imagistică/bloc operator | §PTh-R.4, §PTh-R.8 |
| 7 | Suprastructura corpului de spitalizare (etajele 2-4) | §PTh-R.4.2 |
| 8 | Anvelopă și închideri | — (memoriu arhitectură) |
| 9 | Montaj echipamente tehnice în subsol (condiționat de FD4/etapa 5) | — (memoriu instalații) |
| 10 | Instalații generale și instalații speciale (gaze medicale, tratare aer critică, ecranare) | coordonare §PTh-R.7 |
| 11 | Măsurătoare de fond vibrații imagistică (FD10) | §PTh-R.9.3 |
| 12 | Montaj echipamente medicale grele (CT, RMN, angiograf, mese de operație) | condiționat de FD8 |
| 13 | Măsurătoare de recepție vibrații + comisionare instalații speciale | §PTh-R.9.3, `general.md` §12.1 |
| 14 | Recepție, PIF | — |

Această etapizare, coerentă cu eșalonarea de principiu stabilită în `general.md` §16 (durată de execuție estimată 26-32 luni), evidențiază condiționările specifice unei unități medicale, absente la o construcție civilă obișnuită: proba de etanșeitate a cuvei (etapa 5) condiționează montajul echipamentelor tehnice vitale (etapa 9), iar măsurătoarea de fond a vibrațiilor (etapa 11) trebuie finalizată **înainte** de montajul echipamentelor de imagistică (etapa 12), pentru a permite o eventuală remediere a măsurilor constructive de izolare la vibrații fără a afecta un echipament deja instalat.

### PTh-R.15.2 Extras orientativ de cantități

Cantitățile de mai jos au caracter **orientativ**, derivate din geometria de referință și din dimensiunile elementelor stabilite în DTAC (`structura.md`); ele se confirmă și se rafinează prin antemăsurătoarea definitivă întocmită pe planurile de cofraj/armare ale fazei PT, singurele documente cu valoare contractuală de cantități:

| Element | Estimare orientativă | Observație |
|---|---|---|
| Radier general (amprentă ≈ 1.008 mp, grosime medie efectivă ≈ 1,05 m) | ≈ 1.060 mc beton C30/37 | include zonele curente (90 cm) și îngroșate (120-150 cm) |
| Pereți de subsol (contur + 2 nuclee, h ≈ 4,0 m) | ≈ 280 mc beton C30/37 | orientativ, funcție de dezvoltarea exactă a nucleelor |
| Stâlpi subsol/parter (70×70 cm) | ordinul a 25-30 buc./nivel, h ≈ 3,8-4,5 m | C35/45 |
| Stâlpi etaje curente (60×60 cm) | ordinul a 25-30 buc./nivel, h ≈ 3,6 m | C30/37 |
| Pereți structurali/nuclee (30-40 cm) | continui pe toată înălțimea (6 niveluri) | C35/45 la bază, C30/37 curent |
| Planșee curente (15 cm) | ≈ 1.000 mp/nivel × 4 niveluri (parter parțial + etaje spitalizare) | C30/37 |
| Planșeu bloc operator/ATI/imagistică (18-30 cm, etajul 1) | ≈ 1.000 mp | C30/37, grosime variabilă pe zone |
| Armătură BST500C, consum mediu estimativ | ordinul a 110-130 kg/mc beton structural | analog altor structuri duale cu zone critice, `structura.md` §15 |

Aceste valori nu înlocuiesc extrasul de cantități definitiv al fazei PT, ci oferă un reper de ordin de mărime pentru organizarea aprovizionării și a graficului de execuție la momentul demarării șantierului.

---

## PTh-R.16 — RECAPITULARE FINALĂ, CHECKLIST PTh ȘI CONCLUZIE INGINEREASCĂ

### PTh-R.16.1 Checklist de conformitate al prezentului supliment PTh

| Cerință DTAC | Detaliere PTh | Stare |
|---|---|---|
| Radier general pe cuvă etanșă (`structura.md` §13.1) | Execuție infrastructură + hidroizolație detaliate (§PTh-R.2, §PTh-R.3) | ✓ |
| Continuitate verticală integrală, fără transfer (`structura.md` §1.2, §4.3) | Secvență de execuție pe niveluri + justificarea absenței rosturilor (§PTh-R.4.2, §PTh-R.5) | ✓ |
| Confinare DCM la zonele critice (`structura.md` §15) | Detalii de armare la noduri critice — execuție (§PTh-R.6) | ✓ |
| Ancorarea seismică a echipamentelor medicale (`structura.md` §16) | Fundații/planșee dedicate CT/RMN/angiograf + inserții de ancorare (§PTh-R.8) | ✓ |
| Vibrații imagistică (`structura.md` §12) | Verificare la execuție + măsurători de probă (§PTh-R.9) | ✓ |
| Clasa de importanță I — control execuție nivel III (`structura.md` §2.4, §17.2) | Regularitate, control beton sporit, turnare continuă, urmărire specială (§PTh-R.10) | ✓ |
| Fazele determinante (`structura.md` §17.1) | Extinse cu punctele specifice unei unități medicale (§PTh-R.12, §PTh-R.13) | ✓ |
| Coordonare cu gazele medicale (memoriu general/instalații) | Goluri și trasee prin elemente structurale, reguli pe categorie de element (§PTh-R.7) | ✓ |
| Coordonare cu compartimentarea RF și finisajele (memoriu arhitectură) | §PTh-R.14.1, §PTh-R.14.2 | ✓ |

### PTh-R.16.2 Concluzie inginerească

Sistemul structural al unității medicale analizate (S+P+4E, categorie de importanță A, clasă de importanță și expunere seismică I, γI,e = 1,40), stabilit și verificat integral la predimensionare în faza DTAC (`structura.md`) — sistem dual de beton armat monolit, cu pereți structurali predominanți, continuu pe toată înălțimea, pe infrastructură de radier general — a fost **detaliat la nivel de execuție** în prezentul supliment PTh: secvența și tehnologia de execuție a infrastructurii (trasare, sprijiniri, radier, hidroizolația cuvei etanșe) și a suprastructurii (cofrare, armare, betonare, decofrare pe categorii de elemente), justificarea absenței rosturilor de dilatare/seismice pentru corpul unic compact și tratarea execuției retragerii de volum, detaliile de execuție ale confinării seismice la nodurile critice, coordonarea structurală explicită cu rețeaua de gaze medicale (goluri și trasee, reguli de aviz obligatoriu) și cu echipamentele medicale grele (CT, RMN, angiograf, accelerator liniar, mese de operație), controlul de execuție al vibrațiilor planșeelor de imagistică, regimul de execuție specific clasei de importanță I (control sporit, turnare continuă, urmărire specială în timp), toleranțele de execuție, planul de control al calității cu punctele de verificare a lucrărilor ascunse, fazele determinante extinse cu particularitățile unei unități sanitare, și corelarea cu arhitectura și cu instalațiile.

Această detaliere **nu modifică** nicio decizie de concepție structurală sau vreo valoare de calcul stabilită în DTAC — nu se recalculează forța seismică de bază, drift-ul, factorul de comportare sau capacitatea elementelor —, ci aduce soluția deja verificată la nivelul de precizie constructivă necesar execuției efective în șantier, cu accent specific pe particularitățile care disting o unitate medicală de clasă de importanță I de orice altă clădire civilă tratată în biblioteca de memorii a acestei platforme: cerința de etanșeitate absolută a subsolului tehnic (gospodărie de apă, stație de gaze medicale), coordonarea structurii cu o rețea de instalații speciale densă și critică pentru siguranța pacientului, ancorarea seismică explicită a unor echipamente de valoare foarte mare și sensibile la vibrații, și un regim de control al execuției superior, justificat de responsabilitatea unei construcții care trebuie să rămână funcțională imediat post-seism.

Prezenta documentație de execuție se supune, la fel ca DTAC-ul pe care îl detaliază, verificării tehnice de către verificatori de proiecte atestați MDLPA pentru cerințele **A1** (rezistență și stabilitate, beton armat), **Af** (rezistență și stabilitate a terenului de fundare/geotehnic) și **C** (securitate la incendiu, rezistență la foc a elementelor structurale, corelată cu scenariul de siguranță la incendiu), cu control de execuție **nivel III**, impus de clasa de importanță I, și cu fazele determinante avizate de Inspectoratul de Stat în Construcții (ISC). Planurile de cofraj/armare definitive, extrasul de cantități contractual și breviarul complet de execuție (rețete de beton, fișe tehnologice detaliate pe categorie de element) se elaborează, pe baza soluțiilor confirmate în prezentul supliment, la faza de Detalii de Execuție (DE), în coordonare finală cu proiectul de instalații (`instalatii-pth.md`), cu proiectul de arhitectură și cu documentația tehnică definitivă a furnizorilor de echipamente medicale grele.

---

*Prezentul supliment de fază PTh-Rezistență completează faza DTAC (`structura.md`) a documentației pentru unitatea medicală (spital privat/clinică multifuncțională, S+P+4E, 90 paturi) și se citește împreună cu planșele de cofraj/armare ale fazei PT+DE și cu Caietul de sarcini pentru structuri de beton armat (document distinct). Toate valorile numerice sunt preluate identic din `structura.md` și din `general.md` ale aceleiași documentații DTAC, fără recalculare — obiectul prezentului document este exclusiv nivelul de detaliere necesar execuției. Programul funcțional medical (circuite septic/aseptic, dimensionarea saloanelor, a blocului operator și a ATI), finisajele și accesibilitatea sunt tratate în memoriul de arhitectură; dimensionarea instalațiilor (gaze medicale, HVAC de presiune controlată, electrice inclusiv UPS/generatoare, curenți slabi) în memoriul de instalații și în suplimentul său de fază PTh; scenariul de securitate la incendiu și clasele de rezistență la foc, în studiul de siguranță la incendiu (SSI) dedicat — documente care nu se dublează în prezentul supliment.*
