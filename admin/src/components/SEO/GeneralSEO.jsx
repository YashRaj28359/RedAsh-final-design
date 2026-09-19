import React, { useRef } from 'react';
import { Upload, X, HelpCircle, Link as LinkIcon, ShieldCheck } from 'lucide-react';

const GeneralSEO = ({
  global = {},
  onChange = () => {},
  onFocusField = () => {},
  onUploadImage = () => {}
}) => {
  const faviconInputRef = useRef(null);

  const handleFieldChange = (field, val) => {
    onChange({
      ...global,
      [field]: val
    });
  };

  const handleFaviconUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (onUploadImage) {
      const url = await onUploadImage(file);
      if (url) {
        handleFieldChange('favicon', url);
      }
    }
  };

  const robotsPresets = [
    'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    'index, follow',
    'noindex, follow',
    'index, nofollow',
    'noindex, nofollow'
  ];

  return (
    <div className="seo-card">
      <div className="seo-card-header">
        <div>
          <h3>Global SEO Configuration</h3>
          <div className="seo-card-desc">
            Primary default meta tags applied across all website pages unless overridden by page-level settings.
          </div>
        </div>
      </div>

      {/* Website SEO Title */}
      <div className="seo-form-group">
        <div className="seo-label-row">
          <label className="seo-label">
            Website SEO Title
          </label>
        </div>
        <input
          type="text"
          className="seo-input"
          value={global.title || ''}
          onChange={(e) => handleFieldChange('title', e.target.value)}
          onFocus={() => onFocusField('title')}
          placeholder="e.g. RedAsh Films & Media | Premium Film Production & Creative Ad Agency"
        />
        <div className="seo-help-text">
          The main SEO title for the root website. Optimal length: 50–60 characters.
        </div>
      </div>

      {/* SEO Title Template */}
      <div className="seo-form-group">
        <div className="seo-label-row">
          <label className="seo-label">
            SEO Title Template
          </label>
        </div>
        <input
          type="text"
          className="seo-input"
          value={global.titleTemplate || ''}
          onChange={(e) => handleFieldChange('titleTemplate', e.target.value)}
          onFocus={() => onFocusField('titleTemplate')}
          placeholder="e.g. {page_name} | {site_name}"
        />
        <div className="seo-help-text">
          Template used to format title tags for internal pages. Use <code>{'{page_name}'}</code> and <code>{'{site_name}'}</code>.
        </div>
      </div>

      {/* Meta Description */}
      <div className="seo-form-group">
        <div className="seo-label-row">
          <label className="seo-label">
            Meta Description
          </label>
        </div>
        <textarea
          className="seo-textarea"
          value={global.description || ''}
          onChange={(e) => handleFieldChange('description', e.target.value)}
          onFocus={() => onFocusField('description')}
          placeholder="e.g. RedAsh is a premier film production house and creative ad agency creating captivating films, digital series, microdramas, and brand commercials."
        />
        <div className="seo-help-text">
          Summary displayed in search engine results snippets. Optimal length: 150–160 characters.
        </div>
      </div>

      {/* Meta Keywords */}
      <div className="seo-form-group">
        <div className="seo-label-row">
          <label className="seo-label">
            Meta Keywords
          </label>
        </div>
        <input
          type="text"
          className="seo-input"
          value={global.keywords || ''}
          onChange={(e) => handleFieldChange('keywords', e.target.value)}
          onFocus={() => onFocusField('keywords')}
          placeholder="e.g. RedAsh, RedAsh Films, film production, advertising agency, microdrama, web series"
        />
        <div className="seo-help-text">
          Comma-separated list of target keywords relevant to your brand and services.
        </div>
      </div>

      {/* Canonical URL */}
      <div className="seo-form-group">
        <div className="seo-label-row">
          <label className="seo-label">
            <LinkIcon size={14} style={{ color: '#1672ef' }} /> Canonical Base URL
          </label>
        </div>
        <input
          type="url"
          className="seo-input"
          value={global.canonicalUrl || ''}
          onChange={(e) => handleFieldChange('canonicalUrl', e.target.value)}
          onFocus={() => onFocusField('canonicalUrl')}
          placeholder="https://redash.in"
        />
        <div className="seo-help-text">
          The definitive primary domain for avoiding duplicate content penalties across protocol/subdomain variants.
        </div>
      </div>

      {/* Robots Meta */}
      <div className="seo-form-group">
        <div className="seo-label-row">
          <label className="seo-label">
            <ShieldCheck size={14} style={{ color: '#1672ef' }} /> Robots Meta Directive
          </label>
        </div>
        <input
          type="text"
          className="seo-input"
          value={global.robots || ''}
          onChange={(e) => handleFieldChange('robots', e.target.value)}
          placeholder="index, follow"
        />
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.45rem' }}>
          {robotsPresets.map(preset => (
            <button
              key={preset}
              type="button"
              className="seo-var-chip"
              onClick={() => handleFieldChange('robots', preset)}
            >
              {preset.split(',')[0]}
            </button>
          ))}
        </div>
        <div className="seo-help-text">
          Tells search engines how to crawl and index pages (e.g. <code>index, follow</code>).
        </div>
      </div>

      {/* Favicon */}
      <div className="seo-form-group">
        <div className="seo-label-row">
          <label className="seo-label">Website Favicon</label>
        </div>
        <div className="seo-img-upload-row">
          {global.favicon ? (
            <div style={{ position: 'relative' }}>
              <img src={global.favicon} alt="Favicon" className="seo-img-thumb" style={{ width: 44, height: 44 }} />
              <button
                type="button"
                onClick={() => handleFieldChange('favicon', '')}
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
            <div style={{ width: 44, height: 44, background: '#f1f5f9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 11 }}>
              No Icon
            </div>
          )}

          <div style={{ flex: 1, display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              className="seo-input"
              value={global.favicon || ''}
              onChange={(e) => handleFieldChange('favicon', e.target.value)}
              placeholder="Favicon URL or upload .svg / .ico / .png"
            />
            <button
              type="button"
              className="seo-btn seo-btn-secondary"
              onClick={() => faviconInputRef.current?.click()}
            >
              <Upload size={14} /> Upload
            </button>
            <input
              ref={faviconInputRef}
              type="file"
              accept=".svg,.ico,.png,.jpg"
              style={{ display: 'none' }}
              onChange={handleFaviconUpload}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSEO;
