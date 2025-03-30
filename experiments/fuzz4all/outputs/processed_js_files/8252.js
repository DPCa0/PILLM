 

 
const handler = {
  get(target, prop) {
    print(`Property '${prop}' accessed`);
    return Reflect.get(...arguments);
  }
};

 
const data = new Proxy({ message: 'Hello, advanced JavaScript!' }, handler);

 
function* dataGenerator() {
  yield data.message;
  yield* [1, 2, 3];  
}

 
async function processData() {
  const gen = dataGenerator();
  for (const val of gen) {
    await new Promise(resolve => setTimeout(resolve, 500));  
    print(`Processed: ${val}`);
  }
}

 
(async () => {
  const [result1, result2] = await Promise.all([
    processData(),
    new Promise(resolve => setTimeout(() => resolve('Another async operation'), 1000))
  ]);

  print(`Results: ${result1}, ${result2}`);
})();
