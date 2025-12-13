const mongoose = require('mongoose');

const HeroSchema = new mongoose.Schema({
  title: { type: String, default: 'Welcome' },
  subtitle: { type: String, default: '' },
  style: {
    color: { type: String, default: '#000' },
    fontWeight: { type: String, default: '400' },
    fontSize: { type: String, default: '48px' }
  }
}, { timestamps: true });

module.exports = mongoose.model('Hero', HeroSchema);
