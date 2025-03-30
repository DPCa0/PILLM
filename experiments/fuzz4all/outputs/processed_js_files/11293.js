 

 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: `Data from ${url}` });
      } else {
        reject(new Error('Invalid URL'));
      }
    }, 1000);
  });
}

 
const requestSet = new Set();

 
const handler = {
  get(target, prop) {
    print(`Accessing property "${prop}"`);
    return Reflect.get(target, prop);
  }
};

 
const DataCache = new Proxy(new Map(), handler);

 
async function getData(url) {
  if (DataCache.has(url)) {
    return DataCache.get(url);
  }

  if (requestSet.has(url)) {
    throw new Error('Request for this URL is already in process');
  }

  requestSet.add(url);

  try {
    const response = await fetchData(url);
    DataCache.set(url, response.data);
    return response.data;
  } finally {
    requestSet.delete(url);
  }
}

 
(async () => {
  const url = 'https://example.com/api';

  try {
    print('Fetching first time...');
    print(await getData(url));

    print('Fetching second time...');
    print(await getData(url));
  } catch (error) {
    console.error(error);
  }
})();
