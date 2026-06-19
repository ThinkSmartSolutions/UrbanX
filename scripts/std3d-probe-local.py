#!/usr/bin/env python3
# Verifica: (1) urbanx-projects.js se incarca fara erori + nr proiecte Iasi, (2) Botosani primeste
# Standard 3D in cinematic (_richBuildings=true + stilul Standard pe b17s1, cu cladiri reale).
import json, subprocess, time, urllib.request, websocket, signal, sys

URL_BASE="http://localhost:8765/"; CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=9336; prof="/tmp/urbanx-std-prof"
CITY=sys.argv[1] if len(sys.argv)>1 else "RO-BT-01"

proc=subprocess.Popen([CHROME,"--headless=new",f"--remote-debugging-port={PORT}","--remote-allow-origins=*",
  f"--user-data-dir={prof}","--window-size=1400,900","--no-first-run","--use-gl=angle","--use-angle=swiftshader",
  "--enable-webgl","--ignore-gpu-blocklist","--disable-background-timer-throttling","--disable-renderer-backgrounding",
  "--disable-backgrounding-occluded-windows",URL_BASE],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
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
ok=False
for _ in range(60):
    ok=ev("!!(window._startCinema&&window.map&&window._UrbanProjects)")
    if ok is True: break
    time.sleep(1)
print("ready (startCinema+map+_UrbanProjects):",ok)
print("  proiecte Iasi:",ev("(window._UrbanProjects&&window._UrbanProjects.data['RO-IS-01']||[]).length"),
      "| nume:",ev("(window._UrbanProjects.data['RO-IS-01']||[]).map(function(p){return p.nume.slice(0,22)})"))
print(f"  proiecte {CITY}:",ev(f"(window._UrbanProjects.data['{CITY}']||[]).length"))

print(f"\npornesc cinematic pe {CITY}...")
ev(f"window._startCinema('{CITY}');true")
for _ in range(20):
    if ev("!!(window._CinemaEngine&&window._CinemaEngine._city)") is True: break
    time.sleep(1)
print("  _richBuildings:",ev("window._CinemaEngine._richBuildings"),
      "| oras:",ev("window._CinemaEngine._city && window._CinemaEngine._city.name"),
      "| pop:",ev("window._CinemaEngine._city && (window._CinemaEngine._city.pop2021||window._CinemaEngine._city.pop)"))
# du-te la b17s1 (Standard) si vezi stilul + cladiri
ev(r"""(function(){var SE=window._CinemaEngine;window.__M=SE._map;if(SE.SCENES)SE.SCENES.forEach(function(s){s.dur=(s.id==='b17s1'?16000:1200);});return 'ok';})()""")
seen=False
for i in range(120):
    sid=ev("(function(){var SE=window._CinemaEngine;return SE&&SE.SCENES&&SE.SCENES[SE._si]&&SE.SCENES[SE._si].id;})()")
    if sid=='b17s1':
        seen=True
        style=ev("(function(){try{var s=window.__M.getStyle();return s&&s.name||s&&s.metadata||'?';}catch(e){return 'err'}})()")
        curbase=ev("window._CinemaEngine._curBase")
        nbld=ev("(function(){try{return window.__M.queryRenderedFeatures({layers:undefined}).filter(function(f){return f.sourceLayer==='building'||(f.layer&&/building/.test(f.layer.id))}).length;}catch(e){return -1}})()")
        z=ev("+window.__M.getZoom().toFixed(1)"); p=ev("+window.__M.getPitch().toFixed(0)")
        print(f"  [b17s1] curBase={curbase} styleName={style} zoom={z} pitch={p} cladiri_vizibile~{nbld}")
        time.sleep(2)
        if i>40: break
    time.sleep(0.5)
print("  ajuns b17s1:",seen)
print("  erori:",ev("window.__e||[]"))
try: proc.send_signal(signal.SIGTERM)
except Exception: pass
