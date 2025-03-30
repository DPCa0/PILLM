class Fibonacci {
  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    while (true) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }
}

const asyncTask = (ms, value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

async function calculateFibonacciSum(n) {
  const fibonacci = new Fibonacci();
  const iterator = fibonacci[Symbol.iterator]();
  let sum = 0;

  for (let i = 0; i < n; i++) {
    const fibValue = iterator.next().value;
    sum += await asyncTask(10, fibValue);
  }

  return sum;
}

(async () => {
  try {
    const sum = await calculateFibonacciSum(10);
    print(`Sum of first 10 Fibonacci numbers: ${sum}`);
  } catch (error) {
    console.error('Error:', error);
  }
})();
