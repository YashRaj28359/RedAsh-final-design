const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const clientZip = path.join(__dirname, '..', 'client-production-optimized.zip');
const adminZip = path.join(__dirname, '..', 'admin-production-optimized.zip');

if (fs.existsSync(clientZip)) fs.unlinkSync(clientZip);
if (fs.existsSync(adminZip)) fs.unlinkSync(adminZip);

console.log('Zipping client...');
execSync(`powershell -Command "Compress-Archive -Path 'client\\dist\\*' -DestinationPath '${clientZip}' -CompressionLevel Optimal -Force"`, { cwd: path.join(__dirname, '..') });

console.log('Zipping admin...');
execSync(`powershell -Command "Compress-Archive -Path 'admin\\dist\\*' -DestinationPath '${adminZip}' -CompressionLevel Optimal -Force"`, { cwd: path.join(__dirname, '..') });

const clientSize = (fs.statSync(clientZip).size / (1024 * 1024)).toFixed(2);
const adminSize = (fs.statSync(adminZip).size / (1024 * 1024)).toFixed(2);

console.log(`Success:`);
console.log(`client-production-optimized.zip: ${clientSize} MB`);
console.log(`admin-production-optimized.zip: ${adminSize} MB`);
