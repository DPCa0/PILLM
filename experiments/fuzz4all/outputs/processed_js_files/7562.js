class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this.sequence = [];
  }

  *generate() {
    let [prev, curr] = [0, 1];
    while (curr < this.limit) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  async calculate() {
    for await (let num of this.generate()) {
      this.sequence.push(num);
    }
    return this.sequence;
  }
}

const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = args.toString();
    if (cache.has(key)) {
      print('Fetching from cache:', key);
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    print('Calculating result:', key);
    return result;
  };
};

const complexCalculation = memoize((num) => num * num + Math.sqrt(num) * Math.log(num));

(async () => {
  const fib = new Fibonacci(100);
  const sequence = await fib.calculate();
  print('Fibonacci sequence under 100:', sequence);

  sequence.forEach(num => {
    print(`Complex calculation for ${num}: ${complexCalculation(num)}`);
  });
})();
