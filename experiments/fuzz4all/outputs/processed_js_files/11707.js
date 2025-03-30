 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve({ data: `Fetched data from ${url}` });
      } else {
        reject('Fetch error');
      }
    }, 1000);
  });
}

 
function* asyncGenerator(urls) {
  for (const url of urls) {
    yield fetchData(url);
  }
}

 
async function processUrls(urls) {
  const generator = asyncGenerator(urls);
  for (let promise of generator) {
    try {
      const result = await promise;
      print(result.data);
    } catch (error) {
      console.error(error);
    }
  }
}

 
const target = {
  name: 'Advanced JS Example',
  version: '1.0'
};

const handler = {
  get: (obj, prop) => {
    print(`Getting property ${prop}`);
    return prop in obj ? obj[prop] : 'Property not found';
  },
  set: (obj, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

 
print(proxy.name);
proxy.version = '1.1';
print(proxy.version);

 
const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];

 
processUrls(urls);
