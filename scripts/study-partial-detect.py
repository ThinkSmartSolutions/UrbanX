#!/usr/bin/env python3
# Detectează pagini PARTIALE (conținut sub 55% din înălțime, excl. header/footer) într-un PDF studiu.
# Uz: genereaza studiul (proiectant-gen-probe.py) apoi: python3 study-partial-detect.py <pdf>
import fitz, sys
d=fitz.open(sys.argv[1]); H=d[0].rect.height; out=[]
for k,pg in enumerate(d):
    bl=[b for b in pg.get_text('blocks') if b[4].strip() and b[1]>32 and b[3]<H-16]
    last=max([b[3] for b in bl] or [0]); nch=len(pg.get_text().strip()); pct=round(last/H*100)
    if nch>30 and pct<55: out.append('p%d(%d%%)'%(k+1,pct))
print(d.page_count,'pagini | PARTIALE:', ' '.join(out) or 'niciuna')
