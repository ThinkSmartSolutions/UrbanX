## PTh-A.0 OBIECTUL SUPLIMENTULUI DE FAZĂ PTh ȘI GEOMETRIA ADOPTATĂ

Prezentul supliment de fază PTh dezvoltă la nivel de execuție componenta de arhitectură a fermei agrozootehnice descrise în faza DTAC (`general.md`, `arhitectura.md`, `structura.md`, `instalatii.md`), cu detalii cotate la scările 1:5, 1:10 și 1:20, tehnologia de execuție, planul de control al calității cu punctele de verificare pe lucrări ascunse (PVLA), toleranțele de execuție și fișele tehnice de materiale. Numerotarea detaliilor (D01…D16) corespunde plotelor din piesele desenate PTh-A (planșa de detalii de anvelopantă și noduri constructive PTh-A.11/A.12/A.13).

**Geometria adoptată pentru detaliere.** Faza DTAC a tratat ferma printr-un set de memorii de specialitate care, fiecare, folosește un exemplu de calcul reprezentativ propriu (broiler 20.000 capete + siloz 1.500 t în `general.md`, bovine de lapte 300 capete pe hală B30×L102 m în `arhitectura.md`, trei corpuri independente cu hală generică L=21,00 m în `structura.md`, porci 2.000 capete pentru ventilare/electric în `instalatii.md`) — o practică explicit asumată în fiecare memoriu ("valorile numerice sunt un exemplu de calcul reprezentativ... se recalculează pentru fiecare proiect concret"). Faza PTh, care lucrează la nivel de detaliu de execuție cotat, are nevoie de o geometrie unică, coerentă, pe care se ancorează toate cotele. Se adoptă, ca obiect unic de detaliere al prezentului supliment, **configurația structurală complet verificată în `structura.md`** — cea cu date geometrice și breviar de calcul integral, self-consistente — și se mapează peste ea programul funcțional și de biosecuritate din `arhitectura.md`:

| Corp | Funcțiune | Geometrie adoptată (din `structura.md`, verificată integral) | Corespondent funcțional (`arhitectura.md`) |
|---|---|---|---|
| **Corpul A** | Hală adăpost bovine, stabulație liberă cu cușete | cadre metalice transversale, deschidere L = 21,00 m, travee e = 5,50 m, **18 travei** → L_hală ≈ 99,00 m (rotunjit constructiv 100,00 m), Hs (streașină) = 5,00 m, coamă +8,50 m cu luminator continuu | corespunde obiectului **C1** din arhitectura DTAC |
| **Corpul B** | Siloz vertical metalic cereale/furaj concentrat | Ø d_c = 8,00 m, H perete h_c = 15,00 m, zveltețe h_c/d_c = 1,88, capacitate 750–1.000 t | variantă menționată explicit în `arhitectura.md` §7.1 ca alternativă/completare la silozul orizontal (fânar), integrată în obiectul **C4** |
| **Corpul C** | Bazin de dejecții — cuvă etanșă | 12,00 × 8,00 × 3,00 m, V ≈ 288 mc — **celulă/modul de bază**, multiplicabilă la volumul real rezultat din V_bazin = N·q_d·Z·k_s | corespunde obiectului **C7** |

Pentru o fermă la capacitatea de 300 de capete tratată exemplificativ în `arhitectura.md`, Corpul A se **multiplică modular**: două hale paralele identice de 21,00 m deschidere (echivalente, ca suprafață utilă totală, configurației unice de 30,00 m/4 rânduri de cușete descrisă acolo), fiecare cu propriul sistem structural independent, propriile cușete (geometrie identică 2,50×1,25 m), propria pereche de alei de circulație și o alee centrală de furajare de 4,00 m; iar Corpul C se dimensionează la volumul rezultat din calculul de la `general.md` §11.2/`instalatii.md` §3.4 (2.160–2.700 mc, funcție de specie și efectiv) prin **multiplicarea celulei de 288 mc** detaliate integral la structură — principiul de execuție (cofrare, armare, etanșare, waterstop) este identic indiferent de numărul de celule adoptat pe amplasamentul real. Această convenție de scalare modulară este explicitată o singură dată aici și se aplică identic în `structura-pth.md` și `instalatii-pth.md`.

Spre deosebire de o hală industrială curentă, arhitectura fermei are o anvelopă **semideschisă** (cortine rulabile pe ambele fațade longitudinale, nu panouri sandwich opace continue), o pardoseală de alei cu **canale de colectare a dejecțiilor integrate**, un **filtru sanitar-veterinar** cu funcție de barieră fizică obligatorie (element fără echivalent la o construcție industrială) și un siloz metalic cu regim de risc propriu (explozie de praf, ATEX). Detaliile de mai jos tratează prioritar aceste puncte specifice tipologiei agrozootehnice.

**Cadru normativ de referință pentru detaliere:**
- Legea 10/1995, HG 907/2016, HG 273/1994 (recepția lucrărilor);
- SR EN 14509 (panouri sandwich autoportante), SR EN 1090-1/1090-2 (execuția structurilor de oțel);
- SR EN ISO 12944 (protecție anticorozivă prin vopsire), SR EN ISO 1461 (zincare termică);
- SR EN 13501-1/-2, SR EN 1993-1-2 (comportare la foc structuri metalice), P118-1/2/3;
- NP 040-2002, GP 118 (hidroizolații), SR EN 1992-3 (structuri de beton pentru reținerea lichidelor/materialelor granulare — cuva de dejecții și celulele de beton ale silozului);
- SR EN 14351-1, SR EN 1279 (tâmplărie/vitraj), SR EN 1125/SR EN 179 (dispozitive de evacuare);
- NP 051-2012, Legea 448/2006 (accesibilitate);
- SR EN 13670/NE 012-2/2010 (execuția structurilor din beton);
- Ordinul ANSVSA 75/2005, normele ANSVSA de biosecuritate și autorizare sanitar-veterinară pe specii — sursa normativă a cerințelor de detaliu ale filtrului sanitar-veterinar și ale dezinfectorului rutier, fără echivalent la o clădire civilă/industrială.

### PTh-A.0.1 Principii generale de detaliere specifice anvelopei agrozootehnice

Cele trei principii de detaliere ale unei anvelope metalice curente (continuitate termică prin profile de racord, etanșare prin membrane/benzi la interfețe produs-produs, regim de foc al racordurilor identic cu regimul panoului adiacent) rămân valabile integral și se regăsesc aplicate punctual în detaliile D01–D05. Li se adaugă însă patru principii suplimentare, specifice exclusiv unei construcții zootehnice, care guvernează detaliile D06–D16:

1. **Orice punct de trecere între zona curată și zona murdară a fluxului de biosecuritate (v. `arhitectura.md` §5) trebuie să fie o barieră fizică reală, nu simbolică** — detaliul filtrului sanitar-veterinar (D06) tratează explicit geometria "gâtului de sticlă" al dușului obligatoriu, fără posibilitate constructivă de ocolire.
2. **Orice suprafață în contact cu dejecțiile animaliere sau cu apa de spălare este integral etanșă, fără excepție și fără compromis pe motive de cost** — pardoseala de alei (D08), hidroizolația acesteia (D09) și cuva bazinului de dejecții (D14-D15) tratează etanșeitatea ca cerință de mediu, nu doar de exploatare, verificabilă și controlabilă la recepție (PVLA dedicat, v. PTh-A.5.3).
3. **Elementele cu rol de siguranță pasivă la evenimente cu risc de mortalitate în masă a efectivului (cortine fail-safe, v. D04) trebuie să funcționeze fără nicio sursă de energie**, exclusiv prin greutate proprie/arcuri — detaliul mecanismului se verifică funcțional la recepție prin simulare, nu doar prin control vizual al montajului.
4. **Zona silozului (Corpul B) este tratată ca zonă cu atmosferă potențial explozivă (ATEX)** — orice detaliu de arhitectură din această zonă (D12, D13) integrează cerințele de zonare ATEX stabilite de proiectul de instalații (`instalatii-pth.md` §PTh-I.2), fără a le trata separat sau simplificat.

---

## PTh-A.1 DETALII DE EXECUȚIE

### D01 — Nod bază perete Corp A: panou sandwich–soclu de protecție la impact, întrerupere punte termică (sc. 1:5)

Spre deosebire de o hală industrială curentă (unde soclul de protecție are 20–30 cm și rol exclusiv de protecție la stropire), la hala zootehnică soclul are o **înălțime majorată la 1,00–1,20 m**, dimensionată explicit pentru a proteja baza panoului de impactul mecanic repetat al animalelor (frecare, împingere, lovire cu capul/coarnele) și de contactul cu utilajele de curățare/furajare care circulă pe aleile adiacente pereților.

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Grindă de soclu (b.a.) | Element de fundație de legătură, reazem inferior | secțiune 40×60 cm, C25/30 (XC2), cotă superioară nivelată ±5 mm |
| Soclu de protecție la impact | Perete din beton armat, plin, fără goluri, peste grinda de soclu | h = 1,00–1,20 m peste pardoseala aleii, C25/30, muchie superioară rotunjită r ≥ 2 cm |
| Profil de închidere superior soclu | Profil U/omega din tablă zincată, fixat mecanic pe soclu, reazem pentru panoul sandwich | tablă Z275, grosime ≥ 1,5 mm, prindere la interax ≤ 60 cm |
| Bandă de întrerupere termică | Bandă comprimabilă între profil și beton | EPDM/PVC celulară, grosime 8–10 mm |
| Panou sandwich (deasupra soclului) | Reazemă pe profil, ancorat cu șuruburi autoforante | miez PIR/vată bazaltică, 100–120 mm |
| Etanșare bază panou | Cordon de mastic elastic poliuretanic + șorț de racord | rezistent UV, elasticitate ≥ 25% |
| Finisaj interior soclu | Rășină epoxidică/beton lăsat aparent tratat hidrofug, lavabil, rezistent la spălare cu presiune | v. PTh-A.3.1 |
| Racord la canalul de colectare dejecții | Soclul se oprește la cota pardoselii aleii, fără prag care ar bloca scurgerea spre canal | continuitate de pantă, v. D08 |

Cerințe de execuție: soclul se toarnă monolit cu grinda de soclu, cu armătură continuă (nu doar mustăți) dat fiind rolul de element de rezistență la impact, nu doar de protecție la stropire; muchia superioară se rotunjește pentru a elimina un colț viu care ar putea produce leziuni la contactul cu animalul. Nu se admite niciun gol/fisură la interfața soclu-pardoseală care ar permite infiltrarea lichidului de spălare/dejecții sub soclu — verificare obligatorie înainte de montajul panoului (lucrare devine practic inaccesibilă ulterior).

### D02 — Nod colț de fațadă Corp A: profil de colț, continuitate izolație (sc. 1:5)

| Element | Descriere | Specificație |
|---|---|---|
| Profil de colț exterior | Piesă prefabricată, vopsită în ton cu panoul | dezvoltare ≥ 300 mm/latură, prindere ascunsă |
| Umplutură rost colț | Vată minerală/spumă poliuretanică comprimată pe toată înălțimea | continuitate fără gol de aer |
| Etanșare colț | Bandă de etanșare sub profilul de colț | bandă precomprimată/mastic |
| Soclu de colț | Continuitate a soclului de protecție D01 pe ambele laturi ale colțului | fără întrerupere la 1,00–1,20 m |

Cerință de execuție: colțul soclului de protecție se toarnă continuu (fără rost de execuție chiar la colț), întrucât colțul unei hale zootehnice este punctul unde animalele tind să se frece preferențial (comportament etologic documentat) și, prin urmare, punctul cel mai solicitat mecanic al perimetrului.

### D03 — Nod coamă: luminator continuu de ventilare (ridge vent) cu tiraj termic (sc. 1:10)

Detaliul rezolvă coama halei semideschise, unde luminatorul continuu nu este doar un element de iluminat natural (ca la o hală industrială), ci **mecanismul principal de evacuare a aerului viciat prin tiraj termic**, componentă activă a sistemului de ventilare naturală descris în `arhitectura.md` §8.1.

| Element | Descriere execuție | Specificație |
|---|---|---|
| Profil de coamă | Element metalic dublu, cu deschidere continuă centrală | tablă profilată, dezvoltare ≥ 500 mm, deschidere reglabilă |
| Fantă de evacuare | Secțiune liberă continuă pe toată lungimea (100,00 m), dimensionată la debitul de tiraj termic de calcul | lățime funcție de breviarul de ventilare (`instalatii-pth.md` §PTh-I.3) |
| Deflector/capișon anti-ploaie | Protejează fanta de pătrunderea directă a apei, fără a bloca fluxul ascendent de aer | tablă profilată, montaj cu joc calculat |
| Plasă de protecție | Împiedică pătrunderea păsărilor sălbatice/rozătoarelor prin fanta de coamă — măsură de biosecuritate | ochi ≤ 20 mm, oțel inoxidabil/zincat, rezistentă la ciupire de către păsări |
| Umplutură de profil (foam filler) | Etanșarea îmbinării panou-profil de coamă, la fel ca la o hală industrială | spumă profilată, montaj continuu |
| Bandă de etanșare coamă | Sub profilul de coamă | bandă precomprimată butilică |

Cerință de execuție specifică: spre deosebire de o hală industrială, unde luminatorul de coamă este dimensionat exclusiv la aportul de lumină naturală, la hala zootehnică **secțiunea liberă a fantei de coamă este o mărime de calcul tehnologic**, stabilită de proiectul de instalații (debitul de aer evacuat prin tiraj termic la regimul minim de iarnă, corelat cu deschiderea cortinelor D04) — orice modificare a secțiunii libere față de proiect (de exemplu, o plasă de protecție cu ochiuri prea dese, care ar reduce artificial secțiunea utilă) trebuie avizată de proiectantul de instalații înainte de execuție. Continuitatea plasei de protecție pe toată lungimea coamei se verifică vizual la recepție ca măsură de biosecuritate (v. PTh-A.5.4).

### D04 — Cortină rulabilă laterală: mecanism, ghidaje, dispozitiv fail-safe de deschidere gravitațională (sc. 1:10 / 1:20)

Detaliul cortinei rulabile — element de anvelopă fără echivalent la o hală industrială, prezent pe toată lungimea celor două fațade longitudinale ale Corpului A, cu rol simultan de închidere termică variabilă și de componentă a lanțului de siguranță critică descris în `instalatii.md` §5.3.

| Element | Descriere execuție | Specificație |
|---|---|---|
| Pânză de cortină | Material flexibil, rezistent la UV/intemperii, opac sau translucid | PVC armat, grosime ≥ 0,5 mm, rezistență la rupere conform fișă produs |
| Șine ghidaj verticale | Fixate pe stâlpii cadrului/pe rigla de perete, pe toată înălțimea zonei de ventilare | profil metalic zincat, ancorat la interax conform traveei (5,50 m) |
| Arbore de înfășurare | Orizontal, la partea superioară a zonei de cortină, acționat prin motoreductor sau manivelă | tub metalic, diametru dimensionat la lungimea de cortină per travee |
| Motoreductor de acționare | Cu limitatoare de cursă (poziție complet închisă/complet deschisă) | protecție IP54 minim, alimentare din tabloul general (`instalatii-pth.md` §PTh-I.2) |
| **Contragreutate/arc de eliberare (dispozitiv fail-safe)** | Sistem mecanic independent de sursa electrică, care deschide cortina automat prin cădere liberă/tensiune de arc la pierderea comenzii electrice a motorului | contragreutăți calibrate la greutatea proprie a cortinei + frecarea reziduală a ghidajelor; verificare funcțională obligatorie, v. PTh-A.5.4 |
| Bandă de etanșare la cortina închisă | Pe conturul zonei de cortină, reduce infiltrațiile de aer la poziția complet închisă (regim de iarnă) | bandă comprimabilă, montată pe rama fixă |
| Senzor de poziție | Confirmă starea reală (deschis/închis/intermediar) către computerul de climat | conectat la sistemul de automatizare, v. `instalatii-pth.md` §PTh-I.2.9 |

Cerință de execuție critică: dispozitivul fail-safe de deschidere gravitațională **nu se validează prin control vizual al montajului**, ci exclusiv printr-o **probă funcțională** — simularea unei căderi de tensiune controlate, cu cronometrarea timpului real de deschidere completă a cortinei și verificarea absenței oricărui blocaj mecanic (frecare excesivă în ghidaj, coroziune, contragreutate ne-liberă) — probă care se repetă pentru fiecare travee de cortină în parte, nu doar prin eșantionare, dat fiind rolul acestui element în scenariul de siguranță critică descris la `instalatii.md` §5.2. Rezultatul probei se consemnează în PVLA dedicat (PTh-A.5.3) și se reia periodic în exploatare (v. `instalatii.md` §10.3).

### D05 — Poartă/ușă mare de evacuare/circulație animale: prag fără treaptă, deschidere spre padoc (sc. 1:10)

Golul mare (3,00–4,00 m) prevăzut pe ambele laturi longitudinale ale halei, dimensionat pentru evacuarea rapidă a efectivului conform `arhitectura.md` §9.3, dar și pentru circulația zilnică spre padocurile exterioare.

| Element | Descriere execuție | Specificație |
|---|---|---|
| Cadru/rama porții | Profil metalic, dimensionat pe deschiderea golului | integrat în subcadrul de întărire al panoului adiacent |
| Foaie de poartă | Culisantă/batantă, panou izolat sau plasă metalică (funcție de sezon/climă) | fără prag saliente, deschidere liberă rapidă |
| Prag | La cota pardoselii aleii, fără treaptă perceptibilă, cu pantă continuă spre padoc | beton armat, continuitate de nivel cu pardoseala aleii și cu platforma padocului |
| Mecanism de deschidere rapidă | Manual (zăvor simplu, acționabil de o singură persoană) sau motorizat, cu comandă de urgență accesibilă | fără blocare la panică — mecanism care nu necesită unelte |
| Racord la gardul padocului | Fără decalaj/gol lateral prin care animalul s-ar putea bloca | continuitate fizică |

Cerință de execuție: pragul se toarnă cu continuitate perfectă de nivel între pardoseala interioară a aleii de circulație și platforma padocului exterior — orice treaptă, chiar de câțiva centimetri, poate produce ezitare/blocaj al efectivului la o evacuare de urgență (comportament de turmă documentat: animalele refuză frecvent să treacă peste un prag vizibil discontinuu). Mecanismul de deschidere se verifică funcțional la o singură manevră, fără unelte și fără cunoștințe tehnice prealabile, condiție impusă de scenariul de evacuare descris în `arhitectura.md` §9.3.

### D06 — Filtrul sanitar-veterinar: geometria "gâtului de sticlă" — vestiar murdar → duș-barieră → vestiar curat (sc. 1:20, plan + secțiune)

Detaliul cel mai important din perspectiva biosecurității al întregului ansamblu, tratat aici la nivel de execuție a compartimentării fizice, dincolo de descrierea funcțională din `arhitectura.md` §5.2.

| Element | Descriere execuție | Specificație |
|---|---|---|
| Compartimentare vestiar murdar/duș/vestiar curat | Trei încăperi în serie, comunicând EXCLUSIV prin ușile dușului — fără culoar de ocolire, fără fereastră de trecere, fără gol tehnic care ar permite trecerea unei persoane fără duș | pereți despărțitori din zidărie/gips-carton hidrofug pe structură metalică, h = plafon la plafon (fără gol deasupra plafonului fals care ar permite trecerea) |
| Ușa dinspre zona murdară | Se deschide exclusiv spre duș, cu buton de eliberare/zăvor care împiedică deschiderea simultană a ambelor uși ale cabinei de duș (interblocare mecanică sau electrică) | conform principiului "gâtului de sticlă" — fizic imposibil de traversat fără duș |
| Ușa dinspre duș spre zona curată | Idem, interblocată cu ușa dinspre zona murdară | — |
| Cabina de duș | Compartiment intermediar, complet etanș, cu pardoseală proprie cu pantă spre sifon | v. D07 pentru pardoseală/hidroizolație |
| Dulapuri dublu-compartimentate | În vestiarul murdar: un compartiment pentru haine de stradă, separat fizic (cu perete despărțitor intern) de compartimentul pentru echipamentul de fermă, ambele închise cu cheie/cod propriu | oțel/laminat lavabil, ventilat |
| Grup sanitar propriu filtrului | În zona curată, evită ieșirea personalului din zona curată pentru necesități fiziologice | v. PTh-A.3.4 |
| Pediluviu la accesele secundare din zona curată | Bazin cu soluție dezinfectantă, la fiecare ușă secundară dinspre zona curată spre hală/maternitate | dimensiuni minime pentru trecerea completă a tălpii cizmei |

Cerință de execuție critică — verificare de compartimentare, nu doar de finisaj: la recepția fazei de compartimentare (înainte de finisaje, v. PTh-A.5.3), se verifică explicit **absența oricărui traseu alternativ** între zona murdară și zona curată — inclusiv prin plafonul fals (continuitate a peretelui despărțitor până la placa structurală, nu doar până la plafonul suspendat), prin planșeul tehnic (eventuale goluri de trecere a instalațiilor, care se etanșează conform D09) și prin ferestrele interioare (dacă există, se elimină sau se fixează definitiv, fără posibilitate de deschidere). Această verificare este mai importantă, din perspectiva scopului funcțional al construcției, decât orice verificare de finisaj — un filtru sanitar-veterinar finisat impecabil, dar cu o breșă fizică de ocolire nedescoperită la recepție, anulează practic investiția în biosecuritate a întregii ferme.

### D07 — Cușeta de odihnă: geometrie de mobilier arhitectural — bare de delimitare, bară de grumaz, prag de reținere (sc. 1:10, plan + secțiune transversală)

Detaliul mobilierului interior descris funcțional în `arhitectura.md` §2.1bis, tratat aici la nivel de prindere și cotare de execuție.

| Element | Descriere execuție | Specificație |
|---|---|---|
| Platformă înălțată a cușetei | Diferență de nivel de 8–12 cm față de aleea de circulație adiacentă | beton, pantă ușoară spre marginea dinspre alee, așternut deasupra |
| Bare de delimitare laterală (cushion loop) | Curbate, montate pe console reglabile pe verticală/orizontală | oțel galvanizat, Ø 40–50 mm, prindere pe console cu găuri de reglaj la interval de câțiva cm |
| Bară de grumaz (neck rail) | Orizontală, poziționată la înălțime și distanță calibrate față de marginea platformei | reglabilă, aceeași secțiune ca barele laterale |
| Prag de reținere așternut (brisket board) | La limita opusă aleii, menține așternutul concentrat, fără muchie vie | lemn tratat/beton profilat, muchie rotunjită |
| Consolă de prindere | Ancorată în platforma de beton sau în structura auxiliară a rândului de cușete | găuri de reglaj la interval ≤ 5 cm pe înălțime și adâncime |
| Cotă geometrie cușetă | 2,50 × 1,25 m (adâncime × lățime), conform normă bunăstare `arhitectura.md` §4.1 | — |

Cerință de execuție: consolele de prindere a barelor se montează cu **rezervă de reglaj** pe toate cele trei direcții (înălțime bară de grumaz, distanță bară de grumaz față de marginea platformei, lățime între barele laterale) — geometria finală a cușetei se ajustează în primele luni de exploatare pe baza observării comportamentului real al turmei, o practică zootehnică uzuală menționată explicit în `arhitectura.md` §2.1bis; execuția rigidă, fără posibilitate de reglaj ulterior, ar bloca această optimizare.

### D08 — Pardoseală alei: canal de colectare a dejecțiilor — secțiune, pantă, grătar de protecție (sc. 1:10)

| Element | Descriere execuție | Specificație |
|---|---|---|
| Placă de pardoseală alei | Beton armat, clasă de expunere XA (rezistență chimică moderată la acizi organici din dejecții) | C25/30 XA1, suprafață striată/canelată antiderapantă |
| Canal de colectare | În ax sau la marginea aleii, secțiune dimensionată la debitul de vârf (v. `structura.md`/`instalatii.md`) | pantă longitudinală 1–2%, fund cu pantă transversală spre linia de scurgere |
| Grătar de protecție peste canal | În zonele de trafic intens al utilajelor (remorcă mixer) | oțel galvanizat, portant la sarcina utilajului de furajare, demontabil pentru curățare |
| Pantă transversală aleii | Spre canalul de colectare | 1,5–2% |
| Racord la soclul de protecție D01 | Fără prag/discontinuitate | continuitate de pantă |

Cerință de execuție: panta longitudinală a canalului se verifică cu nivela înainte de turnare, pe toată lungimea (99,00 m) — o pantă insuficientă sau inversată local produce stagnare și colmatare (v. `arhitectura.md` §3.3bis), cu risc de eliberare bruscă de gaze acumulate anaerob la o eventuală curățare/agitare ulterioară. Grătarele de protecție se pozează cu joc minim față de cadrul de rezemare, pentru a evita zgomotul la trecerea repetată a utilajelor.

### D09 — Hidroizolația pardoselii de alei: membrană HDPE, rosturi hidroexpandabile (sc. 1:10)

Detaliul de execuție al cerinței de etanșeitate absolută descrisă în `arhitectura.md` §6.4 — "niciun purin nu trebuie să ajungă în sol, cerință care nu admite compromisuri".

| Element | Descriere execuție | Specificație |
|---|---|---|
| Strat suport | Beton de egalizare/umplutură compactată | conform proiect de rezistență |
| Membrană HDPE | Continuă, sudată termic la îmbinări, ridicată la marginile plăcii | grosime ≥ 1,5 mm, control vizual + testare sudurilor (v. PTh-A.5.3) |
| Placă de beton hidrofug | Deasupra membranei, cu armătură conform proiect de rezistență | C25/30 hidrofug (clasă expunere XA) |
| Rost hidroexpandabil | La toate rosturile de turnare/lucru, bandă care se dilată la contactul cu umiditatea, sigilând rostul | bandă bentonitică/PVC cu miez hidroexpandabil |
| Verificare de etanșeitate | Test de etanșeitate pe zone/panouri de turnare, înainte de acoperire cu așternut/echipamente | conform metodologie proiectant (probă de inundare parțială sau control vizual pe zone-martor) |

Cerință de execuție critică: membrana HDPE și rosturile hidroexpandabile constituie o **lucrare ascunsă cu PVLA obligatoriu** (v. PTh-A.5.3), verificată integral (nu prin eșantionare) pe toată suprafața pardoselii de alei și, cu aceeași rigoare, la interfața cu soclurile de protecție D01 și cu canalele de colectare D08, unde riscul de discontinuitate a membranei este maxim (schimbări de plan, penetrări). Orice reparație a membranei constatată cu defecte se documentează cu fotografie și se re-verifică înainte de acoperire.

### D10 — Adăpătoare: poziționare, pardoseală proprie cu pantă de captare (sc. 1:10)

| Element | Descriere execuție | Specificație |
|---|---|---|
| Poziționare | La intersecția aleilor de circulație cu cele de furajare, nu deasupra canalului de colectare, nu în capăt de alee fără ieșire | conform `arhitectura.md` §6.5 |
| Cuvă adăpătoare | Nivel constant, supapă cu plutitor | oțel inoxidabil/beton finisat |
| Pardoseală proprie | Ușor supraînălțată, cu pantă proprie spre canalul de colectare cel mai apropiat | beton, captează stropii de la adăpare |
| Racord hidraulic | Conform breviarului de calcul al instalației sanitare (`instalatii-pth.md` §PTh-I.3.2) | conductă cu protecție antiîngheț pe traseele expuse |

### D11 — Nod bază Corpul B (siloz metalic): fundație inelară, ancoraj, întrerupere punte termică/galvanică (sc. 1:10)

| Element | Descriere execuție | Specificație |
|---|---|---|
| Fundație inelară | Radier circular armat conform `structura-pth.md` §PTh-R.3/§PTh-R.12 | beton C30/37, clasă expunere XC2(+XA1) |
| Buloane de ancoraj | Poziționate prin șablon de montaj înainte de turnare | oțel/inox A2-70 la zona cea mai expusă (v. `structura.md` §6.1) |
| Profil de bază a mantalei | Prima virolă, prinsă de inelul de ancoraj | conform breviar `structura-pth.md` §PTh-R.4 |
| Bandă de întrerupere galvanică | Între tabla zincată a mantalei și elementele de ancoraj din oțel inoxidabil, dacă e cazul | evită cuplul galvanic direct |
| Racord la platforma de acces tehnologic | Continuitate de nivel spre drumul tehnologic de deservire | v. §7.1 `arhitectura.md` |

### D12 — Pasarelă de vizitare/scară de acces siloz + gură de vizitare superioară (sc. 1:10 / 1:20)

| Element | Descriere execuție | Specificație |
|---|---|---|
| Pasarelă perimetrală | La partea superioară a virolelor, montată pe console fixate de manta | grătar metalic antiderapant, balustradă h ≥ 1,10 m |
| Scară de acces | Verticală cu colier de siguranță sau înclinată cu podeste intermediare | conform normelor de securitate a muncii; v. și `structura-pth.md` §PTh-R.13 |
| Gura de vizitare superioară | Capac practicabil pe acoperișul conic, cu balustradă de protecție perimetrală și sistem de blocare | previne căderea accidentală în interiorul silozului — risc de asfixiere în material granular |
| Racord la instalația de aspirație/desprăfuire | Punct de racord al echipamentelor ATEX de la accesul superior | coordonat cu `instalatii-pth.md` §PTh-I.2 |

Cerință de execuție: capacul gurii de vizitare se prevede cu blocare mecanică în poziție deschisă (nu se poate închide accidental cu personal în zonă) și cu semnalizare vizibilă a riscului de asfixiere — element de siguranță a muncii cu prioritate egală cu orice element structural, dat fiind riscul documentat la nivel internațional al accidentelor prin înec în material granular.

### D13 — Panouri de decompresie la explozie de praf (venting) — montaj pe manta siloz (sc. 1:10)

Detaliul de arhitectură al măsurii antiexplozie descrise funcțional în `general.md` §7.5 și `instalatii.md` §7.5bis/7.6, coordonat obligatoriu cu proiectul de instalații (zonarea ATEX).

| Element | Descriere execuție | Specificație |
|---|---|---|
| Panou de decompresie | Element care cedează controlat la o suprapresiune incipientă, mult sub presiunea de rupere a mantalei | conform calcul specialist ATEX, suprafață și poziție stabilite de proiectul de instalații |
| Zonă de direcționare | Spațiu liber în fața panoului, fără personal/circulație, orientat spre o direcție sigură (nu spre drumul de acces sau spre alte corpuri) | conform plan de situație — coordonare arhitectură-instalații obligatorie |
| Semnalizare | Marcaj de avertizare pe manta, în dreptul fiecărui panou | conform normelor ATEX |
| Etanșare perimetrală panou | Fără a compromite funcția de cedare controlată la suprapresiune | conform fișă tehnică produs |

Cerință de execuție: poziția și numărul panourilor de decompresie **nu se pot stabili de proiectantul de arhitectură independent** — acestea rezultă din calculul specific ATEX al proiectului de instalații (`instalatii-pth.md` §PTh-I.2), iar rolul detaliului de arhitectură este exclusiv de a asigura, în plan de situație, zona liberă de direcționare a suprapresiunii și integrarea vizuală/constructivă a panourilor în manta, fără a interfera cu inelele de rigidizare structurală (v. `structura-pth.md` §PTh-R.4).

### D14 — Bazin de dejecții (Corpul C): platformă tehnică de acces, balustradă, semnalizare pericol gaze (sc. 1:10)

| Element | Descriere execuție | Specificație |
|---|---|---|
| Platformă tehnică perimetrală | La cota superioară a cuvei, pentru acces la operațiile de mixare/golire/întreținere | grătar metalic antiderapant, dimensionată la sarcina echipamentului de mixare |
| Balustradă de protecție | Pe toate laturile accesibile ale platformei | h ≥ 1,10 m, conform NP 051-2012, analog D13 din `hala-industriala/arhitectura-pth.md` |
| Capace de acces | Practicabile, cu blocare în poziție deschisă | evită căderea accidentală, similar D12 |
| Semnalizare pericol gaze toxice | Marcaj obligatoriu la fiecare punct de acces la cuvă | interzicerea aplecării fără echipament de detecție a gazelor, conform `arhitectura.md` §7.3 |
| Racord la instalația de mixare/pompare | Coordonat cu `instalatii-pth.md` §PTh-I.2 | — |

### D15 — Waterstop la rosturile cuvei bazinului de dejecții (sc. 1:5)

Detaliul de execuție al cerinței de etanșeitate strictă (clasa de etanșeitate 1, w ≤ 0,2 mm, SR EN 1992-3) stabilită la `structura.md` §4.5.

| Element | Descriere execuție | Specificație |
|---|---|---|
| Waterstop la rosturi de turnare | Bandă continuă, poziționată la mijlocul grosimii peretelui/radierului, pe toată lungimea rostului | PVC/bentonitică, lățime conform calcul presiune hidrostatică de calcul |
| Fixare waterstop | Ancorată de armătură pe ambele fețe ale rostului, fără deplasare la turnare | clemă/legături dedicate, verificate înainte de turnarea celei de-a doua etape |
| Continuitate la colțuri | Piese prefabricate de colț/T, sudate/lipite la continuarea benzii | fără întrerupere la schimbări de direcție |
| Protecție suplimentară internă | Acolo unde analiza de durabilitate o recomandă | hidroizolație/protecție epoxidică pe fața interioară a cuvei, v. `structura.md` §4.5 |

Cerință de execuție: poziționarea și fixarea waterstop-ului la fiecare rost este **lucrare ascunsă cu PVLA obligatoriu**, verificată vizual imediat înaintea turnării etapei următoare (deplasarea benzii în timpul turnării, prin lovire cu vibratorul sau prin presiunea betonului proaspăt, anulează practic funcția de etanșare fără ca defectul să fie vizibil ulterior din exterior).

### D16bis — Maternitate: boxe individuale, pereți despărțitori, pardoseală cu așternut gros (sc. 1:20)

Detaliul obiectului funcțional descris în `arhitectura.md` §4.4 — șir de 8–10 boxe individuale, integrat funcțional în Corpul A pe o travee dedicată sau într-o extensie a acestuia, cu regim propriu de exploatare all-in/all-out.

| Element | Descriere execuție | Specificație |
|---|---|---|
| Pereți despărțitori boxă | Solizi, h = 1,20–1,40 m, permit contact vizual parțial între boxe vecine | panou metalic/beton prefabricat, muchii rotunjite |
| Pardoseală boxă | Fără platformă de cușetă — suprafață plină cu așternut gros de paie | beton, pantă ușoară spre canalul de colectare al traveei |
| Acces individual | Dinspre aleea de serviciu a maternității, poartă proprie per boxă | ≥ 1,20 m, fără prag |
| Suprafață minimă boxă | 10–12 mp/boxă | conform normă `arhitectura.md` §4.4 |
| Racord la circuitul de evacuare a dejecțiilor | Separat de circuitul curent al cușetelor, dat fiind regimul all-in/all-out cu golire completă | v. D08 |

Cerință de execuție: fiecare boxă se dimensionează și se dotează pentru a permite golirea, curățarea și dezinfecția completă independent de boxele vecine (fără elemente comune care ar împiedica izolarea unei boxe individuale în cazul unui eveniment sanitar), condiție impusă direct de principiul all-in/all-out descris în `arhitectura.md` §4.4.

### D16ter — Zona de tineret: hutch-uri individuale/boxe de grup — acces și circuit propriu (sc. 1:20)

| Element | Descriere execuție | Specificație |
|---|---|---|
| Hutch individual (viței până la 8 săptămâni) | Structură mobilă, cu padoc mic atașat, amplasată pe platformă drenată | material plastic rezistent UV, acces facil pentru curățare între cicluri |
| Boxă de grup (după înțărcare) | 5–8 capete/boxă, regim de populare pe grupe de vârstă | pereți despărțitori h ≥ 1,00 m |
| Circuit propriu de acces | Distinct de circuitul turmei adulte, conform `arhitectura.md` §4.5 | traseu marcat pe planul de situație, fără intersectare cu fluxul curat al adulților |

Cerință de execuție: platforma de amplasare a hutch-urilor individuale se execută cu pantă de drenaj propriu și cu suprafață ușor de dezinfectat între cicluri — vulnerabilitatea imunitară ridicată a vițeilor nou-născuți impune un standard de igienizare a suportului cel puțin la fel de riguros ca la zona de cușete a turmei adulte.

### D16quater — Padoc exterior: gard, pardoseală compactată/placă locală, adăpătoare la umbră (sc. 1:20)

| Element | Descriere execuție | Specificație |
|---|---|---|
| Gard delimitare | Bare metalice orizontale, h ≥ 1,20 m | ancorat în stâlpi metalici/beton, la interax conform proiect |
| Pardoseală | Pământ stabilizat pe suprafața generală; placă de beton pe traseele de acces intens folosite | pantă de scurgere spre exteriorul incintei productive, niciodată spre bazinul de dejecții |
| Adăpătoare padoc | Amplasată la umbră, cu propriul racord hidraulic | v. D10, protecție antiîngheț pe traseu exterior |
| Racord la porțile mari P1 | Continuitate de nivel, fără treaptă | v. D05 |

### D16quinquies — Rampă de animale (Corp C8): culoar de îmbarcare cu pereți laterali, poziționare la limita incintei (sc. 1:10)

| Element | Descriere execuție | Specificație |
|---|---|---|
| Culoar de îmbarcare | Pereți laterali plini, h ≥ 1,20 m, lățime dimensionată pe specie (evită întoarcerea animalului) | beton/metal, fără colțuri vii |
| Platformă de acostare | La cota podelei vehiculului de transport, cu rampă de racord la pantă redusă | beton armat, antiderapant |
| Poziționare | Strict la limita incintei — vehiculul extern nu pătrunde în zona curată | conform `arhitectura.md` §7.5 |
| Zonă de depozitare temporară cadavre (adiacentă) | Spațiu izolat termic/refrigerat, acces exclusiv exterior pentru vehiculul de ecarisaț | fără nicio intersectare cu circuitele curate, conform `general.md` §11.9 |

Cerință de execuție: culoarul de îmbarcare se dimensionează astfel încât animalul să nu poată vedea și nici nu poată fi tentat să se întoarcă înspre incintă (pereți plini, nu grilaj transparent, pe ultima porțiune dinspre vehicul) — o soluție de reducere a stresului animal la încărcare, cu efect direct asupra siguranței manevrei (un animal panicat într-un culoar prea larg sau cu vizibilitate laterală este semnificativ mai greu de dirijat).

### D16sexies — Depozit furaje (Corp C5): buncăre în vrac, zonă paletizată, zonă separată așternut (sc. 1:10)

| Element | Descriere execuție | Specificație |
|---|---|---|
| Buncăre concentrate în vrac | Structură metalică/beton, cu gură de alimentare superioară și gură de extragere inferioară | conform gabarit utilaj de încărcare |
| Zonă paletizată (suplimente, aditivi) | Pardoseală portantă, ventilată | uscat, ferit de umezeală |
| Zonă separată depozitare așternut | Fizic distinctă de zona de furaje | ferită de umezeală — un așternut umed devine focar bacterian, v. `arhitectura.md` §7.4 |
| Ventilare naturală/mecanică | Cerință critică pentru conservarea calității nutriționale | evită mucegăirea și micotoxinele |

### D17 — Gardul de împrejmuire al incintei: continuitate, înălțime, barieră la fauna sălbatică (sc. 1:20)

| Element | Descriere execuție | Specificație |
|---|---|---|
| Gard perimetral | Continuu pe tot perimetrul incintei, fără breșe | h ≥ 1,80 m, conform `arhitectura.md` §3.4 |
| Fundație/soclu gard | Îngropat suficient pentru a împiedica subminarea de către rozătoare/mistreți | beton, adâncime conform studiu geotehnic local |
| Poartă unică | Singurul punct de discontinuitate a gardului | coordonat cu D16 (dezinfector rutier) |
| Perdea vegetală tampon | Plantată în interiorul/exteriorul gardului, pe direcția dinspre zona locuită și pe conturul zonei murdare | conform `arhitectura.md` §11.3/§9.3 din `general.md` |

Cerință de execuție: continuitatea gardului se verifică prin parcurgere integrală a perimetrului la recepție, cu verificarea explicită a absenței oricărei breșe (poartă secundară nefolosită dar nedemontată, gol sub gard la treceri de teren denivelat) — o singură breșă nedescoperită anulează, potențial, întreaga investiție în biosecuritate.

### D18 — Zonă administrativă/birou: acces separat de fluxul de producție (sc. 1:20)

| Element | Descriere execuție | Specificație |
|---|---|---|
| Acces birou | Direct din zona curată/de acces, fără traversarea zonei de producție | conform zonare `general.md` §6.8 |
| Compartimentare | Separată fizic de filtrul sanitar-veterinar, dar adiacentă | v. PTh-A.3.8 |

### D19 — Rost de dilatare a plăcii pardoselii de alei la trecerea prin porțile mari P1 (sc. 1:10)

| Element | Descriere execuție | Specificație |
|---|---|---|
| Rost de dilatare | La fiecare prag de poartă mare, decuplare de placa interioară și de platforma padocului | material compresibil pe toată grosimea plăcii |
| Continuitate hidroizolație | Membrana HDPE se întrerupe la rost cu bandă hidroexpandabilă dedicată | v. D09, D15 (principiu identic aplicat la rost de dilatare) |

### D20 — Detaliu acces persoane cu dizabilități la corpul administrativ (rampă, bare, semnalistică) (sc. 1:10)

| Element | Descriere execuție | Specificație |
|---|---|---|
| Rampă acces | Pantă ≤ 8%, cu palier de odihnă la fiecare 9–10 m | conform NP 051-2012 |
| Bare de sprijin | La grupul sanitar accesibil din zona administrativă | conform NP 051-2012, sarcină ≥ 100 kg |
| Semnalistică tactilă/vizuală | La accesul principal | conform NP 051-2012 |

### D16 — Dezinfector rutier la poarta unică de acces — bazin/rampă cu pulverizare, protecție la îngheț (sc. 1:20)

| Element | Descriere execuție | Specificație |
|---|---|---|
| Poziționare | La poarta unică de acces în incintă, traversare obligatorie pentru orice vehicul, fără posibilitate de ocolire | conform `arhitectura.md` §3.4, `general.md` §6.4 |
| Bazin cu soluție dezinfectantă (variantă) | Adâncime și lungime dimensionate pentru o rotație completă a roții | beton armat, etanș, cu golire/reîmprospătare controlată |
| Rampă cu pulverizare automată (variantă alternativă) | Senzor de prezență, pompă dedicată, duze pe conturul rampei | conform `instalatii-pth.md` §PTh-I.2 |
| Protecție la îngheț | Cablu electric de însoțire pe conductele de alimentare/golire | obligatoriu — o instalație înghețată echivalează cu absența barierei de biosecuritate |
| Evacuare soluție uzată | Colectare separată, NU în circuitul de dejecții, NU direct în emisar | conform `arhitectura.md`/`instalatii.md` §7bis |
| Cântar-pod bascul | Integrat imediat după dezinfector, pe același traseu obligatoriu | conform `arhitectura.md` §7.6 |

Cerință de execuție: poziția și dimensiunea dezinfectorului se coordonează astfel încât **niciun vehicul să nu poată accesa incinta printr-un traseu alternativ** (verificare de plan de situație, nu doar de execuție punctuală) — un acces secundar necontrolat (poartă de serviciu, breșă în împrejmuire) anulează funcția întregului dispozitiv, indiferent de calitatea execuției acestuia.

---

## PTh-A.2 TABLOU DE TÂMPLĂRIE ȘI DOTĂRI TEHNOLOGICE DETALIAT (nivel PTh)

Codificare: P = porți/uși mari hală, F = tâmplărie filtru sanitar-veterinar, S = tâmplărie siloz/depozit furaje, B = birou/sală mese, C = cortine (tâmplărie tehnologică de anvelopă).

### PTh-A.2.1 Porți și uși mari — Corp A

| Poz. | Denumire / amplasament | Dim. gol (l×h mm) | Sens deschidere | Prag | Dotare specifică | Buc. |
|---|---|---|---|---|---|---|
| P1 | Poartă evacuare/circulație animale — fațadă longitudinală | 3.500×3.800 | culisantă/batantă, spre padoc | fără prag, continuitate de nivel (D05) | zăvor manual acționabil de o persoană | 2/travee critică, minimum 6 pe hală |
| P2 | Ușă acces personal alei | 1.000×2.100 | batantă | prag ≤ 2 cm | — | 4 |
| P3 | Poartă acces utilaj furajare (remorcă mixer) | 4.000×4.000 | batantă dublă/glisantă | fără prag | fără element saliente pe traseul utilajului | 2 |

### PTh-A.2.2 Tâmplărie filtru sanitar-veterinar (F)

| Poz. | Denumire | Dim. gol (l×h mm) | Interblocare | Feronerie | Buc. |
|---|---|---|---|---|---|
| F1 | Ușă acces vestiar murdar (din exterior) | 900×2.100 | — | cilindru, autoînchidere | 1 |
| F2 | Ușă vestiar murdar → duș | 800×2.000 | interblocată cu F3 (v. D06) | fără zăvor din interior spre exterior fără duș | 1 |
| F3 | Ușă duș → vestiar curat | 800×2.000 | interblocată cu F2 | idem | 1 |
| F4 | Ușă vestiar curat → zonă producție | 900×2.100 | — | cilindru | 1 |
| F5 | Ferestre birou/vestiar filtru | 800×600 | oscilobatantă | mâner la înălțime accesibilă | conform §PTh-A.2, raport minim 1/8 (OMS 119/2014) | 4 |

### PTh-A.2.3 Tâmplărie siloz și depozit furaje (S)

| Poz. | Denumire | Dim. gol (l×h mm) | Regim | Dotare | Buc. |
|---|---|---|---|---|---|
| S1 | Ușă/trapă acces bază siloz | 900×2.100 | metalică, antistatic | fără elemente feroase neprotejate (risc scânteie) | 1/celulă |
| S2 | Gură de vizitare superioară siloz | Ø conform D12 | capac practicabil, blocare deschisă | balustradă perimetrală | 1/celulă |
| S3 | Ușă depozit furaje/așternut | 3.000×3.000 | secțională/glisantă | conform gabarit utilaj încărcare | 1–2 |

### PTh-A.2.4 Cortine rulabile (C) — tâmplărie tehnologică

| Poz. | Amplasament | Lungime totală | Sistem de acționare | Dotare fail-safe | Buc. module (per travee) |
|---|---|---|---|---|---|
| C1 | Fațadă longitudinală A (Corp A) | ≈ 99,00 m | motorizat, comandă computer climat | contragreutate gravitațională, v. D04 | 18 (câte una/travee) |
| C2 | Fațadă longitudinală B (Corp A) | ≈ 99,00 m | idem | idem | 18 |

Note tâmplărie PTh:
- Toate ușile filtrului sanitar-veterinar (F2, F3) sunt echipate cu sistem de interblocare (mecanică cu zăvor cu came sau electrică cu electromagnet cuplat la senzor de ușă) care exclude fizic deschiderea simultană — verificare funcțională obligatorie la recepție (v. PTh-A.5.4).
- Feroneria porților mari (P1) permite deschiderea de urgență de către o singură persoană, fără unelte, conform scenariului de evacuare a efectivului (`arhitectura.md` §9.3).
- Golurile din panourile de anvelopă (P1, P3) se decupează din fabrică, cu subcadru de întărire, coordonate cu modulul de montaj al panourilor (1.000–1.150 mm) și cu traveea structurală (5,50 m) — regulă identică cu cea de la hala industrială (v. `hala-industriala/arhitectura-pth.md` §PTh-A.2, ultimul paragraf).
- Tâmplăria siloz (S1) folosește exclusiv componente fără risc de scânteie mecanică (fără elemente feroase în frecare directă), coordonat cu zonarea ATEX a proiectului de instalații.

---

## PTh-A.3 SPECIFICAȚII TEHNICE COMPLETE DE FINISAJE (fișă per zonă)

Precizare de principiu (reluată din DTAC, `arhitectura.md` §10): dimensionarea structurală (grosime placă, armare) este de resortul proiectului de rezistență (`structura-pth.md`); prezentul capitol tratează exclusiv finisajul și exploatarea, cu accent transversal pe **igienizabilitate și rezistență la dezinfectanți** — cerință prezentă în toate zonele funcționale ale fermei, spre deosebire de o construcție industrială/civilă unde ea se limitează la zonele umede.

### PTh-A.3.1 Fișă finisaje — Corp A, alei de circulație și furajare (câmp curent)

| Element | Produs-tip | Clasă/performanță | Punere în operă |
|---|---|---|---|
| Pardoseală alei | Beton C25/30, clasă expunere XA, striat/canelat | R10–R11, antiderapant | pantă 1,5–2% spre canal (D08), hidroizolație HDPE (D09) |
| Soclu perete | Beton lăsat aparent, tratat hidrofug, sau rășină epoxidică pe zona de 1,00–1,20 m | rezistent la impact și la spălare cu presiune | v. D01 |
| Structură metalică aparentă | Sistem de protecție anticorozivă clasa C4-C5 (zincare + duplex), conform `structura-pth.md` §PTh-R.6.4 | rezistent la amoniac și umiditate permanentă | control DFT pe fiecare strat |
| Canale de colectare | Beton, grătar metalic zincat pe zonele de trafic | portant la sarcina utilajului de furajare | v. D08 |

### PTh-A.3.2 Fișă finisaje — zona cușetelor

| Element | Produs-tip | Clasă | Punere în operă |
|---|---|---|---|
| Platformă cușetă | Beton, saltea de cauciuc sau nisip drenant | confort la contact, antiderapant | supraînălțare 8–12 cm, pantă spre alee |
| Bare/console cușetă | Oțel galvanizat | rezistent la coroziune, reglabil | v. D07 |
| Așternut | Paie/rumeguș tocat/nisip | conform temă tehnologică beneficiar | distribuție zilnică |

### PTh-A.3.3 Fișă finisaje — filtru sanitar-veterinar

| Element | Produs-tip | Clasă | Punere în operă |
|---|---|---|---|
| Pardoseală vestiar murdar/curat/duș | Gresie porțelanată antiderapantă | R10 vestiare, R11 zonă duș | pantă 1% (2% în zona de duș) spre sifon de pardoseală |
| Pereți | Faianță/rășină epoxidică, h ≥ 2,00 m, integral în zona de duș | lavabil, dezinfectabil zilnic | rost epoxidic la colțuri/penetrări |
| Hidroizolație în cuvă (zona de duș) | Membrană lichidă/în folie, ridicată pe pereți | min. 15 cm (20 cm în duș) | continuă, bandă la colțuri (v. D08 din `hala-industriala/arhitectura-pth.md`, principiu identic) |
| Tavan | Neted, lavabil, fără nișe care rețin praf/umezeală | igienic | — |
| Dulapuri | Oțel/laminat lavabil, ventilat, dublu-compartimentate | v. D06 | — |

### PTh-A.3.4 Fișă finisaje — sală de muls și lapterie (Corp C2, `arhitectura.md` §5)

Spațiu prin care trece un produs alimentar, cu cel mai riguros regim de finisaj din întreg ansamblul.

| Element | Produs-tip | Clasă | Punere în operă |
|---|---|---|---|
| Pardoseală | Beton epoxidic/gresie antiacidă | rezistent la spălare frecventă zilnică, fără reziduuri absorbante | pante spre sifoane de pardoseală multiple |
| Pereți | Rășină epoxidică/faianță integrală | lavabil, dezinfectabil de mai multe ori pe zi | rost epoxidic |
| Tavan | Neted, igienizabil | fără condens | — |
| Lapterie | Finisaje identice + control temperatură/umiditate coordonat cu instalația de răcire | igienă alimentară | v. `instalatii-pth.md` |

### PTh-A.3.5 Fișă finisaje — siloz (zonă tehnologică adiacentă, bază și platformă)

| Element | Produs-tip | Clasă | Punere în operă |
|---|---|---|---|
| Radier/platformă bază siloz | Beton C30/37, clasă expunere XC2(+XA1) | rezistent la abraziune și agresivitate slabă a cerealelor | conform `structura-pth.md` |
| Pasarelă/scară | Grătar metalic zincat antiderapant | rezistent la intemperii | v. D12 |
| Finisaj metalic manta | Zincare + vopsire conform `structura-pth.md` §PTh-R.6.4 | rezistent la intemperii + abraziune interioară | — |

### PTh-A.3.6 Fișă finisaje — bazin de dejecții (platformă tehnică și interior cuvă)

| Element | Produs-tip | Clasă | Punere în operă |
|---|---|---|---|
| Interior cuvă | Beton C35/45, clasă expunere XA2-XA3, eventual protecție epoxidică suplimentară | rezistent la amoniac/acizi organici | v. `structura.md` §4.5, D15 |
| Platformă tehnică | Grătar metalic zincat | antiderapant | v. D14 |
| Semnalistică | Marcaje de avertizare pericol gaze toxice | rezistent UV, vizibil permanent | conform normelor de securitate a muncii |

### PTh-A.3.7 Fișă finisaje — platformă de gunoi acoperită

| Element | Produs-tip | Clasă | Punere în operă |
|---|---|---|---|
| Radier | Beton armat etanș, clasă expunere XA1 | pantă 2–3% spre canalul de must | conform `arhitectura.md` §7.2 |
| Ziduri de sprijin | Beton armat | rezistență la împingerea laterală a materialului stivuit | — |
| Acoperiș ușor | Structură metalică simplă + învelitoare | protecție la precipitații directe | conform structura de rezistență |

### PTh-A.3.8 Fișă finisaje — birou / sală de mese personal

| Element | Produs-tip | Clasă | Punere în operă |
|---|---|---|---|
| Pardoseală | Gresie porțelanată/vinil trafic comercial | R9–R10 | rost epoxidic în zona oficiului |
| Pereți | Vopsea lavabilă mată/faianță în zona de preparare | lavabil | — |
| Tavan | Casetat lavabil sau gips-carton vopsit | igienic | trape acces instalații |

Logica alegerii finisajelor urmează, ca și la hala industrială, criteriul funcțional, dar cu o exigență generalizată de igienizare specifică fermei: în zona de producție (Corp A) primează rezistența la impact, la spălare cu presiune și la agresivitatea chimică a mediului (amoniac, acizi organici); la filtrul sanitar-veterinar și la sala de muls — igiena strictă și dezinfecția repetată zilnică; la siloz și bazinul de dejecții — rezistența chimică/abrazivă și siguranța muncii; la birou — confortul obișnuit al unui spațiu administrativ.

---

## PTh-A.4 TEHNOLOGIA DE EXECUȚIE A LUCRĂRILOR DE ARHITECTURĂ

Succesiunea tehnologică a fermei diferă de cea a unei hale industriale curente prin **trei fronturi de lucru suplimentare, strict interdependente**: filtrul sanitar-veterinar (element condiționant pentru obținerea avizului sanitar-veterinar, v. `general.md` §12.3), silozul metalic (montat de regulă de echipe specializate ale furnizorului, cu tehnologie proprie de virole) și cuva etanșă a bazinului de dejecții (lucrare de beton hidrotehnic, cu exigențe de etanșeitate net superioare unei fundații obișnuite).

### PTh-A.4.1 Succesiunea generală a operațiilor

| Nr. | Etapă | Condiție de început | Condiții de mediu | Interdependențe |
|---|---|---|---|---|
| 1 | Terasamente + foraj de apă propriu | Studiu geotehnic + trasare axe | — | forajul se testează devreme (`general.md` §12.3) |
| 2 | Fundații Corp A (grinzi de soclu, fundații izolate) | Trasare confirmată | T > +5°C beton | poziționare precisă buloane de ancoraj — v. `structura-pth.md` §PTh-R.5.4 |
| 3 | Fundație inelară Corp B (siloz) | Studiu geotehnic dedicat siloz confirmat (v. `structura.md` §15.3, pct. 1) | idem | verticalitate și poziție buloane critică |
| 4 | Cofrare/armare/turnare cuvă Corp C (bazin dejecții) | Studiu geotehnic + nivel hidrostatic de calcul confirmat | idem | waterstop la fiecare etapă de turnare (D15) — PVLA obligatoriu |
| 5 | Montaj structură metalică Corp A (cadre, contravântuiri, pane, rigle de perete) | Fundații recepționate, buloane la cotă (±10 mm) | fără vânt puternic | conform `structura-pth.md` §PTh-R.5 |
| 6 | Montaj virole siloz Corp B | Fundație inelară recepționată | echipă specializată furnizor | montaj de jos în sus, cu control de verticalitate progresiv |
| 7 | Recepția structurii metalice (control suduri/șuruburi) | Montaj finalizat | — | PVLA înainte de vopsire finală |
| 8 | Protecție anticorozivă/la foc structură metalică | Structură recepționată | conform fișă produs | control DFT pe fiecare strat |
| 9 | Compartimentarea filtrului sanitar-veterinar (pereți, uși interblocate) | Structura corpului C3 finalizată | — | verificare de compartimentare — PVLA (D06) |
| 10 | Montaj panouri sandwich Corp A (pereți plini deasupra soclului, acoperiș) | Structură contravântuită | fără vânt/ploaie la montaj | coordonare cu golurile porților mari (P1) |
| 11 | Montaj cortine rulabile (C1, C2) | Rigle de perete montate, goluri de cortină finisate | — | probă funcțională fail-safe obligatorie (D04) |
| 12 | Execuție hidroizolație pardoseală alei (membrană HDPE) | Terasamente/fundare pardoseală finalizate | — | PVLA obligatoriu, verificare integrală (D09) |
| 13 | Turnare pardoseală alei + canale de colectare | Hidroizolație recepționată, rețele îngropate probate | T > +5°C | rosturi la interfața cu soclul D01 |
| 14 | Finisaje filtru sanitar-veterinar, sală muls/lapterie | Compartimentări/instalații mascate probate | — | v. PTh-A.3.3, PTh-A.3.4 |
| 15 | Montaj cușete, adăpătorele, dotări interioare Corp A | Pardoseală finisată | — | reglaj geometrie cușetă (v. D07) |
| 16 | Execuție platformă gunoi + bazin dejecții — finisaje interioare | Structură recepționată | — | probă de etanșeitate cuvă (v. PTh-A.7.1) |
| 17 | Montaj dezinfector rutier + cântar-pod bascul | Drumuri tehnologice betonate | — | poziționare coordonată cu unicul acces (D16) |
| 18 | Montaj instalații tehnologice (ventilare, furajare automată) | Anvelopă și pardoseală finalizate | — | v. `instalatii-pth.md` §PTh-I.6 |
| 19 | Probe funcționale (cortine fail-safe, GE, ventilare, etanșeitate bazin) | Toate instalațiile montate | — | v. PTh-A.5, `instalatii-pth.md` §PTh-I.7 |
| 20 | Vid sanitar inițial + populare | Aviz sanitar-veterinar obținut | — | condiție de pornire a activității, `general.md` §12.3 |

### PTh-A.4.2 Condiții și reguli tehnologice critice

- Montajul virolelor silozului precede orice altă lucrare pe Corpul B; verticalitatea se controlează progresiv la fiecare virolă montată, nu doar la finalul montajului — o abatere acumulată pe înălțime nedescoperită la timp obligă la demontare parțială.
- Turnarea cuvei bazinului de dejecții se execută pe etape delimitate de rosturi de lucru planificate (nu întâmplătoare), cu waterstop poziționat și verificat **la fiecare rost, înainte de turnarea etapei următoare** — o etapă de turnare care ascunde un waterstop deplasat nu mai poate fi corectată decât prin demolare.
- Compartimentarea filtrului sanitar-veterinar se recepționează ca etapă distinctă, **înaintea aplicării finisajelor**, exact pentru a permite verificarea vizuală a absenței oricărei breșe fizice (v. D06) — o eroare de compartimentare descoperită după finisare este costisitoare de corectat.
- Montajul cortinelor rulabile și proba funcțională a dispozitivului fail-safe se execută înainte de populare, niciodată amânate ca lucrare "de finisare" ulterioară — cortina este un element de siguranță critică, nu un accesoriu estetic.
- Hidroizolația pardoselii de alei nu se acoperă (turnare placă superioară, montaj echipamente) fără PVLA semnat, indiferent de presiunea graficului de execuție.

### PTh-A.4.3 Coordonarea interdisciplinară în execuție (arhitectură–structură–instalații–biosecuritate)

Execuția fermei implică o interdependență și mai strânsă decât la o hală industrială, întrucât **biosecuritatea este a patra specialitate transversală**, cu putere de veto asupra soluțiilor celorlalte trei:

- **Arhitectură–structură:** poziția golurilor de cortină (C1, C2) se validează pe planul de montaj al cadrelor înainte de execuție; rosturile plăcii de pardoseală se raportează la pozițiile stâlpilor (rost la fiecare stâlp) conform `structura-pth.md` §PTh-R.2.
- **Arhitectură–instalații:** penetrările prin panouri (canale de ventilare, conducte de adăpare) se coordonează cu instalatorul înainte de montajul panourilor pe zona respectivă (v. D09 din `hala-industriala/arhitectura-pth.md`, principiu identic aplicat aici); poziția și dimensiunea panourilor de decompresie ATEX (D13) rezultă din calculul instalațiilor, nu din decizia arhitectului.
- **Arhitectură–biosecuritate:** orice modificare de proiect cerută în execuție care ar afecta compartimentarea filtrului sanitar-veterinar (D06), continuitatea gardului/împrejmuirii sau unicitatea punctului de acces (D16) se supune avizului explicit al consultantului sanitar-veterinar (`arhitectura.md` §1.3), nu doar avizului proiectantului de arhitectură — o derogare aparent minoră la acest capitol poate compromite avizul de funcționare al întregii investiții.

Neconcordanțele între specialități se semnalează prin proces-verbal de coordonare, cu prioritate maximă pentru orice element cu rol de biosecuritate sau de siguranță critică (filtru sanitar, cortine fail-safe, panouri ATEX, waterstop bazin).

---

## PTh-A.5 PLANUL DE CONTROL AL CALITĂȚII — ARHITECTURĂ

### PTh-A.5.1 Matrice de control pe categorii

| Categorie lucrare | Ce se verifică | Metodă | Fază/moment | Document | Responsabil |
|---|---|---|---|---|---|
| Compartimentare filtru sanitar-veterinar | Absența traseelor alternative curat/murdar (D06) | vizual, integral | înainte de finisaje | PVLA | diriginte + consultant sanitar-veterinar |
| Hidroizolație pardoseală alei | Continuitate membrană HDPE, sudură rosturi | vizual integral + probă etanșeitate pe zone | înainte de turnarea plăcii superioare | PVLA | diriginte + proiectant |
| Waterstop cuvă bazin dejecții | Poziționare, fixare, continuitate la colțuri | vizual, la fiecare rost | înainte de turnarea etapei următoare | PVLA | diriginte + proiectant |
| Structură metalică — montaj | Verticalitate, poziție ancoraje, toleranțe SR EN 1090-2 | teodolit/laser, șabloane | pe parcurs | PV recepție montaj | executant + diriginte |
| Virole siloz | Verticalitate progresivă, alinierea gujoanelor/șuruburilor de îmbinare | teodolit/laser, control la fiecare virolă | pe parcurs montaj | PV recepție montaj | executant specializat + diriginte |
| Cortine rulabile — mecanism fail-safe | Deschidere gravitațională la simulare de cădere de tensiune | probă funcțională | la finalizarea montajului | PV probă funcțională | proiectant instalații + diriginte |
| Uși filtru — interblocare | Imposibilitatea deschiderii simultane | probă funcțională | la finalizarea montajului | PV probă funcțională | diriginte |
| Etanșeitate cuvă bazin dejecții | Absența infiltrațiilor la nivel superior/inferior | probă de umplere/inundare parțială | după finalizarea execuției, înainte de PIF | PV probă | proiectant + diriginte |

### PTh-A.5.2 Abateri admisibile (sinteză)

| Element | Toleranță |
|---|---|
| Verticalitate stâlpi Corp A | ≤ h/500 |
| Verticalitate virole siloz | conform SR EN 1993-4-1, control progresiv la fiecare virolă |
| Planeitate pardoseală alei | conform clasă adoptată, verificare cu dreptar 3 m |
| Pantă canale de colectare | conform proiect, ±0,2% |
| Poziție goluri porți/cortine | ±10 mm față de axul traveei |
| Grosime membrană HDPE | conform fișă produs, fără subțieri la suduri |

### PTh-A.5.3 Lista PVLA obligatorii (lucrări ascunse)

1. Fundații/buloane de ancoraj Corp A, Corp B — poziție și verticalitate.
2. Armătură + waterstop cuvă bazin dejecții, la fiecare etapă de turnare.
3. Membrană HDPE hidroizolație pardoseală alei — integral, pe toată suprafața.
4. Compartimentare filtru sanitar-veterinar — înainte de finisaje.
5. Rețele îngropate (apă, canalizare, electrice) sub pardoseală — probă de presiune înainte de acoperire.
6. Protecție anticorozivă structură metalică — control DFT pe fiecare strat, înainte de montarea panourilor.
7. Penetrări prin panouri de anvelopă — etanșare hidrofugă/termică/la foc.

### PTh-A.5.4 Verificări specifice tipologiei agrozootehnice (dincolo de matricea generală)

- Proba funcțională a fiecărei cortine rulabile (18+18 module) la mecanismul fail-safe — nu prin eșantionare.
- Proba funcțională a interblocării ușilor filtrului sanitar-veterinar.
- Verificarea plasei de protecție anti-păsări la fanta de coamă — continuitate integrală pe 100,00 m.
- Verificarea unicității punctului de acces în incintă (plan de situație vs. execuție reală a împrejmuirii).
- Verificarea semnalisticii de pericol gaze toxice la bazinul de dejecții.

---

## PTh-A.6 TOLERANȚE DE EXECUȚIE

### PTh-A.6.1 Structură metalică Corp A (SR EN 1090-2, Anexa B)

| Element | Toleranță |
|---|---|
| Verticalitate stâlp | ≤ h/500 |
| Poziție ancoraje la fundație | ±10 mm |
| Distanță între cadre (travee) | ± 5 mm |
| Săgeată riglă montată (fără sarcină) | conform contra-săgeată de fabricație, dacă e cazul |

### PTh-A.6.2 Manta metalică siloz (SR EN 1993-4-1)

| Element | Toleranță |
|---|---|
| Verticalitate globală a mantalei | conform clasă de execuție adoptată SR EN 1993-1-6 |
| Ovalitate secțiune circulară | conform Anexa D SR EN 1993-1-6 — critic pentru factorul de reducere χ la flambaj (v. `structura-pth.md` §PTh-R.9) |
| Aliniere virole succesive | fără decalaj la interfața dintre virole |

### PTh-A.6.3 Pardoseală alei — planeitate și pante

| Element | Toleranță |
|---|---|
| Planeitate generală | conform clasă adoptată de proiect, verificare cu dreptar 3 m |
| Pantă canal colectare | ±0,2% față de proiect, fără contrapantă locală |
| Cotă superioară soclu D01 | ±5 mm pe toată lungimea |

### PTh-A.6.4 Cuvă bazin dejecții (beton hidrotehnic)

| Element | Toleranță |
|---|---|
| Grosime perete/radier | conform proiect de rezistență, −0/+10 mm |
| Poziție waterstop | fără deplasare față de axul rostului, verificat înainte de turnare |
| Deschidere fisură admisă (SLS) | w ≤ 0,2 mm, conform SR EN 1992-3 |

### PTh-A.6.5 Consecințele depășirii toleranțelor — repere de decizie

Depășirea toleranței de verticalitate/ovalitate la manta silozului impune reevaluarea factorului de reducere la flambaj (v. `structura-pth.md` §PTh-R.9.2) înainte de acceptarea lucrării — o abatere geometrică peste limita normată reduce direct capacitatea portantă calculată, indiferent de grosimea nominală a tablei puse în operă. Depășirea toleranței de poziționare a waterstop-ului la cuva bazinului nu se remediază prin injectare ulterioară cu garanție echivalentă unei execuții corecte — decizia (acceptare cu monitorizare suplimentară sau demolare/refacere a etapei) revine explicit proiectantului, nu executantului.

---

## PTh-A.7 RECEPȚIA LUCRĂRILOR DE ARHITECTURĂ

### PTh-A.7.1 Recepții pe faze / lucrări ascunse

Conform lista PVLA de la PTh-A.5.3, cu adăugarea specifică a **probei de etanșeitate a cuvei bazinului de dejecții** (umplere parțială/inundare controlată, cu urmărirea nivelului pe un interval determinat de proiectant, pentru confirmarea absenței infiltrațiilor înainte de darea în exploatare) — probă distinctă de verificarea structurală la stare limită UPL (`structura.md` §4), care privește exclusiv etanșeitatea la exploatare.

### PTh-A.7.2 Recepția la terminarea lucrărilor (arhitectură)

Se verifică: conformitatea cu proiectul (arhitectură, tâmplărie, finisaje), funcționarea probelor de siguranță critică (cortine fail-safe, interblocare filtru sanitar), integritatea semnalisticii de biosecuritate și de pericol, precum și — condiție specifică fermei, fără echivalent la o construcție civilă/industrială — **finalizarea integrală a anexelor de biosecuritate** (filtru sanitar-veterinar, dezinfector rutier, platformă gunoi, bazin dejecții), etapă critică menționată explicit în `general.md` §12.3, întrucât absența lor blochează obținerea avizului sanitar-veterinar și, implicit, dreptul de populare a fermei.

### PTh-A.7.3 Recepția finală (după perioada de garanție)

Se verifică comportarea în exploatare a elementelor cu funcționare ciclică/de rezervă (cortine fail-safe — verificate periodic conform `instalatii.md` §10.3, protecția anticorozivă în mediul agresiv real al fermei, etanșeitatea cuvei bazinului sub exploatare curentă), cu întocmirea listei de remedieri, dacă e cazul.

---

## PTh-A.8 CARTEA TEHNICĂ — PARTEA DE ARHITECTURĂ

### PTh-A.8.1 Conținutul dosarului de arhitectură (as-built)

Planuri as-built pe toate cele trei corpuri și anexe, planșe de detalii D01–D16 confirmate la execuția reală, fișele PVLA semnate, procesele-verbale ale probelor funcționale (cortine fail-safe, interblocare filtru, etanșeitate bazin), fișele tehnice de produse puse în operă (panouri sandwich, membrană HDPE, waterstop, cortine, dezinfector rutier), certificatele de calitate/conformitate ale materialelor.

### PTh-A.8.2 Instrucțiuni de exploatare și întreținere (extras arhitectură)

Programul de verificare periodică a mecanismului fail-safe al cortinelor (v. `instalatii.md` §10.3), programul de reîmprospătare a soluției dezinfectante la dezinfectorul rutier, programul de inspecție a etanșeității cuvei bazinului de dejecții și a soclurilor de protecție D01, programul de reglaj periodic al geometriei cușetelor (D07) pe baza observării comportamentului turmei.

### PTh-A.8.3 Predarea cărții tehnice

Predarea către beneficiar se face condiționat de finalizarea integrală a probelor de siguranță critică și de obținerea avizului sanitar-veterinar, conform succesiunii stabilite la `general.md` §12.3/§12.4.

---

## PTh-A.9 — FIȘE TEHNICE DE MATERIALE (caiet extins de produse arhitectură)

### PTh-A.9.1 Preambul și mod de utilizare a fișelor

Fișele următoare completează caietele de sarcini per produs, cu accent pe compatibilitatea cu mediul agresiv specific fermei (amoniac, umiditate permanentă, acizi organici, spălare frecventă cu presiune și dezinfectanți) — o cerință transversală absentă din fișele tehnice standard ale acelorași produse folosite într-o construcție civilă/industrială curentă.

### PTh-A.9.2 — FT-01: Panouri sandwich autoportante (pereți plini deasupra soclului)

| Parametru | Specificație |
|---|---|
| Miez | PIR/PUR sau vată bazaltică (A2-s1,d0 pe zonele cu rol de foc), 100–120 mm |
| Fețe metalice | tablă zincată/prevopsită, protecție anticorozivă sporită pe fața interioară (expunere amoniac) |
| Certificare | SR EN 14509 |
| Coeficient de transfer termic | U ≤ 0,25 W/mp·K (funcție de grosime miez) |
| Modul de montaj | 1.000–1.150 mm, coordonat cu traveea de 5,50 m |
| Compatibilitate mediu agresiv | clasă de corozivitate C4-C5 pe fața interioară, conform `structura-pth.md` §PTh-R.6.4 |
| Garanție producător | conform ofertă, minimum 10 ani pe integritatea feței metalice |

### PTh-A.9.3 — FT-02: Cortine rulabile PVC armat cu mecanism fail-safe

| Parametru | Specificație |
|---|---|
| Pânză | PVC armat, rezistent UV, grosime ≥ 0,5 mm |
| Rezistență la rupere | conform fișă furnizor, minimum echivalentă solicitării de vânt pe zona de cortină deschisă |
| Mecanism de acționare | motoreductor + comandă computer climat |
| Dispozitiv fail-safe | contragreutăți calibrate, raport de calcul furnizat de producător |
| Timp de deschidere completă la pierderea comenzii | verificat la proba funcțională (D04), fără prag normat unic — se stabilește de proiectant funcție de inerția termică a halei |
| Durată de viață estimată pânză | conform fișă furnizor, cu program de înlocuire periodică |

### PTh-A.9.4 — FT-03: Membrană HDPE hidroizolație pardoseală

| Parametru | Specificație |
|---|---|
| Grosime | ≥ 1,5 mm |
| Tip îmbinare | sudură termică, control vizual + testare (aer/vid pe rosturi de probă) |
| Rezistență chimică | compatibilitate certificată cu contact permanent la dejecții/purin (amoniac, acizi organici) |
| Rezistență la perforare | conform fișă produs, verificată la protejarea cu strat de beton peste |
| Certificat obligatoriu la recepția materialului | fișă tehnică + certificat de compatibilitate chimică |

### PTh-A.9.5 — FT-04: Waterstop PVC/bentonitic

| Parametru | Specificație |
|---|---|
| Tip | PVC (rosturi de turnare) / bentonitic (rosturi statice, contact permanent cu apa) |
| Lățime | dimensionată de proiectant funcție de presiunea hidrostatică de calcul a cuvei (`structura.md` §4) |
| Fixare | ancorat de armătură pe ambele fețe ale rostului, cu cleme dedicate |
| Continuitate la colțuri | piese prefabricate de colț/T, fără întrerupere |
| Compatibilitate | clasa de expunere XA2-XA3 a betonului adiacent |

### PTh-A.9.6 — FT-05: Beton pentru pardoseală alei și soclu de protecție

| Parametru | Specificație |
|---|---|
| Clasă rezistență | C25/30 |
| Clasă de expunere | XA1 (rezistență chimică la acizi organici din dejecții) |
| Finisaj | antiderapant, striat/canelat, clasă R10–R11 |
| Tratament suplimentar | impregnare/hidrofugare de suprafață pe zonele cu contact direct și repetat cu dejecții |

### PTh-A.9.7 — FT-06: Rășină epoxidică pentru pardoseli/pereți filtru sanitar și sală de muls

| Parametru | Specificație |
|---|---|
| Tip | rășină epoxidică bicomponentă/poliuretanică, aplicată în strat continuu |
| Rezistență chimică | la dezinfectanți cu conținut de clor, la spălare zilnică repetată cu presiune |
| Aderență la suport | conform fișă produs, cu pregătire a suportului (șlefuire, amorsare) |
| Durabilitate | fără exfoliere/fisurare pe durata de viață proiectată, program de reaplicare periodică conform recomandare producător |

### PTh-A.9.8 — FT-07: Tablă profilată/ondulată manta siloz

| Parametru | Specificație |
|---|---|
| Material | S350GD, formată la rece |
| Protecție | zincare de fabricație Z275 (fața exterioară expusă la intemperii) / Z600 (zone cu expunere sporită, conform `structura.md` §14.2) |
| Certificare | SR EN 1993-4-1 |
| Grosime | variabilă pe virole, 4 mm (vârf) la 6–8 mm (bază), conform `structura-pth.md` §PTh-R.3 |
| Compatibilitate ATEX | fără proprietăți care să genereze scântei la frecare, legată la pământ pe tot ansamblul |

### PTh-A.9.9 — FT-08: Semnalistică de biosecuritate și de pericol

| Parametru | Specificație |
|---|---|
| Materiale | plăcuțe rezistente UV, fixare mecanică durabilă |
| Amplasare | pericol gaze toxice — la fiecare acces la cuva bazinului; risc explozie praf — la fiecare panou de decompresie și acces siloz; obligativitate filtru sanitar — la accesul în zona de producție |
| Coordonare | conform planului de biosecuritate al beneficiarului/consultantului sanitar-veterinar (`arhitectura.md` §1.3) |
| Verificare periodică | integritate și lizibilitate, inclusă în programul de întreținere (PTh-A.8.2) |

### PTh-A.9.10 — FT-09: Grătare metalice zincate (canale de colectare, pasarele, platforme tehnice)

| Parametru | Specificație |
|---|---|
| Material | oțel zincat la cald, conform SR EN ISO 1461 |
| Portanță | dimensionată la sarcina utilajului de furajare (canale) sau la sarcina de personal+echipament (pasarele/platforme) |
| Demontabilitate | obligatorie, pentru curățare periodică a canalelor de colectare |
| Deschidere ochiuri | dimensionată pentru trecerea lichidului/dejecțiilor fără colmatare rapidă |

### PTh-A.9.11 — FT-10: Bare/console metalice mobilier cușetă (cushion loop, neck rail, brisket board)

| Parametru | Specificație |
|---|---|
| Material | oțel galvanizat la cald |
| Diametru bare | 40–50 mm |
| Sistem de reglaj | găuri de prindere la interval de câțiva centimetri pe console, pe toate cele trei direcții de reglaj |
| Rezistență la coroziune | conform mediu interior clasă C4-C5 |

### PTh-A.9.12 — FT-11: Sistem dezinfector rutier (bazin sau rampă cu pulverizare)

| Parametru | Specificație |
|---|---|
| Variantă bazin | beton armat etanș, adâncime/lungime pentru o rotație completă a roții |
| Variantă rampă cu pulverizare | senzor de prezență, pompă dedicată, duze pe contur, rezervor soluție dezinfectantă |
| Protecție la îngheț | cablu electric de însoțire pe conducte |
| Evacuare soluție uzată | colectare separată, tratare/eliminare conformă, fără racord la circuitul de dejecții |

---

## PTh-A.13 — RESURSE ȘI UTILAJE DE EXECUȚIE SPECIFICE

Spre deosebire de o construcție civilă/industrială curentă, execuția fermei mobilizează, pe lângă utilajele obișnuite (macara pentru montaj structură, pompă de beton, laser screed dacă e cazul), un set de resurse specifice tipologiei agrozootehnice, esențiale de planificat din timp în graficul general:

| Resursă/utilaj | Etapă de utilizare | Observație |
|---|---|---|
| Echipă specializată montaj virole siloz | Montaj Corp B | de regulă subcontractată de la furnizorul de echipament siloz, conform `general.md` §12.3 |
| Utilaj de sudură/testare sudabilitate membrană HDPE | Execuție hidroizolație pardoseală (D09) | control de calitate pe fiecare rost sudat |
| Echipament de testare etanșeitate cuvă bazin | Recepție Corp C | umplere parțială/inundare controlată, urmărire de nivel |
| Simulator de cădere de tensiune (proba fail-safe) | Recepție cortine (D04) | verificare independentă de sistemul de automatizare deja instalat |
| Consultant sanitar-veterinar | Recepție filtru sanitar (D06) + checklist PTh-A.11 | prezență obligatorie la recepția finală de arhitectură |
| Echipament de zincare/vopsire duplex | Protecție anticorozivă structură Corp A | control DFT pe fiecare strat, conform `structura-pth.md` §PTh-R.6.4 |

Planificarea din timp a acestor resurse — în special a echipei specializate de montaj a silozului și a consultantului sanitar-veterinar pentru recepția finală — este condiție de respectare a graficului general al investiției, dat fiind caracterul lor de resursă externă, nemobilizabilă instantaneu la cererea șantierului.

---

## PTh-A.14 — SINTEZA CORELĂRII CU MEMORIILE DE STRUCTURĂ ȘI INSTALAȚII (PTh)

Prezentul supliment de arhitectură nu poate fi executat independent de suplimentele omoloage de structură (`structura-pth.md`) și instalații (`instalatii-pth.md`) — cele trei documente tratează, fiecare din perspectiva propriei specialități, **aceeași geometrie unică** stabilită la PTh-A.0 (Corp A — hală L=21,00 m/e=5,50 m/18 travei, Corp B — siloz Ø8,00 m/H=15,00 m, Corp C — bazin 12,00×8,00×3,00 m modul de 288 mc). Tabelul următor sintetizează punctele de interfață obligatorii, ca ghid rapid pentru diriginte și pentru proiectanții celor trei specialități la fazele de coordonare (v. PTh-A.4.3):

| Element de interfață | Arhitectură (prezentul document) | Structură (`structura-pth.md`) | Instalații (`instalatii-pth.md`) |
|---|---|---|---|
| Poziția golurilor de cortină (D04) | plan de montaj panouri | verificare la rigla de perete/pane | debit de tiraj la calcul ventilare naturală |
| Panouri de decompresie siloz (D13) | integrare vizuală/constructivă în manta | verificare la inelele de rigidizare (nu slăbește secțiunea) | poziție/număr rezultat din calculul ATEX |
| Waterstop cuvă bazin (D15) | detaliu de execuție, PVLA | armătură și rosturi de turnare planificate | racord conducte de pompare/mixare la penetrări etanșe |
| Filtru sanitar-veterinar (D06) | compartimentare fizică, interblocare uși | pereți despărțitori (dacă portanți) | apă caldă continuă la duș, IP44 minim |
| Cușete/maternitate (D07, D16bis) | geometrie de mobilier, reglaj | — | — (relevanță zero-tehnică, doar coordonare cu proiectul tehnologic) |
| Fundație inelară siloz (D11) | racord la platformă tehnologică | breviar complet radier + ancoraje | — |
| Pasarelă/scară siloz (D12) | balustradă, gură de vizitare | calcul structural scară/platforme (`structura-pth.md` §PTh-R.13) | racord echipamente ATEX de aspirație |

Orice modificare adusă în execuție unuia dintre cele trei documente — de exemplu o realocare a poziției unei uși sau a unui panou de decompresie — se comunică obligatoriu celorlalte două specialități prin proces-verbal de coordonare, înainte de execuție, conform principiului stabilit la PTh-A.4.3.

### PTh-A.14.1 Lista de verificare finală a coerenței documentației PTh (arhitectură)

1. Numărul de travei (18) și lungimea rezultată a Corpului A (≈99,00 m) coincid în toate cele trei documente PTh.
2. Diametrul și înălțimea Corpului B (Ø8,00 m/H=15,00 m) coincid în toate cele trei documente PTh.
3. Dimensiunile modulului de bază al Corpului C (12,00×8,00×3,00 m, ~288 mc) coincid, iar numărul de module adoptat pe amplasamentul real este documentat explicit (nu doar implicit) în piesele scrise finale ale fiecărei specialități.
4. Toate elementele de siguranță critică (cortine fail-safe, panouri de decompresie, waterstop) au corespondent explicit atât în piesele de arhitectură (prezentul document), cât și în piesele de structură/instalații care le dimensionează tehnic.
5. Checklist-ul de biosecuritate (PTh-A.11) este semnat de toate părțile implicate (diriginte, proiectant arhitectură, consultant sanitar-veterinar) înainte de emiterea recomandării de recepție finală.

Cu parcurgerea integrală a prezentului supliment PTh-A, componenta de arhitectură a fermei agrozootehnice este dezvoltată la nivelul de detaliu de execuție cerut de faza de Proiect Tehnic (HG 907/2016), cu toate detaliile cotate, tehnologia de execuție, planul de control al calității, toleranțele și fișele de materiale necesare demarării execuției pe șantier.

### PTh-A.14.2 Notă finală asupra scalabilității documentului

Toate detaliile de execuție D01–D20 și fișele tehnice FT-01–FT-11 din prezentul supliment sunt redactate la nivel de **principiu constructiv și geometrie unitară de reper** (cușetă 2,50×1,25 m, travee 5,50 m, virolă de siloz, celulă de bazin de 288 mc), independent de multiplicarea modulară adoptată pentru un amplasament real concret. Pentru o fermă cu efectiv diferit de exemplul de calcul reprezentativ folosit consecvent în întreaga bibliotecă (300 capete bovine lapte, cu variantele de 20.000 capete broiler și 2.000 capete porcine tratate în paralel la nivel de metodologie de calcul în `general.md` și `instalatii.md`), proiectantul recalculează numărul de travei ale Corpului A, numărul de module ale Corpului C și, dacă tema tehnologică o cere, numărul de celule ale Corpului B, păstrând nemodificate principiile de detaliere, tehnologia de execuție și planul de control al calității stabilite aici — exact modul de lucru descris explicit în `instalatii.md` §11.0 pentru breviarul de instalații, extins aici la componenta de arhitectură.

---

## PTh-A.10 — PLAN DE TRASARE (COTE, AXE, REPERE) PENTRU CELE TREI CORPURI

### PTh-A.10.1 Principii de trasare

Trasarea celor trei corpuri independente structural (Corp A, Corp B, Corp C) se realizează cu rosturi de separare fizică materializate încă din faza de trasare a fundațiilor (v. `structura.md` §1.1 — rosturi de minimum 5–8 cm între corpuri), astfel încât execuția ulterioară să respecte de la bază independența structurală impusă de proiect. Axele Corpului A (cadre transversale la interax 5,50 m, 18 travei) se materializează cu repere fixe, exterioare zonei de excavație, verificabile pe toată durata execuției fundațiilor.

### PTh-A.10.2 Verificări obligatorii pe parcursul trasării

Poziția buloanelor de ancoraj ale Corpului A (control cu șablon de montaj înainte de turnare, v. `structura-pth.md` §PTh-R.5.4), verticalitatea și centrarea fundației inelare a Corpului B (control cu punct central materializat, verificat la fiecare etapă de turnare a radierului), poziția rosturilor de turnare ale cuvei Corpului C (coordonată cu poziția planificată a waterstop-ului, v. D15).

### PTh-A.10.3 Materializarea și predarea trasării

Reperele de trasare se materializează pe borne fixe, exterioare oricărei zone de lucru ulterioare, și se predau dirigintelui de șantier cu proces-verbal, înainte de începerea execuției fundațiilor — condiție care permite verificarea independentă, în orice moment al execuției, a coerenței dintre poziția reală a celor trei corpuri și planul de situație aprobat prin autorizația de construire.

---

## PTh-A.11 — CHECKLIST DE CONFORMARE LA BIOSECURITATE, DE PARCURS ÎNAINTE DE RECEPȚIA FINALĂ

Spre deosebire de orice altă tipologie de construcție tratată de biblioteca tehnică a platformei, recepția arhitecturii unei ferme agrozootehnice nu se încheie cu verificarea conformității față de proiect — ea trebuie să demonstreze, punct cu punct, că soluțiile arhitecturale destinate biosecurității sunt **funcționale, nu doar montate**. Prezentul checklist sintetizează, într-un singur loc, toate punctele de verificare de biosecuritate deja detaliate punctual în capitolele precedente, ca instrument de lucru pentru diriginte, proiectant și consultantul sanitar-veterinar la recepția finală de arhitectură.

### PTh-A.11.1 Checklist unicitate și control al accesului

| Nr. | Verificare | Referință detaliu | Rezultat așteptat |
|---|---|---|---|
| 1 | Un singur punct de acces auto/pietonal în incintă | D16, D17 | conform, fără breșe |
| 2 | Dezinfector rutier funcțional, pe traseul obligatoriu al oricărui vehicul | D16 | funcțional, fără ocolire posibilă |
| 3 | Cântar-pod bascul pe același traseu obligatoriu | D16, `arhitectura.md` §7.6 | funcțional |
| 4 | Continuitate integrală a gardului perimetral, h ≥ 1,80 m | D17 | fără breșe, verificat pe tot perimetrul |
| 5 | Rampă de animale (C8) strict la limita incintei, fără pătrundere a vehiculului extern | D16quinquies | conform |

### PTh-A.11.2 Checklist filtru sanitar-veterinar

| Nr. | Verificare | Referință detaliu | Rezultat așteptat |
|---|---|---|---|
| 1 | Compartimentare fizică completă vestiar murdar/duș/vestiar curat, fără traseu de ocolire | D06 | conform, verificat inclusiv peste plafon fals |
| 2 | Interblocare funcțională a ușilor F2/F3 | D06, PTh-A.2.2 | testată funcțional |
| 3 | Duș obligatoriu funcțional, apă caldă disponibilă permanent | D06, `instalatii-pth.md` | funcțional |
| 4 | Dulapuri dublu-compartimentate (haine stradă/echipament fermă) | D06 | montate, funcționale |
| 5 | Pediluviu la fiecare acces secundar din zona curată | D06 | montat, funcțional |

### PTh-A.11.3 Checklist fluxuri curat/murdar

| Nr. | Verificare | Referință detaliu | Rezultat așteptat |
|---|---|---|---|
| 1 | Traseu furaje (siloz→alee de furajare) fără intersectare cu traseul de dejecții | D11–D12, D08 | conform planului de situație |
| 2 | Traseu dejecții (canale→platformă/bazin) fără intersectare cu traseul curat | D08, D14 | conform |
| 3 | Zonă de carantină/maternitate fizic separată de turma principală | D16bis | conform |
| 4 | Rampă cadavre separată de rampa de animale vii, acces exclusiv exterior | D16quinquies | conform |

### PTh-A.11.4 Checklist elemente de siguranță critică

| Nr. | Verificare | Referință detaliu | Rezultat așteptat |
|---|---|---|---|
| 1 | Proba funcțională a mecanismului fail-safe la fiecare modul de cortină (36 module) | D04, PTh-A.5.4 | 100% testate, fără blocaje |
| 2 | Porți mari de evacuare (P1) — deschidere de urgență de o singură persoană, fără unelte | D05, PTh-A.2.1 | testat |
| 3 | Semnalistică de pericol gaze toxice la bazinul de dejecții | D14, PTh-A.9.10 | montată, vizibilă |
| 4 | Panouri de decompresie siloz — poziționate conform calcul ATEX, zonă de direcționare liberă | D13 | conform proiect instalații |

### PTh-A.11.5 Sinteza condiționării avizului sanitar-veterinar

Conform `general.md` §12.3/§13.2, obținerea avizului sanitar-veterinar ANSVSA/DSVSA — condiție de funcționare legală a fermei, independentă de orice altă verificare tehnică — se sprijină direct pe rezultatul integral pozitiv al checklist-urilor PTh-A.11.1–PTh-A.11.4. Diriginte de șantier și proiectantul de arhitectură nu emit recomandarea de recepție finală (PTh-A.7.2) fără parcurgerea și semnarea acestui checklist de către consultantul sanitar-veterinar/medicul veterinar de exploatație menționat la `arhitectura.md` §1.3.

---

## PTh-A.12 — COORDONAREA CU PROIECTUL TEHNOLOGIC ZOOTEHNIC ȘI CU FAZELE ULTERIOARE

### PTh-A.12.1 Datele de intrare din proiectul tehnologic

Ca și în cazul instalațiilor (`instalatii.md` §11.0), execuția de arhitectură a fermei depinde de un set de date pe care doar proiectul tehnologic de creștere a animalelor (document distinct, elaborat de specialistul zootehn/veterinar) le poate confirma definitiv: efectivul real, sistemul de creștere adoptat (stabulație liberă cu cushete, boxe, sistem all-in/all-out), programul de populare-depopulare și, implicit, geometria finală a cușetelor/boxelor și a fronturilor de furajare. Detaliile D07 (cușetă), D16bis (maternitate) și D16ter (tineret) din prezentul supliment sunt executate cu **rezervă de reglaj geometric** exact din acest motiv — geometria de execuție se confirmă/ajustează pe baza proiectului tehnologic definitiv, nu se toarnă rigid pe baza unei ipoteze de calcul preliminare.

### PTh-A.12.2 Interfața cu proiectul de mediu și cu planul de fertilizare

Volumul final al bazinului de dejecții (Corpul C, multiplicare a celulei de 288 mc detaliate la PTh-A.0) și suprafața platformei de gunoi acoperite (D-uri PTh-A.3.7) se confirmă pe baza calculului V_bazin = N·q_d·Z·k_s din `general.md` §11.2/`instalatii.md` §3.4, aplicat cu efectivul definitiv din proiectul tehnologic — orice modificare a efectivului declarat impune recalcularea acestor volume înainte de finalizarea proiectului de execuție al Corpului C, nu doar o ajustare de șantier.

### PTh-A.12.3 Predarea către faza de recepție finală și punere în funcțiune

Documentele produse de prezentul supliment PTh-A (planșe de detaliu, PCC, checklist de biosecuritate PTh-A.11) se predau integral, împreună cu omoloagele lor de structură (`structura-pth.md`) și instalații (`instalatii-pth.md`), dirigintelui de șantier și beneficiarului la finalizarea execuției, ca bază documentară a cererii de aviz sanitar-veterinar și a recepției la terminarea lucrărilor — conform succesiunii de etape stabilite în `general.md` §12.3 (etapa 5 — anexe de biosecuritate — și etapa 7 — probe, populare, recepție).
