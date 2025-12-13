# PaloStranka — Local dev instructions

This repository contains a minimal full-stack starter for your requested site: an Express server (MongoDB) and a React client (Vite).

Important: put your real Mongo URI in `server/.env` as `MONGO_URI` (do NOT commit a production credential).

Quick start (PowerShell):

1) Install dependencies for server and client

```powershell
cd c:\Users\micha\Desktop\palostranka\server; npm install
cd ..\client; npm install
```

2) Create `.env` in `server/` (example in `.env.example`). Set your Mongo URI there, for example:

```
MONGO_URI="mongodb+srv://marekkorentskyy_db_user:JcxaDxcF3nlx24KU@cluster0.wbcxnrh.mongodb.net/mydb?retryWrites=true&w=majority"
PORT=5000
```

3) Run server and client (two separate terminals):

Server terminal:
```powershell
cd c:\Users\micha\Desktop\palostranka\server
npm run dev
```

Client terminal:
```powershell
cd c:\Users\micha\Desktop\palostranka\client
npm run dev
```

4) Open the client (Vite) URL printed in the terminal (usually `http://localhost:5173`) and the server runs at `http://localhost:5000`.

What I scaffolded:
- `server/` — Express + Mongoose, endpoints `/api/hero` and `/api/pages`.
- `client/` — Vite + React with Home, Projects and Admin pages. Admin allows editing hero text & style and adding project pages.

Notes & next steps:
- Secure the admin routes with authentication before deploying.
- Consider using environment variables and secrets manager for production.
- I left a placeholder mailto in the footer; you can change it in `client/src/components/Footer.jsx`.
