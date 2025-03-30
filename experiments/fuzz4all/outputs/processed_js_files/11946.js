class FibonacciSequence {
  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    for (;;) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }
}

const fibonacci = new FibonacciSequence();
const fibonacciWithLogging = new Proxy(fibonacci, {
  get(target, prop, receiver) {
    if (typeof target[prop] === 'function') {
      return function (...args) {
        print(`Calling method ${prop} with arguments: ${args}`);
        return target[prop].apply(receiver, args);
      };
    }
    return Reflect.get(target, prop, receiver);
  },
});

const logFibonacciNumbers = async function* (sequence, maxCount) {
  let count = 0;
  for (const num of sequence) {
    if (count >= maxCount) break;
    yield num;
    count++;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
};

(async () => {
  print("Fibonacci Sequence with logging:");
  for await (const num of logFibonacciNumbers(fibonacciWithLogging, 10)) {
    print(num);
  }
})();
