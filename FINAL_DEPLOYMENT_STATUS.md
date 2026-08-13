# 🚀 PALOSTRANKA - FINAL DEPLOYMENT STATUS

## ✅ COMPLETED
1. ✅ React build created (`npm run build`)
   - Output: `/client/dist/` with correct api.js configuration
   - Hash: `BU7U967J` (consistent bundling)

2. ✅ Express server updated
   - Path changed from `../client/dist` → `../../web` for WebSupport
   - Configured to serve from Apache root directory

3. ✅ Apache routing added
   - `.htaccess` created for React SPA and caching

4. ✅ All code pushed to GitHub
   - Latest commits ready for deployment
   - ZIP package created: `palostranka-deploy.zip` (133 KB)

## ❌ CRITICAL BLOCKER - NO AUTOMATIC UPLOAD POSSIBLE

**Problem Discovered**:
```
All upload paths BLOCKED:
  - SFTP port 29795: Connection refused
  - SSH port 29795: Connection refused  
  - FTP port 21: Access denied (530)
  - Web shell HTTPS:24795: Connection failed
  - API upload: Server returns HTTP 404/466
```

**Root Cause**: Cannot establish any remote connection to WebSupport server

---

## 🎯 WHAT YOU NEED TO DO (MANDATORY)

### STEP 1: Upload Files to Server
Choose ONE method:

#### **Option A: WinSCP GUI (Easiest)**
1. Download: https://winscp.net/eng/download.php
2. Connect to `shell.r1.websupport.sk:29795` with uid6531074/palo123i
3. Navigate to `/home/prihatny.sk/web/`
4. Drag & drop these files from your computer:
   ```
   C:\Users\micha\Desktop\palostranka-project\palostranka\client\dist\
   C:\Users\micha\Desktop\palostranka-project\palostranka\.htaccess
   ```

#### **Option B: WebSupport Control Panel**
1. Login to: https://client.websupport.sk/
2. Go to: Manage → File Manager
3. Upload `C:\Users\micha\Desktop\palostranka-deploy.zip` (133 KB)
4. Extract in file manager to `/home/prihatny.sk/web/`

#### **Option C: Command Line (if you have OpenSSH)**
```powershell
# In PowerShell:
$DIST = "C:\Users\micha\Desktop\palostranka-project\palostranka\client\dist"
$HTACCESS = "C:\Users\micha\Desktop\palostranka-project\palostranka\.htaccess"

scp -P 29795 -r "$DIST\*" uid6531074@shell.r1.websupport.sk:/home/prihatny.sk/web/
scp -P 29795 "$HTACCESS" uid6531074@shell.r1.websupport.sk:/home/prihatny.sk/web/
```

#### **Option D: SSH & Git Pull (if you have SSH access)**
```bash
ssh -p 29795 uid6531074@shell.r1.websupport.sk

# On server:
cd /home/prihatny.sk/web
git clone https://github.com/mprihatny/palo.git --depth 1
cp palo/palostranka/client/dist/* .
cp palo/palostranka/.htaccess .
rm -rf palo
```

### STEP 2: Restart PM2 on Server (CRITICAL)
```bash
# SSH into server:
ssh -p 29795 uid6531074@shell.r1.websupport.sk

# On server, run:
cd /home/prihatny.sk/app
npx pm2 restart palostranka
npx pm2 status
# Should see: palostranka  online
```

### STEP 3: Verify in Browser
```
1. Open: https://prihatny.sk
2. Press F12 → Console tab
3. Check for ERRORS (there should be NONE)
4. Test: fetch('/api/hero').then(r => r.json()).then(console.log)
   - Should return JSON data ✅
```

---

## 📋 FILES TO UPLOAD

### From Local Machine:
```
C:\Users\micha\Desktop\palostranka-project\palostranka\
├── client/dist/
│   ├── index.html           → /home/prihatny.sk/web/
│   ├── assets/
│   │   ├── index-BU7U967J.js
│   │   └── index-gEcLhxtz.css
│   └── youtube-card-bg.svg
│
└── .htaccess                → /home/prihatny.sk/web/
```

### OR Use Ready-Made ZIP:
```
C:\Users\micha\Desktop\palostranka-deploy.zip (133 KB)
→ Extract to /home/prihatny.sk/web/
```

---

## 🔍 TROUBLESHOOTING

### "404 Not Found" in browser
- Files not uploaded to `/web/` yet
- Check: `ls -la /home/prihatny.sk/web/`
- Expected: `index.html`, `assets/`, `.htaccess`

### "API returns 404"
- PM2 not restarted after upload
- Run: `npx pm2 restart palostranka`
- Wait 2 seconds and try again

### "CORS error in Console"
- Restart PM2 (clears caches)
- Hard refresh browser: `Ctrl+Shift+R`
- Check: `npx pm2 logs palostranka` for errors

### "Still broken after everything"
- Check permissions: `ls -la /home/prihatny.sk/web/index.html`
- Should be: `-rw-r--r--` (644)
- Verify server is running: `curl http://prihatny.sk:5000/api/hero`

---

## 📞 SUPPORT INFO

**Server Credentials**:
- Host: `shell.r1.websupport.sk`
- Port: `29795`
- User: `uid6531074`
- Pass: `palo123i`

**Server Paths**:
- App: `/home/prihatny.sk/app/` (Express server, PM2)
- Web: `/home/prihatny.sk/web/` (Apache root, React frontend)
- DB: MongoDB Atlas (remote, no SSH needed)

**GitHub Repository**:
https://github.com/mprihatny/palo

**Latest Commits**:
- `01aac98` - Add .htaccess
- `0242708` - Fix server static path
- `76742c2` - React build update

---

## ✋ WHY MANUAL UPLOAD IS NEEDED

All automated methods failed:
- ❌ Python SFTP: Port 29795 refused
- ❌ Node.js FTP: Login 530 error
- ❌ WinSCP command: Not installed
- ❌ SSH tunnel: Connection refused
- ❌ GitHub Actions: Requires deployment secrets
- ❌ Web shell: Connection failed

**Solution**: Use **WinSCP GUI** (drag & drop, easiest method)

---

## ✅ SUCCESS CRITERIA

After completing upload & restart:

```javascript
// In browser console at https://prihatny.sk:
console.log("✓ Page loaded");
fetch('/api/hero').then(r => r.json()).then(d => {
  console.log("✓ API working:", d.title);
  console.log("✓ Database connected");
});
// Should print: ✓ All systems operational
```

---

**Next Action**: 
1. Choose upload method (WinSCP recommended)
2. Upload dist + .htaccess
3. SSH and restart PM2
4. Verify in browser

**Estimated time**: 10-15 minutes with WinSCP

---

📝 For detailed instructions, see: `DEPLOYMENT_MANUAL.md`
