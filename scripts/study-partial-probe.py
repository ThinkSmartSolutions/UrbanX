import json,subprocess,time,urllib.request,websocket,shutil,os,base64,sys
FN=sys.argv[1]; RENDER=[int(x) for x in sys.argv[2].split(',')] if len(sys.argv)>2 else []
URL="http://localhost:8765/";CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";PORT=9351;prof="/tmp/ux-scap"
OUT="/private/tmp/claude-502/-Users-florin-Desktop-platforma-urbanism-pachet-final-UrbanX/799161f9-8ee5-4372-a927-eee4dc3b73e3/scratchpad/"
shutil.rmtree(prof,ignore_errors=True)
p=subprocess.Popen([CHROME,"--headless=new",f"--remote-debugging-port={PORT}","--remote-allow-origins=*",f"--user-data-dir={prof}","--use-gl=angle","--use-angle=swiftshader","--enable-webgl","--ignore-gpu-blocklist",URL],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
def cdp():
    for _ in range(40):
        try:
            d=json.load(urllib.request.urlopen(f"http://localhost:{PORT}/json"))
            g=[t for t in d if t.get("type")=="page" and t.get("webSocketDebuggerUrl")]
            if g:return g[0]["webSocketDebuggerUrl"]
        except:pass
        time.sleep(0.5)
ws=websocket.create_connection(cdp(),max_size=None);i=[0]
def s(m,pa=None):
    i[0]+=1;ws.send(json.dumps({"id":i[0],"method":m,"params":pa or {}}))
    while 1:
        x=json.loads(ws.recv())
        if x.get("id")==i[0]:return x
s("Runtime.enable")
def ev(e):
    r=s("Runtime.evaluate",{"expression":e,"returnByValue":True,"awaitPromise":True})
    return r.get("result",{}).get("result",{}).get("value")
for _ in range(60):
    if ev(f"!!(window.{FN}&&window._initStudyPdf&&window.jspdf)")==True:break
    time.sleep(1)
ev("var d=0.0003,la=47.158,lo=27.601;window.S={parcels:[{geo:{type:'Feature',properties:{},geometry:{type:'Polygon',coordinates:[[[lo-d,la-d],[lo+d,la-d],[lo+d,la+d],[lo-d,la+d],[lo-d,la-d]]]}},nrcad:'149112',utr:'CC',area:1450,uat:'Municipiul Iasi',params:{pot:40,cut:1.2,h:10,niv:4}}],activeParcel:0};true")
# hook prototype.output + save pt a prinde instanta
ev("window.__pdf=null;var P=window.jspdf.jsPDF.prototype;['output','save'].forEach(function(m){var o=P[m];P[m]=function(){window.__pdf=this;return o.apply(this,arguments);};});true")
r=ev(f"(async()=>{{try{{await window.{FN}();return 'ok';}}catch(e){{return 'ERR '+e.message;}}}})()")
data=ev("window.__pdf?window.__pdf.output('datauristring'):null")
if not(isinstance(data,str) and 'base64,' in data):
    print(FN,"-> NO PDF ("+str(r)+")"); p.terminate(); sys.exit()
open('/tmp/scap.pdf','wb').write(base64.b64decode(data.split('base64,')[1]))
import fitz
d=fitz.open('/tmp/scap.pdf');H=d[0].rect.height
partials=[]
for k,pg in enumerate(d):
    bl=[b for b in pg.get_text('blocks') if b[4].strip() and b[1]>32 and b[3]<H-16]
    last=max([b[3] for b in bl] or [0]); nch=len(pg.get_text().strip()); pct=round(last/H*100)
    if nch>30 and pct<55: partials.append((k+1,pct,nch))
print(FN,'->',d.page_count,'pagini | PARTIALE:',[(f'p{a}',f'{b}%') for a,b,c in partials] or 'niciuna')
for k in RENDER:
    if k-1<d.page_count:
        pg=d[k-1];pix=pg.get_pixmap(matrix=fitz.Matrix(1.3,1.3));pix.save(OUT+FN+'_p'+str(k)+'.png');print('  rendered',FN+'_p'+str(k)+'.png')
p.terminate()
