#!/usr/bin/env python3
# Genereaza un studiu PROIECTANT (text/tabel) headless cu o parcela injectata, ca sa verific miniChart.
import json, subprocess, time, urllib.request, websocket, os, glob, shutil, sys
URL="http://localhost:8765/"; CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=9343; prof="/tmp/urbanx-proi-prof"; DL="/tmp/proidl"
FN = sys.argv[1] if len(sys.argv)>1 else "generateNoiseStudy"
LAT, LON = 47.1585, 27.5902
shutil.rmtree(DL, ignore_errors=True); os.makedirs(DL, exist_ok=True)
shutil.rmtree(prof, ignore_errors=True)
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
    if "exceptionDetails" in r: return {"__err":str(r["exceptionDetails"].get("exception",{}).get("description",""))[:300]}
    return r.get("result",{}).get("value")
print(f"astept {FN} + _initStudyPdf..."); ok=False
for _ in range(60):
    ok=ev(f"!!(window.{FN}&&window._initStudyPdf&&(window.jspdf||window.jsPDF))")
    if ok is True: break
    time.sleep(1)
print("  ready:",ok)
# injecteaza o parcela cu geometrie (patrat ~40m la Iasi)
ev(f"""(function(){{
  var d=0.0003, lat={LAT}, lon={LON};
  var poly={{type:'Feature',properties:{{}},geometry:{{type:'Polygon',coordinates:[[[lon-d,lat-d],[lon+d,lat-d],[lon+d,lat+d],[lon-d,lat+d],[lon-d,lat-d]]]}}}};
  window.S=window.S||{{}}; S.parcels=[{{geo:poly,nrcad:'149112',utr:'CC',area:1450,uat:'Municipiul Iasi',
    params:{{pot:40,cut:1.2,h:10,niv:4}}}}]; S.activeParcel=0;
  return 'parcela set';
}})()""", wait=False)
print("  parcela injectata")
res=ev(f"(async()=>{{ try{{ await window.{FN}(); return 'done'; }}catch(e){{ return 'ERR '+(e&&e.message)+' | '+(e&&e.stack||'').slice(0,200); }} }})()")
print("  gen:",res)
pdf=None
for _ in range(40):
    f=glob.glob(DL+"/*.pdf")
    done=[x for x in f if os.path.getsize(x)>1000]
    if done: pdf=done[0]; break
    time.sleep(1)
print("  PDF:",pdf, os.path.getsize(pdf) if pdf else "-","b")
if pdf:
    dest=os.path.expanduser("~/Downloads/")+os.path.basename(pdf)
    shutil.copy(pdf,dest); print("  >>>PDFPATH:"+dest)
try: proc.terminate()
except Exception: pass
