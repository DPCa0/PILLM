 
const delay = ms => new Promise(res => setTimeout(res, ms));

 
const memoize = fn => {
  const cache = new Map();
  return async (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = await fn(...args);
    cache.set(key, result);
    return result;
  };
};

 
const fetchData = async (url) => {
  await delay(1000);  
  return `Data from ${url}`;
};

 
const memoizedFetchData = memoize(fetchData);

 
async function* fetchPaginatedData(baseUrl, pages) {
  for (let i = 1; i <= pages; i++) {
    const data = await memoizedFetchData(`${baseUrl}/page/${i}`);
    yield data;
  }
}

 
(async () => {
  const baseUrl = 'https://api.example.com/resources';
  const pages = 3;
  
   
  for await (const pageData of fetchPaginatedData(baseUrl, pages)) {
    print(pageData);
  }
})();
