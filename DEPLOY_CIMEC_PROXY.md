# Deploy Cloudflare Worker pentru CIMEC

## De ce e necesar
CIMEC (`map.cimec.ro`) blochează CORS din browser.
Fără proxy, LMI-urile nu pot fi verificate automat din TCI.

## Deploy în 5 minute (gratuit)

### 1. Cont Cloudflare
Dacă nu ai deja: [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)
Plan gratuit: 100.000 req/zi — mai mult decât suficient.

### 2. Deploy Worker
1. Mergi la [workers.cloudflare.com](https://workers.cloudflare.com)
2. Click **"Create a Worker"**
3. Șterge tot codul din editor
4. Paste conținutul din `cimec-worker.js` (din acest repo)
5. Click **"Save and Deploy"**
6. Notează URL-ul: `https://cimec-proxy.YOURNAME.workers.dev`

### 3. Configurează TCI
În consola browser, înainte de a lansa TCI:
```javascript
TCI.CIMEC_PROXY = 'https://cimec-proxy.YOURNAME.workers.dev';
```

Sau adaugă în `index.html` înainte de `</body>`:
```html
<script>
  window.addEventListener('load', () => {
    if(window.TCI) TCI.CIMEC_PROXY = 'https://cimec-proxy.YOURNAME.workers.dev';
  });
</script>
```

## Testare
Deschide TCI → Console → verifică:
```
[CIMEC] ✅ monumente: 47 monumente
[CIMEC] ✅ zone: 12 monumente  
[CIMEC] ✅ situri: 8 monumente
```

## Ce obții după configurare
- **Toate monumentele istorice** din orice UAT din România
- Buffer automat 100m (cat. A) / 50m (cat. B)
- Situri arheologice excluse automat
- Zone construite protejate excluse automat
- Funcționează pentru orice municipiu, oraș, comună

## Sursa datelor
CIMEC — Centrul Național de Cercetare și Formare în Conservarea Patrimoniului  
Lista Monumentelor Istorice (LMI) 2015 + actualizări Ord. MC 5095/2021
