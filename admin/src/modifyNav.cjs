const fs = require('fs');
let code = fs.readFileSync('App.jsx', 'utf8');

// 1. Remove "Shared Content" and "Media Library" from top nav and replace with "Media Cards"
const topNavTarget = `<button className={\`top-nav-tab \${activeSidebar === 'shared' ? 'active' : ''}\`} onClick={() => setActiveSidebar('shared')}>
            <Layout size={16} /> Shared Content
          </button>
          <button className={\`top-nav-tab \${activeSidebar === 'media' ? 'active' : ''}\`} onClick={() => setActiveSidebar('media')}>
            <ImageIcon size={16} /> Media Library
          </button>`.replace(/\n/g, '\r\n');
const topNavReplace = `<button className={\`top-nav-tab \${activeSidebar === 'homepage-media' ? 'active' : ''}\`} onClick={() => setActiveSidebar('homepage-media')}>
            <ImageIcon size={16} /> Media Cards
          </button>`.replace(/\n/g, '\r\n');

// 2. Change the condition for rendering media cards
const renderTarget = `if (activeSidebar === 'homepage' && activeSubMenu === 'mediaCards') {`.replace(/\n/g, '\r\n');
const renderReplace = `if ((activeSidebar === 'homepage' && activeSubMenu === 'mediaCards') || activeSidebar === 'homepage-media') {`.replace(/\n/g, '\r\n');

// 3. Update handleSave to use 'homepage' for 'homepage-media'
const saveTarget = `if (activeSidebar.startsWith('entertainment') && activeSidebar !== 'entertainment-films') {
        dbKey = 'entertainment';
      }`.replace(/\n/g, '\r\n');
const saveReplace = `if (activeSidebar.startsWith('entertainment') && activeSidebar !== 'entertainment-films') {
        dbKey = 'entertainment';
      }
      if (activeSidebar === 'homepage-media') {
        dbKey = 'homepage';
      }`.replace(/\n/g, '\r\n');

// 4. Update the 'Edit' button we just added to point to 'homepage-media'
const editTarget = `onClick={() => {
                  setActiveSidebar('homepage');
                  setActiveSubMenu('mediaCards');
                }}`.replace(/\n/g, '\r\n');
const editReplace = `onClick={() => {
                  setActiveSidebar('homepage-media');
                }}`.replace(/\n/g, '\r\n');

if (code.includes(topNavTarget) && code.includes(renderTarget) && code.includes(saveTarget)) {
    code = code.replace(topNavTarget, topNavReplace);
    code = code.replace(renderTarget, renderReplace);
    code = code.replace(saveTarget, saveReplace);
    // Replace the first occurrence of editTarget which should be our edit button
    code = code.replace(editTarget, editReplace);
    
    fs.writeFileSync('App.jsx', code);
    console.log('Success');
} else {
    console.log('Targets not found:');
    console.log('topNav:', code.includes(topNavTarget));
    console.log('render:', code.includes(renderTarget));
    console.log('save:', code.includes(saveTarget));
}
