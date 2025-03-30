 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const memoize = fn => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

 
const reactive = obj => new Proxy(obj, {
  set(target, property, value) {
    print(`Property ${property} changed to ${value}`);
    target[property] = value;
    return true;
  }
});

 
const expensiveComputation = num => {
  for (let i = 0; i < 1e6; i++) {}  
  return num * num;
};

 
const memoizedComputation = memoize(expensiveComputation);

 
const asyncOperations = async () => {
  print("Starting async operations...");
  
  const result1 = await delay(1000).then(() => memoizedComputation(3));
  const result2 = await delay(500).then(() => memoizedComputation(5));

  const results = await Promise.all([
    delay(300).then(() => memoizedComputation(2)),
    delay(400).then(() => memoizedComputation(7))
  ]);

  print(`Results: ${result1}, ${result2}, ${results}`);
};

 
const state = reactive({ count: 0, message: "Hello" });

 
state.count = 1;
state.message = "World";

 
asyncOperations();
