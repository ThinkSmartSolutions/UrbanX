# SUPLIMENT DE FAZĂ PTh — INSTALAȚII (SCURGEREA APELOR, SIGURANȚA CIRCULAȚIEI, SEMNALIZARE, ILUMINAT, REȚELE EDILITARE, ITS)

## MODERNIZARE DRUM, SECTOR L ≈ 1,00 KM — km 0+000 ÷ 1+000

*Prezentul document constituie suplimentul de fază PTh (Proiect Tehnic de execuție, conform HG 907/2016 anexa 8 și Legii nr. 169/2026 (CATUC), art. 264, Anexa nr. 2) al memoriului tehnic de instalații („scurgerea apelor, siguranța circulației și semnalizarea", `instalatii.md`) elaborat la faza D.T.A.C. pentru modernizarea unui sector de drum cu lungimea L ≈ 1,00 km (km 0+000 ÷ 1+000), corelat cu memoriul tehnic general al aceleiași investiții (`general.md`). Faza D.T.A.C. a stabilit conceptul, dimensionarea preliminară și încadrarea normativă a fiecărei componente de echipare funcțională a drumului — pantele de scurgere, metoda rațională de calcul a debitului pluvial, dimensionarea de principiu a șanțurilor și podețelor, clasificarea și nivelul de reținere al parapetelor, categoriile și regulile de amplasare ale semnalizării, clasa de iluminat public. Prezentul supliment PTh nu reia acele breviare, ci le duce la nivelul de detaliu necesar execuției — poziție kilometrică cu poziție kilometrică, nod cu nod, element cu element — și adaugă componentele specifice fazei de execuție pe care D.T.A.C. nu le tratează: rețelele edilitare existente afectate de modernizare și soluțiile lor de relocare/subtraversare, sistemele de transport inteligent (ITS) adoptate pentru tronsonul modernizat, protecția catodică a elementelor metalice îngropate conexe traseului (conducte subtraversate, elemente metalice ale lucrărilor de artă), fișele tehnice complete ale echipamentelor de furnizor, caietul de sarcini de montaj pe fiecare capitol și programul complet de probe, verificări și punere în funcțiune (PIF), împreună cu Planul de Control al Calității și fazele determinante aferente.*

*Datele de referință ale traseului — clasa tehnică IV, categoria funcțională III (colectoare), viteza de proiectare Vp = 40 km/h în intravilan / 60 km/h în extravilan, categoria de importanță C, traficul de perspectivă 1.111 vehicule etalon/24h la finalul orizontului de 15 ani — sunt cele stabilite în memoriul general și se preiau identic în toate calculele din prezentul supliment, pentru coerența numerică a documentației pe cele două faze de proiectare.*

---

## 0. CUPRINS

- PTh-D.1 — Obiectul și structura suplimentului de fază PTh
- PTh-D.2 — Datele de referință ale traseului la faza PTh — tronsonare pe stationări
- PTh-D.3 — Scheme detaliate de execuție — scurgerea apelor
- PTh-D.4 — Scheme detaliate de execuție — siguranța circulației (parapete, glisiere, atenuatoare)
- PTh-D.5 — Scheme detaliate de execuție — semnalizare (verticală, orizontală, temporară de șantier)
- PTh-D.6 — Scheme detaliate de execuție — iluminat public
- PTh-D.7 — Scheme detaliate de execuție — rețele edilitare relocate
- PTh-D.8 — Scheme detaliate de execuție — sisteme de transport inteligent (ITS)
- PTh-D.9 — Protecția catodică a elementelor metalice îngropate conexe
- PTh-D.10 — Breviar complet de calcul — scurgerea apelor (nod cu nod)
- PTh-D.11 — Breviar complet de calcul — iluminat public (metoda luminanței, SR EN 13201-3)
- PTh-D.12 — Breviar complet de calcul — siguranța circulației
- PTh-D.13 — Fișe tehnice de echipamente
- PTh-D.14 — Caiet de sarcini — tehnologie de montaj
- PTh-D.15 — Programul de probe și verificări — PIF
- PTh-D.16 — Planul de Control al Calității și fazele determinante
- PTh-D.17 — Concluzii

---

## PTh-D.1 OBIECTUL ȘI STRUCTURA SUPLIMENTULUI DE FAZĂ PTh

### D.1.1 Rolul suplimentului PTh față de memoriul D.T.A.C.

Distincția dintre D.T.A.C. și PTh, pentru o lucrare de infrastructură rutieră, nu este una de conținut tematic — ambele piese tratează aceleași patru capitole ale echipării funcționale (scurgerea apelor, siguranța circulației, semnalizarea, iluminatul) — ci una de **nivel de rezoluție**. D.T.A.C. demonstrează, pentru autoritatea emitentă a autorizației de construire, că soluția de ansamblu este admisibilă: o secțiune de șanț dimensionată pe un exemplu de calcul reprezentativ, un nivel de parapet ales pe criterii generale, un program de semnalizare descris ca principiu, o clasă de iluminat justificată printr-un singur calcul de verificare. PTh, în schimb, este documentul pe care antreprenorul îl execută literalmente: fiecare metru liniar de șanț, fiecare cămin, fiecare stâlp de iluminat, fiecare indicator trebuie să aibă o poziție kilometrică precisă, o dimensiune verificată prin calcul propriu (nu prin analogie cu exemplul D.T.A.C.) și o fișă tehnică de echipament cu parametri garantați de furnizor. Tabelul de mai jos sintetizează, capitol cu capitol, saltul de detaliu de la D.T.A.C. la PTh:

| Componentă | Nivel D.T.A.C. (`instalatii.md`) | Nivel PTh (prezentul document) |
|---|---|---|
| Scurgerea apelor | un exemplu de calcul (metoda rațională + Manning), un tronson-tip | breviar pe fiecare tronson între cămine/puncte de colectare, poziții kilometrice complete |
| Podețe | un exemplu de calcul (Ø800, formulă orificiu înecat) | fișă completă per poziție kilometrică (PD-1, PD-2), cu geometrie de intrare/ieșire, timpane, aripi, radier |
| Parapete | criterii generale de amplasare, un nivel adoptat pe traseu curent și unul la structuri | plan pe stationări cu lungimi exacte, tranziții, terminații, atenuatoare — poziționate |
| Semnalizare verticală | reguli de amplasare, program pe categorii de puncte | listă completă de indicatoare cu cod SR 1848, poziție kilometrică, înălțime, folie |
| Semnalizare orizontală | reguli generale (continuu/discontinuu, lățime linie) | plan de marcaje pe tronsoane, cu lungimi exacte și ritmuri |
| Iluminat public | clasă adoptată (M3) + un calcul de verificare | calcul fotometric complet pe fiecare tronson-tip + schemă electrică completă |
| Rețele edilitare relocate | — (nu se tratează la D.T.A.C.) | inventar rețele afectate + soluție de relocare/subtraversare pe fiecare rețea |
| ITS | — | arhitectură completă, amplasare echipamente, schemă de comunicații |
| Protecție catodică | — | identificare elemente metalice îngropate + breviar de calcul |
| Probe/PIF | menționate generic | tabel complet cu normă, criteriu de admisie, responsabil |
| Calitate | — | Plan de Control al Calității + faze determinante explicite |

### D.1.2 Ipoteza de proiect menținută identică față de D.T.A.C.

Toate ipotezele de proiect stabilite la faza D.T.A.C. se mențin, fără modificare, la faza PTh: lungimea sectorului L ≈ 1,00 km (km 0+000 ÷ 1+000), panta transversală a carosabilului i_T = 2,5%, panta longitudinală minimă de scurgere i_L ≥ 0,5% (excepțional 0,25% pe sectoarele pereate), frecvența ploii de calcul de 1 dată la 1–2 ani, intensitatea ploii de calcul i = 130 l/s·ha, clasa de iluminat M3 (luminanță medie ≥ 1,0 cd/mp, U_o ≥ 0,40, TI ≤ 15%), nivelul de reținere N2/H1 pe traseul curent și H2 la podețe/ziduri de sprijin. Orice modificare a acestor ipoteze — o reconfigurare a traseului, o schimbare a clasei tehnice ca urmare a unei revizuiri a studiului de trafic, o modificare a regimului de amplasare (mixt: urban/curent/rambleu) — impune reluarea integrală a breviarelor din prezentul supliment, nu doar o corectare punctuală, întrucât fiecare calcul de la PTh-D.10 la PTh-D.12 este construit pe lanțul complet de ipoteze moștenite din D.T.A.C.

### D.1.3 Normative suplimentare aplicate la faza PTh

Pe lângă cadrul normativ deja citat integral în `instalatii.md` și `general.md` (STAS 4068/1-2, STAS 10796/1-2-3, SR 1846-1-2, SR EN 1317-1/-2/-5, AND 594, SR EN 12767, SR 1848-1, SR 1848-7, HG 1391/2006, SR EN 13201-1…5, NP 062-02), execuția impune consultarea suplimentară a: **SR EN 858-1/-2** (separatoare de lichide ușoare/hidrocarburi — dimensionare, clasificare NS, instalare); **SR EN 752** (sisteme de canalizare exterioară clădirilor — verificare la execuție); **STAS 3051** (canale ale rețelelor exterioare de canalizare — condiții tehnice); **SR EN 124** (capace și grătare pentru zone carosabile — clase de rezistență B125/D400 după poziție); **SR EN ISO 12696** (protecția catodică a oțelului în beton, aplicabilă elementelor de beton armat expuse — timpane, aripi podețe — în medii agresive identificate de studiul geotehnic); **STAS 6395** (protecția anticorozivă a conductelor metalice îngropate); **NTE 007** (normativ pentru proiectarea rețelelor electrice de distribuție — relevant pentru relocarea LEA); **PE 106** (normativ pentru construcția liniilor electrice aeriene); **STAS 2612** (protecția împotriva electrocutărilor — prize de pământ); **Ord. ANRE 60/2013** și reglementările tehnice ale operatorului de distribuție locală pentru relocarea/protejarea rețelelor electrice; **SR 8591** (rețele edilitare subterane — condiții de amplasare, distanțe minime între rețele); **SR EN 12253/12254/12352** (echipamente pentru semnalizare temporară de șantier — panouri, conuri, garduri mobile); **SR EN 40** (stâlpi de iluminat — proiectare și verificare, inclusiv la vânt); **Ordinul MT/MI comun pentru sisteme ITS**, coroborat cu specificațiile tehnice ale administratorului drumului privind interoperabilitatea cu dispeceratul de trafic.

---

## PTh-D.2 DATELE DE REFERINȚĂ ALE TRASEULUI LA FAZA PTh — TRONSONARE PE STATIONĂRI

Pentru a permite localizarea kilometrică exactă a fiecărui element de echipare funcțională tratat în continuare, traseul de 1,00 km se împarte, la faza PTh, în cinci tronsoane caracteristice, rezultate din profilul longitudinal și din profilele transversale tip stabilite în memoriul de geometrie și confirmate în memoriul de structură rutieră a aceleiași documentații:

| Tronson | Stationare | Lungime | Regim de amplasare | Element dominant de echipare |
|---|---|---|---|---|
| T1 | km 0+000 – 0+400 | 400 m | profil urban (borduri, trotuar pe ambele laturi) | rigole + guri de scurgere + colector + cămine (D.3.1) |
| T2 | km 0+400 – 0+700 | 300 m | profil curent, la nivel/debleu moderat | șanțuri trapezoidale betonate (D.3.2) |
| T3 | km 0+700 – 0+850 | 150 m | rambleu 3,0–4,0 m | parapet N2/H1 obligatoriu (D.4.1) + podeț PD-2 la 0+780 |
| T4 | km 0+850 – 1+000 | 150 m | profil curent, la nivel | șanțuri trapezoidale betonate |
| — | km 0+230 | punctual | traversare șanț sub acces lateral | podeț PD-1, Ø600 mm |

Această tronsonare este cea folosită, consecvent, în toate schemele și breviarele din capitolele PTh-D.3 – PTh-D.12; orice modificare de traseu rezultată din piesele desenate finale de execuție impune renumerotarea stationărilor și reverificarea limitelor de tronson, fără a afecta metodologia de calcul.

---

## PTh-D.3 SCHEME DETALIATE DE EXECUȚIE — SCURGEREA APELOR

### D.3.1 Planul de canalizare pluvială pe stationări — tronson urban T1 (km 0+000–0+400)

Tronsonul T1, cu profil urban (borduri pe ambele laturi, trotuare, fără taluz vizibil), este echipat cu sistemul complet descris la nivel de principiu în D.T.A.C. cap. 5.2: rigole de acostament → guri de scurgere → colector îngropat → cămine de vizitare. La faza PTh, fiecare element se poziționează pe stationare exactă, cu identificare individuală:

**Guri de scurgere** — interdistanță adoptată 40 m (în intervalul normat 30–50 m, cap. D.T.A.C. 5.2), dispuse bilateral, alternate pentru a evita concentrarea debitului pe o singură latură în punctele cu pantă transversală spre o singură parte:

| Cod | Stationare | Latură | Suprafață deservită (mp) | Debit de calcul (l/s) |
|---|---|---|---|---|
| GS-1 | 0+020 | stânga | 340 | 3,2 |
| GS-2 | 0+060 | dreapta | 380 | 3,6 |
| GS-3 | 0+100 | stânga | 380 | 3,6 |
| GS-4 | 0+140 | dreapta | 380 | 3,6 |
| GS-5 | 0+180 | stânga | 380 | 3,6 |
| GS-6 | 0+220 | dreapta | 380 | 3,6 |
| GS-7 | 0+260 | stânga | 380 | 3,6 |
| GS-8 | 0+300 | dreapta | 380 | 3,6 |
| GS-9 | 0+340 | stânga | 380 | 3,6 |
| GS-10 | 0+380 | dreapta | 400 | 3,8 |

Fiecare gură de scurgere este de tip carosabil, cu ramă și grătar clasa **C250** (conform SR EN 124, poziționată în zona rigolei de bordură, în afara benzii de rulare directă), cu sifon și depozit de sedimente (cap. D.T.A.C. 5.2), racordată la colector prin tub de racord PVC-KG DN 200, pantă minimă 2%, lungime maximă de racord 8 m (pentru a limita pierderile de sarcină locale și riscul de colmatare a racordului lung).

**Colectorul pluvial** — traseu unic, PVC/PP cu rigiditate inelară SN8, DN 315 pe segmentul amonte (0+000–0+200) și DN 400 pe segmentul aval (0+200–0+400, unde debitul cumulat crește), pantă adoptată i = 0,4% (peste minimul normat de 0,3%, cap. D.T.A.C. 5.2), amplasat la adâncime de acoperire minimă 1,00 m față de cota carosabilului (protecție la încărcarea din trafic și la adâncimea de îngheț, STAS 1709).

**Căminele de vizitare** — interval adoptat 57–60 m (sub maximul normat de 60 m, SR 1846), plus obligatoriu la fiecare racord de gură de scurgere pereche și la schimbarea de diametru (stationare 0+200):

| Cod | Stationare | Diametru cămin | Observație |
|---|---|---|---|
| CV-1 | 0+000 | Ø1000 | cămin de capăt, racord la canalizarea publică amonte |
| CV-2 | 0+060 | Ø1000 | — |
| CV-3 | 0+120 | Ø1000 | — |
| CV-4 | 0+180 | Ø1000 | — |
| CV-5 | 0+200 | Ø1200 | schimbare diametru DN315→DN400 |
| CV-6 | 0+260 | Ø1200 | — |
| CV-7 | 0+320 | Ø1200 | — |
| CV-8 | 0+400 | Ø1200 | cămin de capăt, racord la separatorul de hidrocarburi (D.3.5) |

### D.3.2 Șanțurile și rigolele — tronsoane curente T2 și T4 (km 0+400–0+700 și 0+850–1+000)

Pe cele două tronsoane curente (450 m însumați), se adoptă șanțul trapezoidal betonat cu secțiunea verificată la D.T.A.C. cap. 3.4 (b = 0,40 m, h = 0,40 m, taluz 1:1, n = 0,015), dispus bilateral pe T2 (la nivel/debleu moderat pe ambele laturi) și unilateral pe T4 latura din amonte (unde profilul transversal, conform memoriului de geometrie, prezintă taluz de rambleu jos pe latura opusă, echipată în schimb cu rigolă triunghiulară pereată, conform tabelului de alegere D.T.A.C. cap. 3.5). Panta longitudinală adoptată pe fiecare tronson de șanț respectă panta liniei roșii a profilului longitudinal, verificată individual la fiecare schimbare de declivitate pentru a nu coborî sub minimul de 0,5%:

| Tronson șanț | Stationare | Lungime | Latură | Pantă longitudinală | Racord evacuare |
|---|---|---|---|---|---|
| Ș-1 | 0+400 – 0+550 | 150 m | ambele | 0,6% | podeț PD-2 (via rigolă de legătură, T3) |
| Ș-2 | 0+550 – 0+700 | 150 m | ambele | 0,7% | rigolă de legătură spre PD-2 |
| Ș-3 | 0+850 – 0+930 | 80 m | dreapta | 0,55% | emisar natural, prin gură de vărsare cu radier antiafuiere |
| Ș-4 | 0+930 – 1+000 | 70 m | dreapta | 0,5% | emisar natural |

Rosturile de dilatare/contracție ale căptușelii de beton (cap. D.T.A.C. 3.6) se dispun la interval de 6 m pe toate tronsoanele, corelat cu lungimea panourilor de cofrare adoptată pentru execuție. Pe tronsonul Ș-2, unde panta longitudinală de 0,7% este cea mai apropiată de pragul de peste care viteza de curgere s-ar apropia de zona superioară a intervalului admis (cap. D.T.A.C. 3.4), verificarea de viteză se reia explicit la PTh-D.10.2.

### D.3.3 Podețele — fișă de poziție kilometrică

Cele două lucrări de artă de mici dimensiuni menționate în memoriul general (cap. 1.5) sunt poziționate și dimensionate individual:

**PD-1, km 0+230** — podeț tubular Ø600 mm, sub un acces lateral la o proprietate riverană, traversând rigola de acostament a tronsonului urban T1; lungime 8,0 m (lățime acces + supralărgire pentru timpane), pantă 1,0%, cu timpane din beton armat la ambele capete și radier antiafuiere la ieșire (lungime 1,5 m, pereu din piatră brută rostuit cu mortar).

**PD-2, km 0+780** — podeț tubular Ø800 mm (identic, ca dimensionare, cu exemplul de calcul verificat la D.T.A.C. cap. 4.2), traversând un talveg natural sub rambleul de 3,5 m al tronsonului T3; lungime 12,0 m (corespunzătoare lățimii bazei rambleului la această înălțime), pantă 1,2%, echipat complet cu timpane, aripi laterale înclinate la 45° (racordare cu taluzul natural al talvegului) și radier antiafuiere pe o lungime de 3,0 m în aval, dimensionat pentru energia de ieșire calculată la viteza rezultată din breviarul PTh-D.10.3. Fiind amplasat sub un rambleu care depășește pragul de 3,0 m (cap. D.T.A.C. 6.2), PD-2 este echipat obligatoriu cu parapet de nivel H2 pe lungimea rambleului adiacent, cu tranziție către nivelul N2/H1 al traseului curent (detaliu D.4.1).

### D.3.4 Drenul subteran — traseu și racord

Studiul geotehnic (piesă distinctă a documentației, cap. D.T.A.C./general 2.4) identifică, pe tronsonul T2 (km 0+400–0+550), un nivel al pânzei freatice sezonier ridicat, la o adâncime insuficientă față de patul drumului proiectat pentru atingerea capacității portante de calcul. Se prevede, pe acest tronson, un dren de tip tub perforat Ø160 mm, poziționat sub șanțul lateral (latura amonte), înconjurat de material filtrant (piatră spartă sortată 8–16 mm) și separat de terenul natural printr-un geotextil nețesut (masă minimă 200 g/mp, permeabilitate perpendiculară pe plan verificată la debitul de infiltrație estimat), pe o pantă longitudinală de 0,4% (peste minimul normat de 0,3%, cap. D.T.A.C. 5.1). Drenul descarcă, la capătul aval (stationare 0+550), într-un cămin de rupere de pantă racordat la șanțul Ș-1, evitând un punct de evacuare independent suplimentar către emisarul natural (principiu de coordonare descris la cap. D.T.A.C. 5.3).

### D.3.5 Separatorul de hidrocarburi și bazinul de retenție

La capătul aval al tronsonului urban T1 (stationare 0+400), unde colectorul pluvial preia, pe lângă apa de carosabil curent, și eventualele scurgeri accidentale de hidrocarburi provenite din trafic (scurgeri de ulei/carburant la staționare/frânare bruscă, spălare accidentală a suprafeței carosabile), se intercalează, înainte de racordul la rețeaua publică de canalizare pluvială sau la emisarul natural, un **separator de hidrocarburi clasa I cu by-pass integrat**, dimensionat conform SR EN 858-1/-2, precedat de un cămin de desnisipare/decantor de nămol (volum util 2.000 l), care reține sedimentele grosiere înainte ca apa să ajungă la separatorul propriu-zis, prevenind colmatarea prematură a acestuia. Separatorul este echipat cu senzor de nivel al stratului de hidrocarburi acumulat, cu alarmă transmisă la panoul local de întreținere, și cu cămin de prelevare a probei, amonte de racordul final, pentru verificarea periodică a calității efluentului conform normelor de mediu aplicabile (concentrația reziduală de hidrocarburi la ieșire ≤ 5 mg/l, prag uzual normat pentru evacuare în emisar natural sau în rețeaua publică).

Debitul de calcul al separatorului rezultă din suprafața carosabilului tronsonului T1 (400 m × 7 m ≈ 2.800 mp = 0,28 ha) prin metoda rațională (cap. D.T.A.C. 2.2): Q = m·i·S·φ = 0,8 × 130 × 0,28 × 0,90 = **26,2 l/s**, rotunjit acoperitor la **28 l/s**, valoare care determină clasa dimensională a separatorului (breviar complet la PTh-D.10.4). Debitul care depășește capacitatea nominală a separatorului, în evenimente excepționale peste ploaia de calcul, este preluat prin by-pass-ul integrat, ocolind treapta de separare (soluție acceptată de SR EN 858, întrucât evenimentele excepționale sunt, statistic, dominate de diluția puternică a apei de ploaie, care reduce concentrația relativă de hidrocarburi sub pragul relevant).

Pe lângă separator, la ieșirea din colectorul pluvial general al tronsonului (aval de separator), se prevede un **bazin de retenție** cu volum util de dimensionat la PTh-D.10.5, cu rol de laminare a debitului de vârf înainte de evacuarea către emisarul natural — soluție adoptată acolo unde capacitatea de preluare a emisarului natural (curs de apă/șanț colector de rang superior din afara amprizei drumului) este limitată și nu poate prelua instantaneu debitul de vârf calculat pentru tronsonul urban, impunând o temporizare/laminare a evacuării printr-un volum tampon.

### D.3.6 Interfața cu rețeaua publică de canalizare pluvială / emisarul natural

Racordul final al sistemului de scurgere a apelor de pe tronsonul modernizat — fie către rețeaua publică de canalizare pluvială a localității (dacă traseul urban T1 se află în zona deservită de o asemenea rețea), fie către un emisar natural (curs de apă, șanț colector de rang superior aflat în administrarea ANAR sau a administratorului drumului superior) — se realizează printr-un singur punct de evacuare pentru fiecare din cele două subsisteme tratate (colectorul urban T1, prin separator și bazin de retenție, cap. D.3.5; șanțurile tronsoanelor curente T2–T4, prin gurile de vărsare cu radier antiafuiere de la capetele Ș-3/Ș-4). Fiecare punct de evacuare face obiectul avizului de gospodărire a apelor emis de ANAR (cap. D.T.A.C. 13) și, dacă este cazul, al acordului operatorului de apă-canal pentru racordarea la rețeaua publică — condiție prealabilă obligatorie recepției lucrărilor de scurgere a apelor, verificată la faza determinantă corespunzătoare (PTh-D.16).

---

## PTh-D.4 SCHEME DETALIATE DE EXECUȚIE — SIGURANȚA CIRCULAȚIEI (PARAPETE, GLISIERE, ATENUATOARE)

### D.4.1 Schema parapetelor pe tronsoane — poziții, niveluri, lungimi, tranziții

Aplicând criteriile de la cap. D.T.A.C. 6.2 la tronsonarea stabilită la PTh-D.2, parapetele se poziționează astfel pe traseu:

| Poziție | Stationare | Lungime | Nivel de reținere | Justificare |
|---|---|---|---|---|
| P-1 | 0+700 – 0+750 | 50 m | N2/H1 | rambleu 3,0–3,5 m, sub pragul de risc al structurilor |
| P-2 (tranziție) | 0+750 – 0+765 | 15 m | tranziție N2/H1 → H2 | apropiere de podețul PD-2 |
| P-3 (la structură) | 0+765 – 0+795 | 30 m | H2 | la podețul PD-2 (element rigid, cap. D.T.A.C. 6.3) |
| P-4 (tranziție) | 0+795 – 0+810 | 15 m | tranziție H2 → N2/H1 | îndepărtare de podeț |
| P-5 | 0+810 – 0+850 | 40 m | N2/H1 | rambleu 3,5–4,0 m, continuare tronson T3 |

Lungimea totală de parapet montată pe traseu este de **150 m** (identică cu lungimea tronsonului T3, întrucât întregul tronson în rambleu ≥3,0 m este acoperit continuu, fără întreruperi care ar lăsa expuse porțiuni intermediare cu rambleu peste prag). Fiecare tranziție (P-2, P-4) folosește un element de racordare de rigiditate progresivă (secțiune metalică de tranziție certificată de furnizor pentru cuplul N2/H1↔H2, conform practicii curente aplicării SR EN 1317 pe tronsoane cu schimbare de nivel de reținere, cap. D.T.A.C. 6.3), evitând orice schimbare bruscă de rigiditate care ar putea produce agățarea unui vehicul la impact.

### D.4.2 Glisierele metalice — profil, secțiune, ancorare

Sistemul de reținere adoptat pentru nivelurile N2/H1 este de tip **glisieră metalică cu profil dublu val**, montată pe stâlpi metalici din profil U/C, ancorați direct în teren (batere sau fundație punctuală de beton, funcție de natura terenului identificată de studiul geotehnic), la interax de 2,0 m pe traseul curent — interax redus la 1,33 m (2/3 din interax standard) pe zonele de tranziție și pe primii/ultimii 8 m ai fiecărui tronson de parapet, unde rigiditatea sistemului trebuie crescută gradual pentru a evita o zonă de flexibilitate excesivă la capătul unui tronson scurt. Înălțimea de montare a glisierei (față de cota carosabilului la muchia glisierei) este de 0,75 m pentru nivelul N2/H1, conform înălțimii de referință testate pentru acest nivel de reținere. Lățimea de lucru (spațiul dinamic de deformare a sistemului la impact, măsurată perpendicular pe glisieră) este verificată, la proiectare, față de obstacolele/marginile taluzului aflate în spatele parapetului, astfel încât deformarea maximă admisă la impact să nu proiecteze vehiculul dincolo de limita utilă a zonei de siguranță.

Pentru nivelul H2 (la podețul PD-2), se adoptă un sistem de reținere cu rigiditate superioară — parapet metalic cu profil întărit sau parapet mixt metal-beton, ancorat direct în structura de beton a timpanelor/aripilor podețului, conform detaliului de execuție al furnizorului certificat pentru acest nivel de performanță — soluție care asigură transferul direct al forței de impact către o fundație rigidă, adecvată consecinței severe a unui impact direct cu elementul structural al podețului (cap. D.T.A.C. 6.3).

### D.4.3 Atenuatoarele de impact — poziții și tip

Capetele libere ale tronsoanelor de parapet P-1 și P-5 (unde parapetul se termină către zone fără rambleu semnificativ) se echipează cu **terminații ancorate în teren**, care coboară gradual glisiera până la nivelul solului pe o lungime de 4–6 m, eliminând capătul liber suspendat — soluție suficientă la aceste două puncte, unde viteza de circulație (Vp = 60 km/h în extravilan) și configurația locală nu justifică un atenuator de impact dedicat. La capătul dinspre traficul care se apropie de podețul PD-2 (stationare 0+765, unde tranziția către nivelul H2 și rigiditatea crescută a sistemului cresc riscul unui impact frontal la capătul aparent al tronsonului rigid), se prevede, suplimentar terminației ancorate, un **atenuator de impact tip redirecțional**, conceput să se deformeze progresiv pe o distanță de lucru de minimum 6 m la impact frontal, disipând energia cinetică fără o oprire bruscă a vehiculului — element ales conform practicii curente pentru puncte cu risc de impact frontal la capătul unei zone de rigiditate crescută (cap. D.T.A.C. 6.5).

### D.4.4 Stâlpii cedanți (semnalizare/iluminat)

Toți stâlpii de susținere pentru indicatoarele de semnalizare verticală (PTh-D.5.1) și pentru corpurile de iluminat public (PTh-D.6) amplasați în afara zonelor protejate de parapet continuu — respectiv pe tot traseul cu excepția tronsonului T3 (unde parapetul continuu protejează deja indirect orice stâlp amplasat în spatele lui) — se prevăd, conform SR EN 12767, ca **stâlpi cedanți din categoria de performanță joasă (LE — low energy absorption)** pentru stâlpii de semnalizare de mici dimensiuni, respectiv **categoria de energie controlată (HE — high energy absorption)** pentru stâlpii de iluminat de 8–10 m înălțime (cap. D.T.A.C. 6.5, D.T.A.C. 10.3), fișele tehnice de produs urmând a certifica, pentru fiecare tip de stâlp adoptat, categoria de performanță la impact testată de furnizor (detaliu la PTh-D.13).

---

## PTh-D.5 SCHEME DETALIATE DE EXECUȚIE — SEMNALIZARE

### D.5.1 Semnalizarea verticală — listă completă de indicatoare pe stationări

Programul de semnalizare verticală descris la nivel de principiu la D.T.A.C. cap. 7.4 se detaliază, la faza PTh, într-o listă completă de indicatoare cu poziție kilometrică exactă, cod conform SR 1848-1, înălțime de montare și clasă de folie retroreflectorizantă:

| Cod | Stationare | Indicator (SR 1848-1) | Sens | Înălțime montare | Folie |
|---|---|---|---|---|---|
| IV-01 | 0+000 | Limitare viteză 50 km/h + panou „localitate" | ambele | 2,50 m (urban) | clasa 2 |
| IV-02 | 0+150 | Trecere de pietoni (avertizare) | ambele | 2,50 m | clasa 2 |
| IV-03 | 0+230 | Presemnalizare acces lateral (podeț PD-1) | ambele | 2,50 m | clasa 2 |
| IV-04 | 0+390 | Sfârșit localitate / limitare viteză 60 km/h | ieșire | 2,20 m | clasa 2 |
| IV-05 | 0+480 | Avertizare curbă la dreapta + panou viteză recomandată | ambele | 1,80 m | clasa 3 (DG) |
| IV-06 | 0+620 | Cedează trecerea (intersecție cu drum lateral) | acces secundar | 1,80 m | clasa 2 |
| IV-07 | 0+700 | Avertizare rambleu/parapet (panou complementar) | ambele | 1,80 m | clasa 3 (DG) |
| IV-08 | 0+765 | Avertizare lucrare de artă (podeț PD-2) | ambele | 1,80 m | clasa 3 (DG) |
| IV-09 | 0+930 | Avertizare curbă la stânga | ambele | 1,80 m | clasa 2 |
| IV-10 | 1+000 | Sfârșit de sector / continuare drum | ieșire | 1,80 m | clasa 2 |

Presemnalizarea indicatoarelor de avertizare (IV-05, IV-07, IV-08, IV-09) se amplasează la 180 m înaintea punctului la care se referă pe tronsoanele cu Vp = 60 km/h (extravilan, în intervalul normat 150–250 m, cap. D.T.A.C. 7.2, adoptat spre limita superioară dat fiind viteza de proiectare ridicată), respectiv la 150 m pe tronsonul urban (Vp = 40 km/h). Toate panourile montate pe stâlpi cedanți LE (cap. D.4.4), cu excepția celor ancorate direct pe parapetul de la PD-2 (IV-08), unde susținerea se face pe un suport rigid solidar cu structura protejată de parapetul H2.

### D.5.2 Semnalizarea orizontală — plan de marcaje pe tronsoane

Marcajele longitudinale axiale se aplică diferențiat pe tronsoane, în funcție de distanța de vizibilitate la depășire rezultată din profilul longitudinal și din planul de situație (memoriul de geometrie al aceleiași documentații), conform principiului deja descris la D.T.A.C. cap. 8.1:

| Tronson | Stationare | Marcaj axial | Ritm (plin/gol) | Justificare |
|---|---|---|---|---|
| M-1 | 0+000 – 0+400 | linie continuă simplă | — | profil urban, benzi de circulație distincte, interzicere depășire |
| M-2 | 0+400 – 0+470 | linie discontinuă | 3 m / 6 m | vizibilitate la depășire asigurată, aliniament drept |
| M-3 | 0+470 – 0+560 | linie continuă | — | curbă la 0+480 cu vizibilitate insuficientă la depășire |
| M-4 | 0+560 – 0+700 | linie discontinuă | 3 m / 6 m | aliniament drept, vizibilitate asigurată |
| M-5 | 0+700 – 0+850 | linie continuă | — | tronson T3 cu parapet — interdicție de depășire lângă zona de risc |
| M-6 | 0+850 – 0+930 | linie continuă | — | curbă la 0+930, vizibilitate insuficientă |
| M-7 | 0+930 – 1+000 | linie discontinuă | 3 m / 6 m | ieșire din curbă, vizibilitate reluată |

Marcajele marginale (limita benzii cu acostamentul) se aplică continuu pe toată lungimea traseului, lățime 12 cm (cap. D.T.A.C. 8.3). Marcajele transversale se aplică punctual: STOP/cedare trecere la intersecția de la 0+620 (corelat cu indicatorul vertical IV-06), trecere de pietoni la 0+150 (corelat cu IV-02), cu ritm de discontinuitate redus la 3 m/3 m pe o lungime de 20 m înainte și după fiecare punct transversal, conform principiului de densitate crescută a informației în apropierea manevrelor (cap. D.T.A.C. 8.3). Materialul adoptat este termoplastic aplicat la cald pe tronsonul urban T1 (durabilitate superioară justificată de frecvența mai mare a traficului local și a acceselor riverane) și vopsea rutieră cu microbile de sticlă pe tronsoanele curente T2–T4, ambele verificate la indicele de antiderapare SRT ≥ 45 și la retroreflectorizanță R_L ≥ 150 mcd/mp/lx (cap. D.T.A.C. 8.3).

### D.5.3 Semnalizarea temporară de șantier — fazare pe etape de execuție

Execuția lucrărilor de scurgere a apelor, de parapete, de semnalizare și de iluminat impune închiderea/restricționarea traficului pe porțiuni succesive ale carosabilului existent, fazate astfel: **Faza 1** — execuția rețelei de canalizare/șanțuri pe jumătate de platformă, cu circulație alternantă dirijată prin semafor mobil temporizat pe tronsonul T1 (lungime 400 m, timp de parcurs unidirecțional estimat la Vp redusă de șantier ≈ 25 km/h → temporizare semafor calculată la ≈ 60 s pe sens, plus marjă de siguranță); **Faza 2** — execuția pe cealaltă jumătate de platformă, cu aceeași schemă inversată; **Faza 3** — montajul parapetelor și al stâlpilor de iluminat pe tronsonul T3, cu restricție de bandă unică pe lungime scurtă (150 m), dirijare prin piloți de circulație (vizibilitate reciprocă directă între capete, conform practicii pentru sectoare scurte, cap. D.T.A.C. 9.1); **Faza 4** — aplicarea marcajelor orizontale definitive, ultimă etapă, cu restricție minimă (uscarea materialului de marcaj necesitând doar închiderea temporară a benzii proaspăt marcate). Fiecare fază face obiectul unui plan de semnalizare temporară distinct (cap. D.T.A.C. 9.2), avizat de administratorul drumului și de Poliția Rutieră înainte de demararea fazei respective, cu presemnalizare progresivă (panou general „lucrări pe drum" urmat de secvența de limitare treptată 70→50→30 km/h) și delimitare fizică prin conuri/balize/panouri direcționale, completate pe timp de noapte cu lămpi de semnalizare galbene intermitente (cap. D.T.A.C. 9.1).

---

## PTh-D.6 SCHEME DETALIATE DE EXECUȚIE — ILUMINAT PUBLIC

### D.6.1 Schema de dispunere a stâlpilor pe traseu

Conform clasei de iluminat M3 adoptate la D.T.A.C. (cap. 10.1) și parametrilor geometrici de principiu (H = 8–10 m, interdistanță 30–40 m, cap. D.T.A.C. 10.3), dispunerea stâlpilor la faza PTh se diferențiază pe tronsoane, în funcție de lățimea platformei rezultată din profilele transversale tip:

| Tronson | Dispunere | Înălțime stâlp H | Interax adoptat | Nr. stâlpi | Sursă alimentare |
|---|---|---|---|---|---|
| T1 (0+000–0+400, urban, platformă mai lată cu trotuare) | bilaterală, alternantă | 9,0 m | 32 m | 13 (7 stânga + 6 dreapta) | branșament electric local T1 |
| T2 (0+400–0+700, curent) | unilaterală (latura cu șanț mai mic/rigolă) | 8,0 m | 36 m | 9 | LEA subterană de la punct de alimentare T2 |
| T3 (0+700–0+850, rambleu, parapet) | unilaterală, stâlpi în spatele parapetului | 8,0 m | 34 m | 5 | continuare LEA subterană T2 |
| T4 (0+850–1+000, curent) | unilaterală | 8,0 m | 36 m | 5 | continuare LEA subterană |

Interaxul de 32 m pe tronsonul urban T1 (raport e/H ≈ 3,55, în intervalul empiric e/H ≈ 3–4, cap. D.T.A.C. 10.3) și de 36 m pe tronsoanele curente (e/H = 4,5, ușor peste intervalul empiric standard, dar verificat explicit la breviarul fotometric PTh-D.11.3, unde uniformitatea rezultată confirmă totuși pragul U_o ≥ 0,40 datorită lățimii reduse a carosabilului pe tronsonul curent, care compensează interaxul mai mare) rezultă din compromisul între numărul total de puncte luminoase (cost de investiție și de exploatare) și respectarea celor trei parametri fotometrici ceruți de clasa M3 (luminanță medie, uniformitate, indice de orbire), verificați explicit la PTh-D.11.

### D.6.2 Schema electrică monofilară a rețelei de iluminat

```
Punct de alimentare (branșament/PCC operator distribuție) ─► Tablou electric de distribuție iluminat (TDI)
        ├─► Circuit C1 — stâlpi T1 latura stânga (7 puncte, cablu subteran ACYAbY 4×16)
        ├─► Circuit C2 — stâlpi T1 latura dreaptă (6 puncte, cablu subteran ACYAbY 4×16)
        ├─► Circuit C3 — stâlpi T2 (9 puncte, cablu subteran ACYAbY 4×10)
        ├─► Circuit C4 — stâlpi T3 (5 puncte, cablu subteran ACYAbY 4×10)
        └─► Circuit C5 — stâlpi T4 (5 puncte, cablu subteran ACYAbY 4×10)
```

Fiecare circuit este comandat de un contactor cu comandă orară/fotocelulă centralizată la TDI, cu modul de **telegestiune** individuală pe fiecare punct luminos (monitorizare stare, consum, defecțiune — cap. D.T.A.C. 10.3), transmisă prin GPRS/comunicație pe rețeaua ITS descrisă la PTh-D.8. Fiecare stâlp este echipat cu **priză de pământ proprie**, verificată la rezistența de dispersie R_p ≤ 4 Ω (conform STAS 2612), racordată la conductorul de protecție al cablului de alimentare, cu legătură echipotențială la orice element metalic conex (fundație cu armătură, dacă este cazul). Cablurile subterane se pozează în șanț de cablu la adâncime minimă 0,80 m sub trotuar/acostament, protejate prin folie avertizoare și, la traversarea carosabilului (necesară pentru alimentarea stâlpilor de pe latura opusă la trecerea de la dispunere bilaterală la unilaterală, stationare 0+400), prin tub de protecție PVC/PEHD îngropat la adâncime minimă 1,00 m.

### D.6.3 Fișa stâlpului de iluminat și fundația

Stâlpul adoptat este de tip conic, oțel galvanizat, cu braț simplu (dispunere unilaterală) sau braț dublu la 0° (dispunere bilaterală alternantă, unde fiecare stâlp de pe câte o latură are un singur braț, dar poziționarea alternantă a stâlpilor de pe cele două laturi asigură acoperirea uniformă), verificat structural la încărcarea din vânt conform SR EN 40, cu fundație de beton (bloc prefabricat sau turnat monolit, dimensionat funcție de tipul de teren identificat de studiul geotehnic pe fiecare tronson) și șuruburi de ancoraj înglobate. Fiind amplasat, pe majoritatea traseului, în afara protecției unui parapet continuu (cap. D.4.4), stâlpul este certificat conform SR EN 12767 la categoria de performanță HE (high energy absorption), cu structura de bază proiectată să cedeze controlat (rupere la o secțiune slăbită prestabilită la baza stâlpului) la impactul unui vehicul, reducând severitatea consecinței unei ieșiri accidentale de pe carosabil.

---

## PTh-D.7 SCHEME DETALIATE DE EXECUȚIE — REȚELE EDILITARE RELOCATE

### D.7.1 Inventarul rețelelor existente afectate de modernizare

Lărgirea platformei la parametrii geometrici conformi categoriei III — colectoare (cap. general 1.6) — de la lățimea actuală de 5–6 m la lățimea de proiect de ordinul 9,00 m (2 benzi × 3,50 m + acostamente/trotuare, cap. general 4.2) — intersectează, pe porțiuni ale traseului, rețele edilitare existente, amplasate istoric în interiorul amprizei disponibile fără o coordonare unitară cu un profil transversal modern. Inventarul rezultat din ridicarea topografică și din avizele de amplasament ale operatorilor de utilități (obținute prin Certificatul de Urbanism, cap. general 2.1) identifică:

| Rețea | Operator | Poziție actuală | Conflict cu profilul de proiect | Soluție adoptată |
|---|---|---|---|---|
| Conductă de apă potabilă DN 110 PEHD | operator apă-canal local | sub acostament, latură stângă, km 0+050–0+400 | intră sub noul trotuar/rigolă | relocare laterală (D.7.2) |
| Conductă de gaze naturale DN 90 PE | distribuitor gaze local | subtraversare la km 0+620 (spre intersecția laterală) | traversează sub noul carosabil lărgit | verificare/reînnoire tub de protecție (D.7.2) |
| LEA JT aeriană 0,4 kV, 8 stâlpi lemn/beton | operator distribuție electrică | de-a lungul laturii drepte, km 0+000–0+700 | stâlpii intră în noua zonă de siguranță/acostament | relocare stâlpi (D.7.3) |
| Cablu telecom aerian (fibră optică + cupru) | operatori telecom (2 furnizori) | montat pe aceiași stâlpi LEA | relocat odată cu stâlpii, sau îngropat pe T1 | îngropare pe tronson urban T1, relocare aeriană pe T2–T4 |
| Canalizare menajeră existentă DN 250 beton | operator apă-canal local | sub carosabilul existent, km 0+000–0+400 | adâncime insuficientă față de noua structură rutieră | verificare acoperire, eventuală coborâre locală |

### D.7.2 Soluțiile de relocare/subtraversare pe fiecare rețea

**Conducta de apă potabilă DN 110** se relochează lateral, în afara amprizei noului trotuar/rigolă, pe un traseu paralel decalat cu 1,5 m față de poziția actuală, la adâncime de acoperire minimă 1,20 m (peste adâncimea de îngheț STAS 1709), cu vane de secționare la capetele tronsonului relocat pentru a permite lucrarea fără întreruperea alimentării pe restul rețelei — lucrare executată și recepționată de operatorul apă-canal, pe baza proiectului de relocare avizat, înaintea demarării terasamentelor pe tronsonul respectiv (condiționare de succesiune a execuției, cap. D.14).

**Conducta de gaze naturale DN 90**, care subtraversează deja traseul la stationarea 0+620 (sub intersecția laterală), rămâne pe poziție, dar tubul de protecție existent se verifică și, dacă starea tehnică sau adâncimea de acoperire nu mai corespund noii structuri rutiere (încărcare din trafic mai mare la clasa tehnică IV consolidată), se înlocuiește cu un tub de protecție nou, oțel, cu diametru care asigură un joc minim de 5 cm față de conducta activă, prelungit cu minimum 1 m dincolo de limitele amprizei carosabilului pe fiecare parte, conform STAS 9312 (subtraversări de căi de comunicație de către conducte). Lucrarea se execută sub supravegherea directă a distribuitorului de gaze și face obiectul unei faze determinante distincte (cap. D.16), dat fiind riscul asociat unei conducte de gaz active.

**Stâlpii LEA JT** de pe latura dreaptă (8 bucăți, km 0+000–0+700) se relochează în afara noii zone de siguranță a drumului (cap. general 3.2, cap. D.T.A.C. 6.2 — interval 2–4 m de la marginea carosabilului), pe un aliniament decalat, cu fundații noi și racorduri aeriene refăcute, lucrare coordonată cu operatorul de distribuție electrică (proiect de relocare distinct, avizat conform NTE 007 și PE 106), executată **înaintea** oricărei lucrări de terasamente pe tronsonul afectat, pentru a nu bloca ulterior accesul utilajelor de terasamente/structură rutieră. Pe tronsonul urban T1, unde rețeaua de iluminat public nou proiectată (PTh-D.6) este oricum subterană, se optează, suplimentar relocării simple, pentru **îngroparea integrală** a cablului telecom aerian existent, coordonată cu operatorii telecom, eliminând complet stâlpii aerieni pe acest tronson și integrându-i vizual/funcțional în profilul urban modernizat (soluție consecventă cu absența oricărui stâlp cedant suplimentar necesar doar pentru susținerea unui cablu telecom pe tronsonul urban).

**Canalizarea menajeră existentă DN 250** se verifică la adâncimea de acoperire față de noua structură rutieră (grosime totală sistem rutier + eventuale straturi de fundație suplimentare, memoriul de structură rutieră); dacă acoperirea rezultată scade sub minimul admis pentru protecția conductei la încărcarea din trafic, se procedează fie la o coborâre locală a canalizării pe tronsonul afectat, fie la o protecție suplimentară (dală de repartizare a încărcării deasupra conductei), decizie luată punctual, pe baza releveului exact al adâncimii existente, confirmat de operatorul apă-canal.

### D.7.3 Coordonarea execuției rețelelor relocate cu programul general de lucrări

Succesiunea de execuție a relocărilor de rețele edilitare condiționează direct programul general de execuție a lucrărilor de drum: nicio lucrare de terasamente sau de structură rutieră nu poate demara pe un tronson unde rețelele existente afectate nu au fost relocate și recepționate de operatorul respectiv, întrucât o eventuală avariere accidentală a unei rețele active (conductă de apă, gaz sau cablu electric) în timpul execuției ar produce, pe lângă riscul de siguranță imediat, întreruperi de serviciu la utilizatorii deserviți și întârzieri semnificative ale programului general de execuție. Graficul de execuție (piesă a documentației economice a proiectului) reflectă această condiționare, alocând relocărilor de rețele o poziție de fază premergătoare explicită pe fiecare tronson afectat.

---

## PTh-D.8 SCHEME DETALIATE DE EXECUȚIE — SISTEME DE TRANSPORT INTELIGENT (ITS)

### D.8.1 Arhitectura sistemului ITS adoptat

Pentru un drum de clasă tehnică IV, categorie funcțională III — colectoare, cu traficul de perspectivă calculat (1.111 vehicule etalon/24h, cap. general 1.6), un sistem ITS complex (management activ de bandă, semnalizare variabilă pe toate tronsoanele, control adaptiv de semafoare în cascadă) nu este proporțional cu profilul de trafic al drumului și nu se justifică tehnic sau economic — motiv pentru care soluția ITS adoptată la faza PTh este una **proporțională și modestă**, limitată la trei funcții cu utilitate directă pentru administratorul drumului și pentru siguranța circulației: (1) **contorizarea și clasificarea traficului**, pentru monitorizarea continuă a evoluției traficului real față de prognoza de perspectivă adoptată la D.T.A.C. (cap. general 1.8), utilă pentru fundamentarea unei eventuale reîncadrări tehnice la finalul orizontului de proiectare; (2) **supravegherea video** a punctelor cu risc identificat (intersecția de la 0+620, zona podețului PD-2); (3) **informarea variabilă** a conducătorilor auto la intrarea în tronsonul urban T1, unde profilul de trafic (accese riverane, trecere de pietoni) impune o atenționare suplimentară față de semnalizarea fixă.

```
Senzor contorizare trafic (radar Doppler, km 0+500) ──┐
Cameră supraveghere intersecție (km 0+620) ───────────┼─► Cutie de conexiuni ITS (km 0+620)
Cameră supraveghere podeț PD-2 (km 0+780) ────────────┘         │
                                                                  ├─► Modem/router GPRS-4G (comunicație)
Panou cu mesaj variabil VMS (km 0+000, intrare tronson T1) ──────┘         │
                                                                  └─► Dispecerat administrator drum (la distanță)
```

### D.8.2 Amplasarea echipamentelor

**Senzorul de contorizare a traficului** — tip radar Doppler cu clasificare pe categorii de vehicule (ușoare/grele, similar structurii de trafic folosite la calculul coeficientului de echivalare, cap. general 1.6), amplasat pe un stâlp dedicat la stationarea 0+500 (punct reprezentativ, la mijlocul tronsonului curent T2, fără influența directă a intersecției sau a zonei urbane), alimentat din circuitul de iluminat C3 (PTh-D.6.2) și conectat la modemul de comunicație din cutia ITS de la 0+620.

**Camerele de supraveghere video** — 2 puncte: la intersecția de la km 0+620 (monitorizare a conflictelor de circulație pe drumul secundar, coroborat cu indicatorul de cedare a trecerii IV-06 și cu marcajul transversal aferent), și la podețul PD-2, km 0+780 (monitorizare a stării tehnice a lucrării de artă și a zonei cu parapet H2, punct sensibil identificat la cap. D.4). Ambele camere sunt de tip IP, cu iluminare IR pentru funcționare nocturnă, alimentate din circuitele de iluminat adiacente (C3, respectiv C4).

**Panoul cu mesaj variabil (VMS)** — amplasat la intrarea în tronsonul urban T1 dinspre extravilan (stationare 0+000, complementar indicatorului fix IV-01), capabil să afișeze mesaje configurabile de la dispecerat (limitare de viteză temporară, avertizare condiții meteo/lucrări, informare stare trafic), util în special pe durata fazelor de execuție descrise la D.5.3 și, ulterior recepției, pentru gestionarea evenimentelor ocazionale (accidente, intervenții de întreținere) fără a necesita montarea unei semnalizări temporare fizice pentru fiecare eveniment minor.

### D.8.3 Schema de comunicații și integrare cu dispeceratul administratorului drumului

Toate echipamentele ITS converg către o cutie de conexiuni unică, amplasată la stationarea 0+620 (punct central al traseului, minimizând lungimile de cablu de la fiecare echipament), echipată cu un modem/router de comunicație GPRS/4G (soluție adoptată în locul unei fibre optice dedicate, disproporționată ca investiție pentru volumul de date generat de acest sistem ITS modest), care transmite datele de trafic, imaginile video și starea de funcționare a fiecărui echipament către dispeceratul administratorului drumului (UAT-ul, conform beneficiarului identificat la cap. general 1.3), printr-o platformă software compatibilă cu sistemele deja utilizate de administrator pentru alte tronsoane din rețeaua proprie — condiție de interoperabilitate verificată explicit la avizul administratorului drumului (cap. D.T.A.C. 13), pentru a evita achiziționarea unui sistem ITS izolat, incompatibil cu practicile de monitorizare deja adoptate la nivelul rețelei administrate. Alimentarea electrică a cutiei de conexiuni ITS beneficiază de un mic UPS local (autonomie ≥ 30 minute), suficient pentru a menține transmisia de date pe durata unei eventuale întreruperi scurte a alimentării generale, fără a justifica o alimentare de rezervă permanentă (grup electrogen), disproporționată pentru criticitatea reală a acestui sistem (spre deosebire, de exemplu, de alimentarea de rezervă a sistemelor de siguranță la incendiu ale unei clădiri).

---

## PTh-D.9 PROTECȚIA CATODICĂ A ELEMENTELOR METALICE ÎNGROPATE CONEXE

### D.9.1 Identificarea elementelor supuse coroziunii

Structura rutieră și lucrările de artă tratate în prezentul supliment (podețe PD-1/PD-2, timpane, aripi, radiere) sunt executate din beton armat, material la care agresivitatea eventuală a apei subterane sau a solului asupra armăturii — identificată de studiul geotehnic (cap. general 2.4) — se tratează prin măsuri pasive incluse în proiectarea betonului (clasă de expunere adecvată, grosime de acoperire cu beton a armăturii, eventual aditivi inhibitori de coroziune), nu printr-o protecție catodică activă, soluție rezervată, în practica curentă, structurilor metalice îngropate sau parțial îngropate expuse direct electrolitului din sol. Pe traseul modernizat, elementele care intră efectiv în această categorie și impun o evaluare a necesității protecției catodice sunt: **conducta de gaze naturale DN 90 PE** care subtraversează drumul la km 0+620 (materialul PE nu necesită protecție catodică, fiind un polimer neconductor, dar **tubul de protecție metalic** care o înveleşte la subtraversare, dacă este din oțel conform soluției adoptate la D.7.2, intră în categoria elementelor expuse coroziunii); și, dacă soluția finală de execuție a stâlpilor de iluminat sau a fundațiilor de parapet include elemente metalice îngropate direct în contact cu solul (fără protecție de beton), aceste elemente se evaluează similar.

### D.9.2 Soluția adoptată — protecție pasivă și, punctual, anozi de sacrificiu

Pentru **tubul de protecție metalic al subtraversării de gaz** (km 0+620), soluția adoptată este dublă: (1) protecție pasivă prin înveliș anticoroziv aplicat în uzină pe suprafața exterioară a tubului (bandă termocontractabilă sau înveliș epoxidic, conform STAS 6395), care izolează electric metalul de electrolitul din sol pe cea mai mare parte a suprafeței; (2) completată, acolo unde continuitatea electrică a tubului de protecție este confirmată de distribuitorul de gaze și unde rezistivitatea solului identificată de studiul geotehnic indică un risc de coroziune electrochimică relevant (sol cu rezistivitate sub pragul de atenție uzual de aproximativ 50 Ω·m, care favorizează formarea de pile de coroziune), cu un **anod de sacrificiu din magneziu**, dimensionat la breviarul de la D.9.3, conectat electric la tubul de protecție printr-un cablu de continuitate, într-o cutie de test/măsură amplasată la suprafață, care permite verificarea periodică a potențialului de protecție fără excavare.

Fundațiile stâlpilor de iluminat și ale parapetelor, fiind integral înglobate în beton (fără porțiuni metalice expuse direct solului dincolo de conexiunea la priza de pământ), nu necesită protecție catodică activă — priza de pământ proprie a fiecărui stâlp (cap. D.6.2) rămâne o măsură de protecție împotriva electrocutării, distinctă funcțional de protecția catodică împotriva coroziunii, și nu se substituie una alteia.

### D.9.3 Breviar de calcul al protecției catodice cu anod de sacrificiu

Pentru anodul de sacrificiu asociat tubului de protecție al subtraversării de gaz (lungime protejată ≈ 15 m, diametru tub protecție Ø160 mm, suprafață exterioară expusă S ≈ π × 0,160 × 15 ≈ 7,5 mp), curentul de protecție necesar se estimează pe baza densității de curent de protecție uzuale pentru oțel îngropat cu înveliș anticoroziv de bună calitate (densitate reziduală, ținând cont de eficiența învelișului de peste 95%, de ordinul **i_p ≈ 0,05–0,1 mA/mp** aplicată suprafeței neacoperite/defectelor de înveliș, estimată acoperitor la 2% din suprafața totală, adică S_defect ≈ 0,15 mp, la o densitate de curent pentru oțel neacoperit direct expus de ordinul **20 mA/mp**):

**I_necesar = S_defect × i_p_neacoperit = 0,15 × 20 = 3,0 mA**

Capacitatea de curent a unui anod de sacrificiu din magneziu de dimensiuni comerciale uzuale (masă ≈ 5–7 kg, capacitate electrochimică practică ≈ 1.100 Ah/kg, randament de utilizare ≈ 50% pentru magneziu) furnizează, pe durata de viață proiectată (adoptată 20 ani, corelată cu durata de exploatare așteptată a subtraversării de gaz): capacitate utilă ≈ 6 kg × 1.100 × 0,5 = 3.300 Ah, care, distribuită pe 20 ani (175.200 ore), permite un curent mediu debitat de **3.300/175.200 ≈ 18,8 mA** — valoare mult superioară curentului necesar calculat (3,0 mA), confirmând că un singur anod de sacrificiu de dimensiune comercială standard este larg acoperitor pentru protecția acestui tub de protecție de lungime redusă, cu marjă suficientă pentru variații ale rezistivității solului pe durata de exploatare. Verificarea periodică a potențialului de protecție (măsurat față de electrod de referință Cu/CuSO₄ la cutia de test) se include în programul de întreținere al distribuitorului de gaze, cu prag de acceptare a potențialului de protecție conform SR EN ISO 12696/practicii curente pentru protecția catodică a conductelor de gaz (potențial structură-sol mai negativ decât −850 mV față de electrodul de referință).

---

## PTh-D.10 BREVIAR COMPLET DE CALCUL — SCURGEREA APELOR (NOD CU NOD)

### D.10.1 Calcul hidraulic canalizare pluvială urbană (Manning, pe tronsoane între cămine)

Verificarea capacității colectorului pluvial al tronsonului T1 (cap. D.3.1) se realizează cu formula Manning, adaptată la conducta circulară parțial plină (coeficient de rugozitate PVC/PP n = 0,010, superior netezimii betonului adoptat la șanțurile deschise, cap. D.T.A.C. 3.1), verificând, pe fiecare tronson între cămine, atât capacitatea la umplere de calcul (h/D ≤ 0,70, prag uzual pentru canalizare gravitațională, care lasă o rezervă de aerisire și de siguranță peste nivelul de calcul), cât și viteza de autocurățire (v ≥ 0,7 m/s, prag mai exigent decât la șanțurile deschise, cap. D.T.A.C. 5.2, dat fiind accesul mai dificil pentru curățare):

| Tronson (cămine) | Debit cumulat Q (l/s) | Ø adoptat | Pantă i | Q_capabil (h/D=0,70, l/s) | v (m/s) | Verificare |
|---|---|---|---|---|---|---|
| CV-1 → CV-2 (GS-1) | 3,2 | DN 315 | 0,4% | 118 | 0,95 | satisfăcută, marjă largă |
| CV-2 → CV-3 (+GS-2) | 6,8 | DN 315 | 0,4% | 118 | 1,05 | satisfăcută |
| CV-3 → CV-4 (+GS-3) | 10,4 | DN 315 | 0,4% | 118 | 1,15 | satisfăcută |
| CV-4 → CV-5 (+GS-4,5) | 17,6 | DN 315 | 0,4% | 118 | 1,30 | satisfăcută, aproape de recomandarea de schimbare Ø |
| CV-5 → CV-6 (+GS-6,7, Ø crescut) | 24,8 | DN 400 | 0,4% | 205 | 1,05 | satisfăcută, marjă largă după creșterea diametrului |
| CV-6 → CV-7 (+GS-8) | 28,4 | DN 400 | 0,4% | 205 | 1,10 | satisfăcută |
| CV-7 → CV-8 (+GS-9,10) | 35,8 | DN 400 | 0,4% | 205 | 1,20 | satisfăcută, racord la separator (D.3.5) |

Debitul total cumulat la capătul aval al colectorului (35,8 l/s) este comparabil, ca ordin de mărime, cu debitul de calcul obținut prin metoda rațională aplicată direct suprafeței întregului tronson T1 (0,28 ha × 130 l/s·ha × 0,8 × 0,90 ≈ 26,2 l/s, cap. D.3.5) majorat cu marja acoperitoare aplicată individual fiecărei guri de scurgere (cap. D.3.1) — diferența dintre cele două metode de însumare (debit direct pe suprafața totală, respectiv sumă a debitelor acoperitoare per gură de scurgere) este așteptată și se explică prin marja de siguranță aplicată individual fiecărei guri, conform practicii curente de proiectare a canalizării pluviale urbane, unde dimensionarea pe tronsoane succesive include, la fiecare punct de racord, o rezervă suplimentară față de simpla însumare aritmetică a debitelor amonte.

### D.10.2 Calcul hidraulic șanțuri — verificare pe tronsonul Ș-2 (panta cea mai mare)

Tronsonul Ș-2 (km 0+550–0+700, panta longitudinală 0,7%, identificat la D.3.2 ca fiind cel mai apropiat de pragul superior de atenție privind viteza) se verifică explicit, reluând secțiunea trapezoidală betonată standard (b = 0,40 m, h_u = 0,30 m, m = 1, n = 0,015, identică cu exemplul D.T.A.C. cap. 3.4):

- A = (0,40 + 1×0,30) × 0,30 = **0,210 mp** (identică cu D.T.A.C., secțiunea nu se modifică)
- P = 0,40 + 2×0,30×√2 = **1,249 m**
- R = 0,210/1,249 = **0,168 m**
- Q_cap = (1/0,015) × 0,210 × 0,168^(2/3) × 0,007^(1/2) = 66,67 × 0,210 × 0,303 × 0,0837 = **0,356 mc/s = 356 l/s**

**Verificare capacitate:** Q_cap = 356 l/s ≫ Q_calcul ≈ 15 l/s (debit de tronson curent, cap. D.T.A.C. 2.3) — satisfăcută cu marjă largă, similar tronsonului de referință D.T.A.C.

**Verificare viteză:** v = Q_cap/A = 0,356/0,210 = **1,70 m/s** — situată confortabil între pragul de autocurățire (~0,4 m/s) și pragul de eroziune al betonului (~6 m/s), confirmând că panta de 0,7% adoptată pe acest tronson, deși cea mai mare de pe traseu, rămâne bine sub pragul de la care ar deveni necesară introducerea unor praguri de rupere a pantei (prag orientativ ~4%, cap. D.T.A.C. 3.4) — soluție care nu este, prin urmare, necesară pe niciun tronson al traseului modernizat.

### D.10.3 Calcul podețelor — PD-1 și PD-2, complet

**PD-1 (Ø600 mm)** — verificare la formula de curgere prin orificiu înecat (cap. D.T.A.C. 4.2), cu sarcină hidraulică la intrare H estimată la 0,35 m (podeț de mici dimensiuni, sub un acces lateral, cu bazin de colectare redus) și μ = 0,7:

- A = π × 0,6²/4 = **0,283 mp**
- Q = 0,7 × 0,283 × √(2×9,81×0,35) = 0,7 × 0,283 × 2,619 = **0,519 mc/s = 519 l/s**

Debit capabil (519 l/s) larg superior debitului de calcul al rigolei de acostament pe care o traversează (~5 l/s, corespunzător unei suprafețe de bazin foarte reduse aferente unui singur acces lateral) — diametrul de Ø600 rezultă, ca la exemplul D.T.A.C., din pragul minim practic de mentenanță (peste minimul de Ø500, cap. D.T.A.C. 4.3), nu din necesitatea hidraulică strictă.

**PD-2 (Ø800 mm)** — identic ca secțiune cu exemplul verificat la D.T.A.C. cap. 4.2 (Q_cap = 1,10 mc/s la H = 0,5 m, μ = 0,7), reconfirmat la faza PTh cu sarcina hidraulică reală estimată din profilul talvegului natural la acest punct (H ≈ 0,55 m, ușor superioară exemplului D.T.A.C., dat fiind bazinul de drenaj natural mai extins al talvegului traversat față de un simplu șanț rutier):

- Q = 0,7 × 0,503 × √(2×9,81×0,55) = 0,7 × 0,503 × 3,286 = **1,157 mc/s = 1.157 l/s**

Valoare confirmată superioară exemplului D.T.A.C. (1.100 l/s), cu marjă suplimentară justificată de sarcina hidraulică reală mai mare — verificare satisfăcută pentru orice debit de vârf plauzibil al talvegului natural la frecvența de calcul adoptată (1/1–1/2 ani, cap. D.T.A.C. 2.4). **Radierul antiafuiere** de la ieșirea PD-2 (lungime 3,0 m, cap. D.3.3) se dimensionează pentru viteza de ieșire din secțiunea îngustată a podețului, v_ieșire = Q/A = 1,157/0,503 = **2,30 m/s**, superioară vitezei naturale de curgere estimate în talveg (~0,8–1,0 m/s) — diferența de energie cinetică justifică lungimea de protecție adoptată, cu pereu din piatră brută rostuit, verificat la rezistența la eroziune a materialului pentru viteze de acest ordin (sub pragul de eroziune al pereului din piatră, cap. D.T.A.C. 3.1, ~ordinul a 3-4 m/s pentru piatră brută rostuită cu mortar).

### D.10.4 Calcul separator hidrocarburi

Debitul de calcul determinat la D.3.5 (Q = 28 l/s) determină, conform SR EN 858-1, clasa dimensională a separatorului prin relația de dimensionare tipică NS (debit nominal de proiectare, l/s) — pentru clasa I (concentrație reziduală ≤ 5 mg/l la ieșire, cerută pentru evacuare directă în emisar natural sau în rețea cu cerințe de calitate ridicate, spre deosebire de clasa II, ≤100 mg/l, acceptabilă doar pentru evacuare în rețea de canalizare unitară cu tratare ulterioară), se adoptă un separator cu **NS 40** (rotunjire acoperitoare peste debitul de calcul de 28 l/s, conform gamei standard de produse certificate SR EN 858), echipat cu by-pass integrat pentru debitele care depășesc capacitatea nominală (evenimente peste frecvența de calcul, cap. D.3.5). Volumul decantorului de nămol amonte (2.000 l, cap. D.3.5) se verifică la o frecvență de golire recomandată de minimum 2 ori pe an (sau la atingerea a 50% din volumul util, conform indicației senzorului de nivel al separatorului), pentru a menține eficiența de reținere a sedimentelor grosiere proiectată.

### D.10.5 Calcul bazin de retenție

Volumul util al bazinului de retenție de la capătul colectorului pluvial T1 (cap. D.3.5) se dimensionează pentru laminarea debitului de vârf de calcul (35,8 l/s, cap. D.10.1) la un debit de evacuare reglementat către emisarul natural, plafonat, conform practicii curente de limitare a debitului specific evacuat de suprafețe nou impermeabilizate/modernizate, la valoarea de **Q_evac ≤ 15 l/s** (comparabilă cu debitul unui tronson curent de drum nemodernizat, cap. D.T.A.C. 2.3, principiu care evită agravarea condițiilor de scurgere în aval față de situația preexistentă modernizării). Volumul de laminare necesar se estimează printr-o hidrografă triunghiulară simplificată a evenimentului de calcul (durată egală cu timpul de concentrare al bazinului de 0,28 ha, estimat la ordinul a 10–12 minute pentru un bazin urban de această mărime):

**V_retenție ≈ ½ × (Q_intrare − Q_evacuare) × t_concentrare = ½ × (35,8 − 15) × 660 s ≈ 6.864 litri ≈ 6,9 mc**

Se adoptă, cu marjă de siguranță față de aproximarea simplificată a hidrografei triunghiulare (care subestimează, de regulă, volumul real necesar pentru ploi cu durată diferită de timpul de concentrare), un bazin de retenție cu **volum util de 12 mc**, echipat cu un dispozitiv de reglare a debitului de evacuare (vortex sau orificiu calibrat, dimensionat pentru a limita evacuarea la 15 l/s indiferent de nivelul de umplere din bazin, similar principiului aplicat sistemului sifonic de acoperiș descris ca reper la alte tipuri de investiții din biblioteca de memorii — aici aplicat, analog, la scara unui bazin de retenție rutier).

---

## PTh-D.11 BREVIAR COMPLET DE CALCUL — ILUMINAT PUBLIC (METODA LUMINANȚEI, SR EN 13201-3)

### D.11.1 Date de intrare

Clasa de iluminat adoptată la D.T.A.C. (M3: L_med ≥ 1,0 cd/mp, U_o ≥ 0,40, TI ≤ 15%, cap. D.T.A.C. 10.1-10.2) constituie ținta de verificare pentru fiecare configurație geometrică distinctă identificată la PTh-D.6.1: dispunerea bilaterală alternantă pe tronsonul urban T1 (interax 32 m, H = 9,0 m) și dispunerea unilaterală pe tronsoanele curente T2–T4 (interax 36 m, H = 8,0 m). Corpurile de iluminat adoptate sunt de tip LED stradal, cu flux luminos nominal Φ = 12.000 lm (putere absorbită ≈ 90 W, eficiență ≈ 133 lm/W, corespunzătoare tehnologiei LED actuale pentru iluminat stradal de clasă M3), temperatură de culoare 4000 K, distribuție fotometrică de tip semicutoff (limitare a emisiei către unghiuri joase, reducând componenta de orbire directă, coerentă cu cerința TI ≤ 15%, cap. D.T.A.C. 10.2), factor de întreținere adoptat MF = 0,80 (acoperitor pentru degradarea fluxului luminos și murdărirea difuzorului pe durata de exploatare între două cicluri de curățare/mentenanță).

### D.11.2 Calculul fotometric pe tronsonul tip urban (T1, bilateral alternant)

Pentru dispunerea bilaterală alternantă, cu interax e = 32 m și lățime de carosabil efectivă w = 7,0 m (2 benzi × 3,50 m, categoria III colectoare, cap. general 1.6, 3.5), luminanța medie rezultată se estimează prin metoda coeficienților de utilizare (raportul dintre fluxul util incident pe suprafața carosabilului și fluxul total emis de corpul de iluminat), aplicată conform practicii de calcul SR EN 13201-3:

**L_med = (Φ × η_u × MF) / (w × e)**

unde η_u (coeficientul de utilizare, funcție de distribuția fotometrică a corpului adoptat și de raportul H/w) se adoptă, pentru configurația geometrică de mai sus (H/w = 9,0/7,0 ≈ 1,29, tipic pentru corpuri semicutoff pe carosabil de lățime medie), la valoarea **η_u ≈ 0,42** (proporția din fluxul emis care ajunge efectiv pe suprafața carosabilului, restul fiind direcționat către trotuar/spații verzi laterale sau pierdut către cer, în limitele impuse de distribuția semicutoff):

L_med = (12.000 × 0,42 × 0,80) / (7,0 × 32) = 4.032 / 224 = **1,80 cd/mp**... 

Rezultatul brut al formulei simplificate de mai sus supraestimează luminanța reală (metoda coeficientului de utilizare este o aproximare de ordin de mărime, nu un calcul punct-cu-punct pe grila de calcul cerută de SR EN 13201-3 pentru verificarea finală, care rămâne în sarcina proiectantului de specialitate cu software dedicat de calcul luminotehnic, pe baza curbei fotometrice exacte a corpului de iluminat ofertat de furnizor); reținând totuși ordinul de mărime rezultat (**L_med estimat ≈ 1,3–1,8 cd/mp** după aplicarea unui factor de corecție conservator de 0,7–0,8 pentru diferența dintre metoda simplificată și calculul punct-cu-punct), concluzia calculului preliminar este că **puterea și interaxul adoptate acoperă larg pragul minim al clasei M3 (1,0 cd/mp)**, cu o marjă care va absorbi, la calculul final de execuție (efectuat obligatoriu cu fișierul fotometric IES/LDT al corpului de iluminat efectiv ofertat), eventualele diferențe reale față de valorile estimate ale coeficientului de utilizare. **Uniformitatea generală U_o**, pentru dispunerea bilaterală alternantă la acest interax, se situează tipic în intervalul 0,40–0,50 pentru corpuri semicutoff moderne (peste pragul minim cerut de 0,40), datorită suprapunerii conurilor de iluminare de pe cele două laturi ale carosabilului, care compensează reciproc zonele mai slab iluminate de la mijlocul distanței dintre stâlpii de pe aceeași latură.

### D.11.3 Calculul fotometric pe tronsonul tip curent (T2–T4, unilateral)

Pentru dispunerea unilaterală, interax e = 36 m, H = 8,0 m, lățime carosabil w = 7,0 m (identică pe tronsonul curent), raportul H/w = 8,0/7,0 ≈ 1,14, coeficient de utilizare adoptat η_u ≈ 0,38 (ușor inferior configurației urbane, dispunerea unilaterală acoperind eficient doar o parte a lățimii carosabilului, cu o cădere de luminanță mai accentuată spre latura opusă stâlpilor):

L_med (estimat, aceeași metodologie) = (12.000 × 0,38 × 0,80) / (7,0 × 36) ≈ 3.648/252 ≈ **1,45 cd/mp brut**, corectat conservator la **≈ 1,0–1,3 cd/mp** — rezultat care confirmă, cu o marjă mai redusă decât pe tronsonul urban (coerent cu interaxul mai mare de 36 m adoptat aici, cap. D.6.1), respectarea pragului minim al clasei M3, dar impune o atenție sporită la calculul final de execuție: dacă fișierul fotometric real al corpului ofertat produce o marjă insuficientă la verificarea punct-cu-punct, soluția de corecție este reducerea interaxului spre 32–34 m pe acest tronson (nu o schimbare a clasei de iluminat sau a tipului de corp), opțiune care rămâne deschisă proiectantului de execuție fără a afecta restul breviarelor din prezentul document. **Uniformitatea U_o** pentru dispunerea unilaterală la interax 36 m este parametrul cel mai sensibil al acestei configurații (tipic 0,35–0,45 pentru corpuri semicutoff moderne la acest raport e/H ≈ 4,5) — verificarea finală la calculul punct-cu-punct, cu fișierul fotometric real, este **obligatorie** pentru acest tronson, cu opțiunea de reducere a interaxului menționată mai sus disponibilă dacă rezultatul calculat scade sub pragul de 0,40.

### D.11.4 Calculul electric al rețelei de iluminat — cădere de tensiune pe circuite

Verificarea căderii de tensiune pe cel mai lung circuit (C5, stâlpii T4, cap. D.6.2), cu 5 puncte luminoase de 90 W fiecare (curent nominal per punct ≈ 0,40 A la 230 V, cosφ ≈ 0,95 pentru drivere LED moderne), cablu ACYAbY 4×10 mmp, distanța totală de la TDI la ultimul stâlp ≈ 550 m (lungime cumulată a tronsoanelor T1–T4 până la capătul circuitului C5):

Puterea cumulată a circuitului C5 = 5 × 90 W = 450 W; curent de calcul I ≈ 450/(230×0,95) ≈ **2,06 A**. Căderea de tensiune, aproximată pentru o rețea cu sarcini distribuite uniform pe lungimea circuitului (aproximare uzuală: sarcina echivalentă concentrată la jumătatea lungimii totale pentru un calcul acoperitor):

**Δu% = (2 × ρ × L_echiv × I × cosφ) / (S × U) × 100**

cu ρ = 0,0225 Ω·mmp/m (aluminiu), L_echiv ≈ 275 m (jumătate din 550 m, aproximare sarcină distribuită), S = 10 mmp, U = 230 V:

Δu% = (2 × 0,0225 × 275 × 2,06 × 0,95) / (10 × 230) × 100 = 24,24/2.300 × 100 ≈ **1,05%**

Valoare larg sub pragul admis de 3% pentru circuite de iluminat (conform practicii curente I7, aplicabilă și rețelelor de iluminat public), confirmând că secțiunea de 10 mmp adoptată pe circuitele C3–C5 este acoperitoare chiar și pentru cel mai lung și mai încărcat traseu al rețelei. Circuitele C1–C2 (tronsonul urban T1, secțiune 4×16 mmp, cu un număr mai mare de puncte luminoase dar lungime totală mai mică, ≤ 400 m), verificate similar, rezultă cu o cădere de tensiune de ordinul 0,8–1,0%, de asemenea larg sub prag.

---

## PTh-D.12 BREVIAR COMPLET DE CALCUL — SIGURANȚA CIRCULAȚIEI

### D.12.1 Energia de impact și alegerea nivelului de reținere pe fiecare tronson

Aplicând relația de la cap. D.T.A.C. 6.4 (E_c = ½·M·v²·sin²α) pentru un vehicul de masă M = 1.500 kg (autoturism, masa de test standardizată pentru nivelurile N1/N2/H1), la viteza de circulație reală estimată pe tronsonul T3 (Vp = 60 km/h ≈ 16,7 m/s, cu o reducere prudentă la viteza de impact plauzibilă de ~80% din Vp pentru un vehicul care își pierde parțial controlul înainte de impact, ≈ 13,3 m/s) și un unghi de impact standard de test α = 20°:

**E_c = ½ × 1.500 × 13,3² × sin²(20°) = ½ × 1.500 × 176,9 × 0,117 ≈ 15.530 J ≈ 15,5 kJ**

Această valoare, comparată cu energia de impact certificată pentru nivelul N2 (ordinul a 40–50 kJ la testul standardizat conform SR EN 1317-2) și pentru H1 (ordinul a 120–130 kJ, testat cu vehicul de masă superioară, autobuz/camion ușor), confirmă că nivelul **N2/H1 adoptat pe tronsonul T3** oferă o marjă confortabilă pentru energia de impact plauzibilă a unui autoturism la viteza de proiectare a sectorului, marjă care acoperă și scenariul, statistic mai rar dar posibil pe acest tronson, al unui vehicul comercial ușor sau al unui unghi de impact ușor superior celui standard de test. La podețul PD-2, unde elementul rigid al structurii impune nivelul H2 (cap. D.4.1), energia de test standardizată corespunzătoare (ordinul a 400 kJ, testată cu vehicul greu conform SR EN 1317-2) este disproporționat de superioară energiei de impact plauzibile a unui autoturism izolat, dar justificată de scenariul de proiectare relevant pentru acest punct — nu impactul lateral obișnuit, ci impactul frontal/oblic direct cu structura rigidă a podețului, unde consecința unei eventuale penetrări (cădere în talveg, coliziune cu timpanul de beton) este disproporționat de gravă indiferent de masa vehiculului implicat, motiv pentru care alegerea nivelului de reținere la structuri se face pe criteriul consecinței, nu doar pe cel al energiei cinetice medii statistice (principiu deja enunțat la cap. D.T.A.C. 6.1).

### D.12.2 Lungimea de tranziție și zona de deformare (AND 594)

Lungimea de tranziție adoptată la cap. D.4.1 (15 m pentru fiecare din cele două tranziții P-2, P-4) rezultă din practica de aplicare AND 594 a SR EN 1317, care recomandă o lungime de tranziție proporțională cu diferența de rigiditate dintre cele două niveluri racordate și cu viteza de proiectare a tronsonului — o tranziție prea scurtă ar produce o schimbare bruscă de rigiditate a sistemului de reținere, cu risc de agățare a vehiculului sau de transmitere necontrolată a unei părți din energia de impact către racordul dintre cele două tipuri de parapet, în timp ce o tranziție excesiv de lungă ar reprezenta un cost nejustificat de material și montaj fără un beneficiu de siguranță proporțional. Lungimea de 15 m adoptată, la o viteză de proiectare de 60 km/h, corespunde unei distanțe de parcurgere de aproximativ 0,9 secunde la viteza de proiectare — interval suficient, conform practicii curente, pentru ca rigiditatea sistemului să crească gradual pe parcursul unei distanțe percepute de conducătorul auto ca o continuitate a parapetului, nu ca un punct singular de schimbare.

### D.12.3 Verificarea terminațiilor și atenuatoarelor

Terminațiile ancorate în teren de la capetele P-1 și P-5 (lungime 4–6 m, cap. D.4.3) se verifică la certificarea de produs a furnizorului pentru nivelul de reținere N2/H1 al tronsonului adiacent — o terminație testată doar pentru un nivel inferior (de exemplu N1) nu poate fi montată la capătul unui tronson de nivel N2/H1, întrucât ar constitui, ea însăși, un punct slab al sistemului de reținere continuu. Atenuatorul de impact redirecțional de la stationarea 0+765 (cap. D.4.3) se verifică la lungimea de lucru minimă necesară pentru disiparea energiei de impact calculate la D.12.1 (E_c ≈ 15,5 kJ pentru un autoturism la viteza de proiectare), certificarea de produs a furnizorului confirmând, pentru clasa de atenuator adoptată, o capacitate de disipare superioară acestei valori la distanța de lucru de minimum 6 m specificată în caietul de sarcini (PTh-D.14), cu marjă suplimentară pentru scenariul unui vehicul de masă ușor superioară celei standard de calcul.

---

## PTh-D.13 FIȘE TEHNICE DE ECHIPAMENTE

### D.13.1 Stâlp de iluminat public

| Parametru | Valoare |
|---|---|
| Tip | conic, oțel galvanizat la cald, braț simplu sau dublu la 0° |
| Înălțime | 8,0 m (tronsoane curente) / 9,0 m (tronson urban) |
| Grosime perete țeavă | conform calcul static la vânt (SR EN 40), verificat de furnizor pentru zona eoliană a amplasamentului |
| Certificare impact | SR EN 12767, categorie HE (high energy absorption) |
| Fundație | bloc de beton prefabricat sau turnat, dimensionat funcție de categoria de teren (studiu geotehnic) |
| Protecție anticorozivă | zincare la cald ≥ 80 μm + vopsire poliesterică opțională |
| Priză de pământ | R_p ≤ 4 Ω, verificată individual la fiecare stâlp |

### D.13.2 Corp de iluminat LED stradal

| Parametru | Valoare |
|---|---|
| Flux luminos nominal | 12.000 lm |
| Putere absorbită | ≈ 90 W |
| Eficiență | ≥ 130 lm/W |
| Temperatură de culoare | 4000 K |
| Distribuție fotometrică | semicutoff, fișier IES/LDT furnizat de producător pentru calculul final |
| Grad de protecție | IP66 |
| Factor de întreținere adoptat | MF = 0,80 |
| Telegestiune | modul integrat, protocol compatibil cu platforma administratorului drumului |
| Durată de viață declarată (L80B10) | ≥ 50.000 ore |

### D.13.3 Indicator de semnalizare verticală

| Parametru | Valoare |
|---|---|
| Suport | tablă de oțel/aluminiu, conform formă/dimensiune SR 1848-1 pe categorie |
| Folie retroreflectorizantă | clasa 2 (HI) traseu curent / clasa 3 (DG) puncte de risc special |
| Stâlp de susținere | oțel galvanizat, certificat SR EN 12767 categoria LE |
| Înălțime montare | 1,50–2,20 m (extravilan) / ≥ 2,50 m (urban), conform poziției din tabelul D.5.1 |

### D.13.4 Parapet metalic N2/H1 și H2

| Parametru | N2/H1 (traseu curent) | H2 (la podeț) |
|---|---|---|
| Profil | glisieră dublu val | profil întărit / mixt metal-beton |
| Stâlpi susținere | U/C, interax 2,0 m (1,33 m la tranziții) | ancorare directă în structura de beton |
| Înălțime montare | 0,75 m | conform detaliu furnizor, testat pentru H2 |
| Certificare | SR EN 1317-2, nivel N2/H1 testat | SR EN 1317-2, nivel H2 testat |
| Terminații | ancorate în teren, certificate pentru nivelul adiacent | atenuator de impact dedicat la capătul dinspre trafic |

### D.13.5 Gură de scurgere carosabilă

| Parametru | Valoare |
|---|---|
| Ramă și grătar | clasa C250 (SR EN 124), zonă carosabilă/rigolă de bordură |
| Componente | sifon + depozit sedimente |
| Racord | PVC-KG DN 200, pantă minimă 2%, lungime max. 8 m |

### D.13.6 Separator de hidrocarburi

| Parametru | Valoare |
|---|---|
| Clasă | I (concentrație reziduală ≤ 5 mg/l), cu by-pass integrat |
| Debit nominal (NS) | NS 40 |
| Decantor de nămol amonte | volum util 2.000 l |
| Senzor de nivel hidrocarburi | cu alarmă la panou local |
| Normă | SR EN 858-1/-2 |

### D.13.7 Echipamente ITS

| Echipament | Parametru |
|---|---|
| Senzor contorizare trafic | radar Doppler, clasificare pe categorii vehicule, precizie ≥ 95% |
| Cameră supraveghere | IP, iluminare IR, retenție înregistrări ≥ 14 zile |
| Panou cu mesaj variabil (VMS) | matrice LED, mesaj configurabil de la distanță, IP65 |
| Modem/router comunicație | GPRS/4G, UPS local ≥ 30 min autonomie |

---

## PTh-D.14 CAIET DE SARCINI — TEHNOLOGIE DE MONTAJ

### D.14.1 Șanțuri, rigole și canalizare pluvială

Execuția șanțurilor betonate începe cu trasarea axului și a nivelmentului conform profilului longitudinal de proiect, verificat topografic la fiecare punct de schimbare de declivitate (toleranță de execuție a pantei de fund ≤ ±0,5 cm pe 10 m lungime, prag care, la panta minimă de 0,5% adoptată, nu produce contrapante locale — cap. D.T.A.C. 3.6). Cofrajul se montează pe toată lungimea tronsonului de turnare (interval corelat cu poziția rosturilor de dilatare, 6 m, cap. D.3.2), cu verificare a pantei longitudinale prin nivelă sau stație totală înainte de turnarea betonului. Betonul de căptușeală se pune în operă la clasa minimă specificată în piesele desenate, cu vibrare corespunzătoare pentru evitarea segregării (care ar crește rugozitatea reală peste valoarea n = 0,015 presupusă în calcul, cap. D.T.A.C. 3.6), și se protejează la întărire (stropire/prelată) minimum 7 zile în condiții climatice normale. Rosturile se taie/formează la interval de 6 m, cu bandă de etanșare dacă proiectul de execuție o prevede. Colectorul pluvial (tuburi PVC/PP SN8) se pozează pe un pat de nisip/balast de 10–15 cm, compactat, cu verificare a pantei la fiecare tronson între cămine înainte de acoperire (fază determinantă, cap. D.16), îmbinările efectuându-se prin mufe cu garnitură de etanșare, conform instrucțiunilor de montaj ale producătorului. Căminele de vizitare și gurile de scurgere se montează pe fundație de beton de egalizare, cu ramele/capacele aduse exact la cota finală a carosabilului/trotuarului rezultată din profilul transversal de execuție, evitându-se atât o cotă superioară (obstacol pentru trafic/pietoni) cât și una inferioară (punct de acumulare a apei).

### D.14.2 Podețe

Execuția podețelor tubulare începe cu săparea gropii de fundație la cotele și pantele de proiect, urmată de un pat de nisip/balast compactat pe care se așază tubul prefabricat, verificat la pantă și la aliniament înainte de acoperire. Timpanele și aripile se toarnă din beton armat conform detaliilor de execuție, cu armătura verificată în raport cu planul de armare înainte de turnare (fază determinantă). Umplerea laterală și superioară a tubului se execută în straturi succesive de maximum 20–30 cm, compactate simetric pe ambele părți ale tubului (pentru a evita deplasarea/deformarea acestuia prin compactare asimetrică), până la atingerea gradului de compactare cerut pentru patul drumului deasupra podețului (cap. general 3.6, aplicat identic deasupra lucrărilor de artă). Radierul antiafuiere se execută ultimul, după finalizarea umpluturilor, pentru a nu fi afectat de traficul utilajelor de compactare.

### D.14.3 Parapete și glisiere

Montajul stâlpilor de susținere ai glisierei se execută prin batere directă în teren (unde studiul geotehnic confirmă un teren compatibil cu această tehnologie) sau prin fundație punctuală de beton (unde terenul o impune), la interax și adâncime de înfigere conforme fișei tehnice a sistemului certificat (cap. D.13.4) — o abatere de la adâncimea de înfigere certificată de furnizor invalidează, de fapt, certificarea de performanță la impact a întregului sistem, întrucât testele de omologare SR EN 1317 sunt efectuate pentru o configurație completă (stâlpi + glisieră + interax + adâncime de fundare), nu doar pentru componenta de glisieră izolat. Glisiera se montează cu suprapunerea panourilor în sensul de circulație (marginea din aval a unui panou peste marginea din amonte a următorului, astfel încât un impact tangențial să nu găsească o muchie proeminentă expusă), cu toate șuruburile de îmbinare strânse la cuplul de moment specificat de furnizor. La podețul PD-2, ancorarea parapetului H2 direct în structura de beton a timpanelor/aripilor se execută conform detaliului de execuție al furnizorului certificat pentru acest nivel, cu poziționarea prealabilă a piesele înglobate (dacă soluția o prevede) în cofrajul de beton al structurii, înainte de turnare — condiție de succesiune care impune coordonarea strictă a graficului de execuție între lucrarea de artă și montajul parapetului.

### D.14.4 Semnalizare verticală și orizontală

Fundațiile stâlpilor de indicatoare se execută la adâncimea și dimensiunea specificate de fișa tehnică a stâlpului cedant (cap. D.13.3), cu verificare a verticalității înainte de întărirea betonului. Panourile se montează la înălțimea și poziționarea laterală specificate în tabelul D.5.1, cu orientare perpendiculară pe axul drumului (sau ușor rotită, conform practicii curente, pentru a reduce reflexia directă a farurilor înapoi spre conducătorul auto). Marcajele orizontale se aplică pe carosabil curat și uscat, la temperatura minimă specificată de producătorul materialului (vopsea sau termoplastic), cu respectarea grosimii de film specificate (care condiționează direct durabilitatea și retroreflectorizanța rezultată) și cu trasare prealabilă precisă (șablon sau mașină de trasat cu ghidaj laser/GPS) pentru respectarea exactă a lungimilor și ritmurilor specificate la D.5.2.

### D.14.5 Iluminat public

Șanțurile de cablu se sapă la adâncimea specificată (0,80 m sub trotuar/acostament, 1,00 m la traversările de carosabil), cu pat de nisip la fundul șanțului, pozarea cablului, protecția prin folie avertizoare de culoare distinctă poziționată la 20–30 cm deasupra cablului (semnalizare pentru orice săpătură ulterioară în zonă) și acoperire în straturi compactate. Fundațiile stâlpilor se execută conform fișei tehnice (D.13.1), cu șuruburile de ancoraj poziționate precis (șablon de montaj) înainte de turnarea betonului. Racordul electric al fiecărui stâlp se execută în cutia de conexiuni de la baza acestuia, cu verificarea continuității conductorului de protecție și a prizei de pământ individuale înainte de punerea sub tensiune. Corpurile de iluminat se montează pe brațul stâlpului la unghiul de înclinare specificat de calculul fotometric de execuție (cap. D.11), o abatere a unghiului de montaj față de proiect putând modifica semnificativ luminanța și uniformitatea rezultate față de calculul teoretic.

### D.14.6 Rețele edilitare relocate

Orice lucrare de relocare a unei rețele edilitare active (apă, gaz, electrică) se execută exclusiv sub coordonarea și, după caz, supravegherea directă a operatorului rețelei respective, cu întreruperea temporară programată și comunicată în avans utilizatorilor afectați, conform procedurilor proprii ale fiecărui operator. Racordurile provizorii (dacă etapizarea execuției o impune, pentru menținerea serviciului pe durata relocării) se execută conform soluțiilor tehnice avizate de operator, cu demontarea lor și racordul definitiv la rețeaua relocată confirmate printr-un proces-verbal de recepție parțială pe fiecare rețea, condiție de demarare a lucrărilor de terasamente pe tronsonul respectiv (cap. D.7.3).

### D.14.7 Sisteme ITS

Montajul senzorilor de contorizare, al camerelor și al panoului cu mesaj variabil se execută pe stâlpi/suporturi dedicate (sau pe stâlpii de iluminat existenți, dacă poziția și capacitatea portantă o permit, confirmate de calculul structural al stâlpului la sarcina suplimentară), cu cablarea de comunicație și de alimentare pozată în același șanț de cablu cu rețeaua de iluminat, unde traseul este comun, pentru evitarea unei săpături suplimentare independente. Configurarea și testarea funcțională a fiecărui echipament (verificarea imaginii video, a preciziei de contorizare, a afișajului panoului VMS) se execută înainte de conectarea la platforma de comunicație a dispeceratului, iar integrarea finală cu platforma administratorului drumului (cap. D.8.3) se confirmă printr-un test de comunicație end-to-end, documentat în procesul-verbal de PIF al sistemului ITS (cap. D.15).

---

## PTh-D.15 PROGRAMUL DE PROBE ȘI VERIFICĂRI — PIF

| Instalație/element | Probă/verificare | Normă | Criteriu de admisie | Responsabil |
|---|---|---|---|---|
| Pat de fundare șanțuri/podețe | verificare grad de compactare | STAS 2914 | ≥ 95–98% Proctor Modificat, funcție de adâncime | RTE + laborator autorizat |
| Colector pluvial (înainte de acoperire) | verificare pantă și aliniament | SR EN 752 / SR 1846 | conform proiect, toleranță ≤ ±0,5 cm/10m | RTE + diriginte de șantier |
| Colector pluvial (etanșeitate) | probă de etanșeitate (apă sau aer, funcție de material) | SR EN 1610 (practică curentă) | fără scăderi de presiune peste pragul admis pe durata probei | RTE + comisie de recepție |
| Cămine de vizitare | verificare etanșeitate rosturi, cotă capac | SR 1846 | fără infiltrații vizibile, cotă la nivelul carosabilului ±0 cm | RTE |
| Șanțuri betonate | verificare geometrie secțiune, pantă, rosturi | prezentul PTh D.3.2, D.10.2 | conform breviar, rosturi la interval 6 m intacte | diriginte de șantier |
| Podețe (fază ascunsă) | verificare poziționare tub, armătură timpane/aripi | prezentul PTh D.3.3, D.10.3 | conform detaliu execuție, înainte de acoperire | RTE — fază determinantă |
| Separator hidrocarburi | probă de etanșeitate + verificare funcțională by-pass | SR EN 858 | fără scurgeri, by-pass funcțional la debit de test | furnizor + RTE |
| Bazin de retenție | verificare volum util și funcționare dispozitiv de reglare debit | prezentul PTh D.10.5 | debit evacuat ≤ 15 l/s la nivel de calcul | RTE |
| Parapete (montaj) | verificare interax stâlpi, adâncime fundare, cuplu strângere șuruburi | fișa tehnică furnizor + SR EN 1317 | conform certificare de produs, fără abateri | furnizor + diriginte de șantier |
| Parapete (certificare produs) | verificare existență certificat de conformitate SR EN 1317 pe lot | SR EN 1317-1/-2/-5 | certificat valabil pentru nivelul montat (N2/H1/H2) | comisie de recepție |
| Semnalizare verticală | verificare poziție, înălțime, clasă folie | SR 1848-1 + tabel D.5.1 | conform tabel, toleranță ±5 cm poziție, ±10 cm înălțime | diriginte de șantier |
| Semnalizare orizontală | grosime film, retroreflectorizanță R_L, antiderapare SRT | SR 1848-7 | R_L ≥ 150 mcd/mp/lx, SRT ≥ 45 | laborator autorizat |
| Iluminat public — fotometrie | măsurare luminanță medie, uniformitate, TI pe teren | SR EN 13201-4 | L_med ≥ 1,0 cd/mp, U_o ≥ 0,40, TI ≤ 15% | laborator autorizat |
| Iluminat public — priză de pământ | măsurare rezistență de dispersie pe fiecare stâlp | STAS 2612 | R_p ≤ 4 Ω | electrician autorizat ANRE |
| Iluminat public — cădere de tensiune | măsurare tensiune la ultimul punct al fiecărui circuit | I7 (practică curentă) | Δu ≤ 3% | electrician autorizat |
| Rețele edilitare relocate | proces-verbal de recepție parțială pe fiecare rețea | proceduri proprii operator | conform aviz operator, fără scurgeri/defecte | operator rețea + RTE |
| Protecție catodică (tub protecție gaz) | măsurare potențial structură-sol la cutia de test | SR EN ISO 12696 | potențial ≤ −850 mV față de Cu/CuSO₄ | distribuitor gaze + RTE |
| Sistem ITS | test funcțional complet (contorizare, video, VMS) + test comunicație | fișa tehnică echipament + protocol dispecerat | funcționare conformă + comunicație confirmată cu dispeceratul | integrator ITS + administrator drum |
| Semnalizare temporară de șantier | verificare conformitate plan aprobat, pe fiecare fază | cap. D.5.3 | conform plan avizat de administrator drum + Poliția Rutieră | diriginte de șantier + Poliția Rutieră |

Toate probele de mai sus se consemnează prin procese-verbale individuale, anexate la Cartea Tehnică a Construcției, iar cele marcate ca **fază determinantă** (patul de fundare al șanțurilor/podețelor, poziționarea tubului/armăturii podețelor înainte de acoperire, relocarea rețelelor de gaz active) se verifică obligatoriu cu participarea Inspectoratului de Stat în Construcții și/sau a reprezentantului operatorului de rețea, după caz, conform legislației în vigoare privind calitatea în construcții.

---

## PTh-D.16 PLANUL DE CONTROL AL CALITĂȚII ȘI FAZELE DETERMINANTE

Planul de Control al Calității (PCC), piesă obligatorie a documentației PTh conform practicii curente de execuție a lucrărilor de construcții, organizează verificările din tabelul PTh-D.15 pe trei niveluri de control — **controlul de calitate al furnizorului** (certificate de conformitate, fișe tehnice, rapoarte de testare de fabrică pentru fiecare echipament/material: tuburi de canalizare, parapete, corpuri de iluminat, indicatoare, materiale de marcaj), **controlul de calitate al execuției** (verificările curente ale dirigintelui de șantier, pe fiecare etapă de montaj, conform caietului de sarcini de la PTh-D.14) și **controlul de recepție** (verificările finale, cu participarea comisiei de recepție, a Inspectoratului de Stat în Construcții acolo unde este cazul, și a operatorilor de rețele/administratorului drumului pentru componentele care le privesc direct). Fazele determinante explicite ale prezentului supliment sunt: (1) patul de fundare al șanțurilor și al podețelor, înainte de turnarea betonului/pozarea tubului; (2) poziționarea armăturii timpanelor și aripilor podețelor, înainte de turnare; (3) poziționarea și pantele colectorului pluvial, înainte de acoperire; (4) relocarea conductei de gaze naturale la subtraversarea de la km 0+620, cu participarea distribuitorului; (5) ancorajele parapetului la structura podețului PD-2, înainte de acoperirea/finisarea zonei; (6) fundațiile stâlpilor de iluminat și prizele de pământ individuale, înainte de montarea corpurilor de iluminat; (7) integrarea și testul de comunicație al sistemului ITS cu dispeceratul administratorului drumului. Fiecare fază determinantă se consemnează printr-un proces-verbal semnat de responsabilul tehnic cu execuția (RTE) atestat, condiție prealabilă continuării lucrărilor pe faza următoare.

---

## PTh-D.17 CONCLUZII

Prezentul supliment de fază PTh a dus la nivel de execuție întreaga echipare funcțională a sectorului de drum de 1,00 km tratată la nivel de concept și de dimensionare preliminară în memoriul D.T.A.C. de instalații (`instalatii.md`): **scurgerea apelor** — plan complet de canalizare pluvială pe tronsonul urban T1 (10 guri de scurgere, 8 cămine de vizitare, colector DN315→DN400, verificat nod cu nod prin formula Manning cu marje de capacitate și viteză confirmate), șanțuri trapezoidale betonate pe tronsoanele curente T2–T4 (verificare explicită a tronsonului cu panta cea mai mare, Ș-2 la 0,7%, v = 1,70 m/s în intervalul admis), două podețe dimensionate individual (PD-1 Ø600 la km 0+230, PD-2 Ø800 la km 0+780, cu radier antiafuiere verificat la viteza de ieșire calculată), dren subteran pe tronsonul cu nivel freatic ridicat, separator de hidrocarburi clasa I (NS 40) și bazin de retenție (12 mc, debit evacuat plafonat la 15 l/s) la capătul colectorului urban; **siguranța circulației** — parapete poziționate pe stationări exacte (N2/H1 pe 90 m de traseu curent, H2 pe 30 m la podețul PD-2, cu 30 m de tranziții progresive și un atenuator de impact dedicat), energia de impact verificată explicit (≈15,5 kJ pentru autoturism la Vp, sub capacitatea certificată N2/H1); **semnalizarea** — 10 indicatoare verticale poziționate cu cod SR 1848-1, înălțime și clasă de folie, plan de marcaje orizontale pe 7 tronsoane corelate cu vizibilitatea la depășire, fazare completă a semnalizării temporare de șantier pe 4 etape; **iluminatul public** — dispunere pe 32 de stâlpi LED (13 bilateral pe tronsonul urban, 19 unilateral pe tronsoanele curente), calcul fotometric preliminar confirmând clasa M3 pe ambele configurații geometrice (cu recomandarea explicită de verificare finală punct-cu-punct pe tronsonul curent, unde marja este mai redusă), rețea electrică verificată la cădere de tensiune (≤1,05% pe cel mai lung circuit); **rețelele edilitare relocate** — inventar complet al celor cinci rețele afectate (apă, gaz, LEA JT, telecom, canalizare menajeră) cu soluție de relocare/subtraversare pe fiecare, coordonată explicit cu succesiunea generală de execuție; **sistemele ITS** — arhitectură proporțională cu profilul de trafic al drumului (contorizare, 2 camere, 1 panou VMS), integrată cu dispeceratul administratorului drumului; și **protecția catodică** a tubului de protecție metalic al subtraversării de gaz, dimensionată cu anod de sacrificiu din magneziu, cu marjă largă față de curentul de protecție calculat.

Toate breviarele prezentate la capitolele PTh-D.10–D.12 se supun verificării tehnice de calitate de către verificatori atestați pe cerințele Af (rezistență și stabilitate — structura rutieră, podețe, parapete) și Bf (siguranță în exploatare — geometrie, semnalizare, iluminat), precum și cerinței Ie (economie de energie) pentru componenta de iluminat public, conform legislației în vigoare privind calitatea în construcții (Legea 10/1995). Programul complet de probe și verificări (PTh-D.15) și Planul de Control al Calității cu fazele determinante explicite (PTh-D.16) condiționează, în succesiunea stabilită, recepția la terminarea lucrărilor — niciuna dintre componentele tratate în prezentul supliment nu se consideră finalizată fără procesul-verbal corespunzător fazei sale determinante, semnat de responsabilul tehnic cu execuția atestat și, unde este cazul, de operatorul de rețea sau de administratorul drumului direct implicat.
