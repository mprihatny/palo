const mongoose = require('mongoose');

const LinksSchema = new mongoose.Schema({
  links: [
    {
      title: { type: String, default: '' },
      url: { type: String, default: '' },
      description: { type: String, default: '' },
      icon: { type: String, default: '' }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Links', LinksSchema);
