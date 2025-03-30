const { performance } = require('perf_hooks');

 
function* fibonacci() {
  const memo = [0, 1];
  let index = 0;

  while (true) {
    if (memo[index] != null) {
      yield memo[index];
    } else {
      memo[index] = memo[index - 1] + memo[index - 2];
      yield memo[index];
    }
    index++;
  }
}

 
const asyncOperation = (number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof number === 'number') {
        resolve(number * 2);
      } else {
        reject('Input must be a number');
      }
    }, 1000);
  });
};

 
const handler = {
  get(target, property) {
    if (property in target) {
      print(`Getting value of ${property}`);
      return target[property];
    } else {
      print(`Property ${property} not found`);
      return 42;
    }
  },
  set(target, property, value) {
    print(`Setting value of ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const obj = new Proxy({ a: 1, b: 2 }, handler);

 
const measurePerformance = (fn, ...args) => {
  const start = performance.now();
  const result = fn(...args);
  const end = performance.now();
  print(`Performance: ${end - start} milliseconds`);
  return result;
};

 
(async () => {
  print('Fibonacci Sequence:');
  const fibGen = fibonacci();
  for (let i = 0; i < 10; i++) {
    print(fibGen.next().value);
  }

  try {
    const result = await asyncOperation(5);
    print(`Async Result: ${result}`);
  } catch (error) {
    console.error(error);
  }

  print('Proxy Demo:');
  print(obj.a);
  print(obj.b);
  print(obj.c);
  obj.c = 3;
  print(obj.c);

  print('Performance Measurement:');
  measurePerformance((x) => x * x, 5);
})();
