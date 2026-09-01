import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Content from './models/Content.js';
import fs from 'fs';

dotenv.config();

// Hardcoded URLs from client
const horizontalUrls = [
  "https://youtu.be/pIv7FFKm318?si=b_CUXqrAAxoaTjq0", // h1
  "https://www.mid-day.com/buzzfeed/article/ashish-lal-the-iit-delhi-engineer-turned-actor-teams-up-with-surbhi-jyoti-and-upendra-limaye-9809", // h2
  "https://youtu.be/EhiWSgbQnQU?si=29Z1fEfaRTZqyo6G", // h3
  "https://youtu.be/5AGZjsdfOio?si=2CgTqSXIUs0_a-Ua", // h4
  "https://youtu.be/BqGm3m3jyhI?si=K2jGDdZAKaOPKXnl", // h5
  "https://youtu.be/6NusataOZyU?si=xoLP93n-qeuhEqK6", // h6
  "https://youtu.be/-qHNIXVHT_4?si=rjrWz4zDIGye9Zhw", // h7
  "https://youtu.be/Rz0El0ooOwM?si=1TkAE07Ek8dbJm1w", // h8
  "https://youtu.be/6Q0mdzO9A4A?si=w_dZFv_p8FszDoDL" // h9
];

// Read microdramaShows.js using regex to get the URLs
const microdramaContent = fs.readFileSync('../client/src/data/microdramaShows.js', 'utf-8');
const urlMatches = [...microdramaContent.matchAll(/url:\s*['"](.*?)['"]/g)].map(m => m[1]);

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB!");
    let doc = await Content.findOne({ key: 'homepage' });
    if (!doc) {
      console.log("No homepage doc found");
      process.exit();
    }
    
    if (!doc.data.entertainment) doc.data.entertainment = {};
    if (!doc.data.entertainment.projects) doc.data.entertainment.projects = {};
    
    // We will initialize them with the default structures from App.jsx but with correct links.
    // However, we don't have all the image paths here.
    // Instead of replacing the entire object, we will just let the user save from Admin Panel first, 
    // OR we can just edit App.jsx which is easier!
    
    console.log("Urls to patch:", horizontalUrls);
    console.log("Vertical urls:", urlMatches.length);
    process.exit();
  });
