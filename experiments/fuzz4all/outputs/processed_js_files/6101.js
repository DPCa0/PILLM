 
async function* fetchData() {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
  ];
  for (const url of urls) {
    const response = await fetch(url);
    const data = await response.json();
    yield data;
  }
}

const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Accessing property "${prop}" with value:`, target[prop]);
      return target[prop];
    }
    return `Property "${prop}" not found`;
  }
};

(async () => {
  const generator = fetchData();
  const cache = {};
  const proxyCache = new Proxy(cache, handler);

  for await (const data of generator) {
    proxyCache[data.id] = data;
  }

   
  print(proxyCache[1]);
  print(proxyCache[2]);
  print(proxyCache[3]);  
})();
