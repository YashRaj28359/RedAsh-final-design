import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://Yash:dYQS9imycdkqhBc0@cluster0.wp8rmxv.mongodb.net/redashfilms';

async function run() {
  await mongoose.connect(MONGO_URI);
  const ent = await mongoose.connection.db.collection('contents').findOne({ key: 'entertainment' });
  const row2 = ent.data?.featuredCelebs?.row2 || [];
  const afdItem = row2.find(x => x.img && x.img.startsWith('data:'));
  if (afdItem) {
    console.log('Found base64 celebrity item');
    const base64Data = afdItem.img.split(',')[1];
    const mimeMatch = afdItem.img.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    const ext = (mimeMatch && mimeMatch[1] === 'image/jpeg') ? '.jpg' : '.png';
    const buffer = Buffer.from(base64Data, 'base64');
    
    const blob = new Blob([buffer], { type: mimeMatch ? mimeMatch[1] : 'image/png' });
    const form = new FormData();
    form.append('image', blob, 'celebrity-custom' + ext);
    const res = await fetch('https://redash-final-design.onrender.com/api/upload', {
      method: 'POST',
      body: form
    });
    const uploadData = await res.json();
    console.log('Uploaded to Render:', uploadData);
    if (uploadData.url) {
      afdItem.img = uploadData.url;
      await mongoose.connection.db.collection('contents').updateOne(
        { key: 'entertainment' },
        { $set: { 'data.featuredCelebs.row2': row2 } }
      );
      console.log('Successfully updated DB with proper URL!');
    }
  } else {
    console.log('No base64 item found');
  }
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
