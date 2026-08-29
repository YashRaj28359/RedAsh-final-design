const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'assets', 'Films', 'Cards');
const files = fs.readdirSync(dir);

(async () => {
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const inputPath = path.join(dir, file);
      const tempPath = path.join(dir, 'temp_' + file);
      
      console.log(`Compressing ${file}...`);
      const stat = fs.statSync(inputPath);
      console.log(`Original size: ${(stat.size / 1024).toFixed(2)} KB`);
      
      try {
        if (file.toLowerCase().endsWith('.png')) {
          await sharp(inputPath)
            .resize({ width: 800, withoutEnlargement: true })
            .png({ quality: 80, compressionLevel: 9 })
            .toFile(tempPath);
        } else {
          await sharp(inputPath)
            .resize({ width: 800, withoutEnlargement: true })
            .jpeg({ quality: 70, mozjpeg: true })
            .toFile(tempPath);
        }
        
        fs.unlinkSync(inputPath);
        fs.renameSync(tempPath, inputPath);
        
        const newStat = fs.statSync(inputPath);
        console.log(`New size: ${(newStat.size / 1024).toFixed(2)} KB\n`);
      } catch (err) {
        console.error('Error on', file, err);
      }
    }
  }
})();
