const fs = require('fs');
const path = 'd:/Meraki Movies/Redash.in/Final RedAsh Project/src/data/enterpriseVideos.js';
let content = fs.readFileSync(path, 'utf8');

const map = {
  'TV/Digital Ads': 'AD FILMS',
  'Podcast': 'PODCASTS',
  'Corporate AVs': 'BRAND FILMS',
  'Animated Explainers': 'ANIMATED EXPLAINERS',
  'L&D Training Films': 'L&D TRAINING FILMS',
  'AI Videos': 'AI VIDEOS',
  'Short Films': 'SHORT FILMS',
  'Any Creative Films': 'ANY CREATIVE FILMS'
};

for (const [oldCat, newCat] of Object.entries(map)) {
    content = content.split(`category: "${oldCat}"`).join(`category: "${newCat}"`);
}

fs.writeFileSync(path, content, 'utf8');
console.log('Modified enterpriseVideos.js successfully');
