 

 
function fetchData(delay, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), delay));
}

 
function* dataGenerator() {
  yield fetchData(1000, 'Data 1');
  yield fetchData(2000, 'Data 2');
  yield fetchData(3000, 'Data 3');
}

 
async function processData(generator) {
  const results = [];
  for (const promise of generator) {
    const data = await promise;
    results.push(data);
  }
  return results;
}

 
const resultsHandler = {
  get(target, property) {
    if (property in target) {
      print(`Accessed property "${property}": ${target[property]}`);
      return target[property];
    }
    throw new Error(`Property "${property}" not found`);
  }
};

(async () => {
  const generator = dataGenerator();
  const rawResults = await processData(generator);

   
  const resultsProxy = new Proxy(rawResults, resultsHandler);

   
  print(resultsProxy[0]);  
  print(resultsProxy[1]);  
  print(resultsProxy[2]);  
})();
