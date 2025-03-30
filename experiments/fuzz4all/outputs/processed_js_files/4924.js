 

 
function* asyncGenerator() {
  for (let i = 0; i < 5; i++) {
    yield new Promise((resolve) => setTimeout(() => resolve(i), 1000));
  }
}

 
async function processGenerator(gen) {
  const results = [];
  for await (const promise of gen) {
    const result = await promise;
    results.push(result);
    print(`Processed: ${result}`);
  }
  return results;
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property '${prop}'`);
      return target[prop];
    } else {
      return `Property '${prop}' does not exist`;
    }
  }
};

 
const sampleObject = {
  a: 1,
  b: 2,
  c: 3
};

 
const proxyObject = new Proxy(sampleObject, handler);

 
print(proxyObject.a);  
print(proxyObject.nonExistent);  

 
(async () => {
  const generator = asyncGenerator();
  const results = await processGenerator(generator);
  print('Final Results:', results);
})();
