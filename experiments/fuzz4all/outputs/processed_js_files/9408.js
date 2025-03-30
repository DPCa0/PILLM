 

 
function* dataFetcher() {
  yield new Promise((resolve) => setTimeout(() => resolve('Data 1'), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve('Data 2'), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve('Data 3'), 1000));
}

 
async function processData() {
  const iterator = dataFetcher();
  const results = [];

  for (let promise of iterator) {
    results.push(await promise);
  }

  return results;
}

 
const resultsHandler = {
  get(target, prop) {
    print(`Accessed property ${prop}`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

 
(async function main() {
  const data = await processData();
  const proxiedData = new Proxy(data, resultsHandler);

   
  print(proxiedData[0]);  
  proxiedData[1] = 'Updated Data';  
  print(proxiedData);  
})();
