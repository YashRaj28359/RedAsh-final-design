import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Content from './models/Content.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    let doc = await Content.findOne({ key: 'homepage' });
    if (doc && doc.data.mediaCards) {
      doc.data.mediaCards.forEach((c, i) => {
        c.showOnHomepage = (i < 3); // Check only first 3
      });
      doc.markModified('data');
      await doc.save();
      console.log('✅ Fixed showOnHomepage flags in DB! Only the first 3 are checked.');
    }
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
