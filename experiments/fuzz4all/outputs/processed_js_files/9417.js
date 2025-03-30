 
async function* numberGenerator() {
  let i = 0;
  while (i < 3) {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    yield i++;
  }
}

 
const targetObject = { a: 1, b: 2 };
const handler = {
  get(target, property) {
    print(`Getting property ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const proxyObject = new Proxy(targetObject, handler);

 
function processValues([first, ...rest] = [1, 2, 3]) {
  print(`First value: ${first}`);
  print(`Rest values: ${rest}`);
}

 
async function handleMultiplePromises() {
  const promises = [
    Promise.resolve('Resolved'),
    Promise.reject('Rejected'),
    new Promise(resolve => setTimeout(() => resolve('Resolved after timeout'), 1500))
  ];

  const results = await Promise.allSettled(promises);
  print(results);
}

 
(async () => {
   
  for await (const num of numberGenerator()) {
    print(`Generated number: ${num}`);
  }

   
  proxyObject.a;         
  proxyObject.b = 42;    

   
  processValues([10, 20, 30]);

   
  await handleMultiplePromises();
})();
