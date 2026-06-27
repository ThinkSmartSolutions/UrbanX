#!/usr/bin/env python3
# ═══════════════════════════════════════════════════════════════════════════
# pdf-parcel-audit.py — AUDIT LIVE pentru studiile de PARCELĂ (motorul
# _initStudyPdf din 09-pdf-engine.js + 10-studies*.js). Spre deosebire de
# motorul "deep" (_makeStratDoc), aceste studii cer o parcela selectata + harta
# Mapbox, deci le rulam pe site-ul LIVE (app complet incarcat), injectand o
# parcela sintetica si interceptand iesirea PDF (fara descarcare).
# Detecteaza overflow ORIZONTAL (text dincolo de marginea paginii, per latimea
# reala a paginii — unele studii sunt landscape/A3), tokens stricate, exceptii.
# Rulare: python3 scripts/pdf-parcel-audit.py
# ═══════════════════════════════════════════════════════════════════════════
import subprocess, time, json, urllib.request, signal, tempfile, sys, os

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT = 9476
URL = "https://thinksmartsolutions.github.io/UrbanX/"

# studiile de parcela (functii globale) — din meniul Rapoarte
GENERATORS = ['generateStudiuAmplasament','generateSolarStudy','generateShadowStudy','generateSSF',
  'generateGeotehnicalStudy','generateAACR','generateEnvironmentalImpact','generateWaterStudy',
  'generateGreenStudy','generateNoiseStudy','generateWindStudy','generateTrafficStudy',
  'generateMobilityStudy','generateDensityStudy','generateIstoricStudy','generateExistingBldStudy',
  'generateCPE','generateProiectieUrbanistica','generateHealthImpactStudy','generateSeismicStudy',
  'generateStudiuRestrictii','generateStudiuPMR','generateStudiuIluminat','generateREPA',
  'generateStudiuApePluviale','generateStabilitateTaluzuri','generatePrestudiuBransamente']
# studiul de fezabilitate sare peste modal doar cu obiect de override
GENERATORS_OVERRIDE = {'generateStudiuFezabilitate': "{buget:1000000,scenariu:'maxim',durata:24}"}

SETUP_JS = r'''(function(){
  if(!(window.S && window.jspdf && window.turf)) return 'NOT_READY';
  // parcela sintetica (poligon ~ langa Iasi)
  var lon=27.59, lat=47.16, d=0.0009;
  var poly={type:'Feature',properties:{},geometry:{type:'Polygon',coordinates:[[[lon,lat],[lon+d,lat],[lon+d,lat+d],[lon,lat+d],[lon,lat]]]}};
  window.S.parcels=[{geo:poly,nrcad:'12345',area:780,utr:'LC',params:null}];
  window.S.activeParcel=0;
  // intercepteaza descarcarile + acumuleaza overflow per studiu in window.__AUD
  window.__AUD = {cur:null, data:{}};
  function rec(kind,info){ var c=window.__AUD.cur; if(!c)return; var d=window.__AUD.data[c]; if(d) d[kind].push(info); }
  var JP = window.jspdf.jsPDF;
  if(!JP.prototype.__audPatched){
    JP.prototype.__audPatched=1;
    var ot=JP.prototype.text;
    JP.prototype.text=function(t,x,y,o){
      try{
        var s=Array.isArray(t)?t.join(' '):String(t);
        var PW=this.internal.pageSize.getWidth();
        var tw=this.getTextWidth(s); if(o&&o.maxWidth) tw=Math.min(tw,o.maxWidth);
        var al=(o&&o.align)||'left';
        var right = al==='center'? x+tw/2 : al==='right'? x : x+tw;
        if(right>PW-13.5+0.5 && s.trim().length>1) rec('over', s.slice(0,32)+' @r='+Math.round(right)+'/'+Math.round(PW));
        if(/undefined|NaN|\[object Object\]/.test(s)) rec('tok', s.slice(0,40));
      }catch(e){}
      return ot.apply(this,arguments);
    };
  }
  // anuleaza save real (nu descarca) — pastram nr pagini
  var os_=JP.prototype.save; JP.prototype.save=function(){ try{var c=window.__AUD.cur; if(c)window.__AUD.data[c].pages=this.getNumberOfPages();}catch(e){} return this; };
  window._pdfSaveMobile=function(pdf){ try{var c=window.__AUD.cur; if(c&&pdf)window.__AUD.data[c].pages=pdf.getNumberOfPages();}catch(e){} };
  return 'READY';
})()'''

def runjs(gen, override):
    call = "%s(%s)" % (gen, override or "")
    return r'''(function(){
      window.__AUD.cur=%r; window.__AUD.data[%r]={over:[],tok:[],pages:0,err:null};
      try{ var r=%s; if(r&&r.then){ } }
      catch(e){ window.__AUD.data[%r].err=String(e&&e.message||e); }
      return JSON.stringify(window.__AUD.data[%r]);
    })()''' % (gen, gen, call, gen, gen)

def main():
    prof=tempfile.mkdtemp()
    p=subprocess.Popen([CHROME,"--headless=new","--remote-debugging-port=%d"%PORT,"--no-sandbox",
        "--use-gl=angle","--use-angle=swiftshader","--enable-webgl","--ignore-gpu-blocklist",
        "--user-data-dir="+prof,"--remote-allow-origins=*","--window-size=1400,1000"],
        stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    nid=[0]
    def send(w,m,par=None):
        nid[0]+=1;i=nid[0];w.send(json.dumps({"id":i,"method":m,"params":par or {}}))
        while True:
            r=json.loads(w.recv())
            if r.get('id')==i:return r
    def ev(w,e,timeout=False):
        r=send(w,"Runtime.evaluate",{"expression":e,"returnByValue":True,"awaitPromise":bool(timeout)})
        return r.get('result',{}).get('result',{}).get('value')
    import websocket
    fail=False
    try:
        ws=None
        for _ in range(30):
            time.sleep(0.5)
            try:
                j=json.load(urllib.request.urlopen("http://127.0.0.1:%d/json"%PORT));pg=[t for t in j if t['type']=='page']
                if pg:ws=pg[0]['webSocketDebuggerUrl'];break
            except Exception:pass
        w=websocket.create_connection(ws,max_size=None);w.settimeout(90);send(w,"Runtime.enable");send(w,"Page.enable")
        send(w,"Page.navigate",{"url":URL})
        # asteapta app-ul (S + jspdf + turf + un generator)
        ready=False
        for _ in range(60):
            time.sleep(1)
            st=ev(w,"(window.S&&window.jspdf&&window.turf&&typeof generateSolarStudy==='function')?'Y':'N'")
            if st=='Y': ready=True; break
        if not ready: print("APP not ready (login/onboarding sau incarcare lenta)"); sys.exit(2)
        time.sleep(2)
        print("setup:", ev(w,SETUP_JS))
        print("═══ UrbanX parcel-studies live audit (motor _initStudyPdf) ═══")
        jobs=[(g,None) for g in GENERATORS]+[(g,o) for g,o in GENERATORS_OVERRIDE.items()]
        for gen,ov in jobs:
            raw=ev(w, runjs(gen,ov), timeout=True)
            try: d=json.loads(raw)
            except Exception: d={'over':[],'tok':[],'pages':0,'err':'no-result'}
            time.sleep(0.4)
            # re-citeste (in caz de async) starea acumulata
            raw2=ev(w,"JSON.stringify(window.__AUD.data[%r]||{})"%gen)
            try:
                d2=json.loads(raw2)
                if d2: d=d2
            except Exception: pass
            ok = not d.get('err') and not d.get('over') and not d.get('tok')
            if not ok: fail=True
            print("%s %-32s pag=%-3s over=%d tok=%d %s"%('✅' if ok else '❌', gen,
                str(d.get('pages','?')), len(d.get('over',[])), len(d.get('tok',[])),
                ('ERR:'+d['err']) if d.get('err') else ''))
            if d.get('over'): print("     overflow:", d['over'][:4])
            if d.get('tok'): print("     tokens:", d['tok'][:4])
        print("VERDICT PARCEL:", "PASS ✅" if not fail else "FAIL ❌ (vezi mai sus)")
    finally:
        p.send_signal(signal.SIGTERM)
    sys.exit(1 if fail else 0)

if __name__=='__main__':
    main()
