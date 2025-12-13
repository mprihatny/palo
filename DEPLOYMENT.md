# Deployment Guide - palostranka

## 🚀 Railway (Backend)

### Postup:
1. Choď na https://railway.app
2. Prihlás sa s GitHub (tajxd)
3. Klikni "New Project" → "Deploy from GitHub repo"
4. Vyber `palo` repo
5. Vyber **root directory**: `server`
6. Klikni "Create Service"

### Environment Variables na Railway:
V sekcii "Variables" pridaj:
```
MONGO_URI=mongodb+srv://marekkorentskyy_db_user:JcxaDxcF3nlx24KU@cluster0.jo7mbsn.mongodb.net/?appName=Cluster0
PORT=5000
NODE_ENV=production
```

### Po deploymente:
- Railway ti vygeneruje URL (napr. `https://palostranka-production.up.railway.app`)
- **Skopíruj si túto URL** - potrebuješ ju pre Vercel!

---

## 🎨 Vercel (Frontend)

### Postup:
1. Choď na https://vercel.com
2. Prihlás sa s GitHub (tajxd)
3. Klikni "Add New" → "Project"
4. Importuj `palo` repo
5. V "Project Settings":
   - **Framework**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Environment Variables na Vercel:
Pridaj premennú:
```
VITE_API_URL=https://YOUR_RAILWAY_URL_HERE
```

Nahraď `YOUR_RAILWAY_URL_HERE` s tvojou Railway URL z kroku vyššie!

### Príklad:
```
VITE_API_URL=https://palostranka-production.up.railway.app
```

### Deploy:
Klikni "Deploy" a čakaj ~2 minúty ✅

---

## 📝 Súhrn - POST-DEPLOYMENT CHECKLIST

- [ ] Railway je deploynutý
- [ ] Máš Railway URL
- [ ] Vercel má správnu VITE_API_URL
- [ ] Vercel je deploynutý
- [ ] Frontend sa načítava
- [ ] API requesty fungujú (Admin panel, Upload obrázkov)

---

## 🔗 Finálne URLs

Keď je všetko hotovo, budeš mať:
- **Frontend**: `https://palo.vercel.app` (alebo tvoje custom domain)
- **Backend API**: `https://palostranka-production.up.railway.app`

---

## ⚠️ Problémy?

**Backend nefunguje:**
- Skontroluj MONGO_URI na Railway (Logs → Variables)
- Skontroluj že MongoDB cluster je online

**Frontend sa nenačítava:**
- Skontroluj Build Logs na Vercel
- Overifi VITE_API_URL

**API requesty zlyhávajú:**
- Otvor Console (F12) na frontende a pozri Network tab
- Skontroluj že VITE_API_URL je správna
