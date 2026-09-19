import React, { useState } from 'react';
import { Search, Code, FileCode, Code2 } from 'lucide-react';
import VerificationAnalytics from './VerificationAnalytics';
import SchemaSEO from './SchemaSEO';
import SitemapRobots from './SitemapRobots';
import AdvancedCode from './AdvancedCode';

const GlobalSeoTab = ({
  seoState = {},
  onChange = () => {}
}) => {
  const [subSection, setSubSection] = useState('verification'); // 'verification' | 'schema' | 'sitemap' | 'advanced'

  return (
    <div>
      {/* Sub-tab Pill Navigation */}
      <div className="seo-tabs-nav" style={{ marginBottom: '1.5rem' }}>
        <button
          type="button"
          className={`seo-tab-btn ${subSection === 'verification' ? 'active' : ''}`}
          onClick={() => setSubSection('verification')}
        >
          <Search size={15} /> Webmaster Verification & Analytics
        </button>
        <button
          type="button"
          className={`seo-tab-btn ${subSection === 'schema' ? 'active' : ''}`}
          onClick={() => setSubSection('schema')}
        >
          <Code size={15} /> Schema & Structured Data (JSON-LD)
        </button>
        <button
          type="button"
          className={`seo-tab-btn ${subSection === 'sitemap' ? 'active' : ''}`}
          onClick={() => setSubSection('sitemap')}
        >
          <FileCode size={15} /> Dynamic Sitemap & Robots.txt
        </button>
        <button
          type="button"
          className={`seo-tab-btn ${subSection === 'advanced' ? 'active' : ''}`}
          onClick={() => setSubSection('advanced')}
        >
          <Code2 size={15} /> Custom Code Injections
        </button>
      </div>

      {/* Section 1: Verification & Analytics */}
      {subSection === 'verification' && (
        <VerificationAnalytics
          global={{
            ...(seoState.verification || {}),
            ...(seoState.main || seoState.global || {})
          }}
          onChange={(updated) => {
            onChange({
              ...seoState,
              verification: {
                googleSiteVerification: updated.googleSiteVerification,
                bingSiteVerification: updated.bingSiteVerification,
                googleAnalyticsId: updated.googleAnalyticsId,
                googleTagManagerId: updated.googleTagManagerId
              },
              main: {
                ...(seoState.main || {}),
                googleSiteVerification: updated.googleSiteVerification,
                bingSiteVerification: updated.bingSiteVerification,
                googleAnalyticsId: updated.googleAnalyticsId,
                googleTagManagerId: updated.googleTagManagerId
              }
            });
          }}
        />
      )}

      {/* Section 2: Schema & Structured Data */}
      {subSection === 'schema' && (
        <SchemaSEO
          schema={seoState.schema || {}}
          global={seoState.main || seoState.global || {}}
          onChangeSchema={(newSchema) => onChange({ ...seoState, schema: newSchema })}
          onChangeGlobal={(newMain) => onChange({ ...seoState, main: newMain })}
        />
      )}

      {/* Section 3: Dynamic Sitemap & Robots.txt */}
      {subSection === 'sitemap' && (
        <SitemapRobots
          sitemap={seoState.sitemap || {}}
          robotsTxt={seoState.robotsTxt || {}}
          onChangeSitemap={(newSitemap) => onChange({ ...seoState, sitemap: newSitemap })}
          onChangeRobots={(newRobots) => onChange({ ...seoState, robotsTxt: newRobots })}
        />
      )}

      {/* Section 4: Advanced Code Injections */}
      {subSection === 'advanced' && (
        <AdvancedCode
          advanced={{
            ...(seoState.advanced || {}),
            customHeadCode: seoState.advanced?.customHeadCode || seoState.main?.customHeadCode,
            customBodyCode: seoState.advanced?.customBodyCode || seoState.main?.customBodyCode,
            customFooterCode: seoState.advanced?.customFooterCode || seoState.main?.customFooterCode
          }}
          onChange={(newAdv) => {
            onChange({
              ...seoState,
              advanced: newAdv,
              main: {
                ...(seoState.main || {}),
                customHeadCode: newAdv.customHeadCode,
                customBodyCode: newAdv.customBodyCode,
                customFooterCode: newAdv.customFooterCode
              }
            });
          }}
        />
      )}
    </div>
  );
};

export default GlobalSeoTab;
