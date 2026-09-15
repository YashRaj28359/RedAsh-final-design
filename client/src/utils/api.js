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

const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
export const API_URL = import.meta.env.VITE_API_URL || (isLocal ? 'http://localhost:5000' : 'https://redash-final-design.onrender.com');

export const fetchContent = (forceFresh = false) => {
  if (fetchPromise && !forceFresh) return fetchPromise;
  
  fetchPromise = fetch(`${API_URL}/api/content?t=${Date.now()}`, { cache: 'no-store' })
    .then(res => res.json())
    .then(data => {
      cachedData = data;
      try {
        localStorage.setItem('redash_content', JSON.stringify(data));
      } catch (e) {}
      fetchPromise = null;
      return data;
    })
    .catch(err => {
      fetchPromise = null;
      throw err;
    });
    
  return fetchPromise;
};

