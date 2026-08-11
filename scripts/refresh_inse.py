#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
refresh_inse.py — Actualizare automată date INS TEMPO (rulat de GitHub Actions sau manual).
Extrage:
  • POP107D — populația după domiciliu, pe localitate (cel mai recent an) -> data/ins-populatie-domiciliu.json
  • POP105A — populația rezidentă, pe județ (cel mai recent an)          -> data/ins-rezidenta-judet.json
  • CNS107D — Indici de cost în construcții, bază 2021 (ultimele 36 luni,
    pe toate tipurile de lucrări/construcții)                            -> data/ins-cns107d.json
    Modul Devize & Cost Management (js/urbanx-devize-pro.js) citește acest
    fișier pt actualizarea prețurilor (nivel 2 din modelul pe 4 niveluri).
    VERIFICAT MANUAL 11 aug 2026: seria e complet publică, FĂRĂ autentificare
    (contul INSSE shop testat separat nu are nicio legătură cu acest API).
Doar stdlib. Eșuează "soft": dacă INS e inaccesibil, NU rescrie fișierele (exit 0), ca să nu comită date goale.
Sursă: http://statistici.insse.ro:8077/tempo-ins  (DOAR HTTP, port 8077)
"""
import json, re, sys, os, time, urllib.request

BASE = "http://statistici.insse.ro:8077/tempo-ins/"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TIMEOUT = 90

def _get(path):
    return json.loads(urllib.request.urlopen(BASE + path, timeout=TIMEOUT).read().decode())

def _post(code, body):
    req = urllib.request.Request(BASE + "matrix/" + code,
        data=json.dumps(body).encode(), headers={"Content-Type": "application/json"}, method="POST")
    return urllib.request.urlopen(req, timeout=TIMEOUT).read().decode()

def _opt(o):
    o = dict(o); o.pop("dimCode", None); return o

def _years_desc(year_opts):
    ys = []
    for o in year_opts:
        m = re.search(r"(\d{4})", o["label"])
        if m: ys.append((int(m.group(1)), o))
    return [o for _, o in sorted(ys, key=lambda t: -t[0])]

def _has_value(html):
    m = re.search(r"<strong>([\d.]+)</strong>", html)
    return bool(m and re.sub(r"[.]", "", m.group(1)).isdigit())

def _find_year_with_data(code, d, build_sels):
    """Probează anii descrescător; întoarce (year_opt, an_int) pentru cel mai recent an cu date."""
    for yo in _years_desc(d["dimensionsMap"][4]["options"]):
        html = json.loads(_post(code, {"language": "ro", "arr": build_sels(yo),
               "matrixName": d["matrixName"], "matrixDetails": d["details"]}))["resultTable"]
        if _has_value(html):
            return yo, int(re.search(r"(\d{4})", yo["label"]).group(1))
        time.sleep(0.2)
    raise RuntimeError("niciun an cu date pentru " + code)

ROW_LOC = re.compile(r"<th>(\d{2,6})\s+([^<]+?)</th><td align='right'><strong>([\d.]+)</strong>")
ROW_JUD = re.compile(r"<th>([^<]+?)</th><td align='right'><strong>([\d.]+)</strong>")

def refresh_domiciliu():
    d = _get("matrix/POP107D"); dims = d["dimensionsMap"]
    def pick(i, pred): return next(o for o in dims[i]["options"] if pred(o))
    # cel mai recent an cu date — probă pe o singură localitate (prima localitate reală)
    probe_loc = next(o for o in dims[3]["options"] if o.get("parentId") is not None)
    probe_jud = next(o for o in dims[2]["options"] if o["nomItemId"] == probe_loc["parentId"])
    def probe(yo):
        return [[_opt(pick(0, lambda o: o["label"].strip() == "Total"))],
                [_opt(pick(1, lambda o: o["label"].strip().startswith("Total")))],
                [_opt(probe_jud)], [_opt(probe_loc)], [_opt(yo)], [_opt(dims[5]["options"][0])]]
    year, yr = _find_year_with_data("POP107D", d, probe)
    from collections import defaultdict
    by_jud = defaultdict(list)
    for o in dims[3]["options"]:
        if o.get("parentId") is not None: by_jud[o["parentId"]].append(o)
    judete = [o for o in dims[2]["options"] if o["label"].strip().upper() != "TOTAL"]
    pop, nume = {}, {}
    for jud in judete:
        locs = by_jud.get(jud["nomItemId"], [])
        if not locs: continue
        sels = [[_opt(pick(0, lambda o: o["label"].strip() == "Total"))],
                [_opt(pick(1, lambda o: o["label"].strip().startswith("Total")))],
                [_opt(jud)], [_opt(o) for o in locs], [_opt(year)],
                [_opt(dims[5]["options"][0])]]
        html = json.loads(_post("POP107D", {"language": "ro", "arr": sels,
               "matrixName": d["matrixName"], "matrixDetails": d["details"]}))["resultTable"]
        for siruta, name, val in ROW_LOC.findall(html):
            pop[siruta] = int(val.replace(".", "")); nume[siruta] = name.strip()
        time.sleep(0.3)
    if len(pop) < 2000:
        raise RuntimeError("prea puține localități (%d) — răspuns suspect" % len(pop))
    return {"_meta": {"sursa": "INS TEMPO POP107D — populația după domiciliu la 1 ianuarie",
                      "indicator": "POP107D", "an": yr, "nivel": "localitate (SIRUTA)",
                      "nota": "Populația după domiciliu (administrativă), diferită de rezidentă (recensământ)."},
            "populatie": pop, "nume": nume}

def refresh_rezidenta_judet():
    d = _get("matrix/POP105A"); dims = d["dimensionsMap"]
    def pick(i, pred): return next(o for o in dims[i]["options"] if pred(o))
    judete = [o for o in dims[3]["options"]
              if o["label"].strip().upper() != "TOTAL" and "MACRO" not in o["label"].upper()
              and "Regiunea" not in o["label"]]
    # cel mai recent an cu date — probă pe primul județ
    def probe(yo):
        return [[_opt(pick(0, lambda o: o["label"].strip() == "Total"))],
                [_opt(pick(1, lambda o: o["label"].strip().startswith("Total")))],
                [_opt(pick(2, lambda o: o["label"].strip().upper().startswith("TOTAL")))],
                [_opt(judete[0])], [_opt(yo)], [_opt(dims[5]["options"][0])]]
    year, yr = _find_year_with_data("POP105A", d, probe)
    sels = [[_opt(pick(0, lambda o: o["label"].strip() == "Total"))],
            [_opt(pick(1, lambda o: o["label"].strip().startswith("Total")))],
            [_opt(pick(2, lambda o: o["label"].strip().upper().startswith("TOTAL")))],
            [_opt(o) for o in judete], [_opt(year)], [_opt(dims[5]["options"][0])]]
    html = json.loads(_post("POP105A", {"language": "ro", "arr": sels,
           "matrixName": d["matrixName"], "matrixDetails": d["details"]}))["resultTable"]
    jud = {}
    for name, val in ROW_JUD.findall(html):
        nm = name.strip()
        if nm and not nm.replace("-", "").replace(" ", "").isdigit():
            jud[nm] = int(val.replace(".", ""))
    if len(jud) < 30:
        raise RuntimeError("prea puține județe (%d)" % len(jud))
    return {"_meta": {"sursa": "INS TEMPO POP105A — populația rezidentă la 1 ianuarie",
                      "indicator": "POP105A", "an": yr, "nivel": "județ"},
            "rezidenta_judet": jud}

LUNI_RO = {"ianuarie": 1, "februarie": 2, "martie": 3, "aprilie": 4, "mai": 5, "iunie": 6,
           "iulie": 7, "august": 8, "septembrie": 9, "octombrie": 10, "noiembrie": 11, "decembrie": 12}
CNS_MONTH_HEADER = re.compile(r"<th align='center'>(Luna \w+ \d{4})</th>")
CNS_VALUE_CELL = re.compile(r"<td align='right'>(<u>)?(?:<strong>)?([\d,]+)")
# clasificare etichetă -> (tip_lucrari, tip_constructie): "Total" e neutru pe ambele axe.
# "TOTAL COST MATERIALE" e altă axă (componentă de cost, nu tip lucrare/construcție) — exclusă onest, nu clasificată greșit.
CNS_TIP_LUCRARI = {"Total": "Total", "Constructii noi": "Constructii noi",
                   "Reparatii capitale": "Reparatii capitale", "Reparatii curente": "Reparatii curente"}
CNS_TIP_CONSTRUCTIE = {"Cladiri": "Cladiri", "Cladiri rezidentiale": "Cladiri rezidentiale",
                       "Cladiri nerezidentiale": "Cladiri nerezidentiale",
                       "Constructii ingineresti": "Constructii ingineresti"}

def _luna_to_perioada(label):
    m = re.search(r"Luna\s+(\w+)\s+(\d{4})", label, re.IGNORECASE)
    if not m: return None
    luna = LUNI_RO.get(m.group(1).lower())
    if not luna: return None
    return "%s-%02d" % (m.group(2), luna)

def refresh_cns107d(n_luni=36):
    d = _get("matrix/CNS107D"); dims = d["dimensionsMap"]
    tipuri = dims[0]["options"]                       # "Tipuri de lucrari si tipuri de constructii"
    luni_recente = list(reversed(dims[1]["options"]))[:n_luni]   # cele mai recente n_luni (options e crescător)
    um = dims[2]["options"][0]                         # "Procente" — unica opțiune
    serii = []
    for tip in tipuri:
        label = tip["label"].strip()
        tl = CNS_TIP_LUCRARI.get(label)
        tc = CNS_TIP_CONSTRUCTIE.get(label)
        if not tl and not tc:
            continue   # etichetă necunoscută (posibilă extindere viitoare a matricei) — ignorată, nu inventată
        # cu 1 singură "tip" selectată și N luni, TEMPO pune lunile pe COLOANE (un singur rând de date) —
        # nu pe rânduri ca la populație/județe. Extragem antetul de luni + celulele de valori, în ordine,
        # și le asociem pozițional (poziția i din antet = poziția i din rândul de date).
        sels = [[_opt(tip)], [_opt(o) for o in luni_recente], [_opt(um)]]
        html = json.loads(_post("CNS107D", {"language": "ro", "arr": sels,
               "matrixName": d["matrixName"], "matrixDetails": d["details"]}))["resultTable"]
        luni_header = CNS_MONTH_HEADER.findall(html)
        valori = CNS_VALUE_CELL.findall(html)   # [(('<u>' sau ''), 'val'), ...] în ordinea coloanelor
        if len(luni_header) != len(valori):
            time.sleep(0.3); continue   # crosstab neconform (nepotrivire coloane) — nu inventăm alinierea
        for luna_label, (is_prov, val) in zip(luni_header, valori):
            perioada = _luna_to_perioada(luna_label)
            if not perioada: continue
            serii.append({
                "matrix_code": "CNS107D", "tip_lucrari": tl or "Total", "tip_constructie": tc or "Total",
                "perioada": perioada, "valoare": float(val.replace(",", ".")), "unitate": "%",
                "status": "provizoriu" if is_prov else "final"
            })
        time.sleep(0.3)
    if len(serii) < n_luni:
        raise RuntimeError("prea puține valori CNS107D (%d) — răspuns suspect" % len(serii))
    return {"_meta": {"sursa": "INS TEMPO CNS107D — Indici de cost în construcții, an de bază 2021",
                      "indicator": "CNS107D", "nivel": "național",
                      "nota": "Provizoriu = valoare recentă, poate fi revizuită retroactiv de INSSE (nu se suprascrie, se versionează).",
                      "verificat_manual": "11 aug 2026 — acces public, fără autentificare"},
            "serii": serii}

def main():
    ok = True
    try:
        dom = refresh_domiciliu()
        json.dump(dom, open(os.path.join(ROOT, "data", "ins-populatie-domiciliu.json"), "w"), ensure_ascii=False)
        print("OK domiciliu: %d localități, an %s" % (len(dom["populatie"]), dom["_meta"]["an"]))
    except Exception as e:
        ok = False; print("WARN domiciliu eșuat:", e, file=sys.stderr)
    try:
        rez = refresh_rezidenta_judet()
        json.dump(rez, open(os.path.join(ROOT, "data", "ins-rezidenta-judet.json"), "w"), ensure_ascii=False)
        print("OK rezidentă județ: %d județe, an %s" % (len(rez["rezidenta_judet"]), rez["_meta"]["an"]))
    except Exception as e:
        ok = False; print("WARN rezidentă eșuat:", e, file=sys.stderr)
    try:
        cns = refresh_cns107d()
        json.dump(cns, open(os.path.join(ROOT, "data", "ins-cns107d.json"), "w"), ensure_ascii=False)
        print("OK CNS107D: %d valori" % len(cns["serii"]))
    except Exception as e:
        ok = False; print("WARN CNS107D eșuat:", e, file=sys.stderr)
    # exit 0 mereu — workflow-ul comită doar dacă fișierele s-au schimbat
    if not ok:
        print("INS parțial/inaccesibil — fișierele existente rămân neschimbate.")
    sys.exit(0)

if __name__ == "__main__":
    main()
