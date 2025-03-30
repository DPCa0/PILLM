 
class Fibonacci {
  constructor(max) {
    this.max = max;
    this.memo = new Proxy({}, {
      get: (obj, prop) => prop in obj ? obj[prop] : (obj[prop] = this.calc(prop))
    });
  }
  
  calc(n) {
    if (n <= 1) return n;
    return this.memo[n - 1] + this.memo[n - 2];
  }
  
  *[Symbol.iterator]() {
    for (let i = 0; i < this.max; i++) {
      yield this.memo[i];
    }
  }
}

const fibMax = 10;
const fibonacci = new Fibonacci(fibMax);

 
const asyncFibonacciLogger = async () => {
  const logPromise = num => new Promise(res => {
    setTimeout(() => {
      print(num);
      res();
    }, Math.random() * 1000);
  });

  for await (const num of fibonacci) {
    await logPromise(num);
  }
};

asyncFibonacciLogger();
