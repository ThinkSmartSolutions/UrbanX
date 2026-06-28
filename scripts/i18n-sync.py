#!/usr/bin/env python3
# ============================================================================
# i18n-sync — O COMANDĂ care ține traducerea la zi.
# Pentru orice studiu/funcție NOUĂ: rulează `python3 scripts/i18n-sync.py`.
# Pași: (1) deschide platforma headless + cât mai multe panouri/meniuri;
#       (2) scrapează toate string-urile UI statice cu litere;
#       (3) traduce ce e NOU (ro→en/fr/de) via Google Translate (cache, batch);
#       (4) regenerează js/i18n-auto.js (dicționar static, runtime fără API).
# Necesită serverul local: python3 -m http.server 8765 (în rădăcina repo).
# ============================================================================
import json, subprocess, time, urllib.request, urllib.parse, ssl, os, shutil, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = "/tmp/i18n/cache.json"; os.makedirs("/tmp/i18n", exist_ok=True)
URL = "http://localhost:8765/"; CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT = 9380; prof = "/tmp/urbanx-i18nsync"; shutil.rmtree(prof, ignore_errors=True)
ctx = ssl.create_default_context(); ctx.check_hostname = False; ctx.verify_mode = ssl.CERT_NONE

# ── 1. headless + scrape ────────────────────────────────────────────────────
proc = subprocess.Popen([CHROME, "--headless=new", f"--remote-debugging-port={PORT}", "--remote-allow-origins=*",
  f"--user-data-dir={prof}", "--no-first-run", "--use-gl=angle", "--use-angle=swiftshader", URL],
  stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
def cdp():
    for _ in range(40):
        try:
            d = json.load(urllib.request.urlopen(f"http://localhost:{PORT}/json"))
            pg = [t for t in d if t.get("type") == "page" and t.get("webSocketDebuggerUrl")]
            if pg: return pg[0]["webSocketDebuggerUrl"]
        except Exception: pass
        time.sleep(0.5)
    raise RuntimeError("no CDP — pornește serverul: python3 -m http.server 8765")
ws = __import__("websocket").create_connection(cdp(), max_size=None); _id = [0]
def ev(e, wait=False):
    _id[0] += 1; ws.send(json.dumps({"id": _id[0], "method": "Runtime.evaluate", "params": {"expression": e, "returnByValue": True, "awaitPromise": wait}}))
    while True:
        x = json.loads(ws.recv())
        if x.get("id") == _id[0]: return x.get("result", {}).get("result", {}).get("value")
ws.send(json.dumps({"id": 900, "method": "Runtime.enable"})); ws.recv()
for _ in range(60):
    if ev("!!(window.UXSidebar&&window.UrbanXI18n)") is True: break
    time.sleep(1)
ev("try{window.UrbanXI18n.setLang('ro')}catch(e){}")  # scrapăm sursa RO
# deschide cât mai multe suprafețe statice în DOM
ev("""try{
  window.UXSidebar&&window.UXSidebar.open();
  (window.UXSidebar&&window.UXSidebar.NAV||[]).forEach(function(g){try{window.UXSidebar.toggleGroup(g.id);window.UXSidebar.toggleGroup(g.id);}catch(e){}});
  var m=document.getElementById('rapoarte-menu'); if(m)m.style.display='block';
  ['openDashboard','openPanel','open','openStudiu','openManager'].forEach(function(fn){
    ['UXI','SimLab','Flux','Market','Feaz','Invest','LVC','Carbon','Heritage','SIDU'].forEach(function(o){try{window[o]&&window[o][fn]&&window[o][fn]();}catch(e){}});
  });
}catch(e){}""")
time.sleep(2)
arr = ev(r"""(function(){
  var skip={SCRIPT:1,STYLE:1,TEXTAREA:1,NOSCRIPT:1,CODE:1},set={};
  var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null),n;
  while((n=w.nextNode())){var p=n.parentNode;if(!p||skip[p.nodeName])continue;
    var t=(n.nodeValue||'').trim();if(t.length<2||t.length>160)continue;
    if(!/[a-zA-ZăâîșțĂÂÎȘȚ]/.test(t))continue; if(/^\d[\d.,%\s]*$/.test(t))continue;
    set[t]=1;}
  return JSON.stringify(Object.keys(set));
})()""")
try: proc.terminate()
except Exception: pass
strings = json.loads(arr or "[]")
print(f"[scrape] {len(strings)} string-uri UI în DOM")

# ── 2. traduce ce e NOU (cache + batch + SSL fix) ───────────────────────────
cache = json.load(open(CACHE)) if os.path.exists(CACHE) else {}
def req(q, tl):
    u = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=ro&tl=" + tl + "&dt=t&q=" + urllib.parse.quote(q)
    rq = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
    for a in range(3):
        try:
            r = json.load(urllib.request.urlopen(rq, timeout=25, context=ctx))
            return "".join(s[0] for s in r[0] if s and s[0])
        except Exception: time.sleep(0.5 * (a + 1))
    return None
newcount = 0
for tl in ["en", "fr", "de"]:
    pend = [s for s in strings if (tl + "|" + s) not in cache]
    for i in range(0, len(pend), 8):
        batch = pend[i:i+8]; res = req("\n".join(batch), tl); ok = False
        if res is not None:
            lines = res.split("\n")
            if len(lines) == len(batch):
                for s, t in zip(batch, lines): cache[tl + "|" + s] = t;
                ok = True
        if not ok:
            for s in batch:
                t = req(s, tl)
                if t is not None: cache[tl + "|" + s] = t
        newcount += len(batch); time.sleep(0.1)
    json.dump(cache, open(CACHE, "w"), ensure_ascii=False)
print(f"[translate] procesate {newcount} (limbă×string noi)")

# ── 3. regenerează js/i18n-auto.js din TOT cache-ul ─────────────────────────
def esc(s): return s.replace("\\", "\\\\").replace("'", "\\'").replace("\n", "\\n").replace("\r", "")
allstr = sorted({k.split("|", 1)[1] for k in cache})
out = ["// AUTO-GENERAT de scripts/i18n-sync.py · NU edita manual · ro→en/fr/de",
       "(function(G){ if(!G.UrbanXI18n||!G.UrbanXI18n.extend) return;"]
for tl in ["en", "fr", "de"]:
    pairs = ["'" + esc(s) + "':'" + esc(cache[tl + "|" + s]) + "'" for s in allstr if cache.get(tl + "|" + s) and cache.get(tl + "|" + s) != s]
    out.append("G.UrbanXI18n.extend('" + tl + "',{" + ",".join(pairs) + "});")
    print(f"[gen] {tl}: {len(pairs)} perechi")
out.append("console.log('[i18n-auto] dictionar MT incarcat'); })(window);")
open(os.path.join(ROOT, "js/i18n-auto.js"), "w").write("\n".join(out))
print("[gen] ✅ scris js/i18n-auto.js — bump ?v= în index.html și deploy")
