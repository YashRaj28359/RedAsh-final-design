import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Content from './models/Content.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB!");
    
    const docs = await Content.find();
    let updatedCount = 0;

    for (let doc of docs) {
      let data = doc.data;
      if (!data) continue;

      let changed = false;
      let dataString = JSON.stringify(data);

      // 1. Replace http://localhost:5000 with https://redash-final-design.onrender.com
      if (dataString.includes('http://localhost:5000')) {
        dataString = dataString.replace(/http:\/\/localhost:5000/g, 'https://redash-final-design.onrender.com');
        changed = true;
      }

      // 2. Replace http://localhost:5173 with empty string
      if (dataString.includes('http://localhost:5173')) {
        dataString = dataString.replace(/http:\/\/localhost:5173/g, '');
        changed = true;
      }

      // 3. Replace any /@fs/... paths with empty string
      const fsRegex = /\/@fs\/[^",]+/g;
      if (fsRegex.test(dataString)) {
        dataString = dataString.replace(fsRegex, '');
        changed = true;
      }

      data = JSON.parse(dataString);

      // 4. Specific fix for agency.globalClients:
      // If globalClients exists and has empty or broken img strings, remove globalClients key
      // so both admin and client use the default pristine 24 client logos
      if (doc.key === 'agency' && data.globalClients) {
        const hasValidCustomLogos = data.globalClients.some(c => c && c.img && c.img.startsWith('http'));
        if (!hasValidCustomLogos) {
          console.log("Removing broken agency.globalClients so default logos are used");
          delete data.globalClients;
          changed = true;
        }
      }

      // 5. Specific fix for agency.whatsRedHot:
      // If items have empty images, delete the field or let frontend fallback
      if (doc.key === 'agency' && Array.isArray(data.whatsRedHot)) {
        data.whatsRedHot.forEach(item => {
          if (item.image === '' || item.image?.includes('/@fs/')) {
            item.image = '';
          }
        });
      }

      // 6. Specific fix for agency.caseStudies:
      if (doc.key === 'agency' && Array.isArray(data.caseStudies)) {
        data.caseStudies.forEach(item => {
          if (item.image?.includes('/@fs/') || item.image?.includes('localhost')) {
            item.image = '';
          }
        });
      }

      if (changed) {
        doc.data = data;
        doc.markModified('data');
        await doc.save();
        updatedCount++;
        console.log(`Successfully cleaned document: ${doc.key}`);
      }
    }
    
    console.log(`Done. Cleaned ${updatedCount} documents in MongoDB.`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
