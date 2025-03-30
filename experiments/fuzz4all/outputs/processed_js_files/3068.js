 
class Fibonacci {
  #memo = new Map();

   
  #calculate(n) {
    if (this.#memo.has(n)) return this.#memo.get(n);
    if (n <= 1) return n;
    const result = this.#calculate(n - 1) + this.#calculate(n - 2);
    this.#memo.set(n, result);
    return result;
  }

   
  getNumber(n) {
    return this.#calculate(n);
  }

   
  static sequence(upTo) {
    const fib = new Fibonacci();
    return Array.from({ length: upTo }, (_, i) => fib.getNumber(i));
  }
}

 
const fibonacciHandler = {
  get(target, prop) {
    print(`Accessing property: ${prop}`);
    return target[prop];
  },
  apply(target, thisArg, argumentsList) {
    print(`Calling method with arguments: ${argumentsList}`);
    return target.apply(thisArg, argumentsList);
  }
};

const fibInstance = new Fibonacci();
const fibProxy = new Proxy(fibInstance, fibonacciHandler);

 
async function asyncFib(n) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fibProxy.getNumber(n));
    }, 1000);
  });
}

 
(async function main() {
  print("Fibonacci Sequence:", Fibonacci.sequence(10));
  
  print("Calculate Fibonacci using Proxy:");
  print(await asyncFib(10));

  print("Complete!");
})();
