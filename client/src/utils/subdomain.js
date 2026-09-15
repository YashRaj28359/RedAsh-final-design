export const getSubdomain = () => {
  if (typeof window === 'undefined') return 'main';
  const hostname = window.location.hostname.toLowerCase();
  if (hostname.startsWith('films.') || hostname.includes('films.redash')) return 'films';
  if (hostname.startsWith('agency.') || hostname.includes('agency.redash')) return 'agency';
  return 'main';
};

export const isFilmsSubdomain = () => getSubdomain() === 'films';
export const isAgencySubdomain = () => getSubdomain() === 'agency';

export const getEntertainmentPath = (path = '') => {
  const clean = path.replace(/^\/entertainment/, '').replace(/^\//, '');
  if (isFilmsSubdomain()) {
    return clean ? `/${clean}` : '/';
  }
  return clean ? `/entertainment/${clean}` : '/entertainment';
};

export const getAgencyPath = (path = '') => {
  const clean = path.replace(/^\/ad-agency/, '').replace(/^\//, '');
  if (isAgencySubdomain()) {
    return clean ? `/${clean}` : '/';
  }
  return clean ? `/ad-agency/${clean}` : '/ad-agency';
};

export const getEntertainmentUrl = (path = '') => {
  if (typeof window === 'undefined') return getEntertainmentPath(path);
  const hostname = window.location.hostname.toLowerCase();
  const clean = path.replace(/^\/entertainment/, '').replace(/^\//, '');
  
  if (isFilmsSubdomain()) {
    return clean ? `/${clean}` : '/';
  }
  if (hostname.includes('redash.in')) {
    const protocol = window.location.protocol;
    return `${protocol}//films.redash.in${clean ? `/${clean}` : '/'}`;
  }
  return clean ? `/entertainment/${clean}` : '/entertainment';
};

export const getAgencyUrl = (path = '') => {
  if (typeof window === 'undefined') return getAgencyPath(path);
  const hostname = window.location.hostname.toLowerCase();
  const clean = path.replace(/^\/ad-agency/, '').replace(/^\//, '');
  
  if (isAgencySubdomain()) {
    return clean ? `/${clean}` : '/';
  }
  if (hostname.includes('redash.in')) {
    const protocol = window.location.protocol;
    return `${protocol}//agency.redash.in${clean ? `/${clean}` : '/'}`;
  }
  return clean ? `/ad-agency/${clean}` : '/ad-agency';
};

export const getMainUrl = (path = '/') => {
  if (typeof window === 'undefined') return path;
  const hostname = window.location.hostname.toLowerCase();
  const clean = path.replace(/^\//, '');
  
  if (hostname.includes('redash.in') && (isFilmsSubdomain() || isAgencySubdomain())) {
    const protocol = window.location.protocol;
    return `${protocol}//redash.in${clean ? `/${clean}` : '/'}`;
  }
  return clean ? `/${clean}` : '/';
};
