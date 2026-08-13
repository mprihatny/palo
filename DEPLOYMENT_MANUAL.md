# PALOSTRANKA DEPLOYMENT - MANUAL UPLOAD REQUIRED

## ⚠️ CURRENT STATUS
✅ Backend server: RUNNING (PM2 palostranka - PID 321)  
✅ React build: COMPLETED locally  
✅ All code: PUSHED to GitHub  
❌ **BLOCKERS**: All SSH/FTP/SFTP ports blocked on WebSupport

## 📦 WHAT YOU NEED TO UPLOAD

You need to upload these files to **`/home/prihatny.sk/web/`** on WebSupport:

```
Files from: C:\Users\micha\Desktop\palostranka-project\palostranka\
├── client/dist/
│   ├── index.html          (1 KB) - Main entry point
│   ├── assets/
│   │   ├── index-BU7U967J.js     (206 KB) - React app bundle
│   │   └── index-gEcLhxtz.css    (14 KB)  - Styles
│   └── youtube-card-bg.svg
│
└── .htaccess               (1 KB) - Apache routing for React SPA
```

**Total size**: ~221 KB (can be sent as ZIP)

## 🚀 UPLOAD OPTIONS (Choose ONE)

### Option A: WinSCP (Easiest - Recommended)

1. **Download WinSCP** from https://winscp.net/eng/download.php
2. **Connect to server**:
   - Hostname: `shell.r1.websupport.sk`
   - Port: `29795`
   - Username: `uid6531074`
   - Password: `palo123i`
   - Protocol: SSH

3. **Navigate to**: `/home/prihatny.sk/web/`

4. **Upload these files**:
   - From: `C:\Users\micha\Desktop\palostranka-project\palostranka\client\dist\*`
   - To: `/home/prihatny.sk/web/`
   
   - From: `C:\Users\micha\Desktop\palostranka-project\palostranka\.htaccess`
   - To: `/home/prihatny.sk/web/`

5. **Verify**: Should see `index.html`, `assets/` folder, and `.htaccess` in `/web/`

### Option B: PuTTY PSCP (Command Line)

1. **Download PuTTY** from https://www.putty.org/
2. **Run in PowerShell**:

```powershell
# Set paths
$DIST_DIR = "C:\Users\micha\Desktop\palostranka-project\palostranka\client\dist"
$HTACCESS = "C:\Users\micha\Desktop\palostranka-project\palostranka\.htaccess"
$REMOTE = "uid6531074@shell.r1.websupport.sk:/home/prihatny.sk/web/"

# Copy dist files
pscp -P 29795 -r "$DIST_DIR\*" $REMOTE
pscp -P 29795 "$HTACCESS" $REMOTE
```

### Option C: WebSupport File Manager (GUI)

1. **Login to WebSupport**: https://client.websupport.sk/
2. **Go to**: Manage → File Manager
3. **Navigate to**: `/home/prihatny.sk/web/`
4. **Upload**: 
   - ZIP file: `C:\Users\micha\Desktop\palostranka-deploy.zip` (133 KB)
   - Then extract it in file manager

### Option D: Manual scp (if you have Git Bash or Linux terminal)

```bash
cd C:\Users\micha\Desktop\palostranka-project\palostranka

# Upload dist folder
scp -P 29795 -r client/dist/* uid6531074@shell.r1.websupport.sk:/home/prihatny.sk/web/

# Upload .htaccess
scp -P 29795 .htaccess uid6531074@shell.r1.websupport.sk:/home/prihatny.sk/web/
```

## ✓ AFTER UPLOAD: RESTART SERVER

Once files are uploaded to `/home/prihatny.sk/web/`, you MUST restart PM2 on the server:

### Option 1: Via WebSupport SSH/Terminal (Recommended)
```bash
cd /home/prihatny.sk/app
npx pm2 restart palostranka
npx pm2 status
```

### Option 2: Via Backend API (if you have admin token)
```bash
curl -X POST \
  -H "x-admin-token: admin_pavelp137" \
  http://prihatny.sk/api/admin-login
```
(This just verifies auth - restart still needs SSH)

## 🧪 VERIFY DEPLOYMENT

After upload and restart:

1. **Open browser to**: https://prihatny.sk
2. **Press F12** to open Developer Console
3. **Check Network tab**:
   - Should see `index.html` (1 KB)
   - Should see `index-BU7U967J.js` (206 KB) - GREEN status
   - Should see `index-gEcLhxtz.css` (14 KB) - GREEN status
   - **NO RED errors** or CORS failures

4. **Check homepage**:
   - Hero section loads
   - Images display
   - Admin panel accessible
   - Admin login works

5. **Test API** (in browser console):
```javascript
fetch('/api/hero').then(r => r.json()).then(d => console.log(d))
```
Should return JSON object with hero data ✅

## 📋 DEPLOYMENT CHECKLIST

- [ ] Chose upload method (WinSCP recommended)
- [ ] Downloaded upload tool if needed
- [ ] Uploaded `/dist/` files to `/home/prihatny.sk/web/`
- [ ] Uploaded `.htaccess` to `/home/prihatny.sk/web/`
- [ ] SSH into server and ran `npx pm2 restart palostranka`
- [ ] Verified `/web/` directory contents (ls -la)
- [ ] Opened https://prihatny.sk in browser
- [ ] Checked F12 console - NO errors
- [ ] API test returned data (curl /api/hero)
- [ ] Admin panel login works
- [ ] All pages load correctly

## 🔧 TECHNICAL BACKGROUND

**Express Configuration** (already updated):
- Server at: `/home/prihatny.sk/app/index.js`
- Static files served from: `/home/prihatny.sk/web/` (via `../../web` relative path)
- React routing fallback: All non-API requests → `index.html`

**Apache Configuration** (in `.htaccess`):
- Rewrites all requests to `index.html` for React Router
- Preserves `/api/` and `/uploads/` paths for Express API
- Caches static assets (CSS, JS, images) for 1 year
- Gzip compression enabled

**Frontend Configuration** (in `client/src/api.js`):
- Production: Uses empty string `''` (same domain `prihatny.sk`)
- Development: Uses `http://localhost:5000`
- Already built and committed to GitHub

## 🆘 TROUBLESHOOTING

**"Cannot connect to SSH"**
- Use WinSCP GUI instead (no command line needed)
- Or use WebSupport File Manager: https://client.websupport.sk/

**"Files don't appear in browser"**
- Verify files uploaded to `/home/prihatny.sk/web/` (not `/web/` or other path)
- Check permissions: Should be `-rw-r--r--` (644) for files
- Run `ls -la /home/prihatny.sk/web/` to verify

**"Still getting CORS errors"**
- Old dist files might be cached - do hard refresh: `Ctrl+Shift+R`
- Check browser cache: DevTools → Network → Disable cache → reload
- Verify server restarted: `npx pm2 status` shows process "online"

**"Admin login not working"**
- Token format: `admin_pavelp137` (header: `x-admin-token`)
- Password: `pavelp137` (from server `.env`)
- If fails: Check server logs - `npx pm2 logs palostranka`

## 📞 GITHUB REFERENCE

All code ready for deployment at: https://github.com/mprihatny/palo

Latest commits:
- `01aac98` - Add .htaccess for React SPA routing
- `0242708` - Fix server static path to /web
- `76742c2` - Update React build

Download ready-to-upload ZIP: `C:\Users\micha\Desktop\palostranka-deploy.zip` (133 KB)

---

**Summary**: Upload `/dist/` + `.htaccess` to `/home/prihatny.sk/web/`, restart PM2, verify in browser. That's it! 🚀
