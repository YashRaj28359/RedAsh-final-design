import React from 'react';
import { Search, BarChart3, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

const VerificationAnalytics = ({
  global = {},
  onChange = () => {}
}) => {
  const handleFieldChange = (field, val) => {
    onChange({
      ...global,
      [field]: val
    });
  };

  return (
    <div>
      {/* Search Engine Webmaster Verification */}
      <div className="seo-card">
        <div className="seo-card-header">
          <div>
            <h3>
              <Search size={18} style={{ color: '#1672ef' }} /> Webmaster Search Verification
            </h3>
            <div className="seo-card-desc">
              Verify website ownership with Google Search Console and Bing Webmaster Tools.
            </div>
          </div>
        </div>

        {/* Google Site Verification */}
        <div className="seo-form-group">
          <div className="seo-label-row">
            <label className="seo-label">
              Google Site Verification Code / HTML Tag
            </label>
            {global.googleSiteVerification ? (
              <span className="seo-char-badge optimal" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <CheckCircle2 size={12} /> Connected
              </span>
            ) : (
              <span className="seo-char-badge short">Not Configured</span>
            )}
          </div>
          <input
            type="text"
            className="seo-input"
            value={global.googleSiteVerification || ''}
            onChange={(e) => handleFieldChange('googleSiteVerification', e.target.value)}
            placeholder="e.g. dZ9a... or <meta name='google-site-verification' content='dZ9a...'>"
          />
          <div className="seo-help-text">
            Enter either the verification string or the full HTML tag provided in Google Search Console under "HTML tag" method.
          </div>
        </div>

        {/* Bing Webmaster Verification */}
        <div className="seo-form-group">
          <div className="seo-label-row">
            <label className="seo-label">
              Bing Webmaster Verification Code
            </label>
            {global.bingSiteVerification ? (
              <span className="seo-char-badge optimal" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <CheckCircle2 size={12} /> Connected
              </span>
            ) : (
              <span className="seo-char-badge short">Not Configured</span>
            )}
          </div>
          <input
            type="text"
            className="seo-input"
            value={global.bingSiteVerification || ''}
            onChange={(e) => handleFieldChange('bingSiteVerification', e.target.value)}
            placeholder="e.g. 789456123ABCDEF..."
          />
          <div className="seo-help-text">
            Enter the <code>msvalidate.01</code> authentication string from Bing Webmaster Tools.
          </div>
        </div>
      </div>

      {/* Analytics & Tag Management */}
      <div className="seo-card">
        <div className="seo-card-header">
          <div>
            <h3>
              <BarChart3 size={18} style={{ color: '#1672ef' }} /> Tracking & Analytics Integration
            </h3>
            <div className="seo-card-desc">
              Direct integration for Google Analytics (GA4) and Google Tag Manager (GTM).
            </div>
          </div>
        </div>

        {/* Google Analytics 4 */}
        <div className="seo-form-group">
          <div className="seo-label-row">
            <label className="seo-label">
              Google Analytics 4 (GA4) Measurement ID
            </label>
            {global.googleAnalyticsId ? (
              <span className="seo-char-badge optimal" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <CheckCircle2 size={12} /> Active (GA4)
              </span>
            ) : (
              <span className="seo-char-badge short">Inactive</span>
            )}
          </div>
          <input
            type="text"
            className="seo-input"
            value={global.googleAnalyticsId || ''}
            onChange={(e) => handleFieldChange('googleAnalyticsId', e.target.value)}
            placeholder="e.g. G-XXXXXXXXXX"
          />
          <div className="seo-help-text">
            When provided, the global site tag (gtag.js) is automatically injected on all live client pages.
          </div>
        </div>

        {/* Google Tag Manager */}
        <div className="seo-form-group">
          <div className="seo-label-row">
            <label className="seo-label">
              Google Tag Manager (GTM) Container ID
            </label>
            {global.googleTagManagerId ? (
              <span className="seo-char-badge optimal" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <CheckCircle2 size={12} /> Active (GTM)
              </span>
            ) : (
              <span className="seo-char-badge short">Inactive</span>
            )}
          </div>
          <input
            type="text"
            className="seo-input"
            value={global.googleTagManagerId || ''}
            onChange={(e) => handleFieldChange('googleTagManagerId', e.target.value)}
            placeholder="e.g. GTM-XXXXXXX"
          />
          <div className="seo-help-text">
            Injects the official Google Tag Manager container script for advanced conversion & event tracking.
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationAnalytics;
