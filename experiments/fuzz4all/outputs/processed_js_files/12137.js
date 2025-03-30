class ComplexMath {
  constructor() {
    this.memoizedFactorial = this.memoize(this.factorial);
  }

  *infiniteSequence(start = 0) {
    let i = start;
    while (true) {
      yield i++;
    }
  }

  async delayLog(message, delay) {
    return new Promise(resolve => setTimeout(() => {
      print(message);
      resolve();
    }, delay));
  }

  factorial(n) {
    if (n <= 1) return 1;
    return n * this.memoizedFactorial(n - 1);
  }

  memoize(fn) {
    const cache = new Map();
    return (...args) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = fn.apply(this, args);
      cache.set(key, result);
      return result;
    };
  }

  async process() {
    print("Starting calculations...");
    
    const factorialOf5 = this.memoizedFactorial(5);
    print(`Factorial of 5 is ${factorialOf5}`);

    print("Generating infinite sequence...");
    const sequence = this.infiniteSequence();
    print(sequence.next().value);
    print(sequence.next().value);

    await this.delayLog("Delayed log after 2 seconds", 2000);
  }
}

(async () => {
  const math = new ComplexMath();
  await math.process();
})();
