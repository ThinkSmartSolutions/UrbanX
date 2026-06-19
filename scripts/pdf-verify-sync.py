#!/usr/bin/env python3
# Verifica REAL ca sincronizarea #2 e in PDF-urile generate: ruleaza generatePMUD/generateMasterplan
# in aplicatia reala (localhost:8765), captureaza PDF-ul descarcat, extrage textul cu fitz (PyMuPDF)
# si confirma ca apar capitolele noi (viata pierduta in trafic, naveta metropolitana, expunere seismica).
import json, subprocess, time, urllib.request, websocket, signal, os, glob, sys, fitz

URL="http://localhost:8765/"; CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=9348; prof="/tmp/urbanx-pdfverify"; DL="/tmp/urbanx-dl"
os.makedirs(DL, exist_ok=True)
for f in glob.glob(DL+"/*"):
    try: os.remove(f)
    except Exception: pass

proc=subprocess.Popen([CHROME,"--headless=new",f"--remote-debugging-port={PORT}","--remote-allow-origins=*",
  f"--user-data-dir={prof}","--no-first-run","--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader",
  URL],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
def cdp():
    for _ in range(40):
        try:
            d=json.load(urllib.request.urlopen(f"http://localhost:{PORT}/json"));pg=[t for t in d if t.get("type")=="page" and t.get("webSocketDebuggerUrl")]
            if pg:return pg[0]["webSocketDebuggerUrl"]
        except Exception: pass
        time.sleep(0.5)
    raise RuntimeError("no cdp")
ws=websocket.create_connection(cdp(),max_size=None); _id=[0]
def send(m,p=None):
    _id[0]+=1; mid=_id[0]; ws.send(json.dumps({"id":mid,"method":m,"params":p or {}}))
    while True:
        x=json.loads(ws.recv())
        if x.get("id")==mid: return x.get("result",{})
send("Runtime.enable")
send("Browser.setDownloadBehavior",{"behavior":"allow","downloadPath":DL})
def ev(e):
    r=send("Runtime.evaluate",{"expression":e,"returnByValue":True,"awaitPromise":True})
    if "exceptionDetails" in r: return {"__err":r["exceptionDetails"].get("exception",{}).get("description","err")}
    return r.get("result",{}).get("value")
for _ in range(45):
    if ev("!!(window.generatePMUD&&window.generateMasterplan)") is True: break
    time.sleep(1)

def gen_and_extract(fn_call, tag, wait=70):
    for f in glob.glob(DL+"/*.pdf")+glob.glob(DL+"/*.crdownload"):
        try: os.remove(f)
        except Exception: pass
    ev(f"try{{{fn_call};}}catch(e){{window.__ge=String(e);}}true")
    t0=time.time(); path=None
    while time.time()-t0<wait:
        pdfs=[f for f in glob.glob(DL+"/*.pdf") if not os.path.exists(f+".crdownload")]
        cr=glob.glob(DL+"/*.crdownload")
        if pdfs and not cr:
            # asteapta 2s sa fie complet scris
            time.sleep(2); path=max(pdfs,key=os.path.getmtime); break
        time.sleep(2)
    if not path:
        print(f"  [{tag}] PDF NEDESCARCAT in {wait}s (throw={ev('window.__ge||null')})"); return None
    sz=os.path.getsize(path)
    doc=fitz.open(path); txt=""
    for pg in doc: txt+=pg.get_text()
    print(f"  [{tag}] {os.path.basename(path)} · {doc.page_count} pagini · {sz//1024} KB")
    return txt

print("\n=== PMUD ===")
pmud=gen_and_extract("window.generatePMUD('RO-IS-01')","PMUD")
if pmud:
    checks={
      "Capitol viata pierduta":"viață pierdută" in pmud or "viata pierduta" in pmud.lower(),
      "Formula ani viata (AV=)":"AV =" in pmud or "AV=" in pmud,
      "Naveta metropolitana detaliu":"navetiști" in pmud or "navetisti" in pmud.lower(),
      "Harta naveta (titlu)":"naveta" in pmud.lower() and ("flux" in pmud.lower()),
      "Sursa VOT":"value of time" in pmud.lower() or "VOT" in pmud or "Eurostat" in pmud,
    }
    for k,v in checks.items(): print(f"    {'✅' if v else '❌'} {k}")

print("\n=== MASTERPLAN ===")
mp=gen_and_extract("window.generateMasterplan('RO-IS-01')","MP")
if mp:
    checks={
      "Harta expunere seismica":"expunere seismic" in mp.lower(),
      "Zona seismica P100":"zona seismic" in mp.lower() or "P100" in mp,
      "Cap. economie circulara":"economia circular" in mp.lower() or "economie circular" in mp.lower(),
      "Cap. metabolism urban":"metabolism" in mp.lower(),
      "Cap. dezvoltare metropolitana":"metropolitan" in mp.lower(),
    }
    for k,v in checks.items(): print(f"    {'✅' if v else '❌'} {k}")

try: proc.send_signal(signal.SIGTERM)
except Exception: pass
