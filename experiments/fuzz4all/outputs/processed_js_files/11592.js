 

 
async function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Data Loaded");
    }, 1000);
  });
}

 
const UNIQUE_KEY = Symbol('unique');

 
const handler = {
  get(target, property) {
    if (property in target) {
      print(`Accessing ${property}: ${target[property]}`);
      return target[property];
    } else {
      console.error(`Property ${property} not found!`);
    }
  }
};

 
const myMap = new Map([
  ['foo', 'bar'],
  [UNIQUE_KEY, 'baz']
]);

 
const proxyMap = new Proxy(myMap, handler);

 
(async () => {
  const data = await fetchData();
  print(data);  

   
  print(proxyMap.get('foo'));  
  print(proxyMap.get(UNIQUE_KEY));  
  print(proxyMap.get('notFound'));  
})();
