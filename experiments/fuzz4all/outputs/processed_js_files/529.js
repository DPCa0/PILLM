 

 
function* createAsyncGenerator() {
  yield new Promise((resolve) => setTimeout(() => resolve(1), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve(2), 500));
  yield new Promise((resolve) => setTimeout(() => resolve(3), 1500));
}

 
async function asyncProcess(generator) {
  const results = [];
  for await (const num of generator) {
    results.push(num);
    print(`Processed: ${num}`);
  }
  return results;
}

 
const handler = {
  get(target, property) {
    print(`Accessing property: ${property}`);
    return target[property];
  },
};

const proxyObj = new Proxy({ name: 'Complex JS', year: 2023 }, handler);

 
(async () => {
  const gen = createAsyncGenerator();
  const result = await asyncProcess(gen);
  print('Async process completed with results:', result);

   
  print(proxyObj.name);
  print(proxyObj.year);
})();
