# SUPLIMENT DE FAZĂ PTh — INSTALAȚII
## Spital privat / clinică multifuncțională, regim S+P+4E — 90 paturi spitalizare + 8 posturi ATI + 3 săli de operație + ambulatoriu/imagistică/laborator

---

## PTh-I.1 Obiectul și structura suplimentului de fază PTh

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție, conform HG 907/2016 anexa 8 și Legii nr. 169/2026 — CATUC, art. 264, Anexa 2) pentru memoriul de instalații al unității medicale multifuncționale (`instalatii.md`), elaborat pentru gabaritul de referință S+P+4E, arie desfășurată construită (ADC) ≈6.000 mp (≈1.000 mp/nivel), cu **90 de paturi de spitalizare, 8 posturi de terapie intensivă (ATI), 3 săli de operație**, ambulatoriu, imagistică (RX/CT/RMN), laborator și farmacie, flux de proiectare de 220 de persoane pe schimb, categorie de importanță **A** și clasă de importanță și expunere seismică **I** (γI = 1,40). Documentul dezvoltă la nivel de execuție tot ceea ce faza DTAC a stabilit la nivel de concept, dimensionare preliminară și încadrare normativă — **fără a relua** breviarele DTAC, ci ducându-le la nivel de tronson/nod/priză/element și adăugând componentele specifice fazei PTh: scheme complete de execuție, breviare nod-cu-nod, fișe tehnice de echipament, tabele de probe, tehnologie de montaj, protocoale de punere în funcțiune (PIF) și Planul de Control al Calității.

Spre diferență de suplimentele PTh ale unei clădiri comerciale sau industriale, unde nivelul de risc al unei nereguli de execuție este, în cazul cel mai defavorabil, material (pagubă de echipament, întrerupere de activitate), la o unitate medicală cu bloc operator și ATI **nivelul de risc al unei nereguli de execuție a instalațiilor este direct cel al vieții pacientului** — o brazură poroasă pe conducta de oxigen, o eroare de conectare a unei prize de gaz, o garnitură neetanșă de filtru HEPA sau o rezistență de echipotențializare peste prag nu sunt, la această clădire, defecte de calitate obișnuite, ci defecte cu potențial letal direct. Din acest motiv, prezentul supliment tratează execuția și probele cu o rigoare superioară celei aplicate oricărei alte funcțiuni din biblioteca tehnică, cu accent explicit — solicitat de beneficiar și dezvoltat integral în continuare — pe patru teme critice: **(1)** execuția și probarea rețelei de gaze medicale conform SR EN ISO 7396-1; **(2)** execuția și comisionarea sălilor sterile/sălilor de operație cu presiune controlată și filtrare HEPA; **(3)** execuția pardoselilor conductive și a echipotențializării electrice a sălilor de operație; **(4)** compartimentarea la foc specifică unităților medicale, tratată din perspectiva instalațiilor (clapete antifoc, etanșări RF, alimentare electrică pe circuite rezistente la foc).

PTh-I aduce, față de DTAC, următoarele niveluri suplimentare de detaliere:

| Element | Nivel DTAC (`instalatii.md`) | Nivel PTh (prezentul document) |
|---|---|---|
| Gaze medicale | debite globale pe categorie, principii de redundanță | rețea completă cu diametre/coloane/cutii de zonă/prize numerotate, breviar hidraulic nod-cu-nod, tehnologie de sudură/degresare, **planul complet de probe SR EN ISO 7396-1** |
| Tratarea aerului sălilor sterile | scheme conceptuale, un tabel de parametri pe destinație | AHU dedicat per sală cu toate componentele, plafon de flux laminar dimensionat, **protocol complet de comisionare** (DOP, vizualizare flux, cascadă de presiuni, numărare particule, recovery test) |
| Electric IT medical/echipotențializare | principiu, prag alarmă, prag rezistență | schema de execuție per sală, dimensionarea transformatorului, **protocol de măsurare și acceptanță** |
| Pardoseală conductivă | menționată la structura BEP | execuție completă rețea de împământare funcțională + testare rezistență |
| Compartimentare la foc (instalații) | principiu de evacuare orizontală | poziția fiecărei clapete antifoc, fiecărei treceri etanșe, fiecărui cablu E90/PH90, coordonat cu scenariul PSI |
| Breviar hidraulic apă/canalizare | debite globale, un nod critic | calcul nod cu nod pe toate tronsoanele |
| Breviar electric | necesar global (kW, kVA) | dimensionare completă pe fiecare circuit, verificare cădere de tensiune, selectivitate |
| Echipamente | tipuri și puteri de principiu | fișe tehnice complete per echipament major (parametri garantați de furnizor) |
| Probe | enumerare pe specialitate | Plan de Control al Calității + tabel complet presiune/durată/criteriu de admisie |
| Montaj | principii generale | tehnologie, succesiune, susțineri, izolații, treceri la foc, cerințe seismice clasa I |
| Iluminat | niveluri globale | calcul complet metoda flux luminos pe fiecare zonă funcțională |

Normative de referință aplicate suplimentar în execuție, față de cele deja citate în DTAC (I5, I7, I9, I13, I18, SR EN ISO 7396-1, SR EN ISO 14644, NP 051/2012, Ordinul MS 1226/2012, Legea 372/2005+Mc001, SR EN 16798-1, OMS 1096/2016, Ordinul MS 1226/2012, Legea 111/1996+NSR-06, P118-1/2/3, HG 571/2016, Ord. MAI 129/2016): **SR EN 13348** (tuburi de cupru pentru gaze medicale/vid — execuția propriu-zisă a rețelei), **SR EN ISO 7396-2** (sisteme de evacuare gaze anestezice reziduale — AGSS), **SR EN 737** (terminale de gaze medicale — profil mecanic), **SR HD 60364-7-710** (execuția instalației electrice în locații cu destinație medicală, aplicată deja la DTAC și dusă aici la nivel de schemă/protocol de probă), **SR EN 60601-1** (referință pentru curenții de scurgere ai echipamentelor medicale, relevantă pentru dimensionarea egalizării de potențial), **IEC 61340-4-1** (metoda de măsurare a rezistenței electrice a pardoselilor — referință tehnică internațională, folosită comparativ, fără corespondent explicit obligatoriu în normativul românesc citat în DTAC — semnalată explicit ca atare oriunde apare), **SR EN 12845** (calcul hidraulic sprinklere, pentru zonele non-critice ale clădirii), **SR EN 54** (seria pentru componentele IDSAI), **SR EN 1838** (iluminat de siguranță — verificarea timpilor de comutare), **SR EN 806-4** (probe de presiune rețele de apă), **C56** (verificarea calității lucrărilor de instalații), **SR EN 62305-3** (execuția SPD/coborârilor protecției la trăsnet).

### PTh-I.1.1 Principiul de proiectare care guvernează întregul document

Fiecare soluție de execuție, fiecare probă și fiecare toleranță din paginile care urmează este subordonată aceluiași principiu enunțat la cap. 1.7 al memoriului DTAC de instalații și reluat aici ca fir conducător: **nicio decizie de execuție nu poate face o eroare de conectare, de presiune sau de identificare a unui fluid vital doar improbabilă — trebuie să o facă fizic imposibilă**, iar acolo unde imposibilitatea fizică nu este atinsă integral (de exemplu, o eroare umană de manevră rămâne posibilă indiferent de proiectare), execuția trebuie să garanteze că orice abatere este **detectată și alarmată înainte de a produce consecințe ireversibile asupra pacientului**. Acest principiu structurează integral capitolele PTh-I.2 (scheme), PTh-I.5 (probe) și PTh-I.8 (Planul de Control al Calității).

---

## PTh-I.2 Scheme detaliate de execuție

### PTh-I.2.1 Schema rețelei de gaze medicale — surse, distribuție, cutii de zonă (SR EN ISO 7396-1)

**Sursele centrale**, amplasate în stația tehnică de gaze medicale de la subsol (compartiment rezistent la foc dedicat, separat de restul zonei tehnice, cu ventilare proprie și acces controlat conform DTAC cap. 6.8 și cap. 13.2 din memoriu):

```
Stație gaze medicale (subsol) ─┬─► VIE oxigen 5.000 l + vaporizatoare atmosferice duble ─┐
                                ├─► Rampă automată butelii O2 (comutare la cădere presiune)  ├─► Colector O2 ─► Cutii de zonă ─► Prize
                                ├─► Rampă backup manuală + prize NIST de urgență ────────────┘
                                ├─► Stație compresoare AIR-4 (2A+1R, oil-free) + rezervor 2×1.000 l ─► Colector AIR-4 ─► Cutii de zonă ─► Prize
                                ├─► Treaptă suprapresiune AIR-8 (7-8 bar, din aceeași stație compresoare) ─► Colector AIR-8 (numai săli operație)
                                ├─► Stație pompe vacuum (duplex-triplex N+1) + filtre bacteriologice ─► Colector VAC ─► Cutii de zonă ─► Prize
                                ├─► Rampă dublă N₂O (comutare automată) ─► Colector N₂O (săli operație + naștere)
                                ├─► Rampă dublă CO₂ (comutare automată) ─► Colector CO₂ (săli operație — laparoscopie)
                                └─► Unitate AGSS (vacuum dedicat, separat fizic) ─► Colector AGSS ─► Prize AGSS (numai posturi de anestezie)
```

**Coloanele verticale** urcă prin ghena tehnică centrală a clădirii (dedicată exclusiv gazelor medicale, fără partajare cu instalații electrice neprotejate corespunzător, conform interdicției de proximitate stabilite în DTAC cap. 6.9 și cap. 17), cu câte o coloană separată pentru fiecare tip de gaz și cu derivații orizontale la fiecare nivel prin **cutii de zonă**:

| Coloană | Diametru bază (subsol→et.1) | Diametru vârf (et.4) | Presiune de regim | Cutie de zonă per nivel |
|---|---|---|---|---|
| O₂ | Cu 42×1,5 (medical, degresat) | Cu 15×1,0 | 4-5 bar | da, la fiecare etaj + bloc operator |
| AIR-4 | Cu 35×1,5 | Cu 15×1,0 | 4-5 bar | da |
| AIR-8 | Cu 22×1,0 | — (numai etajul 1) | 7-8 bar | da (numai bloc operator) |
| VAC | Cu 42×1,5 | Cu 18×1,0 | −0,6…−0,9 bar | da |
| N₂O | Cu 15×1,0 | — (numai etajul 1 + naștere) | 4-5 bar | da (numai zonele deservite) |
| CO₂ | Cu 12×1,0 | — (numai bloc operator) | 4-5 bar | da (numai bloc operator) |
| AGSS | Cu 22×1,0 | — (numai bloc operator + naștere) | vacuum dedicat | da (numai zonele deservite) |

**Cutiile de zonă** (câte una pentru fiecare departament/secție, conform principiului de sectorizare din DTAC cap. 6.9) conțin, pentru fiecare gaz distribuit în zona respectivă: vană de secționare cu poziție vizibilă (deschis/închis), manometru local, racord de test și etichetare permanentă cu denumirea gazului și codul de culoare (cap. 6.2 DTAC). Poziția fiecărei cutii de zonă se marchează pe planul de execuție la limita fiecărui compartiment funcțional (intrare secție de spitalizare, sas bloc operator, filtru ATI), astfel încât izolarea unei singure zone pentru mentenanță sau avarie locală să fie posibilă fără a atinge nicio altă cutie și fără a întrerupe alimentarea restului clădirii — execuția fizică directă a principiului de sectorizare deja stabilit conceptual în DTAC.

### PTh-I.2.2 Distribuția prizelor terminale pe tip de încăpere — schema de execuție

| Încăpere | Tip prize instalate | Număr per post/pat | Profil mecanic |
|---|---|---|---|
| Sală de operație (×3) | O₂, AIR-4, AIR-8, VAC, N₂O, CO₂, AGSS | câte 1-2 din fiecare, la fiecare post de anestezie (coloană pensilă sau perete) | pin-index/profil unic per gaz, conform SR EN 737 |
| Post ATI (×8) | O₂, AIR-4, VAC | 2-3 prize din fiecare per post (redundanță locală) | profil unic per gaz |
| Sală de naștere | O₂, AIR-4, VAC, N₂O, AGSS | 1-2 din fiecare | profil unic per gaz |
| Salon standard/imunodeprimat | O₂, VAC | 1 din fiecare per pat | profil unic per gaz |
| Sas dezechipare bloc operator | AGSS (evacuare filtre anestezice) | 1 | — |

Fiecare priză terminală se livrează cu **fișă de conectare unică din punct de vedere geometric** pentru gazul respectiv (sistem tip pin-index sau echivalent certificat conform SR EN 737), astfel încât conectarea unui furtun de gaz greșit la o priză să fie **mecanic imposibilă**, indiferent de nivelul de atenție al personalului în momentul manevrei — execuția materializează direct principiul discutat la DTAC cap. 6.2 și reluat la PTh-I.1.1. Montajul prizelor se realizează cu etichetare vizibilă permanentă (cod de culoare + text) la partea vizibilă a fiecărei prize, verificată individual la recepție (PTh-I.5.1).

### PTh-I.2.3 Schema alarmării gazelor medicale — trei niveluri, execuție

```
Senzor de presiune pe fiecare colector de gaz ──┬──► Panou alarme operaționale (stație sursă, subsol)
                                                  ├──► Panou alarme clinice (nurse station, per secție/etaj)
                                                  └──► Panou alarme de urgență (sas acces bloc operator)
                                                        │
                                          toate cele 3 niveluri alimentate din UPS dedicat (cap. PTh-I.2.7)
```

Fiecare panou de alarmă clinică (nurse station) afișează starea rețelei care deservește exact zona supravegheată de acel post — nu starea globală a instalației — pentru ca personalul medical să identifice imediat dacă alimentarea gazelor la patul pacienților pe care îi îngrijește este afectată. Cablarea de semnalizare a alarmelor se execută pe circuit dedicat, separat fizic de cablarea curenților slabi generali ai clădirii, cu alimentare din tabloul neîntreruptibil (cap. PTh-I.2.7), conform interdicției ca o cădere generală de tensiune să elimine exact informația de care personalul are cea mai mare nevoie în acel moment.

### PTh-I.2.4 Schema tratării aerului — bloc operator (AHU dedicat per sală, cascadă de presiuni)

```
Priză aer exterior ─► Prefiltru F7 ─► Baterie încălzire/răcire ─► Umidificator (abur igienic din apă tratată, cap. PTh-I.2.9)
   ─► Ventilator introducere (dublu, redundant) ─► Filtru fin F9 ─► Filtru HEPA H14 terminal (plafon laminar 3,2×3,2 m,
      montat direct deasupra mesei de operație) ─► Sala de operație (+15 Pa față de coridor)
         ─► extracție prin guri la partea inferioară a pereților ─► Ventilator extracție (dublu, redundant)
            ─► recuperare de căldură prin circuit intermediar cu glicol (fără contact direct între fluxuri) ─► evacuare exterior
```

Fiecare sală de operație este deservită de o **AHU dedicată exclusiv acelei săli** (nu partajată), cu ventilatoare de introducere și de extracție **duble**, astfel încât o defecțiune sau o intervenție de mentenanță asupra unui singur ventilator să nu întrerupă complet fluxul de aer al sălii în timpul unei intervenții în curs — execuția reia direct principiul de redundanță stabilit la DTAC cap. 8.4. Traseul de tubulatură de la AHU la difuzorul terminal se execută în oțel galvanizat cu clasă de etanșeitate ridicată (echivalent clasei C — SR EN 12237), cu izolație termică și, la traversarea zonei de coridor, cu finisaj interior lavabil pe toate suprafețele accesibile, pentru a permite igienizarea periodică a tubulaturii vizibile din tavanul tehnic.

**Cascada de presiuni pe traseul de la sala de operație către coridorul general** (execuția fizică a fizicii descrise la DTAC cap. 8.2):

| Zonă | Presiune relativă de proiect | Diferența față de zona următoare |
|---|---|---|
| Sala de operație aseptică | +15 Pa | referință |
| Filtru/sas de acces sală | +10 Pa | −5 Pa față de sală |
| Coridor curat bloc operator | +5 Pa | −5 Pa față de filtru |
| Coridor general/zonă murdară | 0 Pa (referință atmosferică) | −5 Pa față de coridorul curat |

Fiecare treaptă a cascadei se execută cu o diferență minimă susținută de raportul dintre debitul de aer introdus și cel extras din fiecare încăpere (nu prin obturarea parțială a ușilor, care ar fi o soluție instabilă și nesustenabilă în timp) — reglajul fin al acestui raport, pe fiecare încăpere din lanț, este obiectul comisionării de la PTh-I.5.2. Ușile dintre zone sunt echipate cu autoînchidere, iar rostul dintre canaturi și prag este calculat astfel încât să constituie exact calea de scurgere de aer proiectată pentru menținerea cascadei (nu o etanșare totală, care ar bloca fizic realizarea diferenței de presiune proiectate).

### PTh-I.2.5 Schema tratării aerului — ATI, izolare, naștere/neonatologie

Deservirea ATI (8 posturi) se realizează printr-o AHU dedicată zonei, cu componentele descrise la DTAC cap. 8.3 (10-12 schimburi/h, 100% aer proaspăt, filtrare F7+F9+H13, +8 Pa), fiecare post putând fi izolat individual prin module de presurizare locală (comutabile pozitiv/negativ, conform cerinței de izolare a pacienților cu risc infecțios transmisibil sau imunodeprimați, deja stabilită la DTAC cap. 6.4). Camera de izolare TBC se deservește printr-o **AHU exclusivă, cu extracție 100% directă în exterior prin filtru HEPA terminal montat pe traseul de evacuare** (nu la introducere), fără nicio recirculare și fără conectare la sistemul de recuperare de căldură al restului clădirii — execuția separă fizic acest circuit de orice altă rețea de aer a clădirii, astfel încât niciun contaminant din camera de izolare să nu poată ajunge, prin niciun traseu comun, la o altă zonă. Sala de naștere/neonatologie se tratează similar sălii de operație generale (12 schimburi/h, F7+F9+H14, presiune pozitivă), cu atenție particulară la temperatura de introducere (reglabilă 24-26°C, conform necesarului termic al nou-născutului stabilit la DTAC cap. 7.2).

### PTh-I.2.6 Schema electrică IT medical — execuție per sală (Grupa medicală 2)

```
Tablou vital (rețea+GE) ─► Transformator de separare dedicat (5-8 kVA, per sală) ─► Rețea IT flotantă (secundar nelegat la pământ)
                                                                                        │
                                                              Monitor de izolație (IMD) — alarmă tehnică la R_izolație < 50 kΩ
                                                                                        │
                                                        Prize/echipamente sălii de operație/ATI (Grupa 2)
```

Fiecare sală de operație și fiecare post ATI critic primește un transformator de separare **dedicat** (nu partajat între mai multe săli), montat cât mai aproape posibil de sarcină pentru a minimiza capacitatea parazitară a cablului (care ar reduce sensibilitatea IMD-ului la un prim defect real). Monitorul de izolație se conectează la BMS (cap. PTh-I.2.14), pentru ca o alarmă tehnică declanșată la orice oră să ajungă la personalul de mentenanță indiferent de prezența fizică lângă panoul local al sălii. Execuția rețelei IT medicale respectă interdicția strictă de legare accidentală a secundarului la pământ prin orice cale parazitară (ecran de cablu greșit conectat, carcasă metalică nelegată corect la BEP) — verificarea acestei condiții constituie una din probele critice de la PTh-I.5.3.

### PTh-I.2.7 Schema electrică generală — TGD, tablouri, UPS, GE

```
Rețea MT (racord 1) ──┐                                            ┌── UPS on-line dedicat Grupa 2 (≥3h) ──► Tablouri neîntreruptibile ──► Sarcini Grupa 2
                       ├─► AAR ─► Trafo 1 (1.000 kVA) ──┐           │
Rețea MT (racord 2) ──┘                                 ├─► TGD ────┼── Tablouri vital (roșu, rețea+GE) ──► Sarcini Grupa 1 + surse UPS
                       ┌─► AAR ─► Trafo 2 (1.000 kVA) ──┘  (bară    │
Grup electrogen ───────┘                                    dublă  └── Tablouri normale ──► Sarcini neesențiale (primele delestate)
                                                             +cuplă)
```

TGD-ul cu **bară dublă și cuplă** permite alimentarea de la oricare din cele două transformatoare, cu izolarea uneia dintre bare pentru mentenanță fără întreruperea celeilalte, exact schema descrisă conceptual la DTAC cap. 9.5. Grupul electrogen (minimum 800 kVA, cap. DTAC 9.2) se conectează pe o intrare dedicată a TGD, cu logică de delestare automată programată în automatizarea de comutare (AAR + logica de delestare), astfel încât la trecerea pe generator să rămână alimentate exclusiv sarcinile de siguranță și cele vitale, cu deconectarea automată — nu manuală — a consumatorilor neesențiali. Cablurile care alimentează tablourile vital și sarcinile de siguranță (pompe incendiu, ventilatoare de desfumare, iluminat de securitate, ascensor de pompieri) sunt de tip **E90/PH90**, montate pe trasee separate de restul cablării, cu susțineri metalice rezistente la foc pe toată lungimea traseului, conform interfeței cu scenariul PSI (detaliat la PTh-I.10).

### PTh-I.2.8 Schema execuției echipotențializării medicale și a pardoselii conductive (bloc operator/ATI)

```
Bară de echipotențializare locală (BEP local, per sală) ──┬──► Masa de operație (conductor dedicat)
                                                            ├──► Carcase echipamente medicale fixe
                                                            ├──► Rețeaua de împământare funcțională a pardoselii conductive
                                                            ├──► Rame/tocuri metalice uși, grătare ventilație metalice
                                                            └──► Priza de pământ generală a clădirii (Rp≤1Ω, DTAC cap. 11.1)
                                                                  toate conductoarele: rezistență ≤0,2 Ω între oricare 2 puncte
```

**Pardoseala conductivă** a sălilor de operație (element de arhitectură/finisaj — a se vedea trimiterea la PTh-I.11) se execută dintr-un material cu proprietăți conductive de suprafață, aplicat pe un șapă/adeziv conductiv, cu **rețea de bandă de cupru** înglobată în stratul suport, la un interax care asigură continuitatea electrică pe toată suprafața pardoselii, indiferent de eventuale rosturi de dilatare ale finisajului. Această rețea de bandă se conectează, la minimum 2 puncte diametral opuse ale fiecărei săli, la bara de echipotențializare locală (BEP), formând, împreună cu masa de operație și carcasele echipamentelor, un singur sistem echipotențial la care se aplică cerința de rezistență ≤0,2 Ω stabilită la DTAC cap. 9.4.

Rațiunea tehnică a pardoselii conductive, executată aici explicit ca parte a lanțului de echipotențializare (nu ca element decorativ antistatic obișnuit), este dublă: **(a)** disiparea controlată a sarcinilor electrostatice acumulate de personal, de cărucioarele/echipamentele mobile și de eventualele scurgeri de gaze anestezice inflamabile reziduale — o descărcare electrostatică necontrolată în prezența unor concentrații reziduale de agenți anestezici (deși practica modernă a redus semnificativ utilizarea agenților inhalatori inflamabili, riscul rezidual la manipularea recipientelor sau la o eventuală scurgere accidentală rămâne o ipoteză de proiectare conservatoare) constituie un risc de aprindere; **(b)** menținerea unui potențial electric uniform pe toată suprafața sălii, astfel încât niciun punct al pardoselii pe care calcă personalul sau pe care este poziționat echipamentul mobil să nu prezinte o diferență de potențial relevantă față de masa de operație sau față de carcasele conectate la BEP — completând, la nivelul pardoselii, exact același obiectiv de siguranță împotriva microșocului descris la DTAC cap. 9.4 pentru echipamentele fixe.

**Pragul de rezistivitate al pardoselii propriu-zise** (rezistența măsurată punct-la-punct pe suprafața finisajului, distinctă de rezistența rețelei de echipotențializare de mai sus, care are propriul prag normativ de ≤0,2 Ω): standardul românesc HD 60364-7-710 citat integral în DTAC nu prescrie explicit o valoare de rezistivitate proprie a materialului de pardoseală conductivă — pentru acest parametru se adoptă, ca **reper tehnic uzual internațional** (semnalat explicit ca atare, fără a fi confundat cu o cerință legală românească), intervalul de **2,5×10⁴…1×10⁶ Ω**, folosit comparativ în practica de execuție a pardoselilor conductive de spital (metodologie de măsurare conform IEC 61340-4-1) — un interval suficient de jos pentru a permite disiparea sarcinilor electrostatice, dar suficient de ridicat pentru a nu constitui, el însuși, un risc de electrocutare la contact direct cu o sursă de tensiune. Măsurarea efectivă la recepție se face conform PTh-I.5.4.

### PTh-I.2.9 Schema apei tratate pentru utilizări medicale speciale — buclă inox 316L

```
Apă potabilă (branșament) ─► Osmoză inversă (RO) treapta 1 ─┬─► + Deionizare (DI) ─► Sterilizare centrală (<5 µS/cm, 1,5 mc/h)
                                                              ├─► + Electrodeionizare (EDI) + UV ─► Laborator (<0,1 µS/cm, 0,3 mc/h)
                                                              ├─► RO treapta 2 (osmoză dublă) ─► Dializă (0,8 mc/h)
                                                              └─► + UV ─► Umidificatoare AHU zone critice (abur igienic)
                                                                    toate din bucla inox 316L, circulație continuă, fără brațe moarte
```

Bucla de distribuție a apei tratate se execută integral din **oțel inoxidabil austenitic AISI 316L**, cu retur permanent către instalația de tratare (fără segmente terminale needucate la circulație), conform justificării microbiologice complete deja tratate la DTAC cap. 4.5: apa tratată, lipsită de clor rezidual, este mai vulnerabilă la formarea de biofilm decât apa potabilă, iar orice braț mort ar deveni, în câteva zile, un focar greu de eradicat.

### PTh-I.2.10 Schema canalizării — patru rețele separate, bazine de decădere radioactivă

```
Grup sanitar/bucătărie (curat)   ──► Canalizare menajeră ──────────────────────► colector public
Laborator microbiologie/morgă    ──► Canalizare infecțioasă ──► stație decontaminare (termică/chimică) ──► colector menajer
Medicină nucleară (dacă aplicabil)──► Canalizare radioactivă ──► 2 bazine de decădere alternante (≥80 zile, I-131) ──► verificare radioactivitate ──► colector public
Bucătărie (grasă)                ──► Canalizare tehnologică ──► separator de grăsimi ──► colector menajer
Terasă/platforme                 ──► Canalizare pluvială ──────────────────────► receptor separat (fără amestec cu cele de mai sus)
```

**Bazinele de decădere radioactivă**, dacă unitatea include o componentă de medicină nucleară (conform DTAC cap. 5.3), se execută în minimum două compartimente alternante — unul în umplere, celălalt în așteptarea perioadei de decădere de minimum 10 timpi de înjumătățire (80 de zile pentru I-131, T½=8 zile) — cu instrumentare de monitorizare a radioactivității reziduale montată pe conducta de evacuare finală, interblocată cu o vană automată care nu permite deversarea către colectorul public decât după confirmarea directă, prin măsurătoare, că nivelul rezidual se situează sub pragul de exceptare reglementat (nu doar pe baza calculului teoretic al curbei de decădere).

### PTh-I.2.11 Schema instalației termice — execuție diferențiată pe zone

Execuția distribuției termice reia diferențierea de regim stabilită la DTAC cap. 7.3: butelie de egalizare la ieșirea din cele 2 cazane (N+1, 2×550 kW), circuite AHU în regim 75/60°C, circuite radiatoare/ventiloconvectoare zone non-critice în regim 55/45°C, pardoseală radiantă la pediatrie. **Execuția explicită a interdicției de corpuri statice de încălzire în bloc operator/ATI** — nu se montează niciun radiator sau ventiloconvector în interiorul acestor încăperi; toate coloanele de distribuție termică traversează zona critică exclusiv prin tavanul tehnic, fără derivații vizibile în interiorul sălii, iar întregul necesar termic al încăperii este preluat de bateriile de încălzire/răcire ale AHU dedicate (cap. PTh-I.2.4-5).

### PTh-I.2.12 Schema compartimentării la foc a instalațiilor — clapete antifoc, etanșări RF, cabluri E90

```
Element de compartimentare REI (perete/planșeu între compartimente) ─┬─► Tubulatură ventilare ─► Clapetă antifoc (EI conform elementului) + actuator
                                                                        ├─► Conducte (apă, gaze medicale, apă tratată) ─► Manșon/mastic intumescent (EI conform elementului)
                                                                        ├─► Fascicule cabluri electrice normale ─► Pernă/mastic + vopsea termospumantă (EI conform elementului)
                                                                        └─► Cabluri E90/PH90 (sarcini de siguranță) ─► traseu dedicat, cu suporturi metalice rezistente la foc pe toată lungimea
```

Fiecare traversare de tubulatură de ventilare printr-un element de compartimentare rezistent la foc (între secții de spitalizare, între bloc operator și restul etajului 1, între subsolul tehnic și parcaj) este echipată cu o **clapetă antifoc** dimensionată la clasa de rezistență a elementului traversat, cu actuator termoelectric și, la zonele integrate cu IDSAI, cu comandă suplimentară de la centrala de detecție. Poziționarea clapetelor se coordonează explicit cu proiectul de compartimentare rezultat din scenariul de securitate la incendiu (evacuare orizontală pe minimum două sectoare per etaj, DTAC cap. 14.1) — fiecare compartiment orizontal de evacuare are, la limitele sale, clapete antifoc pe toate traversările de ventilare, indiferent dacă traseul de aer aparține unei zone critice sau unei zone generale.

**Punctul de coordonare critic, semnalat explicit ca atare**: clapetele antifoc, prin natura lor (închidere completă a secțiunii de trecere a aerului la semnalul de incendiu), **întrerup local circulația de aer** exact pe traseul care menține cascada de presiuni a zonelor aseptice (PTh-I.2.4). Poziționarea clapetelor se stabilește astfel încât închiderea lor, la un eveniment de incendiu confirmat într-un compartiment adiacent, să nu compromită presurizarea sălii de operație aflate, eventual, în mijlocul unei intervenții în compartimentul neafectat — soluția adoptată este amplasarea clapetelor la limita fiecărui compartiment de fum, cu AHU-uri dedicate per sală (deja independente unele de altele, cap. PTh-I.2.4), astfel încât închiderea unei clapete pe traseul unui compartiment afectat de incendiu nu implică nicio conductă comună cu AHU-ul unei săli aflate în alt compartiment. Această coordonare se detaliază integral la PTh-I.10.3, cu trimitere la scenariul de securitate la incendiu pentru logica de detecție/comandă propriu-zisă.

Toate traversările de conducte (apă, gaze medicale, apă tratată, canalizare) prin elemente de compartimentare se etanșează cu **sisteme certificate de rezistență la foc egală cu a elementului străbătut** — manșon sau mastic intumescent la conducte metalice/plastice, pernă sau mastic termospumant la fascicule de cabluri. Cablurile care alimentează sarcinile de siguranță (pompe de incendiu, ventilatoare de desfumare, iluminat de securitate, ascensorul de pompieri, tabloul vital al gazelor medicale și al nurse-call) sunt de tip **E90/PH90**, care își mențin funcționalitatea electrică timp de minimum 90 de minute chiar în condiții de incendiu direct pe traseul cablului — garantând că sarcinile critice rămân alimentate exact în intervalul necesar desfășurării complete a evacuării orizontale progresive descrise în DTAC.

### PTh-I.2.13 Schema PSI a instalațiilor — sprinklere, excepții cu gaz, hidranți

```
Rezervor 2×180 mc + rezervă PSI 252 mc ─► Cameră pompe (electropompă + pompă Diesel + pompă jockey)
   ─► Colector refulare ─┬─► Sprinklere (saloane, coridoare, administrativ) — densitate 5 mm/min pe 216 mp, ~30 l/s
                          └─► Hidranți interiori (2 jeturi×2,5 l/s/nivel) + exteriori (3×5 l/s)

Zone cu excepție de la sprinklere (protecție prin gaz, DTAC cap. 12.2):
  Săli de operație ──► detecție + gaz inert IG-55
  RMN ──► detecție aspirativă + quench de urgență dedicat magnetului
  CT/RX/angiograf ──► detecție + gaz FK-5-1-12 sau IG-55
  Servere ──► detecție aspirativă VESDA + gaz
  Tablouri electrice ──► gaz (nu apă)
```

Execuția rețelei de sprinklere în zonele generale (saloane, coridoare, spații administrative) urmează dimensionarea hidraulică stabilită la DTAC (densitate 5 mm/min pe suprafața de calcul de 216 mp, debit ~30 l/s), cu grup de pompare compus din electropompă principală, pompă Diesel de rezervă (sursă de energie independentă de rețeaua electrică generală) și pompă jockey (menținere presiune de linie, evitând pornirile inutile ale pompelor principale). În zonele cu excepție, rețeaua de conducte de gaz de stingere (IG-55/FK-5-1-12) se execută complet separat de rețeaua de sprinklere, cu duze de descărcare dimensionate pentru volumul net al fiecărei încăperi protejate și cu interblocare a ușilor/clapetelor de ventilare a încăperii, pentru menținerea concentrației de stingere pe durata necesară.

### PTh-I.2.14 Schema curenților slabi medicali — nurse call, RIS/PACS, BMS, IDSAI

```
Buton apel pat + pară + cordon baie ─► Terminal cameră + Lampă hol ─► Server nurse call ─► Afișaj centralizat (nurse station, prioritizat)
                                                                                              │
                                                              alimentare din tabloul vital (rețea+GE), independent de restul curenților slabi

Echipamente imagistică (RX/CT/RMN) ─► rețea locală ─► Backbone fibră 10 Gbps (inel redundant) ─► Arhivă PACS + stații diagnostic radiologi

Senzori presiune cascadă + temperatură ACM + stare surse electrice + alarme gaze medicale ─► BMS ─► Dispecerat tehnic + alarme pe 3 niveluri (gaze)

Detectoare incendiu (buclă adresabilă închisă) + VESDA (imagistică/servere/arhivă) ─► Centrală IDSAI ─► matrice cauză-efect (clapete, desfumare, control acces, evacuare vocală)
```

Execuția cablării RIS/PACS se realizează pe **cablare structurată categorie 6A**, cu **VLAN medical dedicat** (segregare logică de traficul administrativ), pe un backbone de fibră optică de minimum 10 Gbps în **topologie de inel** — nu liniară — astfel încât o defecțiune pe un singur segment de fibră să nu izoleze niciun punct al rețelei. Rețeaua BMS se execută pe trasee separate de cablarea IT administrativă, cu puncte de monitorizare la fiecare senzor de presiune de cascadă (PTh-I.2.4), la fiecare senzor de temperatură a buclei antilegionella (DTAC cap. 3.6) și la fiecare alarmă de gaze medicale (PTh-I.2.3), centralizate într-un dispecerat tehnic cu personal permanent.

### PTh-I.2.15 Schema de execuție a desfumării — case de scări presurizate, coridoare F400

```
Casa scării de evacuare ─► Ventilator de presurizare dedicat ─► comandă de la centrala IDSAI (la incendiu confirmat)
Coridor principal de secție ─► Ventilator desfumare F400 ─► alimentare din tabloul vital ─► pornire la comanda IDSAI
```

Ventilatoarele de desfumare a coridoarelor principale se dimensionează la clasa **F400** (rezistență la 400°C pentru un interval minim garantat, conform DTAC cap. 12.5), cu alimentare din tabloul vital pe cablu E90/PH90, susținută pe traseu dedicat conform PTh-I.2.12. Casele de scări de evacuare se presurizează prin ventilatoare separate de circuitul de desfumare a coridoarelor, comandate independent de la centrala de detecție, astfel încât o defecțiune la un ventilator de coridor să nu compromită presurizarea căii de evacuare verticale.

---

## PTh-I.3 Breviar complet de calcul

### PTh-I.3.1 Calcul hidraulic — rețeaua de oxigen, nod cu nod

Reluând debitul de calcul stabilit la DTAC (Q_O2 = 2.040 l/min ≈ 34 l/s la vârf absolut, rezultat din 300 l/min săli operație + 600 l/min ATI + 900 l/min saloane + 240 l/min naștere), dimensionarea coloanei principale și a derivațiilor pe niveluri se face prin repartizarea acestui debit pe ramurile reale ale rețelei:

| Tronson | Debit alocat (l/min) | Diametru adoptat | Viteză rezultată | Cădere de presiune admisă |
|---|---|---|---|---|
| Coloană principală (subsol→et.1) | 2.040 | Cu 42×1,5 | ≤8 m/s (uzual gaze medicale) | ≤0,3 bar pe traseu complet |
| Derivație bloc operator (et.1) | 300 | Cu 22×1,0 | — | — |
| Derivație ATI (et.1) | 600 | Cu 28×1,0 | — | — |
| Coloană verticală spitalizare (et.2-4) | 900 (300/etaj) | Cu 22×1,0 | — | — |
| Derivație naștere | 240 | Cu 18×1,0 | — | — |

Presiunea de regim la fiecare priză terminală (4-5 bar, conform codului DTAC cap. 6.2) se verifică la cel mai defavorabil punct al rețelei (priza cea mai îndepărtată de sursă, etajul 4) prin însumarea căderilor de presiune pe fiecare tronson traversat, cu marjă suficientă păstrată de sursa reglată la ieșirea din stație (VIE + rampă automată) pentru a acoperi și cea mai defavorabilă configurație de consum simultan.

### PTh-I.3.2 Calcul hidraulic — rețelele AIR-4, AIR-8, VAC, N₂O, CO₂, AGSS

Aceeași metodă de repartizare pe tronsoane se aplică celorlalte rețele de gaze, la debitele de referință deja stabilite în DTAC: AIR-4 (compresoare oil-free 2A+1R, rezervor tampon 2×1.000 l), AIR-8 (numai bloc operator, 7-8 bar), vacuum (~40 mc/h, pompe duplex-triplex), N₂O și CO₂ (rampe duble). Diametrele de execuție se dimensionează astfel încât viteza pe conductă să rămână în intervalul tehnic uzual pentru rețele de gaze medicale (evitarea vitezelor excesive care ar genera zgomot și uzură prematură a componentelor, precum și a vitezelor prea reduse care ar supradimensiona inutil rețeaua), cu cădere de presiune totală verificată la punctul cel mai defavorabil al fiecărei rețele — sălile de operație pentru AIR-8/N₂O/CO₂ (toate cele 7 tipuri de gaz simultan la fiecare post de anestezie, conform PTh-I.2.2), etajul 4 pentru VAC și AIR-4 (coloanele cele mai lungi).

### PTh-I.3.3 Verificare autonomie surse și timpi de comutare

| Sursă | Autonomie/timp de comutare de calcul | Verificare |
|---|---|---|
| VIE oxigen (5.000 l lichid, raport expansiune ≈860) | ≈34 h la debitul de vârf (2.040 l/min) | ✓ superior oricărui interval realist de intervenție/realimentare |
| Rampă automată butelii O₂ | comutare la scădere de presiune, fără întrerupere perceptibilă | verificată la PIF (PTh-I.7.3) |
| Rampă backup manuală O₂ | funcțională independent de sursa electrică | verificare funcțională periodică (mentenanță) |
| UPS Grupa 2 | ≥3 h la sarcina completă a sălilor de operație+ATI | verificat la comisionare, cu test sub sarcină reală |
| Grup electrogen | comutare ≤15 s, autonomie combustibil 24-48 h | test funcțional la PIF |

### PTh-I.3.4 Breviar de debite de aer — verificare pe fiecare sală/post critic

Debitul de aer introdus în fiecare sală de operație se calculează din numărul de schimburi de aer pe oră (20-25/h, DTAC cap. 8.3) aplicat volumului net al încăperii, cu verificarea separată a debitului necesar fluxului laminar (secțiunea plafonului 3,2×3,2 m × viteza 0,25-0,35 m/s ≈ 0,82-1,15 mc/s ≈ 2.950-4.140 mc/h numai pe zona de flux laminar, suplimentar debitului general de introducere/extracție a restului sălii). Suma celor două componente (flux laminar zonal + ventilare generală a restului încăperii) constituie debitul de proiect al AHU dedicate fiecărei săli, verificat la reglajul aeraulic din comisionare (PTh-I.7.2).

Pentru ATI (10-12 schimburi/h pe volumul net al saloanelor ATI) și pentru zonele de spitalizare (6 schimburi/h saloane standard, 12 schimburi/h saloane imunodeprimați), debitele se calculează similar, pe volumul net al fiecărei încăperi din planurile de arhitectură (a se vedea trimiterea la PTh-I.11 pentru coordonarea suprafețelor exacte).

### PTh-I.3.5 Calcul cascadei de presiuni — verificarea raportului debit introdus/debit extras

Menținerea unei diferențe de presiune constante între două încăperi adiacente (de exemplu, +15 Pa sală operație față de filtru) se realizează prin proiectarea unui **exces de debit introdus față de debit extras** din încăperea la presiune mai ridicată, exces care se scurge controlat prin rostul ușii/prin grătarele de transfer către încăperea adiacentă. Verificarea de calcul se face prin ecuația de continuitate aplicată fiecărei încăperi din lanțul de cascadă (sală → filtru → coridor curat → coridor general), cu debitul de transfer dintre două zone adiacente dimensionat pentru a menține diferența de presiune de proiect la o rezistență aerodinamică estimată a rostului ușii — valoarea exactă a excesului de debit pe fiecare interfață se stabilește la faza de execuție prin măsurători directe la comisionare (PTh-I.5.2), calculul de proiect servind drept punct de plecare pentru reglaj, nu drept valoare finală fixă (rezistența reală a rosturilor executate variază ușor față de ipoteza de calcul).

### PTh-I.3.6 Calcul electric — verificarea rezistenței de izolație a rețelei IT medical

Rezistența de izolație a rețelei IT flotante (secundar transformator de separare, cap. PTh-I.2.6) se verifică astfel încât, la un prim defect de izolație, curentul rezidual capacitiv al rețelei să rămână sub pragul de declanșare a protecției de supracurent — condiție garantată prin dimensionarea capacității parazitare totale a rețelei (funcție de lungimea de cablu conectată la fiecare transformator de separare, motiv pentru care se limitează numărul de prize alimentate de la un singur transformator dedicat) și confirmată prin măsurarea directă a rezistenței de izolație la comisionare (PTh-I.5.3), cu pragul de alarmă a monitorului de izolație (IMD) fixat la <50 kΩ, conform DTAC cap. 9.3.

### PTh-I.3.7 Calcul rezistenței egalizării de potențial și a pardoselii conductive

Rezistența măsurată între oricare două puncte accesibile simultan pacientului în interiorul sălii de operație/ATI (masa de operație, carcasă echipament, priză de pardoseală conductivă) trebuie să rezulte ≤0,2 Ω, conform pragului stabilit la DTAC cap. 9.4, justificat de pragul de curent de risc intracardiac (10-100 µA, de trei ordine de mărime sub pragul de risc prin contact cutanat obișnuit). Execuția rețelei de conductoare de echipotențializare (secțiune minimă a conductoarelor, dimensionată pentru a menține rezistența sub prag chiar la lungimile maxime ale sălilor de operație de referință) se verifică prin măsurarea directă, punct cu punct, la comisionare (PTh-I.5.4).

### PTh-I.3.8 Calcul hidraulic — apă rece, tronsoane reprezentative

Reluând debitul instantaneu de calcul stabilit la DTAC (qc ≈ 17,3 l/s, ΣE≈620) și presiunea necesară la etajul 4 (H_nec ≈ 42,1 mCA), dimensionarea coloanelor pe fiecare nucleu funcțional (bloc operator/ATI, fiecare etaj de spitalizare, zona tehnică) se face prin repartizarea echivalenților de debit pe fiecare ramură, cu verificarea vitezei de curgere în intervalul uzual 1,0-2,0 m/s pe coloanele principale (pentru evitarea zgomotului hidraulic și a eroziunii premature) și cu pierderi de sarcină liniare/locale recalculate pe traseul real din piesele desenate de execuție, comparate cu ipoteza acoperitoare (8,5 m liniare + 3,0 m locale) din DTAC.

### PTh-I.3.9 Calcul hidraulic — canalizare, verificare grad de umplere

Coloanele de canalizare menajeră a saloanelor și a zonelor clinice se verifică la gradul de umplere admis (h/D ≤ 0,7 pentru coloane verticale) la debitul instantaneu de calcul stabilit în DTAC (qc,canal ≈ 19,3 l/s), cu pantele orizontale ale colectoarelor dimensionate pentru autocurățare (viteză minimă de autocurățare atinsă la debitul de calcul, evitarea depunerilor pe traseele orizontale lungi ale etajelor de spitalizare).

### PTh-I.3.10 Verificare volum bazine de decădere radioactivă (dacă aplicabil)

Dacă programul funcțional confirmă o componentă de medicină nucleară, volumul util al fiecărui bazin de decădere se dimensionează din produsul debitului zilnic estimat al secției (număr de pacienți/zi × volum de urină estimat cu activitate reziduală) și perioada de rezidență hidraulică minimă de 80 de zile (10×T½ pentru I-131, conform principiului fizic detaliat integral în DTAC cap. 5.3), cu doi timpi de rezidență paraleli (bazine alternante) pentru a nu întrerupe colectarea în timp ce un bazin este în așteptare de decădere.

### PTh-I.3.11 Verificare curent de pornire — electropompă principală incendiu

Pornirea electropompei principale de incendiu (putere de ordinul 75-90 kW, funcție de curba hidraulică adoptată la stația de pompare) se verifică la curentul de pornire (5-7×In pentru pornire directă, redus prin pornire stea-triunghi sau soft-starter dacă necesar) și la căderea de tensiune tranzitorie asupra restului tabloului vital — pornirea pompei de incendiu, eveniment care survine tipic simultan cu un scenariu de incendiu deja activ, nu trebuie să provoace o cădere de tensiune care ar afecta funcționarea altor sarcini vitale alimentate din același tablou (gaze medicale, UPS Grupa 2, nurse-call).

### PTh-I.3.12 Breviar de coordonare interdisciplinară — goluri de trecere prin structură

Traseele verticale principale (ghene tehnice) se verifică pentru rezerva de capacitate necesară tuturor rețelelor descrise (gaze medicale — ghenă dedicată, fără proximitate cu instalații electrice neprotejate; apă/apă tratată/canalizare; electrice tari/slabi; ventilare), cu goluri de trecere prin planșee și pereți structurali dimensionate și poziționate în coordonare directă cu memoriul de rezistență (`structura.md`), pentru a nu afecta elementele de rezistență dimensionate pentru clasa de importanță și expunere seismică I (γI=1,40). Poziția exactă a golurilor se transmite structurii înainte de execuția planșeelor, nu ca modificare ulterioară.

---

## PTh-I.4 Specificații complete echipamente majore

### PTh-I.4.1 Fișă tehnică — Vaporizator de incintă criogenic (VIE) oxigen

| Parametru | Valoare |
|---|---|
| Capacitate stocare | 5.000 l oxigen lichid |
| Vaporizatoare | duble, atmosferice |
| Autonomie la debit de vârf (2.040 l/min) | ≈34 h |
| Presiune de ieșire reglată | 4-5 bar |
| Alimentare monitorizare/comutare | tablou vital |
| Amplasare | stație gaze medicale, subsol, compartiment RF dedicat |

### PTh-I.4.2 Fișă tehnică — Rampă automată butelii oxigen (rezervă)

| Parametru | Valoare |
|---|---|
| Comutare | automată, la scădere de presiune pe sursa principală |
| Capacitate | conform necesar de acoperire tranzitorie până la intervenție |
| Detectoare de nivel/presiune | pe fiecare bloc de butelii |

### PTh-I.4.3 Fișă tehnică — Rampă backup manuală + prize NIST de urgență

| Parametru | Valoare |
|---|---|
| Funcționare | independentă de orice sursă electrică |
| Rol | ultimă linie de apărare (avarie simultană surse 1+2) |
| Amplasare | acces direct din stația tehnică, semnalizat |

### PTh-I.4.4 Fișă tehnică — Stație compresoare aer medical (AIR-4) oil-free

| Parametru | Valoare |
|---|---|
| Configurație | triplex, 2 active + 1 rezervă (N+1) |
| Tip | oil-free (fără ulei în contact cu aerul comprimat) |
| Uscare | adsorbție, punct de rouă <−40°C |
| Filtrare | 0,01 µm + carbon activ + bacteriologic terminal |
| Rezervor tampon | 2×1.000 l |
| Monitorizare | CO, CO₂, conținut rezidual ulei, alarmă automată |

### PTh-I.4.5 Fișă tehnică — Stație pompe vacuum medical

| Parametru | Valoare |
|---|---|
| Configurație | duplex-triplex (N+1) |
| Presiune de regim | −0,6…−0,9 bar |
| Filtre | bacteriologice, pe traseul de aspirație |
| Debit de calcul | ≈40 mc/h |

### PTh-I.4.6 Fișă tehnică — Unitate AGSS (evacuare gaze anestezice reziduale)

| Parametru | Valoare |
|---|---|
| Tip | vacuum dedicat, complet separat de vacuumul chirurgical |
| Evacuare | direct în exterior, fără interconectare |
| Puncte de captare | la fiecare post de anestezie și sas de dezechipare |

### PTh-I.4.7 Fișă tehnică — AHU dedicată sală de operație (1 din 3, tip referință)

| Parametru | Valoare |
|---|---|
| Deservire | 1 sală de operație, exclusiv |
| Filtrare | F7 + F9 + HEPA H14 terminal |
| Schimburi de aer | 20-25/h (aseptică) |
| Presiune menținută | +15 Pa |
| Ventilatoare | duble (introducere și extracție) |
| Umidificare | abur igienic din apă tratată |
| Recuperare de căldură | circuit intermediar cu glicol, separare fizică totală |

### PTh-I.4.8 Fișă tehnică — Plafon de flux laminar (LAF) HEPA H14

| Parametru | Valoare |
|---|---|
| Dimensiune panou | ≈3,2×3,2 m |
| Viteză de flux | 0,25-0,35 m/s |
| Eficiență filtrare | ≥99,995% la 0,3 µm (MPPS) |
| Zonă rezultată | ISO 5 (sub flux) / ISO 7 (restul sălii) |
| Test de acceptanță | DOP/PAO, scanare 100% suprafață + garnitură |

### PTh-I.4.9 Fișă tehnică — Filtru HEPA H13 terminal (ATI, sterilizare curată)

| Parametru | Valoare |
|---|---|
| Eficiență | ≥99,95% (H13) |
| Montaj | terminal, la difuzorul de introducere |
| Test de acceptanță | DOP/PAO |

### PTh-I.4.10 Fișă tehnică — Transformator de separare medicală (IT medical)

| Parametru | Valoare |
|---|---|
| Putere | 5-8 kVA/sală |
| Secundar | flotant (nelegat la pământ) |
| Montaj | cât mai aproape de sarcină, per sală |

### PTh-I.4.11 Fișă tehnică — Monitor de izolație (IMD)

| Parametru | Valoare |
|---|---|
| Funcție | măsurare continuă rezistență de izolație rețea IT |
| Prag de alarmă | <50 kΩ |
| Semnalizare | local + BMS |

### PTh-I.4.12 Fișă tehnică — UPS on-line dedicat Grupa 2

| Parametru | Valoare |
|---|---|
| Tip | on-line (dublă conversie, fără comutare mecanică) |
| Timp de comutare | ≤0,5 s (percepție zero pentru sarcină) |
| Autonomie | ≥3 h |
| Deservire | bloc operator, ATI, imagistică critică, servere medicale, alarme gaze medicale, nurse-call |

### PTh-I.4.13 Fișă tehnică — Grup electrogen de rezervă

| Parametru | Valoare |
|---|---|
| Putere | ≥800 kVA |
| Timp de comutare (AAR) | ≤15 s |
| Autonomie combustibil | 24-48 h |
| Configurație | N+1 |

### PTh-I.4.14 Fișă tehnică — Post de transformare MT/JT (1 din 2)

| Parametru | Valoare |
|---|---|
| Putere unitară | 1.000 kVA |
| Configurație | 2 posturi, comutare automată (AAR) |
| Racord | dublu, medie tensiune |

### PTh-I.4.15 Fișă tehnică — Boiler ACM (1 din 2)

| Parametru | Valoare |
|---|---|
| Volum unitar | 3.000 l |
| Material | inox 316L |
| Configurație | N+1 (2 unități) |
| Regim antilegionella | stocare ≥60°C, șoc termic ≥70°C/3 min |

### PTh-I.4.16 Fișă tehnică — Stație tratare apă demineralizată (sterilizare)

| Parametru | Valoare |
|---|---|
| Proces | osmoză inversă + deionizare |
| Conductivitate rezultată | <5 µS/cm |
| Debit | 1,5 mc/h |

### PTh-I.4.17 Fișă tehnică — Stație apă ultrapură (laborator)

| Parametru | Valoare |
|---|---|
| Proces | RO + electrodeionizare (EDI) + UV |
| Conductivitate rezultată | <0,1 µS/cm |
| Debit | 0,3 mc/h |

### PTh-I.4.18 Fișă tehnică — Electropompă principală incendiu

| Parametru | Valoare |
|---|---|
| Putere estimată | 75-90 kW (verificare finală la selecția curbei hidraulice) |
| Alimentare | tablou vital |
| Pornire | directă/soft-starter, verificată la PTh-I.3.11 |

### PTh-I.4.19 Fișă tehnică — Pompă Diesel rezervă incendiu

| Parametru | Valoare |
|---|---|
| Funcție | rezervă independentă de sursa electrică |
| Pornire | automată, la scădere de presiune fără răspuns electropompă |

### PTh-I.4.20 Fișă tehnică — Centrală IDSAI adresabilă

| Parametru | Valoare |
|---|---|
| Tip buclă | adresabilă, închisă (redundantă) |
| Acoperire specială | VESDA la imagistică, servere, arhivă |
| Interfață | matrice cauză-efect completă (clapete, desfumare, control acces, evacuare vocală, electrovalvă gaz) |

### PTh-I.4.21 Fișă tehnică — Sistem de stingere cu gaz inert IG-55 (bloc operator)

| Parametru | Valoare |
|---|---|
| Agent | amestec inert (azot+argon) |
| Principiu | reducere concentrație O₂ sub prag combustie |
| Compatibilitate | fără reziduu, fără udare echipament electric activ |

### PTh-I.4.22 Fișă tehnică — Sistem nurse-call

| Parametru | Valoare |
|---|---|
| Componente | buton fix + pară + cordon baie |
| Semnalizare | terminal cameră + lampă hol + afișaj centralizat prioritizat |
| ATI | comunicare vocală bidirecțională |
| Alimentare | tablou vital |

### PTh-I.4.23 Fișă tehnică — Rack RIS/PACS și backbone de date

| Parametru | Valoare |
|---|---|
| Backbone | fibră optică ≥10 Gbps, topologie inel redundant |
| Cablare orizontală | categorie 6A |
| Segregare | VLAN medical dedicat |
| Centru de date | 2 camere redundante, alimentare UPS+GE, stingere gaz |

---

## PTh-I.5 Probe și verificări detaliate — Planul de probe și lucrări de acceptare (PVLA)

Prezentul capitol consolidează, pe fiecare disciplină, **toate probele obligatorii înainte de recepție și de punerea în funcțiune clinică a instalațiilor**, ordonate logic de la probele de bază (electrice, sanitare, HVAC generale) către probele critice specifice unei clădiri medicale (gaze medicale, camere sterile), fiecare cu toleranța de acceptare aplicabilă. Unde normativul românesc citat în DTAC (SR EN ISO 7396-1, SR EN ISO 14644, HD 60364-7-710) nu prescrie explicit o valoare numerică de toleranță, se adoptă intervalul tehnic uzual internațional recunoscut, **etichetat explicit ca atare** — niciodată prezentat drept literă de lege românească.

### PTh-I.5.1 Probele obligatorii ale instalației de gaze medicale (SR EN ISO 7396-1) — detaliu complet

Punerea în funcțiune a rețelei de gaze medicale este faza determinantă cea mai critică a întregului proiect de instalații și se execută în secvența următoare, cu proces-verbal de probă (PVLA) semnat pe fiecare etapă, pe fiecare zonă/etaj:

**1. Proba de rezistență mecanică (presiune).** Fiecare tronson al rețelei se supune unei presiuni de probă superioare presiunii de regim (interval tehnic uzual: 1,5× presiunea maximă de regim a gazului respectiv, menținută minimum 24 de ore fără scădere), executată **înainte de conectarea oricărei prize terminale sau a oricărui echipament sensibil** — proba se face pe conducta goală, cu capete oarbe la toate punctele terminale, folosind aer sau azot uscat (niciodată apă, care ar contamina interiorul rețelei de oxigen). Se verifică absența oricărei scăderi de presiune pe durata probei, semn al unei sudura/brazuri defectuoase.

**2. Proba de etanșeitate.** După confirmarea rezistenței mecanice, se execută proba de etanșeitate propriu-zisă, la presiunea de regim a fiecărui gaz, cu verificare punct cu punct a tuturor îmbinărilor (soluție de detectare a scurgerilor, fără flacără deschisă, pe toate brazurile și pe toate racordurile cutiilor de zonă). Criteriul de admisie: absența oricărei bule/scurgeri detectabile pe durata de observare (interval tehnic uzual: minimum 30 de minute per zonă, cu presiune menținută constant).

**3. Proba de identitate a gazului la fiecare priză terminală (cross-connection test).** Aceasta este **cea mai critică probă a întregii puneri în funcțiune**, dat fiind riscul discutat la DTAC cap. 6.2: se verifică, priză cu priză, la fiecare punct de utilizare al clădirii (fiecare pat ATI, fiecare post de anestezie, fiecare salon), că gazul livrat efectiv corespunde exact etichetei și profilului mecanic al prizei — testul se execută prin alimentarea, pe rând, a fiecărei rețele cu presiune de test și verificarea, la toate prizele instalate, că **numai** priza etichetată pentru acel gaz reacționează la presiunea de test, în timp ce toate celelalte prize rămân la zero. Se întocmește un proces-verbal individual pentru fiecare priză a clădirii, fără excepție, semnat de executant și verificat de un al doilea tehnician independent (verificare încrucișată, nu autoverificare).

**4. Proba de puritate a aerului medical.** Aerul produs de stația de compresoare oil-free (PTh-I.4.4) se analizează pentru conținutul de ulei rezidual, CO, CO₂ și punct de rouă, cu compararea rezultatelor față de pragurile de monitorizare continuă deja stabilite în DTAC (alarmă automată la depășire) — proba de recepție confirmă funcționarea corectă a lanțului uscător+filtrare înainte de prima utilizare clinică a rețelei.

**5. Verificarea funcțională a comutării automate a surselor de rezervă.** Se simulează, controlat, scăderea de presiune pe sursa principală de oxigen (izolarea temporară a VIE) și se cronometrează comutarea automată pe rampa de butelii, verificând absența oricărei întreruperi perceptibile la priza terminală (manometru de test montat la priza cea mai defavorabilă). Se repetă simularea pentru fiecare sursă redundantă a fiecărui gaz (AIR-4, vacuum, N₂O, CO₂).

**6. Verificarea funcțională a sistemului de alarmare pe cele trei niveluri.** Pentru fiecare gaz și fiecare zonă, se simulează o cădere de presiune și se confirmă recepția alarmei la toate cele trei niveluri: panoul operațional (stație sursă), panoul clinic (nurse station al zonei afectate) și panoul de urgență (sas bloc operator, dacă zona testată deservește blocul operator) — cu verificarea suplimentară că alarma rămâne funcțională și la simularea unei pene electrice generale (alimentare din UPS, cap. PTh-I.2.3).

**7. Debite și presiuni de regim.** Se măsoară, la fiecare priză terminală reprezentativă (minimum una din fiecare cutie de zonă), debitul și presiunea de regim livrate, confirmând conformitatea cu valorile de proiect stabilite în DTAC (4-5 bar O₂/AIR-4/N₂O/CO₂, 7-8 bar AIR-8, −0,6…−0,9 bar VAC).

Toate cele șapte etape se consemnează în **procese-verbale de probă (PVLA)**, organizate pe fiecare zonă/etaj/gaz, semnate de proiectantul de specialitate, de executant și verificate de verificatorul atestat pe cerința Is — documentația completă a acestor PVLA constituie condiție obligatorie pentru fazele determinante ale Planului de Control al Calității (PTh-I.8) și, ulterior, pentru obținerea autorizației sanitare de funcționare.

### PTh-I.5.2 Comisionarea completă a sălilor sterile/sălilor de operație — protocol de acceptanță

Comisionarea unei săli de operație aseptice sau a unei zone cu clasă de puritate declarată (ATI, sterilizare curată, naștere/neonatologie) urmează o secvență de teste instrumentale, distinctă și superioară verificării vizuale a sensului fluxului de aer:

**1. Măsurarea numărului de schimburi de aer pe oră.** Se măsoară debitul real de aer introdus la fiecare difuzor al încăperii (anemometru cu balon sau debitmetru cu paletă) și se raportează la volumul net al încăperii, confirmând atingerea a minimum 20-25 schimburi/h la sala de operație aseptică (conform DTAC cap. 8.3), cu abatere admisă în intervalul tehnic uzual de reglaj aeraulic (±10-15% față de valoarea de proiect, valoare comparabilă practicii consacrate de echilibrare a rețelelor de ventilare).

**2. Testul de integritate a filtrelor HEPA (scan test DOP/PAO).** Se generează, în amonte de fiecare filtru HEPA terminal, un aerosol de test cu particule calibrate la dimensiunea critică de 0,3 µm (MPPS), iar un fotometru de scanare se trece sistematic pe toată suprafața filtrului și, esențial, pe toată garnitura de etanșare a ramei față de plafonul/carcasa de montaj — conform metodologiei detaliate integral în DTAC cap. 8.5. Testul se consideră trecut doar dacă penetrarea măsurată rămâne sub pragul de **0,01%** pe toată suprafața scanată, inclusiv garniturile.

**3. Testul de vizualizare a fluxului de aer.** Se folosește fum de test (tracer vizibil) introdus la marginea plafonului de flux laminar și observat vizual/înregistrat video, confirmând un flux **unidirecțional, laminar, fără turbulență** de sus în jos, care „spală" continuu zona operatorie și evacuează fumul de test spre gurile de extracție inferioare, fără recirculare vizibilă în zona sterilă.

**4. Măsurarea diferențelor de presiune pe fiecare interfață de zonă.** Cu ușile închise, se măsoară instrumental (manometru diferențial de precizie) diferența de presiune reală între sala de operație și filtru, între filtru și coridorul curat, și între coridorul curat și zona generală, confirmând valorile de proiect ale cascadei (+15/+10/+5 Pa, cap. PTh-I.2.4), cu abatere admisă în intervalul tehnic uzual de ±2 Pa. Se repetă măsurătoarea cu ușa în poziții tranzitorii (deschidere parțială) pentru a confirma persistența fluxului net dinspre zona curată spre zona murdară.

**5. Numărarea particulelor conform SR EN ISO 14644-1.** Se măsoară, cu numărător de particule calibrat, concentrația de particule pe clasele de mărime relevante, la punctele de măsură reprezentative din interiorul zonei de flux laminar (clasă țintă ISO 5) și din restul sălii (clasă țintă ISO 7), atât în regim „at rest" (fără personal, echipamente oprite) cât și, dacă protocolul beneficiarului o cere, în regim „operational" simulat (personal prezent, activitate simulată) — cele două regimuri de măsurare, consacrate în practica de clasificare a încăperilor curate, oferă o imagine completă a performanței reale a sălii, nu doar a performanței teoretice de proiect.

**6. Testul de recuperare (recovery test).** Se introduce deliberat o sursă de particule în interiorul sălii (generator de aerosol de test) și se cronometrează timpul necesar sistemului de ventilare pentru a readuce concentrația de particule sub pragul clasei de puritate declarate — un timp de recuperare excesiv de lung ar semnala un debit de aer insuficient sau o poziționare defectuoasă a gurilor de introducere/extracție față de sursa de contaminare.

Toate cele șase teste se consemnează într-un **proces-verbal de comisionare (PVLA)** specific fiecărei săli/zone, cu buletine de măsură atașate (debite, presiuni, numărare particule, rezultatul scanării HEPA), semnate de firma de comisionare specializată, verificate de proiectantul de instalații și de verificatorul atestat pe cerința It, și constituie condiție obligatorie pentru darea în exploatare clinică a fiecărei săli de operație/zone critice, independent de recepția generală a construcției.

### PTh-I.5.3 Probele electrice specifice zonelor medicale Grupa 2

| Probă | Parametru/prag | Metodologie |
|---|---|---|
| Rezistență de izolație rețea IT medical | conform prag prag alarmă IMD <50 kΩ | măsurare directă la punerea sub tensiune, fără sarcină conectată |
| Funcționare monitor de izolație (IMD) | declanșare alarmă la simularea unui prim defect | simulare controlată a unui defect de izolație pe un conductor de test |
| Timp de comutare UPS Grupa 2 | ≤0,5 s, fără întrerupere percepută de sarcină | simulare pierdere rețea, măsurare cu osciloscop/analizor de putere |
| Timp de comutare grup electrogen | ≤15 s | simulare pierdere ambelor surse de rețea |
| Rezistență egalizare de potențial (BEP local) | ≤0,2 Ω între oricare 2 puncte accesibile pacientului | măsurare cu miliohmmetru, punct cu punct, pe masa de operație, carcase, pardoseală conductivă |
| Rezistență priză de pământ generală | ≤1 Ω (comună trăsnet+electrică) | metoda celor 3 electrozi |
| Test dispozitive diferențiale (zone non-Grupa 2) | declanșare <300 ms la I∆n=30 mA | aparat dedicat de test |
| Verificare SPD (cascadă) | integritate + indicator de stare | inspecție vizuală + test funcțional |

### PTh-I.5.4 Probele pardoselii conductive și ale echipotențializării funcționale

| Probă | Prag/interval | Observație |
|---|---|---|
| Rezistivitate proprie pardoseală conductivă | 2,5×10⁴…1×10⁶ Ω (reper tehnic internațional, fără corespondent numeric explicit în normativul românesc citat) | măsurare conform metodologiei IEC 61340-4-1, la minimum 5 puncte reprezentative per sală |
| Continuitate rețea de bandă de cupru → BEP | ≤0,2 Ω | măsurare la fiecare punct de conectare la BEP |
| Rezistență echipotențializare globală (masă operație + carcase + pardoseală) | ≤0,2 Ω între oricare 2 puncte | miliohmmetru, conform DTAC cap. 9.4 |

### PTh-I.5.5 Tabel general de probe — restul instalațiilor

| Instalație | Proba | Parametru | Durată | Criteriu de admisie |
|---|---|---|---|---|
| Apă rece/caldă | etanșeitate | 1,5×p regim | 1 h | fără scădere, fără scurgeri (SR EN 806-4) |
| ACM antilegionella | funcțională automatizare | regim 60/55/70°C | ciclu complet | temperaturi conform DTAC cap. 3.6 |
| Apă tratată (sterilizare/laborator/dializă) | conductivitate | <5 / <0,1 µS/cm | continuu | conform prag pe fiecare circuit |
| Canalizare menajeră/infecțioasă/radioactivă | etanșeitate + funcțională decontaminare | conform proiect | — | fără scurgeri; decontaminare confirmată înainte de mascare |
| Bazine decădere radioactivă | radioactivitate reziduală | sub prag de exceptare CNCAN | ≥80 zile rezidență | măsurătoare directă, nu doar calcul teoretic |
| Termic | etanșeitate + funcțională | presiune de probă | conform normativ | fără scădere presiune |
| HVAC general (zone non-critice) | debite + echilibrare | debite proiectate ±10-15% | — | SR EN 12599 |
| Sprinklere | presiune hidraulică | conform SR EN 12845 | 2 h | fără scădere, fără scurgeri |
| Sisteme gaz inert (bloc operator, RMN, CT, servere) | concentrație + etanșeitate încăpere | conform proiect | — | concentrație de stingere menținută timpul cerut |
| Hidranți | debit-presiune | punctul cel mai defavorabil | — | conform DTAC cap. 12.3 |
| IDSAI | funcțională + matrice cauză-efect | test 100% adrese | — | toate efectele confirmate, inclusiv clapete și electrovalvă gaz |
| Nurse-call | funcțională toate punctele | test fiecare pat/baie | — | semnalizare pe toate cele 3 niveluri |
| RIS/PACS | conectivitate + redundanță inel | test întrerupere segment | — | rutare automată fără pierdere de acces |
| BMS | funcțională toate punctele de măsură | test integral | — | toate alarmele declanșate corect |
| Ascensor de pompieri | funcțională pe tablou vital | simulare pană + incendiu | — | funcțional în ambele scenarii |

---

## PTh-I.6 Tehnologia de montaj

### PTh-I.6.1 Succesiunea generală a lucrărilor

1. Trasare trasee generale, cu marcarea explicită a ghenei dedicate gazelor medicale (fără proximitate cu trasee electrice neprotejate).
2. Execuție priză de pământ de fundație (platbandă, sudată de armătură) — **înainte de turnarea fundațiilor**.
3. Montaj rețele îngropate (canalizare pe cele 4 circuite, bazine de decădere dacă aplicabil) — **probate înainte de acoperire**.
4. Execuție structură + planșee, cu golurile de trecere coordonate conform PTh-I.3.12.
5. Montaj rețea de gaze medicale pe traseul principal și pe coloane — **degresare interioară a conductei înainte de montaj, brazare sub protecție de azot, probată hidraulic pe tronsoane înainte de mascare**.
6. Montaj rețea electrică generală, tablouri, transformatoare de separare IT medical.
7. Montaj AHU dedicate pe fiecare sală critică, tubulatură de ventilare, plafoane de flux laminar.
8. Montaj pardoseală conductivă și rețea de echipotențializare, cu conectare la BEP local — **coordonat cu finisajele de arhitectură**.
9. Montaj cutii de zonă, prize terminale de gaze medicale, cu verificare individuală a profilului mecanic la recepția materialelor.
10. Montaj curenți slabi (nurse-call, RIS/PACS, IDSAI, BMS).
11. Montaj clapete antifoc, etanșări RF, cabluri E90/PH90.
12. Probe pe tronsoane, comisionare completă (PTh-I.5), PIF, instruire personal tehnic al unității.

### PTh-I.6.2 Execuția rețelei de gaze medicale — degresare, sudură, susțineri

**Degresarea** — fiecare tronson de cupru medical, înainte de asamblare, se curăță interior cu solvent specific compatibil oxigenului (fără reziduu inflamabil), conform cerinței SR EN 13348, verificată prin control vizual/tampon de curățenie la fiecare capăt înainte de îmbinare — orice urmă de ulei/grăsime din procesul de tragere a țevii sau de la manipularea pe șantier constituie un risc de aprindere în prezența oxigenului pur, conform explicației complete din DTAC cap. 6.9.

**Brazarea sub protecție de azot** — toate îmbinările se execută prin brazare capilară, cu flux de azot uscat menținut în interiorul conductei pe toată durata operației, pentru a preveni formarea de oxizi interiori la zona de îmbinare — o conductă de gaz medical nu poate prezenta depuneri de oxid interior, care s-ar putea desprinde ulterior și ar contamina fluxul de gaz respirat de pacient. Fiecare sudor/brazor autorizat pentru execuția rețelei de gaze medicale deține atestare specifică (nu este suficientă atestarea generală de sudură), iar fiecare îmbinare se marchează individual (identificare sudor + dată) pentru trasabilitate în cartea tehnică.

**Susțineri** — conducta de gaze medicale se susține pe console/brățări dedicate, la interax conform practicii de execuție a rețelelor de cupru medical, cu izolarea electrică a susținerii față de alte trasee metalice (pentru a nu introduce o cale parazitară de curent care ar afecta echipotențializarea zonelor Grupa 2), și cu verificare a rezistenței susținerii la sarcina seismică laterală amplificată de coeficientul de importanță γI=1,40 (clasa de importanță și expunere seismică I stabilită în `general.md`) pe traseele care traversează zone cu risc de deplasare relativă la cutremur (rosturi de tasare/dilatare structurală).

### PTh-I.6.3 Montaj AHU dedicate și plafoane de flux laminar

Fiecare AHU dedicată unei săli de operație se montează pe terasa tehnică de la nivelul etajului 1 (rezultată din retragerea corpului de spitalizare, conform `general.md` cap. 6.7), pe postament antivibratil, cu racord flexibil la tubulatură pentru a preveni transmiterea vibrațiilor mecanice către structura sălii aflate imediat dedesubt. Plafonul de flux laminar se montează suspendat, la cota tavanului fals al sălii de operație, cu poziționare exactă deasupra mesei de operație (coordonată cu poziția definitivă a mesei stabilită de proiectantul de echipamente medicale — a se vedea PTh-I.11) și cu etanșarea perimetrală a ramei față de tavanul fals verificată vizual înainte de testul DOP.

### PTh-I.6.4 Montaj pardoseală conductivă și rețea de echipotențializare

Rețeaua de bandă de cupru a pardoselii conductive se montează pe stratul suport, înainte de aplicarea finisajului conductiv final, cu conectare la minimum 2 puncte diametral opuse ale fiecărei săli la bara de echipotențializare locală — execuția acestei rețele **precede** turnarea/aplicarea finisajului de pardoseală și se probează electric (continuitate) înainte de mascare, conform principiului de fază determinantă aplicat oricărui element care devine inaccesibil după acoperire.

### PTh-I.6.5 Susțineri și fixări seismice (clasa de importanță I)

| Instalație | Tip susținere | Observație seismică |
|---|---|---|
| Conducte gaze medicale | consolă/brățară dedicată, izolată electric | verificare la sarcina laterală amplificată γI=1,40 |
| Conducte apă/apă tratată (coloane principale) | brățară metalică + antivibratil | ancorare verificată la deplasările relative de nivel limitate la SLS (`general.md` cap. 6.5) |
| Tubulatură ventilare AHU dedicate | tijă filetată + profil, cu triangulare pe traseele lungi | verificare seismică pe traseele suspendate peste zone ocupate |
| Cabluri E90/PH90 | jgheab metalic dedicat, susținere la interax redus | continuitate mecanică garantată chiar la deplasări seismice moderate |
| AHU/echipamente grele pe terasa tehnică | postament antivibratil + ancorare seismică | coordonare directă cu memoriul de rezistență pentru sarcina transmisă planșeului |

Toate echipamentele grele ale instalațiilor (VIE oxigen, boilere, cazane, transformatoare, tablouri electrice grele, AHU pe terasa tehnică) se ancorează la forța orizontală seismică amplificată de coeficientul γI=1,40, cu verificarea de detaliu realizată la faza PT în corelare directă cu memoriul de structură, conform interfeței deja semnalate în DTAC cap. 1.4/9.1.

### PTh-I.6.6 Izolații termice

| Element | Grosime izolație | Material |
|---|---|---|
| Distribuție ACM + recirculare | 20-30 mm | elastomer |
| Conducte apă rece (anticondens) | 9-13 mm | elastomer |
| Conducte apă tratată (buclă inox 316L) | 13-20 mm | elastomer, verificat compatibil cu regimul de dezinfecție periodică |
| Tubulatură ventilare AHU dedicate (trasee neîncălzite) | 25-50 mm | vată cu foaie Al, finisaj lavabil pe traseele vizibile din zone clinice |

### PTh-I.6.7 Treceri etanșe la foc

A se vedea schema completă la PTh-I.2.12; execuția propriu-zisă a etanșărilor (manșoane, mastice intumescente, perne pentru fascicule de cabluri) se realizează pe toate traversările prin elementele de compartimentare, cu certificat de rezistență la foc egal sau superior elementului străbătut, verificat vizual la fiecare traversare înainte de finisaje și consemnat ca fază determinantă în Planul de Control al Calității (PTh-I.8).

### PTh-I.6.8 Montaj cablare structurată curenți slabi și nurse-call

Cablarea Cat.6A a rețelei RIS/PACS și cablarea nurse-call se montează pe jgheaburi separate de circuitele de curent tare (distanță minimă de separare, conform SR EN 50174), cu traseul de fibră optică a backbone-ului inel protejat în tub dedicat, cu rază de curbură respectată și rezervă de cablu la fiecare capăt. Cablarea de alarmare a gazelor medicale (cap. PTh-I.2.3) se montează pe traseu propriu, separat atât de curenții slabi generali, cât și de instalația electrică de forță.

---

## PTh-I.7 Punerea în funcțiune (PIF) și reglaje

### PTh-I.7.1 Secvența generală de PIF pentru zonele critice

Punerea în funcțiune a blocului operator, ATI și imagisticii urmează o secvență obligatorie, care nu poate fi comprimată sau reordonată, dat fiind caracterul de siguranță a vieții al instalațiilor implicate:

```
1. Probe de presiune/etanșeitate hidraulice (apă, termic) pe toate circuitele
        ↓
2. Echilibrarea hidraulică a buclelor de distribuție termică
        ↓
3. Reglajul aeraulic al fiecărei AHU dedicate (debite pe fiecare gură)
        ↓
4. Verificarea numărării de particule (SR EN ISO 14644-1) + test DOP filtre HEPA (PTh-I.5.2)
        ↓
5. Calibrarea cascadei de presiuni (măsurători instrumentale pe fiecare interfață)
        ↓
6. Probele complete ale gazelor medicale (PTh-I.5.1) — presiune/etanșeitate/identitate/puritate/alarme
        ↓
7. Probele electrice IT medical + echipotențializare + pardoseală conductivă (PTh-I.5.3-4)
        ↓
8. Probele PSI (sprinklere, gaz inert, detecție, desfumare)
        ↓
9. Test funcțional complet RIS/PACS + BMS
        ↓
10. Instruire personal tehnic + predare instrucțiuni de exploatare
```

### PTh-I.7.2 Echilibrarea hidraulică — apă, termic

Echilibrarea buclelor de distribuție termică (circuite AHU 75/60°C, circuite radiatoare/ventiloconvectoare 55/45°C) se face pe fiecare coloană, cu vane de reglaj marcate la poziția finală, verificate la temperatura de retur proiectată pe fiecare zonă termică (conform diferențierii pe destinație din DTAC cap. 7.2).

### PTh-I.7.3 Reglaj aeraulic — fiecare AHU dedicată

Reglajul se face gură cu gură, cu anemometru/debitmetru, urmărind debitele de proiect stabilite la PTh-I.3.4, cu criteriu de acceptanță ±10-15% pe debitul total al fiecărei săli și verificare separată a componentei de flux laminar la plafonul LAF (viteză 0,25-0,35 m/s, verificată cu anemometru cu fir cald la mai multe puncte ale secțiunii plafonului).

### PTh-I.7.4 Protocol de calibrare a cascadei de presiuni

Cu toate ușile din lanțul de cascadă închise, se măsoară instrumental fiecare diferență de presiune proiectată, se ajustează raportul debit introdus/debit extras al fiecărei încăperi până la atingerea valorii de proiect (±2 Pa), apoi se repetă măsurătoarea cu simularea unei deschideri tranzitorii de ușă, confirmând revenirea la valoarea de proiect în timp scurt după închidere (parte a testului de recuperare, PTh-I.5.2 pct. 6).

### PTh-I.7.5 Protocol complet PIF gaze medicale

Secvența detaliată la PTh-I.5.1 (probă de rezistență → etanșeitate → identitate → puritate → comutare automată → alarme) se execută integral pe fiecare zonă/etaj înainte de conectarea vreunui echipament medical la rețea, cu proces-verbal semnat la fiecare etapă. Doar după finalizarea completă și fără excepții a acestei secvențe pe **toate** prizele clădirii se autorizează trecerea la etapa de dotare cu echipamente medicale.

### PTh-I.7.6 PIF IT medical și echipotențializare

Se pune sub tensiune fiecare transformator de separare individual, se verifică lipsa oricărei legături accidentale a secundarului la pământ (cauză frecventă de eroare la comisionare — un ecran de cablu sau o carcasă greșit conectată anulează beneficiul rețelei flotante), se simulează un prim defect controlat și se confirmă declanșarea alarmei IMD la pragul de <50 kΩ, fără întreruperea alimentării sarcinii.

### PTh-I.7.7 PIF BMS/IDSAI

BMS-ul se programează cu toate punctele de monitorizare stabilite în DTAC și detaliate la PTh-I.2.14 (presiuni de cascadă, temperaturi antilegionella, alarme gaze medicale, stare surse electrice), cu praguri de alarmare testate individual prin simulare controlată a fiecărei condiții de defect. IDSAI se programează adresă cu adresă, cu texte descriptive per zonă, și se testează integral matricea cauză-efect (deschidere/închidere clapete antifoc, pornire desfumare, deblocare control acces, declanșare evacuare vocală, comandă electrovalvă gaz natural).

### PTh-I.7.8 PIF centru de date și RIS/PACS

Se verifică funcționarea redundantă a celor 2 camere de servere (izolarea uneia nu întrerupe disponibilitatea sistemului), backbone-ul de fibră în inel (test de întrerupere controlată a unui segment, confirmând rutarea automată pe calea alternativă), și alimentarea duală (UPS+GE) a întregii infrastructuri.

---

## PTh-I.8 Plan de Control al Calității (PCC) instalații

| Nr. | Fază de lucrare | Document de verificare | Cine verifică | Tip control |
|---|---|---|---|---|
| 1 | Recepție materiale/echipamente (certificate, marcaj CE, agremente specifice gaze medicale) | certificate | responsabil tehnic execuție (RTE) | CQ |
| 2 | Priză de pământ de fundație (înainte de turnare) | proces-verbal | RTE + diriginte | **FD** |
| 3 | Trasee îngropate (canalizare pe 4 circuite, bazine decădere) înainte de acoperire | proces-verbal | RTE + diriginte | **FD** |
| 4 | Degresare interioară conductă gaze medicale (control la fiecare tronson) | proces-verbal | RTE + supraveghetor calitate | CM |
| 5 | Montaj rețea gaze medicale pe traseu (înainte de mascare/tavan fals) | proces-verbal montaj | RTE | CM |
| 6 | **Proba de rezistență mecanică gaze medicale** (1,5×p regim, 24h) | PV probă | RTE + diriginte | **FD** |
| 7 | **Proba de etanșeitate gaze medicale** (pe fiecare zonă) | PV probă | RTE + diriginte | **FD** |
| 8 | **Proba de identitate/cross-connection** (fiecare priză, fără excepție) | PV probă individual per priză | RTE + verificator independent | **FD** |
| 9 | Proba de puritate aer medical | buletin analiză | firmă autorizată | CM |
| 10 | Verificare comutare automată surse gaze + alarme (3 niveluri) | PV funcțională | RTE + diriginte | **FD** |
| 11 | Montaj rețea de bandă cupru pardoseală conductivă (înainte de finisaj) | PV continuitate | RTE + diriginte | **FD** |
| 12 | Măsurare rezistivitate pardoseală conductivă finalizată | buletin măsură | laborator/firmă specializată | CM |
| 13 | Rezistență egalizare de potențial (BEP, ≤0,2Ω) | buletin măsură | verificator/laborator | **FD** |
| 14 | Montaj și punere sub tensiune transformator separare IT medical + IMD | PV probă | RTE + furnizor echipament | **FD** |
| 15 | Montaj clapete antifoc + etanșări RF (toate traversările) | PV inspecție vizuală per traversare | RTE + diriginte | **FD** |
| 16 | Cabluri E90/PH90 pe sarcini de siguranță — verificare traseu dedicat | PV inspecție | RTE | CM |
| 17 | **Comisionare completă săli de operație/zone critice** (schimburi aer, DOP, flux, cascadă presiuni, particule, recovery) | PV comisionare per sală | firmă comisionare + proiectant instalații | **FD** |
| 18 | Probă presiune sprinklere | PV probă | RTE + diriginte + ISU | **FD** |
| 19 | Probă etanșeitate apă menajeră/ACM | PV probă SR EN 806 | RTE + diriginte | CM |
| 20 | Funcțional automatizare antilegionella (60/55/70°C) | PV probă | RTE | CM |
| 21 | Probă canalizare pe cele 4 circuite, înainte de mascare | PV probă | RTE + diriginte | **FD** |
| 22 | Verificare radioactivitate reziduală bazine decădere (dacă aplicabil) | buletin CNCAN | firmă autorizată | **FD** |
| 23 | Rezistență izolație + priză de pământ (electric general) | buletin PRAM | verificator/laborator | CM |
| 24 | Funcțional IDSAI + matrice cauză-efect completă | PV probe 100% | firmă autorizată IGSU | **FD** |
| 25 | Funcțional stație pompare incendiu | PV probă | firmă autorizată + ISU | **FD** |
| 26 | Sisteme gaz inert (bloc operator, RMN, CT, servere) | PV probă concentrație/etanșeitate | firmă autorizată | **FD** |
| 27 | Reglaj aeraulic complet (toate AHU dedicate) | protocol debite | RTE + comisionare | CM |
| 28 | Funcțional nurse-call (toate punctele) | PV probă | RTE | CM |
| 29 | Funcțional RIS/PACS + BMS integral | PV probă | firmă IT medical | CM |
| 30 | Funcțional ascensor de pompieri pe tablou vital | PV probă | RTE + ISU | **FD** |

Legendă: **FD** = fază determinantă (necesită prezența ISC/beneficiar/proiectant, uneori ISU/CNCAN/DSP); CM = control în masă; CQ = control calitate recepție.

### PTh-I.8.1 Faze determinante — ierarhia de criticitate

Dintre toate fazele determinante enumerate, patru grupuri au prioritate absolută în lanțul de verificare, dat fiind că o neconformitate nedetectată la aceste faze nu mai poate fi corectată ulterior fără intervenție majoră sau rămâne ascunsă permanent riscului pacientului: **(1)** probele complete ale gazelor medicale (rezistență, etanșeitate, și mai ales identitatea la fiecare priză — nr. 6-8, 10), **(2)** comisionarea completă a sălilor sterile (nr. 17), **(3)** rezistența egalizării de potențial și funcționarea IT medical (nr. 13-14), și **(4)** clapetele antifoc și etanșările RF (nr. 15), a căror poziție corectă condiționează atât siguranța la incendiu, cât și integritatea cascadei de presiuni a zonelor aseptice (interfața critică deja semnalată la PTh-I.2.12). Niciuna dintre aceste faze nu se continuă fără proces-verbal semnat și fără remedierea completă a oricărei neconformități constatate.

### PTh-I.8.2 Cartea tehnică a construcției — capitolul instalații

| Document | Conținut |
|---|---|
| Planuri as-built | trasee reale executate pe toate instalațiile, cu poziția exactă a cutiilor de zonă și a prizelor de gaze medicale |
| Scheme finale | monofilară actualizată, izometrice apă/gaze medicale nod-cu-nod, schema completă IT medical per sală |
| Fișe tehnice echipamente | toate echipamentele montate + certificate CE + agremente specifice (gaze medicale, HEPA, PSI) |
| Buletine de probe | toate PVLA gaze medicale (per priză), comisionare săli sterile (per sală), PRAM, presiune sprinkler |
| Procese-verbale FD | toate fazele determinante semnate, inclusiv avize ISU/CNCAN/DSP |
| Protocoale de reglaj | echilibrare hidraulică, reglaj aeraulic per AHU, calibrare cascadă presiuni |
| Instrucțiuni de exploatare | operare stație gaze medicale, protocol șoc termic antilegionella, verificare periodică filtre HEPA, testare periodică surse electrice de rezervă |
| Program de mentenanță | revizii periodice (gaze medicale conform SR EN ISO 7396-1, filtre HEPA, ecranare radiologică la upgrade echipamente, GE/UPS sub sarcină) |
| Garanții | certificate garanție producători (VIE, compresoare, AHU dedicate, transformatoare IT medical, UPS, GE) |

---

## PTh-I.9 Calcul iluminat interior și de siguranță (NP 061/2002, SR EN 12464-1)

### PTh-I.9.1 Metoda de calcul și corpuri de referință

Calculul se face prin metoda factorului de utilizare (flux luminos), conform SR EN 12464-1 și NP 061, pe fiecare zonă funcțională, cu corpurile de iluminat selectate conform cerinței de flicker redus, IP corespunzător zonei (IP54-65 în zonele umede/aseptice) și temperatură de culoare unitară 4.000K stabilite în DTAC cap. 10.2.

### PTh-I.9.2 Calcul detaliat — Câmpul operator (scialitică)

| Parametru | Valoare de proiect |
|---|---|
| Nivel de iluminare | 10.000…100.000 lx, reglabil în funcție de tipul de intervenție |
| Ra (indice redare culori) | ≥95 |
| Alimentare | UPS Grupa 2, comutare ≤0,5 s |
| Verificare la recepție | măsurare luxmetru la nivel minim și maxim de reglaj, verificare Ra cu spectrofotometru/colorimetru dedicat |

### PTh-I.9.3 Calcul detaliat — restul sălii de operație și ATI

| Zonă | Em (lx) | Ra | Observație |
|---|---|---|---|
| Sală de operație (general) | 1.000 | ≥90 | corpuri IP54-65, lavabile |
| ATI (regim de repaus) | 100 | ≥90 | reducere nocturnă, fără compromiterea supravegherii |
| ATI (examinare) | 1.000 | ≥90 | comutare la nevoie |

### PTh-I.9.4 Calcul detaliat — Ambulatoriu, laborator, imagistică

| Zonă | Em (lx) | Ra |
|---|---|---|
| Cabinet/examinare | 500-1.000 | ≥90 |
| Laborator | 500 | ≥80 |
| Console comandă imagistică | conform confort ecran, fără reflexii pe monitoare de diagnostic | ≥80 |

### PTh-I.9.5 Calcul detaliat — Spitalizare

| Zonă | Em (lx) | Ra |
|---|---|---|
| Salon (general) | 100 (+300 pentru lectură) | ≥80 |
| Salon (veghe de noapte) | 5 | ≥80 |
| Coridoare secție (zi/noapte) | 200/50 | ≥80 |
| Posturi de asistente | conform activitate de precizie (documentare, pregătire medicație) | ≥80 |

### PTh-I.9.6 Sinteză putere instalată iluminat și verificare cu bilanțul electric general

Puterea instalată de iluminat rezultată din însumarea calculelor pe zone se confruntă cu valoarea globală de 120 kW deja inclusă în bilanțul de putere al DTAC (cap. 9.2), cu ajustări de detaliu specifice fiecărei zone (scialitica și iluminatul de precizie al blocului operator au o pondere disproporționat de ridicată față de suprafața ocupată, exact ca celelalte instalații speciale ale etajului 1, conform observației economice deja făcută în `general.md` cap. 8.4).

### PTh-I.9.7 Iluminat de siguranță și evacuare (SR EN 1838)

| Categorie | Autonomie | Timp de comutare | Sursă |
|---|---|---|---|
| Iluminat de evacuare (coridoare publice, ambulatoriu) | ≥3 h | ≤5 s | acumulatori proprii ai corpurilor |
| Continuarea lucrului bloc operator/ATI | ≥3 h | **≤0,5 s** | UPS Grupa 2 (nu acumulatori proprii) |
| Semnalizare ieșiri/direcții evacuare | ≥1 h (uzual) | ≤5 s | acumulatori proprii/tablou vital |

Verificarea la recepție se face prin simularea căderii de tensiune generale și cronometrarea comutării fiecărei categorii, cu atenție particulară la distincția critică deja explicată în DTAC cap. 10.3: la o pană survenită în mijlocul unei intervenții chirurgicale, echipa operatorie nu evacuează, ci continuă lucrul, motiv pentru care iluminatul câmpului operator trebuie verificat la parametrii de proiect deplini, fără nicio scădere perceptibilă, exact prin comutarea UPS — verificarea acestei distincții (comutare ≤0,5s pe UPS pentru bloc operator, diferit de comutarea ≤5s pe acumulatori proprii pentru restul clădirii) este un punct de control obligatoriu la PIF.

---

## PTh-I.10 Breviar de calcul suplimentar securitate la incendiu (instalații)

### PTh-I.10.1 Verificarea completă a compartimentării la foc pe fiecare interfață a instalațiilor

Fiecare traversare a unui element de compartimentare rezistent la foc (grad I, conform `general.md` cap. 1.4/6.10 și scenariul de securitate la incendiu dedicat) se listează individual în piesele desenate de execuție, cu clasa de rezistență necesară și soluția de etanșare adoptată — tabelul de mai jos sintetizează categoriile de traversări identificate pe baza compartimentării descrise în DTAC (evacuare orizontală pe minimum 2 sectoare per etaj, separare zonă tehnică/parcaj la subsol, separare bloc operator/restul etajului 1):

| Interfață de compartimentare | Instalații care o traversează | Soluție de etanșare |
|---|---|---|
| Între cele 2 sectoare de evacuare ale fiecărui etaj de spitalizare | tubulatură ventilare, conducte apă/gaze medicale, cabluri | clapetă antifoc (ventilare) + manșoane/perne intumescente (restul) |
| Între bloc operator și restul etajului 1 | tubulatură ventilare AHU dedicate (fiecare sală, independentă), gaze medicale, electric | clapetă antifoc pe orice conductă comună (evitată prin AHU dedicate independente, cap. PTh-I.2.4), etanșări RF pe restul |
| Între zona tehnică de subsol și parcaj | toate rețelele care alimentează suprastructura | clapete antifoc + etanșări RF pe toate traversările |
| Casa scării de evacuare | ventilator de presurizare dedicat (nicio altă instalație nu traversează casa scării) | — |

### PTh-I.10.2 Verificarea interblocării electrovalvei de gaz natural cu detecția de incendiu

Electrovalva de siguranță a instalației de utilizare a gazelor naturale (cazane de condensație, DTAC cap. 7.4) se verifică la simularea unui semnal confirmat de incendiu de la centrala IDSAI, confirmând închiderea automată a alimentării cu gaz în timp scurt — interfața directă între instalația de gaze naturale și scenariul de securitate la incendiu, semnalată în DTAC și verificată aici funcțional, fără a relua logica de detecție propriu-zisă.

### PTh-I.10.3 Coordonarea dintre clapetele antifoc și cascada de presiuni a zonelor aseptice — verificare detaliată

Reluând punctul de coordonare semnalat la PTh-I.2.12: fiecare clapetă antifoc care ar putea, prin închidere, afecta debitul de aer al unei AHU dedicate unei săli de operație aflate în alt compartiment se verifică explicit, pe planurile de execuție, ca **nefiind montată pe traseul comun al vreunei AHU dedicate** — soluția de proiectare (AHU independentă per sală, cap. PTh-I.2.4) elimină structural acest risc, dar verificarea de coordonare la faza de execuție confirmă, prin control pe planuri, că niciun traseu de aer al unei săli active nu traversează un compartiment diferit de cel al sălii respective. Rezultatul acestei verificări se consemnează explicit în procesul-verbal de coordonare interdisciplinară (PTh-I.3.12).

### PTh-I.10.4 Verificarea alimentării electrice a sarcinilor de siguranță pe durata unui eveniment de incendiu

Se verifică, prin simulare controlată, că toate sarcinile alimentate pe cablu E90/PH90 (pompe de incendiu, ventilatoare de desfumare, iluminat de securitate, ascensor de pompieri, alarmele de gaze medicale, sistemul de alarmare vocală) rămân alimentate din tabloul vital la simularea unui scenariu combinat — incendiu confirmat **plus** pierdere a rețelei publice — condiție realistă de proiectare, dat fiind că un eveniment de incendiu major poate afecta, direct sau indirect, alimentarea electrică generală a clădirii.

### PTh-I.10.5 Notă privind stadiul documentației și coordonarea cu scenariul PSI

Prezentul capitol tratează exclusiv interfața dintre instalații și securitatea la incendiu (dimensionarea capacității/sursei cerute, poziționarea clapetelor și a etanșărilor, alimentarea electrică a sarcinilor de siguranță), **fără a relua** logica de detecție, alarmare, calculul timpilor de evacuare sau dimensionarea desfumării propriu-zise, care rămân integral obiectul scenariului de securitate la incendiu, elaborat de specialistul atestat și avizat de ISU, conform semnalării explicite din DTAC cap. 17.

---

## PTh-I.11 Coordonarea cu arhitectura și structura — concluzii și checklist final

### PTh-I.11.1 Coordonarea cu memoriul de arhitectură

Poziționarea exactă a plafoanelor de flux laminar față de mesele de operație, a grătarelor de extracție la partea inferioară a pereților sălilor de operație, a ghenelor tehnice verticale (coloane gaze medicale, apă tratată, electrice) și a finisajului de pardoseală conductivă (material, culoare, rosturi) revine integral memoriului și pieselor desenate de arhitectură (`arhitectura.md`), care nu se dublează în prezentul document. Coordonarea obligatorie constă în: transmiterea către arhitectură a dimensiunilor exacte ale plafoanelor LAF (3,2×3,2 m) și a poziției gurilor de introducere/extracție înainte de finalizarea planului reflectat de tavan al blocului operator; transmiterea traseului și a secțiunii ghenelor tehnice înainte de finalizarea compartimentărilor; și confirmarea, de către arhitectură, a materialului de pardoseală conductivă compatibil cu rețeaua de bandă de cupru descrisă la PTh-I.2.8.

### PTh-I.11.2 Coordonarea cu memoriul de structură

Golurile de trecere prin planșee și pereți structurali (PTh-I.3.12), ancorarea echipamentelor grele la forța seismică amplificată de γI=1,40 (PTh-I.6.5), și verificarea drift-ului la SLS pentru protejarea integrității traseelor de gaze medicale și a rosturilor etanșe ale compartimentărilor bloc operator/ATI (deja semnalată în `general.md` cap. 6.5) revin coordonării directe cu memoriul de rezistență (`structura.md`), care nu se dublează în prezentul document. Punctele de prindere ale conductelor grele de gaze medicale și hidranți pe structura metalică/de beton, precum și postamentele echipamentelor de pe terasa tehnică, se verifică structural înainte de montaj, nu ca etapă ulterioară de corecție.

### PTh-I.11.3 Sinteza soluțiilor de execuție — tabel recapitulativ

| Instalație | Soluție de execuție adoptată | Probă critică asociată |
|---|---|---|
| Gaze medicale | rețea cupru medical degresat, brazare sub azot, cutii de zonă, prize profil unic | rezistență + etanșeitate + identitate per priză (PTh-I.5.1) |
| Săli de operație/zone sterile | AHU dedicată per sală, LAF HEPA H14, cascadă presiuni +15/+10/+5 Pa | comisionare completă: schimburi aer, DOP, flux, presiuni, particule, recovery (PTh-I.5.2) |
| Pardoseală conductivă/echipotențializare | rețea bandă cupru + BEP local, conectare masă operație/carcase | rezistivitate + continuitate + echipotențializare ≤0,2Ω (PTh-I.5.4) |
| Compartimentare la foc | clapete antifoc pe toate traversările, etanșări RF, cabluri E90/PH90 | inspecție per traversare + funcțională clapete (PCC nr. 15) |
| IT medical Grupa 2 | transformator separare 5-8kVA/sală + IMD | rezistență izolație + alarmă <50kΩ (PTh-I.5.3) |
| Electric general | dublă rețea MT + 2 trafo 1.000kVA + GE ≥800kVA + UPS Grupa 2 | comutare ≤15s (GE) / ≤0,5s (UPS) |
| Apă/ACM | hidrofor 2A+1R + boilere 2×3.000l inox 316L + antilegionella automatizat | presiune + etanșeitate + regim 60/55/70°C |
| Canalizare | 4 rețele separate + bazine decădere (dacă aplicabil) | etanșeitate per rețea + radioactivitate reziduală |
| PSI | sprinklere zone generale + gaz inert zone critice + hidranți | presiune sprinklere + concentrație gaz + funcțională IDSAI |
| Curenți slabi | nurse-call pe tablou vital + RIS/PACS inel 10Gbps + BMS | funcțională 100% puncte + redundanță inel |

### PTh-I.11.4 Checklist final de conformitate PTh — condiție pentru trecerea la faza de dotare cu echipamente medicale

- [ ] Toate cele 7 tipuri de gaze medicale probate individual pe toate prizele clădirii (rezistență, etanșeitate, identitate, puritate), cu PVLA semnate per zonă/etaj.
- [ ] Comutarea automată a tuturor surselor de rezervă (oxigen N+2, restul gazelor N+1) verificată funcțional, fără întrerupere perceptibilă.
- [ ] Sistemul de alarmare a gazelor medicale funcțional pe toate cele 3 niveluri, inclusiv la simularea unei pene electrice generale.
- [ ] Toate cele 3 săli de operație și toate zonele cu clasă de puritate declarată (ATI, sterilizare curată, naștere/neonatologie) comisionate complet: schimburi de aer conforme, test DOP trecut pe toate filtrele HEPA terminale, cascadă de presiuni confirmată instrumental, numărare de particule conformă clasei declarate, test de recuperare trecut.
- [ ] Sistemul IT medical funcțional pe toate sălile/posturile Grupa 2, cu IMD calibrat la pragul de alarmă corect și fără nicio legătură parazitară la pământ.
- [ ] Rețeaua de echipotențializare și pardoseala conductivă măsurate și conforme (≤0,2 Ω echipotențializare; rezistivitate proprie a pardoselii în intervalul tehnic de referință).
- [ ] Toate clapetele antifoc și etanșările RF inspectate individual, cu proces-verbal per traversare, coordonate cu compartimentarea de evacuare orizontală.
- [ ] Toate cablurile E90/PH90 verificate pe traseu dedicat, cu alimentare confirmată sub simulare de incendiu combinat cu pierdere de rețea publică.
- [ ] Timpii de comutare electrică (UPS ≤0,5s, GE ≤15s) verificați sub sarcină reală, nu doar test la gol.
- [ ] Iluminatul câmpului operator și iluminatul de siguranță al blocului operator/ATI verificate pe UPS, distinct de iluminatul de evacuare general al clădirii.
- [ ] Sistemele de stingere cu gaz ale zonelor cu excepție (bloc operator, RMN, CT/RX/angiograf, servere, tablouri electrice) probate funcțional și de concentrație.
- [ ] Nurse-call, RIS/PACS și BMS funcționale integral, cu redundanța de topologie a backbone-ului de date confirmată prin test de întrerupere controlată.
- [ ] Cartea tehnică a construcției, capitolul instalații, completă cu toate buletinele, procesele-verbale de fază determinantă și instrucțiunile de exploatare (PTh-I.8.2).

### PTh-I.11.5 Concluzie

Prezentul supliment de fază PTh transformă principiile și dimensionările preliminare stabilite în memoriul de instalații DTAC într-un ansamblu complet și verificabil de scheme de execuție, breviare nod-cu-nod, fișe tehnice de echipament, protocoale de probă și de punere în funcțiune, și un Plan de Control al Calității cu fazele determinante explicit ierarhizate. Accentul documentului — solicitat explicit de complexitatea și de miza funcțională a investiției — a fost pus pe cele patru teme unde o neconformitate de execuție are consecința cea mai directă asupra siguranței pacientului: execuția și probarea integrală a rețelei de gaze medicale conform SR EN ISO 7396-1, cu verificarea de identitate la fiecare priză fără excepție; comisionarea instrumentală completă a sălilor sterile, dincolo de verificarea vizuală a sensului fluxului de aer; execuția și testarea pardoselii conductive și a echipotențializării electrice a zonelor Grupa 2; și coordonarea riguroasă dintre compartimentarea la foc și integritatea cascadei de presiuni a zonelor aseptice. Documentul se dezvoltă în continuare, la execuție, prin shop-drawing-urile fiecărei specialități și prin protocoalele de comisionare ale firmelor specializate în gaze medicale și în camere curate, cu verificarea finală și avizarea rezultatelor de către verificatorii atestați pe cerințele Is/It/Ie și de către autoritățile competente (ISU, CNCAN dacă aplicabil, DSP) — condiție pentru obținerea, în succesiune, a recepției la terminarea lucrărilor, a autorizației de securitate la incendiu și a autorizației sanitare de funcționare.
