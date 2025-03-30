 

 
async function* createAsyncIterable(n) {
  for (let i = 1; i <= n; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield i;
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      if (typeof target[prop] === 'function') {
        return function(...args) {
          print(`Method ${prop} is called with arguments:`, args);
          return Reflect.apply(target[prop], receiver, args);
        };
      }
      print(`Getting property ${prop}:`, target[prop]);
      return Reflect.get(target, prop, receiver);
    }
    print(`Property ${prop} not found`);
    return undefined;
  }
};

 
const mathOperations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

const proxiedMath = new Proxy(mathOperations, handler);

 
(async function() {
  print("Starting Async Iteration:");
  for await (const num of createAsyncIterable(5)) {
    print(`Processing number: ${num}`);
    if (num % 2 === 0) {
      const result = proxiedMath.add(num, 5);
      print(`Addition Result: ${result}`);
    } else {
      const result = proxiedMath.subtract(num, 2);
      print(`Subtraction Result: ${result}`);
    }
  }
})();
