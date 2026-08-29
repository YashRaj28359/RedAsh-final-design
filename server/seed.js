import mongoose from 'mongoose';
import Content from './models/Content.js';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/redash';

const initialContent = [
  {
    key: 'homepage',
    data: {
      hero: {
        film_heading: 'FILM PRODUCTION HOUSE',
        ampersand: '&',
        ad_heading: 'AD AGENCY',
        year_text: '2007',
        year_subtext: "IIT ENGINEER'S VENTURE",
      }
    }
  },
  {
    key: 'entertainment',
    data: {
      hero: {
        heading: 'ENTERTAINMENT FILMS',
        description: 'Award winning original content.'
      }
    }
  },
  {
    key: 'agency',
    data: {
      hero: {
        heading: 'REDASH AD AGENCY.',
        description: 'MARKETING CAMPAIGNS.'
      }
    }
  },
  {
    key: 'shared',
    data: {
      navigation: {
        home: 'Home',
        about: 'About',
        entertainment: 'Entertainment Films',
        blog: 'Blog',
        media: 'Media',
        contact: 'Contact'
      }
    }
  }
];

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');
    
    // Clear existing
    await Content.deleteMany({});
    
    // Insert new
    await Content.insertMany(initialContent);
    console.log('Database seeded successfully!');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
}

seedDB();
