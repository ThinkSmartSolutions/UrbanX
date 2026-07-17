# MEMORIU TEHNIC DE REZISTENȚĂ — STAȚIE DE DISTRIBUȚIE GPL AUTO (SKID GPL)

**Faza: DTAC + PTh** · Structură de rezistență · Verificare tehnică A1/A2/Af/Ci

> **Notă preliminară asupra scopului documentului.** Prezentul memoriu tratează exclusiv **structura de rezistență a construcțiilor și instalațiilor de susținere** ale unei stații de distribuție carburanți tip GPL auto (SKID GPL): fundațiile, radierul sau cuva de îngropare a rezervorului, sistemul de ancorare a recipientului, zidul de foc, copertina de protecție a zonei de alimentare și cabina operatorului. Recipientul sub presiune propriu-zis (rezervorul de GPL, mantaua, racordurile, armăturile de siguranță, supapele) **nu face obiectul verificării de rezistență a construcției** în sensul Legii 10/1995 — el este un echipament sub presiune reglementat separat, proiectat, fabricat, testat și certificat de producător sub autoritatea ISCIR (Inspecția de Stat pentru Controlul Cazanelor, Recipientelor sub Presiune și Instalațiilor de Ridicat), conform prescripțiilor tehnice PT C4 (recipiente sub presiune) și PT C7 (cerne/instalații GPL). Memoriul de față dimensionează și verifică **doar interfața structurală** dintre acest echipament certificat și terenul de fundare: radierul sau cuva care îl susține, buloanele/chingile care îl ancorează împotriva răsturnării, alunecării sau flotației, precum și construcțiile conexe (zid de foc, copertină, cabină) care asigură exploatarea în siguranță a stației. Toate calculele numerice din text sunt calcule de predimensionare la faza DTAC, corecte ca metodă și ca rezultat pentru datele de amplasament adoptate; ele se confirmă și se detaliază (planșe de armare, planșe de ancoraj, liste de bare, caiete de sarcini) la fazele PTh și Detalii de Execuție, pe baza studiului geotehnic definitiv și a datelor de amplasament confirmate din hărțile naționale de hazard (P100-1, CR 1-1-3, CR 1-1-4).

---

## 1. Date generale, sistem de obiecte, clasa de importanță și risc tehnologic

### 1.1. Obiectul memoriului și natura investiției

Investiția constă în amplasarea unei stații de distribuție GPL auto de capacitate mică-medie (rezervor unic de 4,85 mc), destinată alimentării autovehiculelor cu gaz petrolier lichefiat. Spre deosebire de o construcție civilă sau industrială obișnuită, o astfel de stație reunește **șase obiecte de construcție de natură foarte diferită**, fiecare guvernat de o temă de calcul structural proprie, motiv pentru care memoriul nu poate fi tratat unitar printr-o schemă structurală comună (cum ar fi cazul unei hale industriale, de exemplu), ci trebuie parcurs obiect cu obiect, fenomen cu fenomen. Prezentul document tratează, așa cum impune buna practică de proiectare a instalațiilor GPL, **ambele variante constructive posibile ale rezervorului** — varianta A, cu rezervorul montat suprateran pe șei de sprijin, și varianta B, cu rezervorul îngropat integral sub cota terenului — variante care, deși folosesc identic același recipient certificat ISCIR, conduc la teme de calcul structural radical diferite: la varianta suprateran domină stabilitatea la răsturnare și smulgerea ancorajelor sub acțiune seismică și eventual sub vânt; la varianta subterană domină un fenomen aproape absent din proiectarea curentă a construcțiilor — **flotația (uplift-ul) rezervorului gol sub acțiunea apei subterane**. Alegerea între cele două variante este, de regulă, o decizie de beneficiar/proiectant de instalații (disponibilitate teren, distanțe de siguranță impuse de normativul de instalații NTPEE, cost), dar din punct de vedere structural cele două soluții nu sunt interschimbabile fără recalculare completă — de aceea memoriul le tratează integral pe amândouă, nu ca variantă principală și alternativă schematică.

### 1.2. Inventarul obiectelor de construcție

Tabelul următor sintetizează cele șase obiecte de construcție ale stației, cu tipul lor structural și modul de fundare, așa cum rezultă din proiectul de arhitectură și din proiectul de instalații tehnologice GPL:

| Obiect | Tip structural | Fundare |
|---|---|---|
| C1 rezervor GPL suprateran 4,85 mc pe 2 șei (var. A) | recipient sub presiune + suporți (șei) | radier general b.a. |
| C1' rezervor GPL subteran (var. B) | recipient îngropat | cuvă/dală b.a. anti-flotație |
| C2 pompă + dispenser | cadru metalic pe postament | fundație izolată |
| C3 cabină operator 3×4 m | cadre b.a./container | radier b.a. |
| C4 copertină 6×5 m, H 4,20 m | stâlpi + grinzi metalice | fundații izolate |
| C5 zid de foc L = 8, H = 3 m | perete b.a. autoportant (consolă) | fundație continuă |

Observăm deja, din simpla lectură a tabelului, eterogenitatea temei: avem un recipient sub presiune (C1/C1'), o structură metalică ușoară deschisă expusă frontal vântului (C4), un perete de beton izolat lucrând în consolă (C5) și o construcție civilă obișnuită de mici dimensiuni (C3). Fiecare va fi tratat separat, în capitolele 2 și 4-7, cu tema sa de calcul proprie.

Amplasarea relativă a acestor șase obiecte unele față de altele, și față de limitele de proprietate/vecinătăți, nu este o decizie liberă de arhitectură, ci este guvernată de **distanțele minime de siguranță** impuse de normativul NTPEE-2018 și de prescripțiile ISCIR PT C7 pentru instalații GPL — distanțe stabilite în funcție de capacitatea rezervorului, de tipul de amplasare (suprateran/subteran) și de natura vecinătăților (clădiri cu funcțiuni de locuire, căi de circulație publică, alte instalații tehnologice). Zidul de foc (C5) este el însuși, în multe configurații de amplasament, o soluție constructivă adoptată tocmai pentru a permite **reducerea** unora dintre aceste distanțe de siguranță față de vecinătăți, prin ecranarea radiației termice — motiv suplimentar, dincolo de cel structural detaliat în capitolul 5, pentru care poziția, lungimea și înălțimea zidului de foc trebuie stabilite în strânsă corelare cu proiectul de instalații și cu scenariul de securitate la incendiu al ansamblului, nu tratate ca o alegere structurală independentă. Memoriul de față preia din proiectul de arhitectură/instalații poziția finală a fiecărui obiect (rezultată din aplicarea acestor distanțe minime), fără a recalcula el însuși distanțele de siguranță — o verificare care rămâne, la rândul ei, în sarcina proiectantului de instalații tehnologice GPL, distinctă de proiectantul de rezistență.

### 1.3. Date de amplasament — teren, seism, vânt, zăpadă

Datele de bază ale amplasamentului, preluate din studiul geotehnic și din hărțile naționale de hazard, sunt următoarele; ele guvernează toate verificările din capitolele următoare și rămân valabile atât pentru varianta suprateran, cât și pentru cea subterană a rezervorului (diferă doar modul în care aceste date intervin în calcul):

- **Accelerația terenului pentru proiectare** ag = 0,25 g — valoare de zonare seismică conform hărții din P100-1/2013, anexa A;
- **Perioada de control (colț) a spectrului** Tc = 0,7 s — plasează amplasamentul într-o zonă cu perioadă de colț medie, tipică zonelor de câmpie și podiș din estul și sudul țării;
- **Presiunea de referință a vântului** qb = 0,60 kPa — corespunzătoare hărții CR 1-1-4/2012 pentru zona de amplasament, echivalentă unei viteze de referință de aproximativ 26÷27 m/s;
- **Încărcarea caracteristică din zăpadă la sol** s0,k = 2,0 kN/mp — conform hărții CR 1-1-3/2012;
- **Categoria terenului de fundare** — categoria III (teren de fundare cu capacitate portantă medie);
- **Presiunea convențională** pconv = 200 kPa — valoare de referință pentru dimensionarea preliminară a fundațiilor pe acest teren;
- **Adâncimea de îngheț** −0,90 m, adoptată constructiv la −1,10 m pentru radierele suprateran;
- **Nivelul hidrostatic maxim** NHmax = −1,50 m față de cota terenului natural — parametru **critic** pentru varianta subterană a rezervorului, întrucât determină direct forța de subpresiune (flotație) care acționează asupra cuvei îngropate; pentru varianta suprateran acest parametru nu intervine decât la dimensionarea hidroizolației radierului;
- **Categoria geotehnică** 2, conform NP 074/2014 — categorie curentă pentru construcții de importanță normală/ridicată pe terenuri fără dificultăți geotehnice deosebite, care impune totuși un studiu geotehnic complet cu foraje, nu doar o evaluare vizuală de teren.

Este important de subliniat, pentru înțelegerea corectă a capitolelor 2 și 4, că **nivelul apei subterane** joacă un rol complet diferit față de o construcție civilă obișnuită: la o clădire cu subsol pe teren fără apă freatică ridicată, prezența apei se tratează de regulă doar ca o problemă de hidroizolație. La un rezervor GPL îngropat, prezența apei subterane la o cotă superioară bazei rezervorului transformă o simplă problemă de etanșare într-o **problemă de stabilitate globală a construcției** — rezervorul, fiind un corp gol (sau cu densitate medie mult sub cea a apei atunci când este golit pentru revizie sau înainte de umplere), poate literalmente pluti în pământul saturat din jurul lui dacă nu este suficient lestat sau ancorat. Acest fenomen este dezvoltat pe larg în §2.3.

### 1.4. Clasa de importanță și evaluarea riscului tehnologic

Clasificarea în clase de importanță și expunere seismică (P100-1/2013, tabelul 4.2) nu se face aici doar pe criteriul numărului de utilizatori sau al valorii investiției, ca la o construcție civilă, ci ține cont explicit de **natura periculoasă a conținutului**. GPL-ul (gaz petrolier lichefiat, amestec propan-butan) este un combustibil inflamabil stocat sub presiune moderată în stare lichidă; o eventuală pierdere de etanșeitate urmată de aprindere poate evolua, în scenariul cel mai defavorabil, către un **BLEVE** (Boiling Liquid Expanding Vapour Explosion — explozia unui lichid în fierbere aflat sub presiune, cu proiectare de fragmente și undă de șoc) sau către un **UVCE** (Unconfined Vapour Cloud Explosion — explozia unui nor de vapori neconfinat, în cazul unei scăpări de gaz fără aprindere imediată). Aceste scenarii, deși statistic rare la instalații corect proiectate și întreținute, au un potențial de consecințe (victime, pagube, efect de domino asupra vecinătăților) incomparabil mai mare decât o defecțiune structurală obișnuită la o clădire similară ca dimensiune.

Din acest motiv, clasificarea adoptată este următoarea:

- **Rezervorul GPL și structurile lui de susținere/ancorare (radier, buloane, cuvă)** — **clasa de importanță II, γI = 1,2** — coeficient de importanță majorat cu 20% față de o construcție obișnuită, exact pentru a reduce probabilitatea de avarie structurală sub acțiune seismică la un echipament al cărui colaps ar avea consecințe disproporționate;
- **Zidul de foc** — clasa II, aceeași motivație (element de siguranță care trebuie să rămână funcțional și după seismul de proiectare, nu doar să nu se prăbușească);
- **Copertina și cabina operatorului** — clasa III (γI = 1,0), fiind construcții auxiliare fără conținut periculos propriu, a căror avarie nu ar genera un scenariu de tip BLEVE/UVCE, ci cel mult pagube materiale locale.

Cantitatea totală de GPL stocată în instalație rezultă din geometria rezervorului (a se vedea §2.1): aproximativ **2,1 tone** de GPL la gradul de umplere normat de 85%. Această cantitate se situează **sub pragul de 50 de tone** stabilit prin Directiva Seveso III (2012/18/UE) și legislația națională de transpunere, ceea ce înseamnă că stația **nu intră sub incidența regimului de amplasamente Seveso** (nu necesită raport de securitate, studiu de securitate sau plan de urgență externă în sensul acelei legislații). Această precizare este importantă pentru evitarea unei clasificări administrative eronate a proiectului, dar nu schimbă cu nimic abordarea structurală: chiar sub pragul Seveso, riscul tehnologic intrinsec (inflamabilitate, presiune, posibilitate de BLEVE) rămâne suficient de ridicat pentru a justifica clasa de importanță II adoptată mai sus și pentru a impune distanțele de siguranță, zidul de foc și toate măsurile constructive tratate în acest memoriu.

### 1.5. Cadrul normativ

Proiectarea structurii de rezistență se realizează în conformitate cu următorul ansamblu de reglementări, fiecare acoperind o componentă distinctă a calculului:

- **P100-1/2013** — Cod de proiectare seismică, partea I: prevederi de proiectare pentru clădiri — sursa coeficienților de importanță γI, a spectrului de răspuns și a metodologiei de calcul al forței seismice pentru toate obiectele stației;
- **CR 0/2012** — Cod de proiectare, bazele proiectării structurilor în construcții — sursa grupărilor de acțiuni (fundamentală, seismică, cvasipermanentă);
- **CR 1-1-3/2012** și **CR 1-1-4/2012** — coduri de proiectare pentru acțiunea zăpezii, respectiv a vântului, cu hărțile naționale de zonare;
- **SR EN 1990** — Eurocod 0, bazele proiectării structurale (armonizarea cu CR 0);
- **SR EN 1998**, inclusiv **partea 1998-4** — Eurocod 8, proiectare seismică; partea 4 tratează explicit **siloz, rezervoare și conducte**, fiind sursa normativă directă pentru calculul ancorajelor seismice ale rezervorului suprateran (§4) — o parte de cod adesea ignorată în proiectarea curentă de structuri civile, dar esențială aici, întrucât un recipient plin cu lichid nu se comportă seismic ca o structură obișnuită (a se vedea discuția din §4.1);
- **NP 112/2014** — Normativ pentru proiectarea structurilor de fundare directă — sursa metodologiei de verificare a radierului/dalei la presiune pe teren, la răsturnare și la alunecare;
- **NP 074/2014** — Normativ privind documentațiile geotehnice pentru construcții — sursa clasificării categoriei geotehnice și a conținutului studiului geotehnic necesar;
- **SR EN 1997-1** — Eurocod 7, proiectare geotehnică, partea 1: reguli generale — sursa normativă directă pentru verificarea la stare limită ultimă de tip **UPL (Uplift — pierderea echilibrului prin ridicare/flotație)**, tratată în §2.3; această verificare este o stare limită distinctă de starea limită GEO (portanță) sau STR (rezistență structurală), cu factori parțiali proprii, prezentată pe larg mai jos;
- **ISCIR PT C4** — Prescripție tehnică pentru recipiente sub presiune — reglementează proiectarea, fabricația și certificarea recipientului GPL propriu-zis (mantaua rezervorului), aspect care, așa cum s-a arătat în nota preliminară, **nu face obiectul acestui memoriu**, dar ale cărui date (masă, geometrie, presiune de calcul) sunt preluate ca date de intrare pentru dimensionarea structurii de susținere;
- **ISCIR PT C7** — Prescripție tehnică pentru instalații de GPL, reglementează cerințele specifice de amplasare, distanțe de siguranță, echipare a instalațiilor GPL;
- **NTPEE-2018** (Normativ tehnic pentru proiectarea, execuția și exploatarea sistemelor de alimentare cu gaze naturale/GPL) — sursa distanțelor de siguranță și a cerințelor de amplasare a stației față de vecinătăți, drumuri publice, alte construcții;
- **Legea 10/1995** privind calitatea în construcții — cadrul general al cerințelor fundamentale și al verificării tehnice de calitate.

### 1.6. Metodologia de calcul și ipotezele simplificatoare adoptate

Înainte de a intra în calculul propriu-zis al fiecărui obiect (capitolele 2-7), se cuvine explicitată metodologia generală adoptată în acest memoriu, valabilă transversal pentru toate verificările: se folosește, pentru toate cele șase obiecte de construcție, o **metodă statică echivalentă simplificată**, în care acțiunea seismică este introdusă sub forma unei forțe orizontale statice, calculată printr-un coeficient seismic global c_s (produsul dintre coeficientul de importanță, raportul ag/g, factorul de amplificare dinamică β și inversul factorului de comportare q), aplicată la centrul de greutate al masei considerate. Această abordare este justificată și acoperitoare pentru toate obiectele analizate, întrucât niciunul dintre ele nu prezintă o comportare dinamică suficient de complexă (structuri multi-nivel, neregularități majore de rigiditate/masă, perioade proprii apropiate de perioade de rezonanță periculoase) care să impună o analiză modală completă cu spectru de răspuns — o hală industrială de mari dimensiuni sau o clădire cu mai multe niveluri ar necesita, de regulă, o astfel de analiză mai elaborată, dar pentru un rezervor rigid pe suporți scurți, un zid de mici dimensiuni în consolă, o copertină ușoară pe patru stâlpi și o cabină de mici dimensiuni, metoda forțelor statice echivalente rămâne nu doar suficientă, ci și metoda uzual acceptată în practica de proiectare a acestui tip de instalații.

O a doua ipoteză simplificatoare, deja menționată în §4.1 dar care merită reluată aici cu rol de sinteză metodologică, este tratarea conținutului lichid al rezervorului ca **masă rigidă unică**, fără separarea în componentă impulsivă și componentă convectivă prevăzută de tratarea completă din SR EN 1998-4 pentru rezervoare mari. Această simplificare este acoperitoare (nu subestimează forța de calcul) pentru rezervoare de dimensiuni mici precum cel de 4,85 mc analizat aici, unde perioada proprie de oscilație a suprafeței libere a lichidului (perioada convectivă) este suficient de îndepărtată de perioada structurii ansamblului rezervor-ancoraje încât cuplajul dinamic între cele două componente să poată fi neglijat fără a compromite siguranța calculului.

O a treia ipoteză, aplicabilă în special verificării la flotație din §2.3, este considerarea unui **nivel hidrostatic uniform și constant pe toată suprafața amplasamentului**, egal cu valoarea maximă istorică/statistică furnizată de studiul geotehnic (NHmax = −1,50 m). În realitate, nivelul freatic poate varia local (drenaj diferențiat, sezonalitate, eventuale lucrări de drenare a amplasamentului), dar adoptarea valorii maxime uniforme, fără a considera vreun beneficiu din drenajul local, este o ipoteză deliberat acoperitoare, în acord cu principiul general al proiectării la stări limită: se lucrează întotdeauna cu scenariul cel mai defavorabil dintre cele plauzibile, nu cu scenariul mediu sau cel mai probabil.

### 1.7. Delimitarea responsabilității: structura de susținere versus recipientul ISCIR

Această delimitare, deja anunțată în nota preliminară, merită dezvoltată aici, întrucât este sursa principală de confuzie în proiectele de acest tip și determină exact ce se verifică prin acest memoriu și ce nu. Recipientul GPL — mantaua cilindrică, fundurile bombate, racordurile, armăturile de siguranță (supapă de siguranță, indicator de nivel, robineți de golire rapidă) — este un **produs industrial certificat**: producătorul întocmește documentația de calcul a recipientului conform ISCIR PT C4 (verificare la presiune interioară, la oboseală, la coroziune, probă hidraulică la 1,5× presiunea de lucru), obține certificarea CE/ISCIR și livrează recipientul însoțit de o carte tehnică și de o declarație de conformitate. Inginerul structurist care semnează acest memoriu **nu recalculează mantaua recipientului** — ar fi atât inutil (recipientul e deja certificat), cât și, formal, în afara competenței sale profesionale specifice (verificarea recipientelor sub presiune este o competență ISCIR distinctă de atestarea MDLPA pentru structuri).

Ceea ce inginerul structurist proiectează și verifică, și care constituie obiectul integral al acestui memoriu, este **interfața dintre acest recipient certificat și pământ**:
1. fundația (radier suprateran sau cuvă/dală subterană) care preia greutatea recipientului plin, gol sau în probă hidraulică și o transmite terenului;
2. sistemul de ancorare (buloane la varianta suprateran, chingi la varianta subterană) care împiedică deplasarea, răsturnarea sau, după caz, ridicarea recipientului sub acțiuni seismice, de vânt sau de subpresiune hidrostatică;
3. construcțiile conexe (zid de foc, copertină, cabină) care nu conțin GPL, dar fac parte din ansamblul funcțional al stației și trebuie verificate structural ca orice construcție obișnuită, cu particularitatea suplimentară a zidului de foc, care are și o funcție de siguranță la incendiu (§5).

Această delimitare este reluată explicit în §12, unde se detaliază și cine semnează verificarea tehnică a fiecărei componente (verificatori atestați MDLPA pentru structura de rezistență, respectiv documentația ISCIR separată, întocmită de producătorul recipientului, pentru echipamentul sub presiune).

---

## 2. Geometria, masele și dimensionarea fundației rezervorului

### 2.1. Geometria recipientului și inventarul maselor

Rezervorul GPL are o capacitate nominală **V = 4,85 mc**, geometrie cilindrică orizontală cu diametrul **D = 1,25 m** și lungimea aproximativă **L ≈ 4,50 m**, sprijinit pe două șei de sprijin (suporturi curbe, profilate după raza mantalei, care distribuie reacțiunea pe o porțiune din circumferința inferioară a recipientului) dispuse la distanța **a = 3,00 m** interax. Conform prescripțiilor ISCIR PT C7 privind gradul maxim admis de umplere al recipientelor GPL (impus tocmai pentru a lăsa un spațiu de expansiune a fazei de vapori la creșterea temperaturii ambientale, evitând atingerea presiunii de deschidere a supapei de siguranță prin simpla dilatare termică a lichidului), gradul de umplere adoptat este **85%**, ceea ce înseamnă un volum efectiv de lichid de **4,12 mc**. Densitatea GPL-ului (amestec propan-butan comercial) se adoptă **ρ = 0,54 t/mc**, valoare uzuală pentru compoziția standard de vară/iarnă a GPL-ului auto comercializat în România.

Din aceste date rezultă inventarul complet al maselor cu care se lucrează în calculele de mai jos, fiecare corespunzând unui scenariu de exploatare distinct al recipientului:

- **Tara** (greutatea proprie a recipientului gol, manta + funduri + șei + armături) — **1,60 t**;
- **Masa GPL lichid** la umplerea de 85% — **2,22 t** (4,12 mc × 0,54 t/mc);
- **Masa totală în exploatare (recipient plin la 85%)** — **G_rez = 3,82 t = 37,5 kN** — acesta este scenariul de exploatare curentă, folosit ca referință în majoritatea verificărilor din capitolele 2 și 4;
- **Masa la proba hidraulică** — la recepția instalației și periodic conform PT C4, recipientul se umple integral cu apă (densitate 1,0 t/mc, mult mai mare decât GPL-ul lichid) și se presurizează la 1,5× presiunea de lucru pentru verificarea etanșeității și a rezistenței mantalei — rezultă o masă totală de **6,45 t = 63,3 kN**, sensibil mai mare decât masa de exploatare. Acest scenariu, deși de scurtă durată (câteva ore, la intervale de ani), trebuie verificat separat pentru fundație, întrucât presiunea pe teren și eventualele solicitări gravitaționale pot depăși pe cele din exploatarea curentă (a se vedea grupările de încărcări din §8, unde proba hidraulică apare ca o combinație de sine stătătoare, necombinată însă cu acțiunea seismică sau cu vântul, dat fiind caracterul programat și de scurtă durată al operațiunii).

Aceste trei valori de masă (gol, plin în exploatare, plin la probă hidraulică) reprezintă cele trei "stări" pe care fundația și ancorajele trebuie să le poată acoperi în siguranță, fiecare guvernând o verificare diferită: masa de exploatare guvernează verificarea seismică (§4, întrucât forța de inerție este proporțională cu masa efectiv prezentă în exploatare curentă), masa la probă hidraulică guvernează verificarea presiunii maxime pe teren (fiind cea mai mare încărcare gravitațională posibilă), iar **masa la recipient gol** — aparent cea mai mică și deci cea mai puțin solicitantă — se dovedește, paradoxal, a fi tocmai scenariul **critic** pentru varianta subterană a rezervorului, așa cum se arată în §2.3.

### 2.2. Radierul suprateran (varianta A) — dimensionare și verificare la stabilitate

#### 2.2.1. Predimensionarea geometrică

Pentru varianta cu rezervor montat suprateran pe cele două șei, se adoptă un radier general din beton armat cu dimensiunile în plan **4,00 × 2,00 m** și grosimea **0,40 m**, realizat din beton **C25/30** cu armătură **BST500**. Clasa de beton C25/30 este adecvată unei fundații expuse mediului exterior, dar fără contact permanent cu apa sau cu agenți agresivi (clasă de expunere XC2, uscat-umed alternant, tipică pentru un radier suprateran protejat de precipitații printr-o pantă de scurgere și, eventual, un strat de protecție hidrofugă la partea superioară). Greutatea proprie a acestui radier rezultă din volumul de beton (4,00 × 2,00 × 0,40 = 3,2 mc) multiplicat cu greutatea specifică a betonului armat (25 kN/mc), adică **80 kN**.

Sarcina axială totală transmisă terenului sub radier, în gruparea de exploatare curentă, se obține însumând greutatea recipientului plin (37,5 kN), greutatea radierului (80 kN) și o alocație pentru elementele conexe (postamente pompă, șei, ancoraje, aproximată la 4 kN):

**N total = 37,5 + 80 + 4 = 121,5 kN**

Presiunea medie pe teren rezultă din împărțirea acestei sarcini la aria radierului (4,00 × 2,00 = 8,0 mp):

**p_med = 121,5 / 8,0 = 15,2 kPa**

Această valoare este de peste 13 ori mai mică decât presiunea convențională a terenului (200 kPa), ceea ce arată — și este un aspect important de subliniat, întrucât contravine intuiției inginerești curente — că **radierul rezervorului suprateran nu este deloc dimensionat din condiția de portanță a terenului**. Un radier mult mai mic ar satisface cu prisosință verificarea de presiune pe teren. Dimensiunea de 4,00 × 2,00 m a fost adoptată, în schimb, din **condiția de stabilitate la răsturnare sub acțiune seismică**, verificare pe care o dezvoltăm în continuare, și care este singura verificare cu adevărat dimensionantă pentru acest element.

#### 2.2.2. Verificarea la răsturnare sub acțiune seismică

Un rezervor cilindric orizontal montat pe șei la o cotă ridicată față de baza fundației reprezintă, din punct de vedere seismic, o masă concentrată situată la o anumită înălțime deasupra planului de rezemare — configurație predispusă la răsturnare (basculare în jurul muchiei radierului) sub acțiunea forței orizontale de inerție generate de seism, mult mai mult decât o structură cu masa distribuită la nivelul solului. Forța seismică orizontală de bază care acționează asupra ansamblului rezervor-radier în acest scenariu de verificare a stabilității fundației rezultă **F_b = 11,3 kN** (valoare calculată pentru gruparea seismică aplicată ansamblului rezervor-radier, distinctă — după cum se detaliază în §9 — de forța seismică folosită la dimensionarea propriu-zisă a ancorajelor rezervorului pe șei, tratată separat în capitolul 4, unde parametrii de calcul q și masa participantă diferă întrucât acolo se verifică un subansamblu local — bulon+șa — și nu ansamblul rezervor-radier care se poate roti liber în jurul muchiei fundației).

Momentul răsturnător se obține înmulțind această forță orizontală cu brațul ei față de muchia de rotație a radierului, braț care este suma dintre înălțimea centrului de greutate al rezervorului față de fața superioară a radierului (h_cg = 1,00 m, aproximând centrul de greutate al cilindrului la nivelul axei sale) și înălțimea (grosimea) radierului însuși (h_r = 0,40 m), acesta din urmă fiind inclus deoarece muchia de rotație critică se află la baza radierului, nu la fața lui superioară:

**M_r = F_b · (h_cg + h_r) = 11,3 · (1,00 + 0,40) = 15,8 kNm**

Pentru a verifica dacă acest moment produce sau nu desprinderea parțială a radierului de pe teren (adică dacă rezultanta eforturilor de contact iese sau nu din sâmburele central al secțiunii de bază), se calculează excentricitatea rezultantei:

**e = M_r / N total = 15,8 / 121,5 = 0,13 m**

Această excentricitate se compară cu limita sâmburelui central pe direcția lungă a radierului (L = 4,00 m), care este L/6 = 4,00/6 = **0,67 m**. Cum e = 0,13 m << L/6 = 0,67 m, rezultanta rămâne confortabil în interiorul sâmburelui central, ceea ce înseamnă că **întreaga suprafață a radierului rămâne comprimată** — nu apare nicio desprindere (ridicare parțială) a tălpii de pe teren, iar distribuția de presiuni pe teren rămâne trapezoidală (nu triunghiulară, cum ar fi cazul dacă excentricitatea ar depăși L/6).

Presiunea maximă la marginea comprimată a radierului, calculată cu formula clasică de flexo-compresiune a unei secțiuni dreptunghiulare (p = N/A ± M/W, cu modulul de rezistență al secțiunii de bază W = B·L²/6 = 2,00·4,00²/6 = 5,33 m³):

**p_max = 15,2 + 15,8/5,33 = 18,2 kPa**

Această valoare se compară cu presiunea convențională a terenului majorată cu 20% pentru gruparea seismică (majorare uzuală admisă în verificările la stare limită ultimă seismică, unde se acceptă o depășire controlată a presiunii de bază, dat fiind caracterul de scurtă durată și extraordinar al acțiunii seismice): 1,2 · 200 = **240 kPa**. Cum p_max = 18,2 kPa este de peste 13 ori mai mic decât capacitatea majorată de 240 kPa, verificarea este satisfăcută cu o marjă foarte confortabilă — **VERIFICAT**, atât pentru stabilitatea la răsturnare (excentricitate mult sub limita sâmburelui central), cât și pentru portanța terenului sub efectul combinat al încărcării gravitaționale și al momentului seismic răsturnător.

#### 2.2.3. Armarea radierului

Dat fiind că radierul este, așa cum s-a arătat, larg supradimensionat față de necesarul strict de rezistență (atât la portanță, cât și la încovoiere generală), armarea sa se stabilește pe criterii **constructive și de armătură minimă** (ρ_min conform SR EN 1992-1-1), nu pe un calcul de încovoiere generală care ar rezulta în secțiuni de armătură nesemnificative: se adoptă o rețea de bare **Ø14/150 mm, dispusă atât la partea superioară cât și la partea inferioară a radierului, pe ambele direcții** — o soluție de armare robustă, adecvată unui element masiv de 0,40 m grosime, care asigură controlul fisurării din contracție și din eventualele gradiente termice, pe lângă capacitatea de a prelua orice redistribuire locală de eforturi.

Suplimentar acestei armături generale, se prevede o **armare locală suplimentară sub zonele de rezemare a celor două șei** ale rezervorului — bare Ø16 însoțite de etrieri — pentru a prelua concentrarea de eforturi locale generată de reacțiunile punctuale/liniare transmise de șei către radier, similar unei zone de introducere a unei sarcini concentrate într-o placă. Se verifică, de asemenea, **rezistența la străpungere (poanșonare)** a radierului sub placa de bază a fiecărei șei — verificare care, dată fiind grosimea considerabilă a radierului (0,40 m) raportată la dimensiunile relativ modeste ale reacțiunilor transmise de șei (sub 20 kN fiecare, cum rezultă din §2.1 și §4), este **acoperită** fără a necesita armătură suplimentară de poanșonare.

### 2.3. Placa/cuva subterană (varianta B) — verificarea la flotație (UPL)

#### 2.3.1. Geometria variantei subterane

Pentru varianta cu rezervorul îngropat integral sub cota terenului, se adoptă o dală/cuvă de fundare din beton armat cu dimensiunile în plan **5,00 × 2,20 m** și grosimea **0,40 m**, amplasată cu fața inferioară la cota **−2,60 m** față de cota terenului natural. Rezervorul propriu-zis, cu diametrul de 1,25 m, este poziționat astfel încât generatoarea sa inferioară să se afle la **−2,10 m**, iar generatoarea superioară la **−0,85 m** — adâncime de acoperire care asigură atât protecția mecanică a rezervorului (trafic, îngheț), cât și, așa cum se arată în §5, o protecție implicită față de radiația termică a unui eventual incendiu la suprafață, avantaj specific variantei subterane discutat în §3.

Nivelul hidrostatic maxim al amplasamentului, precizat în §1.3, este **NHmax = −1,50 m**. Se observă imediat — și aceasta este cheia întregii verificări din continuare — că acest nivel al apei subterane se situează **deasupra generatoarei inferioare a rezervorului** (−1,50 m este mai sus decât −2,10 m), ceea ce înseamnă că, în scenariul cel mai defavorabil de ridicare a pânzei freatice, **întregul rezervor și cea mai mare parte a dalei de fundare se află sub nivelul apei subterane**. Aceasta este premisa fizică a fenomenului de flotație tratat mai jos.

#### 2.3.2. Fizica fenomenului de flotație (uplift/UPL)

Fenomenul care trebuie verificat aici — și care nu are, în esență, niciun corespondent în calculul unei fundații obișnuite de clădire — este cunoscut în literatura geotehnică drept **flotație** sau, în terminologia Eurocodului 7, **stare limită UPL (Uplift)**: pierderea echilibrului static al unei construcții sau al unei părți din ea sub acțiunea presiunii hidrostatice ascendente (subpresiune), atunci când greutatea proprie și celelalte forțe stabilizatoare nu mai sunt suficiente pentru a contrabalansa forța de flotabilitate arhimedică exercitată de apa subterană.

Principiul fizic este exact principiul lui Arhimede aplicat unui corp scufundat: orice volum de material (beton, oțel, sau chiar aer — cazul unui recipient gol) aflat sub nivelul apei subterane este supus unei forțe ascendente egale cu greutatea volumului de apă dislocuit. Într-o construcție civilă obișnuită, cu subsoluri masive din beton armat de densitate apropiată sau superioară celei a apei saturate, această forță este de regulă mult mai mică decât greutatea proprie a construcției și nu guvernează niciodată dimensionarea. La un **rezervor cilindric gol** însă, situația este calitativ diferită: rezervorul gol este, în esență, o **carcasă de oțel cu un volum interior mare umplut cu aer** (sau, mai corect spus, nu conține deloc lichid de balast) — densitatea sa medie aparentă (masă/volum exterior) este mult sub cea a apei, ceea ce înseamnă că, luat separat, rezervorul gol ar tinde să plutească, exact ca o barcă sau ca un butoi gol scufundat. Singurul motiv pentru care rezervorul îngropat nu se ridică pur și simplu din pământ atunci când freaticul este ridicat este faptul că el este acoperit deasupra cu un strat de pământ (și, eventual, cu dala de fundare de care este solidarizat prin chingi) — este exact acest **pământ de acoperire, submersat el însuși de apa subterană, care asigură lestarea necesară** pentru a menține rezervorul la locul lui, alături de greutatea proprie a dalei.

O întrebare firească pe care memoriul o clarifică explicit este de ce se verifică **scenariul rezervorului gol**, și nu scenariul rezervorului plin cu GPL, care ar părea la prima vedere mai relevant pentru exploatarea curentă. Răspunsul ține tot de fizica fenomenului: rezervorul **plin cu GPL lichid** (densitate 0,54 t/mc) are o greutate proprie suplimentară de peste 2 tone (2,22 t GPL, conform §2.1) care se adaugă la greutatea tarei și acționează exact în sensul favorabil, opunându-se flotației — cu alte cuvinte, rezervorul plin este intrinsec **mai greu și deci mai puțin predispus la flotație** decât rezervorul gol. Situația de rezervor gol apare în practică în cel puțin trei circumstanțe reale și previzibile pe durata de viață a instalației: (1) **înainte de prima umplere**, în perioada dintre montarea rezervorului îngropat și punerea lui în funcțiune; (2) **la o eventuală golire completă pentru revizie tehnică sau reparație**, operațiune periodică impusă de ISCIR la intervale reglementate; (3), teoretic, **după o golire accidentală de urgență** (deversare controlată în caz de avarie). În oricare din aceste situații, dacă ele coincid — chiar și întâmplător — cu un episod de ridicare a nivelului freatic până la cota NHmax (de exemplu, în urma unor precipitații abundente sau a unei inundații locale), rezervorul se află exact în configurația cea mai defavorabilă posibil: masă minimă (gol) combinată cu subpresiune maximă (freatic ridicat). De aceea, verificarea la flotație se face întotdeauna pentru **rezervorul gol**, ca ipoteză acoperitoare, indiferent de cât de rar ar fi, statistic, ca golirea completă să coincidă cu vârful freaticului — aceasta este chiar esența unei verificări de stare limită acoperitoare: nu se verifică scenariul cel mai probabil, ci scenariul cel mai defavorabil dintre cele posibile.

Se cuvine de asemenea subliniat de ce această verificare **se tratează separat de verificarea seismică** și nu se combină cu ea: o combinație "seism + freatic maxim + rezervor gol" ar însemna suprapunerea a două evenimente extraordinare independente (un cutremur de proiectare, eveniment cu perioadă medie de revenire de sute de ani, și un vârf de freatic coincis cu o golire programată a rezervorului) — o astfel de coincidență este considerată, în mod uzual în proiectare, suficient de improbabilă încât să nu fie inclusă într-o combinație de calcul unică; cele două verificări (seismică, tratată în §4 pentru varianta suprateran, și de flotație, tratată aici pentru varianta subterană) rămân **verificări separate ale unor stări limită diferite**, fiecare acoperitoare pentru fenomenul propriu, fără a fi combinate una cu cealaltă. De altfel, așa cum s-a menționat și în §9, la rezervorul subteran mișcarea seismică se transmite prin masa de pământ înconjurătoare ("mișcare cu solul"), iar efectele de inerție asupra unui corp complet îngropat, susținut lateral pe tot conturul de pământul compactat din jur, sunt mult reduse față de un rezervor suprateran expus liber — motiv suplimentar pentru care, la varianta subterană, seismul nu este fenomenul dimensionant, ci flotația.

#### 2.3.3. Calculul forței de subpresiune (flotație)

Volumul de material dislocuit de ansamblul rezervor + dală, aflat sub nivelul hidrostatic maxim de calcul, se estimează la aproximativ **9,90 mc** (volum care include atât volumul exterior al mantalei cilindrice a rezervorului cât și porțiunea din dala de fundare situată sub cota NHmax, conform geometriei descrise în §2.3.1). Forța de subpresiune arhimedică rezultată, calculată cu greutatea specifică a apei de 10,0 kN/mc:

**F_up = 10,0 · 9,90 = 99,0 kN**

Această forță acționează vertical ascendent, aplicată practic la centrul de greutate al volumului dislocuit, și reprezintă acțiunea destabilizatoare unică ce trebuie contrabalansată de forțele stabilizatoare descrise mai jos.

#### 2.3.4. Forțele stabilizatoare (scenariul rezervor gol — critic)

Așa cum s-a argumentat în §2.3.2, forțele stabilizatoare se evaluează pentru scenariul cel mai defavorabil — rezervorul gol — și cuprind trei componente:

- **Greutatea proprie a dalei de beton armat** — **110,0 kN** (rezultată din volumul dalei de 5,00 × 2,20 × 0,40 m, aproximativ 4,4 mc, multiplicat cu greutatea specifică a betonului armat de 25 kN/mc);
- **Greutatea rezervorului gol** — **15,7 kN** (tara rezervorului, 1,60 t conform §2.1, adică 15,7 kN — se observă aici de ce scenariul gol este critic: dacă rezervorul ar fi luat în calcul plin, s-ar adăuga masa de GPL, aproape 22 kN suplimentari, ceea ce ar face verificarea mult mai facilă, dar, cum s-a arătat, nu este scenariul acoperitor);
- **Greutatea pământului de acoperire, luată submersată** (adică diminuată cu subpresiunea arhimedică proprie, conform principiului că, sub nivelul apei subterane, greutatea efectivă a pământului saturat este greutatea sa totală minus greutatea apei dislocuite de particulele solide — greutate submersată sau "efectivă") — **42,0 kN**.

Suma acestor trei componente stabilizatoare este:

**G_stab = 110,0 + 15,7 + 42,0 = 167,7 kN**

#### 2.3.5. Verificarea la stare limită UPL conform SR EN 1997-1

Verificarea la stare limită de tip UPL, conform SR EN 1997-1 (Eurocod 7, partea 1, §2.4.7.4), se face prin compararea forțelor stabilizatoare (afectate de un factor parțial de reducere, întrucât se lucrează la limită de siguranță în sens defavorabil pentru acțiunile favorabile) cu forța destabilizatoare de subpresiune (afectată la rândul ei de un factor parțial de amplificare, în sensul defavorabil pentru acțiunea nefavorabilă). Factorii parțiali standard folosiți pentru starea limită UPL sunt **0,90** pentru acțiunile permanente favorabile (stabilizatoare) — reducere care reflectă incertitudinea inerentă în estimarea greutății reale puse în operă (compactare incompletă a umpluturii, variații de densitate) — și **1,10** pentru acțiunea variabilă/permanentă nefavorabilă de subpresiune (majorare care reflectă incertitudinea în determinarea exactă a nivelului maxim al apei subterane, parametru care poate varia sezonier și pe care studiul geotehnic îl estimează cu o marjă de precauție). Factorul de siguranță rezultat:

**FS = (0,90 · G_stab) / (1,10 · F_up) = (0,90 · 167,7) / (1,10 · 99,0) = 150,9 / 108,9 = 1,39 > 1,00**

Cum FS = 1,39 este supraunitar, verificarea la stare limită ultimă UPL este satisfăcută cu factorii parțiali normați. Se prezintă, complementar, și verificarea simplificată (raportul brut al forțelor stabilizatoare la cea destabilizatoare, fără factori parțiali, folosită curent ca indicator intuitiv de siguranță în faza de predimensionare):

**FS simplu = 167,7 / 99,0 = 1,69 > 1,10**

Ambele criterii sunt satisfăcute — **VERIFICAT**. Se recomandă totuși, ca măsură de prudență inginerească dincolo de stricta satisfacere a inegalității normative, ca proiectantul să rețină din acest calcul două concluzii practice: în primul rând, marja de siguranță (FS = 1,39, respectiv 1,69) este confortabilă dar nu excesivă, ceea ce înseamnă că **orice modificare ulterioară a proiectului** (de exemplu, reducerea grosimii dalei, folosirea unui strat de acoperire mai subțire decât cel considerat, sau o cotă a nivelului freatic reevaluată mai defavorabil în urma unor foraje suplimentare) trebuie să fie însoțită de o recalculare a acestei verificări, nefiind permisă o marjă implicită de siguranță suplimentară "din construcție"; în al doilea rând, dacă studiul geotehnic definitiv (la faza PTh) confirmă un nivel al apei subterane **mai ridicat** decât cel considerat aici (de exemplu, ca urmare a unor precipitații excepționale sau a unei revizuiri a datelor hidrogeologice), există două soluții tehnice standard, ambele menționate explicit în proiect ca soluții de rezervă:

- **lestarea suplimentară a dalei**, prin adoptarea unei grosimi mai mari a dalei sau a unui strat de balast/beton de lestare adițional deasupra dalei (o soluție de tip "h_d = 0,50 m" strat suplimentar de lestare a fost evaluată ca rezervă în acest sens);
- **ancorarea activă a rezervorului în dală prin chingi de ancorare** — soluție echivalentă conceptual cu ancorarea seismică a rezervorului suprateran (§4), dar cu rol opus: aici chingile nu împiedică răsturnarea sau alunecarea, ci **ridicarea** rezervorului sub subpresiune. O platbandă de ancorare de secțiune 60×6 mm oferă o capacitate portantă la întindere de aproximativ **N_Rd ≈ 111 kN**, valoare net superioară forței de subpresiune de calcul (99,0 kN), deci suficientă ca soluție de rezervă dacă marja lestării geotehnice s-ar dovedi, la faza PTh, insuficientă.

#### 2.3.6. Armarea dalei subterane

Dala subterană se toarnă din beton de clasă superioară celei folosite la radierul suprateran — **C30/37**, cu clase de expunere **XC2/XA1** — alegere justificată de expunerea permanentă la umiditate și, eventual, la un mediu chimic ușor agresiv specific solului saturat (clasa XA1 acoperă un grad slab de agresivitate chimică a solului/apei subterane, situație frecventă și prudentă de considerat pentru un element îngropat permanent, indiferent dacă studiul geotehnic definitiv confirmă sau nu agresivitate chimică efectivă). Armarea adoptată este o rețea de bare **Ø16/150 mm, dispusă la partea superioară și la partea inferioară a dalei, pe ambele direcții** — mai densă decât cea a radierului suprateran (Ø14/150), diferență justificată de solicitarea de încovoiere generată de subpresiunea uniform distribuită pe suprafața inferioară a dalei, absentă la radierul suprateran.

Momentul încovoietor generat de subpresiunea hidrostatică pe fâșia de dală (calculat ca pentru o placă rezemată/încastrată parțial pe conturul zonei portante, sub o încărcare ascendentă uniform distribuită echivalentă subpresiunii nete rămase după scăderea greutății proprii a dalei pe unitatea de suprafață) rezultă:

**M ≈ 7,3 kNm/m**

Această valoare a momentului este **acoperită** de armătura Ø16/150 adoptată constructiv (capacitatea la încovoiere a acestei armături, pentru grosimea de 0,40 m a dalei, depășește confortabil 7,3 kNm/m), fără a fi necesară o majorare suplimentară a secțiunii de armătură rezultate din calculul de încovoiere propriu-zis.

---

## 3. Comparația fenomenologică suprateran versus subteran

Capitolele 2.2 și 2.3 au arătat, prin calcul direct, un aspect esențial pentru orice proiect de stație GPL: **varianta suprateran și varianta subterană nu sunt două soluții de fundare diferite pentru aceeași problemă structurală, ci două probleme structurale diferite** care se întâmplă să servească aceeași funcțiune (adăpostirea unui rezervor GPL de 4,85 mc). Tabelul de mai jos sintetizează aceste diferențe fenomenologice:

| Criteriu | Suprateran (A) | Subteran (B) |
|---|---|---|
| Fundație | radier 4,0×2,0×0,4 | cuvă/dală 5,0×2,2×0,4 + umplutură |
| Fenomen critic | răsturnare + smulgere buloane | **flotație (uplift) gol + freatic** |
| Ancorare | buloane șa → radier (seism) | chingi rezervor → dală (anti-flotație) |
| Vânt | semnificativ | neglijabil (îngropat) |
| Seism | mare (masă sus, h_cg) | redus (mișcare cu solul) |
| Protecție foc | zid de foc + distanțe | protejat de sol (BLEVE redus) |
| Cost | mic | mare (excavație, hidroizolare) |

Dezvoltând fiecare linie a acestui tabel: la **varianta suprateran**, rezervorul este un corp expus liber, situat cu centrul de greutate la aproximativ un metru deasupra radierului, fără niciun sprijin lateral din partea terenului — orice forță orizontală (seismică sau eoliană) aplicată acestei mase concentrate la înălțime generează un moment de răsturnare important, exact fenomenul verificat în §2.2.2, iar buloanele de ancorare trebuie să reziste atât la forfecare (translația orizontală a rezervorului) cât și la smulgere (componenta de întindere generată de momentul răsturnător care tinde să ridice un capăt al rezervorului și să-l apese pe celălalt) — acesta este obiectul capitolului 4. La **varianta subteran**, situația este calitativ inversă: rezervorul este complet încastrat lateral de pământul compactat din jurul lui, care îi limitează practic orice posibilitate de deplasare orizontală sau de rotație — vântul nu îl mai poate atinge deloc (este sub cota terenului), iar mișcarea seismică, în loc să genereze o forță de inerție relativă (rezervor care "rămâne în urmă" față de fundație, ca la varianta suprateran), tinde să antreneze rezervorul solidar cu masa de pământ înconjurătoare, fenomen cunoscut ca "mișcare cu solul" — efectele inerțiale relative sunt mult reduse, iar seismul nu mai este verificarea dimensionantă. În schimb, apare fenomenul de flotație, complet absent la varianta suprateran (unde rezervorul, fiind deasupra oricărui nivel de apă, nu poate fi niciodată supus subpresiunii).

Din punct de vedere al protecției la incendiu, cele două variante oferă de asemenea niveluri de siguranță diferite prin natura lor: rezervorul suprateran este expus direct radiației termice a unui eventual incendiu din vecinătate (de aceea este necesar zidul de foc dedicat, tratat în capitolul 5, ca element de ecranare), în timp ce rezervorul subteran beneficiază de o **protecție termică pasivă naturală oferită chiar de masa de pământ de acoperire** — un incendiu la suprafață nu poate încălzi semnificativ mantaua unui rezervor îngropat la 0,85÷2,10 m adâncime, ceea ce reduce considerabil riscul de BLEVE prin supraîncălzirea fazei lichide/gazoase din interior. Acest avantaj de siguranță al variantei subterane este însă contrabalansat de un cost de execuție net superior — excavație de volum mare, hidroizolarea completă a cuvei, dificultatea (și costul) unei eventuale intervenții de mentenanță sau înlocuire a rezervorului pe durata de viață a instalației — motiv pentru care, în practica curentă din România, varianta suprateran rămâne soluția majoritară pentru stații de capacitate mică-medie ca cea de față, varianta subterană fiind rezervată situațiilor în care spațiul disponibil sau cerințele urbanistice/de vecinătate impun reducerea distanțelor de siguranță vizibile la suprafață.

Concluzia inginerească a acestui capitol, care rezumă întreaga discuție și pe care proiectantul trebuie să o rețină la alegerea variantei constructive împreună cu beneficiarul și cu proiectantul de instalații: **elementul dimensionant la varianta suprateran este combinația seismică de răsturnare și smulgere a ancorajelor, evaluată pentru rezervorul plin** (masa maximă de exploatare generează forța de inerție maximă), în timp ce **elementul dimensionant la varianta subterană este flotația (UPL), evaluată pentru rezervorul gol combinat cu nivelul freatic maxim** (configurația de masă minimă și subpresiune maximă). Alegerea variantei nu este, deci, doar o decizie de amplasare sau de cost, ci determină complet care dintre cele două fenomene structural fundamental diferite guvernează proiectul.

Merită subliniată, în încheierea acestui capitol, și implicația asupra **duratei de viață exploatabile și a mentenabilității** celor două variante, aspect complementar comparației strict structurale de mai sus, dar relevant pentru decizia finală a beneficiarului. Rezervorul suprateran, fiind complet accesibil vizual, permite o inspecție periodică facilă a mantalei, a șeilor de sprijin și a buloanelor de ancoraj (control vizual al eventualei corodări, al integrității suprafeței de vopsea/protecție anticorozivă, al strângerii buloanelor) — operațiuni de mentenanță care se pot realiza fără mijloace speciale, în cadrul reviziilor periodice impuse de altfel de ISCIR pentru recipientul însuși. Rezervorul subteran, în schimb, odată acoperit cu umplutura de lestare, devine practic inaccesibil vizual pe toată durata sa de exploatare — orice inspecție a mantalei exterioare, a hidroizolației cuvei sau a chingilor de ancorare ar necesita o excavație parțială, operațiune costisitoare și greu de programat. Această diferență nu schimbă niciuna dintre verificările structurale prezentate în §2.2 și §2.3 (care rămân valabile independent de considerentele de mentenanță), dar este un argument suplimentar, de natură economică și operațională, care se adaugă la argumentele strict structurale în alegerea variantei constructive și pe care proiectantul trebuie să îl comunice explicit beneficiarului odată cu prezentarea celor două seturi de calcule.

---

## 4. Ancorarea seismică a rezervorului suprateran

### 4.1. De ce un recipient cu lichid necesită o abordare de calcul distinctă (SR EN 1998-4)

Ancorarea seismică a unui rezervor orizontal montat pe șei nu poate fi tratată prin analogia directă cu ancorarea seismică a unui utilaj sau a unui echipament obișnuit fixat pe o fundație, pentru un motiv fizic esențial: rezervorul conține un **lichid cu centru de greutate ridicat față de baza de rezemare**, iar acest conținut lichid poate, la rândul lui, dezvolta o componentă dinamică proprie de "sloshing" (mișcare oscilantă a lichidului în interiorul recipientului sub acțiune seismică) — fenomen tratat explicit și separat în **SR EN 1998-4** (Eurocod 8, partea 4: silozuri, rezervoare și conducte), partea de cod dedicată special structurilor de acest tip, spre deosebire de partea 1 (clădiri) sau partea 5 (fundații/ziduri de sprijin), care nu acoperă particularitățile unui conținut fluid. Diferența esențială față de o structură obișnuită "solidă" (unde toată masa se mișcă rigid solidar cu structura) este că, la un recipient parțial umplut, o parte din masa lichidă participă la mișcarea de ansamblu rigidă a rezervorului ("masă impulsivă"), iar o altă parte participă la o mișcare oscilantă proprie de suprafață liberă ("masă convectivă", cu perioadă proprie de oscilație de regulă mult mai lungă decât perioada structurii). Pentru un rezervor de dimensiuni relativ mici precum cel de față (D = 1,25 m, mult sub dimensiunile tipice ale rezervoarelor mari de stocare industrială la care fenomenul convectiv devine dominant), simplificarea uzuală și acoperitoare adoptată în proiectarea curentă a instalațiilor GPL este tratarea **întregii mase a conținutului ca masă rigidă (impulsivă)**, ignorând componenta convectivă — simplificare justificată de raportul mic dintre diametrul recipientului și lungimea de undă a oscilațiilor de suprafață așteptate, și de altfel conservatoare din perspectiva forței orizontale totale de calcul.

Un al doilea aspect care diferențiază fundamental ancorarea unui rezervor de ancorarea unei structuri obișnuite este consecința funcțională a unei eventuale cedări: la o structură civilă obișnuită, o cedare locală a unei prinderi poate genera o avarie structurală, gravă dar de regulă localizată; la un rezervor GPL, o cedare a ancorajelor sub seism, urmată de răsturnarea sau deplasarea recipientului, poate smulge racordurile rigide de alimentare/evacuare a gazului, provocând o pierdere necontrolată de GPL exact în momentul unui cutremur (când și alte sisteme de siguranță din vecinătate pot fi compromise) — scenariul cel mai defavorabil posibil pentru o instalație de acest tip. De aceea, clasa de importanță II (γI = 1,2) adoptată în §1.4 și rigurozitatea sporită a acestei verificări (comparativ, de exemplu, cu ancorarea unui utilaj obișnuit de aceeași greutate) sunt pe deplin justificate.

### 4.2. Calculul forței seismice de bază pentru ancoraje

Forța seismică orizontală de calcul pentru sistemul de ancorare, tratat ca **sistem rigid ancorat** conform metodologiei simplificate din SR EN 1998-4 (aplicabilă rezervoarelor de dimensiuni mici, rigide, la care nu se justifică o analiză dinamică completă cu moduri convective), se calculează cu formula generală a forței tăietoare seismice, particularizată pentru masa de exploatare a rezervorului (G = 37,5 kN, conform §2.1), coeficientul de importanță (γI = 1,2, clasa II), accelerația de vârf a terenului raportată la accelerația gravitațională (ag/g = 0,25), factorul de amplificare dinamică maximă a spectrului (β = 2,75, valoare de platou a spectrului de răspuns pentru perioade cuprinse între TB și TC) și factorul de comportare q, adoptat aici la valoarea **q = 1,5** — o valoare redusă, specifică unui subansamblu practic nedisipativ (buloanele de ancorare și șeile de sprijin nu sunt gândite să disipeze energie prin deformații plastice controlate, spre deosebire de rotulele plastice ale unei structuri metalice ductile; comportarea dorită este strict elastică, cu o marjă mică de suprarezistență acceptată prin acest q coborât):

**F_b = γI · (ag/g) · β · G/q = 1,2 · 0,25 · 2,75 · 37,5/1,5**

Coeficientul seismic rezultat din primii trei factori ai formulei (coeficientul care, înmulțit cu greutatea G, dă direct forța F_b) este:

**c_s = 1,2 · 0,25 · 2,75/1,5 = 0,55**

adică forța seismică orizontală reprezintă **55% din greutatea de exploatare a rezervorului** — un coeficient seismic ridicat, explicabil prin cumularea coeficientului de importanță majorat (1,2) cu factorul de comportare redus (q = 1,5, specific unui element nedisipativ), spre deosebire, de exemplu, de coeficientul seismic mult mai mic obținut pentru zidul de foc în capitolul 5 (unde q = 2,0). Forța seismică orizontală de calcul rezultă:

**F_b = 0,55 · 37,5 = 20,6 kN**

Suplimentar componentei orizontale, se evaluează și **componenta verticală a acțiunii seismice**, care la un rezervor cu conținut lichid poate genera o variație suplimentară (de regulă favorabilă sau nefavorabilă alternativ) a presiunii interioare și a reacțiunilor de sprijin; componenta verticală de calcul se estimează convențional ca o fracțiune din greutatea de exploatare, majorată cu coeficientul de importanță:

**F_v = 0,1125 · 1,2 · G ≈ 5,1 kN**

### 4.3. Repartizarea forțelor pe buloanele de ancorare

Rezervorul este ancorat prin intermediul celor două șei de sprijin, fiecare prevăzută cu câte două buloane de ancorare, rezultând un total de **4 buloane** care preiau împreună forța seismică de bază. Repartizarea acestei forțe pe buloane se face ținând cont atât de componenta de forfecare directă (translația orizontală a rezervorului, distribuită uniform pe cele patru buloane), cât și de componenta de întindere (smulgere) generată de momentul răsturnător pe care forța orizontală F_b, aplicată la înălțimea centrului de greutate al rezervorului, îl produce față de baza șeilor.

Momentul răsturnător local (față de baza șeii, cu brațul h_cg = 1,00 m adoptat pentru acest calcul local de ancoraj):

**M_răst = F_b · 1,00 = 20,6 · 1,00 = 20,6 kNm**

Din acest moment, distribuit pe distanța dintre buloanele de pe aceeași șa și pe numărul total de buloane active la întindere, rezultă o forță de smulgere netă pe bulonul cel mai solicitat de aproximativ:

**N_smulgere ≈ 3,3 kN/bulon**

iar din componenta de forfecare directă, distribuită uniform pe cele 4 buloane:

**V = F_b/4 = 20,6/4 = 5,2 kN/bulon**

### 4.4. Verificarea buloanelor M20

Buloanele de ancoraj adoptate sunt **M20, grad de rezistență 5.6** (buloane de ancoraj în beton, cu aria secțiunii rezistente la tracțiune A_s = 245 mmp), înglobate în radier pe o adâncime de cel puțin **40Ø = 800 mm** — adâncime de ancorare generoasă, adoptată tocmai pentru a asigura o cedare ductilă/previzibilă a tijei bulonului însuși (dacă s-ar produce vreodată o suprasolicitare accidentală), și nu o cedare fragilă, bruscă, prin smulgerea conului de beton din jurul bulonului — mecanism de cedare mult mai puțin dorit din perspectiva siguranței, întrucât nu oferă avertizare (deformație vizibilă) înainte de cedare.

Tabelul de verificare sintetizează cele patru controale efectuate pe bulonul cel mai solicitat:

| Verificare | Solicitare | Rezistență | Stare |
|---|---|---|---|
| Întindere | 3,3 kN | 88,2 kN | ✔ |
| Forfecare | 5,2 kN | 58,8 kN | ✔ |
| Interacțiune M+V | 0,10 | ≤ 1,0 | ✔ |
| Smulgere con beton | 3,3 kN | > 40 kN | ✔ |

Se observă din acest tabel marja foarte largă de siguranță pe toate cele patru verificări — solicitarea reprezintă, în cazul cel mai defavorabil (interacțiunea combinată M+V), doar 10% din capacitatea disponibilă (raportul de interacțiune calculat 0,10, comparat cu limita admisă de 1,0). Această marjă generoasă nu este întâmplătoare, ci este o consecință directă a modului în care buloanele de ancoraj sub acțiune seismică trebuie proiectate conform filozofiei de "calcul la capacitate" adaptate la elemente nedisipative: în locul unei optimizări stricte la limita de capacitate (cum s-ar proceda, de exemplu, la dimensionarea unei grinzi metalice supuse la încovoiere), ancorajele unui echipament cu conținut periculos se dimensionează cu rezerve substanțiale, tocmai pentru a acoperi incertitudinile inerente unei metodologii simplificate (masă tratată integral ca rigidă, fără componentă convectivă) și pentru a asigura că, în orice scenariu real plauzibil (inclusiv un cutremur ușor mai puternic decât cel de proiectare), ancorajele rămân în domeniul elastic.

Prinderea se completează constructiv cu **piulițe duble și șaibe elastice**, măsură cu rol specific de prevenire a desfacerii progresive a piuliței sub acțiunea vibrațiilor de exploatare (traficul auto din vecinătate, funcționarea pompei) — un fenomen de desfacere lentă a asamblărilor filetate expuse la vibrații susținute, distinct de acțiunea seismică propriu-zisă, dar la fel de relevant pentru siguranța pe termen lung a ancorării.

### 4.5. Verificarea la alunecare a ansamblului

Pe lângă verificarea locală a fiecărui bulon, se verifică și **alunecarea de ansamblu** a rezervorului pe radier, ca mecanism alternativ (și mai puțin costisitor de verificat separat) de transmitere a forței seismice orizontale, prin frecarea dintre baza șeilor și radier, fără solicitarea directă a buloanelor la forfecare. Rezistența la alunecare prin frecare, calculată cu un coeficient de frecare uzual de 0,45 (beton pe beton/oțel, suprafață uscată) aplicat la întreaga sarcină normală transmisă terenului (N total = 121,5 kN, conform §2.2.1):

**R_fr = 0,45 · 121,5 = 54,7 kN**

Factorul de siguranță la alunecare:

**FS = R_fr/F_b = 54,7/20,6 = 2,66 > 1,5**

Verificarea este satisfăcută cu o marjă confortabilă (FS = 2,66, față de limita minimă uzual admisă de 1,5) — **VERIFICAT**. Această verificare suplimentară confirmă că, chiar și în ipoteza (conservatoare) în care buloanele nu ar contribui deloc la preluarea forței orizontale, simpla frecare la interfața rezervor-radier ar fi suficientă pentru a preveni alunecarea — o dublă linie de apărare tipică pentru un element de siguranță de clasă de importanță II.

### 4.6. Ierarhia de rezistență a ansamblului rezervor-ancoraj-radier

Este util, pentru înțelegerea de ansamblu a capitolului 4, să recapitulăm **ierarhia de rezistență** urmărită deliberat de-a lungul întregului lanț de transmitere a forței seismice, de la conținutul lichid al rezervorului până la teren — o ierarhie care nu rezultă întâmplător din calcule separate, ci este o consecință a unei alegeri conceptuale de proiectare, analoagă principiului de "calcul la capacitate" (capacity design) folosit curent la structurile metalice sau de beton armat ductile, deși aici aplicat unui lanț de elemente în majoritate nedisipative.

Lanțul de transmitere a forței este, în ordine: **conținutul lichid → manta recipient (certificată ISCIR, exterioară acestui calcul) → șei de sprijin → buloane de ancoraj → radier de beton armat → teren de fundare**. Fiecare verig din acest lanț a fost verificată separat în capitolele precedente, cu rezerve de siguranță (rapoarte solicitare/capacitate) diferite și, aparent, crescătoare pe măsură ce ne îndepărtăm de recipient: buloanele lucrează la aproximativ 10% din capacitatea combinată la interacțiune M+V (§4.4), radierul lucrează la o presiune pe teren de doar 15,2÷18,2 kPa față de o capacitate disponibilă de 200÷240 kPa, adică sub 10% din capacitate (§2.2), iar alunecarea de ansamblu are un factor de siguranță de 2,66 (§4.5). Această rezervă crescândă spre elementele "din aval" ale lanțului (radier, teren) nu este o supradimensionare risipitoare, ci reflectă exact principiul dorit: **niciun element aflat mai aproape de recipientul cu conținut periculos nu trebuie să cedeze înaintea unui element aflat mai departe de el**, iar elementul cel mai apropiat de recipient (buloanele, șeile) trebuie să rămână, la rândul lui, în domeniul elastic pentru orice scenariu seismic plauzibil, tocmai pentru a nu genera o cedare locală care ar putea smulge racordurile flexibile ale instalației (menționate în §9) și ar putea provoca o pierdere necontrolată de GPL.

Este important de precizat că această ierarhie **nu este** o ierarhie de tip "rotulă plastică" precum cea descrisă pentru cadrele metalice disipative (concept care nu se aplică aici, întrucât niciun element al acestui lanț nu este gândit să disipeze energie prin plastificare controlată) — este, mai degrabă, o ierarhie de tip "toate elementele rămân elastice, cu rezerve de siguranță confortabile și crescânde spre teren", adecvată unui echipament la care orice cedare parțială, oricât de localizată, este considerată inacceptabilă din perspectiva riscului tehnologic descris în §1.4.

---

## 5. Zidul de foc — element structural de siguranță

### 5.1. Dubla funcție a zidului de foc

Zidul de foc (obiectul C5 din inventarul §1.2) este, prin natura lui, un element cu **funcție duală**, aspect care trebuie explicitat clar întrucât determină întregul mod de abordare a calculului său: pe de o parte, are o **funcție de protecție pasivă la incendiu**, ecranând radiația termică a unui eventual incendiu (fie provenit din exteriorul stației către rezervor, fie, mai grav, provenit de la un incendiu la rezervor către vecinătăți) și limitând astfel probabilitatea de propagare/agravare a unui eveniment accidental; pe de altă parte, fiind un perete de beton armat de dimensiuni apreciabile (8,00 × 3,00 m), este el însuși un **element structural obișnuit** care trebuie să reziste, pe toată durata de viață proiectată a construcției (50 de ani), acțiunilor climatice și seismice curente — vânt, seism — exact ca orice alt perete exterior liber al unei construcții.

Această dualitate impune o exigență suplimentară față de un perete de compartimentare interior obișnuit: zidul de foc **trebuie să rămână în picioare, funcțional și capabil să-și îndeplinească rolul de ecran termic, exact în momentul în care este cel mai probabil solicitat la maximum** — anume, în timpul sau imediat după un eveniment extrem (fie el seismul de proiectare, fie un incendiu). Cu alte cuvinte, nu este suficient ca zidul să reziste la acțiunile de exploatare curentă; el trebuie verificat explicit la combinațiile de vânt și de seism, ca element structural autonom (nu doar ca element arhitectural de compartimentare), și, separat, trebuie să atingă un nivel de rezistență la foc (REI) adecvat funcției sale, verificare tratată separat în §11.

### 5.2. Geometria și materialele adoptate

Zidul are lungimea **L = 8,00 m**, înălțimea **H = 3,00 m** și grosimea **t = 0,25 m**, realizat din beton **C25/30** armat cu **BST500**, dimensionat pentru o clasă de rezistență la foc **REI 180** (respectiv **REI 240** în situația în care zidul separă direct rezervorul de o construcție învecinată, cerință mai severă tratată în §11). Greutatea proprie a zidului, pe metru liniar de lungime, rezultă din secțiunea transversală (0,25 × 3,00 = 0,75 mp) multiplicată cu greutatea specifică a betonului armat:

**g = 0,75 · 25 = 18,75 kN/m**

Fiind un perete izolat, neîncastrat lateral în alte structuri și nesolidarizat la partea superioară cu vreun planșeu sau centură, zidul lucrează structural ca un **perete în consolă** (încastrat doar la baza fundației), configurație care determină modul de calcul al ambelor verificări de mai jos.

### 5.3. Verificarea la acțiunea vântului

Fiind un element plan, izolat, expus liber acțiunii vântului pe ambele fețe (fără elemente adiacente care să-i reducă expunerea), coeficientul de presiune netă adoptat pentru un perete liber de acest tip este **c_p,net = 1,8** — valoare specifică pereților izolați (semnificativ mai mare decât coeficientul de presiune al unei fațade obișnuite a unei clădiri închise, tocmai pentru că un perete liber este solicitat simultan de presiune pe o față și de sucțiune pe cealaltă, efectele cumulându-se). Presiunea dinamică de vârf la înălțimea zidului (H = 3,00 m), calculată pentru datele de amplasament din §1.3 (qb = 0,60 kPa), rezultă:

**q_p = 1,02 kPa**

iar presiunea netă pe perete:

**w = 1,84 kPa**

Momentul încovoietor la baza peretelui (consolă), calculat pentru încărcarea distribuită uniform pe înălțime cu rezultanta aplicată la jumătatea înălțimii (brațul = H/2 = 1,50 m):

**M_v = (1,84 · 3,00) · 1,50 = 8,28 kNm/m**

### 5.4. Verificarea la acțiunea seismică

Pentru verificarea seismică a zidului ca element propriu (autonom, neagățat de o structură principală), se aplică metodologia elementelor nestructurale/secundare din P100-1, cu un factor de comportare specific unui element de beton armat necontravântuit lateral, **q = 2,0** — valoare mai mare decât cea adoptată pentru buloanele de ancoraj din capitolul 4 (q = 1,5), reflectând faptul că un perete de beton armat, spre deosebire de o prindere mecanică punctuală, poate disipa o cantitate limitată de energie prin fisurarea controlată a betonului și curgerea armăturii, fără a-și pierde capacitatea portantă generală. Coeficientul seismic rezultat:

**c_s = 1,2 · 0,25 · 2,75/2,0 = 0,41**

Forța seismică orizontală pe metru liniar de zid:

**F_s = 0,41 · 18,75 = 7,7 kN/m**

Momentul încovoietor la baza peretelui din acțiunea seismică (brațul = H/2 = 1,50 m, identic cu cel folosit la vânt, întrucât forța de inerție se distribuie proporțional cu masa, deci tot uniform pe înălțime pentru un perete de secțiune constantă):

**M_s = 7,7 · 1,50 = 11,5 kNm/m**

Comparând cele două momente calculate — 8,28 kNm/m din vânt, respectiv 11,5 kNm/m din seism — se observă că **acțiunea seismică este cea dimensionantă** pentru armătura verticală a zidului, depășind cu aproximativ 39% momentul din vânt. Această constatare este importantă de reținut și de comunicat explicit către beneficiar/verificator, întrucât intuiția curentă ar putea sugera că un perete izolat de dimensiuni relativ mici este solicitat preponderent de vânt — la acest amplasament (ag = 0,25g, o valoare de hazard seismic relativ ridicată pentru România), seismul devine, de fapt, acțiunea guvernantă.

### 5.5. Armarea zidului

Din momentul dimensionant de 11,5 kNm/m, aria de armătură necesară pe fața întinsă (calculată cu formula uzuală de dimensionare la încovoiere simplă, cu brațul de pârghie interior aproximat la 0,9·d și rezistența de calcul a oțelului BST500 fyd = 435 N/mmp, pentru o secțiune de calcul cu d ≈ 210 mm, adică grosimea zidului minus acoperirea cu beton și jumătate din diametrul armăturii):

**A_s,nec = 11,5×10⁶/(0,9·210·435) = 140 mmp/m**

Această valoare calculată este însă **mai mică decât armătura minimă normată** pentru un perete de beton armat de această grosime (ρ_min conform SR EN 1992-1-1, rezultând o valoare minimă de aproximativ 325 mmp/m) — situație frecventă la elemente masive slab solicitate relativ la secțiunea lor, unde armătura minimă constructivă guvernează, nu calculul de rezistență propriu-zis. Se adoptă, în consecință, o armătură verticală **Ø12/150 mm (echivalentă cu 753 mmp/m) pe fața exterioară** a zidului (fața expusă radiației termice și presiunii directe a vântului, deci fața pe care se dezvoltă efectiv întinderea din încovoierea în consolă) și **Ø10/200 mm pe fața interioară**, armătură care asigură atât rezistența necesară, cât și un control corespunzător al fisurării pe ambele fețe. Armătura orizontală, cu rol de preluare a contracției/temperaturii și de menținere a integrității zidului între rândurile de armătură verticală, se adoptă **Ø10/200 mm pe ambele fețe**.

### 5.6. Fundația zidului

Zidul se fundează pe o **talpă continuă de 1,20 × 0,45 m**, dimensiune care, pentru asigurarea unei stabilități suficiente la răsturnare (a se vedea calculul de mai jos), se adoptă mărită constructiv la **1,50 m lățime**. Sarcina stabilizatoare pe metru liniar (greutatea zidului plus greutatea proprie a tălpii, considerând și o alocație de pământ de acoperire pe talpă):

**N_stab = 46,25 kN/m**

Momentul răsturnător, calculat cu forța seismică orizontală (dimensionantă, conform §5.4) și brațul măsurat de la baza tălpii (H/2 + grosimea tălpii = 1,50 + 0,45):

**M_răst = 7,7 · (1,50 + 0,45) = 15,0 kNm/m**

Momentul stabilizator, calculat cu sarcina axială N_stab și jumătate din lățimea tălpii (brațul maxim posibil față de muchia de răsturnare):

**M_stab = 27,75 kNm/m**

Factorul de siguranță la răsturnare:

**FS răsturnare = M_stab/M_răst = 27,75/15,0 = 1,85 > 1,5**

Verificarea este satisfăcută. Presiunea maximă pe teren la marginea tălpii (talpă parțial activă, cu o parte a secțiunii posibil descărcată dacă excentricitatea depășește sâmburele central, dar rămânând în limitele acceptabile pentru o presiune de contact locală):

**p_max ≈ 110 kPa < 240 kPa** (presiunea convențională majorată 1,2× pentru gruparea seismică, conform aceleiași logici descrise la §2.2.2)

iar factorul de siguranță la alunecare a tălpii pe teren:

**FS alunecare = 2,70**

Ambele verificări suplimentare (presiune pe teren, alunecare) confirmă stabilitatea globală a zidului — **VERIFICAT** pe toate cele trei criterii (răsturnare, presiune pe teren, alunecare).

### 5.7. Rezistența la foc a zidului

Grosimea de 0,25 m de beton armat, cu o acoperire minimă a armăturii de cel puțin 35 mm (grosime de acoperire majorată specific pentru performanța la foc, superioară acoperirii minime cerute strict din considerente de durabilitate/coroziune conform SR EN 1992-1-1), asigură, conform tabelelor de dimensionare simplificată din **SR EN 1992-1-2** (Eurocod 2, partea 1-2: proiectarea structurilor de beton la acțiunea focului), o clasă de rezistență la foc **REI 240** — depășind confortabil cerința minimă impusă de **REI 180**, și satisfăcând totodată și cerința majorată de REI 240 aplicabilă în situația în care zidul separă direct instalația de o construcție învecinată. Această suprarezistență la foc, fără costuri suplimentare de material (grosimea zidului fiind deja stabilită la 0,25 m din considerente structurale de stabilitate, nu doar de rezistență la foc), este un avantaj coincidental, dar binevenit, al soluției constructive adoptate.

---

## 6. Structura copertinei — sucțiunea vântului ca acțiune dimensionantă

### 6.1. Descrierea structurii

Copertina de protecție a zonei de alimentare (obiectul C4) are dimensiunile în plan **6,00 × 5,00 m** și înălțimea liberă sub grindă **H = 4,20 m** (cotă care asigură gabaritul necesar liberei circulații a autovehiculelor sub copertină, conform cerințelor funcționale ale unei stații de distribuție carburanți). Structura de rezistență este alcătuită din **4 stâlpi metalici HEA 160 (oțel S235)**, dispuși la colțurile copertinei, pe care reazemă un sistem de **grinzi IPE 200 (grinzi principale) și IPE 140 (grinzi secundare/pane)**, iar învelitoarea este realizată din **tablă cutată** — soluție ușoară, uzuală pentru acest tip de structură deschisă, fără pereți, expusă liber pe toate laturile acțiunii vântului.

### 6.2. Acțiunile pe copertină

Tabelul următor sintetizează acțiunile verticale considerate pe suprafața copertinei:

| Acțiune | Valoare |
|---|---|
| Greutate proprie | 0,35 kN/mp |
| Zăpadă | 1,60 kN/mp |
| **Vânt SUCȚIUNE (critic)** | **−1,3 kN/mp** (smulge) |

Greutatea proprie (0,35 kN/mp) și zăpada (1,60 kN/mp, identică valorii caracteristice de la sol adoptate în §1.3, coerentă cu o pantă redusă a acoperișului copertinei) sunt acțiuni curente, familiare oricărui calcul de structură metalică ușoară. Elementul cu adevărat particular al acestui capitol, care justifică tratarea sa distinctă, este acțiunea vântului sub formă de **sucțiune** — o valoare negativă (−1,3 kN/mp), semnificând o presiune orientată în sensul opus greutății, adică o forță ascendentă care tinde să **smulgă** copertina de pe stâlpii ei, nu să o apese pe ei.

### 6.3. Fizica sucțiunii vântului pe acoperișuri ușoare izolate

Fenomenul de sucțiune (presiune negativă, ridicare) sub acțiunea vântului este bine documentat pentru **acoperișuri ușoare, plate sau cu pantă mică, izolate (neînconjurate de alte construcții mai înalte care să le protejeze)** — exact configurația unei copertine de stație de distribuție carburanți: aerul care curge peste marginea unei astfel de suprafețe orizontale sau ușor înclinate se desprinde la muchia de atac, formând o zonă de depresiune (presiune sub cea atmosferică) deasupra acoperișului, similar principiului aerodinamic care generează portanța unei aripi de avion. Această depresiune se traduce, în termenii coeficienților de presiune folosiți în calculul structural (SR EN 1991-1-4), într-un coeficient de presiune exterioară **negativ** de valoare mare pe zonele de margine și de colț ale acoperișului — exact zonele unde sunt amplasați și stâlpii de sprijin, ceea ce agravează efectul practic al fenomenului asupra ancorajelor.

Este esențial de subliniat, pentru corecta înțelegere a acestui capitol, că, spre deosebire de o construcție închisă obișnuită (o clădire cu pereți, unde presiunea pozitivă a vântului pe fațada expusă este de regulă acțiunea dominantă asupra structurii, iar sucțiunea de pe acoperiș, deși prezentă, este adesea secundară comparativ cu încărcările gravitaționale mari ale unui acoperiș greu), la o **structură deschisă și ușoară precum o copertină** raportul se inversează: greutatea proprie este mică (0,35 kN/mp), iar sucțiunea vântului (−1,3 kN/mp) o depășește de aproape 4 ori în valoare absolută — ceea ce înseamnă că, sub acțiunea combinată de vânt cu sucțiune, **rezultanta netă a încărcării verticale pe copertină este orientată în sus**, nu în jos. Aceasta este exact rațiunea pentru care sucțiunea vântului, și nu presiunea sau zăpada, este identificată ca **fenomenul dimensionant** pentru ancorarea copertinei: este singura acțiune capabilă să genereze o solicitare de smulgere (întindere) în fundațiile stâlpilor, solicitare de o natură complet diferită de compresiunea la care sunt gândite în mod intuitiv fundațiile obișnuite.

### 6.4. Verificarea la smulgere a fundației stâlpului de colț

Stâlpul cel mai solicitat la smulgere este, evident, un stâlp de colț, întrucât aria sa aferentă de încărcare cumulează efectul de sucțiune al ambelor zone de margine adiacente colțului (efect de suprapunere a zonelor de coeficienți de presiune negativi mari specifici colțurilor de acoperiș, conform hărții de zonare aerodinamică din SR EN 1991-1-4). Pentru o arie aferentă de **7,5 mp**, forța de ridicare din sucțiunea vântului:

**F_up = 9,75 kN**

Greutatea aferentă acestui stâlp (greutate proprie structură + eventuale instalații suspendate), care acționează favorabil, opunându-se ridicării:

**G aferentă = 2,6 kN**

Rezultă o **smulgere netă** (diferența dintre forța de ridicare și greutatea stabilizatoare aferentă), care este solicitarea efectivă de întindere transmisă fundației:

**Smulgere netă = 9,75 − 2,6 = 7,15 kN**

Fundația izolată adoptată sub acest stâlp are dimensiunile **1,0 × 1,0 × 0,8 m**, cu o greutate proprie totală (beton + pământ de acoperire aferent, luat în calcul ca masă stabilizatoare suplimentară față de smulgere) de:

**G = 28 kN** (cu pământ)

Factorul de siguranță la smulgere (anti-uplift):

**FS anti-smulgere = 28/7,15 = 3,9 > 1,5**

Verificarea este satisfăcută cu o marjă foarte confortabilă. Această marjă generoasă (aproape 4, față de limita minimă de 1,5) este intenționată: fundațiile la smulgere trebuie tratate cu prudență sporită întrucât mecanismul de cedare (ridicarea bruscă a fundației din pământ, urmată eventual de smulgerea completă a stâlpului) este un mecanism fragil, fără avertizare progresivă, spre deosebire de o cedare la compresiune (unde tasarea progresivă a terenului oferă, de regulă, semnale vizibile înainte de o cedare completă).

### 6.5. Verificarea grinzii principale IPE 200

Grinda principală IPE 200, solicitată la încovoiere sub gruparea gravitațională dominantă (greutate proprie + zăpadă, gruparea care guvernează pentru grinda propriu-zisă, spre deosebire de fundații unde sucțiunea vântului este dimensionantă), dezvoltă un moment încovoietor de calcul:

**M = 26,3 kNm**

comparat cu momentul capabil al secțiunii IPE 200 (oțel S235):

**M_Rd = 49,2 kNm**

rezultând un grad de utilizare:

**η = M/M_Rd = 26,3/49,2 = 0,53**

Utilizarea de 53% confirmă o secțiune adecvat dimensionată, cu o rezervă de capacitate rezonabilă (nu supradimensionată, dar nici la limită) — **VERIFICAT**.

### 6.6. Detalierea prinderii stâlpilor la fundație

Rezultatul verificărilor de mai sus impune, la faza de detaliere (PTh + DE), o atenție particulară asupra modului constructiv de realizare a prinderii stâlpilor HEA 160 la fundațiile izolate, întrucât acesta este exact punctul prin care solicitarea de smulgere calculată în §6.4 se transmite efectiv, printr-o placă de bază și un set de buloane de ancoraj, către betonul fundației. Placa de bază trebuie dimensionată nu doar la starea de compresiune uzuală (care ar rezulta dintr-o schemă statică simplificată de stâlp comprimat), ci explicit la starea de **întindere netă** rezultată din combinația guvernantă de vânt cu sucțiune (§6.2-6.4): sub această combinație, placa de bază lucrează în flexiune inversă față de situația obișnuită, iar buloanele de ancoraj — nu betonul de sub placă — sunt cele care preiau efectiv forța de smulgere de 7,15 kN calculată pentru stâlpul de colț. Se recomandă adoptarea unor buloane de ancoraj cu inglobare suficientă (analog rațiunii deja detaliate în §4.4 pentru buloanele rezervorului) pentru a asigura, și în acest caz, o cedare ductilă a tijei bulonului, nu o smulgere fragilă a conului de beton din jurul lui, chiar dacă nivelul de solicitare este, în termeni absoluți, mult mai redus decât la ancorajele rezervorului.

Se atrage atenția, suplimentar, asupra unui aspect adesea omis în proiectarea curentă a structurilor metalice ușoare deschise: întrucât sucțiunea vântului acționează pe **toată durata de viață a construcției** ca o acțiune variabilă recurentă (nu doar ca un eveniment excepțional, cum este seismul de proiectare), buloanele de ancoraj ale copertinei trebuie protejate anticoroziv la un nivel adecvat expunerii exterioare permanente (zincare la cald sau echivalent), întrucât o eventuală corodare progresivă a tijei bulonului pe durata de exploatare ar reduce exact secțiunea rezistentă la întindere care asigură, conform §6.4, factorul de siguranță anti-smulgere de 3,9.

---

## 7. Structura cabinei operatorului

### 7.1. Descriere și încărcări

Cabina operatorului (obiectul C3), cu dimensiunile în plan **3 × 4 m** și înălțimea **H = 2,80 m**, poate fi realizată fie ca o construcție convențională cu **cadre din beton armat** (stâlpi de secțiune 25 × 25 cm, grinzi de asemenea 25 × 25 cm, placă de acoperire de 12 cm grosime), fie ca un **container metalic prefabricat** — ambele soluții fiind acoperite de acest memoriu, cu verificări specifice fiecărei variante. Greutatea totală estimată a cabinei (variantă b.a.) este **G ≈ 95 kN**.

### 7.2. Verificarea seismică

Fiind o construcție de clasă de importanță III (γI = 1,0, conform §1.4, construcție auxiliară fără conținut periculos propriu), cu un factor de comportare specific unei structuri de cadre b.a. de mici dimensiuni, **q = 2,5**, coeficientul seismic rezultat:

**c_s = 1,2·0,25·2,75/... = 0,275** *(calculat analog metodologiei din capitolele precedente, cu γI = 1,0 pentru clasa III)*

Forța seismică de bază:

**F_b = 26,1 kN** (repartizată **6,5 kN pe fiecare din cei 4 stâlpi**, presupunând o distribuție uniformă pe stâlpii cadrului)

Momentul încovoietor rezultat la baza stâlpului sub această forță:

**M = 18,3 kNm**

Această valoare este **inferioară capacității stâlpului** de secțiune 25 × 25 cm armat cu **4Ø14** (armătură longitudinală minimală, dar suficientă pentru o solicitare de această magnitudine, dat fiind gabaritul modest al construcției și clasa de importanță III) — **VERIFICAT**.

### 7.3. Fundația și varianta container

Radierul cabinei (variantă b.a.) transmite terenului o presiune medie de:

**p_med = 6,3 kPa**

valoare mult sub presiunea convențională a terenului (200 kPa, conform §1.3), confirmând că, la fel ca la radierul rezervorului suprateran (§2.2.1), portanța terenului nu este critică pentru acest element de mici dimensiuni și încărcări modeste.

Pentru **varianta container metalic prefabricat**, ancorarea la fundație se realizează prin buloane **M16 dispuse la cele patru colțuri**, fiecare colț preluând o forță de calcul de aproximativ **6,5 kN**, valoare compatibilă cu capacitatea uzuală a unui bulon M16 de ancoraj — **VERIFICAT** pentru ambele variante constructive ale cabinei.

---

## 8. Acțiuni și grupări de încărcări (sinteză normativă conform CR 0/2012, SR EN 1990)

### 8.1. Inventarul acțiunilor

Tabelul următor sintetizează toate acțiunile de calcul folosite în capitolele precedente, cu simbolul, natura și valoarea fiecăreia:

| Simbol | Acțiune | Valoare |
|---|---|---|
| G_k | permanente | cap. 2-7 |
| Q_liq | rezervor plin GPL | 21,8 kN |
| Q_test | probă hidraulică | 47,6 kN |
| S_k | zăpadă | 1,60 kN/mp |
| W_k | vânt | +0,5/−1,3 kN/mp; perete 1,84 |
| A_Ed | seism | ag=0,25g, γI=1,2 (rez./zid) |
| F_up | subpresiune freatic | 99 kN (dală subterană) |

Se observă în acest tabel o particularitate a proiectării stațiilor GPL, deja discutată punctual în capitolele precedente, dar utilă de reținut aici ca sinteză: alături de acțiunile "clasice" ale oricărei construcții (permanente, zăpadă, vânt, seism), apar două acțiuni **specifice tehnologiei GPL și configurației subterane** — greutatea variabilă a conținutului de GPL (Q_liq, respectiv Q_test pentru proba hidraulică, ambele guvernate de gradul de umplere și de scenariul de exploatare/verificare periodică descris în §2.1) și subpresiunea din apa freatică (F_up, relevantă exclusiv pentru varianta subterană, tratată în §2.3).

### 8.2. Grupările de acțiuni relevante

Din combinarea acestor acțiuni rezultă patru grupări de calcul distincte, fiecare guvernând dimensionarea unor elemente diferite ale ansamblului:

- **Gruparea fundamentală SLU** (stare limită ultimă, combinația uzuală de acțiuni permanente și variabile): 1,35·G + 1,5·Q + 1,5·ψ0·S/W — gruparea de referință pentru dimensionarea generală la rezistență a tuturor elementelor din beton și oțel, în absența acțiunii seismice;
- **Gruparea seismică**: G + ψ2·Q_liq + A_Ed, cu **ψ2,GPL = 1,0** — coeficientul de combinare cvasipermanentă pentru conținutul de GPL este adoptat egal cu 1,0 (și nu o valoare redusă, cum ar fi cazul pentru o încărcare utilă obișnuită, de exemplu o încărcare de depozitare cu ψ2 tipic 0,3÷0,8), tocmai pentru că masa de GPL este practic **întotdeauna prezentă** în exploatarea normală a rezervorului (spre deosebire de o încărcare utilă variabilă, care poate sau nu fi prezentă la un moment dat) — este gruparea **dimensionantă pentru rezervor și pentru ancoraje** (capitolul 4);
- **Gruparea de flotație UPL**: 0,90·G_stab ≥ 1,10·F_up, aplicabilă exclusiv rezervorului gol în configurație subterană — este gruparea **dimensionantă pentru dala subterană** (§2.3), complet distinctă de grupările uzuale de tip SLU/seismic, cu factori parțiali specifici stării limită UPL conform SR EN 1997-1;
- **Gruparea de probă hidraulică**: 1,0·G + 1,0·Q_test — combinație de verificare punctuală, aplicabilă în perioada scurtă (câteva ore) a probei periodice de presiune impuse de ISCIR, necombinată cu acțiunea seismică sau cu vântul extrem (fiind o operațiune programată, executată în condiții meteorologice controlate/monitorizate, nu o stare de exploatare permanentă expusă tuturor hazardurilor climatice/seismice posibile pe durata de viață a construcției).

Această structură de grupări, deși mai complexă decât cea a unei construcții civile obișnuite (care de regulă lucrează doar cu primele două grupări), reflectă fidel particularitatea funcțională a unei stații GPL: fiecare element structural al ansamblului este guvernat de o combinație de acțiuni diferită, iar proiectantul trebuie să parcurgă toate cele patru grupări pentru fiecare obiect de construcție, nu doar gruparea "implicită" fundamentală.

---

## 9. Calculul seismic — sinteză pe obiecte

Capitolele 2-7 au tratat, fiecare separat, verificarea seismică a obiectului de construcție corespunzător, cu parametri de calcul (coeficient de importanță γI, factor de comportare q) diferiți de la un obiect la altul, reflectând natura structurală și funcțională distinctă a fiecăruia. Tabelul următor sintetizează aceste calcule, oferind o imagine de ansamblu comparativă:

| Obiect | γI | q | c_s | G (kN) | F_b (kN) | Dimensionează |
|---|---|---|---|---|---|---|
| Rezervor suprateran plin (ancoraje) | 1,2 | 1,5 | 0,55 | 37,5 | 20,6 | buloane, șei |
| Rezervor suprateran (fundație) | 1,2 | 2,0 | 0,41 | 37,5 | 15,4 | radier răsturnare |
| Zid de foc (per m) | 1,2 | 2,0 | 0,41 | 18,75 | 7,7 | armătură, talpă |
| Copertină | 1,0 | 2,5 | 0,275 | ~20 | ~5,5 | (vântul e critic) |
| Cabină | 1,0 | 2,5 | 0,275 | 95 | 26,1 | stâlpi |
| Rezervor subteran | 1,2 | — | mișcare cu solul | — | redus | (flotația) |

Câteva observații de ansamblu se desprind din compararea rândurilor acestui tabel. În primul rând, se observă că **factorul de comportare q crește** pe măsură ce elementul verificat trece de la un subansamblu mecanic rigid (buloane de ancoraj, q = 1,5, primul rând) către elemente de beton armat cu o anumită capacitate de disipare prin fisurare/curgere a armăturii (radier, zid de foc, q = 2,0) și către structuri metalice/cadre cu ductilitate mai ridicată (copertină, cabină, q = 2,5) — o ierarhie coerentă cu principiul general al proiectării seismice, conform căruia elementele cu capacitate reală de disipare a energiei prin deformații controlate pot fi calculate pentru forțe mai mici, în timp ce elementele fragile sau nedisipative (ca ancorajele mecanice) trebuie verificate pentru forțe mai mari, tocmai pentru a compensa lipsa lor de ductilitate.

În al doilea rând, se remarcă faptul că, pentru **rezervorul suprateran**, apar în tabel **două verificări distincte cu forțe seismice diferite** — F_b = 20,6 kN pentru dimensionarea buloanelor de ancoraj (capitolul 4, unde se verifică un subansamblu local, bulon-șa, cu q = 1,5 specific unei prinderi mecanice) și F_b = 15,4 kN pentru dimensionarea radierului la răsturnare (unde q = 2,0, corespunzător unui element de beton armat cu o anumită capacitate reziduală de redistribuire). Această diferențiere nu este o inconsecvență, ci reflectă exact filozofia de calcul discutată în §9: **subansamblul cel mai fragil (ancorajul mecanic) primește coeficientul cel mai defavorabil**, în timp ce elementul de beton armat care îl susține, având o comportare structurală mai favorabilă, este verificat cu o forță ușor mai redusă — corespunzătoare, respectiv, verificării de rezistență locală a ancorajului (unde nu se dorește nicio marjă de plastificare) și verificării globale de stabilitate a fundației (unde o redistribuire limitată de eforturi este acceptabilă).

În al treilea rând, pentru **rezervorul subteran**, tabelul indică explicit "mișcare cu solul" în locul unui coeficient de comportare q — reluând discuția fizică din §2.3.2 și §3, aceasta reflectă faptul că mecanismul dominant de răspuns seismic al unui corp complet încastrat lateral în pământ nu mai este cel al unei mase libere care dezvoltă forțe de inerție relative față de reazemul ei, ci unul de antrenare solidară cu masa de pământ înconjurătoare — motiv pentru care efectul seismic asupra rezervorului subteran este catalogat drept "redus" și, așa cum s-a arătat, nu este verificarea dimensionantă pentru această variantă (flotația fiind dimensionantă în locul ei).

În fine, se cuvine menționat un aspect de detaliu tehnologic relevant pentru integritatea instalației, dincolo de structura propriu-zisă: **racordurile de conductă ale instalației GPL** (conductele de alimentare/evacuare care leagă rezervorul de pompă/dispenser) trebuie prevăzute cu **compensatoare sau racorduri flexibile**, capabile să preia deplasarea diferențiată care poate apărea între rezervor și restul instalației sub acțiune seismică (rezervorul suprateran, montat pe ancoraje relativ rigide, se poate deplasa/deforma ușor diferit față de conductele îngropate sau față de postamentul pompei) — cerință impusă explicit de normativul NTPEE și de prescripțiile ISCIR, menționată aici pentru completitudinea imaginii de ansamblu asupra siguranței seismice a întregii instalații, chiar dacă proiectarea conductelor și a compensatoarelor propriu-zise nu face obiectul acestui memoriu de rezistență a construcțiilor.

---

## 10. Materiale de construcție și caracteristici de calcul

Tabelul următor sintetizează materialele adoptate pentru fiecare componentă a ansamblului, cu clasa/marca și utilizarea specifică:

| Material | Clasă | Utilizare |
|---|---|---|
| Beton radier suprateran | C25/30 (XC2) | radier, fundații |
| Beton dală subterană | C30/37 (XC2/XA1) | contact apă/sol agresiv |
| Beton zid de foc | C25/30 | perete parafoc |
| Oțel-beton | BST500S | armături |
| Oțel profile | S235JR | copertină, șei |
| Buloane ancoraj | gr. 5.6/8.8 | ancoraje recipient, stâlpi |
| Oțel recipient (informativ) | P265GH | manta (ISCIR PT C4, producător) |

Alegerea diferențiată a claselor de beton între cele trei elemente principale de beton armat merită o scurtă recapitulare: radierul suprateran folosește **C25/30**, clasă curentă pentru o fundație expusă mediului exterior uscat-umed alternant (XC2), suficientă întrucât acest element nu este permanent în contact cu apa; dala subterană folosește **C30/37**, clasă superioară, cu clasă de expunere suplimentară **XA1** (agresivitate chimică slabă), justificată de contactul permanent cu apa subterană și de posibila prezență a unor agenți chimici slab agresivi în sol/apă freatică — o precauție prudentă care crește durabilitatea pe termen lung a elementului cel mai greu accesibil pentru inspecție/reparație din întregul ansamblu (fiind îngropat); zidul de foc folosește din nou **C25/30**, clasă suficientă din perspectivă structurală, grosimea de 0,25 m fiind cea care asigură performanța de rezistență la foc (§5.7), nu clasa de beton în sine.

Se reține, de asemenea, cu titlu strict **informativ** (fără a face obiectul verificării acestui memoriu, conform delimitării explicate în §1.7), marca de oțel a mantalei recipientului — **P265GH**, oțel pentru recipiente sub presiune la temperaturi ridicate/moderate, marcă standard folosită de producătorii de recipiente GPL certificate ISCIR — menționată aici doar pentru completitudinea informației tehnice generale asupra ansamblului, nu ca dată de intrare pentru vreun calcul structural din acest document.

---

## 11. Comportarea la foc a construcțiilor

Performanța la foc a diferitelor elemente ale ansamblului, corelată cu funcția și expunerea fiecăruia, se sintetizează astfel: **zidul de foc** atinge, așa cum s-a detaliat în §5.7, o clasă **REI 180-240** (grosimea de 0,25 m beton armat cu acoperire de 35 mm minim asigură REI 240, depășind cerința de bază de REI 180 și satisfăcând totodată cerința majorată aplicabilă atunci când zidul separă direct instalația de o construcție/proprietate învecinată); **stâlpii metalici ai copertinei** (HEA 160), fiind amplasați într-o structură complet deschisă, în aer liber, fără elemente de compartimentare care să rețină fumul sau căldura, beneficiază de clasificarea favorabilă acordată structurilor metalice neprotejate expuse liber, cu o cerință redusă de **R 15-30** (rezistență mecanică la foc pentru un interval scurt, suficient dat fiind că un incendiu într-o structură deschisă nu se poate dezvolta la fel de intens și susținut ca într-un spațiu închis compartimentat); **radierul și dala rezervorului** ating, prin masivitatea lor de beton armat (0,40 m grosime), o clasă **REI 120+**, larg suficientă pentru elemente de fundație; iar **cabina operatorului** necesită o clasă **REI 60-90**, cerință curentă pentru o construcție civilă de mici dimensiuni.

Zidul de foc rămâne, evident, elementul central al strategiei de securitate la incendiu a întregii stații — este singurul element gândit și dimensionat **specific** cu rol de protecție la incendiu (spre deosebire de celelalte elemente, la care performanța la foc rezultă mai degrabă ca o consecință a dimensionării lor structurale de bază), motiv pentru care grosimea sa de 0,25 m din beton clasă C25/30 a fost aleasă tocmai pentru a atinge, fără costuri suplimentare de material, clasa **REI 240**, cu o marjă de siguranță considerabilă față de cerința minimă de REI 180.

---

## 12. Verificarea tehnică a proiectului și delimitarea cu documentația ISCIR

### 12.1. Verificarea tehnică duală A1 + A2

Fiind un ansamblu care combină structuri din **beton armat** (radier/dală rezervor, zid de foc, fundații cabină și copertină) cu structuri din **oțel** (stâlpii și grinzile copertinei, șeile de sprijin ale rezervorului, buloanele de ancoraj), documentația tehnică a acestui proiect necesită **verificare tehnică duală**, de către verificatori de proiecte atestați MDLPA pe **ambele** cerințe de rezistență mecanică specifice materialului: cerința **A1** (structuri de rezistență din beton, beton armat și zidărie) acoperă radierul/dala rezervorului, zidul de foc, fundațiile cabinei și fundațiile izolate ale copertinei; cerința **A2** (structuri de rezistență din oțel — notată în unele documente și "Af", pentru structuri metalice) acoperă stâlpii și grinzile copertinei, precum și, punctual, calculul buloanelor de ancoraj și al șeilor metalice de sprijin ale rezervorului. Se adaugă, suplimentar acestor două cerințe de rezistență mecanică, cerința **Af** (geotehnic), pentru verificarea studiului geotehnic care fundamentează atât presiunea convențională a terenului cât și, esențial pentru acest proiect, nivelul hidrostatic maxim de calcul folosit în verificarea la flotație (§2.3), și cerința **C** (securitate la incendiu), pentru verificarea scenariului de securitate la incendiu în care zidul de foc joacă rolul central.

Această dualitate de verificare (A1 + A2, alături de Af și C) nu este o particularitate administrativă minoră, ci reflectă chiar eterogenitatea structurală a ansamblului discutată încă din §1.1: un singur verificator, specializat exclusiv pe beton sau exclusiv pe metal, nu ar putea acoperi întreaga documentație tehnică a acestei stații — este necesară, de la bun început, planificarea circuitului de verificare cu ambii verificatori implicați în paralel, aspect pe care proiectantul de rezistență trebuie să îl comunice explicit beneficiarului la faza de contractare a verificării tehnice, pentru a evita întârzieri în obținerea autorizației de construire.

### 12.2. Delimitarea cu documentația ISCIR a recipientului

Așa cum s-a subliniat încă din nota preliminară și reluat în §1.7, **recipientul GPL propriu-zis** — mantaua din oțel P265GH, fundurile bombate, racordurile, armăturile de siguranță — **nu este verificat de verificatorii atestați MDLPA** și **nu face obiectul verificării tehnice A1/A2** din acest memoriu. Recipientul este certificat printr-un circuit administrativ complet separat, guvernat de legislația ISCIR: producătorul recipientului întocmește documentația tehnică de calcul a mantalei conform **PT C4** (verificare la presiune interioară de calcul, la proba hidraulică de 1,5× presiunea de lucru, la coroziune, la oboseală dacă e cazul), efectuează probele reglementate (proba hidraulică menționată și în §2.1 și §8.1 ca acțiune de calcul asupra fundației, deși recipientul însuși nu este calculat de proiectantul de rezistență) și obține avizul/certificarea ISCIR necesară punerii în funcțiune, conform **PT C7** pentru instalațiile specifice de GPL.

Singura interfață dintre cele două documentații (structura de rezistență, obiectul acestui memoriu, și documentația ISCIR a recipientului, întocmită separat de producător) este **transferul de date de intrare**: masele recipientului (tară, plin, probă hidraulică — §2.1), geometria sa (diametru, lungime, poziția șeilor — §2.1), și eventual poziția centrului de greutate folosită în calculul de ancorare seismică (§4) — toate acestea sunt preluate din documentația tehnică a producătorului recipientului ca date certe de intrare pentru calculul structurii de susținere, fără ca proiectantul de rezistență să recalculeze sau să pună la îndoială valorile respective, atâta vreme cât ele provin dintr-o documentație de producător certificată ISCIR valabilă.

Este responsabilitatea beneficiarului/investitorului să se asigure că, la depunerea documentației complete pentru autorizarea construirii și, ulterior, pentru punerea în funcțiune a stației, sunt prezente **ambele** seturi de documente — memoriul de rezistență verificat A1/A2 (obiectul de față) și documentația ISCIR a recipientului (carte tehnică, certificat de conformitate, aviz de funcționare) — cele două fiind complementare și, ambele, obligatorii, dar niciodată substituibile una prin cealaltă.

---

## 13. Plan de control al calității la execuție

Execuția unei stații GPL, spre deosebire de execuția unei construcții civile obișnuite, presupune o coordonare strânsă între **echipa de construcții** (care execută radierul/dala, zidul de foc, fundațiile copertinei și cabinei) și **echipa de montaj a instalației tehnologice** (care pune în operă recipientul certificat ISCIR, conductele, pompa și dispenserul), cu puncte de control obligatorii de ambele părți înainte de trecerea la faza următoare. Se recomandă, pentru execuția corectă a structurilor tratate în acest memoriu, următorul plan minimal de control al calității:

- **Recepția materialelor:** certificate de calitate pentru betoane (rapoarte de încercare pe cuburi/cilindri, pe fiecare clasă folosită — C25/30 la radier și zid de foc, C30/37 la dala subterană), certificate 3.1 (conform SR EN 10204) pentru oțelul-beton BST500 și pentru profilele metalice S235 ale copertinei, certificate pentru buloanele de ancoraj (grad 5.6/8.8) cu marcajul de grad de rezistență vizibil la livrare.
- **Controlul geometric la trasare și cofrare:** verificarea poziției exacte a radierului/dalei față de axele instalației de conducte (esențială pentru varianta subterană, unde poziția rezervorului îngropat trebuie să corespundă exact planului de instalații, orice decalaj ulterior fiind extrem de costisitor de corectat), verificarea cotelor de nivel (fața superioară a radierului, adâncimea dalei subterane, cota de îngheț adoptată).
- **Controlul armării înainte de turnare:** verificarea diametrelor și distanțelor între bare conform planșelor (Ø14/150 la radierul suprateran, Ø16/150 la dala subterană, Ø12/150 respectiv Ø10/200 la zidul de foc), verificarea acoperirii minime cu beton (cu atenție specială la acoperirea de minimum 35 mm impusă la zidul de foc pentru performanța la foc REI 240, verificare distinctă de acoperirea minimă cerută strict din considerente de durabilitate), verificarea poziției mustăților de ancoraj și a plăcilor de bază înainte de turnarea betonului.
- **Poziționarea și fixarea buloanelor de ancoraj înainte de turnare:** aceasta este o etapă critică specifică acestui proiect — buloanele M20 ale șeilor rezervorului (§4) trebuie poziționate cu precizie milimetrică față de planul de montaj al recipientului furnizat de producătorul ISCIR, folosind șabloane de poziționare (template-uri) rigide, întrucât o eroare de poziționare descoperită după turnarea betonului nu poate fi corectată decât prin carotare și reancorare chimică, soluție de remediere costisitoare și care necesită o verificare suplimentară a capacității portante a ancorajului reparat.
- **Hidroizolarea cuvei subterane** (numai pentru varianta B): control al continuității hidroizolației aplicate pe fețele exterioare ale dalei/cuvei, cu probă de etanșeitate (umplere cu apă sau inspecție vizuală a rosturilor) înainte de acoperirea cu umplutură — orice fisură sau discontinuitate a hidroizolației nedepistată la această etapă devine practic inaccesibilă după finalizarea umpluturii de acoperire.
- **Controlul compactării umpluturii de lestare** (numai pentru varianta B): gradul de compactare a pământului de acoperire dislocat deasupra rezervorului subteran este o dată de intrare directă în verificarea la flotație din §2.3 (greutatea stabilizatoare de 42,0 kN considerată submersată presupune o anumită densitate în operă a acestei umpluturi) — se recomandă încercări de control al gradului de compactare (Proctor) pe straturi, cu documentarea rezultatelor în cartea tehnică a construcției, tocmai pentru a putea demonstra ulterior, dacă este necesar, că ipoteza de calcul din §2.3.4 a fost respectată în execuție.
- **Controlul sudurilor** la structura metalică a copertinei (îmbinări stâlp-grindă) și la ansamblul șeilor de sprijin ale rezervorului: control vizual 100%, cu control suplimentar prin lichide penetrante pe sudurile de răspundere (prinderea șeilor de manta, dacă aceasta se execută pe șantier și nu este parte a recipientului certificat livrat integral asamblat de producător).
- **Pretensionarea/strângerea buloanelor de ancoraj:** control al cuplului de strângere aplicat la buloanele M20 ale șeilor și M30/M16 ale copertinei/cabinei, cu fișă de control al momentului de strângere per bulon, păstrată în cartea tehnică a construcției.
- **Proba hidraulică a recipientului** (executată și certificată de producător/instalator autorizat ISCIR, nu de constructor): constructorul trebuie totuși informat de programarea acestei probe, întrucât, așa cum s-a arătat în §2.1 și §8, proba hidraulică reprezintă gruparea de încărcare cea mai mare pe radier/dală (63,3 kN, comparativ cu 37,5 kN în exploatare curentă) — este de dorit ca la momentul probei constructorul să confirme vizual absența oricărei fisurări sau tasări vizibile a radierului sub această încărcare majorată, ca o verificare suplimentară, informală, dar utilă, a corectitudinii execuției.

Toate aceste puncte de control se documentează în cartea tehnică a construcției, alături de procesele-verbale de lucrări ascunse (obligatorii în special pentru armătura radierului/dalei, pentru hidroizolația cuvei subterane și pentru poziția finală a buloanelor de ancoraj înainte de turnare), documente care rămân esențiale pe toată durata de exploatare a stației, inclusiv pentru orice intervenție ulterioară de mentenanță sau pentru o eventuală expertiză tehnică.

---

## 14. Concluzii și sinteza verificărilor

### 14.1. Tabelul sintetic al verificărilor

Tabelul următor recapitulează toate verificările efectuate în acest memoriu, cu rezultatul numeric obținut și starea finală:

| Verificare | Rezultat | Stare |
|---|---|---|
| Presiune teren radier | 15,2 < 200 kPa | ✔ |
| Răsturnare radier (seism) | fără desprindere | ✔ |
| Alunecare suprateran | FS 2,66 | ✔ |
| Flotație dală subterană | FS 1,39/1,69 | ✔ |
| Ancorare buloane recipient | << capacitate | ✔ |
| Zid de foc armătură + răsturnare | FS 1,85 | ✔ |
| Copertină sucțiune | FS 3,9 | ✔ |
| Rezistență foc zid | REI 240 ≥ 180 | ✔ |

### 14.2. Sinteza fenomenelor dimensionante

Rezultatul de ansamblu al acestui memoriu confirmă, prin calcul detaliat, structura conceptuală prezentată încă din capitolul introductiv: acest ansamblu de construcții **nu are un singur fenomen dimensionant unic**, aplicabil identic tuturor obiectelor, ci fiecare obiect este guvernat de un fenomen structural propriu, distinct: la **varianta suprateran** a rezervorului, dimensionant este **seismul, prin combinația de răsturnare a radierului și smulgere/forfecare a ancorajelor**, evaluat pentru rezervorul plin (masa maximă de exploatare, generatoare a forței de inerție maxime); la **varianta subterană**, dimensionantă este **flotația (fenomenul UPL)**, evaluată pentru scenariul acoperitor al rezervorului gol combinat cu nivelul freatic maxim de calcul — un fenomen de natură hidrostatică, complet diferit de seism, și practic absent din calculul obișnuit al construcțiilor civile; **zidul de foc**, deși un simplu perete de beton armat la prima vedere, este dimensionat de **seismul acționând pe un element în consolă**, cu o marjă care depășește cu aproape 40% solicitarea din vânt — rezultat contraintuitiv, dar confirmat riguros de calcul; iar **copertina**, structură metalică ușoară și deschisă, este dimensionată nu de încărcarea gravitațională uzuală (zăpadă, greutate proprie), ci de **sucțiunea vântului**, fenomen de ridicare aerodinamică specific structurilor ușoare izolate, care guvernează ancorarea la fundație a stâlpilor.

Această diversitate de fenomene dimensionante — seism cu răsturnare, flotație hidrostatică, seism pe consolă, sucțiune aerodinamică — este, în opinia proiectantului, chiar trăsătura cea mai relevantă a acestui tip de investiție din perspectivă structurală: o stație GPL, deși modestă ca suprafață construită și ca volum de investiție comparativ cu o clădire obișnuită, reunește o diversitate de teme de calcul structural comparabilă cu cea a unor construcții mult mai complexe, tocmai datorită naturii sale hibride (recipient sub presiune + construcții civile auxiliare + eventuală îngropare) și a nivelului de risc tehnologic asociat conținutului inflamabil sub presiune.

### 14.3. Verificarea tehnică și fazele următoare

**Verificarea tehnică** a documentației se realizează, așa cum s-a detaliat în capitolul 12, de către verificatori atestați MDLPA pe cerințele **A1/A2** (structuri de beton și, respectiv, de metal), **Af** (geotehnic — cu atenție specială asupra confirmării nivelului hidrostatic maxim folosit în verificarea la flotație) și **C**/**Ci** (securitate la incendiu — cu atenție specială asupra performanței zidului de foc). Recipientul sub presiune propriu-zis face obiectul unei **documentații ISCIR separate**, întocmită și certificată de producătorul recipientului, complementară, dar independentă de prezentul memoriu de rezistență, conform delimitării explicate pe larg în §1.7 și §12.2.

Toate calculele de predimensionare prezentate în acest memoriu sunt corecte ca metodă și rezultate pentru datele de amplasament adoptate la faza DTAC; ele urmează a fi **confirmate și detaliate la fazele PTh și Detalii de Execuție** — planșe de armare complete pentru radier/dală/zid de foc, plan de ancoraj cu poziționarea exactă a buloanelor și chingilor, listă de bare, caiet de sarcini pentru execuție (inclusiv precizări specifice privind hidroizolarea cuvei subterane, dacă se alege varianta B, și procedura de control al compactării umpluturii de lestare din jurul rezervorului îngropat) — pe baza studiului geotehnic definitiv, a confirmării datelor de hazard din hărțile naționale actualizate (P100-1, CR 1-1-3, CR 1-1-4) și a documentației tehnice definitive a recipientului furnizate de producătorul certificat ISCIR al acestuia.
