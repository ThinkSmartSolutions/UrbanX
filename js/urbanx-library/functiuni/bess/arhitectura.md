# MEMORIU TEHNIC DE ARHITECTURĂ — DTAC

## PLATFORMĂ TEHNICĂ BESS (BATTERY ENERGY STORAGE SYSTEM) 25 MW / 50 MWh

*Documentație tehnică pentru obținerea autorizației de construire (D.T.A.C.), întocmită în conformitate cu Legea nr. 169/2026 (Codul amenajării teritoriului, urbanismului și construcțiilor — CATUC, în vigoare din 25.08.2026), art. 264, conținutul-cadru al pieselor scrise fiind cel prevăzut în anexa nr. 2 la lege. Prezentul memoriu tratează exclusiv componenta de arhitectură/amenajare a documentației pentru o platformă tehnică de stocare a energiei electrice în baterii (BESS), instalație fără personal permanent, la care arhitectura nu produce o „clădire" în sensul clasic, ci un **teren tehnic organizat** — o incintă în care compartimentarea, distanțele, accesele și materialele sunt dictate aproape în întregime de securitatea la incendiu și de logica fluxului energetic, nu de un program de utilizare umană. Datele de identificare a investiției, încadrarea urbanistică, necesitatea și oportunitatea proiectului, precum și arhitectura electrică propriu-zisă (BMS/EMS, protecții, racord SEN) se detaliază în memoriul tehnic general și în memoriul de instalații electrice + PSI, piese de referință pentru acele capitole, care nu se reproduc aici decât ca date de intrare strict necesare argumentării soluției de arhitectură.*

---

## 0. CUPRINS

1. Date generale și tema de proiectare
2. Amplasamentul — situația existentă, accese și orientare
3. Conceptul de amenajare — cele trei imperative
4. Programul funcțional general — fluxul energetic ca generator de plan
5. Amplasarea containerelor — layout și distanțe de siguranță
6. Arhitectura containerului ISO — tipologie, alcătuire, acces, marcaj
7. Platformele și fundațiile suport container
8. Zona de conversie și transformare — PCS și stația de racord
9. Cabina de comandă EMS/SCADA
10. Drumurile de acces și platforma de intervenție pentru pompieri
11. Împrejmuirea, protecția perimetrală și supravegherea video
12. Ventilația, climatizarea și managementul termic
13. Detecția și stingerea incendiului — interfața arhitecturală
14. Drenajul, sistemul de retenție a apelor de stingere și sistematizarea verticală
15. Finisajele și materialele de construcție
16. Accesibilitatea persoanelor cu mobilitate redusă
17. Integrarea peisagistică, impactul vizual și fonic
18. Semnalistica și marcajele de identificare a pericolului
19. Corelarea cu structura — coordonarea arhitectură–rezistență
20. Corelarea cu instalațiile — interfața arhitecturală
21. Securitatea la incendiu — filosofia arhitecturală a proiectului
22. Siguranța în exploatare
23. Dezafectarea, reciclarea bateriilor și ciclul de viață al instalației
24. Organizarea de execuție și etapizarea lucrărilor
25. Bilanțul de suprafețe, POT, CUT și indicatorii urbanistici
26. Formulele și indicatorii de sinteză ai proiectului de arhitectură
27. Lista pieselor desenate
28. Corelarea cu memoriile de specialitate și verificarea tehnică
29. Concluzii — cele șase cerințe fundamentale de calitate
30. Glosar de termeni și abrevieri

---

## 1. DATE GENERALE ȘI TEMA DE PROIECTARE

### 1.1. Identificarea investiției și obiectul memoriului

Prezenta documentație tratează, la faza D.T.A.C., proiectul de arhitectură/amenajare pentru o **platformă tehnică de stocare a energiei electrice în baterii litiu-fier-fosfat (LFP)**, cu o capacitate instalată de **25 MW putere / 50 MWh energie**, realizată prin **10 containere modulare de tip ISO 20'**, dispuse pe un teren de **~13.000 mp**, împreună cu infrastructura tehnică asociată: platforma de conversie (PCS — Power Conversion System), stația de transformare și racord la rețeaua electrică de distribuție/transport, cabina de comandă și supraveghere (EMS/SCADA), rezerva de apă pentru incendiu cu grupul de pompare, bazinul de retenție a apelor de stingere, drumurile de acces și de intervenție, împrejmuirea și amenajările peisagistice perimetrale.

Spre deosebire de o clădire civilă obișnuită, unde arhitectura organizează spațiul în jurul unui program de activitate umană (birou, locuință, sală de spital, cameră de hotel), o platformă BESS este, din perspectiva arhitecturii, un **exercițiu de organizare a distanțelor**: containerele care adăpostesc bateriile nu sunt, ele însele, obiect de proiectare de arhitectură (sunt produse industriale certificate, livrate complet echipate de producător), iar rolul arhitecturii se mută spre trei probleme cu adevărat determinante pentru siguranța și funcționarea instalației — poziționarea reciprocă a containerelor și a echipamentelor conexe, astfel încât un eveniment de incendiu la un container să nu se propage la vecinul său; organizarea circulațiilor astfel încât autospecialele de intervenție ale Inspectoratului pentru Situații de Urgență (ISU) să poată ajunge la orice punct al platformei din cel puțin două direcții; și tratarea anvelopei celor câteva construcții propriu-zise ale amplasamentului (cabina de comandă, eventualele cabine de echipamente electrice de medie tensiune) ca structuri rezistente la foc, capabile să izoleze un eveniment sever. Prezentul memoriu argumentează, capitol cu capitol, modul în care soluția de amenajare a incintei răspunde acestor trei probleme, corelat cu suprafețele, cu distanțele adoptate și cu cerințele normative aplicabile.

Memoriul general al investiției (piesă separată a documentației D.T.A.C.) tratează datele de identificare a beneficiarului și a amplasamentului, necesitatea și oportunitatea investiției din perspectiva pieței de energie (arbitraj, servicii de sistem, integrare regenerabile), încadrarea în certificatul de urbanism și lista avizelor necesare, inclusiv avizul de racordare la rețea. Memoriul de instalații electrice + PSI tratează arhitectura electrică propriu-zisă a instalației (ierarhia celulă→modul→rack→container→PCS→transformator→celulă de medie tensiune→racord), breviarul de calcul electric, sistemul de protecții, BMS/EMS/SCADA și partea de detecție/stingere a incendiului ca sistem tehnic. Prezentul memoriu de arhitectură nu reia acele date, ci le presupune cunoscute și se concentrează exclusiv pe soluția de amenajare: dispunerea în plan, distanțele, accesele, anvelopa construcțiilor tehnice, finisajele și integrarea în peisaj.

### 1.2. Tema de proiectare — cerințele beneficiarului și logica de proiectare

Tema de proiectare formulată de beneficiar (un dezvoltator/operator de instalații de stocare a energiei, care va opera platforma fără personal permanent pe amplasament, cu monitorizare și comandă de la distanță) solicită următoarele condiții de principiu, care guvernează întreaga soluție de arhitectură/amenajare:

Siguranța la incendiu ca prioritate absolută a proiectării, superioară oricărei considerații de compactare a amplasamentului sau de reducere a costului de amenajare — o cerință care, spre deosebire de o clădire civilă unde riscul de incendiu este un criteriu printre altele (alături de funcționalitate, confort, estetică), devine aici **criteriul dominant** al dispunerii în plan, întrucât bateriile litiu-ion, indiferent de chimia lor (LFP fiind chimia mai stabilă termic, dar nu imună la fenomenul de ambalare termică — thermal runaway), pot genera, în condiții de defect, un eveniment cu degajare de gaze inflamabile și toxice înaintea apariției flăcării vizibile, cu potențial de propagare în cascadă către containerele vecine dacă distanțele și compartimentarea nu sunt corect dimensionate.

Accesibilitate completă pentru intervenția în caz de incendiu, cu autospeciale ale ISU capabile să ajungă la orice container din **cel puțin două direcții**, condiție care elimină din capul locului orice soluție de amplasare „în bloc compact" a containerelor și impune un drum perimetral de tip inelar, cu posibilitate de ocolire completă a platformei.

Un flux tehnologic clar și unidirecțional al energiei — de la celula de baterie, prin modul, rack și container, către echipamentul de conversie (PCS), către transformator și, în final, către punctul de racord la rețea — flux care, deși este în esență o problemă electrică, are o consecință directă asupra amenajării: zonele funcționale (baterii, conversie, transformare, comandă) trebuie dispuse în succesiune logică, cu distanțe de separare corespunzătoare nivelului de risc al fiecăreia, nu într-o dispunere arbitrară dictată doar de forma parcelei.

O amprentă la sol minimă și un impact vizual/peisagistic redus, dat fiind caracterul de infrastructură tehnică al investiției, amplasată frecvent în zone extravilane sau la marginea intravilanului, unde integrarea în peisajul agricol sau semi-rural înconjurător este o condiție a acceptabilității sociale a proiectului, nu doar o cerință estetică formală.

### 1.3. Indicatori sintetici ai investiției

| Element | Valoare |
|---|---|
| Capacitate instalație | **25 MW / 50 MWh** |
| Configurație | **10 containere ISO 20'** LFP, 2 rânduri × 5 |
| Dimensiune container | **6,06 × 2,44 m, H 2,90 m** (ISO 20', gabarit exterior) |
| Amprentă cumulată containere | **~148 mp** (10 × ~14,8 mp) |
| Categoria de importanță | **C — normală** (HG 766/1997) |
| Clasa de importanță seismică | **III** (γ_I = 1,0) |
| Risc de incendiu | **MARE** (electrolit inflamabil, gaze de descompunere termică) |
| Suprafață teren | **~13.000 mp** |
| Suprafață construită convențională (Ac) | **~2.000 mp** (containere + platforme port-container + cabine tehnice) |
| POT | **~15,4%** |
| CUT | **~0,15** |
| Regim de înălțime construcții tehnice | **Parter tehnic** (H containere 2,90 m; cabină EMS similar) |
| Distanță minimă container-container | **≥3,0 m** (NFPA 855, în lipsa raportului UL 9540A specific) |
| Culoar de intervenție între rânduri | **≥6,0 m** |
| Randament round-trip (η_RT) | **~87-88,5%** (memoriul de instalații) |
| Personal permanent pe amplasament | **0** (operare/monitorizare de la distanță) |

Toți acești indicatori sunt cei stabiliți în memoriul general al investiției și în memoriul de instalații și se reiau aici doar ca reper numeric pentru argumentarea soluțiilor de arhitectură/amenajare din capitolele următoare; dimensionarea electrică nu se recalculează în prezentul memoriu.

### 1.4. Categoria și clasa de importanță — relevanța pentru arhitectură

**Categoria de importanță C** (normală, conform HG 766/1997) este cea adoptată pentru acest tip de instalație, întrucât platforma BESS nu adăpostește aglomerări de persoane și nu este o construcție cu funcțiuni speciale de importanță deosebită în sensul strict al categoriilor A sau B (nu este, de exemplu, un spital sau o clădire de importanță excepțională pentru apărarea civilă) — încadrarea corectă și motivarea integrală a categoriei de importanță se detaliază în memoriul general și, pentru componenta structurală, în memoriul de structură. **Clasa de importanță seismică III** (γ_I = 1,0, conform P100-1/2013) reflectă statutul de construcție tehnică obișnuită, fără factor de amplificare sau de reducere a acțiunii seismice de proiectare.

Ceea ce diferențiază fundamental această platformă de o construcție „normală" de categorie C nu este importanța socio-economică a instalației (care este, de altfel, ridicată — o platformă de 50 MWh contribuie semnificativ la stabilitatea rețelei electrice locale), ci **riscul de incendiu**, clasificat **MARE** din perspectiva reglementărilor P118, dat fiind conținutul energetic ridicat concentrat pe suprafață mică și natura specifică a fenomenului de ambalare termică a bateriilor litiu-ion. Această dualitate — categorie de importanță C, dar risc de incendiu MARE — este cea care justifică, arhitectural, tratamentul de excepție aplicat distanțelor, compartimentării și accesului de intervenție, tratate pe larg în capitolele 5, 10 și 21, tratament comparabil ca rigurozitate cu cel al unei construcții de categorie superioară, chiar dacă încadrarea formală rămâne C.

### 1.5. Cadrul normativ aplicabil arhitecturii/amenajării

Documentația de arhitectură respectă următoarele acte normative și standarde, listă neexhaustivă, aplicabile specific componentei de amenajare a incintei (cadrul normativ general — legile de bază, HG-urile privind categoriile de importanță, cadrul electric și de racordare — se detaliază în memoriul general și în memoriul de instalații):

- **Legea nr. 169/2026** (Codul amenajării teritoriului, urbanismului și construcțiilor — CATUC), art. 264, conținutul-cadru al documentației D.T.A.C. fiind cel din anexa nr. 2 la lege;
- **Legea nr. 169/2026** (CATUC), împreună cu **HG nr. 525/1996** (Regulamentul General de Urbanism) — pentru încadrarea POT/CUT, retrageri și regim de aliniere;
- **NFPA 855** — „Standard for the Installation of Stationary Energy Storage Systems" — reperul internațional de referință pentru distanțele de separare între unitățile de stocare, între acestea și limitele de proprietate, drumuri publice și construcții ocupate, în lipsa/completarea unui raport de testare specific;
- **UL 9540 / UL 9540A** — standardul de certificare a sistemului BESS ca ansamblu (9540), respectiv metodologia de testare a propagării termice în cascadă (9540A), ale cărei rezultate pot justifica, la faza de proiect tehnic, distanțe diferite de minimul conservator adoptat la faza D.T.A.C.;
- **NFPA 68 / NFPA 69** — ghidaj pentru ventilația de deflagrație (venting) și, respectiv, pentru prevenirea/atenuarea exploziei, relevante pentru poziționarea panourilor de suprapresiune ale containerelor;
- **EN 14994** — echivalentul european de dimensionare a suprafeței de ventilație a deflagrației, aplicat la faza de proiect tehnic pentru validarea soluției fiecărui producător de container;
- **IEC 62933 (seria, în special partea -5-2 privind siguranța)**, **IEC 62619** (cerințe de siguranță pentru celule și module Li-ion staționare) — cadrul internațional de siguranță a echipamentului electrochimic, relevant pentru arhitectură în măsura în care condiționează amplasarea și accesul la containere;
- **P118-1/2013, P118-2/2013, P118-3/2015** — securitatea la incendiu a construcțiilor (rezistență la foc, instalații de stingere, detecție/semnalizare), cadrul normativ național de referință pentru clasificarea riscului MARE și pentru dimensionarea distanțelor și a compartimentării;
- **Ordinul M.A.I. nr. 129/2016** — norme metodologice privind avizarea și autorizarea de securitate la incendiu, cu relevanță directă pentru gabaritul și portanța drumurilor de acces destinate autospecialelor ISU;
- **HG nr. 571/2016** — categoriile de construcții și amenajări care se supun avizării/autorizării privind securitatea la incendiu, cu încadrarea explicită a instalațiilor de stocare a energiei de această capacitate;
- **HG nr. 766/1997** — categoriile de importanță a construcțiilor, pentru stabilirea categoriei C;
- **P100-1/2013** — proiectare seismică, pentru clasa de importanță III și ancorarea seismică a containerelor la platformă;
- **NP 051/2012 (revizuit)**, coroborat cu **Legea nr. 448/2006** — accesibilitatea persoanelor cu handicap, aplicabilă în măsura permisă de caracterul tehnic/nemanat al instalației, tratată onest la capitolul 16;
- **Directiva 2006/66/CE** privind bateriile și acumulatorii, **OUG nr. 5/2015** (transpunerea națională) și **Regulamentul UE 2023/1542** privind bateriile și deșeurile de baterii — cadrul de reciclare și de gestionare a deșeurilor periculoase la sfârșitul duratei de viață a bateriilor (capitolul 23).

### 1.6. Descrierea sintetică a lucrărilor de arhitectură/amenajare

Lucrările propuse constau în amenajarea unei platforme tehnice pe un teren de ~13.000 mp, cuprinzând: 10 platforme/fundații de beton armat pentru containerele de baterii, dispuse în 2 rânduri de câte 5; o platformă similară pentru echipamentele de conversie (PCS) și pentru transformatorul de putere; o cabină/container de comandă EMS/SCADA; o rezervă de apă pentru incendiu cu grup de pompare aferent; un bazin de retenție a apelor de stingere contaminate; drumuri de acces și de intervenție, cu un traseu perimetral de tip inelar; împrejmuire perimetrală de securitate cu poartă carosabilă și pietonală; și o perdea vegetală perimetrală cu rol de integrare peisagistică, de atenuare vizuală și, secundar, fonică. Lucrările includ sistematizarea verticală a incintei (pante de scurgere, drenaj) și racordurile la utilitățile edilitare necesare (apă pentru incendiu, electricitate pentru servicii proprii, comunicații pentru SCADA), tratate în memoriul de instalații.

### 1.7. Corelarea cu certificatul de urbanism

Toate soluțiile de arhitectură/amenajare din prezenta documentație (regim de înălțime, retrageri, accese, POT/CUT) sunt conforme cu prevederile certificatului de urbanism emis pentru amplasament și cu avizele/acordurile solicitate prin acesta, listate exhaustiv în memoriul general. Retragerile adoptate față de limitele de proprietate — minimum egal cu distanța de siguranță față de containerul cel mai apropiat (capitolul 5), la care se adaugă lățimea drumului perimetral de intervenție — sunt cele confirmate prin certificatul de urbanism pentru zona funcțională în care se amplasează investiția (zonă de infrastructură tehnico-edilitară/energetică sau, după caz, zonă extravilan cu destinație agricolă schimbată punctual) și se preiau ca date de intrare pentru poziționarea containerelor pe parcelă, tratată în capitolul 5.

---

## 2. AMPLASAMENTUL — SITUAȚIA EXISTENTĂ, ACCESE ȘI ORIENTARE

### 2.1. Terenul și configurația parcelei

Terenul pe care se amenajează platforma BESS are o suprafață de **~13.000 mp**, o suprafață disproporționat de mare față de amprenta construită efectivă (~2.000 mp, capitolul 25), diferență care nu reprezintă risipă de teren, ci este consecința directă a logicii de proiectare descrise la capitolul 1: cea mai mare parte a suprafeței este ocupată nu de construcții, ci de **distanțele de siguranță** dintre containere, de drumurile de acces și de intervenție, de perdeaua vegetală perimetrală și de rezervele funcționale (bazin de retenție, extindere ulterioară). Un teren de configurație regulată, cu un raport lungime/lățime moderat, facilitează organizarea celor 10 containere în 2 rânduri paralele (capitolul 5) și a drumului perimetral inelar (capitolul 10); un teren excesiv de îngust sau cu o formă neregulată ar complica soluția de acces pe două laturi, condiție obligatorie pentru intervenția ISU.

Din punct de vedere topografic, se recomandă un teren plan sau cu pantă naturală redusă, permițând o cotă unică de referință pentru platformele containerelor, cu diferențieri minime de nivel doar în scopul asigurării pantelor de scurgere a apelor pluviale și a eventualelor ape de stingere (capitolul 14). Studiul geotehnic (piesă separată, anexă a documentației) confirmă natura terenului de fundare, presiunea convențională admisă și nivelul hidrostatic, date de intrare pentru memoriul de structură și pentru dimensionarea platformelor de fundație, care nu se recalculează aici.

### 2.2. Vecinătățile și caracterul zonei

Instalațiile BESS de această capacitate se amplasează, tipic, în zone cu caracter tehnic/industrial, în vecinătatea stațiilor electrice de transformare/racord la care se conectează, sau în zone extravilane/periurbane cu destinație agricolă sau de infrastructură tehnico-edilitară, unde vecinătățile nu prezintă, de regulă, funcțiuni sensibile precum locuințe individuale aflate la o distanță mai mică decât distanța de siguranță minimă adoptată. Certificatul de urbanism și studiul de vecinătăți (piese ale documentației) confirmă absența unor astfel de funcțiuni sensibile în perimetrul de referință; în situația în care o construcție ocupată (locuință, spațiu de birouri) se află în proximitate, distanța container–clădire ocupată se tratează cu exigența sporită descrisă la capitolul 5 (≥6,0–10,0 m, conform NFPA 855), iar dacă distanța reglementată nu poate fi asigurată în interiorul propriei parcele, soluția corectă este relocarea configurației containerelor, nu reducerea distanței sub pragul de siguranță.

### 2.3. Fluxurile de acces la incintă

Organizarea accesului la incintă urmează o logică simplificată față de o clădire civilă, dat fiind numărul redus de persoane care tranzitează amplasamentul (personal de mentenanță ocazională, echipe de intervenție ISU, eventual personal de pază), dar riguroasă din punctul de vedere al gabaritului vehiculelor care trebuie să o parcurgă:

**Accesul auto/tehnic principal**, poziționat pe latura cu front la drumul public existent, dimensionat pentru vehiculele de mentenanță (autoutilitare, macarale mobile pentru operațiuni de înlocuire container, dacă este cazul) și pentru autospecialele ISU, cu o poartă carosabilă de gabarit corespunzător lățimii utile a drumului de intervenție (capitolul 10).

**Accesul pietonal/personal**, distinct de poarta carosabilă principală, pentru intrarea ocazională a personalului de mentenanță și a personalului de pază, cu control de acces (card, cod, sau supraveghere de la distanță, detaliat în memoriul de instalații).

**Accesul secundar de intervenție**, pe o a doua latură a incintei, obligatoriu conform cerinței de acces al autospecialelor din cel puțin două direcții (capitolul 10), poate fi o poartă suplimentară în împrejmuire sau un traseu prin drumul perimetral care conectează cele două accese principale, soluție care evită dubla poartă dacă geometria terenului o permite.

Nu există, la o platformă BESS nemanată, un flux echivalent „aprovizionării" sau „fluxului de oaspeți" specific unei clădiri civile; singurul flux relevant, dincolo de cel tehnic descris mai sus, este cel al echipelor de mentenanță programată (verificări periodice BMS/EMS, curățare filtre HVAC, verificare instalație de detecție/stingere), care utilizează același acces auto/tehnic principal.

### 2.4. Orientarea și poziționarea în plan

Spre deosebire de o clădire civilă, unde orientarea cardinală influențează decisiv confortul termic și luminos interior, la o platformă BESS orientarea are o relevanță mai redusă asupra amenajării propriu-zise (containerele sunt echipate cu HVAC propriu, independent de orientare, capitolul 12), dar rămâne relevantă pentru două aspecte: expunerea solară directă a containerelor pe fațada cea mai însorită, care crește sarcina termică a instalației de climatizare (relevantă pentru dimensionarea HVAC, tratată la capitolul 12, unde se recomandă, acolo unde este posibil constructiv, protejarea suplimentară — copertine, vopsea reflectorizantă — a feței celei mai expuse, fără a afecta accesul la panourile de ventilație de deflagrație); și poziționarea cabinei de comandă EMS pe latura cu acces cel mai facil dinspre poarta principală, pentru operativitatea intervențiilor de mentenanță.

---

## 3. CONCEPTUL DE AMENAJARE — CELE TREI IMPERATIVE

### 3.1. Siguranța la incendiu, accesibilitatea de intervenție și fluxul tehnologic

Conceptul de amenajare al platformei se construiește pornind de la trei imperative care, spre deosebire de o clădire civilă (unde programul funcțional și expresia arhitecturală au greutate egală sau mai mare), domină aproape în întregime decizia de proiectare: **siguranța la foc** (distanțele anti-propagare validate, la minimum, conform NFPA 855, sau, dacă disponibil la faza de proiect tehnic, conform unui raport de testare UL 9540A specific configurației de container adoptate), **accesibilitatea de intervenție** (autospecialele ISU trebuie să poată ajunge la orice container din cel puțin două laturi, condiție care determină forma și traseul drumurilor interioare) și **fluxul tehnologic** (energia parcurge o secvență fixă baterie→PCS→transformator→racord, secvență care se reflectă spațial în succesiunea zonelor funcționale, capitolul 4). Rezultatul acestor trei imperative este o construcție joasă (parter tehnic pentru toate elementele — containere, cabină de comandă), cu un POT/CUT redus (capitolul 25), în care suprafața dominantă a incintei nu este ocupată de construcții, ci de circulații, de distanțele de protecție și de perimetrul vegetal (capitolul 17).

### 3.2. De ce nu o dispunere „compactă" a containerelor

Alternativa evidentă la dispunerea în două rânduri cu culoar de intervenție — o grupare compactă a celor 10 containere, în scopul minimizării suprafeței de teren ocupate — a fost respinsă din motive de siguranță care primează asupra oricărei economii de suprafață: o grupare compactă ar reduce distanțele dintre containere sub minimul de siguranță (favorizând propagarea în cascadă a unui eveniment de tip thermal runaway), ar face imposibilă intervenția directă a autospecialelor la fiecare container în parte (accesul „din exterior" către un grup compact permite doar atacul perimetral, nu și răcirea directă a fiecărei unități), și ar concentra sarcina termică radiantă a unui eventual incendiu într-o zonă mai restrânsă, cu efect amplificat asupra containerelor vecine. Soluția adoptată — 2 rânduri de câte 5 containere, cu un culoar de intervenție de minimum 6,0 m între rânduri și cu drum perimetral inelar în jurul întregii grupări — este cea recomandată de bunele practici internaționale (NFPA 855) pentru instalații de această capacitate, întrucât asigură simultan distanța de separare minimă, accesul de intervenție pe ambele fețe ale fiecărui rând și un traseu de evacuare/atac neîntrerupt în jurul întregii platforme.

### 3.3. Ierarhia de zonare — de la risc mare la risc redus

Organizarea în plan urmează, ca principiu secundar celor trei imperative de mai sus, o ierarhie de zonare pe niveluri de risc, similară — ca logică, nu ca conținut — gradientului de intimitate descris în proiectarea unei clădiri civile: zona de risc maxim (containerele de baterii, sursa potențială a unui eveniment de thermal runaway) este poziționată central în incintă, la distanță maximă posibilă de limitele de proprietate; zona de risc intermediar (PCS, transformator, celule de medie tensiune) este poziționată adiacent, dar separată prin distanțele minime de la capitolul 5; iar zona ocupată eventual de personal (cabina de comandă EMS, dacă este vizitată periodic) este poziționată la distanța cea mai mare posibilă față de sursa de risc, cu acces facil dinspre poarta principală, fără a fi nevoie să traverseze zona containerelor.

---

## 4. PROGRAMUL FUNCȚIONAL GENERAL — FLUXUL ENERGETIC CA GENERATOR DE PLAN

### 4.1. Secvența tehnologică și traducerea ei spațială

Programul funcțional al platformei nu se organizează, ca la o clădire civilă, pe zone de activitate umană, ci pe **secvența fizică a fluxului energetic**: energia electrică este stocată în celulele bateriei (grupate în module, racks și, în final, în cele 10 containere), este condiționată și convertită între curent continuu și curent alternativ de echipamentele PCS, este ridicată la nivelul de tensiune de medie tensiune de transformatorul de putere, și este evacuată către punctul de racord la rețeaua electrică prin celulele de medie tensiune ale stației de conexiune. Această secvență liniară — baterie → PCS → transformator → racord — detaliată electric în memoriul de instalații, se traduce spațial într-o succesiune de zone funcționale dispuse în plan, fiecare cu cerințe proprii de separare față de vecinele sale, tratate în tabelul de la 4.3.

### 4.2. Regula de bază — separarea pe niveluri de risc, nu pe fluxuri umane

Spre deosebire de o clădire civilă, unde regula de organizare este separarea fluxurilor umane (oaspete versus personal, la exemplul hotelier, sau aseptic versus septic, la exemplul spitalicesc), la o platformă BESS regula de organizare este **separarea pe niveluri de risc de incendiu**: containerele de baterii (risc maxim, sursă potențială de gaze inflamabile/toxice) sunt separate de zona de conversie/transformare (risc electric, dar fără riscul specific de ambalare termică electrochimică) prin distanțe minime, iar ambele sunt separate de zona ocupată eventual de personal (cabina EMS) prin distanța cea mai mare adoptată în proiect. Această separare nu este un moft de organizare, ci condiția de bază pentru limitarea propagării unui eveniment și pentru posibilitatea de izolare electrică rapidă (secționare, oprire BMS/EMS) a zonei afectate fără a compromite funcționarea restului instalației.

### 4.3. Distribuția funcțiunilor în plan — tabel sintetic

| Zonă | Conținut | Separare față de vecine | Poziție în incintă |
|---|---|---|---|
| Baterii | 10 containere LFP, 2 rânduri × 5 | Nucleu de risc — ≥3,0 m între containere + EI 120 la eventuale pereți despărțitori | Central, la distanță maximă de limite |
| Conversie (PCS) | Invertoare bidirecționale DC/AC | ≥3,0 m față de containerele de baterii | Adiacent zonei baterii, spre zona de racord |
| Transformare/racord | Transformator de putere MT + stație/celule MT | ≥3,0 m + separare la foc față de PCS și baterii | Adiacent PCS, spre limita cu punctul de racord |
| Comandă | Cabină/container EMS/SCADA | ≥6,0 m față de containerele de baterii (zonă ocupată eventual de personal) | Periferic, cu acces facil dinspre poarta principală |
| Utilități/incendiu | Rezervă de apă + grup de pompare + bazin de retenție | Periferic, fără a intra în distanțele de siguranță dintre containere | Periferic, aproape de drumul de acces pentru alimentarea autospecialelor |
| Circulații | Drum perimetral inelar + culoar de intervenție între rânduri | — | Înconjoară întreaga grupare de containere |

### 4.4. Fluxul de mentenanță — singurul flux uman relevant

Traseul tipic al unei echipe de mentenanță programată urmează secvența: **poartă acces auto/tehnic → drum perimetral → poziționare la containerul/echipamentul vizat → operațiune de verificare/înlocuire → revenire pe drumul perimetral**, fără a fi necesară, în operarea normală, deschiderea simultană a mai multor containere sau accesul în interiorul zonei de risc maxim decât pentru durata strict necesară intervenției programate, cu toate protocoalele de siguranță electrică (blocare/etichetare — lockout/tagout) aplicate conform procedurilor operatorului, detaliate în memoriul de instalații și în manualul de exploatare al instalației, nu în prezentul memoriu de arhitectură.

---

## 5. AMPLASAREA CONTAINERELOR — LAYOUT ȘI DISTANȚE DE SIGURANȚĂ

### 5.1. Configurația adoptată — 2 rânduri × 5 containere

Cele **10 containere ISO 20'** (6,06 × 2,44 m, H 2,90 m) se dispun în **2 rânduri de câte 5 containere**, cu ușile/hatch-urile de acces orientate spre culoarele de intervenție, astfel încât fiecare container să fie accesibil direct din culoar, fără a fi necesară ocolirea prin spatele rândului. Rândul A (containerele BAT1–BAT5) și rândul B (containerele BAT6–BAT10) sunt separate de un culoar de intervenție de minimum 6,0 m, dimensionat pentru gabaritul unei autospeciale de intervenție (capitolul 10), iar în interiorul fiecărui rând, containerele adiacente sunt separate prin distanța minimă de 3,0 m impusă de NFPA 855. Această configurație — repetitivă, modulară, cu o singură regulă de distanță aplicată consecvent — este soluția care minimizează riscul de eroare de amplasare și care permite, dacă instalația se extinde ulterior (adăugarea de containere suplimentare), replicarea directă a aceleiași grile de distanțe fără o reproiectare completă a incintei.

### 5.2. Tabelul de distanțe de siguranță — sinteză și fundamentare

| Distanță | Valoare adoptată | Bază normativă | Observații |
|---|---|---|---|
| Container ↔ container (același rând) | **≥3,0 m** | NFPA 855 §4.1, în lipsa raportului UL 9540A specific | Distanța minimă implicită, aplicabilă oricărui producător fără test de propagare dedicat |
| Container ↔ limită de proprietate | **≥6,0 m** | NFPA 855, dimensionat pe fluxul termic radiant | Distanță derivată din analiza de flux termic radiant conform metodologiei UL 9540A, adoptată conservativ |
| Container ↔ clădire ocupată (ex. cabina EMS) | **≥6,0–10,0 m** | NFPA 855 | Intervalul reflectă distincția între o zonă ocupată ocazional (limita inferioară) și una cu ocupare mai frecventă (limita superioară) |
| Container ↔ drum public | **≥3,0 m** | P118/RGU | Coroborat cu retragerea reglementată de certificatul de urbanism |
| Culoar de intervenție între rânduri | **≥6,0 m** | Ord. M.A.I. nr. 129/2016 | Dimensionat pe gabaritul de manevră al autospecialei de intervenție (capitolul 10) |
| PCS/transformator ↔ container de baterii | **≥3,0 m** | NFPA 855 | Separare între zona de risc electrochimic și zona de conversie/transformare |

### 5.3. Regula cheie — minimul conservator versus validarea UL 9540A

Regula fundamentală adoptată în prezentul proiect este următoarea: **în lipsa unui raport de testare UL 9540A specific configurației exacte de container și de chimie a bateriei furnizate**, se adoptă distanța minimă conservatoare de **3,0 m** între containere, conform NFPA 855 §4.1, distanță care reprezintă pragul general aplicabil oricărei instalații staționare de stocare, indiferent de producător. Standardul UL 9540A permite, prin testare specifică (propagarea termică între module/racks/containere, în condiții controlate de laborator), demonstrarea faptului că o configurație anume **nu propagă** fenomenul de ambalare termică între unități — situație în care distanțele pot fi, în anumite cazuri, reduse față de minimul conservator, cu condiția demonstrării riguroase a non-propagării fluxului termic și a gestionării în siguranță a gazelor de venting. La faza de proiect tehnic, se va solicita producătorului containerelor raportul UL 9540A aferent modelului exact contractat; **în absența acestuia, sau dacă acesta nu demonstrează non-propagarea, se menține distanța de 3,0 m lateral și de 6,0 m pe culoarul de intervenție**, adoptate deja la faza D.T.A.C. ca soluție conservatoare și validă independent de rezultatul testului.

### 5.4. Layout-ul complet al incintei

Organizarea de ansamblu, așa cum rezultă din capitolele 4 și 5, este: **rândul A (containerele BAT1–BAT5, cu distanță de 3,0 m între unități) — culoar de intervenție de 6,0 m — rândul B (containerele BAT6–BAT10)** — adiacent, spre limita dinspre punctul de racord, **zona PCS și transformator** (la distanță ≥3,0 m față de containerele de baterii) — **cabina de comandă EMS/SCADA**, poziționată periferic — **rezerva de apă pentru incendiu, grupul de pompare și bazinul de retenție a apelor de stingere**, poziționate periferic, aproape de drumul de acces — și, înconjurând întreaga grupare, **drumul de acces de la poartă și drumul perimetral inelar**, care asigură ocolirea completă a platformei pentru intervenția pe două laturi.

### 5.5. Rezerva de extindere

Deși nu este o cerință normativă explicită, buna practică de proiectare a platformelor BESS recomandă păstrarea, în cadrul incintei de 13.000 mp, a unei rezerve de teren neconstruite, dincolo de cea strict necesară distanțelor de siguranță curente, pentru o eventuală extindere ulterioară a capacității instalate (module/containere suplimentare), rezervă care, în prezentul proiect, se suprapune parțial cu zona perimetrală vegetală (capitolul 17), fără a compromite integritatea acesteia din urmă în configurația actuală a proiectului.

---

## 6. ARHITECTURA CONTAINERULUI ISO — TIPOLOGIE, ALCĂTUIRE, ACCES, MARCAJ

### 6.1. Containerul ca produs industrial certificat, nu ca obiect de proiectare de arhitectură

Cele 10 containere de baterii sunt produse industriale complet echipate, livrate de producător cu toate componentele integrate (rack-uri de baterii, sistem HVAC propriu, sistem de detecție și stingere a incendiului, panouri de ventilație a deflagrației, tablou de conexiuni electrice), certificate conform standardelor de siguranță aplicabile (UL 9540, IEC 62619, IEC 62933-5-2). Rolul arhitecturii, în privința containerului propriu-zis, nu este de a-i proiecta alcătuirea internă (aceasta rămâne responsabilitatea producătorului și a certificării de produs), ci de a verifica și integra corect în amenajarea generală a platformei: gabaritul exterior exact (pentru dimensionarea distanțelor și a platformelor de fundație, capitolul 7), poziția și orientarea ușilor/hatch-urilor de acces (pentru orientarea corectă către culoarele de intervenție), poziția panourilor de ventilație a deflagrației (pentru a se asigura că aceste panouri nu sunt orientate spre o construcție ocupată sau spre drumul de acces, ci spre o direcție sigură, liberă), și amplasarea marcajelor de identificare a pericolului impuse de normativele de securitate la incendiu și de transport al mărfurilor periculoase (capitolul 18).

### 6.2. Gabaritul ISO 20' și alcătuirea generală

Containerul ISO 20' standard are dimensiunile exterioare de **6,06 × 2,44 m, cu o înălțime de 2,90 m** (variantă „high cube" a containerului standard de transport maritim, adaptată pentru a permite înălțimea de lucru necesară rack-urilor de baterii și echipamentelor tehnice montate pe plafon sau pe pereții laterali). Alcătuirea internă tipică a unui astfel de container de stocare — descrisă aici la nivel de principiu, ca informație de coordonare cu memoriul de instalații, nu ca detaliu de proiectare proprie — cuprinde: rack-urile de baterii, dispuse pe una sau ambele laturi longitudinale, cu un culoar central de acces pentru mentenanță; unitățile HVAC (de tip aer condiționat sau, frecvent, sisteme de răcire lichidă, capitolul 12), montate la unul dintre capete sau pe plafon; sistemul de detecție (senzori de gaz, temperatură, fum) și sistemul de stingere (agent de stingere/aerosol pentru atacul inițial, cu interfață pentru instalația de răcire cu apă tip deluge/sprinklere din exterior, capitolul 13); și tabloul de conexiuni electrice DC, poziționat, de regulă, la unul dintre capete, cu acces separat de culoarul principal de mentenanță al bateriilor.

### 6.3. Ușile și hatch-urile de acces

Fiecare container dispune de cel puțin o ușă principală de acces (dimensionată pentru intrarea personalului de mentenanță cu echipament de protecție) și, frecvent, de hatch-uri suplimentare de vizitare/intervenție rapidă, poziționate astfel încât personalul de mentenanță și, în caz de eveniment, echipa de intervenție să poată accesa rapid interiorul fără a fi nevoiți să ocolească întregul container. În soluția de amenajare adoptată, **toate ușile principale ale containerelor din rândul A sunt orientate spre culoarul de intervenție dintre rânduri**, respectiv **toate ușile principale ale containerelor din rândul B sunt orientate, simetric, spre același culoar**, astfel încât o singură echipă de intervenție, poziționată în culoarul central, să aibă acces vizual și fizic direct la ușile tuturor celor 10 containere, fără a fi necesară deplasarea pe drumul perimetral exterior pentru accesul de rutină.

### 6.4. Panourile de ventilație a deflagrației (venting)

Panourile de suprapresiune (deflagration venting), dimensionate de producător conform NFPA 68/69 sau, la nivel european, conform EN 14994 (capitolul 13), sunt poziționate, în soluțiile constructive uzuale, pe fața opusă ușilor de acces sau pe plafonul containerului, astfel încât, în caz de acumulare de gaze inflamabile urmată de o suprapresiune internă, deschiderea panoului să dirijeze unda de presiune și eventualele flăcări **spre o direcție liberă și sigură** — niciodată spre culoarul de intervenție ocupat de personal, spre drumul de acces, spre containerul vecin sau spre limita de proprietate dinspre o construcție ocupată. Verificarea acestei orientări, pentru fiecare container în parte, în funcție de soluția constructivă a producătorului ales, este o sarcină explicită a coordonării dintre arhitectură și memoriul de instalații la faza de proiect tehnic, întrucât o orientare greșită a panoului de venting ar anula, parțial, beneficiul distanțelor de siguranță adoptate la capitolul 5.

### 6.5. Semnalistica și marcajul de identificare a pericolului pe container

Fiecare container este marcat, conform convențiilor de etichetare IEC/UL și conform normativelor naționale de securitate la incendiu, cu: identificarea pericolului electric (tensiune periculoasă DC, cu valoarea maximă a tensiunii de sistem), identificarea pericolului chimic (baterie litiu-ion, cu pictograma de pericol corespunzătoare și, dacă aplicabil, codul de transport al mărfurilor periculoase pentru bateriile litiu, folosit și pentru identificare la fața locului de către echipele de intervenție), identificarea capacității energetice a containerului (util pentru echipa de intervenție, pentru estimarea rapidă a amplorii potențiale a unui eveniment) și instrucțiuni de prim contact pentru echipele ISU (puncte de izolare electrică, poziția întrerupătorului de urgență — E-stop, contactul de urgență al operatorului, disponibil 24/7). Detalierea completă a acestor marcaje se face la capitolul 18, în corelare cu memoriul de instalații, care descrie sistemul electric și de protecții la care aceste marcaje fac referire.

### 6.6. Culoarea și tratamentul exterior al containerelor

Din perspectivă arhitecturală, tratamentul exterior al containerelor este limitat, dat fiind caracterul de produs industrial certificat al acestora, la alegerea unei culori sobre, de regulă gri deschis sau alb, cu rol dublu: reflectarea radiației solare (reducerea sarcinii termice asupra instalației HVAC interne, capitolul 12) și integrarea vizuală discretă în peisajul înconjurător (capitolul 17), fără elemente grafice sau cromatice care ar atrage atenția inutil asupra instalației într-un context extravilan sau periurban.

---

## 7. PLATFORMELE ȘI FUNDAȚIILE SUPORT CONTAINER

### 7.1. Rolul platformei — interfața dintre container și teren

Fiecare container se așază pe o **platformă/fundație de beton armat** dedicată, dimensionată pentru trei funcții simultane, argumentate în detaliu în memoriul de structură, dar relevante și pentru soluția de arhitectură/amenajare: preluarea gravitațională a greutății containerului plin cu baterii (**30–35 tone** per unitate, o încărcare semnificativă concentrată pe o amprentă de doar ~14,8 mp), ancorajul seismic al containerului la platformă (prin buloane chimice, cu o capacitate de proiectare de ordinul a **~114 kN** per punct de ancorare, conform breviarului din memoriul de structură, relevant pentru clasa de importanță seismică III adoptată la capitolul 1), și asigurarea planeității și a drenajului platformei (pantă minimă de scurgere ≥1%, astfel încât apa pluvială sau eventualele scurgeri accidentale minore să nu bălească sub container, ci să fie dirijate spre sistemul de drenaj general al incintei, capitolul 14).

### 7.2. Alcătuirea platformei

Alcătuirea tip a platformei suport container, așa cum rezultă din coordonarea cu memoriul de structură, cuprinde, de la teren în sus: un strat de balast compactat, cu un modul de deformație Ev2 ≥80 MPa, care asigură o bază uniform rezistentă și evită tasările diferențiale sub greutatea concentrată a containerului; o placă de beton armat clasa **C25/30**, cu o grosime de **20–30 cm**, dimensionată pentru încărcarea punctuală transmisă de picioarele de reazem ale containerului și pentru forțele de ancorare seismică; o hidroizolație a plăcii, care previne infiltrarea apei sub platformă și protejează armătura de beton pe termen lung; și bordurile de dirijare a apelor, care delimitează platforma și canalizează scurgerile de suprafață spre rigolele perimetrale și, în final, spre bazinul de retenție (capitolul 14).

### 7.3. Platformele de intervenție și culoarele betonate

Dincolo de platformele individuale ale containerelor, întreaga suprafață a culoarelor de intervenție dintre rânduri și a drumului perimetral inelar este tratată cu o îmbrăcăminte betonată sau asfaltată, dimensionată pentru **portanța necesară autospecialelor ISU** (capitolul 10), nu doar pentru circulația pietonală ocazională a personalului de mentenanță — o distincție importantă de proiectare, întrucât o platformă/drum dimensionat doar pentru trafic pietonal sau pentru un vehicul ușor de mentenanță nu ar rezista, în caz de intervenție reală, la greutatea unei autospeciale de intervenție încărcate cu apă, care poate depăși 20–26 tone.

### 7.4. Coordonarea cu structura — verificare, nu recalculare

Dimensionarea exactă a grosimii plăcii, a armării și a detaliilor de ancorare seismică este responsabilitatea memoriului de structură și nu se recalculează în prezentul memoriu de arhitectură; rolul arhitecturii este de a verifica **poziționarea corectă** a fiecărei platforme în raport cu grila de distanțe stabilită la capitolul 5, de a asigura **continuitatea geometrică** dintre platformele individuale ale containerelor și platforma generală a culoarelor de intervenție (fără praguri sau denivelări care ar împiedica manevra rapidă a echipamentelor de intervenție sau a cărucioarelor de mentenanță), și de a coordona **pantele de scurgere** ale tuturor platformelor astfel încât să convergă coerent spre sistemul de drenaj general al incintei (capitolul 14).

---

## 8. ZONA DE CONVERSIE ȘI TRANSFORMARE — PCS ȘI STAȚIA DE RACORD

### 8.1. Poziționarea și rolul de tranziție

Zona de conversie (echipamentele PCS — invertoarele bidirecționale care transformă curentul continuu al bateriilor în curent alternativ, și invers, la încărcare) și zona de transformare/racord (transformatorul de putere și celulele de medie tensiune ale stației de conexiune) se poziționează adiacent grupării de containere de baterii, la distanța minimă de **3,0 m** stabilită la capitolul 5, dar suficient de aproape de limita incintei dinspre punctul de racord la rețea, astfel încât traseul cablurilor de medie tensiune spre punctul de branșament să fie cât mai scurt posibil — o considerație de eficiență și de cost care, deși ține în principal de proiectul electric, are consecințe directe asupra poziției acestei zone în planul general al incintei.

### 8.2. Anvelopa echipamentelor de conversie și transformare

Echipamentele PCS sunt, tipic, livrate tot în formă de containere/cabinete modulare, cu o anvelopă similară ca principiu celei descrise la capitolul 6 (produs industrial certificat, cu HVAC propriu pentru răcirea componentelor electronice de putere), în timp ce transformatorul de putere poate fi amplasat fie într-o cabină/celulă prefabricată de beton (soluție frecventă pentru transformatoarele de putere de această capacitate), fie pe o platformă deschisă cu împrejmuire de protecție dedicată, în funcție de soluția adoptată de proiectantul de instalații electrice și de cerințele producătorului de echipament. În ambele variante, anvelopa care adăpostește echipamentul electric de medie tensiune se tratează, din perspectiva securității la incendiu, ca o construcție cu **compartimentare rezistentă la foc** (pereți cu rezistență minimă EI 120 acolo unde separă echipamentul de zona de containere de baterii sau de o eventuală clădire ocupată), soluție care limitează propagarea unui eventual defect electric (arc electric, incendiu de transformator — un risc distinct de cel al ambalării termice a bateriilor, dar tratat cu aceeași rigurozitate).

### 8.3. Accesul de mentenanță și distanțele de operare

Zona PCS/transformator dispune de un spațiu de operare/mentenanță perimetral (culoar de acces pentru personal, cu lățime suficientă pentru manevrarea uneltelor și, ocazional, pentru înlocuirea unor componente de gabarit mediu), racordat direct la drumul perimetral de intervenție, astfel încât echipa de mentenanță să nu fie nevoită să traverseze zona de containere de baterii pentru a ajunge la echipamentele de conversie/transformare — o separare care, dincolo de siguranță, simplifică și logistica intervențiilor de rutină (verificarea PCS este, de regulă, o operațiune distinctă și mai frecventă decât mentenanța bateriilor propriu-zise).

---

## 9. CABINA DE COMANDĂ EMS/SCADA

### 9.1. Rolul și poziționarea cabinei

Cabina/containerul de comandă, care adăpostește echipamentele EMS (Energy Management System) și SCADA (supervizare, control și achiziție de date), tablourile de comandă, echipamentele de comunicații (fibră optică pentru telecontrol și telemăsură) și, opțional, un post de operare pentru vizite ocazionale ale personalului tehnic, se poziționează la distanța de **≥6,0 m** față de containerele de baterii, stabilită la capitolul 5 pentru zonele considerate „ocupate" de personal, chiar dacă ocuparea este ocazională, nu permanentă. Poziționarea periferică a cabinei, cu acces facil dinspre poarta de intrare principală, evită necesitatea ca eventualele vizite ale personalului tehnic sau ale auditorilor/inspectorilor să traverseze zona de risc maxim a platformei pentru a ajunge la punctul de monitorizare.

### 9.2. Alcătuirea și dotarea cabinei

Cabina este, tipic, o construcție modulară de tip container tehnic sau o cabină prefabricată echivalentă, cu o anvelopă care asigură: izolarea termică necesară pentru funcționarea corectă a echipamentelor electronice sensibile (server SCADA, tablouri de automatizare), un sistem HVAC propriu, independent de cel al containerelor de baterii, dimensionat pentru sarcina termică a echipamentelor electronice și pentru confortul ocazional al personalului; un sistem de detecție de incendiu propriu (dat fiind conținutul de echipamente electrice/electronice, un risc distinct, dar real, de incendiu electric); și o ieșire de evacuare directă spre exterior, dimensionată conform normelor generale de securitate la incendiu pentru o încăpere de mici dimensiuni cu ocupare ocazională redusă (o singură ușă de evacuare este, tipic, suficientă la acest nivel de ocupare, cu deschidere în sensul de evacuare). Cabina include, de asemenea, un grup social minim (un grup sanitar), dimensionat pentru ocuparea ocazională de către personalul tehnic aflat în vizită de mentenanță sau de audit, nu pentru o exploatare permanentă.

### 9.3. Regimul de operare — instalație nemanată, dar cu prezență ocazională

Este important de precizat, pentru corecta încadrare a cerințelor de arhitectură aplicabile, că platforma BESS **nu are personal permanent** pe amplasament — operarea de zi cu zi (comanda PCS, dispecerizarea serviciilor de sistem, monitorizarea BMS/SOH) se face de la distanță, prin sistemul SCADA, conform descrierii din memoriul de instalații. Cabina de comandă de pe amplasament este, prin urmare, vizitată **ocazional** (mentenanță programată, verificări periodice, eventuale audituri de conformitate), regim de ocupare care determină, la capitolul 16, întinderea rezonabilă a cerințelor de accesibilitate NP 051 aplicabile acestei construcții.

---

## 10. DRUMURILE DE ACCES ȘI PLATFORMA DE INTERVENȚIE PENTRU POMPIERI

### 10.1. Cerința de acces pe două laturi

Cerința centrală care guvernează organizarea circulațiilor incintei, conform Ord. M.A.I. nr. 129/2016 și P118-1/2013, este posibilitatea ca autospecialele ISU să ajungă la orice punct al platformei, și în special la fiecare container de baterii, din **cel puțin două direcții/laturi**, astfel încât un eveniment de incendiu la un container sau la un rând de containere să nu blocheze accesul de intervenție prin obstrucționarea singurei căi disponibile. Această cerință este cea care a determinat, la capitolul 3, respingerea unei dispuneri compacte a containerelor și adoptarea configurației în două rânduri cu culoar central și drum perimetral inelar.

### 10.2. Gabaritul și portanța drumurilor de acces

| Parametru | Valoare minimă adoptată | Bază normativă |
|---|---|---|
| Lățime liberă a căii de acces | **≥3,8 m** (recomandat ≥6,0 m în zonele de manevră) | Ord. M.A.I. 129/2016, P118-1 |
| Înălțime liberă (gabarit de trecere) | **≥4,2 m** | Ord. M.A.I. 129/2016 |
| Rază de viraj | **≥12 m** | Ord. M.A.I. 129/2016 |
| Portanță pe osie | **≥10 t/osie** | P118-1 |
| Masă totală admisă | **≥26 t** | P118-1 |
| Platformă de întoarcere | **12 × 12 m** sau buclă continuă (drum inelar) | Ord. M.A.I. 129/2016 |

### 10.3. Drumul perimetral inelar

Soluția adoptată pentru a satisface simultan cerința de acces pe două laturi și cerința de portanță este un **drum perimetral de tip inelar**, care înconjoară complet gruparea celor 10 containere și continuă cu culoarul de intervenție de 6,0 m dintre cele două rânduri, astfel încât o autospecială să poată ajunge la orice punct al platformei fie ocolind complet incinta pe drumul perimetral, fie intrând direct în culoarul central, fără a fi nevoie de o manevră de întoarcere într-un spațiu îngust. Îmbrăcămintea acestui drum — beton sau asfalt turnat pe un strat de balast compactat, dimensionat conform tabelului de la 10.2 — este continuă și fără praguri cu platformele individuale ale containerelor (capitolul 7.3), pentru a permite manevra rapidă a echipamentelor de intervenție.

### 10.4. Hidranții exteriori și rezerva de apă pentru incendiu

Alimentarea cu apă a intervenției se asigură dintr-o **rezervă proprie de apă pentru incendiu**, cu grup de pompare aferent, dimensionate în memoriul de instalații pentru asigurarea debitului necesar hidranților exteriori conform P118-2/2013, precum și pentru alimentarea sistemului de **răcire exterioară de tip deluge/sprinklere**, aplicat direct pe carcasa containerelor afectate pe toată durata unei eventuale intervenții — soluția de stingere considerată eficientă pentru fenomenul de ambalare termică al bateriilor litiu-ion, argumentată la capitolul 13. Hidranții exteriori se poziționează pe traseul drumului perimetral, la intervale și cu debite conforme P118-2, astfel încât fiecare container să fie deservit de cel puțin un hidrant aflat la o distanță de furtun rezonabilă.

### 10.5. Platforma de așteptare/staționare a autospecialelor

Adiacent porții de acces principale, se prevede o platformă betonată de staționare, suficient de generoasă pentru poziționarea a cel puțin una-două autospeciale de intervenție în așteptare sau în alimentare de la rezerva proprie, fără a bloca accesul altor vehicule (personal de mentenanță, servicii de pază) în timpul unei intervenții.

---

## 11. ÎMPREJMUIREA, PROTECȚIA PERIMETRALĂ ȘI SUPRAVEGHEREA VIDEO

### 11.1. Împrejmuirea de securitate

Incinta este delimitată printr-o împrejmuire de securitate cu **înălțime minimă de 2,0 m**, realizată din panouri rigide (plasă bordurată sau panouri zincate, soluții uzuale pentru instalații tehnice/industriale), cu rol dublu: protecție împotriva accesului neautorizat (o instalație cu tensiuni și energii periculoase, care nu trebuie să fie accesibilă publicului larg) și delimitare clară a perimetrului de securitate pentru echipele de intervenție, care trebuie să poată identifica rapid limitele incintei și punctele de acces controlat.

### 11.2. Retragerea gard–containere

Împrejmuirea se poziționează la o distanță care respectă simultan retragerea minimă impusă de certificatul de urbanism față de limitele de proprietate și distanța de siguranță container–limită de proprietate stabilită la capitolul 5 (≥6,0 m) — cele două cerințe convergând, tipic, spre aceeași soluție practică: gardul urmează limita de proprietate, iar containerele se poziționează în interiorul acesteia la distanța de siguranță necesară, cu zona intermediară dintre gard și cel mai apropiat container disponibilă pentru circulația perimetrală de intervenție și pentru perdeaua vegetală (capitolul 17).

### 11.3. Porțile de acces

Se prevăd o poartă carosabilă principală (dimensionată pentru gabaritul autospecialelor de intervenție și al vehiculelor de mentenanță, capitolul 10.2) și, distinct, o poartă pietonală pentru accesul controlat al personalului, ambele echipate cu sisteme de control acces (detaliate în memoriul de instalații) care permit, în caz de intervenție ISU, deschiderea rapidă și prioritară față de orice alt protocol de securitate.

### 11.4. Supravegherea video și iluminatul de securitate

Perimetrul incintei este acoperit de un sistem de supraveghere video (CCTV), cu camere poziționate la colțurile și pe laturile împrejmuirii, echipate, acolo unde este justificat economic și tehnic, cu funcție de vedere nocturnă sau termică — aceasta din urmă având, dincolo de rolul de securitate anti-efracție, o **utilitate suplimentară de detecție timpurie a punctelor calde** pe suprafața containerelor, complementară sistemului de detecție intern al fiecărui container (capitolul 13), fără a-l înlocui. Iluminatul de securitate perimetral, funcțional pe timpul nopții, asigură vizibilitatea necesară atât pentru sistemul CCTV, cât și pentru o eventuală intervenție nocturnă a echipelor ISU sau de mentenanță.

---

## 12. VENTILAȚIA, CLIMATIZAREA ȘI MANAGEMENTUL TERMIC

### 12.1. Rolul dublu al managementului termic — performanță și siguranță

Managementul termic al containerelor de baterii are un rol dublu, ambele componente fiind relevante pentru arhitectura/amenajarea platformei: menținerea celulelor de baterie într-un interval optim de temperatură (tipic **15–35°C, cu un optim în jurul a 25°C**) pentru maximizarea performanței și a duratei de viață a bateriilor, și, mai important din perspectiva securității, **prevenirea condițiilor care favorizează declanșarea fenomenului de ambalare termică** (thermal runaway) — un defect termic local care, necontrolat, se poate propaga în cascadă. Fiecare container dispune de un sistem HVAC dedicat, independent de al containerelor vecine, astfel încât un defect al sistemului de climatizare al unui container să nu afecteze managementul termic al celorlalte.

### 12.2. Breviarul de calcul al sarcinii termice — orientativ

Necesarul de răcire per container rezultă, orientativ, din pierderile energetice ale procesului de conversie, calculate astfel: pentru un randament round-trip al instalației η_RT ≈ 0,87 (valoare de referință, coroborată cu memoriul de instalații, care indică un interval de 87–88,5% pentru configurația LFP a proiectului), pierderea pe o singură direcție a fluxului energetic (încărcare sau descărcare) se aproximează prin √η_RT ≈ √0,87 ≈ 0,933, rezultând o pierdere unidirecțională de ordinul a **~6,7%**. Aplicată la puterea instalată de 25 MW, această pierdere conduce la o putere disipată sub formă de căldură de ordinul a **~1,67 MW la nivelul întregii instalații**, respectiv **~167 kW per container** (raportat la cele 10 containere). Aplicând un coeficient de siguranță de proiectare de ordinul a ×1,2 (uzual pentru dimensionarea instalațiilor HVAC, pentru a acoperi vârfurile de sarcină și marja de eroare a calculului simplificat), rezultă un necesar de răcire de ordinul a **~200 kW frig per container**.

Această valoare este **orientativă**, derivată dintr-un calcul simplificat de bilanț energetic, util pentru verificarea de principiu a ordinului de mărime al instalației HVAC oferite de producătorul containerului; dimensionarea finală și exactă a sistemului de climatizare rămâne responsabilitatea producătorului containerului certificat și a memoriului de instalații, care detaliază soluția tehnică adoptată (aer condiționat cu compresie mecanică sau, frecvent preferată pentru eficiență și compactitate, răcire lichidă directă a rack-urilor).

### 12.3. Debitul de aer — variantă de referință, dacă răcirea este pe bază de aer

Dacă soluția adoptată de producător este climatizarea cu aer (soluție mai simplă constructiv, dar cu eficiență energetică și compactitate inferioare răcirii lichide), debitul de aer necesar pentru evacuarea celor ~200 kW de căldură, cu o diferență de temperatură de proiectare ΔT ≈10 K între aerul introdus și cel evacuat, rezultă din relația V̇ = Q/(ρ·cp·ΔT) = 200.000/(1,2 × 1005 × 10) ≈ **16,6 mc/s**, echivalent cu aproximativ **~60.000 mc/h** per container — un debit important, care ar necesita guri de introducere/evacuare de secțiune considerabilă pe anvelopa containerului. Această constatare este chiar argumentul pentru care **răcirea lichidă (liquid cooling) a rack-urilor de baterii este frecvent soluția preferată** de producătorii moderni de containere BESS: un agent de răcire lichid, cu o capacitate termică per unitate de volum mult superioară aerului, poate evacua aceeași cantitate de căldură cu un debit de agent și cu o secțiune de conducte considerabil mai reduse decât cele necesare unui sistem pe bază de aer, cu beneficii directe asupra compactității containerului și a consumului energetic auxiliar al instalației de climatizare (consumator auxiliar dominant al bilanțului energetic global, conform memoriului de instalații).

### 12.4. Ventilația de deflagrație — un sistem distinct de HVAC

Se subliniază, pentru evitarea oricărei confuzii de proiectare, că sistemul de **ventilație de deflagrație** (capitolele 6.4 și 13), destinat evacuării controlate a gazelor inflamabile acumulate în cazul unui eveniment de ambalare termică, este un sistem **complet independent** de sistemul HVAC de climatizare curentă descris mai sus — primul intervine doar în situație de urgență, pentru prevenirea acumulării unei atmosfere explozive (menținerea concentrației de gaze sub limita inferioară de explozie — LEL), în timp ce al doilea funcționează permanent, în regim normal de operare, pentru managementul termic al performanței și al duratei de viață a bateriilor.

### 12.5. Expunerea solară și protecția suplimentară

Așa cum s-a menționat la capitolul 2.4, containerele orientate pe fața cea mai expusă radiației solare directe suportă o sarcină termică suplimentară față de calculul de bază de la 12.2, care nu modifică ordinul de mărime al necesarului de răcire, dar poate justifica, la faza de proiect tehnic, măsuri suplimentare de protecție pasivă (finisaj exterior cu coeficient de reflexie solară ridicat, eventuale copertine umbritoare care nu obstrucționează accesul la panourile de venting sau la ușile de acces) — măsuri de eficiență energetică, nu de siguranță, care rămân opționale și subordonate soluției tehnice a producătorului containerului.

---

## 13. DETECȚIA ȘI STINGEREA INCENDIULUI — INTERFAȚA ARHITECTURALĂ

### 13.1. De ce arhitectura tratează și acest capitol

Deși sistemul de detecție și stingere a incendiului este, în esență, o instalație tehnică detaliată integral în memoriul de instalații electrice + PSI, arhitectura are un rol de coordonare esențial: **poziționarea în plan** a elementelor sistemului (rezerva de apă, grupul de pompare, bazinul de retenție, traseele hidranților exteriori) trebuie să fie compatibilă cu distanțele de siguranță de la capitolul 5, cu accesul de intervenție de la capitolul 10 și cu compartimentarea la foc a construcțiilor propriu-zise (cabina EMS, celulele de transformare), motiv pentru care prezentul capitol tratează interfața dintre soluția tehnică de PSI și soluția de amenajare, fără a relua breviarul electric detaliat în memoriul de instalații.

### 13.2. Fenomenul de ambalare termică — relevanța pentru arhitectură

Bateriile litiu-ion, în condiții de defect (supraîncărcare, supratemperatură, scurtcircuit intern sau deteriorare mecanică), pot intra într-un proces exoterm autosusținut — ambalarea termică (thermal runaway) — care generează, **înainte de apariția flăcării vizibile**, gaze de descompunere (hidrogen, monoxid de carbon, dioxid de carbon, acid fluorhidric, hidrocarburi), unele inflamabile, unele toxice. Chimia LFP adoptată pentru acest proiect este recunoscută ca fiind mai stabilă termic decât alte chimii litiu-ion (precum NMC), cu un prag de declanșare a ambalării termice mai ridicat, dar acest avantaj relativ **nu elimină** necesitatea distanțelor de siguranță, a compartimentării și a sistemului de detecție/stingere dimensionat conform NFPA 855 — motiv pentru care întreaga soluție de amenajare a platformei tratează riscul ca fiind real și semnificativ, indiferent de chimia specifică a celulelor.

### 13.3. Detecția multi-strat — consecința asupra amplasării senzorilor

Sistemul de detecție (detaliat electric în memoriul de instalații) funcționează pe mai multe straturi, în ordinea cronologică a fenomenului: detecția de gaze de descompunere (hidrogen, monoxid de carbon, compuși organici volatili), cea mai precoce, întrucât apare înaintea oricărui semn vizibil de incendiu; detecția de temperatură (senzori punctuali și cablu termosensibil liniar, coroborați cu monitorizarea BMS la nivel de celulă); detecția de fum (sistem aspirativ de tip VESDA, cu sensibilitate ridicată); și detecția de monoxid de carbon ca strat suplimentar de confirmare. Din perspectiva arhitecturii, relevanța acestei ierarhii constă în faptul că poziționarea și numărul de puncte de detecție în interiorul fiecărui container sunt stabilite de producător conform certificării, dar **semnalizarea centralizată** a acestor detecții trebuie să ajungă la un panou central, amplasat conform P118-3/2015, cu transmitere simultană la distanță (monitorizare 24/7 a operatorului, dat fiind regimul nemanat al platformei, capitolul 9.3).

### 13.4. Stingerea prin răcire cu apă — argumentul arhitectural pentru rezerva de apă

Stingerea unui eveniment de ambalare termică la baterii litiu-ion este o problemă tehnică dezbătută în literatura de specialitate: agenții de stingere prin înăbușire (aerosol, gaz inert), eficienți pentru stingerea flăcării inițiale, **nu opresc singuri fenomenul**, întrucât celula afectată generează propriul oxigen intern prin descompunere chimică, independent de atmosfera înconjurătoare, cu risc de reaprindere. Singura măsură recunoscută ca eficientă pentru **oprirea propagării în cascadă** este **răcirea directă cu apă** (sisteme de tip deluge/sprinklere, aplicate pe carcasa containerului afectat), conform recomandării NFPA 855 — motiv pentru care prezentul proiect de amenajare prevede o rezervă de apă pentru incendiu și un grup de pompare dimensionate (în memoriul de instalații) inclusiv pentru acest scenariu de răcire prelungită, nu doar pentru stingerea convențională de suprafață. Strategia operațională completă este, prin urmare: **detecție precoce (gaze) → oprire automată a încărcării/descărcării prin BMS → izolare electrică → răcire cu apă a containerului afectat**, secvență care justifică, arhitectural, dimensionarea generoasă a rezervei de apă și poziționarea acesteia astfel încât să deservească oricare dintre cele 10 containere fără întârziere.

### 13.5. Retenția apelor de stingere — argumentul pentru bazin (detaliat la capitolul 14)

Apa utilizată pentru răcirea unui container afectat de un eveniment de ambalare termică se contaminează cu produșii de descompunere ai electrolitului și ai materialelor bateriei, motiv pentru care aceasta **nu poate fi evacuată necontrolat** în emisarul natural sau în rețeaua de canalizare pluvială a zonei, ci trebuie colectată integral și tratată/evacuată conform reglementărilor de mediu — cerință care determină, arhitectural, prevederea unui bazin de retenție dedicat, tratat pe larg la capitolul 14.

### 13.6. Compartimentarea la foc a construcțiilor propriu-zise

Pentru construcțiile propriu-zise ale platformei (cabina EMS, eventuala celulă de transformare de tip zidărie/beton), separarea față de zona de containere de baterii se realizează, acolo unde distanța fizică de siguranță nu este singura măsură suficientă (de exemplu, la pereții care ar putea, structural, delimita o eventuală extindere sau adiacență viitoare), prin elemente de compartimentare cu rezistență la foc de minimum **EI 120**, conform clasificării riscului MARE stabilite la capitolul 1.4 și conform P118-1/2013, soluție care limitează propagarea unui eveniment dincolo de zona de origine chiar și în ipoteza (nedorită, dar de proiectat conservator) unei distanțe insuficiente.

### 13.7. Întreruptorul de urgență (E-stop) — poziționarea arhitecturală

Sistemul electric prevede un întreruptor de urgență (E-stop) atât la nivelul fiecărui container/zonă, cât și centralizat, la panoul de comandă (memoriul de instalații detaliază funcționarea electrică). Din perspectiva amenajării, poziționarea E-stop-urilor exterioare trebuie să fie **vizibilă și accesibilă din culoarul de intervenție**, fără a fi necesară deschiderea unui container sau accesul într-o zonă periculoasă pentru a-l aciona, condiție integrată în soluția de semnalistică de la capitolul 18.

---

## 14. DRENAJUL, SISTEMUL DE RETENȚIE A APELOR DE STINGERE ȘI SISTEMATIZAREA VERTICALĂ

### 14.1. Principiul general — apa pluvială curată versus apa de stingere contaminată

Sistematizarea verticală a incintei tratează diferențiat două categorii de ape care se pot acumula pe suprafața platformei: **apa pluvială curată** (precipitații căzute pe suprafețele betonate ale drumurilor, culoarelor și platformelor, în regim normal de exploatare, fără eveniment de incendiu), care poate fi dirijată către un sistem de drenaj convențional, cu descărcare în emisar sau infiltrare controlată, conform avizului de gospodărire a apelor; și **apa de stingere contaminată** (utilizată pentru răcirea unui container afectat de un eveniment de ambalare termică, capitolul 13.5), care trebuie colectată integral, izolat de rețeaua de drenaj pluvial curent, într-un bazin de retenție dedicat, pentru a preveni contaminarea solului, a apelor subterane sau a emisarului natural cu produșii de descompunere ai electrolitului.

### 14.2. Sistemul de drenaj de suprafață

Toate platformele individuale ale containerelor (capitolul 7) și drumurile/culoarele de intervenție (capitolul 10) sunt sistematizate cu pante de scurgere minime de **≥1%**, dirijate spre rigole perimetrale care colectează apa de suprafață și o conduc spre un cămin de intersecție prevăzut cu o **vană/clapetă de izolare acționabilă manual sau automat**, dispozitiv care, în regim normal, permite scurgerea liberă a apei pluviale curate spre sistemul de drenaj general, dar care, în caz de eveniment de incendiu semnalizat de sistemul de detecție (capitolul 13.3), se închide automat sau este închisă manual de echipa de intervenție, redirecționând întregul debit de pe platformă (inclusiv apa de stingere contaminată) spre bazinul de retenție dedicat.

### 14.3. Bazinul de retenție a apelor de stingere

Bazinul de retenție, poziționat periferic în incintă (capitolul 5.4), este dimensionat, în memoriul de instalații, pentru a acumula întregul volum de apă previzibil a fi utilizat pentru răcirea unui container afectat pe durata estimată a unei intervenții complete, plus precipitațiile căzute pe suprafața aferentă în același interval — dimensionare care rămâne responsabilitatea proiectului de instalații/hidroedilitar, prezentul memoriu de arhitectură limitându-se la poziționarea și integrarea volumetrică a bazinului în planul general al incintei, astfel încât acesta să nu intre în conflict cu distanțele de siguranță de la capitolul 5 și să rămână accesibil pentru vidanjare/evacuare controlată a conținutului către o unitate autorizată de tratare a deșeurilor lichide periculoase, ulterior unui eventual eveniment.

### 14.4. Sistematizarea verticală generală

Cota generală a platformei se stabilește astfel încât să nu fie necesare lucrări majore de terasament (teren predominant plan, capitolul 2.1), cu diferențieri de nivel limitate la cele strict necesare pentru pantele de scurgere descrise mai sus și pentru eventuala poziționare a bazinului de retenție la o cotă ușor coborâtă față de restul platformei, pentru a beneficia de scurgerea gravitațională a apelor colectate, fără a necesita pompare suplimentară în regim normal (pomparea rămâne necesară doar pentru golirea/vidanjarea bazinului după un eveniment sau la intervale programate de întreținere).

---

## 15. FINISAJELE ȘI MATERIALELE DE CONSTRUCȚIE

### 15.1. Principiul general — materiale de întreținere minimă, rezistente la intemperii

Dat fiind regimul de exploatare nemanat al platformei (capitolul 9.3) și expunerea permanentă a tuturor elementelor construite la intemperii (fără protecție sub un acoperiș comun, cu excepția interiorului fiecărui container), soluția de finisaje adoptată privilegiază materialele de întreținere minimă, rezistente la ciclurile de îngheț-dezgheț, la radiația UV și la eventuala expunere la agenți chimici de scurgere ocazională (uleiuri de la echipamentele de mentenanță), fără a necesita intervenții periodice de vopsire sau de protecție suplimentară.

### 15.2. Finisajele platformelor și drumurilor

Suprafețele betonate ale platformelor containerelor, ale culoarelor de intervenție și ale drumului perimetral (capitolele 7 și 10) rămân, tipic, în finisaj de beton aparent sau cu un tratament de suprafață antiderapant (util atât în condiții de umiditate, cât și pentru siguranța personalului de mentenanță), fără placaje suplimentare care ar complica întreținerea sau ar reduce portanța verificată a structurii.

### 15.3. Finisajele cabinei EMS și ale eventualelor construcții cu ocupare de personal

Cabina de comandă EMS (capitolul 9), singura construcție a platformei cu ocupare ocazională de personal, primește un tratament de finisaj apropiat celui al unei încăperi tehnice/de birou convențională: pardoseală ușor de întreținut (linoleum antistatic sau gresie tehnică, relevantă pentru protecția echipamentelor electronice de sarcini electrostatice), pereți cu finisaj lavabil, iar anvelopa exterioară în culoare sobră (capitolul 6.6), coordonată vizual cu cea a containerelor de baterii, pentru unitate de imagine a întregii platforme.

### 15.4. Acoperișurile și protecția la intemperii a echipamentelor

Containerele și cabinele tehnice au propriile acoperișuri, integrate în anvelopa certificată a produsului industrial (capitolul 6), fără necesitatea unui acoperiș suplimentar comun pentru întreaga platformă. Transformatorul de putere, dacă este amplasat pe o platformă deschisă (capitolul 8.2), poate necesita o copertină de protecție la intemperii, opțiune stabilită de proiectantul de instalații electrice în funcție de tipul și de gradul de protecție (IP) al echipamentului ales, fără a afecta soluția generală de amenajare descrisă în prezentul memoriu.

---

## 16. ACCESIBILITATEA PERSOANELOR CU MOBILITATE REDUSĂ

### 16.1. Aplicabilitatea NP 051/2012 la o instalație tehnică nemanată

Așa cum s-a precizat la capitolul 9.3, platforma BESS **nu are personal permanent** și nu este destinată accesului publicului larg — caracteristici care, în practica de proiectare, limitează întinderea directă a cerințelor NP 051/2012 (concepute în principal pentru clădiri cu public sau cu personal permanent) la un nivel rezonabil, aplicat onest: prezentul memoriu **nu revendică** o conformare completă cu toate prevederile NP 051 specifice unei clădiri de birouri sau publice, întrucât aceasta ar fi disproporționată pentru o instalație tehnică vizitată ocazional. Totuși, principiul de nediscriminare al Legii nr. 448/2006 (dreptul oricărei persoane, inclusiv al unui angajat sau al unui auditor cu dizabilități, de a putea participa la activitățile profesionale asociate locului de muncă) rămâne aplicabil, iar cabina de comandă EMS — singura construcție a platformei cu ocupare de personal — este proiectată cu următoarele măsuri minime, rezonabile pentru acest tip de construcție:

### 16.2. Măsurile adoptate la cabina EMS

Acces fără prag sau cu prag adaptat (maximum 2 cm, sau rampă locală dacă diferența de nivel față de platforma exterioară o impune), lățime liberă a ușii de acces de minimum 0,90 m, spațiu de manevră minim în interiorul cabinei compatibil cu circulația unui scaun rulant până la postul de operare principal, și, dacă cabina include un grup sanitar, acesta se dimensionează, pe cât permite gabaritul construcției modulare, conform cerințelor minime de accesibilitate ale NP 051 pentru o încăpere sanitară unică. Aceste măsuri se verifică și se detaliază la faza de proiect tehnic, în funcție de soluția constructivă exactă a cabinei modulare adoptate.

### 16.3. Zona exterioară — circulațiile de acces

Drumul de acces principal și platforma de la poarta de intrare până la cabina EMS sunt betonate, plane (fără trepte), cu pante de scurgere reduse (capitolul 14.2, sub pragul care ar transforma panta de drenaj într-o rampă percepută ca dificilă), astfel încât circulația unei persoane cu mobilitate redusă de la poarta de acces până la cabina de comandă să nu întâmpine obstacole — o condiție care, de altfel, coincide cu cerința generală de circulație facilă pentru echipele de mentenanță și de intervenție, descrisă la capitolele 9 și 10.

---

## 17. INTEGRAREA PEISAGISTICĂ, IMPACTUL VIZUAL ȘI FONIC

### 17.1. Perdeaua vegetală perimetrală

Perimetrul incintei, în spațiul disponibil între împrejmuire și cel mai apropiat container (rezultat din retragerea de siguranță de la capitolul 5, ≥6,0 m), este amenajat cu o **perdea vegetală** formată din arbori și arbuști de esențe locale, adaptate condițiilor climatice ale zonei, cu rol triplu: mascarea vizuală a instalației tehnice față de vecinătăți și față de traseele de circulație publică apropiate (relevantă mai ales dacă platforma este vizibilă dintr-un drum public sau dinspre localități apropiate), atenuarea fonică parțială a zgomotului generat de echipamentele HVAC ale containerelor și de eventualul zumzet al transformatorului de putere, și, secundar, un rol ecologic/peisagistic de integrare a instalației tehnice în contextul agricol sau semi-natural înconjurător, frecvent specific amplasamentelor de acest tip.

### 17.2. Regula esențială — perdeaua vegetală nu intră în distanțele de siguranță

Se subliniază, ca regulă de proiectare fermă, faptul că perdeaua vegetală se amplasează **exclusiv perimetral**, în spațiul dintre împrejmuire și distanța de siguranță minimă, și **niciodată în interiorul distanțelor de siguranță dintre containere** (culoarul de 3,0 m dintre unități sau culoarul de 6,0 m dintre rânduri) — vegetația, dacă ar fi plantată în aceste culoare, ar constitui atât un obstacol pentru accesul de intervenție, cât și o sarcină combustibilă suplimentară nedorită, direct adiacentă surselor de risc. Suprafața minimă de spații verzi urmărită la nivelul întregii incinte este de ordinul a **~20%** din suprafața terenului, procent realizabil confortabil pe seama perimetrului vegetal descris mai sus, dat fiind raportul favorabil dintre suprafața totală a terenului (~13.000 mp) și amprenta construită convențională (~2.000 mp, capitolul 25).

### 17.3. Gestionarea apelor pluviale prin suprafețe permeabile

Zonele vegetale perimetrale, nefiind circulabile de vehicule grele, se amenajează cu suprafețe permeabile (pământ vegetal, eventual pietriș drenant pe alei pietonale ocazionale de mentenanță a vegetației), care contribuie la infiltrarea naturală a unei părți din apele pluviale căzute pe suprafața incintei, complementar sistemului de drenaj de suprafață al platformelor betonate (capitolul 14.2), reducând volumul de apă care ar trebui gestionat exclusiv prin rigole și canalizare.

### 17.4. Cromatica și tratamentul discret al construcțiilor

Cromatica adoptată pentru toate elementele construite ale platformei (containere, cabină EMS, eventuale cabine de transformare) este sobră — nuanțe de gri deschis, alb sau, dacă contextul peisagistic o recomandă, o culoare mai apropiată de tonurile naturale ale zonei (verde-oliv, bej), evitând orice element cromatic sau grafic care ar atrage atenția vizuală în context extravilan sau periurban, principiu deja menționat la capitolul 6.6 și reluat aici ca parte a strategiei generale de integrare peisagistică.

### 17.5. Impactul fonic — surse și atenuare

Sursele de zgomot ale instalației sunt, în principal, unitățile HVAC ale containerelor (funcționare continuă, dar de nivel moderat, specifică echipamentelor de climatizare industrială) și, secundar, zumzetul electromagnetic al transformatorului de putere (un zgomot de fond de nivel redus, dar continuu, specific oricărui transformator de această putere). Amplasarea platformei într-un context tipic extravilan sau periurban, la distanță de construcții locuite (capitolul 2.2), combinată cu atenuarea suplimentară oferită de perdeaua vegetală perimetrală, situează nivelul de zgomot perceput la limita de proprietate în intervalul așteptat a se încadra în limitele reglementate pentru zone tehnice/industriale; verificarea exactă prin studiu de impact acustic, dacă este solicitată prin certificatul de urbanism sau prin acordul de mediu, rămâne o piesă separată a documentației, nereluată aici.

---

## 18. SEMNALISTICA ȘI MARCAJELE DE IDENTIFICARE A PERICOLULUI

### 18.1. Semnalistica de securitate la incendiu

Pe lângă marcajele individuale ale containerelor (capitolul 6.5), incinta în ansamblu este echipată cu semnalistică de securitate conform P118 și conform bunelor practici pentru instalații de risc MARE: indicatoare de pericol electric la punctele de acces la zonele de medie tensiune, indicatoare ale poziției hidranților exteriori și a rezervei de apă, indicatoare ale poziției întrerupătoarelor de urgență (E-stop) exterioare, plan de amplasament general afișat la poarta principală (util pentru orientarea rapidă a echipelor ISU la sosirea la fața locului, cu identificarea numerotată a fiecărui container — BAT1 la BAT10 — și a zonelor PCS/transformator/cabină EMS) și, la poarta de acces, datele de contact ale operatorului pentru monitorizarea 24/7 de la distanță.

### 18.2. Marcajele de identificare a pericolului chimic și electric

Conform convențiilor internaționale de etichetare (pictograme de pericol GHS pentru materialele periculoase, marcaje IEC pentru echipamentele electrice de medie/joasă tensiune), fiecare zonă a platformei este marcată vizibil cu identificarea tipului de pericol dominant: pericol electric (tensiune periculoasă) la zonele PCS, transformator și celule de medie tensiune; pericol chimic/de incendiu asociat bateriilor litiu-ion la containerele de baterii, cu mențiunea explicită a interdicției de stingere cu anumite tipuri de agenți (relevantă pentru echipele de intervenție care ar putea, în lipsa informării corecte, aplica o strategie de stingere ineficientă sau contraproductivă, capitolul 13.4).

### 18.3. Coordonarea cu scenariul de securitate la incendiu

Toată semnalistica descrisă mai sus se corelează, la faza de proiect tehnic, cu scenariul de securitate la incendiu întocmit de expertul PSI (piesă separată, obligatorie pentru avizarea/autorizarea ISU conform HG 571/2016 și Ord. M.A.I. 129/2016), astfel încât informația afișată pe teren să reflecte exact ipotezele și procedurile de intervenție validate în scenariu, nu o semnalistică generică decorativă.

---

## 19. CORELAREA CU STRUCTURA — COORDONAREA ARHITECTURĂ–REZISTENȚĂ

### 19.1. Platformele de fundație — interfața principală

Interfața cea mai relevantă dintre arhitectură și structură la acest tip de proiect este cea descrisă la capitolul 7: dimensionarea platformelor de fundație pentru fiecare container (grosime placă, armare, ancoraj seismic) este integral responsabilitatea memoriului de structură, iar arhitectura verifică și coordonează poziționarea acestor platforme în raport cu grila de distanțe de siguranță (capitolul 5), continuitatea geometrică față de platforma generală a culoarelor de intervenție și pantele de scurgere coerente la nivelul întregii incinte.

### 19.2. Clasa de importanță seismică și implicațiile de amplasare

Clasa de importanță seismică III (γ_I = 1,0, capitolul 1.4), adoptată pentru ansamblul instalației, determină nivelul acțiunii seismice de proiectare pentru ancorarea containerelor la platformă (capitolul 7.1) — o cerință structurală, dar cu o consecință directă de arhitectură: containerele, fiind echipamente rigide, grele și ancorate punctual, nu pot fi repoziționate ulterior fără demontarea și reproiectarea ancorajului, motiv pentru care poziționarea finală adoptată la faza D.T.A.C. (grila de distanțe de la capitolul 5) trebuie considerată definitivă la faza de proiect tehnic, cu excepția unor ajustări minore rezultate din raportul UL 9540A specific (capitolul 5.3).

### 19.3. Eventualele construcții cu structură proprie

Cabina EMS și, dacă este cazul, celula de transformare de tip zidărie/beton (capitolul 8.2) au propriile fundații, dimensionate în memoriul de structură pentru încărcările specifice acestor construcții mult mai ușoare decât containerele de baterii, cu aceeași logică de coordonare: arhitectura stabilește poziția și gabaritul, structura dimensionează fundația și elementele portante.

---

## 20. CORELAREA CU INSTALAȚIILE — INTERFAȚA ARHITECTURALĂ

### 20.1. Traseele de cabluri — coordonarea în plan

Traseele de cabluri electrice (DC între containere și PCS, AC între PCS și transformator, medie tensiune între transformator și punctul de racord, precum și cablurile de comunicații pentru SCADA) urmează, tipic, canale tehnice îngropate sau pozate în tuburi de protecție sub platformele betonate și de-a lungul culoarelor de intervenție, coordonate astfel încât să nu traverseze zonele de circulație a autospecialelor la o adâncime insuficientă (risc de deteriorare sub greutatea unei autospeciale, capitolul 10.2) și să respecte distanțele de securitate electrică față de alte rețele edilitare (apă, drenaj), conform breviarului din memoriul de instalații.

### 20.2. Sistemul de detecție/stingere — poziționarea panoului central

Panoul central de semnalizare a incendiului (capitolul 13.3), care colectează informația de la toate cele 10 containere și de la eventualele zone PCS/transformator, se poziționează, tipic, în cabina EMS (capitolul 9), pentru a beneficia de aceeași infrastructură de comunicații și de monitorizare de la distanță utilizată de sistemul SCADA — o decizie de amenajare care evită duplicarea unei construcții tehnice suplimentare doar pentru acest scop.

### 20.3. Racordurile la utilități

Racordul la rețeaua electrică (obiectul principal al instalației, prin punctul de conexiune la rețea), racordul la sursa de apă pentru rezerva de incendiu (dacă rezerva se completează dintr-o sursă externă, nu doar din acumulare proprie) și racordul de comunicații pentru SCADA/telecontrol sunt tratate integral în memoriul de instalații; arhitectura se limitează la a asigura, în planul general al incintei, traseele libere necesare acestor racorduri, fără interferență cu distanțele de siguranță sau cu circulațiile de intervenție.

---

## 21. SECURITATEA LA INCENDIU — FILOSOFIA ARHITECTURALĂ A PROIECTULUI

### 21.1. De ce securitatea la incendiu este capitolul central al memoriului

Așa cum s-a subliniat încă din capitolul 1, securitatea la incendiu nu este, la acest tip de proiect, un capitol printre altele al memoriului de arhitectură, ci **premisa organizatoare** a întregii soluții de amenajare — fiecare decizie de plan tratată în capitolele precedente (dispunerea containerelor, lățimea culoarelor, poziția cabinei EMS, traseul drumului perimetral, poziționarea bazinului de retenție) derivă, direct sau indirect, din necesitatea de a gestiona riscul MARE de incendiu asociat instalației de stocare a energiei.

### 21.2. Cele patru piloni ai soluției de securitate la incendiu

Soluția de securitate la incendiu a proiectului se sprijină pe patru piloni complementari, niciunul suficient singur, dar eficienți în combinație: **(1) distanțele de separare** (capitolul 5), care limitează probabilitatea de propagare prin radiație termică sau prin contact direct între containere; **(2) detecția precoce** (capitolul 13.3), care permite oprirea automată a procesului electric (BMS/EMS) înainte ca un defect termic local să evolueze necontrolat; **(3) stingerea/răcirea** (capitolul 13.4), care oprește propagarea în cascadă printr-un mecanism fizic (răcire cu apă), nu doar prin înăbușirea flăcării; și **(4) accesul de intervenție** (capitolul 10), care asigură că, dacă primii trei piloni nu reușesc singuri să limiteze un eveniment, echipele ISU pot interveni rapid și eficient din orice direcție.

### 21.3. Ventilația de deflagrație — al cincilea element, specific chimiei litiu-ion

Distinct de cei patru piloni de mai sus, care sunt aplicabili oricărui tip de instalație cu risc de incendiu, platforma BESS necesită, specific chimiei litiu-ion, **ventilația de deflagrație** (capitolele 6.4 și 12.4), dimensionată conform NFPA 68/69 sau EN 14994, care previne acumularea unei atmosfere explozive de gaze de descompunere în interiorul containerului — un element de siguranță fără echivalent la o construcție civilă convențională, dar central pentru acest tip specific de instalație.

### 21.4. Scenariul de securitate la incendiu — piesă de proiect tehnic

Detalierea integrală a scenariului de securitate la incendiu (identificarea riscurilor, calculul debitelor de stingere, timpii de intervenție estimați, dimensionarea exactă a sistemelor de detecție/stingere) este o piesă distinctă, întocmită de expertul tehnic PSI la faza de proiect tehnic, obligatorie pentru avizarea/autorizarea ISU conform HG 571/2016 — prezentul memoriu de arhitectură stabilește cadrul de amenajare (distanțe, accese, compartimentare) în care acest scenariu se va încadra, fără a-l anticipa sau a-l înlocui.

### 21.5. Avizarea ISU — precondiție critică a proiectului

Se subliniază, ca observație finală a acestui capitol, faptul că **avizarea de securitate la incendiu de către ISU este o precondiție critică** pentru autorizarea și funcționarea acestei platforme, dat fiind riscul MARE asociat — o precondiție care nu poate fi tratată ca o formalitate administrativă ulterioară, ci trebuie integrată din primele faze de proiectare (D.T.A.C., prezentul memoriu) prin adoptarea consecventă a distanțelor minime NFPA 855/P118 și a soluțiilor de acces descrise mai sus, tocmai pentru a evita riscul unei respingeri sau al unor solicitări de redimensionare majoră la faza de proiect tehnic.

---

## 22. SIGURANȚA ÎN EXPLOATARE

### 22.1. Riscurile de siguranță în exploatare, distincte de riscul de incendiu

Dincolo de riscul specific de incendiu/ambalare termică, tratat pe larg la capitolele 13 și 21, platforma prezintă riscuri de siguranță în exploatare de natură mai convențională, specifice oricărei instalații tehnice cu echipamente electrice și cu circulație de vehicule și personal: riscul de electrocutare la manipularea echipamentelor de medie/joasă tensiune (gestionat prin protocoale de lockout/tagout și prin protecțiile electrice detaliate în memoriul de instalații), riscul de cădere/alunecare pe platformele exterioare în condiții de umiditate sau de îngheț (gestionat prin finisajul antiderapant descris la capitolul 15.2 și prin întreținerea sezonieră a suprafețelor circulabile), și riscul de coliziune între vehiculele de mentenanță/intervenție și eventualul personal aflat pe platformă (gestionat prin lățimea generoasă a culoarelor de circulație, capitolul 10.2, și prin semnalistica de circulație internă).

### 22.2. Protocoalele de acces controlat

Accesul la zona de containere de baterii și la zona PCS/transformator, în afara intervențiilor de mentenanță programată, este restricționat prin sistemul de control acces descris la capitolul 11.3, cu scopul explicit de a preveni pătrunderea neautorizată sau accidentală a unor persoane fără instruire specifică în zonele cu risc electric sau chimic ridicat.

---

## 23. DEZAFECTAREA, RECICLAREA BATERIILOR ȘI CICLUL DE VIAȚĂ AL INSTALAȚIEI

### 23.1. Durata de viață preconizată și criteriile de dezafectare

La atingerea unui prag de degradare preconizat (orientativ, **≥15 ani de exploatare sau peste ~6.000 de cicluri complete de încărcare-descărcare**, prag care depinde de chimia exactă a celulelor și de condițiile reale de operare, confirmat de producător prin garanția de performanță și de memoriul de instalații prin monitorizarea SOH — State of Health — a bateriilor), capacitatea utilă a instalației scade sub pragul economic de operare eficientă, moment la care se declanșează procesul de dezafectare parțială sau totală a containerelor de baterii.

### 23.2. Secvența de dezafectare

Dezafectarea urmează o secvență controlată: **descărcare controlată** a bateriilor la un nivel de stare de încărcare (SoC) sigur pentru transport, conform reglementărilor de transport al mărfurilor periculoase și conform protocolului BMS al producătorului; **demontarea modulelor și a rack-urilor** din interiorul containerelor, operațiune executată de personal specializat, cu respectarea acelorași protocoale de siguranță electrică aplicate în exploatarea curentă; și **predarea către un operator autorizat de reciclare** a deșeurilor de baterii, conform cadrului legal (Directiva 2006/66/CE, OUG nr. 5/2015, Regulamentul UE 2023/1542), care recuperează materialele valoroase și potențial reciclabile ale bateriilor litiu-fier-fosfat (litiu, fier, cupru, aluminiu — chimia LFP fiind, de altfel, considerată una dintre cele mai favorabile din perspectiva reciclării ulterioare, prin absența cobaltului și a nichelului prezente în alte chimii litiu-ion).

### 23.3. Opțiunea de „second-life"

O alternativă la reciclarea imediată, din ce în ce mai frecventă în industrie și care rămâne o decizie a operatorului la momentul dezafectării, este valorificarea modulelor de baterie care încă păstrează o capacitate utilă semnificativă (deși insuficientă pentru aplicația de rețea de înaltă performanță) în aplicații secundare cu cerințe mai reduse de performanță (stocare stochastică rezidențială sau industrială de capacitate mai mică), soluție care extinde ciclul de viață util al materialului activ înainte de reciclarea finală.

### 23.4. Readucerea terenului la starea inițială sau la o nouă utilizare

La finalul complet al ciclului de viață al instalației, platformele betonate ale containerelor (capitolul 7) pot fi, după caz, dezafectate prin demolare controlată și reciclarea agregatelor de beton rezultate, sau păstrate ca infrastructură reutilizabilă pentru o nouă generație de containere de stocare, dacă tehnologia și amplasamentul rămân adecvate — decizie economică a operatorului, care nu afectează soluția de arhitectură a prezentului proiect, dar care este menționată aici pentru completitudinea tratării ciclului de viață al investiției.

### 23.5. Managementul deșeurilor periculoase pe durata exploatării

Pe toată durata de exploatare a instalației, eventualele module de baterie defecte, înlocuite individual în cadrul mentenanței corective (nu la dezafectarea finală a întregii instalații), sunt gestionate conform unui plan de management al deșeurilor periculoase (electrolit, componente electrochimice), cu depozitare temporară în condiții de siguranță (containere/recipiente etanșe, dedicate) până la predarea către operatorul autorizat de reciclare — plan detaliat în documentația de mediu a proiectului, nereluat integral în prezentul memoriu de arhitectură.

---

## 24. ORGANIZAREA DE EXECUȚIE ȘI ETAPIZAREA LUCRĂRILOR

### 24.1. Succesiunea logică a lucrărilor

Execuția lucrărilor de amenajare urmează o succesiune logică, dictată de interdependențele constructive: sistematizarea generală a terenului și lucrările de terasament minime (capitolul 14.4), urmate de execuția rețelelor edilitare îngropate (drenaj, canale tehnice de cabluri, capitolul 20.1), apoi execuția platformelor de fundație ale containerelor și a drumurilor/culoarelor betonate (capitolele 7 și 10), execuția bazinului de retenție și a rezervei de apă pentru incendiu (capitolul 14.3), montajul containerelor și al echipamentelor PCS/transformator (livrate ca produse industriale prefabricate, capitolul 6.1), execuția cabinei EMS, și, în final, montajul împrejmuirii, al sistemului CCTV și amenajarea peisagistică perimetrală (capitolele 11 și 17).

### 24.2. Organizarea de șantier

Organizarea de șantier pe durata execuției utilizează, tipic, accesul auto/tehnic principal deja amenajat (capitolul 2.3) și o zonă temporară de depozitare a materialelor de construcție și a echipamentelor de ridicat necesare montajului containerelor (macarale mobile, dat fiind greutatea de 30–35 tone per unitate, capitolul 7.1), poziționată astfel încât să nu interfereze cu succesiunea de execuție a platformelor și să fie eliberată complet la finalul lucrărilor, fără elemente rezultate care ar afecta distanțele de siguranță ale configurației finale.

---

## 25. BILANȚUL DE SUPRAFEȚE, POT, CUT ȘI INDICATORII URBANISTICI

### 25.1. Bilanțul de suprafețe

| Element | Suprafață (mp) |
|---|---|
| Suprafață teren | **~13.000** |
| Amprentă containere baterii (10 buc.) | **~148** |
| Platforme PCS/transformator/celule MT | **~250** (orientativ) |
| Cabină EMS/SCADA | **~30** (orientativ) |
| Rezervă apă + grup pompare + bazin retenție | **~150** (orientativ) |
| Suprafață construită convențională totală (Ac) | **~2.000** |
| Drumuri/culoare betonate de intervenție | inclusă parțial în Ac convențional, conform practicii RGU |
| Spații verzi/perdea perimetrală | **≥20%** din suprafața terenului |

### 25.2. POT și CUT

Suprafața construită convențională (Ac ≈2.000 mp — containere, platforme port-container, cabine tehnice, fără drumurile de acces incluse la calculul POT, conform practicii uzuale de calcul al Regulamentului General de Urbanism, care distinge suprafața construită la sol de suprafața amenajată/betonată necirculabilă prin construcții) raportată la suprafața terenului (~13.000 mp) rezultă în:

**POT ≈ 2.000/13.000 = 15,4%**
**CUT ≈ 0,15** (regim de înălțime parter tehnic pentru toate elementele construite, fără niveluri suprapuse)

Acești indicatori, semnificativ sub pragurile uzuale ale zonelor construite dens (rezidențial, servicii), reflectă natura specifică a investiției — o instalație tehnică la care suprafața dominantă a incintei este ocupată de distanțele de siguranță, de circulațiile de intervenție și de perimetrul vegetal, nu de construcții propriu-zise, conform argumentării de la capitolul 3.1.

### 25.3. Regimul de înălțime și încadrarea urbanistică

Toate elementele construite ale platformei (containere, cabină EMS, eventuale celule de transformare) se încadrează în regimul de **parter tehnic**, cu înălțimea maximă determinată de gabaritul containerului (2,90 m) — un regim de înălțime redus, care nu ridică probleme de încadrare față de eventuale reglementări de înălțime maximă din certificatul de urbanism, specifice de regulă zonelor de infrastructură tehnico-edilitară sau extravilanului cu destinație agricolă schimbată punctual pentru acest tip de investiție.

---

## 26. FORMULELE ȘI INDICATORII DE SINTEZĂ AI PROIECTULUI DE ARHITECTURĂ

### 26.1. Densitatea energetică a amplasamentului

Densitatea energetică raportată la suprafața totală a terenului rezultă din: **d_E = E/S_teren = 50.000 kWh / 13.000 mp ≈ 3,85 kWh/mp**, valoare care reflectă faptul că suprafața incintei este dominată de distanțele de siguranță, nu de conținutul energetic propriu-zis. Raportată exclusiv la amprenta construită a containerelor (~148 mp), densitatea energetică efectivă este considerabil mai mare: **50.000 / 148 ≈ 338 kWh/mp**, valoare care confirmă concentrarea energetică ridicată specifică tehnologiei de stocare în baterii litiu-ion, la nivelul containerului propriu-zis, contrastată cu densitatea redusă la nivelul întregii incinte, dictată de cerințele de siguranță.

### 26.2. Distanța de siguranță — formula generală

Distanța minimă de siguranță adoptată în proiect urmează relația generală: **D_min = max(3,0 m; D_UL9540A)**, unde D_UL9540A reprezintă distanța rezultată, dacă disponibilă la faza de proiect tehnic, dintr-un raport de testare specific configurației de container adoptate, calculată astfel încât fluxul termic radiant incident asupra containerului vecin (q", exprimat în kW/mp) să rămână sub pragul convențional de aprindere a materialelor combustibile adiacente (prag de ordinul a 12,5–20 kW/mp, interval indicativ folosit uzual în ingineria de securitate la incendiu pentru evaluarea radiației termice, a cărui valoare exactă aplicabilă configurației specifice a proiectului se stabilește prin raportul de testare al producătorului, nu se adoptă implicit fără această validare).

### 26.3. Necesarul de răcire per container — reluare sintetică

Așa cum s-a detaliat la capitolul 12.2, necesarul orientativ de răcire per container rezultă din bilanțul energetic al pierderilor de conversie: **Q_HVAC ≈ 200 kW frig/container**, valoare care rămâne de confirmat prin dimensionarea exactă a producătorului la faza de proiect tehnic.

### 26.4. Tabelul sintetic al indicatorilor de arhitectură/amenajare

| Indicator | Valoare |
|---|---|
| Densitate energetică pe teren total | ~3,85 kWh/mp |
| Densitate energetică pe amprentă containere | ~338 kWh/mp |
| POT | ~15,4% |
| CUT | ~0,15 |
| Distanță minimă container-container | ≥3,0 m |
| Distanță minimă container-limită proprietate | ≥6,0 m |
| Culoar de intervenție | ≥6,0 m |
| Necesar de răcire per container | ~200 kW frig |
| Spații verzi | ≥20% din teren |
| Regim de înălțime | Parter tehnic |

---

## 27. LISTA PIESELOR DESENATE

Documentația de arhitectură/amenajare la faza D.T.A.C. cuprinde, orientativ: planul de încadrare în zonă (situarea amplasamentului în context, cu vecinătăți și rețeaua stradală); planul de situație general al incintei, la scară 1:200 sau 1:500, cu poziționarea celor 10 containere, a zonei PCS/transformator, a cabinei EMS, a rezervei de apă și a bazinului de retenție, cu marcarea explicită a tuturor distanțelor de siguranță de la capitolul 5 și a gabaritelor drumurilor de acces de la capitolul 10; planul de sistematizare verticală, cu cotele de nivel și pantele de scurgere (capitolul 14); detalii tip de platformă de fundație container (secțiune, coordonate cu memoriul de structură); detaliu de amplasare și orientare a panourilor de ventilație de deflagrație pe container (capitolul 6.4); planul de împrejmuire și amplasare CCTV (capitolul 11); planul de amplasare a semnalisticii de securitate (capitolul 18); și fișa tehnică sintetică a containerului adoptat (gabarit, greutate, poziția ușilor și a panourilor de venting), anexată de la producătorul echipamentului.

---

## 28. CORELAREA CU MEMORIILE DE SPECIALITATE ȘI VERIFICAREA TEHNICĂ

### 28.1. Interfețele cu celelalte memorii

Prezentul memoriu de arhitectură se corelează, așa cum s-a menționat punctual în capitolele precedente, cu: memoriul de structură (dimensionarea platformelor de fundație, ancorajul seismic — capitolele 7 și 19), memoriul de instalații electrice + PSI (arhitectura electrică, BMS/EMS, protecțiile, breviarul de calcul termic detaliat, sistemul de detecție/stingere — capitolele 12, 13 și 20), memoriul general al investiției (încadrare urbanistică, avize, oportunitate economică — capitolul 1), și documentația de mediu (acordul de mediu, planul de gestionare a deșeurilor periculoase — capitolul 23).

### 28.2. Verificarea tehnică

Documentația de arhitectură se supune verificării tehnice de calitate conform Legii nr. 10/1995, pentru cerințele fundamentale relevante componentei de arhitectură (în principal cerința B — securitate la incendiu, dat fiind riscul MARE al instalației, și cerința A — rezistență mecanică și stabilitate, în interfața cu platformele de fundație), de către verificatori atestați pentru specialitățile Ci (rezistență) și, în special, de către expertul/verificatorul de securitate la incendiu, a cărui confirmare a distanțelor, compartimentării și accesului de intervenție descrise în prezentul memoriu este o condiție prealabilă obținerii avizului ISU (capitolul 21.5).

---

## 29. CONCLUZII — CELE ȘASE CERINȚE FUNDAMENTALE DE CALITATE

Soluția de arhitectură/amenajare a platformei tehnice BESS de 25 MW/50 MWh răspunde celor șase cerințe fundamentale de calitate ale Legii nr. 10/1995, particularizate pentru natura specifică a acestei instalații:

**A — Rezistență mecanică și stabilitate**: platformele de fundație de beton armat, dimensionate pentru greutatea de 30–35 tone per container și ancorate seismic conform clasei de importanță III (γ_I = 1,0), asigură stabilitatea fiecărei unități de stocare, coordonat cu memoriul de structură (capitolele 7 și 19).

**B — Securitate la incendiu**: cerința centrală și dominantă a proiectului, tratată integral prin cei patru piloni complementari — distanțe de separare ≥3,0 m conform NFPA 855 (sau conform raportului UL 9540A, dacă disponibil și favorabil), compartimentare la foc EI 120 la construcțiile propriu-zise, sistem de detecție multi-strat și de stingere prin răcire cu apă, și acces de intervenție ISU pe cel puțin două direcții, cu drum perimetral inelar și hidranți exteriori — un tratament integral al riscului MARE identificat (capitolele 5, 10, 13 și 21).

**C — Igienă și protecția mediului**: bazinul de retenție dedicat pentru apele de stingere contaminate, care previne evacuarea necontrolată a acestora în emisar sau în sol (capitolul 14), și planul de reciclare/dezafectare a bateriilor la sfârșitul duratei de viață, conform cadrului legal european și național (capitolul 23), completate de acordul de mediu specific, tratat separat de documentație.

**D — Siguranță și accesibilitate în exploatare**: circulațiile dimensionate pentru gabaritul autospecialelor de intervenție și pentru echipamentele de mentenanță, sistemul de supraveghere video și de control acces perimetral, operarea de la distanță prin SCADA a instalației (fără personal permanent expus riscurilor curente), și măsurile minime, dar reale, de accesibilitate pentru persoanele cu mobilitate redusă la cabina de comandă (capitolele 9, 10, 11, 16 și 22).

**E — Protecția împotriva zgomotului**: amplasarea tipică în context extravilan/periurban, la distanță de construcții locuite, combinată cu atenuarea suplimentară a perdelei vegetale perimetrale, situează impactul fonic al echipamentelor HVAC și al transformatorului sub limitele reglementate pentru zone tehnice (capitolul 17.5).

**F — Economia de energie și izolarea termică**: managementul termic dedicat al fiecărui container (HVAC propriu, dimensionat orientativ la ~200 kW frig/unitate) menține bateriile în intervalul optim de temperatură, maximizând randamentul round-trip al instalației (~87–88,5%) și durata de viață a bateriilor, cu o eficiență energetică suplimentară posibilă prin adoptarea răcirii lichide în locul climatizării pe bază de aer (capitolul 12).

Detalierea completă a tuturor soluțiilor prezentate — dimensionarea exactă a platformelor de fundație, validarea distanțelor prin raportul UL 9540A specific configurației de container contractate, și scenariul de securitate la incendiu întocmit de expertul PSI — rămâne obiectul proiectului tehnic (PTh), fază la care **avizarea ISU constituie precondiția critică** pentru continuarea investiției, așa cum s-a subliniat la capitolul 21.5. Prezentul memoriu de arhitectură este semnat de arhitectul proiectant și, pentru specialitățile conexe relevante componentei de arhitectură (Ci — rezistență, Ie — economie de energie, Ci/B — securitate la incendiu), de verificatorii tehnici atestați corespunzători.

---

## 30. GLOSAR DE TERMENI ȘI ABREVIERI

- **BESS** — Battery Energy Storage System, sistem de stocare a energiei electrice în baterii.
- **BMS** — Battery Management System, sistemul de gestiune a bateriei la nivel de celulă/modul/rack, prima linie de protecție împotriva ambalării termice.
- **EMS** — Energy Management System, sistemul de gestiune energetică la nivel de instalație (comandă PCS, dispecerizare, servicii de sistem).
- **SCADA** — Supervisory Control and Data Acquisition, sistemul de supervizare, control și achiziție de date.
- **PCS** — Power Conversion System, echipamentul de conversie bidirecțională curent continuu/curent alternativ.
- **LFP** — Litiu-Fier-Fosfat, chimia bateriei adoptate în prezentul proiect, considerată mai stabilă termic decât alte chimii litiu-ion.
- **Thermal runaway (ambalare termică)** — proces exoterm autosusținut la nivelul celulei de baterie, cu degajare de gaze inflamabile/toxice, cu potențial de propagare în cascadă.
- **NFPA 855** — standardul american de referință pentru instalarea sistemelor staționare de stocare a energiei, sursa principală a distanțelor de siguranță adoptate.
- **UL 9540 / UL 9540A** — standardul de certificare a sistemului BESS, respectiv metodologia de testare a propagării termice în cascadă.
- **NFPA 68 / NFPA 69 / EN 14994** — standardele de dimensionare a ventilației de deflagrație (venting) pentru prevenirea/atenuarea exploziei.
- **P118-1/2/3** — normativele naționale de securitate la incendiu (rezistență, instalații de stingere, detecție/semnalizare).
- **EI 120** — clasificarea de rezistență la foc a unui element de compartimentare (etanșeitate și izolare termică pe o durată de 120 de minute).
- **SoC** — State of Charge, starea de încărcare a bateriei.
- **SOH** — State of Health, starea de sănătate/degradare a bateriei, monitorizată pentru mentenanța predictivă și pentru decizia de dezafectare.
- **η_RT** — randamentul round-trip al instalației (raportul dintre energia livrată la descărcare și energia consumată la încărcare).
- **ISU** — Inspectoratul pentru Situații de Urgență, autoritatea de avizare/autorizare de securitate la incendiu.
- **POT / CUT** — Procent de Ocupare a Terenului / Coeficient de Utilizare a Terenului, indicatori urbanistici.
- **RGU** — Regulamentul General de Urbanism (HG nr. 525/1996).
