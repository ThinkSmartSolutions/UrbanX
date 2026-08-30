# MEMORIU TEHNIC DE REZISTENȚĂ (DTAC) — Instalație BESS (Stocare Energie în Baterii)

**Infrastructură de fundare directă pentru un ansamblu containerizat de stocare a energiei electrice în baterii Li-ion (LFP) — platforme/radiere de beton armat sub containerele de baterii, fundații pentru echipamentul de conversie (PCS) și pentru postul de transformare, cuvă de retenție a uleiului de transformator, bazin de retenție a apelor de stingere, platformă și drumuri de intervenție, împrejmuire și rețea de trenchuri pentru cablurile de medie tensiune dintre containere și stația de racordare.**

> Prezentul memoriu constituie piesa scrisă de rezistență a documentației tehnice pentru autorizarea executării lucrărilor de construire (DTAC) a unei instalații de stocare a energiei electrice în baterii (BESS), întocmit conform Legii nr. 10/1995 privind calitatea în construcții (republicată), a Legii nr. 169/2026 (Codul amenajării teritoriului, urbanismului și construcțiilor — CATUC), art. 264 — anexa nr. 2, conținutul-cadru al documentației tehnice —, a HG nr. 907/2016 și a HG nr. 766/1997 (categorii de importanță). Spre deosebire de o clădire obișnuită, la o instalație BESS **structura civilă nu este obiectul principal al investiției** — obiectul propriu-zis este echipamentul electrochimic și electric (containere de baterii, invertoare, transformator), livrat de furnizor ca produs certificat, cu propria anvelopă metalică autoportantă și propriul cadru de rezemare. Rolul inginerului structurist se limitează, prin urmare, la **infrastructura de fundare directă** a acestor echipamente și la construcțiile civile conexe (cuve, bazine, platforme, împrejmuiri, trenchuri) — dar acest rol, deși restrâns ca volum de beton pus în operă față de o clădire de aceeași amprentă la sol, este departe de a fi minor: greutatea proprie foarte mare a containerelor pline (echivalentul, per unitate, al unui vagon de marfă încărcat) și, mai ales, **forța seismică orizontală rezultată dintr-o masă concentrată atât de mare**, fac din ancorarea antiseismică a acestor echipamente aspectul tehnic determinant al întregii documentații de rezistență — aspect tratat integral și în detaliu în capitolul 7. Toate valorile numerice de mai jos sunt calcule de predimensionare/verificare, lucrate pentru justificarea soluției adoptate la faza DTAC; ele nu se substituie calculului de proiect tehnic (breviar complet, cu datele definitive ale furnizorului de echipament și cu studiul geotehnic de detaliu) și nici verificării tehnice atestate. Prezentul document tratează exclusiv rezistența mecanică și stabilitatea (cerința fundamentală A); descrierea tehnologică generală a instalației, încadrarea urbanistică, amenajarea și zonarea funcțională a platformei, distanțele de siguranță la foc, scenariul de securitate la incendiu și dimensionarea instalațiilor electrice sunt tratate în memoriul general, în memoriul de arhitectură/amenajare și în memoriul de instalații electrice + PSI ale aceleiași documentații — documente care nu se dublează aici, ci se citează prin referință ori de câte ori este necesar.

---

## 1. Date generale și scopul lucrării

### 1.1. Obiectul documentației

Se propune realizarea infrastructurii de rezistență pentru o instalație de stocare a energiei electrice în baterii (Battery Energy Storage System — BESS), de tipul celor utilizate pentru integrarea producției variabile din surse regenerabile (parc fotovoltaic adiacent), pentru servicii de sistem (reglaj primar/secundar de frecvență, FCR/aFRR) și pentru arbitraj pe piața de energie. Conform memoriului general al aceleiași documentații, capacitatea de referință dezvoltată ca exemplu de calcul este de **25 MW / 50 MWh** (raport E/P = 2 ore, C-rate 0,5C), realizată din **10 containere** de tip ISO, echipate cu module de baterii litiu-fier-fosfat (LFP), fiecare container fiind conectat, prin cabluri de curent continuu de joasă/medie tensiune internă, la propriul echipament de conversie (PCS — Power Conversion System), acesta din urmă livrând energie în curent alternativ către un transformator ridicător și, prin celule de medie tensiune, către rețeaua electrică de transport/distribuție.

Din punctul de vedere strict al proiectării structurale, o instalație BESS prezintă un set de particularități care o diferențiază net atât de o clădire obișnuită (unde structura este obiectul principal), cât și de alte tipuri de instalații tehnice (stații de transformare clasice, de exemplu, unde masele echipamentelor sunt, de regulă, mult mai mici):

1. **Echipamentul, nu structura civilă, este obiectul principal al investiției** — containerele de baterii, PCS-ul și transformatorul sunt produse industriale certificate, proiectate și fabricate de furnizor, cu propria anvelopă metalică (cadru ISO, structură autoportantă) și cu propriile cerințe de rezemare (patru sau opt reazeme de colț, la containerele ISO standard — corner castings conform ISO 1161). Rolul inginerului structurist nu este acela de a proiecta containerul, ci de a-i asigura, prin infrastructura de fundare, o rezemare adecvată, stabilă și — esențial — **ancorată**, astfel încât echipamentul să nu se răstoarne, să nu lunece și să nu sufere deplasări relative periculoase pe durata unui cutremur.
2. **Masa concentrată foarte mare pe amprentă relativ mică** — un container de baterii plin (module + rack-uri + cadru + echipamente auxiliare de management termic) cântărește, funcție de configurație și de tipul de container, între aproximativ 30 și 40 de tone, distribuite pe o amprentă la sol de ordinul a 15–30 mp și rezemate punctual pe doar 4 (sau 8) puncte de colț. Această concentrare — mult mai severă decât presiunea medie distribuită a unei plăci industriale obișnuite — este cea care guvernează atât verificarea la poansonare a platformei de rezemare (cap. 6.3), cât și, în mod hotărâtor, forța seismică orizontală generată de masa echipamentului (cap. 7).
3. **Clasa de importanță/expunere seismică formal redusă (clasa III, γI,e = 1,0), dar cu forță seismică absolută mare** — spre deosebire de o clădire de locuit sau de o clădire publică (unde clasa de importanță majorează factorul γI,e peste 1,0 tocmai pentru a compensa consecințele umane ale unei avarii), o instalație BESS neasistată permanent de personal se încadrează, conform P100-1/2013, în clasa III standard, cu γI,e = 1,0. Însă absența majorării normative nu înseamnă, la BESS, o forță seismică mică — dimpotrivă: forța seismică de proiectare este direct proporțională cu masa echipamentului (`Fb = γI·Sd(T1)·m·λ`), iar masa de 30–40 tone per container este cu unul-două ordine de mărime mai mare decât masa oricărui echipament electric obișnuit ancorat pe o platformă industrială (transformator, tablou electric, cameră de comandă). Rezultă că, deși coeficientul de importanță este cel minim, **forța seismică absolută rămâne substanțială și guvernează dimensionarea ancorajelor** — paradox aparent, explicat în detaliu în cap. 7.1–7.2, și motivul pentru care prezentul memoriu tratează ancorarea antiseismică drept aspectul central al întregii documentații.
4. **Risc de incendiu major asociat funcțiunii (thermal runaway Li-ion)**, cu implicații care, deși aparțin în primul rând scenariului de securitate la incendiu (tratat de studiul de siguranță la incendiu — SSI — dedicat), interacționează direct cu proiectarea structurală prin cerințele de compartimentare fizică între bay-uri de containere (distanțe minime + eventuale ziduri antifoc), prin necesitatea unui bazin de retenție structural pentru apele de stingere contaminate (cap. 10) și prin cerințele de rezistență la foc ale elementelor structurale civile aflate în proximitatea unui eveniment termic de amploare (cap. 11) — aspecte tratate aici doar în măsura interacțiunii cu structura, fără a relua scenariul complet de securitate la incendiu, care rămâne obiectul SSI.
5. **Absența unei suprastructuri propriu-zise** — spre deosebire de orice clădire cu regim de înălțime (chiar și P sau P+1), unde structura de rezistență urcă pe verticală prin stâlpi, grinzi și planșee, la o instalație BESS structura civilă rămâne, cu excepția eventualei cabine tehnice de comandă (EMS), **strict la nivelul infrastructurii de fundare** — o platformă parter tehnic, fără etaje, fără planșee intermediare și fără elemente structurale verticale de tip cadru sau perete în sensul obișnuit al termenului. Această simplificare geometrică majoră este contrabalansată, însă, de complexitatea specifică a verificărilor de fundare directă sub sarcini concentrate mari și de ancorare antiseismică, tratate pe larg în capitolele 6 și 7.

### 1.2. Caracteristici geometrice și de amplasament principale

Se dezvoltă, ca exemplu de calcul reprezentativ, infrastructura de fundare pentru instalația BESS de 25 MW / 50 MWh descrisă la memoriul general și la memoriul de arhitectură/amenajare ale aceleiași documentații, corelată cu următoarele date geometrice și de masă:

| Parametru | Valoare adoptată | Observație |
|---|---|---|
| Regim de înălțime | parter tehnic, fără etaje | H ≤ 6–7 m (containere + eventuale antene/paratrăsnet) |
| Număr containere baterii | 10 (2 rânduri × 5), tip ISO 20' (referință arhitectură) | 6,06 × 2,44 m, H 2,90 m — memoriul de arhitectură |
| Masă container 40ft plin | ~35–40 t (≈ 392 kN) | configurație alternativă/extindere viitoare, tratată generic în prezentul memoriu |
| Masă container 20ft plin | ~30 t (≈ 294 kN) | configurația de referință a exemplului (10 containere 20') |
| Amprentă la sol container 20ft | ≈ 6,06 × 2,44 = 14,79 mp | rezemare pe 4 colțuri (corner castings ISO 1161) |
| Distanță container-container | ≥ 3,0 m (NFPA 855) sau conform raport UL 9540A | memoriul de arhitectură cap. 2 |
| Culoar intervenție între rânduri | ≥ 6,0 m | gabarit autospecială ISU |
| PCS (per unitate) | 8–15 t | funcție de puterea nominală a invertorului |
| Transformator ridicător | 10–30 t | funcție de puterea aparentă (12,5 MVA în exemplul din memoriul de instalații) |
| Radier/platformă b.a. sub container | grosime 25–40 cm | funcție de variantă (cap. 6) |
| Cotă de fundare (talpă platformă) | −0,80 ÷ −1,10 m față de CTS | Df conform studiului geotehnic (cap. 4.4) |
| Cotă platformă finită | ≈ +0,10 ÷ +0,15 m față de CTS | pantă de drenaj ≥ 1% spre bazinul de retenție |

Absența unei suprastructuri și a unui regim de înălțime propriu-zis simplifică radical raportul de zveltețe și eliminarea oricărei discuții privind efecte de ordinul II (P-Δ) sau regularitate în elevație, teme centrale la clădirile cu mai multe niveluri — la o instalație BESS, întreaga discuție structurală se concentrează pe **interfața dintre echipament și infrastructura de fundare** (rezemare + ancorare) și pe **infrastructura însăși** (presiune pe teren, poansonare, tasări). Această concentrare tematică este motivul pentru care prezentul memoriu, deși tratează o construcție geometric simplă, dedică unui singur aspect (ancorarea antiseismică, cap. 7) o pondere disproporționat de mare față de o clădire obișnuită — proporție justificată tehnic, nu artificială.

### 1.3. Clasificări normative

**Categoria de importanță (HG nr. 766/1997):** conform criteriilor din anexa nr. 3 (funcțiune tehnică fără aglomerări de persoane, neasistată permanent de personal în regim normal de funcționare, dar cu risc ecologic/tehnologic ridicat), instalația BESS se încadrează în **categoria de importanță „C" (normală)**. Factorul ecologic/de risc ridicat (thermal runaway Li-ion) nu modifică, prin el însuși, încadrarea în categoria de importanță (care rămâne C), dar impune, conform memoriului general, o **tratare agravantă a cerințelor de siguranță la incendiu (Cc) și de igienă/mediu (Ci)** — aspecte care aparțin, în primul rând, SSI-ului și memoriului de mediu, dar care interacționează cu structura prin bazinul de retenție (cap. 10) și prin compartimentarea fizică între bay-uri (cap. 11).

**Clasa de importanță și expunere seismică (P100-1/2013, tabel 4.2):** construcțiile și instalațiile tehnice fără aglomerări de persoane și fără rol vital post-seism se încadrează în **clasa III**, cu factor de importanță și expunere **γI,e = 1,0** — spre deosebire de clădirile de cazare/aglomerare (clasa II, γI,e = 1,20, cf. exemplului din memoriul de rezistență al funcțiunii hoteliere) sau de clădirile vitale (clasa I, γI,e ≥ 1,40). Această încadrare la valoarea minimă a factorului de importanță este, așa cum s-a arătat la cap. 1.1 pct. 3, contrabalansată în întregime de masa absolută mare a echipamentului ancorat, motiv pentru care ea nu trebuie interpretată drept o simplificare a exigenței seismice, ci doar drept absența unei majorări suplimentare peste forța deja substanțială rezultată din masă.

**Clasa de consecințe (SR EN 1990, anexa B):** se adoptă **CC2** (consecințe medii), cu factor de diferențiere KFI = 1,0 pentru gruparea fundamentală — încadrare standard pentru instalații tehnice/industriale de talia unui BESS de această capacitate; o eventuală cedare structurală locală (basculare container, cedare ancoraj) ar avea consecințe economice și de mediu semnificative (pierderea capacității de stocare, posibil declanșator al unui eveniment termic), dar nu ar pune, în sine, direct în pericol vieți omenești, dat fiind caracterul neasistat permanent al instalației.

**Rezistența la foc și implicațiile asupra structurii** — clasificarea detaliată a elementelor pe grade de rezistență la foc, cerințele NFPA 855/P118/Ordin MAI 129/2016 pentru compartimentare, detecție și stingere și scenariul complet de securitate la incendiu constituie obiectul studiului de siguranță la incendiu (SSI) dedicat și al memoriului de instalații (PSI); prezentul memoriu reține doar acele cerințe care condiționează direct dimensiunile, acoperirile de beton și distanțele elementelor structurale civile (cap. 11).

### 1.4. Cadrul normativ de referință

Proiectarea structurală a infrastructurii BESS respectă pachetul de norme europene armonizate (Eurocoduri cu anexele naționale) și codurile românești specifice:

- **Legea nr. 10/1995** — calitatea în construcții; cerința fundamentală **A — rezistență mecanică și stabilitate**.
- **Legea nr. 169/2026** (CATUC), art. 264 — autorizarea executării lucrărilor de construcții; conținutul-cadru al documentației tehnice (anexa nr. 2) pentru DTAC.
- **HG nr. 766/1997** — categoriile de importanță a construcțiilor.
- **HG nr. 907/2016** — conținutul-cadru al documentațiilor tehnico-economice.
- **SR EN 1990:2004/NA:2006** (Eurocod 0) — Bazele proiectării structurilor; grupări de acțiuni, coeficienți parțiali, factori ψ, clase de consecințe.
- **CR 0/2012** — Cod de proiectare. Bazele proiectării construcțiilor (grupări specifice României).
- **SR EN 1991** (Eurocod 1) — Acțiuni asupra structurilor: partea 1-1 (greutăți proprii, încărcări utile), partea 1-3 (zăpadă, armonizată cu **CR 1-1-3/2012**), partea 1-4 (vânt, armonizată cu **CR 1-1-4/2012**).
- **SR EN 1992-1-1:2004/NA** (Eurocod 2) — Proiectarea structurilor de beton, reguli generale.
- **SR EN 1992-1-2** — Proiectarea structurilor de beton la acțiunea focului (metoda tabelară).
- **SR EN 1992-4:2018** (Eurocod 2, partea 4) — **Proiectarea ancorajelor pentru utilizare în beton** — reglementarea centrală pentru dimensionarea buloanelor/ancorelor chimice de fixare a containerelor și a echipamentelor pe platformele de beton (cap. 7.5).
- **SR EN 1993-1-1** (Eurocod 3) — Proiectarea structurilor de oțel, reguli generale — aplicabilă structurilor metalice suport (cadre suport cabluri, structuri de rezemare PCS dacă sunt pe postament metalic, împrejmuire).
- **SR EN 1997-1/NA + NP 074/2014** — Proiectarea geotehnică; conținutul documentațiilor geotehnice.
- **NP 112/2014** — Normativ pentru proiectarea fundațiilor de suprafață, aplicabil prin extensie platformelor/radierelor sub containere.
- **SR EN 1998-1:2004/NA** (Eurocod 8, partea 1) — Proiectarea seismică, completat și prevalat de **P100-1/2013** (Cod de proiectare seismică — partea I).
- **SR EN 1998-4** (Eurocod 8, partea 4) — Silozuri, rezervoare și conducte — referință metodologică pentru ancorarea la bază a echipamentelor rigide nestructurale, prin analogie cu practica de ancorare a echipamentelor industriale grele.
- **NE 012-1/2007 și NE 012-2/2010** — Producerea și executarea lucrărilor din beton.
- **STAS 6054/77** — Adâncimi de îngheț (referință secundară, cota de fundare fiind guvernată aici de gabaritul platformei și de studiul geotehnic).
- **P118-1/2013, P118-2/2013, P118-3/2015** — Securitatea la incendiu; **Ordinul MAI nr. 129/2016** — reglementarea la instalații cu risc de incendiu mare/foarte mare, aplicabilă BESS (referință pentru cerințele care condiționează structura — cap. 11; scenariul complet la SSI).
- **NFPA 855** (Standard for the Installation of Stationary Energy Storage Systems) și **UL 9540A** (Test Method for Evaluating Thermal Runaway Fire Propagation) — standarde internaționale de referință pentru distanțele de siguranță și pentru compartimentarea fizică, cu implicații directe asupra amplasării fundațiilor izolate (cap. 6.1) și asupra separărilor fizice antifoc (cap. 11).
- **SR EN 10080 / SR 438** — Oțel-beton B500C.
- **SR EN ISO 1461, SR EN ISO 12944** — zincarea termică și protecția anticorozivă a elementelor metalice/buloanelor expuse la exterior.
- **ETAG 001 / EAD (European Assessment Document) relevante** — agrementul tehnic european pentru ancorele chimice/mecanice cu marcaj CE, bază obligatorie pentru determinarea capacității de calcul a ancorajelor conform SR EN 1992-4.

Cadrul normativ referitor la tehnologia electrochimică a bateriilor (IEC 62933, IEC 62619, IEC 63056), la instalațiile electrice și la PSI specific thermal-runaway (BMS/EMS, detecție, stingere, ventilație de deflagrație) este tratat integral de memoriul de instalații electrice + PSI; cel referitor la avize (ATR, ANRE, ISU, mediu) și la încadrarea urbanistică, de memoriul general și de memoriul de arhitectură — documente care nu se dublează în prezentul memoriu de rezistență.

---

## 2. Descrierea sistemului structural

### 2.1. Rolul structurii civile într-un ansamblu BESS containerizat

Spre deosebire de proiectarea unei clădiri, unde inginerul structurist concepe integral sistemul de rezistență al construcției, la o instalație BESS **echipamentul principal este proiectat, fabricat, testat și certificat de furnizor**, ca produs industrial independent: containerul de baterii are propriul cadru structural metalic (similar unui container ISO de transport marfă, dar consolidat pentru echipamentul intern și pentru cerințele de rezistență la foc — anvelopă EI 120 conform NFPA 855, cf. memoriului general), propriile puncte de rezemare (corner castings ISO 1161, la cele 4 sau 8 colțuri) și, adeseori, propria certificare seismică internă (rezistența cadrului metalic la accelerațiile transmise prin ancoraje, verificată de furnizor conform standardelor proprii sau conform IEC 62933-5-2). Rolul inginerului structurist proiectant al DTAC-ului, în această configurație, este triplu și se limitează strict la interfața dintre echipament și teren:

1. **Proiectarea infrastructurii de fundare** — platforma/radierul de beton armat care preia, distribuie pe teren și limitează la valori admisibile presiunile concentrate transmise de reazemele containerelor, PCS-ului și transformatorului (cap. 6);
2. **Proiectarea ancorajului antiseismic** — sistemul de buloane/ancore chimice care fixează fiecare echipament de platforma sa de beton, astfel încât forța seismică orizontală și verticală generată de masa proprie a echipamentului să fie transmisă în siguranță la infrastructură, fără răsturnare, lunecare sau smulgere (cap. 7);
3. **Proiectarea construcțiilor civile conexe** — cuva de retenție a uleiului de transformator (cap. 9), bazinul de retenție a apelor de stingere (cap. 10), platforma rutieră și culoarele de intervenție (cap. 12), trenchurile de cabluri MT (cap. 13) și împrejmuirea (cap. 14).

Această delimitare de roluri nu este o simplificare formală, ci reflectă o realitate contractuală și tehnică a proiectelor BESS: **caietul de sarcini al furnizorului de echipament** (data-sheet-ul containerului, al PCS-ului, al transformatorului) conține datele de intrare obligatorii pentru proiectul de rezistență — masa exactă a echipamentului plin, poziția și numărul reazemelor, forța admisibilă la fiecare reazem, cerințele minime de rigiditate a platformei de rezemare (pentru a evita torsionarea cadrului containerului) și, adeseori, recomandările proprii de ancorare seismică (tip și diametru minim de bulon, moment de strângere). Proiectul de rezistență DTAC dezvoltat în lipsa acestor date definitive de furnizor (situație tipică la faza DTAC, unde selecția furnizorului nu este întotdeauna finalizată) se bazează pe valori de masă și de gabarit reprezentative pentru piața actuală de containere BESS (cap. 1.2), cu obligația explicită de recalculare la faza PT pe baza data-sheet-ului definitiv al echipamentului contractat — recomandare reluată la cap. 17.

### 2.2. Variante de infrastructură de fundare analizate

Pentru infrastructura de fundare a unui șir de containere BESS, se compară trei variante:

**Varianta A — Fundații izolate/tălpi independente sub fiecare reazem de colț al fiecărui container.** Fiecare din cele 4 (sau 8) puncte de rezemare ale unui container primește o fundație izolată de beton armat, dimensionată individual la sarcina punctuală transmisă. Avantaj: consum minim de beton, soluție economică pe teren bun și omogen. Dezavantaj: (a) fiecare fundație izolată trebuie dimensionată separat la ancorare antiseismică, cu risc de subdimensionare dacă distribuția reală a maselor interne ale containerului (module de baterii, nu neapărat uniform distribuite) diferă de ipoteza de calcul; (b) tasările diferențiale între cele 4 puncte de rezemare ale aceluiași container pot introduce răsuciri (torsiune) în cadrul metalic al containerului, incompatibile cu toleranțele constructive ale echipamentului electric intern (rack-uri de baterii sensibile la dezaliniere); (c) fără o placă de legătură, drenajul și planeitatea generală a platformei devin mai greu de controlat.

**Varianta B — Radier general continuu pentru întregul șir/toată platforma BESS.** O singură placă de beton armat, de grosime constantă sau cu îngroșări locale, suportă simultan toate containerele unui rând (sau întreaga platformă). Avantaj: rigiditate globală maximă, eliminare aproape totală a tasărilor diferențiale între reazeme, execuție unitară a hidroizolației/drenajului, suprafață unică pentru circulația de mentenanță. Dezavantaj: consum de beton mai mare decât variantele izolate, armare mai complexă la interfața dintre zonele foarte încărcate (sub reazemele containerelor) și zonele slab încărcate (spațiul dintre containere, folosit ca circulație), și — la o platformă de dimensiuni mari (10 containere pe două rânduri, cf. arhitecturii) — necesitatea rosturilor de contracție/dilatare la distanțe uzuale (cap. 6.5).

**Varianta C — Platforme/radiere independente per container sau per pereche de containere, legate printr-o placă rutieră comună de circulație.** Soluție intermediară, adoptată în prezentul memoriu (cap. 2.3): fiecare container (sau, opțional, fiecare pereche de containere alăturate, dacă distanța de 3,0 m dintre ele o permite constructiv) rezemă pe o platformă de beton armat dedicată, dimensionată integral pentru masa proprie și pentru ancorajul seismic al acelui echipament, cu o grosime și o armare suficiente pentru a evita practic tasările diferențiale între cele 4 reazeme ale aceluiași container (condiție mult mai ușor de satisfăcut la scara unei singure platforme de 6×3 m decât la scara unui radier de zeci de metri). Platformele individuale sunt legate, la partea superioară, printr-o placă/dală rutieră comună de circulație și mentenanță (cap. 12), care asigură continuitatea suprafeței de acces fără a fi solicitată structural de greutatea containerelor.

### 2.3. Soluția adoptată și justificarea ei

Se adoptă **Varianta C — platforme/radiere independente de beton armat sub fiecare container, sub fiecare unitate PCS și sub transformator, legate printr-o platformă rutieră comună de circulație**, pentru motivele următoare:

1. **Compatibilitate cu logistica de livrare și instalare a echipamentelor** — containerele BESS sunt livrate și poziționate individual, prin transport rutier special și macara, pe un program de instalare eșalonat (posibil chiar în etape succesive de extindere a capacității instalate); platformele independente permit finalizarea infrastructurii de fundare și instalarea fiecărui container fără a depinde de finalizarea integrală a unui radier general unic, cu beneficii directe asupra graficului de execuție și asupra flexibilității de extindere ulterioară a instalației.
2. **Limitarea tasărilor diferențiale la scara relevantă echipamentului** — dat fiind că cerința critică nu este tasarea absolută a platformei (care poate fi acomodată constructiv), ci **tasarea diferențială între cele 4 puncte de rezemare ale aceluiași container** (care ar introduce torsiune în cadrul metalic, cu risc de deteriorare a rack-urilor interne de baterii sau a etanșeității anvelopei EI 120), o platformă dedicată, rigidă și de dimensiuni reduse (comparabile cu amprenta containerului) controlează inerent această tasare diferențială mult mai eficient decât un radier general de zeci de metri, expus la variabilitatea reală, adesea neomogenă, a terenului de fundare pe o suprafață mare.
3. **Economie de material fără compromis pe siguranță** — platformele independente, dimensionate exact la nevoia fiecărui tip de echipament (containere de baterii, PCS, transformator au mase și distribuții de reazeme diferite), evită supra-dimensionarea generalizată pe care ar impune-o un radier general proiectat conservator pentru cel mai încărcat punct al întregii platforme.
4. **Compatibilitate cu distanțele de siguranță la foc** — dat fiind că NFPA 855/raportul UL 9540A impun o distanță minimă (3,0 m, cap. 1.2) între containerele adiacente, exact pentru a limita propagarea unui eveniment termic, o platformă continuă care ar trece dedesubtul acestui interspațiu nu ar aduce niciun beneficiu funcțional, ci doar consum suplimentar de beton — platformele independente respectă natural, prin conturul lor, distanțele de siguranță deja impuse de proiectarea PSI.
5. **Robustețe la extindere/modificare a configurației** — o instalație BESS este, prin natura tehnologiei (evoluție rapidă a densității energetice a bateriilor, upgrade-uri de capacitate), mai susceptibilă de reconfigurare pe durata de viață decât o clădire obișnuită; platformele independente permit înlocuirea sau repoziționarea unui container fără afectarea infrastructurii vecine.

**Alcătuirea constructivă adoptată** pentru platforma-tip sub un container: placă de beton armat de grosime **25–40 cm** (cap. 6.2), rezemată pe un strat de fundare din balast/piatră spartă compactat, grosime **30–50 cm, compactat la ≥ 98% Proctor normal**, așezat pe un strat de egalizare din beton simplu **C8/10**, grosime 5–10 cm, peste terenul natural curățat de stratul vegetal. Sub stratul de balast se prevede, funcție de natura terenului (cap. 4.4), un geotextil de separație. Platforma este prevăzută cu pantă de scurgere ≥ 1% către rigolele/canalizarea pluvială periferică, racordată la bazinul de retenție a apelor (cap. 10), astfel încât apele meteorice și, în caz de eveniment, apele de stingere să fie dirijate controlat, nu infiltrate necontrolat în teren.

**Platforma rutieră de legătură** (cap. 12), care asigură continuitatea suprafeței circulabile între platformele individuale ale containerelor, este proiectată separat, ca element de circulație (portanță pentru trafic ușor de mentenanță și, pe drumul perimetral, pentru autospecialele ISU), fără a prelua greutatea echipamentelor.

### 2.4. Sinteza rolurilor elementelor structurale

| Element | Funcție structurală principală | Solicitare dominantă | Regim de verificare |
|---|---|---|---|
| Platformă/radier sub container baterii | rezemare + distribuție presiune pe teren + suport ancoraj seismic | concentrare 4 reazeme (30–40 t) + Fb orizontal | poansonare + presiune teren + ancoraj (cap. 6, 7) |
| Fundație PCS | rezemare + ancoraj echipament de conversie | 8–15 t + Fb propriu | analog container, la scară redusă |
| Fundație transformator + cuvă retenție ulei | rezemare + ancoraj + etanșare/retenție scurgeri | 10–30 t + Fb + volum ulei | presiune teren + ancoraj + etanșare (cap. 9) |
| Bazin retenție ape stingere | contenție hidraulică a unui eveniment de incendiu | presiune hidrostatică + subpresiune (UPL) | structură de rezervor îngropat (cap. 10) |
| Platformă rutieră/culoar intervenție | circulație mentenanță + acces autospeciale ISU | trafic ușor + osii grele ISU | portanță (cap. 12) |
| Trench cabluri MT | protecție mecanică + rutare cabluri container→stație | trafic ocazional peste capace | rezistență capace + adâncime (cap. 13) |
| Împrejmuire | delimitare + protecție | vânt + eventual șoc mecanic | fundații izolate ușoare (cap. 14) |
| Ancoraje (buloane/ancore chimice) | transfer forță seismică echipament→platformă | forfecare + tracțiune combinate | SR EN 1992-4 (cap. 7.5) — **aspectul determinant** |

---

## 3. Materiale

### 3.1. Betoane

Se folosesc, funcție de element și de clasa de expunere (SR EN 206 + NE 012, SR EN 1992-1-1 tabel 4.1), următoarele clase de beton:

| Element | Clasă beton | Clasă expunere | fck (MPa) | fcd = fck/1,5 (MPa) |
|---|---|---|---|---|
| Platforme/radiere containere baterii, PCS | C25/30 | XC2 (contact ocazional cu umezeala/apa de drenaj) + **XF1/XF3** (expunere exterioară la îngheț-dezgheț, cu sau fără agenți de dezghețare) | 25 | 16,67 |
| Fundație transformator | C25/30 | XC2 + XF1/XF3 | 25 | 16,67 |
| Cuvă retenție ulei transformator | **C30/37** | **XA1** (agresivitate chimică ușoară a hidrocarburilor/uleiului mineral) + XC2 | 30 | 20,00 |
| Bazin retenție ape stingere (structură de rezervor) | **C30/37** | **XA1/XA2** (posibilă agresivitate a agenților de stingere/spumanți + XC2) | 30 | 20,00 |
| Platformă rutieră/culoar intervenție | C25/30 (sau C30/37 pe traseul ISU cu trafic greu) | XF2/XF4 (expunere trafic + agenți dezghețare) | 25 (30) | 16,67 (20,00) |
| Trench cabluri (pereți + capace) | C30/37 | XC2 + XF1 | 30 | 20,00 |
| Egalizare sub platforme | C8/10 | X0 | 8 | — |

Coeficient parțial beton `γc = 1,50` (grupări fundamentale/seismice, situații persistente). Coeficient `αcc = 1,0` (NA România). `fcd (C25/30) = 25/1,5 = 16,67 N/mm²`, `fctm = 2,6 N/mm²`; `fcd (C30/37) = 30/1,5 = 20,00 N/mm²`, `fctm = 2,9 N/mm²`.

**Justificarea claselor adoptate.** Clasa **C25/30**, suficientă la platformele curente sub containere (solicitări de încovoiere/poansonare moderate la nivelul de predimensionare, cap. 6.3), este majorată prin clasa de expunere **XF1/XF3**, dictată nu de solicitarea mecanică, ci de **expunerea integrală la exterior, fără protecție de anvelopă**, a acestor platforme — spre deosebire de fundațiile unei clădiri obișnuite, îngropate și acoperite de suprastructură, platformele BESS rămân permanent expuse ciclurilor de îngheț-dezgheț și, pe drumul de acces/circulație, posibil agenților de dezghețare pe timp de iarnă. Clasa **C30/37 + XA1** la cuva de retenție a uleiului și la bazinul de retenție a apelor de stingere reflectă expunerea chimică specifică acestor elemente (hidrocarburi minerale, respectiv posibili aditivi/spumanți din agenții de stingere), impunând un beton cu permeabilitate redusă, aptă pentru rolul de etanșare (cap. 9.2, 10.2).

### 3.2. Oțel-beton

Se folosește oțel **B500C (BST500C)** conform SR EN 10080/SR 438, la toate elementele structurale de beton armat: `fyk = 500 N/mm²`; coeficient parțial `γs = 1,15` → `fyd = 500/1,15 = 434,8 N/mm²`; `Es = 200.000 N/mm²`. Clasa de ductilitate **C** (`εuk ≥ 7,5%`, `(ft/fy)k` între 1,15 și 1,35) se adoptă generalizat, deși platformele BESS nu sunt, în sensul strict al P100-1, elemente disipative (ele rămân, prin concept, elastice sub acțiunea seismică transmisă de echipamentul ancorat, cap. 7) — uniformitatea de material pe șantier, evitarea confuziilor de aprovizionare și rezerva suplimentară de ductilitate oferită fără cost adițional relevant justifică această alegere, practică curentă și la elementele nedisipative ale altor tipologii de construcții.

### 3.3. Oțeluri și elemente metalice pentru ancoraje și structuri suport

**Buloanele de ancorare** (cap. 7.5) se execută din oțel de clasă **8.8** (limita de curgere `fyb = 640 N/mm²`, rezistența la rupere `fub = 800 N/mm²`), conform SR EN ISO 898-1, în diametre **M16 ÷ M24**, funcție de forța de calcul pe fiecare punct de ancorare (cap. 7.5). Pentru medii cu expunere ridicată la coroziune (poziționare exterioară permanentă, posibilă expunere la agenți de stingere/spumanți în caz de eveniment), se adoptă protecție anticorozivă prin **zincare termică la cald conform SR EN ISO 1461, grosime strat ≥ 85 μm**, sau, la elementele cu solicitare de tracțiune ridicată unde zincarea ar putea introduce fragilizare la hidrogen, ancore/tije din oțel inoxidabil austenitic (A4-70/A4-80) sau sisteme certificate specific pentru mediu coroziv de furnizorul de ancore chimice. Clasa de coroziune adoptată pentru dimensionarea protecției **C3-C4** (SR EN ISO 12944, mediu exterior industrial cu posibilă expunere la agenți chimici) impune, la elementele metalice cu rol structural permanent expus (buloane, plăci de bază, eventuale structuri metalice suport pentru cabluri sau pentru copertine), un **sistem de protecție duplex** (zincare termică + vopsire epoxi/poliuretanică), soluție care asigură o durată de protecție compatibilă cu durata de exploatare a infrastructurii civile (50 de ani, cap. 3.5), superioară duratei de viață tehnologică a echipamentului electrochimic propriu-zis (20–25 de ani, cap. 3.5).

**Structurile metalice secundare** (eventuale cadre suport pentru trenchurile de cabluri ridicate deasupra solului, structuri suport pentru copertine tehnice, structura împrejmuirii) se proiectează conform SR EN 1993-1-1, din oțel **S275** sau **S355**, cu aceleași cerințe de protecție anticorozivă C3-C4 duplex.

### 3.4. Ancore chimice/mecanice — cadrul de referință EOTA

Fixarea containerelor, a PCS-ului și a transformatorului pe platformele de beton se poate realiza fie prin **buloane înglobate în beton la turnare** (cast-in anchors, soluție preferabilă structural, cu comportare mai previzibilă la smulgere, dar care impune cunoașterea exactă și definitivă a poziției reazemelor echipamentului înainte de turnarea platformei — condiție greu de satisfăcut la faza DTAC, unde furnizorul poate să nu fie încă selectat), fie prin **ancore post-instalate** (chimice sau mecanice de expandare), fixate în platforma deja turnată, după poziționarea definitivă a echipamentului — soluție cu flexibilitate mult mai mare pentru șantier și pentru eventuale ajustări/reconfigurări ulterioare, adoptată ca soluție de principiu în prezentul memoriu, cu recomandarea explicită a **ancorelor chimice cu agrement tehnic european (ETA), conform EAD relevant** (de exemplu EAD 330499 pentru ancore chimice cu tijă filetată), capabile de o performanță de calcul certificată și determinată conform metodologiei SR EN 1992-4 (cap. 7.5). Sistemul de ancorare cast-in rămâne, de asemenea, o opțiune valabilă acolo unde datele de furnizor sunt disponibile suficient de devreme în programul de execuție.

### 3.5. Durabilitate și clase de expunere

Durata de exploatare proiectată a infrastructurii civile (platforme, cuve, bazine) se consideră **50 de ani** (SR EN 1990, clasa de durabilitate S4 — construcții obișnuite/industriale), semnificativ superioară duratei de viață tehnologice a echipamentului electrochimic propriu-zis (**20–25 de ani**, respectiv peste 6.000 de cicluri la 90% DoD, conform memoriului general), aspect care are o consecință practică directă: **infrastructura de fundare trebuie proiectată pentru a supraviețui, fără refacere, cel puțin unui ciclu complet de înlocuire/upgrade a echipamentului de baterii** — motiv suplimentar pentru care platformele independente (cap. 2.3), ușor de menținut/reutilizat individual la o eventuală înlocuire de container, sunt preferabile unui radier general monolitic, a cărui reconfigurare parțială ar fi mult mai dificilă. Respectarea claselor de expunere din cap. 3.1, corelată cu rapoarte A/C și dozaje minime de ciment conform SR EN 206/NE 012 (A/C ≤ 0,50 și dozaj ≥ 320 kg/mc la elementele XA1/XA2 ale cuvei și bazinului, A/C ≤ 0,55 și dozaj ≥ 300 kg/mc la elementele XF3 ale platformelor exterioare, cu aer antrenat 4–6% pentru rezistență la îngheț-dezgheț), asigură protecția materialului pe toată durata de exploatare proiectată.

---

## 4. Amplasamentul. Acțiuni climatice și seismice

### 4.1. Parametrii seismici de amplasament

Instalațiile BESS, prin natura funcțiunii (integrare cu producție regenerabilă, servicii de sistem, adesea amplasate în zone extravilane cu potențial eolian/solar bun, nu neapărat în zonele cu seismicitatea cea mai ridicată a țării), pot fi amplasate practic oriunde pe teritoriul național. Se dezvoltă, ca exemplu de calcul de bază conform memoriului general, un amplasament cu parametri seismici moderați, reprezentativi pentru o parte semnificativă a zonelor cu potențial de dezvoltare BESS din România:

| Parametru | Simbol | Valoare (exemplul de bază) |
|---|---|---|
| Accelerația terenului (IMR 225 ani) | ag | **0,20·g** |
| Factor de amplificare dinamică maximă | β0 | **2,5** |
| Factor de comportare (echipament ancorat, fragil) | q | **1,5** |
| Factor de importanță/expunere (clasa III) | γI,e | **1,0** |

**Spectrul de proiectare pentru elemente ancorate** — pentru echipamentele rigide, ancorate direct de infrastructură, fără o structură de susținere intermediară flexibilă, perioada proprie de vibrație a ansamblului „echipament + ancoraj" este foarte scurtă (elemente foarte rigide comparativ cu structuri obișnuite), situându-se practic în palierul de accelerație constantă maximă a spectrului de proiectare (`T ≤ TC`), motiv pentru care ordonata spectrală de proiectare se poate scrie, simplificat și acoperitor pentru predimensionare, ca:

`Sd(T1) ≈ ag·β0/q`

relație care corespunde palierului maxim al spectrului elastic (β(T) = β0 pentru TB ≤ T ≤ TC), redus prin factorul de comportare q — abordare simplificată, dar acoperitoare, întrucât un echipament rigid ancorat rigid pe o fundație masivă are, practic întotdeauna, o perioadă proprie inferioară perioadei de colț TC a amplasamentului, situându-l pe palierul de amplificare maximă. Pentru amplasamentul de bază: `Sd(T1) = 0,20·9,81·2,5/1,5 = 3,27 m/s²` (≈ 0,33g).

**Sensibilitatea la amplasament.** Dat fiind că instalațiile BESS pot fi proiectate pentru orice UAT din țară, tabelul următor centralizează parametrii care se recalculează integral prin re-parcurgerea capitolului 7 (regula completă de recalculare este dată în Anexa C):

| Amplasament (exemplu) | ag | Sd(T1) = ag·β0/q | Observație |
|---|---|---|---|
| **Exemplul de bază (moderat)** | **0,20g** | **3,27 m/s²** | caz standard dezvoltat integral în cap. 7 |
| Amplasament sever (curbura Carpaților — Vrancea, Buzău, Focșani) | 0,30–0,40g | 4,91–6,54 m/s² | majorare directă proporțională a lui Fb (cap. 7.2); reverificare obligatorie a ancorajelor |
| Amplasament redus (vestul/sud-vestul țării) | 0,10–0,15g | 1,64–2,45 m/s² | rezerve ample pe toate verificările de ancorare |

**Factorul de comportare q = 1,5**, adoptat pentru echipamentele ancorate rigid, reflectă natura **fragilă/puțin disipativă** a lanțului de transfer al forței seismice (ancoraj metalic în beton) — spre deosebire de o structură de beton armat ductilă (unde q poate ajunge la 3,0–5,0, prin formarea controlată de articulații plastice), un ansamblu container-ancoraj nu are, prin concept, o rezervă de ductilitate exploatabilă: cedarea unui bulon la smulgere sau a betonului la con de smulgere este, prin natura ei, o cedare fragilă, fără capacitate de redistribuire semnificativă a eforturilor către alte puncte de ancorare. Valoarea q = 1,5 reprezintă, prin urmare, o reducere minimă și strict prudentă a spectrului elastic, justificată doar de suprarezistența intrinsecă a materialelor (oțel 8.8, beton) și de coeficienții parțiali de siguranță ai verificărilor de calcul, nu de o ductilitate reală a sistemului.

### 4.2. Acțiunea zăpezii

Deși containerele de baterii, fiind produse industriale cu anvelopă metalică proprie, nu impun, în sine, o verificare de rezistență la zăpadă din partea proiectului de rezistență civilă (rezistența acoperișului containerului este responsabilitatea furnizorului, certificată conform standardului propriu de fabricație), acțiunea zăpezii rămâne relevantă pentru **construcțiile civile conexe cu suprafață orizontală expusă**: eventuala cabină/container tehnic al camerei de comandă EMS (cf. memoriului de arhitectură), copertinele de protecție (dacă sunt prevăzute peste PCS sau peste tablourile electrice exterioare) și capacele carosabile ale trenchurilor de cabluri (cap. 13).

`s = γIs·µi·Ce·Ct·sk`, cu `sk = 2,00 kN/m²` (valoare orientativă medie pentru zonele de câmpie/podiș ale țării, reconfirmată la PT pe amplasamentul real conform hărții de zonare CR 1-1-3/2012), `µi = 0,80` (acoperiș plat sau ușor înclinat, tipic pentru cabinele tehnice/copertinele acestor instalații), `Ce = 1,00`, `Ct = 1,00`, `γIs = 1,00`:

`s = 1,00·0,80·1,00·1,00·2,00 = 1,60 kN/m²`.

Această valoare este preluată direct la dimensionarea acoperișului cabinei EMS (tratată prin cadru metalic ușor sau container tehnic prefabricat, certificat independent de furnizor, verificarea de rezistență civilă limitându-se la fundația de rezemare a cabinei, analogă, la scară mai redusă, fundației PCS — cap. 6) și a eventualelor copertine tehnice, unde se combină cu încărcarea utilă de mentenanță conform grupării fundamentale (cap. 5.4).

### 4.3. Acțiunea vântului

**Vântul asupra containerelor.** Containerele de baterii, deși rezemate direct pe platforme fără fixare structurală suplimentară în lipsa ancorajului seismic, sunt verificate, la stabilitatea de ansamblu, atât la acțiunea seismică (guvernantă, cap. 4.3 vs. 7.4) cât și la acțiunea vântului, aceasta din urmă determinând, în anumite situații (amplasamente cu viteze de vânt ridicate și seismicitate redusă), o solicitare comparabilă sau chiar superioară celei seismice — motiv pentru care verificarea la vânt nu se omite niciodată, ci se calculează sistematic, la fel ca cea seismică:

`qb = 0,5·ρ·vb² `, cu `ρ = 1,25 kg/mc`, `vb = 30 m/s` (viteză de referință reprezentativă, zonă de câmpie/podiș, reconfirmată conform CR 1-1-4/2012 pentru amplasamentul real): `qb = 0,5·1,25·30² = 562,5 N/m² = 0,5625 kN/m²`.

`qp(z) = ce(z)·qb`, cu `ce(z) ≈ 1,8` (înălțime redusă a containerului, ~2,90 m, teren categoria II/III deschis, expunere directă tipică amplasamentelor extravilane ale acestor instalații): `qp = 1,8·0,5625 = 1,013 kN/m²`.

**Forța de vânt pe un container** (suprafață expusă laterală, `A = 6,06 × 2,90 ≈ 17,6 mp`, coeficient de presiune net `cp,net ≈ 1,3` pentru un volum paralelipipedic izolat): `Fw = cp,net·qp·A = 1,3·1,013·17,6 ≈ 23,2 kN` pentru fața cea mai expusă a unui container individual, respectiv, pentru amprenta totală a unui rând de 5 containere alăturate (efect de ecranare parțială neglijat, ipoteză acoperitoare): valoare recalculată proporțional cu aria totală expusă la faza PT, funcție de configurația definitivă a rândurilor.

Pentru **verificarea individuală de stabilitate a unui singur container** (cap. 7.4), forța de vânt determinantă este cea calculată pe suprafața laterală proprie: `Fw,container ≈ 46,6 kN` (valoare reținută pentru comparație cu forța seismică orizontală, cap. 7.4, calculată acoperitor pe suprafața expusă completă a unei fețe lungi a containerului, cu `A ≈ 35,4 mp` la un container de 40ft echivalent — valoare consistentă cu ipoteza de lucru a cap. 7, unde se dezvoltă și cazul unui container de 40 de picioare).

Comparativ cu forța seismică orizontală (`Fb`, cap. 7.2), forța de vânt rămâne, la amplasamentul de bază, semnificativ inferioară (`Fw ≈ 46,6 kN` față de `Fb ≈ 216 kN` la scenariul sever de calcul dezvoltat în cap. 7, respectiv o valoare comparabilă la scenariul standard cu `ag = 0,20g` — recalculat explicit în cap. 7.2) — concluzie așteptată pentru un echipament greu cu suprafață relativ redusă la vânt, situație inversă celei tipice la structuri ușoare/suple (panouri fotovoltaice, structuri metalice deschise), unde vântul este, de regulă, acțiunea laterală guvernantă. **Vântul rămâne, totuși, relevant și trebuie verificat sistematic** — la un amplasament cu viteză de vânt de proiectare ridicată combinată cu o seismicitate redusă (situație posibilă la unele amplasamente extravilane deschise din câmpia de vest sau din zona litorală), raportul între cele două acțiuni se poate inversa, iar verificarea de ancorare (cap. 7.5) trebuie refăcută pentru combinația guvernantă efectivă, nu presupusă a priori.

**Vântul asupra construcțiilor civile conexe** (cabină EMS, copertine tehnice, împrejmuire, eventuale structuri suport pentru cablurile aeriene dintre trenchuri și tablouri) se tratează detaliat în capitolul 8.

### 4.4. Studiul geotehnic

Conform NP 074/2014 și SR EN 1997-1, studiul geotehnic este documentație obligatorie, cu rol determinant pentru dimensionarea platformelor de fundare a unor echipamente cu sarcini concentrate mari. Stratificația de calcul de referință, adoptată pentru exemplul de față (amplasament extravilan tip, teren de câmpie/podiș, reprezentativ pentru marea majoritate a amplasamentelor BESS din țară, care evită deliberat terenurile dificile/cu risc geotehnic ridicat, tocmai pentru a simplifica infrastructura):

| Adâncime (m) | Strat | γ (kN/m³) | E (MPa) | φ' (°) | c' (kPa) |
|---|---|---|---|---|---|
| 0,0 – 0,40 | strat vegetal (se îndepărtează integral pe toată platforma) | 17 | — | — | — |
| 0,40 – 3,00 | argilă prăfoasă/nisip argilos, consistență medie-vârtoasă | 19,0 | **15** | 20 | 20 |
| 3,00 – 6,00 | nisip mediu-mare îndesat | 19,5 | 35–45 | 30 | 0–5 |
| > 6,00 | argilă marnoasă/substrat compact | 20,0 | 50–70 | 22 | 35 |

- **Presiune convențională de bază la cota de fundare a platformelor** (`Df = 0,80–1,10 m`, în stratul de argilă prăfoasă/nisip argilos consistent): **`pconv = 200 kPa`**;
- Modulul de deformație liniară al stratului de fundare: **`E = 15 MPa`**;
- Nivelul hidrostatic — la amplasamentele extravilane tipice, adânc, sub cota de interes pentru fundarea directă a platformelor (se confirmă obligatoriu la PT prin foraje pe amplasamentul real; la platforma de bazin de retenție, cap. 10, se verifică separat, dat fiind caracterul îngropat al acestei structuri);
- Categoria geotehnică **2** (risc geotehnic moderat, teren omogen previzibil, dar cu sarcini concentrate mari care impun un calcul explicit, nu doar reguli empirice) — spre deosebire de o clădire cu subsol pe teren dificil (categoria 3), o platformă BESS pe teren omogen de câmpie se poate încadra, în majoritatea cazurilor, la categoria 2, dar amplasamente cu teren stratificat neomogen, sensibil la lichefiere sau cu apă subterană ridicată impun reclasificarea la categoria 3 și un studiu geotehnic corespunzător de detaliu, cu foraje și încercări de laborator complete, obligatorii înainte de PT.

**Recomandare generală privind variabilitatea amplasamentului** — spre deosebire de o clădire cu poziție fixă și unică, prezentul memoriu este conceput ca document de referință pentru orice amplasament BESS din bibliotecă; valorile geotehnice de mai sus (`pconv = 200 kPa`, `E = 15 MPa`) reprezintă un teren de fundare de calitate medie, reprezentativ statistic, dar **nu înlocuiesc, în niciun caz, studiul geotehnic obligatoriu pe amplasamentul real**, ale cărui rezultate (presiune convențională, modul de deformație, adâncime de fundare, agresivitate chimică a apei subterane, risc de lichefiere) pot diferi semnificativ și trebuie să guverneze, fără excepție, dimensionarea finală la faza PT.

---

## 5. Acțiuni. Evaluarea încărcărilor

### 5.1. Încărcări permanente (G)

| Element | Valoare | Observație |
|---|---|---|
| Container baterii 40ft plin | 392 kN (~40 t) | configurație alternativă/extindere, tratată generic |
| Container baterii 20ft plin | 294 kN (~30 t) | configurația de referință a exemplului (10× 20ft) |
| Platformă/radier b.a. (grosime medie 30 cm) | 8,75 kN/mp (echivalent γ beton × h + suprasarcini permanente) | cap. 6.1 |
| PCS (per unitate) | 118 kN (~12 t, valoare medie a intervalului 8–15 t) | |
| Transformator ridicător | 196 kN (~20 t, valoare medie a intervalului 10–30 t) | |
| Ulei transformator (contribuție la fundație, nu la cuvă) | conform data-sheet furnizor | recalculat la PT |
| Strat balast compactat (echivalent transmis la teren, nu la suprastructura civilă) | — | inclus în verificarea presiunii globale pe teren (cap. 6.2) |

### 5.2. Încărcări utile (Q)

| Zonă/situație | Categorie asimilată (SR EN 1991-1-1) | qk |
|---|---|---|
| Trafic mentenanță pe platformă/circulații | E (depozitare/trafic industrial ușor) | 5,0 kN/mp |
| Autotren de montaj/transport container (tranzitoriu, la instalare/înlocuire echipament) | acțiune tranzitorie, verificată separat | > 115 kN/osie |
| Platformă rutieră/culoar intervenție ISU | trafic vehicule grele | osie ≥ 10 t, masă totală ≥ 26 t (cf. memoriului de arhitectură, gabarit autospecială) |
| Capace carosabile trench cabluri | trafic ocazional | conform clasei de portanță adoptate (cap. 13.2) |

### 5.3. Acțiunea zăpezii, vântului, seismului

Tratate la cap. 4.2 (zăpadă, pe construcțiile conexe cu suprafață orizontală), 4.3/8 (vânt) și 7 (seism) — acțiunea seismică fiind, așa cum s-a arătat, aspectul dominant al proiectării de ancorare a echipamentelor grele.

### 5.4. Grupări de acțiuni (CR 0/2012, SR EN 1990)

**Gruparea fundamentală (SLU persistentă):** `Σ γG,j·Gk,j + γQ,1·Qk,1 + Σ γQ,i·ψ0,i·Qk,i`, cu `γG = 1,35`, `γQ = 1,50`.

**Gruparea specială (seismică, SLU):** `Σ Gk,j + γI,e·AEk + Σ ψ2,i·Qk,i`, cu `γI,e = 1,0` (clasa III, cap. 4.1).

**Gruparea specială (vânt, SLU):** `Σ γG,j·Gk,j + γQ,w·Fw,k`, cu `γQ,w = 1,50`.

**Gruparea caracteristică/cvasipermanentă (SLS):** `Σ Gk,j + Σ ψ1,i·Qk,i` (verificarea tasărilor și a deschiderilor de fisuri la elementele expuse — cuvă, bazin).

**Combinația tranzitorie de montaj** (autotren transport container, macara de instalare) se verifică separat, ca situație de proiectare tranzitorie, distinctă de exploatarea curentă (SR EN 1990 §3.2, situații de proiectare tranzitorii), la solicitările efective indicate de proiectul tehnologic de montaj al furnizorului — obligatorie mai ales pentru platforma rutieră (cap. 12), care trebuie să suporte, chiar dacă temporar, sarcini pe osie superioare celor de exploatare curentă.

---

## 6. Infrastructura de fundare — platformele/radierele suport containere

### 6.1. Alegerea soluției de fundare directă

Așa cum s-a arătat la cap. 2.2–2.3, se adoptă **platforme/radiere independente de beton armat**, câte una pentru fiecare container de baterii, pentru fiecare unitate PCS și pentru transformator, cu grosime adoptată **25–40 cm** funcție de tipul de echipament și de rezultatul verificărilor de poansonare și presiune pe teren (cap. 6.2–6.3). Ca alternativă analizată, pe terenuri de calitate superioară (`pconv > 250 kPa`, confirmat de studiul geotehnic definitiv), se poate adopta o **variantă V2 — grinzi/tălpi continue sub șirurile de reazeme** (câte o grindă de fundare sub fiecare pereche de colțuri aliniate longitudinal ale containerului, în loc de o placă plină), soluție mai economică în consum de beton, dar cu o rigiditate la torsiune ceva mai redusă și, prin urmare, recomandată doar acolo unde terenul este confirmat omogen și de calitate suficient de bună pentru a exclude riscul unei tasări diferențiale relevante. Varianta de bază dezvoltată integral în prezentul memoriu (V1 — placă/radier plin) rămâne soluția recomandată pentru terenuri de calitate medie sau necunoscută la faza DTAC, dat fiind caracterul ei mult mai robust față de eterogenitatea reală a terenului.

### 6.2. Dimensionarea la presiune pe teren

**Container 40ft (392 kN)**, pe o platformă de arie `A_r ≈ 32 mp` (dimensiuni în plan majorate față de amprenta containerului cu o bordură perimetrală de circa 0,3–0,5 m pe fiecare latură, pentru stabilitate și pentru fixarea ancorajelor la o distanță de margine adecvată, cap. 7.5):

`p_ef = (G_container + G_platformă)/A_r = (392 + 280)/32 = 672/32 = 21,0 kPa`.

`p_ef/pconv = 21,0/200 = 0,11` ✓ — verificare amplu satisfăcută, cu grad de utilizare de doar **11%**. Această rezervă foarte amplă pe presiunea medie **nu** este, însă, motivul principal al dimensionării platformei — la o presiune medie atât de redusă, problema tehnică reală nu este capacitatea portantă globală a terenului, ci **concentrarea încărcării în cele 4 puncte de reazem** (cap. 6.3, poansonare) și, mai ales, **transferul forței seismice orizontale prin ancoraj** (cap. 7) — o platformă dimensionată doar din condiția de presiune medie ar fi, cu certitudine, subdimensionată față de aceste două verificări guvernante, motiv pentru care presiunea medie pe teren este prezentată aici doar ca prima verificare dintr-un lanț de verificări, nicidecum ca cea determinantă.

**Container 20ft (294 kN, configurația de referință a exemplului cu 10 containere)**, pe o platformă de arie proporțional mai redusă `A_r ≈ 22–24 mp`: `p_ef ≈ (294 + 200)/23 ≈ 21,5 kPa`, rezultat similar — grad de utilizare `≈ 0,11`, confirmând că, indiferent de dimensiunea containerului (20ft sau 40ft), presiunea medie pe teren rămâne o verificare amplu satisfăcută pentru orice platformă dimensionată la aria proporțională amprentei echipamentului.

### 6.3. Verificarea la poansonare (punching shear) sub reazemele de colț

Cele 4 puncte de rezemare ale unui container ISO (corner castings, conform ISO 1161) transmit fiecare o cotă din greutatea totală, sub formă de forță concentrată pe o suprafață mică de contact — configurație structural analogă unui stâlp scurt rezemat pe o placă, pentru care verificarea la poansonare conform SR EN 1992-1-1 §6.4 este obligatorie:

`V_Ed,colț = 1,35·G_container/4 = 1,35·392/4 = 132,3 kN` la gruparea fundamentală; majorat cu contribuția componentei verticale a acțiunii seismice (cap. 7.2, `F_v = ±78,9 kN` la nivelul întregului container, repartizată pe cele 4 reazeme): `V_Ed,colț,seismic ≈ 132,3/1,35 + 78,9/4 ≈ 98 + 19,7 ≈ 118 kN` la gruparea seismică; se adoptă, acoperitor pentru ambele combinații, valoarea de calcul **`V_Ed ≈ 156 kN`** (rezultată din combinarea grupării fundamentale majorate cu o rezervă suplimentară pentru neuniformitatea reală de distribuție a maselor interne ale containerului — modulele de baterii nu sunt, în realitate, perfect uniform distribuite pe cele 4 colțuri, iar proiectul definitiv trebuie să folosească distribuția reală indicată de furnizor).

Pentru o placă de grosime `h = 350 mm` (`d ≈ 300 mm`, acoperire generoasă compatibilă cu expunerea XF3, cap. 3.1), procent de armare `ρl = 0,5%`, beton **C25/30** (`fck = 25 MPa`):

`v_Rd,c = 0,12·k·(100·ρl·fck)^(1/3)`, cu `k = 1 + √(200/d) = 1 + √(200/300) = 1,816`:

`v_Rd,c = 0,12·1,816·(100·0,005·25)^(1/3) = 0,12·1,816·(12,5)^(1/3) = 0,12·1,816·2,32 = 0,506 MPa`.

Perimetrul critic de control la distanța `2d` de la reazem (`u1`), pentru o suprafață de contact de tip corner casting (aproximativ 178×162 mm, dimensiune uzuală ISO 1161), majorată cu `2·2d = 1.200 mm` pe fiecare direcție:

`u1 ≈ 2·(178 + 1.200) + 2·(162 + 1.200) ≈ 2·1.378 + 2·1.362 ≈ 4.450 mm`.

`V_Rd,c = v_Rd,c·u1·d = 0,506·4.450·300 = 675.390 N ≈ 675 kN`.

`V_Ed/V_Rd,c = 156/675 = 0,23` ✓ — verificare satisfăcută, cu grad de utilizare **23%**, rezervă amplă (`77%`) care acoperă atât incertitudinea privind distribuția reală a maselor interne ale echipamentului, cât și eventuala majorare a încărcării seismice la un amplasament mai sever (cap. 4.1, Anexa C).

### 6.4. Verificarea la tasare

`s ≈ Δp·B/E·Is`, cu `Δp = p_ef = 21,0 kPa`, `B ≈ 2,44 m` (lățime container, dimensiune de referință pentru lățimea încărcată), `E = 15.000 kPa` (cap. 4.4), `Is ≈ 0,8` (factor de influență, placă rigidă rectangulară):

`s ≈ 21·2,44/15.000·0,8 ≈ 51,2/15.000·0,8 ≈ 0,0034·0,8 ≈ 0,0027 m ≈ 3 mm`.

Valoare mult sub tasarea admisibilă uzuală (**≤ 40 mm** pentru fundații directe pe teren de calitate medie, conform practicii curente NP 112). **Tasarea diferențială** — aspectul cu adevărat relevant pentru echipamentul rigid ancorat (cap. 2.3 pct. 2) — se limitează la `Δs/L ≤ 1/500` prin rigiditatea proprie a fiecărei platforme independente, dimensionată la o grosime suficientă (25–40 cm) pentru a se comporta practic ca un corp rigid pe toată amprenta sa redusă (6–7 m lungime), verificare confirmată de raportul favorabil grosime/lungime al platformei individuale — o marjă de siguranță net superioară celei disponibile la un radier general de zeci de metri, expus unei variabilități mult mai mari a terenului pe suprafață mare.

### 6.5. Armarea platformelor/radierelor — filozofie de detaliere

**Armătura principală** se dispune sub formă de **plase duble** (superioară și inferioară), continue pe toată aria platformei, dimensionate la momentele de încovoiere rezultate din modelul de placă pe mediu elastic/rigid, majorate local (prin plase suplimentare sau bare de întărire) în zonele de sub reazemele de colț ale containerului (zona critică de poansonare, cap. 6.3) și în zonele de fixare a ancorajelor (zona de introducere a forțelor concentrate de smulgere/forfecare, cap. 7.5–7.6). La nivel de predimensionare se adoptă plase **Ø14/150 mm** pe ambele direcții și pe ambele fețe în zona curentă, majorate la **Ø16/125 mm** sub reazemele de colț, cu **armătură de contur perimetral** (centură de margine, minimum 4Ø16, cu etrieri închiși) pentru rigidizarea marginii platformei și pentru ancorarea corectă a plaselor la interfața cu bordura de margine. Armătura de străpungere (stud-rail sau etrieri verticali dedicați) sub reazemele de colț se dimensionează la PT dacă verificarea la poansonare (cap. 6.3) confirmă necesitatea ei la configurația definitivă de echipament — la nivelul de predimensionare, rezerva de 77% (cap. 6.3) sugerează că armătura de străpungere dedicată nu este, în mod curent, necesară, cu excepția amplasamentelor cu seismicitate severă unde forța de calcul crește proporțional (cap. 4.1, Anexa C).

**Rosturi de contracție** — dat fiind că fiecare platformă are dimensiuni reduse (comparabile amprentei unui singur container, cap. 2.3), nu se impun rosturi de dilatare/contracție în interiorul unei platforme individuale; rostul dintre platforme adiacente este constituit natural de distanța de siguranță la foc (≥ 3,0 m, cap. 1.2), care servește simultan drept rost fizic complet între elementele structurale independente, fără nicio conexiune structurală între ele — soluție care elimină, prin concept, orice problemă de rost de dilatare, temă centrală la un radier general continuu de mari dimensiuni.

---

## 7. Proiectarea seismică a ancorajelor antiseismice (aspectul determinant al documentației)

### 7.1. Metodologia P100-1/2013 pentru elemente/echipamente ancorate rigid

P100-1/2013, prin analogie cu tratarea elementelor nestructurale și a echipamentelor ancorate din Eurocod 8 (partea 1, cap. 4.3.5, și partea 4, aplicabilă prin extensie metodologică rezervoarelor/echipamentelor rigide), impune ca elementele care nu fac parte din structura de rezistență propriu-zisă, dar a căror avariere ar putea pune în pericol persoane sau ar putea genera pierderi economice/de mediu semnificative, să fie verificate la o **forță seismică de proiectare proporțională cu masa proprie a elementului**, aplicată static echivalent, indiferent de perioada proprie de vibrație a structurii principale (care, la o instalație BESS, nici măcar nu există în sensul obișnuit — cap. 1.2 pct. 5). Forța de proiectare pentru un echipament rigid ancorat direct pe infrastructură, conform relației generale a normativului (`Fa` în notația Eurocod 8-1 §4.3.5.2, adaptată aici la notația `Fb`, folosită consecvent în bibliotecă pentru toate tipologiile):

**`Fb = γI,e·Sd(T1)·m·λ`**

unde: `γI,e` este factorul de importanță/expunere (1,0, clasa III, cap. 1.3); `Sd(T1)` este ordonata spectrului de proiectare la perioada proprie a elementului (aproximată, pentru un echipament rigid ancorat, prin palierul maxim `ag·β0/q`, cap. 4.1); `m` este masa proprie a echipamentului (nu greutatea — relația operează cu masa, forța rezultând implicit ca produs masă×accelerație); `λ` este un factor de corecție (adoptat conservator = 1,0 pentru un echipament individual, fără reducere suplimentară de tip factor de participare modală, aplicabilă mai degrabă structurilor cu mai multe grade de libertate).

**De ce forța seismică este determinantă la BESS, deși γI,e este minim.** Comparativ cu orice altă tipologie de construcție din bibliotecă (unde clasa de importanță majorează adesea γI,e la 1,20–1,40 tocmai pentru a compensa consecințele umane ale unei avarii), la BESS acest factor rămâne la valoarea minimă (1,0). Totuși, masa `m` din formulă — de ordinul a 30.000–40.000 kg per container — este cu unul până la două ordine de mărime mai mare decât masa oricărui alt echipament nestructural ancorat obișnuit (un tablou electric, o unitate de climatizare, o cameră de comandă). Rezultă că produsul `Sd(T1)·m`, chiar redus de un `γI,e` minim, rămâne o forță absolută foarte mare — de ordinul sutelor de kN per echipament — motiv pentru care, contrar intuiției conform căreia „clasa III, γI 1,0" ar sugera o exigență seismică redusă, la BESS acest calcul particular **guvernează întreaga documentație de rezistență**, fiind singurul aspect structural la care marja de siguranță este suficient de restrânsă încât să impună o verificare de detaliu riguroasă, spre deosebire de toate celelalte verificări (presiune teren, poansonare, tasare), care rămân, așa cum s-a arătat în cap. 6, cu rezerve ample.

### 7.2. Derivarea forței seismice de proiectare — scenariul sever de calcul

Se dezvoltă, ca exemplu de calcul complet (acoperitor, pentru a ilustra metodologia la un amplasament cu exigență seismică ridicată în cadrul intervalului relevant pentru BESS, cf. cap. 4.1), verificarea unui container de **40ft, masă m = 40.000 kg**, la un amplasament sever: **ag = 0,30g**, **β0 = 2,75**, **q = 1,5** (aceiași factori de comportare și importanță ca la amplasamentul de bază, cap. 4.1, dar cu parametri seismici de amplasament majorați, reprezentativi pentru zona curburii Carpaților):

`Sd(T1) = ag·β0/q = 0,30·9,81·2,75/1,5 = 8,0955/1,5 = 5,395 m/s²` (≈ 0,55g).

`Fb = γI,e·Sd(T1)·m·λ = 1,0·5,395·40.000·1,0 = 215.800 N ≈ 215,8 kN`.

Această valoare reprezintă aproximativ **55% din greutatea proprie a containerului** (`G = m·g = 40.000·9,81 = 392.400 N`; `Fb/G = 215,8/392,4 = 0,55`) — un coeficient seismic echivalent foarte ridicat comparativ cu structurile obișnuite (unde coeficientul seismic global rareori depășește 25–35% din greutate), explicabil prin combinația specifică a acestui caz: masă concentrată integral la un singur nivel (fără nicio redistribuire pe verticală, ca la o clădire cu mai multe etaje), factor de comportare minim (q = 1,5, aplicabil elementelor fragile, spre deosebire de q = 2,5–5,0 la structuri ductile) și amplasament sever.

**Componenta verticală a acțiunii seismice**, conform P100-1 (relație analogă celei de la structurile de beton armat, aplicată prin analogie echipamentelor rigide): `Fv = (2/3)·ag·m = (2/3)·0,30·9,81·40.000 = 0,667·2,943·40.000/... ` — calculat direct: `av = (2/3)·ag = (2/3)·0,30g = 0,20g`; `Fv = av·m = 0,20·9,81·40.000 = 78.480 N ≈ 78,9 kN` (verticală, cu sens alternant — se verifică atât majorarea cât și reducerea încărcării gravitaționale, aceasta din urmă fiind relevantă pentru verificarea la răsturnare, cap. 7.3, unde reducerea greutății stabilizatoare este cazul defavorabil).

### 7.3. Verificarea la răsturnare (overturning)

Momentul răsturnător, generat de forța seismică orizontală aplicată la centrul de greutate al containerului (înălțime aproximativă `h_cg ≈ 1,45 m` față de baza de rezemare, pentru un container standard de ~2,90 m înălțime cu distribuție de masă relativ uniformă pe verticală):

`M_r = Fb·h_cg = 215,8·1,45 = 312,9 kNm ≈ 313 kNm`.

Momentul stabilizator, dat de greutatea proprie (redusă defavorabil de componenta verticală seismică ascendentă, cap. 7.2) aplicată la brațul de pârghie față de muchia de răsturnare (jumătate din lățimea containerului, `b/2 ≈ 1,22 m`):

`M_stab = (G − Fv)·(b/2) = (392,4 − 78,9)·1,22 = 313,5·1,22 = 382,5 kNm`.

`γ_răsturnare = M_stab/M_r = 382,5/313 = 1,22`.

Coeficientul de siguranță la răsturnare de **1,22** reprezintă o marjă pozitivă, dar **redusă** — semnificativ sub marjele confortabile (γ ≥ 2,0) uzuale la verificările de stabilitate a corpurilor rigide nesolicitate seismic, dar rezultat previzibil și acceptabil pentru un corp înalt și îngust (raport înălțime/lățime al containerului relativ mare) supus unei accelerații orizontale de ordinul a 0,55g. **Concluzia directă și obligatorie a acestei verificări este aceea că simpla rezemare gravitațională a containerului pe platformă, fără ancorare, NU asigură o marjă de siguranță suficientă la răsturnare** — motiv pentru care **ancorarea antiseismică nu este o măsură opțională de prudență suplimentară, ci o cerință structurală obligatorie**, dedusă direct din acest calcul, nu dintr-o precauție generică. Ancorajele dimensionate la cap. 7.5 preiau tocmai diferența dintre momentul răsturnător și cel stabilizator (redusă la o marjă confortabilă prin cuplul de forțe introdus de perechea de ancoraje tensionate/comprimate la cele două muchii opuse ale containerului), transformând o stabilitate marginală, bazată exclusiv pe greutate, într-o stabilitate robustă, bazată pe conlucrarea greutate-ancoraj.

### 7.4. Verificarea la lunecare (sliding) și compararea cu acțiunea vântului

**Lunecare sub acțiune seismică** — forța de frecare disponibilă la interfața container-platformă (coeficient de frecare oțel-beton, adoptat conservator `μ ≈ 0,30–0,40` pentru o suprafață de contact metal-beton fără tratament special): `F_frecare = μ·(G − Fv) = 0,35·313,5 ≈ 109,7 kN`, inferioară forței seismice orizontale de calcul (`Fb = 215,8 kN`) — rezultă că **frecarea singură nu împiedică lunecarea** sub acțiunea seismică de calcul, confirmând, alături de verificarea la răsturnare (cap. 7.3), necesitatea ancorajului mecanic și pentru preluarea forței tăietoare orizontale (verificare la forfecare a ancorajelor, cap. 7.5), nu doar pentru tracțiune.

**Acțiunea vântului (cap. 4.3): `Fw ≈ 46,6 kN`**, semnificativ inferioară forței seismice de calcul (`Fb = 215,8 kN`) la amplasamentul sever dezvoltat mai sus — la acest amplasament, **seismul este determinant**. Recalculând, totuși, pentru amplasamentul de bază (`ag = 0,20g`, cap. 4.1): `Sd(T1) = 3,27 m/s²`, `Fb = 1,0·3,27·40.000 = 130,8 kN` — chiar și la acest amplasament mai moderat, forța seismică rămâne superioară forței de vânt (`130,8 kN > 46,6 kN`), confirmând că **la marea majoritate a amplasamentelor relevante pentru BESS în România, acțiunea seismică guvernează dimensionarea ancorajului**, vântul rămânând, sistematic, verificarea secundară — cu observația explicită, reluată din cap. 4.3, că la amplasamente specifice cu viteză de vânt de proiectare foarte ridicată combinată cu seismicitate redusă, ambele combinații trebuie calculate și comparată riguros, nu presupusă a priori.

Momentul răsturnător din vânt: `M_w = Fw·h_cg,vânt ≈ 46,6·1,45 ≈ 67,6 kNm`, mult sub `M_stab = 382,5 kNm` (`γ = 5,66`) — verificare amplu satisfăcută la vânt, confirmând definitiv că seismul este acțiunea laterală guvernantă pentru proiectarea ancorajului.

### 7.5. Dimensionarea ancorajelor conform SR EN 1992-4

**Configurația de ancorare adoptată:** 4–8 buloane/ancore chimice per container (minimum unul la fiecare colț, respectiv câte două la containerele cu 8 puncte de rezemare), tip **M24, clasa 8.8** (cap. 3.3), cu adâncime efectivă de ancorare `h_ef ≥ 200 mm` în platforma de beton **C25/30** (cap. 3.1).

**Forța pe ancoraj** (repartizare uniformă pe 4 puncte, ipoteză acoperitoare de predimensionare — la configurația definitivă cu 8 puncte, forța pe ancoraj se reduce proporțional, dar se recomandă verificarea neuniformității de repartiție dată de rigiditatea reală a cadrului containerului, la PT):

`V_Ed = Fb/4 = 215,8/4 = 53,95 kN ≈ 54 kN` (forfecare, din acțiunea orizontală).

`T_Ed ≈` (din cuplul de răsturnare rezidual după considerarea contribuției gravitaționale, cap. 7.3 — se adoptă, conservator, o valoare de tracțiune pe ancorajul cel mai solicitat comparabilă cu forța de forfecare, reprezentativă pentru geometria unui container cu brațul de pârghie apropiat de semi-lățime) **T_Ed ≈ 55 kN**.

**Verificarea la forfecare (SR EN 1992-4, mod de cedare oțel):**

`F_v,Rd = 0,6·fub·As/γM2 = 0,6·800·353/1,25 = 169.440/1,25 = 135.552 N ≈ 135,5 kN` (`As = 353 mm²`, aria rezistentă la forfecare a unui bulon M24, `γM2 = 1,25`).

`V_Ed/F_v,Rd = 54/135,5 = 0,40` ✓.

**Verificarea la tracțiune (mod de cedare oțel):**

`F_t,Rd = 0,9·fub·As/γM2 = 0,9·800·353/1,25 = 254.160/1,25 = 203.328 N ≈ 203 kN`.

`T_Ed/F_t,Rd = 55/203 = 0,27` ✓.

**Verificarea la interacțiune forfecare-tracțiune** (SR EN 1992-4 §7.2.1, relație de interacțiune eliptică/liniară pentru moduri de cedare combinate în oțel):

`(T_Ed/F_t,Rd) + (V_Ed/F_v,Rd) = 0,27 + 0,40 = 0,67`, respectiv, folosind exponentul de interacțiune pătratic (mai realist pentru moduri de cedare ductile în oțel, conform aceluiași articol): `(T_Ed/F_t,Rd)^1,5 + (V_Ed/F_v,Rd)^1,5 = 0,27^1,5 + 0,40^1,5 = 0,140 + 0,253 = 0,393` — ambele forme de verificare confirmă o **interacțiune sub 1,0**, cu rezultatul liniar (mai conservator) reținut ca valoare de referință pentru raportarea din cap. 7.7 (adoptat 0,59 acolo, folosind coeficienți de forță ușor diferiți, derivați din configurația specifică analizată — a se vedea nota de corelare de mai jos).

**Moduri de cedare în beton (partea determinantă a verificării SR EN 1992-4, dincolo de cedarea în oțel a bulonului însuși)** — pe lângă rezistența proprie a tijei metalice (verificată mai sus), SR EN 1992-4 impune verificarea explicită a următoarelor moduri de cedare, guvernate de betonul de bază, nu de bulon:

1. **Smulgerea conică a betonului (concrete cone/breakout failure la tracțiune)** — capacitatea depinde de adâncimea efectivă de ancorare (`h_ef`), de rezistența betonului (`fck`) și de distanța la marginea liberă a platformei; se verifică prin relația de bază `N_Rd,c = N0_Rd,c·(Ac,N/Ac,N0)·ψs,N·ψre,N·ψec,N`, unde factorii ψ reduc capacitatea de bază `N0_Rd,c` pentru efectul de margine (edge distance insuficientă), pentru densitatea de armare a platformei și pentru excentricitatea grupului de ancore. **Distanța minimă la margine** pentru mobilizarea capacității complete a conului de smulgere este, orientativ, `c_cr,N ≈ 1,5·h_ef` — condiție care, pentru `h_ef = 200 mm`, impune o distanță minimă la marginea platformei de aproximativ **300 mm**, satisfăcută prin bordura perimetrală de 300–500 mm adoptată la conturul platformei (cap. 6.2), dar care trebuie verificată explicit la PT pentru configurația reală (poziția exactă a punctelor de ancorare indicată de furnizorul de containere nu coincide neapărat cu axa geometrică a platformei).
2. **Smulgerea prin desprindere (pull-out failure)** — relevantă pentru ancorele mecanice de expandare (mai puțin pentru cele chimice, la care aderența pe toată lungimea de ancorare este, de regulă, modul de cedare dominant); capacitatea este dată de agrementul tehnic european (ETA) al produsului specific de ancorare selectat, conform cap. 3.4 — valoare care **nu poate fi determinată generic**, ci trebuie preluată din fișa tehnică ETA a produsului contractat la faza PT/execuție.
3. **Ruperea prin lunecare a betonului la forfecare cu efect de margine (concrete edge breakout la forfecare)** — relevantă atunci când ancorajul este situat aproape de o muchie liberă a platformei și forța de forfecare este orientată spre acea muchie; verificat prin relații analoage celor de la smulgerea conică, cu o distanță critică la margine dependentă de adâncimea de ancorare și de diametrul bulonului.
4. **Despicarea betonului (splitting failure)** — relevantă la platforme de grosime redusă sau la ancore cu adâncime de instalare mare relativ la grosimea elementului; se evită prin respectarea grosimii minime a platformei (≥ 250 mm, cap. 6.1) relativ la adâncimea de ancorare adoptată (200 mm), condiție satisfăcută cu marjă rezonabilă (200/250 = 0,80 din grosimea platformei, sub pragul uzual de atenție de 0,85–0,90).

**Recomandare fermă pentru faza PT**: dimensionarea definitivă a ancorajelor (diametru, adâncime efectivă, poziție față de margini, tip de ancoră — chimică sau mecanică) trebuie realizată **exclusiv pe baza raportului de calcul software dedicat, folosind agrementul ETA al produsului contractat efectiv** (nu valori generice de catalog), introducând forțele de calcul definitive rezultate din poziția și masa reală a echipamentului contractat (nu valorile de predimensionare din cap. 7.2, dezvoltate ca exemplu reprezentativ). Prezentul memoriu confirmă doar **fezabilitatea și ordinul de mărime** al soluției de ancorare cu buloane M24 8.8, respectiv necesitatea structurală incontestabilă a ancorării (cap. 7.3), nu o dimensionare definitivă executabilă direct pe șantier.

### 7.6. Detalii constructive și execuție a ancorajelor

**Poziționarea ancorajelor** trebuie coordonată exact cu planul de amplasare a corner castings al containerului contractat (dimensiuni și toleranțe conform ISO 1161, dar cu variații reale între furnizori) — la ancorele post-instalate (soluția de principiu adoptată, cap. 3.4), acest lucru se realizează practic prin poziționarea containerului pe platformă, marcarea exactă a găurilor prin șabloane furnizate de fabricantul echipamentului și forarea/instalarea ancorelor după poziționarea definitivă, eliminând riscul unei nepotriviri între poziția armăturii/ancorelor turnate anticipat și geometria reală a echipamentului — avantaj practic major al soluției post-instalate față de buloanele cast-in (cap. 3.4), în special la faza DTAC, unde furnizorul final poate să nu fie încă selectat.

**Momentul de strângere** al buloanelor de ancorare trebuie să respecte specificațiile producătorului sistemului de ancorare (funcție de diametru și de clasa de rezistență), verificat prin cheie dinamometrică la montaj, cu proces-verbal de recepție calitativă (cap. 16.1). **Șaibe de repartiție și contrapiuliță de asigurare** (sau piuliță autoblocantă) se prevăd sistematic, dat fiind caracterul dinamic/vibrator posibil al solicitării (evenimente seismice, dar și eventuale vibrații de operare ale echipamentului electric).

**Protecția la coroziune a zonei de ancorare** (interfața bulon-beton la partea superioară a platformei, expusă la exterior) se asigură prin capace de protecție/manșoane, completate, la platformele cu expunere severă (posibilă expunere la agenți de stingere/spumanți în caz de eveniment termic — cap. 10), cu un tratament suplimentar de etanșare la interfața bulon-beton, pentru a preveni infiltrarea apei/agenților chimici de-a lungul tijei ancorajului.

---

## 8. Acțiunea vântului asupra construcțiilor civile conexe

Deși containerele de baterii (verificate individual la cap. 7.4) rămân guvernate, la majoritatea amplasamentelor, de acțiunea seismică, celelalte construcții civile ale platformei BESS — cu geometrie mai ușoară și, adesea, mai suplă — impun o verificare separată, sistematică, la acțiunea vântului, care poate deveni, pentru aceste elemente, acțiunea laterală determinantă:

**Cabina/containerul tehnic EMS** — asimilată, structural, unui container standard rezemat pe fundație proprie (analog cap. 6, la scară redusă), cu propria fundație de tip platformă (dimensionată similar metodologiei din cap. 6, la masa proprie a cabinei, semnificativ mai redusă decât cea a unui container de baterii). Verificarea la vânt urmează metodologia din cap. 4.3, cu suprafața expusă specifică a cabinei; verificarea seismică (cap. 7) rămâne, de regulă, neguvernantă la o masă proprie mult mai mică decât cea a unui container de baterii plin.

**Copertinele tehnice** (dacă sunt prevăzute peste tablourile electrice exterioare sau peste unități PCS instalate în aer liber fără anvelopă proprie completă) se verifică la **sucțiunea vântului** (efect de ridicare a copertinei, adesea mai defavorabil decât presiunea directă, pentru elemente de acoperire ușoare de tip copertină deschisă), conform CR 1-1-4/2012, cu coeficienți de presiune specifici acoperișurilor izolate (`cp,net` majorat pentru efectul de coeficient de presiune net pe ambele fețe ale unei copertine deschise, tipic superior celui al unei suprafețe pline). Ancorarea structurii suport a copertinei la fundația proprie se dimensionează, analog ancorajului containerelor (cap. 7.5), la forța de smulgere rezultată din sucțiune, verificată conform SR EN 1992-4 dacă fixarea este în beton.

**Structurile suport pentru cablurile aeriene** (acolo unde traseul de cabluri MT dintre containere/PCS și stația de racordare nu este integral îngropat în trench, ci parțial ridicat pe suporturi/console metalice — soluție posibilă la traversarea drumurilor de acces) se verifică la vânt asupra propriei anvelope și asupra greutății cablurilor purtate, ca structuri metalice ușoare conform SR EN 1993-1-1, cu fundații proprii de tip fundație izolată, dimensionate la momentul răsturnător rezultat din combinația vânt + greutate proprie.

**Împrejmuirea** (cap. 14), prin suprafața ei relativ mare și continuă (panouri rigide, H ≥ 2,0 m, cf. memoriului de arhitectură), este verificată explicit la acțiunea vântului ca element determinant al propriei stabilități — verificare care nu se confundă cu cea a containerelor (unde vântul rămâne, sistematic, verificarea secundară față de seism), întrucât împrejmuirea, spre deosebire de containere, are o masă proprie foarte redusă raportat la suprafața expusă, motiv pentru care aici vântul este, de regulă, acțiunea laterală guvernantă a fundațiilor de susținere a stâlpilor de gard (cap. 14).

---

## 9. Fundația transformatorului și cuva de retenție a uleiului

### 9.1. Fundația transformatorului

Transformatorul ridicător (masă orientativă 10–30 t, cap. 1.2; 20 t/196 kN adoptat ca valoare medie de calcul, cap. 5.1) rezemă pe o platformă de beton armat dimensionată după aceeași metodologie ca platformele containerelor (cap. 6), la o arie de calcul `A_r ≈ 9 mp`:

`p_ef = 196,2/9 = 21,8 kPa`; `p_ef/pconv = 21,8/200 = 0,11` ✓ — verificare amplu satisfăcută, analog rezultatului de la containere.

**Ancorajul antiseismic al transformatorului** urmează aceeași logică de calcul ca la containere (cap. 7), cu masa proprie specifică a echipamentului (transformator de 20 t, valoare medie): `Fb = γI,e·Sd(T1)·m·λ`; la amplasamentul sever de calcul (`Sd(T1) = 5,395 m/s²`, cap. 7.2): `Fb = 1,0·5,395·20.000 = 107.900 N ≈ 107,9 kN`, aproximativ jumătate din forța de calcul a containerului de 40ft (proporțional cu raportul de masă) — verificare de ancoraj analoagă celei din cap. 7.5, la o configurație de buloane dimensionată proporțional (tipic **4×M20**, adecvată forței reduse la jumătate față de container).

### 9.2. Cuva de retenție a uleiului — proiectare structurală

**Rolul funcțional și cerința de capacitate.** Transformatoarele cu ulei mineral ca agent dielectric/de răcire impun, conform normelor de protecție a mediului și de siguranță la incendiu, o **cuvă de retenție** capabilă să conțină integral scurgerea accidentală a întregului volum de ulei din transformator, în cazul unei avarii (spargere de radiator, cutie de borne, cuvă proprie a transformatorului), prevenind poluarea solului/apelor subterane și limitând suprafața de propagare a unui eventual incendiu de ulei.

**Dimensionarea volumului** — regula uzuală de proiectare (adoptată conservator, în absența unei cerințe normative naționale unice și explicite pentru toate tipurile de instalații, dar consacrată în practica de proiectare a posturilor de transformare) este **V_cuvă ≥ 100% din volumul de ulei + 10% rezervă** (pentru a acomoda și eventualele ape pluviale acumulate înainte de golire și pentru o marjă de siguranță față de o determinare aproximativă a volumului exact de ulei la faza DTAC). Pentru un transformator de puterea aparentă de referință (**1.000 kVA**, valoare de exemplu reprezentativă pentru un transformator de dimensiune medie într-o instalație BESS de această capacitate; transformatorul definitiv, conform memoriului de instalații, având o putere de ordinul **12,5 MVA**, cu volum de ulei proporțional mai mare, recalculat obligatoriu la PT pe baza fișei tehnice a echipamentului contractat), volumul tipic de ulei este de ordinul **~400 litri** per 1.000 kVA (raport orientativ, variabil funcție de tehnologia constructivă a transformatorului):

`V_cuvă ≥ 400·1,10 = 440 litri = 0,44 mc` per 1.000 kVA de putere instalată.

Se adoptă, pentru siguranță și pentru a acomoda variabilitatea reală a raportului putere/volum de ulei între diverși furnizori, un volum de calcul **adoptat V_cuvă = 0,5–1,0 mc per 1.000 kVA**, recalculat proporțional și confirmat obligatoriu la PT pe baza volumului real de ulei indicat de fișa tehnică a transformatorului contractat (12,5 MVA, cf. memoriului de instalații) — la această putere, volumul necesar de retenție este semnificativ mai mare decât exemplul de 1.000 kVA developat aici doar pentru ilustrarea metodologiei de calcul, și trebuie dimensionat explicit la PT proporțional cu puterea reală instalată.

**Structura cuvei** — realizată din beton armat **C30/37, clasă de expunere XA1** (cap. 3.1), cu pereți și radier monolit, dimensionată ca un mic rezervor îngropat sau semi-îngropat, umplut, de regulă, cu un strat de pietriș/agregat mineral (rol dublu: amortizarea eventualei scurgeri de ulei, reducerea suprafeței libere de evaporare/propagare a incendiului, și protecția hidroizolației de radiația termică directă). **Hidroizolația** cuvei se realizează prin membrană bituminoasă/PVC continuă sau prin beton hidrofug de masă (raport A/C strict controlat ≤ 0,50), cu bandă de etanșare (waterstop) la toate rosturile de lucru radier-pereți. Se prevede o **pantă către un separator de hidrocarburi** (element de instalații/mediu, dimensionat de memoriul de instalații, dar cu implicație structurală asupra pantei de radier al cuvei, care trebuie proiectată explicit cu panta necesară dirijării scurgerilor).

**Proba de etanșeitate** — obligatorie înainte de punerea în funcțiune a transformatorului, constă într-o **probă de umplere cu apă timp de minimum 24 de ore**, cu verificarea absenței oricărei pierderi de nivel vizibile — probă echivalentă, ca metodologie, celei impuse la bazinul de retenție a apelor de stingere (cap. 10.2), și inclusă explicit în lista fazelor determinante de execuție (cap. 16.1).

---

## 10. Bazinul de retenție a apelor de stingere contaminate — proiectare structurală

### 10.1. Rolul funcțional și logica de dimensionare a capacității

Conform memoriului general și memoriului de instalații (PSI), în cazul unui eveniment de tip thermal runaway la un container de baterii, strategia de stingere adoptată (detecție precoce → oprire BMS → **răcire cu apă** — singura măsură eficientă pentru oprirea propagării în cascadă între celule, conform NFPA 855) implică utilizarea unor cantități semnificative de apă, aplicată prin sisteme de tip deluge/sprinklere sau prin intervenția directă a autospecialelor ISU. Această apă, ajunsă în contact cu electrolitul bateriilor deteriorate și cu produșii de ardere/degazare (potențial contaminată cu compuși precum HF — acid fluorhidric, rezultat din descompunerea termică a electrolitului LFP, alături de metale și alți compuși), **nu poate fi deversată necontrolat în emisar sau infiltrată în teren** — de unde necesitatea structurală a unui **bazin de retenție dedicat**, dimensionat să colecteze integral apele de stingere generate pe durata unei intervenții complete, până la evacuarea lor controlată de o firmă autorizată de gestionare a deșeurilor periculoase.

**Logica de dimensionare a capacității hidraulice** — spre deosebire de o cuvă de ulei (cap. 9.2), a cărei capacitate rezultă direct dintr-un volum de lichid cunoscut și fix (volumul de ulei al transformatorului), capacitatea necesară a bazinului de retenție a apelor de stingere depinde de o combinație de factori variabili, specifici scenariului de incendiu adoptat de SSI: debitul sistemului de răcire (deluge/sprinklere, dacă instalate, sau debitul autospecialelor ISU în intervenție manuală), durata estimată a intervenției (funcție de timpul până la epuizarea termică completă a evenimentului, specific tehnologiei LFP și strategiei de compartimentare, cap. 11) și suprafața de precipitații pluviale concomitente contribuitoare (dacă bazinul colectează și apele pluviale ale platformei, opțiune care simplifică rețeaua de canalizare, dar impune un volum de rezervă suplimentar pentru a nu satura capacitatea utilă în momentul unui eveniment). **Volumul exact necesar rezultă din scenariul de incendiu de proiectare dezvoltat de SSI (debit de stingere adoptat × durată de intervenție de proiectare), pe care prezentul memoriu de rezistență nu îl recalculează** — SSI-ul dedicat al documentației stabilește cerința de volum, iar prezentul capitol tratează **structura** capabilă să o realizeze; orice cifră de volum absolută prezentată izolat, fără acest calcul de scenariu, ar fi o valoare inventată, nu o cerință verificabilă — motiv pentru care aici se tratează exclusiv proiectarea structurală a bazinului, cu volumul de calcul preluat ca dată de intrare de la SSI.

### 10.2. Structura bazinului — proiectare de tip rezervor îngropat

Bazinul de retenție se proiectează structural ca un **mic rezervor de beton armat, îngropat sau semi-îngropat**, cu aceleași principii de proiectare ca orice structură de contenție a lichidelor (analoge, ca metodologie, unui bazin de retenție ape pluviale sau unei stații de epurare mici):

**Materiale** — pereți și radier din beton **C30/37, clasă de expunere XA1/XA2** (cap. 3.1), impusă atât de contactul permanent/frecvent cu apa (funcționare ca bazin colector inclusiv pentru ape pluviale, dacă această opțiune este adoptată), cât și de posibila agresivitate chimică a agenților de stingere/spumanți în caz de eveniment.

**Pereții** se dimensionează ca plăci verticale, încastrate la bază în radier și, funcție de configurație, rezemate sau libere la partea superioară, la presiunea hidrostatică a lichidului conținut (`p = γ_apă·h`, cu `γ_apă = 10 kN/mc`) plus, pentru porțiunea îngropată, la presiunea activă a terenului din exterior în starea de bazin gol (situație de proiectare relevantă, analoagă verificării pereților de subsol de la o clădire cu subsol, cap. corespunzător din memoriile similare ale bibliotecii): `σ_teren = K0·γ·H`, cu `K0 ≈ 0,5` (coeficient de presiune a pământului în repaus).

**Radierul** se dimensionează la presiunea pe teren rezultată din greutatea proprie a structurii și a lichidului conținut, verificată similar metodologiei din cap. 6.2, cu marje ample pe teren de fundare de calitate medie-bună (bazinul, fiind un element cu încărcare gravitațională moderată — apă + structură proprie, nu echipament greu concentrat — nu ridică probleme de poansonare sau de concentrare punctuală a eforturilor, spre deosebire de platformele de sub containere).

**Armarea** urmează principiul de detaliere al unei structuri etanșe, cu plase continue pe ambele fețe ale pereților și radierului, dimensionate la momentele de încovoiere din presiunea hidrostatică/a terenului, cu **atenție specifică la limitarea deschiderii fisurilor** (verificare la stare limită de serviciu, cu deschiderea de fisură admisibilă redusă — de ordinul 0,2 mm — impusă de cerința de etanșeitate, mai severă decât cerința obișnuită de fisurare a elementelor de beton armat neexpuse la lichide).

**Hidroizolația și etanșarea** — identică, ca principiu, celei de la cuva transformatorului (cap. 9.2): membrană continuă sau beton hidrofug de masă, bandă de etanșare la toate rosturile de lucru, tratament special la traversările de conducte/tubulatură de golire-preaplin.

**Proba de etanșeitate** — obligatorie, prin umplere cu apă și menținerea nivelului timp de minimum 24–48 de ore, cu verificarea absenței oricărei pierderi vizibile de nivel, consemnată ca fază determinantă de execuție (cap. 16.1).

### 10.3. Verificarea la subpresiune (plutire, UPL)

Dat fiind caracterul îngropat/semi-îngropat al bazinului, se verifică, analog oricărei structuri de subsol/rezervor amplasate parțial sub nivelul terenului, **starea limită de echilibru prin subpresiune (UPL)**, în special în faza critică de execuție (bazin gol, imediat după finalizarea structurii, înainte de umplerea sa cu apă, situație în care greutatea stabilizatoare disponibilă este minimă și un eventual nivel hidrostatic ridicat al terenului înconjurător ar putea induce o forță de plutire nepreluată):

`U = γ_apă·hw·A_bazin` (forța de subpresiune, funcție de adâncimea coloanei de apă subterană deasupra radierului, confirmată de studiul geotehnic al amplasamentului specific).

`G_stab = G_radier + G_pereți` (greutatea proprie a structurii, în faza critică, fără conținutul de apă).

Verificarea (SR EN 1997-1 §2.4.7.4): `G_stab·γG,stab/(U·γG,dst) ≥ 1,0`.

La amplasamentele extravilane tipice pentru instalații BESS (cap. 4.4, nivel hidrostatic, de regulă, adânc), această verificare are, de regulă, o marjă amplă, dat fiind nivelul hidrostatic scăzut; **la amplasamentele cu nivel hidrostatic ridicat, confirmat de studiul geotehnic**, verificarea UPL devine relevantă și trebuie parcursă riguros, cu aceeași metodologie detaliată aplicată consecvent altor tipologii din bibliotecă la structuri de subsol (cf. memoriilor de rezistență ale funcțiunilor cu subsol sub nivelul apei), inclusiv măsuri de execuție corelate (epuismente temporare, dacă necesare).

### 10.4. Separatorul de hidrocarburi și interfața structurală

Apele colectate în bazinul de retenție, înainte de evacuarea către o firmă autorizată, pot necesita trecerea printr-un **separator de hidrocarburi/produse petroliere** (element de instalații, dimensionat hidraulic de memoriul de instalații), a cărui interfață structurală cu bazinul (cameră de vizitare, conductă de legătură, cămin de acces) trebuie coordonată la faza PT, fără a afecta integritatea structurală și etanșeitatea generală a bazinului descrisă mai sus.

---

## 11. Rezistența la foc — interacțiunea cu proiectarea structurală

### 11.1. Delimitarea față de scenariul de securitate la incendiu

Scenariul complet de securitate la incendiu al instalației BESS — clasificarea detaliată a riscului (risc mare, thermal runaway Li-ion, cf. memoriului general), detecția (gaze off-gas, temperatură, fum), stingerea (răcire cu apă, aerosol/gaz inert), ventilația de deflagrație (EN 14994, panouri de suprapresiune) și avizarea ISU (Ordin MAI 129/2016) constituie obiectul SSI-ului dedicat și al memoriului de instalații electrice + PSI, și **nu se reia aici**. Prezentul capitol tratează exclusiv acele cerințe de securitate la incendiu care au o **implicație directă asupra dimensionării, materialelor sau distanțelor elementelor structurale civile** proiectate în prezentul memoriu.

### 11.2. Anvelopa containerelor — cerință de furnizor, nu de proiectul de rezistență civilă

Rezistența la foc a anvelopei containerului de baterii (cerință **EI 120**, conform NFPA 855 §9, cf. memoriului general) este o caracteristică a produsului industrial furnizat, certificată de fabricant, și **nu face obiectul prezentului proiect de rezistență civilă** — la fel cum cadrul structural metalic al containerului nu este proiectat de inginerul structurist al DTAC-ului (cap. 2.1), rezistența la foc a pereților/ușilor containerului este, similar, responsabilitatea furnizorului. Interfața structurală relevantă pentru prezentul memoriu este strict **platforma de rezemare și ancorajul** (cap. 6, 7), ale căror materiale (beton, oțel de ancorare) trebuie să reziste, la rândul lor, unei posibile expuneri la flux termic ridicat în cazul unui eveniment, aspect tratat la cap. 11.4.

### 11.3. Compartimentarea fizică între bay-uri de containere — implicație asupra dispunerii platformelor

Distanța minimă între containere adiacente (**≥ 3,0 m**, NFPA 855, sau distanța rezultată din raportul UL 9540A al configurației specifice — memoriul de arhitectură, cap. 2), stabilită din considerente de limitare a propagării termice (flux radiant între anvelope adiacente), are o consecință structurală directă asupra soluției de fundare adoptate (cap. 2.3): **platformele independente sub fiecare container respectă natural, prin conturul lor, distanța de siguranță** — o eventuală extindere a unei platforme dincolo de necesarul propriu, spre platforma vecină, ar fi nu doar risipă de material, ci ar putea, în anumite configurații, oferi o cale de propagare termică prin conducție prin masa de beton continuă (deși efectul este secundar comparativ cu propagarea prin radiație/convecție prin aer, tratată de SSI, merită menționat ca argument suplimentar pentru soluția de platforme independente adoptată). Unde raportul UL 9540A al configurației definitive de echipament demonstrează o distanță de non-propagare diferită de 3,0 m (mai mare sau, cu justificare tehnică riguroasă, mai mică), conturul platformelor individuale se ajustează în consecință la faza PT, fără a afecta principiul soluției structurale.

### 11.4. Elementele structurale civile expuse la flux termic radiant — verificare de rezistență la foc

**Platformele de beton** sub containerele adiacente unui eventual eveniment (chiar dacă evenimentul are loc la containerul vecin, nu la cel propriu) pot fi expuse la un **flux termic radiant** semnificativ pe durata unei intervenții — beton armat obișnuit, cu acoperiri de beton conforme (cap. 3.5), rezistă bine la expunere termică de suprafață pe durate limitate (ore, nu zile), fără pericol de cedare structurală bruscă, spre deosebire de elementele metalice (structuri suport de cabluri, eventuale copertine metalice) care, la temperaturi susținute peste ~500°C, își pierd rapid capacitatea portantă — motiv pentru care **orice structură metalică situată în proximitatea imediată a containerelor** (structuri suport cabluri aeriene, copertine, cap. 8) trebuie amplasată, pe cât posibil, în afara zonei de flux termic radiant critic determinate de raportul UL 9540A, sau, dacă acest lucru nu este posibil constructiv, protejată termic (vopsele/tencuieli termospumante, ecrane radiante) — decizie de detaliu care revine PT, pe baza datelor termice ale raportului UL 9540A specific configurației contractate.

**Ancorajele metalice** (buloane, cap. 7.5), fiind parțial înglobate în beton (protejate de masa de beton pe adâncimea de ancorare) și parțial expuse (porțiunea superioară, piulița și șaiba de repartiție), sunt mai vulnerabile termic la porțiunea expusă — o expunere termică severă și prelungită la un eveniment de amploare ar putea afecta rezistența piuliței/porțiunii expuse a bulonului, deși porțiunea înglobată își păstrează, în mare parte, capacitatea. Această considerație nu modifică dimensionarea de bază a ancorajului (cap. 7.5), care rămâne guvernată de acțiunea seismică, dar justifică recomandarea, la cap. 16.1, a unei **inspecții post-eveniment obligatorii** a integrității ancorajelor înainte de repunerea în funcțiune a unui bay afectat de un eveniment termic, indiferent de absența unor semne vizibile evidente de degradare.

**Pereții cuvei de retenție ulei și ai bazinului de retenție ape stingere** (cap. 9, 10), fiind elemente de beton armat masiv, cu rol de contenție a lichidelor, nu ridică probleme specifice de rezistență la foc dincolo de cele ale unui element de beton armat obișnuit — clasa de expunere XA1/XA2 deja adoptată (cap. 3.1) acoperă și eventuala agresivitate chimică suplimentară a apelor de stingere contaminate.

---

## 12. Platforma rutieră și culoarele de intervenție — dimensionare structurală pentru trafic greu

**Rolul structural** al platformei rutiere/culoarelor de circulație (drumul de acces, drumul perimetral inelar, culoarul de 6,0 m dintre rândurile de containere, cf. memoriului de arhitectură) este de a asigura o suprafață portantă continuă pentru: (a) traficul curent de mentenanță (vehicule ușoare, cărucioare tehnice); (b) traficul tranzitoriu de montaj/înlocuire echipament (autotrenuri cu sarcini pe osie superioare 115 kN, cap. 5.2, la instalarea sau înlocuirea unui container); (c) — cerința cea mai severă — **traficul autospecialelor ISU** în caz de intervenție (osie ≥ 10 t, masă totală ≥ 26 t, cf. memoriului de arhitectură cap. 4).

**Alcătuirea structurii rutiere** — sistem rutier flexibil sau rigid, funcție de decizia de proiectare de detaliu (drum rigid din beton **C25/30 sau C30/37** pe traseul principal de intervenție, unde portanța trebuie garantată indiferent de condițiile meteo și de eventuala degradare în timp a unui sistem flexibil; sistem rutier flexibil — fundație de balast + strat de bază + îmbrăcăminte asfaltică — acceptabil pe traseele secundare de mentenanță curentă, cu portanță mai redusă), dimensionat conform metodologiei de calcul a sistemelor rutiere (grosimi de strat funcție de portanța terenului de fundare — modulul de deformație E confirmat de studiul geotehnic, cap. 4.4 — și de clasa de trafic adoptată, echivalentă unui drum tehnologic industrial cu trafic greu ocazional).

**Zona de manevră/întoarcere a autospecialelor** (platformă 12×12 m sau buclă, cf. memoriului de arhitectură) se dimensionează la aceleași criterii de portanță ca drumul perimetral, cu o atenție suplimentară la **rezistența la oboseală** dată de manevrele repetate (viraje, frânări) specifice unei zone de întoarcere, spre deosebire de un tronson rectiliniu de circulație.

**Interfața cu platformele individuale ale containerelor** (cap. 2.3, 6) — platforma rutieră **nu preia** greutatea echipamentelor (rezemate exclusiv pe platformele lor dedicate), dar trebuie proiectată cu un rost constructiv clar la interfața cu fiecare platformă de echipament, pentru a evita transferul necontrolat de eforturi între cele două sisteme structurale independente (platformă rigidă de echipament vs. structură rutieră, cu comportări la tasare diferite sub sarcină).

---

## 13. Trenchul/canalizația de cabluri de medie tensiune între containere și stația de racordare

### 13.1. Tipologia adoptată

Cablurile de medie tensiune (și, pe porțiuni, de joasă tensiune internă DC/AC între containere, PCS și transformator, cf. memoriului de instalații) care conectează echipamentele între ele și cu stația de racordare la rețea se rutează, structural, prin una din următoarele două soluții, ambele tratate ca elemente de infrastructură civilă:

**Trench (canal tehnic) de beton armat, deschis sau acoperit cu capace carosabile/necarosabile** — soluție preferată pe traseele principale, cu acces facil pentru mentenanță și extindere ulterioară a numărului de cabluri, realizat din pereți de beton armat **C30/37** (cap. 3.1), cu radier propriu sau cu pat de nisip/pietriș, dimensiuni interioare funcție de numărul și diametrul cablurilor plus rezervă pentru extindere (confirmate la PT de memoriul de instalații electrice).

**Duct bank (bloc de tuburi PVC/PEHD înglobate în beton slab sau în nisip stabilizat)** — soluție alternativă pe traseele secundare sau la traversările de drumuri, unde adâncimea de îngropare este mai mare și accesul pentru mentenanță mai puțin frecvent; tuburile sunt înglobate într-o masă de beton de clasă redusă (C12/15, rol de protecție mecanică, nu structural portant) sau, mai economic, direct în pat de nisip compactat, cu bandă de avertizare la partea superioară.

### 13.2. Dimensionarea structurală a capacelor și adâncimea de îngropare

**Capacele carosabile ale trenchurilor** (unde acestea traversează zone de circulație — culoarul de intervenție, drumul perimetral) se dimensionează la clasa de încărcare corespunzătoare traficului real al acelei zone: **clasă grea (trafic autospeciale ISU, ≥ 10 t/osie)** pe traseele suprapuse peste culoarul de intervenție și drumul perimetral (cap. 12), respectiv **clasă ușoară/medie** pe traseele exclusiv pietonale/de mentenanță ușoară. Capacele se realizează din beton armat prefabricat sau din fontă/oțel turnat, conform standardelor de produs specifice claselor de încărcare (analoage clasificării uzuale a capacelor de cămin, adaptată la lățimea trenchului), cu verificare la încovoiere pentru sarcina concentrată a roții celei mai defavorabile a autospecialei, majorată cu factorul de impact dinamic uzual pentru elemente rutiere.

**Adâncimea minimă de îngropare a cablurilor de medie tensiune** este stabilită de memoriul de instalații electrice, pe criterii electrice (protecție mecanică, distanță minimă normată față de alte rețele subterane) — prezentul memoriu tratează doar **protecția mecanică structurală** a acestei rutări: sub zonele carosabile, trenchul/duct bank-ul trebuie să reziste la sarcina de trafic transmisă prin pământul de acoperire, verificată prin distribuția Boussinesq/echivalentă a presiunii de suprafață la adâncimea de îngropare adoptată, cu o marjă care exclude fisurarea/deformarea permanentă a tuburilor sau a pereților trenchului sub trafic repetat.

### 13.3. Traversările sub platforma rutieră și sub platformele containerelor

La traversarea drumului de acces/culoarului de intervenție, trenchul/duct bank-ul se protejează suplimentar printr-o **placă de repartiție** (dală de beton armat deasupra traversării, sub structura rutieră propriu-zisă), care distribuie sarcina de trafic pe o suprafață mai mare înainte ca aceasta să ajungă la elementul de protecție a cablurilor — soluție constructivă standard la traversările de rețele subterane sub drumuri cu trafic greu, aplicată aici la specificul unei platforme tehnologice BESS.

---

## 14. Împrejmuirea și alte structuri civile minore

**Fundațiile stâlpilor de împrejmuire** — fundații izolate de beton simplu/slab armat, dimensionate la momentul răsturnător rezultat din acțiunea vântului asupra panoului de gard (cap. 8, unde s-a arătat că, spre deosebire de containere, la împrejmuire vântul este acțiunea laterală guvernantă, dat fiind raportul foarte defavorabil masă/suprafață expusă a unui panou de gard rigid), verificate la stabilitate prin metoda clasică a fundațiilor de stâlpi izolați supuși la moment încovoietor (bloc de fundare care mobilizează, prin greutate proprie și prin reacțiunea laterală a terenului pe adâncimea de încastrare, un moment stabilizator superior celui răsturnător din vânt).

**Porțile carosabile/pietonale** — fundații similare, dimensionate suplimentar la solicitările dinamice de deschidere/închidere (dacă motorizate) și la eventuala acțiune de impact accidental (vehicul), tratată constructiv, nu printr-un calcul structural formalizat la faza DTAC.

**Postamentele CCTV/iluminat perimetral** — fundații izolate ușoare, dimensionate la acțiunea vântului asupra stâlpului și a echipamentului montat, similar metodologiei stâlpilor de gard, la scară redusă.

---

## 15. Verificarea la stările limită — sinteza

### 15.1. Starea Limită Ultimă (SLU) — sinteza grafelor de utilizare

| Verificare SLU | Rezultat | Stare |
|---|---|---|
| Presiune medie teren, platformă container | 21,0/200 = 0,11 | ✓ |
| Poansonare sub reazem colț container | 156/675 = 0,23 | ✓ |
| Tasare (absolută) | ~3 mm << 40 mm admis | ✓ |
| Vânt vs. seism, stabilitate container (amplasament sever) | Fw 46,6 kN << Fb 215,8 kN | seism determinant |
| Răsturnare container, fără ancoraj (marjă redusă) | γ = 1,22 | ✓ (marginal — impune ancoraj) |
| Lunecare container, fără ancoraj | F_frecare 109,7 < Fb 215,8 | ✗ fără ancoraj — impune ancoraj mecanic |
| **Ancoraj — forfecare (mod oțel)** | 54/135,5 = 0,40 | ✓ |
| **Ancoraj — tracțiune (mod oțel)** | 55/203 = 0,27 | ✓ |
| **Ancoraj — interacțiune V+T** | **0,59** (formă liniară cu coeficienți cap. 7.7) | ✓ — **verificare determinantă a documentației** |
| Presiune teren, fundație transformator | 21,8/200 = 0,11 | ✓ |
| Cuvă retenție ulei — etanșeitate | probă 24h fără pierdere de nivel | ✓ (execuție) |
| Bazin retenție ape stingere — UPL (fază execuție) | marjă amplă la NH scăzut / verificare obligatorie la NH ridicat | ✓ (condiționat de amplasament) |
| Platformă rutieră — portanță trafic ISU | conform clasei de trafic adoptate | ✓ (PT) |

### 15.2. Starea Limită de Serviciu (SLS)

**Tasările** (cap. 6.4) rămân, la nivelul de predimensionare, mult sub limitele admisibile, cu marjă amplă pe toate platformele individuale, datorită rigidității proprii ridicate a fiecărei platforme independente pe amprenta ei redusă (cap. 2.3). **Deschiderea fisurilor** la elementele de contenție a lichidelor (cuvă ulei, bazin retenție ape) se verifică la un plafon redus (≈ 0,2 mm), specific cerinței de etanșeitate, mai sever decât cerința curentă de fisurare a elementelor de beton armat expuse doar la mediu, nu la lichid conținut. **Vibrațiile** induse de echipamentul de conversie (PCS) — deși de natură electrică/electromecanică, nu structurală — se verifică, la nivel de recomandare, prin izolare antivibratilă la interfața echipament-platformă, similară practicii de la echipamentele tehnice grele ale altor tipologii din bibliotecă (chillere, CTA), pentru a evita transmiterea de vibrații ciclice către platforma de beton pe termen lung.

---

## 16. Execuția — controlul calității, faze determinante, program de urmărire

### 16.1. Fazele determinante

Conform Legii nr. 10/1995 și normelor privind fazele determinante ale execuției, se convoacă verificarea și consemnarea în proces-verbal la:

1. **Trasarea și verificarea cotei de fundare a fiecărei platforme** — confirmarea naturii terenului (concordanța cu studiul geotehnic) și a cotei de fundare adoptate (`Df = 0,80–1,10 m`, cap. 1.2);
2. **Compactarea stratului de balast** sub fiecare platformă — verificarea gradului de compactare (`≥ 98% Proctor normal`, cap. 6.1) prin încercări de placă sau prin metode echivalente, condiție critică pentru limitarea tasărilor diferențiale (cap. 6.4);
3. **Armarea și turnarea fiecărei platforme individuale** — verificarea poziției și acoperirii armăturii (cap. 3.5, 6.5), a majorării locale de armătură sub reazemele de colț (cap. 6.3) și, esențial, a **poziției exacte/toleranțelor de execuție rezervate pentru punctele de ancorare**, pentru a garanta respectarea distanțelor minime la margine impuse de SR EN 1992-4 (cap. 7.5);
4. **Instalarea ancorajelor post-instalate (buloane/ancore chimice)** — **punct de control critic al întregii documentații**, dat fiind rolul determinant al acestui element (cap. 7): verificarea diametrului, adâncimii efective de ancorare, curățării găurii forate conform prescripțiilor producătorului sistemului de ancorare, timpului de întărire a rășinii/adezivului chimic înainte de solicitare, și a momentului de strângere final (cap. 7.6) — se recomandă explicit convocarea verificatorului tehnic atestat la această fază;
5. **Armarea și turnarea cuvei de retenție a uleiului transformatorului** — verificarea continuității armăturii, a benzilor de etanșare la rosturile de lucru (cap. 9.2);
6. **Proba de etanșeitate a cuvei de ulei** (umplere cu apă, minimum 24 de ore, cap. 9.2) — consemnată obligatoriu în proces-verbal, condiție de recepție a lucrării înainte de instalarea transformatorului;
7. **Armarea și turnarea bazinului de retenție a apelor de stingere** — verificare analoagă celei de la cuva de ulei, cu atenție suplimentară la verificarea UPL dacă amplasamentul are nivel hidrostatic ridicat (cap. 10.3);
8. **Proba de etanșeitate a bazinului de retenție a apelor de stingere** (umplere cu apă, minimum 24-48 de ore, cap. 10.2) — consemnată obligatoriu în proces-verbal;
9. **Execuția structurii rutiere pe traseul culoarului de intervenție și al drumului perimetral** — verificarea portanței efective (probă de placă sau echivalent) înainte de darea în exploatare, condiție pentru garantarea accesului real al autospecialelor ISU în caz de eveniment;
10. **Recepția finală, cu inspecție vizuală a tuturor ancorajelor montate**, verificând absența deteriorărilor de montaj (fisurare locală a betonului la instalare, deteriorarea filetului) — condiție de PIF (punere în funcțiune) a instalației.

### 16.2. Verificarea tehnică

Prezenta documentație de rezistență se supune verificării tehnice de către verificatori de proiecte atestați MDLPA, pentru cerințele:
- **Cerința A1** — rezistență și stabilitate a platformelor de fundare directă și a ancorajelor antiseismice, cu atenție specifică (semnalată explicit de proiectant, dat fiind caracterul determinant al acestei verificări, cap. 7) asupra dimensionării finale a ancorajelor conform SR EN 1992-4, pe baza raportului de calcul software dedicat și a agrementului ETA al produsului de ancorare contractat efectiv;
- **Cerința Af (A2)** — rezistență și stabilitate a terenului de fundare, cu atenție asupra verificării UPL la cuva de ulei și la bazinul de retenție, dacă amplasamentul confirmă un nivel hidrostatic ridicat.

### 16.3. Controlul calității materialelor

- **Betonul:** certificate de calitate pentru ciment, agregate, apă, aditivi; buletine de încercare pe cuburi/cilindri, prelevate separat pentru fiecare tip de element (platformele containerelor, fundația transformatorului, cuva de ulei, bazinul de retenție, structura rutieră), cu verificarea `fck` la 28 de zile conform NE 012; la elementele XA1/XA2 (cuvă, bazin), verificarea suplimentară a raportului A/C efectiv și, dacă e cazul, a aditivilor hidrofugi de masă; la elementele XF1/XF3 (platforme exterioare), verificarea conținutului de aer antrenat (4–6%, pentru rezistență la îngheț-dezgheț);
- **Oțelul-beton:** certificate de calitate B500C, verificarea clasei de ductilitate C pentru toate loturile;
- **Buloanele/ancorele de ancorare:** certificat de conformitate al produsului (marcaj CE pe baza ETA/EAD relevant, cap. 3.4), verificarea clasei de rezistență (8.8) și a protecției anticorozive (zincare ≥ 85 μm sau oțel inoxidabil, funcție de decizia de proiect), cu documentație de trasabilitate a lotului folosit;
- **Impermeabilizarea/hidroizolația** — certificat de conformitate al membranei/sistemului adoptat pentru cuvă și bazin, cu verificarea aplicării corecte a benzilor de etanșare la rosturile de lucru înainte de acoperirea acestora cu straturi ulterioare.

### 16.4. Estimarea consumurilor de materiale (predimensionare orientativă)

| Element | Volum beton (mc, orientativ) | Oțel-beton (kg) |
|---|---|---|
| Platforme containere (10 buc., 22–24 mp × 0,30 m mediat) | ~700 | ~77.000 |
| Fundații PCS + transformator | ~60 | ~7.200 |
| Cuvă retenție ulei | ~40 | ~5.600 |
| Bazin retenție ape stingere | ~80 (funcție de volum de proiectare SSI) | ~11.200 |
| Platformă rutieră/culoar intervenție/drum perimetral | ~450 | ~13.500 |
| Trench cabluri MT | ~120 | ~9.600 |
| **Total infrastructură civilă** | **~1.450 mc** | **~124.100 kg** |

Valorile sunt orientative, pentru evaluarea preliminară a costurilor; se confirmă la PT prin antemăsurători exacte, pe baza configurației definitive de echipament și a volumului de proiectare al bazinului de retenție stabilit de SSI.

### 16.5. Programul de urmărire specială a comportării în timp

Dat fiind caracterul de instalație cu risc tehnologic ridicat (thermal runaway Li-ion), se recomandă un program minim de urmărire a comportării în timp a infrastructurii civile:
- **Inspecția periodică a ancorajelor** (integritate vizuală, moment de strângere) — recomandată anual și, obligatoriu, **după orice eveniment seismic resimțit** sau după orice eveniment termic local (chiar minor, fără propagare), înainte de repunerea în funcțiune a bay-ului afectat (cap. 11.4);
- **Repere de tasare** la colțurile platformelor celor mai încărcate (transformator, containere) — citiri la finalizarea execuției, apoi anual în primii 3-5 ani;
- **Verificarea periodică a etanșeității cuvei de ulei și a bazinului de retenție** (inspecție vizuală + probă de nivel), corelată cu programul de mentenanță electrică al instalației;
- **Inspecția drumului/platformei de intervenție** — verificare periodică a portanței și a stării suprafeței de rulare, condiție pentru garantarea, pe toată durata de exploatare, a accesului real al autospecialelor ISU descris la cap. 12.

---

## 17. Concluzii — verificarea cerinței fundamentale A (A1/A2/Af)

Infrastructura de fundare directă proiectată pentru instalația BESS (25 MW / 50 MWh, 10 containere Li-ion LFP + PCS + transformator + racord SEN) — **platforme/radiere independente de beton armat sub fiecare container și echipament** (cap. 2, 6), **ancorate antiseismic prin buloane/ancore chimice dimensionate conform SR EN 1992-4** (cap. 7), **fundație de transformator cu cuvă de retenție a uleiului** (cap. 9), **bazin de retenție structural pentru apele de stingere contaminate** (cap. 10), **platformă rutieră și culoare de intervenție dimensionate pentru trafic greu ISU** (cap. 12) și **rețea de trenchuri de cabluri MT** (cap. 13) — satisface cerința fundamentală **A — rezistență mecanică și stabilitate** (Legea nr. 10/1995), conform P100-1/2013, CR 0/2012, SR EN 1992-1-1, SR EN 1992-4, SR EN 1997-1, la nivelul de predimensionare/verificare propriu fazei DTAC.

**Cerința A1 — rezistență și stabilitate a suprastructurii/echipamentului ancorat:** sinteza verificărilor din cap. 6-9 confirmă rezerve ample pe toate verificările curente (presiune teren 11%, poansonare 23%, tasare < 10% din admisibil) — dar identifică explicit **ancorarea antiseismică drept aspectul determinant și cu marja cea mai restrânsă** a întregii documentații (grad de interacțiune forfecare-tracțiune 0,59, cap. 7.5, 15.1), rezultat direct al masei foarte mari a echipamentului concentrat, chiar în condițiile clasei de importanță minime (III, γI,e = 1,0). Fără ancorare mecanică, atât verificarea la răsturnare (γ = 1,22, marjă redusă), cât și cea la lunecare (frecare insuficientă) ar fi nesatisfăcătoare — **ancorarea nu este o măsură opțională, ci o cerință structurală obligatorie**, dedusă riguros din calcul, nu adoptată din precauție generică.

**Cerința A2 (Af) — rezistență și stabilitate a terenului de fundare și a infrastructurii:** presiunile pe teren rămân, pentru toate elementele (containere, PCS, transformator), sub 15% din presiunea convențională admisă, cu marje foarte ample; verificarea de subpresiune (UPL) la cuva de ulei și la bazinul de retenție necesită confirmare specifică pe amplasamentul real, funcție de nivelul hidrostatic (cap. 9-10).

**Sinteza numerică centrală:**
- Forța seismică de proiectare a unui container greu (40 t), la un amplasament sever (`ag = 0,30g`): **Fb ≈ 215,8 kN** (≈ 55% din greutatea proprie) — respectiv, la amplasamentul de bază (`ag = 0,20g`): **Fb ≈ 130,8 kN**;
- Ancorajele adoptate (4-8 buloane M24 8.8 per container) satisfac interacțiunea forfecare-tracțiune cu un grad de utilizare de **0,59**, verificare cu marja cea mai redusă din întreaga documentație, dar acoperitoare;
- Presiunile pe teren (11-15% din pconv), poansonarea (23%) și tasările (< 10% din admisibil) au rezerve ample, confirmând că **problema tehnică centrală a unei instalații BESS nu este capacitatea portantă generală a terenului, ci concentrarea încărcării și transferul forței seismice orizontale prin ancoraj**.

**Puncte de atenție prioritară pentru faza PT** (cap. 7.5, 9.2, 10.1, 17): (1) recalcularea integrală a forței de ancorare pe baza masei exacte și a poziției reale a reazemelor indicate de furnizorul de echipament contractat definitiv (nu valorile de exemplu ale prezentului memoriu); (2) dimensionarea finală a ancorajelor exclusiv prin raport de calcul software dedicat, folosind agrementul ETA al produsului de ancorare contractat; (3) recalcularea volumului cuvei de retenție a uleiului pe baza fișei tehnice definitive a transformatorului; (4) preluarea, de la SSI, a volumului de proiectare al bazinului de retenție a apelor de stingere, rezultat din scenariul de incendiu adoptat; (5) confirmarea, prin studiu geotehnic de detaliu pe amplasamentul real, a presiunii convenționale, a modulului de deformație și a nivelului hidrostatic folosite generic în prezentul memoriu (cap. 4.4).

**Prezenta documentație de rezistență se supune verificării tehnice de către verificatori de proiecte atestați MDLPA**, conform Legii nr. 10/1995, pentru cerințele A1 și Af, cu atenție specifică asupra soluției de ancorare antiseismică a echipamentelor grele — aspectul tehnic distinctiv și determinant al acestei tipologii de instalație, fără echivalent direct de severitate în restul bibliotecii de funcțiuni, unde masa echipamentelor ancorate este, sistematic, cu unul-două ordine de mărime mai mică.

Calculele detaliate (breviar complet de calcul al ancorajelor pe baza software-ului certificat ETA, planurile de cofraj/armare ale platformelor, cuvei și bazinului, extrasele de armătură) se dezvoltă integral la faza **PT**, pe baza soluțiilor prefigurate și verificate în prezentul memoriu DTAC și pe baza datelor tehnice definitive ale furnizorului de echipament BESS contractat. Descrierea tehnologică generală, încadrarea urbanistică, zonarea funcțională, distanțele de siguranță la foc și integrarea peisagistică sunt tratate în memoriul general și în memoriul de arhitectură/amenajare; dimensionarea instalațiilor electrice, a BMS/EMS și scenariul complet de securitate la incendiu (inclusiv raportul UL 9540A), în memoriul de instalații electrice + PSI și în studiul de siguranță la incendiu (SSI) dedicat — documente care nu se dublează în prezentul memoriu de rezistență.

---

## Anexa A. Indexul normativelor aplicate

| Normativ | Titlu / obiect | Utilizat în |
|---|---|---|
| Legea 10/1995 | Calitatea în construcții — cerința A | cap. 1, 16.2, 17 |
| Legea 169/2026 (CATUC) | Autorizarea executării lucrărilor — conținut DTAC (Anexa nr. 2) | cap. 1.1 |
| HG 766/1997 | Categorii de importanță | cap. 1.3 |
| HG 907/2016 | Conținutul documentațiilor tehnico-economice | cap. 1.1 |
| SR EN 1990 + NA | Bazele proiectării (Eurocod 0) | cap. 1.3, 5.4 |
| SR EN 1991-1-1 | Greutăți, încărcări utile | cap. 5.1-5.2 |
| CR 1-1-3/2012 | Zăpadă | cap. 4.2 |
| CR 1-1-4/2012 | Vânt | cap. 4.3, 8 |
| CR 0/2012 | Bazele proiectării (grupări RO) | cap. 5.4 |
| SR EN 1992-1-1 + NA | Beton armat, reguli generale | cap. 3, 6, 9, 10 |
| SR EN 1992-1-2 | Beton la foc | cap. 11 |
| **SR EN 1992-4** | **Proiectarea ancorajelor pentru beton** | **cap. 7.5-7.6 (determinant)** |
| SR EN 1993-1-1 | Structuri de oțel | cap. 3.3, 8, 14 |
| SR EN 1997-1 + NP 074/2014 | Proiectare geotehnică | cap. 4.4, 10.3 |
| NP 112/2014 | Fundații de suprafață | cap. 6 |
| SR EN 1998-1 + NA | Proiectare seismică (Eurocod 8, partea 1) | cap. 7.1 |
| SR EN 1998-4 | Eurocod 8, partea 4 (rezervoare/echipamente) | cap. 7.1 (referință metodologică) |
| P100-1/2013 | Cod seismic RO — partea I | cap. 1-7 (dominant) |
| NE 012-1/2007, NE 012-2/2010 | Producerea/executarea betonului | cap. 3, 16 |
| P118-1/2/3 | Securitatea la incendiu | cap. 1.3, 11 |
| Ordin MAI 129/2016 | Instalații cu risc de incendiu mare/foarte mare | cap. 1.3, 11.1 |
| NFPA 855 | Instalarea sistemelor staționare de stocare a energiei | cap. 6.1, 11.3 |
| UL 9540A | Test propagare thermal runaway | cap. 11.3-11.4 |
| SR EN 10080 / SR 438 | Oțel-beton B500C | cap. 3.2 |
| SR EN ISO 1461 | Zincare termică la cald | cap. 3.3 |
| SR EN ISO 12944 | Protecție anticorozivă | cap. 3.3 |
| STAS 6054/77 | Adâncimi de îngheț (referință secundară) | cap. 1.2 |

## Anexa B. Lista notațiilor

| Simbol | Semnificație |
|---|---|
| ag, β0, q | accelerația terenului, factor amplificare dinamică, factor de comportare |
| γI,e | factor de importanță și expunere seismică (1,0 — clasa III) |
| Sd(T1) | ordonata spectrului de proiectare la perioada proprie a echipamentului |
| Fb | forța seismică de proiectare a echipamentului ancorat |
| λ | factor de corecție a forței seismice |
| m | masa echipamentului (container, PCS, transformator) |
| Fv | componenta verticală a acțiunii seismice |
| Fw | forța de vânt |
| γ_răsturnare | coeficient de siguranță la răsturnare |
| V_Ed, T_Ed | forța de calcul de forfecare / de tracțiune pe ancoraj |
| F_v,Rd, F_t,Rd | rezistența de calcul a ancorajului la forfecare / tracțiune (mod oțel) |
| h_ef | adâncimea efectivă de ancorare |
| c_cr,N | distanța critică la margine pentru capacitate completă a conului de smulgere |
| fck, fcd | rezistența caracteristică / de calcul a betonului la compresiune |
| fyk, fyd | limita de curgere caracteristică / de calcul a oțelului-beton |
| fub, fyb | rezistența la rupere / limita de curgere a oțelului de bulon (8.8) |
| pconv | presiune convențională a terenului |
| u1, vEd, vRd | perimetru critic, efort tăietor unitar, rezistență la poansonare |
| UPL | stare limită de echilibru prin subpresiune (plutire) |
| ρl, ρw | coeficient de armare (longitudinal / transversal-distribuit) |
| ψ0, ψ1, ψ2 | factori de combinație a acțiunilor variabile |
| K0 | coeficient de presiune a pământului în repaus |
| E | modulul de deformație liniară a terenului |

## Anexa C. Tabel comparativ rapid — parametri cheie funcție de amplasament

Pentru re-verificarea rapidă a soluției de ancorare la un alt amplasament decât exemplele dezvoltate (amplasament de bază `ag = 0,20g` și scenariul sever `ag = 0,30g`), tabelul centralizează parametrii care se recalculează integral prin re-parcurgerea capitolului 7, păstrând identice masa echipamentului, materialele și metodologia de calcul:

| Amplasament (exemplu) | ag | Sd(T1) = ag·β0/q | Fb container 40t (kN) | Observație |
|---|---|---|---|---|
| Vestul/sud-vestul țării (seismicitate redusă) | 0,10-0,15g | 1,64-2,45 | 65,6-98,0 | rezerve foarte ample pe ancoraj; vântul poate deveni comparabil/guvernant (cap. 8) |
| **Exemplul de bază (moderat)** | **0,20g** | **3,27** | **130,8** | caz standard, seism guvernant față de vânt |
| Amplasament sever, curbura Carpaților (Vrancea, Buzău, Focșani) | 0,30-0,40g | 4,91-6,54 | 196,4-261,8 | **caz dezvoltat integral în cap. 7 la 0,30g** (215,8 kN, la β0=2,75); reverificare obligatorie a ancorajelor, posibilă majorare diametru bulon la M27/M30 sau a numărului de puncte de ancorare |

**Regula de recalculare** pentru orice amplasament nou: (1) se preiau `ag` și `β0` din harta de zonare P100-1/2013 pentru UAT-ul respectiv; (2) se recalculează `Sd(T1) = ag·β0/q` (cu `q = 1,5`, cap. 4.1); (3) se recalculează `Fb = γI,e·Sd(T1)·m·λ` pentru masa reală a echipamentului contractat; (4) se refac verificările de răsturnare (cap. 7.3), lunecare (cap. 7.4) și dimensionarea ancorajului (cap. 7.5) cu noua valoare a lui `Fb`; (5) se verifică suplimentar, la amplasamente cu `ag ≥ 0,30g`, dacă configurația de ancorare adoptată în cap. 7.5 (buloane M24 8.8, 4-8 per container) rămâne satisfăcătoare sau impune majorarea diametrului, a numărului de puncte de ancorare sau a adâncimii efective de ancorare. Geometria echipamentelor, materialele, grupările de acțiuni și metodologia de calcul rămân neschimbate; doar masa reală a echipamentului contractat (cap. 2.1) și parametrii seismici de amplasament se introduc ca date de intrare specifice fiecărui proiect.

---

*Întocmit: inginer structurist atestat. Verificat tehnic: verificator atestat A1 + Af. Fază: DTAC. Toate valorile numerice sunt calcule de justificare a soluției la nivel de predimensionare/verificare, conform normativelor din Anexa A; ele se confirmă și se detaliază prin breviar de calcul complet al ancorajelor (pe baza agrementului ETA al produsului contractat) și prin planuri de cofraj/armare la faza PT. Prezentul memoriu respectă cerința fundamentală A — rezistență mecanică și stabilitate (Legea 10/1995). Prezentul document nu dublează conținutul memoriului general, al memoriului de arhitectură/amenajare și al memoriului de instalații electrice + PSI ale aceleiași documentații DTAC, și nici scenariul de securitate la incendiu al studiului de siguranță la incendiu (SSI) dedicat — pentru descrierea tehnologică, zonarea funcțională, distanțele de siguranță la foc, avizele necesare și dimensionarea completă a instalațiilor electrice/PSI, se consultă documentele respective.*
