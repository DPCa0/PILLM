 

class Cache {
  constructor() {
    this.store = new Map();
    return new Proxy(this, {
      get(target, property) {
        if (typeof target[property] === 'function') {
          return target[property].bind(target);
        }
        return target.store.get(property);
      },
      set(target, property, value) {
        target.store.set(property, value);
        return true;
      },
    });
  }

  async fetchData(key, fetchFunction) {
    if (!this.store.has(key)) {
      try {
        const data = await fetchFunction();
        this.store.set(key, data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
    return this.store.get(key);
  }
}

 

const cache = new Cache();

async function fetchFromApi() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Fetched Data from API'), 1000);
  });
}

async function main() {
  const data1 = await cache.fetchData('apiData', fetchFromApi);
  print(data1);  

  const data2 = await cache.fetchData('apiData', fetchFromApi);
  print(data2);  
}

main();
