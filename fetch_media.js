import fs from 'fs';
import https from 'https';

const API_URL = 'https://redashfilms.com/media/';

https.get(API_URL, (res) => {
  let html = '';

  res.on('data', (chunk) => {
    html += chunk;
  });

  res.on('end', () => {
    try {
      // Very basic regex scraping for this specific page structure
      const articles = [];
      
      // The page has sections containing images, headings (h2), text (p), and buttons (a)
      // Let's use a simpler approach since regex on HTML is fragile.
      // We know there are exactly 5 or so articles based on the content.md
      
      const titleRegex = /<h2 class="elementor-heading-title[^>]*>(.*?)<\/h2>/g;
      const descRegex = /<div class="elementor-widget-text-editor[^>]*>\s*<div class="elementor-widget-container">\s*<p>(.*?)<\/p>/g;
      const linkRegex = /<a class="elementor-button elementor-size-sm"[^>]*href="(.*?)"/g;
      
      const titles = [...html.matchAll(titleRegex)].map(m => m[1].replace(/<[^>]*>?/gm, ''));
      const descs = [...html.matchAll(descRegex)].map(m => m[1].replace(/<[^>]*>?/gm, ''));
      const links = [...html.matchAll(linkRegex)].map(m => m[1]);
      
      // Finding images is harder due to responsive image markup, but let's try to grab the src of the nearest image before the h2
      // Instead, let's just hardcode the extracted info or write a better scraper if needed.
      
      for(let i=0; i<titles.length; i++) {
         if (titles[i].length > 10) { // filter out random small headings
           articles.push({
             id: 'media-' + i,
             source: 'Media Feature', // Default source
             title: titles[i] || '',
             description: descs[i] || '',
             url: links[i] || '#',
             image: '' // Will need to figure out image or use a placeholder
           });
         }
      }
      
      // We will save this temporarily to see what it caught
      fs.writeFileSync('temp_media.json', JSON.stringify(articles, null, 2));
      console.log('Successfully parsed media:', articles.length, 'articles');
    } catch (e) {
      console.error('Error parsing!', e);
    }
  });

}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
