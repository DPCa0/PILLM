class AsyncNumberProcessor {
  constructor(numbers) {
    this.numbers = numbers;
  }

  async #fetchProcessedNumbers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.numbers.map(num => num * num));
      }, 1000);
    });
  }

  async processNumbers() {
    const processedNumbers = await this.#fetchProcessedNumbers();
    return processedNumbers.reduce((acc, num) => acc + num, 0);
  }

  static async execute() {
    const processor = new AsyncNumberProcessor([1, 2, 3, 4, 5]);
    const sumOfSquares = await processor.processNumbers();
    print(`Sum of squares: ${sumOfSquares}`);
  }
}

const runProcess = async () => {
  try {
    await AsyncNumberProcessor.execute();
  } catch (error) {
    console.error('Error processing numbers:', error);
  }
};

 
const options = { enableLogging: false };
options?.enableLogging && print('Logging is enabled');
print('Program will execute shortly...');
runProcess();
