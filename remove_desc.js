const fs = require('fs');
let code = fs.readFileSync('d:\\\\Meraki Movies\\\\Redash.in\\\\Final RedAsh Project\\\\client\\\\src\\\\components\\\\ServicesInfo\\\\ServicesInfo.jsx', 'utf8');

code = code.replace(/<p className=\"text-sm md:text-base font-main text-brand-gray mt-6 lg:mt-0\">\\s*\\{divisionsData\\.entertainment\\.description\\}\\s*<\\/p>/, '');
code = code.replace(/<p className=\"text-sm md:text-base font-main text-brand-gray mt-6 lg:mt-0 pr-4 lg:pr-0\">\\s*\\{divisionsData\\.enterprise\\.description\\}\\s*<\\/p>/, '');

fs.writeFileSync('d:\\\\Meraki Movies\\\\Redash.in\\\\Final RedAsh Project\\\\client\\\\src\\\\components\\\\ServicesInfo\\\\ServicesInfo.jsx', code);
console.log('Descriptions removed from frontend.');
