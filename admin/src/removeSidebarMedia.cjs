const fs = require('fs');
let code = fs.readFileSync('App.jsx', 'utf8');

const target1 = `              <button className={\`sub-nav-item \${activeSubMenu === 'mediaCards' ? 'active' : ''}\`} onClick={() => setActiveSubMenu('mediaCards')}>
                <div className="label-group"><Layout size={16} /> Media</div>
              </button>`.replace(/\n/g, '\r\n');

// It appears twice, once under homepage, once under shared content (which I didn't fully remove the case for, but it's harmless, or I can remove all).
// Let's replace all occurrences with an empty string.

if (code.includes(target1)) {
    code = code.split(target1).join('');
    fs.writeFileSync('App.jsx', code);
    console.log('Success');
} else {
    console.log('Target not found');
}
