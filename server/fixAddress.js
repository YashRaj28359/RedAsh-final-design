import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/redash';

const contentSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  data: { type: mongoose.Schema.Types.Mixed, default: {} }
});

const Content = mongoose.models.Content || mongoose.model('Content', contentSchema);

async function fixAddress() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');
    const allContent = await Content.find({});
    
    let updated = false;
    for (let doc of allContent) {
      let dataString = JSON.stringify(doc.data);
      if (dataString.includes('1101, Peninsula Park')) {
        dataString = dataString.replace(/1101, Peninsula Park/g, '1302-1305, Peninsula Park');
        doc.data = JSON.parse(dataString);
        await doc.save();
        updated = true;
        console.log(`Updated document type: ${doc.type}`);
      }
    }
    
    if (!updated) {
      console.log('No documents needed updating.');
    } else {
      console.log('Successfully updated all addresses in the database.');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from DB');
  }
}

fixAddress();
