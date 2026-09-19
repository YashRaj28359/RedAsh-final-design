import React, { useState } from 'react';
import { FileCode, ExternalLink, RefreshCw, CheckCircle, ShieldAlert, FileText } from 'lucide-react';

const SitemapRobots = ({
  sitemap = {},
  robotsTxt = {},
  onChangeSitemap = () => {},
  onChangeRobots = () => {}
}) => {
  const [sitemapTestStatus, setSitemapTestStatus] = useState(null);

  const handleSitemapChange = (field, val) => {
    onChangeSitemap({
      ...sitemap,
      [field]: val
    });
  };

  const handleRobotsChange = (field, val) => {
    onChangeRobots({
      ...robotsTxt,
      [field]: val
    });
  };

  const presetAllowAll = `# Robots.txt for RedAsh Domains
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/admin/

# Search Engine Crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /`;

  const presetDisallowAll = `# Robots.txt - Staging / Noindex
User-agent: *
Disallow: /`;

  const presetStrictApi = `# Robots.txt - Enhanced Security
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /uploads/private/`;

  return (
    <div>
      {/* Dynamic XML Sitemap Settings */}
      <div className="seo-card">
        <div className="seo-card-header">
          <div>
            <h3>
              <FileCode size={18} style={{ color: '#1672ef' }} /> Dynamic XML Sitemap Generator
            </h3>
            <div className="seo-card-desc">
              Automatically generates a Google & Bing compliant <code>sitemap.xml</code> with published pages and dynamic blogs.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="seo-btn seo-btn-secondary"
              style={{ textDecoration: 'none' }}
            >
              <ExternalLink size={14} /> Open /sitemap.xml
            </a>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="seo-form-group">
            <label className="seo-label">Base Canonical URL</label>
            <input
              type="url"
              className="seo-input"
              value={sitemap.baseUrl || 'https://redash.in'}
              onChange={(e) => handleSitemapChange('baseUrl', e.target.value)}
              placeholder="https://redash.in"
            />
          </div>
          <div className="seo-form-group">
            <label className="seo-label">Default Change Frequency</label>
            <select
              className="seo-select"
              value={sitemap.defaultChangeFreq || 'weekly'}
              onChange={(e) => handleSitemapChange('defaultChangeFreq', e.target.value)}
            >
              <option value="daily">daily</option>
              <option value="weekly">weekly</option>
              <option value="monthly">monthly</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="seo-form-group">
            <label className="seo-label">Homepage Priority</label>
            <input
              type="text"
              className="seo-input"
              value={sitemap.homepagePriority || '1.0'}
              onChange={(e) => handleSitemapChange('homepagePriority', e.target.value)}
              placeholder="1.0"
            />
          </div>
          <div className="seo-form-group">
            <label className="seo-label">Dynamic Blog Posts Priority</label>
            <input
              type="text"
              className="seo-input"
              value={sitemap.blogPriority || '0.7'}
              onChange={(e) => handleSitemapChange('blogPriority', e.target.value)}
              placeholder="0.7"
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.86rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={sitemap.includeBlogs !== false}
              onChange={(e) => handleSitemapChange('includeBlogs', e.target.checked)}
            />
            <span>Include all published dynamic Blog Posts in sitemap</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.86rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={sitemap.includeEntertainmentSubdomain !== false}
              onChange={(e) => handleSitemapChange('includeEntertainmentSubdomain', e.target.checked)}
            />
            <span>Include Entertainment Division pages</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.86rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={sitemap.includeAgencySubdomain !== false}
              onChange={(e) => handleSitemapChange('includeAgencySubdomain', e.target.checked)}
            />
            <span>Include Ad Agency Division pages</span>
          </label>
        </div>
      </div>

      {/* Robots.txt Manager */}
      <div className="seo-card">
        <div className="seo-card-header">
          <div>
            <h3>
              <FileText size={18} style={{ color: '#1672ef' }} /> Robots.txt Directive Manager
            </h3>
            <div className="seo-card-desc">
              Controls search crawler access to website routes, directories, and admin panels.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="seo-btn seo-btn-secondary"
              style={{ textDecoration: 'none' }}
            >
              <ExternalLink size={14} /> Open /robots.txt
            </a>
          </div>
        </div>

        {/* Quick Presets */}
        <div style={{ marginBottom: '0.85rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748b', marginBottom: '0.35rem' }}>
            Quick Rules Presets:
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="seo-btn seo-btn-secondary"
              style={{ fontSize: '0.76rem', padding: '0.3rem 0.65rem' }}
              onClick={() => handleRobotsChange('customRules', presetAllowAll)}
            >
              Allow All (Standard Production)
            </button>
            <button
              type="button"
              className="seo-btn seo-btn-secondary"
              style={{ fontSize: '0.76rem', padding: '0.3rem 0.65rem' }}
              onClick={() => handleRobotsChange('customRules', presetStrictApi)}
            >
              Protect Admin & API Routes
            </button>
            <button
              type="button"
              className="seo-btn seo-btn-danger"
              style={{ fontSize: '0.76rem', padding: '0.3rem 0.65rem' }}
              onClick={() => handleRobotsChange('customRules', presetDisallowAll)}
            >
              Disallow All (Staging Mode)
            </button>
          </div>
        </div>

        <div className="seo-form-group">
          <textarea
            className="seo-code-editor"
            style={{ minHeight: 180 }}
            value={robotsTxt.customRules || presetAllowAll}
            onChange={(e) => handleRobotsChange('customRules', e.target.value)}
            placeholder="User-agent: *\nAllow: /"
          />
          <div className="seo-help-text">
            The server automatically appends <code>Sitemap: https://redash.in/sitemap.xml</code> to your rules when served.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitemapRobots;
