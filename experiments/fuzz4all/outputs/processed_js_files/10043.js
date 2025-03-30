 
async function* fetchDataGenerator(urls) {
  for (const url of urls) {
    yield fetch(url).then(response => response.json());
  }
}

 
function createLoggingProxy(target) {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Accessed property: ${prop}`);
      return obj[prop];
    },
    set: (obj, prop, value) => {
      print(`Setting property: ${prop} to ${value}`);
      obj[prop] = value;
      return true;
    }
  });
}

 
const urls = ['https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2'];

 
(async () => {
  for await (const dataPromise of fetchDataGenerator(urls)) {
    const data = await dataPromise;
    const proxyData = createLoggingProxy(data);
    print(`Title: ${proxyData.title}`);
    
     
    proxyData.title = "New Title";
    print(`Updated Title: ${proxyData.title}`);
  }
})();
