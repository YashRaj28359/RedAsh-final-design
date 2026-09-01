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

    // 1. Restore Hero heading_blocks
    if (!doc.data.hero) doc.data.hero = {};
    doc.data.hero.heading_blocks = [
      { id: 1, text: 'FILM', subtext: 'PRODUCTION HOUSE', bg_image: '', subtext_color: '#ef4444' },
      { id: 2, text: '&', subtext: '', bg_image: '', subtext_color: '#ef4444' },
      { id: 3, text: 'AD', subtext: 'AGENCY', bg_image: '', subtext_color: '#3b82f6' },
      { id: 4, text: '2007', subtext: "IIT ENGINEER'S VENTURE", bg_image: '', subtext_color: '#6b7280' }
    ];

    // 2. Restore ALL videos with REAL YouTube IDs from videoData.js
    doc.data.video_tile = {
      videos: [
        { id: "pIv7FFKm318", title: "Bollywood Film", category: "Bollywood Film", categoryColor: "red", thumbnail: "https://img.youtube.com/vi/pIv7FFKm318/hqdefault.jpg", videoUrl: "https://youtu.be/pIv7FFKm318" },
        { id: "b5hZr-8rSI4", title: "TV Ad", category: "TV Ad", categoryColor: "blue", thumbnail: "https://img.youtube.com/vi/b5hZr-8rSI4/hqdefault.jpg", videoUrl: "https://youtu.be/b5hZr-8rSI4" },
        { id: "U83-D6XqRVs", title: "Web Series", category: "Web Series", categoryColor: "red", thumbnail: "https://img.youtube.com/vi/U83-D6XqRVs/hqdefault.jpg", videoUrl: "https://timesofindia.indiatimes.com/entertainment/hindi/bollywood/news/ashish-lal-explores-friendship-and-loss-in-the-codpaster/articleshow/131854264.cms" },
        { id: "rqfTN_Fj1SA", title: "Digital Ad Film", category: "Digital Ad Film", categoryColor: "blue", thumbnail: "https://img.youtube.com/vi/rqfTN_Fj1SA/hqdefault.jpg", videoUrl: "https://youtu.be/rqfTN_Fj1SA" },
        { id: "kukufm", title: "Microdrama Show", category: "Microdrama Show", categoryColor: "red", thumbnail: "https://img.youtube.com/vi/kukufm/hqdefault.jpg", videoUrl: "https://kukutv.app/show/billionaire-on-plane" },
        { id: "IUwZoT_-gt4", title: "Brand Films", category: "Brand Films", categoryColor: "blue", thumbnail: "https://img.youtube.com/vi/IUwZoT_-gt4/hqdefault.jpg", videoUrl: "https://youtu.be/IUwZoT_-gt4" },
        { id: "5AGZjsdfOio", title: "Short Films", category: "Short Films", categoryColor: "red", thumbnail: "https://img.youtube.com/vi/5AGZjsdfOio/hqdefault.jpg", videoUrl: "https://youtu.be/5AGZjsdfOio" },
        { id: "R_EAcTv-59o", title: "Animated Explainers", category: "Animated Explainers", categoryColor: "blue", thumbnail: "https://img.youtube.com/vi/R_EAcTv-59o/hqdefault.jpg", videoUrl: "https://youtu.be/R_EAcTv-59o" },
        { id: "6Q0mdzO9A4A", title: "Music Videos", category: "Music Videos", categoryColor: "red", thumbnail: "https://img.youtube.com/vi/6Q0mdzO9A4A/hqdefault.jpg", videoUrl: "https://youtu.be/6Q0mdzO9A4A" },
        { id: "l4XYMZzh7Tc", title: "AI Corporate Films", category: "AI Corporate Films", categoryColor: "blue", thumbnail: "https://img.youtube.com/vi/l4XYMZzh7Tc/hqdefault.jpg", videoUrl: "https://youtu.be/l4XYMZzh7Tc" },
        { id: "AKAxDl0W9jU", title: "AI Fiction Films", category: "AI Fiction Films", categoryColor: "red", thumbnail: "https://img.youtube.com/vi/AKAxDl0W9jU/hqdefault.jpg", videoUrl: "https://youtube.com/shorts/AKAxDl0W9jU" },
        { id: "R7TQBIHyR9Y", title: "L&D Training Films", category: "L&D Training Films", categoryColor: "blue", thumbnail: "https://img.youtube.com/vi/R7TQBIHyR9Y/hqdefault.jpg", videoUrl: "https://youtu.be/R7TQBIHyR9Y" },
        { id: "EhiWSgbQnQU", title: "Feature Films", category: "Feature Films", categoryColor: "red", thumbnail: "https://img.youtube.com/vi/EhiWSgbQnQU/hqdefault.jpg", videoUrl: "https://youtu.be/EhiWSgbQnQU" },
        { id: "bK9ZC1nsoLo", title: "Social Media Ad Films", category: "Social Media Ad Films", categoryColor: "blue", thumbnail: "https://img.youtube.com/vi/bK9ZC1nsoLo/hqdefault.jpg", videoUrl: "https://youtu.be/bK9ZC1nsoLo" },
        { id: "Rz0El0ooOwM", title: "Digital Series", category: "Digital Series", categoryColor: "red", thumbnail: "https://img.youtube.com/vi/Rz0El0ooOwM/hqdefault.jpg", videoUrl: "https://youtu.be/Rz0El0ooOwM" },
        { id: "RvciiZb-k1U", title: "Podcast", category: "Podcast", categoryColor: "blue", thumbnail: "https://img.youtube.com/vi/RvciiZb-k1U/hqdefault.jpg", videoUrl: "https://youtu.be/RvciiZb-k1U" },
        { id: "BqGm3m3jyhI", title: "Short Films", category: "Short Films", categoryColor: "red", thumbnail: "https://img.youtube.com/vi/BqGm3m3jyhI/hqdefault.jpg", videoUrl: "https://youtu.be/BqGm3m3jyhI" },
        { id: "iuIaAuh4LCQ", title: "Case Study Video", category: "Case Study Video", categoryColor: "blue", thumbnail: "https://img.youtube.com/vi/iuIaAuh4LCQ/hqdefault.jpg", videoUrl: "https://youtu.be/iuIaAuh4LCQ" },
        { id: "-qHNIXVHT_4", title: "Music Video", category: "Music Video", categoryColor: "red", thumbnail: "https://img.youtube.com/vi/-qHNIXVHT_4/hqdefault.jpg", videoUrl: "https://youtu.be/-qHNIXVHT_4" },
        { id: "Gt9nQ494oVc", title: "Corporate AV", category: "Corporate AV", categoryColor: "blue", thumbnail: "https://img.youtube.com/vi/Gt9nQ494oVc/hqdefault.jpg", videoUrl: "https://youtu.be/Gt9nQ494oVc" },
        { id: "3Sxhgtn4Wf0", title: "Documentary Film", category: "Documentary Film", categoryColor: "red", thumbnail: "https://img.youtube.com/vi/3Sxhgtn4Wf0/hqdefault.jpg", videoUrl: "https://youtu.be/3Sxhgtn4Wf0" },
        { id: "i3Js7EsalM0", title: "Subject Matter Expert", category: "Subject Matter Expert", categoryColor: "blue", thumbnail: "https://img.youtube.com/vi/i3Js7EsalM0/hqdefault.jpg", videoUrl: "https://youtu.be/i3Js7EsalM0" },
        { id: "orDnxgWvijU", title: "AI Music Video", category: "AI Music Video", categoryColor: "red", thumbnail: "https://img.youtube.com/vi/orDnxgWvijU/hqdefault.jpg", videoUrl: "https://youtu.be/orDnxgWvijU" },
        { id: "5kYeOAkpSWU", title: "Brand Film", category: "Brand Film", categoryColor: "blue", thumbnail: "https://img.youtube.com/vi/5kYeOAkpSWU/hqdefault.jpg", videoUrl: "https://youtu.be/5kYeOAkpSWU" }
      ]
    };

    // 3. Restore divisions
    if (!doc.data.divisions) {
      doc.data.divisions = {
        entertainment: {
          title1: 'ENTERTAINMENT', title2: 'DIVISION',
          description: 'Contact us at info@redashfilms.com for end-to-end film production services and entertainment films, including',
          points: ['Theatrical Feature Films', 'Microdrama Shows', 'Music Videos', 'Web Shows', 'Short Films', 'AI Films'],
          buttonText: 'CLICK HERE', buttonLink: '/entertainment'
        },
        enterprise: {
          title1: 'ENTERPRISE', title2: 'DIVISION',
          description: 'Contact us at info@redashfilms.com for strategic ad agency services and enterprise films, including',
          points: ['Ad Films (TV, Digital & Social)', 'Corporate Films (Profile AVs)', 'Case Study Videos', 'Animated Explainers', 'AI Videos', 'Podcasts', 'Training Films', 'Testimonial Videos'],
          buttonText: 'CLICK HERE', buttonLink: '/ad-agency'
        }
      };
    }

    doc.markModified('data');
    await doc.save();
    console.log("✅ Restored hero blocks (4 blocks: FILM, &, AD, 2007)");
    console.log("✅ Restored all 24 videos with REAL YouTube IDs");
    console.log("✅ Restored divisions data");
    
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
