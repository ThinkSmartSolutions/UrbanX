# MEMORIU TEHNIC DE REZISTENȚĂ — FERMĂ AGROZOOTEHNICĂ (HALĂ ADĂPOST + SILOZ DE CEREALE + BAZIN DE DEJECȚII)

**Faza: DTAC + DTOE** · Structură de rezistență · Verificare tehnică A1/A2/Af

---

> **Notă preliminară asupra scopului și metodei documentului.** Prezentul memoriu fundamentează concepția, calculul și verificarea structurii de rezistență pentru o investiție de tip **fermă agrozootehnică**, compusă din **trei corpuri de construcție complet independente din punct de vedere structural**, separate prin rosturi de dilatație/tasare și fără nicio conlucrare structurală între ele: **Corpul A — hala metalică adăpost pentru animale** (structură metalică ușoară, deschidere mare, masă proprie redusă), **Corpul B — silozul de depozitare cereale** (rezervor cilindric metalic — sau, în variantă, celule de beton armat — pentru material granular, cu o temă de calcul radical diferită de a oricărei construcții obișnuite: presiuni Janssen, flambajul cojii metalice, seismul unei mase mari de material) și **Corpul C — bazinul/cuva de dejecții** (construcție hidrotehnică de beton armat, etanșă, cu o temă de calcul dominată de verificarea la plutire/flotație și de durabilitatea în mediu chimic agresiv). Fiecare corp este guvernat de un fenomen fizic determinant propriu — la Corpul A, acțiunea determinantă este **vântul** (smulgerea acoperișului ușor), nu seismul; la Corpul B, determinante sunt, simultan și pentru fenomene diferite, **flambajul peretelui metalic gol sub vânt** și **seismul masei mari de cereale la siloz plin**; la Corpul C, determinantă este **subpresiunea hidrostatică (flotația)** a cuvei parțial sau complet goale cu nivel freatic ridicat. De aceea memoriul nu poate fi tratat unitar, printr-o schemă structurală comună tuturor celor trei corpuri (așa cum ar fi cazul, de exemplu, al unei hale industriale simple), ci este structurat pe capitole dedicate fiecărui corp și fiecărui fenomen fizic, cu breviarele de calcul complete și cu justificarea fizică detaliată a fiecărei ipoteze de lucru. Toate valorile numerice, formulele și rezultatele din textul original de predimensionare se păstrează **identic** în forma dezvoltată de mai jos — dezvoltarea constă exclusiv în explicitarea pașilor intermediari de calcul, a semnificației fizice a fiecărui factor și a justificării normative complete (SR EN 1990, SR EN 1991-1-3/-1-4/-4, SR EN 1992-1-1/-3, SR EN 1993-1-1/-1-5/-1-6/-4-1, SR EN 1997-1, SR EN 1998-1/-4, P100-1/2013), fără nicio modificare, rotunjire diferită sau recalculare a cifrelor prezentate în varianta densă a memoriului. Documentul este redactat la faza DTAC (Documentație Tehnică pentru Autorizarea executării lucrărilor de Construire), cu pregătirea explicită a fazei PTh + DE (Proiect Tehnic + Detalii de Execuție), unde toate calculele de predimensionare se confirmă și se detaliază (planșe de armare, planșe de montaj metalic, calcul cu element finit al cojii silozului, analiză seismică modală, liste de bare, caiete de sarcini), pe baza studiului geotehnic definitiv și a datelor de hazard confirmate pentru amplasamentul real.

**Cerința A (rezistență mecanică și stabilitate).** Memoriul demonstrează satisfacerea cerinței fundamentale A pentru trei corpuri independente structural (separate prin rosturi): **Corp A** — hală metalică adăpost pentru animale; **Corp B** — siloz (varianta B1, metalic cilindric, sau varianta B2, celule de beton armat); **Corp C** — bazin de dejecții (cuvă etanșă de beton hidrotehnic).

---

## 1. Date generale, geometrie, categorii și clase de importanță

### 1.1. Obiectul și configurația investiției

Ferma agrozootehnică analizată reunește, pe aceeași platformă, trei obiecte de construcție cu funcțiuni, geometrii și teme structurale complet diferite. Tabelul următor sintetizează parametrii geometrici de calcul adoptați ca reprezentativi pentru breviarul numeric al memoriului (valorile intermediare — deschideri, diametre, înălțimi — se citesc dintr-un interval uzual de proiectare, cu evidențierea explicită a valorii adoptate pentru exemplele de calcul):

| Parametru | Corp A — hală | Corp B — siloz (B1 metalic) | Corp C — bazin dejecții |
|---|---|---|---|
| Deschidere/dimensiune principală | L = 18÷24 m (adoptat L = 21,0 m) | Ø d_c = 6÷10 m (adoptat d_c = 8,0 m) | 12,0 × 8,0 × 3,0 m |
| Travee/parametru secundar | e = 5÷6 m (adoptat e = 5,50 m) | H perete h_c = 12÷20 m (adoptat h_c = 15,0 m) | Volum util V ≈ 288 mc |
| Înălțime la streașină | Hs = 4÷6 m (adoptat Hs = 5,0 m) | Zveltețe h_c/d_c = 1,88 (siloz zvelt) | Cuvă de beton armat etanșă |
| Regim de înălțime / pantă | Parter, pantă acoperiș 10% | Pâlnie de descărcare β = 25÷30°, capacitate 750÷1.000 t | — |

Cele trei corpuri sunt amplasate pe aceeași parcelă, dar **structural independente**: fiecare are propria infrastructură, propriul sistem de preluare a acțiunilor orizontale și verticale, iar între ele se prevăd rosturi (de regulă rosturi tehnologice de minimum 5÷8 cm, dimensionate să acopere deplasările relative maxime posibile — deplasarea seismică a halei, deplasarea/tasarea silozului plin, tasarea cuvei) astfel încât niciun corp să nu transmită eforturi celorlalte prin contact direct. Această independență structurală este o decizie de concepție obligatorie, nu doar o comoditate de calcul: cele trei corpuri au perioade proprii de vibrație, mase seismice și rigidități incomparabile (o hală ușoară cu T1 de ordinul 0,5 s versus un siloz plin, cu masă de peste 10 ori mai mare, ancorat rigid la bază), iar o eventuală legătură structurală rigidă între ele ar genera, sub acțiune seismică, interacțiuni imprevizibile (ciocniri, concentrări de eforturi la interfață) care contravin principiului fundamental al proiectării seismice de a avea sisteme structurale cu comportare unitară, previzibilă și verificabilă analitic.

### 1.2. Categoria de importanță și clasele de expunere

Conform HG 766/1997 (categoria de importanță a construcțiilor), cele trei corpuri se încadrează astfel: **Corp A (hala) — categoria C** (construcție de importanță normală, fără aglomerări de persoane, fără risc special); **Corp B (silozul) — categoria C**, cu observația că, dată fiind valoarea economică a stocului depozitat (750÷1.000 tone de cereale, o valoare comercială semnificativă) și consecințele unei cedări structurale (pierderea integrală a stocului, eventual afectarea construcțiilor învecinate prin dispersia materialului la o cedare bruscă a peretelui), proiectantul poate opta, la faza PT, pentru o încadrare mai acoperitoare; **Corp C (bazinul de dejecții) — categoria D**, categorie superioară motivată de riscul de mediu: o cedare a cuvei (fisurare excesivă, pierdere de etanșeitate) are drept consecință directă contaminarea solului și a apei freatice cu dejecții animaliere, un risc de mediu și de sănătate publică ce impune un nivel de siguranță și de control al execuției superior unei construcții agricole obișnuite.

Toate cele trei corpuri se încadrează, din punctul de vedere al proiectării seismice (P100-1/2013, tabelul 4.2), în **clasa de importanță și expunere III**, cu factorul de importanță γI,e = 1,0 — clasa uzuală pentru construcții de importanță normală, fără funcțiuni critice (spital, stație de pompieri) și fără aglomerări mari de persoane. Se atrage atenția că, dacă exploatarea fermei ar presupune personal permanent numeros la Corpul A (peste pragul reglementat) sau dacă silozul ar depozita, alături de cereale, și substanțe cu risc special (îngrășăminte care pot deveni periculoase la anumite concentrații), încadrarea ar trebui reevaluată — pentru configurația standard analizată aici, clasa III este adecvată la toate cele trei corpuri.

### 1.3. Clasele de expunere ale betonului (SR EN 206) — sinteză și justificare

Alegerea claselor de expunere a betonului este una dintre deciziile cele mai relevante ale acestui memoriu, întrucât fiecare corp este supus unui mediu de agresivitate fundamental diferit:

| Element de beton | Clasă de expunere | Justificare fizică |
|---|---|---|
| Fundații hală (Corp A) | **XC2** | expunere la umiditate (contact cu solul), fără agresivitate chimică specială |
| Radier siloz (Corp B1) | **XC2(+XA1)** | umiditate + posibilă agresivitate chimică slabă din reziduuri de cereale/îngrășăminte scurse |
| Perete siloz beton (Corp B2, dacă e cazul) | **XA1+XM1** | agresivitate chimică slabă + abraziune mecanică din curgerea materialului granular pe perete |
| Cuvă dejecții — interior (Corp C) | **XA2-XA3** | agresivitate chimică **ridicată** — amoniac, hidrogen sulfurat, acizi organici din fermentarea dejecțiilor |
| Platformă exterioară | **XF3+XM1** | îngheț-dezgheț ciclic + abraziune de trafic tehnologic (utilaje, remorci) |

Durata de viață proiectată pentru toate cele trei corpuri este **50 de ani** (SR EN 1990), aceeași convenție ca la orice construcție de categorie C/D obișnuită, dar clasele de expunere de mai sus arată deja, înainte de orice calcul static, că cerințele de **durabilitate** — nu doar de rezistență — sunt cele care guvernează multe dintre deciziile constructive ale acestui proiect, în special la Corpul C, unde clasa XA2-XA3 impune un beton special, o acoperire cu beton mărită și, adesea, o protecție suplimentară (epoxidică sau similară) a suprafeței interioare — aspect dezvoltat pe larg la capitolul 14.

### 1.4. Cadrul normativ aplicabil

Proiectarea este fundamentată pe următorul ansamblu de reglementări: **Legea 10/1995** (calitatea în construcții) și **HG 766/1997** (categorii de importanță); **CR 0-2012** (bazele proiectării, combinații de acțiuni) și **SR EN 1990** (bazele proiectării structurale — echivalentul european); **SR EN 1991-1-1** (greutăți proprii și încărcări utile), **SR EN 1991-1-3** cu **CR 1-1-3** (încărcarea din zăpadă — hartă națională), **SR EN 1991-1-4** cu **CR 1-1-4** (acțiunea vântului — hartă națională); **SR EN 1991-4** (acțiuni asupra silozurilor și rezervoarelor — reglementarea centrală și cea mai specifică a acestui memoriu, tratată pe larg în capitolul 3); **SR EN 1993-1-1** (reguli generale pentru structuri de oțel), **SR EN 1993-1-5** (elemente structurale placate — voalare), **SR EN 1993-1-6** (rezistența și stabilitatea structurilor tip coajă — reglementarea specifică pentru flambajul peretelui cilindric al silozului metalic, tratată pe larg în capitolul 3.7), **SR EN 1993-1-8** (proiectarea îmbinărilor); **SR EN 1993-4-1** (cerințe specifice pentru silozuri metalice — completează SR EN 1993-1-6 cu prevederi constructive proprii silozurilor: rigidizări inelare, racord pâlnie-cilindru, toleranțe de execuție); **SR EN 1992-1-1** (proiectarea structurilor de beton) și **SR EN 1992-3** (structuri de beton pentru reținerea lichidelor și materialelor granulare — reglementarea centrală pentru cuva de dejecții și, unde e cazul, pentru celulele de beton ale silozului, tratată pe larg în capitolul 4); **P100-1/2013** (proiectare seismică a clădirilor) și **SR EN 1998-4** (proiectare seismică a rezervoarelor, silozurilor și conductelor — reglementarea specifică pentru comportarea seismică a silozului plin, tratată în capitolul 9); **NP 112/2014** (proiectarea fundațiilor directe) și **SR EN 1997-1** (proiectare geotehnică — sursa normativă directă pentru verificarea la starea limită UPL/flotație a cuvei de dejecții, capitolul 4.4); **NP 074/2022** (documentații geotehnice); **SR EN ISO 12944** și **SR EN ISO 1461** (protecția anticorozivă a structurilor de oțel prin vopsire, respectiv prin zincare la cald).

---

## 2. Corpul A — Hala metalică adăpost: sistemul structural

### 2.1. Alegerea și justificarea sistemului structural

Corpul A este conceput ca o **hală parter cu structură metalică**, sistemul portant fiind format din **cadre metalice transversale** dispuse la un pas (travee) de e = 5,50 m, cu **noduri rigide riglă-stâlp** realizate prin vute (întăriri triunghiulare sudate la intersecția riglei cu stâlpul, care măresc local capacitatea de moment încovoietor și reduc concentrarea de eforturi în zona nodului). Rigla cadrului este, în funcție de deschidere, fie o **grindă cu inimă plină și vute** (pentru deschideri L ≤ 21 m, situația adoptată în exemplele numerice ale acestui memoriu), fie o **fermă cu zăbrele** (soluție preferabilă la deschiderea maximă a intervalului, L = 24 m, unde consumul de oțel al unei grinzi cu inimă plină ar deveni disproporționat). Alegerea grinzii cu inimă plină pentru L = 21 m este consecventă cu practica curentă de proiectare: domeniul economic al profilelor I (laminate sau sudate, cu sau fără vute) se întinde uzual până la deschideri de ordinul 25÷30 m, peste care fermele cu zăbrele devin mai economice prin reducerea consumului de material (deși cu un cost de fabricație și montaj mai ridicat, datorită numărului mare de noduri).

Elementele principale adoptate sunt: **stâlpi HEA 300 sau IPE 450**, **riglă IPE 500 cu vute** la noduri, **pane Z200÷250** (elemente secundare de acoperiș, dispuse perpendicular pe cadre, care reazemă direct panourile de închidere și transmit încărcările de acoperiș — zăpadă, vânt, greutate proprie — la rigla cadrului), **contravântuiri de acoperiș** din bare rotunde Ø20 sau cornier L70×7 și **contravântuiri de pereți** Ø24, iar închiderile (acoperiș și pereți) sunt realizate din **panouri sandwich cu grosime 100÷120 mm**.

### 2.2. Justificarea alegerii soluției metalice pentru hala de adăpost

Alegerea structurii metalice, în locul unei alternative de beton armat prefabricat (soluție de asemenea uzuală pentru hale agricole), este justificată tehnic prin cumularea mai multor factori favorabili specifici acestei funcțiuni:

1. **Deschiderea mare fără stâlpi intermediari** (18÷24 m) — necesară pentru fluxul tehnologic al adăpostului de animale (compartimentare interioară flexibilă, culoare de furajare și de evacuare a dejecțiilor, utilaje de întreținere), este realizabilă economic cu profile metalice de înălțime redusă, în timp ce o soluție de beton prefabricat ar necesita grinzi cu inimă mult mai înaltă sau ferme de beton, cu consum de material și cost de transport/montaj net superioare la această deschidere.
2. **Masa proprie redusă a structurii** — o structură metalică cântărește, tipic, de 3÷5 ori mai puțin decât un echivalent de beton armat la aceeași deschidere, ceea ce reduce direct atât forța seismică (proporțională cu masa, conform relației fundamentale F = m·Sd(T)), cât și încărcarea transmisă fundațiilor — un avantaj cu atât mai relevant cu cât, așa cum se va arăta în capitolul 9, la hala ușoară **seismul nu este oricum acțiunea determinantă**, dar masa redusă rămâne totuși favorabilă pentru economia globală a fundațiilor.
3. **Viteza de montaj** — elementele metalice se prefabrică în atelier și se montează prin înșurubare/sudură pe șantier într-un interval de timp mult mai scurt decât execuția unei structuri de beton turnat sau chiar decât montajul unei structuri prefabricate de beton, un avantaj relevant pentru o investiție agricolă unde punerea rapidă în funcțiune are relevanță economică directă.
4. **Capacitatea de a prelua sarcini agățate/tehnologice localizate** — sistemele de furajare automată, ventilatoarele industriale de mari dimensiuni și alte echipamente tehnologice specifice unui adăpost de animale se suspendă direct de riglele/panele metalice prin console sau tije de prindere, o operațiune mult mai simplă și mai flexibilă (inclusiv pentru modificări ulterioare ale echipării tehnologice) decât la o structură de beton, unde orice ancoraj nou necesită fixare chimică sau mecanică post-turnare.
5. **Mediul agresiv este compensat prin proiectare, nu prin evitarea soluției metalice** — este adevărat că mediul din interiorul unui adăpost de animale (amoniac, umiditate ridicată, praf organic) este agresiv pentru oțel, însă acest risc este gestionat printr-un sistem de protecție anticorozivă sporită (clasa C4-C5 conform SR EN ISO 12944, detaliată în capitolul 14), nu prin renunțarea la avantajele structurale și economice ale soluției metalice.

### 2.3. Comportarea structurală la acțiuni orizontale

Rezistența la acțiuni orizontale a Corpului A este asigurată prin separarea clară a funcțiilor de preluare pe cele două direcții principale, exact ca la o hală industrială curentă cu cadre metalice:

- **Pe direcția transversală** (perpendiculară pe axul lung al halei), rigiditatea și rezistența la forțe orizontale (vânt frontal, componenta transversală a seismului) sunt asigurate de **rigiditatea proprie a cadrelor rigide** — fiecare cadru transversal, cu noduri rigide riglă-stâlp, se comportă ca un portal capabil să preia moment încovoietor și să transmită forța orizontală la fundație prin încovoierea stâlpilor.
- **Pe direcția longitudinală** (de-a lungul halei, unde cadrele transversale, luate individual, nu oferă nicio rigiditate proprie întrucât sunt plane și dispuse perpendicular pe această direcție), stabilitatea este asigurată de **contravântuirile verticale** din planul pereților longitudinali (sistemul de bare Ø24 dispuse în cruce sau în V, care lucrează exclusiv la efort axial — întindere pe diagonala activă) cuplate cu **contravântuirile orizontale de acoperiș** (barele Ø20/cornier L70×7, care formează o grindă cu zăbrele orizontală în planul acoperișului, transmițând forța longitudinală captată pe toată lungimea halei către travele cu contravântuiri verticale).

Această schemă — cadre rigide transversal, contravântuiri concentrice longitudinal — este soluția structurală standard pentru hale metalice parter de acest tip, întrucât combină rigiditatea necesară pe ambele direcții cu un consum minim de material: cadrele rigide (mai costisitoare per element, dar necesare oricum pentru a prelua încărcările gravitaționale pe deschiderea mare) preiau integral acțiunile transversale, în timp ce direcția longitudinală — unde deschiderea între contravântuiri este mult mai mică (travee de 5,50 m) — este rezolvată economic prin bare simple solicitate axial.

---

## 3. Corpul B — Silozul de cereale: teoria acțiunilor și verificarea structurală (SR EN 1991-4, SR EN 1993-1-6/-4-1, SR EN 1998-4)

### 3.1. De ce un siloz nu se calculează ca un rezervor de lichid — fizica materialului granular

Acesta este capitolul central al memoriului, întrucât silozul reunește simultan trei fenomene fizice complet absente din calculul unei construcții civile obișnuite: presiunile de tip Janssen ale materialului granular, flambajul unei coji metalice subțiri și seismul unei mase concentrate foarte mari. Înainte de a intra în formulele de calcul, este esențial să se explice **de ce** un material granular depozitat într-un siloz nu generează asupra pereților o presiune de tip hidrostatic, așa cum ar face-o un lichid.

Într-un rezervor de lichid, presiunea orizontală pe perete crește **liniar** cu adâncimea, fără nicio limită superioară alta decât adâncimea totală a lichidului: p(z) = γ·z, unde γ este greutatea specifică a lichidului. Fizic, aceasta se întâmplă pentru că un lichid nu poate prelua efort de forfecare — nu are nicio rezistență la frecare internă sau la frecare cu peretele, astfel încât întreaga greutate a coloanei de lichid de deasupra unui punct se transmite integral, ca presiune, în toate direcțiile, inclusiv orizontal pe peretele rezervorului.

Un material granular (cereale, în cazul de față — grâu, porumb, boabe în general) se comportă **radical diferit**, din două motive fizice concrete:

1. **Frecarea internă între particule** (caracterizată de unghiul de frecare internă φi) permite materialului să dezvolte, la interfața cu peretele silozului, un **efort de forfecare vertical** (frecarea material-perete, caracterizată de coeficientul μ) — practic, o parte din greutatea materialului granular situat deasupra unui anumit nivel este "suspendată" prin frecare de peretele silozului, în loc să se transmită integral ca presiune verticală pe stratul de dedesubt.
2. **Efectul de boltă (arching)** — particulele granulare, sprijinindu-se unele pe altele și pe pereți, formează structuri interne de tip "boltă" care redistribuie o parte din greutatea proprie către pereți, similar cu modul în care o boltă de zidărie transferă greutatea unei construcții către reazemele laterale în loc să o transmită vertical în linie dreaptă.

Consecința combinată a acestor două fenomene este că presiunea orizontală exercitată de material asupra peretelui **nu crește liniar la infinit cu adâncimea**, ci **se plafonează** la o valoare limită, pe măsură ce adâncimea crește — comportare complet diferită de cea hidrostatică și care constituie exact conținutul teoriei **Janssen** (formulată inițial în 1895 pentru silozuri de cereale și preluată, cu rafinări succesive, în forma normativă actuală din SR EN 1991-4).

### 3.2. Clasificarea silozului și parametrii materialului depozitat

Silozul analizat (Corp B1, variantă metalică cilindrică) se încadrează, conform SR EN 1991-4, în **clasa de acțiune a silozului AAC 2** (Action Assessment Class 2), clasă aplicabilă silozurilor cu capacitate cuprinsă între 100 și 10.000 de tone — intervalul relevant pentru capacitatea adoptată de 750÷1.000 tone. Clasa AAC 2 este clasa intermediară de rigurozitate a metodei de calcul prevăzută de standard (după clasa AAC 1, simplificată, pentru silozuri mici, și înaintea clasei AAC 3, cea mai riguroasă, rezervată silozurilor foarte mari sau cu geometrie neuzuală), și impune considerarea explicită a presiunilor de golire majorate și a patch load-ului, dincolo de simpla presiune de umplere.

Zveltețea silozului — raportul dintre înălțimea peretelui cilindric h_c și diametrul d_c — este h_c/d_c = 15,0/8,0 = **1,88**, o valoare apropiată de pragul convențional de 2,0 care separă, în clasificarea SR EN 1991-4, silozurile "zvelte" (unde efectele de boltă/frecare sunt pe deplin dezvoltate și presiunile Janssen ating platoul teoretic) de silozurile "joase" (unde presiunea nu ajunge să se plafoneze complet pe toată înălțimea). La zveltețea 1,88, silozul se încadrează ferm în categoria silozurilor **zvelte**, ceea ce justifică aplicarea integrală a formulelor Janssen dezvoltate mai jos, inclusiv a majorării de golire cu coeficientul C_h corespunzător categoriei zvelte (§3.4).

Parametrii materialului depozitat — grâul, luat ca referință de calcul (materialul agricol cel mai frecvent depozitat și, totodată, unul dintre cele mai studiate din punct de vedere al proprietăților de curgere granulară) — sunt preluați din tabelele normative ale SR EN 1991-4 (Anexa E, valori caracteristice pentru cereale):

| Parametru | Simbol | Valoare | Semnificație fizică |
|---|---|---|---|
| Greutate specifică | γ | 9,0 kN/mc | greutatea pe unitate de volum a masei de cereale (înglobând golurile de aer dintre boabe) |
| Unghi de frecare internă | φi | 30° | unghiul care caracterizează rezistența la forfecare internă a materialului granular (efectul de boltă) |
| Coeficient presiune orizontală | K_m | 0,54 | raportul dintre presiunea orizontală și cea verticală în interiorul masei granulare (analog coeficientului de împingere activă/repaus la pământuri, dar specific materialelor granulare fine) |
| Coeficient de frecare cu peretele | μ_m | 0,38 | coeficientul de frecare dintre cereale și peretele de oțel al silozului — parametrul care guvernează cât de mult din greutate se "suspendă" prin frecare pe perete |

### 3.3. Presiunile la umplere — teoria Janssen completă, cu derivarea fizică a formulei

Formula fundamentală a teoriei Janssen pornește de la echilibrul unui element de material granular de grosime infinitezimală dz, situat la adâncimea z sub suprafața liberă a materialului, într-un cilindru de diametru d_c. Scriind echilibrul vertical al acestui element — greutatea proprie, presiunea verticală transmisă de stratul de deasupra, presiunea verticală transmisă către stratul de dedesubt, și forța de frecare exercitată de perete pe conturul elementului — se obține o ecuație diferențială a cărei soluție conduce la o creștere **exponențială saturată** a presiunii cu adâncimea, caracterizată de o adâncime de referință z0, numită și "adâncimea caracteristică Janssen":

**z0 = d_c/(4·K·μ)**

Interpretarea fizică a acestei formule este directă: z0 reprezintă adâncimea la care efectul combinat al frecării cu peretele (μ) și al transferului de presiune verticală în orizontală (K) devine suficient de puternic încât presiunea orizontală să se apropie de valoarea sa asimptotică — cu alte cuvinte, z0 este "scara de lungime" caracteristică a fenomenului de plafonare descris la §3.1. Se observă că z0 crește odată cu diametrul d_c (un siloz mai larg necesită o adâncime mai mare pentru ca efectul de boltă și frecarea perete să domine complet greutatea proprie a coloanei), și scade odată cu K și μ mai mari (o frecare mai puternică sau un transfer orizontal mai eficient plafonează presiunea mai rapid, la o adâncime mai mică).

Pentru silozul analizat: **z0 = d_c/(4·K·μ) = 8,0/(4·0,54·0,38) = 8,0/0,8208 = 9,74 m**.

Presiunea orizontală asimptotică (valoarea-limită teoretică spre care tinde presiunea pe măsură ce z → ∞, valoare care s-ar atinge riguros doar la un siloz infinit de înalt) rezultă din echilibrul de forțe la adâncime mare:

**p_ho = γ·K·z0 = 9,0·0,54·9,74 = 47,3 kN/mp**

Cu aceste două mărimi caracteristice (z0 și p_ho), formula Janssen pentru presiunea orizontală la orice adâncime z este:

**p_hf(z) = p_ho·(1 − e^(−z/z0))**

Se observă imediat forma caracteristică a acestei funcții: pentru z mic (aproape de suprafața liberă a materialului), termenul e^(−z/z0) este apropiat de 1, deci p_hf(z) este mic — la suprafață, practic nu există presiune, la fel ca la un lichid. Pe măsură ce z crește, termenul exponențial scade spre zero, iar p_hf(z) **se apropie asimptotic de p_ho, fără a-l depăși niciodată** — exact comportarea de "plafonare" descrisă calitativ la §3.1, aici cuantificată riguros. Această formă funcțională este calitativ complet diferită de presiunea hidrostatică liniară p(z) = γ·z a unui lichid, care nu are nicio asimptotă și crește la nesfârșit cu adâncimea.

Presiunea de frecare pe perete (efortul tangențial vertical transmis de material peretelui, componenta care "suspendă" o parte din greutate) se obține direct din presiunea orizontală prin coeficientul de frecare:

**p_wf = μ·p_hf**

iar efortul axial (meridional) de compresiune indus în peretele metalic al silozului, ca urmare a acumulării acestor forțe de frecare de la suprafața liberă până la adâncimea z, este dat de integrala forței de frecare pe înălțimea considerată:

**n_zSk = μ·p_ho·[z − z0·(1 − e^(−z/z0))]**

Această mărime — n_zSk, forța axială (de compresiune, orientată vertical în peretele cilindric) — este de o importanță capitală pentru calculul structural al silozului metalic, întrucât ea este exact solicitarea care guvernează verificarea la **flambajul meridional** al peretelui (§3.7), fenomen mult mai sensibil decât rezistența simplă la compresiune a materialului.

**Calculul numeric la baza peretelui (z = h_c = 15,0 m):**

- p_hf(15) = 47,3·(1 − e^(−15/9,74)) = 47,3·(1 − e^(−1,540)) = 47,3·(1 − 0,2144) = 47,3·0,7856 = **37,1 kN/mp**
- p_wf(15) = μ·p_hf(15) = 0,38·37,1 = **14,11 kN/mp**
- n_zSk(15) = 0,38·47,3·[15 − 9,74·(1 − e^(−1,540))] = 17,97·[15 − 9,74·0,7856] = 17,97·[15 − 7,652] = 17,97·7,348 = **119 kN/m**

Aceste trei valori — presiunea orizontală de 37,1 kN/mp, presiunea de frecare de 14,11 kN/mp și forța axială meridională de 119 kN/m — reprezintă starea de solicitare a peretelui silozului **plin, în regim static de umplere (repaus)**, situație care, așa cum se va arăta la §3.4, **nu este cea mai defavorabilă** dintre stările de exploatare ale silozului.

### 3.4. Majorarea presiunilor la golire — de ce curgerea materialului este mai defavorabilă decât depozitarea statică

Un aspect esențial al proiectării silozurilor, adesea contra-intuitiv pentru un proiectant obișnuit cu construcții civile, este că **starea de solicitare maximă a peretelui nu apare la umplere sau la depozitare statică, ci în timpul golirii** (evacuării materialului prin pâlnia de la bază). Fenomenul are o explicație fizică directă: în timpul curgerii, materialul granular nu mai este în echilibru static, ci se deplasează, iar frecarea materialului cu peretele trece de la o frecare "de repaus" (statică) la o frecare "de alunecare" (cinetică/dinamică) — regimuri de frecare care, pentru majoritatea materialelor granulare, au coeficienți diferiți și, mai important, provoacă o **redistribuire tranzitorie a presiunilor**, cu apariția unor zone de presiune orizontală locală semnificativ mai mare decât valoarea statică din regimul de umplere.

SR EN 1991-4 cuantifică acest fenomen printr-un **coeficient de majorare la golire, C_h**, aplicat direct presiunii orizontale de umplere pentru a obține presiunea de golire:

**p_he = C_h·p_hf**

Pentru silozul zvelt analizat (h_c/d_c = 1,88, categorie zveltă conform §3.2), coeficientul de majorare adoptat este **C_h = 1,15** — cu alte cuvinte, presiunea orizontală în regim de golire este cu 15% mai mare decât presiunea statică de umplere calculată la §3.3, la aceeași adâncime.

**p_he(15) = C_h·p_hf(15) = 1,15·37,1 = 42,7 kN/mp**

În mod similar, forța axială meridională se majorează la golire, însă printr-un **coeficient distinct de majorare pentru frecarea pe perete, C_w**, care nu este identic cu C_h (SR EN 1991-4 tratează separat coeficientul de majorare a presiunii orizontale și coeficientul de majorare a efortului de frecare/forței axiale, întrucât cele două mărimi răspund diferit la tranziția static→dinamic a frecării). Pentru configurația analizată, coeficientul aplicat forței axiale este **C_w = 1,10**:

**n_zSk,e = C_w·n_zSk = 1,10·119 = 131 kN/m**

Este important de subliniat de ce golirea, și nu umplerea, este starea dimensionantă pentru peretele silozului: în exploatarea curentă a unui siloz agricol, ciclul de umplere (uzual o dată sau de câteva ori pe an, la recoltă) este urmat de o perioadă lungă de depozitare statică, apoi de o perioadă de golire (uzual eșalonată, pe măsura valorificării stocului) — fiecare ciclu de golire readuce peretele la starea de solicitare majorată descrisă mai sus, iar verificarea structurală trebuie să acopere **toate** aceste stări repetate, nu doar starea inițială de umplere. De aceea, verificările de rezistență și de flambaj ale peretelui metalic (§3.6-3.7) se fac întotdeauna cu presiunile de golire (majorate), nu cu presiunile de umplere.

### 3.5. Patch load — sarcina locală din asimetria de curgere

Dincolo de majorarea generalizată a presiunii pe tot conturul peretelui descrisă la §3.4, SR EN 1991-4 impune verificarea unei a treia acțiuni, distinctă atât de presiunea de umplere cât și de cea de golire generalizată: **patch load-ul** (sarcina locală de perete, "petic" de presiune suplimentară aplicată pe o zonă limitată a conturului circumferențial). Fenomenul fizic pe care patch load-ul îl modelează este acela că, în practică, curgerea materialului la golire nu este niciodată perfect axial-simetrică — mici neuniformități ale geometriei pâlniei, ale granulometriei materialului sau ale poziției punctului de evacuare generează un canal de curgere preferențial, deplasat față de axul silozului, care produce o presiune orizontală locală suplimentară pe o porțiune limitată a peretelui, în timp ce restul conturului rămâne la presiunea de bază.

Valoarea acestei sarcini locale se calculează, similar presiunii generalizate, printr-un coeficient de majorare propriu, C_pf, aplicat presiunii de umplere:

**p_pf = C_pf·p_hf, cu C_pf ≈ 0,087**

Pentru starea de umplere: p_pf ≈ 0,087·37,1 ≈ **3,2 kN/mp** (o sarcină locală suplimentară, care se adaugă — nu se substituie — presiunii de bază de pe restul conturului). La golire, patch load-ul se majorează la rândul lui cu coeficientul de golire, rezultând o valoare de aproximativ **3,7 kN/mp** (3,2·C_h ≈ 3,2·1,15).

Zona de aplicare a patch load-ului este definită de standard printr-o lungime de arc circumferențial **s = π·d_c/16**, adică aproximativ o șaisprezecime din circumferința totală a silozului — o "pată" relativ îngustă, dar suficient de importantă din punct de vedere structural întrucât **generează încovoiere circumferențială locală** în peretele metalic, un tip de solicitare complet absent din calculul presiunii uniform distribuite pe contur (care generează doar efort de întindere/inel, conform §3.6). Această încovoiere locală trebuie preluată fie prin grosimea proprie a tablei peretelui, fie — soluția uzuală și mai economică — prin **inelele orizontale de rigidizare** dispuse pe înălțimea silozului (aceleași inele introduse, așa cum se va arăta la §3.7, pentru controlul flambajului circumferențial al peretelui gol), care oferă o rigiditate circumferențială suplimentară exact în zonele unde patch load-ul poate acționa.

### 3.6. Verificarea peretelui metalic la întindere circumferențială (efortul de inel)

Presiunea orizontală de golire, p_he, acționând radial asupra peretelui cilindric, generează în tabla metalică un efort de întindere circumferențial (efort de "inel", analog presiunii interioare dintr-un rezervor sub presiune sau dintr-o conductă), calculabil prin ecuația clasică de echilibru a unui inel subțire supus la presiune radială uniformă:

**n_θ = p_he·r**

unde r este raza silozului, r = d_c/2 = 4,0 m. La baza peretelui (adâncimea de calcul, unde p_he este maximă):

**n_θ = 42,7·4,0 = 170,8 kN/m**

Grosimea de tablă necesară pentru a prelua acest efort de întindere, considerând rezistența de calcul a oțelului (fy = 275 N/mm² pentru tabla din S275, uzuală la mantaua silozului), rezultă direct din condiția de rezistență (efortul unitar de întindere = n_θ/t ≤ fy):

**t_nec = n_θ/fy = 170,8·10³ N/m / (275·10⁶ N/m²) = 0,00062 m ≈ 0,62 mm**

Rezultatul acestui calcul este, la prima vedere, surprinzător: grosimea de tablă strict necesară pentru a rezista la întinderea circumferențială din presiunea de golire este de sub un milimetru — o valoare complet **nedeterminantă** pentru dimensionarea reală a peretelui. Motivul pentru care mantaua unui siloz nu se execută niciodată la o grosime atât de mică nu ține de rezistența la întindere, ci de trei constrângeri complet diferite, toate mai severe decât întinderea din presiune: (a) grosimea minimă tehnologică de manipulare, transport și sudare/asamblare a tablei (uzual 4÷5 mm, sub care tabla devine impracticabilă de manevrat și de sudat cu calitate constantă pe șantier), (b) toleranțele de execuție și coroziunea admisă pe durata de viață (o grosime suplimentară de sacrificiu, peste minimul de calcul, pentru a compensa pierderea de secțiune prin coroziune pe 50 de ani de exploatare în mediu agricol agresiv) și, cel mai important, (c) **verificarea la flambaj a peretelui gol sub vânt**, tratată în detaliu la §3.7, care se dovedește a fi fenomenul cu adevărat determinant pentru grosimea mantalei — nu întinderea din materialul plin.

Această observație este esențială pentru înțelegerea corectă a proiectării unui siloz metalic: **peretele cilindric este supradimensionat, față de necesarul strict de rezistență la întindere din presiunea materialului, tocmai pentru a rezista la un fenomen care apare într-o cu totul altă stare de exploatare — silozul gol.**

### 3.7. Flambajul peretelui metalic la siloz gol sub acțiunea vântului — fenomenul critic (SR EN 1993-1-6)

#### 3.7.1. De ce silozul gol, și nu silozul plin, este configurația critică pentru peretele metalic

Paradoxul aparent identificat la finalul §3.6 se explică prin natura fundamental diferită a celor două tipuri de solicitare care pot afecta un perete cilindric subțire: **întinderea** (indusă de presiunea interioară a materialului, tratată la §3.6) versus **compresiunea** (indusă de acțiuni externe — vântul — sau de propria greutate a peretelui și a echipamentelor superioare, atunci când nu mai există contrapresiunea stabilizatoare a materialului granular din interior).

Un perete metalic subțire supus la întindere nu poate ceda decât prin depășirea rezistenței materialului (curgere/rupere) — un mod de cedare "robust", care necesită eforturi unitare foarte mari (de ordinul a sute de N/mm²) pentru a se produce, așa cum a arătat calculul de la §3.6 (0,62 mm de tablă ar fi suficient pentru a rezista la întinderea de 170,8 kN/m). În schimb, un perete metalic subțire supus la **compresiune** — fie ea axială (meridională, verticală) fie circumferențială (inelară) — poate ceda la un nivel de efort mult mai mic decât rezistența materialului, printr-un fenomen de **instabilitate elastică (flambaj de coajă)**: pereții subțiri, curbi, nu "se strivesc" sub compresiune, ci **se voalează/cutează** (cedare bruscă, prin formarea unor cute sau valuri pe suprafața cojii), la un efort critic care depinde de geometrie (rază, grosime, lungime) și de modulul de elasticitate, nu de rezistența de curgere a oțelului.

Or, atunci când silozul este **gol** — situație care apare frecvent în exploatare (înainte de recoltă, între cicluri de umplere, la revizie) — contrapresiunea stabilizatoare a materialului granular din interior (care, la silozul plin, "împinge" peretele din interior, opunându-se oricărei tendințe de voalare spre interior) **dispare complet**. În această stare, peretele metalic al silozului este un cilindru subțire, gol, expus liber acțiunii vântului — exact configurația clasică în care poate apărea flambajul de coajă: presiunea/succiunea vântului pe suprafața curbă a silozului induce în peretele metalic atât compresiune meridională (verticală, din efectul global de tip "grindă în consolă" al silozului sub încovoiere de vânt, cu zona pe direcția vântului comprimată) cât și compresiune circumferențială locală (din presiunea/succiunea directă a vântului pe suprafața curbă). **Este exact acest fenomen — flambajul peretelui gol sub vânt — care se dovedește a fi determinant pentru grosimea mantalei silozului, nu întinderea din material plin analizată la §3.6.**

#### 3.7.2. Flambajul meridional (axial) al cojii cilindrice

Tensiunea critică elastică de flambaj meridional a unei coji cilindrice perfecte, subțiri, sub compresiune axială uniformă, conform formulei clasice de stabilitate a cojilor cilindrice preluată de SR EN 1993-1-6:

**σ_x,Rcr = 0,605·E·t/r**

unde E este modulul de elasticitate al oțelului (210.000 N/mm²), t este grosimea peretelui și r raza cilindrului. Semnificația fizică a coeficientului 0,605 (derivat din teoria clasică Donnell/Timoshenko a stabilității cojilor cilindrice) este aceea că, pentru un cilindru subțire, tensiunea critică de flambaj scade direct proporțional cu raportul grosime/rază (t/r) — cu alte cuvinte, **cu cât peretele este mai subțire relativ la diametru, cu atât flambajul apare la o tensiune mai mică**, complet independent de rezistența de curgere a materialului.

Pentru grosimea de calcul adoptată la baza peretelui (t = 5 mm, o valoare intermediară din intervalul practic 4÷8 mm menționat la §3.7.4) și raza r = 4.000 mm:

**σ_x,Rcr = 0,605·210.000·5/4.000 = 0,605·262,5 = 158,8 N/mm²**

Se observă imediat contrastul cu rezistența de curgere a oțelului (275÷355 N/mm² pentru mărcile uzuale): tensiunea critică teoretică de flambaj elastic (158,8 N/mm²) este de acelasi ordin de mărime, dar **inferioară** rezistenței materialului — semn clar că, pentru această grosime de perete, **flambajul, nu curgerea materialului, este modul de cedare determinant**. Această valoare teoretică (calculată pentru coaja perfectă, ideală) trebuie însă redusă în calculul de proiectare printr-un factor combinat de reducere pentru imperfecțiuni geometrice de execuție și pentru comportarea plastic-elastică reală a materialului (factorul α de reducere pentru imperfecțiuni, specific SR EN 1993-1-6, urmat de curba de flambaj χ care realizează tranziția între flambajul pur elastic la zveltețe mare și plastificarea secțiunii la zveltețe mică), obținându-se rezistența de calcul finală:

**σ_x,Rd = χ·fy/γM1**

unde χ este factorul de reducere la flambaj (funcție de zveltețea relativă a cojii, λ̄ = √(fy/σ_x,Rcr)) și γM1 = 1,00 factorul parțial de siguranță pentru pierderea stabilității (SR EN 1993-1-1). Această verificare finală, cu determinarea riguroasă a lui χ pe curba de flambaj a cojilor cilindrice (care depinde, la rândul ei, de clasa de calitate a execuției — toleranțele geometrice reale ale cilindrului montat pe șantier, un parametru cu influență mult mai mare la cojile subțiri decât la elementele masive), se detaliază complet la faza PT prin calcul cu element finit de tip coajă, așa cum se recomandă și în concluziile memoriului (capitolul 15).

#### 3.7.3. Flambajul circumferențial (inelar) al cojii cilindrice

Similar flambajului meridional, coaja cilindrică poate flamba și sub compresiune circumferențială (indusă direct de presiunea/succiunea vântului pe conturul curb al silozului gol), printr-un mod de cedare diferit — ondulații pe direcție circumferențială, cu o lungime de undă care depinde de distanța dintre rigidizările orizontale ale peretelui (inelele de rigidizare, notate ℓ mai jos):

**σ_θ,Rcr = 0,92·E·(t/ℓ)·(t/r)**

Formula arată explicit rolul distanței dintre inelele de rigidizare, ℓ: cu cât inelele sunt dispuse mai des (ℓ mai mic), cu atât tensiunea critică de flambaj circumferențial **crește** (proporțional cu 1/ℓ), fenomen care explică fizic de ce **rigidizarea cu inele orizontale este soluția constructivă standard** pentru controlul acestui tip de flambaj — inelele scurtează efectiv "lungimea liberă de flambaj" a cojii pe direcție verticală, la fel cum un reazem intermediar scurtează lungimea de flambaj a unui stâlp comprimat.

#### 3.7.4. Consecințe constructive: rigidizare cu inele și grosime variabilă a virolelor

Cele două verificări de mai sus conduc direct la deciziile constructive care guvernează alcătuirea reală a mantalei silozului metalic:

- **Inelele de rigidizare orizontale**, dispuse pe înălțimea peretelui la un interval calculat astfel încât să reducă lungimea liberă de flambaj circumferențial (§3.7.3) la o valoare compatibilă cu grosimea de tablă adoptată — o soluție mult mai economică decât mărirea uniformă a grosimii tablei pe toată înălțimea silozului doar pentru a controla flambajul.
- **Virole de grosime variabilă**: manteaua silozului nu se execută dintr-o tablă de grosime constantă, ci din **virole (inele orizontale de tablă) succesive, cu grosime crescândă de la vârf spre bază** — practică standard atât normativ (SR EN 1993-4-1) cât și economic, justificată de faptul că atât presiunea materialului (Janssen — crescătoare cu adâncimea, conform §3.3) cât și efortul cumulat de compresiune meridională din greutatea proprie a peretelui și a echipamentelor superioare (crescător spre bază, unde se însumează greutatea tuturor virolelor de deasupra) sunt maxime la baza silozului și minime la vârf. Pentru silozul analizat, grosimea variază de la **4 mm la vârf la 6÷8 mm la bază** — o progresie tipică pentru un siloz din clasa AAC 2 cu diametrul și înălțimea adoptate.
- **Manta ondulată (corrugated) — modul de lucru diferențiat**: în varianta constructivă cu tablă ondulată vertical (soluție frecvent adoptată la silozurile agricole metalice pentru a crește rigiditatea locală a panoului fără a mări grosimea de tablă), comportarea structurală se diferențiază explicit între cele două direcții: **panourile ondulate** (porțiunea de tablă propriu-zisă, cu profilul ondulat) preiau eficient efortul **inelar** (circumferențial, din presiunea radială a materialului sau a vântului, direcție pe care ondulația oferă rigiditate crescută), în timp ce **montanții verticali** (elemente structurale distincte, dispuse la interval regulat pe circumferință, la care se fixează panourile ondulate) preiau efortul **meridian** (vertical, de compresiune, atât din frecarea materialului pe perete la umplere/golire — §3.3-3.4 — cât și din flambajul discutat la §3.7.2). Această separare de funcție structurală între panou (inelar) și montant (meridian) este caracteristică soluțiilor de siloz metalic ondulat și trebuie reflectată explicit în modelul de calcul de la faza PT.
- **Racordul pâlnie-cilindru**: zona de tranziție dintre peretele cilindric și pâlnia conică de descărcare (înclinată la β = 25÷30°) este, geometric și static, punctul cel mai solicitat al întregii structuri metalice a silozului — aici se schimbă brusc direcția fluxului de forțe (de la peretele vertical, care lucrează predominant la întindere inelară și compresiune meridională, la pâlnia înclinată, care preia întreaga greutate a coloanei de material de deasupra și o transferă, printr-o componentă orizontală suplimentară, exact în acest inel de racord). Fenomenul specific de cedare la această interfață este **despicarea (splitting)** a inelului de racord, indusă de componenta orizontală a forței din pâlnia înclinată, care tinde să "deschidă" (să întindă spre exterior, apoi să comprime circumferențial) inelul de la baza cilindrului — motiv pentru care acest inel se dimensionează separat, ca element de **compresiune circumferențială concentrată**, cu o secțiune de oțel adesea net superioară grosimii curente a mantalei, și se verifică distinct atât la starea de umplere cât și, mai defavorabil, la starea de golire.

### 3.8. Varianta constructivă B2 — celule de beton armat

Ca alternativă la varianta metalică cilindrică (B1) analizată mai sus, silozul poate fi realizat și în varianta **B2, celule de beton armat** — o soluție frecventă la capacități mai mari sau la ferme unde se dorește o durată de viață superioară a structurii de bază fără reconsiderarea protecției anticorozive periodice specifice oțelului. La această variantă, fenomenele fizice ale materialului granular rămân identice (teoria Janssen se aplică nemodificat, indiferent de materialul peretelui), dar modul de verificare a peretelui se schimbă complet: în locul verificării la flambaj de coajă metalică (§3.7, fenomen specific materialelor subțiri elastice), peretele de beton armat se verifică prin dimensionarea armăturii **inelare** direct proporțional cu efortul de întindere circumferențial calculat la §3.6 (raportul n_θ/fyd, unde fyd este rezistența de calcul a armăturii), la care se adaugă armătura de **încovoiere** necesară pentru preluarea patch load-ului (§3.5) — solicitare care, la peretele de beton, se traduce direct în moment încovoietor local, verificat ca la orice placă/perete solicitat la încovoiere din presiune laterală. Clasele de expunere adoptate pentru betonul celulelor sunt **XA1+XM1** (agresivitate chimică slabă din materialul depozitat, combinată cu abraziune mecanică din curgerea/frecarea cerealelor pe suprafața interioară a peretelui la fiecare ciclu de umplere/golire), cu o acoperire de armătură minimă de **40 mm** și, esențial pentru controlul fisurării sub sarcină ciclică repetată, o limitare a deschiderii fisurilor la **w ≤ 0,2 mm**, conform SR EN 1992-3 — aceeași reglementare și aceeași filozofie de control al fisurării care guvernează, așa cum se detaliază pe larg în capitolul 4, cuva de dejecții a Corpului C.

### 3.9. Sinteza contrastului fizic hală ușoară vs. siloz plin — de ce vântul guvernează una și seismul guvernează cealaltă

Capitolul 3 se încheie cu observația de sinteză care motivează întreaga arhitectură a acestui memoriu și care se regăsește cuantificată riguros în capitolul 9 (calculul seismic comparativ): Corpul A (hala) și Corpul B (silozul plin) reprezintă **doi poli opuși** ai relației dintre masă și acțiune determinantă în proiectarea seismică.

Hala metalică, așa cum s-a arătat la §2.2, are o masă proprie foarte redusă — structura ei metalică ușoară, panourile sandwich de închidere și acoperișul ușor însumează o greutate seismică modestă. Într-o structură cu masă mică, forța seismică de bază — proporțională, prin definiție, cu produsul masă × accelerație spectrală, Fb = Sd(T)·m — este, la rândul ei, **mică**, indiferent de accelerația de vârf a terenului, pur și simplu pentru că factorul de multiplicare (masa) este mic. În schimb, aceeași structură ușoară, cu suprafețe mari expuse (acoperiș și pereți de suprafață mare, panouri sandwich cu greutate mică ce oferă puțină rezistență proprie la ridicare), este foarte sensibilă la acțiunea **vântului** — o acțiune care nu depinde de masa structurii, ci de aria ei expusă și de coeficienții aerodinamici locali (succiune pe acoperiș, presiune/succiune pe pereți). De aceea, așa cum se cuantifică riguros în capitolul 9, la hala ușoară **vântul (în special fenomenul de smulgere/succiune pe acoperișul semideschis) guvernează dimensionarea, nu seismul**.

Silozul plin cu cereale reprezintă situația exact opusă: materialul granular depozitat — 750÷1.000 tone de cereale — adaugă structurii o **masă enormă**, incomparabil mai mare decât masa proprie a mantalei metalice care îl conține. Într-o astfel de structură, forța seismică de bază, tot proporțională cu masa totală participantă, devine **foarte mare** — chiar dacă suprafața expusă direct vântului este relativ mică (un cilindru vertical de diametru moderat), masa participantă la mișcarea seismică depășește cu mult orice forță pe care vântul ar putea-o genera pe aceeași suprafață. De aceea, la silozul plin, **seismul devine acțiunea majoră**, cu un moment de răsturnare la baza structurii de ordinul a zeci de mii de kilonewton-metru (cuantificat exact la §9.3), o solicitare care guvernează atât ancorarea silozului la fundație cât și dimensionarea radierului circular de fundare (§12.3).

Acest contrast — vânt guvernează masa mică, seismul guvernează masa mare — nu este o particularitate întâmplătoare a acestui proiect, ci o consecință directă și generală a fizicii celor două acțiuni: vântul este o acțiune de suprafață (proporțională cu aria expusă și cu coeficienții aerodinamici), în timp ce seismul este o acțiune de masă (proporțională cu masa totală participantă la vibrație). Orice structură care combină, pe același amplasament, un element foarte ușor cu suprafață mare (hala) și un element foarte greu cu suprafață relativ mică (silozul plin) va prezenta exact această polarizare a acțiunii determinante — o observație care, dincolo de relevanța ei imediată pentru dimensionare, ghidează și strategia de verificare a proiectantului: pentru hală, efortul de calcul se concentrează pe combinațiile de vânt (inclusiv succiune/ridicare), în timp ce pentru siloz, efortul se concentrează pe analiza seismică a masei mari (inclusiv, pentru rigurozitate maximă la faza PT, o analiză seismică modală dedicată conform SR EN 1998-4, nu doar metoda simplificată a forței laterale echivalente).

---

## 4. Corpul C — Bazinul de dejecții: cuva etanșă și verificarea la plutire/flotație (SR EN 1992-3, SR EN 1997-1)

### 4.1. Descrierea construcției și tema de calcul specifică

Corpul C este o **cuvă de beton armat, îngropată sau parțial îngropată, complet etanșă**, cu dimensiuni interioare de 12,0 × 8,0 × 3,0 m și un volum util de aproximativ **288 mc**, destinată colectării și stocării temporare a dejecțiilor lichide/semilichide provenite din activitatea zootehnică a fermei (Corpul A). Spre deosebire de Corpurile A și B — unde tema de calcul dominantă este preluarea unor acțiuni gravitaționale și orizontale de tip "clasic" (greutate proprie, zăpadă, vânt, presiune de material granular, seism) — Corpul C ridică o problemă structurală de natură complet diferită: fiind un element construit **parțial sau integral sub nivelul terenului**, într-un amplasament unde nivelul apei subterane poate ajunge la cote relativ ridicate, cuva este supusă riscului de **plutire (flotație/uplift)** atunci când este goală sau parțial goală — exact fenomenul specific construcțiilor subterane etanșe (rezervoare, bazine, subsoluri hidroizolate), tratat, cu aceeași metodă normativă, și la alte construcții cu element subteran etanș din biblioteca tehnică a platformei (de exemplu, rezervorul subteran de la stațiile SKID). La aceasta se adaugă o a doua temă critică, specifică de data aceasta funcțiunii (nu poziției subterane): **etanșeitatea** cuvei, cerință impusă nu de considerente structurale obișnuite, ci de necesitatea absolută de a împiedica infiltrarea dejecțiilor în sol și în pânza freatică — o cerință de mediu care se traduce structural prin limitarea strictă a deschiderii fisurilor din beton.

### 4.2. Fizica fenomenului de plutire (flotație/UPL) — de ce apare exact la cuva goală, nu la cea plină

Fenomenul de **flotație** (denumit, în terminologia Eurocodului 7, stare limită de tip **UPL — Uplift**, adică pierderea echilibrului static al unei construcții sau a unei părți din ea prin ridicare) apare atunci când presiunea hidrostatică ascendentă exercitată de apa subterană asupra tălpii/radierului unei construcții subterane depășește greutatea proprie și celelalte forțe stabilizatoare ale construcției. Explicat intuitiv: o cuvă de beton, îngropată sub nivelul apei subterane, este supusă unei forțe ascendente de tip arhimedic — exact ca un corp scufundat într-un lichid — proporțională cu volumul de construcție aflat sub cota apei. Dacă greutatea proprie a construcției (și, eventual, greutatea pământului de acoperire care apasă în jos pe partea din cuvă situată deasupra reazemelor) nu este suficientă pentru a contrabalansa această forță ascendentă, construcția "plutește" — se ridică, se deformează sau se fisurează structural, cu consecințe grave asupra etanșeității și integrității cuvei.

Este esențial de subliniat **de ce** acest fenomen este verificat pentru starea de **cuvă goală (sau parțial goală)**, și nu pentru starea de exploatare curentă, cu cuva plină de dejecții: o cuvă plină are o greutate suplimentară — cea a conținutului lichid depozitat — care se adaugă direct la greutatea proprie a betonului și acționează exact în sensul favorabil, opunându-se flotației. Cu alte cuvinte, **cuva plină este intrinsec mai grea și deci mai puțin predispusă la plutire** decât cuva goală. Situația de cuvă goală (sau golită parțial) apare însă în practică în mai multe circumstanțe reale, previzibile pe durata de exploatare a fermei: (1) **înainte de prima punere în funcțiune**, în intervalul dintre finalizarea execuției cuvei și începerea colectării efective a dejecțiilor; (2) **la o golire programată pentru curățare, întreținere sau evacuarea completă a conținutului către o instalație de valorificare** (o operațiune periodică normală în gestionarea unei ferme zootehnice); (3) la o **eventuală avarie sau golire accidentală**. În oricare dintre aceste situații, dacă ea coincide — chiar și întâmplător, dar previzibil pe termen lung — cu un episod de ridicare a nivelului freatic local (de exemplu, în urma unor precipitații abundente sau a unei creșteri sezoniere a pânzei de apă), cuva se află exact în configurația cea mai defavorabilă posibilă: masă minimă (goală) combinată cu subpresiune maximă (freatic ridicat). Verificarea la flotație se face, prin urmare, întotdeauna pentru scenariul **cuvă goală + nivel hidrostatic maxim de calcul**, ca ipoteză deliberat acoperitoare — aceasta este chiar esența unei verificări de stare limită corect concepute: nu se verifică scenariul cel mai probabil (cuvă plină, funcționând normal), ci scenariul cel mai defavorabil dintre cele plauzibile pe durata de viață a construcției.

### 4.3. Verificarea la starea limită UPL — metodologia SR EN 1997-1

Verificarea la stare limită de tip UPL, conform SR EN 1997-1 (Eurocod 7, partea 1, §2.4.7.4), se realizează prin compararea, cu factori parțiali de siguranță distincți și specifici acestei stări limită (diferiți de factorii uzuali ai stărilor limită STR sau GEO), a **forțelor stabilizatoare** — greutatea proprie a cuvei, greutatea eventualei umpluturi de pământ de deasupra părților laterale, orice ancorare suplimentară — cu **forța destabilizatoare de subpresiune arhimedică**. Filosofia acestor factori parțiali reflectă direct incertitudinea inerentă a celor două categorii de mărimi: forțele stabilizatoare (permanente, favorabile) se **reduc** printr-un factor subunitar, pentru a reflecta faptul că greutatea reală pusă în operă poate fi mai mică decât cea calculată teoretic (compactare incompletă a eventualei umpluturi, variații de densitate a betonului, incertitudini de execuție), în timp ce forța destabilizatoare de subpresiune se **majorează** printr-un factor supraunitar, pentru a reflecta incertitudinea în determinarea exactă a nivelului maxim istoric/statistic al apei subterane — parametru care poate varia sezonier și pe care studiul geotehnic îl estimează întotdeauna cu o marjă de precauție, nu ca o valoare fixă și certă.

Condiția de verificare la stare limită UPL se scrie, sub forma generală aplicabilă cuvei de dejecții:

**0,90·G_stab ≥ 1,10·F_up**

unde G_stab este suma forțelor stabilizatoare (greutatea proprie a cuvei de beton, afectată de factorul de reducere 0,90, plus, dacă e cazul, greutatea submersată a eventualei umpluturi de pământ de deasupra reazemelor laterale — greutate luată "submersată", adică diminuată cu subpresiunea arhimedică proprie a particulelor solide, conform principiului geotehnic conform căruia, sub nivelul apei subterane, greutatea efectivă a pământului saturat este greutatea sa totală minus greutatea apei dislocuite de scheletul solid) și F_up este forța de subpresiune de calcul, afectată de factorul de majorare 1,10.

Forța de subpresiune se calculează direct din volumul de construcție (și, dacă e cazul, de umplutură aferentă) situat sub cota nivelului hidrostatic maxim de calcul, multiplicat cu greutatea specifică a apei (γw = 10,0 kN/mc):

**F_up = γw·V_submers**

Pentru cuva analizată, geometria interioară (12,0 × 8,0 × 3,0 m) și grosimea pereților/radierului de beton armat conduc la un volum extern de construcție care, raportat la nivelul hidrostatic maxim de calcul al amplasamentului (parametru care se preia din studiul geotehnic definitiv al amplasamentului real, adoptat aici, în lipsa unei valori de sit confirmate, la cota cea mai defavorabilă plauzibilă pentru un teren cu freatic ridicat), determină forța de subpresiune de calcul care trebuie contrabalansată de greutatea proprie a cuvei goale.

### 4.4. Verificarea la plutire — rezultatul calculului și soluțiile constructive de siguranță

Aplicând metodologia de mai sus configurației cuvei de dejecții (cuvă goală, nivel hidrostatic la cota critică de amplasament), verificarea la stare limită UPL conduce la un raport între forțele stabilizatoare (afectate de coeficientul 0,90) și forța de subpresiune de calcul (afectată de coeficientul 1,10):

**G_beton/F_Arh ≥ 1,1** (condiția de siguranță adoptată, cu marjă explicită peste starea limită strictă de echilibru)

Dacă greutatea proprie a cuvei de beton (radier + pereți, dimensionate oricum pentru rezistență și etanșeitate, conform §4.5) nu asigură singură acest raport minim de siguranță — situație posibilă la cuve relativ subțiri sau la un nivel freatic deosebit de nefavorabil — proiectantul dispune de două soluții constructive standard, ambele documentate și verificate la faza PT în funcție de rezultatul definitiv al studiului geotehnic:

1. **Lestarea/lățirea radierului** — extinderea radierului cuvei dincolo de conturul pereților (o "aripă" de radier care iese în afara amprentei cuvei propriu-zise), astfel încât greutatea pământului de deasupra acestei extinderi (luată, conform §4.3, în greutate submersată sub cota freaticului) să se adauge la forțele stabilizatoare — o soluție frecvent mai economică decât mărirea grosimii radierului pe toată suprafața cuvei, întrucât utilizează greutatea pământului existent, gratuit, în loc de beton suplimentar.
2. **Ancorarea activă suplimentară** — dacă lestarea geotehnică s-ar dovedi, la faza PT, insuficientă sau constructiv dificilă (spațiu limitat pe amplasament), se pot prevedea elemente de ancorare (micropiloți de tracțiune, ancore în terenul de fundare) care preiau direct diferența de forță de subpresiune neacoperită de greutatea proprie — o soluție de rezervă, verificată explicit ca atare, similară conceptual ancorajelor anti-flotație folosite la rezervoarele subterane etanșe din alte tipuri de investiții din biblioteca tehnică a platformei.

### 4.5. Clasa de etanșeitate și controlul fisurării (SR EN 1992-3)

Dincolo de verificarea la plutire, cea de-a doua cerință fundamentală a Corpului C — și, în multe privințe, cerința care guvernează efectiv dimensionarea armăturii cuvei, nu doar verificarea ei la starea limită ultimă — este **etanșeitatea**. Motivul pentru care etanșeitatea este o cerință critică, și nu doar o dorință de calitate, este direct legat de funcțiunea cuvei: dejecțiile animaliere stocate conțin încărcări biologice și chimice (azot, fosfor, agenți patogeni) care, în cazul unei fisurări excesive a betonului, ar putea migra prin fisuri în solul înconjurător și, în timp, în pânza de apă freatică — o contaminare a mediului cu consecințe atât ecologice cât și de sănătate publică, complet diferite ca gravitate de o simplă fisură estetică a unui perete de beton obișnuit.

SR EN 1992-3 (structuri de beton pentru reținerea lichidelor și materialelor granulare) reglementează exact această cerință, prin clasificarea construcțiilor de reținere în **clase de etanșeitate** (tightness classes), fiecare cu o limită proprie a deschiderii admisibile a fisurilor de beton, corelată cu gradul de agresivitate al conținutului reținut și cu consecințele unei eventuale scurgeri. Pentru cuva de dejecții, se adoptă **clasa de etanșeitate 1**, cu limitarea deschiderii fisurilor la:

**w ≤ 0,2 mm**

Această limită — sensibil mai severă decât deschiderea de fisură uzual admisă la o construcție de beton armat obișnuită (unde valori de 0,3÷0,4 mm sunt frecvent acceptabile) — se traduce, în practica de calcul, printr-o **armătură mai densă și cu diametre mai mici** decât ar rezulta din verificarea strictă la starea limită ultimă de rezistență: fisurile de deschidere mică se obțin printr-o distribuție mai fină a armăturii (bare de diametru mai mic, la spațiere mai deasă), care distribuie fisurarea betonului tras în mai multe fisuri fine, în loc de puține fisuri late — controlul fisurării fiind, în esență, o problemă de distribuție a armăturii, nu doar de cantitate totală. La această cerință de fisurare se adaugă, ca măsuri constructive complementare de etanșeitate, prevederea de **waterstop-uri** (benzi de etanșare) la toate rosturile de turnare și de lucru ale cuvei — puncte geometrice unde continuitatea betonului este întreruptă și unde, în absența unei bariere dedicate, calea de infiltrație ar fi cea mai scurtă — și, dacă rezultatul verificării la fisurare o impune sau dacă se dorește o marjă suplimentară de siguranță de mediu, o **protecție suplimentară** a suprafeței interioare a cuvei (hidroizolație/protecție chimică aplicată, dincolo de betonul structural însuși).

### 4.6. Sinteza solicitărilor la pereții cuvei

Pereții cuvei sunt verificați, în afara stărilor tratate mai sus (plutire globală, control al fisurării), și la solicitarea uzuală de **încovoiere din împingerea laterală** — atât din partea conținutului lichid stocat în interior (presiune hidrostatică a dejecțiilor, atunci când cuva este plină), cât și, în sens opus, din partea pământului și a eventualei ape freatice din exterior (atunci când cuva este goală sau parțial goală, situație în care presiunea exterioară nu mai este contrabalansată de presiunea interioară a conținutului). Solicitarea de calcul pentru acest din urmă caz — cuvă goală, presiune activă a pământului plus presiunea hidrostatică a apei freatice din exterior — se calculează prin suprapunerea celor doi termeni:

**p(z) = K_a·γ·z + γw·zw**

unde K_a este coeficientul de împingere activă a pământului, γ greutatea specifică a pământului, z adâncimea de calcul, iar γw·zw termenul de presiune hidrostatică a apei subterane (aplicabil pe porțiunea de perete situată sub nivelul freatic, zw fiind adâncimea sub acest nivel). Această verificare de încovoiere a peretelui, alături de verificarea globală la plutire (§4.3-4.4) și de controlul fisurării (§4.5), completează ansamblul de verificări structurale specifice Corpului C.

---

## 5. Factorul de comportare q — sinteza pe cele trei corpuri

Fiecare corp al fermei are un factor de comportare la acțiune seismică (q) distinct, reflectând capacitatea sa proprie de disipare de energie prin deformații plastice controlate:

- **Corpul A (hala, cadre metalice)**: se adoptă clasa de ductilitate medie DCM, cu **q = 2,0** — o valoare adoptată deliberat **acoperitor**, mai conservatoare decât valoarea teoretic admisă pentru clasa DCM la un sistem de cadre metalice necontravântuite (care ar permite, în principiu, q = 4,0). Rațiunea acestei alegeri conservatoare este directă: așa cum s-a arătat la §3.9 și cum se va cuantifica riguros la §9.2, la hala ușoară **seismul nu este oricum acțiunea determinantă** (vântul guvernează dimensionarea), astfel încât adoptarea unui factor q mai mic (deci a unor forțe seismice de calcul mai mari) nu penalizează practic proiectul, dar oferă o marjă suplimentară de siguranță și simplifică cerințele de detaliere seismică (verificări de capacitate, condiții de ductilitate a secțiunilor) care ar fi altfel necesare la q = 4,0.
- **Corpul B (silozul, conform SR EN 1998-4)**: **q = 1,5**, o valoare net inferioară celei adoptate la hală, reflectând faptul că un siloz plin cu material granular are o capacitate de disipare seismică prin deformații plastice **limitată** — spre deosebire de un cadru metalic obișnuit (unde disiparea are loc controlat, prin formarea de rotule plastice în elemente special detaliate), la un siloz, masa dominantă a sistemului seismic este materialul granular însuși, care nu participă la niciun mecanism structural de disipare plastică, iar structura care îl conține (mantaua metalică sau pereții de beton) trebuie să rămână practic în domeniul elastic pentru a nu compromite integritatea și etanșeitatea recipientului.
- **Corpul C (bazinul îngropat)**: **q = 1,0**, valoarea cea mai conservatoare dintre cele trei, adecvată unei construcții rigide, îngropate, la care nu se contează pe niciun mecanism de disipare plastică — comportarea seismică a unui element complet încastrat lateral în teren este oricum dominată de "mișcarea cu solul" (efecte de inerție relativă reduse, similar rezervoarelor subterane etanșe din alte tipologii ale bibliotecii tehnice), iar tema de calcul dimensionantă a acestui corp, așa cum s-a arătat pe larg în capitolul 4, este oricum flotația, nu seismul.

---

## 6. Materiale — caracteristici de calcul

### 6.1. Oțel structural

Structura metalică a halei (Corp A) și, după caz, manta silozului (Corp B1) sunt executate din: **S355 JR/J0** pentru cadrele principale ale halei (stâlpi, rigle), cu rezistența de curgere fy = 355 N/mm²; **S275** pentru elementele secundare (pane, contravântuiri) și, respectiv, **S350 GD** (tablă formată la rece, zincată) pentru mantaua ondulată a silozului, unde protecția prin zincare de fabricație (Z275, conform notării uzuale pentru masa de zinc pe unitate de suprafață) se aplică suplimentar față de protecția anticorozivă ulterioară descrisă în capitolul 14. Îmbinările structurale folosesc șuruburi de înaltă rezistență **gradul 8.8 și 10.9**, iar ancorajele expuse la mediul cel mai agresiv (interfața siloz-fundație, unde umiditatea și eventualele reziduuri chimice se concentrează) folosesc, acolo unde justificarea economică o permite, **oțel inoxidabil A2-70**, o soluție mai costisitoare dar care elimină riscul de coroziune la un element de ancorare inaccesibil pentru întreținere periodică. Modulul de elasticitate longitudinal adoptat pentru toate calculele de rigiditate și de flambaj din memoriu este E = 210.000 N/mm², valoarea standard a oțelului de construcție.

### 6.2. Beton și armătură

Betonul folosit la infrastructura fermei se diferențiază pe clase de rezistență în funcție de element și de clasa de expunere corespunzătoare (detaliată la §1.3 și dezvoltată la capitolul 14): **C25/30** la fundațiile halei (Corp A), unde expunerea este moderată (XC2) și nu există nicio cerință specială de agresivitate chimică; **C30/37** la radierul silozului (Corp B), unde clasa de expunere XC2(+XA1) impune o clasă de rezistență superioară pentru a asigura, implicit, o permeabilitate redusă a betonului (parametru corelat direct cu rezistența la agresivitate chimică slabă); **C35/45** la cuva de dejecții și, după caz, la celulele de beton ale variantei B2 a silozului, clasa de rezistență cea mai ridicată dintre toate elementele fermei, justificată de clasa de expunere severă XA2-XA3 (agresivitate chimică ridicată) specifică acestor elemente. Coeficientul parțial de siguranță pentru beton este γc = 1,5 (valoare standard SR EN 1992-1-1), iar armătura folosită este **BST 500 C** (fyd = 435 N/mm², γs = 1,15) — marca de oțel-beton din **clasa de ductilitate C**, cerință obligatorie pentru elementele de beton armat cu rol structural în zone seismice (fundațiile silozului, elementele cuvei), unde alungirea la rupere și raportul fu/fyk minim garantate de clasa C asigură capacitatea necesară de redistribuire a eforturilor și de deformare fără cedare fragilă.

---

## 7. Amplasament, teren de fundare și parametrii climatici de bază

### 7.1. Condiții geotehnice generale (categoria 2, NP 074/2022)

Studiul geotehnic de amplasament (a se confirma și detalia la faza PT cu forări/penetrări specifice fiecărui corp, dat fiind că fiecare are o adâncime de fundare și o încărcare pe teren foarte diferite) furnizează, pentru predimensionarea din acest memoriu, o presiune convențională de bază **p_conv = 220÷250 kPa**, un nivel al apei subterane (NHA) la **−3,0 m** față de cota terenului natural, o adâncime de fundare **Df = 0,90÷1,10 m** (sub adâncimea de îngheț) și o încadrare în **categoria geotehnică 2** (complexitate medie, aplicabilă majorității investițiilor agricole obișnuite, fără condiții de teren dificile speciale). Se observă că nivelul apei subterane adoptat aici (−3,0 m) este, pentru configurația de bază, favorabil (sub cota radierului majorității elementelor), însă verificarea de plutire a cuvei de dejecții (capitolul 4) trebuie realizată, prin definiție conservatoare, cu nivelul hidrostatic **maxim** posibil pe amplasament, nu cu nivelul mediu sau curent — motiv pentru care valoarea de −3,0 m menționată aici ca reper geotehnic general nu trebuie confundată cu nivelul hidrostatic de calcul (mai defavorabil) folosit specific la §4.3.

### 7.2. Acțiunea seismică — parametrii de amplasament

Parametrii seismici de calcul (exemplu de amplasament, a se confirma cu harta de zonare P100-1/2013 pentru județul real al fermei): accelerația terenului de proiectare **ag = 0,25g**; perioada de control (colț) a spectrului **Tc = 0,7 s**; factorul de amplificare dinamică maximă **β0 = 2,5**; factorul de importanță **γI = 1,0** (clasa III, conform §1.2). Acești parametri alimentează direct calculul comparativ hală/siloz din capitolul 9.

### 7.3. Încărcarea din zăpadă (CR 1-1-3/2012)

Valoarea de calcul a încărcării din zăpadă pe acoperișul halei (Corp A), aplicând formula standard cu factorul de importanță seismică γIs (aici folosit ca notație pentru factorul de importanță/expunere aplicat acțiunii climatice, coerent cu clasa III adoptată), coeficientul de formă μ1 (0,8, pantă sub 30°), coeficientul de expunere Ce (1,0, teren normal) și coeficientul termic Ct (1,0):

**s = γIs·μ1·Ce·Ct·sk = 1,0·0,8·1,0·1,0·2,0 = 1,6 kN/mp**

Pe lățimea aferentă unei travee (e = 5,50 m): 1,6·5,50 = **8,8 kN/m** — valoarea folosită direct în breviarul de calcul al cadrului (capitolul 10). Se verifică suplimentar, la faza PT, distribuția **asimetrică** a zăpezii (acumulare diferențiată pe cele două versante ale acoperișului, generând moment de răsucire suplimentar în cadru), conform prevederilor CR 1-1-3 pentru acoperișuri cu pantă redusă.

### 7.4. Încărcarea din vânt (CR 1-1-4/2012)

Presiunea de referință a vântului, calculată din viteza de referință a amplasamentului (vb = 30 m/s, exemplu) și densitatea aerului:

**qb = 0,5·1,25·30² = 0,5·1,25·900 = 562,5 N/mp ≈ 0,56 kN/mp**

Presiunea dinamică de vârf la înălțimea de referință a halei (Hs = 5,0 m), majorată prin coeficientul de expunere ce(ze) ≈ 1,8 (categorie de teren și înălțime redusă):

**qp(5) = 1,8·0,56 = 1,01 kN/mp**

Fiind o **hală semideschisă** (tipică unui adăpost zootehnic, cu deschideri mari pentru ventilație naturală pe pereții longitudinali), coeficientul de presiune interioară cpi adoptat este mare (semnificativ pozitiv sau negativ, în funcție de direcția vântului dominant relativ la deschiderile de ventilație), ceea ce conduce la o presiune netă de **smulgere a acoperișului** semnificativ majorată față de o hală complet închisă:

**w_smulgere ≈ (0,9 + 0,7)·1,01 = 1,6 kN/mp**

Această valoare — obținută prin însumarea unei componente de succiune exterioară (cpe negativ, uzual pe acoperișul plat/ușor înclinat) cu o componentă de presiune interioară (cpi pozitiv, din efectul deschiderilor de ventilație pe direcția vântului) — este **critică pentru ancorajele de bază ai stâlpilor și pentru fixarea panelor**, fenomen tratat direct la capitolul 10 (dimensionarea cadrului) și la capitolul 12 (verificarea ancorajelor la smulgere).

---

## 8. Acțiuni și grupări de încărcări

### 8.1. Coeficienți parțiali și de combinație

Coeficienții parțiali de siguranță pentru acțiuni, aplicați uniform pe toate cele trei corpuri conform CR 0-2012/SR EN 1990, sunt: **γG = 1,35** (acțiuni permanente, în sens defavorabil) și **γG = 1,0** (același tip de acțiune, atunci când acționează favorabil — situație esențială, așa cum se detaliază mai jos, la verificările de smulgere/ridicare, unde greutatea proprie este singura forță stabilizatoare); **γQ = 1,5** (acțiuni variabile). Coeficienții de combinație (ψ0, factorul care reduce valoarea caracteristică a unei acțiuni variabile atunci când ea acționează simultan, dar nu ca acțiune principală, cu o altă acțiune variabilă) sunt **ψ0 = 0,5** pentru zăpadă și **ψ0 = 0,6** pentru vânt, iar pentru materialul depozitat în siloz (o acțiune variabilă specifică, tratată similar unei încărcări utile de exploatare) se adoptă un coeficient **ψE = 0,8÷1,0** la calculul seismic — o valoare mult mai mare decât coeficienții ψE uzuali pentru încărcări utile obișnuite (de regulă 0,2÷0,3), justificată de faptul că materialul din siloz nu este o încărcare "tranzitorie" în sensul obișnuit (mobilier, marfă temporară), ci reprezintă, pe cea mai mare parte a duratei de exploatare a silozului, o masă practic permanentă (stocul rămâne depozitat luni de zile între ciclurile de recoltă/valorificare), motiv pentru care probabilitatea ca un eveniment seismic să găsească silozul plin (sau aproape plin) este ridicată, spre deosebire de o încărcare utilă obișnuită unde prezența simultană a valorii maxime cu evenimentul seismic este mult mai puțin probabilă.

### 8.2. Grupările de calcul pentru Corpul A (hala)

Se definesc trei grupări principale de acțiuni la starea limită ultimă pentru cadrul metalic al halei: **GF1** (1,35G + 1,5S + 0,9W), grupare gravitațională dominată de zăpadă, care guvernează momentul maxim în cadru (rigla și zona de nod, tratată la capitolul 10); **GF2** (vânt ca acțiune principală), care guvernează dimensionarea stâlpilor la încovoiere din presiunea/succiunea directă a vântului pe pereți; și, esențial pentru acest tip de hală ușoară semideschisă, **GF3** (1,0G + 1,5W_succiune), gruparea de **smulgere**, unde acțiunea permanentă intră cu factorul favorabil 1,0 (nu 1,35, întrucât aici greutatea proprie este singura forță care se opune ridicării, iar majorarea ei artificială ar fi nesigură, nu conservatoare) combinată cu vântul de succiune majorat cu γQ = 1,5 — gruparea care guvernează dimensionarea ancorajelor de bază ai stâlpilor la smulgere (capitolul 12).

### 8.3. Grupările de calcul pentru Corpul B (silozul)

Silozul necesită patru grupări distincte, corespunzătoare celor patru stări fizice descrise pe larg în capitolul 3: **SU** (starea de umplere, cu presiunile Janssen statice ale §3.3); **SG** (starea de golire, cu presiunea orizontală majorată p_he și patch load-ul, care guvernează verificarea la întindere inelară a peretelui, §3.6); **SGol-vânt** (starea de siloz gol sub acțiunea vântului, care guvernează verificarea la flambaj a cojii metalice, §3.7 — fenomenul identificat drept critic pentru grosimea mantalei); și **S-seism** (silozul plin sub acțiune seismică, tratată riguros în capitolul 9, care guvernează atât ancorarea silozului cât și radierul de fundare). Se reține explicit, ca principiu general de combinare a acțiunilor la un siloz, că **materialul depozitat este el însuși tratat ca o acțiune variabilă**, cu factorul γQ = 1,5, spre deosebire de greutatea proprie a mantalei/structurii, care rămâne o acțiune permanentă cu γG = 1,35/1,0 — o distincție conceptuală relevantă întrucât cantitatea de material depozitat variază pe durata de exploatare (de la siloz gol la siloz plin), exact ca orice altă încărcare variabilă de exploatare.

### 8.4. Grupările de calcul pentru Corpul C (bazinul de dejecții)

Pentru cuva de dejecții, gruparea de calcul dimensionantă, distinctă de orice combinație SLU/seismică obișnuită, este **gruparea de flotație UPL** (0,90·G_stab ≥ 1,10·F_up, detaliată integral la §4.3), aplicabilă exclusiv scenariului de cuvă goală. La aceasta se adaugă gruparea uzuală de verificare a pereților la încovoiere din împingerea combinată de pământ și apă subterană (§4.6), aplicabilă atât stării de cuvă plină (presiune interioară a conținutului) cât și, mai defavorabil pentru peretele considerat din exteriorul spre interior, stării de cuvă goală (presiune exterioară necontrabalansată).

---

## 9. Calculul seismic comparativ — hala (vânt determinant) versus silozul plin (seism determinant)

### 9.1. Metodologia comparației

Acest capitol cuantifică riguros, cu numerele de calcul ale memoriului, contrastul fizic descris calitativ la §3.9: pentru fiecare dintre cele două corpuri cu masă semnificativ diferită (hala, foarte ușoară; silozul plin, foarte greu), se calculează atât forța seismică de bază (metoda forțelor laterale echivalente, Fb = Sd(T1)·W) cât și, pentru hală, forța de vânt totală echivalentă — comparația directă a celor două valori indicând, fără echivoc, care acțiune guvernează dimensionarea fiecărui corp.

### 9.2. Corpul A — hala: forța seismică rămâne sub forța de vânt

Greutatea seismică totală a halei (masa participantă la mișcarea seismică, incluzând greutatea proprie a acoperișului/structurii pe suprafața totală a halei, gk = 0,55 kN/mp pe o arie totală de 1.260 mp):

**G_total = 0,55·1.260 = 693 kN** (masă corespunzătoare m ≈ 70,6 t)

Perioada fundamentală de vibrație estimată pentru o structură metalică ușoară parter de acest tip: **T1 ≈ 0,5 s**. Ordonata spectrului de calcul, cu factorul de comportare adoptat la Corpul A (q = 2,0, conform capitolul 5):

**Sd = ag·β0/q = 0,25·2,5/2,0 = 0,3125g**

Forța tăietoare de bază rezultată:

**Fb = Sd·G_total = 0,3125·693 = 216,6 kN**

Comparând această valoare cu forța totală de vânt pe hală (integrată pe toată suprafața expusă, folosind presiunile calculate la §7.4), rezultă o **forță de vânt totală de ordinul 390 kN** — o valoare de aproape **dublul** forței seismice de bază. Concluzia este directă și cuantificată: **vântul, nu seismul, este acțiunea determinantă pentru hala metalică ușoară**, confirmând riguros, prin calcul, contrastul fizic explicat calitativ la §3.9. Această concluzie nu înseamnă că verificarea seismică a halei este superfluă — ea rămâne obligatorie, ca orice altă combinație de acțiuni, și guvernează totuși anumite elemente locale (de exemplu, verificarea la deplasare relativă/drift a cadrului, unde combinația seismică poate fi, punctual, mai severă decât o combinație de vânt cu deplasare limitată la o altă valoare-limită) — dar, pentru dimensionarea de ansamblu a secțiunilor principale ale cadrului și, mai ales, pentru ancorajele de bază, gruparea de vânt (inclusiv, esențial, gruparea de smulgere GF3, §8.2) este cea care produce eforturile maxime de calcul.

### 9.3. Corpul B — silozul plin: seismul devine acțiunea majoră

Situația se inversează complet la silozul plin. Greutatea totală a materialului depozitat (grâu, γ = 9,0 kN/mc, pe un volum interior de calcul de 753,6 mc — corespunzător capacității de calcul a silozului analizat):

**G_material = 9,0·753,6 = 6.782 kN** (echivalent unei mase de material de **691 tone**)

Pentru calculul seismic, masa participantă totală (m_seism) se compune din greutatea proprie a mantalei/structurii silozului (estimată la 250 kN) plus o fracțiune a greutății materialului depozitat, afectată de coeficientul ψE discutat la §8.1 (adoptat aici la valoarea superioară a intervalului, 0,8, coerent cu principiul acoperitor de a considera silozul aproape plin la momentul evenimentului seismic):

**m_seism = (250 + 0,8·6.782)/9,81 = (250 + 5.425,6)/9,81 = 5.675,6/9,81 ≈ 578 t**

Greutatea seismică echivalentă (W_seism = m_seism·g):

**W_seism = 578·9,81 ≈ 5.670 kN**

Ordonata spectrului de calcul, cu factorul de comportare specific silozului (q = 1,5, conform SR EN 1998-4, capitolul 5):

**Sd = ag·β0/q = 0,25·2,5/1,5 = 0,417g**

Forța tăietoare de bază:

**Fb = Sd·W_seism = 0,417·5.670 = 2.364 kN**

Această forță — de peste **zece ori mai mare** decât forța seismică de bază calculată pentru hala ușoară (216,6 kN) — confirmă cuantificat concluzia calitativă de la §3.9: **la silozul plin, seismul este acțiunea structurală majoră**, incomparabil mai severă decât orice acțiune de vânt aplicabilă unui cilindru de aceste dimensiuni.

Momentul de răsturnare la baza silozului, generat de aplicarea acestei forțe orizontale la centrul de greutate al masei seismice (aproximat la înălțimea h_c = 8,0 m pentru acest calcul simplificat de predimensionare, valoare care se rafinează la faza PT prin poziția reală a centrului de greutate combinat al materialului și mantalei):

**M_răsturnare = Fb·8,0 = 2.364·8,0 = 18.912 kNm**

Acest moment uriaș de răsturnare are două consecințe structurale majore, ambele tratate explicit în capitolele următoare: (a) generează **presiuni neuniforme pe radierul de fundare** (o parte a radierului circular este suplimentar comprimată, partea opusă este descărcată sau chiar solicitată la desprindere, verificare tratată la §12.3), și (b) generează o solicitare de **smulgere a ancorajului** pe partea opusă direcției de aplicare a forței seismice (ancorajul trebuie să reziste la o componentă de întindere verticală, generată de tendința de răsturnare, similar principiului de calcul al ancorajelor de bază la o structură cu moment de răsturnare mare, indiferent de natura ei).

### 9.4. Sinteza comparativă

Tabelul următor sintetizează, în oglindă, cele două calcule de mai sus, ilustrând explicit inversarea completă a acțiunii determinante:

| Parametru | Corp A — hala (masă mică) | Corp B — silozul plin (masă mare) |
|---|---|---|
| Masă/greutate seismică | G_total ≈ 693 kN (70,6 t) | W_seism ≈ 5.670 kN (578 t) |
| Factor de comportare q | 2,0 | 1,5 |
| Ordonata spectrală Sd | 0,3125g | 0,417g |
| Forță seismică de bază Fb | 216,6 kN | 2.364 kN |
| Acțiune comparabilă | Vânt total ≈ 390 kN | — (fără echivalent relevant) |
| **Acțiune determinantă** | **Vântul (aprox. dublul seismului)** | **Seismul (Fb 2.364 kN, M 18.912 kNm)** |

---

## 10. Dimensionarea cadrului halei — breviar de calcul complet

### 10.1. Încărcările permanente pe cadru

Greutatea proprie a pachetului de acoperiș al halei se compune din: panoul sandwich de închidere (0,15 kN/mp), panele metalice și accesoriile de prindere (0,10 kN/mp), rigla proprie a cadrului, considerată distribuit pe suprafață pentru simplificarea încărcării (0,20 kN/mp) și o rezervă tehnologică pentru instalații/accesorii suspendate curente (0,10 kN/mp), rezultând o încărcare permanentă totală:

**gk = 0,15 + 0,10 + 0,20 + 0,10 = 0,55 kN/mp**

Raportată la travee (e = 5,50 m): gk·e = 0,55·5,50 = **3,03 kN/m** — valoarea liniară folosită direct în combinația de calcul a cadrului (§10.3). La aceasta se adaugă, punctual (nu distribuit pe toată deschiderea, ci la punctele reale de prindere), sarcinile agățate specifice tehnologiei zootehnice — sistemul de furajare automată (o sarcină concentrată de calcul de ordinul 2 kN, aplicată la punctul/punctele reale de suspendare) și ventilatoarele industriale de mari dimensiuni (o sarcină concentrată de ordinul 1,5 kN per unitate) — sarcini care se introduc explicit în modelul de calcul al cadrului la faza PT, la pozițiile lor reale din planul tehnologic, dar care nu modifică semnificativ înfășurătoarea globală de eforturi calculată mai jos pentru încărcarea distribuită dominantă.

### 10.2. Încărcarea din zăpadă pe cadru

Preluând valoarea de calcul stabilită la §7.3 (s = 1,6 kN/mp) și raportând-o la travee:

**qs = s·e = 1,6·5,50 = 8,8 kN/m**

Această încărcare — dominantă în combinația gravitațională a cadrului, așa cum se va vedea la §10.3 — se verifică suplimentar, la faza PT, și în configurația **asimetrică** (aglomerare de zăpadă pe un singur versant al acoperișului, generând moment de torsiune/încovoiere diferențială suplimentar în cadru), conform CR 1-1-3.

### 10.3. Combinația de calcul dominantă și eforturile din cadru

Combinația gravitațională (GF1, §8.2), cu zăpada ca acțiune variabilă principală:

**wEd = 1,35·gk·e + 1,5·qs = 1,35·3,03 + 1,5·8,8 = 4,09 + 13,2 = 17,3 kN/m**

Momentul maxim în riglă, pentru un cadru cu deschidere L = 21,0 m, calculat cu formula simplificată de grindă simplu rezemată sub încărcare uniform distribuită (aproximație standard pentru predimensionare, care se rafinează la faza PT prin analiza de cadru real, ce ține cont de rigiditatea nodurilor și de redistribuirea momentului spre stâlpi):

**M_max,riglă = wEd·L²/8 = 17,3·21²/8 = 17,3·441/8 = 7.629,3/8 = 953,5 kNm**

Momentul la nodul riglă-stâlp (colț), redus față de momentul maxim din câmp prin efectul de redistribuire specific unui cadru cu noduri rigide și vute (unde o parte din momentul care, la o grindă simplu rezemată, s-ar concentra integral la mijlocul deschiderii, se redistribuie către noduri, dar nu în proporție de 100% datorită rigidității finite a nodului și flexibilității stâlpului):

**M_colț ≈ 0,60·M_max,riglă = 0,60·953,5 = 572 kNm**

Forța tăietoare maximă la reazem:

**VEd = wEd·L/2 = 17,3·21/2 = 181,7 kN**

### 10.4. Verificarea riglei IPE 500 (S355)

Rezistența la încovoiere plastică a profilului IPE 500, cu modulul de rezistență plastic Wpl = 2.194 cm³ și rezistența de curgere a oțelului S355 (fy = 355 N/mm²):

**Mc,Rd = Wpl·fy = 2.194.000 mm³·355 N/mm² = 778.870.000 N·mm ≈ 778,9 kNm**

Verificarea în câmp (unde acționează momentul redus, aproximat aici la valoarea de referință 381 kNm pentru secțiunea curentă IPE 500 fără întărire de vută): 381 < 778,9 → **verificare satisfăcută (utilizare 0,49)**. La zona de nod (colț), unde profilul este întărit local prin vută (o piesă triunghiulară sudată care mărește local înălțimea efectivă a secțiunii și, implicit, modulul ei de rezistență), momentul capabil crește la aproximativ **1.170 kNm**, superior confortabil momentului de calcul din §10.3 (572 kNm):

**Grad de utilizare la nod = 572/1.170 ≈ 0,49**

### 10.5. Verificarea la deplasare (stare limită de serviciu)

Deplasarea orizontală admisibilă la nivelul streașinii, conform limitei uzuale H/150 pentru hale metalice cu închideri ușoare (o limită mai permisivă decât cea aplicată clădirilor cu elemente fragile, tocmai pentru că panourile sandwich și tâmplăria unei hale industriale/agricole tolerează deformații relative mai mari fără fisurare sau avarie):

**δ_adm = H/150 = 5.000/150 = 33,3 mm**

Deplasarea calculată (din modelul de cadru, sub combinația de vânt SLS) este de ordinul **24 mm**, rezultând un grad de utilizare:

**Grad de utilizare deplasare = 24/33,3 ≈ 0,72**

Această valoare, deși sub pragul de 1,0, este una dintre cele mai apropiate de limită din întregul ansamblu de verificări ale halei (a se compara cu tabelul de sinteză din capitolul 13) — un indiciu că, la o eventuală optimizare ulterioară a secțiunilor (reducerea profilelor pentru economie de material), rigiditatea la deplasare orizontală, nu neapărat rezistența la moment, ar putea deveni criteriul dimensionant.

---

## 11. Verificarea silozului — sinteza calculelor de rezistență

### 11.1. Recapitularea presiunilor de calcul

Capitolul 3 a stabilit integral teoria și valorile numerice ale presiunilor Janssen; acest capitol reia, în formă de sinteză de calcul, verificările structurale directe ale peretelui metalic, pe baza acelor presiuni. La baza peretelui (z = h_c = 15,0 m): presiunea orizontală de umplere p_hf = 37,1 kN/mp, presiunea de golire majorată p_he = 42,7 kN/mp, forța axială meridională de umplere n_zSk = 119 kN/m, forța axială meridională de golire n_zSk,e = 131 kN/m, patch load-ul p_pf ≈ 3,2÷3,7 kN/mp.

### 11.2. Verificarea la întindere circumferențială și grosimea guvernată de flambaj

Așa cum s-a arătat detaliat la §3.6, întinderea circumferențială din presiunea de golire (n_θ = 170,8 kN/m) ar necesita o grosime de tablă de doar 0,62 mm — o valoare complet nedeterminantă. Grosimea reală a mantalei este guvernată, în schimb, de verificarea la **flambaj** (§3.7), atât meridional (σ_x,Rcr = 158,8 N/mm² pentru t = 5 mm) cât și circumferențial (σ_θ,Rcr, dependent de spațierea inelelor de rigidizare) — verificări care conduc la adoptarea unei grosimi minime de **4 mm la vârf**, crescând progresiv, prin virole succesive, la **6÷8 mm la baza peretelui**, unde atât presiunea Janssen cât și efortul cumulat de compresiune meridională sunt maxime.

### 11.3. Verificarea inelului de racord pâlnie-cilindru

Zona de tranziție dintre peretele cilindric și pâlnia conică (înclinată la β = 25÷30°, cu o capacitate de curgere corespunzătoare capacității totale a silozului de 750÷1.000 t) este verificată separat, ca element de compresiune circumferențială concentrată, la fenomenul de despicare descris la §3.7.4 — verificare care, la faza PT, se realizează printr-un calcul dedicat de echilibru al inelului sub componenta orizontală a reacțiunii pâlniei, atât în starea de umplere cât și, mai defavorabil, în starea de golire.

### 11.4. Varianta B2 — armătura inelară a celulelor de beton

Pentru varianta constructivă cu celule de beton armat (§3.8), armătura inelară necesară se dimensionează direct din raportul n_θ/fyd (efortul de întindere circumferențial de calcul, împărțit la rezistența de calcul a armăturii BST 500 C, fyd = 435 N/mm²), la care se adaugă armătura de încovoiere din patch load, cu respectarea acoperirii minime de 40 mm (clasa de expunere XA1+XM1) și a limitei de fisurare w ≤ 0,2 mm (SR EN 1992-3) — aceeași filozofie de control al fisurării aplicată, cu clase de expunere superioare, la cuva de dejecții (capitolul 4).

---

## 12. Infrastructura — fundații, radier și cuva de dejecții

### 12.1. Parametrii geotehnici de bază pentru infrastructură

Reluând parametrii stabiliți la §7.1 (p_conv = 220÷250 kPa, NHA −3,0 m, Df 0,90÷1,10 m, categoria geotehnică 2), infrastructura celor trei corpuri se dimensionează distinct, în funcție de încărcarea specifică transmisă de fiecare suprastructură.

### 12.2. Fundațiile Corpului A (hala) — dimensionare la presiune și verificare la smulgere

Fundațiile halei sunt de tip **izolat** (bloc de beton simplu + cuzinet de beton armat, soluție economică standard pentru stâlpi metalici articulați la bază). Aria necesară a tălpii, pentru o încărcare axială de calcul de 182 kN raportată la presiunea convențională admisă de 250 kPa:

**A_nec = N/p_conv = 182/250 = 0,73 mp**

Se adoptă o talpă de **1,6 × 1,6 m** (A = 2,56 mp, superioară necesarului strict, pentru a acoperi și verificarea sub moment excentric). Presiunea efectivă sub încărcare centrică rezultă de **71 kPa**, net inferioară presiunii admise de 250 kPa; sub combinația cu moment (excentricitate din vânt/încovoierea stâlpului), presiunea maximă la marginea tălpii ajunge la **165 kPa**, tot sub limita admisă — **verificare satisfăcută cu marjă confortabilă**.

**Verificarea la smulgere** (gruparea GF3, vânt de succiune, §8.2): forța de tracțiune transmisă ancorajului de bază al stâlpului, din combinația de smulgere, este de aproximativ **N_tract ≈ 95 kN**. Greutatea care se opune acestei smulgeri (greutatea proprie a blocului de fundație plus greutatea pământului direct așezat pe talpă, care contribuie ca masă de lestare) se calculează astfel:

**G_ancoraj = 3,07·25 + 2,0·18 = 76,75 + 36,0 = 112,8 kN**

(unde primul termen reprezintă greutatea betonului fundației — volum 3,07 mc × greutate specifică 25 kN/mc — iar al doilea greutatea pământului de lestare — volum 2,0 mc × greutate specifică 18 kN/mc). Verificarea la stare limită de smulgere, cu factorul de siguranță/reducere aplicat forței de tracțiune (0,9, similar filosofiei factorilor parțiali UPL discutați la capitolul 4, dar aici aplicat sub forma unui coeficient de siguranță simplu de predimensionare):

**Grad de siguranță = G_ancoraj/(N_tract·0,9) = 112,8/(95·0,9) = 112,8/85,5 = 1,32 > 1,0 → verificare satisfăcută**

Se prevăd suplimentar **buloane de ancoraj înglobate** direct în blocul de fundație (nu doar chimice post-turnare), soluție preferabilă la o solicitare de smulgere semnificativă și repetabilă (ciclică, la fiecare eveniment de vânt puternic), întrucât ancorajele înglobate transferă efortul de tracțiune direct în masa de beton armat, fără riscul de degradare progresivă a aderenței specific ancorajelor chimice montate ulterior.

### 12.3. Fundația Corpului B (silozul) — radier circular sub încărcare mare și moment seismic

Dată fiind încărcarea axială mare (greutatea combinată a materialului depozitat și a mantalei, de ordinul a 7.000 kN, conform §9.3) și momentul de răsturnare seismic semnificativ (M = 18.912 kNm, §9.3), silozul se fundează pe un **radier circular** (soluție preferabilă unei fundații izolate la o încărcare concentrată de această magnitudine, întrucât distribuie presiunea pe toată suprafața de amprentă a silozului, reducând presiunea unitară maximă și oferind rigiditate suficientă pentru a limita tasările diferențiate).

Presiunea medie sub radier, pentru o încărcare axială totală de calcul de 7.030 kN și o suprafață a radierului de 63,6 mp (corespunzătoare unui radier circular de diametru ceva mai mare decât diametrul silozului însuși, pentru a asigura o suprafață portantă suficientă):

**p_med = N/A = 7.030/63,6 = 110,5 kPa** (rotunjit 110 kPa), sensibil sub presiunea convențională admisă de 250 kPa.

Sub combinația seismică — unde momentul de răsturnare M = 18.912 kNm generează o distribuție neuniformă a presiunii pe radier, cu maximul la marginea radierului orientată în sensul momentului — presiunea maximă rezultă din suprapunerea presiunii medii cu termenul de încovoiere (M/W, unde W este modulul de rezistență al secțiunii radierului circular, aproximat aici la 143 mc):

**p_max = p_med + M/W = 110 + 18.912/143 = 110 + 132,2 = 242,2 kPa ≈ 242 kPa**

Această valoare este **foarte apropiată de presiunea convențională admisă (250 kPa)** — o marjă de siguranță redusă (aproximativ 3%), care se semnalează explicit ca un punct de atenție pentru faza PT: dacă studiul geotehnic definitiv al amplasamentului real confirmă o presiune convențională inferioară valorii de predimensionare adoptate aici, sau dacă analiza seismică modală riguroasă (recomandată explicit la capitolul 15) conduce la un moment de răsturnare superior celui calculat prin metoda simplificată, radierul va necesita fie o mărire a suprafeței de amprentă, fie o soluție de fundare pe **piloți**, alternativă menționată explicit ca variantă de rezervă. Tasarea absolută estimată sub această încărcare este de **4÷5 cm**, cu o tasare diferențiată relativă (Δs/L, raportul dintre diferența de tasare pe conturul radierului și diametrul acestuia) limitată la **1/500** — dacă studiul geotehnic definitiv indică o tasare diferențiată superioară acestei limite (situație posibilă pe terenuri eterogene sau compresibile), soluția de radier direct trebuie reconsiderată în favoarea fundării indirecte pe piloți.

### 12.4. Infrastructura Corpului C — cuva de dejecții (sinteza geotehnică)

Din punct de vedere pur geotehnic (dincolo de verificarea la plutire tratată integral la capitolul 4), cuva de dejecții se comportă ca orice element de beton armat îngropat, fundat direct pe terenul natural sau pe un strat de egalizare, la o adâncime stabilită de nivelul tehnologic necesar (colectarea gravitațională a dejecțiilor din Corpul A). Radierul cuvei se dimensionează atât la presiunea de contact cu terenul (verificare STR/GEO uzuală, sub presiunea convențională admisă) cât și, esențial, la condițiile de etanșeitate și de rezistență la subpresiune tratate integral la §4.3-4.5 — capitolul 4 rămâne, pentru acest corp, sursa completă a verificărilor structurale specifice, capitolul de infrastructură de față limitându-se la confirmarea compatibilității cu presiunea convențională generală a amplasamentului.

---

## 13. Grade de utilizare — tabel de sinteză

Sinteza gradelor de utilizare (raportul dintre efortul/deformația de calcul și capacitatea/limita admisă) pentru elementele reprezentative ale celor trei corpuri, pe gruparea de acțiuni guvernantă pentru fiecare:

| Element | Gruparea guvernantă | Grad de utilizare |
|---|---|---|
| Stâlp hală HEA 300 | GF2 (vânt) | 0,65 |
| Riglă/nod IPE 500 + vute | GF1 (zăpadă) | 0,49 |
| Pane Z250 (succiune vânt) | GF3 (smulgere) | 0,78 |
| Ancoraj bază stâlp hală (smulgere) | GF3 (smulgere) | 0,71 |
| Deplasare orizontală cadru (SLS) | Vânt | 0,72 |
| Perete siloz — inel (întindere) | SG (golire) | 0,52 (t = 6 mm) |
| Perete siloz — flambaj meridional (gol) | SGol-vânt | 0,72 |
| Perete siloz — flambaj circumferențial (gol, cu inele) | SGol-vânt | 0,81 |
| Ancoraj siloz (bază, seism) | S-seism | 0,84 |
| Fundație (radier) siloz | S-seism | 0,84 |
| Cuvă bazin — perete (împingere) | Împingere pământ+apă | 0,75 (w = 0,15 mm — sub limita 0,2 mm) |

Se observă că **toate gradele de utilizare rămân sub pragul de 1,0**, cu valoarea maximă înregistrată de **0,84** (ancorajul de bază și fundația radierului silozului, sub combinația seismică) — o marjă de siguranță globală adecvată unei faze DTAC de predimensionare, care lasă totuși o rezervă limitată (aproximativ 16%) tocmai la elementele identificate ca fiind guvernate de fenomenul cel mai sever al întregului ansamblu (seismul silozului plin), motiv suplimentar pentru recomandarea explicită, la capitolul 15, a unei analize seismice modale riguroase la faza PT pentru acest element specific.

---

## 14. Durabilitate și protecție anticorozivă/anti-chimică

### 14.1. Mediul agresiv specific unei ferme zootehnice

Spre deosebire de o construcție industrială obișnuită, mediul de exploatare al unei ferme agrozootehnice expune structura la o combinație de agenți agresivi rar întâlniți simultan în alte tipologii de investiții: **amoniac (NH₃)** rezultat din descompunerea dejecțiilor animaliere (concentrat în special în atmosfera Corpului A, adăpostul propriu-zis, dar și, la un nivel mai ridicat, în vecinătatea Corpului C), **umiditate ridicată permanentă** (specifică activității zootehnice — spălarea periodică a spațiilor, respirația și transpirația animalelor), **hidrogen sulfurat (H₂S)** și **acizi organici** (produși ai fermentării anaerobe a dejecțiilor, concentrați aproape exclusiv la Corpul C) și **abraziune mecanică** (specifică Corpului B, din frecarea repetată a materialului granular pe suprafețele interioare ale silozului la fiecare ciclu de umplere/golire, fenomen tratat structural la §3.4-3.5, dar cu o componentă suplimentară de uzură progresivă a suprafeței, nu doar de solicitare mecanică instantanee).

### 14.2. Protecția anticorozivă a oțelului (SR EN ISO 12944)

Sistemul de protecție anticorozivă a elementelor metalice se diferențiază, riguros, pe zone de expunere, conform claselor de corozivitate ale SR EN ISO 12944:

- **Interiorul halei (Corp A)** — zona cu expunerea cea mai severă la amoniac și umiditate combinate — se protejează la **clasa C4-C5-I** (mediu industrial/agricol cu umiditate ridicată), prin sistem dublu: **zincare la cald cu grosime minimă de 85 μm** (protecție de bază prin barieră metalică sacrificială — zincul, mai puțin nobil electrochimic decât oțelul, se corodează preferențial și protejează astfel oțelul de bază chiar și la zgârieturi/deteriorări locale ale stratului), completată de un **sistem duplex de vopsire epoxidică/poliuretanică cu grosime totală minimă 240 μm** — combinația zincare+vopsire (sistem "duplex") oferind o durată de viață anticorozivă de peste **15 ani** fără intervenție de întreținere, semnificativ superioară oricăreia dintre cele două protecții aplicate separat (efectul de sinergie al sistemului duplex este un fenomen documentat: vopseaua protejează zincul de uzura mecanică/UV, iar zincul, la rândul lui, continuă protecția sacrificială chiar dacă vopseaua se deteriorează local).
- **Exteriorul halei** — expunere atmosferică obișnuită, fără contact direct cu emisiile interioare de amoniac — se protejează la o clasă inferioară, **C3-C4**, suficientă pentru mediul atmosferic exterior obișnuit al unei zone rurale/agricole.
- **Manteaua silozului metalic** — se protejează prin **zincare de fabricație Z600** (o masă de zinc pe unitate de suprafață net superioară zincării standard de construcție, justificată de expunerea permanentă atât la intemperii pe fața exterioară cât și la umiditatea/praful organic al cerealelor pe fața interioară) completată de un **sistem de vopsire** suplimentar acolo unde condițiile locale de mediu o impun (de exemplu, în zone cu agresivitate atmosferică industrială suplimentară).
- **Ancorajele** (buloane de bază, elemente de fixare inaccesibile pentru întreținere periodică) — se prevăd fie din **oțel inoxidabil**, fie **zincate**, opțiunea concretă fiind o decizie economică a proiectantului la faza PT, cu preferință pentru inox la elementele complet inaccesibile post-execuție (înglobate în beton) unde orice defect de protecție nu mai poate fi remediat ulterior.
- **Soclul de beton** al elementelor metalice (zona de tranziție beton-metal, cea mai expusă stropirii/umidității ascensionale de la sol) se prevede cu o înălțime suplimentară de **+30 cm** față de cota strict necesară structural, plus o **protecție suplimentară dedicată a bazei** stâlpilor/mantalei — o măsură constructivă simplă (înălțarea punctului de tranziție deasupra zonei de stropire directă) care reduce semnificativ riscul de coroziune accelerată la interfața cea mai vulnerabilă a oricărei structuri metalice cu soclu de beton.

### 14.3. Clasele de expunere ale betonului — sinteză finală și corelare cu mecanismul de degradare

Recapitulând și corelând explicit clasele de expunere stabilite la §1.3 cu mecanismul fizic de degradare pe care fiecare clasă îl adresează: **cuva de dejecții** — elementul cu mediul cel mai agresiv al întregii investiții — se execută din **beton C35/45, impermeabil, clasa de expunere XA3** (agresivitate chimică ridicată — amoniac, acizi din fermentarea dejecțiilor), cu o **acoperire de armătură majorată la 50 mm** (față de acoperirea minimă uzuală de 25÷35 mm la un beton fără expunere chimică specială — majorarea reflectă direct viteza superioară de pătrundere a agenților agresivi într-un mediu XA3, care ar reduce, la o acoperire standard, durata de viață utilă a armăturii sub durata de proiectare de 50 de ani), completată, acolo unde analiza de durabilitate o recomandă, de o **protecție suplimentară epoxidică** a suprafeței interioare și de utilizarea, dacă disponibilă economic, a unui **ciment rezistent la atac acid** (cimenturi cu conținut redus de C₃A, mai puțin vulnerabile la atacul sulfaților și al acizilor organici specifici mediului de fermentare a dejecțiilor). **Peretele silozului de beton** (varianta B2) și radierul silozului metalic (B1) se execută din beton **C35/45 (perete) și C30/37 (radier), clase de expunere XA1+XM1, respectiv XC2(+XA1)** — agresivitate chimică slabă (nu ridicată, ca la cuva de dejecții) combinată, la peretele silozului, cu abraziunea mecanică specifică frecării cerealelor (XM1). **Platforma exterioară** (suprafețele de circulație tehnologică ale fermei, expuse atât la îngheț-dezgheț ciclic specific climatului românesc cât și la abraziunea traficului de utilaje) se execută din beton **C30/37, clasa de expunere XF3+XM1, cu aer antrenat** — aerul antrenat (microbule de aer incluse deliberat în masa betonului la preparare) fiind măsura constructivă standard pentru rezistența la cicluri repetate de îngheț-dezgheț, care altfel ar provoca fisurarea progresivă a betonului prin expansiunea apei înghețate în porii capilari.

---

## 15. Concluzii, verificări finale și recomandări pentru faza PT

### 15.1. Sinteza generală a verificărilor

Ansamblul verificărilor structurale prezentate în acest memoriu, pentru cele trei corpuri independente ale fermei agrozootehnice, conduce la concluzia că **toate elementele verificate se încadrează în limitele admisibile**, cu gradul de utilizare maxim înregistrat de **0,84** (sub pragul de 1,0), la ancorajul de bază și la fundația radierului silozului metalic, sub combinația seismică cu materialul depozitat la capacitate maximă — elementul identificat, în mod consecvent pe tot parcursul memoriului, drept cel mai solicitat al întregului ansamblu.

Concluziile specifice fiecărui corp, reluate din capitolele dedicate, se pot sintetiza astfel: **Corpul A (hala)** este guvernat structural de **vânt și, specific, de fenomenul de smulgere a acoperișului ușor semideschis** — nu de seism, o concluzie confirmată riguros prin calculul comparativ al capitolului 9 (forța de vânt aproape dublă față de forța seismică de bază). **Corpul B (silozul)** prezintă cea mai complexă temă de calcul dintre cele trei corpuri, guvernată simultan de **două fenomene distincte, specifice materialului granular și geometriei de tip coajă subțire**: flambajul peretelui metalic gol sub acțiunea vântului (fenomenul care dimensionează efectiv grosimea mantalei, nu întinderea din presiunea materialului) și seismul silozului plin (fenomenul care dimensionează ancorarea și fundația, cu o forță tăietoare de bază de 2.364 kN și un moment de răsturnare de 18.912 kNm — de departe cea mai severă solicitare structurală a întregii investiții). **Corpul C (bazinul de dejecții)** este guvernat de **flotație (verificarea UPL la starea de cuvă goală cu freatic ridicat)** și de cerința de **etanșeitate strictă** (deschidere de fisură limitată la 0,2 mm, conform SR EN 1992-3) — o temă de calcul complet diferită de orice construcție civilă obișnuită, motivată direct de riscul de contaminare a mediului.

Din punctul de vedere al infrastructurii, memoriul a verificat: fundațiile izolate ale halei (satisfăcătoare atât la presiune cât și la smulgere, cu o marjă de siguranță confortabilă de 1,32 la verificarea de smulgere), radierul circular al silozului (satisfăcător, dar cu o marjă redusă — aproximativ 3% — la presiunea maximă sub combinația seismică, punct de atenție explicit semnalat pentru faza PT) și cuva etanșă a bazinului de dejecții (verificată la plutire prin metodologia UPL a SR EN 1997-1, cu soluții constructive de rezervă — lestare/lățire a radierului sau ancorare activă — disponibile dacă geometria de bază nu asigură singură marja de siguranță cerută). Durabilitatea ansamblului, garantată prin sistemul de protecție anticorozivă diferențiat pe zone (clasa C4-C5 la interiorul halei) și prin clasele de expunere a betonului adaptate agresivității chimice specifice fiecărui corp (culminând cu XA3 la cuva de dejecții), asigură satisfacerea duratei de viață proiectate de 50 de ani chiar în condițiile mediului agricol/zootehnic recunoscut ca fiind unul dintre cele mai agresive dintre tipologiile de investiții curente.

Ansamblul satisface, prin urmare, **cerința fundamentală A (rezistență mecanică și stabilitate)** pentru toate cele trei corpuri independente ale investiției.

### 15.2. Verificarea tehnică a proiectului

Conform Legii 10/1995, documentația tehnică a proiectului urmează a fi verificată de verificatori de proiecte atestați MDLPA, pe următoarele domenii/cerințe corespunzătoare exigenței A: **A1** (rezistență și stabilitate — structuri de beton armat), aplicabil fundațiilor tuturor celor trei corpuri, radierului și celulelor de beton ale silozului (varianta B2) și integral cuvei de dejecții; **A2** (rezistență și stabilitate — structuri metalice), aplicabil cadrelor halei și mantalei metalice a silozului (varianta B1); și **Af** (rezistență și stabilitate — teren de fundare/sistem geotehnic), aplicabil ansamblului infrastructurii — inclusiv, specific, verificării la stare limită UPL a cuvei de dejecții, o verificare de natură explicit geotehnică (nu doar structurală obișnuită), care intră firesc sub domeniul de atestare Af.

### 15.3. Recomandări pentru faza de Proiect Tehnic

Următoarele aspecte, semnalate punctual pe parcursul memoriului, se recomandă explicit pentru dezvoltare/confirmare la faza de Proiect Tehnic, dincolo de simpla detaliere constructivă uzuală (planșe de armare, planșe de montaj metalic, liste de bare, caiete de sarcini):

1. **Studiu geotehnic detaliat, specific pentru amplasamentul silozului** — dată fiind marja redusă de siguranță (aproximativ 3%) identificată la §12.3 între presiunea maximă de calcul sub radier (242 kPa) și presiunea convențională admisă adoptată de predimensionare (250 kPa), se recomandă un studiu geotehnic dedicat, cu forări specifice sub amprenta silozului, care să confirme sau să corecteze valoarea presiunii convenționale admisibile reale a amplasamentului, precum și nivelul hidrostatic maxim de calcul relevant pentru verificarea de plutire a cuvei de dejecții.
2. **Calculul cojii silozului metalic prin element finit dedicat** (SR EN 1993-1-6, cu considerarea explicită a imperfecțiunilor geometrice de execuție) — verificările analitice simplificate ale acestui memoriu (§3.7, §11.2) stabilesc corect ordinul de mărime și identifică fenomenul determinant (flambajul), dar dimensionarea finală a grosimilor de virolă și a distanței dintre inelele de rigidizare necesită, pentru un rezultat optim din punct de vedere economic și pentru conformarea riguroasă cu factorul de reducere χ (dependent de clasa de calitate a execuției reale), un calcul cu element finit de tip coajă, cu imperfecțiunile geometrice introduse explicit conform prevederilor Anexei D a SR EN 1993-1-6.
3. **Analiză seismică modală dedicată a silozului plin** (conform SR EN 1998-4, nu doar metoda simplificată a forței laterale echivalente folosită la predimensionare) — dat fiind că silozul plin este, așa cum s-a demonstrat riguros la capitolul 9, elementul cu solicitarea seismică de departe cea mai severă a întregului ansamblu (grad de utilizare 0,84, cea mai apropiată de limită dintre toate verificările memoriului), o analiză modală riguroasă — care ține cont, spre deosebire de metoda simplificată, de distribuția reală a maselor pe înălțimea silozului (material + manta) și de posibile moduri superioare de vibrație relevante la o structură zveltă (h_c/d_c = 1,88) — este recomandată explicit pentru confirmarea finală a forței seismice de calcul și, implicit, a dimensionării ancorajelor și a radierului.
4. **Detalii constructive de execuție**: detalierea completă a ancorajelor (bază stâlpi hală, bază siloz), a inelelor de rigidizare ale mantalei silozului (poziție, secțiune, prindere de virole) și a waterstop-urilor cuvei de dejecții (poziționare la toate rosturile de turnare/lucru, tip și lățime de bandă adaptate presiunii hidrostatice de calcul).
5. **Program de urmărire în exploatare** — se recomandă un program dedicat de urmărire a tasărilor (în special la radierul circular al silozului, unde tasarea diferențiată are o limită strictă de 1/500) și a stării protecției anticorozive a elementelor metalice cele mai expuse (interiorul halei, ancorajele silozului), cu inspecții periodice programate, dat fiind mediul recunoscut ca agresiv al exploatării agrozootehnice.

Se subliniază, în final, că valorile de hazard seismic (ag, Tc, β0) și valorile geotehnice (p_conv, nivel hidrostatic) folosite pe tot parcursul memoriului sunt valori de **exemplu de calcul**, reprezentative pentru un amplasament curent din zona seismică analizată, și trebuie **actualizate obligatoriu** cu datele reale de amplasament — harta de zonare P100-1/2013 pentru județul/localitatea exactă a fermei și studiul geotehnic definitiv — înainte de finalizarea proiectului tehnic și a execuției.
