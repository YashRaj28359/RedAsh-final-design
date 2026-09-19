import React, { useState, useRef } from 'react';
import {
  Upload,
  X,
  ChevronDown,
  ChevronUp,
  Layers,
  ShieldCheck,
  Link as LinkIcon,
  Globe,
  Image as ImageIcon
} from 'lucide-react';
import LiveSERPPreview from './LiveSERPPreview';
import { resolveImgUrl } from './SEOManager';

const DOMAIN_PAGE_MAP = {
  main: [
    { key: 'home', name: 'Homepage', path: '/' },
    { key: 'entertainmentLanding', name: 'Entertainment Section', path: '/entertainment' },
    { key: 'agencyLanding', name: 'Ad Agency Section', path: '/ad-agency' },
    { key: 'blogPostTemplate', name: 'Dynamic Blog Post Template', path: '/blog/:slug' }
  ],
  films: [
    { key: 'home', name: 'Entertainment Home', path: '/' },
    { key: 'about', name: 'About Entertainment', path: '/about' },
    { key: 'films', name: 'Films & Shows', path: '/films' },
    { key: 'blog', name: 'Entertainment Blogs', path: '/blog' },
    { key: 'media', name: 'Press & Media', path: '/media' },
    { key: 'contact', name: 'Contact & Pitch', path: '/contact' },
    { key: 'blogPostTemplate', name: 'Dynamic Blog Article', path: '/blog/:slug' }
  ],
  agency: [
    { key: 'home', name: 'Ad Agency Home', path: '/' },
    { key: 'about', name: 'About Ad Agency', path: '/about' },
    { key: 'films', name: 'Commercials Portfolio', path: '/films' },
    { key: 'blog', name: 'Agency Insights Blog', path: '/blog' },
    { key: 'media', name: 'Agency Media & Press', path: '/media' },
    { key: 'contact', name: 'Hire Ad Agency / Contact', path: '/contact' },
    { key: 'blogPostTemplate', name: 'Dynamic Blog Article', path: '/blog/:slug' }
  ]
};

const DOMAIN_DEFAULTS = {
  films: {
    title: 'Film Production Company & Ad Agency in India - RedAsh Films',
    description: 'Founded in 2007 by Ashish Lal, an engineer from IIT Delhi, RedAsh Films is a reputed Film Production Company & Ad Agency based in Mumbai.',
    logo: '/logos/redash-films-logo.png',
    name: 'RedAsh Entertainment'
  },
  agency: {
    title: 'RedAsh Ad Agency | High-Impact Brand Films & Commercials Mumbai',
    description: 'RedAsh Ad Agency produces high-converting TV commercials, corporate films, digital ad campaigns, and brand storytelling that drives massive ROI.',
    logo: '/logos/redash-agency-logo.png',
    name: 'RedAsh Ad Agency'
  },
  main: {
    title: 'RedAsh Films & Media | Premium Film Production & Creative Ad Agency Mumbai',
    description: 'RedAsh is a premier film production house and creative ad agency creating captivating films, digital series, microdramas, and high-converting brand commercials.',
    logo: '/logos/redash-main-logo.png',
    name: 'RedAsh Films & Media'
  }
};

const DomainSeoTab = ({
  domainKey = 'main',
  domainName = 'redash.in',
  displayName = 'RedAsh Main Hub',
  apiUrl = 'http://localhost:5000',
  profile = {},
  onChange = () => {},
  onUploadImage = () => {}
}) => {
  const [expandedPageKey, setExpandedPageKey] = useState(null);
  const ogImageInputRef = useRef(null);

  const defaults = DOMAIN_DEFAULTS[domainKey] || DOMAIN_DEFAULTS.main;

  const currentOgImage = profile.ogImage || defaults.logo;
  const pagesList = DOMAIN_PAGE_MAP[domainKey] || DOMAIN_PAGE_MAP.main;

  const handleFieldChange = (field, val) => {
    const updated = {
      ...profile,
      [field]: val
    };

    // Keep title and ogTitle synchronized by default
    if (field === 'title' && (!profile.ogTitle || profile.ogTitle === profile.title)) {
      updated.ogTitle = val;
    }
    if (field === 'description' && (!profile.ogDescription || profile.ogDescription === profile.description)) {
      updated.ogDescription = val;
    }

    onChange(updated);
  };

  const handlePageChange = (pageKey, pageField, val, defaultName, defaultPath) => {
    const existingPages = profile.pages || {};
    const existingPage = existingPages[pageKey] || {};
    onChange({
      ...profile,
      pages: {
        ...existingPages,
        [pageKey]: {
          ...existingPage,
          pageName: defaultName,
          path: defaultPath,
          [pageField]: val
        }
      }
    });
  };

  const handleOgImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (onUploadImage) {
      const url = await onUploadImage(file);
      if (url) {
        onChange({
          ...profile,
          ogImage: url,
          twitterImage: url
        });
      }
    }
  };

  const handleOgImageReset = () => {
    onChange({
      ...profile,
      ogImage: defaults.logo,
      twitterImage: defaults.logo
    });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 430px', gap: '1.75rem', alignItems: 'start' }}>
      {/* Left Column: Domain & Page SEO Controls */}
      <div>
        {/* Domain Top Hero Card */}
        <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', color: '#ffffff', borderRadius: 12, padding: '1.25rem 1.5rem', marginBottom: '1.25rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', fontWeight: 700 }}>
                Active Vertical Configuration
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0.2rem 0', color: '#ffffff' }}>
                {displayName}
              </h2>
              <div style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>
                Domain: <strong style={{ color: '#38bdf8' }}>https://{domainName}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '0.35rem 0.75rem', borderRadius: 6, fontSize: '0.78rem', fontWeight: 600, border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                ● WhatsApp &amp; Social Active
              </span>
            </div>
          </div>
        </div>

        {/* 1. PRIMARY CARD: WhatsApp & Social Share Link Preview Settings */}
        <div className="seo-card" style={{ borderLeft: '4px solid #15803d', marginBottom: '1.25rem', background: '#ffffff' }}>
          <div className="seo-card-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.15rem' }}>💬</span>
                <h3 style={{ margin: 0, color: '#15803d' }}>
                  WhatsApp &amp; Social Share Settings
                </h3>
              </div>
              <div className="seo-card-desc" style={{ marginTop: '0.3rem' }}>
                Configure the headline, description, and preview logo for <strong>https://{domainName}</strong> when shared on WhatsApp, Facebook, LinkedIn, Twitter, and iMessage.
              </div>
            </div>
          </div>

          {/* 1. Title Input */}
          <div className="seo-form-group" style={{ marginTop: '0.75rem' }}>
            <div className="seo-label-row">
              <label className="seo-label" style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.88rem' }}>
                1. Title (WhatsApp Headline)
              </label>
              <span style={{ fontSize: '0.74rem', color: (profile.title || defaults.title).length > 65 ? '#e11d48' : '#15803d', fontWeight: 600 }}>
                {(profile.title || defaults.title).length} / 60 chars
              </span>
            </div>
            <input
              type="text"
              className="seo-input"
              value={profile.title !== undefined ? profile.title : defaults.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder={`e.g. ${defaults.title}`}
              style={{ fontSize: '0.94rem', fontWeight: 600 }}
            />
            <div className="seo-help-text">
              Appears as the <strong>bold headline</strong> when sharing links on WhatsApp.
            </div>
          </div>

          {/* 2. Sub-Description Textarea */}
          <div className="seo-form-group">
            <div className="seo-label-row">
              <label className="seo-label" style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.88rem' }}>
                2. Sub-Description (WhatsApp Preview Paragraph)
              </label>
              <span style={{ fontSize: '0.74rem', color: (profile.description || defaults.description).length > 170 ? '#e11d48' : '#15803d', fontWeight: 600 }}>
                {(profile.description || defaults.description).length} / 160 chars
              </span>
            </div>
            <textarea
              className="seo-textarea"
              rows={3}
              value={profile.description !== undefined ? profile.description : defaults.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder={`e.g. ${defaults.description}`}
              style={{ fontSize: '0.88rem', lineHeight: 1.4 }}
            />
            <div className="seo-help-text">
              Appears as the <strong>body text</strong> beneath the headline in WhatsApp chat bubbles.
            </div>
          </div>

          {/* 3. WhatsApp Preview Logo / Banner Image */}
          <div className="seo-form-group" style={{ marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
            <div className="seo-label-row">
              <label className="seo-label" style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ImageIcon size={15} style={{ color: '#15803d' }} /> 3. WhatsApp Preview Logo / Banner Image
              </label>
            </div>

            <div className="seo-img-upload-row" style={{ marginTop: '0.5rem', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: 110, height: 64, background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 6, overflow: 'hidden' }}>
                <img
                  src={resolveImgUrl(currentOgImage, apiUrl)}
                  alt="WhatsApp Preview Logo"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaults.logo;
                  }}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    className="seo-input"
                    value={profile.ogImage || ''}
                    onChange={(e) => handleFieldChange('ogImage', e.target.value)}
                    placeholder={`Default: ${defaults.logo}`}
                    style={{ fontSize: '0.84rem' }}
                  />
                  <button
                    type="button"
                    className="seo-btn seo-btn-secondary"
                    onClick={() => ogImageInputRef.current?.click()}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <Upload size={14} /> Upload Banner
                  </button>
                  <button
                    type="button"
                    className="seo-btn seo-btn-secondary"
                    onClick={handleOgImageReset}
                    title="Reset to vertical default logo"
                  >
                    Reset
                  </button>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                  Default is the official vertical logo. Upload any custom 1200×630px image if preferred.
                </div>
              </div>

              <input
                ref={ogImageInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                style={{ display: 'none' }}
                onChange={handleOgImageUpload}
              />
            </div>
          </div>
        </div>

        {/* 2. Google SERP & Search Engine Details */}
        <div className="seo-card" style={{ marginBottom: '1.25rem' }}>
          <div className="seo-card-header">
            <div>
              <h3>
                <Globe size={18} style={{ color: '#1672ef' }} /> Google Search &amp; Indexing Settings
              </h3>
              <div className="seo-card-desc">
                Brand identifier, search keywords, canonical URL, and robot crawling directives.
              </div>
            </div>
          </div>

          {/* Brand / Site Name */}
          <div className="seo-form-group">
            <div className="seo-label-row">
              <label className="seo-label">Brand / Site Name (Google SERP Header)</label>
            </div>
            <input
              type="text"
              className="seo-input"
              value={profile.siteName || ''}
              onChange={(e) => handleFieldChange('siteName', e.target.value)}
              placeholder={`e.g. ${displayName}`}
            />
            <div className="seo-help-text">
              Displayed directly above your website URL in Google search snippets.
            </div>
          </div>

          {/* Meta Keywords */}
          <div className="seo-form-group">
            <div className="seo-label-row">
              <label className="seo-label">Meta Keywords</label>
            </div>
            <input
              type="text"
              className="seo-input"
              value={profile.keywords || ''}
              onChange={(e) => handleFieldChange('keywords', e.target.value)}
              placeholder="e.g. Film Production, Ad Agency, Web Series, Mumbai, Ashish Lal"
            />
          </div>

          {/* Canonical URL & Robots Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="seo-form-group">
              <label className="seo-label">
                <LinkIcon size={13} style={{ color: '#1672ef' }} /> Canonical URL
              </label>
              <input
                type="url"
                className="seo-input"
                value={profile.canonicalUrl || `https://${domainName}`}
                onChange={(e) => handleFieldChange('canonicalUrl', e.target.value)}
                placeholder={`https://${domainName}`}
              />
            </div>
            <div className="seo-form-group">
              <label className="seo-label">
                <ShieldCheck size={13} style={{ color: '#1672ef' }} /> Robots Directives
              </label>
              <input
                type="text"
                className="seo-input"
                value={profile.robots || 'index, follow'}
                onChange={(e) => handleFieldChange('robots', e.target.value)}
                placeholder="index, follow"
              />
            </div>
          </div>
        </div>

        {/* 3. Google Location & Social Profiles */}
        <div className="seo-card" style={{ marginBottom: '1.25rem' }}>
          <div className="seo-card-header">
            <div>
              <h3>
                📍 Google Maps Location &amp; Social Links
              </h3>
              <div className="seo-card-desc">
                Enables the Google Maps Knowledge Panel and links your social profiles to Google Search.
              </div>
            </div>
          </div>

          {/* Location URL */}
          <div className="seo-form-group">
            <label className="seo-label" style={{ color: '#dc2626' }}>
              📍 Google Maps / Business Location URL
            </label>
            <input
              type="url"
              className="seo-input"
              value={profile.googleLocationUrl || ''}
              onChange={(e) => handleFieldChange('googleLocationUrl', e.target.value)}
              placeholder="https://maps.google.com/?q=Peninsula+Park+Andheri+West+Mumbai+400053"
            />
          </div>

          {/* Social Media Links Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="seo-form-group">
              <label className="seo-label" style={{ color: '#e1306c' }}>
                📷 Instagram Profile URL
              </label>
              <input
                type="url"
                className="seo-input"
                value={profile.instagramUrl || ''}
                onChange={(e) => handleFieldChange('instagramUrl', e.target.value)}
                placeholder="https://www.instagram.com/redashfilms/"
              />
            </div>

            <div className="seo-form-group">
              <label className="seo-label" style={{ color: '#0a66c2' }}>
                💼 LinkedIn Company URL
              </label>
              <input
                type="url"
                className="seo-input"
                value={profile.linkedinUrl || ''}
                onChange={(e) => handleFieldChange('linkedinUrl', e.target.value)}
                placeholder="https://www.linkedin.com/company/redashfilms/"
              />
            </div>

            <div className="seo-form-group">
              <label className="seo-label" style={{ color: '#ff0000' }}>
                ▶️ YouTube Channel URL
              </label>
              <input
                type="url"
                className="seo-input"
                value={profile.youtubeUrl || ''}
                onChange={(e) => handleFieldChange('youtubeUrl', e.target.value)}
                placeholder="https://www.youtube.com/@RedAshFilms"
              />
            </div>

            <div className="seo-form-group">
              <label className="seo-label" style={{ color: '#1877f2' }}>
                🌐 Facebook Page URL
              </label>
              <input
                type="url"
                className="seo-input"
                value={profile.facebookUrl || ''}
                onChange={(e) => handleFieldChange('facebookUrl', e.target.value)}
                placeholder="https://www.facebook.com/redashfilms"
              />
            </div>
          </div>
        </div>

        {/* 4. Subpages Specific SEO */}
        <div className="seo-card">
          <div className="seo-card-header">
            <div>
              <h3>
                <Layers size={18} style={{ color: '#1672ef' }} /> Subpages Specific SEO ({pagesList.length} Pages)
              </h3>
              <div className="seo-card-desc">
                Click any page to override its specific title and sub-description.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {pagesList.map(p => {
              const pageData = profile.pages?.[p.key] || {};
              const isExpanded = expandedPageKey === p.key;
              const hasCustomTitle = Boolean(pageData.title);
              const hasCustomDesc = Boolean(pageData.description);
              const pageFullUrl = `https://${domainName}${p.path === '/' ? '' : p.path}`;
              const defaultTitle = `${p.name} | ${profile.siteName || displayName}`;

              return (
                <div
                  key={p.key}
                  style={{
                    border: isExpanded ? '1px solid #1672ef' : '1px solid #e2e8f0',
                    borderRadius: 10,
                    overflow: 'hidden',
                    background: '#ffffff',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div
                    onClick={() => setExpandedPageKey(isExpanded ? null : p.key)}
                    style={{
                      padding: '0.8rem 1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: isExpanded ? '#f8fafc' : '#ffffff',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{p.name}</span>
                        <span style={{ fontSize: '0.74rem', background: '#f1f5f9', padding: '0.15rem 0.5rem', borderRadius: 4, color: '#1672ef', fontWeight: 500 }}>
                          🔗 {p.path}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>
                        {pageData.title ? `Title: "${pageData.title}"` : `Default: "${defaultTitle}"`}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {hasCustomTitle || hasCustomDesc ? (
                        <span className="page-badge custom">Custom</span>
                      ) : (
                        <span className="page-badge inherited">Default</span>
                      )}
                      {isExpanded ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div style={{ padding: '1.1rem', borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
                      <div className="seo-form-group">
                        <label className="seo-label">Page Title</label>
                        <input
                          type="text"
                          className="seo-input"
                          value={pageData.title || ''}
                          onChange={(e) => handlePageChange(p.key, 'title', e.target.value, p.name, p.path)}
                          placeholder={`Default: ${defaultTitle}`}
                        />
                      </div>

                      <div className="seo-form-group">
                        <label className="seo-label">Page Sub-Description</label>
                        <textarea
                          className="seo-textarea"
                          value={pageData.description || ''}
                          onChange={(e) => handlePageChange(p.key, 'description', e.target.value, p.name, p.path)}
                          placeholder={`Enter description for ${pageFullUrl}...`}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <div>
                          <label className="seo-label">Page Keywords</label>
                          <input
                            type="text"
                            className="seo-input"
                            value={pageData.keywords || ''}
                            onChange={(e) => handlePageChange(p.key, 'keywords', e.target.value, p.name, p.path)}
                            placeholder="e.g. film production, web series"
                          />
                        </div>
                        <div>
                          <label className="seo-label">Canonical URL</label>
                          <input
                            type="url"
                            className="seo-input"
                            value={pageData.canonicalUrl || ''}
                            onChange={(e) => handlePageChange(p.key, 'canonicalUrl', e.target.value, p.name, p.path)}
                            placeholder={pageFullUrl}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: Sticky Real-Time Live Preview (WhatsApp Bubble & Google SERP) */}
      <div style={{ position: 'sticky', top: '1rem' }}>
        <LiveSERPPreview
          title={profile.title !== undefined ? profile.title : defaults.title}
          description={profile.description !== undefined ? profile.description : defaults.description}
          ogTitle={profile.ogTitle || profile.title || defaults.title}
          ogDescription={profile.ogDescription || profile.description || defaults.description}
          ogImage={profile.ogImage || defaults.logo}
          url={profile.canonicalUrl || `https://${domainName}`}
          favicon="/logos/redash-main-logo.png"
          apiUrl={apiUrl}
          siteName={profile.siteName || displayName}
          domainName={domainName}
          domainKey={domainKey}
          googleLocationUrl={profile.googleLocationUrl}
          instagramUrl={profile.instagramUrl}
          linkedinUrl={profile.linkedinUrl}
          activeVars={{
            site_name: profile.siteName || displayName,
            page_name: 'Home'
          }}
        />
      </div>
    </div>
  );
};

export default DomainSeoTab;
