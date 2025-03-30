 

 
function asyncOperation(value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value * 2);
    }, 1000);
  });
}

 
function* generatorFunction(arr) {
  for (let item of arr) {
    yield asyncOperation(item);
  }
}

 
async function processWithAsync(generator) {
  let results = [];
  for (let promise of generator) {
    results.push(await promise);
  }
  return results;
}

 
const targetObject = { greeting: "Hello, world!" };
const handler = {
  get: (obj, prop) => {
    return prop in obj ? obj[prop] : `Property ${prop} does not exist`;
  }
};
const proxyObject = new Proxy(targetObject, handler);

 
(async function main() {
  const numbers = [1, 2, 3, 4, 5];
  const gen = generatorFunction(numbers);

  print("Processing generator...");
  const doubled = await processWithAsync(gen);
  print("Doubled values:", doubled);

  print("Accessing properties through Proxy...");
  print(proxyObject.greeting);  
  print(proxyObject.nonExistent);  
})();
