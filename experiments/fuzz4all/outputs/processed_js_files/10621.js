class Fibonacci {
  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    while (true) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }
}

async function fetchFibonacciSequence(n) {
  const fibonacci = new Fibonacci();
  const sequence = [];
  const iterator = fibonacci[Symbol.iterator]();

  for (let i = 0; i < n; i++) {
    sequence.push(iterator.next().value);
  }

  return sequence;
}

(async () => {
  try {
    const n = 10;
    const fibSequence = await fetchFibonacciSequence(n);
    print(`Fibonacci sequence of ${n}:`, fibSequence);

    const squaredSequence = fibSequence.map(x => x ** 2);
    const squaredSum = squaredSequence.reduce((acc, curr) => acc + curr, 0);

    print(`Squared sequence:`, squaredSequence);
    print(`Sum of squares:`, squaredSum);

  } catch (error) {
    console.error("Error fetching Fibonacci sequence:", error);
  }
})();
