import React, { useState, useEffect } from 'react';
import './seoStyles.css';
import {
  Globe,
  Film,
  Briefcase,
  Save,
  RotateCcw,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import DomainSeoTab from './DomainSeoTab';

export const resolveImgUrl = (url, apiUrl = 'http://localhost:5000') => {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) return trimmed;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  if (trimmed.startsWith('/uploads/') || trimmed.startsWith('uploads/')) {
    const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
    return `${apiUrl.replace(/\/$/, '')}${cleanPath}`;
  }
  return trimmed;
};

const SEOManager = ({
  apiUrl = 'http://localhost:5000',
  authToken = null,
  showToast = () => {}
}) => {
  const [seoState, setSeoState] = useState(null);
  const [originalState, setOriginalState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('main'); // 'main' | 'films' | 'agency'

  const getAdminToken = () => {
    return authToken ||
      sessionStorage.getItem('redash_admin_token') ||
      sessionStorage.getItem('adminToken') ||
      localStorage.getItem('redash_admin_token') ||
      localStorage.getItem('adminToken') ||
      '';
  };

  // Fetch current SEO configuration on mount
  const fetchSeoSettings = async () => {
    try {
      setIsLoading(true);
      const headers = {};
      const token = getAdminToken();
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${apiUrl}/api/admin/seo?t=${Date.now()}`, { headers });
      if (!res.ok) {
        const pubRes = await fetch(`${apiUrl}/api/seo?t=${Date.now()}`);
        if (pubRes.ok) {
          const data = await pubRes.json();
          setSeoState(data);
          setOriginalState(JSON.stringify(data));
        }
      } else {
        const data = await res.json();
        setSeoState(data);
        setOriginalState(JSON.stringify(data));
      }
    } catch (err) {
      console.error('Error fetching SEO settings:', err);
      showToast('Could not load SEO settings from server', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSeoSettings();
  }, []);

  const hasUnsavedChanges = seoState && originalState && JSON.stringify(seoState) !== originalState;

  // Handle Save
  const handleSave = async () => {
    if (!seoState) return;
    try {
      setIsSaving(true);
      const headers = { 'Content-Type': 'application/json' };
      const token = getAdminToken();
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${apiUrl}/api/admin/seo`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ data: seoState })
      });

      const json = await res.json();
      if (res.ok) {
        showToast('SEO settings saved and published successfully!', 'success');
        setOriginalState(JSON.stringify(seoState));
      } else {
        showToast(json.message || 'Failed to save SEO settings', 'error');
      }
    } catch (err) {
      console.error('Save error:', err);
      showToast(`Error saving SEO: ${err.message}`, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Reset
  const handleReset = async () => {
    if (!window.confirm('Are you sure you want to reset all SEO settings across the 3 domains to defaults?')) {
      return;
    }
    try {
      setIsSaving(true);
      const headers = { 'Content-Type': 'application/json' };
      const token = getAdminToken();
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${apiUrl}/api/admin/seo/reset`, {
        method: 'POST',
        headers
      });

      const json = await res.json();
      if (res.ok) {
        showToast('SEO settings reset to defaults successfully!', 'success');
        setSeoState(json.seo);
        setOriginalState(JSON.stringify(json.seo));
      } else {
        showToast(json.message || 'Failed to reset SEO settings', 'error');
      }
    } catch (err) {
      console.error('Reset error:', err);
      showToast(`Error resetting SEO: ${err.message}`, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Image Upload Helper
  const handleUploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const token = getAdminToken();
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${apiUrl}/api/upload`, {
        method: 'POST',
        headers,
        body: formData
      });

      if (!res.ok) throw new Error('Failed to upload image');
      const data = await res.json();
      return data.url || data.imageUrl || data.filePath;
    } catch (err) {
      console.error('Image upload failed:', err);
      showToast('Image upload failed', 'error');
      return null;
    }
  };

  if (isLoading) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: '#64748b' }}>
        <div style={{ display: 'inline-block', width: 32, height: 32, border: '3px solid #e2e8f0', borderTopColor: '#1672ef', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <div style={{ marginTop: '1rem', fontWeight: 600 }}>Loading SEO Manager...</div>
      </div>
    );
  }

  const handleDomainChange = async (domainKey, updatedProfile, autoSave = false) => {
    const updated = {
      ...seoState,
      [domainKey]: updatedProfile
    };
    setSeoState(updated);

    if (autoSave) {
      try {
        const headers = { 'Content-Type': 'application/json' };
        const token = getAdminToken();
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(`${apiUrl}/api/admin/seo`, {
          method: 'PUT',
          headers,
          body: JSON.stringify({ data: updated })
        });

        if (res.ok) {
          showToast(`${domainKey === 'films' ? 'Entertainment' : domainKey === 'agency' ? 'Ad Agency' : 'Main Hub'} favicon updated and published!`, 'success');
          setOriginalState(JSON.stringify(updated));
        }
      } catch (err) {
        console.error('Auto-save favicon error:', err);
      }
    }
  };

  return (
    <div className="seo-suite-container">
      {/* Top Header Bar */}
      <div className="seo-header-bar">
        <div className="seo-title-group">
          <h1>
            <Globe size={26} style={{ color: '#1672ef' }} /> SEO Settings Manager
          </h1>
          <p>
            Configure live search metadata, Google SERP previews, and social share cards for <strong>redash.in</strong>, <strong>films.redash.in</strong>, and <strong>agency.redash.in</strong>.
          </p>
        </div>

        <div className="seo-actions-group">
          <button
            type="button"
            className="seo-btn seo-btn-secondary"
            onClick={handleReset}
            disabled={isSaving}
          >
            <RotateCcw size={15} /> Reset Defaults
          </button>
          <a
            href="https://redash.in"
            target="_blank"
            rel="noopener noreferrer"
            className="seo-btn seo-btn-secondary"
            style={{ textDecoration: 'none' }}
          >
            <ExternalLink size={15} /> Live Website
          </a>
          <button
            type="button"
            className="seo-btn seo-btn-primary"
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save size={15} /> {isSaving ? 'Saving...' : 'Save & Publish SEO'}
          </button>
        </div>
      </div>

      {/* Unsaved Changes Banner */}
      {hasUnsavedChanges && (
        <div className="seo-unsaved-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={16} />
            <span>You have unsaved SEO changes. Click "Save & Publish SEO" to apply them.</span>
          </div>
          <button
            type="button"
            className="seo-btn seo-btn-primary"
            style={{ padding: '0.35rem 0.8rem', fontSize: '0.78rem' }}
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Now'}
          </button>
        </div>
      )}

      {/* 3 Dedicated Domain Tabs ONLY */}
      <div className="seo-tabs-nav" style={{ background: '#e2e8f0', padding: '0.4rem', borderRadius: 12, marginBottom: '1.5rem' }}>
        <button
          type="button"
          className={`seo-tab-btn ${activeTab === 'main' ? 'active' : ''}`}
          onClick={() => setActiveTab('main')}
          style={{ padding: '0.75rem 1.4rem', fontSize: '0.92rem', flex: 1, justifyContent: 'center' }}
        >
          <Globe size={18} style={{ color: '#1672ef' }} /> redash.in (Main Hub)
        </button>
        <button
          type="button"
          className={`seo-tab-btn ${activeTab === 'films' ? 'active' : ''}`}
          onClick={() => setActiveTab('films')}
          style={{ padding: '0.75rem 1.4rem', fontSize: '0.92rem', flex: 1, justifyContent: 'center' }}
        >
          <Film size={18} style={{ color: '#e11d48' }} /> films.redash.in (Entertainment)
        </button>
        <button
          type="button"
          className={`seo-tab-btn ${activeTab === 'agency' ? 'active' : ''}`}
          onClick={() => setActiveTab('agency')}
          style={{ padding: '0.75rem 1.4rem', fontSize: '0.92rem', flex: 1, justifyContent: 'center' }}
        >
          <Briefcase size={18} style={{ color: '#0284c7' }} /> agency.redash.in (Ad Agency)
        </button>
      </div>

      {/* Active Domain Tab Content */}
      {seoState && (
        <div>
          {/* Tab 1: redash.in (Main Hub) */}
          {activeTab === 'main' && (
            <DomainSeoTab
              domainKey="main"
              domainName="redash.in"
              displayName="RedAsh Main Hub"
              apiUrl={apiUrl}
              profile={seoState.main || {}}
              onChange={(updatedMain, autoSave) => handleDomainChange('main', updatedMain, autoSave)}
              onUploadImage={handleUploadImage}
            />
          )}

          {/* Tab 2: films.redash.in (Entertainment) */}
          {activeTab === 'films' && (
            <DomainSeoTab
              domainKey="films"
              domainName="films.redash.in"
              displayName="RedAsh Entertainment"
              apiUrl={apiUrl}
              profile={seoState.films || {}}
              onChange={(updatedFilms, autoSave) => handleDomainChange('films', updatedFilms, autoSave)}
              onUploadImage={handleUploadImage}
            />
          )}

          {/* Tab 3: agency.redash.in (Ad Agency) */}
          {activeTab === 'agency' && (
            <DomainSeoTab
              domainKey="agency"
              domainName="agency.redash.in"
              displayName="RedAsh Ad Agency"
              apiUrl={apiUrl}
              profile={seoState.agency || {}}
              onChange={(updatedAgency, autoSave) => handleDomainChange('agency', updatedAgency, autoSave)}
              onUploadImage={handleUploadImage}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SEOManager;
