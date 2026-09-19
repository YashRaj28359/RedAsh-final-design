// Default SEO Configuration for RedAsh Website (Supporting redash.in, films.redash.in, agency.redash.in)
export const DEFAULT_SEO = {
  globalFavicon: '/uploads/redash-main-logo.png',

  // 1. RedAsh Main Hub (redash.in)
  main: {
    siteName: 'RedAsh Films & Media',
    domain: 'redash.in',
    title: 'RedAsh Films & Media | Premium Film Production & Creative Ad Agency Mumbai',
    titleTemplate: '{page_name} | {site_name}',
    description: 'RedAsh is a premier film production house and creative ad agency creating captivating films, digital series, microdramas, and high-converting brand commercials.',
    keywords: 'RedAsh, RedAsh Films, film production, advertising agency, microdrama, web series, video production, commercial ad films, Ashish Lal',
    canonicalUrl: 'https://redash.in',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    favicon: '/logos/redash-main-logo.png',
    
    // Open Graph / WhatsApp
    ogTitle: 'RedAsh Films & Media | Film Production & Creative Ad Agency',
    ogDescription: 'Premier film production company and creative ad agency crafting memorable storytelling for screens of every size.',
    ogImage: '/logos/redash-main-logo.png',
    ogType: 'website',
    
    // Twitter/X Card
    twitterCard: 'summary_large_image',
    twitterTitle: 'RedAsh Films & Media',
    twitterDescription: 'Premier film production company and creative ad agency.',
    twitterImage: '/logos/redash-main-logo.png',
    twitterSite: '@RedashFilms',
    twitterCreator: '@RedashFilms',

    // Google Knowledge Panel & Social Profiles (sameAs & hasMap for SERP)
    googleLocationUrl: 'https://maps.google.com/?q=Peninsula+Park+Office+1302-1305+Andheri+West+Mumbai+400053',
    instagramUrl: 'https://www.instagram.com/redashfilms/',
    linkedinUrl: 'https://www.linkedin.com/company/redashfilms/',
    youtubeUrl: 'https://www.youtube.com/@RedAshFilms',
    facebookUrl: 'https://www.facebook.com/redashfilms',
    twitterUrl: 'https://x.com/redashfilms',

    // Specific Pages for main domain
    pages: {
      home: {
        pageName: 'Home',
        path: '/',
        title: 'RedAsh Films & Media | Film Production & Ad Agency Mumbai',
        description: 'Welcome to RedAsh - A multifaceted creative studio producing premium fiction films, web series, microdramas, and commercial advertising campaigns.',
        keywords: 'film studio mumbai, ad agency, video production company, brand films',
        canonicalUrl: 'https://redash.in/',
        robots: 'index, follow',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        twitterTitle: '',
        twitterDescription: '',
        twitterImage: '',
        customSchema: ''
      }
    }
  },

  // 2. Entertainment & Original Films Subdomain (films.redash.in / redashfilms.com)
  films: {
    siteName: 'RedAsh Entertainment',
    domain: 'films.redash.in',
    title: 'Film Production Company & Ad Agency in India - RedAsh Films',
    titleTemplate: '{page_name} | RedAsh Films',
    description: 'Founded in 2007 by Ashish Lal, an engineer from IIT Delhi, RedAsh Films is a reputed Film Production Company & Ad Agency based in Mumbai.',
    keywords: 'Film Production Company India, Ad Agency Mumbai, RedAsh Films, Ashish Lal filmmaker, IIT Delhi, web series production, microdramas, corporate films',
    canonicalUrl: 'https://films.redash.in',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    favicon: '/logos/redash-films-logo.png',
    
    // Open Graph / WhatsApp
    ogTitle: 'Film Production Company & Ad Agency in India - RedAsh Films',
    ogDescription: 'Founded in 2007 by Ashish Lal, an engineer from IIT Delhi, RedAsh Films is a reputed Film Production Company & Ad Agency based in Mumbai.',
    ogImage: '/logos/redash-films-logo.png',
    ogType: 'website',
    
    // Twitter/X Card
    twitterCard: 'summary_large_image',
    twitterTitle: 'Film Production Company & Ad Agency in India - RedAsh Films',
    twitterDescription: 'Founded in 2007 by Ashish Lal, an engineer from IIT Delhi, RedAsh Films is a reputed Film Production Company & Ad Agency based in Mumbai.',
    twitterImage: '/logos/redash-films-logo.png',
    twitterSite: '@RedashFilms',
    twitterCreator: '@RedashFilms',

    // Google Knowledge Panel & Social Profiles
    googleLocationUrl: 'https://maps.google.com/?q=Peninsula+Park+Office+1302-1305+Andheri+West+Mumbai+400053',
    instagramUrl: 'https://www.instagram.com/redashfilms/',
    linkedinUrl: 'https://www.linkedin.com/company/redashfilms/',
    youtubeUrl: 'https://www.youtube.com/@RedAshFilms',
    facebookUrl: 'https://www.facebook.com/redashfilms',
    twitterUrl: 'https://x.com/redashfilms',

    // Pages on films.redash.in
    pages: {
      home: {
        pageName: 'Entertainment Home',
        path: '/',
        title: 'Film Production Company & Ad Agency in India - RedAsh Films',
        description: 'Founded in 2007 by Ashish Lal, an engineer from IIT Delhi, RedAsh Films is a reputed Film Production Company & Ad Agency based in Mumbai.',
        keywords: 'Film Production Company India, Ad Agency Mumbai, RedAsh Films, Ashish Lal',
        canonicalUrl: 'https://films.redash.in/',
        robots: 'index, follow',
        ogTitle: 'Film Production Company & Ad Agency in India - RedAsh Films',
        ogDescription: 'Founded in 2007 by Ashish Lal, an engineer from IIT Delhi, RedAsh Films is a reputed Film Production Company & Ad Agency based in Mumbai.',
        ogImage: '/logos/redash-films-logo.png',
        twitterTitle: '',
        twitterDescription: '',
        twitterImage: '',
        customSchema: ''
      },
      about: {
        pageName: 'About Entertainment',
        path: '/about',
        title: 'About RedAsh Entertainment | Vision & Filmmakers',
        description: 'Learn about RedAsh Entertainment, our creative philosophy, leadership team led by IIT Delhi alumnus Ashish Lal, and our journey in Indian cinema.',
        keywords: 'about redash films, ashish lal filmmaker, film production leadership, creative vision',
        canonicalUrl: 'https://films.redash.in/about',
        robots: 'index, follow',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        twitterTitle: '',
        twitterDescription: '',
        twitterImage: '',
        customSchema: ''
      },
      films: {
        pageName: 'Films & Shows',
        path: '/films',
        title: 'Our Films, Shows & Microdramas | RedAsh Entertainment',
        description: 'Explore our portfolio of released and upcoming horizontal feature films, acclaimed web series, and 150M+ viewed microdrama originals.',
        keywords: 'redash films list, billionaire on plane, with love delhi, the codpaster, casting ouch',
        canonicalUrl: 'https://films.redash.in/films',
        robots: 'index, follow',
        ogTitle: 'Watch RedAsh Films & Shows Portfolio',
        ogDescription: 'Explore our complete catalog of feature films, web series, and trending microdramas.',
        ogImage: '',
        twitterTitle: '',
        twitterDescription: '',
        twitterImage: '',
        customSchema: ''
      },
      blog: {
        pageName: 'Entertainment Blogs',
        path: '/blog',
        title: 'Entertainment News & Behind The Scenes | RedAsh Blog',
        description: 'Read the latest updates, production diaries, behind-the-scenes insights, and filmmaking articles from the RedAsh Entertainment team.',
        keywords: 'filmmaking blog, bollywood behind the scenes, ott industry trends, redash news',
        canonicalUrl: 'https://films.redash.in/blog',
        robots: 'index, follow',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        twitterTitle: '',
        twitterDescription: '',
        twitterImage: '',
        customSchema: ''
      },
      media: {
        pageName: 'Press & Media',
        path: '/media',
        title: 'Press & Media Coverage | RedAsh in the News',
        description: 'See what Times of India, Mid-Day, Zee News, and leading entertainment media publications are saying about RedAsh productions.',
        keywords: 'redash press release, ashish lal mid-day, times of india redash, media features',
        canonicalUrl: 'https://films.redash.in/media',
        robots: 'index, follow',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        twitterTitle: '',
        twitterDescription: '',
        twitterImage: '',
        customSchema: ''
      },
      contact: {
        pageName: 'Contact Entertainment',
        path: '/contact',
        title: 'Contact RedAsh Entertainment | Pitch, Collaborate & Cast',
        description: 'Connect with RedAsh Entertainment for film co-productions, OTT distribution, talent auditions, casting profiles, and investor inquiries.',
        keywords: 'contact redash films, film casting mumbai, pitch script, film investor contact',
        canonicalUrl: 'https://films.redash.in/contact',
        robots: 'index, follow',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        twitterTitle: '',
        twitterDescription: '',
        twitterImage: '',
        customSchema: ''
      },
      blogPostTemplate: {
        pageName: 'Blog Post Template',
        path: '/blog/:slug',
        title: '{post_title} | RedAsh Entertainment',
        description: 'Read {post_title} on RedAsh Entertainment. Production news, casting updates, and behind the scenes.',
        keywords: 'redash article, filmmaking, entertainment news',
        canonicalUrl: 'https://films.redash.in/blog/{slug}',
        robots: 'index, follow',
        ogTitle: '{post_title}',
        ogDescription: 'Read the full story on RedAsh Entertainment.',
        ogImage: '',
        twitterTitle: '{post_title}',
        twitterDescription: '',
        twitterImage: '',
        customSchema: ''
      }
    }
  },

  // 3. Creative Ad Agency Subdomain (agency.redash.in)
  agency: {
    siteName: 'RedAsh Ad Agency',
    domain: 'agency.redash.in',
    title: 'RedAsh Ad Agency | High-Impact Brand Films & Commercials Mumbai',
    titleTemplate: '{page_name} | RedAsh Ad Agency',
    description: 'RedAsh Ad Agency produces high-converting TV commercials, corporate films, digital ad campaigns, and brand storytelling that drives massive ROI.',
    keywords: 'creative advertising agency mumbai, tv commercial production, corporate brand films, digital ads agency, brand video campaigns',
    canonicalUrl: 'https://agency.redash.in',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    favicon: '/logos/redash-agency-logo.png',
    
    // Open Graph / WhatsApp
    ogTitle: 'RedAsh Ad Agency | Impactful Brand Storytelling & Commercials',
    ogDescription: 'We help leading global and Indian brands create TVCs, digital video ads, and campaign films that resonate.',
    ogImage: '/logos/redash-agency-logo.png',
    ogType: 'website',
    
    // Twitter/X Card
    twitterCard: 'summary_large_image',
    twitterTitle: 'RedAsh Ad Agency',
    twitterDescription: 'Cinematic commercials, corporate films, and digital ad campaigns.',
    twitterImage: '/logos/redash-agency-logo.png',
    twitterSite: '@RedashFilms',
    twitterCreator: '@RedashFilms',

    // Google Knowledge Panel & Social Profiles
    googleLocationUrl: 'https://maps.google.com/?q=Peninsula+Park+Office+1302-1305+Andheri+West+Mumbai+400053',
    instagramUrl: 'https://www.instagram.com/redashfilms/',
    linkedinUrl: 'https://www.linkedin.com/company/redashfilms/',
    youtubeUrl: 'https://www.youtube.com/@RedAshFilms',
    facebookUrl: 'https://www.facebook.com/redashfilms',
    twitterUrl: 'https://x.com/redashfilms',

    // Pages on agency.redash.in
    pages: {
      home: {
        pageName: 'Ad Agency Home',
        path: '/',
        title: 'RedAsh Ad Agency | High-Impact Brand Films & Commercials Mumbai',
        description: 'RedAsh Ad Agency produces high-converting TV commercials, corporate films, digital ad campaigns, and brand storytelling that drives massive ROI.',
        keywords: 'creative advertising agency mumbai, tv commercial production, corporate brand films, digital ads agency',
        canonicalUrl: 'https://agency.redash.in/',
        robots: 'index, follow',
        ogTitle: 'RedAsh Ad Agency | Impactful Brand Storytelling & Commercials',
        ogDescription: 'We help leading global and Indian brands create TVCs, digital video ads, and campaign films that resonate.',
        ogImage: '',
        twitterTitle: '',
        twitterDescription: '',
        twitterImage: '',
        customSchema: ''
      },
      about: {
        pageName: 'About Ad Agency',
        path: '/about',
        title: 'About RedAsh Ad Agency | Creative Excellence & Strategy',
        description: 'Learn about RedAsh Ad Agency’s strategic methodology, storytelling prowess, and how our cinematic approach elevates brands.',
        keywords: 'about ad agency, creative strategy mumbai, advertising directors, brand storytelling agency',
        canonicalUrl: 'https://agency.redash.in/about',
        robots: 'index, follow',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        twitterTitle: '',
        twitterDescription: '',
        twitterImage: '',
        customSchema: ''
      },
      films: {
        pageName: 'Commercials Portfolio',
        path: '/films',
        title: 'Commercials & Brand Campaigns Portfolio | RedAsh Agency',
        description: 'Browse our portfolio of award-winning TVCs, digital commercials, enterprise brand videos, and testimonial campaigns.',
        keywords: 'ad portfolio, brand films showcase, tv commercial showreel, corporate video examples',
        canonicalUrl: 'https://agency.redash.in/films',
        robots: 'index, follow',
        ogTitle: 'Watch RedAsh Brand Campaigns & Commercials',
        ogDescription: 'Explore our portfolio of high-impact ad films produced for top Indian and international enterprises.',
        ogImage: '',
        twitterTitle: '',
        twitterDescription: '',
        twitterImage: '',
        customSchema: ''
      },
      blog: {
        pageName: 'Agency Insights & Blog',
        path: '/blog',
        title: 'Advertising Insights & Growth Strategies | RedAsh Blog',
        description: 'Expert articles on modern video marketing, consumer psychology, brand film production, and ROI-driven advertising trends.',
        keywords: 'advertising blog, video marketing tips, commercial production guide, brand strategy insights',
        canonicalUrl: 'https://agency.redash.in/blog',
        robots: 'index, follow',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        twitterTitle: '',
        twitterDescription: '',
        twitterImage: '',
        customSchema: ''
      },
      media: {
        pageName: 'Agency Media & Press',
        path: '/media',
        title: 'Agency Media & Industry Recognition | RedAsh Ad Agency',
        description: 'Media coverage and industry features recognizing RedAsh Ad Agency’s innovative campaigns and commercial film work.',
        keywords: 'advertising news, brand campaign coverage, ad agency press mentions',
        canonicalUrl: 'https://agency.redash.in/media',
        robots: 'index, follow',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        twitterTitle: '',
        twitterDescription: '',
        twitterImage: '',
        customSchema: ''
      },
      contact: {
        pageName: 'Hire Ad Agency',
        path: '/contact',
        title: 'Hire RedAsh Ad Agency | Request a Proposal for Your Brand',
        description: 'Ready to elevate your brand with cinematic commercials and high-converting video campaigns? Contact RedAsh Ad Agency today for a proposal.',
        keywords: 'hire ad agency mumbai, video ad quote, corporate film maker contact, commercial agency inquiry',
        canonicalUrl: 'https://agency.redash.in/contact',
        robots: 'index, follow',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        twitterTitle: '',
        twitterDescription: '',
        twitterImage: '',
        customSchema: ''
      },
      blogPostTemplate: {
        pageName: 'Blog Post Template',
        path: '/blog/:slug',
        title: '{post_title} | RedAsh Ad Agency',
        description: 'Read {post_title} on RedAsh Ad Agency. Video marketing tips, commercial production, and brand growth insights.',
        keywords: 'advertising blog, brand strategy, commercial video production',
        canonicalUrl: 'https://agency.redash.in/blog/{slug}',
        robots: 'index, follow',
        ogTitle: '{post_title}',
        ogDescription: 'Read the full story on RedAsh Ad Agency.',
        ogImage: '',
        twitterTitle: '{post_title}',
        twitterDescription: '',
        twitterImage: '',
        customSchema: ''
      }
    }
  },

  // Global / Shared Schema Settings
  schema: {
    enableOrganizationSchema: true,
    enableWebSiteSchema: true,
    enableBreadcrumbSchema: true,
    organizationName: 'RedAsh Films & Media',
    organizationLogo: 'https://redash.in/logo.png',
    organizationDescription: 'Award-winning film production company and creative ad agency specializing in feature films, digital originals, and high-impact brand commercials.',
    organizationUrl: 'https://redash.in',
    organizationPhone: '+91 98200 00000',
    organizationEmail: 'info@redashfilms.com',
    organizationAddress: {
      street: '1302-1305, Peninsula Park, Fun Republic Lane, Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400053',
      country: 'IN'
    },
    customJsonLd: ''
  },

  // Verification & Analytics
  verification: {
    googleSiteVerification: '',
    bingSiteVerification: '',
    googleAnalyticsId: '',
    googleTagManagerId: ''
  },

  // Robots.txt Settings
  robotsTxt: {
    allowAll: true,
    customRules: `# Robots.txt for RedAsh Domains
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/admin/

# Search Engine Crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /`
  },

  // Dynamic Sitemap Settings
  sitemap: {
    enabled: true,
    baseUrl: 'https://redash.in',
    includeEntertainmentSubdomain: true,
    includeAgencySubdomain: true,
    includeBlogs: true,
    defaultChangeFreq: 'weekly',
    defaultPriority: '0.8',
    homepagePriority: '1.0',
    blogPriority: '0.7'
  },

  // Custom Code Injections
  advanced: {
    customHeadCode: '',
    customBodyCode: '',
    customFooterCode: ''
  }
};
