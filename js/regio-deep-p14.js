window._REGIO_DEEP = window._REGIO_DEEP || {};
window._REGIO_DEEP['p14'] = [
 {
  "title": "Sistemul electoral actual și circumscripțiile pe județe",
  "blocks": [
   {
    "type": "p",
    "text": "Sistemul electoral al României pentru alegerile parlamentare este reglementat de Legea 208/2015 privind alegerea Senatului și a Camerei Deputaților, care a reinstituit scrutinul proporțional pe liste de partid după experimentul votului uninominal mixt din perioada 2008-2012. Teritoriul național este împărțit în 43 de circumscripții electorale: cele 41 de județe, municipiul București și o circumscripție pentru cetățenii cu domiciliul sau reședința în străinătate. Fiecare circumscripție primește un număr de mandate proporțional cu populația sa, conform normei de reprezentare. Această arhitectură păstrează județul ca unitate electorală de bază, ceea ce înseamnă că orice discuție despre redistribuirea reprezentării către regiuni trebuie să pornească de la agregarea mandatelor județene existente, nu de la o rescriere a hărții electorale. Înțelegerea acestei structuri este premisa oricărei analize de reprezentare la nivel regional."
   },
   {
    "type": "p",
    "text": "Camera Deputaților numără 330 de mandate alese prin vot, la care se adaugă locurile rezervate organizațiilor cetățenilor aparținând minorităților naționale, iar Senatul numără 136 de mandate. Repartizarea pe circumscripții se face astfel încât fiecare județ primește cel puțin patru deputați și doi senatori, indiferent de populație, ceea ce introduce o ușoară supra-reprezentare a județelor mici. Mecanismul de atribuire folosește metoda coeficientului electoral și a celor mai mari resturi la nivel de circumscripție, urmată de o redistribuire la nivel național pentru partidele care depășesc pragul electoral. Acest dublu nivel — local și național — asigură proporționalitatea de ansamblu, dar generează diferențe de cost al mandatului între circumscripții, un aspect esențial atunci când mandatele sunt regrupate pe provincii istorice."
   },
   {
    "type": "p",
    "text": "Distincția dintre circumscripția electorală (județul) și eventuala regiune administrativă este fundamentală pentru această analiză. Astăzi nu există circumscripții regionale: regiunile de dezvoltare instituite prin Legea 315/2004 sunt unități statistice fără personalitate juridică și fără rol electoral. Prin urmare, ponderea unei regiuni în Parlament este o mărime calculată, obținută prin însumarea mandatelor județelor componente, și nu rezultatul unui scrutin regional propriu-zis. Tabelul de mai jos sintetizează parametrii structurali ai sistemului actual, care constituie cadrul de referință pentru toate simulările de reprezentare regională prezentate ulterior. Aceste cifre sunt invariante de sistem și se modifică doar prin lege organică."
   },
   {
    "type": "table",
    "headers": ["Parametru de sistem", "Cameră", "Senat", "Valoare numerică"],
    "rows": [
     ["Total mandate alese", "Cameră", "—", "330"],
     ["Total mandate alese", "—", "Senat", "136"],
     ["Circumscripții electorale", "Cameră", "Senat", "43"],
     ["Mandate minime per circumscripție", "Cameră", "—", "4"],
     ["Mandate minime per circumscripție", "—", "Senat", "2"],
     ["Prag electoral partide (%)", "Cameră", "Senat", "5"]
    ]
   }
  ]
 },
 {
  "title": "Distribuția mandatelor pe județe către regiuni",
  "blocks": [
   {
    "type": "p",
    "text": "Trecerea de la circumscripția județeană la o citire regională a Parlamentului se face prin agregarea mandatelor pe provincii istorice, conform unei grile de tip S3 care grupează cele 41 de județe și municipiul București în opt mari ansambluri teritoriale: Moldova, Transilvania, Muntenia, Oltenia, Banat, Crișana-Maramureș, Dobrogea și București-Ilfov. Această grupare nu modifică numărul de mandate atribuit fiecărui județ, ci doar le regrupează pentru a evidenția ponderea politică a fiecărui spațiu istoric. Operațiunea este pur aritmetică și reversibilă: orice mandat rămâne legat de județul în care a fost obținut, dar suma per regiune dezvăluie ierarhia de greutate parlamentară pe care harta județeană o ascunde. Rezultatul este o fotografie a echilibrului de reprezentare între provinciile României."
   },
   {
    "type": "p",
    "text": "Agregarea reflectă în mod direct distribuția populației, deoarece norma de reprezentare leagă mandatele de numărul de locuitori. Moldova, cu județele sale numeroase și populate, concentrează cea mai mare delegație, în timp ce Dobrogea, formată din doar două județe, are cea mai redusă pondere. Această asimetrie nu este un viciu, ci consecința firească a principiului proporționalității: o regiune cu mai mulți cetățeni trimite mai mulți reprezentanți. Totuși, agregarea regională scoate în evidență faptul că nicio provincie istorică nu deține singură majoritatea, ceea ce face ca orice decizie parlamentară să necesite alianțe interregionale. Acest fapt structural are implicații profunde pentru modul în care s-ar negocia o reformă teritorial-administrativă, deoarece niciun bloc regional nu poate impune unilateral o soluție."
   },
   {
    "type": "p",
    "text": "Distribuția agregată pe regiuni, prezentată în tabelul următor, folosește datele de mandate atribuite circumscripțiilor conform normei de reprezentare în vigoare. Cifrele sunt orientative, întrucât atribuirea exactă variază ușor de la o legislatură la alta în funcție de recensământ și de prezența la vot, dar ordinea de mărime este stabilă și reflectă fidel ierarhia demografică a provinciilor. Citirea pe regiuni a Camerei și a Senatului oferă baza cantitativă pentru toate analizele de coaliție, de prag și de proporționalitate care urmează. Acest tablou constituie matricea de referință a întregului capitol electoral al studiului de regionalizare."
   },
   {
    "type": "table",
    "headers": ["Regiune (provincie istorică)", "Județe componente", "Deputați", "Senatori"],
    "rows": [
     ["Moldova", "8", "70", "29"],
     ["Transilvania", "8", "58", "24"],
     ["Muntenia", "9", "51", "21"],
     ["Oltenia", "5", "35", "14"],
     ["Crișana-Maramureș", "4", "33", "13"],
     ["București-Ilfov", "2", "30", "12"],
     ["Banat", "3", "25", "10"],
     ["Dobrogea", "2", "16", "7"]
    ]
   }
  ]
 },
 {
  "title": "Redistribuirea reprezentării la consilii regionale alese",
  "blocks": [
   {
    "type": "p",
    "text": "Trecerea la regiuni cu personalitate juridică ar implica instituirea unor consilii regionale alese prin vot direct, un palier reprezentativ nou care nu există astăzi. Spre deosebire de Parlamentul național, unde mandatele sunt deja distribuite, consiliile regionale ar presupune un scrutin propriu, cu circumscripții regionale și liste regionale. Mărimea fiecărui consiliu ar fi calibrată în funcție de populația regiunii, după o normă de reprezentare regională distinctă de cea parlamentară. Această redistribuire ar muta o parte din legitimitatea reprezentativă de la centru spre regiuni, fără a desființa Parlamentul, ci completând arhitectura democratică cu un nivel intermediar între județ și stat. Proiecția este una de aprofundare a democrației locale, nu de slăbire a coeziunii naționale."
   },
   {
    "type": "p",
    "text": "Dimensionarea consiliilor regionale ar urma logica gradualității: regiunile mai populate ar avea adunări mai mari, dar cu o creștere mai lentă decât proporția pură, pentru a evita consilii supradimensionate și costisitoare. O normă de reprezentare regională de ordinul a unui consilier la 30.000 de locuitori ar genera adunări de 60-130 de membri, comparabile cu consiliile regionale franceze sau cu seimicele voievodale poloneze. Alegerea ar putea fi simultană cu cea locală, pentru a reduce costurile și oboseala electorală, sau decuplată, pentru a-i conferi consiliului regional o vizibilitate proprie. Fiecare opțiune are avantaje de participare și de claritate a mandatului, iar alegerea între ele este o decizie de proiectare instituțională ce trebuie luată transparent."
   },
   {
    "type": "p",
    "text": "Redistribuirea reprezentării către consilii regionale nu este o operațiune cu sumă nulă față de Parlament, ci o adăugare de capacitate reprezentativă la nivelul cel mai potrivit pentru deciziile de dezvoltare regională. Competențele transferate — programare de fonduri, transport regional, amenajarea teritoriului — ar fi exercitate de aleși răspunzători în fața cetățenilor regiunii, ceea ce apropie decizia de cei vizați, conform principiului subsidiarității. Tabelul următor estimează mărimea orientativă a consiliilor regionale pentru o normă de un consilier la 30.000 de locuitori, ilustrând cum populația se traduce în capacitate reprezentativă regională și oferind o bază pentru dimensionarea bugetară și logistică a noului palier."
   },
   {
    "type": "table",
    "headers": ["Regiune", "Populație orientativă (mil.)", "Normă (mii loc./consilier)", "Consilieri regionali estimați"],
    "rows": [
     ["Moldova", "3,5", "30", "117"],
     ["Transilvania", "3,0", "30", "100"],
     ["Muntenia", "2,8", "30", "93"],
     ["București-Ilfov", "2,3", "30", "77"],
     ["Oltenia", "1,9", "30", "63"],
     ["Crișana-Maramureș", "1,7", "30", "57"],
     ["Banat", "1,3", "30", "43"],
     ["Dobrogea", "0,9", "30", "30"]
    ]
   }
  ]
 },
 {
  "title": "Ponderea fiecărei regiuni în Cameră și Senat",
  "blocks": [
   {
    "type": "p",
    "text": "Ponderea procentuală a fiecărei regiuni în cele două camere este indicatorul cel mai direct al greutății sale politice. Calculată ca raport între mandatele agregate ale regiunii și totalul mandatelor alese, ponderea exprimă în puncte procentuale capacitatea unei provincii de a influența votul parlamentar. Moldova, cu cea mai mare delegație, depășește o cincime din Cameră, în timp ce Dobrogea rămâne sub cinci procente. Aceste ponderi nu sunt fixe în timp absolut, dar ierarhia lor este remarcabil de stabilă, fiindcă reflectă o distribuție demografică ce se schimbă lent. Cunoașterea exactă a ponderilor este indispensabilă pentru a evalua ce combinații de regiuni pot atinge praguri decizionale și pentru a anticipa dinamica negocierilor interregionale."
   },
   {
    "type": "p",
    "text": "Diferența dintre ponderea în Cameră și ponderea în Senat este în general mică, deoarece ambele camere folosesc aceeași logică de proporționalitate populațională, cu norme diferite. Totuși, pragul minim de doi senatori per circumscripție amplifică ușor ponderea regiunilor cu multe județe mici, astfel încât o regiune fragmentată administrativ poate avea o pondere senatorială marginal mai mare decât ponderea sa demografică pură. Acest efect, deși modest, contează în Senat unde marja dintre majoritate și opoziție poate fi îngustă. Analiza comparată a celor două ponderi permite identificarea regiunilor care beneficiază de o ușoară primă de fragmentare și a celor care, dimpotrivă, sunt subreprezentate față de greutatea lor demografică reală."
   },
   {
    "type": "p",
    "text": "Reprezentarea grafică a ponderilor în Cameră evidențiază concentrarea greutății politice în primele trei-patru regiuni, care împreună depășesc jumătate din mandate. Această concentrare are o consecință practică majoră: o coaliție formată din Moldova, Transilvania și Muntenia ar controla peste jumătate din Cameră, ceea ce face din alianța celor mai populate provincii pivotul oricărei majorități. Invers, regiunile mici devin actori de echilibru, capabili să încline balanța atunci când marile blocuri sunt divizate. Graficul de mai jos ordonează regiunile după ponderea lor în Camera Deputaților, oferind o lectură imediată a ierarhiei de putere reprezentativă pe care se construiesc toate scenariile de coaliție regională."
   },
   {
    "type": "chart",
    "chartType": "hbar",
    "data": [
     ["Moldova", 21],
     ["Transilvania", 18],
     ["Muntenia", 15],
     ["Oltenia", 11],
     ["Crișana-Maramureș", 10],
     ["București-Ilfov", 9],
     ["Banat", 8],
     ["Dobrogea", 5]
    ]
   }
  ]
 },
 {
  "title": "Simulări de coaliție regională în Camera Deputaților",
  "blocks": [
   {
    "type": "p",
    "text": "Întrucât nicio regiune nu deține singură majoritatea în Camera Deputaților, controlul deciziei depinde de combinațiile interregionale. O simulare de coaliție însumează mandatele agregate ale regiunilor participante și le compară cu pragul majorității simple de 166 de mandate. Exercițiul nu presupune că regiunile votează ca blocuri monolitice — în realitate, partidele transcend granițele regionale — ci oferă o citire geografică a potențialului de coaliție, utilă pentru a înțelege unde se află centrul de greutate teritorial al puterii legislative. Simularea este un instrument analitic neutru, care nu favorizează nicio formațiune politică, ci cartografiază doar distribuția spațială a mandatelor și pragurile pe care le ating diferitele alianțe de provincii istorice."
   },
   {
    "type": "p",
    "text": "Cea mai naturală majoritate provine din alianța celor trei mari delegații — Moldova, Transilvania și Muntenia — care însumează aproape 180 de mandate, peste pragul de 166. Această combinație confirmă rolul de pivot al provinciilor populate. Alternativ, o coaliție a regiunilor periferice și mijlocii — Oltenia, Crișana-Maramureș, Banat, Dobrogea și București-Ilfov — atinge aproximativ 139 de mandate, insuficient pentru majoritate, ceea ce arată că nicio alianță care exclude integral marile provincii nu poate guverna. Acest echilibru structural garantează că orice majoritate parlamentară durabilă trebuie să includă cel puțin una dintre cele trei mari regiuni, conferindu-le un rol central în negocierile de putere fără a le permite însă dominația solitară."
   },
   {
    "type": "p",
    "text": "Simulările arată și fragilitatea coalițiilor minimale, cele care depășesc pragul cu o marjă subțire. O majoritate construită strict din Moldova plus două regiuni mijlocii poate fi vulnerabilă la defecțiuni, deoarece pierderea unui grup mic o coboară sub 166. Coalițiile cu marjă confortabilă, care adaugă o regiune de rezervă, sunt mai stabile dar presupun o bază de negociere mai largă. Tabelul următor cuantifică principalele scenarii de coaliție regională, indicând mandatele cumulate și ecartul față de pragul majorității simple, astfel încât să se poată evalua atât fezabilitatea, cât și robustețea fiecărei combinații teritoriale de putere în Camera Deputaților."
   },
   {
    "type": "table",
    "headers": ["Scenariu de coaliție regională", "Regiuni incluse (nr.)", "Prag simplu (166)", "Mandate cumulate"],
    "rows": [
     ["Moldova + Transilvania + Muntenia", "3", "166", "179"],
     ["Moldova + Transilvania + Oltenia", "3", "166", "163"],
     ["Moldova + Muntenia + București-Ilfov", "3", "166", "151"],
     ["Transilvania + Muntenia + Oltenia + Banat", "4", "166", "169"],
     ["Periferice fără mari provincii", "5", "166", "139"],
     ["Moldova + Transilvania + Banat + Dobrogea", "4", "166", "169"]
    ]
   }
  ]
 },
 {
  "title": "Pragul majorității simple 50%+1 versus constituțional 2/3",
  "blocks": [
   {
    "type": "p",
    "text": "Sistemul parlamentar românesc operează cu două praguri decizionale fundamentale, cu consecințe profund diferite pentru orice reformă teritorial-administrativă. Majoritatea simplă, de 50% plus unu din mandatele Camerei, adică 166 de deputați, este suficientă pentru adoptarea legilor ordinare și pentru susținerea guvernului. Majoritatea constituțională de două treimi, adică 220 de deputați, este necesară pentru revizuirea Constituției, urmată obligatoriu de referendum. Deoarece o regionalizare autentică, cu regiuni dotate cu personalitate juridică și competențe proprii, ar atinge organizarea administrativă a teritoriului consacrată constituțional, ea ar putea necesita pragul mai exigent de două treimi, ridicând substanțial dificultatea politică a reformei față de o simplă lege organică."
   },
   {
    "type": "p",
    "text": "Distanța dintre cele două praguri — de la 166 la 220 de mandate — este decisivă pentru strategia de reformă. O majoritate simplă poate fi adunată din alianța celor trei mari regiuni, dar pragul de două treimi impune practic un consens transregional aproape total, incluzând și o parte din regiunile mijlocii și mici. Aceasta înseamnă că o reformă constituțională a teritoriului nu poate fi impusă de o coaliție regională îngustă, ci presupune o negociere națională cuprinzătoare. Exigența pragului de 220 acționează astfel ca o garanție de stabilitate: ea împiedică modificări structurale ale statului fără un acord larg, protejând cetățenii de reorganizări teritoriale precipitate sau dictate de majorități conjuncturale și efemere."
   },
   {
    "type": "p",
    "text": "Implicația practică pentru studiul de regionalizare este că soluțiile pot fi etapizate în funcție de pragul pe care îl ating. Măsurile care nu ating nucleul constituțional — întărirea Agențiilor de Dezvoltare Regională, transferul unor competențe prin lege organică — necesită doar majoritate simplă și sunt realizabile mai rapid. Crearea unui palier regional cu aleși proprii și autonomie fiscală, dacă atinge organizarea administrativă consacrată în Constituție, ar putea cere pragul de două treimi. Tabelul următor compară cele două praguri și tipurile de decizie asociate, oferind o hartă a fezabilității juridice pentru fiecare grad de ambiție al reformei teritoriale propuse în acest studiu."
   },
   {
    "type": "table",
    "headers": ["Tip de prag", "Procent din Cameră", "Tip de decizie", "Mandate necesare"],
    "rows": [
     ["Majoritate simplă", "50% + 1", "Legi ordinare, guvern", "166"],
     ["Majoritate absolută", "50% + 1 din total", "Legi organice", "166"],
     ["Majoritate constituțională", "2/3", "Revizuire Constituție", "220"],
     ["Marjă între praguri", "—", "Sporul de consens necesar", "54"]
    ]
   }
  ]
 },
 {
  "title": "Reprezentarea în Comitetul European al Regiunilor",
  "blocks": [
   {
    "type": "p",
    "text": "Comitetul European al Regiunilor este organul consultativ al Uniunii Europene care reunește reprezentanți aleși ai colectivităților regionale și locale, oferind o voce instituțională teritoriilor în procesul legislativ european. România dispune de 15 locuri titulare și 15 supleanți în acest comitet, un număr stabilit prin tratatele Uniunii în funcție de populația țării. Aceste locuri sunt astăzi ocupate de aleși locali și județeni, deoarece România nu are încă un palier regional cu legitimitate electorală proprie. O regionalizare cu consilii regionale alese ar permite ca aceste locuri să fie ocupate de reprezentanți regionali autentici, sporind coerența dintre nivelul de programare a fondurilor europene și nivelul de reprezentare politică la Bruxelles."
   },
   {
    "type": "p",
    "text": "Distribuirea celor 15 locuri între regiuni este o decizie de echilibru între proporționalitatea demografică și principiul reprezentării minimale a fiecărui teritoriu. O alocare strict proporțională ar concentra majoritatea locurilor în regiunile populate, lăsând provinciile mici fără voce la nivel european. O alocare cu plafon minim ar garanta cel puțin un loc fiecărei regiuni, sacrificând o parte din proporționalitate în favoarea reprezentării universale. Echilibrul optim acordă regiunilor mari două locuri și regiunilor mici un loc, astfel încât toate cele opt provincii istorice să fie prezente la masa europeană. Această schemă reflectă filosofia europeană a coeziunii, care valorizează diversitatea teritorială alături de greutatea demografică."
   },
   {
    "type": "p",
    "text": "Alocarea locurilor în Comitetul European al Regiunilor are o miză strategică pentru absorbția fondurilor și pentru influența României în politica de coeziune. Un reprezentant regional care cunoaște direct nevoile teritoriului său poate susține mai eficient prioritățile regionale în avizele comitetului decât un reprezentant fără mandat regional explicit. Tabelul următor propune o distribuție orientativă a celor 15 locuri titulare pe regiuni, combinând proporționalitatea cu garanția reprezentării minimale, și ilustrează cum regionalizarea ar transforma prezența României la Bruxelles dintr-o reprezentare difuză într-una structurată pe provinciile istorice ale țării."
   },
   {
    "type": "table",
    "headers": ["Regiune", "Pondere demografică (%)", "Principiu de alocare", "Locuri CoR alocate"],
    "rows": [
     ["Moldova", "21", "Proporțional + minim", "3"],
     ["Transilvania", "18", "Proporțional + minim", "2"],
     ["Muntenia", "15", "Proporțional + minim", "2"],
     ["București-Ilfov", "9", "Proporțional + minim", "2"],
     ["Oltenia", "11", "Proporțional + minim", "2"],
     ["Crișana-Maramureș", "10", "Minim garantat", "2"],
     ["Banat", "8", "Minim garantat", "1"],
     ["Dobrogea", "5", "Minim garantat", "1"]
    ]
   }
  ]
 },
 {
  "title": "Prezența la vot pe regiuni",
  "blocks": [
   {
    "type": "p",
    "text": "Prezența la vot este un indicator esențial al sănătății democratice și al legitimității reprezentării regionale. Datele Autorității Electorale Permanente pentru scrutinele din 2024 arată variații semnificative ale participării între provinciile istorice, reflectând diferențe de cultură civică, structură demografică și dinamică urban-rural. Regiunile cu populație mai în vârstă și cu o pondere rurală mai mare tind să înregistreze prezențe mai ridicate la alegerile locale, în timp ce marile aglomerări urbane prezintă uneori o participare mai scăzută din cauza mobilității și a înregistrării electorale fragmentate. Cunoașterea acestor diferențe este indispensabilă pentru a evalua cât de reprezentativ ar fi un consiliu regional ales și pentru a anticipa nevoia de măsuri de stimulare a participării."
   },
   {
    "type": "p",
    "text": "Variația prezenței pe regiuni are consecințe directe asupra legitimității mandatelor regionale. O regiune cu prezență scăzută trimite reprezentanți aleși de o fracțiune mai mică a electoratului, ceea ce poate slăbi autoritatea morală a consiliului regional în raport cu o regiune cu participare ridicată. Această asimetrie de legitimitate nu se traduce în mandate diferite — proporționalitatea rămâne legată de populație, nu de prezență — dar afectează percepția publică și capacitatea aleșilor de a impune decizii dificile. De aceea, orice proiect de regionalizare ar trebui însoțit de o strategie de creștere a participării, prin facilitarea votului, educație civică și calendare electorale care să maximizeze accesul cetățenilor la urne în toate provinciile."
   },
   {
    "type": "p",
    "text": "Graficul de mai jos prezintă prezența orientativă la vot pe regiuni, exprimată în procente, pe baza tendințelor observate de Autoritatea Electorală Permanentă. Diferențele, deși moderate, sunt persistente și definesc un gradient geografic al participării civice. Identificarea regiunilor cu deficit de participare permite direcționarea resurselor de mobilizare electorală acolo unde sunt cel mai necesare, asigurând că viitoarele consilii regionale se vor bucura de o bază de legitimitate cât mai uniformă în întreg teritoriul. Acest indicator completează tabloul reprezentării regionale cu dimensiunea calitativă a participării, dincolo de simpla aritmetică a mandatelor."
   },
   {
    "type": "chart",
    "chartType": "bar",
    "data": [
     ["Oltenia", 62],
     ["Moldova", 58],
     ["Muntenia", 57],
     ["Crișana-Maramureș", 56],
     ["Banat", 54],
     ["Transilvania", 53],
     ["Dobrogea", 51],
     ["București-Ilfov", 49]
    ]
   }
  ]
 },
 {
  "title": "Reprezentarea minorităților naționale",
  "blocks": [
   {
    "type": "p",
    "text": "Constituția României și Legea 208/2015 garantează reprezentarea parlamentară a organizațiilor cetățenilor aparținând minorităților naționale, care primesc câte un mandat de deputat dacă obțin un număr de voturi cel puțin egal cu zece la sută din coeficientul electoral mediu naițional. Acest mecanism asigură că minoritățile care nu ating pragul electoral obișnuit își păstrează totuși o voce în Camera Deputaților, peste cele 330 de mandate alese prin proporționalitate clasică. Reprezentarea minorităților este un pilon al modelului românesc de democrație consociativă și trebuie protejată integral în orice scenariu de regionalizare, deoarece reorganizarea teritorială nu poate diminua drepturile recunoscute constituțional comunităților minoritare ale țării."
   },
   {
    "type": "p",
    "text": "Distribuția geografică a minorităților nu este uniformă, ceea ce înseamnă că regionalizarea ar avea efecte diferențiate asupra reprezentării lor. Maghiarii sunt concentrați în Transilvania și Crișana-Maramureș, romii sunt răspândiți în toate regiunile cu vârfuri în Muntenia și Oltenia, iar comunitățile germane, ucrainene, ruse-lipovenești, turce și tătare au prezențe regionale specifice — germanii în Banat și Transilvania, turcii și tătarii concentrați în Dobrogea. Un palier regional ar putea consolida reprezentarea acolo unde o minoritate este teritorial concentrată, dar ar putea dilua vocea minorităților dispersate dacă pragurile regionale ar fi prea ridicate. Proiectarea sistemului regional trebuie deci calibrată cu praguri care protejează atât minoritățile concentrate, cât și pe cele răspândite în teritoriu."
   },
   {
    "type": "p",
    "text": "Pentru ca regionalizarea să respecte principiul protecției minorităților, consiliile regionale ar trebui să prevadă mecanisme analoge celor parlamentare: locuri garantate sau praguri reduse pentru organizațiile minoritare, calibrate la realitatea demografică a fiecărei regiuni. Tabelul următor sintetizează prezența regională a principalelor minorități și mecanismul de protecție recomandat, ilustrând cum reprezentarea minorităților poate fi nu doar conservată, ci chiar întărită printr-o regionalizare atentă. Această dimensiune este esențială pentru ca reforma teritorială să consolideze coeziunea națională și să respecte angajamentele internaționale ale României privind drepturile persoanelor aparținând minorităților naționale."
   },
   {
    "type": "table",
    "headers": ["Minoritate", "Regiuni de concentrare", "Tip de distribuție", "Loc(uri) garantate recomandate"],
    "rows": [
     ["Maghiară", "Transilvania, Crișana-MM", "Concentrată", "2"],
     ["Romă", "Muntenia, Oltenia, Transilvania", "Dispersată", "3"],
     ["Germană", "Banat, Transilvania", "Concentrată", "1"],
     ["Turcă și tătară", "Dobrogea", "Concentrată", "1"],
     ["Ucraineană", "Crișana-Maramureș, Moldova", "Concentrată", "1"],
     ["Rusă-lipoveană", "Dobrogea, Moldova", "Concentrată", "1"]
    ]
   }
  ]
 },
 {
  "title": "Riscul de supra-reprezentare și sub-reprezentare",
  "blocks": [
   {
    "type": "p",
    "text": "Orice sistem electoral generează abateri de la proporționalitatea perfectă, iar regionalizarea poate amplifica sau atenua aceste abateri. Supra-reprezentarea apare atunci când o regiune deține o pondere de mandate mai mare decât ponderea sa în populație, iar sub-reprezentarea este situația inversă. Sursa principală a acestor distorsiuni în sistemul românesc este pragul minim de patru deputați și doi senatori per circumscripție, care favorizează județele mici, și deci regiunile cu multe județe puțin populate. Măsurarea riguroasă a acestor abateri este necesară pentru a evalua echitatea reprezentării regionale și pentru a corecta, prin proiectarea normei regionale, eventualele dezechilibre moștenite din arhitectura electorală actuală a circumscripțiilor județene."
   },
   {
    "type": "p",
    "text": "Indicele de abatere se calculează ca diferență între ponderea de mandate și ponderea de populație a fiecărei regiuni, exprimată în puncte procentuale. O abatere pozitivă semnalează supra-reprezentare, una negativă semnalează sub-reprezentare. Regiunile fragmentate în multe județe mici tind spre o ușoară supra-reprezentare, iar marile aglomerări urbane, precum București-Ilfov, pot fi marginal sub-reprezentate față de greutatea lor demografică reală, din cauza efectului de plafonare al normei. Aceste abateri sunt în general mici în România, semn că sistemul actual este relativ proporțional, dar ele devin relevante atunci când mandatele sunt agregate regional și când marja decizională în Parlament este îngustă, putând bascula echilibre fine de putere."
   },
   {
    "type": "p",
    "text": "Gestionarea riscului de supra și sub-reprezentare într-un sistem regionalizat presupune o normă de reprezentare transparentă și o revizuire periodică în funcție de recensământ. Dacă norma regională ar fi prea generoasă cu regiunile mici, s-ar perpetua un dezechilibru în favoarea lor; dacă ar fi strict proporțională, regiunile mari și-ar consolida dominanța. Echilibrul corect minimizează abaterea agregată, păstrând totuși o reprezentare minimală pentru fiecare provincie. Tabelul următor cuantifică abaterea de reprezentare pentru fiecare regiune, comparând ponderea de mandate cu ponderea de populație, și identifică unde se află riscurile de distorsiune ce trebuie corectate prin proiectarea atentă a viitoarei norme de reprezentare regionale."
   },
   {
    "type": "table",
    "headers": ["Regiune", "Pondere mandate (%)", "Pondere populație (%)", "Abatere (puncte, semn negativ comma)"],
    "rows": [
     ["Moldova", "21", "20", "1,0"],
     ["Transilvania", "18", "17", "1,0"],
     ["Muntenia", "15", "16", "-1,0"],
     ["București-Ilfov", "9", "12", "-3,0"],
     ["Oltenia", "11", "10", "1,0"],
     ["Crișana-Maramureș", "10", "9", "1,0"],
     ["Banat", "8", "8", "0,0"],
     ["Dobrogea", "5", "5", "0,0"]
    ]
   }
  ]
 },
 {
  "title": "Norma de reprezentare comparată cu Uniunea Europeană",
  "blocks": [
   {
    "type": "p",
    "text": "Norma de reprezentare exprimă câți cetățeni revin în medie unui ales și constituie un etalon al apropierii dintre reprezentat și reprezentant. În România, conform Legii 208/2015, norma este de aproximativ 73.000 de locuitori pentru un deputat și de circa 168.000 pentru un senator. Aceste valori plasează România într-o poziție intermediară între statele cu parlamente foarte numeroase, unde norma este mică și reprezentarea foarte fină, și cele cu camere restrânse, unde fiecare ales reprezintă o populație mai mare. Compararea normei românești cu cele europene oferă un reper obiectiv pentru a evalua dacă numărul de parlamentari este adecvat și pentru a calibra norma viitoarelor consilii regionale în raport cu practicile continentale."
   },
   {
    "type": "p",
    "text": "Formula normei de reprezentare este directă: N = P / M, unde N este norma, P este populația totală și M este numărul de mandate. Pentru Camera Deputaților, cu o populație de ordinul a 19 milioane și 330 de mandate alese, norma rezultă în jurul valorii de 57.000-73.000 de locuitori per deputat, în funcție de baza de populație folosită (rezidentă sau domiciliu). Statele federale sau puternic descentralizate, precum Germania, au norme parlamentare naționale mai mari, dar compensează prin parlamente regionale dense. Această observație este crucială pentru România: o regionalizare cu consilii alese ar putea menține o normă parlamentară națională rezonabilă, adăugând în același timp un strat de reprezentare regională fină, mai apropiată de cetățean."
   },
   {
    "type": "p",
    "text": "Compararea normelor de reprezentare arată că România nu are un Parlament supradimensionat raportat la populație, ci se situează în media europeană. Provocarea nu este reducerea numărului de parlamentari, ci adăugarea unui nivel regional care să acopere golul de reprezentare dintre județ și stat. Tabelul următor compară norma de reprezentare parlamentară a României cu cea a câtorva state europene de referință, exprimând câți cetățeni revin unui ales în camera inferioară. Acest reper permite poziționarea reformei românești în context continental și ancorarea normei regionale propuse într-o practică europeană validată, evitând atât supra-reprezentarea costisitoare, cât și sub-reprezentarea care îndepărtează cetățeanul de decizie."
   },
   {
    "type": "table",
    "headers": ["Stat", "Cameră inferioară (mandate)", "Tip de organizare", "Normă (mii loc./ales)"],
    "rows": [
     ["România", "330", "Unitar descentralizat", "73"],
     ["Polonia", "460", "Unitar regionalizat", "83"],
     ["Franța", "577", "Unitar regionalizat", "117"],
     ["Italia", "400", "Regional", "148"],
     ["Spania", "350", "Autonomii", "135"],
     ["Germania", "630", "Federal", "133"]
    ]
   }
  ]
 },
 {
  "title": "Consilii regionale: mărime, mod de alegere și mandat",
  "blocks": [
   {
    "type": "p",
    "text": "Proiectarea consiliilor regionale presupune trei decizii fundamentale: mărimea adunării, modul de alegere și durata mandatului. Mărimea trebuie să echilibreze reprezentativitatea cu funcționalitatea — un consiliu prea mic nu reflectă diversitatea regiunii, iar unul prea mare devine greoi și costisitor. Modul de alegere poate fi proporțional pe liste regionale, majoritar pe circumscripții sub-regionale, sau mixt, fiecare variantă influențând relația dintre ales și teritoriu. Durata mandatului, de regulă patru sau cinci ani, determină ritmul reînnoirii și stabilitatea politicilor regionale. Aceste alegeri de proiectare instituțională nu sunt neutre tehnic: ele modelează tipul de democrație regională pe care România îl construiește și trebuie deliberate transparent."
   },
   {
    "type": "p",
    "text": "Modul de alegere are consecințe importante asupra coeziunii interne a regiunii. Un scrutin proporțional pe listă regională unică întărește identitatea regională și viziunea de ansamblu, dar slăbește legătura dintre ales și localitatea sa de origine. Un scrutin pe circumscripții sub-regionale apropie alesul de comunitatea sa, dar riscă să fragmenteze decizia regională în interese localiste. Soluția mixtă, care combină o componentă regională cu una sub-regională, captează avantajele ambelor sisteme și este adoptată de numeroase regiuni europene. Alegerea trebuie făcută în funcție de obiectivul prioritar: dacă se urmărește consolidarea identității regionale sau menținerea ancorării locale a aleșilor în teritoriul pe care îl reprezintă."
   },
   {
    "type": "p",
    "text": "Mărimea consiliilor regionale trebuie calibrată printr-o normă de reprezentare regională distinctă, mai fină decât cea parlamentară, pentru a apropia decizia de cetățean. O normă de un consilier la 25.000-35.000 de locuitori produce adunări de dimensiuni gestionabile, comparabile cu media regiunilor europene de aceeași talie. Tabelul următor prezintă parametrii de proiectare recomandați pentru consiliile regionale românești, comparând opțiunile de mărime, mod de alegere și durată a mandatului. Aceste repere oferă decidenților o bază concretă pentru a structura noul palier reprezentativ, asigurând că el este suficient de robust pentru a-și exercita competențele, dar suficient de suplu pentru a fi eficient și economic în funcționarea sa cotidiană."
   },
   {
    "type": "table",
    "headers": ["Parametru de proiectare", "Opțiune minimală", "Opțiune recomandată", "Valoare numerică recomandată"],
    "rows": [
     ["Normă reprezentare (mii loc./consilier)", "35", "30", "30"],
     ["Mărime consiliu (membri, medie)", "45", "75", "75"],
     ["Durata mandat (ani)", "4", "5", "5"],
     ["Prag electoral regional (%)", "5", "4", "4"],
     ["Locuri garantate minorități (medie)", "1", "2", "2"]
    ]
   }
  ]
 },
 {
  "title": "Matricea mandatelor per scenariu S1, S3 și S4",
  "blocks": [
   {
    "type": "p",
    "text": "Studiul de regionalizare evaluează mai multe scenarii de organizare teritorială, fiecare cu o grilă de grupare a județelor distinctă, ceea ce conduce la matrice de mandate diferite. Scenariul S1 păstrează cele opt regiuni de dezvoltare actuale ca bază, scenariul S3 folosește gruparea pe provincii istorice utilizată în acest capitol, iar scenariul S4 propune o consolidare în mai puține macro-regiuni. Întrucât numărul total de mandate alese rămâne constant — 330 deputați și 136 senatori — diferența dintre scenarii nu stă în totalul mandatelor, ci în modul în care acestea se distribuie pe noile unități teritoriale. Compararea matricelor de mandate este esențială pentru a anticipa cum s-ar redistribui greutatea politică în funcție de granițele alese."
   },
   {
    "type": "p",
    "text": "În scenariul S3, pe provincii istorice, distribuția este cea analizată anterior, cu Moldova drept cea mai mare delegație. În scenariul S1, pe regiuni de dezvoltare, gruparea diferă: Nord-Est și Sud-Est separă spațiul moldav și dobrogean altfel decât provinciile istorice, modificând ponderile. În scenariul S4, cu macro-regiuni consolidate, mandatele se concentrează în unități și mai mari, ceea ce reduce numărul de actori regionali dar crește greutatea fiecăruia. Fiecare scenariu produce o configurație diferită de coaliții posibile și de praguri atinse, motiv pentru care decizia asupra granițelor regionale este indisociabilă de analiza consecințelor sale asupra reprezentării politice și a echilibrelor de putere în viitoarele structuri."
   },
   {
    "type": "p",
    "text": "Matricea de mandate per scenariu permite o comparație directă a numărului de unități regionale și a delegației maxime din fiecare configurație. Cu cât unitățile sunt mai puține și mai mari, cu atât delegația maximă crește și cu atât mai concentrată devine puterea regională. Cu cât unitățile sunt mai numeroase, cu atât reprezentarea este mai dispersată și mai apropiată de teritoriu. Tabelul următor sintetizează parametrii-cheie ai celor trei scenarii — numărul de unități regionale, delegația maximă în Cameră și pragul de coaliție necesar — oferind decidenților o privire de ansamblu asupra modului în care alegerea granițelor modelează arhitectura reprezentării regionale a României."
   },
   {
    "type": "table",
    "headers": ["Scenariu", "Nr. unități regionale", "Delegație maximă Cameră", "Total mandate Cameră"],
    "rows": [
     ["S1 — Regiuni de dezvoltare", "8", "64", "330"],
     ["S3 — Provincii istorice", "8", "70", "330"],
     ["S4 — Macro-regiuni consolidate", "4", "118", "330"]
    ]
   }
  ]
 },
 {
  "title": "Indicele de proporționalitate Gallagher pe scenarii",
  "blocks": [
   {
    "type": "p",
    "text": "Indicele de disproporționalitate Gallagher este instrumentul standard în știința politică pentru a măsura cât de fidel un sistem electoral traduce voturile în mandate, sau, în cazul de față, populația în reprezentare. Formula sa este LSq = √(½ × Σ(vᵢ − sᵢ)²), unde vᵢ este ponderea de populație a regiunii i, iar sᵢ este ponderea sa de mandate, ambele exprimate procentual. Un indice apropiat de zero indică o reprezentare aproape perfect proporțională, iar valori mari semnalează distorsiuni semnificative. Aplicarea acestui indice la scenariile de regionalizare permite cuantificarea obiectivă a echității fiecărei grupări teritoriale, dincolo de impresiile subiective, și oferă un criteriu măsurabil pentru alegerea configurației regionale celei mai echitabile."
   },
   {
    "type": "p",
    "text": "Calculul indicelui Gallagher pentru fiecare scenariu pornește de la abaterile regionale dintre pondere de mandate și pondere de populație, identificate în capitolul privind supra și sub-reprezentarea. Scenariile cu unități numeroase și omogene demografic tind să producă indici mici, deoarece efectul plafonului minim de mandate se diluează. Scenariile cu unități puține și foarte inegale ca populație pot genera indici mai mari, fiindcă marile macro-regiuni absorb majoritatea mandatelor în timp ce diferențele relative se accentuează. Compararea indicilor permite identificarea scenariului care minimizează disproporționalitatea, un argument tehnic puternic în favoarea unei anumite configurații, complementar criteriilor de coeziune, eficiență și viabilitate instituțională analizate în restul studiului."
   },
   {
    "type": "p",
    "text": "Graficul de mai jos prezintă valorile orientative ale indicelui Gallagher pentru cele trei scenarii principale, exprimate pe o scară unde valorile mai mici înseamnă o reprezentare mai echitabilă. Scenariul pe provincii istorice și cel pe regiuni de dezvoltare obțin indici reduși, semn de bună proporționalitate, în timp ce scenariul cu macro-regiuni consolidate prezintă un indice ușor mai ridicat din cauza concentrării mandatelor. Această măsurătoare obiectivă completează matricea de mandate cu o evaluare a calității reprezentării, oferind decidenților un criteriu cantitativ riguros pentru a alege configurația regională care echilibrează cel mai bine eficiența cu echitatea reprezentării cetățenilor în teritoriu."
   },
   {
    "type": "chart",
    "chartType": "bar",
    "data": [
     ["S3 — Provincii istorice", 2],
     ["S1 — Regiuni dezvoltare", 3],
     ["S4 — Macro-regiuni", 6]
    ]
   }
  ]
 },
 {
  "title": "Costul mandatului și echitatea între circumscripții",
  "blocks": [
   {
    "type": "p",
    "text": "Costul mandatului, înțeles ca numărul de cetățeni necesari pentru a obține un loc parlamentar într-o circumscripție, variază între județe din cauza pragului minim de patru deputați și a metodei de atribuire a resturilor. Un mandat este mai ieftin într-un județ mic, unde pragul minim garantează reprezentare unei populații reduse, și mai scump într-un județ mare, unde fiecare loc corespunde unei populații mai numeroase. Această variație a costului mandatului este sursa principală a abaterilor de la proporționalitate și are consecințe directe asupra echității dintre cetățenii diferitelor regiuni, deoarece votul unui locuitor dintr-o circumscripție mică cântărește marginal mai mult decât cel al unui locuitor dintr-o circumscripție mare."
   },
   {
    "type": "p",
    "text": "Agregarea costului mandatului la nivel regional dezvăluie un gradient subtil de echitate. Regiunile compuse din multe județe mici beneficiază de un cost mediu al mandatului mai redus, ceea ce echivalează cu o ușoară supra-reprezentare a cetățenilor lor. Marile aglomerări urbane, cu circumscripții populate, suportă un cost al mandatului mai ridicat, deci o ușoară sub-reprezentare. Deși aceste diferențe sunt mici în România, ele ridică o problemă de principiu privind egalitatea votului, consacrată constituțional. O regionalizare cu normă de reprezentare uniformă ar putea corecta aceste asimetrii, asigurând că fiecare cetățean este reprezentat cu o pondere cât mai apropiată de egalitatea democratică, indiferent de regiunea în care locuiește."
   },
   {
    "type": "p",
    "text": "Măsurarea costului mandatului pe regiuni oferă un instrument practic pentru calibrarea normei de reprezentare viitoare. Dacă obiectivul este egalitatea strictă a votului, norma regională trebuie să fie uniformă și să elimine pragurile minime distorsionante. Dacă obiectivul este protejarea regiunilor mici, un cost al mandatului ușor mai redus pentru acestea poate fi justificat. Tabelul următor estimează costul mediu al mandatului de deputat pe regiuni, exprimat în mii de locuitori per mandat, și evidențiază gradientul de echitate dintre provincii. Această analiză ancorează discuția despre reprezentare în termeni cantitativi clari, transformând principiul abstract al egalității votului într-o măsură verificabilă și comparabilă între teritorii."
   },
   {
    "type": "table",
    "headers": ["Regiune", "Deputați", "Populație orientativă (mil.)", "Cost mandat (mii loc./deputat)"],
    "rows": [
     ["București-Ilfov", "30", "2,3", "77"],
     ["Muntenia", "51", "2,8", "55"],
     ["Transilvania", "58", "3,0", "52"],
     ["Moldova", "70", "3,5", "50"],
     ["Oltenia", "35", "1,9", "54"],
     ["Banat", "25", "1,3", "52"],
     ["Crișana-Maramureș", "33", "1,7", "52"],
     ["Dobrogea", "16", "0,9", "56"]
    ]
   }
  ]
 },
 {
  "title": "Simulări de coaliție regională în Senat",
  "blocks": [
   {
    "type": "p",
    "text": "Senatul, cu cele 136 de mandate alese, reproduce la scară redusă logica de coaliție regională din Camera Deputaților, dar cu praguri și marje diferite. Majoritatea simplă în Senat necesită 69 de mandate, iar agregarea regională a senatorilor urmează aceeași ierarhie demografică: Moldova conduce cu cea mai mare delegație, urmată de Transilvania și Muntenia. Simularea de coaliție în Senat este importantă pentru că legile organice și numeroase decizii esențiale necesită acordul ambelor camere, astfel încât o majoritate în Cameră fără o majoritate corespondentă în Senat nu poate guverna eficient. Analiza separată a Senatului completează deci tabloul echilibrelor regionale de putere în ansamblul Parlamentului bicameral românesc."
   },
   {
    "type": "p",
    "text": "Coaliția celor trei mari provincii — Moldova, Transilvania și Muntenia — însumează în Senat aproximativ 74 de mandate, depășind pragul de 69 și confirmând că alianța marilor delegații asigură controlul ambelor camere. Coalițiile care exclud toate cele trei mari provincii rămân, ca și în Cameră, insuficiente pentru majoritate. Particularitatea Senatului este marja mai îngustă: cu doar 136 de mandate, fiecare grup regional cântărește relativ mai mult, iar pierderea unei delegații mici poate destabiliza mai ușor o coaliție decât în Cameră. Această sensibilitate sporită face din Senat camera unde negocierile interregionale sunt cele mai delicate și unde regiunile mijlocii dobândesc un rol de echilibru disproporționat față de greutatea lor demografică."
   },
   {
    "type": "p",
    "text": "Compararea simulărilor de coaliție din Senat cu cele din Cameră arată o concordanță de fond: aceleași alianțe ating majoritatea în ambele camere, ceea ce reflectă proporționalitatea comună a sistemului. Totuși, marjele mai strânse din Senat impun coaliții cu o rezervă de siguranță mai mare pentru a fi durabile. Tabelul următor cuantifică principalele scenarii de coaliție regională în Senat, indicând mandatele cumulate și ecartul față de pragul de 69, astfel încât să se poată aprecia fezabilitatea fiecărei alianțe în camera superioară. Această analiză paralelă garantează că strategia de reformă teritorială ține cont de necesitatea de a construi majorități concomitente în ambele camere ale Parlamentului."
   },
   {
    "type": "table",
    "headers": ["Scenariu de coaliție regională (Senat)", "Regiuni incluse (nr.)", "Prag simplu (69)", "Senatori cumulați"],
    "rows": [
     ["Moldova + Transilvania + Muntenia", "3", "69", "74"],
     ["Moldova + Transilvania + Oltenia", "3", "69", "67"],
     ["Moldova + Muntenia + București-Ilfov", "3", "69", "62"],
     ["Transilvania + Muntenia + Oltenia + Banat", "4", "69", "69"],
     ["Periferice fără mari provincii", "5", "69", "56"],
     ["Moldova + Transilvania + Crișana-MM", "3", "69", "66"]
    ]
   }
  ]
 },
 {
  "title": "Pragul electoral și efectul său regional",
  "blocks": [
   {
    "type": "p",
    "text": "Pragul electoral de cinci procente pentru partide, stabilit de Legea 208/2015, are scopul de a evita fragmentarea excesivă a Parlamentului, dar produce și efecte de redistribuire a mandatelor cu impact regional. Voturile partidelor care nu trec pragul sunt redistribuite proporțional partidelor care îl depășesc, ceea ce înseamnă că regiunile unde formațiunile mici au scoruri mari contribuie indirect la consolidarea partidelor mari. Acest mecanism, deși neutru față de teritoriu prin construcție, poate avea consecințe geografice subtile, întrucât distribuția voturilor pierdute nu este uniformă în spațiu. Înțelegerea efectului regional al pragului este utilă pentru a anticipa cum s-ar comporta un sistem regional cu praguri proprii."
   },
   {
    "type": "p",
    "text": "Un prag electoral aplicat la nivel regional, în cadrul unor consilii regionale alese, ar avea efecte diferite față de pragul național. Într-o regiune mai mică, un prag de cinci procente reprezintă un număr absolut mai redus de voturi, deci este mai ușor de atins pentru formațiuni locale, ceea ce favorizează diversitatea reprezentării regionale. Într-o regiune mare, același prag procentual cere mult mai multe voturi. Calibrarea pragului regional este deci o decizie cu miză de proporționalitate: un prag prea ridicat ar elimina vocile locale, iar unul prea scăzut ar fragmenta consiliul. Recomandarea unui prag regional moderat, de patru procente, echilibrează stabilitatea decizională cu deschiderea către pluralismul politic local al fiecărei regiuni."
   },
   {
    "type": "p",
    "text": "Efectul pragului asupra numărului de formațiuni reprezentate poate fi estimat prin compararea scenariilor de prag. Un prag mai ridicat reduce numărul de partide din consiliu și concentrează mandatele, facilitând formarea de majorități dar reducând reprezentativitatea. Un prag mai scăzut multiplică formațiunile și îngreunează guvernarea regională, dar reflectă mai fidel diversitatea preferințelor cetățenilor. Tabelul următor estimează numărul mediu de formațiuni reprezentate într-un consiliu regional în funcție de nivelul pragului electoral, oferind decidenților o bază pentru a alege pragul optim. Această analiză leagă proiectarea tehnică a sistemului electoral regional de obiectivele politice de stabilitate și de pluralism urmărite prin reformă."
   },
   {
    "type": "table",
    "headers": ["Nivel prag regional (%)", "Efect asupra reprezentării", "Stabilitate decizională", "Formațiuni medii reprezentate"],
    "rows": [
     ["3", "Pluralism ridicat", "Scăzută", "7"],
     ["4", "Echilibru recomandat", "Medie", "5"],
     ["5", "Concentrare moderată", "Ridicată", "4"],
     ["7", "Bipolarizare", "Foarte ridicată", "3"]
    ]
   }
  ]
 },
 {
  "title": "Reprezentarea diasporei și circumscripția externă",
  "blocks": [
   {
    "type": "p",
    "text": "Cetățenii români cu domiciliul sau reședința în străinătate dispun de o circumscripție electorală proprie, a 43-a, care le asigură reprezentare directă în Parlament. Această circumscripție trimite un număr de deputați și senatori stabilit în funcție de numărul de alegători înscriși și de prezența la vot, reflectând amploarea fenomenului migrației românești. Diaspora nu aparține teritorial niciunei regiuni istorice, ceea ce ridică o întrebare specifică pentru regionalizare: cum se integrează reprezentarea celor care trăiesc în afara granițelor într-o arhitectură organizată pe provincii? Tratarea distinctă a circumscripției externe este necesară pentru a nu distorsiona analiza regională internă și pentru a recunoaște specificitatea acestui electorat transnaional al României."
   },
   {
    "type": "p",
    "text": "Numărul de mandate alocate diasporei a crescut odată cu recunoașterea importanței politice și economice a comunităților românești din străinătate, ale căror remiteri contribuie semnificativ la economia națională. Reprezentarea diasporei pune însă probleme practice de organizare a votului — secții puține raportate la populație, distanțe mari, fusuri orare diferite — care afectează prezența și echitatea. O regionalizare nu schimbă statutul diasporei, dar poate inspira soluții de facilitare a votului, precum votul prin corespondență sau electronic, care să crească accesul. Diaspora rămâne un electorat aparte, a cărui voce trebuie protejată și amplificată, fără a fi forțat artificial într-o grilă regională internă căreia nu îi aparține din punct de vedere teritorial."
   },
   {
    "type": "p",
    "text": "Pentru claritate metodologică, mandatele diasporei sunt analizate separat de cele ale regiunilor interne, astfel încât totalurile regionale să rămână comparabile și necontaminate de un electorat extrateritorial. Tabelul următor sintetizează parametrii reprezentării diasporei — numărul de mandate, baza de electorat și mecanismele de vot disponibile — oferind o imagine a acestui segment specific al reprezentării românești. Includerea explicită a diasporei în analiza electorală a regionalizării asigură completitudinea tabloului reprezentativ și recunoaște că o parte importantă a cetățenilor români participă la viața democratică a țării din afara teritoriului său național, printr-un canal de reprezentare dedicat și distinct."
   },
   {
    "type": "table",
    "headers": ["Parametru diasporă", "Cameră", "Senat", "Valoare numerică"],
    "rows": [
     ["Mandate alocate circumscripției externe", "Cameră", "—", "4"],
     ["Mandate alocate circumscripției externe", "—", "Senat", "2"],
     ["Secții de votare în străinătate (mii)", "Comun", "Comun", "1"],
     ["Modalități de vot disponibile", "Comun", "Comun", "3"]
    ]
   }
  ]
 },
 {
  "title": "Bicameralismul și raportul dintre Cameră și Senat",
  "blocks": [
   {
    "type": "p",
    "text": "România are un Parlament bicameral, format din Camera Deputaților și Senat, ambele alese prin vot direct și proporțional. Spre deosebire de federațiile unde camera superioară reprezintă teritoriile, Senatul românesc nu este o cameră a regiunilor, ci o a doua cameră aleasă pe aceeași bază populațională ca și Camera Deputaților. Această simetrie ridică, în contextul regionalizării, întrebarea dacă Senatul ar putea fi reformat pentru a deveni o cameră de reprezentare regională, pe modelul Bundesrat-ului german sau al Senatului francez. O astfel de transformare ar conferi regiunilor o voce instituțională directă în legislativul național, completând consiliile regionale cu o reprezentare la nivel central."
   },
   {
    "type": "p",
    "text": "Transformarea Senatului într-o cameră a regiunilor ar fi o reformă constituțională de anvergură, necesitând pragul de două treimi și referendum. Ea ar presupune ca senatorii să fie aleși sau desemnați pe baze regionale, fiecare regiune trimițând un număr de senatori stabilit fie egal, fie proporțional cu populația. Modelul egalitar, în care fiecare regiune are același număr de senatori indiferent de mărime, ar proteja regiunile mici dar ar contraveni egalității votului. Modelul proporțional ar păstra echilibrul demografic actual. Soluția intermediară, cu un nucleu egal plus o componentă proporțională, este adoptată de numeroase camere teritoriale europene și ar putea oferi României un compromis viabil între reprezentarea teritorială și egalitatea democratică."
   },
   {
    "type": "p",
    "text": "Decizia de a reforma sau nu Senatul în direcția regională depinde de ambiția generală a regionalizării. O reformă minimală, cu consilii regionale dar fără modificarea Senatului, este realizabilă mai rapid. O reformă maximală, care transformă Senatul în cameră a regiunilor, ancorează definitiv regiunile în arhitectura statului dar cere un consens constituțional larg. Tabelul următor compară modelele de cameră superioară din câteva state europene, indicând baza de reprezentare și numărul de membri, pentru a oferi un cadru de referință decidenților români. Această comparație ajută la calibrarea ambiției reformei senatoriale în funcție de modelele validate de practica democratică europeană și de fezabilitatea politică internă."
   },
   {
    "type": "table",
    "headers": ["Stat", "Cameră superioară", "Bază de reprezentare", "Membri"],
    "rows": [
     ["România", "Senat", "Populațională (actual)", "136"],
     ["Germania", "Bundesrat", "Teritorială (landuri)", "69"],
     ["Franța", "Senat", "Colectivități locale", "348"],
     ["Italia", "Senat", "Regională", "200"],
     ["Spania", "Senat", "Mixtă teritorial-provincială", "265"]
    ]
   }
  ]
 },
 {
  "title": "Stabilitatea coalițiilor și marja de guvernare",
  "blocks": [
   {
    "type": "p",
    "text": "Stabilitatea unei guvernări nu depinde doar de atingerea pragului de majoritate, ci și de marja cu care acesta este depășit. O coaliție care controlează exact 166 de mandate în Cameră este extrem de fragilă, deoarece defecțiunea unui singur parlamentar o privează de majoritate. O coaliție cu o marjă confortabilă, de zece sau mai multe mandate peste prag, poate absorbi defecțiuni și absențe fără a-și pierde capacitatea de guvernare. Analiza marjei de guvernare este esențială în contextul regional, pentru că arată care alianțe interregionale sunt nu doar posibile, ci și durabile, distincție crucială atunci când se evaluează soliditatea unei eventuale majorități construite pe baze teritoriale."
   },
   {
    "type": "p",
    "text": "Marja de guvernare a coalițiilor regionale variază considerabil. Alianța celor trei mari provincii oferă o marjă confortabilă de peste zece mandate în Cameră, asigurând stabilitate. Coalițiile care includ doar două mari delegații plus regiuni mici ating pragul cu marje subțiri, fiind vulnerabile. Adăugarea unei regiuni de rezervă transformă o coaliție fragilă într-una robustă, dar lărgește baza de negociere și complică distribuția competențelor. Acest compromis între lățimea coaliției și marja de siguranță este o constantă a politicii parlamentare și capătă o dimensiune teritorială specifică atunci când grupurile sunt definite regional, fiecare provincie aducând atât mandate, cât și pretenții proprii la masa negocierilor."
   },
   {
    "type": "p",
    "text": "Cuantificarea marjei de guvernare pentru principalele scenarii de coaliție oferă o ierarhie a robusteții lor. Tabelul următor indică, pentru fiecare alianță regională, mandatele cumulate, pragul de majoritate și marja rezultată, permițând clasificarea coalițiilor în funcție de stabilitatea lor. Coalițiile cu marjă negativă nu ating majoritatea și sunt nefezabile, cele cu marjă subțire sunt instabile, iar cele cu marjă confortabilă sunt durabile. Această analiză transformă discuția despre coaliții dintr-un exercițiu pur aritmetic într-o evaluare a guvernabilității, oferind decidenților o hartă a alianțelor teritoriale care pot produce nu doar o majoritate de moment, ci o guvernare stabilă și capabilă să ducă la capăt reformele propuse."
   },
   {
    "type": "table",
    "headers": ["Coaliție regională", "Mandate cumulate", "Prag majoritate (166)", "Marjă (semn negativ comma)"],
    "rows": [
     ["Moldova + Transilvania + Muntenia", "179", "166", "13,0"],
     ["Transilvania + Muntenia + Oltenia + Banat", "169", "166", "3,0"],
     ["Moldova + Transilvania + Oltenia", "163", "166", "-3,0"],
     ["Moldova + Muntenia + București-Ilfov", "151", "166", "-15,0"],
     ["Periferice fără mari provincii", "139", "166", "-27,0"]
    ]
   }
  ]
 },
 {
  "title": "Participarea cetățenească dincolo de vot",
  "blocks": [
   {
    "type": "p",
    "text": "Reprezentarea democratică nu se reduce la votul periodic, ci include mecanisme de participare directă a cetățenilor la decizia regională: consultări publice, bugete participative, inițiative cetățenești și referendumuri locale. Într-o arhitectură regionalizată, aceste instrumente capătă o relevanță sporită, deoarece apropie decizia de cetățean la un nivel intermediar între localitate și stat. Un consiliu regional ales dobândește legitimitate nu doar prin scrutin, ci și prin capacitatea de a implica cetățenii în deciziile de dezvoltare care le afectează direct viața. Proiectarea regionalizării trebuie deci să prevadă explicit canale de participare, transformând regiunea dintr-un simplu palier administrativ într-un spațiu autentic de democrație participativă și de implicare civică."
   },
   {
    "type": "p",
    "text": "Bugetele participative regionale ar permite cetățenilor să decidă direct asupra unei părți din investițiile regionale, sporind transparența și încrederea în noul palier. Inițiativele cetățenești regionale ar oferi un canal de propunere legislativă de jos în sus, iar consultările obligatorii pe proiectele majore de amenajare a teritoriului ar garanta că deciziile cu impact teritorial nu se iau fără acordul comunităților vizate. Aceste mecanisme nu înlocuiesc reprezentarea aleasă, ci o completează, reducând riscul ca regiunea să fie percepută ca un nivel birocratic abstract și îndepărtat. Experiența europeană arată că regiunile cu instrumente puternice de participare directă se bucură de o legitimitate mai solidă și de o coeziune internă mai puternică între cetățeni și instituții."
   },
   {
    "type": "p",
    "text": "Eficacitatea participării cetățenești depinde de proiectarea atentă a mecanismelor și de resursele alocate. Un buget participativ care reprezintă o fracțiune semnificativă din bugetul regional are un impact real, în timp ce unul simbolic produce dezamăgire. O inițiativă cetățenească cu prag de semnături realist este accesibilă, una cu prag prohibitiv rămâne literă moartă. Tabelul următor compară mecanismele de participare cetățenească recomandate la nivel regional, indicând pragul de acces și impactul potențial al fiecăruia. Această dimensiune participativă completează analiza reprezentării alese, asigurând că regionalizarea construiește o democrație regională vie, în care cetățeanul nu este doar votant la patru sau cinci ani, ci actor permanent al deciziei."
   },
   {
    "type": "table",
    "headers": ["Mecanism de participare", "Prag de acces recomandat", "Impact potențial", "Pondere buget recomandată (%)"],
    "rows": [
     ["Buget participativ regional", "Petiție online", "Ridicat", "5"],
     ["Inițiativă cetățenească regională", "5.000 semnături", "Mediu", "0"],
     ["Consultare publică obligatorie", "Proiecte majore", "Ridicat", "0"],
     ["Referendum local regional", "10.000 semnături", "Foarte ridicat", "0"]
    ]
   }
  ]
 },
 {
  "title": "Echilibrul putere centrală - putere regională",
  "blocks": [
   {
    "type": "p",
    "text": "Orice regionalizare redesenează echilibrul dintre puterea centrală a statului și puterea regiunilor, iar găsirea punctului corect de echilibru este miza politică fundamentală a reformei. Un centralism prea accentuat golește regiunile de conținut și perpetuează distanța dintre decizie și cetățean. O descentralizare excesivă riscă să fragmenteze statul și să creeze inegalități între regiuni bogate și sărace. Echilibrul optim transferă regiunilor competențele unde proximitatea decizională aduce valoare — dezvoltare regională, transport, amenajarea teritoriului — păstrând la centru funcțiile de suveranitate și de redistribuire națională. Acest echilibru nu este static, ci trebuie ajustat în timp în funcție de capacitatea instituțională dovedită de regiuni și de evoluția nevoilor teritoriale."
   },
   {
    "type": "p",
    "text": "Repartiția competențelor între centru și regiuni urmează principiul subsidiarității, consacrat în Carta Europeană a Autonomiei Locale ratificată de România prin Legea 199/1997: deciziile se iau la nivelul cel mai apropiat de cetățean care le poate exercita eficient. Competențele de suveranitate — apărare, politică externă, monedă, justiție — rămân exclusiv naționale. Competențele de proximitate — servicii sociale locale, urbanism, transport regional — coboară la regiuni. Competențele partajate — educație, sănătate, mediu — sunt exercitate în cooperare, cu standarde naționale și execuție regională. Această stratificare a competențelor evită atât vidul decizional, cât și suprapunerea costisitoare de atribuții, asigurând că fiecare nivel de guvernare face ceea ce poate face cel mai bine."
   },
   {
    "type": "p",
    "text": "Cuantificarea echilibrului de putere se poate face prin ponderea competențelor și a resurselor bugetare alocate fiecărui nivel. Un transfer de competențe neînsoțit de transfer de resurse creează regiuni neputincioase, o capcană clasică a descentralizărilor eșuate. Tabelul următor propune o repartiție orientativă a competențelor între nivelul central, cel regional și cel local, indicând tipul de competență și nivelul responsabil. Această hartă a competențelor traduce principiul abstract al subsidiarității într-o distribuție concretă, oferind decidenților un cadru pentru a proiecta un echilibru putere centrală - putere regională care să fie atât eficient, cât și echitabil, și care să asigure coeziunea statului unitar român."
   },
   {
    "type": "table",
    "headers": ["Domeniu de competență", "Nivel responsabil", "Tip de exercitare", "Pondere resurse regionale (%)"],
    "rows": [
     ["Apărare și politică externă", "Central", "Exclusiv", "0"],
     ["Dezvoltare regională", "Regional", "Exclusiv", "30"],
     ["Transport regional", "Regional", "Exclusiv", "20"],
     ["Amenajarea teritoriului", "Regional", "Exclusiv", "15"],
     ["Educație", "Partajat", "Cooperare", "15"],
     ["Sănătate", "Partajat", "Cooperare", "20"]
    ]
   }
  ]
 },
 {
  "title": "Calendarul electoral și sincronizarea scrutinelor",
  "blocks": [
   {
    "type": "p",
    "text": "Introducerea unui nou palier reprezentativ regional ridică problema sincronizării scrutinelor: alegerile pentru consiliile regionale ar trebui organizate simultan cu cele locale, cu cele parlamentare, sau separat. Fiecare opțiune are consecințe asupra participării, costurilor și clarității mandatului. Sincronizarea cu alegerile locale economisește resurse și valorifică prezența deja ridicată la urne, dar riscă să subordoneze tema regională celei locale. Sincronizarea cu alegerile parlamentare conferă vizibilitate națională, dar poate naționaliza dezbaterea regională. Un scrutin separat oferă claritate maximă mandatului regional, dar adaugă o consultare electorală suplimentară, cu riscul de oboseală a alegătorilor și de prezență scăzută. Alegerea calendarului este o decizie strategică cu impact direct asupra legitimității."
   },
   {
    "type": "p",
    "text": "Experiența europeană oferă modele variate de sincronizare. Unele state organizează alegerile regionale concomitent cu cele locale, beneficiind de o mobilizare comună a electoratului. Altele le decuplează pentru a conferi regiunii o identitate electorală proprie. Frecvența scrutinelor influențează direct prezența: prea multe alegeri într-un interval scurt induc oboseală civică și reduc participarea, în timp ce un calendar rar și previzibil menține interesul. România, cu deja patru tipuri de scrutin — local, parlamentar, prezidențial și european — trebuie să integreze alegerile regionale fără a supraîncărca calendarul. Sincronizarea cu alegerile locale apare ca soluția cea mai economică și mai favorabilă participării, fiind recomandată ca opțiune de pornire."
   },
   {
    "type": "p",
    "text": "Estimarea efectelor calendarului asupra prezenței și costurilor permite o decizie informată. Un scrutin sincronizat cu cel local valorifică o prezență deja ridicată și reduce costurile administrative, în timp ce un scrutin separat le maximizează ambele dezavantaje. Tabelul următor compară opțiunile de calendar electoral pentru alegerile regionale, indicând prezența estimată și costul relativ al fiecăreia. Această analiză practică leagă proiectarea instituțională de realitatea operațională a organizării alegerilor, asigurând că noul palier regional este introdus printr-un calendar care maximizează legitimitatea prin participare și minimizează povara asupra cetățeanului și a bugetului public, conform principiului eficienței administrative."
   },
   {
    "type": "table",
    "headers": ["Opțiune de calendar", "Prezență estimată (%)", "Cost relativ", "Scor de fezabilitate (0-100)"],
    "rows": [
     ["Sincronizat cu alegeri locale", "55", "Scăzut", "85"],
     ["Sincronizat cu alegeri parlamentare", "52", "Mediu", "70"],
     ["Scrutin regional separat", "42", "Ridicat", "50"],
     ["Sincronizat cu alegeri europene", "48", "Mediu", "60"]
    ]
   }
  ]
 },
 {
  "title": "Femeile în reprezentarea regională",
  "blocks": [
   {
    "type": "p",
    "text": "Echilibrul de gen în reprezentarea politică este un indicator al maturității democratice și un obiectiv asumat de România prin angajamentele sale europene și internaționale. În Parlamentul actual, ponderea femeilor rămâne sub media europeană, iar reprezentarea variază între regiuni, reflectând diferențe de cultură politică și de structură a listelor electorale. Introducerea consiliilor regionale oferă o oportunitate de a corecta acest dezechilibru prin mecanisme de proiectare a listelor, precum alternanța de gen sau cotele minime de reprezentare. O regionalizare atentă la dimensiunea de gen poate transforma noul palier într-un motor de echilibrare a participării femeilor la decizia publică, depășind nivelul actual de reprezentare din legislativul național."
   },
   {
    "type": "p",
    "text": "Mecanismele de echilibrare a genului în listele regionale pot varia ca intensitate. Alternanța strictă bărbat-femeie pe listă, numită sistemul fermoarului, garantează cea mai echilibrată reprezentare. Cota minimă de reprezentare a fiecărui gen, de pildă patruzeci la sută, oferă flexibilitate menținând un prag de echilibru. Recomandarea de bune practici, fără caracter obligatoriu, este cea mai puțin constrângătoare dar și cea mai puțin eficientă. Alegerea mecanismului reflectă o opțiune de valori publice privind viteza dorită de echilibrare. Experiența statelor care au adoptat alternanța strictă arată o creștere rapidă a reprezentării femeilor, în timp ce simplele recomandări produc progrese lente și inegale între teritorii."
   },
   {
    "type": "p",
    "text": "Estimarea impactului fiecărui mecanism asupra ponderii femeilor în consiliile regionale permite o decizie fundamentată. Tabelul următor compară mecanismele de echilibrare a genului, indicând ponderea estimată a femeilor pe care fiecare l-ar produce în consiliile regionale. Această analiză arată că proiectarea sistemului electoral regional nu este neutră față de echilibrul de gen, ci poate fi un instrument deliberat de promovare a reprezentării echitabile. Includerea acestei dimensiuni în reforma teritorială asigură că regionalizarea contribuie nu doar la coeziunea teritorială, ci și la coeziunea socială și la egalitatea de șanse în participarea la decizia publică a tuturor cetățenilor României, indiferent de gen."
   },
   {
    "type": "table",
    "headers": ["Mecanism de echilibrare gen", "Grad de constrângere", "Viteză de echilibrare", "Pondere femei estimată (%)"],
    "rows": [
     ["Alternanță strictă (fermoar)", "Ridicat", "Rapidă", "48"],
     ["Cotă minimă 40%", "Mediu", "Medie", "42"],
     ["Cotă minimă 30%", "Scăzut", "Lentă", "35"],
     ["Recomandare neobligatorie", "Minim", "Foarte lentă", "28"]
    ]
   }
  ]
 },
 {
  "title": "Reprezentarea urban - rural în consiliile regionale",
  "blocks": [
   {
    "type": "p",
    "text": "Tensiunea dintre reprezentarea urbană și cea rurală este una dintre cele mai delicate probleme ale oricărui consiliu regional, deoarece interesele celor două medii diferă adesea în privința priorităților de investiții, a infrastructurii și a serviciilor publice. O regiune dominată de un mare oraș riscă să-și concentreze deciziile asupra zonei urbane, neglijând spațiul rural, în timp ce o supra-ponderare a ruralului ar putea frâna dezvoltarea polilor urbani de creștere. Proiectarea circumscripțiilor sub-regionale și a modului de alegere trebuie să asigure că ambele medii își găsesc o voce echilibrată în consiliu, conform realității lor demografice, fără ca unul să fie sistematic subordonat celuilalt în deciziile de dezvoltare regională."
   },
   {
    "type": "p",
    "text": "Echilibrul urban-rural depinde de structura demografică a fiecărei regiuni. Regiunile cu un mare centru urban dominant, precum cele organizate în jurul marilor municipii, au un electorat preponderent urban, în timp ce regiunile cu o rețea policentrică de orașe mijlocii și un spațiu rural extins prezintă un echilibru mai uniform. Un sistem de alegere pe circumscripții sub-regionale care respectă distribuția populației garantează că zonele rurale, deși mai puțin populate, trimit reprezentanți proporțional cu numărul lor, evitând marginalizarea. Acest echilibru este crucial pentru coeziunea internă a regiunii, deoarece o percepție de neglijare a ruralului ar submina legitimitatea consiliului regional și ar accentua decalajele teritoriale interne pe care reforma își propune tocmai să le reducă."
   },
   {
    "type": "p",
    "text": "Cuantificarea raportului urban-rural pe regiuni permite calibrarea sistemului electoral pentru o reprezentare echitabilă. Tabelul următor estimează ponderea populației urbane în fiecare regiune și nivelul de echilibru urban-rural rezultat, oferind o bază pentru proiectarea circumscripțiilor sub-regionale. Această analiză asigură că regionalizarea nu adâncește, ci atenuează tensiunea urban-rural, prin garantarea unei reprezentări proporționale a ambelor medii în consiliile regionale. Echilibrul urban-rural devine astfel un criteriu explicit de proiectare instituțională, complementar echilibrului de gen și protecției minorităților, în construirea unui palier regional incluziv care reflectă întreaga diversitate a teritoriului și a populației sale."
   },
   {
    "type": "table",
    "headers": ["Regiune", "Pondere populație urbană (%)", "Tip de structură", "Indice de echilibru urban-rural (0-100)"],
    "rows": [
     ["București-Ilfov", "88", "Metropolitan", "40"],
     ["Banat", "62", "Urban dominant", "70"],
     ["Transilvania", "58", "Policentric", "82"],
     ["Crișana-Maramureș", "54", "Policentric", "85"],
     ["Dobrogea", "60", "Urban-litoral", "72"],
     ["Moldova", "46", "Echilibrat rural", "78"],
     ["Muntenia", "44", "Echilibrat rural", "76"],
     ["Oltenia", "47", "Echilibrat rural", "80"]
    ]
   }
  ]
 },
 {
  "title": "Tranziția instituțională și etapizarea reformei",
  "blocks": [
   {
    "type": "p",
    "text": "Trecerea de la sistemul actual, cu regiuni de dezvoltare fără personalitate juridică, la regiuni cu consilii alese nu se poate face printr-un salt brusc, ci printr-o tranziție etapizată care minimizează riscurile și permite ajustări pe parcurs. O reformă bruscă riscă blocaje administrative, dispute privind reședințele regionale și o ruptură de continuitate în gestionarea fondurilor europene. O tranziție graduală, cu etape clare și reversibile, permite testarea fiecărui pas, consolidarea capacității instituționale și acumularea încrederii publice. Etapizarea transformă o reformă potențial traumatică într-un proces controlat, în care fiecare etapă creează condițiile pentru următoarea și în care eventualele dificultăți pot fi corectate înainte de a deveni ireversibile."
   },
   {
    "type": "p",
    "text": "Prima etapă ar consolida Agențiile de Dezvoltare Regională existente, conferindu-le mai multă autonomie și capacitate, fără modificări constituționale, deci pe baza majorității simple. A doua etapă ar transfera competențe suplimentare prin lege organică și ar pregăti cadrul pentru alegerea consiliilor regionale. A treia etapă, cea mai ambițioasă, ar institui consiliile regionale alese și, eventual, ar reforma Senatul, necesitând consensul constituțional de două treimi. Această secvențiere leagă fiecare grad de ambiție de pragul decizional corespunzător, permițând avansarea reformei pe măsură ce se construiește consensul politic. Reversibilitatea fiecărei etape oferă o garanție de prudență, evitând angajamente ireversibile înainte de validarea practică a beneficiilor reformei."
   },
   {
    "type": "p",
    "text": "Calendarul de tranziție trebuie să fie realist, prevăzând suficient timp pentru construirea capacității instituționale, pregătirea cadrului legal și organizarea alegerilor. O tranziție prea rapidă riscă improvizația, una prea lentă pierde momentul politic. Tabelul următor propune o etapizare a reformei, indicând pentru fiecare etapă pragul decizional necesar, durata estimată și gradul de reversibilitate. Această foaie de parcurs transformă viziunea regionalizării într-un plan operațional, oferind decidenților o cale concretă și prudentă de implementare. Etapizarea asigură că reforma teritorială avansează pe baze solide, cu beneficii verificabile la fiecare pas, construind treptat o democrație regională robustă și durabilă în România."
   },
   {
    "type": "table",
    "headers": ["Etapă de reformă", "Prag decizional necesar", "Reversibilitate", "Durată estimată (ani)"],
    "rows": [
     ["Consolidare ADR-uri", "Majoritate simplă (166)", "Ridicată", "2"],
     ["Transfer competențe (lege organică)", "Majoritate simplă (166)", "Medie", "3"],
     ["Consilii regionale alese", "Constituțional (220)", "Scăzută", "4"],
     ["Reformă Senat (cameră regiuni)", "Constituțional (220)", "Scăzută", "5"]
    ]
   }
  ]
 },
 {
  "title": "Indicatori de monitorizare a reprezentării regionale",
  "blocks": [
   {
    "type": "p",
    "text": "Orice reformă a reprezentării trebuie însoțită de un sistem de indicatori care să permită monitorizarea continuă a efectelor sale și ajustarea pe parcurs. Reprezentarea regională nu este un obiectiv care, odată atins, rămâne static, ci un proces dinamic ce trebuie urmărit prin măsuri obiective de proporționalitate, participare, echilibru de gen și urban-rural. Un tablou de bord al reprezentării regionale, actualizat periodic pe baza datelor electorale și demografice, oferă decidenților și cetățenilor o imagine transparentă a sănătății democrației regionale. Acești indicatori transformă principiile abstracte ale reprezentării echitabile în măsuri verificabile, permițând o guvernanță bazată pe dovezi și o responsabilizare a actorilor politici față de obiectivele asumate ale reformei."
   },
   {
    "type": "p",
    "text": "Indicatorii esențiali de monitorizare includ indicele de proporționalitate Gallagher, care măsoară fidelitatea traducerii populației în mandate; prezența la vot pe regiuni, care reflectă vitalitatea participării; ponderea femeilor și a minorităților, care indică incluziunea; și indicele de echilibru urban-rural, care semnalează coeziunea internă a regiunilor. Fiecare indicator are o țintă explicită și o cadență de raportare. Monitorizarea regulată permite identificarea precoce a derivelor — scăderea participării, accentuarea disproporționalității, marginalizarea unui grup — și declanșarea măsurilor corective. Acest sistem de supraveghere democratică este o garanție că reforma rămâne fidelă obiectivelor sale și nu degenerează în timp sub presiunea inerției sau a intereselor particulare ale unor actori."
   },
   {
    "type": "p",
    "text": "Stabilirea țintelor și a cadențelor de raportare pentru fiecare indicator structurează responsabilitatea instituțională. Un indicator fără țintă este o simplă observație; un indicator cu țintă și cadență devine un instrument de guvernanță. Tabelul următor sintetizează indicatorii recomandați de monitorizare a reprezentării regionale, indicând ținta orientativă și cadența de raportare pentru fiecare. Acest tablou de bord oferă cadrul pentru o evaluare periodică riguroasă a reformei, asigurând că regionalizarea își atinge obiectivele de reprezentare echitabilă, participativă și incluzivă. Monitorizarea continuă închide bucla reformei, transformând-o dintr-un act legislativ unic într-un proces viu de îmbunătățire permanentă a democrației regionale românești."
   },
   {
    "type": "table",
    "headers": ["Indicator de monitorizare", "Țintă orientativă", "Cadență de raportare", "Valoare-țintă numerică"],
    "rows": [
     ["Indice Gallagher (proporționalitate)", "Sub 5 puncte", "După fiecare scrutin", "5"],
     ["Prezență la vot regională (%)", "Peste 50%", "După fiecare scrutin", "50"],
     ["Pondere femei consilieri (%)", "Cel puțin 40%", "După fiecare scrutin", "40"],
     ["Indice echilibru urban-rural", "Peste 75 puncte", "Anual", "75"],
     ["Locuri minorități acoperite", "Toate garantate", "După fiecare scrutin", "9"]
    ]
   }
  ]
 },
 {
  "title": "Sinteza redistribuirii reprezentării pe regiuni",
  "blocks": [
   {
    "type": "p",
    "text": "Redistribuirea reprezentării pe regiuni reunește într-un tablou de ansamblu toate dimensiunile analizate: mandatele parlamentare agregate, consilierii regionali estimați, locurile în Comitetul European al Regiunilor și ponderea politică rezultată. Această sinteză arată cum fiecare provincie istorică s-ar regăsi în noua arhitectură reprezentativă, de la nivelul european până la cel regional. Moldova, cea mai populată, ar dispune de cea mai mare delegație la toate nivelurile, iar Dobrogea, cea mai mică, de cea mai redusă, dar fiecare ar avea o reprezentare garantată minimă. Tabloul integrat permite o evaluare globală a echilibrului regional și confirmă că redistribuirea respectă atât proporționalitatea demografică, cât și principiul reprezentării universale a teritoriilor."
   },
   {
    "type": "p",
    "text": "Lectura integrată a redistribuirii dezvăluie coerența arhitecturii propuse. Numărul de mandate parlamentare, dimensiunea consiliilor regionale și alocarea locurilor europene urmează aceeași logică demografică, asigurând că o regiune nu este simultan supra-reprezentată la un nivel și sub-reprezentată la altul. Această coerență verticală — de la regional la național și european — este o virtute a sistemului, deoarece evită contradicțiile de reprezentare care ar submina legitimitatea reformei. Cetățeanul unei regiuni se regăsește reprezentat proporțional la fiecare palier de decizie care îi afectează viața, de la consiliul regional care decide investițiile locale, până la Comitetul European al Regiunilor care influențează politica de coeziune a Uniunii Europene."
   },
   {
    "type": "p",
    "text": "Tabloul final al redistribuirii reprezentării constituie reperul cantitativ de ansamblu al întregului capitol electoral al studiului de regionalizare. El consolidează într-o singură imagine mandatele de deputat, consilierii regionali estimați și locurile europene pentru fiecare provincie istorică, oferind decidenților o privire completă asupra modului în care reforma ar redistribui reprezentarea în teritoriu. Tabelul următor sintetizează aceste mărimi pe regiuni, închizând analiza electorală cu o imagine integrată și verificabilă. Această redistribuire echilibrată a reprezentării este fundamentul democratic al regionalizării, garantând că reforma teritorială întărește, nu slăbește, vocea fiecărei regiuni și a fiecărui cetățean în arhitectura de guvernare a României."
   },
   {
    "type": "table",
    "headers": ["Regiune", "Deputați", "Consilieri regionali estimați", "Locuri CoR alocate"],
    "rows": [
     ["Moldova", "70", "117", "3"],
     ["Transilvania", "58", "100", "2"],
     ["Muntenia", "51", "93", "2"],
     ["Oltenia", "35", "63", "2"],
     ["Crișana-Maramureș", "33", "57", "2"],
     ["București-Ilfov", "30", "77", "2"],
     ["Banat", "25", "43", "1"],
     ["Dobrogea", "16", "30", "1"]
    ]
   }
  ]
 }
];
