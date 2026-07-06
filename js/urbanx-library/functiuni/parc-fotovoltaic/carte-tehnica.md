# CARTEA TEHNICĂ A CONSTRUCȚIEI — PARC FOTOVOLTAIC (CENTRALĂ ELECTRICĂ FOTOVOLTAICĂ)
## Conținut, întocmire, completare, recepție, exploatare și urmărirea comportării în timp

*Document tehnic specific pentru o Centrală Electrică Fotovoltaică (CEF) racordată la Sistemul Energetic Național (SEN), întocmit în conformitate cu Legea nr. 10/1995 privind calitatea în construcții (republicată), HG nr. 766/1997 — Anexa 6 (Regulamentul privind urmărirea comportării în exploatare, intervențiile în timp și postutilizarea construcțiilor), HG nr. 273/1994 (Regulament de recepție a lucrărilor de construcții și instalații aferente, modificat prin HG nr. 343/2017), Normativul P130/1999, HG nr. 907/2016 și legislația specifică sectorului energetic — Legea nr. 123/2012 a energiei electrice și gazelor naturale, Ordinele ANRE aplicabile, Codul Tehnic al RET/RED.*

> **NOTĂ METODOLOGICĂ — DOCUMENT PARAMETRIC.** Cartea tehnică se întocmește pentru un parc fotovoltaic cu putere instalată în curent continuu **P_DC [kWp/MWp] — variabilă de proiect** (500 kWp, 1 MWp, 2 MWp, 5 MWp, 50 MWp etc.). Toate cantitățile de documente, procese-verbale, buletine de încercări și componente urmărite **scalează cu P_DC** prin relațiile de scalare din memoriile de specialitate (număr de module, număr piloți, număr posturi de transformare, număr invertoare). Pentru claritate se dau exemple etichetate explicit **„Exemplu pentru P_DC = 2 MWp"**, care NU sunt ipoteză fixă — cititorul recalculează pentru puterea proiectului său. Cartea tehnică a unui parc de 500 kWp și a unuia de 50 MWp au aceeași structură și aceleași categorii de piese; diferă numărul de exemplare (ex. câte un set de buletine I-V pe fiecare string, câte un PV de fază determinantă pe fiecare post de transformare).

> **PRECIZARE DE RANG ȘI DE NATURĂ HIBRIDĂ.** Parcul fotovoltaic are un statut juridic dublu: din perspectiva **dreptului construcțiilor** este un ansamblu de „construcții și instalații" supus autorizării de construire (Legea 50/1991), recepției (HG 273/1994) și urmăririi comportării în timp (P130/1999) — deci are Carte tehnică a construcției; din perspectiva **dreptului energiei** este o „capacitate de producere a energiei electrice" supusă autorizării de înființare și licențierii ANRE (Legea 123/2012). Cele două regimuri se suprapun, iar Cartea tehnică a construcției trebuie să conțină, pe lângă piesele clasice (secțiunile A–D din Anexa 6), și **piesele specifice de sector energetic** (ATR, Autorizația de înființare, Contractul de racordare, Certificatul de racordare, Licența de producere, PV de punere sub tensiune — PIF, buletinele PRAM). Prezentul document integrează ambele registre.

---

## 1. Obiect, definiție, rol și cadru legal specific FV

### 1.1 Definiție și obiect

**Cartea tehnică a construcției** unui parc fotovoltaic reprezintă ansamblul organizat al documentelor tehnice, economice, juridice și de reglementare energetică referitoare la Centrala Electrică Fotovoltaică, întocmit pe parcursul proiectării, execuției și recepției și completat pe întreaga durată de existență a centralei (tipic 25–35 ani, corelat cu durata de garanție de performanță a modulelor și cu durata contractelor de teren/racordare), inclusiv în faza de dezafectare și reciclare a deșeurilor de echipamente electrice și electronice (DEEE).

Ea constituie documentul oficial de referință privind proiectarea, execuția, recepția, punerea în funcțiune (PIF), exploatarea, mentenanța și urmărirea comportării în timp a construcțiilor și instalațiilor parcului: mese fotovoltaice și piloți de fundare, module, invertoare (string sau centrale), tablouri și cabluri DC/AC, posturi de transformare 0,4/(20–110) kV, stație de conexiune/racord, rețele electrice interioare îngropate, priză de pământ și instalație de protecție la trăsnet, drumuri tehnologice, împrejmuire și sistem de securitate/monitorizare (SCADA).

### 1.2 Rol funcțional — accente specifice unui parc FV

Pe lângă rolurile generice (memorie tehnică, instrument de urmărire, bază de decizie pentru intervenții, document juridic, condiție de recepție), la un parc fotovoltaic Cartea tehnică îndeplinește câteva funcții proprii sectorului:

- **Bază pentru urmărirea performanței energetice (KPI).** Datele de referință din Cartea tehnică (putere DC/AC nominală, curbe I-V de referință la punere în funcțiune, rezistența de izolație inițială, parametrii de garanție ai producătorilor) constituie reperul față de care se calculează, pe toată durata de exploatare, Performance Ratio (PR), disponibilitatea (availability), producția specifică (specific yield) și rata de degradare a modulelor.
- **Suport pentru relația cu operatorul de rețea (OD/OTS) și cu ANRE.** ATR, avizul tehnic de racordare, certificatul de racordare, buletinele PRAM și programul de mentenanță al echipamentelor de MT/IT se corelează cu Cartea tehnică; reviziile periodice cerute de operatorul de rețea și de licență se consemnează în secțiunea D.
- **Trasabilitatea produselor cu regim special.** Modulele, invertoarele și transformatoarele au serii unice, declarații de performanță/conformitate și garanții pe termen lung (10–12 ani produs, 25–30 ani performanță la module); trasabilitatea serie–lot–poziție în parc (string/tracker) este esențială pentru garanții și pentru înlocuirea componentelor defecte.
- **Fundament pentru dezafectarea responsabilă.** La finalul duratei de viață, Cartea tehnică furnizează inventarul exact de module (masă de sticlă, siliciu, argint, aluminiu, plastic), invertoare și cabluri pentru gestiunea DEEE (OUG 5/2015 / Directiva DEEE) și pentru readucerea terenului la starea agricolă.

### 1.3 Cadrul legal aplicabil (construcții + energie)

| Act normativ | Obiect | Incidența asupra Cărții tehnice a parcului FV |
|---|---|---|
| **Legea nr. 10/1995** (rep.) | Sistemul calității; cele 7 cerințe fundamentale; recepție; urmărirea comportării în timp; contravenții | Instituie obligația întocmirii, păstrării și predării Cărții tehnice; urmărirea comportării structurilor (mese, piloți, PT) și a instalațiilor |
| **HG nr. 766/1997 — Anexa 6** | Regulamentul urmăririi comportării, intervenții, postutilizare; componența Cărții tehnice (secțiunile A–D) | Actul de bază pentru structura Cărții tehnice; secțiunea D „vie" pe 25–35 ani |
| **HG nr. 273/1994** (mod. **HG 343/2017**) | Regulament de recepție a lucrărilor de construcții și instalații | Recepția la terminarea lucrărilor (RTL) și recepția finală (RF); PV, referate proiectant/diriginte, participare ISC |
| **Normativ P130/1999** | Comportarea în timp: urmărire curentă și specială | Detaliază secțiunea D — program de urmărire, jurnal evenimente, praguri |
| **HG nr. 907/2016** | Etape și conținut SF/DALI, PT, DE | Piesele documentației economice și de proiectare — secțiunea A |
| **Legea nr. 50/1991** (rep.) | Autorizarea executării lucrărilor | Autorizația de construire (AC) și de desființare (postutilizare) — piese A/B/D |
| **Legea nr. 123/2012** a energiei | Autorizarea de înființare; licențierea; racordarea la SEN | Autorizația de înființare ANRE, Licența de producere, Contractul/Certificatul de racordare — piese specifice A/C/D |
| **Ord. ANRE nr. 59/2013** (rep. prin ord. ulterioare) — **Regulamentul de racordare** la rețelele electrice de interes public | Procedura CTE → ATR → contract de racordare → certificat de racordare (PIF) | ATR și certificatul de racordare — condiție de PIF; piese A și C |
| **Ord. ANRE de atestare (nr. 116/2016 și ulterioare)** | Atestarea operatorilor economici și autorizarea electricienilor | Calificarea proiectantului/executantului instalațiilor electrice — condiție de valabilitate a pieselor B |
| **Normativ I7-2011**; **SR EN 62305** (I–IV) | Instalații electrice de joasă tensiune; protecția la trăsnet | Buletine priză de pământ, verificări izolație, IPT — piese B/D |
| **Normativ PE 116/1994; NTE 002/2003** | Încercări și măsurători la echipamente și instalații electrice (PRAM) | Buletine PRAM la PT/stație — condiție de PIF; piese B/C/D |
| **NP 123-2010; NP 074-2014; SR EN 1997** | Piloți/fundații speciale; documentații geotehnice; Eurocod 7 | Studiu geotehnic, PV batere piloți, teste de smulgere — piese A/B |
| **CR 1-1-4/2012 (vânt); CR 1-1-3/2012 (zăpadă); P100-1/2013** | Acțiuni și proiectare seismică | Breviare de calcul structură mese/piloți/PT — piese A |
| **Legea nr. 292/2018; OUG nr. 195/2005** | Evaluarea impactului asupra mediului; protecția mediului | Decizia etapei de încadrare / Acordul de mediu — piese A |
| **OUG nr. 5/2015 (DEEE)** | Deșeuri de echipamente electrice și electronice | Gestiunea la dezafectare (module, invertoare) — piese D (postutilizare) |

> **Regulă de fidelitate.** Numerotarea articolelor din Legea 10/1995 și din Legea 123/2012, precum și numerele Ordinelor ANRE, se modifică prin republicări și acte succesive; în text se trimite la **materia** reglementată și la actul/anexa de referință. Ordinele ANRE de racordare și de atestare se citesc în versiunea în vigoare la data proiectării/execuției.

### 1.4 Cerințele fundamentale — reperul de conținut, adaptate la parcul FV

Documentele Cărții tehnice fac dovada satisfacerii cerințelor fundamentale aplicabile. La un parc fotovoltaic incidența lor este particulară:

| Cod | Cerință fundamentală | Documente-cheie în Cartea tehnică a parcului FV |
|---|---|---|
| **A** | Rezistență mecanică și stabilitate | Breviare de calcul mese/piloți/fundații PT la **vânt (CR 1-1-4)** — acțiunea determinantă la structuri ușoare cu arie mare — și zăpadă; verificarea la **smulgere (uplift)** a piloților; referatul verificatorului A; PV faze determinante fundare/piloți; buletine teste smulgere; buletine zincare |
| **B** | Securitate la incendiu | Scenariul de securitate la incendiu (dacă e cazul — clădire pază/gospodărie); riscul specific FV (arc DC, incendii de invertor/transformator); avizul/punctul de vedere ISU; măsuri de stingere transformator (cuvă de retenție ulei) |
| **C** | Igienă, sănătate și mediu | Acord/decizie de mediu; gestiunea uleiului electroizolant (transformator); managementul deșeurilor; absența poluanților în exploatare (producție „curată") |
| **D** | Siguranță și accesibilitate în exploatare | Semnalizări pericol electric; îngrădiri; distanțe de protecție; proceduri LOTO (blocare-etichetare); accesibilitate drumuri tehnologice |
| **E** | Protecție împotriva zgomotului | Nivel de zgomot invertoare/transformatoare (ventilatoare) la limita amplasamentului; măsurători, dacă sunt vecinătăți sensibile |
| **F** | Economie de energie | Prin natura obiectului — producție de energie regenerabilă; certificatul de racordare și declarația de producție confirmă funcția energetică |

La acestea se adaugă **utilizarea sustenabilă a resurselor naturale** (reversibilitatea ocupării terenului, reciclarea DEEE la dezafectare). Cerința A este dominantă la structuri, iar **verificarea la vânt și la smulgere** este specificul de rezistență al parcului (structuri cu masă proprie mică și suprafață colectoare mare — vântul este de regulă mai defavorabil decât seismul).

---

## 2. Componența Cărții tehnice a parcului FV

Conform Anexei 6 la HG 766/1997, Cartea tehnică se compune dintr-un **capitol de prezentare** și **patru secțiuni** (A — proiectare, B — execuție, C — recepție, D — exploatare/urmărire), la care, pentru parcul FV, se atașează organizat **piesele de sector energetic** distribuite pe secțiuni. Fiecare secțiune se organizează în dosare numerotate, cu borderou (centralizator) propriu.

**Principiul completitudinii** este aici deosebit de important: la înstrăinarea unui parc FV (frecventă — activele fotovoltaice se tranzacționează), cumpărătorul și finanțatorul (due diligence tehnic) reconstituie integral centrala **exclusiv din Cartea tehnică** — de la titlul asupra terenului, ATR și Licență, până la buletinele I-V de referință și istoricul de mentenanță. O Carte tehnică incompletă blochează tranzacția și expune la riscuri de garanție.

Structura de dosare recomandată (capitolul de prezentare + A/B/C/D) este detaliată la capitolele 3–5; conținutul specific FV al fiecărei secțiuni este tratat la **capitolele A, B, C** de mai jos (structura HG 273/1994 Anexa, adaptată).

**Original, copie conformă, suport electronic** — regula generică se aplică, cu accente FV:

| Categorie de piese | Formă de păstrare | Motivație |
|---|---|---|
| PV lucrări ascunse (piloți, cabluri DC/AC îngropate, priză de pământ) | **Original** | Lucrări inaccesibile după acoperire; valoare probatorie |
| PV faze determinante (fundare piloți, radiere PT, priză de pământ) | **Original** | Semnate de ISC/proiectant/executant/diriginte |
| Buletine PRAM, buletine priză de pământ, buletine izolație | **Original** | Emise de laborator/personal autorizat; condiție de PIF |
| Buletine încercări I-V module/stringuri | **Original** | Curbe de referință pentru urmărirea degradării (KPI) |
| ATR, Autorizația de înființare, Licența, Certificatul de racordare | **Copie conformă** | Originalul rămâne la OD/ANRE |
| DoP / certificate module, invertoare, transformatoare, cabluri | Original/copie producător | Trasabilitate serie–lot–garanție |
| Planuri „as built" (layout mese, trasee cabluri DC/AC, priză, PT) | **Original** | Referință geometrică pentru mentenanță și intervenții |
| Jurnalul evenimentelor, rapoarte de urmărire, log SCADA arhivat | **Original**, continuu | Piesă unică; istoricul de performanță și incidente |

### 2.1 Corespondența secțiuni Anexa 6 ↔ capitole HG 273/1994

Enunțul temei cere structurarea pe **cele 3 capitole ale documentației de recepție** (HG 273/1994 Anexa): **A — proiectare**, **B — execuție**, **C — recepție + exploatare/urmărire**. Acestea coincid, ca materie, cu secțiunile A, B și (C+D) din Anexa 6 la HG 766/1997. Corespondența:

| Capitol HG 273/1994 (temă) | Secțiune Anexa 6 (HG 766/1997) | Conținut la parcul FV |
|---|---|---|
| **A — Documentația privind proiectarea** | Secțiunea A | Temă, avize/acorduri (CU, mediu, ATR, Autorizație de înființare ANRE, utilități), SF, PT, DE, referate verificatori |
| **B — Documentația privind execuția** | Secțiunea B | AC, PV faze determinante și lucrări ascunse, certificate/DoP, buletine (smulgere, I-V, izolație, priză, PRAM), jurnal de șantier, „as built" |
| **C — Documentația privind recepția + exploatarea și urmărirea** | Secțiunile C + D | PV RTL/RF, Certificat de racordare, Licența ANRE, jurnal evenimente, program mentenanță, monitorizare KPI, garanții, reciclare DEEE |

Aceste trei capitole formează structura părții a doua a prezentului document (capitolele A, B, C de mai jos).

---

## CAP. A — DOCUMENTAȚIA PRIVIND PROIECTAREA (Secțiunea A)

Capitolul A grupează piesele care fundamentează concepția parcului fotovoltaic: tema de proiectare, actele juridice asupra terenului, avizele și acordurile (cu accent pe **componenta energetică specifică** — ATR și Autorizația de înființare ANRE), documentațiile HG 907/2016 (SF, PT, DE) și referatele verificatorilor de proiecte atestați. Este capitolul care răspunde la întrebarea *„cum a fost gândit parcul?"*.

### A.1 Tema de proiectare și documentele de fundamentare

- **Tema de proiectare** aprobată de investitor: puterea instalată P_DC țintă (variabilă de proiect), soluția tehnologică (module cristaline mono-PERC/TOPCon, structuri fixe sau trackere, invertoare string sau centrale), tensiunea de racordare (MT 20 kV sau IT 110 kV pentru parcuri mari), orizontul de producție estimat;
- **Nota conceptuală și tema** conform HG 907/2016;
- **Studiul de resursă solară** (PVGIS/Meteonorm/SolarGIS): iradiația în planul modulelor (POA — Plane of Array), 1.300–1.500 kWh/m²·an la latitudinile României; energia anuală estimată E [MWh] = P_DC × POA × PR / 1000 (PR ≈ 0,80–0,84);
- **Studiul de umbrire** (profil de orizont, distanța dintre rânduri — pitch — pentru limitarea autoumbririi);
- **Studiul geotehnic** (obligatoriu, NP 074-2014): stratificație, capacitate portantă pentru piloți, **rezistivitatea solului** (pentru dimensionarea prizei de pământ) și **agresivitatea chimică** (coroziunea structurilor îngropate); include, ideal, rezultatele piloților de probă (v. cap. B);
- **Studiul topografic** (Stereo 70, cote Marea Neagră 1975): plan de situație, pantă, curbe de nivel.

### A.2 Actele privind dreptul asupra terenului

- Titlu de proprietate / contract de superficie / concesiune / arendă pe **min. 25–30 ani** (durata de viață a parcului);
- Extras de carte funciară, plan cadastral, nr. cadastral;
- Documentele de **scoatere temporară (reversibilă) din circuitul agricol** (dacă terenul e agricol) — specific parcurilor FV, care ocupă temporar terenul fără a-l impermeabiliza integral.

### A.3 Avize, acorduri și autorizări — matricea specifică FV

Parcul fotovoltaic are cea mai extinsă matrice de avize dintre construcțiile energetice, tocmai din cauza dublului regim (construcții + energie). Tabelul de mai jos grupează piesele obligatorii ale secțiunii A:

| Nr. | Aviz / acord / autorizație | Emitent | Rol / condiționare | Piesă în Cartea tehnică |
|---|---|---|---|---|
| 1 | **Certificat de urbanism (CU)** | Primărie / Consiliu Județean | Solicită avizele; stabilește regimul juridic/economic/tehnic | Copie conformă (A) |
| 2 | **Decizia etapei de încadrare / Acord de mediu** | APM / ANPM | Impactul asupra mediului (Legea 292/2018); Natura 2000 dacă e cazul | Copie conformă (A) |
| 3 | **Aviz tehnic de racordare (ATR)** | OD/OTS (Distribuție / Transelectrica) | Fixează **soluția de racordare** (punct, tensiune, putere evacuabilă); condiție a AC | Copie conformă (A) — piesă cheie |
| 4 | **Autorizația de înființare (ANRE)** | ANRE | Autorizează realizarea capacității de producere (Legea 123/2012) | Copie conformă (A) — piesă cheie |
| 5 | **Aviz de amplasament** | OD (energie), operator apă, gaz, telecom | Verifică suprapunerea cu rețele existente | Copie conformă (A) |
| 6 | **Aviz gospodărirea apelor / ANAR** | ANAR / ABA | Dacă amplasamentul e în bandă de protecție/zonă inundabilă | Copie conformă (A) |
| 7 | **Aviz/punct de vedere ISU (securitate la incendiu)** | IGSU / ISU județean | Dacă există clădiri/riscuri care impun; transformator cu ulei | Copie conformă (A) |
| 8 | **Aviz DSP (sănătate publică)** | Direcția de Sănătate Publică | Dacă e cazul (zgomot, vecinătăți) | Copie conformă (A) |
| 9 | **Avize servituți aeronautice / MApN / STS** | AACR / MApN | Reflexia luminoasă, proximitate aeroport, zone militare | Copie conformă (A) |
| 10 | **Aviz DJC (patrimoniu) / descărcare arheologică** | Direcția Județeană de Cultură | Dacă zona are potențial arheologic | Copie conformă (A) |
| 11 | **Avize deținători de rețele traversate (LEA, drumuri, CF)** | Transelectrica, CNAIR, CFR etc. | Traversări/apropieri de LES 20 kV până la punctul de racordare | Copie conformă (A) |

> **Interfața cheie proiectare–energie:** AC nu poate fi emisă coerent fără **ATR** (care fixează soluția de racordare și lungimea/traseul LES până la stație/PA), iar **Autorizația de înființare ANRE** presupune terenul, ATR-ul și soluția tehnică. Ordinea reală: CU → SF → ATR → Acord de mediu → Autorizație de înființare ANRE → AC.

### A.4 Documentațiile tehnico-economice (HG 907/2016)

- **Studiul de fezabilitate (SF)** — soluțiile tehnice, indicatorii tehnico-economici, planul de amplasare, devizul general;
- **Proiectul tehnic (PT)** pe specialități: arhitectură (organizare de șantier, împrejmuire, drumuri), rezistență (mese, piloți, fundații PT), instalații electrice (DC — module/string/invertor; AC JT; MT — PT/LES/stație), instalații de curenți slabi (SCADA, securitate, IPT);
- **Detaliile de execuție (DE)**: detalii piloți și prinderi mese, scheme monofilare DC și AC, planuri de trasee cabluri, detalii priză de pământ și paratrăsnet, detalii radier PT;
- **Caietele de sarcini** pe categorii de lucrări (structuri metalice zincate, baterea/înșurubarea piloților, pozarea cablurilor DC/AC, montaj module/invertoare, montaj PT, priză de pământ);
- **Breviarele de calcul**: structural (mese/piloți/PT la vânt CR 1-1-4, zăpadă CR 1-1-3, seism P100-1, cu verificarea la smulgere), electric (dimensionare stringuri, căderi de tensiune DC/AC, dimensionare cabluri și protecții, calcul priză de pământ), energetic (producție anuală, PR estimat).

### A.5 Verificarea proiectului — referatele verificatorilor atestați (MLPAT/MDLPA)

Piese obligatorii ale secțiunii A, care angajează răspunderea semnatarului atestat:

| Cerință / specialitate | Verificator atestat | Obiectul verificării la parcul FV |
|---|---|---|
| **A — Rezistență mecanică și stabilitate** | Verificator cerința A (construcții metalice / fundații speciale) | Mese, piloți (inclusiv smulgere), radiere/fundații PT; acțiuni vânt/zăpadă/seism |
| **Af — Geotehnic** (dacă e cazul) | Verificator Af | Studiul geotehnic și soluția de fundare pe piloți |
| **Ie — Instalații electrice** | Verificator Ie | Instalațiile DC/AC/MT, protecții, priză de pământ, IPT, coordonarea izolației |
| **B — Securitate la incendiu** (dacă e cazul) | Verificator B / expert Bi | Scenariul de securitate (clădiri, transformator cu ulei) |

> **Condiție de valabilitate:** proiectul cuprins în secțiunea A trebuie să fie **cel verificat**. Un proiect neverificat nu poate fundamenta autorizarea (AC) și nici recepția, deci nu îndeplinește rolul de piesă a Cărții tehnice. Suplimentar, proiectantul de instalații electrice trebuie să fie **atestat/autorizat ANRE** (Ord. 116/2016 și ulterioare) — condiție specifică sectorului energetic.

### A.6 Programul de control al calității și fazele determinante

Piesă a secțiunii A: **Programul de control al calității pe faze**, elaborat de proiectant, avizat de ISC și acceptat de executant și diriginte, care stabilește punctele de control și **fazele determinante** ale parcului (v. cap. B). El este documentul de referință pentru toate procesele-verbale ale secțiunii B.

### A.7 Particularitățile breviarelor de calcul cuprinse în secțiunea A

Breviarele de calcul depuse în secțiunea A merită o dezvoltare aparte, întrucât ele fundamentează cerințele fundamentale și constituie reperul tehnic al oricărei intervenții ulterioare. La un parc fotovoltaic, breviarele se grupează pe trei registre corelate:

**(a) Breviarul structural.** Documentează dimensionarea structurii unitare repetitive — masa fotovoltaică tip, pilotul tip și fundația tip a postului de transformare — prin metoda stărilor limită (SR EN 1990). Elementul central, specific FV, este că acțiunile determinante (vântul, conform CR 1-1-4/2012, și zăpada, conform CR 1-1-3/2012) se exercită pe unitatea de suprafață captatoare (kN/m²) și, prin urmare, pe structura unitară, independent de puterea totală a parcului. Vântul este de regulă mai defavorabil decât seismul, deoarece masa proprie a mesei este mică (forța seismică de bază, proporțională cu masa, rezultă redusă), în timp ce presiunea dinamică a vântului acționează pe o arie colectoare mare. Breviarul dezvoltă verificarea la **smulgere (uplift)** a piloților — acțiunea critică a construcțiilor fotovoltaice — pornind de la coeficienții de presiune netă pe planul înclinat al modulelor (efectele de acoperiș/marchiză) și de la capacitatea la extracție a pilotului determinată prin testele de probă (v. B). Numărul total de mese, piloți și posturi de transformare scalează liniar cu puterea instalată, ceea ce trebuie să reiasă explicit din breviar (relații de scalare), pentru ca la orice putere de proiect cititorul să poată reconstitui cantitățile.

**(b) Breviarul electric.** Documentează dimensionarea stringurilor (număr de module în serie, în funcție de tensiunea de intrare admisă a invertorului și de coeficientul de temperatură al modulelor la temperatura minimă de proiect), numărul de stringuri în paralel pe intrare MPPT, căderile de tensiune pe circuitele DC (limitate uzual sub 1–1,5% pentru minimizarea pierderilor), dimensionarea cablurilor solare DC (EN 50618) și a cablurilor AC de joasă și medie tensiune, alegerea și coordonarea protecțiilor (siguranțe de string, descărcătoare de supratensiune DC/AC de tip 1+2, protecții de interfață cu rețeaua conform cerințelor operatorului), precum și calculul prizei de pământ (pe baza rezistivității solului determinate în studiul geotehnic) și al instalației de protecție la trăsnet (SR EN 62305, nivel de protecție rezultat din analiza de risc). Coordonarea izolației și verificarea la scurtcircuit în punctul de racordare completează acest breviar.

**(c) Breviarul energetic.** Documentează estimarea producției anuale de energie plecând de la iradiația în planul modulelor (POA), aplicând lanțul de pierderi (soiling, temperatură, cablaj DC/AC, invertor, indisponibilitate, mismatch, degradare de an 1) care conduce la Performance Ratio-ul de proiect (PR ≈ 0,80–0,84). Rezultatele acestui breviar — energia anuală estimată și producția specifică țintă — devin, în secțiunea D, reperul față de care se evaluează performanța reală măsurată prin SCADA (v. cap. C.5). Este astfel un breviar care „traversează" ciclul de viață: elaborat în proiectare, dar folosit ca referință în exploatare.

Cele trei breviare sunt semnate de proiectanții de specialitate și, respectiv, verificate de verificatorii atestați pe cerințele aplicabile; ele nu se rezumă în fișa sinteză, ci se păstrează integral, întrucât orice repowering, extindere de putere sau reevaluare structurală (ex. după revizuirea hărților de vânt) pornește de la ipotezele și rezultatele consemnate aici.

---

## CAP. B — DOCUMENTAȚIA PRIVIND EXECUȚIA (Secțiunea B)

Capitolul B grupează piesele care atestă modul concret de realizare a parcului și calitatea materialelor și lucrărilor. Răspunde la întrebarea *„cum a fost realizat efectiv parcul?"*. La un parc FV, ponderea lucrărilor **ascunse** (piloți bătuți/înșurubați, cabluri DC/AC îngropate, priză de pământ) este mare, iar procesele-verbale de lucrări ascunse și buletinele de încercări specifice (smulgere piloți, curbe I-V, izolație, priză, PRAM) sunt piesele centrale.

### B.1 Autorizația de construire și predarea amplasamentului

- **Autorizația de construire (AC)** (copie) și anexele ei;
- **PV de predare-primire a amplasamentului** și a bornelor de reper topografic;
- **PV de trasare** a rândurilor de mese, drumurilor, PT și traseelor de cabluri (trasare topo pe Stereo 70).

### B.2 Certificate de calitate, DoP și trasabilitate — produse specifice FV

Produsele parcului au regim de trasabilitate serie–lot, esențial pentru garanții (10–30 ani):

| Produs | Document de calitate | Trasabilitate specifică |
|---|---|---|
| **Module fotovoltaice** | DoP / certificat IEC 61215 (rezistență mecanică), IEC 61730 (securitate), flash-test din fabrică | Serie unică per modul; asociere serie ↔ string ↔ masă (poziție în parc) |
| **Invertoare** (string/central) | Certificat conformitate, certificat de conformitate cu **Codul Rețelei (NC RfG / Ord. ANRE)** | Serie per invertor; firmware/setări de rețea |
| **Transformator(oare) PT** | Certificat, buletin de încercări din fabrică (raport de tip: rigiditate dielectrică ulei, raport transformare, pierderi) | Serie, putere kVA, tip ulei |
| **Cabluri DC (solar)** | DoP, certificat TÜV/EN 50618 (H1Z2Z2-K) | Lot, secțiune, lungime pe traseu |
| **Cabluri AC JT/MT** | DoP, certificat | Lot, secțiune, lungime |
| **Structuri metalice (mese)** | Certificat oțel + **certificat de zincare** (grosime strat Z, SR EN ISO 1461) | Lot, tip profil |
| **Piloți / șuruburi fundare** | Certificat oțel + zincare | Lot |
| **Celule MT, aparataj** | Certificate, buletine încercări dielectrice | Serie |

- **PV de recepție calitativă a materialelor** la aprovizionare, corelate cu certificatele/DoP de mai sus.

### B.3 Procese-verbale de lucrări ascunse — piese-cheie FV

Lucrările care devin inaccesibile controlului direct după acoperire, pentru care se încheie obligatoriu **PV de lucrări ascunse**:

| Lucrare ascunsă | Ce se verifică și consemnează |
|---|---|
| **Baterea / înșurubarea piloților** | Cota de îngropare (adâncimea de încastrare), verticalitatea, refuzul la batere (sau cuplul de înșurubare pentru ground screws), integritatea zincării |
| **Pozarea cablurilor DC îngropate** | Adâncimea de pozare, pat de nisip, banda avertizoare, raza de curbură, protecția mecanică (tuburi/dale), etanșarea la treceri |
| **Pozarea LES AC / MT îngropate** | Idem + distanțe de coexistență, marcaje, protecție la traversări (drumuri, alte rețele) |
| **Priza de pământ (electrozi îngropați)** | Traseul buclei/prizei, adâncimea, sudurile/îmbinările electrozi, legăturile la structuri și PT, continuitatea |
| **Radier / fundații PT (armare, cofraj)** | Armarea înainte de betonare, poziția pieselor înglobate, cota radierului |

### B.4 Procese-verbale de faze determinante

Fazele determinante sunt stabilite prin proiect și prin programul de control avizat de ISC; PV de fază determinantă autorizează continuarea execuției și se semnează de investitor (prin diriginte), executant, proiectant și **ISC**. Fazele determinante tipice ale unui parc FV:

| Nr. | Fază determinantă | Moment | Participanți | Ce se atestă |
|---|---|---|---|---|
| FD-1 | **Piloți de probă și teste de smulgere (pull-out)** | Înainte de baterea în serie | ISC, proiectant, geotehnician, executant, diriginte | Capacitatea portantă la smulgere/împingere; validarea soluției de fundare |
| FD-2 | **Fundare piloți (câmp de mese)** | La finalizarea baterii pe zone | ISC (după caz), proiectant, executant, diriginte | Cotele, verticalitatea, refuzul, aliniamentul |
| FD-3 | **Radier / fundație post(uri) de transformare** | Înainte de betonare (armare) | ISC, proiectant structură, executant, diriginte | Armarea, cofrajul, piesele înglobate |
| FD-4 | **Priza de pământ și instalația de protecție la trăsnet** | Înainte de acoperire | ISC (după caz), proiectant Ie, executant, diriginte | Traseul, sudurile, valoarea măsurată R_priză |
| FD-5 | **Montaj și racordare posturi de transformare / stație** | Înainte de PIF | ISC (după caz), proiectant Ie, executant, diriginte, OD | Montajul, protecțiile, buletinele PRAM |

> Numărul de PV-uri de fază determinantă **scalează cu P_DC**: la un parc de 2 MWp (ex. un singur PT de 1.600 kVA) există un set FD-3/FD-5; la parcuri mari (mai multe PT + stație de racord), fazele FD-3 și FD-5 se repetă pe fiecare unitate.

### B.5 Buletine de încercări — specificul FV

Buletinele se emit de **laborator/personal autorizat (ISC / RENAR / atestat ANRE-PRAM)** și sunt condiție a punerii în funcțiune și piese de referință pentru urmărirea în timp:

| Buletin / încercare | Standard / normativ | Rol în Cartea tehnică |
|---|---|---|
| **Test de smulgere (pull-out) piloți de probă** | NP 123-2010 / SR EN 1997 | Validează capacitatea la uplift — acțiunea critică FV; piesă a FD-1 |
| **Buletin curbe I-V pe string / invertor** (măsurare I-V curve tracer) | IEC 62446-1 | **Curbe de referință** la PIF pentru urmărirea degradării (KPI); piesă esențială |
| **Buletin măsurare rezistență de izolație** DC (module/stringuri) și AC | IEC 62446-1 / I7-2011 | Starea de izolație inițială; reper pentru mentenanță |
| **Buletin priză de pământ** (valoarea R_priză) | I7-2011 / SR EN 62305 | Condiție de siguranță; reper urmărire |
| **Buletin continuitate legături de echipotențializare / IPT** | SR EN 62305 | Protecția la trăsnet; reper urmărire |
| **Buletine PRAM la PT / stație** (rezistență izolație transformator, verificare protecții, rigiditate ulei, raport de transformare) | PE 116/1994 / NTE 002/2003 | Condiție de PIF; reper urmărire periodică |
| **Buletin verificare polaritate / secvență faze / funcționalitate protecții AC** | IEC 62446-1 | Punerea în funcțiune corectă a invertoarelor |
| **Certificat de zincare (grosime strat)** | SR EN ISO 1461 | Durabilitatea anticorozivă a structurilor (25–30 ani) |

> Cantitatea de buletine I-V și izolație **scalează cu numărul de stringuri/invertoare**: ex. la 2 MWp cu invertoare string (~40–50 invertoare, câteva sute de stringuri), se emit buletine pe fiecare string/invertor conform IEC 62446-1. Setul complet formează „amprenta electrică de referință" a parcului.

### B.6 Alte piese ale secțiunii B

- **Dispozițiile de șantier** ale proiectantului și **notele de constatare**, cu efectele asupra proiectului;
- **Jurnalul de șantier** (registrul de evidență a lucrărilor): cronologia execuției, condiții meteo relevante (vânt/precipitații — importante la montaj mese/module), întreruperi, evenimente;
- **PV de probe și punere în funcțiune** a echipamentelor (invertoare, PT, SCADA), inclusiv testul de comunicație/telecontrol cu OD (cerință de racordare);
- **Planurile „as built"**: layout final al meselor și rândurilor, traseele reale ale cablurilor DC/AC/MT îngropate, poziția prizei de pământ și a IPT, poziția PT/stației, cu abaterile față de proiect;
- Documentele privind **gestiunea deșeurilor** din execuție (ambalaje module/invertoare, resturi cabluri).

### B.7 Observații privind procesele-verbale de lucrări ascunse la parcul FV

Ponderea și importanța lucrărilor ascunse justifică o atenție specială la modul de întocmire a proceselor-verbale corespunzătoare, deoarece ele probează calitatea unor lucrări ce nu mai pot fi verificate vizual după acoperire și care condiționează atât siguranța (priza de pământ, izolația cablurilor), cât și mentenanța ulterioară (localizarea traseelor îngropate).

La **baterea/înșurubarea piloților**, procesul-verbal trebuie să consemneze, pentru fiecare zonă/rând, adâncimea de încastrare efectiv realizată în comparație cu cea de proiect, verticalitatea în limitele de toleranță (abaterea unghiulară afectează geometria mesei și, implicit, planeitatea câmpului de module), refuzul la batere sau cuplul de înșurubare (pentru șuruburile elicoidale — ground screws), precum și integritatea stratului de zincare după operațiune (o zincare deteriorată la cap inițiază coroziunea, care în teren agresiv poate reduce durata de viață a fundației sub cei 25–30 de ani preconizați). Corelarea cu buletinele testelor de smulgere (FD-1) este obligatorie: soluția de fundare validată pe piloții de probă este cea care se aplică în serie.

La **pozarea cablurilor DC și AC/MT îngropate**, procesul-verbal consemnează adâncimea de pozare, patul și acoperirea de nisip, banda avertizoare montată deasupra, raza minimă de curbură respectată (esențială pentru integritatea izolației cablurilor solare), protecția mecanică la traversări (tuburi de protecție, dale) și etanșarea la trecerile prin fundații sau pereți de PT. Aceste consemnări, împreună cu planul „as built" al traseelor, sunt vitale pentru siguranța oricărei lucrări ulterioare de săpătură pe amplasament — un traseu DC neconsemnat corect reprezintă un risc real de electrocutare/arc la intervenții de mentenanță.

La **priza de pământ**, procesul-verbal descrie traseul buclei perimetrale și al electrozilor, adâncimea de îngropare, tipul și execuția îmbinărilor (sudură aluminotermică sau cleme certificate), legăturile la structurile metalice ale meselor, la carcasele invertoarelor și la postul de transformare, precum și valoarea rezistenței de dispersie măsurate imediat după realizare (comparată cu valoarea de proiect). Această valoare devine reperul de referință pentru urmărirea din secțiunea D — creșterea rezistenței prizei în timp (coroziunea electrozilor, uscarea solului) este un fenomen urmărit anual.

---

## CAP. C — DOCUMENTAȚIA PRIVIND RECEPȚIA + EXPLOATAREA ȘI URMĂRIREA COMPORTĂRII ÎN TIMP (Secțiunile C + D)

Capitolul C acoperă, conform temei, atât **recepția** (Secțiunea C, HG 273/1994 mod. HG 343/2017), cât și **exploatarea, mentenanța și urmărirea comportării în timp** (Secțiunea D, P130/1999) — inclusiv piesele specifice de sector energetic (Licența ANRE, Certificatul de racordare) și monitorizarea KPI de performanță.

### C.1 Recepția lucrărilor (HG 273/1994 mod. HG 343/2017)

Recepția se desfășoară în două etape distincte:

- **Recepția la terminarea lucrărilor (RTL):** comisia numită de investitor (cu participarea obligatorie a proiectantului și dirigintelui, iar la anumite categorii — cu invitarea ISC) examinează lucrarea, verifică documentele și **existența Cărții tehnice constituite** (secțiunile A, B și instrucțiunile din D). Poate: admite; admite cu obiecții și termene de remediere; sau respinge/amâna.
- **Recepția finală (RF):** se convoacă după expirarea perioadei de garanție, luând în considerare comportarea parcului în această perioadă (producția reală vs. estimat, PR, defecte remediate).

**Piese ale secțiunii C:**

| Piesă | Emitent | Observații FV |
|---|---|---|
| **PV de recepție la terminarea lucrărilor (RTL)** + anexe | Comisia RTL | Lista obiectelor (câmp de mese, PT, stație, drumuri, împrejmuire), lista remedierilor, valoarea |
| **Referatul proiectantului** privind execuția | Proiectant general + Ie | Calitatea lucrărilor față de proiect (structură + instalații) |
| **Referatul dirigintelui / RTE** | Diriginte de șantier | Sinteza controalelor pe faze |
| **Documente PIF / punere sub tensiune** | OD + executant + investitor | PV de punere sub tensiune (energizare) a PT/stației și a invertoarelor |
| **Buletinele PRAM finale** | Personal autorizat | Condiție de energizare |
| Acte de constatare ISC (după caz) | ISC | — |
| **PV de recepție finală (RF)** + referate comportare în garanție | Comisia RF | După perioada de garanție |

> **Interfața recepție–energie:** punerea sub tensiune (energizarea) și începerea evacuării în rețea sunt condiționate de **Certificatul de racordare** emis de OD (după probele de PIF și confirmarea buletinelor PRAM), iar exploatarea comercială (vânzarea energiei) — de **Licența de producere ANRE**. RTL a construcțiilor/instalațiilor și PIF energetic sunt evenimente corelate, dar distincte, ambele consemnate în Cartea tehnică.

**Relația RTL — garanție — RF:**

| Etapă | Ce constată la parcul FV | Efect asupra Cărții tehnice |
|---|---|---|
| **RTL** | Lucrări terminate conform proiect; Cartea tehnică constituită; PIF realizat | Secțiunea C; predarea Cărții tehnice; început perioadă de garanție |
| **Perioadă de garanție** | PR real, disponibilitate, defecte de tinerețe (invertoare, module hot-spot) remediate în garanție | Prime înscrieri secțiunea D (jurnal, KPI, remedieri) |
| **RF** | Comportarea în garanție; producția confirmată; degradarea în limite | Secțiunea C; predarea Cărții tehnice complete |

### C.2 Piese specifice de sector energetic (secțiunile C și D)

| Piesă | Emitent | Rol | Secțiune |
|---|---|---|---|
| **Certificat de racordare** | OD (Distribuție/Transelectrica) | Confirmă racordarea și permite punerea sub tensiune | C |
| **Licența de producere a energiei electrice** | ANRE | Permite exploatarea comercială (vânzarea energiei) | C/D |
| **Contract de racordare** și **Contract de exploatare/mentenanță a instalației de racordare** | OD | Regimul relației cu rețeaua | D |
| **Contract de furnizare/PPA și avize de dispecer (dispecerizare)** | Furnizor / OD-OTS | Regimul de injecție în SEN | D |
| **Programul de mentenanță convenit cu OD** pentru echipamentele de racordare | OD | Revizii periodice PT/stație | D |

### C.3 Exploatarea și mentenanța (Secțiunea D) — program specific FV

Secțiunea D se deschide la recepție și se completează pe **toată durata de exploatare** (25–35 ani). Instrucțiunile de exploatare și programul de mentenanță trebuie să fie **specifice parcului**:

**Program de mentenanță (preventivă) — tabel parametric:**

| Activitate de mentenanță | Periodicitate tipică | Scalare cu P_DC / observații |
|---|---|---|
| **Inspecție vizuală generală** (mese, module fisurate, conexiuni, împrejmuire) | Trimestrial | Proporțional cu suprafața parcului |
| **Curățare module (spălare — soiling)** | 1–2×/an (mai des în zone praf/agricole) | Volum apă/manoperă ∝ nr. module = P_DC / P_modul |
| **Termografie IR module și conexiuni** (dronă IR la parcuri mari) | Anual | Detectează hot-spots, diode bypass defecte, conexiuni slabe; efort ∝ suprafață |
| **Cosire vegetație / management teren** | 2–4×/an sezonier | ∝ suprafață teren |
| **Verificare invertoare** (curățare filtre, ventilatoare, firmware, log erori) | Semestrial / anual | ∝ nr. invertoare |
| **Măsurare rezistență de izolație și priză de pământ** | Anual | ∝ nr. stringuri; comparare cu buletinele de referință B.5 |
| **Verificări PRAM la PT / stație** (revizie, analiză ulei, protecții) | Anual / conform OD | ∝ nr. PT |
| **Strângere cuplu conexiuni electrice** (torque check) | Anual | ∝ nr. conexiuni |
| **Verificare structuri (coroziune, prinderi, cliplocuri module)** | Anual + după evenimente vânt | ∝ nr. mese |
| **Verificare sistem SCADA / monitorizare / securitate** | Continuu + revizie anuală | — |

> **Mentenanță corectivă:** înlocuirea modulelor defecte (respectând trasabilitatea serie–poziție din B.2), a invertoarelor (garanție/RMA), remedierea defectelor de string; fiecare intervenție se consemnează în jurnalul evenimentelor cu seria componentei înlocuite.

### C.4 Urmărirea comportării în timp (P130/1999)

**Urmărirea curentă** (obligatorie, toate construcțiile) — inspecție vizuală și măsurători simple, la periodicitatea din program și **după fiecare eveniment excepțional** (furtună/vânt puternic, grindină, inundație, cutremur resimțit):

| Domeniu urmărit | Ce se urmărește | Semn de alarmă |
|---|---|---|
| **Structuri mese / piloți** | Coroziune, deformații, slăbirea prinderilor, ridicare/tasare piloți, aliniament rânduri | Piloți smulși/înclinați după vânt puternic; deformații |
| **Fundații / radiere PT** | Tasări, fisuri, umezeală | Tasare diferențială, fisuri active |
| **Module** | Fisuri (grindină), delaminare, decolorare (PID), hot-spot, geam spart | Module fisurate în serie; hot-spot la termografie |
| **Instalații electrice DC/AC** | Coroziune conectori, izolație cabluri, arc/urme de supraîncălzire | Cădere izolație sub prag; urme de arc |
| **Priză de pământ / IPT** | Valoarea R_priză, continuitate, coroziune electrozi | R_priză peste valoarea admisă |
| **PT / transformator** | Nivel/analiză ulei, temperatură, protecții, zgomot | Depășire prag ulei/temperatură; declanșări repetate |
| **Drumuri / împrejmuire / securitate** | Accesibilitate, integritate gard, funcționare CCTV/detecție | Breșe în perimetru; sistem indisponibil |

**Urmărirea specială** (dacă o impun categoria de importanță/amplasamentul — ex. teren cu tasări, versant, seismicitate ridicată): măsurare instrumentală a tasărilor/deplasărilor piloților și PT, cu **valori de referință** (la PIF) și **praguri de atenție / avertizare / alarmare**; depășirea unui prag impune analiză/expertiză/măsuri și consemnare în jurnal.

### C.5 Monitorizarea KPI de performanță — reper energetic al urmăririi

Specificul urmăririi unui parc FV este monitorizarea continuă (SCADA) a **indicatorilor de performanță**, cu logurile arhivate ca parte a secțiunii D și raportate periodic. KPI de referință:

| KPI | Definiție / formulă | Valoare de referință | Rol în Cartea tehnică |
|---|---|---|---|
| **Performance Ratio (PR)** | PR = E_real / (P_DC × POA / G_STC); raportul dintre energia produsă și cea teoretic posibilă | 0,80–0,84 (parcuri noi bine întreținute) | Indicator sintetic de „sănătate"; scădere = soiling/defecte |
| **Disponibilitate (Availability)** | timp de funcționare / timp total (ponderat pe putere) | > 98–99% | Măsoară fiabilitatea invertoare/rețea |
| **Producția specifică (Specific Yield)** | E_anual [kWh] / P_DC [kWp] = kWh/kWp·an | 1.100–1.350 kWh/kWp·an (RO) | Compară cu estimarea din SF |
| **Rata de degradare** | scăderea anuală a puterii/PR (comparat cu curbele I-V de referință B.5) | ≤ 0,5–0,7%/an (garanție module) | Verifică respectarea garanției de performanță |
| **Energie evacuată în SEN** | contorizare la punctul de racordare | conform ATR/certificat | Baza decontării și a raportării ANRE |

> Curbele I-V de referință din B.5 și producția specifică estimată din SF (secțiunea A) sunt **reperele** față de care se evaluează degradarea; aceasta este legătura directă între secțiunile A/B și urmărirea din D — un lanț de trasabilitate energetică pe 25–35 ani.

**Interpretarea KPI în urmărirea comportării în timp.** Monitorizarea KPI nu este un exercițiu financiar, ci un instrument tehnic de diagnoză, corelat cu urmărirea curentă P130/1999. O scădere a Performance Ratio-ului sub valoarea de referință, la aceeași iradiație, semnalează una dintre cauzele tipice care se investighează în ordine: **soiling** (murdărire a modulelor — se corectează prin curățare, iar recuperarea PR după spălare confirmă diagnoza), **umbriri noi** apărute (vegetație necosită, obstacole), **defecte de string** (siguranțe arse, conectori corodați — vizibile ca abateri între invertoare comparabile), **hot-spots și diode bypass defecte** (localizate prin termografie IR), **degradarea indusă de potențial (PID)** sau **degradarea normală** a modulelor. Fiecare diagnoză conduce la o măsură de mentenanță consemnată în jurnalul evenimentelor, iar rezultatul măsurii (revenirea KPI) închide bucla. Rata de degradare măsurată se compară anual cu panta garantată de producător (uzual ≤ 0,5–0,7%/an după anul 1): depășirea susținută a acestei pante activează procedura de garanție de performanță, care se probează exclusiv prin măsurări comparate cu curbele I-V de referință din secțiunea B. Astfel, secțiunea D a Cărții tehnice devine, la parcul FV, un instrument activ de protejare a valorii activului, nu doar o evidență pasivă.

### C.6 Garanțiile și relația cu producătorii

Piese ale secțiunii D, cu regim de urmărire propriu:

| Garanție | Durată tipică | Ce acoperă | Trasabilitate |
|---|---|---|---|
| **Garanție de produs module** | 10–12 ani | Defecte de fabricație | Serie modul ↔ poziție (B.2) |
| **Garanție de performanță module** | 25–30 ani | Menținerea puterii peste un prag (ex. ≥ 84–87% la 25 ani) | Curbe I-V referință (B.5) + măsurări periodice |
| **Garanție invertoare** | 5–10 ani (extensibilă) | Defecte; înlocuire RMA | Serie invertor |
| **Garanție structuri (anticorozivă)** | ~25 ani | Zincare | Certificat zincare (B.2) |
| **Garanție lucrări (executant)** | conform contract | Vicii de execuție | Secțiunea C — perioadă de garanție |

Invocarea garanției de performanță a modulelor se face **pe baza măsurărilor comparate cu curbele I-V de referință** din Cartea tehnică — motiv pentru care aceste buletine sunt piese esențiale, nu formale.

### C.7 Postutilizarea — dezafectarea și reciclarea DEEE

La finalul duratei de viață, secțiunea D se completează cu documentele de postutilizare, cu specific FV pronunțat (reversibilitate + DEEE):

- **Expertiză tehnică** a stării (dacă e cazul) și **proiect de dezafectare**;
- **Autorizație de desființare** (Legea 50/1991);
- **Plan de gestiune a deșeurilor** cu tratare distinctă a **DEEE** (OUG 5/2015 / Directiva DEEE): modulele fotovoltaice sunt DEEE reciclabile (recuperare sticlă ~ 70% din masă, aluminiu ramă, siliciu, argint, cupru; invertoare și cabluri — reciclare metale); uleiul transformatorului — gestionat ca deșeu periculos;
- **Readucerea terenului la starea agricolă** (dat fiind că fundarea pe piloți/șuruburi este reversibilă, fără impermeabilizare majoră) — avantaj de mediu specific FV, consemnat ca reper de proiectare încă din secțiunea A;
- **PV de recepție a lucrărilor de desființare**, radierea cadastrală și **arhivarea Cărții tehnice** conform reglementărilor Fondului Arhivistic Național.

---

## 3. Capitolul de prezentare și Fișa de date sinteză a parcului FV

Capitolul de prezentare deschide Cartea tehnică și cuprinde **Fișa de date sinteză** + **centralizatorul (borderoul general)** + lista factorilor implicați și datele de identificare.

**Fișa de date sinteză** — conținut recomandat, cu rubricile specifice FV:

| Rubrică | Conținut (specific parc FV) |
|---|---|
| **Identificare** | Denumire CEF; amplasament (extravilan UAT/județ); nr. cadastral/CF |
| **Investitor / proprietar / titular licență** | Denumire, CUI, calitate juridică |
| **Factori implicați** | Proiectant general + Ie; verificatori atestați (A, Af, Ie, B); executant; diriginte; RTE; laboratoare; personal PRAM autorizat; operator de rețea (OD/OTS) |
| **Date energetice** | **P_DC [kWp]**, **P_AC [kW]**, raport DC/AC; nr. module × P_modul; nr. invertoare; nr. și putere PT [kVA]; tensiune de racordare (20/110 kV); punct de racordare |
| **Autorizare** | CU; AC; **ATR**; **Autorizație de înființare ANRE**; **Certificat de racordare**; **Licență de producere** (nr./dată) |
| **Caracteristici construcții** | Nr. mese; tip structură (fixă/tracker); tip piloți; suprafață teren; drumuri; împrejmuire |
| **Încadrare normativă** | Categoria de importanță (uzual **C** — normală; drumuri/gard **D**); clasa de importanță seismică (uzual **III**, γI = 1,0); acțiune determinantă: **vânt** |
| **Producție** | POA [kWh/m²·an]; E_anual estimat [MWh]; PR estimat; specific yield estimat |
| **Date de execuție** | Data începerii; terminării; RTL; PIF (punere sub tensiune); RF |
| **Urmărire în timp** | Tip (curentă / specială — P130); responsabil; periodicitate; KPI monitorizați |
| **Postutilizare** | Angajament dezafectare + reciclare DEEE + readucere teren |

Fișa se completează la constituire și se actualizează la evenimente majore (repowering — înlocuirea modulelor/invertoarelor cu tehnologie nouă, extindere de putere, schimbare de titular/licență).

---

## 4. Centralizatorul (borderoul) pieselor din dosarele A–D

Centralizatorul este cheia de acces în Cartea tehnică; la un parc FV, volumul de piese seriale (buletine I-V, certificate module) impune și borderouri de detaliu (liste de serii). Model de borderou general:

| Nr. crt. | Cod dosar | Denumirea piesei | Emitent | Nr./data | Nr. file | Original/copie | Localizare | Observații |
|---|---|---|---|---|---|---|---|---|
| 1 | A.3 | ATR (aviz tehnic de racordare) | OD | ... | ... | copie conformă | dosar A | soluție racordare |
| 2 | A.3 | Autorizație de înființare ANRE | ANRE | ... | ... | copie conformă | dosar A | Legea 123/2012 |
| 3 | A.5 | Referat verificator Ie | Verificator atestat | ... | ... | original | dosar A | instalații electrice |
| 4 | B.4 | PV fază determinantă piloți probă (smulgere) | ISC/proiectant/geo/exec./diriginte | ... | ... | original | dosar B | FD-1 |
| 5 | B.5 | Buletine curbe I-V referință (set stringuri) | Laborator autorizat | ... | ... | original | dosar B | IEC 62446-1; listă serii |
| 6 | B.5 | Buletine PRAM PT | Personal autorizat | ... | ... | original | dosar B | condiție PIF |
| 7 | C.1 | PV recepție la terminarea lucrărilor | Comisia RTL | ... | ... | original | dosar C | cu anexe |
| 8 | C.2 | Certificat de racordare | OD | ... | ... | copie conformă | dosar C | permite PIF |
| 9 | C.2 | Licența de producere | ANRE | ... | ... | copie conformă | dosar C | exploatare comercială |
| 10 | D.2 | Program urmărire în timp (P130) + KPI | Proiectant / operator | ... | ... | original | dosar D | curentă/specială |

---

## 5. Jurnalul evenimentelor — specific parc FV

Jurnalul evenimentelor este piesa centrală a secțiunii D și instrumentul prin care Cartea tehnică rămâne „vie" pe 25–35 ani. Se înscrie **cronologic**, imediat după producerea/constatarea evenimentului, de către proprietar/operator prin responsabilul cu urmărirea comportării în timp, iar la intervenții — de proiectant/executant/diriginte.

**Tipuri de evenimente specifice parcului FV:**

| Tip eveniment | Ce se consemnează | Cine |
|---|---|---|
| **Urmărire curentă** | Inspecții periodice; coroziune, prinderi, module fisurate, izolație, priză | Responsabil urmărire |
| **KPI / performanță** | PR, disponibilitate, specific yield, rata de degradare (față de referință) | Operator O&M |
| **Evenimente meteo excepționale** | Vânt puternic/furtună (piloți smulși/mese deformate), grindină (module fisurate), inundație, cutremur | Responsabil urmărire |
| **Incidente electrice** | Arc DC, declanșări repetate, defect invertor/transformator, incendiu de echipament | Operator O&M |
| **Mentenanță corectivă** | Înlocuire module (serie ↔ poziție), invertoare (RMA), remediere string | Operator O&M |
| **Repowering / extindere** | Înlocuire tehnologie, creștere putere; reevaluare ATR/licență/structură | Proprietar / proiectant |
| **Relația cu OD/ANRE** | Revizii impuse de OD; verificări PRAM; modificări de licență | Operator / OD / ANRE |
| **Schimbare titular / vânzare parc** | Act de înstrăinare; predarea Cărții tehnice; transferul licenței | Părți |

**Model — Jurnalul evenimentelor:**

| Nr. | Data | Tip eveniment | Descriere | Măsuri luate/dispuse | Referință document (dosar D) | Nume, calitate, semnătură |
|---|---|---|---|---|---|---|
| 1 | zz.ll.aaaa | Urmărire curentă | Inspecție trimestrială — fără degradări | Menținere program | Fișa urmărire nr. ... | responsabil urmărire |
| 2 | zz.ll.aaaa | KPI | PR = 0,82; specific yield conform estimat | — | Raport lunar SCADA nr. ... | operator O&M |
| 3 | zz.ll.aaaa | Eveniment meteo | Furtună — 3 mese cu piloți deplasați | Inspecție structuri; refixare/refacere piloți | Raport inspecție nr. ... | responsabil urmărire |
| 4 | zz.ll.aaaa | Corectivă | Înlocuire invertor string (serie ...) | RMA producător; refacere buletin I-V | PV intervenție nr. ... | operator O&M |
| 5 | zz.ll.aaaa | Schimbare titular | Vânzare parc | Predare-primire Carte tehnică; transfer licență | PV predare nr. ... | părți |

Jurnalul este **piesă unică și continuă**: nu se închide la schimbarea proprietarului/titularului licenței, ci se transmite odată cu Cartea tehnică. Absența înscrierilor pe perioade lungi indică neîndeplinirea obligației de urmărire.

---

## 6. Întocmirea, completarea, folosirea și păstrarea

### 6.1 Întocmirea și fluxul de constituire

Cartea tehnică se **întocmește de investitor**, coordonarea operativă în execuție revenind **dirigintelui de șantier**, care adună piesele secțiunilor A și B și le organizează pe dosare/borderouri, în paralel cu execuția. La parcul FV, dirigintele verifică suplimentar corelarea pieselor de sector energetic (ATR ↔ soluție de racordare realizată; buletine PRAM ↔ energizare; certificat de racordare ↔ PIF).

**Fluxul cronologic de constituire (cine, ce, când) — specific FV:**

| Etapă | Moment | Cine depune | Ce se adaugă |
|---|---|---|---|
| Proiectare | Înainte de autorizare | Proiectant + verificatori | Secțiunea A: SF, PT, DE, referate, breviare (vânt/smulgere/electric) |
| Avize energetice | Înainte de AC | Investitor | ATR, Autorizație de înființare ANRE, avize (A) |
| Autorizare | La emiterea AC | Investitor | AC + avize construcții (A/B) |
| Piloți de probă | Început execuție | Executant + geo + proiectant | FD-1 + buletine smulgere (B) |
| Execuție | Continuu | Executant + diriginte | PV lucrări ascunse (piloți, cabluri, priză), FD, DoP/certificate, jurnal șantier (B) |
| Finalizare + PIF | Înainte de RTL | Executant + proiectant + OD | Buletine I-V/izolație/priză/PRAM; „as built"; program mentenanță (B + deschidere D) |
| Punere sub tensiune | PIF | OD + executant | Certificat de racordare; PV punere sub tensiune (C) |
| RTL | Recepția | Comisia + diriginte + proiectant | PV RTL + referate (C) |
| Licențiere | Exploatare comercială | ANRE | Licența de producere (C/D) |
| Garanție → RF | Până la RF | Operator + responsabil urmărire | Jurnal, KPI, remedieri; PV RF (C+D) |
| Exploatare | 25–35 ani | Operator O&M | Rapoarte urmărire, KPI, mentenanță, intervenții (D) |
| Postutilizare | Dezafectare | Proprietar + proiectant desființare | Expertiză, proiect, autorizație desființare, plan DEEE, PV recepție (D) |

### 6.2 Responsabilități pe factori

| Factor | Obligații privind Cartea tehnică a parcului FV |
|---|---|
| **Investitorul / titular licență** | Asigură întocmirea; obține/depune piesele A–B și cele energetice (ATR, autorizație înființare); predă Cartea tehnică la RF |
| **Proiectantul (general + Ie)** | Predă secțiunea A (proiect verificat, breviare, caiete de sarcini, referate); elaborează instrucțiunile de exploatare și programul de urmărire (D); consemnează dispozițiile de șantier |
| **Executantul (atestat ANRE pt. instalații electrice)** | Predă secțiunea B (PV lucrări ascunse/FD, buletine, DoP/certificate, „as built", jurnal șantier) |
| **Dirigintele / RTE** | Coordonează și verifică Cartea tehnică pe șantier; corelează piesele de sector energetic; referat pentru recepție |
| **Laborator / personal PRAM** | Emit buletinele (smulgere, I-V, izolație, priză, PRAM) — piese B |
| **Operatorul de rețea (OD/OTS)** | Emite ATR și Certificatul de racordare; participă la PIF; impune revizii periodice |
| **ANRE** | Emite Autorizația de înființare și Licența de producere |
| **Proprietarul / operatorul O&M** | Preia și păstrează Cartea tehnică; completează secțiunea D (urmărire, KPI, mentenanță, evenimente); o predă la înstrăinare; numește responsabilul cu urmărirea |

### 6.3 Folosirea și păstrarea

- Se păstrează pe **toată durata de existență** a parcului (25–35 ani), de către proprietar/operator, în condiții care previn deteriorarea, cu **copie electronică de siguranță** (recomandat, în locație distinctă — inclusiv arhiva logurilor SCADA);
- La **înstrăinarea parcului** (tranzacție de activ, foarte frecventă în sectorul FV), Cartea tehnică se **predă noului proprietar/titular**, cu PV; ea este obiectul central al **due diligence tehnic** al cumpărătorului/finanțatorului;
- Se pune la dispoziția organelor de control (ISC), a OD/ANRE, a experților și a comisiilor de recepție;
- La dezafectare, se completează cu documentele de postutilizare și se **arhivează**.

### 6.4 Deficiențe frecvente de evitat (specific FV)

- Lipsa **curbelor I-V de referință** (B.5) — face imposibilă invocarea garanției de performanță a modulelor;
- **As built" eronat al traseelor de cabluri DC/AC îngropate** — periculos la mentenanță/săpături ulterioare;
- Secțiunea D „îngheață" după PIF (fără KPI, fără jurnal) — pierderea trasabilității de performanță și a bazei de garanție;
- Necorelarea seriilor module ↔ poziție — imposibilitatea RMA/înlocuirii țintite;
- Nepredarea Cărții tehnice la vânzarea parcului — blochează tranzacția.

---

## 7. Contravenții, răspunderi și relația cu alte evidențe

**Legea 10/1995** instituie regimul de contravenții pentru neîntocmirea/necompletarea/nepredarea/nepăstrarea Cărții tehnice și pentru neefectuarea urmăririi comportării în timp; controlul se exercită de **ISC**. La parcul FV, la acest regim se adaugă **obligațiile din Legea 123/2012 și din licența ANRE** (respectarea condițiilor de exploatare, raportări, mentenanța instalației de racordare), a căror nerespectare atrage sancțiuni ANRE distincte.

Răspunderea este **individualizată pe fapta fiecărui factor** (investitor, proiectant, executant, diriginte/RTE, proprietar/operator). Răspunderea pentru viciile ascunse ale **structurii de rezistență** (mese, piloți, fundații PT) este pe toată durata de existență; Cartea tehnică este proba esențială în stabilirea originii viciului.

**Relația cu alte evidențe:**
- **Cadastru / CF** — corelate prin nr. cadastral din fișa sinteză; la dezafectare, radiere după recepția desființării;
- **Documentațiile de urbanism (CU/PUZ)** — reflectate în secțiunea A;
- **Cartea tehnică a echipamentelor** (transformatoare, celule MT) — se atașează/corelează cu secțiunile B și D; reviziile periodice se consemnează în D;
- **SCADA / sistemul de monitorizare** — logurile de performanță arhivate sunt parte a secțiunii D (reper KPI).

---

## 8. Concluzii și model de proces-verbal de predare-primire

### 8.1 Concluzii

Cartea tehnică a unui parc fotovoltaic este documentul de referință pe întreaga durată de viață a Centralei Electrice Fotovoltaice (25–35 ani). Ea integrează, într-o structură unitară A–D (Anexa 6 la HG 766/1997), atât piesele clasice de construcții (proiectare verificată, PV de faze determinante și lucrări ascunse, buletine, „as built", recepție, urmărire P130/1999), cât și **piesele specifice de sector energetic** (ATR, Autorizația de înființare, Certificatul de racordare, Licența de producere, buletinele PRAM și I-V). Specificul FV impune un accent aparte pe: verificarea structurală la **vânt și smulgere** (secțiunea A), procesele-verbale de **lucrări ascunse** (piloți, cabluri DC/AC, priză — secțiunea B), **curbele I-V de referință** (baza garanției de performanță) și monitorizarea continuă a **KPI** (PR, disponibilitate, specific yield, degradare — secțiunea D). La final, postutilizarea are componentă proprie de **reciclare DEEE** și de **readucere reversibilă a terenului** la starea agricolă.

**Sinteza obligațiilor esențiale:**
1. Cartea tehnică se **întocmește** de investitor (prin diriginte), pe secțiunile A–D, cu piesele energetice atașate;
2. Proiectul (secțiunea A) trebuie **verificat** (A, Af, Ie, B după caz) și elaborat de proiectant **atestat ANRE** pentru instalații electrice;
3. Secțiunile B și C conțin piese **originale** care angajează răspunderea (PV faze determinante/lucrări ascunse, buletine, referate);
4. Cartea tehnică este **precondiție a recepției**, iar punerea sub tensiune este condiționată de **Certificatul de racordare**; exploatarea comercială — de **Licența ANRE**;
5. Secțiunea D se **completează permanent** (urmărire P130, KPI, mentenanță, jurnal evenimente) pe 25–35 ani;
6. Cartea tehnică se **păstrează** pe toată durata și se **predă la înstrăinarea parcului** (obiect central al due diligence);
7. La dezafectare — documente de postutilizare + **gestiune DEEE** + arhivare.

### 8.2 Model — Proces-verbal de predare-primire a Cărții tehnice (parc FV)

```
PROCES-VERBAL DE PREDARE-PRIMIRE A CĂRȚII TEHNICE A CONSTRUCȚIEI
— CENTRALĂ ELECTRICĂ FOTOVOLTAICĂ —

Nr. ______ / data __________

Obiectivul: Parc fotovoltaic (CEF), P_DC = ______ kWp / P_AC = ______ kW
Amplasament / adresă: __________________________________
Nr. cadastral / CF: ____________________________________
Racordare: tensiune ____ kV, punct de racordare ______________
ATR nr. ____   Autorizație de înființare ANRE nr. ____
Certificat de racordare nr. ____   Licență de producere nr. ____
Categoria de importanță: __ (uzual C)   Clasa seismică: ___ (uzual III)

Încheiat între:
  PREDĂTOR: _____________________ (investitor / proprietar / titular anterior),
    reprezentat prin _________________, în calitate de _____________;
  PRIMITOR: _____________________ (proprietar / operator / titular licență),
    reprezentat prin _________________, în calitate de _____________.

Se predă/primește CARTEA TEHNICĂ A CONSTRUCȚIEI, întocmită conform
Legii 10/1995, Anexei 6 la HG 766/1997 și legislației de sector
(Legea 123/2012, Ord. ANRE), cuprinzând:

  [ ] Capitolul de prezentare (fișa sinteză + centralizatorul)
  [ ] Secțiunea A — Proiectare (SF/PT/DE, referate, ATR,
      Autorizație de înființare ANRE, avize) .......... dosare: ___
  [ ] Secțiunea B — Execuție (AC, PV faze determinante și
      lucrări ascunse, buletine smulgere/I-V/izolație/
      priză/PRAM, certificate/DoP, „as built") ........ dosare: ___
  [ ] Secțiunea C — Recepție (PV RTL/RF, Certificat de
      racordare, PV punere sub tensiune, Licența ANRE) . dosare: ___
  [ ] Secțiunea D — Exploatare, mentenanță, urmărire P130,
      KPI (PR/availability/yield/degradare), jurnalul
      evenimentelor, garanții, postutilizare/DEEE ...... dosare: ___

Total dosare: ____   Total file: ____   Suport: hârtie / electronic
Arhivă SCADA / loguri de performanță predate: da / nu

Observații privind starea și completitudinea documentelor:
(curbe I-V referință complete; „as built" cabluri DC/AC; buletine
PRAM; corelare serii module ↔ poziție)
_______________________________________________________________

Odată cu predarea, primitorul preia obligațiile de completare,
folosire și păstrare a Cărții tehnice pe durata de existență a
centralei, precum și obligațiile ce decurg din licența ANRE și
din contractul de racordare, și obligația de a preda Cartea
tehnică la o eventuală înstrăinare ulterioară.

    PREDĂTOR                                PRIMITOR
  (nume, semnătură,                       (nume, semnătură,
     ștampilă)                                ștampilă)

Martori / alți factori prezenți (după caz): ____________________
```

---

*Document tehnic specific — parte a bibliotecii de conținut UrbanX pentru funcțiunea „parc fotovoltaic". Se corelează, fără a le relua, cu memoriul general (identificare, avize), memoriul de rezistență (dimensionare mese/piloți la vânt și smulgere), memoriul de instalații (scheme DC/AC/MT, priză, IPT), scenariul de securitate la incendiu și documentul de recepție (secțiunile A–D ca precondiție a recepției). Trimiterile la articolele Legii 10/1995, Legii 123/2012 și la Ordinele ANRE se verifică pe textele în vigoare la data utilizării.*
