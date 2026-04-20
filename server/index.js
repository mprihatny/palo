const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Hero = require('./models/hero');
const Page = require('./models/page');

const app = express();
app.use(cors());
app.use(express.json());

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

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file' });
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

const MONGO_URI = process.env.MONGO_URI || '';
if (!MONGO_URI) {
  console.warn('Warning: MONGO_URI not set, server will try to start but DB will not be connected. Set MONGO_URI in .env');
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.warn('MongoDB connection error:', err.message);
});

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Hero endpoints
app.get('/api/hero', async (req, res) => {
  const hero = await Hero.findOne();
  res.json(hero || {});
});

app.put('/api/hero', async (req, res) => {
  const data = req.body;
  let hero = await Hero.findOne();
  if (!hero) hero = new Hero(data);
  else Object.assign(hero, data);
  await hero.save();
  res.json(hero);
});

// Pages endpoints
app.get('/api/pages', async (req, res) => {
  const pages = await Page.find().sort({ createdAt: -1 });
  res.json(pages);
});

app.post('/api/pages', async (req, res) => {
  const page = new Page(req.body);
  await page.save();
  res.json(page);
});

app.get('/api/pages/:id', async (req, res) => {
  const page = await Page.findById(req.params.id);
  if (!page) return res.status(404).json({ message: 'Not found' });
  res.json(page);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
