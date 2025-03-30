 
const range = (start, end, step = 1) => {
  return Array.from({ length: Math.ceil((end - start) / step) }, (v, i) => start + i * step);
};

 
function* fibonacci(n) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < n; i++) {
    yield prev;
    [prev, curr] = [curr, prev + curr];
  }
}

 
const createLoggerProxy = (obj) => {
  return new Proxy(obj, {
    get(target, prop) {
      print(`Accessing property '${prop}': ${target[prop]}`);
      return target[prop];
    },
  });
};

 
class Counter {
  #count = 0;  
  increment() {
    this.#count++;
  }
  getCount() {
    return this.#count;
  }
}

 
const asyncOperation = async () => {
  return new Promise((resolve) => setTimeout(() => resolve('Completed'), 1000));
};

 
const proxyObject = createLoggerProxy({ name: 'JavaScript', version: 'ES6' });
proxyObject.name;  

 
const numbers = range(1, 10, 2);
print('Numbers:', numbers);  

 
const fibSeq = [...fibonacci(7)];
print('Fibonacci:', fibSeq);  

 
const counter = new Counter();
counter.increment();
counter.increment();
print('Counter:', counter.getCount());  

 
(async () => {
  const result = await asyncOperation();
  print('Async Result:', result);  
})();
