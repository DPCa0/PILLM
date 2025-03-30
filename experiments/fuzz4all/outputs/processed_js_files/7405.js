class AsyncNumberProcessor {
  constructor(numbers) {
    this.numbers = numbers;
  }

  async *generateProcessedNumbers() {
    for (const number of this.numbers) {
      yield this._processNumber(number);
    }
  }

  _processNumber(number) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(number * number), Math.random() * 1000);
    });
  }

  async logProcessedNumbers() {
    const processedNumbers = [];

    for await (const processed of this.generateProcessedNumbers()) {
      processedNumbers.push(await processed);
    }

    print('Processed Numbers:', processedNumbers);
  }
}

const numbers = [1, 2, 3, 4, 5];
const processor = new AsyncNumberProcessor(numbers);
processor.logProcessedNumbers();
