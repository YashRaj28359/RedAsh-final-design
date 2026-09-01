import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Content from './models/Content.js';
import { readFileSync } from 'fs';

dotenv.config();

// The original 20 videos from the screenshot/videoData.js
const videos = [
  { id: "pIv7FFKm318", title: "Bollywood Film", category: "Bollywood Film", categoryColor: "red", thumbnail: "https://img.youtube.com/vi/pIv7FFKm318/hqdefault.jpg", videoUrl: "https://youtu.be/pIv7FFKm318" },
  { id: "b5hZr-8rSI4", title: "TV Ad", category: "TV Ad", categoryColor: "blue", thumbnail: "https://img.youtube.com/vi/b5hZr-8rSI4/hqdefault.jpg", videoUrl: "https://youtu.be/b5hZr-8rSI4" },
  { id: "web-series", title: "Web Series", category: "Web Series", categoryColor: "red", thumbnail: "https://img.youtube.com/vi/U83-D6XqRVs/hqdefault.jpg", videoUrl: "https://youtu.be/U83-D6XqRVs" },
  { id: "digital-ad", title: "Digital Ad Film", category: "Digital Ad Film", categoryColor: "blue", thumbnail: "https://img.youtube.com/vi/fX8B6rE8ZFE/hqdefault.jpg", videoUrl: "https://youtu.be/fX8B6rE8ZFE" },
  { id: "microdrama", title: "Microdrama Show", category: "Microdrama Show", categoryColor: "red", thumbnail: "https://img.youtube.com/vi/micro123/hqdefault.jpg", videoUrl: "https://youtu.be/micro123" },
  { id: "brand-films", title: "Brand Films", category: "Brand Films", categoryColor: "blue", thumbnail: "https://img.youtube.com/vi/brand123/hqdefault.jpg", videoUrl: "https://youtu.be/brand123" },
  { id: "short-films", title: "Short Films", category: "Short Films", categoryColor: "red", thumbnail: "https://img.youtube.com/vi/short123/hqdefault.jpg", videoUrl: "https://youtu.be/short123" },
  { id: "animated-explainers", title: "Animated Explainers", category: "Animated Explainers", categoryColor: "blue", thumbnail: "https://img.youtube.com/vi/anim123/hqdefault.jpg", videoUrl: "https://youtu.be/anim123" },
  { id: "music-videos", title: "Music Videos", category: "Music Videos", categoryColor: "red", thumbnail: "https://img.youtube.com/vi/music123/hqdefault.jpg", videoUrl: "https://youtu.be/music123" },
  { id: "ai-corporate-films", title: "AI Corporate Films", category: "AI Corporate Films", categoryColor: "blue", thumbnail: "https://img.youtube.com/vi/aicorp123/hqdefault.jpg", videoUrl: "https://youtu.be/aicorp123" },
  { id: "ai-fiction-films", title: "AI Fiction Films", category: "AI Fiction Films", categoryColor: "red", thumbnail: "https://img.youtube.com/vi/aific123/hqdefault.jpg", videoUrl: "https://youtu.be/aific123" },
  { id: "ld-training-films", title: "L&D Training Films", category: "L&D Training Films", categoryColor: "blue", thumbnail: "https://img.youtube.com/vi/ld123/hqdefault.jpg", videoUrl: "https://youtu.be/ld123" },
  { id: "feature-films", title: "Feature Films", category: "Feature Films", categoryColor: "red", thumbnail: "https://img.youtube.com/vi/feat123/hqdefault.jpg", videoUrl: "https://youtu.be/feat123" },
  { id: "social-media-ad-films", title: "Social Media Ad Films", category: "Social Media Ad Films", categoryColor: "blue", thumbnail: "https://img.youtube.com/vi/soc123/hqdefault.jpg", videoUrl: "https://youtu.be/soc123" },
  { id: "digital-series", title: "Digital Series", category: "Digital Series", categoryColor: "red", thumbnail: "https://img.youtube.com/vi/dig123/hqdefault.jpg", videoUrl: "https://youtu.be/dig123" },
  { id: "podcast", title: "Podcast", category: "Podcast", categoryColor: "blue", thumbnail: "https://img.youtube.com/vi/pod123/hqdefault.jpg", videoUrl: "https://youtu.be/pod123" },
  { id: "short-films-2", title: "Short Films", category: "Short Films", categoryColor: "red", thumbnail: "https://img.youtube.com/vi/short124/hqdefault.jpg", videoUrl: "https://youtu.be/short124" },
  { id: "case-study-video", title: "Case Study Video", category: "Case Study Video", categoryColor: "blue", thumbnail: "https://img.youtube.com/vi/case123/hqdefault.jpg", videoUrl: "https://youtu.be/case123" },
  { id: "music-video-2", title: "Music Video", category: "Music Video", categoryColor: "red", thumbnail: "https://img.youtube.com/vi/music124/hqdefault.jpg", videoUrl: "https://youtu.be/music124" },
  { id: "corporate-av", title: "Corporate AV", category: "Corporate AV", categoryColor: "blue", thumbnail: "https://img.youtube.com/vi/corp123/hqdefault.jpg", videoUrl: "https://youtu.be/corp123" }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB!");
    let doc = await Content.findOne({ key: 'homepage' });
    if (!doc) {
      doc = new Content({ key: 'homepage', data: {} });
    }
    
    // Add default video tile if missing or empty
    if (!doc.data.video_tile) doc.data.video_tile = {};
    if (!doc.data.video_tile.videos || doc.data.video_tile.videos.length === 0) {
      doc.data.video_tile.videos = videos;
      doc.markModified('data');
      await doc.save();
      console.log("Restored video data!");
    } else {
      console.log("Video data already exists. Current videos count:", doc.data.video_tile.videos.length);
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
