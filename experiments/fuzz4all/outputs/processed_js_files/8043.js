 

class NetworkRequest {
  constructor() {
    this.cache = new Map();
  }
  
   
  fetchData(url) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = { url, data: "Sample Data for " + url };
        this.cache.set(url, data);
        resolve(data);
      }, 1000);
    });
  }
  
  async getData(url) {
    if (this.cache.has(url)) {
      print("Returning cached data for:", url);
      return Promise.resolve(this.cache.get(url));
    }
    print("Fetching data for:", url);
    return await this.fetchData(url);
  }
}

 
const handler = {
  get(target, propKey, receiver) {
    if (typeof target[propKey] === 'function') {
      return async function (...args) {
        const result = await target[propKey].apply(this, args);
        print("Operation result:", result);
        return result;
      };
    }
    return Reflect.get(target, propKey, receiver);
  }
};

(async () => {
  const request = new Proxy(new NetworkRequest(), handler);
  await request.getData('https://api.example.com/data1');
  await request.getData('https://api.example.com/data2');
  await request.getData('https://api.example.com/data1');  
})();
