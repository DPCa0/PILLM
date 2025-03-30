class Fibonacci {
  constructor(limit) {
    this.limit = limit;
    this[Symbol.iterator] = this.generator();
  }

  *generator() {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }
}

const calculateSumAsync = async (sequence) => {
  const sum = await sequence.reduce(async (accPromise, value) => {
    const acc = await accPromise;
    return acc + (await Promise.resolve(value));
  }, Promise.resolve(0));
  print(`Sum of Fibonacci sequence: ${sum}`);
};

const fibSequence = new Fibonacci(10);
const fibArray = Array.from(fibSequence);

print(`Fibonacci Sequence: ${fibArray}`);

calculateSumAsync(fibArray);
