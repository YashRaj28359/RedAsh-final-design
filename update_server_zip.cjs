const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const baseDir = __dirname;
const outDir = path.join(baseDir, 'UPDATED_TODAY_ZIPS');
const serverZip = path.join(outDir, '3_server_updated_files.zip');

if (fs.existsSync(serverZip)) fs.unlinkSync(serverZip);
const file1 = path.join(baseDir, 'server', 'index.js');
const file2 = path.join(baseDir, 'server', 'package.json');
const file3 = path.join(baseDir, 'server', 'seoDefaults.js');

execSync(`powershell -Command "Compress-Archive -Path '${file1}', '${file2}', '${file3}' -DestinationPath '${serverZip}' -Force"`);
console.log('3_server_updated_files.zip updated successfully with exact [RedAsh] Quotation Request subject.');
