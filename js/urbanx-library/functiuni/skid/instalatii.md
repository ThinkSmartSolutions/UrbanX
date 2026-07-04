## 1. Date generale și specificul GPL

Memoriu de instalații DTAC pentru **SKID GPL** — stație de distribuție GPL auto: rezervor GPL suprateran pe skid, grup de pompare antiex, dispenser, punct descărcare autocisternă, cabină operator.

| Element | Valoare |
|---|---|
| Capacitate stocare | ~5.000 kg (rezervor 11,5 mc geometric, 85% umplere) |
| Categoria de importanță | C; clasa seismică III |
| Grad RF | II; categorie pericol P118: risc mare (deflagrație) |
| Suprafață platformă | 200-250 mp betonată |

**GPL — proprietăți determinante:** mai greu decât aerul (densitate vapori 1,55-2,0 vs aer → **acumulare la sol, în cămine/canale**); raport expansiune lichid→gaz ~1:250 (scurgere mică → volum mare de vapori); LIE/LSE ~1,8-9,5% vol; **energie minimă de aprindere ~0,25 mJ** (o scânteie electrostatică aprinde → egalizare+antistatic obligatorii); presiune vapori 40°C ~3,8-13,8 bar (supape dimensionate la scenariul de incendiu).

**Cadru normativ:** NTPEE-2018, ISCIR PT C7/PT C4, HG 245/2016 (ATEX echipamente) + HG 1058/2006 (zone Ex), SR EN 60079-10-1/-14/-0/-1/-7/-11, I7/2011, I5/2010, P118-2/3, OUG 195/2005, SR EN 12542/13341 (rezervoare GPL).

## 2. Instalația tehnologică GPL

**Flux:** aprovizionare (autocisternă → egalizare/împământare → transvazare) → stocare (rezervor la presiune proprie) → pompare (pompă preia faza lichidă) → distribuție (dispenser → pistol).

**Rezervor:** cilindric orizontal suprateran pe skid; V geometric 11,5 mc (util 9,775 mc, 85%); ~5.000 kg; oțel P265GH/P355GH; **PS = 17,65 bar**; presiune probă 1,43×PS ≈ 25,2 bar; ISCIR PT C7; vopsea reflectorizantă. **Armături de siguranță:** 2 supape de siguranță (una rezervă, evacuare dirijată), indicator nivel cu limitator 85%, manometru, termometru, robinet fază lichidă cu supapă exces debit, robinet fază gazoasă, robinet purjare, supape exces debit pe toate racordurile (multivalvă).

**Grup pompare:** pompă centrifugă/palete antiex (Ex d IIB T4), debit 40-60 l/min, supapă by-pass (recirculare la închidere dispenser), protecție mers în gol. **Dispenser:** debitmetru volumetric, ansamblu certificat ATEX, furtun cu conductor de egalizare, pistol etanș, **dispozitiv de rupere (breakaway)** autoetanșant la smulgere, robinet sectorizare cu supapă exces debit.

**Conducte:** oțel fără sudură, fază lichidă PS ≥ 25 bar / gazoasă ≥ 17,65 bar; îmbinări sudate (se evită filete în zone risc); robinete sectorizare la rezervor/pompă/dispenser/descărcare; **supape hidraulice de descărcare** pe tronsoane închise (dilatare lichid captiv); **ESD** (robinete acționate de la distanță). **Punct descărcare autocisternă:** cuplaj rapid + supapă reținere, racord fază gazoasă (recuperare vapori), bornă împământare, buton ESD local.

## 3. Zonarea ATEX (SR EN 60079-10-1)

| Zonă | Definiție | Frecvență |
|---|---|---|
| Zona 0 | permanent/perioade lungi | >1.000 h/an |
| Zona 1 | probabil în funcționare normală | 10-1.000 h/an |
| Zona 2 | accidental, scurtă durată | <10 h/an |

GPL greu → zonele se extind la sol + în adâncituri (cămine = zona 1).

| Sursă | Zonă | Rază |
|---|---|---|
| Interior rezervor | 0 | volum interior |
| Supapă siguranță (evacuare) | 1 | 1,0 m (zona 2 până la 3,0) |
| Armături rezervor (multivalvă) | 1 | 1,5 m (zona 2 la 3,0) |
| Pompă GPL | 1 | 1,0 m (zona 2 la 3,0) |
| Dispenser — carcasă/pistol | 1 | 0,5 m (zona 2 la 1,5) |
| Punct descărcare — racord | 1 | 1,5 m (zona 2 la 4,5) |
| Cămine/canale în zona risc | 1 | volum |

**Grupa gaz IIA** (min., recomandat IIB), **clasa temperatură T2** (uzual T3/T4 cu marjă). EPL: zona 0→Ga, 1→Gb, 2→Gc. Echipamente admise: zona 0 „ia"; zona 1 „d/e/ib/p"; zona 2 + „n/ec". Echipamentele fără marcaj Ex **interzise** în zone. **Perimetrul ATEX nu depășește limita de proprietate.**

## 4. Instalația electrică în mediu exploziv

Principiu: scoaterea din zonele Ex a tot ce nu e strict necesar. **TGD în afara zonei Ex** (cabină); schema TN-S; RCD 30 mA pe prize; circuit ESD dedicat.

**Echipamente Ex:** motor pompă Ex db IIB T4; detectoare gaz Ex d/ia; iluminat platformă Ex de/ec IIB T3 IP66; dispenser certificat ATEX; cutii conexiuni Ex e/d; butoane ESD Ex d. **Cabluri** armate, în tub etanș/îngropat, **presetupe Ex cu barieră** (sealing anti-migrare gaz); circuite securitate intrinsecă separate (manta albastru-deschis).

**Iluminat antiex:** platformă (zona 2) Ex ec/de IP66 LED ≥ 50 lx; descărcare ≥ 100 lx Ex; iluminat de siguranță autonomie ≥ 1 h; comandă din afara Ex.

**Priză de pământ + egalizare antistatică (CEA MAI CRITICĂ măsură — EMA 0,25 mJ):** priză generală R ≤ **4 Ω** (electrozi + platbandă OL-Zn); egalizare de potențial (bonding) a TUTUROR elementelor metalice (rezervor, skid, pompă, conducte, dispenser, estacadă, gard, punct descărcare) la o bară comună; punți (jumper) peste flanșe/furtunuri; continuitate < 10⁶ Ω; verificare la PIF + anual.

**Paratrăsnet (SR EN 62305, I7):** obligatoriu, **nivel de protecție I** (risc explozie); captare + coborâri + priză dedicată ≤ 10 Ω interconectată cu cea generală; SPD pe TGD.

## 4B. Împământarea autocisternei la descărcare

Momentul cu cel mai ridicat risc electrostatic (curgerea lichidului generează sarcini).

| Măsură | Cerință |
|---|---|
| Clemă antistatică (crocodil) | OBLIGATORIE — la șasiu ÎNAINTE de cuplarea furtunurilor |
| Bornă egalizare fixă | la punctul de descărcare, legată la priză ≤ 4 Ω |
| Interblocare | transvazarea nu pornește fără confirmarea legăturii (recomandat) |
| Secvență | staționare → oprire motor → clemă → verificare → cuplare fază gazoasă → fază lichidă → transvazare (deconectare inversă, clema ultima) |
| Continuitate autocisternă-pământ | < 10 Ω |

## 5. Detectare gaze + oprire de urgență (ESD)

**Detectoare de gaz LA SOL** (10-30 cm, GPL greu), Ex, în zonele de risc (rezervor, pompă, dispenser, descărcare, cămine). Praguri: **10% LIE (avertizare), 20% LIE (alarmă + ESD)**. Min. 3-4 detectoare; centrală în afara Ex cu afișaj + jurnal + sursă neîntreruptibilă (≥ 1 h); semnalizare optică+acustică; calibrare semestrială.

**ESD** (la 20% LIE sau buton): oprire pompă; închidere robinete sectorizare (electrovane NÎ pe rezervor); oprire dispenser; sirenă+lampă; deconectare receptoare Ex neesențiale; notificare local/distanță. Butoane ciupercă roșie Ex la dispenser/descărcare/ieșire/cabină. Repunere **numai manual** după verificare.

## 6. Instalații PSI

Strategia GPL = **RĂCIREA rezervorului** (prevenire BLEVE), nu stingerea jetului.

**Răcire/stingere rezervor cu apă pulverizată (deluge/drencer) — instalația critică:**

| Parametru | Valoare |
|---|---|
| Intensitate stropire | min. 10 l/min·mp suprafață rezervor |
| Suprafață rezervor | ~30-35 mp |
| Debit răcire | ~350-420 l/min (~21-25 mc/h) |
| Declanșare | manuală (vană) + automată (detecție incendiu/temperatură) |
| Duze | pulverizatoare deschise pe generatoarea superioară |
| Timp funcționare | min. 60 min |

**Rezervă apă:** min. 25 mc răcire + hidranți; grup pompare (principală + pilot + rezervă). **Hidranți exteriori** supraterani DN100, ≥ 5 l/s, la ≤ 50 m, racord tip B pompieri. **Stingătoare:** pulbere ABC transportabil **P50 (pe roți)** la rezervor + descărcare; P6 la dispenser/cabină; CO₂ la tablou. **Detecție incendiu:** detectoare de flacără UV/IR + termocuple pe rezervor (declanșează deluge + ESD); centrală + buton manual.

## 7. Instalații sanitare

Cabină: apă rece (rețea/put + contor), ACM boiler electric, lavoar + WC, **duș de urgență / spălare ochi** recomandat lângă zona tehnologică (contact GPL — arsuri prin frig); canalizare menajeră (rețea/fosă etanșă). **Pluviale platforme:** rigole → **separator de hidrocarburi clasa I** (coalescent, < 5 mg/l la ieșire) înainte de deversare; căminele din zona GPL tratate ca acumulare gaz (incluse în ATEX).

## 8. Ventilare

Platforma tehnologică în aer liber → **ventilare naturală permanentă** (menține zonele Ex reduse); interzise incinte închise neventilate; profilare fără gropi (gaz greu). Cabină: naturală + mecanică (1-2 sch/h, GS 25-50 mc/h). Spații închise cu echipamente GPL (de evitat): ventilare mecanică la sol (aspirație joasă) ≥ 6 sch/h, ventilator **antiex** + detector cu interblocare.

## 9. Măsuri de siguranță ATEX/GPL

Interzicerea surselor de foc (fumat/flacără/sudură — permis lucru cu foc); semnalizare (Ex, fumat interzis, opriți motorul); echipamente Ex certificate; egalizare + antistatic (cap. 4.6, 4b); supape de siguranță dimensionate la incendiu (ISCIR); ESD; detecție gaz+incendiu cu interblocări; **Document privind protecția la explozie (DPE)** obligatoriu (HG 1058/2006); instruire ATEX + plan de intervenție + exerciții; îmbrăcăminte antistatică + încălțăminte disipativă; scule antiscântei (bronz/alamă).

## 10. Protecția mediului (OUG 195/2005)

**Cuvă de retenție** sub rezervor (capacitate min. = volumul rezervorului), betonată etanșă cu drenaj prin separator; **separator hidrocarburi clasa I** pe platforme (< 5 mg/l); recuperarea vaporilor la descărcare (racord fază gazoasă — reducere COV); monitorizarea apei evacuate; gestionarea deșeurilor (separator vidanjat autorizat); platforme impermeabilizate; zgomot pompe în limite (STAS 10009); supape — evacuare dirijată în sus; plan pentru poluări accidentale.

## 11. Concluzii și verificare tehnică

Soluțiile asigură funcționarea în siguranță: rezervor certificat ISCIR (PT C7) cu armături de siguranță; vehiculare prin pompă/conducte antiex cu breakaway; zonare ATEX riguroasă cu echipamente certificate (HG 245/2016); instalație electrică cu TGD în afara Ex + **priză ≤ 4 Ω + egalizare + antistatic + clemă autocisternă**; detecție gaze la sol (10/20% LIE) + ESD; PSI centrat pe **răcirea rezervorului cu apă pulverizată (deluge, 10 l/min·mp, 60 min)** + hidranți + P50 + detecție flacără; măsuri de mediu (cuvă, separator, recuperare vapori).

**Verificare tehnică** (Legea 10/1995) verificatori atestați MDLPA: **Is** (sanitare, apă incendiu), **It** (tehnologic GPL, ventilare, presiuni), **Ie** (electric, ATEX, priză, paratrăsnet, detecție, ESD), + securitate la incendiu. Se anexează referatele, scenariul de securitate la incendiu, **Documentul privind protecția la explozie (DPE)** și autorizațiile ISCIR ale recipientului. Corelare obligatorie cu arhitectura, rezistența, scenariul SU și documentația tehnologică GPL avizată ISCIR.
