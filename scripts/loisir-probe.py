#!/usr/bin/env python3
# Runtime probe pt modulul LOISIR: incarca js/loisir.js + loisir-uhi.js + Three.js
# intr-o pagina minima, testeaza engine-ul (program/cost/catalog/concurs) si 3D.
import json, subprocess, time, urllib.request, websocket, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HARNESS = "http://localhost:8765/scripts/_loisir_test.html"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT = 9337
prof = "/tmp/urbanx-loisir-prof"

# pagina de test minima
html = """<!doctype html><meta charset=utf-8><body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="../js/loisir-uhi.js"></script>
<script src="../js/loisir.js"></script>
<div id="box" style="width:600px;height:400px"></div>
</body>"""
with open(os.path.join(ROOT, "scripts", "_loisir_test.html"), "w") as f:
    f.write(html)

proc = subprocess.Popen([CHROME, "--headless=new", f"--remote-debugging-port={PORT}",
    "--remote-allow-origins=*", f"--user-data-dir={prof}", "--window-size=1200,800",
    "--no-first-run", "--use-gl=angle", "--use-angle=swiftshader", "--enable-webgl",
    "--ignore-gpu-blocklist", HARNESS], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def target():
    for _ in range(40):
        try:
            d = json.load(urllib.request.urlopen(f"http://localhost:{PORT}/json"))
            pages = [t for t in d if t.get("type")=="page" and t.get("webSocketDebuggerUrl")]
            if pages: return pages[0]["webSocketDebuggerUrl"]
        except Exception: pass
        time.sleep(0.5)
    raise RuntimeError("no CDP target")

ws = websocket.create_connection(target(), max_size=None)
_id=[0]
def send(method, params=None):
    _id[0]+=1; mid=_id[0]
    ws.send(json.dumps({"id":mid,"method":method,"params":params or {}}))
    while True:
        m=json.loads(ws.recv())
        if m.get("id")==mid: return m.get("result",{})
send("Runtime.enable"); send("Page.enable")
def ev(expr):
    r=send("Runtime.evaluate",{"expression":expr,"returnByValue":True,"awaitPromise":True})
    if "exceptionDetails" in r:
        return {"__err": r["exceptionDetails"].get("exception",{}).get("description","err")}
    return r.get("result",{}).get("value")

ev("window.__errs=[];addEventListener('error',e=>window.__errs.push(String(e.message)));true")
time.sleep(2.5)

tests = {
 "THREE loaded": "!!window.THREE",
 "Loisir loaded": "!!window.Loisir",
 "UHI loaded": "!!window.UHI",
 "program(2ha)": "(function(){var p=Loisir.program(2);return p && p.zones.length+'z/'+p.fixed_zones.length+'fix/'+p.ecology.arbori_estimati+'arb/'+p.checks.length+'chk';})()",
 "program zones sum mp": "(function(){var p=Loisir.program(2);var s=p.zones.reduce((a,z)=>a+z.m2,0);return Math.round(s/p.area_m2*100)+'%';})()",
 "cost standard 20000mp": "(function(){var c=Loisir.costEstimate(20000,'standard',60);return c.total_lo+'-'+c.total_hi+' '+(c.disclaimer?'+disc':'');})()",
 "catalog kpis": "(function(){var k=Loisir.catalog.kpis(290000);return k.spaces+'sp/'+k.total_ha+'ha/'+k.mp_loc+'mp_loc/meets='+k.meets_target;})()",
 "species native": "Loisir.species('native').length",
 "concurs add+rank": "(function(){var c=Loisir.concurs.add({sit_name:'T',area_ha:2});Loisir.concurs.addSubmission(c.id,{title:'A',scores:{}});var cc=Loisir.concurs.list().filter(x=>x.id===c.id)[0];cc.submissions[0].scores={'Calitatea conceptului peisagistic':8};var r=Loisir.concurs.rank(c.id);Loisir.concurs.remove(c.id);return r.length+' top='+(r[0]&&r[0].total);})()",
 "render3D no-throw": "(function(){try{Loisir.render3D(Loisir.program(2),document.getElementById('box'));Loisir.dispose3D();return 'ok';}catch(e){return 'THROW:'+e.message;}})()",
 "chapter no-throw": "(function(){var out=[];var D={chapter:t=>out.push('H1:'+t),h2:t=>out.push('H2:'+t),P:t=>out.push('P'),kpis:()=>out.push('K'),table:()=>out.push('T'),callout:()=>out.push('C')};try{Loisir.chapter(D);return out.join('|').slice(0,60);}catch(e){return 'THROW:'+e.message;}})()",
 "openPanel no-throw": "(function(){try{Loisir.openPanel();var ok=!!document.querySelector('div');return 'ok';}catch(e){return 'THROW:'+e.message;}})()",
 "runtime errors": "JSON.stringify(window.__errs)",
}
print("="*60)
for name, expr in tests.items():
    print(f"{name:24} -> {ev(expr)}")
print("="*60)

try: proc.terminate()
except Exception: pass
os.remove(os.path.join(ROOT,"scripts","_loisir_test.html"))
