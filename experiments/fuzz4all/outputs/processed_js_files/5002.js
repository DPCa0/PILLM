 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve(`Data from ${url}`);
      } else {
        reject('No URL provided');
      }
    }, 1000);
  });
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      print(`Accessed property '${prop}'`);
      return Reflect.get(target, prop, receiver);
    } else {
      throw new ReferenceError(`Property '${prop}' does not exist`);
    }
  },
};

 
const cache = new Map();

async function getCachedData(url) {
  if (cache.has(url)) {
    print('Fetching from cache');
    return cache.get(url);
  } else {
    print('Fetching from network');
    const data = await fetchData(url);
    cache.set(url, data);
    return data;
  }
}

 
const obj = new Proxy({ name: 'JavaScript', type: 'Programming Language' }, handler);

 
(async () => {
  try {
    print(await getCachedData('https://api.example.com/data'));
    print(await getCachedData('https://api.example.com/data'));  

    print(obj.name);
    print(obj.type);

     
    print(obj.version);
  } catch (error) {
    console.error(error);
  }
})();
