import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://Yash:dYQS9imycdkqhBc0@cluster0.wp8rmxv.mongodb.net/redashfilms';

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to DB');
  const contents = await mongoose.connection.db.collection('contents').find().toArray();
  for (const item of contents) {
    let jsonStr = JSON.stringify(item.data);
    if (jsonStr.includes('https://redash-final-design.onrender.comhttps://') || jsonStr.includes('http://localhost:5000http')) {
      console.log('Found duplicated URL in key:', item.key);
      jsonStr = jsonStr.replace(/https:\/\/redash-final-design\.onrender\.comhttps:\/\//g, 'https://');
      jsonStr = jsonStr.replace(/http:\/\/localhost:5000(?=http)/g, '');
      const cleanedData = JSON.parse(jsonStr);
      await mongoose.connection.db.collection('contents').updateOne(
        { key: item.key },
        { $set: { data: cleanedData } }
      );
      console.log('Cleaned key:', item.key);
    }
  }
  console.log('DB cleanup finished.');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
