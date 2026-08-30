## PTh-A.0 PREAMBUL — OBIECTUL SUPLIMENTULUI DE FAZĂ ȘI CONSISTENȚA CU DTAC

Prezentul document constituie **suplimentul de fază PTh** (Proiect Tehnic de execuție, conform HG nr. 907/2016) la Memoriul de arhitectură/amenajare al platformei tehnice **BESS (Battery Energy Storage System) 25 MW / 50 MWh**, deja redactat la faza D.T.A.C. Suplimentul aduce documentația de amenajare la nivelul de detaliere necesar execuției (detalii cotate la scările 1:5/1:10/1:20, fișe tehnice de materiale, tehnologie de execuție, plan de control al calității, toleranțe, recepție și carte tehnică), fără a relua descrierile de concept, de amplasament sau de necesitate/oportunitate deja tratate în memoriul general și în memoriul de arhitectură DTAC.

**Date de referință ale proiectului, preluate identic din documentația DTAC deja emisă** (memoriul general, capitolele 1-2; memoriul de arhitectură, capitolele 1, 5, 10-11):

| Element | Valoare | Sursă DTAC |
|---|---|---|
| Capacitate instalație | 25 MW / 50 MWh | memoriul general 1.1 |
| Configurație containere | 10 containere ISO 20', LFP, 2 rânduri × 5 | arhitectură 1.3, 5.1 |
| Dimensiune container | 6,06 × 2,44 m, H 2,90 m | arhitectură 1.3, 6.2 |
| Amprentă cumulată containere | ≈148 mp (10 × 14,8 mp) | arhitectură 1.3 |
| Suprafață teren | ≈13.000 mp | arhitectură 1.1, 2.1 |
| Suprafață construită convențională (Ac) | ≈2.000 mp | arhitectură 1.3 |
| POT / CUT | ≈15,4% / ≈0,15 | arhitectură 1.3 |
| Categoria de importanță | C (normală), HG 766/1997 | general 2.1, arhitectură 1.4 |
| Clasa de importanță seismică | III, γI = 1,0, P100-1/2013 | general 2.2, arhitectură 1.4 |
| Risc de incendiu | MARE (thermal runaway Li-ion) | general 3, arhitectură 1.4 |
| Distanță container-container | ≥3,0 m (NFPA 855 §4.1, minim conservator în lipsa UL 9540A specific) | arhitectură 5.2-5.3 |
| Culoar de intervenție între rânduri | ≥6,0 m | arhitectură 5.1-5.2 |
| Distanță container-limită de proprietate | ≥6,0 m | arhitectură 5.2 |
| Distanță container-cabină EMS (zonă ocupată) | ≥6,0-10,0 m | arhitectură 5.2 |
| Masă container plin (referință 20') | ≈30 t (294 kN) | structură 1.2, 3.1 |
| Forță seismică orizontală de ancoraj (exemplu de bază, ag=0,20g) | Fb ≈ 114 kN/container | general 2.3, structură 4.1 |
| Platformă beton sub container | C25/30, XC2+XF1/XF3, grosime 25-40 cm | structură 2.3, 3.1, 6 |
| Personal permanent pe amplasament | 0 (operare de la distanță) | arhitectură 9.3 |

Prezentul supliment PTh nu recalculează aceste date (preluate ca atare din DTAC), ci le folosește ca date de intrare pentru detalierea de execuție a componentei de arhitectură/amenajare: platformele-suport container (interfața cu structura, tratată la §19), împrejmuirea, drumurile și culoarele de intervenție, cabina EMS/SCADA, bazinul de retenție a apelor de stingere, trenchurile de cabluri, semnalistica de pericol și finisajele/materialele de amenajare a incintei. Cadrul normativ de detaliere se adaugă celui deja citat la DTAC (Legea nr. 169/2026 — CATUC, HG 907/2016, HG 525/1996, NFPA 855, UL 9540/9540A, NFPA 68/69, EN 14994, P118-1/2/3, Ordinul MAI 129/2016, HG 571/2016, HG 766/1997, P100-1/2013, NP 051-2012) cu normative de execuție specifice amenajărilor exterioare:

- **SR EN 13108** (mixturi asfaltice) și **AND 605** — normativ pentru straturile bituminoase ale drumurilor de incintă;
- **NE 014-2002** — normativ pentru execuția îmbrăcăminților rutiere din beton de ciment;
- **SR EN 1610** — execuția și încercarea canalizărilor și racordurilor de canalizare (aplicabil rigolelor/bazinului de retenție);
- **NP 040-2002** — proiectare, execuție și exploatare hidroizolații (aplicabil cuvei de retenție ulei transformator și bazinului de retenție ape de stingere);
- **SR EN 10223-6 / SR EN 1461** — plase și panouri de gard zincate, respectiv zincare termică la cald;
- **SR EN 12899-1** — indicatoare rutiere/de securitate verticale (aplicabil semnalisticii de pericol și de circulație în incintă);
- **STAS 6054/77** — adâncimi de îngheț;
- **Ordinul ANRSC / normative locale de sistematizare verticală** — pante și drenaj incintă.

Numerotarea detaliilor de arhitectură (D01…D14) corespunde plotelor din piesele desenate PTh-A, la scările indicate în dreptul fiecărui detaliu.

---

## PTh-A.1 DETALII DE EXECUȚIE

Detaliile de mai jos rezolvă, la nivel de execuție, interfețele constructive determinante pentru securitatea la incendiu (distanțe, compartimentare, panouri de venting orientate corect), pentru continuitatea circulațiilor de intervenție (fără praguri, portanță confirmată) și pentru etanșarea/drenajul incintei (platforme, rigole, bazin de retenție). Fiecare detaliu este însoțit de un tabel Element/Descriere execuție/Material-dimensiune și de cerințele de execuție care nu pot fi deduse direct din desen.

### D01 — Platformă/fundație container: interfața arhitectură-structură, racord la platforma rutieră (sc. 1:10)

Detaliul rezolvă continuitatea geometrică dintre platforma individuală de beton armat a containerului (dimensionată la memoriul de structură) și platforma rutieră/culoarul de intervenție adiacent, astfel încât să nu existe denivelări care ar întârzia manevra echipelor de intervenție sau a cărucioarelor de mentenanță.

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Platformă container | Placă beton armat, cotă superioară +0,10÷+0,15 m față de CTS | C25/30, grosime 25-40 cm (conform memoriu structură) |
| Continuitate cu drumul perimetral | Cotă unică cu îmbrăcămintea culoarului de intervenție, fără prag | diferență de nivel max. 5 mm la interfață |
| Rost de separație platformă-drum | Rost elastic, etanșat, care preia mișcările relative diferite ale celor două elemente | chit poliuretanic pe fond de rost, lățime 15-20 mm |
| Pantă de scurgere platformă | Pantă ≥1% spre exteriorul amprentei containerului, dirijată spre rigola perimetrală | conform proiect sistematizare verticală, cap. D05 |
| Marcaj amprentă container pe platformă | Vopsea de trafic/marcaj perimetral pentru poziționarea vizuală a corner-castings la montaj | vopsea reflectorizantă, lățime linie 10 cm |
| Puncte de ancorare seismică | Șabloane/inserții pentru ancore chimice, poziționate conform planului de structură și fișei tehnice a producătorului de container | conform SR EN 1992-4 (memoriul de structură) |

Cerințe de execuție: platforma se toarnă strict la cota și cu poziția inserțiilor de ancorare confirmate pe baza fișei tehnice definitive a containerului contractat (poziția reazemelor de colț variază între producători); orice decalaj între poziția reală a platformei turnate și poziția reazemelor containerului livrat impune, dacă apare, o soluție de recuperare (placă de reazem intermediară calculată de structurist), nu o forțare a montajului.

### D02 — Racord platformă container–platformă rutieră–rigolă perimetrală (sc. 1:20)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Platformă rutieră/culoar | Îmbrăcăminte betonată/asfaltată, dimensionată la portanța autospecialei ISU | conform cap. 10 arhitectură DTAC (≥10 t/osie, ≥26 t masă totală) |
| Bordură de delimitare | Bordură din beton prefabricat/monolit între platforma containerului și zona verde/rigolă | bordură H=15-20 cm, îngropată 2/3 din înălțime |
| Rigolă de scurgere | Rigolă carosabilă cu capac din fontă/beton, poziționată perimetral drumului | rigolă prefabricată, clasă de încărcare D400 (zone carosabile) |
| Racord la sistemul de drenaj | Rigola se racordează la rețeaua de canalizare pluvială/bazinul de retenție | conform cap. 14 arhitectură DTAC, pantă ≥0,5% |
| Strat suport | Balast compactat, grosime funcție de portanța cerută | conform studiu geotehnic + calcul portanță drum |

### D03 — Împrejmuire de securitate: fundație stâlp + panou zincat (sc. 1:10)

Detaliul rezolvă fundarea stâlpilor de împrejmuire și fixarea panourilor rigide, cu respectarea înălțimii minime de securitate și a retragerii față de containere stabilite la DTAC.

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Fundație stâlp gard | Bloc de beton simplu turnat pe loc | C12/15, secțiune 30×30 cm, adâncime ≥60 cm (sub adâncimea de îngheț zonală) |
| Stâlp de susținere | Profil metalic zincat, ancorat în bloc | țeavă/profil zincat termic, interax 2,0-2,5 m |
| Panou de împrejmuire | Panou rigid bordurat (plasă sudată/zincată) | h min. 2,0 m, zincare SR EN ISO 1461 |
| Fixare panou-stâlp | Cleme/coliere zincate, antivandalism | șuruburi de securitate cu cap special |
| Soclu/prag inferior | Continuitate la sol pentru împiedicarea accesului prin subtraversare | bordură/soclu beton h=10-15 cm sub panou |
| Retragere gard-container | Conform capitolului 5 din memoriul de arhitectură DTAC | ≥6,0 m (distanță container-limită de proprietate) |

Cerință de execuție: stâlpii se amplasează pe un traseu care nu intersectează traseele de cabluri MT/joasă tensiune îngropate (coordonare cu planul de trenchuri, D09); fundațiile izolate ale gardului nu se toarnă până la finalizarea trasării definitive a rețelelor subterane.

### D04 — Poartă carosabilă de acces principal, cu control de acces (sc. 1:20)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Structură poartă | Cadru metalic zincat, glisantă pe șină sau batantă cu 2 canaturi | gabarit liber ≥ lățimea drumului de acces (cap. 10 DTAC) |
| Fundație/șină de rulare | Grindă de beton armat cu șină metalică înglobată (poartă glisantă) | C20/25, adâncime conform sarcină și lungime poartă |
| Automatizare | Motor electric cu telecomandă + card/cod acces, cu deblocare manuală de urgență | conform memoriul de instalații, interfață control acces |
| Sens de deschidere de urgență | Deblocare manuală instantanee pentru echipele ISU (cheie de incendiu/breakglass) | conform Ord. MAI 129/2016 |
| Semnalistică | Panou de identificare a instalației + pericol electric/chimic, vizibil de la poartă | conform D08 |
| Iluminat poartă | Corp iluminat exterior IP65, cu senzor de mișcare/programare | conform memoriul de instalații |

### D05 — Rigolă perimetrală + racord la bazinul de retenție a apelor de stingere (sc. 1:10)

Detaliul asigură colectarea și dirijarea controlată a apelor pluviale și, în caz de eveniment, a apelor de stingere contaminate (posibil cu reziduuri ale agenților de stingere sau ale electrolitului), fără infiltrare necontrolată în teren.

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Rigolă perimetrală | Rigolă din beton prefabricat/polimer-beton, cu grătar | pantă longitudinală ≥0,5%, secțiune conform debit calculat |
| Cămin de vizitare/decantare | Cămin intermediar cu separator de nămol/hidrocarburi înaintea bazinului | Dn conform calcul, capac carosabil D400 |
| Vană de izolare | Vană manuală/automată pe conducta de legătură rigolă-bazin, pentru izolarea apelor contaminate în caz de eveniment | acționare manuală + telecomandă SCADA |
| Conductă de legătură | Conductă îngropată, pantă ≥1% spre bazin | PVC/PP canalizare, Dn conform calcul debit |
| Etanșare | Toate rosturile și penetrările cămin-conductă etanșate | conform SR EN 1610 |

Regula de exploatare relevantă pentru arhitectură: vana de izolare este normal deschisă (drenaj liber al apelor pluviale curate) și se închide manual sau prin telecomandă SCADA imediat ce se declanșează un eveniment de incendiu, pentru a direcționa apele de stingere contaminate integral spre bazinul de retenție, nu spre rețeaua pluvială generală/emisar.

### D06 — Bazin de retenție a apelor de stingere: etanșare, guri de vizitare, preaplin controlat (sc. 1:20)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Structură bazin | Rezervor îngropat de beton armat (structură de rezervor, tratată la memoriul de structură) | C30/37, XA1/XA2 |
| Hidroizolație interioară | Membrană/tratament de impermeabilizare suplimentar suprafeței de beton, rezistent la eventuali agenți de stingere | mortar cristalizant/membrană PVC-P sudată |
| Guri de vizitare | Minimum 2 guri de vizitare cu capac etanș, pentru inspecție și vidanjare | capac fontă/composit, ramă etanșă |
| Preaplin controlat | Conductă de preaplin dirijată către un punct de colectare controlat (nu direct în emisar), cu clapetă de reținere | Dn conform calcul debit de vârf |
| Semnalizare nivel | Traductor de nivel cu alarmă la umplere (interfață SCADA) | conform memoriul de instalații |
| Marcaj | Placă de identificare „Bazin retenție ape de stingere — NU se descarcă fără analiză" | placă rezistentă la intemperii |

### D07 — Cabina EMS/SCADA: platformă/fundație, rampă de acces, prag „la zero" (sc. 1:10)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Platformă/fundație cabină | Similară, la scară redusă, platformei-suport container | conform memoriul de structură |
| Prag de acces | Denivelare maximă 2,0 cm, teșită la peste 0,5 cm | conform NP 051-2012, aplicat la nivelul minim rezonabil pentru ocupare ocazională |
| Rampă/platformă de acces | Dacă diferența de cotă față de platforma rutieră depășește pragul admis, se prevede rampă cu pantă ≤8% | lățime liberă ≥1,20 m |
| Pardoseală exterioară acces | Pantă 1,5-2% spre exterior, evitare băltire la ușa cabinei | dală/beton amprentat |
| Grup social minim | Racord la rețeaua de canalizare a incintei (dacă cabina include grup sanitar) | conform memoriul de instalații |

### D08 — Marcaj și semnalistică de identificare a pericolului pe container și pe incintă (sc. 1:10)

Detaliul stabilește poziționarea și fixarea marcajelor de pericol impuse de securitatea la incendiu și de transportul mărfurilor periculoase, tratate la nivel de principiu în memoriul de arhitectură DTAC cap. 6.5 și 18.

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Panou pericol electric | Pictogramă tensiune periculoasă DC + valoare maximă tensiune sistem | placă aluminiu/PVC rezistent UV, conform SR EN 12899-1 pentru fixare |
| Panou pericol chimic (baterie Li-ion) | Pictogramă pericol chimic + cod de transport marfă periculoasă aplicabil bateriilor litiu | placă certificată, dimensiune conform convenției IEC/UL |
| Etichetă capacitate energetică container | Marcaj cu energia stocată per container (util echipei de intervenție) | gravură/etichetă rezistentă |
| Puncte de izolare electrică | Marcaj vizibil al poziției întrerupătoarelor de izolare (E-stop) | placă fluorescentă + iluminat de siguranță |
| Fixare marcaje | Prindere mecanică pe carcasa containerului, fără perforare a anvelopei EI 120 | adezivi/cleme certificate compatibile cu anvelopa |
| Poziționare pe incintă | Panou general la poarta de acces, cu planul incintei și punctele de izolare | conform D04 |

Cerință de coordonare: fixarea marcajelor pe carcasa containerului nu perforează anvelopa rezistentă la foc (EI 120) și nu obstrucționează panourile de ventilație a deflagrației — poziția marcajelor se validează cu producătorul de container la faza de montaj.

### D09 — Trench cabluri de medie tensiune: capac carosabil, etanșare (sc. 1:10)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Corp trench | Canal din beton armat/elemente prefabricate | conform memoriul de structură (secțiune, adâncime) |
| Capac carosabil | Capace din beton armat/composit, demontabile, cu portanță conform traficului suprapus | clasă de încărcare conform poziție (pietonal/carosabil ISU) |
| Etanșare la penetrări | Manșoane etanșe la traversarea pereților trenchului de către cabluri | conform memoriul de instalații |
| Drenaj interior trench | Pantă minimă spre punct de colectare, evitare băltire | ≥0,5% |
| Semnalizare | Marcaj „ATENȚIE CABLU MT" pe capace | conform normativ electric |

### D10 — Rost de dilatație platformă rutieră/culoar de intervenție (sc. 1:5)

| Poziție rost | Element de acoperire | Cerință |
|---|---|---|
| Platformă/drum betonat | Profil metalic/mastic elastic, rezistent la trafic ISU | joc conform calcul structură, plan cu îmbrăcămintea |
| Platformă container-platformă rutieră | Chit poliuretanic pe fond de rost | v. D01 |
| Rost transformator/PCS-platformă | Rost elastic etanșat, previne infiltrarea eventualelor scurgeri de ulei spre platforma vecină | conform D13 |

Rostul nu se rigidizează cu mortar; se dimensionează conform calculului structural (memoriul de structură) și se tratează cu materiale elastice compatibile cu traficul greu al autospecialelor.

### D11 — Copertină/protecție solară și direcționare panouri de ventilație a deflagrației (sc. 1:10)

Detaliul tratează, la nivel de coordonare arhitectură-echipament, verificarea orientării panourilor de suprapresiune (venting) ale containerului și, opțional, protecția suplimentară față de radiația solară directă pe fața cea mai expusă.

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Panou de venting container | Poziționat de producător pe fața opusă ușilor de acces sau pe plafon, orientat spre direcție liberă | conform NFPA 68/69, EN 14994 — verificat la montaj |
| Zonă liberă în fața panoului | Fără obstacole (gard, cabină, vegetație înaltă) pe direcția de deschidere | conform distanțe de siguranță cap. 5 DTAC |
| Copertină de protecție solară (opțional) | Element ușor, neinflamabil, care nu obstrucționează panoul de venting | tablă perforată/structură metalică deschisă |
| Vopsea reflectorizantă | Culoare sobră deschisă (gri/alb), coeficient de reflexie solară majorat | conform cap. 6.6 arhitectură DTAC |

### D12 — Drenaj platformă container: pantă, canal periferic, protecție la scurgeri accidentale (sc. 1:10)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Pantă platformă | Pantă ≥1% spre canalul periferic al platformei | conform memoriul de structură |
| Canal periferic | Rigolă îngustă la conturul platformei, sub nivelul acesteia | beton/polimer-beton, racordată la D05 |
| Prag de reținere (bund) | Prag perimetral scund la platforma zonei PCS/transformator, pentru reținerea eventualelor scurgeri minore de ulei dielectric înainte de infiltrare | h=5-10 cm, cu deversor controlat spre cuva de retenție ulei |
| Protecție anticorozivă rigolă | Verificare compatibilitate cu eventuali agenți de stingere | conform fișă tehnică material |

### D13 — Platformă echipament PCS/transformator: prag de reținere (bund) + racord la cuva de retenție ulei (sc. 1:10)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Platformă transformator | Platformă/fundație dedicată, conform memoriul de structură | C25/30, XC2+XF1/XF3 |
| Cuvă de retenție ulei | Structură etanșă, dimensionată la volumul total de ulei al transformatorului + rezervă ploaie | C30/37, XA1 (memoriul de structură) |
| Strat de pietriș/filtrare (opțional) | Strat filtrant deasupra cuvei, care reține uleiul și lasă apa pluvială să se scurgă | pietriș spălat, grosime conform proiect |
| Separator hidrocarburi | Pe traseul de evacuare a apei pluviale filtrate din cuvă | conform normativ apă uzată |
| Acces mentenanță | Culoar de acces la echipament, racordat la drumul perimetral, fără traversarea zonei de containere (cap. 8.3 arhitectură DTAC) | lățime ≥1,20 m |

### D14 — Balustradă/parapet de protecție la bazinul de retenție și la trepte de nivel (sc. 1:10)

| Element | Descriere execuție | Material / dimensiune |
|---|---|---|
| Parapet perimetral bazin retenție | Parapet de protecție acolo unde bazinul creează o diferență de nivel accesibilă personalului | h=90-100 cm, conform siguranța în exploatare |
| Balustradă la trepte/rampe (dacă apar denivelări de sistematizare) | Mână curentă continuă, conform cerințe generale de siguranță | Ø 4-5 cm, prindere la interax ≤1,0 m |
| Finisaj | Metal zincat/vopsit, rezistent la exterior | conform clasa de coroziune C3-C4 |

---

## PTh-A.2 TABLOU DE TÂMPLĂRIE, PORȚI ȘI ELEMENTE DE ÎNCHIDERE (nivel PTh)

Nomenclatorul dezvoltă la nivel de fișă tehnică per poziție elementele de închidere ale incintei și ale cabinei EMS/SCADA — nu există tâmplărie de clădire civilă propriu-zisă (containerele sunt produse industriale certificate, cu ușile proprii tratate ca parte a echipamentului, nu a proiectului de arhitectură, conform cap. 6.1 al memoriului de arhitectură DTAC), dar cabina EMS și punctele de acces în incintă necesită un tablou complet, cu date de comandă și performanțe.

### PTh-A.2.1 Porți și accese carosabile/pietonale

| Poz. | Denumire / amplasament | Gabarit (l×h mm) | Tip | Rezistență/clasă | Automatizare | Feronerie/control acces | Buc. |
|---|---|---|---|---|---|---|---|
| P1 | Poartă carosabilă acces principal | conform lățime drum acces (≥3,8-6,0 m) × 2200 | glisantă pe șină, cadru metalic zincat | rezistență la vânt clasă industrială | motor electric + telecomandă + breakglass ISU | card/cod + cheie universală incendiu | 1 |
| P2 | Poartă pietonală acces personal | 1000×2100 | batantă, cadru zincat | — | — | control acces card/cod | 1 |
| P3 | Poartă secundară de intervenție (a 2-a latură) | conform D03/D04 | batantă sau glisantă | — | telecomandă/breakglass | cheie universală ISU | 1 |
| P4 | Poartă zonă PCS/transformator (dacă separată) | 1500×2100 | batantă dublă, zincată | separare risc electric | — | broască cu cheie dedicată operator | 1 |

### PTh-A.2.2 Tâmplărie cabină EMS/SCADA

| Poz. | Denumire / amplasament | Gol (l×h mm) | Rezistență la foc | Sens deschidere | Feronerie | Obs. | Buc. |
|---|---|---|---|---|---|---|---|
| C1 | Ușă acces principal cabină | 1000×2100 | — | batantă, sens evacuare | broască + mâner ergonomic | prag „la zero" conform D07 | 1 |
| C2 | Fereastră cabină (dacă prevăzută) | 1000×1200 | — | oscilobatantă | feronerie perimetrală | protecție solară recomandată | 1-2 |
| C3 | Ușă interioară grup social (dacă prevăzut) | 800×2100 | — | batantă | broască | — | 1 |

### PTh-A.2.3 Panouri și elemente de închidere ale containerelor (informativ, echipament certificat de furnizor)

| Element | Descriere | Certificare | Rol arhitectural |
|---|---|---|---|
| Ușă principală acces container | Ușă etanșă, rezistență la foc EI2 60-C | producător container, conform NFPA 855 §9 | verificare orientare spre culoar intervenție (D01, cap. 6.3 arhitectură DTAC) |
| Hatch-uri de vizitare | Deschideri suplimentare de acces rapid | producător container | poziționare accesibilă din culoar |
| Panouri de venting | Panouri de suprapresiune | NFPA 68/69, EN 14994 | verificare direcție liberă (D11) |
| Carcasă exterioară container | Anvelopă EI 120 | UL 9540, NFPA 855 | integritate — fără perforări pentru marcaje (D08) |

Note tâmplărie PTh:
- Porțile de acces carosabil se dimensionează, obligatoriu, la gabaritul minim de trecere impus de Ord. MAI nr. 129/2016 pentru autospecialele ISU (lățime, înălțime liberă) — a se vedea cap. 10.2 din memoriul de arhitectură DTAC.
- Toate porțile carosabile de pe traseul de intervenție dispun de sistem de deblocare manuală de urgență (cheie universală/breakglass), funcțional și la căderea alimentării electrice.
- Tâmplăria cabinei EMS respectă, la nivelul minim rezonabil impus de regimul de ocupare ocazională (cap. 9.3 arhitectură DTAC), cerințele NP 051-2012 pentru accesul personalului de mentenanță/audit.

---

## PTh-A.3 SPECIFICAȚII TEHNICE DE FINISAJE ȘI MATERIALE DE AMENAJARE (fișă per zonă)

Spre deosebire de o clădire civilă, finisajele unei platforme BESS se limitează la suprafețele exterioare de circulație/platformă, la cabina EMS și la elementele de protecție/semnalizare — nu există finisaje interioare de tip locuit. Cerințe transversale:

- toate materialele exterioare rezistă la ciclurile de îngheț-dezgheț (clasă de expunere XF conform memoriul de structură) și la radiația UV pe toată durata de exploatare (≥20 de ani, conform cap. 3.5 memoriul de structură);
- finisajele containerelor nu se modifică față de cele certificate de producător (cap. 6.6 arhitectură DTAC) — se admite doar completarea cu marcaje conform D08;
- toate elementele metalice exterioare (împrejmuire, structuri suport, capace) au protecție anticorozivă minimă C3-C4 (SR EN ISO 12944), conform cap. 3.3 memoriul de structură.

### PTh-A.3.1 Fișă finisaje — platforme container, PCS, transformator

| Element | Produs-tip | Clasă / performanță | Punere în operă |
|---|---|---|---|
| Suprafață beton platformă | Beton aparent, eventual tratament de suprafață antiderapant | C25/30, XC2+XF1/XF3 (memoriul de structură) | conform D01, pantă ≥1% |
| Marcaj amprentă/ancoraj | Vopsea de trafic reflectorizantă | rezistentă UV/uzură | conform D01 |
| Bund/prag reținere PCS-transformator | Beton monolit, etanșat | conform D13 | pantă spre cuvă retenție |

### PTh-A.3.2 Fișă finisaje — drumuri și culoare de intervenție

| Element | Produs-tip | Clasă / performanță | Punere în operă |
|---|---|---|---|
| Îmbrăcăminte drum perimetral inelar | Beton rutier sau asfalt bituminos, funcție de soluția adoptată | portanță conform Ord. MAI 129/2016 (cap. 10.2 DTAC) | strat de balast compactat ≥98% Proctor + strat de bază |
| Bordură delimitare | Beton prefabricat | rezistență la trafic greu | conform D02 |
| Marcaj rutier incintă (sensuri, benzi de circulație) | Vopsea de trafic | reflectorizantă, clasă retroreflexie conform SR EN 1436 | aplicare pe suport uscat |

### PTh-A.3.3 Fișă finisaje — cabina EMS/SCADA

| Element | Produs-tip | Clasă | Punere în operă |
|---|---|---|---|
| Anvelopă exterioară | Panou sandwich/container tehnic prefabricat | izolație termică conform C107, IP conform mediu exterior | montaj pe platformă/fundație dedicată |
| Pardoseală interioară | Pardoseală tehnică antistatică (echipamente electronice) | rezistivitate conform cerință echipamente SCADA | montaj pe placă suport |
| Pereți interiori | Panouri lavabile/vopsea lavabilă | rezistent la umiditate moderată | 2 straturi |
| Acces exterior | Prag „la zero", pardoseală antiderapantă | R10-R11 | conform D07 |

### PTh-A.3.4 Fișă finisaje — împrejmuire și semnalistică

| Element | Produs-tip | Clasă | Punere în operă |
|---|---|---|---|
| Panouri gard | Plasă bordurată/panouri zincate | zincare SR EN ISO 1461 | conform D03 |
| Stâlpi gard | Profil metalic zincat | clasă coroziune C3-C4 | fundație izolată, conform D03 |
| Panouri semnalistică pericol | Aluminiu/PVC rezistent UV | conform SR EN 12899-1 | fixare mecanică, conform D08 |
| Vopsea containere (completare eventuală) | Doar conform specificație producător, culoare sobră | reflexie solară | fără modificare anvelopă certificată |

### PTh-A.3.5 Fișă finisaje — perdea vegetală perimetrală

| Element | Produs-tip | Clasă | Punere în operă |
|---|---|---|---|
| Specii vegetale perimetrale | Specii locale, rezistente la condiții de sol/climă a amplasamentului, fără rădăcini agresive pentru fundații/rețele îngropate | conform proiect peisagistic (cap. 17 arhitectură DTAC) | plantare la distanță de siguranță față de trenchuri și platforme |
| Sol vegetal/amendamente | Strat de pământ vegetal pe zona de plantare | conform proiect peisagistic | grosime minimă conform specie |
| Sistem de udare (opțional) | Irigare prin picurare, dacă climatul o impune la instalare | — | traseu coordonat cu rețelele îngropate |

---
