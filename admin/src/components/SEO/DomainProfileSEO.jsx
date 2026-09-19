import React, { useState } from 'react';
import { Globe, Film, Briefcase, Search, Share2, Layers, CheckCircle } from 'lucide-react';
import GeneralSEO from './GeneralSEO';
import SocialSEO from './SocialSEO';
import PageSEO from './PageSEO';
import LiveSERPPreview from './LiveSERPPreview';

const DOMAIN_CONFIGS = [
  {
    key: 'main',
    name: 'RedAsh Main Hub',
    domain: 'redash.in',
    badge: 'redash.in',
    icon: Globe,
    color: '#1672ef',
    desc: 'Main website hub and corporate landing page.'
  },
  {
    key: 'films',
    name: 'Entertainment & Films',
    domain: 'films.redash.in',
    badge: 'films.redash.in',
    icon: Film,
    color: '#e11d48',
    desc: 'Original fiction web series, vertical microdramas & films.'
  },
  {
    key: 'agency',
    name: 'Creative Ad Agency',
    domain: 'agency.redash.in',
    badge: 'agency.redash.in',
    icon: Briefcase,
    color: '#0284c7',
    desc: 'Commercial ad films, TVCs, and creative brand campaigns.'
  }
];

const DomainProfileSEO = ({
  seoState = {},
  onChange = () => {},
  onUploadImage = () => {}
}) => {
  const [activeDomainKey, setActiveDomainKey] = useState('main');
  const [activeSubTab, setActiveSubTab] = useState('general'); // 'general' | 'preview' | 'social' | 'pages'
  const [focusedField, setFocusedField] = useState('title');

  const currentDomainConfig = DOMAIN_CONFIGS.find(d => d.key === activeDomainKey) || DOMAIN_CONFIGS[0];
  const currentProfile = seoState[activeDomainKey] || {};

  const handleProfileChange = (updatedProfile) => {
    onChange({
      ...seoState,
      [activeDomainKey]: updatedProfile
    });
  };

  const handlePagesChange = (updatedPages) => {
    handleProfileChange({
      ...currentProfile,
      pages: updatedPages
    });
  };

  // Variable insertion handler
  const handleInsertVariable = (varTag) => {
    if (!focusedField) return;
    const currentVal = currentProfile[focusedField] || '';
    handleProfileChange({
      ...currentProfile,
      [focusedField]: `${currentVal} ${varTag}`.trim()
    });
  };

  return (
    <div>
      {/* 3-Domain Top Switcher Bar */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '0.85rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.65rem' }}>
          Select Domain / Subdomain Profile to Configure:
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
          {DOMAIN_CONFIGS.map(d => {
            const isSelected = activeDomainKey === d.key;
            const IconComponent = d.icon;
            return (
              <button
                key={d.key}
                type="button"
                onClick={() => {
                  setActiveDomainKey(d.key);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.85rem 1rem',
                  borderRadius: 10,
                  border: isSelected ? `2px solid ${d.color}` : '1px solid #e2e8f0',
                  background: isSelected ? '#f8fafc' : '#ffffff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 8,
                    background: isSelected ? d.color : '#f1f5f9',
                    color: isSelected ? '#ffffff' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <IconComponent size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.92rem', fontWeight: 700, color: isSelected ? '#0f172a' : '#334155' }}>
                      {d.name}
                    </span>
                    {isSelected && <CheckCircle size={14} style={{ color: d.color }} />}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: isSelected ? d.color : '#64748b', fontWeight: 600 }}>
                    https://{d.domain}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-Navigation Tabs for Active Domain */}
      <div className="seo-tabs-nav">
        <button
          type="button"
          className={`seo-tab-btn ${activeSubTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('general')}
        >
          <Globe size={15} /> General SEO
        </button>
        <button
          type="button"
          className={`seo-tab-btn ${activeSubTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('preview')}
        >
          <Search size={15} /> Live Search SERP Preview
        </button>
        <button
          type="button"
          className={`seo-tab-btn ${activeSubTab === 'social' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('social')}
        >
          <Share2 size={15} /> Social Sharing (OG & Twitter)
        </button>
        <button
          type="button"
          className={`seo-tab-btn ${activeSubTab === 'pages' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('pages')}
        >
          <Layers size={15} /> Page-Level SEO
        </button>
      </div>

      {/* Tab 1: General SEO */}
      {activeSubTab === 'general' && (
        <div className="seo-grid-layout">
          <div>
            <GeneralSEO
              global={currentProfile}
              onChange={handleProfileChange}
              onFocusField={setFocusedField}
              onUploadImage={onUploadImage}
            />
          </div>
          <div>
            <LiveSERPPreview
              title={currentProfile.title}
              description={currentProfile.description}
              url={currentProfile.canonicalUrl || `https://${currentDomainConfig.domain}`}
              favicon={currentProfile.favicon}
              siteName={currentProfile.siteName}
              onInsertVariable={handleInsertVariable}
              activeVars={{
                site_name: currentProfile.siteName,
                page_name: 'Home'
              }}
            />
          </div>
        </div>
      )}

      {/* Tab 2: Live Search SERP Preview Dedicated */}
      {activeSubTab === 'preview' && (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <LiveSERPPreview
            title={currentProfile.title}
            description={currentProfile.description}
            url={currentProfile.canonicalUrl || `https://${currentDomainConfig.domain}`}
            favicon={currentProfile.favicon}
            siteName={currentProfile.siteName}
            onInsertVariable={handleInsertVariable}
            activeVars={{
              site_name: currentProfile.siteName,
              page_name: 'Home'
            }}
          />
        </div>
      )}

      {/* Tab 3: Social Media (OG & Twitter) */}
      {activeSubTab === 'social' && (
        <SocialSEO
          global={currentProfile}
          onChange={handleProfileChange}
          onFocusField={setFocusedField}
          onUploadImage={onUploadImage}
        />
      )}

      {/* Tab 4: Page-Level SEO */}
      {activeSubTab === 'pages' && (
        <PageSEO
          domainKey={activeDomainKey}
          pages={currentProfile.pages || {}}
          global={currentProfile}
          onChange={handlePagesChange}
          onFocusField={setFocusedField}
          onUploadImage={onUploadImage}
        />
      )}
    </div>
  );
};

export default DomainProfileSEO;
