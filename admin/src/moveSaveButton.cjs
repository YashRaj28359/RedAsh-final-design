const fs = require('fs');
let code = fs.readFileSync('App.jsx', 'utf8');

const saveBtnTarget = `            <button type="button" className="btn-primary" onClick={() => handleSave(content)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#e20002', color: '#fff', border: 'none', padding: '0.6rem 1.4rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              <Save size={16} /> Save Changes
            </button>`.replace(/\n/g, '\r\n');

// Find the end of the global-contact block.
// It ends with:
//          </div>
//        </div>
//      );
//    }
const insertTarget = `          <div className="content-block-panel" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Map Links</h3>`.replace(/\n/g, '\r\n'); // from moveMap.cjs if it ran? Wait, it's safer to just inject it at the end.

// Let's just do a string replacement for the button block and remove it from top, then inject it at the bottom.
if (code.includes(saveBtnTarget)) {
    code = code.replace(saveBtnTarget, '');
    
    // The bottom of the editor-form-pane
    const paneEndTarget = `            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Google Maps Link URL (click link)</label>
              <input type="text" className="form-control" value={contactInfo.mapLinkUrl || ''} onChange={(e) => handleChange('mapLinkUrl', e.target.value)} />
            </div>
          </div>
        </div>
      );`.replace(/\n/g, '\r\n');

    const newPaneEnd = `            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Google Maps Link URL (click link)</label>
              <input type="text" className="form-control" value={contactInfo.mapLinkUrl || ''} onChange={(e) => handleChange('mapLinkUrl', e.target.value)} />
            </div>
          </div>
          
          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: '600', color: '#334155', textAlign: 'center' }}>Save Contact Info</label>
            <button type="button" className="btn-primary" onClick={() => handleSave(content)} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#e20002', color: '#fff', border: 'none', padding: '0.6rem 2.5rem', borderRadius: '6px', fontWeight: '600', fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(226, 0, 2, 0.2), 0 2px 4px -1px rgba(226, 0, 2, 0.1)' }}>
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      );`.replace(/\n/g, '\r\n');

    if (code.includes(paneEndTarget)) {
        code = code.replace(paneEndTarget, newPaneEnd);
        fs.writeFileSync('App.jsx', code);
        console.log('Moved save button to bottom!');
    } else {
        console.log('Pane end target not found');
    }
} else {
    console.log('Save button not found');
}
