# Memoriu Tehnic de Rezistență (DTAC) — Creșă/Grădiniță cu program prelungit, regim de înălțime P+1E

**Structură în cadre din beton armat monolit, clasa de ductilitate medie (DCM), pe două direcții ortogonale — infrastructură pe grătar de grinzi de fundare armate pe două direcții, corelat cu un studiu geotehnic dedicat.**

> Prezentul memoriu constituie piesa scrisă de rezistență a documentației tehnice pentru autorizarea executării lucrărilor de construire (D.T.A.C.) a unei creșe/grădinițe cu program prelungit, întocmit conform Legii nr. 10/1995 privind calitatea în construcții (republicată), a Legii nr. 169/2026 (CATUC) privind autorizarea executării lucrărilor de construcții și a HG nr. 907/2016, acolo unde investiția este finanțată din fonduri publice (buget local, PNRR — Componenta C15 Educație, PNDL, POR). Nivelul de detaliere corespunde fazei D.T.A.C.: se justifică soluția de rezistență adoptată și se prezintă un calcul de predimensionare complet, coerent și verificabil; calculul definitiv (model spațial, breviar de calcul integral, planuri de cofraj și de armare la scară 1:50/1:25, detalii de execuție la scară 1:20/1:10) se dezvoltă la fazele P.Th. și D.E., conform structurii proprii a memoriului `structura-pth.md`, care nu se dublează aici. Toate valorile numerice de mai jos sunt calcule de predimensionare/verificare pentru justificarea soluției, nu se substituie proiectului tehnic și nici verificării tehnice atestate obligatorii pe cerințele A (rezistență) și, corelat, D (siguranță în exploatare). Prezentul document tratează **exclusiv** rezistența mecanică și stabilitatea structurii (cerința fundamentală A, Legea 10/1995): tema de proiectare, programul funcțional, indicatorii urbanistici, avizele obligatorii (DSP, ISU) și încadrarea generală a investiției sunt tratate în `general.md`; distribuția spațiilor, finisajele, tâmplăria și siguranța în exploatare la nivel de detaliu arhitectural sunt tratate în `arhitectura.md`; scenariul complet de securitate la incendiu (calculul de evacuare asistată, timpii RSET/ASET, instalațiile de detecție/semnalizare/stingere, organizarea de apărare împotriva incendiilor) constituie obiectul documentului dedicat `scenariu-psi.md` și nu se reia aici decât în măsura strict necesară justificării cerințelor structurale de rezistență la foc (cap. 10); instalațiile sanitare, termice și electrice sunt tratate în `instalatii.md`. Fiecare dintre aceste documente are un scop distinct și un conținut propriu — nu există suprapunere de conținut între ele, ci trimiteri reciproce prin referință.

---

## 1. Date generale ale investiției și încadrarea în clase de importanță

### 1.1. Obiectul memoriului

Prezentul memoriu tehnic de rezistență tratează structura de rezistență a unei clădiri cu destinația **creșă/grădiniță cu program prelungit**, cu o capacitate de proiectare de aproximativ **90 de copii** (4-5 grupe, de la antepreșcolari de câteva luni până la preșcolari de 5-6 ani), realizată cu regim de înălțime **parter + un etaj (P+1E)**, amplasată — ca exemplu de calcul dezvoltat integral în acest document — într-o zonă cu seismicitate ridicată, caracterizată prin accelerația terenului pentru proiectare **ag = 0,25 g** și perioada de control (colț) a spectrului **Tc = 0,7 s**. Documentația este întocmită pentru faza **D.T.A.C.**, în conformitate cu Legea nr. 169/2026 (CATUC), art. 264, Anexa nr. 2, și cu Legea nr. 10/1995 privind calitatea în construcții.

Spre deosebire de o clădire de locuit sau de birouri, unde utilizatorii sunt adulți capabili să evalueze un pericol și să se deplaseze pe cont propriu, o creșă/grădiniță adăpostește o categorie de utilizatori — copiii cu vârste între câteva luni și 5-6 ani — care nu au, prin definiție, capacitatea fizică sau cognitivă de a se autoevacua sau de a reacționa corect la un eveniment seismic. Această particularitate, aparent de natură arhitecturală sau organizatorică, are consecințe directe și cuantificabile asupra proiectării structurii de rezistență: ea determină, prin normativul de referință (P100-1/2013), încadrarea clădirii într-o clasă de importanță și expunere superioară unei clădiri obișnuite (cap. 1.3), impune o rigiditate laterală sporită care limitează avarierea elementelor nestructurale la cutremure frecvente (cap. 6.6), și condiționează soluții constructive specifice — de la ancorarea seismică a mobilierului și a echipamentelor (cap. 11) până la geometria balustradelor scărilor (cap. 4.5 și 11.7). Toate aceste consecințe sunt tratate punctual, cu justificare normativă și cu calcul, în capitolele care urmează; prezentul capitol introductiv stabilește doar cadrul general al investiției și încadrarea ei tehnică.

### 1.2. Date generale ale construcției

| Caracteristică | Valoare / Descriere |
|---|---|
| Destinația clădirii | Creșă / grădiniță cu program prelungit |
| Capacitate | ~90 copii (4-5 grupe) + personal didactic și auxiliar |
| Regim de înălțime | P+1E (parter + un etaj) |
| Înălțime liberă nivel curent | 3,00 m (înălțime finită interax planșee 3,20 m) |
| Înălțime totală la cornișă | ~7,20 m de la cota terenului sistematizat (CTS) |
| Suprafață construită la sol (Ac) | ~620 m² (exemplu de calcul, corelat cu `general.md`) |
| Suprafață desfășurată (Acd) | ~1.240 m² |
| Structură de rezistență | Cadre din beton armat monolit (stâlpi + grinzi + planșee), clasa de ductilitate medie (DCM) |
| Accelerația seismică de proiectare, ag | 0,25 g |
| Perioada de control (colț), Tc | 0,7 s |
| Categoria terenului de fundare din perspectiva răspunsului seismic | P3 (Tc = 0,7 s) |
| Categoria geotehnică (NP 074/2014) | 2 |

Aceste valori corespund exemplului de calcul dezvoltat integral în prezentul memoriu, pentru un amplasament tipic de intravilan urban din zona de est/nord-est a țării, unde perechea de parametri seismici `(ag = 0,25 g; Tc = 0,7 s)` este reprezentativă pentru numeroase municipii și orașe reședință de județ. Pentru orice alt amplasament concret, calculul din cap. 6 se re-rulează integral cu perechea `(ag, Tc)` specifică localității respective, preluată din harta de zonare seismică a P100-1/2013 (fig. 3.1 și 3.2) — metodologia și pașii de calcul rămân identici, doar valorile numerice ale spectrului se modifică. Aria construită de ~620 m² și cea desfășurată de ~1.240 m², repartizate pe două niveluri egale ca suprafață (parter și etaj, fiecare de circa 620 m²), corespund unei clădiri compacte, de tip „bandă" sau „H" ușor, cu deschideri regulate — geometrie favorabilă atât regularității structurale (cap. 2.4), cât și eficienței fluxurilor funcționale descrise în `general.md` și `arhitectura.md`.

### 1.3. Clasa de importanță și de expunere la cutremur — factorul determinant al întregii concepții structurale

Aceasta este, dintre toate încadrările normative ale clădirii, cea cu impactul cel mai direct asupra dimensionării structurii, motiv pentru care se dezvoltă pe larg în continuare, înainte de a trece la concepția sistemului structural propriu-zis.

**Textul normativ și încadrarea.** Conform **P100-1/2013, tabelul 4.2**, construcțiile pentru învățământ — și, în mod expres, creșele și grădinițele — se încadrează în **clasa de importanță și expunere II**, căreia îi corespunde **factorul de importanță γI,e = 1,2**. Formularea normativă a clasei II vizează construcțiile „a căror rezistență seismică este importantă având în vedere consecințele asociate unei prăbușiri sau avarieri grave", categorie în care intră explicit „clădirile pentru învățământ" alături de alte construcții cu aglomerări de persoane care nu se pot evacua singure sau care depind de asistență externă.

**De ce copiii 0-6 ani reprezintă cazul cel mai defavorabil de capacitate de autoevacuare.** Pentru a înțelege de ce norma tratează o creșă/grădiniță la fel de sever ca o școală (și, în anumite privințe structurale, chiar mai sever decât o clădire de birouri cu ocupare comparabilă), este util să se compare explicit cele trei clase de importanță și expunere definite de P100-1/2013 din perspectiva capacității de reacție a utilizatorilor la un cutremur:

| Clasă de importanță | γI,e | Exemple tipice | Capacitatea utilizatorilor de a reacționa/evacua |
|---|---|---|---|
| **I** | 1,4 | Spitale cu component de urgență, sedii ISU/pompieri, centrale electrice vitale, stații de pompieri | Nu se pune problema evacuării utilizatorilor — construcția trebuie să rămână **funcțională** imediat după cutremur, pentru a asigura intervenția în comunitate |
| **II** | 1,2 | Școli, **creșe/grădinițe**, spitale fără componentă de urgență, săli aglomerate, clădiri cu peste 300 de persoane | Utilizatori care **nu se pot autoevacua** (copii, persoane cu mobilitate redusă) sau aglomerări mari care necesită timp de evacuare prelungit |
| **III** | 1,0 | Locuințe, birouri, clădiri industriale curente | Utilizatori adulți, capabili, teoretic, să se autoevacueze independent |
| **IV** | 0,8 | Anexe agricole, construcții provizorii, fără utilizatori permanenți | Ocupare redusă/ocazională, consecințe reduse ale unei avarii |

Diferența esențială dintre clasa II (unde se încadrează creșa/grădinița) și clasa III (locuința obișnuită) nu ține de valoarea absolută a probabilității de prăbușire — ambele clase de clădiri sunt proiectate să nu se prăbușească la cutremurul de proiectare — ci de **marja de siguranță** cerută și de **comportarea așteptată la cutremure mai frecvente, de intensitate mai mică**. La o locuință (clasa III), este acceptabil ca, la un cutremur moderat, ocupanții — adulți, treji sau ușor de trezit, capabili să interpreteze o alarmă și să iasă pe propriile picioare — să evacueze clădirea chiar dacă aceasta suferă avarii vizibile ale elementelor nestructurale. La o creșă/grădiniță, acest scenariu nu este acceptabil: un sugar de câteva luni sau un copil de 2-3 ani nu poate ieși singur dintr-o clădire, nu poate interpreta o alarmă, nu poate coborî o scară fără ajutor și, în multe situații (orele de somn de după-amiază, de exemplu), se află într-o stare fiziologică (somn) care mărește și mai mult timpul necesar pentru „trezire + preluare + transport". Evacuarea unei grupe de creșă presupune ca personalul (o educatoare/îngrijitoare la 8-10 sugari, conform normativelor de personal din învățământul antepreșcolar) să preia fizic fiecare copil, eventual folosind cărucioare de evacuare pentru sugari, și să parcurgă traseul de evacuare — un proces intrinsec mult mai lent decât autoevacuarea unui adult și, mai important din perspectiva prezentului memoriu, un proces care **depinde critic de starea structurii și a elementelor nestructurale** pe toată durata operațiunii.

Cu alte cuvinte: la o locuință, cerința de performanță structurală la SLU este, în esență, „nu te prăbuși cât timp utilizatorii ies din clădire pe cont propriu, într-un timp scurt". La o creșă/grădiniță, cerința devine „nu te prăbuși și **nu te deformezi excesiv** cât timp personalul evacuează asistat un număr mare de copii incapabili de reacție proprie, într-un timp mult mai lung, iar traseele de evacuare (coridoare, scări) trebuie să rămână practicabile — fără căderi de tencuială, fără uși blocate de deformarea cadrelor, fără fisurarea gravă a pereților care ar putea speria suplimentar copiii sau ar putea produce accidentări secundare". Această cerință calitativ diferită este exact ceea ce traduce numeric factorul γI,e = 1,2: o majorare cu 20% a forței seismice de proiectare față de o clădire de clasă III, care se regăsește direct în calculul forței tăietoare de bază (cap. 6.4) și, prin intermediul ei, în toate secțiunile și armăturile elementelor structurale.

**Comparație cu clasa I.** Este util de precizat, pentru completitudine, de ce o creșă/grădiniță nu se încadrează în clasa I (γI,e = 1,4), rezervată construcțiilor a căror **funcționalitate imediată** după cutremur este vitală pentru intervenția în comunitate (spitale cu urgență, sedii ISU). O creșă/grădiniță nu are acest rol de infrastructură critică post-seism — obiectivul normativ pentru ea nu este ca ea să rămână funcțională imediat pentru a servi comunitatea, ci ca ea să protejeze viața propriilor ocupanți, printre cei mai vulnerabili din comunitate, permițând evacuarea lor asistată în siguranță. Această nuanță — protecția vieții unor ocupanți vulnerabili, dar fără rol de infrastructură critică pentru restul comunității — este exact ceea ce delimitează clasa II de clasa I, și este motivul pentru care γI,e = 1,2, nu 1,4.

**Consecința practică asupra proiectării.** Factorul γI,e = 1,2 intervine multiplicativ în calculul forței seismice (cap. 6.4: `Fb = γI,e · Sd(T1) · G · λ`), majorând cu 20% toate eforturile seismice de calcul față de o clădire identică de clasă III. În plus, întreaga filozofie a proiectării — limitarea deplasărilor relative de nivel la stările limită de serviciu (cap. 6.6), ancorarea riguroasă a componentelor nestructurale (cap. 11) și asigurarea unei rezistențe la foc superioare minimului (cap. 10) — este calibrată pe premisa că traseele de evacuare și integritatea elementelor nestructurale trebuie să reziste unei perioade de expunere mai lungi decât la o clădire cu utilizatori capabili de autoevacuare rapidă.

### 1.4. Categoria de importanță (HG nr. 766/1997)

Conform **HG nr. 766/1997**, anexa nr. 3 (criterii de stabilire a categoriei de importanță a construcțiilor), clădirea se încadrează în **categoria de importanță „C" — construcții de importanță normală**. Punctajul rezultat din criteriile anexei (funcțiune cu utilizatori care nu se pot autoevacua, dar arie și capacitate relativ reduse — 90 de copii pe un regim de înălțime P+1E, spre deosebire, de exemplu, de o școală mare cu sute de elevi pe mai multe niveluri, care ar putea urca spre categoria „B") plasează consecvent creșa/grădinița în categoria C, aceeași categorie tipică pentru majoritatea clădirilor publice de dimensiuni mici și medii. Corelarea celor două sisteme de clasificare — categoria de importanță „C" (Legea 10/1995, prin HG 766/1997) și clasa de importanță și expunere seismică II (P100-1/2013, γI,e = 1,2) — este consistentă: categoria „C" nu contrazice, ci se suprapune peste o clasă seismică majorată, exact fiindcă cele două clasificări răspund la întrebări diferite (importanța generală a construcției, respectiv comportarea specifică la acțiunea seismică) și nu trebuie confundate.

### 1.5. Cerințele fundamentale (Legea nr. 10/1995)

Legea nr. 10/1995 privind calitatea în construcții stabilește șase cerințe fundamentale pe care orice construcție trebuie să le satisfacă pe toată durata de existență: **A** — rezistență mecanică și stabilitate; **B** — securitate la incendiu; **C** — igienă, sănătate și mediu înconjurător; **D** — siguranță și accesibilitate în exploatare; **E** — protecție împotriva zgomotului; **F** — economie de energie și izolare termică. Structura de rezistență descrisă în prezentul memoriu răspunde direct cerinței **A — rezistență mecanică și stabilitate**, verificată la nivelurile A1 (verificarea la calcul, prin proiectant) și A2 (verificarea tehnică de proiect, obligatorie prin verificatori atestați MDLPA, independentă de proiectant, condiție de recepție și de obținere a autorizației de construire). În mod complementar, structura condiționează direct și cerința **B — securitate la incendiu** (prin clasele de rezistență la foc ale elementelor structurale, dezvoltate în cap. 10, tratată în ansamblu de `scenariu-psi.md`) și cerința **D — siguranță și accesibilitate în exploatare** (prin limitarea deplasărilor și prin ancorarea seismică a elementelor nestructurale care ar putea produce accidentări, cap. 11, precum și prin geometria balustradelor scărilor, cap. 4.5 și 11.7) — ambele cerințe fiind, la o creșă/grădiniță, deosebit de sensibile datorită vulnerabilității utilizatorilor, spre deosebire de o clădire cu utilizatori adulți, unde aceleași cerințe se verifică la un nivel de exigență standard, fără majorările și atenția suplimentară de detaliu descrise pe larg în cap. 11. Cerințele C (igienă/sănătate), E (zgomot) și F (energie), deși relevante pentru calitatea globală a investiției, nu intră în sfera prezentului memoriu de rezistență și sunt tratate, după caz, în `arhitectura.md` și `instalatii.md`.

### 1.6. Nivelul de asigurare (P100-1/2013)

Proiectarea seismică se face pentru două stări limită distincte, cu cerințe de performanță calitativ diferite:

- **Starea limită ultimă (SLU/ULS)** — corespunzătoare unui cutremur de proiectare cu intervalul mediu de recurență **IMR = 225 ani** (probabilitate de depășire de 20% în 50 de ani). Cerința de performanță: siguranța vieții — structura poate suferi avarii semnificative, inclusiv incursiuni în domeniul plastic al elementelor ductile, dar **fără prăbușire**, asigurând timpul necesar evacuării.
- **Starea limită de serviciu (SLS/DLS)** — corespunzătoare unui cutremur mult mai frecvent, cu **IMR = 40 ani** (probabilitate de depășire de 20% în 10 ani). Cerința de performanță: limitarea degradărilor la un nivel care să nu afecteze funcționalitatea imediată a clădirii.

La o clădire obișnuită (clasa III), verificarea SLS este adesea o simplă confirmare formală, rareori dimensionantă. La o creșă/grădiniță (clasa II), verificarea SLS capătă o importanță practică sporită: un cutremur cu IMR = 40 ani are o probabilitate semnificativă de a se produce chiar în timpul funcționării propriu-zise a clădirii (durata de exploatare proiectată fiind de ordinul a 50 de ani), iar cerința ca funcționalitatea să rămână neafectată — adică pereții despărțitori să nu fisureze vizibil, tâmplăria să rămână funcțională, tavanele suspendate să nu se desprindă — este exact ceea ce protejează copiii de traumatisme psihice și fizice la evenimente seismice frecvente, nu doar la cutremurul rar, major. Verificarea cantitativă a deplasărilor relative de nivel la SLS se dezvoltă în cap. 6.6, unde rezultă un drift de 5,18 mm față de o limită admisă de 16 mm — o marjă confortabilă, justificată tocmai de necesitatea menținerii funcționalității la cutremure frecvente.

### 1.7. Cadrul normativ de referință

Proiectarea structurală respectă pachetul de norme europene armonizate (Eurocoduri cu anexele naționale de aplicare) și codurile românești specifice:

- **Legea nr. 10/1995** — calitatea în construcții; cerința fundamentală **A — rezistență mecanică și stabilitate**.
- **HG nr. 766/1997** — categoriile de importanță a construcțiilor.
- **HG nr. 907/2016** — conținutul-cadru al documentațiilor tehnico-economice (aplicabil când investiția este finanțată din fonduri publice).
- **SR EN 1990:2004/NA:2006** (Eurocod 0) — bazele proiectării structurilor; grupări de acțiuni, coeficienți parțiali, factori ψ.
- **CR 0/2012** — Cod de proiectare, bazele proiectării construcțiilor (adaptarea națională a grupărilor de acțiuni).
- **SR EN 1991-1-1** (Eurocod 1, partea 1-1) — greutăți proprii și încărcări utile, pe categorii de destinație.
- **CR 1-1-3/2012** — evaluarea acțiunii zăpezii asupra construcțiilor.
- **CR 1-1-4/2012** — evaluarea acțiunii vântului asupra construcțiilor.
- **SR EN 1992-1-1:2004/NA** (Eurocod 2) — proiectarea structurilor de beton, reguli generale și reguli pentru clădiri.
- **SR EN 1992-1-2** — proiectarea structurilor de beton la acțiunea focului (metoda tabelară, aplicată în cap. 10).
- **SR EN 1998-1:2004/NA** (Eurocod 8) — proiectarea structurilor pentru rezistența la cutremur, prevalat pe teritoriul României de:
- **P100-1/2013** (cu completările ulterioare) — Cod de proiectare seismică, partea I — prevederi de proiectare pentru clădiri: clase de importanță (cap. 4.2), regularitate structurală (cap. 4.4), metode de calcul (cap. 4.5), proiectarea structurilor de beton armat și principiile de ductilitate (cap. 5), proiectarea componentelor nestructurale (cap. 10).
- **SR EN 1997-1/NA + NP 074/2014** — proiectarea geotehnică; conținutul-cadru al studiilor geotehnice.
- **NP 112/2014** — normativ pentru proiectarea structurilor de fundare directă.
- **NE 012-1/2007, NE 012-2/2010** — producerea, transportul, punerea în operă și controlul betonului și al lucrărilor de beton armat.
- **STAS 6054/77** — adâncimi de îngheț.
- **SR EN 10080 / SR 438** — oțel-beton B500C.
- **P118-1/2013, P118-2/2013, P118-3/2015** — securitatea la incendiu a construcțiilor (referință pentru clasele de rezistență la foc ale elementelor structurale, cap. 10; scenariul complet de securitate la incendiu se tratează în `scenariu-psi.md`).

Normativele specifice funcțiunii de creșă/grădiniță — NP 011-1997 (proiectarea clădirilor de învățământ preșcolar), HG nr. 1252/2012 (organizarea și funcționarea creșelor), OMS nr. 119/2014 (norme de igienă), ordinele MEN privind rețeaua școlară — sunt tratate în `general.md` și `arhitectura.md`, în măsura în care privesc dimensionarea funcțională, suprafețele pe copil și dotările; ele nu condiționează, ca atare, dimensiunile elementelor structurale, motiv pentru care nu se reiau în acest memoriu decât acolo unde intersectează direct rezistența (de exemplu, categoria de încărcare utilă corespunzătoare sălilor de grupă, cap. 5.2).

---

## 2. Descrierea sistemului structural. Alegerea sistemului. Regularitatea

### 2.1. Sisteme structurale analizate: cadre din beton armat versus zidărie confinată

Pentru o clădire de mici dimensiuni și înălțime redusă (P+1E) precum o creșă/grădiniță, practica de proiectare din România oferă, în esență, două soluții structurale viabile din punct de vedere economic: **cadrele din beton armat monolit** și **zidăria confinată** (reglementată de CR 6/2013). O a treia variantă, structura duală (cadre + pereți structurali de beton armat), este tehnic posibilă, dar rareori justificată economic la o clădire de doar două niveluri și dimensiuni moderate, unde nu există problema discontinuităților verticale sau a zvelteții pe care o astfel de soluție ar rezolva-o (spre deosebire, de exemplu, de o clădire hotelieră de tip „podium + turn" cu multe niveluri, unde structura duală este soluția firească). Comparația detaliată între cele două variante principale, pe criteriile relevante pentru funcțiunea de creșă/grădiniță, se prezintă în continuare:

| Criteriu | Cadre din beton armat (DCM) | Zidărie confinată (CR 6/2013) |
|---|---|---|
| Ductilitate / capacitate de disipare a energiei seismice | Ridicată — factor de comportare q = 3,0÷3,9 pentru clasa de ductilitate medie (DCM), respectiv până la valori superioare pentru DCH | Redusă — factor de comportare q = 2,5÷3,0, mecanism de cedare mai puțin ductil (fisurare în diagonală a panourilor de zidărie) |
| Deschideri libere mari (săli de grupă) | Foarte bune — deschideri de 6,00-7,50 m fără stâlpi intermediari, limitate practic doar de săgeata admisă a grinzilor/planșeelor | Limitate — densitatea de pereți structurali necesară pentru rigiditate laterală este incompatibilă cu săli mari, deschise, fără compartimentări interioare |
| Flexibilitate a compartimentării interioare | Mare — pereții interiori sunt nestructurali, pot fi reconfigurați ulterior (relevant pentru eventuale modificări ale programului de grupe) | Mică — o parte semnificativă a pereților interiori sunt structurali (portanți), orice modificare ulterioară a compartimentării este restricționată |
| Comportare la ag = 0,25 g, clasa de importanță II | Foarte bună — capacitatea de disipare ductilă acoperă confortabil majorarea de 20% a forței seismice impusă de γI,e | Acceptabilă doar cu limitări suplimentare de proiectare (densitate minimă de pereți pe cele două direcții, limitare a numărului de niveluri, condiții suplimentare CR 6/2013 la seismicitate ridicată) |
| Regularitate structurală impusă de normativ | Ușor de obținut la o clădire compactă — cadrele permit ajustarea fină a rigidităților pe cele două direcții prin dimensionarea individuală a stâlpilor | Necesită simetrie strictă a dispunerii pereților structurali; orice asimetrie funcțională (frecventă la o creșă, unde blocul alimentar, cabinetul medical și sălile de grupă au cerințe diferite de compartimentare) se traduce direct în excentricități de rigiditate greu de corectat |
| Control de calitate la execuție | Superior — betonul armat monolit, turnat în cofraje, cu armare proiectată explicit, este mai ușor de verificat și de certificat decât zidăria confinată, unde calitatea execuției (rosturi de mortar, calitatea cărămizilor, execuția stâlpișorilor și centurilor de confinare) depinde mai mult de mâna de lucru pe șantier | Mai vulnerabil la variații de execuție necontrolate |
| Cost relativ | Ușor superior la achiziția materialelor (cofraje, oțel, beton de calitate superioară) | Ușor inferior la achiziție, dar cu riscuri de cost ascuns dacă execuția nu este riguros supravegheată |

**Concluzia comparației și soluția adoptată.** Pentru clădirea analizată se adoptă **structura în cadre din beton armat monolit, clasa de ductilitate medie (DCM)**. Justificarea deciziei rezultă din suprapunerea a patru factori, niciunul singur suficient, dar cumulați decisivi:

1. **Seismicitatea ridicată a amplasamentului (ag = 0,25 g) combinată cu clasa de importanță II (γI,e = 1,2)** generează o forță tăietoare de bază substanțială (cap. 6.4, Fb ≈ 1.872 kN) — o structură de zidărie confinată ar necesita, pentru a acoperi această forță cu factorul de comportare mai redus specific zidăriei (q = 2,5÷3,0, față de q = 3,45 adoptat pentru cadre DCM, cap. 6.2), o densitate de pereți structurali sensibil mai mare, incompatibilă cu punctul următor.
2. **Necesitatea sălilor de grupă spațioase, fără stâlpi intermediari** — funcțiunea de creșă/grădiniță impune săli de grupă (spațiu de joacă + zonă de masă + eventual zonă de somn într-o singură încăpere, la grupele mici) cu deschideri de 6,00-7,50 m, deschideri pe care zidăria confinată nu le poate acoperi economic fără introducerea unor stâlpi/pereți intermediari care ar fragmenta exact spațiul funcțional cerut de proiectul de arhitectură. Cadrele din beton armat rezolvă natural această cerință.
3. **Ductilitatea și redundanța structurală** — un cadru din beton armat proiectat după principiile capacity design („stâlp puternic-grindă slabă", cap. 7.1) dezvoltă un mecanism de disipare distribuit pe mai multe niveluri de plastificare (articulații plastice în grinzi, la mai multe deschideri și pe ambele niveluri), evitând cedarea fragilă, concentrată, dintr-un singur plan de forfecare, caracteristică fisurării în diagonală a unui panou de zidărie confinată insuficient armat.
4. **Control de calitate superior, adecvat unei clădiri cu utilizatori vulnerabili** — la o construcție unde cerința de siguranță este majorată tocmai datorită prezenței copiilor (cap. 1.3), soluția cu grad mai ridicat de control și certificare a execuției (beton armat monolit, cu rețete de beton certificate și armare proiectată explicit, verificabilă pe șantier prin planuri de cofraj/armare) este preferabilă, la marjă de cost comparabilă, unei soluții mai sensibile la variații necontrolate de execuție.

Soluția se completează, pe toată suprafața clădirii, cu **planșee din beton armat monolit**, care asigură atât preluarea încărcărilor gravitaționale cât și rolul de șaibă rigidă indeformabilă în planul ei, esențial pentru distribuirea forțelor seismice către cadrele verticale proporțional cu rigiditatea lor (ipoteza de bază a metodei forțelor laterale echivalente, cap. 2.5).

### 2.1.1. De ce se adoptă clasa de ductilitate medie (DCM) și nu clasa înaltă (DCH)

P100-1/2013 permite proiectarea structurilor de beton armat în două clase de ductilitate: **DCM (medie)** și **DCH (înaltă)**, cu diferențe semnificative asupra factorului de comportare admis (DCH permite valori de bază qbază de până la 4,5-5,0, față de 3,0-3,9 la DCM), dar și asupra rigorii detaliilor de armare (procente de armare transversală de confinare sensibil mai mari, cerințe suplimentare de verificare a lungimilor zonelor critice, restricții mai severe asupra procentelor de armare longitudinală). Alegerea clasei DCM pentru clădirea analizată — și nu DCH — se justifică prin trei considerente convergente:

1. **Proporționalitatea efortului de proiectare cu dimensiunea și importanța relativă a investiției.** DCH este soluția tipică pentru structuri înalte sau cu solicitări seismice foarte mari, la care un factor de comportare superior aduce economii de secțiune și armătură suficient de mari pentru a justifica rigoarea suplimentară de detaliere și de execuție. La o clădire de doar P+1E, cu forța tăietoare de bază deja moderată în valoare absolută (Fb ≈ 1.872 kN, cap. 6.4), diferența de secțiune/armătură rezultată din adoptarea DCH față de DCM ar fi marginală, în timp ce riscul de erori de execuție asociat cerințelor de detaliere mai stricte (rareori stăpânite corect de echipele de execuție de la constructori mici sau medii, tipici pentru investiții publice locale de tip creșă/grădiniță) ar crește disproporționat.
2. **Coerența cu marja de siguranță deja asigurată de clasa de importanță II.** Majorarea de 20% a forței seismice prin γI,e (cap. 1.3) și adoptarea unei valori conservatoare a factorului de comportare (q = 3,45, sub valoarea teoretic posibilă de 3,9, cap. 6.2) introduc deja o marjă de siguranță suplimentară față de o clădire de clasă III proiectată la limita minimă — o marjă care acoperă, în bună măsură, aceleași obiective de siguranță pe care le-ar aduce trecerea la DCH, dar fără costul suplimentar de complexitate a execuției.
3. **Practica de proiectare consacrată pentru clădiri publice de mici dimensiuni.** DCM este, în România, soluția de facto pentru majoritatea clădirilor de învățământ de dimensiuni mici-medii (P, P+1, P+2), cu un istoric solid de comportare satisfăcătoare la cutremurele istorice relevante pentru zonele seismice ale țării, atunci când proiectarea și execuția respectă riguros principiile de proiectare la capacitate (cap. 7).

### 2.2. Descrierea de ansamblu a sistemului structural

Sistemul structural adoptat este alcătuit din următoarele componente:

- **Cadre spațiale din beton armat monolit**, dispuse pe două direcții ortogonale (notate convențional X — direcția lungă a clădirii, și Y — direcția scurtă), realizate din stâlpi și grinzi legate rigid la noduri, capabile să preia atât încărcările gravitaționale cât și pe cele laterale (seismice și de vânt) prin încovoiere și forfecare.
- **Trama structurală**: deschideri principale de 6,00 m (dimensiunea determinantă pentru dimensionarea grinzilor principale, cap. 4.3), cu travei transversale de 5,40-6,00 m, rezultând o grilă de stâlpi relativ regulată, adaptată geometriei sălilor de grupă și a spațiilor administrative/tehnice descrise în `arhitectura.md`.
- **Planșee de beton armat monolit**, cu grosime h = 15 cm, rezemate pe grinzi pe tot conturul (plăci rezemate pe contur, cu raport laturi apropiat de cel pătrat la majoritatea traveelor), armate pe ambele direcții.
- **Închideri exterioare** din zidărie nestructurală (BCA sau cărămidă), ancorată de cadrul de beton armat prin agrafe metalice, prevăzută cu termosistem conform cerințelor de performanță energetică; fiind nestructurală, ea nu participă la preluarea încărcărilor laterale, dar necesită ancorare seismică proprie pentru a nu se desprinde din plan (cap. 11.4).
- **Compartimentări interioare** din pereți ușori (gips-carton pe structură metalică) și, punctual, zidărie subțire nestructurală, **decuplate** constructiv de stâlpii cadrului la partea superioară (rost sau prindere flexibilă), tocmai pentru a evita apariția fenomenului de „stâlp scurt" — o problemă structurală specifică pe care o dezvoltăm mai jos, la cap. 2.4 și 11.4.
- **Scări interioare** realizate din rampe de beton armat monolit tip placă înclinată, cu balustrade dimensionate special pentru siguranța copiilor (cap. 4.5 și 11.7).

### 2.3. Regularitatea structurală (P100-1/2013, cap. 4.4)

Regularitatea structurii — atât în plan, cât și pe verticală — este un criteriu central al proiectării seismice moderne, pentru că determină nu doar complexitatea calculului admis (cap. 2.5), ci și marja de siguranță reală a structurii: o clădire neregulată dezvoltă concentrări de eforturi și de cerințe de ductilitate în zone imprevizibile, greu de acoperit printr-un calcul simplificat.

**Regularitatea în plan.** P100-1/2013 (§4.4.3.2) cere, pentru ca o structură să fie considerată regulată în plan: (a) o formă compactă, apropiată de dreptunghi, cu intrânduri și ieșiri care nu depășesc 25% din dimensiunea laturii corespunzătoare; (b) o distribuție a maselor și a rigidităților astfel încât centrul de rigiditate (CR) să fie apropiat de centrul de masă (CM) pe fiecare nivel, limitând excentricitatea structurală la `e0 ≤ 0,30·rx` (rx fiind raza de girație torsională pe direcția respectivă); (c) un raport al laturilor planului în limite rezonabile (de regulă λ = Lmax/Lmin ≤ 4).

O creșă/grădiniță de tip P+1E, cu program funcțional relativ simplu (grupe de vârstă mică la parter, grupe mari și zonă administrativă la etaj, conform `arhitectura.md`) și cu o amprentă la sol care nu depășește, de regulă, un dreptunghi sau o formă ușor articulată (aripă principală + corp secundar de dimensiune redusă), se pretează natural la satisfacerea acestor condiții — spre deosebire de clădiri cu program funcțional mult mai complex (de exemplu, un hotel cu podium public la parter și turn de cazare deasupra, sau o clădire spitalicească cu numeroase specialități și fluxuri separate), unde regularitatea în plan trebuie adesea „construită" prin artificii de proiectare (nuclee de rigidizare poziționate strategic, pereți suplimentari). La creșă/grădiniță, este suficient ca proiectantul de arhitectură și cel de structură să coordoneze poziția stâlpilor astfel încât aceștia să fie distribuiți relativ uniform pe conturul și pe interiorul clădirii, fără concentrări asimetrice de masă (de exemplu, blocul alimentar — cu echipamente grele — nu trebuie plasat excentric față de centrul de greutate al planului, ci echilibrat prin dispunerea corespunzătoare a celorlalte funcțiuni).

**Regularitatea în elevație.** P100-1/2013 (§4.4.3.3) cere: (a) continuitatea sistemului structural de la fundații până la ultimul nivel, fără întreruperi sau schimbări bruște de sistem constructiv; (b) absența retragerilor bruște ale planului între niveluri (o retragere e acceptată doar dacă respectă limite geometrice stricte); (c) absența mecanismului de „nivel flexibil" (soft-storey), adică rigiditatea laterală a fiecărui nivel trebuie să rămână comparabilă cu a nivelurilor adiacente, fără o reducere bruscă (tipic, atunci când parterul are goluri mari — vitrine, hale deschise — iar etajul este mult mai compartimentat, deci mai rigid); (d) evitarea stâlpilor scurți, generați fie de goluri parțiale în pereți (ferestre înalte care lasă liberă doar o porțiune redusă din înălțimea stâlpului), fie de pereți nestructurali cuplați rigid de stâlp pe o parte din înălțime.

La clădirea P+1E analizată, cu doar două niveluri de dimensiuni și funcțiuni comparabile (parter și etaj, ambele compartimentate în săli de grupă și spații conexe, fără un parter „deschis" de tip comercial), regularitatea pe verticală se obține fără dificultate: nu există niciun motiv funcțional pentru care parterul să fie mult mai puțin rigidizat decât etajul, iar continuitatea stâlpilor de la fundație la ultimul nivel este directă. Singurul punct de atenție specifică este exact cel menționat mai sus — decuplarea corectă a pereților nestructurali de compartimentare de partea superioară a stâlpilor, pentru a nu introduce accidental un stâlp scurt acolo unde, funcțional, s-ar dori un perete parțial (de exemplu, un perete jos, de tip pervaz continuu sub o fereastră mare de luminare a sălii de grupă către curte).

**Consecința regularității asupra metodei de calcul (§2.5, mai jos):** o structură regulată atât în plan cât și în elevație permite aplicarea **metodei forțelor laterale echivalente** (calcul static echivalent, cap. 6), completată — pentru verificarea distribuției reale a eforturilor la noduri și pentru determinarea precisă a deplasărilor — de o **modelare spațială cu elemente finite** (model 3D, analiză statică cu forțe echivalente sau, la faza P.Th., analiză modală cu spectre de răspuns). Dacă structura ar fi neregulată, normativul ar impune fie penalizarea factorului de comportare q (reducere cu până la 20%), fie utilizarea obligatorie a calculului modal spectral tridimensional, cu costuri suplimentare de proiectare fără beneficiu funcțional — un motiv suplimentar pentru care regularitatea este urmărită încă din faza de coordonare cu proiectul de arhitectură.

### 2.5. Metoda de calcul adoptată

Fiind o structură regulată atât în plan cât și în elevație, cu perioadă proprie de vibrație redusă (T1 = 0,33 s, cap. 6.3, situată sub perioada de colț Tc), P100-1/2013 (§4.5.3.2) permite utilizarea **metodei forțelor laterale echivalente** ca metodă principală de calcul seismic — metodă dezvoltată integral în cap. 6. Pentru verificarea distribuției reale a eforturilor la noduri, a torsiunii accidentale și a interacțiunii dintre elemente, calculul static echivalent se completează, la faza de proiect tehnic, cu un **model spațial de calcul cu elemente finite** (bare pentru stâlpi și grinzi, eventual elemente de placă pentru planșee), în care forțele determinate conform cap. 6 se aplică la nivelul fiecărui planșeu, distribuite proporțional cu masele, cu o excentricitate accidentală suplimentară de ±5% din dimensiunea planului, conform §4.4.2 din P100-1/2013.

---

## 3. Infrastructura. Studiul geotehnic. Fundațiile

### 3.1. Ipotezele asupra terenului de fundare

Dimensionarea infrastructurii se bazează pe rezultatele Studiului Geotehnic, elaborat conform **NP 074/2014** (documentații geotehnice pentru construcții) și **NP 112/2014** (proiectarea fundațiilor de suprafață), documentație obligatorie și distinctă de prezentul memoriu, ale cărei concluzii se preiau și se aplică aici. Pentru exemplul de calcul dezvoltat, se consideră următoarea stratificație tipică pentru un amplasament de câmpie/podiș din zona de est a țării, ipoteză care se confirmă sau se corectează prin forajele geotehnice efective:

| Strat | Adâncime (m) | Descriere |
|---|---|---|
| 1 | 0,00-0,80 | Umplutură / sol vegetal — se îndepărtează integral înainte de fundare |
| 2 | 0,80-2,50 | Argilă prăfoasă plastic vârtoasă |
| 3 | 2,50-6,00 | Argilă / praf argilos plastic consistent |
| 4 | > 6,00 | Nisip argilos îndesat |

Nivelul hidrostatic se situează la aproximativ **−3,50 m** față de cota terenului natural, deci sub cota de fundare adoptată (cap. 3.3), fapt ce simplifică sensibil proiectarea infrastructurii — nu este necesară o cuvă etanșă la subpresiune, spre deosebire de clădirile cu subsol amplasate pe terenuri cu apă freatică ridicată. Din stratul 2 (argilă prăfoasă plastic vârtoasă, stratul portant relevant la adâncimea de fundare adoptată), se determină **presiunea convențională de bază pconv = 200 kPa**, valoare corespunzătoare unei fundații cu lățimea B = 1,0 m și adâncimea de fundare D = 2,0 m (valorile de referință tabelare NP 112/2014), corectată — la calculul definitiv de proiect tehnic — cu coeficienții CB (funcție de lățimea reală a fundației) și CD (funcție de adâncimea reală de fundare). Clădirea se încadrează în **categoria geotehnică 2** — categorie intermediară, care presupune o structură a terenului relativ omogenă și încărcări moderate, fără complicații deosebite (spre deosebire de categoria 3, aplicabilă terenurilor dificile sau încărcărilor concentrate mari), dar suficient de complexă pentru a necesita un studiu geotehnic complet, cu foraje și încercări de laborator, nu doar o evaluare orientativă.

### 3.2. Alegerea sistemului de fundare: grătarul de grinzi de fundare versus fundațiile izolate și radierul general

La o structură în cadre din beton armat, prima opțiune care se analizează, din motive de economie, este cea a **fundațiilor izolate** — o talpă de fundație sub fiecare stâlp, independentă de tălpile vecine. Această soluție este viabilă la clădiri de clasă III (locuințe, birouri), amplasate pe terenuri omogene, în zone cu seismicitate redusă-medie, unde deplasările diferențiale ale fundațiilor nu ridică probleme structurale semnificative. La clădirea analizată, însă, trei factori converg spre respingerea acestei soluții simple și adoptarea unui **sistem de grinzi de fundare armate pe două direcții (grătar de fundații)**, care solidarizează toate tălpile de fundație într-o rețea continuă:

1. **Clasa de importanță II și seismicitatea ridicată (ag = 0,25 g).** La un cutremur major, fundațiile izolate, nesolidarizate, permit deplasări diferențiale între stâlpi — chiar dacă mici în valoare absolută, aceste deplasări introduc în cadrul suprastructurii eforturi suplimentare, necontrolate de calculul curent al suprastructurii (care presupune, implicit, reazeme fixe/nedeplasabile la baza stâlpilor). La o clădire de clasă III, această simplificare este acceptabilă ca marjă de eroare; la o clădire de clasă II, unde marja de siguranță trebuie să fie explicit mai mare (cap. 1.3), P100-1/2013 (§5.3) recomandă solidarizarea infrastructurii tocmai pentru a elimina această sursă de incertitudine.
2. **Uniformizarea presiunilor pe teren.** Rețeaua de grinzi de fundare redistribuie parțial încărcarea de la un stâlp mai solicitat către stâlpii vecini, prin conlucrare structurală, reducând vârfurile locale de presiune pe teren și oferind o marjă suplimentară de siguranță geotehnică față de presiunea convențională admisă.
3. **Preluarea momentelor de la baza stâlpilor.** Într-un cadru din beton armat cu noduri rigide, stâlpii transmit la infrastructură nu doar forță axială, ci și momente încovoietoare semnificative (cap. 6, 7). O talpă izolată, sub acțiunea unui moment important, tinde să se rotească — rotație care se propagă în suprastructură ca o deplasare suplimentară, necontrolată. Grinzile de fundare, legând tălpile între ele, se opun acestei rotații și oferă infrastructurii un comportament de ansamblu mult mai apropiat de cel al unui reazem rigid, ipoteză de bază a calculului suprastructurii.

**De ce nu se adoptă radierul general.** Radierul general — o placă unică de beton armat sub întreaga amprentă a clădirii — este soluția tipică atunci când presiunile pe teren rezultate din calcul depășesc presiunea convențională admisă a terenului (situație care ar impune reducerea presiunii de contact prin mărirea ariei de fundare la maximum posibil), sau atunci când terenul este foarte slab/neomogen, ori când există exigențe suplimentare (subsol cu cuvă etanșă, subpresiune importantă). La clădirea analizată, verificarea din cap. 3.4 arată o presiune efectivă pe teren de 138,9 kN/m², cu o rezervă de aproximativ 30% față de presiunea convențională de 200 kN/m² — deci nu există niciun motiv geotehnic pentru a recurge la soluția, mai costisitoare, a radierului general. Grătarul de grinzi de fundare reprezintă, în acest caz, soluția optimă din punct de vedere tehnico-economic: aduce toate beneficiile structurale ale solidarizării infrastructurii (punctele 1-3 de mai sus), fără costul suplimentar al unei plăci continue pe toată suprafața construită, care ar fi justificată doar dacă presiunile pe teren ar fi mai apropiate de limita admisă sau dacă structura terenului ar fi neomogenă la scara amprentei clădirii. Dacă, la faza de proiect tehnic, studiul geotehnic definitiv ar indica presiuni convenționale mai reduse decât cele ipotetice folosite aici (de exemplu, sub 150-160 kPa) sau o neomogenitate accentuată a terenului între zonele clădirii, soluția s-ar reanaliza în favoarea radierului general — variantă păstrată explicit ca alternativă în cap. 3.2 al memoriului.

Sistemul de fundare adoptat este completat de o **placă de beton armat la parter, h = 12 cm, așezată pe un strat de balast compactat de 30 cm** grosime, care preia încărcările din pardoseală și distribuie uniform pe teren, fără a avea rol structural în sensul preluării încărcărilor din suprastructură.

### 3.3. Adâncimea de fundare

Cota de fundare adoptată este **−1,50 m** de la cota terenului sistematizat (CTS). Această cotă respectă simultan două cerințe: (a) adâncimea de îngheț conform **STAS 6054/77**, care pentru zona amplasamentului analizat este de Df = 0,90-1,10 m — cota adoptată se situează cu o marjă confortabilă sub această limită, eliminând riscul de afectare a fundației prin fenomenul de îngheț-dezgheț ciclic al terenului superficial; și (b) încadrarea în stratul portant identificat de studiul geotehnic (stratul 2, argilă prăfoasă plastic vârtoasă, cap. 3.1), evitând stratul superficial de umplutură/sol vegetal (stratul 1, 0,00-0,80 m), care nu are capacitate portantă utilizabilă și trebuie întotdeauna îndepărtat integral de sub orice element de fundare.

### 3.4. Verificarea presiunii pe teren

Verificarea geotehnică fundamentală constă în compararea presiunii efective transmise de fundație terenului cu presiunea convențională admisă, determinată de studiul geotehnic. Se dezvoltă calculul pentru un stâlp interior, tipic reprezentativ pentru grinda de fundare cea mai solicitată:

Încărcarea axială de calcul la un stâlp interior, rezultată din combinația fundamentală de acțiuni pe cele două niveluri (parter + etaj) și pe suprafața aferentă (interax 6,00 m pe o direcție × deschiderea aferentă pe cealaltă direcție), se estimează la **N ≈ 750 kN**. Această încărcare se raportează la lungimea de grindă de fundare aferentă stâlpului, egală cu interaxul longitudinal L = 6,00 m, rezultând o încărcare liniară pe grinda de fundare:

`q = N/L = 750/6,00 = 125 kN/m`

Presiunea efectivă pe teren se obține împărțind această încărcare liniară la lățimea tălpii grinzii de fundare, adoptată B = 0,90 m:

`pef = q/B = 125/0,90 = 138,9 kN/m²`

Comparând această valoare cu presiunea convențională admisă a terenului, `pconv = 200 kN/m²` (cap. 3.1), rezultă:

`pef = 138,9 kN/m² ≤ pconv = 200 kN/m² → VERIFICAT`, cu o rezervă de aproximativ 30% (`(200-138,9)/200 = 30,6%`).

Această rezervă nu este întâmplătoare, ci reflectă o practică de proiectare prudentă: la o clădire de clasă de importanță II, cu utilizatori vulnerabili, o marjă confortabilă între presiunea efectivă și cea admisă absoarbe fără probleme eventualele diferențe dintre ipotezele de calcul de la faza D.T.A.C. (folosite aici, cu caracter orientativ) și valorile definitive rezultate din studiul geotehnic complet și din calculul detaliat de proiect tehnic — inclusiv o eventuală variație locală a stratificației terenului între diferitele zone ale amprentei clădirii.

### 3.5. Verificarea la gruparea seismică

Conform practicii de proiectare geotehnică, la gruparea specială (seismică) de acțiuni se admite o majorare a presiunii convenționale de bază, întrucât solicitarea seismică este de scurtă durată și cu probabilitate redusă de apariție simultană cu presiunea maximă gravitațională:

`pef,seism ≤ 1,4 · pconv = 1,4 · 200 = 280 kN/m²`

Presiunea efectivă la gruparea seismică (calculată similar cu cea de la cap. 3.4, dar incluzând contribuția suplimentară a momentului la baza stâlpului transmis prin grinda de fundare, cap. 7.6) rămâne, în calculul de predimensionare, sub această limită majorată — verificare care se reia explicit, cu valorile definitive ale eforturilor din modelul spațial, la faza de proiect tehnic.

### 3.5.1. Verificarea orientativă a tasărilor

Pe lângă verificarea de capacitate portantă (cap. 3.4-3.5), proiectarea geotehnică a unei fundații directe presupune și verificarea tasărilor absolute și diferențiale, pentru a se asigura că deformațiile terenului nu induc, la rândul lor, eforturi suplimentare necontrolate în suprastructură (fisurarea pereților, blocarea tâmplăriei, denivelări ale pardoselilor — probleme de funcționalitate, nu neapărat de siguranță structurală majoră, dar relevante tocmai la o clădire cu utilizatori copii, unde denivelările pardoselii cresc riscul de accidentare prin cădere). Pentru stratul 2 (argilă prăfoasă plastic vârtoasă, modul de deformație orientativ E ≈ 12-15 MPa, valoare tipică pentru consistența acestui tip de argilă), o presiune efectivă de contact de 138,9 kN/m² (cap. 3.4) conduce, prin metoda straturilor elementare (însumarea tasării pe adâncimea de influență semnificativă, de ordinul a 2-2,5 lățimi ale fundației sub talpă), la o tasare absolută orientativă de ordinul a **2-3 cm** — valoare care se situează confortabil sub limitele uzuale admise pentru structuri de beton armat obișnuite (tasare absolută admisă de ordinul 6-8 cm pentru structuri în cadre, conform practicii geotehnice curente și NP 112/2014). Tasarea diferențială — mai relevantă structural decât cea absolută, fiind cea care induce eforturi suplimentare în suprastructură — este limitată tocmai prin soluția de fundare adoptată (grătarul de grinzi de fundare, cap. 3.2), care solidarizează toate reazemele și distribuie orice neuniformitate locală a terenului pe o suprafață mai mare, reducând diferența de tasare între stâlpi vecini la o fracțiune din tasarea absolută calculată mai sus. Valorile definitive ale tasării se determină, evident, pe baza încercărilor de laborator efective ale studiului geotehnic (module de deformație determinate prin încercări edometrice, nu valori orientative de tabel), la faza de proiect tehnic.

### 3.6. Hidroizolații și protecția infrastructurii

Pentru protecția infrastructurii pe termen lung, se prevăd: hidroizolație orizontală sub pereții și stâlpii de la nivelul parterului (două straturi de membrană bituminoasă, întrerupând ascensiunea capilară a umidității din sol spre suprastructură); termohidroizolație sub placa de la parter; clasă de expunere **XC2** pentru elementele de infrastructură (fundații, grinzi de fundare), care presupune o acoperire de beton mărită față de elementele interioare, uscate, ale suprastructurii (cap. 9.1), datorită expunerii la umiditatea solului; trotuar perimetral cu lățime minimă de 1,00 m, cu pantă de scurgere a apelor pluviale spre exterior; și, acolo unde condițiile hidrogeologice locale ar indica un nivel al apei subterane mai ridicat decât ipoteza adoptată (cap. 3.1), un sistem de drenaj perimetral, dimensionat separat, la faza de proiect tehnic, în corelare cu studiul geotehnic definitiv.

---

## 4. Suprastructura. Elemente structurale

### 4.1. Concepția generală a suprastructurii

Elementele suprastructurii sunt concepute conform principiilor de proiectare pentru clasa de ductilitate medie (DCM), reglementate de **P100-1/2013 (cap. 5) și SR EN 1992-1-1**, completate de recomandările **NP 007** privind proiectarea structurilor de beton armat. Principiul director — dezvoltat complet la cap. 7 — este acela de **proiectare la capacitate** („capacity design"): grinzile sunt concepute ca elemente disipative, capabile să dezvolte articulații plastice controlate la extremități, în timp ce stâlpii sunt proiectați cu o suprarezistență explicită („stâlp puternic-grindă slabă"), astfel încât mecanismul de plastificare să se dezvolte distribuit, pe mai multe niveluri și deschideri, evitând concentrarea deformațiilor plastice într-un singur nivel (mecanism de tip „soft-storey", cu risc de prăbușire fragilă).

### 4.2. Stâlpii

Stâlpii sunt elementele verticale principale ale cadrelor, cu rol dublu: preluarea încărcărilor gravitaționale prin compresiune și, în combinație cu grinzile, preluarea încărcărilor laterale (seismice, vânt) prin încovoiere. Secțiunea și armarea adoptate sunt:

| Caracteristică | Valoare |
|---|---|
| Secțiune stâlpi curenți | 45 × 45 cm |
| Clasa betonului | C25/30 |
| Oțel longitudinal | BST500 (S500), procent de armare 1,0-2,5% din aria secțiunii |
| Etrieri | BST500, diametru Ø8-Ø10 |

**Verificarea efortului axial normalizat.** Cerința fundamentală de ductilitate impusă stâlpilor unui cadru DCM (P100-1/2013 §5.3.2) este limitarea efortului axial normalizat (raportul dintre încărcarea axială de calcul și capacitatea de compresiune pură a secțiunii de beton), pentru a asigura o comportare ductilă la încovoiere, nu una fragilă, dominată de zdrobirea betonului comprimat:

`νd = NEd/(Ac·fcd)`

cu `NEd = 1.050 kN` (încărcarea axială de calcul la baza stâlpului cel mai solicitat, incluzând gruparea seismică pe ambele niveluri), `Ac = 450 × 450 = 202.500 mm²` (aria secțiunii transversale a stâlpului) și `fcd = 16,67 N/mm²` (rezistența de calcul la compresiune a betonului C25/30, cap. 9.1):

`νd = 1.050.000/(202.500 × 16,67) = 0,31`

Comparând cu limita impusă pentru clasa de ductilitate medie, `νd ≤ 0,55`, rezultă **νd = 0,31 ≤ 0,55 → VERIFICAT**, cu o marjă confortabilă. Interpretarea fizică a acestei verificări este esențială pentru înțelegerea rațiunii ei: un stâlp puternic comprimat (νd apropiat de 1,0) se comportă la încovoiere într-un mod fragil, cu o capacitate de rotație plastică redusă — betonul comprimat cedează brusc, prin zdrobire, înainte ca armătura întinsă să atingă deformații plastice semnificative. Un stâlp cu efort axial normalizat redus (cazul de față, νd = 0,31) păstrează o rezervă mare de capacitate de rotație plastică, esențială mai ales la baza stâlpilor de la parter, unde — chiar și în filozofia de proiectare „stâlp puternic-grindă slabă" — normativul admite și proiectează explicit formarea unor articulații plastice (secțiunea de încastrare la infrastructură, cap. 7.2), tocmai pentru a dispune de o rezervă suplimentară de ductilitate globală a structurii.

### 4.3. Grinzile

Grinzile preiau încărcările gravitaționale ale planșeelor și le transmit stâlpilor, participând totodată la mecanismul de disipare seismică prin formarea controlată a articulațiilor plastice la extremități:

| Element | Secțiune |
|---|---|
| Grinzi principale (deschidere 6,00 m) | 30 × 60 cm |
| Grinzi secundare | 25 × 50 cm |
| Grinzi de fundare | 40 × 90 cm |

**Verificarea grinzii principale la starea limită ultimă.** Pentru grinda principală cea mai solicitată (deschidere 6,00 m), momentul încovoietor de calcul la starea limită ultimă rezultă din combinația fundamentală și din combinația seismică (cap. 5.5), luându-se în calcul valoarea mai defavorabilă: `MEd ≈ 180 kNm`. Determinarea armăturii longitudinale necesare se face cu relația de echilibru la starea limită ultimă, considerând brațul de pârghie intern al cuplului de forțe interior `z ≈ 0,9·d`, unde d este înălțimea utilă a secțiunii; pentru secțiunea 30×60 cm, cu acoperire și diametrul estimat al armăturii, rezultă `d ≈ 0,55 m` și `z ≈ 0,495 m`:

`As = MEd/(z·fyd) = 180×10⁶/(495 × 435) = 836 mm²`

unde `fyd = 435 N/mm²` este rezistența de calcul a oțelului BST500 (cap. 9.2). Se adoptă o armătură de **4Ø18** (aria efectivă `As,efectiv = 4 × 254,5 = 1.018 mm²`), care acoperă cu o rezervă de aproximativ 22% necesarul de calcul (`1.018/836 = 1,22`) — rezervă justificată de necesitatea respectării procentului minim de armare impus de P100-1/2013 pentru zonele critice ale grinzilor (§5.4.3.1.2, procent minim ρmin legat de rezistența la întindere a betonului) și de rotunjirea practică la un număr întreg de bare cu diametru standardizat. **Verificarea rezultă VERIFICAT.**

Este important de subliniat că dimensionarea la încovoiere, deși necesară, nu este singura verificare a unei grinzi într-un cadru DCM: forța tăietoare de calcul a grinzii nu se determină din analiza structurală directă, ci din **capacitatea reală la moment încovoietor a secțiunilor de la extremități** (proiectare la capacitate, cap. 7.3), tocmai pentru a garanta că grinda cedează prin încovoiere ductilă, nu prin forfecare fragilă, indiferent de eventuale suprarezistențe locale ale armăturii puse efectiv în operă.

### 4.4. Planșeele

Planșeele sunt realizate din plăci de beton armat monolit, rezemate pe contur pe grinzile cadrelor, cu grosimea **h = 15 cm**, executate din beton C25/30 și armate cu BST500. Rolul lor structural este dublu: (a) preluarea directă a încărcărilor gravitaționale (permanente și utile) și transmiterea lor, prin încovoiere pe ambele direcții, către grinzile de rezemare; (b) rolul de **șaibă rigidă** (diafragmă orizontală indeformabilă în planul ei), esențial pentru ipoteza de calcul seismic conform căreia forța seismică se distribuie către elementele verticale (stâlpi) proporțional cu rigiditatea lor laterală, indiferent de poziția exactă a maselor pe planșeu — ipoteză valabilă doar dacă planșeul este suficient de rigid și de continuu pentru a se comporta, practic, ca un corp rigid la deplasările din planul său.

**Verificarea la starea limită de serviciu — săgeata.** Pentru deschiderea maximă a plăcii (L = 6,00 m, corespunzătoare traveii principale), limita admisă a săgeții la starea limită de serviciu, conform SR EN 1992-1-1 (§7.4), este:

`f ≤ L/250 = 6.000/250 = 24 mm`

Această limită, deși generică pentru orice clădire, capătă la o creșă/grădiniță o relevanță suplimentară: o săgeată excesivă a planșeului nu doar afectează percepția vizuală și fisurarea tencuielilor, ci poate influența și comportarea elementelor nestructurale ancorate de tavan (corpuri de iluminat, eventuale tavane suspendate, cap. 11.5), motiv suplimentar pentru care verificarea la săgeată se tratează cu rigoare la faza de proiect tehnic, prin calcul de fisurare-deformație pe secțiune fisurată, nu doar prin verificarea simplificată a raportului deschidere/înălțime.

### 4.5. Scările din beton armat

Scările interioare sunt realizate din rampe monolite de tip placă înclinată, cu grosime de 15 cm, din beton C25/30. Fiind un element de circulație verticală folosit zilnic de copii — inclusiv de preșcolari mari, care circulă pe scări cu un grad rezonabil de autonomie, spre deosebire de antepreșcolarii mici, transportați de personal — geometria și dotarea scărilor primesc o atenție specifică:

**Balustradele** au înălțime minimă de 1,00 m și, esențial, un **interspațiu între bare de maximum 10 cm**. Această valoare, mai restrictivă decât cea admisă la o clădire cu utilizatori adulți (unde interspațiul uzual admis este de ordinul a 12-15 cm), este dictată exclusiv de antropometria copilului mic: rațiunea normativă (dezvoltată integral la cap. 11.7) este că, la un interspațiu mai mare, capul unui copil mic poate trece printre bare, riscând să rămână blocat la retragere sau, într-un scenariu mai grav, ca întregul corp să alunece prin gol dacă interspațiul e suficient de mare. Balustradele sunt ancorate rigid în structura de beton a rampei/podestului, cu o rezistență la împingere laterală verificată conform încărcărilor din SR EN 1991-1-1 pentru balustrade și parapete.

---

## 5. Acțiuni și combinații de încărcări

### 5.1. Încărcări permanente (SR EN 1991-1-1)

Evaluarea încărcărilor permanente pe planșeul curent (component structurală + finisaje + compartimentări echivalente) se face conform SR EN 1991-1-1, §5-6, cu valorile caracteristice ale greutăților proprii ale materialelor:

| Element | Valoare (kN/m²) |
|---|---|
| Planșeu beton armat, h = 15 cm (γbeton = 25 kN/m³) | 3,75 |
| Șapă și pardoseală (finisaj rezistent, lavabil, antiderapant, conform `arhitectura.md`) | 1,50 |
| Tavan și instalații suspendate | 0,50 |
| Pereți despărțitori (echivalent uniform distribuit, SR EN 1991-1-1 §6.3.1.2) | 1,00 |
| **Total permanent planșeu curent, gk** | **≈ 6,75** |

Valoarea de 1,00 kN/m² pentru pereții despărțitori, deși folosește metodologia de echivalare uniformă permisă de normă pentru pereți ușori cu greutate proprie sub 3,0 kN/m liniar, este adaptată specificului unei creșe/grădinițe: compartimentarea în săli de grupă de dimensiuni relativ mari, cu un număr redus de pereți interiori raportat la suprafață (spre deosebire, de exemplu, de un hotel cu multe camere mici, unde această valoare ar fi sensibil mai mare, cf. `hotelier/structura.md`), justifică o valoare moderată, dar nu neglijabilă, dat fiind că vestiarele, grupurile sanitare pe grupă și cabinetele administrative introduc totuși un număr de compartimentări interioare.

### 5.2. Încărcări utile (SR EN 1991-1-1) — categoria de destinație C, aglomerări de persoane

Sălile de grupă, dormitoarele și sălile de mese ale unei creșe/grădinițe se încadrează, din perspectiva încărcărilor utile normate, în **categoria C — zone de aglomerare de persoane**, categorie distinctă și mai severă decât categoria A (zone de locuit), motivată de faptul că aceste spații sunt gândite pentru ocuparea simultană a unui număr mare de persoane (o grupă întreagă, plus personalul), cu mobilier ușor de reconfigurat (mese, scaune mobile), nu cu o distribuție fixă și rarefiată de mobilier ca într-o locuință:

| Zonă | Categorie | qk (kN/m²) |
|---|---|---|
| Săli de grupă, dormitoare, săli de mese | C1 | **3,0** |
| Holuri, coridoare | C3 | **5,0** |
| Scări | C3 | **4,0** |
| Terasă necirculabilă | H | 0,75 |

Valorile de 5,0 kN/m² pe holuri și coridoare și 4,0 kN/m² pe scări reflectă, similar categoriei aplicate sălilor, faptul că aceste zone de circulație sunt dimensionate pentru trecerea simultană a unui număr mare de copii și personal (de exemplu, la momentele de tranziție dintre activități sau la exercițiile de evacuare, cf. `scenariu-psi.md`), un scenariu de încărcare mult mai sever decât circulația ocazională, individuală, dintr-o locuință.

### 5.3. Acțiunea zăpezii (CR 1-1-3/2012)

`s = γI,s · μ1 · Ce · Ct · sk`

cu valoarea caracteristică la sol `sk = 2,0 kN/m²` (reprezentativă pentru amplasamentul analizat), coeficientul de formă pentru acoperiș plat/terasă `μ1 = 0,8`, coeficientul de expunere `Ce = 1,0` (amplasament normal, fără expunere sau adăpostire deosebită) și coeficientul termic `Ct = 1,0`:

`s = 1,0 × 0,8 × 1,0 × 1,0 × 2,0 = 1,60 kN/m²`

### 5.4. Acțiunea vântului (CR 1-1-4/2012)

Presiunea de referință a vântului pentru amplasament, `qb = 0,5 kPa`, corectată prin coeficientul de expunere pentru teren de categoria III (suburban/periurban, tipic pentru un amplasament de creșă/grădiniță în intravilan), conduce la o presiune de vârf `qp ≈ 0,9-1,1 kPa` la înălțimea medie de aproximativ 7,2 m a clădirii. La o structură P+1E, compactă și rigidă (raport înălțime/lățime redus, spre deosebire de clădirile înalte și zvelte, cf. `hotelier/structura.md`), forța globală de vânt rezultată este cu un ordin de mărime sub forța seismică de bază (cap. 6.4, Fb ≈ 1.872 kN) — **acțiunea seismică guvernează dimensionarea structurii**, vântul verificându-se doar pentru elementele de anvelopă (ancorarea zidăriei de umplutură și a termosistemului, cap. 11.4) și, punctual, pentru elemente de acoperiș expuse.

### 5.5. Combinații de acțiuni (CR 0/2012 / SR EN 1990) și masa seismică

**Combinația fundamentală (SLU, situații persistente):**

`ΣγG·Gk + γQ·Qk` cu `γG = 1,35` și `γQ = 1,50`.

Pentru planșeul curent (cap. 5.1-5.2): `qEd = 1,35 × 6,75 + 1,50 × 3,0 = 9,11 + 4,50 = 13,61 kN/m²`.

**Combinația seismică:**

`ΣGk + AEd + Σψ2·Qk`, cu factorul de combinație cvasipermanent `ψ2 = 0,3` pentru categoria C (tabel de coeficienți ψ, SR EN 1990 anexa A / CR 0).

**Masa seismică:**

`m = ΣGk + ΣψE·Qk`, cu `ψE = φ·ψ2`. Coeficientul φ, care ține cont de probabilitatea de ocupare simultană/corelată a diferitelor niveluri, se adoptă φ = 0,8 pentru cele două niveluri ale clădirii (parter și etaj, cu ocupare comparabilă și corelată temporal — programul zilnic al copiilor pe cele două niveluri se desfășoară simultan, spre deosebire, de exemplu, de o clădire cu un singur nivel de ocupare intensă și restul tehnice/depozitare):

`ψE = φ·ψ2 = 0,8 × 0,3 = 0,24`

Această valoare a lui ψE este folosită direct în evaluarea greutății seismice totale G_total (cap. 6.4), incluzând, pe lângă încărcările permanente ale ambelor niveluri, fracțiunea de 24% din încărcarea utilă caracteristică — fracțiune care reflectă statistic gradul de ocupare probabil în momentul unui cutremur, nu ocuparea maximă instantanee (folosită doar la verificările gravitaționale de la SLU, cap. 5.5 de mai sus).

---

## 6. Calculul seismic

### 6.0. Sensibilitatea calculului la amplasament

Exemplul de calcul dezvoltat integral în acest memoriu folosește perechea de parametri seismici `(ag = 0,25 g; Tc = 0,7 s)`, reprezentativă pentru numeroase amplasamente de intravilan urban din zona de est/nord-est a țării. Pentru orice alt amplasament concret al investiției, întregul calcul din prezentul capitol se re-rulează cu perechea `(ag, Tc)` specifică localității respective, preluată din hărțile de zonare seismică ale P100-1/2013 (fig. 3.1 pentru ag, fig. 3.2 pentru Tc) — metodologia rămâne identică, se schimbă doar valorile numerice ale spectrului și, în consecință, forța tăietoare de bază și secțiunile rezultate din dimensionare. Pentru a ilustra ordinul de mărime al acestei sensibilități, se compară, orientativ, câteva amplasamente tipice pentru investiții de tip creșă/grădiniță finanțate din fonduri publice (PNRR C15, PNDL, POR):

| Amplasament (exemplu) | ag | Tc (s) | Observație privind T1 al clădirii (0,30-0,35 s) |
|---|---|---|---|
| Iași, Suceava, Botoșani, Vaslui (NE) | 0,20-0,25 g | 0,70 | sub Tc → palier maxim, ca în exemplul dezvoltat |
| **Amplasament tip, exemplul dezvoltat** | **0,25 g** | **0,70** | sub Tc → palier maxim |
| Focșani, Vrancea, Buzău (zona epicentrală Vrancea) | 0,35-0,40 g | 1,00-1,60 | sub Tc → palier maxim, dar cu forțe seismice mult mai mari (Fb proporțional cu ag) |
| București | 0,20-0,30 g | 1,60 | sub Tc (Tc mare, sol moale) → palier maxim, spectru mai lat |
| Vestul țării (Arad, Timiș, Bihor) | 0,10-0,15 g | 0,70 | sub Tc → palier maxim, forțe seismice sensibil mai reduse |

Perioada proprie a clădirii analizate (T1 = 0,33 s, cap. 6.3) — determinată exclusiv de geometria și rigiditatea structurii, independent de amplasament — rămâne, pentru toate amplasamentele relevante din tabelul de mai sus, sub perioada de colț Tc, deci ordonata spectrală normalizată este întotdeauna cea maximă (β0). Aceasta înseamnă că, spre deosebire de o structură înaltă și zveltă, la care alegerea amplasamentului poate muta perioada proprie de o parte sau de alta a perioadei de colț (cu efecte semnificative asupra ordonatei spectrale aplicabile), la o creșă/grădiniță P+1E singura variabilă relevantă la schimbarea amplasamentului este valoarea absolută a accelerației terenului ag, care intră direct, proporțional, în forța tăietoare de bază (cap. 6.4) — un amplasament în zona seismică a Vrancei (ag = 0,35-0,40 g) ar conduce la o forță tăietoare de bază cu 40-60% mai mare decât cea calculată aici, cu impact direct asupra secțiunilor de stâlpi/grinzi și asupra armăturii rezultate, în timp ce un amplasament din vestul țării (ag = 0,10-0,15 g) ar permite o structură sensibil mai economică, la aceeași concepție de ansamblu.

### 6.1. Parametrii seismici de proiectare

| Parametru | Valoare |
|---|---|
| Accelerația terenului pentru proiectare, ag | 0,25 g |
| Perioada de control (colț), Tc | 0,7 s |
| Perioada de control inferioară, TB | 0,14 s |
| Perioada de control superioară, TD | 3,0 s |
| Factorul de amplificare dinamică maximă, β0 | 2,50 |
| Factorul de importanță și expunere (clasa II) | γI,e = 1,20 |
| Clasa de ductilitate | DCM (medie) |

### 6.2. Spectrul de răspuns

Spectrul elastic de răspuns normalizat, conform P100-1/2013 (§3.1), pe palierul de perioade `TB ≤ T ≤ TC` (unde se situează, așa cum se arată în continuare, perioada proprie a clădirii), atinge valoarea maximă a factorului de amplificare dinamică:

`Se(T) = ag·β0 = 0,25g × 2,50 = 0,625 g`

Pentru trecerea de la spectrul elastic (care presupune o comportare pur elastică a structurii, ipoteză nerealistă și neeconomică pentru o structură ductilă) la spectrul de proiectare, se introduce **factorul de comportare q**, care cuantifică rezerva de capacitate de disipare inelastică a structurii:

`q = qbază · αu/α1`

unde `qbază = 3,0` este valoarea de bază pentru cadre din beton armat, clasa de ductilitate medie (DCM), regulate atât în plan cât și în elevație (P100-1/2013, tabel 5.1), iar `αu/α1 = 1,3` este factorul de suprarezistență datorat redundanței structurale (raportul dintre forța seismică la care se formează mecanismul plastic complet și cea la care apare prima articulație plastică, valoare implicită pentru structuri cu redundanță multiplă precum un cadru pe mai multe deschideri și travei):

`q = 3,0 × 1,3 = 3,9`

Din considerente de proiectare acoperitoare (marjă suplimentară pentru incertitudinile de la faza D.T.A.C., inclusiv variabilitatea reală a poziției și numărului de articulații plastice), se adoptă o valoare mai conservatoare, **q = 3,45**, folosită consecvent în toate calculele următoare.

Spectrul de proiectare (redus prin factorul de comportare) devine:

`Sd(T) = ag·β0/q = 0,25g × 2,50/3,45 = 0,181 g`

### 6.3. Perioada proprie de vibrație

Perioada proprie fundamentală a structurii se estimează, pentru faza de predimensionare, prin formula empirică a P100-1/2013 (§4.5.3.2, pentru structuri în cadre din beton armat):

`T1 = Ct·H^0,75`

unde `Ct = 0,075` (coeficient pentru cadre din beton armat) și `H = 7,20 m` (înălțimea totală a clădirii de la baza fixă la ultimul nivel, cap. 1.2):

`T1 = 0,075 × 7,20^0,75 = 0,075 × 4,40 = 0,33 s`

Comparând această valoare cu perioadele de control ale spectrului (TB = 0,14 s, TC = 0,7 s), rezultă `TB ≤ T1 ≤ TC` — perioada proprie a clădirii se situează exact pe **palierul de amplificare dinamică maximă** a spectrului de proiectare, adică ordonata spectrală aplicabilă este cea maximă, `Sd(T1) = 0,181 g`, determinată la cap. 6.2. Această situație — frecventă la clădiri joase și rigide precum o creșă/grădiniță P+1E — nu este întâmplătoare: cadrele din beton armat de mici dimensiuni au, prin natura lor, o perioadă proprie redusă (structuri rigide, cu deplasări laterale mici), care se plasează aproape sistematic pe palierul spectrului, spre deosebire de structurile înalte și zvelte (turnuri de cazare, clădiri de birouri cu multe niveluri), a căror perioadă proprie depășește adesea Tc, situându-se pe ramura descrescătoare a spectrului, cu ordonate spectrale mai reduse.

### 6.4. Forța tăietoare de bază

Forța seismică totală la baza structurii se determină cu relația fundamentală a metodei forțelor laterale echivalente:

`Fb = γI,e · Sd(T1) · G · λ`

unde `λ = 1,0` este factorul de corecție pentru clădiri cu mai puțin de trei niveluri sau cu T1 < 2·Tc (cazul de față, clădire P+1E cu T1 = 0,33 s), și `G` reprezintă greutatea seismică totală a clădirii, calculată prin însumarea încărcărilor permanente ale ambelor niveluri și a fracțiunii ψE = 0,24 din încărcările utile caracteristice (cap. 5.5). Pentru clădirea analizată, `G_total ≈ 8.618 kN`.

`Fb = 1,20 × 0,181 × 8.618 × 1,0 ≈ 1.872 kN`

Coeficientul seismic global al structurii (raportul dintre forța seismică de bază și greutatea seismică totală) rezultă:

`c = Fb/G = 1.872/8.618 = 0,217`

adică structura este proiectată pentru a prelua o forță seismică echivalentă cu aproximativ **22% din greutatea seismică totală a clădirii** — o valoare semnificativă, care reflectă cumulat seismicitatea ridicată a amplasamentului (ag = 0,25 g) și majorarea de 20% impusă de clasa de importanță II (γI,e = 1,2). Este instructiv de observat efectul separat al acestui din urmă factor: dacă clădirea ar fi fost de clasă III (γI,e = 1,0, ca o locuință obișnuită), forța tăietoare de bază ar fi fost `Fb' = 1,00 × 0,181 × 8.618 ≈ 1.560 kN`, cu aproape 17% mai mică — diferența de 312 kN reprezintă exact costul structural al deciziei normative de a proteja suplimentar utilizatorii vulnerabili ai unei creșe/grădinițe (cap. 1.3).

### 6.5. Distribuția forței tăietoare pe niveluri

Forța tăietoare de bază se distribuie pe cele două niveluri (parter și etaj/terasă) proporțional cu produsul dintre greutatea de nivel și cota sa față de bază, conform relației:

`Fi = Fb·(zi·Gi)/Σ(zj·Gj)`

| Nivel | zi (m) | Gi (kN) | Fi (kN) |
|---|---|---|---|
| Etaj (nivelul superior, sub terasă) | 7,20 | 3.987 | ~1.130 |
| Parter | 3,60 | 4.631 | ~742 |
| **Σ** | | **8.618** | **1.872** |

Distribuția reflectă principiul fizic al metodei: deși parterul are o greutate proprie ceva mai mare (4.631 kN față de 3.987 kN la etaj, reflectând inclusiv contribuția infrastructurii și a echipamentelor grele de la parter, precum blocul alimentar), forța seismică asociată nivelului superior este totuși mai mare (1.130 kN față de 742 kN), datorită brațului mai lung față de baza fixă (zi = 7,20 m față de 3,60 m) — un efect analog momentului unei console, unde forțele aplicate mai departe de încastrare produc solicitări proporțional mai mari la nivelurile intermediare de rezistență.

### 6.6. Verificarea deplasărilor laterale (drift)

Verificarea deplasărilor relative de nivel (drift) este, la o creșă/grădiniță, poate cea mai relevantă verificare din perspectiva funcționalității și a siguranței utilizatorilor, dincolo de simpla evitare a prăbușirii — motiv pentru care se dezvoltă separat pentru ambele stări limită.

**Verificarea la starea limită de serviciu (SLS).** P100-1/2013 (§4.6.3.2) limitează deplasarea relativă de nivel la cutremurul de serviciu (IMR = 40 ani, cap. 1.6) la:

`dr,SLS ≤ 0,005·h`

pentru clădiri cu componente nestructurale fixate rigid de structură (cazul de față — pereți de compartimentare, tâmplărie, tavane) — pentru înălțimea de nivel h = 3,20 m (interax planșee, cap. 1.2), limita devine `0,005 × 3.200 = 16 mm`.

Deplasarea relativă de nivel la SLS se calculează din deplasarea elastică rezultată din analiză (dre), amplificată de factorul de reducere ν = 0,5 (care ține cont de faptul că verificarea SLS se face pentru un cutremur mai frecvent și mai puțin intens decât cel de proiectare) și de factorul de comportare q:

`dr,SLS = ν·q·dre`

Pentru parter, cu deplasarea elastică de calcul `dre = 3,0 mm`:

`dr,SLS = 0,5 × 3,45 × 3,0 = 5,18 mm ≤ 16 mm → VERIFICAT`

**Verificarea la starea limită ultimă (SLU).** Limita admisă la cutremurul de proiectare (IMR = 225 ani) este mai relaxată, întrucât la SLU obiectivul este doar evitarea prăbușirii, nu menținerea funcționalității:

`dr,SLU ≤ 0,025·h = 0,025 × 3.200 = 80 mm`

`dr,SLU = c·q·dre` (cu c = 1,0):

`dr,SLU = 1,0 × 3,45 × 3,0 = 10,35 mm ≤ 80 mm → VERIFICAT`

**Interpretarea rezultatelor din perspectiva funcțiunii de creșă/grădiniță.** Marja obținută la verificarea SLS (5,18 mm față de limita de 16 mm, o rezervă de aproape 68%) nu este o simplă coincidență de calcul, ci consecința directă a alegerii unui sistem structural rigid (cadre din beton armat cu secțiuni generoase, cap. 4.2-4.3) pentru o clădire joasă și compactă. Această rigiditate laterală ridicată limitează fisurarea elementelor nestructurale (pereți despărțitori, tencuieli, tâmplărie) la cutremure frecvente, de intensitate moderată — exact situația în care, la o clădire mai flexibilă (de exemplu, un cadru mai zvelt, dimensionat strict la limita minimă de rezistență), s-ar putea produce fisuri vizibile ale pereților, blocarea ușilor prin deformarea cadrelor de tâmplărie sau desprinderea parțială a tencuielilor — fenomene care, la o clădire cu utilizatori adulți, ar fi neplăcute dar gestionabile, în timp ce la o creșă/grădiniță ar putea speria copiii, ar putea bloca temporar o cale de evacuare (o ușă deformată care nu se mai deschide corect) sau ar putea produce accidentări minore prin căderea unor fragmente de tencuială. Limitarea strictă a driftului la SLS este, așadar, o măsură structurală care servește direct cerința de evacuare asistată în siguranță, dezvoltată la cap. 10 și 11.

---

## 7. Verificări ale elementelor structurale. Proiectarea la capacitate

### 7.1. Principiul „stâlp puternic-grindă slabă"

Proiectarea la capacitate (capacity design), principiul central al proiectării seismice pentru structuri ductile (P100-1/2013 §5.3, preluat din filozofia Eurocod 8), impune ca la fiecare nod grindă-stâlp, suma capacităților la moment încovoietor ale stâlpilor care converg în nod să depășească cu o marjă explicită suma capacităților la moment încovoietor ale grinzilor:

`ΣMRc ≥ 1,3·ΣMRb`

Această inegalitate, aparent abstractă, traduce o decizie de proiectare esențială: se **alege dinainte**, prin dimensionare, unde anume structura va ceda mai întâi la un cutremur major — și se alege ca acest loc să fie grinda, nu stâlpul. Motivul este că o grindă care dezvoltă o articulație plastică la o extremitate rămâne, structural, un element orizontal, susținut în continuare de stâlpii de care este legată — cedarea ei locală nu compromite capacitatea portantă verticală a clădirii. Un stâlp care ar dezvolta o articulație plastică (sau, mai grav, o cedare) la mijlocul înălțimii unui nivel ar compromite direct capacitatea verticală a acelei zone a clădirii, cu risc de prăbușire parțială sau totală. De aceea, secțiunile și armăturile stâlpilor (cap. 4.2, 8.1) sunt dimensionate cu o rezervă de capacitate superioară celei strict necesare pentru încărcările gravitaționale și seismice determinate direct din analiză, tocmai pentru a garanta inegalitatea de mai sus.

Forța tăietoare de calcul a fiecărui element (atât grinzi cât și stâlpi) nu se preia direct din analiza structurală elastică, ci se determină din **capacitatea reală la moment încovoietor** a secțiunilor adiacente (articulațiile plastice presupuse), majorată cu un factor de suprarezistență — metodologie care garantează că elementul nu va ceda prin forfecare (mecanism fragil, brusc, fără avertisment) înainte de a-și dezvolta capacitatea de rotație plastică prin încovoiere (mecanism ductil, cu avertisment prin fisurare vizibilă și deformații mari).

### 7.2. Verificarea stâlpilor

Stâlpii sunt verificați la interacțiunea moment-forță axială (diagrama de interacțiune M-N), pe baza combinațiilor de acțiuni care produc atât valorile extreme ale efortului axial (maxim și minim), cât și valorile extreme ale momentului încovoietor, pentru fiecare combinație posibilă a acestor două eforturi (o simplă verificare separată a momentului maxim și a forței axiale maxime, fără a le combina pe cazurile de încărcare relevante, ar fi incorectă și neconservatoare). Verificarea efortului axial normalizat (cap. 4.2, νd = 0,31 ≤ 0,55) confirmă marja de ductilitate necesară; armarea transversală (etrieri Ø8-Ø10) este dimensionată pentru a asigura confinarea betonului comprimat în zonele critice (cap. 8.1), majorând capacitatea de deformație ultimă a betonului dincolo de valorile de rezistență ale betonului neconfinat.

### 7.3. Verificarea grinzilor

Grinzile sunt verificate: (a) la încovoiere, pentru a se asigura că armătura longitudinală adoptată (cap. 4.3) acoperă momentul de calcul rezultat din analiză, pe toată lungimea grinzii, inclusiv la reazeme (unde momentele negative, de continuitate, sunt frecvent superioare celor din câmp); (b) la forfecare, cu forța tăietoare de calcul determinată prin proiectare la capacitate (cap. 7.1), nu din analiza elastică directă, pentru a garanta ductilitatea mecanismului de cedare; (c) la ductilitate locală, prin verificarea raportului dintre armătura comprimată și cea întinsă în zonele critice — P100-1/2013 impune ca armătura comprimată să fie cel puțin 50% din cea întinsă în aceste zone, condiție care asigură o capacitate de rotație plastică suficientă și limitează degradarea de rigiditate la cicluri repetate de încărcare (relevantă la un cutremur real, care produce oscilații repetate, nu o singură aplicare monotonă a încărcării).

### 7.4. Verificarea planșeelor

Planșeele sunt verificate la încovoiere pe ambele direcții (plăci rezemate pe contur, cap. 4.4), la săgeată la starea limită de serviciu (verificarea de la cap. 4.4, f ≤ L/250 = 24 mm), și, calitativ, la capacitatea de a se comporta ca șaibă rigidă — verificare care, la faza de proiect tehnic, se traduce prin dimensionarea armăturii de conectare la centurile perimetrale și prin evitarea unor goluri mari, necontinuizate, care ar putea slăbi local continuitatea diafragmei orizontale.

### 7.5. Verificarea nodurilor grindă-stâlp

Nodurile — zonele de intersecție dintre stâlpi și grinzi — sunt supuse la eforturi de forfecare deosebit de mari, generate de momentele opuse ale grinzilor și stâlpilor care converg în nod. P100-1/2013 (§5.5) impune verificarea explicită a forței tăietoare în nod și dispunerea unor etrieri de confinare continui prin nod (nu doar în zonele critice adiacente ale stâlpului), pentru a evita o cedare fragilă prin forfecare a nodului însuși — un mecanism de cedare deosebit de periculos, întrucât compromite simultan integritatea a patru elemente (doi stâlpi și două grinzi, la un nod interior tipic). Ancorarea corectă a armăturii longitudinale a grinzilor în nod (lungime de ancorare suficientă dincolo de fața stâlpului) este verificată complementar.

### 7.6. Verificarea infrastructurii

Grinzile de fundare sunt verificate la momentele încovoietoare rezultate din proiectarea la capacitate a stâlpilor (nu din analiza elastică directă a infrastructurii, tocmai pentru a fi capabile să transmită la teren solicitarea reală, majorată, dezvoltată la baza stâlpilor la formarea mecanismului plastic), combinate cu reacțiunea distribuită a terenului (cap. 3.4-3.5). Se verifică, suplimentar, ca eventualele tasări diferențiale între diferitele grinzi de fundare să rămână în limitele admise pentru structuri obișnuite (conform NP 112/2014), limite care, la un sistem de fundare solidarizat printr-un grătar continuu de grinzi (cap. 3.2), sunt atinse cu o marjă suplimentară de siguranță față de un sistem de fundații izolate independente.

---

## 8. Detalii de armare seismică (ductilitate locală)

Detaliile de armare din zonele critice ale elementelor structurale sunt cele care transformă, în practică, principiile de proiectare la capacitate (cap. 7) în capacitate reală de deformație plastică — o armare longitudinală corect dimensionată, dar fără o armare transversală de confinare adecvată în zonele critice, nu ar realiza ductilitatea presupusă de factorul de comportare q = 3,45 adoptat la cap. 6.2.

### 8.1. Zonele critice ale stâlpilor

Lungimea zonei critice la extremitățile stâlpilor (unde se concentrează, la un cutremur major, cererea de deformație plastică și unde armătura transversală trebuie să fie deosebit de deasă) se determină ca valoarea cea mai mare dintre:

`lcr = max(h; hliber/6; 450 mm) ≈ 45-55 cm`

unde h este dimensiunea secțiunii stâlpului (45 cm) și hliber este înălțimea liberă a stâlpului la nivelul respectiv. În aceste zone, se dispun etrieri de confinare la un pas redus, `Ø10/100 mm`, cu condiția suplimentară ca distanța dintre etrieri să nu depășească niciodată cea mai mică dintre valorile `6dbL` (de șase ori diametrul barei longitudinale celei mai subțiri, pentru a evita flambajul local al armăturii comprimate între etrieri), `b0/2` (jumătate din dimensiunea miezului confinat) și 100 mm. Etrierii sunt completați, pe secțiune, cu agrafe suplimentare, pentru a asigura confinarea eficientă a întregii secțiuni, nu doar a perimetrului.

### 8.2. Zonele critice ale grinzilor

Analog stâlpilor, lungimea zonei critice la extremitățile grinzilor este:

`lcr = 1,5·h ≈ 90 cm` (pentru grinda principală, h = 60 cm)

cu etrieri de confinare la pas redus, `Ø8/100-150 mm`, primul etrier dispus la maximum 50 mm de fața stâlpului — o prevedere de detaliu aparent minoră, dar care asigură confinarea betonului chiar din imediata vecinătate a nodului, exact acolo unde se dezvoltă articulația plastică proiectată.

### 8.3. Noduri grindă-stâlp

Nodurile primesc etrieri de confinare continui, cu aceeași densitate ca și zonele critice adiacente ale stâlpului, pentru a asigura integritatea nodului la forțele de forfecare mari care se dezvoltă aici (cap. 7.5).

### 8.4. Ancorări și înnădiri ale armăturii

Lungimea de ancorare de bază a armăturii longitudinale este estimată la `lb ≈ 40Ø` (de 40 de ori diametrul barei), valoare care se ajustează, la calculul definitiv, în funcție de condițiile de aderență și de starea de tensiune a betonului din zona respectivă. Înnădirile prin suprapunere ale armăturii stâlpilor se dispun la o lungime `l0 ≈ 50Ø`, sistematic **în afara zonelor critice** (adică la mijlocul înălțimii libere a stâlpului, unde solicitările la încovoiere sunt mult mai reduse decât la extremități) — o regulă de detaliu esențială, deoarece o înnădire prin suprapunere plasată într-o zonă critică ar constitui un punct slab exact acolo unde se așteaptă cererea maximă de ductilitate. Similar, înnădirile armăturii grinzilor se dispun în zonele de moment redus (aproximativ în treimea mijlocie a deschiderii pentru armătura de la partea inferioară), nu în zonele critice de la reazeme.

### 8.5. Acoperiri cu beton

Acoperirile nominale cu beton (nominal cover, `cnom = cmin + Δcdev`) sunt diferențiate pe clase de expunere: **XC1** pentru elementele interioare, uscate, ale suprastructurii (cnom = 25-30 mm) și **XC2** pentru elementele de infrastructură, expuse la umiditatea solului (cnom = 45-50 mm, cap. 3.6) — diferența reflectă direct riscul de coroziune a armăturii, mult mai ridicat în mediul umed al infrastructurii decât în interiorul uscat al unei săli de grupă.

---

## 9. Materiale

### 9.1. Betoane

| Element | Clasă beton | fcd (N/mm²) |
|---|---|---|
| Fundații (grinzi de fundare, tălpi) | C20/25-C25/30 | 13,3-16,67 |
| Stâlpi, grinzi (suprastructură) | C25/30 | 16,67 |
| Planșee, scări | C25/30 | 16,67 |
| Egalizare (sub fundații) | C8/10 | — |

Se observă că, spre deosebire de o structură de dimensiuni mai mari sau cu solicitări foarte diferențiate între elemente (unde s-ar justifica o diferențiere a claselor de beton pe tipuri de elemente, cf. `hotelier/structura.md`), la clădirea P+1E analizată o singură clasă curentă de beton, **C25/30**, acoperă economic toate elementele suprastructurii — soluție rezonabilă la o clădire de mici dimensiuni, unde diferențierea claselor de beton ar complica inutil aprovizionarea și controlul de calitate pe șantier, fără un beneficiu economic proporțional. Clasa C20/25, ca alternativă la fundații, se poate adopta acolo unde solicitările locale sunt reduse și studiul geotehnic nu impune o clasă superioară pentru durabilitate.

`fcd(C25/30) = 25/1,5 = 16,67 N/mm²` (`γc = 1,5`, `αcc = 1,0`, coeficienți standard conform NA românesc).

### 9.2. Oțel-beton

Se adoptă, la toate elementele structurale, oțel **BST500 (S500)**, clasa de ductilitate **C** (impusă de P100-1/2013 în toate zonele disipative, deci practic generalizată pe întreaga structură, pentru a evita confuziile de aprovizionare/punere în operă pe șantier):

- Limita de curgere caracteristică: `fyk = 500 N/mm²`;
- Rezistența de calcul: `fyd = fyk/γs = 500/1,15 = 435 N/mm²` (rotunjit);
- Raportul de ductilitate minim: `(ft/fy)k ≥ 1,15`, condiție esențială pentru a asigura o rezervă de rezistență peste curgere, necesară dezvoltării unor articulații plastice stabile, cu ecruisare, nu o cedare bruscă imediat după atingerea limitei de curgere.

Pentru plăcile de beton armat (planșee), se poate folosi complementar plasă sudată STNB, în zonele fără cerințe explicite de ductilitate seismică locală (de exemplu, armătura de repartiție, distinctă de armătura principală de rezistență).

### 9.3. Zidăria de umplutură

Zidăria exterioară (BCA sau cărămidă, cap. 2.2) este strict nestructurală — nu participă la calculul de rezistență al structurii de rezistență și nu se include în modelul de calcul seismic ca element rigidizant, tocmai pentru a evita o subestimare a forțelor seismice reale ale cadrului (o zidărie de umplutură rigidă, neluată în calcul, ar putea în realitate prelua o parte din forța seismică înainte de a fisura, modificând local distribuția de eforturi) — ea este, în schimb, dimensionată separat la ancorarea seismică proprie (cap. 11.4), pentru a nu se prăbuși în afara planului la deplasările laterale ale cadrului.

---

## 10. Rezistența la foc a structurii și legătura cu evacuarea asistată

### 10.1. Gradul II de rezistență la foc — cerințe pentru elementele structurale

Conform **SR EN 1992-1-2** (proiectarea structurilor de beton la acțiunea focului, metoda tabelară) și **P118-1/2013**, clădirea se încadrează la **gradul II de rezistență la foc** — încadrare stabilită de scenariul de securitate la incendiu (`scenariu-psi.md`) pe baza funcțiunii, ariei construite și a categoriei de risc, și preluată aici doar în măsura în care condiționează dimensiunile și acoperirile elementelor structurale de beton armat:

| Element | Criteriu de rezistență la foc | Asigurare prin secțiune/acoperire |
|---|---|---|
| Stâlpi | **R120** | secțiune ≥ 350 mm (adoptat 450 mm), acoperire a ≥ 45 mm |
| Grinzi | **R120** | lățime ≥ 200 mm (adoptat 300 mm), acoperire a ≥ 45 mm |
| Planșee | **REI 90-120** | grosime ≥ 120 mm (adoptat 150 mm), acoperire a ≥ 40 mm |
| Scări de evacuare | **R120/REI120** | secțiune și acoperire echivalente elementelor de mai sus |

Secțiunile și acoperirile adoptate din considerente structurale (cap. 4.2-4.5, 8.5) satisfac integral gradul II de rezistență la foc **fără nicio protecție suplimentară** (tencuieli termoizolante, vopsele intumescente) pentru elementele de beton armat — un avantaj intrinsec al soluției în beton armat monolit, la care masivitatea secțiunilor necesare oricum din calculul seismic (cap. 4, 8) depășește confortabil cerințele minime de rezistență la foc, spre deosebire, de exemplu, de o structură metalică, la care protecția la foc a elementelor ar constitui un capitol separat, cu costuri suplimentare semnificative.

### 10.2. De ce evacuarea asistată impune o rezervă structurală suplimentară de timp

Verificarea R120/REI120 (rezistență la foc de 120 de minute) nu este o simplă bifare a unei cerințe tabelare, ci răspunde unei nevoi funcționale concrete, specifice unei clădiri cu utilizatori care nu se pot autoevacua. La o clădire cu utilizatori adulți, timpul de evacuare — chiar și în scenariul cel mai defavorabil (o cale de evacuare blocată) — este de ordinul câtorva minute, mult sub cei 120 de minute de rezistență la foc asigurați structurii. La o creșă/grădiniță, timpul de evacuare **asistată** (calculat integral în `scenariu-psi.md`, unde rezultă un RSET de ordinul a 5 minute chiar și în scenariul cu o scară blocată, datorită necesității preluării fizice a fiecărui copil, folosirii cărucioarelor de evacuare pentru sugari și organizării în șir a preșcolarilor) este de câteva ori mai mare decât la o clădire cu utilizatori adulți — deși rămâne, cu o marjă amplă, sub cele 120 de minute de rezistență structurală la foc.

Relevanța acestei marje pentru prezentul memoriu de rezistență este următoarea: gradul II de rezistență la foc, superior minimului absolut care ar putea fi acceptat la o clădire de risc mic cu utilizatori adulți, oferă o rezervă de timp suplimentară tocmai pentru a acoperi confortabil durata mai lungă, intrinsecă, a unei evacuări asistate — inclusiv eventualele întârzieri neplanificate (o ușă care se blochează, un copil care refuză să coopereze, necesitatea de a reveni pentru un copil uitat). Structura de rezistență, prin secțiunile și acoperirile de beton adoptate (cap. 10.1), contribuie astfel direct la marja de siguranță globală a scenariului de evacuare, alături de măsurile de compartimentare, detecție și dotare tratate integral în `scenariu-psi.md`.

### 10.3. Verificarea tabelară — corelarea cu ductilitatea seismică

Este de remarcat că acoperirile de beton adoptate din motive de rezistență la foc (cap. 10.1, a ≥ 45 mm la stâlpi și grinzi) sunt comparabile, ca ordin de mărime, cu acoperirile adoptate din motive de durabilitate la elementele de infrastructură (cap. 8.5, XC2, cnom = 45-50 mm) — o coincidență favorabilă, care simplifică armarea de detaliu, dar care nu trebuie extinsă mecanic la elementele interioare de clasă XC1 (cnom = 25-30 mm), unde cerința de rezistență la foc (a ≥ 45 mm pentru stâlpi/grinzi, conform tabelului de mai sus) devine, de fapt, **determinantă** față de cerința de durabilitate (XC1, care ar admite o acoperire mai mică) — la faza de proiect tehnic, se adoptă întotdeauna valoarea maximă rezultată din compararea celor două cerințe (durabilitate versus rezistență la foc), verificare care se reia explicit element cu element.

---

## 11. Măsuri structurale și nestructurale specifice creșei/grădiniței

### 11.1. De ce componentele nestructurale devin, la o creșă/grădiniță, la fel de critice ca structura însăși

Statisticile internaționale privind rănirile produse la copii în timpul cutremurelor arată, în mod repetat, că majoritatea accidentărilor din interiorul clădirilor de învățământ nu provin din colapsul structural (eveniment, la clădiri proiectate și executate corect, extrem de rar), ci din **căderea sau răsturnarea obiectelor nefixate**: dulapuri și rafturi care se răstoarnă peste copii, tavane suspendate care se desprind, corpuri de iluminat care cad, echipamente (televizoare, calculatoare, aparate de aer condiționat) care se desprind de pe suporturi improvizate. Această observație — validată de studii post-seismice repetate la nivel internațional — schimbă radical accentul proiectării la o clădire cu utilizatori vulnerabili: dacă la o clădire de birouri ancorarea seismică a mobilierului este, în cel mai bun caz, o recomandare de bună practică, la o creșă/grădiniță ea devine o **cerință structurală explicită**, tratată cu aceeași rigoare ca dimensionarea unui stâlp sau a unei grinzi, tocmai pentru că marea majoritate a rănirilor probabile la un eveniment seismic provin de aici, nu din avarierea elementelor structurale primare (care, la clădirea proiectată conform cap. 1-8, rămân, prin proiectare la capacitate, într-un domeniu de comportare controlat, ductil, fără prăbușire).

Această secțiune a memoriului dezvoltă, punctual, măsurile pe care structura de rezistență trebuie să le prevadă (sau la care trebuie să ofere suportul de ancorare corespunzător) pentru fiecare categorie de componentă nestructurală relevantă pentru o creșă/grădiniță.

### 11.2. Formula de proiectare a ancorărilor seismice (P100-1/2013, cap. 10)

P100-1/2013, capitolul 10 (proiectarea elementelor nestructurale), stabilește o metodologie explicită de calcul a forței seismice orizontale de proiectare pentru orice componentă nestructurală (element neconstructiv sau instalație) ancorată de structură:

`Fa = γa·Sa·ma/qa`

unde:
- `Fa` este forța seismică orizontală de proiectare a ancorajului componentei respective;
- `γa` este factorul de importanță al componentei nestructurale — pentru elementele a căror cedare ar pune în pericol viața ocupanților (cazul mobilierului înalt, al tavanelor suspendate, al corpurilor de iluminat grele dintr-o sală ocupată permanent de copii), P100-1/2013 impune un factor **γa majorat**, de regulă egal cu factorul de importanță al clădirii înseși sau superior, tocmai pentru a reflecta severitatea consecințelor unei cedări la o clădire cu utilizatori vulnerabili;
- `Sa` este accelerația spectrală de etaj, care depinde de poziția componentei pe înălțimea clădirii (componentele situate la niveluri superioare, mai departe de bază, sunt supuse unor accelerații de etaj amplificate față de accelerația la nivelul terenului — un fenomen analog amplificării dinamice descrise la distribuția forței tăietoare pe niveluri, cap. 6.5) și de raportul dintre perioada proprie a componentei și cea a structurii;
- `ma` este masa componentei nestructurale ancorate;
- `qa` este factorul de comportare al componentei nestructurale/al sistemului ei de ancorare — mult mai redus decât factorul de comportare al structurii principale (q = 3,45, cap. 6.2), întrucât un sistem de ancorare (agrafe metalice, console, tije de suspendare) nu are, de regulă, o capacitate de disipare ductilă comparabilă cu cea a unui cadru de beton armat proiectat la capacitate — pentru majoritatea ancorajelor rigide, se adoptă conservator `qa = 1,0-1,5`.

**Exemplu numeric de aplicare — un dulap înalt de depozitare, ancorat la etajul clădirii.** Pentru a ilustra concret aplicarea formulei, se consideră un dulap de depozitare de 2,00 m înălțime, cu masă `ma = 150 kg` (dulap plin cu materiale didactice), ancorat de peretele structural de la etaj (nivelul superior al clădirii, unde accelerația de etaj este maximă). Se adoptă `γa = 1,2` (egal cu factorul de importanță al clădirii, dat fiind riscul pentru viață în caz de răsturnare peste copii), `Sa ≈ 0,50 g` (valoare orientativă pentru un element rigid situat la partea superioară a unei clădiri cu Sd(T1) = 0,181g, amplificată prin factorul de amplificare de etaj specific componentelor rigide de la niveluri superioare) și `qa = 1,0` (ancorare rigidă, fără capacitate de disipare):

`Fa = γa·Sa·ma/qa = 1,2 × 0,50 × (150×9,81/1000)/1,0 ≈ 1,2 × 0,50 × 1,47 ≈ 0,88 kN`

Această forță orizontală, de aproximativ 0,88 kN (echivalentă cu greutatea proprie a dulapului multiplicată de aproape 60%), trebuie preluată integral de sistemul de ancorare (console/agrafe metalice fixate în peretele sau stâlpul structural, cu diblu chimic sau mecanic dimensionat la smulgere și forfecare) — o forță care, aplicată la partea superioară a unui dulap înalt și îngust, generează și un moment de răsturnare semnificativ, verificat separat la proiectarea ancorajului. Fără această ancorare, la un cutremur chiar și de intensitate moderată (mult sub cutremurul de proiectare SLU), un dulap de această masă și înălțime s-ar putea răsturna, cu consecințe potențial grave pentru copiii aflați în încăpere — motivul pentru care interdicția mobilierului nefixat în spațiile ocupate de copii nu este o recomandare estetică, ci o măsură de siguranță calculabilă și verificabilă.

### 11.3. Mobilierul înalt: dulapuri, rafturi, vestiare

Toate piesele de mobilier cu înălțime care depășește aproximativ jumătate din înălțimea unui copil de vârsta grupei respective (deci practic orice dulap, raft sau vestiar de dimensiuni normale pentru depozitare de materiale didactice, haine sau jucării) se **ancorează rigid de pereți sau de elementele structurale**, prin console sau agrafe metalice dimensionate conform metodologiei de la cap. 11.2. Este interzisă, în spațiile ocupate de copii (săli de grupă, dormitoare, coridoare de acces), amplasarea oricărui mobilier înalt nefixat, indiferent de masa aparent redusă a acestuia — principiul de proiectare fiind acela că orice obiect capabil să se răstoarne peste un copil trebuie fie eliminat din proximitatea zonelor ocupate, fie ancorat conform calculului. Vestiarele — element de mobilier specific unei creșe/grădiniță, prezente în număr mare (câte un modul per copil, la fiecare grupă) — se ancorează în șir, la partea superioară, de peretele adiacent, tratament identic dulapurilor individuale.

### 11.4. Pereții despărțitori ușori: decuplare și evitarea stâlpului scurt

Pereții de compartimentare interioară (gips-carton pe structură metalică, zidărie subțire nestructurală, cap. 2.2) sunt ancorați de stâlpii și planșeele structurii, dar **decuplați constructiv la partea superioară** — printr-un rost umplut cu material elastic sau printr-o prindere cu joc controlat — pentru două motive complementare: (a) evitarea transmiterii încărcărilor gravitaționale ale planșeului superior (care se deformează sub încărcare, inclusiv prin săgeata verificată la cap. 4.4) direct în peretele nestructural, ceea ce ar putea fisura sau chiar avaria peretele la o simplă deformație gravitațională normală, fără nicio legătură cu acțiunea seismică; și (b) evitarea fenomenului de **„stâlp scurt"** — o problemă structurală severă care apare atunci când un perete nestructural, cuplat rigid de un stâlp doar pe o porțiune din înălțimea liberă a acestuia (de exemplu, un pervaz continuu sub o fereastră, care rigidizează stâlpul doar pe partea inferioară), forțează practic întreaga deplasare laterală seismică să se concentreze pe porțiunea rămasă liberă, nerigidizată, a stâlpului. Această porțiune „scurtă" a stâlpului preia, la aceeași deplasare laterală impusă de restul structurii, o forță tăietoare mult mai mare decât cea pentru care a fost dimensionată (forța tăietoare a unui stâlp fiind invers proporțională cu pătratul lungimii sale libere, la o rigiditate dată), riscând o cedare fragilă prin forfecare — exact mecanismul de cedare pe care întreaga filozofie de proiectare la capacitate (cap. 7.1) urmărește să îl evite. Evitarea stâlpului scurt la o creșă/grădiniță este cu atât mai importantă cu cât ferestrele mari, joase, către curte (frecvente în proiectele de arhitectură ale sălilor de grupă, pentru luminozitate și supraveghere vizuală a spațiului de joacă exterior) sunt exact configurația geometrică predispusă acestui fenomen — motiv pentru care coordonarea dintre proiectul de arhitectură și cel de structură, la definirea poziției și înălțimii golurilor de fereastră, se face cu atenție explicită la acest risc.

### 11.5. Tavanele suspendate

Acolo unde proiectul de arhitectură prevede tavane false/suspendate (pentru integrarea instalațiilor de ventilație, iluminat sau pentru corectarea acustică a sălilor de grupă, cerință tratată în `arhitectura.md` și `instalatii.md`), sistemul de suspendare se dimensionează ca **sistem seismic**, cu tije de susținere verticale completate de **contravântuiri** orizontale (diagonale sau în cruce) la intervale regulate, care preiau componenta orizontală a forței seismice de proiectare a tavanului, calculată conform formulei de la cap. 11.2 (adaptată masei proprii a tavanului fals, incluzând stratul de vată minerală/izolație și corpurile de iluminat înglobate). Un tavan suspendat fără contravântuiri seismice, susținut doar de tije verticale, poate oscila necontrolat lateral la un cutremur și se poate desprinde parțial sau total din prinderile de la perimetru — risc inacceptabil deasupra unei săli ocupate permanent de copii.

### 11.6. Corpuri de iluminat, echipamente și radiatoare

Toate corpurile de iluminat suspendate, echipamentele HVAC montate pe tavan sau pe perete (unități de climatizare, ventiloconvectoare), precum și radiatoarele de încălzire montate pe console, se prevăd cu **prinderi seismice verificate**, dimensionate conform formulei P100-1/2013 §10 (`Fa = γa·Sa·ma/qa`, cap. 11.2), cu factorul de importanță `γa` majorat, similar mobilierului înalt, dat fiind riscul de cădere peste copii aflați dedesubt. Radiatoarele, în particular, primesc o atenție suplimentară nu doar din perspectiva ancorării seismice, ci și a protecției la contact direct (cerință de siguranță în exploatare tratată în `arhitectura.md`), cele două cerințe — ancorare seismică și protecție anti-arsură — fiind complementare, nu concurente, în alegerea sistemului de fixare.

### 11.7. Balustradele scărilor: rațiunea interspațiului de maximum 10 cm

Cerința de la cap. 4.5 — interspațiu maxim 10 cm între barele verticale ale balustradelor — merită o dezvoltare separată a rațiunii ei fizice, dat fiind că este una dintre cele mai vizibile și mai frecvent verificate cerințe de siguranță la o clădire de învățământ preșcolar. Antropometria capului unui copil mic (sub aproximativ 3-4 ani) permite trecerea acestuia printr-un interspațiu mai mare de 10-12 cm; problema de siguranță nu este, însă, trecerea propriu-zisă a capului, ci **retragerea** — un copil poate împinge capul printr-un interspațiu suficient de larg din curiozitate sau joacă, dar structura anatomică a craniului și a urechilor face ca retragerea capului prin același gol să fie mult mai dificilă, cu risc real de blocare, panică și, în cazuri grave, asfixiere prin compresie pe gât dacă restul corpului alunecă suplimentar prin gol în timp ce capul rămâne prins. Limitarea interspațiului la 10 cm elimină practic această posibilitate pentru toate grupele de vârstă ale unei creșe/grădinițe, inclusiv cele mai mici. Această cerință, deși aparține mai degrabă domeniului siguranței în exploatare (cerința D, Legea 10/1995, cap. 1.5) decât celui al rezistenței mecanice propriu-zise, este inclusă în prezentul memoriu de rezistență tocmai pentru că balustrada, ca element ancorat rigid în structura de beton a rampei (cap. 4.5), face obiectul dimensionării și verificării structurale a acestei ancorări — inclusiv la forțele de împingere laterală normate pentru parapete și balustrade (SR EN 1991-1-1), majorate, la o clădire cu utilizatori care se pot sprijini sau împinge neprevăzut în balustradă în timpul jocului, față de valorile minime aplicabile unei clădiri cu utilizatori adulți.

### 11.8. Rosturi, redundanță structurală și evitarea colapsului progresiv

Deși clădirea analizată este un corp unic, compact, fără rosturi de tasare sau seismice (o clădire P+1E de dimensiuni moderate nu justifică, de regulă, fragmentarea în tronsoane separate prin rosturi, spre deosebire de clădirile mari, alungite sau cu geometrie complexă), principiul general conform căruia rosturile — acolo unde ar exista, de exemplu între clădirea principală și o eventuală anexă tehnică independentă — trebuie dimensionate la o lățime cel puțin egală cu suma deplasărilor laterale de calcul la SLU ale celor două structuri adiacente, pentru a evita fenomenul de **pounding** (ciocnirea reciprocă a celor două structuri la deplasări laterale mari, cu risc de avariere locală concentrată), rămâne o regulă de proiectare de reținut pentru orice extindere ulterioară a incintei.

Suplimentar, structura beneficiază de o **redundanță intrinsecă** dată de sistemul de cadre multiple pe ambele direcții (spre deosebire de un sistem cu un număr mic de elemente rezistente principale, unde cedarea unui singur element ar putea antrena o redistribuire bruscă și necontrolată a eforturilor): armătura de continuitate dispusă în planșee la partea inferioară, peste reazeme (armătură care rămâne activă chiar dacă un reazem local ar suferi o avarie neprevăzută, permițând planșeului să funcționeze temporar ca element suspendat, tip „catenar", pe reazemele vecine rămase intacte) și legăturile de continuitate dintre grinzile de fundare la infrastructură (cap. 3.2) contribuie amândouă la evitarea unui **colaps progresiv** — situația în care avaria locală, izolată, a unui singur element ar putea antrena, prin efect de domino, prăbușirea unei porțiuni extinse a structurii. Această cerință de redundanță, deși nu este cuantificată printr-un calcul specific separat la faza D.T.A.C., este un criteriu calitativ urmărit explicit în alegerea sistemului structural (cap. 2.1) și în detaliile de armare de continuitate ale planșeelor și infrastructurii.

---

## 12. Concluzii. Verificarea tehnică

Structura de rezistență a creșei/grădinițe cu program prelungit, regim de înălțime P+1E, capacitate ~90 de copii, analizată în prezentul memoriu, respectă cerința fundamentală A (rezistență mecanică și stabilitate, Legea nr. 10/1995), corelată cu cerințele B (securitate la incendiu) și D (siguranță în exploatare), pe baza următoarei sinteze a verificărilor dezvoltate în capitolele precedente:

- **Încadrarea normativă:** categoria de importanță C (HG 766/1997) și clasa de importanță și expunere seismică **II** (P100-1/2013, γI,e = 1,2), justificată pe larg (cap. 1.3) prin incapacitatea de autoevacuare a copiilor 0-6 ani și prin necesitatea menținerii funcționalității traseelor de evacuare pe durata unei evacuări asistate, mai lentă decât autoevacuarea unei populații adulte.
- **Sistemul structural:** cadre din beton armat monolit, clasa de ductilitate medie (DCM), regulate atât în plan cât și în elevație (cap. 2), alese ca soluție superioară zidăriei confinate pentru acest caz specific (deschideri mari fără stâlpi intermediari, seismicitate ridicată combinată cu clasa II, control de execuție superior).
- **Infrastructura:** grinzi de fundare armate pe două direcții (grătar de fundații), solidarizând toate tălpile, cu presiunea efectivă pe teren `pef = 138,9 kN/m²` verificată confortabil sub presiunea convențională admisă `pconv = 200 kN/m²` (rezervă ~30%, cap. 3.4), și sub limita majorată la gruparea seismică (280 kN/m², cap. 3.5).
- **Suprastructura:** stâlpi 45×45 cm C25/30 (efort axial normalizat νd = 0,31 ≤ 0,55, cap. 4.2), grinzi principale 30×60 cm și secundare 25×50 cm, dimensionate la încovoiere (As = 836 mm² acoperit prin 4Ø18, cap. 4.3) și verificate la proiectare la capacitate (cap. 7), planșee de 15 cm cu săgeată verificată sub L/250 = 24 mm (cap. 4.4).
- **Calculul seismic:** spectru de proiectare Sd(T1) = 0,181 g (cu perioada proprie T1 = 0,33 s situată pe palierul maxim al spectrului, cap. 6.3), factor de comportare q = 3,45, forța tăietoare de bază `Fb ≈ 1.872 kN` (≈ 22% din greutatea seismică totală, cap. 6.4), cu deplasările relative de nivel verificate atât la SLS (5,18 mm ≤ 16 mm, cap. 6.6) cât și la SLU (10,35 mm ≤ 80 mm).
- **Rezistența la foc:** gradul II de rezistență la foc (R120/REI120 la elementele principale), asigurat integral prin secțiunile și acoperirile de beton adoptate din considerente structurale, fără protecții suplimentare, cu o marjă de timp care acoperă confortabil durata mai lungă a unei evacuări asistate a copiilor (cap. 10).
- **Măsurile specifice pentru copii:** ancorarea seismică calculată (formula P100-1/2013 §10, `Fa = γa·Sa·ma/qa`) a mobilierului înalt, a tavanelor suspendate și a corpurilor de iluminat/echipamente (cap. 11), decuplarea corectă a pereților nestructurali pentru evitarea stâlpului scurt, și balustradele scărilor cu interspațiu maxim 10 cm.

Documentația de față, la nivelul de detaliere specific fazei D.T.A.C., este supusă **verificării tehnice obligatorii de către verificatori atestați MDLPA**, pe cerințele **A1 (verificarea calculului) și A2 (verificarea proiectului)**, corelat cu cerința D (siguranță în exploatare) pentru aspectele specifice ancorării nestructurale și geometriei balustradelor. Se completează, la fazele următoare de proiectare, cu piesele desenate de cofraj și armare la scară de execuție, cu breviarul de calcul complet (model spațial, analiză modală cu spectre de răspuns) și cu studiul geotehnic definitiv, conform structurii proprii a memoriului `structura-pth.md`.

*Valorile de predimensionare din prezentul memoriu au caracter orientativ pentru faza D.T.A.C. și se detaliază prin note de calcul complete la faza de Proiect Tehnic, cu verificare tehnică obligatorie pe cerințele A1/A2.*
