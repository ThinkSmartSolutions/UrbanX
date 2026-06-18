#!/usr/bin/env python3
# ═══════════════════════════════════════════════════════════════════════════
# pdf-content-audit.py — GARDĂ DE REGRESIE pentru rapoartele UrbanX (MP/PMUD).
# Randează stack-ul complet de capitole (toate modulele _Urban*) pentru mai multe
# orașe diverse și verifică AUTOMAT clasele de bug-uri vizuale care altfel ajung
# la utilizator: text "undefined" / "NaN" / "[object Object]", excepții în
# renderChapter, pagini lipsă. Rulează ÎNAINTE de fiecare deploy de raport.
#
# Necesită: Google Chrome + python websocket-client.
# Rulare:   python3 scripts/pdf-content-audit.py
# Exit 0 = curat; exit 1 = probleme găsite.
# ═══════════════════════════════════════════════════════════════════════════
import subprocess, time, json, urllib.request, signal, tempfile, sys, os, ssl
try:
    import websocket
except ImportError:
    print("Instalează: pip install websocket-client"); sys.exit(2)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
JSPDF = "/tmp/jspdf.js"
PORT = 9470

MODULES = ['urbanx-pdfmap','urbanx-indices','urbanx-projects','urbanx-riskmaps','urbanx-regio-infra',
           'urbanx-fauna','urbanx-tourism','urbanx-vitality','urbanx-services',
           'urbanx-housing','urbanx-energy','urbanx-resources',
           'urbanx-public-participation','urbanx-rank']

def ensure_jspdf():
    if os.path.exists(JSPDF): return
    url="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"
    ctx=ssl.create_default_context(); ctx.check_hostname=False; ctx.verify_mode=ssl.CERT_NONE
    open(JSPDF,'wb').write(urllib.request.urlopen(url,context=ctx).read())

AUDIT_JS = r'''(function(){
  var cities=[
    {city:{name:'Municipiul Iași',key:'RO-IS-01',pop2021:290000,judet:'IS',lat:47.16,lon:27.59,coef_hub:1.15,universitati:5},pred:{pctUE:62,r10:0.6,svM2:18,ag:0.20,co2cap:4.2,auth:1200,modalAuto:52}},
    {city:{name:'Cluj-Napoca',key:'RO-CJ-01',pop2021:290000,judet:'CJ',lat:46.77,lon:23.6,coef_hub:1.3,universitati:6},pred:{pctUE:72,r10:0.8,svM2:16,ag:0.10,co2cap:4.0,auth:1500,modalAuto:55}},
    {city:{name:'Vaslui',key:'RO-VS-01',pop2021:55000,judet:'VS',lat:46.64,lon:27.73,coef_hub:0.6},pred:{pctUE:38,r10:-0.8,svM2:9,ag:0.28,co2cap:5.1,auth:300,modalAuto:48}},
    {city:{name:'Constanța',key:'RO-CT-01',pop2021:283000,judet:'CT',lat:44.18,lon:28.65,coef_hub:1.0},pred:{pctUE:58,r10:0.1,svM2:12,ag:0.16,co2cap:4.8,auth:900,modalAuto:53}},
    {city:{name:'Municipiul București',key:'RO-B-01',pop2021:1716000,judet:'B',lat:44.43,lon:26.10,coef_hub:1.6,universitati:20},pred:{pctUE:95,r10:0.3,svM2:10,ag:0.30,co2cap:5.5,auth:5000,modalAuto:50}}
  ];
  var feats=[];for(var i=0;i<60;i++){var lon=27.55+(i%9)*0.007,lat=47.13+Math.floor(i/9)*0.007;feats.push({type:'Feature',properties:{zf:(i%4===0?'LA':i%4===1?'CC':i%4===2?'LC':'V')+'1'},geometry:{type:'Polygon',coordinates:[[[lon,lat],[lon+0.005,lat],[lon+0.005,lat+0.005],[lon,lat+0.005],[lon,lat]]]}});}
  var pug={type:'FeatureCollection',features:feats}, report={};
  cities.forEach(function(C){
    var pdf=new window.jspdf.jsPDF({unit:'mm',format:'a4'}); var drawn=[], over=[]; var ot=pdf.text.bind(pdf);
    pdf.text=function(t,x,y,o){
      var s=Array.isArray(t)?t.join(' '):String(t); drawn.push(s);
      // OVERFLOW: marginea dreapta a paginii A4 cu margine 18mm = 192mm; >197 = iese din pagina
      try{ var tw=pdf.getTextWidth(s); var al=(o&&o.align)||'left';
        var right = al==='center'? x+tw/2 : al==='right'? x : x+tw;
        if(right>197 && s.trim().length>1) over.push(s.slice(0,30)+' @x='+Math.round(x)+' right='+Math.round(right));
      }catch(e){}
      return ot(t,x,y,o);
    };
    var D=window._makeStratDoc(pdf,{docTitle:'AUDIT',cityName:C.city.name});
    if(window._PdfMap) window._PdfMap.setPug(pug);
    var ctx={city:C.city,cityKey:C.city.key,pugGeo:pug,reguli:{},risk:{seismic:{ag:C.pred.ag}}};
    var steps=[['indici',function(){window._UrbanIndices.renderChapter(D,C.pred,C.city);}],['proiecte',function(){window._UrbanProjects.renderChapter(D,C.city.key,C.city);}],['risc',function(){window._RiskMaps.renderChapter(D,ctx);}],['regio',function(){window._RegioInfra.renderChapter(D,C.city.key,C.city);}],['turism',function(){window._UrbanTourism.renderChapter(D,C.city.key,C.city);}],['vitality',function(){window._UrbanVitality.renderChapter(D,C.city.key,C.city);}],['servicii',function(){window._UrbanServices.renderChapter(D,C.city.key,C.city);}],['locuire',function(){window._UrbanHousing.renderChapter(D,C.city,C.pred);}],['energie',function(){window._UrbanEnergy.renderChapter(D,C.city,C.pred);}],['resurse',function(){window._UrbanResources.renderChapter(D,C.city);}],['fauna',function(){window._UrbanFauna.renderChapter(D,C.city);}],['participare',function(){window._PublicParticipation.renderChapter(D,C.city);}],['rank',function(){window._UrbanRank.renderChapter(D,C.pred,C.city);}]];
    var thrown=[]; steps.forEach(function(s){try{s[1]();}catch(e){thrown.push(s[0]+':'+e.message);}});
    var bad=drawn.filter(function(s){return /undefined|NaN|\[object Object\]/.test(s);});
    report[C.city.name]={pages:pdf.getNumberOfPages(), thrown:thrown, badTokens:bad.slice(0,5), badCount:bad.length, overflow:over.slice(0,5), overflowCount:over.length};
  });
  return JSON.stringify(report);
})()'''

def main():
    ensure_jspdf()
    prof=tempfile.mkdtemp()
    p=subprocess.Popen([CHROME,"--headless=new","--remote-debugging-port=%d"%PORT,"--no-sandbox",
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
        w=websocket.create_connection(ws,max_size=None);w.settimeout(60);send(w,"Runtime.enable")
        ev(w,open(JSPDF).read());ev(w,"window.jsPDF=window.jspdf.jsPDF;window.G=window;")
        for f in MODULES: ev(w,open(os.path.join(ROOT,'js',f+'.js')).read())
        ev(w,open(os.path.join(ROOT,'js','tci-strategic-doc.js')).read())
        rep=json.loads(ev(w,AUDIT_JS))
        print("═══ UrbanX PDF content audit ═══")
        for name,d in rep.items():
            ok = d['badCount']==0 and not d['thrown'] and d.get('overflowCount',0)==0
            if not ok: fail=True
            print("%s %-22s pagini=%d throw=%s tokens=%d overflow=%d"%(
                '✅' if ok else '❌', name, d['pages'], d['thrown'] or '-', d['badCount'], d.get('overflowCount',0)))
            if d['badTokens']: print("     tokens:", d['badTokens'])
            if d.get('overflow'): print("     overflow:", d['overflow'])
        print("VERDICT:", "PASS ✅" if not fail else "FAIL ❌")
    finally:
        p.send_signal(signal.SIGTERM)
    sys.exit(1 if fail else 0)

if __name__=='__main__':
    main()
