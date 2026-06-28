#!/usr/bin/env python3
# Generează RCAI pe parcelă (Lăpușneanu, Iași) headless, salvează PDF + inspectează datele reale.
import json, subprocess, time, urllib.request, websocket, os, glob, shutil
URL="http://localhost:8765/"; CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=9342; prof="/tmp/urbanx-rcai-prof"; DL="/tmp/rcaidl"
LAT, LON = 47.1585, 27.5902
shutil.rmtree(DL, ignore_errors=True); os.makedirs(DL, exist_ok=True)
proc=subprocess.Popen([CHROME,"--headless=new",f"--remote-debugging-port={PORT}","--remote-allow-origins=*",
  f"--user-data-dir={prof}","--window-size=1400,900","--no-first-run","--use-gl=angle","--use-angle=swiftshader",
  "--enable-webgl","--ignore-gpu-blocklist","--disable-background-timer-throttling",URL],
  stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
def cdp():
    for _ in range(40):
        try:
            d=json.load(urllib.request.urlopen(f"http://localhost:{PORT}/json"))
            pg=[t for t in d if t.get("type")=="page" and t.get("webSocketDebuggerUrl")]
            if pg: return pg[0]["webSocketDebuggerUrl"]
        except Exception: pass
        time.sleep(0.5)
    raise RuntimeError("no CDP")
ws=websocket.create_connection(cdp(),max_size=None); _id=[0]
def send(m,p=None):
    _id[0]+=1; mid=_id[0]; ws.send(json.dumps({"id":mid,"method":m,"params":p or {}}))
    while True:
        x=json.loads(ws.recv())
        if x.get("id")==mid: return x.get("result",{})
send("Runtime.enable"); send("Page.enable")
send("Browser.setDownloadBehavior",{"behavior":"allow","downloadPath":DL})
def ev(e,wait=True):
    r=send("Runtime.evaluate",{"expression":e,"returnByValue":True,"awaitPromise":wait})
    if "exceptionDetails" in r: return {"__err":str(r["exceptionDetails"].get("exception",{}).get("description",""))[:200]}
    return r.get("result",{}).get("value")
print("astept _RCAI + map..."); ok=False
for _ in range(60):
    ok=ev("!!(window._RCAI&&window._RCAI.generatePDF&&(window.jspdf||window.jsPDF))")
    if ok is True: break
    time.sleep(1)
print("  ready:",ok)
# set parcela de test (Lapusneanu) + ParcelCtx minimal
ev(f"""(function(){{
  window._activeParcel={{lat:{LAT},lon:{LON},area:1450,nrcad:'TEST-Lapuseanu',utr:'CC'}};
  window._selectedParcel=window._activeParcel;
  return 'set';
}})()""", wait=False)
print("  parcela setata @",LAT,LON)
print("  generez RCAI (asteapta fetch RAN/OSM/DEM)...")
res=ev("(async()=>{ try{ await window._RCAI.generatePDF('RO-IS-01'); return 'done'; }catch(e){ return 'ERR '+e.message; } })()")
print("  generatePDF:",res)
# asteapta fisierul PDF
pdf=None
for _ in range(40):
    f=glob.glob(DL+"/*.pdf")+glob.glob(DL+"/*.crdownload")
    done=[x for x in f if x.endswith('.pdf') and os.path.getsize(x)>1000]
    if done: pdf=done[0]; break
    time.sleep(1)
print("  PDF:",pdf, os.path.getsize(pdf) if pdf else "-","b")
if pdf:
    dest=os.path.expanduser("~/Downloads/")+os.path.basename(pdf)
    shutil.copy(pdf,dest); print("  salvat in:",dest)
    print("  >>>PDFPATH:"+dest)
try: proc.terminate()
except Exception: pass
