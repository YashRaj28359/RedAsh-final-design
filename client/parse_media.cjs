const fs = require('fs');

try {
  const html = fs.readFileSync('C:/Users/yashr/.gemini/antigravity-ide/brain/2ba38a13-9dd8-4708-8dd6-8d7140d351ca/.system_generated/steps/392/content.md', 'utf8');

  const regex = /<h[1-6][^>]*>(.*?)<\/h[1-6]>/g;
  let match;
  let mediaList = [];
  let index = 0;

  while ((match = regex.exec(html)) !== null) {
    const text = match[1].replace(/(<([^>]+)>)/gi, '').trim();
    if (text.length > 5 && text !== 'Get a FREE Quotation' && text !== 'Media') {
      const endOfTitle = match.index + match[0].length;
      // Get next 500 chars after title to find description and link
      const context = html.substring(endOfTitle, endOfTitle + 1000);
      const pMatch = context.match(/<p>(.*?)<\/p>/);
      const linkMatch = context.match(/href=[\"'](.*?)[\"']/);
      
      let desc = '';
      if (pMatch) {
          desc = pMatch[1].replace(/(<([^>]+)>)/gi, '').trim();
      }
      
      let link = '';
      if (linkMatch) {
          link = linkMatch[1];
      }
      
      mediaList.push({
          id: 'media-' + index,
          title: text,
          description: desc,
          url: link,
          source: 'News'
      });
      index++;
    }
  }

  console.log(JSON.stringify(mediaList, null, 2));

} catch(e) {
  console.error(e);
}
