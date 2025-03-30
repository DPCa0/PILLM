class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const memoizeAsync = (fn) => {
  const cache = new Map();
  return async function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      const deferred = cache.get(key);
      return deferred.promise;
    }
    const deferred = new Deferred();
    cache.set(key, deferred);
    try {
      const result = await fn(...args);
      deferred.resolve(result);
    } catch (error) {
      deferred.reject(error);
    }
    return deferred.promise;
  };
};

 
const fetchWithCache = memoizeAsync(fetchData);

const url = "https://api.example.com/data";

fetchWithCache(url)
  .then(data => console.log("First call, fetched data:", data))
  .catch(error => console.error("Error fetching data:", error));

fetchWithCache(url)
  .then(data => console.log("Second call, cached data:", data))
  .catch(error => console.error("Error fetching cached data:", error));
