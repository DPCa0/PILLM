class Fibonacci {
  constructor() {
    this.memo = new Map();
  }
  
  *generate(n) {
    for (let i = 0; i < n; i++) {
      yield this.fib(i);
    }
  }
  
  fib(n) {
    if (n <= 1) return n;
    if (this.memo.has(n)) return this.memo.get(n);
    const value = this.fib(n - 1) + this.fib(n - 2);
    this.memo.set(n, value);
    return value;
  }
}

const fibonacci = new Fibonacci();

 
(async () => {
  const fibGenerator = fibonacci.generate(10);
  const fibNumbers = [];

  for (const num of fibGenerator) {
    const result = await new Promise(resolve => {
      setTimeout(() => resolve(num), 100);
    });
    fibNumbers.push(result);
  }
  
  print(`First 10 Fibonacci numbers: ${fibNumbers.join(', ')}`);
})();

 
const targetObj = { message: "Hello, Proxy!" };

const handler = {
  get(target, property, receiver) {
    print(`Getting property: ${property}`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    print(`Setting property: ${property} to ${value}`);
    return Reflect.set(target, property, value, receiver);
  }
};

const proxy = new Proxy(targetObj, handler);
print(proxy.message);
proxy.message = "Hello, Proxy World!";
print(proxy.message);

 
const symKey = Symbol('uniqueKey');
const obj = {
  [symKey]: "Secret Value",
  regularKey: "Regular Value"
};

print(`Symbol key value: ${obj[symKey]}`);
print(`Regular key value: ${obj.regularKey}`);
