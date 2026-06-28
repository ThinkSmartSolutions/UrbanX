#!/usr/bin/env python3
# Verifica scenele NOI imersive b30s1 (dotari OSM) + b31s1 (valoare €/mp) + b18s1 (fauna multi-specie):
# layere pe harta (v8-amenity / v8-val / v8-fauna) + datele in SE (_amenityCounts/_valStats/wildlife) + 0 erori JS.
import json, subprocess, time, urllib.request, websocket, signal
URL="http://localhost:8765/"; CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=9337; prof="/tmp/urbanx-scene-new-prof"
TARGETS={'b18s1':9000,'b30s1':20000,'b31s1':13000}
proc=subprocess.Popen([CHROME,"--headless=new",f"--remote-debugging-port={PORT}","--remote-allow-origins=*",
  f"--user-data-dir={prof}","--window-size=1400,900","--no-first-run","--use-gl=angle","--use-angle=swiftshader",
  "--enable-webgl","--ignore-gpu-blocklist","--disable-background-timer-throttling","--disable-renderer-backgrounding",
  "--disable-backgrounding-occluded-windows",URL],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
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
def ev(e):
    r=send("Runtime.evaluate",{"expression":e,"returnByValue":True,"awaitPromise":True})
    if "exceptionDetails" in r: return {"__err":r["exceptionDetails"].get("exception",{}).get("description","err")}
    return r.get("result",{}).get("value")
ev("window.__e=[];addEventListener('error',function(e){window.__e.push(String(e.message))});true")
print("astept _startCinema + map..."); ok=False
for _ in range(60):
    ok=ev("!!(window._startCinema&&window.map)")
    if ok is True: break
    time.sleep(1)
print("  ready:",ok)
ev("window._startCinema('RO-IS-01');true")
# asteapta array-ul INCARCAT (linia 553 ruleaza dupa load async) — default e 12, incarcat 30+
n=0
for _ in range(120):
    n=ev("(function(){var SE=window._CinemaEngine;return SE&&SE.SCENES?SE.SCENES.length:0;})()")
    if isinstance(n,int) and n>=30: break
    time.sleep(1)
print("  SCENES.length dupa load:",n)
ev("window.__M=window._CinemaEngine&&window._CinemaEngine._map; true")
present=ev("(function(){var SE=window._CinemaEngine;return (SE.SCENES||[]).map(function(s){return s.id}).filter(function(id){return id==='b30s1'||id==='b31s1';});})()")
print("  scene noi in SCENES:",present, " total:",ev("(function(){var SE=window._CinemaEngine;return SE.SCENES?SE.SCENES.length:0;})()"))
errs=set(); samp={}
print("\n=== sar DIRECT la fiecare scena noua si verific ===")
for sid,wait_s in [('b18s1',6),('b30s1',14),('b31s1',8)]:
    idx=ev(f"(function(){{var SE=window._CinemaEngine;for(var i=0;i<SE.SCENES.length;i++)if(SE.SCENES[i].id==='{sid}')return i;return -1;}})()")
    if idx is None or idx<0: print(f"  {sid}: NU e in SCENES (idx {idx})"); continue
    ev(f"(function(){{var SE=window._CinemaEngine;try{{SE._cleanLayers&&SE._cleanLayers();}}catch(e){{}};if(SE._raf)cancelAnimationFrame(SE._raf);SE._si={idx};SE._runScene&&SE._runScene({idx});return 'go';}})()")
    t0=time.time()
    while time.time()-t0<wait_s:
        e=ev("window.__e||[]")
        if isinstance(e,list):
            for m in e:
                if m not in errs: errs.add(m); print("   !!! EROARE:",m)
        time.sleep(0.6)
    lays=ev("(function(){var s=window.__M.getStyle();return (s&&s.layers||[]).map(function(L){return L.id}).filter(function(id){return /^v8-(amenity|val|fauna)/.test(id)});})()")
    data=ev("(function(){var SE=window._CinemaEngine;return {am:SE._amenityCounts,val:SE._valStats,wl:(SE._city?(window._UrbanFauna&&window._UrbanFauna.wildlife(SE._city.judet)||[]).length:0)};})()")
    samp[sid]={'lays':lays,'data':data}
    print(f"  [{sid}] layere={lays}  date={data}")
print("\n=== REZUMAT ===")
for s in TARGETS:
    r=samp.get(s)
    if r: print(f"  {s}: layere={sorted(r['lays'])}  date={r['data']}")
    else: print(f"  {s}: (neatins in fereastra)")
print("  erori JS:", list(errs) if errs else "NICIUNA")
try: proc.send_signal(signal.SIGTERM)
except Exception: pass
