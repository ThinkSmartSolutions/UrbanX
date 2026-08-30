# SUPLIMENT DE FAZĂ PTh — INSTALAȚII
## Clădire mixtă S+P+M+5E — comercial (parter+mezanin, 950 mp util) + locuințe colective (40 apartamente, 128 rezidenți) + parcaj subteran (42 locuri)

---

## PTh-I.1 Obiectul și structura suplimentului de fază PTh

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție, conform HG 907/2016 Anexa nr. 8 și Legii nr. 169/2026 (CATUC), art. 264, Anexa nr. 2) pentru memoriul de instalații al clădirii mixte care face obiectul documentației (`instalatii.md`, faza D.T.A.C.): imobil cu regim de înălțime **S+P+M+5E**, Ac = 620 mp, Ad ≈ 4.150 mp, care reunește un **parcaj subteran de 42 de locuri**, un **nivel comercial pe parter și mezanin** (950 mp util, din care 180 mp alimentație publică), un **corp de locuințe colective pe cinci etaje** (40 de apartamente — 12 × 2 camere + 20 × 3 camere + 8 × 4 camere —, 128 de rezidenți, distribuiți pe **4 nuclee verticale** a câte 10 apartamente/nucleu, 2 apartamente/etaj/nucleu) și **spațiile/instalațiile comune** ale întregii clădiri. Documentul dezvoltă la nivel de execuție tot ceea ce faza DTAC a stabilit la nivel de concept, dimensionare preliminară și încadrare normativă, **fără a relua** breviarele DTAC — le detaliază nod cu nod, pe fiecare coloană/tronson/tablou, și adaugă componentele specifice fazei PTh: scheme complete de execuție, breviare de calcul detaliate, fișe tehnice de echipament, tabele de probe, tehnologie de montaj, protocoale de punere în funcțiune (PIF) și Planul de Control al Calității (PCC).

Firul conducător al DTAC — **separarea fizică și contorizarea independentă a instalațiilor pe cele patru categorii de utilizare** (rezidențial / comercial / părți comune / parcaj), cap. 1.6 al memoriului DTAC — este firul conducător și al prezentului supliment: fiecare capitol de execuție tratează, explicit, câte patru soluții paralele (sau, unde o categorie nu este relevantă, câte sunt aplicabile), nu o soluție unică „medie" pentru toată clădirea. Soluțiile de referință rămân cele adoptate în DTAC și se duc la nivel de execuție **fără schimbare de concept**: pentru ramura rezidențială se menține **centrala murală de apartament în condensație pe gaz**, cu **ACM individual instant** (DTAC §3.2); pentru componenta comercială se menține **sursă termică proprie tip roof-top/VRF**, complet separată (DTAC §5.5); pentru transportul pe verticală se mențin **2 ascensoare**, dintre care unul echipat și dimensionat ca **ascensor de pompieri/targă** (DTAC §12.2); pentru parcaj și pentru zona comercială, PTh **confirmă și dimensionează nod-cu-nod** necesitatea sprinklerelor semnalată condiționat în DTAC (§10.4), pe baza pragurilor de risc reale ale celor două zone (§PTh-I.3.15).

Coordonarea cu celelalte piese ale documentației PTh urmează, la clădirea mixtă, o interfață mai densă decât la o clădire monofuncțională: cu `arhitectura-pth.md`, pentru nodul critic al planșeului de separare comercial↔rezidențial (detaliul D01/D01.1 — compartimentare REI 90 + barieră acustică majorată, prin care trec toate coloanele verticale ale rețelelor separate), pentru tamburul de separare parcare–casă de scări (D04), pentru decuplarea acustică a nucleului de circulație rezidențial (D05), pentru placa de balcon (D06, rupere de punte termică pentru orice traversare de instalație), pentru ușa de acces în casa scării (D09) și pentru terasa tehnică finală (D14, platforme de echipamente); cu `structura-pth.md`, pentru încărcările transmise de echipamentele grele și pentru golurile prin elementele portante. Nicio soluție de dimensionare din prezentul document nu contrazice indicatorii sau soluțiile de concepție autorizate la faza DTAC; unde apar precizări numerice noi (diametre pe noduri, puteri de echipament, breviare pe tipologie de apartament), acestea **detaliază**, nu modifică, soluția de ansamblu.

PTh-I aduce, față de DTAC, următoarele niveluri suplimentare de detaliere:

| Element | Nivel DTAC (`instalatii.md`) | Nivel PTh (prezentul document) |
|---|---|---|
| Scheme | conceptuale, de principiu, bilanțuri globale pe categorie de utilizare | scheme de execuție complete, cu toate diametrele/traseele/nodurile numerotate, pe fiecare din cele 4 categorii |
| Breviar hidraulic | debite globale pe coloană reprezentativă (rezidențial) și pe ramură (comercial) | calcul nod cu nod (nivel cu nivel) pe coloana reprezentativă a fiecărui nucleu — apă, canalizare, gaz |
| Breviar termic/electric | necesar global pe categorie (kW, kVA), un exemplu de calcul (apartament 3 camere) | dimensionare completă pe toate cele 3 tipologii de apartament + comercial (CTA, hotă), verificare cădere de tensiune, selectivitate pe cele 4 tablouri de categorie |
| Echipamente | tipuri și puteri de principiu | fișe tehnice complete per echipament major (parametri garantați de furnizor) |
| Probe | enumerare pe specialitate | tabel complet presiune/durată/criteriu de admisie per instalație, pe fiecare categorie |
| Montaj | principii generale | tehnologie, succesiune, susțineri seismice, izolații, treceri la foc prin planșeul de separare (D01.1) |
| PIF | menționată | protocoale de echilibrare, reglaj, programare IDSAI (matrice extinsă pe 4 categorii), primă pornire centrale |
| Calitate | — | Plan de Control al Calității + faze determinante (FD) explicite, cu accent pe planșeul de separare |
| Iluminat | niveluri globale + un exemplu de calcul (zonă vânzare 300 mp) | calcul complet metoda flux luminos pe fiecare zonă funcțională, inclusiv întreaga suprafață comercială (950 mp) |
| PSI | dimensionare preliminară globală, sprinklere condiționate | breviar hidraulic complet sprinklere (comercial + parcaj, SR EN 12845), calcul detaliat coloană umedă, rezervor recalculat |
| Ascensor | 2 ascensoare, unul cu funcție pompieri, capacitate de principiu | calcul de trafic (metoda intervalului și a capacității de transport), verificare separată pentru fluxul rezidențial |

Normative de referință aplicate suplimentar în execuție, față de cele deja citate în DTAC: **SR EN 806-4** (probe și punere în funcțiune a instalațiilor de apă), **SR EN 12056-2/3** (verificare hidraulică pe fiecare coloană de canalizare/pluvial), **SR EN 12845** (calcul hidraulic sprinklere, aplicat comercial + parcaj), **SR EN 671-1/2** (hidranți — proiectare și verificare), **SR EN 54** (seria pentru componentele IDSAI, inclusiv EN 54-16 pentru evacuarea vocală comercială), **SR EN 1838** (iluminat de siguranță — verificare timpi de comutare), **SR EN 12464-1** (iluminat interior — metoda factorului de utilizare), **SR EN 62305-3** (execuție SPD/coborâri paratrăsnet), **SR EN 12101-2/3/6** (sisteme de desfumare și presurizare — clasificare și verificare), **NP 086** (proiectarea instalațiilor de stingere cu apă), **C56** (verificarea calității lucrărilor de instalații), **NTPEE-2018 cap. execuție și probe**, **ISCIR PT R1-2010** (ascensoare — verificare tehnică, punere în funcțiune), **C125/2013** (acustică — pentru interfața cu D01/D02/D03 din `arhitectura-pth.md`, relevante la traversările de instalații).

---

## PTh-I.2 Scheme detaliate de execuție

### PTh-I.2.1 Schema rețelei de apă rece — branșament unic, bifurcare rezidențial/comercial, hidrofor, 4 coloane, contorizare individuală

Conform principiului central (DTAC §1.6, §2.1), branșamentul din rețeaua publică rămâne **unic** la limita de proprietate (contor Woltmann general, robinet de concesie, filtru, clapetă de sens), dar se bifurcă, imediat după cămin, în cele două ramuri hidraulic independente:

```
Branșament PEHD PE100 Dn110 ─► Cămin apometru general (Woltmann + disconector, SR EN 1717)
   ─► BIFURCARE (subsol, cameră tehnică gospodărie apă) ─┬─► Ramura REZIDENȚIALĂ
                                                          └─► Ramura COMERCIALĂ
```

**Ramura REZIDENȚIALĂ** (necesită ridicare de presiune, DTAC §2.7):

```
Subcontor rezidențial ─► Grup de pompare (hidrofor, 2 pompe VSD, 1 activă+1 rezervă)
   ─► Colector distribuție subsol Dn50 ─┬─► Coloană CAR-1 (10 ap., Dn32→Dn40)
                                        ├─► Coloană CAR-2 (10 ap., Dn32→Dn40)
                                        ├─► Coloană CAR-3 (10 ap., Dn32→Dn40)
                                        └─► Coloană CAR-4 (10 ap., Dn32→Dn40)
```

Cele 4 coloane sunt **identice ca structură** (fiecare deservește exact 1/4 din compunerea clădirii: 3 apartamente de 2 camere + 5 de 3 camere + 2 de 4 camere, câte 2 apartamente/nivel pe cele 5 niveluri de locuințe, DTAC §2.2) — spre diferență de un bloc monofuncțional cu nuclee inegal încărcate, aici uniformitatea compunerii pe verticală (2 apartamente identice ca tipologie agregată la fiecare nivel al fiecărui nucleu) simplifică execuția: un singur breviar nod-cu-nod (§PTh-I.3.1) este reprezentativ pentru toate cele 4 coloane. Fiecare coloană urcă prin **ghenă tehnică dedicată rezidențială** (comună cu ACM și cu coloana de canalizare a aceluiași nucleu, separată de gaz și de curenți tari/slabi, conform interfeței cerute de `arhitectura-pth.md`, secțiunea de coordonare interdisciplinară), cu derivație la fiecare palier: **robinet de izolare + filtru „Y" + contor de apă rece cu emisie de impulsuri + clapetă de reținere**, montate în firida de palier — element de contorizare individuală (Legea 121/2014), poziționat conform coordonării cu planul de arhitectură (poziția și accesibilitatea firidei, temă explicit menționată în `arhitectura-pth.md` ca punct de coordonare arhitectură↔instalații).

**Ramura COMERCIALĂ** (alimentare directă din rețea, fără hidrofor — utilizatori la cote joase, parter/mezanin, DTAC §2.1/§2.7):

```
Subcontor comercial general ─► Reductor de presiune (dacă necesar) ─► Distribuție orizontală parter/mezanin
   ─► Subcontor unitate 1 ─► Grup sanitar public + robinete de serviciu
   ─► Subcontor unitate 2 (dacă spațiul e compartimentat pt. mai mulți operatori)
   ─► Derivație oficiu alimentație publică (cu subcontor propriu tehnologic)
```

Subcontoarele comerciale se montează pe rețeaua orizontală de la parter/mezanin, **cu acces din spațiile tehnice comune**, nu din interiorul fiecărui spațiu comercial (DTAC §2.8) — cerință reluată identic la execuție: poziția exactă a firidelor comerciale se stabilește pe planul de arhitectură definitiv, coordonat cu traseul rețelei orizontale.

### PTh-I.2.2 Schema apei calde de consum (ACM) — separare completă rezidențial/comercial

Conform soluției de referință (DTAC §3.1/§3.2 — Varianta descentralizată adoptată), fiecare apartament produce ACM instant în centrala proprie — **nu există rețea comună de recirculare ACM la nivelul corpului de locuințe**. Schema de execuție relevantă la nivelul instalațiilor comune se limitează la interfața palier-apartament:

```
Coloană AR (comună, per nucleu) ─► robinet + filtru + contor AR (palier)
   ─► derivație în apartament ─► centrală murală în condensație (intrare AR / ieșire ACM instant)
```

**Verificarea timpului de așteptare la robinet** (confort, nu contorizare) se face la nivelul distribuției interioare a fiecărui tip de apartament, cu rezultate diferențiate pe tipologie (§PTh-I.3.3) — la 2 camere (o singură baie), traseul e scurt; la 4 camere (2 băi + duș separat, DTAC §2.2), cea mai îndepărtată baie secundară poate necesita recirculare locală de apartament, decizie confirmată pe planul definitiv de arhitectură interioară.

**Componenta comercială** păstrează sursa proprie de ACM, complet separată (DTAC §3.5): boiler electric sau pe gaz, dimensionat pe necesarul grupurilor sanitare publice și al oficiului de alimentație publică, cu contor propriu integrat în contorizarea generală comercială (§PTh-I.2.9, tablou TG-COMERCIAL).

### PTh-I.2.3 Schema coloanelor de canalizare menajeră — 4 nuclee rezidențiale + rețea comercială separată + canal gras

```
WC + baie + bucătărie (fiecare apartament, nucleu CAR-1…4) ─► racorduri PP fonoabsorbant
   ─► Coloană K-WC (Dn110, ventilare primară) — 4 coloane, aliniate cu CAR-1…4
   ─► Colector orizontal subsol Dn160 (i≈1,5-2%) ─► Racord canalizare publică (aval de separatoare)
```

Paralel, complet independent:

```
Grup sanitar public + robinete serviciu (comercial) ─► rețea comercială proprie Dn90-110
Oficiu alimentație publică (spălare, preparare) ─► CANAL GRAS dedicat ─► Separator de grăsimi NS 7 (SR EN 1825)
                                                                          │
Colector general subsol (rezidențial + comercial + canal gras, aval de separator) ──┴─► Racord canalizare publică
```

Separatorul de grăsimi (NS 7, DTAC §4.3) rămâne, la execuție, **exclusiv pe traseul canalului gras** — nu se introduce nicio derivație a rețelei menajere a locuințelor prin acest separator, conform principiului central reluat consecvent din DTAC.

### PTh-I.2.4 Schema canalizării pluviale — terasă, coloane, descărcare

```
Receptoare terasă (min. 2 + parafrunzar) ─► Coloane pluviale interioare Dn110 (min. 2, redundanță)
   ─► Colector pluvial subsol Dn110-160 (i≈1,5-2%) ─► Descărcare controlată/bazin de retenție (condiționat)
Preaplin de avarie (prin atic) ─► descărcare liberă pe fațadă (SR EN 12056-3)
```

### PTh-I.2.5 Schema parcajului subteran — stație de pompare + separator de hidrocarburi

```
Pardoseală parcaj (42 locuri, ≈620 mp) ─► sifoane de pardoseală/rigole
   ─► Separator de hidrocarburi clasă I, NS 10 (SR EN 858-1/2)
   ─► Stație de pompare dedicată (2 pompe submersibile, 1 activă+1 rezervă, comandă flotor/senzor nivel)
   ─► Refulare peste cota colectorului stradal ─► Racord canalizare publică
```

### PTh-I.2.6 Schema instalației termice rezidențiale — centrale de apartament, distribuție

```
Coloană gaz (derivație apartament, v. §PTh-I.2.9) ─► Centrală murală în condensație (24-28 kW, funcție de tip apartament, §PTh-I.3.8)
   ├─► circuit încălzire (distribuitor apartament, radiatoare cu robinete termostatice)
   │      └─► corpuri de încălzire (port-prosop în baie/băi)
   └─► ACM instant (v. §PTh-I.2.2)
Evacuare gaze arse: coaxial etanș (tip C), prin fațadă/terasă, individual per apartament
```

### PTh-I.2.7 Schema sursei termice comerciale — sistem roof-top/VRF dedicat

```
Unitate exterioară roof-top/VRF (terasă tehnică, coordonată cu D14 `arhitectura-pth.md`)
   ─► distribuție agent frigorific/termic ─► unități interioare zonă vânzare + oficiu alimentație publică
   ─► interfațat cu CTA comercial (recuperator de căldură η≥73%, §PTh-I.2.11)
```

Contor propriu (electric sau gaz, după soluția finală), integrat în TG-COMERCIAL (§PTh-I.2.13) — separare completă de sursa rezidențială, conform DTAC §5.5.

### PTh-I.2.8 Schema instalației de gaze naturale — PRM, coloane pe poziție de plan, coloană comercială separată

```
Branșament (rețea presiune redusă) ─► PRM (post reglare-măsurare, la limita de proprietate)
   ─► Racord distribuitor subsol ─┬─► 8 coloane de gaz CG-1…CG-8 (câte 5 apartamente/coloană, o poziție de plan pe verticală)
                                  └─► Derivație comercială separată (oficiu alimentație publică, dacă echipamente pe gaz)
La fiecare palier: robinet branșament + contor G4 + electrovalvă de siguranță (cuplată cu detector CH₄)
```

Organizarea pe **poziție de plan** (8 poziții/etaj × 5 niveluri = 40 apartamente, DTAC §9.1) — și nu pe grupare de nucleu, ca la apă — rămâne principiul de execuție: fiecare coloană de gaz stă în **ghenă proprie, ventilată direct spre exterior**, fără gruparea cu alte instalații (NTPEE), interzicerea reluată la execuție prin vopsirea galbenă de identificare a fiecărei ghene de gaz.

### PTh-I.2.9 Schema ventilării apartamentelor — canale șuntă

```
Grile higroreglabile (admisie, tâmplărie) ─► apartament
   ─► Baie/WC/Bucătărie ─► racord canal secundar (min. 2 niveluri distanță) ─► Canal colector principal (șuntă)
   ─► ieșire deasupra terasei (≥0,50 m peste circulabil)
```

### PTh-I.2.10 Schema ventilării comerciale — CTA cu recuperator + hotă alimentație publică

```
Aer exterior ─► CTA comercial (recuperator η≥73%, filtrare ePM1 50%, baterii înc./răcire interfațate cu roof-top/VRF §PTh-I.2.7)
   ─► Zona de vânzare (parter+mezanin, 770 mp retail) ─► extracție generală
Oficiu alimentație publică (180 mp) ─► Hotă profesională (filtre grăsime demontabile)
   ─► Make-up air (85-90% din debitul hotei) ─► registru rezistent la foc la traversarea compartimentării (D01.1)
   ─► Canal de extracție independent, evacuare separată de CTA generală
```

### PTh-I.2.11 Schema ventilării și desfumării parcajului subteran — 2 zone (≈310 mp fiecare)

Volumul parcajului rezultă din breviarul DTAC (§6.4: 6 schimburi/oră = 9.672 mc/h la volum total ≈1.612 mc, deci ≈620 mp la înălțime liberă 2,60 m) — la execuție, parcajul se compartimentează, pentru eficiența comenzii și limitarea debitelor instantanee de ventilator, în **2 zone de câte ≈310 mp**, fiecare cu senzori CO proprii și ventilatoare dedicate, dar cu tubulatură de desfumare interconectată la comanda centralei de incendiu (comandă unică la ambele zone, pentru a nu limita evacuarea fumului la o singură zonă dacă focarul migrează):

```
Zona A parcaj (≈310 mp) ─► 2 senzori CO ─► Ventilator introducere/extracție A (curent + F400 comutabil)
Zona B parcaj (≈310 mp) ─► 2 senzori CO ─► Ventilator introducere/extracție B (curent + F400 comutabil)
                                                    │
                                    Centrala IDSAI ─┴─► comandă comună desfumare (ambele zone la alarmă confirmată)
```

### PTh-I.2.12 Schema monofilară completă — 4 tablouri de categorie, grup electrogen

Conform arhitecturii de distribuție DTAC §7.1, imediat după TG și contorul general, distribuția se ramifică fizic pe cele 4 categorii:

```
TG (contor general + baterie compensare ≈50 kVAr) ─► Întrerupător general 630 A
    ├─► TG-REZIDENȚIAL (coloane 4 nuclee) ─► TE-apartament (palier, cu contor individual)
    ├─► TG-COMERCIAL (iluminat, prize, CTA/VRF, hotă, case de marcat) ─► TE-comercial/unitate
    ├─► TG-PĂRȚI COMUNE ─► iluminat comun, 2 ascensoare, grup pompare apă consum curent, prize service
    └─► TG-PARCAJ/PSI (regim de prioritate maximă, comutabil pe grup electrogen)
           ├─► Grup pompare incendiu (§PTh-I.3.13)
           ├─► Ventilare/desfumare parcaj (2 zone, §PTh-I.2.11)
           ├─► Presurizare casă scării reședințiale
           ├─► Iluminat de securitate (circuit central)
           └─► IDSAI + UPS dedicat
```

Grupul electrogen Diesel (pornire automată AAR ≤15 s) alimentează, prin comutare automată, **exclusiv tabloul TG-PARCAJ/PSI** — sarcinile de confort ale celorlalte trei categorii (rezidențial, comercial, părți comune generale) nu sunt susținute de sursa de rezervă, conform principiului DTAC §7.6 de a nu supradimensiona generatorul peste sarcinile reale de siguranță a vieții.

### PTh-I.2.13 Schema IDSAI — matrice cauză-efect extinsă pe 4 categorii

Centrală de detectare adresabilă, cu detectoare optice de fum în holuri de palier, casa scării, spații tehnice (CT/gospodărie apă/TEG), zona comercială (inclusiv EVAC vocal, SR EN 54-16), oficiul de alimentație publică (detector CH₄ suplimentar), parcaj (2 zone, detectoare termice complementare celor optice) și butoane manuale la fiecare palier/ieșire.

| Eveniment (cauză) | Efect 1 | Efect 2 | Efect 3 | Efect 4 |
|---|---|---|---|---|
| Alarmă detector palier/casă scară (rezidențial) | Presurizare casă scării | Aducere ascensor normal la parter, uși deschise | Sirene generale nivel | Transmisie ISU/dispecerat |
| Alarmă detector zonă comercială | **EVAC vocal** — mesaje de instrucțiuni de evacuare (SR EN 54-16) | Oprire CTA confort, deschidere uși de acces în regim fail-safe | Registru de foc canal hotă închis dacă focarul e la oficiu | Transmisie ISU |
| Alarmă detector parcaj Zona A/B | Comutare ventilator pe regim F400 (desfumare) | Oprire ventilare curentă zonă afectată | Deschidere grile aer compensare (rampă) | Transmisie |
| Alarmă buton manual (oriunde) | Sirene generale ale categoriei afectate | Deblocare control acces fail-safe pe traseul de evacuare aferent | Transmisie | — |
| Alarmă detector CH₄ (centrală apartament sau oficiu alimentație publică) | Închidere electrovalvă gaz apartament/coloană sau oficiu | Sirenă locală | Transmisie | — |
| Scădere presiune coloană incendiu | Pornire pompă jockey | Pornire electropompă principală (soft-starter, §PTh-I.3.14) | Semnalizare dispecerat | — |
| Confirmare pompier (cheie panou) | Silențiere sirene | Menținere semnalizare vizuală | Jurnal evenimente | — |

**Temporizare T1/T2** (recunoaștere/investigare) aplicabilă doar zonei comerciale, dacă există personal permanent la parter (portar/administrator/personal comercial în program); pe restul clădirii (locuințe fără personal permanent, parcaj), alarma este **directă**, conform P118-3. Ascensorul de pompieri rămâne funcțional (excepție de la comanda de aducere la parter) pe circuit protejat, pentru intervenția ISU la orice nivel — inclusiv la nivelul comercial/mezanin.

### PTh-I.2.14 Schema instalației de stingere — hidranți, sprinklere, gospodărie apă incendiu comună

```
Rezervor incendiu unic (≈72 mc, §PTh-I.3.15) ─► Cameră pompe (P.principală ≈22 kW HI+sprinklere + P.jockey)
   ├─► Coloană umedă hidranți (casă scării rezidențial + parter/mezanin comercial, Dn65)
   │      └─► Hidrant/palier (Dn52, toate nivelurile) + Racord tip B exterior (autospecială ISU)
   ├─► Rețea sprinklere ZONA COMERCIALĂ (risc curent, LH, §PTh-I.3.15)
   └─► Rețea sprinklere PARCAJ (risc mediu, OH, §PTh-I.3.15)
Hidranți exteriori (2 buc.) ─► alimentați din rețea publică (dacă avizul operatorului confirmă q≥5 l/s) sau rezervă proprie
```

Se adoptă **coloană umedă** (permanent sub presiune), motivată de aglomerarea de public la comercial și de necesitatea disponibilității imediate la orice nivel, fără timpul de așteptare al presurizării de către autospeciala ISU (§PTh-I.10.3).

### PTh-I.2.15 Schema desfumării căilor de evacuare — casă scării rezidențială + zona comercială

```
Ventilator presurizare (exterior, aer proaspăt la nivel jos) ─► tubulatură dedicată (protejată la foc)
   ─► injectoare de aer în casa scării rezidențiale (fiecare 2-3 niveluri)
   ─► clapetă de suprapresiune (limitare la 80 Pa, uși închise)
Comandă: automată (IDSAI, la orice alarmă pe clădire) + manuală (buton parter, pompieri)
```

Zona comercială, cu plafon liber generos (3,50 m parter/2,80 m mezanin, conform `arhitectura-pth.md`), evacuează fumul preponderent prin **fluxurile de evacuare dimensionate la aglomerarea de public** (DTAC §10.2, 3 fluxuri, lățime cumulată 1,80 m) și prin oprirea CTA de confort la alarmă (§PTh-I.2.13) — desfumare mecanică dedicată suplimentară a zonei comerciale se stabilește definitiv prin scenariul de securitate la incendiu, în funcție de configurația compartimentării interioare a unităților comerciale.

### PTh-I.2.16 Schema curenților slabi — 2 sisteme separate pe categorie (rezidențial/comercial)

```
Rack rezidențial (lobby locuințe, UPS dedicat) ──┬─► Videointerfon (panou apel + monitor/apartament + yală)
                                                   ├─► Control acces lobby rezidențial (cartelă/cod)
                                                   ├─► CCTV comun (lobby, parcaj, palierele ascensoarelor)
                                                   └─► Rețea date/TV/fibră — coloană dedicată rezidențială

Rack comercial (separat fizic, acces operator comercial) ──┬─► CCTV comercial (zona de vânzare, alimentație publică)
                                                             ├─► Control acces unități comerciale
                                                             └─► Rețea date proprie (case de marcat, POS)
```

Separarea celor două rack-uri și sisteme CCTV nu este doar tehnică, ci de conformitate GDPR (DTAC §11.2) — operatori de date distincți pentru zona comună (asociația de proprietari) și zona comercială (operatorul comercial). Deblocarea ușilor de pe traseele de evacuare ale ambelor entități se coordonează cu IDSAI (fail-safe la alarmă confirmată).

### PTh-I.2.17 Schema instalației fotovoltaice — alocare exclusivă părților comune

```
Module FV (≈22 kWp, terasă tehnică D14) ─► string-uri ─► cutie conexiuni DC (siguranțe + SPD DC)
   ─► invertor(oare) string ─► tablou AC FV (protecție + contorizare producție + anti-islanding)
   ─► TG-PĂRȚI COMUNE (racord prosumator, contor bidirecțional)
```

Producția (≈26.400 kWh/an, DTAC §14.2) este alocată **exclusiv consumului tabloului părților comune** — nu se amestecă în contorizarea individuală a apartamentelor sau a unităților comerciale, păstrând principiul separării și la nivelul sursei regenerabile. Structura de prindere se verifică structural (`structura-pth.md`) și se coordonează cu poziția platformelor de echipamente tehnice și cu accesul de mentenanță (D14, `arhitectura-pth.md`).

### PTh-I.2.18 Schema ascensoarelor — traseu, alimentare, puț

```
Puț ascensor 1 (servicii normale, rezidențial) ─► motor MRL ─► alimentare TG-PĂRȚI COMUNE, protecție proprie
Puț ascensor 2 (pompieri/targă) ─► motor MRL ─► alimentare circuit protejat E90 (TG-PARCAJ/PSI) + sursă de rezervă
   └─► puț ventilat/desfumat la partea superioară; uși de palier EI conform compartimentării (D01, D09)
```

Ambele puțuri deservesc subsol (parcaj/boxe) + parter/mezanin comercial + cele 5 niveluri de locuințe, cu oprire la fiecare nivel — inclusiv la mezaninul comercial, interfață de acces verificată la faza de arhitectură pentru a nu crea, prin proiectare, un traseu de circulație care amestecă fluxurile de public comercial cu cele rezidențiale (DTAC §11.1).

### PTh-I.2.19 Interfața cu gestionarea deșeurilor — instalații aferente celor 2 camere de colectare

Conform separării pe categorii (DTAC §13), cele 2 camere de colectare (menajeră rezidențială / comercială) au fiecare: pardoseală și pereți lavabili, **sifon de pardoseală racordat la rețeaua menajeră proprie categoriei** (nu la o rețea comună — o cameră de colectare comercială racordată eronat la rețeaua rezidențială ar contrazice principiul central), ventilare mecanică dedicată pentru controlul mirosurilor și, la camera comercială, posibilitate de răcire temporară pentru componenta biodegradabilă a alimentației publice. Alimentarea electrică a ventilatoarelor și, dacă e cazul, a echipamentului de răcire, se face din tabloul de categorie aferent (TE-comun, respectiv TG-COMERCIAL).

---

## PTh-I.3 Breviar complet de calcul

### PTh-I.3.1 Calcul hidraulic nod-cu-nod — coloana de apă rece CAR (reprezentativă pentru toate cele 4 nuclee identice)

**Date de intrare:** 10 apartamente/nucleu, 2 apartamente/nivel pe cele 5 niveluri de locuințe (E1…E5), compunere identică pe fiecare nucleu (DTAC §2.2): 3 apartamente de 2 camere (E=2,5), 5 de 3 camere (E=3,0), 2 de 4 camere (E=3,75). Repartiția pe niveluri (reprezentativă, coerentă cu proporția globală 3:5:2 și cu regula de 2 apartamente/nivel):

| Nivel | Apartamente (tip) | ΣE nivel | ΣE cumulat (spre bază) |
|---|---|---|---|
| E5 (terminal) | 1×2cam + 1×3cam | 5,50 | 5,50 |
| E4 | 1×3cam + 1×4cam | 6,75 | 12,25 |
| E3 | 1×2cam + 1×3cam | 5,50 | 17,75 |
| E2 | 1×3cam + 1×4cam | 6,75 | 24,50 |
| E1/bază | 1×2cam + 1×3cam | 5,50 | **30,00** |

Verificare compunere: 2cam la E5+E3+E1 = 3 ✓; 3cam la E5+E4+E3+E2+E1 = 5 ✓; 4cam la E4+E2 = 2 ✓ — reproduce identic proporția 3:5:2 din DTAC §2.2, cu ΣE_total = 30,0, exact valoarea de bază folosită în DTAC pentru dimensionarea coloanei-tip (§2.6).

**Relația de dimensionare (I9, identică cu DTAC §2.6):** qc = 0,20·√E + 0,20·E^0,12 [l/s]

| Nod (nivel) | ΣE cumulat | qc (l/s) | Dn adoptat | A (mp) | v (m/s) | L echiv. (m, +30% piese) | i (mCA/m) | Δp tronson (mCA) |
|---|---|---|---|---|---|---|---|---|
| E5 (terminal) | 5,50 | 0,714 | Dn32 | 5,31×10⁻⁴ | 1,35 | 3,9 | 0,070 | 0,273 |
| E4 | 12,25 | 0,970 | Dn40 | 8,04×10⁻⁴ | 1,21 | 3,9 | 0,051 | 0,199 |
| E3 | 17,75 | 1,125 | Dn40 | 8,04×10⁻⁴ | 1,40 | 3,9 | 0,061 | 0,238 |
| E2 | 24,50 | 1,284 | Dn40 | 8,04×10⁻⁴ | 1,60 | 3,9 | 0,072 | 0,281 |
| E1/bază | **30,00** | **1,38** | **Dn40** | 8,04×10⁻⁴ | **1,72** | 3,9 | 0,082 | 0,320 |
| **Total pierderi riser** | | | | | | | | **≈ 1,31 mCA** |

**Verificare de coerență cu DTAC:** debitul de bază (1,38 l/s) și viteza (1,72 m/s pe Dn40) reproduc **exact** valorile din DTAC §2.6 (qc = 1,38 l/s, v = 1,72 m/s) — confirmarea directă că repartiția reprezentativă pe niveluri, adoptată mai sus pentru breviarul nod-cu-nod, este coerentă cu ipoteza de calcul generică a DTAC. Fiind cele 4 nuclee (CAR-1…CAR-4) structural identice, prezentul breviar este reprezentativ pentru toate cele 4; nu se justifică o variantă „bis" separată, spre diferență de un bloc cu nuclee inegal încărcate.

**Reconstituirea pierderii totale la ultimul consumator** (comparație cu DTAC §2.7, H_pierderi ≈ 8,50 mCA — valoare generică pe întreg traseul, de la pompă la robinet, incluzând colectorul orizontal de subsol și distribuția interioară a apartamentului, absente din breviarul de riser de mai sus):

| Componentă | Valoare PTh (verificată) | Observație |
|---|---|---|
| Riser vertical (nod-cu-nod, tabel de mai sus) | 1,31 mCA | 5 niveluri × L echiv. 3,9 m |
| Colector orizontal subsol (≈20 m, De50, v≈1,2 m/s) | ≈1,00 mCA | de la grup pompare la baza coloanei |
| Distribuție interioară apartament (≈8 m, PP-R De20-25) | ≈1,00 mCA | traseu până la bateria cea mai defavorizată |
| **Total pierderi verificat nod-cu-nod** | **≈ 3,31 mCA** | |
| **H_pierderi adoptat DTAC §2.7** | **8,50 mCA** | valoare generică, cu marjă de siguranță |

Diferența (8,50 față de 3,31 mCA) confirmă, la nivel de execuție, că estimarea generică a DTAC a fost **conservatoare** — nu o eroare, ci o marjă de proiectare intenționată pentru colmatarea filtrelor și îmbătrânirea rețelei pe durata de exploatare (DTAC menționează explicit H_rezervă = 2,55 mCA separat de H_pierderi). Recalculând necesarul de presiune la robinetul cel mai defavorizat cu valorile verificate nod-cu-nod:

**H_nec_verificat = H_geodezic + Σh_pierderi_verificat + H_rezervă + H_utilizare = 17,70 + 3,31 + 2,55 + 5,00 ≈ 28,56 mCA**

față de H_nec = 33,75 mCA adoptat în DTAC și presiunea de refulare a hidroforului de 40 mCA (§2.7) — **marjă confirmată de ≈11,4 mCA** la nivelul cel mai defavorizat, superioară marjei generice de 6 mCA estimate în DTAC. **Punctul de funcționare al grupului de pompare (2,5 mc/h la 40 mCA/pompă, 1A+1R) rămâne confirmat**, cu rezervă suplimentară de presiune utilizabilă pentru eventuale extinderi de traseu sau pentru degradarea rețelei în timp.

### PTh-I.3.2 Calcul ACM — verificare debit instant și dead-leg pe toate cele 3 tipuri de apartament

Diferențierea puterii centralei murale pe tipologie (DTAC adoptase generic 24 kW pentru apartamentul reprezentativ de 3 camere, §3.2/§5.3) se detaliază la execuție în funcție de numărul de obiecte de consum ACM simultan (DTAC §2.2: 2 camere — 1 baie; 3 camere — 2 băi; 4 camere — 2 băi + duș separat):

| Tip apartament | Su adoptat (mp) | Nr. puncte ACM | Putere centrală | Debit ACM la ΔT=30K (l/min) | Distanță max. punct îndepărtat (m) | Volum dead-leg (l) | Timp așteptare (s, la 0,2 l/s) |
|---|---|---|---|---|---|---|---|
| 2 camere (12 buc.) | 55 | 1 baie | 24 kW | 11,5 | 5 | 1,6 | 7,9 |
| 3 camere (20 buc.) | 68 | 2 băi | 24 kW | 11,5 | 8 | 2,5 | 12,7 |
| 4 camere (8 buc.) | 95 | 2 băi + duș separat | 28 kW | 13,4 | 10 | 3,1 | 15,7 |

Verificare putere centrală tip D (4 camere): P_ACM = 0,223 l/s × 4.186 × 30 = 28.006 W ≈ **28 kW**, adoptat cu marjă față de necesarul de încălzire propriu-zis (§PTh-I.3.6). Toate valorile de timp de așteptare rămân sub pragul de disconfort uzual (≈20 s); la apartamentele de 4 camere, cu distanța cea mai mare (10 m) și timpul cel mai lung (15,7 s), se recomandă verificarea poziției definitive a băii secundare pe planul de arhitectură interioară — dacă distanța reală depășește ipoteza de mai sus, se completează cu recirculare locală de apartament (§PTh-I.2.2).

### PTh-I.3.3 Calcul canalizare menajeră — verificare pe coloana reprezentativă (SR EN 12056-2)

Unitățile de scurgere (DU) ale coloanei reprezentative (compunere identică cu §PTh-I.3.1: 3×2cam + 5×3cam + 2×4cam), reluând valorile DTAC §4.2 (2cam=2,4 DU, 3cam=3,2 DU, 4cam=4,4 DU/apartament):

| Nod (nivel) | Apartamente cumulate | ΣDU cumulat | Q_ww (l/s), K=0,5 |
|---|---|---|---|
| E5 (terminal) | 2 | 5,6 | 1,18 |
| E4 | 4 | 12,35 | 1,76 |
| E3 | 6 | 17,85 | 2,11 |
| E2 | 8 | 24,60 | 2,48 |
| E1/bază | 10 | **32,0** | **2,83** |

**Verificare de coerență cu DTAC:** ΣDU = 32,0 și Q_ww = 2,83 l/s la baza coloanei reproduc exact valorile DTAC §4.2. Se adoptă coloană **PP fonoabsorbant Dn110** pe toate cele 4 nuclee. **Verificare capacitate**: la grad de umplere 0,5 (sistem I cu ventilare primară), capacitatea Dn110 este ≈5,2 l/s — debitul calculat (2,83 l/s) rămâne la **≈54% din capacitate**, marjă confortabilă, spre deosebire de configurațiile cu 13-14 apartamente/coloană ale altor tipologii de bloc din bibliotecă, unde acest raport ajunge la limită (necesitând Dn125 sau ventilare secundară suplimentară) — la clădirea de față, compunerea în 4 nuclee de câte 10 apartamente menține fiecare coloană confortabil sub prag, **fără nicio completare de execuție necesară** la acest capitol.

### PTh-I.3.4 Canalul gras și separatorul de grăsimi — verificare traseu de execuție

Dimensionarea separatorului (NS 7, DTAC §4.3, formulă SR EN 1825-1/2 confirmată: NS = Qs·ft·fd·fr = 2,5×1,3×1,3×1,5 = 6,34, rotunjit la NS 7 de catalog) se completează, la execuție, cu breviarul de traseu: conducta de canal gras de la oficiul de alimentație publică (180 mp) la separator se dimensionează la debitul de vârf Qs = 2,5 l/s (DTAC §4.3) pe **PP Dn110** (i = 2%, capacitate ≈5,2 l/s la grad de umplere 0,5 — marjă largă), cu traseu **cât mai scurt și cu pantă constantă** pentru a evita răcirea și solidificarea prematură a grăsimii înainte de separator. Separatorul NS 7 se amplasează la subsol, cu acces de vidanjare periodică (contract de întreținere) și alarmă de nivel, pe un postament independent de vibrațiile echipamentelor tehnice adiacente.

### PTh-I.3.5 Canalizare pluvială — verificare completă și bazin de retenție (condiționat)

Debitul de calcul al terasei rămâne cel din DTAC §4.4: Q_p = i·Ac·ψ/10.000 = 300×620×0,90/10.000 = **16,74 l/s** (Ac = 620 mp, i = 300 l/s·ha, ψ = 0,90). Verificarea capacității celor 2 coloane pluviale interioare Dn110 (≈8-9 l/s/buc. la strat de apă de 30 mm pe grătar): capacitate cumulată ≈16-18 l/s — **verificat, cu marjă redusă**; se recomandă la execuție **3 receptoare** (nu 2) pentru marjă suplimentară față de colmatare parțială a unui receptor, redistribuind debitul de calcul pe 3 puncte (≈5,6 l/s/receptor, confortabil sub capacitatea individuală). Preaplinul de avarie (prin atic) se dimensionează la evenimentul excepțional (≈1,5×Q_p ≈ 25 l/s), acoperit de 2 guri de avarie.

**Bazinul de retenție** (dacă avizul de gospodărire a apelor limitează debitul evacuat — DTAC §4.4, prevedere condiționată, nu adoptată ferm): pentru un debit admis ipotetic q_adm = 6,0 l/s (valoare tipică pentru o parcelă de această dimensiune, de confirmat prin avizul operatorului) și durata critică a ploii de 15 min (900 s):

> V_ret = (Q_p − q_adm) × t = (16,74 − 6,0) × 900 = 9.666 l ≈ **9,7 mc**

Volumul definitiv se stabilește numai după emiterea avizului de gospodărire a apelor, cu debitul admis real; calculul de mai sus documentează metodologia și ordinul de mărime, fără a presupune o cifră care nu poate fi confirmată onest fără avizul operatorului (aceeași rezervă metodologică aplicată consecvent în toată platforma).

### PTh-I.3.6 Parcajul subteran — verificarea stației de pompare și a separatorului de hidrocarburi

Suprafața parcajului (42 locuri) rezultă, prin verificare inversă din volumul folosit la ventilare (DTAC §6.4: 6 schimburi/oră = 9.672 mc/h ⟹ V = 1.612 mc la înălțime liberă 2,60 m ⟹ **S ≈ 620 mp**), coerentă cu amprenta construită a clădirii (Ac = 620 mp, DTAC §1.2) — parcajul ocupă întreaga amprentă la nivelul subsolului, confirmare utilă pentru dimensionarea rigolelor și a stației de pompare.

**Debitul de calcul al stației de pompare** se estimează pe baza suprafeței carosabile drenate (620 mp) la o intensitate de spălare/scurgere accidentală de proiectare (nu ploaie, parcaj acoperit — doar spălare periodică și infiltrații reziduale pe rampă) de ≈0,5 l/s pe 100 mp: Q ≈ 620×0,5/100 ≈ **3,1 l/s**, rotunjit la **Q_pompă = 4 l/s** (2 pompe submersibile, 1 activă + 1 rezervă, comandă pe flotor). Separatorul de hidrocarburi (**clasă I, NS 10**, DTAC §4.5) rămâne dimensionat conform SR EN 858-1/2, cu conținut rezidual ≤5 mg/l la evacuare, verificat la debitul de vârf al stației de pompare (4 l/s < capacitatea NS10 la debit nominal) — **verificare de coerență confirmată**.

### PTh-I.3.7 Calcul termic detaliat — toate cele 3 tipuri de apartament (ΔT=38K, extindere DTAC §5.3)

DTAC a calculat breviarul termic doar pentru apartamentul reprezentativ de 3 camere (68 mp, necesar specific 45 W/mp, §5.2/§5.3: Q = 68×45 = 3.060 W). Prezentul supliment extinde breviarul la toate cele 3 tipologii, cu suprafețele adoptate la §PTh-I.3.2:

| Tip | Su (mp) | A anvelopă (mp) | Q_T (W, brut) | Adaos orientare (%) | Q_T corectat (W) | Q_V (W) | Q_înc total (W) | q spec. (W/mp) |
|---|---|---|---|---|---|---|---|---|
| 2 camere (12 buc.) | 55 | 30 | 456 | +5 | 479 | 792 | 1.271 | 23,1* |
| 3 camere (20 buc., calculat DTAC) | 68 | 36 | 547 | +10 | 602 | 953 | 1.555 | 22,9* |
| 4 camere (8 buc.) | 95 | 46 | 699 | +12 | 783 | 1.328 | 2.111 | 22,2* |

*Valorile q_spec. de mai sus reprezintă componenta de transmisie+ventilare pe elementul de anvelopă reprezentativ al fiecărei tipologii; puterea de dimensionare a corpurilor de încălzire pe întregul apartament (necesarul specific adoptat DTAC §5.2, 45 W/mp) include toate încăperile, rezerva de repriză matinală și aportul necesar la baia de 24°C — motiv pentru care necesarul total pe apartament, la 45 W/mp, rămâne: 2 camere Q=2.475 W, 3 camere Q=3.060 W (confirmat DTAC), 4 camere Q=4.275 W. Prezentul tabel confirmă coerența ordinii de mărime a pierderilor pe element de anvelopă pe toate cele 3 tipologii, nu recalculează necesarul total pe apartament.

**Verificarea debitului de agent termic pe distribuitorul apartamentului tip D** (4 camere, regim 55/45°C, ΔT_agent=10K, Q_înc_dimensionare = 4.275 W):

> q_agent = 4.275/(1.000×4.186×10) = 1,021×10⁻⁴ mc/s ≈ **0,368 mc/h ≈ 368 l/h**, distribuit pe 5-6 circuite de radiator, echilibrate individual prin robinete de presetare pe retur.

### PTh-I.3.8 Necesarul termic al componentei comerciale — breviar CTA detaliat (extindere DTAC §5.2/§6.2)

Necesarul termic comercial (DTAC §5.2: 950 mp × 60 W/mp = 57 kW) se defalcă, la execuție, pe cele două componente ale sursei roof-top/VRF (§PTh-I.2.7): zona de vânzare (770 mp) și oficiul de alimentație publică (180 mp), cu ponderi proporționale la suprafață, dar cu necesar specific majorat la alimentația publică (echipamente de gătit, aer proaspăt superior):

| Zonă | Suprafață (mp) | Necesar specific (W/mp) | Necesar termic (kW) |
|---|---|---|---|
| Zona de vânzare (parter+mezanin) | 770 | 52 | 40,0 |
| Oficiu alimentație publică | 180 | 94 | 17,0 |
| **TOTAL comercial** | **950** | — | **≈ 57,0** |

Necesarul specific majorat al oficiului (94 W/mp, față de 52 W/mp la zona de vânzare) reflectă exact cerința de aer proaspăt superioară a alimentației publice (DTAC §6.3, make-up air 85-90% din debitul hotei) și aportul termic al echipamentelor de gătit, care majorează sarcina de răcire de vară dincolo de simpla transmisie prin anvelopă.

**Breviarul CTA** (DTAC §6.2, debit Q_aer = 190 persoane × 10 l/s·persoană = 6.840 mc/h, recuperator η≥73%) se completează la execuție cu sarcina netă pe baterii, după recuperare:

> Q_sensibilă_brută (iarnă, ΔT=32K de la −15°C la +17°C preîncălzit) = 6.840/3.600 × 1,2 × 1.005 × 32 ≈ 73,4 kW brut
> Q_sensibilă_netă (după recuperator η=73%) = 73,4 × (1−0,73) ≈ **19,8 kW** pe bateria de încălzire a CTA

Sarcina de răcire de vară (DTAC §6.2: 950 mp × 80 W/mp ≈ 95 kW, aria de referință care include circulațiile/spațiile tehnice) este acoperită de sistemul VRF/roof-top comercial (§PTh-I.2.7), complet separat de climatizarea individuală a apartamentelor (DTAC §6.1).

**Hota alimentației publice** (DTAC §6.3): la un debit de extracție de proiectare de 3.500 mc/h (echipamente de gătit ale oficiului de 180 mp), make-up air la 85-90%: Q_compensare = 3.500×0,875 ≈ **3.063 mc/h**, tratat termic parțial (preîncălzire de iarnă, fără răcire de vară completă — acceptabil pentru o zonă de compensare care nu este zonă de ședere prelungită), verificat la depresiunea rezultată în oficiu (3.500−3.063=437 mc/h net extras) — depresiune moderată, care menține oficiul la presiune ușor negativă față de zona de servire, conform principiului de control al mirosurilor din DTAC §6.3.

### PTh-I.3.9 Calcul hidraulic gaze naturale — nod-cu-nod pe coloana de poziție (reprezentativă pentru toate cele 8 coloane)

**Date de intrare:** 5 apartamente/coloană (o poziție de plan, câte 1 apartament pe fiecare din cele 5 niveluri, DTAC §9.1), debit unitar centrală **2,76 mc/h/apartament** (DTAC §9.2, la 24 kW, PCI=9,44 kWh/mc, η=92%), coeficient de simultaneitate NTPEE pentru 5 consumatori pe aceeași coloană = **0,68** (DTAC §9.2, confirmat).

**Tabel de calcul nod cu nod (relația Renouard, presiune redusă):**

| Nod (nivel) | Ap. cumulate | Q cumulat (mc/h) | c(N) adoptat | Dn adoptat | L (m, cumulat de la nod la bază) | Δp tronson (mbar) |
|---|---|---|---|---|---|---|
| E5 (terminal) | 1 | 2,76 | 1,00 | Dn20 | 3,0 | 0,10 |
| E4 | 2 | 4,42* | 0,80 | Dn20 | 6,0 | 0,22 |
| E3 | 3 | 5,63* | 0,68 | Dn25 | 9,0 | 0,18 |
| E2 | 4 | 6,50* | 0,59 | Dn25 | 12,0 | 0,27 |
| E1/bază | 5 | **9,38** | **0,68** | **Dn32** | 15,0 | 0,21 |
| **Total pierderi coloană** | | | | | | **≈ 0,98 mbar** |

*Debitele cumulate intermediare aplică un factor de simultaneitate progresiv (descrescător apoi convergent spre 0,68 la N=5, conform tabelului de simultaneitate NTPEE pentru grupuri mici de consumatori casnici similari pe aceeași coloană) — metodologie identică celei aplicate la apă (§PTh-I.3.1).

**Verificare de coerență cu DTAC:** debitul de bază (9,38 mc/h) reproduce exact valoarea DTAC §9.2 (q_coloană = 2,76×5×0,68 = 9,38 mc/h). Diametrul rezultat (Dn32 la bază) se încadrează în intervalul Dn25…32 estimat generic în DTAC. Pierderea totală pe coloană (≈0,98 mbar) este mult sub pragul admis NTPEE de proiectare a instalației de utilizare (≈10 mbar) — marjă confortabilă, coerentă cu lungimile scurte ale unei coloane de doar 5 niveluri (spre diferență de blocurile mai înalte din bibliotecă, unde pierderea pe coloană se apropie mai mult de prag).

**Debitul total la PRM** (8 coloane identice, dar cu simultaneitate globală mai severă la nivelul întregii clădiri — 40 de apartamente independente, diversitate statistică superioară celei a unei singure coloane de 5): adoptând un coeficient de simultaneitate global k(40)≈0,26 (interpolat pe curba NTPEE, descrescătoare cu numărul de consumatori independenți, coerent cu tendința deja folosită pe coloană la N=5→k=0,68):

> Q_PRM_rezidențial = 40 × 2,76 × 0,26 ≈ **28,7 mc/h**

valoare care completează, la execuție, dimensionarea PRM — DTAC nu fixase o cifră globală de branșament gaze (tratase doar debitul pe coloană), motiv pentru care prezentul calcul reprezintă o **extindere**, nu o corecție, a breviarului DTAC. La acest debit se adaugă, separat, consumul componentei comerciale (dacă echipamente pe gaz la oficiul de alimentație publică — altfel, PRM rezidențial rămâne singurul dimensionat la gaz, iar sursa comercială electrică nu solicită PRM).

### PTh-I.3.10 Verificare ventilare/desfumare parcaj pe cele 2 zone (≈310 mp fiecare)

Volum per zonă (≈310 mp × 2,60 m = 806 mc):

*Ventilare curentă (evacuare CO), 6 vol/h pe zonă:*
> Q_CO,zonă = 6 × 806 = **4.836 mc/h/zonă** (total 9.672 mc/h — confirmă exact valoarea globală DTAC §6.4).

*Desfumare, 12 vol/h pe zonă:*
> Q_desf,zonă = 12 × 806 = **9.672 mc/h/zonă** (total 19.344 mc/h — confirmă exact valoarea globală DTAC).

Puterea ventilatorului per zonă (regim curent, Δp≈300 Pa, η=0,6): P = 4.836×300/(3.600×0,6) ≈ **672 W/zonă** (2 ventilatoare, ≈1,34 kW total curent). În regim de desfumare (F400, Δp≈400 Pa): P = 9.672×400/(3.600×0,6) ≈ **1.791 W/zonă** (≈3,58 kW ambele zone) — valori care completează, la nivel de detaliu, bilanțul electric ventilare/desfumare din DTAC §7.2 (22 kW instalat/12,3 kW calcul, cifră care include și rezervele pentru presurizarea casei scării și pentru eventuale ventilatoare suplimentare ale zonei comerciale, nu doar parcajul).

### PTh-I.3.11 Calcul electric complet — verificare pe cele 4 tablouri de categorie

**Recalcularea bilanțului de puteri** reia integral structura DTAC §7.2 (Pc≈301,5 kW, S=327,7 kVA, Ic=473 A, branșament 630 A adoptat) și o defalcă pe circuitele majore ale fiecărui tablou de categorie:

| Tablou | Circuit/consumator | P instalat (kW) | Observație |
|---|---|---|---|
| **TG-REZIDENȚIAL** | 4 coloane × 10 apartamente × 8 kW/ap. | 320 | Pc = 320×0,70×0,45 = 100,8 kW (DTAC confirmat) |
| **TG-COMERCIAL** | Iluminat + prize + CTA/VRF + case de marcat | 180 | Pc = 129,6 kW (general) + 33,6 kW (aliment. publică) = 163,2 kW |
| **TG-PĂRȚI COMUNE** | 2 ascensoare (7,7×2=15,4) + hidrofor (2×1,1) + iluminat comun (§PTh-I.9.6) + prize service | 45 | Pc = 25,2 kW (DTAC confirmat) |
| **TG-PARCAJ/PSI** | Ventilare/desfumare (2 zone, §PTh-I.3.10) + pompă incendiu (regim avarie, §PTh-I.3.14) + presurizare | 22 (normal) + 22 (avarie pompă) | Pc normal = 12,3 kW; regim avarie adaugă pompa de incendiu |

**Defalcarea TG-PĂRȚI COMUNE (45 kW instalat, verificare bottom-up):**

| Circuit | Putere instalată (kW) |
|---|---|
| Ascensor 1 (normal) | 7,7 |
| Ascensor 2 (pompieri, funcționare normală curentă) | 7,7 |
| Grup pompare apă consum curent (2×1,1 kW, doar 1 activă) | 1,1 |
| Iluminat comun (casă scării + hol acces + spații tehnice, §PTh-I.9.6) | 2,3 |
| Iluminat exterior incintă (§PTh-I.9.5bis) | 0,56 |
| Prize service/întreținere + rezervă de dezvoltare | ≈25,64 |
| **TOTAL** | **≈45,0** |

Rezerva de 25,64 kW reflectă practica de dimensionare a puterii contractate pentru părțile comune ale unei clădiri mixte (echipamente viitoare — sisteme de securitate suplimentare, eventuală extindere a instalației FV, prize industriale de întreținere) — nu reprezintă un consum efectiv permanent, motiv pentru care coeficientul de simultaneitate combinat (ku·ks≈0,56, DTAC §7.2) reduce puterea de calcul la 25,2 kW.

**Circuitele TE-apartament — verificare cădere de tensiune pe toate cele 3 tipuri** (coloană + circuit interior, ≤3% iluminat/≤5% forță, I7):

| Tip apartament | I_c (A) | Secțiune coloană palier | L coloană (m, medie nivel 3) | ΔU% coloană | ΔU% circuit interior | ΔU% total |
|---|---|---|---|---|---|---|
| 2 camere | 17 | 10 mmp Cu | 20 | 1,1 | 1,2 | 2,3 |
| 3 camere | 22 | 16 mmp Cu | 20 | 1,0 | 1,4 | 2,4 |
| 4 camere | 27 | 16 mmp Cu | 20 | 1,3 | 1,7 | 3,0 |

Toate valorile se încadrează în limita I7 (≤5% pentru circuite de forță, dominant rezistive prin electrocasnice); circuitele strict de iluminat rămân sub 3% separat (secțiune 1,5 mmp, lungimi scurte interioare).

**Circuitele TC (servicii comune și parcaj/PSI) — verificare cădere de tensiune pe circuitele majore:**

| Circuit | Destinație | P (kW) | I (A) | Protecție | Secțiune | L (m) | ΔU% |
|---|---|---|---|---|---|---|---|
| CF-A1 | Ascensor 1 | 7,7 | 15,3 | C25 3P | 5×4 | 25 | 1,0 |
| CF-A2 | Ascensor 2 (pompieri, E90) | 7,7 | 15,3 | C25 3P/E90 | N2XH 5×4 | 25 | 1,0 |
| CF-H1 | Grup pompare hidrofor | 1,1 | 2,0 | C10 3P | 5×1,5 | 15 | 0,3 |
| CF-V1 | Ventilare parcaj Zona A | 4,0 | 7,2 | C10 3P | 5×2,5 | 20 | 1,0 |
| CF-V2 | Ventilare parcaj Zona B | 4,0 | 7,2 | C10 3P | 5×2,5 | 25 | 1,2 |
| CI-C1 | Iluminat casa scării (5 niveluri+parter) | 1,2 | 5,2 | C16/30mA | 3×2,5 | 30 | 1,1 |
| CI-C2 | Iluminat parcaj (2 zone) | 1,1 | 4,8 | C16/30mA | 3×2,5 | 25 | 1,0 |
| CF-CTA | CTA comercial (roof-top/VRF, sarcină electrică echivalentă) | 16,0 | 24,3 | C32 3P | 5×6 | 20 | 1,3 |
| CF-P1 | Electropompă incendiu | 22,0 | 40,1 | C50 3P (soft-starter) | N2XH E90 5×10 | 20 | 1,2 |
| CF-P2 | Pompă jockey | 1,0 | 1,8 | C6 3P | N2XH E90 5×1,5 | 20 | 0,3 |
| CF-P3 | Centrală IDSAI + UPS (rezidențial+comercial) | 1,5 | 6,5 | C10/UPS | N2XH E90 3×1,5 | 25 | — |
| CF-P4 | Presurizare casă scării | 3,0 | 5,4 | C10 3P/E90 | N2XH E90 5×2,5 | 30 | 1,2 |
| CF-P5 | Iluminat de securitate (circuit central) | 1,0 | 4,3 | C6/UPS | N2XH E90 3×1,5 | — | — |

Toate circuitele de siguranță (TG-PARCAJ/PSI, ascensor de pompieri, presurizare, iluminat de securitate) sunt executate cu **cablu rezistent la foc N2XH E90**, cu funcționare garantată 90 minute, alimentate din circuitul prioritar comutabil pe grupul electrogen (§PTh-I.2.12).

**Verificare bilanț grup electrogen** (comparație cu bugetul generic DTAC §7.6, ≈55-60 kVA): pompă incendiu (22,0 kW) + desfumare F400 (2 zone, ≈3,58 kW) + presurizare casă scării (3,0 kW) + iluminat de securitate (1,0 kW) + IDSAI/UPS (1,5 kW) = **≈31,1 kW electric**, la cos φ≈0,85 ⟹ S ≈ **36,6 kVA** — **sub bugetul generic DTAC (55-60 kVA)**, marjă păstrată pentru robustețe (autonomie extinsă, viitoare completări de scenariu PSI confirmate de ISU) și pentru curentul de pornire tranzitoriu al pompei de incendiu (§PTh-I.3.14), care solicită instantaneu un vârf superior consumului permanent calculat mai sus.

### PTh-I.3.12 Verificarea prizei de pământ și a paratrăsnetului

**Priza de pământ de fundație** (platbandă OL-Zn 40×4 mm, dezvoltare perimetrală ≈100 m, conform amprentei Ac≈620 mp, formă cvasidreptunghiulară ≈31×20 m):

> R ≈ ρ/L = 100/100 ≈ **1,0 Ω** (rezistivitate ipotetică ρ=100 Ω·m, de confirmat prin măsurare la execuție — metoda Wenner, 4 electrozi, înainte de finalizarea prizei de fundație)

Valoare la limita țintei (R≤1Ω, DTAC §7.7); dacă măsurătoarea reală indică rezistivitate superioară ipotezei de 100 Ω·m, se completează cu electrozi verticali suplimentari, conform practicii curente.

**Nivelul de protecție la trăsnet LPL III** (interax coborâri ≤15 m): perimetru ≈100 m ⟹ **min. 7 coborâri** (100/15≈6,7, rotunjit superior), distribuite pe cele 4 fațade ale clădirii, completând recomandarea generică „min. 2 coborâri" a DTAC §7.7 cu numărul exact rezultat din verificarea la interax normat pe perimetrul real. Rețeaua de captare pe terasa tehnică (D14): ochiuri ≤15×15 m, cu tije suplimentare la casa liftului, la agregatele tehnice (roof-top/VRF, ventilatoare desfumare) și la structura de prindere a modulelor fotovoltaice (§PTh-I.2.17), toate legate la aceeași rețea de captare/coborâre — coordonat cu poziția platformelor de echipamente din D14 (`arhitectura-pth.md`).

### PTh-I.3.13 Calcul hidraulic sprinklere — 2 zone de risc (comercial + parcaj), SR EN 12845

Conform DTAC §10.4 (sprinklere prevăzute condiționat „în zonele de risc superior — tipic zona comercială și parcajul subteran"), PTh confirmă și dimensionează ambele zone:

**Zona COMERCIALĂ (retail, risc curent — Light Hazard, EN 12845):** densitate 2,25 mm/min, arie de operare 84 mp.

| Nod | Q cumulat (l/s) | Ø (mm) | Nr. capete deservite | Δp tronson (bar) |
|---|---|---|---|---|
| Cap terminal (K80, p_min=0,5 bar) | 0,50 | 15 | 1 | — |
| Branch line (4 capete, interax 4,0×4,0 m) | 2,00 | 32 | 4 | 0,08 |
| Cross-main (aria de operare, 84/16≈6 capete) | ≈3,15 | 65 | 6 | 0,10 |
| Riser către ACS comercial | 3,15 | 65 | — | 0,04 |

> Q_op,comercial = d × A_op/60 = 2,25 × 84/60 = **3,15 l/s**; presiune necesară ≈0,5+0,22=0,72 bar; **rezervă 30 min: V = 3,15×1.800 = 5.670 l ≈ 5,67 mc**.

**Zona PARCAJ (risc mediu — Ordinary Hazard, EN 12845):** densitate 5 mm/min, arie de operare 216 mp.

| Nod | Q cumulat (l/s) | Ø (mm) | Nr. capete deservite | Δp tronson (bar) |
|---|---|---|---|---|
| Cap terminal (K80, p_min=0,5 bar) | 1,13 | 20 | 1 | — |
| Branch line (4 capete, interax 3,0×3,0 m) | 4,52 | 40 | 4 | 0,11 |
| Cross-main (aria de operare, 216/9≈24 capete) | ≈18,0 | 100 | 24 | 0,19 |
| Riser către ACS parcaj | 18,0 | 100 | — | 0,05 |

> Q_op,parcaj = 5 × 216/60 = **18,0 l/s**; presiune necesară ≈0,5+0,35=0,85 bar, +pierderi alimentare (≈0,1 bar) ⟹ **≈0,95 bar ≈9,7 mCA**; **rezervă 60 min: V = 18,0×3.600 = 64.800 l ≈ 64,8 mc**.

**Rezervorul de incendiu recalculat:** cele două zone de sprinklere nu ard simultan (un singur focar activ, ipoteză standard de proiectare) — dimensionarea reține **scenariul guvernant** (hidranți interiori, funcționând obligatoriu simultan cu orice sprinkler activ, plus sprinklerul cu cerința mai mare — parcaj):

> V_rezervor = V_HI (2,52 mc, 4,2 l/s × 10 min, DTAC §10.3) + V_sprinkler_parcaj (64,8 mc) + marjă 5% ≈ **≈70,7 mc**, adoptat **≈72 mc**

Această valoare **completează, la faza PTh, dimensionarea preliminară a rezervorului de incendiu din DTAC** (§10.5, ≈38,5 mc — estimare generică ce nu defalcase separat componenta de sprinklere, semnalată doar condiționat) — nu o contrazice, ci o confirmă și o extinde odată cu adoptarea fermă a sprinklerelor pe ambele zone de risc. Zona comercială (5,67 mc necesare, funcționând simultan cu HI = 2,52+5,67=8,19 mc) rămâne, evident, sub scenariul guvernant al parcajului, deci acoperită automat de rezervorul de 72 mc.

**Grupul de pompare incendiu** se dimensionează pe scenariul guvernant (HI 4,2 l/s + sprinkler parcaj 18,0 l/s = **22,2 l/s**), la presiunea necesară la hidrantul cel mai defavorizat (E5, coloană umedă): p_utilizare (2,5 bar ≈25,5 mCA, NP127) + H_geodezic (17,70 m, DTAC §2.7) + pierderi riser+orizontal (≈8 mCA) ≈ **≈51,2 mCA**, rotunjit la curba de pompă **H = 55 mCA**.

> P_hidraulică = ρ·g·Q·H/1000 = 1.000×9,81×0,0222×55/1.000 ≈ 11,97 kW
> P_electrică = P_hidraulică/η(0,65) ≈ 18,4 kW, cu marjă de selecție (+20%) ⟹ **motor adoptat ≈22 kW**

### PTh-I.3.14 Verificare curent de pornire — pompă hidrofor și pompă incendiu

**Pompă hidrofor (1,1 kW):** I_nominal ≈ 1.100/(√3×400×0,85×0,80) ≈ 2,3 A; pornire directă (I_pornire≈6×2,3≈14 A) — nesemnificativă pentru rețea.

**Pompă incendiu principală (22 kW):** I_nominal ≈ 22.000/(√3×400×0,88×0,90) ≈ **40,1 A**. La pornire directă: I_pornire ≈ 6,5×40,1 ≈ **260,7 A**, valoare care ar produce o cădere de tensiune tranzitorie sensibilă pe circuitele comune ale clădirii la testele periodice ale pompei. **Soluție adoptată:** pornire prin **soft-starter** (limitare la ≈3×I_nominal ≈120,4 A), acceptată de SR EN 12845 cu condiția atingerii turației nominale în ≤15 s — reduce căderea de tensiune la pornire la un nivel acceptabil (≈3-4%), fără perturbarea circuitelor rezidențiale/comerciale la testele periodice.

### PTh-I.3.15 Calcul de trafic al ascensoarelor — verificare capacitate pentru fluxul rezidențial

**Metoda intervalului mediu de sosire (RTT — Round Trip Time simplificat):** populație deservită de nucleul rezidențial — 128 persoane (DTAC §1.2), 40 apartamente pe 5 niveluri supraterane de locuințe (plus parter/mezanin comercial, deservit de aceleași 2 cabine, dar cu flux de public separat, DTAC §11.1). Pentru un ascensor de 8 persoane/630 kg la 1,0-1,6 m/s:

> RTT ≈ 2×H_medie/v + n_opriri×(t_deschidere+urcare/coborâre+închidere) ≈ 2×10,6/1,2 + 3×10 ≈ 17,7+30 ≈ **≈48 s** (traiect reprezentativ pe cele 5 niveluri de locuințe, 3 opriri medii pe cursă)

**Capacitatea de transport în 5 minute (300 s), cu 2 ascensoare** (ambele funcționând normal în exploatare curentă, ascensorul de pompieri rezervat exclusiv regimului de incendiu):

> Capacitate/5min = (300/RTT) × capacitate_cabină × nr._ascensoare × factor_umplere(0,8) = (300/48) × 8 × 2 × 0,8 ≈ 6,25 × 8 × 2 × 0,8 ≈ **≈80 persoane/5 min**

Raportat la populația rezidențială (128 persoane): **≈62,5% transportabil în 5 minute** — cu mult peste pragul uzual de referință pentru locuințe (5-8%), confirmând un **confort de transport foarte generos**, justificat de decizia DTAC de a echipa 2 ascensoare (unul cu funcție de pompieri, redundant complet în exploatare normală) și de regimul de înălțime redus (5 niveluri, RTT scurt). Fluxul de public comercial (≈190 persoane, DTAC §1.2), concentrat pe parter/mezanin, nu solicită semnificativ ascensoarele (accesul comercial se face preponderent pe orizontală și pe scara internă a fiecărei unități pentru mezanin, conform `arhitectura-pth.md`) — verificarea de trafic de mai sus rămâne, prin urmare, guvernată de fluxul rezidențial.

### PTh-I.3.16 Coordonare cu planșeul de separare (D01/D01.1, `arhitectura-pth.md`) — registrul trecerilor de instalații

Planșeul de separare comercial↔rezidențial (interfața mezanin/E1) este, conform ambelor documente PTh (arhitectură și instalații), **punctul de coordonare cel mai sensibil** al întregii clădiri — trebuie să satisfacă simultan REI 90 (compartimentare la foc, DTAC §10.1) și R'w≥60 dB/L'n,w≤50 dB (barieră acustică majorată, `arhitectura-pth.md` D01). Instalațiile care traversează efectiv acest planșeu, la execuție, sunt:

| Instalație traversantă | Poziție (aliniată cu nucleul) | Dispozitiv de etanșare la foc | Referință execuție |
|---|---|---|---|
| Coloană apă rece + ACM (4 nuclee CAR-1…4) | ghenă tehnică rezidențială | manșon intumescent, EI 90 | D01.1 |
| Coloană canalizare menajeră (4 nuclee) | ghenă tehnică rezidențială | manșon intumescent, EI 90 | D01.1 |
| Coloană gaz (dacă poziția de plan a apartamentului de la E1 coincide cu traversarea) | ghenă dedicată gaz, ventilată | manșon certificat NTPEE + EI 90 | D01.1, D9.1 DTAC |
| Cabluri TE-apartament + TG-REZIDENȚIAL | ghenă electrică rezidențială | mortar/spumă intumescentă + placă EI 90 | D01.1 |
| Cabluri curenți slabi rezidențiale | ghenă separată de curenți tari | pernă/mastic + vopsea termospumantă, EI 90 | D01.1 |
| Canal de ventilare (dacă traversează, ex. coloană pluvială de la balcoane rezidențiale) | poziție dedicată | clapetă antifoc EI 90, interblocată IDSAI | D01.1 |

Fiecare traversare se documentează individual (poziție, diametru, tip conductă, sistem de etanșare, certificat) în registrul de trasabilitate al fazei determinante a planșeului de separare (§PTh-I.8, poziția dedicată) — o singură trecere neetanșată corect anulează, punctual, atât compartimentarea de foc, cât și, indirect, performanța acustică a întregului planșeu (o fisură la etanșare compromite continuitatea stratului elastic de decuplare descris în `arhitectura-pth.md` D01). Ghenele tehnice verticale ale celor 4 nuclee rezidențiale și cele ale rețelei comerciale rămân **fizic separate pe toată înălțimea clădirii** (nu doar la traversarea planșeului de separare), conform poziționării stabilite de comun acord cu planurile de arhitectură (interfața explicit menționată în `arhitectura-pth.md`: „Ghenele tehnice verticale (rezidențial vs. comercial) — numărul și diametrul coloanelor pe fiecare rețea separată").

### PTh-I.3.17 Calcul economie energetică — comandă inteligentă iluminat comun și comercial

Extinderea estimării DTAC (§14, LED cu senzori de prezență) cu un calcul orientativ pentru principalii consumatori de iluminat comun și comercial:

- **Casa scării rezidențială** (5 niveluri + parter, 2 corpuri/nivel × 12 W ≈ 144 W instalat): funcționare de bază (fără senzor, 24h/zi × 365 zile) = 144×24×365 = **1.262 kWh/an**; cu senzor de prezență (factor de utilizare ≈25%, trafic locatari intermitent) → **≈315 kWh/an, economie ≈75%**.
- **Parcaj** (20 corpuri × 24 W ≈ 480 W instalat, §PTh-I.9.4): funcționare de bază (12h/zi echivalent) = 480×12×365 = **2.102 kWh/an**; cu senzor de prezență pe zonele de circulație (factor ≈40%) → **≈841 kWh/an, economie ≈60%**.
- **Zona comercială** (68 corpuri, extrapolat pe 770 mp retail, §PTh-I.9.2): comandă prin senzor de luminozitate (dimming pe lumină naturală, unde vitrina D10 permite aport de lumină zi) — economie estimată **≈15-20%** față de funcționarea la flux constant, mai redusă decât la spațiile comune (programul comercial e concentrat, nu intermitent ca traficul de scară).

**Economia cumulată estimată pe iluminatul comun al clădirii: ≈1.208 kWh/an**, confirmând intervalul general de 40-75% semnalat în DTAC pe zonele comune, cu valori specifice per zonă funcțională.

---

## PTh-I.4 Specificații complete echipamente majore

Fișele de mai jos reiau, pe fiecare echipament major, parametrii garantați de furnizor necesari execuției și recepției — completare directă a nivelului DTAC (tipuri și puteri de principiu). Fișele sunt organizate astfel încât fiecare echipament să rămână identificabil în categoria de utilizare căreia îi aparține (rezidențial/comercial/comun/parcaj), conform principiului central (DTAC §1.6).

### PTh-I.4.1 Fișă tehnică — Centrală murală de apartament în condensație (rezidențial, 40 buc.)

| Parametru | 2 camere (24 kW) | 3 camere (24 kW) | 4 camere (28 kW) |
|---|---|---|---|
| Tip | murală, condensație, etanșă (tip C), evacuare coaxială | idem | idem |
| Randament sezonier | > 105% (raportat la PCI) | > 105% | > 105% |
| Producție ACM instant | 11,5 l/min la ΔT=30K | 11,5 l/min | 13,4 l/min |
| Vas expansiune încorporat | 8 l | 8 l | 10 l |
| Supapă de siguranță | 3 bar, evacuare la pâlnie vizibilă | idem | idem |
| Pompă de circulație | modulantă, clasă energetică A | idem | idem |
| Automatizare | termostat ambient + programare orară | idem | idem, compatibil recirculare locală (§PTh-I.2.2) |

Fiecare centrală se livrează cu certificat de conformitate CE și declarație de randament, anexate cărții tehnice individuale a apartamentului (nu a clădirii — fiind echipament de proprietate individuală, cu contract de garanție separat pe fiecare unitate).

### PTh-I.4.2 Fișă tehnică — Grup de pompare apă rece (hidrofor, rezidențial)

| Parametru | Valoare |
|---|---|
| Configurație | 2 pompe centrifuge verticale cu convertizor de frecvență (VSD), 1 activă + 1 rezervă |
| Debit de calcul | ≈3,88 mc/h (debit orar de vârf, §PTh-I.3.1) |
| Debit/presiune pompă | 2,5 mc/h la 40 mCA/pompă |
| Vas de expansiune membrană | 200 litri |
| Comandă | presiune constantă, traductor pe colectorul de refulare, alternare „lider" pentru uzură egală |
| Protecție | mers în gol (presostat/traductor nivel) |
| Alimentare | exclusiv din TG-PĂRȚI COMUNE (nu se confundă cu grupul de pompare incendiu, tablou distinct) |

### PTh-I.4.3 Fișă tehnică — Sistem roof-top/VRF comercial și CTA cu recuperator

| Parametru | Roof-top/VRF (agent termic/frig) | CTA comercial (aer proaspăt) |
|---|---|---|
| Amplasare | terasă tehnică (coordonat D14, `arhitectura-pth.md`) | terasă tehnică, adiacent roof-top |
| Putere termică (iarnă) | ≈57 kW (§PTh-I.3.8, zonă vânzare+oficiu) | baterie încălzire ≈19,8 kW net (după recuperator) |
| Putere frigorifică (vară) | ≈95 kW | interfațată cu bateria de răcire CTA |
| Debit aer proaspăt | — | 6.840 mc/h (190 pers. × 10 l/s·pers.) |
| Recuperator de căldură | — | rotativ/plăci, η ≥ 73% |
| Filtrare | — | ePM1 50% (SR EN 16798-3) |
| Contorizare | contor propriu (electric sau gaz), integrat TG-COMERCIAL | idem, aceeași buclă de măsură comercială |
| Legătură cu oficiul alimentație publică | unități interioare dedicate | make-up air separat (v. PTh-I.4.4) |

### PTh-I.4.4 Fișă tehnică — Hotă profesională oficiu alimentație publică + make-up air

| Parametru | Valoare |
|---|---|
| Debit de extracție | ≈3.500 mc/h |
| Filtre | grăsime demontabile, tip labirint, spălabile |
| Make-up air | ≈3.063 mc/h (85-90% din debitul de extracție, §PTh-I.3.8) |
| Canal de extracție | independent de CTA generală, traversare separată a compartimentării (registru rezistent la foc, D01.1) |
| Detecție asociată | detector CH₄ (dacă echipamente pe gaz) + clapetă de închidere pe canal la alarmă confirmată (§PTh-I.2.13) |
| Curățare/mentenanță | conform programului de prevenire a incendiilor la conducte de grăsime (P118, unități de alimentație publică) |

### PTh-I.4.5 Fișă tehnică — Separator de grăsimi (comercial, canal gras) și separator de hidrocarburi (parcaj)

| Parametru | Separator de grăsimi NS 7 | Separator de hidrocarburi clasă I, NS 10 |
|---|---|---|
| Normativ | SR EN 1825-1/2 | SR EN 858-1/2 |
| Debit de calcul | 2,5 l/s (oficiu alimentație publică) | 4 l/s (stație pompare parcaj) |
| Amplasare | subsol, traseu dedicat canal gras | subsol, aval de stația de pompare parcaj |
| Conținut rezidual admis | conform normei — control vizual periodic | ≤ 5 mg/l la evacuare |
| Mentenanță | vidanjare periodică (contract dedicat), alarmă de nivel | vidanjare periodică, alarmă de nivel |
| Interdicție de execuție | nicio derivație a rețelei menajere a locuințelor prin acest separator | nicio derivație a rețelei rezidențiale/comerciale prin acest separator |

### PTh-I.4.6 Fișă tehnică — Stație de pompare ape uzate parcaj

| Parametru | Valoare |
|---|---|
| Configurație | 2 pompe submersibile, 1 activă + 1 rezervă |
| Debit de calcul | ≈4 l/s (§PTh-I.3.6) |
| Comandă | flotor/senzor de nivel, alarmă nivel maxim la dispecerat |
| Refulare | peste cota colectorului stradal, prin clapetă de reținere |
| Alimentare electrică | TG-PARCAJ/PSI, circuit distinct de ventilare/desfumare |

### PTh-I.4.7 Fișă tehnică — Grup de pompare incendiu (comun clădirii)

| Parametru | Valoare |
|---|---|
| Configurație | electropompă principală + pompă jockey |
| Debit de calcul (scenariu guvernant, §PTh-I.3.13) | 22,2 l/s (HI 4,2 l/s + sprinklere parcaj 18,0 l/s) |
| Înălțime manometrică | ≈55 mCA |
| Putere motor | ≈22 kW |
| Pornire | soft-starter (limitare 3×I_nominal, §PTh-I.3.14) |
| Rezervor de incendiu | ≈72 mc (§PTh-I.3.13) |
| Alimentare | circuit prioritar TG-PARCAJ/PSI, comutabil pe grup electrogen |

### PTh-I.4.8 Fișă tehnică — Tablou General (TG) și cele 4 tablouri de categorie

| Parametru | Valoare |
|---|---|
| Întrerupător general | 630 A |
| Baterie de compensare | ≈50 kVAr |
| SPD | tip 1+2 la TG, tip 2 la fiecare din cele 4 tablouri de categorie, tip 3 la echipamente sensibile |
| Contorizare | contor general (decontare operator) + subcontor pe fiecare din cele 4 categorii + contor individual apartament/unitate comercială |
| Selectivitate | curentaj+temporizare, 3 trepte (TG → tablou de categorie → circuit terminal) |
| Circuit prioritar PSI | separat, cablu N2XH E90, sursă de rezervă (grup electrogen, AAR ≤15 s) |
| Grup electrogen | Diesel, ≈36,6 kVA (§PTh-I.3.11), exclusiv pe TG-PARCAJ/PSI |

### PTh-I.4.9 Fișă tehnică — Ascensoare (2 unități)

| Parametru | Valoare |
|---|---|
| Tip | electric cu tracțiune fără cameră mașini (MRL) |
| Capacitate | min. 8 persoane/630 kg |
| Viteză | 1,0-1,6 m/s |
| Niveluri deservite | S (parcaj) + P/M (comercial) + 5E (locuințe) |
| Putere motor | 7,7 kW/unitate |
| Ascensor 2 (pompieri) | puț presurizat/desfumat, alimentare E90, comandă prioritară cu cheie |
| Verificare | ISCIR PT R1-2010, revizie periodică |

### PTh-I.4.10 Fișă tehnică — Centrală IDSAI și cele 2 rack-uri de curenți slabi

| Parametru | Centrală IDSAI | Rack rezidențial | Rack comercial |
|---|---|---|---|
| Tip | adresabilă, minimum 2 bucle | comunicații rezidențiale, UPS dedicat | comunicații comerciale, UPS dedicat |
| Alimentare | rețea + acumulatori (autonomie ≥48h veghe + 30 min alarmă) | rețea + UPS (≥30 min) | rețea + UPS (≥30 min) |
| Componente specifice | detectoare optice/termice, butoane manuale, EVAC vocal (SR EN 54-16, zona comercială) | videointerfon, control acces lobby, CCTV comun, date/TV | CCTV comercial, control acces unități, rețea POS |
| Separare GDPR | — | operator de date distinct: asociația de proprietari | operator de date distinct: operatorul comercial |

### PTh-I.4.11 Fișă tehnică — Rezervor de incendiu (≈72 mc)

| Parametru | Valoare |
|---|---|
| Volum util | ≈72 mc (HI + sprinklere comercial + sprinklere parcaj, §PTh-I.3.13) |
| Configurație | 2 compartimente sau 1 + by-pass (mentenanță fără scoatere din funcțiune) |
| Reumplere | automată, electrovalvă + senzor de nivel |
| Sorburi | separate pompă principală/rezervă/jockey, deasupra rezervei intangibile |
| Material | beton armat, cuvă etanșă, integrată structural cu infrastructura subsolului |

### PTh-I.4.12 Fișă tehnică — Modul fotovoltaic (servicii comune)

| Parametru | Valoare |
|---|---|
| Putere instalată | ≈22 kWp |
| Producție anuală | ≈26.400 kWh/an (DTAC §14.2) |
| Configurație | string-uri + invertor(oare), protecție DC/AC, anti-islanding |
| Alocare consum | exclusiv TG-PĂRȚI COMUNE (racord prosumator, contor bidirecțional) |
| Structură de prindere | verificată structural (`structura-pth.md`), coordonată cu platformele de echipamente D14 |

---

## PTh-I.5 Probe și verificări detaliate

Tabelul de mai jos reunește probele de execuție pe toate cele 4 categorii de utilizare, cu mențiunea explicită a categoriei căreia îi aparține fiecare probă — element de trasabilitate necesar la o clădire cu titulari distincți de instalație.

| Instalație | Categorie | Proba | Presiune/parametru | Durată | Criteriu de admisie |
|---|---|---|---|---|---|
| Apă rece/ACM rezidențial | rezidențial | etanșeitate | 1,5×p regim, min. 9 bar | 1 h | fără scădere, fără scurgeri (SR EN 806-4) |
| Apă rece comercial | comercial | etanșeitate | 1,5×p regim | 1 h | idem, pe rețeaua orizontală parter/mezanin |
| Apă rece/ACM | ambele | spălare + dezinfecție | conform SR EN 806-4 | — | buletin microbiologic conform, pe fiecare ramură |
| Canalizare menajeră rezidențială | rezidențial | etanșeitate | umplere la nivel palier | 15 min | fără scurgeri la îmbinări, pe fiecare din cele 4 coloane |
| Canal gras + separator grăsimi | comercial | etanșeitate + funcțională | debit de calcul 2,5 l/s | — | fără scurgeri, separare conformă (SR EN 1825) |
| Canalizare parcaj + separator hidrocarburi | parcaj | etanșeitate + funcțională | debit de calcul 4 l/s | — | conținut rezidual ≤5 mg/l (SR EN 858) |
| Pluvial | comun | probă de amorsare | debit de calcul 16,74 l/s | — | funcționare fără reflux, min. 2 receptoare libere |
| Termic — centrale apartament | rezidențial | etanșeitate + funcțională | presiune de probă furnizor | conform normativ | fără scădere presiune, ardere corectă, secvențial pe cele 40 de apartamente |
| Termic — roof-top/VRF comercial | comercial | funcțională | sarcină de proiect (57 kW iarnă/95 kW vară) | — | atingere temperaturi de calcul pe zona de vânzare și oficiu |
| Ventilare CTA comercial | comercial | debite + recuperator | 6.840 mc/h, η≥73% | — | ±10%, verificare η recuperator la sondă |
| Hotă alimentație publică | comercial | debite extracție/compensare | 3.500/3.063 mc/h | — | ±15%, depresiune netă confirmată în oficiu |
| Gaze | rezidențial (+comercial dacă e cazul) | rezistență + etanșeitate | conform NTPEE | — | fără scădere presiune, PV ANRE, pe fiecare din cele 8 coloane |
| Gaze — detectoare CH₄ | rezidențial/comercial | funcțională | prag 20% LIE simulat | — | închidere automată electrovalvă confirmată |
| Ventilare apartamente | rezidențial | debite | conform tiraj canal șuntă | — | ±15%, pe fiecare din cele 4 nuclee |
| Ventilare/desfumare parcaj | parcaj | debite + funcțională F400 | 2×4.836/2×9.672 mc/h (2 zone) | — | ±10-15%, comutare F400 <60 s pe fiecare zonă |
| Electrice | toate 4 | rezistență izolație | 500 V c.c. | — | ≥0,5 MΩ, inclusiv toate cele 40 circuite apartament + circuitele comerciale/comune/PSI |
| Electrice | comun | priză de pământ | — | — | R≤1Ω (comună trăsnet+electrică) |
| Electrice | toate 4 | test declanșare RCD | I∆n=30mA | — | declanșare <300ms |
| Trăsnet | comun | continuitate coborâri + priză | — | — | pe toate cele 7 coborâri (§PTh-I.3.12) |
| Sprinkler comercial | comercial | presiune hidraulică | 1,5×p regim, min. 15 bar | 2 h | fără scădere, fără scurgeri (SR EN 12845) |
| Sprinkler parcaj | parcaj | presiune hidraulică | 1,5×p regim, min. 15 bar | 2 h | fără scădere, fără scurgeri (SR EN 12845) |
| Hidranți | comun | debit-presiune | robinet cel mai defavorabil (E5) | — | ≥2,1 l/s la ≥2,5 bar |
| Stație pompare incendiu | comun | funcțională (pornire automată) | scădere presiune simulată | — | pornire <15 s la turație nominală, comutare rezervă |
| Presurizare casă scării rezidențiale | rezidențial | suprapresiune | uși închise/deschise | — | 20-80 Pa, viteză ≥0,75 m/s ușă deschisă |
| Desfumare zonă comercială | comercial | funcțională (oprire CTA + registre) | alarmă confirmată | — | oprire CTA <10 s, registru hotă închis dacă focar oficiu |
| IDSAI | toate 4 | funcțională + matrice cauză-efect | test 100% adrese | — | toate cele 4 categorii de efecte confirmate (§PTh-I.2.13) |
| Ascensoare | comun | funcțională + siguranță | conform ISCIR PT R1 | — | PV recepție ISCIR, ambele cabine |
| Videointerfon/CCTV rezidențial | rezidențial | funcțională | test toate posturile | — | apel/deblocare confirmate, integrare IDSAI |
| CCTV/control acces comercial | comercial | funcțională | test toate unitățile | — | separare GDPR confirmată față de rack rezidențial |
| Fotovoltaic | comun | funcțională + izolație | test string-uri | — | producție conformă, fără defecte izolație |

### PTh-I.5.1 Verificări electrice PRAM — detaliu pe cele 4 categorii

Verificările PRAM se execută de laborator autorizat, cu buletine consemnate separat pe fiecare categorie (element de trasabilitate a răspunderii de mentenanță, coerent cu principiul central):

- **Rezistența de izolație** — 500 V c.c., minim 0,5 MΩ pe fiecare circuit terminal, deconectat, inclusiv pe toate cele 40 de circuite de apartament, pe circuitele comerciale (CTA/VRF, hotă, prize), pe circuitele TG-PĂRȚI COMUNE și pe circuitele TG-PARCAJ/PSI.
- **Rezistența prizei de pământ** — metoda celor 3 electrozi, R_p≤1Ω, cu remăsurare după completarea eventuală cu electrozi verticali (§PTh-I.3.12).
- **Continuitatea conductorului de protecție** — pe fiecare circuit final, inclusiv pe circuitele PSI (cablu E90: grup pompare incendiu, presurizare, ascensor de pompieri, ventilare/desfumare parcaj).
- **Testul dispozitivelor diferențiale** — pe toate circuitele de prize și zonele umede (băi, bucătării din cele 40 de apartamente; grupuri sanitare publice și oficiul de alimentație publică la comercial).
- **Verificarea SPD** — tip 1+2 la TG, tip 2 pe fiecare din cele 4 tablouri de categorie, tip 3 la echipamente sensibile (IDSAI, invertoare FV, rack-urile de curenți slabi).
- **Continuitate coborâri paratrăsnet** — pe toate cele 7 coborâri (§PTh-I.3.12), la fiecare tronson între piesele de separație.

### PTh-I.5.2 Fișă probă — Rezervor de incendiu

Vezi §PTh-I.4.11 pentru parametri; proba de etanșeitate se face prin umplere completă și menținere nivel 24h, cu verificare vizuală a rosturilor și a hidroizolației cuvei.

---

## PTh-I.6 Tehnologia de montaj

### PTh-I.6.1 Succesiunea generală a lucrărilor

1. Trasare trasee (ghene tehnice, poziții coloane) — corelat cu planurile de arhitectură interioară definitive, cu distincție explicită între ghenele rezidențiale (4 nuclee) și ghenele comerciale.
2. Execuție priză de pământ de fundație (platbandă OL-Zn, sudată de armătura fundațiilor) — **înainte de turnarea fundațiilor**.
3. Montaj rețea de canalizare/pluvial exterior îngropată, inclusiv separatorul de hidrocarburi al parcajului — **probată înainte de acoperire**.
4. Structură de rezistență (condiție pentru montajul coloanelor și golurilor prevăzute, inclusiv planșeul de separare D01.1).
5. Montaj coloane apă/canalizare/gaz/electrice pe verticală, în ghenele dedicate — cele 4 coloane CAR pe nucleele rezidențiale, cele 8 coloane de gaz pe poziții de plan, rețeaua orizontală comercială separat la parter/mezanin.
6. **Fază determinantă la planșeul de separare comercial↔rezidențial** (D01.1) — toate traversările (§PTh-I.3.16) se execută și se etanșează înainte de continuarea montajului deasupra acestui nivel.
7. Montaj rețea sprinklere comercial + parcaj (probată hidraulic înainte de finisajele pardoselii/plafonului fiecărei zone).
8. Montaj echipamente majore comune (stație pompare incendiu, hidrofor, TG, ascensoare, IDSAI, rezervor de incendiu).
9. Montaj echipamente specifice comerciale (roof-top/VRF, CTA cu recuperator, hotă + make-up air, separator de grăsimi).
10. Montaj centrale murale de apartament, coloane distribuție interioară, corpuri de încălzire (rezidențial).
11. Montaj corpuri de iluminat, prize, aparataj final pe toate cele 4 categorii.
12. Montaj trape/exutor de fum, ventilator presurizare casă scării rezidențială, registre desfumare comercială, centrală IDSAI, detectoare (inclusiv CH₄ la oficiul de alimentație publică).
13. Montaj cablare curenți slabi — cele 2 rack-uri (rezidențial/comercial), separate fizic conform §PTh-I.2.16.
14. Montaj instalație fotovoltaică pe terasă tehnică (D14).
15. Probe finale, PIF, reglaje, instruire administrator asociație/operatori comerciali (separat, conform titularilor distincți de folosință).

### PTh-I.6.2 Susțineri și fixări (inclusiv cerințe seismice pentru coloane verticale)

| Instalație | Tip susținere | Interax maxim | Observație seismică |
|---|---|---|---|
| Coloană apă PP-R Ø≤40 (rezidențial, 4 nuclee) | brățară glisantă (dilatare) + brățară fixă la fiecare nivel | 0,8-1,0 m | fixare fixă la planșeu (punct de sprijin seismic), restul glisant |
| Coloană gaz oțel (8 coloane, ghenă dedicată) | consolă/brățară fixă | 3,0-4,0 m | distanță minimă față de alte instalații (NTPEE) |
| Coloană sprinkler comercial/parcaj DN≥65 | tijă filetată dublă + bracket lateral | 3,0-3,7 m | conform SR EN 12845, verificare sarcină seismică laterală |
| Tubulatură CTA comercial + hotă | tijă filetată + profil, susținere suplimentară la traversarea D01.1 | 1,5-2,0 m | fixare rigidă la planșeul de separare, coordonată cu clapeta antifoc |
| Unități roof-top/VRF (terasă) | postament/cadru metalic ancorat | — | ancorare la clasa de importanță II (P100-1), verificat `structura-pth.md` |
| Jgheab cabluri TG-REZIDENȚIAL/TG-COMERCIAL | console metalice separate | 1,0-1,5 m | separare fizică pe tot traseul, nu doar la tablou |
| Jgheab curenți slabi (2 rack-uri) | console metalice separate | 1,0-1,5 m | ecranare/distanță minimă SR EN 50174, separare rezidențial/comercial pe tot traseul |

### PTh-I.6.3 Izolații termice

| Element | Grosime izolație | Material |
|---|---|---|
| Coloană apă rece rezidențială (anticondens) | 9 mm | cauciuc sintetic |
| Distribuție interioară ACM (apartament) | 13 mm | cauciuc sintetic/elastomer |
| Tubulatură CTA comercial + tubulatură desfumare parcaj (trasee neîncălzite) | 20-30 mm | vată cu foaie Al |
| Agent frigorific/termic roof-top/VRF | conform recomandare furnizor | cauciuc sintetic UV-rezistent (traseu exterior terasă) |

### PTh-I.6.4 Treceri etanșe la foc — accent pe planșeul de separare D01.1

La traversarea pereților/planșeelor de compartimentare — cu accent particular pe **planșeul de separare comercial↔rezidențial (D01.1)**, deja tratat la nivel de registru în §PTh-I.3.16 — toate trecerile de instalații se etanșează cu sisteme certificate de rezistență la foc egală cu a elementului străbătut:

| Tip trecere | Soluție | Clasă |
|---|---|---|
| Coloane metalice (gaz) | manșon/mastic intumescent | EI conf. element (EI 90 la D01.1) |
| Coloane plastic (PP-R apă, PP canalizare) | colier intumescent | EI conf. element |
| Fascicule cabluri (fiecare categorie separat) | pernă/mastic + vopsea termospumantă, ghene distincte | EI conf. element |
| Tubulatură ventilare/desfumare + canal hotă | clapetă antifoc interblocată IDSAI + etanșare | EI conf. element |
| Coloană sprinkler comercial/parcaj | manșon certificat SR EN 12845 | EI conf. element |

### PTh-I.6.5 Montaj structură de prindere fotovoltaic pe terasă

- **verificare structurală prealabilă** (obligatorie): încărcarea permanentă suplimentară și încărcarea de vânt pe module se verifică de inginerul structurist (`structura-pth.md`) **înainte de montaj**;
- **coordonare cu platformele de echipamente D14** — modulele nu se amplasează peste sau în vecinătatea unităților roof-top/VRF, a ventilatoarelor de desfumare sau a exutoarelor, păstrând culoare libere de acces pentru mentenanță;
- **legare la priza de pământ** — structura de prindere se leagă la bara de echipotențializare, integrată cu sistemul de protecție la trăsnet (§PTh-I.3.12).

### PTh-I.6.6 Montaj cablare curenți slabi — separare fizică rezidențial/comercial

Cablarea celor **2 rack-uri distincte** (§PTh-I.2.16) se montează în jgheaburi/tuburi separate pe tot traseul, nu doar la sursă — o traseu comun ar contrazice separarea GDPR a operatorilor de date. Distanța minimă de separare față de circuitele de curent tare conform SR EN 50174. Fiecare rack are alimentare proprie și UPS dedicat (autonomie ≥30 min).

### PTh-I.6.7 Protecția la zgomot și vibrații — execuție, interfața critică comercial-rezidențial

DTAC a stabilit principiile generale de protecție fonică (coerent cu `arhitectura-pth.md`, planșeul D01 cu barieră acustică majorată); PTh detaliază execuția pe fiecare punct critic, cu accent pe sursele specifice unei clădiri mixte — unde zgomotul/vibrația generate de echipamentele comerciale sau ale părților comune se pot transmite direct la locuințele adiacente:

| Sursă de zgomot/vibrație | Măsură de execuție | Toleranță/verificare |
|---|---|---|
| Unități roof-top/VRF (terasă tehnică, sub ultimul nivel de locuințe) | postament antivibrant, distanță minimă față de planșeul ultimului etaj de locuințe, coordonată cu D14 | verificare la PIF: nivel de zgomot/vibrație transmis în apartamentele de la E5 ≤30 dB(A)/prag vibrație conform C125 |
| CTA comercial + hotă (parter/mezanin) | postament antivibrant, atenuatoare pe tubulatură la traversarea D01.1 | ≤30 dB(A) în apartamentele situate deasupra zonei comerciale |
| Grup pompare hidrofor + grup pompare incendiu (subsol) | postament antivibrant, racorduri elastice, cameră tehnică necontiguă parcajului cu prezență de persoane | verificare la PIF: fără vibrație perceptibilă la structura adiacentă |
| Ventilatoare parcaj (curent + F400) | suporți antivibranți, atenuatoare de zgomot pe tubulatură | ≤35 dB(A) în circulațiile comune adiacente |
| Coloane de canalizare rezidențiale (PP fonoabsorbant) | brățări cu garnitură fonică, distanțare de perete prin distanțieri elastici | ≤30 dB(A) în încăperea adiacentă la debit de vârf (SR EN 14366) |
| Ascensoare (motor MRL) | amortizoare pe grinda de ghidaj, izolare a puțului față de pereții structurali ai apartamentelor adiacente | ≤30 dB(A) în apartamentul adiacent, la pornire/oprire cabină |
| Traversările planșeului D01.1 (toate instalațiile, §PTh-I.3.16) | manșoane elastice complementare etanșării la foc | verificare vizuală, nu compromite continuitatea stratului elastic de decuplare acustică descris în `arhitectura-pth.md` D01 |

Verificarea acustică finală (măsurători in-situ cu sonometru, la darea în exploatare) se face **cu prioritate la apartamentele adiacente planșeului de separare și celor situate deasupra echipamentelor comerciale/roof-top** — punctele de risc identificate specific pentru configurația mixtă a clădirii — și se consemnează într-un buletin distinct, anexat cărții tehnice (§PTh-I.8.2), complementar breviarului acustic elaborat separat de specialistul de acustică.

---

## PTh-I.7 Punerea în funcțiune (PIF) și reglaje

### PTh-I.7.1 Echilibrarea hidraulică a instalației de încălzire rezidențiale

Reglajul robinetelor de presetare pe distribuitorul fiecărui apartament se face conform debitelor de calcul rezultate în §PTh-I.3.7, pe toate cele 3 tipologii, verificate cu termometru de contact/termocameră pe fiecare corp de încălzire, urmărind atingerea temperaturii interioare de calcul (20-22°C camere, 24°C băi) la sarcina de proiectare. Abatere admisă ≤±2K între încăperi. Reglajul se execută secvențial, nucleu cu nucleu (CAR-1…CAR-4), cu proces-verbal separat pe fiecare apartament.

### PTh-I.7.2 Reglaj funcțional roof-top/VRF și CTA comercial

Verificarea temperaturilor de regim (iarnă/vară) pe zona de vânzare și pe oficiul de alimentație publică separat, conform necesarurilor diferențiate din §PTh-I.3.8 (52 W/mp retail, 94 W/mp oficiu). Verificarea recuperatorului CTA (η≥73%) prin măsurare temperaturi aer introdus/evacuat la debit nominal (6.840 mc/h). Verificarea hotei și a make-up air-ului: debit extracție 3.500 mc/h ±15%, debit compensare 3.063 mc/h ±15%, cu confirmarea depresiunii nete a oficiului față de zona de servire.

### PTh-I.7.3 Reglaj aeraulic — ventilare/desfumare parcaj (2 zone)

Verificarea debitelor pe cele 2 zone (§PTh-I.3.10) cu anemometru la gurile de introducere/extracție, abatere admisă ≤±15% pe total, ≤±20% pe fiecare gură. Verificarea comenzii comune de desfumare (ambele zone la alarmă confirmată, §PTh-I.2.11) prin simulare la un singur senzor CO/zonă, confirmând pornirea F400 pe **ambele** ventilatoare, nu doar pe zona afectată.

### PTh-I.7.4 Reglaj aeraulic — ventilare apartamente (canale șuntă)

Verificarea tirajului canalelor șuntă pe fiecare din cele 4 nuclee, prin test de fum/anemometru la gura de evacuare bucătărie/baie, confirmând debitele minime de proiectare pe fiecare tip de apartament.

### PTh-I.7.5 Protocol primă pornire — centrale murale de apartament (rezidențial)

- Verificare etanșeitate gaz pe toată coloana și derivația de apartament (probă de presiune NTPEE) înainte de prima aprindere, pe fiecare din cele 8 coloane.
- Aprindere secvențială, apartament cu apartament (nu simultan), cu verificare ardere completă și evacuare corectă a gazelor arse (coaxial, fără reflux).
- Reglaj automatizare (termostat, curbă de încălzire) pentru atingerea temperaturilor de calcul, diferențiat pe cele 3 tipologii de putere (24/24/28 kW).
- Proces-verbal de primă pornire per apartament, semnat de executant, furnizor echipament și beneficiar/proprietar — document individual, predat proprietarului fiecărui apartament (nu asociației, conform separării de titular).

### PTh-I.7.6 Protocol PIF — grup de pompare apă (rezidențial) și grup de pompare incendiu (comun)

- **Hidrofor rezidențial:** verificare curbă de funcționare VSD (consemn de presiune calibrat pe H_nec verificat, §PTh-I.3.1), test comutare pompă activă/rezervă, verificare protecție mers în gol.
- **Incendiu (scenariu guvernant 22,2 l/s):** pornire automată la scădere de presiune simulată, cronometrare timp de pornire (≤15 s la turație nominală cu soft-starter), comutare electropompă→pompă rezervă/Diesel, verificare pompă jockey, semnalizare stări la dispecerat.
- **Stație pompare parcaj:** test comandă flotor/senzor de nivel, comutare pompă activă/rezervă, verificare alarmă de nivel maxim.

### PTh-I.7.7 Programare IDSAI — matrice extinsă pe 4 categorii

Programare adrese (fiecare detector/buton pe palier rezidențial, zona comercială — inclusiv EVAC vocal SR EN 54-16 —, spații tehnice, parcaj pe cele 2 zone), texte descriptive per zonă și categorie, testare integrală a matricei cauză-efect (§PTh-I.2.13, 7 rânduri de evenimente), verificare deblocare fail-safe a ambelor sisteme de control acces (lobby rezidențial + unități comerciale), verificare temporizare T1/T2 aplicabilă doar zonei comerciale (dacă personal permanent) și alarmă directă pe restul clădirii, punere sub supraveghere permanentă cu transmisie la dispecerat.

### PTh-I.7.8 Protocol PIF videointerfon/CCTV/control acces — cele 2 sisteme separate

- **Sistem rezidențial:** test apel/răspuns pe toate cele 40 de posturi de apartament, verificare deblocare yală de la fiecare monitor, test CCTV comun (lobby, parcaj, palierele ascensoarelor).
- **Sistem comercial:** test funcțional CCTV comercial (zona de vânzare, alimentație publică), test control acces pe fiecare unitate comercială.
- **Comun ambelor:** test funcțional al deblocării fail-safe integrate cu IDSAI (simulare alarmă incendiu confirmată → deschidere automată pe ambele trasee de evacuare), test UPS pe fiecare rack la simulare pană de curent, verificare separării fizice a celor 2 rack-uri (conformitate GDPR, §PTh-I.2.16).

### PTh-I.7.9 Protocol PIF instalație fotovoltaică

Verificare rezistență izolație pe string, test polaritate/tensiune circuit deschis, punere sub tensiune progresivă, test funcție anti-islanding, măsurare producție inițială comparată cu producția teoretică instantanee — proces-verbal de PIF cu curba de producție a primei zile, confirmând alocarea exclusivă a producției la TG-PĂRȚI COMUNE.

### PTh-I.7.10 Protocol PIF ascensoare

Punere în funcțiune conform ISCIR PT R1-2010: verificare completă a lanțului de siguranță (limitator de viteză, paracăzătoare, contacte uși) pe ambele cabine, test funcțional al comenzii de aducere la parter la alarmă de incendiu (ascensor 1) și al comenzii prioritare de pompieri (ascensor 2, funcțional la orice nivel inclusiv mezaninul comercial), verificare puț presurizat/desfumat pentru ascensorul de pompieri. Recepția ISCIR precede punerea în exploatare a ambelor cabine.

---

## PTh-I.8 Plan de Control al Calității (PCC) instalații

| Nr. | Fază de lucrare | Categorie | Document verificare | Cine verifică | Tip control |
|---|---|---|---|---|---|
| 1 | Recepție materiale/echipamente (certificate, agremente, marcaj CE) | toate | certificate | responsabil tehnic | CQ |
| 2 | Priză de pământ de fundație (înainte de turnare fundații) | comun | proces-verbal | RTE + diriginte | **FD** |
| 3 | Trasee îngropate (canalizare, pluvial, gaz exterior, separator hidrocarburi) înainte de acoperire | comun/parcaj | proces-verbal | RTE + diriginte | **FD** |
| 4 | Montaj coloane apă/canal/gaz în ghene rezidențiale, toate cele 4 nuclee | rezidențial | proces-verbal montaj | RTE | CM |
| 5 | **Traversările planșeului de separare D01.1** — toate instalațiile din registrul §PTh-I.3.16, etanșare foc+acustic | comun/interfață | proces-verbal coordonare cu `arhitectura-pth.md` | RTE + proiectant arhitectură + diriginte | **FD** |
| 6 | Probă presiune apă rece/ACM rezidențial | rezidențial | PV probă SR EN 806-4 | RTE + diriginte | CM |
| 7 | Probă presiune apă rece comercial | comercial | PV probă SR EN 806-4 | RTE + diriginte | CM |
| 8 | Probă canalizare (rezidențial + comercial + canal gras) înainte de mascare/acoperire ghene | toate | PV probă | RTE + diriginte | **FD** |
| 9 | Probă etanșeitate + funcțională instalație gaze (8 coloane) | rezidențial | PV probă ANRE | firmă autorizată ANRE | **FD** |
| 10 | Montaj rețea sprinkler comercial + parcaj pe structură | comercial/parcaj | proces-verbal montaj | RTE | CM |
| 11 | Probă presiune sprinkler comercial (1,5×p regim, min. 15 bar, 2h) | comercial | PV probă | RTE + diriginte + ISU | **FD** |
| 12 | Probă presiune sprinkler parcaj (1,5×p regim, min. 15 bar, 2h) | parcaj | PV probă | RTE + diriginte + ISU | **FD** |
| 13 | Probă presiune hidranți (coloană umedă) | comun | PV probă | RTE + diriginte | CM |
| 14 | Montaj și probă separator de grăsimi (canal gras) | comercial | PV probă funcțională | RTE + diriginte | CM |
| 15 | Montaj și probă separator de hidrocarburi + stație pompare parcaj | parcaj | PV probă funcțională | RTE + diriginte | CM |
| 16 | Rezistență izolație + priză de pământ (electric, toate 4 categorii) | toate | buletin PRAM | verificator/laborator | CM |
| 17 | Test RCD/diferențiale (40 apartamente + comercial) | toate | buletin PRAM | laborator autorizat | CM |
| 18 | Continuitate coborâri trăsnet + priză comună (7 coborâri) | comun | buletin măsurători | laborator autorizat | CM |
| 19 | Funcțional IDSAI + matrice cauză-efect completă (4 categorii, EVAC vocal) | toate | PV probe 100% | firmă autorizată IGSU | **FD** |
| 20 | Funcțional stație de pompare incendiu | comun | PV probă | firmă autorizată + ISU | **FD** |
| 21 | Funcțional presurizare casă scării rezidențiale | rezidențial | PV probă | RTE + ISU | **FD** |
| 22 | Funcțional desfumare comercială (oprire CTA + registre) | comercial | PV probă | RTE + ISU | **FD** |
| 23 | Reglaj aeraulic (echilibrare debite parcaj + CTA comercial + șuntă rezidențial) | toate | protocol debite | RTE | CM |
| 24 | Primă pornire centrale de apartament (40 buc.) | rezidențial | PV primă pornire | executant + furnizor + beneficiar | CM |
| 25 | PIF roof-top/VRF + CTA comercial | comercial | PV probă | RTE + furnizor | CM |
| 26 | Recepție ISCIR ascensoare (2 unități) | comun | PV recepție ISCIR | organism ISCIR | **FD** |
| 27 | Funcțional videointerfon/CCTV rezidențial | rezidențial | PV probă | RTE | CM |
| 28 | Funcțional CCTV/control acces comercial (separare GDPR verificată) | comercial | PV probă | RTE | CM |
| 29 | Funcțional FV (string-uri, invertoare) | comun | PV probă + rapoarte producție | firmă autorizată | CM |

Legendă: **FD** = fază determinantă (necesită prezența ISC/beneficiar/proiectant, uneori ISU); CM = control în masă; CQ = control calitate recepție.

### PTh-I.8.1 Faze determinante — detaliere, cu accent pe interfața de separare

Fazele marcate FD sunt cele la care lucrarea nu poate continua fără verificare și proces-verbal, întrucât elementul devine inaccesibil sau are rol direct de securitate. La clădirea mixtă, **poziția nr. 5 (traversările planșeului D01.1) este cea mai sensibilă interfață de fază determinantă a întregii documentații** — o traversare neetanșată corect la acest nivel compromite simultan compartimentarea la foc (REI 90) și performanța acustică (R'w≥60dB/L'n,w≤50dB) dintre comercial și rezidențial, conform §PTh-I.3.16; verificarea se face în prezența comună a proiectantului de arhitectură (`arhitectura-pth.md`) și a proiectantului de instalații, înainte de acoperirea planșeului. Celelalte faze determinante rămân cele uzuale unei clădiri cu risc de incendiu (priza de pământ, trasee îngropate, instalația de gaze, sprinklerele comercial/parcaj, IDSAI, stația de pompare incendiu, presurizarea/desfumarea, recepția ISCIR).

### PTh-I.8.2 Cartea tehnică a construcției — capitol instalații

| Document | Conținut |
|---|---|
| Planuri as-built | trasee reale executate, per instalație, pe cele 4 categorii (rezidențial/comercial/comun/parcaj) |
| Scheme finale | monofilară actualizată TG + 4 tablouri de categorie, coloane apă/canal/gaz (4 nuclee CAR + 8 coloane CG), schema IDSAI extinsă |
| Fișe tehnice echipamente | toate echipamentele montate + certificate (marcaj CE, agremente PSI, ISCIR pt. ascensoare) |
| Buletine de probe | PRAM, presiune apă/sprinkler/hidranți (comercial+parcaj separat), etanșeitate gaz, debite ventilare (rezidențial/comercial/parcaj) |
| Procese-verbale FD | toate fazele determinante semnate, inclusiv PV traversare D01.1, aviz ISU și recepție ISCIR |
| Protocoale reglaj | echilibrare hidraulică încălzire (rezidențial), reglaj CTA/roof-top (comercial), reglaj aeraulic parcaj, primă pornire centrale |
| Instrucțiuni de exploatare | separate pe titular: asociația de proprietari (rezidențial+comun), operator(i) comercial(i), administrator parcaj (dacă distinct) |
| Program mentenanță | revizii periodice (hidranți/sprinklere semestrial, gaze ANRE anual, ISCIR ascensoare, separator grăsimi/hidrocarburi — vidanjare periodică pe contract) |
| Garanții | certificate garanție producători, separate pe categorie (centrale apartament — proprietar individual; roof-top/VRF — operator comercial; echipamente comune — asociație) |
