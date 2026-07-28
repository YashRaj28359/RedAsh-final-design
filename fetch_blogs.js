import fs from 'fs';
import https from 'https';

const API_URL = 'https://redashfilms.com/wp-json/wp/v2/posts?per_page=100&_embed=true';

https.get(API_URL, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const posts = JSON.parse(data);
      
      const formattedBlogs = posts.map(post => {
        // Extract featured image if available
        let imageUrl = '';
        if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'].length > 0) {
          imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
        }

        return {
          id: post.id,
          title: post.title.rendered,
          slug: post.slug,
          date: post.date,
          excerpt: post.excerpt.rendered,
          content: post.content.rendered,
          imageUrl: imageUrl,
          link: post.link
        };
      });

      fs.writeFileSync('./src/data/blogs.json', JSON.stringify(formattedBlogs, null, 2));
      console.log(`Successfully fetched and saved ${formattedBlogs.length} blogs!`);
    } catch (e) {
      console.error('Error parsing JSON!', e);
    }
  });

}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
