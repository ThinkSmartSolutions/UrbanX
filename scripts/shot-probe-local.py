#!/usr/bin/env python3
# Verificare VIZUALA: ruleaza cinematicul headless, intra in scenele tinta si captureaza PNG-uri reale
# (Page.captureScreenshot) ca sa vedem efectiv ce se deseneaza (harta rosie? bare? trafic?).
# Usage: shot-probe-local.py CITYKEY scene1 scene2 ...
import json, subprocess, time, urllib.request, websocket, signal, sys, base64, os

URL="http://localhost:8765/"; CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=9340; prof="/tmp/urbanx-shot-prof"; OUT="/tmp/urbanx-shots"
os.makedirs(OUT, exist_ok=True)
CITY=sys.argv[1] if len(sys.argv)>1 else "RO-IS-01"
SCENES=sys.argv[2:] if len(sys.argv)>2 else ["b8s2","b6s2","b17s1"]

proc=subprocess.Popen([CHROME,"--headless=new",f"--remote-debugging-port={PORT}","--remote-allow-origins=*",
  f"--user-data-dir={prof}","--window-size=1280,800","--no-first-run","--hide-scrollbars","--use-gl=angle","--use-angle=swiftshader",
  "--enable-webgl","--ignore-gpu-blocklist","--enable-unsafe-swiftshader","--disable-background-timer-throttling","--disable-renderer-backgrounding",
  "--disable-backgrounding-occluded-windows",URL],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
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
send("Runtime.enable"); send("Page.enable")
def ev(e):
    r=send("Runtime.evaluate",{"expression":e,"returnByValue":True,"awaitPromise":True})
    if "exceptionDetails" in r: return {"__err":r["exceptionDetails"].get("exception",{}).get("description","err")}
    return r.get("result",{}).get("value")
def dismiss():
    # ascunde TOATE overlay-urile HTML (cookies, login, onboarding) ca sa ramana doar harta + canvasul cinematic
    ev(r"""(function(){
      try{Array.prototype.forEach.call(document.querySelectorAll('button,a'),function(b){var t=(b.textContent||'').trim();if(/Accepta toate|Doar esentiale|^Accept|Inchide|Skip|Sari/i.test(t))try{b.click()}catch(e){}});}catch(e){}
      try{Array.prototype.forEach.call(document.querySelectorAll('body *'),function(el){
        var cs=getComputedStyle(el); var z=parseInt(cs.zIndex||0)||0; var pos=cs.position;
        var isCanvas = el.tagName==='CANVAS' || el.querySelector && el.querySelector('canvas');
        var isMap = (el.id&&/map/i.test(el.id)) || (el.className&&typeof el.className==='string'&&/mapboxgl/i.test(el.className));
        if((pos==='fixed'||pos==='absolute') && z>=5 && !isCanvas && !isMap && el.offsetWidth>200 && el.offsetHeight>120){ el.style.display='none'; }
      });}catch(e){}
      return 'x';})()""")
def shot(name):
    dismiss()
    r=send("Page.captureScreenshot",{"format":"png","captureBeyondViewport":False})
    data=r.get("data")
    if data:
        path=os.path.join(OUT,name+".png")
        with open(path,"wb") as f: f.write(base64.b64decode(data))
        print("   SHOT:",path)
        return path
    print("   (no screenshot data)")

ev("window.__e=[];addEventListener('error',function(e){window.__e.push(String(e.message))});true")
ok=False
for _ in range(60):
    ok=ev("!!(window._startCinema&&window.map)")
    if ok is True: break
    time.sleep(1)
print("ready:",ok)
ev(f"window._startCinema('{CITY}');true")
for _ in range(20):
    if ev("!!(window._CinemaEngine&&window._CinemaEngine._city)") is True: break
    time.sleep(1)
print("oras:",ev("window._CinemaEngine._city&&window._CinemaEngine._city.name"),"curBaseInit:",ev("window._CinemaEngine._curBase"))
# scurteaza scenele care nu sunt tinta; tintele raman lungi
js=json.dumps(SCENES)
ev(f"(function(){{var SE=window._CinemaEngine,T={js};window.__M=SE._map;if(SE.SCENES)SE.SCENES.forEach(function(s){{s.dur=(T.indexOf(s.id)>=0?20000:1000);}});return 'ok';}})()")

done=set()
for i in range(300):
    sid=ev("(function(){var SE=window._CinemaEngine;return SE&&SE.SCENES&&SE.SCENES[SE._si]&&SE.SCENES[SE._si].id;})()")
    if sid in SCENES and sid not in done:
        # asteapta ~8s in scena ca sa se deseneze layerele+animatia, apoi 2 cadre
        print(f"[{sid}] intru, astept randarea...")
        time.sleep(8)
        lays=ev("(function(){var s=window.__M.getStyle();return (s&&s.layers||[]).map(function(L){return L.id}).filter(function(id){return /^v8-|^v9-|^cin-/.test(id)});})()")
        z=ev("+window.__M.getZoom().toFixed(1)"); cb=ev("window._CinemaEngine._curBase")
        print(f"   layere={lays} zoom={z} curBase={cb}")
        shot(f"{CITY}_{sid}_a")
        time.sleep(5); shot(f"{CITY}_{sid}_b")
        done.add(sid)
        if len(done)==len(SCENES): break
    time.sleep(0.5)
print("erori:",ev("window.__e||[]"))
try: proc.send_signal(signal.SIGTERM)
except Exception: pass
print("DONE shots in",OUT)
