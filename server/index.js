const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Hero = require('./models/hero');
const Page = require('./models/page');
const Links = require('./models/links');
const CategoryHeroes = require('./models/categoryHeroes');

const app = express();
app.use(cors());
app.use(express.json());

// ===== AUTHENTICATION SETUP =====
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'pavelp137';

const verifyAdminToken = (req, res, next) => {
  const token = req.headers['x-admin-token'];
  if (!token || token !== `admin_${ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// serve uploaded files
app.use('/uploads', express.static(__dirname + '/uploads'));

// file upload support
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, uploadDir); },
  filename: function (req, file, cb) { cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-')); }
});
const upload = multer({ storage });

app.post('/api/upload', verifyAdminToken, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file' });
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

const MONGO_URI = (process.env.MONGO_URI || process.env.MONGODB_URI || '').trim();
if (!MONGO_URI) {
} else {
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
}).catch(err => {
});

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Hero endpoints
app.get('/api/hero', async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json(hero || {});
  } catch (err) {
    res.status(500).json({ error: 'Failed to load hero data' });
  }
});

app.put('/api/hero', verifyAdminToken, async (req, res) => {
  try {
    const data = req.body;
    let hero = await Hero.findOne();
    if (!hero) hero = new Hero(data);
    else Object.assign(hero, data);
    await hero.save();
    res.json(hero);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save hero data' });
  }
});

// Pages endpoints
app.get('/api/pages', async (req, res) => {
  const pages = await Page.find().sort({ createdAt: -1 });
  res.json(pages);
});

app.post('/api/pages', verifyAdminToken, async (req, res) => {
  const page = new Page(req.body);
  await page.save();
  res.json(page);
});

app.get('/api/pages/:id', async (req, res) => {
  const page = await Page.findById(req.params.id);
  if (!page) return res.status(404).json({ message: 'Not found' });
  res.json(page);
});

app.put('/api/pages/:id', verifyAdminToken, async (req, res) => {
  const page = await Page.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!page) return res.status(404).json({ message: 'Not found' });
  res.json(page);
});

app.delete('/api/pages/:id', verifyAdminToken, async (req, res) => {
  const page = await Page.findByIdAndDelete(req.params.id);
  if (!page) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
});

// Links endpoints
app.get('/api/links', async (req, res) => {
  let links = await Links.findOne();
  if (!links) {
    // Create with default links if none exist
    links = new Links({ 
      links: [
        { title: 'Kapucín Slovensko', url: 'https://kapucini.sk', description: 'Webová stránka Kapucínskej komunity na Slovensku', icon: '' },
        { title: 'Vatikán', url: 'https://www.vatican.va', description: 'Oficiálna webová stránka Vatikánu', icon: '' },
        { title: 'Bibliacech', url: 'https://bibliacech.sk', description: 'Bibliografia českých a slovenských kapucínov', icon: '' }
      ]
    });
    await links.save();
  }
  res.json(links);
});

app.put('/api/links', verifyAdminToken, async (req, res) => {
  let links = await Links.findOne();
  if (!links) links = new Links(req.body);
  else Object.assign(links, req.body);
  await links.save();
  res.json(links);
});

// Category Heroes endpoints
app.get('/api/category-heroes', async (req, res) => {
  let heroes = await CategoryHeroes.findOne();
  if (!heroes) {
    heroes = new CategoryHeroes({
      autorske: { image: 'https://i.postimg.cc/Tw90WwCF/autorske-foto.jpg', title: 'Autorské texty' },
      preklady: { image: 'https://i.postimg.cc/DZg6bZBD/preklady-foto.jpg', title: 'Preklady' },
      pripravovane: { image: 'https://i.postimg.cc/150Sg2Tx/pripravovane-foto-(1).jpg', title: 'Pripravované' }
    });
    await heroes.save();
  } else {
    // Ensure images are always up-to-date
    heroes.autorske.image = 'https://i.postimg.cc/Tw90WwCF/autorske-foto.jpg';
    heroes.preklady.image = 'https://i.postimg.cc/DZg6bZBD/preklady-foto.jpg';
    heroes.pripravovane.image = 'https://i.postimg.cc/150Sg2Tx/pripravovane-foto-(1).jpg';
    await heroes.save();
  }
  res.json(heroes);
});

app.put('/api/category-heroes', verifyAdminToken, async (req, res) => {
  let heroes = await CategoryHeroes.findOne();
  if (!heroes) heroes = new CategoryHeroes(req.body);
  else Object.assign(heroes, req.body);
  await heroes.save();
  res.json(heroes);
});

// Admin login endpoint
app.post('/api/admin-login', (req, res) => {
  const { password } = req.body;
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Incorrect password' });
  }
  res.json({ token: `admin_${ADMIN_PASSWORD}`, message: 'Authenticated' });
});

// Cleanup endpoint - clear old upload-based heroImages from database
app.post('/api/cleanup-hero-images', async (req, res) => {
  try {
    const hero = await Hero.findOne();
    if (hero && hero.heroImage && hero.heroImage.includes('/uploads/')) {
      hero.heroImage = '';
      await hero.save();
      res.json({ message: 'Cleared old uploads from heroImage', hero });
    } else {
      res.json({ message: 'No cleanup needed', hero });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve React frontend (production build)
// On WebSupport: __dirname is /home/prihatny.sk/app/, so:
// - '../client/dist' would be /home/prihatny.sk/client/dist
// - '../../web' would be /home/prihatny.sk/web (Apache root)
// Using Apache root path for WebSupport hosting
app.use(express.static(path.join(__dirname, '../../web')));

// Fallback to index.html for React Router
app.get('*', (req, res) => {
  if (!req.url.startsWith('/api/') && !req.url.startsWith('/uploads/')) {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {});
