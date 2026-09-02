const fs = require('fs');
let code = fs.readFileSync('App.jsx', 'utf8');

const mapBlock = `            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Google Maps Embed URL (iframe src)</label>
              <input type="text" className="form-control" value={contactInfo.mapEmbedUrl || ''} onChange={(e) => handleChange('mapEmbedUrl', e.target.value)} />
            </div>
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Google Maps Link URL (click link)</label>
              <input type="text" className="form-control" value={contactInfo.mapLinkUrl || ''} onChange={(e) => handleChange('mapLinkUrl', e.target.value)} />
            </div>`.replace(/\n/g, '\r\n');

if (code.includes(mapBlock)) {
    // 1. Remove map block from under Office Address
    code = code.replace(mapBlock, '');

    // 2. Add it to the bottom as its own section
    const newMapBlock = `

          <div className="content-block-panel" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Map Links</h3>${mapBlock}
          </div>`.replace(/\n/g, '\r\n');

    const insertionTarget = `            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Subtitle / Description</label>
              <input type="text" className="form-control" value={contactInfo.email2Subtitle || ''} onChange={(e) => handleChange('email2Subtitle', e.target.value)} />
            </div>
          </div>`.replace(/\n/g, '\r\n');

    if (code.includes(insertionTarget)) {
        code = code.replace(insertionTarget, insertionTarget + newMapBlock);
        fs.writeFileSync('App.jsx', code);
        console.log('Moved map block to bottom!');
    } else {
        console.log('Insertion target not found');
    }
} else {
    console.log('Map block not found');
}
