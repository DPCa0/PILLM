const fetch = require('node-fetch');

 
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

 
async function* fetchWithRetry(url, retries = 3, delayTime = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      yield data;
      return;  
    } catch (error) {
      console.error(`Attempt ${attempt} failed: ${error.message}`);
      if (attempt < retries) {
        print(`Retrying in ${delayTime} ms...`);
        await delay(delayTime);
      } else {
        throw new Error('All attempts failed');
      }
    }
  }
}

 
const dataLogger = {
  get: (target, property) => {
    const originalValue = target[property];
    if (typeof originalValue === 'function') {
      return function (...args) {
        print(`Calling ${property} with arguments:`, args);
        const result = originalValue.apply(this, args);
        print(`Result from ${property}:`, result);
        return result;
      };
    }
    print(`Accessing property ${property}:`, originalValue);
    return originalValue;
  },
};

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  const fetchGen = fetchWithRetry(url);

  try {
    for await (let data of fetchGen) {
      const proxiedData = new Proxy(data, dataLogger);
      print('Fetched data:', proxiedData);

       
      print(`Post ID: ${proxiedData.id}`);
      print(`Post Title: ${proxiedData.title}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
