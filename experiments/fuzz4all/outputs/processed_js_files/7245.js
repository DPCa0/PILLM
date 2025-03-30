class ComplexOperation {
  #resultCache = new WeakMap();

  constructor(data) {
    this.data = data;
  }

  static #heavyComputation(input) {
    return input.reduce((acc, val) => acc + val ** 2, 0);
  }

  async computeWithCache(key) {
    if (this.#resultCache.has(key)) {
      return this.#resultCache.get(key);
    }
    const result = await new Promise((resolve) =>
      setTimeout(() => resolve(ComplexOperation.#heavyComputation(this.data)), 1000)
    );
    this.#resultCache.set(key, result);
    return result;
  }
}

(async function main() {
  const operation = new ComplexOperation([1, 2, 3, 4, 5]);

  const key = {};
  const result1 = await operation.computeWithCache(key);
  print(`First computation: ${result1}`);  

  const result2 = await operation.computeWithCache(key);
  print(`Second computation (cached): ${result2}`);  
})();
