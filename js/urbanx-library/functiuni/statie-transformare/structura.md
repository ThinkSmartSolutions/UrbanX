# Memoriu Tehnic de Rezistență (DTAC) — Stație de transformare 110/20 kV

**Patru obiecte de construcție distincte, cu comportări structurale fundamental diferite, reunite într-o singură incintă tehnologică — fundație masivă de beton armat pentru transformatorul de putere (bloc anti-vibrații), cadre metalice zincate zvelte (portale de linie și de aparataj 110 kV), clădire de comandă cu structură obișnuită de cadre de beton armat, și cuvă de retenție a uleiului electroizolant, monolită și hidroizolată. Infrastructură pe fundații directe, dimensionate distinct pentru fiecare obiect, conform studiului geotehnic.**

> Prezentul memoriu constituie piesa scrisă de rezistență a documentației tehnice pentru autorizarea executării lucrărilor de construire (DTAC) a unei stații electrice de transformare 110/20 kV, întocmit conform Legii nr. 10/1995 privind calitatea în construcții (republicată), a HG nr. 907/2016 privind conținutul-cadru al documentațiilor tehnico-economice și a Ordinului MDRAP nr. 839/2009 (Normele metodologice de aplicare a Legii nr. 50/1991). Nivelul de detaliere corespunde fazei DTAC, cu prefigurarea și justificarea soluției de rezistență pentru fiecare dintre cele patru obiecte de construcție ale stației; calculul complet (model de interacțiune fundație-teren, analiză dinamică a suporților de echipamente, breviar de calcul definitiv, planuri de cofraj/armare, detalii de execuție și de montaj) se dezvoltă la fazele PT + DE, în strânsă corelare cu proiectul tehnologic de instalații electrice (care stabilește geometria exactă a echipamentelor, gabaritele de izolație și schema unifilară). Toate valorile numerice de mai jos sunt calcule de predimensionare/verificare, lucrate pentru justificarea soluției adoptate; ele nu se substituie calculului de proiect tehnic și nici verificării tehnice atestate. Prezentul document tratează exclusiv rezistența mecanică și stabilitatea (cerința fundamentală A) a construcțiilor civile/metalice ale stației; proiectul tehnologic electric (transformatoare, celule de comutație, protecții, automatizări, dimensionarea aparataj primar/secundar) constituie documentație de specialitate distinctă, care nu se dublează aici — prezentul memoriu preia din acel proiect doar datele strict necesare încărcării structurilor (greutăți de echipamente, tracțiuni de conductor, gabarite de izolație) și le citează explicit ca atare, la fiecare capitol relevant.

---

## 1. Date generale și scopul lucrării

### 1.1. Obiectul documentației. Cele patru obiecte de construcție

Stația de transformare 110/20 kV analizată în prezentul memoriu este o incintă tehnologică electroenergetică, destinată transformării energiei electrice din rețeaua de înaltă tensiune (110 kV) în rețeaua de medie tensiune (20 kV) de distribuție, echipată cu unul sau mai multe transformatoare de putere, aparataj de comutație și protecție de 110 kV (întreruptoare, separatoare, transformatoare de măsură), celule de medie tensiune în clădirea de comandă, și instalațiile auxiliare aferente (servicii proprii, protecție prin relee, telecomunicații, priză de pământ). Spre deosebire de o clădire civilă obișnuită — unde întreaga temă de proiectare structurală se concentrează, de regulă, într-un singur corp de construcție cu o comportare structurală relativ omogenă pe toată extinderea sa —, stația de transformare este alcătuită, prin însăși natura procesului tehnologic pe care îl adăpostește, din **patru obiecte de construcție distincte**, amplasate separat în incintă, cu funcțiuni, geometrii, materiale și — esențial pentru prezentul memoriu — **comportări structurale fundamental diferite**:

1. **Fundația transformatorului de putere** — un bloc masiv de beton armat, cu rol dublu: reazem static pentru un echipament greu (ordinul zecilor de tone) și, simultan, element de amortizare/limitare a transmiterii vibrațiilor generate de funcționarea electromagnetică a transformatorului către mediul înconjurător și către clădirea de comandă alăturată. Comportarea sa dominantă este **statică, de masă mare** — obiectul funcționează corect tocmai pentru că este greu, rigid și amortizat, nu pentru că este suplu sau ductil;
2. **Portalele metalice de 110 kV** (cadre de susținere a conductoarelor de linie și a echipamentelor de aparataj primar — separatoare, transformatoare de curent/tensiune, descărcătoare) — structuri metalice zvelte, de înălțime medie (8–14 m), dimensionate în primul rând pentru acțiuni climatice (vânt, chiciură) și pentru tracțiunea mecanică a conductoarelor electrice pe care le susțin. Comportarea lor dominantă este **dinamică și de zveltețe**, opusă radical fundației masive de la punctul 1;
3. **Clădirea de comandă** — o construcție civilă obișnuită, cu structură de cadre de beton armat, care adăpostește celulele de medie tensiune, tablourile de protecție și automatizare, camera de comandă și dispecerizare, și eventual servicii proprii și grup electrogen. Comportarea sa este cea a unei **clădiri civile obișnuite** (adăpost, protecție a personalului și a echipamentelor sensibile), analoagă, structural, oricărei construcții industriale/administrative de mici dimensiuni;
4. **Cuva de retenție a uleiului electroizolant** — o construcție hidrotehnică de beton armat, monolită, sub cuva transformatorului, dimensionată să colecteze integral uleiul electroizolant în cazul unei avarii sau al unui incendiu al transformatorului. Comportarea sa dominantă este **etanșeitatea** — un rezervor îngropat parțial, verificat la fisurare controlată și la stabilitate hidraulică (plutire), cu cerințe care nu au niciun echivalent la celelalte trei obiecte.

Tabelul următor sintetizează datele generale ale celor patru obiecte și încadrarea lor normativă:

| Element | Valoare |
|---|---|
| Obiect 1 — Fundație transformator | bloc masiv b.a., echipament 40–80 t (exemplu de calcul: **70 t**) |
| Obiect 2 — Portale metalice 110 kV | cadre metalice zincate, H = 8–14 m, susținere conductoare + aparataj primar |
| Obiect 3 — Clădire de comandă | cadre b.a. + planșee, regim P sau P+1, adăpost celule MT + dispecer |
| Obiect 4 — Cuvă retenție ulei | b.a. hidrotehnic etanș, V ≥ 100% volum ulei transformator |
| Categoria de importanță | **B** (clădirea de comandă și fundația transformatorului); **C** pentru anexele nestrategice |
| Clasa de importanță și expunere seismică | **II**, `γI,e = 1,20` (infrastructură energetică strategică + echipament greu, fragil) |
| Categoria geotehnică | **2** (NP 074/2022) |
| Durata de viață proiectată | **50 de ani** (SR EN 1990, clasa de durabilitate a proiectării S4) |
| Clasa de expunere beton | **XC2** (fundații îngropate), **XC4/XF1** (elemente suprateran expuse la ciclu îngheț-dezgheț), **XA1-2 + etanșeitate dedicată** (cuvă ulei) |

**Precizare de metodologie.** Datele numerice folosite ca exemplu de calcul în tot cuprinsul memoriului (greutatea de 70 t a transformatorului, dimensiunile portalelor, volumul cuvei etc.) corespund unei stații de transformare 110/20 kV de capacitate medie (un transformator de 40 MVA), reprezentativă pentru marea majoritate a stațiilor de distribuție din rețeaua electrică românească; pentru o stație cu parametri electrici diferiți (putere nominală mai mare/mai mică, număr diferit de transformatoare, tensiuni diferite), toate calculele din prezentul memoriu se recalculează proporțional cu datele reale ale proiectului tehnologic de instalații electrice, regula de recalculare fiind identică ca metodologie.

### 1.2. De ce cele patru obiecte nu pot fi tratate cu aceeași abordare structurală

Diferența dintre cele patru obiecte de construcție ale stației nu este una de detaliu constructiv, ci una de **principiu de proiectare**. Fiecare obiect este guvernat, în proiectarea sa, de o cu totul altă mărime fizică dominantă, iar tratarea lor cu un breviar de calcul unic — așa cum s-ar putea proceda, eronat, dintr-o dorință de simplificare a documentației — ar conduce fie la o structură subdimensionată la obiectul cu adevărat critic (portalele, la acțiunea de tracțiune a conductoarelor, sau cuva, la plutire), fie la un supracost nejustificat la obiectul unde rezerva de capacitate provine, de fapt, dintr-o altă cerință (fundația transformatorului, unde gradul de utilizare redus la presiunea pe teren nu este o "risipă" de material, ci o condiție funcțională explicită, cap. 5.3).

**Fundația transformatorului — comportare de "masiv static".** Mărimea dominantă este **masa**. Cu cât fundația este mai grea și mai rigidă, cu atât ea își face mai bine treaba: limitează tasările diferențiate sub un echipament sensibil la denivelare (bobinajele și izolația internă a transformatorului pot fi afectate de o înclinare chiar mică a cuvei), și — la fel de important — limitează amplitudinea vibrațiilor mecanice generate de fenomenul de magnetostricțiune din miezul feromagnetic al transformatorului (cap. 5.4), evitând transmiterea lor către teren și, prin teren, către clădirea de comandă alăturată sau către fundațiile portalelor vecine. Nu există, la acest obiect, nicio cerință de ductilitate sau de deformabilitate controlată — dimpotrivă, orice flexibilitate suplimentară a sistemului fundație-teren este nedorită, pentru că ar coborî frecvența proprie a sistemului mai aproape de frecvența de excitație a vibrațiilor (cap. 5.4).

**Portalele metalice — comportare de "structură zveltă, dominată de acțiuni orizontale variabile".** Mărimea dominantă este **suplețea controlată sub acțiuni climatice și mecanice repetitive**. Un portal de 110 kV este, prin definiție funcțională, o structură înaltă și zveltă (trebuie să susțină conductoarele la o înălțime suficientă pentru asigurarea distanțelor de izolație și de gabarit față de sol, cap. 10), expusă integral acțiunii vântului direct pe structura metalică și — mai puțin intuitiv, dar adesea dimensionant — acțiunii **indirecte** a vântului și a chiciurii asupra conductoarelor pe care le susține, transmisă la portal sub formă de tracțiune (cap. 7). Spre deosebire de fundația trafo, unde masa mare este un avantaj, la portal orice masă suplimentară inutilă mărește doar solicitările proprii (greutate) fără a aduce niciun beneficiu funcțional — motiv pentru care soluția structurală adoptată (cap. 3.2) este, în mod deliberat, o structură metalică zveltă, optimizată pentru raportul rezistență/greutate, nu un echivalent metalic al unui "bloc masiv".

**Clădirea de comandă — comportare de "adăpost civil obișnuit".** Mărimea dominantă este cea a **oricărei clădiri civile de mici dimensiuni**: încărcări gravitaționale uzuale (planșee, acoperiș, echipamente ușoare de tablou), acțiune seismică orizontală tratată prin metodologia obișnuită de proiectare seismică a clădirilor de beton armat, fără nicio particularitate specifică procesului tehnologic electric, cu o singură diferență majoră față de o clădire civilă banală: **încadrarea în clasa de importanță II**, impusă nu de geometria sau de funcțiunea proprie a clădirii (care, izolat, ar putea fi tratată la o clasă inferioară), ci de rolul ei în ansamblul stației — adăpostește echipamentele de comandă, protecție și automatizare fără de care întreaga stație nu poate funcționa nici înainte, nici după un eventual seism (cap. 6.1).

**Cuva de retenție — comportare "hidrotehnică, etanșă".** Mărimea dominantă este **etanșeitatea la fisurare** și **stabilitatea la subpresiunea apei subterane/pluviale (plutire — UPL)**, două cerințe fără corespondent la celelalte trei obiecte. Cuva este, în esență, un rezervor îngropat parțial: trebuie să rețină integral uleiul electroizolant al transformatorului (pentru a preveni poluarea solului și a apei subterane și pentru a limita propagarea unui eventual incendiu de ulei), condiție care impune o fisurare strict controlată a betonului (cap. 8.2), și trebuie să reziste, atunci când este goală de ulei (situație curentă în afara unei avarii) și cu nivelul apei subterane/pluviale ridicat, tendinței de a "pluti" precum o barcă goală (cap. 8.3) — fenomen fizic care nu are niciun analog la fundația masivă a transformatorului, la portalele metalice sau la clădirea de comandă.

**Concluzia capitolului.** Cele patru obiecte ale stației de transformare nu sunt patru variante ale aceleiași probleme structurale, ci **patru probleme structurale diferite**, care necesită patru sisteme structurale diferite (cap. 3) și patru breviare de calcul dominate de mărimi fizice diferite: masă și amortizare vibratorie (fundație trafo), zveltețe și acțiuni climatice/mecanice variabile (portal), comportare seismică obișnuită de clădire civilă cu clasă de importanță majorată (clădire comandă), etanșeitate și stabilitate hidraulică (cuvă). Tratarea lor unitară, cu un singur breviar de calcul "generic de fundație" sau "generic de structură", ar fi o eroare de principiu — motiv pentru care prezentul memoriu dezvoltă, pentru fiecare obiect, un capitol de calcul separat (cap. 5, 7, 8), precedat de justificarea explicită a sistemului structural adoptat (cap. 3).

### 1.3. Clasificări normative

**Categoria de importanță (HG nr. 766/1997, anexa nr. 3).** Stația de transformare 110/20 kV, ca ansamblu tehnologic, se încadrează în **categoria de importanță B (deosebită)** pentru cele două obiecte cu rol determinant în continuitatea alimentării cu energie electrică — clădirea de comandă (adăpostește echipamentele de protecție și comandă fără de care stația nu poate opera) și fundația transformatorului de putere (susține echipamentul strategic al cărui colaps sau înclinare ar întrerupe complet funcționarea stației și ar putea genera, suplimentar, o scurgere necontrolată de ulei electroizolant). Portalele metalice de 110 kV, deși nu adăpostesc persoane, sunt tratate la aceeași categorie B, dat fiind rolul lor structural în menținerea în poziție a conductoarelor și a aparatajului primar — o cedare a unui portal ar întrerupe, similar unei avarii de transformator, alimentarea cu energie electrică pe zona deservită. Anexele nestrategice ale incintei (magazii, posturi de pază, împrejmuiri) se încadrează în categoria C (normală).

**Clasa de importanță și expunere la cutremur (P100-1/2013, tabel 4.2).** Construcțiile care fac parte din sisteme de importanță vitală pentru economia națională sau pentru viața socială (rețele de energie, telecomunicații, alimentare cu apă), a căror avariere ar avea efecte grave, extinse dincolo de amplasamentul propriu-zis, se încadrează, conform tabelului 4.2 din P100-1/2013, în **clasa de importanță II**, cu **factor de importanță și expunere `γI,e = 1,20`** — aceeași încadrare care se aplică oricărei stații electrice de transformare/transport de energie, indiferent de nivelul de tensiune. La stația analizată, clasa II se aplică majorat, cu o motivare suplimentară specifică acestui tip de construcție și dezvoltată integral în cap. 4: nu doar structurile-suport (fundații, cadre, portale) trebuie verificate la clasa II, ci și **echipamentele fragile montate pe ele** (izolatoarele ceramice ale aparatajului de 110 kV) trebuie protejate explicit împotriva unei rupturi fragile care, deși nu ar afecta structura-suport propriu-zisă, ar întrerupe complet funcționarea stației exact în momentul (post-seismic) în care continuitatea alimentării cu energie electrică este cea mai necesară pentru intervenția de urgență din zona afectată.

**Clasa de consecințe (SR EN 1990, anexa B):** se adoptă **CC2** (consecințe medii-mari pentru pierderi de vieți omenești și consecințe economice/sociale considerabile — întreruperea alimentării cu energie electrică a unei zone deservite), cu factor de diferențiere `KFI = 1,00` pentru gruparea fundamentală, majorat, la gruparea seismică, prin `γI,e = 1,20` de mai sus.

**Categoria geotehnică:** se adoptă **categoria geotehnică 2** (NP 074/2022) — risc geotehnic moderat, cu încărcări concentrate semnificative (fundația transformatorului, portalele) dar fără complexitatea suplimentară a unui teren dificil combinat cu seismicitate foarte ridicată, care ar împinge încadrarea spre categoria geotehnică 3. Studiul geotehnic dedicat, obligatoriu, stabilește definitiv presiunea convențională pe teren, nivelul apei subterane (esențial pentru cuva de retenție, cap. 8.3) și eventualele măsuri de îmbunătățire a terenului de fundare.

**Durata de viață proiectată:** 50 de ani (SR EN 1990, clasa de durabilitate a proiectării S4 — construcții obișnuite/industriale), aplicată uniform celor patru obiecte, cu diferențierea claselor de expunere a betonului pe fiecare obiect, în funcție de mediul agresiv specific (cap. 9).

### 1.4. Cadrul normativ de referință

Proiectarea structurală respectă pachetul de norme europene armonizate (Eurocoduri cu anexele naționale), codurile românești specifice și normativul de ramură dedicat fundațiilor de stații electrice:

- **Legea nr. 10/1995** — calitatea în construcții; cerința fundamentală **A — rezistență mecanică și stabilitate**.
- **Legea nr. 50/1991** — autorizarea executării lucrărilor de construcții.
- **HG nr. 766/1997** — categoriile de importanță a construcțiilor.
- **HG nr. 907/2016** — conținutul-cadru al documentațiilor tehnico-economice.
- **CR 0/2012** — Cod de proiectare. Bazele proiectării construcțiilor (grupări specifice României).
- **SR EN 1990:2004/NA:2006** (Eurocod 0) — Bazele proiectării structurilor. Grupări de acțiuni, coeficienți parțiali, factori ψ, clase de consecințe.
- **SR EN 1991** (Eurocod 1) — Acțiuni asupra structurilor: partea 1-1 (greutăți proprii, încărcări utile), partea 1-3 (zăpadă/chiciură, armonizată cu **CR 1-1-3/2012**), partea 1-4 (vânt, armonizată cu **CR 1-1-4/2012**).
- **SR EN 1992-1-1/NA** (Eurocod 2) — Proiectarea structurilor de beton, reguli generale.
- **SR EN 1992-3** — Proiectarea structurilor de beton pentru reținerea lichidelor și materialelor granulare — aplicabil în mod direct cuvei de retenție a uleiului (cap. 8.2), inclusiv clasele de etanșeitate și limitele de deschidere a fisurilor.
- **SR EN 1993-1-1/NA** (Eurocod 3) — Proiectarea structurilor de oțel, reguli generale — aplicabil portalelor metalice (cap. 7).
- **SR EN 1993-1-8** — Proiectarea îmbinărilor structurilor de oțel — asamblări portal, plăci de bază, buloane de ancoraj.
- **SR EN 1997-1/NA + NP 074/2022** — Proiectarea geotehnică; conținutul documentațiilor geotehnice.
- **NP 112/2014** — Normativ pentru proiectarea fundațiilor de suprafață.
- **SR EN 1998-1:2004/NA** (Eurocod 8) — Proiectarea seismică, completat și prevalat de **P100-1/2013**, inclusiv **cap. 10 — cerințe specifice pentru elemente nestructurale și instalații/echipamente**, capitol determinant pentru particularitatea centrală a prezentului memoriu (cap. 4).
- **NTE 007** — Normativ tehnic pentru proiectarea și execuția fundațiilor stațiilor electrice — normativ de ramură dedicat, care completează Eurocodurile generale cu prescripții specifice fundațiilor de transformatoare și portalelor de linii electrice.
- **NE 012-1/2007 și NE 012-2/2010** — Producerea și executarea lucrărilor din beton.
- **STAS 6054/77** — Adâncimi de îngheț.
- **SR EN 10080 / SR 438** — Oțel-beton B500C.
- **SR EN 10025** — Produse laminate la cald din oțeluri structurale (S235, S355) — profile portale.
- **SR EN ISO 1461** — Acoperiri prin zincare la cald pe produse din oțel — protecția anticorozivă a portalelor și a structurilor metalice suprateran.
- **IEC 62271-207** — Calificarea seismică a aparatajului de comutație de înaltă tensiune — referință directă pentru verificarea de la cap. 4.6.
- **IEC 61463** — Calificarea seismică a izolatoarelor compozite/ceramice — referință directă pentru verificarea de la cap. 4.6.
- **NTE 001/03/00** — Normativ privind alegerea izolației, coordonarea izolației și protecția instalațiilor electroenergetice împotriva supratensiunilor — referință pentru gabaritele de izolație care condiționează geometria portalelor (cap. 10).

Proiectul tehnologic de instalații electrice (dimensionarea transformatorului, a aparatajului primar/secundar, a schemei de protecție prin relee, a prizei de pământ și a instalațiilor de telecomunicații) constituie documentație de specialitate distinctă, care nu se dublează în prezentul memoriu structural; datele preluate din acel proiect (greutăți de echipament, tracțiuni de conductor, distanțe de izolație) sunt citate explicit, la fiecare capitol, ca date de intrare.

---

## 2. Cele patru obiecte structurale — sisteme adoptate și justificarea lor

### 2.1. Fundația transformatorului de putere

**Sistemul adoptat: bloc masiv de beton armat, pe fundație directă (radier sau bloc pe pernă de repartiție), cu cale de rulare pentru montaj/demontaj și cu întreruperea vibratorie a legăturii cu structurile vecine.**

Alcătuirea constă dintr-un **bloc masiv de beton armat clasa C25/30**, dimensionat în plan astfel încât să acopere talpa integrală a transformatorului (patru sau șase puncte de reazem, pe roțile de transport sau pe patine, conform proiectului tehnologic), cu o **cale de rulare** (șine metalice înglobate în beton) care permite manevrarea transformatorului la montaj și la eventuale operații de reparație/înlocuire, și cu **amplasarea integrală în interiorul conturului cuvei de retenție** (cap. 2.4, 8), astfel încât orice scurgere de ulei să fie captată direct de aceasta.

Alegerea unui bloc **masiv**, nu a unei fundații de tip radier subțire echivalent ca suprafață portantă, este dictată de două cerințe funcționale distincte, dezvoltate integral în cap. 5:

1. **Limitarea tasărilor diferențiate** — un transformator de putere este un echipament sensibil la înclinare (bobinajele interne, conservatorul de ulei și sistemul de răcire funcționează corect doar în poziție practic orizontală); o fundație masivă, cu rigiditate mult superioară terenului de sub ea, redistribuie eficient orice neomogenitate locală a terenului de fundare și limitează tasarea diferențiată sub cele patru/șase puncte de reazem la valori neglijabile pentru funcționarea echipamentului;
2. **Amortizarea vibrațiilor mecanice** — transformatorul generează, prin fenomenul de magnetostricțiune a miezului feromagnetic (cap. 5.4), o vibrație mecanică permanentă, la o frecvență dublă a frecvenței rețelei electrice; o masă mare, cuplată eventual cu un strat elastomeric de întrerupere vibratorie față de terenul înconjurător, coboară amplitudinea vibrațiilor transmise la teren și, prin teren, la fundațiile vecine (clădirea de comandă, portalele), sub pragul perceptibil/dăunător.

Nu se optează, la acest obiect, pentru o soluție "eficientă" din perspectiva strict a minimizării volumului de beton (care ar fi soluția corectă la o fundație obișnuită de stâlp sau de utilaj ușor) — dimpotrivă, masa suplimentară este ea însăși o cerință de proiectare, motiv pentru care gradul de utilizare rezultat la verificarea presiunii pe teren este intenționat redus (cap. 5.2, 5.3), nu o marjă de siguranță întâmplătoare.

### 2.2. Portalele metalice de 110 kV

**Sistemul adoptat: cadre metalice din profile laminate (stâlpi zăbreliți sau tubulari + rigle/ferme orizontale), oțel S235/S355, protejate anticoroziv prin zincare la cald, pe fundații izolate cu ancoraje pretensionate.**

Portalele de 110 kV — atât portalele de linie (la intrarea/ieșirea liniilor electrice aeriene din stație), cât și portalele de aparataj (susținerea separatoarelor, transformatoarelor de măsură, descărcătoarelor) — se realizează din **cadre metalice zvelte**: stâlpi din profile laminate (zăbrelite, pentru portalele înalte de linie, sau tubulare/țeavă, pentru stâlpii de aparataj de înălțime mai mică), rigidizați prin rigle orizontale sau ferme la partea superioară, unde se fixează lanțurile de izolatoare și grinzile de susținere a conductoarelor. Înălțimea structurii (**H = 8–14 m**, funcție de tipul de portal și de gabaritul de izolație impus, cap. 10) este determinată aproape integral de proiectul tehnologic electric, nu de considerente structurale proprii — o particularitate care distinge portalul de o structură metalică obișnuită, la care geometria rezultă, de regulă, din optimizarea structurală.

Alegerea unei structuri **zvelte** (nu a unui echivalent masiv, gen turn de beton armat) este justificată de:

1. **Minimizarea greutății proprii** — orice masă suplimentară a portalului mărește direct solicitarea de bază (moment de răsturnare, cap. 7.7) fără niciun beneficiu funcțional corespunzător (spre deosebire de fundația trafo, unde masa este utilă); oțelul, cu raportul rezistență/greutate net superior betonului, este materialul firesc pentru acest obiect;
2. **Compatibilitate cu montajul și cu accesul de mentenanță** — structurile metalice zăbrelite/tubulare permit accesul la izolatoare și la aparataj pentru operații periodice de mentenanță (curățare, verificare, înlocuire), fără schele grele sau demontări extinse;
3. **Protecție anticorozivă eficientă pe durata de viață proiectată** — zincarea la cald (grosime de strat ≥85 μm, cap. 9) asigură protecția anticorozivă necesară pe 50 de ani de expunere suprateran, fără mentenanță de vopsitorie periodică, soluție preferată în practica de execuție a stațiilor electrice.

Spre deosebire de fundația transformatorului (unde acțiunea dominantă este statică, cvasi-permanentă), la portal acțiunea dominantă este **variabilă și repetitivă**: vântul (permanent variabil), chiciura (sezonieră, cu grupare specifică față de vânt) și tracțiunea conductoarelor electrice (permanentă ca ordin de mărime, dar cu componente dinamice la manevre de comutație și la deconectări bruște) — trei acțiuni care nu au echivalent la fundația trafo sau la cuva de retenție și care sunt dezvoltate integral în cap. 7.

### 2.3. Clădirea de comandă

**Sistemul adoptat: cadre de beton armat clasa C25/30, cu planșee de beton armat, fundare pe fundații continue/radier local cu grinzi de fundare de legare (obligatorii la clasa de importanță II, cap. 6).**

Clădirea de comandă are, structural, alcătuirea unei clădiri civile industriale/administrative obișnuite, de regim de înălțime mic (parter sau parter+etaj), cu deschideri moderate (compatibile cu amplasarea celulelor de medie tensiune și a tablourilor, conform memoriului de arhitectură/tehnologic), fără particularitățile de masă sau de zveltețe extremă ale celorlalte trei obiecte. Diferența față de o clădire civilă banală constă exclusiv în **cerințele de clasă de importanță II** (cap. 1.3, 6.1), care se traduc, pentru un sistem de cadre de beton armat, în:

1. **Regularitate structurală strictă** — clădirea de comandă, spre deosebire de eventuale extinderi/decroșuri ulterioare (care nu se recomandă fără o expertiză explicită la o construcție de clasă II), se dimensionează cu o formă compactă, regulată în plan și în elevație;
2. **Grinzi de fundare de legare** — obligatorii la construcțiile de clasă de importanță II (cap. 6.2), indiferent de tipul de fundare adoptat (fundații izolate sub stâlpi sau fundații continue), pentru asigurarea unei comportări unitare a infrastructurii sub acțiunea seismică și pentru limitarea tasărilor diferențiate între stâlpii adiacenți;
3. **Detaliere seismică conform P100-1/2013** pentru zonele critice ale stâlpilor și grinzilor, identică metodologic celei aplicate oricărei clădiri de beton armat, dar cu factorul de importanță `γI,e = 1,20` aplicat la forța seismică de proiectare (nu `1,00`, cum s-ar aplica unei clădiri administrative obișnuite de clasă III).

### 2.4. Cuva de retenție a uleiului electroizolant

**Sistemul adoptat: structură de beton armat monolit, clasa C30/37, fără rosturi de lucru necontrolate, cu waterstop la toate rosturile inevitabile, verificată dublu — la fisurare (etanșeitate) și la plutire (stabilitate hidraulică, UPL).**

Cuva de retenție este un rezervor de beton armat, deschis la partea superioară (colector de suprafață, sub grătarul de piatră spartă pe care este poziționată fundația transformatorului), dimensionat să rețină întregul volum de ulei electroizolant al transformatorului, plus o rezervă pentru apa de stingere a unui eventual incendiu (cap. 8.1). Alegerea unei structuri **monolite, fără rosturi necontrolate**, este dictată direct de rolul funcțional al cuvei: orice rost de turnare neetanșat sau orice fisură necontrolată ar constitui o cale de scurgere a uleiului spre sol și spre apa subterană — o consecință inacceptabilă din perspectiva protecției mediului (rezervele hidrocarburate din uleiul electroizolant sunt poluante și greu biodegradabile) și, potențial, o cale de propagare a unui incendiu de ulei.

Acolo unde rostul de turnare este totuși inevitabil (dimensiuni mari ale radierului, execuție pe etape), se prevede obligatoriu **bandă de etanșare (waterstop)** înglobată în beton, care asigură continuitatea etanșeității peste discontinuitatea fizică a betonării. Se optează, în plus, pentru clasa de beton **C30/37**, superioară clasei uzuale pentru o fundație de beton simplu (C25/30), tocmai pentru performanța sporită la permeabilitate și pentru capacitatea de a limita deschiderea fisurilor sub limita normată (cap. 8.2), și pentru un dozaj de ciment și un raport apă/ciment controlate strict (cap. 9).

Cuva se verifică, distinct de toate celelalte trei obiecte, la **plutire (Uplift — UPL)**: fenomenul fizic prin care o structură îngropată, goală sau parțial goală, poate fi împinsă în sus de subpresiunea apei subterane/pluviale, exact ca o barcă goală care plutește pe apă (cap. 8.3) — verificare care nu are niciun corespondent la fundația transformatorului (masivă, nu este niciodată "goală"), la portale (fundații izolate, fără volum de gol relevant) sau la clădirea de comandă (fundații de mici dimensiuni, fără suprafață în plan suficient de mare pentru ca subpresiunea să devină critică).

### 2.5. Tabel de sinteză a rolurilor structurale ale celor patru obiecte

| Obiect | Comportare dominantă | Mărime fizică guvernantă | Material principal | Secțiune de calcul |
|---|---|---|---|---|
| Fundație transformator | masiv static, anti-vibrații | masă + rigiditate | beton armat C25/30 | cap. 5 |
| Portale metalice 110 kV | zvelt dinamic, acțiuni climatice/mecanice | suplețe + rezistență/greutate | oțel S235/S355 zincat | cap. 7 |
| Clădire de comandă | adăpost civil, clasă II | regularitate + ductilitate seismică | beton armat C25/30 | cap. 6 |
| Cuvă retenție ulei | hidrotehnic etanș, plutire | etanșeitate + stabilitate hidraulică | beton armat C30/37 P8 | cap. 8 |

Peste toate cele patru obiecte se suprapune o **particularitate transversală**, comună aparatajului de 110 kV montat pe fundația transformatorului, pe portale și, parțial, în clădirea de comandă (transformatoare de măsură, întreruptoare) — fragilitatea seismică a echipamentelor ceramice, tratată separat și integral în cap. 4, ca temă centrală a prezentului memoriu.

---

## 3. Particularitatea centrală — fragilitatea seismică a echipamentelor montate pe suporți zvelți

### 3.1. De ce acest capitol este "inima" memoriului

Toate cele patru obiecte de construcție descrise la cap. 2 pot fi proiectate corect din perspectiva rezistenței mecanice și a stabilității generale (SLU gravitațional, seism al structurii-suport, SLS) prin aplicarea directă, adaptată, a metodologiei consacrate de proiectare a construcțiilor civile/industriale de beton armat, respectiv de oțel. Există însă, la stațiile electrice de înaltă tensiune, o cerință suplimentară, fără analog la o clădire civilă obișnuită, care nu se rezolvă prin verificarea obișnuită a structurii-suport, ci necesită o verificare distinctă, explicită, dedicată: **verificarea seismică a echipamentelor fragile montate în vârful suporților zvelți** — izolatoarele ceramice ale aparatajului de 110 kV (separatoare, transformatoare de curent/tensiune, întreruptoare, descărcătoare).

Această particularitate este motivul pentru care prezentul capitol este dezvoltat separat, înaintea capitolelor de calcul pe fiecare obiect (cap. 5–8): fenomenul descris aici (amplificarea seismică la vârful suporților și fragilitatea izolatoarelor ceramice) se aplică transversal, la fundația transformatorului (unde sunt montate bucșele de trecere de înaltă tensiune ale transformatorului, tot elemente ceramice fragile), la portale (unde sunt montate lanțurile de izolatoare și aparatajul primar propriu-zis) și, parțial, în clădirea de comandă (transformatoare de măsură de interior, izolatoare suport ale barelor colectoare).

### 3.2. Fenomenul fizic — analogia pendulului invers și amplificarea la vârf

Un izolator ceramic de 110 kV (fie el suportul unui separator, al unui transformator de curent, sau lanțul de izolatoare de la vârful unui portal) este, din punct de vedere mecanic, un element **casant** — rezistă bine la compresiune și la solicitări de proiectare stabile, dar are o capacitate foarte redusă de deformație plastică înainte de rupere; spre deosebire de oțel sau de betonul armat corect detaliat seismic (care pot disipa energie prin deformații plastice controlate, cap. 3.4 din practica seismică obișnuită), porțelanul/ceramica se **rupe fragil**, brusc, fără avertisment vizibil și fără nicio rezervă de ductilitate.

Acest element casant nu este însă montat direct la nivelul terenului (unde ar resimți exact accelerația mișcării seismice a solului), ci în **vârful unui suport zvelt** — un stâlp de aparataj, un portal, sau chiar corpul înalt și subțire al unei bucșe de trecere de pe capacul transformatorului. Comportarea dinamică a unui asemenea ansamblu "suport zvelt + masă concentrată la vârf" este analoagă, calitativ, unui **pendul invers**: la fel cum un pendul invers oscilează cu o amplitudine la vârf mult mai mare decât deplasarea impusă la bază, un suport zvelt supus mișcării seismice a terenului **acumulează deformație** pe toată înălțimea sa și transmite izolatorului din vârf o **accelerație amplificată** față de accelerația mișcării terenului la nivelul fundației — nu o simplă transmitere 1:1 a mișcării seismice, așa cum ar resimți-o un element montat direct pe sol.

Această amplificare are două cauze fizice care se suprapun:

1. **Efectul de „braț de pârghie" al deformației structurale** — un suport zvelt, sub acțiunea forței de inerție distribuite pe înălțimea lui, se încovoaie, iar deplasarea și, mai important, **accelerația** la vârful lui rezultă din combinarea mișcării terenului cu mișcarea relativă proprie a structurii (efect analog oricărei structuri elastice supuse la bază unei mișcări, dar amplificat aici de zveltețea extremă și de masa mică proprie a suportului, comparativ cu masa (mică, dar concentrată) a echipamentului din vârf);
2. **Efectul de cvasi-rezonanță** — dacă perioada proprie de vibrație a echipamentului montat în vârf (`Ta`, care depinde de rigiditatea proprie a izolatorului/suportului echipamentului, nu a structurii principale) se apropie de perioada fundamentală a structurii-suport (`T1`, portalul sau stâlpul de aparataj), cele două sisteme intră într-un regim de **cvasi-rezonanță** — fenomenul prin care amplitudinea răspunsului dinamic al echipamentului crește pronunțat exact atunci când frecvențele proprii ale celor două sisteme cuplate (suport și echipament) sunt apropiate, similar amplificării clasice de rezonanță dintr-un sistem cu un singur grad de libertate excitat aproape de frecvența lui proprie.

Combinarea acestor două efecte poate conduce la accelerații resimțite de izolatorul din vârful suportului de **câteva ori mai mari** decât accelerația terenului la baza structurii — un multiplu care, aplicat unui element casant fără nicio rezervă de ductilitate, poate depăși capacitatea de rupere a izolatorului chiar și atunci când structura-suport propriu-zisă (portalul metalic sau stâlpul de beton) rezistă fără nicio problemă la același cutremur.

### 3.3. De ce verificarea seismică obișnuită a structurii-suport nu este suficientă

O verificare seismică "obișnuită" — cea aplicată, de exemplu, structurii metalice a portalului la cap. 7, sau cadrelor de beton armat ale clădirii de comandă la cap. 6 — urmărește să demonstreze că **structura-suport** (stâlpul, cadrul, portalul) rezistă la forța seismică echivalentă calculată din masa proprie a structurii și din spectrul de proiectare, cu un factor de comportare `q` care presupune, implicit sau explicit, o anumită capacitate de disipare inelastică prin deformații controlate. Această verificare este necesară, dar **nu este suficientă** la o stație electrică, din două motive specifice:

1. **Echipamentul montat pe structură nu se comportă ca o masă rigidă solidară cu structura** — spre deosebire de un perete de compartimentare sau de un utilaj rigid fixat direct pe planșeu (unde ipoteza uzuală de proiectare a elementelor nestructurale presupune o comportare cvasi-rigidă), izolatorul ceramic montat în vârful unui suport zvelt are propria lui dinamică (masă proprie mică, dar rigiditate proprie definită, deci o perioadă proprie `Ta` nenulă), care interacționează cu dinamica structurii-suport exact prin fenomenul de amplificare descris la cap. 3.2. O verificare care ar trata izolatorul ca pe o simplă "greutate suplimentară" aplicată static la vârful structurii ar subestima grav accelerația reală la care este supus echipamentul;
2. **Elementul fragil poate ceda la o solicitare mult sub cea la care structura-suport ar ceda** — un portal metalic proiectat corect la încovoiere-compresiune (cap. 7.6) poate avea, la limita sa de rezistență, o rezervă de deformație plastică (chiar dacă limitată, structurile metalice au totuși o anumită ductilitate); izolatorul ceramic montat în vârful lui nu are această rezervă — se rupe fragil la o solicitare mult mai mică decât cea la care ar ceda structura metalică propriu-zisă. Rezultă că **structura poate "supraviețui" unui cutremur în timp ce echipamentul montat pe ea se distruge** — o consecință funcțională gravă (întreruperea alimentării cu energie electrică, posibilă scurgere de SF6 sau de ulei din aparatajul avariat), chiar dacă, strict din perspectiva "rezistenței și stabilității" structurii civile/metalice, nu s-ar înregistra nicio avarie raportabilă.

Din aceste două motive, P100-1/2013, cap. 10 (cerințe specifice pentru elemente nestructurale și pentru instalații/echipamente) impune o **verificare distinctă, explicită**, a accelerației transmise echipamentului montat pe o structură-suport, verificare care se adaugă — nu se substituie — verificării seismice a structurii-suport propriu-zise. Prezentul memoriu tratează ambele verificări, în paralel, la fiecare dintre cele patru obiecte: verificarea structurii-suport (cap. 5, 6, 7) și verificarea explicită a accelerației/momentului transmis echipamentului fragil montat pe ea (prezentul capitol, aplicat punctual la fiecare obiect relevant).

### 3.4. Forța seismică de bază pe suportul de echipament — formula Fb

Pentru un suport de echipament (de exemplu, coloana de susținere a unui separator de 110 kV, sau soclul unui transformator de curent), tratat, într-o primă etapă, ca un element rigid/cvasi-rigid solidar cu terenul (ipoteza simplificată, valabilă pentru echipamente rigide cu perioadă proprie foarte mică), forța seismică orizontală de bază se calculează, conform metodologiei elementelor nestructurale rigide (P100-1 §10), cu formula:

**`Fb = γI·Sd·m·λ`**

unde:
- `γI` — factorul de importanță și expunere al construcției/echipamentului (aici, `γI = 1,20`, clasa II, identic celui aplicat structurii-suport, cap. 1.3);
- `Sd` — ordonata spectrului de proiectare la perioada proprie a echipamentului (calculată mai jos);
- `m` — masa echipamentului (suportul de aparataj propriu-zis, inclusiv izolatorul);
- `λ` — factor de corecție a masei modale participante (pentru un echipament asimilat unui sistem cu un singur grad de libertate, `λ = 1,0`, spre deosebire de structurile civile cu mai multe niveluri, unde `λ` poate fi subunitar, cap. 7.4 din exemplul de clădire mixtă folosit ca reper de stil).

**Ordonata spectrală `Sd`** se calculează, pentru un echipament rigid, aproape elastic, ca:

`Sd = ag·β0/q`

cu `q = 1,5` — factor de comportare redus, specific echipamentelor electrice rigide (fără capacitate de disipare inelastică semnificativă, dar cu o mică rezervă convențională față de un element perfect elastic, admisă normativ pentru echipamente rigide fixate ferm).

**Aplicație numerică** (suport de echipament, masă `m = 3 t`, amplasament cu `ag = 0,30g`, `β0 = 2,75` — valoare de palier spectral, comparabilă ca ordin de mărime cu factorul de amplificare dinamică maximă folosit la structurile civile, cap. 1.3):

`Sd = ag·β0/q = 0,30 · 9,81 · 2,75 / 1,5 = 8,0918 / 1,5 = **0,50g** (5,39 m/s²... rotunjit uzual în notația inginerească la 0,50g)`.

`Fb = γI·Sd·m·λ = 1,20 · 0,50 · (3.000 · 9,81) = 1,20 · 0,50 · 29.430 = **17,66 kN**`.

Această valoare, `Fb = 17,66 kN`, reprezintă forța seismică orizontală de bază aplicată suportului de echipament, tratat ca element rigid solidar cu terenul — o forță care se verifică direct la baza suportului (secțiunea de încastrare, buloanele de fixare pe fundație), analog oricărei verificări seismice a unui element rigid ancorat.

**Această forță `Fb` NU este însă suficientă pentru verificarea izolatorului ceramic montat la vârf** — motiv pentru care se calculează, separat, amplificarea la vârf (cap. 3.5), care se aplică specific izolatorului, ca element nestructural montat pe (nu solidar rigid cu) structura-suport.

### 3.5. Amplificarea seismică la vârf — formula Fa și semnificația fiecărui termen

Pentru elementul nestructural fragil montat la partea superioară a unui suport/structură (izolatorul ceramic, montat practic întotdeauna la cota maximă a suportului sau a portalului), P100-1/2013 §10 impune calculul unei forțe seismice amplificate, distincte de forța de bază a suportului, care ține cont explicit de poziția pe înălțime și de raportul dintre perioada proprie a elementului și perioada fundamentală a structurii-suport:

**`Fa = γa·Sa·ma/qa`**

unde:
- `γa` — factorul de importanță al elementului nestructural/echipamentului (analog `γI`, dar aplicat specific componentei, `γa = 1,20`, clasa II);
- `Sa` — ordonata spectrului de răspuns pentru elementul nestructural, calculată cu formula de amplificare de mai jos (nu spectrul de proiectare al structurii principale, ci un spectru dedicat, care depinde de poziția pe înălțime `z/H` și de raportul de perioade `Ta/T1`);
- `ma` — masa proprie a elementului nestructural (aici, masa izolatorului ceramic propriu-zis, mult mai mică decât masa suportului);
- `qa` — factorul de comportare al elementului nestructural, **`qa = 1,0`** pentru elemente fragile fără nicio capacitate de disipare inelastică (spre deosebire de `q = 1,5` de la cap. 3.4, care se aplica suportului rigid — izolatorul ceramic propriu-zis nu beneficiază de nicio reducere convențională a forței, tocmai din cauza fragilității sale).

**Ordonata spectrală de amplificare `Sa`** se calculează cu formula (P100-1 §10, formula de amplificare a elementelor nestructurale în funcție de poziția pe înălțime și de raportul de perioade):

**`Sa = ag·[3(1 + z/H) / (1 + (1 − Ta/T1)²)] − 0,5`**

Semnificația fiecărui termen din această formulă este esențială pentru înțelegerea fenomenului fizic descris calitativ la cap. 3.2:

- **`ag`** — accelerația de vârf a terenului la amplasament (aceeași valoare, `0,30g`, folosită la structura principală, cap. 1.3) — punctul de plecare al oricărei amplificări;
- **`z/H`** — raportul dintre cota la care este montat elementul nestructural (`z`) și înălțimea totală a structurii-suport (`H`). Termenul `(1 + z/H)` crește liniar de la valoarea `1` (element montat la bază, `z = 0`) la valoarea `2` (element montat la vârf, `z = H`) — traducerea matematică directă a efectului de „braț de pârghie" descris calitativ la cap. 3.2: cu cât elementul este montat mai sus pe structura zveltă, cu atât amplificarea geometrică a mișcării este mai mare. **La izolatoarele ceramice ale aparatajului de 110 kV, montate practic întotdeauna la cota maximă a portalului sau a suportului (`z/H ≈ 1`)**, acest termen atinge valoarea sa maximă posibilă (`1 + z/H = 2`) — o consecință directă a poziției constructive obligatorii a izolatorului (montat sus, pentru asigurarea distanțelor de izolație față de sol și față de elementele conexe, cap. 10), care nu poate fi evitată prin nicio alegere de proiectare structurală alternativă;
- **`(1 − Ta/T1)²`** — termenul care descrie fenomenul de **cvasi-rezonanță** menționat calitativ la cap. 3.2: cu cât perioada proprie a elementului nestructural (`Ta`, a izolatorului/echipamentului propriu-zis) se apropie de perioada fundamentală a structurii-suport (`T1`, a portalului sau a stâlpului de aparataj), cu atât diferența `(1 − Ta/T1)` se apropie de zero, iar numitorul întregii fracții din formulă scade spre valoarea minimă `1` — ceea ce **maximizează** amplificarea `Sa`. Fizic, aceasta corespunde exact situației în care cele două sisteme cuplate (structura-suport și echipamentul montat pe ea) au frecvențe proprii apropiate și intră în regim de cvasi-rezonanță, exact fenomenul descris la cap. 3.2, punctul 2;
- **termenul `− 0,5`** — o corecție normativă de bază, care limitează inferior amplificarea (previne o subestimare a forței chiar la elemente montate jos, cu `z/H` mic, unde primul termen al formulei ar da o valoare relativ mică).

**Combinarea celor doi factori de amplificare — poziția la vârf și apropierea de rezonanță.** La izolatoarele ceramice ale aparatajului de 110 kV, ambele condiții de amplificare maximă se întâlnesc simultan, nu întâmplător, ci ca o consecință a configurației constructive tipice a acestor structuri:

1. Izolatorul este montat la **vârful** suportului (`z/H ≈ 1`), condiție impusă de gabaritele de izolație (cap. 10), deci termenul `(1 + z/H)` este deja la valoarea sa maximă, `2`;
2. Suporții de aparataj și portalele, fiind structuri metalice zvelte de înălțime moderată, au frecvent perioade proprii fundamentale (`T1`) în aceeași gamă de ordine de mărime cu perioadele proprii ale izolatoarelor ceramice montate pe ele (`Ta`) — o **coincidență de proiectare** care nu este întâmplătoare: atât structura-suport zveltă, cât și izolatorul rigid dar de dimensiuni mici, tind să aibă perioade proprii scurte (sub o secundă), într-un interval unde suprapunerea `Ta ≈ T1` este statistic frecventă dacă nu se ia nicio măsură explicită de decalare (cap. 3.7).

Pentru amplasamentul de calcul al prezentului memoriu (`ag = 0,30g`) și pentru configurația critică `z/H = 1` combinată cu `Ta ≈ T1` (cvasi-rezonanță), calculul formulei conduce la un **factor de amplificare rezultant de ordinul `≈ 5,5·ag`** — cu alte cuvinte, izolatorul din vârful suportului poate resimți o accelerație orizontală echivalentă cu de aproximativ **5,5 ori** accelerația de vârf a terenului la bază, o amplificare substanțială care nu ar fi surprinsă de o verificare seismică simplificată a structurii-suport ca ansamblu rigid.

`Sa,max ≈ 5,5 · 0,30g = **1,65g**` (ordin de mărime al ordonatei spectrale de amplificare la izolatorul montat la vârf, în condiții de cvasi-rezonanță — valoare care se folosește direct în calculul forței `Fa` de mai jos, aplicată masei proprii, de regulă mici, a izolatorului).

`Fa = γa·Sa·ma/qa = 1,20 · (5,5·ag) · ma / 1,0` — la `qa = 1,0` (fără nicio reducere, element fragil), forța rezultată pe masa proprie a izolatorului reflectă integral amplificarea calculată, spre deosebire de forța de bază a suportului (`Fb`, cap. 3.4), care beneficiază de reducerea convențională `q = 1,5`.

### 3.6. Verificarea izolatorului — momentul aplicat vs. momentul de rupere garantat de producător

Forța orizontală `Fa`, aplicată la centrul de greutate al izolatorului ceramic (aproximativ la înălțimea `h` a izolatorului deasupra flanșei de fixare pe suport), generează un **moment încovoietor la baza izolatorului**:

**`M_izolator = Fa · h`**

Această valoare de calcul se compară direct cu **momentul de rupere garantat de producător (Minimum Failing Load — MFL, sau Specified Mechanical Load — SML/SSL, terminologie de catalog)**, mărime standardizată și certificată prin încercări de tip, conform:

- **IEC 62271-207** — "High-voltage switchgear and controlgear — Seismic qualification for alternating current circuit-breakers and other switchgear/controlgear assemblies rated above 1 kV and up to and including 52 kV" (extins prin practica de aplicare și la echipamentele de 110 kV) — standardul care definește metodologia de calificare seismică a aparatajului de comutație de înaltă tensiune, inclusiv nivelul de accelerație de vârf (ZPA — Zero Period Acceleration) și spectrul de răspuns cerut la calificarea prin încercare pe masă vibrantă sau prin analiză;
- **IEC 61463** — "Bushings — Seismic qualification" (extins, ca practică, la izolatoarele suport și la izolatoarele compozite/ceramice ale aparatajului conex) — standardul care stabilește nivelul de accelerație la care un izolator/o bucșă trebuie să demonstreze integritate mecanică, prin încercare de tip sau prin calcul justificat.

**Criteriul de verificare:** `M_izolator (calculat, cap. 3.5) ≤ M_rupere,garantat (din catalogul producătorului, certificat conform IEC 62271-207/61463, pentru echipamentul specific ales)`.

Aceasta este verificarea structurală **cea mai critică** din întregul memoriu, într-un sens diferit de verificările obișnuite ale structurilor civile: nu este o verificare cu o marjă de siguranță generoasă rezultată din coeficienți parțiali standard, ci o **verificare punct-la-punct** între o solicitare calculată (care depinde critic de acuratețea estimării perioadei proprii a echipamentului `Ta` și a perioadei structurii-suport `T1`, cap. 3.5) și o capacitate garantată de un terț (producătorul echipamentului), capacitate care nu poate fi mărită prin niciun mijloc de proiectare structurală ulterioară a suportului — odată ce echipamentul este ales și montat, momentul lui de rupere este fix. Din acest motiv, verificarea prezentă nu se poate considera "generic satisfăcută" la faza DTAC — ea rămâne, explicit, o verificare care necesită datele finale de catalog ale echipamentului ales prin proiectul tehnologic, confirmate la faza PT, și este semnalată aici ca **punct de atenție obligatoriu**, nu ca un rezultat închis.

### 3.7. Măsuri de proiectare pentru protecția echipamentelor fragile

Din analiza fenomenului fizic (cap. 3.2) și a formulei de amplificare (cap. 3.5), rezultă direct măsurile de proiectare care reduc riscul de rupere fragilă a izolatoarelor, aplicabile la fundația transformatorului (bucșe de trecere), la portale (lanțuri de izolatoare, aparataj primar) și, unde e cazul, în clădirea de comandă:

1. **Decalarea frecvențelor proprii suport-echipament** — evitarea condiției de cvasi-rezonanță `Ta ≈ T1` (cap. 3.5) prin alegerea unei rigidități a suportului (secțiune, înălțime, tip de profil metalic) care plasează perioada fundamentală a structurii `T1` la o distanță suficientă (normativ, un decalaj relativ recomandat de minimum 20–30% între cele două perioade) față de perioada proprie tipică a izolatoarelor ceramice folosite în proiectul tehnologic. Această măsură este cea mai eficientă din punct de vedere structural, pentru că acționează direct asupra numitorului formulei de amplificare (cap. 3.5), reducând factorul `1/(1+(1−Ta/T1)²)` la o valoare mult sub maximul teoretic;
2. **Alegerea echipamentelor cu calificare seismică explicită** — specificarea, prin caietul de sarcini al proiectului tehnologic, a unor izolatoare/aparataj calificate seismic conform IEC 62271-207/61463 pentru nivelul de accelerație de vârf corespunzător amplasamentului (`ag = 0,30g`, clasa II, `γI,e = 1,20`), cu certificat de calificare prin încercare pe masă vibrantă, nu doar prin calcul analitic — soluție preferabilă din perspectiva certitudinii capacității reale a echipamentului montat;
3. **Limitarea deplasării relative (drift) a structurii-suport la vârf** — chiar dacă structura-suport (portalul, cap. 7) rezistă la solicitarea de calcul, o deplasare laterală excesivă la vârf poate suprasolicita suplimentar, prin efecte de ordinul II locale, izolatorul montat rigid între vârful suportului și conductorul electric — motiv pentru care se adoptă, la portale, o limită de drift mai severă decât cea uzuală pentru structuri metalice civile (cap. 7.6);
4. **Rigidizarea suportului de bucșe la transformator** — bucșele de trecere de 110 kV, montate pe capacul transformatorului, sunt elemente ceramice fragile analoage izolatoarelor de portal, dar montate pe un echipament cu propria lui dinamică (transformatorul, oscilant elastic pe fundația masivă, cap. 5.4); coordonarea dintre proiectul tehnologic (alegerea tipului de bucșă) și proiectul de rezistență (rigiditatea fundației, cap. 5) urmărește evitarea unei cvasi-rezonanțe similare celei descrise la cap. 3.5, chiar dacă la o scară de frecvențe diferită (fundația masivă are frecvențe proprii mult mai mari decât un portal zvelt, cap. 5.4, ceea ce reduce, în mod natural, riscul de cvasi-rezonanță la acest element specific, comparativ cu portalele).

**Concluzia capitolului 3.** Fragilitatea seismică a echipamentelor montate pe suporți zvelți este particularitatea care diferențiază fundamental proiectarea seismică a unei stații electrice de proiectarea seismică a unei clădiri civile obișnuite: nu este suficient ca structura-suport să reziste (verificare "obișnuită", tratată la cap. 5–7), trebuie verificată explicit accelerația transmisă echipamentului fragil montat pe ea, prin formula de amplificare `Fa` (cap. 3.5), comparată cu capacitatea de rupere garantată de producător (cap. 3.6), și trebuie aplicate măsurile de decalare a frecvențelor și de calificare seismică a echipamentelor (cap. 3.7) — o buclă de proiectare care implică, obligatoriu, coordonarea strânsă între proiectantul de rezistență și proiectul tehnologic de instalații electrice (cap. 10), fără de care verificarea structurii-suport, oricât de riguroasă, rămâne incompletă.

---

## 4. Amplasamentul. Acțiuni climatice și seismice

### 4.1. Parametri seismici de amplasament

Se dezvoltă exemplul de calcul pentru un amplasament reprezentativ pentru rețeaua de stații electrice de 110/20 kV din România, cu parametri conform P100-1/2013:

| Parametru | Simbol | Valoare (amplasament exemplu) |
|---|---|---|
| Accelerația terenului (IMR 225 ani) | ag | **0,30·g** |
| Perioada de colț | TC | **1,60 s** |
| Factor de importanță/expunere (clasa II) | γI,e | **1,20** |

Aceiași parametri de amplasament (`ag`, `TC`) folosiți la calculul seismic al structurilor-suport (cap. 5, 6, 7) sunt folosiți, identici, la calculul amplificării seismice a echipamentelor (cap. 3.4–3.6) — coerența dintre cele două seturi de verificări este esențială: același cutremur de proiectare guvernează atât rezistența civilă/metalică a construcțiilor, cât și integritatea aparatajului electric montat pe ele.

**Sensibilitatea la amplasament.** Pentru orice UAT/amplasament diferit, calculele se re-rulează prin înlocuirea perechii `(ag, TC)` cu valorile specifice din harta de zonare seismică; regula de recalculare este identică metodologic celei descrise la construcțiile civile, cu diferența (specifică stațiilor electrice) că amplificarea la vârf a echipamentelor (cap. 3.5) trebuie recalculată explicit, nu doar forța de bază a structurii-suport.

### 4.2. Acțiunea zăpezii (CR 1-1-3/2012)

Pe suprafețele orizontale ale clădirii de comandă (acoperiș/terasă), acțiunea zăpezii se calculează după metodologia obișnuită:

`s = γIs·µi·Ce·Ct·sk`, cu **`s0k = 2,0 kN/m²`** — valoarea caracteristică la sol adoptată pentru amplasamentul exemplu, identică notației folosite în ediția anterioară a memoriului și reluată aici ca atare, pentru dimensionarea acoperișului clădirii de comandă (cap. 6.2).

**Distinct de acțiunea zăpezii pe acoperiș**, la portalele metalice și la conductoarele susținute de ele acționează fenomenul de **chiciură** (poleiul/gheața depusă direct pe conductoarele electrice și pe elementele portalului expuse), un fenomen fizic diferit ca mecanism de acumulare a zăpezii pe o suprafață orizontală, tratat separat prin metodologia dedicată de la cap. 7.4 (formula gheții pe conductor cilindric, CR 1-1-3).

### 4.3. Acțiunea vântului (CR 1-1-4/2012)

Presiunea de calcul a vântului pe elementele suprateran ale stației se calculează cu coeficientul de bază `qb = 0,60 kN/m²` (viteză de referință echivalentă `vb ≈ 31 m/s`), valoare adoptată pentru amplasamentul exemplu al stației (zonă de vânt de intensitate medie-ridicată, reprezentativă pentru numeroase amplasamente de stații electrice de 110 kV din câmpie/podiș). Acest coeficient de bază se folosește diferențiat, funcție de tipul de element expus:

- **presiune pe elementele masive/plane** (fațade ale clădirii de comandă, elemente structurale ale portalelor) — calculată după metodologia uzuală `qp(z) = ce(z)·qb`, cu coeficientul de expunere corespunzător categoriei de teren și înălțimii elementului;
- **presiune pe conductoarele electrice cilindrice, suspendate** — calculată cu o metodologie specifică elementelor filiforme/cilindrice (cap. 7.3), care folosește coeficienți de formă (`cf`) diferiți de cei ai elementelor plane, dat fiind profilul aerodinamic circular al conductorului.

### 4.4. Chiciura (poleiul) — zonare CR 1-1-3

Fenomenul de chiciură — depunerea de gheață pe conductoarele electrice aeriene și pe elementele expuse ale portalelor, în condiții de ceață/precipitații suprarăcite combinate cu temperaturi sub 0°C — este reglementat de **CR 1-1-3/2012**, prin zonarea teritoriului național pe zone de intensitate a depunerii de gheață. Grosimea de calcul a depunerii de gheață pe conductor (`tk`, cap. 7.4) rezultă din harta de zonare pentru amplasamentul specific al stației; pentru exemplul de calcul dezvoltat în prezentul memoriu se adoptă **`tk = 20 mm`**, valoare reprezentativă pentru o zonă de intensitate medie-ridicată a fenomenului de chiciură, coerentă cu multe dintre amplasamentele de stații electrice situate la altitudini medii sau în zone expuse curenților de aer umed.

**De ce chiciura este o acțiune specifică portalelor, fără echivalent semnificativ la celelalte trei obiecte.** Fundația transformatorului, clădirea de comandă și cuva de retenție nu au suprafețe filiforme suspendate expuse depunerii de gheață în condiții comparabile cu cele ale unui conductor electric întins liber în aer, pe zeci de metri, între două portale — motiv pentru care acțiunea chiciurii, deși reglementată de același normativ ca zăpada de pe acoperișuri (CR 1-1-3), este tratată separat, cu formula dedicată elementului cilindric suspendat (cap. 7.4), exclusiv la portale.

### 4.5. Adâncimea de fundare și adâncimea de îngheț

Adâncimea minimă de fundare a elementelor structurii se stabilește, conform **STAS 6054/77**, funcție de adâncimea de îngheț a amplasamentului, coroborată cu recomandările studiului geotehnic dedicat privind stratul portant. Se adoptă un **grad de utilizare (adâncime relativă de fundare) `Df = 0,90–1,10`** — intervalul rezultat din diferența de adâncime de fundare cerută de cele patru obiecte (fundația transformatorului, cu adâncimea impusă în primul rând de dimensiunile blocului masiv și de cota inferioară a cuvei de retenție, cap. 5 și 8; fundațiile izolate ale portalelor, la o adâncime funcție de adâncimea de îngheț și de nivelul apei subterane; fundațiile clădirii de comandă, la o adâncime obișnuită de clădire civilă mică).

### 4.6. Presiunea convențională de bază pe teren

Pentru stratul de fundare adoptat la amplasamentul exemplu, studiul geotehnic stabilește o **presiune convențională de bază `pconv = 200 kPa`**, valoare de referință folosită direct la verificarea fundației transformatorului (cap. 5.2), la fundațiile izolate ale portalelor (cap. 7.7) și la fundațiile clădirii de comandă (cap. 6.3). Categoria geotehnică 2 (cap. 1.3) impune un studiu geotehnic complet (foraje, încercări de laborator, calcul de tasări), care confirmă/ajustează definitiv această valoare la faza PT, pe baza forajelor efectiv executate în incinta stației.

---

## 5. Fundația transformatorului de putere — breviar de calcul

### 5.1. Date de intrare și alcătuirea fundației

**Date de intrare (proiect tehnologic de instalații electrice):** transformator de putere de 40 MVA, greutate totală (inclusiv ulei electroizolant, la nivel de funcționare normală) **70 t**.

**Alcătuirea fundației:** bloc masiv de beton armat clasa **C25/30**, dimensiuni în plan **6,0 × 5,0 m**, înălțime **1,20 m**, cu cale de rulare metalică înglobată și amplasare integrală în interiorul conturului cuvei de retenție (cap. 8).

### 5.2. Verificarea presiunii pe teren

**Greutatea transformatorului**, transformată în forță:

`G_trafo = 70 t · 9,81 m/s² = 686,7 kN ≈ **687 kN**`.

**Greutatea blocului de fundație:**

`G_bloc = 6,0 · 5,0 · 1,20 · 25 kN/m³ = 36,0 mc · 25 kN/m³ = **900 kN**`.

**Aria fundației:**

`A = 6,0 · 5,0 = **30 mp**`.

**Efort axial de calcul (SLU fundamental, `γG = 1,35`, încărcare cvasi-permanentă, fără componentă variabilă semnificativă — transformatorul funcționează practic la greutate constantă):**

`N_Ed = 1,35 · (G_trafo + G_bloc) = 1,35 · (687 + 900) = 1,35 · 1.587 = **2.142 kN**`.

**Presiunea efectivă pe teren** (verificare la starea limită de exploatare/SLS, cu încărcarea caracteristică, nemajorată — verificare de teren, care se conduce la valori caracteristice, nu la valori de calcul majorate, conform practicii geotehnice uzuale):

`p_ef = (G_trafo + G_bloc) / A = (687 + 900) / 30 = 1.587 / 30 = **52,9 kPa**`.

**Verificarea:** `p_ef = 52,9 kPa ≤ pconv = 200 kPa` (cap. 4.6).

**Gradul de utilizare:** `grad = p_ef / pconv = 52,9 / 200 = **0,26**` ✓.

### 5.3. De ce gradul de utilizare este intenționat redus

Gradul de utilizare de **0,26** rezultat mai sus nu reprezintă o marjă de siguranță întâmplătoare sau o supradimensionare neintenționată a fundației — este consecința directă a celor două cerințe funcționale descrise la cap. 2.1, care nu sunt reflectate în verificarea simplă a presiunii pe teren, dar care dictează, de fapt, dimensiunile blocului:

1. **Rezerva pentru limitarea tasărilor diferențiate** — deși presiunea medie pe teren (52,9 kPa) este mult sub presiunea convențională (200 kPa), ceea ce contează pentru funcționarea corectă a transformatorului nu este atât presiunea medie, cât **uniformitatea** tasării sub cele patru/șase puncte de reazem ale echipamentului; o fundație cu o presiune medie foarte redusă față de capacitatea portantă a terenului tasează, în ansamblu, mai puțin și mai uniform, exact condiția cerută de sensibilitatea la înclinare a transformatorului (cap. 2.1);
2. **Rezerva pentru limitarea vibrațiilor** (dezvoltată integral la cap. 5.4) — masa mare a blocului, care conduce la o presiune de contact scăzută în raport cu capacitatea portantă a terenului, este exact ceea ce coboară frecvența de excitație relativă și, mai important, amplitudinea vibrațiilor transmise la teren, sub pragul perceptibil/dăunător.

Cu alte cuvinte, dacă fundația transformatorului ar fi fost dimensionată "eficient", la un grad de utilizare apropiat de 1,0 (o fundație mult mai subțire, cu aceeași capacitate portantă la presiune, dar cu masă proprie mult mai mică), ea ar fi îndeplinit strict verificarea de la cap. 5.2, dar ar fi eșuat cerințele funcționale de la cap. 2.1 — o ilustrare directă a principiului enunțat la cap. 1.2: gradul de utilizare redus la acest obiect este o **condiție de proiectare**, nu o marjă de siguranță generică.

### 5.4. Verificarea la vibrații — frecvența proprie a sistemului fundație-teren vs. frecvența de excitație

**Sursa fizică a vibrației.** Transformatorul de putere generează, în funcționare normală, o vibrație mecanică permanentă prin fenomenul de **magnetostricțiune** a miezului feromagnetic — materialul feromagnetic al miezului își modifică ușor dimensiunile sub acțiunea câmpului magnetic alternativ, iar această deformație periodică, la frecvența câmpului magnetic, se manifestă ca o vibrație mecanică a întregii cuve a transformatorului. Deoarece fenomenul de magnetostricțiune nu depinde de sensul câmpului magnetic (materialul se deformează similar indiferent dacă câmpul este pozitiv sau negativ), frecvența vibrației mecanice rezultate este **dublul frecvenței fundamentale a rețelei electrice**: la o rețea de 50 Hz, vibrația mecanică a transformatorului se manifestă predominant la **100 Hz** (armonica a doua a rețelei) — o frecvență de excitație fixă, permanentă, cunoscută dinainte și independentă de amplasament.

**Condiția de sub-rezonanță.** Pentru ca fundația să nu amplifice, ci dimpotrivă să atenueze, transmiterea acestei vibrații către teren și către construcțiile vecine, frecvența proprie a sistemului cuplat fundație-teren (`f_n`) trebuie să fie **suficient de îndepărtată** de frecvența de excitație de 100 Hz — condiția normativă uzuală pentru fundații de utilaje dinamice este ca `f_n` să fie fie mult sub, fie mult peste frecvența de excitație, evitând intervalul de rezonanță din jurul ei.

Pentru blocul masiv de beton armat descris la cap. 5.1 (masă mare, rigiditate de contact cu terenul dată de aria mare de 30 mp și de rigiditatea proprie a stratului portant), frecvența proprie a sistemului fundație-teren se estimează, pentru ordinul de mărime specific unei asemenea mase și geometrii, la **`f_n ≈ 15–30 Hz`** — cu mult **sub** frecvența de excitație de 100 Hz.

**Verificarea:** raportul `f_n/f_excitație = (15–30)/100 = 0,15–0,30`, adică sistemul fundație-teren se află în regim **sub-rezonant** (frecvența proprie mult sub frecvența de excitație), condiție favorabilă: la un raport de frecvențe atât de mic, factorul de amplificare dinamică al sistemului este apropiat de valoarea de regim static (transmisibilitate redusă), fără nicio apropiere de zona critică de rezonanță (care s-ar situa, pentru acest sistem, în jurul valorii `f_n ≈ f_excitație = 100 Hz`, o frecvență proprie mult mai mare decât cea rezultată din masa și geometria adoptată — condiție care ar necesita, dacă s-ar apropia, o fundație mult mai rigidă/ușoară, contrară cerinței de masă mare de la cap. 5.3).

**Concluzie:** `f_n (15–30 Hz) ≪ 100 Hz` ✓ — condiție de **sub-rezonanță confirmată**; masa mare a blocului, departe de a fi o risipă, este exact factorul care coboară frecvența proprie a sistemului mult sub zona critică de excitație, atenuând eficient transmiterea vibrațiilor mecanice ale transformatorului către teren, către clădirea de comandă alăturată și către fundațiile portalelor vecine. Verificarea riguroasă (calcul dinamic complet al sistemului fundație-teren, cu rigiditățile și amortizările reale ale stratului de fundare rezultate din studiul geotehnic definitiv) se reia obligatoriu la faza PT, conform metodologiei dedicate de calcul dinamic al fundațiilor de utilaje (NTE 007 și literatura de specialitate în dinamica fundațiilor).

**Tasarea sub sarcină statică.** La presiunea efectivă redusă rezultată la cap. 5.2 (`p_ef = 52,9 kPa`), tasarea edometrică estimată a stratului de fundare, pentru un strat de rigiditate obișnuită de teren de fundare a unei stații electrice, se situează la ordinul de mărime al **milimetrilor** — o valoare mică, coerentă cu gradul de utilizare redus (cap. 5.3) și suficientă pentru a nu afecta orizontalitatea de montaj a transformatorului, cerință funcțională esențială (cap. 2.1).

### 5.5. Detalii constructive ale fundației

Blocul de fundație este armat conform prescripțiilor uzuale pentru fundații masive de beton armat (armătură minimă constructivă pe fețele expuse, plasă de repartiție la partea superioară sub calea de rulare, ancoraje pentru fixarea patinelor/roților transformatorului), cu **acoperire de beton `cnom = 45 mm`** (clasă de expunere XC2, cap. 9.1) — element îngropat parțial, expus umezelii permanente din contactul cu terenul și, potențial, cu ape reziduale de la eventuale scurgeri minore de ulei captate de cuva de retenție alăturată. Calea de rulare metalică se protejează anticoroziv (zincare sau vopsire de protecție), fiind un element supus, ocazional, la trafic de utilaje de montaj/demontaj (macarale, cricuri hidraulice).

---

## 6. Clădirea de comandă

### 6.1. Cerințele structurale specifice clasei de importanță II

Clădirea de comandă, deși structural o construcție civilă obișnuită (cap. 2.3), preia integral cerințele de proiectare seismică ale **clasei de importanță II, `γI,e = 1,20`** (cap. 1.3) — nu pentru că funcțiunea proprie a clădirii (birouri de dispecerizare, tablouri electrice) ar necesita, izolat, această clasă, ci pentru rolul ei critic în ansamblul stației: adăpostește echipamentele de protecție, comandă și automatizare fără de care transformatorul și aparatajul de 110 kV nu pot fi manevrate/protejate în siguranță, inclusiv imediat după un eveniment seismic, când necesitatea de a izola rapid un echipament avariat sau de a restabili alimentarea pe o cale alternativă este maximă.

Această încadrare se traduce, față de o clădire administrativă obișnuită de clasă III (`γI,e = 1,00`), într-o forță seismică de proiectare majorată cu 20%, aplicată integral cadrelor de beton armat ale clădirii, calculată prin metodologia obișnuită de proiectare seismică (analiză modală sau metoda forțelor laterale echivalente, funcție de regularitatea structurii, conform P100-1/2013), fără nicio particularitate suplimentară față de o clădire civilă de acest tip și regim de înălțime.

### 6.2. Grinzi de fundare de legare — cerință obligatorie la clasa II

Pentru construcțiile încadrate în **clasa de importanță II**, indiferent de tipul de sistem de fundare adoptat (fundații izolate sub stâlpi, fundații continue, sau radier general), P100-1/2013 impune prevederea unor **grinzi de fundare de legare** între toate fundațiile izolate — element constructiv care leagă rigid, la nivelul infrastructurii, toți stâlpii clădirii, cu rol dublu:

1. **Asigurarea unei comportări unitare a infrastructurii sub acțiunea seismică** — grinzile de legare împiedică deplasările relative necontrolate ale fundațiilor izolate în timpul mișcării seismice, transformând infrastructura într-un sistem practic indeformabil în plan orizontal la baza clădirii;
2. **Limitarea tasărilor diferențiate între stâlpii adiacenți** — o funcție analoagă, la scară mai mică, celei descrise pentru fundația transformatorului (cap. 5.3), redistribuind parțial eforturile între fundațiile vecine în cazul unei neomogenități locale a terenului.

Grinzile de fundare de legare se dimensionează, la nivel de predimensionare, pentru o forță axială convențională de tracțiune/compresiune, funcție de efortul axial din stâlpii pe care îi leagă și de accelerația de proiectare a amplasamentului, conform metodologiei uzuale de proiectare seismică a infrastructurii clădirilor de clasă II; dimensionarea definitivă (secțiune, armare) se realizează la faza PT, pe baza eforturilor rezultate din modelul spațial complet al clădirii de comandă și al schemei reale de fundare adoptate în funcție de studiul geotehnic definitiv.

### 6.3. Sistemul structural și materialele

Structura clădirii de comandă este alcătuită din **cadre de beton armat clasa C25/30**, cu planșee de beton armat, fundare pe fundații izolate sau continue (funcție de recomandarea studiului geotehnic, cap. 4.6, cu `pconv = 200 kPa` ca referință de bază, ajustată la faza PT pe stratul efectiv de sub amprenta specifică a clădirii de comandă), legate prin grinzile de fundare descrise la cap. 6.2. Acoperișul/terasa se dimensionează la acțiunea zăpezii (`s0k = 2,0 kN/m²`, cap. 4.2) combinată cu încărcările utile de întreținere.

Deschiderile structurale se corelează cu amplasarea celulelor de medie tensiune și a tablourilor de comandă (date din proiectul tehnologic de instalații electrice), fără particularități structurale suplimentare față de metodologia obișnuită de proiectare a cadrelor de beton armat de clasă II — un contrast direct față de complexitatea specifică celorlalte trei obiecte ale stației (fundație masivă, portale zvelte, cuvă etanșă), care confirmă, prin comparație, caracterul de "adăpost civil obișnuit" descris la cap. 2.3.

---

## 7. Portalele metalice de 110 kV — breviar de calcul

### 7.1. Descrierea sistemului și geometria de calcul

Portalul de 110 kV analizat ca exemplu de calcul este un **portal terminal de linie** — configurația cea mai solicitată mecanic dintre tipurile de portale ale unei stații (cap. 7.5), la care conductoarele electrice se ancorează direct pe structură (spre deosebire de portalele de trecere/susținere intermediară, unde conductorul continuă practic fără întrerupere de tensionare). Structura este alcătuită din **cadre metalice din oțel S235/S355**, stâlpi de secțiune adecvată (profile laminate sau zăbrelite) rigidizați la partea superioară printr-o riglă/fermă orizontală de susținere a lanțurilor de izolatoare, cu **înălțime de calcul `H = 11 m`** (înălțimea de montare a conductoarelor, corelată cu gabaritele de izolație, cap. 10).

### 7.2. Acțiunea vântului pe conductoarele electrice

Forța de vânt pe conductoarele susținute de portal se calculează cu formula specifică elementelor cilindrice suspendate (SR EN 1991-1-4/CR 1-1-4):

**`F_w = qp·cf·d·L·cscd`**

unde: `qp` — presiunea de vârf a vântului la înălțimea conductorului; `cf` — coeficient de forță pentru element cilindric (funcție de numărul Reynolds); `d` — diametrul conductorului; `L` — deschiderea (lungimea de conductor tributară portalului, între portalul analizat și portalul/stâlpul vecin); `cscd` — coeficient structural (răspuns dinamic, apropiat de 1,0 pentru elemente flexibile de tip cablu).

**Aplicație numerică** (`qp = 0,9 kN/m²`; `cf = 1,1`; `d = 0,024 m`; `L = 60 m`; portal cu **3 conductoare de fază**):

`F_w (un conductor) = qp·cf·d·L·cscd = 0,9 · 1,1 · 0,024 · 60 · 1,0 = 0,9·1,1 = 0,99; 0,99·0,024 = 0,02376; 0,02376·60 = **1,4256 kN**` (pe un singur conductor).

Pentru **3 conductoare**: `F_w,total ≈ 3 · 1,4256 ≈ **4,3 kN**` — forța orizontală totală de vânt transmisă portalului prin cele trei conductoare de fază ancorate pe el, acțiune orizontală care se adaugă (cap. 7.5) forței de vânt direct pe structura metalică a portalului însuși.

### 7.3. Acțiunea chiciurii (gheții) pe conductor — formula CR 1-1-3

Greutatea suplimentară a stratului de gheață depus pe conductor, pentru o secțiune inelară de gheață de grosime `tk` în jurul conductorului de diametru `d`, se calculează cu formula ariei inelului de gheață înmulțită cu densitatea gheții:

**`g_ice = ρ_ice·g·(π/4)·[(d + 2·tk)² − d²]`**

Semnificația formulei: aria secțiunii transversale a manșonului de gheață depus pe conductor este diferența dintre aria cercului exterior (conductor + gheață, diametru `d + 2tk`) și aria cercului interior (conductorul propriu-zis, diametru `d`) — formula clasică a ariei unei coroane circulare, aplicată aici geometriei de depunere a gheții, presupusă simetrică (manșon uniform) în jurul conductorului.

**Aplicație numerică** (`d = 24 mm`; `tk = 20 mm`; `ρ_ice·g` — greutatea specifică a gheții, valoare normativă CR 1-1-3):

`d + 2tk = 24 + 2·20 = 64 mm`.

`(d+2tk)² − d² = 64² − 24² = 4.096 − 576 = 3.520 mm²`.

`g_ice = ρ_ice·g·(π/4)·3.520 = **24,4 N/m**` (greutate liniară a manșonului de gheață pe metrul de conductor, valoare rezultată din aplicarea densității normative a gheții și a factorului `π/4` la aria calculată mai sus).

**Pentru deschiderea de 60 m și 3 conductoare:**

`G_ice,total = 24,4 N/m · 60 m · 3 = 24,4 · 180 = **4.392 N ≈ 4,39 kN**` — greutate suplimentară verticală, adăugată direct greutății proprii a conductoarelor, care se transmite portalului ca încărcare gravitațională suplimentară la nivelul punctelor de ancorare.

**Gruparea vânt+gheață.** Conform CR 1-1-3/CR 1-1-4, acțiunea chiciurii se combină cu acțiunea vântului într-o grupare specifică (vânt redus, aplicat simultan cu gheața depusă pe conductor — situația fizică reală în care conductorul, îngroșat de manșonul de gheață, prezintă și o suprafață de expunere la vânt mărită față de conductorul neacoperit), grupare care se verifică separat de gruparea „vânt maxim, fără gheață" (mai severă ca valoare a vântului, dar fără greutatea suplimentară a gheții) — ambele situații se verifică la portal, reținându-se, pentru fiecare element de calcul, gruparea dimensionantă.

### 7.4. Tracțiunea neechilibrată a conductoarelor la portalul terminal — mecanismul fizic

**De ce apare moment mare la baza portalului terminal.** La un portal de trecere/susținere intermediară, conductorul continuă practic neîntrerupt de la un portal la altul (portalul susține conductorul, dar nu îl "termină") — tracțiunile mecanice din conductor, egale și de sens opus pe cele două părți ale portalului, se echilibrează reciproc, iar portalul resimte doar o mică diferență reziduală (din diferența de temperatură/tensionare între cele două deschideri adiacente, de regulă mică). La un **portal terminal** — situația de la intrarea/ieșirea unei linii electrice aeriene din stație, unde conductorul aerian se ancorează definitiv pe structura portalului, de unde continuă apoi, în interiorul stației, prin bare/cabluri rigide de joasă tensionare, sau unde linia se termină efectiv — tracțiunea mecanică a conductorului dinspre linia aeriană **nu mai are o tracțiune egală și de sens opus care să o echilibreze** de partea cealaltă a portalului; întreaga tracțiune a conductorului, acumulată pe deschiderea către portalul/stâlpul vecin al liniei aeriene, se aplică **neechilibrat**, orizontal, la punctul de ancorare de pe portal, la o înălțime `h` deasupra bazei stâlpului.

Acest mecanism — o forță orizontală mare, aplicată la înălțime, cu braț de pârghie egal cu toată înălțimea utilă a portalului — este motivul pentru care **portalele terminale sunt sistematic mai solicitate mecanic decât portalele de trecere/susținere** ale aceleiași linii, și motivul pentru care exemplul de calcul al prezentului memoriu este dezvoltat tocmai pentru configurația terminală, cea dimensionantă.

**Calculul momentului la bază:**

**`M_bază = Σ T_max · h`**

cu `T_max` — tracțiunea maximă de calcul a unui conductor (valoare rezultată din calculul mecanic al liniei electrice aeriene — tensionarea la montaj, corectată pentru efectele termice și pentru acțiunile climatice, dată de proiectul tehnologic/de linie electrică), `h` — brațul de pârghie (înălțimea punctului de ancorare a conductorului deasupra bazei stâlpului).

**Aplicație numerică** (**3 conductoare**, `T_max = 20 kN` pe fiecare conductor, `h = 11 m`):

`M_bază = 3 · 20 · 11 = 60 · 11 = **660 kNm** per stâlp` — momentul de răsturnare la baza stâlpului portalului terminal, generat exclusiv de tracțiunea neechilibrată a celor trei conductoare de fază ancorate la partea superioară a structurii.

Această valoare, `660 kNm`, este de un ordin de mărime cu mult superior momentelor generate de vânt și de chiciură calculate separat (cap. 7.2, 7.3) aplicate direct pe brațul portalului — confirmarea, prin calcul, a afirmației calitative de mai sus: **tracțiunea neechilibrată a conductoarelor este, la portalul terminal, acțiunea dimensionantă**, nu vântul sau chiciura considerate izolat (deși ambele se combină, obligatoriu, cu tracțiunea, în gruparea de calcul finală, cap. 7.5).

### 7.5. Combinarea acțiunilor la portalul terminal

Solicitarea de calcul la baza stâlpului portalului terminal rezultă din combinarea, conform CR 0/SR EN 1990, a celor trei acțiuni descrise mai sus, plus greutatea proprie a structurii metalice:

1. **Moment din tracțiunea neechilibrată a conductoarelor** (`M_bază = 660 kNm`, cap. 7.4) — acțiune practic permanentă (tracțiunea de montaj a liniei), prezentă în toate combinațiile;
2. **Moment din vântul pe conductoare** (`F_w ≈ 4,3 kN`, cap. 7.2, aplicat la înălțimea medie a conductoarelor) — acțiune variabilă, combinată cu tracțiunea sau, în gruparea „vânt maxim", ca acțiune principală;
3. **Moment/forță din chiciura pe conductoare** (`G_ice ≈ 4,39 kN`, cap. 7.3, acțiune verticală suplimentară, cu efect indirect asupra efortului axial din stâlp și, prin excentricitatea eventuală a punctelor de ancorare, asupra momentului la bază) — combinată cu un vânt redus, conform grupării specifice CR 1-1-3;
4. **Vânt/chiciură pe structura metalică proprie a portalului** — acțiune suplimentară, direct pe elementele metalice ale cadrului, care se adaugă acțiunilor transmise de conductoare.

Combinația guvernantă pentru dimensionarea secțiunii de bază a stâlpului portalului terminal rezultă, la nivel de predimensionare, dominată de momentul din tracțiunea neechilibrată (`660 kNm`), la care se adaugă contribuția vântului pe conductoare și pe structură, conform grupării fundamentale SLU (`γG = 1,35`, `γQ = 1,50`, CR 0/2012).

### 7.6. Verificarea secțiunii stâlpului la interacțiunea N-M

Secțiunea de bază a stâlpului portalului (profil metalic laminat sau zăbrelit, oțel S355, cap. 9.2) se verifică la interacțiunea efort axial-moment încovoietor conform **SR EN 1993-1-1**, prin criteriul de interacțiune:

`N_Ed/N_Rd + M_Ed/M_Rd ≤ 1,0` (formă simplificată a criteriului de interacțiune pentru elemente comprimate-încovoiate, aplicat aici la nivel de predimensionare; verificarea riguroasă, cu coeficienții de interacțiune completi `kyy`, `kzy` din anexa A/B a SR EN 1993-1-1 și cu verificarea la flambaj prin încovoiere și la flambaj lateral prin încovoiere-răsucire, se conduce la faza PT pe secțiunea și pe profilul metalic definitiv alese).

Cu momentul de calcul dominat de tracțiunea conductoarelor (`M_Ed ≈ 1,3–1,4 × 660 kNm`, majorat cu contribuția vântului și cu coeficienții parțiali de grupare) și cu efortul axial de calcul (greutatea proprie a structurii plus componenta verticală din chiciură), verificarea secțiunii adoptate conduce la un **grad de utilizare de ordinul `≈ 0,85`** — o valoare care confirmă adecvarea secțiunii metalice alese, cu o rezervă moderată (15%), coerentă cu caracterul dimensionant al combinației vânt+gheață+tracțiune la un portal terminal, dar care nu este o rezervă foarte generoasă, motiv pentru care verificarea definitivă a profilului metalic exact (cu proprietățile de catalog complete și cu combinația de acțiuni riguroasă din proiectul de linie electrică) se reia obligatoriu la faza PT.

**Verificarea deplasării laterale (drift) la vârful stâlpului** — limitată la `≤ H/150` (limită specifică structurilor metalice suplu, care asigură atât funcționarea corectă a izolatoarelor montate rigid la partea superioară — cap. 3.7, punctul 3 — cât și evitarea unui efect P-Δ semnificativ la o structură cu masă proprie relativ mică, dar cu o forță orizontală mare aplicată la vârf); pentru `H = 11 m`, limita corespunde unei deplasări maxime admise de `73,3 mm` la vârful stâlpului, verificată la faza PT pe modelul complet al structurii metalice.

### 7.7. Verificarea la răsturnare a fundației portalului

Fundația izolată a stâlpului portalului (bloc de beton armat, dimensionat pe baza presiunii convenționale a terenului `pconv = 200 kPa`, cap. 4.6) se verifică la răsturnare — stabilitatea globală a ansamblului fundație+stâlp sub acțiunea momentului de răsturnare calculat la baza structurii (`M_bază`, majorat cu contribuțiile din cap. 7.5):

**Criteriul de verificare:** `M_stabilizator / M_răsturnare ≥ 1,5`

unde `M_stabilizator` rezultă din momentul generat de greutatea proprie a fundației și a stâlpului metalic, calculat față de muchia de răsturnare a tălpii fundației, iar `M_răsturnare` este momentul de calcul transmis de structura metalică la baza fundației (dominat, conform cap. 7.4–7.5, de tracțiunea neechilibrată a conductoarelor).

Coeficientul de siguranță la răsturnare adoptat, **`≥ 1,5`**, este superior coeficienților uzuali de stabilitate la răsturnare a fundațiilor obișnuite (adesea `≥ 1,2–1,3`), majorare justificată de caracterul repetitiv și practic permanent al acțiunii dominante (tracțiunea conductoarelor, o încărcare cvasi-statică prezentă în toate condițiile de exploatare, nu doar o încărcare accidentală rară) și de consecințele funcționale grave ale unei eventuale înclinări/răsturnări a unui portal terminal de 110 kV (întreruperea liniei electrice, posibilă rupere a conductoarelor, risc pentru personal).

### 7.8. Verificarea la smulgere a buloanelor de ancoraj

Placa de bază a stâlpului portalului se fixează pe fundație prin **buloane de ancoraj pretensionate**, dimensionate să transfere atât efortul axial de compresiune (prin contact placă-beton), cât și componenta de întindere generată de momentul de răsturnare (buloanele situate pe partea „întinsă" a plăcii de bază preiau efectiv o forță de smulgere, în timp ce buloanele de pe partea comprimată lucrează, practic, doar la strângere/pretensionare).

Forța de smulgere pe buloanele cele mai solicitate rezultă din echilibrul plăcii de bază sub momentul `M_bază` (majorat, cap. 7.5) și efortul axial de compresiune, prin metodologia uzuală de calcul a plăcilor de bază solicitate excentric (SR EN 1993-1-8): cu brațul de pârghie dintre rândurile de buloane de pe cele două fețe ale plăcii și cu efortul axial redus (portal zvelt, cap. 2.2), forța de smulgere pe buloanele întinse rezultă semnificativă, dimensionantă pentru alegerea diametrului și a clasei de rezistență a buloanelor. Se adoptă **buloane clasa 8.8/10.9** (cap. 9.2), verificate la întindere (`Ft,Rd`) și, unde geometria plăcii o impune, la interacțiunea întindere-forfecare (efect de forfecare orizontală din reacțiunea structurii la acțiunile orizontale de vânt), cu grad de utilizare confirmat la faza PT pe baza geometriei definitive a plăcii de bază și a diametrului efectiv al buloanelor alese din proiectul de execuție.

---

## 8. Cuva de retenție a uleiului electroizolant — breviar de calcul

### 8.1. Dimensionarea volumului de retenție

**Cerința normativă (NTE 007, reglementări de mediu pentru instalații cu ulei electroizolant):** cuva de retenție trebuie să asigure un volum util **`V ≥ 100%` din volumul total de ulei electroizolant** al transformatorului, plus o rezervă pentru apa de stingere, în cazul unei intervenții cu instalația de stingere a unui eventual incendiu de transformator, și pentru precipitațiile căzute direct în cuvă (fiind un colector deschis la partea superioară).

**Date de intrare:** transformator de **40 MVA**, cu un volum de ulei electroizolant estimat, funcție de raportul uzual putere/volum de ulei al transformatoarelor de acest tip, la **~30–40 mc**.

**Volumul adoptat:** ținând cont de rezerva pentru apa de stingere/pluvial descrisă mai sus, se adoptă un volum util de retenție de **~50 mc**, cu dimensiuni în plan **7,0 × 5,0 m** și înălțime utilă **1,5 m**:

`V_adoptat = 7,0 · 5,0 · 1,5 = **52,5 mc**` — superior volumului minim necesar (30–40 mc de ulei), cu rezerva funcțională descrisă mai sus inclusă direct în dimensionarea geometrică.

**Alcătuirea generală:** radier de beton armat + pereți perimetrali de beton armat, monolit, sub grătarul de piatră spartă pe care reazemă fundația transformatorului (cap. 5.1), cu un sistem de evacuare controlată (separator de hidrocarburi, conform reglementărilor de mediu, tratat de proiectul de instalații, nu de prezentul memoriu structural) care golește apa pluvială curată, reținând integral uleiul într-un eventual eveniment de scurgere.

### 8.2. Verificarea la fisurare — etanșeitate conform SR EN 1992-3

**De ce cuva necesită o verificare de fisurare distinctă, mai severă decât cea a unei fundații obișnuite.** Orice element de beton armat solicitat la încovoiere/întindere dezvoltă, sub sarcină de exploatare, fisuri de deschidere mică, controlate prin armare — la o fundație obișnuită, deschiderea admisă a acestor fisuri este stabilită exclusiv din considerente de protecție a armăturii împotriva coroziunii (SR EN 1992-1-1, funcție de clasa de expunere). La un rezervor destinat reținerii unui lichid — cuva de retenție —, deschiderea fisurii capătă o semnificație funcțională suplimentară, directă: **o fisură prea deschisă constituie o cale efectivă de scurgere a lichidului conținut**, indiferent dacă armătura este sau nu protejată corespunzător împotriva coroziunii pe termen lung.

Din acest motiv, proiectarea cuvei de retenție se conduce conform **SR EN 1992-3** (Proiectarea structurilor de beton pentru reținerea lichidelor), care stabilește **clase de etanșeitate** distincte de clasele de expunere obișnuite ale SR EN 1992-1-1, funcție de gradul de acceptabilitate al unei eventuale scurgeri:

- **Clasa de etanșeitate 0** — scurgerea de lichid este acceptabilă (sau se acceptă o anumită pătrundere de umiditate) — nepotrivită pentru un rezervor de ulei electroizolant, unde orice scurgere este inacceptabilă din perspectiva protecției mediului;
- **Clasa de etanșeitate 1** — se limitează apariția fisurilor care traversează complet secțiunea elementului (fisurare pasantă); se acceptă o urmă de umezire pe fața opusă a peretelui, dar nu curgere efectivă de lichid — clasa adoptată pentru cuva de retenție a stației analizate, coerentă cu practica de proiectare a bazinelor/cuvelor de retenție industriale, unde se cere o etanșeitate ridicată, dar radierul/pereții rămân, totuși, elemente de beton armat monolit (nu structuri hidroizolate suplimentar cu membrane, soluție rezervată clasei de etanșeitate 2, pentru cerințe de etanșeitate totală, tipic bazine de apă potabilă);
- **Clasa de etanșeitate 2** — etanșeitate totală, fără nicio scurgere admisă, tipic pentru rezervoare de apă potabilă sau structuri cu cerințe stricte suplimentare — nu este cazul cuvei de retenție a uleiului, unde clasa 1 este considerată acoperitoare, dat fiind că funcția cuvei este de retenție temporară a unei eventuale scurgeri accidentale, nu de stocare permanentă a unui lichid sub presiune hidrostatică continuă.

**Limita de deschidere a fisurii adoptată pentru clasa de etanșeitate 1:** **`wk ≤ 0,2 mm`** — limită sensibil mai severă decât limita uzuală de `0,3–0,4 mm` admisă la elemente de beton armat obișnuite în clase de expunere XC/XD moderate (SR EN 1992-1-1), și aplicată aici la toate elementele cuvei aflate în contact cu uleiul (radier și pereți).

**Măsurile constructive care asigură respectarea limitei `wk ≤ 0,2 mm`:**

1. **Armătură deasă, cu diametre moderate** — pentru o deschidere de fisură dată, controlul se obține mai eficient prin bare de diametru mai mic, dispuse la interax mai des, decât prin bare de diametru mare la interax rar (formula de calcul a deschiderii fisurii din SR EN 1992-1-1/1992-3 este direct proporțională cu distanța dintre barele de armătură) — motiv pentru care armarea pereților și a radierului cuvei se face cu bare de diametru moderat, la interax redus, nu cu bare groase la interax mare (care ar respecta procentul de armare necesar, dar ar produce fisuri mai deschise);
2. **Acoperire de beton majorată** (`cnom = 40–50 mm`, cap. 9.1) — pe lângă rolul de protecție anticorozivă (cerință obișnuită), acoperirea mai mare contribuie și la limitarea deschiderii fisurii la fața expusă a betonului, prin distanțarea planului de fisurare de fibra extremă expusă direct uleiului;
3. **Beton clasa C30/37, cu permeabilitate redusă și P8** — clasificarea de gradul de impermeabilitate **P8** (clasificare românească tradițională pentru betoane hidrotehnice, complementară clasei de rezistență) confirmă performanța de permeabilitate redusă a betonului adoptat, dincolo de simpla verificare a deschiderii fisurii — un beton cu permeabilitate scăzută limitează și migrarea lentă a lichidului prin porozitatea proprie a matricei de beton, între fisuri;
4. **Procent minim de armare pentru controlul fisurării de contracție/hidratare** (`As,min`, SR EN 1992-1-1 §7.3.2) — verificat suplimentar față de armătura rezultată din calculul de rezistență, dat fiind riscul specific elementelor masive/lungi (radier, pereți continui) de fisurare din contracția de hidratare a betonului proaspăt, fenomen distinct de fisurarea sub sarcină de exploatare, dar la fel de relevant pentru etanșeitatea finală a cuvei.

**Concluzia verificării de fisurare:** cu măsurile constructive de mai sus (armătură deasă, acoperire majorată, beton P8, procent minim de contracție), deschiderea de calcul a fisurii se menține sub limita `wk ≤ 0,2 mm` normată pentru clasa de etanșeitate 1 — verificare care, la faza DTAC, se confirmă de principiu prin alegerea clasei de beton și a schemei generale de armare descrise mai sus; calculul exact al deschiderii fisurii (`wk`, formula completă SR EN 1992-1-1 §7.3.4, cu diametrele și interaxele definitive de armare) se reface la faza PT, pentru fiecare panou de perete și pentru radier, pe baza solicitărilor exacte rezultate din calculul hidrostatic și din interacțiunea cu terenul.

### 8.3. Verificarea la plutire (UPL — Uplift)

**Fenomenul fizic.** Cuva de retenție este, în majoritatea timpului de exploatare a stației (în afara unui eveniment de scurgere de ulei), un rezervor **gol** — un volum de beton armat cu pereți relativ subțiri comparativ cu suprafața lui în plan, îngropat parțial în teren. Dacă nivelul apei subterane sau al apei pluviale acumulate în jurul cuvei (în afara ei, în terenul înconjurător) se ridică deasupra unei anumite cote, apa exercită o **subpresiune (împingere de jos în sus, uplift)** pe radierul cuvei — exact fenomenul fizic prin care o barcă (sau orice corp gol, cu densitate medie mai mică decât a apei pe care o dezlocuiește) plutește: dacă greutatea proprie a structurii nu este suficientă pentru a contrabalansa forța de subpresiune calculată pe aria radierului, cuva goală tinde să fie "împinsă în sus" de apă — fenomen care, la o structură rigidă precum o cuvă de beton, nu se manifestă ca o plutire propriu-zisă (structura nu este liberă să se ridice fizic, fiind în contact continuu cu terenul înconjurător), ci ca o **pierdere a contactului la interfața radier-teren, fisurare a radierului prin flexiune inversă, sau ruperea legăturilor structurale** dintre radier și pereți — o avarie structurală gravă, care ar compromite direct etanșeitatea verificată la cap. 8.2.

**Criteriul de verificare (UPL, SR EN 1997-1 §2.4.7.4):**

**`γ = G · 0,9 / (U · 1,1) ≥ 1,0`**

unde: `G` — greutatea stabilizatoare (greutatea proprie a structurii cuvei, care se opune plutirii); `U` — forța de subpresiune (rezultată din nivelul apei subterane/pluviale și din aria radierului); factorii `0,9` (aplicat greutății stabilizatoare) și `1,1` (aplicat subpresiunii dezavantajoase) sunt coeficienții parțiali de siguranță specifici verificării UPL, aplicați **defavorabil** ambelor mărimi — greutatea stabilizatoare este **redusă** cu factorul `0,9` (se lucrează cu o valoare minimă, favorabilă, a acțiunii care se opune fenomenului nedorit, principiu identic celui aplicat oricărei verificări de stabilitate la SR EN 1990, unde acțiunile/rezistențele favorabile se afectează de coeficienți parțiali subunitari, nu supraunitari), iar subpresiunea este **majorată** cu factorul `1,1` (se lucrează cu o valoare maximă, defavorabilă, a acțiunii care produce fenomenul nedorit) — o dublă penalizare, coerentă cu principiul general de proiectare la starea limită ultimă, aplicată aici specific verificării de plutire, unde incertitudinile asupra nivelului real al apei subterane (care poate varia sezonier și poate fi subestimat de studiul geotehnic dacă nu se măsoară pe un ciclu anual complet) justifică o marjă de siguranță explicită și cuantificată prin acești doi factori.

**Aplicație numerică:**

**Forța de subpresiune** (aria radierului `A = 35 mp`, corespunzătoare aproximativ dimensiunilor cuvei de la cap. 8.1, adăugând lățimea pereților; înălțimea coloanei de apă deasupra radierului `hw = 1,3 m`, corespunzătoare unui nivel al apei subterane/pluviale ridicat, aproape de cota terenului sistematizat):

`U = γw·hw·A = 10 · 1,3 · 35 = **455 kN**` (unde `γw = 10 kN/mc`, greutatea specifică a apei, valoare rotunjită uzuală).

**Greutatea stabilizatoare** (radier + pereți ai cuvei, greutate proprie de beton armat):

`G_cuvă = G_radier + G_pereți = 350 + 270 = **620 kN**`.

**Verificarea:**

`γ = G·0,9 / (U·1,1) = 620·0,9 / (455·1,1) = 558 / 500,5 = **1,12 ≥ 1,0`** ✓.

**Interpretarea rezultatului.** Coeficientul de siguranță la plutire rezultat, **`1,12`**, satisface criteriul normativ (`≥ 1,0`), dar cu o marjă relativ redusă (**12%**) — o rezervă mult mai mică decât marjele uzuale ale altor verificări de stabilitate ale prezentului memoriu (de exemplu, `≥ 1,5` la răsturnarea portalelor, cap. 7.7). Această marjă redusă nu este întâmplătoare: verificarea UPL a unei cuve de retenție, structură cu suprafață mare în plan și pereți relativ subțiri, este, prin natura fenomenului fizic, o verificare "strânsă" — orice majorare suplimentară a greutății proprii (pereți/radier mai groase) pentru a mări artificial marja de siguranță ar contraveni, parțial, principiului de economie a materialului, dar și cerinței de a nu îngroșa excesiv radierul dincolo de necesarul structural/de etanșeitate (cap. 8.2). Din acest motiv, verificarea UPL rămâne un **punct de atenție explicit** pentru faza PT, unde nivelul apei subterane trebuie confirmat riguros prin studiul geotehnic definitiv (măsurători pe un ciclu hidrologic reprezentativ, nu o singură citire de foraj), iar, dacă marja rezultată la datele definitive ar scădea sub `1,0`, soluțiile de corecție uzuale (ancoraje suplimentare în teren, drenaj activ perimetral pentru controlul nivelului apei, sau majorarea punctuală a grosimii radierului) se evaluează explicit, fără a compromite verificarea de fisurare de la cap. 8.2.

### 8.4. Verificarea pereților cuvei la împingerea pământului și a apei

Pereții cuvei, îngropați parțial, se verifică suplimentar la împingerea laterală a terenului și a apei subterane, prin combinarea celor două componente:

**`p(z) = K0·γ·z + γw·z`**

unde `K0` este coeficientul de împingere în repaus a pământului (funcție de unghiul de frecare internă al terenului de umplutură, conform studiului geotehnic), `γ` greutatea specifică a terenului, iar componenta `γw·z` reprezintă împingerea hidrostatică a apei subterane, aplicată suplimentar peste nivelul apei stabilit la cap. 8.3, pe toată înălțimea peretelui aflată sub acest nivel. Combinarea celor două componente (împingere de pământ + împingere hidrostatică) reprezintă gruparea dimensionantă pentru armarea orizontală a pereților cuvei, verificată, ca și radierul, la limita de fisurare `wk ≤ 0,2 mm` (cap. 8.2), dat fiind că peretele exterior al cuvei este, la fel ca radierul, un element în contact cu terenul/apa subterană, unde o fisurare necontrolată ar permite infiltrarea apei subterane spre interiorul cuvei (fenomen invers celui descris la cap. 8.2, dar la fel de nedorit — o cuvă care "primește" apă subterană nedorită își pierde volumul util de retenție și complică gestionarea unui eventual eveniment de scurgere de ulei).

---

## 9. Materialele și clasele de expunere — justificarea pe fiecare obiect

### 9.1. Betoane

| Element | Clasă beton | Clasă expunere | Justificare |
|---|---|---|---|
| Fundație transformator | **C25/30** | **XC2** | element îngropat parțial, expunere la umezeala terenului, fără agresivitate chimică deosebită; masa mare (cap. 5) nu impune o clasă de rezistență superioară, dat fiind gradul de utilizare redus (cap. 5.3) |
| Clădire de comandă | **C25/30** | **XC1/XC2** (funcție de element) | clădire civilă obișnuită, expunere standard |
| **Cuvă retenție ulei** | **C30/37, P8** | **XA1-2 + etanșeitate dedicată** | clasă majorată față de o fundație obișnuită, pentru performanța de permeabilitate redusă (cap. 8.2) și pentru rezistența la agresivitatea chimică ușoară/moderată a solului/apei subterane locale (XA1-2), plus rezistență la contactul incidental cu ulei electroizolant (hidrocarburi), care nu atacă chimic betonul întărit corect, dar impune o suprafață densă, fără porozitate deschisă |
| Elemente suprateran expuse (soclurile portalelor, elemente exterioare) | — | **XC4/XF1** | ciclu îngheț-dezgheț, expunere directă la precipitații, conform climatului amplasamentului |

Coeficient parțial beton `γc = 1,50` (grupări fundamentale/seismice), `αcc = 1,0` (NA România), identic metodologiei aplicate oricărei construcții de beton armat din România.

### 9.2. Oțeluri

| Element | Material | Justificare |
|---|---|---|
| Portale metalice — profile principale | **S355J2** | rezistență ridicată, necesară pentru secțiuni zvelte solicitate la interacțiunea N-M sub tracțiunea conductoarelor (cap. 7.6) |
| Buloane de ancoraj | **clasa 8.8/10.9** | rezistență la întindere ridicată, necesară pentru preluarea forței de smulgere generate de momentul de răsturnare (cap. 7.8) |
| Protecție anticorozivă | **zincare la cald, grosime strat ≥85 μm** (SR EN ISO 1461) | durabilitate 50 de ani fără mentenanță de vopsitorie periodică, soluție consacrată pentru structurile metalice suprateran ale stațiilor electrice, expuse integral intemperiilor pe toată durata de viață proiectată |

### 9.3. Armătura de oțel-beton

Se folosește uniform, la toate cele patru obiecte, oțel **B500C** conform SR EN 10080/SR 438: `fyk = 500 N/mm²`, `γs = 1,15` → `fyd = 434,8 N/mm²`, `Es = 200.000 N/mm²`, clasa de ductilitate **C** (`εuk ≥ 7,5%`) — clasă obligatorie la elementele proiectate să lucreze în domeniul disipativ (cadrele clădirii de comandă, cap. 6) și, ca soluție unică pe șantier pentru evitarea confuziilor de aprovizionare, extinsă și la elementele care nu necesită ductilitate ridicată (fundația trafo, cuva de retenție) — un cost adițional nesemnificativ față de rezerva de siguranță suplimentară adusă.

### 9.4. Sinteza acoperirilor de beton (cnom)

| Element | Expunere | cnom adoptat |
|---|---|---|
| Fundație transformator | XC2 | **45 mm** |
| Cuvă retenție (radier + pereți) | XA1-2 + etanșeitate | **40–50 mm** |
| Clădire de comandă | XC1/XC2 | 25–35 mm (funcție de element) |
| Fundații izolate portale | XC2 | 40–45 mm |

Acoperirea majorată la fundația transformatorului și la cuva de retenție (45–50 mm, față de 25–35 mm la clădirea de comandă) reflectă direct expunerea mai severă a acestor două obiecte (contact permanent cu terenul, respectiv cu uleiul electroizolant și cu apa subterană) și rolul suplimentar al acoperirii în controlul deschiderii fisurii la cuvă (cap. 8.2).

---

## 10. Coordonarea cu instalațiile electrice

### 10.1. Nivelurile de fundare și cotele de montaj

Cotele de fundare ale celor patru obiecte (adâncimea blocului fundației transformatorului, cota radierului cuvei de retenție, adâncimea fundațiilor portalelor, cota de fundare a clădirii de comandă, cap. 4.5) se corelează obligatoriu cu proiectul tehnologic de instalații electrice, care stabilește: cota exactă de montaj a transformatorului (funcție de nivelul căii de rulare și de accesul de manevră necesar la montaj/demontaj); traseul și adâncimea cablurilor electrice de medie și înaltă tensiune între obiectele stației (care traversează, la cote relativ mici sub teren, spațiul dintre fundațiile celor patru obiecte, condiționând local adâncimile minime de fundare acceptabile pentru a nu intersecta traseele de cablu); și cota de amplasare a echipamentelor de comutație în raport cu nivelul finit al platformei stației.

### 10.2. Priza de pământ comună

Toate cele patru obiecte ale stației (fundația transformatorului, portalele metalice, clădirea de comandă, cuva de retenție, prin armătura ei) se leagă la o **priză de pământ comună**, unică pentru întreaga incintă, conform proiectului tehnologic de instalații electrice — o cerință funcțională (protecție la supratensiuni, la defecte de izolație, la descărcări atmosferice pe portale) care intersectează direct proiectul de rezistență în două puncte: (a) armătura elementelor de beton armat ale celor patru obiecte se conectează electric la centura de împământare, prin conexiuni dedicate prevăzute la faza de execuție (nu doar armătură "flotantă"), și (b) traseul centurii de împământare, îngropat pe conturul incintei, se coordonează cu fundațiile portalelor și cu cuva de retenție, pentru a evita intersectarea nefavorabilă a traseelor de cablu electric cu elementele structurale de fundare.

### 10.3. Gabaritele portalelor rezultate din distanțele de izolație

Înălțimea de calcul a portalelor (`H = 8–14 m`, cap. 2.2, cu exemplul de calcul dezvoltat la `H = 11 m`, cap. 7.1) și distanța orizontală dintre stâlpii portalului nu sunt alegeri structurale libere, ci rezultă **integral din distanțele de izolație și de gabarit** impuse de **NTE 001/03/00** (coordonarea izolației) pentru nivelul de tensiune de 110 kV: distanța minimă între faze, distanța minimă față de sol (pentru siguranța personalului de exploatare și pentru evitarea descărcărilor disruptive la nivelul solului), și distanța minimă între conductoarele sub tensiune și structura metalică pusă la pământ a portalului. Aceste valori, stabilite de proiectul tehnologic de instalații electrice, constituie date de intrare fixe pentru proiectul de rezistență — geometria portalului (cap. 7.1) nu poate fi modificată din considerente structurale (de exemplu, pentru a reduce înălțimea și, implicit, momentul de răsturnare calculat la cap. 7.4) fără o renegociere explicită cu proiectul tehnologic, care ar afecta direct siguranța electrică a instalației. Coordonarea completă a acestor gabarite se detaliază în memoriul de instalații electrice al aceleiași documentații, document care nu se dublează în prezentul memoriu structural.

---

## 11. Tabel de sinteză a gradelor de utilizare

| Verificare | Obiect | Grad de utilizare / rezultat |
|---|---|---|
| Presiune pe teren | Fundație transformator | **0,26** (intenționat redus, cap. 5.3) |
| Vibrații (`f_n` vs. 100 Hz) | Fundație transformator | sub-rezonant (`f_n ≈ 15–30 Hz ≪ 100 Hz`) ✓ |
| Moment izolator (seism amplificat, `M_izolator` vs. catalog) | Bucșe/izolatoare pe fundație trafo și pe portale | verificare critică vs. catalog IEC 62271-207/61463 — confirmată prin datele definitive de echipament la PT |
| Interacțiune N-M (vânt+gheață+tracțiune) | Portal 110 kV | **≈ 0,85** |
| Stabilitate la răsturnare a fundației | Portal 110 kV | `M_stab/M_răst ≥ 1,5` ✓ |
| Smulgere buloane de ancoraj | Portal 110 kV | verificat, clasa 8.8/10.9, grad confirmat la PT pe geometria definitivă a plăcii de bază |
| Grinzi de fundare de legare | Clădire de comandă (clasa II) | obligatorii, prevăzute (cap. 6.2) |
| Fisurare (etanșeitate, clasa 1) | Cuvă retenție | `wk ≤ 0,2 mm` — respectat prin măsuri constructive (cap. 8.2) |
| Plutire (UPL) | Cuvă retenție | **`γ = 1,12 ≥ 1,0`** ✓ (marjă redusă, `12%`) |

---

## 12. Concluzii — cerințele A1, A2 și Af

**A1 — Rezistență mecanică generală.** Toate cele patru obiecte de construcție ale stației (fundația transformatorului, portalele metalice de 110 kV, clădirea de comandă, cuva de retenție) au fost verificate la stările limită ultime specifice comportării lor structurale dominante (cap. 2): presiune pe teren și verificare la vibrații pentru fundația masivă (cap. 5); interacțiune N-M, răsturnare și smulgere de ancoraje pentru portalele zvelte, sub combinația critică vânt+chiciură+tracțiune neechilibrată a conductoarelor (cap. 7); metodologia obișnuită de proiectare a cadrelor de beton armat, majorată la clasa de importanță II, pentru clădirea de comandă (cap. 6); rezistență generală și fisurare controlată pentru cuva de retenție (cap. 8). Toate verificările SLU se încadrează în limitele normative, cu marje diferențiate conform naturii fiecărei verificări — de la marja amplă a fundației transformatorului (grad `0,26`, intenționat, cap. 5.3), la marja strânsă a plutirii cuvei (`1,12`, cap. 8.3), fiecare marjă reflectând caracteristica fizică proprie a verificării, nu o inconsecvență de proiectare.

**A2 — Comportarea seismică, cu accent pe protecția echipamentelor fragile.** Structurile-suport ale celor patru obiecte au fost verificate la acțiunea seismică de proiectare corespunzătoare clasei de importanță II (`γI,e = 1,20`, cap. 1.3), prin metodologia specifică fiecărei tipologii — verificare de vibrații și de tasare la fundația masivă (unde acțiunea seismică nu este, de altfel, guvernantă față de acțiunile gravitaționale/de vibrație tehnologică, cap. 5); metodologie obișnuită de proiectare seismică pentru clădirea de comandă (cap. 6). Cerința **critică și specifică** a acestei categorii de construcții, dezvoltată integral în cap. 3 și tratată transversal la toate obiectele relevante, este **protecția echipamentelor ceramice fragile montate pe suporți zvelți** — izolatoarele portalelor și bucșele de trecere ale transformatorului — prin: (a) calculul explicit al forței amplificate transmise echipamentului (`Fa`, formula de amplificare cu factorii `z/H` și `Ta/T1`, cap. 3.5), comparat cu momentul de rupere garantat de producător conform IEC 62271-207/61463 (cap. 3.6); (b) măsurile de proiectare care reduc riscul de cvasi-rezonanță — decalarea frecvențelor proprii suport-echipament, alegerea echipamentelor cu calificare seismică explicită, limitarea deplasării relative (drift) a structurilor-suport (cap. 3.7). Această verificare rămâne, la faza DTAC, un **punct de atenție deschis explicit**, dependent de datele finale de catalog ale echipamentelor alese prin proiectul tehnologic, confirmat obligatoriu la faza PT — nu o verificare care se poate considera închisă doar pe baza rezistenței structurilor-suport.

**Af — Durabilitate.** Clasele de expunere și acoperirile de beton (cap. 9) au fost diferențiate pe fiecare obiect, funcție de mediul agresiv specific: XC2 la fundația transformatorului (contact cu terenul), XA1-2 și clasa de impermeabilitate P8 la cuva de retenție (agresivitate chimică a solului/apei subterane, plus cerința suplimentară de etanșeitate la ulei), zincare la cald ≥85 μm la structurile metalice ale portalelor (expunere integrală la intemperii, fără mentenanță periodică de vopsitorie). Cuva de retenție rămâne obiectul cu cerința de durabilitate cea mai complexă din întreaga stație, verificată **simultan** la capacitate portantă (cap. 8), la etanșeitate prin fisurare controlată `wk ≤ 0,2 mm` (cap. 8.2), și la stabilitate hidraulică prin verificarea de plutire `γ = 1,12` (cap. 8.3) — trei condiții independente, care trebuie satisfăcute concomitent de aceeași secțiune de beton armat, fără ca optimizarea uneia dintre ele (de exemplu, îngroșarea radierului pentru mărirea marjei la plutire) să compromită pe celelalte două (fisurarea sau costul).

**Coordonarea cu instalațiile electrice** (cap. 10) — nivelurile de fundare, priza de pământ comună și gabaritele portalelor rezultate din distanțele de izolație normate — constituie o condiție transversală, obligatorie, a întregului proiect de rezistență, fără de care niciunul dintre cele patru obiecte nu poate fi dimensionat definitiv independent de proiectul tehnologic de instalații electrice al aceleiași documentații.

**Verificare A1/A2/Af — verificator tehnic atestat MDLPA**, pe domeniile de specialitate corespunzătoare (Rezistență, respectiv, unde e cazul, Instalații electrice pentru interfața tehnologică descrisă la cap. 10). Detalierea armării, a ancorajelor și a conexiunilor de tip con-de-beton pentru buloanele de ancoraj ale portalelor (conform ghidurilor EOTA de proiectare a ancorajelor postmontate/turnate), precum și geotehnica definitivă (foraje complete, nivel al apei subterane confirmat pe ciclu hidrologic reprezentativ, esențial pentru verificarea de plutire a cuvei, cap. 8.3), se dezvoltă integral la faza PT.
