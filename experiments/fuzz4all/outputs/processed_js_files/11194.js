class AsyncNumberProcessor {
  constructor(numbers) {
    this.numbers = numbers;
  }

  async *generateSquare() {
    for (const number of this.numbers) {
       
      const square = await new Promise((resolve) => {
        setTimeout(() => resolve(number * number), Math.random() * 1000);
      });
      yield square;
    }
  }

  async processNumbers() {
    const results = [];
    for await (const square of this.generateSquare()) {
      results.push(square);
    }
    return results.reduce((sum, val) => sum + val, 0);
  }
}

const pipeline = async () => {
  const randomNumbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
  print('Original numbers:', randomNumbers);

  const processor = new AsyncNumberProcessor(randomNumbers);
  const sumOfSquares = await processor.processNumbers();

  print('Sum of squares:', sumOfSquares);
};

pipeline().catch(console.error);
