const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Yash:dYQS9imycdkqhBc0@cluster0.wp8rmxv.mongodb.net/redashfilms';
const faviconUrl = '/uploads/1789710577550-283261634-R-RedAsh-picktorial-white.jpg';

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const seoDoc = await mongoose.connection.db.collection('contents').findOne({ key: 'seo' });
  const data = seoDoc?.data || {};

  data.globalFavicon = faviconUrl;
  if (data.main) data.main.favicon = faviconUrl;
  if (data.films) data.films.favicon = faviconUrl;
  if (data.agency) data.agency.favicon = faviconUrl;
  if (data.global) data.global.favicon = faviconUrl;

  await mongoose.connection.db.collection('contents').updateOne(
    { key: 'seo' },
    { $set: { data: data } },
    { upsert: true }
  );

  console.log('Successfully updated globalFavicon in MongoDB SEO record!');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
