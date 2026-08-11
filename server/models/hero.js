const mongoose = require('mongoose');

const HeroSchema = new mongoose.Schema({
  title: { type: String, default: 'Welcome' },
  subtitle: { type: String, default: '' },
  style: {
    color: { type: String, default: '#000' },
    fontWeight: { type: String, default: '400' },
    fontSize: { type: String, default: '48px' }
  },
  quote: { type: String, default: 'Priestor na krátky text/citáciu' },
  quoteColor: { type: String, default: '#931413' },
  quoteWeight: { type: String, default: '400' },
  quoteBorder: { type: Boolean, default: true },
  quoteBorderColor: { type: String, default: '#D4945F' },
  aboutText: { type: String, default: 'Vitajte na mojej stránke. Tu nájdete moje diela, preklady francúzskych kapucínskych autorov a ďalší obsah, ktorý som pripravil pre duchovné povzbudenie a rast.' },
  heroImage: { type: String, default: '' },
  youtubeImage: { type: String, default: '' },
  youtubeUrl: { type: String, default: '' },
  youtubeHeading: { type: String, default: 'Sleduj nás na YouTube' },
  youtubeText: { type: String, default: 'Nové videá, autorské texty a preklady sú pravidelne zdieľané na kanáli thepavolp. Klikni na link nižšie a pozri si posledné príspevky.' },
  youtubeButtonText: { type: String, default: 'Pozrieť YouTube kanál' },
  youtubeButtonUrl: { type: String, default: 'https://www.youtube.com/@thepavolp' },
  youtubeAdsImage: { type: String, default: 'https://i.postimg.cc/GhWQcpFw/image-removebg-preview.png' },
  youtubeAdsUrl: { type: String, default: '' },
  youtubeAdsText: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Hero', HeroSchema);
