# 🚀 PALOSTRANKA - DEPLOYMENT CHECKLIST

## Nastavenie hotové ✅

### Frontend Build
- [x] React build vytvorený: `client/dist/`
- [x] API_BASE_URL nastavené na '' (same domain)
- [x] Vite config nastavený
- [x] CSS a JS assets sú v dist/

### Backend Nastavenie
- [x] Express server nastavený na port 5000
- [x] MongoDB connection v .env skonfigurovaná
- [x] CORS enabled
- [x] Multer pre file uploads nakonfigurovaný
- [x] Admin authentication nastavená
- [x] Frontend static serving nastavený (`app.use(express.static(...))`)
- [x] React Router fallback nastavený (catch-all route)

### Environment Variables
```
MONGODB_URI=mongodb+srv://Kapucin:palo123i@kapucin.x3oudev.mongodb.net/?appName=Kapucin
NODE_ENV=production
PORT=5000
ADMIN_PASSWORD=pavelp137
```

### Server Technológie
```
Node.js: v18+
Express: 4.18.2
MongoDB: 7.0.0 (Mongoose)
Multer: 1.4.4
CORS: 2.8.5
Dotenv: 16.0.0
```

### API Endpoints (dostupné po nasadení)
```
GET  /                                 ← Health check
GET  /api/hero                        ← Hlavný obsah
GET  /api/pages                       ← Strany
GET  /api/pages/:id                   ← Konkrétna stránka
GET  /api/category-heroes             ← Hero obrázky kategórií
GET  /api/links                       ← Links
POST /api/hero                        ← Uložiť hero
POST /api/category-heroes             ← Uložiť category heroes
POST /api/pages                       ← Nová stránka
POST /api/upload                      ← Upload súboru
POST /api/admin-login                 ← Admin prihlásenie
GET  /*                               ← React app fallback
```

### Súbory k Nahratiu

#### Na WebSupport /public_html/:
```
dist/
├── index.html
├── robots.txt
├── manifest.json
├── _redirects
└── assets/
    ├── *.css
    └── *.js
```

#### Na WebSupport /app/:
```
server/
├── index.js                 ← MAIN SERVER FILE
├── package.json
├── package-lock.json
├── .env                     ← DÔLEŽITÉ: s MongoDB URI
├── models/
│   ├── hero.js
│   ├── page.js
│   ├── user.js
│   ├── categoryHeroes.js
│   └── links.js
├── uploads/                 ← Priečinok pre budúce uploady
└── [node_modules sa vytvára cez `npm install`]
```

---

## Krok-za-krokom Nasadenie

### 1. FTP Upload Frontend
```
Skopíruj všetko z: c:\Users\micha\Desktop\palostranka-project\palostranka\client\dist\
Na: /public_html/  (na WebSupport)
```

### 2. FTP Upload Backend
```
Skopíruj všetko z: c:\Users\micha\Desktop\palostranka-project\palostranka\server\
Na: /app/  (na WebSupport)
```

### 3. SSH Pripojenie
```
ssh [username]@[websupport-hostname]
cd /app
npm install
```

### 4. Start Server
```
# Test:
node index.js

# Production (odporúčané):
npm install -g pm2
pm2 start index.js --name "palostranka"
pm2 startup
pm2 save
```

### 5. Reverse Proxy Setup
WebSupport admin panel → Nastaviť reverse proxy:
```
/api/* → http://localhost:5000/api/*
```

### 6. Test
```
Frontend: https://www.palostranka.sk
API:      https://www.palostranka.sk/api/hero
Admin:    https://www.palostranka.sk/admin (heslo: pavelp137)
```

---

## Lokálne Zdrojové Kódy

```
c:\Users\micha\Desktop\palostranka-project\palostranka\

├── client/
│   ├── dist/                ← Ready to upload (frontend build)
│   ├── src/
│   │   ├── api.js          ← API BASE URL config
│   │   ├── App.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Admin.jsx
│   │   │   ├── Omne.jsx
│   │   │   └── Projects.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ...
│   │   └── styles.css
│   ├── package.json
│   ├── vite.config.js
│   └── public/
│
├── server/
│   ├── index.js            ← Main server file (Ready to upload)
│   ├── package.json
│   ├── .env               ← Environment variables
│   ├── models/
│   │   ├── hero.js
│   │   ├── page.js
│   │   ├── user.js
│   │   ├── categoryHeroes.js
│   │   └── links.js
│   └── uploads/
│
└── WEBSUPPORT_DEPLOYMENT.md ← Detailný návod
```

---

## Aktuálne Stavy Kódov

### Server/index.js
- ✅ Servíruje frontend z `../client/dist/`
- ✅ Fallback route pre React Router: `app.get('*', ...)`
- ✅ Všetky API endpoints sú aktívne
- ✅ MongoDB connection skonfigurovaná
- ✅ CORS nastavené
- ✅ Multer upload nastavený

### Client/api.js
- ✅ API_BASE_URL = '' (v production)
- ✅ Bude automaticky používať rovnakú doménu ako frontend

### Client/styles.css
- ✅ Font system: Lora (200-700 weights)
- ✅ Všetka styling je prispôsobená

### Admin Panel
- ✅ Kategorietext s fontWeight:200 (ultra-tenké)
- ✅ Všetky obrázky ako URL-only inputs
- ✅ Single-click save button
- ✅ File previews odstránené (buggy)
- ✅ Upload buttons odstránené (netreba)

---

## MongoDB Atlas Status

```
✅ Prístup: Aktívny
✅ User: Kapucin
✅ Database: Kapucin
✅ Collections: hero, pages, users, categoryHeroes, links
✅ Backups: Automatické
✅ Connection String: V .env
```

---

## Bezpečnosť

### Admin Heslo
```
Heslo: pavelp137
Token format: admin_${ADMIN_PASSWORD}
Header: x-admin-token
Uložené v: sessionStorage (frontend)
```

### Upload Bezpečnosť
- [x] Multer skonfigurovaný s diskStorage
- [x] Súbory sa ukladajú do /uploads/
- [x] Admin token required

### CORS
- [x] Povolené pre všetky origins (produkčný build bude na rovnakej doméne)
- [x] Headers: application/json

---

## Performance

### Frontend Build
- Size: ~206KB (main JS gzipped: 61KB)
- Load time: < 2 sekúnd
- Optimized assets: CSS + JS minimalizované

### Backend
- Connection pool: Mongoose default
- MongoDB Atlas: Free tier (alebo paid)
- Memory: ~ 50-100MB (bez cached data)

---

## Post-Deployment

### Dokumentácia
Všetky kroky sú v: `WEBSUPPORT_DEPLOYMENT.md`

### Future Updates
1. Frontend zmeny → `npm run build` + FTP upload dist/
2. Backend zmeny → FTP upload server/ + `npm install` (ak sú deps zmeny) + `pm2 restart`
3. Data zmeny → Admin panel (uloženie do MongoDB)

### Monitoring
```bash
# PM2 Dashboard
pm2 monit

# Logs
pm2 logs palostranka

# Status
pm2 status
```

---

## Kontakty & Zdroje

- **Projekt:** c:\Users\micha\Desktop\palostranka-project\palostranka
- **WebSupport Admin:** https://admin.websupport.sk
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **PM2 Docs:** https://pm2.keymetrics.io/

---

**Status:** ✅ READY FOR WEBSUPPORT DEPLOYMENT

**Last Updated:** 2025-08-13
