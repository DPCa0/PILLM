 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(id) {
  await delay(Math.random() * 1000);  
  return `Data for ID: ${id}`;
}

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

 
const ids = idGenerator();

 
const handler = {
  get: function(target, prop, receiver) {
    if (prop === 'getData') {
      return async function() {
        const id = target.next().value;
        const data = await fetchData(id);
        print(data);
      };
    }
    return Reflect.get(...arguments);
  }
};

 
const proxiedIds = new Proxy(ids, handler);

 
(async () => {
  await proxiedIds.getData();  
  await proxiedIds.getData();  
  await proxiedIds.getData();  
})();
