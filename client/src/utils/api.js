let cachedData = null;
let fetchPromise = null;

export const getCachedContent = () => {
  if (cachedData) return cachedData;
  try {
    const local = localStorage.getItem('redash_content');
    if (local) {
      cachedData = JSON.parse(local);
      return cachedData;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
};

const isLocal = typeof window !== 'undefined' && (
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname.startsWith('192.168.')
);

// In production, never let localhost leak into API_URL
const getApiUrl = () => {
  if (isLocal) {
    return import.meta.env.VITE_API_URL || 'http://localhost:5000';
  }
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
    return envUrl;
  }
  return 'https://api.redash.in';
};

export const API_URL = getApiUrl();

export const fetchContent = (forceFresh = false) => {
  if (fetchPromise && !forceFresh) return fetchPromise;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);
  
  fetchPromise = fetch(`${API_URL}/api/content?t=${Date.now()}`, { 
    cache: 'no-store',
    signal: controller.signal 
  })
    .then(res => {
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return res.json();
    })
    .then(data => {
      cachedData = data;
      try {
        localStorage.setItem('redash_content', JSON.stringify(data));
      } catch (e) {}
      fetchPromise = null;
      return data;
    })
    .catch(err => {
      clearTimeout(timeoutId);
      fetchPromise = null;
      const fallbackCached = getCachedContent();
      if (fallbackCached) return fallbackCached;
      throw err;
    });
    
  return fetchPromise;
};

/**
 * Resolves an image src from DB/admin for use in the client frontend.
 * - Returns data:/blob: srcs as-is (fresh uploads)
 * - Prepends API_URL to /uploads/ paths
 * - Rejects broken Vite asset paths (/@fs/, localhost:5173, /assets/, /src/assets/)
 * - Falls back to the provided static import when src is invalid/missing
 */
export const resolveClientImage = (src, fallback) => {
  if (!src) return fallback;
  const s = typeof src === 'string' ? src.trim() : '';
  if (!s) return fallback;
  if (s.startsWith('data:') || s.startsWith('blob:')) return s;
  // Reject broken Vite dev-server paths that do not exist in production
  if (
    s.includes('/@fs/') ||
    s.includes('localhost:5173') ||
    s.startsWith('/src/assets/')
  ) return fallback;
  if (s.includes('redash-final-design.onrender.com')) {
    return s.replace('https://redash-final-design.onrender.com', API_URL);
  }
  if (s.startsWith('http://localhost:5000') && !isLocal) {
    return s.replace('http://localhost:5000', API_URL);
  }
  // Prepend API base URL for server-uploaded files
  if (s.startsWith('/uploads/')) return `${API_URL}${s}`;
  if (s.startsWith('uploads/')) return `${API_URL}/${s}`;
  if (s.startsWith('/media/')) return s;
  if (s.startsWith('http://') || s.startsWith('https://')) return s;
  if (s.startsWith('/')) return s;
  return fallback || s;
};

