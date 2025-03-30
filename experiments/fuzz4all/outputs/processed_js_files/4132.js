(async () => {
   
  function safeHTML(literals, ...expressions) {
    return literals.reduce((acc, lit, i) => 
      acc + lit + (expressions[i] ? String(expressions[i])
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;') : ''), '');
  }

   
  class FibonacciGenerator {
    #sequence = [0, 1];
    #cache = new Map();

    constructor(limit = 10) {
      this.limit = limit;
      this.#generate();
    }

    #generate() {
      for (let i = this.#sequence.length; i < this.limit; i++) {
        const nextValue = this.#sequence[i - 1] + this.#sequence[i - 2];
        this.#sequence.push(nextValue);
        this.#cache.set(i, nextValue);
      }
    }

    *[Symbol.iterator]() {
      for (let num of this.#sequence) yield num;
    }

    async nextValue() {
       
      await new Promise(resolve => setTimeout(resolve, 100));
      return this.#sequence[this.limit - 1];
    }
  }

   
  const fibonacci = new FibonacciGenerator(15);
  const handler = {
    get(target, prop) {
      if (prop in target) {
        print(`Accessing ${prop}:`, target[prop]);
        return target[prop];
      }
      throw new Error(`Property ${prop} does not exist.`);
    }
  };

  const proxiedFibonacci = new Proxy(fibonacci, handler);

   
  print(safeHTML`First value: ${[...proxiedFibonacci][0]}`);
  print(safeHTML`Last value: ${await proxiedFibonacci.nextValue()}`);
})();
