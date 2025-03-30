class AsyncCalculator {
  constructor() {
    this.cache = new Map();
  }

  async compute(value) {
    if (this.cache.has(value)) {
      print(`Fetching from cache: ${value}`);
      return this.cache.get(value);
    }

     
    const result = await this.#intensiveCalculation(value);
    this.cache.set(value, result);
    return result;
  }

  async #intensiveCalculation(n) {
     
    await new Promise(resolve => setTimeout(resolve, 1000));
    return n * n;  
  }
}

const numbers = [1, 2, 3, 4, 5, 3, 2, 1];
const calculator = new AsyncCalculator();

(async function() {
   
  const results = await Promise.all(numbers.map(async num => {
    try {
      const result = await calculator.compute(num);
      print(`The square of ${num} is ${result}`);
    } catch (err) {
      console.error(`Error computing square of ${num}: ${err}`);
    }
  }));

  print("All computations complete:", results);
})();

 
const data = { a: 1, b: 2, c: 3 };
const proxyData = new Proxy(data, {
  get(target, prop, receiver) {
    print(`Accessed property ${String(prop)}`);
    return Reflect.get(target, prop, receiver);
  }
});

print(proxyData.a);
print(proxyData.b);
