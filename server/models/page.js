const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  title: String,
  slug: String,
  content: String,
  category: String
}, { timestamps: true });

module.exports = mongoose.model('Page', PageSchema);
