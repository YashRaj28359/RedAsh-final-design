const fs = require('fs');
const content = fs.readFileSync('../client/src/data/microdramaShows.js', 'utf-8');
const urls = [...content.matchAll(/url:\s*['"](.*?)['"]/g)].map(m => m[1]);
console.log(JSON.stringify(urls, null, 2));
