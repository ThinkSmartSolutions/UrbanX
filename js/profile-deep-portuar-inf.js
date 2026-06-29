window._PROFILE_DEEP = window._PROFILE_DEEP || {};
window._PROFILE_DEEP['portuar_inf'] = [
  {
    title: 'Identificarea amplasamentului portuar și încadrarea cadastrală',
    blocks: [
      { type:'p', text:'Studiul de față tratează un amplasament concret situat în acvatoriul și incinta unei localități portuare maritime sau fluviale din România (de tip Constanța, Galați, Brăila, Tulcea, Mangalia, Giurgiu, Drobeta-Turnu Severin, Cernavodă sau Medgidia). Spre deosebire de un masterplan portuar regional, analiza rămâne PUNCTUALĂ pe parcela și pe dana studiate, cu cifre concrete pe lot. Identificarea cadastrală pornește de la numărul de carte funciară, suprafața măsurată, vecinătățile la nord, sud, est și vest, precum și de la limita domeniului public portuar definit conform OG 22/1999 privind administrarea porturilor și a căilor navigabile.'},
      { type:'p', text:'Încadrarea în domeniul public al statului este esențială: terenul portuar este, de regulă, concesionat de către administrația portuară (CN APM Constanța pentru zona maritimă, AFDJ Galați și APDM/APDF pentru Dunărea de Jos). Parcela analizată poate fi dană operativă, platformă de depozitare, teren de incintă tehnică sau o suprafață propusă pentru reconversie. Se precizează regimul juridic, titularul concesiunii, durata acesteia și servituțile de acces la cheu, conform contractului de concesiune și planurilor cadastrale de incintă.'},
      { type:'p', text:'Coordonatele amplasamentului se exprimă în sistemul național Stereo70 (EPSG:3844) și se verifică prin transformare în WGS84 (EPSG:4326) pentru suprapunerea peste batimetria EMODnet și peste pozițiile AIS din zona danei. Se documentează cota terenului față de nivelul Mării Negre (sistem de referință Marea Neagră 1975), respectiv cotele apei la mira hidrometrică AFDJ cea mai apropiată pentru amplasamentele fluviale. Toate aceste elemente fundamentează capitolele tehnice care urmează.'},
      { type:'table', title:'Date de identificare a amplasamentului', headers:['Parametru','Valoare/Descriere','Suprafață (mp)'], rows:[
        ['Suprafață teren incintă','Domeniu public portuar concesionat','12450'],
        ['Front la cheu','Lungime cheu aferent danei','185'],
        ['Platformă operativă','Depozitare și manipulare mărfuri','8200'],
        ['Zonă tehnică/utilități','Rețele, drum incintă, racorduri','1850']
      ]}
    ]
  },
  {
    title: 'Cadrul geografic și hidrografic al acvatoriului',
    blocks: [
      { type:'p', text:'Amplasamentul se inserează într-un context hidrografic specific: fie litoralul Mării Negre, fie albia majoră a Dunării ori a unui canal navigabil (Dunăre-Marea Neagră, canal de acces port). Caracterizarea hidrografică punctuală a acvatoriului din dreptul danei include direcția curenților locali, amplitudinea variațiilor de nivel și expunerea la valuri și la hulă. Pentru amplasamentele maritime se folosesc datele EMODnet Physics și seriile de la stațiile mareografice CN APM Constanța; pentru cele fluviale, mirele hidrometrice AFDJ Galați de pe sectorul respectiv.'},
      { type:'p', text:'Pentru amplasamentele fluviale, regimul hidrologic al Dunării la nivelul danei este descris prin nivelurile caracteristice: nivelul de etiaj (ape mici de navigație), nivelul mediu și nivelul apelor mari. Aceste niveluri se raportează la cota „0" a mirei locale și determină gradul de inundabilitate al platformei și înălțimea utilă a cheului deasupra apei. Variația sezonieră tipică pe Dunărea de Jos depășește frecvent 4-6 metri între etiaj și viitură, ceea ce condiționează direct exploatarea danei.'},
      { type:'p', text:'Acvatoriul portuar din dreptul amplasamentului se delimitează ca suprafață de apă aflată în administrarea portuară, în care se desfășoară manevrele de acostare, staționarea la dană și evoluția remorcherelor. Suprafața acvatoriului, adâncimea proiectată și raza de evoluție necesară pentru nava de calcul sunt parametri punctuali care influențează toate analizele ulterioare de batimetrie, dragaj și siguranță a navigației pe segmentul studiat.'},
      { type:'chart', chartType:'bar', title:'Niveluri caracteristice ale apei la amplasament (cm peste „0" miră)', labels:['Etiaj','Mediu multianual','Ape mari frecvente','Viitură rară'], series:[{ name:'Nivel apă', data:[40, 280, 560, 720] }] }
    ]
  },
  {
    title: 'Geotehnica generală a terenului de fundare portuar',
    blocks: [
      { type:'p', text:'Terenul de fundare al cheiurilor și danelor portuare este, în mod tipic, alcătuit din depozite aluvionare recente: nisipuri fine, prafuri argiloase, mâluri și uneori umpluturi antropice rezultate din dragaje istorice. Caracterizarea geotehnică punctuală a amplasamentului se bazează pe foraje de investigație, sondaje penetrometrice (CPT) și încercări de laborator pe probe netulburate, conform normativelor NP 074 și NP 122. Stratificația tipică prezintă o succesiune de straturi cu capacitate portantă variabilă și cu prezența quasi-permanentă a apei subterane la cote apropiate de cota apei din acvatoriu.'},
      { type:'p', text:'Prezența mâlurilor și a argilelor moi normal consolidate ridică probleme de capacitate portantă și de tasare. Rezistența la forfecare nedrenată a acestor straturi este redusă, frecvent sub 25 kPa în orizonturile superficiale, ceea ce impune fundarea indirectă pe piloți sau îmbunătățirea terenului. Nivelul ridicat al apei subterane reduce tensiunile efective și amplifică riscul de lichefiere la solicitări seismice, aspect tratat distinct pentru amplasamentele situate în zone cu accelerație seismică relevantă.'},
      { type:'p', text:'Investigația geotehnică se corelează cu istoricul amplasamentului: terenurile câștigate din apă prin umpluturi dragate au comportament eterogen și pot conține incluziuni, deșeuri sau materiale contaminate. Programul de foraje trebuie să atingă stratul de bază competent (de regulă nisipuri îndesate sau argile vârtoase) pentru a defini lungimea piloților și pentru a estima tasările diferențiale. Concluziile geotehnice generale fundamentează capitolele specializate privind cheiurile, danele și fundarea pe terenuri dragate.'},
      { type:'table', title:'Stratificație geotehnică tipică la amplasament portuar', headers:['Strat','Adâncime bază (m)','Rezistență/NSPT'], rows:[
        ['Umplutură/sol vegetal','1,5','5'],
        ['Mâl argilos moale','6,0','3'],
        ['Praf nisipos plastic','11,5','12'],
        ['Nisip mediu îndesat','18,0','28'],
        ['Argilă vârtoasă bază','25,0','35']
      ]}
    ]
  },
  {
    title: 'Geotehnica cheiurilor și a structurilor de acostare',
    blocks: [
      { type:'p', text:'Cheiurile portuare reprezintă structuri de sprijin care preiau împingerea pământului din spate și încărcările de exploatare de pe platformă, transmițându-le terenului de fundare. La amplasamentul analizat, tipul structural al cheiului (cheu de greutate din blocuri de beton, cheu pe piloți, perete de palplanșe ancorat sau chesoane) determină regimul de eforturi în teren. Verificarea geotehnică urmărește stabilitatea generală la alunecare, capacitatea portantă a terenului de bază și deformațiile orizontale ale paramentului, conform NP 074 și standardelor de proiectare a structurilor maritime.'},
      { type:'p', text:'Împingerea activă a pământului asupra paramentului se evaluează prin teoria Rankine sau Coulomb, ținând cont de prezența apei și de supraîncărcarea de pe platformă din depozitarea mărfurilor. Coeficientul de împingere activă Ka = tan²(45° − φ/2), unde φ este unghiul de frecare internă al materialului din spatele cheiului. Pentru un material de umplutură cu φ = 30°, rezultă Ka ≈ 0,33, iar presiunea crește liniar cu adâncimea, suprapusă peste presiunea hidrostatică a apei subterane echilibrate cu acvatoriul.'},
      { type:'p', text:'Stabilitatea de ansamblu a frontului de acostare se verifică la alunecare pe suprafețe potențiale ce trec prin terenul slab de fundare, mai ales în prezența mâlurilor. Coeficientul de siguranță minim se raportează la valorile normate, iar tasările cheiului trebuie limitate pentru a păstra cota de exploatare și alinierea șinelor de macara. Monitorizarea geodezică a deplasărilor cheiului este recomandată pe toată durata exploatării, cu repere fixe și măsurători periodice ale cotei coronamentului.'},
      { type:'chart', chartType:'bar', title:'Presiunea laterală pe paramentul cheiului (kPa) pe adâncime', labels:['0 m','3 m','6 m','9 m','12 m'], series:[{ name:'Presiune activă + apă', data:[12, 48, 96, 158, 232] }] }
    ]
  },
  {
    title: 'Fundarea pe terenuri aluvionare și dragate',
    blocks: [
      { type:'p', text:'Fundarea construcțiilor portuare pe terenuri aluvionare și pe umpluturi dragate ridică probleme specifice de capacitate portantă și de tasare în timp. Straturile aluvionare moi, saturate, prezintă consolidare lentă, iar umpluturile hidraulice rezultate din dragaj sunt eterogene și slab compactate. Soluția curentă este fundarea indirectă pe piloți forați sau bătuți, care străpung orizonturile slabe și transmit încărcările în stratul de bază competent. Lungimea piloților se stabilește astfel încât rezistența pe vârf și frecarea laterală să asigure capacitatea portantă cu un coeficient de siguranță adecvat.'},
      { type:'p', text:'Capacitatea portantă a unui pilot izolat se exprimă ca Rc = Rb + Rs, unde Rb este rezistența pe vârf (Rb = qb · Ab) și Rs este rezistența pe suprafața laterală (Rs = suma qsi · Asi pe straturi). Pentru piloți în nisipuri îndesate, componenta de vârf devine semnificativă, în timp ce în argile predomină frecarea laterală nedrenată. Tasarea grupului de piloți se estimează separat de cea a pilotului izolat, ținând cont de efectul de grup și de bulbul de presiuni transmis stratului profund.'},
      { type:'p', text:'Pentru platformele de depozitare fundate direct pe umpluturi, se poate recurge la îmbunătățirea terenului prin coloane de balast, vibrocompactare sau preîncărcare cu drenuri verticale, în funcție de natura materialului. Tasarea de consolidare a straturilor argiloase moi se calculează cu relația de tasare oedometrică, iar timpul de consolidare depinde de coeficientul de consolidare cv și de drumul de drenaj. Aceste alegeri tehnice influențează direct costul și termenul de execuție al investiției pe amplasamentul studiat.'},
      { type:'table', title:'Soluții de fundare în funcție de strat și încărcare', headers:['Soluție','Strat de rezemare','Capacitate utilă (kN)'], rows:[
        ['Piloți forați Ø80','Nisip îndesat 18 m','1850'],
        ['Piloți bătuți Ø50','Argilă vârtoasă 25 m','1200'],
        ['Coloane balast','Mâl îmbunătățit','320'],
        ['Radier general','Umplutură compactată','180']
      ]}
    ]
  },
  {
    title: 'Lichefierea seismică a terenurilor portuare saturate',
    blocks: [
      { type:'p', text:'Terenurile portuare nisipoase, fine și saturate, sunt susceptibile la lichefiere în cazul solicitărilor seismice, fenomen prin care pământul își pierde temporar rezistența la forfecare din cauza creșterii presiunii apei din pori. Pentru amplasamentele situate în zone cu accelerație seismică de proiectare relevantă (conform P100-1), evaluarea potențialului de lichefiere este obligatorie. Se compară raportul tensiunilor ciclice induse de cutremur (CSR) cu raportul de rezistență la lichefiere al terenului (CRR), pe baza rezultatelor CPT sau SPT corectate.'},
      { type:'p', text:'Factorul de siguranță la lichefiere se calculează ca FS = CRR / CSR, evaluat pe straturi, la diferite adâncimi. Valori subunitare indică straturi susceptibile de lichefiere, cu consecințe asupra fundațiilor: pierderea capacității portante, tasări post-seismice și deplasări laterale ale cheiurilor (lateral spreading) către acvatoriu. La amplasamente portuare, deplasarea laterală a malurilor către apă este unul dintre cele mai frecvente moduri de avariere seismică observate la nivel mondial.'},
      { type:'p', text:'Măsurile de atenuare includ fundarea pe piloți care străpung stratul lichefiabil, îmbunătățirea terenului prin compactare dinamică sau coloane de piatră, precum și sisteme de drenaj care disipează presiunea apei din pori. Pentru amplasamentul studiat se recomandă corelarea evaluării de lichefiere cu microzonarea seismică locală și cu istoricul comportamentului structurilor portuare existente. Concluziile se integrează în proiectarea fundațiilor cheiurilor și a halelor de pe platformă.'},
      { type:'chart', chartType:'bar', title:'Factor de siguranță la lichefiere pe adâncime', labels:['3 m','6 m','9 m','12 m','15 m'], series:[{ name:'FS lichefiere', data:[0.8, 0.9, 1.1, 1.4, 1.8] }] }
    ]
  },
  {
    title: 'Batimetria canalului navigabil la amplasament',
    blocks: [
      { type:'p', text:'Batimetria descrie relieful fundului acvatoriului și al canalului navigabil de acces la dană, fiind determinantă pentru stabilirea pescajului maxim admis al navelor care pot opera la amplasament. Ridicările batimetrice se realizează cu ecosonde multifascicul, raportate la nivelul de referință al portului. Pentru amplasamentele maritime se folosesc datele CN APM Constanța și EMODnet Bathymetry; pentru cele fluviale, ridicările AFDJ Galați pe sectorul respectiv al Dunării, unde adâncimea variază cu regimul hidrologic.'},
      { type:'p', text:'Adâncimea minimă de navigație necesară se calculează cu relația adâncime = pescaj + rezervă sub chilă, unde rezerva sub chilă (UKC, under keel clearance) acoperă efectul de squat la viteză, denivelările fundului, eroziunile și marja de siguranță. Pentru o navă cu pescaj de 9,0 m și o rezervă sub chilă de 1,5 m, adâncimea minimă necesară la dană este de 10,5 m. Pe sectoarele fluviale, adâncimea disponibilă scade la etiaj, ceea ce limitează încărcătura navelor pe perioade prelungite ale anului.'},
      { type:'p', text:'Profilul batimetric transversal al canalului de acces și al bazinului de evoluție stabilește lățimea utilă pentru manevra navei de calcul. Zonele de colmatare, unde aluviunile se depun preferențial, sunt identificate prin compararea ridicărilor batimetrice succesive și impun un program de dragaj de întreținere. Cartarea batimetrică punctuală a amplasamentului fundamentează atât exploatarea curentă, cât și planificarea lucrărilor de dragaj tratate în capitolul următor.'},
      { type:'table', title:'Batimetrie la amplasament și cerințe de navigație', headers:['Element','Adâncime/Cotă','Valoare (cm)'], rows:[
        ['Adâncime proiectată la dană','Cota de exploatare','1050'],
        ['Adâncime minimă necesară','Pescaj + UKC','1050'],
        ['Adâncime reală măsurată','Ridicare batimetrică','980'],
        ['Deficit de dragat','Diferență de adâncire','70']
      ]}
    ]
  },
  {
    title: 'Dragajul de întreținere și gestionarea sedimentelor dragate',
    blocks: [
      { type:'p', text:'Dragajul de întreținere menține adâncimea proiectată a canalului navigabil și a bazinelor portuare, contracarând colmatarea naturală prin depunerea aluviunilor. Frecvența și volumul lucrărilor de dragaj la amplasament se estimează din rata de colmatare măsurată prin ridicări batimetrice succesive. Volumul de dragat se calculează ca diferență între suprafața fundului existent și cota proiectată, integrată pe aria de dragaj, exprimată în metri cubi. Lucrările sunt coordonate de administrația portuară (AFDJ Galați pentru Dunăre, CN APM Constanța pentru zona maritimă).'},
      { type:'p', text:'Gestionarea sedimentelor dragate ridică probleme de mediu reglementate de Legea 292/2018 privind evaluarea impactului asupra mediului și de convențiile internaționale privind imersiunea materialelor dragate. Sedimentele trebuie caracterizate chimic înainte de evacuare: prezența metalelor grele, a hidrocarburilor sau a poluanților organici persistenți condiționează depunerea în depozite controlate sau valorificarea ca material de umplutură. Sedimentele curate pot fi reutilizate pentru reabilitarea malurilor sau pentru câștigarea de teren.'},
      { type:'p', text:'Tehnologia de dragaj (drăgi cu cupe, draglină, drăgi aspiratoare-refulante sau cu hopper) se alege în funcție de natura sedimentelor și de distanța de evacuare. Impactul temporar al dragajului asupra calității apei (turbiditate, resuspensia sedimentelor contaminate) se gestionează prin perdele antiturbiditate și prin programarea lucrărilor în afara perioadelor sensibile pentru ihtiofaună. Costurile recurente de dragaj reprezintă o componentă majoră a cheltuielilor de exploatare a amplasamentului.'},
      { type:'chart', chartType:'bar', title:'Volum estimat de dragaj de întreținere (mii mc/an)', labels:['An 1','An 2','An 3','An 4','An 5'], series:[{ name:'Volum dragat', data:[42, 38, 51, 47, 44] }] }
    ]
  },
  {
    title: 'Traficul maritim și fluvial la amplasament',
    blocks: [
      { type:'p', text:'Caracterizarea traficului de nave la amplasament se realizează prin analiza datelor de poziționare automată AIS (Automatic Identification System), agregate prin platforme de tip MarineTraffic și prin statisticile administrației portuare. Se contabilizează numărul de escale la dană, tipul navelor (vrachiere, portcontainere, tancuri, nave fluviale de mărfuri generale), tonajul brut și tonajul de mărfuri manipulate. Pentru amplasamentele fluviale, traficul include barje și convoaie împinse, iar pentru cele maritime, nave de tonaj mai mare condiționate de pescaj.'},
      { type:'p', text:'Analiza punctuală a traficului la dană se concentrează pe utilizarea efectivă a frontului de acostare: numărul mediu de escale pe lună, durata medie de staționare la dană și gradul de ocupare al cheiului. Aceste mărimi se compară cu capacitatea teoretică pentru a identifica rezervele de capacitate sau congestiile. Datele AIS permit reconstrucția traiectoriilor de acostare și a timpilor de manevră, utile pentru optimizarea operării și pentru evaluarea siguranței navigației pe segment.'},
      { type:'p', text:'Evoluția traficului la amplasament se interpretează în context sezonier: traficul fluvial scade în perioadele de etiaj sau de gheață, iar cel maritim variază cu fluxurile comerciale. Statisticile Eurostat privind transportul de mărfuri pe căi navigabile și maritime oferă reperul macro, dar analiza rămâne ancorată la dana studiată. Concluziile privind traficul fundamentează dimensionarea capacității danei și estimarea emisiilor și a poluării asociate operării navelor.'},
      { type:'table', title:'Trafic anual la dana analizată', headers:['Indicator','Tip','Valoare'], rows:[
        ['Escale nave/an','Acostări la dană','310'],
        ['Mărfuri manipulate','Tone/an','485000'],
        ['Durată medie staționare','Ore/escală','22'],
        ['Grad ocupare cheu','Procent','64']
      ]}
    ]
  },
  {
    title: 'Capacitatea danei și performanța operațională',
    blocks: [
      { type:'p', text:'Capacitatea danei reprezintă volumul maxim de marfă pe care frontul de acostare îl poate manipula într-un interval de timp, în condiții normale de exploatare. Pentru danele de containere, capacitatea se exprimă în TEU pe oră și pe an, fiind dată de relația capacitate = numărul de macarale × productivitatea pe macara (TEU/oră) × ore operative pe an × coeficient de utilizare. Pentru danele de vrac, capacitatea se exprimă în tone pe oră, determinată de debitul instalațiilor de manipulare (benzi transportoare, graifere, instalații pneumatice).'},
      { type:'p', text:'Performanța operațională a danei se evaluează prin indicatori precum productivitatea macaralei (mișcări pe oră), timpul de staționare al navei la dană și raportul dintre timpul efectiv de operare și timpul total de prezență. Pentru o dană cu o macara de cheu capabilă de 25 mișcări pe oră și o utilizare de 70%, capacitatea orară efectivă este de aproximativ 17,5 TEU pe oră. Întârzierile la operare (vreme, manevre, lipsă camioane sau vagoane) reduc capacitatea reală sub valoarea teoretică.'},
      { type:'p', text:'Estimarea capacității permite confruntarea cu cererea de trafic și identificarea necesarului de investiții pe amplasament: macarale suplimentare, extinderea platformei de depozitare sau modernizarea racordurilor feroviare. Analiza rămâne punctuală pe dana studiată și nu se confundă cu planificarea de capacitate la nivel de port sau de coridor logistic regional, care face obiectul studiului superior. Concluziile servesc proiectului tehnic și planului de exploatare al investitorului.'},
      { type:'chart', chartType:'bar', title:'Capacitate teoretică vs realizată la dană (mii tone/an)', labels:['Capacitate teoretică','Realizat an curent','Realizat an precedent','Potențial cu investiție'], series:[{ name:'Volum', data:[720, 485, 461, 640] }] }
    ]
  },
  {
    title: 'Poluarea apei în acvatoriul portuar',
    blocks: [
      { type:'p', text:'Calitatea apei în acvatoriul portuar din dreptul amplasamentului este influențată de operarea navelor, de scurgerile de pe platforme, de manipularea mărfurilor și de aporturile din bazinul hidrografic. Parametrii monitorizați includ oxigenul dizolvat, încărcarea organică, nutrienții (azot, fosfor), hidrocarburile totale și metalele grele. Cadrul de evaluare urmează Directiva-cadru Apă și standardele de calitate de mediu, monitorizarea fiind în responsabilitatea Agenției pentru Protecția Mediului (APM) și a administratorului bazinal ANAR.'},
      { type:'p', text:'Acvatoriile portuare sunt corpuri de apă puternic modificate, cu circulație redusă și tendință de acumulare a poluanților în sedimente. La amplasamentul studiat, sursele punctuale de poluare includ apele de spălare a platformelor, pierderile la manipularea mărfurilor pulverulente și eventualele scurgeri de hidrocarburi de la nave și de la instalațiile de bunkeraj. Concentrarea poluanților în sedimentele de pe fundul bazinului ridică probleme la dragaj, fiind necesară caracterizarea chimică prealabilă tratată anterior.'},
      { type:'p', text:'Măsurile de reducere a poluării apei includ colectarea separată și epurarea apelor pluviale de pe platforme prin separatoare de hidrocarburi, interzicerea spălării necontrolate a calelor și recepția apelor uzate de la nave la facilități portuare dedicate. Monitorizarea periodică a calității apei în acvatoriu, raportată APM, permite urmărirea tendințelor și verificarea conformării. Aceste aspecte se corelează cu capitolele privind deșeurile de navă și poluarea accidentală cu hidrocarburi.'},
      { type:'table', title:'Indicatori de calitate a apei în acvatoriu', headers:['Parametru','Valoare măsurată','Prag SCM'], rows:[
        ['Oxigen dizolvat (mg/l)','5,8','6'],
        ['Hidrocarburi totale (mg/l)','0,18','0,30'],
        ['Azot total (mg/l)','2,4','3'],
        ['Plumb sediment (mg/kg)','42','70']
      ]}
    ]
  },
  {
    title: 'Zgomotul portuar în regim de 24 de ore',
    blocks: [
      { type:'p', text:'Activitatea portuară generează zgomot continuu, datorat operării macaralelor, manipulării mărfurilor, traficului de vehicule grele, motoarelor auxiliare ale navelor la dană și instalațiilor de manipulare a vracului. Spre deosebire de multe activități urbane, portul funcționează în regim de 24 de ore, ceea ce face critic indicatorul de zgomot pe perioada de noapte. Evaluarea acustică se realizează conform Directivei 2002/49/CE privind zgomotul ambiental și a legislației naționale de transpunere, prin măsurători și modelare a propagării.'},
      { type:'p', text:'Indicatorul Lden (day-evening-night level) integrează nivelurile de zgomot pe trei perioade, penalizând seara și noaptea: Lden = 10·log[(12·10^(Lday/10) + 4·10^((Leve+5)/10) + 8·10^((Lnight+10)/10))/24]. Penalizarea de 5 dB pentru seară și de 10 dB pentru noapte reflectă disconfortul sporit perceput în aceste perioade. Pentru zonele rezidențiale aflate la limita incintei portuare, valorile Lden și Lnight se compară cu valorile-țintă de expunere stabilite de reglementări.'},
      { type:'p', text:'Modelarea propagării zgomotului de la sursele portuare către receptorii rezidențiali ține cont de distanță, de ecranele acustice naturale și construite și de atenuarea atmosferică. Hărțile strategice de zgomot, întocmite pentru aglomerările și pentru porturile importante, identifică zonele de conflict acustic. Pentru amplasamentul studiat se evaluează contribuția proprie la nivelul ambiental și se propun măsuri de atenuare, detaliate în capitolul dedicat impactului rezidențial.'},
      { type:'chart', chartType:'bar', title:'Niveluri de zgomot la limita incintei portuare (dB)', labels:['Lday','Leve','Lnight','Lden'], series:[{ name:'Nivel sonor', data:[68, 65, 60, 69] }] }
    ]
  },
  {
    title: 'Impactul rezidențial al zgomotului și interfața cu locuirea',
    blocks: [
      { type:'p', text:'Multe porturi românești sunt înconjurate de zone rezidențiale dezvoltate istoric în proximitatea apei și a activităților economice. Interfața dintre incinta portuară operativă și locuințe generează conflicte de utilizare, în special pe componenta acustică, dar și prin pulberi, vibrații și trafic greu. La amplasamentul studiat se identifică receptorii sensibili (locuințe, școli, spitale) aflați în raza de influență acustică și se evaluează expunerea acestora pe perioada de noapte, când disconfortul este maxim.'},
      { type:'p', text:'Reducerea impactului rezidențial se realizează prin măsuri la sursă (echipamente cu emisie redusă, limitarea operațiunilor zgomotoase pe timp de noapte), pe calea de propagare (ecrane acustice, perdele vegetale, distanțe de protecție) și la receptor (izolarea fonică a clădirilor expuse). Alimentarea cu energie de la mal a navelor la dană (shore power) elimină zgomotul și emisiile motoarelor auxiliare pe durata staționării, fiind o măsură eficientă la interfața port-oraș.'},
      { type:'p', text:'Planificarea urbană la interfața port-oraș urmărește separarea funcțiilor incompatibile prin zone tampon, reglementarea utilizărilor admise în vecinătatea incintei portuare și protejarea zonelor rezidențiale prin documentațiile de urbanism. Concluziile privind impactul rezidențial se corelează cu reglementările locale de zonare și cu eventualele propuneri de reconversie a terenurilor portuare dezafectate, tratate într-un capitol distinct privind waterfront-ul.'},
      { type:'table', title:'Receptori sensibili în raza de influență acustică', headers:['Receptor','Distanță față de incintă','Expunere Lnight (dB)'], rows:[
        ['Cartier locuințe nord','120 m','58'],
        ['Școală','340 m','51'],
        ['Locuințe individuale est','85 m','62'],
        ['Spital','520 m','46']
      ]}
    ]
  },
  {
    title: 'Pulberi și emisii din manipularea mărfurilor vrac',
    blocks: [
      { type:'p', text:'Manipularea mărfurilor vrac solide (cărbune, minereuri, cereale, îngrășăminte, clincher) generează emisii de pulberi în atmosferă în timpul descărcării, încărcării, depozitării și transportului pe platformă. Fracțiunile fine de pulberi în suspensie (PM10 și PM2,5) sunt relevante pentru sănătate și fac obiectul monitorizării calității aerului conform Directivei 2008/50/CE și a legislației naționale, sub coordonarea APM. La amplasamentul studiat se evaluează tipul mărfurilor manipulate, cantitățile și potențialul de generare a pulberilor.'},
      { type:'p', text:'Emisia de pulberi depinde de granulometria materialului, de umiditate, de viteza vântului și de metoda de manipulare. Vântul care spulberă materialul de pe stive (eroziune eoliană) este o sursă difuză importantă în porturile cu depozite deschise de vrac. Estimarea emisiilor difuze folosește factori de emisie raportați la tonajul manipulat și la condițiile meteorologice locale, datele de calitate a aerului fiind corelate cu stațiile de monitorizare APM din proximitate și cu măsurători OpenAQ acolo unde sunt disponibile.'},
      { type:'p', text:'Măsurile de reducere a emisiilor de pulberi includ umectarea stivelor și a căilor de circulație, capsularea benzilor transportoare, instalarea de bariere paravânt, manipularea în spații închise și aspirarea pulberilor la punctele de transfer. Pentru cerealele care generează praf inflamabil se aplică și măsuri de prevenire a exploziilor. Monitorizarea PM10 la limita incintei verifică eficiența măsurilor și conformarea cu valorile-limită, protejând zonele rezidențiale învecinate.'},
      { type:'chart', chartType:'bar', title:'Concentrații PM10 la limita incintei (µg/mc)', labels:['Iarnă','Primăvară','Vară','Toamnă'], series:[{ name:'PM10 mediu', data:[38, 31, 44, 35] }] }
    ]
  },
  {
    title: 'Emisii atmosferice de la nave și echipamente portuare',
    blocks: [
      { type:'p', text:'Pe lângă pulberile din vrac, activitatea portuară generează emisii de gaze de combustie de la motoarele navelor (la manevră și la dană), de la utilajele de manipulare (macarale, stivuitoare) și de la traficul rutier și feroviar din incintă. Poluanții relevanți sunt oxizii de azot (NOx), oxizii de sulf (SOx), pulberile și compușii organici volatili. Reglementarea emisiilor navelor urmează Anexa VI MARPOL, care limitează conținutul de sulf al combustibililor și emisiile de NOx în funcție de zona de navigație.'},
      { type:'p', text:'La amplasamentul studiat, emisiile navelor la dană sunt generate în principal de motoarele auxiliare care produc energia electrică și termică pe durata staționării (hotelling). Aceste emisii pot fi eliminate prin alimentarea cu energie de la mal (cold ironing / shore power), care permite navei să oprească motoarele auxiliare. Inventarul de emisii la dană se estimează din puterea motoarelor auxiliare, durata staționării și factorii de emisie specifici combustibilului utilizat.'},
      { type:'p', text:'Reducerea emisiilor atmosferice contribuie la conformarea cu obiectivele de calitate a aerului și la reducerea expunerii populației din vecinătate. Măsurile includ electrificarea echipamentelor portuare, utilizarea combustibililor cu conținut redus de sulf, infrastructura de shore power și optimizarea fluxurilor de trafic în incintă pentru a reduce timpii de mers în gol. Aceste măsuri se corelează cu Agenția Europeană de Mediu (EEA), care raportează emisiile transportului maritim și fluvial.'},
      { type:'table', title:'Inventar estimativ de emisii la amplasament (tone/an)', headers:['Sursă','Poluant principal','Cantitate'], rows:[
        ['Nave la dană','NOx','38'],
        ['Utilaje manipulare','NOx','22'],
        ['Trafic rutier incintă','PM','6'],
        ['Manipulare vrac','PM10','14']
      ]}
    ]
  },
  {
    title: 'Managementul deșeurilor de navă conform MARPOL',
    blocks: [
      { type:'p', text:'Navele care operează la amplasament generează deșeuri care trebuie predate la facilități portuare de recepție, conform Convenției MARPOL și Directivei 2019/883/UE privind instalațiile portuare de preluare a deșeurilor de la nave. Deșeurile sunt clasificate pe anexe MARPOL: Anexa I (reziduuri de hidrocarburi, ape de santină), Anexa IV (ape uzate menajere), Anexa V (gunoi/deșeuri solide), Anexa VI (reziduuri de la sistemele de epurare a gazelor). Portul trebuie să dispună de facilități adecvate pentru fiecare categorie.'},
      { type:'p', text:'Anexa V MARPOL reglementează gunoiul de la nave, interzicând în general descărcarea în apă și impunând predarea la facilitățile portuare. La amplasamentul studiat se evaluează fluxul de deșeuri solide generat de navele care escală la dană, capacitatea de recepție și sistemul de evidență. Mecanismul de finanțare indirectă (no-special-fee) încurajează predarea deșeurilor prin includerea costului în taxa portuară, descurajând deversarea ilegală în acvatoriu sau în larg.'},
      { type:'p', text:'Apele de santină și reziduurile de hidrocarburi (Anexa I) necesită facilități de recepție și instalații de tratare sau stocare temporară înainte de valorificare ori eliminare prin operatori autorizați. Trasabilitatea deșeurilor de navă se asigură prin notificarea prealabilă a navei și prin confirmarea predării. Concluziile privind managementul deșeurilor de navă se corelează cu riscul de poluare accidentală cu hidrocarburi și cu protecția calității apei din acvatoriu.'},
      { type:'chart', chartType:'bar', title:'Deșeuri de navă predate la amplasament (mc/an)', labels:['Anexa I hidrocarburi','Anexa IV ape uzate','Anexa V gunoi','Anexa VI reziduuri'], series:[{ name:'Volum', data:[185, 240, 96, 28] }] }
    ]
  },
  {
    title: 'Riscul de poluare accidentală cu hidrocarburi',
    blocks: [
      { type:'p', text:'Operarea navelor, bunkerajul (alimentarea cu combustibil) și manipularea produselor petroliere la dană generează risc de poluare accidentală cu hidrocarburi în acvatoriul portuar. Un deversaj de hidrocarburi se răspândește rapid la suprafața apei, afectând calitatea apei, sedimentele, fauna acvatică și malurile. La amplasamentul studiat se evaluează probabilitatea unui eveniment de poluare, sursele potențiale (conducte de bunkeraj, transfer de produse, avarii la nave) și consecințele asupra mediului și exploatării.'},
      { type:'p', text:'Răspândirea unei pete de hidrocarburi pe apă liniștită urmează legi de împrăștiere gravitațională, vâscoasă și de tensiune superficială, suprafața acoperită crescând rapid în primele ore. Pe Dunăre, curentul transportă pata în aval, complicând intervenția; în acvatoriul maritim, vântul și curenții litorali determină deriva. Planul de intervenție în caz de poluare prevede baraje plutitoare de izolare, skimmere de recuperare, materiale absorbante și capacități de stocare temporară a produsului recuperat.'},
      { type:'p', text:'Prevenirea poluării accidentale se bazează pe proceduri stricte de transfer al produselor, pe echipamente de izolare permanent disponibile la dană și pe instruirea personalului. Cadrul de răspuns urmează planurile naționale și convențiile internaționale (OPRC). Autoritatea Navală Română și administrația portuară coordonează intervenția. Concluziile privind riscul de poluare accidentală fundamentează dotările de siguranță ale amplasamentului și se integrează în evaluarea de risc a investiției.'},
      { type:'table', title:'Scenarii de poluare accidentală și răspuns', headers:['Scenariu','Volum estimat (l)','Timp intervenție (min)'], rows:[
        ['Scurgere la bunkeraj','500','15'],
        ['Avarie furtun transfer','2000','30'],
        ['Deversaj santină navă','800','25'],
        ['Avarie majoră tanc','15000','60']
      ]}
    ]
  },
  {
    title: 'Reconversia terenurilor portuare dezafectate (waterfront)',
    blocks: [
      { type:'p', text:'Multe orașe portuare dispun de terenuri portuare dezafectate sau subutilizate, situate la interfața cu țesutul urban, care pot face obiectul reconversiei (regenerare waterfront). La amplasamentul studiat, dacă parcela și-a pierdut funcția operativă portuară, se evaluează potențialul de reconversie către funcțiuni urbane mixte: locuire, servicii, spații publice, agrement și cultură. Reconversia trebuie să respecte regimul juridic al domeniului public portuar și eventuala dezafectare a acestuia conform OG 22/1999.'},
      { type:'p', text:'Reconversia waterfront-ului ridică probleme tehnice specifice: contaminarea istorică a solului și a apei subterane din activitățile portuare anterioare, stabilitatea cheiurilor menținute ca element de coastă, accesul public la apă și integrarea cu rețeaua de mobilitate urbană. Investigația de mediu a amplasamentului (situri potențial contaminate) precede orice schimbare de funcțiune, conform legislației privind siturile contaminate, iar remedierea solului poate fi necesară înainte de dezvoltarea rezidențială.'},
      { type:'p', text:'Modelele de regenerare waterfront din experiența europeană (foste bazine portuare transformate în cartiere mixte) oferă repere de bună practică, dar soluția rămâne adaptată la specificul local și la dana studiată. Reconversia păstrează, de regulă, elemente de patrimoniu industrial-portuar (macarale, magazii, cheiuri) ca martori ai identității locului. Concluziile se corelează cu reglementările urbanistice locale și cu capitolul privind interfața port-oraș.'},
      { type:'chart', chartType:'bar', title:'Distribuția funcțiunilor propuse la reconversie (% suprafață)', labels:['Locuire','Servicii/comerț','Spațiu public','Cultură/agrement','Tehnic'], series:[{ name:'Pondere', data:[35, 25, 22, 12, 6] }] }
    ]
  },
  {
    title: 'Inundabilitatea fluvială și apele mari la amplasament',
    blocks: [
      { type:'p', text:'Amplasamentele portuare fluviale sunt expuse inundabilității în perioadele de ape mari ale Dunării, când nivelul apei depășește cota platformei sau a cheiului. Evaluarea inundabilității la amplasament pornește de la nivelurile maxime istorice înregistrate la mira AFDJ Galați cea mai apropiată și de la nivelurile asociate diferitelor probabilități de depășire. Cota de inundabilitate se compară cu cota platformei pentru a determina adâncimea apei și durata de inundare în scenariile de risc.'},
      { type:'p', text:'Cota de inundabilitate fluvială corespunzătoare unei probabilități de depășire se determină din curba de probabilitate a nivelurilor maxime anuale la mira locală. Pentru un nivel cu probabilitate de depășire de 1% (perioada de revenire de 100 de ani), cota apei se raportează la cota „0" a mirei și se transpune în sistemul de cote al portului. Adâncimea apei pe platformă = cota inundație − cota platformă, iar atunci când este pozitivă, platforma este inundată cu consecințe directe asupra exploatării și a bunurilor depozitate.'},
      { type:'p', text:'Măsurile de protecție includ ridicarea cotei platformelor sensibile, prevederea de praguri și diguri de incintă, sisteme de pompare a apei infiltrate și planuri de evacuare a mărfurilor și echipamentelor în caz de avertizare hidrologică. Hărțile de hazard și de risc la inundații, întocmite conform Directivei 2007/60/CE, încadrează amplasamentul în clasele de risc. Concluziile fundamentează cota minimă de amplasare a construcțiilor și măsurile de adaptare la regimul hidrologic.'},
      { type:'table', title:'Niveluri de inundație și expunerea platformei', headers:['Probabilitate depășire','Cota apei (cm peste „0")','Adâncime pe platformă (cm)'], rows:[
        ['10% (10 ani)','620','0'],
        ['1% (100 ani)','720','40'],
        ['0,5% (200 ani)','760','80'],
        ['Maxim istoric','745','65']
      ]}
    ]
  },
  {
    title: 'Accesul rutier la dană și fluxurile de transport greu',
    blocks: [
      { type:'p', text:'Operarea danei depinde de accesul rutier pentru evacuarea și aducerea mărfurilor, generând fluxuri de vehicule grele care interacționează cu rețeaua stradală urbană. La amplasamentul studiat se analizează geometria drumului de acces în incintă, capacitatea portantă a platformelor și a drumurilor, raza de manevră pentru ansambluri lungi și punctele de conflict cu traficul urban. Datele de configurație rutieră se preiau din OpenStreetMap și se verifică pe teren, corelate cu programul de operare al danei.'},
      { type:'p', text:'Fluxul de camioane generat de dană se estimează din tonajul manipulat și din capacitatea medie de încărcare a unui vehicul: numărul de camioane pe zi = tonaj zilnic / capacitate medie pe camion / factor de utilizare. Pentru un tonaj zilnic de 1500 de tone evacuate rutier și o capacitate medie de 25 de tone, rezultă aproximativ 60 de transporturi pe zi, fiecare cu cursă dus-întors. Concentrarea acestor fluxuri în orele de program intensifică presiunea pe rețeaua urbană adiacentă.'},
      { type:'p', text:'Reducerea conflictelor cu traficul urban se realizează prin separarea accesului portuar de rețeaua locală, prin parcaje de așteptare (buffer) pentru camioane, prin programarea sosirilor (truck appointment systems) și prin promovarea transferului modal către calea ferată și transportul fluvial. Aceste măsuri rămân la nivel de amplasament și se disting de planificarea conectivității multimodale la scară regională. Concluziile se corelează cu capitolul feroviar și cu evaluarea de siguranță rutieră.'},
      { type:'chart', chartType:'bar', title:'Distribuția orară a sosirilor de camioane la dană', labels:['6-9','9-12','12-15','15-18','18-21'], series:[{ name:'Camioane', data:[14, 18, 12, 11, 5] }] }
    ]
  },
  {
    title: 'Accesul feroviar la dană și racordul de incintă',
    blocks: [
      { type:'p', text:'Transportul feroviar este esențial pentru porturile care manipulează mărfuri vrac și containere în cantități mari, oferind un transfer modal eficient și cu impact redus față de transportul rutier. La amplasamentul studiat se analizează racordul feroviar de incintă: numărul de linii, lungimea utilă de garare, raza minimă a curbelor, capacitatea de manevră și conexiunea la rețeaua CFR. Starea liniilor, sistemul de manevră și echiparea (electrificare, semnalizare) condiționează capacitatea de transfer.'},
      { type:'p', text:'Capacitatea de transfer feroviar al danei se estimează din lungimea utilă a liniilor, numărul de vagoane care pot fi încărcate simultan și ciclul de manevră. Un tren complet de marfă transportă echivalentul a zeci de camioane, ceea ce reduce semnificativ presiunea rutieră asupra orașului. Eficiența transferului depinde de coordonarea dintre operarea navei, depozitarea pe platformă și formarea garniturilor feroviare, fiind un punct critic al lanțului logistic la nivel de amplasament.'},
      { type:'p', text:'Modernizarea racordului feroviar de incintă (reabilitarea liniilor, automatizarea manevrei, extinderea capacității de garare) poate fi necesară pentru a valorifica potențialul danei și pentru a promova transferul modal. Aceste intervenții rămân la nivelul amplasamentului și se disting de planificarea coridoarelor feroviare regionale și a rețelei TEN-T, tratate în studiul superior. Concluziile se integrează în programul de investiții și în evaluarea de capacitate a danei.'},
      { type:'table', title:'Caracteristici ale racordului feroviar de incintă', headers:['Element','Descriere','Valoare (m)'], rows:[
        ['Lungime utilă linie 1','Garare/încărcare','420'],
        ['Lungime utilă linie 2','Garare/manevră','380'],
        ['Rază minimă curbă','Geometrie incintă','180'],
        ['Distanță la racord CFR','Legătură rețea','650']
      ]}
    ]
  },
  {
    title: 'Siguranța și securitatea portuară (cod ISPS)',
    blocks: [
      { type:'p', text:'Securitatea instalațiilor portuare este reglementată de Codul internațional pentru securitatea navelor și a instalațiilor portuare (ISPS), adoptat în cadrul Convenției SOLAS, și de Regulamentul (CE) 725/2004 privind consolidarea securității navelor și a instalațiilor portuare. La amplasamentul studiat se evaluează nivelul de securitate aplicabil, perimetrul de acces controlat, sistemele de supraveghere, controlul accesului persoanelor și vehiculelor și planul de securitate al instalației portuare. Aceste cerințe sunt obligatorii pentru danele care deservesc nave în trafic internațional.'},
      { type:'p', text:'Evaluarea de securitate a instalației portuare identifică amenințările (acces neautorizat, sabotaj, contrabandă), vulnerabilitățile și măsurile de contracarare proporționale cu cele trei niveluri de securitate ISPS. Perimetrul incintei trebuie delimitat fizic, cu puncte de control al accesului, iluminare, camere de supraveghere și personal de securitate. Trasabilitatea accesului persoanelor și vehiculelor în zona securizată se asigură prin sisteme de identificare și înregistrare.'},
      { type:'p', text:'Pe lângă securitate, siguranța operațională a amplasamentului acoperă prevenirea accidentelor de muncă, manipularea în condiții de siguranță a mărfurilor periculoase, stingerea incendiilor și protecția împotriva accidentelor majore (Seveso, pentru depozite de substanțe periculoase). Planurile de urgență internă și coordonarea cu serviciile de intervenție completează cadrul de siguranță. Concluziile privind siguranța și securitatea se integrează în autorizarea funcționării amplasamentului portuar.'},
      { type:'bullets', items:[
        'Perimetru fizic delimitat cu control acces persoane și vehicule',
        'Sisteme de supraveghere video și iluminare de securitate',
        'Plan de securitate ISPS pentru cele trei niveluri',
        'Proceduri pentru mărfuri periculoase și prevenirea accidentelor majore',
        'Plan de urgență internă și coordonare cu intervenția'
      ]}
    ]
  },
  {
    title: 'Manipularea mărfurilor periculoase (IMDG) la amplasament',
    blocks: [
      { type:'p', text:'Dacă amplasamentul manipulează mărfuri periculoase (produse chimice, gaze, produse petroliere, îngrășăminte), se aplică reglementări specifice de transport și depozitare: Codul maritim internațional al mărfurilor periculoase (IMDG) pentru transportul maritim, ADN pentru transportul fluvial de mărfuri periculoase pe Dunăre și legislația națională privind depozitarea substanțelor periculoase. La amplasamentul studiat se inventariază tipurile de mărfuri periculoase, cantitățile și clasele de pericol asociate.'},
      { type:'p', text:'Manipularea mărfurilor periculoase impune segregarea claselor incompatibile, zone dedicate de depozitare cu retenții pentru scurgeri, sisteme de detecție a gazelor și de stingere a incendiilor, precum și proceduri stricte de transfer. Pentru depozitele care depășesc pragurile de substanțe periculoase se aplică Directiva Seveso III, cu obligații de raportare, evaluare de risc de accident major și planuri de urgență. Distanțele de siguranță față de receptorii sensibili se stabilesc prin evaluarea consecințelor scenariilor de accident.'},
      { type:'p', text:'Trasabilitatea mărfurilor periculoase, notificarea prealabilă a sosirilor și coordonarea cu autoritățile de intervenție reduc riscul de accident major. La amplasamentele fluviale, conformarea cu ADN se verifică prin certificate și prin documentele de transport. Concluziile privind mărfurile periculoase se corelează cu riscul de poluare accidentală, cu securitatea portuară și cu evaluarea de impact asupra mediului a activității.'},
      { type:'table', title:'Inventar mărfuri periculoase la amplasament', headers:['Categorie','Clasă pericol','Cantitate (tone)'], rows:[
        ['Îngrășăminte','5.1 oxidanți','3200'],
        ['Produse petroliere','3 inflamabile','1800'],
        ['Produse chimice','8 corozive','640'],
        ['Gaze comprimate','2 gaze','120']
      ]}
    ]
  },
  {
    title: 'Echiparea tehnică a danei și instalațiile de manipulare',
    blocks: [
      { type:'p', text:'Echiparea tehnică a danei determină tipul de mărfuri care pot fi operate și productivitatea manipulării. La amplasamentul studiat se inventariază instalațiile existente: macarale de cheu (mobile sau pe șine), benzi transportoare pentru vrac, instalații de încărcare/descărcare pneumatice, buncăre, silozuri și echipamente de manipulare a containerelor. Capacitatea de ridicare, raza de acțiune și viteza de operare ale fiecărui echipament definesc performanța frontului de acostare.'},
      { type:'p', text:'Pentru danele de vrac, debitul instalațiilor de manipulare (tone pe oră) este parametrul critic, în timp ce pentru cele de containere contează numărul de mișcări pe oră ale macaralei. Starea tehnică a echipamentelor, vechimea și necesarul de mentenanță sau de înlocuire influențează disponibilitatea operațională. Electrificarea echipamentelor reduce emisiile și costurile de operare față de utilajele cu motoare diesel, contribuind la obiectivele de mediu ale amplasamentului.'},
      { type:'p', text:'Modernizarea echipării tehnice (macarale cu capacitate sporită, automatizarea manipulării, sisteme de cântărire și trasabilitate) poate crește capacitatea danei fără extinderea frontului de acostare. Investițiile în echipamente se evaluează în raport cu cererea de trafic și cu tipul mărfurilor previzionate. Concluziile privind echiparea tehnică se corelează cu estimarea capacității danei și cu programul de investiții al amplasamentului.'},
      { type:'chart', chartType:'bar', title:'Debit de manipulare pe tip de instalație (tone/oră)', labels:['Macara cheu','Bandă transportoare','Instalație pneumatică','Graifer'], series:[{ name:'Debit', data:[180, 600, 250, 320] }] }
    ]
  },
  {
    title: 'Platforma de depozitare și capacitatea de stocare',
    blocks: [
      { type:'p', text:'Platforma de depozitare din spatele danei asigură tamponarea fluxurilor între nave și mijloacele de transport terestru, fiind un element-cheie al capacității de operare. La amplasamentul studiat se evaluează suprafața platformei, capacitatea portantă (esențială pentru stivuirea mărfurilor grele și pentru circulația utilajelor), drenajul și organizarea spațială a zonelor de depozitare. Pentru containere, capacitatea se exprimă în TEU stocabile, iar pentru vrac, în tone, în funcție de înălțimea admisă a stivelor.'},
      { type:'p', text:'Capacitatea de stocare a platformei se calculează din suprafața utilă, densitatea de stocare (TEU sau tone pe metru pătrat) și coeficientul de utilizare care ține cont de culoarele de circulație. Timpul mediu de staționare a mărfii pe platformă (dwell time) determină rulajul: capacitate anuală = capacitate instantanee × (365 / dwell time mediu). Reducerea timpului de staționare prin fluidizarea evacuării crește capacitatea efectivă fără extinderea fizică a platformei.'},
      { type:'p', text:'Pentru mărfurile sensibile (cereale, produse care necesită protecție față de intemperii) se prevăd magazii acoperite sau silozuri, cu capacitate dedicată. Drenajul platformelor și colectarea apelor pluviale (cu separatoare de hidrocarburi) protejează acvatoriul de poluare. Concluziile privind platforma de depozitare se corelează cu capacitatea danei, cu fluxurile de transport terestru și cu managementul apelor pluviale tratat distinct.'},
      { type:'table', title:'Capacitatea de depozitare a platformei', headers:['Zonă','Tip marfă','Capacitate (tone/TEU)'], rows:[
        ['Platformă descoperită','Vrac/containere','18500'],
        ['Magazie acoperită','Mărfuri generale','4200'],
        ['Siloz','Cereale','9000'],
        ['Zonă containere','TEU','1200']
      ]}
    ]
  },
  {
    title: 'Managementul apelor pluviale de pe platforme',
    blocks: [
      { type:'p', text:'Apele pluviale care spală platformele portuare antrenează pulberi, reziduuri de mărfuri și hidrocarburi, putând polua acvatoriul dacă sunt deversate netratate. La amplasamentul studiat se evaluează sistemul de colectare a apelor pluviale, pantele platformei, rețeaua de canalizare pluvială și instalațiile de tratare. Debitul de calcul al apelor pluviale se determină din intensitatea ploii de proiectare, suprafața bazinului de colectare și coeficientul de scurgere al suprafețelor impermeabile.'},
      { type:'p', text:'Debitul pluvial se estimează cu metoda rațională Q = c · i · A, unde c este coeficientul de scurgere (apropiat de 0,9 pentru platforme betonate), i este intensitatea ploii de proiectare și A este aria bazinului. Apele colectate trec prin separatoare de hidrocarburi și, după caz, prin bazine de retenție și decantare înainte de evacuare, pentru a reține poluanții. Pentru zonele cu mărfuri pulverulente sau periculoase se prevăd sisteme separate, cu retenție și tratare adaptată.'},
      { type:'p', text:'Calitatea efluentului pluvial evacuat în acvatoriu trebuie să respecte limitele de descărcare, monitorizate periodic și raportate APM și ANAR. Soluțiile de drenaj durabil (suprafețe permeabile acolo unde este posibil, infiltrare controlată) reduc volumele și încărcarea poluantă. Concluziile privind managementul apelor pluviale se corelează cu poluarea apei în acvatoriu și cu emisiile de pulberi din manipularea vracului.'},
      { type:'chart', chartType:'bar', title:'Debit pluvial de calcul pe zone ale platformei (l/s)', labels:['Zonă vrac','Zonă containere','Zonă tehnică','Drum incintă'], series:[{ name:'Debit', data:[180, 95, 42, 68] }] }
    ]
  },
  {
    title: 'Eroziunea malurilor și protecția cheiurilor fluviale',
    blocks: [
      { type:'p', text:'Malurile fluviale și structurile de cheu sunt expuse eroziunii produse de curentul Dunării, de valurile generate de nave (hula de navă) și de variațiile rapide de nivel. La amplasamentele fluviale, eroziunea malului poate compromite stabilitatea cheiului și a platformelor adiacente. La amplasamentul studiat se evaluează intensitatea eroziunii prin compararea profilurilor de mal în timp și prin analiza vitezei curentului în dreptul danei, corelată cu datele AFDJ privind regimul hidrologic.'},
      { type:'p', text:'Hula generată de navele care trec sau manevrează în apropierea malului produce solicitări ciclice ce desprind materialul de pe taluz, în special la nivelul de oscilație al apei. Protecția malurilor se realizează prin anrocamente (blocuri de piatră), saltele de gabioane, dale de beton sau structuri de cheu verticale. Dimensionarea protecției ține cont de viteza maximă a curentului, de înălțimea valului de navă și de granulometria materialului de protecție necesar pentru stabilitate.'},
      { type:'p', text:'Monitorizarea stării malurilor și a cheiurilor prin inspecții batimetrice și topografice periodice permite intervenția preventivă înainte de avariere. Subspălarea bazei cheiului (afuierea) este un mecanism periculos care poate duce la prăbușirea structurii. Concluziile privind eroziunea și protecția malurilor se corelează cu geotehnica cheiurilor și cu programul de dragaj de întreținere, asigurând durabilitatea infrastructurii de acostare.'},
      { type:'table', title:'Parametri de eroziune și protecție a malului', headers:['Parametru','Descriere','Valoare'], rows:[
        ['Viteză maximă curent (cm/s)','La viitură','185'],
        ['Înălțime hulă navă (cm)','La trecere','45'],
        ['Greutate bloc anrocament (kg)','Stabilitate','450'],
        ['Adâncime afuiere observată (cm)','La bază cheu','55']
      ]}
    ]
  },
  {
    title: 'Microclimatul portuar și expunerea la vânt',
    blocks: [
      { type:'p', text:'Amplasamentele portuare, mai ales cele maritime, sunt expuse unui regim de vânt intens, care influențează operarea navelor, dispersia pulberilor și siguranța manipulării cu macarale. La amplasamentul studiat se caracterizează roza vânturilor (direcțiile și frecvențele dominante), viteza medie și rafalele maxime, pe baza datelor de la stația meteo cea mai apropiată. Expunerea la vânt condiționează limitele operaționale ale macaralelor și manevrele de acostare ale navelor de tonaj mare cu suprafață velică mare.'},
      { type:'p', text:'Vântul determină eroziunea eoliană a stivelor de vrac și transportul pulberilor către zonele rezidențiale, aspect corelat cu capitolul privind pulberile. Direcția dominantă a vântului față de poziția receptorilor sensibili stabilește orientarea optimă a depozitelor și amplasarea barierelor paravânt. Pentru macaralele de cheu, operarea se suspendă la depășirea unei viteze-limită a vântului (frecvent în jur de 20 m/s), ceea ce reduce disponibilitatea operațională în zilele cu vânt puternic.'},
      { type:'p', text:'Microclimatul portuar include și efectul brizei mării/uscatului la amplasamentele maritime, ceața care reduce vizibilitatea și afectează navigația, precum și fenomenele de îngheț care, pe Dunăre, pot bloca temporar navigația. Aceste elemente se integrează în planificarea operării și în evaluarea disponibilității amplasamentului. Concluziile privind microclimatul se corelează cu emisiile de pulberi și cu siguranța operării.'},
      { type:'chart', chartType:'bar', title:'Frecvența direcțiilor de vânt la amplasament (%)', labels:['N','NE','E','SE','S','SV','V','NV'], series:[{ name:'Frecvență', data:[18, 12, 9, 7, 11, 14, 16, 13] }] }
    ]
  },
  {
    title: 'Ihtiofauna și biodiversitatea acvatoriului',
    blocks: [
      { type:'p', text:'Acvatoriile portuare, deși puternic antropizate, găzduiesc faună acvatică și se află uneori în proximitatea unor zone protejate (situri Natura 2000, arii de importanță pentru păsări sau pentru migrația peștilor). La amplasamentele dunărene, sectorul este parte a unui ecosistem fluvial cu valoare pentru ihtiofauna migratoare (sturioni, specii protejate). La amplasamentul studiat se evaluează prezența speciilor sensibile, conectivitatea ecologică și impactul activităților portuare asupra habitatelor acvatice.'},
      { type:'p', text:'Principalele presiuni asupra biodiversiteții acvatice sunt: dragajul (distrugerea habitatelor de fund, resuspensia sedimentelor), zgomotul subacvatic de la nave și lucrări, poluarea apei, modificarea malurilor și speciile invazive transportate prin apa de balast a navelor. Convenția privind apa de balast (BWM) reglementează tratarea acesteia pentru a preveni transferul de specii invazive între acvatorii. Evaluarea impactului asupra biodiversiteții urmează Legea 292/2018 și legislația ariilor protejate.'},
      { type:'p', text:'Măsurile de protecție includ programarea dragajului în afara perioadelor de reproducere și migrație, perdele antiturbiditate, reducerea zgomotului subacvatic și gestionarea apei de balast. Acolo unde amplasamentul este în vecinătatea unor situri Natura 2000, evaluarea adecvată a impactului este obligatorie. Concluziile privind biodiversitatea acvatică se corelează cu dragajul, cu calitatea apei și cu evaluarea de mediu a investiției portuare.'},
      { type:'bullets', items:[
        'Verificarea proximitții față de situri Natura 2000 și arii protejate',
        'Programarea dragajului în afara perioadelor de reproducere/migrație',
        'Perdele antiturbiditate la lucrările în acvatoriu',
        'Gestionarea apei de balast conform Convenției BWM',
        'Evaluare adecvată acolo unde impactul atinge habitate protejate'
      ]}
    ]
  },
  {
    title: 'Patrimoniul subacvatic și arheologia portuară',
    blocks: [
      { type:'p', text:'Acvatoriile și malurile portuare istorice pot conține vestigii arheologice subacvatice: epave, structuri portuare antice, ancore și obiecte de valoare patrimonială. La amplasamentele cu istorie portuară îndelungată (Constanța antică Tomis, porturile dunărene), riscul de a întâlni patrimoniu subacvatic în timpul dragajului sau al lucrărilor de fundare este real. La amplasamentul studiat se verifică existența unor descoperiri anterioare și a unor zone cu potențial arheologic semnalat de Repertoriul Arheologic Național.'},
      { type:'p', text:'Convenția UNESCO privind protecția patrimoniului cultural subacvatic și legislația națională privind protejarea patrimoniului arheologic impun proceduri de descărcare de sarcină arheologică înainte de lucrările care afectează subsolul sau fundul apei. Investigațiile geofizice subacvatice (sonar cu scanare laterală, magnetometrie) pot identifica anomalii înainte de intervenții. Descoperirile fortuite în timpul lucrărilor obligă la sistarea acestora și la notificarea autorităților de patrimoniu.'},
      { type:'p', text:'Integrarea patrimoniului portuar în proiectele de reconversie waterfront poate valoriza identitatea locului, prin conservarea și expunerea elementelor istorice. Pentru amplasamentul studiat, dimensiunea de patrimoniu se evaluează proporțional cu potențialul arheologic local și se corelează cu reglementările de protecție. Concluziile se integrează în avizele necesare și în planificarea lucrărilor de dragaj și fundare.'},
      { type:'p', text:'În absența unor descoperiri documentate, se recomandă totuși clauze de descoperire fortuită în contractele de execuție și instruirea personalului. Acolo unde amplasamentul se suprapune peste zone protejate de patrimoniu, avizul autorității competente precede autorizarea construirii. Această abordare prudentă protejează atât patrimoniul, cât și investitorul de întârzieri și sancțiuni.'}
    ]
  },
  {
    title: 'Iluminatul incintei portuare și poluarea luminoasă',
    blocks: [
      { type:'p', text:'Funcționarea în regim de 24 de ore impune iluminarea intensă a danelor, platformelor și căilor de circulație, generând poluare luminoasă care afectează zonele rezidențiale învecinate și mediul. La amplasamentul studiat se evaluează sistemul de iluminat: tipul corpurilor, nivelurile de iluminare cerute pentru operarea în siguranță și dispersia luminii către exterior. Iluminarea trebuie să asigure nivelurile de securitate și de muncă, limitând totodată lumina parazită către cer și către locuințe.'},
      { type:'p', text:'Nivelurile de iluminare necesare pentru operarea portuară variază pe zone: căile de circulație, platformele de manipulare și zonele de control al accesului au cerințe diferite, exprimate în lucși. Excesul de iluminare și orientarea necorespunzătoare a corpurilor generează disconfort luminos pentru rezidenți și consum energetic ridicat. Corpurile de iluminat cu distribuție controlată, ecranate, și telegestiunea (reducerea fluxului în perioadele fără activitate) reduc poluarea luminoasă și costurile.'},
      { type:'p', text:'Trecerea la iluminat LED cu temperatură de culoare adecvată și cu control al direcției reduce atât consumul, cât și impactul asupra mediului nocturn și asupra rezidenților. Iluminatul de securitate al perimetrului ISPS se corelează cu cerințele de supraveghere. Concluziile privind iluminatul se corelează cu impactul rezidențial al activității portuare și cu eficiența energetică a amplasamentului.'},
      { type:'table', title:'Niveluri de iluminare pe zone ale amplasamentului', headers:['Zonă','Cerință funcțională','Nivel (lx)'], rows:[
        ['Platformă manipulare','Operare echipamente','50'],
        ['Cale circulație','Trafic vehicule','20'],
        ['Punct control acces','Securitate','100'],
        ['Perimetru incintă','Supraveghere','15']
      ]}
    ]
  },
  {
    title: 'Alimentarea cu energie de la mal (shore power)',
    blocks: [
      { type:'p', text:'Alimentarea cu energie de la mal (shore power, cold ironing) permite navelor să oprească motoarele auxiliare pe durata staționării la dană, eliminând emisiile și zgomotul asociate. Pentru porturile aflate în vecinătatea zonelor rezidențiale, această tehnologie aduce un beneficiu major de calitate a aerului și de reducere a zgomotului nocturn. La amplasamentul studiat se evaluează necesarul de putere electrică al navelor care escală, infrastructura de racordare și capacitatea rețelei de a susține cererea.'},
      { type:'p', text:'Necesarul de putere se estimează din puterea medie consumată de navele la dană pe durata hotellingului. Energia evitată = putere medie hotelling × durata staționării × numărul de escale, iar emisiile evitate se calculează aplicând factorii de emisie ai combustibilului naval. Investiția în infrastructura de shore power (transformatoare, prize standardizate, sisteme de conversie de frecvență) se justifică prin reducerea emisiilor și prin cerințele europene de echipare a porturilor TEN-T cu alimentare electrică la mal.'},
      { type:'p', text:'Implementarea shore power la amplasament se corelează cu disponibilitatea energiei electrice și cu sursa acesteia (impactul de mediu este maxim când energia provine din surse regenerabile). Standardizarea conexiunilor (IEC/ISO/IEEE 80005) asigură compatibilitatea cu flota. Concluziile privind alimentarea de la mal se corelează cu emisiile atmosferice, cu zgomotul portuar și cu obiectivele de mediu ale amplasamentului.'},
      { type:'chart', chartType:'bar', title:'Emisii evitate prin shore power (tone/an)', labels:['NOx','SOx','PM','CO2 (×100)'], series:[{ name:'Reducere', data:[28, 9, 5, 42] }] }
    ]
  },
  {
    title: 'Vibrațiile induse de activitatea portuară',
    blocks: [
      { type:'p', text:'Activitățile portuare grele (descărcarea vracului prin cădere, circulația vehiculelor grele, manevra trenurilor, baterea piloților la lucrări de construcție) generează vibrații care se propagă prin teren și pot afecta clădirile învecinate și confortul rezidenților. La amplasamentul studiat se evaluează sursele de vibrații, nivelurile de viteză de oscilație a particulelor și distanța până la receptorii sensibili. Propagarea vibrațiilor depinde puternic de natura terenului, terenurile aluvionare moi transmiținд vibrațiile pe distanțe mai mari.'},
      { type:'p', text:'Evaluarea vibrațiilor se raportează la valoarea maximă a vitezei de oscilație a particulelor (PPV, peak particle velocity), comparată cu pragurile de la care apar avarii structurale sau disconfort uman. Baterea piloților în timpul construcției este sursa cea mai intensă, putând necesita monitorizare a clădirilor adiacente și soluții alternative (piloți forați în loc de bătuți) acolo unde receptorii sunt apropiați. Vibrațiile din exploatarea curentă sunt, de regulă, sub pragurile de avariere, dar pot genera disconfort.'},
      { type:'p', text:'Măsurile de reducere a vibrațiilor includ alegerea tehnologiilor de manipulare cu impact redus, mentenanța echipamentelor și a căilor de rulare, precum și soluții de fundare care limitează transmiterea către teren. Pentru lucrările de construcție se elaborează un plan de monitorizare a vibrațiilor la receptorii sensibili. Concluziile privind vibrațiile se corelează cu impactul rezidențial și cu geotehnica terenului de fundare.'},
      { type:'table', title:'Niveluri de vibrații pe surse și distanțe', headers:['Sursă','Distanță (m)','PPV (mm/s)'], rows:[
        ['Batere piloți','25','8'],
        ['Descărcare vrac','40','3'],
        ['Trafic feroviar','30','2'],
        ['Trafic rutier greu','15','4']
      ]}
    ]
  },
  {
    title: 'Geometria acvatoriului și bazinul de evoluție',
    blocks: [
      { type:'p', text:'Manevra navelor în acvatoriul portuar necesită un bazin de evoluție cu dimensiuni suficiente pentru întoarcerea și acostarea navei de calcul. La amplasamentul studiat se verifică dacă geometria acvatoriului permite manevra în siguranță a navei maxime previzionate. Diametrul bazinului de evoluție (turning circle) se dimensionează în funcție de lungimea navei de calcul, fiind, conform recomandărilor de proiectare, de circa 1,5 până la 2 ori lungimea navei în absența remorcherelor.'},
      { type:'p', text:'Lățimea canalului de acces se dimensionează pentru a permite trecerea navei de calcul cu marja de siguranță laterală necesară, ținând cont de curent, vânt și de eventualul trafic în ambele sensuri. Pentru navigația într-un singur sens, lățimea canalului = lățimea navei × factor (frecvent 5 pentru ape cu vânt și curent), plus marje pentru maluri. Aceste dimensiuni se verifică prin simulări de manevră pentru a confirma siguranța navigației pe segmentul studiat.'},
      { type:'p', text:'Asistența remorcherelor reduce cerințele geometrice ale bazinului de evoluție, dar adaugă costuri operaționale. Pozițiile de așteptare (rade) și zonele de manevră se documentează din datele AIS și din planurile portuare. Concluziile privind geometria acvatoriului se corelează cu batimetria, cu traficul la dană și cu siguranța navigației, asigurând operabilitatea amplasamentului pentru flota previzionată.'},
      { type:'chart', chartType:'bar', title:'Dimensiuni necesare ale acvatoriului (m)', labels:['Lungime navă calcul','Diametru evoluție','Lățime canal','Lungime acostare'], series:[{ name:'Dimensiune', data:[180, 320, 90, 210] }] }
    ]
  },
  {
    title: 'Sistemul de acostare, bolarzi și amortizoare (defense)',
    blocks: [
      { type:'p', text:'Acostarea navelor la cheu solicită structurile prin forțe de impact la atingerea cheiului și prin forțe de tracțiune în parâme pe durata staționării. La amplasamentul studiat se verifică sistemul de acostare: bolarzii (puncte de legare), amortizoarele de acostare (fender) și capacitatea structurii de a prelua aceste forțe. Energia de acostare care trebuie absorbită de amortizoare se calculează din masa navei, viteza de apropiere și coeficienții de adaos (excentricitate, masă adițională a apei).'},
      { type:'p', text:'Energia de acostare E = 0,5 · m · v² · Ce · Cm · Cs · Cc, unde m este deplasamentul navei, v viteza de apropiere perpendiculară, iar coeficienții Ce, Cm, Cs, Cc țin cont de excentricitate, de masa adițională a apei antrenate, de elasticitate și de configurația cheiului. Amortizoarele se dimensionează pentru a absorbi această energie limitând reacțiunea transmisă structurii. Pentru o navă de tonaj mare, energia de acostare poate atinge sute de kilojouli, impunând amortizoare de capacitate corespunzătoare.'},
      { type:'p', text:'Forțele de tracțiune în parâme, generate de vânt și curent asupra navei acostate, solicită bolarzii și ancorajele acestora. Capacitatea bolarzilor și verificarea ancorajului în structura cheiului asigură siguranța staționării în condiții meteorologice severe. Concluziile privind sistemul de acostare se corelează cu geotehnica cheiului, cu microclimatul (vânt) și cu siguranța navigației la amplasament.'},
      { type:'table', title:'Parametri ai sistemului de acostare', headers:['Element','Caracteristică','Valoare'], rows:[
        ['Energie acostare (kJ)','Navă de calcul','340'],
        ['Capacitate bolard (kN)','Tracțiune admisă','1000'],
        ['Reacțiune amortizor (kN)','La compresie maximă','850'],
        ['Viteză acostare (cm/s)','Apropiere admisă','12']
      ]}
    ]
  },
  {
    title: 'Geomorfologia litorală și transportul de sedimente',
    blocks: [
      { type:'p', text:'Pentru amplasamentele maritime, dinamica litorală influențează colmatarea canalelor de acces și stabilitatea structurilor de protecție (diguri, sparge-valuri). Transportul de sedimente de-a lungul țărmului (deriva litorală) deplasează nisipul în direcția dominantă a valurilor, acumulându-l de o parte a structurilor portuare și erodându-l de cealaltă. La amplasamentul studiat se evaluează direcția și intensitatea derivei litorale și efectul structurilor portuare asupra liniei țărmului adiacent.'},
      { type:'p', text:'Structurile portuare care întrerup deriva litorală (diguri perpendiculare pe țărm) provoacă acumulare în amonte și eroziune în aval, fenomen care a afectat sectoare ale litoralului românesc. Estimarea debitului solid litoral și a balanței sedimentare permite anticiparea evoluției liniei țărmului și planificarea măsurilor (by-passing de nisip, înnisipări artificiale). Aceste fenomene condiționează frecvența dragajului de întreținere a canalului de acces.'},
      { type:'p', text:'Pentru amplasamentele fluviale, transportul de aluviuni al Dunării determină colmatarea bazinelor și a canalelor, cu rate care variază sezonier și cu regimul hidrologic. Caracterizarea transportului solid (în suspensie și de fund) fundamentează estimarea ratei de colmatare și programul de dragaj. Concluziile privind geomorfologia și transportul de sedimente se corelează cu batimetria, cu dragajul și cu protecția malurilor și a structurilor de protecție.'},
      { type:'chart', chartType:'bar', title:'Rata de transport solid și colmatare lunară (mii mc)', labels:['Iarnă','Primăvară','Vară','Toamnă'], series:[{ name:'Sediment depus', data:[8, 19, 11, 9] }] }
    ]
  },
  {
    title: 'Structurile de protecție: diguri și sparge-valuri',
    blocks: [
      { type:'p', text:'Porturile maritime și unele amplasamente fluviale dispun de structuri de protecție (diguri de larg, sparge-valuri) care creează acvatoriul adăpostit necesar operării în siguranță. La amplasamentul studiat, dacă protecția frontului de acostare depinde de astfel de structuri, se evaluează starea acestora, gradul de protecție oferit împotriva valurilor și hulei, precum și necesarul de mentenanță. Înălțimea valului rezidual în acvatoriu condiționează operabilitatea danei și siguranța acostării.'},
      { type:'p', text:'Stabilitatea unui dig de anrocamente se verifică prin formula Hudson sau Van der Meer, care leagă greutatea blocurilor de protecție de înălțimea valului de proiectare și de panta digului. Atenuarea valului la trecerea peste sparge-val determină agitația reziduală în acvatoriu. Pentru ca operarea să fie posibilă, înălțimea valului la dană trebuie să rămână sub praguri operaționale, frecvent sub 0,5-1,0 m în funcție de tipul navelor și de operațiuni.'},
      { type:'p', text:'Mentenanța structurilor de protecție (înlocuirea blocurilor deplasate, repararea avariilor de furtună) este esențială pentru menținerea protecției. Avariile structurilor de protecție expun acvatoriul la valuri, reducând disponibilitatea operațională. Concluziile privind structurile de protecție se corelează cu microclimatul (regimul valurilor), cu geomorfologia litorală și cu siguranța operării la amplasament.'},
      { type:'table', title:'Parametri ai structurilor de protecție', headers:['Parametru','Descriere','Valoare'], rows:[
        ['Înălțime val proiectare (cm)','La larg','420'],
        ['Greutate bloc protecție (t)','Stabilitate Hudson','6'],
        ['Înălțime val rezidual (cm)','La dană','60'],
        ['Zile/an val peste prag','Operabilitate redusă','38']
      ]}
    ]
  },
  {
    title: 'Bilanțul energetic și eficiența amplasamentului',
    blocks: [
      { type:'p', text:'Operarea unei dane consumă energie pentru echipamentele de manipulare, iluminat, pompare, instalații auxiliare și, eventual, pentru alimentarea navelor de la mal. La amplasamentul studiat se întocmește un bilanț energetic care identifică principalele consumatoare și potențialul de eficientizare. Consumul specific (energie pe tonă manipulată) este un indicator de performanță care permite compararea cu repere de bună practică și identificarea risipei.'},
      { type:'p', text:'Electrificarea echipamentelor de manipulare (înlocuirea utilajelor diesel cu echipamente electrice), iluminatul LED cu telegestiune și recuperarea energiei la macarale (frânare regenerativă) reduc consumul și emisiile. Producția locală de energie din surse regenerabile (panouri fotovoltaice pe acoperișurile magaziilor, eventual energie eoliană în zonele expuse) poate acoperi o parte din necesar. Bilanțul energetic se exprimă în consum anual și în consum specific raportat la traficul de marfă.'},
      { type:'p', text:'Eficiența energetică contribuie la reducerea costurilor de exploatare și la atingerea obiectivelor de mediu ale amplasamentului. Auditul energetic identifică măsurile cu cea mai bună rentabilitate, iar monitorizarea consumurilor pe subsisteme permite urmărirea îmbunătățirilor. Concluziile privind bilanțul energetic se corelează cu emisiile atmosferice, cu alimentarea de la mal și cu programul de investiții al amplasamentului.'},
      { type:'chart', chartType:'bar', title:'Distribuția consumului energetic pe subsisteme (%)', labels:['Echipamente manipulare','Iluminat','Pompare/drenaj','Shore power','Auxiliare'], series:[{ name:'Pondere', data:[42, 18, 12, 20, 8] }] }
    ]
  },
  {
    title: 'Cadrul juridic al domeniului public portuar',
    blocks: [
      { type:'p', text:'Regimul juridic al amplasamentului portuar este guvernat de OG 22/1999 privind administrarea porturilor și a căilor navigabile, care stabilește că infrastructura portuară aparține domeniului public al statului și este pusă la dispoziția operatorilor prin concesiune sau închiriere. La amplasamentul studiat se documentează titlul prin care operatorul deține terenul și infrastructura, drepturile și obligațiile aferente, precum și limitele domeniului public portuar față de domeniul privat sau de proprietatea privată.'},
      { type:'p', text:'Distincția dintre infrastructura portuară (cheiuri, bazine, canale, terenuri) administrată de autoritatea portuară și suprastructura (clădiri, echipamente) care poate aparține operatorului determină responsabilitățile de întreținere și de investiție. Concesionarea infrastructurii presupune redevențe și clauze privind utilizarea, mentenanța și returnarea bunurilor. OG 42/1997 privind transportul naval reglementează activitatea de navigație și atribuțiile autorităților navale.'},
      { type:'p', text:'Schimbarea destinației terenului portuar (de exemplu, pentru reconversie waterfront) necesită, de regulă, scoaterea din domeniul public portuar conform procedurilor legale, ceea ce poate fi un proces complex. Avizele autorității portuare, ale autorității navale și ale autorităților de mediu condiționează orice intervenție. Concluziile privind cadrul juridic fundamentează fezabilitatea juridică a investiției și se corelează cu reglementările urbanistice aplicabile.'},
      { type:'bullets', items:[
        'Infrastructura portuară aparține domeniului public al statului (OG 22/1999)',
        'Operatorul deține prin concesiune/închiriere, cu redevențe și obligații',
        'Distincție infrastructură (autoritate) vs suprastructură (operator)',
        'Schimbarea destinației impune scoaterea din domeniul public portuar',
        'Avize autoritate portuară, navală și de mediu obligatorii'
      ]}
    ]
  },
  {
    title: 'Avizarea de mediu a activității portuare',
    blocks: [
      { type:'p', text:'Activitățile portuare și investițiile în infrastructura portuară fac obiectul procedurilor de evaluare a impactului asupra mediului conform Legii 292/2018 și a Directivei 2011/92/UE (EIA). La amplasamentul studiat se identifică tipul de procedură aplicabilă în funcție de natura și amploarea proiectului: evaluare a impactului, evaluare adecvată (dacă afectează situri Natura 2000) și autorizație integrată de mediu pentru activitățile cu impact semnificativ (IED). Aceste proceduri condiționează autorizarea funcționării.'},
      { type:'p', text:'Evaluarea de impact analizează efectele asupra apei, aerului, solului, biodiversiteții, zgomotului și populației, propunând măsuri de prevenire, reducere și compensare. Pentru porturi, aspectele critice sunt poluarea apei, emisiile de pulberi, zgomotul și riscul de poluare accidentală, tratate în capitolele dedicate. Autorizația de mediu stabilește condițiile de funcționare, valorile-limită de emisie și programul de monitorizare, sub supravegherea APM și a Gărzii de Mediu.'},
      { type:'p', text:'Monitorizarea de mediu (calitatea apei, aerului, zgomot) și raportarea periodică către autorități verifică conformarea cu condițiile autorizației. Nerespectarea poate atrage sancțiuni și suspendarea activității. Concluziile privind avizarea de mediu integrează toate capitolele de impact (apă, aer, zgomot, biodiversitate, deșeuri, risc accidental) și fundamentează cadrul de funcționare legală a amplasamentului portuar.'},
      { type:'table', title:'Proceduri de mediu aplicabile amplasamentului', headers:['Procedură','Temei legal','Aplicabilitate'], rows:[
        ['Evaluare impact (EIA)','Legea 292/2018','Proiect nou/extindere'],
        ['Evaluare adecvată','OUG 57/2007','Vecinătate Natura 2000'],
        ['Autorizație integrată (IED)','Legea 278/2013','Activități IED'],
        ['Autorizație de mediu','OUG 195/2005','Funcționare curentă']
      ]}
    ]
  },
  {
    title: 'Amenajarea spațiului maritim și planificarea costieră',
    blocks: [
      { type:'p', text:'Pentru amplasamentele maritime, activitatea portuară se inserează în cadrul planificării spațiului maritim, reglementată de Directiva 2014/89/UE (Maritime Spatial Planning, MSP), transpusă în legislația națională. Aceasta urmărește coordonarea utilizărilor concurente ale spațiului marin (transport, pescuit, energie, conservare, turism). La amplasamentul studiat se verifică compatibilitatea cu planul de amenajare a spațiului maritim și alocarea zonelor pentru navigație, ancoraj și acvatorii portuare.'},
      { type:'p', text:'Planificarea spațiului maritim previne conflictele între utilizări și protejează zonele sensibile. Pentru un amplasament portuar, relevante sunt rutele de navigație, zonele de ancoraj, ariile protejate marine și eventualele proiecte de energie offshore din proximitate. Coordonarea cu MSP asigură că dezvoltarea sau extinderea amplasamentului nu intră în conflict cu alte utilizări planificate ale spațiului marin.'},
      { type:'p', text:'Pentru amplasamentele fluviale, echivalentul îl reprezintă planificarea utilizării sectorului de Dunăre, coordonată cu administrația fluvială și cu autoritatea de gospodărire a apelor. Caracterul punctual al studiului se păstrează: se verifică încadrarea amplasamentului în planificarea spațială, fără a dezvolta strategia de coridor. Concluziile privind amenajarea spațiului maritim/fluvial se corelează cu cadrul juridic și cu avizarea de mediu.'},
      { type:'p', text:'Compatibilitatea cu instrumentele de planificare spațială este verificată prin avizele autorităților competente, care confirmă încadrarea amplasamentului în zonarea aprobată. Eventualele incompatibilități se rezolvă prin ajustarea proiectului sau prin proceduri de modificare a planului, în limitele legale. Această verificare asigură fezabilitatea spațială a investiției portuare la amplasamentul studiat.'}
    ]
  },
  {
    title: 'Adaptarea la schimbările climatice (nivelul mării și debite)',
    blocks: [
      { type:'p', text:'Schimbările climatice afectează amplasamentele portuare prin creșterea nivelului mării (relevantă pentru porturile maritime), prin modificarea regimului hidrologic al Dunării (extreme de etiaj și de viitură mai accentuate) și prin intensificarea fenomenelor meteorologice extreme. La amplasamentul studiat se evaluează vulnerabilitatea la aceste tendințe și se propun măsuri de adaptare. Creșterea nivelului mării reduce înălțimea utilă a cheiurilor și sporește riscul de inundare a platformelor joase pe termen lung.'},
      { type:'p', text:'Pentru amplasamentele maritime, scenariile de creștere a nivelului mării (proiecții EEA și IPCC) se aplică la cota platformei și a cheiului pentru a evalua expunerea la orizontul de proiectare. O creștere a nivelului mării de câteva zeci de centimetri pe parcursul duratei de viață a infrastructurii impune marje de siguranță suplimentare la cota construcțiilor. Pentru Dunăre, accentuarea etiajelor reduce adâncimea disponibilă și limitează încărcătura navelor în perioade prelungite.'},
      { type:'p', text:'Măsurile de adaptare includ supraînălțarea cotelor de amplasare, sisteme de protecție împotriva inundațiilor adaptabile, flexibilitatea operațională la variațiile de nivel și planificarea pe baza scenariilor climatice. Adaptarea la climă protejează investiția pe durata de viață și asigură continuitatea operării. Concluziile privind adaptarea climatică se corelează cu inundabilitatea fluvială, cu batimetria și cu cota de amplasare a construcțiilor.'},
      { type:'chart', chartType:'bar', title:'Proiecția nivelului mării/apei la amplasament (cm peste referință)', labels:['Actual','2040','2070','2100'], series:[{ name:'Nivel proiectat', data:[0, 12, 28, 48] }] }
    ]
  },
  {
    title: 'Calitatea sedimentelor de fund și contaminarea istorică',
    blocks: [
      { type:'p', text:'Sedimentele de pe fundul acvatoriilor portuare acumulează poluanți din decenii de activitate: metale grele, hidrocarburi, compuși organici persistenți, provenind din scurgeri, manipularea mărfurilor și aporturi externe. La amplasamentul studiat, caracterizarea chimică a sedimentelor este esențială înainte de dragaj, deoarece sedimentele contaminate necesită gestionare specială (depozite controlate, tratare) și nu pot fi imersate sau reutilizate liber. Prelevarea și analiza probelor urmează protocoale standardizate.'},
      { type:'p', text:'Concentrațiile de poluanți în sedimente se compară cu valori de referință care diferențiază sedimentele curate (reutilizabile) de cele moderat sau puternic contaminate. Metalele grele (plumb, cadmiu, mercur, cupru, zinc), hidrocarburile policiclice aromatice și bifenilii policlorurați sunt printre poluanții urmăriți. Distribuția pe verticală a contaminării indică istoricul depunerilor, straturile profunde reflectând perioade de poluare mai intensă din trecut.'},
      { type:'p', text:'Contaminarea istorică a sedimentelor reprezintă un pasiv de mediu care influențează costurile de dragaj și opțiunile de gestionare a materialului dragat. Pentru proiectele de reconversie waterfront, decontaminarea sedimentelor și a malurilor poate fi necesară. Concluziile privind calitatea sedimentelor se corelează cu dragajul, cu poluarea apei și cu reconversia terenurilor portuare.'},
      { type:'table', title:'Concentrații de poluanți în sedimentele de fund', headers:['Poluant','Concentrație măsurată','Prag contaminare'], rows:[
        ['Plumb (mg/kg)','58','85'],
        ['Cadmiu (mg/kg)','1,2','1,5'],
        ['Hidrocarburi (mg/kg)','420','500'],
        ['Zinc (mg/kg)','165','200']
      ]}
    ]
  },
  {
    title: 'Topografia incintei și sistematizarea verticală',
    blocks: [
      { type:'p', text:'Sistematizarea verticală a incintei portuare stabilește cotele platformelor, pantele de scurgere și cota coronamentului cheiului în raport cu nivelul apei. La amplasamentul studiat se analizează ridicarea topografică a incintei, cotele existente și cotele propuse, pentru a asigura drenajul apelor pluviale, accesibilitatea și protecția împotriva inundării. Cota platformei trebuie să depășească nivelul apelor mari de proiectare, cu o marjă de siguranță, pentru a evita inundarea zonei operative.'},
      { type:'p', text:'Cota coronamentului cheiului față de nivelul mediu al apei (înălțimea liberă a cheiului) trebuie să permită operarea la diferite niveluri ale apei, fiind un compromis: prea joasă, cheiul se inundă la ape mari; prea înaltă, manipularea la nivele scăzute devine dificilă. Pentru amplasamentele fluviale cu variații mari de nivel, această problemă este acută, putând necesita cheiuri în trepte sau echipamente cu rază mare de acțiune. Pantele platformei (frecvent 1-2%) dirijează apele către sistemul de colectare.'},
      { type:'p', text:'Sistematizarea verticală echilibrează volumele de săpături și umpluturi pentru a minimiza costurile de terasamente. Cota de amplasare a construcțiilor și a echipamentelor sensibile se stabilește peste cota de inundabilitate de proiectare. Concluziile privind topografia și sistematizarea verticală se corelează cu inundabilitatea, cu managementul apelor pluviale și cu geotehnica terenului de fundare.'},
      { type:'chart', chartType:'bar', title:'Cote caracteristice ale amplasamentului (cm peste referință)', labels:['Nivel mediu apă','Coronament cheu','Platformă operativă','Construcții sensibile'], series:[{ name:'Cotă', data:[280, 480, 760, 820] }] }
    ]
  },
  {
    title: 'Rețelele de utilități ale amplasamentului',
    blocks: [
      { type:'p', text:'Funcționarea amplasamentului portuar depinde de rețelele de utilități: alimentare cu energie electrică (pentru echipamente, iluminat, shore power), apă (potabilă și industrială, inclusiv pentru umectarea stivelor și stingerea incendiilor), canalizare (menajeră și pluvială), telecomunicații și, eventual, alimentare cu combustibil pentru bunkeraj. La amplasamentul studiat se inventariază rețelele existente, capacitatea acestora și necesarul suplimentar pentru proiectul propus.'},
      { type:'p', text:'Alimentarea cu energie electrică este critică: necesarul de putere include echipamentele de manipulare, iluminatul în regim de 24 de ore și, dacă se implementează, alimentarea navelor de la mal, care adaugă o cerere semnificativă. Rețeaua de apă pentru stingerea incendiilor trebuie dimensionată pentru scenariile de incendiu la depozitele de mărfuri, cu debit și presiune adecvate la hidranți. Canalizarea separă apele menajere de cele pluviale, acestea din urmă fiind tratate prin separatoare de hidrocarburi.'},
      { type:'p', text:'Coordonarea rețelelor de utilități cu sistematizarea incintei și cu fluxurile de circulație evită conflictele de traseu și asigură accesul pentru mentenanță. Capacitatea rezervă a utilităților condiționează posibilitatea de extindere a activității. Concluziile privind rețelele de utilități se corelează cu bilanțul energetic, cu alimentarea de la mal și cu managementul apelor pluviale, fundamentând proiectul tehnic al amplasamentului.'},
      { type:'table', title:'Necesarul de utilități al amplasamentului', headers:['Utilitate','Parametru','Valoare'], rows:[
        ['Energie electrică (kW)','Putere instalată','2400'],
        ['Apă incendiu (l/s)','Debit hidranți','45'],
        ['Apă industrială (mc/zi)','Umectare/spălare','120'],
        ['Canalizare pluvială (l/s)','Debit calcul','385']
      ]}
    ]
  },
  {
    title: 'Siguranța navigației și semnalizarea pe segment',
    blocks: [
      { type:'p', text:'Siguranța navigației pe segmentul de acces la amplasament depinde de semnalizarea de navigație (balize, geamanduri, faruri, semnale luminoase), de adâncimea și lățimea canalului și de gestionarea traficului. La amplasamentul studiat se verifică conformitatea semnalizării cu standardele IALA, vizibilitatea și starea de funcționare a mijloacelor de semnalizare. Reglementarea navigației urmează OG 42/1997 și regulamentele autorității navale, care stabilesc regulile de circulație pe căile navigabile.'},
      { type:'p', text:'Analiza siguranței navigației pe segment identifică punctele de risc: zone înguste, curbe strânse, intersecții de trafic, zone cu vizibilitate redusă și sectoare cu curent puternic. Datele AIS permit reconstrucția traiectoriilor reale și identificarea situațiilor de apropiere periculoasă (near-miss). Pentru sectoarele aglomerate sau dificile, serviciile de trafic maritim/fluvial (VTS) monitorizează și coordonează circulația navelor, reducând riscul de coliziune și eșuare.'},
      { type:'p', text:'Măsurile de îmbunătățire a siguranței includ modernizarea semnalizării, dragajul pentru menținerea adâncimii, asistența remorcherelor și pilotajul obligatoriu pe sectoarele dificile. Sistemele de informare a navigatorilor (avize către navigatori) comunică modificările temporare. Concluziile privind siguranța navigației se corelează cu batimetria, cu geometria acvatoriului și cu traficul la amplasament.'},
      { type:'bullets', items:[
        'Semnalizare de navigație conform standardelor IALA (balize, geamanduri, faruri)',
        'Identificarea punctelor de risc pe segment din datele AIS',
        'Monitorizare VTS pe sectoarele aglomerate sau dificile',
        'Pilotaj și asistență remorchere pe sectoarele dificile',
        'Avize către navigatori pentru modificări temporare'
      ]}
    ]
  },
  {
    title: 'Gheața fluvială și impactul asupra navigației',
    blocks: [
      { type:'p', text:'Pe Dunăre, formarea gheții în iernile severe poate întrerupe temporar navigația și solicită mecanic structurile portuare. La amplasamentele fluviale dunărene se evaluează frecvența și durata fenomenelor de îngheț, formarea pe perioade de zăpor (acumulare de gheață) și impactul asupra cheiurilor, danelor și navelor staționate. Presiunea gheții asupra structurilor și navelor poate produce avarii, iar zăporurile pot ridica nivelul apei provocând inundații locale.'},
      { type:'p', text:'Caracterizarea regimului de gheață la amplasament se bazează pe seriile istorice ale AFDJ Galați privind apariția, durata și severitatea fenomenelor de îngheț. Numărul mediu de zile cu gheață și frecvența iernilor cu blocaj de navigație definesc disponibilitatea operațională sezonieră a amplasamentului. Schimbările climatice tind să reducă frecvența iernilor severe, dar fenomenele extreme rămân posibile și trebuie luate în calcul.'},
      { type:'p', text:'Măsurile de adaptare la regimul de gheață includ proiectarea structurilor pentru a prelua presiunea gheții, protecția navelor staționate, monitorizarea formării gheții și planificarea operării ținând cont de întreruperile sezoniere. Spărgătoarele de gheață, operate de autoritatea fluvială, pot menține navigația în anumite condiții. Concluziile privind regimul de gheață se corelează cu disponibilitatea operațională și cu microclimatul amplasamentului.'},
      { type:'chart', chartType:'bar', title:'Zile cu fenomene de gheață pe luni (medie multianuală)', labels:['Dec','Ian','Feb','Mar'], series:[{ name:'Zile cu gheață', data:[6, 14, 11, 4] }] }
    ]
  },
  {
    title: 'Mentenanța infrastructurii portuare și durata de viață',
    blocks: [
      { type:'p', text:'Infrastructura portuară (cheiuri, dane, platforme, structuri de protecție) este expusă unui mediu agresiv: apă (sărată în cazul porturilor maritime), variații de nivel, solicitări mecanice repetate și agenți chimici. La amplasamentul studiat se evaluează starea tehnică a infrastructurii existente, ritmul de degradare și necesarul de mentenanță pentru menținerea funcționalitții pe durata de viață proiectată. Coroziunea armăturilor și a structurilor metalice, degradarea betonului și eroziunea sunt principalele mecanisme de deteriorare.'},
      { type:'p', text:'Mediul marin accelerează coroziunea, în special în zona de variație a nivelului apei (splash zone), unde alternanța umezire-uscare este cea mai agresivă. Protecția catodică, betonul cu adaosuri și acoperirile de protecție prelungesc durata de viață a structurilor. Inspecțiile periodice (vizuale, subacvatice cu scafandri sau ROV, măsurători de coroziune) identifică degradările înainte ca acestea să compromită siguranța. Un plan de mentenanță preventivă reduce costurile pe ciclul de viață.'},
      { type:'p', text:'Estimarea duratei de viață reziduale a infrastructurii și planificarea reabilitărilor majore fundamentează programul de investiții al amplasamentului. Reabilitarea sau înlocuirea cheiurilor degradate este costisitoare și impune întreruperea operării, motiv pentru care mentenanța preventivă este preferabilă intervențiilor de urgență. Concluziile privind mentenanța se corelează cu geotehnica cheiurilor, cu eroziunea malurilor și cu programul de investiții.'},
      { type:'table', title:'Plan de mentenanță și durata de viață a infrastructurii', headers:['Element','Stare actuală','Durata reziduală (ani)'], rows:[
        ['Cheu de greutate','Bună, fisuri minore','25'],
        ['Platformă betonată','Mediocră, degradări','12'],
        ['Structuri metalice','Coroziune moderată','15'],
        ['Dig de protecție','Bună','30']
      ]}
    ]
  },
  {
    title: 'Riscul de coliziune și avarii la structurile portuare',
    blocks: [
      { type:'p', text:'Manevra navelor în spațiul restrâns al acvatoriului portuar generează risc de coliziune între nave și de impact al navelor cu structurile portuare (cheiuri, dane, diguri, poduri). La amplasamentul studiat se evaluează probabilitatea acestor evenimente și consecințele asupra infrastructurii și a navigației. Erorile de manevră, condițiile meteorologice nefavorabile (vânt, vizibilitate redusă) și defecțiunile tehnice ale navelor sunt cauzele principale ale accidentelor de acostare.'},
      { type:'p', text:'Energia de impact a unei nave care lovește un cheu în afara condițiilor normale de acostare poate depăși cu mult capacitatea amortizoarelor, producând avarii structurale. Protecția structurilor vulnerabile (pile de pod, capete de cheu) se realizează prin dispozitive de protecție la impact (dolphins, structuri-tampon). La amplasamentele fluviale cu poduri, riscul de coliziune navă-pod impune semnalizare și gabarite de navigație adecvate. Analiza de risc cuantifică probabilitatea și severitatea scenariilor.'},
      { type:'p', text:'Măsurile de reducere a riscului includ asistența remorcherelor la manevre dificile, pilotajul, limitele operaționale pe vânt și vizibilitate, precum și protecția fizică a structurilor critice. Datele AIS privind incidentele și manevrele dificile fundamentează evaluarea. Concluziile privind riscul de coliziune se corelează cu siguranța navigației, cu sistemul de acostare și cu geometria acvatoriului la amplasament.'},
      { type:'chart', chartType:'bar', title:'Distribuția cauzelor de avarii la acostare (%)', labels:['Eroare manevră','Vânt puternic','Vizibilitate redusă','Defecțiune tehnică','Altele'], series:[{ name:'Pondere', data:[38, 24, 16, 14, 8] }] }
    ]
  },
  {
    title: 'Capacitatea portantă a platformelor și circulația utilajelor',
    blocks: [
      { type:'p', text:'Platformele portuare suportă încărcări intense: stivuirea mărfurilor grele, circulația utilajelor de manipulare (stivuitoare de containere, autoîncărcătoare) și a vehiculelor de transport. La amplasamentul studiat se verifică capacitatea portantă a platformelor în raport cu aceste solicitări, exprimată în presiune admisibilă pe suprafață (tone pe metru pătrat) și în sarcini pe roată ale utilajelor. Depășirea capacității portante produce tasări, fisuri și degradarea platformei, afectând operarea.'},
      { type:'p', text:'Sarcina maximă pe roată a unui stivuitor de containere încărcat poate atinge zeci de tone, concentrate pe o suprafață mică, ceea ce impune o platformă cu structură adecvată (dale de beton armat sau pavaje grele pe fundație stabilizată). Stivuirea containerelor pe mai multe niveluri sau a mărfurilor vrac în stive înalte generează presiuni distribuite mari, care se transmit terenului de fundare. Verificarea ține cont atât de solicitarea de suprafață, cât și de capacitatea terenului tratată în geotehnică.'},
      { type:'p', text:'Dimensionarea structurii platformei (grosimea dalei, tipul fundației, armarea) se face pentru sarcinile maxime previzionate, cu coeficienți de siguranță. Zonele cu solicitări concentrate (sub picioarele macaralelor mobile, sub stivele grele) pot necesita consolidări locale. Concluziile privind capacitatea portantă a platformelor se corelează cu geotehnica terenului de fundare, cu capacitatea de depozitare și cu echiparea tehnică a danei.'},
      { type:'table', title:'Solicitări și capacitatea portantă a platformelor', headers:['Solicitare','Descriere','Valoare (t/mp sau t/roată)'], rows:[
        ['Stivuire vrac','Presiune distribuită','6'],
        ['Stivuire containere','3 niveluri','9'],
        ['Sarcină pe roată stivuitor','Container plin','35'],
        ['Capacitate platformă','Admisibilă','10']
      ]}
    ]
  },
  {
    title: 'Bunkerajul și alimentarea navelor cu combustibil',
    blocks: [
      { type:'p', text:'Bunkerajul (alimentarea navelor cu combustibil) este o operațiune sensibilă din punctul de vedere al riscului de poluare, desfășurată la dană sau prin barje de bunkeraj. La amplasamentul studiat, dacă se prestează servicii de bunkeraj, se evaluează infrastructura aferentă (conducte, pompe, sisteme de măsurare), procedurile de transfer și măsurile de prevenire a scurgerilor. Transferul de combustibil necesită proceduri stricte, echipamente de izolare a scurgerilor permanent disponibile și instruirea personalului.'},
      { type:'p', text:'Tendința către combustibili alternativi (GNL, metanol, amoniac, biocombustibili) în transportul naval, ca răspuns la cerințele de decarbonizare, poate impune adaptarea infrastructurii de bunkeraj. Bunkerajul de GNL, de exemplu, necesită instalații criogenice și zone de siguranță extinse din cauza pericolului asociat gazelor inflamabile. La amplasamentul studiat se evaluează cererea actuală și potențialul de adaptare la combustibili viitori, în limitele unei analize punctuale.'},
      { type:'p', text:'Cantitatea de combustibil transferată și frecvența operațiunilor de bunkeraj determină nivelul de risc și dimensionarea măsurilor de prevenire. Conformarea cu reglementările privind manipularea produselor petroliere și cu cerințele de mediu este obligatorie. Concluziile privind bunkerajul se corelează cu riscul de poluare accidentală, cu mărfurile periculoase și cu emisiile atmosferice ale amplasamentului.'},
      { type:'p', text:'Pentru a limita riscul, operațiunile de bunkeraj se desfășoară cu baraje plutitoare pregătite, cu monitorizarea transferului și cu interzicerea altor operațiuni incompatibile în zonă pe durata alimentării. Planul de intervenție în caz de scurgere este parte integrantă a procedurilor. Această abordare protejează acvatoriul și asigură continuitatea operării amplasamentului în condiții de siguranță.'}
    ]
  },
  {
    title: 'Managementul apei de balast și speciile invazive',
    blocks: [
      { type:'p', text:'Navele preiau și descarcă apă de balast pentru stabilitate, transportând involuntar organisme acvatice între porturi și introducând specii invazive care perturbă ecosistemele locale. La amplasamentul studiat, dacă navele descarcă balast în acvatoriu, se evaluează conformarea cu Convenția internațională privind managementul apei de balast (BWM), care impune tratarea apei de balast pentru a elimina sau inactiva organismele înainte de descărcare.'},
      { type:'p', text:'Convenția BWM stabilește standarde de tratare a apei de balast (standardul D-2), realizate prin sisteme de tratare la bordul navelor (filtrare, dezinfecție UV, tratament chimic). Verificarea conformării navelor și, acolo unde este cazul, recepția apei de balast la facilități portuare reduc riscul de introducere a speciilor invazive. În Marea Neagră și pe Dunăre, speciile invazive transportate prin balast au produs deja perturbări ecologice documentate.'},
      { type:'p', text:'Monitorizarea biologică a acvatoriului permite detectarea timpurie a speciilor invazive, iar coordonarea cu autoritățile de mediu asigură răspunsul adecvat. Pentru amplasamentul studiat, gestiunea apei de balast se integrează în procedurile operaționale și în conformarea de mediu. Concluziile se corelează cu biodiversitatea acvatoriului și cu calitatea apei, contribuind la protejarea ecosistemului local de presiunile transportului naval.'},
      { type:'bullets', items:[
        'Conformarea navelor cu standardul D-2 al Convenției BWM',
        'Sisteme de tratare a balastului la bord (filtrare, UV, chimic)',
        'Recepția balastului la facilități portuare unde este cazul',
        'Monitorizare biologică pentru detectarea timpurie a speciilor invazive',
        'Coordonare cu autoritățile de mediu pentru răspuns'
      ]}
    ]
  },
  {
    title: 'Sănătatea și securitatea în muncă în mediul portuar',
    blocks: [
      { type:'p', text:'Mediul portuar prezintă riscuri specifice de sănătate și securitate în muncă: manipularea sarcinilor grele cu macarale, circulația vehiculelor și utilajelor, lucrul la înălțime și la malul apei (risc de cădere în apă), expunerea la pulberi și zgomot, manipularea mărfurilor periculoase. La amplasamentul studiat se evaluează riscurile ocupaționale și măsurile de prevenire conform legislației de securitate și sănătate în muncă (Legea 319/2006) și a normelor specifice activităților portuare.'},
      { type:'p', text:'Riscurile de accidentare în porturi sunt printre cele mai ridicate din sectoarele industriale, din cauza interacțiunii dintre oameni, sarcini suspendate și vehicule în mișcare. Separarea fluxurilor de personal de cele de vehicule, semnalizarea zonelor periculoase, echipamentele individuale de protecție (inclusiv veste de salvare la malul apei) și procedurile de lucru în siguranță reduc riscul. Expunerea la zgomot și pulberi impune protecție respiratorie și auditivă pentru personalul expus.'},
      { type:'p', text:'Evaluarea riscurilor ocupaționale, instruirea personalului, planurile de urgență și supravegherea medicală a lucrătorilor expuși completează sistemul de management al securității în muncă. Coordonarea activităților simultane (operare navă, transport terestru, mentenanță) previne accidentele prin interferență. Concluziile privind securitatea în muncă se corelează cu siguranța portuară, cu mărfurile periculoase și cu organizarea operării amplasamentului.'},
      { type:'table', title:'Riscuri ocupaționale și măsuri de prevenire', headers:['Risc','Sursă','Măsură principală'], rows:[
        ['Strivire/lovire','Sarcini suspendate','Zone interzise sub sarcină'],
        ['Cădere în apă','Lucrul la mal','Veste salvare, balustrade'],
        ['Expunere pulberi','Manipulare vrac','Protecție respiratorie'],
        ['Coliziune','Vehicule incintă','Separare fluxuri']
      ]}
    ]
  },
  {
    title: 'Integrarea peisageră și calitatea spațiului la interfața urbană',
    blocks: [
      { type:'p', text:'Porturile, mai ales cele situate la marginea orașelor, au un impact vizual și peisager asupra frontului de apă urban. La amplasamentul studiat se evaluează calitatea spațiului la interfața dintre incinta portuară și țesutul urban: vizibilitatea echipamentelor și depozitelor, calitatea limitelor (garduri, perdele vegetale), accesul public la apă și posibilitățile de integrare peisageră. Frontul de apă este o resursă urbană valoroasă, iar funcția portuară operativă intră adesea în tensiune cu aspirațiile orașului de a-l valorifica.'},
      { type:'p', text:'Integrarea peisageră a activităților portuare se realizează prin perdele vegetale care maschează depozitele și reduc dispersia pulberilor, prin tratarea calitativă a limitelor incintei și prin amenajarea zonelor de contact cu orașul. Acolo unde portul rămâne operativ, separarea funcțională este necesară din motive de securitate, dar tratarea limitelor poate atenua impactul vizual. Iluminatul controlat reduce poluarea luminoasă, contribuind la calitatea nocturnă a frontului urban.'},
      { type:'p', text:'Pentru zonele portuare în reconversie, calitatea spațiului public și accesul la apă devin obiective centrale ale regenerării waterfront. Promenade, spații verzi, conservarea elementelor de patrimoniu industrial și mixitatea funcțională transformă fostele zone portuare în spații urbane atractive. Concluziile privind integrarea peisageră se corelează cu interfața port-oraș, cu reconversia waterfront și cu impactul rezidențial.'},
      { type:'p', text:'Documentațiile de urbanism local stabilesc reglementările aplicabile la interfața port-oraș: înălțimi, retrageri, tratarea limitelor și utilizările admise. Coordonarea dintre planificarea portuară și cea urbană este esențială pentru a evita conflictele și a valorifica potențialul frontului de apă. Această coordonare protejează atât funcția economică portuară, cât și calitatea vieții urbane adiacente.'}
    ]
  },
  {
    title: 'Accesibilitatea persoanelor și mobilitatea în incintă',
    blocks: [
      { type:'p', text:'Organizarea mobilitții în incinta portuară vizează atât fluxurile de mărfuri, cât și deplasarea personalului, a vizitatorilor autorizați și a vehiculelor de intervenție. La amplasamentul studiat se analizează rețeaua de circulație internă, separarea fluxurilor de mărfuri de cele de persoane, parcajele pentru personal și accesul pietonal în siguranță. Conflictele dintre vehiculele grele și pietoni reprezintă un risc major care impune separarea fizică a fluxurilor și amenajarea de trasee pietonale protejate.'},
      { type:'p', text:'Accesul personalului la locurile de muncă din incintă se organizează prin puncte de control unde se verifică identitatea și echipamentul de protecție, în coordonare cu cerințele de securitate ISPS. Pentru personalul numeros, transportul intern (microbuze, biciclete) poate fi necesar dată fiind întinderea incintei portuare. Accesibilitatea pentru persoanele cu dizabilități se asigură în zonele administrative și de acces public, conform normelor în vigoare.'},
      { type:'p', text:'Mobilitatea durabilă a personalului (transport public la poarta portului, piste pentru biciclete, parcaje organizate) reduce traficul individual și congestia la accesele portuare. Coordonarea orarelor de schimb cu transportul public local îmbunătățește accesibilitatea. Concluziile privind mobilitatea în incintă se corelează cu accesul rutier la dană, cu securitatea portuară și cu securitatea în muncă, fără a dezvolta planificarea mobilitții la scară urbană sau regională.'},
      { type:'chart', chartType:'bar', title:'Distribuția modală a deplasărilor personalului (%)', labels:['Auto individual','Transport public','Bicicletă/pietonal','Transport organizat'], series:[{ name:'Pondere', data:[52, 24, 11, 13] }] }
    ]
  },
  {
    title: 'Riscul tehnologic și scenarii de accident major',
    blocks: [
      { type:'p', text:'Amplasamentele portuare care manipulează sau depozitează substanțe periculoase prezintă risc tehnologic de accident major (incendiu, explozie, deversare toxică), reglementat de Directiva Seveso III, transpusă prin Legea 59/2016. La amplasamentul studiat, dacă cantitățile de substanțe periculoase depășesc pragurile de încadrare, se elaborează evaluarea de risc de accident major, identificând scenariile credibile, consecințele și măsurile de prevenire și de limitare a efectelor.'},
      { type:'p', text:'Scenariile de accident major includ incendii de depozite de produse inflamabile, explozii de pulberi (cereale, anumite vracuri), eliberări de substanțe toxice și deversări masive cu impact asupra mediului. Modelarea consecințelor (raza de efect a radiației termice, a suprapresiunii de explozie, a norului toxic) determină distanțele de siguranță față de receptorii sensibili și compatibilitatea cu utilizările din vecinătate. Aceste distanțe condiționează planificarea urbană la interfața cu amplasamentul.'},
      { type:'p', text:'Măsurile de prevenire (sisteme de detecție, stingere, segregare, proceduri), planurile de urgență internă și externă și coordonarea cu serviciile de intervenție reduc probabilitatea și severitatea accidentelor majore. Informarea populației din zonele de risc este obligatorie. Concluziile privind riscul tehnologic se corelează cu mărfurile periculoase, cu securitatea portuară și cu compatibilitatea cu locuirea învecinată.'},
      { type:'table', title:'Scenarii de accident major și zone de efect', headers:['Scenariu','Efect principal','Rază efect (m)'], rows:[
        ['Incendiu produse petroliere','Radiație termică','120'],
        ['Explozie pulberi cereale','Suprapresiune','85'],
        ['Eliberare gaz toxic','Nor toxic','350'],
        ['Deversare masivă','Poluare apă','500']
      ]}
    ]
  },
  {
    title: 'Hidrogeologia amplasamentului și apa subterană',
    blocks: [
      { type:'p', text:'Apa subterană în amplasamentele portuare se află la cote apropiate de nivelul apei din acvatoriu, cu care este, de regulă, în legătură hidraulică. La amplasamentul studiat se caracterizează nivelul piezometric, direcția de curgere a apei subterane, permeabilitatea straturilor și relația cu nivelul apei din acvatoriu. Aceste elemente influențează stabilitatea excavațiilor, presiunea pe structurile de sprijin și potențialul de transport al poluanților dinspre sau către acvatoriu.'},
      { type:'p', text:'Variațiile de nivel ale apei din acvatoriu (maree, regim fluvial) se propagă în apa subterană din zona de mal, generând oscilații ale nivelului piezometric și fluctuații ale presiunii pe structurile de cheu. Pentru excavații sub nivelul apei subterane (fundații adânci, subsoluri) sunt necesare epuismente și sprijiniri etanșe. Gradientul hidraulic determină direcția de migrare a eventualilor poluanți din sol către acvatoriu sau invers.'},
      { type:'p', text:'Monitorizarea apei subterane prin foraje de observație urmărește atât nivelul, cât și calitatea acesteia, detectând eventuala contaminare provenind din activitățile portuare. Pentru amplasamentele cu contaminare istorică, controlul migrării poluanților prin apa subterană este esențial. Concluziile privind hidrogeologia se corelează cu geotehnica, cu calitatea apei din acvatoriu și cu eventualele lucrări de decontaminare pentru reconversie.'},
      { type:'chart', chartType:'bar', title:'Nivelul piezometric vs nivelul acvatoriului (cm peste referință)', labels:['Etiaj','Mediu','Ape mari','Maxim'], series:[{ name:'Acvatoriu', data:[40, 280, 560, 720] }, { name:'Apă subterană', data:[55, 270, 510, 640] }] }
    ]
  },
  {
    title: 'Analiza economică a operării danei',
    blocks: [
      { type:'p', text:'Operarea danei generează venituri din taxe portuare, tarife de manipulare și de depozitare, dar și costuri de exploatare (personal, energie, mentenanță, dragaj, redevențe). La amplasamentul studiat se realizează o analiză economică punctuală a operării, identificând structura veniturilor și a costurilor și marja operațională. Spre deosebire de analiza economică la scară de port sau de coridor, această analiză rămâne ancorată la dana studiată și la fluxurile concrete de marfă.'},
      { type:'p', text:'Veniturile depind de tonajul manipulat și de tarifele aplicate pe tipuri de marfă și operațiuni, în timp ce costurile fixe (mentenanță, redevențe, personal de bază) trebuie acoperite indiferent de volum. Pragul de rentabilitate al danei se atinge când veniturile egalează costurile totale: volum prag = costuri fixe / (tarif mediu pe tonă − cost variabil pe tonă). Sub acest volum, operarea danei produce pierderi, ceea ce face critică atragerea unui trafic suficient.'},
      { type:'p', text:'Costurile recurente de dragaj de întreținere, semnificative pentru amplasamentele cu colmatare ridicată, afectează rentabilitatea. Investițiile în echipamente și în modernizare se evaluează prin indicatori de eficiență economică, comparând costul cu sporul de capacitate și de venituri. Concluziile economice se corelează cu capacitatea danei, cu costurile de dragaj și de mentenanță și cu programul de investiții al amplasamentului.'},
      { type:'table', title:'Structura economică a operării danei (mii lei/an)', headers:['Categorie','Tip','Valoare'], rows:[
        ['Venituri manipulare','Tarife marfă','4850'],
        ['Costuri personal','Operare','1620'],
        ['Costuri dragaj','Întreținere','980'],
        ['Mentenanță și redevențe','Fixe','1240']
      ]}
    ]
  },
  {
    title: 'Riscuri de mediu cumulate și evaluarea integrată',
    blocks: [
      { type:'p', text:'Impactul de mediu al amplasamentului portuar rezultă din cumularea mai multor presiuni: poluarea apei, emisiile atmosferice, zgomotul, pulberile, riscul accidental și impactul asupra biodiversitții. La amplasamentul studiat se realizează o evaluare integrată a riscurilor de mediu, care identifică efectele cumulate și sinergice asupra receptorilor sensibili (populație, ecosistem acvatic, sol). Această abordare integrată depășește analiza pe componente separate și fundamentează un program coerent de management de mediu.'},
      { type:'p', text:'Evaluarea cumulată ține cont și de contribuția altor surse din zonă (trafic urban, alte activități industriale, aporturi din bazinul hidrografic), pentru a stabili dacă activitatea portuară, adăugată fondului existent, conduce la depășirea pragurilor de calitate a mediului. Receptorii cei mai expuși (locuințe la limita incintei) cumulează zgomot, pulberi și emisii, ceea ce impune măsuri prioritare. Ierarhizarea riscurilor orientează alocarea resurselor de management de mediu.'},
      { type:'p', text:'Programul de management de mediu al amplasamentului integrează măsurile din toate capitolele (tratarea apelor, reducerea pulberilor și zgomotului, gestiunea deșeurilor, prevenirea poluării accidentale) și prevede monitorizarea și raportarea periodică către autorități. Concluziile privind riscurile de mediu cumulate sintetizează evaluările de impact și fundamentează autorizarea și funcționarea sustenabilă a amplasamentului portuar.'},
      { type:'chart', chartType:'bar', title:'Indice de risc de mediu pe componente (scor 0-100)', labels:['Apă','Aer/pulberi','Zgomot','Risc accidental','Biodiversitate'], series:[{ name:'Scor risc', data:[58, 64, 71, 52, 45] }] }
    ]
  },
  {
    title: 'Digitalizarea operării și sistemele informatice portuare',
    blocks: [
      { type:'p', text:'Digitalizarea operării portuare crește eficiența și trasabilitatea: sisteme de management al terminalului (TOS), platforme comunitare portuare (PCS) pentru schimbul de informații între părți, sisteme de programare a sosirilor de camioane și senzori pentru monitorizarea echipamentelor și a mediului. La amplasamentul studiat se evaluează gradul de digitalizare, sistemele existente și potențialul de îmbunătățire. Digitalizarea reduce timpii morți, optimizează utilizarea resurselor și îmbunătățește planificarea operării danei.'},
      { type:'p', text:'Datele de poziționare AIS, integrate cu sistemele portuare, permit anticiparea sosirilor și planificarea acostării. Senzorii de mediu (calitatea aerului, zgomot, nivelul apei) automatizează monitorizarea și alertarea, iar senzorii pe echipamente (mentenanță predictivă) reduc avariile. Trasabilitatea digitală a mărfurilor și a documentelor accelerează formalitățile și reduce erorile. Securitatea cibernetică a acestor sisteme devine o componentă a securității portuare.'},
      { type:'p', text:'Implementarea digitalizării la nivelul amplasamentului se realizează gradual, prioritizând sistemele cu cel mai mare impact asupra eficienței și siguranței. Integrarea cu sistemele autorităților (vamă, autoritate navală, mediu) facilitează raportarea și conformarea. Concluziile privind digitalizarea se corelează cu capacitatea danei, cu siguranța navigației și cu monitorizarea de mediu, modernizând operarea amplasamentului.'},
      { type:'bullets', items:[
        'Sistem de management al terminalului (TOS) pentru optimizarea operării',
        'Integrarea datelor AIS pentru anticiparea sosirilor',
        'Senzori de mediu pentru monitorizare și alertare automată',
        'Mentenanță predictivă pe echipamente prin senzori',
        'Securitate cibernetică a sistemelor portuare'
      ]}
    ]
  },
  {
    title: 'Stabilitatea taluzelor și a malurilor de incintă',
    blocks: [
      { type:'p', text:'Acolo unde malurile incintei nu sunt protejate cu structuri verticale de cheu, ci cu taluze înclinate, stabilitatea acestora trebuie verificată în raport cu variațiile de nivel al apei, cu solicitările de pe platformă și cu condițiile geotehnice. La amplasamentul studiat se analizează stabilitatea taluzelor de mal prin metode de echilibru limită, care evaluează coeficientul de siguranță la alunecare pe suprafețe potențiale de cedare. Scăderea rapidă a nivelului apei (rapid drawdown) este o condiție critică pentru stabilitatea taluzelor saturate.'},
      { type:'p', text:'Coeficientul de siguranță la stabilitatea taluzului se calculează ca raport între momentul de stabilizare și momentul de răsturnare pe suprafața de alunecare, valorile minime fiind normate pentru diferite combinații de încărcări. Prezența straturilor moi de mâl la baza taluzului reduce drastic stabilitatea. Scăderea rapidă a nivelului apei după o viitură lasă presiunea apei din pori în corpul taluzului fără sprijinul exterior al apei, ceea ce poate provoca alunecări.'},
      { type:'p', text:'Stabilizarea taluzelor se realizează prin reprofilare cu pante mai line, prin protecția împotriva eroziunii, prin drenaje care reduc presiunea apei din pori și, în cazuri severe, prin structuri de sprijin. Monitorizarea deplasărilor și a nivelului apei subterane în taluz permite intervenția preventivă. Concluziile privind stabilitatea taluzelor se corelează cu geotehnica, cu eroziunea malurilor și cu hidrogeologia amplasamentului.'},
      { type:'chart', chartType:'bar', title:'Coeficient de siguranță al taluzului pe scenarii', labels:['Nivel mediu','Ape mari','Drawdown rapid','Seism'], series:[{ name:'FS', data:[1.6, 1.4, 1.1, 1.2] }] }
    ]
  },
  {
    title: 'Operarea pasagerilor și terminalele de croazieră',
    blocks: [
      { type:'p', text:'Unele amplasamente portuare (Constanța, porturile dunărene pe ruta de croazieră) operează nave de pasageri și de croazieră, cu cerințe specifice diferite de operarea mărfurilor. La amplasamentul studiat, dacă include o componentă de pasageri, se evaluează infrastructura de îmbarcare/debarcare, terminalul de pasageri, controlul de frontieră și fluxurile de turiști către oraș. Operarea pasagerilor impune standarde ridicate de confort, accesibilitate și siguranță, distincte de operarea mărfurilor.'},
      { type:'p', text:'Terminalele de croazieră generează fluxuri concentrate de turiști în intervale scurte (la sosirea navei), cu impact asupra infrastructurii urbane de transport și a obiectivelor turistice. Capacitatea terminalului de a procesa pasagerii (control de frontieră, bagaje, transport către oraș) determină experiența și fluiditatea. Accesibilitatea pentru persoane cu mobilitate redusă și serviciile conexe (informare, transport organizat) sunt esențiale pentru calitatea operării de pasageri.'},
      { type:'p', text:'Impactul operării de pasageri asupra orașului este, în general, pozitiv (turism, venituri), dar concentrarea temporară a fluxurilor necesită coordonare cu transportul urban și cu obiectivele turistice. Separarea fluxurilor de pasageri de cele de mărfuri, din motive de siguranță și de confort, este obligatorie acolo unde amplasamentul are funcții mixte. Concluziile privind operarea pasagerilor se corelează cu mobilitatea, cu securitatea portuară și cu interfața port-oraș.'},
      { type:'table', title:'Parametri ai operării de pasageri', headers:['Indicator','Descriere','Valoare'], rows:[
        ['Capacitate procesare','Pasageri/oră','450'],
        ['Escale croazieră/an','Nave pasageri','42'],
        ['Pasageri medii/escală','Debarcare','280'],
        ['Timp mediu procesare','Minute/pasager','3']
      ]}
    ]
  },
  {
    title: 'Compatibilitatea cu reglementările urbanistice locale',
    blocks: [
      { type:'p', text:'Amplasamentul portuar se inserează în teritoriul administrativ al unei localități, fiind reglementat de documentațiile de urbanism (PUG, PUZ) care stabilesc utilizările admise, indicatorii urbanistici și condițiile de amplasare. La amplasamentul studiat se verifică încadrarea în zona funcțională din PUG, compatibilitatea utilizării portuare cu reglementările locale și eventualele restricții. Zonele portuare sunt, de regulă, încadrate ca zone de activități/industriale specializate, cu reglementări adaptate funcției.'},
      { type:'p', text:'Indicatorii urbanistici (POT, CUT, regimul de înălțime, retragerile) aplicabili amplasamentului portuar diferă de cei rezidențiali, fiind adaptați construcțiilor tehnice (magazii, silozuri, instalații). Compatibilitatea cu vecinătățile, mai ales cu zonele rezidențiale, este reglementată prin zone tampon și condiții de funcționare. Schimbarea utilizării (de exemplu, reconversia waterfront) necesită modificarea documentațiilor de urbanism prin PUZ, cu avizele aferente.'},
      { type:'p', text:'Verificarea compatibilitții urbanistice se realizează prin certificatul de urbanism, care precizează regimul juridic, economic și tehnic al terenului și avizele necesare. Coordonarea dintre reglementarea portuară (domeniul public portuar) și cea urbanistică este esențială. Concluziile privind compatibilitatea urbanistică se corelează cu cadrul juridic al domeniului public portuar, cu interfața port-oraș și cu eventualele propuneri de reconversie.'},
      { type:'table', title:'Indicatori urbanistici aplicabili amplasamentului', headers:['Indicator','Reglementare zonă','Valoare'], rows:[
        ['POT maxim (%)','Zonă activități','60'],
        ['CUT maxim','Zonă activități','1,5'],
        ['Regim înălțime (m)','Construcții tehnice','25'],
        ['Zonă tampon spre locuire (m)','Protecție','30']
      ]}
    ]
  },
  {
    title: 'Monitorizarea integrată a mediului la amplasament',
    blocks: [
      { type:'p', text:'Funcționarea sustenabilă a amplasamentului portuar necesită un program de monitorizare integrată a mediului, care urmărește calitatea apei din acvatoriu, calitatea aerului și pulberile, nivelurile de zgomot, calitatea apei subterane și starea sedimentelor. La amplasamentul studiat se proiectează rețeaua de monitorizare: amplasarea punctelor de prelevare și a senzorilor, frecvența măsurătorilor și parametrii urmăriți. Monitorizarea verifică conformarea cu autorizația de mediu și detectează tendințele de degradare.'},
      { type:'p', text:'Punctele de monitorizare se amplasează strategic: la limita incintei spre receptorii sensibili (zgomot, pulberi), în acvatoriu în amonte și aval (calitatea apei), în forajele de observație (apa subterană) și pe sedimentele de fund. Senzorii automați cu transmisie de date permit monitorizarea continuă și alertarea în timp real la depășiri. Integrarea datelor într-un sistem unic facilitează interpretarea și raportarea către autorități (APM, ANAR, Garda de Mediu).'},
      { type:'p', text:'Rezultatele monitorizării fundamentează deciziile de management de mediu: ajustarea măsurilor, investiții suplimentare în reducerea impactului și raportarea conformării. Transparența datelor de mediu, inclusiv către comunitatea locală, consolidează încrederea și acceptabilitatea socială a activității portuare. Concluziile privind monitorizarea integrată sintetizează componentele de mediu și se corelează cu evaluarea riscurilor cumulate și cu avizarea de mediu.'},
      { type:'table', title:'Programul de monitorizare integrată a mediului', headers:['Componentă','Puncte','Frecvență'], rows:[
        ['Calitate apă acvatoriu','4','Lunar'],
        ['Calitate aer/pulberi','3','Continuu'],
        ['Zgomot la limită','5','Trimestrial'],
        ['Apă subterană','6','Semestrial']
      ]}
    ]
  },
  {
    title: 'Reziliența operațională și continuitatea activității',
    blocks: [
      { type:'p', text:'Amplasamentul portuar este expus la perturbări care pot întrerupe activitatea: viituri și inundații, îngheț, furtuni, accidente, defecțiuni ale echipamentelor și evenimente externe. La amplasamentul studiat se evaluează reziliența operațională, adică capacitatea de a menține sau de a restabili rapid funcționarea în fața perturbărilor. Planul de continuitate a activității identifică funcțiile critice, scenariile de perturbare și măsurile de menținere a operării sau de revenire rapidă.'},
      { type:'p', text:'Reziliența se construiește prin redundanța echipamentelor critice, prin stocuri de rezervă, prin proceduri de urgență testate și prin diversificarea modurilor de transport (rutier, feroviar, fluvial) care permit menținerea fluxurilor când unul este indisponibil. Adaptarea infrastructurii la riscurile climatice (inundabilitate, îngheț) reduce vulnerabilitatea. Disponibilitatea operațională anuală, exprimată ca procent din timpul în care amplasamentul poate opera, este un indicator-cheie al rezilienței.'},
      { type:'p', text:'Planificarea rezilienței integrează riscurile naturale (inundații, îngheț, furtuni), tehnologice (accidente, avarii) și operaționale (congestii, lipsă resurse). Coordonarea cu autoritățile și cu partenerii din lanțul logistic asigură un răspuns eficient. Concluziile privind reziliența operațională sintetizează capitolele de risc (inundabilitate, îngheț, accidente) și fundamentează măsurile de adaptare și de continuitate a amplasamentului.'},
      { type:'chart', chartType:'bar', title:'Disponibilitatea operațională anuală pe factori limitativi (zile pierdute)', labels:['Inundații','Îngheț','Vânt/furtună','Mentenanță','Incidente'], series:[{ name:'Zile pierdute', data:[8, 14, 22, 12, 5] }] }
    ]
  },
  {
    title: 'Acceptabilitatea socială și consultarea comunității',
    blocks: [
      { type:'p', text:'Activitatea portuară, prin impactul asupra zonelor rezidențiale (zgomot, pulberi, trafic), generează preocupări în comunitatea locală, iar acceptabilitatea socială condiționează funcționarea pe termen lung și aprobarea extinderilor. La amplasamentul studiat se evaluează relația cu comunitatea, preocupările exprimate și mecanismele de consultare. Transparența privind impactul și măsurile de reducere, alături de consultarea publică prevăzută de procedurile de mediu, construiesc încrederea și reduc conflictele.'},
      { type:'p', text:'Consultarea publică este obligatorie în cadrul procedurilor de evaluare a impactului asupra mediului (Legea 292/2018) și al modificărilor de urbanism. Dincolo de obligațiile legale, dialogul continuu cu comunitatea (informare privind datele de monitorizare, răspuns la sesizări, măsuri vizibile de reducere a impactului) îmbunătățește relația port-oraș. Beneficiile economice ale portului (locuri de muncă, contribuții) se comunică în echilibru cu măsurile de atenuare a impactului negativ.'},
      { type:'p', text:'Mecanismele de consultare includ întâlniri publice, comitete de dialog port-oraș, platforme de sesizare și raportare transparentă a performanței de mediu. Integrarea preocupărilor comunității în deciziile de management consolidează acceptabilitatea socială. Concluziile privind acceptabilitatea socială se corelează cu impactul rezidențial, cu interfața port-oraș și cu monitorizarea de mediu, închizând bucla dintre activitatea portuară și comunitatea gazdă.'},
      { type:'bullets', items:[
        'Consultare publică obligatorie în procedurile de mediu și urbanism',
        'Comitet de dialog port-oraș pentru dialog continuu',
        'Platformă de sesizări și răspuns la preocupările comunității',
        'Raportare transparentă a datelor de monitorizare de mediu',
        'Comunicarea echilibrată a beneficiilor și a măsurilor de atenuare'
      ]}
    ]
  },
  {
    title: 'Coroziunea structurilor metalice în mediu salin și fluvial',
    blocks: [
      { type:'p', text:'Structurile metalice ale amplasamentului portuar (palplanșe, piloți metalici, bolarzi, șine de macara, conducte) sunt expuse coroziunii accelerate în mediul salin maritim sau în apa fluvială cu agresivitate chimică variabilă. Cea mai agresivă zonă este cea de variație a nivelului apei, unde alternanța umezire-uscare și oxigenarea ridicată produc rate de coroziune ce pot depăși 0,3 mm pe an. La amplasamentul studiat se evaluează agresivitatea mediului, grosimea de sacrificiu prevăzută în proiectare și starea actuală a structurilor metalice prin măsurători de grosime cu ultrasunete și inspecții subacvatice.'},
      { type:'p', text:'Rata de coroziune se diferențiază pe zone verticale: zona atmosferică, zona de stropire (splash zone, cea mai agresivă), zona de variație a mareei/nivelului, zona de imersiune permanentă și zona îngropată în sediment. Pierderea de grosime a peretelui metalic = rata de coroziune × durata de expunere, iar verificarea structurală ține cont de secțiunea reziduală. Pentru palplanșele unui cheu cu o rată de 0,2 mm pe an pe o durată de 30 de ani rezultă o pierdere de 6 mm, care trebuie acoperită de grosimea de sacrificiu prevăzută la proiectare.'},
      { type:'p', text:'Protecția împotriva coroziunii se realizează prin acoperiri (vopsele anticorozive, învelișuri groase), prin grosime de sacrificiu și prin protecție catodică, tratată distinct. Monitorizarea periodică a grosimii reziduale și a stării acoperirilor permite planificarea reabilitărilor înainte ca degradarea să compromită siguranța. Concluziile privind coroziunea se corelează cu protecția catodică, cu mentenanța infrastructurii și cu durata de viață a structurilor de acostare, fundamentând programul de întreținere preventivă al amplasamentului.'},
      { type:'chart', chartType:'bar', title:'Rata de coroziune pe zone verticale (mm/an)', labels:['Atmosferică','Stropire','Variație nivel','Imersiune','Îngropată'], series:[{ name:'Rată coroziune', data:[0.05, 0.30, 0.18, 0.10, 0.03] }] }
    ]
  },
  {
    title: 'Protecția catodică a structurilor portuare imersate',
    blocks: [
      { type:'p', text:'Protecția catodică contracarează coroziunea structurilor metalice imersate prin transformarea metalului în catod al unei celule electrochimice, fie cu anozi de sacrificiu (zinc, aluminiu, magneziu), fie cu curent imprimat de la o sursă externă. La amplasamentul studiat, palplanșele, piloții metalici și conductele submerse pot fi protejate catodic pentru a prelungi durata de viață în zona de imersiune. Sistemul se dimensionează în funcție de suprafața de protejat, de densitatea de curent necesară și de rezistivitatea apei (mai redusă în apa sărată, mai ridicată în apa dulce fluvială).'},
      { type:'p', text:'Curentul de protecție necesar = densitatea de curent × suprafața structurii imersate, iar pentru anozi de sacrificiu masa acestora determină durata de funcționare înainte de înlocuire. În apa sărată maritimă, anozii de aluminiu sau zinc sunt eficienți; în apa dulce fluvială, cu rezistivitate mai mare, protecția cu curent imprimat este adesea preferată. Potențialul de protecție al oțelului trebuie menținut sub pragul de imunitate (în jur de minus 0,85 V față de electrodul de referință), verificat prin măsurători periodice.'},
      { type:'p', text:'Protecția catodică acoperă numai zona imersată permanent; zonele de stropire și de variație a nivelului, cele mai agresive, necesită protecție prin acoperiri și grosime de sacrificiu, deoarece nu sunt în contact continuu cu electrolitul. Combinarea metodelor optimizează protecția pe întreaga înălțime a structurii. Concluziile privind protecția catodică se corelează cu coroziunea în mediu salin/fluvial și cu mentenanța infrastructurii, contribuind la durabilitatea structurilor de acostare ale amplasamentului.'},
      { type:'table', title:'Dimensionarea protecției catodice', headers:['Parametru','Descriere','Valoare'], rows:[
        ['Suprafață imersată (mp)','Palplanșe + piloți','1850'],
        ['Densitate curent (mA/mp)','Apă/oțel','25'],
        ['Curent total necesar (A)','Protecție','46'],
        ['Durată anozi (ani)','Înlocuire','12']
      ]}
    ]
  },
  {
    title: 'Depozitarea temporară a containerelor și suprafețele de stocare',
    blocks: [
      { type:'p', text:'Containerele care tranzitează amplasamentul necesită suprafețe de stocare temporară (container yard) organizate în blocuri, cu culoare de circulație pentru utilajele de manipulare. La amplasamentul studiat se evaluează suprafața disponibilă pentru stocarea containerelor, modul de stivuire (pe câte niveluri), tipul de utilaj de manipulare (reach stacker, RTG, straddle carrier) și capacitatea rezultată exprimată în TEU. Organizarea spațială a curții de containere influențează direct productivitatea și capacitatea de tampon între operarea navei și transportul terestru.'},
      { type:'p', text:'Capacitatea de stocare a curții de containere = suprafața utilă × densitatea de stocare (TEU pe metru pătrat) × numărul de niveluri de stivuire × coeficientul de utilizare care ține cont de culoarele de circulație și de containerele goale. Densitatea crește cu numărul de niveluri, dar utilajele de manipulare și capacitatea portantă a platformei limitează stivuirea. Timpul mediu de staționare a containerului în curte (dwell time) determină rulajul și, implicit, capacitatea anuală raportată la capacitatea instantanee.'},
      { type:'p', text:'Organizarea curții separă containerele pline de cele goale, cele de import de cele de export și containerele frigorifice (reefer), care necesită puncte de alimentare electrică. Containerele cu mărfuri periculoase se depozitează în zone dedicate, segregate. Optimizarea amplasării reduce manevrele inutile (reshuffling) și crește productivitatea. Concluziile privind depozitarea containerelor se corelează cu capacitatea danei, cu capacitatea portantă a platformelor și cu fluxurile de transport terestru.'},
      { type:'chart', chartType:'bar', title:'Capacitatea curții de containere pe categorii (TEU)', labels:['Import plin','Export plin','Goale','Reefer','Periculoase'], series:[{ name:'Capacitate', data:[420, 380, 250, 90, 60] }] }
    ]
  },
  {
    title: 'Praful de cereale și riscul de explozie la silozuri',
    blocks: [
      { type:'p', text:'Manipularea și depozitarea cerealelor în silozuri generează praf organic fin, care în concentrații și condiții potrivite formează un amestec exploziv cu aerul. Exploziile de praf de cereale sunt un pericol grav documentat la silozurile portuare, cu potențial de victime și de avariere structurală severă. La amplasamentul studiat, dacă se manipulează cereale, se evaluează sursele de generare a prafului, punctele cu risc de acumulare (elevatoare, transportoare, celule de siloz) și măsurile de prevenire a exploziilor conform reglementărilor privind atmosferele explozive (ATEX).'},
      { type:'p', text:'O explozie de praf necesită prezența simultană a cinci elemente (pentagonul exploziei): combustibil (praful), oxidant (oxigenul din aer), sursă de aprindere, dispersia prafului în nor și confinarea spațiului. Concentrația minimă de explozie a prafului de cereale este de ordinul a câteva zeci de grame pe metru cub. Prevenirea vizează eliminarea acestor elemente: aspirarea prafului la punctele de transfer pentru a evita acumularea, controlul surselor de aprindere (echipamente certificate ATEX, împământare antistatic) și ventilarea.'},
      { type:'p', text:'Măsurile de protecție includ panouri de explozie (venting) care direcționează suprapresiunea în siguranță, sisteme de suprimare a exploziei, izolarea propagării între celule și instalații de aspirare a prafului. Curățenia riguroasă previne acumularea stratului de praf, care poate alimenta explozii secundare devastatoare. Concluziile privind praful de cereale se corelează cu emisiile de pulberi, cu riscul tehnologic de accident major și cu securitatea în muncă la amplasament.'},
      { type:'table', title:'Măsuri de prevenire a exploziei de praf la silozuri', headers:['Măsură','Element vizat','Eficacitate (1-5)'], rows:[
        ['Aspirare praf la transfer','Dispersie/acumulare','5'],
        ['Echipamente ATEX','Sursă aprindere','5'],
        ['Panouri de explozie','Confinare','4'],
        ['Curățenie strat praf','Explozii secundare','4']
      ]}
    ]
  },
  {
    title: 'Pilotajul și remorcajul la intrarea în port',
    blocks: [
      { type:'p', text:'Manevra navelor la intrarea și ieșirea din port, precum și acostarea, sunt asistate de piloți (specialiști în navigația locală care preiau conducerea navei) și de remorchere care asigură forța de manevră necesară navelor mari sau în condiții dificile. La amplasamentul studiat se evaluează cerințele de pilotaj obligatoriu pe segment, numărul și puterea remorcherelor disponibile și procedurile de manevră. Pilotajul reduce riscul de accident prin cunoașterea detaliată a condițiilor locale (curenți, bancuri, trafic), iar remorcajul compensează manevrabilitatea redusă a navelor mari la viteze mici.'},
      { type:'p', text:'Numărul și puterea remorcherelor necesare se determină din forțele de manevră cerute pentru nava de calcul în condiții de vânt și curent. Forța de tracțiune a remorcherelor (bollard pull) trebuie să depășească rezistența opusă navei de vânt și curent, cu o marjă de siguranță. Pentru o navă mare în condiții de vânt puternic, pot fi necesare două sau mai multe remorchere. Coordonarea dintre pilot, remorchere și echipajul navei, prin comunicații radio, asigură o manevră sigură și eficientă.'},
      { type:'p', text:'Disponibilitatea serviciilor de pilotaj și remorcaj condiționează operabilitatea amplasamentului: lipsa remorcherelor adecvate poate impune restricții de tonaj sau limite operaționale pe vânt. Costurile de pilotaj și remorcaj sunt o componentă a costurilor de escală suportate de armator. Concluziile privind pilotajul și remorcajul se corelează cu siguranța navigației, cu geometria acvatoriului și cu riscul de coliziune la amplasament.'},
      { type:'chart', chartType:'bar', title:'Forța de remorcaj necesară pe condiții de vânt (kN)', labels:['Vânt slab','Vânt moderat','Vânt puternic','Furtună'], series:[{ name:'Bollard pull', data:[180, 320, 520, 780] }] }
    ]
  },
  {
    title: 'Cântarul de osie și controlul accesului greu',
    blocks: [
      { type:'p', text:'Vehiculele grele care intră și ies din incinta portuară cu mărfuri trebuie cântărite pentru determinarea masei mărfii, pentru respectarea limitelor legale de masă pe osie și pentru protejarea infrastructurii rutiere. La amplasamentul studiat se evaluează amplasarea și capacitatea cântarelor de osie și de pod-basculă, integrarea acestora cu sistemul de control al accesului și fluxul de cântărire. Cântărirea corectă previne supraîncărcarea vehiculelor, care degradează drumurile și crește riscul de accidente, și asigură corectitudinea tranzacțiilor comerciale bazate pe masă.'},
      { type:'p', text:'Cântarele de pod-basculă determină masa totală a ansamblului, în timp ce cântarele de osie verifică distribuția pe osii față de limitele legale (masa maximă pe osie simplă, dublă sau triplă). Integrarea cântăririi cu identificarea automată a vehiculelor (numere de înmatriculare, etichete RFID) și cu sistemul de gestiune accelerează fluxul la poartă și reduce timpii de așteptare. Datele de cântărire alimentează evidența mărfurilor și verificarea conformării cu reglementările de transport rutier.'},
      { type:'p', text:'Controlul accesului greu coordonează cântărirea cu verificarea documentelor, cu controlul de securitate ISPS și cu programarea sosirilor pentru a evita congestiile la poartă. Vehiculele supraîncărcate sunt oprite sau redirecționate pentru reechilibrarea încărcăturii. Concluziile privind cântarul de osie și controlul accesului greu se corelează cu accesul rutier la dană, cu securitatea portuară și cu protecția infrastructurii rutiere de incintă.'},
      { type:'table', title:'Parametri ai sistemului de cântărire și control acces', headers:['Element','Caracteristică','Valoare'], rows:[
        ['Capacitate pod-basculă (t)','Masă totală','80'],
        ['Limită masă osie simplă (t)','Reglementar','10'],
        ['Debit cântărire (vehicule/oră)','La poartă','45'],
        ['Vehicule supraîncărcate (%)','Respinse','4']
      ]}
    ]
  },
  {
    title: 'Bazinul de retenție și separatoarele de hidrocarburi',
    blocks: [
      { type:'p', text:'Apele pluviale de pe platformele portuare, contaminate cu hidrocarburi, pulberi și reziduuri de mărfuri, trebuie tratate înainte de evacuarea în acvatoriu prin bazine de retenție și separatoare de hidrocarburi. La amplasamentul studiat se dimensionează aceste instalații în funcție de debitul pluvial de calcul, de gradul de contaminare și de limitele de descărcare. Bazinul de retenție atenuează vârful debitului și permite decantarea suspensiilor, iar separatorul de hidrocarburi reține fracțiunea uleioasă plutitoare prin diferența de densitate.'},
      { type:'p', text:'Volumul bazinului de retenție se dimensionează pentru a stoca diferența dintre debitul afluent al ploii de proiectare și debitul evacuat controlat, atenuând astfel vârful. Separatorul de hidrocarburi se dimensionează pentru debitul de tratare, viteza de trecere fiind suficient de mică pentru ca picăturile de ulei să se separe gravitațional la suprafață. Separatoarele moderne cu coalescență ating concentrații reziduale de hidrocarburi sub 5 mg pe litru la evacuare, conform cerințelor de descărcare în mediul acvatic.'},
      { type:'p', text:'Mentenanța separatoarelor (golirea periodică a uleiului reținut și a nămolului decantat) este esențială pentru funcționarea eficientă; un separator neîntreținut deversează poluanți. Reziduurile colectate sunt gestionate ca deșeuri periculoase prin operatori autorizați. Monitorizarea calității efluentului verifică conformarea. Concluziile privind bazinul de retenție și separatoarele se corelează cu managementul apelor pluviale, cu poluarea apei din acvatoriu și cu riscul de poluare accidentală.'},
      { type:'chart', chartType:'bar', title:'Concentrația de hidrocarburi în fluxul de tratare (mg/l)', labels:['Afluent','După retenție','După separator','Limită evacuare'], series:[{ name:'Concentrație', data:[35, 22, 4, 5] }] }
    ]
  },
  {
    title: 'Vibrațiile transmise clădirilor riverane',
    blocks: [
      { type:'p', text:'Pe lângă evaluarea generală a vibrațiilor din activitatea portuară, transmiterea acestora către clădirile riverane locuite necesită o analiză punctuală a propagării și a efectelor asupra structurilor și a confortului ocupanților. La amplasamentul studiat se identifică clădirile riverane expuse, se caracterizează căile de propagare prin terenul aluvionar (care transmite vibrațiile pe distanțe mari) și se evaluează nivelurile la receptori. Vibrațiile pot produce disconfort perceptibil, deteriorări estetice (fisuri în tencuieli) și, în cazuri severe, avarii structurale la clădirile vulnerabile.'},
      { type:'p', text:'Atenuarea vibrațiilor cu distanța urmează o lege de descreștere geometrică și prin amortizare materială, dependentă de frecvență și de natura terenului. Terenurile moi saturate amplifică și transmit vibrațiile de joasă frecvență pe distanțe mari, ceea ce face amplasamentele portuare aluvionare deosebit de problematice. Viteza de oscilație a particulelor (PPV) la fundația clădirilor riverane se compară cu pragurile de disconfort uman (mai stricte, de ordinul fracțiunilor de mm/s) și cu cele de avariere structurală.'},
      { type:'p', text:'Măsurile de reducere a vibrațiilor transmise includ surse cu impact redus, bariere de izolare a vibrațiilor în teren (șanțuri, ecrane), distanțe de protecție și, pentru clădiri sensibile, monitorizarea continuă în timpul activităților intense. Pentru lucrările de construcție cu batere de piloți se preferă piloți forați lângă receptorii sensibili. Concluziile privind vibrațiile transmise clădirilor riverane se corelează cu evaluarea generală a vibrațiilor, cu impactul rezidențial și cu geotehnica terenului.'},
      { type:'table', title:'Niveluri de vibrații la clădirile riverane', headers:['Clădire','Distanță (m)','PPV (mm/s)'], rows:[
        ['Locuință est','45','1,8'],
        ['Locuință nord','90','0,9'],
        ['Clădire administrativă','120','0,6'],
        ['Prag disconfort uman','-','0,3']
      ]}
    ]
  },
  {
    title: 'Impactul asupra pescuitului local și a activităților tradiționale',
    blocks: [
      { type:'p', text:'Activitatea portuară poate afecta pescuitul local și alte activități tradiționale legate de apă (pescuit artizanal, agrement nautic) prin ocuparea acvatoriului, prin poluare, prin zgomot subacvatic și prin modificarea habitatelor piscicole. La amplasamentul studiat se evaluează prezența și amploarea pescuitului local în zona de influență, eventualele conflicte de utilizare a apei și impactul activitților portuare asupra resurselor piscicole. Pescuitul tradițional are valoare economică și socială pentru comunitățile riverane, iar afectarea sa generează tensiuni.'},
      { type:'p', text:'Impactul asupra pescuitului include reducerea suprafețelor accesibile (zone interzise în jurul danelor și al canalelor de navigație), perturbarea populațiilor de pești prin dragaj, zgomot și poluare, precum și deteriorarea calității produselor din cauza contaminării apei și a sedimentelor. Pentru sectoarele dunărene cu valoare pentru ihtiofauna migratoare (sturioni), conflictul dintre activitatea portuară și protecția resurselor piscicole este deosebit de sensibil și reglementat strict.'},
      { type:'p', text:'Atenuarea impactului asupra pescuitului se realizează prin programarea activităților perturbatoare în afara perioadelor sensibile, prin reducerea poluării și a zgomotului subacvatic și prin consultarea comunităților de pescari. Acolo unde impactul este inevitabil, măsurile compensatorii pot fi necesare. Concluziile privind impactul asupra pescuitului se corelează cu biodiversitatea acvatoriului, cu calitatea apei și cu acceptabilitatea socială a activității portuare.'},
      { type:'bullets', items:[
        'Evaluarea amplorii pescuitului local în zona de influență',
        'Programarea activităților perturbatoare în afara perioadelor sensibile',
        'Reducerea poluării și a zgomotului subacvatic',
        'Consultarea comunitților de pescari',
        'Măsuri compensatorii unde impactul este inevitabil'
      ]}
    ]
  },
  {
    title: 'Debarcaderele de agrement și interfața turistică',
    blocks: [
      { type:'p', text:'Multe amplasamente portuare urbane includ sau sunt adiacente unor debarcadere de agrement, porturi turistice (marine) și zone de promenadă pe malul apei, care creează o interfață turistică cu valoare economică și recreativă. La amplasamentul studiat, dacă există o componentă de agrement, se evaluează infrastructura aferentă (pontoane, locuri de acostare pentru ambarcațiuni mici, facilități pentru turiști), separarea de activitățile portuare operative și potențialul de dezvoltare turistică. Interfața turistică valorifică frontul de apă ca resursă urbană atractivă.'},
      { type:'p', text:'Debarcaderele de agrement necesită ape liniștite (protejate de hula navelor comerciale și de valuri), adâncimi reduse adaptate ambarcațiunilor mici, facilități (utilități la ponton, parcaje, servicii) și acces facil dinspre oraș. Separarea fizică și operațională de zonele de marfă este obligatorie din motive de siguranță. Numărul de locuri de acostare, fluxul de vizitatori și serviciile oferite determină capacitatea și atractivitatea componentei turistice a amplasamentului.'},
      { type:'p', text:'Dezvoltarea turistică a frontului de apă (promenade, terase, croaziere fluviale locale, evenimente) generează venituri și animă spațiul urban, dar trebuie coordonată cu activitțile portuare și cu protecția mediului. Pentru amplasamentele în reconversie, componenta turistică este adesea centrală. Concluziile privind debarcaderele de agrement și interfața turistică se corelează cu reconversia waterfront, cu interfața port-oraș și cu integrarea peisageră a amplasamentului.'},
      { type:'chart', chartType:'bar', title:'Fluxul de vizitatori la interfața turistică pe sezon (mii persoane)', labels:['Primăvară','Vară','Toamnă','Iarnă'], series:[{ name:'Vizitatori', data:[24, 58, 31, 9] }] }
    ]
  },
  {
    title: 'Drumurile de incintă și capacitatea portantă a căilor de circulație',
    blocks: [
      { type:'p', text:'Drumurile de incintă portuară suportă un trafic intens de vehicule grele încărcate (camioane cu containere, transport de vrac) și de utilaje de manipulare, ceea ce impune o capacitate portantă și o structură rutieră adecvate. La amplasamentul studiat se evaluează starea drumurilor de incintă, structura rutieră (grosimea straturilor, tipul de îmbrăcăminte), capacitatea portantă și necesarul de reabilitare. Drumurile subdimensionate se degradează rapid sub traficul greu, generând costuri de mentenanță și perturbând operarea.'},
      { type:'p', text:'Dimensionarea structurii rutiere de incintă ține cont de traficul de calcul exprimat în osii standard echivalente acumulate pe durata de viață, care în mediul portuar este foarte ridicat din cauza maselor mari pe osie. Îmbrăcămințile rigide (dale de beton) sau pavajele grele sunt adesea preferate îmbrăcămintelor flexibile (asfalt) în zonele cu solicitări concentrate și staționare prelungită a vehiculelor grele. Pantele transversale asigură scurgerea apelor către sistemul de colectare pluvială.'},
      { type:'p', text:'Geometria drumurilor de incintă (lățimi, raze de curbură) trebuie să permită manevra ansamblurilor lungi și a utilajelor de manipulare a containerelor. Separarea fluxurilor de vehicule de cele pietonale crește siguranța. Întreținerea drumurilor previne degradarea accelerată și menține operabilitatea. Concluziile privind drumurile de incintă se corelează cu accesul rutier la dană, cu capacitatea portantă a platformelor și cu managementul apelor pluviale.'},
      { type:'table', title:'Structura și capacitatea drumurilor de incintă', headers:['Element','Descriere','Valoare'], rows:[
        ['Grosime structură rutieră (cm)','Straturi','85'],
        ['Tip îmbrăcăminte','Solicitare grea','Beton'],
        ['Sarcină pe osie de calcul (t)','Trafic greu','13'],
        ['Lățime drum principal (m)','Geometrie','12']
      ]}
    ]
  },
  {
    title: 'Sistemul de stingere a incendiilor în incinta portuară',
    blocks: [
      { type:'p', text:'Incinta portuară prezintă risc de incendiu prin prezența mărfurilor inflamabile, a produselor petroliere, a echipamentelor și a navelor la dană. La amplasamentul studiat se evaluează sistemul de stingere a incendiilor: rețeaua de hidranți, rezerva de apă pentru incendiu, instalațiile speciale (spumă pentru produse petroliere, instalații fixe la depozite cu risc) și accesul mijloacelor de intervenție. Dimensionarea sistemului se face pentru scenariile de incendiu cele mai severe identificate la depozitele și instalațiile amplasamentului.'},
      { type:'p', text:'Debitul de apă necesar pentru stingere se determină din suprafața și natura compartimentului de incendiu cel mai solicitant, conform normativelor de securitate la incendiu. Rezerva de apă trebuie să asigure debitul calculat pe durata de intervenție prevăzută. Pentru produsele petroliere și alte lichide inflamabile, stingerea cu apă este ineficientă și se folosesc instalații cu spumă, care formează o peliculă izolatoare. Tunurile de apă/spumă și monitoarele fixe acoperă zonele de risc major.'},
      { type:'p', text:'Accesul rapid al mijloacelor de intervenție la toate zonele incintei, hidranții poziționați strategic și instruirea personalului de prima intervenție reduc timpul de răspuns și limitează propagarea. Coordonarea cu serviciile de pompieri și planul de intervenție în caz de incendiu completează sistemul. Concluziile privind stingerea incendiilor se corelează cu mărfurile periculoase, cu riscul tehnologic de accident major și cu rețelele de utilități ale amplasamentului.'},
      { type:'chart', chartType:'bar', title:'Debit de apă pentru stingere pe zone de risc (l/s)', labels:['Depozit general','Produse petroliere','Siloz cereale','Container yard'], series:[{ name:'Debit necesar', data:[45, 80, 60, 35] }] }
    ]
  },
  {
    title: 'Containerele frigorifice (reefer) și alimentarea electrică dedicată',
    blocks: [
      { type:'p', text:'Containerele frigorifice (reefer), care transportă mărfuri perisabile la temperatură controlată, necesită alimentare electrică continuă pe durata staționării în portul de tranzit. La amplasamentul studiat, dacă se manipulează reefere, se evaluează numărul de prize de alimentare, puterea instalată necesară și capacitatea rețelei electrice. Întreruperea alimentării unui reefer compromite marfa perisabilă, generând pierderi și răspundere, ceea ce face fiabilitatea alimentării critică pentru acest segment.'},
      { type:'p', text:'Puterea electrică necesară pentru curtea de reefere = numărul de prize × puterea medie pe container × factorul de simultaneitate. Un container reefer consumă în medii câțiva kilowați, iar o curte cu zeci de prize necesită o putere instalată semnificativă, dimensionată cu rezervă pentru vârfurile de cerere (vară, mărfuri congelate). Monitorizarea temperaturii containerelor și alarmarea la abateri previn deteriorarea mărfii. Sursele de rezervă (generatoare) asigură continuitatea la întreruperi de rețea.'},
      { type:'p', text:'Organizarea zonei de reefere, cu prize accesibile și cu monitorizare automată, optimizează manipularea și reduce riscul de pierdere a mărfii. Consumul energetic al reeferelor contribuie semnificativ la bilanțul energetic al amplasamentului. Concluziile privind containerele frigorifice se corelează cu depozitarea containerelor, cu rețelele de utilități și cu bilanțul energetic al amplasamentului.'},
      { type:'table', title:'Dimensionarea alimentării containerelor frigorifice', headers:['Parametru','Descriere','Valoare'], rows:[
        ['Număr prize reefer','Curte dedicată','64'],
        ['Putere medie/container (kW)','Consum','4'],
        ['Factor simultaneitate (%)','Vârf','80'],
        ['Putere instalată necesară (kW)','Total','205']
      ]}
    ]
  },
  {
    title: 'Managementul nămolurilor de dragaj și depozitarea controlată',
    blocks: [
      { type:'p', text:'Sedimentele rezultate din dragajul de întreținere, mai ales cele contaminate, necesită un management specific al nămolurilor: deshidratare, stocare temporară, tratare și depozitare controlată sau valorificare. La amplasamentul studiat se evaluează volumele de nămol generate anual, gradul de contaminare (determinat anterior), opțiunile de gestionare și capacitatea depozitelor disponibile. Managementul nămolurilor de dragaj este o componentă majoră a costurilor recurente și un aspect de mediu reglementat strict.'},
      { type:'p', text:'Nămolurile dragate au un conținut ridicat de apă, ceea ce impune deshidratarea (în bazine de sedimentare, prin geotuburi sau presare mecanică) pentru reducerea volumului înainte de transport și depozitare. Nămolurile curate pot fi valorificate ca material de umplutură sau pentru reabilitarea malurilor, în timp ce cele contaminate necesită depozite controlate cu impermeabilizare și colectarea levigatului. Caracterizarea chimică prealabilă determină ruta de gestionare a fiecărui lot dragat.'},
      { type:'p', text:'Trasabilitatea nămolurilor, de la dragaj până la destinația finală, și conformarea cu legislația deșeurilor și a evaluării de mediu sunt obligatorii. Reducerea volumului de nămol prin minimizarea colmatării (prin lucrări hidrotehnice care reduc depunerea) scade costurile. Concluziile privind managementul nămolurilor se corelează cu dragajul de întreținere, cu calitatea sedimentelor de fund și cu analiza economică a operării amplasamentului.'},
      { type:'chart', chartType:'bar', title:'Repartiția nămolurilor de dragaj pe destinație (mii mc/an)', labels:['Valorificare umplutură','Reabilitare maluri','Depozit controlat','Tratare'], series:[{ name:'Volum', data:[18, 9, 14, 3] }] }
    ]
  },
  {
    title: 'Microzonarea seismică a amplasamentului portuar',
    blocks: [
      { type:'p', text:'Amplasamentele portuare situate în zone cu hazard seismic relevant necesită o microzonare seismică punctuală, care ține cont de efectul condițiilor locale de teren asupra mișcării seismice. La amplasamentul studiat se evaluează amplificarea seismică datorată straturilor moi aluvionare, care pot mări considerabil accelerațiile la suprafață față de roca de bază, conform spectrelor de proiectare din normativul P100-1. Terenurile portuare moi și saturate sunt printre cele mai defavorabile din punct de vedere al răspunsului seismic.'},
      { type:'p', text:'Efectul de amplificare locală se caracterizează prin clasa de teren (în funcție de viteza undelor de forfecare în primii 30 de metri) și prin perioada predominantă a depozitului, care poate intra în rezonanță cu structurile. Analiza răspunsului seismic al amplasamentului (1D sau 2D) determină accelerațiile și deformațiile la suprafață, fundamentând proiectarea seismică a cheiurilor, platformelor și construcțiilor. Combinarea cu evaluarea de lichefiere oferă imaginea completă a comportamentului seismic.'},
      { type:'p', text:'Microzonarea seismică orientează soluțiile de fundare, măsurile de îmbunătățire a terenului și detaliile de proiectare antiseismică. Pentru infrastructura portuară critică, performanța seismică (menținerea funcționalitții după cutremur) este un obiectiv de proiectare. Concluziile privind microzonarea seismică se corelează cu geotehnica terenului de fundare, cu lichefierea și cu proiectarea cheiurilor și a structurilor amplasamentului.'},
      { type:'table', title:'Parametri ai răspunsului seismic local', headers:['Parametru','Descriere','Valoare'], rows:[
        ['Clasă teren','Aluvionar moale','D'],
        ['Accelerație roca de bază (g)','Hazard zonă','0,20'],
        ['Factor amplificare','Strat moale','1,8'],
        ['Accelerație la suprafață (g)','Proiectare','0,36']
      ]}
    ]
  },
  {
    title: 'Formalitățile vamale și fluxul de mărfuri la frontieră',
    blocks: [
      { type:'p', text:'Porturile maritime și fluviale care operează în trafic internațional sunt puncte de trecere a frontierei, unde se desfășoară formalitățile vamale și controalele de frontieră asupra mărfurilor și, dacă este cazul, a pasagerilor. La amplasamentul studiat se evaluează infrastructura și fluxurile aferente formalitților vamale: zonele de control, magaziile vamale, fluxul documentar și timpii de procesare. Eficiența formalităților vamale influențează direct fluiditatea lanțului logistic și timpul de tranzit al mărfurilor prin amplasament.'},
      { type:'p', text:'Controlul vamal include verificarea documentelor, scanarea containerelor (scanere de mărfuri fixe sau mobile) și controlul fizic prin sondaj sau pe baza analizei de risc. Mărfurile sub control vamal se depozitează în zone dedicate (antrepozite, magazii vamale) până la finalizarea formalităților. Digitalizarea formalităților (declarații electronice, ghișeu unic) și coordonarea controalelor reduc timpii de staționare. Trasabilitatea mărfurilor sub supraveghere vamală este asigurată prin sisteme informatice integrate.'},
      { type:'p', text:'Organizarea spațială a zonelor vamale, separarea fluxurilor controlate de cele libere și accesul scanerelor influențează capacitatea de procesare la frontieră. Coordonarea dintre autoritatea vamală, poliția de frontieră și operatorul portuar fluidizează tranzitul. Concluziile privind formalitțile vamale se corelează cu securitatea portuară, cu depozitarea containerelor și cu fluxurile de transport terestru de la și către amplasament.'},
      { type:'chart', chartType:'bar', title:'Timpul mediu de procesare vamală pe tip de control (ore)', labels:['Doar documente','Scanare','Control fizic sondaj','Control complet'], series:[{ name:'Durată', data:[2, 4, 8, 18] }] }
    ]
  },
  {
    title: 'Zonele tampon și distanțele de protecție față de locuire',
    blocks: [
      { type:'p', text:'Compatibilitatea dintre activitatea portuară și zonele rezidențiale învecinate se asigură prin zone tampon și distanțe de protecție, care separă funcțiunile incompatibile și atenuează impactul (zgomot, pulberi, risc). La amplasamentul studiat se evaluează adecvarea zonelor tampon existente, distanțele față de receptorii sensibili și măsurile de protecție implementate. Zonele tampon, amenajate ca spații verzi sau ca fâșii neconstruite, reduc expunerea populației și creează o tranziție între incinta portuară și țesutul urban.'},
      { type:'p', text:'Distanțele de protecție se stabilesc în funcție de tipul de impact: pentru zgomot și pulberi, distanța atenuează expunerea conform legilor de propagare; pentru riscul de accident major (depozite Seveso), distanțele rezultă din modelarea consecințelor scenariilor de accident. Perdelele vegetale dense din zonele tampon rețin pulberile și atenuează parțial zgomotul, pe lângă valoarea peisageră. Reglementările de urbanism stabilesc lățimile minime ale zonelor de protecție pentru diferite activități.'},
      { type:'p', text:'Acolo unde zonele tampon sunt insuficiente din motive istorice (locuire dezvoltată în proximitate), măsurile la sursă și pe calea de propagare compensează parțial. Conservarea și amenajarea zonelor tampon previn apropierea locuirii de incinta portuară prin reglementări urbanistice. Concluziile privind zonele tampon se corelează cu impactul rezidențial, cu riscul tehnologic și cu compatibilitatea urbanistică a amplasamentului.'},
      { type:'table', title:'Zone tampon și distanțe de protecție necesare', headers:['Tip impact','Distanță necesară (m)','Distanță existentă (m)'], rows:[
        ['Zgomot','100','85'],
        ['Pulberi','150','120'],
        ['Risc accident major','350','300'],
        ['Vizual/peisager','30','25']
      ]}
    ]
  },
  {
    title: 'Gestiunea apelor uzate menajere de la nave și din incintă',
    blocks: [
      { type:'p', text:'Navele la dană și activitățile din incinta portuară generează ape uzate menajere care trebuie colectate și epurate, în loc să fie deversate în acvatoriu. La amplasamentul studiat se evaluează sistemul de colectare a apelor uzate menajere de la nave (conform MARPOL Anexa IV) și din clădirile administrative și sociale ale incintei, precum și racordarea la rețeaua de canalizare urbană sau la o stație de epurare proprie. Deversarea necontrolată a apelor uzate în acvatoriu poluează apa și afectează calitatea mediului acvatic.'},
      { type:'p', text:'Recepția apelor uzate menajere de la nave se realizează prin facilități portuare dedicate (racorduri, vidanjare) care preiau conținutul tancurilor de retenție ale navelor. Apele colectate se direcționează către epurare. Volumul de ape uzate de la nave depinde de numărul de persoane la bord și de durata staționării, iar cele din incintă, de numărul de angajați și de facilități. Dimensionarea sistemului de colectare și epurare ține cont de aceste fluxuri și de vârfurile de încărcare.'},
      { type:'p', text:'Conformarea cu cerințele de descărcare a apelor epurate și monitorizarea calității efluentului verifică protecția acvatoriului. Racordarea la rețeaua urbană de canalizare este preferabilă acolo unde este posibilă, evitând o stație de epurare proprie. Concluziile privind gestiunea apelor uzate menajere se corelează cu managementul deșeurilor de navă, cu poluarea apei din acvatoriu și cu rețelele de utilități ale amplasamentului.'},
      { type:'chart', chartType:'bar', title:'Volumul de ape uzate menajere colectate (mc/lună)', labels:['De la nave','Clădiri administrative','Zone sociale','Vizitatori'], series:[{ name:'Volum', data:[180, 95, 60, 25] }] }
    ]
  },
  {
    title: 'Planul de organizare a incintei și fluxurile operaționale',
    blocks: [
      { type:'p', text:'Organizarea spațială a incintei portuare (layout) condiționează eficiența operării, prin amplasarea raționalcă a danelor, platformelor de depozitare, drumurilor, liniilor feroviare, clădirilor și utilităților. La amplasamentul studiat se analizează planul de organizare existent, fluxurile operaționale (de la navă la depozitare și la transportul terestru) și eventualele puncte de congestie sau de conflict. Un layout optimizat minimizează distanțele de transport intern, evită încrucișările de fluxuri și maximizează utilizarea suprafețelor disponibile.'},
      { type:'p', text:'Fluxul operațional tipic urmează un lanț: acostarea navei la dană, descărcarea cu macarale pe platformă, transferul către zona de depozitare, staționarea temporară și evacuarea prin transport rutier sau feroviar (sau fluxul invers la export). Fiecare verigă are o capacitate, iar veriga cu cea mai mică capacitate (gâtuirea) limitează debitul întregului sistem. Identificarea și eliminarea gâtuirilor crește capacitatea fără investiții majore în infrastructura de bază.'},
      { type:'p', text:'Reorganizarea layoutului (relocarea funcțiilor, separarea fluxurilor, dedicarea zonelor pe tipuri de marfă) poate îmbunătăți semnificativ eficiența. Planul de organizare integrează cerințele de siguranță, de securitate și de mediu. Concluziile privind organizarea incintei sintetizează capitolele privind danele, platformele, drumurile și fluxurile de transport, fundamentând proiectul de sistematizare al amplasamentului.'},
      { type:'table', title:'Capacitatea verigilor fluxului operațional (tone/oră)', headers:['Verigă','Funcție','Capacitate'], rows:[
        ['Descărcare navă','Macarale cheu','320'],
        ['Transfer la depozit','Transport intern','280'],
        ['Depozitare temporară','Platformă','450'],
        ['Evacuare terestră','Rutier + feroviar','240']
      ]}
    ]
  },
  {
    title: 'Sinteza tehnică a amplasamentului și recomandări punctuale',
    blocks: [
      { type:'p', text:'Sinteza tehnică integrează concluziile capitolelor specializate într-o imagine coerentă a amplasamentului portuar studiat, evidențiind atuurile, constrângerile și măsurile prioritare. Pe componenta geotehnică, fundarea pe terenuri aluvionare impune soluții indirecte (piloți) și atenția la lichefiere. Pe componenta de navigație, batimetria și dragajul de întreținere condiționează pescajul admis. Pe componenta de mediu, zgomotul nocturn, pulberile și riscul accidental sunt aspectele critice la interfața cu locuirea.'},
      { type:'p', text:'Recomandările punctuale vizează amplasamentul concret, nu strategia regională: optimizarea programului de dragaj pentru menținerea adâncimii la dană; implementarea shore power și a măsurilor de reducere a pulberilor pentru protecția rezidenților; modernizarea racordului feroviar pentru transfer modal; adaptarea cotelor la inundabilitate și la schimbările climatice; consolidarea sistemului de monitorizare integrată a mediului. Aceste măsuri se ierarhizează după impactul asupra siguranței, mediului și eficienței.'},
      { type:'p', text:'Sinteza confirmă caracterul punctual al studiului, ancorat la parcela și la dana analizate, distinct de masterplanul portuar regional care tratează conectivitatea multimodală, navigabilitatea Dunării la scară de coridor și logistica regională. Recomandările fundamentează proiectul tehnic, planul de investiții și programul de management de mediu al amplasamentului, asigurând o dezvoltare tehnică solidă, conformă reglementărilor și acceptabilă social.'},
      { type:'table', title:'Sinteza măsurilor prioritare la amplasament', headers:['Domeniu','Măsură prioritară','Prioritate (1-5)'], rows:[
        ['Navigație','Program optimizat de dragaj','5'],
        ['Mediu','Shore power și reducere pulberi','5'],
        ['Transport','Modernizare racord feroviar','4'],
        ['Climă','Adaptare cote la inundabilitate','4'],
        ['Mediu','Monitorizare integrată consolidată','3']
      ]}
    ]
  }
];
