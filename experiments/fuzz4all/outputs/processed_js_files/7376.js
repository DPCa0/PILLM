 

 
async function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
}

 
function* urlGenerator(urls) {
  for (let url of urls) {
    yield url;
  }
}

 
const handler = {
  get: (obj, prop) => {
    print(`Accessing property ${prop}`);
    return prop in obj ? obj[prop] : `Property ${prop} does not exist`;
  },
  set: (obj, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

 
let dataStore = { data: {} };
let proxyDataStore = new Proxy(dataStore, handler);

 
async function main() {
  const urls = ['https://api.example.com/1', 'https://api.example.com/2', 'https://api.example.com/3'];
  const urlGen = urlGenerator(urls);

  for (let url of urlGen) {
    print(`Fetching ${url}`);
    const data = await fetchData(url);
    proxyDataStore.data[url] = data;
    print(`Fetched data: ${proxyDataStore.data[url]}`);
  }

  print('Final data store:', proxyDataStore.data);
}

 
main();
