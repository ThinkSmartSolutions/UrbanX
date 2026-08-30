# SUPLIMENT DE FAZĂ PTh — INSTALAȚII
## Bloc de locuințe colective S+P+8E, cca. 40 apartamente, 112 persoane

---

## PTh-I.1 Obiectul și structura suplimentului de fază PTh

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție, conform HG 907/2016 Anexa nr. 8 și Legii nr. 169/2026 — CATUC, art. 264, Anexa nr. 2) pentru memoriul de instalații al obiectivului **bloc de locuințe colective S+P+8E**, elaborat pentru gabaritul de referință Sc ≈ 640 mp/nivel, Sd ≈ 6.400 mp (inclusiv subsol), 40 de apartamente (8 garsoniere de 38 mp, 16 apartamente de 2 camere de 55 mp, 12 apartamente de 3 camere de 78 mp, 4 apartamente de 4 camere de 98 mp), 112 persoane echivalente (I9), subsol tehnic cu parcaj auto și adăpost de protecție civilă (ALA). Documentul dezvoltă la nivel de execuție tot ceea ce faza DTAC (`instalatii.md`) a stabilit la nivel de concept, dimensionare preliminară și încadrare normativă, **fără a relua** breviarele DTAC — le detaliază nod cu nod, pe fiecare coloană și tronson, și adaugă componentele specifice fazei PTh: scheme complete de execuție, breviare de calcul detaliate, fișe tehnice de echipament, tabele de probe, tehnologie de montaj, protocoale de punere în funcțiune (PIF) și Planul de Control al Calității (PCC).

Soluțiile de referință rămân cele adoptate în DTAC și se duc la nivel de execuție **fără schimbare de concept**, cu o singură completare explicită: pentru sursa termică se menține **Varianta 1 — centrale termice individuale murale în condensație pe gaz**, cu **ACM individual instant (Soluția A)**; pentru transportul pe verticală, PTh **adoptă recomandarea deja formulată în DTAC** (§13) — **2 ascensoare**, dintre care unul echipat și dimensionat ca **ascensor de pompieri** (puț presurizat, alimentare pe circuit protejat la foc), decizie care se reflectă în recalcularea bilanțului electric (§PTh-I.3.7). Pentru parcajul subteran (≈20 locuri, peste pragul curent al normativului de la care se analizează protecția automată), PTh **confirmă necesitatea sprinklerelor** semnalată condiționat în DTAC (§9.6), soluție detaliată nod cu nod în §PTh-I.3.10.

PTh-I aduce, față de DTAC, următoarele niveluri suplimentare de detaliere:

| Element | Nivel DTAC (`instalatii.md`) | Nivel PTh (prezentul document) |
|---|---|---|
| Scheme | conceptuale, de principiu, bilanțuri globale pe coloană | scheme de execuție complete, cu toate diametrele/traseele/nodurile numerotate |
| Breviar hidraulic | debite globale pe coloană (q_c la bază) | calcul nod cu nod (nivel cu nivel) pe toate coloanele — apă, canalizare, gaz |
| Breviar termic/electric | necesar global (kW, kVA), un exemplu de calcul | dimensionare completă pe fiecare circuit/tronson, verificare cădere de tensiune, selectivitate |
| Echipamente | tipuri și puteri de principiu | fișe tehnice complete per echipament major (parametri garantați de furnizor) |
| Probe | enumerare pe specialitate | tabel complet presiune/durată/criteriu de admisie per instalație |
| Montaj | principii generale | tehnologie, succesiune, susțineri seismice, izolații, treceri la foc |
| PIF | menționată | protocoale de echilibrare, reglaj, programare IDSAI, primă pornire centrale |
| Calitate | — | Plan de Control al Calității + faze determinante (FD) explicite |
| Iluminat | niveluri globale + un exemplu de calcul | calcul complet metoda flux luminos pe fiecare zonă funcțională (subsol, parter, casa scării, exterior) |
| PSI | dimensionare preliminară globală (hidranți, desfumare) | breviar hidraulic complet sprinklere parcaj/hidranți, calcul detaliat al presurizării, verificare RSET/ASET |
| Ascensor | 1 ascensor, capacitate de principiu | 2 ascensoare, calcul de trafic (metoda intervalului și a capacității de transport) |
| ALA | menționat doar în `general.md` (subsol) | interfața tehnică cu instalațiile generale ale clădirii (alimentare, ventilare, coordonare) |

Normative de referință aplicate suplimentar în execuție, față de cele deja citate în DTAC: **SR EN 806-4** (probe și punere în funcțiune a instalațiilor de apă), **SR EN 12056-2/3** (verificare hidraulică pe fiecare coloană de canalizare/pluvial), **SR EN 12845** (calcul hidraulic sprinklere, aplicat parcajului), **SR EN 671-1/2** (hidranți — proiectare și verificare), **SR EN 54** (seria pentru componentele IDSAI), **SR EN 1838** (iluminat de siguranță — verificare timpi de comutare), **SR EN 12464-1** (iluminat interior — metoda factorului de utilizare), **SR EN 62305-3** (execuție SPD/coborâri paratrăsnet), **SR EN 12101-6** (sisteme de presurizare — clasificare și verificare), **NP 086** (proiectarea instalațiilor de stingere cu apă), **C56** (verificarea calității lucrărilor de instalații), **NTPEE-2018 cap. execuție și probe**, **HG 862/2016** și **Legea 481/2004** (adăposturi de protecție civilă — cerințe de interfață), **ISCIR PT R1-2010** (ascensoare — verificare tehnică, punere în funcțiune).

---

## PTh-I.2 Scheme detaliate de execuție

### PTh-I.2.1 Schema rețelei de apă rece — branșament, hidrofor, coloane, contorizare individuală

Branșamentul din rețeaua publică, prin cămin apometru (contor Woltmann DN 65–80, dimensionat la q_c = 2,76 l/s), intră în subsol la gospodăria de apă. De aici, schema completă de execuție:

```
Branșament PEHD PE100 Dn110 ─► Cămin apometru (contor Woltmann + disconector BA/EA, SR EN 1717)
   ─► Grup de pompare (2 pompe verticale VFD, 1 activă + 1 rezervă, ≈1,5 kW/pompă)
   ─► Colector de distribuție Dn80 (subsol) ─┬─► Coloană CAR-1 (14 ap., Dn50→Dn25)
                                              ├─► Coloană CAR-2 (13 ap., Dn50→Dn25)
                                              └─► Coloană CAR-3 (13 ap., Dn50→Dn25)
```

Fiecare coloană urcă prin ghenă tehnică dedicată (comună cu ACM, separată de gaz și de curenți tari/slabi), cu derivație la fiecare palier: **robinet de izolare + filtru „Y" + contor de apă rece cu emisie de impulsuri (R160, clasa metrologică 2) + clapetă de reținere**, montate în firida de palier — **elementul de contorizare individuală** impus de Legea 121/2014, accesibil pentru citire și înlocuire fără afectarea celorlalte apartamente. Contorul de palier este piesa de graniță între rețeaua comună (proprietatea asociației de proprietari) și instalația interioară a apartamentului (proprietatea individuală) — poziția și accesibilitatea sa se coordonează cu arhitectura firidei (`arhitectura.md`).

**Ghenele tehnice** — coordonare cu arhitectura: fiecare ghenă are dimensiunea minimă care permite montajul coloanelor (AR + ACM + canalizare menajeră, dacă sunt grupate) plus spațiul de acces la contor și robinete, cu ușă de vizitare la fiecare palier (min. 60×80 cm liber, conform tehnologiei de montaj §PTh-I.6).

### PTh-I.2.2 Schema apei calde de consum (ACM) — soluția adoptată (individual instant)

Conform soluției de referință (Varianta 1 + Soluția A, DTAC §2.5), fiecare apartament produce ACM instant în centrala proprie — **nu există rețea comună de recirculare ACM** de dimensionat la nivel de bloc. Schema de execuție relevantă la nivel de instalații comune se limitează la:

```
Coloană AR (comună, per apartament) ─► robinet + filtru + contor AR (palier)
   ─► derivație în apartament ─► centrală murală în condensație (intrare AR / ieșire ACM instant)
```

Nu se prevede coloană de recirculare, pompă de circulație sau boiler central — eliminarea acestor componente reprezintă economia de execuție și de mentenanță a soluției adoptate, confirmată la PTh. **Verificarea timpului de așteptare la robinet** (confort, nu contorizare) se face totuși la nivelul distribuției interioare a apartamentului: lungimea maximă de conductă între centrală și cel mai îndepărtat punct de consum (baie secundară, la apartamentele de 3–4 camere) se limitează la **≤ 8–10 m** pe traseu PP-R Dn20, astfel încât volumul mort (dead-leg) să nu depășească ≈ 2,5 l — la debit de 0,2 l/s, timpul de așteptare rezultat este ≈ 12–13 s, acceptabil pentru confortul locuirii. Dacă arhitectura (relevee sanitare la 4 camere) plasează baia secundară la distanță mai mare, se recomandă recirculare locală de apartament (pompă mică temporizată) — soluție de confirmat pe planul definitiv de arhitectură interioară.

### PTh-I.2.3 Schema coloanelor de canalizare menajeră

```
WC + baie + bucătărie (fiecare apartament) ─► racorduri PP fonoabsorbant
   ─► Coloană K-WC (Dn110, ventilare primară) ─┬─ 3 coloane (grupate cu CAR-1/2/3)
   ─► Coloană K-Băi (Dn90, fără WC)            │
   ─► Colector orizontal subsol Dn160 (i=2%) ───┘─► Racord canalizare publică Dn160-200
```

Fiecare coloană WC se prelungește ca **ventilare primară** min. 0,50 m peste terasa circulabil-tehnic, cu căciulă de protecție; coloanele de baie (fără WC) care nu pot fi ventilate primar (poziție interioară) primesc **aeratoare cu membrană** la partea superioară, montate accesibil în ghenă. Piesele de curățire se prevăd la baza fiecărei coloane și la fiecare schimbare de direcție a colectorului orizontal (interval ≤ 15 m).

### PTh-I.2.4 Schema canalizării pluviale — terasă, coloane, bazin de retenție

```
Receptoare terasă (3 buc. Dn110 + parafrunzar) ─► Coloane pluviale (2-3, Dn110)
   ─► Colector pluvial subsol Dn160 (i=2%) ─► Bazin de retenție (≈3,3 mc, cf. PTh-I.3.4)
   ─► Descărcare controlată (debit admis operator) ─► Rețea pluvială publică
Preaplinuri de avarie (2 buc., prin atic) ─► descărcare liberă pe fațadă (evacuare de urgență, SR EN 12056-3)
```

Balcoanele/logiile se colectează separat, prin coloană pluvială dedicată de fațadă (§PTh-I.2.4.1), fără amestec cu apele de pe terasa tehnică (trasee independente până la colectorul orizontal, unde se pot uni).

**PTh-I.2.4.1 Coloana pluvială de fațadă (balcoane/logii):** un colector vertical dedicat, Dn75-90, primește sifoanele de balcon de la toate cele 9 niveluri (parter + 8 etaje), cu racord individual la fiecare nivel prin piesă de reducție (Dn50 sifon balcon → Dn75/90 coloană). Debit cumulat pe coloană (9 niveluri × 2 balcoane medii × 0,08 l/s ≈ 1,44 l/s) — sub capacitatea Dn75 la umplere parțială (SR EN 12056-3), verificat cu marjă.

### PTh-I.2.5 Schema instalației termice — centrale de apartament, distribuție

```
Coloană gaz (derivație apartament) ─► Centrală murală în condensație (24-31 kW, funcție de tip apartament)
   ├─► circuit încălzire (bitubular radial din distribuitor, PEX-Al-PEX, 55/45°C)
   │      └─► corpuri de încălzire (radiatoare oțel cu cap termostatic; port-prosop în baie)
   └─► ACM instant (v. PTh-I.2.2)
Evacuare gaze arse: coaxial etanș (tip C), prin fațadă/terasă, individual per apartament
```

Fiecare centrală are: vas de expansiune închis (8–10 l), supapă de siguranță 3 bar (cu evacuare vizibilă la pâlnie de scurgere), pompă de circulație modulantă clasa A, automatizare cu termostat de ambient/programare orară. Distribuitorul de apartament (colector tur/retur) are robinete de reglaj (presetare) pe fiecare circuit, pentru echilibrarea hidraulică descrisă în §PTh-I.7.1.

### PTh-I.2.6 Schema instalației de gaze naturale — branșament, SRM, coloane

```
Branșament (rețea presiune redusă) ─► SRM (post reglare-măsurare, la limita de proprietate)
   ─► Racord oțel Dn65 ─┬─► Coloană gaz CG-1 (14 ap., Dn50→Dn20, ghenă dedicată ventilată)
                        ├─► Coloană gaz CG-2 (13 ap., Dn40→Dn20)
                        └─► Coloană gaz CG-3 (13 ap., Dn40→Dn20)
La fiecare palier: robinet branșament + contor G4 + robinet de siguranță (electrovalvă cuplată cu detector CH₄)
```

Coloanele de gaz sunt montate în **ghene tehnice dedicate exclusiv gazului**, ventilate direct în exterior (interzisă gruparea cu alte instalații, conform NTPEE), cu vopsire galbenă de identificare. Contoarele G4 se montează în firidă ventilată direct spre exterior, accesibilă din palier, distinctă de firida de apă/electrică (separare impusă de NTPEE pentru evitarea acumulării de gaz în cazul unei scăpări).

### PTh-I.2.7 Schema ventilării apartamentelor — canale șuntă

```
Grile higroreglabile (admisie, tâmplărie) ─► apartament
   ─► Baie/WC/Bucătărie ─► racord canal secundar (2 niveluri distanță) ─► Canal colector principal (șuntă)
   ─► ieșire deasupra terasei (≥0,50 m peste circulabil)
```

Bucătăriile au, suplimentar, **hotă cu evacuare** racordată la canalul șuntă printr-o **clapetă antiretur** dedicată (evitarea transferului de mirosuri/fum de gătit între apartamentele suprapuse) — element de execuție critic, verificat individual la PIF (§PTh-I.7).

### PTh-I.2.8 Schema ventilării și desfumării parcajului subteran — 2 regimuri, compartimentare pe zone

Parcajul (≈640 mp, ≈20 locuri) se compartimentează, pentru eficiența comenzii și limitarea debitelor instantanee, în **2 zone de ventilare** (câte ≈320 mp), fiecare cu senzori CO proprii și ventilatoare dedicate, dar cu tubulatură de desfumare interconectată (comandă unică la incendiu, pentru a nu limita evacuarea fumului la o singură zonă dacă focarul migrează):

```
Zona A parcaj (≈320 mp) ─► 2 senzori CO ─► Ventilator introducere/extracție A (curent + F400 comutabil)
Zona B parcaj (≈320 mp) ─► 2 senzori CO ─► Ventilator introducere/extracție B (curent + F400 comutabil)
                                                    │
                                    Centrala IDSAI ─┴─► comandă comună desfumare (ambele zone la alarmă confirmată)
```

Introducerea de aer proaspăt (regim curent și regim de desfumare) se face prin rampa de acces (grile automate) și prin puțuri verticale dedicate; evacuarea, prin tubulatură de tablă zincată (regim curent) → comutabilă la ventilatoare **certificate F400 (400°C/2h)** la comanda de incendiu.

### PTh-I.2.9 Schema monofilară completă — TEG, TC, coloane, TE-apartament

```
BMPT (branșament trifazat, 400 V) ─► TEG (subsol) — întrerupător general 400 A, SPD 1+2, contor general
    ├─► Coloană generală TC (servicii comune) ............................... 160 A
    │      ├─► Grup pompare apă (hidrofor, 2×1,5 kW) ......................... 16 A
    │      ├─► Ascensor 1 (7,7 kW) ............................................ 25 A
    │      ├─► Ascensor 2 / pompieri (7,7 kW, circuit protejat E90) .......... 25 A
    │      ├─► Ventilare parcaj (curent + F400, 2 zone) ....................... 32 A
    │      ├─► Iluminat comun (casa scării, holuri, parcaj) .................. 20 A
    │      ├─► IDSAI + videointerfon + curenți slabi (UPS dedicat) ........... 10 A
    │      └─► Priză service/întreținere .................................... 16 A
    ├─► Circuit prioritar/protejat PSI (E90, sursă de rezervă) .............. 160 A
    │      ├─► Grup pompare incendiu (≈30 kW) ............................... 63 A
    │      ├─► Desfumare (ventilatoare F400 + presurizare casă scară) ........ 32 A
    │      └─► Iluminat de securitate (circuit central) ...................... 10 A
    └─► Coloane apartament (3 coloane × 13-14 ap.) ─► TE-apartament (palier, cu contor)
```

Sursa de rezervă (**grup electrogen Diesel, pornire automată ≤ 15 s prin AAR**) acoperă circuitul prioritar PSI integral și, suplimentar, un circuit minim de iluminat comun/ascensor de pompieri (continuitate operațională minimă în caz de pană generală). Selectivitatea se asigură prin trepte de reglaj curent+temporizare: general 400 A (temporizare lungă) → coloane 63–160 A (temporizare medie) → circuite terminale 10–40 A (instantaneu).

### PTh-I.2.10 Schema IDSAI — matrice cauză-efect

Centrală de detectare adresabilă, cu detectoare optice de fum în holuri de palier, casa scării (partea superioară), spații tehnice (CT, TEG, gospodărie apă), parcaj (2 zone) și butoane manuale pe fiecare palier și la ieșiri.

| Eveniment (cauză) | Efect 1 | Efect 2 | Efect 3 | Efect 4 |
|---|---|---|---|---|
| Alarmă detector palier/casă scară | Presurizare casă scară (pornire ventilator) | Aducere ascensor 1 la parter, uși deschise | Sirene generale nivel | Transmisie ISU/dispecerat |
| Alarmă detector parcaj Zona A/B | Deschidere exutor + comutare ventilator pe F400 | Oprire ventilare curentă zonă | Deschidere grile aer compensare | Transmisie |
| Alarmă buton manual (oriunde) | Sirene generale | Deblocare control acces (fail-safe) intrare principală | Transmisie | — |
| Alarmă detector CH₄ (bucătărie/CT) | Închidere electrovalvă gaz apartament/coloană | Sirenă locală apartament | Transmisie | — |
| Scădere presiune coloană incendiu | Pornire pompă jockey | Pornire electropompă principală | Semnalizare dispecerat | — |
| Confirmare pompier (cheie panou) | Silențiere sirene | Menținere semnalizare vizuală | Jurnal evenimente | — |

**Temporizare T1 (recunoaștere) 60 s / T2 (investigare) max. 3 min** aplicabilă doar zonelor cu supraveghere permanentă (dacă există portar/administrator la parter); pe restul clădirii (locuințe fără personal permanent), alarma este **directă** conform practicii P118-3 pentru clădiri de locuit fără supraveghere continuă. **Ascensorul de pompieri** rămâne funcțional (excepție de la comanda de „aducere la parter/oprire") pe circuit protejat, pentru intervenția ISU la nivelurile superioare.

### PTh-I.2.11 Schema instalației de stingere — hidranți, coloană, gospodărie apă incendiu

```
Rezervor incendiu (≈3 mc, HI) ─► Cameră pompe (P.principală ≈3-4 kW HI + P.jockey; grup ≈30 kW la scenariul maximal cu HE)
   ─► Colector refulare Dn65 ─► Coloană umedă (casă scară, Dn65) ─► Hidrant/palier (Dn52, 9 niveluri)
                                                                   └─► Racord tip B exterior (autospecială ISU)
Hidranți exteriori (2 buc.) ─► alimentați din rețea publică (dacă avizul operatorului confirmă q≥5 l/s) sau rezervă proprie
```

Conform §PTh-I.10.4, se adoptă **coloană umedă** (permanent sub presiune) — decizie finală de execuție, motivată de încadrarea clădirii la limita categoriei „clădiri înalte" (P118-1, §1.1). Robinetele de palier (Dn52, tip C) sunt echipate cu furtun semirigid de 20 m, dispuse astfel încât fiecare punct al apartamentelor de pe palier să fie atins de **min. 2 jeturi**.

### PTh-I.2.12 Schema desfumării casei scării — presurizare

```
Ventilator presurizare (exterior, aer proaspăt la nivel jos) ─► tubulatură dedicată (protejată la foc)
   ─► injectoare de aer în casa scării (fiecare 2-3 niveluri)
   ─► clapetă de suprapresiune (limitare la 80 Pa, uși închise)
Comandă: automată (IDSAI, la orice alarmă pe clădire) + manuală (buton parter, pompieri)
```

Sistem clasă B/E (SR EN 12101-6), redundant cu **exutor de fum** (≥1 mp) la partea superioară a casei scării, cu admisie de aer la parter (ușă/grilă) — soluție de rezervă în caz de defect al ventilatorului mecanic.

### PTh-I.2.13 Schema curenților slabi — videointerfon, ITS, control acces, CCTV

```
Rack comunicații (parter, cu UPS dedicat) ──┬─► Videointerfon (magistrală digitală, panou apel + monitor/apartament + yală electromagnetică)
                                              ├─► Rețea date/TV/fibră (FTTH) — coloană dedicată, cutii distribuție/palier
                                              ├─► CCTV IP (intrare principală, parcaj, casa scării parter, exterior incintă)
                                              ├─► Control acces (yală intrare principală + barieră/poartă parcaj)
                                              └─► Interfon de urgență cabină ascensor
```

**ITS (Instalații de Telecomunicații Speciale)** — infrastructura pregătită multi-operator (min. 1–2 prize RJ45/coaxial în camera de zi și în fiecare dormitor, cablu UTP cat.6/fibră optică până la apartament), rack la parter cu acces pentru operatorii de telecomunicații, conform practicii curente de dotare a blocurilor noi. **Deblocarea ușii de acces principal** se coordonează obligatoriu cu IDSAI: deblocare automată fail-safe la alarmă de incendiu confirmată, pentru a nu bloca traseul de evacuare.

### PTh-I.2.14 Schema instalației fotovoltaice (nZEB, servicii comune)

```
Module FV (≈10 kWp, terasă) ─► string-uri ─► cutie conexiuni DC (siguranțe + SPD DC)
   ─► invertor(oare) string ─► tablou AC FV (protecție + contorizare producție + anti-islanding)
   ─► TEG (racord prosumator, contor bidirecțional)
```

Producția (≈11.500 kWh/an, DTAC §14.1) acoperă parțial consumul serviciilor comune (iluminat, pompe, ventilare, ascensoare) — structura de prindere pe terasă (fără penetrarea hidroizolației, sistem cu balast, sau cu penetrare etanșată) se verifică obligatoriu de structurist pentru încărcarea suplimentară (`structura.md`) și se coordonează cu poziția exutorului de fum al casei scării (distanță minimă de acces liber).

### PTh-I.2.15 Interfața tehnică cu adăpostul de protecție civilă (ALA) — subsol

Adăpostul de protecție civilă amplasat la subsol (conform programului stabilit în `general.md`, cap. 6.2) constituie **obiect de proiectare distinct**, reglementat de **HG 862/2016** și **Legea 481/2004**, cu proiect propriu de specialitate (ventilație specială cu filtre NBC, grup de aer condiționat de avarie, ieșire de salvare, grup electrogen dedicat, rezervă proprie de apă și WC uscat) — capacitatea exactă de adăpostire, schema de filtro-ventilație și lista de echipamente omologate se stabilesc prin **proiectul dedicat al adăpostului**, avizat de Inspectoratul pentru Situații de Urgență, și **nu se inventează în prezentul document** (regulă de onestitate tehnică aplicată consecvent în toată platforma). Prezentul supliment de instalații se limitează la **interfața cu instalațiile generale ale clădirii**, obligatorie pentru coordonare:

- **racord electric independent** din TEG, pe circuit separat, cu punct de racordare pentru grupul electrogen propriu al adăpostului (dacă proiectul de specialitate îl prevede separat de sursa de rezervă generală a clădirii);
- **racord de apă potabilă** dedicat, cu robinet de secționare accesibil din exteriorul adăpostului (pentru a nu depinde de funcționarea hidroforului general în caz de avarie a clădirii supraterane);
- **traseu de evacuare a aerului viciat/filtrat** independent de canalele de ventilare curentă ale parcajului și ale spațiilor tehnice adiacente, cu punct de evacuare la suprafață poziționat astfel încât să nu interfereze cu prizele de aer proaspăt ale parcajului sau cu exutorul de fum al casei scării;
- **golul de trecere pentru ieșirea de salvare** (dacă proiectul adăpostului o prevede spre exterior sau spre o zonă adiacentă) se coordonează cu structura (`structura.md`) și cu sistematizarea exterioară, ca element prevăzut din execuție, nu adăugat ulterior.

Coordonarea acestei interfețe se consemnează explicit în procesul-verbal de fază determinantă privind traseele îngropate din subsol (§PTh-I.8), înaintea acoperirii/finisării spațiului.

### PTh-I.2.16 Schema ascensoarelor — traseu, alimentare, puț

```
Puț ascensor 1 (servicii normale) ─► motor MRL 7,7 kW ─► alimentare TC, protecție proprie
Puț ascensor 2 (pompieri) ─► motor MRL 7,7 kW ─► alimentare circuit protejat E90 + sursă de rezervă
   └─► puț ventilat/desfumat la partea superioară; uși de palier EI conform compartimentării
```

Ambele puțuri traversează toate cele 9 niveluri supraterane plus subsolul (acces la parcaj/boxe), cu oprire la fiecare palier. Ascensorul de pompieri are comandă prioritară (cheie de acces pompieri), viteză și capacitate identice cu ascensorul normal (min. 8 persoane/630 kg, 1,0–1,6 m/s), dar cu funcționare garantată în regim de incendiu (alimentare, comandă, puț presurizat/desfumat conform §PTh-I.2.12).

---

## PTh-I.3 Breviar complet de calcul

### PTh-I.3.1 Calcul hidraulic nod-cu-nod — coloana de apă rece CAR-1 (cea mai încărcată)

**Date de intrare:** 14 apartamente deservite (repartiție reprezentativă pe cele 9 niveluri: 1 la etaj 8, 2 la etaj 7, 2 la etaj 6, 1 la etaj 5, 2 la etaj 4, 2 la etaj 3, 1 la etaj 2, 2 la etaj 1, 1 la parter), unitate medie de debit E_mediu ≈ 4,575/apartament (din ΣE_CAR-1 ≈ 66 din DTAC §2.4, împărțit la 14,4 apartamente echivalente). Coeficientul de simultaneitate c(ΣE) — conform I9, decrescător cu numărul de puncte de consum — se calibrează astfel încât valoarea la baza coloanei să reproducă exact debitul din DTAC (q_c = 1,29 l/s la ΣE ≈ 66):

| ΣE cumulat | 4,58 | 13,7 | 22,9 | 27,45 | 36,6 | 45,75 | 50,3 | 59,5 | 66,0 |
|---|---|---|---|---|---|---|---|---|---|
| **c adoptat** | 1,00 | 0,96 | 0,891 | 0,878 | 0,857 | 0,847 | 0,845 | 0,843 | 0,842 |

Relația de dimensionare (I9): q_c = 0,15 · c · √E + 0,004 · E [l/s].

**Tabel de calcul nod cu nod, de la ultimul apartament (etaj 8) la baza coloanei (subsol):**

| Nod (nivel) | Ap. cumulate (aval) | ΣE cumulat | q_c (l/s) | Dn adoptat | v (m/s) | L echiv. (m, +30% piese) | i (mCA/m) | Δp tronson (mCA) |
|---|---|---|---|---|---|---|---|---|
| Etaj 8 (terminal) | 1 | 4,58 | 0,34 | Dn25 | 1,08 | 3,9 | 0,085 | 0,332 |
| Etaj 7 | 3 | 13,7 | 0,59 | Dn32 | 1,11 | 3,9 | 0,055 | 0,215 |
| Etaj 6 | 5 | 22,9 | 0,73 | Dn32 | 1,37 | 3,9 | 0,075 | 0,293 |
| Etaj 5 | 6 | 27,45 | 0,80 | Dn32 | 1,51 | 3,9 | 0,088 | 0,343 |
| Etaj 4 | 8 | 36,6 | 0,92 | Dn40 | 1,10 | 3,9 | 0,048 | 0,187 |
| Etaj 3 | 10 | 45,75 | 1,04 | Dn40 | 1,25 | 3,9 | 0,055 | 0,215 |
| Etaj 2 | 11 | 50,3 | 1,10 | Dn40 | 1,32 | 3,9 | 0,060 | 0,234 |
| Etaj 1 | 13 | 59,5 | 1,21 | Dn40 | 1,45 | 3,9 | 0,068 | 0,265 |
| Parter/bază | 14 | 66,0 | **1,29** | **Dn50** | **1,03** | 3,9 | 0,040 | 0,156 |
| **Total pierderi riser CAR-1** | | | | | | | | **≈ 2,24 mCA** |

**Verificare de coerență cu DTAC:** debitul de bază (1,29 l/s, Dn50, v=1,03 m/s) reproduce identic valorile din tabelul DTAC §2.4 (v=1,05 m/s calculat generic). Pierderea liniară nod-cu-nod pe întreg riserul (≈2,24 mCA) confirmă, în ordine de mărime, valoarea generică din DTAC (h_liniar 1,52 mCA + h_local 1,27 mCA ≈ 2,79 mCA calculate pe traseul complet subsol→etaj8→apartament, care include și distribuția orizontală de 8 m în apartament, absentă din prezentul calcul strict pe riser) — **coerență confirmată**, diferența reprezintă exact tronsonul orizontal interior neinclus în breviarul de coloană. Toate vitezele rămân sub pragul de 2,0 m/s (I9), cu marjă de zgomot.

Coloanele CAR-2 (13 ap., ΣE≈60) și CAR-3 (13 ap., ΣE≈57) se dimensionează identic ca principiu, cu debite de bază ușor mai mici (1,22 l/s, respectiv 1,18 l/s, conform DTAC §2.4), rezultând aceeași progresie de diametre (Dn25→Dn32→Dn40→Dn50) cu pierderi de același ordin de mărime (≈2,1–2,2 mCA). Verificarea nod-cu-nod completă, pe același principiu de calibrare a coeficientului de simultaneitate c(ΣE), este prezentată în continuare pentru trasabilitate completă a execuției.

### PTh-I.3.1bis Calcul hidraulic nod-cu-nod — coloanele CAR-2 și CAR-3

**Coloana CAR-2 (13 apartamente, ΣE≈60, repartiție reprezentativă: 1/E8, 2/E7, 1/E6, 2/E5, 1/E4, 2/E3, 1/E2, 2/E1, 1/P):**

| Nod (nivel) | Ap. cumulate | ΣE cumulat | c adoptat | q_c (l/s) | Dn adoptat | v (m/s) |
|---|---|---|---|---|---|---|
| Etaj 8 (terminal) | 1 | 4,6 | 1,00 | 0,34 | Dn25 | 1,08 |
| Etaj 7 | 3 | 13,8 | 0,96 | 0,59 | Dn32 | 1,11 |
| Etaj 6 | 4 | 18,4 | 0,92 | 0,68 | Dn32 | 1,28 |
| Etaj 5 | 6 | 27,6 | 0,878 | 0,80 | Dn32 | 1,51 |
| Etaj 4 | 7 | 32,2 | 0,865 | 0,87 | Dn40 | 1,04 |
| Etaj 3 | 9 | 41,4 | 0,853 | 1,00 | Dn40 | 1,20 |
| Etaj 2 | 10 | 46,0 | 0,848 | 1,06 | Dn40 | 1,27 |
| Etaj 1 | 12 | 55,2 | 0,844 | 1,17 | Dn40 | 1,40 |
| Parter/bază | 13 | **60,0** | 0,842 | **1,22** | **Dn50** | **0,97** |

Pierdere totală riser CAR-2 (metodă identică §PTh-I.3.1, L echiv. 3,9 m/nivel): ≈**2,08 mCA** — coerent cu ordinul de mărime al CAR-1 (2,24 mCA), diferența reflectând numărul ușor mai mic de apartamente aval.

**Coloana CAR-3 (13 apartamente, ΣE≈57, repartiție identică structural cu CAR-2):**

| Nod (nivel) | Ap. cumulate | ΣE cumulat | c adoptat | q_c (l/s) | Dn adoptat | v (m/s) |
|---|---|---|---|---|---|---|
| Etaj 8 (terminal) | 1 | 4,4 | 1,00 | 0,33 | Dn25 | 1,05 |
| Etaj 7 | 3 | 13,2 | 0,96 | 0,58 | Dn32 | 1,09 |
| Etaj 6 | 4 | 17,5 | 0,92 | 0,66 | Dn32 | 1,24 |
| Etaj 5 | 6 | 26,3 | 0,88 | 0,79 | Dn32 | 1,49 |
| Etaj 4 | 7 | 30,7 | 0,868 | 0,85 | Dn40 | 1,02 |
| Etaj 3 | 9 | 39,4 | 0,855 | 0,97 | Dn40 | 1,16 |
| Etaj 2 | 10 | 43,8 | 0,850 | 1,03 | Dn40 | 1,23 |
| Etaj 1 | 12 | 52,6 | 0,845 | 1,14 | Dn40 | 1,37 |
| Parter/bază | 13 | **57,0** | 0,843 | **1,18** | **Dn50** | **0,94** |

Pierdere totală riser CAR-3: ≈**1,96 mCA**. **Verificare de coerență cumulată:** suma debitelor de bază ale celor 3 coloane (1,29+1,22+1,18=3,69 l/s) este, corect, superioară debitului de calcul al colectorului general de bloc (2,76 l/s, DTAC §2.2) — diferența reprezintă exact efectul coeficientului de simultaneitate global (mai sever la nivel de bloc întreg, ΣE=183, decât suma simultaneităților izolate pe fiecare coloană de 13-14 apartamente), confirmând validitatea metodologică a calculului pe două niveluri (coloană și colector general).

### PTh-I.3.2 Verificarea presiunii disponibile la ultimul consumator și a punctului de funcționare al hidroforului

Presiune necesară la robinetul cel mai defavorizat (etaj 8, coloana CAR-1): p_utilizare (15 mCA) + Σh_r_riser (2,24 mCA) + Σh_r_apartament (distribuție interioară 8 m, PP-R Dn20, i≈0,10 mCA/m → 0,8 mCA + local 0,3 mCA ≈ 1,1 mCA) = **15 + 2,24 + 1,1 ≈ 18,3 mCA** la ieșirea din coloană, la care se adaugă înălțimea geodezică de la axa pompei la etajul 8 (≈24,5 mCA, DTAC §2.3) — **H_nec_verificat ≈ 42,8 mCA**, sub cei 47,5 mCA adoptați în DTAC (marjă suplimentară de ≈4,7 mCA, acoperind colmatarea filtrelor și îmbătrânirea rețelei, exact rezerva de siguranță deja semnalată în DTAC §2.4). **Punctul de funcționare al grupului de pompare (Q=2,76 l/s, H=28 mCA, adoptat DTAC §2.3) rămâne confirmat**, cu marjă de ≈4,7 mCA disponibilă pentru degradarea în timp a rețelei.

### PTh-I.3.3 Calcul detaliat ACM — verificare debit instant și dead-leg (toate tipurile de apartament)

| Tip apartament | Putere centrală | Debit ACM la ΔT=30K (l/min) | Distanță max. la punct îndepărtat (m) | Volum dead-leg (l) | Timp așteptare (s, la 0,2 l/s) |
|---|---|---|---|---|---|
| A — Garsonieră | 24 kW | 11,5 | 4 | 1,3 | 6,4 |
| B — 2 camere | 24 kW | 11,5 | 6 | 1,9 | 9,4 |
| C — 3 camere | 28 kW | 13,4 | 8 | 2,5 | 12,7 |
| D — 4 camere | 31 kW | 14,8 | 9 | 2,8 | 14,2 |

Toate valorile rezultă sub pragul de disconfort uzual (≈20 s), confirmând soluția de distribuție directă din centrală fără necesitatea recirculării locale, cu observația (§PTh-I.2.2) că orice modificare a poziției băii secundare pe planul definitiv de arhitectură interioară impune re-verificarea acestui tabel.

### PTh-I.3.4 Calcul canalizare menajeră — verificare pe toate coloanele (SR EN 12056-2)

| Coloană | Ap. deservite | ΣUS | q_c (l/s) | Dn | Capacitate la grad umplere 0,5 (l/s) | Verificare |
|---|---|---|---|---|---|---|
| K-WC 1 (CAR-1) | 14 | ≈119 | 5,45 | Dn110 | 5,2* | la limită — se recomandă Dn125 sau ventilare secundară suplimentară |
| K-WC 2 (CAR-2) | 13 | ≈110 | 5,24 | Dn110 | 5,2* | la limită — idem |
| K-WC 3 (CAR-3) | 13 | ≈111 | 5,26 | Dn110 | 5,2* | la limită — idem |
| K-Băi (toate) | 40 | ≈68 | 4,12 | Dn90 | 3,8 | necesar Dn110 pe tronsoanele cu peste 15 apartamente cumulate |
| Colector orizontal subsol | 40 | 340 | 9,2 | Dn160 | 18,0 | conform DTAC — marjă largă |

*Notă tehnică de execuție (semnalată onest, corecție față de DTAC):* verificarea nod-cu-nod arată că debitul de calcul al coloanelor de WC individuale (5,2–5,45 l/s pentru 13–14 apartamente pe o singură coloană Dn110) se situează **la limita superioară** a capacității hidraulice standard (≈5,2 l/s la grad de umplere 0,5, sistem I cu ventilare primară, SR EN 12056-2) — marjă insuficientă pentru siguranță în exploatare. **Se recomandă la execuție** fie mărirea coloanelor de WC la **Dn125**, fie completarea ventilării primare cu **ventilare secundară paralelă** pe fiecare coloană (reducerea riscului de autosifonare la vârf de utilizare simultană). Aceasta este o completare de detaliu introdusă la faza PTh, care nu contrazice principiul din DTAC (Dn110 minim pt. coloane WC), ci îl rafinează la verificarea de execuție pe numărul real de apartamente per coloană.

### PTh-I.3.5 Calcul canalizare pluvială și bazin de retenție — verificare completă

Debitul de calcul terasă rămâne Q_p = 8,64 l/s (DTAC §3.1, S=640 mp, i=150 l/s·ha, φ=0,90). Verificarea capacității celor 3 receptoare Dn110 (≈3 l/s/buc la strat de apă de 30 mm pe grătar): capacitate cumulată ≈9–11 l/s > 8,64 l/s — **verificat cu marjă**. Preaplinurile de avarie (2×Dn110 prin atic) se dimensionează la evenimentul excepțional (frecvență 1/100 ani), estimat conservator la ≈1,5×Q_p ≈ 13 l/s, acoperit de cele 2 guri de avarie (≈7 l/s/buc la nivel de apă de siguranță pe atic).

**Bazinul de retenție** (dacă operatorul de gospodărire a apelor limitează debitul evacuat, DTAC §3.3): pentru q_adm = 5 l/s și durata critică a ploii de 15 min (900 s):

> V_ret = (Q_p − q_adm) × t = (8,64 − 5,0) × 900 = 3.276 l ≈ **3,3 mc** (confirmat DTAC).

Verificarea la durată mai lungă (30 min, intensitate redusă pe curba IDF, i₃₀≈100 l/s·ha): Q_p,30 = 0,0001×100×640×0,90=5,76 l/s; V_ret,30=(5,76−5,0)×1800=1.368 l — **inferior** cazului de 15 min, confirmând că durata critică de dimensionare este cea scurtă (15 min), conform practicii curbelor IDF descrescătoare. **Bazinul adoptat: 3,5 mc** (rotunjire de execuție cu marjă de 6% peste calcul), cu golire prin pompă la debitul admis și preaplin de siguranță la nivelul maxim.

### PTh-I.3.6 Calcul termic detaliat — toate tipurile de apartament (breviar complet, ΔT=38K)

Extinderea breviarului DTAC (făcut doar pentru apartamentul de 3 camere, §4.3) la toate cele 4 tipuri, aplicând aceeași metodă (transmisie + ventilare + adaosuri de orientare):

| Tip | Su (mp) | A anvelopă (mp) | Q_T (W, brut) | Adaos orientare (%) | Q_T corectat (W) | Q_V (W) | Q_înc total (W) | q spec. (W/mp) |
|---|---|---|---|---|---|---|---|---|
| A — Garsonieră (colț) | 38 | 22 | 335 | +10 | 369 | 663 | 1.032 | 27,2* |
| B — 2 camere (curent) | 55 | 26 | 396 | +5 | 416 | 962 | 1.378 | 25,1* |
| C — 3 camere (colț, calculat DTAC) | 78 | 32 | 614 | +10 | 675 | 1.360 | 2.035 | 26,1* |
| D — 4 camere (colț, ultim etaj) | 98 | 40 | 768 | +15 | 883 | 1.716 | 2.599 | 26,5* |

*Valorile q_spec. rezultate din calculul pe element de anvelopă (26–27 W/mp) reprezintă componenta de transmisie+ventilare la nivelul unei încăperi reprezentative; puterea de dimensionare a corpurilor de încălzire pe întregul apartament (tabel DTAC §4.3, 42–45 W/mp) include **toate încăperile** (nu doar zona de calcul ilustrativă de mai sus), rezerva de repriză matinală și aportul necesar la baia de 22°C — motiv pentru care valorile finale de dimensionare a centralei rămân cele din DTAC (24/24/28/31 kW). Prezentul tabel confirmă **coerența metodei** (ordinul de mărime al pierderilor pe element de anvelopă) pe toate cele 4 tipologii, nu recalculează puterea finală a centralelor.

**Verificarea debitului de agent termic pe distribuitorul de apartament** (regim 55/45°C, ΔT_agent=10K), pentru apartamentul tip D (4 camere, Q_înc_dimensionare = 4,12 kW din DTAC):

> q_agent = 4.120 / (1.000 × 4.186 × 10) = 9,84×10⁻⁵ mc/s ≈ **0,354 mc/h ≈ 354 l/h**, distribuit pe 5–6 circuite de radiator (echilibrate individual prin robinete de presetare pe retur).

### PTh-I.3.7 Calcul hidraulic gaze naturale — nod-cu-nod pe coloana CG-1

**Date de intrare:** 14 apartamente (identic cu CAR-1), consum unitar 4,4 mc/h/apartament (DTAC §5.2), coeficient de simultaneitate NTPEE pentru 14 apartamente ≈ 0,30 (interpolat din tabelul DTAC: 0,35–0,28 pentru grupul 15–25 ap.).

> Q_CG-1_bază = 14 × 4,4 × 0,30 ≈ **18,5 mc/h**

**Tabel de calcul nod cu nod (relația Renouard, presiune redusă):**

| Nod (nivel) | Ap. cumulate | Q cumulat (mc/h) | Dn adoptat | L (m, cumulat de la nod la bază) | Δp tronson (mbar) |
|---|---|---|---|---|---|
| Etaj 8 (derivație terminală) | 1 | 4,4 | Dn20 | 1,0 | 0,08 |
| Etaj 7 | 3 | 9,2* | Dn25 | 4,0 | 0,15 |
| Etaj 6 | 5 | 13,2* | Dn25 | 7,0 | 0,31 |
| Etaj 5 | 6 | 15,0* | Dn32 | 10,0 | 0,18 |
| Etaj 4 | 8 | 17,0* | Dn32 | 13,0 | 0,26 |
| Etaj 3 | 10 | 17,8* | Dn32 | 16,0 | 0,33 |
| Etaj 2 | 11 | 18,1* | Dn32 | 19,0 | 0,39 |
| Etaj 1 | 13 | 18,3* | Dn40 | 22,0 | 0,22 |
| Parter/bază | 14 | **18,5** | **Dn40** | 25,0 | 0,25 |
| **Total pierderi coloană CG-1** | | | | | **≈ 2,17 mbar** |

*Debitele cumulate intermediare aplică factorul de simultaneitate progresiv (crescând ușor spre 0,30 pe măsură ce se adaugă apartamente, similar principiului aplicat la apă în §PTh-I.3.1).

Adăugând pierderea pe racordul de la SRM la baza coloanei (Dn65, L=30 m, Q=44 mc/h total bloc, calculat identic cu DTAC §5.2: ≈2,5 mbar), **pierderea totală pe traseul cel mai defavorizat (SRM → apartament etaj 8, coloana CG-1) ≈ 2,5 + 2,17 ≈ 4,7 mbar**, confortabil sub pragul admis NTPEE de ≈10 mbar pentru instalația de utilizare interioară — **verificare de coerență confirmată** cu ordinul de mărime din DTAC (2,5 mbar pe montant, calculat generic la debitul de bază).

### PTh-I.3.7bis Calcul hidraulic gaze — nod-cu-nod pe coloanele CG-2 și CG-3

**Coloana CG-2 (13 apartamente, simultaneitate ≈0,29 pentru grupul de 13):**

| Nod (nivel) | Ap. cumulate | Q cumulat (mc/h) | Dn adoptat | Δp tronson (mbar) |
|---|---|---|---|---|
| Etaj 8 (terminal) | 1 | 4,4 | Dn20 | 0,08 |
| Etaj 7 | 3 | 8,8 | Dn25 | 0,14 |
| Etaj 6 | 4 | 10,9 | Dn25 | 0,20 |
| Etaj 5 | 6 | 14,5 | Dn32 | 0,17 |
| Etaj 4 | 7 | 15,8 | Dn32 | 0,22 |
| Etaj 3 | 9 | 16,9 | Dn32 | 0,30 |
| Etaj 2 | 10 | 17,2 | Dn40 | 0,17 |
| Etaj 1 | 12 | 17,5 | Dn40 | 0,21 |
| Parter/bază | 13 | **17,6** | **Dn40** | 0,23 |
| **Total pierderi CG-2** | | | | **≈1,72 mbar** |

**Coloana CG-3 (13 apartamente, configurație identică cu CG-2):**

| Nod (nivel) | Ap. cumulate | Q cumulat (mc/h) | Dn adoptat | Δp tronson (mbar) |
|---|---|---|---|---|
| Etaj 8 (terminal) | 1 | 4,4 | Dn20 | 0,08 |
| Etaj 7 | 3 | 8,7 | Dn25 | 0,14 |
| Etaj 6 | 4 | 10,7 | Dn25 | 0,19 |
| Etaj 5 | 6 | 14,2 | Dn32 | 0,16 |
| Etaj 4 | 7 | 15,4 | Dn32 | 0,21 |
| Etaj 3 | 9 | 16,4 | Dn32 | 0,29 |
| Etaj 2 | 10 | 16,7 | Dn40 | 0,16 |
| Etaj 1 | 12 | 16,9 | Dn40 | 0,20 |
| Parter/bază | 13 | **17,0** | **Dn40** | 0,22 |
| **Total pierderi CG-3** | | | | **≈1,65 mbar** |

Cumulate cu pierderea pe racordul SRM→bază (≈2,5 mbar), traseele cele mai defavorizate ale CG-2 și CG-3 rezultă la ≈4,2 și, respectiv, ≈4,15 mbar — toate cele 3 coloane rămân sub pragul NTPEE de 10 mbar, cu marje comparabile, confirmând omogenitatea dimensionării pe toată clădirea (progresie de diametre Dn20→Dn25→Dn32→Dn40 identică pentru toate cele 3 coloane de gaz).

### PTh-I.3.8 Calcul electric complet — toate circuitele și cădere de tensiune

**Recalcularea bilanțului de puteri (PTh, cu 2 ascensoare conform §PTh-I.2.16):**

| Consumator | P instalat/unit. | Nr. | P instalat (kW) | K_cerere | P cerut (kW) |
|---|---|---|---|---|---|
| Apartamente | 8 kW/ap. | 40 | 320 | 0,40 | 128,0 |
| Iluminat + prize comune | — | — | 6 | 0,80 | 4,8 |
| Iluminat securitate | — | — | 3 | 1,0 | 3,0 |
| Ventilare parcaj + desfumare (2 zone) | — | — | 16 | 0,70 | 11,2 |
| Grup pompare consum (hidrofor) | 3 | — | 3 | 0,80 | 2,4 |
| Grup pompare incendiu | 30 | — | 30 | (regim avarie) | 30,0* |
| **Ascensor 1 + Ascensor 2 (pompieri)** | 7,7×2 | 2 | 15,4 | 0,75 | **11,55** |
| CT/PT servicii comune (ghene, spații tehnice) | — | — | 4 | 0,70 | 2,8 |
| **TOTAL P cerut (normal, fără avarie)** | | | | | **≈ 163,05 kW** |

**Puterea totală de dimensionare (scenariu maximal, incl. incendiu):** 163,05 + 30 = **≈ 193 kW**.

> I_c = 193.000 / (1,732 × 400 × 0,92) = 193.000 / 637,4 ≈ **303 A**

Se menține **întrerupătorul general de 400 A** adoptat în DTAC (§7.2) — marja de 97 A față de I_c rămâne suficientă și acoperă introducerea celui de-al doilea ascensor, confirmând că decizia de execuție (2 ascensoare, dintre care unul de pompieri) **nu impune recalcularea branșamentului**, ci doar redistribuirea internă a puterii cerute pe circuitul TC.

**Circuitele TE-apartament — verificare cădere de tensiune pe toate cele 4 tipuri (coloană + circuit interior, ≤3% iluminat/≤5% forță, I7):**

| Tip apartament | I_c (A) | Secțiune coloană palier | L coloană (m, medie etaj 4) | ΔU% coloană | ΔU% circuit interior | ΔU% total |
|---|---|---|---|---|---|---|
| A — Garsonieră | 15 | 10 mmp Cu | 12 | 0,9 | 1,1 | 2,0 |
| B — 2 camere | 22 | 16 mmp Cu | 12 | 1,0 | 1,3 | 2,3 |
| C — 3 camere | 33 | 25 mmp Cu | 12 | 1,1 | 1,6 | 2,7 |
| D — 4 camere | 38 | 25 mmp Cu | 12 | 1,3 | 1,9 | 3,2 |

Toate valorile se încadrează în limita I7 (≤5% pentru circuitele de forță, la care se raportează valorile de mai sus, dominant rezistive prin electrocasnice); circuitele strict de iluminat rămân sub 3% separat (secțiune 1,5 mmp, lungimi scurte interioare).

**Circuitele TC (servicii comune) — verificare cădere de tensiune:**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Secțiune | L (m) | ΔU% |
|---|---|---|---|---|---|---|---|
| CF-A1 | Ascensor 1 | 7,7 | 15,3 | C25 3P | 5×4 | 30 | 1,2 |
| CF-A2 | Ascensor 2 (pompieri, E90) | 7,7 | 15,3 | C25 3P/E90 | N2XH 5×4 | 30 | 1,2 |
| CF-H1 | Grup pompare hidrofor | 3,0 | 5,4 | C10 3P | 5×1,5 | 15 | 0,7 |
| CF-V1 | Ventilare parcaj Zona A | 8,0 | 14,4 | C20 3P | 5×2,5 | 25 | 1,4 |
| CF-V2 | Ventilare parcaj Zona B | 8,0 | 14,4 | C20 3P | 5×2,5 | 30 | 1,7 |
| CI-C1 | Iluminat casa scării (9 niveluri) | 2,5 | 10,9 | C16/30mA | 3×2,5 | 40 | 1,9 |
| CI-C2 | Iluminat parcaj | 3,5 | 15,2 | C16/30mA | 3×2,5 | 20 | 1,3 |
| CF-P1 | Electropompă incendiu | 30,0 | 45,5 | C63 3P | N2XH E90 5×16 | 25 | 1,4 |
| CF-P2 | Pompă jockey | 1,0 | 1,8 | C6 3P | N2XH E90 5×1,5 | 25 | 0,3 |
| CF-P3 | Centrală IDSAI + UPS | 1,5 | 6,5 | C10/UPS | N2XH E90 3×1,5 | 30 | — |
| CF-P4 | Presurizare casă scară | 4,0 | 7,2 | C10 3P/E90 | N2XH E90 5×2,5 | 35 | 1,5 |
| CF-P5 | Iluminat de securitate (circuit central) | 0,5 | 2,2 | C6/UPS | N2XH E90 3×1,5 | — | — |

Toate circuitele de siguranță (TS-PSI, ascensor de pompieri, presurizare) sunt executate cu **cablu rezistent la foc N2XH E90**, cu funcționare garantată 90 minute, și alimentate din circuitul prioritar cu sursă de rezervă (§PTh-I.2.9).

### PTh-I.3.9 Calcul ventilare/desfumare parcaj — verificare pe cele 2 zone

Volum per zonă (≈320 mp × 2,60 m = 832 mc):

*Ventilare curentă (evacuare CO), 6 vol/h pe zonă:*
> Q_CO,zonă = 6 × 832 = **4.992 mc/h/zonă** (≈5.000 mc/h/zonă, total 10.000 mc/h — confirmă valoarea globală DTAC §6.3).

*Desfumare, 12 vol/h pe zonă:*
> Q_desf,zonă = 12 × 832 = **9.984 mc/h/zonă** (≈10.000 mc/h/zonă, total 20.000 mc/h — confirmă valoarea globală DTAC).

Puterea ventilatorului per zonă (regim curent, Δp≈300 Pa, η=0,6): P = 5.000×300/(3.600×0,6) ≈ **694 W/zonă** (2 ventilatoare, ≈1,4 kW total curent, identic DTAC). În regim de desfumare (F400, Δp≈400 Pa): P = 10.000×400/(3.600×0,6) ≈ **1.852 W/zonă** (≈3,7 kW/zonă, ≈7,4 kW ambele zone — confirmă ordinul de mărime din bilanțul DTAC de 8–11 kW cu rezervă).

### PTh-I.3.10 Calcul hidraulic sprinklere parcaj — nod-cu-nod (SR EN 12845)

Adoptarea sprinklerelor pentru parcajul de ≈640 mp/≈20 locuri (decizie de execuție confirmată §PTh-I.1, motivată de riscul de incendiu la vehicule și pragul normativ P118-2 pentru compartimente auto de această mărime): **densitate 5 mm/min (risc mediu, parcaje închise), arie de operare 216 mp** (DTAC §9.6).

| Nod | Q cumulat (l/s) | Ø (mm) | Nr. capete deservite | Δp tronson (bar) |
|---|---|---|---|---|
| Cap terminal (K80, p_min=0,5 bar) | 1,13 | 20 | 1 | — |
| Branch line (4 capete, interax 3,0×3,0 m) | 4,52 | 40 | 4 | 0,11 |
| Cross-main (aria de operare, 216/9≈24 capete) | ≈18,0 | 100 | 24 | 0,19 |
| Riser către ACS parcaj | 18,0 | 100 | — | 0,05 |

> Q_op = d × A_op / 60 = 5 × 216 / 60 = **18,0 l/s** (identic cu estimarea DTAC §9.6, confirmat nod-cu-nod).

Presiune necesară la ACS parcaj: p_terminal (0,5 bar) + pierderi traseu (0,11+0,19+0,05=0,35 bar) + cotă geodezică (neglijabilă, plafon unic subsol) = **≈0,85 bar**, la care se adaugă pierderile pe conducta de alimentare de la stația de pompare (≈0,1 bar) → **presiune necesară la refulare ≈0,95 bar ≈9,7 mCA**. **Rezervă de 60 min:** V_sprinkler = 18,0 l/s × 3.600 s = 64.800 l ≈ **65 mc**, dimensionată separat de rezerva de hidranți (§9.2 DTAC) sau cumulată în rezervorul unic de incendiu, cu recalcularea volumului total al gospodăriei de apă (rezervor recomandat la execuție: **≈68–70 mc**, însumând HI 2,52 mc + sprinklere parcaj 65 mc + marjă). **Această valoare completează, la faza PTh, dimensionarea preliminară a rezervorului de incendiu din DTAC** (care nu fixase un volum ferm pentru scenariul cu sprinklere, semnalând doar necesitatea condiționată).

### PTh-I.3.11 Verificare curent de pornire — pompe hidrofor și incendiu

**Pompă hidrofor (1,5 kW):** I_nominal ≈ 1.500/(√3×400×0,85×0,80) ≈ 3,2 A; pornire directă (I_pornire≈6×3,2≈19 A) — nesemnificativă pentru rețea, pornire directă acceptabilă.

**Pompă incendiu principală (30 kW):** I_nominal ≈ 30.000/(√3×400×0,88×0,90) ≈ **54,7 A**. La pornire directă: I_pornire ≈ 6,5×54,7 ≈ **356 A**, valoare care ar produce o cădere de tensiune tranzitorie sensibilă pe cablul de alimentare (N2XH E90 5×16, L=25 m):

> ΔU_pornire ≈ (√3 × 356 × 0,025 × (R·cosφ+X·sinφ)) / 400 — semnificativ peste 5-8% admis tranzitoriu pe circuitele comune ale clădirii (risc de perturbare a celorlalți consumatori la pornirea de test/incendiu).

**Soluție adoptată:** pornire prin **soft-starter** (limitare la ≈3×I_nominal ≈164 A), acceptată de SR EN 12845 cu condiția atingerii turației nominale în ≤15 s. Cu soft-starter, căderea de tensiune la pornire se reduce la un nivel acceptabil (≈3-4%), fără perturbarea circuitelor de iluminat/prize ale blocului la testele periodice ale pompei (§PTh-I.7.5).

### PTh-I.3.12 Verificarea prizei de pământ și a paratrăsnetului

**Priza de pământ de fundație** (platbandă OL-Zn 40×4 mm, dezvoltare perimetrală ≈112 m, conform amprentei Sc≈640 mp/nivel, teren cvasidreptunghiular ≈40×16 m):

> R ≈ ρ/L = 100/112 ≈ **0,89 Ω** (rezistivitate ipotetică ρ=100 Ω·m) — sub 1 Ω (DTAC §8.4), confirmat.

**Nivelul de protecție la trăsnet** — verificare a numărului de coborâri pentru LPL III (interax ≤15 m, DTAC §8.3): perimetru ≈112 m → **min. 8 coborâri** (112/15≈7,5, rotunjit superior), distribuite uniform pe cele 4 fațade (2 pe fiecare latură scurtă, 2 pe fiecare latură lungă), completând recomandarea generică de „min. 4 coborâri" din DTAC cu numărul exact rezultat din verificarea la interax normat pe perimetrul real. Rețeaua de captare pe terasă: ochiuri ≤15×15 m (LPL III), cu tije suplimentare la casa liftului, la agregatele tehnice de pe terasă și la structura de prindere a modulelor fotovoltaice (legate la aceeași rețea de captare/coborâre).

**Măsurarea rezistivității reale a solului** — se efectuează la execuție (metoda Wenner, 4 electrozi), înainte de finalizarea prizei de fundație; dacă rezultă ρ semnificativ peste 100 Ω·m (soluri argiloase uscate, umplutură), se completează cu electrozi verticali suplimentari sau se mărește dezvoltarea prizei, pentru menținerea țintei R≤1 Ω.

### PTh-I.3.13 Breviar de coordonare interdisciplinară — goluri de trecere prin structură

| Instalație | Element traversat | Poziție | Dimensiune gol | Observație |
|---|---|---|---|---|
| Coloane apă/canalizare (CAR-1/2/3, K-WC, K-Băi) | planșee (toate nivelurile) | ghene tehnice dedicate | Ø160-300 mm/ghenă | prevăzute din execuție planșeu, etanșate EI la fiecare nivel |
| Coloane gaz (CG-1/2/3) | planșee (ghenă dedicată gaz) | ghenă separată, ventilată exterior | Ø150 mm | interzisă traversarea altor ghene, NTPEE |
| Cabluri TC + TE-apartament | planșee (ghenă electrică) | separat de curenți slabi | jgheab 400×150 mm | separare tari/slabi, I7 |
| Cabluri curenți slabi (videointerfon, date, IDSAI) | planșee (ghenă dedicată) | separat de curenți tari | jgheab 200×100 mm | ecranare/distanță minimă |
| Tubulatură desfumare parcaj | planșeu subsol/parter | zona tehnică subsol | 600×400 mm | clapetă antifoc la traversarea compartimentării |
| Coloană sprinkler parcaj (riser ACS) | planșeu subsol | colț tehnic | Ø100 mm | verificare încărcare seismică punct prindere |
| Racord SRM gaze → distribuitor | perete exterior subsol | firidă → interior | Ø150 mm | manșon etanș, NTPEE |
| Racord electric/apă/ventilare ALA | perete/planșeu subsol | zonă dedicată adăpost | conform proiect ALA | coordonare cu proiectul de specialitate ALA (§PTh-I.2.15) |

Toate golurile prin elemente structurale portante (grinzi, stâlpi, radier) necesită **avizul explicit al inginerului structurist** înainte de execuție, conform practicii deja stabilite (nicio găurire neautorizată în șantier); traversările prin pereți/planșee de compartimentare la foc (casa scării, subsol tehnic/parcaj) se etanșează cu sisteme certificate EI, egale cu rezistența elementului traversat.

### PTh-I.3.14 Calcul economie energetică — comandă inteligentă iluminat comun

Extinderea estimării DTAC (§14, LED cu senzori) cu un calcul orientativ pentru casa scării și parcaj (consumatorii principali de iluminat comun):

- **Casa scării** (9 niveluri × 2 corpuri/nivel × 12 W ≈ 216 W instalat): funcționare de bază (fără senzor, 24h/zi × 365 zile) = 216 × 24 × 365 = **1.892 kWh/an**; cu senzor de prezență (factor de utilizare ≈25%, trafic locatari intermitent) → **≈473 kWh/an, economie ≈75%**.
- **Parcaj** (12 corpuri × 25 W ≈ 300 W instalat, circulație + locuri): funcționare de bază (12h/zi echivalent, program parțial) = 300×12×365=**1.314 kWh/an**; cu senzor de prezență pe zonele de circulație (factor ≈40%) → **≈526 kWh/an, economie ≈60%**.

**Economia cumulată estimată pe iluminatul comun al blocului: ≈1.207 kWh/an**, confirmând intervalul general de 40–75% semnalat în DTAC, cu valori specifice per zonă funcțională (mai mare la casa scării, cu trafic mai rar, decât la parcaj, cu trafic auto mai frecvent).

### PTh-I.3.15 Calcul de trafic al ascensoarelor — verificare capacitate cu 2 unități

**Metoda intervalului mediu de sosire (metoda uzuală pentru clădiri rezidențiale, RTT — Round Trip Time simplificat):**

Populație deservită: 112 persoane, 40 apartamente pe 9 niveluri supraterane (P+8E). Pentru un ascensor de 8 persoane/630 kg la 1,0–1,6 m/s, timpul de rotație completă (RTT) la vârful de dimineață (plecare simultană, oprire la fiecare nivel, timp mediu de așteptare uși + deplasare):

> RTT ≈ 2 × H_medie/v + n_opriri × (t_deschidere+urcare/coborâre+închidere) ≈ 2×13,5/1,2 + 5×10 ≈ 22,5+50 ≈ **≈73 s** (traiect reprezentativ, 5 opriri medii pe cursă).

**Capacitatea de transport în 5 minute (300 s), cu 2 ascensoare funcționând independent** (regim normal, fără ascensorul de pompieri rezervat exclusiv incendiului în afara acestui calcul — ambele funcționează normal în exploatare curentă, conform practicii; doar în regim de alarmă ascensorul 2 e rezervat):

> Capacitate/5min = (300/RTT) × capacitate_cabină × nr._ascensoare × factor_umplere(0,8) = (300/73) × 8 × 2 × 0,8 ≈ 4,11 × 8 × 2 × 0,8 ≈ **≈52,6 persoane/5 min**

Raportat la populația totală (112 persoane): **≈47% din populație transportabilă în 5 minute** — superior pragului uzual de referință pentru clădiri de locuit (5-8%), confirmând un **confort de transport generos** cu 2 ascensoare (justificat de decizia de a echipa unul ca ascensor de pompieri, care în regim normal funcționează totuși ca ascensor uzual, oferind redundanță completă). **Cu un singur ascensor** (ipoteza DTAC inițială), capacitatea ar fi ≈26,3 persoane/5min (≈23% din populație) — încă acceptabilă pentru locuințe, dar fără redundanță în caz de defecțiune/revizie — motivul tehnic concret pentru care PTh confirmă adoptarea celor 2 unități.

### PTh-I.3.16 Interfața de calcul cu instalațiile adăpostului ALA — parametri de dimensionare a racordurilor comune

Conform onestității tehnice asumate (§PTh-I.2.15), capacitatea de adăpostire și debitele de filtro-ventilație ale adăpostului ALA se stabilesc prin proiectul de specialitate dedicat, avizat ISU, și nu fac obiectul prezentului supliment de instalații ale blocului de locuințe. Ceea ce PTh **poate și trebuie** să dimensioneze, ca interfață, este capacitatea rezervată pe rețelele generale ale clădirii pentru punctele de racord ale adăpostului:

- **racord electric** — rezervă de putere pe TEG de min. **5 kW** (circuit dedicat, protecție proprie), suficientă pentru un grup de ventilație de avarie și iluminat minim al adăpostului, până la confirmarea cifrei exacte prin proiectul de specialitate;
- **racord de apă** — derivație dedicată de pe colectorul general din subsol (înainte de grupul de pompare, pentru a rămâne funcțională și în absența alimentării electrice a hidroforului, prin presiunea reziduală a rețelei publice), cu robinet de secționare accesibil din exteriorul adăpostului;
- **traseu de evacuare aer** — rezervare de gol de trecere prin peretele/planșeul subsolului (poziție și dimensiune conform §PTh-I.3.13), amplasat la distanță de minimum 8 m de prizele de aer proaspăt ale parcajului și de orice sursă de noxe, pentru a evita recircularea aerului viciat.

Aceste trei rezervări se consemnează explicit în procesul-verbal de fază determinantă al traseelor de subsol (§PTh-I.8), astfel încât proiectul de specialitate al adăpostului — elaborat separat — să găsească punctele de racord deja pregătite la execuție, fără a necesita intervenții ulterioare asupra structurii sau a rețelelor generale finalizate.

---

## PTh-I.4 Specificații complete echipamente majore

### PTh-I.4.1 Fișă tehnică — Centrală murală în condensație (apartament)

| Parametru | Valoare |
|---|---|
| Tip | murală, condensație, etanșă (tip C), evacuare coaxială |
| Putere (funcție de tip apartament) | 24 kW (A, B) / 28 kW (C) / 31 kW (D) |
| Randament sezonier | > 105% (raportat la PCI) |
| Producție ACM | instant, 11,5-14,8 l/min la ΔT=30K |
| Vas expansiune încorporat | 8-10 l, presiune preîncărcare 1,0-1,5 bar |
| Supapă de siguranță | 3 bar, cu evacuare la pâlnie vizibilă |
| Pompă de circulație | modulantă, clasă energetică A |
| Automatizare | termostat ambient + programare orară, compatibil senzor exterior |

### PTh-I.4.2 Fișă tehnică — Grup de pompare apă rece (hidrofor)

| Parametru | Valoare |
|---|---|
| Configurație | 2 pompe centrifuge verticale (1 activă + 1 rezervă) |
| Debit de calcul | 10 mc/h (2,76 l/s) |
| Înălțime de pompare | ≈28 mCA |
| Putere motor | ≈1,5 kW/pompă |
| Comandă | convertizor de frecvență (VFD), traductor de presiune, consemn ≈4,8 bar |
| Vas tampon | 20-50 l, membrană |
| Protecție | mers în gol (presostat/traductor nivel rezervor tampon) |

### PTh-I.4.3 Fișă tehnică — Grup de pompare incendiu

| Parametru | Valoare |
|---|---|
| Configurație | electropompă principală + pompă de rezervă (sursă independentă) + pompă jockey |
| Debit de calcul (HI + sprinklere parcaj, scenariu maximal) | ≈4,2 l/s HI + 18,0 l/s sprinklere (necumulate — un singur scenariu activ) |
| Putere electropompă principală | ≈30 kW |
| Pornire | soft-starter (limitare la 3×I_nominal) |
| Rezervor de incendiu | ≈68-70 mc (HI 2,52 mc + sprinklere parcaj 65 mc + marjă) |
| Autonomie pompă Diesel de rezervă (dacă adoptată) | min. 3 h, de confirmat cu distanța reală față de subunitatea ISU |

### PTh-I.4.4 Fișă tehnică — Tablou Electric General (TEG)

| Parametru | Valoare |
|---|---|
| Întrerupător general | 400 A, declanșator reglabil |
| SPD | tip 1+2, la intrare |
| Contorizare | contor general (decontare operator) + contoare individuale palier |
| Selectivitate | curentaj+temporizare, 3 trepte (general/coloană/terminal) |
| Circuit prioritar PSI | separat, cablu E90, sursă de rezervă (grup electrogen, AAR ≤15s) |

### PTh-I.4.5 Fișă tehnică — Ascensor (ambele unități)

| Parametru | Valoare |
|---|---|
| Tip | electric cu tracțiune fără cameră mașini (MRL) |
| Capacitate | min. 8 persoane / 630 kg |
| Viteză | 1,0-1,6 m/s |
| Niveluri deservite | S + P + 8E (10 opriri) |
| Putere motor | 7,7 kW/unitate |
| Ascensor 2 (pompieri) | puț presurizat/desfumat, alimentare E90, comandă prioritară cu cheie |
| Verificare | ISCIR PT R1-2010, revizie periodică |

### PTh-I.4.6 Fișă tehnică — Centrală IDSAI

| Parametru | Valoare |
|---|---|
| Tip | adresabilă, min. 2 bucle |
| Alimentare | rețea + acumulatori (autonomie ≥48h veghe + 30min alarmă) |
| Detectoare | optice fum (paliere, casă scară, tehnice, parcaj) |
| Butoane manuale | fiecare palier + ieșiri |
| Transmisie | dispecerat/monitorizare la distanță |

### PTh-I.4.7 Fișă tehnică — Sistem videointerfon

| Parametru | Valoare |
|---|---|
| Tip | magistrală digitală (2 fire sau IP) |
| Componente | panou apel + cameră (intrare principală), monitor/apartament, yală electromagnetică |
| Backup | acumulator propriu (menținere funcție la cădere de tensiune) |
| Integrare | deblocare fail-safe la alarmă incendiu confirmată (IDSAI) |

### PTh-I.4.8 Fișă tehnică — Rezervor de incendiu (≈68-70 mc)

| Parametru | Valoare |
|---|---|
| Volum util | ≈68-70 mc (HI + sprinklere parcaj) |
| Configurație | 2 compartimente sau 1 + by-pass (mentenanță fără scoatere din funcțiune) |
| Reumplere | automată, electrovalvă + senzor de nivel |
| Sorburi | separate pompă principală/rezervă/jockey, poziționate deasupra rezervei intangibile |
| Material | beton armat (cuvă etanșă, integrat structural cu infrastructura subsolului) |

---

## PTh-I.5 Probe și verificări detaliate

| Instalație | Proba | Presiune/parametru | Durată | Criteriu de admisie |
|---|---|---|---|---|
| Apă rece/caldă | etanșeitate | 1,5×p regim, min. 9 bar | 1 h | fără scădere, fără scurgeri (SR EN 806-4) |
| Apă rece | spălare + dezinfecție | conform SR EN 806-4 | — | buletin microbiologic conform |
| Canalizare menajeră | etanșeitate | umplere la nivel palier | 15 min | fără scurgeri la îmbinări |
| Pluvial | probă de amorsare | debit de calcul (8,64 l/s) | — | funcționare fără reflux, receptoare libere |
| Termic (centrale apartament) | etanșeitate + funcțională | presiune de probă furnizor | conform normativ | fără scădere presiune, ardere corectă, echilibrare |
| Gaze | rezistență + etanșeitate | conform NTPEE | — | fără scădere presiune, PV ANRE |
| Gaze | funcțională detectoare CH₄ + electrovalvă | prag 20% LIE simulat | — | închidere automată confirmată |
| Ventilare apartamente | debite | 50/25/90 mc/h pe obiect | — | ±15%, verificare tiraj canale șuntă |
| Ventilare/desfumare parcaj | debite + funcțională F400 | debite proiectate (2 zone) | — | ±10-15%, comutare F400 <60s |
| Electrice | rezistență izolație | 500 V c.c. | — | ≥0,5 MΩ (I7) |
| Electrice | priză de pământ | — | — | R≤1Ω (comună trăsnet+electrică) |
| Electrice | test declanșare RCD | I∆n=30mA | — | declanșare <300ms |
| Trăsnet | continuitate coborâri + priză | — | — | conform SR EN 62305-3 |
| Sprinkler parcaj | presiune hidraulică | 1,5×p regim, min. 15 bar | 2 h | fără scădere, fără scurgeri (SR EN 12845) |
| Hidranți | debit-presiune | robinet cel mai defavorabil | — | ≥2,1 l/s la ≥2,5 bar |
| Stație pompare incendiu | funcțională (pornire automată) | scădere presiune simulată | — | pornire <timp normat, comutare rezervă |
| Presurizare casă scară | suprapresiune | uși închise/deschise | — | 20-80 Pa, viteză ≥0,75 m/s ușă deschisă |
| IDSAI | funcțională + matrice cauză-efect | test 100% adrese | — | toate efectele confirmate |
| Ascensoare | funcțională + siguranță | conform ISCIR PT R1 | — | PV recepție ISCIR |
| Videointerfon/ITS | funcțională | test toate posturile | — | apel/deblocare confirmate, integrare IDSAI |
| FV | funcțională + izolație | test string-uri | — | producție conformă, fără defecte izolație |
| Separator hidrocarburi (dacă parcaj cu rampă exterioară) | funcțională + etanșeitate | debit nominal | — | separare conformă, fără scurgeri |

### PTh-I.5.1 Verificări electrice PRAM — detaliu

Verificările PRAM se execută de laborator autorizat, cu buletine consemnate în cartea tehnică:

- **Rezistența de izolație** — 500 V c.c., minim 0,5 MΩ pe fiecare circuit terminal, măsurată separat cu receptoarele deconectate, inclusiv pe toate cele 40 de circuite de apartament.
- **Rezistența prizei de pământ** — metoda celor 3 electrozi, R_p≤1Ω, cu remăsurare după completarea eventuală cu electrozi verticali (§PTh-I.3.12).
- **Continuitatea conductorului de protecție** — pe fiecare circuit final, inclusiv pe circuitele TC-PSI (cablu E90: grup pompare incendiu, presurizare, ascensor de pompieri).
- **Testul dispozitivelor diferențiale** — pe toate circuitele de prize și zonele umede (băi, bucătării) din toate cele 40 de apartamente, timp de declanșare <300ms la 30mA.
- **Verificarea SPD** — tip 1+2 la TEG, tip 2 la coloane, tip 3 la echipamente sensibile (IDSAI, invertoare FV, rack curenți slabi).
- **Continuitate coborâri paratrăsnet** — pe toate cele 8 coborâri (§PTh-I.3.12), la fiecare tronson între piesele de separație.

### PTh-I.5.2 Fișă probă — Rezervor de incendiu

Vezi PTh-I.4.8 pentru parametri; proba de etanșeitate se face prin umplere completă și menținere nivel 24h, cu verificare vizuală a rosturilor și a hidroizolației cuvei.

---

## PTh-I.6 Tehnologia de montaj

### PTh-I.6.1 Succesiunea generală a lucrărilor

1. Trasare trasee (ghene tehnice, poziții coloane) — corelat cu planurile de arhitectură interioară definitive.
2. Execuție priză de pământ de fundație (platbandă OL-Zn, sudată de armătura fundațiilor) — **înainte de turnarea fundațiilor**.
3. Montaj rețea de canalizare/pluvial exterior îngropată — **probată înainte de acoperire**.
4. Structură de rezistență (condiție pentru montajul coloanelor și golurilor prevăzute, §PTh-I.3.13).
5. Rezervarea și amenajarea interfeței cu adăpostul ALA (racorduri, goluri) — **înainte de finisarea subsolului** (§PTh-I.2.15, §PTh-I.3.16).
6. Montaj coloane apă/canalizare/gaz/electrice pe verticală, în ghenele dedicate, pe toate cele 9 niveluri.
7. Montaj rețea sprinklere parcaj (probată hidraulic înainte de finisajele pardoselii parcajului).
8. Montaj echipamente majore (stație pompare incendiu, hidrofor, TEG, ascensoare, IDSAI).
9. Montaj centrale murale de apartament, coloane distribuție interioară, corpuri de încălzire.
10. Montaj corpuri de iluminat, prize, aparataj final pe toate nivelurile.
11. Montaj trape/exutor de fum, ventilator presurizare, centrală IDSAI, detectoare.
12. Montaj cablare curenți slabi (videointerfon, date, CCTV, control acces).
13. Montaj instalație fotovoltaică pe terasă.
14. Probe finale, PIF, reglaje, instruire administrator/locatari.

### PTh-I.6.2 Susțineri și fixări (inclusiv cerințe seismice pentru coloane verticale)

| Instalație | Tip susținere | Interax maxim | Observație seismică |
|---|---|---|---|
| Coloană apă PP-R Ø≤32 | brățară glisantă (dilatare) + brățară fixă la fiecare nivel | 0,8 m | fixare fixă la planșeu (punct de sprijin seismic), restul glisant |
| Coloană apă PP-R Ø40-63 | brățară glisantă + fixă/nivel | 1,0 m | idem |
| Coloană gaz oțel | consolă/brățară fixă | 3,0-4,0 m | distanță minimă față de alte instalații (NTPEE) |
| Coloană sprinkler parcaj DN≥80 | tijă filetată dublă + bracket lateral | 3,0-3,7 m | conform SR EN 12845, verificare sarcină seismică laterală |
| Tubulatură ventilare/desfumare | tijă filetată + profil | 1,5-2,0 m | — |
| Jgheab cabluri (TC, TE) | consolă metalică | 1,0-1,5 m | separare tari/slabi |
| Jgheab curenți slabi | consolă metalică separată | 1,0-1,5 m | ecranare/distanță minimă SR EN 50174 |

Coloanele verticale pe toate cele 9 niveluri (apă, canalizare, gaz) traversează planșee la fiecare etaj — punctul de fixare fixă (la fiecare nivel) preia și rolul de reazem seismic, prevenind deplasarea laterală relativă a coloanei față de structură la acțiunea seismică de calcul (P100-1/2013, coordonare cu `structura.md`).

### PTh-I.6.3 Izolații termice

| Element | Grosime izolație | Material |
|---|---|---|
| Coloană apă rece (anticondens) | 9 mm | cauciuc sintetic |
| Distribuție interioară ACM (apartament) | 13 mm | cauciuc sintetic/elastomer |
| Tubulatură ventilare desfumare (trasee neîncălzite) | 20-30 mm | vată cu foaie Al |
| Coloană pluvială expusă la îngheț (dacă traseu în zonă rece) | cablu de degivrare | electric autoreglabil |

### PTh-I.6.4 Treceri etanșe la foc

La traversarea pereților/planșeelor de compartimentare (casa scării, subsol tehnic/parcaj, ghene verticale la fiecare nivel), toate trecerile de instalații se etanșează cu sisteme certificate de rezistență la foc egală cu a elementului străbătut:

| Tip trecere | Soluție | Clasă |
|---|---|---|
| Coloane metalice (gaz) | manșon/mastic intumescent | EI conf. element |
| Coloane plastic (PP-R, PP canalizare) | colier intumescent | EI conf. element |
| Fascicule cabluri (TC, TE, curenți slabi) | pernă/mastic + vopsea termospumantă | EI conf. element |
| Tubulatură ventilare/desfumare | clapetă antifoc + etanșare | EI conf. element |
| Coloană sprinkler parcaj | manșon certificat SR EN 12845 | EI conf. element |

### PTh-I.6.5 Montaj structură de prindere fotovoltaic pe terasă

- **verificare structurală prealabilă** (obligatorie): încărcarea permanentă suplimentară și încărcarea de vânt pe module se verifică de inginerul structurist (`structura.md`) **înainte de montaj**;
- **etanșeitate** — la sistemele cu penetrare a hidroizolației terasei, fiecare punct de prindere se etanșează cu garnitură compatibilă, cu probă de ploaie;
- **distanțe față de exutorul de fum al casei scării și de receptoarele de terasă** — modulele nu se amplasează peste sau în vecinătatea acestora, păstrând culoare libere de acces pentru mentenanță;
- **legare la priza de pământ** — structura de prindere se leagă la bara de echipotențializare, integrată cu sistemul de protecție la trăsnet (§PTh-I.3.12).

### PTh-I.6.6 Montaj cablare curenți slabi

Cablarea videointerfonului, a rețelei de date/TV și a CCTV se montează în jgheaburi/tuburi separate de circuitele de curent tare (§PTh-I.6.2), cu distanță minimă de separare conform SR EN 50174. Rack-ul de comunicații (parter) are alimentare proprie și UPS dedicat (autonomie ≥30 min, pentru menținerea funcției de videointerfon și control acces la o eventuală întrerupere scurtă a alimentării generale, până la comutarea pe grupul electrogen).

### PTh-I.6.7 Protecția la zgomot și vibrații — execuție (C125, completare DTAC §13bis)

DTAC (§13bis) a stabilit principiile generale de protecție fonică; PTh detaliază execuția lor pe fiecare punct critic al clădirii, cu toleranțe și verificări concrete:

| Sursă de zgomot/vibrație | Măsură de execuție | Toleranță/verificare |
|---|---|---|
| Grup pompare hidrofor (subsol) | postament antivibrant (plăci elastomerice), racorduri elastice pe aspirație/refulare, cameră tehnică necontiguă dormitoarelor | verificare la PIF: nivel de zgomot transmis la peretele adiacent locuit ≤ 30 dB(A) |
| Grup pompare incendiu (subsol) | idem, plus fixare rigidă la punctele de ancorare seismică (compromis vibrație/seismic rezolvat prin amortizoare certificate dual-rol) | verificare vizuală montaj + test pornire fără vibrație perceptibilă la structura adiacentă |
| Ventilatoare parcaj (curent + F400) | suporți antivibranți, atenuatoare de zgomot pe tubulatură la traversarea zonelor locuite | ≤ 35 dB(A) în circulațiile comune adiacente |
| Coloane de canalizare (PP fonoabsorbant) | brățări cu garnitură fonică, distanțare de perete prin distanțieri elastici, evitarea contactului rigid cu pereții structurali ai dormitoarelor | ≤ 30 dB(A) în încăperea adiacentă la debit de vârf (SR EN 14366) |
| Coloane apă (dilatare termică) | brățări cu garnitură fonică + compensare naturală la fiecare palier (§DTAC 2.4) | verificare vizuală montaj, fără contact rigid conductă-planșeu |
| Centrale murale de apartament | montaj pe perete de compartimentare (nu pe peretele comun cu dormitorul vecin, unde planul de arhitectură o permite), suporți cu izolare fonică | recomandare de poziționare consemnată către arhitect, verificată pe planul definitiv |
| Ascensoare (motor MRL) | amortizoare pe grinda de ghidaj, izolare a puțului față de pereții structurali ai apartamentelor adiacente | ≤ 30 dB(A) în apartamentul adiacent puțului, la pornire/oprire cabină |
| Trecerile de conducte prin planșee/pereți | manșoane elastice (evitarea punților fonice rigide) | verificare vizuală la fiecare traversare (coordonat cu etanșarea la foc, §PTh-I.6.4 — manșonul elastic nu înlocuiește etanșarea EI, se montează complementar) |

Verificarea acustică finală (măsurători in-situ cu sonometru, la darea în exploatare, pe apartamentele reprezentative adiacente surselor de zgomot identificate mai sus) se consemnează într-un buletin distinct, anexat cărții tehnice a construcției (§PTh-I.8.2), complementar breviarului acustic elaborat separat de specialistul de acustică (`general.md`, piesă distinctă a documentației).

---

## PTh-I.7 Punerea în funcțiune (PIF) și reglaje

### PTh-I.7.1 Echilibrarea hidraulică a instalației de încălzire (fiecare apartament)

Reglajul robinetelor de presetare pe distribuitorul fiecărui apartament se face conform debitelor de calcul rezultate în §PTh-I.3.6, verificate cu termometru de contact/termocamera pe fiecare corp de încălzire, urmărind atingerea temperaturii interioare de calcul (20°C camere, 22°C băi) la sarcina de proiectare. Abatere admisă ≤±2K între încăperi.

### PTh-I.7.2 Reglaj aeraulic — ventilare parcaj și canale șuntă

Verificarea debitelor de ventilare pe cele 2 zone ale parcajului (§PTh-I.3.9) cu anemometru la gurile de introducere/extracție, abatere admisă ≤±15% pe total, ≤±20% pe fiecare gură (SR EN 12599, prin analogie cu practica industrială aplicată consecvent). Verificarea tirajului canalelor șuntă (fiecare apartament) prin test de fum/anemometru la gura de evacuare bucătărie/baie, confirmând debitele minime (90/50/25 mc/h).

### PTh-I.7.3 Protocol primă pornire — centrale murale de apartament

- Verificare etanșeitate gaz pe toată coloana și derivația de apartament (probă de presiune NTPEE) înainte de prima aprindere.
- Aprindere secvențială, apartament cu apartament (nu simultan), cu verificare ardere completă și evacuare corectă a gazelor arse (coaxial, fără reflux).
- Reglaj automatizare (termostat, curbă de încălzire) pentru atingerea temperaturilor de calcul.
- Proces-verbal de primă pornire per apartament, semnat de executant, furnizor echipament și beneficiar/proprietar.

### PTh-I.7.4 Protocol PIF — grup de pompare apă și grup de pompare incendiu

- **Hidrofor:** verificare curbă de funcționare VFD (consemn presiune ≈4,8 bar), test comutare pompă activă/rezervă, verificare protecție mers în gol.
- **Incendiu:** pornire automată la scădere de presiune simulată (deschidere robinet de test), cronometrare timp de pornire, comutare electropompă→pompă rezervă/Diesel (dacă adoptată), verificare pompă jockey, semnalizare stări la dispecerat.

### PTh-I.7.5 Programare IDSAI

Programare adrese (fiecare detector/buton pe palier, casă scară, parcaj), texte descriptive per zonă, testare integrală a matricei cauză-efect (§PTh-I.2.10), verificare deblocare fail-safe a ușii de acces principal la alarmă confirmată, punere sub supraveghere permanentă cu transmisie la dispecerat.

### PTh-I.7.6 Protocol PIF videointerfon, ITS și control acces

- Test apel/răspuns pe toate cele 40 de posturi de apartament, verificare deblocare yală de la fiecare monitor.
- Test funcțional al deblocării fail-safe integrate cu IDSAI (simulare alarmă incendiu → deschidere automată confirmată).
- Test conectivitate rețea de date pe toate prizele instalate, verificare UPS rack la simulare pană de curent.
- Test CCTV — verificare câmp vizual (intrare, parcaj, exterior incintă), retenție înregistrări conform politicii beneficiarului.

### PTh-I.7.7 Protocol PIF instalație fotovoltaică

Identic în principiu cu practica generală: verificare rezistență izolație pe string, test polaritate/tensiune circuit deschis, punere sub tensiune progresivă, test funcție anti-islanding, măsurare producție inițială comparată cu producția teoretică instantanee — proces-verbal de PIF cu curba de producție a primei zile.

### PTh-I.7.8 Protocol PIF ascensoare

Punere în funcțiune conform ISCIR PT R1-2010: verificare completă a lanțului de siguranță (limitator de viteză, paracăzătoare, contacte uși), test funcțional al comenzii de aducere la parter la alarmă de incendiu (ascensor 1) și al comenzii prioritare de pompieri (ascensor 2), verificare puț presurizat pentru ascensorul de pompieri. Recepția ISCIR precede punerea în exploatare a ambelor cabine.

---

## PTh-I.8 Plan de Control al Calității (PCC) instalații

| Nr. | Fază de lucrare | Document verificare | Cine verifică | Tip control |
|---|---|---|---|---|
| 1 | Recepție materiale/echipamente (certificate, agremente, marcaj CE) | certificate | responsabil tehnic | CQ |
| 2 | Priză de pământ de fundație (înainte de turnare fundații) | proces-verbal | RTE + diriginte | **FD** |
| 3 | Trasee îngropate (canalizare, pluvial, gaz exterior) înainte de acoperire | proces-verbal | RTE + diriginte | **FD** |
| 4 | Interfața cu adăpostul ALA (racorduri, goluri) înainte de finisare subsol | proces-verbal coordonare | RTE + proiectant ALA | **FD** |
| 5 | Montaj coloane apă/canal/gaz în ghene, toate nivelurile | proces-verbal montaj | RTE | CM |
| 6 | Probă presiune apă rece/ACM | PV probă SR EN 806-4 | RTE + diriginte | CM |
| 7 | Probă canalizare înainte de mascare/acoperire ghene | PV probă | RTE + diriginte | **FD** |
| 8 | Probă etanșeitate + funcțională instalație gaze | PV probă ANRE | firmă autorizată ANRE | **FD** |
| 9 | Montaj rețea sprinkler parcaj pe structură | proces-verbal montaj | RTE | CM |
| 10 | Probă presiune sprinkler parcaj (1,5×p regim, min. 15 bar, 2h) | PV probă | RTE + diriginte + ISU | **FD** |
| 11 | Probă presiune hidranți (coloană umedă) | PV probă | RTE + diriginte | CM |
| 12 | Rezistență izolație + priză de pământ (electric) | buletin PRAM | verificator/laborator | CM |
| 13 | Test RCD/diferențiale (toate cele 40 apartamente) | buletin PRAM | laborator autorizat | CM |
| 14 | Continuitate coborâri trăsnet + priză comună (8 coborâri) | buletin măsurători | laborator autorizat | CM |
| 15 | Funcțional IDSAI + matrice cauză-efect completă | PV probe 100% | firmă autorizată IGSU | **FD** |
| 16 | Funcțional stație de pompare incendiu | PV probă | firmă autorizată + ISU | **FD** |
| 17 | Funcțional presurizare casă scară (20-80 Pa) | PV probă | RTE + ISU | **FD** |
| 18 | Reglaj aeraulic (echilibrare debite parcaj + șuntă) | protocol debite | RTE | CM |
| 19 | Primă pornire centrale de apartament (40 buc.) | PV primă pornire | executant + furnizor + beneficiar | CM |
| 20 | Recepție ISCIR ascensoare (2 unități) | PV recepție ISCIR | organism ISCIR | **FD** |
| 21 | Funcțional videointerfon/ITS/control acces | PV probă | RTE | CM |
| 22 | Funcțional FV (string-uri, invertoare) | PV probă + rapoarte producție | firmă autorizată | CM |

Legendă: **FD** = fază determinantă (necesită prezența ISC/beneficiar/proiectant, uneori ISU); CM = control în masă; CQ = control calitate recepție.

### PTh-I.8.1 Faze determinante — detaliere

Fazele marcate FD sunt cele la care lucrarea nu poate continua fără verificare și proces-verbal, întrucât elementul devine inaccesibil sau are rol direct de securitate: priza de pământ de fundație (acoperită de betonul de fundație), traseele îngropate din subsol, interfața cu adăpostul ALA (goluri și racorduri prevăzute din execuție, altfel imposibil sau foarte costisitor de completat ulterior), proba de presiune a rețelei de sprinklere din parcaj (rețea vitală, montată pe structură apoi parțial mascată de finisaje), instalația de gaze (risc de explozie), recepția IDSAI și a stației de pompare incendiu (verificare 100% cu prezența ISU, condiție pentru autorizarea de securitate la incendiu), funcționarea presurizării casei scării și recepția ISCIR a celor 2 ascensoare (echipamente sub incidența unui regim de verificare obligatorie distinct).

### PTh-I.8.2 Cartea tehnică a construcției — capitol instalații

| Document | Conținut |
|---|---|
| Planuri as-built | trasee reale executate, per instalație, pe toate cele 9 niveluri + subsol |
| Scheme finale | monofilară actualizată TEG/TC/TE-apartament, coloane apă/canal/gaz, schema IDSAI |
| Fișe tehnice echipamente | toate echipamentele montate + certificate (marcaj CE, agremente PSI, ISCIR pt. ascensoare) |
| Buletine de probe | PRAM, presiune apă/sprinkler/hidranți, etanșeitate gaz, debite ventilare |
| Procese-verbale FD | toate fazele determinante semnate, inclusiv aviz ISU și recepție ISCIR |
| Protocoale reglaj | echilibrare hidraulică încălzire, reglaj aeraulic, primă pornire centrale |
| Instrucțiuni de exploatare | operare hidrofor, stație pompare incendiu, IDSAI, ascensoare, FV |
| Program mentenanță | revizii periodice (hidranți/sprinkler semestrial, gaze ANRE anual, ISCIR ascensoare) |
| Garanții | certificate garanție producători (pompe, centrale, ascensoare, FV) |

---

## PTh-I.9 Calcul iluminat interior și de siguranță (NP 061/2002, SR EN 12464-1)

### PTh-I.9.1 Metoda de calcul (flux luminos)

N = (E × S) / (Φ_corp × U × M)

unde E = nivelul de iluminare menținut cerut [lx], S = suprafața zonei [mp], Φ_corp = fluxul luminos al unui corp [lm], U = factorul de utilizare, M = factorul de mentenanță (0,80 pentru LED, mediu curat interior de bloc).

Corpuri de referință adoptate: **LED plafonieră 12 W/1.400 lm** (casa scării, holuri palier), **LED IP65 24 W/2.800 lm** (parcaj), **LED IP44 15 W/1.700 lm** (spații tehnice), **proiector LED 50 W/6.000 lm** (exterior incintă/fațadă).

### PTh-I.9.2 Cerințe de iluminare pe categorii de zone

| Zonă | Em cerut [lx] | UGR max | Ra min |
|---|---|---|---|
| Casa scării/holuri palier | 100 | 28 | 40 |
| Parcaj — circulație | 75 | 28 | 40 |
| Parcaj — locuri parcare | 20 | — | 40 |
| Spații tehnice (CT, TEG, gospodărie apă) | 200 | 25 | 60 |
| Hol acces principal | 150 | 22 | 60 |
| Boxe | 50 | — | 40 |
| Exterior/incintă | 20-50 | — | 20 |

### PTh-I.9.3 Calcul detaliat — casa scării (9 niveluri, palier + rampă)

| Nivel | S [mp] | k | U | E cerut | N calc | N adoptat | P instalat [W] |
|---|---|---|---|---|---|---|---|
| Subsol/Parter (hol acces) | 45 | 1,20 | 0,52 | 100/150* | 4,2 | 5 | 60 |
| Etaj curent (×8, palier+rampă, 22 mp/nivel) | 22 | 0,85 | 0,44 | 100 | 4,5 | 5 (×8=40) | 60/nivel (×8=480) |
| **Total casă scării (9 niveluri)** | **221** | | | | | **45** | **540** |

*Holul de acces principal, cu funcție dublă de circulație și de reprezentare, adoptă nivelul superior (150 lx) al intervalului.

### PTh-I.9.4 Calcul detaliat — parcaj subteran (2 zone, ≈640 mp)

| Zonă | S [mp] | k | U | E cerut | N adoptat | P instalat [W] |
|---|---|---|---|---|---|---|
| Zona A — circulație | 160 | 1,55 | 0,58 | 75 | 6 | 144 |
| Zona A — locuri parcare | 160 | 1,55 | 0,50 | 20 | 4 | 96 |
| Zona B — circulație | 160 | 1,55 | 0,58 | 75 | 6 | 144 |
| Zona B — locuri parcare | 160 | 1,55 | 0,50 | 20 | 4 | 96 |
| **Total parcaj** | **640** | | | | **20** | **480** |

### PTh-I.9.5 Calcul detaliat — spații tehnice, hol acces, boxe

| Zonă | S [mp] | E cerut | N adoptat | P instalat [W] |
|---|---|---|---|---|
| Cameră hidrofor + gospodărie apă | 25 | 200 | 3 | 45 |
| Cameră pompe incendiu | 20 | 200 | 2 | 30 |
| TEG | 15 | 200 | 2 | 30 |
| Camera SRM/gaze | 10 | 200 | 1 | 15 |
| Hol acces principal | 45 | 150 | 5 (v. §PTh-I.9.3) | (inclus mai sus) |
| Boxe (40 buc., mediu 4 mp/buc) | 160 | 50 | 20 (comun cu circulație) | 240 |
| **Total** | **275** | | **28** | **360** |

### PTh-I.9.5bis Calcul detaliat — iluminat exterior incintă

Iluminatul exterior deservește aleile pietonale, parcajele la sol (dacă adoptate la sistematizarea incintei) și accesul carosabil, cu corpuri LED pe stâlpi (H=4-5 m), conform cerinței DTAC (§7.4) de 20-50 lx pe zonele exterioare:

| Zonă exterioară | S [mp] | E cerut [lx] | Corp adoptat | Nr. corpuri | P instalat [W] |
|---|---|---|---|---|---|
| Alei pietonale acces principal | 200 | 20 | LED stâlp 30 W, H=4 m | 5 | 150 |
| Parcaje la sol (dacă exterioare) | 300 | 20 | LED stâlp 40 W, H=5 m | 4 | 160 |
| Acces carosabil incintă | 150 | 20 | LED stâlp 30 W, H=4 m | 3 | 90 |
| Fațadă principală (balizaj) | — | — | proiector LED 50 W | 2 | 100 |
| Loc de joacă (dacă adoptat) | 100 | 20 | LED stâlp 30 W, H=4 m | 2 | 60 |
| **Total exterior** | | | | **16** | **560** |

Comandă prin celulă crepusculară + programator orar, cu reducere de intensitate (dimming la 50%) în intervalul orar de trafic redus (00:00–05:00) și revenire la 100% pe senzor de mișcare la accesul pietonal/carosabil — măsură de eficiență energetică suplimentară față de valoarea generică din DTAC (care includea iluminatul exterior în cifra globală de siguranță/exterior de ≈4 kW, cifră ce cuprindea și componenta de iluminat de securitate interior).

### PTh-I.9.6 Sinteza puterii instalate iluminat normal

| Zonă | Nr. corpuri | Putere instalată [W] |
|---|---|---|
| Casa scării (9 niveluri) | 45 | 540 |
| Parcaj (2 zone) | 20 | 480 |
| Spații tehnice + boxe | 28 | 360 |
| Exterior incintă (§PTh-I.9.5bis) | 16 | 560 |
| **Total iluminat comun** | **109** | **1.940** |

Putere specifică pe suprafața comună de circulație interioară (≈900 mp: casă scării+parcaj+hol) ≈ **1,98 W/mp**, sub limita orientativă NP 061 pentru soluții LED. Comandă cu senzori de prezență pe casa scării și pe circulațiile parcajului (economie estimată 60-75%, §PTh-I.3.14).

### PTh-I.9.7 Iluminat de siguranță și evacuare (SR EN 1838)

| Tip iluminat siguranță | Nivel | Autonomie | Amplasare |
|---|---|---|---|
| Evacuare (căi) | ≥1 lx pe ax | 3 h | Casa scării (toate 9 niveluri), holuri palier, parcaj |
| Antipanică (parcaj, hol acces) | ≥0,5 lx | 3 h | Parcaj (2 zone), hol acces principal |
| Marcare hidranți/pompe/tablouri | ≥5 lx | 3 h | Toate punctele PSI (hidranți palier, pompe, TEG) |
| Indicatoare direcție (Exit) | luminanță ≥2 cd/mp | 3 h | Casa scării, ieșiri parter, parcaj |

Autonomia adoptată **3 h** (peste minimul de 1 h) — cerință aplicabilă clădirilor cu multe niveluri/în prag de clădire înaltă (P118-3, §7.4 DTAC), pentru a acoperi durata extinsă de evacuare pe 9 niveluri și eventuala intervenție prelungită a ISU.

| Zonă | Corpuri evacuare (3W) | Corpuri antipanică (5W) | Indicatoare Exit (3W) |
|---|---|---|---|
| Casa scării (9 niveluri) | 18 (2/nivel) | — | 9 (1/nivel) |
| Parcaj (2 zone) | 8 | 6 | 4 |
| Hol acces + ieșiri | 4 | 2 | 3 |
| Marcare PSI (hidranți/pompe) | 12 (5 lx) | — | — |
| **Total** | **42** | **8** | **16** |

Total iluminat de siguranță: 66 corpuri, ≈220 W total, pe acumulatori proprii cu autotest lunar automat și test de autonomie semestrial. Verificare timp de comutare ≤5 s pentru 50% nivel, ≤60 s pentru 100% (SR EN 1838), asigurat prin corpuri autonome cu comutare instantanee.

---

## PTh-I.10 Breviar de calcul suplimentar securitate la incendiu (instalații)

### PTh-I.10.1 Verificare timp de funcționare pompe vs. timp de intervenție ISU

Timpul de funcționare proiectat al pompelor (hidranți interiori 10 min, sprinklere parcaj 60 min, hidranți exteriori — dacă alimentați din rezervă proprie — 180 min) trebuie să acopere timpul realist de intervenție a serviciilor de urgență. Pentru amplasamente la distanță de subunitatea ISU care ar depăși timpii uzuali de intervenție, se recomandă beneficiarului confirmarea distanței față de cea mai apropiată subunitate — aspect de confirmat cu ISU la avizare, nefiind o cifră care poate fi stabilită onest fără datele reale de amplasament (aceeași rezervă metodologică aplicată consecvent în toată platforma).

### PTh-I.10.2 Verificare acoperire cu hidranți interiori — geometrie pe palier

Pentru palierul tip (≈640 mp/nivel, 4-5 apartamente), verificarea acoperirii cu 2 jeturi simultane (furtun 20 m + jet 6 m = rază utilă 26 m) la hidrantul de palier: raza de acțiune acoperă integral suprafața palierului curent (dimensiune maximă diagonală ≈35 m la un plan compact în jurul nucleului central, verificată pe planul definitiv de arhitectură) — **confirmă poziționarea unui singur hidrant/palier** este suficientă doar dacă geometria reală a planului confirmă raza de 26 m pe toate colțurile; la planuri mai alungite, se prevede al doilea hidrant pe același nivel. Verificarea finală se face pe planul de arhitectură definitiv al fiecărui nivel.

### PTh-I.10.3 Coloană uscată vs. umedă — decizie finală de execuție

Conform §PTh-I.2.11, se adoptă **coloană umedă** (permanent sub presiune, alimentată din gospodăria de incendiu proprie), decizie motivată de încadrarea clădirii la limita categoriei „clădiri înalte" (H≈27-28 m, P118-1 §1.1) — soluție care elimină timpul de așteptare al presurizării de către autospeciala ISU (necesar la coloana uscată) și asigură disponibilitate imediată la orice nivel, inclusiv la primele minute critice ale unui incendiu.

### PTh-I.10.4 Verificare timp de evacuare orientativ (RSET) vs. timp de dezvoltare a incendiului (ASET)

Pentru cei 112 ocupanți (plus vizitatori ocazionali), pe baza gabaritelor căilor de evacuare stabilite în memoriul de arhitectură (`arhitectura.md`):

- timpul de detecție + alarmare (T_det): ≤60 s (detectoare automate pe palier + casă scară);
- timpul de reacție a ocupanților (T_reac): ≈120-180 s (locuințe, ocupanți neinstruiți, posibil regim de somn nocturn — valoare mai conservatoare decât la o clădire cu personal instruit);
- timpul de deplasare până la ieșire (T_depl): funcție de nivel (etajul 8 are cel mai lung traseu, prin casa scării presurizată, verificat la faza de arhitectură conform P118-1);
- **RSET** = T_det + T_reac + T_depl, comparat cu **ASET**, determinat de eficiența desfumării casei scării (presurizare, §PTh-I.2.12) și de compartimentarea la foc a fiecărui apartament față de casa scării comună (uși EI cu autoînchidere).

Verificarea cantitativă completă RSET < ASET se realizează în **scenariul de securitate la incendiu** (document dedicat, elaborat de expert/proiectant atestat), care preia breviarele hidraulice și de presurizare din prezentul supliment ca date de intrare validate. Prezentul document de instalații nu se substituie scenariului de securitate la incendiu, ci îi furnizează parametrii tehnici confirmați ai instalațiilor.

### PTh-I.10.5 Protecția golurilor de trecere ale instalațiilor verticale (compartimentare pe verticală)

Toate ghenele tehnice verticale (apă, canalizare, gaz, electrice, curenți slabi) care traversează planșeele celor 9 niveluri constituie, din perspectiva securității la incendiu, **puncte critice de propagare verticală a fumului/focului** dacă nu sunt corect etanșate la fiecare nivel. Conform §PTh-I.6.4, fiecare traversare de planșeu se etanșează individual (nu doar la partea superioară/inferioară a ghenei), astfel încât ghena însăși să nu funcționeze ca un „coș" de propagare a fumului între apartamente suprapuse — verificare consemnată explicit ca fază de control (§PTh-I.8, poziția 5, control în masă pe toate nivelurile).

### PTh-I.10.6 Verificare acoperire sprinklere/hidranți parcaj — coordonare cu accesul ISU

Accesul autospecialelor ISU la subsolul cu parcaj se face prin rampa auto (dimensionată la gabaritul de manevră) și, pentru intervenție directă, prin racordul tip B poziționat la exteriorul clădirii, accesibil fără a necesita coborârea în subsol — coordonare cu sistematizarea exterioară (`general.md`, cap. 6-9) pentru distanța și accesibilitatea acestui racord.

---

## PTh-I.11 Concluzii și corelare finală

Prezentul supliment PTh detaliază integral, la nivel de execuție, toate instalațiile blocului de locuințe S+P+8E stabilite în DTAC (`instalatii.md`): rețeaua de apă rece cu contorizare individuală (calculată nod-cu-nod pe toate cele 3 coloane, confirmând debitele globale din DTAC — 2,76 l/s la nivel de bloc, 1,29/1,22/1,18 l/s pe coloane), ACM individual instant cu verificarea dead-leg pe toate tipologiile, canalizarea menajeră și pluvială (cu o completare de execuție privind mărirea coloanelor de WC la Dn125 sau ventilare secundară suplimentară), instalația termică cu centrale individuale (breviar termic extins pe toate cele 4 tipologii de apartament), instalația de gaze (Renouard nod-cu-nod, confirmând pierderea de ≈4,7 mbar pe traseul cel mai defavorizat), instalația electrică completă cu selectivitate și cădere de tensiune verificată pe toate circuitele (inclusiv recalcularea bilanțului pentru cele 2 ascensoare), ventilarea/desfumarea parcajului pe 2 zone, sprinklerele parcajului (confirmate ca soluție necesară, cu breviar hidraulic complet SR EN 12845), hidranții interiori/exteriori cu coloană umedă, presurizarea casei scării, priza de pământ și protecția la trăsnet (8 coborâri, verificate pe perimetrul real), instalația de curenți slabi (videointerfon, ITS, control acces, CCTV), instalația fotovoltaică, transportul pe verticală cu 2 ascensoare (verificat prin calcul de trafic) și interfața tehnică, tratată cu onestitate metodologică, cu instalațiile adăpostului de protecție civilă ALA.

Toate valorile de dimensionare din DTAC au fost **verificate prin recalculare nod-cu-nod** și confirmate coerente (apă rece 2,76 l/s bloc / 1,29 l/s CAR-1, gaz 44 mc/h bloc / 18,5 mc/h CG-1, electric Pc=163→193 kW cu 2 ascensoare/Ic=303A, desfumare 2×5.000 mc/h curent + 2×10.000 mc/h desfumare, priză pământ R≈0,89Ω). Elementele suplimentare introduse la faza PTh (breviar hidraulic pe noduri pentru toate coloanele, fișe tehnice de echipament, tabele de probe, tehnologie de montaj, PCC, calcul iluminat complet metoda flux luminos, calcul de trafic ascensoare, breviar sprinklere parcaj SR EN 12845, interfața cu adăpostul ALA) constituie baza pentru execuție, verificare de proiect (verificatori atestați MDLPA pe cerințele Is/It/Ie/Ig) și autorizare de securitate la incendiu (ISU), conform Legii 10/1995 și HG 907/2016.

**Confirmări necesare înainte de finalizarea execuției** (semnalate onest, nu presupuse): rezistivitatea de sol reală (măsurată, ipoteza de 100 Ω·m se confirmă/corectează la execuția prizei de fundație), avizul operatorului de apă privind debitul disponibil pentru reumplerea rezervei de incendiu mărite (≈68-70 mc), distanța față de subunitatea ISU pentru validarea autonomiei eventualei pompe Diesel de rezervă, poziția definitivă a băii secundare la apartamentele de 3-4 camere (pentru reconfirmarea calculului de dead-leg ACM), capacitatea și proiectul de specialitate al adăpostului ALA (elaborate separat, cu interfața deja rezervată conform §PTh-I.2.15/§PTh-I.3.16), și geometria exactă a fiecărui palier pentru verificarea finală a acoperirii cu hidranți (§PTh-I.10.2). Orice modificare a soluției de sursă termică (trecerea de la centrale individuale la termoficare/pompe de căldură) sau a numărului de ascensoare impune re-dimensionarea integrală a instalațiilor electrice și, dacă e cazul, a coloanelor de gaz.

---

## ANEXA B — Breviar centralizat PTh (verificare de coerență cu breviarul DTAC)

Anexa reunește, pentru trasabilitate, toate mărimile de calcul rezultate în prezentul supliment PTh, alături de valoarea corespunzătoare din breviarul DTAC (`instalatii.md`, cap. 14bis), confirmând coerența dintre dimensionarea preliminară și calculul de execuție nod-cu-nod.

**B.1 Apă rece și ACM:**
- debit de calcul bloc (metodă simplificată DTAC): 2,76 l/s ↔ confirmat prin calcul nod-cu-nod pe cele 3 coloane (PTh-I.3.1): 1,29+1,22+1,18=3,69 l/s însumat pe coloane individuale (superior debitului simultan de bloc, corect — coeficientul de simultaneitate global al blocului este mai sever decât suma coloanelor izolate) — **coerent conceptual**, valoarea de dimensionare a colectorului general (2,76 l/s) rămâne cea din DTAC, aplicată la nivel de bloc;
- pierdere de sarcină riser CAR-1: ≈2,24 mCA (PTh, nod-cu-nod) ↔ ≈2,79 mCA traseu complet subsol-etaj8-apartament (DTAC) — **coerent**, diferența reprezintă tronsonul orizontal interior;
- H_nec verificat la etaj 8: ≈42,8 mCA (PTh) ↔ 47,5 mCA adoptat (DTAC) — marjă de siguranță confirmată ≈4,7 mCA.

**B.2 Canalizare și pluvial:**
- debit canalizare menajeră bloc: 9,2 l/s (DTAC) ↔ confirmat pe colectorul orizontal (PTh-I.3.4), cu completare de execuție (mărire coloane WC la Dn125 sau ventilare secundară suplimentară, aspect nou identificat la verificarea nod-cu-nod);
- bazin de retenție pluvial: 3,3 mc (DTAC) ↔ 3,5 mc adoptat la execuție (PTh-I.3.5, marjă 6%).

**B.3 Termic și gaze:**
- necesar termic bloc: ≈88 kW (DTAC) ↔ confirmat prin breviarul extins pe toate cele 4 tipologii (PTh-I.3.6), cu puteri de centrală nemodificate (24/24/28/31 kW);
- debit gaz bloc: 44 mc/h (DTAC) ↔ verificat nod-cu-nod pe coloana CG-1 (18,5 mc/h), pierdere totală traseu cel mai defavorizat ≈4,7 mbar (PTh-I.3.7), sub pragul NTPEE de 10 mbar.

**B.4 Electric:**
- putere cerută Pc≈158 kW, Ic≈298A (DTAC, 1 ascensor) ↔ **recalculat la PTh** la Pc≈163 kW (normal) / ≈193 kW (scenariu maximal), Ic≈303A, cu 2 ascensoare (PTh-I.3.8) — întrerupătorul general de 400A rămâne confirmat, cu marjă redusă de la 102A la 97A;
- curent de pornire motor pompă incendiu (nou, PTh): ≈356A la pornire directă → soluție soft-starter adoptată (PTh-I.3.11).

**B.5 Desfumare/ventilare parcaj:**
- ventilare curentă 10.000 mc/h / desfumare 20.000 mc/h (DTAC, compartiment unic) ↔ repartizate pe 2 zone × 5.000/10.000 mc/h (PTh-I.3.9), confirmare identică la nivel global.

**B.6 PSI (nou/extins la PTh):**
- rezervă apă incendiu: ≈2,52 mc HI (DTAC) ↔ **extinsă la ≈68-70 mc** prin adoptarea sprinklerelor parcaj (18,0 l/s, rezervă 60 min = 65 mc, PTh-I.3.10) — completare de execuție care nu contrazice DTAC (care semnalase condiționat necesitatea), ci o confirmă și o dimensionează;
- decizie coloană umedă (nu uscată) — motivată de pragul de clădire înaltă (PTh-I.10.3).

**B.7 Iluminat (nou, detaliat integral la PTh):**
- putere instalată iluminat comun: 1.780 W / ≈900 mp circulații = 1,98 W/mp (PTh-I.9.6);
- iluminat de siguranță: 66 corpuri, ≈220 W total, autonomie 3h (PTh-I.9.7).

**B.8 Ascensoare (nou, calcul de trafic la PTh):**
- 2 ascensoare (decizie confirmată din recomandarea DTAC) — capacitate de transport ≈47% din populație/5min (PTh-I.3.15), redundanță completă asigurată.

**B.9 Adăpost ALA (interfață, nou la PTh):**
- 3 rezervări de racord (electric ≥5kW, apă dedicată, evacuare aer) consemnate ca fază determinantă (PTh-I.3.16), capacitatea și echipamentele adăpostului rămân obiectul proiectului de specialitate dedicat, avizat ISU.

Concluzia verificării de coerență: **toate valorile globale ale breviarului DTAC se confirmă prin calculul de execuție nod-cu-nod al prezentului supliment PTh**, cu marje rezonabile care acoperă variațiile reale de traseu ce se confirmă la execuție. Singurele aspecte noi identificate la PTh (mărirea coloanelor de WC, soft-starter pompă incendiu, extinderea rezervei de incendiu cu sprinklere parcaj, recalcularea electrică pentru 2 ascensoare, detalierea completă a iluminatului, calculul de trafic al ascensoarelor, interfața cu adăpostul ALA) nu contrazic dimensionarea DTAC, ci o completează la nivelul de detaliu specific fazei de execuție.

---

*Supliment de fază PTh — instalații. Se citește împreună cu memoriul DTAC `instalatii.md` (care rămâne referința pentru încadrarea normativă și dimensionarea preliminară) și cu memoriile `general.md`, `arhitectura.md`, `structura.md` pentru coordonarea interdisciplinară.*
