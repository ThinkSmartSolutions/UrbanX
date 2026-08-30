# DTOE — Proiectul de Organizare a Execuției Lucrărilor — Parc Fotovoltaic (CEF)

Documentație / Proiect de Organizare a Execuției (DTOE / POE), faza **PTh**, întocmită de inginerul responsabil cu organizarea de șantier pentru realizarea unui **parc fotovoltaic (centrală electrică fotovoltaică — CEF)** amplasat la sol, cu **structuri suport fixe metalice pe piloți bătuți**, **module fotovoltaice cristaline 2V**, **rețele electrice DC/AC subterane**, **invertoare de string / centralizate**, **posturi de transformare (PT)** în anvelope prefabricate și **stație de conexiune / racord** la rețeaua operatorului de distribuție (OD).

> **PARAMETRIC ÎN RAPORT CU PUTEREA.** Prezentul DTOE se elaborează parametric, pentru o gamă tipică **P_inst = 0,5 ÷ 50 MWp**. Organizarea de șantier a unui parc FV este dominată de **caracterul liniar-repetitiv și modular** al lucrărilor: aceleași operații (batere pilot tip → montaj masă tip → montaj module → cablare) se repetă de un număr de ori proporțional cu puterea. În consecință, **durata, forța de muncă, numărul de utilaje și cantitățile de deșeuri scalează (aproximativ liniar, cu paralelizare) cu puterea instalată și cu numărul de module**. Toate valorile numerice din text sunt exprimate prin **relații de scalare** și ilustrate pe un **caz de referință de 5 MWp** (~9.000 module de 555 Wp, ~1.250 mese de 2×4=8 module fiecare, ~1.250 piloți/masă × 2 = ~2.500 piloți, 3 PT-uri de 1.600 kVA). Cazul de referință servește **doar ca ilustrare**; formulele de scalare permit dimensionarea organizării pentru orice putere.

> **Corelare (fără duplicare).** DTOE **nu reia** memoriile de arhitectură, structură (rezistență — dimensionarea piloților/meselor), instalații electrice (scheme DC/AC, dimensionare cabluri/invertoare) sau scenariul de securitate la incendiu ale parcului. Le folosește **ca documentație-suport** (soluții, cantități, greutăți de montaj, trasee) pentru dimensionarea organizării de execuție. **Cartea tehnică — secțiunea B (execuție)** preia din DTOE planul de organizare, jurnalul de șantier și planul SSM.

---

## 1. Date generale, obiectul documentației, cadru legal

### 1.1 Date generale

| Element | Valoare / descriere |
|---|---|
| Denumire investiție | Construire parc fotovoltaic (centrală electrică fotovoltaică — CEF) cu racord la rețeaua de distribuție |
| Obiect DTOE | Organizarea execuției lucrărilor (incintă provizorie + tehnologie de montaj + eșalonare + SSM/PSI/mediu + PIF) |
| Beneficiar / Investitor | (se completează — titular al autorizației de construire) |
| Executant EPC | (se completează — antreprenor general EPC, cu atestare ANRE tip C și RTE) |
| Amplasament | Teren extravilan/agricol scos din circuit / teren degradat; suprafață brută de referință **~1,3 ÷ 1,7 ha / MWp** (fixe) |
| Putere instalată (P_inst) | **PARAMETRICĂ** — 0,5 ÷ 50 MWp; caz de referință ilustrativ **5 MWp** |
| Nr. module (N_mod) | N_mod = P_inst / P_modul; ref. 5 MWp / 555 Wp ≈ **9.000 module** |
| Nr. mese suport (N_mese) | N_mese = N_mod / n_mod/masă; ref. 9.000 / 8 ≈ **1.125 mese** |
| Nr. piloți (N_pil) | N_pil = N_mese × k_pil (k_pil = 2 ÷ 6 piloți/masă); ref. ≈ **2.250 ÷ 4.500 piloți** |
| Nr. invertoare | string (~110–350 kVA) sau centrale; ref. 5 MWp → ~15 invertoare string 333 kVA sau 2 centrale |
| Nr. posturi de transformare (PT) | N_PT = P_inst / S_PT (S_PT = 1.600 ÷ 3.150 kVA); ref. 5 MWp → **3 × 1.600 kVA** |
| Categorie de importanță | **C — normală** (HG 766/1997, Anexa 3); PT/stație de racord — elemente cu importanță funcțională |
| Clasa de importanță seismică | III, γI,e = 1,0 (P100-1/2013) — structuri suport și PT-uri prefabricate |
| Durata de execuție estimată | **T ≈ 4 + 0,9 × P_inst[MWp] luni** (paralelizat) — v. cap. 7; ref. 5 MWp → **~8–9 luni** |
| Valoare C+M estimată | (se completează din devizul general — capitol organizare 1.2 ÷ 2,5 % din C+M) |

### 1.2 Obiectul și scopul DTOE

DTOE reglementează, pe toată durata execuției parcului FV:
- amenajarea și delimitarea **incintei de organizare** și a **perimetrului de lucru** (împrejmuire provizorie, porți, drumuri tehnologice, platforme);
- **dotările sociale și tehnico-administrative** (containere birou/vestiar/magazie/grup sanitar), scalate cu efectivul;
- **utilitățile provizorii** (energie de șantier — grup electrogen/racord provizoriu, apă, canalizare/vidanjare, iluminat);
- **tehnologia de execuție pe faze specifice FV** și fluxurile de materiale/personal/utilaje pe frontul liniar de lucru;
- **graficul de eșalonare (Gantt)**, drumul critic și paralelizarea pe sectoare (tabere de montaj);
- măsurile de **securitate și sănătate în muncă (SSM — HG 300/2006, HG 1091/2006)**, **apărare împotriva incendiilor (PSI)** și **protecția mediului** (praf, zgomot, perioadă de cuibărit, sol);
- **managementul traficului** de aprovizionare (transporturi agabaritice pentru PT-uri, palete de module) și protecția vecinătăților;
- **notificările și declarațiile obligatorii** (declarație prealabilă ITM, notificare ISU, notificare OD/ANRE) și **recepția organizării**;
- **punerea în funcțiune (PIF)**, testele de energizare și predarea la OD.

### 1.3 Cadru legal aplicabil

| Act normativ | Obiect | Incidență în DTOE |
|---|---|---|
| **Legea nr. 169/2026** (CATUC), art. 264, Anexa nr. 2 | AC; conținutul-cadru DTOE/POE (organizarea de execuție ca lucrare); panou identificare; refacerea terenului la finalizare | Cap. 1, 3, 13; structura documentației |
| **Legea 10/1995** (rep.) | Cele 7 cerințe fundamentale; sistemul calității; jurnal de șantier | Cap. 6, 8, corelare carte tehnică |
| **Legea 123/2012** energiei electrice + **regulamente ANRE** | Racordarea la rețea (ATR/aviz de racordare), autorizare de înființare CEF, licențiere | Cap. 6.7, 6.8 (racord/PIF) |
| **Ordin ANRE 59/2013 (rep.)** — regulament racordare | ATR, contract de racordare, faze de racordare, PIF-uri parțiale | Cap. 6.7, 7 |
| **HG 300/2006** | Cerințe minime SSM pentru **șantiere temporare/mobile**; PSS; **coordonator SSM proiectare/execuție**; declarație prealabilă ITM; registru de coordonare | **Cap. 9 — act central** |
| **Legea 319/2006** + **HG 1425/2006** | SSM — obligații, evaluarea riscurilor, instruire, EIP, cercetare evenimente | Cap. 9 |
| **HG 1091/2006** | Cerințe minime SSM pentru **locul de muncă** (iluminat, căi de circulație, vestiare, grupuri sanitare, apă potabilă) | Cap. 3, 4, 9 |
| **HG 971/2006** | Semnalizarea de securitate/sănătate | Cap. 9, 13 |
| **HG 1048/2006** | EIP — cască, vestă, bocanci, hamuri, mănuși/încălțăminte electroizolante | Cap. 9 |
| **HG 1146/2006** | Utilizarea echipamentelor de muncă (utilaje, macarale, mașină de batut piloți, scule electrice) | Cap. 5, 9 |
| **PT R1-2010 (ISCIR)** | Macarale — autorizare, RSVTI, macaragii/legători autorizați | Cap. 5, 9 |
| **Legea 307/2006** + **Ordin MAI 163/2007** | Apărarea împotriva incendiilor; hot-work; notificare/aviz ISU | Cap. 10 |
| **OUG 195/2005** (rep.) + **Legea 211/2011** | Protecția mediului; regimul deșeurilor; ierarhia gestionării | Cap. 11 |
| **HG 856/2002** | Evidența gestiunii deșeurilor + coduri (17 xx xx) | Cap. 11 |
| **OUG 57/2007 (rep.) / OUG 195/2005** — arii/specii protejate | Perioada de cuibărit, specii protejate, condiții acord de mediu | Cap. 11.2 |
| **OUG 195/2002** (rep.) + **SR 1848** | Circulația pe drumurile publice, semnalizare temporară | Cap. 12 |
| **I7-2011**, **SR EN 62305**, **NTE 007/08/00** | Instalații electrice, protecție la trăsnet, execuție rețele electrice | Cap. 6.5, 6.6 |
| **SR EN 1090-2** | Execuția structurilor de oțel (mese/piloți) — clasa de execuție EXC2 | Cap. 6.3 |

---

## 2. Descrierea lucrărilor, a amplasamentului și a acceselor

### 2.1 Descrierea sumară a lucrărilor de bază

Lucrarea constă în realizarea unei CEF la sol, cuprinzând:
- **pregătirea terenului** (defrișare vegetație joasă, decopertare parțială selectivă, nivelare grosieră fără terasamente majore — parcul FV se adaptează la teren);
- **trasarea topografică** a rețelei de piloți (grilă geometrică pe axe est-vest, module orientate sud);
- **baterea piloților** metalici (profile C/U/IPE) sau **înfiletarea șuruburilor de fundare** (ground screws), la cotă și verticalitate controlate;
- **montajul structurilor suport** (mese fixe metalice zincate — pane, contravântuiri, cleme);
- **montajul modulelor fotovoltaice** (fixare cu cleme mijloc/margine, cuplare rapidă conectori MC4);
- **realizarea rețelelor electrice**: **DC** (string-uri → cutii de joncțiune/combiner sau direct la invertoare string) și **AC** (invertor → PT → stație de racord), în șanțuri cu pat de nisip și bandă de avertizare;
- **montajul invertoarelor** (string pe structuri sau centrale pe skid/platformă) și al **posturilor de transformare** (anvelope prefabricate din beton pe radier);
- realizarea **stației de conexiune / racord** MT și a **prizei de pământ generale** și protecției la trăsnet;
- **drumuri tehnologice interioare, împrejmuire perimetrală definitivă, sistem de supraveghere/securitate**;
- **PIF, teste, energizare și predare** la OD.

### 2.2 Amplasamentul

Teren predominant plan/ușor înclinat, extravilan (agricol scos din circuit / teren degradat / neproductiv), cu suprafață brută **A ≈ (1,3 ÷ 1,7) ha/MWp** pentru structuri fixe (ref. 5 MWp → **~7 ÷ 8,5 ha**). Amplasamentul se caracterizează prin **absența construcțiilor de înălțime**, **front de lucru foarte extins și liniar**, teren adesea neconsolidat (probleme de portanță pentru utilaje pe vreme umedă), posibile zone umede/cursuri de apă și habitate — de gestionat prin măsuri de mediu (cap. 11).

### 2.3 Accesele de șantier

Accesul se realizează dintr-un **drum public/de exploatare** printr-un **acces amenajat provizoriu** (platformă pietruită de intrare cu geotextil + balast 20–30 cm, lungime rampă de curățare roți ~10 m). Necesarul de acces se dimensionează pentru:
- **transport agabaritic** al PT-urilor prefabricate (masă 15 ÷ 40 t/PT) și eventual al transformatorului de racord — necesită traseu verificat, autorizații de transport agabaritic (AACR), eventual macara telescopică pe amplasament;
- **livrări paletizate de module** (o paletă ≈ 30–36 module ≈ 1 t; ref. 5 MWp ≈ 9.000 module ≈ **250–300 palete**, ~250–300 t);
- **circulația internă** pe drumuri tehnologice (lățime 3,5–4,0 m, raze de întoarcere pentru autoutilitare și mașina de batut piloți).

---

## 3. Organizarea de șantier — incinta, dotări, suprafețe

### 3.1 Incinta și împrejmuirea

Se organizează:
- o **incintă de organizare** (tabără de bază) — 500 ÷ 2.000 mp, concentrată lângă accesul principal, cuprinzând containere, depozit de module, parc utilaje, zona de deșeuri;
- **perimetrul de lucru** (întreg amplasamentul), delimitat cu **împrejmuire provizorie** (panouri mobile / plasă pe stâlpi metalici, h ≥ 2,0 m) până la montarea împrejmuirii definitive; porți carosabile (l = 4–6 m) și pietonale.

Împrejmuirea provizorie perimetrală scalează cu suprafața: **L_gard ≈ perimetrul terenului ≈ 4 × √A** (A în mp). Ref. 5 MWp (~75.000 mp) → L_gard ≈ **~1.100 m**.

### 3.2 Zonarea funcțională a incintei de bază

1. **Zona administrativă** — containere birou (șef șantier, RTE, dispecerat, coordonator SSM), sală instructaj.
2. **Zona socială** — vestiare, grup sanitar (ecologic/racordat), spațiu servire masă, punct prim-ajutor.
3. **Zona de depozitare module** — platformă nivelată, acoperită parțial, cu paleți pe suporți, protecție la furt (module = țintă de furt; supraveghere + gard + eventual pază).
4. **Zona de depozitare echipamente** — invertoare, structuri metalice zincate, tamburi de cablu, cleme, conectori (în container/magazie închisă).
5. **Zona de depozitare PT-uri / transformatoare** — platformă portantă (radier temporar/balast compactat) pentru anvelope de beton (masă mare).
6. **Parc utilaje** — mașină de batut piloți, mini-excavator/săpător de șanț (trencher), macara, autoutilitare; punct alimentare carburant cu cuvă de retenție.
7. **Zona de gestiune deșeuri** — containere selective (v. cap. 11).
8. **Zona utilităților provizorii** — grup electrogen/tablou de racord provizoriu, rezervor apă, bazin vidanjabil.

### 3.3 Tabel dotări organizare + suprafețe (caz ref. 5 MWp; scalare în note)

| Dotare | Buc. (ref.) | Suprafață unitară | Suprafață totală | Scalare |
|---|---|---|---|---|
| Container birou/dispecerat | 3 | 15 mp | 45 mp | +1 la fiecare +10 MWp |
| Container vestiar | 2 | 15 mp | 30 mp | 1/25 muncitori |
| Container magazie echipamente | 2 | 15 mp | 30 mp | +1/10 MWp |
| Grup sanitar (cabine ecologice) | 3 | 2 mp | 6 mp | 1/15 muncitori |
| Platformă depozit module | 1 | — | 300–500 mp | ~60 mp/MWp |
| Platformă depozit PT/echip. | 1 | — | 150 mp | ~30 mp/MWp |
| Parc utilaje | 1 | — | 300 mp | +50 mp/MWp |
| Zonă deșeuri (containere) | 1 | — | 60 mp | liniar |
| Drumuri tehnologice interne | — | — | 2,5–4 km | ~0,6 km/MWp |
| Împrejmuire provizorie | — | — | ~1.100 m | 4×√A |
| **Total incintă bază** | | | **~1.000–2.000 mp** | |

### 3.4 Dimensionarea dotărilor sociale (fundamentare)

Efectivul de vârf N_v se estimează parametric (v. cap. 7): **N_v ≈ 8 + 4 × P_inst[MWp]** muncitori (paralelizat pe sectoare). Ref. 5 MWp → **N_v ≈ 28 muncitori**. Conform HG 1091/2006:
- **grupuri sanitare**: 1 cabină / 15 lucrători → 2 cabine + 1 rezervă = **3 cabine**;
- **vestiare**: min. 1,20 mp/lucrător utilizat simultan → ~34 mp → **2 containere**;
- **apă potabilă**: min. 5 l/pers./zi → rezerv de 200 l/zi; **apă tehnologică** (spălare roți, praf) — v. cap. 4.2;
- **spațiu servire masă** protejat, dotat cu mese, punct încălzire/răcire hrană;
- **punct prim-ajutor** cu trusă conformă și targă.

### 3.5 Amplasarea macaralei / mașinii de batut piloți și raza de excludere

- **Mașina de batut piloți** (pilot driver hidraulic pe șenile) lucrează pe **frontul liniar de mese**; se stabilește o **zonă de excludere de siguranță** (rază ≥ 5 m) în jurul capului de batere, semnalizată, cu interdicție de acces personal.
- **Macaraua** (pentru descărcarea/pozarea PT-urilor) — amplasată pe teren portant verificat, cu **raza de excludere = raza de lucru + lungimea sarcinii**; interdicție de trecere a sarcinii peste zone cu personal (v. cap. 5.2).

---

## 4. Utilități provizorii de organizare

Parcul FV se execută frecvent pe amplasamente **fără utilități preexistente**. Utilitățile de șantier se asigură astfel:
- **Energie electrică**: **grup(uri) electrogen(e)** (dimensionate mai jos) până la disponibilitatea unei alimentări provizorii; ulterior, PIF-ul parțial permite alimentarea serviciilor interne din propria stație.
- **Apă**: rezervor tampon alimentat prin cisternă (apă potabilă îmbuteliată separat pentru consum uman) + apă tehnologică pentru combaterea prafului și spălarea roților.
- **Canalizare**: bazin vidanjabil / cabine ecologice cu vidanjare periodică.
- **Iluminat**: turnuri de iluminat mobile (LED, pe grup electrogen/solar) pentru lucru pe timp redus de lumină și pază.

### 4.1 Estimarea puterii electrice de șantier

| Consumator | Putere unitară | Buc. | Simultaneitate | Putere |
|---|---|---|---|---|
| Mașină de batut piloți (hidraulic diesel) | propriu (motor termic) | 1–2 | — | 0 (nu la rețea) |
| Trencher / mini-excavator | propriu | 1–2 | — | 0 |
| Scule electrice montaj (înșurubătoare, torque) | 2 kW | 15 | 0,5 | 15 kW |
| Aparate de sertizare/testare DC-AC | 3 kW | 3 | 0,6 | 5,4 kW |
| Containere (climatizare, iluminat, IT) | 3 kW | 7 | 0,7 | 14,7 kW |
| Turnuri iluminat/pază | 2 kW | 4 | 0,5 | 4 kW |
| Rezervă/diverse | — | — | — | 6 kW |
| **Total estimat** | | | | **~45 kW** |

Se prevede un **grup electrogen 60 kVA** (rezervă de simultaneitate), cu **cuvă de retenție a carburantului** și tablou general de șantier (TGS) cu diferențiale 30 mA și protecție la scurtcircuit; scalare: **+~8 kW/10 MWp** (efectiv mai mare, mai multe echipe).

### 4.2 Necesarul de apă

- **Consum uman**: 5 l/pers./zi × N_v → ref. ~140 l/zi.
- **Apă tehnologică — combaterea prafului**: stropirea drumurilor tehnologice pe timp secetos. Q_praf ≈ **0,5–1 l/mp/zi** pe suprafața de drumuri circulate; ref. ~3 km × 4 m = 12.000 mp × 0,7 l ≈ **8,4 mc/zi** (cu cisternă de stropit).
- **Spălare roți** la ieșire (rampă/instalație): ~1–2 mc/zi.

---

## 5. Utilaje și echipamente de execuție

| Utilaj / echipament | Rol în CEF | Buc. ref. 5 MWp | Scalare |
|---|---|---|---|
| **Mașină de batut piloți** (pile driver hidraulic pe șenile, cu ghidaj și cap vibro/impact) | Baterea piloților metalici la cotă și verticalitate | 1–2 | +1/15 MWp |
| **Mașină de înfiletat șuruburi de fundare** (alt. la piloți) | Ground screws pe teren fără batere | 0–1 | opțional |
| **Trencher / mini-excavator** cu cupă îngustă | Săparea șanțurilor de cabluri DC/AC | 1–2 | +1/15 MWp |
| **Macara telescopică 25–90 t** | Descărcare/pozare PT-uri, transformator racord, componente grele | 1 (campanie) | pe faze PT |
| **Macara/manipulator telescopic (telehandler)** | Manipulare palete module, structuri | 1–2 | +1/10 MWp |
| **Autoutilitare / camioane** | Aprovizionare front liniar | 2–3 | liniar |
| **Autobetonieră / pompă (mică)** | Radiere PT, fundații stație (opțional) | campanie | pe PT |
| **Scule electrice/pneumatice montaj** | Structuri, module, cleme (chei dinamometrice) | 15–30 | liniar |
| **Aparatură testare electrică** (multimetru izolație, I-V curve tracer, testere continuitate PE) | Verificări DC/AC și PIF | 3–5 | liniar |
| **Grup electrogen, turnuri iluminat, cisternă apă** | Utilități provizorii | v. cap. 4 | |

### 5.1 Verificări obligatorii înainte de utilizare

- **Macara** (PT R1-2010 ISCIR): autorizație ISCIR valabilă, RSVTI desemnat, cartea utilajului, deservent (macaragiu) și legători de sarcină autorizați, verificarea limitatoarelor și a cablurilor/lanțurilor de ridicare, calarea pe teren portant, verificarea vitezei vântului (interdicție la vânt peste limita din carte).
- **Mașina de batut piloți**: verificarea stării ghidajului, a capului de batere, a sistemelor hidraulice, a stabilității pe teren (risc de răsturnare pe teren moale — plăci de repartiție); zona de excludere ≥ 5 m; verificarea absenței rețelelor subterane pe traseul de batere (aviz ANRE/utilitare, detecție).
- **Echipamente de muncă** (HG 1146/2006): verificare tehnică periodică, dispozitive de protecție, EIP asociat.

### 5.2 Procedura de ridicare a sarcinilor (PT-uri, transformatoare)

Se întocmește **plan de ridicare (lifting plan)** pentru fiecare PT: masă sarcină, rază de lucru, tabel de sarcini al macaralei (cu marjă ≥ 20 % rezervă), puncte de prindere (urechi de ridicare ale anvelopei), traversă/dispozitiv de ridicare, teren de calare verificat, semnalizarea zonei, comunicare macaragiu-legător (semnale standard), interdicție de staționare sub sarcină. Pozarea pe radierul de beton întărit (min. R28 sau conform proiect) cu ghidaj și verificarea orizontalității.

---

## 6. Tehnologia de execuție pe faze, succesiune și fluxuri

### 6.1 Faze tehnologice (specific CEF)

| # | Fază | Descriere | Corelare grafic |
|---|---|---|---|
| F0 | **Predare amplasament + organizare** | Trasare limite, incintă, împrejmuire provizorie, containere, utilități | săpt. 1–2 |
| F1 | **Pregătirea terenului** | Defrișare vegetație joasă, decopertare selectivă, nivelare grosieră, drumuri tehnologice, platforme | săpt. 2–4 |
| F2 | **Trasare topografică grilă piloți** | Marcarea axelor rândurilor și a punctelor de batere (GPS-RTK / stație totală) | săpt. 3–5 |
| F3 | **Batere piloți / fundații** | Baterea piloților la cotă și verticalitate; radiere PT; fundații stație racord | săpt. 4–10 |
| F4 | **Montaj structuri suport (mese)** | Montaj pane, contravântuiri, cleme pe piloți; verificare planeitate/aliniere | săpt. 6–13 |
| F5 | **Montaj module** | Fixare module cu cleme, cuplare conectori, verificare torque și continuitate | săpt. 8–16 |
| F6 | **Tragere cabluri DC** | String-uri module → combiner/invertor; șanțuri, tuburi, pat nisip, bandă avertizare | săpt. 9–16 |
| F7 | **Montaj invertoare** | Invertoare string pe structuri / centrale pe skid; conexiuni DC/AC | săpt. 12–17 |
| F8 | **Montaj PT-uri + tragere cabluri AC/MT** | Pozare anvelope PT pe radier, montaj trafo/celule, cabluri AC LV→PT, MT PT→stație | săpt. 13–20 |
| F9 | **Priză de pământ + protecție la trăsnet** | Rețea de împământare (bandă/electrozi), legături PE structuri, coborâri paratrăsnet | săpt. 6–20 (paralel) |
| F10 | **Stație de conexiune / racord OD** | Realizare stație MT de racord, aparataj, protecții, contorizare | săpt. 16–22 |
| F11 | **Împrejmuire definitivă + securitate** | Gard definitiv, sistem supraveghere, detecție intruziune | săpt. 18–23 |
| F12 | **Testare + PIF + energizare** | Teste DC/AC, izolație, continuitate PE, punere sub tensiune, probe funcționale, predare OD | săpt. 22–24 |
| F13 | **Refacere teren + recepție organizare** | Dezafectare organizare, refacere sol, însămânțare, RTL | săpt. 24 |

### 6.2 Fluxuri

- **Flux materiale**: acces → depozit incintă bază → distribuție pe **sectoare de lucru** (telehandler pe drumuri tehnologice) → front de montaj. Modulele se aduc pe sectoare **just-in-time** (evitarea depozitării prelungite în câmp — furt, deteriorare).
- **Flux personal**: intrare prin poartă unică cu pontaj → instructaj SSM → deplasare pe drumuri tehnologice la sectorul alocat; interdicție de traversare a zonelor de batere piloți.
- **Flux utilaje**: mașina de batut piloți precede întotdeauna echipele de montaj mese (decalaj minim de siguranță de 1–2 sectoare). Trencher-ul urmează montajul meselor, înainte de/în paralel cu cablarea DC.
- **Paralelizarea**: parcul se împarte în **sectoare (tabere)** identice; echipele avansează „en train" (batere → mese → module → DC), permițând suprapunerea fazelor și scalarea duratei.

### 6.3 Detalii tehnologice pe faze critice

**F3 — Baterea piloților (fază critică de risc și de calitate).** Se verifică absența rețelelor subterane. Baterea se face cu control de **verticalitate (abatere ≤ 1–2 %)** și **cotă superioară** (toleranță ± 20 mm), pe grilă. Se execută **teste de smulgere (pull-out) și de împingere (push-in)** pe piloți-martor (min. 0,5–1 % din piloți, conform proiect de structură/NP 123-2010) — rezultatele condiționează avansul. Pe teren cu refuz (rocă/pietriș) se recurge la **pre-găurire** sau la **micro-fundații de beton**. Trasabilitatea: fișă de batere per pilot/rând (cotă, energie, refuz).

**F4-F5 — Montaj mese și module.** Montajul meselor cu **cuplu de strângere controlat** (chei dinamometrice, valori din fișa producătorului). La module: manipulare cu **ventuze/dispozitive**, **fără călcare pe module**, cuplare conectori MC4 uscați și corect fixați (risc de arc electric/incendiu la contact slab — v. scenariu PSI). Verificarea **polarității string-urilor** și a **tensiunii de circuit deschis (Voc)** înainte de conectare la invertor. Interdicție de lucru la module pe furtună/vânt puternic (module = velă).

**F6-F8 — Rețele DC/AC.** Șanțuri cu adâncime conform I7/NTE (tipic 0,8–1,0 m MT), pat de nisip, tub de protecție, bandă de avertizare, refacerea compactării. Separarea traseelor DC/AC/MT și a celor de comunicație. Etichetarea și cartarea (as-built) a traseelor. Montajul invertoarelor cu respectarea distanțelor de ventilație. **Sub tensiune (DC) modulele sunt permanent active pe lumină** — se lucrează cu **EIP electroizolant**, string-uri deconectate/scurtcircuitate la lucru, și **niciodată** cu conectori sub sarcină.

**F12 — Testare/PIF.** Teste conform SR EN 62446 (verificarea instalațiilor FV): continuitate PE și echipotențializare, rezistență de izolație DC, polaritate, Voc/Isc pe string, funcționare invertoare, probe MT în stație, verificarea protecțiilor și a interfaței cu OD (protecție de interfață — anti-islanding). **Energizarea** se face etapizat, coordonat cu OD, cu **permise de lucru** și **consemnare a manevrelor**.

### 6.4 Racordul la rețea și punerea în funcțiune (administrativ)

- Racordul se realizează în baza **ATR** și a **contractului de racordare** cu OD; lucrările de racord (până la punctul de delimitare) pot fi executate de OD sau de un operator atestat ANRE.
- **PIF** presupune: recepția instalației, probe, contorizarea, avizul tehnic de racordare finalizat, obținerea (după caz) a **autorizației de înființare** și **licenței de exploatare** ANRE pentru puteri peste pragurile reglementate.
- Se planifică **ferestre de manevră** coordonate cu OD (indisponibilizări), incluse în drumul critic.

---

## 7. Graficul de eșalonare (Gantt), durata și drumul critic

**Formula duratei parametrice** (paralelizat pe sectoare, o echipă completă „train"):

> **T[luni] ≈ 4 + 0,9 × P_inst[MWp]**, cu un plafon prin adăugarea de sectoare/echipe (T tinde la ~5–7 luni la paralelizare maximă cu resurse suficiente pe amplasamente mari).

Ref. 5 MWp → **T ≈ 8,5 luni ≈ 24 săptămâni**. Ilustrare Gantt (săptămâni):

```
Fază                            S1  S4  S8  S12 S16 S20 S24
F0 Organizare/împrejmuire       ██
F1 Pregătire teren               ███
F2 Trasare piloți                 ██
F3 Batere piloți/fundații          ██████████
F4 Montaj mese                       █████████
F5 Montaj module                        ██████████
F6 Cabluri DC                             █████████
F7 Invertoare                                █████
F8 PT + cabluri AC/MT                          ███████
F9 Împământare/paratrăsnet         ████████████████  (paralel)
F10 Stație racord OD                              ██████
F11 Împrejmuire def./securitate                     █████
F12 Testare/PIF/energizare                              ████
F13 Refacere teren/recepție                               ██
```

### 7.1 Drumul critic

Drumul critic tipic: **F3 (batere piloți) → F4 (mese) → F5 (module) → F6 (DC) → F7/F8 (invertoare/PT) → F10 (stație racord) → F12 (PIF/energizare)**. Verigi sensibile: **livrarea PT-urilor/transformatorului de racord** (termene de fabricație lungi — se comandă din start), **ferestrele de manevră ale OD**, **testele de smulgere piloți** (pot impune reproiectarea fundării).

### 7.2 Corelarea resurselor cu graficul (histograma de personal)

Efectiv total scalat: **N_v ≈ 8 + 4 × P_inst[MWp]** la vârf (F4-F6 suprapuse). Ref. 5 MWp: vârf ~28, medie ~18. Echipe tipice:
- 1 echipă batere piloți (3–4 pers. + operator utilaj);
- 2–3 echipe montaj mese/module (4 pers./echipă);
- 1–2 echipe electrice DC/AC (2–3 pers.);
- 1 echipă PT/MT + PIF (electricieni autorizați ANRE);
- topograf, RTE, coordonator SSM, șef șantier, magazioner, pază.

### 7.3 Marje, rezerve și riscuri de întârziere

| Risc | Efect | Măsură |
|---|---|---|
| Teren umed / portanță redusă | Utilaje blocate, batere imposibilă | Drumuri tehnologice pietruite, plăci repartiție, planificare sezonieră |
| Refuz la batere (rocă) | Piloți nefinalizați | Pre-găurire / micro-fundații beton, buffer resurse |
| Întârziere livrare PT/trafo | Blocaj F8/F10 | Comandă timpurie, urmărire furnizor |
| Fereastră OD indisponibilă | Amânare energizare | Programare coordonată din start |
| Perioadă de cuibărit / restricții mediu | Interdicție lucrări în zone | Planificare F1 în afara perioadei, marcarea zonelor |
| Furt module | Pierderi, întârziere | Livrare JIT, pază, supraveghere, împrejmuire |
| Vânt puternic | Oprire montaj module/macara | Monitorizare meteo, praguri de oprire |

---

## 8. Aprovizionare, depozitare și trasabilitate

### 8.1 Aprovizionare

Aprovizionarea urmează **frontul liniar**: module și structuri **just-in-time pe sectoare**; PT-uri/transformator prin transport agabaritic programat; tamburi de cablu (DC/AC/MT) și materiale mărunte (cleme, conectori, tuburi) în magazie închisă. Se întocmește **grafic de aprovizionare** corelat cu Gantt-ul, cu evidența recepției calitative (declarații de conformitate, certificate, fișe tehnice module/invertoare).

### 8.2 Depozitare — condiții pe categorii

| Material | Condiții de depozitare |
|---|---|
| **Module FV** | Paleți pe suporți plani, în ambalaj original, ferite de umezeală/șocuri, **poziție verticală/pe muchie** conform producător, protecție la furt; NU se stivuiesc peste limita producătorului |
| **Structuri metalice zincate** | Pe suporți, ferite de contact sol/apă stagnantă (pete albe de zinc), aerisite |
| **Tamburi cablu** | Vertical pe flanșe/orizontal pe suporți, capete etanșate, ferite de UV prelungit |
| **Invertoare** | În magazie închisă, uscată, ferite de praf/umezeală, în ambalaj |
| **PT-uri / trafo** | Platformă portantă, orizontal, protecție la intemperii, capse/silicagel verificate |
| **Conectori/cleme/mărunt** | Magazie cu evidență, uscat |

### 8.3 Trasabilitate

Trasabilitatea se asigură prin: **fișe de batere piloți** (cotă, verticalitate, refuz), **procese-verbale de lucrări ascunse** (șanțuri, împământare, fundații), **fișe de torque** (mese/module — eșantion), **rapoarte de test** (Voc/Isc string, izolație, continuitate PE), **as-built** rețele, jurnal de șantier. Toate se integrează în **cartea tehnică — secțiunea B**.

---

## 9. Securitate și sănătate în muncă (SSM)

### 9.1 Cadru și organizare (HG 300/2006, Legea 319/2006)

Șantierul FV este **șantier temporar/mobil** în sensul HG 300/2006. Beneficiarul desemnează **coordonator SSM pe faza de proiectare** și **pe faza de execuție**; se întocmește **Planul de Securitate și Sănătate (PSS)** și se ține **Registrul de coordonare**. Se transmite **declarația prealabilă la ITM** (obligatorie când durata estimată depășește 30 zile lucrătoare și > 20 lucrători simultan, sau volum > 500 om-zile — condiție aproape sigur îndeplinită la un parc FV). Fiecare executant elaborează **Planul propriu de SSM** armonizat cu PSS.

### 9.2 Plan de prevenire și protecție — riscuri specifice CEF

| Activitate | Risc principal | Măsuri de prevenire |
|---|---|---|
| **Batere piloți** | Prindere/strivire în cap de batere, răsturnare utilaj, zgomot/vibrații, lovire de rețele subterane | Zonă de excludere ≥ 5 m, semnalizare, teren portant/plăci, detecție rețele, protecție auditivă, interdicție acces sub cap |
| **Montaj mese/module** | Tăieri (muchii metalice), lovire, efort (manipulare module ~30 kg), striviri degete | Mănuși anti-tăiere, manipulare în 2 pers./dispozitive, tehnica ridicării, ordine pe front |
| **Lucrări electrice DC** | **Șoc electric — modulele produc tensiune permanent la lumină**, arc electric | EIP electroizolant, string deconectat/scurtcircuitat, conectori niciodată sub sarcină, personal autorizat, LOTO |
| **Lucrări AC/MT (PT/stație)** | Electrocutare MT, arc de scurtcircuit | Personal autorizat ANRE, permis de lucru, consemnare manevre, scoatere de sub tensiune + verificare + scurtcircuitare + îngrădire + afișare (5 reguli de aur), EIP arc-flash |
| **Ridicare PT/trafo cu macara** | Cădere sarcină, strivire | Lifting plan, legători autorizați, interdicție staționare sub sarcină, calare, limită vânt |
| **Trencher / săpături** | Surpare mal, cădere în șanț | Sprijiniri/taluzare, semnalizare, distanțe de siguranță de depozitare pământ |
| **Lucru la (mică) înălțime** | Cădere (structuri, invertoare pe stâlpi) | Scări/platforme conforme, hamuri unde e cazul |
| **Radiații UV / stres termic** | Insolație, deshidratare (teren deschis) | Apă, pauze, umbrire, planificare orară vara |
| **Circulație utilaje pe front** | Accidentare pietoni | Separare căi, viteză limitată, semnalizare, vestă reflectorizantă |

### 9.3 Echipament individual de protecție (EIP) — HG 1048/2006

Bază: cască, vestă reflectorizantă, bocanci cu bombeu, mănuși anti-tăiere; **suplimentar pe activități**: protecție auditivă (batere piloți), **mănuși și încălțăminte electroizolante + vizieră arc-flash** (lucrări electrice DC/AC/MT), hamuri (înălțime), ochelari/mască praf (nivelări/săpături), protecție solară.

### 9.4 Semnalizare SSM (HG 971/2006)

Panouri de avertizare (pericol electric, zonă utilaje, șanțuri deschise), interdicție (acces neautorizat, foc), obligație (EIP), marcaje zone de excludere, balizare șanțuri și front de batere pe timp de noapte.

### 9.5 Prim-ajutor și situații de urgență

Punct prim-ajutor dotat, salvatori instruiți, **plan de evacuare medicală** cu adaptare la amplasament întins (coordonate GPS pentru puncte de acces ambulanță, drumuri tehnologice practicabile), numere de urgență, comunicare radio pe amplasament fără acoperire GSM. Instrucțiuni specifice **electrocutare** (întrerupere sursă, RCP) și **arc electric/arsuri**.

### 9.6 Instruirea și controlul SSM

Instructaj introductiv-general la intrare, instructaj la locul de muncă, instructaje periodice; instructaje **specifice** pentru lucrări electrice sub tensiune indusă de module și pentru manevre de ridicare. Controale zilnice ale coordonatorului/RTE, consemnate în registru.

### 9.7 Măsuri pe condiții meteo extreme

Praguri de oprire: **vânt** (montaj module/macara — conform carte utilaj și fișa modulelor), **furtună cu descărcări electrice** (interdicție lucru pe structuri metalice/module — risc trăsnet), **teren înghețat/umed** (batere/circulație utilaje), **caniculă** (rearanjare program).

---

## 10. PSI în organizarea de șantier

### 10.1 Dotarea PSI a organizării

- Stingătoare portabile (P6 pulbere ABC, CO₂ la tablouri/invertoare) la containere, parc utilaje, depozit module, zonă hot-work.
- **Pichet PSI** cu unelte (lopeți, târnăcop, găleți), rezervă de apă/nisip.
- Interdicție de fumat în zone cu risc; punct de fumat amenajat.
- Atenție la **risc de incendiu specific FV**: conexiuni DC slabe → arc → incendiu; string-uri sub tensiune permanentă — v. scenariu-psi.md al parcului. Pe șantier: verificarea corectă a conectorilor, evitarea încălzirii.
- Risc de **incendiu de vegetație** (teren cu iarbă uscată + scântei de la sudură/polizare) — cosire/curățare a zonei de lucru cu foc, supraveghere.

### 10.2 Reguli hot-work (permis de lucru cu foc)

Sudura/polizarea (rare la FV — mese cu îmbinări bulonate, dar posibile la stație/gard) se execută pe **permis de lucru cu foc**, cu zonă curățată de vegetație/materiale combustibile pe rază ≥ 10 m, supraveghetor cu stingător, post-supraveghere 30–60 min. Notificarea/avizul ISU pentru organizare, după caz.

---

## 11. Protecția mediului în execuție

### 11.1 Gestiunea deșeurilor de șantier (Legea 211/2011, HG 856/2002)

Se aplică **ierarhia deșeurilor** (prevenire → reutilizare → reciclare → eliminare) și colectarea selectivă:

| Cod (HG 856/2002) | Deșeu | Gestiune |
|---|---|---|
| 15 01 xx | Ambalaje (carton, lemn palet, folie, plastic) — **dominant la FV** (ambalaje module) | Reciclare prin operatori autorizați; volum mare — planificat |
| 17 04 xx | Deșeuri metalice (capete profile, șpan) | Valorificare la centre autorizate |
| 17 02 03 | Plastic (tuburi, deșeuri cabluri) | Reciclare |
| 17 04 11 | Cabluri (capete) | Valorificare (cupru/aluminiu) |
| 17 05 04 | Pământ/pietriș din săpături | Reutilizare pe amplasament / depozitare autorizată |
| 20 03 01 | Deșeuri menajere (containere) | Contract salubritate |
| 13 xx / 15 02 | Uleiuri/lavete contaminate (utilaje) — **periculos** | Stocare separată etanșă, operator autorizat, evidență |
| 16 06 xx | Baterii/acumulatori (dacă BESS/echip.) | Colectare separată autorizată |

Se ține **evidența gestiunii deșeurilor** (cantități, coduri, transportator, destinatar) și se predau cu formulare de transport (unde e cazul, aviz).

### 11.2 Măsuri de mediu specifice (praf, zgomot, biodiversitate, sol)

- **Perioadă de cuibărit / specii protejate**: dacă acordul de mediu / evaluarea de mediu impune, **lucrările de pregătire teren și defrișare se programează în afara perioadei de cuibărit** (tipic mart.–iul., după studiul de specialitate); marcarea și evitarea zonelor sensibile (cuiburi, vizuini, zone umede); prezența, unde e cazul, a unui **supervizor de mediu (ecolog)**.
- **Praf**: stropirea drumurilor (v. cap. 4.2), viteză redusă a utilajelor, curățarea roților la ieșire, prevenirea antrenării pe drumul public.
- **Zgomot și vibrații**: baterea piloților este sursa dominantă — se respectă **programul de lucru diurn**, se evită weekend-uri/noapte lângă localități, utilaje conforme (marcaj CE, nivel de zgomot), monitorizare la limita amplasamentului dacă e impusă.
- **Sol**: **decopertarea și stocarea separată a solului vegetal** pentru refacere; **evitarea compactării excesive** (parcul FV păstrează în general terenul); prevenirea poluării cu hidrocarburi.
- **Apă**: interdicția deversărilor; trecerile peste cursuri/zone umede conform avizelor (gospodărirea apelor).

### 11.3 Estimarea cantităților de deșeuri și evidența

Dominant: **ambalaje module** — ~0,5–1 kg carton/folie/lemn per modul → ref. 9.000 module ≈ **4,5–9 t ambalaje**; capete de cablu/profile ~0,2–0,5 t/MWp. Se dimensionează containere selective și frecvența de ridicare corelat cu Gantt (vârf la F5-F6).

### 11.4 Măsuri de prevenire a poluării accidentale

Alimentarea utilajelor pe zonă impermeabilizată/cuvă de retenție; kit de intervenție la scurgeri (material absorbant, saci); mentenanța utilajelor pentru evitarea pierderilor de ulei/motorină; interdicția spălării utilajelor pe sol nud.

---

## 12. Managementul traficului și protecția circulației publice

### 12.1 Programul transporturilor și fluxul de aprovizionare

- **Transporturi agabaritice** (PT-uri, transformator racord): traseu verificat, **autorizații de transport agabaritic**, pilotare, programare în afara orelor de vârf, coordonare cu administratorul drumului.
- **Livrări module/structuri**: eșalonate pe sectoare, evitarea aglomerării la poartă (o poartă = un punct de control).
- **Semnalizare rutieră temporară** (OUG 195/2002, SR 1848) la intersecția acces–drum public: indicatoare „ieșire utilaje", limitare viteză, curățarea drumului public de pământ antrenat.
- **Protecția vecinătăților**: program de lucru, limitarea prafului/zgomotului, evitarea blocării accesului riveranilor.

---

## 13. Semnalizarea șantierului și panoul de identificare a investiției

### 13.1 Panoul de identificare a investiției (obligatoriu — Legea nr. 169/2026, CATUC, art. 264)

Panou amplasat la accesul principal, cu: denumirea investiției (parc FV, putere), beneficiar, proiectant, executant, RTE, dirigintele de șantier, nr. și data AC, autoritatea emitentă, termen de execuție. Menținut lizibil pe toată durata.

### 13.2 Semnalizarea de șantier (integrată cu cap. 9 și 12)

Semnalizare de securitate (avertizare/interdicție/obligație), balizarea șanțurilor și a frontului de batere, marcaje ale drumurilor tehnologice, semnalizare rutieră la acces.

---

## 14. Notificări, avize și declarații obligatorii

| Notificare/aviz | Către | Temei | Moment |
|---|---|---|---|
| **Declarație prealabilă** | ITM | HG 300/2006 | Înainte de începerea lucrărilor (afișată pe șantier) |
| **Comunicare începere lucrări** | ISC + emitent AC | Legea nr. 169/2026 (CATUC), Legea 10/1995 | Înainte de începere |
| **Notificare / aviz** | ISU | Legea 307/2006 | Organizare / hot-work, după caz |
| **Coordonare racordare / manevre** | OD | Ordin ANRE 59/2013 | La F8-F10-F12 |
| **Autorizație de înființare / licență** | ANRE | Legea 123/2012 | După praguri de putere, la PIF |
| **Autorizații transport agabaritic** | Adm. drum / CNAIR | OUG 195/2002 | Înainte de transport PT/trafo |
| **Evidență deșeuri / transport** | (registru) | Legea 211/2011, HG 856/2002 | Pe parcurs |

---

## 15. Recepția organizării și punerea în funcțiune

### 15.1 Recepția organizării de șantier

Înainte de începerea lucrărilor de bază se face **recepția organizării**: verificarea împrejmuirii, a dotărilor sociale (conform HG 1091/2006), a utilităților provizorii (grup electrogen cu retenție, TGS cu diferențiale), a dotării PSI, a panoului de identificare, a semnalizării, a existenței PSS și a declarației ITM. Se consemnează într-un **proces-verbal de recepție a organizării**.

### 15.2 Recepția lucrărilor și PIF

- **Recepții pe faze determinante** (ISC): batere piloți (probe de smulgere), împământare, lucrări ascunse.
- **PIF electric**: testele de la cap. 6.3 (SR EN 62446), energizare coordonată cu OD, probe funcționale invertoare/PT/protecții de interfață, verificarea SCADA/monitorizare.
- **Recepția la terminarea lucrărilor (RTL)** cu comisia, punerea în funcțiune comercială după avizul de racordare finalizat și (după caz) licența ANRE.

---

## 16. Dezafectarea organizării și refacerea amplasamentului

La finalizare: demontarea împrejmuirii provizorii, evacuarea containerelor, utilajelor și deșeurilor, dezafectarea utilităților provizorii, **refacerea solului** (nivelare, așternerea solului vegetal stocat, **însămânțare cu iarbă/specii adaptate** — practică curentă la parcurile FV, care păstrează funcția de sol și reduc praful/eroziunea sub module), refacerea drumurilor publice afectate. Se întocmește **proces-verbal de refacere a amplasamentului**, cerință a conținutului-cadru DTOE (Legea nr. 169/2026 — CATUC, Anexa nr. 2).

---

## 17. Organizarea conducerii șantierului și responsabilități

| Funcție | Responsabilități principale |
|---|---|
| **Șef șantier (antreprenor EPC)** | Coordonarea generală, resurse, grafic, interfața cu beneficiarul/OD |
| **RTE (responsabil tehnic execuție)** | Conformitatea tehnică a execuției cu proiectul și normele, faze determinante |
| **Diriginte de șantier (beneficiar)** | Verificarea calității, dispoziții de șantier, recepții |
| **Coordonator SSM execuție** | PSS, registru coordonare, controale SSM, instructaje |
| **Electrician-șef autorizat ANRE** | Lucrări DC/AC/MT, PIF, manevre coordonate cu OD |
| **Topograf** | Trasare grilă piloți, verificări cote/aliniere, as-built |
| **RSVTI** | Utilaje ISCIR (macara) |
| **Magazioner** | Recepție/eliberare materiale, evidență, protecția modulelor |
| **Șef pază** | Securitatea amplasamentului (furt module) |

---

## 18. Concluzii

Prezentul DTOE stabilește, **parametric în raport cu puterea instalată**, organizarea execuției unui parc fotovoltaic: incinta și dotările (scalate cu efectivul), tehnologia de montaj specifică (batere piloți → mese → module → cablare DC/AC → invertoare/PT → racord → PIF), graficul de eșalonare cu paralelizare pe sectoare, măsurile SSM (cu accent pe **riscul electric permanent al modulelor** și pe **manevrele MT**), PSI, gestiunea deșeurilor (dominant **ambalaje de module**), măsurile de mediu (**perioadă de cuibărit, praf, zgomot de la baterea piloților, protecția solului**), notificările obligatorii (ITM, ISU, OD/ANRE) și recepția organizării împreună cu PIF-ul. Toate valorile numerice sunt exprimate prin **relații de scalare** și ilustrate pe cazul de referință de **5 MWp**, rămânând valabile pentru întreaga gamă **0,5 ÷ 50 MWp**, prin caracterul liniar-repetitiv și modular al lucrărilor. Documentul se corelează cu memoriile tehnice de specialitate (structură, instalații), cu scenariul de securitate la incendiu și cu cartea tehnică a construcției, fără a duplica conținutul acestora.
