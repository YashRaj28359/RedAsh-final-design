import React from 'react';
import { Code2, AlertTriangle, ShieldCheck } from 'lucide-react';

const AdvancedCode = ({
  advanced = {},
  onChange = () => {}
}) => {
  const handleFieldChange = (field, val) => {
    onChange({
      ...advanced,
      [field]: val
    });
  };

  return (
    <div className="seo-card">
      <div className="seo-card-header">
        <div>
          <h3>
            <Code2 size={18} style={{ color: '#1672ef' }} /> Advanced Custom Code Injections
          </h3>
          <div className="seo-card-desc">
            Inject raw tracking pixels, meta tags, chat widgets, CSS, or scripts into the website without touching codebase.
          </div>
        </div>
      </div>

      <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '0.75rem 1rem', borderRadius: 8, marginBottom: '1.25rem', color: '#92400e', fontSize: '0.82rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <AlertTriangle size={16} style={{ flexShrink: 0 }} />
        <span>
          <strong>Caution:</strong> Scripts inserted here execute directly in client browsers. Ensure your HTML / script syntax is valid to prevent layout or javascript runtime errors.
        </span>
      </div>

      {/* Custom Head Code */}
      <div className="seo-form-group">
        <div className="seo-label-row">
          <label className="seo-label">
            Custom &lt;head&gt; Code
          </label>
        </div>
        <textarea
          className="seo-code-editor"
          style={{ minHeight: 120 }}
          value={advanced.customHeadCode || ''}
          onChange={(e) => handleFieldChange('customHeadCode', e.target.value)}
          placeholder={`<!-- Injected before </head> -->\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<meta name="facebook-domain-verification" content="..." />`}
        />
        <div className="seo-help-text">
          Useful for custom fonts, meta tags, DNS preconnects, and head tracking tags.
        </div>
      </div>

      {/* Custom Body Code */}
      <div className="seo-form-group">
        <div className="seo-label-row">
          <label className="seo-label">
            Custom Opening &lt;body&gt; Code
          </label>
        </div>
        <textarea
          className="seo-code-editor"
          style={{ minHeight: 120 }}
          value={advanced.customBodyCode || ''}
          onChange={(e) => handleFieldChange('customBodyCode', e.target.value)}
          placeholder={`<!-- Injected right after <body> opens -->\n<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXX" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`}
        />
        <div className="seo-help-text">
          Useful for Google Tag Manager &lt;noscript&gt; fallback tags or top-level notification widgets.
        </div>
      </div>

      {/* Custom Footer Code */}
      <div className="seo-form-group">
        <div className="seo-label-row">
          <label className="seo-label">
            Custom Footer / Closing &lt;/body&gt; Code
          </label>
        </div>
        <textarea
          className="seo-code-editor"
          style={{ minHeight: 120 }}
          value={advanced.customFooterCode || ''}
          onChange={(e) => handleFieldChange('customFooterCode', e.target.value)}
          placeholder={`<!-- Injected before </body> closes -->\n<script>\n  // Custom conversion tracking script\n</script>`}
        />
        <div className="seo-help-text">
          Useful for live chat widgets (Intercom, Tidio, Crisp), analytics conversion listeners, and third-party trackers.
        </div>
      </div>
    </div>
  );
};

export default AdvancedCode;
