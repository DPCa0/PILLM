 

 
function* urlGenerator() {
  const base = 'https://jsonplaceholder.typicode.com/';
  const endpoints = ['posts', 'comments', 'albums'];
  for (let endpoint of endpoints) {
    yield `${base}${endpoint}`;
  }
}

 
async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

 
const dataHandler = {
  get: async function (target, property) {
    if (!target.cache) target.cache = {};
    if (!target.cache[property]) {
      target.cache[property] = await fetchData(property);
    }
    return target.cache[property];
  },
};

async function processData() {
  const urls = urlGenerator();
  const proxy = new Proxy({}, dataHandler);

   
  for (let url of urls) {
    const data = await proxy[url];
    print(`Data from ${url}:`, data.slice(0, 2));  
  }
}

processData().catch(error => console.error("Error fetching data:", error));
