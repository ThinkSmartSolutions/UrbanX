#!/usr/bin/env python3
# Runtime health-probe TINTIT: scenele b8s2 (coridoare influenta) si b10s2 (scenariu negru) ruleaza
# lung (ca onIdle sa apuce sa deseneze), restul scurt. Verifica layere pe harta + centru (anti-extravilan)
# + 0 erori JS. Observatie reala, nu ghicit.
import json, subprocess, time, urllib.request, websocket, signal

URL="http://localhost:8765/"; CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT=9335; prof="/tmp/urbanx-scene2-prof"
TARGETS={'b8s2':16000,'b10s2':16000,'b9s2':14000,'b6s2':14000}

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
ev("window._startCinema('RO-IS-01');true"); time.sleep(4)
ev("window.__M=window._CinemaEngine&&window._CinemaEngine._map; window.__cx=window._CinemaEngine._city.lon; window.__cy=window._CinemaEngine._city.lat; true")
js_targets=json.dumps(TARGETS)
ev(f"(function(){{var SE=window._CinemaEngine,T={js_targets};if(SE.SCENES)SE.SCENES.forEach(function(s){{s.dur=T[s.id]||1500;}});return 'ok';}})()")
cx=ev("window.__cx"); cy=ev("window.__cy")
print(f"  centru UAT: {round(cx,4)},{round(cy,4)}")

errs=set(); last=None; samp={}
print("\n=== monitorizez scenele tinta ===")
for i in range(220):
    sid=ev("(function(){var SE=window._CinemaEngine;return SE&&SE.SCENES&&SE.SCENES[SE._si]&&SE.SCENES[SE._si].id;})()")
    if sid in TARGETS:
        lays=ev("(function(){var M=window.__M;var s=M.getStyle();return (s&&s.layers||[]).map(function(L){return L.id}).filter(function(id){return /^v8-|^v9-/.test(id)});})()")
        ctr=ev("(function(){var c=window.__M.getCenter();return [+c.lng.toFixed(4),+c.lat.toFixed(4)];})()")
        z=ev("+window.__M.getZoom().toFixed(2)")
        dist_km=ev(f"(function(){{var c=window.__M.getCenter();var dx=(c.lng-{cx})*Math.cos({cy}*Math.PI/180),dy=c.lat-{cy};return +(Math.hypot(dx,dy)*111).toFixed(1);}})()")
        rec=samp.setdefault(sid,{'lays':set(),'maxdist':0,'z':[]})
        if isinstance(lays,list): rec['lays'].update(lays)
        if isinstance(dist_km,(int,float)): rec['maxdist']=max(rec['maxdist'],dist_km)
        if isinstance(z,(int,float)): rec['z'].append(z)
        if sid!=last: print(f"  [{sid}] z={z} centru={ctr} dist_centru={dist_km}km layere={lays}")
        last=sid
    e=ev("window.__e||[]")
    if isinstance(e,list):
        for m in e:
            if m not in errs: errs.add(m); print("   !!! EROARE:",m)
    if sid in ('b12s1','b12s2','b25s1'): break
    time.sleep(0.6)

print("\n=== REZUMAT ===")
for s in TARGETS:
    r=samp.get(s)
    if r: print(f"  {s}: layere={sorted(r['lays'])}  dist_max_centru={r['maxdist']}km  zoom~{round(sum(r['z'])/len(r['z']),1) if r['z'] else '?'}")
    else: print(f"  {s}: (neatins)")
print("  erori:", list(errs) if errs else "NICIUNA")
try: proc.send_signal(signal.SIGTERM)
except Exception: pass
