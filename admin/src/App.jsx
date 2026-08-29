import React, { useState } from 'react';
import './App.css';
import { Home, Film, Briefcase, Settings, LogOut, FileText, Image as ImageIcon, Layout, Phone, Info, Save, Eye, ChevronDown, Plus, Trash2, Edit2, PlayCircle } from 'lucide-react';

// Mock Data State
const initialContent = {
  homepage: {
    hero: {
      film_heading: 'FILM PRODUCTION HOUSE',
      ampersand: '&',
      ad_heading: 'AD AGENCY',
      year_text: '2007',
      year_subtext: "IIT ENGINEER'S VENTURE",
    }
  },
  entertainment: {
    hero: {
      heading: 'ENTERTAINMENT FILMS',
      description: 'Award winning original content.'
    }
  },
  agency: {
    hero: {
      heading: 'REDASH AD AGENCY.',
      description: 'MARKETING CAMPAIGNS.'
    }
  },
  shared: {
    navigation: {
      home: 'Home',
      about: 'About',
      entertainment: 'Entertainment Films',
      blog: 'Blog',
      media: 'Media',
      contact: 'Contact'
    }
  }
};

function App() {
  const [content, setContent] = useState(initialContent);
  const [activeSidebar, setActiveSidebar] = useState('homepage');
  const [activeSubMenu, setActiveSubMenu] = useState('hero');
  const [domain, setDomain] = useState('redashfilms.com');
  const [loading, setLoading] = useState(true);
  const [editingVideoIndex, setEditingVideoIndex] = useState(null);

  // Helper to extract YouTube ID
  const extractYouTubeId = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };

  // Fetch initial content from API
  React.useEffect(() => {
    fetch('http://localhost:5000/api/content')
      .then(res => res.json())
      .then(data => {
        let finalData = data;
        
        if (Object.keys(finalData).length > 0) {
          setContent(prev => ({
            ...prev,
            ...finalData
          }));
        } else {
          setContent(initialContent);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch content:', err);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/content/${activeSidebar}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: content[activeSidebar] })
      });
      if (res.ok) {
        alert('Changes saved successfully!');
      } else {
        alert('Failed to save changes.');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving changes.');
    }
  };

  // Handle field updates for flat structure
  const handleUpdate = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [activeSidebar]: {
        ...prev[activeSidebar],
        [section]: {
          ...prev[activeSidebar][section],
          [field]: value
        }
      }
    }));
  };

  // Handle dynamic block array updates specifically for homepage hero
  const handleUpdateBlock = (index, field, value) => {
    setContent(prev => {
      const newState = { ...prev };
      
      if (!newState.homepage) newState.homepage = {};
      if (!newState.homepage.hero) newState.homepage.hero = {};
      
      const currentBlocks = newState.homepage.hero.heading_blocks || [
        { id: 1, text: 'FILM', subtext: 'PRODUCTION HOUSE', bg_image: '', subtext_color: '#ef4444' },
        { id: 2, text: '&', subtext: '', bg_image: '', subtext_color: '#ef4444' },
        { id: 3, text: 'AD', subtext: 'AGENCY', bg_image: '', subtext_color: '#3b82f6' },
        { id: 4, text: '2007', subtext: "IIT ENGINEER'S VENTURE", bg_image: '', subtext_color: '#6b7280' }
      ];
      
      const updatedBlocks = [...currentBlocks];
      updatedBlocks[index] = { ...updatedBlocks[index], [field]: value };
      
      newState.homepage.hero.heading_blocks = updatedBlocks;
      return newState;
    });
  };

  const handleAddBlock = () => {
    setContent(prev => {
      const newState = { ...prev };
      const currentBlocks = newState.homepage.hero.heading_blocks || [];
      const updatedBlocks = [...currentBlocks];
      updatedBlocks.push({ 
        id: Date.now(), 
        text: '', 
        subtext: '', 
        bg_image: '',
        subtext_color: '#ef4444'
      });
      newState.homepage.hero.heading_blocks = updatedBlocks;
      return newState;
    });
  };

  const handleRemoveBlock = (index) => {
    setContent(prev => {
      const newState = { ...prev };
      const currentBlocks = newState.homepage.hero.heading_blocks || [];
      const updatedBlocks = [...currentBlocks];
      updatedBlocks.splice(index, 1);
      newState.homepage.hero.heading_blocks = updatedBlocks;
      return newState;
    });
  };

  // Handle Video Tile Updates
  const handleUpdateVideo = (index, field, value) => {
    setContent(prev => {
      const currentVideos = prev.homepage?.video_tile?.videos || [];
      const updatedVideos = [...currentVideos];
      
      updatedVideos[index] = { ...updatedVideos[index], [field]: value };
      
      // Auto-extract ID if URL changes
      if (field === 'url') {
        updatedVideos[index].id = extractYouTubeId(value) || updatedVideos[index].id;
        if (!updatedVideos[index].thumbnail && updatedVideos[index].id) {
          updatedVideos[index].thumbnail = `https://img.youtube.com/vi/${updatedVideos[index].id}/maxresdefault.jpg`;
        }
      }

      // Handle custom category fallback
      if (field === 'category' && value !== 'Custom') {
        updatedVideos[index].customCategory = '';
      }
      
      return {
        ...prev,
        homepage: {
          ...prev.homepage,
          video_tile: {
            ...prev.homepage?.video_tile,
            videos: updatedVideos
          }
        }
      };
    });
  };

  const handleAddVideo = () => {
    setContent(prev => {
      const currentVideos = prev.homepage?.video_tile?.videos || [];
      const updatedVideos = [...currentVideos];
      
      updatedVideos.push({
        uniqueId: Date.now().toString(),
        id: '',
        url: '',
        category: 'Bollywood Film',
        customCategory: '',
        color: '#ef4444', // Brand Red default
        thumbnail: ''
      });
      
      setEditingVideoIndex(updatedVideos.length - 1);
      
      return {
        ...prev,
        homepage: {
          ...prev.homepage,
          video_tile: {
            ...prev.homepage?.video_tile,
            videos: updatedVideos
          }
        }
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        handleUpdateVideo(editingVideoIndex, 'thumbnail', `http://localhost:5000${data.url}`);
      } else {
        alert('Upload failed: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading file');
    }
  };

  const handleRemoveVideo = (index) => {
    setContent(prev => {
      if (!prev.homepage?.video_tile?.videos) return prev;
      
      const updatedVideos = [...prev.homepage.video_tile.videos];
      updatedVideos.splice(index, 1);
      
      return {
        ...prev,
        homepage: {
          ...prev.homepage,
          video_tile: {
            ...prev.homepage.video_tile,
            videos: updatedVideos
          }
        }
      };
    });
  };

  
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
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.homepage?.divisions) return prev;
      newState.homepage.divisions[divisionKey].points[pointIndex] = value;
      return newState;
    });
  };

  const handleAddDivisionPoint = (divisionKey) => {
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.homepage?.divisions) return prev;
      newState.homepage.divisions[divisionKey].points.push('New Point');
      return newState;
    });
  };

  const handleRemoveDivisionPoint = (divisionKey, pointIndex) => {
    setContent(prev => {
      const newState = JSON.parse(JSON.stringify(prev));
      if (!newState.homepage?.divisions) return prev;
      newState.homepage.divisions[divisionKey].points.splice(pointIndex, 1);
      return newState;
    });
  };

  const getPreviewUrl = () => {
    switch (activeSidebar) {
      case 'homepage': return 'http://localhost:5173/';
      case 'entertainment': return 'http://localhost:5173/entertainment';
      case 'agency': return 'http://localhost:5173/ad-agency';
      default: return 'http://localhost:5173/';
    }
  };

  const renderSubMenu = () => {
    switch (activeSidebar) {
      case 'homepage':
        return (
          <>
            <div className="section-header">
              <h1>Homepage Sections</h1>
              <p>Update all homepage text content</p>
            </div>
            <div className="sub-nav">
              <button className={`sub-nav-item ${activeSubMenu === 'hero' ? 'active' : ''}`} onClick={() => setActiveSubMenu('hero')}>
                <div className="label-group"><Layout size={16} /> Hero Section</div>
                <div className="status-dot"></div>
              </button>
              <button className={`sub-nav-item ${activeSubMenu === 'video_tile' ? 'active' : ''}`} onClick={() => setActiveSubMenu('video_tile')}>
                <div className="label-group"><Layout size={16} /> Video Tile</div>
              </button>
              <button className={`sub-nav-item ${activeSubMenu === 'divisions' ? 'active' : ''}`} onClick={() => setActiveSubMenu('divisions')}>
                <div className="label-group"><Layout size={16} /> Divisions</div>
              </button>
              <button className="sub-nav-item">
                <div className="label-group"><Layout size={16} /> About Section</div>
              </button>
              <button className="sub-nav-item">
                <div className="label-group"><Layout size={16} /> CTA Button</div>
              </button>
            </div>
          </>
        );
      case 'shared':
        return (
          <>
            <div className="section-header">
              <h1>Shared Content</h1>
              <p>Manage content shared across sites</p>
            </div>
            <div className="sub-nav">
              <button className={`sub-nav-item ${activeSubMenu === 'navigation' ? 'active' : ''}`} onClick={() => setActiveSubMenu('navigation')}>
                <div className="label-group"><Layout size={16} /> Navigation Menu</div>
              </button>
              <button className="sub-nav-item">
                <div className="label-group"><Layout size={16} /> Common Buttons</div>
              </button>
              <button className="sub-nav-item">
                <div className="label-group"><Layout size={16} /> Footer Text</div>
              </button>
            </div>
          </>
        );
      default:
        return (
          <div className="section-header">
            <h1>Select a Section</h1>
          </div>
        );
    }
  };

  const renderEditor = () => {
    if (activeSidebar === 'homepage' && activeSubMenu === 'hero') {
      const data = content.homepage?.hero || { heading_blocks: [] };
      
      // Fallback to legacy fields if heading_blocks array doesn't exist yet
      const blocks = data.heading_blocks || [
        { id: 1, text: 'FILM', subtext: 'PRODUCTION HOUSE', bg_image: '', subtext_color: '#ef4444' },
        { id: 2, text: '&', subtext: '', bg_image: '', subtext_color: '#ef4444' },
        { id: 3, text: 'AD', subtext: 'AGENCY', bg_image: '', subtext_color: '#3b82f6' },
        { id: 4, text: '2007', subtext: "IIT ENGINEER'S VENTURE", bg_image: '', subtext_color: '#6b7280' }
      ];

      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Dynamic Hero Section</h2>
              <p>Add and manage headings with optional background images</p>
            </div>
          </div>
          
          <div className="blocks-container">
            {blocks.map((block, index) => (
              <div key={block.id} className="content-block-panel">
                <div className="block-header">
                  <span className="block-title">Heading Block {index + 1}</span>
                  <button className="btn-icon text-red" onClick={() => handleRemoveBlock(index)} title="Delete Block">
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <div className="form-group">
                  <label>Heading Text</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={block.text || ''}
                    onChange={(e) => handleUpdateBlock(index, 'text', e.target.value)}
                    placeholder="e.g. FILM PRODUCTION HOUSE"
                  />
                </div>
                <div className="form-group">
                  <label>Subtext (Optional)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={block.subtext || ''}
                    onChange={(e) => handleUpdateBlock(index, 'subtext', e.target.value)}
                    placeholder="e.g. IIT ENGINEER'S VENTURE"
                  />
                </div>
                <div className="form-group">
                  <label>Background Image URL (Optional)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={block.bg_image || ''}
                    onChange={(e) => handleUpdateBlock(index, 'bg_image', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                    <label>Subtext Color</label>
                    <select 
                      className="form-control custom-select" 
                      style={{ padding: '0.8rem 1rem', height: 'auto', cursor: 'pointer' }}
                      value={block.subtext_color || '#ef4444'}
                      onChange={(e) => handleUpdateBlock(index, 'subtext_color', e.target.value)}
                    >
                      <option value="#ef4444">Brand Red</option>
                      <option value="#6b7280">Brand Gray</option>
                      <option value="#3b82f6">Brand Blue</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="btn-outline-dashed mt-4" onClick={handleAddBlock}>
            <Plus size={16} /> Add New Heading Block
          </button>
          
          <div className="info-note mt-6">
            <div className="info-note-header">
              <Info size={16} /> Note
            </div>
            <p>You can add as many headings as you want. They will be rendered in order on the homepage hero section.</p>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Section Changes
            </button>
          </div>
        </div>
      );
    }
    
    if (activeSidebar === 'homepage' && activeSubMenu === 'video_tile') {
      const videoData = content.homepage?.video_tile?.videos || [];

      if (editingVideoIndex !== null && videoData.length > 0) {
        const video = videoData[editingVideoIndex];
        if (!video) {
          setEditingVideoIndex(null);
          return null;
        }

        return (
          <div className="editor-form-pane">
            <div className="form-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2>Edit Video</h2>
                <p>Configure video tile properties</p>
              </div>
              <button className="btn-secondary" onClick={() => setEditingVideoIndex(null)}>
                Back to List
              </button>
            </div>
            
            <div className="content-block-panel">
              <div className="form-group">
                <label>YouTube Video URL (Optional)</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={video.url || ''}
                  onChange={(e) => handleUpdateVideo(editingVideoIndex, 'url', e.target.value)}
                  placeholder="Leave empty if this is just a static tile"
                />
                {video.id && (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Extracted ID: {video.id}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label>Thumbnail Image</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ flex: 1 }}
                    value={video.thumbnail || ''}
                    onChange={(e) => handleUpdateVideo(editingVideoIndex, 'thumbnail', e.target.value)}
                    placeholder="Auto-fetches from YouTube if empty, or paste a URL"
                  />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>OR</span>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    id="thumbnail-upload"
                  />
                  <label htmlFor="thumbnail-upload" className="btn-secondary" style={{ cursor: 'pointer', margin: 0, padding: '0.6rem 1rem' }}>
                    Upload File
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Division</label>
                <select 
                  className="form-control custom-select" 
                  style={{ padding: '0.8rem 1rem', height: 'auto', cursor: 'pointer' }}
                  value={video.category || 'Bollywood Film'}
                  onChange={(e) => handleUpdateVideo(editingVideoIndex, 'category', e.target.value)}
                >
                  <option value="Bollywood Film">Bollywood Film</option>
                  <option value="TV Ad">TV Ad</option>
                  <option value="Web Series">Web Series</option>
                  <option value="Digital Ad Film">Digital Ad Film</option>
                  <option value="Custom">Custom (Type your own)</option>
                </select>
              </div>

              {video.category === 'Custom' && (
                <div className="form-group">
                  <label>Custom Division Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={video.customCategory || ''}
                    onChange={(e) => handleUpdateVideo(editingVideoIndex, 'customCategory', e.target.value)}
                    placeholder="e.g. Documentary"
                  />
                </div>
              )}

              <div className="form-group">
                <label>Tile Brand Color</label>
                <select 
                  className="form-control custom-select" 
                  style={{ padding: '0.8rem 1rem', height: 'auto', cursor: 'pointer' }}
                  value={video.color || '#ef4444'}
                  onChange={(e) => handleUpdateVideo(editingVideoIndex, 'color', e.target.value)}
                >
                  <option value="#ef4444">Brand Red</option>
                  <option value="#3b82f6">Brand Blue</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="btn-secondary" onClick={() => setEditingVideoIndex(null)}>
                Done Editing
              </button>
              <button className="btn-primary" onClick={handleSave}>
                <Save size={16} /> Save Changes
              </button>
            </div>
          </div>
        );
      }

      // List View
      return (
        <div className="editor-form-pane">
          <div className="form-header">
            <div>
              <h2>Video Tile Section</h2>
              <p>Manage the videos displayed on the homepage grid</p>
            </div>
          </div>
          
          <div className="blocks-container">
            {videoData.length === 0 ? (
              <div className="info-note mt-4 text-center">
                <p>No videos added yet. Click below to add your first video.</p>
              </div>
            ) : (
              videoData.map((video, index) => (
                <div key={video.uniqueId || index} className="content-block-panel" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
                  <div style={{ width: '80px', height: '45px', backgroundColor: '#000', borderRadius: '4px', overflow: 'hidden', flexShrink: 0, backgroundImage: `url(${video.thumbnail || `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    {!video.id && !video.thumbnail && <div style={{width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color:'#555'}}><PlayCircle size={20}/></div>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {video.category === 'Custom' ? video.customCategory : video.category}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {video.url ? video.url : 'No Link Provided'}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {video.category === 'Custom' ? video.customCategory : video.category} • <span style={{ color: video.color }}>{video.color === '#ef4444' ? 'Red Theme' : 'Blue Theme'}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-icon" onClick={() => setEditingVideoIndex(index)} title="Edit Video">
                      <Edit2 size={16} />
                    </button>
                    <button className="btn-icon text-red" onClick={() => handleRemoveVideo(index)} title="Delete Video">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <button className="btn-outline-dashed mt-4" onClick={handleAddVideo}>
            <Plus size={16} /> Add New Video
          </button>
          
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Section Changes
            </button>
          </div>
        </div>
      );
    }
    
    
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

    return (
      <div className="empty-editor">
        <FileText size={48} />
        <h2>Select a section to edit</h2>
        <p>Choose an item from the menu on the left to start editing content.</p>
      </div>
    );
  };

  return (
    <div className="cms-container">
      {/* Column 1: Sidebar */}
      <aside className="sidebar">
        <div className="logo-area">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          <h2>REDASH <span>ADMIN</span></h2>
        </div>
        
        <div className="sidebar-nav">
          <div className="nav-section-title">CONTENT</div>
          <button className={`nav-item ${activeSidebar === 'homepage' ? 'active' : ''}`} onClick={() => { setActiveSidebar('homepage'); setActiveSubMenu('hero'); }}>
            <Home size={18} /> Homepage
          </button>
          <button className={`nav-item ${activeSidebar === 'entertainment' ? 'active' : ''}`} onClick={() => setActiveSidebar('entertainment')}>
            <Film size={18} /> Entertainment Films
          </button>
          <button className={`nav-item ${activeSidebar === 'agency' ? 'active' : ''}`} onClick={() => setActiveSidebar('agency')}>
            <Briefcase size={18} /> Ad Agency
          </button>
          <button className={`nav-item ${activeSidebar === 'shared' ? 'active' : ''}`} onClick={() => setActiveSidebar('shared')}>
            <Layout size={18} /> Shared Content
          </button>
          <button className={`nav-item ${activeSidebar === 'media' ? 'active' : ''}`} onClick={() => setActiveSidebar('media')}>
            <ImageIcon size={18} /> Media Library
          </button>
          
          <div className="nav-section-title">SETTINGS</div>
          <button className="nav-item">
            <Settings size={18} /> General Settings
          </button>
          <button className="nav-item">
            <Settings size={18} /> Social Links
          </button>
        </div>
        
        <div className="user-footer">
          <div className="user-profile">
            <div className="user-avatar">A</div>
            <div className="user-info">
              <span className="name">Admin User</span>
              <span className="role">Super Admin</span>
            </div>
            <ChevronDown size={14} style={{marginLeft: 'auto', color: 'var(--text-muted)'}}/>
          </div>
        </div>
      </aside>

      {/* Column 2: Section Menu */}
      <div className="section-menu">
        {renderSubMenu()}
      </div>

      {/* Column 3: Main Editor Area */}
      <main className="main-editor-area">
        {/* Topbar */}
        <header className="editor-topbar">
          <div className="topbar-left">
            <div className="domain-select">
              <span>Active Domain / Subsite:</span>
              <div className="search-box">
                <select className="custom-select" value={domain} onChange={e => setDomain(e.target.value)}>
                  <option value="redashfilms.com">Main Website (redash.in)</option>
                  <option value="ent.redashfilms.com">Entertainment Films (ent.redash.in)</option>
                  <option value="agency.redashfilms.com">Ad Agency (agency.redash.in)</option>
                </select>
              </div>
            </div>
          </div>
          <div className="topbar-right">
            <button className="btn-primary" onClick={handleSave}>
              <Save size={16} /> Save Changes
            </button>
          </div>
        </header>

        {/* Editor Grid */}
        <div className="editor-grid">
          {renderEditor()}
        </div>
      </main>
    </div>
  );
}

export default App;
