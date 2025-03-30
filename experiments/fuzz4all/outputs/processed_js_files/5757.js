 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: `Data from ${url}` });
      } else {
        reject('URL not provided');
      }
    }, 1000);
  });
}

 
const handler = {
  get(target, property, receiver) {
    if (property in target) {
      print(`Getting property '${property}'`);
      return Reflect.get(target, property, receiver);
    } else {
      console.error(`Property '${property}' not found`);
      return undefined;
    }
  },
  set(target, property, value, receiver) {
    print(`Setting property '${property}' to '${value}'`);
    return Reflect.set(target, property, value, receiver);
  }
};

 
const dataStore = {
  cache: {},
  addData(key, value) {
    this.cache[key] = value;
  },
  getData(key) {
    return this.cache[key];
  }
};

 
const proxiedDataStore = new Proxy(dataStore, handler);

async function loadAndCacheData(url) {
  try {
    const response = await fetchData(url);
    print('Data fetched:', response.data);
    
     
    proxiedDataStore.addData(url, response.data);
    const cachedData = proxiedDataStore.getData(url);
    print('Cached data:', cachedData);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
loadAndCacheData('http://example.com/api');
