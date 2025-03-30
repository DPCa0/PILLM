class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this[Symbol.iterator] = function* () {
      let [prev, curr] = [0, 1];
      while (curr <= this.limit) {
        [prev, curr] = [curr, prev + curr];
        yield prev;
      }
    };
  }
}

const timeoutPromise = (delay, value) => 
  new Promise(resolve => setTimeout(() => resolve(value), delay));

const calculateFibonacciSequence = async (limit) => {
  const fibonacci = new Fibonacci(limit);
  const results = [];

  for (const number of fibonacci) {
    const squared = await timeoutPromise(500, number ** 2);
    results.push(squared);
  }

  return results;
};

calculateFibonacciSequence(50).then(results => print('Squared Fibonacci:', results));

 
const targetObject = { a: 1, b: 2, c: 3 };
const handler = {
  get: (obj, prop) => {
    print(`Property ${prop} accessed`);
    return prop in obj ? obj[prop] : 'Property not found';
  }
};

const proxiedObject = new Proxy(targetObject, handler);
print(proxiedObject.a);  
print(proxiedObject.d);  
