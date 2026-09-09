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

export const fetchContent = () => {
  fetchPromise = fetch('https://redash-final-design.onrender.com/api/content')
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
