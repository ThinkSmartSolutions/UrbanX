#!/usr/bin/env python3
"""UrbanX — Ingestie DWG/DXF → JSON importabil în modulul de documentații.
Uz: python3 dwg-to-urbanx.py <fisier.dwg|.dxf> [out.json]
DWG → DXF via ODA File Converter (macOS), apoi extrage cu ezdxf:
indicatori (POT/CUT/SC/SD/regim/grad foc), texte, layere, arii polilinii, inventar dotari.
Datele se PROPUN — proiectantul confirma in UrbanX inainte de generare."""
import sys, os, re, json, subprocess, time, tempfile, shutil, collections, math
ODA="/Applications/ODAFileConverter.app/Contents/MacOS/ODAFileConverter"

def dwg_to_dxf(dwg):
    d=tempfile.mkdtemp(); ind=os.path.join(d,"in"); outd=os.path.join(d,"out")
    os.makedirs(ind); os.makedirs(outd)
    shutil.copy(dwg, os.path.join(ind,"f.dwg"))
    p=subprocess.Popen([ODA,ind,outd,"ACAD2018","DXF","0","1","*.DWG"],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    dxf=os.path.join(outd,"f.dxf"); prev=-1; stable=0
    for _ in range(90):
        time.sleep(2); sz=os.path.getsize(dxf) if os.path.exists(dxf) else 0
        if sz>0 and sz==prev: stable+=1
        else: stable=0
        prev=sz
        if stable>=3: break
    p.terminate()
    return dxf if os.path.exists(dxf) and prev>0 else None

def analyze(dxf):
    import ezdxf
    doc=ezdxf.readfile(dxf); msp=doc.modelspace()
    texts=[]
    for e in msp.query('TEXT MTEXT'):
        try:
            t=(e.text if e.dxftype()=='TEXT' else e.plain_text()).strip()
            if t: texts.append(t)
        except: pass
    big="\n".join(texts)
    def find(pat):
        m=re.search(pat,big,re.I); return m.group(1).strip() if m else None
    ind={
        "POT": find(r'POT\s*(?:propus)?\s*[:=]?\s*([\d.,]+)\s*%'),
        "CUT": find(r'CUT\s*(?:propus)?\s*[:=]?\s*([\d.,]+)'),
        "Sc": find(r'A\.?\s*construit[aă]\s*[:=]?\s*([\d.,]+)\s*mp'),
        "Sd": find(r'A\.?\s*desf[aă][sș]urat[aă]\s*[:=]?\s*([\d.,]+)\s*mp'),
        "regim": find(r'[Rr]egim de [iî]n[aă]l[tț]ime\s*[:=]?\s*([DP][^\n]{0,10})'),
        "grad_foc": find(r'[Gg]rad(?:ul)? de rezisten[tț][aă] la foc\s*[:=]?\s*([IVX]+)'),
    }
    blk=collections.Counter(e.dxf.name for e in msp.query('INSERT'))
    dotari={k:v for k,v in blk.items() if re.search(r'WC|LAVOAR|DUS|CHIUVETA|Window|Door|USA|FEREASTRA',k,re.I)}
    ent=collections.Counter(e.dxftype() for e in msp)
    return {
        "indicatori": {k:v for k,v in ind.items() if v},
        "nr_layere": len(doc.layers),
        "entitati": dict(sorted(ent.items(),key=lambda x:-x[1])[:10]),
        "nr_texte": len(texts),
        "dotari_inventar": dict(sorted(dotari.items(),key=lambda x:-x[1])[:15]),
        "are_model_3D": ent.get('3DFACE',0)>0 or ent.get('MESH',0)>0,
    }

def main():
    f=sys.argv[1]; out=sys.argv[2] if len(sys.argv)>2 else "urbanx_import.json"
    dxf=f if f.lower().endswith('.dxf') else dwg_to_dxf(f)
    if not dxf: print(json.dumps({"error":"conversie DWG esuata (ODA)"})); return
    res=analyze(dxf); res["sursa"]=os.path.basename(f)
    open(out,"w").write(json.dumps(res,ensure_ascii=False,indent=2))
    print(json.dumps(res,ensure_ascii=False,indent=2))
if __name__=="__main__": main()
