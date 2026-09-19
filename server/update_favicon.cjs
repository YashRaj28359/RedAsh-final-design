const fs = require('fs');
const path = require('path');
const http = require('http');

// 1. Create a crisp RedAsh SVG favicon
const redashSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#0f172a"/>
  <path d="M28 20 H56 C70 20 78 28 78 40 C78 50 71 57 60 59 L79 80 H62 L46 60 H42 V80 H28 V20 Z M42 34 V47 H54 C60 47 64 44 64 40 C64 36 60 34 54 34 H42 Z" fill="#E20002"/>
  <circle cx="75" cy="25" r="5" fill="#E20002"/>
</svg>`;

fs.writeFileSync(path.join(__dirname, '..', 'client', 'public', 'favicon.svg'), redashSvg, 'utf8');
fs.writeFileSync(path.join(__dirname, '..', 'admin', 'public', 'favicon.svg'), redashSvg, 'utf8');
console.log('Saved RedAsh favicon.svg to client & admin');

// 2. Copy the uploaded pictorial image if available
const uploadedFavicon = path.join(__dirname, 'uploads', '1789710577550-283261634-R-RedAsh-picktorial-white.jpg');
if (fs.existsSync(uploadedFavicon)) {
  fs.copyFileSync(uploadedFavicon, path.join(__dirname, '..', 'client', 'public', 'favicon.jpg'));
  fs.copyFileSync(uploadedFavicon, path.join(__dirname, '..', 'admin', 'public', 'favicon.jpg'));
  console.log('Copied favicon.jpg to client and admin');
}

// 3. Update MongoDB SEO with globalFavicon
const faviconUrl = '/uploads/1789710577550-283261634-R-RedAsh-picktorial-white.jpg';

http.get('http://localhost:5000/api/admin/seo', (res) => {
  let d = '';
  res.on('data', chunk => d += chunk);
  res.on('end', () => {
    try {
      const seoData = JSON.parse(d);
      seoData.globalFavicon = faviconUrl;
      if (seoData.main) seoData.main.favicon = faviconUrl;
      if (seoData.films) seoData.films.favicon = faviconUrl;
      if (seoData.agency) seoData.agency.favicon = faviconUrl;
      
      const postData = JSON.stringify({ data: seoData });
      const req = http.request({
        hostname: 'localhost',
        port: 5000,
        path: '/api/admin/seo',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      }, (res2) => {
        let d2 = '';
        res2.on('data', chunk => d2 += chunk);
        res2.on('end', () => console.log('SEO DB update status:', res2.statusCode));
      });
      req.on('error', console.error);
      req.write(postData);
      req.end();
    } catch (e) {
      console.error(e);
    }
  });
}).on('error', console.error);
