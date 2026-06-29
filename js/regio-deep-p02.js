/* UrbanX — REGIO DEEP — PART 02
   CADRUL LEGAL, ADMINISTRATIV ȘI ISTORIC AL ORGANIZĂRII TERITORIALE A ROMÂNIEI
   Date reale, surse citate inline. Fără fabricație. */
window._REGIO_DEEP = window._REGIO_DEEP || {};
window._REGIO_DEEP['p02'] = [

  {
    title: 'Organizarea administrativ-teritorială actuală a României',
    blocks: [
      { type:'p', text:'Organizarea administrativă a României este consacrată constituțional. Potrivit Constituției României (art. 3 alin. 3), „teritoriul este organizat, sub aspect administrativ, în comune, orașe și județe; în condițiile legii, unele orașe sunt declarate municipii". Aceste unități administrativ-teritoriale (UAT) reprezintă nivelul de bază al organizării statale și fundamentul autonomiei locale. Legea-cadru aplicabilă este Ordonanța de Urgență nr. 57/2019 privind Codul administrativ, care a înlocuit Legea administrației publice locale nr. 215/2001.' },
      { type:'p', text:'În structura actuală, România numără 3.181 de unități administrativ-teritoriale de bază și intermediare. Comunele sunt cele mai numeroase, urmate de orașe și municipii, iar nivelul intermediar este reprezentat de județe. Municipiul București are statut aparte, fiind organizat în șase sectoare și având un regim de capitală. Această arhitectură este rezultatul Legii nr. 2/1968 privind organizarea administrativă a teritoriului, modificată succesiv după 1989.' },
      { type:'p', text:'Numărul exact al fiecărui tip de UAT este consacrat prin acte normative și statistici oficiale ale Institutului Național de Statistică (INS) și ale Ministerului Dezvoltării, Lucrărilor Publice și Administrației (MDLPA). În sistemul european de clasificare NUTS, județele și municipiul București corespund nivelului NUTS-3, fiind unitățile teritoriale folosite pentru raportarea statistică regională către Eurostat.' },
      { type:'table', headers:['Tip UAT','Nivel NUTS','Număr'], rows:[
        ['Județe','NUTS-3',41],
        ['Municipiul București','NUTS-3',1],
        ['Municipii','UAT urban',103],
        ['Orașe','UAT urban',217],
        ['Comune','UAT rural',2862],
        ['Total UAT (județe+localități)','—',3181]
      ]}
    ]
  },

  {
    title: 'Comuna — unitatea de bază a organizării rurale',
    blocks: [
      { type:'p', text:'Comuna este, potrivit Codului administrativ (OUG 57/2019, art. 5), unitatea administrativ-teritorială de bază care cuprinde populația rurală unită prin comunitate de interese și tradiții, fiind alcătuită din unul sau mai multe sate. Satul reședință de comună este localitatea în care își au sediul autoritățile publice ale comunei — consiliul local și primarul. Comuna are personalitate juridică, patrimoniu propriu și capacitate de a sta în justiție.' },
      { type:'p', text:'Cele 2.862 de comune reprezintă marea majoritate numerică a unităților administrativ-teritoriale, dar concentrează o populație mai redusă raportat la suprafață. Multe comune au sub 3.000 de locuitori, ceea ce ridică probleme de capacitate administrativă și de eficiență a furnizării serviciilor publice. Această fragmentare este o temă recurentă în dezbaterea privind reforma administrativă.' },
      { type:'p', text:'Statutul comunei este protejat prin principiul autonomiei locale, consacrat în art. 120 din Constituție și în Carta Europeană a Autonomiei Locale (ratificată prin Legea nr. 199/1997). Modificarea limitelor sau a statutului unei comune se poate face numai prin lege, cu consultarea prealabilă a cetățenilor prin referendum, conform art. 22 din Codul administrativ.' },
      { type:'chart', chartType:'bar', labels:['Comune','Orașe','Municipii'], data:[2862,217,103] }
    ]
  },

  {
    title: 'Orașul și municipiul — organizarea urbană',
    blocks: [
      { type:'p', text:'Orașul este unitatea administrativ-teritorială de bază cu o populație mai numeroasă, o însemnătate economică, socială și politico-administrativă mai mare și cu dotări edilitare specifice mediului urban. Municipiul este, potrivit art. 7 din Codul administrativ, orașul în care își desfășoară activitatea autorități ale administrației publice locale, instituții publice de interes județean sau național, cu un rol economic, social, politic și cultural important.' },
      { type:'p', text:'Declararea unui oraș ca municipiu se face prin lege, pe baza unor criterii privind numărul de locuitori, gradul de dotare edilitară și rolul în teritoriu. În prezent există 103 municipii și 217 orașe. Reședințele de județ sunt, în general, municipii, ele concentrând serviciile deconcentrate ale ministerelor și instituțiilor publice cu competență județeană.' },
      { type:'p', text:'Distincția dintre oraș și municipiu este în primul rând simbolică și de rang, neavând consecințe majore asupra competențelor administrative, care rămân cele ale unei localități urbane. Totuși, statutul de municipiu conferă vizibilitate instituțională și condiționează, în unele situații, accesul la programe de finanțare destinate centrelor urbane.' },
      { type:'table', headers:['Indicator urban','Oraș','Municipiu (orientativ)'], rows:[
        ['Număr în România','217','103'],
        ['Prag populație de referință','peste 5000','peste 25000'],
        ['Reședință de județ (de regulă)','rar','frecvent']
      ]}
    ]
  },

  {
    title: 'Județul — nivelul intermediar de administrație',
    blocks: [
      { type:'p', text:'Județul este, potrivit Codului administrativ, unitatea administrativ-teritorială alcătuită din comune, orașe și municipii, în funcție de condițiile geografice, economice, sociale, etnice și de legăturile culturale și tradiționale ale populației. România are 41 de județe, la care se adaugă municipiul București, care îndeplinește totodată și funcții de nivel județean. Această structură a fost stabilită prin Legea nr. 2/1968.' },
      { type:'p', text:'Autoritatea deliberativă la nivel județean este consiliul județean, care coordonează activitatea consiliilor locale în vederea realizării serviciilor publice de interes județean. Președintele consiliului județean reprezintă executivul. Județul are personalitate juridică, buget propriu și patrimoniu, și gestionează infrastructura de interes județean — drumuri, spitale, școli speciale, cultură.' },
      { type:'p', text:'În sistemul NUTS, fiecare județ constituie o unitate NUTS-3. Această corespondență este esențială pentru raportarea statistică către Eurostat și pentru alocarea fondurilor europene, deoarece o serie de indicatori (PIB regional, șomaj, demografie) sunt colectați la nivel județean și agregați ulterior la nivel de regiune (NUTS-2) și macroregiune (NUTS-1).' },
      { type:'table', headers:['Element','Județ'], rows:[
        ['Număr total','41'],
        ['Plus municipiul București (rang echivalent)','1'],
        ['Nivel NUTS','NUTS-3 (42)'],
        ['Autoritate deliberativă','Consiliul județean']
      ]}
    ]
  },

  {
    title: 'Municipiul București — statut special de capitală',
    blocks: [
      { type:'p', text:'Municipiul București are un statut administrativ aparte, fiind capitala României. Potrivit Codului administrativ, Bucureștiul este organizat în șase sectoare, fiecare având propriul consiliu local și primar de sector, peste care se suprapune nivelul municipal — Consiliul General al Municipiului București (CGMB) și Primarul General. Această structură pe două niveluri (sector și municipiu) este unică în România.' },
      { type:'p', text:'În clasificarea NUTS, municipiul București formează, împreună cu județul Ilfov, regiunea de dezvoltare București-Ilfov (NUTS-2), cea mai prosperă regiune a țării din punct de vedere economic. La nivel NUTS-3, Bucureștiul este o unitate distinctă, separată de Ilfov. Această dublă apartenență reflectă rolul de pol național și european al capitalei.' },
      { type:'p', text:'Repartizarea competențelor între Primăria Generală și primăriile de sector a generat de-a lungul timpului tensiuni administrative, în special privind gestionarea infrastructurii, a spațiilor verzi și a serviciilor publice. Statutul special al capitalei este reglementat prin dispoziții distincte ale Codului administrativ și prin Legea nr. 215/2001, în forma anterioară.' },
      { type:'table', headers:['Nivel administrativ București','Autoritate','Număr'], rows:[
        ['Municipiu','Primarul General + CGMB','1'],
        ['Sectoare','Primar de sector + consiliu local','6'],
        ['Regiune asociată (NUTS-2)','București-Ilfov','1']
      ]}
    ]
  },

  {
    title: 'Cele 8 regiuni de dezvoltare (NUTS-2)',
    blocks: [
      { type:'p', text:'Regiunile de dezvoltare au fost create prin Legea nr. 151/1998 privind dezvoltarea regională, înlocuită ulterior de Legea nr. 315/2004. România este împărțită în opt regiuni de dezvoltare: Nord-Est, Sud-Est, Sud-Muntenia, Sud-Vest Oltenia, Vest, Nord-Vest, Centru și București-Ilfov. Aceste regiuni corespund nivelului NUTS-2 din clasificarea europeană și constituie cadrul de implementare a politicii de coeziune.' },
      { type:'p', text:'Trăsătura juridică esențială a regiunilor de dezvoltare este că ele NU au personalitate juridică și NU constituie unități administrativ-teritoriale. Potrivit art. 5 din Legea nr. 315/2004, regiunile de dezvoltare „nu sunt unități administrativ-teritoriale și nu au personalitate juridică". Ele reprezintă cadrul de elaborare, implementare și evaluare a politicilor de dezvoltare regională și de colectare a datelor statistice NUTS-2.' },
      { type:'p', text:'Fiecare regiune este formată prin asocierea voluntară a județelor componente. Regiunile au fost concepute astfel încât fiecare să cuprindă mai multe județe (cu excepția București-Ilfov), pentru a atinge pragul demografic minim cerut de regulamentul NUTS pentru nivelul 2 — între 800.000 și 3 milioane de locuitori, conform Regulamentului (CE) nr. 1059/2003.' },
      { type:'table', headers:['Regiune NUTS-2','Cod NUTS','Număr județe'], rows:[
        ['Nord-Est','RO21',6],
        ['Sud-Est','RO22',6],
        ['Sud-Muntenia','RO31',7],
        ['Sud-Vest Oltenia','RO41',5],
        ['Vest','RO42',4],
        ['Nord-Vest','RO11',6],
        ['Centru','RO12',6],
        ['București-Ilfov','RO32',2]
      ]}
    ]
  },

  {
    title: 'Componența județeană a celor opt regiuni',
    blocks: [
      { type:'p', text:'Componența fiecărei regiuni de dezvoltare este stabilită prin anexa la Legea nr. 315/2004. Regiunea Nord-Est, cea mai populată, cuprinde județele Bacău, Botoșani, Iași, Neamț, Suceava și Vaslui. Regiunea Sud-Est cuprinde Brăila, Buzău, Constanța, Galați, Tulcea și Vrancea. Aceste delimitări reflectă provinciile istorice și legăturile economice tradiționale dintre județe.' },
      { type:'p', text:'Regiunea Sud-Muntenia este cea cu cele mai multe județe componente — șapte (Argeș, Călărași, Dâmbovița, Giurgiu, Ialomița, Prahova, Teleorman), însă nu include municipiul București, care împreună cu Ilfov formează o regiune separată. Aceasta a creat o configurație de „inel" în jurul capitalei, considerată de unii analiști drept o slăbiciune a delimitării din 1998.' },
      { type:'p', text:'Regiunea Vest este cea mai mică ca număr de județe — patru (Arad, Caraș-Severin, Hunedoara, Timiș), în timp ce București-Ilfov cuprinde doar municipiul București și județul Ilfov. Această asimetrie demografică și teritorială între regiuni este unul dintre argumentele invocate în dezbaterea privind reorganizarea regională.' },
      { type:'table', headers:['Regiune','Județe componente','Număr'], rows:[
        ['Nord-Est','BC, BT, IS, NT, SV, VS',6],
        ['Sud-Est','BR, BZ, CT, GL, TL, VN',6],
        ['Sud-Muntenia','AG, CL, DB, GR, IL, PH, TR',7],
        ['Sud-Vest Oltenia','DJ, GJ, MH, OT, VL',5],
        ['Vest','AR, CS, HD, TM',4],
        ['Nord-Vest','BH, BN, CJ, MM, SM, SJ',6],
        ['Centru','AB, BV, CV, HR, MS, SB',6],
        ['București-Ilfov','B, IF',2]
      ]}
    ]
  },

  {
    title: 'Macroregiunile (NUTS-1) — cele patru macroregiuni',
    blocks: [
      { type:'p', text:'La nivelul superior al clasificării NUTS, România este împărțită în patru macroregiuni (nivelul NUTS-1), constituite prin gruparea câte două regiuni de dezvoltare. Această diviziune a fost introdusă pentru a respecta cerințele Regulamentului (CE) nr. 1059/2003 privind structura NUTS-1, al cărei prag demografic este între 3 și 7 milioane de locuitori. Macroregiunile au exclusiv rol statistic.' },
      { type:'p', text:'Macroregiunea 1 cuprinde regiunile Nord-Vest și Centru; Macroregiunea 2 cuprinde Nord-Est și Sud-Est; Macroregiunea 3 cuprinde Sud-Muntenia și București-Ilfov; Macroregiunea 4 cuprinde Sud-Vest Oltenia și Vest. Aceste macroregiuni nu au structuri administrative, autorități alese sau personalitate juridică — ele există doar în nomenclatorul statistic Eurostat.' },
      { type:'p', text:'Crearea macroregiunilor a fost necesară după aderarea României la Uniunea Europeană în 2007, pentru armonizarea cu sistemul de raportare statistică european. Ele permit agregarea datelor la un nivel intermediar între țară (NUTS-0) și regiunile de dezvoltare (NUTS-2), însă nu joacă niciun rol în alocarea fondurilor structurale, care se face la nivel NUTS-2.' },
      { type:'table', headers:['Macroregiune (NUTS-1)','Cod','Regiuni componente'], rows:[
        ['Macroregiunea Unu','RO1','Nord-Vest + Centru'],
        ['Macroregiunea Doi','RO2','Nord-Est + Sud-Est'],
        ['Macroregiunea Trei','RO3','Sud-Muntenia + București-Ilfov'],
        ['Macroregiunea Patru','RO4','Sud-Vest Oltenia + Vest']
      ]}
    ]
  },

  {
    title: 'Sistemul NUTS și Regulamentul (CE) nr. 1059/2003',
    blocks: [
      { type:'p', text:'Nomenclatorul comun al unităților teritoriale de statistică (NUTS) a fost instituit prin Regulamentul (CE) nr. 1059/2003 al Parlamentului European și al Consiliului. NUTS reprezintă o clasificare ierarhică, în trei niveluri, a teritoriilor statelor membre, în scopul colectării, dezvoltării și armonizării statisticilor regionale europene și al implementării politicii de coeziune. România a fost integrată în sistem la aderare.' },
      { type:'p', text:'Regulamentul stabilește praguri demografice pentru fiecare nivel: NUTS-1 între 3 și 7 milioane de locuitori, NUTS-2 între 800.000 și 3 milioane, iar NUTS-3 între 150.000 și 800.000. Aceste praguri sunt menite să asigure comparabilitatea statistică între regiunile diverselor state membre. În cazul României, județele depășesc adesea limita inferioară NUTS-3, iar unele regiuni se apropie de plafonul superior NUTS-2.' },
      { type:'p', text:'Importanța NUTS-2 este capitală: la acest nivel se determină eligibilitatea pentru fondurile politicii de coeziune, în funcție de PIB-ul pe cap de locuitor raportat la media UE. Regiunile cu PIB sub 75% din media UE sunt „regiuni mai puțin dezvoltate" și beneficiază de cea mai mare intensitate a sprijinului. Șapte din cele opt regiuni românești se încadrează în această categorie.' },
      { type:'table', headers:['Nivel NUTS','Prag minim locuitori','Prag maxim locuitori'], rows:[
        ['NUTS-1','3000000','7000000'],
        ['NUTS-2','800000','3000000'],
        ['NUTS-3','150000','800000']
      ]}
    ]
  },

  {
    title: 'Legea nr. 315/2004 privind dezvoltarea regională',
    blocks: [
      { type:'p', text:'Legea nr. 315/2004 privind dezvoltarea regională în România reprezintă actul normativ-cadru pentru organizarea politicii regionale. Ea a abrogat Legea nr. 151/1998 și a actualizat cadrul instituțional în perspectiva aderării la Uniunea Europeană. Legea definește obiectivele dezvoltării regionale — reducerea dezechilibrelor regionale, stimularea cooperării interregionale și participarea la programele europene de dezvoltare.' },
      { type:'p', text:'Legea instituie cadrul instituțional al dezvoltării regionale: Consiliul Național pentru Dezvoltare Regională (CNDR) la nivel central, Consiliile pentru Dezvoltare Regională (CDR) la nivelul fiecărei regiuni și Agențiile pentru Dezvoltare Regională (ADR) ca structuri executive. Tot aici se reglementează Fondul Național pentru Dezvoltare Regională și Fondurile de Dezvoltare Regională.' },
      { type:'p', text:'Un element esențial al legii este afirmarea expresă că regiunile de dezvoltare nu sunt unități administrativ-teritoriale și nu au personalitate juridică. Aceasta a fost o alegere deliberată a legiuitorului din 1998 și 2004 pentru a evita modificarea Constituției, care nu prevede regiunea ca nivel administrativ. Consecința este că regiunile funcționează ca parteneriate ale județelor, nu ca entități de sine stătătoare.' },
      { type:'bullets', items:[
        'Obiectiv principal: reducerea dezechilibrelor de dezvoltare interregională.',
        'Instituie CNDR, CDR-uri și ADR-uri.',
        'Confirmă: regiunile NU au personalitate juridică.',
        'Înlocuiește Legea nr. 151/1998.',
        'Aliniază cadrul la cerințele politicii de coeziune a UE.'
      ]},
      { type:'table', headers:['Structură instituită prin Legea 315/2004','Nivel'], rows:[
        ['CNDR — Consiliul Național pentru Dezvoltare Regională','Central'],
        ['CDR — Consiliile pentru Dezvoltare Regională','Regional (8)'],
        ['ADR — Agențiile pentru Dezvoltare Regională','Regional (8)'],
        ['Fond Național pentru Dezvoltare Regională','Central']
      ]}
    ]
  },

  {
    title: 'Agențiile pentru Dezvoltare Regională (ADR) — statut juridic',
    blocks: [
      { type:'p', text:'Agențiile pentru Dezvoltare Regională (ADR) sunt, potrivit Legii nr. 315/2004, organisme neguvernamentale, nonprofit, de utilitate publică, cu personalitate juridică, care acționează în domeniul specific al dezvoltării regionale. Există câte o ADR pentru fiecare dintre cele opt regiuni de dezvoltare. Spre deosebire de regiunile în sine, ADR-urile au personalitate juridică, fiind organizate ca structuri asociative ale județelor.' },
      { type:'p', text:'ADR-urile îndeplinesc rolul de Organism Intermediar pentru implementarea programelor operaționale regionale finanțate din fonduri europene. Începând cu perioada de programare 2021-2027, ADR-urile au devenit Autorități de Management pentru cele opt Programe Regionale (PR), o schimbare majoră față de perioadele anterioare, când gestionau fonduri ca organisme intermediare sub coordonarea Ministerului Dezvoltării.' },
      { type:'p', text:'Această creștere a competențelor ADR-urilor în 2021-2027 reprezintă un pas important către descentralizarea gestionării fondurilor europene și o întărire a capacității regionale, în absența unei reforme constituționale a regionalizării. ADR-urile pregătesc strategiile de dezvoltare regională, selectează proiectele și urmăresc execuția financiară a programelor.' },
      { type:'table', headers:['Atribut ADR','Stare'], rows:[
        ['Personalitate juridică','DA'],
        ['Număr ADR-uri în România','8'],
        ['Rol în 2021-2027','Autoritate de Management Program Regional'],
        ['Rol în 2014-2020','Organism Intermediar']
      ]}
    ]
  },

  {
    title: 'Consiliile pentru Dezvoltare Regională (CDR)',
    blocks: [
      { type:'p', text:'Consiliul pentru Dezvoltare Regională (CDR) este, conform Legii nr. 315/2004, organismul regional deliberativ, fără personalitate juridică, care coordonează activitățile de elaborare și monitorizare a strategiilor, planurilor și programelor de dezvoltare regională. CDR-ul aprobă și urmărește utilizarea fondurilor alocate regiunii și coordonează activitatea ADR-ului din regiunea respectivă.' },
      { type:'p', text:'CDR-ul este compus din președinții consiliilor județene din regiune și din câte un reprezentant al fiecărei categorii de consilii locale — municipal, orășenesc și comunal — din fiecare județ. În regiunea București-Ilfov, componența este adaptată pentru a include reprezentanți ai municipiului București și ai sectoarelor. Președinția CDR-ului se exercită prin rotație, pe perioade de un an.' },
      { type:'p', text:'Această arhitectură confirmă natura de parteneriat interjudețean a regiunilor de dezvoltare: deciziile regionale sunt luate de reprezentanții aleși ai județelor și localităților componente, nu de un organism regional cu legitimitate electorală proprie. Lipsa unei autorități regionale alese direct este o caracteristică definitorie a modelului românesc de regionalizare „soft".' },
      { type:'bullets', items:[
        'CDR — organism deliberativ regional, FĂRĂ personalitate juridică.',
        'Compus din președinții consiliilor județene + reprezentanți locali.',
        'Coordonează activitatea ADR-ului din regiune.',
        'Președinție prin rotație anuală.',
        'Aprobă strategia și planul de dezvoltare regională.'
      ]},
      { type:'table', headers:['Trăsătură CDR','Stare'], rows:[
        ['Personalitate juridică','NU'],
        ['Număr CDR-uri','8'],
        ['Membri din președinți consilii județene','DA'],
        ['Mandat președinte (luni)','12']
      ]}
    ]
  },

  {
    title: 'Consiliul Național pentru Dezvoltare Regională (CNDR)',
    blocks: [
      { type:'p', text:'La nivel central, coordonarea politicii de dezvoltare regională revine Consiliului Național pentru Dezvoltare Regională (CNDR), structură partenerial-deliberativă instituită prin Legea nr. 315/2004. CNDR are atribuții în promovarea și coordonarea politicii naționale de dezvoltare regională, aprobarea Strategiei Naționale pentru Dezvoltare Regională și a alocării Fondului Național pentru Dezvoltare Regională între regiuni.' },
      { type:'p', text:'CNDR este alcătuit din președinții și vicepreședinții Consiliilor pentru Dezvoltare Regională și, în număr egal, din reprezentanți ai Guvernului, desemnați prin hotărâre. Președinția CNDR este asigurată de ministrul cu atribuții în domeniul dezvoltării regionale. Această componență paritară reflectă principiul parteneriatului între nivelul central și cel regional.' },
      { type:'p', text:'Rolul CNDR este de a asigura coerența între prioritățile regionale și strategia națională, precum și echilibrul în repartizarea resurselor. Deciziile sale au caracter strategic, implementarea concretă rămânând în sarcina ADR-urilor. CNDR reprezintă veriga de legătură instituțională între nivelul european al politicii de coeziune și nivelul regional de implementare.' },
      { type:'table', headers:['Componență CNDR','Proveniență'], rows:[
        ['Reprezentanți regionali','Președinți+vicepreședinți CDR'],
        ['Reprezentanți centrali','Guvern (număr egal)'],
        ['Președinte','Ministru dezvoltare regională']
      ]}
    ]
  },

  {
    title: 'Provinciile istorice ale României',
    blocks: [
      { type:'p', text:'Înainte de orice organizare administrativă modernă, teritoriul României a fost structurat de provinciile istorice, formate de-a lungul secolelor: Țara Românească (Muntenia și Oltenia), Moldova, Transilvania, Banat, Crișana, Maramureș, Bucovina și Dobrogea. Aceste provincii păstrează până astăzi identități culturale, lingvistice și economice distincte, care influențează percepția regională a populației.' },
      { type:'p', text:'Statul național modern s-a constituit prin unirea succesivă a acestor provincii: Unirea Principatelor Moldova și Țara Românească în 1859, sub Alexandru Ioan Cuza; integrarea Dobrogei în 1878; și Marea Unire din 1918, prin care Transilvania, Banatul, Crișana, Maramureșul și Bucovina s-au unit cu Regatul României. Aceste momente au impus și nevoia unificării sistemelor administrative diferite moștenite.' },
      { type:'p', text:'Delimitarea actualelor regiuni de dezvoltare urmează, în linii mari, contururile provinciilor istorice: regiunea Centru și Nord-Vest acoperă Transilvania, regiunea Vest cuprinde Banatul și părți din Crișana, Nord-Est corespunde Moldovei istorice, iar Sud-Vest Oltenia preia denumirea provinciei. Această corespondență a urmărit creșterea acceptabilității sociale a regiunilor administrative.' },
      { type:'bullets', items:[
        'Moldova — corespunde în mare regiunii Nord-Est.',
        'Țara Românească (Muntenia + Oltenia) — regiunile Sud.',
        'Transilvania — regiunile Centru și Nord-Vest.',
        'Banat + Crișana — regiunea Vest.',
        'Dobrogea — parte din regiunea Sud-Est.',
        'Bucovina (de sud) — județul Suceava, regiunea Nord-Est.'
      ]},
      { type:'table', headers:['Moment al unificării teritoriale','An'], rows:[
        ['Unirea Principatelor (Moldova + Țara Românească)','1859'],
        ['Integrarea Dobrogei','1878'],
        ['Marea Unire (Transilvania, Banat, Bucovina etc.)','1918']
      ]}
    ]
  },

  {
    title: 'Organizarea administrativă interbelică și Legea din 1925',
    blocks: [
      { type:'p', text:'După Marea Unire din 1918, România s-a confruntat cu provocarea armonizării sistemelor administrative moștenite din imperiile austro-ungar și rus, precum și din Vechiul Regat. Legea pentru unificarea administrativă din 1925 a stabilit că teritoriul țării este împărțit în județe, plăși (subdiviziuni ale județului) și comune (rurale și urbane), introducând un sistem unitar pe întreg teritoriul național.' },
      { type:'p', text:'Sistemul interbelic se baza pe județ ca unitate intermediară și pe plasă ca structură de coordonare a comunelor rurale, condusă de un pretor. Comunele erau de două feluri — rurale și urbane — iar orașele reședință de județ aveau un regim aparte. Numărul de județe era considerabil mai mare decât astăzi, depășind 70 în perioada interbelică, în funcție de configurația teritorială a vremii.' },
      { type:'p', text:'Acest model centralizat dar bazat pe județe a fost o caracteristică de durată a administrației românești, întreruptă doar de experimentul regional sovietic din anii 1950. Plasa, ca nivel intermediar între comună și județ, a dispărut ulterior din organizarea administrativă, lăsând structura pe trei niveluri — comună/oraș, județ, stat — pe care o regăsim și astăzi.' },
      { type:'table', headers:['Nivel interbelic (1925)','Funcție'], rows:[
        ['Comună (rurală/urbană)','Unitate de bază'],
        ['Plasă','Coordonare comune (pretor)'],
        ['Județ','Nivel intermediar'],
        ['Stat','Nivel central']
      ]}
    ]
  },

  {
    title: 'Reforma ținuturilor din 1938',
    blocks: [
      { type:'p', text:'În anul 1938, sub regimul autoritar al regelui Carol al II-lea, a fost introdusă o reorganizare administrativă prin care s-a creat un nou nivel teritorial — ținutul. Prin Legea administrativă din august 1938, teritoriul României a fost împărțit în zece ținuturi, fiecare grupând mai multe județe, conduse de un rezident regal numit de centru. Județele au fost menținute, dar subordonate ținuturilor.' },
      { type:'p', text:'Cele zece ținuturi au primit, în general, denumiri geografice sau istorice — precum Ținutul Olt, Ținutul Mureș, Ținutul Dunării, Ținutul Mării, Ținutul Suceava, Ținutul Nistru. Scopul reformei era atât administrativ — o gestionare mai eficientă a teritoriului — cât și politic, vizând consolidarea controlului central și diminuarea autonomiei locale în contextul regimului autoritar.' },
      { type:'p', text:'Experimentul ținuturilor a fost de scurtă durată, fiind desființat în 1940, în contextul pierderilor teritoriale (Basarabia, Bucovina de Nord, nordul Transilvaniei, Cadrilaterul) și al schimbărilor de regim. Ținuturile din 1938 sunt adesea citate în dezbaterea contemporană ca un precedent istoric al organizării regionale a României, deși de natură net centralizatoare.' },
      { type:'chart', chartType:'bar', labels:['Ținuturi 1938','Regiuni 1950','Regiuni dezvoltare 1998'], data:[10,28,8] }
    ]
  },

  {
    title: 'Regiunile de model sovietic (1950-1968)',
    blocks: [
      { type:'p', text:'După instaurarea regimului comunist, România a abandonat în 1950 organizarea pe județe și a adoptat un model administrativ de inspirație sovietică, bazat pe regiuni și raioane. Legea din 1950 a împărțit teritoriul în 28 de regiuni, subdivizate în raioane, orașe și comune. Acest sistem mima organizarea Uniunii Sovietice și urmărea o centralizare accentuată a planificării economice.' },
      { type:'p', text:'Numărul și denumirile regiunilor au variat în timp, prin reorganizări succesive (1952, 1956, 1960), reducându-se treptat. La un moment dat au existat regiuni cu profil etnic, precum Regiunea Autonomă Maghiară, creată în 1952 în zona secuiască, ulterior redenumită și reorganizată. Aceasta a fost o caracteristică distinctă a perioadei, inspirată de modelul sovietic al autonomiilor teritoriale.' },
      { type:'p', text:'Sistemul regional-raional a fost perceput ca artificial și rupt de tradiția administrativă românească, fiind asociat cu dependența de modelul sovietic. Acesta este unul dintre motivele pentru care, în 1968, regimul Ceaușescu a decis revenirea la organizarea pe județe, într-un gest cu puternică încărcătură simbolică de autonomie față de Moscova.' },
      { type:'table', headers:['An reorganizare','Număr regiuni'], rows:[
        ['1950','28'],
        ['1952','reorganizare (incl. Reg. Autonomă Maghiară)'],
        ['1956','reducere număr regiuni'],
        ['1960','16'],
        ['1968','desființare — revenire la județe']
      ]}
    ]
  },

  {
    title: 'Revenirea la județe — Legea nr. 2/1968',
    blocks: [
      { type:'p', text:'În anul 1968, prin Legea nr. 2/1968 privind organizarea administrativă a teritoriului Republicii Socialiste România, s-a renunțat la sistemul regiunilor și raioanelor de inspirație sovietică și s-a revenit la tradiția organizării pe județe. Această lege a stabilit structura pe trei niveluri — județ, oraș (municipiu) și comună — care, în linii mari, este în vigoare și astăzi.' },
      { type:'p', text:'Legea din 1968 a creat inițial 39 de județe, număr majorat ulterior la 40, apoi la 41, prin modificări succesive (inclusiv reînființarea unor județe precum Călărași și Giurgiu în 1981, prin desprinderea de Ilfov). Municipiul București a primit un statut aparte, echivalent ca rang cu județul. Această organizare a supraviețuit căderii regimului comunist din 1989, fiind preluată de statul democratic.' },
      { type:'p', text:'Importanța Legii nr. 2/1968 este considerabilă: ea reprezintă fundamentul actualei hărți administrative a României. Continuitatea acestui sistem timp de peste cinci decenii explică de ce județul are o legitimitate socială și o identitate puternică, ceea ce face dificilă orice încercare de reorganizare prin comasarea sau desființarea județelor.' },
      { type:'table', headers:['Element Legea 2/1968','Valoare'], rows:[
        ['Număr județe inițial (1968)','39'],
        ['Număr județe după 1981','41'],
        ['București','rang echivalent județ'],
        ['Niveluri administrative','Județ / Oraș / Comună']
      ]}
    ]
  },

  {
    title: 'Crearea regiunilor de dezvoltare în 1998',
    blocks: [
      { type:'p', text:'Regiunile de dezvoltare în forma actuală au fost create prin Legea nr. 151/1998 privind dezvoltarea regională în România, în contextul pregătirii aderării la Uniunea Europeană. Cerința de a dispune de unități teritoriale de nivel NUTS-2 pentru gestionarea fondurilor de preaderare (PHARE, ISPA, SAPARD) a impus crearea unor structuri regionale, fără a modifica însă organizarea administrativ-teritorială constituțională.' },
      { type:'p', text:'Soluția adoptată în 1998 a fost ingenioasă din punct de vedere juridic: regiunile au fost definite ca asocieri voluntare ale județelor, fără personalitate juridică și fără statut de UAT, pentru a nu necesita modificarea Constituției. Astfel, România a obținut cadrul NUTS-2 cerut de Bruxelles, păstrând intactă arhitectura administrativă pe județe moștenită din 1968.' },
      { type:'p', text:'Delimitarea celor opt regiuni a fost rezultatul unei negocieri între județe și al unor studii de profil economic și geografic. Configurația a urmărit echilibrarea demografică și gruparea județelor cu legături tradiționale. Cu toate acestea, unele alegeri — precum separarea București-Ilfov de Sud-Muntenia, lăsând un „gol" în mijlocul regiunii Sud — au fost ulterior criticate.' },
      { type:'bullets', items:[
        'Cadru: Legea nr. 151/1998, înlocuită de Legea nr. 315/2004.',
        'Scop: îndeplinirea cerinței NUTS-2 pentru fondurile UE.',
        'Soluție: regiuni fără personalitate juridică, asocieri de județe.',
        'A evitat modificarea Constituției.',
        'Configurație criticată: București-Ilfov separat de Sud-Muntenia.'
      ]},
      { type:'table', headers:['Etapă cadru legal regiuni','Act normativ'], rows:[
        ['Crearea regiunilor de dezvoltare','Legea 151/1998'],
        ['Actualizare cadru regional','Legea 315/2004'],
        ['Număr regiuni rezultate','8']
      ]}
    ]
  },

  {
    title: 'Principiul autonomiei locale și Constituția',
    blocks: [
      { type:'p', text:'Principiul autonomiei locale este unul dintre pilonii organizării administrative a României. Constituția, în art. 120 alin. (1), prevede că „administrația publică din unitățile administrativ-teritoriale se întemeiază pe principiile descentralizării, autonomiei locale și deconcentrării serviciilor publice". Acest principiu garantează colectivităților locale dreptul de a-și gestiona o parte importantă a treburilor publice.' },
      { type:'p', text:'Autonomia locală are două dimensiuni: administrativă — dreptul autorităților alese de a decide asupra problemelor de interes local; și financiară — dreptul de a dispune de resurse proprii. Codul administrativ (OUG 57/2019) detaliază acest principiu, stabilind competențele exclusive, partajate și delegate ale autorităților locale. Autonomia nu înseamnă însă independență — UAT-urile rămân parte a statului unitar.' },
      { type:'p', text:'Constituția, în art. 1 alin. (1), definește România ca „stat național, suveran și independent, unitar și indivizibil". Caracterul unitar al statului este o limită constituțională importantă pentru orice proiect de regionalizare cu transfer de competențe legislative, deoarece exclude federalizarea. Orice regiune cu atribuții de tip federal ar necesita revizuirea Constituției.' },
      { type:'bullets', items:[
        'Art. 1: stat unitar și indivizibil — limită pentru federalizare.',
        'Art. 120: descentralizare, autonomie locală, deconcentrare.',
        'Autonomie locală: dimensiune administrativă și financiară.',
        'Autonomie NU înseamnă independență față de stat.',
        'Detaliată prin Codul administrativ (OUG 57/2019).'
      ]},
      { type:'table', headers:['Articol Constituție','Principiu consacrat'], rows:[
        ['Art. 1','Stat național, unitar și indivizibil'],
        ['Art. 11','Tratatele ratificate fac parte din dreptul intern'],
        ['Art. 120','Descentralizare, autonomie locală, deconcentrare']
      ]}
    ]
  },

  {
    title: 'Carta Europeană a Autonomiei Locale (Legea nr. 199/1997)',
    blocks: [
      { type:'p', text:'România a ratificat Carta Europeană a Autonomiei Locale prin Legea nr. 199/1997. Carta, adoptată de Consiliul Europei la Strasbourg în 1985, stabilește principii comune privind drepturile colectivităților locale. Articolul 3 definește autonomia locală drept „dreptul și capacitatea efectivă ale autorităților administrației publice locale de a soluționa și de a gestiona, în cadrul legii, în nume propriu și în interesul populației locale, o parte importantă a treburilor publice".' },
      { type:'p', text:'Carta consacră principii precum: autoritățile locale trebuie să dispună de resurse financiare proprii suficiente; competențele lor trebuie să fie depline și exclusive; principiul subsidiarității — exercitarea responsabilităților publice trebuie să revină, de preferință, autorităților celor mai apropiate de cetățeni; și dreptul la consultare pentru deciziile care le privesc.' },
      { type:'p', text:'Prin ratificare, principiile Cartei au valoare juridică în România, conform art. 11 din Constituție, potrivit căruia tratatele ratificate fac parte din dreptul intern. Carta constituie astfel un reper pentru evaluarea oricărei reforme administrative, inclusiv a regionalizării, care trebuie să respecte standardul european al autonomiei și subsidiarității.' },
      { type:'table', headers:['Principiu al Cartei','Conținut'], rows:[
        ['Subsidiaritate','Competențe la nivelul cel mai apropiat de cetățean'],
        ['Resurse proprii','Finanțare suficientă și proporțională'],
        ['Competențe depline','Exclusive și necontestate'],
        ['Dreptul la consultare','În deciziile care privesc colectivitatea']
      ]}
    ]
  },

  {
    title: 'Repartizarea competențelor: local, județean, central',
    blocks: [
      { type:'p', text:'Codul administrativ (OUG 57/2019) clasifică competențele autorităților administrației publice în trei categorii: exclusive, partajate și delegate. Competențele exclusive sunt cele atribuite prin lege unei singure autorități, pentru a căror realizare aceasta dispune de autonomie deplină. Competențele partajate se exercită împreună de mai multe niveluri, iar cele delegate sunt transferate de la nivel central către cel local.' },
      { type:'p', text:'La nivel local (comună, oraș, municipiu), competențele vizează în special serviciile de proximitate: alimentarea cu apă și canalizarea, salubrizarea, iluminatul public, transportul local, urbanismul, gestionarea domeniului public local, asistența socială de bază și învățământul preuniversitar (infrastructura). Nivelul județean coordonează serviciile de interes supralocal — drumuri județene, spitale județene, cultură, evidența persoanelor.' },
      { type:'p', text:'Nivelul central păstrează competențele de suveranitate — apărare, ordine publică, politică externă, justiție, politică monetară — precum și stabilirea cadrului legislativ și normativ. Repartizarea efectivă a competențelor în România este însă criticată pentru lipsa de claritate și pentru desele suprapuneri, care generează ineficiență în furnizarea serviciilor publice.' },
      { type:'table', headers:['Nivel','Exemple de competențe','Număr UAT-uri'], rows:[
        ['Local (localități)','apă, canalizare, urbanism, salubrizare','3181 minus județe'],
        ['Județean','drumuri județene, spitale, cultură','41 + București'],
        ['Central','apărare, justiție, politică externă','1 stat']
      ]}
    ]
  },

  {
    title: 'Deconcentrarea — serviciile deconcentrate ale ministerelor',
    blocks: [
      { type:'p', text:'Deconcentrarea este un principiu distinct de descentralizare, prevăzut în art. 120 din Constituție. Ea presupune transferul unor atribuții de la nivelul central către structuri teritoriale ale administrației centrale — serviciile publice deconcentrate ale ministerelor, organizate de regulă la nivel județean. Spre deosebire de descentralizare, deconcentrarea nu transferă competențe către autorități alese local, ci către reprezentanțe ale statului în teritoriu.' },
      { type:'p', text:'Exemple de servicii deconcentrate sunt: direcțiile de sănătate publică (DSP), inspectoratele școlare județene (ISJ), agențiile de plăți (APIA), direcțiile de statistică, garda de mediu sau administrațiile financiare județene. Acestea rămân subordonate ierarhic ministerelor de resort, dar își desfășoară activitatea la nivel județean, în coordonarea prefectului.' },
      { type:'p', text:'Numărul mare al serviciilor deconcentrate la nivel județean reflectă gradul ridicat de centralizare al statului român. În dezbaterile privind regionalizarea, una dintre propuneri este reorganizarea acestor servicii la nivel regional, pentru economii de scară, însă o astfel de măsură ar putea îndepărta serviciile de cetățeni, intrând în tensiune cu principiul subsidiarității.' },
      { type:'bullets', items:[
        'Deconcentrare = transfer către structuri ale statului în teritoriu.',
        'NU implică autorități alese local (diferența față de descentralizare).',
        'Exemple: DSP, ISJ, APIA, administrații financiare, garda de mediu.',
        'Coordonate teritorial de prefect.',
        'Organizate predominant la nivel județean.'
      ]},
      { type:'table', headers:['Serviciu deconcentrat','Minister coordonator'], rows:[
        ['Direcția de Sănătate Publică (DSP)','Sănătate'],
        ['Inspectoratul Școlar Județean (ISJ)','Educație'],
        ['Administrația Județeană a Finanțelor','Finanțe'],
        ['Garda de Mediu','Mediu']
      ]}
    ]
  },

  {
    title: 'Prefectul și controlul de legalitate',
    blocks: [
      { type:'p', text:'Prefectul este, conform art. 123 din Constituție, reprezentantul Guvernului pe plan local, numit în fiecare județ și în municipiul București. Prefectul conduce serviciile publice deconcentrate ale ministerelor și ale celorlalte organe ale administrației publice centrale din unitățile administrativ-teritoriale. Funcția de prefect este una de carieră, statutul fiind reglementat prin Codul administrativ.' },
      { type:'p', text:'Atribuția esențială a prefectului este controlul de legalitate (tutela administrativă) asupra actelor autorităților locale. Potrivit art. 123 alin. (5) din Constituție, „prefectul poate ataca, în fața instanței de contencios administrativ, un act al consiliului județean, al celui local sau al primarului, în cazul în care consideră actul ilegal". Actul atacat este suspendat de drept până la soluționare.' },
      { type:'p', text:'Constituția precizează expres că „între prefecți, pe de o parte, consiliile locale și primari, precum și consiliile județene și președinții acestora, pe de altă parte, nu există raporturi de subordonare". Prefectul exercită doar un control de legalitate, nu de oportunitate, ceea ce protejează autonomia locală. Acest mecanism asigură respectarea legii fără a anula independența decizională a autorităților alese.' },
      { type:'table', headers:['Atribut al prefectului','Caracteristică'], rows:[
        ['Statut','Reprezentant al Guvernului în teritoriu'],
        ['Raport cu autoritățile locale','FĂRĂ subordonare'],
        ['Tip de control','Legalitate, NU oportunitate'],
        ['Număr prefecți','42 (41 județe + București)']
      ]}
    ]
  },

  {
    title: 'Încercarea de regionalizare din 2011',
    blocks: [
      { type:'p', text:'În anul 2011, în contextul crizei economice și al presiunilor pentru reducerea cheltuielilor administrative, Guvernul a propus o reorganizare teritorială care viza comasarea județelor în regiuni cu personalitate juridică. Propunerea discuta crearea unui număr mai mic de regiuni administrative care să preia o parte din competențele județelor, în scopul reducerii aparatului birocratic și al creșterii eficienței.' },
      { type:'p', text:'Proiectul a stârnit însă o opoziție puternică, atât la nivel politic, cât și din partea autorităților județene, care își vedeau amenințată existența. Lipsa unui consens politic larg și a unei dezbateri publice consistente, precum și reticența față de comasarea județelor cu identitate istorică puternică, au făcut ca inițiativa din 2011 să fie abandonată fără a se concretiza într-un act normativ.' },
      { type:'p', text:'Eșecul din 2011 a evidențiat o temă recurentă: orice regionalizare cu transfer real de competențe către regiuni necesită modificarea Constituției, care nu prevede regiunea ca nivel administrativ. Modificarea Constituției necesită o majoritate calificată în Parlament și validare prin referendum, condiții dificil de întrunit în absența unui consens național.' },
      { type:'bullets', items:[
        'Context 2011: criză economică, presiune pe reducerea cheltuielilor.',
        'Propunere: comasarea județelor în regiuni cu personalitate juridică.',
        'Opoziție: autorități județene, lipsă consens politic.',
        'Rezultat: abandonată fără act normativ.',
        'Lecție: necesită modificarea Constituției.'
      ]},
      { type:'table', headers:['Obstacol al regionalizării 2011','Tip'], rows:[
        ['Necesitatea revizuirii Constituției','Juridic'],
        ['Opoziția autorităților județene','Politic'],
        ['Identitatea istorică a județelor','Social'],
        ['Pragul de majoritate calificată + referendum','Procedural']
      ]}
    ]
  },

  {
    title: 'Încercarea de regionalizare din 2013',
    blocks: [
      { type:'p', text:'În anul 2013, regionalizarea a revenit pe agenda politică drept o prioritate guvernamentală. Au fost vehiculate scenarii care propuneau transformarea celor opt regiuni de dezvoltare în regiuni administrative cu personalitate juridică, conduse de consilii regionale alese și președinți de regiune, prelevând competențe de la județe. Inițiativa a fost însoțită de un proiect de revizuire a Constituției.' },
      { type:'p', text:'Dezbaterea din 2013 a fost intensă, abordând probleme precum capitala fiecărei regiuni, repartizarea resurselor, soarta județelor (menținere sau desființare) și echilibrul de putere între regiuni și centru. Comisia parlamentară pentru revizuirea Constituției a inclus la un moment dat dispoziții privind regiunile, însă procesul de revizuire constituțională a fost suspendat.' },
      { type:'p', text:'Și inițiativa din 2013 a eșuat, din cauza lipsei unui acord politic durabil, a complexității revizuirii constituționale și a temerilor privind dezechilibre teritoriale și politice. De atunci, regionalizarea administrativă a rămas un proiect nerealizat, regiunile de dezvoltare păstrându-și statutul de structuri fără personalitate juridică, în timp ce competențele ADR-urilor au fost întărite gradual pe cale legislativă ordinară.' },
      { type:'table', headers:['Tentativă regionalizare','An','Rezultat'], rows:[
        ['Comasare județe în regiuni','2011','Eșuată'],
        ['Regiuni administrative + revizuire Constituție','2013','Eșuată'],
        ['Întărire ADR ca Autoritate de Management','2021','Realizată (cale ordinară)']
      ]}
    ]
  },

  {
    title: 'De ce opt regiuni — rațiunea NUTS și echilibrul demografic',
    blocks: [
      { type:'p', text:'Alegerea numărului de opt regiuni a fost determinată în primul rând de cerințele NUTS-2 din Regulamentul (CE) nr. 1059/2003, care impune un prag demografic între 800.000 și 3 milioane de locuitori pentru fiecare unitate. Cu o populație de circa 19-22 milioane în perioada relevantă, România a fost împărțită astfel încât fiecare regiune să se încadreze, în linii mari, în aceste limite.' },
      { type:'p', text:'Dacă s-ar fi creat mai puține regiuni — de exemplu patru sau cinci — unele ar fi depășit plafonul de 3 milioane de locuitori, depășind nivelul NUTS-2 și apropiindu-se de NUTS-1. Dacă s-ar fi creat mai multe, unele ar fi coborât sub pragul minim, riscând să nu fie eligibile ca regiuni de coeziune. Opt regiuni a fost soluția care echilibra cerințele statistice cu logica grupării județelor.' },
      { type:'p', text:'Pe lângă criteriul demografic, delimitarea a ținut cont de coerența economică, de legăturile tradiționale și de provinciile istorice. Totuși, rezultatul este o configurație cu dezechilibre semnificative: regiunea București-Ilfov are o populație și un PIB mult mai mari per cap de locuitor decât celelalte, ceea ce distorsionează comparațiile și alocările la nivel NUTS-2.' },
      { type:'chart', chartType:'bar', labels:['Prag min NUTS-2 (mii)','Prag max NUTS-2 (mii)','Nr. regiuni RO'], data:[800,3000,8] }
    ]
  },

  {
    title: 'Zonele metropolitane și asociațiile de dezvoltare intercomunitară',
    blocks: [
      { type:'p', text:'Pentru a depăși fragmentarea administrativă, legislația română permite cooperarea voluntară între UAT-uri prin Asociații de Dezvoltare Intercomunitară (ADI), reglementate de Codul administrativ. ADI-urile sunt structuri de cooperare cu personalitate juridică, înființate de două sau mai multe UAT-uri pentru realizarea în comun a unor proiecte de dezvoltare sau pentru furnizarea de servicii publice.' },
      { type:'p', text:'O formă specifică de ADI este zona metropolitană, constituită prin asocierea unui municipiu de rang superior — de regulă reședință de județ — cu localitățile învecinate, pentru gestionarea integrată a transportului, urbanismului, utilităților și dezvoltării economice. Exemple notabile sunt zonele metropolitane Cluj-Napoca, Iași, Brașov, Constanța, Timișoara și Oradea.' },
      { type:'p', text:'Zonele metropolitane răspund realității economice și funcționale a aglomerărilor urbane, care depășesc limitele administrative ale municipiului-centru. Ele permit o planificare coerentă a teritoriului periurban și accesul la finanțări dedicate dezvoltării urbane integrate. ADI-urile nu înlocuiesc UAT-urile membre, ci asigură un cadru de cooperare pentru competențe specifice.' },
      { type:'bullets', items:[
        'ADI — asociații de dezvoltare intercomunitară, cu personalitate juridică.',
        'Zona metropolitană — ADI în jurul unui mare municipiu.',
        'Scop: transport, utilități, urbanism, dezvoltare economică integrată.',
        'Exemple: Cluj-Napoca, Iași, Brașov, Constanța, Timișoara.',
        'Nu înlocuiesc UAT-urile membre — cadru de cooperare.'
      ]},
      { type:'table', headers:['Formă de cooperare','Personalitate juridică'], rows:[
        ['Asociație de Dezvoltare Intercomunitară (ADI)','DA'],
        ['Zonă metropolitană (ADI specifică)','DA'],
        ['Regiune de dezvoltare','NU']
      ]}
    ]
  },

  {
    title: 'Raportul cu Uniunea Europeană — politica de coeziune',
    blocks: [
      { type:'p', text:'Apartenența României la Uniunea Europeană, din 2007, condiționează în mod decisiv organizarea regională prin politica de coeziune. Această politică urmărește reducerea disparităților de dezvoltare între regiunile europene și se implementează prin fonduri structurale și de investiții alocate în funcție de nivelul de dezvoltare al regiunilor NUTS-2, măsurat prin PIB pe cap de locuitor raportat la media UE.' },
      { type:'p', text:'Regiunile cu un PIB pe cap de locuitor sub 75% din media UE sunt clasificate drept „regiuni mai puțin dezvoltate" și beneficiază de cea mai ridicată intensitate a sprijinului. În România, șapte din cele opt regiuni se încadrează în această categorie, singura excepție fiind București-Ilfov, care a depășit pragul de 75% și chiar 100% din media UE, fiind clasificată drept regiune „mai dezvoltată".' },
      { type:'p', text:'Această clasificare determină alocarea fondurilor europene către regiunile românești și justifică importanța nivelului NUTS-2. Faptul că București-Ilfov primește un sprijin mai redus reflectă logica de convergență a politicii de coeziune. Configurația regională influențează astfel direct volumul și distribuția investițiilor europene pe teritoriul național.' },
      { type:'table', headers:['Categorie regiune (coeziune)','Criteriu PIB/loc vs UE','Număr regiuni RO'], rows:[
        ['Mai puțin dezvoltate','sub 75%',7],
        ['Mai dezvoltate','peste 100%',1]
      ]}
    ]
  },

  {
    title: 'Acordul de Parteneriat 2021-2027 și Programele Regionale',
    blocks: [
      { type:'p', text:'Cadrul actual al politicii de coeziune în România este stabilit prin Acordul de Parteneriat 2021-2027, document strategic negociat între statul român și Comisia Europeană, care fixează prioritățile de investiții și alocările financiare din fondurile europene. Acordul stabilește arhitectura programelor operaționale prin care se cheltuiesc fondurile, inclusiv cele opt Programe Regionale dedicate.' },
      { type:'p', text:'Noutatea majoră a perioadei 2021-2027 este descentralizarea gestionării fondurilor regionale: cele opt Programe Regionale (PR) sunt gestionate de Agențiile pentru Dezvoltare Regională (ADR), care au devenit Autorități de Management. Aceasta reprezintă cel mai important pas către o regionalizare funcțională realizat fără modificarea Constituției, întărind capacitatea instituțională a structurilor regionale existente.' },
      { type:'p', text:'Programele Regionale finanțează investiții în competitivitate economică, digitalizare, eficiență energetică, mobilitate urbană durabilă, infrastructură educațională și de sănătate, dezvoltare urbană și turism. Faptul că prioritățile sunt definite și gestionate la nivel regional, prin ADR-uri, apropie decizia de teritoriu și reflectă principiul subsidiarității în implementarea fondurilor europene.' },
      { type:'bullets', items:[
        'Acordul de Parteneriat 2021-2027 — cadru strategic RO-Comisia Europeană.',
        '8 Programe Regionale (PR), câte unul pe regiune de dezvoltare.',
        'ADR-urile = Autorități de Management (noutate 2021-2027).',
        'Pas major spre regionalizare funcțională fără revizuire constituțională.',
        'Finanțează: competitivitate, mobilitate, energie, sănătate, educație.'
      ]},
      { type:'table', headers:['Element 2021-2027','Valoare'], rows:[
        ['Număr Programe Regionale','8'],
        ['Rol nou al ADR','Autoritate de Management'],
        ['Cadru strategic','Acordul de Parteneriat 2021-2027']
      ]}
    ]
  }

];
