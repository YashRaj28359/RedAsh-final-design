const fs = require('fs');
let code = fs.readFileSync('App.jsx', 'utf8');

// 1. Add Mail icon to lucide-react import
code = code.replace(/import { Home,/, 'import { Mail, Home,');

// 2. Add Contact to top navbar
const navTarget = `<button className={\`top-nav-tab \${activeSidebar === 'homepage-media' ? 'active' : ''}\`} onClick={() => setActiveSidebar('homepage-media')}>
            <ImageIcon size={16} /> Media Cards
          </button>`.replace(/\n/g, '\r\n');
const navReplace = `<button className={\`top-nav-tab \${activeSidebar === 'homepage-media' ? 'active' : ''}\`} onClick={() => setActiveSidebar('homepage-media')}>
            <ImageIcon size={16} /> Media Cards
          </button>
          <button className={\`top-nav-tab \${activeSidebar === 'global-contact' ? 'active' : ''}\`} onClick={() => setActiveSidebar('global-contact')}>
            <Mail size={16} /> Contact
          </button>`.replace(/\n/g, '\r\n');
if (code.includes(navTarget)) code = code.replace(navTarget, navReplace);
else console.log('navTarget not found');

// 3. Add sidebar render case for global-contact
const sidebarTarget = `      case 'homepage-media':`.replace(/\n/g, '\r\n');
const sidebarReplace = `      case 'global-contact':
        return (
          <div className="section-header">
            <h1>Global Contact Info</h1>
            <p>Manage contact info shown across the site</p>
          </div>
        );
      case 'homepage-media':`.replace(/\n/g, '\r\n');
if (code.includes(sidebarTarget)) code = code.replace(sidebarTarget, sidebarReplace);
else console.log('sidebarTarget not found');

// 4. Update handleSave to support global key
const saveTarget = `if (activeSidebar === 'homepage-media') {
        dbKey = 'homepage';
      }`.replace(/\n/g, '\r\n');
const saveReplace = `if (activeSidebar === 'homepage-media') {
        dbKey = 'homepage';
      }
      if (activeSidebar === 'global-contact') {
        dbKey = 'global';
      }`.replace(/\n/g, '\r\n');
if (code.includes(saveTarget)) code = code.replace(saveTarget, saveReplace);
else console.log('saveTarget not found');

// 5. Add render Main UI case for global-contact
const mainTarget = `if (activeSidebar === 'homepage' || activeSidebar === 'homepage-media') {`.replace(/\n/g, '\r\n'); // To insert right before the first major if block, actually let's insert it before the default switch/if.
// Wait, the main rendering is done by big if-else statements or switch?
// In App.jsx, it usually starts with `if ((activeSidebar === 'homepage' && activeSubMenu === 'logo') ...`
// Let's just find `const renderMainContent = () => {` and insert it right after.
const renderMainTarget = `  const renderMainContent = () => {`.replace(/\n/g, '\r\n');
const renderMainReplace = `  const renderMainContent = () => {
    if (activeSidebar === 'global-contact') {
      const contactInfo = content.global?.contact || {
        addressTitle: 'RedAsh, 1101, Peninsula Park',
        addressDesc: 'Fun Republic Lane, Near Yash Raj Studios, Andheri West, Mumbai 400053',
        mapUrl: 'https://share.google/Pxp4Tva4m3IyfrKAd',
        email1: 'info@redashfilms.com',
        email1Subtitle: 'Potential Clients, Investors, and Sponsors can email or fill the form below',
        email2: 'redash.films@gmail.com',
        email2Subtitle: 'For Actors, Film Crew Members & Vendors - only email'
      };

      const handleChange = (field, value) => {
        setContent(prev => {
          const newState = JSON.parse(JSON.stringify(prev));
          if (!newState.global) newState.global = {};
          if (!newState.global.contact) newState.global.contact = { ...contactInfo };
          newState.global.contact[field] = value;
          return newState;
        });
      };

      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Global Contact Info</h2>
              <p>This information is used on the Entertainment and Ad Agency contact pages.</p>
            </div>
            <button type="button" className="btn-primary" onClick={() => handleSave(content)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e20002', color: '#fff', border: 'none', padding: '0.6rem 1.4rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              <Save size={16} /> Save Changes
            </button>
          </div>
          
          <div className="content-block-panel">
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Office Address</h3>
            <div className="form-group">
              <label>Address Title</label>
              <input type="text" className="form-control" value={contactInfo.addressTitle || ''} onChange={(e) => handleChange('addressTitle', e.target.value)} />
            </div>
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Address Description</label>
              <textarea className="form-control" rows="2" value={contactInfo.addressDesc || ''} onChange={(e) => handleChange('addressDesc', e.target.value)} />
            </div>
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Google Maps Link URL</label>
              <input type="text" className="form-control" value={contactInfo.mapUrl || ''} onChange={(e) => handleChange('mapUrl', e.target.value)} />
            </div>
          </div>

          <div className="content-block-panel" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Primary Email</h3>
            <div className="form-group">
              <label>Email Address</label>
              <input type="text" className="form-control" value={contactInfo.email1 || ''} onChange={(e) => handleChange('email1', e.target.value)} />
            </div>
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Subtitle / Description</label>
              <input type="text" className="form-control" value={contactInfo.email1Subtitle || ''} onChange={(e) => handleChange('email1Subtitle', e.target.value)} />
            </div>
          </div>

          <div className="content-block-panel" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Secondary Email</h3>
            <div className="form-group">
              <label>Email Address</label>
              <input type="text" className="form-control" value={contactInfo.email2 || ''} onChange={(e) => handleChange('email2', e.target.value)} />
            </div>
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Subtitle / Description</label>
              <input type="text" className="form-control" value={contactInfo.email2Subtitle || ''} onChange={(e) => handleChange('email2Subtitle', e.target.value)} />
            </div>
          </div>
        </div>
      );
    }`.replace(/\n/g, '\r\n');
if (code.includes(renderMainTarget)) code = code.replace(renderMainTarget, renderMainReplace);
else console.log('renderMainTarget not found');

fs.writeFileSync('App.jsx', code);
console.log('Done script');
