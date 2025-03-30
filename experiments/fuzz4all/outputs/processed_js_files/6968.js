class AdvancedFeatureDemo {
  constructor() {
    this.data = [1, 2, 3, 4, 5];
  }

  *fibonacciSequence(limit) {
    let [prev, curr] = [0, 1];
    while (curr <= limit) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  async processData() {
    const promise = new Promise((resolve) => setTimeout(() => resolve(this.data.map(x => x * 2)), 1000));
    return await promise;
  }

  async *filterEvenNumbers() {
    const processedData = await this.processData();
    for (const number of processedData) {
      if (number % 2 === 0) {
        yield number;
      }
    }
  }

  static async *complexOperation() {
    const instance = new AdvancedFeatureDemo();
    yield* instance.fibonacciSequence(10);
    yield* instance.filterEvenNumbers();
  }
}

(async () => {
  const results = [];
  for await (const value of AdvancedFeatureDemo.complexOperation()) {
    results.push(value);
  }
  print('Complex Operation Results:', results);
})();
