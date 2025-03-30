class Fibonacci {
  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    for (;;) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }
}

const asyncDouble = async (num) => {
  return new Promise((resolve) => setTimeout(() => resolve(num * 2), 100));
};

const findFirstEvenFibonacciOverThreshold = async (threshold) => {
  for await (const num of new Fibonacci()) {
    const doubled = await asyncDouble(num);
    if (doubled > threshold && doubled % 2 === 0) {
      return doubled;
    }
  }
};

(async () => {
  const result = await findFirstEvenFibonacciOverThreshold(1000);
  print(`The first even doubled Fibonacci number over 1000 is: ${result}`);
})();
