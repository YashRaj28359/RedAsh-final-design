const http = require('http');
const fs = require('fs');
const path = require('path');

// Read directly from client/src/data/entertainmentBlogs.json
const blogsPath = path.join(__dirname, '..', 'client', 'src', 'data', 'entertainmentBlogs.json');
const rawBlogs = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));

// Ensure all have published: true
const staticBlogs = rawBlogs.map(b => ({
  ...b,
  published: true
}));

console.log('Restoring blogs count:', staticBlogs.length);

http.get('http://localhost:5000/api/content', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      const ent = json.entertainment || {};
      
      ent.blogs = staticBlogs;
      ent.deletedBlogSlugs = [];
      
      const postData = JSON.stringify({ data: ent });
      
      const req = http.request({
        hostname: 'localhost',
        port: 5000,
        path: '/api/content/entertainment',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      }, (res2) => {
        let respBody = '';
        res2.on('data', d => respBody += d);
        res2.on('end', () => {
          console.log('DB Update Status:', res2.statusCode);
          console.log('Response:', respBody);
        });
      });
      
      req.on('error', (e) => console.error('PUT Error:', e));
      req.write(postData);
      req.end();
    } catch (e) {
      console.error('JSON parse error:', e);
    }
  });
}).on('error', (err) => {
  console.error('GET Error:', err);
});
