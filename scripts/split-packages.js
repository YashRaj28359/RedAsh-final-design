const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function splitPackage(distDir, prefix) {
  const temp1 = path.join(__dirname, `${prefix}_part1`);
  const temp2 = path.join(__dirname, `${prefix}_part2`);

  if (fs.existsSync(temp1)) fs.rmSync(temp1, { recursive: true, force: true });
  if (fs.existsSync(temp2)) fs.rmSync(temp2, { recursive: true, force: true });

  fs.mkdirSync(path.join(temp1, 'assets'), { recursive: true });
  fs.mkdirSync(path.join(temp2, 'assets'), { recursive: true });

  // Copy non-assets
  const items = fs.readdirSync(distDir);
  for (const item of items) {
    if (item === 'assets') continue;
    const src = path.join(distDir, item);
    const dest = path.join(temp1, item);
    fs.cpSync(src, dest, { recursive: true });
  }

  // Split assets
  const assetsDir = path.join(distDir, 'assets');
  if (fs.existsSync(assetsDir)) {
    const assetFiles = fs.readdirSync(assetsDir);
    const half = Math.ceil(assetFiles.length / 2);
    assetFiles.forEach((file, index) => {
      const src = path.join(assetsDir, file);
      const dest = index < half ? path.join(temp1, 'assets', file) : path.join(temp2, 'assets', file);
      fs.cpSync(src, dest, { recursive: true });
    });
  }

  const zip1 = path.join(__dirname, `..`, `${prefix}-part1.zip`);
  const zip2 = path.join(__dirname, `..`, `${prefix}-part2.zip`);
  if (fs.existsSync(zip1)) fs.unlinkSync(zip1);
  if (fs.existsSync(zip2)) fs.unlinkSync(zip2);

  execSync(`powershell -Command "Compress-Archive -Path '${temp1}\\*' -DestinationPath '${zip1}' -Force"`);
  execSync(`powershell -Command "Compress-Archive -Path '${temp2}\\*' -DestinationPath '${zip2}' -Force"`);

  fs.rmSync(temp1, { recursive: true, force: true });
  fs.rmSync(temp2, { recursive: true, force: true });
  console.log(`Created ${prefix}-part1.zip and ${prefix}-part2.zip`);
}

splitPackage(path.join(__dirname, '..', 'client', 'dist'), 'client');
splitPackage(path.join(__dirname, '..', 'admin', 'dist'), 'admin');
