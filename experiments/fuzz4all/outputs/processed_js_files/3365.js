class AsyncGenerator {
  constructor(max = 10) {
    this.max = max;
  }

  async *generateNumbers() {
    for (let i = 1; i <= this.max; i++) {
      yield new Promise(resolve => setTimeout(() => resolve(i), 100 * i));
    }
  }
}

const processNumbers = async () => {
  const gen = new AsyncGenerator(5);
  const arr = [];
  
  for await (const num of gen.generateNumbers()) {
    arr.push(num);
    print(`Processed number: ${num}`);
  }

  const squaredNumbers = arr.map(num => num ** 2);
  print(`Squared numbers: ${squaredNumbers}`);

  const sum = squaredNumbers.reduce((acc, curr) => acc + curr, 0);
  print(`Sum of squared numbers: ${sum}`);
};

processNumbers();
