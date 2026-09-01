import http from 'http';

http.get('http://localhost:5000/api/content', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const parsed = JSON.parse(data);
    console.log('=== HERO HEADING BLOCKS ===');
    console.log(JSON.stringify(parsed.homepage?.hero?.heading_blocks, null, 2));
    console.log('\n=== VIDEO COUNT ===');
    console.log(parsed.homepage?.video_tile?.videos?.length || 0);
    console.log('\n=== VIDEO THUMBNAILS ===');
    (parsed.homepage?.video_tile?.videos || []).forEach((v, i) => {
      console.log(`${i+1}. ${v.category || v.title}: ${v.thumbnail?.substring(0, 60) || 'NO THUMBNAIL'}`);
    });
  });
});
