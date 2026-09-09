const fs = require('fs');
const path = require('path');

// 1. Fix Admin App.jsx logo preview
const appJsxPath = path.join(__dirname, 'admin/src/App.jsx');
let appJsxContent = fs.readFileSync(appJsxPath, 'utf8');

const regexAppJsx = /<img src=\{logo\.url\} alt="Logo Preview"/g;
const replacementAppJsx = `<img src={logo.url.startsWith('http') || logo.url.startsWith('data:') ? logo.url : \`http://localhost:5000\${logo.url}\`} alt="Logo Preview"`;

if (appJsxContent.match(regexAppJsx)) {
  appJsxContent = appJsxContent.replace(regexAppJsx, replacementAppJsx);
  fs.writeFileSync(appJsxPath, appJsxContent, 'utf8');
  console.log('Fixed App.jsx logo previews.');
} else {
  console.log('No matches found for App.jsx logo preview.');
}

// 2. Fix Client Agency Navbar logo
const navbarPath = path.join(__dirname, 'client/src/pages/Agency/components/Navbar.jsx');
let navbarContent = fs.readFileSync(navbarPath, 'utf8');

const regexNavbarSrc = /src=\{serverLogo \|\| defaultLogo\}/g;
const replacementNavbarSrc = `src={serverLogo ? (serverLogo.startsWith('http') || serverLogo.startsWith('data:') ? serverLogo : \`http://localhost:5000\${serverLogo}\`) : defaultLogo}`;

if (navbarContent.match(regexNavbarSrc)) {
  navbarContent = navbarContent.replace(regexNavbarSrc, replacementNavbarSrc);
  fs.writeFileSync(navbarPath, navbarContent, 'utf8');
  console.log('Fixed Client Agency Navbar logo.');
} else {
  console.log('No matches found for Client Agency Navbar logo.');
}
