# CAIET DE SARCINI — LUCRĂRI DE ARHITECTURĂ, AMENAJĂRI ȘI INFRASTRUCTURĂ DE INCINTĂ (FAZA PTh) — PARC FOTOVOLTAIC

*Specificație tehnică de execuție, control al calității și recepție parțială pentru lucrările de arhitectură și de infrastructură necesară funcționării ale unei centrale electrice fotovoltaice (CEF / parc FV) la sol. Cuprinde: împrejmuirea perimetrală și sistemele de securitate integrate, clădirea de comandă/control și anvelopele PT/stație, drumurile și platformele de incintă, drenajul și gestionarea apelor pluviale, sistematizarea verticală, amenajarea peisagistică, semnalizarea și avertizarea de pericol electric, managementul deșeurilor la execuție și la dezafectare, precum și verificarea distanțelor de amplasare față de infrastructuri și de zone protejate. Document de fază Proiect Tehnic de execuție (PTh), componenta arhitectură–amenajări–infrastructură de incintă.*

**Metodologie PARAMETRICĂ.** Toate cantitățile se exprimă în funcție de puterea instalată `P_DC` (kWp) și, derivat, de suprafața de incintă `S_teren = f(P_DC, GCR)` — a se vedea memoriul de arhitectură al funcțiunii. Standardul de execuție, toleranțele, clasele de material și probele de recepție sunt de **natură calitativă și NU depind de mărimea parcului**: sunt aceleași la 500 kWp ca la 50 MWp; ceea ce scalează sunt exclusiv *cantitățile* (metri liniari de gard, număr de porți și camere CCTV, lungimea drumurilor, volumul de retenție pluvială, suprafața de covor vegetal, numărul de plăcuțe de avertizare). Oriunde apar cantități, ele se dau ca formulă parametrică, iar valorile numerice concrete sunt oferite doar ca **exemplu de calibrare pentru un parc de 2.000 kWp (~2,2 ha)**, fără a constitui o valoare impusă.

**Categoria de importanță:** C — normală (HG 766/1997, Anexa 3). **Clasa de importanță/expunere seismică:** III (γ_I,e = 1,0). **Grad de rezistență la foc PT/cabină:** II. **Clasa de execuție a structurilor metalice de incintă (gard, suporți):** EXC2 (SR EN 1090-2).

> **Delimitare de conținut (fără duplicare).** Prezentul caiet de sarcini NU descrie *soluția* de arhitectură și de organizare a câmpului — geometria mesei, unghiul β, pitch-ul, GCR, dimensionarea câmpului — care este obiectul *Memoriului tehnic de arhitectură* al funcțiunii, la care se face trimitere. NU tratează execuția structurilor de susținere a modulelor (piloți/șuruburi, profile, ancoraje) — obiect al *Caietului de sarcini de rezistență / structuri*. NU tratează instalațiile electrice DC/AC, PT/stația ca echipament, împământarea, paratrăsnetul, SCADA sau LES MT — obiect al *Caietelor de sarcini de instalații electrice*. NU reia procedura generală de recepție a obiectivului și commissioning-ul (HG 273/1994, IEC 62446, PE 116) — obiect al documentului *Program de recepție, punere în funcțiune și urmărire în exploatare*. Prezentul caiet **prescrie execuția și calitatea** categoriilor de lucrare de arhitectură și de infrastructură de incintă: standardul materialelor, tehnologia de punere în operă, condițiile de mediu la aplicare, toleranțele admise și verificările/probele de recepție parțială pe fază, corelate cu PCCVI și cu fazele determinante stabilite cu ISC, fără a le repeta.

---

## 1. Prevederi generale

### 1.1 Obiectul caietului de sarcini

Prezentul caiet de sarcini reglementează execuția lucrărilor de arhitectură, de amenajare și de infrastructură de incintă ale parcului fotovoltaic: împrejmuirea perimetrală cu porți și fundațiile stâlpilor de gard; sistemul antiefracție de detecție perimetrală și integrarea sistemului de televiziune cu circuit închis (TVCI/CCTV) în partea de construcții (stâlpi, tubulaturi, fundații, camere de tragere); clădirea de comandă/control și anvelopele prefabricate ale postului/stației de transformare (fundații, platforme, finisaje, anvelopă termică, sanitar, accesibilitate); drumurile interioare de incintă și platformele tehnice (structură rutieră, racord la drum public, raze de viraj pentru transportul transformatorului); sistemul de drenaj și de gestionare a apelor pluviale (rigole, drenuri, bazine/tranșee de infiltrare); sistematizarea verticală (săpături, umpluturi, cote, pante); amenajarea peisagistică (perdele vegetale, covor vegetal între rânduri, gazon, plantații); semnalizarea, marcajele și avertizările de pericol electric; managementul deșeurilor la execuție și la dezafectare (inclusiv fluxul DEEE).

Caietul se aplică integral executantului general și tuturor subcontractanților de specialitate (montatori de împrejmuiri, constructori de drumuri, aplicatori de hidroizolații, montatori de anvelope prefabricate, echipe de amenajări peisagistice, instalatori de sisteme de securitate în partea de construcții) și constituie parte a documentației contractuale. În caz de neconcordanță între piese, ordinea de prioritate este: dispozițiile scrise de șantier vizate de proiectant → detaliile de execuție (DDE) → prezentul caiet de sarcini → planșele de arhitectură/amenajări → memoriul de arhitectură. Cifrele metrice indicate (grosimi, cote, toleranțe, cantități-exemplu) sunt de referință pentru gabaritul-exemplu de mai sus; ele se verifică și se ajustează pe amplasamentul și proiectul real, dar toleranțele și clasele de calitate prescrise rămân valori-limită obligatorii, indiferent de putere.

### 1.2 Standarde și normative de referință (cadru)

Execuția și recepția lucrărilor din prezentul caiet se conformează, fără a se limita la, următoarelor acte, în edițiile în vigoare la data execuției:

| Act normativ / standard | Obiect | Incidență în prezentul caiet |
|---|---|---|
| **Legea 10/1995** (rep. 2016) | Calitatea în construcții — cele 7 cerințe fundamentale | Cadru general al calității pe toate capitolele |
| **Legea nr. 169/2026** (CATUC), art. 264, Anexa nr. 2 | Autorizarea și conținutul DTAC/DTOE | Corelarea execuției cu documentația autorizată |
| **HG 766/1997** (Anexa 5, 6) | Regulamente de calitate; agremente; carte tehnică | Trasabilitate, agremente, verificări |
| **HG 273/1994** | Recepția lucrărilor de construcții și instalații | Corelare recepții parțiale (cadru — nedublat) |
| **C 56/2002** | Verificarea calității lucrărilor de construcții | Verificări pe faze — finisaje, izolații, drumuri |
| **P100-1/2013** | Cod de proiectare seismică | Fundații gard, anvelopă PT, cabină |
| **NP 112/2014** | Fundarea directă a construcțiilor | Fundații stâlpi gard, radiere platforme |
| **NP 074/2014** | Documentații geotehnice | Verificarea patului de fundare, categorie geotehnică |
| **C 107/2005** (părțile 1–6) | Calcul termotehnic al elementelor de construcție | Anvelopa termică a cabinei de comandă |
| **NP 051/2012** (rev.) | Accesibilizarea mediului pentru persoane cu handicap | Cabina de comandă — traseu, acces, GS adaptat |
| **Legea 448/2006** | Protecția persoanelor cu handicap | Accesibilitate — cadru |
| **NP 040/2002** | Hidroizolații | Anvelopă PT/cabină, platforme, cuvă retenție |
| **STAS 10796/1,2,3** | Construcții anexe pentru colectarea apelor — rigole, șanțuri, drenuri | Cap. drenaj pluvial |
| **NP 133/2013** | Sisteme de alimentare cu apă și canalizare | Sanitar cabină, evacuare ape uzate |
| **SR EN 752** | Rețele de canalizare și drenaj în exteriorul clădirilor | Drenaj de incintă |
| **AND 530 / PD 177** | Dimensionarea structurilor rutiere suple/nerigide | Drumuri și platforme de incintă |
| **STAS 6400 / SR EN 13242** | Straturi rutiere; agregate pentru fundații | Structura rutieră |
| **C 16/1984** | Lucrări de construcții pe timp friguros | Condiții de mediu la turnare/aplicare |
| **SR EN 10223 / SR EN 10244** | Plase și sârme de oțel; acoperiri de zinc/zinc-aluminiu | Gard din plasă bordurată |
| **SR EN ISO 1461** | Zincare termică (la cald) | Stâlpi gard, structuri metalice de incintă |
| **SR EN 1090-1/-2** | Execuția structurilor de oțel | Structuri metalice de incintă — clasa EXC2 |
| **SR EN 62676** | Sisteme de supraveghere video (CCTV) pentru securitate | Interfața de construcții a TVCI |
| **Legea 333/2003** + HG 301/2012 | Paza obiectivelor, bunurilor, valorilor | Sistem antiefracție și CCTV — cadru |
| **SR EN 12464-2** | Iluminatul locurilor de muncă exterioare | Iluminat de securitate perimetral |
| **SR ISO 3864 / HG 971/2006** | Semnalizarea de securitate și pericol | Semnalizare, avertizări pericol electric |
| **SR EN ISO 7010** | Semne grafice — pictograme de securitate | Plăcuțe de avertizare |
| **OUG 5/2015 (DEEE)** + HG 1037/2010 | Deșeuri de echipamente electrice și electronice | Managementul deșeurilor — dezafectare module |
| **Legea 211/2011** + HG 856/2002 | Regimul deșeurilor; evidența gestiunii deșeurilor | Deșeuri de execuție |
| **OG 43/1997** (rep.) | Regimul drumurilor — zone de siguranță și protecție | Distanțe de amplasare față de drumuri |
| **Legea 107/1996** (Legea apelor) + HG 930/2005 | Zone de protecție ale apelor | Distanțe față de cursuri/luciu de apă |
| **Legea 46/2008** (Codul silvic) | Regimul pădurilor și al vecinătăților | Distanță de amplasare față de fondul forestier |

Edițiile abrogate se înlocuiesc cu cele de referință echivalente, cu acordul proiectantului consemnat prin dispoziție de șantier.

### 1.3 Obligațiile executantului

Pe componenta de arhitectură–amenajări–infrastructură, executantul:

- execută lucrările numai pe baza proiectului tehnic verificat de verificator atestat MLPAT/MDLPA pe cerințele aplicabile (A — rezistență fundații, B — siguranță în exploatare, C — securitate la incendiu PT/cabină, D — igienă/sănătate/mediu, unde e cazul) și a detaliilor de execuție însușite;
- sesizează în scris proiectantul asupra oricărei neconcordanțe între proiect și teren înainte de începerea lucrării afectate, oprind execuția pe zona respectivă (tipic: cote de teren diferite de cele proiectate, pânză freatică ridicată în tranșeele de drenaj, obstacole în traseul drumului perimetral);
- respectă tehnologia de punere în operă din agrementul tehnic / instrucțiunile producătorului fiecărui sistem (anvelopă prefabricată PT, hidroizolații, sisteme de securitate) — abaterea atrage pierderea garanției de sistem;
- întocmește și menține la zi Planul Calității și PCCVI (Plan de Control al Calității, Verificări și Încercări) pe fiecare categorie de lucrare, cu punctele de control și fazele determinante;
- asigură protecția lucrărilor terminate până la recepție (protecția drumurilor proaspăt așternute la circulația de șantier, protecția plantațiilor, protecția finisajelor cabinei) și **nu acoperă lucrări ascunse fără proces-verbal de lucrări ascunse (PVLA)** semnat de dirigintele de șantier — sunt lucrări ascunse: fundațiile stâlpilor de gard, tranșeele de drenaj și de cabluri, straturile rutiere înainte de acoperire, cuva de retenție a uleiului, priza de pământ perimetrală (recepție comună cu instalațiile);
- întocmește proiectul tehnologic de execuție pe faze cu risc (lucrări la înălțime pe gard, manevre cu macaraua la descărcarea transformatorului/anvelopei PT, săpături adânci) și respectă SSM/PSI.

### 1.4 Trasabilitatea materialelor și documentele de calitate

Toate materialele introduse în operă trebuie să fie conforme cu cerințele aplicabile și însoțite de documente de conformitate: **Declarația de Performanță (DoP)** conform Reg. (UE) 305/2011 (CPR) și **marcaj CE** pentru produsele acoperite de standarde armonizate (plase și stâlpi de gard, agregate rutiere, cimenturi, membrane hidroizolante, tâmplărie, panouri de anvelopă, corpuri de iluminat); **Agrement Tehnic în Construcții** valabil pentru sisteme neacoperite de standard armonizat (sisteme de hidroizolație, ancoraje chimice, geocompozite de drenaj); **certificat de calitate/declarație de conformitate de lot** la fiecare livrare, cu identificarea lotului; **fișa tehnică de securitate (FDS)** pentru substanțele periculoase (primere, rășini, adezivi). Documentele se arhivează pe loturi în cartea tehnică. Se interzice punerea în operă a materialelor fără DoP/agrement valabil, cu termen depășit, cu ambalaj deteriorat sau cu abateri vizibile de la specificație. Executantul ține un registru de recepție calitativă la intrarea pe șantier.

### 1.5 Probe de omologare și tronsoane/suprafețe-martor

Înainte de execuția pe scară largă, executantul realizează tronsoane/suprafețe-martor aprobate de proiectant și beneficiar, care devin referință de calitate:

| Lucrare | Tronson/suprafață-martor | Rol |
|---|---|---|
| Împrejmuire | tronson-martor ~1 travee (2 stâlpi + panou) cu fundație și poartă adiacentă | validare verticalitate, aliniament, ancorare, întindere plasă |
| Structură rutieră | sector-martor ~20–30 m de drum, cu toate straturile | validare grosimi, compactare (grad Proctor), planeitate |
| Covor vegetal / gazon | parcelă-martor ~50–100 mp înierbată | validare rată de răsărire, uniformitate, specii |
| Finisaj cabină | suprafață-martor pe fiecare tip de finisaj/culoare | validare nuanță, textură, acoperire |
| Hidroizolație platformă/cuvă | tronson-martor cu racord și colț | validare etanșeitate, aderență, suprapuneri |

Suprafețele-martor se păstrează până la recepția lucrării respective; lucrarea de serie care nu atinge calitatea martorului aprobat se respinge.

### 1.6 Parametrizarea cantităților (recapitulativ)

Cantitățile de lucrări din prezentul caiet derivă din geometria incintei. Mărimile de referință și legile lor de scalare:

| Cantitate | Formulă parametrică orientativă | Exemplu 2 MWp (~2,2 ha, incintă ~150 × 147 m) |
|---|---|---|
| Perimetru incintă `P_gard` | `≈ 4 · √(S_teren)` (formă compactă) | `≈ 4 · √22.000 ≈ 593 m` → ~600 m |
| Lungime drum perimetral | `≈ P_gard − retrageri colț` | ~560 m |
| Suprafață covor vegetal inter-rând | `≈ S_câmp · (1 − GCR)` | `≈ 24.500 · 0,62 ≈ 15.200 mp` |
| Volum retenție pluvială `V_ret` | `= c · i · S_impermeabil · t_c` (§6) | funcție de suprafața impermeabilă (~1.500–2.500 mc) |
| Nr. camere CCTV | `≈ P_gard / d_acoperire` (d ≈ 40–60 m) | ~10–15 camere |
| Nr. plăcuțe avertizare | `≈ P_gard / interval` (interval ≤ 25 m) + puncte fixe | ~30–40 plăcuțe |

Perimetrul (și deci gardul, drumul perimetral, detecția, CCTV, semnalizarea) scalează cu `√(P_DC)` — parcurile mari au proporțional mai puțin perimetru pe MWp (economie de scară). Suprafețele (covor vegetal, retenție) scalează liniar cu `P_DC`.

### 1.7 Organizarea de șantier și trasarea

Înainte de începerea lucrărilor, executantul organizează șantierul cu: împrejmuire provizorie și panou de identificare a investiției; platformă de organizare (birou, vestiare, depozit, punct de colectare selectivă a deșeurilor — §9); căi provizorii de acces (de regulă pe traseul viitorului drum de acces); alimentări provizorii cu utilități; puncte de spălare a roților la ieșirea pe drumul public (evitarea murdăririi). Se stabilesc zonele de depozitare a stratului vegetal decapat (ferite de contaminare, pentru refolosire — §7.4) și zonele de manevră/descărcare pentru transporturile agabaritice (anvelopă PT, transformator).

**Trasarea** se face pornind de la bornele de coordonate ale planului de amplasament (sistem Stereo70, cote Marea Neagră 1975), materializând: conturul incintei și axul gardului, poziția porților, axele drumurilor, amprentele platformelor PT/skid și ale cabinei, punctele caracteristice ale rețelei de drenaj. Se verifică, la trasare, **distanțele de amplasare** (cap. 10) față de drumuri, cale ferată, ape și pădure, precum și retragerile din regulamentul local; orice neconcordanță oprește lucrarea și se sesizează proiectantul. Trasarea se consemnează în proces-verbal de predare a amplasamentului și de trasare a lucrărilor, semnat de proiectant, executant și diriginte.

### 1.8 Condițiile de mediu la execuție

Lucrările cu materiale sensibile la temperatură și umiditate se execută în ferestrele de condiții impuse de reglementări și de producători:

- **Betonare** (fundații gard, radiere, platforme): temperatura mediului și a betonului la punere în operă ≥ +5 °C; sub această limită se aplică măsurile de betonare pe timp friguros (C 16/1984 — încălzirea componenților, protejarea termică a betonului proaspăt, aditivi), iar la > +30 °C măsurile de betonare pe timp călduros (protejarea la evaporare, tratare umedă prelungită). Se interzice betonarea pe teren înghețat sau cu apă în groapă.
- **Hidroizolații și membrane** (cuvă, platforme, acoperiș cabină): pe suport uscat, curat, la temperatura din agrementul sistemului (de regulă +5…+35 °C), fără precipitații și fără condens; aplicarea cu flacără impune măsuri PSI (permis de lucru cu foc, mijloace de stingere la punctul de lucru).
- **Lucrări rutiere** (așternere și compactare): se evită compactarea pe teren înghețat sau saturat; balastul/piatra spartă se pune în operă la umiditatea optimă de compactare.
- **Plantări și înierbare:** în ferestrele agrotehnice (primăvară/toamnă), cu udare de instalare; se evită plantarea în perioadele de secetă/îngheț fără măsuri.
- **Lucrări la înălțime** (montaj gard, stâlpi CCTV) și **manevre cu macaraua** (anvelopă PT): se sistează pe vânt puternic conform proiectului tehnologic și normelor SSM.

---

## 2. Împrejmuirea perimetrală, porțile și fundațiile stâlpilor

### 2.1 Descrierea sistemului și standardul de material

Incinta se împrejmuiește integral pentru securitate (protecția echipamentelor de valoare și a personalului, prevenirea accesului neautorizat în mediu cu pericol electric). Sistemul prescris:

- **Panouri de plasă bordurată** (panouri rigide sudate cu bare orizontale duble la margini) din sârmă de oțel Ø ≥ 4,0 mm (uzual dublu 2×5 mm la marginile de rigidizare), ochi 50×200 mm sau 55×200 mm, **zincate termic** conform SR EN ISO 1461 (strat de zinc ≥ 70 µm) sau zinc-aluminiu, plus acoperire suplimentară cu pulbere poliesterică (RAL la alegerea proiectantului — a se vedea §7.5, culori integrate peisagistic, mate, nereflectorizante), asigurând o durată de protecție anticorozivă ≥ 25 ani (corelată cu durata de exploatare a parcului). Alternativ, plasă de sârmă zincată împletită (torsadată) pe stâlpi și rânduri de sârmă întinsă — soluție admisă la parcuri unde regulamentul nu impune panou rigid.
- **Înălțime liberă a gardului H = 2,00 m** (uzual 2,00–2,20 m) deasupra cotei terenului sistematizat — **invariant la putere**. Fără soclu continuu de beton (menținerea permeabilității terenului; permite trecerea faunei mici la baza gardului acolo unde e cerut ecologic — a se vedea §7.6); stâlpi fundați punctual.
- **Stâlpi** din profil metalic (țeavă rectangulară 60×40×2 mm sau profil dedicat de sistem) zincați termic, la interax ≤ 2,5–3,0 m, cu capac de închidere superioară; stâlpi de colț și de capăt (la porți) contravântuiți sau cu secțiune sporită.
- **Element de descurajare superior opțional** (3 rânduri sârmă ghimpată/concertină) numai unde tema de securitate o cere; nu este obligatoriu la parcurile standard.

### 2.2 Fundațiile stâlpilor de gard

- **Tipul fundației:** bloc de beton simplu izolat pentru fiecare stâlp, clasa **C12/15** minim (C16/20 la stâlpii de poartă și de colț), turnat în groapă/foraj. Dimensiuni de referință: **0,30×0,30×0,80 m** (secțiune × adâncime) pentru stâlpii curenți; **0,40×0,40×1,00 m** pentru stâlpii de colț/capăt și cei de poartă. Adâncimea de fundare se stabilește sub **adâncimea de îngheț** a zonei (conform STAS 6054, uzual 0,80–1,10 m pentru zonele climatice RO) și se ajustează după studiul geotehnic; pe terenuri slabe/coezive moi se măresc dimensiunile sau se recurge la fundare cu foraj și armare locală.
- **Verificare la solicitarea din vânt:** stâlpii de gard preiau împingerea vântului pe suprafața plasei (parțial opacă); fundația se dimensionează la răsturnare/smulgere conform CR 1-1-4/2012. Este o **fază determinantă de calitate** pe amplasamentele din zone de vânt ridicat.
- **Tehnologie:** curățarea gropii, așezare pe strat de egalizare/beton de poză 5 cm, poziționarea și verticalizarea stâlpului cu șabloane, turnarea betonului cu vibrare, protejarea la priză (tratare umedă / pe timp friguros conform C 16/1984 — fără turnare la < +5 °C fără măsuri).

### 2.3 Porțile

- **Poartă carosabilă** glisantă (autoportantă, pe consolă, fără șină la sol — recomandat pentru trecerea liberă și pentru zăpadă) sau batantă în două canaturi, **lățime liberă ≥ 4,00 m** (dimensionată pentru transportul transformatorului/anvelopei PT pe trailer și pentru autospecialele ISU — gabarit ≥ 3,50 m); înălțime egală cu gardul. Structură din profile zincate + umplutură de plasă asortată. Fundații proprii dimensionate pentru încărcarea și consola porții (grinzi/blocuri de fundare cu buloane de ancoraj).
- **Acces pietonal** separat — portiță cu lățime liberă ≥ 0,90 m.
- **Motorizare și control acces:** poartă motorizată cu automatizare, cu interfață către sistemul de control acces (integrare — a se vedea §3); dotată cu opritoare, semnalizare și fotocelule de siguranță. La parcuri mari se pot prevedea porți multiple (acces + evacuare/intervenție).

### 2.4 Tehnologia de montaj a împrejmuirii (succesiune de operații)

Montajul se execută pe secvența verificabilă:

1. **Trasarea axului gardului** pe conturul incintei, materializată cu țăruși și sârmă de trasare, cu verificarea poziției față de limitele de proprietate și față de distanțele de amplasare (cap. 10); recepția trasării de către dirigintele de șantier înainte de săpătură.
2. **Execuția gropilor/forajelor** pentru fundațiile stâlpilor la interaxul de proiect, cu verificarea adâncimii (sub îngheț) și a naturii terenului la cotă (dacă apar terenuri diferite de studiul geotehnic — sesizare proiectant).
3. **Poziționarea și verticalizarea stâlpilor** cu șabloane distanțiere și nivelă, sprijiniți provizoriu; verificarea aliniamentului pe tronson cu firul de trasare și cotelor superioare cu nivelă/aparat.
4. **Betonarea fundațiilor** cu vibrare, cu protejarea la priză; interzicerea montajului panourilor înainte de atingerea rezistenței minime a betonului (uzual 7 zile / conform proiect).
5. **Montarea panourilor de plasă** pe stâlpi cu cleme/bride de sistem, cu întinderea uniformă (fără burdușiri), racordarea la stâlpii de colț cu piese speciale, urmărirea reliefului la baza gardului (fără goluri > cele admise ecologic).
6. **Montarea porților** pe fundațiile proprii, reglarea consolei/canaturilor, montarea automatizării și proba de funcționare.
7. **Retușuri anticorozive** la eventualele zone de zincare afectate prin sudură/tăiere pe șantier — vopsea bogată în zinc (galvanizare la rece), obligatoriu (protecția zincării este critică pentru durata de 25 ani).

### 2.5 Toleranțe de execuție — împrejmuire

| Parametru | Toleranță admisă |
|---|---|
| Verticalitate stâlp | ≤ 5 mm/m înălțime; max 10 mm total |
| Aliniament (abatere de la linie) | ≤ 20 mm pe 10 m; racordare lină în curbe |
| Interax stâlpi | ± 20 mm față de proiect |
| Cota superioară a gardului (față de teren sistematizat) | ± 20 mm; racord continuu, fără trepte vizibile > 30 mm |
| Întindere plasă / planeitate panou | fără burdușiri; abatere din plan ≤ 15 mm/panou |

### 2.6 Verificări și recepție parțială — împrejmuire

- verificarea documentelor de calitate (DoP plase/stâlpi, certificate zincare, buletine beton fundații);
- PVLA pentru fundațiile stâlpilor (dimensiuni groapă, clasă beton, adâncime sub îngheț) — **lucrare ascunsă**;
- verificarea verticalității, aliniamentului și interaxelor pe eșantion (min. 10% din stâlpi, dar nu mai puțin de la tronsonul-martor și de la fiecare colț);
- proba de funcționare a porților (deschidere/închidere completă, fotocelule, opritoare, interfața cu controlul de acces);
- verificarea continuității electrice și a legării la pământ a gardului metalic (acolo unde proiectul de instalații o impune — echipotențializare) — recepție comună cu instalațiile electrice, nedublată aici.

---

## 3. Sistemul antiefracție și integrarea TVCI/CCTV (partea de construcții)

> **Delimitare:** proiectarea și punerea în funcțiune a sistemului de securitate (senzori, DVR/NVR, centrală de alarmă, transmisie) aparțin proiectului de instalații de securitate (Legea 333/2003, HG 301/2012, licențiere IGPR). Prezentul caiet prescrie **partea de construcții** a integrării: suporți, fundații, tubulaturi, camere de tragere, alimentări și interfața cu gardul.

### 3.1 Infrastructura de susținere

- **Stâlpi CCTV/iluminat** din țeavă de oțel zincat termic Ø ≥ 89 mm, înălțime **4,0–6,0 m**, cu fundație de beton armat C16/20 cu buclă de buloane de ancoraj (placă de bază), dimensionată la vânt (CR 1-1-4) și cu verificarea la răsturnare; poziționați pe **banda liberă perimetrală** (între gard și primul rând de mese), astfel încât **să NU umbrească modulele** (verificare de umbrire — corelare cu memoriul de arhitectură). Cutii de branșament/derivație IP65 pe stâlp, la înălțime accesibilă.
- **Densitatea camerelor** scalează cu perimetrul: `N_cam ≈ P_gard / d_acoperire`, `d_acoperire` ≈ 40–60 m pentru camere fixe cu IR, cu acoperire suprapusă la colțuri (fără unghiuri moarte pe linia gardului) și acoperire dedicată a zonei PT/stație și a porților.

### 3.2 Tubulaturi, camere de tragere, alimentări

- **Canalizație subterană** pentru cablurile de semnal/alimentare: tuburi de protecție din PEHD dublu perete Ø 63–110 mm, pozate la adâncime ≥ 0,60 m sub bandă înierbată / ≥ 0,80 m sub carosabil, pe pat de nisip 10 cm + acoperire 10 cm + bandă avertizoare, cu fir de tragere; **camere de tragere** prefabricate la schimbări de direcție, la stâlpi și la maxim 40 m pe traseu drept. Traseele se pozează în coridoarele de mentenanță/perimetrale, comune cu celelalte cabluri (coordonare cu instalațiile).
- **Detecția perimetrală** (senzori pe gard — fibră optică/cablu de vibrație, sau bariere IR pe stâlpi): partea de construcții asigură fixarea pe gard/stâlpi și tubulatura de conexiune; densitatea de senzori pe metru este constantă → numărul total scalează cu `P_gard`.
- **Iluminatul de securitate:** corpuri LED cu senzor de mișcare la porți și la PT/stație, montate pe stâlpii perimetrali, **orientate spre interiorul incintei** (evitarea poluării luminoase spre vecinătăți — SR EN 12464-2), consum redus; alimentare din tabloul de servicii proprii (interfața electrică — instalații).

### 3.3 Toleranțe și verificări

- verticalitate stâlp CCTV ≤ 5 mm/m; cotă placă de bază ± 10 mm; PVLA fundație stâlp (lucrare ascunsă);
- PVLA pentru canalizația subterană și camerele de tragere (adâncime, pat de pozare, bandă avertizoare) — **lucrare ascunsă**;
- proba de tragere a firului pilot pe fiecare tronson de tubulatură (continuitate, absența dopurilor);
- verificarea etanșeității cutiilor și a gradului de protecție IP declarat;
- punerea în funcțiune a sistemului (acoperire vizuală completă, integrare cu controlul de acces al porților) — recepție a instalației de securitate, nedublată aici; prezentul caiet confirmă doar predarea infrastructurii de construcții gata de tras cablu.

---

## 4. Clădirea de comandă/control și anvelopa PT/stație

### 4.1 Fundații și platforme

- **Cabina de comandă/pază** (parter, program funcțional descris în memoriul de arhitectură — cameră SCADA/pază, GS accesibil, depozit/vestiar, hol) se fundează pe **fundații continue sub ziduri** din beton C12/15–C16/20 sau, la varianta modul prefabricat/container amenajat, pe **puncte de sprijin/cadru de fundare** de beton armat cu nivelment precis. Sub pardoseală: strat de rupere a capilarității (balast compactat 15–20 cm) + hidroizolație orizontală + placă de beton armat.
- **Platforma PT/stație:** dală/radier local de **beton armat C20/25** (nu impermeabilizare de câmp), armat conform proiectului de rezistență, cu cotă superioară peste cota terenului sistematizat (min +0,15 m) pentru protecția la ape. Include **cuva de retenție a uleiului** transformatorului — **obligatorie** — dimensionată să rețină integral volumul de ulei al transformatorului (100% din volumul unei unități + rezervă), hidroizolată etanș (membrane rezistente la hidrocarburi sau beton hidrotehnic cu aditivi + tratament), fără scurgeri către sol; racord la separator de hidrocarburi acolo unde e prevăzut. Adâncimea/volumul cuvei = `f(putere transformator)` — scalează cu `P_AC`.
- **Fazele determinante** tipice: recepția patului de fundare (natura terenului conform studiu geotehnic, NP 074/2014), recepția armării radierului PT și a cuvei de retenție înainte de betonare (PVLA).

### 4.2 Anvelopa PT/stație prefabricată

Anvelopa prefabricată (beton/metal) a PT/stației se montează pe platformă cu macaraua (manevră cu risc — proiect tehnologic dedicat, §1.3), niveletă și fixată conform instrucțiunilor producătorului; grad de rezistență la foc II (anvelope incombustibile), etanșă la apă și cu ventilațiile tehnologice ale producătorului (nu se obturează). Racordurile la platformă (pătrunderi de cabluri, guri de ventilație) se etanșează. Recepția anvelopei ca echipament (celule MT, transformator, JT) aparține instalațiilor electrice.

### 4.3 Anvelopa termică a cabinei (C 107/2005)

Cabina de comandă (spațiu de lucru încălzit) se izolează termic conform C 107/2005 și Legii 372/2005: pereți cu termoizolație (vată minerală/EPS conform sistemului), acoperiș/planșeu izolat, tâmplărie performantă (geam termoizolant, U_w conform cerinței). Se verifică prin calcul absența condensului în punțile termice (colțuri, buiandrugi) și rezistența termică minimă a elementelor. La modulul/containerul prefabricat, panourile sandwich cu miez izolant asigură anvelopa termică — se verifică DoP-ul (rezistență termică declarată) și continuitatea izolației la îmbinări și la pardoseală.

### 4.4 Finisaje

Finisaje durabile, cu întreținere minimă, adecvate mediului tehnic și expunerii:

- **Exterior:** tencuială decorativă/structurată în **culori neutre, mate, nereflectorizante** (tonuri gri/verde-oliv/bej — integrate peisagistic, evitând suprafețele reflectante care pot crea disconfort vizual sau reflexii — a se vedea §7.5), sau placare metalică prevopsită; învelitoare din tablă/panou termoizolant cu pantă mică, cu tinichigerie completă (jgheaburi, burlane, șorțuri) racordată la drenajul pluvial (§6).
- **Interior:** pardoseli din gresie tehnică antiderapantă R10–R11 sau covor PVC electroizolant în camera de comandă (mediul electric); pereți zugrăviți lavabil; tavan casetat/tencuit.
- **Toleranțe de finisaj:** planeitate pardoseală ≤ 2 mm/2 m (dreptar); verticalitate pereți ≤ 3 mm/m; aspect uniform de nuanță/textură conform suprafeței-martor aprobate.

### 4.5 Accesibilitatea PMR (NP 051/2012)

Cabina de comandă/pază, ca spațiu de muncă, se proiectează și se execută **accesibil, indiferent de puterea parcului**:

- acces la parter fără prag sau, la diferență de nivel, rampă cu pantă maximă **8%** (idealul ≤ 5%), lățime liberă ≥ 1,00 m, cu mână curentă și podest de manevră; suprafață antiderapantă;
- **ușă de acces cu lățime liberă ≥ 0,90 m**, prag ≤ 2 cm teșit;
- **grup sanitar adaptat PMR:** spațiu de manevră pentru scaun rulant cu cerc liber Ø 1,50 m, bare de sprijin rabatabile, lavoar și WC la cote accesibile, ușă cu deschidere spre exterior sau glisantă;
- **traseu accesibil** continuu de la parcarea de incintă / locul de coborâre la intrarea în cabină, pe suprafață stabilă, fermă, antiderapantă, fără trepte izolate; lățime ≥ 1,20 m.

Verificarea de conformitate NP 051 este o **fază de recepție parțială** a cabinei (măsurarea lățimilor libere, pantelor, spațiilor de manevră).

### 4.6 Sanitar și utilități ale cabinei

- **Apă/canalizare:** la lipsa rețelei publice — sursă proprie (put forat autorizat) și evacuarea apelor uzate în **bazin vidanjabil etanș** sau microstație de epurare (NP 133/2013); dimensionare pentru personalul ocazional. Bazinul vidanjabil se execută etanș (probă de etanșeitate — umplere și verificare 24 h), amplasat conform distanțelor sanitare față de put și de limite.
- **Electric/ventilație:** alimentare din tabloul de servicii proprii; ventilare naturală + climatizare split pentru camera SCADA (cerințe de temperatură ale electronicii). Interfața de instalații — nedublată aici.
- **Tinichigerie și pluvial acoperiș:** jgheaburi și burlane din tablă zincată/prevopsită, dimensionate pentru suprafața de acoperiș, cu racord la rețeaua de drenaj pluvial (§6) — apa de pe acoperiș nu se descarcă la baza pereților (risc de infiltrare în fundație). Șorțuri, glafuri și racorduri etanșe la penetrări.

### 4.7 Protecția lucrărilor și organizarea recepției pe faze

Lucrările de finisaj terminate se protejează până la recepție (pardoseli proaspete acoperite, tâmplărie protejată cu folie). Lucrările ascunse (fundații, radiere, cuvă, straturi sub pardoseală, hidroizolații acoperite) **nu se acoperă fără PVLA**. Recepția pe faze se organizează în ordinea tehnologică: infrastructură (fundații, radiere, cuvă) → anvelopă (pereți, acoperiș, anvelopă termică) → finisaje → instalații de utilitate ale cabinei (interfață) → verificarea accesibilității NP 051 și a etanșeităților.

### 4.8 Verificări și recepție parțială — clădiri

- PVLA fundații/radier/cuvă retenție + pat de fundare (lucrări ascunse);
- proba de etanșeitate a cuvei de retenție ulei (umplere cu apă, verificare fără pierderi 24–48 h) — **fază determinantă**;
- verificarea anvelopei termice (control termografic recomandat, absența punților reci majore);
- verificarea finisajelor față de suprafețele-martor; verificarea conformității NP 051;
- proba de etanșeitate a hidroizolației acoperișului/platformelor (inundare/observație la ploaie).

---

## 5. Drumurile interioare de incintă și platformele tehnice

### 5.1 Clasificarea și lățimile

Rețeaua de circulație a incintei (dimensiuni de referință, invariante la putere — dictate de gabaritul vehiculelor, nu de mărimea parcului):

| Element | Lățime carosabilă | Rol |
|---|---|---|
| Drum de acces (din drumul public) | 4,00–5,00 m | transport transformator, aprovizionare, intervenție ISU |
| Drum perimetral interior (buclă) | **min 3,00 m** (uzual 4,00 m) | patrulare, mentenanță, acces blocuri, culoar CCTV, intervenție |
| Coridoare transversale de bloc | 3,00–4,00 m | acces între blocuri, legătură la buclă |

**Lățimea minimă de 3,00 m** este cerința pentru circulația utilajelor de intervenție și de mentenanță; drumul de acces principal și zonele de manevră la PT se lărgesc la 4,00–5,00 m. Bucla perimetrală se realizează **închisă (fără fund de sac)** pentru manevrarea utilajelor. Lungimea buclei = `P_gard` (scalează cu `√(P_DC)`).

### 5.2 Razele de viraj

- **Rază interioară de viraj ≥ 8–10 m** la intersecții și la platforma PT/stație, pentru **autovehiculul greu / transportul transformatorului și macaraua de descărcare** (necesită spațiu de manevră și platformă de sprijin stabilă);
- pentru **autospecialele ISU**: gabarit de gardă ≥ 3,50 m lățime și rază de viraj ≥ 12,00 m conform normelor de intervenție;
- racordul la drumul public: rază de racordare adecvată și, la parcuri mari cu trafic de transport semnificativ, benzi de accelerare/decelerare conform normelor rutiere și avizului administratorului drumului.

Razele sunt **invariante la putere** (dictate de vehicul).

### 5.3 Structura rutieră

Structură rutieră suplă/semirigidă cu îmbrăcăminte pietruită (balast/piatră spartă) — soluție de bază reversibilă, adecvată traficului redus de mentenanță; îmbrăcăminte semirigidă/bituminoasă doar pe drumul de acces și platforma PT dacă tema o cere. Alcătuire de referință (se dimensionează cu AND 530/PD 177 după traficul de calcul și portanța patului):

| Strat | Material / clasă | Grosime referință | Standard |
|---|---|---|---|
| Îmbrăcăminte | piatră spartă sort 0–63 mm, cilindrată | 10–15 cm | SR EN 13242 |
| Fundație | balast / balast stabilizat | 20–30 cm | STAS 6400 |
| Strat de formă / substrat | balast / material local ameliorat | 15–20 cm | NP 074 (pat) |
| Pat de fundare | teren natural compactat / geotextil separator | — | geotextil la pat slab |

Pe patul slab (argile, exces de umiditate) se interpune **geotextil de separare/armare** și, la nevoie, geogrilă. Pantele transversale ale drumului 2–3% pentru scurgerea apelor spre rigole (§6).

**Baza de dimensionare (AND 530 / PD 177).** Structura rutieră se dimensionează la **traficul de calcul** al parcului, care este redus dar cu o particularitate: **încărcarea excepțională a transportului transformatorului** (agabaritic, o singură dată la montaj, eventual la înlocuire) — dimensionantă pentru drumul de acces și pentru zona de manevră la platforma PT. Se stabilesc: (a) traficul mediu zilnic de mentenanță (câteva vehicule ușoare/zi — trafic foarte redus); (b) osia de calcul pentru transportul transformatorului și pentru autospecialele ISU (osii grele punctuale); (c) portanța patului (modul de deformație / CBR din geotehnic). Grosimile din tabelul de mai sus se verifică/ajustează astfel încât drumul de acces și platforma PT să suporte osia grea (frecvent impunând balast stabilizat sau strat suplimentar pe aceste tronsoane), în timp ce bucla perimetrală și coridoarele, cu trafic ușor, rămân la structura minimă pietruită. Verificarea la îngheț-dezgheț (grosime totală vs. adâncimea de îngheț, sensibilitatea la îngheț a patului) este obligatorie în zonele climatice reci.

### 5.4 Platformele tehnice

- **Platforma PT/stație:** radier de beton (§4.1), înconjurat de zonă de manevră pietruită pentru macara și mentenanță; capacitate portantă pentru transportul și așezarea transformatorului.
- **Platformele skidurilor de invertoare:** pietruite sau dale prefabricate, la centrele de greutate electrice ale blocurilor (poziționare — instalații electrice); prezentul caiet prescrie **execuția platformei** (nivelment, compactare, dală/pietruire, drenaj de suprafață) și accesul din coridorul de mentenanță. Platformele se ridică ușor peste cota terenului (protecție la ape și la vegetație), cu pantă de scurgere spre exterior și degajări de ventilație în jurul echipamentului conform cerințelor producătorului (invertorul disipă căldură — nu se obturează admisia/evacuarea de aer). Numărul de platforme scalează cu `P_AC` (număr de invertoare).

### 5.5 Compactare, toleranțe, verificări — drumuri și platforme

| Parametru | Cerință / toleranță |
|---|---|
| Grad de compactare (Proctor modificat) | pat ≥ 95%; fundație/balast ≥ 98%; îmbrăcăminte cilindrată la refuz |
| Capacitate portantă (deflexiune/placă) | conform dimensionării AND 530 (Ev2 la stratul de fundație) |
| Planeitate (dreptar 3 m) | denivelări ≤ 2–3 cm sub dreptar |
| Cota niveletei | ± 2 cm față de proiect |
| Panta transversală | 2–3% ± 0,5% |
| Lățime carosabilă | ≥ valoarea de proiect (fără reduceri sub 3,00 m) |

Verificări: PVLA pe fiecare strat înainte de acoperire (grosime, compactare — **lucrare ascunsă**); probe de compactare (Proctor, grad de compactare) pe tronsoane; verificarea nivelmentului și a pantelor; verificarea razelor de viraj executate față de proiect (probă de gabarit cu vehicul de referință recomandată la platforma PT).

---

## 6. Sistemul de drenaj și gestionarea apelor pluviale

### 6.1 Principiul: reținere, infiltrare, permeabilitate

Parcul FV are un caracter **cvasi-permeabil**: câmpul de module pe piloți/șuruburi **nu impermeabilizează** solul, iar suprafața dintre rânduri rămâne înierbată. Suprafețele efectiv impermeabile sunt reduse (platforme PT, radiere, drumuri pietruite — semi-permeabile, acoperișul cabinei). Principiul de gestionare a apelor pluviale este **reținerea și infiltrarea locală (SUDS/gestionare la sursă)**, cu evacuare controlată, evitând creșterea coeficientului de scurgere față de situația inițială și evitând erodarea solului sub module. Se interzice descărcarea concentrată și necontrolată către terenurile vecine sau către cursurile de apă.

### 6.2 Elementele sistemului

- **Rigole/șanțuri de gardă și de drum:** rigole din pământ înierbat (preferate — permeabile, integrate peisagistic) sau rigole prefabricate/betonate acolo unde panta impune protecție la eroziune; dimensionate hidraulic pentru debitul de calcul (STAS 10796). Rigolele colectează apa de pe drumuri și platforme și o conduc spre zonele de infiltrare.
- **Drenuri de suprafață** pe conturul platformelor PT și al zonelor cu risc de băltire.
- **Bazine/tranșee de infiltrare (retenție-infiltrare):** volume de retenție dimensionate pentru a prelua vârful de debit al ploii de calcul și a-l infiltra/elibera lent, protejând emisarul și vecinătățile. Se prevăd cu strat drenant (pietriș/geocompozit) și, unde solul e slab permeabil, cu supraplin controlat.
- **Protecția la eroziune:** disipatoare la gurile de descărcare, înierbare rapidă a taluzurilor rigolelor, gabarit anti-șiroire sub module pe pante; sub linia de picurare a modulelor (unde apa cade concentrat de pe marginea inferioară) se prevede, la nevoie, o fâșie de protecție (pietriș/geotextil/înierbare densă) împotriva eroziunii solului. Șanțurile și rigolele se execută cu pantă longitudinală continuă (≥ 0,3%) fără contrapante, cu secțiune verificată la debitul de calcul; la panta mare se protejează albia (pereere/dale înierbate) contra afuierii.

### 6.3 Dimensionarea parametrică a volumului de retenție

Volumul de retenție se dimensionează la ploaia de calcul, funcție de **suprafața impermeabilă**, nu de puterea electrică:

> **V_ret = c · i · S_imp · t_c**

unde `c` = coeficient de scurgere ponderat (pietruit ~0,4–0,6; beton/acoperiș ~0,9; înierbat ~0,1–0,3), `i` = intensitatea ploii de calcul (l/s·ha, funcție de frecvența de calcul și zonă), `S_imp` = suprafața (echivalent impermeabilă), `t_c` = timp caracteristic. Deoarece `S_imp` scalează sub-liniar cu puterea (economia de scară a serviciilor — drumuri/platforme scad procentual la parcuri mari), **volumul de retenție pe MWp scade cu creșterea puterii**. Se verifică capacitatea de infiltrare a solului prin **test de permeabilitate** (test de infiltrare / coeficient de permeabilitate k din geotehnic) — dacă k este insuficient, se mărește volumul de retenție și se prevede supraplin controlat spre emisar autorizat (aviz de gospodărire a apelor).

**Exemplu de calibrare (2 MWp).** Suprafețe: drumuri și platforme pietruite ~4.000 mp (c ≈ 0,5), radiere/acoperiș ~400 mp (c ≈ 0,9), covor vegetal ~15.200 mp (c ≈ 0,2). Suprafața echivalent-impermeabilă ponderată: `S_imp ≈ 4.000·0,5 + 400·0,9 + 15.200·0,2 = 2.000 + 360 + 3.040 = 5.400 mp echiv`. Diferența de scurgere față de terenul agricol inițial (c ≈ 0,15 pe întreaga suprafață) impune un **volum de retenție-infiltrare** care, la o ploaie de calcul de frecvență 1/n cu lamă de ~30–40 mm reținută, rezultă orientativ **V_ret ≈ 150–250 mc** pentru compensarea vârfului. Volumul exact se calculează hidrologic (metoda ploii de calcul / bilanț retenție-infiltrare) în funcție de zona pluviometrică și de permeabilitatea măsurată; se materializează în tranșee/bazine de infiltrare cu strat drenant, dimensionate cu porozitate efectivă (ex. pietriș ~30% → volum brut ≈ 3× volumul util). La parcuri mari, volumul se distribuie în mai multe bazine, câte unul pe bazin de colectare, evitând traseele lungi de scurgere concentrată.

### 6.4 Verificări și recepție parțială — drenaj

- PVLA tranșee de drenaj, drenuri, straturi drenante (lucrare ascunsă): adâncime, pantă, material filtrant, geotextil de separare;
- verificarea pantelor rigolelor (scurgere fără băltire — probă cu apă);
- probă de funcționare a bazinelor/tranșeelor de infiltrare (umplere și observarea infiltrării în timp);
- verificarea că apele de pe platforme (inclusiv eventualele scurgeri de la PT) trec prin separator de hidrocarburi înainte de descărcare, acolo unde e prevăzut;
- corelarea cu avizul de gospodărire a apelor (Legea 107/1996) privind punctul și regimul de descărcare.

---

## 7. Sistematizarea verticală și amenajarea peisagistică

### 7.1 Sistematizarea verticală — principii

Sistematizarea verticală urmărește **minimizarea terasamentelor** (câmpul FV se adaptează la relief, mesele fixe tolerând pante line — a se vedea memoriul de arhitectură), respectând cotele proiectate și pantele de scurgere. Lucrări: decapare strat vegetal (depozitat separat pentru refolosire la înierbare — §7.4), săpături și umpluturi locale strict necesare (platforme, drumuri, radiere), modelarea taluzurilor, refacerea stratului vegetal pe suprafețele neconstruite. Cotele de referință se raportează la sistemul de nivelment al proiectului (Marea Neagră 1975).

### 7.2 Terasamente — execuție și toleranțe

| Parametru | Cerință / toleranță |
|---|---|
| Decapare strat vegetal | grosime conform teren; stocare separată, ferită de contaminare |
| Compactare umpluturi | ≥ 95% Proctor modificat (≥ 98% sub platforme/drumuri) |
| Cota platformelor amenajate | ± 3 cm față de proiect |
| Panta de scurgere generală | ≥ 0,5% spre rigole/zone de infiltrare, fără contrapante |
| Taluzuri | înclinare stabilă (verificare geotehnică), înierbate imediat |

Verificare: nivelment de recepție (comparare cote executate vs. proiect), probe de compactare pe umpluturi, verificarea absenței zonelor de băltire (contrapante).

### 7.3 Amenajarea peisagistică — rol și principii

Amenajarea peisagistică are triplu rol: **integrarea vizuală** (reducerea impactului parcului dinspre drumuri/localități/vecinătăți), **stabilizarea și protecția solului** (covor vegetal anti-eroziune, permeabilitate), **susținerea biodiversității**. Se corelează cu memoriul de arhitectură (concepția) și se execută conform prezentelor specificații.

### 7.4 Covorul vegetal între rânduri și gazonul

- **Covor vegetal permeabil** pe toată suprafața dintre rânduri (`S ≈ S_câmp · (1 − GCR)`): amestec de graminee și leguminoase perene rezistente la secetă și la umbrire parțială, cu talie joasă (reducerea frecvenței de cosire) și sistem radicular care fixează solul. Amestec orientativ: **Festuca rubra / Festuca ovina** (păiuș — talie joasă, seceta), **Lolium perenne** (raigras pentru instalare rapidă), **Poa pratensis**, cu adaos de leguminoase fixatoare de azot (**Trifolium repens** — trifoi mărunt, **Lotus corniculatus**) și, unde se dorește sprijin pentru polenizatori, un procent de flori de câmp perene autohtone. Se însămânțează pe patul pregătit (nivelat, strat vegetal refăcut, fertilizat organic ușor), cu rată de semănat conform speciilor (uzual 25–40 g/mp); se protejează până la înrădăcinare (irigare de instalare la nevoie).
- **Interdicții:** se interzice folosirea de erbicide totale și de defolianți care lasă solul gol (risc de eroziune și de praf pe module); întreținerea se face prin **cosire** (sau pășunat controlat cu ovine, unde garda la sol o permite — soluție agri-voltaică).
- **Criteriu de reușită la recepție:** grad de acoperire vegetală ≥ 80% la finalul primului sezon de vegetație pe suprafața-martor și pe ansamblu; completarea/reînsămânțarea zonelor neînierbate.

### 7.5 Perdelele vegetale perimetrale și culorile

- **Perdea vegetală** din **specii locale/autohtone**, adaptate climatic, în aliniamente/pâlcuri pe laturile expuse vizual, **preferențial pe est, vest și nord** (evitarea umbririi dinspre sud — corelare cu analiza de umbrire din memoriu; unde e necesară perdea sudică, se folosesc specii de talie mică menținute la înălțime controlată). Specii orientative pentru RO: arbuști autohtoni **Cornus sanguinea** (sânger), **Crataegus monogyna** (păducel), **Ligustrum vulgare** (lemn câinesc), **Rosa canina** (măceș), **Prunus spinosa** (porumbar), completate — acolo unde spațiul o permite și fără umbrire — cu arbori de talie mică/medie (**Acer campestre** — jugastru, **Fraxinus** local). Rol de mascare vizuală, coridor ecologic și barieră de praf/vânt. Plantare pe gropi individuale cu pământ vegetal, tutorare, protecție la baza tulpinii, mulcire; se interzic speciile invazive (ex. *Ailanthus altissima*, *Amorpha fruticosa*).
- **Culorile finisajelor** vizibile (cabină, anvelopă PT, gard) se aleg **absorbante, mate, nereflectorizante** (tonuri de verde-oliv, gri, bej mat), pentru **minimizarea impactului vizual** și evitarea reflexiilor; se interzic suprafețele lucioase, culorile stridente și materialele oglindă în zonele vizibile din exterior.

### 7.6 Biodiversitatea

- **Baza gardului permeabilă** (fără soclu continuu) sau cu treceri pentru fauna mică, acolo unde avizul de mediu o cere;
- menținerea/crearea de habitat (fâșii cu flori de câmp, hoteluri de insecte, zone lăsate nerecoltate) în perimetrul de retragere;
- plantații și covor vegetal fără specii invazive.

### 7.7 Verificări și recepție parțială — peisagistică

- verificarea speciilor (conformitate cu proiectul și cu cerința de autohtonie), a calității materialului dendrologic (fără boli, sistem radicular sănătos);
- verificarea densității de plantare și a execuției (gropi, tutorare, mulcire, udare de instalare);
- verificarea gradului de acoperire a covorului vegetal la finalul sezonului (criteriul ≥ 80%);
- **perioada de garanție de întreținere** a plantațiilor (uzual 1–2 sezoane): înlocuirea exemplarelor uscate pe cheltuiala executantului până la reușită.

---

## 8. Semnalizarea, marcajele și avertizarea de pericol electric

### 8.1 Semnalizarea de securitate (cadru)

Semnalizarea se conformează HG 971/2006 și SR ISO 3864 / SR EN ISO 7010 (pictograme standardizate), fiind vizibilă, durabilă (materiale rezistente UV și intemperii, ≥ 5 ani), pe suport metalic/compozit fixat solid.

### 8.2 Avertizarea de pericol electric

- **Plăcuțe „Pericol de electrocutare / Înaltă tensiune"** (pictograma triunghi galben cu fulger, ISO 7010 W012) montate pe **gardul perimetral** la interval **≤ 25 m** și la **fiecare poartă și colț**, precum și pe/în jurul **PT/stației**, al **skidurilor de invertoare** și al **camerelor de joncțiune**; text bilingv unde e cazul. Numărul de plăcuțe scalează cu perimetrul și cu numărul de echipamente.
- **Plăcuțe de interdicție acces** persoanelor neautorizate la porți și la echipamentele electrice;
- **Plăcuțe de identificare** a echipamentelor și a punctelor de secționare (corelare cu instalațiile — schema de identificare);
- **Plan de intervenție/orientare** afișat la accesul principal (pentru ISU): plan de incintă cu poziția PT, a hidranților/mijloacelor PSI, a căilor de acces și a punctelor de deconectare generală.

**Execuția plăcuțelor.** Plăcuțele se realizează din tablă de aluminiu/oțel zincat sau compozit, cu folie retroreflectorizantă la cele rutiere, dimensiuni conform ISO 3864 (vizibilitate de la distanța de citire cerută), fixate pe suporți/stâlpi la înălțime de citire 1,5–2,0 m, orientate spre direcția de apropiere. Fixarea pe gard se face cu bride inox (nu se sudează plasa zincată). Se prevăd plăcuțe de rezervă în cartea tehnică pentru înlocuirea celor degradate în exploatare.

### 8.3 Marcaje și semnalizare rutieră de incintă

- marcaje și indicatoare la racordul cu drumul public (STOP/cedează, oglinzi la vizibilitate redusă) conform avizului administratorului drumului;
- marcaje de dirijare în incintă la intersecții și la platforma PT (zonă de manevră);
- limitatoare de viteză și semnalizare a vitezei reduse în incintă.

### 8.4 Verificări — semnalizare

- verificarea existenței, poziționării și lizibilității tuturor plăcuțelor obligatorii față de proiectul de semnalizare;
- verificarea intervalului maxim (≤ 25 m pe gard) și a acoperirii tuturor punctelor de pericol;
- verificarea planului de intervenție afișat și a marcajelor rutiere de racord (aviz drum).

---

## 9. Managementul deșeurilor la execuție și la dezafectare

### 9.1 Deșeuri din faza de execuție (Legea 211/2011, HG 856/2002)

Executantul întocmește și ține la zi **evidența gestiunii deșeurilor** (HG 856/2002), colectează selectiv pe categorii (pământ excavat curat — refolosit la sistematizare/umpluturi; deșeuri de beton/moloz; metale — valorificate; ambalaje; deșeuri periculoase — recipiente de rășini/primere, cu FDS). Deșeurile se predau numai operatorilor autorizați, cu formulare de transport și de eliminare/valorificare. Pământul vegetal decapat se **refolosește** integral la refacerea covorului vegetal (§7.4). Se interzice îngroparea sau arderea deșeurilor pe amplasament.

### 9.2 Deșeuri la dezafectare — reversibilitatea și fluxul DEEE (HG 1037/2010, OUG 5/2015)

Parcul FV este proiectat **reversibil** (fundare fără beton masiv). La finalul duratei de exploatare (25–30 ani), dezafectarea readuce terenul la categoria de folosință inițială. Componenta de arhitectură/infrastructură prevede, pentru trasabilitate în cartea tehnică, **planul de dezafectare** cu fluxurile de deșeuri:

- **Modulele fotovoltaice** sunt **DEEE** (categoria panouri fotovoltaice, HG 1037/2010 — transpune Dir. DEEE) — se predau obligatoriu către sisteme colective/operatori autorizați de reciclare a panourilor FV; se recuperează sticla, aluminiul, siliciul, metalele; **ținta de valorificare/reciclare** conform legislației DEEE. Se interzice depozitarea la deșeuri municipale.
- **Structurile metalice** (piloți/șuruburi, profile, gard, stâlpi) — extrase și **valorificate ca deșeu metalic** (oțel zincat reciclabil).
- **Cablurile** — recuperate, cuprul/aluminiul valorificat; **transformatorul și uleiul** — preluate de operatori autorizați (uleiul — deșeu periculos, predare cu regim special).
- **Betoanele** (radiere PT, fundații gard, platforme) — spargere și valorificare ca agregat reciclat sau eliminare autorizată; **solul** — decompactat și refăcut, stratul vegetal reașezat, terenul reînierbat/reintrodus în folosința agricolă.

Se consemnează cantitățile estimate parametric (`N_mod`, tone de oțel, mc de beton — funcție de `P_DC`) și responsabilitatea (garanția financiară de dezafectare, unde e cerută prin aviz/autorizație).

**Ordinea de dezafectare** (pentru plan): (1) deconectare și punere în siguranță electrică (aparține exploatării/instalațiilor); (2) demontarea modulelor și predarea DEEE; (3) demontarea cablurilor și a echipamentelor (invertoare, transformator, celule MT) — predare pe fluxuri; (4) extragerea structurilor metalice și a piloților/șuruburilor de fundare (fără beton de scos — avantajul reversibilității); (5) demolarea platformelor/radierelor de beton și a fundațiilor de gard, cu valorificarea agregatelor; (6) refacerea solului: decompactarea zonelor de circulație, reașezarea stratului vegetal decapat inițial și stocat, reînierbarea/reintroducerea în folosința agricolă. Suprafața readusă la starea inițială se recepționează comparativ cu situația de referință documentată la începutul lucrărilor (fotografii, ridicare topo, categorie de folosință).

### 9.3 Verificări — deșeuri

- verificarea evidenței gestiunii deșeurilor (registre, formulare, contracte cu operatori autorizați) la recepția lucrărilor;
- verificarea refolosirii pământului vegetal și a absenței contaminării solului pe amplasament;
- includerea planului de dezafectare cu flux DEEE în cartea tehnică.

---

## 10. Distanțele de amplasare față de infrastructuri și zone protejate

Verificarea distanțelor de amplasare (retragerile față de infrastructuri și zone protejate) este o condiție de conformitate a implantării incintei, verificată la trasarea în teren și consemnată în cartea tehnică. Valorile-cadru (se aplică cele mai restrictive dintre lege, avizele emise și regulamentul local de urbanism):

| Vecinătate | Distanță de amplasare (cadru) | Temei legal |
|---|---|---|
| **Drum național (DN)** | zona de siguranță/protecție — construcțiile în afara zonei de protecție (orientativ ~22 m de la axul drumului național în afara localităților, cu aprobarea administratorului drumului pentru amplasare) | OG 43/1997 (rep.) — regimul drumurilor |
| **Drum județean / comunal** | zone de protecție proprii (mai reduse), conform OG 43/1997 și avizului administratorului | OG 43/1997 |
| **Cale ferată (CFR)** | zona de siguranță și de protecție a infrastructurii feroviare (orientativ ~100 m de la axul liniei extreme pentru zona de protecție, cu avizul administratorului feroviar) | OUG 12/1998 (regimul CF) |
| **Ape (cursuri, luciu de apă)** | retragere de min. **5 m** (până la zeci de m la cursuri mari) — zonă de protecție și acces la mal | Legea 107/1996 + HG 930/2005 |
| **Fond forestier (pădure)** | min. **50 m** de la limita pădurii (interdicție de amplasare a construcțiilor în perdeaua de protecție a pădurii, cu avizul autorității silvice) | Legea 46/2008 — Codul silvic |
| **Zone naturale protejate / Natura 2000** | conform actului de reglementare de mediu (evaluare adecvată) | OUG 57/2007, Legea 292/2018 |
| **Locuințe / obiective sensibile** | conform normelor de igienă și RLU | OMS 119/2014, RLU local |

> **Notă de aplicare.** Valorile de mai sus sunt **orientative de cadru**; distanțele exacte și eventualele derogări/avize de amplasare (ex. amplasarea în zona de protecție a unui DN sau CF **cu acordul administratorului**) rezultă din avizele obținute (CNAIR, administrator CF, ABA/Apele Române, ocol silvic, autoritatea de mediu) și din certificatul de urbanism. Executantul **verifică la trasare** poziționarea gardului și a construcțiilor față de aceste limite și oprește lucrarea dacă apar neconcordanțe, sesizând proiectantul.

---

## 11. Condiții de recepție, toleranțe și corelarea cu PCCVI

### 11.1 Fazele determinante (propuse spre stabilire cu ISC)

Pe componenta de arhitectură–infrastructură se propun ca faze determinante (stabilite cu ISC conform procedurii), fiecare cu proces-verbal de fază determinantă:

1. **Recepția patului/terenului de fundare** pentru radierul PT, cuva de retenție și fundațiile cabinei (natura terenului vs. studiu geotehnic — NP 074/2014).
2. **Recepția armăturii** radierului PT și a **cuvei de retenție ulei** înainte de betonare.
3. **Proba de etanșeitate a cuvei de retenție** a uleiului.
4. **Recepția straturilor rutiere** (fundație/balast) înainte de așternerea îmbrăcămintei — grad de compactare.
5. **Recepția rețelei de drenaj și a bazinelor de infiltrare** înainte de acoperire + proba de infiltrare.

### 11.2 Recapitulativ toleranțe (extras)

| Lucrare | Parametru critic | Toleranță |
|---|---|---|
| Împrejmuire | verticalitate stâlp | ≤ 5 mm/m (max 10 mm) |
| Împrejmuire | aliniament | ≤ 20 mm / 10 m |
| Fundații gard | adâncime sub îngheț | conform STAS 6054 (fără abatere în minus) |
| Drumuri | grad compactare fundație | ≥ 98% Proctor modificat |
| Drumuri | planeitate (dreptar 3 m) | ≤ 2–3 cm |
| Drumuri | lățime carosabilă | ≥ 3,00 m (fără reducere) |
| Platformă PT | cotă radier peste teren | ≥ +0,15 m |
| Cuvă retenție | etanșeitate | fără pierderi 24–48 h |
| Cabină | planeitate pardoseală | ≤ 2 mm/2 m |
| Cabină | acces PMR (lățime liberă ușă) | ≥ 0,90 m; rampă ≤ 8% |
| Terasamente | cotă platforme | ± 3 cm |
| Covor vegetal | grad de acoperire (sezon 1) | ≥ 80% |
| Semnalizare | interval plăcuțe pericol pe gard | ≤ 25 m |

### 11.3 Documente la recepția parțială pe categorii

Fiecare categorie de lucrare se recepționează parțial cu: procesele-verbale de lucrări ascunse (PVLA), procesele-verbale de recepție calitativă pe faze, buletinele de încercări (compactare, beton, etanșeitate, permeabilitate sol), documentele de calitate ale materialelor (DoP/agremente/certificate de lot), suprafețele/tronsoanele-martor aprobate, planurile as-built de trasee (drenaj, canalizație de securitate) și fotografiile de urmărire. Aceste documente alimentează cartea tehnică; **procedura de recepție la terminarea lucrărilor și recepția finală (HG 273/1994) NU se reia aici** — a se vedea documentul dedicat *Program de recepție, punere în funcțiune și urmărire în exploatare*.

### 11.4 Neconformități și remedieri

Neconformitățile se consemnează în registrul de neconformități, cu clasificarea gravității (majoră — afectează siguranța/funcționalitatea, ex. cuvă de retenție neetanșă, drum sub 3 m, distanță de amplasare nerespectată; minoră — aspect/toleranțe recuperabile). Remedierile se execută pe cheltuiala executantului, cu reverificare; lucrarea de serie care nu atinge calitatea tronsonului-martor se respinge și se reface.

---

## 12. Sinteza parametrică (recapitulativ)

Toate cantitățile de lucrări de arhitectură–amenajări–infrastructură ale unui parc FV se determină prin substituirea puterii `P_DC` (și, derivat, a suprafeței `S_teren`) în formulele parametrice:

- **Gard / detecție / CCTV / semnalizare pe gard:** `∝ P_gard ≈ 4·√(S_teren) ∝ √(P_DC)` — scalare sub-liniară (economie de scară a perimetrului).
- **Covor vegetal / retenție pluvială:** `∝ suprafață ∝ P_DC` — scalare liniară.
- **Drumuri interioare:** buclă `∝ P_gard ∝ √(P_DC)`; coridoare de bloc `∝` numărul de blocuri `∝ P_DC`.
- **Platforme skid / plăcuțe la echipamente:** `∝ P_AC ∝ P_DC` — scalare liniară.
- **Cuvă retenție ulei / platformă PT:** `∝` puterea și numărul transformatoarelor `∝ P_AC`.
- **Cabina de comandă:** crește **în trepte**, nu liniar (funcție rămâne mică raportat la putere).
- **Deșeuri la dezafectare (module DEEE, oțel, beton):** `∝ N_mod = P_DC / P_mod` (module și structuri) + servicii `∝ √(P_DC)`.

**Invariante la putere** (aceleași la orice scară): înălțimea gardului (2,0 m), lățimea minimă a drumului (3,0 m), razele de viraj (≥ 8–12 m, dictate de vehicul), clasele de material și toleranțele de execuție, cerințele de accesibilitate NP 051 ale cabinei, principiile de drenaj și de peisagistică, distanțele de amplasare de cadru.

---

## 13. Concluzii — conformitatea pe cerințele fundamentale

Prezentul caiet de sarcini asigură execuția lucrărilor de arhitectură, amenajări și infrastructură de incintă ale parcului fotovoltaic la standardul cerut de **Legea 10/1995**, demonstrat pe cerințele fundamentale aplicabile:

- **A — Rezistență mecanică și stabilitate:** fundații de gard și stâlpi CCTV verificate la vânt și îngheț; radiere și platforme dimensionate; structuri rutiere dimensionate la trafic și portanță (AND 530).
- **B — Securitate la incendiu:** anvelopă PT/cabină grad II RF, plan de intervenție afișat, accese ISU (lățime ≥ 3,5 m, rază ≥ 12 m), semnalizare (interfața PSI — nedublată).
- **C — Igienă, sănătate, mediu:** sanitar cabină, gestiunea apelor pluviale prin infiltrare (fără agravarea scurgerii), management al deșeurilor și flux DEEE la dezafectare, culori nereflectorizante, biodiversitate, distanțe de protecție.
- **D — Siguranță și accesibilitate în exploatare:** accesibilitate NP 051 a cabinei, drumuri și coridoare de mentenanță/intervenție, împrejmuire și control acces, iluminat de securitate.
- **F — Protecție împotriva zgomotului** și **G — Economie de energie:** anvelopă termică a cabinei (C 107/2005), impact minim.

Și pe cele trei componente ale actului urbanistic/tehnic: **analitică** (specificații, formule parametrice, toleranțe și temeiuri normative), **grafică** (corelarea cu planșele de amenajare, trasee, detalii), **predicție** (reversibilitatea și planul de dezafectare cu flux DEEE — orizontul de sfârșit de ciclu). Toate categoriile de lucrare sunt prescrise la standard real, parametric pe putere, fără duplicarea soluției de arhitectură (memoriu), a structurilor de susținere (rezistență), a instalațiilor electrice sau a procedurii generale de recepție (program de recepție dedicat).
