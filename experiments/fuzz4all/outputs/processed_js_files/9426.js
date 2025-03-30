class Fibonacci {
  #memo = new Map();

  constructor() {
    this.#memo.set(0, 0);
    this.#memo.set(1, 1);
  }

  calculate(n) {
    if (this.#memo.has(n)) return this.#memo.get(n);
    const value = this.calculate(n - 1) + this.calculate(n - 2);
    this.#memo.set(n, value);
    return value;
  }
}

const asyncFunction = async (message) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Async says: ${message}`), 1000);
  });
};

(async () => {
   
  const obj = { nested: { value: 42 } };
  print(obj?.nested?.value ?? 'No value');

   
  const [first, ...rest] = [10, 20, 30, 40];
  print(first, rest);

   
  function* numberGenerator() {
    yield* [1, 2, 3];
    yield* [4, 5];
  }

  const fibInstance = new Fibonacci();
  print(`Fibonacci of 10: ${fibInstance.calculate(10)}`);

   
  const symbolKey = Symbol('unique');
  const symbolObj = {
    [symbolKey]: 'Symbol Value',
  };
  print(symbolObj[symbolKey]);

  for (const number of numberGenerator()) {
    print(number);
  }

   
  print(await asyncFunction("This is an async message"));

   
  const target = { message1: "hello", message2: "world" };
  const handler = {
    get: function (target, prop, receiver) {
      return prop in target ? target[prop] : "No such property";
    },
  };

  const proxy = new Proxy(target, handler);
  print(proxy.message1);  
  print(proxy.nonExistent);  
})();
