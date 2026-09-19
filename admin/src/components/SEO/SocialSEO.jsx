import React, { useState, useRef } from 'react';
import { Share2, Upload, X, Image as ImageIcon } from 'lucide-react';
import { evaluateVariables } from './LiveSERPPreview';

const FacebookIcon = ({ size = 18, color = '#1877f2' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ color, flexShrink: 0 }}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = ({ size = 18, color = '#0f172a' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ color, flexShrink: 0 }}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const SocialSEO = ({
  global = {},
  onChange = () => {},
  onFocusField = () => {},
  onUploadImage = () => {}
}) => {
  const [socialPlatform, setSocialPlatform] = useState('facebook'); // 'facebook' | 'twitter'
  const ogImgInputRef = useRef(null);
  const twImgInputRef = useRef(null);

  const handleFieldChange = (field, val) => {
    onChange({
      ...global,
      [field]: val
    });
  };

  const handleOgImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (onUploadImage) {
      const url = await onUploadImage(file);
      if (url) handleFieldChange('ogImage', url);
    }
  };

  const handleTwImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (onUploadImage) {
      const url = await onUploadImage(file);
      if (url) handleFieldChange('twitterImage', url);
    }
  };

  const resolvedOgTitle = evaluateVariables(global.ogTitle || global.title) || 'RedAsh Films & Media';
  const resolvedOgDesc = evaluateVariables(global.ogDescription || global.description) || 'Premier film production company and creative ad agency.';
  const resolvedOgImg = global.ogImage || 'https://redash.in/og-image.jpg';

  const resolvedTwTitle = evaluateVariables(global.twitterTitle || global.ogTitle || global.title) || 'RedAsh Films & Media';
  const resolvedTwDesc = evaluateVariables(global.twitterDescription || global.ogDescription || global.description) || 'Premier film production company and creative ad agency.';
  const resolvedTwImg = global.twitterImage || resolvedOgImg;

  return (
    <div>
      {/* Open Graph Configuration */}
      <div className="seo-card">
        <div className="seo-card-header">
          <div>
            <h3>
              <FacebookIcon size={18} color="#1877f2" /> Open Graph / Facebook &amp; LinkedIn Meta Tags
            </h3>
            <div className="seo-card-desc">
              Controls how your links and content appear when shared on Facebook, LinkedIn, WhatsApp, Slack, and Discord.
            </div>
          </div>
        </div>

        {/* Default OG Title */}
        <div className="seo-form-group">
          <div className="seo-label-row">
            <label className="seo-label">Default OG Title</label>
          </div>
          <input
            type="text"
            className="seo-input"
            value={global.ogTitle || ''}
            onChange={(e) => handleFieldChange('ogTitle', e.target.value)}
            onFocus={() => onFocusField('ogTitle')}
            placeholder="e.g. RedAsh Films & Media | Film Production & Creative Ad Agency"
          />
        </div>

        {/* Default OG Description */}
        <div className="seo-form-group">
          <div className="seo-label-row">
            <label className="seo-label">Default OG Description</label>
          </div>
          <textarea
            className="seo-textarea"
            value={global.ogDescription || ''}
            onChange={(e) => handleFieldChange('ogDescription', e.target.value)}
            onFocus={() => onFocusField('ogDescription')}
            placeholder="e.g. Premier film production company and creative ad agency crafting memorable storytelling for screens of every size."
          />
        </div>

        {/* Default OG Image */}
        <div className="seo-form-group">
          <div className="seo-label-row">
            <label className="seo-label">Default OG Image (Recommended 1200x630px)</label>
          </div>
          <div className="seo-img-upload-row">
            {global.ogImage ? (
              <div style={{ position: 'relative' }}>
                <img src={global.ogImage} alt="OG" className="seo-img-thumb" style={{ width: 80, height: 50 }} />
                <button
                  type="button"
                  onClick={() => handleFieldChange('ogImage', '')}
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
                No Image
              </div>
            )}

            <div style={{ flex: 1, display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="seo-input"
                value={global.ogImage || ''}
                onChange={(e) => handleFieldChange('ogImage', e.target.value)}
                placeholder="https://redash.in/og-image.jpg or upload"
              />
              <button
                type="button"
                className="seo-btn seo-btn-secondary"
                onClick={() => ogImgInputRef.current?.click()}
              >
                <Upload size={14} /> Upload
              </button>
              <input
                ref={ogImgInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleOgImageUpload}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Twitter / X Card Configuration */}
      <div className="seo-card">
        <div className="seo-card-header">
          <div>
            <h3>
              <TwitterIcon size={18} color="#0f172a" /> Twitter / X Card Settings
            </h3>
            <div className="seo-card-desc">
              Controls card format and preview metadata when links are posted on Twitter / X.
            </div>
          </div>
        </div>

        {/* Twitter Card Type */}
        <div className="seo-form-group">
          <div className="seo-label-row">
            <label className="seo-label">Twitter Card Type</label>
          </div>
          <select
            className="seo-select"
            value={global.twitterCard || 'summary_large_image'}
            onChange={(e) => handleFieldChange('twitterCard', e.target.value)}
          >
            <option value="summary_large_image">Summary with Large Image (Recommended - 1200x628)</option>
            <option value="summary">Summary Standard Card (Square Image)</option>
            <option value="app">App Card</option>
            <option value="player">Player Card (Video / Audio)</option>
          </select>
        </div>

        {/* Twitter Title */}
        <div className="seo-form-group">
          <div className="seo-label-row">
            <label className="seo-label">Twitter / X Card Title</label>
          </div>
          <input
            type="text"
            className="seo-input"
            value={global.twitterTitle || ''}
            onChange={(e) => handleFieldChange('twitterTitle', e.target.value)}
            onFocus={() => onFocusField('twitterTitle')}
            placeholder="Defaults to OG Title if left blank"
          />
        </div>

        {/* Twitter Description */}
        <div className="seo-form-group">
          <div className="seo-label-row">
            <label className="seo-label">Twitter / X Card Description</label>
          </div>
          <textarea
            className="seo-textarea"
            value={global.twitterDescription || ''}
            onChange={(e) => handleFieldChange('twitterDescription', e.target.value)}
            onFocus={() => onFocusField('twitterDescription')}
            placeholder="Defaults to OG Description if left blank"
          />
        </div>

        {/* Twitter Image */}
        <div className="seo-form-group">
          <div className="seo-label-row">
            <label className="seo-label">Twitter / X Card Image</label>
          </div>
          <div className="seo-img-upload-row">
            {global.twitterImage ? (
              <div style={{ position: 'relative' }}>
                <img src={global.twitterImage} alt="Twitter" className="seo-img-thumb" style={{ width: 80, height: 50 }} />
                <button
                  type="button"
                  onClick={() => handleFieldChange('twitterImage', '')}
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
                Default (OG)
              </div>
            )}

            <div style={{ flex: 1, display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="seo-input"
                value={global.twitterImage || ''}
                onChange={(e) => handleFieldChange('twitterImage', e.target.value)}
                placeholder="Leave blank to use OG Image"
              />
              <button
                type="button"
                className="seo-btn seo-btn-secondary"
                onClick={() => twImgInputRef.current?.click()}
              >
                <Upload size={14} /> Upload
              </button>
              <input
                ref={twImgInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleTwImageUpload}
              />
            </div>
          </div>
        </div>

        {/* Twitter Site & Creator Handles */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="seo-form-group">
            <label className="seo-label">Twitter Site (@username)</label>
            <input
              type="text"
              className="seo-input"
              value={global.twitterSite || ''}
              onChange={(e) => handleFieldChange('twitterSite', e.target.value)}
              placeholder="@RedashFilms"
            />
          </div>
          <div className="seo-form-group">
            <label className="seo-label">Twitter Creator (@username)</label>
            <input
              type="text"
              className="seo-input"
              value={global.twitterCreator || ''}
              onChange={(e) => handleFieldChange('twitterCreator', e.target.value)}
              placeholder="@AshishLal"
            />
          </div>
        </div>
      </div>

      {/* Live Social Card Preview */}
      <div className="seo-card">
        <div className="seo-card-header">
          <div>
            <h3>
              <Share2 size={18} style={{ color: '#1672ef' }} /> Live Social Card Preview
            </h3>
            <div className="seo-card-desc">
              Visual simulation of how the link will render when shared on social feeds.
            </div>
          </div>
          <div className="serp-device-toggle">
            <button
              type="button"
              className={`serp-device-btn ${socialPlatform === 'facebook' ? 'active' : ''}`}
              onClick={() => setSocialPlatform('facebook')}
            >
              <FacebookIcon size={12} color="#1877f2" /> Facebook / LinkedIn
            </button>
            <button
              type="button"
              className={`serp-device-btn ${socialPlatform === 'twitter' ? 'active' : ''}`}
              onClick={() => setSocialPlatform('twitter')}
            >
              <TwitterIcon size={12} color="#0f172a" /> Twitter / X
            </button>
          </div>
        </div>

        <div className="social-card-preview">
          <div className="social-preview-img-container">
            {(socialPlatform === 'facebook' ? resolvedOgImg : resolvedTwImg) ? (
              <img
                src={socialPlatform === 'facebook' ? resolvedOgImg : resolvedTwImg}
                alt="Social Preview"
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#94a3b8' }}>
                <ImageIcon size={32} />
                <span style={{ fontSize: 12, marginTop: 4 }}>No Preview Image Set</span>
              </div>
            )}
          </div>
          <div className="social-preview-text">
            <div className="social-preview-domain">redash.in</div>
            <div className="social-preview-title">
              {socialPlatform === 'facebook' ? resolvedOgTitle : resolvedTwTitle}
            </div>
            <div className="social-preview-desc">
              {socialPlatform === 'facebook' ? resolvedOgDesc : resolvedTwDesc}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSEO;
