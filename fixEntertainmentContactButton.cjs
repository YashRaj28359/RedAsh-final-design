const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'admin/src/App.jsx');
let content = fs.readFileSync(appJsxPath, 'utf8');

const regex = /<button[\s\S]*?onClick=\{\(\) => \{ setActiveSidebar\('entertainment-media'\); setActiveSubMenu\('media'\); \}\}[\s\S]*?Media\s*<\/button>/g;

const match = content.match(regex);
if (match && !content.includes("setActiveSidebar('entertainment-contact')")) {
  const replacement = match[0] + `
                  
                  <button 
                    onClick={() => { setActiveSidebar('entertainment-contact'); setActiveSubMenu('contact'); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0', color: activeSidebar === 'entertainment-contact' ? '#e20002' : '#0f172a', borderBottom: activeSidebar === 'entertainment-contact' ? '2px solid #e20002' : '2px solid transparent', fontSize: '0.9rem', fontWeight: '600', transition: 'all 0.2s' }}
                  >
                    Contact
                  </button>`;
  
  content = content.replace(match[0], replacement);
  fs.writeFileSync(appJsxPath, content, 'utf8');
  console.log("Regex replacement successful.");
} else {
  console.log("No match found or already added.");
}
