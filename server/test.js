import http from 'http';

http.get('https://redash-final-design.onrender.com/api/content', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log(data));
});
