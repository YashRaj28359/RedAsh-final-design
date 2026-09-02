const fs = require('fs');

let code = fs.readFileSync('admin/src/App.jsx', 'utf8');

// 1. Add 'Contact' to the Entertainment submenu
const mediaButtonTarget = `                    <button 
                      onClick={() => { setActiveSidebar('entertainment-media'); setActiveSubMenu('media'); }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0', color: activeSidebar === 'entertainment-media' ? '#e20002' : '#0f172a', borderBottom: activeSidebar === 'entertainment-media' ? '2px solid #e20002' : '2px solid transparent', fontSize: '0.9rem', fontWeight: '600', transition: 'all 0.2s' }}
                    >
                      Media
                    </button>`;

const contactButtonReplacement = mediaButtonTarget + `
                    
                    <button 
                      onClick={() => { setActiveSidebar('entertainment-contact'); setActiveSubMenu('contact'); }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 0', color: activeSidebar === 'entertainment-contact' ? '#e20002' : '#0f172a', borderBottom: activeSidebar === 'entertainment-contact' ? '2px solid #e20002' : '2px solid transparent', fontSize: '0.9rem', fontWeight: '600', transition: 'all 0.2s' }}
                    >
                      Contact
                    </button>`;

if (code.includes(mediaButtonTarget) && !code.includes('setActiveSidebar(\'entertainment-contact\')')) {
    code = code.replace(mediaButtonTarget, contactButtonReplacement);
}

// 2. Add 'entertainment-contact' to renderSubMenu
const mediaSubMenuTarget = `        case 'entertainment-media':
          return (
            <>
              <div className="section-header">
                <h1>Media Coverage</h1>
                <p>Manage media articles and statement</p>
              </div>
              <div className="sub-nav">
                <button className={\`sub-nav-item \${activeSubMenu === 'media' ? 'active' : ''}\`} onClick={() => setActiveSubMenu('media')}>
                  <div className="label-group"><FileText size={16} /> Media Settings</div>
                </button>
              </div>
            </>
          );`;

const contactSubMenuReplacement = mediaSubMenuTarget + `
        case 'entertainment-contact':
          return (
            <>
              <div className="section-header">
                <h1>Entertainment Contact</h1>
                <p>Manage the contact section for the Entertainment page</p>
              </div>
              <div className="sub-nav">
                <button className={\`sub-nav-item \${activeSubMenu === 'contact' ? 'active' : ''}\`} onClick={() => setActiveSubMenu('contact')}>
                  <div className="label-group"><FileText size={16} /> Contact Subtext</div>
                </button>
              </div>
            </>
          );`;

if (code.includes(mediaSubMenuTarget) && !code.includes('case \'entertainment-contact\':')) {
    code = code.replace(mediaSubMenuTarget, contactSubMenuReplacement);
}

// 3. Add 'entertainment-contact' to renderEditor
const editorInsertionPoint = `    if (activeSidebar === 'entertainment-blog' && activeSubMenu === 'blog') {`;

const editorView = `    if (activeSidebar === 'entertainment-contact' && activeSubMenu === 'contact') {
      const getVal = (key, defaultVal) => content.entertainment?.contact?.[key] !== undefined ? content.entertainment.contact[key] : defaultVal;
      
      const updateVal = (key, val) => {
        setContent(prev => {
          const newState = JSON.parse(JSON.stringify(prev));
          if (!newState.entertainment) newState.entertainment = {};
          if (!newState.entertainment.contact) newState.entertainment.contact = {};
          newState.entertainment.contact[key] = val;
          return newState;
        });
      };

      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Entertainment Contact</h2>
              <p>Manage the "GET IN TOUCH" subtext specifically for the Entertainment Contact page.</p>
            </div>
          </div>
          
          <div className="section-card" style={{ marginTop: '2rem' }}>
            <div className="form-group">
              <label>Header Subtitle</label>
              <textarea 
                className="form-control" rows="3"
                value={getVal('headerSubtitle', 'Potential Clients, Investors, and Sponsors can email or fill the form below')} 
                onChange={(e) => updateVal('headerSubtitle', e.target.value)} 
              />
              <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>This text appears below the "GET IN TOUCH" heading.</p>
            </div>
          </div>
        </div>
      );
    }

    `;

if (code.includes(editorInsertionPoint) && !code.includes('activeSidebar === \'entertainment-contact\' && activeSubMenu === \'contact\'')) {
    code = code.replace(editorInsertionPoint, editorView + editorInsertionPoint);
}

fs.writeFileSync('admin/src/App.jsx', code);
console.log('Entertainment Contact editor successfully added.');
