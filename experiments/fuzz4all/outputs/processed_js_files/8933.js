 

 
async function* asyncGenerator(array) {
  for (const item of array) {
     
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield item;
  }
}

 
const loggingHandler = {
  get(target, property) {
    print(`Accessed property "${property}"`);
    return target[property];
  }
};

 
const targetObject = { a: 1, b: 2, c: 3 };

 
const proxy = new Proxy(targetObject, loggingHandler);

 
async function processArray(array) {
  const asyncGen = asyncGenerator(array);

  for await (const item of asyncGen) {
    print(`Processing item: ${item}`);
     
    print(`Value of a: ${proxy.a}`);
  }
}

 
processArray(['apple', 'banana', 'cherry']);
