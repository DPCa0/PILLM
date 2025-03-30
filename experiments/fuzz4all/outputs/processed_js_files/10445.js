 

function* fibonacciGenerator() {
  let [a, b] = [0, 1];
  while (true) {
    [a, b] = [b, a + b];
    yield a;
  }
}

const fetchFibonacci = (n) => {
  return new Promise((resolve) => {
    const gen = fibonacciGenerator();
    let result;
    for (let i = 0; i < n; i++) {
      result = gen.next().value;
    }
    setTimeout(() => resolve(result), 100);  
  });
};

const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property '${prop}': ${target[prop]}`);
      return target[prop];
    } else {
      console.warn(`Property '${prop}' does not exist.`);
      return undefined;
    }
  },
  set: (target, prop, value) => {
    print(`Setting property '${prop}' to ${value}`);
    target[prop] = value;
    return true;
  },
};

const main = async () => {
  const obj = new Proxy({}, handler);
  
  obj.number = 10;
  const fibonacciNumber = await fetchFibonacci(obj.number);
  
  print(`Fibonacci number at position ${obj.number} is ${fibonacciNumber}`);
  
  obj.newProp = fibonacciNumber * 2;  
  print(`New property 'newProp': ${obj.newProp}`);
};

main();
