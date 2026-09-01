import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import Content from './models/Content.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const mediaData = JSON.parse(
  readFileSync(resolve(__dirname, '../client/src/data/media.json'), 'utf8')
);

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB!");
    
    let doc = await Content.findOne({ key: 'homepage' });
    if (!doc) {
      doc = new Content({ key: 'homepage', data: {} });
    }

    // Convert local image paths to full URLs for the admin panel
    const mediaCards = mediaData.map(item => ({
      id: item.id,
      source: item.source,
      title: item.title,
      description: item.description,
      url: item.url,
      image: item.image, // Keep the local path for now
      showOnHomepage: true,
      zoom: item.zoom || 0,
      moveUp: item.moveUp || 0,
      moveDown: item.moveDown || 0,
      moveLeft: item.moveLeft || 0,
      moveRight: item.moveRight || 0
    }));

    doc.data.mediaCards = mediaCards;
    doc.markModified('data');
    await doc.save();
    
    console.log(`Seeded ${mediaCards.length} media cards into MongoDB!`);
    mediaCards.forEach((c, i) => console.log(`  ${i + 1}. ${c.source}: ${c.title.substring(0, 50)}...`));
    
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
