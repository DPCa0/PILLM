 

 
function asyncOperation(value, delay) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), delay);
  });
}

 
async function fetchData() {
  const data = await asyncOperation({ user: 'John Doe', age: 30 }, 1000);
  return data;
}

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

 
const generator = idGenerator();

 
const dataHandler = {
  get: function(target, prop) {
    if (prop === 'id') {
      return generator.next().value;
    }
    return Reflect.get(target, prop);
  }
};

 
(async () => {
  const userData = await fetchData();
  const proxyData = new Proxy(userData, dataHandler);

  print(`ID: ${proxyData.id}, Name: ${proxyData.user}, Age: ${proxyData.age}`);
  print(`ID: ${proxyData.id}, Name: ${proxyData.user}, Age: ${proxyData.age}`);
})();
