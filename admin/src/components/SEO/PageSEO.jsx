import React, { useState, useRef } from 'react';
import { Layers, FileText, CheckCircle, Upload, X, ShieldCheck, ChevronRight, Globe, AlertCircle } from 'lucide-react';
import LiveSERPPreview, { evaluateVariables } from './LiveSERPPreview';

// Page definitions grouped by domain profile
const DOMAIN_PAGE_DEFINITIONS = {
  main: [
    { key: 'home', name: 'Main Homepage', path: '/', category: 'Core Hub' },
    { key: 'entertainmentLanding', name: 'Entertainment Section', path: '/entertainment', category: 'Hub Sections' },
    { key: 'agencyLanding', name: 'Ad Agency Section', path: '/ad-agency', category: 'Hub Sections' },
    { key: 'blogPostTemplate', name: 'Blog Post Template', path: '/blog/:slug', category: 'Dynamic Templates' }
  ],
  films: [
    { key: 'home', name: 'Entertainment Home', path: '/', category: 'Entertainment' },
    { key: 'about', name: 'About Entertainment', path: '/about', category: 'Entertainment' },
    { key: 'films', name: 'Films, Shows & Microdramas', path: '/films', category: 'Entertainment' },
    { key: 'blog', name: 'Entertainment Blogs List', path: '/blog', category: 'Entertainment' },
    { key: 'media', name: 'Press & Media Coverage', path: '/media', category: 'Entertainment' },
    { key: 'contact', name: 'Contact & Pitch Entertainment', path: '/contact', category: 'Entertainment' },
    { key: 'blogPostTemplate', name: 'Entertainment Blog Article', path: '/blog/:slug', category: 'Dynamic Templates' }
  ],
  agency: [
    { key: 'home', name: 'Ad Agency Home', path: '/', category: 'Ad Agency' },
    { key: 'about', name: 'About Ad Agency', path: '/about', category: 'Ad Agency' },
    { key: 'films', name: 'Commercials Portfolio', path: '/films', category: 'Ad Agency' },
    { key: 'blog', name: 'Agency Insights Blog', path: '/blog', category: 'Ad Agency' },
    { key: 'media', name: 'Agency Media & Press', path: '/media', category: 'Ad Agency' },
    { key: 'contact', name: 'Hire Ad Agency / Contact', path: '/contact', category: 'Ad Agency' },
    { key: 'blogPostTemplate', name: 'Agency Blog Article', path: '/blog/:slug', category: 'Dynamic Templates' }
  ]
};

const PageSEO = ({
  domainKey = 'main',
  pages = {},
  global = {},
  onChange = () => {},
  onFocusField = () => {},
  onUploadImage = () => {}
}) => {
  const pageDefs = DOMAIN_PAGE_DEFINITIONS[domainKey] || DOMAIN_PAGE_DEFINITIONS.main;
  const [selectedPageKey, setSelectedPageKey] = useState(() => pageDefs[0]?.key || 'home');
  const pageImgRef = useRef(null);

  // If selectedPageKey is not in the current domain list, fallback to first
  const currentDef = pageDefs.find(p => p.key === selectedPageKey) || pageDefs[0];
  const activeKey = currentDef.key;
  const currentPage = pages[activeKey] || {};

  const handlePageFieldChange = (field, val) => {
    onChange({
      ...pages,
      [activeKey]: {
        ...currentPage,
        pageName: currentDef.name,
        path: currentDef.path,
        [field]: val
      }
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (onUploadImage) {
      const url = await onUploadImage(file);
      if (url) handlePageFieldChange('ogImage', url);
    }
  };

  // Determine fallback values for this page
  const pageVars = {
    page_name: currentDef.name,
    site_name: global.siteName || (domainKey === 'films' ? 'RedAsh Entertainment' : domainKey === 'agency' ? 'RedAsh Ad Agency' : 'RedAsh Films & Media'),
    category_name: currentDef.category,
    location: 'Mumbai, India',
    year: new Date().getFullYear().toString()
  };

  const effectiveTitle = currentPage.title || evaluateVariables(global.titleTemplate || '{page_name} | {site_name}', pageVars);
  const effectiveDesc = currentPage.description || global.description || '';
  const effectiveCanonical = currentPage.canonicalUrl || `${global.canonicalUrl || 'https://redash.in'}${currentDef.path === '/' ? '' : currentDef.path}`;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '290px 1fr', gap: '1.5rem', alignItems: 'start' }}>
      {/* Left Column: Page Selector Navigation */}
      <div>
        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.65rem' }}>
          Pages for {global.domain || (domainKey === 'films' ? 'films.redash.in' : domainKey === 'agency' ? 'agency.redash.in' : 'redash.in')}:
        </div>

        {/* Page List */}
        <div className="page-seo-nav">
          {pageDefs.map(def => {
            const pageData = pages[def.key] || {};
            const hasCustomTitle = Boolean(pageData.title);
            const isSelected = activeKey === def.key;

            return (
              <button
                key={def.key}
                type="button"
                className={`page-seo-nav-item ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedPageKey(def.key)}
              >
                <div>
                  <div className="page-item-title">{def.name}</div>
                  <div className="page-item-path">{def.path}</div>
                </div>
                <div>
                  {hasCustomTitle ? (
                    <span className="page-badge custom">Custom</span>
                  ) : (
                    <span className="page-badge inherited">Global</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Page SEO Settings Editor */}
      <div>
        <div className="seo-card">
          <div className="seo-card-header">
            <div>
              <h3>
                <FileText size={18} style={{ color: '#1672ef' }} /> {currentDef.name} SEO Settings
              </h3>
              <div className="seo-card-desc">
                Target Route: <code>{currentDef.path}</code> &bull; Leave any field empty to automatically inherit the domain default.
              </div>
            </div>
            <span className="page-badge custom" style={{ fontSize: '0.76rem', padding: '0.3rem 0.65rem' }}>
              {currentDef.category}
            </span>
          </div>

          {/* Page SEO Title */}
          <div className="seo-form-group">
            <div className="seo-label-row">
              <label className="seo-label">
                Page SEO Title
                {!currentPage.title && (
                  <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 'normal' }}>
                    (Inheriting: {effectiveTitle})
                  </span>
                )}
              </label>
            </div>
            <input
              type="text"
              className="seo-input"
              value={currentPage.title || ''}
              onChange={(e) => handlePageFieldChange('title', e.target.value)}
              onFocus={() => onFocusField(`pages.${activeKey}.title`)}
              placeholder={effectiveTitle}
            />
          </div>

          {/* Page Meta Description */}
          <div className="seo-form-group">
            <div className="seo-label-row">
              <label className="seo-label">
                Page Meta Description
                {!currentPage.description && (
                  <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 'normal' }}>
                    (Inheriting global description)
                  </span>
                )}
              </label>
            </div>
            <textarea
              className="seo-textarea"
              value={currentPage.description || ''}
              onChange={(e) => handlePageFieldChange('description', e.target.value)}
              onFocus={() => onFocusField(`pages.${activeKey}.description`)}
              placeholder={effectiveDesc}
            />
          </div>

          {/* Page Meta Keywords */}
          <div className="seo-form-group">
            <div className="seo-label-row">
              <label className="seo-label">Page Keywords</label>
            </div>
            <input
              type="text"
              className="seo-input"
              value={currentPage.keywords || ''}
              onChange={(e) => handlePageFieldChange('keywords', e.target.value)}
              onFocus={() => onFocusField(`pages.${activeKey}.keywords`)}
              placeholder="e.g. film production, web series, director ashish lal"
            />
          </div>

          {/* Canonical URL */}
          <div className="seo-form-group">
            <div className="seo-label-row">
              <label className="seo-label">Page Canonical URL</label>
            </div>
            <input
              type="url"
              className="seo-input"
              value={currentPage.canonicalUrl || ''}
              onChange={(e) => handlePageFieldChange('canonicalUrl', e.target.value)}
              placeholder={effectiveCanonical}
            />
          </div>

          {/* Robots Directive */}
          <div className="seo-form-group">
            <div className="seo-label-row">
              <label className="seo-label">Page Robots Meta</label>
            </div>
            <input
              type="text"
              className="seo-input"
              value={currentPage.robots || ''}
              onChange={(e) => handlePageFieldChange('robots', e.target.value)}
              placeholder="index, follow"
            />
          </div>

          {/* Page-Specific OG Image */}
          <div className="seo-form-group">
            <div className="seo-label-row">
              <label className="seo-label">Page-Specific Social Share Image</label>
            </div>
            <div className="seo-img-upload-row">
              {currentPage.ogImage ? (
                <div style={{ position: 'relative' }}>
                  <img src={currentPage.ogImage} alt="OG" className="seo-img-thumb" style={{ width: 80, height: 50 }} />
                  <button
                    type="button"
                    onClick={() => handlePageFieldChange('ogImage', '')}
                    style={{
                      position: 'absolute',
                      top: -6,
                      right: -6,
                      background: '#ef4444',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50%',
                      width: 18,
                      height: 18,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div style={{ width: 80, height: 50, background: '#f1f5f9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 11 }}>
                  Global OG
                </div>
              )}

              <div style={{ flex: 1, display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  className="seo-input"
                  value={currentPage.ogImage || ''}
                  onChange={(e) => handlePageFieldChange('ogImage', e.target.value)}
                  placeholder="Leave empty to use Global OG Image"
                />
                <button
                  type="button"
                  className="seo-btn seo-btn-secondary"
                  onClick={() => pageImgRef.current?.click()}
                >
                  <Upload size={14} /> Upload
                </button>
                <input
                  ref={pageImgRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>

          {/* Page Custom JSON-LD Schema */}
          <div className="seo-form-group">
            <div className="seo-label-row">
              <label className="seo-label">Page Custom Schema (JSON-LD)</label>
            </div>
            <textarea
              className="seo-code-editor"
              style={{ minHeight: 90 }}
              value={currentPage.customSchema || ''}
              onChange={(e) => handlePageFieldChange('customSchema', e.target.value)}
              placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "WebPage",\n  "name": "${currentDef.name}"\n}`}
            />
          </div>
        </div>

        {/* Live SERP Preview for Selected Page */}
        <div style={{ marginTop: '1.5rem' }}>
          <LiveSERPPreview
            title={effectiveTitle}
            description={effectiveDesc}
            url={effectiveCanonical}
            favicon={global.favicon}
            siteName={global.siteName}
            activeVars={pageVars}
          />
        </div>
      </div>
    </div>
  );
};

export default PageSEO;
