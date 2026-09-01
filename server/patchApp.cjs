const fs = require('fs');

const horizontalUrls = [
  "https://youtu.be/pIv7FFKm318?si=b_CUXqrAAxoaTjq0", // h1
  "https://www.mid-day.com/buzzfeed/article/ashish-lal-the-iit-delhi-engineer-turned-actor-teams-up-with-surbhi-jyoti-and-upendra-limaye-9809", // h2
  "https://youtu.be/EhiWSgbQnQU?si=29Z1fEfaRTZqyo6G", // h3
  "https://youtu.be/5AGZjsdfOio?si=2CgTqSXIUs0_a-Ua", // h4
  "https://youtu.be/BqGm3m3jyhI?si=K2jGDdZAKaOPKXnl", // h5
  "https://youtu.be/6NusataOZyU?si=xoLP93n-qeuhEqK6", // h6
  "https://youtu.be/-qHNIXVHT_4?si=rjrWz4zDIGye9Zhw", // h7
  "https://youtu.be/Rz0El0ooOwM?si=1TkAE07Ek8dbJm1w", // h8 (100 short films)
  "https://youtu.be/6Q0mdzO9A4A?si=w_dZFv_p8FszDoDL" // h9 (music videos)
];

const verticalUrls = [
  "https://premium.kukutv.app/show/billionaire-on-plane",
  "https://www.instagram.com/reels/DVjKK5YSD3G/",
  "https://premium.kukutv.app/show/baazigaar-baaz",
  "https://premium.kukutv.app/show/secret-boss-mera-baap",
  "https://premium.kukutv.app/show/billionaire-ki-waapsi",
  "http://premium.kukutv.app/show/mrs-by-mistake",
  "https://premium.kukutv.app/show/jobless-ghar-jamai-16",
  "https://premium.kukutv.app/show/ek-mehenga-divorce",
  "https://premium.kukutv.app/show/the-little-pool-master",
  "https://premium.kukutv.app/show/fake-girlfriend",
  "https://premium.kukutv.app/show/death-notification",
  "https://premium.kukutv.app/show/ek-anjana-rishta",
  "https://premium.kukutv.app/show/metro-wala-panga",
  "https://premium.kukutv.app/show/chaiwala-hero",
  "https://premium.kukutv.app/show/born-to-rise",
  "https://premium.kukutv.app/show/2bb32b69-c8e3-4033-b26a-56ee5403e51a",
  "https://premium.kukutv.app/show/knock-do-not-open-the-door",
  "https://premium.kukutv.app/show/wheelchair-billionaire"
];

let appJsx = fs.readFileSync('../admin/src/App.jsx', 'utf-8');

// Replace horizontal projects links
horizontalUrls.forEach((url, i) => {
  const regex = new RegExp(`({ id: "h${i + 1}",.*?link:\\s*)["'][^"']*["'](.*?})`, 'g');
  appJsx = appJsx.replace(regex, `$1"${url}"$2`);
});

// Replace vertical projects links
verticalUrls.forEach((url, i) => {
  const regex = new RegExp(`({ id: "v${i + 1}",.*?link:\\s*)["'][^"']*["'](.*?})`, 'g');
  appJsx = appJsx.replace(regex, `$1"${url}"$2`);
});

fs.writeFileSync('../admin/src/App.jsx', appJsx);
console.log("App.jsx updated with default links!");
