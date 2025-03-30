 

class ApiCache {
  constructor() {
    this.cache = new Map();
    this.handler = {
      get: (target, prop) => {
        if (prop in target) {
          print(`Fetching ${prop} from cache`);
          return Promise.resolve(target[prop]);
        } else {
          print(`Fetching ${prop} from API`);
          return this.fetchFromApi(prop).then(data => {
            target[prop] = data;
            return data;
          });
        }
      }
    };
  }

  fetchFromApi(endpoint) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = `Response from ${endpoint}`;
        resolve(data);
      }, 1000);
    });
  }

  createProxy() {
    return new Proxy(this.cache, this.handler);
  }
}

(async function() {
  const apiCache = new ApiCache();
  const api = apiCache.createProxy();

   
  print(await api.users);
   
  print(await api.users);
  
   
  print(await api.posts);
})();
