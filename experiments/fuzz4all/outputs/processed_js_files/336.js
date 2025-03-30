 

 
async function* fetchData(endpoints) {
  for (const endpoint of endpoints) {
    yield await fetch(endpoint).then((response) => response.json());
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
     
    if (Reflect.has(target, prop)) {
      return Reflect.get(target, prop, receiver);
    } else {
      console.warn(`Property "${prop}" does not exist.`);
      return undefined;
    }
  }
};

 
const dataSources = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2'
];

 
const proxyGen = new Proxy(fetchData(dataSources), handler);

 
(async () => {
  for await (const data of proxyGen) {
    print(data);
  }
})();
