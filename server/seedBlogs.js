import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Content from './models/Content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/redash';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Read the static JSON file
    const blogsPath = path.join(__dirname, '../client/src/data/entertainmentBlogs.json');
    const blogsData = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));
    
    // Find the entertainment document
    let entDoc = await Content.findOne({ key: 'entertainment' });
    
    if (entDoc) {
      // Find blogs that have numeric IDs and remove them
      if (entDoc.data.blogs) {
        entDoc.data.blogs = entDoc.data.blogs.filter(b => typeof b.id !== 'number');
        
        // Use markModified since we are changing a Mixed type object in Mongoose
        entDoc.markModified('data');
        await entDoc.save();
        console.log(`Successfully cleared static blogs from the entertainment document.`);
      }
    }
    
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error:', err);
    mongoose.connection.close();
  });
