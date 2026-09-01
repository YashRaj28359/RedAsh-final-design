let cachedData = null;
let fetchPromise = null;

export const fetchContent = () => {
  /*
  if (cachedData) {
    return Promise.resolve(cachedData);
  }
  if (fetchPromise) {
    return fetchPromise;
  }
  */
  
  fetchPromise = fetch('http://localhost:5000/api/content')
    .then(res => res.json())
    .then(data => {
      cachedData = data;
      fetchPromise = null;
      return data;
    })
    .catch(err => {
      fetchPromise = null;
      throw err;
    });
    
  return fetchPromise;
};
