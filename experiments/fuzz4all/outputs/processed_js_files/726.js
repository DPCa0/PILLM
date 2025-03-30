class AsyncNumberGenerator {
  constructor(maxNumber) {
    this.maxNumber = maxNumber;
  }

  *numberGenerator() {
    for (let i = 0; i <= this.maxNumber; i++) {
      yield new Promise((resolve) => setTimeout(() => resolve(i), 100));
    }
  }

  async *asyncNumberStream() {
    for (let promise of this.numberGenerator()) {
      yield await promise;
    }
  }

  static async processNumbers(generator) {
    const results = [];
    for await (let num of generator) {
      results.push(num * 2);
      print(`Processed Number: ${num * 2}`);
    }
    return results;
  }
}

const handleAsyncNumbers = async () => {
  const generatorInstance = new AsyncNumberGenerator(5);
  const numberStream = generatorInstance.asyncNumberStream();
  const processedNumbers = await AsyncNumberGenerator.processNumbers(numberStream);

  print('All numbers processed:', processedNumbers);
};

handleAsyncNumbers();
