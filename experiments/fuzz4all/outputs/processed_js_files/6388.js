class AsyncNumberGenerator {
  constructor(max = 100) {
    this.max = max;
  }

  async *generateNumbers() {
    for (let i = 0; i <= this.max; i++) {
      await new Promise(resolve => setTimeout(resolve, 10));
      yield i;
    }
  }
}

const processNumbers = async (gen) => {
  const results = [];

  for await (const num of gen) {
    const isEven = num % 2 === 0;
    const square = num ** 2;

    results.push({ num, isEven, square });
  }

  return results;
};

(async () => {
  const generator = new AsyncNumberGenerator(10);
  const numbers = generator.generateNumbers();
  const processedNumbers = await processNumbers(numbers);

  const evenNumbers = processedNumbers.filter(({ isEven }) => isEven);
  print('Even Numbers and their squares:', evenNumbers);

  const totalSquares = processedNumbers.reduce((acc, { square }) => acc + square, 0);
  print('Total of all squares:', totalSquares);
})();
