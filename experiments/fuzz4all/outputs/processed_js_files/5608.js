 

 
function* promiseGenerator(promises) {
  for (const promise of promises) {
    yield promise;
  }
}

 
async function handlePromises(gen) {
  const results = [];
  for (const promise of gen) {
    try {
      const result = await promise;
      results.push(result);
    } catch (error) {
      results.push(`Error: ${error.message}`);
    }
  }
  return results;
}

 
const promises = [
  Promise.resolve(1),
  Promise.reject(new Error('Rejected promise')),
  Promise.resolve(3),
];

 
const gen = promiseGenerator(promises);

 
const handler = {
  get: (target, prop) => {
    print(`Accessing ${prop}`);
    return Reflect.get(target, prop);
  },
};

 
(async () => {
  const results = await handlePromises(gen);
  const proxyResults = new Proxy(results, handler);

   
  print(proxyResults[0]);  
  print(proxyResults[1]);  
  print(proxyResults[2]);  
})();
