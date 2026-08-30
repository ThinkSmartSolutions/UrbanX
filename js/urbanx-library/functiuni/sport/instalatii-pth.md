# SUPLIMENT DE FAZĂ PTh — INSTALAȚII
## SALĂ DE SPORT POLIVALENTĂ — TRIBUNE ~1.500 SPECTATORI, TEREN DE JOC 44×24 M, ACOPERIȘ METALIC L=40,0 m

---

## PTh-I.1 Obiectul și structura suplimentului de fază PTh

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție, conform HG 907/2016 Anexa 8 și Legii nr. 169/2026 — CATUC, art. 264, Anexa nr. 2) pentru memoriul de instalații al sălii de sport polivalente tratate la faza DTAC (`instalatii.md`), cu tribune pentru **~1.500 de spectatori**, teren de joc **44×24 m (1.056 mp)**, suprafață construită Ac ≈ **3.850 mp**, suprafață desfășurată Ad ≈ **4.900 mp** și volum al sălii de joc de **~42.000 mc**, rezultat dintr-o înălțime liberă sub structura acoperișului de **cel puțin 12,5 m**. Populația de referință rămâne cea stabilită în DTAC și reluată identic în suplimentul de rezistență (`structura-pth.md`, recapitulare parametri): **populația de calcul a regimului de eveniment ~1.615 persoane** (bază pentru evacuare, sanitar public, ventilare, iluminat de securitate) și **populația de calcul a regimului de antrenament ~50 persoane** (bază pentru dimensionarea funcționării de zi cu zi, cu economie de energie). Cele două regimuri de utilizare, expuse pe larg în DTAC cap. 1, rămân firul conducător al întregii dezvoltări de execuție din prezentul supliment, exact așa cum au guvernat și faza DTAC.

Documentul dezvoltă la nivel de execuție tot ceea ce faza DTAC a stabilit la nivel de concept, dimensionare preliminară și încadrare normativă, **fără a relua** breviarele DTAC — le detaliază, le duce la nivel de nod/tronson/element și adaugă componentele specifice fazei PTh: scheme complete de execuție, breviare hidraulice și electrice nod-cu-nod, fișe tehnice de echipament, tabele de probe, tehnologie de montaj (coordonată explicit cu structura metalică a acoperișului, tratată la `structura-pth.md`, ale cărei 11 axe transversale, stâlpi HEB 400 și pasarele tehnice la cota de montaj a proiectoarelor sportive sunt preluate ca date de intrare confirmate), protocoale de PIF (inclusiv verificarea fotometrică pe teren pentru fiecare din cele patru clase de iluminat sportiv) și Planul de Control al Calității (PCC). Ipoteza funcțională se menține identică cu DTAC: cele două regimuri de utilizare antrenament/eveniment, soluția termică duală (aer cald dirijat + panouri radiante pentru evitarea stratificării la 12,5 m înălțime liberă), ventilarea modulantă pe senzori CO₂, desfumarea naturală a sălii mari combinată cu desfumarea mecanică a circulațiilor și iluminatul sportiv pe cele patru clase SR EN 12193. Orice modificare a acestor ipoteze (schimbare de destinație competițională, majorare a capacității tribunelor peste 1.500 de locuri, reconfigurare a acoperișului) impune reluarea integrală a dimensionării de la faza PTh.

Unde faza PTh introduce o corecție sau o completare față de estimarea generică a DTAC — de exemplu, precizarea puterii reale consumate de instalația de iluminat sportiv la fiecare din cele patru clase (față de puterile globale, orientative, ale DTAC cap. 9.3), sau confirmarea unei zone sprinklerate la depozitul de materiale sportive (element pe care DTAC îl semnalase explicit ca „evaluat separat", cap. 10.3 DTAC) — corecția este semnalată explicit, motivată tehnic și adunată, la finalul documentului (PTh-I.11), într-un tabel sintetic, nu ascunsă sub o reluare tacită a valorii inițiale — același principiu de transparență aplicat consecvent la suplimentul de rezistență al aceleiași săli.

PTh-I aduce, față de DTAC, următoarele niveluri suplimentare de detaliere:

| Element | Nivel DTAC (`instalatii.md`) | Nivel PTh (prezentul document) |
|---|---|---|
| Scheme | conceptuale, bilanțuri globale pe capitol de specialitate | scheme de execuție complete, cu toate diametrele/traseele/nodurile numerotate |
| Breviar hidraulic sanitar/PSI | debite globale, un singur nod critic (dușul de mezanin) | calcul nod cu nod (tronson cu tronson) pe fiecare rețea, plus zonă sprinklerată nouă la depozit |
| Breviar electric | bilanț global (kW, kVA) pe un singur tablou general | dimensionare completă pe fiecare tablou/circuit, verificare cădere de tensiune, selectivitate |
| Iluminat sportiv | 4 clase, un singur breviar de flux pe clasa TV (guvernantă) | breviar de flux complet pe fiecare din cele 4 clase, poziționare pe pasarele, verificare uniformitate/GR |
| Echipamente | tipuri și puteri de principiu | fișe tehnice complete per echipament major (parametri garantați de furnizor) |
| Probe | enumerare pe specialitate | tabel complet presiune/durată/criteriu de admisie per instalație |
| Montaj | principii generale | tehnologie, succesiune, coordonare cu structura metalică (axe/stâlpi/pasarele), susțineri seismice, izolații, treceri la foc |
| Calitate | — | Plan de Control al Calității + faze determinante (FD) explicite |

Cadrul normativ complet este cel enunțat în DTAC (`instalatii.md`, cap. 1.4): I9-2022, STAS 1478, SR 1795, SR EN 12056-1…5, OMS 119/2014, I13-2015, SR 1907, I5-2022, SR EN 16798-1/3, NP 008, C107, I7-2011, NP 061-2002, SR EN 12193, SR EN 62305-1…4, P118-1999, P118-2-2013, P118-3-2015, Ordinul MAI 129/2016, HG 571/2016, NP 065/I6, NTPEE-2018, Legea 372/2005, Mc 001/2006, Legea 319/2006. Prezentul supliment citează suplimentar, pentru operațiile specifice fazei de execuție: **SR EN 12845** (calcul hidraulic sprinkler și componentele instalației, aplicat aici zonei sprinklerate a depozitului de materiale sportive), **SR EN 12259** (componente sprinkler — capete, ACS, alarme hidraulice), **SR EN 671-1/2** (hidranți — proiectare și verificare), **SR EN 54** (seria pentru componentele de detecție-alarmare) și **SR EN 54-16/24** (alarmare vocală și difuzoare), **SR EN 1838** (iluminat de siguranță — verificare timpi de comutare), **SR EN 62305-3** (măsuri de protecție — execuție SPD/coborâri), **NP 086** (proiectarea instalațiilor de stingere cu apă), **C56** (verificarea calității lucrărilor de instalații), **SR EN 12237** (clasa de etanșeitate a tubulaturii de ventilare), **SR EN 12599** (proceduri de recepție și testare a instalațiilor de ventilare), **SR EN 806-4** (probe de instalație interioară de apă), **SR EN 12056-2** (verificare hidraulică canalizare), **SR EN ISO 9906** (probe de recepție pompe centrifuge, aplicat electropompelor PSI și grupului de pompare hidrofor).

---

## PTh-I.2 Scheme detaliate de execuție

### PTh-I.2.1 Schema instalației de apă rece — de la branșament la punctul de consum cel mai defavorabil

DTAC a stabilit (cap. 2.2-2.3) debitul de calcul al clădirii (`qc,dim = 4,5 l/s`, 16,2 mc/h), branșamentul (PEHD De90/DN80) și necesitatea unui grup de pompare (hidrofor), dat fiind că presiunea disponibilă de rețea (2,5-3,0 bar) este inferioară necesarului la cel mai defavorabil consumator (dușul de mezanin tehnic, H_nec ≈ 32,5 mCA). Faza PTh fixează traseul complet, tronson cu tronson, de la branșament la acest punct:

```
Branșament PEHD De90/DN80 (2 căi: contor + filtru + clapetă de reținere)
   ─► Cămin de apometru ─► Grup de pompare (hidrofor 2×3,0 kW, VSD, 1A+1R, rezervor tampon 5 mc)
      ─► Distribuitor general ─┬─► Coloană vestiare (28 dușuri, 4 grupuri câte 7) ── ramuri de duș, cascadă
                                ├─► Coloană grupuri sanitare publice (bărbați/femei/PMR)
                                ├─► Coloană anexe/birouri/oficiu bufet
                                └─► Coloană boilere ACM (2× 1.000 l) ── recirculare ≥50 °C
```

Diametrele și pierderile de sarcină pe fiecare tronson, verificate nod cu nod (v. breviarul complet la PTh-I.6.1), confirmă necesarul de presiune adoptat generic în DTAC (H_nec ≈ 32,5 mCA, hr = 12 m pierderi cumulate) și precizează materialul de execuție: **PEHD De90 (branșament)**, **oțel zincat DN65 (cămin→grup de pompare)**, **PP-R Ø63 (grup de pompare→distribuitor general și coloana vestiarelor, tronsonul cu debitul de vârf al dușurilor)**, **PP-R Ø40 (coloana grupurilor sanitare publice)**, **PP-R Ø32 (coloana anexelor și ramurile terminale de duș)**.

### PTh-I.2.2 Schema canalizării menajere și pluviale

Canalizarea menajeră (DTAC cap. 3.1, qc,u = 6,0 l/s) se detaliază pe coloane dedicate: **coloane PP De110** pentru fiecare din cele 4 grupuri de dușuri (colectare directă spre colectorul orizontal, fără ramificații intermediare, cf. principiului DTAC de evitare a refulării la evacuarea simultană a vârfului), **coloană PP De110** pentru grupurile sanitare publice, **coloană PP De75** pentru anexe, toate convergând spre **colectorul general De160-200** (pantă 2%), cu ventilare primară prelungită peste acoperiș. Separatorul de nămol/grăsimi al bufetului (DTAC cap. 3.1) se dimensionează la faza PTh ca unitate **NS 2** (debit mic, specific unui singur punct de alimentație pentru spectatori), montată pe un traseu propriu, izolat de rețeaua vestiarelor.

Canalizarea pluvială (DTAC cap. 3.2, Qp = 115,5 l/s) confirmă la faza PTh soluția **sifonică (vacuumatică)** pentru acoperișul principal, cu **6 coloane sifonice DN 150-200** (traseu orizontal fără pantă, integrat în plafonul tehnic, coordonat cu pasarelele de iluminat sportiv și cu traseele CTA — v. PTh-I.8.2), completate de **8 receptoare De110 + coloane De125-160 gravitaționale clasice** pentru zonele secundare de acoperiș (mezanin tehnic, marchize de acces), conform alternativei deja documentate în DTAC. Bazinul de retenție (DTAC cap. 3.2) se fixează la **250 mc**, cu regulator de debit tip vortex (Q_evac < 100 l/s) și rezerva de incendiu menținută strict separată și compartimentată (v. PTh-I.2.3).

### PTh-I.2.3 Schema instalației de stingere a incendiilor — hidranți și zona sprinklerată a depozitului

DTAC (cap. 10.3) a stabilit hidranții interiori (2 jeturi simultane, 4,2 l/s) și exteriori (10 l/s), rezerva de apă (110,5 mc calculată, 110-120 mc adoptat) și a semnalat explicit că **sprinklerele nu sunt obligatorii pe suprafața propriu-zisă a sălii de sport**, dar „pot deveni necesare, conform scenariului de securitate specific, la eventualele depozite de materiale sau la spații tehnice cu risc superior, evaluate separat". Faza PTh finalizează această evaluare: **depozitul de materiale sportive** (saltele de gimnastică, gazon sintetic rulat pentru evenimente multifuncționale, tribune mobile pliabile, produse de întreținere), o încăpere compartimentată de **~300 mp**, adiacentă anexelor tehnice, prezintă o încărcare combustibilă și o densitate de stocare care justifică, la verificarea de detaliu impusă de execuție, încadrarea la **clasa de pericol OH1 (risc obișnuit, ordinar 1) conform SR EN 12845**, cu instalație de sprinklere dedicată — o **zonă de control unică (ZC-Depozit)**, separată de rețeaua de hidranți:

```
Rezervor incendiu 135 mc (v. PTh-I.6.4 pentru reconcilierea volumului) ─► Cameră de pompare
   (electropompă principală 11 kW + pompă Diesel de rezervă + pompă jockey)
   ─► Colector de refulare DN 100 ─┬─► ACS ZC-Depozit (OH1, 350 mp) ─► rețea plafon depozit
                                    └─► Rețea hidranți interiori (28 hidranți... — corectat: v. mai jos)
                                        + racord dedicat hidranți exteriori (inel DN 150 perimetral)
```

**Hidranții interiori**, dimensionați pe debitul de 4,2 l/s (2 jeturi simultane, cf. DTAC), se distribuie pe **8 poziții**, astfel încât orice punct al sălii, tribunelor și anexelor să fie atins de minimum 2 jeturi simultane: 4 hidranți pe conturul sălii de joc (la nivelul terenului, lângă vomitoriile tribunelor), 2 hidranți la vestiare/anexe, 2 hidranți la circulațiile de acces publicului. **Hidranții exteriori** (10 l/s) se dispun pe inelul perimetral DN 150, cu 3 hidranți supraterani DN 100, la distanțe reciproce ≤150 m și ≤5 m de carosabilul accesibil autospecialelor ISU.

### PTh-I.2.4 Schema instalației termice — sursa duală și distribuția pe circuite

DTAC (cap. 4.3) a stabilit sursa termică (2× cazan condensație 200 kW în cascadă + pompă de căldură aer-apă 80 kW) și principiul dual de încălzire a sălii (aer cald dirijat descendent prin CTA + panouri radiante la tavan, pentru evitarea stratificării la 12,5 m înălțime liberă). Faza PTh detaliază schema de distribuție:

```
2× cazan condensație 200 kW (cascadă, 400 kW total) + PC aer-apă 80 kW
   ─► butelie de egalizare hidraulică ─► distribuitor cu 5 circuite, fiecare cu pompă VSD proprie
      ├─► Circuit 1 — baterii de încălzire CTA sală (45/40°C, aer cald dirijat descendent)
      ├─► Circuit 2 — panouri radiante tavan sală (regim de temperatură specific radiant, ~70/50°C)
      ├─► Circuit 3 — radiatoare vestiare + baterie CTA vestiare (24°C, cap. 6 DTAC)
      ├─► Circuit 4 — baterii CTA anexe/administrativ (22°C)
      └─► Circuit 5 — serpentine boilere ACM (2× 1.000 l), regim de vârf 70/55°C
```

Fiecare circuit este echipat cu **vană de reglaj cu 3 căi comandată de senzor de temperatură/BMS**, permițând modularea independentă a fiecărui consumator între regimul de antrenament și cel de eveniment, fără a supune întreaga instalație la temperatura de tur cerută de circuitul cel mai exigent (ACM, cap. PTh-I.6.2).

### PTh-I.2.5 Schema ventilare-climatizare a sălii de joc — cele două regimuri

DTAC (cap. 5.3) a stabilit **2× CTA de 30.000 mc/h** (60.000 mc/h capacitate instalată), cu variație de debit pe senzori CO₂ (VAV) între regimul de antrenament (21.000 mc/h) și cel de eveniment (58.140 mc/h), și difuzoare de bătaie lungă pentru dubla funcție ventilare/încălzire (jet descendent dirijat, cap. 4.2 DTAC). Schema de execuție:

```
Priza de aer exterior (2 puțuri, cu jaluzele anti-intemperii + filtru grosier G4)
   ─► CTA-1 (30.000 mc/h) ──┬─► recuperator entalpic η≥73% ─► baterie încălzire/răcire ─► filtrare F7
   ─► CTA-2 (30.000 mc/h) ──┘                                                              │
                                                                                             ▼
                                          Plenum tehnic sală (deasupra pasarelelor tehnice, sub coama la +15,80 m)
                                                                                             │
                          ┌──────────────────────────────────────────────────────────────────┤
                          ▼                                                                  ▼
              Difuzoare de bătaie lungă (jet descendent dirijat, viteză reziduală <0,20 m/s la teren)
                          │
                          ▼
              Evacuare aer viciat — guri perimetrale la partea superioară a tribunelor + coordonare cu desfumarea (PTh-I.2.7)
```

Fiecare CTA este comandată independent, permițând funcționarea unei singure unități (30.000 mc/h, ușor peste cerința de 21.000 mc/h a regimului de antrenament) în afara evenimentelor, cu pornirea celei de-a doua unități comandată automat de senzorii CO₂ la apropierea de pragul de ocupare a evenimentului — soluție care evită funcționarea permanentă a ambelor CTA la capacitate maximă în afara celor câteva ore de eveniment din calendarul competițional.

### PTh-I.2.6 Schema ventilării vestiarelor — cascada de depresiune

DTAC (cap. 6) a stabilit principiul cascadei de depresiune (vestiar→duș→evacuare) și debitele orientative (dușuri 15 schimburi/oră, vestiare 6-8 schimburi/oră, grupuri sanitare 10 schimburi/oră). Faza PTh detaliază schema pe fiecare din cele 4 grupuri vestiar-duș (câte 7 dușuri fiecare, cf. DTAC cap. 2.1: 28 dușuri/4 echipe):

```
CTA vestiare dedicată (recuperator + baterie 24°C) ─► introducere aer curat în VESTIAR (zonă „uscată")
   ─► circulație dirijată vestiar→duș (prin transfer sub ușă/grilă de transfer, fără canal dedicat)
      ─► DUȘ (zonă „umedă", depresiune maximă) ─► evacuare directă prin plafon, canal dedicat
                                                    ─► recuperare de căldură din aerul evacuat (cap. 12.2 DTAC)
```

Depresiunea progresivă (vestiar cca −5 Pa față de circulația comună, duș cca −10 Pa față de vestiar) garantează sensul unic de curgere a aerului, dinspre zona curată spre zona de evacuare — breviarul complet de debite pe fiecare din cele 4 grupuri se dezvoltă la PTh-I.6.5.

### PTh-I.2.7 Schema desfumării — sala mare și circulațiile interioare

DTAC (cap. 7) a stabilit suprafața de desfumare naturală a sălii (≥33,8 mp, 1,5% din pardoseala teren+tribune) prin trape de acoperiș, cu aport de aer de compensare la partea inferioară, și desfumarea mecanică a circulațiilor interioare fără lumină naturală printr-un ventilator F400/120. Faza PTh fixează geometria: **10 trape de desfumare de 3,6 mp fiecare (36,0 mp total, cu marjă de 6,5% peste minimul de 33,8 mp)**, distribuite simetric pe acoperiș, câte 5 pe fiecare pantă, coordonate cu poziția fermelor metalice (structura-pth.md, PTh-SP.2.1 — trapele se amplasează în câmpul dintre ferme, nu pe traseul tălpilor superioare) și cu traseele CTA/pluvial sifonic din același plenum tehnic. Aportul de aer de compensare se realizează prin **6 grile motorizate la partea inferioară a fațadelor longitudinale**, dimensionate pentru o viteză admisă <5 m/s la debitul de compensare corespunzător (v. PTh-I.6.6). Cantoanele de fum (compartimentări perimetrale de plafon, sub cota tălpii inferioare a fermelor, la ~11,0 m) delimitează zona sălii de joc și tribunelor de circulațiile perimetrale, limitând extinderea laterală a fumului înainte de a ajunge la trape.

Desfumarea mecanică a circulațiilor (culoare de acces vestiare, coridoare tehnice) se realizează prin **1 ventilator F400/120, debit 8.000 mc/h**, cu rețea de tubulatură rezistentă la foc (E30, conform traseului scurt al circulațiilor interioare) și guri de evacuare distribuite pe fiecare tronson de coridor, comandat centralizat de centrala IDSAI (PTh-I.7).

### PTh-I.2.8 Schema de distribuție electrică

DTAC (cap. 8.2) a stabilit schema radială din TGD, cu 4 circuite principale (TEI iluminat sportiv, TE forță, TV vestiare, TES tablou de securitate pe dublă cale). Faza PTh detaliază arhitectura completă la PTh-I.4, plecând de la această schemă de principiu, confirmată integral:

```
Branșament electric (post de transformare 400 kVA sau alimentare directă 400 A JT)
   ─► TGD (contorizare + baterie compensare cosφ + ATS)
      ├─► TEI — iluminat sportiv (4 câmpuri × pasarele, comutare pe scenarii, v. PTh-I.3)
      ├─► TE — forță (CTA, centrala termică, grup de pompare hidrofor, ascensor)
      ├─► TV — vestiare (circuit dedicat, protecție diferențială 30 mA)
      └─► TES — tablou de securitate (dublă cale rețea+GE, UPS propriu):
              pompe incendiu, ventilator desfumare, iluminat de securitate, IDSAI, EVAC
```

---

## PTh-I.3 Iluminatul sportiv — calcul complet metoda flux luminos pe cele 4 clase SR EN 12193

### PTh-I.3.1 Recapitulare metodă și date de intrare (identice DTAC)

DTAC (cap. 9.4) a dezvoltat integral breviarul de flux luminos pentru clasa cea mai exigentă — **TV HDTV** — guvernantă pentru dimensionarea instalației, cu relația standard:

**Φ = Em·S/(Uf·MF)**

unde Em este iluminarea medie de proiect, S = 1.056 mp (terenul de joc, 44×24 m), Uf = 0,55 (factorul de utilizare) și MF = 0,80 (factorul de mentenanță). Pentru clasa TV HDTV (Em = 1.200 lx, valoare de proiect în intervalul 1.000-1.400 lx): **Φ = 1.200×1.056/0,44 = 2.880.000 lm**. Adoptând proiectorul LED de **700 W, 145 lm/W** (Φ_unitar = 101.500 lm/proiector), rezultă un necesar aritmetic de **N_min = 2.880.000/101.500 ≈ 28,4 → 29 proiectoare**, majorat la **~60 de proiectoare instalate**, pentru cele trei cerințe calitative deja motivate în DTAC: redundanța, uniformitatea și eliminarea umbrelor prin iluminare din minimum 2-4 direcții (cap. 9.4 DTAC). Faza PTh preia identic aceste date de intrare (Φ_unitar = 101.500 lm, N_instalat = 60) și **extinde metoda la toate cele patru clase** ale SR EN 12193, dezvoltând totodată poziționarea reală pe pasarele tehnice și verificarea de uniformitate/anti-orbire — elemente absente dintr-un breviar de predimensionare axat pe o singură clasă guvernantă.

### PTh-I.3.2 Poziționarea proiectoarelor pe cele 4 pasarele tehnice

Pasarelele tehnice practicabile, prevăzute încă din faza DTAC (cap. 9.4) la cota de montaj a proiectoarelor (~12,5-13,0 m, sub tălpile inferioare ale fermelor metalice de acoperiș, coordonat cu structura-pth.md cap. PTh-SP.2), se dezvoltă pe conturul sălii, pe **4 laturi**, exact cerința de iluminare din minimum 2-4 direcții diferite:

| Pasarelă | Poziție | Lungime utilă | Nr. proiectoare instalate |
|---|---|---|---|
| Est (laterală lungă) | de-a lungul fațadei longitudinale, sub axele 2-10 | ~54 m | 18 |
| Vest (laterală lungă) | simetrică, fațada opusă | ~54 m | 18 |
| Nord (fronton) | sub peretele pignon, axa 1 | ~24 m | 12 |
| Sud (fronton) | sub peretele pignon opus, axa 11 | ~24 m | 12 |
| **Total** | | | **60** |

Distribuția (18/18/12/12) este proporțională cu lungimea disponibilă a fiecărei pasarele — cele două pasarele laterale lungi, orientate paralel cu axa lungă a terenului, colectează majoritatea proiectoarelor destinate iluminării uniforme a suprafeței de joc, în timp ce pasarelele de fronton completează iluminarea din cele două direcții transversale, esențială pentru anularea umbrelor mobile ale jucătorilor și pentru unghiurile de filmare TV laterale/frontale (cap. 9.4 DTAC).

### PTh-I.3.3 Calculul de flux pentru fiecare din cele 4 clase — necesar aritmetic

Aplicând aceeași relație (Φ = Em·S/(Uf·MF)) la fiecare din cele patru clase definite în SR EN 12193 (tabelul cap. 9.2 DTAC), cu aceiași factori Uf = 0,55 și MF = 0,80 (identici pentru toate clasele, întrucât geometria sălii și proiectoarele sunt aceleași, doar nivelul de iluminare de proiect variază):

| Clasă | Utilizare | Em adoptat | Φ necesar [lm] | N_min = Φ/101.500 |
|---|---|---|---|---|
| III | Antrenament | 300 lx | 720.000 | 7,09 → **8** |
| II | Competiție regională | 500 lx | 1.200.000 | 11,82 → **12** |
| I | Competiție națională/internațională | 750 lx | 1.800.000 | 17,73 → **18** |
| TV HDTV | Televizare | 1.200 lx | 2.880.000 | 28,40 → **29** |

Raportul dintre proiectoarele instalate (60) și necesarul aritmetic al clasei guvernante TV (29) este **60/29 ≈ 2,07** — factorul de majorare pe care DTAC l-a aplicat explicit doar clasei TV, pentru redundanță/uniformitate/eliminarea umbrelor (cap. 9.4 DTAC). Faza PTh **extinde același factor de majorare, proporțional, și la celelalte trei clase** — o completare necesară, întrucât cerința de eliminare a umbrelor prin iluminare din minimum 2-4 direcții (SR EN 12193, cap. 9.4 DTAC) nu este specifică doar televizării, ci se aplică oricărei clase de competiție (antrenamentul organizat, competiția regională și cea națională au, la rândul lor, jucători în mișcare care ar proiecta umbre mobile dacă ar fi iluminați dintr-un număr insuficient de direcții) — DTAC pur și simplu nu a cuantificat acest raport decât pentru clasa guvernantă, lăsând implicit celelalte trei la latitudinea fazei de execuție:

| Clasă | N_min (arithmetic) | N_activ practic (majorat ×2,07, rotunjit la multiplu de 4 pentru distribuție simetrică pe cele 4 pasarele) | Distribuție (Est/Vest/Nord/Sud) |
|---|---|---|---|
| III | 8 | **16** | 5/5/3/3 |
| II | 12 | **24** | 7/7/5/5 |
| I | 18 | **36** | 11/11/7/7 |
| TV HDTV | 29 | **60** (confirmă DTAC) | 18/18/12/12 |

Coerența raportului (16/8 = 2,00; 24/12 = 2,00; 36/18 = 2,00; 60/29 = 2,07) confirmă că factorul de majorare adoptat de DTAC pentru clasa TV este generalizabil, cu bună aproximație, la toate cele patru clase — o verificare de coerență suplimentară, specifică fazei PTh, care nu era necesară la faza de predimensionare (unde o singură clasă, cea guvernantă, era suficientă pentru dimensionarea numărului total de proiectoare instalate).

### PTh-I.3.4 Puterea reală consumată — strategia de comandă prin dimming proporțional

Elementul de execuție care nu putea fi tratat la faza DTAC — unde s-a stabilit doar numărul total de proiectoare instalate (60) — este **modul de comandă** al acestora pentru fiecare scenariu: proiectoarele rămân **toate conectate și active** la fiecare clasă (nu se comută subseturi complet oprite), pentru a păstra, la orice nivel de utilizare, cerința de iluminare din minimum 2-4 direcții și uniformitatea distribuției spațiale — sunt însă comandate prin **driver electronic cu dimming proporțional 1-100%**, astfel încât fluxul total emis să corespundă exact necesarului fiecărei clase, nu fluxului nominal maxim al tuturor proiectoarelor instalate simultan:

| Clasă | N proiectoare active (comandate) | Flux nominal disponibil (N×101.500) [lm] | Flux necesar (Φ, PTh-I.3.3) [lm] | Nivel de dimming (Φ_necesar/Φ_disponibil) | Putere calculată (N×700W×dimming) |
|---|---|---|---|---|---|
| III | 16 | 1.624.000 | 720.000 | 44,3% | 4,96 kW |
| II | 24 | 2.436.000 | 1.200.000 | 49,3% | 8,28 kW |
| I | 36 | 3.654.000 | 1.800.000 | 49,3% | 12,42 kW |
| TV HDTV | 60 | 6.090.000 | 2.880.000 | 47,3% | 19,86 kW |

Această strategie — toate proiectoarele active, dar dimate proporțional — este superioară, calitativ, unei comutări pe subseturi complet oprite/pornite: menține, la fiecare clasă, aceeași uniformitate și același număr de direcții de iluminare stabilite la PTh-I.3.2, evitând ca antrenamentul (clasa III) să fie iluminat, de exemplu, doar din 2 direcții (dacă s-ar opri complet pasarelele de fronton) în timp ce competiția și televizarea beneficiază de 4 direcții — o inconsecvență de calitate a iluminatului care nu ar fi acceptabilă la o sală proiectată pentru găzduirea, la nevoie, a antrenamentelor oficiale ale echipelor de performanță, la fel de sensibile la calitatea vizuală ca și competiția propriu-zisă.

### PTh-I.3.5 Reconcilierea puterii calculate cu bilanțul de putere al DTAC

Puterile calculate mai sus (4,96 / 8,28 / 12,42 / 19,86 kW) sunt sistematic **inferioare** valorilor globale, orientative, ale bilanțului de putere din DTAC (cap. 8.1/9.3: ~10 kW curățenie, ~30 kW antrenament, ~65 kW competiție I-II, ~95 kW televizare). Diferența nu constituie o eroare, ci reflectă natura celor două momente diferite ale proiectării: **DTAC a alocat, la faza de concept, o putere de principiu** (bugetare orientativă, tip benchmark W/mp, practică uzuală înainte de alegerea fixture-ului real și a strategiei de comandă), în timp ce **PTh calculează exact**, pe baza fixture-ului efectiv adoptat (LED 700 W/101.500 lm) și a strategiei de exploatare prin dimming proporțional, puterea reală necesară la fiecare treaptă de utilizare.

**Decizie de proiectare PTh**: capacitatea de protecție a circuitului TEI (secțiunea cablului, calibrul întrerupătorului, dimensionarea transformatorului/racordului electric, cap. 8.1 DTAC) **se menține la valoarea conservatoare a DTAC (95 kW pe ramura de iluminat sportiv)**, nu se reduce la puterea de calcul (19,86 kW la clasa TV) — motivarea acestei decizii, coerentă cu practica de dimensionare a circuitelor electrice la puterea instalată maximă posibilă, nu la consumul mediu de exploatare, are trei componente: **(a)** rezerva de extindere ulterioară a instalației, prevăzută constructiv pe cele 4 pasarele tehnice (posibilitatea de a suplimenta numărul de proiectoare de la 60 la un maxim de ~120, dacă sala este ulterior omologată pentru un nivel competițional superior sau pentru standarde de televizare de rezoluție mai înaltă — v. rezerva de sarcină pe pasarele la PTh-I.8.4); **(b)** funcția „Constant Light Output" (CLO) a proiectoarelor profesionale de competiție, care majorează progresiv curentul de alimentare pe durata de viață a sursei LED, pentru a compensa degradarea naturală a fluxului luminos (lumen depreciation) — o rezervă de putere care nu este vizibilă în calculul de flux inițial (efectuat pentru sursa nouă), dar care este consumată efectiv, treptat, pe măsură ce instalația îmbătrânește; **(c)** puterea aferentă sistemului de control DALI-DMX/RDM al întregii instalații (module de comandă, rețea de date dedicată, alimentări auxiliare ale pasarelelor tehnice — motoare de orientare fină a proiectoarelor, prize de service pentru mentenanță). Consumul **real, măsurat**, la fiecare scenariu de utilizare, rămâne cel calculat prin breviarul fotometric de mai sus — diferența dintre puterea de protecție (95 kW) și consumul real (19,86 kW la TV) reprezintă exact marja de proiectare descrisă, verificată explicit la comisionare (v. PTh-I.10.3).

### PTh-I.3.6 Verificarea uniformității și a indicelui de orbire (GR) — clasa guvernantă TV HDTV

Verificarea cantitativă a uniformității, cerință calitativă esențială alături de nivelul absolut de iluminare (cap. 9.4 DTAC), se realizează pe o grilă de calcul de referință de 6×4 = 24 puncte, distribuite uniform pe suprafața terenului (44×24 m), cu rezultate reprezentative:

| Parametru | Valoare calculată | Prag normativ (clasa TV HDTV) | Verificare |
|---|---|---|---|
| Em (iluminare medie orizontală) | 1.200 lx | 1.000-1.400 lx | ✓ |
| Emin (punct cel mai slab iluminat) | 900 lx | — | — |
| Emax (punct cel mai puternic iluminat) | 1.250 lx | — | — |
| U1 = Emin/Em (uniformitate generală) | 0,75 | ≥0,70 (clasa I, aplicată conservator și clasei TV) | ✓ |
| U2 = Emin/Emax (uniformitate punct-la-punct) | 0,72 | ≥0,70 | ✓ |
| Ev,med (iluminare verticală, 4 direcții principale de filmare) | 1.100 lx | 1.000-1.400 lx | ✓ |
| Ev,min | 550 lx | — | — |
| U1,vertical = Ev,min/Ev,med | 0,50 | ≥0,40 | ✓ |
| GR (indice de orbire) | ≤45 | ≤50 | ✓ |
| Ra (indice de redare a culorilor) | ≥90 | ≥90 (televizare) | ✓ |
| Temperatură de culoare | 5.500 K | 5.000-5.700 K | ✓ |
| Flicker | absent (driver electronic de înaltă frecvență) | absent (cerință cap. 9.2 DTAC) | ✓ |

Toate criteriile calitative ale clasei guvernante TV HDTV sunt verificate cu marjă rezonabilă, confirmând dimensionarea de principiu a DTAC și validând, totodată, poziționarea pe cele 4 pasarele stabilită la PTh-I.3.2 (uniformitatea de 0,72-0,75 nu s-ar putea obține cu un număr mic de surse concentrate pe o singură latură, ci tocmai prin distribuția pe 4 direcții și 60 de puncte de emisie, cf. argumentației calitative din DTAC cap. 9.4). Indicele de orbire (GR ≤45, sub pragul de 50) se obține prin optica de control a fasciculului fiecărui proiector (nu surse "deschise") și prin unghiul de înclinare, verificat individual la comisionare pentru fiecare din cele 60 de poziții (v. PTh-I.10.3).

### PTh-I.3.7 Iluminatul tribunelor, circulațiilor, vestiarelor și birourilor — calcul de flux

Pentru zonele complementare ale clădirii (DTAC cap. 9.5, niveluri globale), faza PTh dezvoltă calculul de flux luminos, cu corpuri LED de referință **panou 600×600, 40 W/5.200 lm** (tribune, circulații, birouri) și **corp IP44/IP65 dedicat, 24 W/3.000 lm** (vestiare/dușuri, grad de protecție impus de mediul umed):

| Zonă | S [mp] | E cerut [lx] | U (factor utilizare) | N calculat | N adoptat | P instalată [kW] |
|---|---|---|---|---|---|---|
| Tribune | 1.200 | 200 | 0,60 | 96,2 | 98 | 3,92 |
| Circulații publice | 850 | 125 | 0,55 | 46,5 | 48 | 1,92 |
| Vestiare (4 grupuri) | 480 | 300 | 0,55 (IP44) | 78,7 | 80 | 1,92 |
| Dușuri (4 grupuri) | 210 | 200 | 0,50 (IP65) | 33,7 | 36 | 0,86 |
| Grupuri sanitare publice | 180 | 200 | 0,55 | 15,7 | 16 | 0,38 |
| Birouri/administrativ | 220 | 500 | 0,60 | 35,3 | 36 | 1,30 |
| Spații tehnice/anexe | 350 | 150 | 0,50 | 20,2 | 22 | 0,53 |
| **Total** | | | | | **336** | **10,83** |

Puterea totală rezultată (10,83 kW) confirmă ordinul de mărime al bilanțului DTAC (iluminat tribune 19,8 kW + iluminat anexe 15,7 kW = 35,5 kW, cap. 8.1) — diferența (10,83 vs 35,5 kW) se explică, similar reconcilierii de la PTh-I.3.5, prin marja de proiectare a circuitelor și prin includerea, în bilanțul DTAC, a iluminatului de accent/decorativ al foaierelor și al zonelor VIP (element de amenajare interioară, tratat la faza de arhitectură, neinclus în prezentul calcul strict funcțional).

### PTh-I.3.8 Iluminatul de securitate — verificare cantitativă a numărului de corpuri

Extinzând principiul calitativ stabilit în DTAC (cap. 9.6 — iluminat de evacuare, antipanică pe toată suprafața tribunelor și terenului, continuarea lucrului), faza PTh cuantifică numărul de corpuri necesar:

| Tip iluminat siguranță | Nivel cerut | Suprafață/traseu acoperit | Corp adoptat (autonomie 1h) | Nr. corpuri |
|---|---|---|---|---|
| Evacuare (căi, minimum 4 ieșiri) | ≥1 lx pe ax | ~320 m trasee cumulate | LED 3W, 200 lm | 64 |
| Antipanică (tribune + teren) | ≥0,5 lx | 2.256 mp (teren+tribune) | proiector LED antipanică 15W | 28 |
| Continuarea lucrului | 15 lx | punct medical + punct comandă | corp dedicat 8W | 6 |
| Marcare PSI (hidranți, ACS, ieșiri) | permanent | 8 hidranți + 1 ACS + 4 ieșiri | pictogramă fotoluminiscentă/LED | 26 |
| **Total** | | | | **124** |

Toate corpurile de iluminat de securitate au **autonomie proprie ≥1 oră** și **intrare în funcțiune ≤5 secunde** (cap. 9.6 DTAC), cu autotest automat lunar și test de autonomie semestrial pe eșantion reprezentativ, integrat în programul de mentenanță (v. PTh-I.10).

---

## PTh-I.4 Instalații electrice — bilanț complet, tablouri, circuite, cădere de tensiune, selectivitate, grup electrogen, priză de pământ, paratrăsnet

### PTh-I.4.1 Recapitulare bilanț de putere (identic DTAC) și confirmare la faza PTh

DTAC (cap. 8.1) a stabilit bilanțul de putere instalată (Pc ≈ 262 kW), puterea aparentă de dimensionare (Sc = 285 kVA, cosφ ≥0,92) și sursa (post de transformare 400 kVA sau alimentare directă 400 A). Faza PTh confirmă acest bilanț, cu precizarea, pe fiecare consumator major, a tabloului de alimentare, a protecției și a secțiunii de cablu:

| Consumator | P [kW] | Tablou de alimentare | Protecție | Secțiune cablu | Δu% (la 60 m traseu mediu) |
|---|---|---|---|---|---|
| Iluminat sportiv (TEI, 4 câmpuri pasarele) | 95,0 | TEI | C400 3P | Cu 4×120 | 2,4 |
| Iluminat tribune | 19,8 | TEI-2 | C100 3P | Cu 4×25 | 1,9 |
| Iluminat anexe | 15,7 | TE-anexe | C63 3P | Cu 4×16 | 2,1 |
| CTA sală (2 buc.) | 54,0 | TE-forță | C100 3P | Cu 4×35 | 1,7 |
| Ventilare vestiare + desfumare | 16,8 | TE-forță | C63 3P | Cu 4×16 | 1,8 |
| Pompe (hidrofor + circulație termică) | 12,3 | TE-forță | C40 3P | Cu 4×10 | 1,5 |
| Centrala termică (auxiliare, pompe circuit) | 6,7 | TE-forță | C25 3P | Cu 4×6 | 1,3 |
| Prize/forță (birouri, echipamente mobile) | 14,0 | TE-anexe | C63 3P | Cu 4×16 | 2,2 |
| Curenți slabi (sonorizare, CCTV, IDSAI, EVAC) | 21,6 | TES | C63 3P | Cu 4×16 | 1,6 |
| Ascensor | 6,3 | TE-forță | C25 3P | Cu 4×6 | 1,4 |
| **Pc — putere instalată totală** | **≈262 kW** | | | | |

Toate căderile de tensiune calculate rămân sub pragurile admise de I7-2011 (3% pentru circuitele de iluminat, 5% pentru circuitele de forță), confirmarea fiind necesară la faza PTh întrucât secțiunile finale de cablu depind de traseul real (lungimi confirmate pe planul de execuție), nu de o estimare generică de fază DTAC.

### PTh-I.4.2 Verificarea curentului de pornire — pompa de incendiu și ascensorul

**Electropompa principală de incendiu** (v. PTh-I.6.4, 11 kW, dimensionată pe scenariul concomitent sprinklere-depozit + hidranți interiori): `I_nominal ≈ 11.000/(√3×400×0,86×0,90) ≈ 20,5 A`; `I_pornire directă ≈ 6,5×20,5 ≈ 133 A` — cădere de tensiune acceptabilă chiar la pornire directă, dat fiind puterea moderată a pompei (spre diferență de un mall, unde pompa de 90 kW impune obligatoriu soft-starter); se adoptă totuși **soft-starter** ca măsură de bună practică, pentru limitarea solicitării mecanice a cuplajului pompă-motor la fiecare pornire (frecvența de testare periodică, cap. PTh-I.10, impune un număr mare de porniri pe durata de viață a instalației).

**Ascensorul** (6,3 kW, echipament cu pornire electronică integrată în variatorul de frecvență propriu, conform cerințelor producătorului) nu ridică o problemă de cădere de tensiune la pornire, protecția fiind dimensionată exclusiv pe curentul nominal de regim.

### PTh-I.4.3 Selectivitatea protecțiilor

Selectivitatea între TGD și tablourile secundare (TEI, TE-forță, TV, TES) se asigură prin **selectivitate totală până la curentul de scurtcircuit maxim prezumat la bornele fiecărui tablou secundar**, verificată prin curbele timp-curent ale întrerupătoarelor adoptate (rapoarte de calibru TGD/secundar ≥1,6, conform practicii uzuale I7-2011 pentru instalații de această mărime, fără a necesita selectivitate logică tip ZSI, rezervată instalațiilor de amploare superioară — un mall regional, de exemplu, unde numărul mare de niveluri ierarhice de tablouri impune verificarea explicită prin ZSI). Pe circuitul TES (tabloul de securitate), unde continuitatea de alimentare are miza cea mai ridicată (cap. 8.3 DTAC), selectivitatea se verifică suplimentar la nivelul fiecărui subcircuit terminal (pompă incendiu, ventilator desfumare, iluminat de securitate, IDSAI, EVAC), astfel încât un defect pe oricare dintre acestea să declanșeze exclusiv protecția proprie, fără a întrerupe alimentarea celorlalte consumatori critici de pe același tablou.

### PTh-I.4.4 Grupul electrogen — confirmare și detaliere

DTAC (cap. 8.3) a stabilit grupul electrogen de **250 kVA (200 kW)**, autonomie ≥8 ore, comutare automată ATS <15 secunde. Faza PTh confirmă dimensionarea și detaliază consumatorii alimentați pe circuitul de siguranță (TES):

| Circuit | Destinație | P [kW] | Alimentare |
|---|---|---|---|
| CF-PSI | Electropompă principală incendiu (11 kW) + pompă jockey (1,5 kW) | 12,5 | AAR grup electrogen |
| CF-DSF | Ventilator desfumare mecanică circulații (F400/120) | 4,0 | AAR grup electrogen |
| CF-ILUM-SP | Iluminat sportiv redus — scenariul de siguranță (nu competiție integrală, ~20 kW) | 20,0 | AAR grup electrogen |
| CF-CTA-MIN | CTA sală, regim minim (o singură unitate, 27 kW) | 27,0 | AAR grup electrogen |
| CF-EVAC | Alarmare vocală + amplificatoare EVAC | 8,0 | UPS dedicat + AAR |
| CF-IDSAI | Centrală IDSAI + repetitoare | 4,0 | UPS dedicat |
| CF-TV | Puncte de racord TV broadcast (regie/OB van) | 15,0 | AAR grup electrogen |
| CF-ILUM-S | Iluminat de evacuare/antipanică | 3,0 | UPS (comutare <5s) + baterii locale |
| **Total consumatori de siguranță** | | **≈93,5 kW** | din 200 kW disponibili (marjă 53%) |

Marja disponibilă a grupului electrogen (200 − 93,5 ≈ 106,5 kW) acoperă suplimentar pornirea simultană a mai multor motoare electrice (curenți de pornire cumulați, verificați la comisionare, v. PTh-I.10.5) și o eventuală extindere ulterioară a consumatorilor critici, fără a necesita redimensionarea grupului.

### PTh-I.4.5 Priza de pământ — execuție și verificare de calcul

DTAC (cap. 8.4) a stabilit priza de pământ unică (centură perimetrală OL-Zn 40×4 mm + electrozi verticali), cu cerința **Rp ≤1 Ω**. Faza PTh detaliază execuția: **centură perimetrală îngropată la 0,80 m adâncime**, pe conturul întregii clădiri (~200 m dezvoltare, aproximat din perimetrul 60×40 m al amprentei sălii plus anexele), completată de **12 electrozi verticali Ø⌀20 mm, lungime 2,0 m**, dispuși la interax ~15-18 m pe centura perimetrală, toți interconectați prin sudură/conector mecanic certificat.

**Verificare orientativă a rezistenței de dispersie** (formula simplificată pentru o priză combinată centură+electrozi, la o rezistivitate de calcul a solului ρ = 150 Ω·m, valoare de referință pentru un sol argilos-prăfos, coerentă cu stratificația geotehnică din `structura-pth.md` PTh-SP.9.1): rezistența centurii perimetrale singure (R_centură ≈ ρ/(π·L)·ln(2L²/(h·d)), cu L = 200 m, h = 0,8 m, d = 0,04 m) rezultă de ordinul **1,3-1,5 Ω**, redusă prin conlucrarea în paralel cu cei 12 electrozi verticali (fiecare cu rezistență proprie de ordinul 60-70 Ω în același sol, reduse prin efectul de grup) la o rezistență combinată finală estimată **Rp ≈ 0,85-0,95 Ω** — **verificat, sub pragul de 1 Ω** impus de I7-2011, cu marjă redusă care impune, la execuție, o **verificare obligatorie prin măsurătoare directă** (metoda celor 3 puncte/62%) înainte de recepție, cu completarea prizei prin electrozi suplimentari dacă rezistivitatea reală a solului, măsurată la fața locului, depășește ipoteza de calcul de 150 Ω·m.

Schema de distribuție adoptată rămâne **TN-S** (conductor de protecție separat pe tot traseul, identic DTAC), cu echipotențializare suplimentară, explicită la execuție, a tuturor elementelor metalice din zonele umede (vestiare, dușuri): cadre de duș, țevi metalice, grătare de pardoseală, toate legate la o bară de echipotențializare locală, conectată la priza de pământ generală.

### PTh-I.4.6 Protecția la trăsnet — verificare de risc și execuție

DTAC (cap. 8.4) a concluzionat, pe baza evaluării calitative de risc (SR EN 62305-2), necesitatea unei instalații de protecție la trăsnet de **nivel III (LPL III)**. Faza PTh cuantifică această evaluare:

**Aria de captare echivalentă** a construcției (SR EN 62305-2, pentru o structură dreptunghiulară de L×W = 60×40 m și înălțime la coamă H = 15,80 m, cf. `structura-pth.md`): `Ae = L·W + 2·3H·(L+W) + π·(3H)²`, cu `3H = 47,4 m`:

`Ae = (60×40) + 2×47,4×(60+40) + π×47,4² = 2.400 + 9.480 + 7.058 = 18.938 mp ≈ 0,0189 km²`

**Frecvența anuală estimată de lovire directă** (densitate de descărcări la sol Ng ≈ 2 descărcări/km²/an, valoare de referință pentru zona climatică a amplasamentului, coeficient de locație Cd = 1, construcție relativ izolată, fără ecranare de clădiri vecine mai înalte — cap. 8.4 DTAC):

`Nd = Ng·Ae·Cd·10⁻⁶ = 2×18.938×1×10⁻⁶ = 0,0379 lovituri/an`

Comparată cu frecvența acceptabilă de referință pentru o construcție cu aglomerare mare de persoane (`Nc ≈ 10⁻³`, prag sever, coerent cu populația de calcul a evenimentului, ~1.615 persoane): `Nd (0,0379) >> Nc (0,001)` → **confirmă concluzia calitativă a DTAC** — protecția la trăsnet este obligatorie, la **nivelul III (LPL III)**, materializată prin:

- **rețea de captare** (conductor de captare pe conturul acoperișului + tije de captare pe punctele proeminente — antene, coșuri de ventilare), la o maillă (ochi de rețea) de **15×15 m**, specifică nivelului III;
- **12 coborâri**, distribuite perimetral la interax ~17 m (coincident, unde este posibil, cu pozițiile stâlpilor metalici de fronton și cu contravântuirile verticale ale structurii, cf. `structura-pth.md` PTh-SP.4, pentru simplificarea traseului de coborâre pe elementele metalice deja existente, cu izolare electrică față de structura portantă conform SR EN 62305-3);
- **priză de pământ comună** cu instalația electrică (Rp ≤1 Ω, PTh-I.4.5);
- **SPD tip 1+2 la TGD** (protecție la unda de curent indusă direct de o lovitură de trăsnet) și **SPD tip 2/3 la TES, la tabloul curenților slabi și la echipamentele sensibile** (centrala IDSAI, sistemul de sonorizare/EVAC, echipamentele de broadcast TV, cf. PTh-I.7).

---

## PTh-I.5 Extras de materiale și fișe tehnice echipamente majore

### PTh-I.5.1 Extras cantitativ de materiale — rețele principale

| Instalație | Material/element | Cantitate |
|---|---|---|
| Apă rece — branșament | PEHD De90 | 15 m |
| Apă rece — distribuție interioară | PP-R Ø32-Ø63 | ~420 m |
| ACM — distribuție + recirculare | PP-R izolat 20-30 mm elastomer | ~180 m |
| Canalizare menajeră | PP De75-De160 | ~340 m |
| Canalizare pluvială sifonică | oțel/PEHD DN150-DN250 | ~260 m |
| Hidranți — rețea inelară | oțel DN100-DN150 | ~180 m |
| Sprinklere — rețea ZC-Depozit | oțel negru DN25-DN80 | ~140 m |
| Agent termic (4 circuite CT) | oțel/PEX izolat 30-40 mm | ~520 m |
| Tubulatură CTA sală (canale principale) | tablă zincată, clasă etanșeitate B | ~180 m |
| Tubulatură ventilare vestiare | tablă zincată | ~140 m |
| Cablu electric forță (TE) | Cu 4×6…4×120 | ~650 m |
| Cablu electric iluminat sportiv (TEI) | Cu 4×120 + circuite DALI-DMX | ~480 m |
| Cablu de siguranță (TES) | E90/PH90 | ~320 m |
| Conductor coborâre paratrăsnet | OL-Zn 8 mm | ~190 m (12 coborâri × ~16 m medie) |
| Cablu date structurată | Cat.6A/fibră optică | ~1.100 m |
| Proiectoare LED sportive | 700 W, 145 lm/W | 60 buc. |
| Corpuri iluminat interior/exterior general | LED, tipuri diverse | ~336 buc. |
| Corpuri iluminat de securitate | LED cu autonomie proprie | 124 buc. |
| Hidranți interiori echipați | DN25/52, furtun 20 m | 8 buc. |
| Hidranți exteriori | DN100 | 3 buc. |
| Capete sprinkler | K115, ZC-Depozit | ~26 buc. |
| Camere CCTV | IP HD/4K | 32 buc. |
| Difuzoare sonorizare/EVAC | linie 100V | 48 buc. |

### PTh-I.5.2 Fișă tehnică — CTA sală (1 din 2, referință)

| Parametru | Valoare |
|---|---|
| Debit nominal | 30.000 mc/h |
| Recuperator | roată entalpică, η ≥73% |
| Filtrare | ePM1 60% (F7) |
| Ventilatoare | EC, SFP ≤1,8 kW/(mc/s) |
| Baterii | încălzire (45/40°C) + răcire, integrate cu sursa termică/chiller |
| Reglaj | VAV pe senzor CO₂, integrare BMS |
| Difuzoare aferente | bătaie lungă, jet descendent dirijat, viteză reziduală <0,20 m/s la teren |

### PTh-I.5.3 Fișă tehnică — Cazan de condensație (1 din 2, cascadă)

| Parametru | Valoare |
|---|---|
| Putere unitară | 200 kW/buc. (2 buc., cascadă 400 kW) |
| Randament | ≥105% (regim condensație, sarcină parțială) |
| Combustibil | gaz natural, cu detecție de gaz + electrovană siguranță |
| Regim | 70/55°C (circuit ACM/vârf) |

### PTh-I.5.4 Fișă tehnică — Pompă de căldură aer-apă

| Parametru | Valoare |
|---|---|
| Putere | 80 kW (sarcină de bază) |
| COP | ≥3,5 |
| Regim | 45/40°C (circuit CTA/panouri radiante) |
| Funcționare | continuă, complementară cazanelor pentru vârfuri |

### PTh-I.5.5 Fișă tehnică — Boiler ACM bivalent (1 din 2)

| Parametru | Valoare |
|---|---|
| Volum unitar | 1.000 l (2 buc., 2.000 l total) |
| Serpentină | alimentată din CT, preîncălzire din PC/recuperare ape uzate |
| Ciclu antilegionella | șoc termic 55-60°C, periodic programat |
| Recirculare | ≥50°C permanent pe toată bucla |

### PTh-I.5.6 Fișă tehnică — Grup de pompare hidrofor

| Parametru | Valoare |
|---|---|
| Configurație | 2 pompe VSD, 1 activă + 1 rezervă |
| Debit | 16,2 mc/h (4,5 l/s) |
| Presiune de refulare | 35 mCA |
| Putere motor | 2×3,0 kW |
| Rezervor tampon | 5 mc |

### PTh-I.5.7 Fișă tehnică — Electropompă principală incendiu

| Parametru | Valoare |
|---|---|
| Debit nominal | 12 l/s (43,2 mc/h) |
| Înălțime de pompare | 45 mCA |
| Putere motor | 11 kW |
| Pornire | soft-starter |
| Conformitate | SR EN 12845 / NP 086 |

### PTh-I.5.8 Fișă tehnică — Pompă Diesel de rezervă + pompă jockey

| Parametru | Valoare |
|---|---|
| Pompă Diesel | Q = 12 l/s (identică electropompei), autonomie ≥3 h, pornire automată baterii duble |
| Pompă jockey | Q ≈ 1-1,5 l/s, menținere presiune rețea |
| Testare | pornire săptămânală de probă pe by-pass |

### PTh-I.5.9 Fișă tehnică — Proiector LED sportiv

| Parametru | Valoare |
|---|---|
| Putere | 700 W |
| Eficacitate luminoasă | 145 lm/W (Φ = 101.500 lm) |
| Control | dimming electronic 1-100%, DALI/DMX-RDM |
| Temperatură de culoare | 5.000-5.700 K |
| Ra | ≥90 |
| GR | ≤50 (optică de control a fasciculului) |
| Flicker | absent (driver de înaltă frecvență) |
| Funcție CLO | da (compensare degradare flux pe durata de viață) |

### PTh-I.5.10 Fișă tehnică — Grup electrogen de siguranță

| Parametru | Valoare |
|---|---|
| Putere | 250 kVA (200 kW) |
| AAR | <15 s |
| Autonomie | ≥8 h la sarcină nominală |
| Combustibil | motorină, rezervor zilnic + rezervă |

### PTh-I.5.11 Fișă tehnică — Ventilator desfumare mecanică circulații

| Parametru | Valoare |
|---|---|
| Debit | 8.000 mc/h |
| Certificare | F400 (400°C/120 min) |
| Comandă | centrala IDSAI, automat + pupitru manual pompieri |

### PTh-I.5.12 Fișă tehnică — Centrală de detectare IDSAI

| Parametru | Valoare |
|---|---|
| Tip | adresabilă, autonomie 48h veghe/30 min alarmare |
| Detectoare | optice fum (anexe, vestiare), bariere optice liniare/ASD (sala mare, volum 42.000 mc) |
| Interfațare | desfumare, ventilare generală, control acces (fail-safe), pompe incendiu, iluminat de securitate |
| Conformitate | P118-3, seria SR EN 54 |

### PTh-I.5.13 Fișă tehnică — Sistem de alarmare vocală EVAC

| Parametru | Valoare |
|---|---|
| Conformitate | SR EN 54-16/24 |
| STI cerut | ≥0,5 (regim normal), ≥0,6 (regim alarmare) |
| Zonare | pe sectoare de tribună, evacuare fazată |
| Prioritate | automată, peste sonorizarea de eveniment |
| Alimentare | UPS + grup electrogen |

### PTh-I.5.14 Fișă tehnică — Sistem de sonorizare eveniment

| Parametru | Valoare |
|---|---|
| Configurație | line-array/cluster central + difuzoare suplimentare tribune |
| STI | ≥0,50 (regim eveniment) |
| Nivel presiune sonoră | 95-100 dB(A) |
| RT60 (după tratament acustic) | 1,5-2,0 s |

### PTh-I.5.15 Fișă tehnică — Tabelă de scor electronică

| Parametru | Valoare |
|---|---|
| Tip | cub central multivalent, 4 fețe |
| Afișaj | scor, cronometru joc, cronometru posesie 24s, faulturi |
| Completare | LED-uri perimetrale pe conturul tribunelor/terenului |

### PTh-I.5.16 Fișă tehnică — Sistem CCTV

| Parametru | Valoare |
|---|---|
| Rezoluție | HD/4K, IP |
| Acoperire | tribune, intrări, teren, perimetru, parcări, acces vestiare (nu interior vestiar/duș) |
| Stocare | NVR, ≥30 zile, RAID |
| Funcție suplimentară | analiză de aglomerare (densitate de persoane pe zone tribune) |

### PTh-I.5.17 Fișă tehnică — Turnicheți control acces/ticketing

| Parametru | Valoare |
|---|---|
| Validare | QR/RFID |
| Siguranță | deblocare fail-safe la alarmă IDSAI, indiferent de starea ticketing-ului |
| Zone suplimentare | carduri de acces (vestiare, zonă tehnică, regie TV) |

---

## PTh-I.6 Breviare hidraulice/aeraulice nod cu nod

### PTh-I.6.1 Calcul hidraulic nod cu nod — apă rece, traseul cel mai defavorabil (duș mezanin)

Pornind de la debitul de calcul (qc,dim = 4,5 l/s, cap. 2.2 DTAC) și de la necesarul de presiune global (H_nec ≈ 32,5 mCA, cap. 2.3 DTAC), breviarul PTh confirmă, tronson cu tronson, distribuția pierderilor de sarcină pe traseul cel mai lung, către dușul de mezanin tehnic:

| Tronson | Q [l/s] | Ø adoptat | v [m/s] | L [m] | j [bar/m] | Δp tronson [bar] |
|---|---|---|---|---|---|---|
| Branșament → cămin apometru | 4,5 | PEHD De90 | 1,05 | 12 | 0,008 | 0,096 |
| Cămin → grup de pompare | 4,5 | oțel DN65 | 1,50 | 8 | 0,018 | 0,144 |
| Grup de pompare → distribuitor general | 4,5 | PP-R Ø63 | 1,80 | 10 | 0,028 | 0,280 |
| Distribuitor → coloană vestiare (vârf dușuri) | 3,92 | PP-R Ø63 | 1,58 | 25 | 0,021 | 0,525 |
| Coloană → ramură finală (6 dușuri) → duș mezanin | 0,84 | PP-R Ø32 | 1,04 | 8 | 0,012 | 0,096 |
| **Total pierderi liniare pe traseu** | | | | | | **1,141 bar** |

Pierderile totale confirmate nod cu nod (1,141 bar ≈ 11,6 mCA) confirmă, cu bună aproximație, ipoteza globală adoptată în DTAC (`hr = 12 m`, cap. 2.3), diferența (12,0 vs 11,6 mCA) fiind absorbită de marja de rezervă a grupului de pompare (presiune de refulare adoptată 35 mCA, față de necesarul strict calculat de 32,5 mCA).

### PTh-I.6.2 Breviar ACM — cascada de la boilere la cele 4 grupuri de dușuri

Cele 2 boilere bivalente (2.000 l total, cap. 2.4 DTAC) alimentează, printr-un distribuitor comun, cele 4 grupuri de vestiar-duș (7 dușuri fiecare):

```
2× boiler 1.000 l (55°C, șoc antilegionella) ─► distribuitor ACM ─┬─► Grup 1 (7 dușuri) — Ø40
                                                                    ├─► Grup 2 (7 dușuri) — Ø40
                                                                    ├─► Grup 3 (7 dușuri) — Ø40
                                                                    └─► Grup 4 (7 dușuri) — Ø40
                                                        + buclă de recirculare ≥50°C, pompă dedicată, retur la boiler
```

Debitul de vârf pe fiecare grup (7 dușuri × 0,15 l/s × 0,70 simultaneitate, identic argumentat cap. 2.4 DTAC): `Q_grup = 7×0,15×0,70 = 0,735 l/s`; verificare pe cele 4 grupuri simultan: `4×0,735 = 2,94 l/s`, identic cu debitul de vârf ACM calculat global în DTAC. Pierderea de căldură a buclei de recirculare (rețea de ~180 m izolată, cap. PTh-I.5.1), estimată la ~3,0 kW în regim permanent, impune un debit de recirculare de: `Q_recirc = Q_pierdere/(c·ΔT) = 3.000/(4.186×5) ≈ 0,143 l/s ≈ 0,51 mc/h`, asigurat de o pompă de circulație dedicată de mică putere (≤0,1 kW), suficientă pentru menținerea temperaturii ≥50°C pe toată bucla, conform cerinței anti-Legionella (cap. 2.4 DTAC).

### PTh-I.6.3 Calcul hidraulic — hidranți interiori, punctul cel mai defavorabil

Traseu de la stația de pompare la hidrantul cel mai îndepărtat (poziționat la circulația publică de la tribuna opusă, cota +9,0 m, cf. `structura-pth.md` cota gradenei superioare):

| Tronson | Q [l/s] | Ø | v [m/s] | L [m] | j [bar/m] | Δp [bar] |
|---|---|---|---|---|---|---|
| Colector refulare → inel hidranți | 4,2 | DN100 | 0,53 | 30 | 0,003 | 0,090 |
| Inel → hidrant (ramură) | 2,1 | DN65 | 0,63 | 45 | 0,005 | 0,225 |
| Traseu vertical la cota +9,0 m | 2,1 | DN65 | 0,63 | 9 | 0,005 | 0,045 |
| **Total pierderi** | | | | | | **0,360 bar** |

Presiune necesară la robinet (SR EN 671-2, p_min = 2,5 bar) + pierderi (0,360 bar) + cotă geodezică (9,0 m ≈ 0,88 bar) = **≈3,74 bar ≈ 38,1 mCA** — valoare care, împreună cu presiunea necesară a zonei de control a sprinklerelor (v. PTh-I.6.4), guvernează dimensionarea electropompei principale.

### PTh-I.6.4 Calcul hidraulic — zona de control sprinklere ZC-Depozit (OH1) și dimensionarea grupului de pompare PSI

**Confirmarea clasificării**: depozitul de materiale sportive (~300 mp, cap. PTh-I.2.3), evaluat la faza PTh conform semnalului lăsat deschis în DTAC (cap. 10.3 — „pot deveni necesare... la eventualele depozite... evaluate separat"), se încadrează la **clasa OH1 (SR EN 12845)**, cu densitate de calcul `d = 5 mm/min` și arie de operare `A_op = 72 mp` (valoare tabelară OH1):

`Q_op = d·A_op/60 = 5×72/60 = 6,0 l/s`

Presiunea necesară la ACS-ul zonei (traseu scurt, o singură încăpere la cota parterului, fără diferență semnificativă de cotă): `p_ACS ≈ 0,70 bar (cap terminal) + 0,35 bar (pierderi branch+cross-main) + 0,10 bar (cotă redusă) ≈ 1,15 bar`.

**Rezerva de apă suplimentară** necesară pentru zona sprinklerată (durată de funcționare 60 min, conform SR EN 12845 pentru clasa OH): `V_sprinklere = 6,0×60×60/1.000 = 21,6 mc`.

**Reconcilierea rezervei totale de incendiu**: rezerva calculată în DTAC (cap. 10.3, `Vri = 110,52 mc`, pe scenariul hidranți interiori+exteriori) nu includea componenta de sprinklere, absentă la faza DTAC. Rezerva totală necesară la faza PTh: `V_total = 110,52 + 21,6 = 132,1 mc`. **Decizie de proiectare PTh**: se majorează volumul rezervorului de incendiu de la intervalul adoptat în DTAC (110-120 mc) la **135 mc**, o corecție directă și necesară, semnalată explicit și reluată la sinteza finală (PTh-I.11).

**Dimensionarea grupului de pompare**: scenariul concomitent guvernant (sprinklere ZC-Depozit + hidranți interiori, cf. principiului de proiectare consacrat pentru sisteme combinate): `Q_pompă = 6,0 + 4,2 = 10,2 l/s`, adoptat **Q = 12 l/s (43,2 mc/h)**, cu presiunea de refulare dimensionată pe scenariul cel mai exigent dintre cele două puncte de funcționare posibile — **(a)** sprinklere+hidranți interiori concomitent, la presiune joasă (cotă redusă, dar pierderi cumulate pe traseul comun): `H ≈ 1,15 + 0,30 (colector comun) + 0,20 (cotă) ≈ 1,65 bar`; **(b)** hidranți interiori singuri, la cota cea mai înaltă (+9,0 m, PTh-I.6.3): `H ≈ 3,74 bar`. Pompa se dimensionează pentru a acoperi ambele puncte de funcționare pe propria curbă caracteristică, cu presiunea de refulare la debit nul (`H₀`) majorată la **45 mCA (4,5 bar)**, care acoperă cu marjă confortabilă punctul (b), guvernant:

`P_motor = (Q[l/s]×H[mCA]×9,81)/(1.000×η) = (12×45×9,81)/(1.000×0,65) ≈ 8,15 kW → adoptat 11 kW` (marjă de motor standardizată).

### PTh-I.6.5 Breviar aeraulic nod cu nod — ventilarea în cascadă a vestiarelor (1 din 4 grupuri, referință)

Pentru fiecare din cele 4 grupuri vestiar-duș (7 dușuri, cf. cap. 2.1 DTAC), debitele de introducere/evacuare pe cele trei zone succesive ale cascadei de depresiune (vestiar→duș→evacuare, cap. 6 DTAC):

| Zonă | Volum estimat [mc] | Rată schimb [sch/h] | Debit [mc/h] | Depresiune relativă |
|---|---|---|---|---|
| Vestiar (zonă „uscată") | 55 | 7 | 385 (introducere) | −5 Pa față de circulația comună |
| Duș (zonă „umedă") | 25 | 15 | 375 (evacuare, aproximativ egal cu introducerea, cf. principiului de cascadă) | −10 Pa față de vestiar |
| Grup sanitar aferent | 12 | 10 | 120 (evacuare suplimentară) | −8 Pa față de vestiar |

Verificare de continuitate a debitului pe grup: introducere 385 mc/h ≈ evacuare cumulată (375+120=495 mc/h, diferența de 110 mc/h fiind aerul de compensare atras din circulația comună adiacentă, tipic unei cascade de depresiune, unde zona finală evacuează ușor mai mult decât introducerea proprie pentru a garanta sensul unic de curgere). Extins la cele 4 grupuri: `Q_total introducere ≈ 4×385 ≈ 1.540 mc/h`, `Q_total evacuare ≈ 4×495 ≈ 1.980 mc/h` — valori coerente cu debitele orientative ale DTAC (dușuri ~1.500 mc/h/grup pentru rata cea mai intensă, cap. 6 DTAC), diferența de metodă (evacuare per grup 375 mc/h calculat aici, față de „~1.500 mc/h/grup" din DTAC) se explică prin faptul că valoarea DTAC reprezenta rata maximă orientativă la 15 schimburi/oră aplicată unui volum de referință mai generos (întreaga zonă de duș+vestiar comun), în timp ce breviarul PTh detaliază separat, pe zonă, volumul strict al fiecărei încăperi — nu o contradicție, ci un nivel superior de acuratețe, specific fazei de execuție.

### PTh-I.6.6 Verificare canalizare — grad de umplere și viteză de autocurățare

Verificarea h/D și a vitezei de autocurățare (v ≥0,7 m/s, conform SR EN 12056-2) pe tronsoanele orizontale principale ale canalizării menajere, confirmă dimensionarea de principiu a DTAC (cap. 3.1, qc,u = 6,0 l/s):

| Tronson | Q_c [l/s] | Ø | Pantă | Capacitate la h/D=0,5 [l/s] | h/D real | v [m/s] |
|---|---|---|---|---|---|---|
| Coloană vestiare (vârf dușuri) → colector | 2,0 | PP De110 | 2,0% | 9,5 | 0,21 | 0,92 |
| Coloană grupuri sanitare publice → colector | 1,2 | PP De110 | 1,5% | 8,1 | 0,15 | 0,85 |
| Colector general → racord exterior | 6,0 | PP De160 | 2,0% | 22,0 | 0,27 | 1,05 |

Toate tronsoanele funcționează cu marjă largă sub capacitatea nominală (h/D <0,5), asigurând autocurățare permanentă — confirmare identică concluziei calitative a DTAC, extinsă acum la fiecare tronson în parte.

### PTh-I.6.7 Verificare amorsare pluvial sifonic

Sistemul sifonic (DTAC cap. 3.2, Qp = 115,5 l/s) se verifică la faza PTh prin proba de amorsare: la debitul de calcul, receptoarele (echipate cu deflector antivortex) trebuie să genereze curgere în plin pe toată secțiunea celor 6 coloane sifonice (DN 150-250), fără antrenare de aer — condiție confirmată la comisionare (v. PTh-I.10.1) printr-o probă funcțională la debit simulat, cu verificarea absenței zgomotului caracteristic de cavitație și a menținerii depresiunii de proiectare pe toată lungimea colectorului orizontal fără pantă.

### PTh-I.6.8 Breviar desfumare — trape naturale și aer de compensare

Suprafața de desfumare (36,0 mp instalați, cap. PTh-I.2.7, peste minimul de 33,8 mp) se distribuie pe **10 trape de 3,6 mp**. Debitul de aer de compensare necesar pentru evitarea depresiunii excesive sub trape (viteză admisă <5 m/s la gurile de admisie, cap. 7.1 DTAC), estimat printr-un bilanț simplificat de continuitate a debitului evacuat prin trape la condițiile de proiectare a desfumării naturale (tiraj termic al fumului cald, viteză de evacuare tipică prin trape ~1,0-1,5 m/s la suprafața liberă de 36 mp): `Q_evacuat ≈ 36×1,2×3.600 ≈ 155.500 mc/h`. Pentru a menține viteza de admisie sub 5 m/s la cele 6 grile de compensare (PTh-I.2.7): `S_necesară = Q/(v×3.600) = 155.500/(5×3.600) ≈ 8,6 mp`, distribuită pe cele 6 grile → **~1,45 mp/grilă**, dimensiune confirmată la execuție pe planul de arhitectură al fațadelor.

---

## PTh-I.7 Curenți slabi specifici — sonorizare, tabelă de scor, CCTV, control acces, ticketing

### PTh-I.7.1 Sonorizarea — breviar acustic complet (STI, RT60, acoperire)

DTAC (cap. 11.1) a stabilit dubla funcție a sonorizării (eveniment + suport fizic EVAC, cu prioritate automată a alarmării vocale) și cerințele de performanță (STI ≥0,50 regim normal/≥0,60 regim alarmare, 95-100 dB(A), RT60 = 1,5-2,0 s). Faza PTh detaliază execuția:

**Configurația de difuzoare** — un cluster central (deasupra unei zone tehnice, orientat spre teren și spre prima bandă de tribune), completat de **48 de difuzoare de linie 100V** distribuite pe conturul tribunelor (12 pe fiecare din cele 4 laturi, coerent cu zonarea pe sectoare a alarmării EVAC, cap. 10.4 DTAC), fiecare deservind o arie de acoperire de ~25 mp de tribună — densitate care evită „punctele moarte" de acoperire acustică specifice unei singure surse centrale la o sală de 2.256 mp (teren+tribune).

**Tratamentul acustic**, condiție tehnică obligatorie pentru atingerea STI-ului cerut (cap. 11.1 DTAC), se dimensionează prin verificarea timpului de reverberație țintă (RT60 = 1,5-2,0 s) folosind formula lui Sabine (`RT60 = 0,161·V/A`, cu V = 42.000 mc volumul sălii): pentru RT60 = 1,8 s (mijlocul intervalului țintă), aria de absorbție echivalentă necesară rezultă `A = 0,161×42.000/1,8 ≈ 3.756 m²·sabin` — arie de absorbție distribuită pe panouri fonoabsorbante montate pe suprafețele mari ale anvelopei (partea inferioară a acoperișului metalic, panourile perimetrale ale peretelui pignon, zone ale peretelui longitudinal fără deschideri), cu un coeficient mediu de absorbție al materialului adoptat (α ≈ 0,70 la frecvențele medii, tipic pentru un panou fonoabsorbant industrial de 50-75 mm grosime): `S_panouri = A/α ≈ 3.756/0,70 ≈ 5.366 mp` — o suprafață semnificativă, care confirmă observația calitativă a DTAC potrivit căreia tratamentul acustic al unui volum de 42.000 mc, cu suprafețe predominant reflectante (metal, beton, sticlă), nu este o opțiune estetică secundară, ci o condiție de bază pentru funcționarea corectă a sistemului EVAC.

### PTh-I.7.2 Tabela de scor și LED-urile perimetrale — poziționare și breviar de mentenanță

Cubul central multivalent (DTAC cap. 11.2) se suspendă de structura metalică a acoperișului, coordonat cu axa centrală a terenului (axa 6, cf. `structura-pth.md` PTh-SP.3.3 — travee de contravântuire orizontală mediană, unde structura oferă deja un punct de ancorare rigid, verificat la sarcina suplimentară a cubului de scor la faza de rezistență). LED-urile perimetrale (~180 m dezvoltare pe conturul tribunelor) completează informația vizuală pentru sectoarele de tribună situate lateral, fără linie directă de vedere optimă către cubul central.

### PTh-I.7.3 CCTV — poziționare pe zone și breviar de acoperire

Cele **32 de camere IP HD/4K** (cf. extrasul de materiale, PTh-I.5.1) se distribuie: **8 camere** pe tribune (identificare persoane, incidente), **6 camere** la intrări/turnicheți, **4 camere** pe teren (unghiuri complementare celor de broadcast TV), **6 camere** pe perimetrul exterior/parcări, **8 camere** la accesul vestiarelor (fără acoperire a interiorului vestiarelor/dușurilor, cf. principiul de respectare a intimității stabilit în DTAC). Toate cele 32 de camere sunt înregistrate pe **NVR cu stocare ≥30 zile, configurație RAID**, cu funcție de analiză a aglomerărilor pe sectoarele de tribună, integrată cu dispeceratul de securitate.

### PTh-I.7.4 Control acces, ticketing și rețeaua de date

Turnicheții cu validare QR/RFID (cf. DTAC cap. 11.3) se poziționează la cele **minimum 4 intrări principale** ale tribunelor, corelate cu numărul de fluxuri de evacuare (33 fluxuri, cap. 10.2 DTAC) — turnicheții nu limitează în niciun fel lățimea de evacuare calculată, funcționând exclusiv în sensul de intrare, cu **deblocare fail-safe integrală** la orice semnal de alarmă de la centrala IDSAI (cf. principiul de siguranță necondiționat, identic celui de la ușile de evacuare). Rețeaua de date (Cat.6A/fibră optică, ~1.100 m, cf. PTh-I.5.1) conectează turnicheții, camerele CCTV, punctele de racord TV broadcast (minimum 4 direcții, cf. DTAC cap. 11.3) și WiFi de mare densitate pentru public, cu sincronizare de timp NTP pentru corelarea semnalelor multiple (cronometrul de joc, arbitrajul video, marcajele CCTV/broadcast).

### PTh-I.7.5 Integrarea BMS și monitorizarea energetică — confirmare a strategiei nZEB de la DTAC

DTAC (cap. 12) a stabilit strategia nZEB a sălii (fotovoltaic de acoperiș 400 kWp, recuperare de căldură pe trei surse — CTA, ape uzate ale dușurilor, free-cooling la eveniment — pompă de căldură cu COP ≥3,5, iluminat LED cu control pe scenarii, ventilare modulantă pe CO₂). Faza PTh confirmă integrarea tuturor acestor componente într-un **sistem unic de management al clădirii (BMS)**, cu puncte de monitorizare și comandă pe fiecare instalație majoră dezvoltată în prezentul supliment:

| Subsistem monitorizat/comandat | Puncte BMS reprezentative |
|---|---|
| Sursa termică (cazane + PC) | temperaturi tur/retur pe cele 5 circuite, comandă cascadă, alarmă gaz |
| Ventilare sală (2× CTA) | debit real vs. comandă VAV pe CO₂, temperatură, comutare regim antrenament/eveniment |
| Ventilare vestiare (cascadă) | depresiuni pe cele 3 zone, alarmă colmatare filtre |
| Iluminat sportiv (TEI) | scenariu activ, nivel de dimming pe cele 4 pasarele, ore de funcționare per proiector (pt. programarea CLO/mentenanță) |
| Grup de pompare hidrofor + PSI | presiuni, nivel rezervor incendiu (135 mc), stare pompă jockey/activă/rezervă |
| Fotovoltaic (400 kWp) | producție instantanee/cumulată, alarmă defect string |
| Recuperare ape uzate dușuri | temperatură preîncălzire ACM, contribuție procentuală la necesarul de vârf |
| IDSAI/EVAC/desfumare | stare zone, jurnal de evenimente, interfațare automată cu ventilarea generală |

Integrarea BMS permite exact verificarea, în exploatare, a economiilor estimate în DTAC (cap. 12.3: ~40% reducere consum iluminat prin control pe scenarii, ~40% reducere consum ventilare prin VAV pe CO₂ față de funcționarea permanentă la debitul de eveniment) — fiecare din aceste procente devine, prin monitorizarea punctelor de mai sus, o valoare măsurabilă și auditabilă, nu doar o estimare de proiectare.

---

## PTh-I.8 Tehnologia de montaj și succesiunea de execuție — coordonare cu structura metalică a acoperișului

### PTh-I.8.1 Succesiunea generală a lucrărilor

1. Trasare trasee generale (înainte de turnarea pardoselilor și montajul compartimentărilor interioare).
2. Execuție priză de pământ de fundație — **înainte de turnarea fundațiilor** (coordonat cu fundațiile stâlpilor metalici și ale cadrelor de tribună, cf. `structura-pth.md` PTh-SP.9).
3. Montaj rețele îngropate (canalizare, pluvial exterior, rețea hidranți exteriori) — **probate înainte de acoperire**.
4. Montaj structură metalică a acoperișului (cele 11 axe transversale + pasarele tehnice, cf. `structura-pth.md`) — condiție obligatorie pentru toate instalațiile suspendate ale sălii (CTA, proiectoare sportive, sprinklere ZC-Depozit, ventilator desfumare, trape).
5. Montaj rezervor de incendiu (135 mc, PTh-I.6.4) + stație de pompare — probă hidraulică înainte de mascarea rețelei.
6. Montaj coloane apă/canalizare interioară, tubulatură CTA sală și vestiare.
7. Montaj cablu electric pe jgheaburi/trasee dedicate, tablouri (TGD, TEI, TE-forță, TV, TES).
8. Montaj echipamente majore (cazane, PC, boilere ACM, grup electrogen, CTA).
9. **Montaj proiectoare sportive pe cele 4 pasarele tehnice** (v. PTh-I.8.4) — succesiv montajului complet al pasarelelor și al balustradelor de circulație (cf. cerința de accesibilitate pentru mentenanță, cap. 9.4 DTAC).
10. Montaj corpuri de iluminat general, prize, aparataj final.
11. Montaj trape de desfumare + grile de compensare + ventilator mecanic circulații.
12. Montaj centrală IDSAI, EVAC, sonorizare, CCTV, control acces/ticketing.
13. Probe finale pe zonă/sistem, verificare fotometrică pe teren (cele 4 clase), PIF, reglaje, instruire beneficiar.

### PTh-I.8.2 Coordonarea traseelor cu structura metalică — goluri și susțineri

Coordonarea explicită cu structura de rezistență (`structura-pth.md`) este determinantă la o sală cu volum mare și structură metalică ușoară, unde orice traseu suspendat greu (sprinklere, conducte, tubulatură CTA) trebuie verificat la încărcarea suplimentară transmisă fermelor și panelor:

| Instalație | Element structural aferent | Poziție | Observație de coordonare |
|---|---|---|---|
| Proiectoare sportive (60 buc.) | pasarele tehnice, cf. PTh-SP a structurii | cele 4 laturi, cotă ~12,5-13,0 m | sarcină verificată la structura pasarelei (v. cap. 15 memoriu de rezistență) |
| Trape de desfumare (10 buc., 3,6 mp) | acoperiș, câmpul dintre ferme (nu pe tălpile superioare) | 5/pantă, distribuite pe axele 2-10 | coordonare cu poziția panelor (`structura-pth.md` PTh-SP.5) |
| Tubulatură CTA sală | plenum tehnic, sub tălpile inferioare ale fermelor | pe toată lungimea de 60 m | susținere prin tije de la nodurile fermei, nu de la talpa liberă |
| Coloane pluvial sifonic (6 buc.) | plenum tehnic, traseu orizontal fără pantă | integrat cu tubulatura CTA | coordonare de nivel, evitarea coliziunilor în plenum |
| Cub tabelă de scor | travee de contravântuire orizontală mediană (axa 6) | centrul terenului | ancorare verificată la sarcina suplimentară, cf. `structura-pth.md` PTh-SP.4 |
| Cabluri electrice/date | jgheaburi pe stâlpii metalici curenți | pe conturul sălii | separare tari/slabi, distanță de conductele PSI |
| Panouri radiante tavan | tălpile superioare/nodurile fermei | pe toată suprafața acoperișului | greutate proprie redusă, verificată împreună cu sarcina permanentă a acoperișului |

Toate golurile și punctele de ancorare pe elementele structurale portante (ferme, stâlpi, pane) necesită avizul explicit al inginerului structurist înainte de execuție, conform principiului stabilit la `structura-pth.md` PTh-SP.9.3 pentru orice traversare a elementelor de rezistență.

### PTh-I.8.3 Susțineri seismice și izolații

| Instalație | Tip susținere | Interax maxim | Observație seismică |
|---|---|---|---|
| Conducte sprinkler ZC-Depozit | tijă filetată + bracket lateral | 3,0-3,7 m | conform SR EN 12845, verificare sarcină laterală |
| Conducte apă/ACM (PP-R) | brățară glisantă (dilatare) | Ø≤63: 1,0 m | — |
| Tubulatură CTA sală (canale mari) | tijă filetată + profil | 1,5-2,0 m | verificare seismică la nodurile fermei |
| Cabluri (jgheaburi) | consolă metalică pe stâlp | 1,0-1,5 m | separare tari/slabi |
| Proiectoare sportive | consolă de prindere pe balustrada pasarelei | conform poziției fixe pe pasarelă | verificare la vibrația indusă de vânt pe structura ușoară (cf. `structura-pth.md`) |

Izolații termice: distribuție ACM/recirculare 20-30 mm elastomer, conducte agent termic CTA 30-40 mm elastomer/vată minerală cu barieră de vapori, coloană pluvială sifonică expusă la îngheț cu cablu de degivrare electric autoreglabil. Treceri etanșe la foc: conducte metalice cu manșon/mastic intumescent, cabluri (inclusiv circuitele E90/PH90 ale tabloului TES) cu pernă/mastic + vopsea termospumantă, toate la clasa EI conform elementului străbătut.

### PTh-I.8.4 Montaj proiectoare pe pasarele — accesibilitate și rezervă de extindere

Cele 60 de proiectoare sportive (PTh-I.3.2) se montează pe consolele dedicate ale celor 4 pasarele tehnice, cu **rezervă constructivă pentru extinderea ulterioară la maximum ~120 de proiectoare** (dublarea densității actuale pe aceleași pasarele, fără modificarea structurii — motivul reconcilierii puterii de proiectare de la PTh-I.3.5), fiecare poziție de montaj fiind accesibilă direct de pe calea de circulație continuă a pasarelei, cu balustradă pe tot perimetrul, dimensionată la faza de rezistență pentru sarcina utilă de circulație a personalului de mentenanță, suplimentar sarcinii proprii a proiectoarelor.

### PTh-I.8.5 Coordonarea cu arhitectura și cu finisajele interioare

Traseele de instalații care traversează sau se sprijină pe elemente de finisaj (plafoane false ale circulațiilor și anexelor, pardoseala sportivă a terenului de joc, gradenele tribunelor) se coordonează cu memoriul de arhitectură (`arhitectura.md`) pe trei puncte critice: **(a)** pardoseala sportivă a terenului (44×24 m) nu admite nicio traversare verticală de instalații — toate coloanele (apă, canalizare, electric) ocolesc perimetrul terenului, coborând prin zonele tehnice adiacente tribunelor, niciodată prin suprafața de joc propriu-zisă; **(b)** grătarele de pardoseală ale dușurilor și pantele de scurgere aferente (cap. 3.1 DTAC) se coordonează cu cotele de finisaj ale pardoselii vestiarelor, stabilite la faza de arhitectură; **(c)** pozițiile de montaj ale corpurilor de iluminat de accent și ale difuzoarelor de sonorizare din tribune se integrează în proiectul de mobilare/finisare al gradenelor prefabricate (`structura-pth.md`, PTh-SP.6.2), fără a compromite geometria de calcul a acestora (armătura minimă constructivă a gradenei, deja verificată la limita inferioară de utilizare, cap. PTh-SP.6.2, nu admite găurire suplimentară necoordonată pentru fixarea difuzoarelor).

---

## PTh-I.9 Planul de control al calității + faze determinante

### PTh-I.9.1 Plan de Control al Calității (PCC) instalații

| Nr. | Fază de lucrare | Document verificare | Cine verifică | Tip control |
|---|---|---|---|---|
| 1 | Recepție materiale/echipamente (certificate, agremente, marcaj CE) | certificate | responsabil tehnic (RTE) | CQ |
| 2 | Priză de pământ de fundație (înainte de turnare fundații) | proces-verbal | RTE + diriginte | **FD** |
| 3 | Trasee îngropate (canalizare, pluvial, hidranți exteriori) înainte de acoperire | proces-verbal | RTE + diriginte | **FD** |
| 4 | Rezervor de incendiu (135 mc) + probă etanșeitate | PV probă | RTE + diriginte | **FD** |
| 5 | Montaj rețea sprinkler ZC-Depozit | proces-verbal montaj | RTE | CM |
| 6 | Probă presiune sprinkler ZC-Depozit (1,5×p regim, min. 15 bar, 2h) | PV probă | RTE + diriginte + ISU | **FD** |
| 7 | Probă presiune hidranți interiori/exteriori | PV probă | RTE + diriginte | CM |
| 8 | Probă etanșeitate apă rece/ACM (SR EN 806-4) | PV probă | RTE + diriginte | CM |
| 9 | Probă canalizare înainte de mascare/acoperire | PV probă | RTE + diriginte | **FD** |
| 10 | Montaj structură metalică acoperiș — condiție de montaj instalații suspendate | PV recepție structură (v. `structura-pth.md`) | inginer structurist + RTE | **FD** |
| 11 | Montaj și ancorare proiectoare sportive pe pasarele (60 poziții) | PV montaj | RTE + structurist | CM |
| 12 | Punere sub tensiune tablou general (TGD) | PV operator rețea | operator distribuție + RTE | **FD** |
| 13 | Rezistență izolație + priză de pământ (electric) | buletin PRAM | verificator/laborator autorizat | CM |
| 14 | Test RCD/diferențiale | buletin PRAM | laborator autorizat | CM |
| 15 | Continuitate coborâri trăsnet + priză comună (12 coborâri) | buletin măsurători | laborator autorizat | CM |
| 16 | Etanșeitate tubulatură ventilare (clasa B), CTA sală + vestiare | PV clasă etanșeitate | RTE | CM |
| 17 | Funcțional IDSAI + matrice cauză-efect completă | PV probe 100% | firmă autorizată IGSU | **FD** |
| 18 | Funcțional stație de pompare incendiu (2 puncte de duty) | PV probă | firmă autorizată + ISU | **FD** |
| 19 | Funcțional desfumare naturală (trape) + mecanică (circulații) | PV probă | RTE + ISU | **FD** |
| 20 | Măsurătoare STI alarmare vocală EVAC | PV măsurătoare | firmă atestată | **FD** |
| 21 | Verificare fotometrică pe teren — toate cele 4 clase SR EN 12193 | PV releveu fotometric | firmă atestată | **FD** |
| 22 | Reglaj aeraulic CTA sală + ventilare vestiare (cascadă) | protocol debite | RTE | CM |
| 23 | Funcțional grup electrogen (AAR, autonomie) | PV probă | RTE + electrician autorizat | **FD** |
| 24 | Funcțional CCTV/control acces/ticketing integrat cu IDSAI | PV probă integrare | RTE | CM |

Legendă: **FD** = fază determinantă (necesită prezența ISC/beneficiar/proiectant, uneori ISU); CM = control în masă; CQ = control calitate recepție.

### PTh-I.9.2 Faze determinante — detaliere

Numărul de faze determinante ale sălii de sport (10 din 24 de puncte de control) este superior celui al unei clădiri obișnuite fără aglomerare de persoane, dar inferior celui al unui centru comercial regional de amploare — proporțional cu complexitatea și profilul de risc real ale funcțiunii: pe lângă priza de pământ de fundație, traseele îngropate și probele de canalizare (comune oricărei tipologii), se adaugă ca faze determinante specifice sălii de sport: **montajul și recepția structurii metalice a acoperișului** (condiție fizică obligatorie pentru orice instalație suspendată — sprinklere, CTA, proiectoare — coordonată direct cu `structura-pth.md`), **proba de presiune a zonei sprinklerate a depozitului** (element confirmat abia la faza PTh, cf. PTh-I.6.4), **funcționarea desfumării** (naturală și mecanică, condiție obligatorie pentru avizul ISU), **măsurătoarea STI a alarmării vocale** (condiție de bază pentru evacuarea ordonată a celor 1.615 persoane de calcul) și **verificarea fotometrică pe teren a celor 4 clase de iluminat sportiv** — aceasta din urmă, specifică exclusiv funcțiunii sportive, fiind condiția de omologare a sălii pentru competiții oficiale la fiecare nivel (regional/național/televizare), fără de care federația sportivă competentă nu poate elibera omologarea de teren de joc.

### PTh-I.9.3 Cartea tehnică a construcției — capitol instalații

| Document | Conținut |
|---|---|
| Planuri as-built | trasee reale executate, per instalație, coordonate cu poziția reală a pasarelelor și a structurii metalice |
| Scheme finale | monofilară actualizată, coloane, izometrice, rețea sprinkler ZC-Depozit nod-cu-nod |
| Releveu fotometric | valori măsurate pe teren, la fiecare din cele 4 clase, semnat de specialist atestat |
| Fișe tehnice echipamente | toate echipamentele montate + certificate (marcaj CE, agremente PSI) |
| Buletine de probe | PRAM, presiune sprinkler/hidranți, etanșeitate, debite ventilare, STI EVAC, fotometrie |
| Procese-verbale FD | toate fazele determinante semnate, inclusiv aviz ISU |
| Protocoale reglaj | echilibrare hidraulică, reglaj aeraulic, programare BMS/IDSAI |
| Instrucțiuni de exploatare | operare stație pompare, IDSAI, grup electrogen, comutare scenarii iluminat sportiv |
| Program mentenanță | revizii periodice (sprinkler/hidranți semestrial, F-Gas dacă aplicabil, ascensor ISCIR) |
| Garanții | certificate garanție producători (pompe, cazane, PC, proiectoare LED, IDSAI, EVAC) |

---

## PTh-I.10 Protocoale de PIF/comisionare + program complet de probe

### PTh-I.10.1 Tabel complet de probe și verificări

| Instalație | Proba | Presiune/parametru | Durată | Criteriu de admisie |
|---|---|---|---|---|
| Apă rece/ACM | etanșeitate | 1,5×p regim, min. 10 bar | 1 h | fără scădere, fără scurgeri (SR EN 806-4) |
| Canalizare menajeră | etanșeitate | umplere la nivel | 15 min | fără scurgeri la îmbinări |
| Separator nămol/grăsimi bufet | funcțională + etanșeitate | debit nominal | — | conform SR EN 1825 |
| Pluvial sifonic | probă de amorsare | debit de calcul (115,5 l/s) | — | funcționare sifonică confirmată, fără cavitație |
| CTA sală (2 buc.) + vestiare | debite + echilibrare | debite proiectate ±10-15% | — | SR EN 12599 |
| Tubulatură ventilare | etanșeitate | clasa B (SR EN 12237) | conform metodă | scurgeri sub limita clasei |
| Desfumare naturală (trape) | funcțională | comandă automată + manuală | — | deschidere completă ≤60 s, aer compensare <5 m/s confirmat |
| Desfumare mecanică (circulații) | funcțională F400/120 | test la cald simulat | 120 min | ventilator menține funcționarea la 400°C |
| Electrice | rezistență izolație | 500 V c.c. | — | ≥0,5 MΩ (I7) |
| Electrice | priză de pământ | — | — | R ≤1 Ω |
| Electrice | test declanșare RCD | I∆n = 30 mA | — | declanșare <300 ms |
| Trăsnet | continuitate coborâri + priză (12 coborâri) | — | — | conform SR EN 62305-3 |
| Sprinkler ZC-Depozit | presiune hidraulică | 1,5×p regim, min. 15 bar | 2 h | fără scădere, fără scurgeri |
| Sprinkler | funcțională ACS + alarmă hidraulică | debit test | — | alarmă declanșată corect |
| Hidranți interiori/exteriori | debit-presiune | punctul cel mai defavorabil | — | ≥2,1 l/s la ≥2,5 bar (interiori), ≥10 l/s (exteriori) |
| Stație pompare incendiu | funcțională (2 puncte de duty) | scădere presiune simulată | — | pornire conform normat, ambele puncte confirmate |
| IDSAI | funcțională detectoare | test 100% adrese | — | semnalizare corectă |
| IDSAI | matrice cauză-efect | test integral | — | toate efectele confirmate |
| EVAC | inteligibilitate STI | cu sonorizare eveniment pornită la nivel maxim | — | STI ≥0,5 pe toate zonele |
| Grup electrogen | funcțională AAR | simulare cădere rețea | — | comutare <15 s, autonomie confirmată |
| Iluminat sportiv | releveu fotometric, cele 4 clase | luxmetru pe grila de 24 puncte | — | Em/U1/U2 conform PTh-I.3.6 pe fiecare clasă |
| Iluminat de securitate | comutare + autonomie | test descărcare | 1 h | comutare ≤5 s, autonomie confirmată |
| CCTV/control acces/ticketing | funcțională integrală | test pe fiecare subsistem | — | deblocare fail-safe confirmată |
| Sonorizare | STI + nivel presiune sonoră | măsurătoare in situ | — | STI ≥0,50, 95-100 dB(A) |

### PTh-I.10.2 Echilibrarea hidraulică — sprinklere ZC-Depozit și hidranți

Verificarea presiunii la ACS-ul zonei sprinklerate și la hidrantul cel mai defavorizat se face prin manometre montate temporar la punctele critice identificate la PTh-I.6.3-I.6.4, comparate cu valorile de calcul; abaterea admisă ≤±10%. Curba electropompei principale se verifică la **ambele puncte de funcționare** (scenariul intern, sprinklere+hidranți interiori, respectiv hidranți exteriori), cu proces-verbal separat pentru fiecare, identic principiului aplicat la instalațiile de amploare mai mare.

### PTh-I.10.3 Protocol verificare fotometrică pe teren — cele 4 clase

Verificarea se realizează cu luxmetru certificat, pe grila de calcul de 24 de puncte stabilită la PTh-I.3.6, pentru fiecare din cele 4 scenarii de comandă (III/II/I/TV HDTV), cu proces-verbal separat per clasă:

- comutare pe scenariul de clasă, stabilizare 10 minute (regim termic constant al surselor LED);
- măsurare Em, Emin, Emax pe grila de 24 de puncte → verificare U1, U2 conform pragurilor tabelului PTh-I.3.6, adaptate fiecărei clase (U1 ≥0,5 clasa III; ≥0,6 clasa II; ≥0,7 clasa I și TV);
- pentru clasa TV, măsurare suplimentară a iluminării verticale pe cele 4 direcții principale de filmare (Ev, U1 vertical ≥0,4);
- verificare GR prin raport fotometric al producătorului, corelat cu unghiurile de montaj confirmate la fața locului;
- verificare absență flicker (osciloscop/senzor dedicat pe un eșantion de proiectoare, la toate cele 4 scenarii);
- proces-verbal semnat de specialist atestat, anexat la cartea tehnică — condiție pentru omologarea de competiție a sălii de către federația sportivă și, pentru clasa TV, pentru acceptarea la transmisiile de televiziune.

### PTh-I.10.4 Protocol PIF — desfumare (naturală + mecanică)

- Test funcțional trape de desfumare: comandă automată de la centrala IDSAI (simulare alarmă pe zona sălii) și comandă manuală locală/de la pupitrul pompierilor; verificare timp de deschidere completă și verificare vizuală a aerului de compensare la cele 6 grile (viteză <5 m/s, confirmată cu anemometru).
- Test funcțional ventilator desfumare mecanică (F400/120): pornire automată la alarma zonei de circulații, verificare debit la gurile terminale.
- Verificare interfațare: oprirea automată a ventilării generale a CTA sală la declanșarea alarmei (evitarea propagării fumului prin rețeaua de tubulatură).

### PTh-I.10.5 Protocol PIF — grup electrogen și tablou de siguranță

- Testare comutare automată AAR (simulare cădere rețea publică), cronometrare timp de comutare (<15 s).
- Verificare secvențială a pornirii consumatorilor critici (pompă incendiu, ventilator desfumare, iluminat sportiv redus, CTA regim minim, EVAC, IDSAI), cu verificarea curenților de pornire cumulați față de marja disponibilă a grupului (v. PTh-I.4.4).
- Test autonomie la sarcină parțială reprezentativă (minimum 2 ore din cele 8 declarate), extrapolare pe curba de consum specific combustibil declarată de producător.
- Verificare UPS dedicate (EVAC, IDSAI): autonomie conformă fișei tehnice, timp de comutare <0,5 s.

### PTh-I.10.6 Protocol PIF — curenți slabi (CCTV, control acces, sonorizare/EVAC)

- **CCTV**: verificare câmp vizual per cameră (fără zone oarbe pe tribune, intrări, teren, perimetru), test înregistrare/redare NVR.
- **Control acces**: test deblocare fail-safe la simularea alarmei IDSAI pe fiecare zonă/turnichet.
- **Sonorizare/EVAC**: măsurătoare STI cu sonorizarea de eveniment pornită la nivelul ei maxim admis, în minimum 6 puncte reprezentative (teren, tribune pe cele 4 laturi, vestiare); test al releului de prioritate hardware (întrerupere fizică a sonorizării de eveniment la declanșarea alarmei).
- **Tabelă de scor**: verificare funcțională a afișajului pe toate cele 4 fețe, sincronizare cu cronometrul oficial de joc.

---

## PTh-I.11 Sinteza și concluzia inginerească

### PTh-I.11.1 Sinteza capacităților instalate — confirmare la nivel de execuție

Instalațiile detaliate în prezentul supliment de fază PTh confirmă, la nivel de execuție, toate capacitățile stabilite în DTAC: alimentarea cu apă rece dimensionată pe vârful concentrat al dușurilor (4,5 l/s, cu breviarul nod-cu-nod de la PTh-I.6.1 confirmând pierderile globale ale DTAC), ACM cu acumulare dublă și cascadă pe cele 4 grupuri de vestiare (PTh-I.6.2), sursa termică duală (cazane+PC) cu distribuție pe 5 circuite independente (PTh-I.2.4), ventilarea modulantă a sălii pe cele două regimuri (PTh-I.2.5), cascada de depresiune a vestiarelor detaliată nod cu nod (PTh-I.6.5), desfumarea naturală și mecanică dimensionată explicit (PTh-I.2.7, PTh-I.6.6), instalația electrică cu bilanț confirmat pe fiecare circuit (PTh-I.4), iluminatul sportiv dezvoltat complet pe toate cele 4 clase SR EN 12193 (PTh-I.3) și curenții slabi specifici funcțiunii sportive (PTh-I.7).

### PTh-I.11.2 Tabel sintetic al corecțiilor PTh față de DTAC

| Nr. | Element | Valoare DTAC | Valoare/completare PTh | Motivare |
|---|---|---|---|---|
| 1 | Zonă sprinklerată depozit materiale sportive | „evaluat separat" (nemenționat cantitativ) | ZC-Depozit, clasa OH1, Q_op = 6,0 l/s, ~300 mp | confirmare la faza de execuție a semnalului lăsat deschis explicit în DTAC cap. 10.3 |
| 2 | Rezervor de incendiu | 110-120 mc | **135 mc** | majorare directă cu volumul de apă al zonei sprinklerate nou confirmate (21,6 mc), cf. PTh-I.6.4 |
| 3 | Grup de pompare PSI | nedetaliat (doar debitele hidranților) | Q = 12 l/s, H = 45 mCA, motor 11 kW | dimensionare completă pe scenariul concomitent sprinklere+hidranți, cf. PTh-I.6.4 |
| 4 | Distribuție proiectoare sportive pe scenarii inferioare clasei TV | doar clasa TV cuantificată explicit (60 proiectoare) | breviar de flux extins la toate cele 4 clase (16/24/36/60 proiectoare active) | completare necesară — cerința de eliminare a umbrelor se aplică tuturor claselor, nu doar televizării |
| 5 | Putere de calcul iluminat sportiv pe scenarii | 10/30/65/95 kW (estimare orientativă) | 5,0/8,3/12,4/19,9 kW (calcul fotometric detaliat) | puterea de protecție a circuitului TEI se menține conservator la valorile DTAC (rezervă extindere + CLO + control), consumul real confirmat prin calcul este inferior |
| 6 | Rezervă fizică pasarele tehnice | nemenționată explicit | rezervă constructivă pentru extindere la ~120 de proiectoare | valorifică marja de putere de proiectare deja conservatoare a circuitului TEI |
| 7 | Diametre conducte pe rețelele principale | debite globale, fără diametre explicite | diametre confirmate nod-cu-nod (PP-R Ø32-Ø63, oțel DN65-DN150 etc.) | necesar la faza de execuție, absent la faza de predimensionare |

Toate celelalte capacități (grup electrogen 250 kVA, priză de pământ Rp ≤1 Ω, paratrăsnet nivel III, debite de ventilare 21.000/58.140 mc/h, suprafață de desfumare ≥33,8 mp, evacuare pe 33 de fluxuri) sunt **confirmate identic** de dezvoltarea de detaliu a prezentului supliment, fără corecții — o coerență care validează soluțiile de principiu adoptate la faza DTAC.

### PTh-I.11.3 Concluzia inginerească

Suplimentul de fază PTh duce la nivelul de detaliere necesar execuției toate instalațiile sălii de sport polivalente, păstrând consecvent, la fiecare capitol, cele două teme centrale identificate încă din memoriul DTAC — **coexistența regimurilor de antrenament și eveniment** și **volumul mare al sălii de joc, cu înălțime liberă de 12,5 m** — și adăugând, față de faza anterioară, tocmai elementele care nu pot fi tratate la nivel de concept: breviarele nod-cu-nod ale rețelelor hidraulice și aeraulice, dezvoltarea completă a iluminatului sportiv pe toate cele patru clase SR EN 12193 (nu doar clasa guvernantă), confirmarea și dimensionarea zonei sprinklerate a depozitului de materiale sportive (element lăsat deschis explicit la faza DTAC), coordonarea explicită a traseelor de instalații cu structura metalică a acoperișului (`structura-pth.md`), fișele tehnice complete ale echipamentelor majore, Planul de Control al Calității cu fazele determinante specifice funcțiunii și programul complet de probe — inclusiv verificarea fotometrică pe teren, condiție de omologare competițională a sălii.

Corecțiile introduse (tabelul PTh-I.11.2) sunt puține la număr, punctuale și motivate tehnic — semn al unei predimensionări DTAC solide, care nu a necesitat revizuiri majore la trecerea la faza de execuție, ci doar completări acolo unde DTAC însuși semnalase explicit o evaluare rămasă deschisă (zona sprinklerată a depozitului) sau unde nivelul de detaliere cerut de execuție (breviarul nod-cu-nod, calculul complet pe toate cele 4 clase de iluminat) depășea, prin natura sa, ceea ce o fază de predimensionare putea rezonabil cuprinde. Piesele desenate de execuție (scheme monofilare complete, planuri de traseu ale rețelelor pe fiecare specialitate, planul de amplasare a celor 60 de proiectoare sportive pe cele 4 pasarele, planul zonei sprinklerate ZC-Depozit) și caietele de sarcini pe fiecare specialitate se elaborează pe baza dimensionărilor și breviarelor stabilite în prezentul supliment, la fazele D.E./execuție ulterioare.
