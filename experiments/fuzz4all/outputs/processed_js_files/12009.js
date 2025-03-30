 
const uniqueKey = Symbol('unique');

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting property ${String(prop)}`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    print(`Setting property ${String(prop)} to ${value}`);
    return Reflect.set(...arguments);
  }
};

 
const obj = new Proxy({
  [uniqueKey]: 'secret',
  name: 'JavaScript',
  version: 'ES2023'
}, handler);

 
function memoize(fn) {
  const cache = new WeakMap();
  return function(...args) {
    const key = args[0];
    if (cache.has(key)) {
      print(`Fetching from cache for ${key}`);
      return cache.get(key);
    }
    const result = fn(...args);
    print(`Storing to cache for ${key}`);
    cache.set(key, result);
    return result;
  }
}

 
const factorial = memoize(function(n) {
  if (n === 0n) return 1n;
  return n * factorial(n - 1n);
});

 
async function* asyncNumbers(limit) {
  let i = 0;
  while (i < limit) {
    yield new Promise(resolve => setTimeout(() => resolve(i++), 100));
  }
}

 
(async function main() {
  const dynamicModule = await import('./someModule.js');
  const dynamicValue = dynamicModule.someFunction();

  print(`Dynamic import value: ${dynamicValue}`);
  
  print(`Unique Key Access: ${obj[uniqueKey]}`);
  print(`Factorial of 5: ${factorial(5n)}`);
  
  print('Async numbers:');
  for await (const num of asyncNumbers(5)) {
    print(num);
  }
})();
