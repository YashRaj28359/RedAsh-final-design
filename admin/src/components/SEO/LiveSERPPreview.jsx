import React, { useState } from 'react';
import { Monitor, Smartphone, Globe, MessageSquare, Copy, Check, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { resolveImgUrl } from './SEOManager';

export function evaluateVariables(text = '', vars = {}) {
  if (!text || typeof text !== 'string') return '';
  const defaults = {
    site_name: 'RedAsh Films & Media',
    page_name: 'Home',
    category_name: 'Entertainment',
    product_name: 'The Codpaster',
    post_title: 'Behind the Scenes of Microdramas',
    author_name: 'Ashish Lal',
    location: 'Mumbai, India',
    year: new Date().getFullYear().toString(),
    ...vars
  };

  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return defaults[key] !== undefined ? defaults[key] : match;
  });
}

const LiveSERPPreview = ({
  title = '',
  description = '',
  ogTitle = '',
  ogDescription = '',
  ogImage = '',
  url = 'https://redash.in',
  favicon = '',
  apiUrl = 'http://localhost:5000',
  siteName = 'RedAsh Films & Media',
  domainName = 'redash.in',
  domainKey = 'main',
  googleLocationUrl = '',
  instagramUrl = '',
  linkedinUrl = '',
  onInsertVariable = null,
  activeVars = {}
}) => {
  const [previewTab, setPreviewTab] = useState('whatsapp'); // 'whatsapp' | 'google'
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'mobile'
  const [copiedLink, setCopiedLink] = useState(false);

  const defaultLogo = domainKey === 'films'
    ? '/logos/redash-films-banner.png'
    : domainKey === 'agency'
      ? '/logos/redash-agency-banner.png'
      : '/logos/redash-main-banner.png';

  const effectiveOgTitle = ogTitle || title;
  const effectiveOgDesc = ogDescription || description;
  const effectiveOgImage = ogImage || defaultLogo;

  const resolvedTitle = evaluateVariables(title, activeVars) || (
    domainKey === 'films'
      ? 'Film Production Company & Ad Agency in India - RedAsh Films'
      : 'RedAsh Films & Media | Premium Film Production & Creative Ad Agency Mumbai'
  );
  
  const resolvedDesc = evaluateVariables(description, activeVars) || (
    domainKey === 'films'
      ? 'Founded in 2007 by Ashish Lal, an engineer from IIT Delhi, RedAsh Films is a reputed Film Production Company & Ad Agency based in Mumbai.'
      : 'Premier film production company and creative ad agency crafting memorable storytelling for screens of every size.'
  );

  const resolvedOgTitle = evaluateVariables(effectiveOgTitle, activeVars) || resolvedTitle;
  const resolvedOgDesc = evaluateVariables(effectiveOgDesc, activeVars) || resolvedDesc;
  const resolvedUrl = evaluateVariables(url, activeVars) || `https://${domainName}`;
  const resolvedFavicon = resolveImgUrl(favicon || defaultLogo, apiUrl);
  const resolvedOgImage = resolveImgUrl(effectiveOgImage, apiUrl);

  // Title validation & metrics (Optimal: 50 - 60 chars)
  const titleLength = (previewTab === 'whatsapp' ? resolvedOgTitle : resolvedTitle).length;
  let titleStatus = 'optimal';
  let titleBadgeText = `${titleLength} / 60 chars (Optimal)`;
  let titleMeterPercent = Math.min(100, (titleLength / 60) * 100);
  let titleMeterColor = 'green';

  if (titleLength === 0) {
    titleStatus = 'short';
    titleBadgeText = 'Missing Title';
    titleMeterColor = 'red';
  } else if (titleLength < 30) {
    titleStatus = 'short';
    titleBadgeText = `${titleLength} / 60 chars (Too short)`;
    titleMeterColor = 'yellow';
  } else if (titleLength > 65) {
    titleStatus = 'long';
    titleBadgeText = `${titleLength} / 60 chars (May truncate)`;
    titleMeterColor = 'red';
  }

  // Description validation & metrics (Optimal: 140 - 160 chars)
  const descLength = (previewTab === 'whatsapp' ? resolvedOgDesc : resolvedDesc).length;
  let descStatus = 'optimal';
  let descBadgeText = `${descLength} / 160 chars (Optimal)`;
  let descMeterPercent = Math.min(100, (descLength / 160) * 100);
  let descMeterColor = 'green';

  if (descLength === 0) {
    descStatus = 'short';
    descBadgeText = 'Missing Description';
    descMeterColor = 'red';
  } else if (descLength < 50) {
    descStatus = 'short';
    descBadgeText = `${descLength} / 160 chars (Too short)`;
    descMeterColor = 'yellow';
  } else if (descLength > 170) {
    descStatus = 'long';
    descBadgeText = `${descLength} / 160 chars (May truncate)`;
    descMeterColor = 'red';
  }

  // Format breadcrumb URL for SERP
  let cleanDomain = domainName;
  let cleanBreadcrumb = '';
  try {
    const parsed = new URL(resolvedUrl.startsWith('http') ? resolvedUrl : `https://${resolvedUrl}`);
    cleanDomain = parsed.hostname;
    cleanBreadcrumb = parsed.pathname.replace(/^\//, '').split('/').filter(Boolean).join(' › ');
  } catch (e) {
    cleanDomain = domainName;
  }

  const handleCopyTestUrl = () => {
    const testUrl = `https://${domainName}/?v=${Date.now().toString().slice(-4)}`;
    navigator.clipboard.writeText(testUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const variableChips = [
    { label: '{site_name}', desc: 'Website Name' },
    { label: '{page_name}', desc: 'Page Title' },
    { label: '{location}', desc: 'City / Location' },
    { label: '{year}', desc: 'Current Year' }
  ];

  return (
    <div className="serp-simulator-container" style={{ border: '1px solid #cbd5e1', borderRadius: 12, background: '#ffffff', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
      {/* Top Preview Switcher */}
      <div style={{ display: 'flex', background: '#f1f5f9', borderBottom: '1px solid #e2e8f0', padding: '0.4rem' }}>
        <button
          type="button"
          onClick={() => setPreviewTab('whatsapp')}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.45rem',
            padding: '0.55rem 0.8rem',
            fontSize: '0.84rem',
            fontWeight: 700,
            borderRadius: 7,
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            background: previewTab === 'whatsapp' ? '#ffffff' : 'transparent',
            color: previewTab === 'whatsapp' ? '#15803d' : '#64748b',
            boxShadow: previewTab === 'whatsapp' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none'
          }}
        >
          <MessageSquare size={15} style={{ color: '#22c55e' }} /> WhatsApp & Social Share
        </button>
        <button
          type="button"
          onClick={() => setPreviewTab('google')}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.45rem',
            padding: '0.55rem 0.8rem',
            fontSize: '0.84rem',
            fontWeight: 700,
            borderRadius: 7,
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            background: previewTab === 'google' ? '#ffffff' : 'transparent',
            color: previewTab === 'google' ? '#1672ef' : '#64748b',
            boxShadow: previewTab === 'google' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none'
          }}
        >
          <Globe size={15} style={{ color: '#1672ef' }} /> Google SERP
        </button>
      </div>

      {/* WhatsApp Message Bubble Simulation */}
      {previewTab === 'whatsapp' && (
        <div style={{ background: '#efeae2', padding: '1.25rem 1rem', position: 'relative' }}>
          <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, textAlign: 'center', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            💬 Live WhatsApp Link Preview Card
          </div>

          {/* WhatsApp Shared Link Bubble */}
          <div
            style={{
              background: '#e7fce3',
              borderRadius: '12px 12px 2px 12px',
              maxWidth: 390,
              margin: '0 auto',
              boxShadow: '0 1px 2px rgba(11,20,26,0.13)',
              overflow: 'hidden',
              border: '1px solid rgba(0,0,0,0.06)'
            }}
          >
            {/* Top Image Preview Box with white container */}
            <div
              style={{
                width: '100%',
                height: 190,
                background: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                padding: '0.75rem'
              }}
            >
              {resolvedOgImage ? (
                <img
                  src={resolvedOgImage}
                  alt="WhatsApp Preview"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultLogo;
                  }}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              ) : (
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>
                  Upload Preview Logo / Image
                </div>
              )}
            </div>

            {/* Content Body: Title, Sub-Description, Domain & Favicon */}
            <div style={{ padding: '0.75rem 0.85rem 0.5rem 0.85rem' }}>
              {/* Title */}
              <div
                style={{
                  color: '#111b21',
                  fontWeight: 700,
                  fontSize: '0.94rem',
                  lineHeight: 1.3,
                  marginBottom: '0.35rem',
                  wordBreak: 'break-word'
                }}
              >
                {resolvedOgTitle}
              </div>

              {/* Sub-Description */}
              <div
                style={{
                  color: '#54656f',
                  fontSize: '0.82rem',
                  lineHeight: 1.38,
                  marginBottom: '0.6rem',
                  wordBreak: 'break-word'
                }}
              >
                {resolvedOgDesc}
              </div>

              {/* Link Footer & Favicon */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.35rem',
                  borderTop: '1px solid rgba(0,0,0,0.05)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#54656f', fontSize: '0.78rem' }}>
                  <span style={{ fontSize: '0.85rem' }}>🔗</span>
                  <span style={{ fontWeight: 500 }}>{cleanDomain}</span>
                </div>

                <img
                  src="/logos/redash-main-logo.png"
                  alt="Favicon"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/favicon.png';
                  }}
                  style={{ width: 16, height: 16, objectFit: 'contain', borderRadius: 2 }}
                />
              </div>
            </div>

            {/* WhatsApp Timestamp Row */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.25rem', padding: '0 0.65rem 0.35rem 0', color: '#667781', fontSize: '0.68rem' }}>
              <span>7:37 PM</span>
              <span style={{ color: '#53bdeb', fontWeight: 700 }}>✓✓</span>
            </div>
          </div>

          {/* Quick WhatsApp Share Test Helper */}
          <div style={{ marginTop: '1rem', background: '#ffffff', padding: '0.75rem', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.76rem', color: '#334155', fontWeight: 600 }}>
                💡 WhatsApp Cache Bypass Link:
              </div>
              <button
                type="button"
                onClick={handleCopyTestUrl}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  borderRadius: 5,
                  padding: '0.2rem 0.5rem',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: '#0f172a'
                }}
              >
                {copiedLink ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
                {copiedLink ? 'Copied!' : 'Copy Test Link'}
              </button>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.25rem' }}>
              WhatsApp caches previews. Use this copy button to test your newly saved title &amp; description on WhatsApp immediately!
            </div>
          </div>
        </div>
      )}

      {/* Google SERP Simulator */}
      {previewTab === 'google' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 1rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#475569' }}>Device View:</span>
            <div className="serp-device-toggle">
              <button
                type="button"
                className={`serp-device-btn ${deviceMode === 'desktop' ? 'active' : ''}`}
                onClick={() => setDeviceMode('desktop')}
              >
                <Monitor size={12} /> Desktop
              </button>
              <button
                type="button"
                className={`serp-device-btn ${deviceMode === 'mobile' ? 'active' : ''}`}
                onClick={() => setDeviceMode('mobile')}
              >
                <Smartphone size={12} /> Mobile
              </button>
            </div>
          </div>

          {/* Browser Tab Simulator */}
          <div style={{ padding: '0.6rem 1rem 0 1rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <div className="browser-tab-preview" title={resolvedTitle}>
              {resolvedFavicon ? (
                <img src={resolvedFavicon} alt="favicon" style={{ width: 14, height: 14, borderRadius: 2, objectFit: 'contain' }} />
              ) : (
                <span style={{ width: 14, height: 14, background: '#1672ef', borderRadius: 2, display: 'inline-block' }} />
              )}
              <span>{resolvedTitle || 'Untitled Tab'}</span>
            </div>
          </div>

          {/* Google SERP Snippet Box */}
          <div className={`serp-preview-box ${deviceMode === 'mobile' ? 'mobile-mode' : ''}`}>
            <div className="serp-site-info">
              <div className="serp-favicon">
                {resolvedFavicon ? <img src={resolvedFavicon} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'contain' }} /> : 'R'}
              </div>
              <div className="serp-site-details">
                <span className="serp-sitename">{siteName || 'RedAsh Films'}</span>
                <span className="serp-url-breadcrumb">
                  https://{cleanDomain} {cleanBreadcrumb ? `› ${cleanBreadcrumb}` : ''}
                </span>
              </div>
            </div>

            <h3 className="serp-headline" title={resolvedTitle}>
              {resolvedTitle}
            </h3>

            <p className="serp-snippet" title={resolvedDesc}>
              {resolvedDesc}
            </p>

            {/* Google Rich Social Results */}
            {(instagramUrl || linkedinUrl) && (
              <div style={{ marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px dashed #e2e8f0' }}>
                {instagramUrl && (
                  <div style={{ padding: '0.35rem 0.5rem', background: '#faf5ff', border: '1px solid #f3e8ff', borderRadius: 6, marginBottom: '0.3rem', fontSize: '0.75rem', color: '#6b21a8', fontWeight: 600 }}>
                    📷 Instagram Linked: {siteName}
                  </div>
                )}
                {linkedinUrl && (
                  <div style={{ padding: '0.35rem 0.5rem', background: '#eff6ff', border: '1px solid #dbeafe', borderRadius: 6, fontSize: '0.75rem', color: '#1e40af', fontWeight: 600 }}>
                    💼 LinkedIn Linked: {siteName}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Metrics & Quality Analysis */}
      <div style={{ padding: '0.85rem 1rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        {/* Title Metric */}
        <div style={{ marginBottom: '0.65rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.76rem' }}>
            <span style={{ fontWeight: 600, color: '#334155' }}>
              {previewTab === 'whatsapp' ? 'WhatsApp Title Length' : 'Google Title Length'}
            </span>
            <span className={`seo-char-badge ${titleStatus}`}>{titleBadgeText}</span>
          </div>
          <div className="seo-meter-bar" style={{ height: 5, marginTop: 4 }}>
            <div
              className={`seo-meter-fill ${titleMeterColor}`}
              style={{ width: `${titleMeterPercent}%` }}
            />
          </div>
        </div>

        {/* Description Metric */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.76rem' }}>
            <span style={{ fontWeight: 600, color: '#334155' }}>
              {previewTab === 'whatsapp' ? 'Sub-Description Length' : 'Meta Description Length'}
            </span>
            <span className={`seo-char-badge ${descStatus}`}>{descBadgeText}</span>
          </div>
          <div className="seo-meter-bar" style={{ height: 5, marginTop: 4 }}>
            <div
              className={`seo-meter-fill ${descMeterColor}`}
              style={{ width: `${descMeterPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSERPPreview;
