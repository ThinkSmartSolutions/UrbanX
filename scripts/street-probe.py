#!/usr/bin/env python3
# Runtime probe: ruleaza cinematicul UrbanX headless, intra in scena de strada (b17s1)
# si logheaza zoom/pitch + ce reseteaza camera. Observatie reala, nu ghicit.
import json, subprocess, time, threading, urllib.request, websocket, os, signal, sys

URL = "https://thinksmartsolutions.github.io/UrbanX/"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT = 9333
prof = "/tmp/urbanx-probe-prof"

proc = subprocess.Popen([CHROME, "--headless=new", f"--remote-debugging-port={PORT}",
    "--remote-allow-origins=*",
    f"--user-data-dir={prof}", "--window-size=1400,900", "--no-first-run",
    "--use-gl=angle", "--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist",
    "--disable-background-timer-throttling", "--disable-renderer-backgrounding",
    "--disable-backgrounding-occluded-windows",
    URL], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def cdp_targets():
    for _ in range(40):
        try:
            d = json.load(urllib.request.urlopen(f"http://localhost:{PORT}/json"))
            pages = [t for t in d if t.get("type")=="page" and t.get("webSocketDebuggerUrl")]
            if pages: return pages[0]["webSocketDebuggerUrl"]
        except Exception: pass
        time.sleep(0.5)
    raise RuntimeError("no CDP target")

ws_url = cdp_targets()
ws = websocket.create_connection(ws_url, max_size=None)
_id = [0]
def send(method, params=None):
    _id[0]+=1; mid=_id[0]
    ws.send(json.dumps({"id":mid,"method":method,"params":params or {}}))
    while True:
        m = json.loads(ws.recv())
        if m.get("id")==mid: return m.get("result",{})

send("Runtime.enable"); send("Page.enable")

def ev(expr):
    r = send("Runtime.evaluate", {"expression":expr,"returnByValue":True,"awaitPromise":True})
    if "exceptionDetails" in r:
        return {"__err": r["exceptionDetails"].get("exception",{}).get("description","err")}
    return r.get("result",{}).get("value")

# capteaza erori
ev("window.__cinErrs=[]; window.addEventListener('error',function(e){window.__cinErrs.push(String(e.message))}); true")

# asteapta sa se incarce harta (SE._map) + engine
print("astept incarcarea hartii + _startCinema...")
ok=False
for _ in range(60):
    ok = ev("!!(window._startCinema && window.map)")
    if ok is True: break
    time.sleep(1)
print("  startCinema+map ready:", ok)

# porneste cinematicul pe Iasi
print("pornesc cinematicul pe RO-IS-01...")
ev("window._startCinema('RO-IS-01'); true")
time.sleep(4)

# acum SE._map exista; pune spion pe camera + scurteaza scenele ca sa ajungem rapid la b17s1
ev(r"""(function(){
  var SE=window._CinemaEngine; var M=SE&&SE._map; if(!M)return 'no-map';
  window.__M=M; window.__camlog=[];
  ['flyTo','jumpTo','easeTo'].forEach(function(fn){
    var o=M[fn].bind(M);
    M[fn]=function(opt){
      try{ window.__camlog.push({fn:fn,zoom:(opt&&opt.zoom),pitch:(opt&&opt.pitch),
        sid:(SE.SCENES&&SE.SCENES[SE._si]&&SE.SCENES[SE._si].id),
        stack:(new Error().stack||'').split('\n').slice(2,6).join(' | ')}); }catch(e){}
      return o(opt);
    };
  });
  // scurteaza dramatic scenele dinainte de b17s1 ca sa ajungem repede acolo
  if(SE.SCENES){ SE.SCENES.forEach(function(s){ if(s.id!=='b17s1') s.dur=1200; else s.dur=22000; }); }
  return 'spy-ok';
})()""")
print("  spy:", ev("'ok'"))

print("\n=== monitorizez pana ajunge la b17s1, apoi 18s in scena ===")
log=[]; seen_street=False; street_t=0
for i in range(120):
    sid = ev("(function(){var SE=window._CinemaEngine;return SE&&SE.SCENES&&SE.SCENES[SE._si]&&SE.SCENES[SE._si].id;})()")
    z = ev("window.__M && +window.__M.getZoom().toFixed(2)")
    p = ev("window.__M && +window.__M.getPitch().toFixed(1)")
    if sid=='b17s1':
        seen_street=True
        print(f"  [STREET] t={street_t*0.5:4.1f}s  zoom={z}  pitch={p}")
        street_t+=1
        if street_t>36: break
    else:
        if i%4==0: print(f"  ... scene={sid} zoom={z}")
    log.append((sid,z,p))
    time.sleep(0.5)
print("  ajuns in scena de strada:", seen_street)

print("\n=== ultimele 25 comenzi de camera (cine misca camera) ===")
cam = ev("window.__camlog ? window.__camlog.slice(-25) : []")
if isinstance(cam,list):
    for c in cam:
        print(f"  fn={c.get('fn')} zoom={c.get('zoom')} pitch={c.get('pitch')} si={c.get('si')}  @ {c.get('stack','')[:120]}")

print("\n=== erori consola ===")
errs = ev("window.__cinErrs || '(fara captura)'")
print(" ", errs)

try: proc.send_signal(signal.SIGTERM)
except Exception: pass
