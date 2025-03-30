 

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const timeoutFetch = async (url, timeout) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Fetch aborted due to timeout');
    } else {
      console.error('Fetch error:', error.message);
    }
  }
};

const cachedFetchData = (() => {
  const cache = new Map();
  return async (url) => {
    if (cache.has(url)) {
      print('Returning cached data');
      return cache.get(url);
    }
    print('Fetching new data');
    const data = await fetchData(url);
    cache.set(url, data);
    return data;
  };
})();

const handler = {
  get: (target, prop) => {
    if (prop === 'length') {
      return target[prop] * 2;
    }
    return target[prop];
  }
};

const enhancedArray = new Proxy([1, 2, 3], handler);

(async () => {
  try {
    print('Original array length:', [1, 2, 3].length);  
    print('Enhanced array length:', enhancedArray.length);  

    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const data = await cachedFetchData(url);
    print('Fetched data:', data);

    await delay(1000);
    
     
    await timeoutFetch(url, 100);
  } catch (error) {
    console.error('Error:', error);
  }
})();
