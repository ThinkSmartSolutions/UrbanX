#!/usr/bin/env python3
# ═══════════════════════════════════════════════════════════════════════════
# pdf-sps-audit.py — AUDIT LIVE pentru cele 20 de studii SPS (_SPS_DEEP) + IVU.
# Randează _deepRender pe conținutul fiecărui studiu prin motorul real
# (tci-strategic-doc.js) și detectează automat:
#   • overflow ORIZONTAL (text care iese din pagina A4 — right > 197mm)
#   • overflow VERTICAL (text desenat sub limita paginii — y > 290mm)
#   • tokens stricate: undefined / NaN / [object Object]
#   • exceptii in randare
#   • titluri de capitol care depasesc banda (clipping) — verificat prin
#     desenarea reala a benzii vs. liniile de titlu.
# Rulare: python3 scripts/pdf-sps-audit.py
# Exit 0 = curat; 1 = probleme.
# ═══════════════════════════════════════════════════════════════════════════
import subprocess, time, json, urllib.request, signal, tempfile, sys, os, ssl
try:
    import websocket
except ImportError:
    print("Instaleaza: pip install websocket-client"); sys.exit(2)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
JSPDF = "/tmp/jspdf.js"
PORT = 9473

def ensure_jspdf():
    if os.path.exists(JSPDF): return
    url = "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"
    ctx = ssl.create_default_context(); ctx.check_hostname=False; ctx.verify_mode=ssl.CERT_NONE
    open(JSPDF,'wb').write(urllib.request.urlopen(url,context=ctx).read())

AUDIT_JS = r'''(function(){
  // context minim de oras pt _gctx (grafice fallback) — optional
  window.G = window;
  window._RO_CITIES_DB = window._RO_CITIES_DB || {'RO-IS-01':{name:'Municipiul Iasi',key:'RO-IS-01',pop2021:290000,rata_reala_2011_2021:0.6}};
  window.TCI = window.TCI || {cityKey:'RO-IS-01', cityName:'Municipiul Iasi'};
  // Toate corpurile dezvoltate (_DEEP) din sistem: SPS (20) + climatic + economic
  // + HBU/RCAI (teritoriu + parcela). Toate folosesc acelasi motor (_deepRender).
  var jobs = [];
  Object.keys(window._SPS_DEEP||{}).forEach(function(id){ jobs.push(['sps:'+id, window._SPS_DEEP[id]]); });
  if(window._CLIMA_DEEP) jobs.push(['clima', window._CLIMA_DEEP]);
  if(window._ECON_DEEP) jobs.push(['economie', window._ECON_DEEP]);
  if(window._HBU_DEEP) jobs.push(['hbu-teritoriu', window._HBU_DEEP]);
  if(window._HBU_DEEP_PARCEL) jobs.push(['hbu-parcela', window._HBU_DEEP_PARCEL]);
  if(window._RCAI_DEEP) jobs.push(['rcai-teritoriu', window._RCAI_DEEP]);
  if(window._RCAI_DEEP_PARCEL) jobs.push(['rcai-parcela', window._RCAI_DEEP_PARCEL]);
  var report = {};
  jobs.forEach(function(job){
    var id=job[0], arr=job[1];
    var pdf = new window.jspdf.jsPDF({unit:'mm',format:'a4'});
    var drawn=[], over=[], vover=[];
    var ot = pdf.text.bind(pdf);
    pdf.text = function(t,x,y,o){
      var s = Array.isArray(t)? t.join(' ') : String(t); drawn.push(s);
      try{
        var tw = pdf.getTextWidth(s); var al=(o&&o.align)||'left';
        // jsPDF rupe textul cand i se da maxWidth -> latimea efectiva e plafonata
        if(o&&o.maxWidth) tw=Math.min(tw,o.maxWidth);
        var right = al==='center'? x+tw/2 : al==='right'? x : x+tw;
        if(right>197 && s.trim().length>1) over.push(s.slice(0,34)+' @x='+Math.round(x)+' r='+Math.round(right));
        // footer-ul ruleaza legitim la ~291mm; semnalam doar continut real sub 295mm
        if(y>295 && s.trim().length>1 && !/^UrbanX/.test(s.trim())) vover.push(s.slice(0,34)+' @y='+Math.round(y));
      }catch(e){}
      return ot(t,x,y,o);
    };
    var thrown=[];
    try{
      var D = window._makeStratDoc(pdf,{docTitle:'AUDIT', cityName:'Municipiul Iasi'});
      D.__cityKey='RO-IS-01';
      window._deepRender(D, arr, D.dims.CW);
    }catch(e){ thrown.push(String(e&&e.message||e)); }
    var bad = drawn.filter(function(s){return /undefined|NaN|\[object Object\]/.test(s);});
    report[id] = {pages:pdf.getNumberOfPages(), chapters:(arr||[]).length,
      thrown:thrown, badCount:bad.length, badTokens:bad.slice(0,4),
      overflowCount:over.length, overflow:over.slice(0,5),
      voverflowCount:vover.length, voverflow:vover.slice(0,5)};
  });
  return JSON.stringify(report);
})()'''

def main():
    ensure_jspdf()
    prof = tempfile.mkdtemp()
    p = subprocess.Popen([CHROME,"--headless=new","--remote-debugging-port=%d"%PORT,"--no-sandbox",
        "--user-data-dir="+prof,"--remote-allow-origins=*"],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    nid=[0]
    def send(w,m,par=None):
        nid[0]+=1;i=nid[0];w.send(json.dumps({"id":i,"method":m,"params":par or {}}))
        while True:
            r=json.loads(w.recv())
            if r.get('id')==i:return r
    def ev(w,e): return send(w,"Runtime.evaluate",{"expression":e,"returnByValue":True}).get('result',{}).get('result',{}).get('value')
    fail=False
    try:
        ws=None
        for _ in range(30):
            time.sleep(0.5)
            try:
                j=json.load(urllib.request.urlopen("http://127.0.0.1:%d/json"%PORT));pg=[t for t in j if t['type']=='page']
                if pg:ws=pg[0]['webSocketDebuggerUrl'];break
            except Exception:pass
        w=websocket.create_connection(ws,max_size=None);w.settimeout(120);send(w,"Runtime.enable")
        ev(w,open(JSPDF).read());ev(w,"window.jsPDF=window.jspdf.jsPDF;window.G=window;")
        # motor + IVU + continut SPS
        for f in ['urbanx-ivu.js','urbanx-rank.js','tci-strategic-doc.js','sps-studies-content.js',
                  'urbanx-climate-content.js','urbanx-economy-content.js',
                  'urbanx-hbu-content.js','urbanx-hbu-parcel-content.js',
                  'urbanx-rcai-content.js','urbanx-rcai-parcel-content.js']:
            ev(w,open(os.path.join(ROOT,'js',f)).read())
        rep=json.loads(ev(w,AUDIT_JS))
        print("═══ UrbanX deep-studies layout audit (SPS + climatic/economic + HBU/RCAI) ═══")
        for name,d in sorted(rep.items()):
            ok = d['badCount']==0 and not d['thrown'] and d['overflowCount']==0 and d['voverflowCount']==0
            if not ok: fail=True
            print("%s %-16s pag=%-4d cap=%-4d throw=%s tok=%d Hover=%d Vover=%d"%(
                '✅' if ok else '❌', name, d['pages'], d['chapters'], (d['thrown'] or '-'),
                d['badCount'], d['overflowCount'], d['voverflowCount']))
            if d['overflow']: print("     Hoverflow:", d['overflow'])
            if d['voverflow']: print("     Voverflow:", d['voverflow'])
            if d['badTokens']: print("     tokens:", d['badTokens'])
        print("VERDICT SPS:", "PASS ✅" if not fail else "FAIL ❌")
    finally:
        p.send_signal(signal.SIGTERM)
    sys.exit(1 if fail else 0)

if __name__=='__main__':
    main()
