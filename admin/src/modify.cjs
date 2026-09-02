const fs = require('fs');
let code = fs.readFileSync('App.jsx', 'utf8');

const target1 = `<div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: '600', color: '#334155' }}>edit media cards</label>`.replace(/\n/g, '\r\n');
const replace1 = `<div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: '600', color: '#334155', textAlign: 'center' }}>Edit media cards</label>`.replace(/\n/g, '\r\n');

const target2 = `                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  background: '#f1f5f9', 
                  color: '#0f172a', 
                  border: '1px solid #cbd5e1', 
                  padding: '0.4rem 1rem', 
                  borderRadius: '6px', 
                  fontWeight: '600', 
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                edit`.replace(/\n/g, '\r\n');
const replace2 = `                style={{ 
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
                Edit`.replace(/\n/g, '\r\n');

if (code.includes(target1) && code.includes(target2)) {
    code = code.replace(target1, replace1).replace(target2, replace2);
    fs.writeFileSync('App.jsx', code);
    console.log('Success');
} else {
    console.log('Target not found', code.includes(target1), code.includes(target2));
}
