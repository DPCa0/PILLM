class AsyncCalculator {
  static async #fetchMultiplier() {
     
    return new Promise(resolve => setTimeout(() => resolve(2), 500));
  }

  constructor(value) {
    this.value = value;
  }

  #calculate = async () => {
    const multiplier = await AsyncCalculator.#fetchMultiplier();
    return this.value * multiplier;
  };

  async processValues(...values) {
    const results = await Promise.all(values.map(async val => {
      this.value = val;
      return await this.#calculate();
    }));

    return results;
  }

  static *generateSequence(start = 0) {
    let i = start;
    while (true) {
      yield i++;
    }
  }
}

(async () => {
  const asyncCalc = new AsyncCalculator(5);
  const result = await asyncCalc.processValues(1, 2, 3, 4, 5);
  print('Processed Values:', result);

  const sequenceGenerator = AsyncCalculator.generateSequence();
  print('Sequence:', sequenceGenerator.next().value);
  print('Sequence:', sequenceGenerator.next().value);
  print('Sequence:', sequenceGenerator.next().value);
})();
