window._PROFILE_DEEP = window._PROFILE_DEEP || {};
window._PROFILE_DEEP['salin_inf'] = [
  {
    title: 'Identificarea amplasamentului salin și încadrarea cadastrală',
    blocks: [
      { type:'p', text:'Studiul de față analizează un amplasament punctual situat în perimetrul unei localități cu resursă de sare gemă (de tipul Turda, Slănic Prahova, Ocna Sibiului, Praid, Cacica, Târgu Ocna sau Ocnele Mari), unde subzona conține atât caverne de exploatare, cât și suprafețe cu potențial balnear. Identificarea pornește de la numărul cadastral al parcelei, suprapus peste limita perimetrului minier delimitat de Agenția Națională pentru Resurse Minerale (ANRM) și peste evidența concesionarului Salrom (Societatea Națională a Sării). Datele de poziționare se preiau din OSM și din ortofotoplanul Copernicus, iar altimetria din modelul digital de teren. Încadrarea cadastrală fixează regimul juridic al lotului și relația cu domeniul public minier.' },
      { type:'p', text:'Pe amplasament se disting trei categorii funcționale care nu trebuie confundate: suprafața de teren cu construcții și acces, proiecția la zi a cavernelor subterane și zona de protecție hidrominerală a lacurilor sărate. Fiecare categorie are propriul regim de utilizare și propriile constrângeri. Proiecția cavernei la suprafață („footprint” subteran) se obține prin transferul conturului galeriilor pe planul cadastral, ținând cont de unghiul de influență al subsidenței. Acolo unde lipsesc planuri de mină actualizate, conturul se aproximează din relevee Salrom și din observația suprafeței. Această încadrare punctuală deosebește prezentul studiu de amplasament de masterplanul regional de turism balnear, care tratează rețeaua de stațiuni la altă scară.' },
      { type:'p', text:'Coordonatele de referință se exprimă în sistemul național Stereo70 (EPSG:3844) și se reproiectează în WGS84 pentru integrarea în platformă. Limitele de protecție rezultă din legislația minelor și din normele balneare, iar suprapunerea cu intravilanul localității condiționează ce funcțiuni de agrement și cazare se pot autoriza. Documentația cadastrală trebuie corelată cu licența de exploatare ANRM și cu eventualele servituți de subteran. Această secțiune stabilește cadrul spațial pe care se construiesc toate analizele geotehnice, hidrogeologice și de turism balnear din capitolele următoare ale studiului.' },
      { type:'table', headers:['Element','Sursă','Suprafață (mp)'], rows:[
        ['Parcelă la zi','Cadastru / OCPI','4820'],
        ['Proiecție caverne','Relevee Salrom','12600'],
        ['Zonă protecție lac sărat','Norme balneare','9400'],
        ['Drum de acces','OSM','1150']
      ]}
    ]
  },
  {
    title: 'Geologia masivului de sare la nivel de amplasament',
    blocks: [
      { type:'p', text:'Resursa de sare gemă din amplasament aparține formațiunilor evaporitice miocene (badenian), constituite din halit (NaCl) cu intercalații de argilă și anhidrit. La nivel punctual interesează grosimea pachetului de sare deasupra și dedesubtul cavernelor, precum și prezența capacului argilos de protecție. Datele litologice se preiau din fișele de foraj ANRM și din profilele Salrom, completate cu observații de teren în deschiderile existente. Identificarea contactului dintre sarea masivă și formațiunile acoperitoare („caprock”) este esențială, pentru că acest contact controlează atât stabilitatea, cât și riscul de pătrundere a apei dulci în masiv.' },
      { type:'p', text:'Sarea gemă are o comportare reologică particulară: este practic impermeabilă, dar curge plastic sub tensiune, fenomen numit fluaj („creep”). La nivelul amplasamentului, viteza de fluaj depinde de adâncime, temperatură și conținutul de impurități. Pachetele cu argilă reduc rezistența și favorizează planuri de alunecare. Profilele geologice locale trebuie să indice cota acoperișului de sare, grosimea utilă și adâncimea bazei explorate. Aceste valori alimentează direct calculul presiunii litostatice și al factorului de stabilitate a pilierilor, tratate în capitolele dedicate geotehnicii cavernelor.' },
      { type:'p', text:'Spre deosebire de studiul regional, care descrie cuvetele saline la scara bazinului, aici geologia se restrânge la coloana litologică verticală a amplasamentului și la variațiile pe orizontală în limita perimetrului. Se documentează eventuale falii sau zone de fractură care ar putea intercepta caverna, precum și prezența nivelurilor acvifere în acoperiș. Sursele rămân ANRM (date de resursă) și Salrom (date de exploatare), iar interpretarea respectă Legea minelor 85/2003 privind evidența zăcământului. Coloana litologică sintetică de mai jos rezumă structura tipică întâlnită pe astfel de amplasamente.' },
      { type:'table', headers:['Strat','Litologie','Grosime (m)'], rows:[
        ['Acoperitor','Argile, nisipuri','38'],
        ['Caprock','Argilă cu gips','12'],
        ['Sare masivă superioară','Halit','95'],
        ['Sare cu intercalații','Halit + argilă','60']
      ]}
    ]
  },
  {
    title: 'Geotehnica cavernelor de sare și stabilitatea generală',
    blocks: [
      { type:'p', text:'Stabilitatea cavernelor de sare pe amplasament se evaluează printr-un ansamblu de parametri: deschiderea camerelor, înălțimea, lățimea pilierilor de sare lăsați între goluri și grosimea tavanului („planseu de coronament”). Pentru saline tip cameră și pilier (room-and-pillar), regula empirică consacrată impune ca lățimea pilierului să fie comparabilă cu înălțimea camerei și ca raportul deschidere/grosime tavan să rămână subunitar. La nivel de amplasament, geometria reală se preia din releveele Salrom și se compară cu aceste praguri. Orice abatere semnificativă semnalează nevoia de monitorizare intensificată sau de consolidare.' },
      { type:'p', text:'Factorul de stabilitate global se exprimă ca raport între rezistența disponibilă a structurii portante de sare și solicitarea efectivă. Pentru un pilier, FS = Rc / σp, unde Rc este rezistența la compresiune a sării (cca 20–35 MPa) iar σp efortul vertical mediu pe pilier. Valorile FS sub 1,5 indică risc, iar peste 2,0 o marjă confortabilă. Pe amplasamentele turistice, unde cavernele sunt vizitate, pragul de siguranță este ridicat deliberat. Geotehnica trebuie să integreze și efectul fluajului care, în timp, redistribuie tensiunile și poate eroda marja inițială de siguranță a structurii.' },
      { type:'p', text:'Evaluarea generală se completează cu observații vizuale: fisuri în tavan, exfolieri de pe pereți, sare căzută pe vatră, deformații ale instalațiilor. Aceste indicii calitative se coroborează cu măsurătorile de convergență. Spre deosebire de protecția resursei la scară de zonă, aici interesează strict siguranța golului concret și a parcelei de la suprafață. Cadrul legal este dat de normele de securitate minieră și de Legea 85/2003. Tabelul de mai jos sintetizează factorii de stabilitate calculați pe principalele camere ale amplasamentului analizat, ca punct de plecare pentru capitolele de detaliu.' },
      { type:'table', headers:['Cameră','Deschidere (m)','Factor stabilitate ×10'], rows:[
        ['Camera A','18','21'],
        ['Camera B','24','17'],
        ['Camera C (turistică)','32','19'],
        ['Camera D','14','24']
      ]}
    ]
  },
  {
    title: 'Presiunea litostatică asupra cavernei',
    blocks: [
      { type:'p', text:'Presiunea litostatică reprezintă încărcarea verticală exercitată de coloana de roci de deasupra cavernei și constituie solicitarea fundamentală în calculul de stabilitate. Formula de bază este σv = ρ · g · H, unde ρ este densitatea medie a rocilor acoperitoare (cca 2200–2400 kg/mc), g accelerația gravitațională (9,81 m/s²) iar H adâncimea de la suprafață la tavanul cavernei. Pentru un acoperiș de 150 m, presiunea verticală rezultă de ordinul 3,2–3,5 MPa. Această valoare se calculează punctual pentru fiecare cameră, în funcție de adâncimea proprie și de densitatea reală a coloanei litologice locale.' },
      { type:'p', text:'Pe pilierii de sare, efortul real este mai mare decât presiunea litostatică medie, pentru că greutatea acoperișului din dreptul golurilor se transferă pe suprafața redusă a pilierilor. Teoria ariei tributare exprimă acest efect: σp = σv · (Ac + Ap) / Ap, unde Ac este aria camerei iar Ap aria pilierului. Cu cât raportul de extracție crește, cu atât efortul pe pilier crește, ceea ce reduce factorul de stabilitate. La nivel de amplasament, aceste calcule se aplică direct geometriei relevate, oferind o imagine cantitativă a marjei de siguranță disponibile pentru fiecare structură portantă subterană.' },
      { type:'p', text:'În cazul cavernelor obținute prin dizolvare (sonde de saramură), presiunea internă a fluidului contează la fel de mult: o cavernă plină cu saramură este sprijinită din interior, în timp ce golirea ei o expune presiunii litostatice complete. De aceea, gestionarea nivelului de saramură devine o măsură de stabilitate, nu doar de exploatare. Datele de adâncime provin din profilele Salrom și ANRM. Capitolul stabilește baza numerică pentru analiza convergenței și a subsidenței, ferind amplasamentul de surprize. Graficul ilustrează creșterea presiunii litostatice cu adâncimea pe coloana locală.' },
      { type:'chart', data:[['50 m',1.1],['100 m',2.3],['150 m',3.4],['200 m',4.6],['250 m',5.7]], title:'Presiune litostatică vs. adâncime', source:'Calcul σv=ρgH, profile ANRM/Salrom' }
    ]
  },
  {
    title: 'Convergența pereților și fluajul sării',
    blocks: [
      { type:'p', text:'Convergența reprezintă apropierea progresivă a pereților și a tavanului unei caverne sub efectul fluajului sării. Fenomenul este lent dar continuu și constituie unul dintre principalii indicatori de comportament în timp al golului. La nivel de amplasament, convergența se exprimă ca reducere procentuală a deschiderii sau înălțimii pe an. Valori sub 0,5% pe an indică o cavernă stabilă, în timp ce ritmuri de câțiva procente semnalează suprasolicitare. Măsurarea se face cu repere fixe și instrumente de tip extensometru, integrate într-un program de monitorizare a comportării subterane.' },
      { type:'p', text:'Viteza de fluaj urmează o lege de tip putere în funcție de efortul deviatoric și de temperatură: ε̇ = A · σⁿ · exp(−Q/RT), unde A este o constantă de material, n exponentul de tensiune (cca 3–5 pentru halit), Q energia de activare, R constanta gazelor și T temperatura absolută. Cu cât adâncimea și temperatura cresc, cu atât fluajul se accelerează. Această dependență explică de ce cavernele adânci converg mai repede decât cele superficiale. Parametrii se calibrează din literatura de specialitate și din observațiile locale ale Salrom pe galeriile vechi ale amplasamentului.' },
      { type:'p', text:'Convergența nu este în sine periculoasă atâta vreme cât este lentă și uniformă; problemele apar când se accelerează brusc, indicând cedarea unui pilier sau apariția unei fracturi. De aceea, urmărirea derivatei temporale a convergenței este mai relevantă decât valoarea absolută. Spre deosebire de studiul regional al resursei, aici interesul este strict comportamentul golului vizitabil și impactul asupra parcelei. Datele se înscriu în fișa de monitorizare a amplasamentului. Tabelul prezintă ratele de convergență măsurate pe camerele principale ale amplasamentului analizat.' },
      { type:'table', headers:['Cameră','Adâncime tavan (m)','Convergență ‰/an'], rows:[
        ['Camera A','120','3'],
        ['Camera B','155','6'],
        ['Camera C','95','2'],
        ['Camera D','180','9']
      ]}
    ]
  },
  {
    title: 'Subsidența la suprafață și deformația terenului',
    blocks: [
      { type:'p', text:'Subsidența este coborârea progresivă a suprafeței terenului ca urmare a convergenței cavernelor de adâncime. Pe amplasament, ea se manifestă ca tasări difuze sau, în cazuri grave, ca depresiuni și craterizări. Amplitudinea subsidenței la suprafață este o fracțiune din convergența subterană, atenuată de grosimea și rigiditatea acoperișului. Unghiul de influență („angle of draw”) definește cât de larg se propagă lateral efectul: o cavernă adâncă produce o cuvetă de subsidență mai întinsă dar mai puțin abruptă. Aceste deformații se monitorizează prin nivelment de precizie și prin interferometrie radar Copernicus (InSAR).' },
      { type:'p', text:'Pentru amplasamentul turistic, subsidența condiționează direct ce se poate construi la suprafață: clădiri sensibile, drumuri și rețele trebuie poziționate în afara cuvetei active sau proiectate cu măsuri de adaptare la tasări diferențiale. Volumul de subsidență se estimează din volumul de gol convers și din factorul de transfer la suprafață: Vs ≈ k · Vc, unde k depinde de adâncime și de natura acoperitorului. Valorile InSAR oferă o hartă a vitezelor de coborâre, pe care se identifică punctele fierbinți ce necesită restricții de utilizare în planul de amenajare al parcelei.' },
      { type:'p', text:'Riscul major este trecerea de la o subsidență lentă, gestionabilă, la o prăbușire bruscă atunci când tavanul cedează catastrofal. Indiciile premergătoare sunt accelerarea tasărilor, apariția de fisuri inelare la suprafață și scurgeri de apă. Acestea impun măsuri imediate de restricționare a accesului. Cadrul legal include OUG 195/2005 privind protecția mediului și normele miniere. Spre deosebire de scara regională, aici se cartează strict cuveta proprie a amplasamentului. Graficul redă viteza de subsidență măsurată InSAR pe ultimii ani pe parcela analizată.' },
      { type:'chart', data:[['2021',8],['2022',11],['2023',14],['2024',19],['2025',23]], title:'Viteză subsidență (mm/an)', source:'Copernicus InSAR, nivelment local' }
    ]
  },
  {
    title: 'Riscul de prăbușire și lecția Ocnele Mari',
    blocks: [
      { type:'p', text:'Cazul Ocnele Mari (Vâlcea) rămâne referința națională pentru riscul de prăbușire a cavernelor de sare. Exploatarea prin dizolvare necontrolată a generat caverne supradimensionate, care au cedat în 2001 și ulterior în 2004, producând cratere de surpare, deversări de saramură și relocarea unor gospodării. Lecția fundamentală este că golurile prea mari, nemonitorizate și conectate hidraulic la apa dulce, evoluează spre cedare bruscă. Pe amplasamentul de față, analiza de risc pornește de la întrebarea dacă geometria cavernelor se apropie de pragurile critice care au caracterizat dezastrul de la Ocnele Mari.' },
      { type:'p', text:'Mecanismul de prăbușire combină dizolvarea, fluajul și pierderea progresivă a pilierilor: pe măsură ce sarea se dizolvă sau curge plastic, deschiderea crește, tavanul se subțiază și, la depășirea capacității portante, întreaga coloană acoperitoare se prăbușește în gol. Indicatorii de proximitate la cedare sunt raportul deschidere/grosime tavan peste prag, convergența accelerată și prezența apei dulci în cavernă. Pentru amplasament, fiecare cameră se clasifică pe o scară de risc, iar camerele turistice primesc cea mai strictă supraveghere. Această abordare punctuală deosebește studiul de planul regional de protecție a resursei.' },
      { type:'p', text:'Reducerea riscului de prăbușire se obține prin limitarea deschiderilor, menținerea pilierilor, controlul nivelului de saramură și interzicerea accesului apei dulci necontrolate. Acolo unde camerele depășesc pragurile, se impune umplerea parțială cu material inert sau cu saramură saturată pentru a reduce volumul gol activ. Cadrul legal este Legea minelor 85/2003 și normele de securitate. Tabelul de mai jos clasifică camerele amplasamentului pe niveluri de risc, după criterii inspirate de analiza post-eveniment de la Ocnele Mari, pentru a prioritiza măsurile de siguranță.' },
      { type:'table', headers:['Cameră','Raport deschidere/tavan ×10','Clasă risc (1-5)'], rows:[
        ['Camera A','6','2'],
        ['Camera B','11','4'],
        ['Camera C','4','1'],
        ['Camera D','14','5']
      ]}
    ]
  },
  {
    title: 'Hidrogeologia saramurii și acviferul local',
    blocks: [
      { type:'p', text:'Hidrogeologia amplasamentului salin este dominată de contrastul dintre sarea practic impermeabilă și acviferele de apă dulce din formațiunile acoperitoare. Saramura naturală se formează acolo unde apa subterană intră în contact cu masivul de sare și îl dizolvă, generând ape cu mineralizație ridicată (până la 300–320 g/l NaCl la saturație). Pe amplasament interesează poziția nivelului piezometric al acviferului superficial, direcția de curgere și eventualele puncte de comunicare cu cavernele. Datele se preiau din forajele hidrogeologice ANRM și din observațiile Salrom asupra venirilor de apă în subteran.' },
      { type:'p', text:'Echilibrul hidrogeologic este delicat: atâta vreme cât apa dulce este izolată de masiv prin capacul argilos, dizolvarea rămâne limitată. Dacă acest capac este perforat de foraje vechi, fracturi sau caverne care urcă prea sus, apa dulce pătrunde și dizolvarea se accelerează necontrolat. Gradientul hidraulic și permeabilitatea acoperitorului determină debitul de infiltrație, estimat prin legea lui Darcy: Q = k · i · A, unde k este conductivitatea hidraulică, i gradientul și A aria de curgere. Aceste valori se cuantifică punctual pentru a evalua amenințarea asupra cavernelor amplasamentului.' },
      { type:'p', text:'Monitorizarea hidrogeologică include măsurarea periodică a nivelurilor în piezometre, a mineralizației și a temperaturii apelor. Apariția unei tendințe de scădere a mineralizației într-o sondă de saramură semnalează intruziunea de apă dulce, un semnal de alarmă. Spre deosebire de gestiunea regională a lacurilor sărate, aici interesează strict regimul apelor din perimetrul amplasamentului și interacțiunea lor cu golurile. Graficul prezintă evoluția mineralizației măsurate în sondele de monitorizare, indicator-cheie al stabilității hidrogeologice a amplasamentului analizat.' },
      { type:'chart', data:[['Sonda 1',312],['Sonda 2',298],['Sonda 3',265],['Sonda 4',310]], title:'Mineralizație saramură (g/l)', source:'Foraje ANRM, monitorizare Salrom' }
    ]
  },
  {
    title: 'Intruziunea de apă dulce în masivul de sare',
    blocks: [
      { type:'p', text:'Intruziunea de apă dulce reprezintă cel mai grav pericol hidrogeologic pentru un amplasament salin, pentru că transformă o cavernă stabilă într-una în dizolvare activă. Apa dulce nesaturată dizolvă pereții de sare, mărind necontrolat volumul golului și subțiind pilierii și tavanul. Procesul a stat la baza dezastrului de la Ocnele Mari. Pe amplasamentul de față, identificarea căilor potențiale de intruziune — foraje vechi necimentate, fracturi, contacte litologice — este o prioritate de diagnostic. Fiecare cale identificată se cartează și se evaluează ca debit posibil și ca impact asupra cavernelor din apropiere.' },
      { type:'p', text:'Cantitativ, rata de dizolvare depinde de debitul de apă dulce și de gradul ei de nesaturare: cu cât apa este mai săracă în sare și debitul mai mare, cu atât dizolvarea este mai rapidă. Masa de sare dizolvată pe unitatea de timp se aproximează prin ṁ = Q · (Cs − C), unde Q este debitul, Cs concentrația de saturație și C concentrația apei intrate. O sondă care varsă apă cvasidulce într-o cavernă poate dizolva tone de sare anual, modificând geometria și stabilitatea. Acest calcul punctual orientează prioritizarea măsurilor de etanșare pe amplasament.' },
      { type:'p', text:'Măsurile de control includ cimentarea forajelor abandonate, etanșarea fracturilor, menținerea cavernelor pline cu saramură saturată și monitorizarea mineralizației. Acolo unde intruziunea este confirmată, se impune intervenție rapidă pentru a evita evoluția spre prăbușire. Cadrul de referință rămâne Legea minelor 85/2003 și normele ANRM privind protecția zăcământului. Spre deosebire de protecția resursei la scară de zonă, accentul este pe izolarea hidraulică a golurilor concrete. Tabelul inventariază căile potențiale de intruziune identificate pe amplasament și debitul estimat al fiecăreia.' },
      { type:'table', headers:['Cale potențială','Stare','Debit estimat (l/min)'], rows:[
        ['Foraj vechi F3','Necimentat','45'],
        ['Fractură NV','Activă','18'],
        ['Contact caprock','Etanș','2'],
        ['Foraj F7','Cimentat','0']
      ]}
    ]
  },
  {
    title: 'Dizolvarea necontrolată și formarea golurilor',
    blocks: [
      { type:'p', text:'Dizolvarea necontrolată apare atunci când apa dulce circulă liber prin masivul de sare, dizolvând selectiv halitul și lăsând în urmă goluri cu forme neregulate, greu de cartat. Spre deosebire de cavernele proiectate prin dizolvare controlată (care au geometrie cunoscută), golurile necontrolate cresc imprevizibil, adesea în sus, către suprafață, formând coșuri de dizolvare. Pe amplasament, prezența unor astfel de goluri este indiciul unei probleme hidrogeologice grave. Identificarea lor se face prin sondaje, prin metode geofizice (microgravimetrie, tomografie electrică) și prin observarea unor anomalii de subsidență la suprafață.' },
      { type:'p', text:'Forma și viteza de creștere a golurilor depind de regimul de curgere: dizolvarea preferențială urmează căile cu cel mai mare debit, ceea ce duce la cavități alungite și ramificate. Volumul de gol creat se leagă de masa de sare dizolvată prin densitatea sării: Vgol = mdiz / ρsare, unde ρsare ≈ 2160 kg/mc. Un gol care urcă spre suprafață reduce progresiv grosimea acoperișului de protecție, apropiindu-se de pragul de prăbușire. Acest mecanism justifică monitorizarea atentă a oricărei venituri de apă dulce și măsurarea geometriei golurilor cunoscute prin batimetrie sonar a cavernelor pline.' },
      { type:'p', text:'Gestiunea golurilor necontrolate presupune oprirea sursei de apă dulce, stabilizarea prin umplere cu material inert și interzicerea oricărei utilizări la suprafață deasupra zonei afectate. În cazuri extreme, golul se umple cu steril sau cu saramură saturată pentru a bloca dizolvarea ulterioară. Aceste decizii sunt strict punctuale, legate de amplasament, și nu se confundă cu strategia regională de protecție a resursei. Graficul ilustrează creșterea estimată a volumului unui gol de dizolvare monitorizat pe amplasament, în funcție de debitul de apă dulce intrată.' },
      { type:'chart', data:[['An 1',1200],['An 2',2800],['An 3',5100],['An 4',8600]], title:'Creștere volum gol dizolvare (mc)', source:'Estimare ṁ=Q(Cs−C), sonar caverne' }
    ]
  },
  {
    title: 'Capacitatea de vizitare a salinei turistice',
    blocks: [
      { type:'p', text:'Capacitatea de vizitare a unei saline amenajate turistic este limitată de volumul de aer disponibil în spațiul subteran și de norma de aer proaspăt pe vizitator. Formula de bază este Cmax = V / (n · t), unde V este volumul ventilat al cavernei, n norma de aer pe persoană (cca 30 mc/h aer proaspăt în spații închise) iar t timpul mediu de vizitare. Pentru o cavernă mare, capacitatea instantanee poate ajunge la sute de persoane, dar este plafonată de capacitatea de evacuare și de confortul microclimatic. Acest calcul punctual fundamentează regulamentul de acces al amplasamentului.' },
      { type:'p', text:'Pe lângă criteriul de aer, capacitatea de vizitare este condiționată de suprafața utilă de circulație (cca 1–2 mp/persoană pentru confort), de numărul de căi de evacuare și de capacitatea mijloacelor de transport pe verticală (ascensoare, scări, vagonete). Aceste limitări se combină: capacitatea efectivă este cea mai mică dintre valorile rezultate din fiecare criteriu. Pentru amplasamentul analizat, se stabilește o capacitate maximă simultană și o capacitate zilnică, ținând cont de programul de vizitare și de timpii de rotație. Aceste valori se înscriu în regulamentul de funcționare și în autorizația de turism.' },
      { type:'p', text:'Gestionarea fluxului de vizitatori previne aglomerarea, scăderea calității aerului și riscul în caz de urgență. Sistemele de numărare la intrare și de rezervare online permit respectarea plafonului. Cadrul de reglementare include OG 109/2000 privind stațiunile balneare și normele de funcționare a obiectivelor turistice subterane. Spre deosebire de masterplanul regional al circuitelor turistice, aici se dimensionează strict capacitatea acestui obiectiv. Tabelul prezintă capacitatea de vizitare calculată pe fiecare criteriu pentru spațiile principale ale amplasamentului, evidențiind factorul limitativ.' },
      { type:'table', headers:['Criteriu','Spațiu principal','Capacitate (pers)'], rows:[
        ['Aer proaspăt','Camera C','420'],
        ['Suprafață utilă','Camera C','310'],
        ['Evacuare','Camera C','260'],
        ['Capacitate efectivă','Camera C','260']
      ]}
    ]
  },
  {
    title: 'Microclimatul subteran și terapia salină',
    blocks: [
      { type:'p', text:'Microclimatul subteran al salinelor este definit de o temperatură stabilă pe tot parcursul anului (de regulă 12–15°C), umiditate relativă moderată (60–80%), absența curenților puternici de aer și o încărcătură caracteristică de aerosol salin. Aceste condiții, constante și ferite de poluarea atmosferică de la suprafață, stau la baza speleoterapiei (haloterapie naturală). Pe amplasament, microclimatul se caracterizează prin măsurători de temperatură, umiditate, presiune și concentrație de particule, repetate în mai multe puncte și anotimpuri. Stabilitatea acestor parametri este chiar resursa terapeutică a amplasamentului, evaluată conform metodologiei INRMFB.' },
      { type:'p', text:'Stabilitatea microclimatului se datorează inerției termice mari a masivului de sare și izolării față de exterior. Variațiile sezoniere de la suprafață se atenuează aproape complet la adâncime. Totuși, ventilația artificială introdusă pentru vizitatori poate perturba acest echilibru, aducând aer mai cald și mai umed și diluând aerosolul salin. De aceea, proiectarea ventilației trebuie să echilibreze nevoia de aer proaspăt cu păstrarea proprietăților terapeutice. Acest compromis se cuantifică prin modelarea bilanțului de aer al cavernei și prin monitorizarea continuă a parametrilor microclimatici relevanți pentru terapie.' },
      { type:'p', text:'Documentarea microclimatului este obligatorie pentru recunoașterea salinei ca factor natural de cură, conform normelor INRMFB și OG 109/2000. Caracterizarea trebuie să demonstreze constanța parametrilor și prezența aerosolului salin în concentrații terapeutice. Spre deosebire de inventarul regional al stațiunilor, aici se documentează strict microclimatul acestui amplasament. Graficul de mai jos prezintă variația lunară a temperaturii și a umidității măsurate în camera terapeutică, ilustrând stabilitatea remarcabilă a microclimatului subteran al amplasamentului.' },
      { type:'chart', data:[['Iarnă',13],['Primăvară',13],['Vară',14],['Toamnă',13]], title:'Temperatură medie cameră terapeutică (°C)', source:'Monitorizare microclimat, metodologie INRMFB' }
    ]
  },
  {
    title: 'Calitatea aerului subteran și aerosolul salin',
    blocks: [
      { type:'p', text:'Calitatea aerului subteran este parametrul central al valorii terapeutice a salinei. Aerul din cavernele de sare conține un aerosol fin de clorură de sodiu, format prin desprinderea de microparticule de pe pereți, cu un spectru granulometric favorabil pătrunderii în căile respiratorii inferioare (particule sub 5 microni). Concentrația de aerosol salin se măsoară gravimetric sau cu numărătoare de particule și se exprimă în mg/mc. Valorile terapeutice tipice se situează în intervalul 1–7 mg/mc. Pe amplasament, această concentrație se cartează în spațiul terapeutic, conform protocoalelor INRMFB de evaluare a factorului natural de cură.' },
      { type:'p', text:'Pe lângă aerosolul salin, calitatea aerului depinde de absența poluanților: concentrația de dioxid de carbon trebuie menținută sub praguri de confort prin ventilație, iar radonul, posibil în unele formațiuni, trebuie monitorizat. Echilibrul este subtil: ventilația insuficientă crește CO2 și disconfortul, dar ventilația excesivă diluează aerosolul salin terapeutic. Concentrația de aerosol scade cu rata de schimb a aerului: Ca ≈ E / (Q + d·V), unde E este emisia de la pereți, Q debitul de ventilație și d rata de depunere. Acest model orientează reglarea ventilației pe amplasament pentru a păstra valoarea curativă.' },
      { type:'p', text:'Documentarea calității aerului include și măsurarea aeroionizării (raportul ioni negativi/pozitivi), considerată benefică în cura subterană. Toate aceste măsurători intră în dosarul de recunoaștere a salinei ca obiectiv balnear, conform OG 109/2000 și normelor INRMFB. Spre deosebire de evaluarea regională a resurselor balneare, aici se caracterizează strict aerul acestui spațiu. Tabelul sintetizează parametrii de calitate a aerului măsurați în camera terapeutică a amplasamentului, raportați la pragurile terapeutice și de confort recomandate.' },
      { type:'table', headers:['Parametru','Valoare măsurată','Prag recomandat ×10'], rows:[
        ['Aerosol NaCl (mg/mc)','4','10'],
        ['CO2 (ppm × sute)','7','15'],
        ['Umiditate relativă (%)','72','80'],
        ['Raport aeroioni neg/poz','3','12']
      ]}
    ]
  },
  {
    title: 'Speleoterapia și protocolul de cură',
    blocks: [
      { type:'p', text:'Speleoterapia este metoda terapeutică ce valorifică microclimatul stabil și aerosolul salin al cavernelor pentru tratamentul afecțiunilor respiratorii cronice (astm bronșic, bronșite, rinite alergice) și al unor afecțiuni dermatologice. Pe amplasament, cura se desfășoară în spațiul subteran amenajat, conform unui protocol care precizează durata ședinței (de regulă 2–4 ore), numărul de ședințe pe serie (10–18), frecvența și măsurile de supraveghere medicală. Eficacitatea se bazează pe expunerea prelungită și repetată la aerosolul salin, în condiții de aer curat și temperatură constantă, validată de metodologia INRMFB.' },
      { type:'p', text:'Protocolul de cură trebuie adaptat categoriilor de pacienți: copiii, vârstnicii și persoanele cu afecțiuni cardiovasculare necesită precauții suplimentare privind efortul de coborâre și expunerea la frig și umiditate. Doza terapeutică se exprimă ca produs între concentrația de aerosol, debitul respirator și durata expunerii. Asigurarea unei doze eficace fără disconfort presupune menținerea parametrilor microclimatici în intervalul optim. Pe amplasament, protocolul se corelează cu capacitatea de vizitare și cu programul de funcționare, astfel încât spațiul terapeutic să nu fie suprapopulat în timpul ședințelor de cură.' },
      { type:'p', text:'Speleoterapia se integrează adesea cu alte proceduri balneare disponibile pe amplasament (băi de saramură, împachetări cu nămol), formând un program complex de cură. Recunoașterea oficială a serviciului impune respectarea OG 109/2000 și a normelor INRMFB privind factorii naturali terapeutici. Spre deosebire de strategia regională a circuitelor de tratament, aici se detaliază strict oferta acestui obiectiv. Graficul prezintă durata medie recomandată a seriei de cură pe categorii de afecțiuni tratate în salina amplasamentului, conform protocolului propus.' },
      { type:'chart', data:[['Astm',16],['Bronșită',14],['Rinită',12],['Dermatologie',10]], title:'Număr ședințe per serie de cură', source:'Protocol speleoterapie, INRMFB' }
    ]
  },
  {
    title: 'Lacurile sărate de suprafață ale amplasamentului',
    blocks: [
      { type:'p', text:'Multe amplasamente saline includ lacuri sărate de suprafață, formate fie natural prin dizolvarea sării aflorante, fie antropic prin inundarea unor vechi ocne prăbușite. Aceste lacuri prezintă mineralizație ridicată, stratificare termică inversă (heliotermie) la unele dintre ele și nămol sapropelic terapeutic pe fund. Pe amplasament, lacurile se caracterizează prin suprafață, adâncime, mineralizație, temperatură și grosimea stratului de nămol. Datele provin din măsurători batimetrice și din analize fizico-chimice, completate cu imagini Copernicus pentru urmărirea variațiilor de nivel și de suprafață în timp.' },
      { type:'p', text:'Heliotermia este un fenomen specific unor lacuri sărate: stratul superficial de apă mai puțin sărată izolează termic stratul inferior sărat, care acumulează căldură solară și poate atinge temperaturi de peste 40°C la adâncime. Acest fenomen, prezent de exemplu la Ocna Sibiului, are valoare terapeutică și turistică. Pe amplasament, profilul termic vertical al lacului se măsoară pentru a documenta heliotermia. Stabilitatea stratificării depinde de gradientul de salinitate și poate fi perturbată de aport excesiv de apă dulce, ceea ce impune protecția regimului hidrologic al lacului în limitele parcelei.' },
      { type:'p', text:'Lacurile sărate constituie resurse balneare valoroase pentru băi terapeutice și pentru extragerea nămolului, dar sunt fragile: poluarea, modificarea aportului de apă sau folosirea excesivă le pot degrada. Protecția lor punctuală se asigură prin zone de protecție și prin reglementarea utilizării. Cadrul legal include OG 109/2000 și normele de mediu OUG 195/2005. Spre deosebire de gestiunea regională a salinelor de suprafață, aici se documentează strict lacurile din perimetrul amplasamentului. Tabelul prezintă parametrii principali ai lacurilor sărate identificate pe amplasamentul analizat.' },
      { type:'table', headers:['Lac','Mineralizație (g/l)','Adâncime max (m)'], rows:[
        ['Lac Mare','142','18'],
        ['Lac Mic','98','7'],
        ['Lac Heliotermic','165','12'],
        ['Baltă veche ocnă','210','5']
      ]}
    ]
  },
  {
    title: 'Nămolul terapeutic sapropelic',
    blocks: [
      { type:'p', text:'Nămolul terapeutic (peloid) depus pe fundul lacurilor sărate de pe amplasament este o resursă balneară importantă, utilizată în împachetări și băi pentru tratamentul afecțiunilor reumatismale, ginecologice și dermatologice. Nămolul sapropelic se formează prin sedimentarea materiei organice și minerale în mediu salin reducător, având o consistență fină, plasticitate ridicată și conținut bogat în sulfuri, săruri și substanțe biologic active. Pe amplasament, nămolul se caracterizează prin grosimea stratului, compoziția chimică, capacitatea de reținere a apei și termoplasticitatea, conform metodologiei de evaluare INRMFB.' },
      { type:'p', text:'Calitatea terapeutică a nămolului depinde de proprietățile sale fizice (termopexie — capacitatea de a reține și ceda lent căldura) și chimice (conținut de hidrogen sulfurat, săruri minerale, materie organică). Termopexia ridicată permite aplicații calde prelungite, esențiale în terapia reumatismală. Rezerva exploatabilă de nămol se estimează din suprafața lacului și grosimea stratului: Rezervă = S · h · (1 − porozitate apă). Exploatarea trebuie să fie sustenabilă, ținând cont de viteza lentă de refacere naturală a peloidului, pentru a nu epuiza resursa terapeutică a amplasamentului.' },
      { type:'p', text:'Utilizarea nămolului impune o gestiune atentă: extragerea controlată, depozitarea igienică, regenerarea prin reintroducere în lac după utilizare și protecția împotriva contaminării. Recunoașterea nămolului ca factor natural de cură se face conform OG 109/2000 și normelor INRMFB. Spre deosebire de inventarul regional al resurselor de nămol, aici se evaluează strict zăcământul de peloid al acestui amplasament. Graficul prezintă grosimea stratului de nămol măsurată în puncte de sondaj din lacurile amplasamentului, bază pentru estimarea rezervei exploatabile sustenabil.' },
      { type:'chart', data:[['Punct N1',85],['Punct N2',62],['Punct N3',110],['Punct N4',47]], title:'Grosime strat nămol (cm)', source:'Sondaje peloid, metodologie INRMFB' }
    ]
  },
  {
    title: 'Amenajarea spațiilor de agrement subteran',
    blocks: [
      { type:'p', text:'Amenajarea spațiilor de agrement în cavernele de sare transformă golurile de exploatare în obiective turistice și terapeutice atractive. Pe amplasament, amenajarea cuprinde căi de circulație accesibile, zone de relaxare, terenuri de sport subterane, spații de joacă pentru copii, locuri de odihnă pentru cura salină și, eventual, un mic lac subteran amenajat. Toate intervențiile trebuie să respecte constrângerile geotehnice — fără sarcini suplimentare semnificative pe pilieri sau tavan — și să nu altereze microclimatul terapeutic. Proiectarea se face în coordonare cu releveul cavernei și cu analiza de stabilitate descrisă anterior.' },
      { type:'p', text:'Materialele utilizate în amenajare trebuie să fie compatibile cu mediul salin agresiv: oțeluri inoxidabile, materiale rezistente la coroziune, finisaje care nu degajă particule sau mirosuri ce ar perturba puritatea aerului terapeutic. Iluminatul trebuie să fie eficient energetic și să evite supraîncălzirea aerului. Sistemele de ventilație, semnalizare, sonorizare și supraveghere se integrează discret pentru a nu afecta experiența vizitatorului. Pe amplasament, fiecare amenajare se dimensionează în funcție de capacitatea de vizitare calculată, evitând supraîncărcarea spațiului și menținând fluxurile de circulație fluente și sigure.' },
      { type:'p', text:'Amenajarea trebuie să echilibreze atractivitatea turistică cu funcția terapeutică: zonele de agrement zgomotos se separă de spațiile de cură liniștită. Accesibilitatea pentru persoanele cu dizabilități se asigură prin ascensoare și trasee adaptate. Cadrul de reglementare include OG 109/2000 și normele de funcționare a obiectivelor turistice. Spre deosebire de planul regional al ofertei de agrement, aici se detaliază strict amenajarea acestui spațiu. Tabelul prezintă suprafețele alocate principalelor funcțiuni de agrement în cavernele amenajate ale amplasamentului analizat.' },
      { type:'table', headers:['Funcțiune','Cameră','Suprafață (mp)'], rows:[
        ['Zonă cură salină','Camera C','1800'],
        ['Teren sport','Camera B','620'],
        ['Spațiu joacă copii','Camera A','340'],
        ['Lac subteran amenajat','Camera D','280']
      ]}
    ]
  },
  {
    title: 'Siguranța vizitatorilor și planul de evacuare',
    blocks: [
      { type:'p', text:'Siguranța vizitatorilor într-o salină amenajată este condiția fundamentală a funcționării. Riscurile specifice includ pierderea iluminatului, defectarea ventilației, blocarea ascensoarelor, incendiul (limitat de natura incombustibilă a sării, dar posibil la instalații și mobilier) și, în cazul extrem, instabilitatea geotehnică. Pe amplasament, planul de evacuare definește traseele de ieșire, capacitatea lor, timpul de evacuare și punctele de adunare. Timpul de evacuare se estimează din distanța până la ieșire și viteza de deplasare, ținând cont de capacitatea limitată a mijloacelor de transport pe verticală din cavernă.' },
      { type:'p', text:'Sistemele de siguranță obligatorii cuprind iluminat de urgență autonom, ventilație de avarie, sisteme de comunicare cu suprafața, detecție de gaze și incendiu, semnalizare luminiscentă a căilor de evacuare și personal instruit. Capacitatea de evacuare trebuie corelată cu numărul maxim de vizitatori admis simultan: Cevac = nieșiri · debit_ieșire · timp_admis. Dacă această valoare este sub capacitatea de vizitare calculată pe alte criterii, ea devine factorul limitativ al accesului. Pe amplasament, dimensionarea respectă principiul ca evacuarea completă să fie posibilă într-un interval acceptabil chiar și cu o cale blocată.' },
      { type:'p', text:'Planul de evacuare se testează prin exerciții periodice și se afișează vizibil la intrare și pe trasee. Coordonarea cu serviciile de urgență de la suprafață și existența unui sistem de localizare a vizitatorilor în subteran completează dispozitivul de siguranță. Cadrul de reglementare include normele PSI, securitatea muncii și OG 109/2000. Spre deosebire de planul regional de management al riscului turistic, aici se detaliază strict siguranța acestui obiectiv. Graficul prezintă timpul estimat de evacuare a camerelor principale la capacitate maximă de vizitare a amplasamentului.' },
      { type:'chart', data:[['Camera A',6],['Camera B',9],['Camera C',12],['Camera D',8]], title:'Timp evacuare la capacitate maximă (min)', source:'Plan evacuare, calcul Cevac' }
    ]
  },
  {
    title: 'Ventilația subterană și bilanțul de aer',
    blocks: [
      { type:'p', text:'Ventilația spațiilor saline subterane asigură aer proaspăt pentru vizitatori, controlul concentrației de CO2 și evacuarea umidității, păstrând în același timp microclimatul terapeutic. Pe amplasament, sistemul de ventilație se dimensionează pe baza capacității de vizitare și a normei de aer pe persoană: debitul necesar Qv = Cmax · n, unde n este norma de aer proaspăt. Bilanțul de aer trebuie echilibrat astfel încât să se asigure împrospătarea fără a dilua excesiv aerosolul salin. Sistemul cuprinde ventilatoare, tubulatură, prize de aer și sisteme de reglare automată în funcție de numărul de vizitatori prezenți.' },
      { type:'p', text:'Provocarea ventilației saline este compromisul dintre cantitatea de aer și calitatea terapeutică: un debit prea mare aduce aer cald și umed de la suprafață, dilueză aerosolul salin și perturbă temperatura constantă; un debit prea mic permite acumularea de CO2 și disconfort. Reglarea optimă menține CO2 sub prag (cca 1500 ppm) cu debitul minim necesar. Recircularea parțială a aerului interior, filtrat, poate reduce aportul de aer exterior. Pe amplasament, regimul de ventilație se adaptează sezonier, ținând cont de diferența de temperatură dintre interior și exterior care induce tiraj natural.' },
      { type:'p', text:'Monitorizarea continuă a CO2, temperaturii, umidității și concentrației de aerosol permite reglarea automată a ventilației pentru a respecta simultan confortul și valoarea terapeutică. Sistemul trebuie să includă o componentă de avarie capabilă să asigure aer în caz de urgență. Cadrul de proiectare respectă normele de ventilație și OG 109/2000. Spre deosebire de abordarea regională, aici ventilația se dimensionează strict pentru acest spațiu. Tabelul prezintă debitele de aer necesare pe camere, în funcție de capacitatea de vizitare alocată fiecăreia pe amplasament.' },
      { type:'table', headers:['Cameră','Capacitate (pers)','Debit aer (mc/h × 100)'], rows:[
        ['Camera A','120','36'],
        ['Camera B','90','27'],
        ['Camera C','260','78'],
        ['Camera D','60','18']
      ]}
    ]
  },
  {
    title: 'Monitorizarea convergenței (Unitatea de Control al Comportării)',
    blocks: [
      { type:'p', text:'Monitorizarea comportării subterane se organizează printr-o Unitate de Control al Comportării Construcțiilor (UCC), conform reglementărilor privind urmărirea în timp a construcțiilor speciale. Pe amplasamentul salin, UCC supraveghează convergența cavernelor, subsidența la suprafață, nivelurile de saramură, mineralizația apelor și parametrii microclimatici. Programul de monitorizare definește mărimile urmărite, frecvența măsurătorilor, pragurile de alarmă și procedurile de intervenție. Datele se centralizează într-o bază unică și se analizează în tendință, pentru a detecta din timp orice evoluție anormală a golurilor sau a terenului.' },
      { type:'p', text:'Instrumentația UCC include extensometre și convergențometre în caverne, repere de nivelment la suprafață, senzori de mineralizație și nivel în sonde, stații de microclimat și, complementar, interferometrie radar Copernicus pentru o vedere de ansamblu a subsidenței. Pragurile de alarmă se stabilesc pe baza analizei de stabilitate: de exemplu, o convergență anuală care depășește dublul valorii de referință declanșează inspecție și, eventual, restricționarea accesului. Aceste praguri sunt specifice fiecărei caverne și se actualizează pe măsură ce se acumulează date despre comportarea reală a amplasamentului în timp.' },
      { type:'p', text:'UCC este instrumentul prin care amplasamentul rămâne sigur pe termen lung: ea transformă măsurătorile izolate într-un sistem de avertizare timpurie. Rezultatele se raportează periodic către ANRM și autoritatea de mediu și fundamentează deciziile de exploatare și de funcționare turistică. Cadrul legal include normele de urmărire a construcțiilor și Legea minelor 85/2003. Spre deosebire de monitorizarea regională a resursei, UCC supraveghează strict acest amplasament. Graficul prezintă evoluția unui indicator sintetic de comportare urmărit de UCC pe amplasament în ultimii ani.' },
      { type:'chart', data:[['2021',100],['2022',104],['2023',109],['2024',118],['2025',131]], title:'Indicator sintetic comportare UCC (bază 100)', source:'UCC amplasament, raportare ANRM' }
    ]
  },
  {
    title: 'Reconversia salinelor dezafectate de pe amplasament',
    blocks: [
      { type:'p', text:'Multe amplasamente saline cuprind goluri și instalații dezafectate, rezultate din exploatarea istorică, care pot fi reconvertite în spații turistice, terapeutice, culturale sau de depozitare. Reconversia valorifică un patrimoniu existent și evită costurile de creare a unor spații noi, dar impune o evaluare riguroasă a stării de stabilitate și de securitate. Pe amplasament, fiecare gol dezafectat se evaluează din punct de vedere geotehnic, hidrogeologic și al accesibilității, pentru a stabili dacă și cum poate fi readus în circuit. Reconversia se planifică în coordonare cu Salrom și ANRM, respectând regimul minier.' },
      { type:'p', text:'Opțiunile de reconversie includ: amenajare turistică și terapeutică (cea mai răspândită), spații pentru evenimente și expoziții, depozite cu microclimat stabil, ferme de servere ce profită de temperatura constantă sau spații de cercetare. Alegerea depinde de geometria golului, de stabilitate, de accesibilitate și de cererea locală. Costul reconversiei se compară cu valoarea generată: o cavernă stabilă, accesibilă și cu microclimat terapeutic justifică investiția turistică, în timp ce un gol instabil necesită mai întâi stabilizare sau, în cazuri extreme, închidere definitivă prin umplere și interdicție de acces.' },
      { type:'p', text:'Reconversia trebuie integrată cu planul de monitorizare și cu strategia de siguranță a amplasamentului, evitând readucerea în circuit a unor spații cu risc. Ea contribuie la dezvoltarea locală și la conservarea patrimoniului minier. Cadrul de reglementare include Legea minelor 85/2003, OG 109/2000 și normele de urbanism. Spre deosebire de strategia regională de reconversie a salinelor, aici se evaluează strict golurile acestui amplasament. Tabelul prezintă opțiunile de reconversie evaluate pentru golurile dezafectate ale amplasamentului, cu un scor sintetic de fezabilitate.' },
      { type:'table', headers:['Gol dezafectat','Opțiune reconversie','Scor fezabilitate (1-100)'], rows:[
        ['Galeria veche E','Circuit turistic','78'],
        ['Camera F','Spațiu terapeutic','85'],
        ['Puț vechi P2','Depozit microclimat','54'],
        ['Gol instabil G','Închidere/umplere','30']
      ]}
    ]
  },
  {
    title: 'Turismul balnear local și profilul vizitatorului',
    blocks: [
      { type:'p', text:'Turismul balnear al amplasamentului salin se sprijină pe combinația dintre salina vizitabilă, lacurile sărate, nămolul terapeutic și serviciile de cură. Profilul vizitatorului cuprinde turiști de o zi (excursioniști), pacienți în cură balneară de durată și turiști de agrement atrași de unicitatea spațiului subteran. Pe amplasament, analiza segmentează cererea pe aceste categorii, estimând durata medie a șederii, cheltuiala medie și sezonalitatea. Datele se preiau din statisticile de vizitare ale obiectivului, completate cu observații de teren și cu mobilitatea reflectată în OSM și în surse turistice locale.' },
      { type:'p', text:'Cererea turistică este puternic sezonieră: vârfurile de vară și de vacanțe contrastează cu perioade de extrasezon mai puțin frecventate. Cura terapeutică, în schimb, are o cerere mai constantă și mai puțin dependentă de vreme, fiind un stabilizator al activității. Pe amplasament, gestionarea acestei sezonalități presupune diversificarea ofertei și diferențierea tarifelor. Numărul anual de vizitatori, raportat la capacitatea de vizitare calculată, indică gradul de utilizare a obiectivului și marja de creștere posibilă fără a depăși plafoanele de siguranță și de microclimat stabilite anterior.' },
      { type:'p', text:'Profilul vizitatorului fundamentează deciziile de amenajare, de servicii și de marketing ale amplasamentului. Înțelegerea așteptărilor fiecărui segment permite adaptarea ofertei și creșterea satisfacției. Cadrul de reglementare turistică include OG 109/2000 și normele de clasificare a obiectivelor. Spre deosebire de masterplanul regional de turism balnear, care planifică rețeaua de stațiuni, aici se analizează strict piața acestui obiectiv. Graficul prezintă distribuția lunară a numărului de vizitatori ai amplasamentului, evidențiind sezonalitatea cererii turistice.' },
      { type:'chart', data:[['Ian',4],['Apr',9],['Iul',22],['Aug',24],['Oct',11],['Dec',6]], title:'Vizitatori lunari (mii)', source:'Statistici vizitare amplasament, OSM' }
    ]
  },
  {
    title: 'Infrastructura de acces la amplasament',
    blocks: [
      { type:'p', text:'Accesibilitatea condiționează direct atractivitatea turistică a amplasamentului salin. Infrastructura de acces cuprinde drumul de legătură cu rețeaua principală, parcările pentru autoturisme și autocare, accesul pietonal la intrarea în salină și sistemele de transport pe verticală către spațiile subterane (ascensoare, scări, eventual funicular). Pe amplasament, fiecare componentă se evaluează din punct de vedere al capacității, stării și siguranței. Datele de rețea rutieră se preiau din OSM, iar capacitatea parcărilor se compară cu fluxul de vizitatori estimat în vârf de sezon, pentru a identifica eventualele deficite de capacitate.' },
      { type:'p', text:'Capacitatea de acces trebuie corelată cu capacitatea de vizitare a salinei: dacă parcarea sau ascensoarele nu pot prelua fluxul corespunzător capacității subterane, accesul devine factorul limitativ. Capacitatea parcării se calculează din suprafața disponibilă și norma pe loc (cca 25 mp/autoturism inclusiv circulații), iar fluxul ascensoarelor din numărul de cabine, capacitatea și ciclul de cursă. Pe amplasament, aceste valori se confruntă cu cererea de vârf pentru a dimensiona corect investițiile de îmbunătățire a accesului și pentru a evita ambuteiajele și timpii lungi de așteptare.' },
      { type:'p', text:'Îmbunătățirea accesibilității poate include modernizarea drumului, extinderea parcărilor, introducerea transportului public sau a unui sistem de navetă în sezon, precum și amenajarea unor căi pietonale sigure și accesibile. Toate intervențiile se coordonează cu planul de urbanism al localității. Cadrul de reglementare include normele rutiere și OG 109/2000. Spre deosebire de planul regional al rutelor saline, aici se dimensionează strict accesul la acest obiectiv. Tabelul prezintă capacitatea componentelor de acces ale amplasamentului raportată la cererea de vârf de sezon.' },
      { type:'table', headers:['Componentă','Capacitate','Cerere vârf'], rows:[
        ['Parcare auto (locuri)','180','240'],
        ['Parcare autocare (locuri)','12','18'],
        ['Ascensoare (pers/h)','600','520'],
        ['Scară acces (pers/h)','400','300']
      ]}
    ]
  },
  {
    title: 'Patrimoniul minier și valorificarea culturală',
    blocks: [
      { type:'p', text:'Salina amplasamentului poartă o moștenire istorică valoroasă: instalații de exploatare vechi, galerii săpate manual, urme ale tehnologiei tradiționale de extracție și, adesea, vestigii arheologice ce atestă exploatarea sării din epoci îndepărtate. Acest patrimoniu minier conferă autenticitate și valoare culturală obiectivului turistic. Pe amplasament, patrimoniul se inventariază — instalații, galerii istorice, obiecte tehnice, urme arheologice — și se evaluează din punct de vedere al stării de conservare și al potențialului de punere în valoare prin trasee tematice, muzeu de mină sau interpretare a istoriei sării.' },
      { type:'p', text:'Valorificarea patrimoniului minier se face prin conservarea elementelor reprezentative, prin amenajarea de spații expoziționale și prin integrarea poveștii sării în experiența vizitatorului. Galeriile istorice, acolo unde sunt sigure, devin parte din circuitul turistic, oferind un contrast educativ cu spațiile moderne. Obiectele tehnice se restaurează și se expun, iar documentația istorică (arhive Salrom, surse locale) se valorifică în materiale de interpretare. Această dimensiune culturală îmbogățește oferta și diferențiază amplasamentul, atrăgând segmente de turism cultural și educativ pe lângă cel balnear.' },
      { type:'p', text:'Protecția patrimoniului minier trebuie integrată cu siguranța și cu amenajarea turistică: elementele istorice se conservă fără a compromite stabilitatea sau accesibilitatea. Acolo unde patrimoniul are statut protejat, intervențiile respectă legislația de profil. Cadrul include normele privind patrimoniul cultural și OG 109/2000. Spre deosebire de strategia regională a patrimoniului salin, aici se inventariază strict acest amplasament. Tabelul prezintă elementele de patrimoniu minier identificate pe amplasament și starea lor de conservare, ca bază pentru deciziile de valorificare culturală.' },
      { type:'table', headers:['Element patrimoniu','Epocă','Stare conservare (1-100)'], rows:[
        ['Galerie săpată manual','Sec. XIX','62'],
        ['Instalație extracție veche','Sec. XX','48'],
        ['Vestigii arheologice','Antichitate','55'],
        ['Crivac (mașină tracțiune)','Sec. XIX','40']
      ]}
    ]
  },
  {
    title: 'Geometria detaliată a cavernelor și releveul',
    blocks: [
      { type:'p', text:'Releveul geometric detaliat al cavernelor este baza tuturor analizelor de stabilitate și de capacitate. Pe amplasament, geometria fiecărei camere se documentează prin scanare laser 3D (LiDAR subteran), care produce un nor de puncte din care se extrag deschiderea, înălțimea, secțiunile transversale, volumul și forma tavanului. Pentru cavernele pline cu saramură, releveul se completează cu batimetrie sonar. Aceste date geometrice precise înlocuiesc estimările aproximative și permit calcule riguroase ale presiunilor, factorilor de stabilitate și capacităților de vizitare descrise în capitolele anterioare.' },
      { type:'p', text:'Geometria cavernelor evoluează în timp din cauza fluajului și a dizolvării, de aceea releveul trebuie repetat periodic pentru a urmări modificările. Compararea releveelor succesive cuantifică convergența și creșterea golurilor mai precis decât măsurătorile punctuale. Volumul cavernei se calculează din norul de puncte prin integrare numerică, iar variația lui în timp indică ritmul de deformare sau dizolvare. Pe amplasament, releveele 3D se arhivează și se compară, formând o istorie geometrică a fiecărei caverne, esențială pentru deciziile de exploatare și de funcționare turistică în siguranță.' },
      { type:'p', text:'Releveul detaliat servește și amenajării turistice: pe baza lui se proiectează traseele, se poziționează instalațiile și se modelează experiența vizitatorului în mediu virtual înainte de execuție. Integrarea geometriei în platforma digitală permite vizualizarea 3D a amplasamentului. Cadrul tehnic respectă normele de urmărire a construcțiilor subterane. Spre deosebire de cartarea regională a resursei, aici se relevă strict cavernele acestui amplasament. Tabelul prezintă parametrii geometrici principali ai camerelor extrase din releveul 3D al amplasamentului analizat.' },
      { type:'table', headers:['Cameră','Volum (mii mc)','Înălțime max (m)'], rows:[
        ['Camera A','42','22'],
        ['Camera B','68','28'],
        ['Camera C','95','34'],
        ['Camera D','38','19']
      ]}
    ]
  },
  {
    title: 'Rezistența mecanică a sării gemei',
    blocks: [
      { type:'p', text:'Proprietățile mecanice ale sării gemei de pe amplasament determină capacitatea portantă a pilierilor și a tavanului. Sarea are o rezistență la compresiune moderată (20–35 MPa), o rezistență la tracțiune redusă (1–2 MPa) și o comportare ductilă, plastică, mai ales la solicitări de durată. Spre deosebire de roci fragile, sarea nu cedează brusc la compresiune moderată, ci curge plastic, redistribuind tensiunile. Aceste proprietăți se determină prin încercări de laborator pe probe prelevate din masivul amplasamentului, conform standardelor de mecanica rocilor, și se corelează cu conținutul de impurități.' },
      { type:'p', text:'Conținutul de argilă și anhidrit modifică semnificativ comportamentul sării: argila reduce rezistența și introduce planuri de slăbiciune, în timp ce anhidritul, mai rigid, poate concentra tensiuni. Pe amplasament, variabilitatea litologică impune caracterizarea mecanică a fiecărui orizont relevant. Rezistența de durată (sub solicitare îndelungată) este mai mică decât cea instantanee din cauza fluajului, factor luat în calcul prin coeficienți de reducere. Modulul de elasticitate și coeficientul Poisson completează setul de parametri necesari pentru modelarea numerică a comportării cavernelor și pilierilor amplasamentului.' },
      { type:'p', text:'Datele mecanice alimentează modelele de stabilitate și calculele de factor de siguranță descrise anterior. Fără caracterizare mecanică reală, calculele rămân estimări nesigure. Încercările se efectuează în laboratoare acreditate, iar rezultatele se raportează către ANRM. Cadrul tehnic respectă standardele de mecanica rocilor și Legea minelor 85/2003. Spre deosebire de caracterizarea regională a zăcământului, aici se testează strict sarea acestui amplasament. Tabelul prezintă proprietățile mecanice determinate pe probe prelevate din orizonturile principale ale amplasamentului analizat.' },
      { type:'table', headers:['Orizont','Rc compresiune (MPa)','Rt tracțiune ×10 (MPa)'], rows:[
        ['Sare masivă superioară','31','18'],
        ['Sare cu argilă','22','9'],
        ['Sare cu anhidrit','28','14'],
        ['Sare bazală','29','15']
      ]}
    ]
  },
  {
    title: 'Modelarea numerică a comportării cavernelor',
    blocks: [
      { type:'p', text:'Modelarea numerică cu element finit sau diferențe finite permite simularea comportării cavernelor de sare în condiții și scenarii diverse, depășind limitele calculelor analitice simple. Pe amplasament, modelul reproduce geometria reală a cavernelor (din releveu), stratificarea litologică, proprietățile mecanice ale sării și legea de fluaj. El calculează distribuția tensiunilor, deformațiile, convergența și factorii de stabilitate, evidențiind zonele cu risc de cedare. Modelarea integrează datele geotehnice, geometrice și de monitorizare prezentate anterior, oferind o imagine de ansamblu cantitativă a comportării subterane a amplasamentului.' },
      { type:'p', text:'Valoarea modelului numeric stă în capacitatea de a simula evoluția în timp: prin includerea legii de fluaj, el prevede convergența și subsidența pe orizonturi de zeci de ani, identificând momentul în care marja de siguranță s-ar putea epuiza. Modelul permite și testarea scenariilor — efectul umplerii parțiale, al modificării nivelului de saramură sau al unei intruziuni de apă dulce. Calibrarea pe datele de monitorizare reale (convergență, subsidență măsurate) crește încrederea în predicții. Pe amplasament, modelul devine astfel un instrument de decizie pentru exploatare și funcționare turistică.' },
      { type:'p', text:'Modelarea numerică nu înlocuiește monitorizarea, ci o completează: predicțiile se confruntă permanent cu măsurătorile, iar modelul se recalibrează. Rezultatele orientează pragurile de alarmă ale UCC și deciziile de intervenție. Cadrul tehnic respectă bunele practici de mecanica rocilor. Spre deosebire de modelarea regională a bazinului salifer, aici se modelează strict cavernele acestui amplasament. Graficul prezintă convergența prognozată prin model pentru o cameră a amplasamentului pe un orizont de zeci de ani, comparativ cu pragul de alarmă.' },
      { type:'chart', data:[['An 5',12],['An 10',26],['An 20',58],['An 30',97]], title:'Convergență prognozată model (mm cumulat)', source:'Model element finit, lege fluaj sare' }
    ]
  },
  {
    title: 'Gestiunea nivelului de saramură în caverne',
    blocks: [
      { type:'p', text:'Pentru cavernele obținute sau menținute prin dizolvare, nivelul de saramură din interior este un parametru critic de stabilitate. O cavernă plină cu saramură saturată este sprijinită din interior, presiunea fluidului echilibrând parțial presiunea litostatică și încetinind convergența. Golirea cavernei o expune solicitării complete și accelerează deformarea. Pe amplasament, gestiunea nivelului de saramură presupune monitorizarea cotei lichidului, a presiunii și a mineralizației, precum și menținerea unui regim care optimizează atât stabilitatea, cât și, acolo unde e cazul, funcția turistică sau terapeutică a golului.' },
      { type:'p', text:'Saramura din cavernă trebuie menținută la saturație pentru a evita dizolvarea suplimentară a pereților: o saramură nesaturată continuă să dizolve sarea, mărind golul. Echilibrul de saturație depinde de temperatură și de eventualul aport de apă dulce. Presiunea internă a saramurii contribuie la stabilitate conform relației de echilibru între presiunea fluidului și efortul litostatic: cu cât nivelul este mai ridicat, cu atât sprijinul este mai mare. Pe amplasament, regimul de saramură se proiectează ținând cont de aceste interdependențe și de monitorizarea mineralizației pentru a detecta intruziunile.' },
      { type:'p', text:'Gestiunea saramurii se integrează cu controlul hidrogeologic și cu monitorizarea convergenței: orice scădere neașteptată a nivelului sau a mineralizației semnalează o pierdere de etanșeitate sau o intruziune, care necesită investigare. Deciziile de menținere sau golire a cavernelor se iau în coordonare cu Salrom și ANRM. Cadrul legal este Legea minelor 85/2003. Spre deosebire de gestiunea regională a resursei, aici se controlează strict saramura cavernelor acestui amplasament. Tabelul prezintă regimul de saramură monitorizat pe cavernele relevante ale amplasamentului analizat.' },
      { type:'table', headers:['Cavernă','Nivel saramură (% înălțime)','Mineralizație (g/l)'], rows:[
        ['Cavernă S1','85','315'],
        ['Cavernă S2','60','290'],
        ['Cavernă S3','95','318'],
        ['Cavernă S4','40','268']
      ]}
    ]
  },
  {
    title: 'Geofizica și detecția golurilor ascunse',
    blocks: [
      { type:'p', text:'Detecția golurilor ascunse — caverne necartate, coșuri de dizolvare, zone de slăbiciune — este esențială pentru siguranța amplasamentului salin. Metodele geofizice nedistructive permit „radiografierea” subsolului fără excavare. Pe amplasament se utilizează microgravimetria (anomalii de densitate indicând goluri), tomografia electrică (contrastul rezistivității între sare, saramură și apă dulce), seismica de refracție și, la suprafață, georadarul. Combinarea metodelor crește fiabilitatea interpretării. Rezultatele se corelează cu releveele cunoscute și cu observațiile de subsidență pentru a identifica anomalii ce necesită investigare prin foraj de verificare.' },
      { type:'p', text:'Microgravimetria este deosebit de utilă pentru detecția golurilor: un gol umplut cu aer sau saramură produce un deficit de masă față de roca masivă, generând o anomalie negativă de gravitate măsurabilă la suprafață. Amplitudinea anomaliei depinde de volumul golului, de adâncime și de contrastul de densitate, conform legilor gravimetriei. Tomografia electrică detectează zonele saturate cu apă dulce (rezistivitate scăzută) care semnalează dizolvare activă. Pe amplasament, hărțile geofizice se interpretează împreună pentru a localiza riscurile ascunse și a prioritiza investigațiile de detaliu prin foraje.' },
      { type:'p', text:'Rezultatele geofizice fundamentează deciziile de restricționare a utilizării suprafeței și de investigare suplimentară. Ele sunt deosebit de valoroase acolo unde planurile de mină istorice sunt incomplete. Investigațiile se repetă pentru a urmări evoluția golurilor active. Cadrul tehnic respectă bunele practici geofizice și Legea minelor 85/2003. Spre deosebire de prospecțiunea regională a resursei, aici geofizica vizează strict detecția hazardelor ascunse ale amplasamentului. Tabelul prezintă anomaliile geofizice identificate pe amplasament și interpretarea preliminară a fiecăreia.' },
      { type:'table', headers:['Anomalie','Metodă','Adâncime estimată (m)'], rows:[
        ['Deficit masă A1','Microgravimetrie','45'],
        ['Zonă conductivă C1','Tomografie electrică','30'],
        ['Reflexie seismică R1','Seismică','70'],
        ['Cavitate georadar G1','Georadar','12']
      ]}
    ]
  },
  {
    title: 'Hazardul seismic și răspunsul cavernelor',
    blocks: [
      { type:'p', text:'Hazardul seismic afectează diferit structurile subterane față de cele de la suprafață. Cavernele de sare, situate adânc în roca masivă, sunt în general mai puțin vulnerabile la cutremure decât clădirile de la suprafață, deoarece se deplasează solidar cu masivul. Totuși, scuturile seismice pot declanșa căderi de blocuri de pe tavan și pereți, pot accelera convergența și pot perturba echilibrul hidrogeologic. Pe amplasament, evaluarea hazardului seismic pornește de la zonarea seismică națională (cod P100) și de la caracteristicile geologice locale, estimând accelerația de proiectare și efectele posibile asupra cavernelor.' },
      { type:'p', text:'Răspunsul seismic al cavernelor depinde de adâncime, de geometria golului și de proprietățile sării. Sarea, fiind ductilă, absoarbe parțial energia seismică, dar concentrările de tensiuni la colțurile camerelor și pe pilierii subțiri pot favoriza fisurarea. Pentru spațiile turistice, principalul risc seismic este căderea de fragmente de pe tavan, motiv pentru care se verifică starea tavanului și se prevăd măsuri de protecție. Evaluarea se face prin analiză dinamică în modelul numeric, aplicând accelerograme reprezentative pentru zona seismică în care se află amplasamentul.' },
      { type:'p', text:'Măsurile de reducere a riscului seismic includ purjarea tavanului de fragmente instabile, monitorizarea după evenimente seismice și proceduri de evacuare adaptate. Inspecția post-cutremur este obligatorie înainte de reluarea vizitării. Cadrul de reglementare include codul seismic P100 și normele de securitate. Spre deosebire de evaluarea regională a hazardului, aici se analizează strict răspunsul cavernelor acestui amplasament. Tabelul prezintă parametrii seismici de proiectare și nivelul de vulnerabilitate estimat pentru camerele turistice ale amplasamentului analizat.' },
      { type:'table', headers:['Element','Parametru seismic','Vulnerabilitate (1-100)'], rows:[
        ['Accelerație teren (ag)','0,20g','—'],
        ['Tavan Camera C','Cădere fragmente','45'],
        ['Pilier P2','Fisurare','38'],
        ['Acces ascensor','Întrerupere','60']
      ]}
    ]
  },
  {
    title: 'Riscul de inundație și gestiunea apelor pluviale',
    blocks: [
      { type:'p', text:'Riscul de inundație al amplasamentului salin are o dublă dimensiune: inundarea suprafeței și pătrunderea apelor pluviale în subteran. Apele de suprafață necontrolate reprezintă o amenințare gravă pentru caverne, deoarece introduc apă dulce care dizolvă sarea. Pe amplasament, gestiunea apelor pluviale presupune colectarea și evacuarea controlată a precipitațiilor, evitând infiltrarea către goluri. Bazinul hidrografic de recepție al amplasamentului se delimitează, iar debitele de vârf se estimează pentru dimensionarea sistemelor de drenaj, folosind date meteo și modelul de teren Copernicus.' },
      { type:'p', text:'Infiltrarea apelor pluviale în subteran este deosebit de periculoasă la amplasamentele saline, deoarece poate iniția sau accelera dizolvarea necontrolată, urmând căile de slăbiciune (foraje vechi, fracturi). Debitul de apă pluvială care ajunge la goluri trebuie minimizat prin impermeabilizarea suprafețelor critice, prin colectarea în rigole și prin direcționarea departe de proiecția cavernelor. Debitul de vârf se calculează prin metoda rațională: Q = C · i · A, unde C este coeficientul de scurgere, i intensitatea ploii de proiectare și A suprafața bazinului. Aceste valori dimensionează rețeaua de drenaj a amplasamentului.' },
      { type:'p', text:'Gestiunea apelor pluviale se integrează cu protecția hidrogeologică a cavernelor: sistemul de drenaj trebuie să garanteze că nicio cantitate semnificativă de apă dulce nu ajunge la masivul de sare. Monitorizarea după evenimente pluviale extreme verifică eficacitatea. Cadrul de reglementare include normele de gospodărire a apelor și OUG 195/2005. Spre deosebire de planul regional de management al apelor, aici se gestionează strict apele amplasamentului. Tabelul prezintă debitele de vârf calculate pe subbazinele amplasamentului și capacitatea sistemului de drenaj proiectat.' },
      { type:'table', headers:['Subbazin','Suprafață (ha)','Debit vârf (l/s)'], rows:[
        ['Subbazin nord','3,2','148'],
        ['Subbazin acces','1,8','86'],
        ['Subbazin caverne','2,5','120'],
        ['Subbazin lac','4,1','190']
      ]}
    ]
  },
  {
    title: 'Calitatea apelor de suprafață și protecția lacurilor',
    blocks: [
      { type:'p', text:'Calitatea apelor de suprafață ale amplasamentului — lacuri sărate, pâraie, ape de scurgere — condiționează atât valoarea balneară, cât și sănătatea ecosistemului. Pe amplasament, calitatea apei se monitorizează prin parametri fizico-chimici (mineralizație, pH, oxigen dizolvat, nutrienți) și microbiologici, conform normelor de mediu și balneare. Lacurile sărate cu utilizare terapeutică trebuie să respecte praguri stricte de calitate pentru a fi sigure pentru băi. Datele de monitorizare se compară cu valorile de referință și se urmăresc în tendință pentru a detecta din timp orice degradare a resursei.' },
      { type:'p', text:'Amenințările la adresa calității apelor includ poluarea de la activitățile turistice (ape uzate insuficient epurate), aportul de nutrienți care favorizează eutrofizarea și diluarea cu apă dulce care reduce mineralizația terapeutică. Pe amplasament, protecția lacurilor presupune epurarea adecvată a apelor uzate, controlul accesului și menținerea bilanțului hidrologic. Eutrofizarea se evaluează prin concentrația de nutrienți și clorofilă; o creștere semnalează degradare. Capacitatea de băi a lacului se limitează pentru a nu depăși pragul de încărcare ce ar compromite calitatea apei și valoarea ei terapeutică.' },
      { type:'p', text:'Protecția calității apelor se integrează cu gestiunea apelor pluviale și cu protecția nămolului terapeutic, formând un sistem coerent de conservare a resurselor balneare ale amplasamentului. Monitorizarea periodică și raportarea către APM (Agenția pentru Protecția Mediului) asigură conformitatea. Cadrul legal include OUG 195/2005 și normele balneare OG 109/2000. Spre deosebire de gestiunea regională a apelor saline, aici se protejează strict lacurile acestui amplasament. Tabelul prezintă parametrii de calitate a apei monitorizați pe lacurile terapeutice ale amplasamentului, raportați la pragurile balneare.' },
      { type:'table', headers:['Parametru','Lac terapeutic','Prag balnear ×10'], rows:[
        ['pH','7,2','85'],
        ['Oxigen dizolvat (mg/l)','6','40'],
        ['Nutrienți (mg/l)','1,2','20'],
        ['Indice microbiologic','3','10']
      ]}
    ]
  },
  {
    title: 'Microclimatul de suprafață și bioclimatul terapeutic',
    blocks: [
      { type:'p', text:'Pe lângă microclimatul subteran, amplasamentul salin beneficiază adesea de un bioclimat de suprafață favorabil curei, caracterizat prin aerosol salin natural (în special lângă lacuri și saline deschise), ozon, ionizare a aerului și efect sedativ. Acest bioclimat completează factorii terapeutici subterani și extinde sezonul de cură în aer liber. Pe amplasament, bioclimatul se caracterizează prin parametri meteorologici (temperatură, umiditate, vânt, însorire) și prin indici de confort termic, conform metodologiei INRMFB de evaluare a factorilor climatici terapeutici.' },
      { type:'p', text:'Aerosolul salin de suprafață se formează prin evaporarea apei sărate din lacuri și prin antrenarea de către vânt a particulelor de sare, creând în jurul lacurilor o atmosferă cu valoare terapeutică similară aerului marin. Indicii bioclimatici — indicele de stres cutanat, pulmonar și de confort termic — descriu solicitarea pe care clima o exercită asupra organismului, ghidând recomandările de cură. Pe amplasament, aceste valori se calculează din datele meteo locale și se compară cu pragurile de confort, identificând perioadele optime pentru cura în aer liber și pentru activitățile turistice.' },
      { type:'p', text:'Bioclimatul de suprafață trebuie protejat de poluarea atmosferică locală (trafic, încălzire) care i-ar diminua valoarea terapeutică. Calitatea aerului ambiental se monitorizează prin stații și prin date OpenAQ. Documentarea bioclimatului întregește dosarul de recunoaștere a amplasamentului ca obiectiv balnear, conform OG 109/2000 și INRMFB. Spre deosebire de caracterizarea climatică regională, aici se documentează strict bioclimatul amplasamentului. Graficul prezintă variația lunară a indicelui de confort termic pe amplasament, evidențiind perioadele favorabile curei în aer liber.' },
      { type:'chart', data:[['Mar',42],['Mai',68],['Iul',81],['Sep',74],['Nov',38]], title:'Indice confort bioclimatic lunar (0-100)', source:'Date meteo, metodologie INRMFB' }
    ]
  },
  {
    title: 'Geometria pilierilor și raportul de extracție',
    blocks: [
      { type:'p', text:'Pilierii de sare lăsați între camere sunt structura portantă fundamentală a exploatării în sistem cameră și pilier. Dimensiunea lor și raportul de extracție (proporția de sare extrasă din volumul total) determină stabilitatea pe termen lung. Un raport de extracție prea mare lasă pilieri subțiri, suprasolicitați, care converg rapid și pot ceda. Pe amplasament, geometria pilierilor se documentează din releveu și se compară cu cerințele de stabilitate. Raportul de extracție se calculează ca e = 1 − Ap/Atotal, unde Ap este aria totală a pilierilor iar Atotal aria perimetrului exploatat.' },
      { type:'p', text:'Efortul pe pilier crește cu raportul de extracție conform teoriei ariei tributare: σp = σv / (1 − e). Astfel, la un raport de extracție de 75%, efortul pe pilier este de patru ori presiunea litostatică medie, ceea ce poate depăși rezistența sării. Pentru spațiile vizitate turistic, raportul de extracție trebuie menținut conservator, lăsând pilieri robuști cu factor de stabilitate ridicat. Pe amplasament, fiecare zonă de exploatare se evaluează din acest punct de vedere, identificând pilierii critici care necesită monitorizare intensificată sau, eventual, consolidare prin lăsarea de sare suplimentară.' },
      { type:'p', text:'Geometria pilierilor influențează și amenajarea turistică: pilierii robuști permit deschideri mari, spectaculoase, sigure pentru vizitare, în timp ce zonele cu pilieri subțiri se exclud din circuit. Echilibrul dintre exploatare, stabilitate și valorificare turistică se gestionează prin proiectarea atentă a geometriei. Cadrul tehnic respectă normele miniere și Legea 85/2003. Spre deosebire de planificarea regională a resursei, aici se evaluează strict pilierii acestui amplasament. Tabelul prezintă raportul de extracție și efortul pe pilier calculat pe zonele de exploatare ale amplasamentului analizat.' },
      { type:'table', headers:['Zonă exploatare','Raport extracție (%)','Efort pilier ×10 (MPa)'], rows:[
        ['Zonă veche','78','155'],
        ['Zonă turistică','58','82'],
        ['Zonă recentă','65','99'],
        ['Zonă protejată','45','62']
      ]}
    ]
  },
  {
    title: 'Iluminatul și instalațiile electrice subterane',
    blocks: [
      { type:'p', text:'Instalațiile electrice subterane ale salinei amenajate trebuie să facă față mediului salin agresiv, umidității și cerințelor stricte de siguranță. Iluminatul asigură vizibilitatea, evidențiază valorile estetice ale cavernelor și creează atmosfera dorită, fără a încălzi semnificativ aerul sau a perturba microclimatul terapeutic. Pe amplasament, sistemul de iluminat se dimensionează pe niveluri de iluminare adecvate fiecărei zone (circulație, agrement, cură) și utilizează surse eficiente energetic (LED) cu protecție anticorozivă. Iluminatul de urgență, autonom, asigură evacuarea în caz de pană de curent, fiind o componentă critică de siguranță.' },
      { type:'p', text:'Mediul salin impune protecție specială a instalațiilor electrice: clase ridicate de etanșeitate (IP), materiale rezistente la coroziune și verificări periodice. Cablurile și echipamentele se aleg pentru durabilitate în atmosferă cu aerosol salin. Consumul energetic al iluminatului și ventilației constituie o componentă importantă a costurilor de operare, motiv pentru care eficiența energetică și, eventual, sursele regenerabile la suprafață sunt relevante. Pe amplasament, bilanțul energetic se estimează pentru a dimensiona alimentarea și pentru a identifica oportunități de reducere a consumului și de creștere a fiabilității.' },
      { type:'p', text:'Fiabilitatea alimentării electrice este vitală: o întrerupere afectează simultan iluminatul, ventilația și transportul pe verticală, cu impact direct asupra siguranței vizitatorilor. De aceea se prevăd surse de rezervă (grup electrogen, baterii) pentru funcțiile critice. Cadrul de reglementare include normativele electrice și de securitate. Spre deosebire de planificarea energetică regională, aici se dimensionează strict instalațiile acestui amplasament. Tabelul prezintă consumul electric estimat pe principalele sisteme ale amplasamentului subteran și nivelul de redundanță prevăzut pentru fiecare.' },
      { type:'table', headers:['Sistem','Putere instalată (kW)','Redundanță (%)'], rows:[
        ['Iluminat general','45','50'],
        ['Iluminat urgență','8','100'],
        ['Ventilație','62','100'],
        ['Ascensoare','55','50']
      ]}
    ]
  },
  {
    title: 'Acustica spațiilor saline și sonorizarea',
    blocks: [
      { type:'p', text:'Acustica cavernelor de sare are caracteristici aparte, exploatate adesea pentru concerte și evenimente. Pereții și tavanul de sare, suprafețele neregulate și volumul mare al cavernelor produc o reverberație bogată, apreciată pentru muzică. Pe amplasament, caracteristicile acustice se evaluează prin timpul de reverberație, claritatea și nivelul de zgomot de fond. Aceste valori ghidează utilizarea spațiilor pentru evenimente culturale și amenajarea sonorizării. Reverberația lungă, atractivă pentru muzica simfonică, poate fi însă inadecvată pentru vorbire, necesitând tratamente acustice locale în zonele de ghidaj.' },
      { type:'p', text:'Timpul de reverberație depinde de volumul cavernei și de absorbția suprafețelor: T ≈ 0,16 · V / A, unde V este volumul iar A absorbția echivalentă. Cavernele mari, cu suprafețe puțin absorbante, au timpi de reverberație de câteva secunde. Pentru evenimente, sonorizarea trebuie proiectată ținând cont de această acustică, evitând suprapunerea ecourilor care ar reduce inteligibilitatea. Pe amplasament, zonele destinate evenimentelor se caracterizează acustic, iar sistemele de sonorizare se dimensionează pentru a valorifica calitățile spațiului și a compensa eventualele deficiențe pentru vorbire și anunțuri.' },
      { type:'p', text:'Acustica este și o componentă de siguranță: sistemul de sonorizare trebuie să asigure inteligibilitatea anunțurilor de urgență în toate zonele vizitate. De aceea, proiectarea acustică echilibrează calitatea pentru evenimente cu claritatea pentru comunicarea de siguranță. Cadrul de reglementare include normele de sonorizare și de siguranță. Spre deosebire de planificarea culturală regională, aici se caracterizează strict acustica acestui amplasament. Tabelul prezintă timpul de reverberație și nivelul de zgomot de fond măsurate în camerele utilizate pentru evenimente pe amplasament.' },
      { type:'table', headers:['Cameră','Timp reverberație ×10 (s)','Zgomot fond (dB)'], rows:[
        ['Camera C (concerte)','42','28'],
        ['Camera B (evenimente)','35','30'],
        ['Camera A (ghidaj)','28','32'],
        ['Galerie acces','22','35']
      ]}
    ]
  },
  {
    title: 'Capacitatea de băi terapeutice în saramură',
    blocks: [
      { type:'p', text:'Băile în saramură concentrată reprezintă o procedură balneară clasică pe amplasamentele saline, utilizată pentru afecțiuni reumatismale, dermatologice și de relaxare. Saramura, prin densitatea ridicată, asigură flotabilitate și efect terapeutic prin absorbția transcutanată de minerale. Pe amplasament, capacitatea de băi se dimensionează în funcție de suprafața bazinelor (naturale — lacuri sărate — sau amenajate), de norma pe persoană și de durata procedurii. Capacitatea instantanee se calculează ca Cbai = Sbazin / norma_persoană, iar capacitatea zilnică ține cont de rotația și de timpul de cură recomandat.' },
      { type:'p', text:'Calitatea și concentrația saramurii sunt parametri terapeutici esențiali: o mineralizație apropiată de saturație maximizează efectul, dar impune precauții (durata limitată a băii, hidratare). Temperatura saramurii influențează confortul și efectul; lacurile heliotermice oferă natural saramură caldă. Pe amplasament, fiecare bazin de băi se caracterizează prin mineralizație, temperatură, adâncime și suprafață utilă, iar capacitatea se stabilește respectând normele de igienă și de siguranță. Supravegherea în timpul băilor și existența facilităților de duș cu apă dulce după procedură completează dispozitivul de cură balneară pe amplasament.' },
      { type:'p', text:'Capacitatea de băi se corelează cu celelalte servicii balneare (speleoterapie, nămol) într-un program integrat de cură, evitând suprasolicitarea pacienților. Igiena apei se monitorizează strict pentru a preveni riscurile sanitare. Cadrul de reglementare include OG 109/2000 și normele de igienă balneară INRMFB. Spre deosebire de planificarea regională a infrastructurii balneare, aici se dimensionează strict băile acestui amplasament. Tabelul prezintă capacitatea de băi calculată pe bazinele terapeutice ale amplasamentului, cu parametrii relevanți de saramură.' },
      { type:'table', headers:['Bazin','Mineralizație (g/l)','Capacitate zilnică (pers)'], rows:[
        ['Lac terapeutic mare','142','480'],
        ['Lac heliotermic','165','210'],
        ['Bazin amenajat 1','280','160'],
        ['Bazin amenajat 2','310','140']
      ]}
    ]
  },
  {
    title: 'Geometria de acces vertical și transportul subteran',
    blocks: [
      { type:'p', text:'Accesul vertical de la suprafață la spațiile saline subterane este o componentă critică, dat fiind că salinele se află adesea la zeci sau sute de metri adâncime. Sistemele de transport pe verticală cuprind ascensoare (lifturi), scări, planuri înclinate cu vagonete sau, în unele cazuri, funiculare. Pe amplasament, fiecare sistem se evaluează din punct de vedere al capacității, fiabilității, timpului de cursă și siguranței. Capacitatea de transport vertical adesea constituie factorul limitativ al capacității de vizitare, motiv pentru care dimensionarea ei corectă este esențială pentru funcționarea fluentă a obiectivului.' },
      { type:'p', text:'Capacitatea unui ascensor se calculează din capacitatea cabinei, ciclul de cursă și disponibilitate: Casc = (ncabine · capacitate_cabină · 3600) / timp_ciclu. Cu cât adâncimea este mai mare, cu atât ciclul este mai lung și capacitatea orară scade. Scările, deși cu capacitate teoretic mare, sunt obositoare la adâncimi mari și nepotrivite pentru pacienți. Planurile înclinate cu vagonete oferă o experiență turistică, dar au capacitate limitată. Pe amplasament, combinația de sisteme se dimensionează pentru a prelua fluxul de vizitatori la capacitatea de vizitare stabilită, cu redundanță pentru cazuri de avarie.' },
      { type:'p', text:'Siguranța transportului vertical impune sisteme de frânare, de comunicare, de evacuare în caz de blocare și mentenanță riguroasă în mediul salin coroziv. O defecțiune afectează direct accesul și evacuarea, fiind un risc major. De aceea se prevede redundanță și proceduri de urgență. Cadrul de reglementare include normele ISCIR și de siguranță. Spre deosebire de planificarea regională a accesului, aici se dimensionează strict transportul vertical al acestui amplasament. Tabelul prezintă capacitatea sistemelor de acces vertical ale amplasamentului și adâncimea deservită de fiecare.' },
      { type:'table', headers:['Sistem','Adâncime deservită (m)','Capacitate (pers/h)'], rows:[
        ['Ascensor principal','210','420'],
        ['Ascensor secundar','210','180'],
        ['Scară de acces','120','360'],
        ['Plan înclinat','160','120']
      ]}
    ]
  },
  {
    title: 'Stabilitatea tavanului și purjarea',
    blocks: [
      { type:'p', text:'Tavanul (coronamentul) cavernelor de sare este zona cea mai expusă la căderi de fragmente, un risc direct pentru vizitatori. Stabilitatea tavanului depinde de grosimea stratului de sare deasupra golului, de prezența intercalațiilor de argilă (planuri de desprindere) și de starea de tensiune. Pe amplasament, tavanul fiecărei camere vizitabile se inspectează vizual și instrumental, identificând fragmentele instabile, fisurile și zonele de exfoliere. Stabilitatea se evaluează prin grosimea relativă a tavanului față de deschidere și prin observarea evoluției în timp a stării suprafeței.' },
      { type:'p', text:'Purjarea (scaling) este operațiunea de îndepărtare controlată a fragmentelor instabile de pe tavan și pereți, pentru a preveni căderile necontrolate. Pe amplasament, purjarea se efectuează periodic în spațiile vizitate, în special după evenimente seismice sau la apariția unor semne de instabilitate. Acolo unde purjarea nu este suficientă, se aplică susțineri (plase, ancore) compatibile cu mediul salin. Grosimea minimă de tavan stabil se estimează în funcție de deschidere și de proprietățile sării; sub această valoare, spațiul se exclude din circuitul turistic sau se consolidează corespunzător pentru siguranță.' },
      { type:'p', text:'Inspecția și purjarea tavanului fac parte din mentenanța de siguranță a amplasamentului și se înscriu în programul UCC. Documentarea stării tavanului în timp permite detectarea tendințelor de degradare. Cadrul de reglementare include normele de securitate minieră și de funcționare turistică. Spre deosebire de evaluarea regională a resursei, aici se monitorizează strict tavanul cavernelor acestui amplasament. Tabelul prezintă starea tavanului și frecvența purjării pe camerele vizitate ale amplasamentului analizat, ca parte a planului de mentenanță.' },
      { type:'table', headers:['Cameră','Grosime tavan (m)','Frecvență purjare (luni)'], rows:[
        ['Camera A','18','12'],
        ['Camera B','14','6'],
        ['Camera C','25','12'],
        ['Camera D','10','4']
      ]}
    ]
  },
  {
    title: 'Servicii de cazare și ospitalitate în proximitate',
    blocks: [
      { type:'p', text:'Valorificarea turistică și balneară a amplasamentului depinde de existența serviciilor de cazare și ospitalitate în proximitate, care permit șederi de durată necesare curei. Pe amplasament și în zona imediată se inventariază unitățile de cazare (hoteluri, pensiuni, baze de tratament), restaurantele și serviciile conexe, evaluându-le capacitatea, clasificarea și gradul de ocupare. Cura balneară, care presupune serii de proceduri pe parcursul mai multor zile, generează o cerere de cazare de durată, distinctă de turismul de o zi. Echilibrul dintre capacitatea de cazare și fluxul de pacienți determină potențialul de dezvoltare balneară.' },
      { type:'p', text:'Deficitul de cazare limitează valorificarea potențialului terapeutic al amplasamentului: chiar dacă salina și lacurile pot susține un număr mare de curanți, lipsa locurilor de cazare împiedică șederile lungi. Pe amplasament, se compară capacitatea de cazare existentă cu cererea estimată din capacitatea de cură, identificând eventualele deficite și oportunități de investiție. Calitatea și diversitatea serviciilor (de la cazare economică la baze de tratament integrate) influențează segmentele de turiști atrași. Integrarea serviciilor de cazare cu programul de cură crește atractivitatea și competitivitatea ofertei balneare locale.' },
      { type:'p', text:'Dezvoltarea ospitalității trebuie coordonată cu capacitatea de vizitare a salinei și cu planul de urbanism al localității, evitând supradimensionarea. Calitatea serviciilor se reglementează prin clasificarea turistică, conform OG 109/2000 și normelor de profil. Spre deosebire de masterplanul regional al infrastructurii turistice, aici se inventariază strict serviciile din proximitatea amplasamentului. Tabelul prezintă capacitatea de cazare disponibilă în proximitatea amplasamentului, pe categorii, raportată la cererea estimată din cura balneară.' },
      { type:'table', headers:['Tip cazare','Locuri','Grad ocupare (%)'], rows:[
        ['Hoteluri','420','62'],
        ['Pensiuni','280','55'],
        ['Bază tratament','150','78'],
        ['Cazare economică','180','40']
      ]}
    ]
  },
  {
    title: 'Impactul de mediu al activității balneare',
    blocks: [
      { type:'p', text:'Activitatea turistică și balneară de pe amplasamentul salin generează un impact de mediu care trebuie evaluat și gestionat. Principalele componente sunt: presiunea asupra resurselor de apă, generarea de ape uzate și deșeuri, traficul și emisiile asociate, perturbarea ecosistemelor lacurilor sărate și consumul energetic. Pe amplasament, impactul se evaluează pe fiecare componentă, comparând nivelurile cu capacitatea de suport a mediului. Evaluarea respectă procedurile de mediu și se raportează către APM. Obiectivul este o dezvoltare turistică sustenabilă, care valorifică resursele fără a le degrada pe termen lung.' },
      { type:'p', text:'Ecosistemele saline — lacurile, zonele umede, flora și fauna halofile — sunt adaptate la condiții extreme și pot fi deosebit de fragile. Turismul de masă necontrolat le poate degrada prin poluare, calcare și modificarea regimului hidrologic. Pe amplasament, protecția acestor ecosisteme presupune limitarea accesului în zonele sensibile, gestionarea adecvată a deșeurilor și apelor uzate și monitorizarea biodiversității. Capacitatea de suport ecologic se estimează pentru a stabili plafoane de vizitare compatibile cu conservarea. Acest echilibru între valorificare și protecție este esențial pentru sustenabilitatea ofertei balneare a amplasamentului.' },
      { type:'p', text:'Reducerea impactului de mediu se obține prin epurarea apelor uzate, managementul deșeurilor, eficiență energetică, promovarea transportului sustenabil și educarea vizitatorilor. Monitorizarea de mediu verifică eficacitatea măsurilor. Cadrul legal include OUG 195/2005 și procedurile de evaluare a impactului. Spre deosebire de evaluarea de mediu regională, aici se analizează strict impactul activității de pe acest amplasament. Tabelul prezintă componentele de impact de mediu ale amplasamentului și nivelul lor raportat la capacitatea de suport estimată.' },
      { type:'table', headers:['Componentă impact','Nivel actual','Capacitate suport ×10'], rows:[
        ['Consum apă (mc/zi)','85','150'],
        ['Ape uzate (mc/zi)','62','120'],
        ['Deșeuri (kg/zi)','340','600'],
        ['Trafic (vehicule/zi)','480','800']
      ]}
    ]
  },
  {
    title: 'Geometria de subsidență și restricțiile de utilizare',
    blocks: [
      { type:'p', text:'Cuveta de subsidență de la suprafață, generată de convergența cavernelor, definește restricțiile de utilizare a terenului de pe amplasament. În zona centrală a cuvetei, tasările verticale sunt maxime; spre margini apar deformații orizontale (întindere și compresiune) care pot fisura construcțiile. Pe amplasament, geometria cuvetei se cartografiază din date InSAR și nivelment, delimitând zone cu restricții diferențiate de construire. Construcțiile sensibile, rețelele rigide și amenajările permanente se exclud din zonele cu tasări active sau se proiectează cu măsuri speciale de adaptare la deformații.' },
      { type:'p', text:'Deformațiile orizontale la marginea cuvetei sunt deosebit de periculoase pentru construcții: întinderea fisurează fundațiile și pereții, iar compresiunea poate produce ridicări locale. Aceste deformații se cuantifică prin gradientul de subsidență (panta cuvetei) și prin deformația specifică orizontală. Pe amplasament, se stabilesc praguri de deformație admisibilă pentru diferite tipuri de construcții și se cartografiază zonele care le depășesc. Restricțiile de utilizare rezultate se integrează în planul de amenajare al parcelei, asigurând că dezvoltarea de la suprafață nu este compromisă de comportarea subterană a amplasamentului.' },
      { type:'p', text:'Restricțiile de utilizare bazate pe subsidență sunt o componentă centrală a regimului juridic al amplasamentului și trebuie respectate în autorizarea construcțiilor. Ele se actualizează pe măsură ce monitorizarea oferă date noi despre evoluția cuvetei. Cadrul de reglementare include normele de urbanism și Legea minelor 85/2003. Spre deosebire de cartarea regională a subsidenței, aici se delimitează strict restricțiile acestui amplasament. Tabelul prezintă zonele de restricție delimitate pe amplasament în funcție de viteza de tasare și de deformația orizontală.' },
      { type:'table', headers:['Zonă','Tasare (mm/an)','Restricție utilizare (1-100)'], rows:[
        ['Centru cuvetă','24','95'],
        ['Margine cuvetă','12','70'],
        ['Periferie','5','35'],
        ['În afara cuvetei','1','10']
      ]}
    ]
  },
  {
    title: 'Geochimia sării și impuritățile',
    blocks: [
      { type:'p', text:'Compoziția geochimică a sării de pe amplasament influențează atât exploatarea, cât și valoarea terapeutică a aerosolului și a saramurii. Sarea gemă este predominant halit (NaCl), dar conține impurități variabile: argilă, anhidrit (sulfat de calciu), săruri de potasiu și magneziu, oligoelemente. Pe amplasament, geochimia se determină prin analize de laborator pe probe, conform standardelor, și caracterizează puritatea sării și prezența elementelor benefice sau nedorite. Compoziția influențează culoarea sării (de la alb pur la nuanțe cenușii sau roșcate), comportamentul mecanic și calitatea terapeutică a factorilor naturali derivați.' },
      { type:'p', text:'Impuritățile au efecte multiple: argila reduce rezistența mecanică și introduce planuri de slăbiciune, anhidritul modifică reologia, iar prezența unor oligoelemente poate adăuga valoare terapeutică saramurii și nămolului. Pentru aerosolul terapeutic, puritatea sării contează: o sare prea bogată în impurități poate degaja particule mai puțin benefice. Pe amplasament, geochimia sării se corelează cu utilizările vizate — exploatare industrială, turism, terapie — pentru a evalua adecvarea resursei. Analizele se raportează către ANRM și fundamentează clasificarea calitativă a zăcământului din perimetrul amplasamentului.' },
      { type:'p', text:'Caracterizarea geochimică completează cunoașterea resursei și fundamentează deciziile de valorificare. Ea se corelează cu geologia și cu mecanica sării pentru o imagine integrată. Cadrul de reglementare include normele ANRM de evidență a resurselor minerale și Legea 85/2003. Spre deosebire de caracterizarea regională a bazinului salifer, aici se analizează strict geochimia sării acestui amplasament. Tabelul prezintă compoziția geochimică medie a sării determinată pe probe din orizonturile principale ale amplasamentului analizat.' },
      { type:'table', headers:['Component','Conținut mediu (%)','Variabilitate ×10 (%)'], rows:[
        ['NaCl (halit)','96','30'],
        ['Argilă','2','15'],
        ['Anhidrit','1','8'],
        ['Alte săruri','1','5']
      ]}
    ]
  },
  {
    title: 'Riscul de poluare a saramurii și protecția sanitară',
    blocks: [
      { type:'p', text:'Saramura utilizată în scop terapeutic — fie din lacuri, fie din sonde — trebuie protejată împotriva poluării pentru a fi sigură pentru băi și proceduri. Riscurile de poluare includ infiltrarea de ape uzate, scurgeri de substanțe de la activitățile de la suprafață, contaminarea microbiologică de la vizitatori și aportul de poluanți din precipitații. Pe amplasament, protecția sanitară a saramurii se asigură prin zone de protecție în jurul surselor, prin controlul activităților din bazinul de alimentare și prin monitorizarea periodică a calității. Aceste măsuri respectă normele sanitare aplicabile factorilor naturali de cură.' },
      { type:'p', text:'Zonele de protecție sanitară se dimensionează în funcție de vulnerabilitatea sursei și de timpul de tranzit al poluanților: o zonă de protecție severă, în imediata apropiere, interzice orice activitate poluantă; o zonă de protecție restrictivă, mai largă, limitează activitățile cu risc. Pentru saramura terapeutică, parametrii sanitari (microbiologici, chimici) se monitorizează regulat, iar depășirea pragurilor declanșează măsuri corective și, dacă e necesar, suspendarea utilizării. Pe amplasament, aceste zone se delimitează concret și se integrează în regimul de protecție al resursei balneare.' },
      { type:'p', text:'Protecția sanitară a saramurii este o condiție a recunoașterii și utilizării ei terapeutice. Ea se integrează cu protecția hidrogeologică și cu calitatea apelor de suprafață, formând un sistem coerent. Monitorizarea și raportarea către autoritățile sanitare și de mediu asigură conformitatea. Cadrul legal include OG 109/2000, normele sanitare INRMFB și OUG 195/2005. Spre deosebire de protecția regională a resurselor, aici se delimitează strict zonele acestui amplasament. Tabelul prezintă zonele de protecție sanitară a saramurii delimitate pe amplasament și restricțiile aferente fiecăreia.' },
      { type:'table', headers:['Zonă protecție','Rază (m)','Nivel restricție (1-100)'], rows:[
        ['Protecție severă','25','95'],
        ['Protecție restrictivă','150','65'],
        ['Protecție hidrogeologică','400','40'],
        ['Zonă observație','800','15']
      ]}
    ]
  },
  {
    title: 'Geometria căilor de circulație și accesibilitatea internă',
    blocks: [
      { type:'p', text:'Circulația internă în spațiile saline subterane trebuie proiectată pentru fluență, siguranță și accesibilitate universală. Pe amplasament, rețeaua de căi de circulație leagă punctele de acces vertical de zonele de vizitare, cură și agrement, dimensionată pentru a prelua fluxul de vizitatori fără aglomerări. Lățimea căilor, panta, suprafața de călcare și semnalizarea se stabilesc conform normelor de accesibilitate. Traseele trebuie să permită deplasarea persoanelor cu dizabilități, a cărucioarelor și a echipamentelor de urgență. Geometria circulației influențează direct experiența vizitatorului și capacitatea efectivă a obiectivului.' },
      { type:'p', text:'Capacitatea unei căi de circulație depinde de lățimea ei și de fluxul specific admisibil: Ccirc = lățime · flux_specific, unde fluxul specific reprezintă numărul de persoane pe metru lățime și pe minut. Punctele de îngustare (treceri, scări) sunt critice și pot crea ambuteiaje, mai ales în caz de evacuare. Pe amplasament, se identifică aceste puncte și se verifică dacă fluxul corespunzător capacității de vizitare poate fi preluat fără blocaje. Accesibilitatea pentru persoanele cu mobilitate redusă impune rampe, ascensoare și suprafețe adecvate pe traseele principale ale amplasamentului.' },
      { type:'p', text:'Geometria circulației se coordonează cu planul de evacuare și cu amenajarea funcțională, asigurând fluxuri logice și sigure. Semnalizarea clară orientează vizitatorii și reduce riscul de rătăcire în spațiul complex subteran. Cadrul de reglementare include normele de accesibilitate și de siguranță. Spre deosebire de planificarea regională a circulației turistice, aici se proiectează strict circulația internă a acestui amplasament. Tabelul prezintă capacitatea căilor de circulație principale ale amplasamentului și nivelul lor de accesibilitate.' },
      { type:'table', headers:['Cale circulație','Lățime (m)','Capacitate (pers/min)'], rows:[
        ['Traseu principal','3,5','280'],
        ['Traseu cură','2,5','180'],
        ['Acces lac subteran','2,0','120'],
        ['Cale evacuare','2,2','200']
      ]}
    ]
  },
  {
    title: 'Riscul de gaze și ventilația de siguranță',
    blocks: [
      { type:'p', text:'Deși salinele sunt în general medii curate, anumite riscuri de gaze trebuie evaluate: acumularea de dioxid de carbon în zonele slab ventilate, eventuale degajări de gaze din formațiunile asociate (metan, hidrogen sulfurat în prezența materiei organice) și, în unele formațiuni, radonul. Pe amplasament, riscul de gaze se evaluează prin măsurători în diverse puncte și condiții, identificând zonele cu potențial de acumulare. Ventilația de siguranță trebuie dimensionată pentru a preveni acumulările periculoase, iar sistemele de detecție continuă alertează personalul și vizitatorii în caz de depășire a pragurilor.' },
      { type:'p', text:'Dioxidul de carbon, mai greu decât aerul, se poate acumula în depresiunile și zonele joase ale cavernelor, mai ales dacă ventilația este insuficientă. Concentrația de CO2 se monitorizează și se menține sub praguri de siguranță prin ventilație adecvată. Acolo unde formațiunile asociate ar putea degaja gaze inflamabile sau toxice, monitorizarea este obligatorie. Radonul, gaz radioactiv natural, se evaluează prin măsurători de doză; expunerea prelungită necesită ventilație pentru diluare. Pe amplasament, harta riscului de gaze ghidează amplasarea senzorilor și dimensionarea ventilației de siguranță.' },
      { type:'p', text:'Sistemul de detecție a gazelor, integrat cu ventilația și cu alarmarea, este o componentă critică de siguranță, conectată la procedurile de evacuare. Verificarea periodică și calibrarea senzorilor asigură fiabilitatea. Cadrul de reglementare include normele de securitate minieră și de protecție a sănătății. Spre deosebire de evaluarea regională, aici se analizează strict riscul de gaze al acestui amplasament. Tabelul prezintă concentrațiile de gaze monitorizate în zonele amplasamentului, raportate la pragurile de siguranță.' },
      { type:'table', headers:['Gaz','Zonă măsurare','Concentrație vs prag (% prag)'], rows:[
        ['CO2','Zonă joasă cameră D','58'],
        ['Radon','Galerie veche','42'],
        ['H2S','Lângă materie organică','12'],
        ['Metan','Contact formațiuni','8']
      ]}
    ]
  },
  {
    title: 'Capacitatea de carbon și amprenta energetică',
    blocks: [
      { type:'p', text:'Funcționarea obiectivului balnear subteran generează o amprentă de carbon legată de consumul energetic (iluminat, ventilație, transport vertical, încălzire/climatizare la suprafață) și de mobilitatea vizitatorilor. Pe amplasament, amprenta de carbon se estimează din consumul energetic și din factorii de emisie ai surselor utilizate, conform metodologiilor standard. Cuantificarea permite identificarea componentelor majore și a oportunităților de reducere. Spre deosebire de alte obiective, salinele beneficiază de temperatura constantă a subteranului, care reduce nevoia de climatizare, dar consumă energie pentru ventilație și iluminat permanent.' },
      { type:'p', text:'Reducerea amprentei de carbon se obține prin eficiență energetică (iluminat LED, ventilație reglată inteligent), prin surse regenerabile la suprafață (panouri fotovoltaice) și prin promovarea mobilității sustenabile a vizitatorilor (transport public, încărcare electrică). Amprenta pe vizitator se calculează raportând emisiile totale la numărul de vizitatori: aceasta scade cu creșterea gradului de ocupare, deoarece consumul de bază (iluminat, ventilație) se distribuie pe mai multe persoane. Pe amplasament, optimizarea acestui indicator contribuie la poziționarea obiectivului ca destinație de turism responsabil și durabil.' },
      { type:'p', text:'Cuantificarea și reducerea amprentei de carbon se aliniază obiectivelor naționale și europene de sustenabilitate și pot constitui un argument de marketing pentru turismul responsabil. Monitorizarea consumurilor și raportarea periodică susțin îmbunătățirea continuă. Cadrul de referință include strategiile de mediu și OUG 195/2005. Spre deosebire de bilanțul regional de carbon, aici se evaluează strict amprenta acestui amplasament. Graficul prezintă defalcarea amprentei de carbon a amplasamentului pe principalele componente de consum.' },
      { type:'chart', data:[['Ventilație',38],['Iluminat',24],['Transport vert.',18],['Climatizare supraf.',12],['Mobilitate vizit.',8]], title:'Amprentă carbon pe componente (%)', source:'Estimare consum × factori emisie' }
    ]
  },
  {
    title: 'Stabilitatea pereților și exfolierea sării',
    blocks: [
      { type:'p', text:'Pereții cavernelor de sare sunt supuși exfolierii — desprinderea progresivă de lamele și fragmente de sare sub efectul concentrărilor de tensiune și al variațiilor de umiditate. Exfolierea contribuie la lărgirea camerei, la acumularea de sare pe vatră și, în zonele vizitate, la un risc de cădere de fragmente. Pe amplasament, starea pereților se inspectează regulat, identificând zonele cu exfoliere activă, fisuri verticale și deformații. Spre deosebire de tavan, exfolierea pereților este de obicei mai puțin periculoasă, dar trebuie gestionată în spațiile vizitate prin purjare și, eventual, susțineri locale.' },
      { type:'p', text:'Exfolierea este accelerată de variațiile de umiditate: ciclurile de umezire și uscare la suprafața sării induc tensiuni care desprind lamele. De aceea, controlul umidității prin ventilație influențează ritmul de exfoliere. Concentrările de tensiune la colțurile camerelor și pe pereții suprasolicitați favorizează fenomenul. Pe amplasament, zonele cu exfoliere intensă se corelează cu harta de tensiuni din modelul numeric, validând predicțiile. Acolo unde exfolierea afectează stabilitatea sau siguranța, se intervine prin modelarea geometriei pereților pentru a reduce concentrările de tensiune sau prin susțineri adecvate.' },
      { type:'p', text:'Gestiunea exfolierii face parte din mentenanța de siguranță și din urmărirea comportării subterane. Documentarea ratei de exfoliere în timp completează imaginea de stabilitate a cavernelor. Cadrul de reglementare include normele de securitate minieră. Spre deosebire de evaluarea regională a resursei, aici se monitorizează strict pereții cavernelor acestui amplasament. Tabelul prezintă intensitatea exfolierii observate pe pereții camerelor amplasamentului și măsurile de gestiune aplicate.' },
      { type:'table', headers:['Cameră','Intensitate exfoliere (1-100)','Sare căzută (mc/an)'], rows:[
        ['Camera A','35','4'],
        ['Camera B','58','9'],
        ['Camera C','28','3'],
        ['Camera D','72','14']
      ]}
    ]
  },
  {
    title: 'Programul de funcționare și fluxurile de vizitatori',
    blocks: [
      { type:'p', text:'Programul de funcționare al obiectivului balnear gestionează fluxurile de vizitatori în timp, evitând aglomerarea și respectând capacitatea de vizitare. Pe amplasament, programul stabilește orarul de acces, intervalele de vizitare cu ghid, programarea ședințelor de cură și capacitatea pe fiecare interval. Sistemul de rezervare distribuie cererea uniform, prevenind depășirea plafoanelor în orele de vârf. Diferențierea între turismul de o zi și cura de durată permite alocarea adecvată a spațiilor: zonele de cură liniștită se rezervă pacienților, în timp ce circuitul turistic preia excursioniștii.' },
      { type:'p', text:'Fluxurile de vizitatori variază pe parcursul zilei, săptămânii și anului. Vârfurile de la prânz, din weekend și din sezonul estival contrastează cu intervalele cu cerere redusă. Gestionarea acestor fluxuri prin programare și tarifare diferențiată netezește cererea și optimizează utilizarea capacității. Capacitatea pe interval se calculează din capacitatea instantanee și din timpul de rotație al vizitatorilor. Pe amplasament, monitorizarea fluxurilor în timp real permite ajustarea ventilației și a personalului, asigurând o experiență de calitate și siguranța în limitele capacității stabilite anterior pentru obiectiv.' },
      { type:'p', text:'Un program de funcționare bine gândit echilibrează satisfacția vizitatorilor, siguranța, valoarea terapeutică și eficiența operațională. El se adaptează sezonier și se corelează cu capacitatea de acces și de cazare. Cadrul de reglementare include normele de funcționare turistică OG 109/2000. Spre deosebire de planificarea regională a fluxurilor turistice, aici se gestionează strict fluxul acestui obiectiv. Graficul prezintă distribuția orară a vizitatorilor pe amplasament într-o zi de vârf, evidențiind nevoia de gestionare a fluxurilor.' },
      { type:'chart', data:[['9h',8],['11h',18],['13h',24],['15h',21],['17h',12]], title:'Vizitatori pe interval orar (% din zi)', source:'Monitorizare flux, sistem rezervare' }
    ]
  },
  {
    title: 'Materialele de construcție compatibile cu mediul salin',
    blocks: [
      { type:'p', text:'Mediul salin subteran este extrem de coroziv pentru majoritatea materialelor de construcție, datorită umidității și aerosolului de sare. Alegerea materialelor pentru amenajările amplasamentului trebuie să prioritizeze rezistența la coroziune și durabilitatea. Oțelurile inoxidabile de calitate superioară, aluminiul tratat, materialele plastice rezistente, lemnul tratat și betoanele speciale sunt opțiuni adecvate. Pe amplasament, fiecare element de amenajare — structuri, balustrade, mobilier, instalații — se proiectează cu materiale compatibile, evitând oțelul carbon neprotejat care s-ar coroda rapid. Costul mai mare al materialelor durabile se justifică prin reducerea mentenanței și a riscurilor.' },
      { type:'p', text:'Coroziunea în mediu salin este accelerată de prezența simultană a umidității, oxigenului și clorurilor. Viteza de coroziune a oțelului carbon poate fi de ordinul milimetrilor pe an în astfel de condiții, ceea ce face inacceptabilă utilizarea lui pentru elemente structurale sau de siguranță. Materialele se aleg pe baza testelor de coroziune și a experienței din alte saline. Pentru elementele critice de siguranță (susțineri, balustrade, componente ale ascensoarelor), durabilitatea este esențială. Pe amplasament, planul de mentenanță prevede inspecții regulate ale stării materialelor și înlocuirea preventivă a celor degradate.' },
      { type:'p', text:'Selecția corectă a materialelor reduce costurile de operare pe termen lung și crește siguranța, evitând cedări neașteptate din cauza coroziunii. Compatibilitatea cu mediul terapeutic (materiale care nu degajă substanțe nedorite) este o cerință suplimentară. Cadrul tehnic respectă normele de construcții și de securitate. Spre deosebire de planificarea regională, aici se specifică strict materialele acestui amplasament. Tabelul prezintă materialele recomandate pe categorii de utilizare și rezistența lor estimată în mediul salin al amplasamentului.' },
      { type:'table', headers:['Utilizare','Material recomandat','Durabilitate (ani)'], rows:[
        ['Structuri susținere','Oțel inox 316','40'],
        ['Balustrade','Aluminiu tratat','30'],
        ['Mobilier','Plastic / lemn tratat','15'],
        ['Instalații','Inox / plastic','25']
      ]}
    ]
  },
  {
    title: 'Analiza economică a investiției balneare',
    blocks: [
      { type:'p', text:'Valorificarea balneară a amplasamentului salin implică investiții în amenajare, siguranță, acces și servicii, care trebuie evaluate economic. Pe amplasament, analiza economică estimează costurile de investiție (amenajare caverne, sisteme de siguranță, acces vertical, dotări) și costurile de operare (energie, personal, mentenanță, monitorizare), comparându-le cu veniturile din turism și cură. Indicatorii de eficiență — valoarea actualizată netă, rata internă de rentabilitate, perioada de recuperare — fundamentează decizia de investiție. Spre deosebire de analiza la nivel de parcelă tip deviz, aici accentul este pe valorificarea resursei balneare punctuale.' },
      { type:'p', text:'Veniturile obiectivului provin din biletele de vizitare, din serviciile de cură (speleoterapie, băi, nămol), din cazare și ospitalitate și din evenimente. Estimarea lor pornește de la numărul de vizitatori și curanți, tarife și cheltuiala medie. Costurile de operare ridicate ale unei saline (ventilație, iluminat permanent, mentenanță în mediu coroziv, monitorizare geotehnică) trebuie acoperite din venituri. Gradul de ocupare și sezonalitatea influențează puternic rentabilitatea. Pe amplasament, analiza identifică pragul de rentabilitate și sensibilitatea la variația numărului de vizitatori și a tarifelor practicate.' },
      { type:'p', text:'Analiza economică fundamentează deciziile de investiție și de tarifare, asigurând sustenabilitatea financiară a valorificării balneare. Ea trebuie să integreze și costurile de siguranță și monitorizare, esențiale dar adesea subestimate. Cadrul de referință include practicile de analiză financiară și normele turistice. Spre deosebire de strategia economică regională, aici se evaluează strict investiția în acest amplasament. Tabelul prezintă structura veniturilor și costurilor estimate ale obiectivului balnear al amplasamentului, ca bază pentru analiza de rentabilitate.' },
      { type:'table', headers:['Categorie','Tip','Valoare anuală (mii lei)'], rows:[
        ['Bilete vizitare','Venit','2400'],
        ['Servicii cură','Venit','1850'],
        ['Operare și mentenanță','Cost','1620'],
        ['Energie','Cost','740']
      ]}
    ]
  },
  {
    title: 'Riscul de antropizare și presiunea turistică',
    blocks: [
      { type:'p', text:'Succesul turistic al amplasamentului salin aduce cu sine riscul de antropizare excesivă: aglomerare, degradarea spațiilor, perturbarea microclimatului terapeutic și a ecosistemelor saline, presiune asupra infrastructurii. Capacitatea de suport turistic — numărul maxim de vizitatori pe care amplasamentul îl poate primi fără degradare — trebuie respectată. Pe amplasament, presiunea turistică se evaluează prin compararea numărului de vizitatori cu capacitatea de suport pe diferite dimensiuni: fizică (spațiu), ecologică (ecosisteme), de microclimat (calitate aer terapeutic) și de infrastructură (acces, cazare).' },
      { type:'p', text:'Depășirea capacității de suport degradează chiar resursa care atrage turiștii: aglomerarea în salină crește CO2 și diluează aerosolul salin terapeutic, calcarea ecosistemelor lacurilor le degradează, iar uzura infrastructurii crește costurile. Capacitatea de suport se stabilește ca valoarea minimă dintre limitele pe fiecare dimensiune. Pe amplasament, gestionarea presiunii turistice se face prin plafonarea numărului de vizitatori, prin programare și prin diversificarea ofertei pentru a distribui fluxul. Monitorizarea indicatorilor de degradare verifică dacă presiunea rămâne în limite sustenabile pentru valoarea balneară a amplasamentului.' },
      { type:'p', text:'Gestionarea presiunii turistice este esențială pentru sustenabilitatea pe termen lung: un obiectiv suprasolicitat își pierde atractivitatea și valoarea terapeutică. Echilibrul dintre maximizarea veniturilor și conservarea resursei este o decizie strategică. Cadrul de referință include normele turistice și de mediu. Spre deosebire de managementul regional al fluxurilor, aici se gestionează strict presiunea pe acest amplasament. Tabelul prezintă capacitatea de suport turistic pe dimensiuni și gradul actual de utilizare pe amplasamentul analizat.' },
      { type:'table', headers:['Dimensiune','Capacitate suport (vizit/zi)','Utilizare actuală (%)'], rows:[
        ['Fizică (spațiu)','2200','58'],
        ['Microclimat terapeutic','1800','72'],
        ['Ecologică (lacuri)','1500','64'],
        ['Infrastructură acces','2000','61']
      ]}
    ]
  },
  {
    title: 'Geometria de drenaj subteran și colectarea sării dizolvate',
    blocks: [
      { type:'p', text:'În spațiile saline subterane apare adesea apă — din condensare, din infiltrații sau din umiditatea ridicată — care, în contact cu sarea, formează saramură. Gestionarea acestor ape este necesară atât pentru confortul și siguranța vizitatorilor (suprafețe alunecoase), cât și pentru prevenirea dizolvării necontrolate a pereților și vetrei. Pe amplasament, sistemul de drenaj subteran colectează apele și le evacuează controlat, evitând acumularea și contactul prelungit cu sarea. Pantele vetrei, rigolele și punctele de colectare se proiectează pentru a dirija apa departe de zonele de circulație și de elementele structurale critice.' },
      { type:'p', text:'Apa care percolează prin sare se saturează rapid, formând saramură care, dacă stagnează, poate dizolva în continuare sarea la suprafața de contact, erodând vatra și baza pereților. Drenajul previne acest fenomen prin evacuarea promptă. Debitul de apă de colectat depinde de rata de infiltrație și de condensare, estimată din bilanțul de umiditate al cavernei. Pe amplasament, sistemul de drenaj se dimensionează pentru debitul maxim previzibil, cu capacitate de rezervă. Saramura colectată poate fi valorificată terapeutic sau evacuată conform normelor de mediu, în funcție de calitatea ei.' },
      { type:'p', text:'Drenajul subteran se integrează cu gestiunea hidrogeologică și cu siguranța circulației, fiind o componentă a întreținerii curente. Inspecția și curățarea periodică a rigolelor previn înfundarea. Cadrul de reglementare include normele de securitate și de mediu. Spre deosebire de gestiunea regională a apelor, aici se proiectează strict drenajul subteran al acestui amplasament. Tabelul prezintă debitele de apă colectate pe zonele amplasamentului subteran și capacitatea sistemului de drenaj proiectat pentru fiecare.' },
      { type:'table', headers:['Zonă','Debit colectat (l/h)','Capacitate drenaj (l/h)'], rows:[
        ['Camera C','120','250'],
        ['Galerie acces','85','180'],
        ['Zonă joasă','210','400'],
        ['Lac subteran','340','600']
      ]}
    ]
  },
  {
    title: 'Biodiversitatea halofilă și ecosistemele saline',
    blocks: [
      { type:'p', text:'Ecosistemele saline ale amplasamentului — lacuri, mlaștini sărate, soluri saline — găzduiesc o biodiversitate halofilă specializată, adaptată la salinitate ridicată. Flora halofilă (plante de sărătură precum Salicornia, Suaeda) și fauna asociată (nevertebrate, păsări care se hrănesc în zonele umede sărate) au valoare ecologică și de conservare. Pe amplasament, biodiversitatea se inventariază prin observații de teren și prin date ecologice, identificând speciile prezente, habitatele și eventualele specii protejate. Aceste ecosisteme rare contribuie la valoarea naturală a amplasamentului și pot fi valorificate prin turism ecologic și educativ.' },
      { type:'p', text:'Ecosistemele halofile sunt fragile și sensibile la perturbări: modificarea regimului hidrologic, poluarea, calcarea de către turiști sau modificarea salinității le pot degrada ireversibil. Pe amplasament, protecția biodiversității presupune delimitarea zonelor sensibile, limitarea accesului, menținerea regimului hidrologic și monitorizarea stării de conservare. Acolo unde sunt prezente specii sau habitate protejate, se aplică legislația de profil. Indicatorii de biodiversitate — număr de specii, abundență, prezența speciilor indicatoare — se urmăresc în timp pentru a detecta degradarea și a ajusta măsurile de protecție pe amplasament.' },
      { type:'p', text:'Conservarea biodiversității halofile se integrează cu protecția lacurilor sărate și cu gestiunea presiunii turistice, formând un sistem coerent de protecție a patrimoniului natural al amplasamentului. Valorificarea educativă (trasee tematice, observare a păsărilor) adaugă valoare fără a degrada. Cadrul legal include OUG 195/2005 și legislația de conservare a naturii. Spre deosebire de inventarul ecologic regional, aici se documentează strict ecosistemele acestui amplasament. Tabelul prezintă habitatele halofile identificate pe amplasament și starea lor de conservare.' },
      { type:'table', headers:['Habitat halofil','Specii indicatoare','Stare conservare (1-100)'], rows:[
        ['Mlaștină sărată','Salicornia','72'],
        ['Mal lac sărat','Suaeda','65'],
        ['Pajiște sărăturată','Puccinellia','58'],
        ['Zonă umedă','Păsări limicole','68']
      ]}
    ]
  },
  {
    title: 'Riscul de îngheț-dezgheț și degradarea suprafeței',
    blocks: [
      { type:'p', text:'La suprafața amplasamentului salin, ciclurile de îngheț-dezgheț pot degrada amenajările, drumurile și aflorimentele de sare. Apa care pătrunde în fisuri îngheață, se dilată și fragmentează materialul, accelerând degradarea. Pentru aflorimentele de sare și pentru lacurile sărate, înghețul are efecte specifice: deși apa sărată îngheață la temperaturi mai scăzute, fluctuațiile termice afectează stabilitatea malurilor și a depozitelor de sare expuse. Pe amplasament, riscul de îngheț-dezgheț se evaluează din regimul termic local și se gestionează prin alegerea materialelor și prin întreținerea preventivă a amenajărilor de suprafață.' },
      { type:'p', text:'Numărul de cicluri de îngheț-dezgheț pe an, determinat din datele meteo locale, este indicatorul principal al severității acestui risc. Materialele de construcție de la suprafață trebuie să reziste la aceste cicluri fără degradare semnificativă; betoanele și pietrele cu rezistență scăzută la gelivitate se evită. Pentru drumurile de acces, înghețul-dezghețul produce degradări care necesită întreținere. Pe amplasament, zonele expuse se identifică, iar materialele și soluțiile constructive se aleg pentru durabilitate. Sistemul de drenaj de suprafață contribuie la reducerea riscului prin evacuarea apei înainte de îngheț.' },
      { type:'p', text:'Gestiunea riscului de îngheț-dezgheț se integrează cu mentenanța amenajărilor de suprafață și cu gestiunea apelor pluviale. Inspecția după sezonul rece identifică degradările pentru reparații prompte. Cadrul tehnic respectă normele de construcții pentru zona climatică. Spre deosebire de evaluarea climatică regională, aici se analizează strict riscul de îngheț al acestui amplasament. Graficul prezintă numărul mediu lunar de cicluri de îngheț-dezgheț pe amplasament, indicator al severității degradării de suprafață.' },
      { type:'chart', data:[['Nov',6],['Dec',14],['Ian',18],['Feb',15],['Mar',9]], title:'Cicluri îngheț-dezgheț lunare', source:'Date meteo locale, prag 0°C' }
    ]
  },
  {
    title: 'Geometria de umplere și stabilizarea cavernelor critice',
    blocks: [
      { type:'p', text:'Cavernele critice — cele cu factor de stabilitate scăzut, cu dizolvare activă sau cu risc de prăbușire — pot necesita stabilizare prin umplere parțială sau totală. Umplerea reduce volumul gol activ, sprijină tavanul și pereții și încetinește convergența. Materialele de umplere includ steril minier, agregate, saramură saturată (pentru sprijin hidraulic) sau amestecuri speciale. Pe amplasament, cavernele care necesită stabilizare se identifică din analiza de risc, iar soluția de umplere se dimensionează în funcție de geometria golului și de obiectivul de stabilizare urmărit, ținând cont de costurile și de fezabilitatea logistică a operațiunii.' },
      { type:'p', text:'Volumul de material necesar pentru umplere se calculează din geometria cavernei (din releveu) și din gradul de umplere dorit. Pentru sprijin parțial, umplerea până la o anumită cotă reduce înălțimea efectivă a golului și îmbunătățește stabilitatea. Saramura saturată oferă sprijin hidraulic fără a dizolva sarea, fiind o soluție elegantă pentru cavernele de dizolvare. Pe amplasament, alegerea materialului și a gradului de umplere echilibrează eficacitatea stabilizării cu costul și cu eventuala pierdere a posibilității de valorificare turistică a golului. Operațiunea se planifică în coordonare cu Salrom și ANRM.' },
      { type:'p', text:'Stabilizarea prin umplere este o măsură de ultimă instanță pentru golurile periculoase care nu pot fi valorificate sau monitorizate în siguranță. Ea elimină riscul de prăbușire dar și posibilitatea de utilizare turistică a spațiului. Cadrul de reglementare include Legea minelor 85/2003 și normele de siguranță. Spre deosebire de strategia regională de închidere a salinelor, aici se dimensionează strict stabilizarea cavernelor acestui amplasament. Tabelul prezintă cavernele critice ale amplasamentului, volumul de umplere necesar și materialul recomandat.' },
      { type:'table', headers:['Cavernă critică','Volum umplere (mii mc)','Grad umplere (%)'], rows:[
        ['Gol instabil G','38','100'],
        ['Cavernă S4','22','60'],
        ['Camera D','18','40'],
        ['Coș dizolvare','12','100']
      ]}
    ]
  },
  {
    title: 'Sistemul de orientare și interpretarea pentru vizitatori',
    blocks: [
      { type:'p', text:'Experiența vizitatorului într-un spațiu salin subteran complex depinde de un sistem eficient de orientare și interpretare. Semnalizarea direcțională, hărțile, panourile informative și ghidajul audio orientează vizitatorii și transmit informații despre geologia sării, istoria exploatării, valoarea terapeutică și măsurile de siguranță. Pe amplasament, sistemul de orientare se proiectează pentru claritate și accesibilitate, în mai multe limbi pentru turiștii străini. Interpretarea transformă vizita dintr-o simplă plimbare într-o experiență educativă, crescând valoarea percepută și satisfacția vizitatorilor de toate vârstele.' },
      { type:'p', text:'Interpretarea patrimoniului salin valorifică povestea sării — formarea geologică, istoria milenară a exploatării, importanța economică și culturală, miracolul terapeutic al microclimatului. Mijloacele moderne (realitate augmentată, proiecții, expoziții interactive) îmbogățesc experiența. Pe amplasament, conținutul interpretativ se elaborează pe baza datelor geologice, istorice și terapeutice documentate în capitolele anterioare, asigurând acuratețea științifică. Semnalizarea de siguranță (căi de evacuare, instrucțiuni) se integrează cu cea informativă, fiind clară și vizibilă. Sistemul se adaptează diferitelor segmente de vizitatori, de la copii la turiști de specialitate.' },
      { type:'p', text:'Un sistem de orientare și interpretare de calitate crește atractivitatea, valoarea educativă și siguranța obiectivului, diferențiindu-l de concurență. El trebuie întreținut și actualizat. Cadrul de reglementare include normele de funcționare turistică OG 109/2000 și cerințele de accesibilitate. Spre deosebire de strategia regională de promovare, aici se proiectează strict sistemul acestui amplasament. Tabelul prezintă componentele sistemului de orientare și interpretare ale amplasamentului și gradul lor de acoperire.' },
      { type:'table', headers:['Componentă','Limbi disponibile','Acoperire (%)'], rows:[
        ['Semnalizare direcțională','4','95'],
        ['Panouri informative','3','80'],
        ['Ghidaj audio','5','70'],
        ['Aplicație mobilă','3','60']
      ]}
    ]
  },
  {
    title: 'Monitorizarea microseismică și avertizarea timpurie',
    blocks: [
      { type:'p', text:'Monitorizarea microseismică detectează micile evenimente de fracturare din masivul de sare și din jurul cavernelor, oferind un sistem de avertizare timpurie a instabilității. Microcutremurele induse de redistribuirea tensiunilor, de fluaj sau de dizolvare precedă adesea cedările majore. Pe amplasament, o rețea de senzori seismici sensibili înregistrează aceste evenimente, localizându-le și caracterizându-le energia. O creștere a frecvenței sau a energiei microevenimentelor într-o zonă semnalează evoluția spre instabilitate, declanșând inspecții și măsuri de precauție. Această tehnică completează monitorizarea convergenței și a subsidenței.' },
      { type:'p', text:'Activitatea microseismică se interpretează prin analiza ratei de evenimente, a distribuției lor spațiale și a magnitudinilor. O grupare de microevenimente în jurul unui pilier sau al unui tavan indică o zonă de fracturare activă. Localizarea evenimentelor (prin triangulație din timpii de sosire la senzori) permite identificarea precisă a zonelor problematice. Pe amplasament, pragurile de alarmă microseismică se stabilesc pe baza activității de fond și a corelației cu alte măsurători. Sistemul funcționează continuu, oferind o supraveghere în timp real a comportării subterane, esențială pentru spațiile vizitate.' },
      { type:'p', text:'Monitorizarea microseismică este o componentă avansată a sistemului de avertizare timpurie al UCC, deosebit de valoroasă pentru detectarea precoce a degradării. Ea se corelează cu modelarea numerică și cu celelalte măsurători pentru o imagine completă. Cadrul tehnic respectă bunele practici de monitorizare geotehnică. Spre deosebire de monitorizarea seismică regională, aici se supraveghează strict microactivitatea acestui amplasament. Graficul prezintă evoluția ratei de microevenimente seismice înregistrate pe amplasament, indicator de avertizare timpurie.' },
      { type:'chart', data:[['Trim 1',12],['Trim 2',15],['Trim 3',23],['Trim 4',41]], title:'Microevenimente seismice pe trimestru', source:'Rețea microseismică amplasament' }
    ]
  },
  {
    title: 'Gestiunea deșeurilor și economia circulară locală',
    blocks: [
      { type:'p', text:'Funcționarea obiectivului balnear generează deșeuri — menajere de la vizitatori, din restaurante, din mentenanță și, eventual, steril de la operațiunile de stabilizare. Gestiunea adecvată a deșeurilor previne poluarea ecosistemelor saline fragile și menține atractivitatea obiectivului. Pe amplasament, sistemul de gestiune a deșeurilor cuprinde colectarea selectivă, reciclarea, compostarea deșeurilor organice și evacuarea controlată a fracțiilor reziduale. Cantitatea de deșeuri se estimează din numărul de vizitatori și din indicatorii specifici, iar sistemul se dimensionează corespunzător, cu capacitate de rezervă pentru vârfurile de sezon.' },
      { type:'p', text:'Economia circulară oferă oportunități specifice amplasamentului salin: sterilul de la stabilizarea cavernelor poate fi valorificat ca material de umplere, saramura uzată poate fi recirculată după re-saturare, iar nămolul terapeutic folosit poate fi regenerat și reintrodus în lac. Aceste practici reduc consumul de resurse și deșeurile. Pe amplasament, se identifică fluxurile de materiale care pot fi închise în bucle circulare, reducând impactul de mediu și costurile. Colectarea selectivă a deșeurilor de la vizitatori, susținută de informare și de infrastructură adecvată, crește rata de reciclare a obiectivului.' },
      { type:'p', text:'O gestiune eficientă a deșeurilor și aplicarea principiilor economiei circulare susțin sustenabilitatea și imaginea responsabilă a obiectivului balnear. Monitorizarea cantităților și a ratei de reciclare permite îmbunătățirea continuă. Cadrul legal include legislația deșeurilor și OUG 195/2005. Spre deosebire de strategia regională de management al deșeurilor, aici se gestionează strict deșeurile acestui amplasament. Tabelul prezintă fluxurile de deșeuri ale amplasamentului și gradul de valorificare prin reciclare sau reutilizare.' },
      { type:'table', headers:['Flux deșeu','Cantitate (kg/zi)','Grad valorificare (%)'], rows:[
        ['Menajer reciclabil','180','65'],
        ['Organic','120','80'],
        ['Steril stabilizare','340','90'],
        ['Rezidual','95','10']
      ]}
    ]
  },
  {
    title: 'Iluminatul natural și ferestrele de zi (acolo unde există)',
    blocks: [
      { type:'p', text:'Unele saline beneficiază de surse de lumină naturală — guri de mină vechi, puțuri de aerisire, deschideri spre suprafață — care pot fi valorificate pentru a îmbogăți experiența vizitatorului și pentru a reduce consumul de iluminat artificial. Pe amplasament, sursele de lumină naturală se inventariază și se evaluează din punct de vedere al aportului luminos, al stabilității și al impactului asupra microclimatului. Lumina naturală creează efecte spectaculoase în spațiul salin, dar deschiderile spre suprafață pot perturba temperatura constantă și pot introduce apă de ploaie, necesitând o gestionare atentă a echilibrului.' },
      { type:'p', text:'Deschiderile spre suprafață trebuie tratate cu precauție: ele pot fi căi de pătrundere a apei dulci (risc de dizolvare), a aerului cald și umed (perturbarea microclimatului terapeutic) și a contaminării. De aceea, valorificarea luminii naturale se face controlat, cu protecție împotriva apei și, eventual, cu izolare termică. Pe amplasament, fiecare deschidere se evaluează pentru a decide dacă este valorificată ca sursă de lumină, sigilată pentru protecție sau utilizată pentru ventilație controlată. Aportul de lumină naturală reduce consumul energetic, dar nu trebuie să compromită stabilitatea și valoarea terapeutică a spațiului.' },
      { type:'p', text:'Acolo unde lumina naturală este valorificabilă în siguranță, ea adaugă valoare estetică și reduce costurile, dar gestiunea echilibrului cu microclimatul rămâne prioritară. Deschiderile se integrează în sistemul de monitorizare a apelor și a microclimatului. Cadrul de reglementare include normele de siguranță și de mediu. Spre deosebire de planificarea regională, aici se evaluează strict deschiderile acestui amplasament. Tabelul prezintă sursele de lumină naturală identificate pe amplasament și decizia de gestiune pentru fiecare.' },
      { type:'table', headers:['Deschidere','Aport lumină (1-100)','Risc microclimat (1-100)'], rows:[
        ['Gură mină veche','75','60'],
        ['Puț aerisire','40','35'],
        ['Deschidere naturală','55','70'],
        ['Fereastră amenajată','30','20']
      ]}
    ]
  },
  {
    title: 'Capacitatea de evenimente culturale și sportive subterane',
    blocks: [
      { type:'p', text:'Spațiile saline mari, cu acustica lor remarcabilă și atmosfera unică, se pretează pentru evenimente culturale (concerte, expoziții) și sportive (terenuri de sport, competiții). Aceste utilizări diversifică oferta și atrag segmente noi de public. Pe amplasament, capacitatea de evenimente se dimensionează în funcție de volumul cavernei, de suprafața utilă, de capacitatea de evacuare și de calitatea aerului, respectând aceleași limite de siguranță ca vizitarea obișnuită. Evenimentele necesită o planificare specifică a fluxurilor, a ventilației suplimentare și a măsurilor de siguranță adaptate concentrării temporare de persoane.' },
      { type:'p', text:'Capacitatea pentru evenimente este de regulă mai mică decât capacitatea de vizitare normală, deoarece publicul staționează (necesitând mai mult aer și spațiu pe persoană) și concentrarea simultană solicită evacuarea. Pentru un concert, capacitatea se calculează din suprafața disponibilă și norma pe spectator, plafonată de capacitatea de evacuare. Ventilația trebuie suplimentată pentru a face față degajării de CO2 de la public. Pe amplasament, fiecare tip de eveniment se evaluează separat, stabilind capacitatea maximă, cerințele de ventilație și măsurile de siguranță specifice configurației și duratei.' },
      { type:'p', text:'Evenimentele culturale și sportive subterane valorifică unicitatea spațiului salin și generează venituri și notorietate, dar impun o gestionare riguroasă a siguranței dată fiind concentrarea de persoane. Coordonarea cu serviciile de urgență și planurile de evacuare specifice sunt obligatorii. Cadrul de reglementare include normele de organizare a evenimentelor și OG 109/2000. Spre deosebire de strategia culturală regională, aici se dimensionează strict capacitatea acestui amplasament. Tabelul prezintă capacitatea de evenimente pe tipuri și camerele adecvate pe amplasamentul analizat.' },
      { type:'table', headers:['Tip eveniment','Cameră','Capacitate (pers)'], rows:[
        ['Concert','Camera C','680'],
        ['Expoziție','Camera B','320'],
        ['Eveniment sportiv','Camera B','180'],
        ['Conferință','Camera A','240']
      ]}
    ]
  },
  {
    title: 'Geometria de retragere și zonele de protecție la suprafață',
    blocks: [
      { type:'p', text:'Deasupra cavernelor de sare, la suprafață, trebuie respectate zone de protecție și retrageri pentru construcții, ținând cont de proiecția golurilor, de cuveta de subsidență și de eventualele riscuri de prăbușire. Pe amplasament, aceste zone de protecție se delimitează prin transferul conturului cavernelor la suprafață, extins cu o margine de siguranță determinată de unghiul de influență al subsidenței. Construcțiile permanente, în special cele cu public, se retrag în afara acestor zone sau, acolo unde este inevitabil, se proiectează cu măsuri speciale. Delimitarea respectă regimul minier și normele de urbanism.' },
      { type:'p', text:'Lățimea zonei de protecție se calculează din adâncimea cavernei și din unghiul de influență: o cavernă adâncă proiectează o zonă de protecție mai largă la suprafață. Marginea de siguranță suplimentară ține cont de incertitudinile de localizare și de evoluția golurilor. Pe amplasament, zonele de protecție se cartografiază și se integrează în planul de utilizare a terenului, condiționând autorizarea oricărei construcții. Acolo unde planurile de mină sunt incomplete, zonele se extind conservator. Aceste restricții punctuale sunt esențiale pentru siguranța dezvoltării de la suprafață a amplasamentului salin.' },
      { type:'p', text:'Zonele de protecție și retragerile la suprafață sunt o componentă a regimului juridic al amplasamentului și se respectă strict în planificarea urbanistică. Ele se corelează cu restricțiile de subsidență și se actualizează cu datele de monitorizare. Cadrul de reglementare include Legea minelor 85/2003 și normele de urbanism. Spre deosebire de zonarea regională de protecție a resursei, aici se delimitează strict zonele acestui amplasament. Tabelul prezintă zonele de protecție la suprafață delimitate deasupra cavernelor amplasamentului analizat.' },
      { type:'table', headers:['Cavernă','Adâncime (m)','Lățime zonă protecție (m)'], rows:[
        ['Camera A','120','45'],
        ['Camera B','155','58'],
        ['Camera C','95','38'],
        ['Camera D','180','68']
      ]}
    ]
  },
  {
    title: 'Calitatea serviciilor medicale balneare',
    blocks: [
      { type:'p', text:'Oferta terapeutică a amplasamentului salin necesită servicii medicale de calitate care să prescrie, supravegheze și valideze cura. Aceste servicii includ consultații de specialitate (pneumologie, balneofizioterapie), supraveghere medicală în timpul procedurilor, evaluarea răspunsului terapeutic și recomandări personalizate. Pe amplasament, calitatea serviciilor medicale se evaluează prin prezența personalului calificat, a dotărilor medicale și a protocoalelor validate. Recunoașterea curei ca tratament medical, eligibil pentru decontare, depinde de existența acestor servicii conform normelor INRMFB și ale sistemului de sănătate.' },
      { type:'p', text:'Cura balneară eficace presupune indicație medicală corectă, supraveghere a desfășurării și evaluare a rezultatelor. Personalul medical adaptează protocolul la fiecare pacient, ținând cont de afecțiune, vârstă și contraindicații. Dotările medicale (cabinet, echipamente de evaluare respiratorie, prim ajutor) trebuie să fie adecvate. Pe amplasament, integrarea serviciilor medicale cu infrastructura terapeutică (speleoterapie, băi, nămol) creează un program de cură coerent și sigur. Calitatea acestor servicii diferențiază o stațiune balneară serioasă de un simplu obiectiv turistic și determină valoarea terapeutică reală a ofertei.' },
      { type:'p', text:'Serviciile medicale de calitate sunt condiția recunoașterii și decontării curei balneare, precum și a siguranței pacienților. Ele se corelează cu protocoalele de cură și cu monitorizarea microclimatului. Cadrul de reglementare include OG 109/2000, normele INRMFB și legislația sanitară. Spre deosebire de planificarea regională a serviciilor medicale, aici se evaluează strict serviciile acestui amplasament. Tabelul prezintă componentele serviciilor medicale balneare disponibile pe amplasament și gradul lor de dezvoltare.' },
      { type:'table', headers:['Serviciu medical','Disponibilitate','Grad dezvoltare (1-100)'], rows:[
        ['Consultații specialitate','Permanent','75'],
        ['Supraveghere proceduri','Permanent','80'],
        ['Evaluare rezultate','Periodic','60'],
        ['Prim ajutor / urgență','Permanent','85']
      ]}
    ]
  },
  {
    title: 'Geometria de extindere și rezerva de dezvoltare',
    blocks: [
      { type:'p', text:'Dezvoltarea viitoare a obiectivului balnear poate necesita extinderea spațiilor amenajate, fie prin valorificarea unor caverne suplimentare, fie prin amenajarea de noi facilități la suprafață. Pe amplasament, rezerva de dezvoltare se evaluează identificând golurile stabile neamenajate, terenurile disponibile la suprafață în afara zonelor de restricție și capacitatea infrastructurii de a susține extinderea. Planificarea extinderii trebuie să respecte capacitatea de suport a amplasamentului și constrângerile geotehnice și de mediu, evitând supradezvoltarea care ar degrada resursa. Rezerva de dezvoltare oferă flexibilitate pentru adaptarea la creșterea cererii.' },
      { type:'p', text:'Identificarea cavernelor potrivite pentru extindere se bazează pe analiza de stabilitate: doar golurile cu factor de siguranță adecvat, accesibile și cu microclimat favorabil sunt candidate. La suprafață, terenurile disponibile pentru cazare, parcări sau facilități noi se identifică în afara cuvetei de subsidență și a zonelor de protecție. Capacitatea de extindere a infrastructurii (acces vertical, ventilație, utilități) condiționează scara dezvoltării posibile. Pe amplasament, rezerva de dezvoltare se cuantifică pe fiecare dimensiune, oferind o imagine a potențialului de creștere sustenabilă a obiectivului fără compromiterea siguranței și a valorii terapeutice.' },
      { type:'p', text:'Planificarea rezervei de dezvoltare orientează investițiile viitoare și asigură o creștere coerentă și sustenabilă a obiectivului balnear. Ea se corelează cu capacitatea de suport și cu planul de urbanism al localității. Cadrul de reglementare include normele de urbanism și Legea minelor 85/2003. Spre deosebire de strategia de dezvoltare regională, aici se evaluează strict rezerva acestui amplasament. Tabelul prezintă rezerva de dezvoltare a amplasamentului pe dimensiuni și potențialul de extindere estimat pentru fiecare.' },
      { type:'table', headers:['Dimensiune','Rezervă disponibilă','Potențial extindere (%)'], rows:[
        ['Caverne neamenajate','3 goluri','40'],
        ['Teren suprafață','2,8 ha','35'],
        ['Capacitate acces','—','25'],
        ['Capacitate utilități','—','30']
      ]}
    ]
  },
  {
    title: 'Sinteza riscurilor și matricea de prioritizare a amplasamentului',
    blocks: [
      { type:'p', text:'Sinteza riscurilor amplasamentului salin integrează toate hazardele analizate — geotehnice (instabilitate, prăbușire), hidrogeologice (intruziune, dizolvare), seismice, de inundație, de gaze, de mediu și turistice — într-o matrice unică de prioritizare. Pe amplasament, fiecare risc se evaluează pe două axe: probabilitatea de producere și severitatea consecințelor. Produsul lor dă un scor de risc care permite ierarhizarea și alocarea resurselor de management. Această sinteză punctuală oferă o imagine de ansamblu a expunerii amplasamentului și fundamentează planul integrat de management al riscului, distinct de evaluarea regională a hazardelor.' },
      { type:'p', text:'Matricea de risc evidențiază riscurile prioritare — cele cu probabilitate și severitate ridicate — care necesită măsuri urgente, distingându-le de riscurile minore, gestionabile prin monitorizare de rutină. Pentru amplasamentul salin, riscul de intruziune de apă dulce și de prăbușire a cavernelor critice ocupă de regulă pozițiile de top, urmate de subsidență și de riscurile turistice. Scorul de risc se actualizează pe măsură ce monitorizarea oferă date noi și măsurile de reducere sunt implementate. Pe amplasament, matricea ghidează prioritizarea investițiilor de siguranță și a programului de monitorizare.' },
      { type:'p', text:'Matricea de prioritizare a riscurilor este instrumentul central de decizie pentru managementul siguranței amplasamentului, sintetizând analizele detaliate ale capitolelor anterioare. Ea se revizuiește periodic și se raportează către autorități. Cadrul de reglementare include Legea minelor 85/2003, OUG 195/2005 și normele de securitate. Spre deosebire de matricea de risc regională, aici se prioritizează strict riscurile acestui amplasament. Tabelul prezintă matricea sintetică de risc a amplasamentului, cu scorul calculat pentru principalele hazarde identificate.' },
      { type:'table', headers:['Hazard','Probabilitate (1-10)','Scor risc (prob×sev)'], rows:[
        ['Intruziune apă dulce','6','48'],
        ['Prăbușire cavernă critică','4','40'],
        ['Subsidență construcții','7','35'],
        ['Aglomerare turistică','5','20']
      ]}
    ]
  },
  {
    title: 'Planul integrat de management al siguranței amplasamentului',
    blocks: [
      { type:'p', text:'Planul integrat de management al siguranței reunește toate măsurile, procedurile și responsabilitățile într-un document operațional unic pentru amplasamentul salin. El definește cine face ce, când și cum, în condiții normale și de urgență, transformând analizele tehnice în acțiune coordonată. Pe amplasament, planul cuprinde programul de monitorizare (UCC, microseismic, hidrogeologic), procedurile de inspecție și mentenanță, pragurile de alarmă, planurile de evacuare, măsurile de reducere a riscurilor prioritare și alocarea responsabilităților. Spre deosebire de strategia regională de siguranță, acest plan este punctual, adaptat geometriei și hazardelor concrete ale amplasamentului.' },
      { type:'p', text:'Planul stabilește o ierarhie clară de răspuns: monitorizarea continuă alimentează indicatorii, depășirea pragurilor declanșează inspecții, iar confirmarea unei degradări activează măsuri de la restricționarea accesului până la evacuare sau intervenții de stabilizare. Fiecare nivel de răspuns are proceduri și responsabili definiți, asigurând o reacție promptă și coordonată. Planul integrează și comunicarea cu autoritățile (ANRM, APM, ISU) și cu publicul. Pe amplasament, eficacitatea planului depinde de actualizarea periodică cu datele de monitorizare și de instruirea personalului prin exerciții, astfel încât răspunsul la situații reale să fie automat și sigur.' },
      { type:'p', text:'Planul integrat de management al siguranței este sinteza operațională a întregului studiu de amplasament, traducând cunoașterea geotehnică, hidrogeologică și balneară în siguranță efectivă. El se revizuiește anual și după orice eveniment semnificativ, asigurând adaptarea continuă. Cadrul legal include Legea minelor 85/2003, OUG 195/2005, OG 109/2000 și normele de securitate. Spre deosebire de planul regional, aici se gestionează strict siguranța acestui amplasament. Tabelul prezintă componentele planului integrat de management al siguranței și gradul lor de implementare pe amplasamentul analizat.' },
      { type:'table', headers:['Componentă plan','Responsabil','Grad implementare (%)'], rows:[
        ['Program monitorizare UCC','Operator / proiectant','85'],
        ['Proceduri evacuare','Operator','90'],
        ['Praguri alarmă și răspuns','Operator / ANRM','70'],
        ['Instruire și exerciții','Operator','60']
      ]}
    ]
  }
];
