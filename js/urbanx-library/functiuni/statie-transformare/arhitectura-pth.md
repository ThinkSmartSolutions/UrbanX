## PTh-A.1. OBIECTUL SUPLIMENTULUI DE FAZĂ PTh (ARHITECTURĂ)

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție, conform **HG nr. 907/2016** privind aprobarea conținutului-cadru al documentațiilor tehnico-economice aferente investițiilor publice, corelat cu **Legea nr. 50/1991** republicată și cu **Legea nr. 10/1995** republicată privind calitatea în construcții) la memoriul de arhitectură/amenajare a platformei stației electrice de transformare **110/20 kV, exterior tip AIS, 2×25 MVA (etapa I) → 2×40 MVA (etapa de dezvoltare)**, redactat integral la faza D.T.A.C. în `arhitectura.md`. Documentul de față **nu reia** datele de temă, componența documentației D.T.A.C., cadrul normativ general, categoria de importanță și clasa de expunere seismică, principiul de organizare a celor trei zone funcționale ale platformei sau justificările de amplasament — toate stabilite și motivate integral la faza DTAC (`general.md`, `arhitectura.md`) — ci aduce **fiecare element construit al incintei la nivelul de detaliere necesar execuției**: cotare completă, materiale și grosimi exacte ale straturilor de platformă, secțiuni cotate prin cuva de retenție a uleiului și prin priza de pământ, detaliul de execuție al împrejmuirii de securitate, tehnologia și succesiunea reală a lucrărilor, planul de control al calității pe faze determinante (cu accent explicit pe etanșeitatea cuvei de retenție și pe execuția prizei de pământ — fazele pe care memoriul general DTAC le identifică drept „faze critice [...] care nu mai pot fi verificate ulterior fără desfaceri costisitoare"), toleranțele de execuție și condițiile de recepție.

### PTh-A.1.1. Notă de armonizare — categoria de importanță și consecința ei asupra nivelului de detaliere PTh

Documentația DTAC a stației conține două formulări complementare, nu contradictorii, ale categoriei de importanță, pe care prezentul supliment le armonizează explicit înainte de a stabili nivelul de detaliere al fiecărui element construit: memoriul general (`general.md`, cap. 1.5) și memoriul de rezistență (`structura.md`, cap. 1.3) încadrează **ansamblul electroenergetic critic** — structurile de susținere ale aparatajului de 110 kV (portalurile), fundațiile transformatoarelor de putere și clădirea de comandă (ca sediu al protecțiilor, automatizărilor și SCADA de care depinde exploatarea în siguranță a întregii stații) — la **categoria de importanță B**, cu **anexele nestrategice ale incintei** (împrejmuirea, magaziile de materiale, posturile de pază) tratate la **categoria C**; memoriul de arhitectură DTAC (`arhitectura.md`, cap. 1.4) citează, la rândul său, aceeași încadrare de bază la **categoria de importanță B** pentru ansamblul stației 110 kV, cu **acoperire seismică obligatorie la clasa de importanță-expunere II** (γ_I,e = 1,20) pentru elementele critice. Cele două formulări converg deci, la nivelul consecinței de proiectare care interesează prezentul supliment, spre aceeași concluzie operațională, exprimată acum cu aceeași etichetă formală în ambele memorii: **orice element construit cu rol determinant în funcționarea electroenergetică a stației (fundații de echipament, structuri de susținere, clădirea de comandă) se detaliază, se controlează calitativ și se recepționează la standardul cerut de categoria B/clasa seismică II**, iar elementele auxiliare fără rol funcțional direct (împrejmuirea, magaziile) urmează un regim de control proporțional, la categoria C/clasa seismică III. Prezentul supliment aplică acest principiu de acoperire consecvent, capitol cu capitol: detaliile de execuție ale cuvei de retenție, ale fundațiilor de echipament și ale prizei de pământ (PTh-A.2, PTh-A.6, PTh-A.7) sunt tratate la nivelul de rigoare al unei construcții de categorie B, iar cele ale împrejmuirii (PTh-A.2, detaliile D09-D10) la nivelul proporțional unei anexe de categorie C, dar cu păstrarea cerințelor de securitate electrică (legare la priza de pământ a stației) care rămân, acestea, obligatorii indiferent de categorie.

### PTh-A.1.2. Cadrul normativ de detaliere (completare față de DTAC)

Cadrul normativ complet al investiției — Legea 50/1991, Legea 10/1995, Legea 350/2001, HG 907/2016, HG 766/1997, Legea energiei electrice nr. 123/2012, NTE 001/03, NTE 003, NTE 007, PE 101/PE 101A, PE 103, PE 104, PE 111, PE 116, SR EN 61936-1, SR EN 50522, seria IEC 62271/60076/60071, P118-1/2/3, HG 571/2016, Legea 307/2006, Ordinul MAI 129/2016, OUG 195/2005, Legea 292/2018, HG 1132/2008, Legea 211/2011, SR EN 858-1/2, OMS 119/2014, STAS 10009, NP 051/2012, PD 177, NP 081 — a fost stabilit integral la faza DTAC și **nu se suplimentează cu normative noi** la faza PTh; prezentul document detaliază aplicarea acestora la nivel de execuție, cu precizarea, punctuală, a articolelor/capitolelor de aplicare directă unde relevant. Se adaugă, ca instrumente de detaliere pur constructivă (materiale, punere în operă), fără a introduce cerințe tehnice noi de fond:

| Normativ de detaliere | Domeniu de aplicare la nivel PTh |
|---|---|
| SR EN 1992-3 | Proiectarea structurilor de beton pentru reținerea lichidelor — aplicat direct detaliului cuvei de retenție a uleiului (PTh-A.2, D05) și verificării de etanșeitate, preluat ca dat obligatoriu din memoriul de rezistență PTh |
| SR EN ISO 1461 | Zincarea la cald a elementelor metalice de împrejmuire și a structurilor auxiliare de arhitectură (stâlpi gard, copertine, parapeți) |
| NE 012-1/2007, NE 012-2/2010 | Execuția lucrărilor din beton — platformă betonată, cuvă, socluri |
| GP 118 | Ghid privind proiectarea, execuția și exploatarea instalațiilor de ventilare (referință pentru dimensionarea grilelor de ventilație ale camerei bateriilor și ale camerei celulelor MT, detaliate la nivel de arhitectură ca goluri și protecții, cu calculul de debit tratat de memoriul de instalații PTh) |
| C 56/2002 | Normativ pentru verificarea calității lucrărilor de construcții — cadru general de recepție pe faze, aplicat la PTh-A.8 |
| P130/1999 | Normativ privind urmărirea comportării în timp a construcțiilor — bază a programului de urmărire specială menționat, pentru partea de arhitectură (aspect exterior, drenaj, tasări vizibile), la PTh-A.9 |

Nicio prevedere a acestui tabel nu contrazice sau înlocuiește normativele de fond citate la DTAC — coordonarea izolației, distanțele de izolație în aer, dimensionarea prizei de pământ și calculul de scurtcircuit rămân, ca și la faza DTAC, date obligatorii preluate de la proiectantul de specialitate electrică și de la memoriul de rezistență, pe care arhitectura le amenajează spațial, fără a le recalcula (cap. 1.5-1.6 din `arhitectura.md`, principiu menținut identic la faza PTh).

### PTh-A.1.3. Componența suplimentului

Suplimentul de față se compune din: detalii de execuție cotate D01-D20 la scările 1:5/1:10/1:20 (PTh-A.2); tabloul de tâmplărie, porți și elemente de închidere la nivel de execuție (PTh-A.3); fișele tehnice complete de finisaje și materiale pe fiecare zonă/încăpere construită (PTh-A.4); tehnologia de execuție și succesiunea lucrărilor (PTh-A.5); detaliul de acces și de manevră pentru montajul/înlocuirea transformatorului de putere (PTh-A.6); compartimentarea la foc între boxele de transformator, la nivel de detaliu arhitectural (PTh-A.7); planul de control al calității pe faze determinante (PTh-A.8); condițiile de recepție (PTh-A.9); notele de corelare cu celelalte specialități și anexa de index normativ (PTh-A.10). Piesele desenate corespunzătoare (planșele D01-D20, planul de amenajare cotat definitiv, planul de tâmplărie) sunt parte integrantă și indisociabilă a prezentului memoriu, în aceeași logică de coordonare specialitate-electrică-întâi menționată la DTAC (`arhitectura.md`, cap. 1.1): nicio cotă din planșele de detaliu nu poate contrazice o distanță de izolație sau o valoare rezultată din calculul prizei de pământ al memoriului electric/de instalații PTh.

---

## PTh-A.2. DETALII DE EXECUȚIE (D01-D20)

Detaliile de mai jos aduc la nivel de execuție elementele constructive ale platformei descrise la nivel de principiu în `arhitectura.md` (cap. 2-9). Fiecare detaliu este însoțit de tabelul de poziții cu materiale/dimensiuni exacte și de un paragraf de cerințe de execuție și toleranțe, care nu se pot deduce din desen.

### D01 — Platformă balastată zona 110 kV: structură de strat și racord la priza de pământ (sc. 1:10)

Detaliul tratează structura de strat a platformei aparatajului exterior de 110 kV, dimensionată simultan pentru cele două funcții stabilite la DTAC — electrică (rezistivitate de suprafață ridicată, pentru limitarea curentului prin corpul unei persoane la un defect de punere la pământ) și hidraulică (drenaj rapid, evitarea bălților).

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Strat de uzură | Piatră spartă (balast), spălată, fără fracțiune fină | Granulometrie 40-70 mm, grosime 15-20 cm |
| Strat suport | Balast compactat | Grosime 15-20 cm, grad de compactare Proctor ≥ 98% |
| Strat de formă | Umplutură compactată pe teren de fundare confirmat geotehnic | Grosime conform studiului geotehnic, minimum 20 cm |
| Geotextil de separație | Țesătură netesută, anti-colmatare | Interpus între stratul de formă și stratul suport |
| Coborâri priză de pământ | Conductor de coborâre, vizibil la suprafața stratului de balast pe traseul de acces | OL-Zn sau Cu, conform PTh-I.4.9 |

**Cerințe de execuție și toleranțe.** Piatra spartă se așterne uscată și se menține uscată pe toată durata montajului aparatajului; verificarea rezistivității de suprafață a stratului finit (prin măsurare directă, nu prin certificat de material) este obligatorie înainte de recepția fazei determinante „platformă 110 kV finită" (PTh-A.8). Panta de scurgere a platformei către rigolele perimetrale este de minimum 0,5% (identic cu valoarea de sistematizare generală DTAC, `arhitectura.md` cap. 2.5), verificată topografic pe toată suprafața, fără puncte joase de acumulare. Toleranța de nivel a suprafeței finite a stratului de balast: ±2 cm față de cota de proiect. Este interzisă compactarea cu utilaj vibrator greu în imediata vecinătate a coborârilor prizei de pământ deja montate (risc de deteriorare mecanică a conductorului) — se compactează manual sau cu plăci vibratoare ușoare pe o rază de 0,5 m față de fiecare coborâre.

### D02 — Platformă betonată zona transformatoarelor: cale de montaj și rezemare pe role (sc. 1:10)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Placă de beton | Placă armată, turnată monolit cu soclul cuvei | Beton C25/30, grosime 20-25 cm, plasă armătură conform memoriului de rezistență PTh |
| Cale de rulare | Șine metalice sau profile plate înglobate în beton, pe direcția de tragere a transformatorului | Oțel, ancorate în placă înainte de turnare |
| Rost de dilatație | La interfața cu platforma rutieră adiacentă | Conform D10 |
| Finisaj suprafață | Beton amprentat/periat, antiderapant | Fără tratamente de suprafață care ar reduce aderența la manevră |

**Cerințe de execuție și toleranțe.** Planeitatea suprafeței betonate se verifică cu dreptarul de 3 m, abatere maximă admisă 5 mm — o abatere mai mare compromite alinierea căii de rulare pe toată lungimea de tragere a transformatorului. Căile de rulare se poziționează și se nivelează topografic înainte de turnarea betonului, cu toleranță de paralelism ±3 mm/m pe toată lungimea; poziția lor definitivă se confirmă prin verificare încrucișată cu gabaritul exact al transformatorului contractat (roți/patine de transport), preluat de la fișa tehnică a furnizorului — nu se toarnă placa pe o poziție presupusă.

### D03 — Racord platformă balastată / platformă betonată (rost de tranziție) (sc. 1:10)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Bordură de delimitare | Beton prefabricat sau turnat monolit | Înălțime liberă 8-10 cm față de fiecare platformă adiacentă |
| Strat de tranziție | Balast stabilizat, grosime variabilă de racordare a cotelor | — |
| Continuitate priză de pământ | Conductor de contur, netăiat de bordură | Trecere sub bordură, în tub de protecție PVC-U dacă traversează sub cale carosabilă |

**Cerințe de execuție și toleranțe.** Diferența de cotă între cele două tipuri de platformă la linia de racord nu depășește 3 cm, verificată cu nivela; conductorul de contur al prizei de pământ traversează continuu sub bordură, fără întrerupere electrică — orice tăiere accidentală constatată la execuție se remediază prin sudură exotermică (cadweld) sau papuc de compresie certificat, nu prin înnădire cu clemă simplă.

### D04 — Interfața fundație transformator — cuvă de retenție (sc. 1:20)

Detaliul de arhitectură coordonează amplasarea în plan a fundației transformatorului (dimensionată la memoriul de rezistență PTh) cu conturul cuvei de retenție, astfel încât gabaritul transformatorului contractat, garda de siguranță a=0,75 m (DTAC, `arhitectura.md` cap. 3.5) și poziția fundației să fie coerente geometric, fără suprapuneri sau goluri neintenționate.

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Contur cuvă | Perete de beton armat, cotă superioară la nivelul grătarului | Conform breviarului de rezistență PTh, cap. R.3 |
| Soclu transformator | Bloc de beton în interiorul conturului cuvei | Conform breviarului de rezistență PTh, cap. R.2 |
| Rost etanșat | La interfața soclu-perete cuvă, dacă execuția nu e monolită | Bandă de etanșare tip waterstop |

**Cerințe de execuție și toleranțe.** Coordonarea în plan se verifică obligatoriu pe planul de situație cotat definitiv, cu toate cele trei surse suprapuse — gabaritul transformatorului din fișa tehnică a furnizorului, conturul cuvei din memoriul de arhitectură și armătura fundației din memoriul de rezistență — înainte de trasarea pe teren; orice discrepanță se rezolvă prin corectarea documentației, nu prin ajustare pe șantier.

### D05 — Cuva de retenție a uleiului: secțiune tip cotată (sc. 1:10)

Detaliu central al prezentului supliment, care duce la nivel de execuție componentele descrise la principiu în `arhitectura.md` cap. 3.

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Bazin etanș | Cuvă din beton armat impermeabilizat, „cuvă albă" (beton hidrofug) sau „cuvă neagră" (membrană hidroizolantă), conform soluției adoptate în memoriul de rezistență PTh pe baza nivelului hidrostatic real | Adâncime utilă h_util = 0,70 m (proiect referință, recalculat pe echipamentul contractat conform PTh-R.3) |
| Grătar purtător | Grătar metalic zincat la cald sau grătar din elemente de beton prefabricate, demontabil pe zone | Rezemat pe console/reazeme din beton armat, dimensionat la sarcina de circulație pietonală + eventuale unelte de mentenanță |
| Strat de piatră spartă | Pietriș spălat, fără fracțiune fină, deasupra grătarului | Granulometrie 40-70 mm, grosime minimă 0,25 m, porozitate uzuală 40-45% goluri |
| Colector | Canal/conductă sub grătar, pantă spre punctul de evacuare | Pantă minimă 1%, material rezistent la hidrocarburi |
| Cămin de vizitare + vană de izolare | Cămin din beton prefabricat sau turnat, cu vană manuală normal deschisă | Diametru interior minim 0,80 m pentru acces de inspecție |
| Separator ulei-apă | Echipament conform SR EN 858, clasă I, prag ≤5 mg/l hidrocarburi reziduale | Poziționat în aval de cămin, pe traseul spre canalizarea pluvială/emisar |

**Cerințe de execuție și toleranțe.** Etanșeitatea bazinului este o fază determinantă necondiționată (PTh-A.8) — turnarea betonului cuvei se execută monolit pe cât posibil; unde rosturile de lucru sunt inevitabile, se prevede obligatoriu bandă de etanșare (waterstop) continuă, fără întreruperi la colțuri. Toleranța de planeitate a radierului cuvei: ±5 mm/m, verificată înainte de montarea grătarului. Grosimea stratului de piatră se verifică prin măsurare directă în minimum 4 puncte pe suprafața cuvei, nu doar la marginea vizibilă. Proba de etanșeitate a bazinului (umplere cu apă la nivelul h_util timp de minimum 72 de ore, fără scădere de nivel peste toleranța admisă) este obligatorie **înainte** de montarea grătarului și a stratului de piatră, întrucât o remediere ulterioară a unei fisuri constatate ar necesita desfacerea integrală a stratului de piatră deja pus în operă (PTh-A.8, PTh-R.9.4).

### D06 — Peretele antifoc dintre boxele celor două transformatoare (sc. 1:10)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Perete antifoc | Beton armat sau zidărie plină | Înălțime peste gabaritul cel mai înalt al transformatorului (inclusiv conservatorul de ulei), conform memoriului de rezistență PTh; grad de rezistență la foc stabilit de scenariul de securitate la incendiu |
| Fundație perete | Continuă, independentă sau solidarizată cu fundația transformatorului | Conform memoriului de rezistență PTh |
| Traversări cabluri/conducte prin perete | Etanșate la foc, cu manșoane certificate | Rezistență la foc egală cu a peretelui (nicio traversare nu reduce performanța PSI a peretelui) |

**Cerințe de execuție și toleranțe.** Lungimea peretelui acoperă integral zona de radiație termică posibilă între cele două boxe, conform breviarului de calcul PSI din scenariul de securitate la incendiu; nu se admite o lungime redusă „la vedere" fără confirmare din scenariul avizat de ISU. Toate traversările prin perete (cabluri de forță, cabluri de comandă-control, eventuale conducte ale sistemului de stingere) se execută cu manșoane/etanșări la foc certificate, montate și înregistrate individual în planul de control al calității (PTh-A.8) — o traversare neetanșată anulează practic funcția peretelui.

### D07 — Separatorul ulei-apă și căminul de vizitare: montaj și racord (sc. 1:10)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Separator | Echipament prefabricat, conform SR EN 858 | Debit nominal dimensionat la debitul de proiectare al ploii de calcul + volumul potențial de ulei, conform memoriului de instalații PTh |
| Decantor sedimente | Integrat sau amonte de separator | — |
| Flotor de închidere automată | Blochează evacuarea la depășirea capacității de separare | Verificare funcțională obligatorie la PIF |
| Racord evacuare | Către rețeaua de canalizare pluvială a incintei sau emisar avizat | Conform avizului de gospodărire a apelor |

**Cerințe de execuție și toleranțe.** Separatorul se amplasează accesibil pentru vidanjare periodică cu autovidanjă (cale de acces carosabilă până la capacul de vizitare, conform PTh-A.2 D17-D18); adâncimea de montaj respectă cota impusă de producător pentru funcționarea corectă a plăcilor coalescente (nu se montează „la orice adâncime convenabilă pe șantier"). Proba de etanșeitate și proba funcțională a flotorului de închidere sunt puncte de control obligatorii înainte de recepție (PTh-A.8).

### D08 — Rigolă de colectare a apelor pluviale de pe platformă (sc. 1:10)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Rigolă perimetrală | Beton prefabricat sau turnat, cu grătar carosabil pe traseele de acces | Secțiune dimensionată la debitul de calcul, pantă minimă 0,5% |
| Guri de scurgere | Cu sifon și coș de colectare a impurităților | Distanțate conform planului de sistematizare verticală |

**Cerințe de execuție și toleranțe.** Rigola din zona transformatoarelor se racordează, obligatoriu, la sistemul cuvă-separator (nu direct la canalizarea pluvială generală), conform principiului DTAC de evacuare controlată a apelor cu potențial impurificat (`arhitectura.md` cap. 3.6); rigolele din zona 110 kV balastată se racordează la canalizarea pluvială generală, fără trecere prin separator, întrucât nu colectează scurgeri cu potențial de hidrocarburi.

### D09 — Împrejmuire de securitate: fundație stâlp și panou (sc. 1:10)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Fundație stâlp | Fundație izolată de beton, la fiecare stâlp | Beton C16/20, adâncime sub adâncimea de îngheț conform STAS 6054 |
| Stâlp | Metalic, zincat la cald | Înălțime totală ≥ 2,20 m liber deasupra terenului, conform gardului DTAC |
| Panou | Plasă bordată sau panou zăbrelit | Zincat la cald, conform SR EN ISO 1461 |
| Extensie superioară | Sârmă ghimpată sau sistem cu senzor de vibrație/tăiere | Montată pe consolă înclinată spre exterior |
| Legare la priza de pământ | Fiecare stâlp legat la conductorul de contur al prizei de pământ a stației | Conform D12 |

**Cerințe de execuție și toleranțe.** Fiecare stâlp de gard se leagă individual la priza de pământ (nu doar la capetele tronsonului) — continuitatea electrică a gardului pe toată lungimea sa este o cerință de securitate, nu doar mecanică, întrucât gardul metalic aflat în câmpul electric al unui defect la pământ trebuie să rămână la un potențial controlat, nu flotant. Verticalitatea stâlpilor: toleranță ±5 mm/m. Distanța gard-aparataj sub tensiune respectă zona de protecție interioară de 1,0-2,0 m stabilită la DTAC, verificată punct cu punct pe planul cotat definitiv, cumulată cu distanța de izolație în aer a echipamentului celui mai apropiat (preluată din memoriul de instalații PTh).

### D10 — Poarta principală carosabilă și poarta pietonală (sc. 1:20)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Poartă carosabilă | Culisantă sau batantă, motorizată, cu control de acces | Lățime carosabilă minimă 5,0 m, conform DTAC |
| Poartă pietonală | Separată de poarta principală | Lățime minimă 1,0 m |
| Fundație/glisieră | Beton armat, dimensionată la greutatea porții și la solicitările dinamice de deschidere/închidere | Conform fișei tehnice a producătorului porții |
| Control de acces | Cartelă/cod/interfon, integrat în sistemul unic de securitate al stației | Conform memoriului de instalații PTh |

**Cerințe de execuție și toleranțe.** Poarta carosabilă rămâne funcțională și la lipsa alimentării generale (acționare manuală de rezervă sau alimentare din sursa de rezervă a serviciilor proprii), pentru a nu bloca accesul pompierilor sau al echipelor de intervenție într-o situație de avarie coincidentă cu o pană de alimentare.

### D11 — Priza de pământ: grilă orizontală și electrozi verticali (sc. 1:10 / 1:20)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Conductor de grilă | Platbandă sau conductor rotund, oțel zincat (OL-Zn) sau cupru | Adâncime de îngropare 0,7-0,8 m, dispus în ochiuri conform calculului de rezistență de dispersie (PTh-I.4) |
| Electrozi verticali | Țeavă sau bară, oțel zincat sau cupru | Lungime 1,5-3 m, amplasați la colțurile incintei și la densitate sporită lângă poartă și lângă fundațiile de echipament critic |
| Îmbinări | Sudură exotermică (cadweld) sau papuci de compresie certificați | Interzisă înnădirea cu clemă simplă, susceptibilă de corodare/desfacere |
| Cutii de vizitare | La punctele de coborâre principale, pentru măsurare periodică | Amplasate accesibil, marcate |

**Cerințe de execuție și toleranțe.** Execuția prizei de pământ este o **fază determinantă necondiționată** (PTh-A.8, alături de etanșeitatea cuvei) — traseul, adâncimea și densitatea grilei se execută strict conform planului rezultat din calculul de dimensionare al memoriului de instalații PTh (PTh-I.4.9), fără modificări „de conveniență de șantier" (evitarea unui obstacol subteran neprevăzut se rezolvă prin recalculare, nu prin deviere neconsemnată). Măsurarea rezistenței de dispersie și a tensiunilor de atingere/pas efective se execută **înainte de acoperirea definitivă a grilei** cu ultimul strat de platformă, pentru a permite eventuale completări (electrozi suplimentari, densificare locală a ochiurilor) fără desfaceri — a se vedea protocolul complet la PTh-A.8 și PTh-I.6.

### D12 — Legare echipotențială: gard, structuri, cuve, neutre (sc. 1:5)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Conductor de legare | Platbandă sau conductor flexibil, secțiune conform calculului termic la curentul de defect | Racordat la priza de pământ prin papuc de compresie |
| Puncte de legare | Fiecare stâlp de gard, fiecare structură metalică de susținere, fiecare cuvă, carcasa fiecărui echipament, neutrul fiecărui transformator | Marcate individual pe planul de coordonare |

**Cerințe de execuție și toleranțe.** Toate masele metalice ale incintei se leagă la aceeași priză de pământ, unică pentru toată stația — niciun element metalic nu rămâne „flotant" electric. Continuitatea fiecărei legături se verifică prin măsurare de rezistență de contact (nu prin inspecție vizuală), înregistrată individual în procesul-verbal de fază determinantă.

### D13 — Fundația/soclul portalurilor metalice de 110 kV: interfață cu arhitectura platformei (sc. 1:10)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Soclu suprateran | Beton, cotă superioară supraînălțată față de platforma balastată | Minimum 15-20 cm peste cota platformei, pentru protecție la umezeală și la circulația vehiculelor de mentenanță |
| Buloane de ancoraj | Poziționate prin șablon, conform fișei tehnice a producătorului structurii metalice | Clasa conform memoriului de rezistență PTh |
| Racord priză de pământ | Legare directă a bazei fiecărui portal la grilă | Conform D11-D12 |

**Cerințe de execuție și toleranțe.** Poziția și cota buloanelor de ancoraj se confirmă prin șablon furnizat de producătorul structurii metalice, montat și verificat topografic **înainte** de turnarea betonului — o eroare de poziționare constatată după turnare nu se corectează prin găurire ulterioară a betonului întărit fără avizul proiectantului de rezistență.

### D14 — Clădirea de comandă: accese, cameră celule MT, cameră baterii (sc. 1:20)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Acces personal | Ușă principală, prag „la zero" sau rampă, conform NP 051/2012 pentru zona administrativă | Lățime liberă minimă conform reglementărilor de siguranță la incendiu |
| Acces echipamente (celule MT) | Ușă/gol tehnologic dimensionat la gabaritul celulelor, cu prag de reținere lichide dacă celulele conțin ulei | Conform fișei tehnice a celulelor MT |
| Grile de ventilație cameră baterii | Poziționate sus și jos, pentru evacuarea gazului mai ușor decât aerul (hidrogen) prin diferență de densitate | Secțiune conform calculului de debit din memoriul de instalații PTh |
| Compartimentare interioară | Separări EI 90-EI 120 între camera bateriilor, camera celulelor MT și restul clădirii, conform DTAC | Pereți/uși rezistente la foc, certificate |

**Cerințe de execuție și toleranțe.** Grilele de ventilație ale camerei bateriilor nu se obturează niciodată cu elemente de finisaj sau cu mobilier tehnic ulterior — poziția lor este fixă și verificată la recepție ca element de securitate, nu doar de confort termic. Pragurile de reținere a eventualelor scurgeri de ulei din celulele MT (dacă echipamentul contractat conține ulei izolant) se dimensionează la volumul echipamentului, cu aceeași logică de principiu ca la cuva transformatorului de putere, la scară redusă.

### D15 — Cale de rulare/tragere a transformatorului: role și ancore de tragere (sc. 1:10)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Șine/cale de rulare | Ancorate în placa betonată (D02), aliniate cu poziția finală din cuvă | Conform gabaritului de transport al furnizorului |
| Ancore de tragere | Puncte fixe de ancorare a troliului, la capătul opus al căii de rulare | Dimensionate la forța de tragere maximă, conform memoriului de rezistență PTh |
| Alveolă de manevră | Suprafață betonată laterală, pentru corecția traiectoriei ansamblului tractor-trailer | Conform DTAC (`arhitectura.md` cap. 4.3) |

**Cerințe de execuție și toleranțe.** A se vedea dezvoltarea completă a acestei operațiuni la PTh-A.6.

### D16 — Marcaje și semnalistică de securitate (sc. 1:5 / 1:20)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Pancarte de pericol electric | La poartă, la limitele zonelor sub tensiune, la fiecare celulă | Conform standardelor de semnalizare de securitate în vigoare |
| Marcaje pe pardoseală | La limitele distanțelor de circulație de securitate (N+900 mm, N+2.250 mm, conform memoriului de instalații PTh) | Vopsea/bandă rezistentă la intemperii |
| Numerotare/identificare echipamente | Plăcuțe de identificare pe fiecare celulă, transformator, portal | Conform schemei unifiliare |

**Cerințe de execuție și toleranțe.** Planul de amplasare a semnalisticii se corelează cu planul de distanțe de securitate al memoriului de instalații PTh — nu se amplasează pancarte „acolo unde e loc", ci exact la limitele de gabarit rezultate din calculul distanțelor de izolație.

### D17 — Structura rutieră a drumurilor interioare: rost de dilatație (sc. 1:5)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Rost de dilatație | La interval regulat pe lungimea drumului betonat, conform tehnologiei de execuție a betoanelor rutiere | Lățime rost 15-20 mm, etanșat cu chit elastic |
| Structura rutieră | Conform DTAC | Strat uzură 22-25 cm, strat bază 30-40 cm, strat formă 20-30 cm |

**Cerințe de execuție și toleranțe.** Rosturile de dilatație nu se poziționează pe traseul căilor de rulare ale transformatorului (D15) — o discontinuitate la nivelul căii de rulare ar compromite alinierea în timpul manevrei de tragere.

### D18 — Alveola de manevră pentru ansamblul tractor-trailer (sc. 1:20)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Platformă betonată suplimentară | Laterală drumului principal, la intrarea în zona de montaj | Structură rutieră identică cu D02/D17 |
| Gabarit de manevră | Rază minimă de curbură 12 m, conform DTAC | — |

**Cerințe de execuție și toleranțe.** Se confirmă gabaritul exact al ansamblului tractor-trailer contractat pentru transportul transformatorului înainte de trasarea finală a alveolei — o alveolă subdimensionată ar obliga la manevre repetate „în mai multe reprize" pe care DTAC le exclude explicit ca soluție acceptabilă.

### D19 — Iluminat exterior de securitate și puncte CCTV (sc. 1:10)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Stâlpi de iluminat | Metalici, zincați, cu fundație proprie | Înălțime și amplasare conform planului de iluminat al memoriului de instalații PTh |
| Camere CCTV | Montate pe stâlpii de iluminat sau pe structuri dedicate, la poartă și la punctele critice ale perimetrului | Conform sistemului unic de securitate DTAC |
| Alimentare de rezervă | Racordată la serviciile proprii c.c./UPS | Conform memoriului de instalații PTh |

**Cerințe de execuție și toleranțe.** Poziționarea stâlpilor de iluminat/CCTV respectă distanța de izolație față de aparatajul sub tensiune (nu se amplasează în interiorul zonei de protecție interioară de 1,0-2,0 m fără o justificare tehnică explicită de la proiectantul electric).

### D20 — Spații verzi / ecran vegetal perimetral (sc. 1:20)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Ecran vegetal | Specii cu înălțime moderată la maturitate, fără rădăcini agresive | Amplasat la distanță de gard care exclude atingerea/apropierea de aparataj la creșterea maximă a coroanei |
| Sol vegetal | Strat de pământ vegetal pe suprafețele neocupate de platformă/drumuri | Grosime minimă 20 cm |

**Cerințe de execuție și toleranțe.** Distanța de plantare față de gard și față de aparatajul exterior se stabilește astfel încât înălțimea la maturitate a speciilor alese să nu reducă niciodată, pe durata de exploatare a stației, distanțele de izolație în aer sau vizibilitatea CCTV — verificare obligatorie la alegerea speciilor, nu doar la plantare.

---

## PTh-A.3. TABLOU DE TÂMPLĂRIE, PORȚI ȘI ELEMENTE DE ÎNCHIDERE (NIVEL PTh)

### PTh-A.3.1. Porți și accese carosabile/pietonale ale incintei

| Cod | Denumire | Gabarit | Tip | Automatizare/control acces |
|---|---|---|---|---|
| P1 | Poartă carosabilă principală | 5,0 m lățime carosabilă | Culisantă sau batantă cu 2 canaturi, metalică zincată/plasă | Motorizată, control acces cartelă/cod, acționare manuală de rezervă |
| P2 | Poartă pietonală (lângă P1) | 1,0 m lățime liberă | Batantă, metalică zincată | Control acces cartelă/cod, sincronizat cu sistemul unic de securitate |
| P3 | Poartă tehnologică secundară (dacă planul de situație o prevede, pentru acces direct la zona transformatoarelor în caz de intervenție) | 4,0 m lățime carosabilă | Batantă sau culisantă | Acționare manuală, cu lacăt de siguranță pentru echipele de intervenție |

### PTh-A.3.2. Tâmplăria clădirii de comandă

| Cod | Denumire | Gabarit | Tip | Clasă/performanță |
|---|---|---|---|---|
| U1 | Ușă acces principal, zonă administrativă/comandă | conform proiectului de arhitectură definitiv | Metalică, cu rupere de punte termică | Rezistență la efracție conform clasei de securitate a incintei |
| U2 | Ușă acces cameră celule MT | dimensionată la gabaritul celulelor și al operațiunilor de mentenanță | Metalică, rezistentă la foc conform compartimentării (EI 90-EI 120) | Cu prag de reținere lichide dacă e cazul (D14) |
| U3 | Ușă acces cameră baterii | conform gabaritului tehnologic | Metalică, rezistentă la foc, cu grile de ventilație integrate sau adiacente | Antiex acolo unde proiectul de instalații o impune |
| U4 | Ușă/gol tehnologic evacuare echipament (dacă e prevăzut, pentru extragerea celulelor la mentenanță majoră) | dimensionat la gabaritul celui mai mare echipament transportabil | Panou demontabil sau ușă cu deschidere largă | — |
| F1 | Fereastră de supraveghere cameră comandă/SCADA | conform proiectului de arhitectură definitiv | Termopan, cu posibilitate de vizualizare a curții tehnologice | — |

### PTh-A.3.3. Note tâmplărie PTh

Ușile și golurile tehnologice de acces la echipamentele primare (celule de comutație, transformator) sunt tratate, la nivel de gabarit și de rezistență la foc, ca elemente de arhitectură ale clădirii, dar **poziționarea și dimensiunea lor exactă se confirmă obligatoriu pe fișa tehnică a echipamentului efectiv contractat**, nu pe o valoare orientativă de proiect — o ușă subdimensionată cu câțiva centimetri față de gabaritul real al unei celule MT ar bloca operațiunea de montaj/înlocuire. Feroneria ușilor camerelor tehnice (celule MT, baterii) include, obligatoriu, sisteme de deschidere din interior fără cheie (bară antipanică), pentru evacuarea rapidă a personalului aflat în interior în caz de incident, indiferent de starea sistemului de control acces. Tâmplăria exterioară a clădirii de comandă respectă, suplimentar, cerințele de etanșeitate la aer/apă corelate cu clasa de expunere a amplasamentului, tratate la fișele de finisaje (PTh-A.4).

---

## PTh-A.4. SPECIFICAȚII TEHNICE DE FINISAJE ȘI MATERIALE (FIȘĂ PE ZONĂ/ÎNCĂPERE)

### PTh-A.4.1. Fișă finisaje — platforma balastată zona 110 kV

| Element | Produs-tip | Clasă/performanță | Punere în operă |
|---|---|---|---|
| Strat de uzură | Piatră spartă spălată | Granulometrie 40-70 mm | Așternere uscată, fără compactare mecanică grea în zona coborârilor de priză de pământ |
| Delimitare platformă | Bordură de beton prefabricat | Rezistență la îngheț-dezgheț | Rosturi la interval regulat |

### PTh-A.4.2. Fișă finisaje — platforma betonată (transformatoare, drumuri, alveole de manevră)

| Element | Produs-tip | Clasă/performanță | Punere în operă |
|---|---|---|---|
| Beton de uzură | BcR sau dale prefabricate | Conform structurii rutiere DTAC, dimensionat la sarcina pe osie 115 kN | Rosturi de dilatație la interval regulat (D17), finisaj antiderapant |
| Marcaje | Vopsea rutieră rezistentă la intemperii | Vizibilitate pe termen lung | Reaplicare periodică conform planului de mentenanță |

### PTh-A.4.3. Fișă finisaje — cuva de retenție a uleiului

| Element | Produs-tip | Clasă/performanță | Punere în operă |
|---|---|---|---|
| Beton bazin | Beton hidrofug (cuvă albă) sau membrană hidroizolantă (cuvă neagră) | Conform SR EN 1992-3, etanșeitate confirmată prin probă (D05) | Turnare monolită unde e posibil, waterstop la rosturi inevitabile |
| Grătar | Oțel zincat la cald sau elemente de beton prefabricate demontabile | Sarcină de circulație pietonală + unelte | Demontabil pe zone, pentru inspecția periodică a bazinului |
| Strat piatră | Pietriș spălat 40-70 mm | Grosime minimă 0,25 m | Verificare grosime în minimum 4 puncte |

### PTh-A.4.4. Fișă finisaje — clădirea de comandă, camera celulelor MT

| Element | Produs-tip | Clasă/performanță | Punere în operă |
|---|---|---|---|
| Pardoseală | Beton sclivisit sau pardoseală tehnică antistatică, după caz | Rezistență la sarcini punctuale ale celulelor | Panta spre eventualele praguri de reținere lichide |
| Pereți | Zidărie/beton, finisaj lavabil | Rezistență la foc conform compartimentării | Compartimentare EI 90-EI 120 față de restul clădirii |
| Plafon | Conform proiectului de arhitectură | Rezistent la eventuale trepidații ale aparatajului | — |

### PTh-A.4.5. Fișă finisaje — camera bateriilor

| Element | Produs-tip | Clasă/performanță | Punere în operă |
|---|---|---|---|
| Pardoseală | Pardoseală rezistentă la acid (rășină epoxidică specială sau plăci ceramice antiacide) | Rezistentă la electrolit | Pantă spre eventual sistem de colectare |
| Pereți/plafon | Finisaj rezistent la coroziune | — | Fără elemente metalice neprotejate expuse |
| Corpuri de iluminat | Antiex, conform pragului de gaz exploziv (LIE ≈ 4% volum hidrogen) | Certificare Ex | Amplasare corelată cu grilele de ventilație (D14) |

### PTh-A.4.6. Fișă finisaje — camera de comandă/SCADA

| Element | Produs-tip | Clasă/performanță | Punere în operă |
|---|---|---|---|
| Pardoseală | Pardoseală tehnică înălțată, pentru trasee de cabluri | Acces facil la cablarea SCADA/protecții | Conform memoriului de instalații PTh |
| Climatizare | Corelată cu necesarul termic al echipamentelor de comandă-control | Continuitate garantată de serviciile proprii | Conform memoriului de instalații PTh |

### PTh-A.4.7. Fișă finisaje — împrejmuire, poartă, semnalistică

| Element | Produs-tip | Clasă/performanță | Punere în operă |
|---|---|---|---|
| Panou gard | Plasă bordată zincată sau panou zăbrelit | SR EN ISO 1461, grosime strat zinc ≥ 85 μm | Legare la priza de pământ la fiecare stâlp |
| Poartă | Metalică zincată, motorizată | Rezistență la efracție | Acționare de rezervă manuală funcțională |
| Pancarte | Panouri rezistente UV | Vizibilitate pe termen lung | Amplasare conform planului de distanțe de securitate |

### PTh-A.4.8. Fișă finisaje — spații verzi/ecran vegetal perimetral

| Element | Produs-tip | Clasă/performanță | Punere în operă |
|---|---|---|---|
| Vegetație | Specii cu înălțime moderată la maturitate | Fără interferență cu distanțele de izolație | Plantare la distanță confirmată de proiectantul electric |
| Sol vegetal | Pământ vegetal | Grosime minimă 20 cm | Așternut pe suprafețele neocupate |

---

## PTh-A.5. TEHNOLOGIA DE EXECUȚIE ȘI SUCCESIUNEA LUCRĂRILOR

### PTh-A.5.1. Succesiunea generală de execuție

1. Trasarea generală a incintei pe baza planului de situație cotat definitiv, cu verificarea încrucișată a tuturor cotelor față de planurile de rezistență și de instalații PTh.
2. Execuția terasamentelor generale și a sistematizării verticale (cotă supraînălțată 15-20 cm, pante minime 0,5%), conform studiului geotehnic.
3. Execuția fundațiilor de echipament (fundația transformatorului, socluri portaluri, fundații structuri de susținere aparataj) — fază coordonată strict cu memoriul de rezistență PTh.
4. Execuția cuvei de retenție a uleiului, inclusiv proba de etanșeitate a bazinului **înainte** de montarea grătarului și a stratului de piatră (D05).
5. Execuția rețelei de priză de pământ (grilă orizontală + electrozi verticali), cu măsurarea rezistenței de dispersie **înainte** de acoperirea definitivă cu ultimul strat de platformă (D11).
6. Execuția platformelor de suprafață — balastată în zona 110 kV, betonată în zona transformatoarelor și pe drumurile interioare — cu coordonarea coborârilor prizei de pământ deja montate.
7. Montajul structurilor metalice de susținere (portaluri) pe fundațiile finalizate, cu verificarea poziției buloanelor de ancoraj față de șablonul furnizorului.
8. Execuția construcției clădirii de comandă (structură, închideri, compartimentări la foc, finisaje interioare).
9. Execuția separatorului ulei-apă, a rigolelor de colectare și a racordurilor la canalizarea pluvială.
10. Execuția peretelui antifoc dintre boxele de transformator, coordonată cu montajul transformatoarelor (poate preceda sau succeda montajul, conform planificării generale de șantier, dar trebuie finalizată **înainte** de punerea sub tensiune a oricărui transformator).
11. Montajul echipamentelor primare (transformatoare de putere, aparataj de 110 și 20 kV) — fază tehnologică coordonată cu proiectantul electric, care utilizează căile de rulare și alveolele de manevră deja finalizate (D02, D15, D18).
12. Execuția împrejmuirii de securitate, cu legarea fiecărui stâlp la priza de pământ deja verificată.
13. Execuția iluminatului exterior de securitate, a CCTV și a semnalisticii de securitate.
14. Amenajările peisagistice finale (spații verzi, ecran vegetal), executate **ultimele**, pentru a evita deteriorarea vegetației tinere de către utilajele de șantier din fazele anterioare.

### PTh-A.5.2. Interdicții de execuție specifice

- Este interzisă acoperirea grilei de priză de pământ cu stratul final de platformă înainte de măsurarea și confirmarea rezistenței de dispersie și a tensiunilor de atingere/pas efective.
- Este interzisă montarea grătarului și a stratului de piatră al cuvei de retenție înainte de finalizarea probei de etanșeitate a bazinului.
- Este interzisă turnarea fundațiilor portalurilor înainte de confirmarea topografică a poziției buloanelor de ancoraj pe șablonul furnizorului.
- Este interzisă darea în exploatare a oricărui transformator înainte de finalizarea integrală a peretelui antifoc dintre boxe și a separatorului ulei-apă.
- Este interzisă compactarea mecanică grea a platformei balastate în vecinătatea coborârilor de priză de pământ deja montate.
- Este interzisă obturarea, prin orice element de finisaj ulterior, a grilelor de ventilație ale camerei bateriilor.
- Este interzisă execuția plantațiilor perimetrale la o distanță de gard/aparataj care nu a fost în prealabil confirmată de proiectantul de specialitate electrică, pe baza înălțimii la maturitate a speciilor alese.

---

## PTh-A.6. ACCESUL ȘI MANEVRA PENTRU MONTAJUL/ÎNLOCUIREA TRANSFORMATORULUI DE PUTERE

### PTh-A.6.1. Obiectul capitolului

Livrarea și poziționarea finală a unui transformator de putere de 25-40 MVA, cu o masă totală de ordinul a 40-70 tone, este o operațiune de transport agabaritic și de manevră de precizie, tratată la principiu în `arhitectura.md` (cap. 4.1) prin cerințele de gabarit ale drumurilor și ale alveolei de manevră. Prezentul capitol detaliază, la nivel de execuție, secvența fizică a manevrei finale — de la intrarea ansamblului tractor-trailer în incintă până la poziționarea definitivă a transformatorului pe soclul din cuvă — întrucât aceasta rămâne o operațiune recurentă pe toată durata de exploatare a stației (30-40 de ani sau mai mult, conform DTAC), nu doar un eveniment unic la punerea în funcțiune: orice înlocuire viitoare a unui transformator (avarie majoră, upgrade la etapa de dezvoltare 2×40 MVA) reia identic această secvență.

### PTh-A.6.2. Secvența de manevră

1. Ansamblul tractor-trailer intră prin poarta principală (P1, gabarit 5,0 m), pe traseul drumului interior dimensionat la sarcină pe osie de 115 kN (D17), cu lățime minimă 4,0 m și rază minimă de curbură 12 m.
2. La intrarea în zona de montaj, ansamblul efectuează corecțiile de traiectorie în alveola de manevră (D18), suprafață betonată suplimentară care nu blochează circulația pe restul drumurilor interioare.
3. Transformatorul este descărcat de pe trailer, fie prin macara mobilă (dacă gabaritul incintei și greutatea o permit), fie prin tragere directă pe role, folosind căile de rulare înglobate în placa betonată a boxei (D02, D15).
4. Deplasarea finală pe căile de rulare, până la poziția exactă din interiorul conturului cuvei (D04), se efectuează prin tragere cu troliu, ancorat la punctele fixe prevăzute la capătul opus al căii de rulare (D15), sub supravegherea directă a reprezentantului tehnic al furnizorului de echipament.
5. Poziționarea finală se verifică față de reperele de coordonare cu bornele de racord de înaltă tensiune (spre zona 110 kV) și de joasă tensiune (spre clădirea de comandă), conform schemei de amplasare a memoriului de instalații PTh.
6. Racordurile la sistemul de retenție (verificarea etanșeității rostului soclu-cuvă) și la sistemul de stingere (dacă echipat cu stingere fixă cu apă pulverizată) se finalizează înainte de umplerea cu ulei și punerea sub tensiune.

### PTh-A.6.3. Cerințe de gabarit pentru operațiunea de înlocuire viitoare

Spațiul de manevră (alveola D18, căile de rulare D15) se dimensionează și se menține liber pe toată durata de exploatare a stației la gabaritul necesar celui mai mare transformator prevăzut de etapizare (2×40 MVA), chiar dacă etapa I este echipată cu transformatoare de 2×25 MVA — principiu identic cu cel aplicat la dimensionarea civilă a cuvei (DTAC, `general.md` cap. 1.7 și `arhitectura.md` cap. 2.7). Nicio construcție sau amenajare ulterioară (extindere clădire, plantații, mobilier urban tehnic) nu se amplasează pe traseul de manevră rezervat, chiar dacă acesta pare, vizual, neutilizat între două operațiuni de înlocuire.

---

## PTh-A.7. COMPARTIMENTAREA LA FOC ÎNTRE BOXELE DE TRANSFORMATOR — DETALIU ARHITECTURAL

### PTh-A.7.1. Rolul dublu al compartimentării — completare la nivel de execuție

Așa cum stabilește DTAC (`arhitectura.md` cap. 3.8), peretele antifoc dintre cele două boxe de transformator îndeplinește o funcție distinctă de cea a cuvei de retenție: cuva limitează incendiul unei bălți de ulei scurs la nivelul solului, peretele blochează transferul de căldură radiantă între cele două unități, pentru a proteja disponibilitatea celui de-al doilea transformator (redundanța n-1). Prezentul capitol tratează, la nivel de execuție, interfețele constructive ale acestui perete cu restul amenajării — interfețe pe care DTAC nu le detaliază, întrucât nu afectează principiul, dar care condiționează performanța reală a peretelui pus în operă.

### PTh-A.7.2. Interfețele critice ale peretelui antifoc

- **Racordul la fundație** — peretele antifoc se solidarizează sau se poziționează independent față de fundațiile celor două transformatoare (conform memoriului de rezistență PTh), fără rosturi deschise la bază prin care flacăra sau radiația termică ar putea ocoli peretele pe sub cotă.
- **Racordul lateral la cuve** — peretele se prelungește, în plan, dincolo de conturul fiecărei cuve de retenție adiacente, astfel încât să nu existe o „fereastră" laterală de expunere directă între cele două boxe.
- **Traversările tehnologice** — orice cablu sau conductă care traversează peretele (cabluri de forță, cabluri de comandă-control, eventuale conducte ale sistemului de stingere cu apă pulverizată) se etanșează la foc cu manșoane certificate, la o performanță egală cu a peretelui însuși (D06); numărul acestor traversări se minimizează încă din faza de proiectare a traseelor de cabluri, tocmai pentru a limita punctele slabe ale compartimentării.
- **Înălțimea liberă deasupra conservatorului de ulei** — verificată explicit față de gabaritul complet al transformatorului contractat (inclusiv accesoriile montate la partea superioară), nu doar față de o valoare orientativă de catalog.

### PTh-A.7.3. Coordonarea cu accesul pompierilor

Poziția și gabaritul peretelui antifoc se corelează cu traseul de acces al autospecialelor de intervenție (DTAC, `arhitectura.md` cap. 3.9): peretele nu blochează accesul direct al unei autospeciale la fiecare boxă în parte, dinspre drumul interior, iar hidranții exteriori (dacă stația dispune de rețea proprie) se amplasează accesibil din drum, la distanță de siguranță față de ambele cuve, conform scenariului de securitate la incendiu avizat de ISU — document distinct, nedublat de prezentul memoriu.

---

## PTh-A.8. PLANUL DE CONTROL AL CALITĂȚII — FAZE DETERMINANTE (ARHITECTURĂ)

| Fază determinantă | Verificare | Document rezultat |
|---|---|---|
| Trasare generală incintă | Verificare topografică a cotelor față de planul de situație definitiv, coordonare cu rezistență/instalații | Proces-verbal de trasare |
| Teren de fundare confirmat | Verificare geotehnică directă pe șantier, corelată cu studiul geotehnic | Proces-verbal, aviz geotehnic de continuare |
| Bazinul cuvei de retenție — etanșeitate | Proba de umplere cu apă la nivel h_util, minimum 72 ore, fără scădere de nivel peste toleranța admisă | Proces-verbal de probă, obligatoriu **înainte** de montarea grătarului |
| Priza de pământ — execuție și măsurare | Verificare traseu/adâncime/densitate grilă conform proiectului; măsurare rezistență de dispersie și tensiuni de atingere/pas | Proces-verbal + buletin de măsurătoare, obligatoriu **înainte** de acoperirea finală a grilei |
| Poziția buloanelor de ancoraj ai portalurilor | Verificare topografică pe șablonul furnizorului, înainte de turnarea betonului | Proces-verbal de trasare/șablon |
| Platformă betonată zona transformator — planeitate | Verificare cu dreptarul de 3 m, abatere maximă 5 mm | Proces-verbal |
| Platformă balastată zona 110 kV — rezistivitate de suprafață | Măsurare directă a rezistivității stratului finit | Buletin de măsurătoare |
| Peretele antifoc — integritate și traversări | Verificare vizuală + verificarea certificatelor manșoanelor de etanșare la foc pe fiecare traversare | Proces-verbal, listă de traversări cu certificate individuale |
| Separator ulei-apă — etanșeitate și funcționare flotor | Probă de etanșeitate + probă funcțională a flotorului de închidere | Proces-verbal de probă |
| Compartimentări la foc clădire comandă | Verificare certificate EI 90-EI 120 pe uși/pereți | Proces-verbal, dosar certificate |
| Legare echipotențială generală | Verificare prin măsurare de rezistență de contact pe fiecare punct de legare (gard, structuri, cuve, carcase) | Buletin de măsurătoare pe fiecare punct |
| Recepția finală arhitectură | Verificare cumulativă a tuturor fazelor de mai sus, corelată cu recepția de rezistență și de instalații | Proces-verbal de recepție la terminarea lucrărilor, capitol arhitectură |

Fazele marcate ca „obligatorii înainte de" acoperirea/finisarea ulterioară sunt identificate explicit în memoriul general DTAC (`general.md`, cap. 2.1, pct. 11) drept fazele critice ale execuției electroenergetice care „nu mai pot fi verificate ulterior fără desfaceri costisitoare" — planul de mai sus le tratează, la nivel de arhitectură, ca puncte de oprire obligatorie a lucrărilor până la confirmarea scrisă a proiectantului și a dirigintelui de șantier.

---

## PTh-A.9. VERIFICĂRI LA RECEPȚIE — CONFORMITATE CU DTAC, AVIZUL ISU ȘI ATR

1. Confirmarea faptului că toate distanțele de securitate executate (gard-aparataj, poartă-zonă de protecție interioară) respectă valorile din planul cotat definitiv, coroborat cu memoriul de instalații PTh — nicio distanță executată sub minimul de proiect nu se acceptă la recepție, indiferent de motivul invocat.
2. Confirmarea rezultatelor măsurătorii prizei de pământ (rezistență de dispersie, tensiuni de atingere/pas) față de valorile-țintă de proiect, cu buletinul de măsurătoare atașat cărții tehnice a construcției.
3. Confirmarea probei de etanșeitate a cuvei de retenție și a probei de etanșeitate/funcționare a separatorului ulei-apă.
4. Confirmarea existenței și a integrității certificatelor de rezistență la foc pentru peretele antifoc, pentru toate traversările etanșate și pentru compartimentările interioare ale clădirii de comandă.
5. Confirmarea funcționării porții principale în regim manual de rezervă, fără alimentare electrică.
6. Confirmarea conformității finisajelor camerei bateriilor (pardoseală rezistentă la acid, corpuri de iluminat antiex, grile de ventilație neobturate) cu proiectul de instalații.
7. Confirmarea existenței avizului/autorizației de securitate la incendiu emis de ISU pentru ansamblul stației, conform HG 571/2016, corelat cu execuția reală a compartimentărilor și a sistemelor de stingere.
8. Confirmarea recepționării, de către operatorul de rețea (conform ATR), a configurației finale a incintei — accese, împrejmuire, priză de pământ — ca parte a condițiilor tehnice de racordare.
9. Recepția arhitecturii nu se poate efectua izolat de recepția de rezistență și de instalații — orice element cu interfață comună (fundație-cuvă, priză de pământ-legare echipotențială, compartimentare la foc-instalații electrice) se recepționează prin verificare încrucișată a celor trei specialități.

---

## PTh-A.10. NOTE DE CORELARE CU ALTE SPECIALITĂȚI ȘI ANEXĂ DE INDEX NORMATIV

### PTh-A.10.1. Ce se tratează în alte documente, nedublat aici

- Breviarul de calcul al fundațiilor de echipament, al portalurilor metalice, al cuvei de retenție (dimensionare structurală) și al clădirii de comandă — memoriul de rezistență PTh (`structura-pth.md`).
- Calculul de dimensionare a prizei de pământ (rezistență de dispersie, tensiuni de atingere/pas, curent de defect), coordonarea izolației, protecțiile electrice, servicii proprii, SCADA — memoriul de instalații PTh (`instalatii-pth.md`).
- Debitul și presiunea de stingere, dimensionarea rezervei de apă (dacă e cazul) — scenariul de securitate la incendiu, avizat ISU, document distinct.
- Studiul geotehnic complet și categoria geotehnică a amplasamentului — document distinct, preluat ca dat obligatoriu.

### PTh-A.10.2. Index normative citate în prezentul supliment (toate deja prezente în cadrul normativ DTAC, cu excepția instrumentelor pur constructive de la PTh-A.1.2)

| Normativ | Utilizat la |
|---|---|
| SR EN 61936-1 | Distanțe de securitate, gabarite zonă de protecție interioară |
| SR EN 50522 | Priza de pământ — execuție, legare echipotențială |
| SR EN 1992-3 | Cuva de retenție — etanșeitate |
| SR EN 858-1/2 | Separator ulei-apă |
| PE 101/PE 101A, PE 104 | Amplasarea aparatajului, distanțe în stații electrice |
| NTE 007 | Proiectarea/execuția instalațiilor de stații și posturi de transformare |
| P118-1/2/3, HG 571/2016, Legea 307/2006 | Securitate la incendiu, compartimentare |
| NP 051/2012 | Accesibilitate zonă administrativă |
| PD 177, NP 081 | Structura rutieră |
| SR EN ISO 1461 | Zincare împrejmuire și structuri auxiliare |
| C 56/2002 | Verificarea calității lucrărilor — cadru de recepție |
| P130/1999 | Urmărirea comportării în timp |

---

## PTh-A.11. TOLERANȚE DE EXECUȚIE — SINTEZĂ CONSOLIDATĂ

### PTh-A.11.1. Scop și mod de citire

Fiecare detaliu D01-D20 (PTh-A.2) enunță, în paragraful propriu de „cerințe de execuție și toleranțe", abaterea admisă pentru elementul pe care îl tratează. Prezentul capitol **nu introduce toleranțe noi, ci le reunește pe toate într-un singur tabel de control de șantier**, completat cu instrumentul de verificare folosit efectiv pe teren și cu acțiunea corectivă aplicabilă atunci când abaterea măsurată depășește valoarea admisă — informație pe care fiecare detaliu individual, tratat separat, nu o expune sintetic. Tabelul este instrumentul de lucru al dirigintelui de șantier și al responsabilului tehnic cu execuția (RTE) pentru controlul curent, în completarea planului de control al calității pe faze determinante (PTh-A.8).

### PTh-A.11.2. Tabel consolidat de toleranțe

| Element / lucrare | Toleranță admisă | Instrument / metodă de verificare | Detaliu de referință | Acțiune dacă toleranța e depășită |
|---|---|---|---|---|
| Nivel suprafață finită, platformă balastată 110 kV | ±2 cm față de cota de proiect | Nivelă optică/stație totală, rețea de puncte de control | D01 | Adaos sau decapare locală de strat de uzură, urmată de recontrol |
| Planeitate platformă betonată zona transformator | Abatere maximă 5 mm | Dreptar de 3 m, verificare pe toată suprafața | D02 | Șlefuire locală (abateri mici) sau decopertare-returnare (abateri mari, cu avizul proiectantului) |
| Paralelism căi de rulare transformator | ±3 mm/m pe toată lungimea | Fir de trasare/stație totală, înainte de turnarea betonului | D02, D15 | Recorectare poziție șine înainte de turnare; după turnare, doar cu avizul proiectantului de rezistență |
| Diferență de cotă la racordul platformă balastată-betonată | Maximum 3 cm | Nivelă, verificare punctuală la interfață | D03 | Reprofilare strat de tranziție |
| Planeitate radier cuvă de retenție | ±5 mm/m, verificată înainte de montarea grătarului | Dreptar/nivelă, în minimum 4 puncte pe suprafață | D05 | Șapă de egalizare (dacă nu afectează cota utilă h_util) sau remediere avizată de proiectantul de rezistență |
| Grosime strat de piatră deasupra grătarului cuvei | Minimum 0,25 m, verificată prin măsurare directă | Ruletă/șablon, în minimum 4 puncte | D05 | Completare locală cu piatră spartă |
| Verticalitate stâlpi împrejmuire | ±5 mm/m | Nivelă cu bulă/fir cu plumb | D09 | Recorectare poziție înainte de fixarea definitivă a panoului |
| Adâncime de îngropare grilă priză de pământ | Interval de proiect 0,7-0,8 m (nu o toleranță în jurul unei valori unice, ci un interval impus de calculul de dimensionare PTh-I) | Verificare directă în șanț, înainte de acoperire | D11 | Corectare adâncime înainte de acoperire; nu se acceptă abatere sub limita inferioară a intervalului |
| Rezistență de dispersie a prizei de pământ (R_E) | Valoare-țintă R_E < 1 Ω, conform datelor de calcul ale memoriului de instalații PTh (PTh-I.4) | Buletin de măsurătoare, metodă normată conform SR EN 50522 | D11 | Completare cu electrozi verticali suplimentari, densificare locală a ochiurilor grilei, apoi remăsurare |
| Tensiune de atingere efectivă | Sub valoarea admisibilă U_Tp,adm ≈ 220 V la timpul de eliminare a defectului tf ≈ 0,5 s (date de calcul PTh-I) | Buletin de măsurătoare | D11, D12 | Ecranare suplimentară/dale echipotențiale în punctele critice, conform soluției proiectantului de instalații |
| Rezistență de contact la fiecare punct de legare echipotențială | Valoare de continuitate electrică joasă, fără prag numeric unic — se verifică absența oricărei întreruperi/oxidări la punctul de legare | Ohmmetru de joasă rezistență (micro-ohmmetru) | D12 | Refacerea papucului de compresie sau a sudurii exoterme la punctul defectuos |
| Poziție buloane de ancoraj portaluri | Conform șablonului furnizorului, fără toleranță proprie de arhitectură — se preia direct toleranța din fișa tehnică a producătorului structurii metalice | Șablon fizic + verificare topografică, înainte de turnare | D13 | Repoziționare șablon înainte de turnare; după turnare, doar prin soluție avizată de proiectantul de rezistență (nu prin găurire liberă) |
| Lățime rost de dilatație structură rutieră | 15-20 mm | Șubler/riglă gradată | D17 | Ajustare la execuția rostului următor; rostul deja turnat greșit se remediază prin tăiere și rechituire |
| Rază de curbură minimă alveolă de manevră | 12 m, confirmată pe gabaritul real al ansamblului tractor-trailer contractat | Trasare topografică pe planul de execuție, verificată față de fișa tehnică a transportatorului | D18 | Extinderea alveolei înainte de trasarea finală a bordurilor — nu se acceptă o alveolă subdimensionată |
| Distanță gard-aparataj sub tensiune | Conform zonei de protecție interioară de 1,0-2,0 m (DTAC), cumulată cu distanța de izolație în aer a echipamentului celui mai apropiat | Verificare pe planul cotat definitiv, coroborat cu memoriul de instalații PTh | D09, D16 | Nu se acceptă nicio derogare — repoziționarea gardului este obligatorie dacă distanța executată e sub minim |
| Denivelare prag acces personal, clădire de comandă | Conform NP 051/2012, prag „la zero" sau rampă unde diferența de cotă o impune | Nivelă | D14 | Execuție rampă suplimentară dacă pragul executat depășește limita admisă |

### PTh-A.11.3. Toleranțe de montaj tâmplărie (completare la PTh-A.3)

Pentru ușile și golurile tehnologice tratate la PTh-A.3, toleranțele de montaj nu sunt fixate printr-un normativ unic de arhitectură, ci rezultă din fișa tehnică a fiecărui produs certificat (ușă rezistentă la foc, poartă motorizată) — abaterea maximă admisă la verticalitatea tocului, la diagonala golului și la jocul dintre canat și toc se preia, pentru fiecare poziție din tabloul de tâmplărie, din documentația tehnică a producătorului avizat, întrucât depășirea acestor valori anulează, de regulă, certificarea de rezistență la foc sau la efracție a ansamblului montat. Regula de execuție generală, aplicabilă indiferent de produs: golul de zidărie/beton se execută cu o rezervă de montaj simetrică față de gabaritul tocului (uzual câțiva milimetri pe fiecare latură, conform fișei produsului), iar spațiul rezultat se etanșează cu un material compatibil cu clasa de rezistență la foc a ansamblului — o spumă poliuretanică obișnuită, necertificată, într-un gol de montaj al unei uși EI 90-EI 120, anulează efectiv performanța la foc a ansamblului, indiferent de calitatea ușii înseși.

### PTh-A.11.4. Neconformități frecvente de execuție și tratarea lor

Abaterile constatate cel mai frecvent pe șantierele de acest tip — și modul lor corect de tratare, în absența unei prevederi contrare a proiectantului — sunt: (a) decalajul dintre poziția reală a inserțiilor/buloanelor turnate și gabaritul echipamentului efectiv livrat, tratat întotdeauna prin recalculare/soluție de recuperare avizată, niciodată prin forțarea montajului; (b) fisurile de contracție plastică la suprafața betonului proaspăt al cuvei sau al platformelor, tratate prin evaluarea proiectantului de rezistență înainte de orice reparație de suprafață, întrucât o fisură superficială poate fi indiciu al unei probleme mai adânci de tratare (curing) necorespunzătoare; (c) coborârile prizei de pământ deteriorate mecanic la compactarea platformei, tratate prin înlocuirea integrală a tronsonului afectat (nu prin înnădire la locul deteriorării, dacă aceasta e sub cota finală de platformă, inaccesibilă ulterior); (d) traversările prin peretele antifoc neînregistrate individual la momentul execuției, tratate prin oprirea finisării peretelui până la inventarierea completă și etanșarea certificată a fiecărei traversări constatate.

---

## PTh-A.12. PLANUL DE VERIFICARE A LUCRĂRILOR CARE DEVIN ASCUNSE (PVLA)

### PTh-A.12.1. Cadru legal specific PVLA (completare la PTh-A.1.2)

Alături de cadrul normativ tehnic citat la PTh-A.1.2, controlul lucrărilor care devin ascunse se supune cadrului legal de recepție a construcțiilor stabilit prin **HG nr. 273/1994** privind aprobarea Regulamentului de recepție a lucrărilor de construcții și instalațiilor aferente acestora, corelat cu **Legea nr. 10/1995** republicată (deja citată la PTh-A.1.2) în ceea ce privește obligația constructorului de a asigura, prin sistemul propriu de calitate, verificarea lucrărilor ascunse înainte de acoperirea lor, cu participarea investitorului/dirigintelui de șantier și, după caz, a proiectantului. HG 273/1994 este citat aici, similar cu C 56/2002 și P130/1999 de la PTh-A.1.2, ca **instrument procedural de recepție**, fără a introduce cerințe tehnice noi de fond față de cele deja stabilite la DTAC și la breviarele de calcul PTh de rezistență/instalații.

O lucrare este „ascunsă", în sensul prezentului capitol, atunci când execuția fazei următoare o face inaccesibilă vizual sau instrumental fără desfaceri: armătura înainte de turnarea betonului, hidroizolația/etanșarea cuvei înainte de montarea grătarului și a stratului de piatră, rețeaua de priză de pământ înainte de acoperirea cu ultimul strat de platformă, traseele de rețele îngropate înainte de umplerea șanțurilor. Pentru fiecare astfel de lucrare se încheie un **proces-verbal de lucrări ascunse (PVLA)**, distinct de procesul-verbal de fază determinantă (PTh-A.8) atunci când cele două nu coincid ca moment de verificare, dar identic ca rigoare — pentru cele două faze critice necondiționate ale prezentului proiect (etanșeitatea cuvei, execuția prizei de pământ), PVLA și procesul-verbal de fază determinantă se încheie, în practică, în cadrul aceleiași verificări comune.

### PTh-A.12.2. Tabel PVLA — lucrări de arhitectură/amenajare care devin ascunse

| Nr. | Lucrare care devine ascunsă | Detaliu de referință | Participanți la verificare | Condiție de continuare a lucrărilor |
|---|---|---|---|---|
| 1 | Teren de fundare descoperit la baza săpăturii | D01-D04 | Executant, diriginte de șantier, proiectant geotehnic | Nu se toarnă niciun beton de fundație/platformă până la confirmarea scrisă a naturii terenului |
| 2 | Armătura fundațiilor de echipament (transformator, portaluri, clădire comandă), la interfața de coordonare cu arhitectura (poziția golurilor de trecere rețele, a inserțiilor) | D04, D13 | Executant, diriginte de șantier, proiectant de rezistență | Nu se toarnă betonul până la PV de armătură semnat de proiectantul de rezistență |
| 3 | Hidroizolația/etanșarea bazinului cuvei de retenție, inclusiv rosturile cu bandă waterstop | D05 | Executant, diriginte de șantier, proiectant | Nu se montează grătarul și stratul de piatră până la proba de etanșeitate favorabilă (PTh-A.8) |
| 4 | Rețeaua de priză de pământ (grilă orizontală + electrozi verticali), inclusiv îmbinările prin sudură exotermă/papuci de compresie | D11 | Executant, diriginte de șantier, proiectant de instalații electrice | Nu se acoperă grila până la buletinul de măsurătoare favorabil (R_E, U_Tp) |
| 5 | Traseele de rețele îngropate generale (canalizare pluvială, conductă de legătură rigolă-separator, cabluri electrice îngropate în afara clădirii de comandă) | D07, D08 | Executant, diriginte de șantier | Nu se umplu șanțurile până la verificarea pantei, a etanșării racordurilor și a adâncimii de îngropare față de proiect |
| 6 | Fundațiile stâlpilor de împrejmuire și legarea lor provizorie la conductorul de contur al prizei de pământ | D09, D12 | Executant, diriginte de șantier | Nu se umple groapa fundației până la confirmarea continuității electrice a legăturii |
| 7 | Poziția buloanelor de ancoraj ai portalurilor, verificată pe șablonul furnizorului | D13 | Executant, diriginte de șantier, proiectant de rezistență | Nu se toarnă betonul soclului până la PV de șablon semnat |
| 8 | Traversările prin peretele antifoc, cu manșoanele de etanșare montate | D06 | Executant, diriginte de șantier | Nu se aplică finisajul peretelui până la inventarierea și certificarea individuală a fiecărei traversări |
| 9 | Straturile succesive ale platformei balastate/betonate (strat de formă, strat suport), înainte de aplicarea stratului următor | D01, D02, D17 | Executant, diriginte de șantier | Nu se așterne stratul următor până la confirmarea gradului de compactare Proctor al stratului verificat |

### PTh-A.12.3. Conținutul minim al procesului-verbal de lucrări ascunse

Fiecare PVLA încheiat pe șantier conține, la minimum: numărul și data încheierii; obiectul exact al verificării (cu trimitere la poziția din tabelul PTh-A.12.2 și la detaliul de execuție corespunzător); descrierea lucrării constatate la verificare (dimensiuni, materiale, poziții măsurate); constatările privind conformitatea cu proiectul (inclusiv, unde e cazul, buletinul de măsurătoare atașat); concluzia explicită — admis pentru continuarea lucrărilor sau respins, cu remedieri impuse și termen de reverificare; semnăturile tuturor participanților prevăzuți în tabel. PVLA-urile, împreună cu buletinele de măsurătoare atașate, se arhivează în cartea tehnică a construcției (PTh-A.15) și rămân disponibile pe toată durata de exploatare a stației, întrucât o intervenție ulterioară asupra oricăreia dintre aceste lucrări (de exemplu, o extindere a rețelei de priză de pământ la etapa de dezvoltare 2×40 MVA) pornește de la configurația consemnată în PVLA-ul inițial, nu de la o presupunere.

### PTh-A.12.4. Relația cu fazele determinante necondiționate

Cele două faze identificate ca necondiționate la PTh-A.8 (etanșeitatea cuvei de retenție, execuția prizei de pământ) rămân, și în logica PVLA, punctele de oprire cu cea mai mare consecință dacă sunt omise: o etanșeitate nereconfirmată, acoperită cu grătar și strat de piatră, sau o priză de pământ neconformă, acoperită cu ultimul strat de platformă, nu mai pot fi corectate decât prin desfacerea integrală a lucrărilor puse ulterior în operă — motiv pentru care PVLA-urile poziția 3 și poziția 4 din tabelul PTh-A.12.2 se semnează, obligatoriu, înainte de programarea oricărei activități de șantier care ar acoperi fizic zona verificată, nu retroactiv.

---

## PTh-A.13. TEHNOLOGIA DE EXECUȚIE — DETALIEREA OPERAȚIILOR CRITICE (completare la PTh-A.5)

### PTh-A.13.1. Tehnologia de execuție a cuvei de retenție a uleiului electroizolant (detaliere a pasului 4 din succesiunea PTh-A.5.1)

1. Trasarea conturului cuvei pe planul de execuție coordonat (D04), cu verificarea încrucișată față de gabaritul transformatorului contractat și de armătura fundației (memoriul de rezistență PTh).
2. Săpătura și pregătirea patului de fundare, cu un strat de egalizare din beton simplu de curățenie (grosime uzuală 5-10 cm), pentru a asigura o suprafață de lucru uniformă montajului cofrajelor și armăturii.
3. Montarea cofrajelor interioare și exterioare ale bazinului, cu verificarea etanșeității rosturilor de cofrare — o scurgere de lapte de ciment la cofraj în timpul turnării produce o zonă poroasă permeabilă exact în peretele care trebuie să fie etanș.
4. Montarea armăturii conform breviarului de calcul al memoriului de rezistență PTh, cu respectarea acoperirii minime cu beton impuse pentru clasa de expunere a elementului (dată preluată, nu recalculată la arhitectură).
5. Montarea benzii de etanșare (waterstop) la toate rosturile de turnare prevăzute în planul de betonare, continuă, fără întreruperi la colțuri și la intersecții — punctul de coordonare tehnologică cel mai sensibil al întregii operațiuni, întrucât o discontinuitate de câțiva centimetri la un colț anulează funcția benzii pe tot perimetrul.
6. Turnarea betonului, pe cât posibil monolit pentru radier și pereți, în straturi orizontale succesive, cu vibrare mecanică internă pentru evitarea segregării agregatelor și a golurilor de compactare (sufluri) — principala cauză tehnologică a permeabilității locale într-un element altfel corect dimensionat.
7. Tratarea betonului proaspăt (curing) prin menținere umedă sau acoperire cu folie/materiale de protecție, minimum 7 zile, cu atenție sporită la elementul cuvei față de un element structural obișnuit, întrucât fisurarea de contracție plastică la suprafață compromite direct performanța de etanșeitate urmărită.
8. Decofrarea la termenul stabilit de proiectantul de rezistență, urmată de inspecția vizuală a tuturor suprafețelor interioare ale bazinului (fisuri, sufluri, zone de segregare vizibilă) și de remedierea oricărei neconformități constatate, înainte de proba de etanșeitate.
9. Proba de etanșeitate (umplere cu apă la nivelul h_util, minimum 72 de ore, conform D05/PTh-A.8), efectuată exclusiv pe bazinul finit, curățat și inspectat, niciodată ca substitut al inspecției vizuale prealabile.
10. Montarea grătarului și a stratului de piatră spartă doar după procesul-verbal de probă favorabil (PVLA poziția 3, PTh-A.12.2) — succesiunea nu se inversează sub nicio motivare de planificare de șantier.

### PTh-A.13.2. Tehnologia de execuție a rețelei de priză de pământ (detaliere a pasului 5 din succesiunea PTh-A.5.1)

1. Trasarea traseului grilei orizontale și a punctelor de amplasare a electrozilor verticali, strict conform planului rezultat din calculul de dimensionare al memoriului de instalații PTh (PTh-I.4.9), fără devieri neconsemnate.
2. Săparea șanțurilor la adâncimea de proiect (0,7-0,8 m), cu verificare directă a adâncimii în șanț, punct cu punct, înainte de pozare — nu prin estimare vizuală a adâncimii de săpătură.
3. Pozarea conductorului de grilă (platbandă sau conductor rotund, OL-Zn sau cupru, conform D11) și montarea electrozilor verticali la colțurile incintei și la densitate sporită lângă poartă și lângă fundațiile de echipament critic.
4. Realizarea tuturor îmbinărilor exclusiv prin sudură exotermă (cadweld) sau papuci de compresie certificați — este interzisă, la orice punct al rețelei, înnădirea prin clemă simplă, susceptibilă de corodare și de desfacere mecanică pe termen lung, fără posibilitate de control ulterior odată acoperită.
5. Legarea provizorie, în punctele care vor necesita ulterior legare echipotențială (D12) — stâlpi de gard, socluri de portal, cuve, viitoare carcase de echipament — pentru a evita o a doua deschidere a șanțului la faza de montaj a echipamentelor.
6. Măsurarea rezistenței de dispersie (R_E) și a tensiunilor de atingere/pas efective, cu grila complet montată dar **încă neacoperită**, comparând rezultatul cu valorile-țintă de calcul ale memoriului de instalații PTh (R_E < 1 Ω, U_Tp,adm ≈ 220 V la tf ≈ 0,5 s, conform datelor de dimensionare PTh-I).
7. Dacă măsurătoarea nu confirmă valorile-țintă, se completează rețeaua cu electrozi verticali suplimentari sau se densifică local ochiurile grilei, urmată de o nouă măsurătoare — operațiune posibilă doar cât timp grila rămâne neacoperită.
8. Acoperirea finală a șanțurilor cu ultimul strat de platformă (D01/D17) se execută doar după procesul-verbal de măsurătoare favorabil (PVLA poziția 4, PTh-A.12.2).
9. Montarea cutiilor de vizitare la punctele principale de coborâre, amplasate accesibil și marcate, pentru a permite măsurători periodice ulterioare pe toată durata de exploatare, fără desfaceri.

### PTh-A.13.3. Condiții climatice de execuție a lucrărilor de beton

Turnarea betoanelor platformelor, a cuvei și a fundațiilor de echipament respectă condițiile generale de execuție pe timp friguros și pe timp călduros stabilite de **NE 012-1/2007** (deja citat la PTh-A.1.2): nu se toarnă beton la temperaturi ale aerului sub pragul stabilit de acest normativ pentru execuția fără măsuri speciale de protecție, fără aplicarea măsurilor de protecție termică (izolare a cofrajelor, eventuală încălzire a materialelor componente) prevăzute pentru betonarea pe timp friguros; pe timp călduros, suprafețele proaspăt turnate — în special radierul și pereții cuvei de retenție, unde fisurarea de contracție plastică ar compromite direct etanșeitatea — se protejează prin stropire/acoperire cu materiale de menținere a umidității, pentru evitarea evaporării premature a apei de amestec. Turnarea nu se execută în condiții de precipitații abundente, care ar spăla laptele de ciment de la suprafața elementului proaspăt turnat, cu efect direct asupra calității stratului de acoperire a armăturii și, la cuvă, asupra etanșeității suprafeței.

### PTh-A.13.4. Tehnologia de montaj a tâmplăriei tehnice

Montarea ușilor rezistente la foc (camera celulelor MT, camera bateriilor), a porților și a ferestrei de supraveghere respectă succesiunea: verificarea golului executat față de toleranțele de la PTh-A.11.3; montarea tocului cu ancorele/diblurile certificate de producător, la interax-ul specificat în fișa tehnică; etanșarea perimetrală a spațiului de montaj cu un material compatibil cu clasa de rezistență la foc a ansamblului (nu cu spumă poliuretanică obișnuită necertificată, la ușile EI 90-EI 120); verificarea funcțională a feroneriei — bară antipanică și, unde e prevăzut, dispozitiv de autoînchidere, pe toate ușile camerelor tehnice — și proba de manevră a porții motorizate, atât în regim normal (telecomandă/control acces), cât și în regim manual de rezervă, fără alimentare electrică, conform cerinței de la D10/PTh-A.9 pct. 5.

### PTh-A.13.5. Tehnologia de execuție a peretelui antifoc dintre boxele de transformator

1. Trasarea poziției și a lungimii peretelui pe planul de execuție, confirmată față de breviarul de calcul PSI al scenariului de securitate la incendiu avizat de ISU (document distinct, preluat ca dat obligatoriu, conform PTh-A.7.3) — nu se trasează o lungime „la vedere" fără această confirmare.
2. Execuția fundației peretelui (continuă sau solidarizată cu fundația transformatorului, conform memoriului de rezistență PTh), coordonată astfel încât să nu rămână niciun rost deschis la bază între fundația peretelui și fundațiile adiacente, prin care radiația termică ar putea ocoli peretele pe sub cotă (PTh-A.7.2).
3. Ridicarea peretelui (beton armat sau zidărie plină, conform D06) până la înălțimea care depășește gabaritul complet al celui mai înalt transformator prevăzut de etapizare, inclusiv accesoriile montate la partea superioară (conservator de ulei), verificată pe fișa tehnică a echipamentului efectiv contractat, nu pe o valoare orientativă de catalog.
4. Prelungirea în plan a peretelui dincolo de conturul fiecărei cuve de retenție adiacente (PTh-A.7.2), astfel încât să nu rămână nicio „fereastră" laterală de expunere directă între cele două boxe — verificare pe planul cotat definitiv, coroborată cu poziția reală a cuvelor executate (D05).
5. Montarea și înregistrarea individuală a fiecărei traversări tehnologice prin perete (cabluri de forță, cabluri de comandă-control, eventuale conducte ale sistemului de stingere), cu manșoane de etanșare la foc certificate la o performanță egală cu a peretelui — fiecare traversare se fotografiază și se consemnează în PVLA-ul poziției 8 (PTh-A.12.2) înainte de aplicarea oricărui finisaj care ar masca-o.
6. Aplicarea finisajului peretelui (PTh-A.14.2) doar după inventarierea completă și certificarea tuturor traversărilor — o traversare descoperită ulterior, sub finisaj deja aplicat, impune desfacerea locală a finisajului pentru verificare.

### PTh-A.13.6. Tehnologia de execuție a rigolelor, a căminului de vizitare și a separatorului ulei-apă

1. Trasarea traseului rigolelor perimetrale și a conductei de legătură spre separator, cu pantele minime de proiect (0,5% pentru rigolele generale, conform D08; panta conductei de legătură conform memoriului de instalații PTh), verificate topografic înainte de execuție.
2. Execuția rigolelor (beton prefabricat sau turnat) și a căminului de vizitare cu vană de izolare (D05), cu etanșarea tuturor rosturilor și a penetrărilor cămin-conductă.
3. Montarea separatorului ulei-apă la adâncimea impusă de producător pentru funcționarea corectă a plăcilor coalescente (D07) — nu la o adâncime „convenabilă de șantier" — cu verificarea accesibilității pentru vidanjare periodică cu autovidanjă.
4. Proba de etanșeitate a căminului și a conductei de legătură, urmată de proba funcțională a flotorului de închidere automată a separatorului (blocarea evacuării la depășirea capacității de separare) — ambele probe obligatorii înainte de recepție (PTh-A.8).
5. Racordarea finală: rigolele din zona transformatoarelor exclusiv prin sistemul cuvă-separator, rigolele din zona 110 kV balastată direct la canalizarea pluvială generală, fără trecere prin separator (principiu de execuție deja stabilit la D08) — verificare încrucișată a racordurilor reale față de planul de proiect, întrucât o inversare a celor două trasee ar anula funcția de reținere a hidrocarburilor exact acolo unde e necesară.

---

## PTh-A.14. COMPLETARE FINISAJE — BOXA EXTERIOARĂ A TRANSFORMATORULUI ȘI TRATAMENTE GENERALE DE SUPRAFAȚĂ (completare la PTh-A.4)

### PTh-A.14.1. Precizare de coerență cu tipul de stație

Stația este de tip **exterior AIS** (dat stabilit la DTAC, `general.md`, `arhitectura.md`) — transformatorul de putere nu este adăpostit într-o încăpere închisă, ci este amplasat într-o **boxă exterioară delimitată** de peretele antifoc (D06) dinspre transformatorul vecin și de conturul cuvei de retenție (D05) la bază. Fișele de finisaje deja date la PTh-A.4.2 (platforma betonată) și PTh-A.4.3 (cuva) acoperă suprafețele orizontale ale acestei boxe; prezentul capitol completează cu suprafețele verticale și cu elementele de securitate proprii boxei, netratate separat până acum.

### PTh-A.14.2. Fișă finisaje — suprafețe verticale ale boxei transformatorului

| Element | Produs-tip | Clasă/performanță | Punere în operă |
|---|---|---|---|
| Suprafață perete antifoc, față dinspre boxă | Beton aparent sau tencuială minerală, fără elemente combustibile de finisaj | Compatibilă cu clasa de rezistență la foc a peretelui, stabilită de scenariul de securitate la incendiu (D06) | Fără fixări mecanice care perforează grosimea utilă de rezistență la foc a peretelui |
| Structuri metalice suport bare/conexiuni, în interiorul boxei | Vopsea anticorozivă în sistem complet (grund + strat intermediar + strat de finisaj) | Clasă de coroziune C4-C5 (mediu exterior, posibilă expunere la umiditate și poluare industrială), conform SR EN ISO 12944 | Control al grosimii peliculei uscate la fiecare strat |
| Marcaje de securitate în interiorul boxei | Pancarte pericol electric și plăcuțe de identificare a echipamentului (D16) | Rezistență UV/intemperii | Fixare pe structurile metalice de susținere, niciodată pe suprafața cuvei sau a grătarului |
| Corpuri de iluminat de securitate în boxă | Corpuri exterioare IP65, conform mediului | Conform memoriul de instalații PTh | Poziționare care nu obstrucționează accesul de mentenanță la echipament sau la cuvă |

### PTh-A.14.3. Fișă finisaje — tratamente de suprafață generale ale incintei

| Element | Produs-tip | Clasă/performanță | Punere în operă |
|---|---|---|---|
| Culoare/ton general al elementelor vizibile de arhitectură (clădire comandă, gard, porți) | Ton sobru, coerent pe întreaga incintă, conform proiectului de arhitectură definitiv | Rezistență UV pe durata de exploatare | Aplicare uniformă, fără variații de lot vizibile pe elemente adiacente |
| Semnalistică unitară de securitate (pericol electric, identificare echipamente, evacuare) | Sistem grafic unic pe toată incinta, dimensiuni și pictograme conforme cerințelor deja citate (PTh-A.3, D16) | Rezistență UV/intemperii, vizibilitate pe termen lung | Amplasare conform planului de distanțe de securitate, fără suprapuneri sau ambiguități de citire |
| Elemente metalice exterioare generale (balustrăzi, capace de vizitare, rame) | Zincare la cald conform SR EN ISO 1461 sau vopsea anticorozivă echivalentă unde zincarea nu e aplicabilă | Clasă de coroziune conform mediului de expunere | Verificare vizuală a continuității stratului de protecție la recepție |

---

## PTh-A.15. CARTEA TEHNICĂ A CONSTRUCȚIEI — COMPONENTA DE ARHITECTURĂ (DOSAR AS-BUILT)

### PTh-A.15.1. Obiect și cadru legal

Conform **Legii nr. 10/1995** republicată și **HG nr. 273/1994**, cartea tehnică a construcției se întocmește pe toată durata execuției și se predă completă la recepția la terminarea lucrărilor; prezentul capitol enumeră **componenta de arhitectură** a acestui dosar, fără a relua conținutul componentelor de rezistență (`structura-pth.md`) sau de instalații (`instalatii-pth.md`), fiecare responsabilă de propriul capitol al cărții tehnice.

### PTh-A.15.2. Conținutul componentei de arhitectură

- Planul de situație cotat definitiv, cu toate amenajările incintei, în forma as-built (cu eventualele modificări de șantier consemnate și vizate de proiectant).
- Planșele de detaliu D01-D20 (PTh-A.2), în forma as-built.
- Tabloul de tâmplărie (PTh-A.3), cu fișele tehnice și certificatele de conformitate/rezistență la foc ale fiecărei poziții efectiv montate.
- Fișele de finisaje și materiale (PTh-A.4, PTh-A.14), cu certificatele de calitate ale materialelor puse în operă (beton, geotextil, bandă waterstop, piatră spartă, elemente zincate, vopsele anticorozive, echipament separator ulei-apă).
- Procesele-verbale de lucrări ascunse (PVLA, PTh-A.12), complete pentru toate pozițiile din tabelul PTh-A.12.2.
- Procesele-verbale de fază determinantă (PTh-A.8), complete pentru toate fazele identificate, cu accent pe cele două faze necondiționate (etanșeitate cuvă, priză de pământ).
- Buletinele de măsurătoare: rezistivitate de suprafață a platformei balastate, rezistență de dispersie și tensiuni de atingere/pas ale prizei de pământ, rezistență de contact la fiecare punct de legare echipotențială.
- Certificatele de rezistență la foc ale manșoanelor de etanșare a traversărilor prin peretele antifoc și ale compartimentărilor interioare ale clădirii de comandă (uși, pereți EI 90-EI 120).
- Avizul/autorizația de securitate la incendiu emisă de ISU pentru ansamblul stației.
- Procesul-verbal de recepție la terminarea lucrărilor, capitolul de arhitectură, cu lista eventualelor remedieri și termenul de execuție al acestora.

### PTh-A.15.3. Regim de păstrare și utilizare pe durata exploatării

Dosarul de arhitectură al cărții tehnice rămâne disponibil pe toată durata de exploatare a stației (30-40 de ani sau mai mult, conform DTAC) și constituie referința obligatorie pentru orice intervenție ulterioară cu interfață de arhitectură — extinderea la etapa de dezvoltare 2×40 MVA, o eventuală înlocuire de transformator (PTh-A.6), o reparație a cuvei de retenție sau o completare a prizei de pământ. Nicio astfel de intervenție nu pornește de la o presupunere asupra configurației executate, ci de la configurația consemnată în PVLA-urile și buletinele de măsurătoare arhivate în prezentul dosar.

---

## PTh-A.16. FIȘĂ DE VERIFICARE RAPIDĂ PE ȘANTIER (CHECKLIST DE ARHITECTURĂ)

### PTh-A.16.1. Scopul fișei

Capitolele PTh-A.1-PTh-A.15 tratează, fiecare, un aspect complet al execuției — detaliu constructiv, tehnologie, control de calitate, recepție. Prezenta fișă **nu adaugă nicio cerință nouă**, ci reunește, într-un format de bifat pe teren, punctele de control pe care dirigintele de șantier și responsabilul tehnic cu execuția (RTE) le parcurg înainte de a autoriza trecerea la faza următoare — utilă în special echipei de execuție care nu parcurge zilnic memoriul integral, ci un instrument de lucru condensat, cu trimitere explicită la capitolul de detaliu unde se găsește justificarea completă.

### PTh-A.16.2. Checklist — înainte de turnarea oricărei fundații/platforme

- [ ] Teren de fundare confirmat geotehnic pe șantier (PTh-A.12.2 poz. 1)
- [ ] Poziția în plan coordonată cu gabaritul echipamentului efectiv contractat, nu cu o valoare orientativă de proiect (D04, PTh-A.11.4 lit. a)
- [ ] Armătura verificată și PV de armătură semnat, unde e cazul (PTh-A.12.2 poz. 2)
- [ ] Cofrajele verificate la etanșeitate, fără risc de scurgere a laptelui de ciment (PTh-A.13.1 pct. 3)
- [ ] Condiții climatice conforme NE 012-1/2007 pentru turnare (PTh-A.13.3)

### PTh-A.16.3. Checklist — cuva de retenție a uleiului (fază necondiționată)

- [ ] Banda de etanșare (waterstop) montată continuu la toate rosturile, fără întreruperi la colțuri (PTh-A.13.1 pct. 5)
- [ ] Beton tratat (curing) minimum 7 zile, fără fisuri de contracție plastică vizibile la decofrare (PTh-A.13.1 pct. 7-8)
- [ ] Proba de etanșeitate efectuată — umplere la h_util, minimum 72 ore, fără scădere de nivel peste toleranța stabilită de proiectantul de rezistență (D05, PTh-A.8)
- [ ] PVLA poziția 3 semnat, favorabil, ÎNAINTE de montarea grătarului și a stratului de piatră (PTh-A.12.2 poz. 3, PTh-A.12.4)
- [ ] Grosimea stratului de piatră verificată în minimum 4 puncte, ≥0,25 m (PTh-A.11.2)

### PTh-A.16.4. Checklist — priza de pământ (fază necondiționată)

- [ ] Traseu, adâncime (0,7-0,8 m) și densitate a grilei conforme calculului de dimensionare PTh-I, fără devieri neconsemnate (PTh-A.13.2 pct. 1-2)
- [ ] Toate îmbinările executate prin sudură exotermă sau papuc de compresie certificat — nicio clemă simplă (PTh-A.13.2 pct. 4)
- [ ] Măsurătoare efectuată cu grila neacoperită: R_E < 1 Ω, U_Tp sub valoarea admisibilă la tf de calcul (PTh-A.13.2 pct. 6, PTh-A.11.2)
- [ ] Dacă țintele nu sunt atinse: electrozi suplimentari montați și remăsurați înainte de acoperire (PTh-A.13.2 pct. 7)
- [ ] PVLA poziția 4 semnat, favorabil, ÎNAINTE de acoperirea finală cu ultimul strat de platformă (PTh-A.12.2 poz. 4, PTh-A.12.4)

### PTh-A.16.5. Checklist — perete antifoc și compartimentări

- [ ] Lungime/înălțime confirmate față de breviarul PSI avizat ISU și față de gabaritul complet al echipamentului contractat (PTh-A.13.5 pct. 1, 3)
- [ ] Fără rosturi deschise la baza peretelui, fără „fereastră" laterală față de cuvele adiacente (PTh-A.13.5 pct. 2, 4)
- [ ] Toate traversările înregistrate individual, cu manșoane certificate, ÎNAINTE de finisaj (PTh-A.12.2 poz. 8, PTh-A.13.5 pct. 5-6)
- [ ] Certificatele EI 90-EI 120 disponibile pentru toate ușile/pereții compartimentați ai clădirii de comandă (PTh-A.8, PTh-A.9 pct. 4)

### PTh-A.16.6. Checklist — împrejmuire, porți, acces

- [ ] Fiecare stâlp de gard legat individual la priza de pământ (D09, D12)
- [ ] Distanța gard-aparataj sub tensiune verificată pe planul cotat definitiv, cumulată cu distanța de izolație în aer (PTh-A.11.2, fără nicio derogare)
- [ ] Poarta principală funcțională în regim manual de rezervă, fără alimentare electrică (D10, PTh-A.9 pct. 5)
- [ ] Golurile de tâmplărie tehnică montate conform toleranțelor fișei tehnice a producătorului, etanșate cu materiale compatibile cu clasa de rezistență la foc (PTh-A.11.3, PTh-A.13.4)

### PTh-A.16.7. Checklist — separator ulei-apă, rigole, drenaj

- [ ] Separator montat la adâncimea impusă de producător, accesibil pentru vidanjare (PTh-A.13.6 pct. 3)
- [ ] Probă de etanșeitate și probă funcțională a flotorului efectuate (PTh-A.13.6 pct. 4, PTh-A.8)
- [ ] Racorduri corecte: rigole zonă transformator prin sistemul cuvă-separator; rigole zonă 110 kV direct la canalizarea pluvială generală (PTh-A.13.6 pct. 5)

### PTh-A.16.8. Checklist — înainte de recepția finală de arhitectură

- [ ] Toate PVLA din tabelul PTh-A.12.2 semnate și arhivate
- [ ] Toate fazele determinante din PTh-A.8 confirmate, cu buletinele de măsurătoare atașate
- [ ] Toate verificările de la PTh-A.9 (pct. 1-9) parcurse și confirmate
- [ ] Dosarul de arhitectură al cărții tehnice complet, conform listei de la PTh-A.15.2
- [ ] Recepția arhitecturii coordonată, nu izolată, cu recepția de rezistență și de instalații (PTh-A.9 pct. 9)

---

*Supliment de fază P.Th. întocmit pentru cerințele fundamentale A (rezistență și stabilitate — prin coordonare cu memoriul de rezistență), B (securitate la incendiu), C (igienă, sănătate, mediu — prin cuva de retenție și separatorul ulei-apă) și D (siguranță și accesibilitate în exploatare — prin distanțele de securitate și priza de pământ) ale Legii nr. 10/1995, la nivelul de detaliere necesar execuției, completat cu toleranțele de execuție consolidate (PTh-A.11), planul de verificare a lucrărilor ascunse conform HG 273/1994 (PTh-A.12), detalierea tehnologică a operațiilor critice (PTh-A.13), componenta de arhitectură a cărții tehnice a construcției (PTh-A.15) și fișa de verificare rapidă pe șantier (PTh-A.16). Documentul nu dublează conținutul memoriului de arhitectură DTAC (`arhitectura.md`) și se citește exclusiv coroborat cu acesta, cu memoriul de rezistență PTh (`structura-pth.md`) și cu memoriul de instalații PTh (`instalatii-pth.md`).*
