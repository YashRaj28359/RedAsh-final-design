import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = './src/assets/Films/Poster/Micro drama Movie posters';
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.match(/\.(jpg|jpeg|png)$/i)) {
    const filePath = path.join(dir, file);
    const parsed = path.parse(file);
    const outPath = path.join(dir, parsed.name + '.webp');
    console.log(`Converting ${file} to WebP...`);
    sharp(filePath)
      .webp({ quality: 85 })
      .toFile(outPath)
      .then(() => console.log(`Successfully converted ${parsed.name}.webp`))
      .catch(err => console.error(`Error converting ${file}:`, err));
  }
}
