import React, { useState } from 'react';
import { Code, CheckCircle, AlertTriangle, Building, Globe, Check } from 'lucide-react';

const SchemaSEO = ({
  schema = {},
  global = {},
  onChangeSchema = () => {},
  onChangeGlobal = () => {}
}) => {
  const [jsonError, setJsonError] = useState(null);

  const handleSchemaChange = (field, val) => {
    onChangeSchema({
      ...schema,
      [field]: val
    });
  };

  const handleGlobalChange = (field, val) => {
    onChangeGlobal({
      ...global,
      [field]: val
    });
  };

  const handleAddressChange = (addrField, val) => {
    onChangeGlobal({
      ...global,
      organizationAddress: {
        ...(global.organizationAddress || {}),
        [addrField]: val
      }
    });
  };

  const handleCustomJsonChange = (val) => {
    handleSchemaChange('customJsonLd', val);
    if (!val || !val.trim()) {
      setJsonError(null);
      return;
    }
    try {
      JSON.parse(val);
      setJsonError(null);
    } catch (err) {
      setJsonError(err.message);
    }
  };

  const address = global.organizationAddress || {};

  return (
    <div>
      {/* Organization Schema Settings */}
      <div className="seo-card">
        <div className="seo-card-header">
          <div>
            <h3>
              <Building size={18} style={{ color: '#1672ef' }} /> Organization & Business Schema (JSON-LD)
            </h3>
            <div className="seo-card-desc">
              Feeds structured business data to Google Knowledge Graph, Local Packs, and Rich Results.
            </div>
          </div>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.86rem', fontWeight: 600, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={schema.enableOrganizationSchema !== false}
                onChange={(e) => handleSchemaChange('enableOrganizationSchema', e.target.checked)}
              />
              Enable Organization Schema
            </label>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="seo-form-group">
            <label className="seo-label">Organization Legal Name</label>
            <input
              type="text"
              className="seo-input"
              value={global.organizationName || ''}
              onChange={(e) => handleGlobalChange('organizationName', e.target.value)}
              placeholder="RedAsh Films & Media"
            />
          </div>
          <div className="seo-form-group">
            <label className="seo-label">Organization Logo URL</label>
            <input
              type="text"
              className="seo-input"
              value={global.organizationLogo || ''}
              onChange={(e) => handleGlobalChange('organizationLogo', e.target.value)}
              placeholder="https://redash.in/logo.png"
            />
          </div>
        </div>

        <div className="seo-form-group">
          <label className="seo-label">Organization Description</label>
          <textarea
            className="seo-textarea"
            style={{ minHeight: 65 }}
            value={global.organizationDescription || ''}
            onChange={(e) => handleGlobalChange('organizationDescription', e.target.value)}
            placeholder="Award-winning film production company and full-service creative agency..."
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="seo-form-group">
            <label className="seo-label">Contact Email</label>
            <input
              type="email"
              className="seo-input"
              value={global.organizationEmail || ''}
              onChange={(e) => handleGlobalChange('organizationEmail', e.target.value)}
              placeholder="info@redashfilms.com"
            />
          </div>
          <div className="seo-form-group">
            <label className="seo-label">Contact Phone</label>
            <input
              type="text"
              className="seo-input"
              value={global.organizationPhone || ''}
              onChange={(e) => handleGlobalChange('organizationPhone', e.target.value)}
              placeholder="+91 98200 00000"
            />
          </div>
        </div>

        {/* Postal Address */}
        <div style={{ marginTop: '0.5rem', padding: '1rem', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155', marginBottom: '0.75rem' }}>
            Registered Office Postal Address
          </div>
          <div className="seo-form-group">
            <label className="seo-label">Street Address</label>
            <input
              type="text"
              className="seo-input"
              value={address.street || ''}
              onChange={(e) => handleAddressChange('street', e.target.value)}
              placeholder="1302-1305, Peninsula Park, Fun Republic Lane, Andheri West"
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label className="seo-label">City</label>
              <input
                type="text"
                className="seo-input"
                value={address.city || ''}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                placeholder="Mumbai"
              />
            </div>
            <div>
              <label className="seo-label">State</label>
              <input
                type="text"
                className="seo-input"
                value={address.state || ''}
                onChange={(e) => handleAddressChange('state', e.target.value)}
                placeholder="Maharashtra"
              />
            </div>
            <div>
              <label className="seo-label">PIN / Zip</label>
              <input
                type="text"
                className="seo-input"
                value={address.postalCode || ''}
                onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                placeholder="400053"
              />
            </div>
            <div>
              <label className="seo-label">Country</label>
              <input
                type="text"
                className="seo-input"
                value={address.country || ''}
                onChange={(e) => handleAddressChange('country', e.target.value)}
                placeholder="IN"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Global Schema Toggles */}
      <div className="seo-card">
        <div className="seo-card-header">
          <div>
            <h3>
              <Globe size={18} style={{ color: '#1672ef' }} /> Automatic Structured Data Features
            </h3>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={schema.enableWebSiteSchema !== false}
              onChange={(e) => handleSchemaChange('enableWebSiteSchema', e.target.checked)}
            />
            <span>
              <strong>WebSite Schema with Sitelinks SearchBox</strong> (Generates Google Sitelinks markup)
            </span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={schema.enableBreadcrumbSchema !== false}
              onChange={(e) => handleSchemaChange('enableBreadcrumbSchema', e.target.checked)}
            />
            <span>
              <strong>BreadcrumbList Schema</strong> (Provides structured hierarchy for search engines)
            </span>
          </label>
        </div>
      </div>

      {/* Custom JSON-LD Schema Editor */}
      <div className="seo-card">
        <div className="seo-card-header">
          <div>
            <h3>
              <Code size={18} style={{ color: '#1672ef' }} /> Custom JSON-LD Schema Editor
            </h3>
            <div className="seo-card-desc">
              Add any custom Schema.org markup (e.g., LocalBusiness, Film, VideoObject, Article).
            </div>
          </div>
          <div>
            {jsonError ? (
              <span className="seo-char-badge long" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <AlertTriangle size={12} /> Invalid JSON Syntax
              </span>
            ) : (
              <span className="seo-char-badge optimal" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <CheckCircle size={12} /> JSON Valid
              </span>
            )}
          </div>
        </div>

        <div className="seo-form-group">
          <textarea
            className="seo-code-editor"
            style={{ minHeight: 160 }}
            value={schema.customJsonLd || ''}
            onChange={(e) => handleCustomJsonChange(e.target.value)}
            placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "LocalBusiness",\n  "name": "RedAsh Films & Media",\n  "image": "https://redash.in/logo.png",\n  "priceRange": "$$$"\n}`}
          />
          {jsonError && (
            <div style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.35rem', fontWeight: 600 }}>
              Error: {jsonError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemaSEO;
