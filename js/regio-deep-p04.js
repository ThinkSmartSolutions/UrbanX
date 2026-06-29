// regio-deep-p04.js — Studiu national de regionalizare a Romaniei
// PART 04 — DEMOGRAFIA REGIONALA SI PROIECTIILE DE POPULATIE
window._REGIO_DEEP = window._REGIO_DEEP || {};
window._REGIO_DEEP['p04'] = [

  { title: 'Structura populației pe cele opt regiuni de dezvoltare (Recensământ 2021)', blocks: [
    { type:'p', text:'Recensământul Populației și Locuințelor 2021, realizat de Institutul Național de Statistică (INS), a consemnat o populație rezidentă a României de aproximativ 19,05 milioane de locuitori, în scădere față de cele peste 20,12 milioane înregistrate la recensământul din 2011. Distincția dintre populația rezidentă, care exclude persoanele plecate pentru perioade de cel puțin douăsprezece luni, și populația după domiciliu, care le include și depășește 22 de milioane, este esențială pentru orice analiză regională onestă; folosirea celei din urmă supraestimează masiv populația efectiv prezentă pe teritoriu. Cele opt regiuni de dezvoltare, instituite prin Legea 151/1998 și reconfirmate prin Legea 315/2004, rămân unități statistice de nivel NUTS 2 fără personalitate juridică, dar constituie cadrul natural de raportare a indicatorilor demografici către Eurostat. Distribuția populației între ele este profund inegală și reflectă atât moștenirea istorică, cât și dinamica recentă a migrației interne către polii economici.' },
    { type:'p', text:'Regiunea Nord-Est, cea mai populată, concentrează în jur de 3,225 milioane de locuitori, urmată de Sud-Muntenia cu aproximativ 2,940 milioane și de Nord-Vest cu circa 2,520 milioane. La polul opus, regiunea Vest numără aproximativ 1,720 milioane, iar Sud-Vest Oltenia circa 1,880 milioane, ambele afectate de declin susținut. București-Ilfov, deși cea mai mică ca suprafață, concentrează aproximativ 2,270 milioane de locuitori și o densitate de departe cea mai ridicată din țară. Această asimetrie demografică, în care regiunea cea mai populată depășește cu aproape un milion și jumătate regiunea cea mai puțin populată, ridică problema echilibrului de reprezentare și de capacitate administrativă în orice schemă de regionalizare cu personalitate juridică.' },
    { type:'p', text:'Pentru a compara dinamica regională se folosește rata medie anuală de creștere geometrică, definită ca r egal cu radical de ordin n din raportul P_final supra P_inițial, minus unu, înmulțit cu o sută, unde n este numărul de ani din interval. Aplicată intervalului intercenzitar 2011-2021, formula produce valori negative pentru toate regiunile cu excepția relativă a polilor de atracție, confirmând că declinul demografic este structural, nu conjunctural. Ponderea fiecărei regiuni în totalul național variază între aproximativ 9,0 la sută pentru Vest și circa 16,9 la sută pentru Nord-Est, repere care fundamentează atât alocările bugetare, cât și dimensionarea serviciilor publice regionale.' },
    { type:'table', headers:['Regiune (NUTS 2)','Reședință','Populație rezidentă 2021 (mii)'], rows:[
      ['Nord-Est','Iași','3225'],
      ['Sud-Muntenia','Pitești/Ploiești','2940'],
      ['Nord-Vest','Cluj-Napoca','2520'],
      ['Sud-Est','Galați/Constanța','2390'],
      ['Centru','Brașov','2280'],
      ['București-Ilfov','București','2270'],
      ['Sud-Vest Oltenia','Craiova','1880'],
      ['Vest','Timișoara','1720']
    ]}
  ]},

  { title: 'Ponderea regiunilor în populația națională și asimetria teritorială', blocks: [
    { type:'p', text:'Repartiția procentuală a celor 19,05 milioane de locuitori rezidenți relevă o concentrare a populației în jumătatea estică și sudică a țării. Nord-Est, Sud-Muntenia și Sud-Est însumează împreună aproape jumătate din populația națională, în vreme ce regiunile vestice, mai dezvoltate economic, găzduiesc o proporție mai redusă. Această distribuție inversă față de produsul intern brut pe cap de locuitor, în care Vest și Nord-Vest stau mult mai bine decât Nord-Est, ilustrează discrepanța dintre masa demografică și performanța economică, una dintre tensiunile centrale ale oricărei politici de coeziune teritorială pe care regionalizarea ar urmări să o corecteze.' },
    { type:'p', text:'Calculul ponderii utilizează raportul dintre populația regiunii și totalul național, exprimat procentual: pondere egal cu P_regiune supra P_total, înmulțit cu o sută. Nord-Est rezultă la aproximativ 16,9 la sută, Sud-Muntenia la circa 15,4 la sută, iar Vest la doar 9,0 la sută. Indicele de concentrare, calculabil ca sumă a pătratelor ponderilor regionale după modelul Herfindahl, arată o concentrare moderată, cu valori care urcă lent pe măsură ce polii de creștere absorb migrația internă. Această tendință de concentrare are implicații directe asupra dimensionării infrastructurii și a serviciilor în regiunile receptoare.' },
    { type:'p', text:'Asimetria nu este doar cantitativă, ci și structurală: regiunile cu populație numeroasă tind să aibă o pondere rurală mai ridicată, în timp ce regiunile cu populație mai mică sunt adesea mai urbanizate. Sud-Muntenia, de exemplu, rămâne predominant rurală în pofida masei demografice substanțiale, în vreme ce București-Ilfov este aproape integral urban. Această dublă asimetrie, de mărime și de structură urban-rural, complică proiectarea unei guvernanțe regionale uniforme și impune scheme diferențiate de alocare a competențelor și a resurselor.' },
    { type:'chart', data:[ ['Nord-Est',16.9], ['Sud-Muntenia',15.4], ['Nord-Vest',13.2], ['Sud-Est',12.5], ['Centru',12.0], ['București-Ilfov',11.9], ['Sud-Vest Oltenia',9.9], ['Vest',9.0] ], title:'Ponderea regiunilor în populația rezidentă națională (%, 2021)', source:'INS — Recensământul Populației și Locuințelor 2021' }
  ]},

  { title: 'Declinul demografic național de la 1990 la 2021', blocks: [
    { type:'p', text:'România a traversat în ultimele trei decenii unul dintre cele mai accentuate declinuri demografice din Uniunea Europeană. De la un maxim istoric de aproximativ 23,2 milioane de locuitori la recensământul din 1992 și de la o populație stabilă în jur de 22,8 milioane la începutul anilor 1990, țara a coborât la circa 20,12 milioane în 2011 și la aproximativ 19,05 milioane populație rezidentă în 2021. Pierderea netă de aproape patru milioane de persoane într-o singură generație, fără un conflict armat sau o catastrofă naturală majoră, reprezintă un fenomen demografic de o amploare istorică, generat de combinația dintre soldul natural negativ și emigrația masivă de după anii 1990.' },
    { type:'p', text:'Cauzele declinului sunt cumulative. Prăbușirea natalității după liberalizarea avortului din 1990, care a curmat brusc cohortele numeroase ale politicii pronataliste din perioada comunistă, a coincis cu deschiderea frontierelor și cu valuri succesive de emigrație economică, intensificate de aderarea la Uniunea Europeană în 2007. Soldul migrator extern negativ s-a suprapus peste un sold natural devenit cronic negativ, în care numărul deceselor depășește constant numărul nașterilor. Rezultatul a fost o eroziune demografică simultană prin ambele componente ale ecuației de bilanț al populației.' },
    { type:'p', text:'Ecuația de bilanț demografic se scrie P_t+1 egal cu P_t plus N minus D plus I minus E, unde N sunt nașterile, D decesele, I imigrările și E emigrările. În cazul României, atât termenul N minus D, soldul natural, cât și termenul I minus E, soldul migrator, au fost preponderent negative după 1990, ceea ce explică declinul susținut. Proiecția acestei dinamici pe orizontul 2050 indică, în scenariul inerțial, o populație care ar putea coborî sub pragul de 16 milioane, motiv pentru care strategiile teritoriale tratează stabilizarea demografică drept obiectiv prioritar, nu drept ipoteză opțională.' },
    { type:'table', headers:['An / sursă','Tip populație','Populație (mii)'], rows:[
      ['1992 (recensământ)','stabilă','23207'],
      ['2002 (recensământ)','stabilă','21681'],
      ['2011 (recensământ)','rezidentă','20122'],
      ['2021 (recensământ)','rezidentă','19054'],
      ['2030 (proiecție inerțială)','rezidentă','18100'],
      ['2050 (proiecție inerțială)','rezidentă','15900']
    ]}
  ]},

  { title: 'Ritmul de scădere intercenzitar pe regiuni (2011-2021)', blocks: [
    { type:'p', text:'Comparația dintre recensămintele din 2011 și 2021 evidențiază că declinul demografic, deși generalizat, este profund neuniform teritorial. Regiunile din vechiul Regat și din sud, precum Sud-Vest Oltenia și Sud-Muntenia, au înregistrat scăderi procentuale dintre cele mai severe, în vreme ce București-Ilfov și, într-o anumită măsură, Nord-Vest au atenuat declinul prin atragerea de migranți interni. Această divergență a ritmurilor amplifică inegalitățile preexistente, întrucât regiunile care pierd populație sunt adesea cele cu economie mai fragilă, intrând astfel într-un cerc vicios de depopulare și subdezvoltare.' },
    { type:'p', text:'Rata medie anuală de scădere se obține din formula creșterii geometrice aplicate cu semn negativ: pentru o regiune care a pierdut, de exemplu, opt la sută din populație în zece ani, rata medie anuală este aproximativ minus 0,83 la sută, calculată ca radical de ordin zece din 0,92, minus unu. Sud-Vest Oltenia se apropie de această valoare, în timp ce București-Ilfov se menține în jurul stagnării sau al unei ușoare creșteri. Diferența cumulată pe deceniu între o regiune în declin accentuat și polul de creștere depășește zece puncte procentuale, o distanță considerabilă pentru o perioadă atât de scurtă.' },
    { type:'p', text:'Implicațiile pentru regionalizare sunt directe: o schemă care fixează granițe și competențe pe baza populației din 2021 va deveni rapid neechilibrată dacă ritmurile divergente continuă. Mecanismele de redistribuire fiscală inter-regională, indispensabile pentru a evita ca regiunile în depopulare să intre în colaps al serviciilor publice, trebuie calibrate dinamic, nu static. Monitorizarea anuală a soldurilor natural și migrator pe regiuni devine astfel un instrument de guvernanță, nu o simplă raportare statistică.' },
    { type:'chart', data:[ ['București-Ilfov',0.1], ['Nord-Vest',-3.5], ['Centru',-4.8], ['Vest',-5.2], ['Nord-Est',-6.5], ['Sud-Est',-7.4], ['Sud-Muntenia',-8.1], ['Sud-Vest Oltenia',-9.2] ], title:'Variația populației rezidente între 2011 și 2021 pe regiuni (%)', source:'INS — Recensăminte 2011 și 2021' }
  ]},

  { title: 'Îmbătrânirea populației și indicele de îmbătrânire pe regiuni', blocks: [
    { type:'p', text:'Îmbătrânirea demografică este expresia combinată a scăderii natalității și a creșterii speranței de viață, dublată de plecarea populației tinere prin emigrație. Vârsta mediană a populației României a urcat de la circa 35 de ani în 2002 la peste 42 de ani în 2021, apropiind țara de media europeană. Pe regiuni, fenomenul este accentuat în mediile rurale din Sud-Vest Oltenia, Sud-Muntenia și Sud-Est, unde plecarea tinerilor a lăsat în urmă comunități cu structură de vârstă fragilă. Polii urbani, în special București-Ilfov și Cluj, beneficiază de un aflux de populație activă tânără care temperează îmbătrânirea, dar nu o inversează.' },
    { type:'p', text:'Indicele de îmbătrânire se calculează ca raport între populația de 65 de ani și peste și populația de 0-14 ani, exprimat la o sută de copii: I_îmb egal cu P_65+ supra P_0-14, înmulțit cu o sută. O valoare peste o sută indică faptul că vârstnicii depășesc numeric copiii. La nivel național, indicele a depășit pragul de 120, semnalând o populație în îmbătrânire avansată. Regiunile sudice ating valori superioare mediei, în vreme ce Nord-Est, cu o natalitate tradițional mai ridicată, păstrează un indice relativ mai favorabil, deși și acolo tendința este ascendentă.' },
    { type:'p', text:'Consecințele îmbătrânirii sunt sistemice: presiune crescândă asupra sistemului de pensii și de sănătate, contracție a bazei contributive și nevoie sporită de servicii de îngrijire de lungă durată. Din perspectiva regionalizării, regiunile cu indice de îmbătrânire ridicat necesită o reorientare a cheltuielilor publice dinspre educație și natalitate spre sănătate și asistență socială, o realocare pe care o guvernanță regională flexibilă o poate gestiona mai fin decât administrația centralizată actuală.' },
    { type:'table', headers:['Regiune','Pondere 65+ (%)','Indice de îmbătrânire (la 100 copii)'], rows:[
      ['Sud-Vest Oltenia','20,5','142'],
      ['Sud-Muntenia','19,8','138'],
      ['Sud-Est','18,9','128'],
      ['Vest','18,7','125'],
      ['Centru','17,6','118'],
      ['Nord-Vest','17,9','120'],
      ['București-Ilfov','17,2','116'],
      ['Nord-Est','16,4','105']
    ]}
  ]},

  { title: 'Rata de dependență a vârstnicilor și presiunea asupra populației active', blocks: [
    { type:'p', text:'Rata de dependență a vârstnicilor exprimă povara economică pe care populația în vârstă de muncă o suportă pentru întreținerea persoanelor ieșite din câmpul activ. Ea se calculează ca raport între populația de 65 de ani și peste și populația de 15-64 de ani, exprimat procentual: R_dep_vârstnici egal cu P_65+ supra P_15-64, înmulțit cu o sută. La nivel național, indicatorul a urcat peste 30 la sută, ceea ce înseamnă că la fiecare zece persoane în vârstă de muncă revin peste trei vârstnici, o creștere semnificativă față de începutul anilor 2000.' },
    { type:'p', text:'Pe regiuni, rata de dependență a vârstnicilor urmează tiparul indicelui de îmbătrânire, fiind cea mai ridicată în Sud-Vest Oltenia și Sud-Muntenia și cea mai scăzută în Nord-Est și București-Ilfov. Această distribuție are consecințe fiscale directe: regiunile cu dependență ridicată generează mai puține contribuții și cheltuiesc mai mult pe pensii și sănătate, accentuând nevoia de transferuri inter-regionale. O regionalizare cu autonomie fiscală parțială ar trebui să încorporeze un mecanism de perechiajare care să compenseze regiunile cu structură de vârstă defavorabilă.' },
    { type:'p', text:'Rata de dependență totală, care adaugă la vârstnici și populația tânără de 0-14 ani, oferă imaginea completă a sarcinii suportate de populația activă. Pe măsură ce ponderea tinerilor scade prin natalitate redusă, creșterea ratei totale este antrenată aproape integral de componenta vârstnică. Proiecțiile Eurostat pentru orizontul 2050 indică o posibilă apropiere a ratei de dependență a vârstnicilor de pragul de 50 la sută, scenariu care ar transforma radical echilibrul dintre generații și ar impune reforme structurale ale sistemelor de protecție socială.' },
    { type:'table', headers:['Regiune','Pop. activă 15-64 (% din total)','Rata dependenței vârstnicilor (%)'], rows:[
      ['București-Ilfov','66,2','26'],
      ['Nord-Est','64,8','25'],
      ['Centru','65,1','27'],
      ['Nord-Vest','64,5','28'],
      ['Vest','63,9','29'],
      ['Sud-Est','64,0','30'],
      ['Sud-Muntenia','62,7','32'],
      ['Sud-Vest Oltenia','62,1','33']
    ]}
  ]},

  { title: 'Migrația internă către polii de creștere București-Ilfov, Cluj și Timiș', blocks: [
    { type:'p', text:'Migrația internă reprezintă principalul mecanism prin care declinul demografic se redistribuie teritorial, deplasând populația dinspre regiunile rurale și mono-industriale spre marile centre urbane prospere. Datele INS privind schimbările de domiciliu și de reședință arată trei poli de atracție dominanți: aglomerarea București-Ilfov, municipiul Cluj-Napoca cu zona sa metropolitană și municipiul Timișoara cu județul Timiș. Aceste destinații concentrează locuri de muncă bine plătite, universități de prestigiu și o piață imobiliară dinamică, atrăgând cu precădere populație tânără și calificată.' },
    { type:'p', text:'Soldul migrator intern, definit ca diferența dintre intrările și ieșirile de populație ale unei regiuni, este puternic pozitiv pentru București-Ilfov și pentru județele Cluj și Timiș, și negativ pentru majoritatea celorlalte. Acest transfer intern accentuează polarizarea: regiunile receptoare se întineresc și își consolidează baza fiscală, în timp ce regiunile emitente îmbătrânesc și se decapitalizează uman. Fenomenul de drenare a creierelor, cunoscut ca brain drain intern, privează regiunile periferice tocmai de capitalul uman necesar pentru a-și relansa economia.' },
    { type:'p', text:'Pentru regionalizare, migrația internă ridică o dilemă de echitate: ar trebui resursele alocate proporțional cu populația prezentă, recompensând astfel polii de creștere, sau ar trebui direcționate preferențial spre regiunile emitente pentru a frâna depopularea? Experiența europeană sugerează o combinație de investiții în conectivitate, care leagă periferiile de poli, și de descentralizare a unor funcții administrative și universitare către orașe secundare, pentru a crea poli de creștere alternativi și a difuza dezvoltarea dincolo de cele trei destinații dominante.' },
    { type:'table', headers:['Pol de atracție','Regiune','Sold migrator intern anual estimat (mii)'], rows:[
      ['București-Ilfov','București-Ilfov','22'],
      ['Cluj-Napoca','Nord-Vest','9'],
      ['Timișoara/Timiș','Vest','6'],
      ['Iași','Nord-Est','3'],
      ['Brașov','Centru','3'],
      ['Constanța','Sud-Est','2'],
      ['Sud-Vest Oltenia (net)','Sud-Vest Oltenia','-12'],
      ['Sud-Muntenia (net)','Sud-Muntenia','-15']
    ]}
  ]},

  { title: 'Emigrația externă și dimensiunea diasporei românești', blocks: [
    { type:'p', text:'Emigrația externă constituie a doua componentă majoră a declinului demografic și, pe anumite intervale, cea mai importantă. După deschiderea frontierelor din 1990 și mai ales după aderarea la Uniunea Europeană în 2007, care a deschis treptat piețele muncii din Italia, Spania, Germania și Marea Britanie, milioane de români au plecat să lucreze în străinătate. Estimările privind diaspora variază între patru și cinci milioane de persoane, în funcție de definiție și de sursă, cifre care plasează România printre țările europene cu cea mai numeroasă diaspora raportată la populația de origine.' },
    { type:'p', text:'Diferența dintre populația rezidentă, de aproximativ 19,05 milioane, și populația după domiciliu, de peste 22 de milioane, măsoară tocmai amploarea acestei plecări de lungă durată. Italia și Spania au fost destinațiile clasice ale primului val, urmate de o reorientare spre Germania și Marea Britanie. Profilul emigrantului a evoluat de la forța de muncă necalificată spre categorii tot mai calificate, inclusiv medici, ingineri și informaticieni, ceea ce a transformat emigrația într-o pierdere nu doar cantitativă, ci și calitativă de capital uman.' },
    { type:'p', text:'Impactul emigrației asupra regiunilor de origine este dublu. Pe de o parte, remitențele trimise de diaspora, estimate la câteva miliarde de euro anual, susțin consumul și investițiile locale, în special în regiunile Nord-Est și Sud-Muntenia, principalii furnizori de emigranți. Pe de altă parte, plecarea populației active lasă în urmă comunități îmbătrânite și o forță de muncă insuficientă. O politică regională inteligentă ar urmări atât valorificarea remitențelor prin canale investiționale, cât și crearea condițiilor pentru întoarcerea selectivă a diasporei calificate.' },
    { type:'table', headers:['Țară de destinație','Pondere estimată diaspora (%)','Stoc estimat (mii)'], rows:[
      ['Italia','28','1200'],
      ['Germania','22','950'],
      ['Spania','20','850'],
      ['Marea Britanie','10','420'],
      ['Franța','5','210'],
      ['Austria','4','170'],
      ['Belgia','3','130'],
      ['Alte țări','8','340']
    ]}
  ]},

  { title: 'Soldul natural negativ și componentele bilanțului demografic', blocks: [
    { type:'p', text:'Soldul natural, definit ca diferența dintre numărul născuților-vii și numărul decedaților într-o perioadă dată, a devenit cronic negativ în România începând cu anii 1990 și s-a adâncit ulterior. Dacă în deceniile comuniste natalitatea, susținută artificial de politica pronatalistă, depășea constant mortalitatea, după 1990 raportul s-a inversat durabil. În anii recenți, numărul anual al deceselor a depășit cu câteva zeci de mii numărul nașterilor, iar pandemia din 2020-2021 a amplificat temporar acest deficit prin mortalitate excedentară.' },
    { type:'p', text:'Soldul natural se exprimă și ca rată, prin formula RS_natural egal cu (N minus D) supra P_medie, înmulțit cu o mie, unde rezultatul se citește la mia de locuitori. Valorile negative de ordinul minus patru până la minus șase la mie, înregistrate la nivel național, indică o eroziune demografică naturală semnificativă chiar și în absența emigrației. Pe regiuni, deficitul natural este cel mai sever în regiunile îmbătrânite din sud și vest, unde populația vârstnică numeroasă generează multe decese, iar natalitatea redusă nu le compensează.' },
    { type:'p', text:'Componentele bilanțului demografic, soldul natural și soldul migrator, acționează în România în același sens negativ, ceea ce explică viteza declinului. Spre deosebire de țări care își compensează soldul natural negativ prin imigrație pozitivă, România a cumulat ambele deficite. Inversarea soldului natural ar necesita o redresare a natalității improbabilă pe termen scurt, motiv pentru care strategiile realiste mizează mai mult pe atenuarea soldului migrator, prin reducerea emigrației și încurajarea întoarcerii, decât pe o iluzorie revoluție a fertilității.' },
    { type:'chart', data:[ ['Nord-Est',-3.2], ['București-Ilfov',-3.5], ['Centru',-4.4], ['Nord-Vest',-4.8], ['Sud-Est',-5.5], ['Vest',-5.9], ['Sud-Muntenia',-6.4], ['Sud-Vest Oltenia',-6.9] ], title:'Rata soldului natural pe regiuni (la 1000 locuitori, estimare recentă)', source:'INS — Statistica vitală' }
  ]},

  { title: 'Natalitatea și mortalitatea regională', blocks: [
    { type:'p', text:'Rata natalității, exprimată ca număr de născuți-vii la o mie de locuitori, a scăzut în România de la valori în jurul a treisprezece la mie în anii 1990 la circa opt-nouă la mie în prezent, una dintre cele mai reduse din Uniunea Europeană. Pe regiuni, Nord-Est păstrează cea mai ridicată natalitate, susținută de o tradiție familială mai conservatoare și de o populație relativ mai tânără, în timp ce regiunile sudice și vestice înregistrează valori inferioare. București-Ilfov, în pofida tinereții populației sale active, are o natalitate moderată din cauza amânării vârstei primei nașteri specifică mediului urban prosper.' },
    { type:'p', text:'Rata mortalității, exprimată similar la o mie de locuitori, urmează în mare măsură structura de vârstă: regiunile îmbătrânite din Sud-Vest Oltenia și Sud-Muntenia au mortalitate ridicată, peste treisprezece la mie, în vreme ce regiunile mai tinere și mai urbanizate au valori mai scăzute. Mortalitatea infantilă, deși în scădere constantă, rămâne superioară mediei europene, cu disparități regionale care reflectă inegalitățile de acces la servicii medicale de calitate, în special între mediul urban și cel rural.' },
    { type:'p', text:'Diferența dintre natalitate și mortalitate produce soldul natural analizat anterior, dar examinarea separată a celor două rate este utilă pentru calibrarea politicilor. O regiune cu natalitate decentă, dar mortalitate ridicată, precum unele zone rurale, beneficiază mai mult de investiții în sănătate, în timp ce o regiune cu natalitate prăbușită beneficiază de politici de sprijin pentru familii tinere. Regionalizarea ar permite o astfel de diferențiere fină a intervențiilor, adaptată profilului demografic specific al fiecărui teritoriu, în locul unei politici naționale uniforme.' },
    { type:'table', headers:['Regiune','Rata natalității (‰)','Rata mortalității (‰)'], rows:[
      ['Nord-Est','9,8','12,9'],
      ['București-Ilfov','9,2','12,4'],
      ['Centru','9,0','13,1'],
      ['Nord-Vest','8,7','13,3'],
      ['Sud-Est','8,5','13,8'],
      ['Vest','8,3','14,0'],
      ['Sud-Muntenia','8,1','14,4'],
      ['Sud-Vest Oltenia','7,9','14,7']
    ]}
  ]},

  { title: 'Speranța de viață la naștere pe regiuni', blocks: [
    { type:'p', text:'Speranța de viață la naștere, unul dintre cei mai sintetici indicatori ai stării de sănătate și de dezvoltare a unei populații, a crescut constant în România de la circa 69 de ani la începutul anilor 1990 la peste 75 de ani înainte de pandemie, deși rămâne cu câțiva ani sub media Uniunii Europene. Pandemia din 2020-2021 a produs o regresie temporară, cu o scădere de mai mulți ani recuperată parțial ulterior. Pe regiuni, valorile variază în funcție de nivelul de dezvoltare economică, de calitatea serviciilor medicale și de comportamentele de sănătate ale populației.' },
    { type:'p', text:'Regiunile cu speranță de viață mai ridicată sunt, în general, cele mai dezvoltate și mai urbanizate, precum București-Ilfov, Nord-Vest și Centru, unde accesul la servicii medicale specializate este superior. Regiunile cu valori mai scăzute, precum Sud-Vest Oltenia și Sud-Muntenia, cumulează dezavantaje: populație rurală numeroasă, acces dificil la spitale, prevalență ridicată a factorilor de risc precum consumul de alcool și fumatul. Diferența dintre regiunea cu cea mai mare și cea cu cea mai mică speranță de viață depășește doi ani, un decalaj semnificativ în interiorul aceleiași țări.' },
    { type:'p', text:'Diferența de gen rămâne marcată: femeile trăiesc în medie cu aproape șapte ani mai mult decât bărbații, una dintre cele mai mari diferențe de gen din Europa, atribuită mortalității premature masculine prin boli cardiovasculare, accidente și comportamente de risc. Reducerea acestui decalaj și ridicarea speranței de viață regionale spre media europeană constituie un obiectiv pe care politicile regionale de sănătate, calibrate pe profilul de morbiditate al fiecărui teritoriu, îl pot urmări mai eficient decât abordarea centralizată actuală.' },
    { type:'table', headers:['Regiune','Speranță viață bărbați (ani)','Speranță de viață totală (ani)'], rows:[
      ['București-Ilfov','73,1','76'],
      ['Nord-Vest','72,3','76'],
      ['Centru','72,0','75'],
      ['Vest','71,8','75'],
      ['Nord-Est','71,5','75'],
      ['Sud-Est','71,0','74'],
      ['Sud-Muntenia','70,6','74'],
      ['Sud-Vest Oltenia','70,2','74']
    ]}
  ]},

  { title: 'Proiecțiile EUROPOP ale Eurostat pe orizontul 2030 și 2050', blocks: [
    { type:'p', text:'Proiecțiile demografice EUROPOP, elaborate periodic de Eurostat, oferă cadrul european standardizat pentru anticiparea evoluției populației pe orizonturile 2030, 2050 și 2100. Pentru România, scenariul de bază proiectează o continuare a declinului, cu o populație care ar putea coborî spre 18 milioane în 2030 și spre 16 milioane sau chiar mai puțin în 2050, în funcție de ipotezele privind fertilitatea, mortalitatea și migrația. Aceste proiecții nu sunt predicții deterministe, ci scenarii condiționate de ipoteze explicite, a căror utilitate constă în evidențierea consecințelor menținerii tendințelor actuale.' },
    { type:'p', text:'Metodologia EUROPOP folosește metoda componentelor cohortelor, care proiectează separat fiecare grupă de vârstă aplicând rate de fertilitate, supraviețuire și migrație, apoi le însumează. Spre deosebire de o simplă extrapolare, această metodă surprinde dinamica intrinsecă a structurii pe vârste, inclusiv efectul de inerție prin care declinul continuă chiar dacă fertilitatea s-ar redresa, întrucât cohortele fertile sunt deja numeric reduse. Acest moment de inerție demografică explică de ce stabilizarea populației, odată pierdută, necesită decenii pentru a fi recuperată.' },
    { type:'p', text:'Pe regiuni, proiecțiile EUROPOP nu sunt publicate la nivel NUTS 2 cu aceeași granularitate ca cele naționale, dar dezagregarea pe baza ratelor regionale observate sugerează o accentuare a polarizării: regiunile sudice și vestice ar pierde proporțional mai mult, în timp ce București-Ilfov și-ar menține mai bine populația. Această divergență proiectată întărește argumentul pentru o regionalizare capabilă să gestioneze diferențiat realități demografice tot mai eterogene în interiorul aceleiași țări.' },
    { type:'table', headers:['Scenariu Eurostat (național)','Orizont','Populație proiectată (mii)'], rows:[
      ['De bază','2030','18150'],
      ['Fertilitate ridicată','2030','18400'],
      ['Migrație negativă','2030','17800'],
      ['De bază','2050','16000'],
      ['Fertilitate ridicată','2050','16900'],
      ['Migrație negativă','2050','15100']
    ]}
  ]},

  { title: 'Scenarii regionale de populație pentru 2030 și 2050', blocks: [
    { type:'p', text:'Construirea de scenarii regionale pentru 2030 și 2050 pornește de la populația rezidentă din 2021 și aplică ipoteze diferențiate privind soldul natural și migrația internă și externă. Scenariul inerțial prelungește ritmurile observate în intervalul intercenzitar 2011-2021; scenariul de coeziune presupune politici eficace de stabilizare demografică și de reechilibrare teritorială; scenariul de polarizare extremă presupune o accelerare a concentrării în jurul polilor de creștere în detrimentul periferiilor. Comparația dintre aceste traiectorii oferă factorilor de decizie un evantai de viitoruri posibile, nu o singură cifră iluzoriu certă.' },
    { type:'p', text:'În scenariul inerțial, regiunile Sud-Vest Oltenia și Sud-Muntenia ar continua să piardă populație într-un ritm care le-ar reduce semnificativ masa demografică până în 2050, în timp ce București-Ilfov s-ar menține aproape constant sau chiar ar crește ușor. Aplicarea formulei de creștere geometrice, P_2050 egal cu P_2021 înmulțit cu (unu plus r) la puterea numărului de ani, cu rate regionale negative, produce contracții cumulate care pot depăși un sfert din populația inițială pentru regiunile cele mai afectate, un declin de o severitate care ar destabiliza serviciile publice locale.' },
    { type:'p', text:'Scenariul de coeziune, dimpotrivă, presupune că investițiile în conectivitate, descentralizarea funcțiilor administrative și crearea de poli secundari de creștere ar atenua migrația internă și ar reduce emigrația, stabilizând populația regională la niveluri superioare scenariului inerțial. Acest scenariu, deși mai optimist, nu este utopic: el corespunde tocmai obiectivelor pe care o regionalizare bine concepută le-ar putea atinge, transformând proiecția demografică dintr-o fatalitate într-o variabilă de politică publică.' },
    { type:'table', headers:['Regiune','Inerțial 2050 (mii)','Coeziune 2050 (mii)'], rows:[
      ['Nord-Est','2750','2980'],
      ['Sud-Muntenia','2350','2620'],
      ['Nord-Vest','2280','2420'],
      ['Sud-Est','1980','2180'],
      ['Centru','2020','2180'],
      ['București-Ilfov','2280','2350'],
      ['Sud-Vest Oltenia','1470','1680'],
      ['Vest','1520','1640']
    ]}
  ]},

  { title: 'Depopularea rurală și satele în declin', blocks: [
    { type:'p', text:'Depopularea rurală este una dintre cele mai vizibile și mai dramatice expresii ale declinului demografic românesc. Mii de sate, în special din regiunile de deal și de munte din Sud-Vest Oltenia, Vest și Centru, dar și din câmpia sudică, au pierdut majoritatea populației tinere, rămânând locuite preponderent de vârstnici. Fenomenul satelor cu populație îmbătrânită și al gospodăriilor abandonate s-a generalizat, cu zone întregi în care școlile s-au închis din lipsă de copii, iar serviciile de bază au devenit inaccesibile.' },
    { type:'p', text:'Mecanismul depopulării rurale combină emigrația externă, migrația internă spre orașe și soldul natural puternic negativ specific comunităților îmbătrânite. Tinerii pleacă pentru educație și locuri de muncă și nu se mai întorc, iar comunitatea rămasă, lipsită de regenerare, intră într-un declin terminal. Spre deosebire de orașe, unde migrația poate compensa parțial soldul natural, satele în declin nu atrag aproape niciun nou-venit, ceea ce face procesul ireversibil în absența unor politici de revitalizare rurală active.' },
    { type:'p', text:'Pentru regionalizare, depopularea rurală pune problema viabilității serviciilor publice în teritorii cu densitate tot mai scăzută. Menținerea unei școli, a unui dispensar sau a transportului public într-un sat de câteva sute de locuitori îmbătrâniți devine economic nesustenabilă, dar abandonarea lor accelerează exodul. Soluțiile de tip servicii mobile, comasare administrativă și investiții în conectivitate digitală, mai ușor de coordonat la nivel regional, oferă căi de atenuare a costurilor fără a abandona complet aceste comunități.' },
    { type:'chart', data:[ ['Sud-Vest Oltenia',38], ['Sud-Muntenia',34], ['Vest',31], ['Centru',28], ['Sud-Est',27], ['Nord-Est',24], ['Nord-Vest',22], ['București-Ilfov',9] ], title:'Pondere estimată a localităților rurale în declin demografic accentuat (%)', source:'INS — Recensământ 2021, analiză regională' }
  ]},

  { title: 'Concentrarea urbană și creșterea zonelor metropolitane', blocks: [
    { type:'p', text:'În oglinda depopulării rurale, concentrarea urbană se intensifică, dar într-un mod selectiv. Nu toate orașele cresc: marile orașe mici și mijlocii mono-industriale, lovite de dezindustrializarea de după 1990, au pierdut populație masiv, în timp ce câteva mari centre regionale și aglomerarea capitalei au atras migrația. Gradul de urbanizare al României, în jur de 54 la sută, rămâne sub media europeană, dar dinamica este de polarizare: o concentrare a populației urbane în câteva zone metropolitane în detrimentul rețelei de orașe mici.' },
    { type:'p', text:'Zonele metropolitane ale Bucureștiului, Clujului, Timișoarei, Iașului, Brașovului și Constanței s-au extins prin suburbanizare, populația deplasându-se din nucleul urban dens spre comunele periurbane, unde se construiesc cartiere rezidențiale noi. Acest fenomen, vizibil în creșterea spectaculoasă a unor comune din jurul marilor orașe, modifică geografia demografică și ridică probleme de guvernanță, întrucât limitele administrative nu mai corespund realității funcționale a zonei metropolitane integrate economic și social.' },
    { type:'p', text:'Decalajul dintre limitele administrative și zonele funcționale urbane este unul dintre argumentele cele mai puternice pentru o reformă teritorială. O regionalizare modernă ar trebui să recunoască zonele metropolitane drept unități de planificare reale, cu instrumente de coordonare a transportului, a locuirii și a serviciilor la scara întregii aglomerări, depășind fragmentarea actuală în care un oraș central și suburbiile sale aparțin unor unități administrative care nu cooperează sistematic.' },
    { type:'table', headers:['Zonă metropolitană','Regiune','Populație zonă funcțională (mii)'], rows:[
      ['București','București-Ilfov','2150'],
      ['Cluj-Napoca','Nord-Vest','530'],
      ['Timișoara','Vest','470'],
      ['Iași','Nord-Est','510'],
      ['Constanța','Sud-Est','430'],
      ['Brașov','Centru','400'],
      ['Craiova','Sud-Vest Oltenia','370'],
      ['Ploiești','Sud-Muntenia','350']
    ]}
  ]},

  { title: 'Impactul demografic asupra forței de muncă regionale', blocks: [
    { type:'p', text:'Declinul și îmbătrânirea populației se traduc direct într-o contracție a forței de muncă disponibile, una dintre principalele constrângeri ale creșterii economice viitoare a României. Populația în vârstă de muncă, de 15-64 de ani, scade atât prin ieșirea cohortelor numeroase la pensie, cât și prin emigrația tinerilor activi, în vreme ce cohortele care intră pe piața muncii sunt tot mai reduse din cauza natalității scăzute de după 1990. Pe regiuni, contracția este cea mai severă acolo unde emigrația și depopularea rurală se cumulează.' },
    { type:'p', text:'Deficitul de forță de muncă se manifestă diferențiat sectorial și regional. Polii de creștere precum București-Ilfov, Cluj și Timiș, deși atrag migranți interni, resimt deficite în sectoare precum construcțiile, ospitalitatea și sănătatea, recurgând tot mai mult la lucrători din afara Uniunii Europene. Regiunile periferice, dimpotrivă, suferă de un deficit generalizat care descurajează investițiile, întrucât investitorii caută piețe de muncă cu ofertă suficientă de personal calificat, alimentând astfel cercul vicios al subdezvoltării.' },
    { type:'p', text:'Răspunsul la contracția forței de muncă combină mai multe pârghii: creșterea ratei de ocupare prin integrarea categoriilor subutilizate, ridicarea productivității prin automatizare și digitalizare, atragerea de forță de muncă străină și valorificarea diasporei. O guvernanță regională ar putea calibra mixul acestor pârghii în funcție de profilul specific al fiecărei piețe regionale a muncii, ceva ce o politică națională uniformă, oarbă la diferențele teritoriale, nu reușește.' },
    { type:'table', headers:['Regiune','Forță de muncă 2021 (mii)','Proiecție 2035 (mii)'], rows:[
      ['Nord-Est','2090','1870'],
      ['Sud-Muntenia','1840','1610'],
      ['Nord-Vest','1625','1510'],
      ['Sud-Est','1530','1350'],
      ['Centru','1485','1360'],
      ['București-Ilfov','1500','1470'],
      ['Sud-Vest Oltenia','1165','990'],
      ['Vest','1100','1000']
    ]}
  ]},

  { title: 'Raportul dintre populația activă și cea inactivă', blocks: [
    { type:'p', text:'Raportul dintre populația activă și cea inactivă măsoară echilibrul fundamental al unei economii: câți oameni produc resurse față de câți le consumă fără a contribui direct la producție. Populația inactivă cuprinde copiii, vârstnicii pensionați, persoanele în educație și cele care nu caută de lucru. În România, acest raport s-a deteriorat constant sub efectul îmbătrânirii și al emigrației populației active, ridicând presiunea fiscală asupra celor care lucrează și contribuie la sistemele de protecție socială.' },
    { type:'p', text:'Indicatorul se exprimă fie ca rată de dependență economică, fie ca raport de susținere, definit ca populația activă supra populația inactivă. Un raport de susținere care scade sub doi semnalează că mai puțin de două persoane active întrețin o persoană inactivă, prag care, odată atins, pune sub tensiune severă echilibrul sistemului de pensii de tip redistributiv. Regiunile îmbătrânite din sud se apropie cel mai mult de acest prag critic, în timp ce polii urbani tineri îl mențin la distanță.' },
    { type:'p', text:'Ameliorarea raportului activi-inactivi nu poate veni dintr-o singură sursă. Creșterea vârstei de pensionare, ridicarea ratei de participare a femeilor și a tinerilor, reducerea muncii nedeclarate care subestimează populația activă efectivă, precum și politicile de stimulare a întoarcerii diasporei contribuie cumulativ. Diferențierea regională a acestor măsuri, posibilă într-un cadru de guvernanță descentralizat, permite adaptarea lor la structura specifică a fiecărei piețe regionale a muncii.' },
    { type:'table', headers:['Regiune','Rata de ocupare (%)','Raport de susținere (activi/inactivi)'], rows:[
      ['București-Ilfov','68,5','2,1'],
      ['Vest','64,2','1,9'],
      ['Nord-Vest','63,8','1,8'],
      ['Centru','62,9','1,8'],
      ['Nord-Est','61,5','1,7'],
      ['Sud-Est','60,8','1,6'],
      ['Sud-Muntenia','59,4','1,5'],
      ['Sud-Vest Oltenia','58,1','1,4']
    ]}
  ]},

  { title: 'Structura pe grupe de vârstă și piramida populației', blocks: [
    { type:'p', text:'Piramida vârstelor României a încetat de mult să mai semene cu o piramidă: baza, formată din copiii și tinerii, s-a îngustat drastic din cauza prăbușirii natalității, în timp ce vârful, format din vârstnici, s-a lărgit prin creșterea longevității. Forma rezultată, descrisă adesea ca o urnă sau un trunchi de con inversat, este caracteristică unei populații în îmbătrânire și declin. Cohortele numeroase născute în perioada pronatalistă comunistă, acum la vârsta maturității și apropiindu-se de pensionare, creează un val demografic care va apăsa sistemul de pensii în deceniile următoare.' },
    { type:'p', text:'Analiza pe trei mari grupe de vârstă, tinerii de 0-14 ani, populația activă de 15-64 de ani și vârstnicii de 65 de ani și peste, sintetizează această structură. Ponderea tinerilor a scăzut sub 16 la sută, cea a vârstnicilor a depășit 18 la sută, iar populația activă, deși încă majoritară, se erodează. Pe regiuni, Nord-Est păstrează cea mai tânără structură, iar regiunile sudice și vestice cea mai îmbătrânită, diferențe care impun politici sociale și de sănătate calibrate teritorial.' },
    { type:'p', text:'Forma piramidei are valoare predictivă puternică: cohortele de astăzi determină mecanic structura de mâine. Faptul că generațiile fertile actuale sunt deja reduse numeric înseamnă că, indiferent de eventuale redresări ale natalității, numărul de nașteri va rămâne scăzut în viitorul apropiat, fenomen de inerție demografică ce justifică planificarea pe termen lung a serviciilor publice în funcție de structura proiectată, nu de cea actuală.' },
    { type:'chart', data:[ ['0-14 ani',15.6], ['15-29 ani',16.2], ['30-44 ani',22.1], ['45-64 ani',27.9], ['65+ ani',18.2] ], title:'Structura populației rezidente pe grupe de vârstă (%, 2021)', source:'INS — Recensământul 2021' }
  ]},

  { title: 'Densitatea populației și disparitățile teritoriale', blocks: [
    { type:'p', text:'Densitatea populației, calculată ca raport între numărul de locuitori și suprafața exprimată în kilometri pătrați, variază enorm pe teritoriul României, de la valori foarte ridicate în aglomerarea București-Ilfov la valori extrem de scăzute în zonele montane și în satele depopulate. Media națională, în jur de optzeci de locuitori pe kilometru pătrat, ascunde aceste contraste profunde. Densitatea regională oferă o măsură a presiunii asupra teritoriului și a costului furnizării serviciilor publice, care crește pe unitatea de populație în zonele de densitate scăzută.' },
    { type:'p', text:'București-Ilfov se distanțează net, cu o densitate de ordinul sutelor de locuitori pe kilometru pătrat, urmată la mare distanță de Nord-Est și Nord-Vest. La polul opus, regiuni cu suprafețe mari și populație redusă, precum Vest și unele zone din Sud-Vest Oltenia, înregistrează densități scăzute. Aceste disparități au consecințe directe asupra economiei serviciilor: o școală, un spital sau o rețea de transport servesc mult mai puțini oameni pe aceeași suprafață în regiunile rarefiate, ridicând costul per capita.' },
    { type:'p', text:'Disparitățile de densitate constituie un argument pentru o alocare a resurselor care să țină cont nu doar de populație, ci și de costul diferențiat al serviciilor în funcție de densitate. O regiune întinsă și rarefiată are nevoie de finanțare suplimentară pentru a menține un nivel comparabil de servicii cu o regiune compactă și densă. Formulele de echilibrare fiscală regională, utilizate în statele descentralizate, încorporează tocmai astfel de corecții pentru densitate și pentru geografie.' },
    { type:'table', headers:['Regiune','Suprafață (mii km²)','Densitate (loc./km²)'], rows:[
      ['București-Ilfov','1,8','1261'],
      ['Nord-Est','36,9','87'],
      ['Nord-Vest','34,2','74'],
      ['Sud-Muntenia','34,5','85'],
      ['Centru','34,1','67'],
      ['Sud-Est','35,8','67'],
      ['Sud-Vest Oltenia','29,2','64'],
      ['Vest','32,0','54']
    ]}
  ]},

  { title: 'Fertilitatea și rata totală de fecunditate pe regiuni', blocks: [
    { type:'p', text:'Rata totală de fecunditate, definită ca numărul mediu de copii pe care i-ar naște o femeie pe parcursul vieții fertile dacă ratele de fecunditate pe vârste din anul observat ar rămâne constante, este indicatorul-cheie al capacității unei populații de a se reproduce. Pragul de înlocuire a generațiilor este de aproximativ 2,1 copii pe femeie. România se situează durabil sub acest prag, cu o rată totală de fecunditate în jur de 1,7-1,8 copii pe femeie, insuficientă pentru a stabiliza populația în absența imigrației.' },
    { type:'p', text:'Pe regiuni, fecunditatea urmează tiparul natalității: Nord-Est și unele zone rurale din Sud-Est păstrează valori relativ mai ridicate, în timp ce regiunile urbanizate și prospere precum București-Ilfov și Vest înregistrează valori mai scăzute, în pofida nivelului de trai superior. Acest paradox aparent, prin care prosperitatea coincide cu fecunditate mai redusă, se explică prin amânarea vârstei primei nașteri, prin costul ridicat al creșterii copiilor în mediul urban și prin prioritizarea carierei, fenomene comune întregii Europe dezvoltate.' },
    { type:'p', text:'Vârsta medie a mamei la prima naștere a crescut constant, depășind 27 de ani la nivel național și fiind și mai ridicată în mediul urban. Această amânare, dincolo de efectul ei asupra numărului total de copii, comprimă fereastra fertilă și crește riscul de a nu atinge numărul dorit de copii. Politicile de sprijin pentru familii, prin servicii de îngrijire accesibile, locuințe și flexibilitate a muncii, pot influența marginal fecunditatea, dar experiența europeană arată că redresarea peste pragul de înlocuire rămâne extrem de dificilă.' },
    { type:'chart', data:[ ['Nord-Est',1.85], ['Sud-Est',1.78], ['Centru',1.74], ['Sud-Muntenia',1.72], ['Nord-Vest',1.70], ['Sud-Vest Oltenia',1.68], ['Vest',1.65], ['București-Ilfov',1.58] ], title:'Rata totală de fecunditate pe regiuni (copii/femeie, estimare)', source:'INS — Statistica vitală; prag înlocuire 2,1' }
  ]},

  { title: 'Migrația de revenire și potențialul diasporei', blocks: [
    { type:'p', text:'Migrația de revenire, fenomenul prin care emigranți români se întorc în țară după ani de muncă în străinătate, a câștigat amploare în ultimul deceniu, alimentată de apropierea nivelului de trai, de criza din unele țări de destinație și de dorul de casă. Deși fluxurile de revenire rămân inferioare celor de plecare, ele aduc în țară capital financiar acumulat, competențe profesionale și o cultură a muncii și a antreprenoriatului dobândită în economii avansate, resurse prețioase pentru regiunile de origine.' },
    { type:'p', text:'Revenirea nu este însă uniform distribuită teritorial. Cei care se întorc preferă adesea zonele dinamice, unde își pot valorifica economiile prin investiții imobiliare sau afaceri, ceea ce înseamnă că polii de creștere captează o parte disproporționată a revenirilor, în timp ce satele de origine, lipsite de oportunități, rămân ocolite. Pentru a transforma diaspora într-o resursă de revitalizare a regiunilor periferice, sunt necesare politici active de atragere a investițiilor de revenire tocmai în aceste teritorii dezavantajate.' },
    { type:'p', text:'Potențialul diasporei depășește revenirea fizică: chiar rămânând în străinătate, diaspora poate contribui prin remitențe investiționale, prin transfer de cunoaștere, prin rețele de afaceri transnaționale și prin diplomație economică. O strategie regională inteligentă ar cartografia competențele diasporei originare din fiecare regiune și ar crea canale instituționale de valorificare a lor, transformând o pierdere demografică într-un activ economic și de inovare conectat la economia globală.' },
    { type:'table', headers:['Tip de contribuție a diasporei','Mecanism','Potențial anual estimat (mil. euro)'], rows:[
      ['Remitențe consum','transferuri către familii','3500'],
      ['Remitențe investiționale','imobiliare și afaceri','1200'],
      ['Investiții de revenire','capital adus la întoarcere','800'],
      ['Transfer de competențe','know-how și inovare','450'],
      ['Rețele de afaceri','contracte transnaționale','600'],
      ['Diplomație economică','promovare investiții','300']
    ]}
  ]},

  { title: 'Politici demografice și instrumente de stabilizare a populației', blocks: [
    { type:'p', text:'Politicile demografice urmăresc să influențeze cele trei componente ale dinamicii populației: fertilitatea, mortalitatea și migrația. Pe latura fertilității, instrumentele clasice includ alocații pentru copii, concedii parentale generoase, servicii de îngrijire accesibile și politici de conciliere a vieții profesionale cu cea de familie. Experiența europeană, în special cea franceză și nordică, arată că un mix coerent și susținut de astfel de măsuri poate ridica fecunditatea spre pragul de înlocuire, deși cu efecte lente și costuri bugetare ridicate.' },
    { type:'p', text:'Pe latura migrației, politicile vizează atât reducerea emigrației, prin crearea de oportunități economice atractive în țară, cât și gestionarea imigrației, prin atragerea controlată de forță de muncă străină în sectoarele deficitare. România, multă vreme exclusiv țară de emigrație, devine treptat și o destinație pentru lucrători din afara Uniunii Europene, ceea ce impune dezvoltarea unui cadru de politică migratorie coerent, până acum subdezvoltat în comparație cu amploarea fenomenului.' },
    { type:'p', text:'Eficacitatea politicilor demografice depinde de adaptarea lor la contextul regional. O regiune cu fecunditate prăbușită beneficiază de sprijin pentru familii tinere; o regiune îmbătrânită cu deficit de muncă beneficiază de atragerea de migranți; o regiune în depopulare rurală beneficiază de revitalizare locală. Descentralizarea unor competențe în materie de politici demografice și sociale, posibilă într-un cadru regional, ar permite o astfel de calibrare fină, imposibilă în abordarea uniformă centralizată actuală.' },
    { type:'table', headers:['Instrument de politică','Componentă vizată','Orizont impact estimat (ani)'], rows:[
      ['Alocații și sprijin familial','fertilitate','10'],
      ['Servicii îngrijire copii','fertilitate','7'],
      ['Locuințe accesibile tineri','fertilitate / migrație','8'],
      ['Atragere forță de muncă străină','migrație','3'],
      ['Programe revenire diaspora','migrație','5'],
      ['Revitalizare rurală','migrație internă','12']
    ]}
  ]},

  { title: 'Demografia ca argument pentru regionalizare', blocks: [
    { type:'p', text:'Realitatea demografică analizată constituie unul dintre cele mai solide argumente în favoarea regionalizării. Eterogenitatea profundă a profilurilor demografice regionale, de la tinerețea relativă a Nord-Estului la îmbătrânirea accentuată a Olteniei, de la creșterea Bucureștiului la depopularea periferiilor, face ca o politică națională uniformă să fie inevitabil neadaptată majorității teritoriilor. O regiune care îmbătrânește are nevoi radical diferite de una care se întinerește prin migrație, iar tratarea lor identică risipește resurse și ratează ținte.' },
    { type:'p', text:'Regionalizarea ar permite calibrarea politicilor demografice, sociale, de sănătate și de ocupare pe profilul specific al fiecărui teritoriu, principiu cunoscut sub numele de subsidiaritate: deciziile se iau la nivelul cel mai apropiat de cetățean care le poate gestiona eficient. O autoritate regională, mai aproape de realitatea demografică locală decât ministerele centrale, ar putea anticipa și gestiona mai bine consecințele declinului și ale îmbătrânirii, de la dimensionarea școlilor și spitalelor la organizarea serviciilor de îngrijire.' },
    { type:'p', text:'Totodată, demografia impune și o avertizare: orice schemă de regionalizare trebuie să încorporeze mecanisme dinamice de echilibrare fiscală inter-regională, pentru a evita ca regiunile în depopulare să intre în colaps al serviciilor publice în lipsa unei baze contributive suficiente. Solidaritatea teritorială, departe de a contrazice regionalizarea, este condiția care o face viabilă, asigurând că autonomia regională nu se transformă în abandon al teritoriilor dezavantajate, ci în gestiune diferențiată și solidară a unei realități demografice eterogene.' },
    { type:'table', headers:['Provocare demografică','Răspuns regional posibil','Prioritate (1 mare)'], rows:[
      ['Îmbătrânire accentuată sud','servicii sănătate și îngrijire','1'],
      ['Depopulare rurală','revitalizare și servicii mobile','1'],
      ['Migrație internă spre poli','poli secundari de creștere','2'],
      ['Emigrație externă','programe revenire diaspora','2'],
      ['Deficit forță de muncă','politică migratorie regională','2'],
      ['Echilibru fiscal','perechiajare inter-regională','1']
    ]}
  ]},

  { title: 'Disparități urban-rural în structura demografică', blocks: [
    { type:'p', text:'Distincția dintre mediul urban și cel rural rămâne una dintre liniile de fractură demografică cele mai relevante ale României, cu un grad de urbanizare sub media europeană și o populație rurală încă numeroasă. Structura pe vârste diferă semnificativ: mediul rural este, în ansamblu, mai îmbătrânit decât cel urban, ca urmare a plecării tinerilor și a soldului natural negativ accentuat în satele depopulate. Totuși, în zonele periurbane ale marilor orașe, ruralul se întinerește paradoxal prin suburbanizarea familiilor tinere.' },
    { type:'p', text:'Natalitatea și fecunditatea sunt tradițional mai ridicate în mediul rural decât în cel urban, dar diferența s-a redus pe măsură ce comportamentele reproductive s-au omogenizat. Mortalitatea, dimpotrivă, este mai ridicată în rural din cauza structurii de vârstă îmbătrânite și a accesului mai dificil la servicii medicale de calitate. Speranța de viață rurală rămâne inferioară celei urbane, reflectând inegalitățile de acces la sănătate, educație și infrastructură de bază între cele două medii.' },
    { type:'p', text:'Aceste disparități urban-rural se suprapun peste cele regionale, creând un tablou complex în care, de exemplu, ruralul din Sud-Vest Oltenia cumulează cele mai severe dezavantaje. Pentru regionalizare, gestionarea relației urban-rural în interiorul fiecărei regiuni, prin politici de coeziune teritorială care leagă orașele de hinterlandul lor rural, devine o competență esențială, mai eficient exercitată la scară regională decât central, întrucât fiecare regiune are un echilibru urban-rural propriu.' },
    { type:'table', headers:['Indicator','Mediul urban','Pondere/valoare rural'], rows:[
      ['Pondere din populație (%)','54','46'],
      ['Pondere vârstnici 65+ (%)','16','21'],
      ['Rata natalității (‰)','8','10'],
      ['Rata mortalității (‰)','11','16'],
      ['Speranță de viață (ani)','76','73'],
      ['Vârstă mediană (ani)','41','44']
    ]}
  ]},

  { title: 'Mortalitatea evitabilă și sănătatea populației regionale', blocks: [
    { type:'p', text:'Mortalitatea evitabilă, concept dezvoltat de Organizația pentru Cooperare și Dezvoltare Economică și de Eurostat, cuprinde decesele care ar fi putut fi prevenite fie prin prevenție primară, fie prin tratament medical adecvat și la timp. România înregistrează una dintre cele mai ridicate rate de mortalitate evitabilă din Uniunea Europeană, semnal al unor deficiențe atât în comportamentele de sănătate ale populației, cât și în performanța sistemului medical, cu variații regionale considerabile.' },
    { type:'p', text:'Principalele cauze ale mortalității evitabile în România sunt bolile cardiovasculare, cancerele depistate tardiv, bolile hepatice legate de consumul de alcool și accidentele. Distribuția lor regională reflectă atât factori comportamentali, precum prevalența fumatului și a consumului de alcool, cât și factori de sistem, precum densitatea medicilor, accesul la diagnosticare precoce și calitatea infrastructurii spitalicești. Regiunile cu speranță de viață scăzută cumulează, de regulă, și mortalitate evitabilă ridicată.' },
    { type:'p', text:'Reducerea mortalității evitabile reprezintă una dintre cele mai eficiente căi de ameliorare a indicatorilor demografici regionali, întrucât vizează decese premature ale populației active, cu impact direct asupra forței de muncă și a soldului natural. Programe de screening, de prevenție și de îmbunătățire a accesului la servicii medicale, calibrate pe profilul de morbiditate al fiecărei regiuni, pot produce câștiguri semnificative de ani de viață, un obiectiv pe care guvernanța regională a sănătății îl poate urmări mai precis.' },
    { type:'chart', data:[ ['Sud-Vest Oltenia',330], ['Sud-Muntenia',315], ['Sud-Est',300], ['Vest',290], ['Nord-Est',285], ['Nord-Vest',270], ['Centru',265], ['București-Ilfov',240] ], title:'Rata mortalității evitabile pe regiuni (la 100.000 locuitori, estimare)', source:'Eurostat / OCDE — mortalitate evitabilă' }
  ]},

  { title: 'Capitalul uman, educația și capacitatea regională de adaptare', blocks: [
    { type:'p', text:'Dincolo de cantitatea populației, calitatea capitalului uman, măsurată prin nivelul de educație și competențe, determină capacitatea unei regiuni de a se adapta la schimbarea demografică și economică. Nivelul de educație al populației adulte variază considerabil pe regiuni: București-Ilfov, Cluj și marile centre universitare concentrează o pondere ridicată de absolvenți de învățământ superior, în timp ce regiunile rurale și periferice rămân în urmă, cu o pondere mai mare a populației cu studii primare sau gimnaziale.' },
    { type:'p', text:'Această distribuție inegală a capitalului uman amplifică polarizarea: regiunile cu populație educată atrag investiții cu valoare adăugată ridicată și retin tinerii calificați, în timp ce regiunile cu deficit educațional pierd tocmai absolvenții cei mai promițători, care migrează spre poli sau spre străinătate. Cercul vicios al sub-educației și sub-dezvoltării se autoîntreține în absența unor intervenții decisive în educație, formare profesională și conectivitate.' },
    { type:'p', text:'Investiția în capitalul uman regional, prin educație de calitate, formare continuă și reconversie profesională, este pârghia cea mai puternică de care dispune o regiune pentru a-și ameliora perspectivele într-un context de declin demografic. Mai puțini oameni mai bine pregătiți pot susține o economie mai performantă decât mai mulți oameni slab calificați. O guvernanță regională cu competențe în educație și formare ar putea adapta oferta educațională la nevoile economiei locale, reducând decalajul de competențe.' },
    { type:'table', headers:['Regiune','Pondere studii superioare (%)','Părăsire timpurie școală (%)'], rows:[
      ['București-Ilfov','32','7'],
      ['Nord-Vest','21','12'],
      ['Vest','20','13'],
      ['Centru','18','15'],
      ['Nord-Est','15','17'],
      ['Sud-Est','16','19'],
      ['Sud-Muntenia','14','18'],
      ['Sud-Vest Oltenia','15','16']
    ]}
  ]},

  { title: 'Inerția demografică și viitorul pe termen lung al regiunilor', blocks: [
    { type:'p', text:'Inerția demografică este proprietatea prin care structura actuală pe vârste a unei populații îi determină în mare măsură evoluția viitoare, independent de schimbările imediate ale fertilității sau ale migrației. Întrucât cohortele fertile de mâine sunt copiii născuți astăzi, iar aceștia sunt deja puțini din cauza natalității scăzute, numărul de nașteri va rămâne redus timp de decenii, chiar dacă fiecare femeie ar decide să aibă mai mulți copii. Acest moment de inerție face ca declinul, odată instalat, să fie greu reversibil.' },
    { type:'p', text:'Inerția acționează și asupra îmbătrânirii: cohortele numeroase născute în perioada pronatalistă comunistă vor traversa în următoarele două decenii vârstele înaintate, umflând mecanic populația vârstnică și rata de dependență, indiferent de orice politică actuală. Acest val previzibil de îmbătrânire trebuie anticipat prin dimensionarea din timp a serviciilor de sănătate și de îngrijire de lungă durată, pentru a evita o criză a sistemelor de protecție socială atunci când valul atinge vârful.' },
    { type:'p', text:'Recunoașterea inerției demografice are o consecință strategică profundă: politicile demografice trebuie concepute pe termen foarte lung, cu rezultate care apar peste decenii, nu peste cicluri electorale. Aceasta cere un cadru instituțional capabil de planificare stabilă și de angajamente durabile, dincolo de alternanța politică. O guvernanță regională cu mandate clare și instrumente proprii ar putea oferi tocmai această stabilitate de planificare, ancorând politicile demografice în realitatea teritorială pe orizonturi care depășesc termenul scurt al politicii naționale.' },
    { type:'table', headers:['Fenomen de inerție','Orizont de manifestare','Vârf de impact (an)'], rows:[
      ['Reducerea nașterilor','permanent','2035'],
      ['Val îmbătrânire cohorte comuniste','15-25 ani','2045'],
      ['Creștere rată dependență','continuu','2050'],
      ['Contracție forță de muncă','10-20 ani','2040'],
      ['Presiune sistem pensii','15-30 ani','2048'],
      ['Cerere îngrijire lungă durată','15-25 ani','2046']
    ]}
  ]},

  { title: 'Sinteza profilurilor demografice regionale și tipologia teritorială', blocks: [
    { type:'p', text:'Agregarea indicatorilor demografici analizați permite construirea unei tipologii a regiunilor, instrument util pentru calibrarea politicilor. Se pot distinge mai multe profiluri: regiuni tinere relativ și cu natalitate mai bună, precum Nord-Est; poli de atracție cu structură întinerită prin migrație, precum București-Ilfov; regiuni îmbătrânite în declin accentuat, precum Sud-Vest Oltenia și Sud-Muntenia; și regiuni intermediare, precum Centru, Nord-Vest și Vest, cu dinamici mixte. Această tipologie sintetizează eterogenitatea care fundamentează nevoia de gestiune diferențiată.' },
    { type:'p', text:'Fiecare tip teritorial reclamă un mix specific de politici. Regiunile tinere beneficiază de investiții în educație și în crearea de locuri de muncă pentru a reține tinerii; polii de atracție au nevoie de infrastructură și locuințe pentru a gestiona creșterea; regiunile îmbătrânite necesită servicii de sănătate și de îngrijire, precum și politici de atragere a populației active; regiunile intermediare cer combinații echilibrate. Uniformitatea politicii naționale actuale nu poate răspunde simultan acestor nevoi divergente.' },
    { type:'p', text:'Tipologia demografică regională converge, în final, cu argumentul central al întregului studiu: România este, demografic, o țară a contrastelor teritoriale profunde, iar gestionarea lor eficientă cere o guvernanță capabilă de diferențiere, de subsidiaritate și de solidaritate inter-regională simultan. Demografia nu este un simplu fundal al regionalizării, ci unul dintre motoarele ei de necesitate, întrucât viitoarea hartă a populației României va fi decisă tocmai de capacitatea sau incapacitatea de a adapta politicile la realitățile demografice eterogene ale fiecărui teritoriu.' },
    { type:'table', headers:['Tip de regiune','Regiuni reprezentative','Indice sintetic vitalitate (0-100)'], rows:[
      ['Pol de atracție întinerit','București-Ilfov','78'],
      ['Tânără cu natalitate bună','Nord-Est','64'],
      ['Intermediară dinamică','Nord-Vest, Centru','58'],
      ['Intermediară fragilă','Vest, Sud-Est','49'],
      ['Îmbătrânită în declin','Sud-Muntenia','41'],
      ['Îmbătrânită accentuat','Sud-Vest Oltenia','36']
    ]}
  ]},

  { title: 'Distribuția pe genuri și raportul de masculinitate regional', blocks: [
    { type:'p', text:'Distribuția pe genuri a populației, măsurată prin raportul de masculinitate definit ca numărul de bărbați la o sută de femei, evoluează în timp sub efectul combinat al supramortalității masculine și al migrației diferențiate pe sexe. La naștere, raportul este ușor favorabil băieților, în jur de o sută cinci băieți la o sută de fete, dar se inversează treptat odată cu vârsta, întrucât bărbații mor în medie mai devreme. La vârstele înaintate, femeile devin net majoritare, fenomen accentuat în România de diferența mare de speranță de viață între sexe.' },
    { type:'p', text:'Pe regiuni, raportul de masculinitate variază în funcție de structura economică și de tiparele de migrație. Regiunile cu activități tradițional masculine, precum cele miniere sau industriale, pot reține o pondere mai ridicată de bărbați, în timp ce regiunile cu emigrație predominant masculină, plecată la muncă în construcții și agricultură în străinătate, înregistrează un deficit relativ de bărbați adulți. Aceste diferențe au consecințe asupra structurii gospodăriilor, a nupțialității și a comportamentelor reproductive locale.' },
    { type:'p', text:'Dezechilibrele de gen pe grupe de vârstă au implicații sociale concrete: o populație vârstnică feminizată generează nevoi specifice de îngrijire și de asistență socială, întrucât femeile în vârstă trăiesc adesea singure după decesul partenerului. Politicile de sănătate și sociale regionale ar trebui să țină cont de această feminizare a bătrâneții, dimensionând serviciile de îngrijire și de sprijin pentru persoanele vârstnice singure, majoritar femei, în mod adaptat realității demografice a fiecărui teritoriu.' },
    { type:'table', headers:['Regiune','Pondere femei (%)','Raport masculinitate (bărbați/100 femei)'], rows:[
      ['Nord-Est','50,9','96'],
      ['București-Ilfov','52,1','92'],
      ['Centru','51,0','96'],
      ['Nord-Vest','51,3','95'],
      ['Sud-Est','50,8','97'],
      ['Vest','51,2','95'],
      ['Sud-Muntenia','51,1','96'],
      ['Sud-Vest Oltenia','51,0','96']
    ]}
  ]},

  { title: 'Gospodăriile, mărimea medie și transformarea structurii familiale', blocks: [
    { type:'p', text:'Numărul și mărimea gospodăriilor reflectă, dincolo de simpla numărare a indivizilor, transformarea profundă a structurilor familiale. Recensământul 2021 a consemnat o reducere a mărimii medii a gospodăriei, sub trei persoane la nivel național, ca urmare a scăderii natalității, a creșterii numărului de gospodării formate dintr-o singură persoană și a fragmentării familiilor extinse tradiționale. Numărul total de gospodării a scăzut mai lent decât populația, întrucât gospodăriile devin mai mici.' },
    { type:'p', text:'Creșterea ponderii gospodăriilor unipersonale, formate adesea din vârstnici rămași singuri sau din tineri care își amână întemeierea familiei, este una dintre transformările sociale majore. În mediul urban, gospodăriile unipersonale tinere reflectă noi stiluri de viață și amânarea căsătoriei; în mediul rural, ele reflectă mai degrabă văduvia vârstnicilor. Această dublă natură a fenomenului impune servicii diferențiate, de la locuințe accesibile pentru tineri urbani la asistență la domiciliu pentru vârstnici rurali.' },
    { type:'p', text:'Mărimea medie a gospodăriei rămâne mai ridicată în regiunile mai tinere și mai rurale, precum Nord-Est, și mai scăzută în regiunile urbanizate și îmbătrânite. Pentru planificarea locuirii și a serviciilor, evoluția structurii gospodăriilor este la fel de relevantă ca cea a populației: cererea de locuințe depinde de numărul de gospodării, nu doar de numărul de locuitori, iar fragmentarea gospodăriilor poate menține o cerere de locuințe susținută chiar într-un context de declin demografic, aspect pe care politicile regionale de locuire trebuie să îl anticipeze.' },
    { type:'chart', data:[ ['Nord-Est',2.9], ['Sud-Muntenia',2.7], ['Sud-Vest Oltenia',2.6], ['Sud-Est',2.6], ['Centru',2.5], ['Nord-Vest',2.5], ['Vest',2.4], ['București-Ilfov',2.3] ], title:'Mărimea medie a gospodăriei pe regiuni (persoane, 2021)', source:'INS — Recensământul 2021, gospodării' }
  ]}

];
