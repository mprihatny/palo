const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  title: String,
  slug: String,
  content: String,
  category: String,
  type: { type: String, default: 'Knihy' }
}, { timestamps: true });

module.exports = mongoose.model('Page', PageSchema);
