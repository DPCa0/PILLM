 

class DataFetcher {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
    this.cache = new Map();
  }

   
  async fetchData(key) {
    if (this.cache.has(key)) {
      print(`Returning cached data for ${key}`);
      return this.cache.get(key);
    }
    
    print(`Fetching data for ${key} from API`);
    const response = await fetch(`${this.apiEndpoint}?key=${key}`);
    const data = await response.json();
    this.cache.set(key, data);
    return data;
  }
}

const apiProxyHandler = {
  get(target, prop, receiver) {
    if (prop === 'getAsyncData') {
      return async function(key) {
        try {
          const data = await target.fetchData(key);
          return Promise.resolve(data);
        } catch (error) {
          return Promise.reject(`Error fetching data: ${error}`);
        }
      };
    }
    return Reflect.get(...arguments);
  }
};

 
const apiProxy = new Proxy(new DataFetcher('https://api.example.com/data'), apiProxyHandler);

async function displayData() {
  try {
    const data = await apiProxy.getAsyncData('item42');
    print('Data:', data);
  } catch (error) {
    console.error(error);
  }
}

displayData();
