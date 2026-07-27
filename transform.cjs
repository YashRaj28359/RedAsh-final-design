const fs = require('fs');

let content = fs.readFileSync('src/data/enterpriseVideos.js', 'utf8');

// Replace customBg with a string so it parses as JSON
content = content.replace(/"customBg":\s*lgtvcBg/, `"customBg": "LGTVCBG_PLACEHOLDER"`);

const arrStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
const data = JSON.parse(arrStr);

const flat = [];
for(const sec of data) {
  for(const v of sec.videos) {
    flat.push({
      id: v.id,
      title: v.title,
      category: sec.category,
      thumbnail: v.customBg === 'LGTVCBG_PLACEHOLDER' ? 'LGTVCBG_PLACEHOLDER' : `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
      videoUrl: `https://youtu.be/${v.id}`,
      ...(v.customBg === 'LGTVCBG_PLACEHOLDER' ? { customBg: 'LGTVCBG_PLACEHOLDER' } : {})
    });
  }
}

let out = "import lgtvcBg from '../assets/enterpriseFilms/lgtvc_bg.png';\n\nexport const enterpriseVideos = [\n";
for(let i=0; i<flat.length; i++) {
  const v = flat[i];
  out += `  {\n`;
  out += `    id: "${v.id}",\n`;
  out += `    title: "${v.title.replace(/"/g, '\\"')}",\n`;
  out += `    category: "${v.category}",\n`;
  if (v.thumbnail === 'LGTVCBG_PLACEHOLDER') {
    out += `    thumbnail: lgtvcBg,\n`;
    out += `    videoUrl: "${v.videoUrl}",\n`;
    out += `    customBg: lgtvcBg\n`;
  } else {
    out += `    thumbnail: "${v.thumbnail}",\n`;
    out += `    videoUrl: "${v.videoUrl}"\n`;
  }
  out += `  }${i === flat.length - 1 ? '' : ','}\n`;
}
out += "];\n";

fs.writeFileSync('src/data/enterpriseVideos.js', out);
