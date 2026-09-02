const fs = require('fs');
let code = fs.readFileSync('App.jsx', 'utf8');

// 1. Add mapLinkUrl and mapEmbedUrl into the default contactInfo block
const defaultInfoTarget = `      const contactInfo = content.global?.contact || {
        addressTitle: 'RedAsh, 1101, Peninsula Park',
        addressDesc: 'Fun Republic Lane, Near Yash Raj Studios, Andheri West, Mumbai 400053',
        mapUrl: 'https://share.google/Pxp4Tva4m3IyfrKAd',
        email1: 'info@redashfilms.com',
        email1Subtitle: 'Potential Clients, Investors, and Sponsors can email or fill the form below',
        email2: 'redash.films@gmail.com',
        email2Subtitle: 'For Actors, Film Crew Members & Vendors - only email'
      };`.replace(/\n/g, '\r\n');

const defaultInfoReplace = `      const contactInfo = content.global?.contact || {
        addressTitle: 'RedAsh, 1101, Peninsula Park',
        addressDesc: 'Fun Republic Lane, Near Yash Raj Studios, Andheri West, Mumbai 400053',
        mapLinkUrl: 'https://share.google/Pxp4Tva4m3IyfrKAd',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.754702008323!2d72.83299317593922!3d19.118432350639912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9d90e067ba9%3A0x16268e5d6bbc70d9!2sPeninsula%20Park!5e0!3m2!1sen!2sin!4v1716388437021!5m2!1sen!2sin',
        email1: 'info@redashfilms.com',
        email1Subtitle: 'Potential Clients, Investors, and Sponsors can email or fill the form below',
        email2: 'redash.films@gmail.com',
        email2Subtitle: 'For Actors, Film Crew Members & Vendors - only email'
      };`.replace(/\n/g, '\r\n');

if (code.includes(defaultInfoTarget)) {
    code = code.replace(defaultInfoTarget, defaultInfoReplace);
}

// 2. Add mapLinkUrl under addressDesc
const mapLinkTarget = `            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Google Maps Link URL</label>
              <input type="text" className="form-control" value={contactInfo.mapUrl || ''} onChange={(e) => handleChange('mapUrl', e.target.value)} />
            </div>`.replace(/\n/g, '\r\n');

const mapLinkReplace = `            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Google Maps Link URL (click link)</label>
              <input type="text" className="form-control" value={contactInfo.mapLinkUrl || ''} onChange={(e) => handleChange('mapLinkUrl', e.target.value)} />
            </div>`.replace(/\n/g, '\r\n');

if (code.includes(mapLinkTarget)) {
    code = code.replace(mapLinkTarget, mapLinkReplace);
}

// 3. Remove original save button from the top
const saveBtnTopTarget = `            <button type="button" className="btn-primary" onClick={() => handleSave(content)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e20002', color: '#fff', border: 'none', padding: '0.6rem 1.4rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              <Save size={16} /> Save Changes
            </button>`.replace(/\n/g, '\r\n');

if (code.includes(saveBtnTopTarget)) {
    code = code.replace(saveBtnTopTarget, '');
}

// 4. Add mapEmbedUrl and new save button to the bottom
const endTarget = `          </div>
        </div>
      );
    }
    if (activeSidebar === 'homepage' && activeSubMenu === 'hero') {`.replace(/\n/g, '\r\n');

const endReplace = `          </div>
          
          <div className="content-block-panel" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Map Embed</h3>
            <div className="form-group">
              <label>Google Maps Embed URL (iframe src)</label>
              <input type="text" className="form-control" value={contactInfo.mapEmbedUrl || ''} onChange={(e) => handleChange('mapEmbedUrl', e.target.value)} />
            </div>
          </div>
          
          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: '600', color: '#334155', textAlign: 'center' }}>Save Contact Info</label>
            <button type="button" className="btn-primary" onClick={() => handleSave(content)} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#e20002', color: '#fff', border: 'none', padding: '0.6rem 2.5rem', borderRadius: '6px', fontWeight: '600', fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(226, 0, 2, 0.2), 0 2px 4px -1px rgba(226, 0, 2, 0.1)' }}>
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      );
    }
    if (activeSidebar === 'homepage' && activeSubMenu === 'hero') {`.replace(/\n/g, '\r\n');

if (code.includes(endTarget)) {
    code = code.replace(endTarget, endReplace);
    fs.writeFileSync('App.jsx', code);
    console.log('Finalized Contact UI');
} else {
    console.log('End target not found');
}
