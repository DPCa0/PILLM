 

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

 
const logger = {
  get: function(target, prop, receiver) {
    print(`Accessed property ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set: function(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const data = new Proxy({ count: 0 }, logger);

 
async function processData(generator) {
  const id = generator.next().value;

   
  const fetchPromise = new Promise((resolve) => {
    setTimeout(() => resolve(`Fetched data for ID: ${id}`), 1000);
  });

   
  const result = await fetchPromise;
  print(result);
  
   
  data.count += 1;
  print(`Current count: ${data.count}`);
}

 
(async () => {
  const generator = idGenerator();
  await processData(generator);
  await processData(generator);
})();
