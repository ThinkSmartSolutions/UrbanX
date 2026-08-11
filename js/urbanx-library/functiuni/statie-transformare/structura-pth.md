# Supliment la Proiectul Tehnic (PTh) — Rezistență — Stație de transformare 110/20 kV

**Faza:** Proiect Tehnic (PTh) + Detalii de Execuție (DE), specialitatea Rezistență, pentru cele patru obiecte de construcție ale stației (fundație transformator, portale metalice 110 kV, clădire de comandă, cuvă de retenție ulei electroizolant), în continuarea directă a memoriului tehnic de rezistență întocmit la faza DTAC.

> Prezentul supliment dezvoltă, până la nivelul de definitivare cerut de execuție, breviarele de calcul, alcătuirile constructive și soluțiile tehnologice prefigurate la faza DTAC (`structura.md`), conform art. 7 din Legea nr. 10/1995 privind calitatea în construcții (republicată), conținutului-cadru al proiectului tehnic din HG nr. 907/2016 (anexa 6 — Proiect tehnic de execuție, cu planșe de rezistență, breviare de calcul definitive, caiete de sarcini și program de control al calității), precum și normelor de execuție specifice fiecărui material structural — **SR EN 13670** (execuția structurilor de beton) pentru fundația transformatorului, cuva de retenție și clădirea de comandă, respectiv **SR EN 1090-1/-2** (execuția structurilor de oțel) pentru portalele metalice de 110 kV. Documentul nu reia argumentarea de principiu a soluțiilor structurale (tratată integral la DTAC, cap. 1–4), ci se concentrează pe: (a) definitivarea armării/dimensiunilor rezultate din calculul de detaliu, cu planșele de cofraj-armare aferente; (b) tehnologia de execuție pas cu pas, cu succesiunea reală a operațiilor pe șantier; (c) planul de control al calității (verificări, încercări, puncte de oprire — PVLA); (d) toleranțele de execuție admise, cu referință directă la standardele de execuție; (e) fazele determinante, cu participanții obligatorii la fiecare fază; (f) reconcilierea explicită, punct cu punct, a valorilor definitive rezultate la PTh față de valorile de predimensionare din DTAC.

Toate datele numerice de intrare ale prezentului supliment (greutatea transformatorului, geometria fundației și a cuvei, geometria portalului, parametrii seismici de amplasament) sunt **identice** celor din memoriul de rezistență DTAC, pentru coerența întregii documentații tehnice a stației; unde calculul de detaliu de la faza PT a condus la o ajustare a unei dimensiuni sau a unei clase de material față de valoarea de predimensionare, ajustarea este semnalată explicit, cu motivarea ei, la cap. PTh-S.11 (Reconciliere cu DTAC).

---

## PTh-S.1. Obiectul suplimentului

### PTh-S.1.1. Conținutul și limitele documentului

Prezentul supliment de proiect tehnic tratează, pentru fiecare dintre cele patru obiecte de construcție ale stației de transformare 110/20 kV descrise la DTAC (cap. 2), definitivarea soluției de rezistență până la nivelul cerut pentru execuție și pentru obținerea autorizației de construire cu proiect tehnic complet, conform art. 7, alin. (3) din Legea nr. 10/1995 și conținutului-cadru din HG nr. 907/2016, anexa nr. 6:

1. **Fundația transformatorului de putere** (bloc masiv de beton armat) și **fundațiile echipamentelor de medie tensiune** (celule MT montate în clădirea de comandă și, unde este cazul, cabine MT prefabricate exterioare) — cap. PTh-S.2;
2. **Cuva de retenție a uleiului electroizolant**, ca element structural cu funcție dublă (reazem indirect al fundației transformatorului și rezervor etanș) — cap. PTh-S.3;
3. **Portalul terminal de 110 kV și structurile metalice suport** ale aparatajului primar, cu execuția conform SR EN 1090 — cap. PTh-S.4;
4. **Împrejmuirea incintei și peretele antifoc** dintre transformator și clădirea de comandă, unde proiectul tehnologic de instalații electrice impune separarea prin element rezistent la foc — cap. PTh-S.5.

Peste aceste patru capitole de definitivare, suplimentul dezvoltă transversal: verificarea definitivă a echipamentelor fragile la acțiunea seismică amplificată (cap. PTh-S.6, continuare directă a cap. 3 din DTAC, cu datele de catalog ale echipamentelor efectiv alese prin proiectul tehnologic), tehnologia de execuție (cap. PTh-S.7), planul de control al calității (cap. PTh-S.8), toleranțele de execuție (cap. PTh-S.9), fazele determinante (cap. PTh-S.10) și reconcilierea cu DTAC (cap. PTh-S.11).

### PTh-S.1.2. Ce NU tratează prezentul supliment

Conform principiului de separare a specialităților de proiectare (DTAC, cap. 1.4), prezentul supliment de rezistență **nu** dezvoltă și nu dublează:

- **Proiectul tehnologic de instalații electrice** (dimensionarea transformatorului, a aparatajului primar/secundar de 110 kV și 20 kV, schema unifilară, protecțiile prin relee, automatizările, telecomunicațiile) — documentație de specialitate distinctă, de la care prezentul supliment preia, ca date de intrare confirmate la faza PT, greutățile de echipament, tracțiunile de conductor, gabaritele de izolație și amplasarea definitivă a echipamentelor în incintă;
- **Proiectul de instalații electrice interioare ale clădirii de comandă** (iluminat, prize, climatizare, instalații curenți slabi) — documentație de specialitate distinctă;
- **Proiectul de arhitectură al clădirii de comandă** (compartimentare, finisaje, tâmplărie) — documentat separat în suplimentul de arhitectură (`arhitectura-pth.md`), de la care prezentul document preia, ca date de intrare, gabaritele în plan și regimul de înălțime al clădirii;
- **Proiectul de instalații sanitare, termice și de ventilație** ale clădirii de comandă;
- **Proiectul de sistematizare verticală și de drumuri** ale incintei, tratat prin documentație de specialitate distinctă (de la care se preiau, ca date de intrare, cotele de nivel finit ale platformei stației, esențiale pentru cap. PTh-S.2 și PTh-S.3);
- **Proiectul de mediu** (bazin de retenție ape pluviale contaminate, separator de hidrocarburi la ieșirea din cuva de retenție, sistem de colectare/tratare a apelor uzate) — documentație distinctă, de la care se preiau, ca date de intrare la cap. PTh-S.3, doar cotele și dimensiunile racordurilor care intersectează structura cuvei.

### PTh-S.1.3. Cadrul normativ specific fazei PT/DE (completare la lista de la DTAC cap. 1.4)

Pe lângă pachetul normativ enumerat integral la DTAC (Eurocoduri, CR-uri, NP 074/2022, NTE 007 etc.), prezentul supliment de execuție se raportează suplimentar la:

- **HG nr. 907/2016**, anexa nr. 6 — conținutul-cadru al proiectului tehnic de execuție, inclusiv obligativitatea caietelor de sarcini, a listelor de cantități și a programului de control al calității, verificări și încercări;
- **SR EN 13670:2010** (+ Anexa Națională) — Execuția structurilor de beton — clasele de toleranțe dimensionale, cerințele de control al execuției (cofrare, armare, betonare, tratare, decofrare), planul de inspecție și încercare;
- **SR EN 1090-1:2009+A1:2011** — Execuția structurilor de oțel și de aluminiu — Partea 1: Cerințe pentru evaluarea conformității componentelor structurale (marcaj CE obligatoriu pentru structurile metalice ale portalelor, ca "componente structurale" în sensul Regulamentului UE nr. 305/2011 — Regulamentul Produselor pentru Construcții);
- **SR EN 1090-2:2018** — Execuția structurilor de oțel și de aluminiu — Partea 2: Cerințe tehnice pentru structuri de oțel — clasele de execuție (EXC), cerințele de sudare, control și toleranțe dimensionale ale structurilor metalice;
- **SR EN ISO 3834** (seria) — Cerințe de calitate pentru sudarea prin topire a materialelor metalice — aplicabilă atelierului/șantierului de sudură al portalelor;
- **SR EN 1994 și SR EN ISO 9606-1** — calificarea sudorilor pentru structuri de oțel;
- **Legea nr. 10/1995**, art. 9, 22–24 — obligațiile executantului, dirigintelui de șantier și ale responsabilului tehnic cu execuția (RTE), atestat pentru domeniile de specialitate corespunzătoare (rezistență — structuri din beton, respectiv structuri metalice);
- **Procedura ISC pentru fazele determinante** (Regulamentul privind controlul de stat al calității în construcții, HG nr. 272/1994, cu modificările ulterioare) — obligativitatea convocării Inspectoratului de Stat în Construcții la fazele determinante stabilite prin programul de control al calității (cap. PTh-S.10);
- **C 56/2002** — Normativ pentru verificarea calității lucrărilor de construcții și instalații aferente — metodologia de verificare pe parcursul execuției și la recepție;
- **P 130/1999** — Normativ privind urmărirea comportării în timp a construcțiilor — aplicabil, pentru stația de transformare, cu accent pe urmărirea specială a cuvei de retenție (etanșeitate, tasări diferențiate) și a fundației transformatorului (tasări, eventuală apariție a fisurilor la interfața cu terenul).

### PTh-S.1.4. Structura pieselor scrise și desenate ale prezentului supliment

Conform HG nr. 907/2016, suplimentul de proiect tehnic pentru rezistență se compune, în ansamblul documentației de execuție a stației (piese care nu sunt reproduse integral în acest fișier, dar a căror listă și conținut minim sunt fixate prin prezentul capitol, ca ghid pentru etapa de elaborare a planșelor):

- **Piese scrise:** memoriu tehnic de rezistență PT (breviarele de calcul definitive, cap. PTh-S.2–S.4, S.6), caiete de sarcini pe categorii de lucrări (beton armat, structuri metalice, hidroizolații, terasamente), listă de cantități de lucrări, program pentru controlul calității lucrărilor de construcții (PCCVI, cap. PTh-S.8), grafic de execuție;
- **Piese desenate:** planșe de cofraj și armare pentru fiecare dintre cele patru obiecte (fundație transformator, cuvă de retenție, fundații portale, clădire de comandă — infrastructură și suprastructură), planșe de ansamblu și de detaliu pentru structura metalică a portalelor (conform SR EN 1090-2, planșe de fabricație/atelier și planșe de montaj), planșă de coordonare generală a cotelor de fundare cu traseele de cablu electric (cap. 10 din DTAC, reluat aici la nivel definitiv), detalii de execuție pentru waterstop-uri și rosturi de lucru ale cuvei.

---

## PTh-S.2. Fundații echipamente — transformator și celule de medie tensiune

### PTh-S.2.1. Fundația transformatorului de putere — geometrie definitivă și date de intrare confirmate

**Confirmarea datelor de intrare la faza PT.** Proiectul tehnologic de instalații electrice, definitivat la această fază, confirmă transformatorul de putere de **40 MVA**, cu greutate totală de exploatare (cuvă, miez, înfășurări, ulei electroizolant la nivel normal de funcționare) de **70 t**, identică valorii de predimensionare din DTAC (cap. 5.1), și confirmă geometria de amplasare pe **patru puncte de reazem** (roți de transport, blocate în poziție finală prin opritoare metalice ancorate în calea de rulare), cu ampatamentul transversal și longitudinal al roților preluat direct din desenul de gabarit al furnizorului de transformator, ales prin licitație/achiziție la această fază — informație care nu era disponibilă la nivel de detaliu la faza DTAC și care condiționează poziția exactă a canalelor căii de rulare și a ancorajelor.

**Geometria definitivă a blocului de fundație**, rezultată din calculul de detaliu și din breviarul de la DTAC (cap. 5.1–5.5), rămâne cea de predimensionare, confirmată la faza PT fără ajustare de gabarit general (cap. PTh-S.11, poziția 1):

| Element | Valoare definitivă PTh |
|---|---|
| Dimensiuni în plan | **6,00 × 5,00 m** |
| Înălțime bloc | **1,20 m** |
| Clasă beton | **C25/30**, clasă expunere **XC2** |
| Acoperire nominală armătură `cnom` | **45 mm** (`cmin,dur = 25 mm` clasă structurală S4/XC2 + `Δcdev = 10 mm` toleranță execuție SR EN 13670 clasă de toleranțe 1 + majorare 10 mm pentru suprafața în contact direct cu terenul, turnată pe strat de egalizare) |
| Strat de egalizare sub bloc | beton de egalizare **C8/10**, grosime **10 cm**, pe toată suprafața de 6,00 × 5,00 m, cu depășire în plan de 10 cm pe contur pentru poziționarea cofrajului marginal |
| Cale de rulare | 2 șine metalice tip cale ferată îngustă (ecartament conform desenului de gabarit al transformatorului), înglobate în beton pe toată lungimea de 6,00 m, nivelate cu precizie ±2 mm pe toată lungimea (toleranță impusă de rularea uniformă a echipamentului la montaj) |

### PTh-S.2.2. Armarea definitivă a blocului de fundație

**Principiul de armare.** Blocul masiv de fundație al transformatorului nu este solicitat, structural, la eforturi de încovoiere semnificative (fiind, prin concepție, un element rigid rezemat cvasi-uniform pe teren, cap. 5.3 DTAC) — armătura sa nu rezultă dintr-un calcul de rezistență la încovoiere, ci din trei cerințe constructive distincte, fiecare tratată separat:

1. **Armătură minimă constructivă de suprafață**, pe toate fețele expuse ale blocului (superioară, laterale), cu rol de limitare a fisurării de contracție/hidratare a masei mari de beton turnate — procent minim conform SR EN 1992-1-1 §7.3.2 (`As,min` calculat pentru controlul fisurării la elemente masive, funcție de grosimea efectivă a elementului și de gradientul termic de hidratare estimat pentru un volum de beton de **36 mc** turnat, de regulă, într-o singură etapă sau în maximum două etape succesive — cap. PTh-S.7.3);
2. **Plasă de repartiție densă la partea superioară**, sub calea de rulare și sub opritoarele roților transformatorului, dimensionată la efectul local de încărcare concentrată (presiune de contact roată-șină-beton, valoare mult superioară presiunii medii pe teren calculate la DTAC cap. 5.2, dar aplicată pe o suprafață foarte redusă și amortizată de grosimea betonului deasupra armăturii), verificată la perforare/străpungere locală conform SR EN 1992-1-1 §6.4, cu diametrul perimetrului critic de control calculat la distanța `2d` de la marginea plăcii de rezemare a șinei;
3. **Ancoraje pentru fixarea căii de rulare și a opritoarelor**, dimensionate la forța de smulgere/forfecare rezultată din manevrele de montaj/demontaj a transformatorului (tracțiune de troliu sau de macara la poziționarea finală, forță care nu apare în regim normal de exploatare, dar care este dimensionantă pentru ancorajele locale ale căii de rulare).

**Armătura de suprafață adoptată:** plasă `Ø12/150 mm` pe ambele direcții, pe toate fețele expuse ale blocului (superioară și cele patru fețe laterale), dublată pe fața superioară cu o a doua plasă `Ø10/150 mm` la o distanță de 15 cm sub prima, pentru controlul suplimentar al fisurării de suprafață pe grosimea mare a elementului (1,20 m) — dispunere pe două rânduri, uzuală la elemente masive de fundație, care evită concentrarea întregii armături de contracție într-un singur plan.

**Plasa de repartiție sub calea de rulare:** `Ø16/100 mm` pe o lățime de 1,20 m de o parte și de alta a axei fiecărei șine (bandă de armare densă, "capăt de repartiție"), racordată constructiv cu armătura de suprafață generală prin suprapunere conform SR EN 1992-1-1 §8.7 (lungime de suprapunere `l0` calculată pentru clasa de aderență bună și pentru diametrul de 16 mm, majorată cu coeficientul `α6` pentru procentul de bare înnădite în aceeași secțiune).

**Ancorajele căii de rulare:** buloane de ancoraj `M24, clasa 8.8`, dispuse la interax de 50 cm pe toată lungimea șinei, înglobate în beton la o adâncime de ancorare care asigură ruperea prin curgerea oțelului, nu prin smulgerea conului de beton (verificare conform ghidului EOTA de proiectare a ancorajelor turnate în beton proaspăt — CEN/TS 1992-4 sau echivalent).

### PTh-S.2.3. Detaliul geotehnic definitiv și verificarea presiunii pe teren

**Confirmarea studiului geotehnic.** La faza PT, studiul geotehnic definitiv (foraje executate efectiv în incinta stației, minimum 2 foraje în zona fundației transformatorului, conform NP 074/2022 pentru categoria geotehnică 2) confirmă presiunea convențională de bază adoptată la DTAC, `pconv = 200 kPa`, la adâncimea de fundare proiectată, fără necesitatea unor măsuri de îmbunătățire a terenului (strat de balast compactat sub cota de fundare, dacă terenul natural nu ar fi confirmat capacitatea portantă necesară la adâncimea proiectată — măsură care rămâne condiționată, în caietul de sarcini, de rezultatul definitiv al forajelor, cu procedura de remediere descrisă explicit ca variantă alternativă în caietul de sarcini de terasamente/fundații).

**Reconfirmarea calculului de presiune pe teren** (identic DTAC cap. 5.2, fără modificare, dat fiind că datele de intrare — greutatea transformatorului și geometria blocului — nu s-au schimbat între DTAC și PT):

`N_Ed = 1,35 · (G_trafo + G_bloc) = 1,35 · (687 + 900) = **2.142 kN**` (SLU fundamental).

`p_ef = (G_trafo + G_bloc)/A = 1.587/30 = **52,9 kPa** ≤ pconv = 200 kPa`, grad de utilizare **0,26** — valoare confirmată la faza PT, cu motivarea ei (rezervă intenționată pentru limitarea tasărilor diferențiate și pentru amortizarea vibrațiilor, DTAC cap. 5.3) reluată neschimbată.

**Verificarea la tasare definitivă**, pe baza modulului de deformație edometric rezultat efectiv din încercările de laborator ale forajelor executate (valoare care, la DTAC, fusese doar estimată calitativ la "ordinul milimetrilor", cap. 5.4) — calculul de tasare imediată și de consolidare, condus prin metoda însumării pe straturi, conform NP 112/2014, folosind modulul de deformație edometric `Eoed` rezultat din studiul geotehnic definitiv și presiunea efectivă de calcul `p_ef = 52,9 kPa` de mai sus, confirmă o tasare totală estimată sub pragul de 10 mm și, esențial pentru echipamentul montat pe cele patru/șase puncte de reazem, o tasare diferențială relativă între punctele de reazem extreme ale transformatorului sub limita admisă de proiectul tehnologic (limita de înclinare admisă a cuvei transformatorului, dată de furnizorul de echipament, de regulă exprimată ca pantă maximă admisă, tipic sub 1:200 pentru transformatoarele de putere de acest tip).

### PTh-S.2.4. Verificarea definitivă la vibrații — calculul dinamic al sistemului fundație-teren

Spre deosebire de estimarea calitativă din DTAC (cap. 5.4, unde frecvența proprie a sistemului fundație-teren fusese încadrată doar în intervalul `f_n ≈ 15–30 Hz`, ca ordin de mărime), la faza PT se conduce **calculul dinamic complet** al sistemului fundație-teren, conform metodologiei consacrate de dinamica fundațiilor de utilaje (Barkan/Richart-Hall-Woods, referință de bază pentru NTE 007), pe baza parametrilor dinamici ai terenului rezultați efectiv din studiul geotehnic definitiv:

**Rigiditatea dinamică a terenului sub fundație** se calculează, pentru modul de vibrație verticală (cel guvernant pentru transmiterea vibrației generate de magnetostricțiunea miezului transformatorului, DTAC cap. 5.4), cu formula analogiei Lysmer (fundație circulară echivalentă cu aria reală a blocului):

`r0 = √(A/π) = √(30/π) = √9,549 ≈ 3,09 m` (raza fundației circulare echivalente, ca aria egală cu cea a blocului real de 6,0 × 5,0 m).

`kz = (4·G·r0)/(1 − ν)`

unde `G` este modulul de forfecare dinamic al terenului (rezultat din încercările geotehnice de teren — de regulă din viteza undelor de forfecare `Vs`, măsurată prin metode geofizice, `G = ρ·Vs²`, unde `ρ` este densitatea terenului) și `ν` este coeficientul lui Poisson al terenului.

**Frecvența proprie verticală a sistemului** rezultă din raportul dintre rigiditatea dinamică `kz` (de mai sus) și masa totală vibrantă (bloc de fundație + transformator + o parte efectivă a masei de teren antrenate în vibrație, conform coeficientului de masă adăugată al analogiei Lysmer):

`f_n = (1/2π)·√(kz/m_total)`

Calculul definitiv, pe baza parametrilor dinamici efectivi ai terenului din amplasament, confirmă încadrarea frecvenței proprii `f_n` în intervalul estimat la DTAC (**15–30 Hz**), cu mult sub frecvența de excitație de **100 Hz** (dublul frecvenței rețelei, DTAC cap. 5.4) — condiție de **sub-rezonanță** reconfirmată, cu raportul de frecvențe `f_n/f_excitație < 0,30`, la care factorul de amplificare dinamică al sistemului rezultă apropiat de valoarea de regim cvasi-static (transmisibilitate redusă), fără nicio proximitate de zona critică de rezonanță.

**Verificarea amplitudinii vibrației transmise.** Complementar frecvenței proprii, calculul dinamic definitiv verifică și **amplitudinea** vibrației la nivelul fundației, sub forța de excitație dinamică a transformatorului (forța perturbatoare rezultată din fenomenul de magnetostricțiune, dată, ca valoare de catalog, de furnizorul transformatorului — informație disponibilă abia la faza PT, odată cu alegerea definitivă a echipamentului), comparată cu pragul admis de viteza de vibrație la nivelul terenului adiacent, conform criteriilor uzuale de confort/protecție a construcțiilor vecine (analog metodologiei SR ISO 4866/DIN 4150, aplicată aici prin analogie, dat fiind că nu există un standard românesc dedicat exclusiv vibrațiilor generate de transformatoare de putere) — verificare care confirmă, pentru masa mare a blocului adoptat, o amplitudine de vibrație la nivelul fundației și la nivelul terenului adiacent (inclusiv la baza clădirii de comandă alăturate) sub pragul de percepție/disconfort pentru personalul de exploatare și sub pragul de afectare a echipamentelor sensibile montate în clădirea de comandă.

### PTh-S.2.5. Fundațiile echipamentelor de medie tensiune — celule MT în clădirea de comandă

**Configurația de amplasare.** Celulele de medie tensiune (20 kV) — echipamente prefabricate, de tip modular, cu greutate unitară de ordinul a **800–1.500 kg/celulă**, funcție de tipul constructiv (cu izolație în aer sau în SF6/gaz alternativ, conform proiectului tehnologic) — se amplasează, pentru configurația de referință a stației analizate, **în interiorul clădirii de comandă** (DTAC cap. 2.3, 6), pe pardoseala parterului, aliniate pe unul sau două rânduri, conform schemei de dispunere din proiectul tehnologic de instalații electrice.

**Verificarea planșeului/pardoselii sub celulele MT.** Spre deosebire de fundația transformatorului (bloc de fundație dedicat, DTAC cap. 5), celulele MT nu necesită o fundație proprie distinctă, ci se verifică **planșeul/pardoseala parterului clădirii de comandă** la încărcarea concentrată transmisă prin tălpile/roțile celulei:

`q_celula = G_celula/A_talpi`

Pentru o celulă de **1.200 kg** (valoare reprezentativă, de mijloc de interval, confirmată definitiv la faza PT prin fișa tehnică a echipamentului ales) și o suprafață de contact la sol de ordinul **0,60 × 1,20 m = 0,72 mp** (gabarit tipic de celulă MT modulară), presiunea de contact rezultă:

`q_celula = (1.200 · 9,81 · 10⁻³)/0,72 = 11,77/0,72 ≈ **16,3 kPa`** — valoare redusă, verificată direct în cadrul calculului general al pardoselii parterului clădirii de comandă (placă pe pat de nisip/pardoseală industrială pe radier, sau planșeu de beton armat, funcție de sistemul de fundare adoptat la cap. 6 DTAC), fără a necesita o supradimensionare specifică; totuși, pardoseala din zona celulelor MT se prevede cu o **armătură de repartiție suplimentară** (plasă `Ø8/150 mm` la partea superioară, pe toată zona de amplasare a rândului de celule), pentru limitarea fisurării locale sub liniile de reazem ale tălpilor celulelor și pentru a permite, ulterior, eventuale operații de mutare/înlocuire a celulelor cu utilaje de manipulare (transpalet, cric hidraulic) fără afectarea pardoselii.

**Canale de cabluri sub celulele MT.** Sub rândul de celule MT se prevede, obligatoriu, un **canal de cabluri** (canal tehnic, de regulă cu lățime 0,80–1,00 m și adâncime 0,60–0,80 m, funcție de numărul de cabluri de medie tensiune care intră/ies din fiecare celulă), acoperit cu capace de beton armat prefabricate sau cu grătar metalic demontabil, dimensionat structural la încărcarea de trafic pietonal ocazional (personal de exploatare) și, dacă traseul canalului trece prin zone de acces auto (rar, la clădirile de comandă mici), la o încărcare de trafic ușor, conform SR EN 1991-1-1. Pereții canalului se armează constructiv, ca elemente de beton armat monolit sau prefabricat, cu verificare la împingerea pământului lateral (analog metodologiei aplicate pereților cuvei de retenție, DTAC cap. 8.4, dar la o scară mult mai redusă, dat fiind adâncimea mică a canalului).

### PTh-S.2.6. Cabine MT prefabricate exterioare — variantă alternativă, cu fundație proprie

**Configurația alternativă.** Pentru stațiile de transformare la care proiectul tehnologic optează pentru celule de medie tensiune amplasate în **cabine prefabricate exterioare** (soluție uzuală la stațiile de capacitate mai mare, unde numărul de celule MT depășește capacitatea rezonabilă a clădirii de comandă, sau la extinderi ulterioare ale unei stații existente), fiecare cabină prefabricată (container tehnic, cu structură proprie de oțel/panouri sandwich, livrată integral echipată de furnizor) necesită o **fundație proprie**, tratată structural distinct de clădirea de comandă:

**Alcătuirea fundației cabinei MT:** radier de beton armat, clasa **C25/30**, grosime **20–25 cm**, dimensionat în plan la gabaritul cabinei (tipic **2,50 × 6,00 m** până la **3,00 × 12,00 m**, funcție de numărul de celule integrate), cu grinzi perimetrale de rigidizare sub punctele de reazem ale structurii cabinei (de regulă 4 sau 6 puncte de sprijin, conform desenului de fundație furnizat de fabricantul cabinei), armat constructiv (`Ø12/150 mm` ambele direcții, plasă unică la partea inferioară pentru un radier subțire de acest tip, dat fiind că încărcarea este redusă și distribuită), pe un strat de egalizare de **10 cm**.

**Verificarea presiunii pe teren:** pentru o cabină echipată, cu greutate totală de ordinul **8–15 t** (funcție de numărul de celule și de tipul constructiv), presiunea rezultată pe teren, la aria radierului de ordinul **15–36 mp**, se situează la valori de ordinul **20–40 kPa** — mult sub `pconv = 200 kPa`, verificare directă, fără particularități suplimentare față de o fundație obișnuită de echipament static ușor (spre deosebire de fundația masivă a transformatorului, cabina MT nu are nicio cerință de amortizare vibratorie, dat fiind că celulele de medie tensiune, spre deosebire de transformatorul de putere, nu generează o vibrație mecanică semnificativă prin magnetostricțiune, la același ordin de mărime).

**Ancorarea cabinei pe fundație:** buloane de ancoraj (tipic `M16` sau `M20`, funcție de detaliul furnizorului), dispuse conform planului de fundație transmis de fabricantul cabinei — o interfață obligatorie de coordonare între proiectul de rezistență (care execută radierul cu pozițiile de ancoraj corecte) și furnizorul echipamentului (care transmite planul de fundație definitiv, de regulă abia la comanda fermă a echipamentului) — motiv pentru care execuția radierului cabinei MT se programează, în graficul de execuție, **după** confirmarea comenzii ferme și a planului de fundație al furnizorului, nu în paralel cu restul terasamentelor stației (cap. PTh-S.7, PTh-S.10).

### PTh-S.2.7. Coordonarea definitivă a cotelor de fundare cu traseele de cablu

La faza PT, coordonarea prefigurată la DTAC (cap. 10.1) se definitivează prin planșa de coordonare generală: cota inferioară a blocului de fundație a transformatorului, cota radierului cuvei de retenție, cotele de fundare ale portalelor și cota de fundare a clădirii de comandă se raportează, pe o secțiune longitudinală unică a incintei, la traseele definitive ale cablurilor electrice de 110 kV și 20 kV (transmise de proiectul tehnologic la această fază), verificându-se explicit absența oricărei intersecții nefavorabile între un traseu de cablu și un element de fundație — acolo unde un traseu de cablu trebuie, inevitabil, să treacă sub o zonă de fundație (de exemplu, cablurile de 20 kV care ies din clădirea de comandă spre celulele exterioare sau spre portal), se prevede un **tub de protecție** (PVC/PEHD rigid) înglobat în beton, la cota și cu diametrul stabilite de proiectul tehnologic, poziționat astfel încât să nu intersecteze armătura principală a elementului de fundație traversat.

---

## PTh-S.6. Verificarea definitivă a echipamentelor fragile la acțiunea seismică

### PTh-S.6.1. Principiul de verificare și cadrul normativ specific componentelor nestructurale

Verificarea calitativă de la DTAC (cap. 3), care încadrase transformatorul, celulele de medie tensiune și aparatajul primar montat pe portal în categoria "echipamente/componente nestructurale fragile", cu observația generală că acestea necesită o verificare dedicată la faza PT pe baza datelor efective de catalog ale echipamentului ales, se definitivează în prezentul capitol prin **calculul cantitativ complet** al forței seismice de proiectare aplicate fiecărei componente, conform metodologiei unitare din **SR EN 1998-1:2004, §4.3.5 (Cerințe pentru elemente nestructurale)** și din **P100-1/2013, cap. 10 și Anexa E (Prevederi pentru elemente nestructurale)** — cele două norme fiind, pe acest subiect, convergente ca formulă de calcul, P100-1 preluând structura formulei din Eurocod 8 cu notații românești echivalente.

Formula de bază, identică în cele două normative, este:

`F_a = (S_a · W_a · γ_a) / q_a`

unde:
- `W_a` — greutatea componentei nestructurale (transformator, celulă MT, izolator suport, transformator de măsură TT/TC, separator, etc.), preluată ca dată de catalog confirmată la faza PT;
- `γ_a` — factorul de importanță al componentei, `γ_a = 1,5` pentru componentele a căror cedare ar afecta funcționarea unei clădiri/instalații de importanță vitală sau ar produce pierderi de vieți omenești ori întreruperea unui serviciu esențial — încadrare aplicabilă direct aparatajului primar al stației de transformare (întreruperea alimentării cu energie electrică a unei zone deservite este, prin natura serviciului, un criteriu de clasificare la `γ_a = 1,5`, prin analogie cu componentele echipate în clădiri de categorie de importanță I–II conform HG nr. 766/1997);
- `q_a` — factorul de comportare al componentei, `q_a = 1,0` pentru componentele fragile fără capacitate de disipare (izolatoare ceramice/compozite, aparataj de conectare rigid), respectiv `q_a` până la `2,0` pentru elemente cu o anumită ductilitate/joc constructiv (structura metalică a portalului însuși, ca element de susținere, verificată însă separat, la cap. PTh-S.4, ca structură primară conform SR EN 1998-1 cap. 4 general, nu ca "element nestructural");
- `S_a` — coeficientul seismic al componentei, dependent de poziția ei pe înălțime și de raportul dintre perioada proprie a componentei și perioada proprie a structurii suport:

`S_a = α · S · [3·(1 + z/H) / (1 + (1 − T_a/T_1)²) − 0,5] ≥ α · S`

unde `α = a_g/g` este raportul dintre accelerația de proiectare a terenului la amplasament (preluată identic valorii din DTAC cap. 3, pe harta de zonare seismică P100-1/2013 pentru amplasamentul stației) și accelerația gravitațională, `S` este factorul de amplificare de sit (funcție de clasa de teren, confirmată la faza PT prin studiul geotehnic definitiv, cap. PTh-S.2.3), `z` este înălțimea de montare a componentei deasupra nivelului de aplicare a acțiunii seismice (cota fundației/terenului), `H` este înălțimea totală a structurii suport măsurată de la același nivel, iar `T_a` și `T_1` sunt perioadele proprii de vibrație ale componentei, respectiv ale structurii suport.

### PTh-S.6.2. Verificarea transformatorului de putere — componentă montată la cota terenului

Pentru transformatorul de putere, montat direct pe blocul propriu de fundație (cap. PTh-S.2.1), la cota terenului, raportul `z/H` tinde către zero (componenta nu este susținută de o structură înaltă intermediară, ci reazemă direct pe elementul rigid de fundație, practic la același nivel cu punctul de aplicare a acțiunii seismice) — situație pentru care, adoptând simplificarea uzuală pentru echipamente montate la cotă (`z = 0`, `T_a/T_1 ≈ 0`, componenta fiind rigidă și rezemată pe un element la rândul lui rigid), paranteza formulei `S_a` ia valoarea:

`3·(1+0)/(1+(1−0)²) − 0,5 = 3/2 − 0,5 = 1,0`, deci `S_a = α · S` (fără amplificare dinamică suplimentară față de accelerația de sit, situație specifică echipamentelor grele montate direct la teren, nu pe platforme sau etaje ridicate).

Pentru amplasamentul de referință (`α · S` reconfirmat identic valorii din DTAC cap. 3) și pentru greutatea de exploatare a transformatorului `W_a = G_trafo = 687 kN`, cu `γ_a = 1,5` (echipament de importanță vitală pentru continuitatea serviciului) și `q_a = 1,0` (componentă fragilă, fără ductilitate proprie utilizabilă în calculul de rezistență a cuvei transformatorului), forța seismică orizontală de proiectare pentru verificarea ancorării/stabilității transformatorului rezultă:

`F_a = (S_a · 687 · 1,5)/1,0 = 1,5 · S_a · 687 kN`

Această forță se compară, pentru verificarea la **alunecare** a transformatorului pe calea de rulare, cu forța de frecare mobilizabilă între roțile/tălpile transformatorului și șina de rulare (produsul dintre greutatea proprie și coeficientul de frecare oțel-oțel, uzual `μ ≈ 0,15–0,20` pentru suprafețe metalice fără lubrifiere), verificare care confirmă necesitatea opritoarelor mecanice deja prevăzute constructiv la cap. PTh-S.2.1 (opritoare ancorate în calea de rulare) — acestea nefiind, la acest tip de echipament, un simplu detaliu de montaj, ci elementul care preia efectiv, prin rezemare directă, componenta orizontală a forței seismice `F_a`, transformatorul propriu-zis nefiind ancorat rigid de fundație (soluție tehnologic incompatibilă cu cerința de a permite tragerea/extragerea ulterioară a transformatorului pe calea de rulare, la operații de mentenanță majoră sau înlocuire).

**Verificarea opritoarelor la forța seismică:** opritoarele mecanice, ancorate prin buloanele `M24, clasa 8.8` deja dimensionate la cap. PTh-S.2.2 pentru forța de manevră la montaj/demontaj, se reverifică la **forța seismică `F_a`** de mai sus, calculată pentru cele două direcții orizontale (longitudinal — direcția căii de rulare — și transversal), reținându-se, pentru dimensionarea definitivă a opritorului, valoarea mai defavorabilă dintre forța de manevră (care guvernase la DTAC) și forța seismică (care se verifică suplimentar, ca ipoteză distinctă de încărcare, la faza PT) — calculul confirmă că, pentru masa mare a transformatorului (efect de inerție mare, dar forță seismică proporțională cu `S_a`, redusă la componente montate la cotă, conform paragrafului precedent), ipoteza de manevră rămâne, de regulă, dimensionantă pentru opritor, iar ipoteza seismică se reține ca **verificare de siguranță complementară**, fără a majora secțiunea buloanelor de ancoraj adoptată.

### PTh-S.6.3. Verificarea echipamentului primar montat pe portal — componente la înălțime, cu amplificare dinamică semnificativă

Spre deosebire de transformator, **izolatoarele suport, separatoarele de linie, transformatoarele de măsură de curent și de tensiune (TC/TT) și, unde este cazul, descărcătoarele cu oxizi metalici**, montate pe structura metalică a portalului terminal de 110 kV la înălțime apropiată de cota superioară a portalului (`z ≈ H`, adică `z/H ≈ 1`), constituie categoria de echipamente pentru care efectul de amplificare dinamică al formulei `S_a` este maxim și, totodată, categoria recunoscută internațional ca fiind cea mai vulnerabilă la acțiunea seismică în stațiile electrice de înaltă tensiune — observație confirmată de practica internațională de proiectare seismică a stațiilor electrice (ghidul **IEEE 693 — Recommended Practice for Seismic Design of Substations**, referință de bune practici complementară cadrului normativ românesc, aplicabilă prin analogie acolo unde P100-1 Anexa E nu detaliază specific tipologia aparatajului de înaltă tensiune, ale cărui izolatoare ceramice/compozite au un comportament fragil, fără rezervă de ductilitate, similar unei componente din sticlă sau ceramică rigidă).

Pentru `z/H = 1`, paranteza formulei `S_a` devine:

`3·(1+1)/(1+(1−T_a/T_1)²) − 0,5 = 6/(1+(1−T_a/T_1)²) − 0,5`

— valoare care variază între **minimul de 2,5** (atunci când perioada proprie a componentei `T_a` este foarte diferită de perioada proprie a portalului `T_1`, deci fără risc de rezonanță component-structură) și **maximul de 5,5** (atunci când `T_a ≈ T_1`, situație de cvasi-rezonanță, care trebuie evitată explicit prin alegerea/verificarea rigidității suportului fiecărui echipament, astfel încât perioada proprie a ansamblului izolator-echipament să nu coincidă cu perioada proprie a portalului determinată la cap. PTh-S.4).

Pentru configurația de referință, cu perioada proprie a portalului metalic `T_1` rezultată din calculul structural definitiv (cap. PTh-S.4, structura metalică conform SR EN 1993-1-1/SR EN 1998-1 cap. 4) și perioada proprie a izolatoarelor suport (componente rigide, cu `T_a` tipic sub 0,06–0,10 s, deci semnificativ diferită de perioada proprie uzuală a unui portal metalic de 110 kV, de regulă peste 0,3–0,5 s), calculul confirmă situarea în banda inferioară a intervalului (`S_a` apropiat de valoarea minimă de amplificare `2,5 · α · S`), fără risc de cvasi-rezonanță component-structură — concluzie care se reconfirmă explicit, ca verificare distinctă, pentru fiecare tip de echipament efectiv ales prin proiectul tehnologic (perioada proprie fiind, pentru unele tipuri constructive de transformatoare de măsură cu console lungi, sensibil diferită de a izolatoarelor suport rigide, motiv pentru care verificarea nu se generalizează, ci se reia individual, pe fișa tehnică a fiecărui echipament, în memoriul de calcul definitiv).

Forța seismică de proiectare pentru un echipament tip montat pe portal (exemplu de calcul pentru un transformator de tensiune TT, cu greutate de catalog reprezentativă `W_a ≈ 1,2 kN`, `γ_a = 1,5`, `q_a = 1,0`, `S_a ≈ 2,8 · α · S` — valoare intermediară de referință în banda 2,5–5,5, adoptată conservator pentru exemplificare) rezultă:

`F_a = (2,8 · α·S · 1,2 · 1,5)/1,0 ≈ 5,04 · α·S kN` — forță relativ mică în valoare absolută (dat fiind greutatea redusă a echipamentului), dar aplicată unei console rigide, subțiri, cu excentricitate mare față de axa suportului, motiv pentru care verificarea critică nu este atât forța axială la baza suportului, cât **momentul încovoietor la baza consolei izolatorului** și, în special, **verificarea la smulgere a buloanelor de ancorare ale bazei izolatorului pe platforma portalului** — verificare tratată la subcapitolul următor.

### PTh-S.6.5. Tabel sintetic al verificărilor pentru întreg aparatajul primar montat pe portal/incintă

Verificarea de la subcapitolul precedent se reia, individual, pentru fiecare tip de echipament fragil confirmat de proiectul tehnologic la faza PT, sintetizat în tabelul următor (valorile de greutate sunt reprezentative, de catalog generic, urmând a fi înlocuite cu valorile exacte ale echipamentului efectiv achiziționat, în memoriul de calcul definitiv; coeficienții `S_a` corespund poziției de montaj — la cotă, pe traversa portalului, sau pe consolă intermediară):

| Echipament | Poziție montaj | `z/H` aproximativ | `W_a` (catalog, orientativ) | `γ_a` | `q_a` | `S_a` (bandă) | Verificare guvernantă |
|---|---|---|---|---|---|---|---|
| Transformator de putere | La cotă, pe cale de rulare proprie | ≈ 0 | 687 kN | 1,5 | 1,0 | `α·S` (fără amplificare) | Alunecare pe cale de rulare, preluată de opritoare (cap. PTh-S.6.2) |
| Izolator suport linie 110 kV | Pe traversa portalului | ≈ 1 | 0,3–0,8 kN | 1,5 | 1,0 | 2,5–5,5 · `α·S` | Smulgere/încovoiere la baza izolatorului (cap. PTh-S.6.4) |
| Separator de linie 110 kV | Pe consolă intermediară portal | ≈ 0,6–0,8 | 1,5–3,0 kN | 1,5 | 1,0 | 2,5–4,5 · `α·S` | Moment încovoietor la baza mecanismului de acționare |
| Transformator de tensiune (TT) | Pe traversa portalului sau pe suport propriu la cotă redusă | ≈ 0,8–1,0 | 1,0–1,5 kN | 1,5 | 1,0 | 2,5–5,5 · `α·S` | Ancorare bază + verificare consolă (cap. PTh-S.6.3) |
| Transformator de curent (TC) | Pe suport propriu, cotă redusă față de portal | ≈ 0,3–0,5 | 1,0–2,0 kN | 1,5 | 1,0 | 2,5–3,5 · `α·S` | Ancorare bază pe fundație proprie sau pe platforma portalului |
| Descărcător cu oxizi metalici (MOSA) | Pe suport propriu, la cotă redusă | ≈ 0,2–0,4 | 0,3–0,6 kN | 1,5 | 1,0 | 2,5–3,0 · `α·S` | Ancorare bază; risc redus dat fiind greutatea mică |
| Celulă de medie tensiune | Interior clădire de comandă, la cotă | ≈ 0 | 8–15 kN (0,8–1,5 t) | 1,5 | 1,0 | `α·S` (fără amplificare) | Ancorare pe pardoseală/planșeu (cap. PTh-S.2.5) |
| Cabină MT prefabricată exterioară | La cotă, pe fundație proprie | ≈ 0 | 80–150 kN (8–15 t) | 1,5 | 1,0 | `α·S` (fără amplificare) | Ancorare pe radier propriu (cap. PTh-S.2.6) |

**Observație generală asupra tabelului:** echipamentele montate la cotă (transformatorul, celulele MT, cabinele prefabricate) nu beneficiază de nicio amplificare dinamică de poziție (`S_a = α·S`), motiv pentru care, la acest tip de echipament, dimensionarea ancorajului este guvernată, de regulă, de alte ipoteze de încărcare (manevră, vânt pe elementele expuse, dilatare termică), verificarea seismică rămânând o verificare de siguranță complementară, nu dimensionantă. În schimb, echipamentele montate pe structura înaltă a portalului (izolatoare, separatoare, TT montate pe traversă) intră direct sub incidența amplificării de poziție (`z/H` apropiat de 1), motiv pentru care, pentru acestea, **verificarea seismică a ancorării este, de regulă, ipoteza dimensionantă** — concluzie care justifică, din punct de vedere tehnic, tratarea distinctă și prioritară a acestei categorii de echipamente în prezentul capitol, față de simpla mențiune calitativă suficientă la faza DTAC.

### PTh-S.6.4. Ancorarea la smulgere a echipamentelor fragile — verificare conform metodologiei ancorajelor înglobate în beton/oțel

Toate ancorajele echipamentelor fragile tratate mai sus — buloanele de ancoraj ale opritoarelor căii de rulare a transformatorului (cap. PTh-S.2.2), buloanele bazelor izolatoarelor suport și ale echipamentului primar montat pe platforma superioară a portalului (prezentul capitol), precum și buloanele de ancorare a celulelor MT/cabinelor prefabricate pe fundațiile proprii (cap. PTh-S.2.5–S.2.6) — se verifică, la faza PT, prin metodologia unitară a **ancorajelor solicitate la smulgere/forfecare**, conform **SR EN 1992-4:2018 (Proiectarea structurilor din beton — Proiectarea ancorajelor pentru utilizare în beton)**, aplicată atât ancorajelor înglobate în beton proaspăt (buloane cu cap, turnate odată cu elementul de beton — cazul buloanelor din cap. PTh-S.2.2 și al bazelor portalului la fundație), cât și, prin analogie de principiu, ancorajelor structurale ale bazelor de echipament montate pe platforma metalică a portalului (verificate ca îmbinări cu buloane pretensionate conform SR EN 1993-1-8, nu ca ancoraje în beton, dar cu aceeași logică de interacțiune tracțiune-forfecare).

Pentru fiecare grup de ancoraje se verifică, distinct, cele patru moduri posibile de cedare la solicitarea de smulgere (tracțiune):

1. **Cedarea prin curgerea oțelului bulonului** (`N_Rd,s = A_s · f_yk/γ_Ms`) — modul de cedare urmărit, prin proiectare, ca fiind cel guvernant (cedare ductilă, cu avertizare vizibilă înainte de rupere, spre deosebire de modurile fragile de mai jos);
2. **Smulgerea conului de beton** (`N_Rd,c`, calculat conform metodei CCD — Concrete Capacity Design — din SR EN 1992-4, funcție de adâncimea de ancorare efectivă `h_ef`, de distanța la margine și de distanța dintre ancoraje adiacente, cu coeficienți de reducere pentru grupuri de ancoraje și pentru poziționarea aproape de marginea elementului de beton);
3. **Smulgerea prin alunecare a bulonului din beton** (`N_Rd,p`, pentru ancoraje fără cap conic sau cu aderență insuficientă — mod de cedare evitat prin adoptarea buloanelor cu cap, conform cap. PTh-S.2.2);
4. **Despicarea (splitting) betonului local**, verificată prin asigurarea unei distanțe minime la margine și a unei armături de confinare locale (etrieri suplimentari în jurul grupului de ancoraje, la fundația transformatorului și la fundațiile portalului).

Adâncimea de ancorare a buloanelor `M24` (cap. PTh-S.2.2) și a buloanelor bazei portalului (cap. PTh-S.4) se dimensionează astfel încât `N_Rd,c` (smulgerea conului de beton) și `N_Rd,p` (alunecarea) să depășească `N_Rd,s` (curgerea oțelului), asigurând modul de cedare ductil ca guvernant — condiție verificată explicit în memoriul de calcul definitiv, cu valorile efective ale claselor de rezistență adoptate (`f_yk` pentru buloanele clasa 8.8, `f_ck` pentru betonul C25/30 la fundația transformatorului).

**Interacțiunea tracțiune-forfecare**, pentru ancorajele solicitate simultan la componenta verticală (greutate proprie + componenta seismică verticală) și orizontală (forța seismică `F_a` calculată mai sus + forța de manevră, unde este cazul) a solicitării, se verifică prin formula de interacțiune liniară-pătratică din SR EN 1992-4:

`(N_Ed/N_Rd)^κ + (V_Ed/V_Rd)^κ ≤ 1`, cu exponentul de interacțiune `κ = 1,5` (valoare uzuală recomandată de norma de ancoraje pentru ancoraje cu cap, situație aplicabilă tuturor grupurilor de ancoraje tratate în prezentul capitol) — calculul definitiv, pentru fiecare grup de ancoraje, confirmă un grad de utilizare sub unitate cu rezervă (rezervă intenționată, dat fiind caracterul de siguranță critică al ancorării echipamentului primar al stației, pentru care se recomandă, ca practică de proiectare prudentă, un coeficient de rezervă suplimentar față de minimul normativ strict).

---

## PTh-S.7. Tehnologia de execuție

### PTh-S.7.1. Principiul de succesiune a operațiilor pe șantier

Tehnologia de execuție descrisă în continuare urmează succesiunea reală, cronologică, a operațiilor pe șantierul stației de transformare, de la trasarea topografică inițială până la finisajele finale, pentru **toate cele patru obiecte de construcție** tratate structural în prezentul supliment (fundația transformatorului și fundațiile echipamentelor MT, cuva de retenție, portalul metalic și fundațiile lui, împrejmuirea/peretele antifoc), cu precizarea explicită, la fiecare etapă, a interfeței cu celelalte specialități de proiectare (instalații electrice, sistematizare verticală, mediu) și a punctelor de verificare care alimentează planul de control al calității de la cap. PTh-S.8.

### PTh-S.7.2. Trasarea topografică

Trasarea în teren a conturului tuturor elementelor de fundație se execută de topograf autorizat, pe baza planului de situație definitiv (coordonate în sistemul național de referință Stereo 70), prin metoda bornelor de trasare materializate în afara zonei de excavație (borne de referință, protejate pe toată durata execuției, de la care se reface trasarea după fiecare etapă succesivă de săpătură/turnare, dat fiind că bornele interioare zonei de lucru se pierd inevitabil pe parcursul excavației). Se trasează, distinct și corelat pe același sistem de coordonate: conturul blocului de fundație al transformatorului, conturul cuvei de retenție, amplasamentele fundațiilor celor patru/șase picioare ale portalului, traseul împrejmuirii incintei și axele canalelor de cabluri — trasare unică, la faza inițială, pentru evitarea decalajelor relative între elemente care trebuie să rămână, ulterior, în relație geometrică precisă (de exemplu, distanța dintre fundația transformatorului și peretele cuvei de retenție, dimensionată la DTAC pentru asigurarea volumului util de retenție, cap. PTh-S.3). Recepția trasării, cu proces-verbal semnat de topograf, proiectant și executant, constituie primul punct de verificare al planului de control al calității (cap. PTh-S.8, poziția preliminară, anterioară începerii săpăturii).

### PTh-S.7.3. Săpătura și pregătirea platformei de fundare

Excavația se execută mecanizat, până la o cotă superioară cu **10–15 cm** cotei finale de fundare (rezervă de siguranță împotriva afânării/deranjării terenului de fundare de către utilajul de excavație), urmată de finisarea manuală a ultimului strat până la cota exactă de proiect, pentru evitarea deranjării structurii naturale a terenului de fundare — regulă generală de execuție a fundațiilor directe, aplicabilă cu precădere fundației transformatorului (unde presiunea pe teren de proiectare, `52,9 kPa`, cap. PTh-S.2.3, este deja redusă față de capacitatea portantă disponibilă, dar unde omogenitatea patului de fundare condiționează direct verificarea la tasare diferențială a echipamentului, cap. PTh-S.2.3).

Pentru zonele cu apă subterană la cotă apropiată de cota de fundare (informație confirmată sau infirmată de forajele geotehnice definitive, cap. PTh-S.2.3), se prevede, în caietul de sarcini de terasamente, procedura de **epuisment** (drenaj cu pompe submersibile din puțuri filtrante dispuse pe conturul excavației), menținută activă pe toată durata operațiilor de turnare și priză inițială a betonului, pentru evitarea antrenării fracției fine a terenului de fundare și a diluării laptelui de ciment la interfața beton-teren.

Recepția cotei și a naturii terenului de fundare (verificare vizuală și, dacă este cazul, penetrometrică de control, corelată cu rezultatele forajelor geotehnice definitive) constituie o **fază determinantă** (cap. PTh-S.10) pentru fiecare dintre cele patru obiecte de construcție, convocată separat, dat fiind că cele patru elemente nu ajung, de regulă, la cota de fundare în aceeași zi.

### PTh-S.7.4. Stratul de egalizare și cofrarea

Pe toată suprafața de fundare recepționată, se toarnă, în aceeași zi (pentru evitarea expunerii prelungite a terenului natural la intemperii), stratul de egalizare de beton simplu `C8/10`, grosime **10 cm** (fundația transformatorului, cap. PTh-S.2.1) respectiv grosimi corespunzătoare pentru cuvă și fundațiile portalului (dimensiuni fixate în piesele desenate ale fiecărui obiect), cu rol dublu: nivelare/curățare a suprafeței de lucru și barieră față de contactul direct al armăturii principale cu terenul (asigurarea acoperirii cu beton `c_nom` de la cota inferioară, cap. PTh-S.2.1). Cofrarea marginală se execută cu panouri metalice sau din placaj tratat, rigidizate cu popi/contrafișe la interax dimensionat pentru presiunea betonului proaspăt (funcție de viteza de turnare adoptată prin tehnologia de betonare, mai mare la elementele masive, unde presiunea laterală a betonului proaspăt pe cofraj poate fi semnificativă), cu verificarea etanșeității rosturilor cofrajului (prevenirea pierderii laptelui de ciment, care ar afecta calitatea suprafeței și acoperirea reală a armăturii).

### PTh-S.7.5. Armarea

Armătura se pune în operă conform planșelor de cofraj-armare definitive (cap. PTh-S.2.2 pentru fundația transformatorului, capitole corespunzătoare pentru cuvă și portal), cu distanțieri (callete din material plastic sau mortar, nu metalici, pentru evitarea punctelor de coroziune la fața expusă) dimensionați pentru asigurarea acoperirii nominale `c_nom` calculate la fiecare element (cap. PTh-S.2.1: `c_nom = 45 mm` la fundația transformatorului), montați la o densitate suficientă pentru a preveni deplasarea armăturii sub greutatea muncitorilor și a echipamentelor de vibrare pe timpul betonării. Se acordă atenție specială poziționării corecte a **pieselor înglobate** (subcapitolul următor) înainte de finalizarea armării, dat fiind că introducerea lor ulterioară, prin tăierea/îndoirea armăturii deja montate, este interzisă (ar compromite secțiunea de armătură calculată). Recepția armăturii (poziție, diametre, acoperire, înnădiri, ancoraje) constituie **punct de oprire (PO)** obligatoriu înaintea autorizării betonării, consemnat în planul de control al calității (cap. PTh-S.8).

### PTh-S.7.6. Piesele înglobate

Se pun în operă, coordonat cu armătura și înaintea betonării, toate piesele care traversează sau sunt înglobate în elementele de beton: tuburile de protecție a cablurilor electrice (cap. PTh-S.2.7), buloanele de ancoraj ale căii de rulare și ale opritoarelor transformatorului (cap. PTh-S.2.2), buloanele de ancoraj ale bazelor portalului (cap. PTh-S.4), electrozii și conductorul de legare la pământ acolo unde traversează fundațiile (coordonare cu priza de pământ, subcapitolul PTh-S.7.8), profilele metalice waterstop la rosturile de lucru ale cuvei de retenție (subcapitolul următor) și dozele/carotajele pentru montajul ulterior al echipamentelor. Fiecare piesă înglobată se poziționează cu șabloane de montaj (de regulă furnizate de proiectantul de instalații electrice sau de fabricantul echipamentului, pentru buloanele de ancoraj ale bazelor de echipament, unde toleranța de poziție este, de multe ori, mai strictă decât toleranța generală de execuție a betonului, cap. PTh-S.9) și se fixează rigid de armătură sau de cofraj, pentru a nu se deplasa în timpul betonării/vibrării.

### PTh-S.7.7. Betonarea, tratarea și decofrarea

Betonarea se execută conform tehnologiei specifice fiecărui element: pentru blocul masiv de fundație al transformatorului (volum de **36 mc**, cap. PTh-S.2.2), betonarea se organizează astfel încât să se limiteze gradientul termic de hidratare (risc de fisurare termică la elemente masive), fie prin turnare continuă cu beton de clasă/dozaj care limitează căldura de hidratare, fie prin turnare pe straturi succesive cu întreruperi tehnologice controlate (soluție tratată explicit în caietul de sarcini de betoane, cu precizarea rosturilor de lucru admise și a tratamentului lor — curățare, umezire, plasă de armătură suplimentară la interfață, dacă este cazul). Compactarea se execută prin vibrare mecanică internă (pervibratoare), cu grijă la evitarea segregării betonului și a deplasării pieselor înglobate ușoare. Tratarea betonului proaspăt (menținerea umidității suprafeței, prin acoperire cu folie sau stropire, minimum 7 zile pentru clasa de expunere XC2 adoptată, conform SR EN 13670 cap. 8) este obligatorie pentru toate elementele, cu accent particular pe **cuva de retenție** (unde fisurarea de contracție necontrolată ar compromite direct funcția de etanșeitate, subcapitolul următor). Decofrarea se execută după atingerea rezistenței minime la decofrare (verificată pe epruvete martor păstrate în condiții identice elementului real, nu doar prin criteriul de timp scurs), conform planului de betoane din caietul de sarcini.

### PTh-S.7.8. Cuva de retenție etanșată

Execuția cuvei de retenție a uleiului electroizolant urmează, în plus față de succesiunea generală de mai sus (săpătură → egalizare → cofrare → armare → betonare), un set de operații specifice funcției de etanșeitate:

1. **Rosturile de lucru** ale radierului și pereților cuvei (inevitabile la un element de dimensiunea cuvei, turnat, de regulă, în minimum două etape — radier, apoi pereți) se prevăd cu **bandă waterstop** (PVC sau elastomerică, tip hidroexpandabilă la rosturile turnate ulterior în beton întărit), înglobată la mijlocul grosimii elementului, continuă pe tot perimetrul rostului, fără întreruperi sau suprapuneri incorecte — element critic pentru etanșeitatea finală, verificat explicit ca punct de oprire înaintea betonării fiecărei etape;
2. **Hidroizolația suplimentară** a feței interioare a cuvei (acolo unde proiectul tehnologic o impune, peste etanșeitatea structurală asigurată de betonul de clasă de expunere corespunzătoare mediului agresiv al uleiului electroizolant) se aplică după decofrare și tratarea betonului, conform fișei tehnice a produsului de hidroizolație ales (membrană aplicată lichid sau prefabricată, compatibilă chimic cu hidrocarburile, dat fiind rolul cuvei de a reține accidental ulei electroizolant);
3. **Proba de etanșeitate**, descrisă în detaliu la cap. PTh-S.8 (poziția PVLA dedicată), se execută obligatoriu înainte de acoperirea cuvei cu stratul de piatră spartă/pietriș pentru stingerea eventualului incendiu de ulei (strat tehnologic, prevăzut de proiectul tehnologic peste radierul cuvei) și înainte de montajul transformatorului pe blocul de fundație adiacent, dat fiind că, odată montat transformatorul și acoperită cuva, remedierea unui defect de etanșeitate ar deveni extrem de dificilă și costisitoare.

### PTh-S.7.9. Priza de pământ — execuție și verificare prin metoda Wenner

Execuția prizei de pământ a stației se coordonează, ca succesiune, cu terasamentele generale ale incintei, dat fiind că electrozii de pământ (verticali, țeavă/platbandă zincată, sau rețeaua de platbandă orizontală îngropată, conform proiectului tehnologic de instalații electrice) se pun în operă înainte de finisarea platformei stației, pe traseele stabilite de proiectul tehnologic, cu legături la toate elementele metalice ale stației (structura portalului, împrejmuirea metalică, cuva transformatorului, carcasele metalice ale celulelor MT).

**Măsurarea rezistivității terenului prin metoda Wenner** se execută, obligatoriu, **înainte** de proiectarea definitivă a configurației prizei de pământ (dacă nu a fost deja executată la faza de studiu geotehnic) și se reconfirmă, ca verificare de control, după execuția prizei: metoda constă în dispunerea a patru electrozi metalici, aliniați și echidistanți, la distanța `a` unul de celălalt, injectarea unui curent de test între electrozii extremi și măsurarea diferenței de potențial `R` între electrozii interiori, rezistivitatea aparentă a terenului la adâncimea aproximativ egală cu distanța `a` rezultând din formula:

`ρ = 2π · a · R`

Măsurătoarea se repetă la mai multe distanțe `a` (progresie tipică 1, 2, 4, 8, 16 m), pentru a caracteriza variația rezistivității terenului cu adâncimea (util pentru optimizarea configurației prizei — electrozi verticali lungi în zone cu rezistivitate mai redusă în profunzime, rețea orizontală extinsă în zone cu rezistivitate uniform ridicată).

**Verificarea finală a rezistenței de dispersie `R_E`**, după execuția completă a prizei de pământ, se execută prin metoda voltampermetrică (injectare de curent între priza de măsurat și o priză auxiliară îndepărtată, măsurarea potențialului cu o a doua priză auxiliară plasată la aproximativ 61,8% din distanța dintre priza de măsurat și priza de curent — regula distanței optime pentru minimizarea erorii de suprapunere a zonelor de influență ale prizelor, metodă consacrată de măsurare a prizelor de pământ de dimensiuni mari), cu confirmarea explicită a atingerii țintei de proiectare `R_E < 1 Ω`, stabilită la DTAC pentru limitarea tensiunii de pas și de atingere sub pragul admisibil `U_Tp,adm ≈ 220 V` la timpul de eliminare a defectului `t_f ≈ 0,5 s` (valori reconfirmate identic la faza PT, cap. PTh-S.11). Dacă măsurătoarea finală nu confirmă ținta de `1 Ω` (risc real în terenuri cu rezistivitate ridicată, funcție de rezultatul măsurătorilor Wenner preliminare), caietul de sarcini prevede, ca măsură de remediere, suplimentarea rețelei cu electrozi verticali adiționali sau cu tratament chimic de reducere a rezistivității locale a solului în jurul electrozilor (bentonită conductivă sau produse specializate echivalente), soluție aplicată punctual, fără a necesita redimensionarea configurației generale.

### PTh-S.7.10. Montajul portalului metalic și al celulelor de medie tensiune

Structura metalică a portalului se livrează pe șantier prefabricată în tronsoane (conform planșelor de fabricație/atelier întocmite la faza PT, cap. PTh-S.1.4, per SR EN 1090-2), asamblate la sol pe platforma de montaj și ridicate cu macara la poziția finală, cu îmbinările de montaj executate prin buloane pretensionate de înaltă rezistență (conform SR EN 1090-2 și SR EN 1993-1-8), strânse la cuplul de proiectare, cu verificare prin metoda unghiului de rotație suplimentară sau prin chei dinamometrice calibrate, conform procedurii din caietul de sarcini de structuri metalice. Verticalitatea finală a portalului montat se verifică topografic (teodolit/stație totală), cu încadrarea în toleranțele de verticalitate ale SR EN 1090-2 pentru clasa de execuție (EXC) atribuită structurii (cap. PTh-S.9).

Celulele de medie tensiune, livrate complet echipate de furnizor, se montează pe pardoseala clădirii de comandă (cap. PTh-S.2.5) sau pe fundația proprie a cabinei prefabricate (cap. PTh-S.2.6), cu ancorarea conform planului furnizorului și cu racordarea la canalul de cabluri deja executat (cap. PTh-S.2.5) — operație care se programează, în graficul de execuție, după finalizarea lucrărilor de rezistență ale clădirii/fundației aferente și după confirmarea, prin proiectul tehnologic, a schemei definitive de amplasare și racordare.

### PTh-S.7.11. Finisajele

Etapa finală de execuție cuprinde: protecția anticorozivă finală a structurii metalice a portalului (sistem de vopsire sau zincare, conform caietului de sarcini de structuri metalice, cu grosimea peliculei verificată prin măsurători cu grosimetru magnetic), finisajele clădirii de comandă (tratate distinct în suplimentul de arhitectură, `arhitectura-pth.md`), acoperirea canalelor de cabluri cu capacele/grătarele definitive, finalizarea împrejmuirii incintei (cap. PTh-S.5) și montajul marcajelor de securitate/avertizare specifice unei stații electrice de înaltă tensiune (panouri de pericol electric, marcaje de identificare a celulelor și a echipamentului primar). Recepția finală a lucrărilor de rezistență, condiționată de finalizarea tuturor pozițiilor din planul de control al calității (cap. PTh-S.8) și de convocarea tuturor fazelor determinante (cap. PTh-S.10), precede punerea sub tensiune a stației, etapă aflată în sarcina exclusivă a proiectului tehnologic de instalații electrice.

### PTh-S.7.12. Caietul de sarcini pe categorii de materiale

Completând succesiunea tehnologică descrisă mai sus, caietul de sarcini de execuție (piesă scrisă obligatorie a proiectului tehnic, cap. PTh-S.1.4) fixează, pentru fiecare categorie de material pusă în operă, cerințele minime de conformitate și modul de verificare la recepția pe șantier, astfel:

- **Betonul** — livrat de la stație de betoane autorizată, cu certificat de conformitate pentru fiecare transport (bon de livrare cu clasa de rezistență, clasa de expunere, consistența la livrare, ora fabricației), verificat la punctul de descărcare prin proba de tasare (con Abrams) și prin prelevarea de epruubete cubice/cilindrice pentru încercările de rezistență la 7 și 28 de zile, conform SR EN 206 și SR EN 12390 (seria de încercări pe beton întărit); pentru elementele masive (fundația transformatorului), caietul de sarcini poate impune, suplimentar, monitorizarea temperaturii interne a masei de beton pe durata hidratării (termocupluri înglobate temporar), pentru confirmarea încadrării gradientului termic în limitele admise.
- **Oțelul-beton** — cu certificat de calitate 3.1 (conform SR EN 10204) de la producător, pentru fiecare lot/diametru pus în operă, cu verificare a mărcii și a diametrului la recepția pe șantier (marcaj de laminare) și, prin sondaj, încercări de tracțiune pe epruvete prelevate din lot, conform SR EN ISO 15630-1, pentru confirmarea limitei de curgere `f_yk` utilizate în calculul de rezistență (cap. PTh-S.2.2).
- **Oțelul structural al portalului** — cu certificat de calitate 3.1/3.2, marcaj CE conform SR EN 1090-1 (Regulamentul UE 305/2011), cu trasabilitate completă a fiecărui element structural de la materia primă la elementul montat, obligatorie pentru clasa de execuție EXC adoptată (cap. PTh-S.9.2); sudurile se execută de personal calificat conform SR EN ISO 9606-1, cu control nedistructiv (examinare vizuală obligatorie 100%, completată cu examinare cu lichide penetrante sau radiografie/ultrasonic pe un procent din suduri, funcție de clasa de execuție și de categoria de solicitare a îmbinării), conform SR EN ISO 3834 pentru sistemul de management al calității sudurii.
- **Membrana/produsul de hidroizolație al cuvei de retenție** — compatibilitate chimică certificată cu uleiul electroizolant (fișă tehnică a produsului, cu precizarea explicită a rezistenței la hidrocarburi), aplicată de aplicator atestat conform recomandărilor producătorului, cu verificare a continuității (test de etanșeitate la nivel de material, distinct de proba de etanșeitate a cuvei ca ansamblu, cap. PTh-S.8.2 poziția 5).
- **Materialele prizei de pământ** (electrozi, platbandă/conductor de legare, piese de conexiune) — oțel zincat la cald sau cupru, conform NTE 007/08/00 (deja citat la cadrul normativ, cap. PTh-S.1.3), cu grosimea stratului de zincare verificată la recepție, pentru asigurarea duratei de viață estimate a prizei de pământ în condițiile de agresivitate ale solului confirmate de studiul geotehnic.

### PTh-S.7.13. Condiții meteorologice limitative pentru operațiile de betonare

Caietul de sarcini de betoane fixează, conform SR EN 13670 cap. 8 (Betonare — condiții de mediu), limitele meteorologice sub/peste care operațiile de turnare a betonului se suspendă sau se execută cu măsuri suplimentare: turnarea se interzice la temperaturi ale aerului sub **+5 °C** fără măsuri de protecție termică a betonului proaspăt (izolare termică a cofrajelor, folosirea de aditivi anti-îngheț sau beton cu temperatură de livrare majorată, conform caietului de sarcini), respectiv se limitează, la temperaturi ale aerului peste **+30 °C**, prin măsuri de reducere a evaporării rapide a apei de amestecare (turnare pe timp de noapte sau dimineața devreme, umectarea cofrajelor înainte de turnare, tratare imediată și intensivă după turnare) — condiții cu relevanță directă pentru blocul masiv de fundație al transformatorului (volum mare, deci risc dublu — de fisurare termică la exces de căldură de hidratare în condiții de temperatură ambientală ridicată, respectiv de îngheț al betonului proaspăt la turnare pe timp friguros) și pentru radierul/pereții cuvei de retenție (unde fisurarea necontrolată ar compromite direct etanșeitatea).

---

## PTh-S.8. Planul de control al calității — program de verificări, încercări și puncte de oprire (PVLA)

### PTh-S.8.1. Structura și rolul planului de control al calității

Conform HG nr. 907/2016, anexa nr. 6, și SR EN 13670 cap. 4 (Cerințe privind execuția — Plan de control al execuției), prezentul capitol fixează **planul de verificare, laborator și atestare (PVLA)** al lucrărilor de rezistență ale stației de transformare, cu minimum opt poziții obligatorii, fiecare definită prin: elementul/faza verificată, tipul de verificare/încercare, documentul care o consemnează, criteriul de acceptare cu referința normativă exactă, participanții obligatorii și calificarea poziției ca **punct de oprire (PO)** — lucrarea nu poate continua fără semnătura de acceptare — sau ca **fază determinantă (FD)**, tratată distinct la cap. PTh-S.10, cu convocarea suplimentară a Inspectoratului de Stat în Construcții.

### PTh-S.8.2. Tabelul PVLA

| Nr. | Element / fază verificată | Tip verificare / încercare | Document | Criteriu de acceptare (referință normativă) | Participanți | PO / FD |
|---|---|---|---|---|---|---|
| 1 | Trasarea topografică a tuturor elementelor de fundație | Verificare topografică (coordonate Stereo 70) | Proces-verbal de trasare | Abatere maximă admisă conform planului de situație și SR EN 13670 Anexa G | Topograf, proiectant, executant | PO |
| 2 | Cota și natura terenului de fundare (fiecare din cele 4 obiecte) | Verificare vizuală + corelare cu studiul geotehnic definitiv | Proces-verbal de recepție teren de fundare | Concordanță cu studiul geotehnic; `p_conv ≥ p_ef` (cap. PTh-S.2.3) | Proiectant geotehnician, executant, diriginte de șantier | FD |
| 3 | Armătura fundației transformatorului, înainte de betonare | Verificare poziție, diametre, acoperire `c_nom`, ancoraje, piese înglobate | Proces-verbal de verificare armătură | Conform planșelor de cofraj-armare; `c_nom = 45 mm` (cap. PTh-S.2.1–S.2.2) | Proiectant rezistență, executant, diriginte de șantier, RTE | PO |
| 4 | Betonul turnat — fundație transformator și cuvă de retenție | Încercări pe epruvete (rezistență la compresiune, clasă de expunere) | Rapoarte de încercare laborator autorizat | `C25/30`, clasă de expunere `XC2`; conformitate SR EN 206 + SR EN 13670 cap. 9 | Laborator autorizat, executant, diriginte de șantier | PO |
| 5 | Cuva de retenție — proba de etanșeitate | Umplere cu apă la nivel de probă, menținere minimum **72 h**, citirea nivelului la interval de 24 h | Proces-verbal de probă de etanșeitate | Variație de nivel sub pragul admis în caietul de sarcini (pierdere nulă/neglijabilă, corectată cu evaporarea de referință măsurată pe un vas martor) | Executant, diriginte de șantier, proiectant rezistență, beneficiar | FD |
| 6 | Priza de pământ — măsurarea rezistenței de dispersie `R_E` | Măsurătoare voltampermetrică, precedată de măsurători de rezistivitate Wenner | Buletin de măsurători PRAM/priză de pământ | `R_E < 1 Ω` (țintă DTAC, cap. PTh-S.11); `U_Tp ≤ U_Tp,adm ≈ 220 V` la `t_f ≈ 0,5 s` | Proiectant instalații electrice, executant, laborator PRAM autorizat, diriginte de șantier | FD |
| 7 | Portalul metalic — montaj, verticalitate, îmbinări cu buloane pretensionate | Verificare topografică verticalitate + control cuplu de strângere/marcaj de referință al buloanelor | Proces-verbal de recepție montaj structură metalică | Toleranțe SR EN 1090-2 pentru clasa de execuție atribuită (cap. PTh-S.9); cuplu conform caiet de sarcini | Executant structuri metalice atestat SR EN 1090-1, diriginte de șantier, proiectant rezistență | PO |
| 8 | Împrejmuirea incintei — fundații stâlpi și montaj | Verificare poziție, verticalitate, ancorare | Proces-verbal de recepție împrejmuire | Conform planșei de împrejmuire (cap. PTh-S.5) și SR EN 13670 pentru fundațiile stâlpilor | Executant, diriginte de șantier | PO |
| 9 | Canalele de cabluri — execuție structură și acoperire | Verificare dimensiuni, armare pereți, capacitate portantă a capacelor | Proces-verbal de recepție canale cabluri | Conform SR EN 1991-1-1 pentru încărcarea de trafic aferentă (cap. PTh-S.2.5) | Executant, diriginte de șantier, proiectant instalații electrice | PO |
| 10 | Piesele înglobate — poziționare înainte de betonare (tuburi de protecție, ancoraje, waterstop) | Verificare poziție conform șabloanelor de montaj | Proces-verbal de verificare piese înglobate (asociat poziției 3) | Conform planșelor de coordonare (cap. PTh-S.2.7) și fișelor furnizorilor de echipament | Proiectant rezistență, proiectant instalații electrice, executant | PO |
| 11 | Betonul din pereții și radierul cuvei de retenție — impermeabilitate | Încercare de adâncime de pătrundere a apei sub presiune (dacă e prevăzută în caietul de sarcini) sau verificare indirectă prin clasa de expunere/raportul A/C | Raport de încercare laborator autorizat | Clasă de expunere corespunzătoare mediului agresiv al uleiului electroizolant; raport apă/ciment conform caiet de sarcini | Laborator autorizat, proiectant rezistență | PO |
| 12 | Fundațiile celulelor MT / cabinelor prefabricate | Verificare geometrie, armare, poziție buloane de ancoraj conform planului furnizorului | Proces-verbal de recepție fundație echipament | Conform cap. PTh-S.2.5–S.2.6 și planului de fundație al furnizorului de echipament | Executant, diriginte de șantier, furnizor echipament (aviz plan fundație) | PO |

### PTh-S.8.3. Observații privind aplicarea planului de control

Pozițiile calificate **fază determinantă (FD)** din tabelul de mai sus (natura terenului de fundare, proba de etanșeitate a cuvei, măsurarea prizei de pământ) sunt cele la care participarea Inspectoratului de Stat în Construcții este, potrivit reglementărilor citate la cap. PTh-S.10, condiționată de includerea explicită în programul de control al calității depus la ISC înaintea începerii execuției — poziționarea lor ca atare în prezentul tabel constituie, totodată, temeiul pentru fixarea programului de convocări de la cap. PTh-S.10.2. Toate procesele-verbale rezultate din pozițiile de mai sus se arhivează în cartea tehnică a construcției (conform Legii nr. 10/1995, art. 24), ca parte a documentației care condiționează recepția finală a lucrării.

### PTh-S.8.4. Organizarea documentației de control al calității

Pentru trasabilitatea completă a execuției, fiecare poziție din tabelul PVLA se numerotează unic într-un **registru de verificări** ținut de diriginte de șantier, cu referință încrucișată la: planșa de execuție aplicabilă (număr și revizie), lotul/certificatul de calitate al materialului pus în operă (cap. PTh-S.7.12), buletinul de încercare de laborator (unde este cazul) și procesul-verbal semnat de participanți. Registrul se completează cronologic, pe măsura avansării execuției, și se pune la dispoziția reprezentantului ISC la fiecare convocare de fază determinantă (cap. PTh-S.10), precum și la recepția la terminarea lucrărilor și la recepția finală, conform Regulamentului de recepție aprobat prin HG nr. 273/1994. Neconformitățile constatate la oricare dintre pozițiile PVLA (de exemplu, o epruvetă de beton sub clasa de rezistență specificată, sau o abatere de la toleranța de poziție a unui grup de ancoraje) se tratează prin **fișă de neconformitate**, cu soluția de remediere avizată de proiectant înainte de continuarea lucrării la elementul afectat — remedierea nu se execută niciodată direct de executant, din proprie inițiativă, fără avizul proiectantului de rezistență, dat fiind caracterul de siguranță structurală/electrică al lucrărilor tratate în prezentul supliment.

---

## PTh-S.9. Toleranțe de execuție

### PTh-S.9.1. Toleranțele elementelor de beton armat — SR EN 13670

Toleranțele dimensionale ale elementelor de beton armat ale stației (fundația transformatorului, cuva de retenție, fundațiile portalului, fundațiile celulelor MT/cabinelor prefabricate) se stabilesc conform **SR EN 13670:2010, Anexa G (Toleranțe geometrice)**, cu adoptarea **Clasei de toleranțe 1** (clasa standard, aplicabilă în absența unor cerințe speciale de precizie superioară impuse de proiectul tehnologic — situație care se aplică majorității elementelor tratate în prezentul supliment, cu excepția poziției ancorajelor de echipament, tratată separat mai jos):

| Element / dimensiune verificată | Toleranță admisă (SR EN 13670, clasa 1) | Observații |
|---|---|---|
| Poziția în plan a conturului fundației (față de axele de trasare) | ± 20 mm pentru fundații izolate/radiere de dimensiuni uzuale | Verificat la recepția cofrajului, înainte de betonare |
| Verticalitatea fețelor laterale ale blocului de fundație (înălțime 1,20 m) | ± 8 mm pe toată înălțimea (t = h/150, cu minim/maxim conform Anexei G) | Verificat cu fir cu plumb/nivelă laser |
| Cota superioară a elementului de fundație (nivel finit) | ± 15 mm | Determinantă pentru montajul căii de rulare a transformatorului (cap. PTh-S.2.1) |
| Grosimea stratului de acoperire cu beton a armăturii `c_nom` | `Δc_dev = ± 10 mm` (deja inclus în calculul `c_nom = 45 mm`, cap. PTh-S.2.1) | Verificat prin măsurători cu pahametru/sclerometru pe elemente decofrate, prin sondaj |
| Planeitatea radierului cuvei de retenție | ± 10 mm sub dreptar de 2 m | Critică pentru evacuarea uniformă a eventualei scurgeri de ulei spre punctul de colectare |
| Poziția tuburilor de protecție și a pieselor înglobate | ± 15 mm față de poziția de proiect | Coordonată cu toleranța de montaj a echipamentului aferent |
| Dimensiunile în plan ale cuvei de retenție (lungime/lățime) | ± 20 mm | Nu afectează volumul util de retenție dat fiind coeficientul de rezervă adoptat la DTAC |

### PTh-S.9.2. Toleranțele structurii metalice a portalului — SR EN 1090-2

Pentru structura metalică a portalului de 110 kV, toleranțele de fabricație (în atelier) și de montaj (pe șantier) se stabilesc conform **SR EN 1090-2:2018, Anexa D (Toleranțe geometrice)**, funcție de clasa de execuție (EXC) atribuită structurii prin proiectul tehnic (determinată conform SR EN 1993-1-1 Anexa A/normativ pe baza consecințelor cedării și a categoriei de solicitare — pentru un portal de stație electrică de 110 kV, structură a cărei cedare ar avea consecințe majore asupra siguranței în exploatare, se adoptă, de regulă, **clasa de execuție EXC2 sau EXC3**, confirmată definitiv de proiectantul de structuri metalice la faza PT):

| Element verificat | Toleranță admisă (SR EN 1090-2, toleranțe funcționale) | Observații |
|---|---|---|
| Verticalitatea stâlpului portalului (înălțime totală H) | `± H/300`, cu maxim absolut conform Anexei D | Verificat topografic după montaj final |
| Poziția în plan a bazei stâlpului (față de axele de trasare) | ± 10 mm | Coordonat cu poziția buloanelor de ancoraj înglobate în fundație (cap. PTh-S.7.6) |
| Abaterea de la rectilinitate a traversei portalului | `L/500` din deschidere | Verificat înainte de montajul aparatajului suspendat |
| Decalajul dintre găurile buloanelor de ancoraj și buloanele efectiv livrate | ± 5 mm | Coordonare strictă proiect fundație — plan de fabricație portal (cap. PTh-S.7.6) |
| Grosimea peliculei de protecție anticorozivă | Conform fișei tehnice a sistemului de vopsire/zincare adoptat, verificată cu grosimetru magnetic | Verificare la finisaje (cap. PTh-S.7.11) |

### PTh-S.9.3. Toleranțe speciale pentru pozițiile de ancorare a echipamentului

Acolo unde poziția buloanelor de ancoraj este dictată de planul de fundație al unui furnizor de echipament (celule MT, cabine prefabricate, baze de izolatoare pe portal), se aplică, **cu prioritate** față de toleranța generală SR EN 13670/SR EN 1090-2 de mai sus, toleranța impusă explicit de fișa tehnică a furnizorului — de regulă mai strictă (tipic `± 3–5 mm`), dat fiind că bazele echipamentelor electrice prefabricate nu permit, de regulă, ajustări în teren echivalente celor posibile la o structură de beton armat monolit; caietul de sarcini de execuție semnalează explicit această derogare, cu obligația executantului de a solicita, înaintea betonării, confirmarea scrisă a planului de fundație definitiv de la furnizorul de echipament (cap. PTh-S.2.6).

### PTh-S.9.4. Toleranțe pentru priza de pământ, canale de cabluri și împrejmuire

Pentru elementele fără o toleranță dimensională explicită în SR EN 13670/SR EN 1090-2 (dat fiind că nu sunt, propriu-zis, elemente structurale portante), caietul de sarcini fixează toleranțe de execuție proprii, pe baza cerințelor funcționale ale fiecărui element:

- **Priza de pământ** — adâncimea de îngropare a rețelei de platbandă orizontală: `± 5 cm` față de cota de proiect (de regulă minimum 0,60–0,80 m, conform proiectului tehnologic, pentru protecția mecanică a conductorului și pentru eficiența de dispersie la adâncimea proiectată); poziția electrozilor verticali: `± 20 cm` în plan, fără abatere admisă la adâncimea de baterie a electrodului (adâncimea fiind, de regulă, dimensionată tocmai pentru atingerea unui strat de teren cu rezistivitate mai redusă, identificat prin măsurătorile Wenner preliminare, cap. PTh-S.7.9);
- **Canalele de cabluri** — planeitatea reazemelor capacelor: `± 5 mm` sub dreptar de 1 m (pentru evitarea clătinării capacelor sub trafic pietonal/utilaje de manipulare, cap. PTh-S.2.5); panta longitudinală a radierului canalului (acolo unde proiectul tehnologic prevede evacuarea gravitațională a eventualelor infiltrații de apă): conform valorii de proiect, cu toleranță `± 0,1%`;
- **Împrejmuirea incintei** — verticalitatea stâlpilor: `± 1%` din înălțimea stâlpului; poziția în plan a fundațiilor stâlpilor față de traseul de trasare: `± 30 mm` (toleranță relaxată față de elementele structurale principale, dat fiind rolul de delimitare/securitate perimetrală al împrejmuirii, nu de element portant al vreunei încărcări semnificative, cu excepția, acolo unde este cazul, a peretelui antifoc dintre transformator și clădirea de comandă, cap. PTh-S.5, tratat cu toleranțele elementelor structurale de beton de la cap. PTh-S.9.1).

### PTh-S.9.5. Consecințele depășirii toleranțelor admise

Orice depășire a toleranțelor stabilite mai sus, constatată la verificările din planul de control al calității (cap. PTh-S.8), se tratează prin fișă de neconformitate (cap. PTh-S.8.4), cu evaluarea de către proiectant a efectului abaterii asupra siguranței/funcționalității elementului afectat, înainte de decizia de acceptare condiționată, remediere sau, în cazurile grave, demolare și refacere: pentru elementele cu rol de siguranță critică (ancorarea echipamentului fragil la cap. PTh-S.6, etanșeitatea cuvei de retenție), marja de toleranță se aplică strict, fără acceptări condiționate, dat fiind că o abatere aparent minoră (de exemplu, o adâncime de ancorare insuficientă cu câțiva milimetri) poate modifica modul de cedare guvernant al ancorajului, dintr-unul ductil (curgerea oțelului) într-unul fragil (smulgerea conului de beton), conform metodologiei de la cap. PTh-S.6.4.

---

## PTh-S.10. Fazele determinante

### PTh-S.10.1. Cadrul normativ și principiul fazelor determinante

Conform **Regulamentului privind controlul de stat al calității în construcții, aprobat prin HG nr. 272/1994**, coroborat cu **Regulamentul de recepție a lucrărilor de construcții și instalații aferente acestora, aprobat prin HG nr. 273/1994**, și cu art. 9, 22–24 din Legea nr. 10/1995, fazele determinante ale execuției — etapele la care, prin natura lucrării, un defect necorectat la momentul respectiv devine, ulterior, imposibil sau extrem de costisitor de remediat, ori la care verificarea calității nu mai este posibilă după acoperirea/continuarea lucrării — se stabilesc explicit prin programul de control al calității, depus la Inspectoratul de Stat în Construcții (ISC) înaintea începerii execuției, cu obligația executantului de a convoca ISC, în scris, cu minimum 10 zile lucrătoare înainte de data programată a fiecărei faze determinante.

### PTh-S.10.2. Fazele determinante ale stației de transformare

Pentru lucrările de rezistență ale stației de transformare tratate în prezentul supliment, se stabilesc următoarele faze determinante (corelate cu pozițiile calificate FD la cap. PTh-S.8.2, plus completările specifice etapei de recepție finală):

1. **Recepția terenului de fundare** pentru fiecare dintre cele patru obiecte de construcție (fundație transformator, cuvă de retenție, fundații portal, fundații împrejmuire/canale cabluri), înainte de turnarea stratului de egalizare — participanți: proiectant geotehnician, proiectant rezistență, executant, diriginte de șantier, reprezentant ISC;
2. **Recepția armăturii fundației transformatorului**, înainte de betonare — participanți: proiectant rezistență, executant, diriginte de șantier, RTE atestat, reprezentant ISC;
3. **Proba de etanșeitate a cuvei de retenție** (72 h) — participanți: executant, diriginte de șantier, proiectant rezistență, beneficiar, reprezentant ISC;
4. **Măsurarea rezistenței de dispersie a prizei de pământ**, după execuția completă a rețelei de electrozi — participanți: proiectant instalații electrice, executant, laborator PRAM autorizat, diriginte de șantier, reprezentant ISC;
5. **Recepția montajului structurii metalice a portalului** (verticalitate, îmbinări) — participanți: executant structuri metalice atestat conform SR EN 1090-1, proiectant rezistență, diriginte de șantier, reprezentant ISC;
6. **Recepția la terminarea lucrărilor de rezistență** ale ansamblului celor patru obiecte de construcție, condiționată de finalizarea tuturor pozițiilor PVLA (cap. PTh-S.8) și de arhivarea completă a proceselor-verbale de fază determinantă în cartea tehnică a construcției.

### PTh-S.10.3. Urmărirea comportării în timp

Conform **P 130/1999 (Normativ privind urmărirea comportării în timp a construcțiilor)**, deja citat la cadrul normativ al prezentului supliment (cap. PTh-S.1.3), se instituie un **program de urmărire specială** pentru cele două elemente identificate ca prezentând risc specific de evoluție în timp:

- **Cuva de retenție** — urmărirea etanșeității în exploatare, prin inspecție vizuală periodică (recomandată semestrial) a suprafeței interioare (fisuri, eflorescențe, semne de infiltrație) și prin verificarea funcționării sistemului de detectare/alarmă a nivelului de lichid, acolo unde proiectul tehnologic prevede un astfel de sistem; orice fisură vizibilă se raportează proiectantului de rezistență pentru evaluare, înainte de a deveni cale de infiltrație a uleiului electroizolant în sol;
- **Fundația transformatorului** — urmărirea tasării, prin măsurători topografice de nivelment de precizie pe repere fixate pe blocul de fundație (minimum 4 repere, câte unul în apropierea fiecărui punct de reazem al transformatorului), cu periodicitate recomandată anuală în primii 3 ani de exploatare și, ulterior, la un interval extins, dacă măsurătorile succesive confirmă stabilizarea tasării sub pragul de alertă stabilit de proiectant (corelat cu limita de înclinare admisă a cuvei transformatorului, cap. PTh-S.2.3) — program aflat în sarcina beneficiarului/operatorului stației, cu raportare către proiectant în cazul depășirii pragului de alertă.

---

## PTh-S.11. Reconcilierea cu DTAC

### PTh-S.11.1. Principiul reconcilierii

Conform angajamentului asumat la cap. 0 (introducere) al prezentului supliment, tabelul următor reia, punct cu punct, toate valorile numerice și soluțiile constructive de predimensionare din memoriul de rezistență DTAC (`structura.md`) și le confruntă cu valorile definitive rezultate din calculul de detaliu de la faza PT, semnalând explicit fiecare eventuală ajustare și motivarea ei — pentru toate pozițiile la care faza PT nu a adus nicio ajustare (marea majoritate, dat fiind că datele de intrare fundamentale — greutatea transformatorului, parametrii seismici de amplasament — au rămas neschimbate între cele două faze), tabelul confirmă explicit identitatea valorii, ca dovadă a coerenței documentației tehnice a stației pe cele două faze de proiectare.

### PTh-S.11.2. Tabelul de reconciliere

| Nr. | Element / parametru | Valoare DTAC (predimensionare) | Valoare PTh (definitivă) | Statut | Motivare ajustării (dacă e cazul) |
|---|---|---|---|---|---|
| 1 | Dimensiuni în plan fundație transformator | 6,00 × 5,00 m | 6,00 × 5,00 m | Identic | — |
| 2 | Înălțime bloc fundație transformator | 1,20 m | 1,20 m | Identic | — |
| 3 | Clasă beton fundație transformator | C25/30, XC2 | C25/30, XC2 | Identic | — |
| 4 | Greutate transformator (etapa I) | 687 kN (70 t) | 687 kN (70 t) | Identic | Confirmat prin fișa tehnică a echipamentului ales prin achiziție |
| 5 | Acoperire nominală armătură `c_nom` | 45 mm (estimat) | 45 mm (calculat detaliat: `c_min,dur` 25 mm S4/XC2 + `Δc_dev` 10 mm + majorare 10 mm suprafață pe teren) | Identic, cu detaliere | Calculul detaliat la PT confirmă valoarea de predimensionare |
| 6 | Presiune efectivă pe teren `p_ef` | 52,9 kPa | 52,9 kPa | Identic | Date de intrare neschimbate (greutate + geometrie) |
| 7 | Presiune convențională teren `p_conv` | 200 kPa (estimat din studiu geotehnic preliminar) | 200 kPa (confirmat prin foraje definitive) | Identic, confirmat | Studiul geotehnic definitiv validează valoarea preliminară |
| 8 | Tasare estimată | "ordinul milimetrilor" (calitativ) | < 10 mm (calcul cantitativ NP 112/2014, pe baza `E_oed` din studiul geotehnic definitiv) | Detaliat cantitativ | Disponibilitatea parametrilor geotehnici definitivi la faza PT |
| 9 | Frecvența proprie a sistemului fundație-teren `f_n` | 15–30 Hz (interval estimativ) | 15–30 Hz (confirmat prin calcul dinamic complet Lysmer/Barkan) | Identic, confirmat cantitativ | Calcul dinamic complet posibil doar cu parametrii dinamici definitivi ai terenului (`V_s`, `G`, `ν`) |
| 10 | Ancoraje cale de rulare | Buloane M24 clasa 8.8 (predimensionat la forța de manevră) | Buloane M24 clasa 8.8 (reverificat și la forța seismică `F_a`, cap. PTh-S.6.2) | Identic, reverificat | Forța de manevră rămâne dimensionantă; ipoteza seismică nu majorează secțiunea |
| 11 | Rezistența de dispersie a prizei de pământ `R_E` | < 1 Ω (țintă de proiectare) | < 1 Ω (confirmat prin măsurători Wenner + voltampermetrice la execuție, cap. PTh-S.7.9) | Identic, confirmat prin măsurare | — |
| 12 | Tensiune de pas/atingere admisă `U_Tp,adm` | ≈ 220 V la `t_f ≈ 0,5 s` | ≈ 220 V la `t_f ≈ 0,5 s` | Identic | Parametri de protecție prin relee confirmați neschimbați de proiectul tehnologic la faza PT |
| 13 | Fundații celule MT (amplasare interioară) | Verificare calitativă a pardoselii parterului | `q_celulă ≈ 16,3 kPa`, cu armătură de repartiție suplimentară `Ø8/150 mm` | Detaliat cantitativ | Disponibilitatea fișei tehnice definitive a celulelor la faza PT |
| 14 | Fundații cabine MT prefabricate exterioare (variantă alternativă) | Menționată ca variantă posibilă, netratată dimensional | Radier C25/30, 20–25 cm, `p_ef` 20–40 kPa | Detaliat la PT | Soluție tratată dimensional doar dacă proiectul tehnologic o confirmă la faza PT |
| 15 | Clasă de execuție structură metalică portal (EXC) | Nespecificată explicit | EXC2/EXC3 (conform SR EN 1993-1-1 Anexa A, confirmat de proiectantul de structuri metalice) | Precizat la PT | Încadrarea în clasa de execuție necesită evaluarea definitivă a consecințelor cedării, disponibilă la faza PT |
| 16 | Verificare echipamente fragile la seismic (transformator, aparataj portal) | Calitativă (încadrare în categorie, fără calcul cantitativ) | Cantitativă completă, `F_a` calculat per componentă (cap. PTh-S.6) | Detaliat cantitativ | Calculul cantitativ necesită datele de catalog ale echipamentului efectiv ales, disponibile la faza PT |

### PTh-S.11.3. Concluzia reconcilierii

Tabelul de mai sus confirmă, pentru toate cele 16 poziții verificate, **absența oricărei ajustări de fond** a soluțiilor structurale predimensionate la DTAC — toate diferențele între cele două faze constau exclusiv în **detalierea cantitativă** a unor verificări care, la DTAC, fuseseră tratate calitativ sau prin ordin de mărime (frecvența proprie dinamică, tasarea, verificarea seismică a echipamentelor fragile, fundațiile celulelor MT), situație așteptată și conformă rolului distinct al celor două faze de proiectare (DTAC — soluție de principiu, dimensionată la nivel de predimensionare, suficientă pentru obținerea autorizației de construire; PT/DE — definitivare completă până la nivelul cerut de execuție), fără ca vreo dimensiune, clasă de material sau soluție constructivă de bază să se fi modificat între cele două faze.

