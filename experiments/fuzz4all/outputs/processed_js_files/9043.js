 

 
class DataFetcher {
  constructor() {
    this.cache = new Map();
  }

  async fetch(url) {
    if (this.cache.has(url)) {
      print('Fetching from cache:', url);
      return this.cache.get(url);
    }

    print('Fetching from network:', url);
    const response = await fetch(url);
    const data = await response.json();
    this.cache.set(url, data);
    return data;
  }
}

 
const dataFetcher = new DataFetcher();
const handler = {
  get(target, prop) {
    if (typeof target[prop] === 'function') {
      return async (...args) => {
        print(`Called ${prop} with arguments:`, args);
        const result = await target[prop](...args);
        print(`Result from ${prop}:`, result);
        return result;
      };
    }
    return target[prop];
  }
};

const proxiedFetcher = new Proxy(dataFetcher, handler);

async function main() {
  const url1 = 'https://jsonplaceholder.typicode.com/todos/1';
  const url2 = 'https://jsonplaceholder.typicode.com/todos/2';
  
  try {
    const result1 = await proxiedFetcher.fetch(url1);
    print('Fetched Data:', result1);
    
    const result2 = await proxiedFetcher.fetch(url2);
    print('Fetched Data:', result2);
    
     
    const cachedResult1 = await proxiedFetcher.fetch(url1);
    print('Cached Data:', cachedResult1);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

main();
