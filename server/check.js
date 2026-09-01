import mongoose from 'mongoose';
import Content from './models/Content.js';

mongoose.connect('mongodb://127.0.0.1:27017/redash')
  .then(async () => {
    const docs = await Content.find({});
    console.log(JSON.stringify(docs, null, 2));
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
