class AsyncNumberGenerator {
  constructor() {
    this.numbers = new Set();
  }

  async *[Symbol.asyncIterator]() {
    while (true) {
      await new Promise(resolve => setTimeout(resolve, 1000));  
      const newNumber = Math.floor(Math.random() * 100);
      if (!this.numbers.has(newNumber)) {
        this.numbers.add(newNumber);
        yield newNumber;
      }
    }
  }
}

const doublePromise = num => new Promise(resolve => {
  setTimeout(() => resolve(num * 2), 500);
});

const numberGenerator = new AsyncNumberGenerator();

(async () => {
  for await (const num of numberGenerator) {
    print(`Generated number: ${num}`);
    const doubled = await doublePromise(num);
    print(`Doubled number: ${doubled}`);
    if (numberGenerator.numbers.size >= 5) break;  
  }

  const { sum, count } = Array.from(numberGenerator.numbers).reduce(({ sum, count }, num) => ({
    sum: sum + num,
    count: count + 1
  }), { sum: 0, count: 0 });

  print(`Average of unique numbers: ${sum / count}`);
})();
