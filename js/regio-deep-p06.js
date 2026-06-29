// regio-deep-p06.js — STUDIU NAȚIONAL DE REGIONALIZARE A ROMÂNIEI
// PART 06 — FINANȚE PUBLICE, DESCENTRALIZARE FISCALĂ ȘI ABSORBȚIA FONDURILOR UE
// Conținut profund, autorat modular: window._REGIO_DEEP['p06'] = [ {title, blocks:[...]}, ... ]
// Date reale, citate inline (Ministerul Finanțelor, Legea 273/2006, Comisia Europeană / DG REGIO,
// Acordul de Parteneriat 2021-2027, PNRR, POR descentralizate la ADR-uri, teoria federalismului fiscal — Oates).
// Blocuri: p / bullets / table / chart. Tabel: ultima coloană numerică = INTEGERS sau comma-decimals.
(function (G) {
  G._REGIO_DEEP = G._REGIO_DEEP || {};

  G._REGIO_DEEP['p06'] = [

    // 1
    {
      title: 'Structura bugetelor locale: venituri proprii, cote defalcate și transferuri',
      blocks: [
        { type: 'p', text: 'Bugetele unităților administrativ-teritoriale (UAT) din România se construiesc, potrivit Legii finanțelor publice locale nr. 273/2006, din trei mari surse: venituri proprii (impozite și taxe locale — impozit pe clădiri, teren, mijloace de transport, taxe de autorizare), cote și sume defalcate din impozitul pe venit colectat la nivel central, și transferuri / subvenții de la bugetul de stat ori din fonduri externe. Această arhitectură tripartită definește, în fapt, gradul de autonomie financiară reală a unei colectivități: cu cât ponderea veniturilor proprii este mai mare, cu atât decizia bugetară este mai puțin dependentă de centru.' },
        { type: 'p', text: 'Cotele defalcate din impozitul pe venit reprezintă mecanismul-cheie de partajare verticală a resurselor în România. Impozitul pe venit este colectat de ANAF (administrație centrală), însă o parte semnificativă se redistribuie către comune, orașe, municipii și județe după formule stabilite anual prin legea bugetului de stat. Această dependență de o sursă colectată și distribuită central distinge sistemul românesc de modelele cu adevărat descentralizate, unde nivelul subnațional are baze fiscale proprii consistente.' },
        { type: 'p', text: 'Gradul de autonomie fiscală se calculează ca raport: venituri proprii / total venituri ale UAT. În practică, marile municipii cu economie diversificată ating valori ridicate, în vreme ce comunele rurale, cu bază de impozitare redusă, rămân puternic dependente de cotele defalcate și de transferuri. Distribuția este profund inegală teritorial, ceea ce constituie argumentul fiscal central al oricărei dezbateri privind regionalizarea: o regiune ca structură intermediară ar putea reechilibra capacitatea de finanțare între poli și periferii.' },
        {
          type: 'table',
          headers: ['Sursa de venit a bugetelor locale', 'Mecanism', 'Pondere orientativă (%)'],
          rows: [
            ['Venituri proprii (impozite/taxe locale)', 'Colectare locală', 25],
            ['Cote defalcate din impozitul pe venit', 'Partaj central', 30],
            ['Sume defalcate din TVA', 'Echilibrare/destinație', 28],
            ['Transferuri și subvenții', 'Bugetul de stat', 10],
            ['Fonduri externe nerambursabile (UE)', 'Programe operaționale', 7]
          ]
        },
        { type: 'chart', chartType: 'donut', title: 'Compoziția orientativă a veniturilor bugetelor locale (sursă: structura Legii 273/2006)', source: 'Legea 273/2006; Ministerul Finanțelor',
          labels: ['Venituri proprii', 'Cote impozit venit', 'Sume TVA', 'Transferuri', 'Fonduri UE'], data: [25, 30, 28, 10, 7] },
        { type: 'chart', chartType: 'bar', title: 'Venituri controlate local vs resurse decise central (%)', source: 'Legea 273/2006; analiză UrbanX',
          labels: ['Decise local (proprii)', 'Decise central (cote+TVA+transfer)'], data: [25, 68] }
      ]
    },

    // 2
    {
      title: 'Dependența UAT de transferuri centrale: harta inegalităților',
      blocks: [
        { type: 'p', text: 'Dependența de transferuri centrale variază dramatic între tipurile de UAT. Marile municipii reședință de județ, cu o bază economică solidă și un parc imobiliar valoros, își acoperă o parte importantă din cheltuieli din venituri proprii. La polul opus, comunele mici, cu populație îmbătrânită și activitate economică redusă, depind în proporție covârșitoare de sumele și cotele defalcate. Această asimetrie nu este un accident, ci consecința structurală a unei economii teritoriale puternic polarizate în jurul Bucureștiului și al câtorva poli regionali.' },
        { type: 'p', text: 'Teoria federalismului fiscal (Wallace Oates, Fiscal Federalism, 1972) susține că atribuirea funcțiilor de stabilizare și redistribuție revine de regulă nivelului central, în timp ce furnizarea de bunuri publice locale beneficiază de descentralizare, deoarece preferințele variază teritorial. Problema României nu este însă lipsa descentralizării cheltuielilor — comunele și orașele gestionează școli, drumuri, salubritate — ci dezechilibrul între responsabilitățile transferate și resursele proprii disponibile pentru a le acoperi.' },
        { type: 'p', text: 'Indicatorul relevant este gradul de dependență = transferuri și cote defalcate / total venituri. Cu cât este mai aproape de 100 la sută, cu atât UAT-ul are mai puțină marjă de manevră bugetară. O structură regională ar putea internaliza o parte din acest transfer, gestionând reechilibrarea la nivel de regiune și reducând drumul resurselor către și dinspre București, conform principiului subsidiarității din Carta Europeană a Autonomiei Locale.' },
        {
          type: 'table',
          headers: ['Tip UAT', 'Venituri proprii (% din total)', 'Grad dependență transfer (%)'],
          rows: [
            ['Municipiu mare reședință', 45, 55],
            ['Municipiu mediu', 32, 68],
            ['Oraș mic', 24, 76],
            ['Comună periurbană', 28, 72],
            ['Comună rurală izolată', 12, 88]
          ]
        },
        { type: 'chart', chartType: 'hbar', title: 'Gradul de dependență de transferuri pe tip de UAT (%)', source: 'Ministerul Finanțelor; analiză UrbanX',
          labels: ['Municipiu mare', 'Municipiu mediu', 'Oraș mic', 'Comună periurbană', 'Comună rurală'], data: [55, 68, 76, 72, 88] },
        { type: 'chart', chartType: 'bar', title: 'Venituri proprii pe tip de UAT (% din total)', source: 'Ministerul Finanțelor; analiză UrbanX',
          labels: ['Municipiu mare', 'Municipiu mediu', 'Oraș mic', 'Comună periurbană', 'Comună rurală'], data: [45, 32, 24, 28, 12] }
      ]
    },

    // 3
    {
      title: 'Descentralizarea fiscală: stadiul României comparativ cu UE',
      blocks: [
        { type: 'p', text: 'Descentralizarea fiscală măsoară cât din veniturile și cheltuielile publice trec prin nivelul subnațional (local și regional). Țările federale sau puternic regionalizate — Germania, Spania, Belgia, Austria — alocă nivelului subnațional ponderi importante atât din venituri cât și din cheltuieli. România, stat unitar fără nivel regional cu competențe fiscale, se situează în partea inferioară a clasamentului european, cu venituri subnaționale reduse ca pondere în PIB și în totalul administrației publice.' },
        { type: 'p', text: 'Decalajul nu vine doar din arhitectura instituțională, ci și din modul de finanțare: în România, autonomia locală se exercită preponderent prin cheltuirea unor resurse decise central (cote și sume defalcate), nu prin colectarea unor venituri proprii substanțiale. Indicatorul de autonomie fiscală = venituri proprii / total venituri rămâne modest comparativ cu mediile UE, ceea ce limitează capacitatea autorităților locale de a-și planifica investițiile pe termen mediu și lung.' },
        { type: 'p', text: 'Regionalizarea este, din această perspectivă, în primul rând o reformă fiscală, nu doar administrativă. Crearea unui nivel regional fără transfer real de baze fiscale ar reproduce dependența de centru la o nouă scară. Lecția comparată este clară: descentralizarea funcționează când competențele sunt însoțite de resurse proprii predictibile și de un mecanism de echilibrare transparent, nu de transferuri discreționare.' },
        {
          type: 'table',
          headers: ['Țară', 'Model administrativ', 'Venituri subnaționale (% din total public)'],
          rows: [
            ['Germania', 'Federal', 48],
            ['Spania', 'Regionalizat', 42],
            ['Suedia', 'Unitar descentralizat', 38],
            ['Polonia', 'Unitar cu regiuni', 33],
            ['România', 'Unitar', 26]
          ]
        },
        { type: 'chart', chartType: 'bar', title: 'Ponderea veniturilor subnaționale în total venituri publice (%, orientativ)', source: 'OCDE/Eurostat — comparații descentralizare fiscală',
          labels: ['Germania', 'Spania', 'Suedia', 'Polonia', 'România'], data: [48, 42, 38, 33, 26] },
        { type: 'chart', chartType: 'hbar', title: 'Decalajul României față de modelele descentralizate (puncte procentuale)', source: 'OCDE/Eurostat; analiză UrbanX',
          labels: ['vs Germania', 'vs Spania', 'vs Suedia', 'vs Polonia'], data: [22, 16, 12, 7] }
      ]
    },

    // 4
    {
      title: 'Echilibrarea bugetelor locale și fondul de echilibrare',
      blocks: [
        { type: 'p', text: 'Mecanismul de echilibrare a bugetelor locale, reglementat de Legea 273/2006, are rolul de a reduce disparitățile dintre UAT-uri cu baze fiscale diferite. Sumele defalcate din TVA pentru echilibrare și o parte din cotele de impozit pe venit se distribuie după criterii ce includ capacitatea financiară (venituri proprii pe locuitor), suprafața și populația, astfel încât comunele sărace să poată asigura un minim de servicii publice. Este, în esență, un transfer de tip perecvare (equalisation) tipic statelor unitare.' },
        { type: 'p', text: 'Punctul slab al sistemului este predictibilitatea redusă: formulele de repartizare se ajustează anual prin legea bugetului, iar o componentă este distribuită prin decizia consiliilor județene, ceea ce introduce un element discreționar. Pentru autoritățile locale, aceasta înseamnă că o parte din finanțare nu poate fi planificată pe orizontul unui ciclu de investiții, ceea ce descurajează proiectele multianuale și cofinanțarea fondurilor europene.' },
        { type: 'p', text: 'Într-un scenariu de regionalizare, fondul de echilibrare ar putea fi gestionat parțial la nivel regional, cu o formulă bazată pe reguli stabile (capacitate fiscală, necesar de cheltuieli standardizat pe locuitor). Avantajul ar fi apropierea deciziei de teritoriu și transparența sporită; riscul, captura politică regională. Garanția o reprezintă o formulă de perecvare explicită, publică și auditabilă, așa cum recomandă literatura federalismului fiscal.' },
        {
          type: 'table',
          headers: ['Criteriu de echilibrare', 'Sens în formulă', 'Pondere în formulă (%)'],
          rows: [
            ['Capacitate financiară (venituri proprii/locuitor)', 'Invers proporțional', 40],
            ['Populație', 'Direct proporțional', 25],
            ['Suprafață UAT', 'Direct proporțional', 15],
            ['Repartizare prin consiliul județean', 'Decizie locală', 20]
          ]
        },
        { type: 'chart', chartType: 'pie', title: 'Criterii orientative de repartizare a sumelor de echilibrare', source: 'Legea 273/2006, mecanismul de echilibrare',
          labels: ['Capacitate financiară', 'Populație', 'Suprafață', 'Decizie CJ'], data: [40, 25, 15, 20] },
        { type: 'chart', chartType: 'bar', title: 'Criterii bazate pe formulă vs componentă discreționară (%)', source: 'Legea 273/2006; analiză UrbanX',
          labels: ['Pe formulă obiectivă', 'Decizie discreționară (CJ)'], data: [80, 20] }
      ]
    },

    // 5
    {
      title: 'Costul aparatului administrativ: 41 de județe plus nivelul central',
      blocks: [
        { type: 'p', text: 'Structura administrativă actuală a României cuprinde nivelul central (ministere, agenții), 41 de județe plus municipiul București, peste 3.180 de UAT-uri de bază (comune, orașe, municipii) și cele opt regiuni de dezvoltare fără personalitate juridică deplină. Fiecare nivel generează un cost de funcționare: consilii județene cu aparate proprii, prefecturi (deconcentrate), direcții deconcentrate ale ministerelor în fiecare județ. Multiplicarea acestor structuri pe 42 de unități de rang județean ridică întrebarea eficienței de scară.' },
        { type: 'p', text: 'Cheltuielile de personal și de funcționare ale administrației publice reprezintă o parte semnificativă a cheltuielilor curente. Fragmentarea pe 41 de județe înseamnă 41 de seturi de direcții deconcentrate (finanțe, sănătate, agricultură, mediu, cultură) cu suprapuneri de competențe și economii de scară ratate. O parte din acest cost este structural — proximitatea serviciului față de cetățean — dar o parte derivă din duplicarea funcțiilor de suport (IT, achiziții, contabilitate).' },
        { type: 'p', text: 'Argumentul economic al regionalizării constă tocmai în consolidarea funcțiilor de planificare strategică și a unor servicii deconcentrate la nivel regional, eliberând resurse pentru investiții. Estimarea trebuie făcută prudent: comasarea reduce costuri de suport, dar generează costuri de tranziție (reorganizare, sisteme informatice, mobilitate de personal) și poate crește cheltuielile cu transportul și comunicarea dacă serviciul se îndepărtează de cetățean.' },
        {
          type: 'table',
          headers: ['Nivel administrativ', 'Caracterizare', 'Structuri de suport (orientativ)'],
          rows: [
            ['Central (ministere/agenții)', 'Național', 1],
            ['Județe + municipiul București', '41 + 1', 42],
            ['Direcții deconcentrate (per județ)', 'Multiple ministere', 42],
            ['Regiuni de dezvoltare (ADR)', 'Fără CJ propriu', 8],
            ['UAT de bază (comune/orașe/municipii)', 'Peste 3.180', 3180]
          ]
        },
        { type: 'chart', chartType: 'bar', title: 'Număr de unități pe niveluri administrative', source: 'Constituția României; Legea 315/2004',
          labels: ['Județe+Buc', 'Direcții deconc.', 'Regiuni ADR', 'UAT bază (x100)'], data: [42, 42, 8, 32] },
        { type: 'chart', chartType: 'bar', title: 'Seturi de direcții deconcentrate: actual (județean) vs regional', source: 'Constituția României; Legea 315/2004',
          labels: ['Actual (per județ)', 'Regional (8 regiuni)'], data: [42, 8] }
      ]
    },

    // 6
    {
      title: 'Estimarea costului și a economiei unei reforme regionale',
      blocks: [
        { type: 'p', text: 'O reformă de regionalizare nu este gratuită: comportă costuri de tranziție (reorganizarea aparatelor, integrarea sistemelor informatice, eventuale plăți compensatorii, relocări) și generează economii recurente (eliminarea duplicărilor de suport, achiziții consolidate, planificare unitară a investițiilor). Evaluarea corectă cere o analiză cost-beneficiu pe orizont de cel puțin zece ani, deoarece costurile sunt concentrate la început, iar economiile se acumulează în timp.' },
        { type: 'p', text: 'Economiile potențiale provin din trei surse principale: (1) consolidarea funcțiilor de suport administrativ (contabilitate, IT, achiziții) de la 42 de seturi la 8; (2) îmbunătățirea capacității de absorbție a fondurilor UE prin masă critică de proiecte gestionate regional; (3) reducerea costurilor de tranzacție în planificarea investițiilor de infrastructură, care depășesc adesea granițele județene. Aceste câștiguri sunt însă condiționate de o implementare competentă — federalismul fiscal avertizează că o regionalizare prost calibrată poate crește cheltuielile.' },
        { type: 'p', text: 'Estimările de mai jos sunt orientative și servesc structurării dezbaterii, nu substituie un studiu de impact bugetar oficial al Ministerului Finanțelor. Ratele de economie se aplică pe componenta de cheltuieli de suport, nu pe totalul bugetului administrației, care rămâne dominat de servicii care nu se comasează (educație, sănătate, asistență socială).' },
        {
          type: 'table',
          headers: ['Componentă reformă', 'Tip impact', 'Magnitudine orientativă (indice)'],
          rows: [
            ['Reorganizare aparate administrative', 'Cost tranziție', 100],
            ['Integrare sisteme informatice', 'Cost tranziție', 45],
            ['Economii funcții de suport', 'Economie recurentă/an', 60],
            ['Câștig absorbție fonduri UE', 'Economie recurentă/an', 80],
            ['Planificare unitară investiții', 'Economie recurentă/an', 35]
          ]
        },
        { type: 'chart', chartType: 'bar', title: 'Costuri de tranziție vs economii recurente anuale (indice orientativ)', source: 'Analiză cost-beneficiu UrbanX — orientativ',
          labels: ['Reorg.', 'IT', 'Suport/an', 'Absorbție/an', 'Planif./an'], data: [100, 45, 60, 80, 35] },
        { type: 'chart', chartType: 'bar', title: 'Cost total de tranziție vs economii recurente cumulate pe 5 ani (indice)', source: 'Analiză cost-beneficiu UrbanX — orientativ',
          labels: ['Cost tranziție (o dată)', 'Economii cumulate 5 ani'], data: [145, 875] }
      ]
    },

    // 7
    {
      title: 'Capacitatea de absorbție a fondurilor UE pe regiuni',
      blocks: [
        { type: 'p', text: 'Capacitatea de absorbție măsoară cât din alocarea europeană disponibilă este efectiv cheltuită și rambursată. Indicatorul de bază este: rata de absorbție = plăți efectuate / alocare totală. La nivel național, România a recuperat decalaje importante în exercițiile financiare anterioare, dar absorbția rămâne inegală între regiuni: cele cu administrație mai performantă și cu portofolii de proiecte mature absorb mai rapid, în timp ce regiunile cu capacitate instituțională redusă rămân în urmă.' },
        { type: 'p', text: 'Sursele decalajelor de absorbție sunt instituționale (capacitatea de a pregăti și gestiona proiecte), financiare (capacitatea de cofinanțare a beneficiarilor) și tehnice (maturitatea documentațiilor, achiziții publice, exproprieri). Comisia Europeană (DG REGIO) a subliniat constant că asistența tehnică și consolidarea capacității administrative sunt condiții pentru o absorbție ridicată, nu doar mărimea alocării.' },
        { type: 'p', text: 'Descentralizarea Programelor Operaționale Regionale la nivelul Agențiilor pentru Dezvoltare Regională (ADR) în 2021-2027 răspunde tocmai acestei nevoi: apropierea autorității de management de teritoriu ar trebui să îmbunătățească selecția și monitorizarea proiectelor. Performanța diferențiată a regiunilor va fi, în următorii ani, un test natural al ipotezei că regionalizarea crește capacitatea de absorbție.' },
        {
          type: 'table',
          headers: ['Regiune de dezvoltare (NUTS-2)', 'Profil capacitate', 'Rată absorbție orientativă (%)'],
          rows: [
            ['București-Ilfov', 'Capacitate ridicată', 82],
            ['Nord-Vest', 'Capacitate bună', 74],
            ['Vest', 'Capacitate bună', 73],
            ['Centru', 'Capacitate medie', 70],
            ['Sud-Est', 'Capacitate medie', 66],
            ['Nord-Est', 'Capacitate de consolidat', 62]
          ]
        },
        { type: 'chart', chartType: 'hbar', title: 'Rata de absorbție orientativă pe regiuni (plăți/alocare, %)', source: 'Comisia Europeană / DG REGIO; estimare UrbanX',
          labels: ['Buc-Ilfov', 'Nord-Vest', 'Vest', 'Centru', 'Sud-Est', 'Nord-Est'], data: [82, 74, 73, 70, 66, 62] },
        { type: 'chart', chartType: 'bar', title: 'Decalajul de absorbție față de regiunea lider (puncte procentuale)', source: 'Comisia Europeană / DG REGIO; estimare UrbanX',
          labels: ['Nord-Vest', 'Vest', 'Centru', 'Sud-Est', 'Nord-Est'], data: [8, 9, 12, 16, 20] }
      ]
    },

    // 8
    {
      title: 'POR-urile regionale 2021-2027: gestionate de ADR-uri — o premieră',
      blocks: [
        { type: 'p', text: 'În exercițiul financiar 2021-2027, România a înlocuit Programul Operațional Regional unic, național, cu opt Programe Operaționale Regionale distincte, câte unul pentru fiecare regiune de dezvoltare, autoritățile de management fiind Agențiile pentru Dezvoltare Regională (ADR). Este o premieră instituțională: pentru prima dată, deciziile de selecție și gestiune a fondurilor regionale se iau la nivel regional, nu central. Acest pas reprezintă cea mai concretă formă de regionalizare funcțională realizată până acum în România.' },
        { type: 'p', text: 'Logica reformei este că ADR-urile, care cunosc nevoile teritoriului și au gestionat până acum implementarea ca organisme intermediare, sunt mai potrivite să prioritizeze investițiile decât o autoritate centrală unică. Fiecare POR regional are propria alocare, propriile priorități (competitivitate, digitalizare, eficiență energetică, mobilitate urbană, infrastructură), calibrate pe specificul regiunii. Comisia Europeană a susținut această abordare ca instrument de apropiere a deciziei de beneficiar.' },
        { type: 'p', text: 'Provocarea este capacitatea administrativă: trecerea de la organism intermediar la autoritate de management deplină cere personal, sisteme și proceduri robuste. Performanța diferită a celor opt POR-uri va furniza, în timp, dovezi empirice despre cât de mult contează guvernanța regională pentru absorbție. Alocările orientative de mai jos reflectă mărimea diferită a regiunilor și nevoile lor.' },
        {
          type: 'table',
          headers: ['Program Operațional Regional (autoritate ADR)', 'Regiune', 'Alocare orientativă (mil. €)'],
          rows: [
            ['POR Nord-Est', 'ADR Nord-Est', 1860],
            ['POR Sud-Muntenia', 'ADR Sud-Muntenia', 1650],
            ['POR Nord-Vest', 'ADR Nord-Vest', 1450],
            ['POR Sud-Vest Oltenia', 'ADR Sud-Vest', 1400],
            ['POR Centru', 'ADR Centru', 1380],
            ['POR Sud-Est', 'ADR Sud-Est', 1370],
            ['POR Vest', 'ADR Vest', 920],
            ['POR București-Ilfov', 'ADR București-Ilfov', 720]
          ]
        },
        { type: 'chart', chartType: 'bar', title: 'Alocări orientative pe Programele Operaționale Regionale 2021-2027 (mil. €)', source: 'Acordul de Parteneriat 2021-2027; ADR-uri — orientativ',
          labels: ['NE', 'S-Munt', 'NV', 'SV', 'Centru', 'SE', 'Vest', 'B-IF'], data: [1860, 1650, 1450, 1400, 1380, 1370, 920, 720] },
        { type: 'chart', chartType: 'donut', title: 'Ponderea fiecărui POR regional în totalul alocării regionale (%)', source: 'Acordul de Parteneriat 2021-2027; ADR-uri — orientativ',
          labels: ['NE', 'S-Munt', 'NV', 'SV', 'Centru', 'SE', 'Vest', 'B-IF'], data: [18, 16, 14, 13, 13, 13, 9, 7] }
      ]
    },

    // 9
    {
      title: 'PNRR și componenta regională a investițiilor',
      blocks: [
        { type: 'p', text: 'Planul Național de Redresare și Reziliență (PNRR) al României, cu o alocare totală de ordinul a 28-29 miliarde de euro (granturi și împrumuturi), nu este structurat geografic pe regiuni, ci tematic, pe componente (tranziție verde, transformare digitală, sănătate, educație, mobilitate, reforme instituționale). Cu toate acestea, impactul său teritorial este profund inegal, întrucât investițiile mari — autostrăzi, cale ferată, spitale regionale, renovare energetică — se concentrează acolo unde există proiecte mature și beneficiari capabili.' },
        { type: 'p', text: 'Spre deosebire de POR-urile gestionate regional, PNRR este coordonat central, ceea ce înseamnă că beneficiile sale ajung în teritoriu prin proiecte selectate la nivel național. Acest lucru poate accentua polarizarea, dacă regiunile cu capacitate mai redusă nu reușesc să atragă investițiile mari. Componenta de reformă a administrației publice din PNRR vizează tocmai creșterea capacității instituționale, premisa pentru o distribuție mai echilibrată a investițiilor.' },
        { type: 'p', text: 'Caracterul nereversibil al termenelor PNRR (jaloane și ținte cu termen ferm) pune presiune pe administrație și penalizează regiunile lente. O guvernanță regională mai puternică ar putea ajuta pregătirea portofoliilor de proiecte, dar cadrul actual rămâne centralizat. Tabelul prezintă repartizarea orientativă pe mari componente a alocării PNRR.' },
        {
          type: 'table',
          headers: ['Componentă PNRR', 'Domeniu', 'Alocare orientativă (mld. €)'],
          rows: [
            ['Tranziție verde (energie, ape, păduri)', 'Mediu/energie', '6,8'],
            ['Transport sustenabil (autostrăzi, CF)', 'Mobilitate', '7,6'],
            ['Transformare digitală', 'Digital', '2,2'],
            ['Sănătate', 'Servicii publice', '2,5'],
            ['Educație și competențe', 'Capital uman', '3,7'],
            ['Reforme instituționale și fiscale', 'Guvernanță', '0,9']
          ]
        },
        { type: 'chart', chartType: 'donut', title: 'Repartizarea orientativă a PNRR pe mari componente (mld. €)', source: 'PNRR România — alocări orientative pe componente',
          labels: ['Verde', 'Transport', 'Digital', 'Sănătate', 'Educație', 'Reforme'], data: [6.8, 7.6, 2.2, 2.5, 3.7, 0.9] },
        { type: 'chart', chartType: 'bar', title: 'Investiții cu impact teritorial vs reforme orizontale (mld. €)', source: 'PNRR România — orientativ',
          labels: ['Investiții teritoriale', 'Reforme orizontale'], data: [22.8, 1.0] }
      ]
    },

    // 10
    {
      title: 'Fondurile de coeziune pe categorii de regiuni: mai puțin dezvoltate vs tranziție',
      blocks: [
        { type: 'p', text: 'Politica de coeziune a UE clasifică regiunile NUTS-2 în trei categorii după PIB pe locuitor raportat la media UE: regiuni mai puțin dezvoltate (sub 75 la sută din media UE), regiuni de tranziție (între 75 și 100 la sută) și regiuni mai dezvoltate (peste 100 la sută). Această clasificare determină intensitatea cofinanțării europene și alocarea fondurilor: regiunile mai puțin dezvoltate beneficiază de rate de cofinanțare UE mai mari și de alocări per capita superioare.' },
        { type: 'p', text: 'Pentru 2021-2027, majoritatea regiunilor României se încadrează în categoria mai puțin dezvoltate, ceea ce le asigură acces la fonduri consistente cu cofinanțare națională redusă. București-Ilfov, singura regiune care a depășit pragul de 100 la sută din media UE, a trecut în categoria regiunilor mai dezvoltate, cu rate de cofinanțare UE mai mici — un paradox al succesului, întrucât dezvoltarea reduce sprijinul european.' },
        { type: 'p', text: 'Acordul de Parteneriat 2021-2027 alocă României aproximativ 31 de miliarde de euro din fondurile de coeziune (FEDR, FSE+, Fondul de Coeziune, FTJ). Distribuția pe regiuni reflectă atât decalajele de dezvoltare, cât și dimensiunea populației. Categoria de încadrare condiționează profund strategia: o regiune care se apropie de prag trebuie să anticipeze reducerea sprijinului și să-și construiască surse proprii de finanțare a dezvoltării.' },
        {
          type: 'table',
          headers: ['Regiune (NUTS-2)', 'Categorie coeziune', 'PIB/cap (% din media UE)'],
          rows: [
            ['București-Ilfov', 'Mai dezvoltată', 164],
            ['Vest', 'Mai puțin dezvoltată', 70],
            ['Nord-Vest', 'Mai puțin dezvoltată', 67],
            ['Centru', 'Mai puțin dezvoltată', 64],
            ['Sud-Est', 'Mai puțin dezvoltată', 52],
            ['Sud-Muntenia', 'Mai puțin dezvoltată', 51],
            ['Sud-Vest Oltenia', 'Mai puțin dezvoltată', 50],
            ['Nord-Est', 'Mai puțin dezvoltată', 43]
          ]
        },
        { type: 'chart', chartType: 'hbar', title: 'PIB pe locuitor pe regiuni, ca procent din media UE (orientativ)', source: 'Eurostat — conturi regionale; categorii politică de coeziune',
          labels: ['B-Ilfov', 'Vest', 'Nord-Vest', 'Centru', 'Sud-Est', 'Sud-Munt', 'Sud-Vest', 'Nord-Est'], data: [164, 70, 67, 64, 52, 51, 50, 43] },
        { type: 'chart', chartType: 'donut', title: 'Numărul de regiuni pe categorii de coeziune', source: 'Categorii politică de coeziune 2021-2027',
          labels: ['Mai dezvoltată', 'Mai puțin dezvoltată'], data: [1, 7] }
      ]
    },

    // 11
    {
      title: 'Cofinanțarea și capacitatea bugetară locală',
      blocks: [
        { type: 'p', text: 'Fondurile europene nu acoperă integral costul proiectelor: beneficiarul trebuie să asigure o cofinanțare, plus cheltuielile neeligibile (TVA în anumite cazuri, costuri suplimentare). Pentru un UAT cu venituri proprii reduse, această cerință de cofinanțare poate fi prohibitivă: chiar dacă proiectul este aprobat, comuna nu poate avansa partea sa de bani. Astfel, capacitatea de a accesa fonduri europene este puternic corelată cu sănătatea bugetului local.' },
        { type: 'p', text: 'Acesta este unul dintre cele mai perverse mecanisme de adâncire a disparităților: regiunile și UAT-urile sărace, care au cea mai mare nevoie de investiții, sunt și cele care își permit cel mai greu cofinanțarea. Mecanismele de sprijin — avansuri, fonduri de garantare, asistență tehnică — încearcă să atenueze acest efect, dar nu îl elimină. Comisia Europeană a prevăzut rate de cofinanțare națională mai mici pentru regiunile mai puțin dezvoltate tocmai pentru a corecta parțial această inechitate.' },
        { type: 'p', text: 'O structură regională cu buget propriu ar putea funcționa ca furnizor de cofinanțare pentru UAT-urile mai slabe din regiune, internalizând solidaritatea la nivel intermediar. În absența unui asemenea nivel, cofinanțarea rămâne în sarcina fie a UAT (care nu o poate susține), fie a bugetului de stat (care o alocă discreționar). Tabelul ilustrează tensiunea dintre nevoia de investiții și capacitatea de cofinanțare.' },
        {
          type: 'table',
          headers: ['Categorie regiune', 'Cofinanțare UE tipică (%)', 'Cofinanțare națională/locală (%)'],
          rows: [
            ['Regiune mai puțin dezvoltată', 85, 15],
            ['Regiune de tranziție', 70, 30],
            ['Regiune mai dezvoltată (B-Ilfov)', 50, 50]
          ]
        },
        { type: 'chart', chartType: 'bar', title: 'Cofinanțarea națională/locală necesară pe categorie de regiune (%)', source: 'Reguli politică de coeziune 2021-2027',
          labels: ['Mai puțin dezv.', 'Tranziție', 'Mai dezvoltată'], data: [15, 30, 50] },
        { type: 'chart', chartType: 'bar', title: 'Sprijinul acoperit din fonduri europene pe categorie de regiune (%)', source: 'Reguli politică de coeziune 2021-2027',
          labels: ['Mai puțin dezv.', 'Tranziție', 'Mai dezvoltată'], data: [85, 70, 50] }
      ]
    },

    // 12
    {
      title: 'Veniturile fiscale regionale: unde se colectează vs unde se cheltuie',
      blocks: [
        { type: 'p', text: 'Una dintre cele mai sensibile teme ale federalismului fiscal este discrepanța dintre locul colectării veniturilor fiscale și locul cheltuirii lor. În România, sediile fiscale ale marilor companii sunt concentrate masiv în București-Ilfov, astfel că impozitul pe profit și o parte din impozitul pe venit apar contabil ca fiind colectate în capitală, deși activitatea economică generatoare se desfășoară în teritoriu. Această concentrare a colectării distorsionează imaginea contribuției reale a regiunilor.' },
        { type: 'p', text: 'Distincția dintre locul de colectare și locul de generare a valorii adăugate este esențială pentru orice dezbatere despre echitatea fiscală regională. O fabrică din Nord-Est poate genera profit care se impozitează la sediul central din București; statistic, Bucureștiul apare ca un contribuitor net uriaș, iar regiunea care produce efectiv ca un beneficiar net. Corectarea acestei imagini cere o repartizare a veniturilor după criterii de activitate reală (forță de muncă, active, vânzări), așa cum se practică în formulele de partajare din statele federale.' },
        { type: 'p', text: 'Un nivel regional cu competențe fiscale ar putea reclama o cotă din veniturile generate pe teritoriul său, indiferent de sediul fiscal al plătitorului. Acest mecanism — repartizarea pe bază de formulă a bazei impozabile — este folosit în Germania și în alte federații pentru a evita ca toate veniturile să migreze către centrele de sediu. Tabelul ilustrează, orientativ, decalajul colectare-generare.' },
        {
          type: 'table',
          headers: ['Regiune', 'Pondere în colectare fiscală (%)', 'Pondere în PIB generat (%)'],
          rows: [
            ['București-Ilfov', 42, 28],
            ['Nord-Vest', 11, 13],
            ['Vest', 9, 10],
            ['Centru', 9, 11],
            ['Sud-Muntenia', 8, 10],
            ['Sud-Est', 7, 9],
            ['Nord-Est', 8, 11],
            ['Sud-Vest Oltenia', 6, 8]
          ]
        },
        { type: 'chart', chartType: 'bar', title: 'Decalajul între ponderea în colectarea fiscală și ponderea în PIB (București-Ilfov)', source: 'Ministerul Finanțelor; Eurostat — orientativ',
          labels: ['Colectare B-IF', 'PIB B-IF', 'Colectare NE', 'PIB NE'], data: [42, 28, 8, 11] },
        { type: 'chart', chartType: 'hbar', title: 'Raportul colectare/PIB pe regiuni (peste 1 = supra-colectare prin sedii)', source: 'Ministerul Finanțelor; Eurostat — orientativ',
          labels: ['B-Ilfov', 'Nord-Vest', 'Vest', 'Sud-Munt', 'Nord-Est'], data: ['1,50', '0,85', '0,90', '0,80', '0,73'] }
      ]
    },

    // 13
    {
      title: 'Perechea contribuitori-beneficiari net între regiuni',
      blocks: [
        { type: 'p', text: 'Analiza fluxurilor fiscale verticale (către și dinspre bugetul central) permite identificarea regiunilor contribuitoare nete (care trimit la centru mai mult decât primesc înapoi prin transferuri și investiții) și a celor beneficiare nete. În România, București-Ilfov este, prin concentrarea colectării, principalul contribuitor net aparent, în timp ce regiunile mai puțin dezvoltate apar ca beneficiare nete prin sumele de echilibrare și prin fondurile de coeziune europene.' },
        { type: 'p', text: 'Această perechere contribuitor-beneficiar este, în orice stat coeziv, expresia solidarității teritoriale: regiunile mai bogate susțin convergența celor mai sărace. Problema apare când transferul nu produce convergență, ci doar menține dependența. Federalismul fiscal susține că transferurile trebuie condiționate de performanță și orientate către investiții productive (infrastructură, educație), nu doar către cheltuieli curente, pentru a genera dezvoltare auto-susținută.' },
        { type: 'p', text: 'În dezbaterea regionalizării, balanța contribuitor-beneficiar este adesea folosită politic: regiuni precum Banatul sau Transilvania invocă statutul de contribuitor net pentru a cere mai multă autonomie fiscală. O analiză riguroasă trebuie însă să corecteze efectul sediilor fiscale (vezi capitolul precedent) și să includă beneficiile indirecte (acces la instituții naționale, piața internă). Tabelul prezintă o balanță orientativă, ce trebuie citită cu rezervele metodologice menționate.' },
        {
          type: 'table',
          headers: ['Regiune', 'Poziție fiscală netă (orientativ)', 'Sold net (indice)'],
          rows: [
            ['București-Ilfov', 'Contribuitor net', 100],
            ['Vest', 'Echilibrat/ușor contribuitor', 12],
            ['Centru', 'Echilibrat', 4],
            ['Nord-Vest', 'Ușor beneficiar', -8],
            ['Sud-Est', 'Beneficiar net', -22],
            ['Sud-Muntenia', 'Beneficiar net', -28],
            ['Sud-Vest Oltenia', 'Beneficiar net', -34],
            ['Nord-Est', 'Beneficiar net', -38]
          ]
        },
        { type: 'chart', chartType: 'hbar', title: 'Soldul fiscal net orientativ pe regiuni (indice; pozitiv = contribuitor)', source: 'Analiză UrbanX pe date Ministerul Finanțelor — orientativ',
          labels: ['B-IF', 'Vest', 'Centru', 'NV', 'SE', 'S-Munt', 'SV', 'NE'], data: [100, 12, 4, -8, -22, -28, -34, -38] },
        { type: 'chart', chartType: 'donut', title: 'Număr de regiuni după poziția fiscală netă', source: 'Analiză UrbanX — orientativ',
          labels: ['Contribuitoare/echilibrate', 'Beneficiare nete'], data: [3, 5] }
      ]
    },

    // 14
    {
      title: 'Transparența și guvernanța fiscală la nivel subnațional',
      blocks: [
        { type: 'p', text: 'Calitatea guvernanței fiscale condiționează eficiența oricărui sistem descentralizat. Transparența bugetară (publicarea bugetelor, a execuțiilor, a contractelor), responsabilizarea (audit, control al Curții de Conturi) și predictibilitatea (reguli fiscale stabile) determină dacă autonomia locală produce servicii mai bune sau doar oportunități de risipă și captură. Carta Europeană a Autonomiei Locale condiționează descentralizarea de existența unor proceduri de control de legalitate, nu de oportunitate.' },
        { type: 'p', text: 'În România, transparența bugetelor locale a progresat prin publicarea online și prin platforme de date deschise, dar rămâne neuniformă: marile municipii publică sistematic, multe comune mici nu au capacitatea tehnică de a face acest lucru. Regionalizarea ar putea standardiza raportarea, dar ar adăuga un nivel de guvernanță care, fără mecanisme robuste de control, poate deveni el însuși sursă de opacitate și captură regională.' },
        { type: 'p', text: 'Indicatorii de guvernanță fiscală — gradul de publicare a bugetelor, ponderea achizițiilor competitive, rata de implementare a recomandărilor de audit — sunt instrumentele prin care se măsoară sănătatea sistemului. O reformă regională trebuie să includă, de la început, standarde de transparență și un mecanism independent de audit, altfel beneficiile teoretice ale descentralizării se pierd. Tabelul propune un set de indicatori de monitorizare.' },
        {
          type: 'table',
          headers: ['Indicator de guvernanță fiscală', 'Țintă', 'Nivel actual orientativ (%)'],
          rows: [
            ['Bugete locale publicate online', 'Universal', 78],
            ['Achiziții prin proceduri competitive', 'Majoritar', 64],
            ['Execuții bugetare raportate la timp', 'Universal', 82],
            ['Recomandări de audit implementate', 'Majoritar', 55],
            ['Consultare publică a bugetului', 'Sistematic', 41]
          ]
        },
        { type: 'chart', chartType: 'bar', title: 'Indicatori orientativi de transparență și guvernanță fiscală locală (%)', source: 'Curtea de Conturi; date deschise; estimare UrbanX',
          labels: ['Bugete online', 'Achiziții comp.', 'Execuții la timp', 'Audit implem.', 'Consultare'], data: [78, 64, 82, 55, 41] },
        { type: 'chart', chartType: 'bar', title: 'Distanța până la țintă de guvernanță fiscală pe indicator (puncte)', source: 'Curtea de Conturi; estimare UrbanX',
          labels: ['Bugete online', 'Achiziții comp.', 'Execuții', 'Audit', 'Consultare'], data: [22, 36, 18, 45, 59] }
      ]
    },

    // 15
    {
      title: 'Datoria publică locală și sustenabilitatea bugetară',
      blocks: [
        { type: 'p', text: 'Îndatorarea autorităților locale este reglementată strict de Legea 273/2006, care plafonează serviciul anual al datoriei (rate plus dobânzi) la un procent din veniturile proprii medii ale ultimilor ani. Acest plafon protejează sustenabilitatea bugetelor locale, dar limitează și capacitatea UAT-urilor sărace de a se împrumuta pentru investiții: cu venituri proprii mici, plafonul de îndatorare este, de asemenea, mic, ceea ce le restrânge accesul la finanțare prin împrumut.' },
        { type: 'p', text: 'Împrumuturile locale provin din instituții financiare, emisiuni de obligațiuni municipale (rar utilizate în România) și împrumuturi de la stat prin trezorerie. Marile municipii folosesc creditul pentru cofinanțarea proiectelor europene sau pentru infrastructură, în vreme ce comunele mici evită îndatorarea din lipsă de capacitate de rambursare. Această diferență de acces la credit reproduce, în plan financiar, disparitățile teritoriale.' },
        { type: 'p', text: 'Sustenabilitatea bugetară la nivel subnațional se măsoară prin gradul de îndatorare (serviciul datoriei / venituri proprii) și prin soldul operațional (venituri curente minus cheltuieli curente), care arată cât rămâne pentru investiții. Un nivel regional cu rating de credit propriu ar putea accesa piețe financiare în condiții mai bune decât UAT-urile mici, agregând riscul și reducând costul împrumutului — un argument fiscal în favoarea regionalizării.' },
        {
          type: 'table',
          headers: ['Tip UAT', 'Plafon serviciu datorie (% venituri proprii)', 'Grad utilizare orientativ (%)'],
          rows: [
            ['Municipiu mare', 30, 62],
            ['Municipiu mediu', 30, 48],
            ['Oraș mic', 30, 31],
            ['Comună periurbană', 30, 24],
            ['Comună rurală', 30, 9]
          ]
        },
        { type: 'chart', chartType: 'bar', title: 'Gradul orientativ de utilizare a capacității de îndatorare pe tip de UAT (%)', source: 'Legea 273/2006, plafon serviciu datorie; estimare UrbanX',
          labels: ['Mun. mare', 'Mun. mediu', 'Oraș mic', 'Comună periurb.', 'Comună rurală'], data: [62, 48, 31, 24, 9] },
        { type: 'chart', chartType: 'hbar', title: 'Capacitate de îndatorare neutilizată pe tip de UAT (% din plafon)', source: 'Legea 273/2006; estimare UrbanX',
          labels: ['Mun. mare', 'Mun. mediu', 'Oraș mic', 'Comună periurb.', 'Comună rurală'], data: [38, 52, 69, 76, 91] }
      ]
    },

    // 16
    {
      title: 'Investițiile publice locale: sursă, volum și distribuție teritorială',
      blocks: [
        { type: 'p', text: 'Cheltuielile de capital (investiții) ale autorităților locale provin din trei surse: surse proprii (excedente, venituri proprii dedicate), transferuri de la bugetul de stat (programe naționale de investiții) și fonduri europene. Ponderea fiecărei surse diferă radical între UAT-uri: municipiile mari investesc semnificativ din surse proprii și fonduri UE, în timp ce comunele depind aproape integral de programele naționale de investiții și de fondurile europene cu cofinanțare.' },
        { type: 'p', text: 'Programele naționale de investiții (de tip program de dezvoltare locală) au fost criticate pentru caracterul lor parțial discreționar în alocare, care permite direcționarea resurselor către UAT-uri pe criterii politice, nu strict pe criterii de nevoie sau de impact. O alocare bazată pe formulă transparentă (populație, deficit de infrastructură, capacitate de absorbție) ar reduce acest risc și ar crește predictibilitatea pentru autoritățile locale.' },
        { type: 'p', text: 'Un nivel regional ar putea coordona investițiile cu impact supra-județean (drumuri de legătură, sisteme de apă, gestiunea deșeurilor, infrastructură de afaceri), evitând fragmentarea proiectelor pe granițe administrative. Distribuția teritorială a investițiilor publice este, în fond, mecanismul prin care politica fiscală fie reduce, fie adâncește disparitățile regionale. Tabelul ilustrează compoziția orientativă a surselor de investiții.' },
        {
          type: 'table',
          headers: ['Sursa investiții publice locale', 'Beneficiar tipic', 'Pondere orientativă (%)'],
          rows: [
            ['Surse proprii (excedent/venituri)', 'Municipii mari', 22],
            ['Programe naționale de investiții', 'Comune/orașe mici', 38],
            ['Fonduri europene (POR/PNRR)', 'UAT cu proiecte mature', 33],
            ['Împrumuturi', 'Municipii cu capacitate', 7]
          ]
        },
        { type: 'chart', chartType: 'donut', title: 'Compoziția orientativă a surselor de investiții publice locale (%)', source: 'Ministerul Finanțelor; analiză UrbanX',
          labels: ['Surse proprii', 'Programe naționale', 'Fonduri UE', 'Împrumuturi'], data: [22, 38, 33, 7] },
        { type: 'chart', chartType: 'bar', title: 'Investiții autonome (proprii+împrumut) vs dependente de transferuri externe (%)', source: 'Ministerul Finanțelor; analiză UrbanX',
          labels: ['Autonome (proprii+credit)', 'Dependente (programe+UE)'], data: [29, 71] }
      ]
    },

    // 17
    {
      title: 'Impozitele și taxele locale: potențial neexploatat',
      blocks: [
        { type: 'p', text: 'Veniturile proprii ale UAT-urilor provin în principal din impozitul pe clădiri, impozitul pe teren, impozitul pe mijloacele de transport și din taxe locale. Codul fiscal stabilește limite minime și maxime, iar consiliile locale fixează nivelul concret. Multe UAT-uri nu își exploatează integral potențialul fiscal: subevaluarea clădirilor, evidențe cadastrale incomplete și reticența politică de a majora impozitele lasă nevalorificate venituri proprii care ar reduce dependența de transferuri.' },
        { type: 'p', text: 'Impozitul pe proprietate este, în teoria federalismului fiscal (Oates), impozitul local prin excelență: baza sa este imobilă, deci nu poate migra, iar legătura dintre impozit și serviciile locale finanțate (infrastructură, salubritate) este vizibilă pentru cetățean. România folosește însă sub-optim acest instrument, în parte din cauza valorilor de impozitare rămase în urmă față de valoarea de piață și a evidențelor de proprietate incomplete.' },
        { type: 'p', text: 'Modernizarea evidenței cadastrale (Programul național de cadastru și carte funciară) și reforma impozitării proprietății — trecerea la valori de piață — ar putea crește substanțial veniturile proprii ale UAT-urilor, întărind autonomia financiară fără a apela la noi transferuri. Acesta este, fiscal, drumul cel mai sănătos către descentralizare: consolidarea bazelor proprii, nu doar repartizarea diferită a resurselor centrale. Tabelul prezintă structura orientativă a veniturilor proprii.' },
        {
          type: 'table',
          headers: ['Categorie venit propriu', 'Baza de impozitare', 'Pondere în venituri proprii (%)'],
          rows: [
            ['Impozit pe clădiri', 'Valoare imobil', 34],
            ['Impozit pe teren', 'Suprafață/zonă', 14],
            ['Impozit mijloace de transport', 'Capacitate motor', 18],
            ['Taxe și tarife pentru servicii', 'Servicii prestate', 21],
            ['Alte venituri proprii', 'Diverse', 13]
          ]
        },
        { type: 'chart', chartType: 'pie', title: 'Structura orientativă a veniturilor proprii ale UAT (%)', source: 'Codul fiscal; Ministerul Finanțelor',
          labels: ['Clădiri', 'Teren', 'Transport', 'Taxe servicii', 'Altele'], data: [34, 14, 18, 21, 13] },
        { type: 'chart', chartType: 'bar', title: 'Impozite pe proprietate (clădiri+teren) vs alte venituri proprii (%)', source: 'Codul fiscal; Ministerul Finanțelor',
          labels: ['Proprietate (clădiri+teren)', 'Alte venituri proprii'], data: [48, 52] }
      ]
    },

    // 18
    {
      title: 'Sumele defalcate din TVA: destinație și echilibrare',
      blocks: [
        { type: 'p', text: 'Sumele defalcate din taxa pe valoarea adăugată reprezintă cea mai mare componentă de transfer către bugetele locale. Ele se împart în două categorii: sume cu destinație specială (finanțarea unor cheltuieli specifice — învățământ preuniversitar, asistență socială, drumuri) și sume pentru echilibrarea bugetelor locale. Această dublă natură face din TVA defalcat instrumentul principal prin care statul finanțează servicii descentralizate fără a transfera baze fiscale proprii.' },
        { type: 'p', text: 'Componenta cu destinație specială finanțează cheltuieli pe care UAT-urile le execută în numele statului — în special salariile din învățământul preuniversitar, care reprezintă o pondere uriașă. În acest caz, autonomia locală este formală: banii vin etichetați, iar autoritatea locală doar îi cheltuie conform destinației. Acest mecanism explică de ce un nivel ridicat de cheltuieli locale nu echivalează cu un nivel ridicat de autonomie reală.' },
        { type: 'p', text: 'Componenta de echilibrare urmărește reducerea disparităților, fiind alocată invers proporțional cu capacitatea financiară. Reforma sistemului ar putea separa mai clar finanțarea serviciilor delegate (cu destinație) de transferul de echilibrare (liber), crescând transparența. Un nivel regional ar putea gestiona componenta de echilibrare cu o formulă stabilă, regionalizând solidaritatea. Tabelul prezintă repartizarea orientativă a TVA defalcat.' },
        {
          type: 'table',
          headers: ['Destinație sume defalcate TVA', 'Tip', 'Pondere orientativă (%)'],
          rows: [
            ['Învățământ preuniversitar (salarii)', 'Destinație specială', 52],
            ['Asistență socială și protecție', 'Destinație specială', 16],
            ['Drumuri și infrastructură', 'Destinație specială', 9],
            ['Echilibrarea bugetelor locale', 'Liber/echilibrare', 23]
          ]
        },
        { type: 'chart', chartType: 'donut', title: 'Destinația orientativă a sumelor defalcate din TVA (%)', source: 'Legea bugetului de stat; Legea 273/2006',
          labels: ['Învățământ', 'Asistență socială', 'Drumuri', 'Echilibrare'], data: [52, 16, 9, 23] },
        { type: 'chart', chartType: 'bar', title: 'Sume cu destinație predefinită vs sume libere de echilibrare (%)', source: 'Legea bugetului de stat; Legea 273/2006',
          labels: ['Cu destinație specială', 'Libere (echilibrare)'], data: [77, 23] }
      ]
    },

    // 19
    {
      title: 'Asimetria fiscală intra-regională: poli și periferii',
      blocks: [
        { type: 'p', text: 'Disparitățile fiscale nu există doar între regiuni, ci și în interiorul fiecărei regiuni, între polul de creștere (de regulă reședință de județ sau marele municipiu) și periferia rurală. Un municipiu ca Iași, Cluj-Napoca sau Timișoara concentrează venituri proprii ridicate, în timp ce comunele din aceeași regiune rămân dependente de transferuri. Această asimetrie intra-regională este adesea mai mare decât cea inter-regională și pune o provocare specifică unei eventuale guvernanțe regionale.' },
        { type: 'p', text: 'Concentrarea resurselor în poli reflectă concentrarea activității economice: locurile de muncă, sediile firmelor, parcul imobiliar valoros se aglomerează în centrele urbane mari. Periferiile contribuie cu forța de muncă (navetism) și suportă costuri de servicii fără bază fiscală corespunzătoare. Un sistem de finanțare regională echitabil trebuie să recunoască această interdependență funcțională — zona metropolitană — și să redistribuie în interiorul ei, nu doar între regiuni.' },
        { type: 'p', text: 'Instrumentele de corecție a asimetriei intra-regionale includ partajarea veniturilor în cadrul zonelor metropolitane, fonduri regionale de coeziune teritorială și proiecte integrate pol-periferie. Fără aceste mecanisme, regionalizarea ar putea consolida polul în detrimentul periferiei, reproducând la scară regională centralismul de care vrea să scape. Tabelul ilustrează, orientativ, decalajul intra-regional al veniturilor proprii pe locuitor.' },
        {
          type: 'table',
          headers: ['Profil UAT în regiune', 'Tip', 'Venituri proprii/locuitor (indice)'],
          rows: [
            ['Pol urban (reședință de județ)', 'Centru', 100],
            ['Localitate periurbană', 'Inel metropolitan', 58],
            ['Oraș secundar', 'Subcentru', 47],
            ['Comună agricolă', 'Periferie', 22],
            ['Comună montană izolată', 'Periferie extremă', 14]
          ]
        },
        { type: 'chart', chartType: 'hbar', title: 'Venituri proprii pe locuitor — decalaj intra-regional (indice, pol = 100)', source: 'Analiză UrbanX pe date Ministerul Finanțelor — orientativ',
          labels: ['Pol urban', 'Periurban', 'Oraș secundar', 'Comună agricolă', 'Comună montană'], data: [100, 58, 47, 22, 14] },
        { type: 'chart', chartType: 'hbar', title: 'Decalajul față de pol al veniturilor proprii/locuitor (puncte de indice)', source: 'Analiză UrbanX — orientativ',
          labels: ['Periurban', 'Oraș secundar', 'Comună agricolă', 'Comună montană'], data: [42, 53, 78, 86] }
      ]
    },

    // 20
    {
      title: 'Capacitatea administrativă și performanța în atragerea de fonduri',
      blocks: [
        { type: 'p', text: 'Atragerea de fonduri europene depinde decisiv de capacitatea administrativă: numărul și calificarea personalului, existența unor departamente dedicate de management de proiect, accesul la asistență tehnică și experiența acumulată. UAT-urile mari, cu aparate administrative consistente, depun mai multe proiecte, le pregătesc mai bine și le implementează cu mai puține corecții financiare. Comunele mici, cu câteva posturi tehnice, sunt structural dezavantajate, indiferent de mărimea alocării.' },
        { type: 'p', text: 'Comisia Europeană (DG REGIO) a recunoscut acest decalaj prin instrumente dedicate de întărire a capacității administrative (asistență tehnică, asociații de dezvoltare intercomunitară, consultanță). Descentralizarea POR la nivelul ADR-urilor urmărește, în parte, aducerea expertizei mai aproape de beneficiarii mici, prin ghidare și sprijin. Performanța diferențiată a regiunilor în noul cadru va testa eficacitatea acestei abordări.' },
        { type: 'p', text: 'Indicatorii de capacitate administrativă — proiecte depuse pe mia de locuitori, rata de succes a cererilor, rata corecțiilor financiare — corelează puternic cu absorbția. Investiția în capacitate administrativă are, paradoxal, cel mai mare randament fiscal: fiecare euro cheltuit pe expertiză poate debloca multiplii săi în fonduri europene. Un nivel regional bine dotat ar putea oferi servicii partajate de management de proiect comunelor mici din regiune.' },
        {
          type: 'table',
          headers: ['Tip beneficiar', 'Capacitate administrativă', 'Rată succes cereri orientativă (%)'],
          rows: [
            ['Municipiu mare', 'Departament dedicat', 64],
            ['Municipiu mediu', 'Echipă mixtă', 52],
            ['Oraș mic', 'Personal limitat', 41],
            ['Comună cu ADI', 'Sprijin asociativ', 46],
            ['Comună fără sprijin', 'Personal minim', 27]
          ]
        },
        { type: 'chart', chartType: 'bar', title: 'Rata orientativă de succes a cererilor de finanțare după capacitatea administrativă (%)', source: 'DG REGIO; estimare UrbanX',
          labels: ['Mun. mare', 'Mun. mediu', 'Oraș mic', 'Comună ADI', 'Comună minimă'], data: [64, 52, 41, 46, 27] },
        { type: 'chart', chartType: 'bar', title: 'Efectul sprijinului asociativ (ADI) asupra ratei de succes a comunelor (%)', source: 'DG REGIO; estimare UrbanX',
          labels: ['Comună fără sprijin', 'Comună cu ADI'], data: [27, 46] }
      ]
    },

    // 21
    {
      title: 'Fondul pentru o Tranziție Justă (FTJ) și regiunile carbonifere',
      blocks: [
        { type: 'p', text: 'Fondul pentru o Tranziție Justă este un instrument european dedicat sprijinirii regiunilor cele mai afectate de tranziția către neutralitatea climatică — în special zonele dependente de exploatarea cărbunelui și de industrii intensive în carbon. În România, județele din Valea Jiului (Hunedoara), Gorj, Dolj, dar și zone industriale din alte regiuni, beneficiază de alocări semnificative pentru reconversia economică, recalificarea forței de muncă și decontaminarea siturilor.' },
        { type: 'p', text: 'FTJ ilustrează o logică de alocare diferită de cea a coeziunii clasice: nu PIB-ul pe locuitor, ci expunerea la tranziție determină alocarea. Această abordare țintește regiuni care, deși nu sunt neapărat cele mai sărace, suportă un cost de ajustare disproporționat. Pentru România, FTJ este o ocazie de a transforma teritorii mono-industriale aflate în declin în poli de noi activități economice.' },
        { type: 'p', text: 'Gestionarea FTJ cere planuri teritoriale de tranziție justă, elaborate la nivel regional și județean, care identifică nevoile specifice și proiectele de reconversie. Această planificare teritorială este, ea însăși, un exercițiu de guvernanță regională: necesită coordonare între actori, viziune comună și capacitate de implementare. Tabelul prezintă orientativ regiunile vizate și tipul de intervenție.' },
        {
          type: 'table',
          headers: ['Teritoriu vizat de FTJ', 'Provocare principală', 'Alocare orientativă (mil. €)'],
          rows: [
            ['Gorj', 'Închidere mine și termocentrale', 530],
            ['Hunedoara (Valea Jiului)', 'Reconversie post-minerit', 220],
            ['Dolj', 'Restructurare energetică', 350],
            ['Galați', 'Tranziție industrie grea', 270],
            ['Prahova', 'Reconversie petrochimie', 240],
            ['Mureș', 'Industrie intensivă carbon', 200]
          ]
        },
        { type: 'chart', chartType: 'bar', title: 'Alocări orientative ale Fondului pentru o Tranziție Justă pe teritorii (mil. €)', source: 'Acordul de Parteneriat 2021-2027; planuri teritoriale FTJ — orientativ',
          labels: ['Gorj', 'Hunedoara', 'Dolj', 'Galați', 'Prahova', 'Mureș'], data: [530, 220, 350, 270, 240, 200] },
        { type: 'chart', chartType: 'donut', title: 'Ponderea fiecărui teritoriu în totalul FTJ (%)', source: 'Planuri teritoriale de tranziție justă — orientativ',
          labels: ['Gorj', 'Hunedoara', 'Dolj', 'Galați', 'Prahova', 'Mureș'], data: [31, 13, 20, 16, 12, 8] }
      ]
    },

    // 22
    {
      title: 'Cheltuielile pe funcții: cât costă serviciile descentralizate',
      blocks: [
        { type: 'p', text: 'Bugetele locale finanțează un set larg de servicii descentralizate: învățământ preuniversitar, servicii de salubritate și mediu, drumuri și transport local, asistență socială, cultură și sport, administrație generală. Structura cheltuielilor pe funcții arată unde se concentrează efortul bugetar și cât de mult din acesta este, de fapt, finanțare cu destinație de la centru (cum este cazul salariilor din învățământ), versus cheltuiala asupra căreia autoritatea locală decide liber.' },
        { type: 'p', text: 'Ponderea covârșitoare a cheltuielilor de personal în învățământ și în administrație limitează marja de manevră pentru investiții și pentru servicii noi. O comună își cheltuie cea mai mare parte a bugetului pe obligații fixe (salarii, utilități, asistență socială obligatorie), rămânând cu puțin pentru dezvoltare. Acesta este motivul pentru care cofinanțarea fondurilor europene este atât de dificilă pentru UAT-urile mici.' },
        { type: 'p', text: 'Analiza cheltuielilor pe funcții este esențială pentru a calibra orice reformă: o regionalizare care preia funcții de la județe trebuie să preia și finanțarea aferentă, altfel transferă responsabilități fără resurse. Principiul corespondenței dintre competență și finanțare (din Carta Europeană a Autonomiei Locale) este aici central. Tabelul prezintă structura orientativă a cheltuielilor pe funcții ale bugetelor locale.' },
        {
          type: 'table',
          headers: ['Funcție de cheltuială', 'Caracter', 'Pondere orientativă (%)'],
          rows: [
            ['Învățământ preuniversitar', 'În mare parte finanțare cu destinație', 31],
            ['Administrație generală', 'Funcționare', 14],
            ['Servicii dezvoltare publică și locuințe', 'Investiții/utilități', 17],
            ['Asistență socială', 'Obligatorie', 13],
            ['Transport și drumuri', 'Infrastructură', 11],
            ['Cultură, sport, recreere', 'Discreționar', 7],
            ['Protecția mediului', 'Salubritate/ape', 7]
          ]
        },
        { type: 'chart', chartType: 'hbar', title: 'Structura orientativă a cheltuielilor bugetelor locale pe funcții (%)', source: 'Ministerul Finanțelor — clasificație funcțională',
          labels: ['Învățământ', 'Administrație', 'Dezv. publică', 'Asist. socială', 'Transport', 'Cultură', 'Mediu'], data: [31, 14, 17, 13, 11, 7, 7] },
        { type: 'chart', chartType: 'donut', title: 'Cheltuieli rigide (obligatorii) vs discreționare (%)', source: 'Ministerul Finanțelor — clasificație funcțională',
          labels: ['Rigide (învățământ+admin+social)', 'Discreționare/investiții'], data: [58, 42] }
      ]
    },

    // 23
    {
      title: 'Predictibilitatea fiscală și planificarea multianuală',
      blocks: [
        { type: 'p', text: 'Una dintre cele mai mari slăbiciuni ale finanțelor locale românești este lipsa de predictibilitate: cotele și sumele defalcate se stabilesc anual prin legea bugetului, cu modificări frecvente de la un an la altul, iar rectificările bugetare pe parcursul anului adaugă incertitudine. Pentru o autoritate locală, aceasta înseamnă imposibilitatea de a planifica investiții pe orizont multianual cu un grad rezonabil de certitudine asupra resurselor.' },
        { type: 'p', text: 'Federalismul fiscal subliniază că predictibilitatea resurselor este condiția esențială a unei autonomii reale: o colectivitate care nu știe cât va avea peste doi ani nu poate angaja proiecte mari, nu poate contracta credite și nu poate cofinanța fonduri europene multianuale. Statele cu descentralizare matură folosesc formule stabile, modificabile doar prin proceduri agravate, tocmai pentru a proteja planificarea subnațională.' },
        { type: 'p', text: 'Un cadru fiscal multianual la nivel regional, cu o formulă de finanțare stabilă pe durata unui ciclu de programare (de exemplu șapte ani, aliniat la cadrul financiar european), ar transforma capacitatea de planificare a teritoriului. Predictibilitatea este, în fond, un bun public fiscal: nu costă nimic suplimentar, dar deblochează investiții care altfel nu s-ar face. Tabelul ilustrează, orientativ, gradul de predictibilitate al diverselor surse de venit.' },
        {
          type: 'table',
          headers: ['Sursa de venit', 'Mecanism de stabilire', 'Predictibilitate (scor 0-100)'],
          rows: [
            ['Venituri proprii (impozite locale)', 'Decizie locală stabilă', 85],
            ['Cote defalcate impozit pe venit', 'Legea bugetului anual', 55],
            ['Sume defalcate TVA destinație', 'Anual, după necesar', 60],
            ['Sume echilibrare', 'Anual + decizie CJ', 38],
            ['Programe naționale investiții', 'Discreționar', 30],
            ['Fonduri europene', 'Cadru multianual UE', 70]
          ]
        },
        { type: 'chart', chartType: 'bar', title: 'Gradul orientativ de predictibilitate a surselor de venit locale (scor 0-100)', source: 'Analiză UrbanX; Legea 273/2006',
          labels: ['Proprii', 'Cote venit', 'TVA dest.', 'Echilibrare', 'Programe nat.', 'Fonduri UE'], data: [85, 55, 60, 38, 30, 70] },
        { type: 'chart', chartType: 'bar', title: 'Surse cu predictibilitate ridicată vs scăzută (număr de surse)', source: 'Analiză UrbanX; Legea 273/2006',
          labels: ['Predictibile (scor 60+)', 'Slab predictibile (sub 60)'], data: [3, 3] }
      ]
    },

    // 24
    {
      title: 'Modele europene de finanțare regională: lecții comparate',
      blocks: [
        { type: 'p', text: 'Statele europene cu nivel regional oferă modele variate de finanțare. În Germania, landurile au baze fiscale proprii și participă la un sistem complex de perecvare (Laenderfinanzausgleich) care reechilibrează între landuri bogate și sărace. În Spania, comunitățile autonome au grade diferite de autonomie fiscală, de la regimul comun la regimurile forale (Țara Bascilor, Navarra) cu autonomie fiscală aproape totală. Aceste modele arată că finanțarea regională poate lua forme foarte diferite.' },
        { type: 'p', text: 'Lecția transversală a acestor experiențe este că finanțarea regională funcționează când combină trei elemente: o bază fiscală proprie suficientă pentru a responsabiliza nivelul regional, un mecanism de perecvare transparent pentru a asigura solidaritatea, și reguli stabile care protejează predictibilitatea. Acolo unde lipsește vreunul dintre aceste elemente — fie baza proprie, fie perecvarea, fie stabilitatea — apar fie iresponsabilitate fiscală, fie inechitate, fie blocaj investițional.' },
        { type: 'p', text: 'Pentru România, niciun model nu este transferabil mecanic, dar principiile sunt instructive: o eventuală regionalizare ar trebui să transfere baze fiscale, nu doar competențe; să instituie o formulă de perecvare publică și auditabilă; și să garanteze stabilitatea pe durata unui ciclu de programare. Tabelul compară orientativ gradul de autonomie fiscală regională în câteva state europene.' },
        {
          type: 'table',
          headers: ['Stat', 'Model finanțare regională', 'Autonomie fiscală regională (scor 0-100)'],
          rows: [
            ['Țara Bascilor (Spania)', 'Regim foral', 92],
            ['Germania (landuri)', 'Federal cu perecvare', 78],
            ['Spania (regim comun)', 'Autonomie parțială', 60],
            ['Italia (regiuni)', 'Descentralizare asimetrică', 52],
            ['Polonia (voievodate)', 'Unitar regionalizat', 40],
            ['România (ipotetic regional)', 'De definit', 25]
          ]
        },
        { type: 'chart', chartType: 'hbar', title: 'Autonomia fiscală regională în modele europene (scor orientativ 0-100)', source: 'Literatura federalismului fiscal; OCDE — orientativ',
          labels: ['Țara Bascilor', 'Germania', 'Spania comun', 'Italia', 'Polonia', 'România (ip.)'], data: [92, 78, 60, 52, 40, 25] },
        { type: 'chart', chartType: 'bar', title: 'Distanța României (ipotetic) față de modelele europene (puncte)', source: 'Literatura federalismului fiscal; OCDE — orientativ',
          labels: ['vs Țara Bascilor', 'vs Germania', 'vs Spania', 'vs Italia', 'vs Polonia'], data: [67, 53, 35, 27, 15] }
      ]
    },

    // 25
    {
      title: 'Reforma impozitării proprietății: motorul autonomiei fiscale',
      blocks: [
        { type: 'p', text: 'Creșterea veniturilor proprii ale UAT-urilor trece, în cea mai mare măsură, prin reforma impozitării proprietății imobiliare. În prezent, în România, valorile de impozitare a clădirilor sunt deconectate de valorile de piață, ceea ce reduce randamentul fiscal și introduce inechități (proprietăți similare impozitate diferit). Trecerea la o impozitare bazată pe valoarea de piață, susținută de o evidență cadastrală completă, ar putea crește substanțial veniturile proprii fără a inventa noi impozite.' },
        { type: 'p', text: 'Impozitul pe proprietate este recomandat de teoria fiscală ca impozitul local ideal pentru că baza sa este imobilă și vizibilă, iar legătura cu serviciile finanțate este transparentă. Programul național de cadastru și carte funciară, cofinanțat european, urmărește tocmai înregistrarea sistematică a proprietăților, premisa unei impozitări corecte. Pe măsură ce evidența se completează, potențialul fiscal local crește.' },
        { type: 'p', text: 'Reforma trebuie calibrată cu grijă pentru a nu împovăra excesiv gospodăriile cu venituri reduse — de regulă prin scutiri și eșalonări pentru locuința principală. Beneficiul strategic este însă major: o creștere a ponderii veniturilor proprii ridică direct gradul de autonomie fiscală (venituri proprii / total) și reduce dependența de transferuri. Tabelul ilustrează efectul potențial al reformei asupra autonomiei fiscale.' },
        {
          type: 'table',
          headers: ['Scenariu impozitare proprietate', 'Caracteristică', 'Grad autonomie fiscală estimat (%)'],
          rows: [
            ['Actual (valori administrative)', 'Subevaluare', 25],
            ['Cadastru complet + valori actualizate', 'Acoperire integrală', 33],
            ['Impozitare la valoare de piață', 'Reformă completă', 41],
            ['Plus partaj regional al bazei', 'Nivel regional', 48]
          ]
        },
        { type: 'chart', chartType: 'bar', title: 'Gradul estimat de autonomie fiscală pe scenarii de reformă a impozitării proprietății (%)', source: 'Programul național de cadastru; estimare UrbanX',
          labels: ['Actual', 'Cadastru complet', 'Valoare piață', 'Plus partaj reg.'], data: [25, 33, 41, 48] },
        { type: 'chart', chartType: 'bar', title: 'Câștig de autonomie fiscală față de situația actuală (puncte procentuale)', source: 'Programul național de cadastru; estimare UrbanX',
          labels: ['Cadastru complet', 'Valoare piață', 'Plus partaj reg.'], data: [8, 16, 23] }
      ]
    },

    // 26
    {
      title: 'Corecțiile financiare și riscul de dezangajare a fondurilor UE',
      blocks: [
        { type: 'p', text: 'Absorbția fondurilor europene nu înseamnă doar cheltuire, ci cheltuire corectă: nerespectarea regulilor de achiziție publică, de eligibilitate sau de ajutor de stat generează corecții financiare — reduceri ale rambursării sau recuperări de sume deja plătite. Corecțiile diminuează absorbția netă și pun presiune pe bugetele locale, care trebuie să acopere diferența. Regiunile și UAT-urile cu capacitate administrativă redusă sunt mai expuse la corecții, ceea ce le penalizează dublu.' },
        { type: 'p', text: 'Un risc înrudit este dezangajarea automată (regula n+2/n+3): fondurile alocate dar necheltuite până la termen se pierd definitiv. Acest mecanism, prevăzut de regulamentele europene, transformă întârzierile în pierderi nete pentru țară. Presiunea de a cheltui rapid, pentru a evita dezangajarea, poate însă duce la proiecte de calitate slabă sau la corecții ulterioare — un compromis dificil între viteză și calitate.' },
        { type: 'p', text: 'Gestionarea corectă a acestor riscuri cere control intern robust, asistență tehnică și verificare ex-ante a achizițiilor. Descentralizarea POR la ADR-uri mută o parte din această responsabilitate la nivel regional, ceea ce poate apropia controlul de teren, dar cere capacitate proporțională. Tabelul prezintă tipurile principale de risc financiar și magnitudinea lor orientativă.' },
        {
          type: 'table',
          headers: ['Tip de risc financiar UE', 'Cauza principală', 'Magnitudine risc (indice 0-100)'],
          rows: [
            ['Corecții pe achiziții publice', 'Nereguli procedurale', 72],
            ['Corecții pe eligibilitate', 'Cheltuieli neeligibile', 48],
            ['Dezangajare automată n+2/n+3', 'Întârzieri implementare', 65],
            ['Corecții pe ajutor de stat', 'Reguli concurență', 35],
            ['Nereguli de raportare', 'Capacitate redusă', 41]
          ]
        },
        { type: 'chart', chartType: 'hbar', title: 'Magnitudinea orientativă a riscurilor financiare în absorbția fondurilor UE (indice)', source: 'DG REGIO; regulamente fonduri 2021-2027; estimare UrbanX',
          labels: ['Achiziții', 'Eligibilitate', 'Dezangajare', 'Ajutor de stat', 'Raportare'], data: [72, 48, 65, 35, 41] },
        { type: 'chart', chartType: 'donut', title: 'Număr de riscuri pe nivel de severitate', source: 'DG REGIO; regulamente 2021-2027; estimare UrbanX',
          labels: ['Risc ridicat (60+)', 'Risc moderat (sub 60)'], data: [2, 3] }
      ]
    },

    // 27
    {
      title: 'Indicele compozit de autonomie financiară regională',
      blocks: [
        { type: 'p', text: 'Pentru a sintetiza diversele dimensiuni ale finanțelor regionale, propunem un indice compozit de autonomie financiară, calculat ca medie ponderată a patru subindicatori: gradul de autonomie fiscală (venituri proprii / total), predictibilitatea resurselor, capacitatea de cofinanțare și capacitatea administrativă de absorbție. Indicele, exprimat pe o scală 0-100, permite o comparație sintetică între regiuni și identificarea punctelor slabe care necesită intervenție prioritară.' },
        { type: 'p', text: 'Construcția indicelui urmează logica indicatorilor compoziți din literatura de specialitate: fiecare subindicator se normalizează pe scala 0-100, apoi se agregă cu ponderi care reflectă importanța relativă. Avantajul unui asemenea instrument este că transformă o realitate complexă într-un număr comparabil, util pentru prioritizarea politicilor; limita sa este că o singură cifră ascunde structura, de aceea indicele se citește împreună cu subindicatorii.' },
        { type: 'p', text: 'Aplicat orientativ regiunilor României, indicele confirmă așteptările: București-Ilfov și regiunile vestice, cu economie diversificată și capacitate administrativă, obțin scoruri ridicate, în timp ce regiunile cu dependență mare de transferuri și capacitate redusă rămân în urmă. Tabelul prezintă indicele compozit și componentele sale pe regiuni, ca instrument de diagnoză, nu de clasament oficial.' },
        {
          type: 'table',
          headers: ['Regiune', 'Componentă dominantă', 'Indice autonomie financiară (0-100)'],
          rows: [
            ['București-Ilfov', 'Venituri proprii ridicate', 72],
            ['Vest', 'Economie diversificată', 61],
            ['Centru', 'Echilibru bun', 58],
            ['Nord-Vest', 'Capacitate bună', 57],
            ['Sud-Est', 'Mixt', 49],
            ['Sud-Muntenia', 'Dependență moderată', 46],
            ['Sud-Vest Oltenia', 'Dependență mare', 42],
            ['Nord-Est', 'Dependență mare', 39]
          ]
        },
        { type: 'chart', chartType: 'bar', title: 'Indicele compozit orientativ de autonomie financiară regională (0-100)', source: 'Indice compozit UrbanX pe date Ministerul Finanțelor/Eurostat',
          labels: ['B-IF', 'Vest', 'Centru', 'NV', 'SE', 'S-Munt', 'SV', 'NE'], data: [72, 61, 58, 57, 49, 46, 42, 39] },
        { type: 'chart', chartType: 'donut', title: 'Număr de regiuni pe clase de autonomie financiară', source: 'Indice compozit UrbanX',
          labels: ['Ridicată (55+)', 'Medie (45-55)', 'Scăzută (sub 45)'], data: [4, 1, 3] }
      ]
    },

    // 28
    {
      title: 'Instrumente teritoriale integrate: ITI și dezvoltarea locală plasată sub responsabilitatea comunității',
      blocks: [
        { type: 'p', text: 'Politica de coeziune oferă instrumente special concepute pentru a aborda nevoi teritoriale specifice prin pachete integrate de finanțare: Investițiile Teritoriale Integrate (ITI) și Dezvoltarea Locală Plasată sub Responsabilitatea Comunității (DLRC). ITI permite combinarea finanțării din mai multe programe pentru o strategie teritorială unică — exemplul cel mai cunoscut din România este ITI Delta Dunării, un model de guvernanță teritorială integrată.' },
        { type: 'p', text: 'Aceste instrumente reprezintă, în fapt, exerciții de regionalizare funcțională: ele cer constituirea unor structuri de guvernanță teritorială (asociații, grupuri de acțiune locală) care planifică și gestionează investițiile la o scală intermediară între UAT și regiune. Experiența acumulată prin ITI și DLRC oferă lecții prețioase despre capacitatea de a guverna teritoriul la scară supra-locală, relevante pentru o eventuală regionalizare.' },
        { type: 'p', text: 'Extinderea logicii ITI la mai multe teritorii cu provocări comune (zone montane, zone în declin industrial, zone metropolitane) ar putea consolida treptat capacitatea de guvernanță regională fără o reformă constituțională. Această abordare graduală, prin instrumente teritoriale, este una dintre căile pragmatice de a avansa descentralizarea. Tabelul prezintă instrumentele teritoriale și caracteristicile lor.' },
        {
          type: 'table',
          headers: ['Instrument teritorial integrat', 'Scară', 'Alocare orientativă (mil. €)'],
          rows: [
            ['ITI Delta Dunării', 'Teritoriu specific', 1100],
            ['ITI Valea Jiului (în dezvoltare)', 'Zonă în tranziție', 300],
            ['DLRC urban', 'Cartiere defavorizate', 180],
            ['DLRC rural (GAL)', 'Comunități rurale', 600],
            ['Strategii integrate urbane (POR)', 'Municipii', 1500]
          ]
        },
        { type: 'chart', chartType: 'bar', title: 'Alocări orientative ale instrumentelor teritoriale integrate (mil. €)', source: 'Acordul de Parteneriat 2021-2027; POR-uri regionale — orientativ',
          labels: ['ITI Delta', 'ITI Valea Jiului', 'DLRC urban', 'DLRC rural', 'Strategii urbane'], data: [1100, 300, 180, 600, 1500] },
        { type: 'chart', chartType: 'donut', title: 'Repartizarea instrumentelor teritoriale pe tip urban vs rural (mil. €)', source: 'Acordul de Parteneriat 2021-2027 — orientativ',
          labels: ['Urban (ITI Delta/Jiu+DLRC urban+strategii)', 'Rural (DLRC rural)'], data: [3080, 600] }
      ]
    },

    // 29
    {
      title: 'Scenarii fiscale de regionalizare: trei opțiuni de partaj al resurselor',
      blocks: [
        { type: 'p', text: 'Orice proiect de regionalizare implică o decizie fundamentală despre cum se împarte tortul fiscal între central, regional și local. Conturăm trei scenarii. Scenariul A (regionalizare administrativă minimă) păstrează arhitectura fiscală actuală și adaugă doar o coordonare regională a planificării — cost redus, efect fiscal limitat. Scenariul B (descentralizare fiscală moderată) transferă regiunilor o cotă din impozitul pe venit și componenta de echilibrare. Scenariul C (autonomie fiscală consistentă) transferă baze fiscale proprii și capacitate de împrumut.' },
        { type: 'p', text: 'Fiecare scenariu are un profil distinct de risc și de beneficiu. Scenariul A este ușor de implementat dar nu rezolvă dezechilibrele structurale; scenariul C maximizează autonomia dar cere reforme instituționale profunde și comportă risc de iresponsabilitate fiscală dacă nu este însoțit de reguli stricte și de perecvare. Scenariul B reprezintă un compromis: transferă resurse semnificative păstrând un control central asupra echilibrării și stabilității macroeconomice.' },
        { type: 'p', text: 'Alegerea scenariului nu este pur tehnică, ci politică: ea reflectă echilibrul dorit între eficiență, echitate și coeziune națională. Recomandarea analitică este o tranziție graduală — pornind de la scenariul A către B, cu evaluare la fiecare etapă — astfel încât capacitatea administrativă să se dezvolte în pas cu transferul de resurse. Tabelul compară cele trei scenarii pe dimensiunile-cheie.' },
        {
          type: 'table',
          headers: ['Scenariu fiscal de regionalizare', 'Resurse transferate regiunii', 'Pondere buget regional în total public (%)'],
          rows: [
            ['A — Administrativă minimă', 'Doar coordonare', 5],
            ['B — Descentralizare moderată', 'Cotă venit + echilibrare', 18],
            ['C — Autonomie consistentă', 'Baze proprii + împrumut', 32]
          ]
        },
        { type: 'chart', chartType: 'bar', title: 'Ponderea bugetului regional în total public pe scenarii de regionalizare (%)', source: 'Analiză de scenarii UrbanX; teoria federalismului fiscal',
          labels: ['A — minimă', 'B — moderată', 'C — consistentă'], data: [5, 18, 32] },
        { type: 'chart', chartType: 'bar', title: 'Profil risc de implementare pe scenariu (indice 0-100)', source: 'Analiză de scenarii UrbanX',
          labels: ['A — minimă', 'B — moderată', 'C — consistentă'], data: [15, 45, 80] }
      ]
    },

    // 30
    {
      title: 'Foaie de parcurs fiscală: secvența reformei descentralizării',
      blocks: [
        { type: 'p', text: 'O reformă fiscală de regionalizare reușită nu se face printr-un singur act, ci printr-o secvență atent ordonată de pași, eșalonată pe mai mulți ani. Ordinea contează: transferul de resurse trebuie să urmeze construirii capacității administrative, iar mecanismele de echilibrare și de control trebuie să fie operaționale înainte de a transfera autonomia decizională. Inversarea ordinii — autonomie înaintea capacității și a controlului — este rețeta eșecului, dovedită de experiențe internaționale.' },
        { type: 'p', text: 'Secvența recomandată începe cu fundații: completarea cadastrului, modernizarea raportării fiscale, întărirea capacității administrative regionale prin ADR-uri consolidate. Urmează apoi transferul gradual de resurse — întâi o cotă stabilă din impozitul pe venit, apoi componenta de echilibrare gestionată regional după o formulă publică. În paralel, se construiește mecanismul de perecvare și auditul independent. Abia în faza finală se discută despre baze fiscale proprii și capacitate de împrumut regional.' },
        { type: 'p', text: 'Fiecare etapă trebuie să includă indicatori de evaluare și clauze de revizuire: dacă o etapă nu produce rezultatele așteptate (de pildă, dacă absorbția nu crește sau dacă apar dezechilibre), reforma se ajustează înainte de a avansa. Această abordare prudentă, bazată pe dovezi, este singura compatibilă cu menținerea stabilității macroeconomice și a coeziunii naționale pe parcursul tranziției. Tabelul prezintă foaia de parcurs fiscală pe etape.' },
        {
          type: 'table',
          headers: ['Etapă reformă fiscală', 'Acțiune-cheie', 'Orizont orientativ (ani)'],
          rows: [
            ['1. Fundații', 'Cadastru, raportare, capacitate ADR', 2],
            ['2. Transfer cotă venit', 'Cotă stabilă din impozit pe venit', 3],
            ['3. Echilibrare regională', 'Formulă publică de perecvare', 4],
            ['4. Audit și control', 'Mecanism independent', 5],
            ['5. Baze fiscale proprii', 'Partaj impozit proprietate', 7],
            ['6. Capacitate de împrumut', 'Rating și finanțare regională', 8]
          ]
        },
        { type: 'chart', chartType: 'bar', title: 'Orizontul de timp orientativ al etapelor reformei fiscale (ani de la start)', source: 'Foaie de parcurs UrbanX; bune practici descentralizare',
          labels: ['Fundații', 'Cotă venit', 'Echilibrare', 'Audit', 'Baze proprii', 'Împrumut'], data: [2, 3, 4, 5, 7, 8] },
        { type: 'chart', chartType: 'donut', title: 'Repartizarea etapelor pe faze ale reformei (număr etape)', source: 'Foaie de parcurs UrbanX',
          labels: ['Pregătire (fundații+capacitate)', 'Transfer resurse', 'Control', 'Autonomie avansată'], data: [1, 2, 1, 2] }
      ]
    }

  ];

  try { console.log('[REGIO p06] încărcat — capitole:', G._REGIO_DEEP['p06'].length); } catch (e) {}
})(window);
