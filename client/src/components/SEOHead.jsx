import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { isFilmsSubdomain, isAgencySubdomain } from '../utils/subdomain';
import { API_URL, getCachedContent, resolveClientImage } from '../utils/api';

// Fallback SEO defaults in case network is down
const DEFAULT_SEO_CLIENT = {
  globalFavicon: '/logos/redash-main-logo.png',
  main: {
    siteName: 'RedAsh Films & Media',
    title: 'RedAsh Films & Media | Premium Film Production & Creative Ad Agency Mumbai',
    titleTemplate: '{page_name} | {site_name}',
    description: 'RedAsh is a premier film production house and full-service creative ad agency creating captivating films, digital series, microdramas, and brand commercials.',
    keywords: 'RedAsh, RedAsh Films, film production, advertising agency, microdrama, web series, video production, commercial ad films, Ashish Lal',
    canonicalUrl: 'https://redash.in',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    favicon: '/logos/redash-main-logo.png',
    ogTitle: 'RedAsh Films & Media | Film Production & Creative Ad Agency',
    ogDescription: 'Premier film production company and creative ad agency crafting memorable storytelling for screens of every size.',
    ogImage: '/logos/redash-main-logo.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'RedAsh Films & Media',
    twitterDescription: 'Premier film production company and creative ad agency.',
    twitterImage: '/logos/redash-main-logo.png'
  },
  films: {
    siteName: 'RedAsh Entertainment',
    title: 'Film Production Company & Ad Agency in India - RedAsh Films',
    titleTemplate: '{page_name} | RedAsh Films',
    description: 'Founded in 2007 by Ashish Lal, an engineer from IIT Delhi, RedAsh Films is a reputed Film Production Company & Ad Agency based in Mumbai.',
    keywords: 'Film Production Company India, Ad Agency Mumbai, RedAsh Films, Ashish Lal filmmaker, IIT Delhi, web series production, microdramas, corporate films',
    canonicalUrl: 'https://films.redash.in',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    favicon: '/logos/redash-films-logo.png',
    ogTitle: 'Film Production Company & Ad Agency in India - RedAsh Films',
    ogDescription: 'Founded in 2007 by Ashish Lal, an engineer from IIT Delhi, RedAsh Films is a reputed Film Production Company & Ad Agency based in Mumbai.',
    ogImage: '/logos/redash-films-logo.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Film Production Company & Ad Agency in India - RedAsh Films',
    twitterDescription: 'Founded in 2007 by Ashish Lal, an engineer from IIT Delhi, RedAsh Films is a reputed Film Production Company & Ad Agency based in Mumbai.',
    twitterImage: '/logos/redash-films-logo.png'
  },
  agency: {
    siteName: 'RedAsh Ad Agency',
    title: 'RedAsh Ad Agency | High-Impact Brand Films & Commercials Mumbai',
    titleTemplate: '{page_name} | RedAsh Ad Agency',
    description: 'RedAsh Ad Agency produces high-converting TV commercials, corporate films, digital ad campaigns, and brand storytelling that drives massive ROI.',
    keywords: 'creative advertising agency mumbai, tv commercial production, corporate brand films, digital ads agency, brand video campaigns',
    canonicalUrl: 'https://agency.redash.in',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    favicon: '/logos/redash-agency-logo.png',
    ogTitle: 'RedAsh Ad Agency | Impactful Brand Storytelling & Commercials',
    ogDescription: 'We help leading global and Indian brands create TVCs, digital video ads, and campaign films that resonate.',
    ogImage: '/logos/redash-agency-logo.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'RedAsh Ad Agency',
    twitterDescription: 'Cinematic commercials, corporate films, and digital ad campaigns.',
    twitterImage: '/logos/redash-agency-logo.png'
  },
  global: {
    siteName: 'RedAsh Films & Media',
    title: 'RedAsh Films & Media | Premium Film Production & Creative Ad Agency Mumbai',
    titleTemplate: '{page_name} | {site_name}',
    description: 'RedAsh is a premier film production house and full-service creative ad agency creating captivating films, digital series, microdramas, and brand commercials.',
    keywords: 'RedAsh, RedAsh Films, film production, advertising agency, microdrama, web series, video production, commercial ad films, Ashish Lal',
    canonicalUrl: 'https://redash.in',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    favicon: '/logos/redash-main-logo.png',
    ogTitle: 'RedAsh Films & Media | Film Production & Creative Ad Agency',
    ogDescription: 'Premier film production company and creative ad agency crafting memorable storytelling for screens of every size.',
    ogImage: '/logos/redash-main-logo.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'RedAsh Films & Media',
    twitterDescription: 'Premier film production company and creative ad agency.',
    twitterImage: '/logos/redash-main-logo.png'
  },
  pages: {}
};

/**
 * Replace placeholders like {site_name}, {page_name}, {post_title}, {year}, etc.
 */
export function replaceSeoVariables(template = '', vars = {}) {
  if (!template || typeof template !== 'string') return '';
  const currentYear = new Date().getFullYear().toString();
  
  const allVars = {
    site_name: 'RedAsh Films & Media',
    location: 'Mumbai, India',
    year: currentYear,
    author_name: 'Ashish Lal',
    ...vars
  };

  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return allVars[key] !== undefined && allVars[key] !== null ? String(allVars[key]) : match;
  });
}

/**
 * Helper to determine standard pageKey from pathname & subdomain context
 */
export function resolvePageKey(pathname, filmsMode, agencyMode) {
  const p = pathname.toLowerCase().replace(/\/$/, '') || '/';

  if (filmsMode) {
    if (p === '/') return 'entertainmentLanding';
    if (p === '/about') return 'entertainmentAbout';
    if (p === '/films') return 'entertainmentFilms';
    if (p === '/blog') return 'entertainmentBlogs';
    if (p.startsWith('/blog/')) return 'blogPostTemplate';
    if (p === '/media') return 'entertainmentMedia';
    if (p === '/contact') return 'entertainmentContact';
  }

  if (agencyMode) {
    if (p === '/') return 'agencyLanding';
    if (p === '/about') return 'agencyAbout';
    if (p === '/films') return 'agencyFilms';
    if (p === '/blog') return 'agencyBlogs';
    if (p.startsWith('/blog/')) return 'blogPostTemplate';
    if (p === '/media') return 'agencyMedia';
    if (p === '/contact') return 'agencyContact';
  }

  // Main domain routes
  if (p === '/') return 'home';
  if (p === '/entertainment') return 'entertainmentLanding';
  if (p === '/entertainment/about') return 'entertainmentAbout';
  if (p === '/entertainment/films') return 'entertainmentFilms';
  if (p === '/entertainment/blog') return 'entertainmentBlogs';
  if (p.startsWith('/entertainment/blog/')) return 'blogPostTemplate';
  if (p === '/entertainment/media') return 'entertainmentMedia';
  if (p === '/entertainment/contact') return 'entertainmentContact';

  if (p === '/ad-agency') return 'agencyLanding';
  if (p === '/ad-agency/about') return 'agencyAbout';
  if (p === '/ad-agency/films') return 'agencyFilms';
  if (p === '/ad-agency/blog') return 'agencyBlogs';
  if (p.startsWith('/ad-agency/blog/')) return 'blogPostTemplate';
  if (p === '/ad-agency/media') return 'agencyMedia';
  if (p === '/ad-agency/contact') return 'agencyContact';

  return 'home';
}

/**
 * SEOHead Component: Dynamically manages document head tags
 */
const SEOHead = ({ customPageKey = null, dynamicVars = {}, customOverrides = {} }) => {
  const location = useLocation();
  const [seoData, setSeoData] = useState(() => {
    const cached = getCachedContent();
    return cached?.seo || DEFAULT_SEO_CLIENT;
  });

  useEffect(() => {
    let isMounted = true;
    
    // Fetch fresh SEO configuration from API
    fetch(`${API_URL}/api/seo?t=${Date.now()}`, { cache: 'no-store' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && isMounted) {
          setSeoData(data);
          try {
            const existingCache = getCachedContent() || {};
            existingCache.seo = data;
            localStorage.setItem('redash_content', JSON.stringify(existingCache));
          } catch (e) {}
        }
      })
      .catch(err => {
        console.warn('Could not fetch fresh SEO settings, using local fallback:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const isFilmsDomain = isFilmsSubdomain();
    const isAgencyDomain = isAgencySubdomain();
    const isFilmsPath = location.pathname.startsWith('/entertainment');
    const isAgencyPath = location.pathname.startsWith('/ad-agency');

    const filmsMode = isFilmsDomain || isFilmsPath;
    const agencyMode = isAgencyDomain || isAgencyPath;
    const pageKey = customPageKey || resolvePageKey(location.pathname, isFilmsDomain, isAgencyDomain);
    const domainKey = filmsMode ? 'films' : agencyMode ? 'agency' : 'main';
    const domainProfile = seoData?.[domainKey] || (domainKey === 'main' ? seoData?.global : null) || DEFAULT_SEO_CLIENT[domainKey] || DEFAULT_SEO_CLIENT.global;

    let subPageKey = pageKey;
    if (filmsMode) {
      if (pageKey === 'entertainmentLanding') subPageKey = 'home';
      if (pageKey === 'entertainmentAbout') subPageKey = 'about';
      if (pageKey === 'entertainmentFilms') subPageKey = 'films';
      if (pageKey === 'entertainmentBlogs') subPageKey = 'blog';
      if (pageKey === 'entertainmentMedia') subPageKey = 'media';
      if (pageKey === 'entertainmentContact') subPageKey = 'contact';
    } else if (agencyMode) {
      if (pageKey === 'agencyLanding') subPageKey = 'home';
      if (pageKey === 'agencyAbout') subPageKey = 'about';
      if (pageKey === 'agencyFilms') subPageKey = 'films';
      if (pageKey === 'agencyBlogs') subPageKey = 'blog';
      if (pageKey === 'agencyMedia') subPageKey = 'media';
      if (pageKey === 'agencyContact') subPageKey = 'contact';
    }

    const pageConfig = domainProfile?.pages?.[subPageKey] || domainProfile?.pages?.[pageKey] || seoData?.pages?.[pageKey] || {};

    const pageName = pageConfig.pageName || (
      filmsMode ? 'Entertainment' : agencyMode ? 'Ad Agency' : 'Home'
    );

    const mergedVars = {
      site_name: domainProfile.siteName || (filmsMode ? 'RedAsh Entertainment' : agencyMode ? 'RedAsh Ad Agency' : 'RedAsh Films & Media'),
      page_name: pageName,
      location: 'Mumbai, India',
      year: new Date().getFullYear().toString(),
      ...dynamicVars
    };

    const global = domainProfile;

    // 1. Resolve SEO Title
    let rawTitle = customOverrides.title || pageConfig.title || global.title;
    if (!rawTitle) {
      const template = global.titleTemplate || '{page_name} | {site_name}';
      rawTitle = replaceSeoVariables(template, mergedVars);
    } else {
      rawTitle = replaceSeoVariables(rawTitle, mergedVars);
    }
    document.title = rawTitle;

    // 2. Resolve Meta Description
    let rawDesc = customOverrides.description || pageConfig.description || global.description || '';
    rawDesc = replaceSeoVariables(rawDesc, mergedVars);

    // 3. Resolve Meta Keywords
    let rawKeywords = customOverrides.keywords || pageConfig.keywords || global.keywords || '';
    rawKeywords = replaceSeoVariables(rawKeywords, mergedVars);

    // 4. Resolve Canonical URL
    const baseUrl = (global.canonicalUrl || 'https://redash.in').replace(/\/$/, '');
    let canonical = customOverrides.canonicalUrl || pageConfig.canonicalUrl;
    if (!canonical) {
      canonical = `${baseUrl}${location.pathname === '/' ? '' : location.pathname}`;
    }
    canonical = replaceSeoVariables(canonical, mergedVars);

    // 5. Resolve Robots
    const robots = customOverrides.robots || pageConfig.robots || global.robots || 'index, follow';

    // 6. Resolve Open Graph Tags
    const ogTitle = replaceSeoVariables(customOverrides.ogTitle || pageConfig.ogTitle || rawTitle, mergedVars);
    const ogDesc = replaceSeoVariables(customOverrides.ogDescription || pageConfig.ogDescription || rawDesc, mergedVars);
    const rawOgImage = customOverrides.ogImage || pageConfig.ogImage || global.ogImage || `${baseUrl}/og-image.jpg`;
    const ogImage = resolveClientImage(rawOgImage, `${baseUrl}/og-image.jpg`);
    const ogType = customOverrides.ogType || pageConfig.ogType || global.ogType || 'website';
    const ogUrl = canonical;

    // 7. Resolve Twitter Tags
    const twitterCard = global.twitterCard || 'summary_large_image';
    const twitterTitle = replaceSeoVariables(customOverrides.twitterTitle || pageConfig.twitterTitle || ogTitle, mergedVars);
    const twitterDesc = replaceSeoVariables(customOverrides.twitterDescription || pageConfig.twitterDescription || ogDesc, mergedVars);
    const rawTwitterImage = customOverrides.twitterImage || pageConfig.twitterImage || ogImage;
    const twitterImage = resolveClientImage(rawTwitterImage, ogImage);

    // Helper: set or create <meta>
    const setMetaTag = (attrName, attrVal, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        el.setAttribute('data-dynamic-seo', 'true');
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper: set or create <link>
    const setLinkTag = (rel, href, extraAttrs = {}) => {
      if (!href) return;
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        el.setAttribute('data-dynamic-seo', 'true');
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
      Object.keys(extraAttrs).forEach(k => el.setAttribute(k, extraAttrs[k]));
    };

    // Apply standard SEO metas
    setMetaTag('name', 'description', rawDesc);
    setMetaTag('name', 'keywords', rawKeywords);
    setMetaTag('name', 'robots', robots);
    setLinkTag('canonical', canonical);

    // Apply Open Graph metas
    setMetaTag('property', 'og:title', ogTitle);
    setMetaTag('property', 'og:description', ogDesc);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:url', ogUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', global.siteName || 'RedAsh Films & Media');

    // Apply Twitter metas
    setMetaTag('name', 'twitter:card', twitterCard);
    setMetaTag('name', 'twitter:title', twitterTitle);
    setMetaTag('name', 'twitter:description', twitterDesc);
    setMetaTag('name', 'twitter:image', twitterImage);
    if (global.twitterSite) setMetaTag('name', 'twitter:site', global.twitterSite);
    if (global.twitterCreator) setMetaTag('name', 'twitter:creator', global.twitterCreator);

    // Apply Search Engine Verification
    if (global.googleSiteVerification) {
      setMetaTag('name', 'google-site-verification', global.googleSiteVerification);
    }
    if (global.bingSiteVerification) {
      setMetaTag('name', 'msvalidate.01', global.bingSiteVerification);
    }

    // Apply Favicon Dynamically Across Client Tabs for that specific website
    const defaultFavicon = filmsMode
      ? '/uploads/redash-films-logo.png'
      : agencyMode
        ? '/uploads/redash-agency-logo.png'
        : '/uploads/redash-main-logo.png';

    const rawFavicon = domainProfile?.favicon || defaultFavicon;
    const finalFavicon = resolveClientImage(rawFavicon, defaultFavicon);
    if (finalFavicon) {
      const existingIcons = document.querySelectorAll('link[rel*="icon"], link[rel="shortcut icon"]');
      existingIcons.forEach(el => el.remove());

      let mimeType = 'image/png';
      if (finalFavicon.endsWith('.jpg') || finalFavicon.endsWith('.jpeg')) mimeType = 'image/jpeg';
      else if (finalFavicon.endsWith('.svg')) mimeType = 'image/svg+xml';
      else if (finalFavicon.endsWith('.ico')) mimeType = 'image/x-icon';
      else if (finalFavicon.endsWith('.webp')) mimeType = 'image/webp';

      const newIcon = document.createElement('link');
      newIcon.rel = 'icon';
      newIcon.type = mimeType;
      newIcon.href = finalFavicon;
      document.head.appendChild(newIcon);

      const shortcutIcon = document.createElement('link');
      shortcutIcon.rel = 'shortcut icon';
      shortcutIcon.href = finalFavicon;
      document.head.appendChild(shortcutIcon);
    }

    // Apply Structured Data (JSON-LD)
    const existingSchemaScript = document.getElementById('redash-dynamic-jsonld');
    if (existingSchemaScript) existingSchemaScript.remove();

    const schemas = [];

    // Organization & Local Business Schema (Powers Google Knowledge Panel, Maps & Social Snippets)
    if (seoData?.schema?.enableOrganizationSchema !== false) {
      const sameAsLinks = [
        global.instagramUrl,
        global.linkedinUrl,
        global.youtubeUrl,
        global.facebookUrl,
        global.twitterUrl,
        global.googleLocationUrl
      ].filter(link => typeof link === 'string' && link.trim().length > 0);

      const orgSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': global.organizationName || global.siteName || 'RedAsh Films & Media',
        'url': global.organizationUrl || baseUrl,
        'logo': global.organizationLogo || `${baseUrl}/logo.png`,
        'description': global.organizationDescription || global.description,
        'email': global.organizationEmail || 'info@redashfilms.com',
        'telephone': global.organizationPhone || '+91 98200 00000',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': global.organizationAddress?.street || '1302-1305, Peninsula Park, Fun Republic Lane, Andheri West',
          'addressLocality': global.organizationAddress?.city || 'Mumbai',
          'addressRegion': global.organizationAddress?.state || 'Maharashtra',
          'postalCode': global.organizationAddress?.postalCode || '400053',
          'addressCountry': global.organizationAddress?.country || 'IN'
        }
      };

      if (global.googleLocationUrl) {
        orgSchema.hasMap = global.googleLocationUrl;
      }

      if (sameAsLinks.length > 0) {
        orgSchema.sameAs = sameAsLinks;
      }

      schemas.push(orgSchema);
    }

    // WebSite Schema
    if (seoData?.schema?.enableWebSiteSchema !== false) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': global.siteName || 'RedAsh Films & Media',
        'url': baseUrl,
        'potentialAction': {
          '@type': 'SearchAction',
          'target': `${baseUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      });
    }

    // Custom Page or Global JSON-LD Schema
    const customSchemaRaw = customOverrides.customSchema || pageConfig.customSchema || seoData?.schema?.customJsonLd;
    if (customSchemaRaw && typeof customSchemaRaw === 'string' && customSchemaRaw.trim()) {
      try {
        const parsed = JSON.parse(replaceSeoVariables(customSchemaRaw, mergedVars));
        schemas.push(parsed);
      } catch (e) {
        console.warn('Invalid JSON-LD schema provided:', e);
      }
    }

    if (schemas.length > 0) {
      const scriptEl = document.createElement('script');
      scriptEl.id = 'redash-dynamic-jsonld';
      scriptEl.type = 'application/ld+json';
      scriptEl.text = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
      document.head.appendChild(scriptEl);
    }

    // Google Analytics (GA4) Injection
    if (global.googleAnalyticsId && !document.getElementById('redash-ga4-script')) {
      const gaScript = document.createElement('script');
      gaScript.id = 'redash-ga4-script';
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${global.googleAnalyticsId}`;
      document.head.appendChild(gaScript);

      const gaInit = document.createElement('script');
      gaInit.id = 'redash-ga4-init';
      gaInit.text = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${global.googleAnalyticsId}');
      `;
      document.head.appendChild(gaInit);
    }

    // Google Tag Manager (GTM) Injection
    if (global.googleTagManagerId && !document.getElementById('redash-gtm-script')) {
      const gtmScript = document.createElement('script');
      gtmScript.id = 'redash-gtm-script';
      gtmScript.text = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${global.googleTagManagerId}');`;
      document.head.appendChild(gtmScript);
    }

    // Custom Head Code Injection
    if (global.customHeadCode && !document.getElementById('redash-custom-head')) {
      const headContainer = document.createElement('div');
      headContainer.id = 'redash-custom-head';
      headContainer.innerHTML = global.customHeadCode;
      Array.from(headContainer.children).forEach(child => document.head.appendChild(child));
    }

    // Custom Body Code Injection
    if (global.customBodyCode && !document.getElementById('redash-custom-body')) {
      const bodyContainer = document.createElement('div');
      bodyContainer.id = 'redash-custom-body';
      bodyContainer.innerHTML = global.customBodyCode;
      Array.from(bodyContainer.children).forEach(child => {
        if (document.body.firstChild) {
          document.body.insertBefore(child, document.body.firstChild);
        } else {
          document.body.appendChild(child);
        }
      });
    }

    // Custom Footer Code Injection
    if (global.customFooterCode && !document.getElementById('redash-custom-footer')) {
      const footerContainer = document.createElement('div');
      footerContainer.id = 'redash-custom-footer';
      footerContainer.innerHTML = global.customFooterCode;
      Array.from(footerContainer.children).forEach(child => document.body.appendChild(child));
    }

  }, [location.pathname, customPageKey, JSON.stringify(dynamicVars), JSON.stringify(customOverrides), seoData]);

  return null;
};

export default SEOHead;
