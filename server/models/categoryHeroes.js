const mongoose = require('mongoose');

const CategoryHeroesSchema = new mongoose.Schema({
  autorske: {
    image: { type: String, default: 'https://i.postimg.cc/Tw90WwCF/autorske-foto.jpg' },
    title: { type: String, default: 'Autorské texty' }
  },
  preklady: {
    image: { type: String, default: 'https://i.postimg.cc/DZg6bZBD/preklady-foto.jpg' },
    title: { type: String, default: 'Preklady' }
  },
  pripravovane: {
    image: { type: String, default: 'https://i.postimg.cc/150Sg2Tx/pripravovane-foto-(1).jpg' },
    title: { type: String, default: 'Pripravované' }
  }
}, { timestamps: true });

module.exports = mongoose.model('CategoryHeroes', CategoryHeroesSchema);
