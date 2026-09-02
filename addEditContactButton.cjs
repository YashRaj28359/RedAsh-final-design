const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'admin/src/App.jsx');
let content = fs.readFileSync(appJsxPath, 'utf8');

const regex = /<label style=\{\{ fontSize: '0\.95rem', fontWeight: '600', color: '#334155', textAlign: 'center' \}\}>Edit media cards<\/label>[\s\S]*?<button[\s\S]*?onClick=\{\(\) => \{\s*setActiveSidebar\('homepage-media'\);\s*\}\}[\s\S]*?>\s*Edit\s*<\/button>/g;

const match = content.match(regex);
if (match && !content.includes("Edit contact details")) {
  const newButton = `
              </div>
              <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: '600', color: '#334155', textAlign: 'center' }}>Edit contact details</label>
                <button 
                  type="button" 
                  onClick={() => {
                    setActiveSidebar('entertainment-contact');
                    setActiveSubMenu('contact');
                  }}
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: '#e20002', 
                    color: '#ffffff', 
                    border: 'none', 
                    padding: '0.6rem 2.5rem', 
                    borderRadius: '6px', 
                    fontWeight: '600', 
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px -1px rgba(226, 0, 2, 0.2), 0 2px 4px -1px rgba(226, 0, 2, 0.1)'
                  }}
                >
                  Edit Contact
                </button>`;
  
  content = content.replace(match[0], match[0] + newButton);
  fs.writeFileSync(appJsxPath, content, 'utf8');
  console.log("Appended Edit Contact button successfully.");
} else {
  console.log("No match found or already added.");
}
