#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
refresh_inse.py — Actualizare automată date INS TEMPO (rulat de GitHub Actions sau manual).
Extrage:
  • POP107D — populația după domiciliu, pe localitate (cel mai recent an) -> data/ins-populatie-domiciliu.json
  • POP105A — populația rezidentă, pe județ (cel mai recent an)          -> data/ins-rezidenta-judet.json
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
    # exit 0 mereu — workflow-ul comită doar dacă fișierele s-au schimbat
    if not ok:
        print("INS parțial/inaccesibil — fișierele existente rămân neschimbate.")
    sys.exit(0)

if __name__ == "__main__":
    main()
