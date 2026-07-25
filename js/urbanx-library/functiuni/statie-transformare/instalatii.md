# MEMORIU TEHNIC DE INSTALAȚII ELECTRICE — D.T.A.C.

## STAȚIE DE TRANSFORMARE 110/20 kV, Sn 40 MVA

*Prezentul memoriu tratează, la faza documentației tehnice pentru autorizarea executării lucrărilor de construire (D.T.A.C.), componenta de instalații electrice a unei stații electrice de transformare 110/20 kV cu un transformator de putere de Sn 40 MVA. Datele de identificare a investiției, încadrarea urbanistică, amplasamentul și lista avizelor se tratează în memoriul tehnic general; volumul construit (clădirea de comandă, platforma exterioară, împrejmuirea, drumurile de acces), arhitectura clădirii de comandă și organizarea funcțională a incintei se tratează în memoriul de arhitectură; fundațiile echipamentelor, structura clădirii de comandă, portalurile și rezistența la acțiuni seismice și climatice se tratează în memoriul de structură. Prezentul memoriu nu reproduce conținutul acelor piese, ci le presupune cunoscute și se concentrează exclusiv pe partea electrică propriu-zisă a obiectivului — cea care justifică, de fapt, întreaga investiție. Spre deosebire de o clădire obișnuită, unde instalațiile electrice sunt o componentă secundară, subordonată funcțiunii de bază a construcției (locuit, comerț, producție), la o stație de transformare **schema electrică monofilară este inima obiectului de construcție**: platforma, clădirea de comandă, împrejmuirea și toate elementele de construcții-montaj există exclusiv pentru a găzdui, proteja și pune în siguranță un lanț de echipamente electrice — de la racordul la linia electrică aeriană de 110 kV, prin transformatorul de putere, până la plecările de medie tensiune care alimentează rețeaua de distribuție. Fir conducător al întregului memoriu, reluat consecvent la fiecare capitol, este **verificarea completă a acestui lanț pe trei planuri simultane și inseparabile**: planul funcțional (fiecare echipament își îndeplinește rolul în schema monofilară — comutație, măsură, protecție, transformare), planul dimensional (fiecare echipament este ales, prin calcul, la parametrii de curent nominal, curent de scurtcircuit și nivel de izolație ai instalației concrete, nu la valori generice de catalog) și planul de securitate (instalația este proiectată astfel încât, în cazul cel mai defavorabil — un defect intern cu punere la pământ — nicio persoană aflată în incintă sau în vecinătatea ei să nu fie expusă unor tensiuni de atingere sau de pas periculoase pentru viață). Cel de-al treilea plan, tratat la capitolul 7, este, prin natura riscului pe care îl adresează, capitolul central de securitate al întregului memoriu.*

---

## 0. CUPRINS

1. Date generale, cadrul normativ și rolul central al schemei electrice
2. Schema electrică monofilară — descrierea completă a fluxului de energie
3. Curenții nominali și curenții de scurtcircuit — breviar de calcul
4. Dimensionarea barelor colectoare
5. Coordonarea izolației
6. Protecțiile electrice
7. Priza de pământ (SR EN 50522) — capitolul central de securitate
8. Serviciile proprii de curent alternativ și curent continuu
9. Sistemul de comandă-control IEC 61850
10. Iluminat și PSI specific instalațiilor electrice
11. Racordarea la Sistemul Energetic Național
12. Tabel de sinteză a mărimilor electrice calculate
13. Concluzii, verificarea cerinței Ie și coordonarea cu celelalte specialități

---

## 1. Date generale, cadrul normativ și rolul central al schemei electrice

### 1.1. Obiectul memoriului

Investiția care face obiectul prezentei documentații este o **stație electrică de transformare 110/20 kV**, cu un singur transformator de putere trifazat, de tip exterior sau interior (după soluția de amplasament adoptată la faza de proiectare tehnică), având puterea nominală **Sn = 40 MVA** — valoare de vârf a gamei uzuale pentru o stație de acest tip, care poate cuprinde, în funcție de investiție, transformatoare între 25 și 40 MVA; prezentul memoriu ia ca ipoteză de calcul valoarea maximă a gamei, Sn = 40 MVA, valoare care acoperă, prin dimensionare, și treptele inferioare (25, 32 MVA), aparatajul fiind ales, ca regulă generală de proiectare a stațiilor electrice, la valori standardizate superioare celor rezultate strict din calcul, tocmai pentru a permite o eventuală retehnologizare ulterioară a transformatorului fără înlocuirea întregii instalații primare.

Stația realizează interfața dintre **Sistemul Energetic Național (SEN)**, la nivelul de tensiune de **110 kV** (rețeaua electrică de transport/subtransport), și rețeaua de **distribuție de medie tensiune de 20 kV**, care alimentează, la rândul ei, posturile de transformare 20/0,4 kV din zona deservită. Funcțiunea stației este, așadar, triplă: **transformarea** tensiunii (110 kV → 20 kV, cu reglaj automat sub sarcină), **comutația** (posibilitatea de a conecta/deconecta, manual sau automat, fiecare element al schemei — linie, transformator, plecare de medie tensiune) și **protecția** (detectarea și eliminarea, în timp util, a oricărui defect apărut în instalație sau pe rețelele racordate la ea, astfel încât acesta să nu se propage și să nu pună în pericol nici echipamentul, nici persoanele).

### 1.2. Parametrii de referință ai stației

| Parametru | Valoare |
|---|---|
| Tensiunea nominală/cea mai ridicată pentru echipament, partea 110 kV | Un 110 kV / Um 123 kV |
| Tensiunea nominală/cea mai ridicată pentru echipament, partea 20 kV | Un 20 kV / Um 24 kV |
| Puterea nominală a transformatorului | Sn 25…40 MVA (calcul la valoarea de vârf, 40 MVA) |
| Conexiunea transformatorului | YNd11 |
| Regimul neutrului, partea 110 kV | legat efectiv la pământ (rețea de transport) |
| Regimul neutrului, partea 20 kV | tratat (prin bobină Petersen sau prin rezistor de limitare) |
| Numărul de plecări 110 kV | 1 sau 2 celule de linie (după configurația de racordare — antenă/intrare-ieșire) |
| Numărul de transformatoare | 1 (extindere ulterioară posibilă la 2, prin rezervarea unei celule) |
| Numărul de plecări 20 kV | conform necesarului rețelei de distribuție deservite |

### 1.3. Cadrul normativ aplicabil

Proiectarea unei stații electrice de transformare este guvernată de un corp de reglementări tehnice specific, distinct de normativele aplicabile clădirilor civile, structurat pe trei paliere: normativele tehnice românești (NTE, PE), standardele europene armonizate (seria SR EN) și standardele internaționale ale aparatajului (IEC), la care se adaugă reglementările Autorității Naționale de Reglementare în domeniul Energiei (ANRE) privind racordarea la rețea.

**Coordonarea izolației și proiectarea instalațiilor electrice:**
- **NTE 001/03** — Normativ privind alegerea izolației, coordonarea izolației și protecția instalațiilor electroenergetice împotriva supratensiunilor
- **NTE 003/04** — Normativ pentru construcția liniilor electrice aeriene de medie tensiune
- **NTE 007/08** — Normativ pentru proiectarea și execuția rețelelor de cabluri electrice
- **PE 101** — Normativ pentru proiectarea și execuția instalațiilor electrice de conexiuni și transformare
- **PE 103** — Normativ pentru dimensionarea și verificarea instalațiilor electroenergetice la solicitări mecanice și termice în condițiile curenților de scurtcircuit
- **PE 104** — Normativ pentru construcția instalațiilor electrice de conexiuni și transformare cu tensiuni peste 1 kV
- **PE 111** — Normativ privind alegerea izolației, coordonarea izolației și protecția instalațiilor electrice împotriva supratensiunilor (protecții prin relee, în particular)
- **PE 116** — Normativ de încercări și măsurători la echipamente și instalații electrice

**Standarde europene armonizate:**
- **SR EN 61936-1** — Instalații electrice cu tensiuni peste 1 kV c.a. — cerințe comune (dimensionarea generală a stațiilor electrice de înaltă tensiune)
- **SR EN 50522** — Punerea la pământ a instalațiilor electrice cu tensiune peste 1 kV c.a. — standardul de referință pentru capitolul 7 al prezentului memoriu
- **SR EN 62271** (seria) — Aparataj de conectare de înaltă tensiune (întreruptoare, separatoare, celule)
- **SR EN 60076** (seria, echivalent IEC 60076) — Transformatoare de putere
- **SR EN 60071** (echivalent IEC 60071) — Coordonarea izolației
- **IEC 60255** — Relee de măsură și echipamente de protecție
- **IEC 61850** — Rețele și sisteme de comunicație în stațiile electrice (comandă-control, cap. 9)
- **IEC 60479** — Efectele curentului asupra omului și animalelor domestice (fundamentul fiziologic al capitolului 7)

**Racordare la rețea și cod tehnic:**
- **I 7-2011** — Normativ pentru proiectarea, execuția și exploatarea instalațiilor electrice cu tensiuni până la 1.000 V c.a. și 1.500 V c.c. (aplicabil serviciilor proprii, cap. 8)
- **Codul tehnic al rețelelor electrice de transport (RET)** și **Codul tehnic al rețelelor electrice de distribuție (RED)**, aprobate prin ordine ANRE (cap. 11)
- **Ordinul ANRE privind Avizul Tehnic de Racordare (ATR)** și procedura de racordare la SEN

Se adoptă, ca principiu general de proiectare, cea mai recentă ediție în vigoare a fiecărui normativ la data elaborării prezentei documentații; unde există suprapuneri sau contradicții aparente între normativele naționale și standardele europene armonizate, se aplică cerința mai severă, iar unde standardul SR EN a înlocuit integral un PE mai vechi, se aplică standardul SR EN, cu păstrarea, ca referință istorică, a numerotării PE acolo unde practica de proiectare românească o menține.

### 1.4. Principiul central: schema electrică monofilară ca "inimă" a stației

Argumentul care structurează întregul prezent memoriu, reluat la fiecare capitol, este că o stație electrică de transformare **nu este, din punct de vedere al proiectării, o construcție care conține echipamente electrice** — este, dimpotrivă, **un echipament electric complex care conține, ca element auxiliar, o construcție** (clădirea de comandă, platforma, împrejmuirea) menită să protejeze acest echipament de intemperii, să limiteze accesul persoanelor neautorizate și să asigure condițiile de mediu necesare funcționării lui corecte. Această inversare de perspectivă față de o clădire civilă obișnuită are consecințe directe asupra structurii prezentului memoriu:

**(a)** Capitolul 2 (schema electrică monofilară) nu este un capitol printre altele, ci **documentul generator** al întregii investiții: fiecare element de construcții-montaj — fundația unui portal, traseul unui cablu, dimensiunea unei încăperi din clădirea de comandă — există pentru a găzdui un echipament electric identificat explicit în schema monofilară, iar amplasarea lui în teren respectă distanțele impuse de coordonarea izolației (cap. 5) și de securitatea la electrocutare (cap. 7).

**(b)** Fiecare echipament din schemă este ales, la rândul lui, nu dintr-un catalog generic, ci printr-un **breviar de calcul** care pornește de la puterea nominală a transformatorului (Sn = 40 MVA) și de la nivelul de scurtcircuit al rețelei de racordare, breviar reluat integral la capitolul 3 și care condiționează dimensionarea barelor (cap. 4), coordonarea izolației (cap. 5) și pragurile de reglaj ale protecțiilor (cap. 6).

**(c)** Instalația este, prin natura ei, un **punct de concentrare a energiei** — orice defect intern (scurtcircuit între faze, punere la pământ) eliberează, într-un timp foarte scurt, o cantitate de energie de ordinul zecilor până la sutelor de megajouli, cu două consecințe care nu au echivalent la o clădire civilă: solicitarea mecanică și termică extremă a echipamentelor (cap. 4) și **ridicarea potențialului electric al solului din incintă și din vecinătatea ei la valori periculoase pentru orice persoană prezentă** — motiv pentru care priza de pământ (cap. 7) nu este o instalație auxiliară, ci **condiția de securitate fără de care stația nu poate fi pusă în funcțiune**, indiferent cât de corect sunt dimensionate toate celelalte instalații.

---

## 2. Schema electrică monofilară — descrierea completă a fluxului de energie

### 2.1. Structura generală pe niveluri de tensiune

Schema electrică monofilară a stației descrie, într-o reprezentare simplificată la o singură fază (de unde și denumirea "monofilară"), traseul complet al energiei electrice prin instalație, de la punctul de racordare la rețeaua de 110 kV până la fiecare plecare individuală de medie tensiune. Fluxul complet, în ordinea fizică a echipamentelor, este:

**LEA/LES 110 kV → celula de linie 110 kV → bare colectoare 110 kV → celula transformatorului (partea 110 kV) → transformatorul de putere 110/20 kV → celula transformatorului (partea 20 kV) → bare colectoare 20 kV → celulele de plecare de medie tensiune → rețeaua de distribuție 20 kV**,

la care se adaugă, în derivație de pe barele de 20 kV, **serviciile proprii ale stației** (transformator de servicii proprii 20/0,4 kV, tablou general de curent alternativ, instalația de curent continuu cu baterie de acumulatori și redresor, sistemul de comandă-control). Fiecare săgeată din acest lanț corespunde unei celule electrice complete — un ansamblu de aparataj primar (întreruptor, separatoare, transformatoare de măsură) montat, după caz, în execuție exterioară deschisă (partea de 110 kV, tipic) sau în celule metalice de interior (partea de 20 kV, tipic), fiecare celulă fiind, la rândul ei, echipată cu propriile echipamente de protecție, măsură și comandă locală.

### 2.2. Celula de linie 110 kV — descrierea echipament cu echipament

Celula de linie este primul element al schemei, cel care realizează interfața fizică între linia electrică aeriană sau subterană de 110 kV (LEA/LES 110 kV, aparținând operatorului de transport sau de distribuție, după caz) și instalația proprie a stației. Parcurgând celula în ordinea fizică a echipamentelor, de la intrarea liniei spre bara colectoare:

**Descărcătorul de supratensiuni (MOSA — Metal Oxide Surge Arrester)** este primul echipament întâlnit de unda de supratensiune care se propagă pe linie dinspre exterior — fie o supratensiune atmosferică (trăsnet căzut pe linie sau în vecinătatea ei, cu propagare a undei de curent/tensiune de-a lungul conductorului), fie o supratensiune de manevră (comutații pe rețea). Rolul descărcătorului este de a **limita amplitudinea tensiunii care ajunge la echipamentele din aval** (transformatorul de măsură, întreruptorul și, mai ales, transformatorul de putere, cel mai scump și mai sensibil echipament al stației) la o valoare — tensiunea reziduală Ures — inferioară nivelului de izolație pentru care sunt construite acele echipamente (BIL, cap. 5). Descărcătorul modern, cu oxizi metalici (ZnO), funcționează fără eclator, prin caracteristica puternic neliniară a rezistenței oxidului de zinc: la tensiunea de regim, rezistența este practic infinită (curent de scurgere neglijabil, de ordinul miliamperilor), iar la depășirea unui prag, rezistența scade brusc cu mai multe ordine de mărime, permițând scurgerea la pământ a curentului de supratensiune fără întârziere de amorsare — comportare superioară descărcătoarelor cu eclatoare, folosite în trecut, care introduceau o întârziere de amorsare incompatibilă cu fronturile foarte rapide ale supratensiunilor atmosferice.

**Separatorul de linie** este un aparat de comutație fără putere de rupere — nu poate întrerupe un curent de sarcină sau de scurtcircuit, ci servește exclusiv la **crearea unei distanțe de izolare vizibile** între linia scoasă din funcțiune și restul instalației, condiție obligatorie pentru lucrările de mentenanță (interblocajul dintre întreruptor și separator, tratat la capitolul 9, împiedică manevrarea separatorului sub sarcină).

**CLP (cuplajul de linie prin curenți purtători, engl. Power Line Carrier — PLC)** este echipamentul care folosește conductorul liniei de 110 kV însuși ca mediu de transmisie pentru semnalele de teleprotecție și de telecomunicații între cele două capete ale liniei (stația proprie și stația/nodul de la celălalt capăt al liniei), suprapunând, prin filtre de înaltă frecvență, un semnal purtător de câțiva zeci-sute de kHz peste tensiunea de 50 Hz a liniei. Rolul lui, relevant pentru protecția 21 (cap. 6.5), este de a permite **schimbul rapid de comenzi de declanșare între cele două capete ale liniei** (teleprotecție), astfel încât un defect pe linie să fie eliminat simultan la ambele capete, indiferent de zona în care s-a produs defectul pe traseul liniei.

**Transformatoarele de măsură — TC (transformator de curent) și TT (transformator de tensiune)** reduc mărimile primare (curentul de sute de amperi, tensiunea de 110 kV) la valori secundare standardizate (tipic 1 A sau 5 A pentru curent, 100 V pentru tensiune), compatibile cu intrările releelor de protecție, ale aparatelor de măsură și ale contoarelor de energie. TC-urile alimentează circuitele de protecție (87T, 50/51, 21 — cap. 6) și de măsură (contorizarea energiei tranzitate), fiecare cu înfășurări secundare separate și clase de precizie diferite (clasa de protecție, cu precizie garantată și la curenți de scurtcircuit de zeci de ori curentul nominal, respectiv clasa de măsură, cu precizie ridicată în jurul curentului nominal, dar fără garanție la supracurenți).

**Întreruptorul (SF₆ sau în vid)** este singurul aparat din celulă capabil să întrerupă curenți de sarcină și, mai important, **curenți de scurtcircuit** — funcția lui esențială, cea care justifică existența întregului sistem de protecții (cap. 6): la comanda unui releu de protecție, întreruptorul deschide contactele principale în interiorul unei camere de stingere cu hexafluorură de sulf (SF₆, cu proprietăți dielectrice și de stingere a arcului electric net superioare aerului) sau, la tensiuni și puteri mai reduse, în vid (unde absența unui mediu de ionizare limitează arcul electric la câteva milisecunde), întrerupând curentul de defect înainte ca acesta să provoace daune ireversibile echipamentelor din aval.

**Separatorul de bară**, similar constructiv separatorului de linie, realizează izolarea vizibilă a celulei față de bara colectoare, permițând lucrări de mentenanță pe celulă fără scoaterea din funcțiune a întregii bare.

### 2.3. Barele colectoare 110 kV

Barele colectoare sunt conductoarele rigide (tuburi sau profile de aluminiu/cupru) sau, în unele configurații, cablurile flexibile întinse între portaluri, la care se racordează toate celulele de linie și celula transformatorului, realizând nodul electric comun al părții de 110 kV a stației. Configurația poate fi cu **bară simplă** (soluție simplă și economică, dar fără posibilitatea de a menține alimentarea în cazul unei lucrări de mentenanță pe bară) sau cu **bară dublă** (două seturi de bare colectoare, cu posibilitatea de a transfera fiecare celulă de pe o bară pe cealaltă prin cuplă de bare, soluție care asigură continuitatea alimentării și flexibilitate în exploatare, adoptată tipic la stațiile cu mai multe plecări de linie). Dimensionarea electrică a barelor (secțiune, distanțe între faze, susținere pe izolatoare) este tratată integral la capitolul 4.

### 2.4. Celula transformatorului — partea de 110 kV

Structural similară unei celule de linie (separator, TC/TT, întreruptor, separator de bară), celula transformatorului de pe partea de 110 kV are rolul specific de a proteja transformatorul de putere și de a permite scoaterea lui din funcțiune, izolat de restul instalației, pentru mentenanță sau în cazul unui defect intern detectat de protecția diferențială 87T (cap. 6.2), care acționează, la declanșare, simultan pe întreruptorul de 110 kV și pe cel de 20 kV al transformatorului, izolând complet echipamentul defect de ambele părți.

### 2.5. Transformatorul de putere 110/20 kV, YNd11, Sn 40 MVA

Transformatorul de putere este **elementul central al întregii instalații** — singurul echipament din schemă care nu comută și nu protejează, ci **transformă** energia electrică de la nivelul de tensiune al rețelei de transport la nivelul de tensiune al rețelei de distribuție, prin cuplaj electromagnetic între înfășurarea primară (110 kV) și cea secundară (20 kV), fără legătură electrică directă între cele două părți.

**Conexiunea YNd11** descrie modul de conectare a celor două seturi de înfășurări trifazate: **Y** (stea) pe partea de înaltă tensiune, cu neutrul **N** scos și legat la pământ (necesar pentru a permite exploatarea rețelei de 110 kV cu neutrul legat efectiv la pământ, regim standard al rețelelor de transport/subtransport din România), și **d** (triunghi, literă mică indicând tensiunea mai joasă) pe partea de medie tensiune, la 20 kV. Cifra **11** indică defazajul unghiular dintre tensiunile omoloage ale celor două înfășurări, exprimat în ore de ceasornic (11 × 30° = 330°, echivalent cu −30°) — informație obligatorie pentru cuplarea în paralel a mai multor transformatoare sau pentru interconectarea corectă cu alte surse ale rețelei. Conexiunea în triunghi pe partea secundară are un rol suplimentar, esențial: **oferă o cale de circulație pentru componentele de curent de secvență homopolară** generate de un dezechilibru sau de o punere la pământ pe rețeaua de 20 kV, permițând transformatorului să funcționeze corect și în regim dezechilibrat, fără a transmite acest dezechilibru pe partea de 110 kV.

**Reglajul sub sarcină (OLTC — On-Load Tap Changer)** este mecanismul care permite modificarea raportului de transformare al transformatorului **fără întreruperea alimentării**, prin comutarea, sub comandă automată sau manuală, între prizele înfășurării de reglaj (tipic ±8…±16 trepte, de ordinul a 1,25…1,5% pe treaptă), compensând astfel variațiile tensiunii din rețeaua de 110 kV (care depinde de starea de încărcare a sistemului energetic) și menținând tensiunea livrată pe bara de 20 kV în banda impusă de calitatea energiei electrice, indiferent de nivelul de sarcină al stației. Comutarea sub sarcină, spre deosebire de comutarea "fără tensiune" (posibilă doar cu transformatorul scos din funcțiune, la trepte fixe), se realizează printr-un mecanism cu rezistențe de tranziție sau reactanțe, care evită întreruperea sau scurtcircuitarea directă a spirelor intermediare în timpul comutării.

**Releul Buchholz** este dispozitivul de protecție specific transformatoarelor cu ulei, montat pe conducta dintre cuva transformatorului și conservatorul de ulei (rezervorul de expansiune de la partea superioară). Principiul lui de funcționare este direct legat de fizica defectelor interne: **orice defect electric în interiorul cuvei — arc electric incipient între spire, descărcare parțială, supraîncălzire locală — descompune parțial uleiul mineral și materialele izolante celulozice (hârtie, carton) prin efect termic, generând gaze** (în principal hidrogen, dar și metan, etilenă, acetilenă, în proporții caracteristice tipului de defect — informație exploatată ulterior prin analiza cromatografică a gazelor dizolvate, DGA). Aceste gaze, produse în interiorul cuvei, migrează spre partea superioară și spre conservator, trecând prin releul Buchholz, unde deplasează un flotor care acționează, în două trepte: **prima treaptă (alarmă)**, la o acumulare lentă de gaz (defect incipient, de exemplu degradare izolație în timp), semnalizează fără a declanșa, permițând intervenția înainte ca defectul să se agraveze; **a doua treaptă (declanșare)**, activată de un curent brusc de ulei către conservator (produs de un defect major, cu formare rapidă și masivă de gaz — de exemplu un scurtcircuit între spire), comandă declanșarea instantanee a întreruptoarelor de pe ambele părți ale transformatorului, indiferent de valoarea curentului măsurat de protecțiile electrice — Buchholz detectând, astfel, o categorie de defecte incipiente pe care protecțiile bazate exclusiv pe curent (87T, 50/51) nu le pot sesiza la timp.

**Tensiunea de scurtcircuit uk ≈ 12%** — parametru electric fundamental al transformatorului, definit ca procentul din tensiunea nominală care trebuie aplicat înfășurării primare, cu secundarul scurtcircuitat, pentru a obține curentul nominal prin înfășurări — este, fizic, expresia impedanței interne a transformatorului (în principal reactanța de scăpări dintre înfășurările primară și secundară), impedanță care limitează în mod natural curentul de scurtcircuit debitat de transformator în cazul unui defect pe partea secundară, așa cum se detaliază la capitolul 3.3.

### 2.6. Celula transformatorului — partea de 20 kV

Simetric celulei de pe partea de 110 kV, celula transformatorului de pe partea de 20 kV cuprinde întreruptorul (tipic în vid, la acest nivel de tensiune), separatoarele, transformatoarele de măsură TC/TT dedicate protecției diferențiale 87T (a cărei zonă de protecție se întinde exact între TC-ul de pe partea de 110 kV și TC-ul de pe partea de 20 kV, incluzând integral transformatorul de putere) și echipamentul de măsură a energiei livrate către rețeaua de distribuție.

### 2.7. Barele colectoare 20 kV

Pe partea de medie tensiune, barele colectoare sunt realizate, tipic, în **celule metalice de interior (echipament modular, prefabricat, montat în clădirea de comandă sau într-o clădire dedicată)** — soluție diferită de execuția deschisă, exterioară, de pe partea de 110 kV, justificată de dimensiunile mult mai reduse ale echipamentului la 20 kV (distanțe de izolație de ordinul zecilor de centimetri, cap. 5, față de peste un metru la 110 kV) și de avantajele operaționale ale celulelor metalice: protecție integrală față de intemperii și de accesul accidental la părți sub tensiune, izolare între celule vecine (limitarea propagării unui defect de la o celulă la alta), și, la execuțiile moderne, izolație în gaz SF₆ sau în aer, cu grad ridicat de compartimentare internă (întreruptor, bare, cablu — în compartimente separate, fiecare cu propriul indicator de prezență tensiune).

### 2.8. Plecările de medie tensiune

Fiecare plecare de 20 kV este o celulă completă (întreruptor + separator + TC/TT + protecții proprii — maximală de curent 50/51 și homopolară 50N/51N, ca protecție de linie, coordonată în timp cu protecțiile din amonte, cap. 6.3-6.4) care alimentează un fider de distribuție dedicat, racordat, la rândul lui, la posturile de transformare 20/0,4 kV din zona deservită. Numărul de plecări se stabilește la faza de proiectare tehnică, în funcție de topologia rețelei de distribuție și de puterea totală care trebuie evacuată de la stație, cu rezervarea, tipic, a cel puțin unei celule libere pentru dezvoltări ulterioare.

### 2.9. Serviciile proprii — poziția în schemă

Din barele de 20 kV se derivă, printr-o celulă dedicată, alimentarea **transformatorului de servicii proprii (20/0,4 kV)**, care alimentează, la rândul lui, tabloul general de servicii proprii de curent alternativ (iluminat, prize, ventilație, încălzire) și, prin intermediul unui redresor, instalația de curent continuu a stației (baterie de acumulatori, circuite de protecție, comandă și semnalizare) — ansamblu tratat integral la capitolul 8, esențial pentru funcționarea corectă a tuturor protecțiilor și echipamentelor de comandă descrise la capitolele 6 și 9.

---

## 3. Curenții nominali și curenții de scurtcircuit — breviar de calcul

### 3.1. Curentul nominal pe partea de 110 kV

Curentul nominal al unei instalații trifazate se calculează din relația fundamentală care leagă puterea aparentă trifazată de tensiunea de linie și de curentul de linie, S = √3 · U · I, de unde:

**In = Sn / (√3 · Un)**

Factorul √3 din formulă provine direct din geometria sistemului trifazat: puterea totală transportată de cele trei faze este suma puterilor monofazate, iar relația dintre tensiunea de linie (măsurată între două faze) și tensiunea de fază (măsurată între o fază și neutru) este U_linie = √3 · U_fază — astfel încât puterea trifazată totală, exprimată în funcție de tensiunea de linie și de curentul de linie (identic cu curentul de fază, în conexiune stea sau triunghi echilibrată), capătă factorul √3 caracteristic tuturor calculelor de curent nominal în instalații trifazate.

Pentru partea de 110 kV a stației, cu Sn = 40 MVA și Un = 110 kV:

**In,110 = 40.000.000 / (√3 × 110.000) = 40.000.000 / 190.526 ≈ 210 A**

Această valoare reprezintă curentul care circulă, în regim nominal (transformator la putere maximă), prin celula de linie, prin bara colectoare de 110 kV și prin celula transformatorului, pe partea de înaltă tensiune — valoare relativ modestă comparativ cu partea de 20 kV (cap. 3.2), consecință directă a nivelului ridicat de tensiune (aceeași putere transportată la o tensiune de 5,5 ori mai mare necesită un curent de 5,5 ori mai mic).

### 3.2. Curentul nominal pe partea de 20 kV

Aplicând aceeași formulă pentru partea de medie tensiune, cu Un = 20 kV:

**In,20 = 40.000.000 / (√3 × 20.000) = 40.000.000 / 34.641 ≈ 1.155 A**

Curentul nominal de partea secundară este, așadar, de aproximativ 5,5 ori mai mare decât cel de partea primară — raport care corespunde exact raportului de transformare al tensiunilor (110/20 = 5,5), consecință a conservării puterii (neglijând pierderile) prin transformator. Această valoare de calcul (1.155 A) condiționează alegerea aparatajului de pe barele și celulele de 20 kV, care se face la treapta standardizată imediat superioară, **1.250 A**, valoare uzuală de catalog pentru întreruptoare și separatoare de medie tensiune, care asigură o marjă de securitate față de valoarea strict calculată și permite o eventuală creștere ulterioară a puterii transformatorului fără înlocuirea aparatajului de bară.

### 3.3. Puterea și curentul de scurtcircuit pe partea de 20 kV — rolul tensiunii de scurtcircuit uk

În cazul unui defect trifazat franc (scurtcircuit metalic între cele trei faze) chiar la bornele secundare ale transformatorului, curentul de defect este limitat exclusiv de impedanța internă a transformatorului însuși (rețeaua din amonte, de 110 kV, fiind considerată, la acest calcul, o sursă de putere infinită față de impedanța mult mai mare a transformatorului) — impedanță exprimată convențional prin **tensiunea de scurtcircuit procentuală uk**, definită la capitolul 2.5 ca procentul din tensiunea nominală necesar pentru a obține curentul nominal cu secundarul în scurtcircuit. Relația dintre uk și curentul de scurtcircuit debitat de transformator este directă: dacă uk% din tensiune produce curentul nominal In, atunci 100% din tensiune (situația reală de defect, cu tensiunea nominală întreagă aplicată pe impedanța transformatorului) produce un curent de (100/uk) ori mai mare:

**Isc,20 = In,20 / (uk/100) = 1.155 / 0,12 ≈ 9.600 A = 9,6 kA**

Această relație explică fizic de ce **un transformator cu tensiune de scurtcircuit mai mare "limitează" mai bine curentul de defect**, cu prețul unei căderi de tensiune mai mari în regim de sarcină normală și, respectiv, de ce alegerea uk-ului transformatorului (parametru de catalog, stabilit la comanda transformatorului) este, ea însăși, o decizie de proiectare a nivelului de scurtcircuit al stației, nu doar un parametru dat.

Puterea de scurtcircuit corespunzătoare, definită ca Ssc = √3 · Un · Isc, se poate calcula, echivalent și mai direct, din relația:

**Ssc,20 = Sn / uk = 40 / 0,12 ≈ 333 MVA**

Valoarea de 9,6 kA calculată reprezintă curentul care trebuie întrerupt de protecțiile de pe partea de 20 kV (întreruptorul transformatorului și, în cascadă, întreruptoarele de plecare, dacă defectul e mai aproape de o plecare decât de bare) în cazul cel mai defavorabil, cel al unui defect chiar la barele colectoare. Aparatajul de 20 kV al stației (celule, întreruptoare, separatoare) se alege, ca regulă de proiectare a stațiilor electrice, la treapta standardizată de curent de rupere imediat superioară valorii calculate, respectiv **12,5 kA** (valoare uzuală de catalog IEC 62271 pentru aparataj de medie tensiune), care asigură atât marja de securitate necesară, cât și compatibilitatea cu o eventuală creștere a puterii de scurtcircuit a rețelei de racordare.

### 3.4. Puterea și curentul de scurtcircuit pe partea de 110 kV

Pe partea de 110 kV, curentul de scurtcircuit nu mai este limitat de transformatorul propriu (a cărui impedanță ar limita, dimpotrivă, un defect produs în amonte, dinspre rețea spre stație), ci de **impedanța rețelei de transport/subtransport din care se alimentează stația**, exprimată prin puterea de scurtcircuit a sistemului energetic național în punctul de racordare, valoare furnizată de operatorul de transport/distribuție prin Avizul Tehnic de Racordare (cap. 11.1) — pentru prezentul calcul, adoptată ca ipoteză de proiectare la **Ssc,SEN ≈ 3.000 MVA**, valoare tipică pentru un nod de 110 kV de importanță medie. Curentul de scurtcircuit rezultat:

**Isc,110 = Ssc,SEN / (√3 × Un) = 3.000.000.000 / (√3 × 110.000) ≈ 15.700 A = 15,7 kA**

Aparatajul de pe partea de 110 kV a stației (celule de linie, celula transformatorului, întreruptoare, separatoare, transformatoare de măsură) se alege, similar raționamentului de la cap. 3.3, la treapta standardizată imediat superioară valorii calculate, respectiv **≥ 25 kA / 1 s** (valoare uzuală de catalog pentru aparataj de 110 kV, cu durata normalizată de 1 secundă a curentului de scurtcircuit termic — timpul convențional pentru care echipamentul trebuie să reziste termic la curentul de scurtcircuit maxim, până la acțiunea protecțiilor și deconectarea defectului).

### 3.5. Alegerea aparatajului la valori standardizate — principiul general

Raționamentul repetat la capitolele 3.2, 3.3 și 3.4 — calculul valorii teoretice exacte, urmat de alegerea treptei standardizate imediat superioare din gama de catalog a producătorilor — este **principiul general de proiectare a aparatajului electric de înaltă și medie tensiune**, aplicat consecvent la fiecare echipament al schemei (întreruptoare, separatoare, transformatoare de măsură, bare — cap. 4). Motivele acestei practici sunt triple: (a) gamele de fabricație ale aparatajului sunt, ele însele, standardizate (IEC 62271) la trepte discrete, nu la valori continue; (b) marja rezultată acoperă incertitudinile inerente ale calculului (variații ale puterii reale de scurtcircuit a rețelei față de valoarea din ATR, la momentul proiectării); (c) marja permite o eventuală evoluție ulterioară a instalației (creșterea puterii transformatorului, întărirea rețelei de racordare) fără înlocuirea aparatajului primar, a cărui durată de viață (30-40 de ani) depășește, de regulă, ciclul de retehnologizare al transformatorului.

---

## 4. Dimensionarea barelor colectoare

Barele colectoare — atât cele de 110 kV, cât și cele de 20 kV — sunt supuse, în regim de defect (scurtcircuit), unor solicitări de natură complet diferită față de regimul normal de funcționare: **solicitare termică** (încălzirea bruscă a conductorului de către curentul de scurtcircuit, de zeci de ori mai mare decât curentul nominal, pe durata scurtă până la acționarea protecțiilor) și **solicitare electrodinamică** (forța mecanică de respingere/atracție dintre conductoarele paralele parcurse de curent de scurtcircuit, proporțională cu pătratul curentului). Ambele verificări sunt obligatorii, conform PE 103/SR EN 60865, și condiționează secțiunea minimă a barei și modul ei de susținere pe izolatori.

### 4.1. Verificarea termică

La trecerea curentului de scurtcircuit prin conductor, pe durata scurtă (tk, tipic 1 secundă, timp de eliminare a defectului de către protecții) până la deconectare, energia disipată prin efect Joule încălzește conductorul practic adiabatic (fără timp pentru evacuarea semnificativă a căldurii prin convecție/radiație în intervalul considerat). Condiția ca această încălzire să nu depășească temperatura maximă admisibilă a materialului barei (peste care se degradează proprietățile mecanice sau izolația de contact) se exprimă prin relația:

**S ≥ Ith · √tk / k**

unde **Ith** este curentul termic echivalent de scurtcircuit (aproximat, pentru verificarea simplificată, cu valoarea curentului de scurtcircuit calculat, Isc), **tk** este durata convențională a curentului de scurtcircuit (1 s), iar **k** este o constantă de material care încorporează căldura specifică, densitatea și rezistivitatea electrică a conductorului, precum și diferența dintre temperatura inițială (regim normal) și temperatura finală admisă (limita materialului) — pentru cupru, la o încălzire admisă de la temperatura de regim până la aproximativ 200°C, valoarea uzuală adoptată în normativele românești este **k ≈ 143** (A·s^0,5/mm²).

Pentru instalația de față, la Isc = 12,5 kA (valoarea standardizată aleasă pentru aparatajul de 20 kV, cap. 3.3) și tk = 1 s:

**S_min = 12.500 × √1 / 143 ≈ 87 mm²**

Această valoare minimă rezultată strict din verificarea termică (87 mm²) este, însă, în mod tipic, net inferioară secțiunii necesare pentru transportul curentului nominal în regim continuu (verificare separată, la încălzirea de durată admisă de material, guvernată de curentul nominal și de condițiile de răcire, nu de scurtcircuit) și inferioară secțiunilor de catalog uzuale ale barelor rigide de medie tensiune — motiv pentru care secțiunea efectiv **aleasă este ≥ 240 mm²**, dimensionată de fapt de criteriul curentului nominal (In,20 = 1.155 A, respectiv 1.250 A standardizat) și de rigiditatea mecanică necesară susținerii pe izolatoare (cap. 4.2), verificarea termică la scurtcircuit fiind, în acest caz, larg satisfăcută de secțiunea rezultată din celelalte criterii.

### 4.2. Verificarea electrodinamică

Două conductoare paralele, parcurse de curenți de sens contrar sau de același sens, se resping, respectiv se atrag, cu o forță proporțională cu produsul curenților și invers proporțională cu distanța dintre ele — fenomen cunoscut ca **forța Laplace (electrodinamică)**, exprimat pentru cazul curentului de scurtcircuit trifazat prin relația:

**F = (μ₀ / 2π) · (i_vârf² / a) · l**

unde μ₀ este permeabilitatea magnetică a vidului (constantă universală), **a** este distanța dintre axele conductoarelor, **l** este lungimea deschiderii dintre doi izolatori de susținere consecutivi, iar **i_vârf** este valoarea de vârf a curentului de scurtcircuit, superioară valorii eficace calculate la capitolul 3, din cauza componentei aperiodice (de curent continuu) care apare în primele momente ale unui scurtcircuit — componentă cuantificată prin **factorul de vârf κ (kappa)**, de valoare uzuală **κ ≈ 1,8** pentru rețelele electrice de înaltă/medie tensiune:

**i_vârf = κ · √2 · Isc**

Forța electrodinamică astfel calculată, maximă în primul semiperiod de la producerea scurtcircuitului (moment în care componenta aperiodică se suprapune integral peste componenta alternativă), solicită atât conductorul barei (la încovoiere, între reazemele succesive constituite de izolatoarele de susținere), cât și izolatoarele-suport propriu-zise (solicitate la încovoiere/forfecare la baza porțelanului sau a compozitului) — verificarea acestei forțe, comparativ cu rezistența mecanică admisă a conductorului și a izolatorului ales, condiționează atât secțiunea și forma profilului barei (tuburi și profile speciale, cu moment de inerție superior unei bare pline la aceeași secțiune, pentru barele solicitate la deschideri mari), cât și distanța maximă admisă între reazemele de susținere.

### 4.3. Coordonarea cu structura de rezistență și cu acțiunea seismică

Forța electrodinamică calculată la cap. 4.2 se transmite, prin izolatoarele-suport, la elementele de structură care le susțin — portaluri metalice sau console de beton pe partea de 110 kV, respectiv structura celulelor metalice pe partea de 20 kV — a căror dimensionare la solicitările combinate (forța electrodinamică de scurtcircuit, suprapusă peste încărcările din vânt, zăpadă și, în zonele seismice, acțiunea seismică de proiectare conform P100-1) se tratează în memoriul de structură al prezentei documentații, prin transmiterea, ca date de intrare din prezentul memoriu, a forțelor de scurtcircuit calculate la cap. 4.2 și a maselor/gabaritelor echipamentelor primare (transformator, întreruptoare, separatoare) rezultate din fișele tehnice ale producătorilor selectați la faza de proiectare tehnică.

---

## 5. Coordonarea izolației

### 5.1. Conceptul de nivel de izolație la impuls de trăsnet (BIL)

Orice echipament electric dintr-o stație — izolația transformatorului, a întreruptoarelor, a transformatoarelor de măsură, distanțele în aer dintre faze și între fază și masă — trebuie să reziste, fără străpungere sau conturnare, nu doar la tensiunea de regim (110 kV, respectiv 20 kV), ci și la **supratensiunile tranzitorii** care pot apărea pe rețea, dintre care cele mai severe, ca amplitudine și front de creștere, sunt cele de origine atmosferică (impactul unui trăsnet pe linie sau în vecinătatea ei). Nivelul de izolație al fiecărui echipament este exprimat, convențional, prin **BIL (Basic Impulse Level — nivelul de izolație la impuls de trăsnet)**: tensiunea de vârf a unui impuls normalizat (front de undă de 1,2 μs, coadă de 50 μs, formă standardizată prin IEC 60071) pe care echipamentul trebuie să o suporte, fără descărcare disruptivă, într-o încercare de tip realizată de producător. BIL nu este, așadar, o simplă marjă de siguranță arbitrară față de tensiunea de regim, ci un **parametru de catalog verificat prin încercare**, la care se raportează întreaga coordonare a izolației instalației.

### 5.2. Alegerea distanțelor în aer din valoarea BIL

Pentru fiecare nivel de tensiune al stației, standardele de coordonare a izolației (SR EN 60071, NTE 001/03) asociază, tensiunii celei mai ridicate pentru echipament Um, o valoare normalizată de BIL și, acesteia, o distanță minimă în aer între conductorul sub tensiune și masă/altă fază, distanță care garantează, statistic, neconturnarea la tensiunea de încercare:

| Nivel | Um (tensiunea cea mai ridicată pt. echipament) | BIL | Distanța minimă în aer |
|---|---|---|---|
| 110 kV | 123 kV | **550 kV** | ≈ 1,10 m |
| 20 kV | 24 kV | **125 kV** | ≈ 0,22 m |

Aceste distanțe minime, verificate și majorate, la proiectarea de detaliu, cu marje constructive de siguranță (montaj, toleranțe de execuție, efectul altitudinii și al poluării atmosferice asupra rigidității dielectrice a aerului, conform coeficienților de corecție din SR EN 60071-2), **dimensionează practic gabaritele portalurilor de 110 kV, distanțele dintre faze pe bara colectoare și distanțele minime de securitate față de împrejmuire și față de căile de acces** — toate elemente de construcții-montaj tratate în memoriul de arhitectură și de structură, dar ale căror valori numerice provin, integral, din prezentul calcul de coordonare a izolației.

### 5.3. Rolul descărcătoarelor MOSA — marja de coordonare

Coordonarea izolației nu se rezumă la a alege echipamente cu un BIL suficient de mare pentru tensiunile de regim — la nivelul de tensiune de 110 kV, o izolație care ar rezista, fără nicio protecție suplimentară, la amplitudinea maximă teoretică a unei supratensiuni atmosferice ar fi excesiv de costisitoare și, practic, nerealizabilă economic. Soluția adoptată, universal, în proiectarea stațiilor electrice este **limitarea activă a supratensiunii, prin descărcătoare MOSA (cap. 2.2), montate cât mai aproape posibil de echipamentul cel mai valoros și mai sensibil al instalației — transformatorul de putere** — astfel încât tensiunea reziduală (Ures) lăsată de descărcător să nu depășească, cu o marjă de securitate suficientă, BIL-ul echipamentului protejat.

Această marjă, numită **marja de coordonare Kp (sau factor de protecție)**, se definește ca raportul dintre BIL-ul echipamentului și tensiunea reziduală a descărcătorului, Kp = BIL / Ures, și se impune, prin normativ, la o valoare minimă de **Kp ≥ 1,15…1,25**, în funcție de tipul echipamentului protejat și de distanța dintre descărcător și echipament (distanța introduce o întârziere de propagare a undei care poate suprapune, la echipamentul protejat, o tensiune ușor superioară celei reziduale măsurate chiar la bornele descărcătorului — efect de care se ține cont explicit la echipamentele situate la distanță electrică mai mare de descărcător). Verificarea acestei marje, pentru fiecare echipament protejat de descărcătoarele instalate în celulele de linie și de transformator (cap. 2.2, 2.4), este, împreună cu alegerea BIL-ului de bază (cap. 5.2), obiectul central al studiului de coordonare a izolației elaborat la faza de proiectare tehnică, pe baza caracteristicilor de catalog ale descărcătoarelor efectiv selectate.

---

## 6. Protecțiile electrice

### 6.1. Principii generale — arhitectura redundantă

Sistemul de protecții al stației este ansamblul de relee numerice care supraveghează, permanent, mărimile electrice (curenți, tensiuni) culese prin transformatoarele de măsură (TC/TT, cap. 2.2), comparându-le cu praguri prestabilite și comandând, la depășirea acestor praguri, declanșarea instantanee sau temporizată a întreruptoarelor relevante, astfel încât orice defect (scurtcircuit, punere la pământ, funcționare anormală) să fie eliminat în timpul cel mai scurt compatibil cu selectivitatea instalației (eliminarea *doar* a porțiunii defecte, fără a întrerupe și porțiuni sănătoase ale rețelei). Principiul de proiectare aplicat consecvent, pentru echipamentul cel mai valoros al stației — transformatorul de putere —, este **redundanța protecție principală/protecție de rezervă**: cel puțin două lanțuri de protecție independente (relee, transformatoare de măsură cu înfășurări separate, uneori chiar surse de alimentare cc separate, cap. 6.8) supraveghează simultan același echipament, astfel încât defectarea sau indisponibilitatea unui lanț (mentenanță, avarie internă a releului) să nu lase transformatorul neprotejat.

Tabelul următor sintetizează funcțiile de protecție implementate în stație, codificate conform standardului internațional de numerotare a funcțiilor de protecție (ANSI/IEC 60255), fiecare cu rolul ei funcțional:

| Cod | Denumire | Rol |
|---|---|---|
| **87T** | Protecție diferențială de transformator | protecție principală, instantanee, pentru defecte interne |
| 50/51 | Protecție maximală de curent (instantanee/temporizată) | protecție de rezervă pentru scurtcircuite, protecție de linie pe plecări |
| 50N/51N | Protecție maximală de curent homopolară | detecția defectelor cu punere la pământ |
| 64 | Protecție de punere la pământ a cuvei/masei transformatorului | defecte între înfășurare și cuvă |
| 21 | Protecție de distanță | protecția liniilor de 110 kV |
| 27/59 | Protecție de minimă/maximă tensiune | funcționare anormală a tensiunii |
| 81 U/O | Protecție de minimă/maximă frecvență | delestaj/decuplare la abateri de frecvență ale SEN |
| 63 (Buchholz) | Protecție de gaze/presiune | defecte incipiente sau majore în cuva transformatorului |
| 26/49 | Protecție de temperatură | supraîncălzirea uleiului/înfășurărilor |

### 6.2. Protecția diferențială de transformator (87T)

Protecția diferențială este, pentru transformatorul de putere, **protecția principală** — cea care acționează prima și instantaneu la orice defect intern, fără nicio temporizare intenționată (spre deosebire de protecțiile de rezervă, cap. 6.3, care se temporizează pentru a permite selectivitatea). Principiul ei de funcționare este **compararea permanentă a curentului care intră în zona protejată (prin TC-ul de pe partea de 110 kV a transformatorului, cap. 2.4) cu curentul care iese din aceeași zonă (prin TC-ul de pe partea de 20 kV, cap. 2.6)**: în regim normal de funcționare, sau chiar în cazul unui defect extern zonei protejate (de exemplu pe o linie de 20 kV alimentată din stație), cei doi curenți, raportați corect la raportul de transformare al transformatorului și la defazajul introdus de conexiunea YNd11 (compensat automat de releu, prin algoritmi de calcul vectorial care țin cont explicit de grupa de conexiuni, cap. 2.5), sunt practic egali, iar curentul diferență rezultat este nul (sau redus, la valoarea curentului de magnetizare la punerea sub tensiune, compensată printr-un prag de blocare pe armonica a doua, caracteristică regimurilor de magnetizare, nu de defect). În cazul unui defect *intern* zonei protejate — scurtcircuit între spire, defect la izolația dintre înfășurări, defect la bornele transformatorului între cele două TC-uri — curentul care iese din zonă nu mai este egal cu cel care intră (o parte din curent "dispare" prin calea de defect, ocolind circuitul normal), iar diferența rezultată, depășind pragul de reglaj, comandă **declanșarea instantanee și simultană a întreruptoarelor de pe ambele părți ale transformatorului** — singura acțiune corectă, dat fiind că defectul este localizat chiar în interiorul zonei delimitate de cele două seturi de TC-uri.

### 6.3. Protecțiile maximale de curent (50/51)

Protecțiile 50 (instantanee) și 51 (temporizată, cu caracteristică de timp invers sau independentă, în funcție de reglaj) constituie **protecția de rezervă** pentru scurtcircuitele care nu sunt sesizate ca defecte interne de protecția diferențială — fie pentru că defectul este extern zonei protejate de 87T (pe o plecare de 20 kV, de exemplu), fie ca rezervă în cazul (statistic rar, dar acoperit prin principiul redundanței, cap. 6.1) unei indisponibilități a protecției diferențiale. Reglajul acestor protecții, atât ca prag de curent cât și ca temporizare, se stabilește printr-un **studiu de selectivitate**, care coordonează în timp toate treptele de protecție ale rețelei (de la plecările de 20 kV, prin protecția de rezervă a transformatorului, până la protecția de linie de 110 kV), astfel încât, la un defect oriunde pe rețea, să declanșeze *întâi* echipamentul cel mai apropiat de defect, iar treptele din amonte să acționeze doar dacă cea mai apropiată treaptă nu a eliminat defectul în timpul așteptat (protecție de rezervă în adevăratul sens al cuvântului, nu doar ca denumire).

### 6.4. Protecțiile homopolare (50N/51N/64)

Defectele cu punere la pământ (cel mai frecvent tip de defect pe rețelele electrice, statistic majoritar față de scurtcircuitele trifazate franc) generează, spre deosebire de un scurtcircuit echilibrat între faze, o **componentă de curent de secvență homopolară** — nenulă doar în prezența unui defect la pământ sau a unui dezechilibru sever, practic nulă în regim normal de funcționare echilibrat. Protecțiile 50N/51N, alimentate fie de un TC dedicat montat pe conexiunea de punere la pământ a neutrului transformatorului, fie de suma vectorială (filtrul homopolar) a celor trei TC-uri de fază, detectează selectiv acest tip de defect, cu o sensibilitate net superioară protecțiilor de fază 50/51 (care ar trebui reglate la praguri mult mai mari pentru a nu declanșa intempestiv la dezechilibrele normale de sarcină). Protecția **64** este dedicată specific defectelor între înfășurarea transformatorului și cuva/masa lui metalică — un tip particular de defect intern, cu cale de curent prin masa echipamentului, care necesită un circuit de măsură dedicat, separat de restul protecției de fază.

### 6.5. Protecția de distanță (21)

Protecția de distanță, aplicată liniilor electrice de 110 kV racordate la celulele de linie (cap. 2.2), calculează, din raportul instantaneu al tensiunii și curentului măsurate la bornele stației, **impedanța aparentă văzută dinspre stație către punctul de defect** — impedanță proporțională, pentru o linie omogenă, cu distanța fizică până la defect (de unde numele protecției). Prin compararea acestei impedanțe calculate cu impedanța cunoscută a liniei protejate, protecția determină dacă defectul se află *pe* linia proprie (caz în care declanșează, într-o zonă de timp dependentă de cât de aproape/departe este defectul de stație — zona 1, instantanee, pentru defecte apropiate; zonele 2 și 3, temporizate, pentru defecte mai îndepărtate, ca rezervă pentru liniile/stațiile din aval) sau dincolo de ea (caz în care nu acționează, lăsând eliminarea defectului în seama protecțiilor proprii ale liniei/stației respective) — principiu care oferă, spre deosebire de protecțiile maximale de curent, o selectivitate independentă de variațiile puterii de scurtcircuit a rețelei, motiv pentru care este protecția standard pentru liniile de transport/subtransport, coordonată cu teleprotecția transmisă prin echipamentul CLP descris la capitolul 2.2.

### 6.6. Protecțiile de tensiune și de frecvență (27/59/81)

Protecțiile **27 (minimă tensiune)** și **59 (maximă tensiune)** supraveghează abaterile tensiunii de la banda normală de funcționare — cauzate, tipic, de defecte la reglajul OLTC al transformatorului (cap. 2.5), de pierderea unei surse de alimentare din amonte sau de regimuri anormale ale rețelei — comandând, după caz, alarmare, blocarea automatismelor de reanclanșare sau decuplare, dacă abaterea persistă peste durata de reglaj. Protecția **81 (minimă/maximă frecvență, U/O — under/over)** este o protecție de sistem, nu locală: frecvența rețelei electrice fiind un indicator global al echilibrului instantaneu dintre producție și consum la nivelul întregului SEN, o abatere semnificativă (frecvență în scădere, semnalând un deficit de producție la nivel de sistem) declanșează, la stațiile echipate cu funcție de delestaj, decuplarea automată, în trepte succesive, a unor plecări de sarcină, ca măsură de protecție a stabilității sistemului energetic național, coordonată la nivel de dispecer (cap. 9.3) prin planurile naționale de delestaj.

### 6.7. Protecțiile proprii ale transformatorului: Buchholz și protecțiile termice

Alături de protecția diferențială electrică (cap. 6.2), transformatorul dispune de protecții specifice, de natură fizico-chimică sau termică, descrise deja funcțional la capitolul 2.5 (releul Buchholz — cod 63) și completate de **protecțiile de temperatură (26/49)** — termometre cu contacte (imagine termică a înfășurării, respectiv temperatura uleiului), care semnalizează în trepte (alarmă, apoi declanșare) la depășirea temperaturilor admise, protejând izolația transformatorului de degradarea accelerată prin îmbătrânire termică (o creștere de aproximativ 6-8°C peste temperatura de referință înjumătățește, empiric, durata de viață a izolației celulozice a transformatorului — motiv pentru care supravegherea termică permanentă, coroborată cu ventilația forțată/răcirea cu radiatoare a transformatorului, este o funcție de protecție distinctă, complementară protecțiilor electrice).

### 6.8. Alimentarea protecțiilor din circuitul de curent continuu

Toate protecțiile descrise mai sus — releele numerice, circuitele de comandă ale întreruptoarelor, semnalizările — sunt alimentate **exclusiv din instalația de curent continuu a stației (cap. 8.2)**, niciodată direct din rețeaua de curent alternativ măsurată sau protejată: alegerea nu este întâmplătoare, ci reflectă cerința fundamentală ca **protecțiile să rămână funcționale exact în momentul în care rețeaua de curent alternativ este afectată de defectul pe care trebuie să-l elimine** (o cădere de tensiune produsă de un scurtcircuit, sau chiar dispariția completă a tensiunii alternative, nu trebuie să lase protecțiile fără alimentare, chiar în clipa în care este nevoie de ele) — motiv pentru care sursa de curent continuu, susținută de bateria de acumulatori (cap. 8.2), este proiectată să asigure alimentarea protecțiilor și a bobinelor de declanșare ale întreruptoarelor complet independent de starea instantanee a rețelei de curent alternativ.

---

## 7. Priza de pământ (SR EN 50522) — capitolul central de securitate

### 7.1. De ce o stație electrică ridică potențialul solului — pericolul pentru persoane

Dintre toate instalațiile tratate în prezentul memoriu, priza de pământ este singura a cărei funcție nu este de a face instalația *să funcționeze*, ci de a face instalația **sigură pentru orice persoană aflată în incintă sau în vecinătatea ei, în momentul cel mai defavorabil posibil — cel al unui defect electric cu punere la pământ**. Mecanismul fizic al pericolului este următorul: în funcționare normală, toate masele metalice ale echipamentelor (cuva transformatorului, carcasele celulelor, structurile metalice ale portalurilor, împrejmuirea metalică) sunt legate electric între ele și la rețeaua de electrozi îngropați în sol (grila de pământare, cap. 7.2), ansamblu care, în absența unui defect, se află la un potențial practic egal cu cel al solului îndepărtat (potențial de referință, convențional zero). În momentul unui defect cu punere la pământ (de exemplu, o străpungere a izolației unei faze către cuva transformatorului, sau o punere la pământ pe una din liniile racordate la stație), **un curent de defect de ordinul kiloamperilor se scurge prin priza de pământ a stației către solul înconjurător**, iar rezistența electrică finită a acestei prize (cap. 7.2) face ca întreaga rețea de pământare — și, implicit, toate masele metalice legate la ea — să se ridice, pe durata defectului, la un potențial semnificativ superior potențialului solului îndepărtat, cu o valoare egală cu produsul dintre curentul de defect și rezistența de dispersie a prizei. Acest potențial ridicat nu este uniform distribuit în teren, ci scade progresiv, de la valoarea maximă în vecinătatea imediată a electrozilor, până la zero la distanță mare — gradient de potențial care este, exact, sursa pericolului pentru orice persoană prezentă: o persoană care atinge, în acest interval, o structură metalică legată la priza ridicată la potențial, stând cu picioarele pe un sol aflat la un potențial diferit (mai apropiat de zero), este supusă unei diferențe de potențial — **tensiunea de atingere** (cap. 7.4) — aplicată direct organismului; o persoană care pășește, cu cele două picioare distanțate la un pas normal, pe zone de teren cu potențiale diferite (gradientul descris mai sus) este supusă unei diferențe de potențial între picioare — **tensiunea de pas** (cap. 7.5), aplicată pe traseul picior-picior prin corp. Standardul de referință care reglementează integral proiectarea, calculul și verificarea instalației de legare la pământ a stațiilor electrice cu tensiune peste 1 kV este **SR EN 50522**.

### 7.2. Rezistența de dispersie a prizei de pământ — formula Sverak/Laurent

Priza de pământ a unei stații electrice de acest tip este, constructiv, o **rețea în grilă** de conductoare orizontale (platbandă de cupru sau de oțel zincat, îngropate la o adâncime tipică de 0,7-0,8 m sub nivelul solului, dispuse în ochiuri de 3-7 m, formând un caroiaj sub întreaga suprafață a incintei), la care se adaugă, la perimetru și în punctele de concentrare a curentului de defect, **electrozi verticali** (țepușe de pământare, de 1,5-3 m lungime, care ating straturi de sol mai umede/mai conductive decât suprafața), întregul ansamblu fiind legat, prin conductoare de coborâre, la **toate masele metalice ale instalației** — cuva transformatorului, carcasele celulelor de 110 și 20 kV, structurile portalurilor, ecranele cablurilor, neutrele transformatoarelor, paratrăsnetele — realizând o **priză de pământ unică, comună** pentru întreaga stație (soluție preferată, prin normativ, față de prize separate pe categorii de echipament, tocmai pentru a evita diferențe de potențial între diverse zone ale incintei în caz de defect).

Rezistența de dispersie a acestei rețele — mărimea care determină, direct, amplitudinea ridicării de potențial descrise la 7.1 — se calculează, pentru o grilă complexă combinată cu electrozi verticali, printr-o formulă empirică validată experimental, cunoscută în literatura de specialitate ca **formula Sverak (sau, în variante apropiate, Laurent)**:

**R_E = ρ · [ 1/L_T + 1/√(20·A) · ( 1 + 1/(1 + h·√(20/A)) ) ]**

unde fiecare termen are o semnificație fizică precisă: **ρ** este rezistivitatea electrică a solului (Ω·m), mărime determinată prin măsurători geoelectrice de teren la faza de proiectare (variabilă semnificativ cu tipul de sol, umiditatea și temperatura — parametrul cu cea mai mare incertitudine și cu cel mai mare impact asupra rezultatului final); **L_T** este lungimea totală a conductorului îngropat (suma lungimilor grilei orizontale și a electrozilor verticali); **A** este suprafața acoperită de grila de pământare (aria incintei stației); **h** este adâncimea de îngropare a grilei orizontale. Structura formulei reflectă intuitiv fizica fenomenului: primul termen (1/L_T) reprezintă contribuția "densității" conductorului îngropat — mai mult conductor, dispersie mai bună; al doilea termen, dependent de suprafață și de adâncime, reprezintă efectul de "capacitate" geometrică a grilei, cu o corecție care ține cont de faptul că o grilă mai adâncă interacționează cu un volum de sol mai mare, deci mai puțin rezistiv la ansamblu.

Pentru o stație de acest tip, cu o suprafață tipică de incintă și cu o rezistivitate de sol moderată, rezultatul calculului conduce la o rezistență de dispersie **R_E < 1 Ω** — valoare-țintă uzuală, impusă prin normativ (SR EN 50522) pentru stațiile electrice de înaltă tensiune cu neutru legat efectiv la pământ (regim al rețelei de 110 kV, cap. 1.2), tocmai pentru a limita, la un curent de defect dat (cap. 7.3), ridicarea de potențial (U_E = R_E × I_E) la o valoare compatibilă cu tensiunile de atingere și de pas admisibile (cap. 7.6).

### 7.3. Curentul de dimensionare al prizei

Curentul care trebuie luat în calcul pentru dimensionarea prizei nu este curentul total de defect monofazat calculat pe rețea (Ik1, curent de scurtcircuit monofazat, calculat similar principiului de la capitolul 3, dar pentru configurația specifică a unui defect cu punere la pământ), ci doar **partea din acest curent care se închide efectiv prin priza de pământ propriu-zisă a stației** — restul curentului de defect întorcându-se la sursă pe alte căi conductoare care ocolesc solul, în principal prin **ecranele metalice ale cablurilor** de medie/înaltă tensiune legate la stație și prin firele de gardă/paratrăsnet ale liniilor aeriene, ambele legate galvanic, la celălalt capăt, la alte prize de pământ ale rețelei, oferind astfel o cale de întoarcere paralelă cu solul, care "ocolește" priza locală. Acest efect de reducere se exprimă printr-un **factor de reducere r** (raportul dintre curentul care circulă efectiv prin sol/priza locală și curentul total de defect):

**I_E = r · Ik1 · (1 − r_ecran)**

unde r_ecran reprezintă fracțiunea din curent preluată de ecranele/firele de gardă menționate — pentru stația de față, adoptând ca ipoteză de calcul un curent de defect de dimensionare **I_E ≈ 5 kA**, valoare rezultată din studiul de calcul al curentului de defect monofazat al rețelei de 110 kV, redus prin factorul r conform configurației reale a cablurilor/liniilor racordate, coroborat cu un **timp de eliminare a defectului tf ≈ 0,5 s** (timpul de acționare al protecției homopolare 50N/51N/64, cap. 6.4, plus timpul propriu de deconectare al întreruptorului) — ambele valori (I_E și tf) constituind ipotezele de bază ale întregului calcul de verificare a securității descris la capitolele 7.4-7.6.

### 7.4. Tensiunea de atingere

Tensiunea de atingere este diferența de potențial la care este supusă o persoană care atinge, cu o mână, o structură metalică legată la priza de pământ (ridicată la potențialul U_E = R_E × I_E, cap. 7.2-7.3), stând, în același timp, cu picioarele pe solul din imediata vecinătate a structurii — sol aflat, din cauza gradientului de potențial descris la 7.1, la un potențial ceva mai mic decât cel al structurii metalice înseși, dar nu nul. Formula de calcul, conform SR EN 50522, este:

**U_atingere = ρ · Km · Ki · I_E / L_M**

unde **Km** este un factor geometric de suprafață (care depinde de configurația grilei — dimensiunea ochiurilor, numărul de conductoare paralele, adâncime — o grilă mai densă reduce, prin construcție, gradientul de potențial la suprafață și, deci, factorul Km), **Ki** este un factor de neuniformitate (corectează diferența dintre o grilă ideal uniformă și configurația reală, cu concentrări de curent mai mari la colțuri și la perimetru), iar **L_M** este lungimea efectivă a conductorului de pământare care contribuie la disiparea curentului în zona respectivă (combinație a lungimii grilei orizontale și a electrozilor verticali, ponderată după contribuția lor reală la câmpul de potențial de suprafață).

### 7.5. Tensiunea de pas

Tensiunea de pas este diferența de potențial dintre cele două puncte de contact ale picioarelor unei persoane care pășește pe sol, la o distanță convențională de un pas (tipic 1 m), traversând, pe această distanță, un gradient de potențial creat de curentul care se dispersează prin sol de la electrozii prizei. Formula, similară structural celei de la 7.4, dar cu factori proprii calibrați empiric pentru configurația de suprafață:

**U_pas = ρ · Ks · Ki · I_E / L_S**

unde **Ks** este factorul geometric de pas (calibrat diferit de Km, întrucât gradientul relevant pentru pas se măsoară pe orizontală, la suprafața solului, între două puncte distanțate cu un pas, nu între suprafață și o structură verticală), iar **L_S** este lungimea efectivă echivalentă a conductorului de dispersie pentru acest mod de calcul.

Este important de subliniat de ce tensiunea de pas, deși aparent mai puțin intuitivă decât tensiunea de atingere, **afectează animalele — mai ales cele cu patru picioare, precum bovinele sau caii — mai sever decât oamenii**, la aceeași valoare de gradient de potențial din teren: distanța dintre picioarele din față și picioarele din spate ale unui patruped este semnificativ mai mare decât distanța dintre cele două picioare ale unui om (aproximativ un pas), astfel încât aceeași rată de variație a potențialului pe sol se traduce, pentru animal, într-o diferență de potențial (deci o tensiune de pas) mult mai mare decât pentru o persoană — fenomen bine documentat în practica de exploatare a rețelelor electrice (cazuri de electrocutare a animalelor de fermă în vecinătatea unor prize de pământ defectuoase sau în apropierea liniilor electrice căzute la sol, la distanțe la care o persoană nu ar fi fost afectată), motiv pentru care standardele impun, în zonele agricole/pășuni situate în vecinătatea instalațiilor electrice, verificări suplimentare de tensiune de pas, mai severe decât cele standard.

### 7.6. Tabelul tensiunilor admisibile funcție de timpul de eliminare a defectului — fundamentul fiziologic (IEC 60479)

Verificarea de securitate finală a prizei de pământ constă în compararea tensiunii de atingere calculate (cap. 7.4) — cea mai restrictivă dintre cele două criterii, în majoritatea configurațiilor practice — cu o **valoare admisibilă tabelată, U_Tp,adm(tf)**, funcție explicită de **timpul de eliminare a defectului tf** (cap. 7.3), nu o valoare fixă unică:

**U_atingere ≤ U_Tp,adm(tf)**

| tf (timp de eliminare a defectului) | U_Tp,adm (tensiune admisă corpului uman) |
|---|---|
| 0,1 s | ≈ 785 V |
| 0,2 s | ≈ 555 V |
| 0,5 s | ≈ 220 V |
| ≥ 1,0 s | ≈ 117 V |

Această dependență — praguri de tensiune admisibilă *mai ridicate* pentru timpi de eliminare a defectului *mai scurți* — nu este o convenție arbitrară, ci reflectă direct fiziologia efectelor curentului electric asupra corpului uman, documentată de standardul **IEC 60479 (Efectele curentului asupra omului și animalelor domestice)**: pericolul letal al unui curent electric care traversează corpul uman (prin cutia toracică, pe traseul mână-picior sau picior-picior) este, în esență, riscul de **fibrilație ventriculară** — o dereglare a ritmului cardiac normal, indusă de curentul electric care interferează cu impulsurile electrice proprii ale inimii, în special dacă expunerea coincide cu o fază vulnerabilă a ciclului cardiac (vârful undei T pe electrocardiogramă). Curbele fiziologice stabilite experimental (pe animale și, indirect, prin statistici de accidentare umană, sintetizate de IEC 60479) arată că **pragul de curent la care apare riscul de fibrilație crește semnificativ pe măsură ce durata de expunere scade** — pentru expuneri foarte scurte (sub 0,1-0,2 secunde, mai scurte decât un ciclu cardiac complet), organismul poate tolera curenți sensibil mai mari fără a intra în fibrilație, comparativ cu o expunere prelungită (peste 1 secundă), unde chiar curenți mult mai mici, dar susținuți, devin periculoși. Această relație curent-timp-fibrilație este motivul fiziologic exact pentru care standardul SR EN 50522 admite tensiuni de atingere mai mari atunci când protecțiile electrice (cap. 6) elimină rapid defectul — practic, **o protecție rapidă (87T instantanee, sau protecțiile maximale de curent reglate la timpi scurți) este ea însăși o măsură de securitate a persoanelor**, nu doar o măsură de protecție a echipamentului, argument care leagă explicit capitolul 6 (protecții) de capitolul 7 (priza de pământ) ca pe două fațete ale aceleiași strategii de securitate.

### 7.7. Măsuri de reducere a tensiunilor, în cazul depășirii pragului admisibil

Dacă, la verificarea din cap. 7.6, tensiunea de atingere calculată depășește pragul admisibil corespunzător timpului de eliminare a defectului, proiectul de detaliu al prizei de pământ recurge, singular sau combinat, la următoarele măsuri de reducere, fiecare acționând asupra unui termen diferit al formulelor de la 7.2-7.5:

- **Stratul de piatră spartă/pietriș la suprafața platformei** (grosime tipică 10-15 cm), cu rezistivitate electrică foarte ridicată comparativ cu solul natural — soluție care nu reduce tensiunea de atingere/pas propriu-zisă (câmpul de potențial din sol rămâne neschimbat), ci **ridică pragul admisibil al corpului uman**, prin introducerea unei rezistențe de contact suplimentare, foarte mare, în serie cu corpul persoanei, între suprafața piciorului și priza de pământ propriu-zisă — efect recunoscut explicit de SR EN 50522 printr-un factor de corecție al tensiunilor admisibile, funcție de rezistivitatea și grosimea stratului de piatră spartă;
- **Densificarea grilei de pământare** (ochiuri mai mici, mai multe conductoare paralele) — reduce direct factorii geometrici Km și Ks din formulele 7.4-7.5, prin uniformizarea gradientului de potențial la suprafața solului;
- **Electrozi verticali suplimentari**, în special la perimetrul incintei și în punctele de concentrare a curentului (lângă transformator, lângă structurile cu risc de defect) — reduc rezistența de dispersie globală R_E (cap. 7.2) și, local, gradientul de potențial în zonele critice;
- **Tratarea chimică/electrolitică a solului** în vecinătatea electrozilor (utilizată în special pe soluri cu rezistivitate ridicată — stâncoase, nisipoase, uscate), care reduce rezistivitatea locală ρ a solului, cu efect direct de reducere proporțională a tuturor mărimilor calculate la 7.2-7.5.

### 7.8. Coordonarea prizei de pământ cu paratrăsnetele și cu alte prize ale instalației

Toate elementele de protecție împotriva supratensiunilor atmosferice — atât descărcătoarele MOSA (cap. 2.2, 5.3), cât și paratrăsnetele/firele de gardă montate pe portalurile de 110 kV, destinate captării directe a unei eventuale descărcări atmosferice căzute pe incintă — trebuie legate **la aceeași priză de pământ unică a stației**, niciodată la prize separate: o priză de paratrăsnet separată, cu rezistență proprie și situată la o distanță electrică semnificativă de priza principală, ar putea, la o lovitură de trăsnet, să se ridice la un potențial foarte diferit de restul instalației, generând, tocmai între cele două prize teoretic "separate", o diferență de potențial periculoasă, exact tipul de risc pe care întreaga filozofie a capitolului 7 urmărește să îl elimine. Principiul unei prize comune, cu echipotențializarea tuturor maselor metalice ale instalației, este, alături de dimensionarea corectă a rezistenței de dispersie și verificarea tensiunilor de atingere/pas, a treia condiție obligatorie a unei instalații de legare la pământ conforme SR EN 50522.

---

## 8. Serviciile proprii de curent alternativ și curent continuu

### 8.1. Serviciile proprii de curent alternativ (0,4 kV)

Alimentarea consumatorilor tehnologici proprii ai stației — iluminat interior și exterior (cap. 10.5), prize de forță pentru scule și pentru mentenanță, ventilația și încălzirea anticondens a celulelor de medie tensiune, motoarele mecanismului de reglaj sub sarcină (OLTC, cap. 2.5), redresoarele instalației de curent continuu (cap. 8.2) — se realizează dintr-un **transformator de servicii proprii 20/0,4 kV**, derivat din barele de medie tensiune ale stației (cap. 2.9), de putere tipică între **100 și 250 kVA**, dimensionat pe puterea instalată însumată a tuturor acestor consumatori tehnologici, afectată de factorii de simultaneitate uzuali. Tabloul general de servicii proprii (TGSP) este alimentat, ca regulă de proiectare pentru orice instalație a cărei funcționare continuă este critică, prin **dublă alimentare pe bară secționată, cu anclanșare automată a rezervei (AAR)**: în funcționare normală, cele două jumătăți ale barei TGSP sunt alimentate fiecare de câte o sursă (fie două transformatoare de servicii proprii distincte, fie un transformator principal și o rezervă), separate prin întreruptorul de secționare a barei, deschis; la dispariția uneia dintre surse (defect pe transformatorul de servicii proprii, sau, mai frecvent, pe una din plecările de medie tensiune care îl alimentează), automatismul AAR detectează lipsa de tensiune pe jumătatea de bară afectată și **comandă automat, într-un timp de ordinul secundelor, închiderea întreruptorului de secționare**, restabilind alimentarea întregii bare TGSP dintr-o singură sursă rămasă disponibilă, fără intervenția operatorului — funcție critică, întrucât o pierdere completă a serviciilor proprii de curent alternativ ar afecta, indirect, și încărcarea instalației de curent continuu (redresoarele, cap. 8.2, fiind alimentate tot din acest tablou).

### 8.2. Instalația de curent continuu — bateria de acumulatori

Instalația de curent continuu, la o tensiune nominală tipică de **110 sau 220 V c.c.**, este sursa de alimentare **exclusivă** a tuturor circuitelor a căror funcționare este critică pentru securitatea instalației, indiferent de starea rețelei de curent alternativ: releele de protecție (cap. 6.8), bobinele de declanșare/anclanșare ale întreruptoarelor, circuitele de comandă și de semnalizare, iluminatul de siguranță în situații de avarie totală. Elementul central al acestei instalații este **bateria de acumulatori staționari** (tipic cu plumb acid ventilate sau, pe instalațiile mai vechi/mai solicitante termic, cu nichel-cadmiu), dimensionată să asigure, prin propria capacitate, alimentarea acestor circuite pe o durată de **autonomie de 8-10 ore** în absența completă a alimentării de curent alternativ (scenariul cel mai defavorabil: pierderea rețelei de 110 kV *și* a serviciilor proprii, situație în care redresorul, alimentat tot din curent alternativ, nu mai poate încărca bateria, iar toate protecțiile și comenzile trebuie să rămână, totuși, funcționale până la restabilirea alimentării sau intervenția unei echipe de mentenanță).

Dimensionarea capacității bateriei (exprimată în amper-oră) se realizează printr-un **profil de sarcină**, care însumează, pe intervale succesive de timp ale scenariului de avarie considerat cel mai defavorabil, curentul consumat de fiecare circuit alimentat (curent permanent de veghe al releelor și semnalizărilor, plus curenți de vârf, de scurtă durată, la manevrele de declanșare a întreruptoarelor, semnificativ mai mari decât curentul permanent):

**C_baterie = Σ(Iᵢ · tᵢ) / (k_desc · k_temp)**

unde suma Σ(Iᵢ · tᵢ) reprezintă capacitatea brută necesară, cumulată pe toate intervalele *i* ale profilului de sarcină (fiecare cu propriul curent Iᵢ și durata tᵢ), iar cei doi factori de corecție de la numitor ajustează această capacitate brută la capacitatea reală necesară de instalat: **k_desc**, factorul de descărcare (bateriile de acumulatori nu livrează, practic, întreaga capacitate nominală atunci când sunt descărcate în regim de curent variabil/de vârf, comparativ cu o descărcare lentă constantă de test — efect cunoscut și cuantificat prin curbele de descărcare ale producătorului), și **k_temp**, factorul de corecție de temperatură (capacitatea utilă a unei baterii scade la temperaturi scăzute, sub temperatura de referință de catalog — relevant pentru bateriile amplasate în spații neîncălzite sau la temperaturi exterioare de calcul severe, cap. 1.2).

### 8.3. Redresorul și UPS-ul pentru SCADA

Bateria de acumulatori este menținută permanent în stare de încărcare completă printr-un **redresor/încărcător**, alimentat din tabloul de servicii proprii de curent alternativ (cap. 8.1), care funcționează, în regim normal, în **regim de tampon (float charge)** — furnizând simultan curentul permanent consumat de circuitele de protecție/comandă *și* curentul mic, de întreținere, necesar menținerii bateriei la starea de încărcare completă, fără a o suprasolicita —, funcție ce necesită, prin proiectare, **dublarea redresorului** (două unități, activă/rezervă, similar principiului AAR de la cap. 8.1), astfel încât defectarea unui redresor să nu lase bateria fără sursă de reîncărcare pe termen lung. Separat de instalația de curent continuu propriu-zisă, sistemul de comandă-control și SCADA (cap. 9) este, la rândul lui, protejat de o **sursă neîntreruptibilă (UPS) dedicată**, care asigură alimentarea calculatoarelor, a echipamentelor de comunicație și a interfețelor om-mașină ale sistemului de comandă-control fără întrerupere, inclusiv la comutările tranzitorii dintre sursele de curent alternativ.

---

## 9. Sistemul de comandă-control IEC 61850

### 9.1. Arhitectura pe niveluri

Standardul internațional **IEC 61850** definește arhitectura de referință a sistemelor moderne de comandă-control ale stațiilor electrice, structurată pe **trei niveluri ierarhice**: **nivelul de proces** (echipamentele primare propriu-zise — transformatoarele de măsură, întreruptoarele, separatoarele, cu senzorii și acționările lor), **nivelul de travee** (câte un **IED — Intelligent Electronic Device**, dispozitiv electronic inteligent care integrează, într-un singur echipament numeric, funcțiile de protecție descrise la capitolul 6, funcțiile de măsură și funcțiile de comandă locală, pentru fiecare celulă/travee a stației — o celulă de linie, celula transformatorului, o plecare de medie tensiune) și **nivelul de stație** (calculatorul de stație central, cu interfața om-mașină/HMI locală, care agregă informația de la toate IED-urile de travee, oferind operatorului o imagine unitară a întregii instalații și un punct unic de comandă la nivel local).

### 9.2. Magistralele de comunicație — GOOSE și MMS

Comunicația digitală între IED-urile de travee, între ele și către nivelul de stație, se realizează prin două protocoale complementare definite de IEC 61850, fiecare adaptat unei cerințe de timp diferite: **GOOSE (Generic Object Oriented Substation Event)**, protocol de mesagerie rapidă, orientat pe eveniment, cu timpi de transmisie de ordinul milisecundelor, folosit pentru **interblocajele rapide între echipamente** (de exemplu, blocarea comenzii unui separator dacă întreruptorul asociat este încă închis — cap. 2.2 —, sau transmiterea instantanee, de la un IED de protecție la altul, a unei comenzi de declanșare coordonată, precum teleprotecția de distanță, cap. 6.5); și **MMS (Manufacturing Message Specification)**, protocol orientat pe raportare structurată, mai lent, folosit pentru **transmiterea de date curente, măsurători, evenimente înregistrate și comenzi de operator** către nivelul de stație și, mai departe, către dispecerul de sistem (cap. 9.3), nefiind supus acelorași constrângeri de timp real strict ca GOOSE.

### 9.3. SCADA și telecomanda de la dispecer

Sistemul de comandă-control local al stației este, la rândul lui, integrat într-un sistem **SCADA (Supervisory Control And Data Acquisition)** de nivel superior, care conectează stația la dispecerul energetic de sistem (Dispecerul Energetic Central — DEC, respectiv dispecerul energetic teritorial/de distribuție — DEN, în funcție de nivelul de tensiune și de operatorul de rețea relevant), permițând acestuia **monitorizarea în timp real a stării stației** (poziția fiecărui întreruptor și separator, valorile curenților, tensiunilor și puterilor tranzitate, starea protecțiilor) și, pentru manevrele care nu necesită prezența fizică a unui operator local, **telecomanda de la distanță** a echipamentelor de comutație — funcție esențială pentru operarea eficientă a unei rețele electrice moderne, în care numeroase stații funcționează nesupravegheate permanent (fără personal de exploatare permanent în incintă), operarea curentă realizându-se integral prin dispecer.

### 9.4. Sincronizarea de timp

Coordonarea corectă a evenimentelor înregistrate de mai multe IED-uri diferite ale aceleiași stații — și, mai important, compararea secvenței evenimentelor de la mai multe stații diferite ale rețelei, esențială pentru analiza post-defect a unui incident de sistem — necesită ca **toate ceasurile interne ale echipamentelor numerice să fie sincronizate cu o precizie de ordinul microsecundelor**, sincronizare asigurată printr-o sursă de timp de referință externă, tipic **GPS**, distribuită în interiorul stației prin protocolul **PTP (Precision Time Protocol, IEEE 1588)**, standard care a înlocuit, progresiv, soluțiile mai vechi bazate pe impulsuri de sincronizare cablate, oferind o precizie superioară și o distribuție mai simplă la nivelul întregii arhitecturi IEC 61850 descrise mai sus.

### 9.5. Interblocajele funcționale

Independent de rapiditatea magistralei GOOSE (cap. 9.2), sistemul de comandă-control implementează, ca regulă absolută de securitate a manevrelor, **interblocajele funcționale** care împiedică, fizic sau logic, secvențe de manevră periculoase pentru echipament sau pentru personal — cea mai elementară fiind **interdicția de a manevra un separator sub sarcină** (aparat fără putere de rupere, cap. 2.2): comanda de deschidere/închidere a unui separator este blocată logic, prin sistemul de comandă-control, atât timp cât întreruptorul asociat aceleiași celule este închis, secvența corectă de manevră fiind întotdeauna **întâi întreruptorul (deschidere), apoi separatorul** — și, simetric, la reanclanșare, **întâi separatorul (închidere), apoi întreruptorul** — secvență impusă automat, indiferent dacă manevra este comandată local sau prin telecomandă de la dispecer (cap. 9.3).

---

## 10. Iluminat și PSI specific instalațiilor electrice

### 10.1. Riscul major al transformatorului cu ulei

Transformatorul de putere (cap. 2.5) folosește, ca mediu izolant și de răcire între înfășurări, **ulei mineral electroizolant** — un produs petrolier rafinat, cu proprietăți dielectrice excelente și capacitate bună de evacuare a căldurii prin circulație naturală sau forțată, dar cu un dezavantaj major din perspectiva securității la incendiu: **este un lichid combustibil**, prezent în cuva transformatorului în cantități de ordinul mai multor tone, la o instalație de puterea celei de față (Sn = 40 MVA). Riscul specific al unui incendiu de transformator provine din combinația a trei factori: **cantitatea mare de combustibil lichid** stocată într-un singur echipament, **prezența unei surse de aprindere internă** proprie (un arc electric produs de un defect intern, exact scenariul detectat de protecția Buchholz, cap. 2.5, sau de protecția diferențială 87T, cap. 6.2, poate aprinde direct uleiul din interiorul cuvei) și **posibilitatea propagării incendiului**, prin ruperea cuvei sau prin scurgerea uleiului aprins, la echipamentele și clădirile învecinate, dacă nu există măsuri constructive de limitare — motiv pentru care incendiul de transformator este, statistic, unul dintre cele mai severe scenarii de risc luate în calcul la proiectarea securității la incendiu a unei stații electrice, alături de arcul electric intern la echipamentele de comutație.

### 10.2. Sistemele de detecție

Detecția timpurie a unui defect care ar putea evolua către incendiu se realizează, în primul rând, prin echipamentele descrise deja la capitolele 2.5 și 6.7 — **releul Buchholz** (detecție de gaze/presiune, prima linie de apărare, capabilă să semnalizeze defecte incipiente cu mult înainte ca acestea să evolueze spre un incendiu propriu-zis) și **protecțiile de temperatură** (26/49) —, completate, la nivelul construcției, de un **sistem dedicat de detecție a incendiului** (detectoare de fum/flacără/căldură, conform normativelor PSI generale, montate atât în clădirea de comandă cât și, dacă soluția tehnică o impune, în zona transformatorului), care asigură o a doua linie de detecție, independentă de echipamentul electric propriu-zis, pentru cazul (rar, dar posibil) al unui incendiu care nu a fost precedat de o semnalizare Buchholz relevantă (de exemplu, un incendiu cauzat de o sursă externă, nu de un defect intern al transformatorului).

### 10.3. Sistemele de stingere

Pentru transformatoarele de putere ale gamei tratate în prezentul memoriu, soluția de stingere adoptată — stabilită definitiv la faza de proiectare tehnică, în funcție de puterea efectivă a transformatorului ales și de cerințele specifice ale avizului ISU — poate consta în **stingere cu apă pulverizată** (sistem fix, cu duze dispuse pentru a acoperi întreaga suprafață a cuvei transformatorului, acționat automat la semnalul de incendiu confirmat, eficient prin efectul combinat de răcire rapidă a cuvei și de diluare/înăbușire a flăcării) sau, la instalațiile de putere mai mare sau cu cerințe de protecție superioare, prin **agenți de stingere pe bază de gaz inert**, aplicabili însă cu precauție la echipamente exterioare (unde eficiența unui agent gazos este limitată de dispersia în aer liber, soluția fiind, tipic, rezervată spațiilor închise) — alegerea finală, cu breviarul de calcul al debitelor și al rezervei de apă/agent, făcând obiectul unei piese separate de securitate la incendiu, elaborate de specialist atestat și avizate de ISU, ale cărei cerințe de sursă (rezerva de apă, presiunea necesară) sunt, însă, integrate în bilanțul general al utilităților stației.

### 10.4. Separarea antifoc și cuva de retenție — coordonare cu structura și arhitectura

Independent de sistemele active de detecție și stingere (cap. 10.2-10.3), proiectarea prevede măsuri **pasive** de limitare a propagării unui eventual incendiu de transformator: **distanțe de separare/pereți antifoc** între transformator și celelalte construcții ale stației (clădirea de comandă, celulele de medie tensiune), dimensionate conform normativelor de securitate la incendiu aplicabile instalațiilor electrice (coordonate cu memoriul de arhitectură și de structură al documentației, unde se regăsesc dimensiunile și rezistența la foc a acestor elemente), și, sub transformatorul propriu-zis, o **cuvă de retenție etanșă**, dimensionată să colecteze integral volumul de ulei conținut de transformator (plus o marjă pentru apa de stingere, dacă se folosește stingere cu apă pulverizată), umplută cu un **strat de pietriș stingător** care are un rol dublu: pe de o parte, favorizează stingerea naturală a unui eventual ulei scurs și aprins (prin răcire și prin limitarea suprafeței de contact cu aerul), iar pe de altă parte, servește, așa cum s-a arătat la capitolul 7.7, drept strat de izolare la suprafață utilizat inclusiv în calculul tensiunilor de atingere admisibile ale prizei de pământ — dublă funcțiune (PSI și electrosecuritate) care justifică tratarea coordonată a acestui element constructiv de către memoriul de instalații electrice și memoriul de structură/arhitectură. Lichidul colectat în cuva de retenție (amestec de ulei și, eventual, apă de stingere) este dirijat, printr-un separator de ulei-apă, către rețeaua de canalizare pluvială a incintei sau către un bazin de retenție dedicat, prevenind poluarea solului și a apelor din vecinătate — detaliu de coordonare cu instalațiile sanitare/pluviale ale stației, tratate separat.

### 10.5. Iluminatul

Instalația de iluminat a stației cuprinde **iluminatul interior** al clădirii de comandă (birouri, camera de relee, camera bateriei de acumulatori — aceasta din urmă cu cerințe speciale de ventilație, dat fiind degajarea de hidrogen la încărcarea bateriilor cu plumb-acid, cap. 8.2), **iluminatul de siguranță** (alimentat, la pierderea totală a curentului alternativ, din instalația de curent continuu/UPS descrisă la capitolul 8, pentru a permite evacuarea în siguranță și continuarea manevrelor esențiale) și **iluminatul exterior al platformei**, realizat, tipic, prin proiectoare montate pe portalurile de 110 kV sau pe stâlpi dedicați, dimensionat pentru a asigura nivelul de iluminare necesar manevrelor și intervențiilor nocturne pe întreaga suprafață a incintei, coordonat cu gabaritele de securitate impuse de coordonarea izolației (cap. 5.2), pentru a nu introduce structuri metalice suplimentare în zonele de distanță minimă în aer.

---

## 11. Racordarea la Sistemul Energetic Național

### 11.1. Avizul Tehnic de Racordare (ATR)

Orice stație electrică nouă, sau orice modificare semnificativă a unei stații existente, este condiționată, ca etapă premergătoare obligatorie proiectării de detaliu, de obținerea **Avizului Tehnic de Racordare (ATR)** de la operatorul de transport și/sau de distribuție relevant, prin care acesta stabilește, pe baza studiilor proprii de rețea, **soluția tehnică de racordare** (punctul exact de racordare la rețeaua de 110 kV, configurația schemei la acel punct, eventuale lucrări de întărire a rețelei existente necesare pentru a prelua noua putere) și furnizează, ca date de intrare obligatorii pentru proiectarea electrică a stației, cel puțin **puterea de scurtcircuit disponibilă în punctul de racordare** (parametrul Ssc,SEN folosit la capitolul 3.4), **nivelul de tensiune și banda de reglaj admisă**, și **regimul de exploatare al neutrului** al rețelei de racordare. Aceste date, odată obținute prin ATR, nu sunt negociabile la faza de proiectare a stației — orice discrepanță semnificativă între ipotezele adoptate în prezentul memoriu (cap. 1.2, 3.4) și valorile finale confirmate prin ATR trebuie să conducă la revizuirea breviarelor de calcul aferente.

### 11.2. Codul Tehnic al Rețelei

Dincolo de parametrii punctuali stabiliți prin ATR, funcționarea stației pe termen lung este guvernată de prevederile **Codului Tehnic al Rețelei Electrice de Transport (RET)**, respectiv, pentru interfața cu rețeaua de distribuție de 20 kV, de **Codul Tehnic al Rețelei Electrice de Distribuție (RED)**, ambele aprobate prin ordine ale ANRE, care stabilesc cerințele tehnice de exploatare aplicabile oricărui obiectiv racordat: **nivelul de scurtcircuit maxim admis** în punctul de racordare (verificare inversă celei de la cap. 3.4 — nu doar stația trebuie dimensionată la puterea de scurtcircuit a rețelei, ci și contribuția proprie a stației la nivelul de scurtcircuit al rețelei trebuie să rămână sub limitele admise de operatorul de rețea, relevant mai ales dacă stația include, în viitor, surse proprii de generare); **reglajul de tensiune**, asigurat, pe partea stației, prin mecanismul OLTC al transformatorului (cap. 2.5), în banda impusă de codul de rețea; **regimul neutrului**, deja stabilit la capitolul 1.2 (legat efectiv pe partea de 110 kV, tratat pe partea de 20 kV), coordonat obligatoriu cu regimul general al rețelei din care se alimentează/pe care o alimentează stația; **calitatea energiei electrice** (limitele admise de flicker, armonici, dezechilibru între faze, aplicabile atât energiei preluate din rețea cât și, dacă este cazul, celei injectate); și **protecția selectivă coordonată cu rețeaua amonte** — cerința ca reglajele protecțiilor proprii ale stației (cap. 6) să fie coordonate, prin studiul de selectivitate menționat la capitolul 6.3, cu reglajele protecțiilor din stațiile învecinate ale rețelei de transport/distribuție, astfel încât un defect să fie întotdeauna eliminat de treapta de protecție cea mai apropiată de el, indiferent de stația în care se produce.

---

## 12. Tabel de sinteză a mărimilor electrice calculate

| Mărime | Valoare calculată | Valoare aleasă (standardizată) |
|---|---|---|
| Curent nominal, partea 110 kV (In,110) | 210 A | — |
| Curent nominal, partea 20 kV (In,20) | 1.155 A | 1.250 A |
| Tensiune de scurtcircuit transformator (uk) | 12 % | — |
| Curent de scurtcircuit, partea 20 kV (Isc,20) | 9,6 kA | 12,5 kA |
| Putere de scurtcircuit, partea 20 kV (Ssc,20) | 333 MVA | — |
| Putere de scurtcircuit rețea SEN (Ssc,SEN, ipoteză ATR) | ≈ 3.000 MVA | — |
| Curent de scurtcircuit, partea 110 kV (Isc,110) | 15,7 kA | ≥ 25 kA / 1 s |
| Secțiune minimă bare (verificare termică, S_min) | 87 mm² | ≥ 240 mm² |
| Factor de vârf (κ) pentru verificare electrodinamică | 1,8 | — |
| BIL, partea 110 kV (Um 123 kV) | — | 550 kV |
| Distanța minimă în aer, partea 110 kV | — | ≈ 1,10 m |
| BIL, partea 20 kV (Um 24 kV) | — | 125 kV |
| Distanța minimă în aer, partea 20 kV | — | ≈ 0,22 m |
| Marja de coordonare a izolației (Kp) | — | ≥ 1,15…1,25 |
| Curent de dimensionare a prizei de pământ (I_E) | ≈ 5 kA | — |
| Timp de eliminare a defectului (tf) | ≈ 0,5 s | — |
| Rezistența de dispersie a prizei (R_E) | — | < 1 Ω |
| Tensiune de atingere admisibilă la tf = 0,5 s (U_Tp,adm) | — | ≈ 220 V |
| Autonomia bateriei de acumulatori | — | 8-10 ore |
| Puterea transformatorului de servicii proprii | — | 100-250 kVA |
| Tensiunea instalației de curent continuu | — | 110/220 V c.c. |

---

## 13. Concluzii, verificarea cerinței Ie și coordonarea cu celelalte specialități

Prezentul memoriu a tratat, complet și în succesiune logică, întregul lanț electric al stației de transformare 110/20 kV, Sn 40 MVA — de la racordul la Sistemul Energetic Național (cap. 11) și schema electrică monofilară care descrie fluxul de energie prin fiecare echipament al instalației (cap. 2), prin breviarul de calcul al curenților nominali și de scurtcircuit care fundamentează alegerea întregului aparataj (cap. 3), dimensionarea mecanică a barelor colectoare (cap. 4) și coordonarea izolației care protejează echipamentele de supratensiuni (cap. 5), până la sistemul complet de protecții electrice (cap. 6), instalația de curent continuu și serviciile proprii care garantează funcționarea acestor protecții indiferent de starea rețelei (cap. 8), sistemul de comandă-control digital IEC 61850 care integrează întreaga instalație (cap. 9) și măsurile specifice de securitate la incendiu impuse de prezența transformatorului cu ulei (cap. 10). Capitolul 7 — priza de pământ, dimensionată conform SR EN 50522 prin calculul rezistenței de dispersie, al curentului de defect și al tensiunilor de atingere și de pas, verificate față de pragurile admisibile corelate cu timpul de acționare al protecțiilor — rămâne, așa cum s-a subliniat încă din capitolul 1, **verificarea de securitate esențială a întregului obiectiv**: oricât de corect ar fi dimensionate schema electrică, aparatajul și protecțiile, o instalație de punere la pământ necorespunzătoare ar expune, la orice defect cu punere la pământ, persoanele aflate în incintă sau în vecinătatea ei unui risc de electrocutare — motiv pentru care această verificare condiționează, la fel ca verificarea la scurtcircuit, punerea în funcțiune a stației.

**Verificarea cerinței fundamentale Ie (economia de energie)**, aplicabilă instalației prin prisma pierderilor tehnologice, se manifestă la o stație electrică de transformare în primul rând prin **alegerea corectă a transformatorului de putere** — pierderile în gol (histerezis și curenți turbionari în miezul magnetic, prezente permanent, indiferent de sarcină) și pierderile în sarcină (efect Joule în înfășurări, proporționale cu pătratul curentului, deci cu pătratul sarcinii instantanee) fiind parametri de catalog verificați la recepția transformatorului, alături de randamentul global al instalației la diverse niveluri de încărcare — și, secundar, prin dimensionarea corectă a secțiunii barelor și cablurilor (cap. 4), care, aleasă la un nivel superior strictului necesar termic (S_min = 87 mm² → S_ales ≥ 240 mm², cap. 4.1), reduce suplimentar pierderile Joule în regim de sarcină normală, dincolo de justificarea electrodinamică și de curent nominal care a condus, în primul rând, la alegerea acestei secțiuni.

**Coordonarea cu celelalte specialități** ale documentației este, pentru un obiectiv de acest tip, deosebit de strânsă, dat fiind rolul generator al schemei electrice descris la capitolul 1.4: memoriul de structură preia, ca date de intrare directe din prezentul memoriu, forțele electrodinamice de scurtcircuit (cap. 4.2-4.3) pentru dimensionarea portalurilor și a consolelor de susținere a barelor, precum și masele și gabaritele echipamentelor primare pentru dimensionarea fundațiilor; memoriul de arhitectură preia distanțele minime de securitate rezultate din coordonarea izolației (cap. 5.2) pentru amplasarea în plan a echipamentelor, a împrejmuirii și a căilor de acces, precum și cerințele de compartimentare antifoc și de amplasare a cuvei de retenție (cap. 10.4) pentru relația dintre transformator și clădirea de comandă; scenariul de securitate la incendiu, elaborat de specialist atestat și avizat de ISU, preia datele privind cantitatea de ulei din transformator, sistemele de detecție proprii ale acestuia (Buchholz) și necesarul de sursă de apă/agent de stingere rezultate din capitolul 10. Verificarea tehnică a proiectului, la faza de proiectare tehnică (P.Th.), se realizează de verificator atestat pe cerințele fundamentale aplicabile (rezistență mecanică și stabilitate — Ia, securitate la incendiu — Ib/Ic, igienă/sănătate/mediu — Id, siguranță în exploatare — II, inclusiv verificarea electrosecurității conform SR EN 50522, protecție împotriva zgomotului — III, economie de energie — Ie), coordonat cu avizul tehnic de racordare (ATR) obținut de la operatorul de rețea (cap. 11.1) și cu documentația de sinteză a punctelor 1-13 din prezentul memoriu, ale cărei detalii de execuție (scheme monofilare complete pe fiecare celulă, breviare de calcul definitive ale protecțiilor cu reglaje numerice, planuri de detaliu ale prizei de pământ) se elaborează la faza următoare, de proiectare tehnică și detalii de execuție (P.Th./D.E.).
