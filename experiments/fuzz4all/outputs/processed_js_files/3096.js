class Fibonacci {
  #sequence;  

  constructor(limit = 10) {
    this.limit = limit;
    this.#sequence = [...this.#generate()];  
  }

  *#generate() {
    let [a, b] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  getSequence() {
    return this.#sequence;
  }

  async sum() {
    return this.#sequence.reduce((acc, num) => acc + num, 0);
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    if (prop === 'getSequence') {
      print('Accessing sequence...');
    }
    return Reflect.get(target, prop, receiver);
  }
};

(async () => {
  const fib = new Fibonacci(15);
  const proxiedFib = new Proxy(fib, handler);

  print(proxiedFib.getSequence());
  const sequenceSum = await proxiedFib.sum();
  print(`Sum of Fibonacci sequence: ${sequenceSum}`);
})();
