const fs = require('fs');
let code = fs.readFileSync('d:\\\\Meraki Movies\\\\Redash.in\\\\Final RedAsh Project\\\\admin\\\\src\\\\App.css', 'utf8');

// Use string split and join to avoid regex escaping issues completely
code = code.split('rgba(255, 255, 255,').join('rgba(0, 0, 0,');
code = code.split('#334155').join('#cbd5e1');
code = code.split('#475569').join('#94a3b8');

fs.writeFileSync('d:\\\\Meraki Movies\\\\Redash.in\\\\Final RedAsh Project\\\\admin\\\\src\\\\App.css', code);
console.log('App.css updated.');
