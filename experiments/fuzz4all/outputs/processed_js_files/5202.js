 

 
const ID = Symbol('id');

 
async function fetchData(url) {
  const cache = new Map();

   
  const handler = {
    get(target, prop, receiver) {
      if (prop === 'get') {
        return async function (key) {
          if (cache.has(key)) {
            print('Serving from cache:', key);
            return cache.get(key);
          } else {
            print('Fetching:', key);
            const response = await fetch(url + key);
            const data = await response.json();
            cache.set(key, data);
            return data;
          }
        };
      }
      return Reflect.get(target, prop, receiver);
    }
  };

  const proxy = new Proxy({}, handler);
  return proxy;
}

 
(async () => {
  const api = await fetchData('https://jsonplaceholder.typicode.com/posts/');
  
  const ids = [1, 2, 3, 1];  

   
  for (let id of ids) {
    const post = await api.get(id);
    post[ID] = id;  
    print(`Post ID [${post[ID]}]:`, post);
  }
})();
