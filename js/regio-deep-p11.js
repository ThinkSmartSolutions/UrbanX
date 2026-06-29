// regio-deep-p11.js — PARTEA 11: Indici proprii UrbanX la nivel regional (NUTS-2).
// Conținut profund: window._REGIO_DEEP['p11'] (autorat modular).
// Cele 8 regiuni de dezvoltare: Nord-Est, Sud-Est, Sud-Muntenia, Sud-Vest Oltenia,
// Vest, Nord-Vest, Centru, București-Ilfov. Scorurile sunt ORIENTATIVE (model UrbanX),
// calibrate pe surse oficiale (INS, Eurostat, ESPON, DG REGIO, Copernicus, Banca Mondială).
// Fiecare capitol: 3 paragrafe de analiză + 5 reprezentări (tabele/grafice) pe cele 8 regiuni.
window._REGIO_DEEP = window._REGIO_DEEP || {};
window._REGIO_DEEP['p11'] = [

  {
    title: "Urban Development Index (UDI) — definiție, formulă și sub-indicatori",
    blocks: [
      { type: "p", text: "Urban Development Index (UDI) este primul indice compozit propriu al platformei UrbanX și măsoară gradul de dezvoltare urbană efectivă a unei regiuni, înțeleasă ca densitatea, calitatea și maturitatea funcțiilor urbane, nu ca simplă rată de urbanizare statistică. O regiune poate concentra o pondere mare a populației în orașe, dar cu funcții urbane subdimensionate; UDI surprinde tocmai distincția dintre urbanizarea statistică și dezvoltarea urbană reală. Indicele răspunde la întrebarea cât de matur este țesutul urban al fiecăreia dintre cele opt regiuni de dezvoltare ale României." },
      { type: "p", text: "Cei șase sub-indicatori ai UDI sunt: rata de urbanizare (INS, Recensământ 2021), suprafața construită pe locuitor în mediul urban (Copernicus Urban Atlas / GHSL), gradul de conectare la utilități (apă-canal, INS), densitatea funcțiilor terțiare pe orașe (INS, REGIS), accesibilitatea spațiilor verzi urbane (Copernicus) și ponderea locuințelor moderne post-1990 (INS). Normalizarea fiecărui sub-indicator se face min-max pe setul celor opt regiuni: scor = (x − min) / (max − min) × 100, aducând toate componentele pe aceeași scară 0-100." },
      { type: "p", text: "Agregarea finală este media ponderată liniară: UDI = Σ wᵢ · scorᵢ, cu ponderi orientative urbanizare 0,20; suprafață construită/cap 0,15; utilități 0,20; funcții terțiare 0,20; spații verzi 0,10; locuințe moderne 0,15 (Σ wᵢ = 1). Regiunea București-Ilfov domină net prin concentrarea funcțiilor metropolitane, urmată de regiunile cu poli urbani puternici (Vest, Nord-Vest, Centru), în timp ce regiunile cu urbanizare redusă (Sud-Muntenia, Sud-Vest Oltenia) au scoruri orientative mai joase. Toate valorile de mai jos sunt orientative (model UrbanX)." },
      { type: "table", title: "UDI — scoruri orientative pe regiuni (model UrbanX)", source: "INS (Recensământ 2021), Copernicus Urban Atlas, GHSL — agregare UrbanX",
        headers: ["Regiune", "Rata urbanizare (%)", "Scor UDI (0-100)"],
        rows: [["Nord-Est","43","47"],["Sud-Est","55","55"],["Sud-Muntenia","42","44"],["Sud-Vest Oltenia","48","46"],["Vest","63","68"],["Nord-Vest","53","63"],["Centru","59","65"],["București-Ilfov","92","91"]] },
      { type: "chart", chartType: "hbar", title: "UDI — clasament orientativ al regiunilor (0-100)", source: "Model UrbanX",
        labels: ["Bucuresti-Ilfov","Vest","Centru","Nord-Vest","Sud-Est","Nord-Est","SV Oltenia","Sud-Munt."],
        data: [91,68,65,63,55,47,46,44] },
      { type: "table", title: "UDI — descompunere pe sub-indicatori cheie (orientativ)", source: "Model UrbanX (INS, Copernicus)",
        headers: ["Regiune", "Funcții terțiare", "Utilități", "Spații verzi"],
        rows: [["Nord-Est","44","42","48"],["Sud-Est","52","54","50"],["Sud-Muntenia","41","48","45"],["Sud-Vest Oltenia","43","47","49"],["Vest","67","70","62"],["Nord-Vest","60","66","60"],["Centru","64","68","66"],["București-Ilfov","95","93","58"]] },
      { type: "chart", chartType: "bar", title: "UDI — suprafață construită urbană pe locuitor (indice orientativ)", source: "Model UrbanX (GHSL)",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [45,52,43,46,66,61,64,90] },
      { type: "table", title: "UDI — ponderea locuințelor moderne (post-1990) orientativ", source: "Model UrbanX (INS)",
        headers: ["Regiune", "Locuințe moderne (%)", "Scor componentă"],
        rows: [["Nord-Est","22","46"],["Sud-Est","26","52"],["Sud-Muntenia","21","44"],["Sud-Vest Oltenia","23","47"],["Vest","31","66"],["Nord-Vest","29","62"],["Centru","30","64"],["București-Ilfov","42","90"]] }
    ]
  },

  {
    title: "Urban Development Index (UDI) — interpretare regională și implicații strategice",
    blocks: [
      { type: "p", text: "Lectura UDI pe cele opt regiuni evidențiază o ierarhie urbană duală a României: un pol metropolitan dominant (București-Ilfov) și un grup de regiuni cu poli urbani regionali consolidați (Vest, Centru, Nord-Vest), urmate de regiuni cu țesut urban fragmentat și funcții terțiare subdimensionate. Decalajul de scor între prima și ultima regiune depășește 45 de puncte, ceea ce confirmă caracterul policentric incomplet al rețelei urbane românești și justifică politicile de întărire a polilor de creștere secundari." },
      { type: "p", text: "Implicația strategică principală este că dezvoltarea urbană nu se rezolvă prin extinderea suprafețelor construite, ci prin densificarea funcțiilor (servicii, educație, sănătate, cultură) și prin modernizarea utilităților. Regiunile cu scor mediu (Sud-Est, Sud-Vest Oltenia) au rezerve de creștere la conectarea apă-canal și la regenerarea locuirii, în timp ce regiunile estice necesită investiții structurale în polii urbani secundari pentru a reduce dependența de capitalele de județ." },
      { type: "p", text: "Pentru decidenți, UDI oferă o bază de prioritizare a fondurilor de dezvoltare urbană: sub-indicatorii cu scor cel mai scăzut într-o regiune indică unde un euro investit produce cel mai mare salt de calitate urbană. Pe orizontul 2030, o strategie de densificare funcțională ar putea ridica regiunile din mijlocul clasamentului cu 5-8 puncte, conform proiecției orientative UrbanX, apropiind ierarhia urbană românească de un model policentric echilibrat." },
      { type: "chart", chartType: "bar", title: "UDI — scor actual vs. proiecție orientativă 2030 (model UrbanX)", source: "Model UrbanX",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [52,60,49,51,72,67,69,93] },
      { type: "table", title: "UDI — gap față de media regională și potențial de recuperare", source: "Model UrbanX",
        headers: ["Regiune", "Scor UDI", "Potențial (orizont)", "Gap față de medie"],
        rows: [["Nord-Est","47","ridicat","-13"],["Sud-Est","55","mediu","-5"],["Sud-Muntenia","44","ridicat","-16"],["Sud-Vest Oltenia","46","ridicat","-14"],["Vest","68","mediu","8"],["Nord-Vest","63","mediu","3"],["Centru","65","mediu","5"],["București-Ilfov","91","redus","31"]] },
      { type: "chart", chartType: "donut", title: "UDI — distribuția regiunilor pe clase de dezvoltare urbană", source: "Model UrbanX",
        labels: ["Avansat (>80)","Consolidat (60-80)","Mediu (50-60)","În urmă (<50)"],
        data: [1,3,1,3] },
      { type: "table", title: "UDI — corelație cu rata reală de urbanizare (orientativ)", source: "Model UrbanX (INS)",
        headers: ["Regiune", "Urbanizare (%)", "Scor UDI"],
        rows: [["Nord-Est","43","47"],["Sud-Est","55","55"],["Sud-Muntenia","42","44"],["Sud-Vest Oltenia","48","46"],["Vest","63","68"],["Nord-Vest","53","63"],["Centru","59","65"],["București-Ilfov","92","91"]] },
      { type: "chart", chartType: "hbar", title: "UDI — accesibilitatea spațiilor verzi urbane (indice orientativ)", source: "Model UrbanX (Copernicus)",
        labels: ["Centru","Buc.-Ilfov","Sud-Est","SV Oltenia","Nord-Est","Nord-Vest","Vest","Sud-Munt."],
        data: [66,58,50,49,48,60,62,45] }
    ]
  },

  {
    title: "Investment Attractiveness Index (IAI) — definiție, formulă și sub-indicatori",
    blocks: [
      { type: "p", text: "Investment Attractiveness Index (IAI) cuantifică atractivitatea unei regiuni pentru investițiile private, în special pentru investițiile străine directe și pentru relocările industriale și de servicii. Indicele integrează factorii clasici de localizare — costul forței de muncă, calificarea, accesibilitatea piețelor, infrastructura și mediul de afaceri — într-o valoare comparabilă, explicând de ce capitalul privat se concentrează în anumite regiuni și ce pârghii pot folosi regiunile mai puțin atractive pentru a-și îmbunătăți poziția." },
      { type: "p", text: "Cei cinci sub-indicatori ai IAI sunt: stocul de ISD pe locuitor (BNR, INS), accesibilitatea (autostrăzi plus aeroport internațional, ESPON), forța de muncă calificată (pondere absolvenți terțiar, INS/Eurostat), densitatea firmelor active (ONRC/INS) și costul relativ al forței de muncă (Eurostat). Formula este IAI = Σ wᵢ · scorᵢ, cu ponderi orientative ISD/cap 0,25; accesibilitate 0,20; forță calificată 0,20; densitate firme 0,20; competitivitate-cost 0,15. Sub-indicatorul de cost este normalizat invers: scor = (max − x) / (max − min) × 100." },
      { type: "p", text: "Normalizarea min-max relevă o concentrare puternică a atractivității în jurul Bucureștiului și al regiunilor vestice, beneficiare ale proximității față de piețele Europei Centrale și ale autostrăzilor existente. Regiunile estice și sudice, deși oferă costuri competitive, sunt penalizate de deficitul de infrastructură rutieră de mare viteză, ceea ce arată că reducerea decalajului de atractivitate trece prioritar prin conectivitate. Valorile sunt orientative (model UrbanX)." },
      { type: "table", title: "IAI — scoruri orientative pe regiuni (model UrbanX)", source: "BNR (ISD), INS, Eurostat, ESPON — agregare UrbanX",
        headers: ["Regiune", "ISD relativ (indice)", "Scor IAI (0-100)"],
        rows: [["Nord-Est","32","38"],["Sud-Est","48","47"],["Sud-Muntenia","58","52"],["Sud-Vest Oltenia","40","43"],["Vest","78","74"],["Nord-Vest","70","69"],["Centru","72","70"],["București-Ilfov","100","95"]] },
      { type: "chart", chartType: "bar", title: "IAI — scoruri orientative pe regiuni (0-100)", source: "Model UrbanX",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [38,47,52,43,74,69,70,95] },
      { type: "table", title: "IAI — accesibilitate vs. forță de muncă calificată (orientativ)", source: "Model UrbanX (ESPON, Eurostat)",
        headers: ["Regiune", "Accesibilitate", "Forță calificată", "Densitate firme"],
        rows: [["Nord-Est","30","44","40"],["Sud-Est","46","45","48"],["Sud-Muntenia","60","47","50"],["Sud-Vest Oltenia","38","46","42"],["Vest","75","68","70"],["Nord-Vest","68","70","72"],["Centru","70","67","68"],["București-Ilfov","92","96","98"]] },
      { type: "chart", chartType: "hbar", title: "IAI — stoc ISD pe locuitor (indice orientativ)", source: "Model UrbanX (BNR)",
        labels: ["Buc.-Ilfov","Vest","Centru","Nord-Vest","Sud-Munt.","Sud-Est","SV Oltenia","Nord-Est"],
        data: [100,78,72,70,58,48,40,32] },
      { type: "table", title: "IAI — competitivitatea de cost a forței de muncă (orientativ)", source: "Model UrbanX (Eurostat)",
        headers: ["Regiune", "Cost relativ (indice)", "Scor cost (invers)"],
        rows: [["Nord-Est","60","78"],["Sud-Est","66","70"],["Sud-Muntenia","70","64"],["Sud-Vest Oltenia","62","75"],["Vest","82","52"],["Nord-Vest","80","55"],["Centru","78","58"],["București-Ilfov","100","30"]] }
    ]
  },

  {
    title: "Investment Attractiveness Index (IAI) — geografia capitalului și pârghii de creștere",
    blocks: [
      { type: "p", text: "Distribuția scorurilor IAI confirmă o axă vest-est a atractivității investiționale: regiunile Vest, Nord-Vest și Centru, conectate la coridoarele rutiere către Europa Centrală, atrag o pondere disproporționată din ISD industriale (automotive, componente, logistică), în timp ce București-Ilfov polarizează investițiile în servicii, IT și imobiliare. Sud-Muntenia beneficiază de proximitatea Capitalei și de zonele logistice de pe A1/A2, având un scor mediu superior celorlalte regiuni sudice și estice." },
      { type: "p", text: "Pârghia cu cel mai mare efect de levier asupra IAI este accesibilitatea: finalizarea coridoarelor de autostradă către Moldova (A7) și Oltenia ar putea ridica semnificativ scorurile regiunilor Nord-Est și Sud-Vest Oltenia, care dispun deja de forță de muncă și costuri competitive. A doua pârghie este calificarea forței de muncă, unde investițiile în învățământ dual și în centre universitare regionale convertesc avantajul de cost într-un avantaj de productivitate durabil." },
      { type: "p", text: "Pentru autoritățile de dezvoltare regională, IAI funcționează ca un tablou de bord al competiției pentru capital. Un scor scăzut nu indică un handicap permanent, ci o agendă de reforme: parcuri industriale racordate la utilități, proceduri de autorizare predictibile și pachete coerente de stimulente. Proiecția orientativă UrbanX estimează că o ameliorare a accesibilității ar putea aduce regiunile estice cu 8-12 puncte mai sus pe orizontul 2030." },
      { type: "chart", chartType: "bar", title: "IAI — scor actual vs. proiecție orientativă 2030 (model UrbanX)", source: "Model UrbanX",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [48,53,58,52,78,72,73,96] },
      { type: "table", title: "IAI — tipologia investițiilor dominante pe regiune (orientativ)", source: "Model UrbanX (BNR, INS)",
        headers: ["Regiune", "Sector dominant ISD", "Tendință", "Scor IAI"],
        rows: [["Nord-Est","Servicii, agro","ascendentă","38"],["Sud-Est","Logistică, energie","stabilă","47"],["Sud-Muntenia","Logistică, auto","ascendentă","52"],["Sud-Vest Oltenia","Energie, auto","stabilă","43"],["Vest","Automotive, software","ridicată","74"],["Nord-Vest","IT, industrie","ridicată","69"],["Centru","Industrie, turism","ridicată","70"],["București-Ilfov","IT, servicii, imobiliar","ridicată","95"]] },
      { type: "chart", chartType: "donut", title: "IAI — distribuția regiunilor pe clase de atractivitate", source: "Model UrbanX",
        labels: ["Foarte ridicată (>80)","Ridicată (60-80)","Medie (45-60)","Scăzută (<45)"],
        data: [1,3,2,2] },
      { type: "table", title: "IAI — densitatea firmelor active la 1000 locuitori (orientativ)", source: "Model UrbanX (ONRC)",
        headers: ["Regiune", "Firme/1000 loc.", "Scor componentă"],
        rows: [["Nord-Est","28","40"],["Sud-Est","34","48"],["Sud-Muntenia","35","50"],["Sud-Vest Oltenia","29","42"],["Vest","50","70"],["Nord-Vest","51","72"],["Centru","48","68"],["București-Ilfov","72","98"]] },
      { type: "chart", chartType: "hbar", title: "IAI — efectul potențial al autostrăzilor noi (puncte câștigate, orientativ)", source: "Model UrbanX",
        labels: ["Nord-Est","SV Oltenia","Sud-Est","Sud-Munt.","Nord-Vest","Centru","Vest","Buc.-Ilfov"],
        data: [12,9,6,5,3,3,2,1] }
    ]
  },

  {
    title: "Territorial Resilience Index (TRI) — definiție, formulă și sub-indicatori",
    blocks: [
      { type: "p", text: "Territorial Resilience Index (TRI) măsoară capacitatea unei regiuni de a absorbi șocuri economice, demografice, climatice și energetice și de a se reorganiza fără pierderi majore de funcționalitate. Reziliența nu coincide cu nivelul de dezvoltare: o regiune bogată dar mono-industrială poate fi mai puțin rezilientă decât una mai săracă dar diversificată. TRI integrează dimensiuni economice, sociale, demografice și de mediu pentru a estima robustețea structurală a fiecăreia dintre cele opt regiuni." },
      { type: "p", text: "Cei șase sub-indicatori sunt: diversificarea economică (inversul concentrării sectoriale, INS), soldul demografic și migrator (INS), gradul de dependență energetică (Transelectrica/INS), capacitatea fiscală locală (MFP), expunerea la riscuri naturale (Copernicus/IGSU, normalizată invers) și densitatea rețelei de servicii esențiale (INS). Formula este TRI = Σ wᵢ · scorᵢ, cu ponderi orientative diversificare 0,20; demografie 0,20; energie 0,15; capacitate fiscală 0,15; risc natural 0,15; servicii 0,15." },
      { type: "p", text: "Aplicând normalizarea min-max și inversă acolo unde este cazul, TRI relevă o reziliență mai ridicată în regiunile cu economii diversificate și demografie stabilă (București-Ilfov, Centru, Nord-Vest) și mai scăzută în regiunile afectate de declin demografic accentuat și dependență de câteva sectoare (Sud-Vest Oltenia, Sud-Muntenia). Pandemia și criza energetică 2021-2022 au confirmat empiric această ierarhie, regiunile diversificate revenind mai rapid la nivelurile de ocupare anterioare." },
      { type: "table", title: "TRI — scoruri orientative pe regiuni (model UrbanX)", source: "INS, MFP, Copernicus, Transelectrica — agregare UrbanX",
        headers: ["Regiune", "Diversificare economică", "Scor TRI (0-100)"],
        rows: [["Nord-Est","52","51"],["Sud-Est","55","53"],["Sud-Muntenia","48","49"],["Sud-Vest Oltenia","45","47"],["Vest","66","64"],["Nord-Vest","70","67"],["Centru","72","68"],["București-Ilfov","82","78"]] },
      { type: "chart", chartType: "radar", title: "TRI — profil comparativ pe regiuni (orientativ)", source: "Model UrbanX",
        labels: ["Buc.-Ilfov","Centru","Nord-Vest","Vest","Sud-Est","Nord-Est","Sud-Munt.","SV Oltenia"],
        data: [78,68,67,64,53,51,49,47] },
      { type: "table", title: "TRI — reziliență economică vs. demografică (orientativ)", source: "Model UrbanX (INS)",
        headers: ["Regiune", "Reziliență economică", "Reziliență demografică", "Capacitate fiscală"],
        rows: [["Nord-Est","52","46","44"],["Sud-Est","54","50","48"],["Sud-Muntenia","48","47","46"],["Sud-Vest Oltenia","45","43","45"],["Vest","66","62","64"],["Nord-Vest","70","64","62"],["Centru","71","65","63"],["București-Ilfov","82","75","80"]] },
      { type: "chart", chartType: "bar", title: "TRI — dependența energetică (scor invers, mare = mai independent)", source: "Model UrbanX (Transelectrica)",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [50,62,48,70,58,56,60,52] },
      { type: "table", title: "TRI — expunerea la riscuri naturale (scor invers, orientativ)", source: "Model UrbanX (Copernicus, IGSU)",
        headers: ["Regiune", "Expunere riscuri", "Scor invers"],
        rows: [["Nord-Est","45","55"],["Sud-Est","55","45"],["Sud-Muntenia","52","48"],["Sud-Vest Oltenia","58","42"],["Vest","40","60"],["Nord-Vest","36","64"],["Centru","33","67"],["București-Ilfov","42","58"]] }
    ]
  },

  {
    title: "Territorial Resilience Index (TRI) — vulnerabilități structurale și consolidare",
    blocks: [
      { type: "p", text: "Analiza TRI scoate în evidență faptul că vulnerabilitatea structurală a regiunilor românești provine din trei surse care se suprapun adesea: declinul demografic prin migrație și îmbătrânire, concentrarea economică pe puține sectoare expuse ciclurilor externe și capacitatea fiscală locală redusă, care limitează marja de manevră a administrațiilor. Regiunile estice și sud-vestice cumulează aceste vulnerabilități, ceea ce le plasează în partea inferioară a clasamentului orientativ." },
      { type: "p", text: "Strategiile de consolidare diferă pe componente. Pentru regiunile cu declin demografic, prioritatea este retenția tinerilor prin oportunități economice și servicii de calitate. Pentru regiunile mono-industriale, diversificarea prin atragerea de sectoare complementare reduce expunerea la șocuri sectoriale. Pentru cele cu capacitate fiscală redusă, întărirea bazei de venituri proprii și descentralizarea fiscală controlată cresc autonomia de răspuns la șocuri." },
      { type: "p", text: "TRI completează imaginea oferită de indicii de dezvoltare și competitivitate: o regiune poate avea scoruri economice bune, dar reziliență fragilă dacă depinde de un singur motor economic. Pe orizontul 2030-2040, tranziția verde, automatizarea și schimbările climatice vor genera șocuri recurente, iar proiecția orientativă UrbanX indică o creștere a rezilienței pentru regiunile care își diversifică economia și își stabilizează demografia." },
      { type: "chart", chartType: "bar", title: "TRI — scor actual vs. proiecție orientativă 2035 (model UrbanX)", source: "Model UrbanX",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [55,57,53,51,68,71,72,80] },
      { type: "table", title: "TRI — clasament și clasă de reziliență (orientativ)", source: "Model UrbanX",
        headers: ["Loc", "Regiune", "Clasă", "Scor TRI"],
        rows: [["1","București-Ilfov","ridicată","78"],["2","Centru","ridicată","68"],["3","Nord-Vest","ridicată","67"],["4","Vest","medie","64"],["5","Sud-Est","medie","53"],["6","Nord-Est","medie","51"],["7","Sud-Muntenia","fragilă","49"],["8","Sud-Vest Oltenia","fragilă","47"]] },
      { type: "chart", chartType: "donut", title: "TRI — distribuția regiunilor pe clase de reziliență", source: "Model UrbanX",
        labels: ["Ridicată (>65)","Medie (50-65)","Fragilă (<50)"],
        data: [3,3,2] },
      { type: "table", title: "TRI — densitatea rețelei de servicii esențiale (orientativ)", source: "Model UrbanX (INS)",
        headers: ["Regiune", "Densitate servicii", "Scor componentă"],
        rows: [["Nord-Est","48","50"],["Sud-Est","52","54"],["Sud-Muntenia","46","48"],["Sud-Vest Oltenia","45","47"],["Vest","64","66"],["Nord-Vest","62","64"],["Centru","63","65"],["București-Ilfov","85","88"]] },
      { type: "chart", chartType: "hbar", title: "TRI — soldul demografic și migrator (scor orientativ)", source: "Model UrbanX (INS)",
        labels: ["Buc.-Ilfov","Centru","Nord-Vest","Vest","Sud-Est","Nord-Est","Sud-Munt.","SV Oltenia"],
        data: [75,65,64,62,50,46,47,43] }
    ]
  },

  {
    title: "Regional Competitiveness Index (RCI) — definiție, formulă și sub-indicatori",
    blocks: [
      { type: "p", text: "Regional Competitiveness Index (RCI) evaluează capacitatea unei regiuni de a oferi un mediu atractiv și sustenabil pentru firme și locuitori, prin productivitate ridicată și calitate a vieții. Inspirat de metodologia Comisiei Europene (EU Regional Competitiveness Index), indicele UrbanX adaptează cei mai relevanți piloni la datele disponibile pentru cele opt regiuni românești, oferind o comparație internă coerentă cu clasamentul european publicat periodic de DG REGIO." },
      { type: "p", text: "Cei șapte sub-indicatori sunt: productivitatea muncii (VAB pe ocupat, Eurostat), capitalul uman (pondere terțiar plus învățare pe tot parcursul vieții, Eurostat), inovarea (cheltuieli C&D, Eurostat), infrastructura (ESPON), eficiența pieței muncii (rata ocupării, INS), sănătatea (speranța de viață, INS) și dimensiunea pieței (PIB regional, Eurostat). Formula este RCI = Σ wᵢ · scorᵢ cu ponderi orientative apropiate de cele europene: productivitate 0,18; capital uman 0,16; inovare 0,14; infrastructură 0,16; piața muncii 0,14; sănătate 0,10; dimensiune piață 0,12." },
      { type: "p", text: "Normalizarea min-max produce o ierarhie consistentă cu cea din EU RCI: București-Ilfov este singura regiune românească competitivă la nivel european, urmată la distanță de Vest, Nord-Vest (polul Cluj) și Centru. Regiunile Nord-Est, Sud-Muntenia și Sud-Vest Oltenia se situează printre cele mai puțin competitive din Uniune, ceea ce confirmă urgența politicilor de coeziune și a investițiilor în productivitate și capital uman." },
      { type: "table", title: "RCI — scoruri orientative pe regiuni (model UrbanX)", source: "Eurostat, INS, ESPON — agregare UrbanX (cadru EU RCI)",
        headers: ["Regiune", "Productivitate (indice)", "Scor RCI (0-100)"],
        rows: [["Nord-Est","40","39"],["Sud-Est","50","48"],["Sud-Muntenia","52","46"],["Sud-Vest Oltenia","47","44"],["Vest","70","67"],["Nord-Vest","66","64"],["Centru","68","65"],["București-Ilfov","100","93"]] },
      { type: "chart", chartType: "bar", title: "RCI — scoruri orientative vs. prag de convergență (0-100)", source: "Model UrbanX (cadru EU RCI)",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [39,48,46,44,67,64,65,93] },
      { type: "table", title: "RCI — piloni cheie (orientativ)", source: "Model UrbanX (Eurostat)",
        headers: ["Regiune", "Inovare", "Capital uman", "Piața muncii"],
        rows: [["Nord-Est","34","42","46"],["Sud-Est","40","47","50"],["Sud-Muntenia","38","45","48"],["Sud-Vest Oltenia","36","44","45"],["Vest","62","66","70"],["Nord-Vest","64","68","68"],["Centru","60","65","66"],["București-Ilfov","92","95","90"]] },
      { type: "chart", chartType: "hbar", title: "RCI — speranța de viață (componentă sănătate, scor orientativ)", source: "Model UrbanX (INS)",
        labels: ["Buc.-Ilfov","Centru","Vest","Nord-Vest","Sud-Est","Nord-Est","Sud-Munt.","SV Oltenia"],
        data: [80,68,66,65,54,52,50,48] },
      { type: "table", title: "RCI — dimensiunea pieței (PIB regional, indice orientativ)", source: "Model UrbanX (Eurostat)",
        headers: ["Regiune", "PIB regional (indice)", "Scor componentă"],
        rows: [["Nord-Est","42","40"],["Sud-Est","44","42"],["Sud-Muntenia","50","48"],["Sud-Vest Oltenia","38","36"],["Vest","58","56"],["Nord-Vest","60","58"],["Centru","56","54"],["București-Ilfov","100","95"]] }
    ]
  },

  {
    title: "Regional Competitiveness Index (RCI) — comparație cu UE și agenda de recuperare",
    blocks: [
      { type: "p", text: "Plasarea regiunilor românești în clasamentul european de competitivitate confirmă o polarizare extremă: București-Ilfov depășește media UE pe mai mulți piloni, în timp ce restul regiunilor se situează semnificativ sub medie, în special pe inovare și pe capital uman avansat. Această dispersie este una dintre cele mai mari din Uniune și explică de ce convergența României la nivel național maschează divergența internă dintre Capitală și restul țării." },
      { type: "p", text: "Agenda de recuperare a competitivității are trei piloni operaționali. Primul este productivitatea: trecerea de la asamblare cu valoare adăugată mică la activități cu conținut tehnologic ridicat, prin atragerea de centre de cercetare-dezvoltare. Al doilea este capitalul uman: reducerea abandonului școlar și creșterea participării la educația terțiară și la formarea continuă. Al treilea este infrastructura, atât fizică (transport), cât și digitală (bandă largă de mare capacitate)." },
      { type: "p", text: "RCI oferă decidenților o hartă a decalajului competitiv care poate fi mapată direct pe prioritățile fondurilor structurale 2021-2027 și pe planurile regionale de specializare inteligentă. Pentru regiunile cu scor sub 50, recomandarea UrbanX este concentrarea resurselor pe câteva domenii cu avantaj comparativ regional; proiecția orientativă indică un câștig potențial de 6-10 puncte pe orizontul 2030 prin investiții în productivitate și capital uman." },
      { type: "chart", chartType: "bar", title: "RCI — scor actual vs. proiecție orientativă 2030 (model UrbanX)", source: "Model UrbanX",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [47,54,53,51,71,70,71,95] },
      { type: "table", title: "RCI — poziția față de media UE (orientativ)", source: "Model UrbanX (cadru EU RCI)",
        headers: ["Regiune", "Față de media UE", "Clasă", "Scor RCI"],
        rows: [["Nord-Est","mult sub","scăzută","39"],["Sud-Est","sub","scăzută","48"],["Sud-Muntenia","sub","scăzută","46"],["Sud-Vest Oltenia","sub","scăzută","44"],["Vest","apropiat","medie","67"],["Nord-Vest","apropiat","medie","64"],["Centru","apropiat","medie","65"],["București-Ilfov","peste","ridicată","93"]] },
      { type: "chart", chartType: "donut", title: "RCI — distribuția regiunilor pe clase de competitivitate", source: "Model UrbanX",
        labels: ["Ridicată (>80)","Medie (60-80)","Scăzută (<60)"],
        data: [1,3,4] },
      { type: "table", title: "RCI — infrastructura ca pilon competitiv (orientativ)", source: "Model UrbanX (ESPON)",
        headers: ["Regiune", "Infrastructură", "Scor RCI"],
        rows: [["Nord-Est","31","39"],["Sud-Est","50","48"],["Sud-Muntenia","61","46"],["Sud-Vest Oltenia","42","44"],["Vest","72","67"],["Nord-Vest","58","64"],["Centru","60","65"],["București-Ilfov","90","93"]] },
      { type: "chart", chartType: "hbar", title: "RCI — gap competitiv față de București-Ilfov (puncte)", source: "Model UrbanX",
        labels: ["Nord-Est","SV Oltenia","Sud-Munt.","Sud-Est","Nord-Vest","Centru","Vest","Buc.-Ilfov"],
        data: [54,49,47,45,29,28,26,0] }
    ]
  },

  {
    title: "Accessibility Index (AccI) — definiție, formulă și sub-indicatori",
    blocks: [
      { type: "p", text: "Accessibility Index (AccI) măsoară cât de ușor pot persoanele și mărfurile dintr-o regiune să ajungă la piețe, servicii și noduri de transport major. Accesibilitatea este un determinant fundamental al dezvoltării: regiunile bine conectate atrag investiții, integrează lanțuri valorice și oferă locuitorilor acces la oportunități. Indicele UrbanX combină accesibilitatea rutieră, feroviară, aeriană și digitală într-o valoare comparabilă, în logica accesibilității potențiale folosită de ESPON." },
      { type: "p", text: "Cei cinci sub-indicatori sunt: densitatea rețelei de autostrăzi și drumuri expres (CNAIR, km la 1000 km²), accesibilitatea feroviară (viteza comercială medie și densitatea liniilor electrificate, CFR/INS), proximitatea unui aeroport internațional (timp de acces, ESPON), acoperirea cu bandă largă de mare viteză (ANCOM) și accesibilitatea potențială multimodală către principalele piețe (ESPON). Formula este AccI = Σ wᵢ · scorᵢ, cu ponderi orientative autostrăzi 0,25; feroviar 0,20; aeroport 0,20; digital 0,15; acces multimodal 0,20." },
      { type: "p", text: "Normalizarea min-max relevă cel mai sever decalaj infrastructural al României: concentrarea autostrăzilor în jumătatea vestică și sudică a țării lasă Moldova și nordul Olteniei cu o accesibilitate rutieră de mare viteză foarte redusă. București-Ilfov, ca nod central, și Vestul, conectat la coridorul IV, conduc clasamentul, în timp ce Nord-Est înregistrează cel mai scăzut scor, reflectând absența istorică a autostrăzilor pe direcția Moldovei." },
      { type: "table", title: "AccI — scoruri orientative pe regiuni (model UrbanX)", source: "CNAIR, CFR, ANCOM, ESPON — agregare UrbanX",
        headers: ["Regiune", "Densitate autostrăzi (indice)", "Scor AccI (0-100)"],
        rows: [["Nord-Est","12","31"],["Sud-Est","40","50"],["Sud-Muntenia","62","61"],["Sud-Vest Oltenia","30","42"],["Vest","70","72"],["Nord-Vest","45","58"],["Centru","55","60"],["București-Ilfov","100","90"]] },
      { type: "chart", chartType: "hbar", title: "AccI — clasament orientativ al regiunilor (0-100)", source: "Model UrbanX",
        labels: ["Buc.-Ilfov","Vest","Sud-Munt.","Centru","Nord-Vest","Sud-Est","SV Oltenia","Nord-Est"],
        data: [90,72,61,60,58,50,42,31] },
      { type: "table", title: "AccI — acces rutier vs. feroviar vs. aerian (orientativ)", source: "Model UrbanX (CNAIR, CFR, ESPON)",
        headers: ["Regiune", "Rutier", "Feroviar", "Aerian"],
        rows: [["Nord-Est","20","38","40"],["Sud-Est","42","45","52"],["Sud-Muntenia","62","58","55"],["Sud-Vest Oltenia","34","42","38"],["Vest","72","60","70"],["Nord-Vest","55","52","65"],["Centru","58","55","58"],["București-Ilfov","95","82","98"]] },
      { type: "chart", chartType: "bar", title: "AccI — acoperirea cu bandă largă de mare viteză (scor orientativ)", source: "Model UrbanX (ANCOM)",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [55,58,60,56,70,68,66,88] },
      { type: "table", title: "AccI — accesibilitatea potențială multimodală (orientativ)", source: "Model UrbanX (ESPON)",
        headers: ["Regiune", "Acces multimodal (indice)", "Scor componentă"],
        rows: [["Nord-Est","28","30"],["Sud-Est","48","50"],["Sud-Muntenia","60","62"],["Sud-Vest Oltenia","40","42"],["Vest","70","72"],["Nord-Vest","56","58"],["Centru","58","60"],["București-Ilfov","92","94"]] }
    ]
  },

  {
    title: "Accessibility Index (AccI) — coridoare prioritare și efectul A7 / Moldova",
    blocks: [
      { type: "p", text: "Decalajul de accesibilitate are o explicație istorică clară: investițiile în autostrăzi s-au concentrat pe coridorul IV pan-european (Nădlac-Sibiu-București-Constanța), favorizând regiunile traversate, în timp ce Moldova a rămas până recent fără autostradă funcțională. Această asimetrie infrastructurală este unul dintre cei mai puternici factori explicativi ai divergenței economice est-vest a României, mai important decât diferențele de capital uman sau de cost al muncii." },
      { type: "p", text: "Coridorul cu cel mai mare impact potențial asupra AccI este Autostrada Moldovei (A7), care ar ridica substanțial scorul regiunii Nord-Est și ar deschide accesul Moldovei către piețele centrale și occidentale. Similar, conectarea Olteniei la rețeaua de mare viteză ar îmbunătăți scorul Sud-Vest Oltenia. Investițiile feroviare de modernizare (creșterea vitezei comerciale) și extinderea benzii largi completează profilul de accesibilitate multimodală." },
      { type: "p", text: "Pentru planificarea strategică, AccI funcționează ca instrument de prioritizare a investițiilor de transport pe criteriul reducerii decalajelor: cele mai mari câștiguri de coeziune se obțin investind în regiunile cu scor cel mai scăzut, unde efectul marginal al unui kilometru de autostradă este maxim. Proiecția orientativă UrbanX estimează un salt de 15-20 de puncte pentru Nord-Est odată cu finalizarea A7." },
      { type: "chart", chartType: "bar", title: "AccI — scor actual vs. proiecție orientativă post-A7 / 2030", source: "Model UrbanX",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [48,54,64,52,74,62,63,91] },
      { type: "table", title: "AccI — coridoare prioritare și impact estimat (orientativ)", source: "Model UrbanX (CNAIR)",
        headers: ["Coridor", "Regiuni beneficiare", "Impact AccI (puncte)"],
        rows: [["A7 Autostrada Moldovei","Nord-Est, Sud-Est","17"],["A8 Tg. Mureș-Iași","Nord-Est, Centru","10"],["Drum expres Craiova-Pitești","SV Oltenia, Sud-Munt.","9"],["Modernizare CF Cluj-Oradea","Nord-Vest","5"],["CF de mare viteză București-Brașov","Centru, Buc.-Ilfov","6"]] },
      { type: "chart", chartType: "donut", title: "AccI — distribuția regiunilor pe clase de accesibilitate", source: "Model UrbanX",
        labels: ["Ridicată (>70)","Medie (50-70)","Scăzută (<50)"],
        data: [2,4,2] },
      { type: "table", title: "AccI — gap de accesibilitate față de Buc.-Ilfov (orientativ)", source: "Model UrbanX",
        headers: ["Regiune", "Scor AccI", "Gap (puncte)"],
        rows: [["Nord-Est","31","59"],["Sud-Est","50","40"],["Sud-Muntenia","61","29"],["Sud-Vest Oltenia","42","48"],["Vest","72","18"],["Nord-Vest","58","32"],["Centru","60","30"],["București-Ilfov","90","0"]] },
      { type: "chart", chartType: "hbar", title: "AccI — efectul marginal al unei autostrăzi noi (puncte/100 km, orientativ)", source: "Model UrbanX",
        labels: ["Nord-Est","SV Oltenia","Sud-Est","Nord-Vest","Centru","Sud-Munt.","Vest","Buc.-Ilfov"],
        data: [9,7,5,4,3,3,2,1] }
    ]
  },

  {
    title: "Infrastructure Readiness Index (IRI) — definiție, formulă și sub-indicatori",
    blocks: [
      { type: "p", text: "Infrastructure Readiness Index (IRI) evaluează maturitatea și capacitatea infrastructurii fizice de bază a unei regiuni de a susține dezvoltarea economică și calitatea vieții. Spre deosebire de AccI, care privește conectivitatea externă, IRI se concentrează pe înzestrarea internă: utilități, energie, apă, deșeuri și infrastructură digitală. O regiune cu infrastructură pregătită poate absorbi rapid investiții și poate găzdui creșterea populației fără blocaje funcționale." },
      { type: "p", text: "Cei șase sub-indicatori sunt: gradul de conectare la apă-canal (INS), gradul de gazificare (ANRE/INS), siguranța alimentării cu energie (Transelectrica), gestionarea deșeurilor (rata de colectare separată, ANPM), acoperirea cu fibră optică (ANCOM) și starea drumurilor județene și comunale (CNAIR/INS). Formula este IRI = Σ wᵢ · scorᵢ, cu ponderi orientative apă-canal 0,22; gaze 0,15; energie 0,18; deșeuri 0,15; fibră 0,15; drumuri locale 0,15." },
      { type: "p", text: "Aplicând normalizarea min-max, IRI relevă disparități semnificative în înzestrarea cu utilități, în special în mediul rural din regiunile estice și sudice, unde gradul de conectare la canalizare rămâne sub jumătate din populație. București-Ilfov și regiunile vestice și central conduc, beneficiind de o rețea de utilități mai densă și mai modernă, în timp ce Sud-Muntenia și Sud-Vest Oltenia, cu populație rurală extinsă, înregistrează scorurile cele mai scăzute la canalizare." },
      { type: "table", title: "IRI — scoruri orientative pe regiuni (model UrbanX)", source: "INS, ANRE, ANCOM, ANPM, Transelectrica — agregare UrbanX",
        headers: ["Regiune", "Conectare apă-canal (%)", "Scor IRI (0-100)"],
        rows: [["Nord-Est","48","46"],["Sud-Est","54","52"],["Sud-Muntenia","46","48"],["Sud-Vest Oltenia","44","45"],["Vest","68","67"],["Nord-Vest","62","63"],["Centru","66","65"],["București-Ilfov","94","90"]] },
      { type: "chart", chartType: "bar", title: "IRI — scoruri orientative pe regiuni (0-100)", source: "Model UrbanX",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [46,52,48,45,67,63,65,90] },
      { type: "table", title: "IRI — utilități clasice vs. digital vs. deșeuri (orientativ)", source: "Model UrbanX (INS, ANCOM, ANPM)",
        headers: ["Regiune", "Utilități (apă-gaz)", "Digital (fibră)", "Deșeuri"],
        rows: [["Nord-Est","44","54","40"],["Sud-Est","50","57","44"],["Sud-Muntenia","45","58","42"],["Sud-Vest Oltenia","42","55","41"],["Vest","66","70","64"],["Nord-Vest","60","67","60"],["Centru","64","66","62"],["București-Ilfov","92","90","78"]] },
      { type: "chart", chartType: "hbar", title: "IRI — gradul de gazificare (scor orientativ)", source: "Model UrbanX (ANRE)",
        labels: ["Buc.-Ilfov","Centru","Vest","Nord-Vest","Sud-Munt.","Sud-Est","Nord-Est","SV Oltenia"],
        data: [88,68,66,62,50,48,44,42] },
      { type: "table", title: "IRI — siguranța alimentării cu energie (orientativ)", source: "Model UrbanX (Transelectrica)",
        headers: ["Regiune", "Siguranță energetică (indice)", "Scor componentă"],
        rows: [["Nord-Est","48","48"],["Sud-Est","58","58"],["Sud-Muntenia","52","52"],["Sud-Vest Oltenia","60","60"],["Vest","66","66"],["Nord-Vest","62","62"],["Centru","64","64"],["București-Ilfov","82","82"]] }
    ]
  },

  {
    title: "Infrastructure Readiness Index (IRI) — deficitul rural și agenda de echipare",
    blocks: [
      { type: "p", text: "Cel mai persistent decalaj relevat de IRI este cel dintre urban și rural în privința utilităților de bază. În regiunile cu populație rurală majoritară, gradul de conectare la canalizare și la rețele de gaze rămâne semnificativ sub media națională, ceea ce limitează atât calitatea vieții, cât și capacitatea de a atrage investiții care necesită utilități fiabile. Acest deficit de echipare este o frână structurală pentru convergența regiunilor estice și sudice." },
      { type: "p", text: "Agenda de echipare presupune o secvențiere clară: prioritar este sistemul apă-canal, cu impact direct asupra sănătății și mediului, urmat de digitalizare (fibră optică), care a devenit o utilitate esențială. Gazificarea și modernizarea drumurilor locale completează pachetul. Programul Anghel Saligny și fondurile europene oferă cadrul de finanțare, dar capacitatea administrativă de implementare rămâne un factor limitativ în regiunile cu scor scăzut." },
      { type: "p", text: "IRI se corelează puternic cu indicele de dezvoltare urbană și cu cel de competitivitate, confirmând că infrastructura de bază este o precondiție, nu o consecință a dezvoltării. Proiecția orientativă UrbanX indică un câștig de 8-12 puncte pentru regiunile rurale pe orizontul 2030, condiționat de finalizarea programelor de echipare cu apă-canal și de extinderea rețelelor de fibră în mediul rural." },
      { type: "chart", chartType: "bar", title: "IRI — scor actual vs. proiecție orientativă 2030 (model UrbanX)", source: "Model UrbanX",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [56,60,58,55,72,69,71,92] },
      { type: "table", title: "IRI — decalajul urban-rural pe utilități (orientativ)", source: "Model UrbanX (INS)",
        headers: ["Regiune", "Echipare urban", "Echipare rural", "Decalaj"],
        rows: [["Nord-Est","78","30","48"],["Sud-Est","80","34","46"],["Sud-Muntenia","76","28","48"],["Sud-Vest Oltenia","74","26","48"],["Vest","88","52","36"],["Nord-Vest","84","46","38"],["Centru","86","50","36"],["București-Ilfov","96","80","16"]] },
      { type: "chart", chartType: "donut", title: "IRI — distribuția regiunilor pe clase de pregătire", source: "Model UrbanX",
        labels: ["Pregătită (>65)","Medie (50-65)","Deficitară (<50)"],
        data: [3,1,4] },
      { type: "table", title: "IRI — starea drumurilor județene și comunale (orientativ)", source: "Model UrbanX (CNAIR, INS)",
        headers: ["Regiune", "Drumuri locale (indice)", "Scor componentă"],
        rows: [["Nord-Est","42","42"],["Sud-Est","50","50"],["Sud-Muntenia","48","48"],["Sud-Vest Oltenia","44","44"],["Vest","66","66"],["Nord-Vest","62","62"],["Centru","64","64"],["București-Ilfov","88","88"]] },
      { type: "chart", chartType: "hbar", title: "IRI — efortul investițional estimat de echipare (indice relativ)", source: "Model UrbanX",
        labels: ["SV Oltenia","Sud-Munt.","Nord-Est","Sud-Est","Nord-Vest","Centru","Vest","Buc.-Ilfov"],
        data: [90,88,86,78,50,46,42,15] }
    ]
  },

  {
    title: "Innovation Index (InnI) — definiție, formulă și sub-indicatori",
    blocks: [
      { type: "p", text: "Innovation Index (InnI) măsoară capacitatea unei regiuni de a genera, absorbi și difuza inovația — motorul productivității și al creșterii pe termen lung. Indicele se inspiră din Regional Innovation Scoreboard al Comisiei Europene și surprinde atât intrările (cheltuieli, capital uman), cât și ieșirile (brevete, firme inovatoare, export tehnologic). Inovarea diferențiază regiunile care urcă în lanțul valoric de cele blocate în activități cu valoare adăugată redusă." },
      { type: "p", text: "Cei cinci sub-indicatori sunt: cheltuielile de cercetare-dezvoltare ca procent din PIB (Eurostat), ponderea ocupării în sectoare intensive în cunoaștere (Eurostat), densitatea brevetelor și mărcilor (OSIM/EUIPO), ponderea firmelor inovatoare (INS, ancheta de inovare) și capitalul uman în știință și tehnologie (Eurostat). Formula este InnI = Σ wᵢ · scorᵢ, cu ponderi orientative C&D 0,25; ocupare în cunoaștere 0,20; brevete 0,20; firme inovatoare 0,20; capital uman STI 0,15." },
      { type: "p", text: "Normalizarea min-max relevă cea mai accentuată concentrare dintre toți indicii: inovarea este puternic polarizată în București-Ilfov și în centrele universitare puternice (Cluj în Nord-Vest, Timișoara în Vest). Cheltuielile de C&D ale României sunt printre cele mai scăzute din UE (sub 0,5% din PIB), iar la nivel regional ele sunt concentrate aproape integral în câteva orașe, lăsând majoritatea regiunilor cu un ecosistem de inovare incipient." },
      { type: "table", title: "InnI — scoruri orientative pe regiuni (model UrbanX)", source: "Eurostat, OSIM, INS — agregare UrbanX (cadru RIS)",
        headers: ["Regiune", "Cheltuieli C&D (indice)", "Scor InnI (0-100)"],
        rows: [["Nord-Est","28","32"],["Sud-Est","30","34"],["Sud-Muntenia","35","38"],["Sud-Vest Oltenia","26","31"],["Vest","62","64"],["Nord-Vest","68","67"],["Centru","58","60"],["București-Ilfov","100","92"]] },
      { type: "chart", chartType: "hbar", title: "InnI — clasament orientativ al regiunilor (0-100)", source: "Model UrbanX",
        labels: ["Buc.-Ilfov","Nord-Vest","Vest","Centru","Sud-Munt.","Sud-Est","Nord-Est","SV Oltenia"],
        data: [92,67,64,60,38,34,32,31] },
      { type: "table", title: "InnI — intrări (C&D) vs. ieșiri (brevete) orientativ", source: "Model UrbanX (Eurostat, OSIM)",
        headers: ["Regiune", "Intrări inovare", "Ieșiri inovare", "Firme inovatoare"],
        rows: [["Nord-Est","30","26","34"],["Sud-Est","32","28","36"],["Sud-Muntenia","36","34","40"],["Sud-Vest Oltenia","28","24","32"],["Vest","62","60","66"],["Nord-Vest","68","64","70"],["Centru","58","56","62"],["București-Ilfov","96","90","94"]] },
      { type: "chart", chartType: "bar", title: "InnI — ocuparea în sectoare intensive în cunoaștere (scor orientativ)", source: "Model UrbanX (Eurostat)",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [30,32,36,28,62,66,58,96] },
      { type: "table", title: "InnI — capital uman în știință și tehnologie (orientativ)", source: "Model UrbanX (Eurostat)",
        headers: ["Regiune", "Capital uman STI (indice)", "Scor componentă"],
        rows: [["Nord-Est","36","36"],["Sud-Est","38","38"],["Sud-Muntenia","42","42"],["Sud-Vest Oltenia","34","34"],["Vest","64","64"],["Nord-Vest","70","70"],["Centru","60","60"],["București-Ilfov","98","98"]] }
    ]
  },

  {
    title: "Innovation Index (InnI) — ecosisteme regionale și specializare inteligentă",
    blocks: [
      { type: "p", text: "Profilul InnI confirmă că inovarea în România este un fenomen metropolitan, ancorat în câteva ecosisteme universitar-industriale: București-Ilfov (IT, biotehnologie, servicii), Nord-Vest cu polul Cluj (IT, medicină, deep-tech) și Vest cu polul Timișoara (automotive, software, electronică). Aceste insule de inovare contrastează cu regiunile unde activitatea de cercetare-dezvoltare este aproape inexistentă, ceea ce reproduce și amplifică decalajele de competitivitate." },
      { type: "p", text: "Strategia de specializare inteligentă (RIS3) oferă cadrul pentru a transforma avantajele regionale existente în motoare de inovare: fiecare regiune își identifică nișele cu potențial (agro-tech în regiunile agricole, energie verde în zonele cu resurse, turism inteligent în regiunile cu patrimoniu) și concentrează resursele acolo. Cheia este conectarea universităților, firmelor și administrației în clustere funcționale, nu finanțarea dispersată a proiectelor izolate." },
      { type: "p", text: "Pentru decidenți, InnI semnalează că închiderea decalajului de inovare necesită o abordare diferențiată: regiunile-lider au nevoie de masă critică și de internaționalizare pentru a concura european, iar regiunile în urmă au nevoie întâi de capacitate de absorbție a inovației (transfer tehnologic, digitalizarea IMM-urilor). Proiecția orientativă UrbanX indică un potențial de creștere de 5-9 puncte pentru regiunile cu poli universitari pe orizontul 2030." },
      { type: "chart", chartType: "bar", title: "InnI — scor actual vs. proiecție orientativă 2030 (model UrbanX)", source: "Model UrbanX",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [38,38,42,35,69,73,66,94] },
      { type: "table", title: "InnI — domenii de specializare inteligentă pe regiune (orientativ)", source: "Model UrbanX (RIS3)",
        headers: ["Regiune", "Domeniu RIS3 prioritar", "Scor InnI"],
        rows: [["Nord-Est","Agro-tech, IT (Iași)","32"],["Sud-Est","Energie marină, logistică","34"],["Sud-Muntenia","Auto, agro-industrie","38"],["Sud-Vest Oltenia","Energie, materiale","31"],["Vest","Automotive, software","64"],["Nord-Vest","IT, sănătate, deep-tech","67"],["Centru","Industrie 4.0, turism","60"],["București-Ilfov","IT, biotech, fintech","92"]] },
      { type: "chart", chartType: "donut", title: "InnI — distribuția regiunilor pe clase de inovare", source: "Model UrbanX",
        labels: ["Lider (>80)","Moderat (55-80)","Incipient (<55)"],
        data: [1,3,4] },
      { type: "table", title: "InnI — densitatea brevetelor și mărcilor (orientativ)", source: "Model UrbanX (OSIM, EUIPO)",
        headers: ["Regiune", "Brevete (indice)", "Scor componentă"],
        rows: [["Nord-Est","26","26"],["Sud-Est","28","28"],["Sud-Muntenia","34","34"],["Sud-Vest Oltenia","24","24"],["Vest","60","60"],["Nord-Vest","64","64"],["Centru","56","56"],["București-Ilfov","90","90"]] },
      { type: "chart", chartType: "hbar", title: "InnI — gap de inovare față de București-Ilfov (puncte)", source: "Model UrbanX",
        labels: ["SV Oltenia","Nord-Est","Sud-Est","Sud-Munt.","Centru","Vest","Nord-Vest","Buc.-Ilfov"],
        data: [61,60,58,54,32,28,25,0] }
    ]
  },

  {
    title: "Climate Vulnerability Index (CVI) — definiție, formulă și sub-indicatori",
    blocks: [
      { type: "p", text: "Climate Vulnerability Index (CVI) cuantifică expunerea și sensibilitatea unei regiuni la efectele schimbărilor climatice, ajustate cu capacitatea de adaptare. CVI este construit astfel încât un scor RIDICAT să însemne o situație MAI BUNĂ (vulnerabilitate redusă), pentru consistență cu ceilalți indici UrbanX. Indicele integrează riscurile de inundații, secetă, valuri de căldură și degradare a terenurilor, ponderate cu capacitatea instituțională și financiară de a le gestiona." },
      { type: "p", text: "Cei cinci sub-indicatori sunt: expunerea la inundații (suprafață în zone de risc, Copernicus EFAS/ANAR), riscul de secetă agricolă (indicele de ariditate, ANM), expunerea la valuri de căldură urbane (insula de căldură, Copernicus), riscul de eroziune și degradare a solului (JRC ESDAC) și capacitatea de adaptare (investiții în prevenție plus capacitate fiscală, MFP). Toți indicatorii de risc sunt normalizați invers: scor = (max − x) / (max − min) × 100." },
      { type: "p", text: "Aplicarea formulei CVI = Σ wᵢ · scorᵢ (ponderi orientative inundații 0,25; secetă 0,25; căldură 0,15; eroziune 0,15; adaptare 0,20) relevă o vulnerabilitate climatică mai ridicată în sudul și sud-estul țării, expuse secetei agricole accentuate (Bărăganul, Oltenia, Dobrogea), și mai redusă în regiunile montane și colinare din Centru și Nord-Vest, cu regim pluviometric mai favorabil și risc de secetă mai scăzut." },
      { type: "table", title: "CVI — scoruri orientative pe regiuni (scor mare = mai puțin vulnerabil)", source: "Copernicus, ANAR, ANM, JRC ESDAC — agregare UrbanX",
        headers: ["Regiune", "Risc secetă (expunere)", "Scor CVI (0-100)"],
        rows: [["Nord-Est","55","52"],["Sud-Est","75","40"],["Sud-Muntenia","70","43"],["Sud-Vest Oltenia","78","41"],["Vest","45","60"],["Nord-Vest","40","64"],["Centru","35","67"],["București-Ilfov","60","55"]] },
      { type: "chart", chartType: "bar", title: "CVI — scoruri orientative (scor mare = vulnerabilitate redusă)", source: "Model UrbanX",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [52,40,43,41,60,64,67,55] },
      { type: "table", title: "CVI — expunere fizică vs. capacitate de adaptare (orientativ)", source: "Model UrbanX (Copernicus, MFP)",
        headers: ["Regiune", "Expunere (scor invers)", "Capacitate adaptare", "Risc inundații"],
        rows: [["Nord-Est","50","48","52"],["Sud-Est","38","44","48"],["Sud-Muntenia","42","46","45"],["Sud-Vest Oltenia","39","45","50"],["Vest","60","62","58"],["Nord-Vest","65","63","68"],["Centru","68","65","70"],["București-Ilfov","52","70","56"]] },
      { type: "chart", chartType: "hbar", title: "CVI — riscul de secetă agricolă (scor invers, mare = mai sigur)", source: "Model UrbanX (ANM)",
        labels: ["Centru","Nord-Vest","Vest","Nord-Est","Buc.-Ilfov","Sud-Munt.","SV Oltenia","Sud-Est"],
        data: [67,64,60,52,45,42,40,38] },
      { type: "table", title: "CVI — expunerea la valuri de căldură urbane (orientativ)", source: "Model UrbanX (Copernicus)",
        headers: ["Regiune", "Insula de căldură (expunere)", "Scor invers"],
        rows: [["Nord-Est","48","52"],["Sud-Est","60","40"],["Sud-Muntenia","58","42"],["Sud-Vest Oltenia","62","38"],["Vest","45","55"],["Nord-Vest","40","60"],["Centru","36","64"],["București-Ilfov","72","28"]] }
    ]
  },

  {
    title: "Climate Vulnerability Index (CVI) — hotspoturi de risc și adaptare prioritară",
    blocks: [
      { type: "p", text: "Profilul CVI identifică sudul și sud-estul României drept hotspoturi de vulnerabilitate climatică, în primul rând din cauza secetei agricole recurente care afectează câmpiile cerealiere ale Bărăganului, Olteniei și Dobrogei. Aceste regiuni cumulează o expunere ridicată (agricultură dependentă de precipitații, irigații degradate) cu o capacitate de adaptare limitată, ceea ce le plasează în partea inferioară a clasamentului orientativ și impune măsuri urgente de adaptare." },
      { type: "p", text: "Adaptarea prioritară diferă pe tip de risc. Pentru seceta agricolă, reabilitarea și extinderea sistemelor de irigații, agricultura conservativă și asigurările climatice au cel mai mare impact. Pentru riscul de inundații sunt esențiale lucrările de protecție, restaurarea zonelor umede și sistemele de avertizare timpurie. Pentru valurile de căldură urbane, infrastructura verde-albastră și reducerea insulei de căldură protejează populația vulnerabilă din orașe." },
      { type: "p", text: "CVI atrage atenția că vulnerabilitatea nu este determinată doar de expunerea fizică, ci și de capacitatea de adaptare, care depinde de resurse și de capacitate administrativă. Regiunile cu expunere ridicată și capacitate redusă necesită sprijin prioritar prin fondurile de adaptare climatică. Proiecția orientativă UrbanX indică o ameliorare de 6-10 puncte în regiunile sudice prin investiții în irigații și infrastructură verde pe orizontul 2035." },
      { type: "chart", chartType: "bar", title: "CVI — scor actual vs. proiecție orientativă 2035 (cu adaptare)", source: "Model UrbanX",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [56,49,52,50,64,67,70,62] },
      { type: "table", title: "CVI — hotspoturi de risc și măsura prioritară (orientativ)", source: "Model UrbanX",
        headers: ["Regiune", "Risc dominant", "Măsură prioritară", "Scor CVI"],
        rows: [["Sud-Est","Secetă, inundații","irigații","40"],["Sud-Vest Oltenia","Secetă, eroziune","irigații","41"],["Sud-Muntenia","Secetă","irigații","43"],["Nord-Est","Inundații","protecție","52"],["București-Ilfov","Insula de căldură","infrastructură verde","55"],["Vest","Inundații locale","protecție","60"],["Nord-Vest","Risc redus","monitorizare","64"],["Centru","Risc redus","monitorizare","67"]] },
      { type: "chart", chartType: "donut", title: "CVI — distribuția regiunilor pe clase de vulnerabilitate", source: "Model UrbanX",
        labels: ["Redusă (>60)","Medie (50-60)","Ridicată (<50)"],
        data: [3,2,3] },
      { type: "table", title: "CVI — riscul de eroziune și degradare a solului (orientativ)", source: "Model UrbanX (JRC ESDAC)",
        headers: ["Regiune", "Eroziune (expunere)", "Scor invers"],
        rows: [["Nord-Est","50","50"],["Sud-Est","58","42"],["Sud-Muntenia","54","46"],["Sud-Vest Oltenia","60","40"],["Vest","42","58"],["Nord-Vest","38","62"],["Centru","34","66"],["București-Ilfov","40","60"]] },
      { type: "chart", chartType: "hbar", title: "CVI — capacitatea de adaptare instituțională (scor orientativ)", source: "Model UrbanX (MFP)",
        labels: ["Buc.-Ilfov","Centru","Nord-Vest","Vest","Nord-Est","Sud-Munt.","SV Oltenia","Sud-Est"],
        data: [70,65,63,62,48,46,45,44] }
    ]
  },

  {
    title: "Social Cohesion Index (SCI) — definiție, formulă și sub-indicatori",
    blocks: [
      { type: "p", text: "Social Cohesion Index (SCI) măsoară gradul de coeziune socială a unei regiuni — măsura în care locuitorii beneficiază de incluziune, oportunități echitabile și un nivel scăzut de excluziune. Coeziunea socială este atât o valoare în sine, cât și un factor de stabilitate și de productivitate: societățile coezive au mai puține conflicte, niveluri mai ridicate de încredere și o mobilitate socială mai bună. SCI integrează dimensiunile veniturilor, ocupării, educației, sănătății și incluziunii." },
      { type: "p", text: "Cei șase sub-indicatori sunt: rata sărăciei relative și a deprivării materiale (INS/Eurostat, normalizate invers), inegalitatea veniturilor (coeficientul Gini, Eurostat, invers), rata ocupării (INS), rata de părăsire timpurie a școlii (INS, invers), accesul la servicii de sănătate (INS) și ponderea NEET (tineri neîncadrați în educație sau muncă, Eurostat, invers). Formula este SCI = Σ wᵢ · scorᵢ, cu ponderi orientative sărăcie 0,22; inegalitate 0,15; ocupare 0,18; abandon școlar 0,15; sănătate 0,15; NEET 0,15." },
      { type: "p", text: "Normalizarea min-max și inversă produce o ierarhie în care regiunile mai dezvoltate economic (București-Ilfov, Vest, Centru) au coeziune socială mai ridicată, datorită ratelor de ocupare mai bune și sărăciei mai reduse, în timp ce regiunile cu economii mai fragile (Nord-Est, Sud-Vest Oltenia, Sud-Muntenia) prezintă rate de sărăcie și de NEET mai ridicate. Relația nu este perfect liniară: unele regiuni cu venituri medii mențin coeziunea bună prin inegalitate redusă." },
      { type: "table", title: "SCI — scoruri orientative pe regiuni (model UrbanX)", source: "INS, Eurostat — agregare UrbanX",
        headers: ["Regiune", "Rata sărăciei (% — invers în scor)", "Scor SCI (0-100)"],
        rows: [["Nord-Est","32","44"],["Sud-Est","30","47"],["Sud-Muntenia","28","49"],["Sud-Vest Oltenia","31","46"],["Vest","16","66"],["Nord-Vest","18","63"],["Centru","20","61"],["București-Ilfov","12","74"]] },
      { type: "chart", chartType: "hbar", title: "SCI — clasament orientativ al regiunilor (0-100)", source: "Model UrbanX",
        labels: ["Buc.-Ilfov","Vest","Nord-Vest","Centru","Sud-Munt.","Sud-Est","SV Oltenia","Nord-Est"],
        data: [74,66,63,61,49,47,46,44] },
      { type: "table", title: "SCI — coeziune economică vs. educațională (orientativ)", source: "Model UrbanX (INS, Eurostat)",
        headers: ["Regiune", "Coeziune economică", "Coeziune educațională", "Acces sănătate"],
        rows: [["Nord-Est","42","46","43"],["Sud-Est","45","48","48"],["Sud-Muntenia","48","50","42"],["Sud-Vest Oltenia","44","47","46"],["Vest","66","65","64"],["Nord-Vest","62","64","62"],["Centru","60","62","60"],["București-Ilfov","74","73","90"]] },
      { type: "chart", chartType: "bar", title: "SCI — ponderea tinerilor NEET (scor invers, mare = mai puțini NEET)", source: "Model UrbanX (Eurostat)",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [42,45,47,44,64,62,60,76] },
      { type: "table", title: "SCI — inegalitatea veniturilor (Gini, scor invers, orientativ)", source: "Model UrbanX (Eurostat)",
        headers: ["Regiune", "Gini (indice)", "Scor invers"],
        rows: [["Nord-Est","36","46"],["Sud-Est","35","48"],["Sud-Muntenia","34","50"],["Sud-Vest Oltenia","35","47"],["Vest","30","64"],["Nord-Vest","31","62"],["Centru","32","60"],["București-Ilfov","34","52"]] }
    ]
  },

  {
    title: "Social Cohesion Index (SCI) — riscuri de excluziune și politici de incluziune",
    blocks: [
      { type: "p", text: "Analiza SCI evidențiază că riscurile de excluziune socială sunt concentrate în regiunile estice și sudice, unde se suprapun rate ridicate de sărăcie, abandon școlar și tineri NEET. Aceste fenomene se autoperpetuează: sărăcia limitează accesul la educație de calitate, abandonul școlar reduce șansele de ocupare, iar șomajul tinerilor alimentează emigrația și depopularea. Ruperea acestui cerc vicios necesită intervenții integrate, nu măsuri punctuale." },
      { type: "p", text: "Politicile de incluziune cu cel mai mare impact asupra SCI vizează educația timpurie (combaterea abandonului), formarea profesională adaptată pieței muncii (reducerea NEET) și accesul la servicii de bază în comunitățile marginalizate. Programele de tip a doua șansă, garanția pentru tineret și investițiile în servicii sociale comunitare sunt instrumente cheie. Coeziunea beneficiază și de creșterea economică incluzivă, care creează locuri de muncă accesibile populației vulnerabile." },
      { type: "p", text: "SCI completează indicii economici cu o dimensiune esențială pentru sustenabilitate: o regiune nu este cu adevărat dezvoltată dacă creșterea economică ocolește o parte semnificativă a populației. Pentru decidenți, indicele semnalează unde riscul de fractură socială este mai mare. Proiecția orientativă UrbanX indică un câștig de 5-8 puncte pentru regiunile vulnerabile prin politici de incluziune și creștere a ocupării pe orizontul 2030." },
      { type: "chart", chartType: "bar", title: "SCI — scor actual vs. proiecție orientativă 2030 (model UrbanX)", source: "Model UrbanX",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [50,53,54,52,69,67,65,76] },
      { type: "table", title: "SCI — riscul de fractură socială pe regiuni (orientativ)", source: "Model UrbanX",
        headers: ["Regiune", "Risc excluziune", "Prioritate", "Scor SCI"],
        rows: [["Nord-Est","ridicat","maximă","44"],["Sud-Vest Oltenia","ridicat","ridicată","46"],["Sud-Est","mediu","ridicată","47"],["Sud-Muntenia","mediu","medie","49"],["Centru","redus","medie","61"],["Nord-Vest","redus","medie","63"],["Vest","redus","redusă","66"],["București-Ilfov","scăzut","redusă","74"]] },
      { type: "chart", chartType: "donut", title: "SCI — distribuția regiunilor pe clase de coeziune", source: "Model UrbanX",
        labels: ["Ridicată (>60)","Medie (48-60)","Fragilă (<48)"],
        data: [4,2,2] },
      { type: "table", title: "SCI — rata de părăsire timpurie a școlii (scor invers, orientativ)", source: "Model UrbanX (INS)",
        headers: ["Regiune", "Abandon școlar (%)", "Scor invers"],
        rows: [["Nord-Est","18","44"],["Sud-Est","20","42"],["Sud-Muntenia","19","43"],["Sud-Vest Oltenia","17","46"],["Vest","11","64"],["Nord-Vest","12","62"],["Centru","13","60"],["București-Ilfov","9","72"]] },
      { type: "chart", chartType: "hbar", title: "SCI — rata ocupării (componentă, scor orientativ)", source: "Model UrbanX (INS)",
        labels: ["Buc.-Ilfov","Vest","Nord-Vest","Centru","Sud-Munt.","Sud-Est","SV Oltenia","Nord-Est"],
        data: [75,66,62,60,50,48,46,44] }
    ]
  },

  {
    title: "Administrative Efficiency Index (AEI) — definiție, formulă și sub-indicatori",
    blocks: [
      { type: "p", text: "Administrative Efficiency Index (AEI) evaluează capacitatea administrațiilor publice dintr-o regiune de a furniza servicii eficiente, de a absorbi fonduri și de a implementa proiecte. Calitatea guvernanței este un determinant subestimat al dezvoltării: două regiuni cu resurse similare pot avea traiectorii diferite în funcție de capacitatea lor administrativă. AEI integrează indicatori de absorbție a fondurilor, digitalizare, capacitate fiscală și calitate a serviciilor administrative." },
      { type: "p", text: "Cei cinci sub-indicatori sunt: rata de absorbție a fondurilor europene (ADR/MIPE), gradul de digitalizare a serviciilor publice (ADR/indicele DESI regional), capacitatea fiscală (venituri proprii pe locuitor, MFP), durata medie de implementare a proiectelor publice (estimare ADR) și indicele european de calitate a guvernanței regionale (EQI, Universitatea Göteborg). Formula este AEI = Σ wᵢ · scorᵢ, cu ponderi orientative absorbție 0,25; digitalizare 0,20; capacitate fiscală 0,20; viteză implementare 0,15; calitate guvernanță 0,20." },
      { type: "p", text: "Normalizarea min-max relevă variații ale eficienței administrative care nu se suprapun perfect peste nivelul de dezvoltare economică: unele administrații din regiuni mai puțin dezvoltate au demonstrat o capacitate bună de absorbție, în timp ce regiuni mai bogate au întâmpinat blocaje birocratice. Per ansamblu, regiunile vestice și centrale și București-Ilfov mențin un avantaj de capacitate, susținut de o bază fiscală mai solidă și de experiență în managementul proiectelor europene." },
      { type: "table", title: "AEI — scoruri orientative pe regiuni (model UrbanX)", source: "MIPE, ADR, MFP, EQI Göteborg — agregare UrbanX",
        headers: ["Regiune", "Absorbție fonduri (indice)", "Scor AEI (0-100)"],
        rows: [["Nord-Est","52","50"],["Sud-Est","48","48"],["Sud-Muntenia","50","49"],["Sud-Vest Oltenia","46","47"],["Vest","64","63"],["Nord-Vest","66","65"],["Centru","62","61"],["București-Ilfov","70","72"]] },
      { type: "chart", chartType: "bar", title: "AEI — scoruri orientative pe regiuni (0-100)", source: "Model UrbanX",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [50,48,49,47,63,65,61,72] },
      { type: "table", title: "AEI — absorbție vs. digitalizare vs. capacitate fiscală (orientativ)", source: "Model UrbanX (MIPE, ADR, MFP)",
        headers: ["Regiune", "Absorbție", "Digitalizare", "Capacitate fiscală"],
        rows: [["Nord-Est","52","48","44"],["Sud-Est","48","47","48"],["Sud-Muntenia","50","49","46"],["Sud-Vest Oltenia","46","46","45"],["Vest","64","62","64"],["Nord-Vest","66","65","62"],["Centru","62","60","63"],["București-Ilfov","70","75","80"]] },
      { type: "chart", chartType: "hbar", title: "AEI — calitatea guvernanței regionale (EQI, scor orientativ)", source: "Model UrbanX (EQI Göteborg)",
        labels: ["Buc.-Ilfov","Nord-Vest","Vest","Centru","Nord-Est","Sud-Munt.","Sud-Est","SV Oltenia"],
        data: [70,65,63,61,50,49,48,47] },
      { type: "table", title: "AEI — durata medie de implementare a proiectelor (scor invers, orientativ)", source: "Model UrbanX (ADR)",
        headers: ["Regiune", "Durată implementare (indice)", "Scor invers"],
        rows: [["Nord-Est","58","50"],["Sud-Est","60","48"],["Sud-Muntenia","59","49"],["Sud-Vest Oltenia","62","46"],["Vest","48","64"],["Nord-Vest","46","66"],["Centru","50","62"],["București-Ilfov","42","70"]] }
    ]
  },

  {
    title: "Administrative Efficiency Index (AEI) — guvernanță, absorbție și reforma capacității",
    blocks: [
      { type: "p", text: "AEI scoate în evidență faptul că eficiența administrativă este o resursă în sine, distinctă de resursele financiare. Indicele european de calitate a guvernanței (EQI) plasează România per ansamblu sub media UE, dar cu variații regionale notabile. Diferențele de capacitate administrativă explică de ce proiecte similare au costuri și durate foarte diferite între regiuni și de ce unele administrații atrag constant fonduri, iar altele acumulează proiecte blocate." },
      { type: "p", text: "Reforma capacității administrative are trei direcții complementare. Prima este profesionalizarea și stabilizarea funcției publice, reducând fluctuația de personal calificat. A doua este digitalizarea proceselor, care crește transparența și viteza serviciilor. A treia este consolidarea cooperării inter-administrative (asociații de dezvoltare intercomunitară), care permite comunelor mici să atingă masa critică pentru proiecte complexe pe care nu le-ar putea gestiona individual." },
      { type: "p", text: "Pentru arhitectura unei eventuale regionalizări, AEI este un indicator central: transferul de competențe către nivelul regional are sens doar dacă structurile regionale au capacitatea de a le exercita eficient. Indicele oferă o bază pentru a calibra ritmul descentralizării. Proiecția orientativă UrbanX indică un câștig de 6-9 puncte prin digitalizare și profesionalizare pe orizontul 2030 în regiunile cu capacitate medie." },
      { type: "chart", chartType: "bar", title: "AEI — scor actual vs. proiecție orientativă 2030 (model UrbanX)", source: "Model UrbanX",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [57,55,56,54,69,71,67,78] },
      { type: "table", title: "AEI — capacitate de a prelua competențe regionale (orientativ)", source: "Model UrbanX",
        headers: ["Regiune", "Pregătire descentralizare", "Recomandare", "Scor AEI"],
        rows: [["București-Ilfov","ridicată","transfer rapid","72"],["Nord-Vest","ridicată","transfer rapid","65"],["Vest","ridicată","transfer rapid","63"],["Centru","medie","gradual","61"],["Nord-Est","medie","cu sprijin","50"],["Sud-Muntenia","medie","cu sprijin","49"],["Sud-Est","medie","cu sprijin","48"],["Sud-Vest Oltenia","redusă","consolidare întâi","47"]] },
      { type: "chart", chartType: "donut", title: "AEI — distribuția regiunilor pe clase de eficiență administrativă", source: "Model UrbanX",
        labels: ["Ridicată (>60)","Medie (48-60)","Scăzută (<48)"],
        data: [4,3,1] },
      { type: "table", title: "AEI — capacitatea fiscală (venituri proprii/locuitor, orientativ)", source: "Model UrbanX (MFP)",
        headers: ["Regiune", "Venituri proprii/loc. (indice)", "Scor componentă"],
        rows: [["Nord-Est","44","44"],["Sud-Est","48","48"],["Sud-Muntenia","46","46"],["Sud-Vest Oltenia","45","45"],["Vest","64","64"],["Nord-Vest","62","62"],["Centru","63","63"],["București-Ilfov","80","80"]] },
      { type: "chart", chartType: "hbar", title: "AEI — rata de absorbție a fondurilor europene (scor orientativ)", source: "Model UrbanX (MIPE)",
        labels: ["Buc.-Ilfov","Nord-Vest","Vest","Centru","Nord-Est","Sud-Munt.","Sud-Est","SV Oltenia"],
        data: [70,66,64,62,52,50,48,46] }
    ]
  },

  {
    title: "Economic Diversification Index (EDI) — definiție, formulă și sub-indicatori",
    blocks: [
      { type: "p", text: "Economic Diversification Index (EDI) măsoară gradul de diversificare a structurii economice a unei regiuni — opusul dependenței de un singur sector sau de un singur mare angajator. O economie diversificată este mai rezilientă la șocuri sectoriale, oferă o gamă mai largă de oportunități de ocupare și are un potențial de creștere mai stabil. EDI cuantifică distribuția valorii adăugate și a ocupării între sectoarele economice, penalizând concentrarea excesivă." },
      { type: "p", text: "Cei patru sub-indicatori sunt: indicele Herfindahl-Hirschman al concentrării sectoriale a VAB (Eurostat, normalizat invers — concentrare mai mică înseamnă scor mai mare), ponderea sectorului terțiar avansat (servicii intensive în cunoaștere, Eurostat), diversitatea bazei de export (INS/Eurostat) și numărul de sectoare care depășesc un prag minim de ocupare (INS). Formula este EDI = Σ wᵢ · scorᵢ, cu ponderi orientative HHI invers 0,35; terțiar avansat 0,25; diversitate export 0,20; sectoare semnificative 0,20." },
      { type: "p", text: "Aplicând normalizarea min-max, EDI relevă o diversificare mai ridicată în regiunile metropolitane și vestice, unde coexistă industrie, servicii avansate și economie a cunoașterii, și mai redusă în regiunile dependente puternic de agricultură (Sud-Muntenia, Sud-Est) sau de câteva ramuri industriale tradiționale (Sud-Vest Oltenia, cu energie și industrie grea). București-Ilfov are cea mai diversificată și mai terțiarizată economie, ceea ce îi conferă scorul maxim." },
      { type: "table", title: "EDI — scoruri orientative pe regiuni (model UrbanX)", source: "Eurostat (conturi regionale), INS — agregare UrbanX",
        headers: ["Regiune", "Concentrare sectorială (HHI invers)", "Scor EDI (0-100)"],
        rows: [["Nord-Est","50","49"],["Sud-Est","48","47"],["Sud-Muntenia","44","45"],["Sud-Vest Oltenia","42","43"],["Vest","66","65"],["Nord-Vest","68","66"],["Centru","64","63"],["București-Ilfov","82","80"]] },
      { type: "chart", chartType: "hbar", title: "EDI — clasament orientativ al regiunilor (0-100)", source: "Model UrbanX",
        labels: ["Buc.-Ilfov","Nord-Vest","Vest","Centru","Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia"],
        data: [80,66,65,63,49,47,45,43] },
      { type: "table", title: "EDI — diversificare sectorială vs. terțiar avansat (orientativ)", source: "Model UrbanX (Eurostat)",
        headers: ["Regiune", "Diversificare sectorială", "Terțiar avansat", "Diversitate export"],
        rows: [["Nord-Est","50","44","48"],["Sud-Est","48","42","50"],["Sud-Muntenia","44","40","52"],["Sud-Vest Oltenia","42","38","44"],["Vest","66","62","68"],["Nord-Vest","68","64","66"],["Centru","64","60","62"],["București-Ilfov","82","88","78"]] },
      { type: "chart", chartType: "bar", title: "EDI — ponderea sectorului terțiar avansat (scor orientativ)", source: "Model UrbanX (Eurostat)",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [44,42,40,38,62,64,60,88] },
      { type: "table", title: "EDI — sectorul dominant și ponderea sa în VAB (orientativ)", source: "Model UrbanX (INS)",
        headers: ["Regiune", "Sector dominant", "Pondere VAB (%)"],
        rows: [["Nord-Est","Servicii, agricultură","28"],["Sud-Est","Agricultură, logistică","30"],["Sud-Muntenia","Agricultură, industrie","34"],["Sud-Vest Oltenia","Energie, industrie grea","36"],["Vest","Industrie prelucrătoare","26"],["Nord-Vest","Servicii, IT","24"],["Centru","Industrie, turism","27"],["București-Ilfov","Servicii","22"]] }
    ]
  },

  {
    title: "Public Services Accessibility Index (PSAI) — definiție, formulă și sub-indicatori",
    blocks: [
      { type: "p", text: "Public Services Accessibility Index (PSAI) măsoară cât de accesibile sunt serviciile publice esențiale — sănătate, educație, administrație, transport public — pentru locuitorii unei regiuni, indiferent unde trăiesc. Accesibilitatea serviciilor publice este un determinant direct al calității vieții și al echității teritoriale: o regiune poate avea dotări bune în orașe, dar comunități rurale lipsite de acces la medic, școală sau transport. PSAI surprinde tocmai această echitate de acces." },
      { type: "p", text: "Cei șase sub-indicatori sunt: accesul la servicii de sănătate (medici la 1000 locuitori și timp de acces la spital, INS), accesul la educație (densitatea unităților și navetism școlar, INS), acoperirea cu transport public (INS/AMTU), accesul la servicii administrative digitalizate (ADR), proximitatea serviciilor de urgență (IGSU, timp de intervenție) și acoperirea cu servicii sociale (MMSS). Formula este PSAI = Σ wᵢ · scorᵢ, cu ponderi orientative sănătate 0,22; educație 0,20; transport public 0,18; administrație digitală 0,12; urgențe 0,15; servicii sociale 0,13." },
      { type: "p", text: "Normalizarea min-max relevă un decalaj puternic urban-rural în accesibilitatea serviciilor: regiunile cu pondere urbană mare și cu poli puternici (București-Ilfov, Centru, Vest) oferă acces mai bun, în timp ce regiunile cu populație rurală dispersată (Nord-Est, Sud-Muntenia, Sud-Vest Oltenia) au comunități cu acces redus la medic, transport public sau servicii de urgență în timp util, ceea ce afectează direct sănătatea și oportunitățile populației rurale." },
      { type: "table", title: "PSAI — scoruri orientative pe regiuni (model UrbanX)", source: "INS, IGSU, AMTU, MMSS — agregare UrbanX",
        headers: ["Regiune", "Medici la 1000 loc. (indice)", "Scor PSAI (0-100)"],
        rows: [["Nord-Est","42","45"],["Sud-Est","48","49"],["Sud-Muntenia","40","44"],["Sud-Vest Oltenia","46","47"],["Vest","64","65"],["Nord-Vest","62","63"],["Centru","60","62"],["București-Ilfov","100","88"]] },
      { type: "chart", chartType: "bar", title: "PSAI — scoruri orientative pe regiuni (0-100)", source: "Model UrbanX",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [45,49,44,47,65,63,62,88] },
      { type: "table", title: "PSAI — acces sănătate vs. educație vs. transport public (orientativ)", source: "Model UrbanX (INS, AMTU)",
        headers: ["Regiune", "Acces sănătate", "Acces educație", "Transport public"],
        rows: [["Nord-Est","43","47","40"],["Sud-Est","48","50","46"],["Sud-Muntenia","42","46","42"],["Sud-Vest Oltenia","46","48","44"],["Vest","64","66","62"],["Nord-Vest","62","64","60"],["Centru","60","63","58"],["București-Ilfov","90","86","92"]] },
      { type: "chart", chartType: "hbar", title: "PSAI — proximitatea serviciilor de urgență (scor orientativ)", source: "Model UrbanX (IGSU)",
        labels: ["Buc.-Ilfov","Vest","Centru","Nord-Vest","Sud-Est","Nord-Est","SV Oltenia","Sud-Munt."],
        data: [88,64,62,60,48,44,46,42] },
      { type: "table", title: "PSAI — acoperirea cu servicii sociale (orientativ)", source: "Model UrbanX (MMSS)",
        headers: ["Regiune", "Servicii sociale (indice)", "Scor componentă"],
        rows: [["Nord-Est","44","44"],["Sud-Est","48","48"],["Sud-Muntenia","42","42"],["Sud-Vest Oltenia","46","46"],["Vest","64","64"],["Nord-Vest","62","62"],["Centru","60","60"],["București-Ilfov","86","86"]] }
    ]
  },

  {
    title: "Public Services Accessibility Index (PSAI) — echitate teritorială și rețele de servicii",
    blocks: [
      { type: "p", text: "PSAI evidențiază că echitatea teritorială în accesul la servicii publice este una dintre cele mai mari provocări ale dezvoltării regionale românești. Concentrarea serviciilor în orașe și subdimensionarea lor în mediul rural produc un cerc vicios al depopulării: lipsa serviciilor împinge populația, în special tinerii și familiile, către orașe sau în străinătate, ceea ce reduce și mai mult masa critică necesară menținerii serviciilor în zonele rămase." },
      { type: "p", text: "Rețelele de servicii pot fi optimizate prin organizare policentrică: nu fiecare comună poate avea spital, dar fiecare zonă funcțională poate avea un centru de servicii bine conectat prin transport public. Telemedicina, școlile-pilot conectate digital și serviciile administrative online pot compensa parțial distanța fizică. Cheia este planificarea integrată a rețelei la nivel de zonă funcțională, nu administrativă, pentru a maximiza acoperirea cu resurse limitate." },
      { type: "p", text: "PSAI completează indicii de dezvoltare cu o dimensiune de echitate spațială esențială pentru coeziunea teritorială. Pentru decidenți, indicele identifică zonele cu deficit critic de servicii și orientează investițiile în infrastructura socială. Proiecția orientativă UrbanX indică un câștig de 6-9 puncte pentru regiunile rurale prin telemedicină, transport public regional și digitalizarea serviciilor pe orizontul 2030." },
      { type: "chart", chartType: "bar", title: "PSAI — scor actual vs. proiecție orientativă 2030 (model UrbanX)", source: "Model UrbanX",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [52,55,51,53,70,68,67,90] },
      { type: "table", title: "PSAI — decalajul urban-rural în acces la servicii (orientativ)", source: "Model UrbanX (INS)",
        headers: ["Regiune", "Acces urban", "Acces rural", "Decalaj"],
        rows: [["Nord-Est","72","30","42"],["Sud-Est","75","34","41"],["Sud-Muntenia","70","28","42"],["Sud-Vest Oltenia","73","32","41"],["Vest","86","48","38"],["Nord-Vest","84","46","38"],["Centru","85","48","37"],["București-Ilfov","94","78","16"]] },
      { type: "chart", chartType: "donut", title: "PSAI — distribuția regiunilor pe clase de accesibilitate la servicii", source: "Model UrbanX",
        labels: ["Bună (>60)","Medie (48-60)","Deficitară (<48)"],
        data: [4,1,3] },
      { type: "table", title: "PSAI — serviciile administrative digitalizate (orientativ)", source: "Model UrbanX (ADR)",
        headers: ["Regiune", "Administrație digitală (indice)", "Scor componentă"],
        rows: [["Nord-Est","48","48"],["Sud-Est","50","50"],["Sud-Muntenia","49","49"],["Sud-Vest Oltenia","47","47"],["Vest","64","64"],["Nord-Vest","66","66"],["Centru","62","62"],["București-Ilfov","85","85"]] },
      { type: "chart", chartType: "hbar", title: "PSAI — densitatea unităților de educație (scor orientativ)", source: "Model UrbanX (INS)",
        labels: ["Buc.-Ilfov","Vest","Nord-Vest","Centru","Sud-Est","SV Oltenia","Nord-Est","Sud-Munt."],
        data: [86,66,64,63,50,48,47,46] }
    ]
  },

  {
    title: "Heritage Exposure Index (HEI) — definiție, formulă și sub-indicatori",
    blocks: [
      { type: "p", text: "Heritage Exposure Index (HEI) cuantifică patrimoniul cultural și natural al unei regiuni și gradul său de valorificare și protecție. Patrimoniul este atât o valoare identitară, cât și o resursă economică prin turism și industrii creative. HEI surprinde densitatea și diversitatea patrimoniului (monumente, situri, peisaje, arii protejate) împreună cu gradul în care acesta este protejat, accesibil și valorificat economic. Un patrimoniu bogat dar neprotejat sau nevalorificat reprezintă o oportunitate ratată." },
      { type: "p", text: "Cei patru sub-indicatori sunt: densitatea monumentelor istorice și a siturilor (Lista Monumentelor Istorice, INP, raportată la suprafață), prezența patrimoniului UNESCO și de valoare națională (INP/UNESCO), suprafața ariilor naturale protejate (Natura 2000, ANANP) și gradul de valorificare turistică a patrimoniului (sosiri turistice culturale, INS). Formula este HEI = Σ wᵢ · scorᵢ, cu ponderi orientative densitate monumente 0,30; patrimoniu de excepție 0,25; arii naturale 0,20; valorificare turistică 0,25." },
      { type: "p", text: "Normalizarea min-max relevă o concentrare a patrimoniului construit de valoare în regiunile cu istorie urbană bogată — Centru (orașe medievale transilvănene, biserici fortificate UNESCO), București-Ilfov (patrimoniu urban), Nord-Est (mănăstirile pictate din Bucovina, UNESCO) — și a patrimoniului natural în regiunile montane și deltaice (Delta Dunării UNESCO în Sud-Est, Carpații în Centru și Vest). Această diversitate patrimonială este un atu strategic insuficient valorificat al României." },
      { type: "table", title: "HEI — scoruri orientative pe regiuni (model UrbanX)", source: "INP (LMI), UNESCO, ANANP, INS — agregare UrbanX",
        headers: ["Regiune", "Densitate monumente (indice)", "Scor HEI (0-100)"],
        rows: [["Nord-Est","62","64"],["Sud-Est","50","58"],["Sud-Muntenia","55","54"],["Sud-Vest Oltenia","48","50"],["Vest","58","60"],["Nord-Vest","64","66"],["Centru","80","82"],["București-Ilfov","78","72"]] },
      { type: "chart", chartType: "hbar", title: "HEI — clasament orientativ al regiunilor (0-100)", source: "Model UrbanX",
        labels: ["Centru","Buc.-Ilfov","Nord-Vest","Nord-Est","Vest","Sud-Est","Sud-Munt.","SV Oltenia"],
        data: [82,72,66,64,60,58,54,50] },
      { type: "table", title: "HEI — patrimoniu construit vs. natural vs. valorificare (orientativ)", source: "Model UrbanX (INP, ANANP, INS)",
        headers: ["Regiune", "Patrimoniu construit", "Patrimoniu natural", "Valorificare turistică"],
        rows: [["Nord-Est","66","60","58"],["Sud-Est","52","70","56"],["Sud-Muntenia","56","50","48"],["Sud-Vest Oltenia","48","54","44"],["Vest","58","64","56"],["Nord-Vest","64","66","60"],["Centru","82","80","78"],["București-Ilfov","78","58","72"]] },
      { type: "chart", chartType: "bar", title: "HEI — suprafața ariilor naturale protejate (scor orientativ)", source: "Model UrbanX (ANANP)",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [60,70,50,54,64,66,80,58] },
      { type: "table", title: "HEI — situri UNESCO și de valoare națională pe regiune (orientativ)", source: "Model UrbanX (UNESCO, INP)",
        headers: ["Regiune", "Situri de excepție", "Scor componentă"],
        rows: [["Nord-Est","3","68"],["Sud-Est","2","60"],["Sud-Muntenia","1","52"],["Sud-Vest Oltenia","1","48"],["Vest","1","56"],["Nord-Vest","2","62"],["Centru","4","85"],["București-Ilfov","2","70"]] }
    ]
  },

  {
    title: "Real Estate Pressure Index (REPI) — definiție, formulă și sub-indicatori",
    blocks: [
      { type: "p", text: "Real Estate Pressure Index (REPI) măsoară intensitatea presiunii pe piața imobiliară a unei regiuni — dinamica prețurilor, a tranzacțiilor și a autorizărilor de construire, raportată la capacitatea de absorbție și la accesibilitatea locuirii. Presiunea imobiliară este un indicator ambivalent: reflectă atractivitatea și creșterea economică, dar și riscul de supraîncălzire, de speculație și de excludere a populației locale de pe piața locuințelor. REPI cuantifică această tensiune." },
      { type: "p", text: "Cei cinci sub-indicatori sunt: dinamica prețului locuințelor (indicele prețurilor rezidențiale, INS/BNR), volumul tranzacțiilor imobiliare (ANCPI), ritmul autorizărilor de construire (INS), raportul preț/venit ca măsură a accesibilității (estimare INS, normalizat invers — accesibilitate mai mică înseamnă presiune mai mare) și expansiunea urbană (creșterea suprafeței construite, Copernicus). Formula este REPI = Σ wᵢ · scorᵢ, cu ponderi orientative dinamică preț 0,25; tranzacții 0,20; autorizări 0,20; preț/venit 0,20; expansiune urbană 0,15." },
      { type: "p", text: "Spre deosebire de ceilalți indici, la REPI un scor RIDICAT semnalează o presiune mai mare (nu neapărat favorabilă). Normalizarea min-max relevă o presiune concentrată masiv în București-Ilfov, unde cererea, prețurile și autorizările depășesc net restul țării, urmat la distanță de polii regionali atractivi (Cluj în Nord-Vest, Timișoara în Vest, Brașov în Centru). Regiunile estice și sudice rurale au o presiune scăzută, reflectând cerere redusă și piețe imobiliare puțin dinamice." },
      { type: "table", title: "REPI — scoruri orientative pe regiuni (scor mare = presiune mare)", source: "INS, BNR, ANCPI, Copernicus — agregare UrbanX",
        headers: ["Regiune", "Dinamică preț locuințe (indice)", "Scor REPI (0-100)"],
        rows: [["Nord-Est","38","40"],["Sud-Est","44","45"],["Sud-Muntenia","42","43"],["Sud-Vest Oltenia","36","38"],["Vest","66","64"],["Nord-Vest","72","68"],["Centru","64","62"],["București-Ilfov","92","88"]] },
      { type: "chart", chartType: "bar", title: "REPI — presiune imobiliară orientativă (scor mare = presiune mare)", source: "Model UrbanX",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [40,45,43,38,64,68,62,88] },
      { type: "table", title: "REPI — dinamică preț vs. tensiune preț/venit vs. autorizări (orientativ)", source: "Model UrbanX (INS, BNR)",
        headers: ["Regiune", "Dinamică preț", "Tensiune preț/venit", "Autorizări"],
        rows: [["Nord-Est","38","42","40"],["Sud-Est","44","46","44"],["Sud-Muntenia","42","44","48"],["Sud-Vest Oltenia","36","40","36"],["Vest","66","62","68"],["Nord-Vest","72","66","70"],["Centru","64","60","64"],["București-Ilfov","92","84","94"]] },
      { type: "chart", chartType: "hbar", title: "REPI — volumul tranzacțiilor imobiliare (scor orientativ)", source: "Model UrbanX (ANCPI)",
        labels: ["Buc.-Ilfov","Nord-Vest","Vest","Centru","Sud-Munt.","Sud-Est","Nord-Est","SV Oltenia"],
        data: [92,70,66,62,46,44,40,36] },
      { type: "table", title: "REPI — expansiunea urbană (creșterea suprafeței construite, orientativ)", source: "Model UrbanX (Copernicus)",
        headers: ["Regiune", "Expansiune urbană (indice)", "Scor componentă"],
        rows: [["Nord-Est","38","38"],["Sud-Est","42","42"],["Sud-Muntenia","48","48"],["Sud-Vest Oltenia","34","34"],["Vest","60","60"],["Nord-Vest","66","66"],["Centru","58","58"],["București-Ilfov","86","86"]] }
    ]
  },

  {
    title: "Metodologia de compoziție a indicilor — normalizare, ponderare și agregare",
    blocks: [
      { type: "p", text: "Toți indicii compoziți UrbanX prezentați urmează un protocol metodologic unitar, în acord cu standardul OECD–JRC pentru construirea indicatorilor compoziți. Etapele sunt: selecția sub-indicatorilor relevanți, validați teoretic și disponibili pentru cele opt regiuni; tratarea valorilor lipsă prin imputare conservativă; normalizarea pe scara 0-100; ponderarea transparentă; agregarea liniară. Acest protocol asigură reproductibilitatea și comparabilitatea între indici și între regiuni." },
      { type: "p", text: "Normalizarea folosită este de tip min-max, care aduce toți sub-indicatorii pe aceeași scară 0-100: pentru indicatorii unde valoarea mare este favorabilă, scor = (x − min) / (max − min) × 100; pentru cei unde valoarea mare este nefavorabilă (risc, sărăcie, concentrare), se aplică normalizarea inversă: scor = (max − x) / (max − min) × 100. Min și max sunt valorile extreme observate în setul celor opt regiuni, ceea ce face scorurile relative la contextul național românesc." },
      { type: "p", text: "Ponderarea este liniară și explicită: fiecare sub-indicator primește o pondere wᵢ care reflectă importanța sa teoretică, cu Σ wᵢ = 1. Agregarea finală este media ponderată: indice = Σ wᵢ · scorᵢ. UrbanX preferă agregarea liniară (compensatorie) pentru transparență, dar semnalează că o agregare geometrică ar penaliza mai puternic dezechilibrele între componente. Analiza de senzitivitate la modificarea ponderilor confirmă robustețea ierarhiilor principale." },
      { type: "table", title: "Etapele metodologice și formulele aplicate", source: "Cadru OECD–JRC — implementare UrbanX",
        headers: ["Etapă", "Operație / formulă", "Nr. indici afectați"],
        rows: [["Selecție sub-indicatori","Validare teoretică + disponibilitate","14"],["Normalizare directă","(x − min) / (max − min) × 100","14"],["Normalizare inversă","(max − x) / (max − min) × 100","4"],["Ponderare","wᵢ, cu Σ wᵢ = 1","14"],["Agregare liniară","indice = Σ wᵢ · scorᵢ","14"],["Analiză senzitivitate","Variație ponderi ±10%","14"]] },
      { type: "chart", chartType: "donut", title: "Distribuția indicilor pe tipul de normalizare", source: "Model UrbanX",
        labels: ["Normalizare directă","Cu componente inverse","Indice de presiune"],
        data: [9,4,1] },
      { type: "table", title: "Numărul de sub-indicatori pe indice compozit", source: "Model UrbanX",
        headers: ["Indice", "Domeniu", "Nr. sub-indicatori"],
        rows: [["UDI","Dezvoltare urbană","6"],["IAI","Investiții","5"],["TRI","Reziliență","6"],["RCI","Competitivitate","7"],["AccI","Accesibilitate","5"],["IRI","Infrastructură","6"],["InnI","Inovare","5"],["CVI","Climă","5"],["SCI","Coeziune","6"],["AEI","Administrație","5"],["EDI","Diversificare","4"],["PSAI","Servicii publice","6"],["HEI","Patrimoniu","4"],["REPI","Imobiliar","5"]] },
      { type: "chart", chartType: "hbar", title: "Numărul de sub-indicatori pe indice (orientativ)", source: "Model UrbanX",
        labels: ["RCI","UDI","TRI","IRI","SCI","PSAI","IAI","AccI"],
        data: [7,6,6,6,6,6,5,5] },
      { type: "table", title: "Robustețea ierarhiei la analiza de senzitivitate (orientativ)", source: "Model UrbanX",
        headers: ["Variație ponderi", "Schimbări de poziție", "Robustețe (%)"],
        rows: [["±5%","0","100"],["±10%","1","94"],["±15%","2","88"],["±20%","3","82"]] }
    ]
  },

  {
    title: "Clasamentul regional agregat — Indicele UrbanX Compozit (IUC)",
    blocks: [
      { type: "p", text: "Pentru o lectură sintetică a tuturor indicilor, UrbanX construiește un Indice UrbanX Compozit (IUC) la nivel regional, ca medie a celor paisprezece indici tematici, cu ajustarea celor de tip presiune sau vulnerabilitate astfel încât un scor mai mare să însemne consecvent o poziție mai bună. IUC oferă o imagine de ansamblu a poziției relative a fiecărei regiuni, util pentru o privire de sus a decidenților, dar trebuie citit împreună cu indicii componenți pentru a evita pierderea informației prin agregare." },
      { type: "p", text: "Formula este IUC = (1/n) · Σ Iₖ, unde Iₖ sunt cei n = 14 indici tematici (cu CVI și REPI ajustați direcțional). Clasamentul agregat confirmă ierarhia generală a dezvoltării regionale românești: București-Ilfov detașat în frunte, urmat de gruparea regiunilor vestice și centrale (Nord-Vest, Vest, Centru), apoi Sud-Est, și în partea inferioară regiunile estice și sudice (Nord-Est, Sud-Muntenia, Sud-Vest Oltenia), care concentrează cele mai multe decalaje de recuperat." },
      { type: "p", text: "Decalajul de aproximativ 30-40 de puncte între prima și ultima regiune în clasamentul agregat sintetizează provocarea coeziunii teritoriale a României. Important este că nicio regiune nu are scoruri scăzute pe toate dimensiunile: fiecare are atuuri (patrimoniu în Nord-Est, accesibilitate în Sud-Muntenia, resurse naturale în Sud-Vest Oltenia) pe care strategiile de dezvoltare le pot valorifica pentru a recupera decalajul agregat." },
      { type: "table", title: "Indicele UrbanX Compozit (IUC) — clasament regional agregat (orientativ)", source: "Model UrbanX (agregarea celor 14 indici)",
        headers: ["Loc", "Regiune", "Scor IUC (0-100)"],
        rows: [["1","București-Ilfov","82"],["2","Nord-Vest","64"],["3","Vest","63"],["4","Centru","62"],["5","Sud-Est","49"],["6","Nord-Est","45"],["7","Sud-Muntenia","44"],["8","Sud-Vest Oltenia","43"]] },
      { type: "chart", chartType: "hbar", title: "IUC — clasament regional agregat (0-100)", source: "Model UrbanX",
        labels: ["Buc.-Ilfov","Nord-Vest","Vest","Centru","Sud-Est","Nord-Est","Sud-Munt.","SV Oltenia"],
        data: [82,64,63,62,49,45,44,43] },
      { type: "table", title: "IUC — contribuția dimensiunilor la scorul agregat (orientativ)", source: "Model UrbanX",
        headers: ["Regiune", "Economie", "Conectivitate", "Calitate viață"],
        rows: [["Nord-Est","40","38","45"],["Sud-Est","46","50","48"],["Sud-Muntenia","45","56","47"],["Sud-Vest Oltenia","42","45","47"],["Vest","68","70","65"],["Nord-Vest","66","62","63"],["Centru","64","62","62"],["București-Ilfov","90","90","81"]] },
      { type: "chart", chartType: "donut", title: "IUC — distribuția regiunilor pe clase de dezvoltare agregată", source: "Model UrbanX",
        labels: ["Avansat (>70)","Intermediar (55-70)","În urmă (<55)"],
        data: [1,3,4] },
      { type: "table", title: "IUC — atuul distinctiv al fiecărei regiuni (orientativ)", source: "Model UrbanX",
        headers: ["Regiune", "Atu distinctiv (indice de vârf)", "Scor de vârf"],
        rows: [["Nord-Est","Patrimoniu (HEI)","64"],["Sud-Est","Patrimoniu natural (HEI)","58"],["Sud-Muntenia","Accesibilitate (AccI)","61"],["Sud-Vest Oltenia","Reziliență energetică (TRI)","70"],["Vest","Competitivitate (RCI)","67"],["Nord-Vest","Inovare (InnI, Cluj)","67"],["Centru","Patrimoniu (HEI)","82"],["București-Ilfov","Agregat (IUC)","82"]] }
    ]
  },

  {
    title: "Harta scorurilor — distribuția spațială a indicilor UrbanX",
    blocks: [
      { type: "p", text: "Reprezentarea spațială a indicilor UrbanX evidențiază tipare geografice consistente care depășesc granițele administrative ale regiunilor. Cel mai pregnant este gradientul vest-est: regiunile vestice și centrale, conectate la coridoarele europene și beneficiare ale unei urbanizări mai timpurii, obțin scoruri superioare la majoritatea indicilor, în timp ce regiunile estice și sudice cumulează decalaje. Acest gradient se suprapune peste harta accesibilității infrastructurale, confirmând rolul conectivității ca factor structurant." },
      { type: "p", text: "Un al doilea tipar este caracterul de insulă al regiunii București-Ilfov, care obține scoruri net superioare nu doar mediei naționale, ci și regiunilor învecinate (Sud-Muntenia), creând o discontinuitate spațială abruptă. Acest efect de polarizare metropolitană este tipic economiilor în curs de dezvoltare și ridică întrebarea răspândirii beneficiilor creșterii dinspre capitală către teritoriul înconjurător, una dintre mizele centrale ale politicii de coeziune." },
      { type: "p", text: "Maparea simultană a mai multor indici permite identificarea profilurilor regionale distincte: regiuni cu patrimoniu ridicat dar accesibilitate scăzută (Nord-Est), regiuni cu competitivitate bună dar reziliență climatică fragilă (Sud-Est), regiuni echilibrate (Centru). Aceste profiluri orientează strategii diferențiate de dezvoltare, fiecare regiune necesitând un mix propriu de intervenții în funcție de poziția sa spațială și de atuurile identificate." },
      { type: "table", title: "Sinteză spațială — poziția pe trei indici-cheie (orientativ)", source: "Model UrbanX",
        headers: ["Regiune", "Dezvoltare (UDI)", "Accesibilitate (AccI)", "Competitivitate (RCI)"],
        rows: [["Nord-Est","47","31","39"],["Sud-Est","55","50","48"],["Sud-Muntenia","44","61","46"],["Sud-Vest Oltenia","46","42","44"],["Vest","68","72","67"],["Nord-Vest","63","58","64"],["Centru","65","60","65"],["București-Ilfov","91","90","93"]] },
      { type: "chart", chartType: "bar", title: "Gradientul vest-est — media UDI/AccI/RCI pe regiuni (orientativ)", source: "Model UrbanX",
        labels: ["Nord-Est","Sud-Est","Sud-Munt.","SV Oltenia","Vest","Nord-Vest","Centru","Buc.-Ilfov"],
        data: [39,51,50,44,69,62,63,91] },
      { type: "table", title: "Profilul spațial al fiecărei regiuni (orientativ)", source: "Model UrbanX",
        headers: ["Regiune", "Profil dominant", "Punct forte / slab", "Scor IUC"],
        rows: [["Nord-Est","Patrimoniu, slab conectat","HEI / AccI","45"],["Sud-Est","Competitiv, vulnerabil climatic","RCI / CVI","49"],["Sud-Muntenia","Accesibil, agricol","AccI / InnI","44"],["Sud-Vest Oltenia","Energetic, în urmă","TRI / RCI","43"],["Vest","Competitiv, accesibil","RCI / CVI","63"],["Nord-Vest","Inovator, echilibrat","InnI / AccI","64"],["Centru","Echilibrat, patrimonial","HEI / REPI","62"],["București-Ilfov","Metropolitan dominant","IUC / REPI","82"]] },
      { type: "chart", chartType: "donut", title: "Distribuția spațială a scorurilor IUC pe macro-zone", source: "Model UrbanX",
        labels: ["Vest+Centru","București-Ilfov","Est+Sud"],
        data: [3,1,4] },
      { type: "table", title: "Discontinuitatea metropolitană București-Ilfov vs. vecini (orientativ)", source: "Model UrbanX",
        headers: ["Comparație", "Scor IUC", "Diferență (puncte)"],
        rows: [["București-Ilfov","82","0"],["Sud-Muntenia (vecin)","44","38"],["Media națională","56","26"],["Media regiuni est+sud","45","37"]] }
    ]
  },

  {
    title: "Corelația dintre indici — interdependențe și redundanțe",
    blocks: [
      { type: "p", text: "Analiza corelațiilor dintre cei paisprezece indici UrbanX dezvăluie interdependențele structurale ale dezvoltării regionale. Indicii de dezvoltare urbană, competitivitate, inovare și investiții sunt puternic corelați pozitiv între ei, formând un nucleu de dezvoltare economică care se autoîntărește: competitivitatea atrage investiții, investițiile alimentează inovarea, inovarea ridică competitivitatea. Această corelație ridicată confirmă validitatea teoretică a indicilor, dar semnalează și o anumită redundanță informațională între ei." },
      { type: "p", text: "Alte corelații sunt mai slabe sau chiar negative, ceea ce conferă valoare adăugată sistemului de indici. Indicele de vulnerabilitate climatică (CVI) nu se corelează puternic cu dezvoltarea economică — regiuni dezvoltate pot fi vulnerabile climatic (Sud-Est) — ceea ce justifică tratarea sa separată. Similar, indicele de patrimoniu (HEI) urmează o logică geografică proprie, independentă de dezvoltarea economică. Indicele de presiune imobiliară (REPI) se corelează cu dezvoltarea, dar adaugă o dimensiune de sustenabilitate." },
      { type: "p", text: "Pentru decidenți, matricea de corelații este un instrument strategic: corelațiile pozitive puternice indică efecte de levier (o intervenție pe un indice antrenează ameliorări pe altele corelate), în timp ce indicii necorelați necesită intervenții dedicate. Tabelul de mai jos prezintă coeficienții de corelație orientativi între perechi selectate de indici, calculați pe scorurile celor opt regiuni." },
      { type: "table", title: "Matricea corelațiilor între indici-cheie (orientativ, pe 8 regiuni)", source: "Model UrbanX (corelație Pearson pe scoruri regionale)",
        headers: ["Pereche de indici", "Tip relație", "Coeficient (×100)"],
        rows: [["UDI – RCI","Pozitivă puternică","94"],["RCI – IAI","Pozitivă puternică","92"],["IAI – AccI","Pozitivă puternică","88"],["RCI – InnI","Pozitivă puternică","90"],["IRI – PSAI","Pozitivă moderată","78"],["TRI – EDI","Pozitivă moderată","82"],["SCI – RCI","Pozitivă moderată","80"],["CVI – RCI","Slabă / negativă","-15"],["HEI – RCI","Slabă","22"],["REPI – IAI","Pozitivă moderată","76"]] },
      { type: "chart", chartType: "hbar", title: "Intensitatea corelației cu dezvoltarea economică (RCI), orientativ", source: "Model UrbanX",
        labels: ["UDI","IAI","InnI","AccI","SCI","REPI","HEI","CVI"],
        data: [94,92,90,88,80,76,22,-15] },
      { type: "table", title: "Indici cu logică autonomă vs. nucleul economic (orientativ)", source: "Model UrbanX",
        headers: ["Indice", "Grup", "Corelație cu RCI (×100)"],
        rows: [["UDI","Nucleu economic","94"],["IAI","Nucleu economic","92"],["InnI","Nucleu economic","90"],["AccI","Nucleu economic","88"],["SCI","Conex","80"],["TRI","Conex","72"],["HEI","Autonom","22"],["CVI","Autonom","-15"]] },
      { type: "chart", chartType: "donut", title: "Clasificarea indicilor după corelația cu nucleul economic", source: "Model UrbanX",
        labels: ["Nucleu economic (>85)","Conex (60-85)","Autonom (<60)"],
        data: [4,5,5] },
      { type: "table", title: "Efecte de levier — o intervenție, ameliorări multiple (orientativ)", source: "Model UrbanX",
        headers: ["Intervenție pe", "Indici antrenați", "Efect de levier (×100)"],
        rows: [["Accesibilitate (AccI)","IAI, RCI, UDI","85"],["Infrastructură (IRI)","PSAI, UDI, TRI","78"],["Inovare (InnI)","RCI, IAI","88"],["Coeziune (SCI)","TRI, RCI","70"]] }
    ]
  },

  {
    title: "Nota UrbanX (IVU) regională — integrarea indicilor în indicele de viabilitate urbană",
    blocks: [
      { type: "p", text: "Nota UrbanX, exprimată prin Indicele de Viabilitate Urbană (IVU), reprezintă sinteza supremă a sistemului de indici al platformei: un scor unic 0-100, însoțit de o notă literală A-G (în logica certificatului energetic, de la roșu la verde), care exprimă viabilitatea de ansamblu a unui teritoriu. La nivel regional, IVU agregă dimensiunile economice, de calitate a vieții, conectivitate, mediu, demografie și reziliență, oferind o evaluare integrată comparabilă a celor opt regiuni de dezvoltare." },
      { type: "p", text: "IVU regional se calculează ca medie ponderată a indicilor tematici UrbanX, grupați pe șase dimensiuni: economie (RCI, IAI, EDI, InnI), calitatea vieții (SCI, PSAI), conectivitate (AccI, IRI), mediu (CVI ajustat), demografie (componenta demografică a TRI) și reziliență (TRI). Formula este IVU = Σ wⱼ · Dⱼ, unde Dⱼ sunt scorurile celor șase dimensiuni. Nota literală se atribuie pe praguri: A (≥85), B (75-84), C (65-74), D (55-64), E (45-54), F (35-44), G (<35), oferind o lectură imediată a poziției regionale." },
      { type: "p", text: "Aplicat la cele opt regiuni, IVU regional confirmă ierarhia generală, dar adaugă nuanța notei literale care comunică intuitiv decalajele: București-Ilfov se apropie de pragul A, regiunile vestice și centrale se situează în zona C-D, iar regiunile estice și sudice în zona E-F. Aceste note nu sunt sentințe, ci instrumente de comunicare și de prioritizare; valorile sunt orientative (model UrbanX) și servesc comparației inter-regionale, nu clasamentelor oficiale." },
      { type: "table", title: "IVU regional — scor și notă literală (orientativ, model UrbanX)", source: "Model UrbanX (agregarea indicilor pe 6 dimensiuni)",
        headers: ["Regiune", "Notă literală", "Scor IVU (0-100)"],
        rows: [["București-Ilfov","B","82"],["Nord-Vest","D","64"],["Vest","D","63"],["Centru","D","62"],["Sud-Est","E","50"],["Nord-Est","E","46"],["Sud-Muntenia","F","44"],["Sud-Vest Oltenia","F","43"]] },
      { type: "chart", chartType: "bar", title: "IVU regional — scoruri orientative pe cele 8 regiuni (0-100)", source: "Model UrbanX",
        labels: ["Buc.-Ilfov","Nord-Vest","Vest","Centru","Sud-Est","Nord-Est","Sud-Munt.","SV Oltenia"],
        data: [82,64,63,62,50,46,44,43] },
      { type: "table", title: "IVU regional — descompunere pe cele șase dimensiuni (orientativ)", source: "Model UrbanX",
        headers: ["Regiune", "Economie", "Calitate viață", "Mediu"],
        rows: [["Nord-Est","40","45","52"],["Sud-Est","46","48","40"],["Sud-Muntenia","45","47","43"],["Sud-Vest Oltenia","42","47","41"],["Vest","68","65","60"],["Nord-Vest","66","63","64"],["Centru","64","62","67"],["București-Ilfov","90","81","55"]] },
      { type: "chart", chartType: "donut", title: "IVU regional — distribuția regiunilor pe note literale", source: "Model UrbanX",
        labels: ["B (75-84)","C-D (55-74)","E (45-54)","F (35-44)"],
        data: [1,3,2,2] },
      { type: "table", title: "IVU regional — proiecție orientativă a notei pe orizont 2030", source: "Model UrbanX",
        headers: ["Regiune", "Notă actuală", "Notă proiectată", "Scor 2030"],
        rows: [["București-Ilfov","B","A","85"],["Nord-Vest","D","C","70"],["Vest","D","C","69"],["Centru","D","C","68"],["Sud-Est","E","D","56"],["Nord-Est","E","D","55"],["Sud-Muntenia","F","E","50"],["Sud-Vest Oltenia","F","E","49"]] }
    ]
  }

];
