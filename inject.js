const fs = require('fs');
let code = fs.readFileSync('d:\\\\Meraki Movies\\\\Redash.in\\\\Final RedAsh Project\\\\admin\\\\src\\\\App.jsx', 'utf8');

const functionsToAdd = `
  const handleUpdateDivision = (divisionKey, field, value) => {
    setContent(prev => {
      const newState = { ...prev };
      if (!newState.homepage) newState.homepage = {};
      if (!newState.homepage.divisions) {
        newState.homepage.divisions = {
          entertainment: {
            title1: 'ENTERTAINMENT',
            title2: 'DIVISION',
            description: 'Contact us at info@redashfilms.com for end-to-end film production services and entertainment films, including',
            points: ['Theatrical Feature Films', 'Microdrama Shows', 'Music Videos', 'Web Shows', 'Short Films', 'AI Films'],
            buttonText: 'CLICK HERE',
            buttonLink: '/entertainment'
          },
          enterprise: {
            title1: 'ENTERPRISE',
            title2: 'DIVISION',
            description: 'Contact us at info@redashfilms.com for strategic ad agency services and enterprise films, including',
            points: ['Ad Films (TV, Digital & Social)', 'Corporate Films (Profile AVs)', 'Case Study Videos', 'Animated Explainers', 'AI Videos', 'Podcasts', 'Training Films', 'Testimonial Videos'],
            buttonText: 'CLICK HERE',
            buttonLink: '/ad-agency'
          }
        };
      }
      
      newState.homepage.divisions[divisionKey] = {
        ...newState.homepage.divisions[divisionKey],
        [field]: value
      };
      return newState;
    });
  };

  const handleUpdateDivisionPoint = (divisionKey, pointIndex, value) => {
    setContent(prev => {
      const newState = { ...prev };
      if (!newState.homepage?.divisions) return prev;
      const updatedPoints = [...newState.homepage.divisions[divisionKey].points];
      updatedPoints[pointIndex] = value;
      newState.homepage.divisions[divisionKey].points = updatedPoints;
      return newState;
    });
  };

  const handleAddDivisionPoint = (divisionKey) => {
    setContent(prev => {
      const newState = { ...prev };
      if (!newState.homepage?.divisions) return prev;
      newState.homepage.divisions[divisionKey].points.push('New Point');
      return newState;
    });
  };

  const handleRemoveDivisionPoint = (divisionKey, pointIndex) => {
    setContent(prev => {
      const newState = { ...prev };
      if (!newState.homepage?.divisions) return prev;
      newState.homepage.divisions[divisionKey].points.splice(pointIndex, 1);
      return newState;
    });
  };
`;

code = code.replace('const getPreviewUrl = () => {', functionsToAdd + '\n  const getPreviewUrl = () => {');

const editorToAdd = `
    if (activeSidebar === 'homepage' && activeSubMenu === 'divisions') {
      const divisions = content.homepage?.divisions || {
        entertainment: {
          title1: 'ENTERTAINMENT',
          title2: 'DIVISION',
          description: 'Contact us at info@redashfilms.com for end-to-end film production services and entertainment films, including',
          points: ['Theatrical Feature Films', 'Microdrama Shows', 'Music Videos', 'Web Shows', 'Short Films', 'AI Films'],
          buttonText: 'CLICK HERE',
          buttonLink: '/entertainment'
        },
        enterprise: {
          title1: 'ENTERPRISE',
          title2: 'DIVISION',
          description: 'Contact us at info@redashfilms.com for strategic ad agency services and enterprise films, including',
          points: ['Ad Films (TV, Digital & Social)', 'Corporate Films (Profile AVs)', 'Case Study Videos', 'Animated Explainers', 'AI Videos', 'Podcasts', 'Training Films', 'Testimonial Videos'],
          buttonText: 'CLICK HERE',
          buttonLink: '/ad-agency'
        }
      };

      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Divisions Section</h2>
              <p>Manage the two main division cards and their points.</p>
            </div>
          </div>
          
          <div className="blocks-container">
            {['entertainment', 'enterprise'].map((divKey) => {
              const divData = divisions[divKey];
              return (
                <div key={divKey} className="content-block-panel mb-6">
                  <div className="block-header">
                    <span className="block-title capitalize">{divKey} Division</span>
                  </div>
                  
                  <div className="form-group">
                    <label>Title Line 1</label>
                    <input type="text" className="form-control" value={divData.title1} onChange={(e) => handleUpdateDivision(divKey, 'title1', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Title Line 2</label>
                    <input type="text" className="form-control" value={divData.title2} onChange={(e) => handleUpdateDivision(divKey, 'title2', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Description Text</label>
                    <textarea className="form-control" style={{minHeight: '80px'}} value={divData.description} onChange={(e) => handleUpdateDivision(divKey, 'description', e.target.value)} />
                  </div>
                  
                  <div className="form-group mt-4">
                    <label>Points</label>
                    {divData.points.map((pt, i) => (
                      <div key={i} style={{display: 'flex', gap: '0.5rem', marginBottom: '0.5rem'}}>
                        <input type="text" className="form-control" value={pt} onChange={(e) => handleUpdateDivisionPoint(divKey, i, e.target.value)} />
                        <button className="btn-icon text-red" onClick={() => handleRemoveDivisionPoint(divKey, i)}><Trash2 size={16}/></button>
                      </div>
                    ))}
                    <button className="btn-secondary mt-2" onClick={() => handleAddDivisionPoint(divKey)}>
                      <Plus size={14} /> Add Point
                    </button>
                  </div>

                  <div className="form-group mt-4">
                    <label>Button Text</label>
                    <input type="text" className="form-control" value={divData.buttonText} onChange={(e) => handleUpdateDivision(divKey, 'buttonText', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Button Link</label>
                    <input type="text" className="form-control" value={divData.buttonLink} onChange={(e) => handleUpdateDivision(divKey, 'buttonLink', e.target.value)} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Section Changes
            </button>
          </div>
        </div>
      );
    }
`;

code = code.replace('return (\n      <div className="empty-editor">', editorToAdd + '\n    return (\n      <div className="empty-editor">');

fs.writeFileSync('d:\\\\Meraki Movies\\\\Redash.in\\\\Final RedAsh Project\\\\admin\\\\src\\\\App.jsx', code);
console.log('Successfully injected editor for divisions');
