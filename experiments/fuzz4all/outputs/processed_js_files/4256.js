 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fibonacciAsync(n) {
  if (n < 2) return n;
  return await Promise.all([fibonacciAsync(n - 1), fibonacciAsync(n - 2)])
    .then(results => results[0] + results[1]);
}

 
const loggingHandler = {
  get(target, property) {
    print(`Accessing property "${property}"`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property "${property}" to ${value}`);
    target[property] = value;
    return true;
  }
};

 
const sampleObject = new Proxy({ name: 'Advanced JS', version: 1 }, loggingHandler);

 
(async function() {
  sampleObject.name = 'Complex JS Example';  
  print(sampleObject.name);            

   
  print('Calculating 10th Fibonacci number asynchronously...');
  const fib10 = await fibonacciAsync(10);
  print(`The 10th Fibonacci number is ${fib10}`);

   
  print('Waiting for 2 seconds...');
  await delay(2000);
  print('2 seconds have passed.');

   
  function* generatorExample() {
    yield 'Hello';
    yield 'from';
    yield 'Generator';
  }

   
  for (const word of generatorExample()) {
    print(word);
  }

   
  const uniqueNumbers = new Set([1, 2, 3, 3, 4, 5]);
  const numberDescriptions = new Map([[1, 'one'], [2, 'two'], [3, 'three']]);

  print('Unique Numbers:', [...uniqueNumbers]);
  print('Number Descriptions:', Array.from(numberDescriptions.entries()));
})();
