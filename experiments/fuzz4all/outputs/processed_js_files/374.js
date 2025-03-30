 

class AsyncCache {
  constructor() {
    this.store = new Map();
    this.proxy = new Proxy(this, {
      get(target, prop, receiver) {
        if (Reflect.has(target.store, prop)) {
          print(`Fetching ${prop} from cache.`);
          return Reflect.get(target.store, prop, receiver);
        }
        console.warn(`Property ${prop} does not exist.`);
        return null;
      },
      set(target, prop, value, receiver) {
        print(`Setting ${prop} to ${value}.`);
        return Reflect.set(target.store, prop, value, receiver);
      }
    });
  }

  async fetchData(key, fetchFunction) {
    if (!this.store.has(key)) {
      print(`Fetching ${key} from source.`);
      const data = await fetchFunction();
      this.store.set(key, data);
    } else {
      print(`Using cached data for ${key}.`);
    }
    return this.proxy[key];
  }
}

 
const fetchFromAPI = (endpoint) => new Promise((resolve) =>
  setTimeout(() => resolve(`Data from ${endpoint}`), 1000)
);

(async () => {
  const cache = new AsyncCache();

   
  const userData = await cache.fetchData('user', () => fetchFromAPI('/user'));
  print(userData);  

  const userDataAgain = await cache.fetchData('user', () => fetchFromAPI('/user'));
  print(userDataAgain);  

  cache.proxy['newKey'] = 'New Value';  
  print(cache.proxy['newKey']);  
})();
