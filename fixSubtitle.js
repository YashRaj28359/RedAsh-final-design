import mongoose from 'mongoose';
import Content from './server/models/Content.js';

const MONGO_URI = 'mongodb://localhost:27017/redash';

async function fix() {
  await mongoose.connect(MONGO_URI);
  const doc = await Content.findOne({ key: 'entertainment' });
  if (doc && doc.data && doc.data.mediaConfig) {
    doc.data.mediaConfig.subtitle = 'Featured news articles on RedAsh Films';
    await Content.updateOne({ key: 'entertainment' }, { data: doc.data });
    console.log('Fixed mediaConfig subtitle');
  } else {
    console.log('No mediaConfig found, creating it');
    if (doc) {
        if (!doc.data) doc.data = {};
        doc.data.mediaConfig = { subtitle: 'Featured news articles on RedAsh Films' };
        await Content.updateOne({ key: 'entertainment' }, { data: doc.data });
    }
  }
  mongoose.disconnect();
}
fix();
