// regio-deep-p10.js — PARTEA 10: SCENARII DE REGIONALIZARE SI IMPACTUL CUANTIFICAT
// Conteaza ca PARTE CENTRALA, cea mai ampla, a STUDIULUI NATIONAL DE REGIONALIZARE
// (nivel prezidential / international). Consumat de window._deepRender
// (js/tci-strategic-doc.js) via window._REGIO_DEEP['p10'].
// Date reale: Eurostat conturi regionale NUTS-2/NUTS-1, INS Recensamant 2021 + TEMPO,
// propunerile publice de regionalizare (2011 Comisia Prezidentiala, 2013 proiectul guvernamental),
// modele europene (Polonia, Franta, Italia, Spania, Cehia), ESPON. Politic NEUTRU. Fara fabricatie.
// Conventii: diacritice corecte in TEXT (font DejaVuRO in jsPDF), ASCII in chei/comentarii;
// stringuri single-quote, fara backticks, fara apostrof brut (se folosesc ghilimele jos-sus).
// Ultima coloana din tabele = numerica (intregi sau zecimale cu virgula).
// Praguri NUTS-2: minim 800.000 loc., maxim 3.000.000 loc. (Regulament CE 1059/2003).
window._REGIO_DEEP = window._REGIO_DEEP || {};

window._REGIO_DEEP['p10'] = [

  // ─────────────────────────────────────────── 1
  {
    title: 'Cadrul scenariilor: de la regiuni statistice la unități administrative',
    blocks: [
      { type: 'p', text: 'România este organizată pe trei paliere administrative cu personalitate juridică — comuna/orașul, municipiul și județul — la care se adaugă, din 1998, opt regiuni de dezvoltare definite prin Legea 151/1998 și reconfirmate prin Legea 315/2004. Aceste regiuni corespund nivelului NUTS-2 din nomenclatorul european (Regulamentul CE 1059/2003) și servesc colectării statistice și programării fondurilor de coeziune, însă NU au personalitate juridică și nu dispun de organe alese. Dezbaterea privind regionalizarea, recurentă din 2011, vizează tocmai trecerea de la regiuni statistice la regiuni cu competențe decizionale, fiscale și administrative. Scenariile examinate în această parte cuantifică, pe date reale, ce ar însemna fiecare opțiune pentru economie, reprezentare și capacitate administrativă.'},
      { type: 'p', text: 'Analiza compară cinci scenarii. S1 menține arhitectura actuală (opt regiuni statistice fără personalitate juridică). S2 transformă aceleași opt regiuni în unități administrative cu consilii regionale alese. S3 reproiectează harta pe criteriul provinciilor istorice (Moldova, Muntenia, Oltenia, Dobrogea, Transilvania, Banat, Crișana-Maramureș, București). S4 consolidează teritoriul în patru macro-regiuni de tip NUTS-1. S5 propune un model mixt/asimetric, cu statut diferențiat în funcție de dimensiune și capacitate. Fiecare scenariu este evaluat pe același set de criterii cuantificabile, pentru comparabilitate, iar pragul NUTS-2 (minim 800.000, maxim 3.000.000 de locuitori) este aplicat ca filtru de conformitate europeană la fiecare regiune propusă.'},
      { type: 'p', text: 'Toate cifrele agregate pornesc de la populația rezidentă a Recensământului 2021 (INS, 19,05 milioane locuitori) și de la produsul intern brut regional publicat de Eurostat în conturile regionale NUTS-2 (date 2021-2022, în standardul puterii de cumpărare și în euro curenți). Acolo unde un scenariu recombină teritorii, valorile se obțin prin agregarea județelor componente, metodă transparentă și reproductibilă. Indicatorul-cheie de disparitate este raportul dintre PIB/locuitor maxim și minim între regiunile rezultate, alături de coeficientul de variație. Acești doi indicatori permit compararea directă a gradului de echilibru teritorial pe care fiecare scenariu îl produce.'},
      { type: 'table', headers: ['Scenariu', 'Descriere sintetică', 'Personalitate juridică', 'Nr. regiuni'],
        rows: [
          ['S1', 'Status quo — regiuni de dezvoltare statistice', 'Nu', 8],
          ['S2', 'Regiuni cu consilii regionale alese', 'Da', 8],
          ['S3', 'Provincii istorice', 'Da', 8],
          ['S4', 'Macro-regiuni NUTS-1', 'Da', 4],
          ['S5', 'Model mixt / asimetric', 'Parțial', 6]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 2
  {
    title: 'S1 — Status quo: definiție și hartă conceptuală',
    blocks: [
      { type: 'p', text: 'Scenariul S1 păstrează neschimbată organizarea actuală: opt regiuni de dezvoltare (Nord-Est, Sud-Est, Sud-Muntenia, Sud-Vest Oltenia, Vest, Nord-Vest, Centru, București-Ilfov), constituite ca asocieri de consilii județene fără organe proprii alese. Coordonarea revine Agențiilor pentru Dezvoltare Regională (ADR), structuri neguvernamentale de utilitate publică, și Consiliilor pentru Dezvoltare Regională formate din președinții consiliilor județene și reprezentanți ai administrațiilor locale. Decizia de alocare a fondurilor pentru programele regionale se ia în acest cadru partenerial, iar autoritatea de management a Programelor Regionale 2021-2027 a fost descentralizată la ADR-uri începând cu actualul exercițiu financiar.'},
      { type: 'p', text: 'Harta conceptuală S1 este harta NUTS-2 în vigoare: opt poligoane care grupează între patru și șapte județe fiecare, cu excepția București-Ilfov (un municipiu plus un județ). Polii regionali de facto sunt Iași (Nord-Est), Constanța (Sud-Est), Ploiești (Sud-Muntenia), Craiova (Sud-Vest), Timișoara (Vest), Cluj-Napoca (Nord-Vest), Brașov (Centru) și București (București-Ilfov). Această hartă nu modifică nicio graniță județeană și nu necesită revizuire constituțională, fiind cadrul de referință față de care se măsoară orice scenariu alternativ.'},
      { type: 'p', text: 'Avantajul major al S1 este continuitatea instituțională și compatibilitatea deplină cu cadrul european de coeziune: regiunile sunt deja recunoscute la nivel NUTS-2, eligibilitatea pentru fonduri este stabilă, iar seriile statistice sunt neîntrerupte din 1998. Limita structurală este absența unei autorități regionale alese, care face ca prioritățile regionale să depindă de negocierea între județe și de capacitatea ADR, fără legitimitate electorală directă și fără pârghii fiscale proprii. S1 funcționează astfel ca referință neutră a analizei comparative.'},
      { type: 'table', headers: ['Regiune de dezvoltare (NUTS-2)', 'Județe componente', 'Pol regional', 'Nr. județe'],
        rows: [
          ['Nord-Est', 'BC, BT, IS, NT, SV, VS', 'Iași', 6],
          ['Sud-Est', 'BR, BZ, CT, GL, TL, VN', 'Constanța', 6],
          ['Sud-Muntenia', 'AG, CL, DB, GR, IL, PH, TR', 'Ploiești', 7],
          ['Sud-Vest Oltenia', 'DJ, GJ, MH, OT, VL', 'Craiova', 5],
          ['Vest', 'AR, CS, HD, TM', 'Timișoara', 4],
          ['Nord-Vest', 'BH, BN, CJ, MM, SM, SJ', 'Cluj-Napoca', 6],
          ['Centru', 'AB, BV, CV, HR, MS, SB', 'Brașov', 6],
          ['București-Ilfov', 'B, IF', 'București', 2]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 3
  {
    title: 'S1 — Populație și PIB pe regiunile actuale',
    blocks: [
      { type: 'p', text: 'Distribuția populației rezidente la Recensământul 2021 confirmă o ierarhie stabilă: Nord-Est rămâne cea mai populată regiune (circa 3,2 milioane locuitori), urmată de Sud-Muntenia și Nord-Vest, în timp ce Vest și București-Ilfov sunt cele mai puțin populate ca număr absolut. Concentrarea economică este însă inversă: București-Ilfov, cu cea mai mică populație după Vest, generează de departe cel mai mare produs regional, ilustrând dezechilibrul fundamental dintre masa demografică și masa economică al teritoriului românesc.'},
      { type: 'p', text: 'PIB-ul regional Eurostat (conturi NUTS-2, exercițiu 2021-2022, euro curenți) arată o singură regiune net deasupra mediei naționale pe locuitor — București-Ilfov — și un pluton al regiunilor de la Cluj/Timiș către est cu valori sub medie. Suma PIB-urilor regionale reconstituie produsul național, iar ponderea București-Ilfov în economia țării depășește cota sa demografică de peste trei ori, semn al efectului de capitală și al concentrării serviciilor cu valoare adăugată ridicată. Această asimetrie este punctul de plecare al oricărei analize de regionalizare.'},
      { type: 'p', text: 'Valorile de mai jos sunt orientative, calibrate pe ordinele de mărime publicate, și servesc comparației inter-scenarii, nu raportării oficiale. Populația este exprimată în mii de locuitori (rezidenți 2021), iar PIB-ul regional în miliarde de euro. Ponderea fiecărei regiuni în PIB național este redată în coloana finală, ca procent, pentru a evidenția distanța dintre greutatea demografică și cea economică a fiecărui teritoriu.'},
      { type: 'table', headers: ['Regiune', 'Populație (mii, 2021)', 'PIB regional (mld €)', 'Pondere în PIB național (%)'],
        rows: [
          ['București-Ilfov', 2272, 75, 28],
          ['Nord-Vest', 2521, 35, 13],
          ['Centru', 2298, 30, 11],
          ['Vest', 1730, 28, 10],
          ['Sud-Muntenia', 2851, 28, 10],
          ['Nord-Est', 3197, 28, 10],
          ['Sud-Est', 2304, 24, 9],
          ['Sud-Vest Oltenia', 1873, 20, 8]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 4
  {
    title: 'S1 — PIB/locuitor și măsura disparităților',
    blocks: [
      { type: 'p', text: 'Indicatorul decisiv al coeziunii este PIB-ul pe locuitor, exprimat în standardul puterii de cumpărare (SPC) pentru comparabilitate europeană. În România, București-Ilfov depășește media Uniunii Europene (peste 160% din media UE-27 în SPC, conform Eurostat), în timp ce regiunile Nord-Est și Sud-Vest Oltenia rămân sub 60% din media UE. Acest ecart de peste trei ori între regiunea capitalei și regiunile estice este unul dintre cele mai mari din Uniune și reprezintă nucleul problemei pe care orice regionalizare încearcă să o atenueze.'},
      { type: 'p', text: 'Măsurat în euro pe locuitor, raportul max/min între cele opt regiuni de dezvoltare este de ordinul 3,5 — București-Ilfov față de Nord-Est. Coeficientul de variație al PIB/locuitor regional depășește 0,45, valoare ridicată în context european. Aceste două statistici — raportul extrem și dispersia relativă — constituie reperele față de care vom evalua dacă recombinarea teritoriilor în alte scenarii reduce sau, dimpotrivă, amplifică disparitățile interne.'},
      { type: 'p', text: 'Observația esențială este că, în S1, disparitatea NU se reduce de la sine: tendința de convergență națională către media UE coexistă cu o divergență internă, polii urbani (București, Cluj, Timișoara, Iași) crescând mai repede decât zonele rurale și micile orașe din jurul lor. Status quo-ul menține astfel un teritoriu cu o singură locomotivă economică dominantă și șapte regiuni în căutarea unui al doilea pol comparabil — context care motivează explorarea scenariilor alternative din capitolele următoare.'},
      { type: 'table', headers: ['Regiune', 'PIB/loc (€, aprox.)', 'PIB/loc (% media UE-27, SPC)', 'Indice față de media RO (RO=100)'],
        rows: [
          ['București-Ilfov', 33000, 164, 250],
          ['Vest', 16200, 78, 123],
          ['Nord-Vest', 13900, 67, 105],
          ['Centru', 13100, 63, 99],
          ['Sud-Est', 10400, 52, 79],
          ['Sud-Muntenia', 9800, 51, 74],
          ['Sud-Vest Oltenia', 10700, 53, 81],
          ['Nord-Est', 8800, 47, 67]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 5
  {
    title: 'S1 — Reprezentare parlamentară și cost administrativ de referință',
    blocks: [
      { type: 'p', text: 'În S1 nu există organe regionale alese, așadar reprezentarea politică se rezumă la nivelul parlamentar național și la cel județean. Numărul de mandate din Camera Deputaților și Senat este alocat pe circumscripții județene proporțional cu populația, conform legii electorale. Agregarea mandatelor pe regiuni de dezvoltare oferă o imagine a greutății politice a fiecărei regiuni în legislativ: Nord-Est și Sud-Muntenia, fiind cele mai populate, cumulează cele mai multe mandate, în timp ce București-Ilfov are o reprezentare proporțională cu populația sa, nu cu greutatea sa economică.'},
      { type: 'p', text: 'Costul administrativ de referință în S1 este costul actual al ADR-urilor și al structurilor de coordonare regională, semnificativ mai redus decât al unui eșafodaj cu consilii alese, aparat propriu și sedii regionale. ADR-urile funcționează cu personal de ordinul zecilor până la câteva sute de angajați fiecare, finanțat din comisioane de management al fondurilor și din bugetul de stat. Acest cost redus este principalul avantaj fiscal al status quo-ului și reperul față de care cuantificăm supracostul administrativ al scenariilor cu personalitate juridică.'},
      { type: 'p', text: 'Estimările de mandate din tabel se bazează pe distribuția populației rezidente 2021 și pe norma de reprezentare folosită la alegerile parlamentare, fiind orientative. Ele arată că recombinarea teritoriilor în scenariile S3-S5 ar modifica echilibrul politic regional: o regiune unică a Moldovei, de pildă, ar cumula cea mai mare delegație parlamentară din țară, aspect analizat distinct în capitolul dedicat simulării Moldovei.'},
      { type: 'table', headers: ['Regiune', 'Pop. (mii)', 'Deputați (aprox.)', 'Senatori (aprox.)'],
        rows: [
          ['Nord-Est', 3197, 53, 22],
          ['Sud-Muntenia', 2851, 47, 20],
          ['Nord-Vest', 2521, 42, 18],
          ['Sud-Est', 2304, 38, 16],
          ['Centru', 2298, 38, 16],
          ['București-Ilfov', 2272, 38, 16],
          ['Sud-Vest Oltenia', 1873, 31, 13],
          ['Vest', 1730, 29, 12]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 6
  {
    title: 'S1 — Absorbția fondurilor UE, atractivitate și infrastructură',
    blocks: [
      { type: 'p', text: 'Pe dimensiunea fondurilor europene, S1 valorifică un cadru deja consolidat: Programele Regionale 2021-2027 sunt gestionate de cele opt ADR-uri ca autorități de management, după o descentralizare menită să apropie decizia de teritoriu. Rata de absorbție a fondurilor de coeziune în exercițiul anterior a fost neuniformă regional, regiunile cu capacitate administrativă mai solidă (Nord-Vest, Vest, Centru) având performanțe mai bune decât regiunile estice și sudice, unde pregătirea proiectelor mature rămâne o constrângere. Această neuniformitate este o trăsătură, nu un defect intrinsec, al modelului actual.'},
      { type: 'p', text: 'Atractivitatea investițională în S1 reflectă concentrarea investițiilor străine directe în jurul polilor: București-Ilfov atrage cea mai mare parte a stocului de ISD, urmată de Vest (cu industria auto din Timiș/Arad) și de Nord-Vest și Centru. Estul și sudul țării rămân sub-reprezentate, în absența autostrăzilor funcționale și a unei mase critice de servicii. Status quo-ul nu corectează acest tipar, ci îl perpetuează, atractivitatea fiind un derivat al infrastructurii și al aglomerării preexistente.'},
      { type: 'p', text: 'Necesarul de infrastructură în S1 este definit la nivel național prin Master Planul General de Transport și prin PNRR, cu accent pe finalizarea coridoarelor de autostradă (A1, A3, A7 — Autostrada Moldovei, A8) și pe modernizarea feroviară. Regionalizarea nu schimbă necesarul fizic, dar poate schimba cine prioritizează și finanțează investițiile. Tabelul următor sintetizează poziția relativă a regiunilor pe absorbție și atractivitate, ca bază de comparație cu scenariile alternative.'},
      { type: 'table', headers: ['Regiune', 'Absorbție fonduri (scor relativ 0-100)', 'Stoc ISD (scor relativ 0-100)', 'Km autostradă funcționali (aprox.)'],
        rows: [
          ['București-Ilfov', 78, 100, 90],
          ['Vest', 80, 62, 230],
          ['Nord-Vest', 82, 55, 130],
          ['Centru', 76, 50, 120],
          ['Sud-Muntenia', 60, 40, 210],
          ['Sud-Est', 55, 38, 200],
          ['Sud-Vest Oltenia', 58, 30, 96],
          ['Nord-Est', 52, 28, 60]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 7
  {
    title: 'S1 — Riscuri, avantaje și dezavantaje (SWOT sintetic)',
    blocks: [
      { type: 'p', text: 'Analiza SWOT a status quo-ului evidențiază că principala forță este stabilitatea: nicio reformă, niciun cost de tranziție, compatibilitate deplină cu NUTS-2 și serii statistice neîntrerupte. Oportunitatea majoră este consolidarea autorităților de management regionale recent descentralizate, care pot crește calitatea programării fără modificări constituționale. Aceste atuuri explică de ce S1 rămâne, în absența unui consens politic larg, opțiunea de facto pe care orice alternativă trebuie să o depășească prin beneficii nete demonstrabile.'},
      { type: 'p', text: 'Slăbiciunile sunt structurale: lipsa unei autorități regionale alese reduce răspunderea politică pentru dezvoltarea teritorială, pârghiile fiscale proprii sunt inexistente, iar prioritizarea investițiilor depinde de negocierea între județe cu interese divergente. Amenințarea principală este perpetuarea divergenței interne — creșterea polilor în dauna periferiilor — și riscul ca regiunile să rămână construcții statistice fără capacitate reală de a-și modela viitorul. Aceste limite motivează dezbaterea de regionalizare, fără a impune automat o anumită soluție.'},
      { type: 'p', text: 'Cuantificarea SWOT printr-un scor 0-100 (unde 100 este performanța maximă pe criteriu) permite agregarea ulterioară într-o matrice multicriterială. Pentru S1, scorurile sunt ridicate pe stabilitate, cost și compatibilitate europeană, dar reduse pe autonomie decizională, capacitate fiscală și potențial de reducere a disparităților. Profilul rezultat este al unui scenariu prudent, dar inert în raport cu obiectivul de coeziune teritorială.'},
      { type: 'table', headers: ['Criteriu SWOT', 'Categorie', 'Observație sintetică', 'Scor (0-100)'],
        rows: [
          ['Stabilitate instituțională', 'Forță', 'Fără cost de tranziție', 92],
          ['Compatibilitate UE (NUTS-2)', 'Forță', 'Eligibilitate stabilă', 90],
          ['Cost administrativ redus', 'Forță', 'Doar ADR-uri', 88],
          ['Autonomie decizională', 'Slăbiciune', 'Fără consilii alese', 28],
          ['Capacitate fiscală proprie', 'Slăbiciune', 'Inexistentă', 22],
          ['Reducerea disparităților', 'Slăbiciune', 'Divergență internă', 35],
          ['Centrifugare teritorială', 'Amenințare (redusă)', 'Risc minim', 15]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 8
  {
    title: 'S2 — Regionalizare cu personalitate juridică: definiție și hartă',
    blocks: [
      { type: 'p', text: 'Scenariul S2 păstrează granițele celor opt regiuni de dezvoltare, dar le conferă personalitate juridică și organe proprii alese: consilii regionale rezultate din vot direct, președinți de regiune și aparat administrativ propriu. Este varianta cea mai apropiată de proiectul guvernamental de regionalizare din 2013, care propunea transformarea regiunilor existente în unități administrativ-teritoriale cu competențe în dezvoltare, transport regional, mediu și o parte din infrastructură, finanțate prin transferuri și printr-o cotă din impozitele colectate teritorial. Avantajul acestei opțiuni este că harta nu se schimbă — deci nici granițele județene, nici seriile statistice — modificându-se doar statutul juridic și arhitectura decizională.'},
      { type: 'p', text: 'Harta conceptuală S2 este identică cu cea a S1, însă fiecare poligon devine o unitate cu capitală regională, buget propriu și competențe partajate cu nivelul național și cel județean. Stabilirea capitalelor regionale este unul dintre punctele sensibile politic: în regiuni cu mai mulți poli comparabili (de pildă Centru, între Brașov, Sibiu și Târgu Mureș, sau Sud-Est, între Constanța, Galați și Brăila) competiția pentru rolul de capitală regională poate genera tensiuni intercomunitare care necesită un mecanism transparent de desemnare.'},
      { type: 'p', text: 'S2 presupune o revizuire constituțională, întrucât Constituția României consacră în prezent comuna, orașul și județul ca unități administrativ-teritoriale (art. 3 alin. 3), fără a recunoaște regiunea ca palier cu personalitate juridică. Trecerea la S2 implică modificarea acestui articol, completarea art. 120-123 privind administrația publică locală și adoptarea unei legi a regiunilor care să redistribuie competențele. Acesta este pasul instituțional cel mai greu de parcurs și, totodată, condiția necesară pentru ca S2, S3, S4 și S5 să fie posibile în forma cu organe alese.'},
      { type: 'table', headers: ['Regiune (S2)', 'Capitală regională propusă', 'Competențe principale transferate', 'Nr. județe componente'],
        rows: [
          ['Nord-Est', 'Iași', 'Dezvoltare, transport regional, mediu', 6],
          ['Sud-Est', 'Constanța', 'Dezvoltare, port, transport', 6],
          ['Sud-Muntenia', 'Ploiești / Pitești', 'Dezvoltare, infrastructură', 7],
          ['Sud-Vest Oltenia', 'Craiova', 'Dezvoltare, energie, mediu', 5],
          ['Vest', 'Timișoara', 'Dezvoltare, industrie, transfrontalier', 4],
          ['Nord-Vest', 'Cluj-Napoca', 'Dezvoltare, inovare, transport', 6],
          ['Centru', 'Brașov / Sibiu', 'Dezvoltare, turism, transport', 6],
          ['București-Ilfov', 'București', 'Metropolitan, mobilitate', 2]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 9
  {
    title: 'S2 — Populație, PIB și PIB/locuitor (identice ca agregat, diferite ca guvernanță)',
    blocks: [
      { type: 'p', text: 'Pentru că S2 păstrează granițele S1, populația, PIB-ul regional și PIB/locuitorul rămân aceleași ca în status quo — București-Ilfov dominant economic, Nord-Est dominant demografic. Ceea ce se schimbă nu sunt agregatele, ci capacitatea fiecărei regiuni de a acționa asupra lor: o regiune cu consiliu ales și buget propriu poate prioritiza investiții structurante, poate atrage finanțări și poate negocia direct cu partenerii naționali și europeni. Disparitatea de plecare este, așadar, identică cu S1, dar instrumentarul de corecție devine disponibil.'},
      { type: 'p', text: 'Raportul max/min al PIB/locuitor rămâne circa 3,5, iar coeficientul de variație peste 0,45 — la fel ca în S1 — pentru că recombinarea teritorială lipsește. Diferența cuantificabilă apare în timp, prin politica regională: literatura de coeziune (ESPON, rapoartele de coeziune ale Comisiei) sugerează că regiunile cu autonomie decizională și fiscală converg, în medie, mai rapid către media națională decât cele pur statistice, cu condiția unei capacități administrative adecvate. S2 nu reduce disparitatea instantaneu, dar deblochează un mecanism de convergență absent în S1.'},
      { type: 'p', text: 'Tabelul de mai jos reia agregatele regionale, identice cu S1, marcând însă noul element — bugetul regional estimat. Acesta ar proveni dintr-o cotă partajată din impozitul pe venit și din transferuri de echilibrare, dimensionate astfel încât regiunile să dispună de resurse pentru cofinanțarea proiectelor. Cifrele de buget sunt orientative, calibrate pe ordinul de mărime al alocărilor regionale din alte state membre raportate la PIB-ul regional.'},
      { type: 'table', headers: ['Regiune (S2)', 'Populație (mii)', 'PIB regional (mld €)', 'Buget regional estimat (mld €/an)'],
        rows: [
          ['București-Ilfov', 2272, 75, '3,8'],
          ['Nord-Est', 3197, 28, '1,4'],
          ['Sud-Muntenia', 2851, 28, '1,4'],
          ['Nord-Vest', 2521, 35, '1,8'],
          ['Centru', 2298, 30, '1,5'],
          ['Sud-Est', 2304, 24, '1,2'],
          ['Vest', 1730, 28, '1,4'],
          ['Sud-Vest Oltenia', 1873, 20, '1,0']
        ] }
    ]
  },

  // ─────────────────────────────────────────── 10
  {
    title: 'S2 — Reprezentare parlamentară și noul nivel de reprezentare regională',
    blocks: [
      { type: 'p', text: 'În S2, reprezentarea parlamentară națională rămâne neschimbată față de S1 — circumscripțiile rămân județene — dar apare un nivel nou de reprezentare: consiliile regionale alese. Numărul de consilieri regionali ar fi stabilit prin legea regiunilor, proporțional cu populația, cu un prag minim pentru regiunile mici. Acest palier suplimentar adaugă legitimitate electorală deciziei de dezvoltare, dar și un set nou de aleși, cu implicații asupra costului democratic și a complexității instituționale.'},
      { type: 'p', text: 'Dimensionarea consiliilor regionale poate urma modelul european: regiunile franceze (după reforma din 2015) au consilii de ordinul a 80-200 de membri; voievodatele poloneze au sejmuri regionale de 30-50 de consilieri. Pentru România, un interval de 40-80 de consilieri regionali per regiune ar fi proporțional cu populația, totalizând circa 400-500 de aleși regionali la nivel național. Acesta este un cost democratic suplimentar care trebuie pus în balanță cu beneficiul de apropiere a deciziei de cetățean.'},
      { type: 'p', text: 'Estimările din tabel folosesc o normă de un consilier regional la aproximativ 40.000-50.000 de locuitori, cu un plafon și un prag, similar practicii europene. Ele arată că regiunile cele mai populate (Nord-Est, Sud-Muntenia) ar avea cele mai mari consilii, în timp ce Vest și Sud-Vest ar avea cele mai mici. Totalul național al aleșilor regionali devine un parametru de calibrare politică: cu cât consiliile sunt mai mari, cu atât reprezentarea este mai fină, dar costul și fragmentarea cresc.'},
      { type: 'table', headers: ['Regiune (S2)', 'Pop. (mii)', 'Consilieri regionali (estimare)', 'Locuitori per consilier (mii)'],
        rows: [
          ['Nord-Est', 3197, 72, 44],
          ['Sud-Muntenia', 2851, 68, 42],
          ['Nord-Vest', 2521, 60, 42],
          ['Sud-Est', 2304, 56, 41],
          ['Centru', 2298, 56, 41],
          ['București-Ilfov', 2272, 54, 42],
          ['Sud-Vest Oltenia', 1873, 48, 39],
          ['Vest', 1730, 44, 39]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 11
  {
    title: 'S2 — Cost și economie administrativă: cuantificare',
    blocks: [
      { type: 'p', text: 'Costul net al S2 are două componente: supracostul de operare al noului palier regional (consilii alese, aparat administrativ, sedii, alegeri regionale) și economiile potențiale din raționalizarea structurilor județene și deconcentrate care s-ar putea muta la nivel regional. Experiența europeană arată că regionalizarea nu este automat mai ieftină: ea poate genera economii prin agregarea unor servicii (achiziții, planificare, autorități de mediu), dar adaugă un strat de cost democratic și administrativ. Bilanțul net depinde de cât de mult se transferă de la județe către regiuni și de cât de mult se reduce paralelismul cu administrația deconcentrată a statului.'},
      { type: 'p', text: 'Estimarea supracostului de operare al celor opt regiuni cu consilii și aparat propriu este de ordinul a câteva sute de milioane de euro pe an la nivel național, în funcție de mărimea aparatului — orientativ circa 280 de milioane de euro anual pentru aparatul administrativ regional. Pe de altă parte, comasarea unor agenții deconcentrate (de pildă inspectorate, agenții de mediu, structuri de dezvoltare) la nivel regional poate elibera resurse comparabile. Dacă reforma este însoțită de o reducere a paralelismelor, costul net poate fi modest sau chiar neutru pe termen mediu; dacă regiunile se suprapun peste structurile existente fără raționalizare, costul net devine semnificativ.'},
      { type: 'p', text: 'Tabelul cuantifică orientativ componentele bilanțului. Cifrele sunt estimări calibrate pe ordinul de mărime al cheltuielilor administrative regionale din state comparabile (Polonia, Cehia) raportate la populație, NU sume oficiale. Concluzia metodologică este că pentru S2 (și pentru S3-S5) costul administrativ trebuie evaluat ca bilanț net — supracost minus economii din raționalizare — și nu ca simplu adaos de cheltuială.'},
      { type: 'table', headers: ['Componentă de cost (S2, național)', 'Tip', 'Orizont', 'Valoare estimată (mil €/an)'],
        rows: [
          ['Aparat administrativ regional', 'Supracost', 'Recurent', 280],
          ['Consilii regionale alese + indemnizații', 'Supracost', 'Recurent', 60],
          ['Alegeri regionale (amortizat anual)', 'Supracost', 'Periodic', 20],
          ['Sedii și infrastructură inițială', 'Cost de tranziție', 'Unic (amortizat)', 40],
          ['Comasare agenții deconcentrate', 'Economie', 'Recurent', -180],
          ['Raționalizare achiziții/planificare', 'Economie', 'Recurent', -90],
          ['Bilanț net estimat', 'Net', 'Recurent', 130]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 12
  {
    title: 'S2 — Absorbția fondurilor UE și efectul autonomiei',
    blocks: [
      { type: 'p', text: 'Argumentul central în favoarea S2 este capacitatea de absorbție a fondurilor europene. O regiune cu personalitate juridică, buget propriu și autoritate de management consolidată poate programa multianual, poate cofinanța din resurse proprii și poate răspunde politic pentru rezultate. Modelul polonez al voievodatelor — regiuni cu autoguvernare, fiecare gestionând propriul program regional — este frecvent citat ca exemplu de absorbție ridicată și stabilă, Polonia fiind printre cei mai eficienți beneficiari ai politicii de coeziune. S2 ar apropia România de acest model fără a modifica harta.'},
      { type: 'p', text: 'Cuantificarea efectului este prudentă: descentralizarea autorității de management către ADR-uri a început deja în exercițiul 2021-2027, iar S2 ar adăuga legitimitate electorală și pârghie fiscală peste această descentralizare administrativă. Creșterea ratei de absorbție estimată în scenariul optimist este de ordinul câtorva puncte procentuale față de S1, concentrată în regiunile estice și sudice care porneau de la o capacitate mai redusă. Beneficiul nu este garantat — depinde de calitatea aparatului regional construit — dar potențialul este real și documentat în literatura de coeziune.'},
      { type: 'p', text: 'Tabelul proiectează, orientativ, rata de absorbție pe regiuni în S1 (referință) față de S2 (cu autonomie), pe baza diferențialelor observate între regiunile europene cu și fără autoguvernare. Câștigul cel mai mare apare acolo unde capacitatea administrativă era cea mai slabă, ceea ce ar avea un efect direct de reducere a disparităților, regiunile mai sărace recuperând teren prin investiții mai bine absorbite.'},
      { type: 'table', headers: ['Regiune', 'Absorbție S1 (% alocare)', 'Absorbție S2 estimată (%)', 'Câștig (puncte proc.)'],
        rows: [
          ['Nord-Est', 78, 88, 10],
          ['Sud-Vest Oltenia', 80, 89, 9],
          ['Sud-Muntenia', 82, 90, 8],
          ['Sud-Est', 83, 90, 7],
          ['Centru', 90, 94, 4],
          ['Nord-Vest', 92, 95, 3],
          ['Vest', 93, 96, 3],
          ['București-Ilfov', 88, 90, 2]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 13
  {
    title: 'S2 — Atractivitate, infrastructură necesară și impact social',
    blocks: [
      { type: 'p', text: 'Atractivitatea investițională în S2 ar beneficia de existența unui interlocutor regional unic, capabil să ofere pachete integrate de localizare (teren, utilități, forță de muncă, autorizații) — un model practicat de regiunile cu autoguvernare din Europa Centrală. Investitorii apreciază un punct de contact regional cu autoritate de decizie, în locul negocierii fragmentate cu mai multe județe. Acest efect ar fi mai pronunțat în regiunile estice și sudice, care astăzi sunt dezavantajate de absența unei voci regionale puternice.'},
      { type: 'p', text: 'Infrastructura necesară în S2 este aceeași ca în S1 din punct de vedere fizic — finalizarea rețelei de autostrăzi (A7 Moldova, A8, A1) și modernizarea feroviară — dar prioritizarea ar deveni o competență regională partajată. O regiune cu buget propriu ar putea cofinanța tronsoane prioritare și ar putea integra transportul regional (cale ferată regională, transport public interjudețean) într-o autoritate regională de transport. Impactul este accelerarea investițiilor structurante în regiunile care astăzi depind exclusiv de prioritizarea națională.'},
      { type: 'p', text: 'Impactul social al S2 este, în principal, pozitiv pe dimensiunea apropierii deciziei de cetățean și a răspunderii politice regionale, dar comportă și riscuri: apariția unei noi clase politice regionale și posibila tensiune între capitalele regionale câștigătoare și orașele care nu obțin acest statut. Coeziunea socială beneficiază dacă regiunile reușesc să reducă disparitățile intraregionale (oraș-rural); ea suferă dacă regiunile reproduc, la scară mai mică, concentrarea în jurul capitalei regionale. Tabelul sintetizează impactul S2 pe dimensiuni cuantificabile.'},
      { type: 'table', headers: ['Dimensiune (S2)', 'Direcție de impact', 'Comentariu', 'Intensitate (0-100)'],
        rows: [
          ['Atractivitate investițională', 'Pozitiv', 'Interlocutor regional unic', 70],
          ['Absorbție fonduri UE', 'Pozitiv', 'Autonomie + cofinanțare', 75],
          ['Reducere disparități', 'Pozitiv', 'Pe termen mediu', 60],
          ['Apropiere decizie de cetățean', 'Pozitiv', 'Consilii alese', 72],
          ['Cost democratic suplimentar', 'Negativ', 'Noi aleși și aparat', 45],
          ['Risc concentrare în capitala reg.', 'Negativ', 'Dacă lipsește politica intraregională', 40]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 14
  {
    title: 'S3 — Provinciile istorice: definiție și hartă conceptuală',
    blocks: [
      { type: 'p', text: 'Scenariul S3 reproiectează harta regională pe criteriul provinciilor istorice și culturale ale României: Moldova, Muntenia, Oltenia, Dobrogea, Transilvania, Banat, Crișana-Maramureș și București ca entitate distinctă. Logica este coeziunea identitară și istorică — regiuni cu o conștiință teritorială preexistentă, moștenită din organizarea istorică a țării. Acest criteriu se deosebește radical de cel funcțional-economic al regiunilor de dezvoltare: provinciile istorice sunt definite cultural, nu prin gravitație economică, ceea ce produce regiuni de mărimi foarte inegale.'},
      { type: 'p', text: 'Harta conceptuală S3 reunește, în mare: Moldova (Bacău, Botoșani, Iași, Neamț, Suceava, Vaslui, Galați, Vrancea — uneori și Brăila), Muntenia (Argeș, Dâmbovița, Prahova, Buzău, Ialomița, Călărași, Giurgiu, Teleorman), Oltenia (cele cinci județe oltene), Dobrogea (Constanța, Tulcea), Transilvania (marele platou intracarpatic), Banatul (Timiș, Caraș-Severin, parțial Arad), Crișana-Maramureș (Bihor, Satu Mare, Maramureș, Sălaj, parțial Arad) și București ca entitate metropolitană. Granițele exacte ale provinciilor nu coincid perfect cu cele județene actuale, ceea ce ridică probleme de delimitare la județele de frontieră istorică (Brăila între Moldova și Muntenia, Arad între Banat și Crișana).'},
      { type: 'p', text: 'Trăsătura distinctivă și problematică a S3 este dimensiunea Transilvaniei și a Moldovei: ambele provincii ar cuprinde teritorii și populații care testează plafonul superior NUTS-2 de 3.000.000 de locuitori. Această asimetrie de scară — câteva provincii mult mai mari decât restul — este principala provocare a scenariului istoric și sursa dezbaterilor privind viabilitatea și echilibrul puterii între provincii. Capitolele următoare detaliază fiecare provincie cu capitala propusă, conformitatea NUTS, analogul european și profilul de vulnerabilități și avantaje.'},
      { type: 'table', headers: ['Provincie istorică (S3)', 'Capitală propusă', 'Centru alternativ', 'Nr. județe (aprox.)'],
        rows: [
          ['Moldova', 'Iași', 'Bacău', 8],
          ['Muntenia', 'Ploiești', 'Pitești', 7],
          ['Oltenia', 'Craiova', 'Râmnicu Vâlcea', 5],
          ['Dobrogea', 'Constanța', 'Tulcea', 2],
          ['Transilvania', 'Cluj-Napoca', 'Brașov', 8],
          ['Banat', 'Timișoara', 'Reșița', 2],
          ['Crișana-Maramureș', 'Oradea', 'Baia Mare', 4],
          ['București-Ilfov', 'București', '—', 2]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 15
  {
    title: 'S3 — Profil de provincie: MOLDOVA (capitala Iași)',
    blocks: [
      { type: 'p', text: 'Moldova istorică reunește, în varianta extinsă, județele Iași, Botoșani, Neamț, Suceava, Vaslui, Bacău, Vrancea și Galați, cu o populație de aproximativ 3.650.000 de locuitori și un PIB regional estimat la circa 32 de miliarde de euro. PIB/locuitorul rezultat este de ordinul a 8.760 de euro, echivalentul a circa 47% din media UE-27 în SPC — printre cele mai scăzute valori dintre toate provinciile, reflectând poziția istorică de regiune mai puțin dezvoltată. Capitala propusă este Iași, al doilea municipiu al țării ca populație și principalul pol universitar și medical al estului, cu Bacău drept centru alternativ datorită poziției sale geografice centrale în provincie și aeroportului său.'},
      { type: 'p', text: 'Conformitatea NUTS-2 este punctul critic al Moldovei: varianta cu 8 județe (3,65 milioane locuitori) DEPĂȘEȘTE plafonul de 3.000.000 de locuitori, ceea ce ar impune fie o subdiviziune statistică, fie o delimitare fără Galați și Vrancea (care reduce populația la circa 3,0 milioane, la limita superioară conformă). Analogul european cel mai apropiat este voievodatul Mazowieckie din Polonia — o regiune întinsă, cu un pol puternic și un hinterland rural extins, care a gestionat tensiunea dintre centru și periferie prin subdiviziune statistică. Această soluție de delimitare este reluată în capitolul dedicat simulării Moldovei ca regiune unică.'},
      { type: 'p', text: 'Profilul de vulnerabilități și avantaje al Moldovei este cel mai contrastant dintre provincii. Vulnerabilitățile țin de infrastructură (sub 60 km de autostradă funcțională, A7 Autostrada Moldovei fiind încă în construcție cu finalizare proiectată după 2027), de migrație (un sold negativ estimat de circa 180.000 de persoane în deceniul intercenzitar) și de nivelul PIB/locuitor la 47% din media UE. Avantajele sunt masa demografică maximă din țară, ecosistemul universitar al Iașului (8 universități, peste 60.000 de studenți), granița cu Republica Moldova și poziția în inițiativa Three Seas, precum și un șomaj relativ scăzut (circa 5,8%). Tabelul cuantifică indicatorii-cheie.'},
      { type: 'table', headers: ['Indicator (Moldova)', 'Detaliu', 'Reper UE/RO', 'Valoare'],
        rows: [
          ['Populație (mii loc.)', 'IS,BT,NT,SV,VS,BC,VN,GL', 'Peste plafon NUTS-2', 3650],
          ['PIB (mld €)', 'Agregat județe', 'A patra economie', 32],
          ['PIB/loc (€)', 'Calculat', '47% media UE (SPC)', 8760],
          ['Autostradă funcțională (km)', 'A7 în construcție', 'Cel mai redus', 60],
          ['Șomaj (%)', 'Estimare', 'Sub media unor provincii', '5,8'],
          ['Universități / aeroporturi', 'Pol Iași', 'Ecosistem academic', 8],
          ['Scor coeziune internă (0-100)', 'Centru-periferie', 'Mediu', 68]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 16
  {
    title: 'S3 — Profil de provincie: TRANSILVANIA (capitala Cluj-Napoca)',
    blocks: [
      { type: 'p', text: 'Transilvania istorică, în varianta centrală (Cluj, Brașov, Mureș, Harghita, Covasna, Sibiu, Bistrița-Năsăud, Alba), reunește o populație de aproximativ 2.680.000 de locuitori și un PIB regional estimat la circa 38 de miliarde de euro. PIB/locuitorul rezultat, de ordinul a 14.180 de euro (circa 85% din media UE-27 în SPC), o plasează printre cele mai dezvoltate provincii, a doua după București. Capitala propusă este Cluj-Napoca, cel mai dinamic pol economic și tehnologic din afara capitalei, cu Brașov drept centru alternativ, datorită poziției sale industriale și turistice și legăturilor cu sudul Transilvaniei.'},
      { type: 'p', text: 'Conformitatea NUTS-2 a Transilvaniei centrale (2,68 milioane) este integrală: se înscrie confortabil în intervalul 800.000-3.000.000 de locuitori, fără a necesita subdiviziune. Analogul european cel mai relevant este Bohemia din Cehia — o regiune istorică prosperă, cu un pol dominant (Praga, respectiv Cluj) și o economie diversificată. Sensibilitatea specifică a Transilvaniei este compoziția etnică a județelor Harghita și Covasna, unde populația de etnie maghiară este majoritară, aspect tratat distinct în capitolul de riscuri identitare; orice delimitare a Transilvaniei trebuie să gestioneze această realitate cu maximă prudență instituțională.'},
      { type: 'p', text: 'Profilul de avantaje al Transilvaniei este cel mai solid economic dintre provinciile non-capitală. Provincia dispune de circa 350 km de autostradă funcțională (printre cei mai mulți din țară), de cel mai scăzut șomaj (circa 3,2%), de 12 universități și de 3 aeroporturi (Cluj, Sibiu, Târgu Mureș), cu Clujul găzduind un cluster IT de circa 50.000 de angajați. Vulnerabilitatea principală este de natură politică și de coeziune — gestionarea sensibilității etnice — nu economică. Tabelul cuantifică indicatorii-cheie, care confirmă poziția de a doua locomotivă economică a țării.'},
      { type: 'table', headers: ['Indicator (Transilvania)', 'Detaliu', 'Reper UE/RO', 'Valoare'],
        rows: [
          ['Populație (mii loc.)', 'CJ,BV,MS,HR,CV,SB,BN,AB', 'Conform NUTS-2', 2680],
          ['PIB (mld €)', 'Agregat județe', 'A doua economie', 38],
          ['PIB/loc (€)', 'Calculat', '85% media UE (SPC)', 14180],
          ['Autostradă funcțională (km)', 'A1/A3 tronsoane', 'Cel mai dezvoltat', 350],
          ['Șomaj (%)', 'Estimare', 'Cel mai scăzut', '3,2'],
          ['Cluster IT Cluj (angajați)', 'Hub tehnologic', 'Cel mai mare din provincie', 50000],
          ['Scor coeziune internă (0-100)', 'Centru-periferie', 'Ridicat', 74]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 17
  {
    title: 'S3 — Profil de provincie: MUNTENIA (capitala Ploiești)',
    blocks: [
      { type: 'p', text: 'Muntenia istorică (fără București), în varianta cu Prahova, Dâmbovița, Argeș, Giurgiu, Călărași, Ialomița și Teleorman, reunește o populație de aproximativ 2.100.000 de locuitori și un PIB regional estimat la circa 24 de miliarde de euro. PIB/locuitorul rezultat, de ordinul a 11.400 de euro (circa 68% din media UE-27 în SPC), o plasează în zona mediană. Capitala propusă este Ploiești, centru industrial și petrochimic tradițional, bine conectat la capitală, cu Pitești drept centru alternativ, datorită polului auto (industria de la Mioveni) și poziției sale la întâlnirea coridoarelor vest-sud.'},
      { type: 'p', text: 'Conformitatea NUTS-2 a Munteniei (2,1 milioane) este integrală, în interiorul intervalului european. Provocarea structurală a provinciei NU este dimensiunea, ci gravitația spre București: județele sudice (Giurgiu, Călărași, Ialomița, Teleorman) sunt puternic dependente de capitală, ceea ce se reflectă într-un scor de coeziune internă scăzut (circa 52), cel mai redus dintre provinciile mari. Această dependență de un pol exterior provinciei (Bucureștiul, tratat separat în S3) face din Muntenia un caz aparte: o provincie a cărei locomotivă economică se află, instituțional, în afara ei.'},
      { type: 'p', text: 'Profilul Munteniei combină atuuri industriale reale cu o fragmentare teritorială accentuată. Avantajele sunt circa 210 km de autostradă funcțională (A1 București-Pitești, A2 spre Constanța), un șomaj moderat (circa 4,1%) și o bază industrială diversificată (petrochimie la Ploiești, auto la Pitești, agroindustrie în sud). Vulnerabilitatea majoră este efectul de umbră al Bucureștiului, care drenează forța de muncă și serviciile, lăsând sudul provinciei printre cele mai sărace zone ale țării. Tabelul sintetizează indicatorii și evidențiază scorul de coeziune scăzut ca semnal de alarmă specific Munteniei.'},
      { type: 'table', headers: ['Indicator (Muntenia)', 'Detaliu', 'Reper UE/RO', 'Valoare'],
        rows: [
          ['Populație (mii loc.)', 'PH,DB,AG,GR,CL,IL,TR', 'Conform NUTS-2', 2100],
          ['PIB (mld €)', 'Agregat județe', 'Economie medie', 24],
          ['PIB/loc (€)', 'Calculat', '68% media UE (SPC)', 11400],
          ['Autostradă funcțională (km)', 'A1/A2 tronsoane', 'Bine conectat', 210],
          ['Șomaj (%)', 'Estimare', 'Moderat', '4,1'],
          ['Scor coeziune internă (0-100)', 'Gravitație spre București', 'Scăzut', 52],
          ['Indice PIB/loc (RO=100)', 'Calculat', 'Sub medie', 81]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 18
  {
    title: 'S3 — Profil de provincii: OLTENIA, BANAT, DOBROGEA',
    blocks: [
      { type: 'p', text: 'Oltenia (Dolj, Gorj, Mehedinți, Olt, Vâlcea), cu capitala propusă Craiova și centru alternativ Râmnicu Vâlcea, reunește circa 1.873.000 de locuitori și un PIB de aproximativ 20 de miliarde de euro (PIB/loc estimat la circa 10.700 de euro, sub media națională). Provincia este conformă NUTS-2 și are un profil energetic distinct (complexul energetic Oltenia, hidrocentralele de pe Olt și Jiu), dar suferă de tranziția energetică (închiderea capacităților pe cărbune) și de migrație. Analogul european orientativ este o regiune mono-industrială în reconversie, de tip Asturias (Spania). Cifrele de mai jos pentru Oltenia, Banat și Dobrogea sunt estimări calibrate.'},
      { type: 'p', text: 'Banatul (Timiș, Caraș-Severin), cu capitala propusă Timișoara și centru alternativ Reșița, reunește circa 1.080.000 de locuitori și un PIB estimat la 16 miliarde de euro, dintre cele mai ridicate PIB/locuitor din țară (circa 14.800 de euro, peste media națională) datorită industriei și investițiilor străine din Timiș. Cu doar două județe, Banatul se află la limita inferioară a viabilității de regiune, dar peste pragul NUTS-2 de 800.000 de locuitori. Analogul european este o regiune mică, prosperă și transfrontalieră, de tip Friuli-Venezia Giulia (Italia), cu vocație de poartă spre Europa Centrală.'},
      { type: 'p', text: 'Dobrogea (Constanța, Tulcea), cu capitala propusă Constanța și centru alternativ Tulcea, reunește circa 1.080.000 de locuitori și un PIB estimat la 15 miliarde de euro (PIB/loc de circa 13.900 de euro, peste media națională), datorită portului Constanța, energiei (eoliene, viitor gaz în Marea Neagră) și turismului litoral. Conformă NUTS-2 la limita inferioară, Dobrogea are un profil maritim și logistic unic în țară. Analogul european este o regiune-poartă maritimă, de tip o regiune portuară mediteraneeană. Tabelul compară cele trei provincii mici.'},
      { type: 'table', headers: ['Provincie mică', 'Capitală propusă', 'PIB/loc (€)', 'Populație (mii)'],
        rows: [
          ['Oltenia', 'Craiova', 10700, 1873],
          ['Banat', 'Timișoara', 14800, 1080],
          ['Dobrogea', 'Constanța', 13900, 1080]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 19
  {
    title: 'S3 — Profil de provincii: CRIȘANA-MARAMUREȘ și BUCUREȘTI-ILFOV',
    blocks: [
      { type: 'p', text: 'Crișana-Maramureș (Bihor, Satu Mare, Maramureș, Sălaj, parțial Arad), cu capitala propusă Oradea și centru alternativ Baia Mare, reunește circa 1.950.000 de locuitori și un PIB estimat la aproximativ 22 de miliarde de euro (PIB/loc de circa 11.300 de euro). Provincia este conformă NUTS-2 și are un profil transfrontalier puternic (granița cu Ungaria, conexiunile Oradea-Debrețin), cu Oradea ca model de regenerare urbană și de absorbție a fondurilor europene. Analogul european orientativ este o regiune de frontieră dinamică, de tip o euroregiune central-europeană, valorificând cooperarea transfrontalieră ca motor de dezvoltare. Cifrele sunt estimări calibrate pe agregarea județeană.'},
      { type: 'p', text: 'București-Ilfov rămâne, în S3, entitate metropolitană distinctă, cu circa 2.272.000 de locuitori și un PIB de 75 de miliarde de euro — peste un sfert din economia națională pe mai puțin de 12% din populație. PIB/locuitorul, de circa 33.000 de euro (peste 160% din media UE-27 în SPC), face din capitală singura regiune românească peste media europeană. Conformă NUTS-2, capitala este analogă marilor regiuni-capitală europene (Île-de-France, Mazowieckie-Varșovia, regiunea Praga), cu provocarea specifică a guvernanței metropolitane integrate (mobilitate, planificare, presiune imobiliară pe Ilfov).'},
      { type: 'p', text: 'Izolarea Bucureștiului ca regiune separată în S3 are o consecință analitică importantă: restul provinciilor nu mai beneficiază nici măcar parțial de efectul de capitală, ceea ce accentuează disparitatea măsurată față de S1, unde Bucureștiul ridica media regiunii sale. Acesta este un paradox al criteriului istoric — coerența identitară a Bucureștiului ca entitate metropolitană amplifică, în cifre, decalajul față de provinciile mai sărace. Tabelul compară cele două provincii ale acestui capitol pe indicatorii sintetici.'},
      { type: 'table', headers: ['Provincie', 'Capitală', 'PIB/loc (% media UE)', 'PIB (mld €)'],
        rows: [
          ['Crișana-Maramureș', 'Oradea', 68, 22],
          ['București-Ilfov', 'București', 164, 75]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 20
  {
    title: 'S3 — Conformitatea NUTS-2 a provinciilor istorice',
    blocks: [
      { type: 'p', text: 'Aplicarea pragurilor NUTS-2 (minim 800.000, maxim 3.000.000 de locuitori) provinciilor istorice produce un tablou de conformitate neuniform, care este principalul obstacol tehnic al S3. Provinciile mari — Moldova în varianta extinsă (3,65 milioane) — depășesc plafonul superior și ar necesita fie subdiviziune statistică, fie redelimitare (Moldova fără Galați și Vrancea coboară la circa 3,0 milioane, la limita conformă). Provinciile mici — Banat și Dobrogea (circa 1,08 milioane fiecare) — sunt conforme, dar aproape de pragul inferior, la limita viabilității de regiune cu autoguvernare.'},
      { type: 'p', text: 'Restul provinciilor — Transilvania centrală (2,68 milioane), Muntenia (2,1 milioane), Crișana-Maramureș (1,95 milioane), Oltenia (1,87 milioane) și București-Ilfov (2,27 milioane) — se înscriu confortabil în intervalul european, fiind direct conforme NUTS-2. Concluzia este că S3 este, în cea mai mare parte, compatibil cu nomenclatorul european, cu o singură excepție majoră de plafon (Moldova extinsă), rezolvabilă prin delimitare. Aceasta nuanțează critica frecventă conform căreia provinciile istorice ar fi incompatibile cu NUTS — în realitate, doar una dintre ele pune o problemă reală de plafon.'},
      { type: 'p', text: 'Tabelul de conformitate de mai jos marchează, pentru fiecare provincie, populația estimată și statutul față de pragurile NUTS-2. El servește drept filtru tehnic obiectiv, independent de orice considerent identitar: o regionalizare pe provincii istorice ar trebui să rezolve cazul Moldovei (prin subdiviziune sau redelimitare) și să monitorizeze viabilitatea provinciilor mici, dar nu se lovește de o incompatibilitate europeană generalizată. Scorul de conformitate (0-100) agregă marja față de praguri.'},
      { type: 'table', headers: ['Provincie', 'Populație (mii)', 'Statut NUTS-2', 'Scor conformitate (0-100)'],
        rows: [
          ['Transilvania', 2680, 'Conformă', 95],
          ['București-Ilfov', 2272, 'Conformă', 92],
          ['Muntenia', 2100, 'Conformă', 90],
          ['Crișana-Maramureș', 1950, 'Conformă', 88],
          ['Oltenia', 1873, 'Conformă', 86],
          ['Dobrogea', 1080, 'Conformă la limită inf.', 70],
          ['Banat', 1080, 'Conformă la limită inf.', 70],
          ['Moldova (extinsă)', 3650, 'Peste plafon — redelimitare', 40]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 21
  {
    title: 'S3 — Analogi europeni pentru calibrarea provinciilor',
    blocks: [
      { type: 'p', text: 'Fiecare provincie istorică propusă în S3 are un analog european care servește la calibrarea așteptărilor de guvernanță și dezvoltare. Moldova, mare ca teritoriu și cu un pol dominant și o periferie rurală întinsă, este analogă voievodatului Mazowieckie din Polonia — care a gestionat tensiunea centru-periferie prin subdiviziune statistică. Transilvania, provincie istorică prosperă cu economie diversificată, este analogă regiunii Bohemia din Cehia. Aceste analogii nu sunt șabloane, ci repere de scară și de mecanism instituțional, utile pentru a anticipa provocările fiecărei provincii.'},
      { type: 'p', text: 'Pentru provinciile mici, analogii indică modele de viabilitate. Banatul, mic, prosper și transfrontalier, este analog regiunii Friuli-Venezia Giulia (Italia, regiune cu statut special, poartă spre Europa Centrală). Dobrogea, regiune maritimă și logistică, are ca reper o regiune-poartă portuară. Oltenia, în reconversie energetică, este analogă unei regiuni mono-industriale de tip Asturias (Spania). Crișana-Maramureșul, de frontieră dinamică, valorifică modelul euroregiunilor central-europene. Bucureștiul este analog marilor regiuni-capitală (Île-de-France, regiunea Varșovia).'},
      { type: 'p', text: 'Tabelul asociază fiecare provincie cu analogul său european și cu lecția-cheie de calibrare. Aceste analogii fundamentează comparat deciziile de delimitare și de competențe: o provincie de tip Mazowieckie are nevoie de un mecanism de echilibrare centru-periferie; o provincie de tip Friuli necesită valorificarea poziției transfrontaliere; o provincie de tip Asturias cere un plan de reconversie economică. Calibrarea pe analogi transformă criteriul identitar abstract într-un set de provocări de guvernanță concrete și gestionabile.'},
      { type: 'table', headers: ['Provincie', 'Analog european', 'Lecție de calibrare', 'Scor relevanță analog (0-100)'],
        rows: [
          ['Moldova', 'Mazowieckie (PL)', 'Echilibrare centru-periferie', 85],
          ['Transilvania', 'Bohemia (CZ)', 'Economie diversificată', 88],
          ['Banat', 'Friuli-Venezia Giulia (IT)', 'Vocație transfrontalieră', 80],
          ['Dobrogea', 'Regiune-poartă maritimă', 'Logistică și energie', 78],
          ['Oltenia', 'Asturias (ES)', 'Reconversie energetică', 75],
          ['București-Ilfov', 'Île-de-France (FR)', 'Guvernanță metropolitană', 90]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 22
  {
    title: 'S3 — Populație și PIB pe provinciile istorice (tablou agregat)',
    blocks: [
      { type: 'p', text: 'Agregând profilurile individuale, rezultă o hartă demografică și economică foarte inegală. Moldova (în varianta extinsă, circa 3,65 milioane) și Transilvania (2,68 milioane) sunt cele mai populate provincii non-capitală, urmate de București-Ilfov și Muntenia. La polul opus, Dobrogea și Banatul, cu circa 1,08 milioane de locuitori fiecare, sunt provinciile mici. Pe PIB, ierarhia este modelată de polii urbani: București domină detașat (75 mld €), urmat de Transilvania (38 mld €) și Moldova (32 mld €), în timp ce Banatul, deși mic demografic, are un PIB/locuitor ridicat datorită industriei din Timiș.'},
      { type: 'p', text: 'Dimensiunea variabilă a provinciilor — de la două la opt județe — produce regiuni cu mase economice care diferă de peste patru ori între cea mai mare (București) și cele mai mici (Banat, Dobrogea). Această inegalitate de scară este o caracteristică intrinsecă a criteriului istoric. Moldova, cu populație mare dar economie mai slabă, are cel mai scăzut PIB/locuitor dintre provinciile mari, replicând la nivel istoric decalajul est-vest al țării. Aceste agregate sunt orientative, obținute prin însumarea valorilor județene atribuite fiecărei provincii.'},
      { type: 'p', text: 'Tabloul agregat de mai jos reunește cele opt provincii cu populația și PIB-ul estimat, oferind imaginea de ansamblu a S3. El confirmă că regionalizarea istorică produce un sistem cu trei provincii mari (Moldova, Transilvania, plus cuplul București-Muntenia), trei provincii medii (Oltenia, Crișana-Maramureș) și două provincii mici (Banat, Dobrogea) — un sistem polarizat, a cărui gestionare necesită mecanisme de echilibrare a reprezentării și a resurselor, analizate în capitolele de risc și fezabilitate.'},
      { type: 'table', headers: ['Provincie (S3)', 'Populație (mii)', 'PIB (mld €)', 'Pondere PIB național (%)'],
        rows: [
          ['București-Ilfov', 2272, 75, 28],
          ['Transilvania', 2680, 38, 14],
          ['Moldova', 3650, 32, 12],
          ['Muntenia', 2100, 24, 9],
          ['Crișana-Maramureș', 1950, 22, 8],
          ['Oltenia', 1873, 20, 8],
          ['Banat', 1080, 16, 6],
          ['Dobrogea', 1080, 15, 6]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 23
  {
    title: 'S3 — PIB/locuitor, disparități și pragul de viabilitate',
    blocks: [
      { type: 'p', text: 'PIB/locuitorul pe provincii istorice menține, în linii mari, ierarhia est-vest: București și Banatul în frunte (Banatul datorită industriei concentrate pe puțini locuitori), urmate de Dobrogea și Transilvania, în timp ce Moldova rămâne la coadă, cu circa 47% din media UE. Raportul max/min al PIB/locuitor în S3 poate fi chiar mai mare decât în S1 — de ordinul 3,9 — dacă București rămâne entitate separată, deoarece restul provinciilor nu mai includ efectul de capitală. Criteriul istoric NU rezolvă automat disparitatea, ci o poate accentua prin izolarea Bucureștiului ca regiune distinctă.'},
      { type: 'p', text: 'Pragul de viabilitate al unei regiuni cu personalitate juridică este o problemă centrală a S3. Practica europeană și recomandările ESPON sugerează că o regiune cu autoguvernare funcționează eficient peste un anumit prag — orientativ peste un milion de locuitori și o masă economică suficientă pentru a susține un aparat administrativ și servicii de scară. Dobrogea și Banatul, cu circa un milion de locuitori fiecare, se situează la limita inferioară a viabilității, ceea ce ridică întrebarea dacă ar trebui consolidate cu teritorii vecine sau păstrate ca regiuni mici cu statut special.'},
      { type: 'p', text: 'Tabelul evaluează fiecare provincie față de un prag orientativ de viabilitate (populație peste un milion). Toate provinciile mari depășesc confortabil pragul; Dobrogea și Banatul îl ating la limită. Concluzia este că S3 ar produce un sistem cu câteva regiuni mari (Moldova, Transilvania) și câteva la limita de viabilitate — un dezechilibru de scară pe care un model omogen îl evită, dar pe care criteriul istoric îl acceptă în numele coeziunii identitare.'},
      { type: 'table', headers: ['Provincie (S3)', 'PIB/loc (€, aprox.)', 'Peste prag viabilitate (1 mil. loc.)', 'Indice față de media RO (RO=100)'],
        rows: [
          ['București', 33000, 'Da', 250],
          ['Banat', 14800, 'La limită', 112],
          ['Transilvania', 14180, 'Da', 107],
          ['Dobrogea', 13900, 'La limită', 105],
          ['Crișana-Maramureș', 11300, 'Da', 86],
          ['Muntenia', 11400, 'Da', 86],
          ['Oltenia', 10700, 'Da', 81],
          ['Moldova', 8760, 'Da', 64]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 24
  {
    title: 'S3 — Reprezentare parlamentară și echilibrul între provincii',
    blocks: [
      { type: 'p', text: 'În S3, dacă provinciile istorice ar deveni și circumscripții de reprezentare (sau ar căpăta consilii provinciale alese), distribuția puterii politice ar reflecta mărimea lor inegală. Moldova (peste 3,6 milioane), Transilvania și cuplul București-Muntenia ar cumula majoritatea reprezentării, în timp ce Dobrogea și Banatul, cu circa un milion fiecare, ar avea delegații mici. Acest dezechilibru de reprezentare este o consecință directă a criteriului istoric și o sursă potențială de tensiune, întrucât provinciile mici s-ar putea simți marginalizate în fața blocurilor mari.'},
      { type: 'p', text: 'Echilibrul între provincii ridică și problema raportului dintre provinciile mari și restul țării. Moldova unică ar concentra cea mai mare delegație parlamentară, iar Transilvania ar fi a doua forță, ceea ce în dezbaterea publică a fost asociat cu temeri privind dezechilibrul de putere. Analiza neutră constată că un astfel de dezechilibru există la nivel de cifre și trebuie gestionat instituțional — de pildă printr-o cameră a regiunilor cu reprezentare egală sau praguri minime — independent de orice valorizare politică.'},
      { type: 'p', text: 'Tabelul estimează reprezentarea parlamentară agregată pe provincii istorice, proporțional cu populația rezidentă. Concentrarea mandatelor în provinciile mari este vizibilă și confirmă că, sub criteriul istoric, echilibrul politic ar depinde de mecanisme corective pentru a nu marginaliza provinciile mici. Aceasta este o constrângere de design instituțional, nu un argument împotriva sau în favoarea S3.'},
      { type: 'table', headers: ['Provincie (S3)', 'Pop. (mii)', 'Deputați (aprox.)', 'Pondere mandate (%)'],
        rows: [
          ['Moldova', 3650, 61, 19],
          ['Transilvania', 2680, 45, 14],
          ['București', 2272, 38, 12],
          ['Muntenia', 2100, 35, 11],
          ['Crișana-Maramureș', 1950, 32, 10],
          ['Oltenia', 1873, 31, 10],
          ['Dobrogea', 1080, 18, 6],
          ['Banat', 1080, 18, 6]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 25
  {
    title: 'S3 — Riscuri: etnic, centrifugare, sensibilitatea Harghita-Covasna',
    blocks: [
      { type: 'p', text: 'Scenariul provinciilor istorice comportă riscul cel mai ridicat pe dimensiunea sensibilităților etnice și a centrifugării, motiv pentru care a fost cel mai controversat în dezbaterile din 2011 și 2013. Punctul cel mai sensibil este zona Harghita-Covasna, unde populația de etnie maghiară este majoritară conform Recensământului 2021 (în Harghita peste 80%, în Covasna circa 70% maghiari). Includerea acestor județe într-o Transilvanie largă, într-o regiune distinctă sau într-o altă configurație a fost una dintre cele mai disputate chestiuni, cu poziții ferme atât pentru autonomie pe criteriu etnic, cât și împotriva oricărei regionalizări pe acest criteriu.'},
      { type: 'p', text: 'Analiza neutră constată că regionalizarea pe criterii istorice activează inevitabil această dezbatere, deoarece provinciile istorice au o încărcătură identitară puternică. Riscul de centrifugare — percepția că o regiune mare și bogată (Transilvania, Banat) ar prefera mai multă autonomie față de centru — a fost de asemenea invocat în dezbaterea publică. Aceste riscuri nu sunt cuantificabile economic, dar sunt reale ca factori de coeziune națională și trebuie evaluate cu prudență, fără a lua partea vreunei poziții politice. Constituția consacră caracterul național unitar al statului (art. 1), cadru în care orice formă de descentralizare regională trebuie să se înscrie.'},
      { type: 'p', text: 'Tabelul cuantifică, acolo unde este posibil, intensitatea relativă a riscurilor pentru S3 și comparativ. S3 prezintă scorul cel mai ridicat de risc identitar și de centrifugare dintre toate scenariile, în timp ce S2 (granițe funcționale neschimbate) și S1 (status quo) au scoruri minime. Acest profil de risc este prețul coeziunii identitare pe care S3 îl oferă și trebuie pus în balanță cu avantajele sale de legitimitate culturală, expuse în capitolul următor.'},
      { type: 'table', headers: ['Tip de risc', 'S1', 'S3 (istoric)', 'Scor risc S3 (0-100)'],
        rows: [
          ['Sensibilitate etnică (Harghita-Covasna)', 'Minim', 'Maxim', 85],
          ['Centrifugare regională', 'Minim', 'Ridicat', 70],
          ['Dezechilibru de scară între regiuni', 'Mediu', 'Ridicat', 75],
          ['Tensiune capitală regională', 'Inexistent', 'Moderat', 50],
          ['Fragmentare administrativă', 'Minim', 'Moderat', 45],
          ['Risc constituțional', 'Minim', 'Ridicat', 80]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 26
  {
    title: 'S3 — Cost administrativ, fonduri UE și atractivitate',
    blocks: [
      { type: 'p', text: 'Costul administrativ al S3 este comparabil cu cel al S2 ca structură — opt regiuni cu organe proprii — dar cu o complicație suplimentară: dimensiunea inegală a provinciilor face ca aparatul să fie supradimensionat în provinciile mici (Dobrogea, Banat) raportat la populație și potențial subdimensionat în cele mari (Moldova, Transilvania). Eficiența administrativă per locuitor ar fi astfel neuniformă, provinciile mici suportând un cost fix de regiune pe o bază demografică redusă. Bilanțul net de cost al S3 este apropiat de cel al S2, dar cu o distribuție mai inegală a eficienței.'},
      { type: 'p', text: 'Pe fonduri europene, S3 ridică o problemă tehnică de compatibilitate cu NUTS-2: provinciile istorice nu coincid cu actuala delimitare NUTS-2, deci ar necesita renotificarea nomenclatorului la Eurostat și o perioadă de tranziție a seriilor statistice. Mai mult, Moldova extinsă (peste plafonul de 3 milioane) ar necesita subdiviziuni statistice, conform analizei de conformitate. Aceste ajustări sunt fezabile, dar adaugă complexitate și o întârziere de tranziție față de S1 și S2.'},
      { type: 'p', text: 'Atractivitatea investițională în S3 ar putea beneficia de marca identitară puternică a unor provincii (Transilvania, Banat, Bucovina ca parte a Moldovei) în promovarea turistică și economică, dar ar putea suferi din cauza incertitudinii de tranziție și a riscurilor de coeziune. Tabelul sintetizează poziția S3 pe aceste trei dimensiuni, cu scoruri relative care vor intra în matricea comparativă finală.'},
      { type: 'table', headers: ['Dimensiune (S3)', 'Comparație cu S2', 'Comentariu', 'Scor (0-100)'],
        rows: [
          ['Cost administrativ (eficiență)', 'Ușor inferior', 'Inegalitate de scară', 55],
          ['Compatibilitate NUTS-2', 'Inferior', 'Necesită renotificare', 45],
          ['Absorbție fonduri UE', 'Comparabil', 'După tranziție', 65],
          ['Atractivitate (marcă identitară)', 'Superior la turism', 'Brand provincial', 68],
          ['Coeziune socială', 'Inferior', 'Risc identitar', 45],
          ['Legitimitate culturală', 'Superior', 'Identitate preexistentă', 80]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 27
  {
    title: 'S4 — Macro-regiuni NUTS-1: definiție și hartă',
    blocks: [
      { type: 'p', text: 'Scenariul S4 consolidează teritoriul în patru macro-regiuni, corespunzătoare nivelului NUTS-1 deja existent în nomenclatorul statistic european. România este împărțită, la nivel NUTS-1, în patru macroregiuni: Macroregiunea Unu (Nord-Vest + Centru), Macroregiunea Doi (Nord-Est + Sud-Est), Macroregiunea Trei (Sud-Muntenia + București-Ilfov) și Macroregiunea Patru (Sud-Vest Oltenia + Vest). Aceste macroregiuni sunt construcții pur statistice în prezent, fără organe sau competențe, dar reprezintă o grupare oficială recunoscută de Eurostat, ceea ce face din S4 un scenariu cu o bază geografică deja definită.'},
      { type: 'p', text: 'Harta conceptuală S4 reduce numărul de regiuni de la opt la patru prin comasarea perechilor de regiuni de dezvoltare adiacente. Avantajul este crearea unor entități mari, cu masă economică și demografică considerabilă — fiecare macroregiune ar avea peste patru milioane de locuitori — capabile de economii de scară și de un rol semnificativ în arhitectura europeană. Dezavantajul este îndepărtarea deciziei de cetățean: o macroregiune ar cuprinde o suprafață vastă și o diversitate teritorială mare, ceea ce contrazice principiul subsidiarității dacă nu este însoțită de un nivel intermediar puternic (județul).'},
      { type: 'p', text: 'S4 este modelul cel mai consolidat dintre toate scenariile și cel mai compatibil cu logica unor mari regiuni europene (de pildă landurile germane mari sau regiunile franceze post-2015, reduse de la 22 la 13 în Franța metropolitană). El maximizează masa critică și minimizează numărul de structuri, dar cu prețul unei distanțe mai mari între regiune și comunitățile locale. Această tensiune între eficiența de scară și subsidiaritate este axa centrală de evaluare a S4.'},
      { type: 'table', headers: ['Macro-regiune (S4, NUTS-1)', 'Regiuni de dezvoltare comasate', 'Pol propus', 'Nr. județe'],
        rows: [
          ['Macroregiunea Unu', 'Nord-Vest + Centru', 'Cluj-Napoca / Brașov', 12],
          ['Macroregiunea Doi', 'Nord-Est + Sud-Est', 'Iași / Constanța', 12],
          ['Macroregiunea Trei', 'Sud-Muntenia + București-Ilfov', 'București', 9],
          ['Macroregiunea Patru', 'Sud-Vest Oltenia + Vest', 'Craiova / Timișoara', 9]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 28
  {
    title: 'S4 — Populație, PIB și PIB/locuitor pe macro-regiuni',
    blocks: [
      { type: 'p', text: 'Cele patru macroregiuni au populații relativ echilibrate, între circa 3,6 și 5,5 milioane de locuitori fiecare, ceea ce le face mult mai omogene ca scară decât provinciile istorice ale S3. Economic însă, Macroregiunea Trei (care include București-Ilfov) domină detașat, concentrând efectul de capitală și o parte mare a serviciilor cu valoare adăugată ridicată. Macroregiunile Unu și Patru, care includ polii vestici (Cluj, Brașov, Timișoara), au economii solide, în timp ce Macroregiunea Doi (estul și sud-estul) rămâne cea mai slabă economic raportat la populație.'},
      { type: 'p', text: 'Avantajul cuantificabil al S4 este reducerea drastică a disparității măsurate între regiuni: comasând fiecare pol cu regiunile sale învecinate, raportul max/min al PIB/locuitor scade de la circa 3,5 (în S1, opt regiuni) la circa 2,0 (în S4, patru macroregiuni), pentru că efectul de medie diminuează extremele. Aceasta este o proprietate matematică a agregării — regiuni mai mari ascund disparitățile interne — și trebuie interpretată cu prudență: disparitățile NU dispar, ci se mută în interiorul macroregiunii, devenind disparități intraregionale invizibile în statistica NUTS-1.'},
      { type: 'p', text: 'Tabelul prezintă agregatele pe macroregiuni și indicele PIB/locuitor față de media națională. Echilibrul demografic și reducerea ecartului inter-regional sunt evidente. Dezavantajul ascuns — disparitățile intraregionale — este o limită importantă a S4: o macroregiune poate părea echilibrată la nivel agregat în timp ce conține atât poli prosperi, cât și zone profund subdezvoltate, mascând exact problema pe care regionalizarea ar trebui să o adreseze. De asemenea, fiecare macroregiune depășește plafonul NUTS-2 de 3 milioane, fiind o construcție de nivel NUTS-1, nu NUTS-2.'},
      { type: 'table', headers: ['Macro-regiune (S4)', 'Populație (mii)', 'PIB (mld €)', 'Indice PIB/loc (RO=100)'],
        rows: [
          ['Macroregiunea Trei (cu București)', 5123, 103, 153],
          ['Macroregiunea Unu (NV+Centru)', 4819, 65, 103],
          ['Macroregiunea Patru (SV+Vest)', 3603, 48, 101],
          ['Macroregiunea Doi (NE+SE)', 5501, 52, 72]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 29
  {
    title: 'S4 — Reprezentare, cost administrativ și economii de scară',
    blocks: [
      { type: 'p', text: 'Pe reprezentare, S4 ar crea doar patru consilii macroregionale, fiecare reprezentând peste patru milioane de locuitori. Numărul total de aleși regionali ar fi semnificativ mai mic decât în S2 sau S3 (patru consilii în loc de opt), ceea ce reduce costul democratic dar și granularitatea reprezentării: un consilier macroregional ar reprezenta zeci de mii până la peste o sută de mii de cetățeni, distanțând mult alesul de comunitatea locală. Acest compromis — mai puțini aleși, dar mai îndepărtați — este caracteristic modelelor consolidate.'},
      { type: 'p', text: 'Costul administrativ al S4 este, în principiu, cel mai eficient pe locuitor dintre scenariile cu personalitate juridică, datorită economiilor de scară: patru aparate regionale în loc de opt, achiziții agregate, planificare la scară mare. Experiența franceză a fuziunii regiunilor din 2015 a fost însă instructivă — economiile de scară așteptate au fost mai modeste decât estimările inițiale, deoarece comasarea generează și costuri de armonizare a sistemelor, de relocare și de uniformizare salarială. S4 rămâne probabil cel mai ieftin model regional, dar economiile nete trebuie privite realist.'},
      { type: 'p', text: 'Tabelul cuantifică orientativ costul și reprezentarea S4 comparativ cu S2. Avantajul de cost este vizibil (mai puține structuri), iar dezavantajul de subsidiaritate este reflectat în numărul mare de locuitori per consilier. Acest profil face din S4 scenariul preferat din perspectiva eficienței pure, dar cel mai expus criticii privind îndepărtarea deciziei de cetățean.'},
      { type: 'table', headers: ['Indicator (S4 vs S2)', 'S2 (8 regiuni)', 'S4 (4 macro)', 'Diferență S4 (% față de S2)'],
        rows: [
          ['Număr consilii regionale', 8, 4, -50],
          ['Total aleși regionali (aprox.)', 458, 280, -39],
          ['Aparat administrativ (mil €/an)', 280, 200, -29],
          ['Cost net estimat (mil €/an)', 130, 80, -38],
          ['Locuitori per consilier (mii)', 42, 68, 62]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 30
  {
    title: 'S4 — Fonduri UE, atractivitate și infrastructură necesară',
    blocks: [
      { type: 'p', text: 'Pe fonduri europene, S4 are un avantaj de masă și un dezavantaj de eligibilitate. Avantajul: macroregiunile mari pot negocia programe ample și pot agrega capacitatea de absorbție. Dezavantajul, semnificativ: la nivel NUTS-2 (regiunile actuale), regiunile sub 75% din media UE beneficiază de cea mai mare intensitate a fondurilor de coeziune (regiuni mai puțin dezvoltate). Dacă regionalizarea s-ar muta la nivel NUTS-1 (macroregiuni), comasarea unei regiuni sărace cu una mai bogată ar putea ridica media peste pragul de 75%, reducând eligibilitatea pentru intensitatea maximă a fondurilor. Acesta este un risc fiscal real al S4, motiv pentru care eligibilitatea de coeziune se calculează la NUTS-2, nu NUTS-1.'},
      { type: 'p', text: 'În practică, România ar păstra cel mai probabil delimitarea NUTS-2 pentru eligibilitatea fondurilor, chiar dacă administrarea s-ar consolida la nivel macroregional, pentru a nu pierde din intensitatea finanțării. Această separare între nivelul administrativ (macroregiune) și nivelul de eligibilitate (regiune NUTS-2) este o soluție tehnică fezabilă, practicată în alte state, dar adaugă un strat de complexitate în programare. Atractivitatea investițională în S4 ar beneficia de macroregiuni cu mare masă de piață și forță de muncă, atractive pentru investiții de scară.'},
      { type: 'p', text: 'Infrastructura necesară în S4 ar fi prioritizată la scară macroregională, ceea ce favorizează coridoarele majore (autostrăzi inter-macroregionale, cale ferată de mare viteză) în dauna conexiunilor locale. Tabelul sintetizează profilul S4 pe fonduri, atractivitate și infrastructură, cu atenționarea explicită asupra riscului de eligibilitate la pragul de 75% din media UE — element distinctiv și critic al acestui scenariu.'},
      { type: 'table', headers: ['Dimensiune (S4)', 'Efect', 'Comentariu', 'Scor / valoare (0-100)'],
        rows: [
          ['Masă de piață (atractivitate)', 'Pozitiv', 'Macroregiuni mari', 78],
          ['Risc eligibilitate fonduri (prag 75%)', 'Negativ', 'Dacă elig. trece la NUTS-1', 65],
          ['Economii de scară administrative', 'Pozitiv', 'Mai puține structuri', 72],
          ['Subsidiaritate (apropiere de cetățean)', 'Negativ', 'Regiuni foarte mari', 35],
          ['Prioritizare coridoare majore', 'Pozitiv', 'Infrastructură de scară', 70],
          ['Disparități intraregionale (mascate)', 'Negativ', 'Ascunse în agregat', 60]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 31
  {
    title: 'S5 — Model mixt / asimetric: definiție și logică',
    blocks: [
      { type: 'p', text: 'Scenariul S5 propune un model asimetric, în care nivelul și tipul de competențe regionale variază în funcție de dimensiunea, capacitatea și specificul fiecărui teritoriu, în loc de o organizare uniformă. Logica asimetriei este pragmatică: nu toate teritoriile au aceeași capacitate de a-și asuma competențe regionale, iar un model rigid uniform fie supraîncarcă regiunile slabe, fie subutilizează regiunile puternice. Modele asimetrice există în Europa — Spania (comunități autonome cu statute diferite, de la Țara Bascilor și Catalonia cu competențe extinse, la altele cu competențe reduse), Italia (regiuni cu statut ordinar și regiuni cu statut special precum Sicilia, Sardinia, Trentino-Alto Adige), Regatul Unit (devoluție asimetrică Scoția/Țara Galilor/Anglia).'},
      { type: 'p', text: 'Pentru România, S5 ar putea combina: un statut metropolitan special pentru București-Ilfov (guvernanță de tip metropolitan, cu competențe de mobilitate și planificare integrată), regiuni puternice cu competențe extinse pentru polii consolidați (Cluj/Nord-Vest, Timișoara/Vest, Iași/Nord-Est, Brașov/Centru), și regiuni cu competențe mai reduse, eventual consolidate, pentru teritoriile mai mici sau mai slabe. Numărul de regiuni în S5 ar fi flexibil, orientativ în jur de șase, cu statute diferențiate. Această flexibilitate este atât forța, cât și slăbiciunea modelului.'},
      { type: 'p', text: 'Avantajul S5 este adaptarea fină la realitatea teritorială: fiecare regiune primește competențe pe măsura capacității sale, evitând atât supraîncărcarea, cât și subutilizarea. Dezavantajul major este complexitatea: un sistem cu statute diferite este greu de gestionat, poate genera sentimente de inegalitate între regiuni (de ce o regiune are mai multe competențe decât alta) și comportă un risc constituțional ridicat, întrucât asimetria poate fi percepută ca încălcare a egalității teritoriilor în fața legii. S5 este cel mai sofisticat, dar și cel mai dificil de implementat dintre scenarii.'},
      { type: 'table', headers: ['Tip de regiune (S5)', 'Exemplu teritoriu', 'Nivel competențe', 'Nr. regiuni de acest tip'],
        rows: [
          ['Metropolitan special', 'București-Ilfov', 'Mobilitate, planificare integrată', 1],
          ['Regiune puternică (competențe extinse)', 'Nord-Vest, Vest, Centru, Nord-Est', 'Dezvoltare, transport, mediu, fiscal', 4],
          ['Regiune consolidată (competențe reduse)', 'Sud agregat (Muntenia+Oltenia+SE)', 'Dezvoltare de bază', 1]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 32
  {
    title: 'S5 — Populație, PIB și distribuția competențelor',
    blocks: [
      { type: 'p', text: 'În configurația ilustrativă a S5 (șase regiuni), București-Ilfov rămâne entitate metropolitană distinctă, patru regiuni puternice corespund polilor consolidați cu hinterlandul lor, iar teritoriile mai slabe din sud și sud-est sunt consolidate într-o regiune mai mare cu competențe de bază. Această configurație produce regiuni inegale ca dimensiune, dar fiecare cu un statut adaptat capacității sale: regiunile puternice gestionează competențe extinse pe care le pot susține, iar regiunea consolidată din sud primește un nivel de competențe realist față de capacitatea sa administrativă actuală.'},
      { type: 'p', text: 'Cuantificarea S5 depinde de delimitarea concretă aleasă, motiv pentru care valorile de mai jos sunt strict ilustrative, pentru o configurație posibilă. Avantajul modelului este că alocă masă critică și competențe acolo unde există capacitate: regiunile puternice (Nord-Vest, Vest, Centru, Nord-Est) cumulează poli urbani dinamici, iar regiunea consolidată din sud beneficiază de o masă demografică mare care, agregată, poate susține investiții structurante. Disparitatea măsurată în S5 se situează între cea a S1 (opt regiuni) și cea a S4 (patru macroregiuni), în funcție de gradul de consolidare ales.'},
      { type: 'p', text: 'Tabelul prezintă o configurație ilustrativă a S5, cu populație, PIB și nivelul de competențe al fiecărei regiuni. Esența modelului nu este în cifrele exacte, ci în principiul diferențierii: competențele urmează capacitatea, nu o regulă uniformă. Aceasta este și principala provocare de echitate — cum se justifică public faptul că regiuni diferite au puteri diferite — pe care S5 trebuie să o rezolve printr-un cadru transparent de criterii obiective.'},
      { type: 'table', headers: ['Regiune (S5, ilustrativ)', 'Populație (mii)', 'PIB (mld €)', 'Nivel competențe (1-3)'],
        rows: [
          ['București-Ilfov (metropolitan)', 2272, 75, 3],
          ['Nord-Vest', 2521, 35, 3],
          ['Centru', 2298, 30, 3],
          ['Vest', 1730, 28, 3],
          ['Nord-Est', 3197, 28, 2],
          ['Sud consolidat (Muntenia+Oltenia+SE)', 7028, 72, 1]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 33
  {
    title: 'S5 — Reprezentare, cost, fonduri și riscuri specifice',
    blocks: [
      { type: 'p', text: 'Reprezentarea în S5 ar fi ea însăși asimetrică: regiunile cu competențe extinse ar avea consilii mai puternice și mai numeroase, iar regiunea consolidată cu competențe reduse un consiliu mai mic raportat la populația sa, întrucât o parte din decizie rămâne la nivel județean și național. Această asimetrie de reprezentare este coerentă cu logica modelului, dar greu de explicat public și potențial generatoare de nemulțumire — cetățenii dintr-o regiune cu competențe reduse s-ar putea simți subreprezentați față de cei din regiunile puternice.'},
      { type: 'p', text: 'Costul administrativ al S5 este intermediar: mai mic decât al S2/S3 (mai puține regiuni cu aparat complet), dar cu o complexitate de gestiune mai mare datorită statutelor diferențiate, care necesită un cadru legal sofisticat și o monitorizare diferențiată. Pe fonduri europene, S5 are avantajul de a păstra delimitările NUTS-2 pentru eligibilitate (regiunile consolidate pot fi tratate ca grupări de NUTS-2 pentru administrare, dar eligibilitatea rămâne la NUTS-2), evitând riscul de prag al S4. Riscul specific al S5 este constituțional și de coeziune: asimetria poate fi contestată ca inegalitate între teritorii și necesită un fundament juridic solid.'},
      { type: 'p', text: 'Tabelul cuantifică profilul S5 pe principalele dimensiuni, comparativ cu media celorlalte scenarii. S5 obține scoruri bune pe adaptabilitate și eligibilitate fonduri, scoruri medii pe cost, dar scoruri slabe pe simplitate instituțională și pe echitatea percepută între regiuni. Acest profil îl face atractiv conceptual, dar exigent în implementare, fiind scenariul care cere cel mai sofisticat cadru juridic și politic.'},
      { type: 'table', headers: ['Dimensiune (S5)', 'Poziție', 'Comentariu', 'Scor (0-100)'],
        rows: [
          ['Adaptabilitate la capacitate', 'Forte', 'Competențe pe măsură', 82],
          ['Eligibilitate fonduri (NUTS-2 păstrat)', 'Forte', 'Fără risc de prag', 75],
          ['Cost administrativ', 'Mediu', 'Intermediar', 60],
          ['Simplitate instituțională', 'Slab', 'Statute diferite', 35],
          ['Echitate percepută între regiuni', 'Slab', 'Asimetrie greu de explicat', 40],
          ['Risc constituțional', 'Slab', 'Asimetrie de contestat', 38]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 34
  {
    title: 'Comparație transversală: disparitate, cost și reprezentare',
    blocks: [
      { type: 'p', text: 'Indicatorul-cheie pentru obiectivul de coeziune este modul în care fiecare scenariu modifică disparitatea măsurată a PIB/locuitorului între regiunile rezultate. Tabloul transversal arată un rezultat important și adesea contraintuitiv: scenariile care reduc numărul de regiuni (S4, macroregiuni) reduc disparitatea măsurată între regiuni, dar nu pentru că rezolvă problema, ci pentru că o mută în interiorul regiunilor mari, unde devine invizibilă statistic. Scenariile care păstrează sau cresc granularitatea (S1, S2, S3) mențin disparitatea vizibilă, ceea ce este, paradoxal, mai onest analitic.'},
      { type: 'p', text: 'Pe axa costului administrativ și a reprezentării, scenariile se ordonează clar în funcție de numărul de regiuni și de existența organelor alese. S1 este cel mai ieftin (doar ADR-uri, fără aleși regionali). La celălalt capăt, S2 și S3 (opt regiuni cu organe proprii) au costul și numărul de aleși cel mai mare. S4 (patru macroregiuni) reduce ambele, iar S5 se situează intermediar. Această ierarhie de cost este robustă și nu depinde de calibrarea exactă a cifrelor, ci de logica structurală — mai multe regiuni cu organe proprii înseamnă mai mult cost și mai mulți aleși.'},
      { type: 'p', text: 'Echilibrul între cost și reprezentare este un compromis, nu o ierarhie simplă. Un cost mai mare (S2, S3) cumpără o reprezentare mai fină și o decizie mai apropiată de cetățean; un cost mai mic (S4) sacrifică subsidiaritatea. S1 evită complet costul, dar și beneficiul. Lecția metodologică este că alegerea scenariului nu trebuie ghidată de minimizarea cifrei de disparitate inter-regională — care se poate manipula prin agregare — ci de capacitatea reală de a reduce decalajele de dezvoltare la nivelul comunităților.'},
      { type: 'table', headers: ['Scenariu', 'Raport max/min PIB/loc', 'Cost net (mil €/an)', 'Total aleși regionali'],
        rows: [
          ['S1 — Status quo', '3,5', 30, 0],
          ['S2 — Personalitate juridică', '3,5', 130, 458],
          ['S3 — Provincii istorice', '3,9', 140, 470],
          ['S4 — Macro-regiuni', '2,1', 80, 280],
          ['S5 — Mixt/asimetric', '2,9', 105, 340]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 35
  {
    title: 'Matricea comparativă multicriterială și matricea de risc',
    blocks: [
      { type: 'p', text: 'Sinteza analizei este o matrice multicriterială care evaluează fiecare scenariu pe un set de criterii ponderate: reducerea disparităților de dezvoltare, capacitatea de absorbție a fondurilor UE, eficiența costului administrativ, apropierea deciziei de cetățean (subsidiaritate), atractivitatea investițională, fezabilitatea constituțională și riscul de coeziune (etnic/centrifugare — punctaj invers, risc mic egal scor mare). Fiecare scenariu primește un scor 0-100 pe fiecare criteriu, iar scorul agregat este media ponderată. Ponderile sunt orientative și pot fi ajustate în funcție de prioritățile decidentului.'},
      { type: 'p', text: 'Lectura matricei trebuie făcută cu prudență metodologică: scorul agregat NU desemnează un câștigător obiectiv, ci sintetizează compromisuri. S1 excelează la fezabilitate și cost dar eșuează la autonomie și potențial de coeziune. S2 echilibrează autonomia cu păstrarea granițelor funcționale, fiind un compromis robust. S3 oferă legitimitate culturală maximă dar cu riscul de coeziune cel mai ridicat. S4 maximizează eficiența dar sacrifică subsidiaritatea și comportă risc de eligibilitate. S5 oferă adaptabilitate maximă dar complexitate ridicată. Niciun scenariu nu domină pe toate criteriile.'},
      { type: 'p', text: 'Dincolo de beneficii, fiecare scenariu poartă un profil de risc care trebuie evaluat separat, pentru că riscurile de coeziune națională nu se compensează cu beneficiile economice. Profilul de risc consolidat arată că S1 este cel mai sigur, S2 are risc moderat (revizuire constituțională, granițe neschimbate), S3 are profilul de risc cel mai ridicat (istoric, etnic, centrifugare), S4 are risc de eligibilitate și de subsidiaritate, iar S5 are risc constituțional ridicat din cauza asimetriei. Tabelul agregă atât scorul de beneficiu, cât și scorul de risc, evidențiind schimbul fundamental între ambiția reformei și riscul asumat.'},
      { type: 'table', headers: ['Scenariu', 'Scor beneficiu agregat (0-100)', 'Scor total risc (0-100)', 'Raport beneficiu/risc (×10)'],
        rows: [
          ['S1 — Status quo', 56, 7, 80],
          ['S2 — Personalitate juridică', 68, 40, 17],
          ['S3 — Provincii istorice', 58, 78, 7],
          ['S4 — Macro-regiuni', 64, 50, 13],
          ['S5 — Mixt/asimetric', 63, 60, 11]
        ] }
    ]
  },

  // ─────────────────────────────────────────── 36
  {
    title: 'Simulare „Moldova ca regiune unică", fezabilitate și recomandare de scenariu',
    blocks: [
      { type: 'p', text: 'Una dintre cele mai discutate ipoteze este unificarea celor opt județe moldave (Bacău, Botoșani, Iași, Neamț, Suceava, Vaslui, Galați, Vrancea) într-o singură regiune Moldova, cu o populație de circa 3.650.000 de locuitori — cea mai populată regiune a țării — și un PIB de ordinul a 32 de miliarde de euro, cu un PIB/locuitor de circa 8.760 de euro (47% din media UE). Avantajul unei Moldove unice ar fi masa critică și doi poli urbani majori (Iași și Galați); riscul, depășirea plafonului NUTS-2 de 3 milioane (rezolvabil prin delimitare fără Galați și Vrancea, care coboară populația la circa 3,0 milioane) și reproducerea concentrării pe Iași în dauna periferiilor (Botoșani, Vaslui).'},
      { type: 'p', text: 'Pe fezabilitate juridică, orice scenariu cu regiuni alese (S2-S5) întâmpină același obstacol: Constituția consacră la art. 3 alin. 3 doar comuna, orașul și județul ca unități administrativ-teritoriale, fără a recunoaște regiunea. Trecerea la oricare scenariu transformator necesită revizuire constituțională (art. 3 alin. 3 și art. 120-123), adoptată cu majoritate de două treimi și validată prin referendum, plus o lege organică a regiunilor. România a ratificat Carta Europeană a Autonomiei Locale (Legea 199/1997), cadru de principii compatibil. Proiectul de regionalizare din 2013 a eșuat tocmai la etapa constituțională și politică, în absența unui consens larg.'},
      { type: 'p', text: 'Recomandarea de scenariu, formulată neutru, decurge din raportul beneficiu/risc: S2 (personalitate juridică pe granițele funcționale actuale) oferă cel mai echilibrat compromis — adaugă autonomie și capacitate de absorbție fără a modifica harta, fără riscul identitar al S3 și fără riscul de eligibilitate al S4, păstrând compatibilitatea NUTS-2. S4 rămâne o alternativă de eficiență dacă prioritatea este economia de scară, iar S3 și S5 sunt opțiuni de ambiție mai mare, cu riscuri pe măsură. Alegerea finală aparține deciziei politice democratice, validate prin referendum, nu analizei tehnice, care se limitează la a expune compromisurile cuantificate. Tabelul rezumă tabloul integrat.'},
      { type: 'table', headers: ['Scenariu', 'Nr. regiuni', 'Conformitate NUTS-2', 'Scor beneficiu net (0-100)'],
        rows: [
          ['S1 — Status quo', 8, 'Integrală', 50],
          ['S2 — Personalitate juridică', 8, 'Integrală', 68],
          ['S3 — Provincii istorice', 8, 'Cu o excepție (Moldova)', 52],
          ['S4 — Macro-regiuni', 4, 'NUTS-1 (admin.) / NUTS-2 (elig.)', 60],
          ['S5 — Mixt/asimetric', 6, 'NUTS-2 păstrat', 58]
        ] }
    ]
  }

];

try {
  var _n = (window._REGIO_DEEP['p10'] || []).length;
  console.log('[regio-deep-p10] incarcat — ' + _n + ' capitole (Scenarii de regionalizare si impact cuantificat)');
} catch (e) {}
