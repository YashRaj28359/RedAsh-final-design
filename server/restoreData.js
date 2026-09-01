import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Content from './models/Content.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB!");
    let doc = await Content.findOne({ key: 'homepage' });
    if (!doc) {
      doc = new Content({ key: 'homepage', data: {} });
    }
    
    // Restore Hero Section
    if (!doc.data.hero || !doc.data.hero.heading_blocks || doc.data.hero.heading_blocks.length === 0) {
      if (!doc.data.hero) doc.data.hero = {};
      doc.data.hero.heading_blocks = [
        { id: 1, text: 'FILM', subtext: 'PRODUCTION HOUSE', bg_image: '', subtext_color: '#ef4444' },
        { id: 2, text: '&', subtext: '', bg_image: '', subtext_color: '#ef4444' },
        { id: 3, text: 'AD', subtext: 'AGENCY', bg_image: '', subtext_color: '#3b82f6' },
        { id: 4, text: '2007', subtext: "IIT ENGINEER'S VENTURE", bg_image: '', subtext_color: '#6b7280' }
      ];
    }

    // Restore Divisions
    if (!doc.data.divisions) {
      doc.data.divisions = {
        entertainment: {
          title1: 'ENTERTAINMENT',
          title2: 'DIVISION',
          description: 'Contact us at info@redashfilms.com for end-to-end film production services and entertainment films, including',
          points: ['Theatrical Feature Films', 'Microdrama Shows', 'Music Videos', 'Web Shows', 'Short Films', 'AI Films'],
          buttonText: 'CLICK HERE',
          buttonLink: '/entertainment'
        },
        enterprise: {
          title1: 'ENTERPRISE',
          title2: 'DIVISION',
          description: 'Contact us at info@redashfilms.com for strategic ad agency services and enterprise films, including',
          points: ['Ad Films (TV, Digital & Social)', 'Corporate Films (Profile AVs)', 'Case Study Videos', 'Animated Explainers', 'AI Videos', 'Podcasts', 'Training Films', 'Testimonial Videos'],
          buttonText: 'CLICK HERE',
          buttonLink: '/ad-agency'
        }
      };
    }

    doc.markModified('data');
    await doc.save();
    console.log("Restored hero and divisions data!");
    
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
