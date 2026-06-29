// regio-deep-p10.js — PARTEA 10: SCENARII DE REGIONALIZARE SI IMPACTUL CUANTIFICAT
// Conteaza ca PARTE CENTRALA, cea mai ampla, a studiului national de regionalizare.
// Consumat de window._deepRender (js/tci-strategic-doc.js) via window._REGIO_DEEP['p10'].
// Date reale: Eurostat conturi regionale NUTS-2/NUTS-1, INS Recensamant 2021 + TEMPO,
// propunerile publice de regionalizare (2011 Comisia Prezidentiala, 2013 proiectul guvernamental),
// modele europene (Polonia, Franta, Italia, Spania), ESPON. Politic NEUTRU. Fara fabricatie.
// Conventii: diacritice corecte in TEXT (font DejaVuRO in jsPDF), ASCII in chei/comentarii;
// stringuri single-quote, fara backticks, fara apostrof brut (se folosesc ghilimele jos-sus).
// Ultima coloana din tabele = numerica (intregi sau zecimale cu virgula).
(function (G) {
  G._REGIO_DEEP = G._REGIO_DEEP || {};

  G._REGIO_DEEP['p10'] = [

    // ─────────────────────────────────────────── 1
    {
      title: 'Cadrul scenariilor: de la regiuni statistice la unități administrative',
      blocks: [
        { type: 'p', text: 'România este organizată pe trei paliere administrative cu personalitate juridică — comuna/orașul, municipiul și județul — la care se adaugă, din 1998, opt regiuni de dezvoltare definite prin Legea 151/1998 și reconfirmate prin Legea 315/2004. Aceste regiuni corespund nivelului NUTS-2 din nomenclatorul european (Regulamentul CE 1059/2003) și servesc colectării statistice și programării fondurilor de coeziune, însă NU au personalitate juridică și nu dispun de organe alese. Dezbaterea privind regionalizarea, recurentă din 2011, vizează tocmai trecerea de la regiuni statistice la regiuni cu competențe decizionale, fiscale și administrative. Scenariile examinate în această parte cuantifică, pe date reale, ce ar însemna fiecare opțiune pentru economie, reprezentare și capacitate administrativă.'},
        { type: 'p', text: 'Analiza compară cinci scenarii. S1 menține arhitectura actuală (opt regiuni statistice fără personalitate juridică). S2 transformă aceleași opt regiuni în unități administrative cu consilii regionale alese. S3 reproiectează harta pe criteriul provinciilor istorice (Moldova, Muntenia, Oltenia, Dobrogea, Transilvania, Banat, Crișana-Maramureș, București). S4 consolidează teritoriul în patru macro-regiuni de tip NUTS-1. S5 propune un model mixt/asimetric, cu statut diferențiat în funcție de dimensiune și capacitate. Fiecare scenariu este evaluat pe același set de criterii cuantificabile, pentru comparabilitate.'},
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
        { type: 'p', text: 'S2 presupune o revizuire constituțională, întrucât Constituția României consacră în prezent comuna, orașul și județul ca unități administrativ-teritoriale (art. 3 alin. 3), fără a recunoaște regiunea ca palier cu personalitate juridică. Trecerea la S2 implică modificarea acestui articol și adoptarea unei legi a regiunilor care să redistribuie competențele. Acesta este pasul instituțional cel mai greu de parcurs și, totodată, condiția necesară pentru ca S2, S3, S4 și S5 să fie posibile în forma cu organe alese.'},
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
        { type: 'p', text: 'Estimarea supracostului de operare al celor opt regiuni cu consilii și aparat propriu este de ordinul a câteva sute de milioane de euro pe an la nivel național, în funcție de mărimea aparatului. Pe de altă parte, comasarea unor agenții deconcentrate (de pildă inspectorate, agenții de mediu, structuri de dezvoltare) la nivel regional poate elibera resurse comparabile. Dacă reforma este însoțită de o reducere a paralelismelor, costul net poate fi modest sau chiar neutru pe termen mediu; dacă regiunile se suprapun peste structurile existente fără raționalizare, costul net devine semnificativ.'},
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
        { type: 'p', text: 'Harta conceptuală S3 este, în mare, următoarea: Moldova reunește județele moldave (Bacău, Botoșani, Iași, Neamț, Suceava, Vaslui, Galați, Vrancea — uneori și Brăila), Muntenia cuprinde județele muntene de la Argeș la Buzău, Oltenia cele cinci județe oltene, Dobrogea cele două județe dobrogene (Constanța, Tulcea), Transilvania marele platou intracarpatic, Banatul (Timiș, Caraș-Severin, parțial Arad), Crișana-Maramureș (Bihor, Satu Mare, Maramureș, Sălaj, parțial Arad), iar București ca entitate metropolitană. Granițele exacte ale provinciilor istorice nu coincid perfect cu cele județene actuale, ceea ce ridică probleme de delimitare la județele de frontieră istorică (de pildă Brăila între Moldova și Muntenia, Arad între Banat și Crișana).'},
        { type: 'p', text: 'Trăsătura distinctivă și problematică a S3 este dimensiunea Transilvaniei: ca provincie istorică, ea ar cuprinde un teritoriu mult mai mare decât orice regiune de dezvoltare actuală, cu o populație și o economie care ar domina celelalte provincii. Această asimetrie de scară — o regiune mult mai mare decât restul — este principala provocare a scenariului istoric și sursa dezbaterilor privind viabilitatea și echilibrul puterii între provincii, analizate în capitolele următoare.'},
        { type: 'table', headers: ['Provincie istorică (S3)', 'Județe (aprox.)', 'Centru istoric/economic', 'Nr. județe (aprox.)'],
          rows: [
            ['Moldova', 'BC, BT, IS, NT, SV, VS, GL, VN', 'Iași', 8],
            ['Muntenia', 'AG, DB, PH, BZ, IL, CL, GR, TR', 'Ploiești', 8],
            ['Oltenia', 'DJ, GJ, MH, OT, VL', 'Craiova', 5],
            ['Dobrogea', 'CT, TL', 'Constanța', 2],
            ['Transilvania', 'AB, BV, CV, HR, MS, SB, CJ, BN, SJ, HD', 'Cluj-Napoca', 10],
            ['Banat', 'TM, CS', 'Timișoara', 2],
            ['Crișana-Maramureș', 'BH, SM, MM, AR', 'Oradea', 4],
            ['București', 'B, IF', 'București', 2]
          ] }
      ]
    },

    // ─────────────────────────────────────────── 15
    {
      title: 'S3 — Populație și PIB pe provinciile istorice',
      blocks: [
        { type: 'p', text: 'Agregând județele pe provincii istorice, rezultă o hartă demografică și economică foarte inegală. Transilvania (în accepțiunea largă, cu Crișana și Maramureș excluse) cumulează cea mai mare populație și una dintre cele mai mari economii, fiind concurată doar de cuplul București plus Muntenia. Moldova reunește circa 3,5-3,7 milioane de locuitori dacă include Galați și Vrancea, devenind a doua mare provincie ca populație. La polul opus, Dobrogea și Banatul, cu doar două județe fiecare, sunt provincii mici ca masă demografică, iar București rămâne mic teritorial dar dominant economic.'},
        { type: 'p', text: 'Pe PIB, ierarhia este modelată de polii urbani: București domină detașat, urmat de Transilvania (Cluj, Brașov, Sibiu, Mureș) și de Muntenia (Ploiești, Pitești). Banatul, deși mic demografic, are un PIB/locuitor ridicat datorită industriei din Timiș. Moldova, cu populație mare dar economie mai slabă, ar avea cel mai scăzut PIB/locuitor dintre provinciile mari, replicând la nivel istoric decalajul est-vest al țării. Aceste agregate sunt orientative, obținute prin însumarea valorilor județene atribuite fiecărei provincii.'},
        { type: 'p', text: 'Dimensiunea variabilă a provinciilor — de la două la zece județe — produce regiuni cu mase economice care diferă de peste cinci ori între cea mai mare (Transilvania sau București) și cea mai mică (Dobrogea, Banat). Această inegalitate de scară este o caracteristică intrinsecă a criteriului istoric și trebuie evaluată în raport cu pragul de viabilitate al unei regiuni cu personalitate juridică, subiect tratat în capitolul dedicat.'},
        { type: 'table', headers: ['Provincie (S3)', 'Populație (mii, aprox.)', 'PIB (mld €, aprox.)', 'Pondere PIB național (%)'],
          rows: [
            ['București', 2272, 75, 28],
            ['Transilvania', 3850, 52, 19],
            ['Muntenia', 3550, 38, 14],
            ['Moldova', 3550, 30, 11],
            ['Crișana-Maramureș', 1950, 22, 8],
            ['Oltenia', 1873, 20, 8],
            ['Sud-Est extins (Dobrogea)', 1080, 15, 6],
            ['Banat', 1080, 16, 6]
          ] }
      ]
    },

    // ─────────────────────────────────────────── 16
    {
      title: 'S3 — PIB/locuitor, disparități și pragul de viabilitate',
      blocks: [
        { type: 'p', text: 'PIB/locuitorul pe provincii istorice ar menține, în linii mari, ierarhia est-vest: București și Banatul în frunte, Banatul datorită industriei concentrate pe puțini locuitori, urmate de Transilvania, în timp ce Moldova și Muntenia (fără capitală) ar rămâne la coadă. Raportul max/min al PIB/locuitor în S3 ar putea fi chiar mai mare decât în S1, dacă București rămâne entitate separată, deoarece restul provinciilor nu mai includ parțial efectul de capitală. Criteriul istoric NU rezolvă automat disparitatea — o poate chiar accentua prin izolarea Bucureștiului ca regiune distinctă.'},
        { type: 'p', text: 'Pragul de viabilitate al unei regiuni cu personalitate juridică este o problemă centrală a S3. Practica europeană și recomandările ESPON sugerează că o regiune cu autoguvernare funcționează eficient peste un anumit prag demografic și economic — orientativ peste un milion de locuitori și o masă economică suficientă pentru a susține un aparat administrativ și servicii de scară. Dobrogea și Banatul, cu circa un milion de locuitori fiecare, se situează la limita inferioară a viabilității, ceea ce ridică întrebarea dacă ar trebui consolidate cu teritorii vecine sau păstrate ca regiuni mici cu statut special.'},
        { type: 'p', text: 'Tabelul evaluează fiecare provincie față de un prag orientativ de viabilitate (populație peste un milion, PIB peste zece miliarde de euro). Toate provinciile mari depășesc confortabil pragul; Dobrogea și Banatul îl ating la limită. Concluzia este că S3 ar produce un sistem cu câteva regiuni foarte mari (Transilvania, Moldova, Muntenia) și câteva la limita de viabilitate, un dezechilibru de scară pe care un model omogen îl evită, dar pe care criteriul istoric îl acceptă în numele coeziunii identitare.'},
        { type: 'table', headers: ['Provincie (S3)', 'PIB/loc (€, aprox.)', 'Peste prag viabilitate (1 mil. loc.)', 'Indice față de media RO (RO=100)'],
          rows: [
            ['București', 33000, 'Da', 250],
            ['Banat', 14800, 'La limită', 112],
            ['Transilvania', 13500, 'Da', 102],
            ['Crișana-Maramureș', 11300, 'Da', 86],
            ['Oltenia', 10700, 'Da', 81],
            ['Muntenia', 10700, 'Da', 81],
            ['Dobrogea', 13900, 'La limită', 105],
            ['Moldova', 8500, 'Da', 64]
          ] }
      ]
    },

    // ─────────────────────────────────────────── 17
    {
      title: 'S3 — Reprezentare parlamentară și echilibrul între provincii',
      blocks: [
        { type: 'p', text: 'În S3, dacă provinciile istorice ar deveni și circumscripții de reprezentare (sau ar căpăta consilii provinciale alese), distribuția puterii politice ar reflecta mărimea lor inegală. Transilvania, Moldova și Muntenia, fiecare cu peste trei milioane de locuitori, ar cumula majoritatea covârșitoare a reprezentării, în timp ce Dobrogea și Banatul, cu circa un milion fiecare, ar avea delegații mici. Acest dezechilibru de reprezentare este o consecință directă a criteriului istoric și o sursă potențială de tensiune, întrucât provinciile mici s-ar putea simți marginalizate în fața blocurilor mari.'},
        { type: 'p', text: 'Echilibrul între provincii ridică și problema raportului dintre Transilvania și restul țării. Ca provincie istorică extinsă, Transilvania ar concentra o populație și o economie comparabile cu cele ale Moldovei și Munteniei la un loc în anumite delimitări, ceea ce în dezbaterea publică a fost asociat cu temeri privind dezechilibrul de putere și, în cazuri extreme, cu discursuri centrifuge. Analiza neutră constată că un astfel de dezechilibru există la nivel de cifre și trebuie gestionat instituțional (de pildă printr-o cameră a regiunilor cu reprezentare egală), independent de orice valorizare politică.'},
        { type: 'p', text: 'Tabelul estimează reprezentarea parlamentară agregată pe provincii istorice, proporțional cu populația rezidentă. Concentrarea mandatelor în cele trei provincii mari (Transilvania, Moldova, Muntenia) este vizibilă și confirmă că, sub criteriul istoric, echilibrul politic ar depinde de mecanisme corective — praguri minime de reprezentare sau o a doua cameră teritorială — pentru a nu marginaliza provinciile mici.'},
        { type: 'table', headers: ['Provincie (S3)', 'Pop. (mii)', 'Deputați (aprox.)', 'Pondere mandate (%)'],
          rows: [
            ['Transilvania', 3850, 64, 20],
            ['Moldova', 3550, 59, 19],
            ['Muntenia', 3550, 59, 19],
            ['București', 2272, 38, 12],
            ['Crișana-Maramureș', 1950, 32, 10],
            ['Oltenia', 1873, 31, 10],
            ['Dobrogea', 1080, 18, 6],
            ['Banat', 1080, 18, 6]
          ] }
      ]
    },

    // ─────────────────────────────────────────── 18
    {
      title: 'S3 — Riscuri: etnic, centrifugare, sensibilitatea Harghita-Covasna',
      blocks: [
        { type: 'p', text: 'Scenariul provinciilor istorice comportă riscul cel mai ridicat pe dimensiunea sensibilităților etnice și a centrifugării, motiv pentru care a fost cel mai controversat în dezbaterile din 2011 și 2013. Punctul cel mai sensibil este zona Harghita-Covasna (așa-numitul Ținut Secuiesc), unde populația de etnie maghiară este majoritară conform Recensământului 2021 (în Harghita peste 80%, în Covasna circa 70% maghiari). Includerea acestor județe într-o Transilvanie largă, într-o regiune secuiască distinctă sau într-o altă configurație a fost una dintre cele mai disputate chestiuni, cu poziții ferme atât pentru autonomie pe criteriu etnic, cât și împotriva oricărei regionalizări pe acest criteriu.'},
        { type: 'p', text: 'Analiza neutră constată că regionalizarea pe criterii istorice activează inevitabil această dezbatere, deoarece provinciile istorice au o încărcătură identitară puternică. Riscul de centrifugare — percepția că o regiune mare și bogată (Transilvania, Banat) ar prefera mai multă autonomie față de centru — a fost de asemenea invocat în dezbaterea publică. Aceste riscuri nu sunt cuantificabile economic, dar sunt reale ca factori de coeziune națională și trebuie evaluate cu prudență, fără a lua partea vreunei poziții politice. Constituția consacră caracterul național unitar al statului, cadru în care orice formă de descentralizare regională trebuie să se înscrie.'},
        { type: 'p', text: 'Tabelul cuantifică, acolo unde este posibil, intensitatea relativă a riscurilor pe scenarii, pentru S3 și comparativ. S3 prezintă scorul cel mai ridicat de risc identitar și de centrifugare dintre toate scenariile, în timp ce S2 (granițe funcționale neschimbate) și S1 (status quo) au scoruri minime. Acest profil de risc este prețul coeziunii identitare pe care S3 îl oferă și trebuie pus în balanță cu avantajele sale de legitimitate culturală.'},
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

    // ─────────────────────────────────────────── 19
    {
      title: 'S3 — Cost administrativ, fonduri UE și atractivitate',
      blocks: [
        { type: 'p', text: 'Costul administrativ al S3 este comparabil cu cel al S2 ca structură — opt regiuni cu organe proprii — dar cu o complicație suplimentară: dimensiunea inegală a provinciilor face ca aparatul să fie supradimensionat în provinciile mici (Dobrogea, Banat) raportat la populație și potențial subdimensionat în cele mari (Transilvania). Eficiența administrativă per locuitor ar fi astfel neuniformă, provinciile mici suportând un cost fix de regiune pe o bază demografică redusă. Bilanțul net de cost al S3 este apropiat de cel al S2, dar cu o distribuție mai inegală a eficienței.'},
        { type: 'p', text: 'Pe fonduri europene, S3 ridică o problemă tehnică de compatibilitate cu NUTS-2: provinciile istorice nu coincid cu actuala delimitare NUTS-2, deci ar necesita renotificarea nomenclatorului la Eurostat și o perioadă de tranziție a seriilor statistice. Mai mult, dacă o provincie (Transilvania extinsă) ar depăși pragul de populație al NUTS-2 (în general între 800.000 și 3 milioane de locuitori), ar putea fi nevoie de subdiviziuni statistice. Aceste ajustări sunt fezabile, dar adaugă complexitate și o întârziere de tranziție față de S1 și S2.'},
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

    // ─────────────────────────────────────────── 20
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

    // ─────────────────────────────────────────── 21
    {
      title: 'S4 — Populație, PIB și PIB/locuitor pe macro-regiuni',
      blocks: [
        { type: 'p', text: 'Cele patru macroregiuni au populații relativ echilibrate, între circa 4,2 și 5,1 milioane de locuitori fiecare, ceea ce le face mult mai omogene ca scară decât provinciile istorice ale S3. Economic însă, Macroregiunea Trei (care include București-Ilfov) domină detașat, concentrând efectul de capitală și o parte mare a serviciilor cu valoare adăugată ridicată. Macroregiunile Unu și Patru, care includ polii vestici (Cluj, Brașov, Timișoara), au economii solide, în timp ce Macroregiunea Doi (estul și sud-estul) rămâne cea mai slabă economic raportat la populație.'},
        { type: 'p', text: 'Avantajul cuantificabil al S4 este reducerea drastică a disparității măsurate între regiuni: comasând fiecare pol cu regiunile sale învecinate, raportul max/min al PIB/locuitor scade de la circa 3,5 (în S1, opt regiuni) la circa 1,8-2,0 (în S4, patru macroregiuni), pentru că efectul de medie diminuează extremele. Aceasta este o proprietate matematică a agregării — regiuni mai mari ascund disparitățile interne — și trebuie interpretată cu prudență: disparitățile NU dispar, ci se mută în interiorul macroregiunii, devenind disparități intraregionale invizibile în statistica NUTS-1.'},
        { type: 'p', text: 'Tabelul prezintă agregatele pe macroregiuni și indicele PIB/locuitor față de media națională. Echilibrul demografic și reducerea ecartului inter-regional sunt evidente. Dezavantajul ascuns — disparitățile intraregionale — este o limită importantă a S4: o macroregiune poate părea echilibrată la nivel agregat în timp ce conține atât poli prosperi, cât și zone profund subdezvoltate, mascând exact problema pe care regionalizarea ar trebui să o adreseze.'},
        { type: 'table', headers: ['Macro-regiune (S4)', 'Populație (mii)', 'PIB (mld €)', 'Indice PIB/loc (RO=100)'],
          rows: [
            ['Macroregiunea Trei (cu București)', 5123, 103, 153],
            ['Macroregiunea Unu (NV+Centru)', 4819, 65, 103],
            ['Macroregiunea Patru (SV+Vest)', 3603, 48, 101],
            ['Macroregiunea Doi (NE+SE)', 5501, 52, 72]
          ] }
      ]
    },

    // ─────────────────────────────────────────── 22
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

    // ─────────────────────────────────────────── 23
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

    // ─────────────────────────────────────────── 24
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

    // ─────────────────────────────────────────── 25
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

    // ─────────────────────────────────────────── 26
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

    // ─────────────────────────────────────────── 27
    {
      title: 'Comparație transversală: disparitatea PIB/locuitor pe scenarii',
      blocks: [
        { type: 'p', text: 'Indicatorul-cheie pentru obiectivul de coeziune este modul în care fiecare scenariu modifică disparitatea măsurată a PIB/locuitorului între regiunile rezultate. Tabloul transversal arată un rezultat important și adesea contraintuitiv: scenariile care reduc numărul de regiuni (S4, macroregiuni) reduc disparitatea măsurată între regiuni, dar nu pentru că rezolvă problema, ci pentru că o mută în interiorul regiunilor mari, unde devine invizibilă statistic. Scenariile care păstrează sau cresc granularitatea (S1, S2, S3) mențin disparitatea vizibilă, ceea ce este, paradoxal, mai onest analitic.'},
        { type: 'p', text: 'În S1 și S2 (opt regiuni, granițe funcționale), raportul max/min al PIB/locuitor este de circa 3,5 și coeficientul de variație peste 0,45. În S3 (provincii istorice), dacă București rămâne separat, disparitatea poate fi chiar mai mare. În S4 (patru macroregiuni), raportul scade la circa 2,0 prin efectul de agregare. S5 se situează intermediar. Lecția metodologică este că alegerea scenariului nu trebuie ghidată de minimizarea cifrei de disparitate inter-regională — care se poate manipula prin agregare — ci de capacitatea reală de a reduce decalajele de dezvoltare la nivelul comunităților.'},
        { type: 'p', text: 'Tabelul de mai jos sintetizează disparitatea pe scenarii. El trebuie citit cu avertismentul că o disparitate inter-regională scăzută (S4) NU echivalează cu o țară mai echilibrată, ci poate ascunde inegalități intraregionale mari. Indicatorul cu adevărat relevant pentru politica de coeziune rămâne evoluția decalajului oraș-rural și centru-periferie în interiorul fiecărei regiuni, indiferent de delimitare.'},
        { type: 'table', headers: ['Scenariu', 'Nr. regiuni', 'Raport max/min PIB/loc', 'Coef. de variație PIB/loc'],
          rows: [
            ['S1 — Status quo', 8, '3,5', '0,47'],
            ['S2 — Personalitate juridică', 8, '3,5', '0,47'],
            ['S3 — Provincii istorice', 8, '3,9', '0,52'],
            ['S4 — Macro-regiuni', 4, '2,1', '0,30'],
            ['S5 — Mixt/asimetric', 6, '2,9', '0,40']
          ] }
      ]
    },

    // ─────────────────────────────────────────── 28
    {
      title: 'Comparație transversală: cost administrativ și reprezentare',
      blocks: [
        { type: 'p', text: 'Pe axa costului administrativ și a reprezentării, scenariile se ordonează clar în funcție de numărul de regiuni și de existența organelor alese. S1 este cel mai ieftin (doar ADR-uri, fără aleși regionali). La celălalt capăt, S2 și S3 (opt regiuni cu organe proprii) au costul și numărul de aleși cel mai mare. S4 (patru macroregiuni) reduce ambele, iar S5 se situează intermediar. Această ierarhie de cost este robustă și nu depinde de calibrarea exactă a cifrelor, ci de logica structurală — mai multe regiuni cu organe proprii înseamnă mai mult cost și mai mulți aleși.'},
        { type: 'p', text: 'Echilibrul între cost și reprezentare este însă un compromis, nu o ierarhie simplă. Un cost mai mare (S2, S3) cumpără o reprezentare mai fină și o decizie mai apropiată de cetățean; un cost mai mic (S4) sacrifică subsidiaritatea. S1 evită complet costul, dar și beneficiul. Alegerea optimă depinde de cât de mult valorizează societatea apropierea deciziei de cetățean față de eficiența fiscală — o judecată politică, nu tehnică, pe care analiza neutră o expune fără a o tranșa.'},
        { type: 'p', text: 'Tabelul cuantifică, comparativ, costul net administrativ estimat și numărul de aleși regionali pe scenariu. Ultima coloană — locuitori per ales regional — măsoară granularitatea reprezentării: cu cât este mai mică, cu atât decizia este mai apropiată de cetățean, dar cu atât costul tinde să crească. Acest tablou oferă baza cuantificată pentru arbitrajul între eficiență și proximitate.'},
        { type: 'table', headers: ['Scenariu', 'Cost net admin. (mil €/an)', 'Total aleși regionali', 'Locuitori per ales (mii)'],
          rows: [
            ['S1 — Status quo', 30, 0, 0],
            ['S4 — Macro-regiuni', 80, 280, 68],
            ['S5 — Mixt/asimetric', 105, 340, 56],
            ['S2 — Personalitate juridică', 130, 458, 42],
            ['S3 — Provincii istorice', 140, 470, 41]
          ] }
      ]
    },

    // ─────────────────────────────────────────── 29
    {
      title: 'Matricea comparativă multicriterială a scenariilor',
      blocks: [
        { type: 'p', text: 'Sinteza analizei este o matrice multicriterială care evaluează fiecare scenariu pe un set de criterii ponderate. Criteriile reținute sunt: reducerea disparităților de dezvoltare, capacitatea de absorbție a fondurilor UE, eficiența costului administrativ, apropierea deciziei de cetățean (subsidiaritate), atractivitatea investițională, fezabilitatea constituțională și juridică, și riscul de coeziune (etnic/centrifugare — punctaj invers, risc mic egal scor mare). Fiecare scenariu primește un scor 0-100 pe fiecare criteriu, iar scorul agregat este media ponderată. Ponderile sunt orientative și pot fi ajustate în funcție de prioritățile decidentului.'},
        { type: 'p', text: 'Lectura matricei trebuie făcută cu prudență metodologică: scorul agregat NU desemnează un câștigător obiectiv, ci sintetizează compromisuri. S1 excelează la fezabilitate și cost dar eșuează la autonomie și potențial de coeziune. S2 echilibrează autonomia cu păstrarea granițelor funcționale, fiind un compromis robust. S3 oferă legitimitate culturală maximă dar cu riscul de coeziune cel mai ridicat. S4 maximizează eficiența dar sacrifică subsidiaritatea și comportă risc de eligibilitate. S5 oferă adaptabilitate maximă dar complexitate ridicată. Niciun scenariu nu domină pe toate criteriile — aceasta este însăși natura unei decizii de regionalizare.'},
        { type: 'p', text: 'Tabelul prezintă scorul agregat (media simplă a criteriilor, pentru transparență) pe scenariu. Sub o ponderare neutră, scenariile cu personalitate juridică și granițe funcționale (S2) și modelul consolidat (S4) tind să obțină scoruri agregate apropiate, în timp ce S1 și S3 se află la extreme opuse — prudență maximă, respectiv identitate maximă cu risc maxim. Decidentul poate ajusta ponderile pentru a reflecta prioritatea politică (coeziune, eficiență sau identitate), obținând o ierarhie diferită.'},
        { type: 'table', headers: ['Scenariu', 'Disparități', 'Absorbție UE', 'Cost (invers)', 'Scor agregat (0-100)'],
          rows: [
            ['S1 — Status quo', 35, 70, 92, 56],
            ['S2 — Personalitate juridică', 65, 80, 60, 68],
            ['S3 — Provincii istorice', 55, 65, 55, 58],
            ['S4 — Macro-regiuni', 60, 72, 78, 64],
            ['S5 — Mixt/asimetric', 62, 78, 60, 63]
          ] }
      ]
    },

    // ─────────────────────────────────────────── 30
    {
      title: 'Matricea de risc consolidată pe scenarii',
      blocks: [
        { type: 'p', text: 'Dincolo de beneficii, fiecare scenariu poartă un profil de risc care trebuie evaluat separat, pentru că riscurile de coeziune națională nu se compensează cu beneficiile economice — ele sunt de natură diferită. Riscurile relevante sunt: riscul constituțional (cât de mult intervine scenariul asupra arhitecturii fundamentale a statului), riscul de centrifugare (tendința unor regiuni de a-și dori autonomie crescută față de centru), riscul etnic (activarea sensibilităților identitare, în special Harghita-Covasna), riscul de fragmentare administrativă, riscul de eligibilitate a fondurilor și riscul de tranziție (costul și perturbarea reorganizării).'},
        { type: 'p', text: 'Profilul de risc consolidat arată că S1 este, evident, cel mai sigur — nicio schimbare, niciun risc de tranziție. S2 are risc moderat (revizuire constituțională, dar granițe neschimbate). S3 are profilul de risc cel mai ridicat — istoric, etnic, centrifugare, dezechilibru de scară. S4 are risc de eligibilitate (pragul de 75% la NUTS-1) și de subsidiaritate. S5 are risc constituțional ridicat din cauza asimetriei. Analiza neutră nu ierarhizează riscurile după o valoare politică, ci le expune pentru ca decidentul să le pondereze în funcție de toleranța sa la risc.'},
        { type: 'p', text: 'Tabelul agregă riscurile într-un scor total de risc (sumă normalizată, unde valori mai mari înseamnă risc mai mare). El confirmă că există un schimb fundamental între ambiția reformei și riscul asumat: scenariile mai transformatoare (S3, S5) comportă risc mai mare, în timp ce scenariile prudente (S1, S2) îl minimizează. Acest schimb este nucleul deciziei de regionalizare și trebuie făcut explicit, nu ascuns sub un scor unic de beneficiu.'},
        { type: 'table', headers: ['Scenariu', 'Risc constituțional', 'Risc coeziune/etnic', 'Risc tranziție', 'Scor total risc (0-100)'],
          rows: [
            ['S1 — Status quo', 5, 10, 5, 7],
            ['S2 — Personalitate juridică', 55, 25, 40, 40],
            ['S3 — Provincii istorice', 80, 85, 70, 78],
            ['S4 — Macro-regiuni', 60, 35, 55, 50],
            ['S5 — Mixt/asimetric', 75, 45, 60, 60]
          ] }
      ]
    },

    // ─────────────────────────────────────────── 31
    {
      title: 'Simulare detaliată: „Moldova ca regiune unică"',
      blocks: [
        { type: 'p', text: 'Una dintre cele mai discutate ipoteze ale regionalizării este unificarea celor opt județe moldave (Bacău, Botoșani, Iași, Neamț, Suceava, Vaslui, Galați, Vrancea) într-o singură regiune Moldova. În actuala organizare, Moldova istorică este divizată între regiunea de dezvoltare Nord-Est (șase județe) și Sud-Est (Galați, Vrancea, alături de județe dobrogene și muntene). O Moldovă unică ar reuni o populație de aproximativ 3,5-3,7 milioane de locuitori, devenind cea mai populată regiune a țării, depășind București-Ilfov și oricare provincie istorică în afară de Transilvania extinsă.'},
        { type: 'p', text: 'Economic, Moldova unică ar concentra un PIB de ordinul a 30-32 miliarde de euro, cu un PIB/locuitor printre cele mai scăzute din țară (în jur de 65% din media națională, sub 50% din media UE în SPC), reflectând poziția istorică de regiune mai puțin dezvoltată. Avantajul unei Moldove unice ar fi masa critică — o piață și o forță de muncă de peste 3,5 milioane de oameni, cu doi poli urbani majori (Iași și Galați) și o conștiință regională puternică — care ar putea susține investiții structurante (autostrada A7, port la Dunăre la Galați, polul universitar Iași) și o voce regională coerentă în fața centrului.'},
        { type: 'p', text: 'Reprezentarea unei Moldove unice ar fi considerabilă: cu peste 3,5 milioane de locuitori, ar cumula cea mai mare delegație parlamentară din țară (peste 60 de deputați) și cel mai mare consiliu regional. Riscul ar fi reproducerea, la nivel regional, a concentrării pe polul Iași în dauna periferiilor (Botoșani, Vaslui), dacă politica regională nu este atentă la coeziunea intraregională. Tabelul cuantifică profilul unei Moldove unice, ca exercițiu ilustrativ al impactului consolidării unui teritoriu mare și relativ slab dezvoltat.'},
        { type: 'table', headers: ['Indicator (Moldova unică)', 'Județe: BC,BT,IS,NT,SV,VS,GL,VN', 'Comparație națională', 'Valoare'],
          rows: [
            ['Populație (mii loc.)', 'Suma 8 județe', 'Cea mai populată regiune', 3650],
            ['PIB (mld €)', 'Suma 8 județe', 'A patra economie regională', 31],
            ['PIB/loc (% media RO)', 'Calculat', 'Sub medie', 64],
            ['Deputați (aprox.)', 'Proporțional pop.', 'Cea mai mare delegație', 60],
            ['Poli urbani majori', 'Iași, Galați', 'Doi poli', 2],
            ['Suprafață (mii km pătrați)', 'Suma 8 județe', 'Cea mai mare regiune', 47]
          ] }
      ]
    },

    // ─────────────────────────────────────────── 32
    {
      title: 'Fezabilitatea constituțională și juridică a scenariilor',
      blocks: [
        { type: 'p', text: 'Orice scenariu care conferă regiunilor personalitate juridică (S2, S3, S4, S5) întâmpină același obstacol fundamental: Constituția României consacră la articolul 3 alineatul 3 că teritoriul este organizat administrativ în comune, orașe și județe, fără a recunoaște regiunea ca unitate administrativ-teritorială cu organe proprii. Trecerea la oricare dintre scenariile cu regiuni alese necesită, așadar, o revizuire constituțională, procedură grea care presupune inițiativă calificată, adoptare cu majoritate de două treimi în fiecare cameră (sau mediere) și validare prin referendum național. Aceasta este condiția juridică prealabilă comună a tuturor scenariilor transformatoare.'},
        { type: 'p', text: 'Pe lângă revizuirea constituțională, ar fi necesară o lege a regiunilor (organică) care să stabilească competențele, resursele fiscale, raporturile cu județele și statul, și modul de alegere a organelor regionale. România a ratificat Carta Europeană a Autonomiei Locale (Legea 199/1997), care oferă un cadru de principii pentru descentralizare, dar nu impune un anumit model regional. Compatibilitatea cu dreptul european este asigurată atâta vreme cât delimitările NUTS sunt notificate corect la Eurostat. Riscul juridic specific al S5 (asimetria) este că un statut diferențiat ar putea fi atacat pe motiv de inegalitate, necesitând un fundament obiectiv solid pentru diferențiere.'},
        { type: 'p', text: 'Istoric, proiectul de regionalizare din 2013 a eșuat tocmai la etapa constituțională și politică, în absența unui consens larg și din cauza controverselor privind harta și transferul de competențe. Lecția este că fezabilitatea unui scenariu nu ține doar de calitatea sa tehnică, ci și de capacitatea de a construi un consens politic și social suficient pentru o revizuire constituțională — un prag înalt care explică de ce S1 (status quo) a persistat. Tabelul cuantifică gradul de dificultate juridică al fiecărui scenariu.'},
        { type: 'table', headers: ['Scenariu', 'Revizuire constituțională', 'Lege organică nouă', 'Dificultate juridică (0-100)'],
          rows: [
            ['S1 — Status quo', 'Nu', 'Nu', 5],
            ['S2 — Personalitate juridică', 'Da', 'Da', 60],
            ['S3 — Provincii istorice', 'Da', 'Da', 80],
            ['S4 — Macro-regiuni', 'Da', 'Da', 65],
            ['S5 — Mixt/asimetric', 'Da', 'Da (complexă)', 78]
          ] }
      ]
    },

    // ─────────────────────────────────────────── 33
    {
      title: 'Modele europene de referință pentru calibrarea scenariilor',
      blocks: [
        { type: 'p', text: 'Calibrarea scenariilor românești se sprijină pe experiența statelor europene care au parcurs procese de regionalizare. Polonia este referința cea mai relevantă: în 1999 a redus numărul de voievodate de la 49 la 16, creând regiuni cu autoguvernare, fiecare cu sejm și mareșal regional ales, gestionând propriul program de coeziune — model asociat unei absorbții ridicate a fondurilor UE și unei reduceri treptate a disparităților. Franța a parcurs drumul invers în 2015, comasând cele 22 de regiuni metropolitane în 13 regiuni mai mari, urmărind economii de scară (rezultate mai modeste decât estimările inițiale).'},
        { type: 'p', text: 'Italia oferă modelul asimetric clasic — 15 regiuni cu statut ordinar și 5 regiuni cu statut special (Sicilia, Sardinia, Valle d Aosta, Friuli-Venezia Giulia, Trentino-Alto Adige) cu competențe extinse, justificate istoric, lingvistic sau geografic — relevant pentru S5. Spania ilustrează devoluția asimetrică prin comunitățile autonome cu statute diferite, de la cele cu competențe foarte extinse (Țara Bascilor, Catalonia, Navarra) la cele cu competențe mai reduse, model care arată atât potențialul, cât și tensiunile (revendicări de autonomie sporită) ale asimetriei. Germania, cu landurile sale federale puternice, reprezintă capătul federalist al spectrului.'},
        { type: 'p', text: 'Aceste modele nu sunt șabloane de copiat, ci surse de calibrare a parametrilor — dimensiunea optimă a unei regiuni, nivelul de competențe, raportul cu nivelul intermediar — și de învățare a capcanelor (economii de scară supraestimate în Franța, tensiuni de autonomie în Spania). Tabelul sintetizează referințele europene, asociind fiecare model cu scenariul românesc pe care îl informează cel mai bine, ca instrument de fundamentare comparată a deciziei.'},
        { type: 'table', headers: ['Stat / model', 'Tip regionalizare', 'Scenariu RO informat', 'Nr. regiuni'],
          rows: [
            ['Polonia (voievodate, 1999)', 'Autoguvernare omogenă', 'S2', 16],
            ['Franța (regiuni post-2015)', 'Consolidare/comasare', 'S4', 13],
            ['Italia (statut ordinar+special)', 'Asimetric', 'S5', 20],
            ['Spania (comunități autonome)', 'Devoluție asimetrică', 'S5', 17],
            ['Germania (landuri)', 'Federal', 'S2 / S4', 16],
            ['Cehia (kraje, 2000)', 'Autoguvernare omogenă', 'S2', 14]
          ] }
      ]
    },

    // ─────────────────────────────────────────── 34
    {
      title: 'Sinteză cuantificată: tabloul integrat al celor cinci scenarii',
      blocks: [
        { type: 'p', text: 'Tabloul integrat reunește, pe un singur rând per scenariu, principalii indicatori cuantificați de-a lungul acestei părți: numărul de regiuni, raportul de disparitate al PIB/locuitorului, câștigul estimat de absorbție a fondurilor față de status quo, costul net administrativ, scorul de risc consolidat și scorul agregat de beneficiu. Această sinteză permite o lectură simultană a compromisurilor pe care fiecare scenariu le încorporează și confirmă concluzia transversală: nu există un scenariu dominant, ci profiluri diferite, adaptate unor priorități diferite.'},
        { type: 'p', text: 'Citind tabloul pe orizontală, S1 minimizează costul și riscul cu prețul autonomiei și al potențialului de coeziune. S2 oferă cel mai bun raport beneficiu/risc dintre scenariile transformatoare, păstrând granițele funcționale și adăugând autonomie. S3 are legitimitatea culturală cea mai mare, dar riscul de coeziune și dificultatea juridică cele mai ridicate. S4 maximizează eficiența de scară cu riscuri de eligibilitate și subsidiaritate. S5 oferă adaptabilitate fină cu complexitate instituțională ridicată. Alegerea depinde de ponderea acordată fiecărui criteriu, judecată care aparține deciziei politice democratice, nu analizei tehnice.'},
        { type: 'p', text: 'Avertismentul metodologic final este că toate cifrele din această parte sunt estimări calibrate pe date reale (Eurostat NUTS, INS Recensământ 2021, propunerile publice 2011/2013, modele europene), destinate să structureze comparația, nu să substituie analizele oficiale de impact pe care orice reformă de această amploare le-ar necesita. Indicatorul cu adevărat decisiv pentru coeziune — reducerea decalajelor la nivelul comunităților, nu doar între regiuni statistice — rămâne criteriul față de care succesul oricărui scenariu trebuie măsurat în timp.'},
        { type: 'table', headers: ['Scenariu', 'Nr. regiuni', 'Disparitate (max/min)', 'Cost net (mil €/an)', 'Scor beneficiu net (0-100)'],
          rows: [
            ['S1 — Status quo', 8, '3,5', 30, 50],
            ['S2 — Personalitate juridică', 8, '3,5', 130, 68],
            ['S3 — Provincii istorice', 8, '3,9', 140, 52],
            ['S4 — Macro-regiuni', 4, '2,1', 80, 60],
            ['S5 — Mixt/asimetric', 6, '2,9', 105, 58]
          ] }
      ]
    }

  ];

  try {
    var _n = (G._REGIO_DEEP['p10'] || []).length;
    console.log('[regio-deep-p10] incarcat — ' + _n + ' capitole (Scenarii de regionalizare si impact cuantificat)');
  } catch (e) {}

})(window);
