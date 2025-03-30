class Fibonacci {
  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    for (;;) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }
}

const fib = new Fibonacci();
const sequence = [...fib].slice(0, 10);

const asyncLogger = (sequence) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      sequence.forEach((num, index) => print(`Fibonacci[${index}]: ${num}`));
      resolve("Sequence logged");
    }, 1000);
  });
};

(async () => {
  print("Starting...");
  await asyncLogger(sequence);
  print("Done!");
})();
