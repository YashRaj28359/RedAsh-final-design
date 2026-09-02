const fs = require('fs');
let code = fs.readFileSync('App.jsx', 'utf8');

const mapLinkBlock = `            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Google Maps Link URL (click link)</label>
              <input type="text" className="form-control" value={contactInfo.mapLinkUrl || ''} onChange={(e) => handleChange('mapLinkUrl', e.target.value)} />
            </div>`.replace(/\n/g, '\r\n');

// Remove it from the bottom
if (code.includes(mapLinkBlock)) {
    code = code.replace(mapLinkBlock, '');

    // Insert it under addressDesc
    const addressDescTarget = `            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Address Description</label>
              <textarea className="form-control" rows="2" value={contactInfo.addressDesc || ''} onChange={(e) => handleChange('addressDesc', e.target.value)} />
            </div>`.replace(/\n/g, '\r\n');

    if (code.includes(addressDescTarget)) {
        code = code.replace(addressDescTarget, addressDescTarget + '\r\n' + mapLinkBlock);
        
        // Also fix the bottom section title if they only want embed URL there
        // The bottom section might have: <h3 ...>Map Links</h3>
        // I will change it to: <h3 ...>Map Embed</h3>
        const mapHeaderTarget = `<h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Map Links</h3>`.replace(/\n/g, '\r\n');
        const mapHeaderReplace = `<h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Map Embed</h3>`.replace(/\n/g, '\r\n');
        if (code.includes(mapHeaderTarget)) {
            code = code.replace(mapHeaderTarget, mapHeaderReplace);
        }

        fs.writeFileSync('App.jsx', code);
        console.log('Fixed map positions!');
    } else {
        console.log('Could not find addressDesc target');
    }
} else {
    console.log('Could not find mapLinkBlock');
}
