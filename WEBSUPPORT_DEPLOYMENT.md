# WebSupport Smart Deployment Guide
## Palostranka Project - Full Stack Deployment

---

## 📋 PRED ZAČATÍM
Príprav si:
1. **WebSupport prihlasovacie údaje** (FTP hostname, username, password)
2. **Doménové meno** (napr. www.palostranka.sk alebo subdomain.websupport.sk)
3. **MongoDB Atlas connection string** - už máš v `.env`
4. **Admin heslo** - nastavené na `pavelp137`

---

## 🔄 Štruktúra nasadenia

```
WebSupport Smart
├── Frontend - React build files (dist/)
├── Backend - Node.js server (server/)
│   ├── index.js
│   ├── package.json
│   ├── .env (environment variables)
│   ├── models/
│   ├── routes/
│   └── uploads/
└── MongoDB - Cloud Atlas (pripojenie cez environment variables)
```

---

## ⚙️ KROK 1: Príprava súborov na lokálnom počítači

Všetko je HOTOVÉ v `c:\Users\micha\Desktop\palostranka-project\palostranka`:

✅ **Frontend:**
```
client/dist/          ← Build je hotový (vytvorený Vite)
  ├── index.html
  ├── assets/
  └── _redirects     ← Presmerovanie pre SPA
```

✅ **Backend:**
```
server/               ← Hotový na nasadenie
├── index.js         ← Serviruje aj frontend aj API
├── package.json
├── .env             ← Má MongoDB URI
├── models/
└── routes/
```

---

## 🌐 KROK 2: Prístup na WebSupport

### 2a. Prihlásiť sa do WebSupport admin panelu
1. Choď na https://admin.websupport.sk
2. Prihlás sa svojimi údajmi
3. Nájdi položku **"Smart Hosting"** (alebo "Webhosting")

### 2b. Skontroluj Node.js dostupnosť
- WebSupport Smart **MUSÍ** mať nainštalovaný Node.js
- Ak ho nemáš, kontaktuj WebSupport support alebo aktivuj "Node.js" v nastaveniach

### 2c. Zisti FTP údaje
1. V admin panele nájdi **"FTP prístupy"**
2. Skopíruj:
   - **Hostname:** (napr. ftp.websupport.sk)
   - **Username:** (tvoj FTP login)
   - **Password:** (tvoje FTP heslo)

---

## 📤 KROK 3: Vytvorenie štruktúry na WebSupport

### 3a. Pripoj sa cez FTP
Použij program ako **WinSCP**, **FileZilla** alebo **Total Commander**:
```
Host: [WebSupport FTP Hostname]
User: [FTP Username]
Pass: [FTP Password]
```

### 3b. Vytvor priečinky (ak neexistujú)
```
/                     ← Root na WebSupport
├── public_html/      ← Frontend
├── app/             ← Backend (NOVÝ priečinok)
└── app/modules      ← Node dependencies (budú tu)
```

---

## 📁 KROK 4: Navaž Frontend

### 4a. Nahraj frontend do public_html/
1. Skopíruj **všetko** z `client/dist/`:
   ```
   Z: c:\Users\micha\Desktop\palostranka-project\palostranka\client\dist\
   Do: /public_html/  (na WebSupport)
   ```

2. Súbory ktoré majú skončiť v `/public_html/`:
   ```
   /public_html/
   ├── index.html
   ├── robots.txt
   ├── manifest.json
   ├── _redirects       ← DÔLEŽITÉ pre routing
   └── assets/
       ├── *.css
       └── *.js
   ```

### 4b. Overenie
Po nahratí skontroluj, že sú súbory na mieste:
- Otvor v prehliadači: `http://www.your-domain.sk` (bez /public_html/)
- Mal by si vidieť loading alebo React app

---

## 🛠️ KROK 5: Navaž Backend

### 5a. Nahraj backend do /app/
1. Skopíruj **všetko** z `server/`:
   ```
   Z: c:\Users\micha\Desktop\palostranka-project\palostranka\server\
   Do: /app/  (na WebSupport)
   ```

2. Súbory ktoré majú skončiť v `/app/`:
   ```
   /app/
   ├── index.js
   ├── package.json
   ├── .env             ← S MongoDB URI
   ├── models/
   │   ├── hero.js
   │   ├── page.js
   │   ├── user.js
   │   ├── categoryHeroes.js
   │   └── links.js
   ├── uploads/         ← Pre budúce uploady
   └── node_modules/    ← Budú sa vytvoriť pri npm install
   ```

### 5b. Zisti absolútnu cestu
- Na WebSupport niektoré príkazy potrebujú **absolútnu cestu**
- Skontroluj v FTP: `/app/` = aká je úplná cesta?
- Príklad: `/chroot/home/xxxxx/public_html/app/`

---

## 🔧 KROK 6: Inštalácia Dependencies a Start Servera

### 6a. Pripoj sa cez SSH (alebo WebSupport Terminal)
1. Otvor príkazový riadok / Terminal
2. Prihlás sa na WebSupport cez SSH:
   ```powershell
   ssh [tvoj-username]@[websupport-hostname]
   ```

3. Prejdi na backend priečinok:
   ```bash
   cd /app
   ```

### 6b. Inštalácia Node packages
```bash
npm install
```

### 6c. Spustenie servera
**Možnosť A: Manuálne spustenie (TEST)**
```bash
node index.js
```

**Možnosť B: Spustenie cez PM2 (ODPORÚČANÉ - 24/7)**
```bash
npm install -g pm2                    # Inštalácia PM2 (jedenkrát)
pm2 start index.js --name "palostranka"
pm2 startup                           # Automatický start po reštarte
pm2 save
```

### 6d. Overenie
Server by mal bežať na porte (zvyčajne 5000 alebo 3000):
```bash
curl http://localhost:5000/
```

Mal by si dostať odpoveď: `{"status":"ok","message":"Server is running"}`

---

## 🌍 KROK 7: Prípojenie doménu k Backend Serveru

### 7a. Reverse Proxy Konfigurácia

WebSupport Smart môže mať **reverse proxy** alebo **rewrite rules**.

**Variant 1: Ak máš reverse proxy v WebSupport**
1. V admin panele hľadaj "Reverse Proxy" alebo "URL Rewrite"
2. Nastav:
   ```
   Request: /api/*
   Forward to: http://localhost:5000/api/*
   ```

**Variant 2: Ak máš vlastnú doménu pre backend**
1. Vytvor subdomain: `api.palostranka.sk`
2. Nastav ho aby pointeroval na localhost:5000 (reverse proxy)

### 7b. Kontrola Konfigov

Ak máš cca 30 minút, skontroluj či funguje:
```
Frontend (React):  http://www.palostranka.sk
Backend API:       http://www.palostranka.sk/api/hero
                   http://www.palostranka.sk/api/pages
```

---

## 📋 KROK 8: Overenie Fungovania

### 8a. Frontend Test
```
1. Otvor https://www.palostranka.sk
2. Skontroluj či sa načítava
3. Prejdi na všetky stránky (Home, O mne, Projekty)
```

### 8b. Backend Test - API
```
1. Otvor v prehliadači: https://www.palostranka.sk/api/hero
   Mali by si vidieť JSON s hero dátami

2. Skontroluj admin panel: https://www.palostranka.sk/admin
   Mali by si vidieť login formulár
```

### 8c. Admin Login Test
```
1. Prihlás sa s heslom: pavelp137
2. Skúsi zmeniť nejaký text
3. Skúsi zmeniť obrázok URL
4. Klikni "Uložiť" a skontroluj či sa zmeny uložili
```

### 8d. Databáza Test
Ak sa zmeny uložili, databáza funguje ✅

---

## 🐛 Riešenie Problémov

### Problem: "Cannot GET /"
**Príčina:** Frontend súbory nie sú v `/public_html/`
**Riešenie:** Skontroluj či sú ALL súbory z `dist/` nahrané

### Problem: API vráti 404
**Príčina:** Backend nebeží alebo reverse proxy nie je nastavená
**Riešenie:** 
```bash
# SSH na WebSupport
ps aux | grep node        # Zisti či beží Node.js
pm2 status               # Ak máš PM2
```

### Problem: MongoDB nedostupná
**Príčina:** .env nemá správnu MongoDB connection string
**Riešenie:**
```bash
# Zisti správny MongoDB URI z MongoDB Atlas
# Skontroluj v .env:
cat .env
```

### Problem: Port 5000 je obsadený
**Riešenie:** Zmeniť port v `server/index.js` a v `.env`
```javascript
const PORT = process.env.PORT || 3000;  // Skús iný port
```

---

## 💾 BACKUP & ÚDRŽBA

### Regular Backups
```bash
# Zálohuj database (MongoDB Atlas backups sú automatické)
# Zálohuj /app/uploads ak máš tam lokálne súbory
```

### Log Files
```bash
# Ak máš PM2:
pm2 logs
pm2 logs palostranka

# Výstup aj v /app/logs/ (ak je nastavené)
```

---

## 🚀 Ako updaťovať aplikáciu neskôr

1. Zmeny v **code** (React alebo Node):
   ```bash
   # Na lokálnom PC
   npm run build                          # Frontend
   # Skopíruj dist/ na WebSupport /public_html/
   
   # Backend - skopíruj nový code na WebSupport /app/
   ssh ...
   cd /app
   npm install  (ak sú nové dependencies)
   pm2 restart palostranka
   ```

2. Zmeny v **admin paneli** (texty, obrázky):
   ```
   Jednoducho v admin paneli zmeniť údaje
   Zmeny sa uložia do MongoDB automaticky ✅
   ```

---

## 📞 Kontakty

- **WebSupport Support:** https://support.websupport.sk
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **Tvoj projekt:** c:\Users\micha\Desktop\palostranka-project\palostranka

---

## ✅ CHECKLIST PRED DEPLOYMENT

- [ ] React build vytvorený (`npm run build` ✅)
- [ ] .env súbor má MongoDB URI
- [ ] .env súbor má ADMIN_PASSWORD (pavelp137)
- [ ] Server index.js servíruje frontend
- [ ] API_BASE_URL v client/api.js je nastavené na '' (same domain)
- [ ] Všetky git zmeny committed
- [ ] WebSupport Smart hosting aktivovaný
- [ ] FTP prístupy zistené
- [ ] Doména vytvorená/nastavená
- [ ] SSH/Terminal prístup k serveru k dispozícii

---

**Ak máš otázky počas nasadenia:**
1. Pozri sekciu "Riešenie Problémov"
2. Skontroluj logs cez `pm2 logs`
3. Skontroluj .env premenné
4. Kontaktuj WebSupport support

**Hotový projekt je v:** `c:\Users\micha\Desktop\palostranka-project\palostranka`

🎉 **Ľahký deployment!**
