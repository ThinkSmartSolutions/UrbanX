# SCENARIU DE SECURITATE LA INCENDIU

## Parc fotovoltaic — Faza DTAC

> **Notă de aplicabilitate.** Puterea instalată a parcului fotovoltaic (P<sub>DC</sub>, exprimată în kWp) este un parametru **variabil, stabilit de beneficiar/proiectant** în funcție de proiectul concret. Prezentul scenariu de securitate la incendiu este **valabil pentru orice putere instalată**, întrucât riscurile fundamentale ale unei instalații fotovoltaice — arcul electric în curent continuu, incendiul de invertor și de post de transformare (inclusiv uleiul transformatorului), pericolul de electrocutare la intervenție prin persistența tensiunii DC și propagarea pe vegetație — **nu depind de mărimea parcului**; ele sunt de natură fizică și tehnologică și se manifestă identic la 100 kWp și la zeci de MWp. La fel, măsurile de bază (agenți de stingere neconductori, interdicția apei pe DC sub tensiune, distanțele de siguranță electrică, managementul vegetației, procedurile de intervenție) sunt independente de scară. Acolo unde apar **praguri de dimensionare** (numărul și puterea posturilor de transformare, numărul de invertoare, mărimea cuvei de retenție a uleiului, dotarea PSI, distanțele de siguranță), acestea sunt **legate de puterea instalată prin formule și praguri**, astfel încât scenariul să se aplice fără rescriere la orice valoare a lui P<sub>DC</sub>. Valoarea de **2.000 kWp (2 MWp)** este folosită pe parcursul documentului doar cu titlu de **exemplu numeric** ilustrativ, marcat ca atare.

**Întocmit în conformitate cu:** Normativul P118/1-2013 (siguranța la foc a construcțiilor), P118/2-2013 (instalații de stingere), P118/3-2015 (instalații de detectare, semnalizare și avertizare), Legea nr. 307/2006 privind apărarea împotriva incendiilor, HG nr. 571/2016 (categorii de construcții și amenajări supuse avizării/autorizării ISU), Ordinul MAI nr. 129/2016 (Norme metodologice de avizare și autorizare PSI), Normativul I7-2011 (instalații electrice de joasă tensiune) și SR EN IEC 62446, SR EN IEC 61730, SR EN 62305 (protecție împotriva trăsnetului).

---

## CAPITOLUL 1. CARACTERISTICILE CONSTRUCȚIEI / AMENAJĂRII

### 1.1. Date generale de identificare

Prezentul scenariu de securitate la incendiu se elaborează pentru obiectivul „Parc fotovoltaic cu putere instalată P<sub>DC</sub> (kWp în curent continuu), stabilită prin proiect", amplasat pe un teren cu destinație agricolă/neproductivă scos din circuitul agricol, în extravilanul unei unități administrativ-teritoriale. *(Pentru exemplificarea numerică din prezentul document se folosește o putere de referință de 2.000 kWp — 2 MWp — fără ca aceasta să limiteze aplicabilitatea scenariului la o anumită mărime.)* Obiectivul face parte din categoria instalațiilor de producere a energiei electrice din surse regenerabile (energie solară), racordate la rețeaua electrică de distribuție de medie tensiune, printr-o stație de racord (post de transformare/punct de conexiune) și un punct de măsurare a energiei.

Scenariul de securitate la incendiu constituie documentația tehnică prin care se stabilesc nivelurile de performanță la foc ale construcțiilor și amenajărilor componente, se identifică riscurile de incendiu specifice, se dimensionează măsurile de protecție și se definesc condițiile de intervenție ale forțelor de intervenție ale Inspectoratului pentru Situații de Urgență (ISU). Documentul este întocmit pentru faza de proiectare DTAC (Documentație Tehnică pentru Autorizarea executării lucrărilor de Construire) și se corelează cu proiectul tehnic, cu planurile de situație și cu schemele electrice monofilare ale instalației.

Cerința fundamentală „securitate la incendiu" este una dintre cele șase cerințe esențiale de calitate impuse construcțiilor prin Legea nr. 10/1995 privind calitatea în construcții. Îndeplinirea ei presupune ca amenajarea să fie concepută și realizată astfel încât, în caz de incendiu: (a) stabilitatea elementelor portante să fie asigurată o perioadă determinată; (b) apariția și propagarea focului și fumului să fie limitate; (c) propagarea la vecinătăți să fie limitată; (d) utilizatorii să poată părăsi amenajarea sau să fie salvați; (e) siguranța forțelor de intervenție să fie luată în considerare. La un parc fotovoltaic, criteriile (b), (c) și, cu prioritate absolută, (e) sunt determinante, în timp ce criteriul (d) — evacuarea utilizatorilor — este necritic datorită numărului redus de persoane și amenajării deschise.

### 1.1.1. Obligativitatea avizării/autorizării ISU și corelarea cu puterea

Conform HG nr. 571/2016 pentru aprobarea categoriilor de construcții și amenajări care se supun avizării și/sau autorizării privind securitatea la incendiu, un parc fotovoltaic intră sub incidența avizării/autorizării ISU în principal prin componenta sa de stație/post de transformare de medie tensiune și prin caracterul de instalație de producere a energiei electrice. Necesitatea și amploarea documentației (scenariu, plan de intervenție, avize) nu depind de o încadrare pe putere de tip „prag civil", ci de prezența echipamentelor de medie tensiune și de riscurile specifice; prin urmare, prezentul scenariu se întocmește indiferent de puterea instalată, ajustând doar dimensionarea măsurilor. Corelarea concretă cu autoritatea competentă (ISU județean) se face la depunerea documentației pentru aviz.

### 1.2. Descrierea generală a amenajării — parametri dependenți de putere

Componentele și dimensiunile amenajării se scalează cu puterea instalată P<sub>DC</sub> prin relații de dimensionare orientative, care se aplică la orice valoare a puterii:

- **Suprafața de teren ocupată** ≈ 1,5–2,2 ha/MWp (funcție de tehnologia de modul, de raportul DC/AC și de gradul de acoperire — Ground Coverage Ratio, GCR). *Exemplu la 2 MWp: cca 3,0–4,5 ha.*
- **Numărul de module** N<sub>mod</sub> = P<sub>DC</sub> [Wp] / P<sub>modul</sub> [Wp], unde P<sub>modul</sub> ≈ 550–580 Wp pentru tehnologia curentă. *Exemplu la 2.000 kWp: N<sub>mod</sub> ≈ 3.450–3.640 module.*
- **Numărul de stringuri** N<sub>string</sub> = N<sub>mod</sub> / n<sub>module/string</sub>, unde n<sub>module/string</sub> ≈ 26–30 (limitat de tensiunea maximă de sistem, 1.000 sau 1.500 Vcc).
- **Numărul de invertoare** — depinde de arhitectură: la invertoare de string, N<sub>inv</sub> ≈ P<sub>AC</sub> / P<sub>inv,unitar</sub> (P<sub>inv,unitar</sub> ≈ 33–125 kW); la invertoare centrale, 1 unitate la fiecare 0,5–1,25 MW.
- **Numărul și puterea posturilor de transformare** — a se vedea § 1.2.a de mai jos și § 3.3.

Modulele se montează pe structuri de susținere metalice (fixe, cu înclinare de 20–30 de grade orientate spre sud, sau pe sisteme de urmărire a soarelui — trackere pe o axă), indiferent de puterea totală.

Amenajarea cuprinde, din punctul de vedere al securității la incendiu, următoarele componente cu relevanță pentru riscul de incendiu:

**a) Câmpul fotovoltaic** — ansamblul de module fotovoltaice grupate în stringuri (serii de module conectate în serie, tipic 26–30 de module per string, cu tensiune de circuit deschis totală a stringului de până la 1.000–1.500 Vcc), grupate la rândul lor în tablouri de string / cutii de joncțiune DC (string combiner boxes). Câmpul reprezintă o amenajare deschisă, neîncadrată ca „construcție" propriu-zisă, dar cu risc de incendiu de origine electrică distribuit pe întreaga suprafață, indiferent de putere.

**b) Stațiile de invertoare** — se utilizează fie invertoare de string (montate distribuit pe structuri), fie invertoare centrale (montate în containere/cabine metalice), într-un număr proporțional cu puterea (a se vedea relațiile de dimensionare de la § 1.2). Invertoarele transformă curentul continuu (DC) produs de module în curent alternativ (AC). *Exemplu orientativ la 2 MW: fie cca 40–60 de invertoare de string de 33–50 kW, fie 2–4 invertoare centrale de 500–1.000 kW.*

**c) Postul (posturile) de transformare (PT) / stația de conexiune** — echipament de ridicare a tensiunii de la nivelul de ieșire al invertoarelor (0,4 kV sau 0,8 kV) la tensiunea de racord la rețea (6 kV, 20 kV etc.). Numărul și puterea nominală a transformatoarelor se dimensionează în funcție de puterea instalată: **S<sub>trafo,total</sub> [kVA] ≈ P<sub>AC</sub> [kW] / cosφ** (uzual cosφ ≈ 0,95–1,0), împărțită pe unul sau mai multe posturi (de regulă un transformator la fiecare 0,5–2,5 MVA). Postul de transformare cuprinde transformatorul de putere (uscat sau în ulei), celulele de medie tensiune, tabloul general de distribuție de joasă tensiune și aparatajul de protecție. Este, la orice putere, componenta cu cea mai mare concentrare de energie și cu cel mai ridicat risc de incendiu al obiectivului. *Exemplu la 2 MWp: în mod uzual un post de transformare cu un transformator de cca 2.000–2.500 kVA (sau două unități mai mici).*

**d) Clădirea/cabina de comandă și supraveghere** — construcție de mici dimensiuni (container tehnologic sau cabină din zidărie), care adăpostește echipamentele SCADA, sistemul de monitorizare, sistemul de securitate (supraveghere video, alarmă antiefracție), tabloul de servicii proprii și, eventual, un spațiu de birou/administrativ minimal.

**e) Împrejmuirea și drumurile de incintă** — gard perimetral (panouri de plasă bordurată sau gard din plasă zincată, înălțime 2,0–2,5 m), poartă de acces, drumuri interioare de incintă (piatră spartă compactată sau balast) și platforme betonate la posturile de transformare.

### 1.3. Regimul de înălțime, arii și volume

Din punctul de vedere al P118/1-2013, obiectivul nu conține clădiri civile sau de producție/depozitare cu regim de înălțime relevant. Componentele construite sunt:

- **Postul de transformare** — construcție parter, arie construită tipică 15–40 m², înălțime la cornișă 3,0–4,0 m, executat fie ca anvelopă prefabricată din beton armat, fie ca cabină metalică (container). Categoria de importanță „C" (normală), clasa de importanță III.
- **Cabina de comandă** — construcție parter, arie construită 12–30 m², înălțime la cornișă până la 3,0 m.
- **Structurile de susținere a modulelor** — nu constituie construcții închise; sunt structuri metalice ușoare, deschise pe toate laturile, fără arie construită închisă în sensul normativului.

Câmpul fotovoltaic, ca amenajare deschisă, nu se încadrează în noțiunea de „construcție închisă" cu arie construită supusă compartimentării antifoc, întrucât nu există spații închise, plafoane, pereți sau volume în care să se acumuleze fum și căldură. Riscul se analizează ca risc de incendiu de echipament electric în aer liber, cu potențial de propagare pe vegetație.

### 1.4. Numărul de utilizatori / personal

Parcul fotovoltaic funcționează în regim complet automatizat, nesupravegheat permanent (unmanned). Personalul prezent este ocazional și restrâns:

- personal de mentenanță — 2–4 persoane, prezente periodic (mentenanță preventivă lunară/trimestrială, curățare module, cosire vegetație);
- personal de intervenție tehnică — la avarii, prezent temporar;
- personal de pază — eventual 1 persoană sau supraveghere de la distanță (dispecerat).

Numărul maxim simultan de persoane prezente în incintă în regim normal nu depășește 4–6 persoane și nu variază semnificativ cu puterea instalată (un parc mare rămâne o instalație automatizată, cu personal ocazional; crește eventual numărul echipelor de mentenanță prezente în campanii, dar nu se ajunge la aglomerări de persoane). Nu există persoane care să înnopteze pe amplasament și nu există persoane cu dizabilități locomotorii sau cu mobilitate redusă în regim permanent. Evacuarea persoanelor nu ridică probleme de dimensionare a căilor, dat fiind numărul redus și amenajarea deschisă; problema centrală a securității la incendiu la acest tip de obiectiv nu este evacuarea persoanelor, ci **protecția echipamentelor, prevenirea propagării și, cu prioritate, siguranța forțelor de intervenție** față de riscul electric persistent.

---

## CAPITOLUL 2. RISCUL DE INCENDIU

### 2.1. Densitatea sarcinii termice și categoria de risc / pericol

Conform P118/1-2013, riscul de incendiu se stabilește în funcție de destinația spațiilor și de densitatea sarcinii termice. Pentru un parc fotovoltaic, sarcina termică este redusă și concentrată punctual, provenind din:

- materialele combustibile ale modulelor (film polimeric backsheet din PET/PVF — tip Tedlar, folie encapsulantă EVA, rame și cutii de joncțiune din material plastic) — sarcină termică mică raportată la suprafață, întrucât modulele sunt majoritar din sticlă (necombustibilă) și cadru de aluminiu;
- izolația cablurilor de curent continuu și alternativ (PVC/XLPE/PE reticulat);
- uleiul electroizolant al transformatorului, în cazul PT cu transformator în ulei (uleiul mineral are putere calorică ~42 MJ/kg; volumul de ulei crește cu puterea transformatorului — orientativ 0,4–0,7 litri de ulei per kVA, deci sursă concentrată de sarcină termică ridicată la nivel local, cu atât mai mare cu cât puterea PT este mai mare); *exemplu: un transformator de 2.000–2.500 kVA conține cca 800–1.500 litri de ulei;*
- componentele electronice și materialele plastice din invertoare;
- vegetația uscată (iarbă, buruieni) dintre rânduri — sarcină termică variabilă sezonier, cu potențial ridicat de propagare rapidă în perioada estivală secetoasă.

Pe ansamblul amenajării deschise, densitatea medie a sarcinii termice raportată la suprafața totală a parcului este foarte redusă (sub 105 MJ/m²), încadrând amenajarea în categoria de risc mic de incendiu. Concentrarea sarcinii termice este însă punctuală și semnificativă la nivelul postului de transformare (în special la varianta cu ulei) și al invertoarelor centrale.

### 2.2. Încadrarea în categorii de pericol de incendiu (spații de producție/depozitare)

Pentru componentele cu caracter de producție/echipament tehnologic, se aplică încadrarea în categorii de pericol de incendiu conform P118/1-2013, art. 2.1.1 și tabelele aferente:

**Postul de transformare cu transformator în ulei** — categoria **C (BE1c)** de pericol de incendiu (materiale și lichide combustibile cu punct de inflamabilitate peste 55 °C — uleiul mineral electroizolant are punct de inflamabilitate tipic 135–150 °C). Această încadrare atrage cerințe majorate de rezistență la foc și de separare/compartimentare, tratate la Capitolul 3.

**Postul de transformare cu transformator uscat (turnat în rășină)** — categoria **D (BE2)** sau chiar **E (BE3a)** de pericol, întrucât nu conține lichid combustibil; sarcina termică se reduce la izolația electrică solidă și componentele plastice. Se recomandă, din motive de securitate la incendiu, adoptarea soluției cu transformator uscat ori de câte ori este posibil.

**Câmpul fotovoltaic, invertoarele de string în aer liber și cabina de comandă** — se încadrează global în categoria **E (BE3a)** de pericol de incendiu — **risc mic**, spații/amenajări în care se prelucrează, utilizează sau depozitează materiale și substanțe incombustibile în stare rece, ori în care predomină echipamente electrice fără substanțe combustibile în cantitate semnificativă. Prezența materialelor combustibile (izolații, plastice) este redusă și dispersată.

**Concluzie de încadrare:** Amenajarea de ansamblu este încadrată în **categoria E de pericol de incendiu — risc mic**, cu excepția postului de transformare, care se tratează la categoria C (dacă are ulei) sau D/E (dacă este uscat). Această încadrare determină gradul de exigență al măsurilor de protecție și, corelat cu HG 571/2016, obligativitatea obținerii avizului și autorizației de securitate la incendiu (postul de transformare de MT și puterea instalată încadrează obiectivul în categoriile supuse avizării ISU).

### 2.3. Sursele potențiale de aprindere — analiză specifică fotovoltaic

Riscul real de incendiu la un parc fotovoltaic este predominant de origine **electrică**, întrucât instalația generează, transportă și transformă energie electrică pe întreaga durată a zilei, indiferent de starea de funcționare normală sau de avarie. Sursele potențiale de aprindere identificate, în ordinea relevanței practice pe baza statisticilor de incendii la instalații fotovoltaice, sunt:

**a) Arcul electric în curent continuu (arc fault DC)** — este cel mai periculos și mai specific mecanism de aprindere la instalațiile fotovoltaice. Spre deosebire de curentul alternativ, arcul electric în curent continuu **nu se autostinge** la trecerea prin zero a curentului (întrucât în DC nu există trecere prin zero), astfel încât un arc odată amorsat se automenține și dezvoltă temperaturi de peste 3.000–5.000 °C, suficiente pentru a topi metalul, a aprinde izolațiile și materialele adiacente și a iniția un incendiu. Arcul DC apare la:

- conexiuni slăbite, oxidate sau prost executate la conectorii MC4 dintre module și în tablourile de string;
- deteriorarea mecanică a cablurilor DC (rozătoare, uzură, ecrasare, ambalarea cablului la structură);
- îmbătrânirea izolației cablurilor sub acțiunea radiației UV și a variațiilor de temperatură;
- defecte de contact în siguranțele fuzibile de string și în cutiile de joncțiune.

Arcul serie (întreruperea unui contact pe traseul de curent) și arcul paralel (scurtcircuit între conductoare) sunt ambele posibile; arcul serie este deosebit de insidios pentru că nu produce o creștere de curent care să declanșeze protecțiile clasice.

**b) Punctele fierbinți (hot-spots) în module** — celulele fotovoltaice umbrite parțial, fisurate (microfisuri), delaminate sau cu defecte de fabricație pot funcționa ca sarcină (consumatoare) în loc de sursă, disipând energie sub formă de căldură locală. Un hot-spot poate atinge 100–150 °C și, în situații extreme (celulă complet compromisă, diodă de by-pass defectă), poate iniția arderea backsheet-ului și a cutiei de joncțiune a modulului.

**c) Incendiul de invertor** — invertoarele conțin componente electronice de putere (IGBT-uri, condensatoare, bobine, relee), care în caz de supraîncărcare, defect de comutație, îmbătrânire a condensatoarelor sau răcire insuficientă (colmatarea ventilatoarelor/filtrelor) pot supraîncălzi și iniția un incendiu. Invertoarele centrale, cu densitate mare de putere, prezintă un risc concentrat.

**d) Incendiul de transformator / post de transformare** — la transformatoarele în ulei, un defect intern (scurtcircuit între spire, străpungere a izolației, descărcări parțiale) produce degajare de gaze și suprapresiune care poate fisura cuva; uleiul mineral scurs și încălzit se aprinde violent, generând un incendiu de mare intensitate greu de stins. La celulele de medie tensiune, arcul intern (arc flash) în urma unui defect de comutare sau a unei manevre greșite este o sursă majoră.

**e) Descărcarea atmosferică (trăsnetul)** — amenajarea ocupă suprafețe mari, deschise, în extravilan, fiind expusă loviturilor directe de trăsnet și supratensiunilor induse. Fără o protecție corespunzătoare (SPD-uri și instalație de paratrăsnet acolo unde analiza de risc o impune), o descărcare poate deteriora echipamentele și iniția incendii.

**f) Vegetația uscată** — nu este sursă de aprindere de origine internă, dar constituie **principalul vector de propagare** și poate fi aprinsă de o sursă externă (țigară aruncată, arderi necontrolate de miriște pe terenuri vecine, scântei mecanice de la cosire). O dată aprinsă, vegetația transportă rapid incendiul între rânduri, ajungând la cabluri, cutii de joncțiune și structuri.

**g) Cauze exterioare / voluntare** — incendii de vegetație provenite de pe terenurile agricole limitrofe, acte de vandalism sau incendiere intenționată.

### 2.4. Nivelul de gravitate — de ce riscul „mic" nu înseamnă risc neglijabil

Deși categoria de încadrare este „risc mic de incendiu" (categoria E), gravitatea consecințelor unui incendiu la un parc fotovoltaic derivă din trei particularități care nu se regăsesc la construcțiile obișnuite:

1. **Imposibilitatea deconectării complete a sursei.** Modulele fotovoltaice produc tensiune continuă **atât timp cât sunt expuse la lumină** — inclusiv la lumina flăcărilor și la lumina lunii/reflectată. Nu există un „întrerupător general" care să scoată câmpul de sub tensiune; deconectarea la nivel de invertor lasă stringurile DC sub tensiune de până la 1.000–1.500 Vcc. Acesta este pericolul central de la intervenție.

2. **Persistența pericolului de electrocutare pentru pompieri.** Forțele de intervenție ISU sunt expuse riscului de electrocutare directă (atingerea unor conductoare sub tensiune) și indirectă (jetul de apă conductor între element sub tensiune și pompier). Apa aplicată pe echipament DC sub tensiune poate crea o cale conductoare până la operator.

3. **Amplasarea izolată și accesul limitat.** Amplasamentele sunt de regulă în extravilan, la distanță de subunitățile ISU, cu timpi de răspuns mari și fără hidranți urbani în apropiere, ceea ce impune ca strategia principală să fie **prevenirea și limitarea propagării**, iar nu stingerea rapidă printr-o cantitate mare de apă.

### 2.5. Scenarii de incendiu de referință (analiză calitativă)

Pentru fundamentarea măsurilor, se analizează câteva scenarii de incendiu reprezentative, aplicabile la orice putere instalată (frecvența focarelor crește proporțional cu numărul de conexiuni și de echipamente, deci cu puterea, dar mecanismul este identic):

**Scenariul 1 — Arc electric DC la o conexiune de string.** O conexiune MC4 slăbită sau oxidată dezvoltă rezistență de contact, se supraîncălzește și amorsează un arc serie. Arcul, care nu se autostinge în DC, topește conectorul și aprinde izolația cablului și, eventual, cutia de joncțiune a modulului. Focarul este mic ca sarcină termică, dar poate iniția un incendiu de vegetație dacă vegetația de sub rând este uscată. Măsuri de răspuns: detecția de arc (AFCI) și monitorizarea izolației întrerup/semnalizează; localizarea prin SCADA la nivel de string; stingere cu CO₂/pulbere, niciodată jet de apă (string sub tensiune). Prevenire: montaj corect al conectorilor, termografie IR periodică, întreținerea vegetației.

**Scenariul 2 — Hot-spot și incendiu de modul.** O celulă fisurată/umbrită, cu diodă de by-pass defectă, disipă energie și încălzește local backsheet-ul până la aprindere. Focarul rămâne, de regulă, limitat la un modul, dar picăturile de material topit pot cădea pe vegetație. Măsuri: inspecție termografică periodică (aeriană cu dronă la parcurile mari — metodă eficientă indiferent de suprafață), înlocuirea modulelor defecte.

**Scenariul 3 — Incendiu de invertor.** Supraîncălzirea componentelor de putere (colmatarea filtrelor de răcire, îmbătrânirea condensatoarelor, defect de comutație) inițiază un incendiu în interiorul invertorului. La invertoare de string, focar mic și izolat; la invertoare centrale containerizate, focar concentrat, cu potențial de propagare la cablajele adiacente. Măsuri: detecție în container, deconectarea invertorului, stingere cu CO₂/pulbere sau instalație fixă cu gaz/aerosoli, răcire din exterior.

**Scenariul 4 — Incendiu de transformator în ulei.** Un defect intern produce arc, gaze și suprapresiune; cuva se fisurează, uleiul se scurge și se aprinde, generând un incendiu de mare intensitate și degajare mare de fum. Este scenariul cu cea mai severă consecință locală, iar severitatea crește cu puterea (volumul de ulei) transformatorului. Măsuri: releu Buchholz, compartiment REI 120, cuvă de retenție 100 % din volumul de ulei, deconectare de la rețea prin OD, stingere cu spumă/pulbere și răcire cu apă pulverizată de la distanța de siguranță pentru MT. Adoptarea transformatorului uscat elimină acest scenariu.

**Scenariul 5 — Incendiu de vegetație generalizat.** O sursă (arc DC, hot-spot, sursă externă — miriște, țigară, scânteie de la cosire) aprinde vegetația uscată; focul se propagă rapid între rânduri, atacă cablurile DC și cutiile de joncțiune și poate afecta suprafețe mari. Este scenariul cu cea mai mare probabilitate de extindere pe suprafață mare, mai ales vara. Măsuri: fâșie perimetrală de protecție, cosire/pășunat, atac din exterior spre interior cu unelte de înăbușire, apă numai în zonele fără echipament sub tensiune în bătaia jetului.

Concluzie: scenariile confirmă că măsura determinantă este **prevenția (mentenanță electrică, termografie, management vegetație)**, iar la intervenție prioritatea este **protecția față de tensiunea DC persistentă** — ambele independente de mărimea parcului.

---

## CAPITOLUL 3. NIVELURILE CRITERIILOR DE PERFORMANȚĂ

### 3.1. Stabilitatea (rezistența) la foc

#### 3.1.1. Gradul de rezistență la foc al postului de transformare

Postul de transformare, ca element cu cea mai mare concentrare de risc, se realizează la un grad ridicat de rezistență la foc. Pentru anvelopa prefabricată din beton armat (soluția uzuală și recomandată), se asigură **gradul I sau II de rezistență la foc**, cu elementele de construcție având clase de reacție și rezistență la foc după cum urmează:

- pereți exteriori (anvelopa) — beton armat, clasa A1 de reacție la foc (incombustibil), cu rezistență la foc REI 120 (2 ore) pentru anvelopa de beton monolit sau prefabricat;
- planșeu / acoperiș — beton armat, REI 60–120;
- ușile și trapele de acces — clasa de rezistență la foc EI 90–120 (uși metalice antifoc), acolo unde separă compartimentul transformatorului de celulele MT sau de tabloul JT.

Pentru varianta cu transformator în ulei, celula transformatorului se realizează ca **compartiment de foc distinct**, cu pereți REI 120 și ușă/protecție EI 120, astfel încât un eventual incendiu de ulei să fie limitat la compartimentul propriu, fără propagare la celulele MT și la tabloul JT.

#### 3.1.2. Gradul de rezistență la foc al cabinei de comandă

Cabina de comandă, cu risc și sarcină termică reduse, se realizează la **gradul II de rezistență la foc** (structură incombustibilă din beton/zidărie sau container metalic cu pereți din panouri incombustibile). Elementele portante asigură R 60, pereții de închidere EI 30–60. Nu sunt necesare cerințe mai severe, dat fiind riscul mic și absența spațiilor aglomerate.

#### 3.1.3. Structurile de susținere a modulelor

Structurile metalice de susținere (zincate la cald) sunt din oțel, material incombustibil (clasa A1). Nu se impune protejarea lor la foc (ignifugare/vopsire intumescentă), întrucât nu au rol în evacuarea persoanelor și nu susțin planșee sau elemente de construcție închise; colapsul unei structuri sub acțiunea focului nu pune în pericol vieți omenești și nu propagă incendiul.

### 3.2. Reacția la foc a materialelor și produselor

Materialele utilizate se aleg, pe cât posibil, din clase superioare de reacție la foc:

- **Modulele fotovoltaice** — se recomandă module certificate cu clasificare de reacție/rezistență la foc conform SR EN IEC 61730 (clasa de foc a modulului) și, la nivel de sistem module + acoperiș/structură, clasa de rezistență la foc adecvată. La montaj pe sol clasa de foc a sistemului este mai puțin critică decât la montaj pe acoperiș, dar backsheet-ul se preferă din materiale cu propagare redusă a flăcării.
- **Cablurile de curent continuu (cablurile solare)** — cabluri fotovoltaice dedicate (tip H1Z2Z2-K), fără halogeni, cu întârziere la propagarea flăcării conform SR EN 60332-1-2 și cu emisie redusă de fum și gaze toxice (LSZH — Low Smoke Zero Halogen). Cablurile trebuie să reziste la UV și la temperaturi de −40…+90 °C.
- **Cablurile de curent alternativ și cablurile de energie MT** — cabluri cu manta rezistentă la foc, întârzietoare de flacără.
- **Materialele de construcție ale PT și cabinei** — clasa A1/A2 (incombustibile) pentru elementele structurale.

Alegerea materialelor cu reacție la foc superioară este o măsură de prevenire a inițierii și propagării care se aplică la orice putere și nu implică costuri suplimentare disproporționate — cablurile solare fără halogeni și modulele certificate reprezintă, de altfel, standardul de piață. Se acordă atenție și materialelor secundare (cutii de joncțiune, canale de cablu, elemente de fixare din plastic), care se aleg, pe cât posibil, din categorii cu propagare redusă a flăcării, întrucât ele constituie primele materiale combustibile atinse de un arc sau de un hot-spot.

### 3.3. Preîntâmpinarea propagării incendiului — compartimentare și separare

#### 3.3.1. Compartimentarea în interiorul postului de transformare

În interiorul PT se realizează separarea funcțională a spațiilor cu risc diferit:

- **celula transformatorului** — compartiment separat prin pereți REI 120; la varianta cu ulei, se prevede o cuvă de retenție a uleiului (bac colector) dimensionată să rețină **întreg volumul de ulei al transformatorului (100 %)** — deci un volum care se scalează cu puterea PT (orientativ 0,4–0,7 l/kVA) — plus un supliment pentru apa de stingere, astfel încât uleiul aprins scurs să fie confinat și să nu se propage; deasupra cuvei se pot prevedea grătare cu pietriș pentru stingerea prin sufocare a uleiului scurs. La puteri mari, cu mai multe posturi de transformare, fiecare post are propria cuvă dimensionată la volumul propriu de ulei;
- **celulele de medie tensiune** — separate de spațiul JT;
- **tabloul general de joasă tensiune** — compartiment propriu.

Trecerile de cabluri prin pereții și planșeele care delimitează compartimente se etanșează antifoc cu materiale/sisteme certificate (mortar, perne, mastic, manșoane intumescente) la aceeași clasă de rezistență la foc cu elementul străpuns (EI 120 la pereții REI 120).

#### 3.3.2. Distanțele de siguranță (separare prin distanță)

Pentru amenajarea deschisă, principalul mecanism de preîntâmpinare a propagării nu este compartimentarea prin pereți, ci **separarea prin distanțe de siguranță**. Se stabilesc următoarele distanțe minime:

- **Între postul de transformare și modulele fotovoltaice / câmpul FV:** minimum **3,0 m** liber de vegetație și de materiale combustibile în jurul PT; se recomandă 5,0 m acolo unde spațiul permite, pentru a preveni propagarea unui incendiu de PT către câmp și invers.

- **Între postul de transformare cu ulei și clădirea de comandă:** minimum **5,0 m**, sau perete rezistent la foc REI 120 dacă distanța nu poate fi respectată.

- **Între invertoarele centrale (containerizate) și modulele adiacente:** minimum **2,5–3,0 m**, cu platformă necombustibilă (pietriș/beton) sub și în jurul invertorului.

- **Între posturile de transformare și limita de proprietate / împrejmuire:** conform NTE 001/03/00 și normelor de distribuție, cu respectarea distanțelor față de vecinătăți; minimum 3,0 m față de împrejmuire.

- **Distanța dintre rândurile de module (pitch):** determinată de evitarea umbririi, dar cu relevanță și pentru limitarea propagării incendiului de vegetație și pentru accesul de intervenție — tipic 5–8 m între axele rândurilor.

- **Fâșia de protecție perimetrală (defensible space):** o fâșie de minimum **3,0–5,0 m** de-a lungul întregului perimetru interior al împrejmuirii, întreținută fără vegetație combustibilă, care separă câmpul de eventualele incendii de vegetație venite de pe terenurile limitrofe.

- **Față de stația de transformare / racord de înaltă tensiune (110 kV):** la parcurile fotovoltaice de putere mare, care se racordează la rețea printr-o stație proprie de 110 kV (sau printr-o stație de 110/MT existentă), se instituie o **zonă de protecție și de siguranță de minimum 20 m** în jurul stației de 110 kV, conform normelor de amplasare a instalațiilor de înaltă tensiune (Norme tehnice energetice — NTE de amplasare și distanțe pentru linii și stații electrice). În această zonă se interzic vegetația înaltă combustibilă, depozitele de materiale și construcțiile care nu servesc stației; distanța de siguranță separă echipamentul de 110 kV (cu risc de arc electric de mare energie și incendiu de echipament) de câmpul fotovoltaic, de posturile de transformare MT și de vecinătăți. Necesitatea și configurația stației de 110 kV se corelează cu puterea instalată: parcurile mici/medii se racordează în MT (fără stație 110 kV proprie), în timp ce parcurile de putere mare pot impune stație de racord de 110 kV, caz în care zona de protecție de 20 m devine o cerință determinantă de amplasare și de securitate la incendiu.

Distanțele de siguranță față de construcțiile învecinate din afara incintei se stabilesc conform P118/1-2013, tabelul cu distanțe de siguranță între construcții, în funcție de gradul de rezistență la foc; pentru amplasamentul tipic în extravilan, aceste distanțe sunt de regulă mult depășite de suprafețele libere înconjurătoare.

### 3.4. Căile de acces, evacuare și intervenție

#### 3.4.1. Evacuarea persoanelor

Dat fiind numărul foarte redus de persoane (maximum 4–6) și amenajarea deschisă, evacuarea nu impune dimensionări speciale ale căilor. Personalul se poate deplasa liber pe drumurile de incintă și pe fâșiile dintre rânduri către poarta de acces. Distanțele de evacuare sunt necritice. Din cabina de comandă se asigură minimum o ușă de ieșire cu deschidere spre exterior în sensul evacuării. Nu sunt necesare scări de evacuare, uși speciale sau iluminat de securitate dimensionat pentru aglomerări; se prevede totuși iluminat de securitate/de siguranță pentru evacuare în cabina de comandă și la PT (corpuri autonome cu acumulator), precum și pentru marcarea căilor în caz de intervenție nocturnă.

#### 3.4.2. Căile de acces și de intervenție pentru autospecialele ISU

Accesul forțelor de intervenție reprezintă un criteriu esențial de performanță pentru acest tip de obiectiv, dat fiind amplasamentul izolat. Se asigură:

- **Drum de acces din drumul public** până la incintă, cu îmbrăcăminte care permite circulația autospecialelor de intervenție (portanță pentru vehicule de minimum 16 tone la osie, tipic autospeciale de stingere de 20–26 tone masă totală), lățime carosabil minimum **3,8 m** (recomandat 4,0 m), gabarit liber în înălțime minimum **4,2 m** (fără obstacole aeriene — cabluri joase, ramuri).

- **Drumuri de incintă (perimetrale și de acces la PT/invertoare)** — drum perimetral de incintă care înconjoară câmpul, permițând accesul autospecialelor la orice punct al perimetrului și la posturile de transformare/invertoare; lățime minimum 3,5–4,0 m, cu platforme de întoarcere sau buclă de circulație care evită manevrele de mers înapoi pe distanțe mari.

- **Poarta de acces** cu lățime liberă minimum **4,0 m** (recomandat 5,0–6,0 m pentru trecerea autospecialelor), cu sistem de deschidere care poate fi acționat rapid de forțele de intervenție (deblocare de urgență, cheie/cod pus la dispoziția ISU sau deschidere de la distanță din dispecerat).

- **Platforme de staționare/operare** pentru autospeciale în dreptul PT și al invertoarelor centrale, cu portanță și dimensiuni adecvate (minimum 8 × 4 m).

- **Accesibilitatea între rânduri** — spațiile dintre rândurile de module (5–8 m) permit accesul pietonal al echipelor de intervenție și, parțial, al autospecialelor ușoare (ATV/UTV de intervenție), pentru localizarea și izolarea focarelor.

Se prevede la intrarea în incintă un **panou de informare pentru forțele de intervenție** cu planul de situație, poziția PT/invertoarelor, poziția întrerupătoarelor de urgență (unde există), traseele DC principale și punctele de racord la sursele de apă (dacă există). Se recomandă instalarea de dispozitive de deconectare rapidă la nivel de invertor și de string (rapid shutdown), conform bunelor practici internaționale, deși legislația română nu le impune explicit la instalațiile de sol.

Dimensionarea rețelei de drumuri de incintă se corelează cu suprafața (deci cu puterea): la parcurile mari, drumul perimetral se completează cu drumuri transversale care împart câmpul în sectoare de intervenție, astfel încât distanța de la orice punct al câmpului la un drum accesibil autospecialelor să nu depășească o valoare care să permită intervenția eficientă (orientativ, sub 50–75 m de traseu pietonal până la un drum de incintă). Astfel, timpul de ajungere la focar rămâne rezonabil indiferent de mărimea parcului.

#### 3.4.3. Conținutul planului de intervenție

Planul de intervenție, avizat de ISU, cuprinde cel puțin: datele de identificare și amplasamentul; planul de situație cu poziția tuturor echipamentelor (module pe sectoare, invertoare, posturi de transformare, cabină de comandă); traseele cablurilor DC și AC principale; poziția separatoarelor, a punctelor de deconectare și a dispozitivelor de deconectare rapidă (unde există); poziția stingătoarelor, a pichetelor PSI și a punctelor/surselor de apă; căile de acces și de intervenție cu gabaritele lor; datele de contact ale operatorului de distribuție și ale personalului responsabil; procedura specifică de izolare electrică și avertismentele privind tensiunea DC persistentă; forțele și mijloacele proprii și cele ale ISU cu care se cooperează. Planul se actualizează la orice modificare a instalației.

### 3.5. Instalații de detectare, semnalizare și avertizare (P118/3-2015)

Detecția incendiului se prevede **concentrat, la componentele cu risc ridicat**, nu pe întreaga suprafață deschisă (unde detecția clasică cu fum nu este aplicabilă din cauza aerului liber):

- **La postul de transformare** — sistem de detectare a incendiului cu detectoare de fum și de temperatură (termovelocimetrice) în celula transformatorului, celulele MT și încăperea JT. La transformatorul în ulei se prevede releu Buchholz (protecție de gaze) și, opțional, detecție de temperatură a uleiului și a înfășurărilor cu declanșare la depășirea pragurilor.

- **La invertoarele centrale (containerizate)** — detectoare de fum/temperatură în interiorul containerului, cu semnalizare la dispecerat.

- **La cabina de comandă** — detectoare de fum, cu centrală de semnalizare a incendiilor (dacă volumul echipamentelor o justifică) sau detectoare autonome interconectate.

Toate semnalizările de incendiu, precum și alarmele de la sistemul de monitorizare a arcului electric DC (dacă invertoarele/tablourile de string sunt echipate cu detecție de arc — AFCI, Arc Fault Circuit Interrupter, conform bunelor practici) și de la releele de protecție electrică, se transmit către **dispeceratul de monitorizare** (SCADA), care asigură supravegherea permanentă la distanță, alertarea personalului de mentenanță și, la nevoie, apelarea numărului unic de urgență 112. Sistemul SCADA înregistrează evenimentele (jurnal), permițând identificarea rapidă a stringului/echipamentului afectat.

Se prevede semnalizare optică și acustică locală la PT pentru avertizarea personalului prezent în incintă.

#### 3.5.1. Monitorizarea electrică cu rol de detecție timpurie a incendiului

La instalațiile fotovoltaice, o parte importantă a „detecției de incendiu" se realizează indirect, prin monitorizarea parametrilor electrici, care sesizează condițiile premergătoare unui incendiu de origine electrică înainte ca focul să apară. Aceste funcții se prevăd la orice putere (numărul de puncte monitorizate crește cu numărul de stringuri/invertoare):

- **monitorizarea la nivel de string** a curentului și tensiunii — o abatere (curent scăzut anormal, tensiune atipică) semnalează o defecțiune (string căzut, hot-spot, conexiune deteriorată) care poate precede un arc;
- **monitorizarea rezistenței de izolație** a câmpului DC (sistem IT) — scăderea izolației indică o degradare a cablurilor sau o punere la masă incipientă, condiții favorabile arcului;
- **detecția de arc electric (AFCI)** — unde este disponibilă, întrerupe/semnalează arcul serie/paralel;
- **monitorizarea temperaturii** transformatorului (înfășurări, ulei) și a celulelor MT;
- **termografia în infraroșu periodică** (manuală sau cu dronă) — deși nu este o detecție în timp real, este cel mai eficient instrument preventiv de depistare a punctelor fierbinți, aplicabil la orice suprafață.

Aceste date, integrate în SCADA, permit alarmarea și izolarea preventivă a secțiunilor cu probleme, reducând probabilitatea de inițiere a unui incendiu.

---

## CAPITOLUL 4. ECHIPAREA CU MIJLOACE TEHNICE DE APĂRARE ÎMPOTRIVA INCENDIILOR

### 4.1. Principiul de bază al stingerii la instalații fotovoltaice — de ce apa este interzisă pe DC sub tensiune

Măsura tehnică de apărare împotriva incendiilor cea mai importantă la un parc fotovoltaic este **alegerea agentului de stingere compatibil cu prezența tensiunii**. Deoarece câmpul DC nu poate fi scos de sub tensiune atât timp cât există lumină, orice intervenție trebuie să pornească de la ipoteza că **toate elementele câmpului sunt sub tensiune**.

Se aplică următoarele reguli:

- **Se interzice utilizarea apei ca jet compact (plin) direct pe echipamentele electrice sub tensiune** — module, cabluri DC, cutii de joncțiune, invertoare, celule MT, transformator. Jetul compact de apă este conductor electric și creează o cale de electrocutare de la elementul sub tensiune la pompier, precum și risc de scurtcircuit și extindere a defectului.

- Stingerea incendiilor de origine electrică se face cu **agenți neconductori**: bioxid de carbon (CO₂) și pulbere stingătoare (ABC/BC). Acești agenți nu conduc curentul electric și pot fi aplicați asupra echipamentelor sub tensiune, respectând distanțele minime de siguranță prescrise pe eticheta stingătorului (tipic minimum 1,0 m pentru instalații de joasă tensiune).

- Apa poate fi utilizată **numai** pentru: (a) răcirea și stingerea incendiilor de vegetație la distanță de echipamentele sub tensiune; (b) protecția prin răcire a obiectelor din vecinătatea focarului; (c) stingerea incendiilor de transformator **numai după deconectarea și scoaterea de sub tensiune, confirmată** — și chiar și atunci, cu tehnica jetului pulverizat (ceață/spray), care are conductivitate redusă, respectând distanțele de siguranță pentru medie tensiune (mult mai mari — minimum 5–8 m pentru MT).

- Pentru incendiile de ulei de transformator se pot utiliza spumă mecanică și pulbere; jetul de apă pulverizat servește la răcire, iar cuva de retenție a uleiului limitează extinderea.

### 4.2. Dotarea cu stingătoare portabile și transportabile

Dotarea cu stingătoare se face pe echipament (per post de transformare, per invertor, per cabină), astfel încât **cantitatea totală de mijloace de primă intervenție crește automat cu numărul de echipamente, deci cu puterea instalată** — la un parc mai mare cu mai multe posturi de transformare și mai multe invertoare, se multiplică dotarea de mai jos pentru fiecare unitate. Se prevăd stingătoare corespunzătoare claselor de incendiu prezente (clasa A — solide, clasa B — lichide combustibile la ulei, incendii de echipamente electrice sub tensiune):

- **La fiecare post de transformare:** minimum 2 stingătoare cu CO₂ de tip **G5** (5 kg) pentru echipamente electrice, plus 1 stingător cu pulbere **P6** (6 kg) tip ABC; pentru PT cu ulei se adaugă stingătoare transportabile cu pulbere P50 (50 kg) sau spumă, amplasate pe platformă. CO₂ este preferat la echipamente electronice și celule fiindcă nu lasă reziduuri și nu deteriorează echipamentele curate.

- **La invertoarele centrale:** câte 1–2 stingătoare CO₂ G5 în apropierea fiecărui container de invertor (deci un număr proporțional cu numărul de invertoare, respectiv cu puterea).

- **La cabina de comandă:** 1 stingător CO₂ G5 (pentru echipamentele electronice/SCADA) și 1 stingător cu pulbere P6.

- **Puncte de intervenție / pichet PSI:** la intrarea în incintă și distribuit pe drumurile de incintă, la intervale care asigură accesul rapid din orice punct al câmpului (orientativ un pichet la fiecare 1–2 ha, deci un număr care crește cu suprafața și implicit cu puterea parcului), se amplasează pichete de incendiu dotate cu unelte pentru intervenția la incendii de vegetație — lopeți, mături/bătătoare de foc (flappers), târnăcoape, găleți cu apă/nisip, rezervă de nisip. Aceste unelte sunt esențiale pentru stingerea prin înăbușire a incendiilor de vegetație dintre rânduri, unde apa este interzisă din cauza proximității echipamentelor sub tensiune.

Toate stingătoarele se verifică periodic (verificare la 1 an, reîncărcare conform SR), se amplasează la loc vizibil, accesibil, ferit de intemperii (în cutii/dulapuri PSI pentru amplasările exterioare), semnalizate corespunzător.

### 4.3. Instalații de stingere fixe

- **La transformatorul în ulei** — necesitatea unei instalații fixe de stingere se corelează cu puterea (volumul de ulei): la transformatoare mici, protecția prin cuvă de retenție și stingătoare transportabile este suficientă; la transformatoare de putere mare (orientativ peste ~1.600–2.500 kVA), în funcție de amplasare, se poate prevedea o instalație fixă de stingere cu pulverizare de apă (drencer/deluge) pentru răcire, cu declanșare **numai după scoaterea de sub tensiune**, sau o instalație de stingere cu gaz inert / spumă în cabina transformatorului. Pentru transformatoarele uscate (recomandate ori de câte ori tehnic este posibil, tocmai pentru a elimina riscul de ulei indiferent de putere), nu este necesară instalație fixă de stingere.

- **La invertoarele centrale și cabinele electrice închise** — se poate prevedea, opțional, instalație de stingere cu aerosoli condensați sau gaz inert (compatibilă cu echipamente sub tensiune), cu declanșare automată la detecție.

Pentru câmpul deschis nu se prevede și nu este posibilă o instalație fixă de stingere; protecția câmpului se bazează pe prevenție, distanțe și managementul vegetației.

### 4.4. Rezerva de apă și hidranții — analiză de necesitate și justificare

**Concluzia de proiectare: la parcul fotovoltaic de câmp deschis, nu se prevede, de regulă, rezervă de incendiu și instalație de hidranți interiori/exteriori de incendiu, iar această soluție se justifică tehnic și normativ după cum urmează:**

1. **Categoria de risc este mică (E)** și amenajarea este deschisă, fără spații închise care să acumuleze fum și căldură; P118/2-2013 nu impune hidranți pentru amenajări deschise de tip câmp fotovoltaic încadrate la risc mic.

2. **Volumul construit este redus** — postul de transformare și cabina de comandă au arii construite mici (sub pragurile care ar impune hidranți interiori conform P118/2-2013), iar pentru aceste construcții mici, izolate, apărarea se asigură cu stingătoare portabile adecvate riscului electric.

3. **Apa nu poate fi folosită în siguranță** ca agent primar de stingere pe echipamentele DC sub tensiune (a se vedea 4.1). Prin urmare, o rezervă de apă și hidranți nu ar rezolva scenariul de incendiu principal (arc DC, incendiu de invertor/modul), ci ar introduce chiar un risc de electrocutare dacă ar fi utilizată incorect. Agenții adecvați sunt CO₂ și pulberea, asigurați prin stingătoare.

4. **Amplasamentul în extravilan** face nefezabilă și costisitoare racordarea la o rețea de hidranți; sursa de apă pentru intervenția la incendiul de vegetație rămâne, unde este relevant, autospecialele ISU (care se alimentează din surse naturale, rezervoare sau sunt aduse cu autocisterne).

**Excepții — când se prevede totuși o rezervă de apă:**

- dacă postul de transformare cu ulei are putere mare (orientativ, transformatoare de peste ~1.600 kVA, respectiv volume de ulei care depășesc pragul la care se declanșează analiza de risc de incendiu de ulei) și analiza de risc impune răcire/stingere cu apă a incendiului de ulei (după deconectare), se poate prevedea un **rezervor de apă de incendiu** (bazin/rezervor, volum orientativ 30–100 m³, dimensionat prin proiect în funcție de puterea și volumul de ulei al PT) și un sistem de pompare, dimensionat pentru un debit și un timp de funcționare stabilite prin proiect; această soluție se corelează cu operatorul de distribuție și cu ISU;
- dacă autoritatea competentă (ISU județean) solicită prin aviz o sursă de apă pentru intervenția la vegetație, se poate amenaja un bazin de apă și un punct de alimentare (racord tip B) accesibil autospecialelor;
- se recomandă, ca minimum de bun-simț, amenajarea unui **punct de captare a apei** (rezervor sau acces la o sursă naturală) și marcarea lui pe planul de intervenție, pentru alimentarea autospecialelor ISU la un incendiu de vegetație de amploare.

### 4.5. Protecția împotriva trăsnetului și supratensiunilor

Se prevede protecție împotriva descărcărilor atmosferice conform SR EN 62305, în funcție de nivelul de risc rezultat din analiză:

- **Descărcătoare de supratensiune (SPD)** pe partea DC (la tablourile de string și la invertoare) și pe partea AC (la ieșirea invertoarelor și la tabloul general), pentru limitarea supratensiunilor induse — obligatorii pentru protecția echipamentelor și indirect pentru prevenirea incendiilor cauzate de supratensiuni.

- **Instalație de paratrăsnet (LPS)** la posturile de transformare și, unde analiza de risc o impune, protecție a câmpului (structurile metalice legate la o priză de pământ generală).

- **Priză de pământ generală** cu valoare a rezistenței de dispersie conform normelor (tipic ≤ 4 Ω, corelat cu protecția electrică), la care se leagă toate masele metalice (structuri, carcase, ecrane de cabluri, împrejmuire metalică), pentru asigurarea echipotențialității și a protecției împotriva electrocutării.

### 4.6. Instalația electrică — măsuri de protecție cu rol în securitatea la incendiu

- **Protecții la scurtcircuit și suprasarcină** pe partea DC (siguranțe fuzibile de string, întrerupătoare DC) și AC.
- **Protecție la curent de defect / monitorizare a izolației** — monitorizarea rezistenței de izolație a câmpului DC (fiind sistem IT, nelegat la pământ funcțional), cu semnalizare la scăderea izolației, ceea ce previne arcurile și defectele de punere la masă.
- **Detecție de arc electric (AFCI)** integrată în invertoare/tablouri, unde este disponibilă, pentru întreruperea automată la apariția arcului serie/paralel.
- **Deconectare rapidă (rapid shutdown)** — dispozitive care reduc tensiunea DC la nivel sigur în vecinătatea modulelor la comanda de urgență; recomandată ca măsură de siguranță pentru intervenție.
- **Separatoare vizibile de sarcină** la PT și la invertoare, pentru izolarea sigură și confirmabilă a secțiunilor AC în vederea intervenției.
- **Marcarea traseelor de cablu DC** pe planul de intervenție și fizic pe teren.
- **Pozarea și protecția mecanică a cablurilor DC** — cablurile solare se fixează și se protejează împotriva deteriorării mecanice (rozătoare, ecrasare, frecare de muchii), a acțiunii UV și a apei; buclele se evită (reduc riscul de supratensiuni induse la trăsnet); trecerile prin structuri se protejează cu manșoane. Deteriorarea izolației cablurilor DC este una dintre cauzele frecvente de arc, indiferent de mărimea parcului.
- **Calitatea conexiunilor** — conectorii DC (MC4 sau echivalent) se montează cu scula dedicată, se asigură compatibilitatea între producători (conectori de același tip și marcă) și se verifică prin termografie; conexiunile slăbite sunt principala sursă de arc serie.
- **Legarea la pământ și echipotențializarea** tuturor maselor metalice (structuri, carcase, ecrane), pentru limitarea tensiunilor de atingere și de pas în caz de defect.

#### 4.6.1. De ce arcul electric în curent continuu este atât de periculos — fundamentare fizică

Într-un circuit de curent alternativ, curentul trece prin zero de 100 de ori pe secundă (la 50 Hz), moment în care un arc electric se stinge natural, ceea ce facilitează întreruperea lui de către aparatajul de comutație. În curent continuu **nu există trecere prin zero**: un arc odată amorsat se automenține atât timp cât sursa (câmpul fotovoltaic iluminat) furnizează energie, iar coloana de plasmă a arcului dezvoltă temperaturi de mii de grade, suficiente pentru a topi cupru și aluminiu, a vaporiza izolații și a aprinde materialele adiacente. Din acest motiv, întreruperea arcului DC necesită dispozitive speciale (întrerupătoare DC dimensionate corect, detecție AFCI), iar prevenirea amorsării (conexiuni corecte, izolație integră, protecție mecanică a cablurilor) este mult mai eficientă decât stingerea unui arc deja produs. Acest fenomen este independent de puterea totală a parcului — un singur string prost conectat poate genera un arc periculos.

---

## CAPITOLUL 5. CONDIȚII SPECIFICE PENTRU ASIGURAREA INTERVENȚIEI

### 5.1. Particularitatea intervenției la incendiu de instalație fotovoltaică

Intervenția la un incendiu de parc fotovoltaic este radical diferită de intervenția la o construcție obișnuită și se ghidează după principiul fundamental: **câmpul fotovoltaic este considerat sub tensiune în permanență, ziua și în lumina flăcărilor**. Din acest motiv, procedura de intervenție este centrată pe protecția personalului de intervenție împotriva electrocutării, în paralel cu limitarea propagării.

### 5.2. Etapele intervenției și izolarea electrică

**a) Alarmarea și recunoașterea.** La detectarea incendiului (prin SCADA, prin detecție locală sau prin observare), se alertează dispeceratul și se apelează 112. Personalul de mentenanță prezent asigură recunoașterea și localizarea focarului și pune la dispoziția ISU planul de intervenție și informațiile despre poziția echipamentelor sub tensiune.

**b) Izolarea electrică — la nivelul la care este posibil.** Se acționează:
- deconectarea invertoarelor (întrerupe injecția AC în rețea și separă partea AC);
- deschiderea separatoarelor AC și izolarea PT de rețea (prin celula MT), coordonat cu operatorul de distribuție (OD) — deconectarea de la rețea este confirmată de OD;
- **izolarea pe stringuri** — deschiderea separatoarelor/siguranțelor DC în tablourile de string permite reducerea zonei sub tensiune la stringurile individuale, dar **NU aduce modulele la tensiune zero** — fiecare string rămâne sub tensiunea sa de circuit deschis atât timp cât primește lumină. Izolarea pe stringuri limitează extinderea și reduce curentul disponibil, dar pericolul de tensiune persistă la nivel de string/modul.

**c) Recunoașterea limitei „sigure" — pericolul DC persistent.** Personalul de intervenție trebuie să știe că, spre deosebire de instalațiile AC (care pot fi complet scoase de sub tensiune printr-o manevră), **la partea DC nu există o stare confirmabilă de tensiune zero pe timp de zi**. De aceea, atingerea directă a modulelor, cablurilor DC și cutiilor de joncțiune este interzisă, iar stingerea se face de la distanță, cu agenți neconductori și cu respectarea distanțelor de siguranță electrică.

**d) Alegerea agentului și a tehnicii de stingere:**
- incendiu de modul/string sau cutie de joncțiune — stingere cu CO₂/pulbere de la distanța de siguranță; nu se folosește jet compact de apă;
- incendiu de invertor — CO₂/pulbere; dacă este container cu instalație fixă, se lasă instalația să acționeze și se răcește din exterior;
- incendiu de transformator în ulei — se confirmă deconectarea de la rețea; se stinge cu spumă/pulbere; se răcește cu apă pulverizată de la distanța de siguranță pentru MT; cuva de retenție reține uleiul;
- incendiu de vegetație între rânduri — stingere prin înăbușire (bătătoare, lopeți, nisip) și cu apă **numai în zonele fără module/cabluri sub tensiune în bătaia jetului**; atacul se face dinspre exteriorul câmpului spre interior, evitând avansarea printre module sub tensiune.

**e) Distanțele de siguranță electrică la intervenție** (orientativ, conform practicii și etichetelor stingătoarelor):
- joasă tensiune (până la 1.000–1.500 Vcc câmp): minimum 1,0 m de la duza stingătorului la elementul sub tensiune;
- medie tensiune (PT, celule MT, cabluri MT): minimum 5,0 m pentru jet pulverizat de apă și respectarea distanțelor prescrise pentru manevre în instalații MT; se intervine numai după confirmarea deconectării.

### 5.3. Echipamentul de protecție al personalului de intervenție

Personalul de intervenție (atât mentenanța, cât și ISU) utilizează echipament individual de protecție adecvat riscului electric: mănuși electroizolante, încălțăminte electroizolantă, cască cu vizieră, îmbrăcăminte de protecție; se evită echipamentele conductoare (unelte metalice lungi în apropierea părților sub tensiune fără izolare). Se folosesc, la nevoie, aparate de respirat autonome (ISU) pentru protecția față de fumul toxic degajat de arderea materialelor plastice și a izolațiilor.

Fumul rezultat din arderea backsheet-urilor polimerice, a izolațiilor de cablu și a componentelor plastice ale invertoarelor conține produși de ardere toxici (monoxid de carbon, acid clorhidric în cazul materialelor cu halogeni, funingine); deși amenajarea este deschisă și fumul se disipează, în vecinătatea imediată a unui invertor sau transformator aprins concentrațiile pot fi periculoase, motiv pentru care protecția respiratorie este necesară la intervenția de proximitate. La transformatorul în ulei, arderea uleiului mineral produce fum dens, negru, cu vizibilitate redusă și degajare mare de căldură radiantă, impunând poziționarea echipelor din direcția din care nu bate vântul și menținerea distanțelor de siguranță. Aceste considerente sunt independente de puterea instalației, severitatea lor locală crescând însă cu volumul de material combustibil implicat (în special volumul de ulei al transformatorului).

### 5.4. Sursele de alimentare cu apă și cu energie pentru intervenție

- Sursa principală de apă pentru intervenția la vegetație este asigurată de autospecialele ISU (cisterne proprii, alimentare din surse naturale/rezervoare marcate pe planul de intervenție).
- Alimentarea cu energie a sistemelor de securitate (iluminat de securitate, SCADA, sistem de detecție) este asigurată de servicii proprii cu sursă de rezervă (UPS/baterie), astfel încât monitorizarea și semnalizarea să funcționeze și la întreruperea alimentării.

### 5.4.1. Tactica de intervenție pe timp de zi vs. pe timp de noapte

O particularitate esențială a instalațiilor fotovoltaice este dependența pericolului electric DC de iluminare:

- **Pe timp de zi (și în lumina flăcărilor):** câmpul este integral sub tensiune, la valori periculoase (până la 1.000–1.500 Vcc pe string). Intervenția directă asupra modulelor și cablurilor DC este interzisă; se lucrează exclusiv cu agenți neconductori, de la distanța de siguranță, cu accent pe protecția vieții și pe împiedicarea propagării la vegetație și la echipamentele adiacente.
- **Pe timp de noapte:** tensiunea DC a stringurilor scade spre valori reduse în absența luminii solare, însă **nu se anulează complet** dacă există surse de lumină artificială puternice (proiectoarele de intervenție, lumina flăcărilor unui incendiu activ pot reactiva o tensiune periculoasă). Prin urmare, chiar și noaptea se menține prezumția de tensiune și se evită iluminarea directă și puternică a modulelor cu proiectoarele autospecialelor mai mult decât este strict necesar.

Această comportare, insensibilă la puterea instalată, trebuie cunoscută și aplicată de toate echipele de intervenție.

### 5.4.2. Manevre interzise și greșeli tipice de evitat

- utilizarea jetului compact de apă pe module, cabluri DC, cutii de joncțiune, invertoare și celule MT sub tensiune;
- pătrunderea printre rândurile de module în timpul incendiului activ pentru „a ajunge la focar", expunându-se la conductoare deteriorate sub tensiune;
- călcarea/atingerea cablurilor DC căzute sau a structurilor care ar putea fi puse accidental sub tensiune;
- secționarea cablurilor DC sub tensiune (produce arc și pericol de electrocutare);
- presupunerea că „deconectarea invertorului a oprit instalația" — invertorul separă doar partea AC, partea DC rămâne activă;
- intervenția la transformatorul de MT înainte de confirmarea deconectării de către operatorul de distribuție.

### 5.5. Colaborarea cu operatorul de distribuție (OD)

Un element esențial al intervenției este coordonarea cu operatorul rețelei de distribuție de medie tensiune. Deconectarea PT de la rețea și confirmarea absenței tensiunii pe partea MT se fac de către OD, la solicitarea ISU/operatorului parcului. Se stabilesc din faza de proiectare procedurile de comunicare și datele de contact ale dispeceratului OD, care se includ în planul de intervenție.

---

## CAPITOLUL 6. MANAGEMENTUL VEGETAȚIEI — MĂSURĂ DE PREVENIRE A PROPAGĂRII

Managementul vegetației este o măsură de securitate la incendiu specifică și critică pentru parcurile fotovoltaice de sol, întrucât vegetația uscată este principalul vector de propagare a unui incendiu în interiorul câmpului și dinspre terenurile limitrofe.

**Măsuri obligatorii:**

- **Fâșia de protecție perimetrală** de minimum 3,0–5,0 m de-a lungul întregului perimetru interior al împrejmuirii, întreținută permanent fără vegetație combustibilă (prin cosire, pietruire sau strat mineral), care oprește propagarea unui incendiu de vegetație venit din exterior.

- **Cosirea periodică a vegetației** dintre și sub rândurile de module — programată în funcție de sezon, cu intensificare în perioadele secetoase (vară–toamnă), astfel încât înălțimea și cantitatea de vegetație uscată să fie menținute reduse. Se preferă cosirea mecanică sau pășunatul controlat (oi), soluție uzuală la parcurile FV de sol care menține vegetația scurtă fără riscul scânteilor de la utilaje.

- **Interzicerea depozitării de materiale combustibile** (vegetație cosită uscată, ambalaje, resturi) în incintă; vegetația cosită se evacuează.

- **Interzicerea focului deschis, a fumatului și a arderii miriștilor** în incintă și în vecinătatea imediată; amplasarea de indicatoare de interdicție.

- **Corelarea cu terenurile limitrofe** — informarea proprietarilor vecini asupra riscului de propagare a arderilor de miriște/vegetație și, unde este posibil, realizarea de fâșii de protecție și pe partea exterioară a împrejmuirii.

- **Precauții la lucrările mecanice** — cosirea și lucrările cu unelte care pot produce scântei se execută cu utilaje verificate, cu personal instruit și cu mijloace de primă intervenție (stingătoare, apă, lopeți) la îndemână, evitându-se orele/perioadele cu risc maxim de incendiu (zile caniculare, vânt puternic).

**Plan sezonier orientativ de management al vegetației:**

- *Primăvara (martie–mai):* prima cosire generală; refacerea și curățarea fâșiei perimetrale de protecție; verificarea stării împrejmuirii.
- *Vara (iunie–august) — perioada de risc maxim:* cosire frecventă, menținerea vegetației scurte și verzi cât mai mult posibil; monitorizarea atentă a zonelor cu vegetație uscată; interzicerea strictă a oricăror lucrări cu foc/scântei în zilele caniculare și pe vânt; verificarea mijloacelor de primă intervenție.
- *Toamna (septembrie–noiembrie):* cosirea vegetației uscate; evacuarea biomasei uscate acumulate; pregătirea pentru sezonul rece.
- *Iarna:* risc redus; verificări de mentenanță; monitorizarea acumulărilor de vegetație uscată rămasă.

Pășunatul controlat cu ovine, unde este aplicabil, oferă un management continuu, cu costuri reduse și fără riscul de scântei mecanice, fiind o soluție recomandată la parcurile de sol de orice mărime. Se acordă atenție ca animalele să nu deterioreze cablurile de la sol și conexiunile.

---

## CAPITOLUL 7. SEMNALIZAREA ȘI MARCAREA DE SECURITATE

Semnalizarea de securitate la incendiu și de avertizare a pericolului electric se realizează conform HG 971/2006 și SR EN ISO 7010, cu următoarele elemente specifice:

- **Indicatoare de pericol electric** („Pericol de electrocutare", „Tensiune periculoasă") la intrarea în incintă, la PT, la invertoare, la tablourile de string și pe împrejmuire, la intervale regulate. Se marchează explicit faptul că **modulele produc tensiune și în caz de incendiu / în prezența luminii**.

- **Indicatoare de avertizare pentru forțele de intervenție** — panou special la intrarea în incintă cu informația „Instalație fotovoltaică — pericol de tensiune continuă permanentă. Nu folosiți apă pe echipamente electrice sub tensiune", plan de situație cu poziția echipamentelor sub tensiune, a separatoarelor și a punctelor de deconectare.

- **Indicatoare de interdicție** — „Fumatul interzis", „Foc deschis interzis", „Accesul persoanelor neautorizate interzis".

- **Marcarea traseelor de cablu DC și AC**, a punctelor de deconectare rapidă (unde există) și a separatoarelor.

- **Marcarea căilor de acces și de intervenție**, a hidranților/punctelor de apă (unde există), a amplasamentelor stingătoarelor și pichetelor PSI, cu indicatoare fotoluminescente vizibile și pe timp de noapte.

- **Marcarea stingătoarelor și a pichetelor de incendiu** conform SR.

Semnalizarea specifică de pericol electric este cu atât mai importantă la instalațiile fotovoltaice cu cât personalul de intervenție extern (ISU, pompieri voluntari) poate să nu fie familiarizat cu particularitatea tensiunii DC permanente. De aceea, panoul de la intrare și indicatoarele de pe echipamente trebuie să comunice fără echivoc, într-un limbaj clar și cu pictograme standardizate, mesajul central: **„instalația produce tensiune periculoasă atât timp cât există lumină — nu se poate «opri» câmpul DC — nu folosiți apă pe echipamentele electrice sub tensiune"**. Acest mesaj este identic la orice putere a parcului și constituie prima linie de protecție a forțelor de intervenție. Semnalizarea se menține lizibilă în timp (materiale rezistente la UV și intemperii) și se verifică periodic în cadrul controlului intern.

Suplimentar, se recomandă instruirea prealabilă a subunității ISU competente teritorial cu privire la specificul obiectivului (vizită de recunoaștere, exercițiu comun), astfel încât, în caz de incendiu, echipele să cunoască amplasamentul, poziția echipamentelor sub tensiune și procedura de izolare — măsură cu valoare deosebită la amplasamentele izolate din extravilan.

---

## CAPITOLUL 8. INSTRUIREA PERSONALULUI ȘI ORGANIZAREA APĂRĂRII ÎMPOTRIVA INCENDIILOR

### 8.1. Instruirea în domeniul situațiilor de urgență

Conform Ordinului MAI nr. 712/2005 (modificat), personalul care își desfășoară activitatea în incinta parcului fotovoltaic (mentenanță, pază, intervenție tehnică) este instruit periodic în domeniul situațiilor de urgență, cu tematică adaptată riscurilor specifice:

- **Instructajul introductiv general** — la angajare / la prima intrare în incintă;
- **Instructajul specific locului de muncă** — riscul de arc DC, imposibilitatea deconectării câmpului, interdicția utilizării apei pe DC sub tensiune, distanțele de siguranță electrică, procedura de izolare pe stringuri, riscul incendiilor de vegetație;
- **Instructajul periodic** — la intervale stabilite prin planul de instruire (tipic 1–6 luni în funcție de categoria de personal);
- **Instructajul la schimbarea locului de muncă / a echipamentelor**.

### 8.2. Tematica specifică fotovoltaic a instruirii

- comportamentul instalației fotovoltaice în caz de incendiu (tensiune DC permanentă);
- utilizarea corectă a stingătoarelor CO₂/pulbere; interdicția apei pe echipamente sub tensiune;
- procedura de izolare electrică (invertoare, separatoare AC, izolare pe stringuri, coordonare cu OD);
- primul ajutor în caz de electrocutare;
- prevenirea și combaterea incendiilor de vegetație; utilizarea uneltelor de la pichetul PSI;
- alertarea (SCADA, 112) și punerea la dispoziție a planului de intervenție;
- reguli de comportament pentru lucrările cu foc deschis (permis de lucru cu foc), cosire, mentenanță.

### 8.3. Organizarea apărării împotriva incendiilor

- **Documente specifice** — instrucțiuni de apărare împotriva incendiilor, plan de intervenție avizat de ISU, plan de evacuare (minimal, dat fiind numărul redus de persoane), organizarea intervenției la locul de muncă, registre de instruire, fișe de instruire individuală.

- **Permisul de lucru cu foc** — obligatoriu pentru orice lucrare cu foc deschis, sudură, tăiere cu flacără sau operațiuni generatoare de scântei; se emite cu măsuri de securitate și supraveghere.

- **Autorizarea lucrărilor** — mentenanța electrică se execută numai de personal autorizat (electricieni autorizați ANRE), cu respectarea normelor de securitate a muncii la instalații electrice (NSSM electric), inclusiv scoaterea de sub tensiune și verificarea lipsei tensiunii acolo unde este posibil.

- **Controlul intern periodic** al stării mijloacelor PSI, al semnalizării, al vegetației și al stării instalațiilor electrice (termografie în infraroșu periodică pentru depistarea conexiunilor supraîncălzite / hot-spot-urilor — măsură preventivă recomandată).

### 8.4. Program orientativ de mentenanță preventivă cu rol în securitatea la incendiu

Frecvențele de mai jos se aplică la orice putere; la parcurile mari, volumul de lucru crește proporțional cu numărul de echipamente, dar cadența rămâne aceeași:

| Activitate | Frecvență orientativă |
|---|---|
| Verificarea vizuală a modulelor, cablurilor DC, cutiilor de joncțiune | lunar / trimestrial |
| Termografie IR a stringurilor, tablourilor, invertoarelor, PT | anual (sau semestrial la instalații critice) |
| Verificarea și strângerea conexiunilor electrice | anual |
| Verificarea rezistenței de izolație și a prizei de pământ | anual |
| Verificarea SPD-urilor și a instalației de paratrăsnet | anual |
| Verificarea și mentenanța invertoarelor (filtre, ventilatoare) | conform producătorului (trimestrial/anual) |
| Analiza uleiului transformatorului (la PT cu ulei) | anual / bienal |
| Verificarea releului Buchholz și a protecțiilor PT | anual |
| Verificarea stingătoarelor și a pichetelor PSI | conform SR (anual) + reîncărcare periodică |
| Verificarea sistemului de detecție/semnalizare | conform P118/3 (periodic) |
| Managementul vegetației (cosire) | sezonier (a se vedea Capitolul 6) |

Toate operațiunile de mentenanță electrică se execută de personal autorizat ANRE, cu respectarea normelor de securitate la instalații electrice, cu scoaterea de sub tensiune și verificarea lipsei tensiunii acolo unde este posibil (partea AC), respectiv cu prezumția de tensiune persistentă la partea DC.

---

## CAPITOLUL 8.bis. MĂSURI DE SECURITATE LA INCENDIU PE DURATA EXECUȚIEI

**Notificarea ISU înainte de începerea lucrărilor.** Anterior demarării lucrărilor de construire, beneficiarul/executantul are obligația de a obține **avizul de securitate la incendiu** emis de Inspectoratul pentru Situații de Urgență competent teritorial, pe baza prezentului scenariu și a documentației tehnice. De asemenea, se realizează **notificarea/anunțarea ISU cu privire la începerea lucrărilor**, iar la finalizare, înainte de punerea în funcțiune, se obține **autorizația de securitate la incendiu**. Aceste obligații de avizare/autorizare și de notificare se aplică indiferent de puterea instalată, întrucât decurg din prezența echipamentelor de medie/înaltă tensiune și din caracterul de instalație de producere a energiei; ele se corelează cu HG nr. 571/2016 și cu Ordinul MAI nr. 129/2016.

Faza de execuție (montaj) a parcului fotovoltaic prezintă riscuri de incendiu proprii, care se gestionează prin măsuri organizatorice pe șantier, indiferent de puterea instalației:

- **Lucrări cu foc deschis** (sudură structuri, tăiere metal) — se execută numai pe bază de permis de lucru cu foc, cu supraveghetor și cu mijloace de primă intervenție la punctul de lucru; se îndepărtează materialele combustibile și vegetația uscată din zona de lucru; se interzice lucrul cu foc pe vânt puternic și în perioade de risc canicular.
- **Punerea sub tensiune progresivă** — pe măsură ce stringurile se conectează, ele devin sub tensiune la lumină; personalul de montaj trebuie instruit că modulele produc tensiune încă de la conectare, iar lucrările la partea DC deja conectată se fac cu EIP electroizolant și cu verificarea corectă a conexiunilor înainte de energizare.
- **Depozitarea materialelor pe șantier** — modulele, cablurile, ambalajele și materialele combustibile se depozitează ordonat, ferit de surse de aprindere, cu spații de separare și căi de acces pentru intervenție; se interzice fumatul în zonele de depozitare.
- **Organizarea de șantier** — dotare PSI temporară (stingătoare la punctele de lucru, pichet de incendiu), instruirea muncitorilor, semnalizarea căilor de acces, coordonarea cu ISU la un eventual incident.
- **Verificări la recepție** — înainte de punerea în funcțiune se verifică execuția corectă a conexiunilor (termografie), etanșările antifoc, priza de pământ, SPD-urile, funcționarea detecției și a monitorizării, dotarea PSI și semnalizarea, conform proiectului și prezentului scenariu.

## CAPITOLUL 9. DECOMISIONAREA (DEZAFECTAREA) — ASPECTE DE SECURITATE LA INCENDIU

La finalul duratei de viață a parcului fotovoltaic (tipic 25–30 de ani) sau la dezafectarea anticipată, decomisionarea prezintă riscuri specifice de incendiu și electrocutare care se gestionează prin proceduri dedicate:

- **Scoaterea de sub tensiune și demontarea în siguranță** — se deconectează instalația de la rețea (prin OD), se descarcă condensatoarele invertoarelor, iar demontarea modulelor și cablurilor DC se face cu conștientizarea că **modulele rămân sub tensiune la lumină** până la demontarea și acoperirea/depozitarea lor; se lucrează pe rânduri, izolând progresiv, cu personal autorizat și cu EIP electroizolant.

- **Manipularea și depozitarea temporară** a modulelor demontate se face astfel încât să nu se creeze acumulări sub tensiune și să nu existe risc de scurtcircuit; modulele se acoperă/opacizează sau se manevrează cu prudență.

- **Gestionarea deșeurilor** — modulele fotovoltaice sunt deșeuri de echipamente electrice și electronice (DEEE), gestionate conform legislației specifice; uleiul de transformator (deșeu periculos) se colectează și se predă operatorilor autorizați, cu prevenirea scurgerilor și a riscului de incendiu; cablurile și componentele plastice se sortează și se reciclează.

- **Refacerea amplasamentului** — după demontare, se readuce terenul la starea inițială; se elimină riscurile reziduale (cabluri, structuri, fundații).

- **Actualizarea documentelor** — planul de intervenție și scenariul de securitate la incendiu se retrag/actualizează la finalizarea decomisionării.

---

## CAPITOLUL 10. CONCLUZII ȘI MĂSURI DE SECURITATE LA INCENDIU — SINTEZĂ

### 10.1. Sinteza încadrării și a nivelurilor de performanță

Parcul fotovoltaic, indiferent de puterea instalată P<sub>DC</sub>, este o amenajare deschisă, cu risc mic de incendiu (categoria E de pericol), în care componentele construite (postul de transformare — categoria C dacă are ulei, respectiv D/E dacă este uscat, și cabina de comandă — risc mic) se realizează la grade de rezistență la foc I–II. Riscul dominant este de natură **electrică** (arc DC, incendiu de invertor și de transformator/PT) și de **propagare pe vegetație**, iar problema centrală a intervenției este **pericolul persistent de electrocutare**, întrucât câmpul fotovoltaic nu poate fi scos de sub tensiune atât timp cât este expus la lumină.

### 10.2. Măsurile esențiale reținute

1. Încadrare la risc mic (E); PT la categoria C/D-E, tratat ca și compartiment de foc distinct la varianta cu ulei, cu cuvă de retenție 100 % a uleiului.
2. Rezistență la foc: PT grad I–II (anvelopă beton REI 120, uși EI 90–120), cabină comandă grad II; structuri metalice incombustibile (A1).
3. Reacție la foc: cabluri solare fără halogeni, întârzietoare de flacără (LSZH, SR EN 60332); module certificate SR EN IEC 61730.
4. Compartimentare internă PT + etanșări antifoc ale trecerilor de cabluri (EI 120).
5. Distanțe de siguranță: ≥ 3,0 m PT–câmp, ≥ 5,0 m PT ulei–cabină, ≥ 2,5–3,0 m invertoare–module, fâșie perimetrală de protecție 3,0–5,0 m; zonă de protecție ≥ 20 m în jurul stației de 110 kV (la parcurile mari cu racord de înaltă tensiune).
6. Căi de acces ISU: drum de acces și drum perimetral de incintă ≥ 3,5–4,0 m, gabarit ≥ 4,2 m, poartă ≥ 4,0 m, platforme de operare la PT/invertoare, panou de informare pentru intervenție la intrare.
7. Detecție de incendiu concentrată la PT, invertoare centrale și cabina de comandă, cu transmitere la SCADA/dispecerat; releu Buchholz la transformatorul în ulei; detecție de arc DC (AFCI) și monitorizare a izolației, unde este disponibilă.
8. Dotare PSI adecvată riscului electric — stingătoare CO₂ și pulbere (nu apă pe DC sub tensiune), pichete PSI cu unelte pentru incendii de vegetație; interdicția fermă a apei ca jet compact pe echipamente electrice sub tensiune.
9. Rezervă de apă și hidranți — neobligatorii la câmpul deschis de risc mic (justificat tehnic și normativ); soluție de apă/bazin prevăzută numai dacă analiza de risc a PT cu ulei sau ISU o impun, cu marcarea unui punct de alimentare a autospecialelor.
10. Protecție la trăsnet și supratensiuni (SPD DC/AC, LPS, priză de pământ generală echipotențializată).
11. Managementul vegetației — fâșie perimetrală, cosire/pășunat, interdicție foc deschis, precauții la lucrări mecanice.
12. Semnalizare specifică de pericol electric permanent și panou de intervenție pentru ISU.
13. Proceduri de intervenție specifice FV — izolare pe stringuri (cu recunoașterea persistenței tensiunii DC), coordonare cu OD, agenți neconductori, distanțe de siguranță electrică, EIP electroizolant.
14. Instruirea periodică a personalului cu tematică specifică fotovoltaic; permis de lucru cu foc.
15. Proceduri de decomisionare în siguranță (DEEE, ulei trafo, scoatere de sub tensiune progresivă).
16. Aviz de securitate la incendiu al ISU obligatoriu (pe baza prezentului scenariu), notificarea ISU înainte de începerea lucrărilor și autorizația de securitate la incendiu înainte de punerea în funcțiune — indiferent de puterea instalată.

### 10.3. Concluzia finală

Prin adoptarea integrală a măsurilor de securitate la incendiu prezentate — încadrarea corectă a riscului, nivelurile de rezistență și reacție la foc, compartimentarea și distanțele de siguranță, dotarea PSI compatibilă cu prezența permanentă a tensiunii, detecția la echipamentele critice, managementul vegetației, protecția la trăsnet, semnalizarea de pericol electric, procedurile de intervenție specifice și instruirea personalului — obiectivul „Parc fotovoltaic" (la orice putere instalată P<sub>DC</sub> stabilită prin proiect) **îndeplinește cerința fundamentală „securitate la incendiu" prevăzută de Legea nr. 10/1995 și de Legea nr. 307/2006**, la nivelul de performanță impus de categoria de risc și de particularitățile tehnologice ale instalațiilor de producere a energiei din surse fotovoltaice.

Măsura de securitate cea mai importantă și cea mai specifică rămâne **conștientizarea și tratarea pericolului electric persistent al câmpului DC**: nicio strategie de intervenție nu trebuie să pornească de la ipoteza că instalația „a fost oprită", ci de la ipoteza că **modulele produc tensiune atât timp cât există lumină, inclusiv lumina propriului incendiu** — motiv pentru care agenții de stingere sunt neconductori (CO₂/pulbere), apa este interzisă ca jet compact pe echipamentele DC sub tensiune, iar intervenția se face de la distanțele de siguranță electrică, cu prioritate absolută pentru protecția vieții forțelor de intervenție.

Prezentul scenariu de securitate la incendiu se supune avizării Inspectoratului pentru Situații de Urgență competent teritorial și se corelează, la fazele următoare de proiectare (PT, DE), cu proiectul de instalații electrice, cu schemele monofilare, cu proiectul de arhitectură al PT și al cabinei de comandă, precum și cu planul de intervenție întocmit conform reglementărilor în vigoare.

---

*Document întocmit pentru faza DTAC. Nivelurile de performanță, distanțele și dotările se detaliază și se confirmă la fazele PT/DE, în corelare cu proiectantul de specialitate electrică, cu producătorii de echipamente (module, invertoare, transformator) și cu cerințele avizului ISU.*
