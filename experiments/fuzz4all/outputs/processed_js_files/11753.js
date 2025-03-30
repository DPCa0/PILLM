 

 
async function* fetchData() {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3',
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
      print(`Accessing property ${prop}:`, target[prop]);
      return target[prop];
    } else {
      console.warn(`Property ${prop} does not exist on target object.`);
      return undefined;
    }
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to:`, value);
    target[prop] = value;
    return true;
  },
};

 
(async function processFetchedData() {
  const generator = fetchData();

  for await (let data of generator) {
    const proxyData = new Proxy(data, handler);

     
    print('Title:', proxyData.title);
    proxyData.newProperty = 'This is a new property';

     
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
})();
