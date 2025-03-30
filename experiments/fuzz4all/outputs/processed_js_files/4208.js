 

 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({ data: [1, 2, 3, 4, 5] });
      } else {
        reject(new Error('Invalid URL'));
      }
    }, 1000);
  });
}

 
const mapHandler = {
  get: (target, prop) => {
    if (prop === 'length') return target.size;
    return target.get(prop);
  },
  set: (target, prop, value) => {
    target.set(prop, value);
    return true;
  },
};

 
async function processData(...urls) {
  const dataMap = new Map();
  const proxy = new Proxy(dataMap, mapHandler);

  for (const url of urls) {
    try {
      const { data } = await fetchData(url);
      proxy[url] = [...data, ...data.map((x) => x * 2)];
    } catch (error) {
      console.error(`Error fetching from ${url}: ${error.message}`);
    }
  }

  print(`Processed Data Length: ${proxy.length}`);
  return proxy;
}

 
processData('https://api.example.com/data', 'https://invalid.url').then((data) => {
  data.forEach((value, key) => {
    print(`Data from ${key}: `, value);
  });
});
