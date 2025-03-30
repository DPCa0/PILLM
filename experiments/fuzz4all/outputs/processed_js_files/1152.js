 

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class DataCache {
  constructor() {
    this.cache = new Map();
    this.fetchCount = 0;
  }

  async fetchData(key) {
    if (this.cache.has(key)) {
      return `Cached: ${this.cache.get(key)}`;
    }
    await delay(1000);  
    const data = `Data for ${key}`;
    this.cache.set(key, data);
    this.fetchCount++;
    return data;
  }
}

 
const cacheHandler = {
  get: (target, prop, receiver) => {
    if (prop === 'fetchCount') {
      print(`Fetching data: ${target[prop]} times`);
    }
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value, receiver) => {
    if (prop === 'cache') {
      print('Direct modification of cache is not allowed!');
      return false;
    }
    return Reflect.set(target, prop, value, receiver);
  }
};

const cache = new Proxy(new DataCache(), cacheHandler);

 
const logFetch = Symbol('logFetch');

cache[logFetch] = function() {
  print(`Total fetches: ${this.fetchCount}`);
};

(async () => {
  print(await cache.fetchData('user1'));
  print(await cache.fetchData('user2'));
  print(await cache.fetchData('user1'));  

   
  cache[logFetch]();
})();
